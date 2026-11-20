// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`الأرقام بعمق: Number و Math و BigInt والعمليات`,
      l: 2,
      n: "كل طرق كتابة الرقم، وكل عمليات الإسناد والـ bitwise وترتيبها، وثوابت Number وفحصه وتنسيقه، و Math كله، و BigInt، ومشاريع فلوس وصلاحيات و IDs كبيرة",
      pre: [
        { to: "js/المتغيرات والأنواع والعمليات", why: R`العمليات الأساسية [[+]] و [[-]] و [[*]] و [[/]] و [[%]] و [[=]]، والوحدة دي بتبني عليها` },
        { to: "js/number و NaN", why: R`ليه [[0.1 + 0.2]] مش 0.3، و [[Number()]] و [[parseInt]] في أبسط صورهم، و [[MAX_SAFE_INTEGER]]: الوحدة دي بتكمّل من هناك` },
        { to: "js/&& و || و !", why: R`الـ short-circuit اللي بتقوم عليه [[||=]] و [[&&=]] و [[??=]]` },
        { to: "js/typeof", why: R`عشان تفرّق بين [[number]] و [[bigint]] و [[object]] لما تقابل [[new Number(5)]]` },
      ],
      goal: [
        R`تكتب أي رقم بأوضح شكل لمجاله: [[1_000_000]] و [[2.5e-3]] و [[0xff8800]] و [[0b0101]] و [[0o755]] و [[10n]]، وتعرف ليه [[010]] خطر.`,
        R`تستخدم كل عمليات الإسناد ([[+=]] لحد [[>>>=]] و [[??=]])، وتفرّق بين [[x++]] و [[++x]]، وتقرا أي expression بترتيب الـ precedence الصح وتحط الأقواس اللي بتمنع اللبس.`,
        R`تفحص وتحوّل أي input لرقم من غير مفاجآت: [[Number.isNaN]] ضد [[isNaN()]]، و [[Number.isFinite]] و [[Number.isSafeInteger]]، و [[parseInt]] بالـ radix، وتعرف ثوابت [[Number]] كلها.`,
        R`تعرض أي رقم زي ما اليوزر مستنيه: [[toFixed]] و [[toPrecision]] و [[toExponential]] و [[toString(16)]] و [[toLocaleString("ar-EG")]] بالجنيه والنسبة والوحدات.`,
        R`تستخدم [[Math]] كله (تقريب وحدود وأسس ولوغاريتمات ومثلثات و [[Math.sumPrecise]] و [[Math.fround]])، وتعرف إمتى التقريب بيغلط وإزاي تتقيه.`,
        R`تشغّل flags وصلاحيات بالـ bitwise، وتتعامل مع IDs و حسابات أكبر من ٢ أس ٥٣ بـ [[BigInt]] من غير ما تخسر دقة في JSON.`,
      ],
      use: {
        prog: R`أي برنامج فيه أرقام: فلوس، ونسب، وعدّادات، وتواريخ بالمللي ثانية، وألوان، وصلاحيات. والغلطات اللي الوحدة دي بتمنعها (قرش ناقص، و ID اتغيّر، و [[NaN]] عدّت) بتطلع في الـ production مش في التجربة.`,
        work: R`فواتير وضرايب وتقسيم مبالغ، وفورم بيستقبل أرقام عربي، و API بيرجّع IDs من ١٩ رقم، وصلاحيات يوزرز في لوحة تحكم، وعرض أرقام بالجنيه والأرقام العربي.`,
        cs: R`تمثيل الأرقام في الكمبيوتر (IEEE 754 و two's complement والـ 32 بت)، والأنظمة العددية (٢ و ٨ و ١٠ و ١٦)، وأخطاء التقريب، وترتيب العمليات في أي لغة.`,
      },
      projects: [
        { lvl: 'صغير', t: R`قارئ أرقام الفورم العربي`, what: R`ملف [[arabic-number.js]] فيه [[parseArabicNumber(text)]]: بتقرا مبلغ أو كمية مكتوبة بأرقام عربي ([[١٢٥٠]]) أو فارسي ([[۴۵]]) أو إنجليزي، بفواصل آلاف ([[١٬٢٥٠]] أو [[1,250]]) وعلامة عشرية عربي ([[٫]]) أو نقطة، وترجّع [[number]] أو [[null]]. وبعدين بيطبع كل رقم مقري بالعربي والإنجليزي بـ [[Intl.NumberFormat]]. ويقبل أرقام من سطر الأوامر. من دروس «Number: الثوابت والفحص والتحويل» و «Number: toFixed و toString و toLocaleString».`, done: R`[["١٬٢٥٠٫٧٥"]] و [["1,250.75"]] بيطلعوا 1250.75، و [["۴۵"]] بيطلع 45، و [["١٢abc"]] و [[""]] و [["1e3"]] و [["١٫٢٫٣"]] بيطلعوا «مش رقم»، و [[node arabic-number.js "٩٩٫٩٩"]] بيطبع 99.99.`, sol: R`**هتشوف إيه:** جدول، كل سطر فيه النص اللي اليوزر كتبه، والرقم اللي اتقري، ونفس الرقم متنسّق عربي وإنجليزي. والنصوص اللي مش أرقام بيتكتب جنبها «مش رقم».

~~~js arabic-number.js
// بيقرا رقم مكتوب بأرقام عربي أو إنجليزي، بفواصل أو من غير، ويرجّعه number
const ARABIC = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";

function toWesternDigits(text) {
  let out = "";
  for (const ch of text) {
    let d = ARABIC.indexOf(ch);
    if (d === -1) d = PERSIAN.indexOf(ch);
    if (d !== -1) out += d;
    else if (ch === "٫") out += ".";
    else if (ch === "٬" || ch === "،") out += ",";
    else out += ch;
  }
  return out;
}

function parseArabicNumber(input) {
  if (typeof input !== "string") return null;
  const text = toWesternDigits(input).trim().replace(/[\s,_]/g, "");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(text)) return null;
  const n = Number(text);
  return Number.isFinite(n) ? n : null;
}

const arFmt = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 });
const enFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const inputs = process.argv.length > 2 ? process.argv.slice(2) : ["١٢٥٠", "١٬٢٥٠٫٧٥", "1,250.75", " ٣٠٠ ", "۴۵", "-٧٫٥", "١٢abc", "", "1e3", "١٫٢٫٣"];
for (const raw of inputs) {
  const n = parseArabicNumber(raw);
  const shown = JSON.stringify(raw).padEnd(14);
  if (n === null) console.log(shown, "← مش رقم");
  else console.log(shown, "←", String(n).padEnd(8), "| عربي:", arFmt.format(n).padEnd(9), "| English:", enFmt.format(n));
}
~~~

~~~text الناتج: node arabic-number.js
"١٢٥٠"         ← 1250     | عربي: ١٬٢٥٠     | English: 1,250
"١٬٢٥٠٫٧٥"     ← 1250.75  | عربي: ١٬٢٥٠٫٧٥  | English: 1,250.75
"1,250.75"     ← 1250.75  | عربي: ١٬٢٥٠٫٧٥  | English: 1,250.75
" ٣٠٠ "        ← 300      | عربي: ٣٠٠       | English: 300
"۴۵"           ← 45       | عربي: ٤٥        | English: 45
"-٧٫٥"         ← -7.5     | عربي: ؜-٧٫٥     | English: -7.5
"١٢abc"        ← مش رقم
""             ← مش رقم
"1e3"          ← مش رقم
"١٫٢٫٣"        ← مش رقم
~~~

~~~text الناتج: node arabic-number.js "٩٩٫٩٩" "abc"
"٩٩٫٩٩"        ← 99.99    | عربي: ٩٩٫٩٩     | English: 99.99
"abc"          ← مش رقم
~~~

**كل حتة بتعمل إيه:**

- [[toWesternDigits]]: بتلف على النص حرف حرف ([[for...of]] عشان كل حرف عربي حرف واحد)، و [[indexOf]] في [[ARABIC]] بيدّي قيمة الرقم من ٠ لـ ٩. والعلامة العشرية [[٫]] بتبقى نقطة، وفاصل الآلاف العربي [[٬]] والفاصلة [[،]] بيبقوا فاصلة إنجليزي.
- [[replace(/[\s,_]/g, "")]]: يشيل المسافات والفواصل كلها، فـ [["1,250.75"]] و [[" ٣٠٠ "]] يبقوا أرقام نضيفة.
- الـ regex [[^[-+]?(\d+\.?\d*|\.\d+)$]]: النص **كله** لازم يبقى رقم بعلامة اختيارية ونقطة واحدة بالكتير. ده اللي بيرفض [["١٫٢٫٣"]] و [["1e3"]] (في فورم فلوس، الأُس غالبًا غلطة مش قصد).
- [[Number.isFinite]]: آخر حماية، و [[null]] مش [[NaN]] عشان اللي بيندهها يتعامل مع «مفيش رقم» بوضوح.
- الـ formatters اتعملوا مرة واحدة برّه الـ loop (درس «toLocaleString»).

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة كانت بتحوّل الأرقام العربي بس وبعدين [[parseFloat]]:

~~~text الناتج من النسخة الأولى
"١٢abc" ← 12
"١٬٢٥٠" ← 1
"۴۵" ← NaN
~~~

- [["١٢abc"]] عدّت 12: [[parseFloat]] متسامحة وبتقف عند أول حرف غلط. الحل: regex على النص **كله** و [[Number]].
- [["١٬٢٥٠"]] بقت 1: فاصل الآلاف العربي [[٬]] وقّف القراية. الحل: نحوّله وبعدين نشيله.
- [["۴۵"]] بقت [[NaN]]: الأرقام الفارسي (اللي بتطلع من كيبورد فارسي أو موبايل متظبط عليه) شكلها قريب من العربي بس أكوادها مختلفة. الحل: جدول [[PERSIAN]].

**ملاحظة على الناتج:** [["-٧٫٥"]] اتعرض [[؜-٧٫٥]]: فيه حرف اتجاه مخفي (ALM) قبل السالب عشان العلامة تتعرض صح جنب كلام عربي.` },
        { lvl: 'صغير', t: R`محوّل الأنظمة العددية`, what: R`أداة سطر أوامر [[base.js]]: [[node base.js 255 0xff 0b1010 0o755]] بتطبع لكل رقم قيمته بالعشري و hex و binary (مقسوم كل ٤ bits بـ [[_]]) و octal، وعدد الـ bits اللي محتاجها، وهل هو آمن كـ number. بتقبل [[_]] جوه الرقم والسالب والأرقام الأكبر من ٢ أس ٥٣ (بـ BigInt)، وبترفض أي حاجة مش رقم برسالة و exit code 1. من دروس «numeric literals و numeric separators» و «Number: toFixed و toString و toLocaleString» و «BigInt بعمق».`, done: R`[[0xFF_88_00]] بيطلع 16746496 و 24 bit، و [[12345678901234567890]] بيطلع hex [[0xab54a98ceb1f0ad2]] صح لآخر حرف ومكتوب جنبه إنه أكبر من الحد الآمن، و [[0b102]] و [[abc]] بيطلعوا «خطأ»، ومن غير arguments بيطبع طريقة الاستخدام.`, sol: R`**هتشوف إيه:** لكل رقم كتبته، ٦ سطور: القيمة بالأربع أنظمة، وعدد الـ bits، وهل الـ number العادي يقدر يمسكه.

~~~js base.js
// node base.js 255 0xff 0b1010 0o755 ...
const PREFIX = { "0x": 16, "0b": 2, "0o": 8 };

function parseInput(raw) {
  const text = raw.trim().toLowerCase().replace(/_/g, "");
  const negative = text.startsWith("-");
  const body = negative ? text.slice(1) : text;
  const radix = PREFIX[body.slice(0, 2)] ?? 10;
  const digits = radix === 10 ? body : body.slice(2);
  const valid = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^\d+$/, 16: /^[0-9a-f]+$/ }[radix];
  if (!valid.test(digits)) throw new SyntaxError("مش عدد صحيح بأساس " + radix + ": " + raw);
  const big = BigInt((radix === 10 ? "" : body.slice(0, 2)) + digits);
  return negative ? -big : big;
}

function describe(value) {
  const abs = value < 0n ? -value : value;
  const sign = value < 0n ? "-" : "";
  const bits = abs === 0n ? 1 : abs.toString(2).length;
  const safe = abs <= BigInt(Number.MAX_SAFE_INTEGER);
  return [
    "عشري:   " + value.toString(),
    "hex:    " + sign + "0x" + abs.toString(16),
    "binary: " + sign + "0b" + abs.toString(2).replace(/\B(?=(\d{4})+$)/g, "_"),
    "octal:  " + sign + "0o" + abs.toString(8),
    "bits:   " + bits + (bits <= 8 ? " (بايت واحد)" : bits <= 32 ? " (يدخل في 32 bit)" : ""),
    "number: " + (safe ? "آمن" : "أكبر من MAX_SAFE_INTEGER، اتعامل معاه BigInt"),
  ].join("\n  ");
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("الاستخدام: node base.js <رقم> [رقم...]   مثال: node base.js 255 0xff 0b1010");
  process.exitCode = 1;
}
for (const raw of args) {
  try {
    console.log(raw + "\n  " + describe(parseInput(raw)));
  } catch (e) {
    console.log(raw + "\n  خطأ: " + e.message);
    process.exitCode = 1;
  }
}
~~~

~~~text الناتج: node base.js 255 0xFF_88_00 0b1010 0o755 -42 12345678901234567890 0b102 abc
255
  عشري:   255
  hex:    0xff
  binary: 0b1111_1111
  octal:  0o377
  bits:   8 (بايت واحد)
  number: آمن
0xFF_88_00
  عشري:   16746496
  hex:    0xff8800
  binary: 0b1111_1111_1000_1000_0000_0000
  octal:  0o77704000
  bits:   24 (يدخل في 32 bit)
  number: آمن
0b1010
  عشري:   10
  hex:    0xa
  binary: 0b1010
  octal:  0o12
  bits:   4 (بايت واحد)
  number: آمن
0o755
  عشري:   493
  hex:    0x1ed
  binary: 0b1_1110_1101
  octal:  0o755
  bits:   9 (يدخل في 32 bit)
  number: آمن
-42
  عشري:   -42
  hex:    -0x2a
  binary: -0b10_1010
  octal:  -0o52
  bits:   6 (بايت واحد)
  number: آمن
12345678901234567890
  عشري:   12345678901234567890
  hex:    0xab54a98ceb1f0ad2
  binary: 0b1010_1011_0101_0100_1010_1001_1000_1100_1110_1011_0001_1111_0000_1010_1101_0010
  octal:  0o1255245230635307605322
  bits:   64
  number: أكبر من MAX_SAFE_INTEGER، اتعامل معاه BigInt
0b102
  خطأ: مش عدد صحيح بأساس 2: 0b102
abc
  خطأ: مش عدد صحيح بأساس 10: abc
exit code: 1
~~~

~~~text الناتج: node base.js
الاستخدام: node base.js <رقم> [رقم...]   مثال: node base.js 255 0xff 0b1010
exit code: 1
~~~

**كل حتة بتعمل إيه:**

- [[parseInput]]: بتشيل الـ [[_]] (لأن [[BigInt]] و [[Number]] الاتنين مبيفهموهاش في النص)، وتفصل الإشارة، وتعرف الأساس من أول حرفين ([[PREFIX]])، وتتأكد بـ regex إن كل حرف مسموح في الأساس ده. وبعدين [[BigInt(prefix + digits)]]: الـ BigInt بيفهم [["0xff"]] و [["0b1010"]] و [["0o755"]].
- ليه BigInt مش Number: عشان الأرقام الكبيرة تفضل مظبوطة (الغلطة تحت).
- [[describe]]: [[toString(16)]] و [[toString(2)]] و [[toString(8)]] على الـ BigInt، والـ regex [[\B(?=(\d{4})+$)]] بيحط [[_]] كل ٤ أرقام من اليمين. وعدد الـ bits = طول الـ binary.
- الأخطاء: كل رقم في [[try]] لوحده، فرقم غلط مبيوقفش الباقي، و [[process.exitCode = 1]] عشان أي سكربت بينده الأداة يعرف إن فيه مشكلة.

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة كانت [[Number(raw)]] على طول:

~~~text الناتج
ab54a98ceb1f0800 NaN NaN
SyntaxError: Cannot convert -0x2a to a BigInt
~~~

- الرقم الكبير بالـ hex طلع [[ab54a98ceb1f0800]] بدل [[ab54a98ceb1f0ad2]]: آخر ٣ حروف غلط لأن الـ number قرّبه.
- [["0xFF_88_00"]] و [["-0x2a"]] بقوا [[NaN]]: [[Number]] مبيفهمش الـ [[_]] ولا السالب مع الـ prefix. و [[BigInt("-0x2a")]] رمى SyntaxError. عشان كده الإشارة بتتفصل الأول وبتترجع بعد التحويل.` },
        { lvl: 'متوسط', t: R`فاتورة كافيه بالقروش`, what: R`[[invoice.js]] فيه [[buildInvoice(items, { discountPercent })]]: الأسعار جاية نصوص ([["35.50"]])، وكل الحسابات بالقروش أعداد صحيحة: إجمالي كل سطر، والمجموع، وخصم بنسبة، وضريبة ١٤٪ على اللي بعد الخصم، وكل نسبة بتتقرّب للقرش مرة واحدة. و [[split(total, people)]] بتقسم الحساب على عدد أفراد والقروش الزيادة بتتوزع واحد واحد فالمجموع مبيتغيّرش. والعرض بـ [[Intl.NumberFormat("ar-EG")]]. من دروس «Math: التقريب و min و max» و «++ و -- و += وأخواتها» و «Number: الثوابت والفحص والتحويل».`, done: R`طلب (٣ قهوة بـ ٣٥٫٥٠ و ٢ كرواسون بـ ٤٢ ومياه بـ ٧٫٢٥) مع خصم ١٠٪ بيطلع المطلوب [[20289]] قرش، والتقسيم على ٤ بيطلع ٥٠٫٧٣ وتلاتة ٥٠٫٧٢ ومجموعهم = الإجمالي، والسعر [["12.555"]] والكمية 0 بيترفضوا بـ RangeError.`, sol: R`**هتشوف إيه:** الفاتورة سطر سطر بالجنيه، وبعدين الخصم والضريبة والمطلوب (ومعاه بالقروش)، والتقسيم على ٤، وسطر مقارنة بالحساب بالكسور، وآخر سطرين أخطاء المدخلات الغلط.

~~~js invoice.js
// فاتورة كافيه: كل الحسابات بالقروش (أعداد صحيحة)، والتقريب مرة واحدة في كل خطوة فيها نسبة
const VAT_PERCENT = 14;

function toPiasters(price) {
  const text = String(price).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(text)) throw new RangeError("سعر مش صحيح: " + price);
  const [pounds, frac = ""] = text.split(".");
  return Number(pounds) * 100 + Number(frac.padEnd(2, "0"));
}

const percentOf = (piasters, percent) => Math.round(piasters * percent / 100);

function buildInvoice(items, { discountPercent = 0 } = {}) {
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) throw new RangeError("الخصم من 0 لـ 100");
  const lines = items.map(({ name, price, qty }) => {
    if (!Number.isInteger(qty) || qty <= 0) throw new RangeError("كمية غلط في " + name + ": " + qty);
    const unit = toPiasters(price);
    return { name, qty, unit, total: unit * qty };
  });
  let subtotal = 0;
  for (const l of lines) subtotal += l.total;
  const discount = percentOf(subtotal, discountPercent);
  const afterDiscount = subtotal - discount;
  const vat = percentOf(afterDiscount, VAT_PERCENT);
  return { lines, subtotal, discount, vat, total: afterDiscount + vat };
}

function split(totalPiasters, people) {
  if (!Number.isInteger(people) || people <= 0) throw new RangeError("عدد الناس لازم عدد صحيح موجب");
  const base = Math.floor(totalPiasters / people);
  let rest = totalPiasters % people;
  return Array.from({ length: people }, () => base + (rest-- > 0 ? 1 : 0));
}

const egp = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
const show = p => egp.format(p / 100);

const order = [
  { name: "قهوة تركي", price: "35.50", qty: 3 },
  { name: "كرواسون", price: "42", qty: 2 },
  { name: "مياه", price: "7.25", qty: 1 }
];
const inv = buildInvoice(order, { discountPercent: 10 });
for (const l of inv.lines) console.log(l.name.padEnd(10), String(l.qty).padStart(2), "×", show(l.unit).padStart(12), "=", show(l.total));
console.log("الإجمالي قبل الخصم:", show(inv.subtotal));
console.log("خصم ١٠٪:", show(inv.discount));
console.log("ضريبة ١٤٪:", show(inv.vat));
console.log("المطلوب:", show(inv.total), "(" + inv.total + " قرش)");
const shares = split(inv.total, 4);
console.log("على ٤ أفراد:", shares.map(show).join(" + "), "| المجموع صح؟", shares.reduce((a, b) => a + b, 0) === inv.total);

const floatTotal = order.reduce((s, it) => s + Number(it.price) * it.qty, 0) * 0.9 * 1.14;
console.log("نفس الحساب بالكسور:", floatTotal, "←", floatTotal.toFixed(2));

for (const bad of [[{ name: "شاي", price: "12.555", qty: 1 }], [{ name: "شاي", price: "12", qty: 0 }]]) {
  try { buildInvoice(bad); } catch (e) { console.log(e.name + ": " + e.message); }
}
~~~

~~~text الناتج
قهوة تركي   3 × ‏٣٥٫٥٠ ج.م.‏ = ‏١٠٦٫٥٠ ج.م.‏
كرواسون     2 × ‏٤٢٫٠٠ ج.م.‏ = ‏٨٤٫٠٠ ج.م.‏
مياه        1 ×  ‏٧٫٢٥ ج.م.‏ = ‏٧٫٢٥ ج.م.‏
الإجمالي قبل الخصم: ‏١٩٧٫٧٥ ج.م.‏
خصم ١٠٪: ‏١٩٫٧٨ ج.م.‏
ضريبة ١٤٪: ‏٢٤٫٩٢ ج.م.‏
المطلوب: ‏٢٠٢٫٨٩ ج.م.‏ (20289 قرش)
على ٤ أفراد: ‏٥٠٫٧٣ ج.م.‏ + ‏٥٠٫٧٢ ج.م.‏ + ‏٥٠٫٧٢ ج.م.‏ + ‏٥٠٫٧٢ ج.م.‏ | المجموع صح؟ true
نفس الحساب بالكسور: 202.89149999999998 ← 202.89
RangeError: سعر مش صحيح: 12.555
RangeError: كمية غلط في شاي: 0
~~~

**كل حتة بتعمل إيه:**

- [[toPiasters("35.50")]]: بتقسم النص عند النقطة، وبتحسب [[35 * 100 + 50]]. مفيش ضرب كسور خالص (الغلطة تحت). والـ regex بيرفض أكتر من رقمين بعد العلامة.
- [[percentOf(p, percent)]] = [[Math.round(p * percent / 100)]]: الضرب في عدد صحيح الأول، والقسمة على ١٠٠ بعدين، والتقريب للقرش مرة واحدة. الخصم ١٩٧٧٫٥ قرش بقى 1978، والضريبة ٢٤٩١٫٥٨ بقت 2492.
- الترتيب: الضريبة على المبلغ **بعد** الخصم. ولو عكست الترتيب الرقم هيختلف قروش، وده سؤال محاسبة تسأل فيه قبل ما تكتب كود.
- [[split]]: [[Math.floor(total / people)]] لكل واحد، والباقي ([[%]]) قروش بتتوزع واحد واحد على الأوائل ([[rest-- > 0]]: بيقارن وبعدين ينقّص). المجموع بيرجع زي ما هو بالظبط (السطر بيطبع [[true]]).
- سطر «نفس الحساب بالكسور» طلع [[202.89149999999998]]: نفس المبلغ بعد التقريب، بس انت مش ضامن كل مرة، ومش عارف القرش راح فين. بالقروش كل خطوة رقم صحيح متعرّف.

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة من [[toPiasters]] كانت [[Number(price) * 100]]:

~~~text الناتج
1998.9999999999998 434.99999999999994 434
~~~

[["19.99"]] بقت ١٩٩٨٫٩٩٩... و [["4.35"]] بقت ٤٣٤٫٩٩٩...، ولو حد استخدم [[Math.trunc]] أو [[| 0]] بدل [[Math.round]] السعر بيخسر قرش. الحل الأأمن: متضربش كسر أصلًا، اقرا الجنيهات والقروش من النص نفسه.

والغلطة التانية كانت في التقسيم: أول نسخة كانت [[Math.round(total / people)]] لكل واحد، فـ ٢٠٢٨٩ على ٤ طلعت ٤ × ٥٠٧٢ = ٢٠٢٨٨: قرش ضاع. التوزيع بالباقي هو الحل.` },
        { lvl: 'متوسط', t: R`صلاحيات لوحة تحكم بالـ bit flags`, what: R`module [[perms.js]] فيه ٦ صلاحيات (عرض وتعديل ومسح ونشر وفواتير وأدمن) كل واحدة bit، وأدوار جاهزة (viewer و editor و owner)، ودوال [[has]] و [[grant]] و [[revoke]] و [[toggle]] و [[list]]، وتحويل من وإلى نص زي [["ve-p--"]] (زي [[rwx]] في لينكس). وكل دالة بترفض mask فيه bits مش معروفة. ولما يتشغّل لوحده بيعمل demo. من دروس «bitwise و shifts» و «operator precedence و grouping و comma».`, done: R`الـ editor = 11 = [[ve-p--]]، و [[has(editor, DELETE | PUBLISH)]] بـ [[false]] (عنده واحدة بس)، وبعد منح المسح وسحب النشر وتبديل الفواتير بقى 23 = [[ved-b-]]، و [[has(64, VIEW)]] و [[fromLetters("vx")]] و [[grant(-1, VIEW)]] بيرموا errors.`, sol: R`**هتشوف إيه:** الـ editor برقمه و bits وحروفه وأسامي صلاحياته، وفحصين، وبعد ٣ تعديلات، والتحويل من نص، وتلات أخطاء.

~~~js perms.js
// صلاحيات لوحة تحكم في رقم واحد
const PERM = Object.freeze({
  VIEW: 1 << 0,
  EDIT: 1 << 1,
  DELETE: 1 << 2,
  PUBLISH: 1 << 3,
  BILLING: 1 << 4,
  ADMIN: 1 << 5
});
const ALL = Object.values(PERM).reduce((m, p) => m | p, 0);
const ROLES = Object.freeze({
  viewer: PERM.VIEW,
  editor: PERM.VIEW | PERM.EDIT | PERM.PUBLISH,
  owner: ALL
});
const LETTERS = { v: PERM.VIEW, e: PERM.EDIT, d: PERM.DELETE, p: PERM.PUBLISH, b: PERM.BILLING, a: PERM.ADMIN };

function check(mask) {
  if (!Number.isInteger(mask) || mask < 0 || (mask & ~ALL) !== 0) throw new RangeError("mask غلط: " + mask);
  return mask;
}
const has = (mask, perm) => (check(mask) & perm) === perm;
const grant = (mask, perm) => check(mask) | perm;
const revoke = (mask, perm) => check(mask) & ~perm;
const toggle = (mask, perm) => check(mask) ^ perm;
const list = mask => Object.keys(PERM).filter(k => (check(mask) & PERM[k]) !== 0);

function fromLetters(text) {
  let mask = 0;
  for (const ch of text) {
    if (ch === "-") continue;
    if (!(ch in LETTERS)) throw new SyntaxError("حرف صلاحية مش معروف: " + ch);
    mask |= LETTERS[ch];
  }
  return mask;
}
const toLetters = mask => Object.entries(LETTERS).map(([ch, p]) => ((check(mask) & p) ? ch : "-")).join("");

module.exports = { PERM, ROLES, has, grant, revoke, toggle, list, fromLetters, toLetters };

if (require.main === module) {
  let mona = ROLES.editor;
  console.log("editor:", mona, "=", "0b" + mona.toString(2).padStart(6, "0"), toLetters(mona), list(mona).join(","));
  console.log("تقدر تنشر؟", has(mona, PERM.PUBLISH), "| تقدر تمسح وتنشر؟", has(mona, PERM.DELETE | PERM.PUBLISH));
  mona = grant(mona, PERM.DELETE);
  mona = revoke(mona, PERM.PUBLISH);
  mona = toggle(mona, PERM.BILLING);
  console.log("بعد التعديل:", mona, toLetters(mona), list(mona).join(","));
  console.log("من نص:", fromLetters("ve-p"), toLetters(fromLetters("ve-p")), "| owner:", toLetters(ROLES.owner), ROLES.owner);
  for (const bad of [() => has(64, PERM.VIEW), () => fromLetters("vx"), () => grant(-1, PERM.VIEW)]) {
    try { bad(); } catch (e) { console.log(e.name + ": " + e.message); }
  }
}
~~~

~~~text الناتج: node perms.js
editor: 11 = 0b001011 ve-p-- VIEW,EDIT,PUBLISH
تقدر تنشر؟ true | تقدر تمسح وتنشر؟ false
بعد التعديل: 23 ved-b- VIEW,EDIT,DELETE,BILLING
من نص: 11 ve-p-- | owner: vedpba 63
RangeError: mask غلط: 64
SyntaxError: حرف صلاحية مش معروف: x
RangeError: mask غلط: -1
~~~

**كل حتة بتعمل إيه:**

- [[1 << 0]] لحد [[1 << 5]]: كل صلاحية bit مختلف (1 و 2 و 4 و 8 و 16 و 32). و [[Object.freeze]] عشان محدش يغيّر قيمة صلاحية بالغلط من مكان تاني.
- [[ALL]]: الـ OR بتاع كل الصلاحيات = 63 = [[111111]].
- [[check(mask)]]: [[(mask & ~ALL) !== 0]] بيسأل «فيه bit شغال برّه الصلاحيات المعروفة؟». 64 فيها bit رقم ٦ فاترفضت، و [[-1]] كل الـ bits شغالة فيها فاترفضت. ده بيحمي من رقم بايظ جاي من قاعدة بيانات أو token.
- [[has]] بـ [[(mask & perm) === perm]] بالأقواس، فبتشتغل لصلاحية أو لمجموعة.
- [[grant]] بـ OR، و [[revoke]] بـ [[& ~perm]]، و [[toggle]] بـ [[^]]. ومحدش فيهم بيغيّر الـ mask الأصلي: بيرجّعوا رقم جديد.
- [[fromLetters]] و [[toLetters]]: شكل يتقري ويتكتب في config ([[ve-p]]).
- [[require.main === module]]: الـ demo بيشتغل بس لما الملف يتشغّل لوحده، مش لما ملف تاني يعمله [[require]].

**الغلطة اللي حصلت وأنا ببنيه:** أول [[has]] كانت [[Boolean(mask & perm)]]:

~~~text الناتج
v1: يمسح وينشر؟ true | mask & perm = 8
~~~

لصلاحية واحدة كانت شغالة، بس مع مجموعة ([[DELETE | PUBLISH]]) رجّعت [[true]] لأن واحدة بس (النشر = 8) موجودة. لو الـ endpoint بيطلب الاتنين، يوزر عنده نص الصلاحيات كان هيعدّي. الحل: [[=== perm]] يعني «كل الـ bits المطلوبة موجودة».` },
        { lvl: 'كبير', t: R`money.js: مكتبة فلوس من غير ولا قرش يضيع`, what: R`مكتبة صغيرة لأي مشروع فيه فلوس، وكل المبالغ فيها قروش أعداد صحيحة:
• [[parse(input)]]: بتقرا [["١٬٢٥٠٫٥٠ ج.م"]] و [["EGP 1,250.50"]] و [["1250.5"]] و [[1250.5]] لـ 125050، وبترمي [[MoneyError]] بكود واضح ([[EMPTY]] و [[INVALID]] و [[PRECISION]] و [[RANGE]]).
• [[add]] و [[multiply(p, factor, mode)]] و [[percent(p, pct, mode)]] بـ ٤ طرق تقريب ([[halfUp]] و [[halfEven]] و [[down]] و [[up]])، والضرب في النسبة بيتعمل كسر بالظبط بـ BigInt مش float.
• [[allocate(p, ratios)]] و [[split(p, n)]]: تقسيم بنسب والمجموع مبيتغيّرش.
• [[format(p, locale)]] بـ formatter متخزّن لكل لغة.
ومعاها [[money.test.js]] بـ [[node --test]] و [[demo.js]]. الوحدة كلها في مشروع واحد.`, done: R`[[node --test]] بيطلّع ٦ اختبارات كلهم ✔، ومنهم: ٦ أشكال لنفس المبلغ بيطلعوا 125050، و [[percent(19775, 14)]] = 2769، و [[multiply(100, 0.145)]] = 15 (مش 14 زي [[Math.round(100 * 0.145)]])، و [[allocate]] مجموعها = المبلغ لأي رقم، و [[allocate(-1, [1, 1])]] = [[[-1, 0]]] مش [[-0]]. و [[node demo.js]] بيطبع المجموع والضريبة والتقسيم والأخطاء بأكوادها.`, ext: R`زوّد عملات تانية (المبلغ يبقى [[{ amount, currency }]] وترفض جمع عملتين مختلفتين)، و [[compare]] و [[isZero]]، وإن [[parse]] تقبل [[locale]] عشان [["1.250,50"]] الألماني، وانشرها package على npm بـ README.`, sol: R`**هتشوف إيه:** مكتبة من ملف واحد بتستخدمها في أي مشروع بـ [[require("./money")]]، وملف demo بيطبع حسبة حقيقية، وملف اختبارات بيتأكد من كل حالة صعبة.

~~~text شجرة الملفات
money/
├── money.js        المكتبة: parse و format و add و multiply و percent و allocate و split
├── money.test.js   اختبارات node --test
└── demo.js         مثال بيستخدم المكتبة
~~~

**ترتيب البناء:** [[parse]] الأول (كل حاجة بتبدأ منه)، وبعدها [[format]] عشان تشوف النتايج، وبعدين [[add]]، وبعدين [[multiply]] و [[percent]] (أصعب حتة: التقريب)، وآخر حاجة [[allocate]]. وكل دالة اتكتبلها اختبار قبل اللي بعدها.

~~~js money.js
// money.js: فلوس بالقروش (أعداد صحيحة)، من غير ولا قرش يضيع
const DIGITS = { "٠": 0, "١": 1, "٢": 2, "٣": 3, "٤": 4, "٥": 5, "٦": 6, "٧": 7, "٨": 8, "٩": 9,
  "۰": 0, "۱": 1, "۲": 2, "۳": 3, "۴": 4, "۵": 5, "۶": 6, "۷": 7, "۸": 8, "۹": 9 };
const MAX = Number.MAX_SAFE_INTEGER;

class MoneyError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "MoneyError";
    this.code = code;
  }
}

function assertPiasters(p) {
  if (!Number.isSafeInteger(p)) throw new MoneyError("RANGE", "القروش لازم عدد صحيح آمن: " + p);
  return p;
}

function normalize(text) {
  let out = "";
  for (const ch of text) {
    if (ch in DIGITS) out += DIGITS[ch];
    else if (ch === "٫") out += ".";
    else if (ch === "٬" || ch === "،" || ch === ",") continue;
    else out += ch;
  }
  return out.replace(/ج\.?م\.?|جنيه|EGP|LE/gi, "").replace(/[\s_‎‏؜ ]/g, "");
}

// "1,250.5" أو "١٬٢٥٠٫٥ ج.م" أو 1250.5 → 125050
function parse(input) {
  if (typeof input === "number") {
    if (!Number.isFinite(input)) throw new MoneyError("INVALID", "مش رقم: " + input);
    input = String(input);
  }
  if (typeof input !== "string") throw new MoneyError("INVALID", "النوع لازم نص أو رقم: " + typeof input);
  const text = normalize(input);
  if (text === "") throw new MoneyError("EMPTY", "المبلغ فاضي");
  const m = /^([-+]?)(\d+)(?:\.(\d+))?$/.exec(text);
  if (!m) throw new MoneyError("INVALID", "مش مبلغ: " + input);
  const [, sign, pounds, frac = ""] = m;
  if (frac.length > 2) throw new MoneyError("PRECISION", "أكتر من قرشين بعد العلامة: " + input);
  const big = BigInt(pounds) * 100n + BigInt(frac.padEnd(2, "0"));
  if (big > BigInt(MAX)) throw new MoneyError("RANGE", "المبلغ أكبر من الحد الآمن: " + input);
  const p = Number(big);
  return sign === "-" ? -p : p;
}

const formatters = new Map();
function format(piasters, locale = "ar-EG") {
  assertPiasters(piasters);
  if (!formatters.has(locale)) formatters.set(locale, new Intl.NumberFormat(locale, { style: "currency", currency: "EGP" }));
  return formatters.get(locale).format(piasters / 100);
}

function add(...amounts) {
  let sum = 0;
  for (const p of amounts) sum += assertPiasters(p);
  return assertPiasters(sum);
}

// الـ factor بيتحوّل لكسر بالظبط (0.14 = 14 / 100) والضرب بيتعمل BigInt، فمفيش float في النص
function toFraction(factor) {
  const text = typeof factor === "number" ? String(factor) : String(factor).trim();
  const m = /^([-+]?)(\d+)(?:\.(\d+))?$/.exec(text);
  if (!m) throw new MoneyError("INVALID", "معامل مش صحيح: " + factor);
  const [, sign, int, frac = ""] = m;
  const num = BigInt(int + frac) * (sign === "-" ? -1n : 1n);
  return { num, den: 10n ** BigInt(frac.length) };
}

const MODES = ["halfUp", "halfEven", "down", "up"];
function divRound(num, den, mode) {
  const negative = num < 0n !== den < 0n;
  const a = num < 0n ? -num : num, b = den < 0n ? -den : den;
  let q = a / b;
  const r = a % b;
  if (r !== 0n) {
    if (mode === "up") q += 1n;
    else if (mode === "halfUp" && r * 2n >= b) q += 1n;
    else if (mode === "halfEven" && (r * 2n > b || (r * 2n === b && q % 2n === 1n))) q += 1n;
  }
  return negative ? -q : q;
}

function multiply(piasters, factor, mode = "halfUp") {
  assertPiasters(piasters);
  if (!MODES.includes(mode)) throw new MoneyError("MODE", "طريقة تقريب مش معروفة: " + mode);
  const { num, den } = toFraction(factor);
  return assertPiasters(Number(divRound(BigInt(piasters) * num, den, mode)));
}

const percent = (piasters, pct, mode = "halfUp") => {
  const { num, den } = toFraction(pct);
  if (!MODES.includes(mode)) throw new MoneyError("MODE", "طريقة تقريب مش معروفة: " + mode);
  return assertPiasters(Number(divRound(BigInt(assertPiasters(piasters)) * num, den * 100n, mode)));
};

// تقسيم بنسب: المجموع بيرجع زي ما هو بالظبط، والقروش الزيادة بتروح للي باقيه أكبر
function allocate(piasters, ratios) {
  assertPiasters(piasters);
  if (!Array.isArray(ratios) || ratios.length === 0 || ratios.some(r => !Number.isSafeInteger(r) || r < 0)) {
    throw new MoneyError("RATIOS", "النسب لازم أعداد صحيحة مش سالبة");
  }
  const total = ratios.reduce((s, r) => s + r, 0);
  if (total === 0) throw new MoneyError("RATIOS", "مجموع النسب صفر");
  const sign = piasters < 0 ? -1 : 1, amount = Math.abs(piasters);
  const shares = ratios.map((r, i) => {
    const exact = BigInt(amount) * BigInt(r);
    return { i, base: Number(exact / BigInt(total)), rem: Number(exact % BigInt(total)) };
  });
  let left = amount - shares.reduce((s, x) => s + x.base, 0);
  for (const s of [...shares].sort((a, b) => b.rem - a.rem || a.i - b.i)) {
    if (left === 0) break;
    s.base += 1;
    left -= 1;
  }
  return shares.map(s => s.base * sign || 0);
}

const split = (piasters, people) => {
  if (!Number.isSafeInteger(people) || people <= 0) throw new MoneyError("RATIOS", "عدد الأفراد لازم عدد صحيح موجب");
  return allocate(piasters, Array(people).fill(1));
};

module.exports = { MoneyError, parse, format, add, multiply, percent, allocate, split };
~~~

~~~js demo.js
const money = require("./money");

const prices = ["١٬٢٥٠٫٥٠ ج.م", "EGP 99.99", "45", 0.1, 0.2];
const piasters = prices.map(money.parse);
console.log("بالقروش:", piasters.join(" + "), "=", money.add(...piasters));
console.log("المجموع:", money.format(money.add(...piasters)), "|", money.format(money.add(...piasters), "en-US"));

const subtotal = money.parse("197.75");
const vat = money.percent(subtotal, 14);
console.log("ضريبة ١٤٪ على", money.format(subtotal), "=", money.format(vat), "(" + vat + " قرش)");
console.log("نص قرش: halfUp", money.multiply(5, "0.5"), "| halfEven", money.multiply(5, "0.5", "halfEven"), "|", money.multiply(7, "0.5", "halfEven"));

console.log("١٠٠ جنيه على ٣:", money.split(10000, 3).join(" + "));
console.log("إيجار ٧٥٠٠ بنسب ٣ : ٢ : ٢:", money.allocate(750000, [3, 2, 2]).map(p => money.format(p)).join(" | "));

for (const bad of ["", "12.345", "abc", "99999999999999999", null]) {
  try { money.parse(bad); } catch (e) { console.log(JSON.stringify(bad), "→", e.code, e.message); }
}
~~~

~~~text الناتج: node demo.js
بالقروش: 125050 + 9999 + 4500 + 10 + 20 = 139579
المجموع: ‏١٬٣٩٥٫٧٩ ج.م.‏ | EGP 1,395.79
ضريبة ١٤٪ على ‏١٩٧٫٧٥ ج.م.‏ = ‏٢٧٫٦٩ ج.م.‏ (2769 قرش)
نص قرش: halfUp 3 | halfEven 2 | 4
١٠٠ جنيه على ٣: 3334 + 3333 + 3333
إيجار ٧٥٠٠ بنسب ٣ : ٢ : ٢: ‏٣٬٢١٤٫٢٨ ج.م.‏ | ‏٢٬١٤٢٫٨٦ ج.م.‏ | ‏٢٬١٤٢٫٨٦ ج.م.‏
"" → EMPTY المبلغ فاضي
"12.345" → PRECISION أكتر من قرشين بعد العلامة: 12.345
"abc" → INVALID مش مبلغ: abc
"99999999999999999" → RANGE المبلغ أكبر من الحد الآمن: 99999999999999999
null → INVALID النوع لازم نص أو رقم: object
~~~

~~~js money.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const money = require("./money");

test("parse: أشكال مختلفة لنفس المبلغ", () => {
  for (const s of ["1250.5", "1,250.50", "١٢٥٠٫٥", "١٬٢٥٠٫٥٠ ج.م", "EGP 1250.50", " 1 250.5 "]) {
    assert.equal(money.parse(s), 125050, s);
  }
  assert.equal(money.parse(0.1), 10);
  assert.equal(money.parse("-7.5"), -750);
  assert.equal(money.parse("۴۵"), 4500);
});

test("parse: بيرفض اللي مش فلوس بكود واضح", () => {
  const code = input => { try { money.parse(input); } catch (e) { return e.code; } return "OK"; };
  assert.equal(code(""), "EMPTY");
  assert.equal(code("   "), "EMPTY");
  assert.equal(code("12.345"), "PRECISION");
  assert.equal(code("12abc"), "INVALID");
  assert.equal(code("1e3"), "INVALID");
  assert.equal(code(NaN), "INVALID");
  assert.equal(code(undefined), "INVALID");
  assert.equal(code("99999999999999999"), "RANGE");
});

test("add: أعداد صحيحة بس", () => {
  assert.equal(money.add(10, 20), 30);
  assert.equal(money.add(), 0);
  assert.throws(() => money.add(10, 0.5), { code: "RANGE" });
});

test("percent و multiply: تقريب مظبوط من غير float", () => {
  assert.equal(money.percent(19775, 14), 2769);
  assert.equal(money.percent(19775, "14"), 2769);
  assert.equal(money.multiply(100, 0.07), 7);
  assert.equal(money.multiply(100, 0.145), 15);
  assert.equal(money.multiply(5, "0.5"), 3);
  assert.equal(money.multiply(5, "0.5", "halfEven"), 2);
  assert.equal(money.multiply(7, "0.5", "halfEven"), 4);
  assert.equal(money.multiply(-5, "0.5"), -3);
  assert.equal(money.multiply(199, "0.5", "down"), 99);
  assert.equal(money.multiply(199, "0.5", "up"), 100);
  assert.throws(() => money.multiply(100, "abc"), { code: "INVALID" });
  assert.throws(() => money.multiply(100, 2, "bankers"), { code: "MODE" });
});

test("allocate و split: المجموع مبيتغيّرش", () => {
  assert.deepEqual(money.split(10000, 3), [3334, 3333, 3333]);
  assert.deepEqual(money.allocate(750000, [3, 2, 2]), [321428, 214286, 214286]);
  assert.deepEqual(money.allocate(5, [1, 1]), [3, 2]);
  assert.deepEqual(money.allocate(-5, [1, 1]), [-3, -2]);
  assert.deepEqual(money.allocate(0, [1, 1]), [0, 0]);
  assert.deepEqual(money.allocate(-1, [1, 1]), [-1, 0]);
  for (let total = 1; total <= 500; total += 7) {
    const parts = money.allocate(total, [5, 3, 1, 1]);
    assert.equal(parts.reduce((a, b) => a + b, 0), total);
  }
  assert.throws(() => money.split(100, 0), { code: "RATIOS" });
  assert.throws(() => money.allocate(100, [1, -1]), { code: "RATIOS" });
});

test("format: عربي وإنجليزي", () => {
  const ar = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(1250.5);
  assert.equal(money.format(125050), ar);
  assert.equal(money.format(125050, "en-US"), "EGP 1,250.50");
  assert.throws(() => money.format(1.5), { code: "RANGE" });
});
~~~

~~~text الناتج: node --test (Node 24.22)
✔ parse: أشكال مختلفة لنفس المبلغ (4.0442ms)
✔ parse: بيرفض اللي مش فلوس بكود واضح (0.5556ms)
✔ add: أعداد صحيحة بس (3.0965ms)
✔ percent و multiply: تقريب مظبوط من غير float (1.0943ms)
✔ allocate و split: المجموع مبيتغيّرش (2.9553ms)
✔ format: عربي وإنجليزي (24.6041ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 216.6953
~~~

**أهم الحتت وليه كده:**

| الحتة | بتعمل إيه | ليه |
|---|---|---|
| [[MoneyError]] بـ [[code]] | error ليه كود ثابت ورسالة عربي | اللي بيستخدم المكتبة بيفرّق بين «فاضي» و «كسر زيادة» من غير ما يقرا الرسالة |
| [[normalize]] | الأرقام العربي والفارسي لإنجليزي، ويشيل الفواصل والعملة والمسافات وحروف الاتجاه | اليوزر بيلزق مبلغ من صفحة فيها RLM و NBSP مخفيين |
| [[parse]] بـ BigInt | [[BigInt(pounds) * 100n + BigInt(frac)]] وبعدين يتأكد إنه تحت [[MAX_SAFE_INTEGER]] | مبلغ زي [["99999999999999999"]] ميتقرّبش في سكوت |
| [[toFraction("0.145")]] | [[{ num: 145n, den: 1000n }]] | النسبة بتتحسب كسر بالظبط مش float |
| [[divRound]] | قسمة BigInt وتقريب حسب الطريقة من الباقي | [[r * 2n >= b]] يعني «الباقي نص أو أكتر» من غير أي كسر |
| [[halfEven]] | النص بيروح للزوجي | للتقارير اللي فيها آلاف عمليات، عشان التقريب ميزوّدش المجموع |
| [[allocate]] | كل نصيب [[floor]]، والقروش الباقية للي باقي قسمته أكبر | طريقة «largest remainder»: المجموع ثابت والتوزيع عادل |
| [[formatters]] [[Map]] | formatter واحد لكل لغة | إنشاء [[Intl.NumberFormat]] تقيل (اتقاس في درس toLocaleString) |

**الغلطات اللي حصلت وأنا ببنيها (حقيقية، واتصلحت):**

1. أول [[multiply]] كانت [[Math.round(piasters * factor)]]، والاختبارات كانت عدّت لحد ما جرّبت نسب كتير بسكربت قارن الطريقتين لكل مبلغ من ١ لـ ١٠٠ ألف، وأول اختلاف كان هنا:

~~~text الناتج
14 14.499999999999998
~~~

١٠٠ قرش × ١٤٫٥٪ = ١٤٫٥ بالظبط، والمفروض تتقرّب 15. بس [[100 * 0.145]] = [[14.499999999999998]] فـ [[Math.round]] نزّلتها 14. عشان كده [[toFraction]] و [[divRound]] بـ BigInt، والاختبار ده بقى جزء من [[money.test.js]].

2. [[allocate]] لمبلغ سالب صغير: النسخة الأولى كانت بترجّع [[s.base * sign]]، والاختبار ده وقع:

~~~text الناتج (النسخة الأولى)
test at neg.test.js:4:1
✖ allocate: مبلغ سالب صغير (4.7378ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected
  
    [
      -1,
  +   -0
  -   0
    ]
~~~

[[0 * -1]] = [[-0]]، و [[assert.deepEqual]] الـ strict بيفرّق بين [[-0]] و [[0]] (بيستخدم [[Object.is]]). الحل: [[s.base * sign || 0]]: الـ [[-0]] falsy فبيبقى 0.

3. [[format]] في الاختبار: مكنتش أقدر أكتب النص العربي المتوقع بإيدي (فيه RLM و NBSP)، فالاختبار بيقارن بناتج [[Intl.NumberFormat]] نفسه، والإنجليزي مكتوب بالـ NBSP صراحة ([[ ]]).

**ليه مش مكتبة جاهزة؟** فيه مكتبات زي dinero.js و currency.js بتعمل ده وأكتر، واستخدمها في مشروع كبير. المشروع ده عشان تفهم المشاكل اللي هي بتحلها، فتعرف تختار وتراجع.` },
        { lvl: 'كبير', t: R`IDs كبيرة: مولّد Snowflake وقارئ JSON من غير ما رقم يتغيّر`, what: R`نظام IDs زي اللي بتستخدمه شبكات اجتماعية: كل ID ٦٤ bit فيهم الوقت بالمللي ثانية من بداية ٢٠٢٥ (41 bit) ورقم السيرفر (10 bit) وعدّاد جوه نفس المللي ثانية (12 bit). [[snowflake.js]] فيه:
• [[createGenerator(workerId, clock)]] بيولّد IDs بتزيد دايمًا، وبيستنى لو العدّاد خلص، ويرمي error لو ساعة الجهاز رجعت لورا.
• [[decode(id)]] بيفك أي ID لوقت ورقم سيرفر وترتيب.
• [[parseJson(text)]] بيقرا JSON والـ IDs فيه BigInt من النص الأصلي، و [[stringify]] بيكتبها نصوص.
و [[cli.js]] بيقرا ملف طلبات ويرتّبها ويفكها ويكتب نسخة آمنة. ومعاه [[node --test]].`, done: R`[[node --test]] بيطلّع ٧ اختبارات ✔، ومنهم إن ٤٠٩٧ ID في نفس المللي ثانية مفيهمش تكرار. و [[node cli.js orders.json]] بيوريك إن [[JSON.parse]] العادي حوّل ٤ IDs لـ ٢ بس، وبعدين الأربعة متفكوكين ومترتبين، وبيكتب [[orders.safe.json]] بالـ IDs نصوص. ومن غير ملف، أو بملف مش موجود، أو بـ ID سالب: رسالة واضحة و exit code 1.`, ext: R`خلي الـ CLI يولّد IDs ([[node cli.js new 5]])، وزوّد [[fromDate(date)]] بيرجّع أصغر ID في لحظة معينة (عشان تعمل query «الطلبات بعد الساعة ٩»)، واكتب نفس الـ decode في Postgres بـ [[>>]] و [[&]] على عمود [[BIGINT]] وقارن الناتج.`, sol: R`**هتشوف إيه:** أول سطر بيوريك المشكلة (IDs مختلفة بقت زي بعض بعد [[JSON.parse]] العادي)، وبعدين كل طلب بالـ ID بتاعه مظبوط ووقته ورقم السيرفر وترتيبه، مترتبين من الأقدم، وآخر سطر بيأكد إن الملف الجديد فيه الـ IDs صح.

~~~text شجرة الملفات
snowflake/
├── snowflake.js        المولّد و decode و parseJson و stringify
├── snowflake.test.js   اختبارات node --test
├── cli.js              أداة سطر الأوامر
├── orders.json         ملف طلبات للتجربة (IDs أرقام كبيرة)
└── orders.safe.json    بيتعمل لما تشغّل cli.js (IDs نصوص)
~~~

**ترتيب البناء:** شكل الـ ID والثوابت الأول، وبعدين [[decode]] (أسهل حاجة تتأكد منها)، وبعدين المولّد بساعة وهمية ([[clock]]) عشان الاختبار يبقى ثابت، وبعدين [[parseJson]] و [[stringify]]، وآخر حاجة الـ CLI.

~~~js snowflake.js
// IDs من ٦٤ bit: وقت (41 bit) + رقم السيرفر (10 bit) + عدّاد في نفس المللي ثانية (12 bit)
const EPOCH = 1735689600000n; // 2025-01-01T00:00:00Z
const WORKER_BITS = 10n;
const SEQ_BITS = 12n;
const MAX_WORKER = (1n << WORKER_BITS) - 1n;
const MAX_SEQ = (1n << SEQ_BITS) - 1n;
const TIME_SHIFT = WORKER_BITS + SEQ_BITS;

function createGenerator(workerId, clock = () => Date.now()) {
  if (!Number.isInteger(workerId) || workerId < 0 || BigInt(workerId) > MAX_WORKER) {
    throw new RangeError("workerId من 0 لـ " + MAX_WORKER + ": " + workerId);
  }
  const worker = BigInt(workerId);
  let lastMs = -1, seq = 0n;
  return function nextId() {
    let ms = clock();
    if (ms < lastMs) throw new Error("ساعة الجهاز رجعت لورا: " + ms + " < " + lastMs);
    if (ms === lastMs) {
      seq = (seq + 1n) & MAX_SEQ;
      if (seq === 0n) while ((ms = clock()) <= lastMs);
    } else {
      seq = 0n;
    }
    lastMs = ms;
    return ((BigInt(ms) - EPOCH) << TIME_SHIFT) | (worker << SEQ_BITS) | seq;
  };
}

function parseId(value) {
  if (typeof value === "bigint") return checkId(value);
  if (typeof value === "string" && /^\d{1,19}$/.test(value)) return checkId(BigInt(value));
  if (typeof value === "number") throw new TypeError("الـ ID وصل number ودقته ضاعت، ابعته نص: " + value);
  throw new SyntaxError("ID مش صحيح: " + value);
}
function checkId(id) {
  if (id < 0n || BigInt.asUintN(63, id) !== id) throw new RangeError("الـ ID لازم يدخل في 63 bit: " + id);
  return id;
}

function decode(value) {
  const id = parseId(value);
  const ms = Number((id >> TIME_SHIFT) + EPOCH);
  return {
    id: id.toString(),
    time: new Date(ms).toISOString(),
    worker: Number((id >> SEQ_BITS) & MAX_WORKER),
    sequence: Number(id & MAX_SEQ)
  };
}

const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// بيقرا JSON ويحوّل المفاتيح دي لـ BigInt من النص الأصلي، قبل ما الـ number يقرّبها
function parseJson(text, idKeys = ["id"]) {
  return JSON.parse(text, (key, value, ctx) => {
    if (!idKeys.includes(key)) return value;
    if (typeof value === "number") return checkId(BigInt(ctx.source));
    return parseId(value);
  });
}
const stringify = (data, space) => JSON.stringify(data, (k, v) => (typeof v === "bigint" ? v.toString() : v), space);

module.exports = { EPOCH, createGenerator, parseId, decode, compare, parseJson, stringify };
~~~

~~~js cli.js
// node cli.js orders.json
const fs = require("fs");
const sf = require("./snowflake");

const file = process.argv[2];
if (!file) {
  console.error("الاستخدام: node cli.js <file.json>");
  process.exit(1);
}
let text;
try {
  text = fs.readFileSync(file, "utf8");
} catch (e) {
  console.error("مش قادر أقرا الملف:", e.code);
  process.exit(1);
}

const naive = JSON.parse(text).orders.map(o => o.id);
console.log("JSON.parse العادي:", new Set(naive).size, "IDs مختلفة من", naive.length, "→", naive.join(" "));

let data;
try {
  data = sf.parseJson(text);
} catch (e) {
  console.error("الملف فيه ID غلط:", e.message);
  process.exit(1);
}
const orders = data.orders.sort((a, b) => sf.compare(a.id, b.id));
for (const o of orders) {
  const d = sf.decode(o.id);
  console.log(d.id, "|", d.time, "| سيرفر", d.worker, "| ترتيب", d.sequence, "|", o.customer);
}
fs.writeFileSync("orders.safe.json", sf.stringify(data, 1));
console.log("اتكتب orders.safe.json، أول ID فيه:", JSON.parse(fs.readFileSync("orders.safe.json", "utf8")).orders[0].id);
~~~

~~~text orders.json
{"orders": [
  {"id": 249490380452556800, "customer": "مها", "total": 18500},
  {"id": 249466297253916673, "customer": "كريم", "total": 7250},
  {"id": 249466297253916672, "customer": "سلمى", "total": 32000},
  {"id": 249466297253916674, "customer": "عمر", "total": 4100}
]}
~~~

~~~text الناتج: node cli.js orders.json
JSON.parse العادي: 2 IDs مختلفة من 4 → 249490380452556800 249466297253916670 249466297253916670 249466297253916670
249466297253916672 | 2026-11-20T09:30:00.125Z | سيرفر 7 | ترتيب 0 | سلمى
249466297253916673 | 2026-11-20T09:30:00.125Z | سيرفر 7 | ترتيب 1 | كريم
249466297253916674 | 2026-11-20T09:30:00.125Z | سيرفر 7 | ترتيب 2 | عمر
249490380452556800 | 2026-11-20T11:05:42.007Z | سيرفر 7 | ترتيب 0 | مها
اتكتب orders.safe.json، أول ID فيه: 249466297253916672
exit code: 0
~~~

~~~text الأخطاء: من غير ملف، وملف مش موجود، و ID سالب
الاستخدام: node cli.js <file.json>
exit code: 1
مش قادر أقرا الملف: ENOENT
exit code: 1
JSON.parse العادي: 1 IDs مختلفة من 1 → -5
الملف فيه ID غلط: الـ ID لازم يدخل في 63 bit: -5
exit code: 1
~~~

~~~js snowflake.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const sf = require("./snowflake");

const T = Date.UTC(2026, 10, 20, 9, 30, 0, 125);
const clockFrom = list => { let i = 0; return () => list[Math.min(i++, list.length - 1)]; };

test("الـ IDs بتزيد والـ decode بيرجّع نفس البيانات", () => {
  const next = sf.createGenerator(7, clockFrom([T, T, T + 1]));
  const [a, b, c] = [next(), next(), next()];
  assert.ok(a < b && b < c);
  assert.deepEqual(sf.decode(a), { id: a.toString(), time: "2026-11-20T09:30:00.125Z", worker: 7, sequence: 0 });
  assert.equal(sf.decode(b).sequence, 1);
  assert.equal(sf.decode(c).sequence, 0);
  assert.ok(a > BigInt(Number.MAX_SAFE_INTEGER));
});

test("لما العدّاد يخلص بيستنى المللي ثانية الجاية", () => {
  const times = Array(4097).fill(T).concat([T, T + 1]);
  const next = sf.createGenerator(1, clockFrom(times));
  let last;
  for (let i = 0; i < 4097; i++) last = next();
  assert.equal(sf.decode(last).sequence, 0);
  assert.equal(sf.decode(last).time, "2026-11-20T09:30:00.126Z");
});

test("الساعة لو رجعت لورا: error مش ID مكرر", () => {
  const next = sf.createGenerator(1, clockFrom([T, T - 5]));
  next();
  assert.throws(() => next(), /رجعت لورا/);
});

test("workerId برّه المدى", () => {
  assert.throws(() => sf.createGenerator(1024), RangeError);
  assert.throws(() => sf.createGenerator(-1), RangeError);
  assert.throws(() => sf.createGenerator(1.5), RangeError);
});

test("parseJson بيحفظ الأرقام الكبيرة، و JSON.parse العادي لأ", () => {
  const text = '{"id": 249466297253916673, "n": 5}';
  assert.equal(JSON.parse(text).id, 249466297253916670);
  const data = sf.parseJson(text);
  assert.equal(data.id, 249466297253916673n);
  assert.equal(data.n, 5);
  assert.equal(sf.parseJson('{"id": "249466297253916673"}').id, 249466297253916673n);
  assert.equal(sf.stringify(data), '{"id":"249466297253916673","n":5}');
});

test("parseId بيرفض الغلط", () => {
  assert.throws(() => sf.parseId(249466297253916673), TypeError);
  assert.throws(() => sf.parseId("12a"), SyntaxError);
  assert.throws(() => sf.parseId(-1n), RangeError);
  assert.throws(() => sf.parseId(1n << 63n), RangeError);
});

test("الترتيب بـ compare مش بالطرح", () => {
  const ids = [3n, 1n, 2n];
  assert.deepEqual(ids.sort(sf.compare), [1n, 2n, 3n]);
  assert.throws(() => [3n, 1n].sort((a, b) => a - b), TypeError);
});
~~~

~~~text الناتج: node --test (Node 24.22)
✔ الـ IDs بتزيد والـ decode بيرجّع نفس البيانات (6.9465ms)
✔ لما العدّاد يخلص بيستنى المللي ثانية الجاية (4.2767ms)
✔ الساعة لو رجعت لورا: error مش ID مكرر (0.9322ms)
✔ workerId برّه المدى (0.3804ms)
✔ parseJson بيحفظ الأرقام الكبيرة، و JSON.parse العادي لأ (0.6573ms)
✔ parseId بيرفض الغلط (0.4612ms)
✔ الترتيب بـ compare مش بالطرح (0.9575ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 181.3708
~~~

**أهم الحتت وليه كده:**

| الحتة | بتعمل إيه |
|---|---|
| [[(BigInt(ms) - EPOCH) << TIME_SHIFT]] | الوقت من بداية ٢٠٢٥ متزحلق ٢٢ bit شمال، فالـ IDs الأحدث دايمًا أكبر: الترتيب بالـ ID = الترتيب بالوقت |
| [[worker << SEQ_BITS]] و [[seq]] بالـ OR | رقم السيرفر في الـ ١٠ bits اللي بعدهم، والعدّاد في آخر ١٢. كل حتة ليها مكان، فالـ OR بيلزقهم من غير تداخل |
| [[(seq + 1n) & MAX_SEQ]] | العدّاد بيلف من 4095 لـ 0، ولو لف يبقى خلص في المللي ثانية دي فبنستنى اللي بعدها |
| [[clock]] كـ parameter | في الاختبار بنبعت ساعة وهمية ثابتة، فالنتيجة واحدة كل مرة |
| [[decode]] بـ [[>>]] و [[&]] | عكس التجميع: زحلقة يمين وبعدين mask |
| [[BigInt.asUintN(63, id) !== id]] | الـ ID لازم يدخل في 63 bit (عشان يتخزن في [[BIGINT]] موجب في Postgres) |
| [[parseJson]] بـ [[ctx.source]] | الـ reviver بياخد النص الأصلي للرقم قبل ما يتقرّب (درس «BigInt بعمق») |
| [[parseId]] بيرفض [[number]] | لو ID وصل number يبقى دقته ضاعت خلاص، فأحسن error من رقم غلط |
| [[compare]] | ترتيب bigint بـ [[<]] و [[>]] (الطرح بيرمي TypeError، وفيه اختبار بيثبت ده) |

**الغلطة اللي حصلت وأنا ببنيه (حقيقية):** أول نسخة كان العدّاد [[seq = seq + 1n]] من غير [[& MAX_SEQ]] ومن غير استنى. لما ولّدت ٤٠٩٧ ID بساعة واقفة:

~~~text الناتج
أول ID: 249466297253892096n | رقم 4097: 249466297253892096n | متكررين؟ true | IDs مختلفة: 4096
~~~

العدّاد وصل 4096 = [[1 << 12]]، وده نفس مكان أول bit في رقم السيرفر. فالـ OR مع [[worker << 12]] (اللي هو كمان 4096 للسيرفر 1) طلّع **نفس** أول ID. ID متكرر في جدول طلبات معناه طلبين بيكتبوا على بعض. الحل: الـ mask بيلف العدّاد، ولو لف بنستنى المللي ثانية الجاية، واختبار «لما العدّاد يخلص» بيثبت ده.

**ليه مش UUID؟** UUID (128 bit عشوائي) مش محتاج تنسيق بين السيرفرات، بس مش مترتب بالوقت وحجمه الضعف. الـ Snowflake رقم واحد صغير مترتب بالوقت، وده بيخلّي الـ index في قاعدة البيانات أسرع. البديل الأحدث UUIDv7 (مترتب بالوقت برضه) لو مش عايز تدير أرقام سيرفرات.` },
        { lvl: 'فكرة', t: R`حاسبة أقساط من حياتك`, what: R`فكّر في حاجة بتقسّطها أو ممكن تقسّطها: موبايل، أو عربية، أو كورس، أو جهاز. اعمل أداة بتاخد المبلغ والفايدة السنوية وعدد الشهور، وتطبع القسط الشهري، وجدول بأول كام شهر وآخر شهر (القسط وكام منه فايدة والباقي)، وإجمالي اللي هتدفعه والفايدة كلها. كل الحساب بالقروش، و [[Math.pow]] للقانون، وآخر قسط بيتظبط عشان الباقي يبقى صفر بالظبط.`, done: R`على أرقام حقيقية من عرض تقسيط شفته، القسط بيطلع زي اللي في العرض (أو بفرق قروش تعرف سببه)، والباقي في آخر شهر صفر، والفايدة صفر شغالة من غير [[NaN]]، والمدخلات الغلط بتطلّع رسالة.`, ext: R`زوّد مقارنة بين عرضين (مثلًا ١٢ شهر بفايدة ١٥٪ ضد ٢٤ شهر بـ ١٨٪)، وسداد مبكر في شهر معين بيقلّل الفايدة، وصدّر الجدول CSV.`, sol: R`**نسخة نموذجية:** قرض ١٢٠ ألف جنيه بفايدة ١٨٪ في السنة على ٢٤ شهر، وقرض من غير فايدة كحالة طرفية، ومدخل غلط.

~~~js installments.js
// node installments.js <المبلغ بالجنيه> <الفايدة السنوية ٪> <عدد الشهور>
function schedule(principalPiasters, yearlyPercent, months) {
  if (!Number.isSafeInteger(principalPiasters) || principalPiasters <= 0) throw new RangeError("المبلغ لازم أكبر من صفر");
  if (!Number.isFinite(yearlyPercent) || yearlyPercent < 0 || yearlyPercent > 100) throw new RangeError("الفايدة من 0 لـ 100");
  if (!Number.isInteger(months) || months < 1 || months > 600) throw new RangeError("الشهور من 1 لـ 600");
  const r = yearlyPercent / 100 / 12;
  const payment = r === 0
    ? Math.ceil(principalPiasters / months)
    : Math.round(principalPiasters * r / (1 - Math.pow(1 + r, -months)));
  const rows = [];
  let balance = principalPiasters;
  for (let m = 1; m <= months; m++) {
    const interest = Math.round(balance * r);
    let pay = payment;
    if (m === months || pay > balance + interest) pay = balance + interest;
    const principal = pay - interest;
    balance -= principal;
    rows.push({ m, pay, interest, principal, balance });
    if (balance === 0) break;
  }
  return rows;
}

const egp = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
const show = p => egp.format(p / 100).padStart(14);

const [amountText = "120000", rateText = "18", monthsText = "24"] = process.argv.slice(2);
try {
  const amount = Math.round(Number(amountText) * 100);
  const rows = schedule(amount, Number(rateText), Number(monthsText));
  console.log("قرض", egp.format(amount / 100), "بفايدة", rateText + "٪ سنويًا على", rows.length, "شهر");
  for (const row of [...rows.slice(0, 3), rows[rows.length - 1]]) {
    console.log("شهر", String(row.m).padStart(2), "| القسط", show(row.pay), "| فايدة", show(row.interest), "| الباقي", show(row.balance));
  }
  const paid = rows.reduce((s, x) => s + x.pay, 0);
  console.log("إجمالي المدفوع:", egp.format(paid / 100), "| الفايدة كلها:", egp.format((paid - amount) / 100));
} catch (e) {
  console.error("خطأ:", e.message);
  process.exitCode = 1;
}
~~~

~~~text الناتج: node installments.js
قرض ‏١٢٠٬٠٠٠٫٠٠ ج.م.‏ بفايدة 18٪ سنويًا على 24 شهر
شهر  1 | القسط ‏٥٬٩٩٠٫٨٩ ج.م.‏ | فايدة ‏١٬٨٠٠٫٠٠ ج.م.‏ | الباقي ‏١١٥٬٨٠٩٫١١ ج.م.‏
شهر  2 | القسط ‏٥٬٩٩٠٫٨٩ ج.م.‏ | فايدة ‏١٬٧٣٧٫١٤ ج.م.‏ | الباقي ‏١١١٬٥٥٥٫٣٦ ج.م.‏
شهر  3 | القسط ‏٥٬٩٩٠٫٨٩ ج.م.‏ | فايدة ‏١٬٦٧٣٫٣٣ ج.م.‏ | الباقي ‏١٠٧٬٢٣٧٫٨٠ ج.م.‏
شهر 24 | القسط ‏٥٬٩٩٠٫٩٨ ج.م.‏ | فايدة   ‏٨٨٫٥٤ ج.م.‏ | الباقي    ‏٠٫٠٠ ج.م.‏
إجمالي المدفوع: ‏١٤٣٬٧٨١٫٤٥ ج.م.‏ | الفايدة كلها: ‏٢٣٬٧٨١٫٤٥ ج.م.‏
~~~

~~~text الناتج: node installments.js 12000 0 5
قرض ‏١٢٬٠٠٠٫٠٠ ج.م.‏ بفايدة 0٪ سنويًا على 5 شهر
شهر  1 | القسط ‏٢٬٤٠٠٫٠٠ ج.م.‏ | فايدة    ‏٠٫٠٠ ج.م.‏ | الباقي ‏٩٬٦٠٠٫٠٠ ج.م.‏
شهر  2 | القسط ‏٢٬٤٠٠٫٠٠ ج.م.‏ | فايدة    ‏٠٫٠٠ ج.م.‏ | الباقي ‏٧٬٢٠٠٫٠٠ ج.م.‏
شهر  3 | القسط ‏٢٬٤٠٠٫٠٠ ج.م.‏ | فايدة    ‏٠٫٠٠ ج.م.‏ | الباقي ‏٤٬٨٠٠٫٠٠ ج.م.‏
شهر  5 | القسط ‏٢٬٤٠٠٫٠٠ ج.م.‏ | فايدة    ‏٠٫٠٠ ج.م.‏ | الباقي    ‏٠٫٠٠ ج.م.‏
إجمالي المدفوع: ‏١٢٬٠٠٠٫٠٠ ج.م.‏ | الفايدة كلها: ‏٠٫٠٠ ج.م.‏
~~~

~~~text الناتج: node installments.js 5000 18 0
خطأ: الشهور من 1 لـ 600
exit code: 1
~~~

**ليه اخترت التصميم ده:**

- **القانون:** القسط = [[P × r ÷ (1 - (1 + r) أس -n)]]، و [[r]] الفايدة الشهرية (السنوية ÷ ١٢ ÷ ١٠٠). ده قانون الـ amortization اللي البنوك بتستخدمه: القسط ثابت، والفايدة بتتحسب كل شهر على الباقي بس.
- **بالقروش:** [[principalPiasters]] عدد صحيح، والفايدة كل شهر [[Math.round(balance * r)]] للقرش، فكل رقم في الجدول قروش حقيقية.
- **آخر قسط:** القسط الثابت متقرّب، فبعد ٢٤ شهر بيفضل فرق قروش. آخر شهر بيدفع [[balance + interest]] بالظبط، فطلع ٥٩٩٠٫٩٨ بدل ٥٩٩٠٫٨٩ والباقي صفر. ده نفس اللي البنوك بتعمله.
- **عرضت أول ٣ شهور وآخر شهر بس:** ٢٤ سطر كتير في الترمنال، والمهم إنك تشوف الفايدة بتقل كل شهر (١٨٠٠ ثم ١٧٣٧ ثم ١٦٧٣) لحد ٨٨ في الآخر.
- **الحدود:** ٦٠٠ شهر (٥٠ سنة) حد معقول، والفايدة من ٠ لـ ١٠٠.

**الغلطة اللي حصلت:** أول نسخة كانت بتحسب القانون على طول من غير حالة الصفر:

~~~text الناتج من 1200000 * 0 / (1 - Math.pow(1 + 0, -5))
NaN
~~~

لما [[r = 0]]: البسط صفر والمقام [[1 - 1]] صفر، و [[0 / 0]] = [[NaN]]، والجدول كله كان هيبقى [[NaN]]. عرض «تقسيط من غير فوايد» حقيقي ومنتشر، فلازم حالته تتكتب لوحدها: [[Math.ceil(principal / months)]] والقسط الأخير بيتظبط.` },
      ],
      items: [
        {
          cmd: "numeric literals و numeric separators",
          title: "تكتب رقم في الكود بكام طريقة: 1e3 و 0xff و 0b1010 و 0o755 و 1_000_000؟",
          desc: R`الـ literal هو الرقم وهو مكتوب في الكود نفسه. JavaScript بتقبل نفس الرقم بكذا كتابة: عشري بكسر أو بأُس ([[2.5e-3]])، و hex بـ [[0x]]، و binary بـ [[0b]]، و octal بـ [[0o]]، وتقدر تفصل الخانات بـ [[_]] عشان تتقري ([[1_000_000]]). كلهم بيطلعوا نفس النوع [[number]] ونفس القيمة، الفرق في القراية بس.

الكتابة دي للكود اللي انت بتكتبه بس. النص اللي جاي من يوزر ([["12_500"]]) مبيتفهمش بنفس القواعد: [[Number("12_500")]] بـ [[NaN]].

الدرس ده بيكمّل «number و NaN» (إزاي الرقم بيتخزن) و «المتغيرات والأنواع والعمليات» (إزاي بتحطه في متغير).`,
          example: R`// نفس الرقم 255 بأربع كتابات
console.log(255, 0xff, 0b1111_1111, 0o377);
// كسور وأُس
console.log(0.5, .5, 1e3, 2.5e-3);
// فواصل للقراية بس
const salary = 12_500;
const fileLimit = 5_000_000;
console.log(salary + fileLimit);
// صلاحيات ملف على لينكس بالـ octal
const mode = 0o755;
console.log(mode, mode.toString(8));
// النص مبيفهمش الـ _
console.log(Number("12_500"), Number("0xff"));`,
          try: R`اعمل ملف [[lit.js]] واكتب فيه [[console.log(0x1F, 0b11111, 0o37, 31, 3.1e1)]] وشغّله بـ [[node lit.js]]: الخمسة طلعوا إيه؟ بعدين زوّد سطر [[const big = 1__000;]] (شرطتين) وشغّل تاني واقرا الـ error كله: بيقولك إيه بالظبط وفين؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب على ورقة السطر ده هيطبع إيه: [[console.log(0x10, 0b10, 0o10, 1e1, 10, 0.1e2)]].`, done: R`كتبت ٦ أرقام قبل التشغيل، وطلعوا زي ما كتبت، وتقدر تقول كل واحد اتقري بأنهي أساس.`, sol: R`~~~js d1.js
console.log(0x10, 0b10, 0o10, 1e1, 10, 0.1e2);
~~~

~~~text الناتج (Node 24.22)
16 2 8 10 10 10
~~~

**ليه:**

- [[0x10]]: hex، يعني أساس ١٦، فـ «10» فيه = ١×١٦ + ٠ = **16**.
- [[0b10]]: binary، أساس ٢: ١×٢ + ٠ = **2**.
- [[0o10]]: octal، أساس ٨: ١×٨ + ٠ = **8**.
- [[1e1]]: ١ × ١٠ أس ١ = **10**. و [[0.1e2]]: ٠٫١ × ١٠٠ = **10**.

نفس الرقمين «1 و 0» بيطلعوا ٤ قيم مختلفة حسب الـ prefix. والغلطة الشائعة إنك تقرا [[0o10]] «عشرة» وهي تمانية.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف فيه [["use strict"]] وفيه سطرين: [[const maxUpload = 10__000_000;]] و [[const filePerm = 0644;]]. شغّله، صلّح أول error، وشغّل تاني لحد ما يشتغل ويطبع الصلاحيات بالـ octal.`, done: R`شفت errorين ورا بعض (مش مع بعض)، وبعد التصليح الملف بيطبع [[10000000 420 644]].`, sol: R`أول تشغيل للملف البايظ:

~~~text الناتج
const maxUpload = 10__000_000;
                     ^

SyntaxError: Only one underscore is allowed as numeric separator
~~~

بعد ما صلّحت الشرطتين ([[10_000_000]])، طلع الـ error التاني:

~~~text الناتج
const filePerm = 0644;
                 ^^^^

SyntaxError: Octal literals are not allowed in strict mode.
~~~

الحل:

~~~js d2.js
"use strict";
const maxUpload = 10_000_000;
const filePerm = 0o644;
console.log(maxUpload, filePerm, filePerm.toString(8));
~~~

~~~text الناتج
10000000 420 644
~~~

**ليه:**

- الـ [[_]] بيفصل بين رقمين، ومينفعش اتنين ورا بعض. الرسالة قالتها بالنص: «Only one underscore».
- [[0644]] (صفر في الأول) هي الطريقة القديمة للـ octal، و [["use strict"]] بيمنعها. الحديثة [[0o644]].
- [[420]] هي نفس [[0o644]] بالعشري. و [[toString(8)]] بترجّعها نص octal تاني [["644"]] عشان تقارنها بـ [[chmod 644]].
- لاحظ إن JavaScript بيقف عند **أول** SyntaxError ومبينفّذش أي سطر: الكود بيتقري كله الأول قبل ما يشتغل.` },
            { lvl: 'تطبيق', t: R`**ابني:** ملف [[constants.js]] فيه ثوابت مشروع حقيقي مكتوبة بأوضح literal لكل واحد: يوم بالمللي ثانية، و ١ جيجا بالبايت، وأعلى سعر 99999.99، واللون الأحمر [[#FF0000]] كرقم، وصلاحيات فولدر [[755]]، و ٤ flags كلهم شغالين. اطبعهم، وتأكد إن الجيجا = [[2 ** 30]].`, done: R`الملف بيطبع [[86400000 true 99999.99 16711680 493 15]]، وكل ثابت مكتوب بطريقة حد يقراها يفهم هو إيه من غير حساب.`, sol: R`~~~js constants.js
const ONE_DAY_MS = 24 * 60 * 60 * 1_000;
const ONE_GB = 1_073_741_824;
const MAX_PRICE = 99_999.99;
const RED = 0xFF_00_00;
const DIR_MODE = 0o755;
const ALL_FLAGS = 0b1111;
console.log(ONE_DAY_MS, ONE_GB === 2 ** 30, MAX_PRICE, RED, DIR_MODE, ALL_FLAGS);
~~~

~~~text الناتج
86400000 true 99999.99 16711680 493 15
~~~

**ليه كل كتابة:**

- اليوم [[24 * 60 * 60 * 1_000]]: الضرب بيقول الحكاية (ساعات × دقايق × ثواني × مللي). لو كتبت [[86400000]] محدش هيعرف ده إيه.
- الجيجا [[1_073_741_824]] بالفواصل، والسطر الأخير بيتأكد إنها [[2 ** 30]] (طلعت [[true]]).
- الأحمر [[0xFF_00_00]]: نفس شكل [[#FF0000]] في CSS، والـ [[_]] بيفصل الأحمر والأخضر والأزرق.
- الصلاحيات [[0o755]]: نفس الرقم اللي بتكتبه في [[chmod]].
- الـ flags [[0b1111]]: كل خانة flag، فبتشوف بعينك إن الأربعة شغالين.

**الغلطة الشائعة:** تكتب [[255]] للون أو [[493]] للصلاحيات. القيمة صح بس القارئ مش هيعرف هي جاية منين.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من غير ما تقرا الشرح تاني، جرّب الـ literals دي واحدة واحدة وقول مين صح ومين error: [[1_000n]] و [[0xff_ff]] و [[1e1_0]] و [[1_000.000_1]] و [[0b_1]] و [[1e_10]] و [[0.5_0]]. وبعدين استنتج القاعدة في سطر واحد.`, done: R`عندك جدول بالسبعة: ٥ اشتغلوا و ٢ طلّعوا SyntaxError، وقاعدتك بتشرح الاتنين دول.`, sol: R`جرّبتهم بملف فيه سطر واحد لكل literal ([[console.log(...)]]) على Node 24.22:

| الـ literal | النتيجة |
|---|---|
| [[1_000n]] | [[1000n]]: الفاصل شغال في الـ BigInt كمان |
| [[0xff_ff]] | [[65535]]: شغال جوه الـ hex بعد الـ prefix |
| [[1e1_0]] | [[10000000000]]: شغال جوه الأُس |
| [[1_000.000_1]] | [[1000.0001]]: شغال قبل العلامة وبعدها |
| [[0.5_0]] | [[0.5]]: شغال، والصفر في الآخر ملوش قيمة |
| [[0b_1]] | [[SyntaxError: Invalid or unexpected token]] |
| [[1e_10]] | [[SyntaxError: Invalid or unexpected token]] |

**القاعدة:** الـ [[_]] لازم يبقى **بين رقمين**. مينفعش جنب حرف ([[b]] و [[e]] و [[x]])، ولا جنب النقطة، ولا في الأول، ولا في الآخر، ولا اتنين ورا بعض.` },
            { lvl: 'تحدي', t: R`**مسألة:** اليوزر بيكتب أرقام بأشكال مختلفة في فورم. اكتب [[cleanNumber(text)]] بتشيل [[_]] والفاصلة والمسافات من النص وترجّع رقم، وترجّع [[NaN]] لو النص فاضي أو مش رقم.`, done: R`الاختبارات كلها بتعدّي، ومنهم [[cleanNumber("12,500.75")]] = 12500.75 و [[cleanNumber("")]] = NaN.`, sol: R`~~~js clean-number.js
function cleanNumber(text) {
  const t = String(text).trim().replace(/[_,\s]/g, "");
  return t === "" ? NaN : Number(t);
}
console.log(cleanNumber("1_000"), cleanNumber("12,500.75"), cleanNumber(" 7 "), cleanNumber(""), cleanNumber("1e3"), cleanNumber("abc"), cleanNumber("1 250 000"));
~~~

~~~text الناتج
1000 12500.75 7 NaN 1000 NaN 1250000
~~~

**ليه كده:**

- [[String(text).trim()]]: لو حد بعت رقم مش نص، [[String]] بتحوّله. و [[trim]] بتشيل المسافات من الأطراف.
- [[replace(/[_,\s]/g, "")]]: بتشيل كل [[_]] وكل فاصلة وكل مسافة في النص كله (الـ [[g]] معناها «كلهم مش أول واحد بس»). ده بالظبط اللي [[Number]] مبيعملوش لوحده: [[Number("1_000")]] بـ [[NaN]].
- [[t === "" ? NaN : ...]]: من غير السطر ده [[cleanNumber("")]] هترجّع [[0]]، لأن [[Number("")]] بـ 0. ده فخ درس «number و NaN».
- [[Number(t)]] مش [[parseInt]]: عشان [["12abc"]] تبقى [[NaN]] مش 12.

**خلي بالك:** الفاصلة في [["12,500"]] فاصل آلاف في مصر وأمريكا، بس في ألمانيا هي العلامة العشرية. الحل ده مناسب لفورم إنجليزي أو مصري بس.` }
          ],
          check: { lang: "js", starter: R`function cleanNumber(text) {
  // شيل _ و , والمسافات، ورجّع رقم أو NaN
}`, tests: R`test("1_000", () => expect(cleanNumber("1_000")).toBe(1000));
test("12,500.75", () => expect(cleanNumber("12,500.75")).toBe(12500.75));
test("مسافات", () => expect(cleanNumber(" 1 250 000 ")).toBe(1250000));
test("فاضي", () => expect(Number.isNaN(cleanNumber(""))).toBe(true));
test("مسافات بس", () => expect(Number.isNaN(cleanNumber("   "))).toBe(true));
test("حروف", () => expect(Number.isNaN(cleanNumber("12abc"))).toBe(true));
test("أُس", () => expect(cleanNumber("1e3")).toBe(1000));`, solution: R`function cleanNumber(text) {
  const t = String(text).trim().replace(/[_,\s]/g, "");
  return t === "" ? NaN : Number(t);
}` } ,
          flag: "script",
          deep: {
            why: R`الكود بيتقري أكتر ما بيتكتب. [[86400000]] و [[16711680]] و [[493]] أرقام صح بس محدش يعرف هي إيه، و [[24 * 60 * 60 * 1_000]] و [[0xFF_00_00]] و [[0o755]] بيقولوا معناهم. وكل مجال ليه أساسه: الألوان والـ bytes بالـ hex، والـ flags بالـ binary، وصلاحيات لينكس بالـ octal. فلما تكتب الرقم بأساس مجاله بتقلل الغلط في التحويل بإيدك.`,
            how: R`الـ parser بيقرا الـ literal وهو بيقرا الكود (قبل التشغيل)، ويحوّله لنفس الـ [[number]] (٦٤ بت IEEE 754) أيًا كان شكله. عشان كده [[0xff === 255]] بـ [[true]]: مفيش حاجة اسمها «رقم hex» وقت التشغيل. والـ [[_]] بيتشال خالص وقت القراية، فمالوش أي أثر على القيمة ولا على السرعة.

الكتابة دي قواعد الـ grammar بتاعة اللغة (Lexical grammar)، مش قواعد تحويل النص. فـ [[Number()]] بتفهم [["0xff"]] و [["0b101"]] و [["0o17"]] و [["1e3"]] (اتجرّبوا كلهم)، بس مبتفهمش [["1_000"]]، و [[parseInt("1_000", 10)]] بتقف عند الـ [[_]] وترجّع 1.

ولما JavaScript بيطبع رقم بيختار أقصر شكل عشري: [[1e21]] وأكبر، و [[1e-7]] وأصغر، بيتطبعوا بالأُس. ده شكل الطباعة بس، الرقم واحد.`,
            when: R`hex للألوان والـ bytes والـ masks و Unicode. binary للـ flags الصغيرة لما عايز تشوف الخانات. octal لصلاحيات الملفات بس تقريبًا. الأُس للأرقام العلمية أو الكبيرة جدًا ([[6.02e23]]) والصغيرة جدًا. والـ [[_]] لأي رقم أكتر من ٤ خانات، والـ [[n]] لما الرقم أكبر من [[Number.MAX_SAFE_INTEGER]] (درس «BigInt بعمق»).`,
            mistakes: R`- [[010]] بصفر في الأول: في كود قديم من غير strict بتبقى ٨ مش ١٠، وفي module أو [["use strict"]] بتبقى SyntaxError. لو عايز ١٠ اكتب [[10]]، ولو octal اكتب [[0o10]].
- تفتكر [[Number("1_000")]] هتشتغل زي الكود: لأ، [[NaN]].
- [[1.toString()]]: الـ parser بيفتكر النقطة علامة عشرية، فبيطلع SyntaxError. اكتب [[(1).toString()]].
- [[_]] في أول الرقم: [[_1000]] مش رقم، ده اسم متغير ([[ReferenceError: _1000 is not defined]]).
- تكتب رقم كبير زي [[123456789012345678901]] وتفتكره اتخزن زي ما هو: اتطبع [[123456789012345680000]]، لأنه أكبر من الحد الآمن.`
          },
          teach: R`## الفكرة في سطرين

الـ **numeric literal** يعني رقم مكتوب بإيدك في الكود، زي [[42]] أو [[0xff]]. JavaScript بتقبل أكتر من شكل لنفس الرقم، وكلهم بيتحوّلوا لنفس القيمة قبل ما الكود يشتغل. كل الأمثلة هنا اتشغّلت بـ [[node]] على Node 24.22 على ويندوز 11، ونفس القواعد في أي متصفح حديث.

~~~js literals.js
// نفس الرقم 255 بأربع كتابات
console.log(255, 0xff, 0b1111_1111, 0o377);
// كسور وأُس
console.log(0.5, .5, 1e3, 2.5e-3);
// فواصل للقراية بس
const salary = 12_500;
const fileLimit = 5_000_000;
console.log(salary + fileLimit);
// صلاحيات ملف على لينكس بالـ octal
const mode = 0o755;
console.log(mode, mode.toString(8));
// النص مبيفهمش الـ _
console.log(Number("12_500"), Number("0xff"));
~~~

~~~text الناتج
255 255 255 255
0.5 0.5 1000 0.0025
5012500
493 755
NaN 255
~~~

أول سطر بيطبع [[255]] أربع مرات: أربع كتابات ونفس الرقم. هنفك كل شكل لوحده.

---

## ١. decimal numeric literals: [[42]] و [[3.14]] و [[1e3]]

ده الشكل العادي (decimal يعني عشري، أساس ١٠):

~~~js decimal.js
console.log(42, 3.14, .5, 5., -0.75);
console.log(1e3, 1E3, 2.5e-3, 1e+2);
console.log(1e21, 1e20, 0.000001, 0.0000001);
console.log(123456789012345678901);
~~~

~~~text الناتج
42 3.14 0.5 5 -0.75
1000 1000 0.0025 100
1e+21 100000000000000000000 0.000001 1e-7
123456789012345680000
~~~

| الكتابة | معناها |
|---|---|
| [[.5]] | نفس [[0.5]]، والصفر اللي قبل العلامة اختياري |
| [[5.]] | نفس [[5]]، والنقطة في الآخر مسموحة بس ملهاش لازمة |
| [[1e3]] | ١ × ١٠ أس ٣ = 1000. الـ [[e]] (أو [[E]]) اختصار exponent يعني أُس |
| [[2.5e-3]] | ٢٫٥ × ١٠ أس سالب ٣ = 0.0025. الأُس السالب بيحرّك العلامة شمال |
| [[1e+2]] | الـ [[+]] في الأُس اختيارية: 100 |

والسطر التالت بيوريك حاجة مهمة: لما الرقم يوصل [[1e21]] أو أكبر، أو يبقى أصغر من [[0.000001]]، JavaScript **بيطبعه** بالأُس. [[1e20]] اتطبع ٢١ رقم، و [[1e21]] اتطبع [[1e+21]]. ده شكل الطباعة بس، الرقم المتخزن واحد.

والسطر الرابع: كتبت ٢١ رقم، واتطبع رقم تاني آخره أصفار. أي عدد صحيح أكبر من [[Number.MAX_SAFE_INTEGER]] بيتخزن **أقرب** رقم ليه (درس «number و NaN»). الكتابة مش بتحميك من ده.

---

## ٢. hexadecimal: [[0xff]]

[[0x]] (أو [[0X]]) وبعدها أرقام من 0 لـ 9 وحروف من [[a]] لـ [[f]] (عادي أو كابيتال). أساس ١٦: [[a]] = 10 لحد [[f]] = 15.

~~~js hex.js
const brand = 0xff8800;
console.log(brand, 0xFF, 0x10, 0xA);
~~~

~~~text الناتج
16746496 255 16 10
~~~

[[0xff8800]] هو اللون البرتقاني [[#ff8800]] بتاع CSS كرقم واحد: [[ff]] أحمر و [[88]] أخضر و [[00]] أزرق. هتفك الحتت دي بالـ bitwise في درس «bitwise و shifts».

---

## ٣. binary numeric literals: [[0b1010]]

[[0b]] وبعدها [[0]] و [[1]] بس. أساس ٢، وكل خانة ضعف اللي على يمينها (١ و ٢ و ٤ و ٨...):

~~~js binary.js
const flags = 0b0101;
console.log(flags, 0b1010, 0B11, 0b1111_1111);
~~~

~~~text الناتج
5 10 3 255
~~~

[[0b0101]] = ٤ + ١ = 5. فايدته إنك **بتشوف** الخانات: لو كل خانة flag (قرا، كتب، مسح...)، [[0b0101]] بتقولك الأولى والتالتة شغالين. والصفر اللي في الشمال ملوش قيمة، بس بيخلّي العرض ٤ خانات ثابت.

---

## ٤. octal numeric literals: [[0o755]]

[[0o]] (حرف o صغير أو كبير) وبعدها أرقام من 0 لـ 7. أساس ٨. استخدامه الحقيقي تقريبًا واحد: صلاحيات الملفات في لينكس، اللي بتكتبها في [[chmod 755]].

~~~js octal.js
console.log(0o755, 0o644, 0o10, 0O17);
~~~

~~~text الناتج
493 420 8 15
~~~

[[0o755]] = ٧×٦٤ + ٥×٨ + ٥ = 493. وكل رقم من التلاتة صلاحيات حد: ٧ للمالك (قرا وكتب وتشغيل)، و ٥ للجروب، و ٥ للباقي.

### الشكل القديم: [[010]] من غير [[o]]

زمان الـ octal كان بيتكتب بصفر في الأول بس. لسه شغال في ملف عادي:

~~~js legacy-sloppy.js
console.log(010, 08, 0o10);
~~~

~~~text الناتج
8 8 8
~~~

[[010]] طلعت 8 مش 10! و [[08]] طلعت 8 لأن 8 مش رقم octal، فرجع يقراها عشري. ده بالظبط ليه الشكل ده خطر. في الـ strict mode بيبقى error:

~~~text الناتج من ملف أوله "use strict"
console.log(010);
            ^^^

SyntaxError: Octal literals are not allowed in strict mode.
~~~

وأي ملف [[.mjs]] أو [[type="module"]] بيبقى strict لوحده:

~~~text الناتج من legacy-module.mjs
console.log(08);
            ^^

SyntaxError: Decimals with leading zeros are not allowed in strict mode.
~~~

الخلاصة: اكتب [[0o10]] للـ octal دايمًا، ومتبدأش رقم عشري بصفر.

---

## ٥. numeric separators: [[1_000_000]]

الـ [[_]] جوه الرقم بيتشال وقت القراية. وجوده للعين بس:

~~~js sep.js
const visitors = 1_250_000;
const price = 1_499.99;
const tiny = 0.000_001;
const mask = 0b1111_0000;
const color = 0xFF_88_00;
console.log(visitors, price, tiny, mask, color, 1_000n);
console.log(Number("1_000"), parseInt("1_000", 10), parseFloat("1_000.5"));
~~~

~~~text الناتج
1250000 1499.99 0.000001 240 16746496 1000n
NaN 1 1
~~~

- أول سطر: الفاصل شغال في الصحيح والكسر وبعد العلامة والـ binary والـ hex والـ BigInt.
- تاني سطر هو الفخ: **النص** مبيتفهمش بقواعد الكود. [[Number("1_000")]] بـ [[NaN]]، و [[parseInt]] و [[parseFloat]] بيقفوا عند الـ [[_]] ويرجّعوا 1.

### قواعده (كل واحدة اتجرّبت)

الـ [[_]] لازم يبقى بين رقمين. أي مكان تاني SyntaxError:

| الكتابة | الـ error في Node 24.22 |
|---|---|
| [[1__000]] | شرطتين ورا بعض: [[Only one underscore is allowed as numeric separator]] |
| [[1000_]] | الشرطة في آخر الرقم: [[Numeric separators are not allowed at the end of numeric literals]] |
| [[1_.5]] | نفس الرسالة: الـ [[_]] جه في آخر الجزء الصحيح، قبل النقطة |
| [[0_1]] | بعد صفر في أول الرقم: [[Numeric separator can not be used after leading 0.]] |
| [[0x_ff]] | [[Invalid or unexpected token]]: جنب الـ prefix مش بين رقمين |

و [[_1000]] من غير رقم قبلها مش رقم أصلًا، ده اسم متغير.

---

## ٦. الـ BigInt literal: [[10n]]

حرف [[n]] في آخر عدد صحيح بيخلّيه [[bigint]] مش [[number]]، وبيقبل نفس الأشكال: [[0xffn]] و [[0b101n]] و [[1_000n]]. مينفعش مع كسر ([[1.5n]] SyntaxError) ولا مع أُس. ليه درس لوحده في آخر الوحدة: «BigInt بعمق».

---

## ٧. نقطة بعد رقم: [[1.toString()]]

~~~text الناتج من console.log(1.toString())
console.log(1.toString());
            ^^

SyntaxError: Invalid or unexpected token
~~~

الـ parser شاف [[1.]] فافتكر إنه رقم عشري، فـ [[toString]] جات بعده من غير نقطة. أربع حلول شغالة:

~~~js dot-ok.js
console.log(1..toString(), (1).toString(), 1 .toString(), 1.5.toFixed(0));
~~~

~~~text الناتج
1 1 1 2
~~~

[[1..toString()]]: النقطة الأولى عشرية والتانية للـ method. و [[(1)]] بالقوسين أوضح واحد فيهم. و [[1.5.toFixed(0)]] شغالة لأن الرقم فيه علامة عشرية خلاص، فالنقطة التانية مش ممكن تبقى جزء منه.

---

## الخلاصة

| الشكل | مثال | قيمته | بيتستخدم في |
|---|---|---|---|
| عشري | [[1_499.99]] | 1499.99 | أي رقم |
| أُس | [[2.5e-3]] | 0.0025 | العلمي والكبير جدًا والصغير جدًا |
| hex | [[0xff8800]] | 16746496 | الألوان والـ bytes |
| binary | [[0b0101]] | 5 | الـ flags |
| octal | [[0o755]] | 493 | صلاحيات الملفات |
| BigInt | [[1_000n]] | 1000n | أعداد صحيحة كبيرة |

- الشكل بيفرق في القراية بس، والقيمة واحدة.
- [[_]] بين رقمين وبس، وفي الكود بس (مش في [[Number("...")]]).
- متبدأش رقم بصفر، واكتب [[0o]] للـ octal.`,
          lines: [
            R`نفس الرقم ٢٥٥ مكتوب بأربع طرق: عشري، و hex بـ [[0x]] (ff = ١٥×١٦ + ١٥)، و binary بـ [[0b]] (تمن خانات كلهم ١، والـ [[_]] بيقسمهم نصين)، و octal بـ [[0o]] (٣×٦٤ + ٧×٨ + ٧). الأربعة بيطبعوا 255.`,
            R`كسور: [[.5]] من غير صفر قبل العلامة، و [[1e3]] يعني ١ × ١٠ أس ٣ = 1000، و [[2.5e-3]] الأُس سالب فالعلامة بتتحرك ٣ خانات شمال = 0.0025.`,
            R`[[12_500]] هو ١٢٥٠٠. الـ [[_]] بيتشال وقت ما الكود بيتقري، ووجوده عشان عينك تفصل الآلاف من غير ما تعدّ الأصفار.`,
            R`خمسة مليون بفواصل كل ٣ خانات. من غيرها [[5000000]] سهل تكتب صفر زيادة أو ناقص ومتاخدش بالك.`,
            R`الجمع عادي خالص لأن الاتنين [[number]] عاديين: 5012500. الفواصل مبتظهرش في الناتج، لأنها مكانتش جزء من القيمة أصلًا.`,
            R`[[0o755]] صلاحيات فولدر في لينكس بنفس الشكل اللي بتكتبه في [[chmod 755]]. قيمتها بالعشري 493.`,
            R`[[mode]] لوحده بيطبع 493 (العرض الافتراضي عشري)، و [[mode.toString(8)]] بيرجّعه نص بالـ octal [["755"]] عشان تقارنه بالصلاحيات اللي تعرفها.`,
            R`الفخ: نص جاي من يوزر مبيتقريش بقواعد الكود. [[Number("12_500")]] بـ [[NaN]] لأن الـ [[_]] مش مفهوم في التحويل، بس [[Number("0xff")]] بـ 255 لأن التحويل بيفهم الـ prefixes.`
          ],
          ref: [
            { t: "MDN: Lexical grammar، numeric literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_literals" },
            { t: "MDN: decimal", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#decimal" },
            { t: "MDN: binary", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#binary" },
            { t: "MDN: octal", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#octal" },
            { t: "MDN: numeric separators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators" },
            { t: "ECMAScript: NumericLiteral", url: "https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-literals-numeric-literals" }
          ],
          pre: ["js/المتغيرات والأنواع والعمليات", { to: "js/number و NaN", why: R`ليه الرقم الكبير بيتخزن قريب منه مش هو بالظبط، و [[Number.MAX_SAFE_INTEGER]]` }]
        },
        {
          cmd: "++ و -- و += وأخواتها",
          title: "إيه الفرق بين x++ و ++x، وإزاي تختصر x = x + 5 وكل أخواتها؟",
          desc: R`[[++]] بتزوّد واحد و [[--]] بتنقّص واحد. ولو جت **قبل** المتغير ([[++x]]) بترجّع القيمة الجديدة، ولو جت **بعده** ([[x++]]) بترجّع القديمة. الفرق بيبان بس لما تستخدم الناتج في نفس السطر.

وعمليات الإسناد المختصرة: [[x += 5]] يعني [[x = x + 5]]، وزيها [[-=]] و [[*=]] و [[/=]] و [[%=]] و [[**=]]. والتلاتة المنطقيين بيسندوا بشرط: [[x ||= v]] لو [[x]] falsy، و [[x &&= v]] لو truthy، و [[x ??= v]] لو [[null]] أو [[undefined]] بس.

الإسناد بتاع الـ bitwise ([[&=]] و [[|=]] و [[<<=]]...) ليه درس «bitwise و shifts».`,
          example: R`// المخزن فيه 5 قطع
let stock = 5;
const before = stock++;
console.log(before, stock);
const after = ++stock;
console.log(after, stock);
// المحفظة
let wallet = 1000;
wallet += 250;
wallet -= 100;
wallet *= 2;
console.log(wallet);
// إعدادات ناقصة
const prefs = { theme: "", fontSize: 0 };
prefs.theme ||= "light";
prefs.fontSize ??= 16;
console.log(prefs);`,
          try: R`في الـ Console اكتب [[let n = 10]] وبعدين [[n++]] (هتشوف 10)، وبعدين [[n]] لوحدها (11)، وبعدين [[++n]] (12). بعدها [[let s = "5"; s += 1; s]] و [[let t = "5"; t -= 1; t]]: ليه واحدة نص والتانية رقم؟ وآخر حاجة: [[const c = 0; c ||= 1]] واقرا الـ error، وبعدين [[const d = 1; d ||= 2]]: ليه دي معدّتش error؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[let a = 3; const b = a++; const c = ++a; const d = a--; console.log(a, b, c, d);]] هيطبع إيه؟ اكتب الأربعة قبل ما تشغّل، وتابع قيمة [[a]] بعد كل سطر.`, done: R`كتبت [[4 3 5 5]] قبل التشغيل، وعندك جدول بقيمة [[a]] بعد كل سطر.`, sol: R`~~~js order.js
let a = 3;
const b = a++;
const c = ++a;
const d = a--;
console.log(a, b, c, d);
~~~

~~~text الناتج
4 3 5 5
~~~

| السطر | اللي اترجّع | [[a]] بعده |
|---|---|---|
| [[let a = 3]] | | 3 |
| [[const b = a++]] | القديمة: 3 | 4 |
| [[const c = ++a]] | الجديدة: 5 | 5 |
| [[const d = a--]] | القديمة: 5 | 4 |

**ليه:** العلامة **بعد** المتغير يعني «هات قيمته الأول وبعدين غيّره»، و**قبله** يعني «غيّره الأول وهات الجديدة». فـ [[d]] أخدت 5 و [[a]] نزلت 4 بعدها. الغلطة الشائعة: تفتكر [[b]] بـ 4.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده المفروض يجمع أسعار السلة [[[120, 75, 30]]] بس بيطبع 30. لاقي الحرف الغلط من غير ما تعيد كتابة الـ loop:
~~~js
const prices = [120, 75, 30];
let total = 0;
for (const price of prices) {
  total =+ price;
}
console.log(total);
~~~`, done: R`الكود بيطبع 225، وتقدر تقول [[=+]] كانت بتتقري إزاي.`, sol: R`الغلطة في [[=+]]: الترتيب مقلوب. JavaScript قراها [[total = +price]]، يعني «حط في total السعر نفسه بعد [[+]] الأحادية» (اللي بتحوّل لرقم بس). فكل لفة بتمسح اللي قبلها، وآخر سعر (30) هو اللي فضل.

~~~js cart.js
const prices = [120, 75, 30];
let total = 0;
for (const price of prices) {
  total += price;
}
console.log(total);
~~~

~~~text الناتج
225
~~~

**ليه مفيش error:** [[total =+ price]] كود سليم تمامًا في عين اللغة، بس معناه غير اللي عايزه. عشان كده أدوات زي ESLint وPrettier بتنبّهك: Prettier بيكتبها [[total = +price]] فالغلطة تبان. العلامة اللي بتعمل حاجة (الـ [[+]]) بتيجي **قبل** الـ [[=]] دايمًا: [[+=]] و [[-=]] و [[*=]].` },
            { lvl: 'تطبيق', t: R`**محاكاة:** حصّالة لمدة سنة: كل شهر بتحط 500 جنيه، وكل ٣ شهور بتطلع 200 مصاريف. في الآخر احسب: معامل النمو لو الفلوس عليها فايدة ١٪ في الشهر لمدة ١٢ شهر، ونصيب كل واحد لو اتقسمت على ٣ إخوات، والباقي اللي مبيتقسمش. استخدم [[+=]] و [[-=]] و [[**=]] و [[/=]] و [[%=]] كلهم.`, done: R`بيطبع 5200، و [[1.1268]]، و 1733 والباقي 1، و ١٧٣٣ × ٣ + ١ = ٥٢٠٠.`, sol: R`~~~js piggy.js
let savings = 0;
for (let month = 1; month <= 12; month++) {
  savings += 500;
  if (month % 3 === 0) savings -= 200;
}
console.log("آخر السنة:", savings);
let growth = 1.01;
growth **= 12;
console.log("فايدة ١٪ في الشهر لمدة سنة:", growth.toFixed(4));
let share = savings;
share /= 3;
let rest = savings;
rest %= 3;
console.log("نصيب كل أخ:", Math.floor(share), "والباقي:", rest);
~~~

~~~text الناتج
آخر السنة: 5200
فايدة ١٪ في الشهر لمدة سنة: 1.1268
نصيب كل أخ: 1733 والباقي: 1
~~~

**كل سطر بيعمل إيه:**

- [[savings += 500]] كل شهر: ١٢ × ٥٠٠ = ٦٠٠٠.
- [[if (month % 3 === 0) savings -= 200]]: الشهور ٣ و ٦ و ٩ و ١٢، يعني ٤ مرات × ٢٠٠ = ٨٠٠. فالباقي ٥٢٠٠.
- [[growth **= 12]]: يعني [[growth = growth ** 12]]، و [[1.01 ** 12]] = ١٫١٢٦٨، يعني الفلوس بتزيد حوالي ١٢٫٧٪ في السنة مش ١٢٪ بالظبط، لأن كل شهر الفايدة بتتحسب على الفايدة اللي قبلها.
- [[share /= 3]] بتطلع 1733.33... و [[Math.floor]] بتشيل الكسر لأن الفلوس الحقيقية قروش صحيحة.
- [[rest %= 3]]: باقي قسمة ٥٢٠٠ على ٣ = ١. ده الجنيه اللي مبيتقسمش، ولازم حد ياخده (هتشوف المشكلة دي بالقروش في مشروع الفاتورة).

**الغلطة الشائعة:** تعمل [[share /= 3]] و [[rest %= 3]] على **نفس** المتغير ورا بعض، فالـ [[%=]] تشتغل على 1733.33 مش 5200. عشان كده كل واحدة على نسخة من [[savings]].` },
            { lvl: 'تطبيق', t: R`**refactor:** الدالة دي شغالة بس طويلة. اكتبها بـ [[??=]] و [[||=]] من غير ما ناتج أي واحدة من التلات نداءات يتغيّر:
~~~js
function withDefaults(o) {
  if (o.page === undefined || o.page === null) o.page = 1;
  if (o.perPage === undefined || o.perPage === null) o.perPage = 20;
  if (!o.sort) o.sort = "newest";
  return o;
}
console.log(withDefaults({}));
console.log(withDefaults({ page: 0, perPage: null, sort: "" }));
console.log(withDefaults({ page: 3, perPage: 50, sort: "price" }));
~~~`, done: R`الدالة بقت ٣ سطور إسناد، والتلات سطور ناتج زي قبل التعديل بالحرف، و [[page: 0]] لسه 0.`, sol: R`~~~js defaults.js
function withDefaults(o) {
  o.page ??= 1;
  o.perPage ??= 20;
  o.sort ||= "newest";
  return o;
}
console.log(withDefaults({}));
console.log(withDefaults({ page: 0, perPage: null, sort: "" }));
console.log(withDefaults({ page: 3, perPage: 50, sort: "price" }));
~~~

~~~text الناتج (نفس ناتج النسخة القديمة بالحرف)
{ page: 1, perPage: 20, sort: 'newest' }
{ page: 0, perPage: 20, sort: 'newest' }
{ page: 3, perPage: 50, sort: 'price' }
~~~

**ليه [[??=]] لـ page و [[||=]] لـ sort:**

- الشرط القديم لـ [[page]] كان «[[undefined]] أو [[null]]» بالظبط، وده تعريف [[??=]]. فـ [[page: 0]] (صفحة صفر، قيمة حقيقية) فضلت 0.
- الشرط القديم لـ [[sort]] كان [[!o.sort]]، يعني أي falsy (ومنها النص الفاضي)، وده تعريف [[||=]].
- لو كنت كتبت [[o.page ||= 1]] كان الناتج التاني هيبقى [[page: 1]]: refactor غيّر السلوك من غير ما تاخد بالك. عشان كده شغّلنا التلات نداءات قبل وبعد وقارنّا.` },
            { lvl: 'تحدي', t: R`**اشرحها بجدول:** لكل قيمة من دول: [[0]] و [[""]] و [[null]] و [[undefined]] و [[false]] و [[NaN]] و [["x"]] و [[7]]، اكتب المتغير بيبقى إيه بعد [[v ||= "D"]] وبعد [[v ??= "D"]] وبعد [[v &&= "D"]]. خمّن الأول، وبعدين اكتب سكربت يطبع الجدول.`, done: R`الجدول بتاعك فيه ٨ صفوف × ٣ عمليات، ومطابق لناتج السكربت، وتقدر تقول القاعدة في جملة لكل عملية.`, sol: R`~~~js assign-table.js
const show = v => (typeof v === "string" ? JSON.stringify(v) : String(v)).padEnd(10);
const values = [0, "", null, undefined, false, NaN, "x", 7];
for (const v of values) {
  let a = v; a ||= "D";
  let b = v; b ??= "D";
  let c = v; c &&= "D";
  console.log(show(v), "||=", show(a), "??=", show(b), "&&=", show(c));
}
~~~

~~~text الناتج
0          ||= "D"        ??= 0          &&= 0         
""         ||= "D"        ??= ""         &&= ""        
null       ||= "D"        ??= "D"        &&= null      
undefined  ||= "D"        ??= "D"        &&= undefined 
false      ||= "D"        ??= false      &&= false     
NaN        ||= "D"        ??= NaN        &&= NaN       
"x"        ||= "x"        ??= "x"        &&= "D"       
7          ||= 7          ??= 7          &&= "D"
~~~

**القاعدة في جملة لكل واحدة:**

- [[||=]]: بتسند لو القيمة falsy (الستة الأوائل: 0 و "" و null و undefined و false و NaN).
- [[??=]]: بتسند لو [[null]] أو [[undefined]] بس. فالـ 0 والنص الفاضي والـ false والـ NaN فضلوا زي ما هم.
- [[&&=]]: العكس، بتسند لو القيمة truthy بس ([["x"]] و [[7]]).

و [[show]] في السكربت بتكتب النص بين علامات تنصيص بـ [[JSON.stringify]] عشان تفرّق بين [[""]] و [[undefined]]، والباقي بـ [[String]]. لو استخدمت [[JSON.stringify]] على كله كانت [[NaN]] هتتطبع [[null]] وتضلّلك (حصلت فعلًا في أول نسخة من السكربت).` }
          ],
          flag: "script",
          deep: {
            why: R`العدّادات والمجاميع والأرصدة في كل برنامج: [[count++]] في loop، و [[total += price]] في سلة، و [[stock -= qty]] في طلب. والـ [[??=]] بتختصر أشهر ٣ سطور في أي كود: «لو القيمة مش موجودة حط default». ولو فهمت الفرق بين [[x++]] و [[++x]] غلط، هتلاقي index ماشي بواحد زيادة أو ناقص، والـ bug ده من أصعب الحاجات في التتبّع.`,
            how: R`[[x += 5]] بتتحسب [[x = x + 5]] بالظبط، بس [[x]] بيتقري **مرة واحدة**. ده بيفرق لما الشمال فيه حساب: [[arr[i++] += 1]] بتزوّد [[i]] مرة واحدة، أما [[arr[i++] = arr[i++] + 1]] بتزوّده مرتين.

[[x++]] بتعمل ٣ خطوات: تقرا [[x]] وتحوّله لرقم (فـ [["5"]] بتبقى 5)، وتحفظ القيمة دي، وتكتب القيمة + 1 في [[x]]، وترجّع المحفوظة. و [[++x]] نفس الخطوات بس بترجّع الجديدة. عشان كده [[++]] على نص بيحوّله رقم، أما [[+=]] على نص بتلزق (لأن [[+]] مع نص بتلزق).

والتلاتة المنطقيين short-circuit: لو الشرط مش متحقق، **مفيش إسناد خالص**. ده معناه إن [[const z = 1; z ||= 2]] مبيطلعش error (مفيش كتابة اتعملت)، وإن الـ setter مبيتندهش (اتجرّب في الشرح).`,
            when: R`[[++]] و [[--]] لوحدهم في سطر أو في الـ for. [[+=]] للمجاميع والنصوص، و [[-=]] للخصم والرصيد، و [[*=]] و [[/=]] للنسب والتحويل، و [[%=]] لما تلف في دايرة ([[index %= length]])، و [[**=]] للنمو المركّب. [[??=]] للقيم الافتراضية والـ cache ([[cache[key] ??= compute()]])، و [[||=]] لما النص الفاضي والصفر كمان معناهم «مفيش»، و [[&&=]] لما عايز تحوّل قيمة موجودة بس ([[user &&= user.name]]).`,
            mistakes: R`- [[=+]] بدل [[+=]]: كود سليم ومعناه [[x = +y]]. أشهر typo في الباب ده.
- [[x++]] جوه expression أكبر ([[a[i++] + a[i++] ]]): بيشتغل، بس محدش هيعرف يقراه. خلي [[++]] في سطر لوحده.
- [[x = x++]]: [[x]] مبيتغيّرش خالص (بتسند القيمة القديمة تاني).
- [[||=]] على قيمة ممكن تبقى 0 أو "": [[qty ||= 1]] بتمسح الكمية صفر. استخدم [[??=]].
- [[5++]] أو [[(a + b)++]]: [[SyntaxError: Invalid left-hand side expression in postfix operation]]. الـ [[++]] محتاج متغير أو property يتكتب فيه.
- [[++]] على [[const]]: [[TypeError: Assignment to constant variable.]] وقت التشغيل مش قبله.`
          },
          teach: R`## الفكرة في سطرين

كل العمليات في الدرس ده بتعمل حاجتين مع بعض: **بتحسب** قيمة جديدة و**بتكتبها** في نفس المتغير. الاختلاف في إيه اللي بيترجّع، وإمتى الكتابة بتحصل. كل الأمثلة اتشغّلت بـ [[node]] على Node 24.22.

~~~js ops.js
// المخزن فيه 5 قطع
let stock = 5;
const before = stock++;
console.log(before, stock);
const after = ++stock;
console.log(after, stock);
// المحفظة
let wallet = 1000;
wallet += 250;
wallet -= 100;
wallet *= 2;
console.log(wallet);
// إعدادات ناقصة
const prefs = { theme: "", fontSize: 0 };
prefs.theme ||= "light";
prefs.fontSize ??= 16;
console.log(prefs);
~~~

~~~text الناتج
5 6
7 7
2300
{ theme: 'light', fontSize: 0 }
~~~

---

## ١. الزيادة والنقص بواحد (incrementing and decrementing): [[x++]] و [[++x]]

[[++]] معناها «زوّد واحد واكتبه في المتغير». بس كمان **بترجّع** قيمة، وده اللي بيفرّق مكانها:

~~~js inc.js
let stock = 5;
const a = stock++;
console.log("a =", a, " stock =", stock);
const b = ++stock;
console.log("b =", b, " stock =", stock);
~~~

~~~text الناتج
a = 5  stock = 6
b = 7  stock = 7
~~~

| الكتابة | اسمها | بترجّع إيه | [[stock]] بعدها |
|---|---|---|---|
| [[stock++]] | postfix (العلامة بعد) | القيمة **قبل** الزيادة: 5 | 6 |
| [[++stock]] | prefix (العلامة قبل) | القيمة **بعد** الزيادة: 7 | 7 |

افتكرها بالترتيب اللي بتقراه: [[stock++]] اسم المتغير الأول، فبتاخد قيمته الأول. [[++stock]] الزيادة الأول، فبتاخد الجديدة.

### [[x--]] و [[--x]]: نفس الكلام بالنقص

~~~js dec.js
let stock = 7;
const c = stock--;
console.log("c =", c, " stock =", stock);
const d = --stock;
console.log("d =", d, " stock =", stock);
~~~

~~~text الناتج
c = 7  stock = 6
d = 5  stock = 5
~~~

[[stock--]] رجّعت 7 (القديمة) والمخزن بقى 6، و [[--stock]] نقّصت الأول فرجّعت 5.

### لوحدها في سطر: مفيش فرق

~~~js alone.js
let i = 0;
i++;
++i;
console.log(i);
const cart = [10, 20, 30];
let k = 0;
console.log(cart[k++], cart[k++], k);
~~~

~~~text الناتج
2
10 20 2
~~~

- [[i++]] و [[++i]] لوحدهم: محدش بيستخدم القيمة اللي اترجّعت، فالاتنين زوّدوا واحد وخلاص. عشان كده [[for (let i = 0; i < n; i++)]] و [[++i]] واحد.
- [[cart[k++] ]]: هات العنصر رقم [[k]] (القديم) وبعدين زوّد [[k]]. فأول مرة جاب [[cart[0] ]] = 10 وتاني مرة [[cart[1] ]] = 20، و [[k]] بقى 2. شكل مشهور في الـ parsers، بس سهل تغلط فيه.

### على حاجة مش رقم

~~~js types.js
let s = "5"; s++;
let t = "5"; t += 1;
let u = "abc"; u++;
let n = null; n++;
let x; x++;
let big = 10n; big++;
console.log(s, typeof s, "|", t, typeof t, "|", u, n, x, big);
~~~

~~~text الناتج
6 number | 51 string | NaN 1 NaN 11n
~~~

- [["5"]] مع [[++]] بقى **رقم** 6: الـ [[++]] بتحوّل لرقم الأول.
- [["5"]] مع [[+= 1]] بقى **نص** [["51"]]: [[+=]] هي [[+]]، والـ [[+]] مع نص بتلزق.
- [["abc"]] بقت [[NaN]]، و [[null]] بقت 1 (لأن [[Number(null)]] بـ 0)، و [[undefined]] بقت [[NaN]] (متغير نسيت تديله قيمة أول).
- [[10n]] بقت [[11n]]: الـ [[++]] بتشتغل على الـ BigInt وبتزوّد [[1n]].

### الأخطاء

| الكود | الـ error بنصه (Node 24.22) |
|---|---|
| [[5++]] | [[SyntaxError: Invalid left-hand side expression in postfix operation]]: الـ 5 مش مكان ينفع يتكتب فيه |
| [[++q++]] | [[SyntaxError: Invalid left-hand side expression in prefix operation]]: [[q++]] قيمة مش متغير |
| [[const total = 1; total++]] | [[TypeError: Assignment to constant variable.]] وقت التشغيل |

---

## ٢. ليه [[x++]] جوه حساب أكبر فكرة وحشة

~~~text Node REPL
> let x = 1; x = x++ + ++x; x
4
~~~

بالترتيب: [[x++]] رجّعت 1 و [[x]] بقى 2، بعدين [[++x]] خلّت [[x]] = 3 ورجّعت 3، فالمجموع 4. صح؟ أيوه. حد هيعرف يقراه بعد شهر؟ لأ. القاعدة: [[++]] و [[--]] في سطر لوحدهم، أو في الجزء التالت من الـ [[for]].

---

## ٣. Assignment operators: [[+=]] و [[-=]] و [[*=]] و [[/=]] و [[%=]] و [[**=]]

كل واحدة اختصار لـ «احسب بالمتغير نفسه واكتب الناتج فيه»:

~~~js assign.js
let bal = 1000;
bal += 250;  console.log("+=", bal);
bal -= 100;  console.log("-=", bal);
bal *= 2;    console.log("*=", bal);
bal /= 4;    console.log("/=", bal);
bal %= 100;  console.log("%=", bal);
bal **= 2;   console.log("**=", bal);
~~~

~~~text الناتج
+= 1250
-= 1150
*= 2300
/= 575
%= 75
**= 5625
~~~

| الكتابة | نفس | [[bal]] بعدها |
|---|---|---|
| [[bal += 250]] | [[bal = bal + 250]]: إيداع | 1250 |
| [[bal -= 100]] | [[bal = bal - 100]]: سحب | 1150 |
| [[bal *= 2]] | [[bal = bal * 2]]: ضعف | 2300 |
| [[bal /= 4]] | [[bal = bal / 4]]: ربع | 575 |
| [[bal %= 100]] | [[bal = bal % 100]]: باقي القسمة على ١٠٠ | 75 |
| [[bal **= 2]] | [[bal = bal ** 2]]: تربيع | 5625 |

### حالات طرفية

~~~js assign-edge.js
let p = 10; p /= 0;
let r = 10; r %= 0;
let m = -7; m %= 3;
let name = "Mona"; name += " Adel";
let price = "100"; price -= 20;
console.log(p, r, m, name, price, typeof price);
~~~

~~~text الناتج
Infinity NaN -1 Mona Adel 80 number
~~~

- [[p /= 0]] بقت [[Infinity]] مش error. و [[r %= 0]] بقت [[NaN]]. افحص المقسوم عليه قبل ما تقسم.
- [[m %= 3]] من [[-7]] طلعت [[-1]] مش 2: الـ [[%]] في JavaScript بتاخد إشارة الشمال (باقي مش modulo رياضي).
- [[+=]] مع النصوص بتلزق ([["Mona Adel"]])، بس [[-=]] على النص [["100"]] حوّلته رقم 80. الطرح مالوش معنى مع النصوص، فبيحوّل.

---

## ٤. الإسناد المنطقي: بيكتب بشرط

### [[a ||= b]]: لو [[a]] falsy

~~~js logical.js
const prefs = { theme: "", fontSize: 0, lang: null };
prefs.theme ||= "light";
prefs.fontSize ||= 16;
prefs.lang ??= "ar";
console.log(prefs);
const prefs2 = { theme: "", fontSize: 0, lang: null };
prefs2.theme ??= "light";
prefs2.fontSize ??= 16;
prefs2.lang ??= "ar";
console.log(prefs2);
~~~

~~~text الناتج
{ theme: 'light', fontSize: 16, lang: 'ar' }
{ theme: '', fontSize: 0, lang: 'ar' }
~~~

في أول object: [[theme]] كانت [[""]] (falsy) فبقت [["light"]]، و [[fontSize]] كانت 0 (falsy) فبقت 16. يعني [[||=]] مسحت صفر حقيقي! وفي التاني بـ [[??=]]: النص الفاضي والـ 0 فضلوا، و [[lang]] بس اتغيّرت لأنها كانت [[null]].

### [[a ??= b]]: لو [[a]] بـ [[null]] أو [[undefined]] بس

ده اللي عايزه في ٩٠٪ من الحالات: «لو مفيش قيمة خالص». الصفر والنص الفاضي و [[false]] قيم حقيقية، و [[??=]] بتسيبها.

### [[a &&= b]]: لو [[a]] truthy

~~~js and-assign.js
let user = { name: "Mona" };
user &&= user.name;
console.log(user);
let guest = null;
guest &&= guest.name;
console.log(guest);
~~~

~~~text الناتج
Mona
null
~~~

[[user]] كان object (truthy)، فاتكتب فيه اسمه. و [[guest]] كان [[null]] فمفيش حاجة حصلت، ومفيش [[TypeError: Cannot read properties of null]] لأن [[guest.name]] متحسبتش أصلًا.

### ليه مش زي [[a = a || b]] بالظبط

الفرق إن [[a ||= b]] **مبتكتبش** خالص لو [[a]] truthy. و [[a = a || b]] بتكتب دايمًا (حتى لو نفس القيمة):

~~~js short.js
const box = {
  _v: 1,
  get v() { return this._v; },
  set v(x) { console.log("setter اتنده بـ", x); this._v = x; }
};
box.v ||= 5;
console.log("بعد ||=");
box.v = box.v || 5;
console.log("بعد = و ||");
~~~

~~~text الناتج
بعد ||=
setter اتنده بـ 1
بعد = و ||
~~~

مع [[||=]] الـ setter متندهش، ومع [[=]] و [[||]] اتندهت وكتبت نفس القيمة 1. ده بيفرق مع setter بيحفظ في قاعدة بيانات أو بيعمل render. ونتيجة غريبة لنفس السبب:

~~~js const-ok.js
const limit = 1;
let r = 0;
const z = limit ||= 99;
console.log(limit, z);
~~~

~~~text الناتج
1 1
~~~

[[limit ||= 99]] على [[const]] معدّتش error لأن [[limit]] = 1 (truthy) فمفيش كتابة حصلت. بس لو [[const limit = 0]]:

~~~text الناتج
TypeError: Assignment to constant variable.
~~~

---

## ٥. الشكل اللي هتكتبه كل يوم: عدّاد بـ [[??=]] و [[++]]

~~~js count.js
const orders = ["شاي", "قهوة", "شاي", "عصير", "شاي"];
const counts = {};
for (const item of orders) {
  counts[item] ??= 0;
  counts[item]++;
}
console.log(counts);
~~~

~~~text الناتج
{ 'شاي': 3, 'قهوة': 1, 'عصير': 1 }
~~~

[[counts[item] ??= 0]]: أول مرة الصنف يظهر ملوش مفتاح ([[undefined]])، فبيبقى 0. بعدها [[counts[item]++]] يزوّده. من غير السطر الأول، [[undefined++]] كانت هتطلع [[NaN]] (شفناها فوق).

---

## الخلاصة

| العملية | بتكتب إمتى | بترجّع |
|---|---|---|
| [[x++]] و [[x--]] | دايمًا | القيمة القديمة |
| [[++x]] و [[--x]] | دايمًا | القيمة الجديدة |
| [[x op= y]] (الحسابية الست) | دايمًا | الجديدة |
| [[x ??= y]] | لو null أو undefined | قيمة [[x]] بعدها |
| [[x ||= y]] | لو falsy | قيمة [[x]] بعدها |
| [[x &&= y]] | لو truthy | قيمة [[x]] بعدها |

- العلامة **قبل** الـ [[=]] دايمًا: [[+=]] مش [[=+]].
- [[++]] لوحدها في سطر، و [[??=]] للـ default إلا لو 0 و "" معناهم «مفيش» فعلًا.`,
          lines: [
            R`[[let]] مش [[const]] لأن المخزن هيتغيّر. المتغير ده هو اللي هنزوّده وننقّصه.`,
            R`[[stock++]] بتزوّد المخزن واحد، بس بترجّع القيمة **قبل** الزيادة. فـ [[before]] أخدت 5 والمخزن بقى 6.`,
            R`بيطبع [[5 6]]: الدليل إن اللي اترجّع غير اللي اتكتب في المتغير.`,
            R`[[++stock]] العلامة قبل الاسم: زوّد الأول وهات الجديدة. المخزن كان 6 بقى 7، و [[after]] أخدت 7.`,
            R`بيطبع [[7 7]]: هنا اللي اترجّع واللي اتكتب واحد.`,
            R`رصيد بداية. [[let]] عشان العمليات اللي جاية كلها بتكتب فيه.`,
            R`[[wallet += 250]] نفس [[wallet = wallet + 250]]: إيداع، والرصيد بقى 1250.`,
            R`[[wallet -= 100]]: سحب ١٠٠، فبقى 1150.`,
            R`[[wallet *= 2]]: الرصيد اتضاعف لـ 2300. وزيها [[/=]] و [[%=]] و [[**=]] في الجدول.`,
            R`بيطبع 2300: الأربع سطور اتنفّذوا بالترتيب، وكل واحد بدأ من نتيجة اللي قبله.`,
            R`إعدادات جاية من يوزر: الـ theme نص فاضي (معناه «مختارش»)، والـ fontSize صفر (معناه غلط، مفيش خط حجمه صفر).`,
            R`[[||=]] بتكتب لو القيمة falsy، والنص الفاضي falsy، فالـ theme بقت [["light"]].`,
            R`[[??=]] بتكتب لو [[null]] أو [[undefined]] بس، والصفر مش منهم، فالـ fontSize فضلت 0. هنا كان المفروض [[||=]] لأن الصفر غلط. اختار العملية حسب معنى القيمة.`,
            R`بيطبع [[{ theme: 'light', fontSize: 0 }]]: واحدة اتكتبت وواحدة لأ، وده الفرق بين العمليتين في سطر.`
          ],
          ref: [
            { t: "MDN: Increment (++)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment" },
            { t: "MDN: Decrement (--)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement" },
            { t: "MDN: Subtraction assignment (-=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction_assignment" },
            { t: "MDN: Division assignment (/=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division_assignment" },
            { t: "MDN: Remainder assignment (%=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder_assignment" },
            { t: "MDN: Exponentiation assignment (**=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation_assignment" },
            { t: "MDN: Logical OR assignment (||=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment" },
            { t: "MDN: Logical AND assignment (&&=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment" },
            { t: "MDN: Nullish coalescing assignment (??=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment" },
            { t: "MDN Curriculum: JavaScript fundamentals، Math", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" }
          ],
          pre: ["js/المتغيرات والأنواع والعمليات", { to: "js/&& و || و !", why: R`[[||=]] و [[&&=]] و [[??=]] هما [[||]] و [[&&]] و [[??]] بالظبط، والـ short-circuit مشروح هناك` }, "js/truthy و falsy"]
        },
        {
          cmd: "operator precedence و grouping و comma",
          title: "JavaScript بيحسب 2 + 3 * 4 بأنهي ترتيب، وإمتى تحط أقواس؟",
          desc: R`لما يبقى في expression أكتر من operator، JavaScript بيحسب الأقوى الأول (ده الـ **precedence**)، ولو اتنين بنفس القوة بيمشي من الشمال لليمين، ماعدا [[**]] والإسناد [[=]] بيمشوا من اليمين (ده الـ **associativity**). فـ [[2 + 3 * 4]] = 14 و [[2 ** 3 ** 2]] = 512.

الأقواس [[( )]] (اسمها grouping operator) أقوى حاجة: بتجبر ترتيب الحساب وبتوضّحه للي بيقرا. و الـ comma operator [[(a, b)]] بيحسب الاتنين ويرجّع آخر واحد.

الترتيب ده بيحدد **مين بيتجمّع مع مين**، مش مين بيتحسب الأول: الـ operands نفسهم بيتحسبوا دايمًا من الشمال لليمين.`,
          example: R`// الضرب قبل الجمع
console.log(2 + 3 * 4, (2 + 3) * 4);
// الطرح من الشمال، والأس من اليمين
console.log(100 - 20 - 5, 2 ** 3 ** 2);
// typeof قبل الجمع
console.log(typeof 1 + 2, typeof (1 + 2));
// فاتورة: سعر × كمية، ناقص خصم، زائد شحن
const price = 200, qty = 3, discount = 50, shipping = 30;
console.log(price * qty - discount + shipping);
console.log(price * (qty - 1) + shipping);
// الـ comma operator بيرجّع آخر واحد
const last = (1, 2, 3);
console.log(last);`,
          try: R`في الـ Console جرّب [[2 + 3 * 4]] و [[(2 + 3) * 4]]، وبعدين [[2 ** 3 ** 2]] و [[(2 ** 3) ** 2]]. بعدها [[-2 ** 2]] واقرا الـ error بنصه، وصلّحه بقوسين بطريقتين مختلفتين: كل واحدة بتطلّع إيه؟ وآخر حاجة [[3 > 2 > 1]]: ليه [[false]]؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log(10 - 4 - 3, 2 * 3 ** 2, 20 / 4 * 5, 10 % 4 * 2, "2" * "3" + 1)]]. اكتب الخمسة، وجنب كل واحد الأقواس اللي JavaScript حطها في دماغه.`, done: R`كتبت [[3 18 25 4 7]] قبل التشغيل، ومعاهم الأقواس الصح لكل واحد.`, sol: R`~~~js d1.js
console.log(10 - 4 - 3, 2 * 3 ** 2, 20 / 4 * 5, 10 % 4 * 2, "2" * "3" + 1);
~~~

~~~text الناتج
3 18 25 4 7
~~~

| الـ expression | بيتقري كده | الناتج |
|---|---|---|
| [[10 - 4 - 3]] | [[(10 - 4) - 3]]: نفس القوة، من الشمال | 3 |
| [[2 * 3 ** 2]] | [[2 * (3 ** 2)]]: الأُس أقوى من الضرب | 18 |
| [[20 / 4 * 5]] | [[(20 / 4) * 5]]: القسمة والضرب نفس القوة، من الشمال | 25 |
| [[10 % 4 * 2]] | [[(10 % 4) * 2]]: الباقي زي الضرب بالظبط | 4 |
| [["2" * "3" + 1]] | [[("2" * "3") + 1]]: الضرب حوّل النصين أرقام، فالجمع جمع مش لزق | 7 |

الغلطة الشائعة في التالت: تفتكر [[20 / (4 * 5)]] = 1، لأن في المدرسة «الضرب قبل القسمة». في البرمجة الاتنين نفس الدرجة، والشمال الأول.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده المفروض يقول مين فوق ١٨ سنة، بس بيطبع [[false]] للكل. ليه؟ صلّحه، وزوّد متغير [[isMinor]] بـ [[!]] صح.
~~~js
for (const age of [10, 18, 25]) {
  const isAdult = !age >= 18;
  console.log(age, isAdult);
}
~~~`, done: R`الكود بيطبع [[false true]] لـ 10، و [[true false]] لـ 18 و 25، وتقدر تشرح [[!age >= 18]] بيتقري إزاي.`, sol: R`الناتج قبل التصليح:

~~~text الناتج
10 false
18 false
25 false
~~~

[[!]] أقوى من [[>=]] بكتير (الـ unary operators فوق المقارنة)، فالسطر اتقري [[(!age) >= 18]]. و [[!25]] = [[false]]، و [[false >= 18]] بتحوّل [[false]] لـ 0، و [[0 >= 18]] = [[false]]. كل عمر أكبر من صفر هيطلع [[false]].

~~~js adults.js
for (const age of [10, 18, 25]) {
  const isAdult = age >= 18;
  const isMinor = !(age >= 18);
  console.log(age, isAdult, isMinor);
}
~~~

~~~text الناتج
10 false true
18 true false
25 true false
~~~

- [[age >= 18]] أوضح حاجة، ومحتاجتش [[!]] أصلًا.
- لو عايز النفي: [[!(age >= 18)]] بالأقواس، عشان المقارنة تتحسب الأول وبعدين النفي. أو [[age < 18]] من غير نفي.

ESLint عنده قاعدة اسمها [[no-unsafe-negation]] بتمسك الشكل ده مع [[in]] و [[instanceof]] ([[!key in obj]]).` },
            { lvl: 'تطبيق', t: R`**اشرحها بالأقواس:** اكتب كل expression من دول بأقواس كاملة زي ما JavaScript بيقراها، وبعدين اكتب سكربت يقارن الشكلين بـ [[===]] على قيم تجربة: [[a + b * c - d / e]] و [[!done && count > 0 || force]] و [[typeof value === "string"]] و [[a > b === c > d]] و [[x = y = a + 1]].`, done: R`كل سطر في السكربت بيطبع [[true]]، ولكل expression الأقواس مكتوبة بإيدك.`, sol: R`~~~js parens.js
const a = 7, b = 3, c = 4, d = 10, e = 5;
let done = false, count = 2, force = false;
const value = "hi";
console.log(a + b * c - d / e === ((a + (b * c)) - (d / e)));
console.log((!done && count > 0 || force) === (((!done) && (count > 0)) || force));
console.log((typeof value === "string") === ((typeof value) === "string"));
console.log((a > b === c > d) === ((a > b) === (c > d)));
let x, y;
x = y = a + 1;
let x2, y2;
x2 = (y2 = (a + 1));
console.log(x === x2 && y === y2, x, y);
~~~

~~~text الناتج
true
true
true
true
true 8 8
~~~

| الأصلي | بالأقواس | ليه |
|---|---|---|
| [[a + b * c - d / e]] | [[((a + (b * c)) - (d / e))]] | الضرب والقسمة الأول، بعدين الجمع والطرح من الشمال |
| [[!done && count > 0 || force]] | [[((!done) && (count > 0)) || force]] | [[!]] الأول، بعدين المقارنة، بعدين [[&&]] (أقوى من [[||]]) |
| [[typeof value === "string"]] | [[(typeof value) === "string"]] | [[typeof]] unary فأقوى من المقارنة، وده اللي عايزه |
| [[a > b === c > d]] | [[(a > b) === (c > d)]] | [[>]] أقوى من [[===]] |
| [[x = y = a + 1]] | [[x = (y = (a + 1))]] | الإسناد من اليمين: [[y]] الأول وبعدين [[x]] |

**الغلطة الشائعة:** تفتكر [[&&]] و [[||]] نفس القوة فتقرا التاني من الشمال لليمين. النتيجة بتفرق لما [[force]] يبقى [[true]] و [[done]] يبقى [[true]].` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[isPalindrome(text)]] بترجّع [[true]] لو النص بيتقري من الناحيتين زي بعض، متجاهلة الحروف الكبيرة والمسافات والعلامات. استخدم for بمؤشرين: واحد من الأول وواحد من الآخر، بالـ comma operator في الـ update.`, done: R`[[isPalindrome("A man, a plan, a canal: Panama")]] بـ [[true]] و [[isPalindrome("hello")]] بـ [[false]] و [[isPalindrome("")]] بـ [[true]]، والاختبارات كلها بتعدّي.`, sol: R`~~~js palindrome.js
function isPalindrome(text) {
  const s = text.toLowerCase().replace(/[^a-z0-9؀-ۿ]/g, "");
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}
console.log(isPalindrome("Racecar"), isPalindrome("A man, a plan, a canal: Panama"), isPalindrome("hello"), isPalindrome(""), isPalindrome("حسن نسح"));
~~~

~~~text الناتج
true true false true true
~~~

**الحتة المهمة:** [[for (let i = 0, j = s.length - 1; i < j; i++, j--)]]

- [[let i = 0, j = s.length - 1]]: الفاصلة هنا **مش** comma operator، دي فاصلة declaration بتعرّف متغيرين.
- [[i++, j--]]: **دي** الـ comma operator. الـ [[for]] بيسمح بـ expression واحد في الجزء التالت، والـ comma بيخلّي الاتنين expression واحد: [[i]] بيزيد و [[j]] بيقل في نفس اللفة.
- [[i < j]]: لما المؤشرين يتقابلوا في النص، خلاص قارنّا كل حرف بالمقابل له.

و [[replace(/[^a-z0-9؀-ۿ]/g, "")]] بتشيل أي حاجة مش حرف إنجليزي أو رقم أو حرف عربي (الـ [[؀-ۿ]] نطاق الحروف العربي في Unicode)، فـ «حسن نسح» شغالة.

الغلطة الشائعة: تكتب الشرط [[i <= j]]. شغال برضه، بس بيقارن الحرف اللي في النص بنفسه في الطول الفردي.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const timeout = userTimeout || envTimeout ?? 3000;]] بيطلّع SyntaxError. صلّحه بطريقتين بالأقواس أو من غيرها، وجرّب الاتنين على [[userTimeout = 0]]: مين فيهم بيحترم إن اليوزر كتب صفر؟`, done: R`عندك نسختين شغالين، وجدول بـ ٤ حالات، وعارف ليه اللغة رفضت الشكل الأصلي من غير أقواس.`, sol: R`الـ error:

~~~text الناتج
const timeout = userTimeout || envTimeout ?? 3000;
                                          ^^

SyntaxError: Unexpected token '??'
~~~

اللغة **رافضة** تخلط [[??]] مع [[||]] أو [[&&]] من غير أقواس، لأن الشكلين ليهم معنى مختلف ومحدش هيعرف انت قصدت أنهي:

~~~js timeout.js
function pick(userTimeout, envTimeout) {
  const a = (userTimeout || envTimeout) ?? 3000;
  const b = userTimeout ?? envTimeout ?? 3000;
  return [a, b];
}
console.log(pick(0, undefined));
console.log(pick(undefined, 5000));
console.log(pick(undefined, undefined));
console.log(pick(2000, 5000));
~~~

~~~text الناتج
[ 3000, 0 ]
[ 5000, 5000 ]
[ 3000, 3000 ]
[ 2000, 2000 ]
~~~

- [[a]] = [[(userTimeout || envTimeout) ?? 3000]]: الـ [[||]] شاف 0 falsy فراح للـ env (undefined)، فالنتيجة 3000. اليوزر كتب صفر واتجاهل.
- [[b]] = [[userTimeout ?? envTimeout ?? 3000]]: الـ [[??]] بيتخطى [[null]] و [[undefined]] بس، فالـ 0 اتاخد.

لو الصفر قيمة صح (مثلًا «من غير timeout») فالتاني هو الصح. ودي الحالة اللي اللغة كانت عايزاك تفكر فيها لما رفضت الشكل الأصلي.` }
          ],
          check: { lang: "js", starter: R`function isPalindrome(text) {
  // مؤشر من الأول ومؤشر من الآخر
}`, tests: R`test("كلمة", () => expect(isPalindrome("Racecar")).toBe(true));
test("جملة بعلامات", () => expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true));
test("مش palindrome", () => expect(isPalindrome("hello")).toBe(false));
test("فاضي", () => expect(isPalindrome("")).toBe(true));
test("حرف واحد", () => expect(isPalindrome("x")).toBe(true));
test("عربي", () => expect(isPalindrome("حسن نسح")).toBe(true));
test("أرقام", () => expect(isPalindrome("12321")).toBe(true));`, solution: R`function isPalindrome(text) {
  const s = text.toLowerCase().replace(/[^a-z0-9؀-ۿ]/g, "");
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}` },
          flag: "script",
          deep: {
            why: R`كل حسبة فيها أكتر من خطوة (فاتورة، ونسبة، وشرط مركّب) بتعتمد على الترتيب. لو فاكره غلط، الكود بيشتغل من غير أي error وبيطلّع رقم غلط، وده أسوأ نوع bug. أمثلة حقيقية: [[!age >= 18]] بيطلع [[false]] دايمًا، و [[flags & MASK === MASK]] بتقارن الأول وبعدين تعمل AND، و [[price * qty - discount + shipping]] شغالة صح بالصدفة لحد ما حد يزوّد [[/ 100]] في النص.`,
            how: R`الـ parser بيبني شجرة من الـ expression: الـ operator الأضعف بيبقى في الجذر، والأقوى تحت. [[2 + 3 * 4]] بتبقى «جمع» فوق، وتحته 2 و «ضرب» (3 و 4). وبعدين الشجرة بتتحسب: كل عقدة بتحسب اللي تحتها **من الشمال لليمين**. عشان كده [[f(1) + f(2) * f(3)]] بيندّه [[f(1)]] الأول مع إن الضرب أقوى: الـ precedence حدد الشكل بس.

الـ associativity بتحسم لما اتنين نفس القوة: أغلب العمليات من الشمال ([[100 - 20 - 5]] = 75)، بس [[**]] من اليمين عشان تبقى زي الرياضيات ([[2 ** 3 ** 2]] = ٢ أس ٩)، والإسناد من اليمين عشان [[a = b = 5]] تشتغل.

وفي حالتين اللغة رفضت تختار: [[-2 ** 2]] (هل هو سالب ٤ ولا ٤؟) و [[a || b ?? c]]. في الاتنين لازم أقواس، وده متعمّد في المواصفة.`,
            when: R`حط أقواس لما الترتيب مش واضح من أول نظرة حتى لو مش لازمة: [[(a && b) || c]] و [[(x & MASK) === MASK]] و [[(price * qty) - discount]]. ومتحطهاش في الواضح جدًا ([[a + b * c]] مفهومة). الـ comma operator استخدمه في الـ [[for]] بمؤشرين، وفي arrow function قصيرة محتاجة تعمل حاجتين ([[x => (log(x), x * 2)]])، وغير كده اكتب سطرين أوضح.`,
            mistakes: R`- [[!a >= b]] و [[!key in obj]]: النفي بيتعمل على [[a]] بس.
- [[x & 1 === 0]]: المقارنة الأول. اكتب [[(x & 1) === 0]].
- [[3 > 2 > 1]] بـ [[false]]: [[(3 > 2) > 1]] = [[true > 1]] = [[1 > 1]].
- [[typeof x + y]]: الـ [[typeof]] على [[x]] بس، فبتطلع نص زي [["number2"]].
- [[return]] وبعدين سطر جديد وبعدين expression: الـ ASI بيحط [[;]] بعد [[return]] فبترجّع [[undefined]]. ده مش precedence بس شبهه: حط القوس على نفس السطر.
- تفتكر [[a, b]] في [[let a = 1, b = 2]] أو في [[f(a, b)]] comma operator: دول فواصل في الـ syntax، مش operator.`
          },
          teach: R`## الفكرة في سطرين

الـ **precedence** (الأولوية) بيقول مين «بيمسك» الأرقام اللي جنبه الأول. والـ **associativity** بتقول تمشي منين لما اتنين نفس الأولوية. والأقواس بتكسر الاتنين. كل اللي هنا اتشغّل بـ Node 24.22.

~~~js prec.js
// الضرب قبل الجمع
console.log(2 + 3 * 4, (2 + 3) * 4);
// الطرح من الشمال، والأس من اليمين
console.log(100 - 20 - 5, 2 ** 3 ** 2);
// typeof قبل الجمع
console.log(typeof 1 + 2, typeof (1 + 2));
// فاتورة: سعر × كمية، ناقص خصم، زائد شحن
const price = 200, qty = 3, discount = 50, shipping = 30;
console.log(price * qty - discount + shipping);
console.log(price * (qty - 1) + shipping);
// الـ comma operator بيرجّع آخر واحد
const last = (1, 2, 3);
console.log(last);
~~~

~~~text الناتج
14 20
75 512
number2 number
580
430
3
~~~

---

## ١. operator precedence: مين بيتحسب الأول

الجدول ده الأولويات اللي هتقابلها، من الأقوى (فوق) للأضعف (تحت). الأرقام من جدول MDN:

| الأولوية | العمليات | الاتجاه |
|---|---|---|
| 18 | الأقواس [[( )]] | |
| 17 | [[a.b]] و [[a[b] ]] و [[f()]] و [[a?.b]] و [[new X()]] | من الشمال |
| 15 | [[x++]] و [[x--]] | |
| 14 | [[!x]] و [[~x]] و [[-x]] و [[+x]] و [[++x]] و [[typeof]] و [[await]] | من اليمين |
| 13 | [[**]] | **من اليمين** |
| 12 | [[*]] و [[/]] و [[%]] | من الشمال |
| 11 | [[+]] و [[-]] | من الشمال |
| 10 | [[<<]] و [[>>]] و [[>>>]] | من الشمال |
| 9 | [[<]] و [[<=]] و [[>]] و [[>=]] و [[in]] و [[instanceof]] | من الشمال |
| 8 | [[==]] و [[!=]] و [[===]] و [[!==]] | من الشمال |
| 7 و 6 و 5 | [[&]] ثم [[^]] ثم [[|]] | من الشمال |
| 4 | [[&&]] | من الشمال |
| 3 | [[||]] و [[??]] | من الشمال |
| 2 | [[=]] و [[+=]] وكل الإسناد، و [[? :]]، و [[=>]] | **من اليمين** |
| 1 | الـ comma [[,]] | من الشمال |

كيف تقرا الجدول: [[2 + 3 * 4]]: الضرب (12) أقوى من الجمع (11)، فـ [[3 * 4]] بتتجمّع الأول: ٢ + ١٢ = 14. ولو عايز الجمع الأول، أقواس: [[(2 + 3) * 4]] = 20.

### الحتة اللي بتغلّط الناس: المقارنة أقوى من [[&]] و [[&&]]

~~~js traps.js
console.log(typeof 1 + 2);
console.log(!1 === 0, !(1 === 0));
console.log(true || false && false, (true || false) && false);
console.log(3 > 2 > 1, 1 < 2 < 3);
console.log(1 & 2 === 2, (1 & 2) === 2);
~~~

~~~text الناتج
number2
false true
true false
false true
1 false
~~~

| السطر | اتقري كده | ليه |
|---|---|---|
| [[typeof 1 + 2]] | [[(typeof 1) + 2]] | [[typeof]] (14) أقوى من الجمع (11)، فطلع [["number"]] + 2 = [["number2"]] |
| [[!1 === 0]] | [[(!1) === 0]] | [[!1]] = [[false]]، و [[false === 0]] بـ [[false]] (أنواع مختلفة) |
| [[true || false && false]] | [[true || (false && false)]] | [[&&]] (4) أقوى من [[||]] (3) |
| [[3 > 2 > 1]] | [[(3 > 2) > 1]] | [[true > 1]] يعني [[1 > 1]]: [[false]] |
| [[1 & 2 === 2]] | [[1 & (2 === 2)]] | المقارنة (8) أقوى من [[&]] (7)، فبقت [[1 & true]] = 1 |

---

## ٢. الـ associativity: نفس الأولوية، نمشي منين؟

~~~js assoc.js
console.log(100 - 20 - 5, (100 - 20) - 5, 100 - (20 - 5));
console.log(100 / 10 / 2, 2 ** 3 ** 2, (2 ** 3) ** 2);
let a, b;
a = b = 5;
console.log(a, b);
console.log(1 + 2 + "3", "1" + 2 + 3);
~~~

~~~text الناتج
75 75 85
5 512 64
5 5
33 123
~~~

- [[100 - 20 - 5]] = 75: من الشمال، زي [[(100 - 20) - 5]]. لو من اليمين كانت هتبقى 85.
- [[100 / 10 / 2]] = 5: من الشمال برضه.
- [[2 ** 3 ** 2]] = 512: **من اليمين**: [[2 ** (3 ** 2)]] = ٢ أس ٩. زي الرياضيات بالظبط.
- [[a = b = 5]]: الإسناد من اليمين: [[b = 5]] الأول (وبترجّع 5)، وبعدين [[a = 5]].
- [[1 + 2 + "3"]] = [["33"]]: من الشمال، [[1 + 2]] = 3 أرقام، وبعدين 3 + [["3"]] لزق. و [["1" + 2 + 3]] = [["123"]] لأن أول خطوة بقت نص.

### الحالة اللي اللغة رفضت فيها: [[-2 ** 2]]

~~~text الناتج
console.log(-2 ** 2);
            ^^^^^

SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
~~~

في الرياضيات «-٢²» يعني سالب ٤، بس في لغات تانية يعني ٤. المواصفة قررت إنها **متختارش**: لازم تكتب قصدك:

~~~js neg-ok.js
console.log((-2) ** 2, -(2 ** 2));
~~~

~~~text الناتج
4 -4
~~~

---

## ٣. grouping operator [[( )]]: الأقواس

الأقواس أعلى أولوية، فاللي جواها بيتجمّع الأول دايمًا. ليها استخدامين:

1. **تغيّر الترتيب:** [[price * (qty - 1)]] في المثال: الكمية ناقص واحد (عرض «واحدة ببلاش») قبل الضرب، فطلع 430 مش 580.
2. **توضّح الترتيب** حتى لو هو هو: [[(price * qty) - discount]] نفس النتيجة، بس اللي بيقرا مش محتاج يفتكر الجدول.

### مثال: خلط [[??]] مع الـ OR

~~~text الناتج من const v = null OR undefined ?? "x"
const v = null || undefined ?? "x";
                            ^^

SyntaxError: Unexpected token '??'
~~~

زي [[-2 ** 2]]، اللغة رافضة تخمّن. بالأقواس:

~~~js mix-ok.js
const v = (null || undefined) ?? "x";
console.log(v);
~~~

~~~text الناتج
x
~~~

---

## ٤. الأولوية مش ترتيب التنفيذ

~~~js order.js
const calls = [];
const f = n => (calls.push(n), n);
console.log(f(1) + f(2) * f(3));
console.log(calls.join(" ثم "));
~~~

~~~text الناتج
7
1 ثم 2 ثم 3
~~~

الضرب «أقوى»، بس [[f(1)]] اتندهت الأول. القاعدة: الـ precedence بيبني الشكل ([[1 + (2 * 3)]])، وبعدين كل جزء بيتحسب من الشمال لليمين. ده بيفرق لما الدوال ليها أثر (بتطبع، أو بتكتب في متغير، أو بتبعت request).

والـ short-circuit استثنا من «كل جزء بيتحسب»: [[false && f()]] مش هتندّه [[f]] خالص.

---

## ٥. comma operator: [[(a, b)]]

بيحسب كل expression من الشمال لليمين، ويرجّع **آخر واحد** بس:

~~~js comma.js
const r = (1, 2, 3);
console.log(r);
for (let i = 0, j = 4; i < j; i++, j--) {
  console.log(i, j);
}
const next = n => (console.log("قبل:", n), n + 1);
console.log(next(9));
~~~

~~~text الناتج
3
0 4
1 3
قبل: 9
10
~~~

- [[(1, 2, 3)]] رجّعت 3. الأقواس لازمة: من غيرها [[const r = 1, 2, 3]] كانت هتبقى تعريف متغيرات (SyntaxError).
- [[i++, j--]] في الـ [[for]]: أشهر استخدام. الجزء التالت محتاج expression واحد، والـ comma بيلم الاتنين.
- [[n => (console.log(...), n + 1)]]: arrow من غير [[{ }]] بترجّع expression واحد، والـ comma بيخلّيها تطبع وبعدين ترجّع.

### فواصل شكلها comma ومش هي

~~~js comma-not.js
const x = 1, y = 2;
console.log(x, y);
console.log(Math.max(1, 5, 3));
const arr = [1, 2, 3];
console.log(arr[1, 2]);
~~~

~~~text الناتج
1 2
5
3
~~~

- [[const x = 1, y = 2]] و [[Math.max(1, 5, 3)]]: فواصل في الـ syntax (declaration و arguments)، مش operator.
- [[arr[1, 2] ]]: **هنا** comma operator، و [[(1, 2)]] = 2، فرجّعت [[arr[2] ]] = 3. ده غالبًا غلطة: كان قصدك [[arr[1][2] ]] لـ array جوه array.

---

## الخلاصة

| القاعدة | مثال |
|---|---|
| الأقوى الأول | [[2 + 3 * 4]] = 14 |
| نفس القوة: من الشمال | [[100 - 20 - 5]] = 75 |
| [[**]] والإسناد: من اليمين | [[2 ** 3 ** 2]] = 512 |
| unary أقوى من أي عملية بين اتنين | [[!age >= 18]] = [[(!age) >= 18]] |
| المقارنة أقوى من [[&]] و [[&&]] | [[(x & 1) === 0]] محتاجة أقواس |
| اللغة بترفض تخمّن | [[-2 ** 2]] وخلط [[??]] |
| الـ operands من الشمال دايمًا | [[f(1) + f(2) * f(3)]] |
| الـ comma بترجّع الأخير | [[(1, 2, 3)]] = 3 |

لو شاكك، حط أقواس. مش هتبطّأ الكود ومش هتعيب فيه.`,
          lines: [
            R`[[2 + 3 * 4]]: الضرب أقوى، فـ ٢ + ١٢ = 14. و [[(2 + 3) * 4]]: الأقواس جبرت الجمع الأول، فـ ٥ × ٤ = 20.`,
            R`[[100 - 20 - 5]] من الشمال: (١٠٠ - ٢٠) - ٥ = 75. و [[2 ** 3 ** 2]] من اليمين: ٢ أس (٣ أس ٢) = ٢ أس ٩ = 512.`,
            R`[[typeof 1 + 2]]: الـ [[typeof]] لزق في الـ 1 بس فطلع [["number"]]، وبعدين + 2 لزق: [["number2"]]. وبالأقواس [[typeof (1 + 2)]] = [["number"]].`,
            R`أربع متغيرات في سطر واحد (الفاصلة هنا فاصلة declaration، مش comma operator): سعر وكمية وخصم وشحن.`,
            R`[[price * qty - discount + shipping]]: الضرب الأول (600)، وبعدين الطرح والجمع من الشمال: ٦٠٠ - ٥٠ + ٣٠ = 580.`,
            R`[[price * (qty - 1) + shipping]]: الأقواس حسبت الكمية ناقص واحد (عرض «واحدة ببلاش») قبل الضرب: ٢٠٠ × ٢ + ٣٠ = 430.`,
            R`[[(1, 2, 3)]] comma operator: بيحسب التلاتة بالترتيب ويرجّع آخر واحد، والأقواس لازمة عشان الفاصلة متتقريش فاصلة declaration.`,
            R`بيطبع 3: الـ 1 والـ 2 اتحسبوا واترموا، لأنهم مالهمش أثر.`
          ],
          ref: [
            { t: "MDN: Operator precedence", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence" },
            { t: "MDN: Grouping operator ( )", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping" },
            { t: "MDN: Comma operator (,)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator" },
            { t: "ECMAScript: Exponentiation operator", url: "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-exp-operator" }
          ],
          pre: ["js/++ و -- و += وأخواتها", { to: "js/&& و || و !", why: R`الـ short-circuit وترتيب [[&&]] و [[||]] بيتبنوا عليه هنا` }, "js/== و ==="]
        },
        {
          cmd: "Number: الثوابت والفحص والتحويل",
          title: "إيه حدود الـ number، وتفحص قيمة إنها رقم سليم إزاي، و parseInt بالـ radix؟",
          desc: R`[[Number]] فيه ثوابت بتقولك حدود النوع: أكبر رقم ([[Number.MAX_VALUE]])، وأصغر رقم موجب ([[Number.MIN_VALUE]])، وحدود الأعداد الصحيحة الدقيقة ([[Number.MAX_SAFE_INTEGER]] و [[Number.MIN_SAFE_INTEGER]])، و [[Infinity]] و [[NaN]] بأساميهم الرسمية.

وفيه دوال فحص: [[Number.isNaN]] و [[Number.isFinite]] و [[Number.isInteger]] و [[Number.isSafeInteger]]، وكلهم **مبيحوّلوش** القيمة. عكس [[isNaN()]] و [[isFinite()]] العامة القديمة اللي بتحوّل لرقم الأول، فـ [[isNaN("abc")]] بـ [[true]] و [[isFinite("")]] بـ [[true]].

والتحويل: [[parseInt(text, radix)]] و [[parseFloat(text)]] بيقروا من أول النص لحد أول حرف مش مفهوم، و [[Number.parseInt]] هي نفس الدالة بالظبط.`,
          example: R`// الحدود
console.log(Number.MAX_VALUE, Number.MIN_VALUE);
console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
// الفحص: العامة بتحوّل الأول، و Number. لأ
console.log(isNaN("abc"), Number.isNaN("abc"));
console.log(isFinite("12"), Number.isFinite("12"));
console.log(Number.isSafeInteger(2 ** 53), Number.isInteger(5.0));
// التحويل
console.log(parseInt("ff", 16), parseInt("1e3", 10), parseFloat("1e3"));
console.log(Number.parseInt === parseInt);`,
          try: R`في الـ Console: [[Number.MAX_VALUE * 2]] و [[Number.MIN_VALUE / 2]]. بعدين قارن [[isNaN(undefined)]] بـ [[Number.isNaN(undefined)]]، و [[isFinite("")]] بـ [[Number.isFinite("")]]. وآخر حاجة [[parseInt("0.0000005")]] و [[parseInt(0.0000005)]]: واحد بيطلع 0 وواحد 5، ليه؟ (اطبع [[String(0.0000005)]]).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لكل سطر، اكتب الاتنين: [[isNaN("abc")]] و [[Number.isNaN("abc")]]، وبعدين نفس الاتنين لـ [[undefined]] و [[""]] و [[0 / 0]].`, done: R`كتبت الـ ٨ قيم قبل التشغيل، والسكربت طلّع [[true false]] ثم [[true false]] ثم [[false false]] ثم [[true true]].`, sol: R`~~~js d1.js
console.log(isNaN("abc"), Number.isNaN("abc"));
console.log(isNaN(undefined), Number.isNaN(undefined));
console.log(isNaN(""), Number.isNaN(""));
console.log(isNaN(0 / 0), Number.isNaN(0 / 0));
~~~

~~~text الناتج
true false
true false
false false
true true
~~~

**ليه:** [[isNaN()]] العامة بتعمل [[Number(x)]] الأول وبعدين تسأل «طلع NaN؟». [[Number("abc")]] و [[Number(undefined)]] بيطلعوا NaN فبتقول [[true]]، و [[Number("")]] بـ 0 فبتقول [[false]].

[[Number.isNaN]] مبتحوّلش: بتسأل «القيمة دي نفسها هي NaN؟». [["abc"]] نص مش NaN، و [[undefined]] مش NaN. الوحيدة اللي [[true]] هي [[0 / 0]] لأنها فعلًا NaN.

الغلطة الشائعة: تستخدم [[isNaN(input)]] عشان تعرف «هل ده رقم؟» وتفتكر [[""]] رقم.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الدالة دي بتقبل خانة السن الفاضية وبتسجّل السن 0:
~~~js
function validAge(input) {
  if (!isFinite(input)) return "اكتب رقم";
  return "تمام: " + Number(input);
}
~~~
صلّحها عشان ترفض الفاضي والمسافات و [[null]] والحروف والكسور والسالب وأي سن فوق ١٣٠.`, done: R`[[validAge("25")]] بـ «تمام: 25»، والستة التانيين ([[""]] و [["  "]] و [[null]] و [["abc"]] و [["25.5"]] و [["-3"]]) بيرجعوا «اكتب سن صحيح».`, sol: R`قبل التصليح:

~~~text الناتج
تمام: 25 | تمام: 0 | تمام: 0 | تمام: 0 | اكتب رقم
~~~

[[isFinite("")]] و [[isFinite("  ")]] و [[isFinite(null)]] كلهم [[true]]، لأنها بتعمل [[Number()]] الأول وكلهم بيبقوا 0.

~~~js age.js
function validAge(input) {
  const text = String(input ?? "").trim();
  const age = Number(text);
  if (text === "" || !Number.isInteger(age) || age < 0 || age > 130) return "اكتب سن صحيح";
  return "تمام: " + age;
}
console.log(validAge("25"), "|", validAge(""), "|", validAge("  "), "|", validAge(null), "|", validAge("abc"), "|", validAge("25.5"), "|", validAge("-3"));
~~~

~~~text الناتج
تمام: 25 | اكتب سن صحيح | اكتب سن صحيح | اكتب سن صحيح | اكتب سن صحيح | اكتب سن صحيح | اكتب سن صحيح
~~~

- [[String(input ?? "")]]: [[null]] و [[undefined]] بيبقوا نص فاضي، وأي حاجة تانية بتبقى نص.
- [[text === ""]] **قبل** التحويل: ده اللي بيمسك الفاضي والمسافات (بعد [[trim]]).
- [[Number.isInteger(age)]]: بترجّع [[false]] لـ NaN ولـ 25.5 ولـ Infinity في خطوة واحدة.
- [[age < 0 || age > 130]]: حدود منطقية. [[isFinite]] مكانتش هتمسك [[-3]] ولا [[999]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف [[stock.csv]] فيه أسامي أدوات وكمياتها، والكميات متكتبة بالأرقام العربي ([[١٢]]) وبعضها غلط. اجمع الكميات الصحيحة، واطبع اللي اترفض وليه. (الملف تحت في الحل.)`, done: R`بيطبع «الإجمالي: 37» و ٣ مرفوضين: [[abc]] و [[٧٫٥]] (كسر) والخانة الفاضية.`, sol: R`~~~text stock.csv
قلم,١٢
كشكول,٥
مسطرة,abc
براية,٧٫٥
أستيكة,
ممحاة,20
~~~

~~~js stock.js
const fs = require("fs");
const AR = "٠١٢٣٤٥٦٧٨٩";
function westernDigits(text) {
  let out = "";
  for (const ch of text) {
    const i = AR.indexOf(ch);
    out += i >= 0 ? String(i) : ch === "٫" ? "." : ch;
  }
  return out;
}
const lines = fs.readFileSync("stock.csv", "utf8").trim().split(/\r?\n/);
let total = 0;
const bad = [];
for (const line of lines) {
  const [name, rawQty = ""] = line.split(",");
  const text = westernDigits(rawQty).trim();
  const qty = Number(text);
  if (text === "" || !Number.isInteger(qty) || qty < 0) { bad.push(name + " (" + rawQty + ")"); continue; }
  total += qty;
}
console.log("الإجمالي:", total);
console.log("مرفوض:", bad.join("، "));
~~~

~~~text الناتج
الإجمالي: 37
مرفوض: مسطرة (abc)، براية (٧٫٥)، أستيكة ()
~~~

**ليه محتاجين [[westernDigits]]:** [[Number("١٢")]] و [[parseInt("١٢", 10)]] الاتنين [[NaN]] (اتجرّب في الشرح). JavaScript بيفهم الأرقام الإنجليزي بس في التحويل، مع إن [[toLocaleString("ar-EG")]] بيطلّع عربي. فلازم نحوّل كل حرف: [[AR.indexOf(ch)]] بيدينا مكانه من ٠ لـ ٩، والفاصلة العشرية العربي [[٫]] بتبقى نقطة.

**ليه [[Number]] مش [[parseInt]]:** [[parseInt("٧.٥")]] بعد التحويل كانت هتطلّع 7 وتعدّي كمية غلط من غير ما تاخد بالك. [[Number]] بتطلّع 7.5، و [[Number.isInteger]] بترفضها.

**و [[rawQty = ""]]:** السطر [[أستيكة,]] لما يتقسم بيطلع خانة فاضية، والـ default بيحمينا من [[undefined]] لو السطر من غير فاصلة خالص.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[parseSize(text)]] بتفك قيمة CSS زي [["12px"]] لـ [[{ value: 12, unit: "px" }]] بـ [[parseFloat]]، وترجّع [[null]] لو مفيش رقم في الأول.`, done: R`الاختبارات بتعدّي: [["1.5rem"]] و [["-3em"]] و [["50%"]] و [[".5vh"]] و [["1e2px"]] (قيمتها 100)، و [["px"]] و [[""]] بيرجعوا [[null]].`, sol: R`~~~js size.js
function parseSize(text) {
  const t = String(text).trim();
  const value = parseFloat(t);
  if (!Number.isFinite(value)) return null;
  const unit = t.replace(/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?/i, "");
  return { value, unit };
}
for (const s of ["12px", "1.5rem", "-3em", "50%", " 8 ", "px", "", ".5vh", "1e2px"]) console.log(JSON.stringify(s), JSON.stringify(parseSize(s)));
~~~

~~~text الناتج
"12px" {"value":12,"unit":"px"}
"1.5rem" {"value":1.5,"unit":"rem"}
"-3em" {"value":-3,"unit":"em"}
"50%" {"value":50,"unit":"%"}
" 8 " {"value":8,"unit":""}
"px" null
"" null
".5vh" {"value":0.5,"unit":"vh"}
"1e2px" {"value":100,"unit":"px"}
~~~

- [[parseFloat(t)]] بتقرا أطول رقم في أول النص وتقف: [["1.5rem"]] بتطلّع 1.5، و [["1e2px"]] بتطلّع 100 (بتفهم الأُس)، و [["px"]] بتطلّع [[NaN]].
- [[Number.isFinite(value)]] بترفض [[NaN]] (ومعاها [["Infinity"]] لو حد بعتها).
- الوحدة: نشيل الرقم من أول النص بـ regex بنفس شكل اللي [[parseFloat]] بتقراه (إشارة، أرقام بنقطة أو نقطة وأرقام، وأُس اختياري)، والباقي هو الوحدة.

الغلطة الشائعة: [[parseInt]] بدل [[parseFloat]]، فـ [["1.5rem"]] بتبقى 1 و [[".5vh"]] بتبقى [[NaN]].`, },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة [[parseInt()]] على MDN (قسم radix)، توقّع ناتج دول وبعدين شغّلهم: [[parseInt("123", 0)]] و [[parseInt("0x1F", 0)]] و [[parseInt("123", undefined)]] و [[parseInt("123", 1)]] و [[parseInt("123", 37)]] و [[parseInt("123", 4.9)]] و [[parseInt("123", "8")]].`, done: R`كتبت السبعة قبل التشغيل، وتقدر تقول القاعدة اللي ورا كل واحد من الوثائق.`, sol: R`~~~js radix-rules.js
console.log(parseInt("123", 0), parseInt("0x1F", 0), parseInt("123", undefined), parseInt("123", 1), parseInt("123", 37), parseInt("123", 4.9), parseInt("123", "8"));
~~~

~~~text الناتج
123 31 123 NaN NaN 27 83
~~~

القواعد من MDN، بالترتيب:

| النداء | الناتج | القاعدة |
|---|---|---|
| [[parseInt("123", 0)]] | 123 | الـ radix صفر معناه «مش محدد»: عشري، إلا لو النص بيبدأ بـ [[0x]] |
| [[parseInt("0x1F", 0)]] | 31 | نفس القاعدة: [[0x]] في الأول يعني hex |
| [[parseInt("123", undefined)]] | 123 | مش محدد، زي الصفر |
| [[parseInt("123", 1)]] | NaN | أي radix أقل من 2 أو أكبر من 36 بيطلّع NaN |
| [[parseInt("123", 37)]] | NaN | نفس القاعدة: ٣٦ = ١٠ أرقام + ٢٦ حرف |
| [[parseInt("123", 4.9)]] | 27 | الـ radix بيتقطع لعدد صحيح (4)، و «123» بأساس ٤ = ١٦ + ٨ + ٣ |
| [[parseInt("123", "8")]] | 83 | الـ radix بيتحوّل رقم: «123» بأساس ٨ = ٦٤ + ١٦ + ٣ |

الخلاصة اللي تمشي بيها: اكتب الـ radix دايمًا رقم صريح من ٢ لـ ٣٦، ومتسيبهاش للتخمين.` },
            { lvl: 'تحدي', t: R`**حالة طرفية:** API بيرجّع [[{"orderId": 9007199254740993, "qty": 3}]]. اعمل [[JSON.parse]] واطبع الـ ID، وبعدين اكتب [[checkId(id)]] بترمي [[RangeError]] برسالة واضحة لو الـ ID مش safe.`, done: R`الـ ID اتطبع [[9007199254740992]] (رقم غلط من غير أي error)، و [[checkId]] رمت RangeError برسالة بتقول الحل.`, sol: R`~~~js order-id.js
const json = '{"orderId": 9007199254740993, "qty": 3}';
const data = JSON.parse(json);
console.log(data.orderId, Number.isSafeInteger(data.orderId));
console.log(Number.isSafeInteger(data.qty));
function checkId(id) {
  if (!Number.isSafeInteger(id)) throw new RangeError("الـ ID ده أكبر من الحد الآمن، ابعته كنص من الـ API: " + id);
  return id;
}
try { checkId(data.orderId); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
9007199254740992 false
true
RangeError: الـ ID ده أكبر من الحد الآمن، ابعته كنص من الـ API: 9007199254740992
~~~

- الـ ID المكتوب ...993 اتقري ...992: [[JSON.parse]] حوّله [[number]] وده أقرب رقم الـ number يقدر يمثّله. محدش رمى error.
- [[Number.isSafeInteger]] بتمسك ده: [[false]]. والسبب إن من بعد [[2 ** 53]] مش كل عدد صحيح ليه مكان، فممكن رقمين مختلفين يبقوا نفس القيمة.
- ليه رسالة الخطأ بتقول «ابعته كنص»: ده الحل الحقيقي اللي APIs كبيرة بتعمله (بتبعت [[id_str]] جنب [[id]]). ولو مقدرتش تغيّر الـ API، تقدر تقراه [[BigInt]] من النص الأصلي (درس «BigInt بعمق»).
- و [[RangeError]] لأنه النوع المناسب لـ «القيمة برّه المدى المسموح».` }
          ],
          check: { lang: "js", starter: R`function parseSize(text) {
  // رجّع { value, unit } أو null
}`, tests: R`test("px", () => expect(parseSize("12px")).toEqual({ value: 12, unit: "px" }));
test("rem بكسر", () => expect(parseSize("1.5rem")).toEqual({ value: 1.5, unit: "rem" }));
test("سالب", () => expect(parseSize("-3em")).toEqual({ value: -3, unit: "em" }));
test("نسبة", () => expect(parseSize("50%")).toEqual({ value: 50, unit: "%" }));
test("من غير وحدة", () => expect(parseSize(" 8 ")).toEqual({ value: 8, unit: "" }));
test("نقطة في الأول", () => expect(parseSize(".5vh")).toEqual({ value: 0.5, unit: "vh" }));
test("أُس", () => expect(parseSize("1e2px")).toEqual({ value: 100, unit: "px" }));
test("وحدة بس", () => expect(parseSize("px")).toBe(null));
test("فاضي", () => expect(parseSize("")).toBe(null));`, solution: R`function parseSize(text) {
  const t = String(text).trim();
  const value = parseFloat(t);
  if (!Number.isFinite(value)) return null;
  const unit = t.replace(/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?/i, "");
  return { value, unit };
}` },
          flag: "script",
          deep: {
            why: R`أي رقم داخل برنامجك من برّه (فورم، و query string، و CSV، و API) نص لحد ما تحوّله، والتحويل ممكن يفشل في سكوت: [[NaN]] بتعدّي في الحسابات، و [[""]] بتبقى 0، و ID كبير بيتغيّر من غير error. الدوال والثوابت دي هي الحراس: تعرف بيها القيمة سليمة قبل ما تتخزن.`,
            how: R`[[isNaN(x)]] و [[isFinite(x)]] العامة موجودين من أول JavaScript، وبيعملوا [[Number(x)]] الأول. ده خلّاهم يجاوبوا على سؤال تاني: «لو حوّلت دي لرقم، هتبقى NaN؟». في ES2015 اتضافت نسخ [[Number.isNaN]] و [[Number.isFinite]] اللي مبتحوّلش: لو القيمة مش من نوع [[number]] أصلًا بترجّع [[false]] على طول. و [[Number.isInteger]] و [[Number.isSafeInteger]] اتضافوا معاهم.

[[Number.parseInt]] و [[Number.parseFloat]] اتضافوا عشان «كل حاجة تخص الأرقام تبقى على [[Number]]»، بس هما **نفس الدالة** ([[Number.parseInt === parseInt]] بـ [[true]]).

[[parseInt(text, radix)]] بتحوّل الـ argument لنص الأول (فالرقم [[0.0000005]] بيبقى [["5e-7"]] وبعدين تقرا 5)، وتشيل المسافات من الأول، وتقرا أطول جزء مفهوم بالأساس ده، وتقف. [[parseFloat]] نفس الكلام بس بتفهم النقطة والأُس و [["Infinity"]]، ومالهاش radix (عشري بس).

[[Number.MAX_VALUE]] حوالي ١٫٨ × ١٠ أس ٣٠٨ وأي حاجة أكبر بتبقى [[Infinity]]. و [[Number.MIN_VALUE]] (٥ × ١٠ أس سالب ٣٢٤) أصغر رقم **موجب** مش أصغر رقم سالب، وأي حاجة أصغر منه بتبقى 0.`,
            when: R`[[Number.isFinite]] لما عايز «رقم حقيقي ينفع أحسب بيه» (بيرفض NaN و Infinity والنصوص)، و [[Number.isInteger]] للكميات والأعمار، و [[Number.isSafeInteger]] للـ IDs والعدّادات الكبيرة. [[Number.isNaN]] لما عايز تعرف «الحساب ده فشل؟». [[parseInt(x, 10)]] و [[parseFloat]] لنص فيه رقم وبعده كلام ([["12px"]] و [["4.5kg"]])، و [[Number()]] لما النص كله لازم يبقى رقم. والعامة [[isNaN()]] و [[isFinite()]] متستخدمهمش في كود جديد إلا لو عايز التحويل بقصد.`,
            mistakes: R`- [[isNaN(input)]] عشان تعرف إن ده «مش رقم»: [[isNaN("")]] و [[isNaN(null)]] و [[isNaN(true)]] كلهم [[false]].
- [[x === NaN]]: دايمًا [[false]]. استخدم [[Number.isNaN(x)]].
- [[Number.isInteger("5")]] بـ [[false]]: النص مش number. حوّل الأول.
- [[parseInt]] من غير radix، أو على رقم مش نص ([[parseInt(0.0000005)]] = 5، و [[parseInt(1e21)]] = 1).
- [[["10", "10", "10"].map(parseInt)]] = [[[10, NaN, 2]]]: الـ index بيتبعت كـ radix. اكتب [[s => parseInt(s, 10)]] أو [[map(Number)]].
- تفتكر [[Number.MIN_VALUE]] أصغر رقم سالب: ده أصغر رقم موجب. أصغر رقم سالب هو [[-Number.MAX_VALUE]].
- تفتكر [[Number.isInteger(5.0000000000000001)]] بـ [[false]]: بـ [[true]]، لأن الرقم ده اتخزن 5 أصلًا.`
          },
          teach: R`## الفكرة في سطرين

الدرس ده عن تلات حاجات على [[Number]]: **ثوابت** بتقولك حدود النوع، و **دوال فحص** بتقولك القيمة سليمة ولا لأ، و **دوال تحويل** من نص لرقم. كله اتشغّل بـ Node 24.22، ونفس النتايج في Chrome 157.

~~~js number.js
// الحدود
console.log(Number.MAX_VALUE, Number.MIN_VALUE);
console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
// الفحص: العامة بتحوّل الأول، و Number. لأ
console.log(isNaN("abc"), Number.isNaN("abc"));
console.log(isFinite("12"), Number.isFinite("12"));
console.log(Number.isSafeInteger(2 ** 53), Number.isInteger(5.0));
// التحويل
console.log(parseInt("ff", 16), parseInt("1e3", 10), parseFloat("1e3"));
console.log(Number.parseInt === parseInt);
~~~

~~~text الناتج
1.7976931348623157e+308 5e-324
9007199254740991 -9007199254740991
true false
true false
false true
255 1 1000
true
~~~

---

## ١. الحدود: [[Number.MAX_VALUE]] و [[Number.MIN_VALUE]]

~~~js limits.js
console.log(Number.MAX_VALUE);
console.log(Number.MAX_VALUE * 2, -Number.MAX_VALUE * 2);
console.log(Number.MAX_VALUE + 1 === Number.MAX_VALUE);
console.log(Number.MIN_VALUE, Number.MIN_VALUE / 2, Number.MIN_VALUE > 0);
~~~

~~~text الناتج
1.7976931348623157e+308
Infinity -Infinity
true
5e-324 0 true
~~~

- [[Number.MAX_VALUE]] ≈ ١٫٨ × ١٠ أس ٣٠٨: أكبر رقم الـ number يقدر يمسكه. ضربه في ٢ **overflow**: بقى [[Infinity]] من غير error.
- [[MAX_VALUE + 1 === MAX_VALUE]] بـ [[true]]: الرقم كبير لدرجة إن ١ أصغر من أصغر فرق بين رقمين جنب بعض هناك، فالجمع ملوش أثر.
- [[Number.MIN_VALUE]] = [[5e-324]]: أصغر رقم **موجب**، أقرب حاجة للصفر. قسمته على ٢ **underflow**: بقى 0. وهو أكبر من صفر ([[true]]).

---

## ٢. [[Number.MAX_SAFE_INTEGER]] و [[Number.MIN_SAFE_INTEGER]] و [[Number.isSafeInteger]]

~~~js safe.js
console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2);
console.log(Number.isSafeInteger(9007199254740991), Number.isSafeInteger(9007199254740992), Number.isSafeInteger(-9007199254740992));
console.log(Number.isSafeInteger(5.5), Number.isSafeInteger("5"), Number.isSafeInteger(1e16));
~~~

~~~text الناتج
9007199254740991 -9007199254740991
true
true false false
false false false
~~~

- [[MAX_SAFE_INTEGER]] = ٢ أس ٥٣ ناقص ١، و [[MIN_SAFE_INTEGER]] سالبه. بينهم كل عدد صحيح ليه تمثيل خاص بيه.
- برّه المدى: [[MIN_SAFE_INTEGER - 1 === MIN_SAFE_INTEGER - 2]] بـ [[true]]! رقمين مختلفين بقوا نفس القيمة. ده معنى «مش safe».
- [[Number.isSafeInteger(x)]]: [[true]] لو [[x]] عدد صحيح **و** جوه المدى. [[2 ** 53]] صحيح بس برّه، و [[5.5]] مش صحيح، و [["5"]] مش number، و [[1e16]] صحيح وبرّه. الأربعة [[false]].

---

## ٣. [[Number.POSITIVE_INFINITY]] و [[Number.NEGATIVE_INFINITY]] و [[Number.NaN]]

~~~js inf.js
console.log(Number.POSITIVE_INFINITY === Infinity, Number.NEGATIVE_INFINITY === -Infinity);
console.log(1 / 0, -1 / 0, 0 / 0, Infinity - Infinity, Infinity * 0);
console.log(Number.NaN, typeof Number.NaN, Number.NaN === Number.NaN, Object.is(Number.NaN, NaN));
console.log(1 / -0, -0 === 0, Object.is(-0, 0), Math.round(-0.4), String(-0), JSON.stringify(-0));
~~~

~~~text الناتج
true true
Infinity -Infinity NaN NaN NaN
NaN number false true
-Infinity true false -0 0 0
~~~

| الثابت | يساوي | بيطلع من |
|---|---|---|
| [[Number.POSITIVE_INFINITY]] | [[Infinity]] | قسمة موجب على صفر، أو overflow |
| [[Number.NEGATIVE_INFINITY]] | [[-Infinity]] | قسمة سالب على صفر |
| [[Number.NaN]] | [[NaN]] | [[0 / 0]] و [[Infinity - Infinity]] و [[Infinity * 0]] |

الثوابت دي نفس القيم العامة بالظبط ([[===]] بـ [[true]])، موجودين على [[Number]] عشان الكود اللي عايز يقول «أنا بتكلم عن الأرقام» صراحة. و [[Number.NaN === Number.NaN]] بـ [[false]] زي أي NaN، بس [[Object.is]] بتقول [[true]].

### الصفر السالب [[-0]]

السطر الأخير: [[1 / -0]] بـ [[-Infinity]]، يعني فيه صفر سالب فعلًا. [[-0 === 0]] بـ [[true]] بس [[Object.is(-0, 0)]] بـ [[false]]. وبيطلع من حاجات عادية: [[Math.round(-0.4)]] بـ [[-0]]. و [[String(-0)]] و [[JSON.stringify(-0)]] بيكتبوه [["0"]]، فغالبًا مش هتشوفه إلا لو قسمت عليه أو طبعته في الـ REPL.

---

## ٤. [[isNaN()]] العامة ضد [[Number.isNaN]]

~~~js isnan.js
const cases = [["NaN", NaN], ['"abc"', "abc"], ["undefined", undefined], ["{}", {}], ['""', ""], ['"  "', "  "], ["null", null], ['"12"', "12"], ["true", true], ["[5]", [5]]];
for (const [label, v] of cases) {
  console.log(label.padEnd(10), "isNaN():", String(isNaN(v)).padEnd(6), "Number.isNaN:", Number.isNaN(v));
}
~~~

~~~text الناتج
NaN        isNaN(): true   Number.isNaN: true
"abc"      isNaN(): true   Number.isNaN: false
undefined  isNaN(): true   Number.isNaN: false
{}         isNaN(): true   Number.isNaN: false
""         isNaN(): false  Number.isNaN: false
"  "       isNaN(): false  Number.isNaN: false
null       isNaN(): false  Number.isNaN: false
"12"       isNaN(): false  Number.isNaN: false
true       isNaN(): false  Number.isNaN: false
[5]        isNaN(): false  Number.isNaN: false
~~~

- [[isNaN(x)]] = [[Number.isNaN(Number(x))]]: بتحوّل الأول. فـ [["abc"]] و [[undefined]] و [[{}]] بيبقوا NaN بعد التحويل، فـ [[true]]. و [[""]] و [["  "]] و [[null]] و [[true]] و [[[5]]] بيتحوّلوا لأرقام (0 و 0 و 0 و 1 و 5)، فـ [[false]].
- [[Number.isNaN(x)]]: [[true]] للقيمة [[NaN]] نفسها بس.

السؤال اللي بتسأله يحدد الدالة: «الحساب ده طلّع NaN؟» يبقى [[Number.isNaN]]. «النص ده رقم؟» ولا واحدة فيهم: استخدم [[Number.isFinite(Number(text))]] مع فحص الفاضي (القسم ٨).

---

## ٥. [[isFinite()]] العامة ضد [[Number.isFinite]] و [[Number.isInteger]]

~~~js isfinite.js
const show = v => (typeof v === "string" ? JSON.stringify(v) : String(v)).padEnd(10);
for (const v of [42, 4.2, "42", "", null, true, Infinity, NaN, 2 ** 53, 1e308 * 10]) {
  console.log(show(v), "isFinite():", String(isFinite(v)).padEnd(6), "Number.isFinite:", String(Number.isFinite(v)).padEnd(6), "isInteger:", Number.isInteger(v));
}
console.log(Number.isInteger(5.0000000000000001), Number.isInteger(5.000000000000001));
~~~

~~~text الناتج
42         isFinite(): true   Number.isFinite: true   isInteger: true
4.2        isFinite(): true   Number.isFinite: true   isInteger: false
"42"       isFinite(): true   Number.isFinite: false  isInteger: false
""         isFinite(): true   Number.isFinite: false  isInteger: false
null       isFinite(): true   Number.isFinite: false  isInteger: false
true       isFinite(): true   Number.isFinite: false  isInteger: false
Infinity   isFinite(): false  Number.isFinite: false  isInteger: false
NaN        isFinite(): false  Number.isFinite: false  isInteger: false
9007199254740992 isFinite(): true   Number.isFinite: true   isInteger: true
Infinity   isFinite(): false  Number.isFinite: false  isInteger: false
true false
~~~

- نفس القصة: [[isFinite("42")]] و [[isFinite("")]] و [[isFinite(null)]] و [[isFinite(true)]] كلهم [[true]] لأنها بتحوّل. [[Number.isFinite]] بتقول [[true]] للـ number الحقيقي بس، ماعدا [[NaN]] و [[Infinity]] و [[-Infinity]].
- [[Number.isInteger(x)]]: number وملوش كسر. [[4.2]] لأ، و [[2 ** 53]] أيوه (صحيح حتى لو مش safe).
- آخر سطر فخ: [[5.0000000000000001]] **اتخزن 5** لأن الفرق أصغر من دقة الـ number، فـ [[isInteger]] قالت [[true]]. و [[5.000000000000001]] (صفر أقل) اتخزن مختلف، فـ [[false]].

---

## ٦. [[parseInt()]] و [[Number.parseInt]]: الـ radix

[[parseInt(text, radix)]]: الـ **radix** هو الأساس اللي النص مكتوب بيه، من 2 لـ 36:

~~~js radix.js
console.log(parseInt("ff", 16), parseInt("FF", 16), parseInt("0xff", 16), parseInt("777", 8), parseInt("1010", 2), parseInt("z", 36));
console.log(parseInt("12", 2), parseInt("2", 2), parseInt("10", 37), parseInt("10", 1), parseInt("10", 0), parseInt("0x1F"));
console.log(Number.parseInt === parseInt, Number.parseFloat === parseFloat);
~~~

~~~text الناتج
255 255 255 511 10 35
1 NaN NaN NaN 10 31
true true
~~~

| النداء | الناتج | ليه |
|---|---|---|
| [[parseInt("ff", 16)]] | 255 | hex، والحروف كابيتال أو سمول عادي |
| [[parseInt("0xff", 16)]] | 255 | مع radix 16 الـ [[0x]] مسموح |
| [[parseInt("777", 8)]] | 511 | octal |
| [[parseInt("z", 36)]] | 35 | أساس ٣٦: ١٠ أرقام و ٢٦ حرف، و z آخرهم |
| [[parseInt("12", 2)]] | 1 | الـ 2 مش رقم binary، فقرت الـ 1 بس ووقفت |
| [[parseInt("2", 2)]] | NaN | أول حرف مش مفهوم خالص |
| [[parseInt("10", 37)]] | NaN | radix برّه المدى |
| [[parseInt("0x1F")]] | 31 | من غير radix: [[0x]] في الأول معناها hex |

و [[Number.parseInt === parseInt]] بـ [[true]]: دالة واحدة باسمين.

---

## ٧. [[parseFloat()]] و [[Number.parseFloat]] وفخاخ التحويل

~~~js traps.js
console.log(parseInt("1e3", 10), parseFloat("1e3"));
console.log(parseInt(0.0000005), String(0.0000005));
console.log(parseInt(1e21), parseInt(-0.9), Math.trunc(-0.9));
console.log(parseInt(null, 36), parseInt("Infinity"), parseFloat("Infinity"));
console.log(parseFloat("3.14.15"), parseFloat("-.5e2x"), parseFloat("1e1000"));
console.log(["10", "10", "10"].map(parseInt), ["10", "10", "10"].map(s => parseInt(s, 10)));
~~~

~~~text الناتج
1 1000
5 5e-7
1 -0 -0
1112745 NaN Infinity
3.14 -50 Infinity
[ 10, NaN, 2 ] [ 10, 10, 10 ]
~~~

| السطر | اللي حصل |
|---|---|
| [[parseInt("1e3", 10)]] | 1: الـ [[e]] مش رقم عشري، فوقفت. بس [[parseFloat("1e3")]] بتفهم الأُس فطلعت 1000 |
| [[parseInt(0.0000005)]] | 5: الرقم اتحوّل لنص [["5e-7"]] الأول، وبعدين اتقري لحد الـ [[e]] |
| [[parseInt(1e21)]] | 1: نفس الحكاية، [["1e+21"]] |
| [[parseInt(-0.9)]] | [[-0]]: بيقطع الكسر زي [[Math.trunc]] |
| [[parseInt(null, 36)]] | 1112745: [[null]] اتحوّل للنص [["null"]]، وده كلمة مفهومة بأساس ٣٦! |
| [[parseFloat("Infinity")]] | [[Infinity]]: بتفهمها، و [[parseInt]] لأ |
| [[parseFloat("3.14.15")]] | 3.14: وقفت عند تاني نقطة |
| [[parseFloat("1e1000")]] | [[Infinity]]: overflow |
| [[map(parseInt)]] | [[10, NaN, 2]]: الـ index بيتبعت كـ radix (0 ثم 1 ثم 2) |

---

## ٨. جدول التحويل الكامل

~~~js table.js
const inputs = ["42", " 42 ", "42px", "4.5kg", "1e3", "0x1F", "1_000", "", "-12.5", ".5", "12,500", "١٢٣", null, true];
const show = v => (typeof v === "string" ? JSON.stringify(v) : String(v));
for (const v of inputs) {
  console.log(show(v).padEnd(8), "Number:", String(Number(v)).padEnd(6), "parseInt:", String(parseInt(v, 10)).padEnd(5), "parseFloat:", parseFloat(v));
}
~~~

~~~text الناتج
"42"     Number: 42     parseInt: 42    parseFloat: 42
" 42 "   Number: 42     parseInt: 42    parseFloat: 42
"42px"   Number: NaN    parseInt: 42    parseFloat: 42
"4.5kg"  Number: NaN    parseInt: 4     parseFloat: 4.5
"1e3"    Number: 1000   parseInt: 1     parseFloat: 1000
"0x1F"   Number: 31     parseInt: 0     parseFloat: 0
"1_000"  Number: NaN    parseInt: 1     parseFloat: 1
""       Number: 0      parseInt: NaN   parseFloat: NaN
"-12.5"  Number: -12.5  parseInt: -12   parseFloat: -12.5
".5"     Number: 0.5    parseInt: NaN   parseFloat: 0.5
"12,500" Number: NaN    parseInt: 12    parseFloat: 12
"١٢٣"    Number: NaN    parseInt: NaN   parseFloat: NaN
null     Number: 0      parseInt: NaN   parseFloat: NaN
true     Number: 1      parseInt: NaN   parseFloat: NaN
~~~

- [[Number]] صارم: النص كله رقم أو NaN. بيفهم [["1e3"]] و [["0x1F"]] و [[".5"]]، ومبيفهمش [["1_000"]] ولا [["12,500"]] ولا الأرقام العربي.
- [[parseInt]] و [[parseFloat]] متسامحين: بيقروا الأول ويسيبوا الباقي. خطر لو انت عايز تتأكد إن النص **كله** رقم: [["12,500"]] بقت 12 من غير أي تنبيه.
- الفاضي: [[Number]] بـ 0، والاتنين التانيين بـ NaN.
- [[null]] و [[true]]: [[Number]] بيحوّلهم 0 و 1، والـ parse بيحوّلهم نص [["null"]] و [["true"]] الأول فـ NaN.

### دالة تحويل آمنة

~~~js tonum.js
function toNumber(input) {
  if (typeof input === "number") return Number.isFinite(input) ? input : null;
  if (typeof input !== "string") return null;
  const text = input.trim();
  if (text === "") return null;
  const n = Number(text);
  return Number.isFinite(n) ? n : null;
}
for (const v of ["42", " 7.5 ", "", "  ", "abc", "1e3", "Infinity", null, 12, NaN]) {
  console.log(JSON.stringify(v), "→", toNumber(v));
}
~~~

~~~text الناتج
"42" → 42
" 7.5 " → 7.5
"" → null
"  " → null
"abc" → null
"1e3" → 1000
"Infinity" → null
null → null
12 → 12
null → null
~~~

بترجّع [[null]] (مش [[NaN]] ولا 0) لأي حاجة مش رقم حقيقي، فاللي بيندهها لازم يتعامل مع الحالة دي بوضوح. و [["Infinity"]] اترفضت بـ [[Number.isFinite]]، لأن مفيش سعر أو كمية قيمتها لانهاية.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| حدود الأرقام | [[Number.MAX_VALUE]] و [[Number.MIN_VALUE]] (أصغر موجب) |
| حدود الصحيح الدقيق | [[Number.MAX_SAFE_INTEGER]] و [[Number.MIN_SAFE_INTEGER]] و [[Number.isSafeInteger]] |
| الحساب فشل؟ | [[Number.isNaN(x)]] |
| رقم حقيقي ينفع أحسب بيه؟ | [[Number.isFinite(x)]] (مش [[isFinite()]] العامة) |
| عدد صحيح؟ | [[Number.isInteger(x)]] |
| نص كله رقم | [[Number(text)]] بعد ما تتأكد إنه مش فاضي |
| نص أوله رقم ([["12px"]]) | [[parseInt(text, 10)]] أو [[parseFloat(text)]] |
| رقم بأساس تاني | [[parseInt(text, 16)]] (من 2 لـ 36) |`,
          lines: [
            R`[[Number.MAX_VALUE]] أكبر رقم ممكن (حوالي ١٫٨ × ١٠ أس ٣٠٨)، و [[Number.MIN_VALUE]] أصغر رقم **موجب** ([[5e-324]])، مش أصغر رقم سالب.`,
            R`حدود الأعداد الصحيحة اللي كل واحد فيها ليه تمثيل دقيق: من سالب ٢ أس ٥٣ ناقص ١ لحد ٢ أس ٥٣ ناقص ١.`,
            R`[[isNaN("abc")]] العامة بتحوّل النص لرقم الأول (فبيبقى NaN) وتقول [[true]]. و [[Number.isNaN("abc")]] مبتحوّلش: النص نفسه مش NaN، فـ [[false]].`,
            R`نفس القصة في الـ finite: [[isFinite("12")]] بتحوّل فتقول [[true]]، و [[Number.isFinite("12")]] بتقول [[false]] لأن [["12"]] نص مش number.`,
            R`[[2 ** 53]] عدد صحيح بس برّه المدى الآمن، فـ [[isSafeInteger]] بـ [[false]]. و [[5.0]] هي 5 بالظبط (مفيش فرق بين 5 و 5.0 في JavaScript)، فـ [[isInteger]] بـ [[true]].`,
            R`[[parseInt("ff", 16)]] بيقرا النص بأساس ١٦ فيطلع 255. [[parseInt("1e3", 10)]] بيقف عند الـ [[e]] فيطلع 1، أما [[parseFloat("1e3")]] بتفهم الأُس فتطلع 1000.`,
            R`[[Number.parseInt]] و [[parseInt]] نفس الدالة بالظبط ([[true]])، اتحطت على [[Number]] عشان تبقى مع باقي دوال الأرقام بس.`
          ],
          ref: [
            { t: "MDN: Number.MAX_VALUE", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE" },
            { t: "MDN: Number.MIN_VALUE", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE" },
            { t: "MDN: Number.MIN_SAFE_INTEGER", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER" },
            { t: "MDN: Number.POSITIVE_INFINITY", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY" },
            { t: "MDN: Number.NEGATIVE_INFINITY", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY" },
            { t: "MDN: Number.NaN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN" },
            { t: "MDN: Number.isNaN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" },
            { t: "MDN: Number.isSafeInteger", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger" },
            { t: "MDN: isNaN()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN" },
            { t: "MDN: isFinite()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite" },
            { t: "MDN: parseInt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt" },
            { t: "MDN: parseFloat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat" },
            { t: "MDN: Number.parseInt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt" },
            { t: "MDN: Number.parseFloat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat" }
          ],
          pre: [{ to: "js/number و NaN", why: R`[[Number()]] و [[parseInt]] في أبسط شكل، و [[NaN]]، وليه الأرقام الكبيرة بتتقرّب` }, "js/numeric literals و numeric separators", "js/typeof"]
        },
        {
          cmd: "Number: toFixed و toString و toLocaleString",
          title: "تعرض رقم بعدد أرقام ثابت، أو hex، أو بالجنيه والأرقام العربي إزاي؟",
          desc: R`كل رقم عليه methods بترجّع **نص** للعرض: [[toFixed(2)]] رقمين بعد العلامة، و [[toPrecision(3)]] ٣ أرقام مهمة، و [[toExponential(2)]] بالأُس، و [[toString(16)]] بأي أساس من ٢ لـ ٣٦، و [[toLocaleString("ar-EG", {...})]] حسب لغة وبلد اليوزر: فواصل آلاف وأرقام عربي وعملة ونسبة ووحدات.

و [[valueOf()]] بترجّع القيمة الخام من جوه [[new Number(5)]]، وهي اللي JavaScript بيندهها لوحده لما object يدخل في حساب. ونفس الاتنين ([[toString]] و [[valueOf]]) موجودين على [[Boolean]].

القاعدة: احسب بالأرقام، وحوّل لنص في آخر خطوة قبل العرض بس.`,
          example: R`const price = 1234.5678;
// عدد ثابت من الأرقام بعد العلامة
console.log(price.toFixed(2), price.toFixed(0));
// عدد ثابت من الأرقام المهمة، وبالأُس
console.log(price.toPrecision(3), price.toExponential(2));
// بأساس تاني
console.log((255).toString(16), (255).toString(2));
// حسب لغة اليوزر
console.log(price.toLocaleString("en-US"), price.toLocaleString("ar-EG"));
console.log((1999.5).toLocaleString("ar-EG", { style: "currency", currency: "EGP" }));
// القيمة الخام جوه أي Number
console.log(new Number(5).valueOf() + 1, true.toString());`,
          try: R`في الـ Console: [[(1.005).toFixed(2)]] و [[(1.005).toLocaleString("en-US", { maximumFractionDigits: 2 })]]: نفس الرقم ونفس عدد الأرقام، ليه النتيجة مختلفة؟ (اطبع [[(1.005).toFixed(20)]]). وبعدين [[(255).toString(2)]] و [[(0.1).toString(2)]]، و [[(0.256).toLocaleString("ar-EG", { style: "percent" })]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log((9.995).toFixed(2), (12.5).toPrecision(2), (1500).toExponential(1), (10).toString(2), (0.5).toFixed(0), (255).toString(16).toUpperCase())]].`, done: R`كتبت الستة قبل التشغيل، وفهمت ليه أول واحد [["9.99"]] مش [["10.00"]].`, sol: R`~~~js d1.js
console.log((9.995).toFixed(2), (12.5).toPrecision(2), (1500).toExponential(1), (10).toString(2), (0.5).toFixed(0), (255).toString(16).toUpperCase());
~~~

~~~text الناتج
9.99 13 1.5e+3 1010 1 FF
~~~

| النداء | الناتج | ليه |
|---|---|---|
| [[(9.995).toFixed(2)]] | [["9.99"]] | الرقم المتخزن فعلًا [[9.99499999999999921840]]، يعني أقل من النص، فالتقريب لتحت |
| [[(12.5).toPrecision(2)]] | [["13"]] | ١٢٫٥ متخزنة بالظبط، والنص بالظبط بيتقرّب لفوق |
| [[(1500).toExponential(1)]] | [["1.5e+3"]] | رقم واحد بعد العلامة في الجزء قبل الـ [[e]] |
| [[(10).toString(2)]] | [["1010"]] | ٨ + ٢ |
| [[(0.5).toFixed(0)]] | [["1"]] | نص بالظبط: [[toFixed]] بتقرّب بعيد عن الصفر |
| [[(255).toString(16).toUpperCase()]] | [["FF"]] | [[toString(16)]] بيطلّع سمول، والـ [[toUpperCase]] للنص |

الغلطة الشائعة: تفتكر [[9.995]] متخزنة ٩٫٩٩٥. اطبع [[toFixed(20)]] قبل ما تحكم على أي تقريب.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده المفروض يطبع إجمالي [[[10.5, 20.25, 3]]] برقمين عشريين، بس بيطبع [[010.5020.253.00]]:
~~~js
const items = [10.5, 20.25, 3];
let total = 0;
for (const p of items) total += p.toFixed(2);
console.log(total);
~~~`, done: R`الكود بيطبع [[33.75]] و [[total]] نوعه [[number]] لحد آخر سطر.`, sol: R`~~~text الناتج قبل التصليح
010.5020.253.00
~~~

[[toFixed]] بترجّع **نص**. أول لفة: [[0 + "10.50"]] = [["010.50"]] (الـ [[+]] مع نص بتلزق)، وكل لفة بعدها بتلزق نص تاني.

~~~js total.js
const items = [10.5, 20.25, 3];
let total = 0;
for (const p of items) total += p;
console.log(total.toFixed(2), typeof total);
~~~

~~~text الناتج
33.75 number
~~~

الحساب كله أرقام، والتنسيق مرة واحدة في الآخر. ولو الأرقام فلوس بجد، احسب بالقروش ([[Math.round(p * 100)]]) زي درس «number و NaN»، لأن جمع كسور كتير بيزحف.` },
            { lvl: 'تطبيق', t: R`**ابني:** إيصال كافيه: ٣ أصناف بكمية وسعر. اطبع كل سطر بالأرقام متظبطة تحت بعض (بـ [[toFixed]] و [[padStart]])، والإجمالي مرة بالجنيه بالأرقام العربي ومرة بالإنجليزي.`, done: R`الأعمدة تحت بعض بالظبط، والإجمالي طالع [[‏١٨٨٫٢٥ ج.م.‏]] و [[EGP 188.25]].`, sol: R`~~~js receipt.js
const items = [
  { name: "قهوة", qty: 2, price: 45.5 },
  { name: "كرواسون", qty: 3, price: 30 },
  { name: "مياه", qty: 1, price: 7.25 }
];
const egp = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "EGP" });
let total = 0;
for (const it of items) {
  const line = it.qty * it.price;
  total += line;
  console.log(it.name.padEnd(8), String(it.qty).padStart(2), "×", it.price.toFixed(2).padStart(6), "=", line.toFixed(2).padStart(7));
}
console.log("الإجمالي:", egp.format(total));
console.log("Total:", usd.format(total));
~~~

~~~text الناتج
قهوة      2 ×  45.50 =   91.00
كرواسون   3 ×  30.00 =   90.00
مياه      1 ×   7.25 =    7.25
الإجمالي: ‏١٨٨٫٢٥ ج.م.‏
Total: EGP 188.25
~~~

- [[toFixed(2)]] قبل [[padStart(6)]]: الأول ثبّت عدد الأرقام بعد العلامة، وبعدين كمّل بمسافات من الشمال لحد ٦ حروف، فالنقط بتيجي تحت بعض.
- الـ formatter اتعمل **مرة واحدة** برّه الـ loop ([[new Intl.NumberFormat]])، واستخدمناه بـ [[format]]. ده نفس اللي [[toLocaleString]] بتعمله من جوه، بس من غير ما يتبني كل مرة (التمرين اللي بعده بيقيس الفرق).
- الناتج العربي فيه علامتين اتجاه مخفيين (RLM) في الأول والآخر، ومسافة مش بتتكسر (NBSP) قبل [[ج.م.]]. لو هتقارن النص ده في test، قارن بالـ formatter نفسه مش بنص مكتوب بإيدك.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نسّق ٢٠ ألف سعر بالجنيه مرة بـ [[toLocaleString]] جوه الـ loop، ومرة بـ [[Intl.NumberFormat]] واحد معمول برّه. قيس الوقت بـ [[performance.now()]].`, done: R`عندك رقمين بالمللي ثانية من جهازك، والفرق بينهم عشرات المرات، وعارف السبب.`, sol: R`~~~js perf.js
const N = 20_000;
let t = performance.now();
for (let i = 0; i < N; i++) (i + 0.5).toLocaleString("ar-EG", { style: "currency", currency: "EGP" });
const perCall = performance.now() - t;
const fmt = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
t = performance.now();
for (let i = 0; i < N; i++) fmt.format(i + 0.5);
const reused = performance.now() - t;
console.log("toLocaleString كل مرة:", Math.round(perCall), "ms");
console.log("formatter واحد:", Math.round(reused), "ms");
console.log("الفرق: حوالي", Math.round(perCall / reused), "مرة");
~~~

~~~text الناتج (Node 24.22، ويندوز 11، تشغيل واحد)
toLocaleString كل مرة: 813 ms
formatter واحد: 18 ms
الفرق: حوالي 45 مرة
~~~

**ليه الفرق ده كله:** كل نداء لـ [[toLocaleString]] بـ locale و options بيبني formatter جديد: بيدوّر على بيانات اللغة (أرقام عربي، والفاصلة، ورمز العملة، ومكانه) في مكتبة ICU ويجهّزها. الـ formatter الواحد بيعمل الشغل ده مرة، وبعدها [[format]] بتطبّق بس.

الأرقام بتختلف من جهاز للتاني ومن تشغيل للتاني (جرّبته على ١٠٠ ألف مرتين فطلع الفرق مرة ٤٦ ومرة ٧٣)، بس الفرق دايمًا كبير. القاعدة: لو هتنسّق أكتر من كام رقم (جدول، أو loop، أو render)، اعمل الـ formatter مرة وخزّنه.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[rgbToHex(r, g, b)]] بترجّع لون CSS زي [["#ff8800"]] من ٣ أرقام، وترمي [[RangeError]] لو أي رقم مش عدد صحيح من 0 لـ 255.`, done: R`[[rgbToHex(10, 11, 12)]] بـ [["#0a0b0c"]] (مش [["#abc"]])، و [[rgbToHex(256, 0, 0)]] بترمي RangeError.`, sol: R`~~~js rgb.js
function rgbToHex(r, g, b) {
  for (const c of [r, g, b]) {
    if (!Number.isInteger(c) || c < 0 || c > 255) throw new RangeError("كل لون من 0 لـ 255: " + c);
  }
  return "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
}
console.log(rgbToHex(255, 136, 0), rgbToHex(0, 0, 0), rgbToHex(10, 11, 12));
try { rgbToHex(256, 0, 0); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
#ff8800 #000000 #0a0b0c
RangeError: كل لون من 0 لـ 255: 256
~~~

- [[c.toString(16)]]: الرقم بالـ hex، فـ 255 بتبقى [["ff"]] و 10 بتبقى [["a"]].
- [[padStart(2, "0")]]: أي لون أقل من 16 بيطلع حرف واحد، والمفروض خانتين. من غيرها [[rgbToHex(10, 11, 12)]] كانت هتبقى [["#abc"]]، وده لون تاني خالص في CSS (اختصار [[#aabbcc]]).
- الفحص الأول: [[Number.isInteger]] بترفض 12.5 و NaN و النصوص، والحدود بترفض 256 والسالب.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** object سعر عنده [[valueOf()]] بترجّع القروش و [[toString()]] بترجّع [["EGP 19.99"]]. توقّع ناتج: [[price + 1]] و [["السعر: " + price]] و [[$__bt السعر: $__{price}$__bt]] و [[String(price)]] و [[price * 2]] و [[[price].join()]].`, done: R`كتبت الستة، واتفاجئت بواحد منهم على الأقل، وتقدر تقول أنهي method اتندهت في كل واحد.`, sol: R`~~~js price-object.js
const price = {
  piasters: 1999,
  valueOf() { return this.piasters; },
  toString() { return "EGP " + (this.piasters / 100).toFixed(2); }
};
console.log(price + 1);
console.log("السعر: " + price);
console.log($__btالسعر: $__{price}$__bt);
console.log(String(price));
console.log(price * 2, price > 1500, [price].join());
~~~

~~~text الناتج
2000
السعر: 1999
السعر: EGP 19.99
EGP 19.99
3998 true EGP 19.99
~~~

| الـ expression | اتندهت | ليه |
|---|---|---|
| [[price + 1]] | [[valueOf]] | الـ [[+]] بيطلب «قيمة أولية» من غير تفضيل، والافتراضي [[valueOf]] الأول |
| [["السعر: " + price]] | [[valueOf]] | **المفاجأة:** حتى مع نص، الـ [[+]] بيسأل [[valueOf]] الأول، فطلع 1999 مش EGP |
| template literal | [[toString]] | الـ template بيطلب نص صريح |
| [[String(price)]] | [[toString]] | نفس الكلام |
| [[price * 2]] و [[price > 1500]] | [[valueOf]] | عمليات أرقام |
| [[[price].join()]] | [[toString]] | الـ join بيحوّل كل عنصر لنص |

الدرس: لو عايز النص المنسّق، اطلبه صراحة ([[String(x)]] أو template)، ومتعتمدش على [[+]].` }
          ],
          flag: "script",
          deep: {
            why: R`الرقم اللي بتحسبه غير الرقم اللي اليوزر بيشوفه: [[1999.5]] لازم يظهر [[‏١٬٩٩٩٫٥٠ ج.م.‏]] لواحد في مصر و [[EGP 1,999.50]] لواحد بيقرا إنجليزي، واللون [[16746496]] لازم يتكتب [[#ff8800]]، والـ ID الكبير بأساس ٣٦ عشان يبقى قصير في لينك. ولو عرضت بإيدك (تركّب [["ج.م"]] وتحط فواصل بنفسك) هتغلط في لغة من اللغات.`,
            how: R`[[toFixed]] و [[toPrecision]] و [[toExponential]] بيشتغلوا على **القيمة المتخزنة** بالظبط (الـ binary)، فـ [[1.005]] اللي متخزنة 1.00499... بتتقرّب لتحت. وبيقرّبوا النص بالظبط بعيد عن الصفر ([[(2.5).toFixed(0)]] = 3 و [[(-2.5).toFixed(0)]] = -3).

[[toLocaleString(locale, options)]] على الـ number بتعمل [[new Intl.NumberFormat(locale, options).format(x)]] بالظبط، والتنسيق جاي من مكتبة ICU (Node 24 جاي بـ ICU كاملة، 78.3 هنا). التقريب فيها بيبدأ من أقصر نص عشري للرقم ([["1.005"]])، عشان كده [[(1.005).toLocaleString("en-US", { maximumFractionDigits: 2 })]] بقت [["1.01"]] و [[toFixed(2)]] بقت [["1.00"]]. نفس الرقم ونتيجتين، وده اتجرّب على Node 24.22 و Chrome 157 وطلع واحد.

[[valueOf]] بيتندهلها لوحدها لما object يدخل في عملية أرقام (الـ spec بيسميها ToPrimitive): [[+]] و [[*]] و [[>]] بيسألوا [[valueOf]] الأول، والـ template و [[String()]] بيسألوا [[toString]] الأول.`,
            when: R`[[toFixed(2)]] للعرض البسيط بنقطة إنجليزي (لوج، CSV، API). [[toLocaleString]] أو [[Intl.NumberFormat]] لأي حاجة اليوزر بيشوفها: فلوس، ونسب، وأرقام كبيرة. [[toPrecision]] للقياسات العلمية لما عدد الأرقام المهمة هو اللي يفرق. [[toExponential]] للأرقام الكبيرة جدًا أو الصغيرة جدًا. [[toString(16)]] للألوان والـ bytes، و [[toString(2)]] للـ flags، و [[toString(36)]] لـ IDs قصيرة. و [[new Number]] و [[new Boolean]] متستخدمهمش خالص.`,
            mistakes: R`- تجمع ناتج [[toFixed]]: نص، فبيلزق.
- [[toFixed]] للتقريب المالي: [[(1.005).toFixed(2)]] بـ [["1.00"]]. قرّب بالقروش الأول (درس «Math: التقريب و min و max»).
- [[5.toFixed(2)]]: SyntaxError. اكتب [[(5).toFixed(2)]].
- [[toFixed(101)]] أو [[toString(37)]] أو [[toPrecision(0)]]: [[RangeError]] (الرسايل بنصها في الشرح).
- [[toLocaleString()]] من غير locale: بتاخد لغة الجهاز أو المتصفح، فالناتج بيختلف من يوزر لتاني ومن سيرفر لتاني. اكتب الـ locale دايمًا.
- تقارن نص [[toLocaleString("ar-EG")]] بنص مكتوب بإيدك في test: فيه RLM و NBSP مخفيين.
- [[new Number(0)]] في [[if]]: object، يعني truthy دايمًا. ونفس الفخ في [[new Boolean(false)]].`
          },
          teach: R`## الفكرة في سطرين

كل الـ methods دي بترجّع **نص**. بتستخدمها في آخر خطوة قبل ما الرقم يظهر، مش في النص. كل اللي هنا اتشغّل بـ Node 24.22 (ICU 78.3)، وأمثلة [[toLocaleString]] اتشغّلت في Chrome 157 كمان وطلعت نفس النصوص بالحرف.

~~~js format.js
const price = 1234.5678;
// عدد ثابت من الأرقام بعد العلامة
console.log(price.toFixed(2), price.toFixed(0));
// عدد ثابت من الأرقام المهمة، وبالأُس
console.log(price.toPrecision(3), price.toExponential(2));
// بأساس تاني
console.log((255).toString(16), (255).toString(2));
// حسب لغة اليوزر
console.log(price.toLocaleString("en-US"), price.toLocaleString("ar-EG"));
console.log((1999.5).toLocaleString("ar-EG", { style: "currency", currency: "EGP" }));
// القيمة الخام جوه أي Number
console.log(new Number(5).valueOf() + 1, true.toString());
~~~

~~~text الناتج
1234.57 1235
1.23e+3 1.23e+3
ff 11111111
1,234.568 ١٬٢٣٤٫٥٦٨
‏١٬٩٩٩٫٥٠ ج.م.‏
6 true
~~~

---

## ١. [[toFixed(d)]]: عدد ثابت من الأرقام بعد العلامة

~~~js fixed.js
const n = 1234.5678;
console.log(n.toFixed(2), n.toFixed(0), n.toFixed(), typeof n.toFixed(2));
console.log((0.5).toFixed(0), (1.5).toFixed(0), (2.5).toFixed(0), (-2.5).toFixed(0));
console.log((1.005).toFixed(2), (1.005).toFixed(20));
console.log((5).toFixed(2), (1e21).toFixed(2), (0.000001).toFixed(7));
~~~

~~~text الناتج
1234.57 1235 1235 string
1 2 3 -3
1.00 1.00499999999999989342
5.00 1e+21 0.0000010
~~~

- [[d]] من 0 لـ 100، والافتراضي 0. الناتج [[string]] دايمًا.
- النص بالظبط ([[0.5]] و [[1.5]] و [[2.5]]) بيتقرّب **بعيد عن الصفر**: 1 و 2 و 3، والسالب [[-3]]. ده غير [[Math.round(-2.5)]] اللي بتطلّع [[-2]] (الدرس الجاي).
- [[(1.005).toFixed(2)]] = [["1.00"]] مش [["1.01"]]: الـ 1.005 متخزنة [[1.00499999999999989342]]، أقل من النص. [[toFixed]] بتقرّب الرقم المتخزن بجد.
- [[(5).toFixed(2)]] بتزوّد أصفار، و [[(1e21).toFixed(2)]] بترجع للأُس لأن الرقم أكبر من ١٠ أس ٢١.

~~~text الناتج من (5).toFixed(101)
RangeError: toFixed() digits argument must be between 0 and 100
~~~

---

## ٢. [[toPrecision(p)]]: عدد ثابت من الأرقام المهمة

~~~js precision.js
const n = 1234.5678;
console.log(n.toPrecision(6), n.toPrecision(2), n.toPrecision(1), n.toPrecision());
console.log((0.000123).toPrecision(2), (5).toPrecision(3), (0.1 + 0.2).toPrecision(15));
~~~

~~~text الناتج
1234.57 1.2e+3 1e+3 1234.5678
0.00012 5.00 0.300000000000000
~~~

«الأرقام المهمة» بتتعدّ من أول رقم مش صفر، قبل العلامة وبعدها. [[toPrecision(6)]] = ٤ قبل العلامة و ٢ بعدها. ولو الرقم محتاج أرقام أكتر من [[p]] قبل العلامة، بيتكتب بالأُس: [[toPrecision(2)]] = [["1.2e+3"]]. ومن غير argument بترجّع الرقم زي [[toString]]. و [[(0.1 + 0.2).toPrecision(15)]] = [["0.300000000000000"]]: ١٥ رقم مهم بيخبّوا الـ ...04، وده اللي مكتبات كتير بتعمله عشان تعرض الكسور «نضيفة».

---

## ٣. [[toExponential(d)]]: بالأُس

~~~js expo.js
const n = 1234.5678;
console.log(n.toExponential(2), n.toExponential(), (0.00042).toExponential(1), (6.02e23).toExponential(3), (5).toExponential(2));
~~~

~~~text الناتج
1.23e+3 1.2345678e+3 4.2e-4 6.020e+23 5.00e+0
~~~

دايمًا رقم واحد قبل العلامة، و [[d]] أرقام بعدها، وبعدين [[e]] والأُس. من غير [[d]] بتكتب كل الأرقام اللي محتاجها. مفيدة للأرقام العلمية: [[6.020e+23]] (عدد أفوجادرو بـ ٤ أرقام مهمة).

---

## ٤. [[toString(radix)]]: بأي أساس

~~~js radix.js
console.log((255).toString(), (255).toString(16), (255).toString(2), (255).toString(8), (255).toString(36));
console.log((-255).toString(16), (3.75).toString(2), (0.1).toString(2));
console.log((255).toString(16).padStart(4, "0"), (5).toString(2).padStart(8, "0"), (10).toString(16).toUpperCase());
~~~

~~~text الناتج
255 ff 11111111 377 73
-ff 11.11 0.0001100110011001100110011001100110011001100110011001101
00ff 00000101 A
~~~

- الـ radix من 2 لـ 36 (برّه المدى: [[RangeError: toString() radix argument must be between 2 and 36]]).
- السالب بيتكتب بعلامة [[-]] قدامه ([["-ff"]])، مش two's complement. لو عايز شكل الـ bits، شوف [[>>> 0]] في درس «bitwise و shifts».
- الكسور شغالة: [[3.75]] = [["11.11"]] بالـ binary (٢ + ١ + نص + ربع). و [[0.1]] بتطلع طويلة جدًا، وده بالظبط ليه [[0.1 + 0.2]] مش 0.3: مفيش 0.1 بالظبط في الـ binary.
- [[padStart]] بيثبّت عدد الخانات: [["00ff"]] و [["00000101"]].

---

## ٥. [[toLocaleString(locale, options)]]: زي ما اليوزر متعوّد

~~~js locale.js
const n = 1234.5678;
console.log(n.toLocaleString("en-US"), "|", n.toLocaleString("ar-EG"), "|", n.toLocaleString("de-DE"), "|", (12345678).toLocaleString("en-IN"));
console.log(n.toLocaleString("ar-EG-u-nu-latn"), "|", n.toLocaleString("ar-EG", { useGrouping: false }));
~~~

~~~text الناتج
1,234.568 | ١٬٢٣٤٫٥٦٨ | 1.234,568 | 1,23,45,678
1,234.568 | ١٢٣٤٫٥٦٨
~~~

| الـ locale | الشكل | الملاحظة |
|---|---|---|
| [["en-US"]] | 1,234.568 | فاصلة للآلاف ونقطة للكسر، و ٣ أرقام بعد العلامة افتراضيًا |
| [["ar-EG"]] | ١٬٢٣٤٫٥٦٨ | أرقام عربي، وفاصل آلاف وعلامة عشرية عربي |
| [["de-DE"]] | 1.234,568 | بالعكس: نقطة للآلاف وفاصلة للكسر |
| [["en-IN"]] | 1,23,45,678 | الهند بتجمّع بالـ lakh: أول ٣ وبعدين كل اتنين |
| [["ar-EG-u-nu-latn"]] | 1,234.568 | عربي مصري بس بأرقام إنجليزي ([[nu]] = numbering system) |

و [[useGrouping: false]] بيشيل فاصل الآلاف.

### الفلوس

~~~js money.js
const amount = 1999.5;
console.log(amount.toLocaleString("ar-EG", { style: "currency", currency: "EGP" }));
console.log(amount.toLocaleString("en-US", { style: "currency", currency: "EGP" }));
console.log(amount.toLocaleString("en-US", { style: "currency", currency: "USD" }));
console.log(amount.toLocaleString("en-US", { style: "currency", currency: "EGP", currencyDisplay: "name" }));
~~~

~~~text الناتج
‏١٬٩٩٩٫٥٠ ج.م.‏
EGP 1,999.50
$1,999.50
1,999.50 Egyptian pounds
~~~

[[style: "currency"]] لازم معاها [[currency]] (كود العملة من ٣ حروف). ورقمين بعد العلامة بيتحطوا لوحدهم (1999.5 بقت 1,999.50). و [[currencyDisplay: "name"]] بيكتب اسم العملة.

### options تانية مفيدة

~~~js options.js
console.log((0.256).toLocaleString("ar-EG", { style: "percent" }), "|", (0.256).toLocaleString("en-US", { style: "percent", maximumFractionDigits: 1 }));
console.log((1234567).toLocaleString("en-US", { notation: "compact" }), "|", (1234567).toLocaleString("ar-EG", { notation: "compact" }));
console.log((75).toLocaleString("en-US", { style: "unit", unit: "kilogram" }), "|", (75).toLocaleString("ar-EG", { style: "unit", unit: "kilogram", unitDisplay: "long" }));
console.log((5).toLocaleString("en-US", { minimumFractionDigits: 2 }), "|", (1234.5).toLocaleString("en-US", { maximumFractionDigits: 0 }));
console.log((1.005).toFixed(2), "|", (1.005).toLocaleString("en-US", { maximumFractionDigits: 2 }));
~~~

~~~text الناتج
٢٦٪؜ | 25.6%
1.2M | ١٫٢ مليون
75 kg | ٧٥ كيلوغرام
5.00 | 1,235
1.00 | 1.01
~~~

| الـ option | بيعمل إيه |
|---|---|
| [[style: "percent"]] | بيضرب في ١٠٠ ويحط [[%]]: 0.256 بقت ٢٦٪ |
| [[notation: "compact"]] | [[1.2M]] و «١٫٢ مليون» لعدّادات المشاهدات |
| [[style: "unit"]] و [[unit]] | بيكتب الوحدة باللغة: [[75 kg]] و «٧٥ كيلوغرام» |
| [[minimumFractionDigits]] | أقل عدد أرقام بعد العلامة: 5 بقت [[5.00]] |
| [[maximumFractionDigits]] | أكتر عدد: 1234.5 بقت [[1,235]] |

**آخر سطر مهم:** [[(1.005).toFixed(2)]] = [["1.00"]] بس [[toLocaleString]] بـ [[maximumFractionDigits: 2]] = [["1.01"]]. الـ Intl بيقرّب أقصر نص عشري للرقم ([["1.005"]]) بدل القيمة الـ binary. فلو بتعرض فلوس بـ [[toFixed]] في مكان و [[Intl]] في مكان، ممكن نفس الرقم يظهر بقرش مختلف. الحل: قرّب الرقم بنفسك الأول (بالقروش)، وبعدين اعرضه بأي واحدة.

---

## ٦. [[valueOf()]] و [[new Number]]

~~~js valueof.js
const boxed = new Number(5);
console.log(typeof boxed, typeof boxed.valueOf(), boxed + 1, boxed === 5, boxed.valueOf() === 5);
console.log(new Number(0) ? "truthy" : "falsy", (5).valueOf());
const price = {
  piasters: 1999,
  valueOf() { return this.piasters; },
  toString() { return "EGP " + (this.piasters / 100).toFixed(2); }
};
console.log(price + 1, price > 1000, String(price), "السعر: " + price);
~~~

~~~text الناتج
object number 6 false true
truthy 5
2000 true EGP 19.99 السعر: 1999
~~~

- [[new Number(5)]] مش رقم: [[object]] شايل رقم جواه (اسمه wrapper). [[valueOf()]] بترجّع الرقم الخام.
- [[boxed + 1]] = 6: JavaScript ندهت [[valueOf]] لوحدها. بس [[boxed === 5]] بـ [[false]] (object مش number)، و [[new Number(0)]] truthy لأن أي object truthy.
- الـ [[(5).valueOf()]] بترجّع 5 نفسه: كل رقم عادي بيتلف في wrapper مؤقت لما تندّه عليه method، وبعدها بيترمي.
- object بتاعك ينفع يعرّف [[valueOf]] و [[toString]]: [[price + 1]] و [[price > 1000]] ندهوا [[valueOf]] (1999)، و [[String(price)]] ندهت [[toString]]. والمفاجأة: [["السعر: " + price]] ندهت [[valueOf]] برضه! الـ [[+]] بيسأل [[valueOf]] الأول حتى مع النصوص.

---

## ٧. Boolean: [[true.toString()]] و [[valueOf()]]

~~~js boolean.js
console.log(true.toString(), false.toString(), typeof true.toString());
console.log(true.valueOf(), typeof true.valueOf());
const flag = new Boolean(false);
console.log(typeof flag, flag ? "truthy" : "falsy", flag.valueOf(), flag.toString());
console.log(String(true), true + "", $__bt$__{false}$__bt);
~~~

~~~text الناتج
true false string
true boolean
object truthy false false
true true false
~~~

- [[true.toString()]] بترجّع النص [["true"]]، ودي نفس اللي [[String(true)]] والـ template بيعملوه.
- [[true.valueOf()]] بترجّع [[true]] نفسها. مفيدة بس مع الـ wrapper.
- [[new Boolean(false)]]: object، فـ **truthy** مع إن جواه [[false]]! [[valueOf()]] بترجّع الـ [[false]] الحقيقية. عشان كده متستخدمش [[new Boolean]] أبدًا. لو عايز تحوّل لـ boolean: [[Boolean(x)]] من غير [[new]] أو [[!!x]].

---

## الخلاصة

| عايز | استخدم | مثال |
|---|---|---|
| رقمين بعد العلامة | [[x.toFixed(2)]] | [["1234.57"]] |
| ٣ أرقام مهمة | [[x.toPrecision(3)]] | [["1.23e+3"]] |
| بالأُس | [[x.toExponential(2)]] | [["1.23e+3"]] |
| hex أو binary | [[x.toString(16)]] و [[padStart]] | [["00ff"]] |
| زي ما اليوزر متعوّد | [[Intl.NumberFormat]] أو [[toLocaleString]] | [[‏١٬٩٩٩٫٥٠ ج.م.‏]] |
| القيمة الخام | [[valueOf()]] | [[5]] |

- كلهم نصوص: احسب الأول، نسّق في الآخر.
- اكتب الـ locale دايمًا، واعمل formatter واحد لو هتنسّق كتير.`,
          lines: [
            R`رقم بكسور طويلة: هنعرضه بكل الطرق ونشوف الفرق.`,
            R`[[toFixed(2)]] رقمين بعد العلامة مع تقريب ([["1234.57"]])، و [[toFixed(0)]] من غير كسر ([["1235"]]). الاتنين نصوص.`,
            R`[[toPrecision(3)]] = ٣ أرقام مهمة بس، والرقم محتاج ٤ قبل العلامة، فاتكتب بالأُس [["1.23e+3"]]. و [[toExponential(2)]] بالأُس دايمًا برقمين بعد العلامة: نفس النص هنا بالصدفة.`,
            R`[[toString(16)]] بالـ hex ([["ff"]]) و [[toString(2)]] بالـ binary ([["11111111"]]). الأساس من 2 لـ 36.`,
            R`[[toLocaleString("en-US")]] فاصلة كل ٣ أرقام و ٣ أرقام بعد العلامة بحد أقصى. و [["ar-EG"]] نفس الرقم بالأرقام العربي والفواصل العربي.`,
            R`[[style: "currency"]] و [[currency: "EGP"]]: جنيه مصري، ورقمين بعد العلامة بيتحطوا لوحدهم، وفي الناتج علامات اتجاه مخفية عشان العربي يتعرض صح.`,
            R`[[new Number(5)]] object شايل الرقم، و [[valueOf()]] بترجّعه خام فـ +1 = 6. و [[true.toString()]] بترجّع النص [["true"]].`
          ],
          ref: [
            { t: "MDN: Number.prototype.toFixed", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed" },
            { t: "MDN: Number.prototype.toPrecision", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision" },
            { t: "MDN: Number.prototype.toExponential", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential" },
            { t: "MDN: Number.prototype.toString", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString" },
            { t: "MDN: Number.prototype.toLocaleString", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString" },
            { t: "MDN: Number.prototype.valueOf", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/valueOf" },
            { t: "MDN: Intl.NumberFormat() constructor (options)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat" },
            { t: "MDN: Boolean.prototype.toString", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/toString" },
            { t: "MDN: Boolean.prototype.valueOf", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/valueOf" }
          ],
          pre: ["js/Number: الثوابت والفحص والتحويل", { to: "js/number و NaN", why: R`أول مرة [[toFixed]] و [[Intl.NumberFormat]] اتشرحوا، والدرس ده بيكمّل كل الـ options` }, "js/string methods"]
        },
        {
          cmd: "Math: التقريب و min و max",
          title: "round ولا floor ولا ceil ولا trunc، وإزاي تجيب أكبر رقم وتحصر رقم بين حدين؟",
          desc: R`[[Math]] object جاهز فيه دوال حساب، مبتعملوش [[new]]. أهم عيلة فيه التقريب: [[Math.round]] لأقرب عدد صحيح، و [[Math.floor]] لتحت، و [[Math.ceil]] لفوق، و [[Math.trunc]] بتشيل الكسر بس. الأربعة واحد في الموجب، وبيختلفوا في **السالب**.

و [[Math.abs]] المسافة من الصفر، و [[Math.sign]] الإشارة (١ أو -١ أو ٠)، و [[Math.max]] و [[Math.min]] أكبر وأصغر رقم من اللي تبعتهولهم، ومنهم بتعمل clamp: [[Math.min(Math.max(v, lo), hi)]].

ومفيش دالة جاهزة بتقرّب لعدد أرقام عشرية. الدرس بيوريك ليه [[Math.round(x * 100) / 100]] بتغلط في [[1.005]]، والبديل.`,
          example: R`// التقريب: لأقرب، ولتحت، ولفوق، وشيل الكسر
console.log(Math.round(2.5), Math.floor(2.7), Math.ceil(2.1), Math.trunc(2.9));
console.log(Math.round(-2.5), Math.floor(-2.7), Math.ceil(-2.1), Math.trunc(-2.9));
// المسافة من الصفر والإشارة
console.log(Math.abs(-7.5), Math.sign(-7.5));
// أكبر وأصغر
const prices = [120, 75, 300, 45];
console.log(Math.max(...prices), Math.min(...prices));
// حصر رقم بين حدين
const percent = Math.min(Math.max(130, 0), 100);
console.log(percent);
// صفحات: ٤٣ منتج، ١٠ في الصفحة
console.log(Math.ceil(43 / 10));`,
          try: R`في الـ Console جرّب [[Math.round(-2.5)]] و [[Math.round(2.5)]]: إيه اللي مش متماثل؟ بعدين [[Math.max()]] من غير أرقام، و [[Math.max(1, NaN)]]، و [[Math.max([1, 2])]]. وآخر حاجة اعمل array فيها ٢٠٠ ألف رقم وجرّب [[Math.max(...arr)]] واقرا الـ error.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log(Math.round(-3.5), Math.floor(-3.5), Math.ceil(-3.5), Math.trunc(-3.5), Math.round(3.49999), Math.ceil(0.0001))]].`, done: R`كتبت [[-3 -4 -3 -3 3 1]] قبل التشغيل، ومعاك سبب لكل واحد.`, sol: R`~~~js d1.js
console.log(Math.round(-3.5), Math.floor(-3.5), Math.ceil(-3.5), Math.trunc(-3.5), Math.round(3.49999), Math.ceil(0.0001));
~~~

~~~text الناتج
-3 -4 -3 -3 3 1
~~~

- [[Math.round(-3.5)]] = [[-3]]: النص بيروح **لفوق** (ناحية الموجب)، و [[-3]] أكبر من [[-4]].
- [[Math.floor(-3.5)]] = [[-4]]: لتحت دايمًا، وتحت في السالب يعني أبعد عن الصفر.
- [[Math.ceil(-3.5)]] = [[-3]]: لفوق، ناحية الصفر.
- [[Math.trunc(-3.5)]] = [[-3]]: شيل الكسر وخلاص.
- [[Math.round(3.49999)]] = 3: أقل من النص.
- [[Math.ceil(0.0001)]] = 1: أي كسر بيطلع للعدد اللي بعده، حتى لو صغير جدًا.

الغلطة الشائعة: تفتكر [[floor]] و [[trunc]] نفس الحاجة. في الموجب أيوه، في السالب لأ.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[pageCount(total, perPage)]] بترجّع عدد الصفحات: ٤٣ منتج و ١٠ في الصفحة = ٥ صفحات. وترمي [[RangeError]] لو [[perPage]] صفر أو سالب أو كسر، أو [[total]] سالب.`, done: R`[[pageCount(43, 10)]] = 5 و [[pageCount(40, 10)]] = 4 و [[pageCount(0, 10)]] = 0، و [[pageCount(43, 0)]] بترمي RangeError، والاختبارات بتعدّي.`, sol: R`~~~js pages.js
function pageCount(total, perPage) {
  if (!Number.isInteger(total) || total < 0) throw new RangeError("total لازم عدد صحيح مش سالب");
  if (!Number.isInteger(perPage) || perPage <= 0) throw new RangeError("perPage لازم عدد صحيح أكبر من صفر");
  return Math.ceil(total / perPage);
}
console.log(pageCount(43, 10), pageCount(40, 10), pageCount(0, 10), pageCount(1, 10));
try { pageCount(43, 0); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
5 4 0 1
RangeError: perPage لازم عدد صحيح أكبر من صفر
~~~

- [[Math.ceil]] لأن الصفحة الأخيرة لو فيها منتج واحد لازم تتعد: ٤٣ ÷ ١٠ = ٤٫٣ ← ٥.
- [[Math.round]] كانت هتغلط: ٤١ ÷ ١٠ = ٤٫١ ← ٤، والمنتج رقم ٤١ ملوش صفحة.
- الفحص قبل القسمة: [[43 / 0]] = [[Infinity]] و [[Math.ceil(Infinity)]] = [[Infinity]] صفحة، من غير error.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لوج فيه ٢٠٠ ألف زمن request، والسطر ده بيقع: [[console.log("أبطأ request:", Math.max(...times), "ms")]]. صلّحه عشان يطبع الأبطأ والأسرع في لفة واحدة.`, done: R`بيطبع «أبطأ request: 999 ms | أسرع: 0 ms» من غير error، ولأي حجم array.`, sol: R`الـ error:

~~~text الناتج
RangeError: Maximum call stack size exceeded
~~~

[[...times]] بيحط كل عنصر argument منفصل في نداء الدالة، والـ arguments بتتحط على الـ stack. في Node 24 الحد كان بين ١٢٠ و ١٥٠ ألف (اتجرّب في الشرح)، وفي المتصفح الحد مختلف.

~~~js slowest.js
const times = Array.from({ length: 200_000 }, (_, i) => (i * 7919) % 1000);
let slowest = -Infinity, fastest = Infinity;
for (const t of times) {
  if (t > slowest) slowest = t;
  if (t < fastest) fastest = t;
}
console.log("أبطأ request:", slowest, "ms", "| أسرع:", fastest, "ms");
~~~

~~~text الناتج
أبطأ request: 999 ms | أسرع: 0 ms
~~~

loop واحدة بتمسك الاتنين، والبداية [[-Infinity]] و [[Infinity]] عشان أول رقم يكسبهم دايمًا (نفس اللي [[Math.max()]] و [[Math.min()]] بيرجّعوه من غير arguments).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** رقم عشوائي من 0 لـ 5 بطريقتين: [[Math.round(Math.random() * 5)]] و [[Math.floor(Math.random() * 6)]]. اسحب ٦٠٠ ألف مرة بكل طريقة واطبع نسبة كل رقم.`, done: R`عندك سطرين نسب: الأول فيه رقمين حوالي ١٠٪ وأربعة حوالي ٢٠٪، والتاني كله حوالي ١٦٫٧٪، وتقدر تشرح ليه.`, sol: R`~~~js fair-dice.js
const N = 600_000;
const bad = [0, 0, 0, 0, 0, 0], good = [0, 0, 0, 0, 0, 0];
for (let i = 0; i < N; i++) {
  bad[Math.round(Math.random() * 5)]++;
  good[Math.floor(Math.random() * 6)]++;
}
const pct = a => a.map(c => (c / N * 100).toFixed(1) + "%").join(" ");
console.log("Math.round(r * 5):", pct(bad));
console.log("Math.floor(r * 6):", pct(good));
~~~

~~~text الناتج (الأرقام بتتغيّر شوية كل تشغيل)
Math.round(r * 5): 10.0% 20.0% 20.0% 20.0% 20.1% 9.9%
Math.floor(r * 6): 16.7% 16.6% 16.7% 16.6% 16.7% 16.6%
~~~

**ليه [[round]] ظالمة:** [[Math.random() * 5]] بيدّي أي رقم من 0 لـ 5. [[Math.round]] بتحوّل [[0 → 0.5]] لـ 0 (نص وحدة بس)، و [[0.5 → 1.5]] لـ 1 (وحدة كاملة)، وهكذا لحد [[4.5 → 5]] لـ 5 (نص وحدة). فالطرفين نص فرصة الباقي.

**[[Math.floor(Math.random() * 6)]]:** كل رقم من 0 لـ 5 واخد وحدة كاملة. وده الشكل العام: [[Math.floor(Math.random() * n)]] من 0 لـ [[n - 1]].

ولو الرقم ليه علاقة بأمان (كود تحقق، أو token): [[Math.random]] مش مناسبة، استخدم [[crypto.getRandomValues]] أو [[crypto.randomInt]] في Node.` },
            { lvl: 'تحدي', t: R`**ابني:** [[progressBar(done, total, width = 20)]] بترجّع [["[######--------------] 30%"]]. النسبة متقرّبة ومحصورة من 0 لـ 100 حتى لو [[done]] أكبر من [[total]] أو سالب، ومن غير قسمة على صفر.`, done: R`١٢ من ١٠ بتطلع 100٪ مش 120٪، و -1 من ١٠ بتطلع 0٪، و ٥ من ٠ بتطلع 0٪، وعدد الحروف ثابت ٢٠ في كل السطور.`, sol: R`~~~js progress.js
function progressBar(done, total, width = 20) {
  const ratio = total > 0 ? done / total : 0;
  const percent = Math.min(Math.max(Math.round(ratio * 100), 0), 100);
  const filled = Math.round(percent / 100 * width);
  return "[" + "#".repeat(filled) + "-".repeat(width - filled) + "] " + percent + "%";
}
for (const [d, t] of [[0, 10], [3, 10], [7, 9], [10, 10], [12, 10], [-1, 10], [5, 0]]) console.log(String(d).padStart(2), "/", String(t).padEnd(2), progressBar(d, t));
~~~

~~~text الناتج
 0 / 10 [--------------------] 0%
 3 / 10 [######--------------] 30%
 7 / 9  [################----] 78%
10 / 10 [####################] 100%
12 / 10 [####################] 100%
-1 / 10 [--------------------] 0%
 5 / 0  [--------------------] 0%
~~~

- [[total > 0 ? done / total : 0]]: الحماية من القسمة على صفر (اللي كانت هتطلّع [[Infinity]] أو [[NaN]]).
- [[Math.min(Math.max(..., 0), 100)]]: الـ clamp. [[Math.max(x, 0)]] بتمنع تحت الصفر، و [[Math.min(..., 100)]] بتمنع فوق المية.
- [[Math.round(percent / 100 * width)]]: عدد الـ [[#]]. وطالما [[percent]] محصورة، [[filled]] مستحيل يعدّي [[width]]، فـ [[repeat]] عمرها ما هتاخد رقم سالب (اللي كان هيرمي [[RangeError: Invalid count value: -1]]).` }
          ],
          check: { lang: "js", starter: R`function pageCount(total, perPage) {
  // عدد الصفحات، و RangeError للقيم الغلط
}`, tests: R`test("٤٣ و ١٠", () => expect(pageCount(43, 10)).toBe(5));
test("بالظبط", () => expect(pageCount(40, 10)).toBe(4));
test("ولا منتج", () => expect(pageCount(0, 10)).toBe(0));
test("منتج واحد", () => expect(pageCount(1, 10)).toBe(1));
test("٤١ مش ٤", () => expect(pageCount(41, 10)).toBe(5));
test("perPage صفر", () => expect(() => pageCount(43, 0)).toThrow(/perPage/));
test("perPage كسر", () => expect(() => pageCount(43, 2.5)).toThrow(/perPage/));
test("total سالب", () => expect(() => pageCount(-1, 10)).toThrow(/total/));`, solution: R`function pageCount(total, perPage) {
  if (!Number.isInteger(total) || total < 0) throw new RangeError("total لازم عدد صحيح مش سالب");
  if (!Number.isInteger(perPage) || perPage <= 0) throw new RangeError("perPage لازم عدد صحيح أكبر من صفر");
  return Math.ceil(total / perPage);
}` },
          flag: "script",
          deep: {
            why: R`كل واجهة فيها تقريب: عدد الصفحات ([[ceil]])، والسعر بعد الخصم ([[round]])، والسن من تاريخ الميلاد ([[floor]])، ونسبة التحميل (clamp)، وأعلى وأقل سعر في فلتر ([[max]] و [[min]]). واختيار الدالة الغلط بيطلّع رقم غلط بواحد، وده بيبان بس في السالب أو في الحالة الطرفية: آخر صفحة ناقصة، أو مرتجع سعره سالب.`,
            how: R`[[Math]] مش class ومالوش [[new]] ([[new Math()]] بترمي [[TypeError: Math is not a constructor]]): هو object عادي فيه دوال وثوابت. كل الدوال بتحوّل الـ arguments لأرقام الأول، فـ [[Math.abs("-3")]] = 3 و [[Math.max(1, "7")]] = 7، وأي حاجة مش رقم بتبقى [[NaN]] وبتعدي للناتج.

[[Math.round(x)]] بترجّع أقرب عدد صحيح، ولو بالظبط في النص بتروح **ناحية الموجب**. ده مش «بعيد عن الصفر» زي [[toFixed]]، فـ [[Math.round(-2.5)]] = [[-2]] و [[(-2.5).toFixed(0)]] = [["-3"]]. [[floor]] لأكبر عدد صحيح أصغر من أو يساوي، و [[ceil]] لأصغر عدد صحيح أكبر من أو يساوي، و [[trunc]] بتشيل الكسر (ناحية الصفر).

[[Math.max(...arr)]] بتحط كل عنصر argument، والـ arguments ليها حد من الـ stack (بين ١٢٠ و ١٥٠ ألف في Node 24، اتقاس). و [[Math.max()]] من غير arguments بترجّع [[-Infinity]] (العنصر المحايد: أي رقم أكبر منه)، و [[Math.min()]] بترجّع [[Infinity]].`,
            when: R`[[ceil]] للصفحات والصناديق والأقساط اللي لازم تغطّي الكل. [[floor]] للسن والوحدات الكاملة والـ index في array ([[Math.floor(Math.random() * n)]]). [[round]] للعرض والقيم الأقرب. [[trunc]] لما عايز الجزء الصحيح من غير ما تفكر في الإشارة (زي [[parseInt]] بس على رقم). [[abs]] للفرق والمسافة، و [[sign]] للاتجاه. و [[max]] و [[min]] لعدد معروف من القيم، و loop لـ array كبيرة.`,
            mistakes: R`- [[Math.round(x * 100) / 100]] لفلوس: بتغلط في [[1.005]] (بتطلّع 1). قرّب بالقروش أو بالـ [[e]] (في الشرح).
- [[Math.floor]] للسالب وانت قصدك [[trunc]]: [[Math.floor(-3.5)]] = [[-4]].
- [[Math.max(array)]] من غير [[...]]: [[NaN]].
- [[Math.max(...hugeArray)]]: [[RangeError: Maximum call stack size exceeded]].
- [[Math.round(Math.random() * n)]] لرقم عشوائي: الطرفين نص الفرصة.
- clamp على [[NaN]]: [[Math.min(Math.max(NaN, 0), 100)]] = [[NaN]]. افحص بـ [[Number.isFinite]] الأول.
- تفتكر [[Math.round(-0.4)]] = 0: هي [[-0]]، وبتبان لو قسمت عليها ([[1 / -0]] = [[-Infinity]]).`
          },
          teach: R`## الفكرة في سطرين

[[Math]] object جاهز فيه دوال، بتندهها كده [[Math.round(x)]] من غير ما تعمل حاجة. الدرس ده عن عيلة التقريب، والإشارة، وأكبر وأصغر. كل الأمثلة اتشغّلت بـ Node 24.22، والنتايج نفسها في Chrome 157.

~~~js math.js
// التقريب: لأقرب، ولتحت، ولفوق، وشيل الكسر
console.log(Math.round(2.5), Math.floor(2.7), Math.ceil(2.1), Math.trunc(2.9));
console.log(Math.round(-2.5), Math.floor(-2.7), Math.ceil(-2.1), Math.trunc(-2.9));
// المسافة من الصفر والإشارة
console.log(Math.abs(-7.5), Math.sign(-7.5));
// أكبر وأصغر
const prices = [120, 75, 300, 45];
console.log(Math.max(...prices), Math.min(...prices));
// حصر رقم بين حدين
const percent = Math.min(Math.max(130, 0), 100);
console.log(percent);
// صفحات: ٤٣ منتج، ١٠ في الصفحة
console.log(Math.ceil(43 / 10));
~~~

~~~text الناتج
3 2 3 2
-2 -3 -2 -2
7.5 -1
300 45
100
5
~~~

---

## ١. عيلة التقريب: [[Math.round]] و [[Math.floor]] و [[Math.ceil]] و [[Math.trunc]]

~~~js rounding.js
for (const x of [2.4, 2.5, 2.6, -2.4, -2.5, -2.6, -0.4]) {
  console.log(String(x).padEnd(5), "round:", String(Math.round(x)).padEnd(3), "floor:", String(Math.floor(x)).padEnd(3), "ceil:", String(Math.ceil(x)).padEnd(3), "trunc:", Math.trunc(x), Object.is(Math.round(x), -0) ? "(round = -0)" : "");
}
~~~

~~~text الناتج
2.4   round: 2   floor: 2   ceil: 3   trunc: 2 
2.5   round: 3   floor: 2   ceil: 3   trunc: 2 
2.6   round: 3   floor: 2   ceil: 3   trunc: 2 
-2.4  round: -2  floor: -3  ceil: -2  trunc: -2 
-2.5  round: -2  floor: -3  ceil: -2  trunc: -2 
-2.6  round: -3  floor: -3  ceil: -2  trunc: -2 
-0.4  round: 0   floor: -1  ceil: 0   trunc: -0 (round = -0)
~~~

| الدالة | بتعمل إيه | [[2.5]] | [[-2.5]] |
|---|---|---|---|
| [[Math.round]] | لأقرب عدد صحيح، والنص ناحية الموجب | 3 | [[-2]] |
| [[Math.floor]] | لتحت (ناحية سالب لانهاية) | 2 | [[-3]] |
| [[Math.ceil]] | لفوق (ناحية موجب لانهاية) | 3 | [[-2]] |
| [[Math.trunc]] | شيل الكسر (ناحية الصفر) | 2 | [[-2]] |

- في الموجب [[floor]] و [[trunc]] واحد. في السالب [[floor]] بتبعد عن الصفر و [[trunc]] بتقرّب.
- [[Math.round(-2.5)]] = [[-2]] مش [[-3]]: مش متماثلة. ده مختلف عن [[toFixed]] اللي بتطلّع [["-3"]].
- [[-0.4]]: [[round]] و [[trunc]] و [[ceil]] بيطلّعوا [[-0]] (الصفر السالب). [[String]] بيكتبه 0 فالعمود الأول مخبّيه، و [[console.log]] لوحده بيكتبه [[-0]] زي عمود الـ trunc. مش هيفرق إلا لو قسمت عليه.

---

## ٢. التقريب لعدد أرقام عشرية

مفيش [[Math.round(x, 2)]]. الشكل المشهور:

~~~js decimals.js
const round2 = x => Math.round(x * 100) / 100;
console.log(round2(19.987), round2(1.005), 1.005 * 100);
const roundTo = (x, d) => Number(Math.round(Number(x + "e" + d)) + "e-" + d);
console.log(roundTo(1.005, 2), roundTo(2.675, 2), roundTo(19.987, 2));
const roundEps = x => Math.round((x + Number.EPSILON) * 100) / 100;
console.log(roundEps(1.005), roundEps(1.255), roundTo(1.255, 2), 1.255 * 100);
~~~

~~~text الناتج
19.99 1 100.49999999999999
1.01 2.68 19.99
1.01 1.26 1.26 125.49999999999999
~~~

- [[round2(19.987)]] = 19.99 تمام. بس [[round2(1.005)]] = **1** مش 1.01! لأن [[1.005 * 100]] = [[100.49999999999999]] (الـ 1.005 متخزنة أقل شوية)، فـ [[round]] نزلت.
- [[roundTo(x, d)]] بالـ [[e]]: بتبني النص [["1.005e2"]] وتحوّله رقم، وده بيدّي 100.5 بالظبط (التحويل من نص بيقرا الكتابة العشرية مش الحاصل ضرب)، وبعدين [[round]] ثم [["...e-2"]]. طلعت 1.01 و 2.68.
- [[Number.EPSILON]] قبل الضرب بيصلّح [[1.005]]، بس مش مضمون في كل الأرقام: كفاية تعرف إنه موجود.

**الحل الحقيقي للفلوس:** متقرّبش كسور خالص. خزّن قروش (عدد صحيح) من الأول، وكل ضرب في نسبة ([[qty * price * 0.14]]) قرّبه للقرش مرة واحدة بـ [[Math.round]]. ده اللي مشروع «فاتورة بالقروش» بيعمله.

### تقريب البنوك (half to even)

[[Math.round]] بتطلّع النص دايمًا لفوق، فلو بتقرّب آلاف المبالغ اللي آخرها نص، المجموع بيزيد. البنوك بتقرّب النص للرقم **الزوجي**:

~~~js bank.js
function roundHalfEven(x) {
  const f = Math.floor(x);
  const diff = x - f;
  if (diff > 0.5) return f + 1;
  if (diff < 0.5) return f;
  return f % 2 === 0 ? f : f + 1;
}
console.log([0.5, 1.5, 2.5, 3.5, 4.5].map(Math.round), [0.5, 1.5, 2.5, 3.5, 4.5].map(roundHalfEven));
const sum = a => a.reduce((s, x) => s + x, 0);
console.log(sum([0.5, 1.5, 2.5, 3.5, 4.5]), sum([0.5, 1.5, 2.5, 3.5, 4.5].map(Math.round)), sum([0.5, 1.5, 2.5, 3.5, 4.5].map(roundHalfEven)));
~~~

~~~text الناتج
[ 1, 2, 3, 4, 5 ] [ 0, 2, 2, 4, 4 ]
12.5 15 12
~~~

المجموع الحقيقي 12.5. بـ [[Math.round]] بقى 15 (كل نص طلع لفوق)، وبالـ half-even بقى 12 (نص طلع ونص نزل). ومفيش دالة جاهزة ليه في [[Math]]، بس [[Intl.NumberFormat]] عنده [[roundingMode: "halfEven"]] للعرض.

---

## ٣. [[Math.abs]] و [[Math.sign]]

~~~js abs.js
console.log(Math.abs(-7.5), Math.abs(7.5), Math.abs("-3"), Math.abs(null), Math.abs("x"), Math.abs());
console.log(Math.sign(-3), Math.sign(0), Math.sign(-0), Math.sign(42), Math.sign("-5"));
const before = 1500, after = 1350;
const change = after - before;
console.log(Math.abs(change), Math.sign(change) === -1 ? "نزل" : "طلع");
~~~

~~~text الناتج
7.5 7.5 3 0 NaN NaN
-1 0 -0 1 -1
150 نزل
~~~

- [[Math.abs(x)]]: المسافة من الصفر، من غير إشارة. بتحوّل النصوص ([["-3"]] بقت 3)، و [[null]] بقت 0، والحروف وولا حاجة [[NaN]].
- [[Math.sign(x)]]: [[1]] للموجب و [[-1]] للسالب و [[0]] للصفر (و [[-0]] للصفر السالب).
- الاستخدام في السطر الأخير: السعر اتغيّر قد إيه ([[abs]]) وفي أنهي اتجاه ([[sign]]).

---

## ٤. [[Math.max]] و [[Math.min]]

~~~js minmax.js
console.log(Math.max(3, 9, 2), Math.min(3, 9, 2));
console.log(Math.max(), Math.min());
console.log(Math.max(1, NaN, 3), Math.max(1, "7", 3), Math.max(1, undefined), Math.max(1, null));
const prices = [120, 75, 300];
console.log(Math.max(...prices), Math.max(prices), Math.max.apply(null, prices));
~~~

~~~text الناتج
9 2
-Infinity Infinity
NaN 7 NaN 1
300 NaN 300
~~~

| النداء | الناتج | ليه |
|---|---|---|
| [[Math.max()]] | [[-Infinity]] | من غير أرقام، بترجّع القيمة اللي أي رقم أكبر منها |
| [[Math.min()]] | [[Infinity]] | نفس الفكرة بالعكس |
| [[Math.max(1, NaN, 3)]] | [[NaN]] | أي [[NaN]] بيبوّظ الكل |
| [[Math.max(1, "7", 3)]] | 7 | النص اتحوّل رقم |
| [[Math.max(1, undefined)]] | [[NaN]] | [[undefined]] بتبقى [[NaN]] |
| [[Math.max(1, null)]] | 1 | [[null]] بتبقى 0 |
| [[Math.max(prices)]] | [[NaN]] | الـ array نفسها argument واحد، و [[Number([120, 75, 300])]] = NaN |
| [[Math.max(...prices)]] | 300 | الـ spread فرد العناصر arguments |

### الحد بتاع الـ spread

~~~js spread-limit.js
for (const n of [100_000, 120_000, 150_000]) {
  const big = Array.from({ length: n }, (_, i) => i);
  try {
    console.log(n, "→", Math.max(...big));
  } catch (e) {
    console.log(n, "→", e.name + ": " + e.message);
  }
}
const big = Array.from({ length: 1_000_000 }, (_, i) => i);
console.log(big.reduce((m, x) => (x > m ? x : m), -Infinity));
~~~

~~~text الناتج
100000 → 99999
120000 → 119999
150000 → RangeError: Maximum call stack size exceeded
999999
~~~

١٢٠ ألف عدّوا و ١٥٠ ألف وقعوا. نفس الحد بالظبط طلع في Chrome 157. وللأرقام الكبيرة: [[reduce]] أو [[for]] (آخر سطر، مليون عنصر).

---

## ٥. clamp: حصر رقم بين حدين

~~~js clamp.js
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
console.log(clamp(130, 0, 100), clamp(-5, 0, 100), clamp(42, 0, 100), clamp(NaN, 0, 100));
~~~

~~~text الناتج
100 0 42 NaN
~~~

[[Math.max(v, lo)]] بتمنع أقل من الحد الأدنى، و [[Math.min(..., hi)]] بتمنع أكتر من الأعلى. بس [[NaN]] بيعدّي زي ما هو، فافحصه قبلها.

---

## ٦. رقم عشوائي صحيح: [[Math.random]]

~~~js random.js
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const hits = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
for (let i = 0; i < 60_000; i++) hits[randInt(1, 6)]++;
const counts = Object.values(hits);
console.log("كل وش طلع بين", Math.min(...counts), "و", Math.max(...counts), "مرة من ٦٠ ألف");
console.log("طلع رقم برّه ١..٦؟", Object.keys(hits).length !== 6);
~~~

~~~text الناتج (بيتغيّر كل تشغيل)
كل وش طلع بين 9904 و 10081 مرة من ٦٠ ألف
طلع رقم برّه ١..٦؟ false
~~~

[[Math.random()]] رقم من 0 (ممكن) لـ 1 (مستحيل). [[* (max - min + 1)]] بيوسّعه لعدد الاحتمالات (٦)، و [[Math.floor]] بيخلّيه عدد صحيح من 0 لـ 5، و [[+ min]] بيزحلقه لـ 1..6. ٦٠ ألف رمية: كل وش حوالي ١٠ آلاف. ومش مناسبة لأي حاجة أمنية.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| عدد الصفحات أو الصناديق | [[Math.ceil(total / per)]] |
| الجزء الصحيح من غير ما تهتم بالإشارة | [[Math.trunc(x)]] |
| index عشوائي | [[Math.floor(Math.random() * n)]] |
| أقرب عدد صحيح | [[Math.round(x)]] (والنص ناحية الموجب) |
| رقمين عشريين لفلوس | احسب بالقروش، أو [[roundTo]] بالـ [[e]] |
| الفرق من غير إشارة | [[Math.abs(a - b)]] |
| أكبر وأصغر | [[Math.max(...arr)]] لحد ١٠٠ ألف، وبعدها loop |
| بين حدين | [[Math.min(Math.max(v, lo), hi)]] |`,
          lines: [
            R`[[Math.round(2.5)]] = 3 (النص لفوق)، و [[Math.floor(2.7)]] = 2 (لتحت دايمًا)، و [[Math.ceil(2.1)]] = 3 (لفوق دايمًا حتى لو الكسر صغير)، و [[Math.trunc(2.9)]] = 2 (شيل الكسر من غير تقريب).`,
            R`نفس الأربعة على أرقام سالبة: [[Math.round(-2.5)]] = [[-2]] (النص ناحية الموجب)، و [[floor]] = [[-3]] (أبعد عن الصفر)، و [[ceil]] = [[-2]]، و [[trunc]] = [[-2]]. هنا بيبان الفرق.`,
            R`[[Math.abs(-7.5)]] = 7.5: المسافة من الصفر من غير إشارة. و [[Math.sign(-7.5)]] = [[-1]]: الإشارة بس (١ أو -١ أو ٠).`,
            R`array أسعار هنجيب منها الأكبر والأصغر.`,
            R`[[Math.max]] و [[Math.min]] بياخدوا أرقام منفصلة مش array، فالـ [[...]] (spread) بيفرد العناصر: 300 و 45.`,
            R`clamp: [[Math.max(130, 0)]] = 130 (مش أقل من صفر)، وبعدين [[Math.min(130, 100)]] = 100 (مش أكتر من مية). أي نسبة بتطلع برّه المدى بترجع جوه.`,
            R`بيطبع 100: الـ 130 اتقصّت عند الحد الأعلى. لو كانت -20 كانت هتطلع 0، ولو 42 كانت هتفضل 42.`,
            R`٤٣ ÷ ١٠ = ٤٫٣، و [[Math.ceil]] بتطلّعها 5: الصفحة الخامسة فيها ٣ منتجات بس لازم تتعد.`
          ],
          ref: [
            { t: "MDN: Math", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math" },
            { t: "MDN: Math.round", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round" },
            { t: "MDN: Math.floor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor" },
            { t: "MDN: Math.ceil", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil" },
            { t: "MDN: Math.trunc", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc" },
            { t: "MDN: Math.abs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs" },
            { t: "MDN: Math.sign", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign" },
            { t: "MDN: Math.max", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max" },
            { t: "MDN: Math.min", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min" },
            { t: "MDN: Math.random", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random" }
          ],
          pre: ["js/Number: toFixed و toString و toLocaleString", { to: "js/default و rest و spread", why: R`[[Math.max(...arr)]] بتستخدم الـ spread، وحده متشرح هناك` }]
        },
        {
          cmd: "Math: أسس وجذور ولوغاريتمات ومثلثات",
          title: "الفايدة المركّبة والجذر والمسافة والزوايا: Math.pow و sqrt و log و sin و atan2",
          desc: R`الجزء التاني من [[Math]]: الأسس ([[Math.pow]] أو [[**]])، والجذور ([[Math.sqrt]] و [[Math.cbrt]] و [[Math.hypot]])، والأُسّي واللوغاريتم ([[Math.exp]] و [[Math.log]] و [[Math.log2]] و [[Math.log10]] وأخواتهم الدقيقين [[Math.expm1]] و [[Math.log1p]])، وثوابتهم ([[Math.E]] و [[Math.LN2]] و [[Math.SQRT2]]...)، والمثلثات ([[Math.sin]] و [[Math.cos]] و [[Math.atan2]]...) والـ hyperbolic.

هتحتاجهم في حاجات حقيقية: فايدة وديعة، ومسافة بين نقطتين، وعدد خانات رقم، والاتجاه من مكان لمكان. أهم قاعدة: دوال المثلثات بتاخد **radians** مش درجات.`,
          example: R`// وديعة ١٠ آلاف بفايدة ٢٠٪ في السنة لمدة ٣ سنين
console.log(10000 * Math.pow(1.2, 3), 10000 * 1.2 ** 3);
// جذر تربيعي وتكعيبي ووتر مثلث
console.log(Math.sqrt(16), Math.cbrt(27), Math.hypot(3, 4));
// كام سنة عشان الفلوس تتضاعف؟
console.log(Math.log(2) / Math.log(1.2));
// عدد خانات رقم، وعدد bits
console.log(Math.floor(Math.log10(12345)) + 1, Math.ceil(Math.log2(1000)));
// زاوية ٣٠ درجة بالـ radians
const rad = 30 * Math.PI / 180;
console.log(Math.sin(rad).toFixed(4), Math.cos(rad).toFixed(4));`,
          try: R`في الـ Console: [[Math.sin(90)]] و [[Math.sin(Math.PI / 2)]]: ليه الأولى مش 1؟ بعدين [[Math.hypot(3, 4)]] و [[Math.sqrt(3 ** 2 + 4 ** 2)]]. وآخر حاجة [[Math.log10(1000)]] و [[Math.log(1000) / Math.LN10]]: نفس السؤال، ليه الناتج مختلف في آخر رقم؟`,
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده المفروض يطبع جيب الزوايا 0 و 30 و 90 و 180 درجة (0 و 0.5 و 1 و 0)، بس بيطبع أرقام غريبة:
~~~js
const angles = [0, 30, 90, 180];
for (const a of angles) console.log(a, Math.sin(a).toFixed(4));
~~~`, done: R`بيطبع [[0.0000]] و [[0.5000]] و [[1.0000]] و [[0.0000]].`, sol: R`~~~text الناتج قبل التصليح
0 0.0000
30 -0.9880
90 0.8940
180 -0.8012
~~~

[[Math.sin(30)]] اعتبرت الـ 30 **radians** (يعني حوالي ١٧١٨ درجة). كل دوال المثلثات في JavaScript (وفي أغلب اللغات) بالـ radians.

~~~js sines.js
const toRad = deg => deg * Math.PI / 180;
const angles = [0, 30, 90, 180];
for (const a of angles) console.log(a, Math.sin(toRad(a)).toFixed(4));
~~~

~~~text الناتج
0 0.0000
30 0.5000
90 1.0000
180 0.0000
~~~

[[toRad]]: الدايرة ٣٦٠ درجة = ٢π radian، فالدرجة = π ÷ ١٨٠. و [[toFixed(4)]] خبّت إن [[Math.sin(Math.PI)]] مش صفر بالظبط (هو [[1.2246467991473532e-16]]، شوف الشرح).` },
            { lvl: 'تطبيق', t: R`**قارن:** ١٠ آلاف جنيه بفايدة ٢٠٪ في السنة لمدة ٥ سنين. احسب الرصيد كل سنة بـ ٣ طرق: فايدة بتتضاف كل سنة، وكل شهر، وطول الوقت (continuous بـ [[Math.exp]]). اطبعهم جنب بعض متقرّبين.`, done: R`آخر سطر فيه [[24883]] و [[26960]] و [[27183]]، وفاهم ليه كل واحد أكبر من اللي قبله.`, sol: R`~~~js interest.js
const principal = 10_000, rate = 0.2;
for (let year = 1; year <= 5; year++) {
  const yearly = principal * (1 + rate) ** year;
  const monthly = principal * (1 + rate / 12) ** (12 * year);
  const continuous = principal * Math.exp(rate * year);
  console.log("سنة", year, Math.round(yearly), Math.round(monthly), Math.round(continuous));
}
~~~

~~~text الناتج
سنة 1 12000 12194 12214
سنة 2 14400 14869 14918
سنة 3 17280 18131 18221
سنة 4 20736 22109 22255
سنة 5 24883 26960 27183
~~~

- سنوي: [[principal * (1 + rate) ** year]]. كل سنة الفايدة بتتحسب على الرصيد الجديد.
- شهري: نفس القانون بس الفايدة مقسومة على ١٢ ومتكررة [[12 * year]] مرة: [[(1 + 0.2 / 12) ** 60]].
- continuous: لو قسمت السنة لعدد لانهائي من الفترات، القانون بيبقى [[Math.exp(rate * year)]]، يعني e أس (النسبة × المدة). ده الحد الأقصى اللي الفايدة المركّبة ممكن توصله.

[[Math.round]] للعرض بس. لو دي فلوس بجد، كل خطوة بتتقرّب للقرش في البنك، والناتج بيختلف بقروش.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[digitCount(n)]] بتعدّ خانات رقم بـ [[Math.floor(Math.log10(x)) + 1]]. شغّلها على [[999999999999999]] (١٥ تسعة). لاقي ليه طلعت 16، وصلّحها من غير ما تحوّل لنص.`, done: R`الدالة بتطلّع 15 لـ ١٥ تسعة و 16 لـ [[1e15]] و 1 للصفر و 3 لـ [[-450]]، وكل نتيجة مطابقة لـ [[String(x).length]].`, sol: R`~~~text الناتج من النسخة البايظة
7 1
100 3
12345 5
999999999999999 16
~~~

[[Math.log10(999999999999999)]] المفروض ١٤٫٩٩٩٩٩٩٩٩٩٩٩٩٩٩٩٦... بس النتيجة اتقرّبت لـ **15** بالظبط (اتجرّب: [[node -p "Math.log10(999999999999999)"]] بيطبع 15). فـ [[floor(15) + 1]] = 16. اللوغاريتم دقيق لحد ١٦ رقم تقريبًا، والرقم ده محتاج أكتر عشان يتفرق عن ١٥.

~~~js digits.js
function digitCount(n) {
  if (!Number.isFinite(n)) throw new RangeError("رقم حقيقي بس");
  const x = Math.abs(Math.trunc(n));
  if (x === 0) return 1;
  let d = Math.floor(Math.log10(x)) + 1;
  if (10 ** (d - 1) > x) d--;
  return d;
}
for (const n of [0, 7, 10, 99, 100, 12345, -450, 3.99, 999999999999999, 1e15]) {
  console.log(String(n).padEnd(16), digitCount(n), String(Math.abs(Math.trunc(n))).length);
}
~~~

~~~text الناتج (العمود الأخير: String(x).length للمقارنة)
0                1 1
7                1 1
10               2 2
99               2 2
100              3 3
12345            5 5
-450             3 3
3.99             1 1
999999999999999  15 15
1000000000000000 16 16
~~~

- التصحيح: بعد ما نحسب [[d]]، نتأكد إن أصغر رقم بـ [[d]] خانات ([[10 ** (d - 1)]]) مش أكبر من [[x]]. لو أكبر، يبقى اللوغاريتم زوّد واحد.
- [[Math.abs(Math.trunc(n))]]: السالب والكسر بيتعدّ جزءه الصحيح بس.
- الصفر لوحده: [[Math.log10(0)]] = [[-Infinity]].

الدرس: أي نتيجة من [[log]] بتتحوّل لعدد صحيح بـ [[floor]] أو [[ceil]] لازم تتأكد منها عند الحدود (قوى ١٠ أو ٢ بالظبط).` },
            { lvl: 'تحدي', t: R`**ابني:** [[direction(dx, dy)]] بترجّع اتجاه من ٨ («شرق» و «شمال شرق» و «شمال»...) لعربية توصيل اتحركت [[dx]] شرق و [[dy]] شمال، بـ [[Math.atan2]].`, done: R`الـ ٨ اتجاهات الأساسية صح، و [[(5, 1)]] شرق، و [[(-2, -5)]] جنوب، و [[(0, 0)]] «نفس المكان».`, sol: R`~~~js compass.js
const NAMES = ["شرق", "شمال شرق", "شمال", "شمال غرب", "غرب", "جنوب غرب", "جنوب", "جنوب شرق"];
function direction(dx, dy) {
  if (dx === 0 && dy === 0) return "نفس المكان";
  const deg = Math.atan2(dy, dx) * 180 / Math.PI;
  const index = Math.round(((deg + 360) % 360) / 45) % 8;
  return NAMES[index];
}
for (const [dx, dy] of [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [5, 1], [-2, -5], [0, 0]]) {
  console.log(String([dx, dy]).padEnd(6), direction(dx, dy));
}
~~~

~~~text الناتج
1,0    شرق
1,1    شمال شرق
0,1    شمال
-1,1   شمال غرب
-1,0   غرب
-1,-1  جنوب غرب
0,-1   جنوب
1,-1   جنوب شرق
5,1    شرق
-2,-5  جنوب
0,0    نفس المكان
~~~

- [[Math.atan2(dy, dx)]] (الـ y الأول!) بترجّع الزاوية من -١٨٠ لـ ١٨٠ درجة بعد التحويل، وبتعرف الربع الصح من إشارة الاتنين. [[Math.atan(dy / dx)]] كانت هتخلط بين شمال شرق و جنوب غرب (نفس النسبة).
- [[(deg + 360) % 360]]: بيحوّل السالب لـ 0..360.
- [[/ 45]] ثم [[Math.round]]: كل اتجاه واخد ٤٥ درجة، والتقريب بيختار الأقرب. [[% 8]] عشان ٣٥٩ درجة بتتقرّب لـ ٨ اللي هي «شرق» تاني (index 0).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** [[Math.SQRT1_2]] المفروض ١ ÷ √٢. شغّل [[Math.SQRT1_2 === 1 / Math.SQRT2]] و [[Math.SQRT1_2 === Math.sqrt(0.5)]]. واحدة [[false]]: من صفحة [[Math.SQRT1_2]] على MDN، الثابت ده متعرّف إزاي بالظبط، وليه الفرق؟`, done: R`عندك الناتجين، وتعريف الثابت من الوثائق، وجملة بتشرح الفرق.`, sol: R`~~~js sqrt-half.js
console.log(Math.SQRT1_2, 1 / Math.SQRT2, Math.SQRT1_2 === 1 / Math.SQRT2);
console.log(Math.SQRT1_2 === Math.sqrt(0.5), Math.SQRT1_2 === Math.SQRT2 / 2);
console.log(Math.abs(Math.SQRT1_2 - 1 / Math.SQRT2), Number.EPSILON);
~~~

~~~text الناتج
0.7071067811865476 0.7071067811865475 false
true true
1.1102230246251565e-16 2.220446049250313e-16
~~~

**الإجابة:** MDN والـ spec بيعرّفوا [[Math.SQRT1_2]] إنه «الـ Number الأقرب للجذر التربيعي لنص». ده بيتحسب مرة بدقة كاملة ويتقرّب مرة واحدة.

[[1 / Math.SQRT2]] فيها **تقريبين**: [[Math.SQRT2]] نفسه متقرّب، والقسمة بتتقرّب تاني. فالنتيجة بعدت عن الأقرب بخطوة واحدة (الفرق [[1.11e-16]]، أصغر من [[Number.EPSILON]]). أما [[Math.sqrt(0.5)]] عملية واحدة دقيقة (الـ spec بيلزم [[sqrt]] تبقى الأقرب بالظبط)، فطلعت زي الثابت.

القاعدة: كل عملية float ممكن تضيف غلطة صغيرة، فاستخدم الثابت الجاهز بدل ما تحسبه، وقارن الكسور بفرق صغير مش بـ [[===]].` }
          ],
          flag: "script",
          deep: {
            why: R`الدوال دي بتظهر في حاجات حقيقية أكتر مما تتخيل: الفايدة والتضخم والأقساط ([[**]] و [[log]])، والمسافة بين اليوزر والفرع ([[hypot]] و [[sin]] و [[cos]])، والاتجاه والدوران في الألعاب والـ canvas والـ CSS ([[atan2]] و [[sin]] و [[cos]])، وحجم الملف بالـ KB والـ MB ([[log2]] و [[log10]])، والـ animation و الـ machine learning ([[exp]] و [[tanh]]).`,
            how: R`كل الدوال بتحوّل الـ argument لرقم وبترجّع [[number]]. [[Math.sqrt]] لازم ترجّع الأقرب بالظبط (الـ spec بيقول كده زي الجمع والضرب)، أما [[sin]] و [[log]] و [[exp]] و [[atanh]] وأغلب الباقي «implementation-approximated»: كل محرك حر يقرّب بطريقته. اتقاس فعلًا: [[Math.atanh(0.5)]] في Node 24.22 = [[0.5493061443340548]] وفي Chrome 157 = [[0.5493061443340549]]. فمتكتبش test بيقارن ناتج [[sin]] أو [[log]] بـ [[===]].

[[Math.hypot(a, b)]] بتحسب √(a² + b²) من غير ما تربّع الأرقام الكبيرة الأول، فمبتعملش overflow: [[Math.hypot(1e200, 1e200)]] اشتغلت و [[Math.sqrt(1e200 ** 2 + 1e200 ** 2)]] طلعت [[Infinity]].

[[Math.expm1(x)]] = eˣ - 1 و [[Math.log1p(x)]] = ln(1 + x)، بس دقاق لما [[x]] صغير جدًا: [[Math.exp(1e-10) - 1]] بتخسر نص دقتها لأن [[1 + 1e-10]] بيتقرّب الأول.`,
            when: R`[[**]] للأسس في الكود العادي (أوضح من [[Math.pow]] ونفس النتيجة). [[Math.sqrt]] و [[Math.hypot]] للمسافات. [[Math.log10]] لعدد الخانات والمقاييس (ديسيبل، ريختر)، و [[Math.log2]] لعدد الـ bits والمستويات في شجرة، و [[Math.log]] (الطبيعي) لحساب «كام فترة لحد ما يتضاعف». [[Math.atan2(dy, dx)]] لأي زاوية من نقطتين. والـ hyperbolic في الرياضيات والـ ML ([[tanh]] كـ activation، و [[cosh]] لشكل السلسلة المتعلقة).`,
            mistakes: R`- درجات بدل radians: [[Math.sin(90)]] = 0.894.
- [[Math.atan(dy / dx)]] بدل [[Math.atan2(dy, dx)]]: بتغلط في نص الاتجاهات، وبتقسم على صفر لما [[dx = 0]].
- [[Math.pow(-8, 1 / 3)]] = [[NaN]]: الأُس الكسري على سالب. استخدم [[Math.cbrt(-8)]] = -2.
- [[Math.sin(Math.PI) === 0]] بـ [[false]]: الناتج [[1.2246467991473532e-16]] لأن [[Math.PI]] نفسه متقرّب.
- [[floor(log10(x)) + 1]] من غير تصحيح عند الحدود (تمرين digitCount).
- [[Math.log(0)]] = [[-Infinity]] و [[Math.log(-1)]] = [[NaN]]: افحص قبل ما تحسب لوغاريتم قيمة جاية من يوزر.`
          },
          teach: R`## الفكرة في سطرين

هنا باقي [[Math]]: الأسس والجذور، والأُسّي واللوغاريتم وثوابتهم، والمثلثات. كل جزء بمثال من الحياة. الأمثلة اتشغّلت بـ Node 24.22، وجدول الـ hyperbolic اتشغّل في Chrome 157 كمان (فيه فرق في رقم، هتشوفه).

~~~js power.js
// وديعة ١٠ آلاف بفايدة ٢٠٪ في السنة لمدة ٣ سنين
console.log(10000 * Math.pow(1.2, 3), 10000 * 1.2 ** 3);
// جذر تربيعي وتكعيبي ووتر مثلث
console.log(Math.sqrt(16), Math.cbrt(27), Math.hypot(3, 4));
// كام سنة عشان الفلوس تتضاعف؟
console.log(Math.log(2) / Math.log(1.2));
// عدد خانات رقم، وعدد bits
console.log(Math.floor(Math.log10(12345)) + 1, Math.ceil(Math.log2(1000)));
// زاوية ٣٠ درجة بالـ radians
const rad = 30 * Math.PI / 180;
console.log(Math.sin(rad).toFixed(4), Math.cos(rad).toFixed(4));
~~~

~~~text الناتج
17279.999999999996 17279.999999999996
4 3 5
3.8017840169239308
5 10
0.5000 0.8660
~~~

---

## ١. الأسس: [[Math.pow]] و [[**]]

~~~js pow.js
console.log(Math.pow(2, 10), 2 ** 10, Math.pow(4, 0.5), Math.pow(2, -2));
console.log(Math.pow(-8, 1 / 3), Math.pow(0, 0), Math.pow(NaN, 0), Math.pow(1, Infinity));
console.log(10000 * 1.2 ** 3, Math.round(10000 * 1.2 ** 3));
~~~

~~~text الناتج
1024 1024 2 0.25
NaN 1 1 NaN
17279.999999999996 17280
~~~

| النداء | الناتج | الملاحظة |
|---|---|---|
| [[Math.pow(2, 10)]] | 1024 | نفس [[2 ** 10]] بالظبط |
| [[Math.pow(4, 0.5)]] | 2 | أُس نص = جذر تربيعي |
| [[Math.pow(2, -2)]] | 0.25 | أُس سالب = واحد على |
| [[Math.pow(-8, 1 / 3)]] | [[NaN]] | أُس كسري على سالب، استخدم [[Math.cbrt]] |
| [[Math.pow(0, 0)]] | 1 | متعرّفة كده في الـ spec |
| [[Math.pow(NaN, 0)]] | 1 | أي حاجة أس صفر = 1، حتى NaN |
| [[Math.pow(1, Infinity)]] | [[NaN]] | مختلفة عن الرياضيات وعن لغات تانية |

السطر الأخير: [[10000 * 1.2 ** 3]] = [[17279.999999999996]] مش 17280، لأن 1.2 مش متخزنة بالظبط. [[Math.round]] للعرض.

---

## ٢. الجذور: [[Math.sqrt]] و [[Math.cbrt]] و [[Math.hypot]]

~~~js roots.js
console.log(Math.sqrt(16), Math.sqrt(2), Math.sqrt(-4), Math.sqrt(-0));
console.log(Math.cbrt(27), Math.cbrt(-8), Math.cbrt(2));
console.log(Math.hypot(3, 4), Math.hypot(1, 2, 2), Math.hypot(), Math.hypot(-3));
console.log(Math.hypot(1e200, 1e200), Math.sqrt(1e200 ** 2 + 1e200 ** 2));
~~~

~~~text الناتج
4 1.4142135623730951 NaN -0
3 -2 1.2599210498948732
5 3 0 3
1.414213562373095e+200 Infinity
~~~

- [[Math.sqrt(x)]]: الجذر التربيعي. السالب [[NaN]]، و [[Math.sqrt(-0)]] = [[-0]].
- [[Math.cbrt(x)]]: الجذر التكعيبي، وبيشتغل مع السالب ([[-8]] ← [[-2]]).
- [[Math.hypot(a, b, ...)]]: √(a² + b² + ...)، يعني الوتر أو المسافة. بتاخد أي عدد أبعاد ([[hypot(1, 2, 2)]] = 3 في ٣ أبعاد)، ومن غير arguments 0.
- السطر الأخير ليه هي موجودة: [[1e200 ** 2]] = [[Infinity]] (أكبر من [[MAX_VALUE]])، فالجذر بتاعه [[Infinity]]. [[hypot]] بتتجنب ده من جوه.

---

## ٣. [[Math.exp]] و [[Math.expm1]] و الثابت [[Math.E]]

~~~js exp.js
console.log(Math.E, Math.exp(0), Math.exp(1), Math.exp(2));
console.log(10000 * Math.exp(0.2 * 3));
console.log(Math.expm1(1e-10), Math.exp(1e-10) - 1);
~~~

~~~text الناتج
2.718281828459045 1 2.718281828459045 7.38905609893065
18221.188003905092
1.00000000005e-10 1.000000082740371e-10
~~~

- [[Math.E]] ≈ 2.718: أساس النمو الطبيعي (e).
- [[Math.exp(x)]] = e أس x. [[10000 * Math.exp(0.2 * 3)]] = رصيد وديعة بفايدة ٢٠٪ «مستمرة» ٣ سنين: 18221 (أكبر من 17280 السنوية).
- [[Math.expm1(x)]] = eˣ - 1 بدقة كاملة. [[Math.exp(1e-10) - 1]] طلعت [[1.000000082740371e-10]]: الأرقام بعد السابع غلط. [[expm1]] طلعت [[1.00000000005e-10]] صح.

---

## ٤. اللوغاريتمات: [[Math.log]] و [[Math.log2]] و [[Math.log10]] و [[Math.log1p]]

اللوغاريتم هو عكس الأُس: «أرفع الأساس لكام عشان أوصل للرقم ده؟»

~~~js logs.js
console.log(Math.log(1), Math.log(Math.E), Math.log(10), Math.log(0), Math.log(-1));
console.log(Math.log2(8), Math.log2(1024), Math.log2(1000));
console.log(Math.log10(1000), Math.log10(12345), Math.log10(0.001));
console.log(Math.log1p(1e-10), Math.log(1 + 1e-10));
console.log(Math.log(1000) / Math.LN10, Math.log10(1000));
~~~

~~~text الناتج
0 1 2.302585092994046 -Infinity NaN
3 10 9.965784284662087
3 4.091491094267951 -3
9.999999999500001e-11 1.000000082690371e-10
2.9999999999999996 3
~~~

| الدالة | الأساس | سؤالها | استخدام حقيقي |
|---|---|---|---|
| [[Math.log(x)]] | e | e أس كام = x؟ | كام سنة لحد ما الفلوس تتضاعف: [[log(2) / log(1.2)]] = ٣٫٨ |
| [[Math.log2(x)]] | 2 | ٢ أس كام = x؟ | عدد الـ bits: [[Math.ceil(Math.log2(1000))]] = 10 |
| [[Math.log10(x)]] | 10 | ١٠ أس كام = x؟ | عدد الخانات: [[floor(log10(12345)) + 1]] = 5 |
| [[Math.log1p(x)]] | e | ln(1 + x) بدقة | فايدة صغيرة جدًا، وإحصاء |

- [[Math.log(0)]] = [[-Infinity]] و [[Math.log(-1)]] = [[NaN]].
- [[Math.log1p(1e-10)]] صح و [[Math.log(1 + 1e-10)]] غلط في الأرقام بعد السابع: نفس حكاية [[expm1]].
- السطر الأخير: [[Math.log(1000) / Math.LN10]] = [[2.9999999999999996]] بس [[Math.log10(1000)]] = 3 بالظبط. التحويل من أساس لأساس فيه عمليتين، وكل عملية بتقرّب. استخدم الدالة الجاهزة لأساسها.

---

## ٥. الثوابت

~~~js consts.js
console.log(Math.PI, Math.E);
console.log(Math.LN2, Math.LN10, Math.LOG2E, Math.LOG10E);
console.log(Math.SQRT2, Math.SQRT1_2);
console.log(Math.LN2 === Math.log(2), Math.LOG2E === 1 / Math.LN2, Math.SQRT1_2 === 1 / Math.SQRT2, Math.SQRT1_2 === Math.sqrt(0.5));
console.log(Math.log(8) * Math.LOG2E, Math.log(1000) * Math.LOG10E);
~~~

~~~text الناتج
3.141592653589793 2.718281828459045
0.6931471805599453 2.302585092994046 1.4426950408889634 0.4342944819032518
1.4142135623730951 0.7071067811865476
true true false true
2.9999999999999996 3
~~~

| الثابت | يساوي | فايدته |
|---|---|---|
| [[Math.PI]] | π ≈ 3.14159 | الدوائر والزوايا |
| [[Math.E]] | e ≈ 2.71828 | النمو الطبيعي |
| [[Math.LN2]] | ln 2 ≈ 0.693 | [[Math.log(x) / Math.LN2]] = log2 في محركات قديمة |
| [[Math.LN10]] | ln 10 ≈ 2.303 | التحويل من log طبيعي لـ log10 |
| [[Math.LOG2E]] | log₂ e ≈ 1.443 | [[Math.log(x) * Math.LOG2E]] = log2 |
| [[Math.LOG10E]] | log₁₀ e ≈ 0.434 | [[Math.log(x) * Math.LOG10E]] = log10 |
| [[Math.SQRT2]] | √٢ ≈ 1.414 | قطر مربع ضلعه ١ |
| [[Math.SQRT1_2]] | √½ ≈ 0.707 | جيب وجيب تمام ٤٥ درجة |

السطر قبل الأخير: [[Math.SQRT1_2 === 1 / Math.SQRT2]] بـ [[false]]! الثابت هو أقرب رقم لـ √½، والقسمة فيها تقريبين. (تمرين «دوّر بنفسك» بيفكها.) وآخر سطر: [[Math.log(8) * Math.LOG2E]] = [[2.9999999999999996]]، وده ليه [[Math.log2]] اتضافت.

---

## ٦. المثلثات: [[Math.sin]] و [[Math.cos]] و [[Math.tan]]

~~~js trig.js
const toRad = deg => deg * Math.PI / 180;
console.log(Math.sin(toRad(30)), Math.cos(toRad(60)), Math.tan(toRad(45)));
console.log(Math.sin(Math.PI), Math.cos(Math.PI / 2), Math.sin(Math.PI / 2));
console.log(Math.sin(90), Math.sin(toRad(90)));
~~~

~~~text الناتج
0.49999999999999994 0.5000000000000001 0.9999999999999999
1.2246467991473532e-16 6.123233995736766e-17 1
0.8939966636005579 1
~~~

- الـ argument بالـ **radians**: الدايرة = ٢π. التحويل: [[deg * Math.PI / 180]].
- [[sin(30°)]] = [[0.49999999999999994]] مش 0.5، و [[sin(π)]] = [[1.22e-16]] مش صفر: [[Math.PI]] نفسه متقرّب، فالغلطة الصغيرة بتظهر. قرّب للعرض.
- آخر سطر: [[Math.sin(90)]] = 0.894 لأنها ٩٠ radian. أشهر غلطة في الباب.

---

## ٧. العكسية: [[Math.asin]] و [[Math.acos]] و [[Math.atan]] و [[Math.atan2]]

بتاخد نسبة وترجّع زاوية (بالـ radians):

~~~js inverse.js
const toDeg = rad => rad * 180 / Math.PI;
console.log(toDeg(Math.asin(0.5)), toDeg(Math.acos(0.5)), toDeg(Math.atan(1)));
console.log(Math.asin(2), Math.acos(-1));
console.log(toDeg(Math.atan2(1, 1)), toDeg(Math.atan2(1, -1)), toDeg(Math.atan(1 / -1)), toDeg(Math.atan2(-1, -1)));
console.log(Math.atan2(0, 0), toDeg(Math.atan2(5, 0)));
~~~

~~~text الناتج
30.000000000000004 60.00000000000001 45
NaN 3.141592653589793
45 135 -45 -135
0 90
~~~

- [[Math.asin(0.5)]] = ٣٠ درجة، و [[Math.acos(0.5)]] = ٦٠، و [[Math.atan(1)]] = ٤٥. و [[asin]] و [[acos]] بياخدوا من -1 لـ 1 بس، غير كده [[NaN]].
- **[[Math.atan2(y, x)]]**: الزاوية من النقطة (0, 0) لنقطة (x, y). الـ **y الأول**. بتعرف الربع من الإشارتين: (1, 1) = ٤٥، و (-1, 1) = ١٣٥. بس [[Math.atan(1 / -1)]] = -٤٥ (غلط، لأنها شافت النسبة بس). ومبتقسمش، فـ [[atan2(5, 0)]] = ٩٠ من غير مشكلة.

---

## ٨. الـ hyperbolic: [[Math.sinh]] و [[Math.cosh]] و [[Math.tanh]] وعكسهم

~~~js hyper.js
console.log(Math.sinh(1), Math.cosh(1), Math.tanh(1));
console.log(Math.tanh(10), Math.tanh(-10), Math.tanh(0.5));
console.log(Math.asinh(1), Math.acosh(1), Math.acosh(2), Math.atanh(0.5));
console.log(Math.atanh(1), Math.acosh(0.5));
~~~

~~~text الناتج (Node 24.22)
1.1752011936438014 1.5430806348152437 0.7615941559557649
0.9999999958776927 -0.9999999958776927 0.46211715726000974
0.881373587019543 0 1.3169578969248166 0.5493061443340548
Infinity NaN
~~~

~~~text نفس الملف في Chrome 157
1.1752011936438014 1.5430806348152437 0.7615941559557649
0.9999999958776927 -0.9999999958776927 0.46211715726000974
0.881373587019543 0 1.3169578969248166 0.5493061443340549
Infinity NaN
~~~

| الدالة | المعادلة | استخدام |
|---|---|---|
| [[Math.sinh(x)]] | (eˣ - e⁻ˣ) ÷ ٢ | الفيزيا والهندسة |
| [[Math.cosh(x)]] | (eˣ + e⁻ˣ) ÷ ٢ | شكل سلك متعلّق بين عمودين |
| [[Math.tanh(x)]] | sinh ÷ cosh، بين -1 و 1 | activation في الشبكات العصبية، وتنعيم قيمة |
| [[Math.asinh(x)]] | عكس sinh | |
| [[Math.acosh(x)]] | عكس cosh، من 1 وطالع | [[acosh(0.5)]] = [[NaN]] |
| [[Math.atanh(x)]] | عكس tanh، بين -1 و 1 | [[atanh(1)]] = [[Infinity]] |

**قارن آخر رقم في السطر التالت:** [[Math.atanh(0.5)]] طلعت [[0.5493061443340548]] في Node و [[0.5493061443340549]] في Chrome. الـ spec بيسمح لكل محرك يقرّب الدوال دي بطريقته، فمتكتبش test بيقارنها بـ [[===]].

---

## ٩. مثال حقيقي: المسافة بين محل وزبون على الخريطة

الأرض كورة، فالمسافة بين خطين عرض وطول مش [[hypot]]. القانون المشهور اسمه haversine، وبيستخدم [[sin]] و [[cos]] و [[sqrt]] و [[atan2]] مع بعض:

~~~js distance.js
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const store = { lat: 30.05, lon: 31.24 };
const customer = { lat: 30.10, lon: 31.33 };
console.log(distanceKm(store.lat, store.lon, customer.lat, customer.lon).toFixed(2), "كم");
console.log(distanceKm(0, 0, 0, 1).toFixed(2), "كم لدرجة طول على خط الاستوا");
~~~

~~~text الناتج
10.29 كم
111.19 كم لدرجة طول على خط الاستوا
~~~

[[R = 6371]] نص قطر الأرض بالكيلومتر. و [[a]] بيحسب «نص الوتر» بين النقطتين على الكورة، و [[2 * atan2(√a, √(1 - a))]] بيحوّله لزاوية من مركز الأرض، وضربها في [[R]] بيدّي المسافة. وآخر سطر للتأكد: درجة طول واحدة على خط الاستوا ≈ ١١١ كم، وده الرقم المعروف.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| أُس | [[x ** n]] (أو [[Math.pow]]) |
| جذر | [[Math.sqrt]] و [[Math.cbrt]] (للسالب) |
| مسافة بين نقطتين على شاشة | [[Math.hypot(dx, dy)]] |
| مسافة على الخريطة | haversine (القسم ٩) |
| كام فترة لحد ما يتضاعف | [[Math.log(2) / Math.log(1 + r)]] |
| bits أو خانات | [[Math.log2]] و [[Math.log10]] مع تصحيح عند الحدود |
| زاوية من نقطتين | [[Math.atan2(dy, dx)]] |
| درجات لـ radians | [[deg * Math.PI / 180]] |`,
          lines: [
            R`[[Math.pow(1.2, 3)]] و [[1.2 ** 3]] نفس الحاجة: ١٫٢ × ١٫٢ × ١٫٢. الرصيد [[17279.999999999996]] مش 17280 لأن 1.2 مش متخزنة بالظبط.`,
            R`[[Math.sqrt(16)]] = 4، و [[Math.cbrt(27)]] = 3 (جذر تكعيبي)، و [[Math.hypot(3, 4)]] = 5: √(٩ + ١٦)، وتر المثلث أو المسافة بين نقطتين.`,
            R`اللوغاريتم بيجاوب «كام مرة أضرب في 1.2 عشان أوصل لـ 2؟»: [[Math.log(2) / Math.log(1.2)]] = ٣٫٨ سنة، يعني الفلوس بتتضاعف في الرابعة.`,
            R`[[Math.log10(12345)]] = ٤٫٠٩، و [[floor]] + 1 = 5 خانات. و [[Math.log2(1000)]] = ٩٫٩٧، و [[ceil]] = 10 bits عشان تخزّن أي رقم لحد ١٠٠٠.`,
            R`دوال المثلثات بالـ radians، فالـ ٣٠ درجة بتتضرب في π ÷ ١٨٠.`,
            R`[[sin(30°)]] = ٠٫٥ و [[cos(30°)]] = ٠٫٨٦٦، و [[toFixed(4)]] بيخبّي الكسر الصغير اللي في آخر الرقم.`
          ],
          ref: [
            { t: "MDN: Math.pow", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow" },
            { t: "MDN: Math.sqrt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt" },
            { t: "MDN: Math.cbrt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt" },
            { t: "MDN: Math.hypot", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot" },
            { t: "MDN: Math.exp", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/exp" },
            { t: "MDN: Math.expm1", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1" },
            { t: "MDN: Math.log", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log" },
            { t: "MDN: Math.log2", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2" },
            { t: "MDN: Math.log10", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10" },
            { t: "MDN: Math.log1p", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p" },
            { t: "MDN: Math.E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E" },
            { t: "MDN: Math.LN2", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN2" },
            { t: "MDN: Math.LN10", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN10" },
            { t: "MDN: Math.LOG2E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG2E" },
            { t: "MDN: Math.LOG10E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG10E" },
            { t: "MDN: Math.SQRT2", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2" },
            { t: "MDN: Math.SQRT1_2", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT1_2" },
            { t: "MDN: Math.sin", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin" },
            { t: "MDN: Math.cos", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos" },
            { t: "MDN: Math.tan", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tan" },
            { t: "MDN: Math.asin", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asin" },
            { t: "MDN: Math.acos", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acos" },
            { t: "MDN: Math.atan", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan" },
            { t: "MDN: Math.atan2", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2" },
            { t: "MDN: Math.sinh", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh" },
            { t: "MDN: Math.cosh", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh" },
            { t: "MDN: Math.tanh", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh" },
            { t: "MDN: Math.asinh", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh" },
            { t: "MDN: Math.acosh", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh" },
            { t: "MDN: Math.atanh", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh" }
          ],
          pre: ["js/Math: التقريب و min و max", "js/operator precedence و grouping و comma"]
        },
        {
          cmd: "Math.sumPrecise و fround و f16round",
          title: "ليه جمع مليون رقم بيزحف، و Math.sumPrecise بتحلها إزاي، و float32 و float16 يعني إيه؟",
          desc: R`كل جمع float بيتقرّب، ولما تجمع آلاف الأرقام الغلطات الصغيرة بتتراكم: مليون مرة [[0.1]] بـ [[reduce]] طلعت [[100000.00000133288]]. [[Math.sumPrecise(list)]] بتجمع القايمة كلها بدقة كاملة وتقرّب **مرة واحدة** في الآخر، فطلعت [[100000]]. موجودة في Chrome 157، ومش موجودة في Node 24 (فبنكتب بديل).

و [[Math.fround(x)]] بترجّع أقرب رقم لـ [[x]] ينفع يتخزن في ٣٢ bit (float32، اللي بتستخدمه [[Float32Array]] و WebGL)، و [[Math.f16round(x)]] أقرب رقم في ١٦ bit (float16، [[Float16Array]] والـ GPU والـ AI). بيوروك القيمة اللي هتتخزن فعلًا قبل ما تتفاجئ بيها.`,
          example: R`// جمع عادي: الغلطة بتتجمّع مع كل خطوة
const tenths = Array(10).fill(0.1);
console.log(tenths.reduce((a, b) => a + b, 0));
// Math.sumPrecise: جمع دقيق مرة واحدة (Chrome 157، مش في Node 24)
if (typeof Math.sumPrecise === "function") console.log(Math.sumPrecise(tenths));
// رقم متخزن بـ 32 bit و 16 bit بدل 64
console.log(Math.fround(0.1), Math.f16round(0.1));
console.log(Math.fround(16777217), Math.f16round(2049));`,
          try: R`افتح Console في Chrome واكتب [[Math.sumPrecise([1e20, 0.1, -1e20])]] وقارنها بـ [[1e20 + 0.1 - 1e20]]. بعدين جرّب نفس السطر في [[node -e]]: إيه الرسالة؟ وآخر حاجة [[Math.fround(16777217)]] و [[Math.f16round(2049)]]: ليه الرقم اتغيّر؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log(Math.fround(0.5) === 0.5, Math.fround(0.1) === 0.1, Math.fround(1 / 3), Math.f16round(100.7), Math.fround(NaN), Math.f16round(-0))]].`, done: R`كتبت الستة قبل التشغيل، وتقدر تقول ليه [[0.5]] نجت و [[0.1]] لأ.`, sol: R`~~~js d1.js
console.log(Math.fround(0.5) === 0.5, Math.fround(0.1) === 0.1, Math.fround(1 / 3), Math.f16round(100.7), Math.fround(NaN), Math.f16round(-0));
~~~

~~~text الناتج
true false 0.3333333432674408 100.6875 NaN -0
~~~

- [[0.5]] = ١ ÷ ٢، كسر مقامه قوة من ٢، فليه تمثيل **بالظبط** في أي عدد bits: [[true]].
- [[0.1]] مالهاش تمثيل بالظبط، والـ ٣٢ bit بيقرّبها أكتر من الـ ٦٤: [[false]].
- [[1 / 3]] في float32 = [[0.3333333432674408]]: ٧ أرقام صح تقريبًا بدل ١٦.
- [[Math.f16round(100.7)]] = [[100.6875]]: الـ ١٦ bit فيه ١٠ bits بس للكسر، فبين ٦٤ و ١٢٨ أصغر خطوة [[0.0625]].
- [[NaN]] و [[-0]] بيعدّوا زي ما هم.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** اكتب جمع Kahan وجمع Neumaier، وقارنهم بـ [[reduce]] على ٣ قوايم: مليون مرة 0.1، و [[[1e20, 0.1, -1e20]]]، و [[[0.1, 0.2, 0.3]]]. وقيس الوقت لمليون رقم.`, done: R`عندك جدول ٣ × ٣ نتايج، و Neumaier بس طلّع 0.1 في القايمة التانية، ورقم بالمللي ثانية لكل طريقة.`, sol: R`~~~js compare-sums.js
function kahan(xs) {
  let sum = 0, c = 0;
  for (const x of xs) { const y = x - c; const t = sum + y; c = (t - sum) - y; sum = t; }
  return sum;
}
function neumaier(xs) {
  let sum = 0, c = 0;
  for (const x of xs) {
    const t = sum + x;
    c += Math.abs(sum) >= Math.abs(x) ? (sum - t) + x : (x - t) + sum;
    sum = t;
  }
  return sum + c;
}
const naive = xs => xs.reduce((a, b) => a + b, 0);
const cases = { "مليون 0.1": Array(1_000_000).fill(0.1), "[1e20, 0.1, -1e20]": [1e20, 0.1, -1e20], "[0.1, 0.2, 0.3]": [0.1, 0.2, 0.3] };
for (const [name, xs] of Object.entries(cases)) {
  console.log(name.padEnd(20), "reduce:", naive(xs), "| kahan:", kahan(xs), "| neumaier:", neumaier(xs));
}
const big = Array(1_000_000).fill(0.1);
for (const [name, fn] of [["reduce", naive], ["kahan", kahan], ["neumaier", neumaier]]) {
  const t = performance.now();
  for (let i = 0; i < 20; i++) fn(big);
  console.log(name.padEnd(9), ((performance.now() - t) / 20).toFixed(2), "ms لمليون رقم");
}
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
مليون 0.1            reduce: 100000.00000133288 | kahan: 100000 | neumaier: 100000
[1e20, 0.1, -1e20]   reduce: 0 | kahan: 0 | neumaier: 0.1
[0.1, 0.2, 0.3]      reduce: 0.6000000000000001 | kahan: 0.6 | neumaier: 0.6
reduce    9.38 ms لمليون رقم
kahan     9.07 ms لمليون رقم
neumaier  9.65 ms لمليون رقم
~~~

- **Kahan**: بيحتفظ بـ [[c]] = الحتة اللي ضاعت في آخر جمع، ويطرحها من الرقم الجاي. صلّح المليون والـ [[0.6]]، بس في [[[1e20, 0.1, -1e20]]] طلّع 0: لما الرقم الجاي ([[-1e20]]) أكبر بكتير من المجموع، التعويض نفسه ضاع.
- **Neumaier**: نفس الفكرة، بس بيحسب الحتة الضايعة من الأكبر في الاتنين ([[Math.abs(sum) >= Math.abs(x)]])، وبيضيفها في الآخر. طلّع 0.1 صح.
- **الوقت:** التلاتة قريبين جدًا هنا (حوالي ٩ مللي لمليون رقم)، لأن الوقت رايح في قراية الـ array نفسها. الدقة ببلاش تقريبًا.

و [[Math.sumPrecise]] في Chrome أدق من الاتنين: بتجمع بدقة كاملة مهما كانت الأرقام.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[fitsFloat32(x)]] و [[fitsFloat16(x)]]: [[true]] لو الرقم هيتخزن في [[Float32Array]] أو [[Float16Array]] من غير ما يتغيّر.`, done: R`[[16777216]] بيعدّي float32 و [[16777217]] لأ، و [[65504]] بيعدّي float16 و [[70000]] لأ، و [[NaN]] بيعدّي الاتنين، والاختبارات بتعدّي.`, sol: R`~~~js fits.js
const fitsFloat32 = x => Number.isNaN(x) || Math.fround(x) === x;
const fitsFloat16 = x => Number.isNaN(x) || Math.f16round(x) === x;
for (const x of [0.5, 0.1, 16777216, 16777217, 2049, 65504, 70000, NaN, 1.25]) {
  console.log(String(x).padEnd(9), "float32:", String(fitsFloat32(x)).padEnd(5), "float16:", fitsFloat16(x));
}
~~~

~~~text الناتج
0.5       float32: true  float16: true
0.1       float32: false float16: false
16777216  float32: true  float16: false
16777217  float32: false float16: false
2049      float32: true  float16: false
65504     float32: true  float16: true
70000     float32: true  float16: false
NaN       float32: true  float16: true
1.25      float32: true  float16: true
~~~

- [[Math.fround(x) === x]]: لو التقريب لـ ٣٢ bit مغيّرش الرقم، يبقى هيتخزن زي ما هو.
- [[Number.isNaN(x) ||]]: لأن [[NaN === NaN]] بـ [[false]]، والـ [[NaN]] بيتخزن [[NaN]] عادي.
- float32 فيه ٢٤ bit للأرقام، فكل عدد صحيح لحد ٢ أس ٢٤ (16777216) بيعدّي، وبعدها الفردي لأ. float16 فيه ١١ bit، فلحد 2048، و 2049 بتبقى 2048. وأكبر float16 هو 65504، وأي حاجة أكبر بكتير [[Infinity]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** قراءات حساس متخزنة في [[Float32Array]]، والكود بيعدّ كام قراءة = 0.1، وبيطبع 0 مع إن فيه اتنين:
~~~js
const readings = new Float32Array([0.1, 0.25, 0.1, 0.5]);
const target = 0.1;
console.log(readings.filter(r => r === target).length);
~~~`, done: R`بيطبع 2 بطريقتين: مقارنة بالقيمة الـ float32، ومقارنة بسماحية.`, sol: R`~~~text الناتج قبل التصليح
0
~~~

الـ 0.1 جوه الـ [[Float32Array]] اتخزنت [[0.10000000149011612]]، و [[target]] = 0.1 بالـ ٦٤ bit. رقمين مختلفين.

~~~js readings.js
const readings = new Float32Array([0.1, 0.25, 0.1, 0.5]);
const target = Math.fround(0.1);
console.log(readings.filter(r => r === target).length);
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;
console.log(Array.from(readings).filter(r => close(r, 0.1)).length);
~~~

~~~text الناتج
2
2
~~~

- الطريقة الأولى: [[Math.fround(0.1)]] = نفس القيمة اللي اتخزنت، فالمقارنة بـ [[===]] بقت صح.
- الطريقة التانية (الأحسن مع قراءات حقيقية): مقارنة بسماحية [[1e-6]]. القراءة من حساس عمرها ما هتبقى 0.1 بالظبط أصلًا.
- [[Array.from(readings)]]: عشان [[filter]] على typed array بترجّع typed array، وده مش مشكلة هنا بس الـ array العادية أوضح.` },
            { lvl: 'تحدي', t: R`**اشرحها:** في Chrome، [[Math.sumPrecise([19.99, 0.01, 0.1, 0.2])]] = [[20.299999999999997]] بس [[reduce]] = [[20.3]]. يعني الجمع «العادي» طلع أحسن؟ اشرح في ٣ سطور، وقول إيه الحل الصح لأسعار.`, done: R`عندك ٣ سطور بتفرّق بين «دقيق» و «اللي البني آدم مستنيه»، وحل بالقروش.`, sol: R`~~~text الناتج من Chrome 157
100000.00000133288 100000
0.1 0.6
0.30000000000000004 20.299999999999997 20.3
-0 4 Infinity NaN
TypeError: Type of 'Iterator value' must be 'number', found 'string'
TypeError: [object Number] is not iterable
~~~

(السطر التالت فيه المقارنة.)

**الإجابة النموذجية:**

1. الأرقام [[19.99]] و [[0.01]] و [[0.1]] و [[0.2]] مش متخزنة بالظبط، كل واحدة أقل أو أكتر بحتة صغيرة.
2. [[Math.sumPrecise]] جمعت **القيم المتخزنة** بدقة كاملة، والمجموع الحقيقي ليها أقرب لـ 20.299999999999997. أما [[reduce]] غلطت في الاتجاه العكسي بالصدفة فطلعت 20.3.
3. فـ [[sumPrecise]] بتحل مشكلة **تراكم** الغلط، مش مشكلة إن 0.1 مش متخزنة. للفلوس: حوّل لقروش أعداد صحيحة ([[1999 + 1 + 10 + 20]] = 2030) واجمع، الجمع ده دقيق ١٠٠٪.` }
          ],
          check: { lang: "js", starter: R`function fitsFloat32(x) {
  // true لو x هيتخزن في Float32Array من غير ما يتغيّر
}
function fitsFloat16(x) {
}`, tests: R`test("0.5 بالظبط", () => expect(fitsFloat32(0.5)).toBe(true));
test("0.1 لأ", () => expect(fitsFloat32(0.1)).toBe(false));
test("2 أس 24", () => expect(fitsFloat32(16777216)).toBe(true));
test("بعدها بواحد", () => expect(fitsFloat32(16777217)).toBe(false));
test("NaN", () => expect(fitsFloat32(NaN) && fitsFloat16(NaN)).toBe(true));
test("float16: 2049", () => expect(fitsFloat16(2049)).toBe(false));
test("float16: أكبر رقم", () => expect(fitsFloat16(65504)).toBe(true));
test("float16: 70000", () => expect(fitsFloat16(70000)).toBe(false));`, solution: R`const fitsFloat32 = x => Number.isNaN(x) || Math.fround(x) === x;
const fitsFloat16 = x => Number.isNaN(x) || Math.f16round(x) === x;` },
          flag: "script",
          deep: {
            why: R`تقارير المبيعات والإحصاء والقياسات بتجمع آلاف أو ملايين الأرقام، و [[reduce]] بتراكم غلطة في كل خطوة: المليون 0.1 بقوا [[100000.00000133288]]، وقايمة فيها رقم كبير جدًا ورقم صغير بتضيّع الصغير خالص. وفي الناحية التانية، البيانات الكتير (الصور، والـ 3D، ونماذج الـ AI) بتتخزن float32 أو float16 عشان توفّر نص أو ربع المساحة، فلازم تعرف القيمة هتبقى إيه بعد التخزين.`,
            how: R`[[Math.sumPrecise(iterable)]] (ES2026) بتحسب المجموع الرياضي الحقيقي للقيم (كأن عندك دقة لانهائية) وبعدين تقرّبه مرة واحدة لأقرب double. بتقبل أي iterable (array أو Set...)، وبترمي [[TypeError]] لو عنصر مش number (حتى BigInt)، وللقايمة الفاضية بترجّع [[-0]]. اتشغّلت في Chrome 157، و Node 24.22 (V8 13.6) معندوش: [[TypeError: Math.sumPrecise is not a function]]. فالكود اللي لازم يشتغل في الاتنين بيعمل feature detection: [[typeof Math.sumPrecise === "function"]].

الـ number العادي ٦٤ bit (float64): ١ للإشارة و ١١ للأُس و ٥٢ للكسر. float32: ١ و ٨ و ٢٣. float16: ١ و ٥ و ١٠. [[Math.fround]] و [[Math.f16round]] بيقرّبوا للأقرب في الشكل الأصغر، والناتج لسه number عادي (٦٤ bit) شايل القيمة المقرّبة. وده نفس اللي بيحصل لما تكتب في [[Float32Array]] أو [[Float16Array]].`,
            when: R`[[Math.sumPrecise]] (أو Neumaier في Node) لما تجمع قايمة طويلة من الكسور: إحصاء، ومتوسطات، وتقارير. مش للفلوس: الفلوس قروش أعداد صحيحة. [[Math.fround]] لما بتتعامل مع [[Float32Array]] أو WebGL أو ملفات binary فيها float32 (صوت، وصور HDR، و 3D)، وعايز تقارن أو تختبر القيمة اللي اتخزنت. [[Math.f16round]] مع [[Float16Array]] و WebGPU وأوزان نماذج الـ AI.`,
            mistakes: R`- تفتكر [[Math.sumPrecise]] هتطلّع [[0.3]] لـ [[[0.1, 0.2]]]: طلعت [[0.30000000000000004]]. هي بتصلّح التراكم، مش إن 0.1 مش متخزنة.
- تستخدمها في Node 24 من غير فحص: [[TypeError: Math.sumPrecise is not a function]].
- تبعتلها أرقام منفصلة [[Math.sumPrecise(1, 2)]] زي [[Math.max]]: بتاخد iterable واحد، والرسالة في Chrome 157 كانت [[TypeError: [object Number] is not iterable]].
- تقارن قيمة طالعة من [[Float32Array]] بـ literal بـ [[===]]: قارن بـ [[Math.fround(literal)]] أو بسماحية.
- تخزّن IDs أو أعداد صحيحة كبيرة في float32: بعد 16777216 بتبدأ تتقرّب.`
          },
          teach: R`## الفكرة في سطرين

الدرس ده عن **الدقة**: إزاي الغلط بيتجمّع في الجمع، وإزاي تقلله، وإيه اللي بيحصل للرقم لو اتخزن في bits أقل. أمثلة [[Math.sumPrecise]] اتشغّلت في **Chrome 157** (headless على ويندوز 11)، والباقي في Node 24.22 و Chrome الاتنين وطلع زي بعض.

~~~js precise.js
// جمع عادي: الغلطة بتتجمّع مع كل خطوة
const tenths = Array(10).fill(0.1);
console.log(tenths.reduce((a, b) => a + b, 0));
// Math.sumPrecise: جمع دقيق مرة واحدة (Chrome 157، مش في Node 24)
if (typeof Math.sumPrecise === "function") console.log(Math.sumPrecise(tenths));
// رقم متخزن بـ 32 bit و 16 bit بدل 64
console.log(Math.fround(0.1), Math.f16round(0.1));
console.log(Math.fround(16777217), Math.f16round(2049));
~~~

~~~text الناتج في Node 24.22
0.9999999999999999
0.10000000149011612 0.0999755859375
16777216 2048
~~~

~~~text نفس الملف في Chrome 157
0.9999999999999999
1
0.10000000149011612 0.0999755859375
16777216 2048
~~~

في Node سطر [[sumPrecise]] متطبعش لأن الدالة مش موجودة، و الـ [[if]] حمت الكود من الـ error.

---

## ١. ليه الجمع بيزحف

~~~js drift.js
const many = Array(1_000_000).fill(0.1);
console.log(many.reduce((a, b) => a + b, 0));
console.log([1e20, 0.1, -1e20].reduce((a, b) => a + b, 0));
console.log([0.1, 0.2, 0.3].reduce((a, b) => a + b, 0));
~~~

~~~text الناتج
100000.00000133288
0
0.6000000000000001
~~~

- مليون مرة 0.1: كل جمع بيتقرّب لأقرب double، والفرق الصغير بيتجمّع لحد ما بقى ظاهر في الرقم السادس بعد العلامة.
- [[[1e20, 0.1, -1e20]]] = 0 مش 0.1: لما جمعنا [[1e20 + 0.1]]، الـ 0.1 أصغر من أصغر خطوة حوالين ١٠ أس ٢٠ (حوالي ١٦ ألف!)، فاختفت. وبعدين طرحنا الـ 1e20 فبقى صفر.
- [[0.1 + 0.2 + 0.3]] = [[0.6000000000000001]]: نفس حكاية [[0.1 + 0.2]] من درس «number و NaN».

---

## ٢. [[Math.sumPrecise]]: جمع دقيق مرة واحدة

~~~js sum-precise.js
const many = Array(1_000_000).fill(0.1);
console.log(many.reduce((a, b) => a + b, 0), Math.sumPrecise(many));
console.log(Math.sumPrecise([1e20, 0.1, -1e20]), Math.sumPrecise([0.1, 0.2, 0.3]));
console.log(Math.sumPrecise([0.1, 0.2]), Math.sumPrecise([19.99, 0.01, 0.1, 0.2]), [19.99, 0.01, 0.1, 0.2].reduce((a, b) => a + b, 0));
console.log(Math.sumPrecise([]), Math.sumPrecise(new Set([1.5, 2.5])), Math.sumPrecise([Infinity, 1]), Math.sumPrecise([Infinity, -Infinity]));
try { Math.sumPrecise([1, "2"]); } catch (e) { console.log(e.name + ": " + e.message); }
try { Math.sumPrecise(1, 2); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج من Chrome 157
100000.00000133288 100000
0.1 0.6
0.30000000000000004 20.299999999999997 20.3
-0 4 Infinity NaN
TypeError: Type of 'Iterator value' must be 'number', found 'string'
TypeError: [object Number] is not iterable
~~~

| السطر | اللي حصل |
|---|---|
| مليون 0.1 | [[100000]] بالظبط بدل [[100000.00000133288]] |
| [[[1e20, 0.1, -1e20]]] | [[0.1]]: الرقم الصغير مضاعش وسط الكبار |
| [[[0.1, 0.2, 0.3]]] | [[0.6]] بدل [[0.6000000000000001]] بتاعة الجمع العادي |
| [[[0.1, 0.2]]] | [[0.30000000000000004]]: زي الجمع العادي! الـ 0.1 و 0.2 المتخزنين مجموعهم الحقيقي أقرب للرقم ده |
| [[[19.99, 0.01, 0.1, 0.2]]] | [[20.299999999999997]] بس [[reduce]] = [[20.3]]. الأدق مش دايمًا اللي متوقعه |
| [[[]]] | [[-0]]: القايمة الفاضية بترجّع صفر سالب (الـ spec كده) |
| [[new Set([1.5, 2.5])]] | 4: أي iterable شغال، مش array بس |
| [[[Infinity, -Infinity]]] | [[NaN]] زي الجمع العادي بالظبط |

والأخطاء (Chrome 157):

- عنصر مش رقم: [[TypeError: Type of 'Iterator value' must be 'number', found 'string']]. ومفيش تحويل: [["2"]] مرفوضة، و [[2n]] كمان.
- أرقام منفصلة: [[TypeError: [object Number] is not iterable]]. بتاخد قايمة، مش زي [[Math.max]].

### في Node 24

~~~text الناتج من node -e "console.log(Math.sumPrecise([1, 2]))"
TypeError: Math.sumPrecise is not a function
~~~

Node 24.22 مبني على V8 13.6، والدالة جت في V8 أحدث. فلو الكود بيشتغل في المكانين: افحص الأول، واكتب بديل.

---

## ٣. البديل: جمع Neumaier

~~~js neumaier.js
function preciseSum(values) {
  if (typeof Math.sumPrecise === "function") return Math.sumPrecise(values);
  let sum = 0, c = 0;
  for (const x of values) {
    if (typeof x !== "number") throw new TypeError("أرقام بس: " + typeof x);
    const t = sum + x;
    if (Math.abs(sum) >= Math.abs(x)) c += (sum - t) + x;
    else c += (x - t) + sum;
    sum = t;
  }
  return sum + c;
}
console.log(preciseSum(Array(1_000_000).fill(0.1)));
console.log(preciseSum([1e20, 0.1, -1e20]), preciseSum([0.1, 0.2, 0.3]), preciseSum([]));
~~~

~~~text الناتج في Node 24.22 (البديل)
100000
0.1 0.6 0
~~~

~~~text نفس الملف في Chrome 157 (Math.sumPrecise)
100000
0.1 0.6 -0
~~~

- لو [[Math.sumPrecise]] موجودة، استخدمها. ده **feature detection**: افحص الحاجة نفسها، مش اسم المتصفح ولا رقم النسخة.
- غير كده: [[t = sum + x]] الجمع العادي، والسطرين اللي بعده بيحسبوا **الحتة اللي ضاعت** في الجمع ده ([[(sum - t) + x]]: لو مفيش تقريب، دي صفر). بنجمّع الحتت دي في [[c]] ونضيفها في الآخر.
- [[Math.abs(sum) >= Math.abs(x)]]: الحتة الضايعة بتتحسب صح لما نطرح من الأكبر. ده الفرق بين Neumaier و Kahan الأقدم (تمرين «قارن وقيس» بيوريك Kahan بيفشل فين).
- فرق واحد: القايمة الفاضية رجّعت 0 في Node و [[-0]] في Chrome. لو فارق معاك، رجّع [[-0]] بنفسك.

---

## ٤. [[Math.fround]]: الرقم لو اتخزن في ٣٢ bit

~~~js fround.js
console.log(Math.fround(5.5), Math.fround(5.05), Math.fround(0.1));
console.log(Math.fround(16777216), Math.fround(16777217), Math.fround(2 ** 128));
const f32 = new Float32Array([0.1, 5.05]);
console.log(f32[0], f32[0] === Math.fround(0.1), Math.fround(0.1) === 0.1);
~~~

~~~text الناتج
5.5 5.050000190734863 0.10000000149011612
16777216 16777216 Infinity
0.10000000149011612 true false
~~~

- [[5.5]] اتخزنت زي ما هي (٥ + نص)، بس [[5.05]] بقت [[5.050000190734863]] و [[0.1]] بقت [[0.10000000149011612]].
- [[16777217]] (٢ أس ٢٤ + ١) بقت [[16777216]]: float32 بيعدّ صح لحد ٢ أس ٢٤ بس، زي ما الـ number العادي بيعدّ لحد ٢ أس ٥٣.
- [[2 ** 128]] أكبر من أكبر float32، فبقت [[Infinity]].
- [[Float32Array]] بتخزن نفس القيمة اللي [[Math.fround]] بترجّعها بالظبط ([[true]])، وده فايدتها: تعرف القيمة قبل ما تكتبها.

---

## ٥. [[Math.f16round]]: الرقم لو اتخزن في ١٦ bit

~~~js f16.js
console.log(Math.f16round(5.5), Math.f16round(5.05), Math.f16round(0.1), Math.f16round(1.337));
console.log(Math.f16round(2048), Math.f16round(2049), Math.f16round(65504), Math.f16round(65520), Math.f16round(1e-8));
const half = new Float16Array([0.1, 70000]);
console.log(half[0], half[1], half[0] === Math.f16round(0.1), half.BYTES_PER_ELEMENT, new Float32Array(1).BYTES_PER_ELEMENT, new Float64Array(1).BYTES_PER_ELEMENT);
~~~

~~~text الناتج (Node 24.22، و Chrome 157 طلّع نفسه)
5.5 5.05078125 0.0999755859375 1.3369140625
2048 2048 65504 Infinity 0
0.0999755859375 Infinity true 2 4 8
~~~

- الدقة أقل بكتير: [[0.1]] بقت [[0.0999755859375]] و [[1.337]] بقت [[1.3369140625]].
- الأعداد الصحيحة مضبوطة لحد 2048 بس: [[2049]] بقت 2048.
- أكبر رقم [[65504]]. [[65520]] وأكبر [[Infinity]]، و [[1e-8]] أصغر من أصغر رقم فبقت 0.
- [[Float16Array]] (جديدة) بتخزن كل رقم في ٢ bytes بدل ٨: آخر سطر بيطبع حجم العنصر في الأنواع التلاتة: 2 و 4 و 8. ربع المساحة، بس بدقة ٣ أرقام تقريبًا.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تجمع قايمة كسور طويلة | [[Math.sumPrecise]] (Chrome)، أو Neumaier (Node)، مع feature detection |
| تجمع فلوس | قروش أعداد صحيحة، والجمع العادي دقيق |
| تعرف القيمة اللي هتتخزن في [[Float32Array]] | [[Math.fround(x)]] |
| تعرف القيمة في [[Float16Array]] | [[Math.f16round(x)]] |
| تقارن قيمة float32 | [[r === Math.fround(v)]] أو بسماحية |`,
          lines: [
            R`array فيها ١٠ مرات 0.1. المفروض مجموعها 1.`,
            R`[[reduce]] بتجمع واحد واحد، وكل جمع بيتقرّب، فطلعت [[0.9999999999999999]].`,
            R`[[Math.sumPrecise]] بتجمع القايمة كلها بدقة كاملة وتقرّب مرة واحدة: 1. والـ [[if]] بتتأكد إن الدالة موجودة الأول، لأنها في Chrome 157 ومش في Node 24.`,
            R`[[Math.fround(0.1)]] القيمة لو اتخزنت في ٣٢ bit ([[0.10000000149011612]])، و [[Math.f16round(0.1)]] لو اتخزنت في ١٦ bit ([[0.0999755859375]]): كل ما الـ bits تقل الدقة تقل.`,
            R`أعداد صحيحة كمان بتتقرّب: float32 بيعدّ صح لحد ٢ أس ٢٤ فـ 16777217 بقت 16777216، و float16 لحد 2048 فـ 2049 بقت 2048.`
          ],
          ref: [
            { t: "MDN: Math.sumPrecise", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise" },
            { t: "MDN: Math.fround", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround" },
            { t: "MDN: Math.f16round", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/f16round" },
            { t: "MDN: Float16Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array" },
            { t: "TC39: Math.sumPrecise proposal", url: "https://github.com/tc39/proposal-math-sum" }
          ],
          pre: [{ to: "js/number و NaN", why: R`ليه 0.1 مش متخزنة بالظبط، وده أصل كل اللي في الدرس` }, "js/Math: أسس وجذور ولوغاريتمات ومثلثات", { to: "js/map و filter و reduce", why: R`الجمع بـ [[reduce]] اللي هنقارن بيه` }]
        },
        {
          cmd: "bitwise و shifts",
          title: "صلاحيات في رقم واحد، وألوان hex، و & و | و ^ و ~ و << و >> و >>>",
          desc: R`الـ bitwise operators بيشتغلوا على الرقم **bit bit** بعد ما يحوّلوه لعدد صحيح ٣٢ bit: [[a & b]] (AND: الـ bit واحد لو واحد في الاتنين)، و [[a | b]] (OR: لو واحد في أي واحد)، و [[a ^ b]] (XOR: لو مختلفين)، و [[~a]] (NOT: بيقلب كل bit). والـ shifts بيزحلقوا الـ bits: [[a << n]] شمال، و [[a >> n]] يمين محافظ على الإشارة، و [[a >>> n]] يمين وبيملا أصفار.

وليهم إسناد مختصر: [[&=]] و [[|=]] و [[^=]] و [[<<=]] و [[>>=]] و [[>>>=]]. الاستخدامات الحقيقية: صلاحيات وإعدادات كتير في رقم واحد (flags)، وفك ألوان hex، و hash سريع بـ [[Math.imul]]، وعدد الـ bits بـ [[Math.clz32]].

الفخ الأكبر: كل ده ٣٢ bit، فـ [[3_000_000_000 | 0]] بيطلع رقم سالب.`,
          example: R`// كل صلاحية bit لوحدها
const READ = 0b0001, WRITE = 0b0010, DELETE = 0b0100;
let perms = 0;
perms |= READ | WRITE;
console.log(perms, (perms & WRITE) !== 0, (perms & DELETE) !== 0);
perms &= ~WRITE;
console.log(perms.toString(2));
// لون واحد فيه ٣ ألوان
const orange = 0xff8800;
console.log(orange >> 16, (orange >> 8) & 0xff, orange & 0xff);
// الـ 32 bit بيقطعوا
console.log(-1 >>> 0, 3_000_000_000 | 0);`,
          try: R`في الـ Console: [[(12).toString(2)]] و [[(10).toString(2)]]، وبعدين [[12 & 10]] و [[12 | 10]] و [[12 ^ 10]]، وحاول تتوقع الناتج من الـ bits قبل ما تدوس Enter. بعدين [[-1 >>> 0]] و [[2 ** 31 | 0]]: ليه الرقم الموجب بقى سالب؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ٦ و ٣ بالـ binary على ورقة، وبعدين توقّع: [[console.log(6 & 3, 6 | 3, 6 ^ 3, ~6, 6 << 1, -6 >> 1, -6 >>> 28)]].`, done: R`كتبت [[2 7 5 -7 12 -3 15]] قبل التشغيل، ومعاك الـ bits لكل واحد.`, sol: R`~~~js d1.js
console.log(6 & 3, 6 | 3, 6 ^ 3, ~6, 6 << 1, -6 >> 1, -6 >>> 28);
~~~

~~~text الناتج
2 7 5 -7 12 -3 15
~~~

٦ = [[0110]] و ٣ = [[0011]]:

| العملية | الـ bits | الناتج |
|---|---|---|
| [[6 & 3]] | [[0010]]: الـ bit المشترك بس | 2 |
| [[6 ^ 3]] | [[0101]]: المختلفين | 5 |
| [[~6]] | كل الـ ٣٢ bit اتقلبوا، وده في two's complement = -(٦ + ١) | [[-7]] |
| [[6 << 1]] | [[1100]]: زحلقة شمال = ضرب في ٢ | 12 |
| [[-6 >> 1]] | زحلقة يمين بتحافظ على الإشارة = قسمة على ٢ لتحت | [[-3]] |
| [[-6 >>> 28]] | [[-6]] كـ ٣٢ bit = [[11111111111111111111111111111010]]، والـ ٤ bits اللي فوق [[1111]] | 15 |

و [[6 | 3]] = [[0111]] = 7: أي bit واحد في أي واحد فيهم.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** يوزر عنده صلاحية القراية والمسح بس، والكود بيقول إنه يقدر يكتب:
~~~js
const READ = 1, WRITE = 2, DELETE = 4;
const user = READ | DELETE;
if (user & WRITE === WRITE) console.log("يقدر يكتب");
else console.log("مش هيكتب");
~~~`, done: R`يوزر [[READ | DELETE]] (5) بيطبع «مش هيكتب»، ويوزر [[READ | WRITE]] (3) بيطبع «يقدر يكتب».`, sol: R`~~~text الناتج قبل التصليح
يقدر يكتب
~~~

المقارنة [[===]] أقوى من [[&]] (درس «operator precedence و grouping و comma»)، فالسطر اتقري [[user & (WRITE === WRITE)]] = [[5 & true]] = [[5 & 1]] = 1، وده truthy.

~~~js can-write.js
const READ = 1, WRITE = 2, DELETE = 4;
for (const user of [READ | DELETE, READ | WRITE]) {
  if ((user & WRITE) === WRITE) console.log(user, "يقدر يكتب");
  else console.log(user, "مش هيكتب");
}
~~~

~~~text الناتج
5 مش هيكتب
3 يقدر يكتب
~~~

[[(user & WRITE) === WRITE]] بالأقواس: [[5 & 2]] = 0 فـ [[false]]، و [[3 & 2]] = 2 فـ [[true]]. ده ثغرة أمنية حقيقية لو الكود ده بيحمي endpoint: يوزر معندوش صلاحية بيعدّي. ولو بتفحص صلاحية واحدة، [[(user & WRITE) !== 0]] كمان شغالة.` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول جيم: كل يوم في الأسبوع bit. اكتب [[encode(days)]] بتحوّل array أيام لرقم، و [[decode(mask)]] بترجّعها أيام. واطبع الأيام المشتركة بين جدولين بـ [[&]]، وبدّل يومين بـ [[^]].`, done: R`السبت والاتنين والأربع = 21، والمشترك مع (الاتنين والأربع والجمعة) = الاتنين والأربع، والتبديل شال السبت وزوّد الخميس.`, sol: R`~~~js gym-days.js
const DAYS = ["السبت", "الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة"];
const dayBit = i => 1 << i;
function encode(days) {
  let mask = 0;
  for (const d of days) {
    const i = DAYS.indexOf(d);
    if (i === -1) throw new RangeError("يوم مش معروف: " + d);
    mask |= dayBit(i);
  }
  return mask;
}
const decode = mask => DAYS.filter((_, i) => (mask & dayBit(i)) !== 0);
const gym = encode(["السبت", "الاتنين", "الأربع"]);
console.log(gym, gym.toString(2).padStart(7, "0"));
console.log(decode(gym).join("، "));
const both = gym & encode(["الاتنين", "الأربع", "الجمعة"]);
console.log("الأيام المشتركة:", decode(both).join("، "));
const toggled = gym ^ encode(["السبت", "الخميس"]);
console.log("بعد التبديل:", decode(toggled).join("، "));
~~~

~~~text الناتج
21 0010101
السبت، الاتنين، الأربع
الأيام المشتركة: الاتنين، الأربع
بعد التبديل: الاتنين، الأربع، الخميس
~~~

- [[1 << i]]: الـ bit رقم [[i]]. السبت 1 والاتنين 4 والأربع 16، والمجموع بـ [[|=]] = 21 = [[0010101]] (اقراها من اليمين: السبت أول bit).
- [[gym & other]]: الـ bits الشغالة في الاتنين بس = الأيام المشتركة. عملية واحدة بدل loop على الأيام.
- [[gym ^ encode([...])]]: XOR بيقلب الأيام دي بس: السبت كان شغال فاتشال، والخميس كان مقفول فاشتغل.
- [[decode]] بيلف على السبع أيام ويسأل كل bit بـ [[&]].

رقم واحد بيتخزن في عمود واحد في قاعدة البيانات، وبيتقارن بعملية واحدة. وده نفس اللي بيحصل في صلاحيات الملفات وإعدادات الإشعارات.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[isPowerOfTwo(n)]] بترجّع [[true]] لـ 1 و 2 و 4 و 8... من غير loop ولا log، بـ [[n & (n - 1)]].`, done: R`1 و 2 و 4 و 8 و 1024 و ٢ أس ٣٠ بـ [[true]]، و 3 و 6 و 1023 و 0 و -4 و 2.5 بـ [[false]]، والاختبارات بتعدّي.`, sol: R`~~~js power-of-two.js
function isPowerOfTwo(n) {
  return Number.isInteger(n) && n > 0 && n <= 2 ** 30 && (n & (n - 1)) === 0;
}
console.log([1, 2, 3, 4, 6, 8, 1024, 1023, 0, -4, 2.5, 2 ** 30].map(n => n + ":" + isPowerOfTwo(n)).join("  "));
~~~

~~~text الناتج
1:true  2:true  3:false  4:true  6:false  8:true  1024:true  1023:false  0:false  -4:false  2.5:false  1073741824:true
~~~

**ليه [[n & (n - 1)]]:** قوة ٢ فيها bit واحد بس: ٨ = [[1000]]. وطرح واحد بيقلب الـ bit ده وكل اللي على يمينه: ٧ = [[0111]]. فالـ AND صفر. أي رقم تاني فيه أكتر من bit، والـ AND بيسيب الـ bit العالي: ٦ = [[0110]] و ٥ = [[0101]]، الـ AND = [[0100]] مش صفر.

- [[n > 0]]: الصفر [[0 & -1]] = 0 كان هيعدّي غلط.
- [[n <= 2 ** 30]]: الـ bitwise ٣٢ bit بإشارة، فـ [[2 ** 31]] بيتحوّل لسالب و [[2 ** 32]] بيبقى 0، فبنحصر المدى اللي العملية صح فيه. لأكبر من كده: [[Number.isInteger(Math.log2(n))]].
- [[Number.isInteger]]: 2.5 كانت هتتقطع لـ 2 وتعدّي.` },
            { lvl: 'تحدي', t: R`**ابني:** [[hexToRgb("#ff8800")]] بترجّع [[{ r: 255, g: 136, b: 0 }]] بالـ shifts و [[& 0xff]]، وترمي error للون الغلط. وبعدين [[mix(c1, c2)]] بتخلط لونين (متوسط كل قناة) بـ [[>> 1]].`, done: R`[[mix("#ff0000", "#0000ff")]] = [["#7f007f"]] (بنفسجي)، و [[hexToRgb("#ff88")]] بترمي SyntaxError برسالة.`, sol: R`~~~js colors.js
function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new SyntaxError("لون مش صحيح: " + hex);
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}
const mix = (c1, c2) => {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  const n = (((a.r + b.r) >> 1) << 16) | (((a.g + b.g) >> 1) << 8) | ((a.b + b.b) >> 1);
  return "#" + n.toString(16).padStart(6, "0");
};
console.log(hexToRgb("#ff8800"), hexToRgb("0A0B0C"), mix("#ff0000", "#0000ff"), mix("#ffffff", "#000000"));
try { hexToRgb("#ff88"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
{ r: 255, g: 136, b: 0 } { r: 10, g: 11, b: 12 } #7f007f #7f7f7f
SyntaxError: لون مش صحيح: #ff88
~~~

- [[(n >> 16) & 0xff]]: زحلق ١٦ bit يمين عشان الأحمر ييجي في آخر ٨ bits، و [[& 0xff]] (= [[11111111]]) بيشيل أي حاجة فوقهم.
- [[(a.r + b.r) >> 1]]: الجمع وبعدين زحلقة واحد = قسمة على ٢ لتحت. 255 + 0 = 255 و [[255 >> 1]] = 127 = [[7f]].
- التجميع: [[(r << 16) | (g << 8) | b]]: كل قناة في مكانها، و [[|]] بيلزقهم (مفيش bits متداخلة).
- [[padStart(6, "0")]]: من غيره الأزرق الغامق [[#00007f]] كان هيطلع [[#7f]].` }
          ],
          check: { lang: "js", starter: R`function isPowerOfTwo(n) {
  // من غير loop: n & (n - 1)
}`, tests: R`test("1", () => expect(isPowerOfTwo(1)).toBe(true));
test("8", () => expect(isPowerOfTwo(8)).toBe(true));
test("1024", () => expect(isPowerOfTwo(1024)).toBe(true));
test("6", () => expect(isPowerOfTwo(6)).toBe(false));
test("1023", () => expect(isPowerOfTwo(1023)).toBe(false));
test("صفر", () => expect(isPowerOfTwo(0)).toBe(false));
test("سالب", () => expect(isPowerOfTwo(-4)).toBe(false));
test("كسر", () => expect(isPowerOfTwo(2.5)).toBe(false));`, solution: R`function isPowerOfTwo(n) {
  return Number.isInteger(n) && n > 0 && n <= 2 ** 30 && (n & (n - 1)) === 0;
}` },
          flag: "script",
          deep: {
            why: R`فيه حاجات بتتوصف طبيعي كـ «مجموعة اختيارات شغالة أو لأ»: صلاحيات يوزر، وأيام في الأسبوع، وإعدادات إشعارات، وحالة مفاتيح الكيبورد في لعبة. الـ bitwise بيخزّن ٣٢ اختيار في رقم واحد، ويفحص أو يغيّر كذا اختيار في عملية واحدة. وكمان صيغ ملفات وبروتوكولات شبكة كتير (صور، وصوت، و WebSocket) بتحط معلومات في bits، والألوان في CSS أصلًا ٣ bytes في رقم.`,
            how: R`قبل أي عملية bitwise، JavaScript بيحوّل الرقم لعدد صحيح **٣٢ bit بإشارة** (اسمها ToInt32): يشيل الكسر، وياخد باقي القسمة على ٢ أس ٣٢، ولو الـ bit الأعلى واحد يبقى سالب (two's complement). عشان كده [[2 ** 31 | 0]] = [[-2147483648]] و [[2 ** 32 | 0]] = 0. الاستثنا [[>>>]]: بيحوّل لـ **unsigned** ٣٢ bit، فـ [[-1 >>> 0]] = 4294967295، وده الطريقة الوحيدة تشوف الـ bits كرقم موجب. والناتج بيرجع [[number]] عادي.

[[Math.imul(a, b)]] بتضرب كأنهم ٣٢ bit وترجّع آخر ٣٢ bit من الناتج بالظبط، لأن [[(a * b) | 0]] بيضرب الأول بدقة ٥٣ bit فبيخسر الـ bits اللي تحت لما الناتج كبير (اتقاس: [[-67153019]] ضد [[-67153024]]). و [[Math.clz32(x)]] بتعدّ الأصفار في الشمال في الـ ٣٢ bit (count leading zeros).

مع [[BigInt]] كل العمليات شغالة من غير حد ٣٢ bit، ماعدا [[>>>]] (مفيش unsigned لرقم ملوش حد).`,
            when: R`flags وصلاحيات وأيام وإعدادات (لحد ٣١ اختيار في الـ number، أو أكتر بالـ BigInt). فك وتجميع ألوان وبيانات binary. hash سريع لـ cache أو توزيع (FNV-1a بـ [[Math.imul]]، مش للباسوردات). [[>>> 0]] عشان تعرض أو تقارن ٣٢ bit كموجب. ومتستخدمش [[| 0]] و [[~~x]] كبديل لـ [[Math.trunc]] في أي رقم ممكن يعدّي ٢ مليار: timestamps بالمللي، وفلوس بالقروش، و IDs.`,
            mistakes: R`- [[flags & MASK === MASK]] من غير أقواس: بيتقري [[flags & true]].
- [[x | 0]] أو [[~~x]] على رقم كبير: [[3_000_000_000 | 0]] = [[-1294967296]].
- [[&]] بدل [[&&]] في شرط: [[a & b]] بيرجّع رقم مش boolean، و [[1 & 2]] = 0 مع إن الاتنين truthy.
- [[~"abc".indexOf("z")]] كبديل لـ [[includes]]: شغال (لأن [[~-1]] = 0)، بس محدش هيفهمه. استخدم [[includes]].
- [[(-5).toString(2)]] عشان تشوف الـ bits: بيطبع [["-101"]]. استخدم [[(-5 >>> 0).toString(2)]].
- [[>>>]] مع BigInt: [[TypeError: BigInts have no unsigned right shift, use >> instead]].`
          },
          teach: R`## الفكرة في سطرين

الرقم جواه bits (أصفار وواحدات). العمليات دي بتشتغل على كل bit لوحده، بعد ما تحوّل الرقم لعدد صحيح **٣٢ bit**. كل الأمثلة اتشغّلت بـ Node 24.22.

~~~js bits.js
// كل صلاحية bit لوحدها
const READ = 0b0001, WRITE = 0b0010, DELETE = 0b0100;
let perms = 0;
perms |= READ | WRITE;
console.log(perms, (perms & WRITE) !== 0, (perms & DELETE) !== 0);
perms &= ~WRITE;
console.log(perms.toString(2));
// لون واحد فيه ٣ ألوان
const orange = 0xff8800;
console.log(orange >> 16, (orange >> 8) & 0xff, orange & 0xff);
// الـ 32 bit بيقطعوا
console.log(-1 >>> 0, 3_000_000_000 | 0);
~~~

~~~text الناتج
3 true false
1
255 136 0
4294967295 -1294967296
~~~

عشان نشوف الـ bits، هنستخدم دالة صغيرة: [[(n >>> 0).toString(2)]] بتطبع الـ bits (الـ [[>>> 0]] متشرحة تحت)، و [[padStart(8, "0")]] بتكمّل ٨ خانات.

---

## ١. التلات عمليات الأساسية والـ NOT

~~~js view.js
const bin = n => (n >>> 0).toString(2).padStart(8, "0").slice(-8);
const a = 12, b = 10;
console.log("a      ", bin(a), a);
console.log("b      ", bin(b), b);
console.log("a & b  ", bin(a & b), a & b);
console.log("a | b  ", bin(a | b), a | b);
console.log("a ^ b  ", bin(a ^ b), a ^ b);
console.log("~a     ", bin(~a), ~a);
~~~

~~~text الناتج
a       00001100 12
b       00001010 10
a & b   00001000 8
a | b   00001110 14
a ^ b   00000110 6
~a      11110011 -13
~~~

### [[a & b]]: AND

الـ bit في الناتج **واحد لو واحد في الاتنين**. 12 = [[1100]] و 10 = [[1010]]، المشترك [[1000]] = 8. استخدامه: «الـ bit ده شغال؟» ([[mask & FLAG]])، و «هات آخر ٨ bits» ([[n & 0xff]])، و «زوجي ولا فردي» ([[n & 1]]: 0 زوجي، 1 فردي).

### [[a | b]]: OR

**واحد لو واحد في أي واحد فيهم**: [[1110]] = 14. استخدامه: «شغّل الـ bit ده» ([[mask | FLAG]])، ولزق حتت في رقم واحد ([[(r << 16) | (g << 8) | b]]).

### [[a ^ b]]: XOR

**واحد لو مختلفين**: [[0110]] = 6. استخدامه: «اقلب الـ bit ده» (شغّال يقفل، ومقفول يشتغل)، و [[x ^ x]] = 0 دايمًا. خلي بالك: [[^]] مش أُس في JavaScript، الأُس [[**]].

### [[~a]]: NOT

بيقلب **كل** الـ ٣٢ bit. والنتيجة دايمًا [[-(a + 1)]]:

~~~js not.js
console.log(~12, ~-1, ~0, ~~7.9, ~~-7.9);
console.log("abc".indexOf("z"), ~"abc".indexOf("z"), !!~"abc".indexOf("b"), "abc".includes("b"));
~~~

~~~text الناتج
-13 0 -1 7 -7
-1 0 true true
~~~

- [[~12]] = [[-13]]، و [[~-1]] = 0، و [[~0]] = [[-1]].
- [[~~7.9]] = 7: قلبتين بيرجّعوا الرقم بعد ما اتحوّل ٣٢ bit (يعني الكسر اتشال). بيتشاف في كود قديم بدل [[Math.trunc]]، وليه فخ (القسم ٦).
- [[~"abc".indexOf("z")]] = 0: الشكل القديم لـ «مش موجود». النهارده [[includes]] أوضح.

---

## ٢. الـ shifts

~~~js shifts.js
console.log(1 << 3, 5 << 1, 1 << 31, 1 << 32);
console.log(40 >> 2, -40 >> 2, 7 >> 1);
console.log(40 >>> 2, -40 >>> 2, -1 >>> 0, (-1 >>> 0).toString(16));
~~~

~~~text الناتج
8 10 -2147483648 1
10 -10 3
10 1073741814 4294967295 ffffffff
~~~

### [[a << n]]: زحلقة شمال

كل bit بيتحرك [[n]] خانة شمال وبيدخل أصفار من اليمين، يعني ضرب في ٢ أس [[n]]. [[1 << 3]] = 8. بس [[1 << 31]] = [[-2147483648]] (الـ bit دخل في خانة الإشارة)، و [[1 << 32]] = 1 لأن عدد الخانات بياخد آخر ٥ bits بس (٣٢ = صفر).

### [[a >> n]]: زحلقة يمين بالإشارة

بيحرّك يمين وبيكرر bit الإشارة من الشمال، فالسالب بيفضل سالب: [[40 >> 2]] = 10 و [[-40 >> 2]] = [[-10]]. يعني قسمة على ٢ أس [[n]] لتحت ([[7 >> 1]] = 3).

### [[a >>> n]]: زحلقة يمين unsigned

بيدخّل **أصفار** من الشمال دايمًا. للموجب زي [[>>]]، بس السالب بيبقى رقم موجب كبير: [[-40 >>> 2]] = 1073741814. و [[-1 >>> 0]] = 4294967295 = [[ffffffff]]: من غير زحلقة، بس اتقري unsigned. ده الاستخدام الأشهر: تشوف أو تطبع ٣٢ bit كرقم موجب.

---

## ٣. الإسناد: [[&=]] و [[^=]] و [[<<=]] و [[>>=]] و [[>>>=]]

~~~js assign.js
let p = 0b0011;
p &= 0b0110;  console.log("&=  ", p.toString(2));
p |= 0b1000;  console.log("|=  ", p.toString(2));
p ^= 0b0010;  console.log("^=  ", p.toString(2));
let v = 1;
v <<= 4;      console.log("<<= ", v);
v >>= 2;      console.log(">>= ", v);
let w = -16;
w >>>= 28;    console.log(">>>=", w);
~~~

~~~text الناتج
&=   10
|=   1010
^=   1000
<<=  16
>>=  4
>>>= 15
~~~

| الكتابة | نفس | الاستخدام |
|---|---|---|
| [[p &= mask]] | [[p = p & mask]] | سيب الـ bits اللي في الـ mask بس، وأشهرها [[p &= ~FLAG]] لقفل flag |
| [[p ^= mask]] | [[p = p ^ mask]] | اقلب bits معينة |
| [[v <<= 4]] | [[v = v << 4]] | ضرب في ١٦ |
| [[v >>= 2]] | [[v = v >> 2]] | قسمة على ٤ لتحت |
| [[w >>>= 28]] | [[w = w >>> 28]] | هات الـ ٤ bits اللي فوق كرقم موجب: [[-16]] = [[1111...0000]] فطلعت 15 |

### و [[p |= mask]]: الـ OR assignment

[[p |= mask]] نفس [[p = p | mask]]: شغّل الـ bits اللي في الـ mask من غير ما تلمس الباقي. في المثال [[0010]] بقت [[1010]].

---

## ٤. الاستخدام الحقيقي: صلاحيات في رقم واحد

~~~js perms.js
const PERM = { READ: 1 << 0, WRITE: 1 << 1, DELETE: 1 << 2, ADMIN: 1 << 3 };
const has = (mask, p) => (mask & p) === p;
let editor = PERM.READ | PERM.WRITE;
console.log("editor:", editor, editor.toString(2).padStart(4, "0"));
console.log("يقرا؟", has(editor, PERM.READ), "يمسح؟", has(editor, PERM.DELETE), "يقرا ويكتب؟", has(editor, PERM.READ | PERM.WRITE));
editor |= PERM.DELETE;
editor &= ~PERM.WRITE;
editor ^= PERM.ADMIN;
console.log("بعد التعديل:", editor.toString(2).padStart(4, "0"));
const names = Object.keys(PERM).filter(k => has(editor, PERM[k]));
console.log(names.join(" + "));
~~~

~~~text الناتج
editor: 3 0011
يقرا؟ true يمسح؟ false يقرا ويكتب؟ true
بعد التعديل: 1101
READ + DELETE + ADMIN
~~~

| الخطوة | العملية | ليه |
|---|---|---|
| تعريف | [[1 << 0]] و [[1 << 1]] و [[1 << 2]] | كل صلاحية bit مختلف: 1 و 2 و 4 و 8 |
| منح كذا صلاحية | [[READ | WRITE]] | 3 = [[0011]] |
| فحص | [[(mask & p) === p]] | بيشتغل لصلاحية واحدة أو لمجموعة مع بعض |
| منح | [[mask |= DELETE]] | بيشغّل bit من غير ما يغيّر الباقي |
| سحب | [[mask &= ~WRITE]] | [[~WRITE]] = كل الـ bits ماعدا WRITE، فالـ AND بيقفله بس |
| تبديل | [[mask ^= ADMIN]] | لو موجود يتشال، ولو مش موجود يتحط |

النتيجة [[1101]] = READ و DELETE و ADMIN. رقم واحد (13) بيتخزن في عمود واحد ويتبعت في token.

---

## ٥. فك الألوان

~~~js color.js
const orange = 0xff8800;
const r = (orange >> 16) & 0xff, g = (orange >> 8) & 0xff, b = orange & 0xff;
console.log(r, g, b);
const packed = (r << 16) | (g << 8) | b;
console.log(packed === orange, "#" + packed.toString(16).padStart(6, "0"));
const darker = ((r >> 1) << 16) | ((g >> 1) << 8) | (b >> 1);
console.log("#" + darker.toString(16).padStart(6, "0"));
~~~

~~~text الناتج
255 136 0
true #ff8800
#7f4400
~~~

[[0xff8800]] = ٢٤ bit: أول ٨ أحمر وبعدهم أخضر وبعدهم أزرق. [[>> 16]] بيجيب الأحمر لآخر ٨ bits، و [[& 0xff]] بيشيل اللي فوقهم. والتجميع بـ [[<<]] و [[|]]. وآخر سطر: [[>> 1]] على كل قناة = نص الإضاءة: [[#7f4400]] برتقاني غامق.

---

## ٦. الفخ: الـ ٣٢ bit

~~~js trunc.js
console.log(7.9 | 0, -7.9 | 0, ~~7.9, Math.trunc(7.9));
console.log(2_147_483_647 | 0, 2_147_483_648 | 0, 3_000_000_000 | 0, Math.trunc(3_000_000_000));
const now = Date.UTC(2026, 10, 20) / 1000;
const later = Date.UTC(2038, 0, 20) / 1000;
console.log(now | 0, later | 0, Math.trunc(later));
~~~

~~~text الناتج
7 -7 7 7
2147483647 -2147483648 -1294967296 3000000000
1795132800 -2147408896 2147558400
~~~

- [[7.9 | 0]] و [[~~7.9]] = 7، زي [[Math.trunc]]. شغالين لحد [[2_147_483_647]] (٢ أس ٣١ ناقص ١).
- [[2_147_483_648 | 0]] = [[-2147483648]]، و [[3_000_000_000 | 0]] = [[-1294967296]]: الرقم اتلف. [[Math.trunc]] صح في الحالتين.
- آخر سطر: الثواني من ١٩٧٠ للنهارده (٢٠٢٦) لسه تحت الحد، بس في ٢٠ يناير ٢٠٣٨ **بتعدّيه**، و [[| 0]] بيطلّعها سالب. ده «مشكلة سنة ٢٠٣٨» بالظبط. استخدم [[Math.trunc]] دايمًا، إلا لو انت عايز الـ ٣٢ bit بقصد.

---

## ٧. [[Math.imul]] و [[Math.clz32]]

### [[Math.imul(a, b)]]: ضرب ٣٢ bit

~~~js imul.js
console.log(Math.imul(3, 4), Math.imul(0xffffffff, 5), (0xffffffff * 5) | 0);
console.log(Math.imul(123456789, 987654321), (123456789 * 987654321) | 0);
function fnv1a(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}
console.log(fnv1a("hello"), fnv1a("hellp"), fnv1a(""));
~~~

~~~text الناتج
12 -5 -5
-67153019 -67153024
4f9f2cab 5c9f4122 811c9dc5
~~~

- [[Math.imul(123456789, 987654321)]] = [[-67153019]] بس [[(a * b) | 0]] = [[-67153024]]: الضرب العادي ناتجه أكبر من ٢ أس ٥٣ فاتقرّب **قبل** ما الـ [[| 0]] ياخد آخر ٣٢ bit، فالـ bits اللي تحت باظت. [[imul]] بتحسبهم صح.
- استخدامها الحقيقي: hash. [[fnv1a]] هنا بيحوّل أي نص لـ ٨ حروف hex: [[^=]] بيدخّل كل حرف، و [[Math.imul]] بتخلط، و [[>>> 0]] بتعرضه موجب. حرف واحد اختلف ([["hellp"]]) والـ hash اتغيّر خالص. مفيد للـ cache والتوزيع، **مش** للباسوردات.

### [[Math.clz32(x)]]: عدد الأصفار في الشمال

~~~js clz.js
console.log(Math.clz32(1), Math.clz32(1000), Math.clz32(0), Math.clz32(-1), Math.clz32(0.5), Math.clz32(2 ** 32));
const bitLength = n => 32 - Math.clz32(n);
const nextPow2 = n => (n <= 1 ? 1 : 2 ** (32 - Math.clz32(n - 1)));
console.log(bitLength(1000), bitLength(255), bitLength(256), nextPow2(1000), nextPow2(1024), nextPow2(1025));
~~~

~~~text الناتج
31 22 32 0 32 32
10 8 9 1024 1024 2048
~~~

- [[Math.clz32(1)]] = 31: الرقم 1 في ٣٢ bit = ٣١ صفر وبعدين واحد. [[Math.clz32(0)]] = 32، والسالب 0 (الـ bit الأول واحد)، و [[0.5]] بيتحوّل 0.
- [[32 - Math.clz32(n)]] = عدد الـ bits اللي الرقم محتاجها: 1000 محتاج 10، و 255 محتاج 8، و 256 محتاج 9.
- [[nextPow2]]: أقرب قوة ٢ أكبر من أو تساوي الرقم (مقاسات buffers وجداول hash): 1000 ← 1024.

---

## ٨. الأولوية، و BigInt

~~~js prec.js
const WRITE = 2, flags = 3;
console.log(flags & WRITE === WRITE, (flags & WRITE) === WRITE);
~~~

~~~text الناتج
1 true
~~~

[[flags & WRITE === WRITE]] طلعت 1 (truthy) بالصدفة: اتقرت [[flags & (WRITE === WRITE)]]. حط أقواس حوالين أي [[&]] أو OR أو [[^]] جنب مقارنة.

~~~js bigbits.js
console.log(5n & 3n, 5n | 2n, 5n ^ 1n, ~5n, 5n << 2n, -5n >> 1n);
console.log(1n << 64n, (1n << 64n) - 1n);
~~~

~~~text الناتج
1n 7n 4n -6n 20n -3n
18446744073709551616n 18446744073709551615n
~~~

مع BigInt مفيش حد ٣٢ bit: [[1n << 64n]] شغال. بس:

~~~text الناتج من 5n >>> 1n و 5n & 1
TypeError: BigInts have no unsigned right shift, use >> instead
TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الـ bit ده شغال؟ | [[(mask & FLAG) !== 0]] بالأقواس |
| شغّل bit | [[mask |= FLAG]] |
| اقفل bit | [[mask &= ~FLAG]] |
| اقلب bit | [[mask ^= FLAG]] |
| bit رقم n | [[1 << n]] (لحد 30) |
| آخر ٨ bits | [[n & 0xff]] |
| تشوف الـ ٣٢ bit موجب | [[n >>> 0]] |
| تقطع الكسر | [[Math.trunc]] مش [[| 0]] |
| ضرب ٣٢ bit لـ hash | [[Math.imul]] |
| عدد الـ bits | [[32 - Math.clz32(n)]] |`,
          lines: [
            R`كل صلاحية bit لوحده: القراية أول bit (1) والكتابة التاني (2) والمسح التالت (4). الـ [[0b]] بيخلّيك تشوف مكان الـ bit.`,
            R`[[perms]] رقم فيه كل الصلاحيات، والصفر يعني ولا صلاحية.`,
            R`[[READ | WRITE]] = [[0011]] = 3، و [[|=]] بيشغّل الـ bits دي في [[perms]] من غير ما يقفل حاجة كانت شغالة.`,
            R`بيطبع 3، وبعدين فحصين: [[(perms & WRITE) !== 0]] بيسأل «bit الكتابة شغال؟» ([[true]])، ونفس الشكل للمسح ([[false]]). الأقواس لازمة.`,
            R`[[~WRITE]] كل الـ bits شغالة ماعدا الكتابة، و [[&=]] بيقفل الكتابة بس ويسيب الباقي زي ما هو.`,
            R`[[toString(2)]] بيوريك الـ bits: [["1"]] يعني القراية بس فضلت.`,
            R`لون CSS [[#ff8800]] كرقم واحد: ٨ bits أحمر و ٨ أخضر و ٨ أزرق.`,
            R`[[>> 16]] بيجيب الأحمر (255)، و [[(orange >> 8) & 0xff]] الأخضر (136)، و [[& 0xff]] الأزرق (0). الـ [[0xff]] = ٨ واحدات بتشيل أي حاجة فوقهم.`,
            R`[[-1 >>> 0]] بيقرا الـ ٣٢ bit كرقم موجب: 4294967295. و [[3_000_000_000 | 0]] بيتلف لسالب لأنه أكبر من ٢ أس ٣١: ده فخ [[| 0]].`
          ],
          ref: [
            { t: "MDN: Bitwise AND (&)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND" },
            { t: "MDN: Bitwise OR", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR" },
            { t: "MDN: Bitwise XOR (^)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR" },
            { t: "MDN: Bitwise NOT (~)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT" },
            { t: "MDN: Left shift (<<)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift" },
            { t: "MDN: Right shift (>>)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift" },
            { t: "MDN: Unsigned right shift (>>>)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift" },
            { t: "MDN: Bitwise AND assignment (&=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND_assignment" },
            { t: "MDN: Bitwise OR assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR_assignment" },
            { t: "MDN: Bitwise XOR assignment (^=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR_assignment" },
            { t: "MDN: Left shift assignment (<<=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift_assignment" },
            { t: "MDN: Right shift assignment (>>=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift_assignment" },
            { t: "MDN: Unsigned right shift assignment (>>>=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift_assignment" },
            { t: "MDN: Math.imul", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul" },
            { t: "MDN: Math.clz32", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32" }
          ],
          pre: ["js/numeric literals و numeric separators", "js/operator precedence و grouping و comma", { to: "js/Number: toFixed و toString و toLocaleString", why: R`[[toString(2)]] و [[toString(16)]] و [[padStart]] اللي بنشوف بيهم الـ bits` }]
        },
        {
          cmd: "BigInt بعمق",
          title: "أعداد صحيحة من غير حد: إمتى BigInt، وإزاي تحسب بيه وتبعته JSON من غير ما تخسر رقم؟",
          desc: R`[[bigint]] نوع لوحده للأعداد الصحيحة من غير حد أقصى: [[2n ** 64n]] مظبوطة لآخر رقم، و ID من ١٩ رقم مبيتغيّرش. بتكتبه بـ [[n]] في الآخر ([[10n]]) أو بـ [[BigInt("...")]] من نص.

قواعده: مينفعش تخلطه مع [[number]] في نفس العملية ([[1n + 1]] [[TypeError]])، ومفيهوش كسور ([[7n / 2n]] = [[3n]])، و [[Math]] مبتقبلهوش، و [[JSON.stringify]] بيرمي error عليه.

وعليه: [[BigInt.asIntN]] و [[BigInt.asUintN]] بيلفّوا الرقم في عدد bits معين (زي int64 في لغات تانية)، و [[toString(radix)]] و [[toLocaleString]] للعرض، و [[valueOf]].`,
          example: R`// number بيغلط بعد 2 أس 53، و bigint لأ
console.log(2 ** 53 + 1, 2n ** 53n + 1n);
// تكتبه بـ n أو بـ BigInt()
const id = BigInt("1234567890123456789");
console.log(typeof id, id + 1n);
// القسمة بتقطع الكسر
console.log(7n / 2n, -7n / 2n);
// تلف الرقم في 8 bits
console.log(BigInt.asIntN(8, 255n), BigInt.asUintN(8, -1n));
// للعرض
console.log(id.toString(36), id.toLocaleString("ar-EG"));
// JSON مبيعرفهوش
console.log(JSON.stringify({ id }, (k, v) => typeof v === "bigint" ? v.toString() : v));`,
          try: R`في الـ Console: [[9007199254740993]] (هتلاقيه اتطبع ...992)، وبعدين [[9007199254740993n]]. جرّب [[1n + 1]] واقرا الـ error، وصلّحه بطريقتين ([[1n + 1n]] و [[Number(1n) + 1]]). وآخر حاجة [[JSON.parse('{"id": 1234567890123456789}').id]]: آخر رقمين راحوا فين؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log(7n / 2n, -7n / 2n, 5n % -3n, 1n == 1, 1n === 1, typeof 0n, 0n ? "truthy" : "falsy", 10n > 9)]].`, done: R`كتبت التمانية قبل التشغيل، وتقدر تقول ليه [[-7n / 2n]] = [[-3n]] مش [[-4n]].`, sol: R`~~~js d1.js
console.log(7n / 2n, -7n / 2n, 5n % -3n, 1n == 1, 1n === 1, typeof 0n, 0n ? "truthy" : "falsy", 10n > 9);
~~~

~~~text الناتج
3n -3n 2n true false bigint falsy true
~~~

- القسمة بتشيل الكسر **ناحية الصفر** (زي [[Math.trunc]]): ٣٫٥ ← 3، و -٣٫٥ ← -3 مش -4.
- [[5n % -3n]] = [[2n]]: الباقي بياخد إشارة الشمال، زي الـ number.
- [[1n == 1]] بـ [[true]] (المقارنة بالقيمة بتشتغل بين النوعين)، و [[1n === 1]] بـ [[false]] (نوعين مختلفين).
- [[0n]] falsy زي [[0]]، و [[10n > 9]] المقارنة بين النوعين شغالة عادي. الممنوع الحساب بس، مش المقارنة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فاتورة رقمها ورقمها الإجمالي bigint، و [[JSON.stringify(invoice)]] بيرمي error. صلّحه عشان يبعتها نص، وارجع اقراها bigint تاني ووريني إن الـ ID مضاعش.`, done: R`الـ body بقى [[{"id":"9007199254740993","totalPiasters":"125050"}]]، والقراية رجّعت نفس الـ bigint ([[true]]).`, sol: R`~~~text الناتج قبل التصليح
TypeError: Do not know how to serialize a BigInt
~~~

~~~js invoice-json.js
const invoice = { id: 9007199254740993n, totalPiasters: 125050n };
const body = JSON.stringify(invoice, (key, value) => (typeof value === "bigint" ? value.toString() : value));
console.log(body);
const back = JSON.parse(body, (key, value) => (key === "id" || key === "totalPiasters" ? BigInt(value) : value));
console.log(back.id, back.totalPiasters, back.id === invoice.id);
~~~

~~~text الناتج
{"id":"9007199254740993","totalPiasters":"125050"}
9007199254740993n 125050n true
~~~

- الـ replacer (التاني في [[JSON.stringify]]) بيتندهله لكل قيمة: لو bigint رجّعها نص، غير كده سيبها.
- ليه نص مش رقم: لو بعتّه رقم JSON، أي حد هيقراه بـ [[JSON.parse]] العادي هيخسر آخر رقم.
- الـ reviver (التاني في [[JSON.parse]]) بيرجّع المفاتيح المعروفة bigint.
- فيه حل تاني بتلاقيه في النت: [[BigInt.prototype.toJSON = function () {...}]]. شغال، بس بيغيّر سلوك كل bigint في البرنامج كله وفي أي مكتبة، فالـ replacer أأمن.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف [[api.json]] فيه ٣ posts بـ IDs من ١٩ رقم. اقراه عادي واعرض الـ IDs، وبعدين اقراه بحيث الـ IDs تبقى bigint، ورتّبهم من الأحدث (الأكبر) للأقدم.`, done: R`القراية العادية طلّعت ٣ IDs **متطابقين**، والقراية الصح طلّعت ٣ مختلفين، والأحدث «تاني بوست».`, sol: R`~~~text api.json
{"posts": [
  {"id": 1849302741592768513, "title": "أول بوست"},
  {"id": 1849302741592768517, "title": "تاني بوست"},
  {"id": 1849302741592768515, "title": "تالت بوست"}
]}
~~~

~~~js latest-post.js
const fs = require("fs");
const text = fs.readFileSync("api.json", "utf8");
const naive = JSON.parse(text).posts.map(p => p.id);
console.log("number:", naive.join(" "), "| مختلفين؟", new Set(naive).size);
const posts = JSON.parse(text, (key, value, ctx) => (key === "id" ? BigInt(ctx.source) : value)).posts;
console.log("bigint:", posts.map(p => p.id).join(" "));
posts.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
console.log("الأحدث:", posts[0].title, posts[0].id);
~~~

~~~text الناتج
number: 1849302741592768500 1849302741592768500 1849302741592768500 | مختلفين؟ 1
bigint: 1849302741592768513 1849302741592768517 1849302741592768515
الأحدث: تاني بوست 1849302741592768517n
~~~

- القراية العادية: التلات IDs المختلفين بقوا **نفس الرقم** ([[1849302741592768500]])، و [[Set]] فيه عنصر واحد. لو بتعمل [[find]] بالـ ID كنت هتفتح البوست الغلط.
- [[JSON.parse(text, (key, value, ctx) => ...)]]: الـ reviver بياخد argument تالت فيه [[source]] = **النص الأصلي** للقيمة قبل ما يتحوّل number. ده اسمه JSON.parse source text access، شغال في Node 24.22 و Chrome 157 (اتجرّب في الاتنين).
- الترتيب: [[a.id < b.id ? 1 : ...]] مش [[b.id - a.id]]، لأن [[sort]] لازم ترجّع number، والطرح بين bigints بيرجّع bigint فـ [[TypeError: Cannot convert a BigInt value to a number]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[factorial(n)]] بترجّع n! **مظبوط** كـ bigint. قارن [[factorial(25)]] بنفس الحساب بالـ number.`, done: R`[[factorial(25)]] = [[15511210043330985984000000n]]، والـ number طلّع [[1.5511210043330986e+25]] ومش بيساويه، والاختبارات بتعدّي.`, sol: R`~~~js factorial.js
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n لازم عدد صحيح مش سالب");
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}
console.log(factorial(0), factorial(5), factorial(25));
let x = 1; for (let i = 2; i <= 25; i++) x *= i;
console.log(x, BigInt(x) === factorial(25));
~~~

~~~text الناتج
1n 120n 15511210043330985984000000n
1.5511210043330986e+25 false
~~~

- الدالة بتاخد [[n]] number عادي (اليوزر هيكتب 25 مش 25n)، وبتحوّله [[BigInt(n)]] في الشرط بس.
- [[result = 1n]] و [[i = 2n]]: كل اللي في الحساب bigint، فمفيش خلط.
- بالـ number: 25! أكبر من ٢ أس ٥٣ بكتير، فاتخزن تقريبًا ([[1.5511210043330986e+25]]): أول ١٧ رقم بس صح. و [[BigInt(x) === factorial(25)]] بـ [[false]].
- الفحص الأول: [[factorial(-1)]] أو [[factorial(2.5)]] بترمي [[RangeError]] بدل ما ترجّع 1 غلط.`, },
            { lvl: 'تحدي', t: R`**ابني:** hash بتاع ٦٤ bit (FNV-1a 64) لأي نص بالـ bigint: [[h ^= byte]] وبعدين [[h = BigInt.asUintN(64, h * PRIME)]]. قارن ناتج [[""]] و [["a"]] بالقيم المعروفة للخوارزمية: [[cbf29ce484222325]] و [[af63dc4c8601ec8c]].`, done: R`الاتنين طالعين زي القيم المعروفة بالظبط، والعربي شغال لأنك بتشتغل على الـ bytes.`, sol: R`~~~js fnv64.js
const OFFSET = 0xcbf29ce484222325n;
const PRIME = 0x100000001b3n;
function fnv1a64(text) {
  let h = OFFSET;
  for (const byte of new TextEncoder().encode(text)) {
    h ^= BigInt(byte);
    h = BigInt.asUintN(64, h * PRIME);
  }
  return h.toString(16).padStart(16, "0");
}
console.log(fnv1a64(""), fnv1a64("a"), fnv1a64("hello"), fnv1a64("مرحبا"));
~~~

~~~text الناتج
cbf29ce484222325 af63dc4c8601ec8c a430d84680aabd0b 7306b4a71c439dbe
~~~

- [[OFFSET]] و [[PRIME]] ثوابت الخوارزمية (FNV-1a 64-bit) مكتوبين hex bigint.
- [[new TextEncoder().encode(text)]]: النص كـ bytes بـ UTF-8. العربي كل حرف ٢ bytes، فلازم نشتغل على الـ bytes مش على [[charCodeAt]] عشان الناتج يطابق أي لغة تانية.
- [[BigInt.asUintN(64, h * PRIME)]]: الضرب بيطلّع رقم أكبر من ٦٤ bit (الـ bigint ملوش حد)، و [[asUintN]] بتاخد آخر ٦٤ bit بس، بالظبط زي ما الضرب بيحصل في C أو Go على [[uint64]]. من غيرها الرقم هيكبر مع كل حرف ومش هيطابق الخوارزمية.
- أول قيمتين مطابقين لقيم الاختبار المعروفة: يبقى الكود صح.` }
          ],
          check: { lang: "js", starter: R`function factorial(n) {
  // رجّع n! كـ bigint
}`, tests: R`test("0!", () => expect(factorial(0)).toBe(1n));
test("5!", () => expect(factorial(5)).toBe(120n));
test("25! مظبوط", () => expect(factorial(25)).toBe(15511210043330985984000000n));
test("نوعه bigint", () => expect(typeof factorial(3)).toBe("bigint"));
test("سالب", () => expect(() => factorial(-1)).toThrow());
test("كسر", () => expect(() => factorial(2.5)).toThrow());`, solution: R`function factorial(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n لازم عدد صحيح مش سالب");
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}` },
          flag: "script",
          deep: {
            why: R`فيه أرقام صحيحة أكبر من ٢ أس ٥٣ في الشغل العادي: IDs بتاعة شبكات اجتماعية وقواعد بيانات موزّعة (Snowflake IDs من ١٩ رقم)، وعمود [[BIGINT]] في Postgres و MySQL، و timestamps بالـ nanoseconds ([[process.hrtime.bigint()]] في Node)، ومبالغ ضخمة بأصغر وحدة، والتشفير والـ hashes بتاعة ٦٤ bit. الـ number بيقرّبهم من غير ما يقولك، و bigint بيحفظهم بالظبط.`,
            how: R`الـ bigint بيتخزن بعدد bits بيكبر مع الرقم، فمالوش حد غير الذاكرة. نوعه [[typeof]] = [["bigint"]]، وهو primitive زي number (مفيش [[new BigInt]]: [[TypeError: BigInt is not a constructor]]).

العمليات [[+]] و [[-]] و [[*]] و [[**]] و [[%]] والـ bitwise كلها شغالة، و [[/]] بتقطع ناحية الصفر. أي عملية بين bigint و number بترمي [[TypeError: Cannot mix BigInt and other types, use explicit conversions]]، لأن اللغة مش عارفة تختار: لو حوّلت الـ bigint لـ number ممكن يخسر دقة، ولو حوّلت الـ number لـ bigint ممكن يكون فيه كسر. فانت اللي بتحوّل: [[BigInt(n)]] أو [[Number(b)]]. والمقارنة ([[<]] و [[==]]) مسموحة لأنها مش بتطلّع رقم جديد.

[[BigInt.asIntN(bits, x)]] بترجّع آخر [[bits]] من [[x]] كعدد **بإشارة** (two's complement)، و [[BigInt.asUintN]] من غير إشارة. ده اللي بيحصل للـ int64 في C و Go و Rust لما يعدّي حده (overflow)، فبتستخدمهم لما تقلّد حساب لغة تانية أو صيغة ملف.

[[JSON]] مفيهوش نوع bigint، فـ [[JSON.stringify]] بيرمي [[TypeError: Do not know how to serialize a BigInt]] بدل ما يخسر دقة في سكوت.`,
            when: R`أي عدد صحيح ممكن يعدّي [[Number.MAX_SAFE_INTEGER]]: IDs كبيرة، وعدّادات بتكبر من غير حد، وحسابات زي المضروب والتوافيق، والـ hashes والـ bitmasks بتاعة ٦٤ bit، وقيم [[BIGINT]] من قاعدة البيانات. ومتستخدموش للفلوس العادية (القروش كـ number آمنة لحد ٩٠ تريليون جنيه)، ولا لأي حساب فيه كسور أو [[Math]]، ولا في loops تقيلة: اتقاس هنا إن جمع ٥ مليون رقم bigint أبطأ حوالي ٣٠ مرة من number.`,
            mistakes: R`- [[1n + 1]]: [[TypeError]]. حوّل واحد فيهم صراحة.
- [[JSON.parse]] لـ ID كبير من غير reviver بـ [[ctx.source]]: الرقم بيتغيّر من غير error.
- [[BigInt(id)]] بعد ما الـ ID اتقري number: الضرر حصل خلاص. حوّل من **النص**.
- [[BigInt(1.5)]]: [[RangeError]]، و [[BigInt("1.5")]]: [[SyntaxError]]. قرّب الأول ([[BigInt(Math.trunc(x))]]).
- [[arr.sort((a, b) => a - b)]] على bigints: [[TypeError: Cannot convert a BigInt value to a number]]. استخدم مقارنة بـ [[<]].
- [[Math.max(...bigints)]] أو [[Math.sqrt(4n)]]: [[TypeError]]. اكتبها بنفسك.
- [[1n === 1]] بـ [[false]]، فـ [[[1n].includes(1)]] بـ [[false]] و [[new Set([1n, 1])]] فيه عنصرين.`
          },
          teach: R`## الفكرة في سطرين

[[bigint]] نوع للأعداد الصحيحة بس، بس من غير حد. هنشوف تكتبه إزاي، والحساب وحدوده، والتحويل، وإزاي يعدّي JSON. كل الأمثلة اتشغّلت بـ Node 24.22، والأخطاء و JSON اتجرّبوا في Chrome 157 كمان.

~~~js big.js
// number بيغلط بعد 2 أس 53، و bigint لأ
console.log(2 ** 53 + 1, 2n ** 53n + 1n);
// تكتبه بـ n أو بـ BigInt()
const id = BigInt("1234567890123456789");
console.log(typeof id, id + 1n);
// القسمة بتقطع الكسر
console.log(7n / 2n, -7n / 2n);
// تلف الرقم في 8 bits
console.log(BigInt.asIntN(8, 255n), BigInt.asUintN(8, -1n));
// للعرض
console.log(id.toString(36), id.toLocaleString("ar-EG"));
// JSON مبيعرفهوش
console.log(JSON.stringify({ id }, (k, v) => typeof v === "bigint" ? v.toString() : v));
~~~

~~~text الناتج
9007199254740992 9007199254740993n
bigint 1234567890123456790n
3n -3n
-1n 255n
9do1sj396nf9 ١٬٢٣٤٬٥٦٧٬٨٩٠٬١٢٣٬٤٥٦٬٧٨٩
{"id":"1234567890123456789"}
~~~

---

## ١. تكتبه إزاي: [[10n]] و [[BigInt()]]

~~~js make.js
console.log(10n, 0xffn, 0b101n, 0o17n, 1_000_000n, typeof 10n);
console.log(BigInt(42), BigInt("123456789012345678901234567890"), BigInt("0x1f"), BigInt(" 12 "), BigInt(""), BigInt(true));
console.log(BigInt(Number.MAX_SAFE_INTEGER) + 2n, BigInt(2 ** 60));
~~~

~~~text الناتج
10n 255n 5n 15n 1000000n bigint
42n 123456789012345678901234567890n 31n 12n 0n 1n
9007199254740993n 1152921504606846976n
~~~

- الـ literal: أي عدد صحيح وآخره [[n]]، وبيقبل [[0x]] و [[0b]] و [[0o]] و [[_]] (درس «numeric literals و numeric separators»).
- [[BigInt(x)]] من غير [[new]]: من number صحيح، أو من نص (بيفهم [["0x1f"]] والمسافات في الأطراف)، و [[""]] بـ [[0n]]، و [[true]] بـ [[1n]].
- [[BigInt(2 ** 60)]] شغال لأن ٢ أس ٦٠ متخزن بالظبط (قوة ٢). بس [[BigInt(9007199254740993)]] كان هيبقى ...992n: الـ number اتقرّب قبل ما يوصل للـ [[BigInt]].

### أخطاء الإنشاء

~~~js make-errors.js
const tries = ["BigInt(1.5)", "BigInt(\"1.5\")", "BigInt(\"abc\")", "BigInt(NaN)", "BigInt(null)", "BigInt(undefined)", "new BigInt(1)"];
for (const code of tries) {
  try { eval(code); } catch (e) { console.log(code.padEnd(18), "→", e.name + ": " + e.message); }
}
~~~

~~~text الناتج
BigInt(1.5)        → RangeError: The number 1.5 cannot be converted to a BigInt because it is not an integer
BigInt("1.5")      → SyntaxError: Cannot convert 1.5 to a BigInt
BigInt("abc")      → SyntaxError: Cannot convert abc to a BigInt
BigInt(NaN)        → RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
BigInt(null)       → TypeError: Cannot convert null to a BigInt
BigInt(undefined)  → TypeError: Cannot convert undefined to a BigInt
new BigInt(1)      → TypeError: BigInt is not a constructor
~~~

| النوع | إمتى |
|---|---|
| [[RangeError]] | number فيه كسر أو [[NaN]] أو [[Infinity]]: القيمة نوعها صح بس برّه المسموح |
| [[SyntaxError]] | نص مش عدد صحيح: [["1.5"]] و [["abc"]] |
| [[TypeError]] | [[null]] و [[undefined]] و [[new BigInt]] |

---

## ٢. الحساب

~~~js math.js
console.log(7n + 2n, 7n - 10n, 7n * 3n, 7n / 2n, -7n / 2n, 7n % 2n, -7n % 2n, 2n ** 64n);
let n = 5n; n++; n *= 2n; console.log(n);
console.log(1n == 1, 1n === 1, 2n > 1, 1n < 1.5, 0n ? "truthy" : "falsy", 1n + "", $__bt$__{2n}$__bt);
console.log([3n, 1, 2n, -5].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
~~~

~~~text الناتج
9n -3n 21n 3n -3n 1n -1n 18446744073709551616n
12n
true false true true falsy 1 2
[ -5, 1, 2n, 3n ]
~~~

- [[7n / 2n]] = [[3n]] و [[-7n / 2n]] = [[-3n]]: القسمة بتقطع ناحية الصفر.
- [[2n ** 64n]] كل أرقامه صح.
- [[++]] و [[*=]] شغالين (درس «++ و -- و += وأخواتها»).
- المقارنة بين النوعين مسموحة: [[1n == 1]] و [[1n < 1.5]]. و [[0n]] falsy. و [[1n + ""]] بيبقى [["1"]] (من غير [[n]]).
- الترتيب المختلط شغال لو المقارنة بـ [[<]] و [[>]].

### الممنوع ورسايله

~~~js math-errors.js
const tries = ["1n + 1", "Math.max(1n, 2n)", "Math.sqrt(4n)", "+1n", "1n / 0n", "2n ** -1n", "[1n, 2n].sort((a, b) => a - b)"];
for (const code of tries) {
  try { const r = eval(code); console.log(code.padEnd(30), "→", String(r)); } catch (e) { console.log(code.padEnd(30), "→", e.name + ": " + e.message); }
}
~~~

~~~text الناتج (Node 24.22)
1n + 1                         → TypeError: Cannot mix BigInt and other types, use explicit conversions
Math.max(1n, 2n)               → TypeError: Cannot convert a BigInt value to a number
Math.sqrt(4n)                  → TypeError: Cannot convert a BigInt value to a number
+1n                            → TypeError: Cannot convert a BigInt value to a number
1n / 0n                        → RangeError: Division by zero
2n ** -1n                      → RangeError: undefined must be positive
[1n, 2n].sort((a, b) => a - b) → TypeError: Cannot convert a BigInt value to a number
~~~

~~~text نفس الملف في Chrome 157
1n + 1                         → TypeError: Cannot mix BigInt and other types, use explicit conversions
Math.max(1n, 2n)               → TypeError: Cannot convert a BigInt value to a number
Math.sqrt(4n)                  → TypeError: Cannot convert a BigInt value to a number
+1n                            → TypeError: Cannot convert a BigInt value to a number
1n / 0n                        → RangeError: Division by zero
2n ** -1n                      → RangeError: Exponent must be positive
[1n, 2n].sort((a, b) => a - b) → TypeError: Cannot convert a BigInt value to a number
~~~

لاحظ سطر [[2n ** -1n]]: نفس الـ error بس **الرسالة مختلفة**: Node 24.22 قال [[undefined must be positive]] (رسالة ناقصة في V8 13.6)، و Chrome 157 قال [[Exponent must be positive]]. متعتمدش على نص رسايل الأخطاء في الكود، اعتمد على النوع ([[e instanceof RangeError]]).

---

## ٣. التحويل لـ number

~~~js convert.js
const big = 9007199254740993n;
console.log(Number(big), Number(2n ** 64n), parseInt("9007199254740993"));
const safe = n => {
  if (n > BigInt(Number.MAX_SAFE_INTEGER) || n < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("مش هيتحوّل number من غير ما يتغيّر: " + n);
  return Number(n);
};
console.log(safe(42n));
try { safe(big); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
9007199254740992 18446744073709552000 9007199254740992
42
RangeError: مش هيتحوّل number من غير ما يتغيّر: 9007199254740993
~~~

[[Number(big)]] بيرجّع أقرب number من غير error، فبيخسر دقة في سكوت. الدالة [[safe]] بتفحص الأول إن الرقم جوه [[MIN_SAFE_INTEGER]] و [[MAX_SAFE_INTEGER]] وترمي [[RangeError]] لو لأ.

---

## ٤. [[BigInt.asIntN]] و [[BigInt.asUintN]]: لف الرقم في عدد bits

~~~js wrap.js
console.log(BigInt.asIntN(8, 127n), BigInt.asIntN(8, 128n), BigInt.asIntN(8, 255n), BigInt.asIntN(8, 256n));
console.log(BigInt.asUintN(8, 255n), BigInt.asUintN(8, 256n), BigInt.asUintN(8, -1n));
console.log(BigInt.asUintN(64, -1n), BigInt.asIntN(64, 2n ** 63n));
const MAX_I64 = 2n ** 63n - 1n;
console.log(BigInt.asIntN(64, MAX_I64 + 1n));
~~~

~~~text الناتج
127n -128n -1n 0n
255n 0n 255n
18446744073709551615n -9223372036854775808n
-9223372036854775808n
~~~

- [[BigInt.asIntN(8, x)]]: خد آخر ٨ bits واقراهم بإشارة (من -128 لـ 127). [[127n]] زي ما هي، و [[128n]] بقت [[-128n]] (لفّت)، و [[255n]] بقت [[-1n]]، و [[256n]] بقت [[0n]].
- [[BigInt.asUintN(8, x)]]: آخر ٨ bits من غير إشارة (من 0 لـ 255). [[-1n]] بقت [[255n]].
- بـ ٦٤ bit: [[asUintN(64, -1n)]] = أكبر uint64، و [[asIntN(64, 2n ** 63n)]] = أصغر int64. وآخر سطر: أكبر int64 + 1 لفّ لأصغر واحد. ده بالظبط الـ overflow اللي بيحصل في C و Go.
- الـ [[bits]] لازم عدد صحيح مش سالب: [[BigInt.asIntN(-1, 5n)]] = [[RangeError: Invalid value: not (convertible to) a safe integer]].

---

## ٥. [[toString(radix)]] و [[toLocaleString()]] و [[valueOf()]]

~~~js methods.js
const id = 1234567890123456789n;
console.log(id.toString(), id.toString(16), id.toString(36), (255n).toString(2), (-10n).toString());
console.log(id.toLocaleString("en-US"), id.toLocaleString("ar-EG"), id.toLocaleString("de-DE"));
console.log((123456n).toLocaleString("ar-EG", { style: "currency", currency: "EGP" }));
console.log((10n).valueOf(), typeof Object(10n), typeof Object(10n).valueOf(), Object(10n) + 1n);
~~~

~~~text الناتج
1234567890123456789 112210f47de98115 9do1sj396nf9 11111111 -10
1,234,567,890,123,456,789 ١٬٢٣٤٬٥٦٧٬٨٩٠٬١٢٣٬٤٥٦٬٧٨٩ 1.234.567.890.123.456.789
‏١٢٣٬٤٥٦٫٠٠ ج.م.‏
10n object bigint 11n
~~~

| الـ method | بتعمل إيه |
|---|---|
| [[id.toString()]] | نص عشري من غير [[n]] |
| [[id.toString(16)]] | نص بأي أساس من 2 لـ 36. و [[toString(36)]] بيخلّي الـ ID القصير ينفع في لينك: ١٩ رقم بقوا ١٢ حرف |
| [[id.toLocaleString("ar-EG")]] | نفس [[Intl.NumberFormat]] بالظبط: أرقام عربي وفواصل، ومن غير ما يخسر ولا رقم (مش بيتحوّل number الأول) |
| [[toLocaleString]] مع currency | شغالة، والرقم الصحيح بيتعرض بـ [[.00]] |
| [[valueOf()]] | بترجّع الـ bigint الخام من جوه wrapper ([[Object(10n)]])، وبتتندهلها لوحدها في الحساب |

---

## ٦. JSON: التحدي الحقيقي

~~~js json.js
const order = { id: 1234567890123456789n, total: 50n };
try { JSON.stringify(order); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(JSON.stringify(order, (k, v) => (typeof v === "bigint" ? v.toString() : v)));
const raw = '{"id": 1234567890123456789, "name": "Mona"}';
console.log(JSON.parse(raw).id);
const parsed = JSON.parse(raw, (key, value, ctx) => (key === "id" ? BigInt(ctx.source) : value));
console.log(parsed.id, typeof parsed.id);
~~~

~~~text الناتج (Node 24.22، و Chrome 157 طلّع نفسه بالحرف)
TypeError: Do not know how to serialize a BigInt
{"id":"1234567890123456789","total":"50"}
1234567890123456800
1234567890123456789n bigint
~~~

1. [[JSON.stringify]] على bigint: [[TypeError: Do not know how to serialize a BigInt]]. اللغة رافضة تخمّن.
2. الحل في الإرسال: replacer بيحوّل كل bigint لنص.
3. الاستقبال العادي: [[1234567890123456789]] بقى [[1234567890123456800]]. الـ ID **اتغيّر** من غير error.
4. الحل في الاستقبال: الـ reviver بياخد [[ctx.source]] = النص الأصلي للرقم زي ما هو في الـ JSON، فـ [[BigInt(ctx.source)]] بيرجّعه بالظبط.

الأأمن من كل ده: الـ API نفسه يبعت الـ IDs الكبيرة كنصوص ([[{"id": "1234567890123456789"}]]). كتير من الـ APIs الكبيرة بتعمل كده.

---

## ٧. الأداء

~~~js perf.js
const N = 5_000_000;
let t = performance.now(), a = 0;
for (let i = 0; i < N; i++) a += i;
const tn = performance.now() - t;
t = performance.now(); let b = 0n;
for (let i = 0n; i < 5_000_000n; i++) b += i;
const tb = performance.now() - t;
console.log("number:", Math.round(tn), "ms  |  bigint:", Math.round(tb), "ms", "| نفس الناتج؟", BigInt(a) === b);
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
number: 6 ms  |  bigint: 153 ms | نفس الناتج؟ true
~~~

نفس الجمع، والـ bigint أبطأ بعشرات المرات (اتشغّل مرتين قبل كده: ١٤ ضد ٣٨٠، و ١٢ ضد ٣٧٤ مللي). الـ number بيتحسب في المعالج مباشرة، والـ bigint كل عملية فيها شغل على الذاكرة. استخدمه لما تحتاج الدقة بس.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| bigint من literal | [[123n]] |
| bigint من نص (API، فورم) | [[BigInt(text)]] جوه [[try]] |
| تجمع bigint مع number | حوّل واحد: [[big + BigInt(n)]] |
| ترجّعه number بأمان | افحص الحدود الأول، وبعدين [[Number(big)]] |
| تقلّد int64 أو uint64 | [[BigInt.asIntN(64, x)]] و [[BigInt.asUintN(64, x)]] |
| تعرضه | [[toString()]] أو [[toLocaleString("ar-EG")]] |
| تبعته JSON | replacer بيرجّع [[toString()]] |
| تستقبل ID كبير | reviver بـ [[BigInt(ctx.source)]] |
| ترتّب | مقارنة بـ [[<]] مش بالطرح |`,
          lines: [
            R`[[2 ** 53 + 1]] بالـ number بيطلع ...992 (غلط من غير error)، ونفس الحساب بالـ bigint ([[n]] بعد كل رقم) بيطلع ...993 صح.`,
            R`[[BigInt("...")]] بيبني bigint من **نص**، وده الطريقة الصح لـ ID جاي من برّه. لو كتبته رقم الأول، الـ number كان هيقرّبه قبل ما يوصل.`,
            R`[[typeof]] بيقول [["bigint"]]، و [[id + 1n]] الحساب لازم يكون bigint في الناحيتين. الناتج ...790n بالظبط.`,
            R`[[7n / 2n]] = [[3n]]: مفيش كسور، القسمة بتقطع ناحية الصفر. و [[-7n / 2n]] = [[-3n]] مش [[-4n]].`,
            R`[[BigInt.asIntN(8, 255n)]] بتاخد آخر ٨ bits وتقراهم بإشارة: [[-1n]]. و [[BigInt.asUintN(8, -1n)]] نفس الـ bits من غير إشارة: [[255n]].`,
            R`[[toString(36)]] بيكتب الـ ID بالحروف والأرقام (١٢ حرف بدل ١٩ رقم)، و [[toLocaleString("ar-EG")]] بأرقام عربي وفواصل من غير ما يخسر ولا رقم.`,
            R`[[JSON.stringify]] بيرمي error على bigint، فالـ replacer (الـ argument التاني) بيتندهله لكل قيمة، ولو bigint بيرجّعها نص قبل الكتابة: [[{"id":"1234567890123456789"}]].`
          ],
          ref: [
            { t: "MDN: BigInt", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" },
            { t: "MDN: BigInt.asIntN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asIntN" },
            { t: "MDN: BigInt.asUintN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN" },
            { t: "MDN: BigInt.prototype.toString", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString" },
            { t: "MDN: BigInt.prototype.toLocaleString", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toLocaleString" },
            { t: "MDN: BigInt.prototype.valueOf", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/valueOf" },
            { t: "MDN: JSON.parse (reviver و context.source)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" },
            { t: "MDN: TypeError: BigInt value can't be serialized in JSON", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/BigInt_not_serializable" }
          ],
          pre: [{ to: "js/number و NaN", why: R`أول مرة شفنا [[2n ** 53n + 1n]] وحد الـ [[MAX_SAFE_INTEGER]]` }, "js/Number: الثوابت والفحص والتحويل", "js/bitwise و shifts", { to: "js/JSON", why: R`[[JSON.stringify]] و [[JSON.parse]] والـ replacer والـ reviver` }]
        },
      ]
    }
]);
