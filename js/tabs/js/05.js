// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`النصوص بعمق: Unicode والحروف والعربي`,
      l: 2,
      time: R`حوالي ٦ ساعات`,
      n: R`النص في JavaScript مش «حروف»: هو وحدات UTF-16. الوحدة دي بتعلّمك تكتب أي حرف بالـ escape، وتعد الحروف اللي اليوزر شايفها فعلًا، وتقارن وتدوّر في كلام عربي فيه همزات وتشكيل وإيموجي من غير ما تكسره`,
      pre: [
        { to: "js/template literals", why: R`الـ backtick والـ [[$__{ }]] هنكمّل عليهم: علامات التنصيص التلاتة و [[String.raw]]` },
        { to: "js/string methods", why: R`[[slice]] و [[split]] و [[trim]] و [[padStart]] متشرحين هناك، وهنا هنشوف بيعملوا إيه مع العربي والإيموجي` },
        { to: "js/for...of و for...in", why: R`[[for...of]] على النص هو اللي بيمشي على الحروف الحقيقية، وده أساس نص الوحدة` },
      ],
      goal: [
        R`تكتب أي نص في الكود من غير [[SyntaxError]]: العلامات التلاتة، والـ escapes ([[\n]] و [[\x41]] و [[\u0627]] و [[\u{1F600}]])، و [[String.raw]] لمسارات ويندوز والـ regex.`,
        R`تعرف ليه [["😀".length]] بـ 2، وتعد الحروف بالطريقة الصح لكل غرض: code units ولا code points ولا الحروف اللي العين شايفاها ([[Intl.Segmenter]]).`,
        R`تقارن كلام عربي جاي من مصادر مختلفة صح: [[normalize]] للهمزة والتشكيل، و [[toLocaleLowerCase]] للغات التانية، وتنضّف الحروف المخفية والـ surrogates المكسورة.`,
        R`تكتب regex بيفهم العربي فعلًا ([[\p{scx=Arabic}]] مش [[\p{Script=Arabic}]] لوحدها)، وتراص جدول في الترمنال فيه تشكيل وإيموجي.`,
      ],
      use: {
        prog: R`أي داتا من يوزر نص: اسم، وعنوان، وبحث، وبوست. والباج الكلاسيكي: عدّاد حروف بيقول ٢٨٠ واليوزر شايف ٢٧٠، وبحث بيقول «مفيش» عن «أحمد» والاسم متسجّل «احمد»، و [[URIError]] من إيموجي اتقص نصين.`,
        work: R`تنضيف ملفات CSV جاية من Excel (BOM و [[\r\n]] ومسافات مخفية)، وبحث في أسماء عملاء عربي، ومعاينة رسايل في إشعار، وتقارير في الترمنال. كله في الوحدة دي بمشاريع.`,
        cs: R`Unicode و UTF-16 و UTF-8 هما إزاي أي نص بيتخزن في أي لغة. و normalization و grapheme clusters مفاهيم موجودة في كل لغة برمجة، مش JavaScript بس.`,
      },
      projects: [
        { lvl: 'صغير', t: R`كاشف الحروف المخفية`, what: R`سكربت [[reveal.js]] بياخد اسم ملف (أو بيشتغل على جملة تجربة جواه) ويطبع كل حرف في سطر: مكانه بالـ code units، وكوده [[U+XXXX]]، والحرف نفسه، ونوعه (حرف، تشكيل، رقم، مسافة، إيموجي، رمز). والحروف اللي مبتبانش (ZWSP و NBSP و RLM و LRM و BOM والتطويل) تتعلّم «مخفي» باسمها، وتتطبع [[·]] مكانها. وفي الآخر سطر بالطول وعدد الـ code points وعدد المخفي. من دروس «escape sequences و String.raw» و «string و UTF-16: length و codePointAt» و «regex والعربي: Unicode properties».`, done: R`على الجملة اللي جواه بيطلّع ١٤ سطر، منهم ٣ «مخفي»، والإيموجي في سطر واحد مكانه 13 (مش سطرين). وعلى ملف CSV محفوظ بـ BOM أول سطر [[U+FEFF]] «مخفي: BOM». والملف المش موجود بيطبع «مش قادر أقرا» و exit code 1 مش stack trace.`, sol: R`## هتشوف إيه

جدول حرف حرف لأي نص، والحروف اللي مبتبانش متعلّمة. ده الناتج على الجملة اللي جوه الملف (Node 24.22 على ويندوز 11):

~~~text الناتج: node reveal.js
  0  U+0633    س  حرف
  1  U+0627    ا  حرف
  2  U+200B    ·  مخفي: ZWSP مسافة صفرية
  3  U+0631    ر  حرف
  4  U+0629    ة  حرف
  5  U+00A0    ·  مخفي: NBSP مسافة مبتتكسرش
  6  U+0623    أ  حرف
  7  U+064E    ·  تشكيل/علامة
  8  U+062D    ح  حرف
  9  U+0645    م  حرف
 10  U+062F    د  حرف
 11  U+200F    ·  مخفي: RLM علامة يمين-شمال
 12  U+0020    ·  مسافة
 13  U+1F44D   👍  إيموجي

الطول 15 وحدة، و 14 حرف (code point)، منهم 3 مخفي
~~~

الجملة على الشاشة شكلها «سارة أَحمد 👍» عادي، وجواها ٣ حروف مخفية. ده بالظبط اللي بيحصل لما حد ينسخ اسم من PDF أو واتساب ويلزقه في فورم، وبعدين البحث عنه يفشل.

## الكود

~~~js reveal.js
// reveal.js: بيطبع كل حرف في النص ومكانه وكوده، وبيعلّم الحروف اللي مبتبانش
const fs = require("node:fs");

const HIDDEN = new Map([
  [0x00a0, "NBSP مسافة مبتتكسرش"],
  [0x200b, "ZWSP مسافة صفرية"],
  [0x200c, "ZWNJ فاصل من غير وصل"],
  [0x200d, "ZWJ لاصق"],
  [0x200e, "LRM علامة شمال-يمين"],
  [0x200f, "RLM علامة يمين-شمال"],
  [0x061c, "ALM علامة عربي"],
  [0xfeff, "BOM"],
  [0x0640, "تطويل"],
]);

function kind(ch) {
  const cp = ch.codePointAt(0);
  if (HIDDEN.has(cp)) return "مخفي: " + HIDDEN.get(cp);
  if (/\p{M}/u.test(ch)) return "تشكيل/علامة";
  if (/\p{L}/u.test(ch)) return "حرف";
  if (/\p{Nd}/u.test(ch)) return "رقم";
  if (/\s/u.test(ch)) return "مسافة";
  if (/\p{Extended_Pictographic}/u.test(ch)) return "إيموجي";
  if (/\p{Cf}/u.test(ch)) return "مخفي: تنسيق";
  return "رمز";
}

function hex(cp) {
  return "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
}

function reveal(text) {
  const rows = [];
  let index = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    const k = kind(ch);
    const shown = k.startsWith("مخفي") || /\p{M}/u.test(ch) || /\s/u.test(ch) ? "·" : ch;
    rows.push(String(index).padStart(3) + "  " + hex(cp).padEnd(8) + "  " + shown + "  " + k);
    index += ch.length;
  }
  return rows;
}

const file = process.argv[2];
const sample = "سا\u200bرة\u00a0أَحمد\u200f 👍";
let text = sample;
if (file) {
  try {
    text = fs.readFileSync(file, "utf8");
  } catch (e) {
    console.error("مش قادر أقرا " + file + ": " + e.code);
    process.exit(1);
  }
}
const rows = reveal(text);
console.log(rows.join("\n"));
const hidden = rows.filter(r => r.includes("مخفي")).length;
console.log("\nالطول " + text.length + " وحدة، و " + [...text].length + " حرف (code point)، منهم " + hidden + " مخفي");
~~~

## كل حتة بتعمل إيه

- **[[HIDDEN]]**: [[Map]] من رقم الحرف لاسمه. المفتاح رقم ([[0x200b]] مكتوب hex، نفس الرقم 8203) مش الحرف نفسه، عشان الكود يتقري: لو كتبت الحرف المخفي نفسه في الكود محدش هيشوفه. والجملة التجريبية مكتوبة بـ [[\u200b]] و [[\u00a0]] و [[\u200f]] لنفس السبب (درس «escape sequences و String.raw»).
- **[[kind(ch)]]**: الترتيب مهم. [[HIDDEN]] الأول لأن NBSP بيطابق [[\s]] (جرّبناها: [[/\s/u.test("\u00a0")]] بـ [[true]])، فلو [[\s]] جت قبله كان هيتكتب «مسافة» ويضيع إنه مخفي. وبعدها [[\p{M}]] (تشكيل) قبل [[\p{L}]] (حرف)، و [[\p{Cf}]] (format: حروف تنسيق مخفية) في الآخر كشبكة أمان لأي حرف مخفي مش في الـ Map.
- **[[for (const ch of text)]]**: بيمشي على code points، فالـ 👍 (اللي هو code units اتنين) بيجي مرة واحدة. ولو كنا لفّينا بـ [[for (let i...)]] و [[text[i]]] كان هيطلع سطرين لنصّين مكسورين.
- **[[index += ch.length]]**: المكان بالـ code units، عشان يبقى نفس الرقم اللي [[indexOf]] و [[slice]] بيستخدموه. بعد الإيموجي المكان بيزيد 2 مش 1.
- **[[padStart(3)]] و [[padEnd(8)]]**: بيخلّوا الأعمدة متراصة (درس «padEnd و trimEnd»). [[U+1F44D]] أطول من [[U+0633]] بحرف، و [[padEnd(8)]] بتعوّض الفرق.

## الغلطات اللي حصلت

1. **أول نسخة كانت بتقرا الملف من غير [[try]]**، ولما جرّبت اسم ملف مش موجود طلعت رسالة Node الخام:

~~~text الناتج قبل التصليح: node reveal.js nope.txt
node:fs:483
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^
~~~

الحل [[try/catch]] حوالين القراية بس، ورسالة فيها [[e.code]] ([[ENOENT]] = الملف مش موجود)، و [[process.exit(1)]] عشان أي سكربت تاني بيشغّله يعرف إنه فشل.

2. **ملف CSV من Excel**: أول حرف فيه BOM، و [[readFileSync(file, "utf8")]] في Node **مبيشيلوش**. ده اللي بيخلي أول عمود اسمه [["\ufeffname"]] مش [["name"]] وأي [[row.name]] يرجّع [[undefined]]:

~~~text الناتج: node reveal.js bom.csv
  0  U+FEFF    ·  مخفي: BOM
  1  U+006E    n  حرف
  2  U+0061    a  حرف
  3  U+006D    m  حرف
  4  U+0065    e  حرف
  5  U+002C    ,  رمز
  6  U+0063    c  حرف
  7  U+0069    i  حرف
  8  U+0074    t  حرف
  9  U+0079    y  حرف
 10  U+000D    ·  مسافة
 11  U+000A    ·  مسافة

الطول 12 وحدة، و 12 حرف (code point)، منهم 1 مخفي
~~~

وكمان باين [[U+000D]] و [[U+000A]] في الآخر: الملف اتحفظ بأسطر ويندوز ([[\r\n]]). الأداة دي هي أول حاجة تشغّلها لما «النص شكله صح والمقارنة بتقول لأ».

~~~text الناتج: node reveal.js nope.txt (بعد التصليح)
مش قادر أقرا nope.txt: ENOENT
~~~` },
        { lvl: 'صغير', t: R`عدّاد البوست زي المنصة`, what: R`زي «كاشف الحروف المخفية» بيقرا ملف أو جملة تجربة، بس المرة دي بيعد. [[post-count.js]] بيطبع ٥ أرقام لنفس البوست: [[length]] (UTF-16)، و code points، والحروف الظاهرة (graphemes بـ [[Intl.Segmenter]])، والكلمات، والـ bytes في UTF-8. وتحتهم «فاضلك X من 280» أو «زيادة X حرف». الحد بيتغيّر من سطر الأوامر ([[node post-count.js file.txt 40]])، والحد الغلط ([[abc]] أو صفر) بيترفض برسالة. النص بيتعمله [[normalize("NFC")]] و [[trimEnd()]] قبل العد. من دروس «Intl.Segmenter» و «string و UTF-16: length و codePointAt» و «normalize و التشكيل».`, done: R`على الجملة التجريبية (فيها عيلة إيموجي وعلم وإيد بلون بشرة) الأرقام بتطلع: length 64، و code points 56، وحروف ظاهرة 50، و bytes 119. وبحد 40 بيقول «زيادة 10». و [[node post-count.js x.txt abc]] بيطبع رسالة الحد و exit code 1.`, sol: R`## هتشوف إيه

نفس البوست بـ ٥ أرقام مختلفة، والرقم اللي المنصة بتعده هو «حروف ظاهرة»:

~~~text الناتج: node post-count.js
length (UTF-16):   64
code points:       56
حروف ظاهرة:        50
كلمات:             9
bytes (UTF-8):     119
فاضلك 230 من 280
~~~

~~~text الناتج: node post-count.js "" 40
length (UTF-16):   64
code points:       56
حروف ظاهرة:        50
كلمات:             9
bytes (UTF-8):     119
زيادة 10 حرف، امسح 10 عشان يتنشر
~~~

(الاسم الفاضي [[""]] معناه «مفيش ملف»، فبيشتغل على الجملة اللي جواه.) الفرق بين 64 و 50 هو بالظبط الباج اللي في أي عدّاد مبني على [[length]]: اليوزر شايف ٥٠ حرف والعدّاد بيقوله ٦٤.

## الكود

~~~js post-count.js
// post-count.js: بيعد البوست زي ما المنصة بتعده (حروف ظاهرة)، ويقولك فاضلك كام
const fs = require("node:fs");

const LIMIT = 280;
const graphemes = new Intl.Segmenter("ar", { granularity: "grapheme" });
const words = new Intl.Segmenter("ar", { granularity: "word" });

function count(text) {
  const clean = text.normalize("NFC").trimEnd();
  return {
    length: clean.length,
    codePoints: [...clean].length,
    graphemes: [...graphemes.segment(clean)].length,
    words: [...words.segment(clean)].filter(s => s.isWordLike).length,
    bytes: Buffer.byteLength(clean, "utf8"),
  };
}

function report(text, limit = LIMIT) {
  const c = count(text);
  const left = limit - c.graphemes;
  const lines = [
    "length (UTF-16):   " + c.length,
    "code points:       " + c.codePoints,
    "حروف ظاهرة:        " + c.graphemes,
    "كلمات:             " + c.words,
    "bytes (UTF-8):     " + c.bytes,
  ];
  lines.push(left >= 0 ? "فاضلك " + left + " من " + limit : "زيادة " + -left + " حرف، امسح " + -left + " عشان يتنشر");
  return lines.join("\n");
}

const file = process.argv[2];
const limit = Number(process.argv[3] ?? LIMIT);
if (!Number.isInteger(limit) || limit <= 0) {
  console.error("الحد لازم رقم صحيح أكبر من صفر، مش " + process.argv[3]);
  process.exit(1);
}
let text = "مبروك يا سارة 🎉👏🏽 الكورس خلص، و\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467} كلها فخورة بيكي! 🇪🇬";
if (file) {
  try {
    text = fs.readFileSync(file, "utf8");
  } catch (e) {
    console.error("مش قادر أقرا " + file + ": " + e.code);
    process.exit(1);
  }
}
console.log(report(text, limit));
~~~

## كل حتة بتعمل إيه

- **الـ Segmenters اتعملوا مرة واحدة برّه الدالة**: عمل [[Intl.Segmenter]] جديد مع كل نداء أبطأ بكتير (اتقاس في درس «Intl.Segmenter»: ٣٠٠ ms مقابل ١٣٠ ms على ٢٠ ألف رسالة).
- **[[normalize("NFC")]] قبل العد**: نفس الكلمة ممكن تيجي «أ» حرف واحد أو «ا» + همزة (اتنين)، فمن غير normalize نفس البوست ممكن يتعد بأرقام مختلفة حسب الكيبورد اللي اتكتب منه.
- **[[trimEnd()]]**: الملفات بتخلص بسطر جديد، والسطر ده مش جزء من البوست.
- **العيلة مكتوبة بـ [[\u{...}]]**: الإيموجي ده ٣ أشخاص بينهم حرف ZWJ مخفي ([[U+200D]])، والحرف المخفي ميتكتبش في الكود زي ما هو (مش هتشوفه وانت بتعدّل). لوحدها: length 8، و code points 5، و grapheme واحد.
- **[[Buffer.byteLength(clean, "utf8")]]**: الحجم اللي هيتبعت فعلًا على الشبكة أو يتخزن في عمود [[VARCHAR]] محدود بالـ bytes. الحرف العربي 2 bytes والإيموجي 4.
- **[[process.argv[3] ?? LIMIT]]**: [[??]] بتاخد القيمة الافتراضية لو مفيش رقم تالت بس. و [[Number.isInteger]] بترفض [[NaN]] (من [["abc"]]) والكسور، و [[<= 0]] بترفض الصفر والسالب.

## الغلطات اللي ممكن تقع فيها

- عدّ بـ [[text.length]]: العلم 🇪🇬 بـ 4 والإيد 👏🏽 بـ 4، فالعدّاد بيظلم اليوزر.
- عدّ بـ [[[...text].length]]: أحسن، بس العيلة لسه بـ 5 والعلم بـ 2.
- الحد الغلط من غير فحص: [[Number("abc")]] بـ [[NaN]]، و [[280 - NaN]] بـ [[NaN]]، والسكربت يطبع «فاضلك NaN» من غير ما يقع، وده أسوأ من الوقوع.

~~~text الناتج: node post-count.js short.txt abc
الحد لازم رقم صحيح أكبر من صفر، مش abc
~~~` },
        { lvl: 'متوسط', t: R`بحث في أسماء العملاء من غير ما الهمزة تفرّق`, what: R`[[search-names.js]] فيه [[searchKey(text)]] بتحوّل أي اسم لـ «مفتاح بحث»: [[NFKC]] (عشان ﻻ و الأرقام العريضة)، وبعدين [[NFD]] وشيل كل [[\p{M}]] (التشكيل، والهمزة من أ و إ و آ)، وشيل التطويل، و ى تبقى ي، و ة تبقى ه، والأرقام العربي ([[٠-٩]]) تبقى إنجليزي، و [[toLowerCase]]، ومسافات كتير تبقى واحدة. و [[search(names, query)]] بترجّع الأسماء اللي مفتاحها فيه مفتاح الكلمة، واللي بيبدأ بيها الأول. زي «كاشف الحروف المخفية» في إنه بيشتغل على الحروف واحد واحد، وزوّد عليه المقارنة. من دروس «normalize و التشكيل» و «regex والعربي: Unicode properties» و «string: indexOf و substring و concat».`, done: R`البحث بـ [["احمد"]] بيلاقي «أحمد سامي» و «إسراء أحمد» و «عمرو أحمـــد» (بالتطويل) بالترتيب ده، و [["امنه"]] بيلاقي «آمنة»، و [["هدي"]] بيلاقي «هدى»، و [["AHMED"]] بيلاقي «Ahmed Sami»، والبحث بمسافات بس بيرجّع ولا حاجة (مش كل الأسماء).`, sol: R`## هتشوف إيه

كل سطر: الكلمة اللي اتكتبت في البحث، والنتايج بالترتيب:

~~~text الناتج: node search-names.js
"احمد"    → أحمد سامي | إسراء أحمد | عمرو أحمـــد
"اسراء"   → إسراء أحمد
"امنه"    → آمنة فؤاد
"محمد"    → مُحَمَّد عبد الله
"مني"     → منى مصطفى
"هدي"     → هدى السيد
"فاطمه"   → فاطمة الزهراء
"AHMED"   → Ahmed Sami
"  "      → (مفيش)
"زهراء"   → فاطمة الزهراء
اسراء 2026 لا
~~~

آخر سطر هو مفتاح البحث لنص فيه كل المشاكل مرة واحدة ([["  إسْـــرَاء   ٢٠٢٦ ﻻ "]]): الهمزة والتشكيل والتطويل والأرقام العربي والحرف المركّب ﻻ والمسافات.

## الكود

~~~js search-names.js
// search-names.js: بحث في أسماء عربي من غير ما التشكيل والهمزات والتاء المربوطة يفرّقوا
function searchKey(text) {
  return String(text)
    .normalize("NFKC")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\u{640}/gu, "")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660))
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function search(names, query) {
  const q = searchKey(query);
  if (q === "") return [];
  const hits = [];
  for (const name of names) {
    const key = searchKey(name);
    const at = key.indexOf(q);
    if (at === -1) continue;
    hits.push({ name, score: at === 0 ? 0 : key.includes(" " + q) ? 1 : 2 });
  }
  return hits.sort((a, b) => a.score - b.score).map(h => h.name);
}

const customers = [
  "أحمد سامي", "إسراء أحمد", "آمنة فؤاد", "مُحَمَّد عبد الله",
  "منى مصطفى", "هدى السيد", "فاطمة الزهراء", "Ahmed Sami", "عمرو أحمـــد",
];
for (const q of ["احمد", "اسراء", "امنه", "محمد", "مني", "هدي", "فاطمه", "AHMED", "  ", "زهراء"]) {
  console.log(JSON.stringify(q).padEnd(9), "→", search(customers, q).join(" | ") || "(مفيش)");
}
console.log(searchKey("  إسْـــرَاء   ٢٠٢٦ ﻻ "));
~~~

## كل خطوة في [[searchKey]] بتعمل إيه

| الخطوة | بتعمل إيه | مثال |
|---|---|---|
| [[normalize("NFKC")]] | بتفك الأشكال «المتوافقة»: الحرف المركّب ﻻ يبقى لا، و ＡＢＣ العريضة تبقى ABC | ﻻ ← لا |
| [[normalize("NFD")]] | بتفك كل حرف مركّب لحرف أساسي + علامة: أ تبقى ا + همزة فوق، و آ تبقى ا + مدة | أحمد ← ا + ٔ + حمد |
| [[replace(/\p{M}/gu, "")]] | بتشيل كل العلامات (M = Mark): التشكيل، والهمزة والمدة اللي اتفكوا في الخطوة اللي فاتت | مُحَمَّد ← محمد |
| [[replace(/\u{640}/gu, "")]] | بتشيل التطويل (الكشيدة) | أحمـــد ← احمد |
| [[ى ← ي]] و [[ة ← ه]] | الاتنين بيتكتبوا مكان بعض في الكتابة اليومية، و normalize مبيلمسهمش | هدى ← هدي |
| [[[٠-٩] ← 0-9]] | [[٠]] رقمها [[0x660]]، فـ [[charCodeAt(0) - 0x660]] بتدّي الرقم نفسه | ٢٠٢٦ ← 2026 |
| [[toLowerCase()]] | للأسماء الإنجليزي بس، العربي مبيتأثرش | AHMED ← ahmed |
| [[replace(/\s+/g, " ")]] و [[trim()]] | المسافات الكتير تبقى واحدة، والأطراف تتشال | «  عمرو  » ← «عمرو» |

**الترتيب في [[search]]:** [[score]] صفر لو الاسم بيبدأ بالكلمة، وواحد لو كلمة جوه الاسم بتبدأ بيها ([[includes(" " + q)]])، واتنين لو في نص كلمة (زي «زهراء» جوه «الزهراء»). و [[sort]] بالرقم ده بيحط الأقرب فوق.

**ليه المفتاح للبحث بس:** المفتاح بيضيّع معلومات (التشكيل والهمزة وة/ه)، فمتعرضوش ومتخزّنوش مكان الاسم. اعرض الاسم الأصلي دايمًا، والمفتاح للمقارنة بس (ممكن تخزّنه في عمود جنب الاسم عشان البحث يبقى سريع).

## الغلطات اللي ممكن تقع فيها (اتجرّبوا)

1. **[[replace(/[أإآ]/g, "ا")]] بدل NFD:** بيشتغل لحد ما ييجي اسم الهمزة فيه حرفين ([[ا]] + [[U+0654]]، وده بيحصل من بعض الكيبوردات والـ PDF). الـ NFD بيمسك الشكلين.
2. **شيل [[\p{M}]] من غير NFD الأول:** الأ و إ و آ حروف لوحدها مش «حرف + علامة»، فالهمزة مبتتشالش، و [["احمد"]] مش بتلاقي «أحمد».
3. **[[NFKD]] على الاسم المعروض:** بيبوّظ ئ لـ ي + همزة (درس «مسائل نصوص» في بنك التمارين). هنا ده مقصود لأنه مفتاح بحث بس.
4. **البحث بنص فاضي:** [[key.indexOf("")]] بـ 0 دايمًا، فمن غير [[if (q === "") return []]] البحث بمسافة كان هيرجّع كل العملاء.` },
        { lvl: 'متوسط', t: R`جدول طلبات متراص في الترمنال`, what: R`زي «عدّاد البوست» بيعد الحروف الظاهرة، بس المرة دي عشان يراص. [[orders-table.js]] فيه [[cellWidth(text)]] (عرض النص في خانات الترمنال: كل grapheme خانة، والإيموجي والأعلام خانتين)، و [[fit(text, width)]] (لو النص أطول من العمود يتقص على حدود grapheme ويخلص بـ [[…]])، و [[table(columns, rows)]] بيطبع عناوين وخط فاصل وصف لكل طلب، والأرقام على اليمين. الأعمدة: رقم الطلب، والعميل، والطلب، والإجمالي بقرشين. فيه اسم بتشكيل، واسم طويل، وطلب فيه إيموجي. من دروس «padEnd و trimEnd» و «Intl.Segmenter» و «normalize و التشكيل».`, done: R`كل الخطوط العمودية [[│]] تحت بعض في Windows Terminal: «مُحَمَّد» (٨ code units و ٤ حروف ظاهرة) واخدة نفس عرض «سارة»، والاسم الطويل اتقص لـ «عبد الرحمن …» في ١٢ خانة بالظبط، والإجمالي [[120.00]] تحت [[45.00]]. ولو جرّبت [[padEnd]] العادي الصف بتاع «مُحَمَّد» بيبقى أقصر بـ ٤ خانات.`, sol: R`## هتشوف إيه

~~~text الناتج: node orders-table.js
  # │ العميل       │ الطلب          │ الإجمالي
────┼──────────────┼────────────────┼─────────
  1 │ سارة         │ لاتيه          │    45.00
  2 │ مُحَمَّد         │ كَرَك 2 × ☕     │    50.00
  3 │ عبد الرحمن … │ Iced Mocha     │    65.50
 14 │ Omar         │ كيكة 🎂 بالشو… │   120.00
~~~

> لو الصف بتاع «مُحَمَّد» باين مزحوح هنا في الصفحة، ده من الخط بتاع المتصفح: الحروف العربي والتشكيل مش بنفس العرض في خط الكود. في الترمنال كل حرف ظاهر خانة، والتشكيل بيتحط فوق الحرف من غير خانة، فالأعمدة بتتراص. والعدد اللي بيثبت ده: «مُحَمَّد» وبعدها 8 مسافات = 12، زي «سارة» وبعدها 8 مسافات.

## الكود

~~~js orders-table.js
// orders-table.js: جدول طلبات متراص في الترمنال حتى مع التشكيل والإيموجي
const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });

function cellWidth(text) {
  let w = 0;
  for (const { segment } of seg.segment(text)) {
    w += /\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(segment) ? 2 : 1;
  }
  return w;
}

function fit(text, width) {
  text = String(text).normalize("NFC");
  if (cellWidth(text) <= width) return text;
  let out = "";
  for (const { segment } of seg.segment(text)) {
    if (cellWidth(out + segment) > width - 1) break;
    out += segment;
  }
  return out + "…";
}

function pad(text, width, align) {
  const t = fit(text, width);
  const gap = " ".repeat(width - cellWidth(t));
  return align === "end" ? gap + t : t + gap;
}

function table(columns, rows) {
  const line = cells => cells.map((c, i) => pad(c, columns[i].width, columns[i].align)).join(" │ ");
  const out = [line(columns.map(c => c.title))];
  out.push(columns.map(c => "─".repeat(c.width)).join("─┼─"));
  for (const r of rows) out.push(line(columns.map(c => r[c.key])));
  return out.join("\n");
}

const columns = [
  { key: "id", title: "#", width: 3, align: "end" },
  { key: "customer", title: "العميل", width: 12 },
  { key: "item", title: "الطلب", width: 14 },
  { key: "total", title: "الإجمالي", width: 8, align: "end" },
];
const orders = [
  { id: 1, customer: "سارة", item: "لاتيه", total: 45 },
  { id: 2, customer: "مُحَمَّد", item: "كَرَك 2 × ☕", total: 50 },
  { id: 3, customer: "عبد الرحمن الشافعي", item: "Iced Mocha", total: 65.5 },
  { id: 14, customer: "Omar", item: "كيكة 🎂 بالشوكولاتة", total: 120 },
];
console.log(table(columns, orders.map(o => ({ ...o, total: o.total.toFixed(2) }))));
~~~

## كل حتة بتعمل إيه

- **[[cellWidth]]**: بيمشي على الـ graphemes (درس «Intl.Segmenter»)، فـ «مَّ» (حرف + فتحة + شدة) خانة واحدة. والإيموجي ([[\p{Extended_Pictographic}]]) والأعلام ([[\p{Regional_Indicator}]]) خانتين، لأن الترمنال بيرسمهم عريضين. ده تقريب كويس مش قانون: فيه رموز تانية عريضة (صيني وياباني) لو بياناتك فيها زوّد [[\p{East_Asian_Width=W}]]... وده مش متاح في regex الـ JS، فالحل وقتها مكتبة زي [[string-width]].
- **[[fit]]**: بيضيف grapheme ورا التاني لحد ما يفضل خانة واحدة لـ [[…]]. الشرط [[> width - 1]] هو اللي بيسيب الخانة دي. والقص على graphemes يعني الإيموجي والتشكيل عمرهم ما يتقسموا.
- **[[pad]]**: بيحسب المسافات بنفسه بـ [[" ".repeat(width - cellWidth(t))]] بدل [[padEnd]]، لأن [[padEnd]] بيعد code units. و [[align === "end"]] للأرقام عشان الآحاد تحت الآحاد.
- **[[table]]**: كل صف بيتعمل بنفس الدالة [[line]]، والفاصل [[" │ "]] تلات خانات زي [["─┼─"]] بالظبط، فالخط الأفقي بيقابل الرأسي.
- **[[toFixed(2)]] قبل الجدول**: الجدول بيعرض نص، فالتنسيق بيتعمل مرة واحدة برّه.

## الغلطة اللي حصلت

أول نسخة كانت [[pad]] فيها [[text.padEnd(width)]]. الناتج:

~~~text الناتج بـ padEnd العادي (العمود التاني بس)
سارة........|
مُحَمَّد....|
~~~

«مُحَمَّد» طولها 8 code units (٤ حروف + ٤ علامات)، فـ [[padEnd(12)]] زوّدت ٤ نقط بس، والعمود اتزحلق ٤ خانات. التصليح هو [[cellWidth]]. وغلطة تانية في التصميم: لو [[fit]] كانت بتقص بـ [[slice(0, width - 1)]] كانت هتقص «كيكة 🎂» في نص الإيموجي، ويطلع حرف مكسور ([[\uFFFD]] في الترمنال).` },
        { lvl: 'كبير', t: R`textkit: أداة سطر أوامر تفحص وتنضّف أي ملف نص`, what: R`أداة حقيقية تنفع تستخدمها في الشغل على أي ملف (CSV من Excel، أو ملف ترجمة، أو تصدير من سيستم قديم). ٤ ملفات: [[lib.js]] فيه الدوال بس ([[decode]] و [[stats]] و [[clean]] و [[inspect]]) من غير قراية ملفات ولا طباعة، و [[cli.js]] بيقرا الأوامر ويطبع ويحوّل الأخطاء لرسايل و exit codes، و [[lib.test.js]] اختبارات [[node --test]]، و [[package.json]]. الأوامر: [[stats]] (length و code points و graphemes و كلمات و جمل و سطور و bytes وعدد الحروف المخفية و [[U+FFFD]])، و [[clean]] (CRLF ← LF، و [[toWellFormed]]، و NFC، و NBSP ← مسافة، وشيل الحروف المخفية **من غير** ما يبوّظ الإيموجي، و [[trimEnd]] لكل سطر، وسطور فاضية كتير ← واحد، وسطر جديد واحد في الآخر، وبيقول غيّر إيه)، و [[inspect]] (جدول «كاشف الحروف المخفية»). بيقرا من ملف أو من الـ stdin بـ [[-]]، والملف اللي مش UTF-8 سليم بيترفض باقتراح [[--encoding windows-1256]]. بيجمع «كاشف الحروف المخفية» و «عدّاد البوست»، ومن دروس الوحدة كلها، و «try و catch و finally» و «import و export».`, done: R`[[node --test]] بيطبع ١٣ اختبار كلهم ✔. [[clean]] على ملفه نفسه تاني بيقول «اتغيّر: ولا حاجة» (التشغيل مرتين نفس الناتج). العيلة الإيموجي فاضلة grapheme واحد بعد [[clean]]. والـ exit codes: ملف مش موجود 2، وأمر غلط 1، و UTF-8 بايظ 3، وخطأ مش متوقع 70، والنجاح 0.`, ext: R`زوّد أمر [[search]] بـ [[searchKey]] من مشروع «بحث في أسماء العملاء»، وخيار [[--max]] للـ [[stats]] يرجّع exit code 1 لو الحروف الظاهرة أكتر من الحد (ينفع في CI على ملفات الترجمة)، وخلّي [[inspect]] يطبع بس الحروف المخفية بـ [[--hidden]]، و [[bin]] في [[package.json]] عشان يتسطب بـ [[npm link]].`, sol: R`## هتشوف إيه

ملف متبهدل زي اللي بيطلع من Excel أو من نسخ ولصق: BOM في الأول، وأسطر ويندوز، ومسافات في آخر السطور، وحروف مخفية جوه اسم، وسطور فاضية كتير، وعيلة إيموجي:

~~~text الناتج: node cli.js stats messy.txt
length      68
codePoints  65
graphemes   55
words       9
sentences   3
lines       6
bytes       114
invisible   2
replacement 0
wellFormed  true
~~~

~~~text الناتج: node cli.js clean messy.txt --out messy.clean.txt
اتغيّر: CRLF بقى LF، NBSP بقت مسافة، حروف مخفية اتشالت، مسافات آخر السطر اتشالت، سطور فاضية زيادة اتشالت
~~~

~~~text الناتج: node cli.js stats messy.clean.txt ثم clean عليه تاني
length      53
codePoints  50
graphemes   46
words       8
sentences   3
lines       4
bytes       94
invisible   0
replacement 0
wellFormed  true
اتغيّر: ولا حاجة
~~~

ملف محفوظ بـ Windows-1256 (الـ encoding العربي القديم بتاع ويندوز):

~~~text الناتج: node cli.js inspect old.txt ثم بـ --encoding windows-1256
textkit: الملف مش UTF-8 سليم. لو اتحفظ من برنامج قديم جرّب --encoding windows-1256
   0  U+0627    ا  حرف
   1  U+0644    ل  حرف
   2  U+0637    ط  حرف
   3  U+0644    ل  حرف
   4  U+0628    ب  حرف
   5  U+0020    ·  مسافة
   6  U+0648    و  حرف
   7  U+0635    ص  حرف
   8  U+0644    ل  حرف
   9  U+000D    ·  مسافة
  10  U+000A    ·  مسافة
~~~

والأخطاء، كل واحد برسالة و exit code (اتطبع بعد كل أمر بـ [[echo "exit=$?"]] في Git Bash):

~~~text الناتج
$ node cli.js
الاستخدام: node cli.js <stats|clean|inspect> <ملف أو -> [--encoding windows-1256] [--out ملف]
exit=1
$ node cli.js count x
textkit: أمر مش معروف: count
الاستخدام: node cli.js <stats|clean|inspect> <ملف أو -> [--encoding windows-1256] [--out ملف]
exit=1
$ node cli.js stats nope.txt
textkit: الملف مش موجود: nope.txt
exit=2
$ node cli.js stats .
textkit: ده فولدر مش ملف: .
exit=2
$ node cli.js stats old.txt --encoding
textkit: --encoding محتاجة قيمة بعدها
exit=1
$ node cli.js stats old.txt --encoding klingon
textkit: encoding مش معروف: klingon
exit=1
~~~

## شجرة الملفات وترتيب البناء

~~~text textkit/
textkit/
├── package.json   "type": "module" و npm test
├── lib.js         الدوال: decode و stats و clean و inspect و TextkitError
├── cli.js         الأوامر والقراية والطباعة والـ exit codes
├── lib.test.js    ١٣ اختبار بـ node:test
└── make-samples.js بيعمل messy.txt و old.txt اللي الأوامر فوق اشتغلت عليهم
~~~

اتبنى بالترتيب ده: [[lib.js]] الأول (دوال بتاخد نص وترجّع نتيجة، تتجرّب في الـ REPL)، وبعدين [[lib.test.js]] على كل دالة، وبعدين [[cli.js]] لما الدوال اتثبتت، وفي الآخر اختبارين للـ CLI نفسه بيشغّلوه كبرنامج.

## الكود

~~~json package.json
{
  "name": "textkit",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

~~~js lib.js
// lib.js: الدوال نفسها، من غير أي قراية ملفات أو طباعة، عشان تتختبر لوحدها
const graphemeSeg = new Intl.Segmenter("ar", { granularity: "grapheme" });
const wordSeg = new Intl.Segmenter("ar", { granularity: "word" });
const sentenceSeg = new Intl.Segmenter("ar", { granularity: "sentence" });

// حروف مخفية ملهاش لازمة في داتا: ZWSP و LRM و RLM و ALM و BOM و word joiner وعلامات الاتجاه
// ZWJ (200D) و ZWNJ (200C) مش هنا بقصد: الإيموجي والفارسي محتاجينهم
const INVISIBLE = /[\u{200B}\u{200E}\u{200F}\u{061C}\u{FEFF}\u{2060}\u{202A}-\u{202E}\u{2066}-\u{2069}]/gu;

export class TextkitError extends Error {
  constructor(message, exitCode) {
    super(message);
    this.name = "TextkitError";
    this.exitCode = exitCode;
  }
}

export function decode(bytes, encoding = "utf-8") {
  const enc = encoding.toLowerCase();
  if (enc === "utf-8" || enc === "utf8") {
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      throw new TextkitError("الملف مش UTF-8 سليم. لو اتحفظ من برنامج قديم جرّب --encoding windows-1256", 3);
    }
  }
  let decoder;
  try {
    decoder = new TextDecoder(enc);
  } catch {
    throw new TextkitError("encoding مش معروف: " + encoding, 1);
  }
  return decoder.decode(bytes);
}

const countOf = (segmenter, text, keep = () => true) => {
  let n = 0;
  for (const s of segmenter.segment(text)) if (keep(s)) n++;
  return n;
};

export function stats(text) {
  return {
    length: text.length,
    codePoints: [...text].length,
    graphemes: countOf(graphemeSeg, text),
    words: countOf(wordSeg, text, s => s.isWordLike),
    sentences: countOf(sentenceSeg, text, s => s.segment.trim() !== ""),
    lines: text === "" ? 0 : text.split(/\r\n|\r|\n/).length - (/(\r\n|\r|\n)$/.test(text) ? 1 : 0),
    bytes: new TextEncoder().encode(text).length,
    invisible: (text.match(INVISIBLE) || []).length,
    replacement: (text.match(/\u{FFFD}/gu) || []).length,
    wellFormed: text.isWellFormed(),
  };
}

export function clean(text) {
  const changes = [];
  let t = text;
  const step = (name, fn) => {
    const before = t;
    t = fn(t);
    if (t !== before) changes.push(name);
  };
  step("CRLF بقى LF", s => s.replace(/\r\n?/g, "\n"));
  step("surrogate مكسور اتبدل بـ U+FFFD", s => s.toWellFormed());
  step("NFC", s => s.normalize("NFC"));
  step("NBSP بقت مسافة", s => s.replace(/\u{A0}/gu, " "));
  step("حروف مخفية اتشالت", s => s.replace(INVISIBLE, ""));
  step("مسافات آخر السطر اتشالت", s => s.split("\n").map(line => line.trimEnd()).join("\n"));
  step("سطور فاضية زيادة اتشالت", s => s.replace(/\n{3,}/g, "\n\n"));
  step("سطر جديد واحد في الآخر", s => (s.trim() === "" ? "" : s.replace(/\n*$/, "\n")));
  return { text: t, changes };
}

const NAMES = new Map([
  [0x00a0, "NBSP"], [0x200b, "ZWSP"], [0x200c, "ZWNJ"], [0x200d, "ZWJ"], [0x200e, "LRM"],
  [0x200f, "RLM"], [0x061c, "ALM"], [0xfeff, "BOM"], [0x0640, "TATWEEL"],
]);

export function inspect(text) {
  const rows = [];
  let index = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    let kind = "رمز";
    if (NAMES.has(cp)) kind = "مخفي " + NAMES.get(cp);
    else if (/\p{M}/u.test(ch)) kind = "تشكيل";
    else if (/\p{L}/u.test(ch)) kind = "حرف";
    else if (/\p{Nd}/u.test(ch)) kind = "رقم";
    else if (/\s/u.test(ch)) kind = "مسافة";
    else if (/\p{Extended_Pictographic}/u.test(ch)) kind = "إيموجي";
    else if (/\p{Cf}|\p{Cs}/u.test(ch)) kind = "مخفي";
    const hex = "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
    const shown = /^(مخفي|تشكيل|مسافة)/.test(kind) ? "·" : ch;
    rows.push(String(index).padStart(4) + "  " + hex.padEnd(8) + "  " + shown + "  " + kind);
    index += ch.length;
  }
  return rows;
}
~~~

~~~js cli.js
// cli.js: بيقرا الأوامر والملف، وبيطبع، وبيحوّل كل خطأ لرسالة و exit code
import { readFileSync, writeFileSync } from "node:fs";
import { decode, stats, clean, inspect, TextkitError } from "./lib.js";

const USAGE = "الاستخدام: node cli.js <stats|clean|inspect> <ملف أو -> [--encoding windows-1256] [--out ملف]";

function parse(argv) {
  const opts = { encoding: "utf-8", out: null, args: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--encoding" || argv[i] === "--out") {
      const value = argv[++i];
      if (value === undefined) throw new TextkitError(argv[i - 1] + " محتاجة قيمة بعدها", 1);
      opts[argv[i - 1].slice(2)] = value;
    } else opts.args.push(argv[i]);
  }
  return opts;
}

function readInput(file) {
  try {
    return readFileSync(file === "-" ? 0 : file);
  } catch (e) {
    if (e.code === "ENOENT") throw new TextkitError("الملف مش موجود: " + file, 2);
    if (e.code === "EISDIR") throw new TextkitError("ده فولدر مش ملف: " + file, 2);
    throw e;
  }
}

function run(argv) {
  const { encoding, out, args } = parse(argv);
  const [command, file] = args;
  if (!command || command === "--help") {
    console.log(USAGE);
    return command ? 0 : 1;
  }
  if (!["stats", "clean", "inspect"].includes(command)) throw new TextkitError("أمر مش معروف: " + command + "\n" + USAGE, 1);
  if (!file) throw new TextkitError("ناقص اسم الملف (أو - عشان يقرا من الـ stdin)\n" + USAGE, 1);

  const text = decode(readInput(file), encoding);
  if (command === "stats") {
    for (const [key, value] of Object.entries(stats(text))) console.log(key.padEnd(12) + String(value));
  } else if (command === "clean") {
    const result = clean(text);
    if (out) writeFileSync(out, result.text);
    else process.stdout.write(result.text);
    console.error("اتغيّر: " + (result.changes.join("، ") || "ولا حاجة"));
  } else {
    console.log(inspect(text).join("\n"));
  }
  return 0;
}

try {
  process.exitCode = run(process.argv.slice(2));
} catch (e) {
  if (e instanceof TextkitError) {
    console.error("textkit: " + e.message);
    process.exitCode = e.exitCode;
  } else {
    console.error("textkit: خطأ مش متوقع، ابعت الرسالة دي:");
    console.error(e);
    process.exitCode = 70;
  }
}
~~~

~~~js lib.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { decode, stats, clean, inspect, TextkitError } from "./lib.js";

const FAMILY = "\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467}";

test("stats: الإيموجي والتشكيل حرف ظاهر واحد", () => {
  const s = stats("مُحَمَّد " + FAMILY);
  assert.equal(s.length, 17);
  assert.equal(s.codePoints, 14);
  assert.equal(s.graphemes, 6);
  assert.equal(s.words, 1);
});

test("stats: نص فاضي كله أصفار", () => {
  const s = stats("");
  assert.deepEqual([s.length, s.graphemes, s.words, s.lines, s.bytes], [0, 0, 0, 0, 0]);
});

test("stats: بيعد السطور مع CRLF ومن غير سطر أخير", () => {
  assert.equal(stats("أ\r\nب\r\n").lines, 2);
  assert.equal(stats("أ\nب").lines, 2);
});

test("clean: CRLF ومسافات آخر السطر والحروف المخفية", () => {
  const r = clean("اسم  \r\nسا\u{200B}رة\u{200F}\r\n\r\n\r\n\r\nآخر");
  assert.equal(r.text, "اسم\nسارة\n\nآخر\n");
  assert.ok(r.changes.includes("حروف مخفية اتشالت"));
});

test("clean: الـ ZWJ جوه الإيموجي بيفضل", () => {
  const r = clean("عيلة " + FAMILY);
  assert.equal(stats(r.text.trimEnd()).graphemes, 6);
});

test("clean: الهمزة المفكوكة بتتجمع (NFC)", () => {
  assert.equal(clean("\u{627}\u{654}حمد").text, "\u{623}حمد\n");
});

test("clean: surrogate مكسور بيبقى U+FFFD", () => {
  const r = clean("تمام " + "\u{1F600}".slice(0, 1));
  assert.equal(r.text, "تمام \u{FFFD}\n");
  assert.ok(r.text.isWellFormed());
});

test("clean: التشغيل مرتين = نفس الناتج", () => {
  const once = clean(" أ\u{A0}ب \r\n\r\n\r\nج").text;
  const twice = clean(once);
  assert.equal(twice.text, once);
  assert.deepEqual(twice.changes, []);
});

test("decode: UTF-8 بايظ بيرمي TextkitError بكود 3", () => {
  assert.throws(() => decode(Uint8Array.from([0xc7, 0xe1])), e => e instanceof TextkitError && e.exitCode === 3);
});

test("decode: windows-1256 والـ BOM", () => {
  assert.equal(decode(Uint8Array.from([0xc7, 0xe1, 0xd8, 0xe1, 0xc8]), "windows-1256"), "الطلب");
  assert.equal(decode(Uint8Array.from([0xef, 0xbb, 0xbf, 0x61])), "a");
  assert.throws(() => decode(new Uint8Array(), "klingon"), /encoding مش معروف/);
});

test("inspect: بيعلّم المخفي ومكانه بالـ code units", () => {
  const rows = inspect("\u{1F600}\u{200B}ا");
  assert.match(rows[1], /^\s+2\s+U\+200B\s+·\s+مخفي ZWSP$/);
});

const cli = (...args) => spawnSync(process.execPath, ["cli.js", ...args], { encoding: "utf8", input: "سطر  \r\n" });

test("cli: ملف مش موجود = exit 2", () => {
  const r = cli("stats", "nope.txt");
  assert.equal(r.status, 2);
  assert.match(r.stderr, /الملف مش موجود: nope\.txt/);
});

test("cli: أمر غلط = exit 1، و - بيقرا من الـ stdin", () => {
  assert.equal(cli("count", "x").status, 1);
  const r = cli("clean", "-");
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "سطر\n");
});
~~~

~~~js make-samples.js
// make-samples.js: بيعمل ملفين تجربة: واحد متبهدل زي تصدير Excel، وواحد Windows-1256 قديم
import { writeFileSync } from "node:fs";

writeFileSync("messy.txt", "\u{FEFF}طلب رقم 25  \r\nالعميل: سا\u{200B}رة\u{A0}أحمد\u{200F}\r\n\r\n\r\n\r\nالحالة: اتشحن \u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467}   \r\n");
writeFileSync("old.txt", Uint8Array.from([0xc7, 0xe1, 0xd8, 0xe1, 0xc8, 0x20, 0xe6, 0xd5, 0xe1, 0x0d, 0x0a]));
console.log("اتعمل messy.txt و old.txt");
~~~

[[node make-samples.js]] الأول، وبعدها كل أوامر «هتشوف إيه» فوق. الملف التاني bytes بـ Windows-1256 لكلمتين «الطلب وصل»: [[0xC7]] هي «ا» في الجدول ده، و [[0x0D 0x0A]] آخر السطر.

~~~text الناتج: node --test (Node 24.22، ويندوز 11)
✔ stats: الإيموجي والتشكيل حرف ظاهر واحد (1.103ms)
✔ stats: نص فاضي كله أصفار (0.6841ms)
✔ stats: بيعد السطور مع CRLF ومن غير سطر أخير (0.2045ms)
✔ clean: CRLF ومسافات آخر السطر والحروف المخفية (0.3448ms)
✔ clean: الـ ZWJ جوه الإيموجي بيفضل (0.2365ms)
✔ clean: الهمزة المفكوكة بتتجمع (NFC) (0.1579ms)
✔ clean: surrogate مكسور بيبقى U+FFFD (0.1346ms)
✔ clean: التشغيل مرتين = نفس الناتج (0.16ms)
✔ decode: UTF-8 بايظ بيرمي TextkitError بكود 3 (0.4912ms)
✔ decode: windows-1256 والـ BOM (0.3418ms)
✔ inspect: بيعلّم المخفي ومكانه بالـ code units (1.2289ms)
✔ cli: ملف مش موجود = exit 2 (62.1793ms)
✔ cli: أمر غلط = exit 1، و - بيقرا من الـ stdin (118.3663ms)
ℹ tests 13
ℹ suites 0
ℹ pass 13
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 270.7218
~~~

## أهم القرارات في الكود

- **[[lib.js]] مبيطبعش ومبيقراش ملفات.** كل دالة بتاخد نص وترجّع نتيجة، فالاختبار بيناديها على طول. و [[cli.js]] هو الوحيد اللي بيلمس [[process]] و [[fs]]. ده نفس التقسيم في أي أداة محترمة.
- **[[TextkitError]] بـ [[exitCode]]:** الخطأ اللي احنا عارفينه (ملف مش موجود، أمر غلط) بيطلع سطر مفهوم و exit code ثابت يتكتب في التوثيق. وأي خطأ تاني (باج عندنا) بيطبع الـ error كامل و exit code 70، عشان ميتخبّاش ورا رسالة عامة.
- **[[TextDecoder("utf-8", { fatal: true })]]:** من غير [[fatal]]، الـ bytes الغلط بتبقى [[U+FFFD]] في صمت (زي [[readFileSync(f, "utf8")]]) والنص يتبوظ من غير ما حد يعرف. هنا بنرفض ونقترح الـ encoding الصح. وملحوظة اتقاست: [[TextDecoder]] **بيشيل الـ BOM** من أول الملف لوحده، عشان كده [[stats]] على [[messy.txt]] قال [[invisible 2]] (ZWSP و RLM) مع إن الملف فيه BOM كمان.
- **[[readFileSync(0)]]:** الرقم 0 هو الـ stdin، فـ [[node cli.js clean - < file.txt]] أو [[type file.txt | node cli.js stats -]] بيشتغلوا.
- **[[clean]] بتسجّل اللي اتغيّر بس:** كل خطوة بتتقارن بنسخة قبلها. ده اللي بيخلي التشغيل التاني يقول «ولا حاجة»، وده اختبار إن الأداة **idempotent** (التشغيل مرتين = مرة).
- **الرسالة على stderr والنص على stdout:** فـ [[node cli.js clean f.txt > out.txt]] بيكتب النص النضيف في الملف، ورسالة «اتغيّر» بتفضل على الشاشة.

## الغلطة اللي التستات مسكتها

أبسط طريقة تشيل «الحروف المخفية» هي [[/\p{Cf}/gu]] (كل حروف التنسيق). جرّبناها مكان [[INVISIBLE]]:

~~~text الناتج: node --test بعد ما INVISIBLE بقت /\p{Cf}/gu
✖ clean: الـ ZWJ جوه الإيموجي بيفضل (0.7732ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  8 !== 6

ℹ pass 12
ℹ fail 1
~~~

[[\p{Cf}]] فيها الـ ZWJ ([[U+200D]]) اللي بيلزق أفراد العيلة في إيموجي واحد، فاتشال، والعيلة بقت ٣ أشخاص جنب بعض (٨ حروف ظاهرة بدل ٦). عشان كده [[INVISIBLE]] قايمة محددة باللي ملوش لازمة، والتعليق اللي فوقها بيقول ليه ZWJ و ZWNJ مش فيها.` },
        { lvl: 'فكرة', t: R`معاينة الرسالة في الإشعار`, what: R`أي تطبيق شات أو متجر بيعرض أول جزء من الرسالة في إشعار أو في لستة. اكتب [[excerpt(text, max)]] بترجّع معاينة قصيرة: مبتكسرش إيموجي ولا تشكيل، وبتقف عند آخر كلمة كاملة، وبتشيل الفاصلة أو النقطة اللي في الآخر قبل [[…]]، والكلمة الطويلة جدًا (لينك مثلًا) بتتقص في نصها بدل ما المعاينة تبقى فاضية. اختار انت الـ [[max]] بيتعد بإيه وليه.`, done: R`الناتج عمره ما يعدّي [[max]] حرف ظاهر بما فيهم [[…]]، و [[isWellFormed()]] دايمًا [[true]] حتى لو الرسالة نفسها فيها surrogate مكسور، والرسالة القصيرة بترجع زي ما هي من غير [[…]].`, ext: R`خلّي [[excerpt]] تاخد كلمة البحث وتعمل المعاينة حواليها (زي نتايج البحث)، وتعلّمها بـ [[[...]]] من غير ما تكسر حرف.`, sol: R`## نسخة نموذجية

~~~text الناتج: node excerpt.js (max = 30)
"الطلب رقم 25 اتشحن وهيوصلك…" 27 true
"تمام" 4 true
"مُحَمَّد: شكرًا جدًا جدًا على الهدية…" 30 true
"سوبركاليفراجيليستكإكسبياليدوش…" 30 true
"تمام �" 6 true
~~~

كل سطر: المعاينة، وعدد حروفها الظاهرة، وهل هي well-formed.

~~~js excerpt.js
// excerpt.js: معاينة رسالة لإشعار: بتقف عند آخر كلمة كاملة، ومبتكسرش حرف ظاهر
const graphemes = new Intl.Segmenter("ar", { granularity: "grapheme" });
const words = new Intl.Segmenter("ar", { granularity: "word" });

function excerpt(text, max = 40) {
  const clean = String(text).toWellFormed().normalize("NFC").replace(/\s+/g, " ").trim();
  const parts = [...graphemes.segment(clean)];
  if (parts.length <= max) return clean;

  const limit = parts[max - 1].index;
  let cut = 0;
  for (const w of words.segment(clean)) {
    if (w.index + w.segment.length > limit) break;
    if (w.isWordLike) cut = w.index + w.segment.length;
  }
  if (cut === 0) cut = limit;
  return clean.slice(0, cut).replace(/[\s،,.!؟?:;-]+$/u, "") + "…";
}

const cases = [
  "الطلب رقم 25 اتشحن وهيوصلك بكرة الساعة 4 العصر، تابعه من التطبيق 👍🏽",
  "تمام",
  "مُحَمَّد:   شكرًا جدًا جدًا على الهدية الجميلة دي 🎁🎁🎁 بجد فرحتني",
  "سوبركاليفراجيليستكإكسبياليدوشسسسسسسسسسسسسسسسسسسسسسسسسسسس",
  "تمام " + "\u{1F600}".slice(0, 1),
];
for (const c of cases) {
  const e = excerpt(c, 30);
  console.log(JSON.stringify(e), [...graphemes.segment(e)].length, e.isWellFormed());
}
~~~

## ليه التصميم ده

- **[[max]] بالحروف الظاهرة**، لأن ده اللي بياخد مساحة في الإشعار. بالـ [[length]] كانت الرسالة اللي فيها إيموجي هتتقص بدري.
- **[[limit]] هو مكان (بالـ code units) أول grapheme مش هيدخل**، و [[…]] هي اللي بتاخد مكانه. فالناتج آخره [[max]] حرف ظاهر بالظبط في أسوأ حالة.
- **آخر كلمة كاملة قبل [[limit]]**: الـ word segmenter بيدّي مكان كل كلمة ([[index]]) وطولها، فبنحتفظ بآخر نهاية كلمة لسه جوه الحد. ولو مفيش ولا كلمة كاملة (كلمة واحدة طويلة) [[cut]] بيفضل صفر، فبنقص عند [[limit]] نفسه.
- **[[toWellFormed()]] الأول**: الرسالة ممكن تيجي من API مقصوصة غلط، وأي [[encodeURIComponent]] بعدين هيرمي [[URIError]]. هنا بتبقى [[�]] بدل ما التطبيق يقع.
- **شيل الفواصل من الآخر**: «على الهدية،…» شكلها وحش، فالـ regex الأخير بيشيل المسافات والعلامات العربي والإنجليزي قبل [[…]].

الحالة اللي النسخة دي مش بتغطيها: كلمة مقسومة بـ Segmenter غلط. «والتوصيل» كلمة واحدة عنده (حرف العطف لازق)، وده صح للمعاينة بس مش لعدّ الكلمات بدقة.` },
      ],
      items: [
        {
          cmd: "string literals و String()",
          title: "تكتب النص بـ ' أو \" أو backtick، وتعرف إمتى بيبقى نص وإمتى String object",
          desc: R`الـ string literal هو النص اللي بتكتبه في الكود بين علامتين: [['...']] أو [["..."]] أو backtick. التلاتة بيطلّعوا نفس النوع بالظبط ([[string]])، والقاعدة الوحيدة إن العلامة اللي فتحت هي اللي تقفل، وإلا الملف كله مش هيشتغل ويطلع [[SyntaxError]].

وفيه طريقتين تانيين بيطلّعوا نص من غير ما تكتبه:
• [[String(x)]]: بتحوّل أي قيمة لنص، حتى [[null]] و [[undefined]].
• [[new String(x)]]: بتعمل **object** شايل نص جواه. نادر، وبيعمل باجات: [[typeof]] بتاعه [["object"]] و [[===]] مع النص بيرجّع [[false]]. و [[valueOf()]] و [[toString()]] بيطلّعوا النص الحقيقي من جواه.`,
          example: R`const single = 'Sara';
const double = "Sara";
const tick = $__btSara$__bt;
console.log(single === double, double === tick);
console.log("قال: 'أهلًا'", 'it\'s', $__bt"$__{single}" قالت it's$__bt);
console.log(String(42), String(null), String([1, 2]));
const boxed = new String("abc");
console.log(typeof "abc", typeof boxed, boxed === "abc", boxed.valueOf() === "abc");`,
          try: R`اعمل ملف [[quotes.js]] فيه سطر واحد: [[const name = "Sara';]] (بتفتح بـ [["]] وبتقفل بـ [[']])، وشغّله بـ [[node quotes.js]] واقرا الرسالة والسهم [[^^^^]]. صلّحه بطريقتين. وبعدين في الـ REPL قارن [[typeof new String("")]] و [[Boolean(new String(""))]] بـ [[typeof ""]] و [[Boolean("")]].`,
          sol: R`الملف بيقع قبل ما أي سطر يشتغل:

~~~text الناتج (Node 24.22، والـ stack اللي تحته اتشال)
...\quotes.js:1
const name = "Sara';
             ^^^^^^^

SyntaxError: Invalid or unexpected token
~~~

التصليح: [[const name = "Sara";]] أو [[const name = 'Sara';]]. وفي الـ REPL: [[typeof new String("")]] بـ [["object"]] و [[Boolean(new String(""))]] بـ [[true]] (أي object حتى لو فاضي truthy)، أما [[typeof ""]] بـ [["string"]] و [[Boolean("")]] بـ [[false]].`,
          teach: R`## الفكرة

أي نص في الكود لازم يبقى بين علامتين عشان JavaScript يعرف فين بيبدأ وفين بيخلص. اسمه **string literal** («النص الحرفي»: القيمة مكتوبة في الكود زي ما هي). المثال بيكتب نفس الاسم بالتلات علامات، ويحط علامة جوه نص، ويحوّل قيم لنص بـ [[String()]]، ويعمل [[new String]] عشان تشوف الفرق. كله اتشغّل كملف بـ Node 24.22 على ويندوز 11.

---

## ١. تلات علامات، نوع واحد

~~~js quotes.js
const single = 'Sara';
const double = "Sara";
const tick = $__btSara$__bt;
console.log(single === double, double === tick);
~~~

~~~text الناتج
true true
~~~

- [['Sara']]: single quotes (علامة تنصيص مفردة).
- [["Sara"]]: double quotes (مزدوجة).
- backtick: العلامة اللي على الكيبورد فوق Tab على الشمال. ده الـ template literal (درس «template literals»)، وبيسمح بـ [[$__{ }]] وبسطور كتير.

[[===]] بيقارن القيمة والنوع، وطلع [[true]]: التلاتة **نفس النص بالظبط**. العلامة مش جزء من النص، هي بس بتقول لـ JavaScript «النص بيبدأ هنا وبيخلص هنا». يعني اختيار العلامة ستايل، ومعظم المشاريع بتختار واحدة وأداة زي Prettier بتوحّدها (درس «ESLint و Prettier»).

---

## ٢. لازم العلامتين يبقوا شبه بعض

ده أشهر SyntaxError لأي حد لسه بادئ. الملف ده بيفتح بـ [["]] وبيقفل بـ [[']]:

~~~js quotes.js
const name = "Sara';
console.log(name);
~~~

~~~text الناتج (Node 24.22، والـ stack اللي تحته اتشال)
...\quotes.js:1
const name = "Sara';
             ^^^^^^^

SyntaxError: Invalid or unexpected token
~~~

اللي حصل: JavaScript شاف [["]] فقال «نص بدأ»، وفضل يدوّر على [["]] تانية تقفله. الـ [[']] جوه النص عادي، فكمّل لحد آخر السطر ومالقاش. والنص العادي ([[']] أو [["]]) **ممنوع يعدّي على سطر جديد**، فقال «فيه حاجة مش مفهومة» (Invalid or unexpected token). والسهم [[^^^^^^^]] بيبدأ من مكان العلامة اللي فتحت.

وخد بالك من حاجتين:
- السطر التاني ([[console.log]]) **ماتشغلش**. الـ SyntaxError بيحصل وقت قراية الملف قبل تنفيذ أي سطر، فمفيش «نص البرنامج اشتغل».
- رقم السطر بعد اسم الملف ([[:1]]) هو أول حاجة تبص عليها.

نفس المحرك (V8) هو اللي في Chrome، واتجرّب في Chrome 157 وطلع نفس الرسالة. وفي Firefox و Safari الكلام مختلف (من صفحة MDN للخطأ ده، مش متجرّب هنا): Firefox بيقول [[SyntaxError: '' string literal contains an unescaped line break]]، و Safari بيقول [[SyntaxError: Unexpected EOF]].

---

## ٣. علامة جوه النص

~~~js quotes.js
const msg = 'it's ok';
~~~

~~~text الناتج
const msg = 'it's ok';
                ^

SyntaxError: Unexpected identifier 's'
~~~

هنا النص اتقفل بدري: [['it']] نص كامل، وبعده [[s]] كلمة لوحدها JavaScript مش فاهمها (identifier = اسم). عندك ٣ حلول، والتلاتة في المثال:

| الحل | الكود | إمتى |
|---|---|---|
| علامة تانية بره | [["it's"]] أو [['قال "لا"']] | أسهل حاجة لو النص فيه نوع واحد بس |
| escape بالـ backslash | [['it\'s']] و [["قال \"لا\""]] | لو لازم تفضل على نفس العلامة (ستايل المشروع) |
| backtick | الـ template literal فيه [["]] و [[']] عادي | لو النص فيه النوعين مع بعض |

والـ escape [[\']] معناه «العلامة دي جزء من النص، مش نهايته»، وده موضوع الدرس الجاي كله.

---

## ٤. السطر الجديد ممنوع جوه [["..."]]

~~~js quotes.js
const msg = "سطر أول
سطر تاني";
~~~

~~~text الناتج
const msg = "سطر أول
            ^^^^^^^^

SyntaxError: Invalid or unexpected token
~~~

نفس رسالة القسم ٢. لو عايز سطرين: [["سطر أول\nسطر تاني"]] (الـ [[\n]] في الدرس الجاي)، أو backtick وتكسر السطر بجد.

---

## ٥. علامات Word وواتساب «الذكية»

لو نسخت كود من Word أو من شات، ساعات العلامات بتتحوّل لـ “ و ” (مايلين). دول حروف مختلفة خالص عن [["]]:

~~~text الناتج (الملف فيه const msg = “Hello”;)
const msg = “Hello”;


SyntaxError: Invalid or unexpected token
~~~

حتى السهم مش باين لأن الحرف ده مش بيعتبره بداية حاجة أصلًا. الحل: امسح العلامات واكتبها من الكيبورد في المحرر.

---

## ٦. JSON بيقبل [["]] بس

الـ JSON شبه الـ object في JavaScript بس قواعده أشد: المفاتيح والنصوص لازم بـ [["]].

~~~js json.js
try { JSON.parse("{'a': 1}"); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(JSON.parse('{"a": "1"}'));
~~~

~~~text الناتج
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
{ a: '1' }
~~~

لاحظ إن السطر التاني نفسه مكتوب بـ [['...']] من بره عشان يقدر يحط [["]] جواه من غير escape. ده استخدام حقيقي للعلامتين.

---

## ٧. [[String(x)]]: أي قيمة تبقى نص

~~~js convert.js
console.log(String(42), String(null), String([1, 2]));
~~~

~~~text الناتج
42 null 1,2
~~~

| القيمة | [[String(x)]] | ملحوظة |
|---|---|---|
| [[123]] | [["123"]] | زي [[(123).toString()]] |
| [[null]] | [["null"]] | أما [[null.toString()]] بيرمي [[TypeError: Cannot read properties of null (reading 'toString')]] |
| [[undefined]] | [["undefined"]] | نفس الكلام: مفيش [[.toString()]] عليها |
| [[[1, 2]]] | [["1,2"]] | العناصر بفاصلة من غير مسافة |
| [[{}]] | [["[object Object]"]] | عشان كده بنستخدم [[JSON.stringify]] للـ objects |
| [[Symbol("id")]] | [["Symbol(id)"]] | أما [[$__bt$__{sym}$__bt]] و [["" + sym]] بيرموا [[TypeError: Cannot convert a Symbol value to a string]] |

يعني [[String(x)]] هي الطريقة الآمنة لما مش متأكد القيمة إيه: مبترميش على [[null]] ولا على Symbol.

---

## ٨. [[new String]]: object مش نص

~~~js boxed.js
const boxed = new String("abc");
console.log(typeof "abc", typeof boxed, boxed === "abc", boxed.valueOf() === "abc");
~~~

~~~text الناتج
string object false true
~~~

[[new]] قبل [[String]] بيعمل object جواه النص. ولو طبعته لوحده بـ [[console.log(boxed)]] Node بيكتب [[[String: 'abc']]] عشان يوضح إنه مش نص عادي. والمشاكل:

| التجربة | النتيجة | ليه |
|---|---|---|
| [[boxed === "abc"]] | [[false]] | object ونص نوعين مختلفين |
| [[boxed == "abc"]] | [[true]] | [[==]] بيحوّل الـ object لنص الأول (درس «== و ===») |
| [[new String("abc") === new String("abc")]] | [[false]] | اتنين objects منفصلين، والمقارنة بالمرجع |
| [[Boolean(new String(""))]] | [[true]] | أي object truthy، حتى لو النص اللي جواه فاضي |
| [[[boxed].includes("abc")]] | [[false]] | [[includes]] بيقارن بـ [[===]] تقريبًا |

**القاعدة:** متكتبش [[new String]] أبدًا في كودك. [[String(x)]] من غير [[new]] بترجّع نص عادي، ودي اللي عايزها.

### String.prototype.valueOf و String.prototype.toString

الاتنين بيرجّعوا النص العادي اللي جوه الـ object:

~~~text Node REPL
> new String("abc").valueOf()
'abc'
> new String("abc").toString()
'abc'
> "abc".valueOf()
'abc'
> String.prototype.toString.call(123)
Uncaught TypeError: String.prototype.toString requires that 'this' be a String
~~~

- [[valueOf()]] هي اللي JavaScript بيناديها لوحده لما يحتاج القيمة البسيطة (زي [[boxed == "abc"]]).
- [[toString()]] على string بترجّع نفس النص. والفرق بينها وبين [[String(x)]] إن [[String.prototype.toString]] مبتقبلش غير نص أو String object (السطر الأخير)، و [[String(x)]] بتقبل أي حاجة.
- على النص العادي الاتنين بيرجّعوا النص نفسه، فمفيش سبب تكتبهم على نص عادي. مكانهم الحقيقي: لو جالك [[new String]] من مكتبة قديمة، [[x.valueOf()]] بترجّعه نص.

---

## ٩. طب إزاي [["abc".length]] شغالة والنص مش object؟

~~~js autobox.js
const p = "abc";
p.x = 1;
console.log(p.x);
const o = new String("abc");
o.x = 1;
console.log(o.x);
~~~

~~~text الناتج
undefined
1
~~~

لما تكتب [["abc".length]] JavaScript بيعمل String object مؤقت، ياخد منه الـ [[length]] أو الـ method، ويرميه. عشان كده [[p.x = 1]] اتحطت على object مؤقت واتشال، و [[p.x]] بعدها [[undefined]]. الـ object الحقيقي ([[o]]) بيحتفظ بيها. ده اسمه autoboxing، وهو اللي بيخلي كل methods النصوص اللي في الوحدة دي شغالة على النص العادي.

---

## الخلاصة

| الحاجة | النتيجة | استخدمها؟ |
|---|---|---|
| [['...']] و [["..."]] و backtick | نفس النوع [[string]] | أي واحدة، بس العلامة اللي تفتح هي اللي تقفل |
| نص فيه [[']] | [["it's"]] أو [['it\'s']] أو backtick | آه |
| سطر جديد جوه [["..."]] | SyntaxError | استخدم [[\n]] أو backtick |
| [[String(x)]] | نص من أي قيمة | آه، أأمن من [[x.toString()]] |
| [[new String(x)]] | object | لأ |
| [[valueOf()]] و [[toString()]] | النص اللي جوه | لو جالك String object |`,
          lines: [
            R`نص بين علامتين مفردين [[']]. القيمة [["Sara"]] والعلامة نفسها مش جزء منها.`,
            R`نفس النص بين علامتين مزدوجين [["]]. مفيش فرق في النوع ولا القيمة، الفرق ستايل بس.`,
            R`نفس النص بين علامتين backtick، وده الـ template literal اللي بيسمح بـ [[$__{ }]] وبسطور كتير.`,
            R`[[===]] بيقارن النوع والقيمة، والاتنين [[true]]: التلات أشكال طلّعوا نفس الـ string بالظبط.`,
            R`تلات طرق تحط علامة جوه نص: علامة مختلفة بره، أو escape بـ [[\']]، أو backtick فيه النوعين ومعاه [[$__{single}]].`,
            R`[[String()]] بتحوّل أي قيمة لنص: الرقم [["42"]]، و [[null]] بتبقى [["null"]] من غير ما ترمي error، والـ array عناصرها بفاصلة.`,
            R`[[new String]] بيعمل object جواه النص، مش نص عادي. ده اللي هنقارنه بالنص في السطر الجاي.`,
            R`[[typeof]] للنص [["string"]] وللـ object [["object"]]، و [[===]] بينهم [[false]]، و [[valueOf()]] بترجّع النص العادي فبقت [[true]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي سطر من دول هيطلّع SyntaxError، وإيه رسالته؟ [[const a = 'Sara";]] و [[const b = "it's";]] و [[const c = 'it's';]] و [[const d = $__btit's "ok"$__bt;]] و [[const e = "قال "لا" وخلاص";]]. اكتب توقعك، وبعدين جرّب كل سطر لوحده (من قسم ٢ و ٣ في الشرح).`, done: R`توقعت إن [[a]] و [[c]] و [[e]] بيقعوا، و [[b]] و [[d]] سليمين، وعرفت إن [[c]] و [[e]] رسالتهم «Unexpected identifier» مش «Invalid or unexpected token» وليه.`, sol: R`جرّبت كل سطر لوحده بـ [[new Function(code)]] (بيعمل parse للكود من غير ما يشغّله، ولو فيه SyntaxError بيرميه):

~~~js predict.js
const lines = [
  $__btconst a = 'Sara";$__bt,
  $__btconst b = "it's";$__bt,
  $__btconst c = 'it's';$__bt,
  "const d = $__btit's \"ok\"$__bt;",
  $__btconst e = "قال "لا" وخلاص";$__bt,
];
for (const code of lines) {
  try { new Function(code); console.log("OK   ", code); }
  catch (e) { console.log("ERROR", code, "->", e.name + ": " + e.message); }
}
~~~

~~~text الناتج
ERROR const a = 'Sara"; -> SyntaxError: Invalid or unexpected token
OK    const b = "it's";
ERROR const c = 'it's'; -> SyntaxError: Unexpected identifier 's'
OK    const d = $__btit's "ok"$__bt;
ERROR const e = "قال "لا" وخلاص"; -> SyntaxError: Unexpected identifier 'لا'
~~~

**ليه رسالتين مختلفتين:**
- [[a]]: النص عمره ما اتقفل (مفيش [[']] تانية)، فـ «Invalid or unexpected token».
- [[c]] و [[e]]: النص اتقفل **بدري** عند العلامة اللي جوه، فاللي بعدها ([[s]] أو [[لا]]) بقى كلمة لوحدها في نص الكود: «Unexpected identifier» ومعاها الكلمة نفسها. وده بيقولك فين بالظبط النص اتقفل.
- [[b]] سليم لأن [[']] جوه [["..."]] عادية، و [[d]] سليم لأن الـ backtick بيقبل النوعين.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const msg = "اكتب "تم" لما تخلص";]] بيوقع الملف. صلّحه بـ ٣ طرق مختلفة، وكلهم يطبعوا نفس الجملة (من قسم ٣ في الشرح).`, done: R`عندك ٣ سطور كلهم بيطبعوا «اكتب "تم" لما تخلص» أو «اكتب 'تم' لما تخلص»، وواحد منهم على الأقل بيستخدم escape [[\"]].`, sol: R`~~~js fix.js
const m1 = "اكتب 'تم' لما تخلص";
const m2 = 'اكتب "تم" لما تخلص';
const m3 = "اكتب \"تم\" لما تخلص";
console.log(m1); console.log(m2); console.log(m3);
~~~

~~~text الناتج
اكتب 'تم' لما تخلص
اكتب "تم" لما تخلص
اكتب "تم" لما تخلص
~~~

- [[m1]] غيّر العلامة اللي **جوه** لـ [[']]: أسهل، بس غيّر شكل الجملة نفسها.
- [[m2]] غيّر العلامة اللي **بره** لـ [[']]: الجملة زي ما هي.
- [[m3]] ساب [["]] بره وعمل escape للي جوه بـ [[\"]]: مفيد لو المشروع مُلزم بـ double quotes.
- وطريقة رابعة: backtick بره.

الغلط الشائع: تكتب [["اكتب \"تم" لما تخلص"]] (escape لعلامة واحدة بس)، فالتانية بتقفل النص بدري ويرجع نفس الـ SyntaxError.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[quoteFor(text)]] بترجّع **كود** JavaScript لنص ([[string literal]]) يتنسخ ويشتغل: لو النص مفيهوش [["]] حطه بين [["..."]]، ولو فيه [["]] ومفيهوش [[']] حطه بين [['...']]، وفي أي حالة تانية (فيه الاتنين، أو فيه backslash أو سطر جديد) رجّع [[JSON.stringify(text)]]. حلّها في المربع اللي تحت (من قسم ٣ و ٦ في الشرح).`, done: R`كل الاختبارات عدّت، و [[new Function("return " + quoteFor(x))()]] بيرجّع نفس [[x]] لكل النصوص اللي جربتها (حتى [["سطر\nتاني"]] و [["C:\\temp"]]).`, sol: R`~~~js quote-for.js
function quoteFor(text) {
  if (/[\\\n\r]/.test(text)) return JSON.stringify(text);
  if (!text.includes('"')) return '"' + text + '"';
  if (!text.includes("'")) return "'" + text + "'";
  return JSON.stringify(text);
}
const samples = ["Sara", 'قال "لا"', "it's", $__btit's "ok"$__bt, "سطر\nتاني", "C:\\temp", ""];
for (const s of samples) {
  const lit = quoteFor(s);
  const back = new Function("return " + lit)();
  console.log(lit.padEnd(16), back === s);
}
~~~

~~~text الناتج
"Sara"           true
'قال "لا"'       true
"it's"           true
"it's \"ok\""    true
"سطر\nتاني"      true
"C:\\temp"       true
""               true
~~~

**ليه كده:**
- أول [[if]] بيمسك الحالات اللي محتاجة escape (backslash أو سطر جديد): [[JSON.stringify]] بيعمل escape لكل حاجة صح، وناتجه string literal سليم في JavaScript كمان.
- الحالتين اللي بعده بيختاروا العلامة اللي مش موجودة جوه النص، فمفيش escape خالص والكود يتقري.
- [[new Function("return " + lit)()]] هو الاختبار: بيرجّع الكود نص ويقارنه بالأصل. ولو [[quoteFor]] غلطت هيقع بـ SyntaxError أو يرجّع نص مختلف.

الغلطة الشائعة: تنسى الـ backslash، فـ [["C:\temp"]] بين [["..."]] من غير escape بيبقى [[\t]] (tab) لما يتقري تاني.`, },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[const s = new String("hi");]] وبعدها: [[typeof s]]، و [[s == "hi"]]، و [[s === "hi"]]، و [[s.valueOf() === "hi"]]، و [[new String("hi") === new String("hi")]]، و [[Boolean(new String(""))]]، و [[[s].includes("hi")]]. اكتب الـ ٧ إجابات وبعدين شغّل (من قسم ٨ في الشرح).`, done: R`كتبت قبل التشغيل [["object"]] و [[true]] و [[false]] و [[true]] و [[false]] و [[true]] و [[false]]، وتقدر تشرح الـ [[true]] الوحيدة اللي فيها [[==]].`, sol: R`~~~js boxed.js
const s = new String("hi");
console.log(typeof s);
console.log(s == "hi", s === "hi");
console.log(s.valueOf() === "hi", s.toString() === "hi");
console.log(new String("hi") === new String("hi"));
console.log(Boolean(new String("")) ? "truthy" : "falsy");
console.log([s].includes("hi"), [s.valueOf()].includes("hi"));
~~~

~~~text الناتج
object
true false
true true
false
truthy
false true
~~~

- [[s == "hi"]] بـ [[true]] لأن [[==]] بيحوّل الـ object لقيمة بسيطة بـ [[valueOf()]] الأول. و [[===]] مبيحوّلش، فـ object مش زي string.
- اتنين [[new String]] بنفس النص مش زي بعض: objects بتتقارن بالمرجع (درس «reference و copy»).
- [[new String("")]] truthy: أي object truthy. ده بالظبط الباج اللي في التمرين اللي جاي.
- [[[s].includes("hi")]] بـ [[false]] و [[[s.valueOf()].includes("hi")]] بـ [[true]]: الحل دايمًا إنك ترجّعه نص الأول.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[isBlank(s)]] المفروض ترجّع [[true]] لو القيمة مش نص أو نص فاضي أو مسافات. الكود: [[return typeof s !== "string" || s.trim() === "";]]. مكتبة قديمة في المشروع بتبعت [[new String("Sara")]] أحيانًا، والفورم بيقول «الاسم مطلوب» مع إن الاسم مكتوب. لاقي ليه وصلّحها (من قسم ٨ في الشرح).`, done: R`[[isBlank(new String("Sara"))]] بقت [[false]] و [[isBlank(new String(""))]] [[true]]، والقيم العادية ([[""]] و [["  "]] و [["Sara"]] و [[null]]) نتيجتها زي ما كانت.`, sol: R`~~~js is-blank.js
function isBlankBad(s) { return typeof s !== "string" || s.trim() === ""; }
function isBlank(s) {
  if (s instanceof String) s = s.valueOf();
  return typeof s !== "string" || s.trim() === "";
}
for (const v of ["", "  ", "Sara", new String(""), new String("Sara"), null]) {
  console.log(JSON.stringify(v), isBlankBad(v), isBlank(v));
}
~~~

~~~text الناتج
"" true true
"  " true true
"Sara" false false
"" true true
"Sara" true false
null true true
~~~

**الباج:** [[typeof new String("Sara")]] بـ [["object"]] مش [["string"]]، فأول شرط [[true]] والدالة قالت «فاضي» على اسم مكتوب (الصف الخامس: [[true]] في القديمة و [[false]] في الجديدة).

**التصليح:** [[instanceof String]] بيعرف الـ String object، و [[valueOf()]] بترجّعه نص عادي، وبعدها نفس الفحص القديم. (لاحظ إن [[JSON.stringify]] طبع الـ String object كنص عادي، فمن الناتج لوحده مكنتش هتعرف إنه object: ده اللي بيخلي الباج ده صعب يتلاقي.)

حل تاني: [[s = String(s)]] في الأول، بس ده هيخلي [[null]] تبقى [["null"]] (نص مش فاضي) فالدالة هترجّع [[false]] لـ [[null]]، وده غلط هنا.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة MDN بتاعة [[String]] (قسم String conversion)، لاقي الفرق بين [[String(sym)]] و [["" + sym]] لما [[sym]] يبقى [[Symbol("id")]]. اكتب الإجابة في سطرين، وبعدين اتأكد بالتشغيل.`, done: R`كتبت إن [[String()]] بتتعامل مع الـ Symbol لوحدها وبترجّع [["Symbol(id)"]]، وإن الـ [[+]] (و template literal كمان) بيرمي [[TypeError]]، والتشغيل طلّع نفس الكلام برسالة الخطأ بنصها.`, sol: R`**الإجابة النموذجية:** صفحة MDN بتقول إن [[String(x)]] هي الطريقة الوحيدة اللي بتحوّل Symbol لنص من غير خطأ، لأنها بتتعامل معاه كحالة خاصة. أما [["" + x]] و الـ template literal بيعملوا تحويل ضمني، والتحويل الضمني للـ Symbol ممنوع (عشان محدش يلزق Symbol في نص بالغلط).

~~~js sym.js
const sym = Symbol("id");
console.log(String(sym));
try { console.log("" + sym); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(sym.toString(), sym.description);
~~~

~~~text الناتج
Symbol(id)
TypeError: Cannot convert a Symbol value to a string
Symbol(id) id
~~~

و [[sym.toString()]] شغالة كمان (هي اللي [[String()]] بتناديها)، و [[sym.description]] بترجّع الوصف لوحده من غير [[Symbol( )]]. ده سبب كفاية تستخدم [[String(x)]] في أي دالة log بتطبع قيم مش عارف نوعها.` }
          ],
          check: {
            lang: "js",
            starter: R`function quoteFor(text) {
  return '"' + text + '"';
}`,
            tests: R`test("نص عادي بين \"...\"", () => expect(quoteFor("Sara")).toBe('"Sara"'));
test("فيه \" بس: بين '...'", () => expect(quoteFor('قال "لا"')).toBe("'قال \"لا\"'"));
test("فيه ' بس: بين \"...\"", () => expect(quoteFor("it's")).toBe('"it\'s"'));
test("فيه الاتنين: JSON.stringify", () => expect(quoteFor("it's \"ok\"")).toBe(JSON.stringify("it's \"ok\"")));
test("سطر جديد وbackslash: JSON.stringify", () => { expect(quoteFor("a\nb")).toBe('"a\\nb"'); expect(quoteFor("C:\\temp")).toBe('"C:\\\\temp"'); });
test("الكود اللي بيرجع بيتشغّل ويرجّع نفس النص", () => { for (const s of ["Sara", "it's \"ok\"", "سطر\nتاني", "C:\\x", ""]) expect(new Function("return " + quoteFor(s))()).toBe(s); });`,
            solution: R`function quoteFor(text) {
  if (/[\\\n\r]/.test(text)) return JSON.stringify(text);
  if (!text.includes('"')) return '"' + text + '"';
  if (!text.includes("'")) return "'" + text + "'";
  return JSON.stringify(text);
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Lexical grammar، string literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#string_literals" },
            { t: "MDN: String (التحويل و String objects)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" },
            { t: "MDN: String.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString" },
            { t: "MDN: String.prototype.valueOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf" },
            { t: "MDN Curriculum: JavaScript fundamentals، Text", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
          ],
          pre: ["js/primitives و objects", "js/== و ==="],
          deep: {
            why: R`كل برنامج فيه نصوص، وأول SyntaxError أغلب الناس بتقابله هو علامة تنصيص مش مقفولة. ولما تفهم إن العلامة مش جزء من النص، هتختار العلامة اللي توفّر عليك escapes. و [[new String]] بيظهر في كود قديم ومكتبات وأسئلة انترفيو («ليه [[new String("a") === "a"]] بـ false؟»).`,
            how: R`الـ parser بيقرا الملف حرف حرف. لما يقابل [["]] أو [[']] بيدخل «وضع نص»، وكل اللي بعده جزء من النص لحد ما يقابل **نفس** العلامة من غير backslash قبلها. لو وصل لآخر السطر الأول، ده SyntaxError، والملف كله مبيشتغلش لأن الـ parse بيحصل قبل التنفيذ. الـ backtick مختلف: بيعدّي سطور، وبيفهم [[$__{ }]].

[[String(x)]] من غير [[new]] بتحوّل لنص عادي (primitive). أما [[new String(x)]] بتعمل object فيه خانة داخلية شايلة النص، و [[valueOf()]] بترجّعها. والـ autoboxing هو اللي بيخلي [["abc".toUpperCase()]] شغالة: object مؤقت بيتعمل ويترمي في كل نداء.`,
            when: R`اختار علامة واحدة للمشروع كله (Prettier بيظبطها)، وغيّرها في السطر اللي النص فيه نفس العلامة. استخدم backtick لما فيه [[$__{ }]] أو سطور كتير. [[String(x)]] في أي مكان محتاج نص من قيمة مش عارف نوعها (لوج، عرض، مفتاح). و [[new String]] متستخدمهاش.`,
            mistakes: R`علامة بتفتح غير اللي بتقفل ([[SyntaxError: Invalid or unexpected token]]). وعلامة جوه النص من نفس النوع ([[Unexpected identifier]]). ونسخ كود من Word فيه “ ”. و [[x.toString()]] على قيمة ممكن تبقى [[null]] ([[TypeError]]). و [[new String]] في فحص [[typeof]] أو [[===]] أو [[if]]: الـ object الفاضي truthy. و JSON بـ [[']] بيرفضه [[JSON.parse]].`
          }
        },
        {
          cmd: "escape sequences و String.raw",
          title: "تكتب سطر جديد و tab وأي حرف بكوده جوه النص، أو تقول لـ JavaScript «سيب الـ backslash زي ما هو»",
          desc: R`الـ backslash [[\]] جوه النص معناه «الحرف اللي بعدي مش عادي». [[\n]] سطر جديد، و [[\t]] tab، و [[\\]] backslash واحد، و [[\"]] علامة تنصيص جوه نص بنفس العلامة. وتقدر تكتب أي حرف في Unicode بكوده: [[\x41]] (رقمين hex) و [[\u0627]] (أربعة) و [[\u{1F600}]] (أي عدد لحد [[10FFFF]]).

وساعات الـ backslash نفسه هو اللي عايزه (مسار ويندوز [[C:\new]]، أو regex زي [[\d+]]). هنا [[String.raw]] بيرجّع النص زي ما اتكتب بالظبط، من غير ما يفسّر أي escape.`,
          example: R`console.log("سطر\nسطر تاني");
console.log("اسم\tسعر");
console.log('it\'s', "قال \"أهلًا\"", "C:\\Users\\sara");
console.log("\x41", "\u0627", "\u{1F600}");
console.log("C:\new\table");
console.log(String.raw$__btC:\new\table$__bt);
const re = new RegExp(String.raw$__bt\d+\.\d+$__bt);
console.log(re.test("3.14"));`,
          try: R`اكتب [[console.log("C:\reports\new\2026.txt")]] في ملف [[path.js]] وشغّله بـ [[node path.js]]. الناتج مش المسار. اطبعه تاني بـ [[JSON.stringify]] عشان تشوف الحروف المخفية، وصلّحه بطريقتين: [[\\]] و [[String.raw]]. وبعدين غيّر اسم الملف لـ [[path.mjs]] وشغّله تاني بنفس السطر الغلط.`,
          sol: R`[["C:\reports\new\2026.txt"]] فيها ٣ escapes مش مقصودين: [[\r]] (رجوع لأول السطر) و [[\n]] (سطر جديد) و [[\202]] (octal قديم = الحرف [[U+0082]]). فالنص طوله 18 مش 23. والتصليح: [["C:\\reports\\new\\2026.txt"]] أو [[String.raw]] بنفس الكلام، والاتنين بيطلعوا نفس النص (23 حرف). وفي [[path.mjs]] (module = strict mode) الملف مبيشتغلش خالص:

~~~text الناتج: node path.mjs
const bad = "C:\reports\new\2026.txt";
                            ^^

SyntaxError: Octal escape sequences are not allowed in strict mode.
~~~`,
          teach: R`## الفكرة

جوه أي نص (بـ [[']] أو [["]] أو backtick) الـ backslash [[\]] بيغيّر معنى اللي بعده. ده اسمه **escape sequence**: «اهرب من المعنى العادي». المثال بيطبع سطر جديد و tab وعلامات جوه نصوص، وبعدين حروف بكودها، وبعدين باج مسار ويندوز المشهور وحله بـ [[String.raw]]. اتشغّل كملف بـ Node 24.22 على ويندوز 11.

---

## ١. escape يعني إيه: الـ backslash بيقول «الحرف اللي بعدي مش عادي»

~~~js escapes.js
console.log("سطر\nسطر تاني");
console.log("اسم\tسعر");
console.log('it\'s', "قال \"أهلًا\"", "C:\\Users\\sara");
~~~

~~~text الناتج
سطر
سطر تاني
اسم	سعر
it's قال "أهلًا" C:\Users\sara
~~~

- [[\n]]: (n = newline) سطر جديد. النص فيه حرف واحد مش اتنين: [["a\nb".length]] بـ 3.
- [[\t]]: (t = tab) مسافة tab، الترمنال بيوصّلها لأقرب عمود مضاعف 8.
- [[\']] و [[\"]]: علامة تنصيص جوه نص بنفس العلامة (درس «string literals و String()» قسم ٣).
- [[\\]]: backslash واحد حقيقي. عشان كده [["C:\\Users\\sara"]] اتطبعت بـ backslash واحد في كل مكان.

**المهم:** الـ backslash ده موجود في **الكود** بس. النص نفسه في الذاكرة فيه الحرف الناتج (سطر جديد، أو [["]]، أو [[\]] واحد).

---

## ٢. كل الـ escapes في جدول

| الـ escape | الحرف | ملحوظة |
|---|---|---|
| [[\n]] | سطر جديد ([[U+000A]]) | أشهرهم. الـ LF بتاع لينكس والماك |
| [[\r]] | رجوع لأول السطر ([[U+000D]]) | ملفات ويندوز بتخلّص كل سطر بـ [[\r\n]] |
| [[\t]] | tab ([[U+0009]]) | للأعمدة في TSV والترمنال |
| [[\\]] | backslash واحد | لازم في مسارات ويندوز والـ regex جوه نص |
| [[\']] و [[\"]] | علامة تنصيص | جوه نص بنفس العلامة |
| [[\0]] | الحرف null ([[U+0000]]) | [[JSON.stringify("\0")]] بيطبعه [["\u0000"]] |
| [[\b]] و [[\f]] و [[\v]] | backspace و form feed و vertical tab | نادرين، من أيام الطابعات |
| [[\x41]] | أي حرف من [[00]] لـ [[FF]] | القسم ٣ |
| [[\u0627]] | أي حرف من [[0000]] لـ [[FFFF]] | القسم ٤ |
| [[\u{1F600}]] | أي حرف في Unicode | القسم ٥ |
| [[\]] + سطر جديد | ولا حاجة (السطر بيكمّل) | القسم ٦ |
| [[\a]] أو أي حرف تاني | الحرف نفسه ([[a]]) | الـ backslash بيتشال من غير أي error |

آخر صف مهم: [["\a\q"]] بيطلع [["aq"]]، و [["\a" === "a"]] بـ [[true]]. يعني backslash زيادة قبل حرف عادي **مبيعملش error**، بيختفي وخلاص. ده اللي بيخلي باج المسار في القسم ٧ صعب يتلاقي.

---

## ٣. hexadecimal escape sequences: [[\x41]]

~~~text Node REPL
> "\x41\x42\x43"
'ABC'
> "\x41" === "A"
true
~~~

[[\x]] وبعده **رقمين hex بالظبط** (hex = نظام العد بـ 16: الأرقام 0 لـ 9 والحروف A لـ F). [[41]] hex = 65 عشري، وده كود حرف [[A]]. بيوصل لحد [[\xFF]] (255) بس، يعني الحروف الإنجليزي والرموز اللاتيني. العربي مبيدخلش هنا.

---

## ٤. unicode escape sequences: [[\u0627]]

~~~text Node REPL
> "\u0627\u062d\u0645\u062f"
'احمد'
> "\u0041" === "A"
true
~~~

[[\u]] وبعده **٤ أرقام hex بالظبط**. [[0627]] هو كود الألف في Unicode، و [[062D]] الحاء، و [[0645]] الميم، و [[062F]] الدال. أي حرف عربي كوده بين [[0600]] و [[06FF]]. بتستخدمها لما تكتب حرف مش على الكيبورد، أو حرف **مخفي** محدش هيشوفه لو اتكتب زي ما هو: [[\u200B]] (مسافة صفرية) و [[\u00A0]] (NBSP) و [[\uFEFF]] (BOM). (عشان تعرف كود أي حرف: [["ا".codePointAt(0).toString(16)]] بيرجّع [["627"]]، في الدرس الجاي.)

---

## ٥. unicode point escapes: [[\u{1F600}]]

~~~text Node REPL
> "\u{1F600}"
'😀'
> "\u{627}"
'ا'
> "\u{1F600}" === "\uD83D\uDE00"
true
> "\u{1F600}".length
2
~~~

الأقواس [[{ }]] بتسمح بأي عدد أرقام hex من 1 لـ 6، لحد [[10FFFF]] (آخر حرف في Unicode). ودي الطريقة الوحيدة تكتب إيموجي بكوده في escape واحد، لأن [[1F600]] أكبر من ٤ أرقام. والسطر التالت بيوري سر هتفهمه في الدرس الجاي: نفس الإيموجي ممكن يتكتب [[\uD83D\uDE00]] (اتنين [[\u]]، اسمهم surrogate pair)، وده عشان طوله 2.

---

## ٦. سطر طويل بيكمّل: backslash في آخر السطر

~~~js long.js
const long = "سطر طويل \
مكمّل";
console.log(long, long.length);
~~~

~~~text الناتج
سطر طويل مكمّل 14
~~~

backslash في **آخر** السطر جوه نص بـ [["]] أو [[']] معناه «السطر الجاي كمالة، ومفيش سطر جديد في النص». ده اسمه line continuation. نادر النهارده لأن الـ backtick بيعدّي سطور، والـ [[+]] بين سطرين أوضح.

---

## ٧. الباج المشهور: مسار ويندوز في نص

~~~js path.js
console.log("C:\new\table");
~~~

~~~text الناتج
C:
ew	able
~~~

[[\n]] بقت سطر جديد و [[\t]] بقت tab، والـ [[n]] و [[t]] اختفوا. ومفيش error، فالملف هيحاول يفتح مسار غلط ويقولك «الملف مش موجود». وأسوأ من كده: [["C:\reports\new\2026.txt"]] فيها [[\r]] و [[\n]] و [[\202]] (رقم بعد backslash = octal قديم)، فبقت ١٨ حرف بدل ٢٣ (اتقاس في التمرين). وفي ملف [[.mjs]] أو أي module (strict mode) السطر ده نفسه SyntaxError: [[Octal escape sequences are not allowed in strict mode.]]

الحلول:
1. [["C:\\new\\table"]]: كل backslash مضاعف.
2. [["C:/new/table"]]: Node على ويندوز بيقبل [[/]] في المسارات (جرّبناها بـ [[readFileSync]] وقرا الملف).
3. [[String.raw]] (القسم الجاي).
4. الأحسن في الكود الحقيقي: [[path.join("C:", "new", "table")]] من [[node:path]] (تاب Node).

---

## ٨. [[String.raw]]: النص زي ما اتكتب

~~~js raw.js
console.log(String.raw$__btC:\new\table$__bt);
console.log(String.raw$__bt\u0627 و \x41$__bt, "\u0627 و \x41");
console.log(String.raw$__bt1 + 1 = $__{1 + 1}\n$__bt);
~~~

~~~text الناتج
C:\new\table
\u0627 و \x41 ا و A
1 + 1 = 2\n
~~~

- [[String.raw]] دالة بتتكتب قبل template literal على طول (من غير قوسين). النوع ده اسمه **tagged template** (درس «template literals» ذكره): الدالة بتستلم أجزاء النص والقيم.
- بترجّع النص **من غير ما تفسّر ولا escape**: [[\n]] بتفضل backslash و n.
- الـ [[$__{ }]] لسه شغالة: [[$__{1 + 1}]] بقت 2.

### الـ regex جوه نص

ده أكتر استخدام حقيقي ليها:

~~~js regex.js
console.log(new RegExp("\d+\.\d+").source, new RegExp("\\d+\\.\\d+").source);
const re = new RegExp(String.raw$__bt\d+\.\d+$__bt);
console.log(re.source, re.test("3.14"));
~~~

~~~text الناتج
d+.d+ \d+\.\d+
\d+\.\d+ true
~~~

[["\d"]] في نص عادي escape مش معروف، فالـ backslash اتشال (آخر صف في جدول القسم ٢) والـ regex بقى [[d+.d+]] (حرف d!). الحل إما backslash مضاعف ([["\\d"]]) أو [[String.raw]] اللي بيخلي الكود شبه الـ regex اللي في الكتاب بالظبط.

### فخين في [[String.raw]] (اتجرّبوا)

1. **مينفعش يخلص بـ backslash:**

~~~js raw-end.js
const user = "sara";
console.log(String.raw$__btC:\Users\$__bt + user);
~~~

~~~text الناتج (Node 24.22، والـ stack اتشال)
...\raw-end.js:3



SyntaxError: Unexpected end of input
~~~

الـ [[\]] الأخير عمل escape للـ backtick، فالـ template ماتقفلش وفضل مفتوح لآخر الملف (عشان كده «نهاية مش متوقعة» في سطر 3 الفاضي). ولو كان فيه backtick تاني بعدها في نفس السطر، الرسالة بتبقى [[SyntaxError: missing ) after argument list]] (اتجرّبت كمان). حتى [[String.raw]] مبتقدرش تغيّر ده، لأن ده بيحصل وقت قراية الكود قبل ما الدالة تشتغل.

2. **backslash قبل [[$__{ }]] بيلغيها:**

~~~js raw-dollar.js
const user = "sara";
console.log(String.raw$__btC:\Users\$__{user}\docs$__bt);
~~~

~~~text الناتج
C:\Users\$__{user}\docs
~~~

[[\$]] معناها «علامة دولار عادية»، فـ [[$__{user}]] اتطبعت زي ما هي بدل [[sara]]. الحل للمسارات اللي فيها متغيرات: [[path.win32.join("C:\\Users", user, "docs")]] (طلّع [[C:\Users\sara\docs]]) أو [[["C:", "Users", user].join("\\")]].

### [[String.raw]] كدالة عادية

~~~text Node REPL
> String.raw({ raw: ["a", "b", "c"] }, 1, 2)
'a1b2c'
> String.raw({ raw: "abc" }, "-", "-")
'a-b-c'
~~~

نفس اللي بيحصل من جوه: [[raw]] فيها أجزاء النص، والباراميترز التانية بتتحط بينهم. نادر تكتبها كده، بس بيفهّمك الـ tagged templates.

---

## ٩. escapes غلط: الأخطاء بنصها

| الكود | النتيجة في Node 24.22 |
|---|---|
| [["\x4G"]] | [[SyntaxError: Invalid hexadecimal escape sequence]] (لازم رقمين hex بالظبط بعد [[\x]]) |
| [["\u062"]] | [[SyntaxError: Invalid Unicode escape sequence]] (لازم ٤ أرقام بالظبط بعد [[\u]]) |
| [["\u{110000}"]] | [[SyntaxError: Undefined Unicode code-point]] (الرقم أكبر من آخر حرف في Unicode [[10FFFF]]) |
| [["\1"]] في strict mode | [[SyntaxError: Octal escape sequences are not allowed in strict mode.]] (أي module أو class أو ملف أوله [["use strict"]]) |
| [["\8"]] في strict mode | [[SyntaxError: \8 and \9 are not allowed in strict mode.]] (وبرّه strict بيبقى [["8"]] عادي) |
| [["\1"]] برّه strict | [["\u0001"]] من غير أي خطأ (حرف تحكم مخفي) |
| backtick فيه [[\unicode]] | [[SyntaxError: Invalid Unicode escape sequence]] (الـ template العادي بيفسّر [[\u]] زي النص) |
| [[String.raw]] فيها [[\unicode]] | [["\unicode"]] عادي: الـ tagged template بيسمح بأي escape |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| سطر جديد أو tab | [[\n]] أو [[\t]] |
| علامة تنصيص جوه نص بنفس العلامة | [[\']] أو [[\"]] |
| backslash واحد | [[\\]] |
| حرف بكوده (لحد [[FFFF]]) | [[\u0627]] |
| إيموجي أو أي حرف | [[\u{1F600}]] |
| حرف مخفي في الكود | [[\u200B]] بدل ما تلزقه |
| regex أو مسار من غير escape | [[String.raw]] |
| مسار فيه متغير | [[path.join]] مش [[String.raw]] |`,
          lines: [
            R`[[\n]] بتبقى سطر جديد حقيقي، فالجملة بتتطبع على سطرين. في النص حرف واحد مكان [[\n]] مش اتنين.`,
            R`[[\t]] بتبقى tab، والترمنال بيوصّلها لأقرب عمود عشان «اسم» و «سعر» يبقوا في أعمدة.`,
            R`تلات escapes: [[\']] و [[\"]] علامة تنصيص جوه نص بنفس العلامة، و [[\\]] backslash واحد في المسار.`,
            R`حروف بكودها: [[\x41]] (رقمين hex) بقت A، و [[\u0627]] (أربعة) بقت ألف، و [[\u{1F600}]] (أي عدد) بقت إيموجي.`,
            R`الباج: [[\n]] و [[\t]] اللي في المسار اتفسّروا سطر جديد و tab، فالمسار اتطبع مكسور على سطرين.`,
            R`[[String.raw]] قبل الـ backtick بترجّع النص زي ما اتكتب من غير تفسير، فالمسار طلع صح بالـ backslashes.`,
            R`[[String.raw]] مع [[new RegExp]]: الـ regex بيتكتب زي الكتاب بالظبط، من غير ما تضاعف كل backslash.`,
            R`بيطبع [[true]] عشان [[\d+\.\d+]] لقى رقم بنقطة وبعدها رقم في [["3.14"]]. ولو كان [["\d"]] في نص عادي كان الـ regex بقى [[d+.d+]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب [[length]] كل نص من دول قبل ما تشغّل: [["a\tb"]] و [["\\n"]] و [["\u0627\u0644"]] و [["\x41\x42"]] و [["\u{1F600}"]] (من قسم ٢ لـ ٥ في الشرح).`, done: R`كتبت 3 و 2 و 2 و 2 و 2، وتقدر تقول ليه [["\\n"]] اتنين (backslash و n) و [["\u{1F600}"]] اتنين مع إنه حرف واحد.`, sol: R`~~~js lengths.js
for (const s of ["a\tb", "\\n", "\u0627\u0644", "\x41\x42", "\u{1F600}"]) console.log(JSON.stringify(s), s.length);
~~~

~~~text الناتج
"a\tb" 3
"\\n" 2
"ال" 2
"AB" 2
"😀" 2
~~~

- [["a\tb"]]: a و tab و b = 3. الـ escape حرف واحد.
- [["\\n"]]: [[\\]] backslash واحد، وبعده [[n]] عادية، فاتنين، ومفيش سطر جديد.
- [["\u0627\u0644"]]: escapeين = حرفين («ال»).
- [["\u{1F600}"]] بـ 2: الإيموجي بيتخزن في خانتين (الدرس الجاي كله عن ده).

لاحظ إن [[JSON.stringify]] رجّع الـ tab والـ backslash كـ escapes ([[\t]] و [[\\]]) عشان تشوفهم، ودي أسهل طريقة تكشف حرف مخفي في نص.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const p = "C:\reports\new\2026.txt";]] اطبع [[p.length]] وكل حرف فيه بكوده، واعرف إيه اللي حصل، وبعدين صلّحه بـ ٣ طرق (من قسم ٧ في الشرح).`, done: R`عرفت إن الطول 18 مش 23، وإن فيه [[\r]] و [[\n]] وحرف [[\x82]] مخفيين، والتلات تصليحات بيطبعوا [[C:\reports\new\2026.txt]] أو [[C:/reports/new/2026.txt]].`, sol: R`~~~js win-path.js
const bad = "C:\reports\new\2026.txt";
console.log(bad.length);
console.log([...bad].map(c => c.charCodeAt(0) < 32 || (c.charCodeAt(0) > 126 && c.charCodeAt(0) < 160) ? "\\x" + c.charCodeAt(0).toString(16).padStart(2, "0") : c).join(" "));
const ok1 = "C:\\reports\\new\\2026.txt";
const ok2 = String.raw$__btC:\reports\new\2026.txt$__bt;
const ok3 = "C:/reports/new/2026.txt";
console.log(ok1, ok1.length, ok1 === ok2);
console.log(ok3);
~~~

~~~text الناتج
18
C : \x0d e p o r t s \x0a e w \x82 6 . t x t
C:\reports\new\2026.txt 23 true
C:/reports/new/2026.txt
~~~

**اللي حصل:** [[\r]] بقت [[\x0d]] (رجوع لأول السطر)، و [[\n]] بقت [[\x0a]]، و [[\202]] اتقرت octal (أرقام بعد backslash = نظام العد بـ 8 القديم): [[202]] octal = 130 = [[\x82]]، وده حرف تحكم مخفي. وفضل [[6.txt]] بس من [[2026.txt]]. وكل ده من غير ولا error.

السطر التاني بيلف على الحروف ويطبع أي حرف تحكم بكوده بدل ما يطبعه (الحروف من 0 لـ 31 ومن 127 لـ 159 مخفية).

**التلات تصليحات:** [[\\]] مضاعف، و [[String.raw]] (نفس النص بالظبط: [[ok1 === ok2]] بـ [[true]])، و [[/]] اللي Node على ويندوز بيقبلها. وفي ملف [[.mjs]] الغلطة دي كانت هتبان من أول تشغيل: [[SyntaxError: Octal escape sequences are not allowed in strict mode.]]` },
            { lvl: 'تطبيق', t: R`**ابني:** [[toEscapes(s)]] بترجّع النص مكتوب escapes بس، حرف حرف بالشكل [[\u{...}]]: [[toEscapes("سا😀")]] ترجّع [[\u{633}\u{627}\u{1F600}]]. وبعدين اتأكد إن الناتج لو اتحط بين [["..."]] واتقرا كـ كود بيرجّع نفس النص (من قسم ٥ في الشرح).`, done: R`[[toEscapes("سا😀")]] بترجّع [[\u{633}\u{627}\u{1F600}]] (طولها 23)، والإيموجي طلع escape واحد مش اتنين، و [[eval('"' + e + '"') === "سا😀"]] بـ [[true]].`, sol: R`~~~js to-escapes.js
function toEscapes(s) {
  let out = "";
  for (const ch of s) out += "\\u{" + ch.codePointAt(0).toString(16).toUpperCase() + "}";
  return out;
}
const e = toEscapes("سا😀");
console.log(e, e.length);
console.log(eval('"' + e + '"'), eval('"' + e + '"') === "سا😀");
~~~

~~~text الناتج
\u{633}\u{627}\u{1F600} 23
سا😀 true
~~~

- [[for (const ch of s)]] بيمشي على الحروف الحقيقية (code points)، فالإيموجي بيجي مرة واحدة. لو لفّيت بـ [[s[i]]] كان هيطلع [[\u{D83D}\u{DE00}]] (نصّين).
- [[codePointAt(0).toString(16)]] كود الحرف بالـ hex (الدرس الجاي).
- [["\\u{"]] في الكود: [[\\]] عشان الناتج يبقى فيه backslash حقيقي، مش escape.
- [[eval]] هنا للتجربة بس: بيقرا النص ككود JavaScript. متستخدموش على أي نص جاي من يوزر.

ده مفيد لما عايز تحط حرف مخفي أو إيموجي في كود أو ملف config من غير ما المحرر أو الـ diff يبوّظوه.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سطر من لوج JSON فيه رسالة خطأ: [['{"msg":"فشل الدفع\\nالسبب: الكارت منتهي\\tكود 51"}']]. لو قصّيت الرسالة بـ [[slice]] وطبعتها، الـ [[\n]] بتطلع حرفين. اطبعها على سطرين بطريقتين: [[replaceAll]] و [[JSON.parse]] (من قسم ١ و ٢ في الشرح).`, done: R`النسخة الخام بتطبع [[\n]] و [[\t]] كحروف، والطريقتين بيطبعوا «فشل الدفع» في سطر و «السبب: الكارت منتهي» وبعدها tab و «كود 51» في سطر.`, sol: R`~~~js log-line.js
const logLine = '{"msg":"فشل الدفع\\nالسبب: الكارت منتهي\\tكود 51"}';
const raw = logLine.slice(8, -2);
console.log(raw);
console.log(raw.replaceAll("\\n", "\n").replaceAll("\\t", "\t"));
console.log(JSON.parse(logLine).msg);
~~~

~~~text الناتج
فشل الدفع\nالسبب: الكارت منتهي\tكود 51
فشل الدفع
السبب: الكارت منتهي	كود 51
فشل الدفع
السبب: الكارت منتهي	كود 51
~~~

- في ملف اللوج نفسه مكتوب backslash و n (حرفين)، لأن JSON بيعمل escape للسطر الجديد عشان كل رسالة تفضل في سطر واحد. عشان كده في الكود كتبنا [[\\n]].
- [[replaceAll("\\n", "\n")]]: بيدوّر على الحرفين (backslash و n) ويحط مكانهم سطر جديد حقيقي.
- [[JSON.parse]] أحسن: بيفك **كل** الـ escapes صح، حتى [[\"]] و [[\u0627]] اللي [[replaceAll]] مش هتغطيهم. استخدم [[replaceAll]] بس لو النص مش JSON كامل.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** زميلك كتب [[String.raw$__btC:\Users\$__{user}\docs$__bt]] عشان يعمل مسار للمستخدم، والناتج فيه [[$__{user}]] زي ما هي. جرّب تصلّحها جوه [[String.raw]] نفسها، وبعدين اعمل الحل الصح (من قسم ٨ في الشرح).`, done: R`عرفت إن الـ backslash قبل [[$]] بيلغي الـ [[$__{ }]]، وإن [[String.raw]] مينفعش يخلص بـ backslash، والحل النهائي بيطبع [[C:\Users\sara\docs]].`, sol: R`~~~js raw-path.js
const user = "sara";
console.log(String.raw$__btC:\Users\$__{user}\docs$__bt);
console.log(String.raw$__btC:\Users\$__{"\\"}$__{user}$__bt);
console.log(["C:", "Users", user, "docs"].join("\\"));
const path = require("node:path");
console.log(path.win32.join("C:\\Users", user, "docs"));
~~~

~~~text الناتج
C:\Users\$__{user}\docs
C:\Users\$__{"\\"}sara
C:\Users\sara\docs
C:\Users\sara\docs
~~~

- السطر الأول: [[\$]] = علامة دولار عادية، فالـ [[$__{user}]] بقت نص.
- السطر التاني (محاولة تصليح): حطيت backslash في [[$__{"\\"}]] قبلها، بس الـ backslash اللي قبل [[$]] لسه موجود فلغاها هي كمان. وجرّبت كمان [[String.raw$__btC:\Users\$__bt + user + String.raw$__bt\docs$__bt]]: الملف كله وقع بـ [[SyntaxError: missing ) after argument list]] لأن آخر [[\]] في أول template أكل الـ backtick.
- الحل: متخليش [[String.raw]] تعمل مسارات فيها متغيرات. [[join("\\")]] أو [[path.win32.join]] (الأحسن: بيظبط الـ backslashes الزيادة والـ [[..]]). و [[path.join]] من غير [[win32]] بيستخدم فاصل النظام اللي شغال عليه.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميل كتب [[new RegExp("\d+")]] وبيقولك «الـ regex مش بيلاقي أرقام». اشرحله في ٣ سطور ليه، وورّيه بالتشغيل (من قسم ٨ في الشرح).`, done: R`الشرح فيه فكرة «مستويين escape» (النص الأول وبعدين الـ regex)، والتشغيل بيوري [[source]] بـ [[d+]] و [[test("123")]] بـ [[false]] و [[test("ddd")]] بـ [[true]].`, sol: R`**الشرح النموذجي:** الـ backslash بيتفسّر مرتين: مرة لما JavaScript يقرا النص، ومرة لما الـ regex يتعمل. [["\d"]] في النص escape مش معروف، فالـ backslash اتشال **قبل** ما الـ regex يشوفه، والـ regex اللي اتعمل هو [[d+]] (حرف d مكرر). الحل: [["\\d+"]] أو [[String.raw$__bt\d+$__bt]] أو [[/\d+/]] من غير نص أصلًا.

~~~js regex-escape.js
console.log(new RegExp("\d+").source, new RegExp("\\d+").source, /\d+/.source, new RegExp(String.raw$__bt\d+$__bt).source);
console.log(new RegExp("\d+").test("123"), new RegExp("\d+").test("ddd"));
~~~

~~~text الناتج
d+ \d+ \d+ \d+
false true
~~~

[[source]] بيرجّع الـ regex زي ما اتفهم. والدليل الأقوى السطر التاني: بيلاقي [["ddd"]] ومش بيلاقي [["123"]].` }
          ],
          flag: "script",
          ref: [
            { t: "MDN: Lexical grammar، escape sequences", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#escape_sequences" },
            { t: "MDN: hexadecimal escape sequences", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#hexadecimal_escape_sequences" },
            { t: "MDN: unicode escape sequences", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#unicode_escape_sequences" },
            { t: "MDN: unicode code point escapes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#unicode_code_point_escapes" },
            { t: "MDN: String.raw()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw" },
            { t: "ECMAScript: String.raw", url: "https://tc39.es/ecma262/multipage/text-processing.html#sec-string.raw" },
          ],
          pre: ["js/string literals و String()", "js/template literals"],
          deep: {
            why: R`أي نص فيه سطر جديد، أو علامة تنصيص، أو مسار ويندوز، أو regex، أو حرف مخفي محتاج escape. وغلطة الـ escape الصامتة ([["C:\new"]] أو [[new RegExp("\d")]]) مبتطلعش error، بتطلع نتيجة غلط في مكان تاني خالص، فلازم تعرفها من شكلها.`,
            how: R`وقت قراية الكود (قبل التنفيذ)، الـ parser بيحوّل كل escape جوه النص للحرف بتاعه، والنص في الذاكرة مفيهوش backslash. الـ [[\x]] بياخد رقمين hex، و [[\u]] أربعة، و [[\u{}]] من 1 لـ 6 لحد [[10FFFF]]. والـ escape المش معروف ([[\d]] و [[\a]]) بيرجّع الحرف نفسه في النص العادي. أما الـ tagged template زي [[String.raw]] فبتستلم نسختين: «cooked» (بعد التفسير) و «raw» (زي ما اتكتب)، و [[String.raw]] بترجّع الـ raw. عشان كده بتقبل [[\unicode]] اللي في نص عادي SyntaxError.`,
            when: R`[[\n]] و [[\t]] للتنسيق. [[\uXXXX]] أو [[\u{...}]] لأي حرف مخفي أو مش على الكيبورد (عشان الكود يتقري ويتراجع). [[String.raw]] للـ regex اللي جوه [[new RegExp]] وللنصوص اللي فيها backslashes كتير من غير متغيرات. و [[path.join]] لأي مسار.`,
            mistakes: R`مسار ويندوز في نص عادي ([[\n]] و [[\t]] و [[\r]] بتتفسّر من غير error). و [[new RegExp("\d")]] من غير [[\\]]. و [[String.raw]] بتخلص بـ backslash ([[missing ) after argument list]]) أو فيها backslash قبل [[$__{ }]]. و [[\u062]] بـ ٣ أرقام. ولزق حرف مخفي (ZWSP أو BOM) في الكود بدل ما تكتبه escape: محدش هيشوفه في الـ review.`
          }
        },
        {
          cmd: "string و UTF-16: length و codePointAt",
          title: "ليه \"😀\".length بـ 2، وإزاي تقرا كود أي حرف وتعمل حرف من كوده",
          desc: R`JavaScript بيخزّن النص كـ **UTF-16 code units**: خانات كل واحدة 16 bit. الحرف العربي والإنجليزي خانة واحدة، والإيموجي وحروف كتير تانية خانتين (اسمهم surrogate pair). و [[length]] بيعد الخانات مش الحروف، عشان كده [["😀".length]] بـ 2.
• [[charAt(i)]] و [[charCodeAt(i)]] و [[s[i]]] بيشتغلوا على الخانة رقم [[i]]، فممكن يدّوك نص إيموجي.
• [[codePointAt(i)]] بيرجّع كود الحرف كامل (code point) لو الخانة دي أول حرف مركّب.
• [[String.fromCharCode]] بتعمل نص من خانات، و [[String.fromCodePoint]] من أكواد حروف كاملة.
• [[for...of]] و [[[...s]]] و [[Array.from(s)]] بيمشوا على الحروف الكاملة (ده [[String.prototype[Symbol.iterator]]])، أما [[split("")]] على الخانات.`,
          example: R`const name = "سارة";
const smile = "😀";
console.log(name.length, smile.length);
console.log(name.charAt(0), name.charCodeAt(0), name.codePointAt(0).toString(16));
console.log(smile.charCodeAt(0), smile.charCodeAt(1), smile.codePointAt(0));
console.log(String.fromCharCode(0x633, 0x627), String.fromCodePoint(0x1F600));
console.log("a😀b".split(""), [..."a😀b"]);
for (const ch of "a😀") console.log(ch, ch.length);`,
          try: R`اعمل ملف فيه [[const s = "تم 👍";]] واطبع [[s.length]] و [[[...s].length]]، وبعدين لف بـ [[for (let i = 0; i < s.length; i++)]] واطبع [[i]] و [[s.charCodeAt(i).toString(16)]]. هتلاقي خانتين للإيموجي: [[d83d]] و [[dc4d]]. اطبع [[s.codePointAt(3).toString(16)]] و [[s.codePointAt(4).toString(16)]]، واعمل الإيموجي تاني بـ [[String.fromCodePoint]].`,
          sol: R`[[s.length]] بـ 5 و [[[...s].length]] بـ 4. الـ loop بيطبع [[0 62a]] و [[1 645]] و [[2 20]] و [[3 d83d]] و [[4 dc4d]]. و [[codePointAt(3)]] بـ [[1f44d]] (الإيموجي كامل لأن الخانة 3 أول نص منه)، و [[codePointAt(4)]] بـ [[dc4d]] (النص التاني لوحده). و [[String.fromCodePoint(0x1F44D)]] بيرجّع 👍.`,
          teach: R`## الفكرة

إنت شايف «سارة» ٤ حروف و «😀» حرف واحد. JavaScript شايف خانات: كل خانة رقم من 0 لـ 65535 (16 bit)، والنظام ده اسمه **UTF-16**. أغلب الحروف (العربي والإنجليزي وكتير غيرهم) خانة واحدة، بس Unicode فيه أكتر من مليون مكان، فالحروف اللي كودها أكبر من 65535 (الإيموجي، وحروف لغات قديمة، ورموز رياضية) بتاخد خانتين. الدرس بيوريك الخانات دي وإزاي تقرا كل حرف صح. كله اتشغّل كملف بـ Node 24.22 على ويندوز 11.

---

## ١. [[length]] على string بيعد الخانات

~~~js utf16.js
const name = "سارة";
const smile = "😀";
console.log(name.length, smile.length);
~~~

~~~text الناتج
4 2
~~~

[[length]] property (مش method، من غير قوسين) بيقول عدد **code units** (الخانات). «سارة» ٤ حروف في ٤ خانات. «😀» حرف واحد في خانتين. وده نفس العدد اللي [[slice]] و [[indexOf]] و [[substring]] بيشتغلوا بيه.

| النص | [[length]] | الحروف الكاملة [[[...s].length]] | ليه |
|---|---|---|---|
| [["س"]] | 1 | 1 | كوده [[U+0633]]، أقل من [[FFFF]] |
| [["😀"]] | 2 | 1 | كوده [[U+1F600]]، أكبر من [[FFFF]] فخانتين |
| [["👍🏽"]] | 4 | 2 | إيد [[U+1F44D]] + لون بشرة [[U+1F3FD]]، كل واحد خانتين |
| [["🇪🇬"]] | 4 | 2 | العلم حرفين [[U+1F1EA]] و [[U+1F1EC]] (E و G) |
| [["مُحَمَّد"]] | 8 | 8 | ٤ حروف + ٤ علامات تشكيل، كل واحدة خانة |
| العيلة (راجل وست وبنت) | 8 | 5 | ٣ إيموجي بينهم حرفين ZWJ مخفيين |

آخر ٣ صفوف بيقولوا إن حتى «الحروف الكاملة» مش هي اللي العين شايفاها، وده موضوع درس «Intl.Segmenter».

---

## ٢. [[String.prototype.charAt]] و [[String.prototype.charCodeAt]]

~~~js utf16.js
console.log(name.charAt(0), name.charCodeAt(0), name.codePointAt(0).toString(16));
~~~

~~~text الناتج
س 1587 633
~~~

- [[charAt(0)]]: الخانة رقم 0 كنص. زي [[name[0]]] بالظبط.
- [[charCodeAt(0)]]: رقم الخانة، [[1587]] عشري.
- [[toString(16)]] على الرقم: يكتبه hex. [[633]] hex هو نفس الـ [[U+0633]] اللي في جداول Unicode. ([[codePointAt]] في القسم الجاي.)

**لو الـ index برّه النص**، كل واحدة بترجّع حاجة مختلفة:

~~~text الناتج من "سارة" بـ index 10
charAt(10)      ""
s[10]           undefined
charCodeAt(10)  NaN
codePointAt(10) undefined
~~~

[[charAt]] بترجّع نص فاضي (فمبتكسرش كود بيلزق نصوص)، و [[[ ]]] بترجّع [[undefined]]، و [[charCodeAt]] بترجّع [[NaN]] (رقم مش رقم، درس «number و NaN»).

---

## ٣. [[String.prototype.codePointAt]]: الحرف كامل

~~~js utf16.js
console.log(smile.charCodeAt(0), smile.charCodeAt(1), smile.codePointAt(0));
~~~

~~~text الناتج
55357 56832 128512
~~~

- [[charCodeAt(0)]] و [[charCodeAt(1)]]: الخانتين لوحدهم، [[55357]] ([[D83D]]) و [[56832]] ([[DE00]]). ولا واحد فيهم حرف.
- [[codePointAt(0)]]: لما الخانة 0 تبقى أول نص من حرف مركّب، بيقرا الخانتين ويرجّع كود الحرف كامل: [[128512]] = [[1F600]] = 😀.
- [[codePointAt(1)]] بيرجّع [[56832]]: الـ index لسه بالخانات، فلو وقفت في نص الإيموجي هتاخد النص التاني لوحده. و [[codePointAt(5)]] على نص طوله 2 بترجّع [[undefined]].

عشان كده [[codePointAt]] بتتنادى مع [[for...of]] (القسم ٦) مش مع [[i++]].

---

## ٤. surrogate pairs: الإيموجي بيتقسم إزاي

الخانات من [[D800]] لـ [[DFFF]] محجوزة في Unicode، مش لحروف. أي حرف كوده فوق [[FFFF]] بيتقسم:

~~~js surrogate.js
const cp = 0x1F600;
const v = cp - 0x10000;
const high = 0xD800 + (v >> 10);
const low = 0xDC00 + (v & 0x3FF);
console.log(v.toString(16), high.toString(16), low.toString(16));
console.log(String.fromCharCode(high, low) === "😀");
~~~

~~~text الناتج
f600 d83d de00
true
~~~

1. اطرح [[0x10000]]: يفضل رقم من 20 bit ([[f600]]).
2. أول 10 bits ([[v >> 10]]: إزاحة لليمين 10) زائد [[D800]] = **high surrogate** ([[d83d]]).
3. آخر 10 bits ([[v & 0x3FF]]: [[0x3FF]] = عشر وحايد) زائد [[DC00]] = **low surrogate** ([[de00]]).

مش هتكتب الحسبة دي بإيدك، بس هتفهم منها حاجتين: أي خانة بين [[D800]] و [[DBFF]] هي «أول نص» ولازم وراها خانة بين [[DC00]] و [[DFFF]]؛ ولو واحدة منهم لوحدها النص بقى «مكسور» (درس «isWellFormed و toWellFormed»).

---

## ٥. [[String.fromCharCode(...)]] و [[String.fromCodePoint(...)]]

~~~js from.js
console.log(String.fromCharCode(0x633, 0x627), String.fromCodePoint(0x1F600));
~~~

~~~text الناتج
سا 😀
~~~

دول **static methods**: بتتنادي على [[String]] نفسه مش على نص ([[String.fromCodePoint(...)]] مش [["x".fromCodePoint]]). بتاخد أرقام وترجّع نص.

| النداء | النتيجة | ليه |
|---|---|---|
| [[String.fromCharCode(0x633, 0x627)]] | [["سا"]] | كل رقم خانة |
| [[String.fromCharCode(0xD83D, 0xDE00)]] | [["😀"]] | خانتين = surrogate pair |
| [[String.fromCharCode(0x1F600)]] | [["\uF600"]] | **من غير error:** بتاخد أول 16 bit بس، فطلع حرف تاني خالص |
| [[String.fromCodePoint(0x1F600)]] | [["😀"]] | بتقبل الكود كامل وبتقسمه لوحدها |
| [[String.fromCodePoint(0x633, 0x627, 0x1F600)]] | [["سا😀"]] | كذا حرف مرة واحدة |
| [[String.fromCodePoint("65")]] | [["A"]] | بتحوّل النص لرقم الأول |

و [[fromCodePoint]] بترمي لو الرقم مش كود حرف صحيح، وده كويس (أحسن من [[fromCharCode]] اللي بتسكت):

~~~text الناتج
String.fromCodePoint(-1)        RangeError: Invalid code point -1
String.fromCodePoint(0x110000)  RangeError: Invalid code point 1114112
String.fromCodePoint(1.5)       RangeError: Invalid code point 1.5
String.fromCodePoint("abc")     RangeError: Invalid code point NaN
~~~

**القاعدة:** [[fromCodePoint]] و [[codePointAt]] مع بعض، و [[fromCharCode]] و [[charCodeAt]] مع بعض. ومتخلطش.

---

## ٦. String.prototype[Symbol.iterator]: اللي بيخلي [[for...of]] يمشي على الحروف

~~~js iterate.js
console.log("a😀b".split(""), [..."a😀b"]);
for (const ch of "a😀") console.log(ch, ch.length);
~~~

~~~text الناتج
[ 'a', '\ud83d', '\ude00', 'b' ] [ 'a', '😀', 'b' ]
a 1
😀 2
~~~

أي حاجة ينفع تلف عليها بـ [[for...of]] أو تفردها بـ [[...]] عندها method اسمها [[[Symbol.iterator]]] (درس «iterators و generators»). النص عنده واحدة بتمشي على **code points**: لما تقابل high surrogate وراه low، بترجّعهم مع بعض كحرف واحد. شوفها بنفسك:

~~~js iterator.js
const it = "a😀"[Symbol.iterator]();
console.log(it.next(), it.next(), it.next());
~~~

~~~text الناتج
{ value: 'a', done: false } { value: '😀', done: false } { value: undefined, done: true }
~~~

كل [[next()]] بيرجّع الحرف الجاي، و [[done: true]] لما يخلص. واللي بيستخدموا الـ iterator ده:
- [[for (const ch of s)]]
- [[[...s]]] (spread)
- [[Array.from(s)]]، وبتاخد دالة تانية: [[Array.from("a😀b", c => c.codePointAt(0))]] بترجّع [[[ 97, 128512, 98 ]]].

أما [[split("")]] بتقطّع على الخانات، فالإيموجي بيطلع نصّين مكسورين ([[\ud83d]] و [[\ude00]]: Node بيطبعهم كـ escapes لأنهم مش حروف). وكذلك [[for (let i = 0; i < s.length; i++)]] و [[s[i]]].

---

## ٧. الأداء: الطرق التلاتة بالأرقام

على نص مليون حرف (عربي بتشكيل وإيموجي)، عدّ الحروف الكاملة اتقاس ٣ مرات:

~~~text الناتج (مليون code point، Node 24.22)
spread 36.6 ms | charCodeAt loop 4.2 ms | for...of 20.0 ms
spread 10.0 ms | charCodeAt loop 6.0 ms | for...of 47.1 ms
spread 9.6 ms | charCodeAt loop 4.8 ms | for...of 8.8 ms
~~~

الأرقام بتتهز من تشغيل للتاني (الـ JIT بيسخن)، بس الـ loop بـ [[charCodeAt]] (التمرين الأخير) أسرع دايمًا لأنه مبيعملش نصوص جديدة. لنص عادي (فورم، رسالة) الفرق ميكروثواني، فاكتب [[[...s]]] اللي بيتقري.

---

## الخلاصة

| عايز | استخدم | مش |
|---|---|---|
| طول للتخزين أو [[slice]] | [[length]] | |
| عدد الحروف (code points) | [[[...s].length]] | [[length]] |
| الحروف اللي العين شايفاها | [[Intl.Segmenter]] (درس جاي) | [[[...s]]] |
| كود حرف | [[codePointAt(i)]] | [[charCodeAt(i)]] |
| حرف من كوده | [[String.fromCodePoint(n)]] | [[String.fromCharCode(n)]] |
| تلف على الحروف | [[for...of]] | [[for (let i...)]] و [[s[i]]] |
| تقطّع لحروف | [[[...s]]] أو [[Array.from(s)]] | [[split("")]] |`,
          lines: [
            R`اسم عربي ٤ حروف. كل حرف عربي كوده بين [[0600]] و [[06FF]] فبياخد خانة UTF-16 واحدة.`,
            R`إيموجي واحد كوده [[1F600]]، أكبر من [[FFFF]] فبيتخزن في خانتين (surrogate pair).`,
            R`[[length]] بيعد الخانات مش الحروف: 4 للاسم و 2 للإيموجي، مع إن الإيموجي حرف واحد على الشاشة.`,
            R`[[charAt(0)]] أول خانة كنص (س)، و [[charCodeAt(0)]] رقمها 1587، و [[codePointAt(0).toString(16)]] كوده بالـ hex [[633]].`,
            R`على الإيموجي [[charCodeAt]] بترجّع كل نص لوحده (55357 و 56832)، و [[codePointAt(0)]] بتقرا الاتنين وترجّع 128512 = [[1F600]].`,
            R`[[fromCharCode]] بتعمل نص من خانات (سا)، و [[fromCodePoint]] من أكواد كاملة فبتعمل الإيموجي من رقم واحد.`,
            R`[[split("")]] بيقطّع على الخانات فالإيموجي بيطلع نصّين مكسورين، و [[[...s]]] بيستخدم الـ iterator فبيطلع حرف كامل.`,
            R`[[for...of]] بيمشي على الحروف الكاملة: [[a]] طولها 1 والإيموجي طوله 2 بس جه مرة واحدة.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج [["أحمد".length]] و [["👍".length]] و [["👍🏽".length]] و [["🇪🇬".length]] و [["أحمد".charAt(9)]] و [["أحمد"[9]]] قبل ما تشغّل (من قسم ١ و ٢ في الشرح).`, done: R`كتبت 4 و 2 و 4 و 4 و [[""]] و [[undefined]]، وتقدر تقول ليه الإيد بلون البشرة 4 والعلم 4.`, sol: R`~~~js predict.js
const s = "أحمد";
console.log(s.length, "👍".length, "👍🏽".length, "🇪🇬".length, JSON.stringify(s.charAt(9)), s[9]);
~~~

~~~text الناتج
4 2 4 4 "" undefined
~~~

- [["👍🏽"]]: الإيد ([[1F44D]]) ولون البشرة ([[1F3FD]]) حرفين، كل واحد فوق [[FFFF]] فخانتين، المجموع 4.
- [["🇪🇬"]]: الأعلام مش رسمة واحدة، هي حرفين «Regional Indicator» (E و G) والشاشة بتجمعهم علم. كل واحد خانتين، 4.
- [[charAt(9)]] برّه النص بترجّع [[""]] و [[s[9]]] بترجّع [[undefined]]. فرق مهم لو بتلزق النتيجة في نص: [["x" + s[9]]] بتطلع [["xundefined"]].` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من غير جدول Unicode، اعرف كود [["ة"]] و [["ـ"]] (التطويل) و [["€"]] و [["😀"]] بشكل [[U+XXXX]]، وبعدين ارجّعهم نص واحد بنداء واحد (من قسم ٣ و ٥ في الشرح).`, done: R`طبعت [[U+0629]] و [[U+0640]] و [[U+20AC]] و [[U+1F600]]، و [[String.fromCodePoint]] واحدة رجّعت الأربعة مع بعض.`, sol: R`~~~js codes.js
const u = c => "U+" + c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
console.log(u("ة"), u("ـ"), u("€"), u("😀"));
console.log(String.fromCodePoint(0x629, 0x640, 0x20AC, 0x1F600));
~~~

~~~text الناتج
U+0629 U+0640 U+20AC U+1F600
ةـ€😀
~~~

- [[codePointAt(0)]] مش [[charCodeAt(0)]]: عشان الإيموجي يطلع [[1F600]] مش [[D83D]].
- [[toUpperCase()]] عشان الشكل الرسمي بحروف كبيرة، و [[padStart(4, "0")]] عشان [[629]] تبقى [[0629]] زي ما بتتكتب في الجداول.
- [[0x629]] في الكود رقم hex مباشرة (البادئة [[0x]])، فمحتاجش تحوّل.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[codepoints(str)]] بتطبع جدول: مكان كل حرف بالخانات، والحرف، وكوده [[U+XXXX]]، و «1 unit» أو «2 units». جرّبها على [["يا 👋"]] (من قسم ٣ و ٦ في الشرح).`, done: R`الجدول ٤ سطور: [[0]] و [[1]] و [[2]] و [[3]]، والإيموجي في سطر واحد كوده [[U+1F44B]] و «2 units». ولو زوّدت حرف بعد الإيموجي مكانه 5 مش 4.`, sol: R`~~~js codepoints.js
const u = c => "U+" + c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
function codepoints(str) {
  let i = 0;
  for (const ch of str) {
    console.log(String(i).padStart(2), ch, u(ch), ch.length === 2 ? "2 units" : "1 unit");
    i += ch.length;
  }
}
codepoints("يا 👋");
~~~

~~~text الناتج
 0 ي U+064A 1 unit
 1 ا U+0627 1 unit
 2   U+0020 1 unit
 3 👋 U+1F44B 2 units
~~~

- [[for...of]] بيدّي الحرف كامل، و [[ch.length]] بيقول هو كام خانة.
- [[i += ch.length]] مش [[i++]]: المكان بالخانات، عشان لو حد عمل [[str.slice(3)]] يبدأ من الإيموجي فعلًا. ده نفس اللي عملناه في مشروع «كاشف الحروف المخفية».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const reverse = s => s.split("").reverse().join("");]] بتقلب الكلام. جرّبها على [["تم 👍"]] واطبع النتيجة بـ [[JSON.stringify]] و [[isWellFormed()]]، وصلّحها (من قسم ٦ في الشرح).`, done: R`النسخة القديمة بترجّع [["\udc4d\ud83d مت"]] و [[isWellFormed()]] بـ [[false]]، والمصلّحة بترجّع [["👍 مت"]] و [[true]].`, sol: R`~~~js reverse.js
const reverseBad = str => str.split("").reverse().join("");
const reverse = str => [...str].reverse().join("");
console.log(JSON.stringify(reverseBad("تم 👍")), reverseBad("تم 👍").isWellFormed());
console.log(reverse("تم 👍"), reverse("تم 👍").isWellFormed());
~~~

~~~text الناتج
"\udc4d\ud83d مت" false
👍 مت true
~~~

**الباج:** [[split("")]] فصل الإيموجي لخانتين، و [[reverse]] عكس ترتيبهم، فبقى الـ low قبل الـ high: نص «مكسور» (درس «isWellFormed و toWellFormed»). والمتصفح بيعرض مكانه علامتين [[�]].

**التصليح:** [[[...str]]] بيقطّع على الحروف الكاملة، فالإيموجي بيتقلب كقطعة واحدة. بس خد بالك: [["👍🏽"]] هيتقلب لـ «لون بشرة + إيد» وهيتعرض غلط، لأن دول حرفين. القلب الصح تمامًا بالـ graphemes (درس «Intl.Segmenter»).` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[countCodePoints(str)]] من غير [[...]] ولا [[for...of]] ولا [[Array.from]]: لف بـ [[charCodeAt]] وعدّ الـ surrogate pair كحرف واحد، والخانة المكسورة لوحدها كحرف. حلّها في المربع اللي تحت (من قسم ٤ في الشرح).`, done: R`كل الاختبارات عدّت، والدالة بترجّع نفس [[[...s].length]] لـ [[""]] و [["سارة"]] و [["a😀b"]] و [["👍🏽"]] وحتى للخانات المكسورة [["\uD83D"]] و [["\uDE00\uD83D"]].`, sol: R`~~~js count-code-points.js
function countCodePoints(str) {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    const next = str.charCodeAt(i + 1);
    if (c >= 0xD800 && c <= 0xDBFF && next >= 0xDC00 && next <= 0xDFFF) i++;
    n++;
  }
  return n;
}
for (const t of ["", "سارة", "😀", "a😀b", "\uD83D", "\uDE00\uD83D", "👍🏽"]) console.log(JSON.stringify(t), countCodePoints(t), [...t].length);
~~~

~~~text الناتج
"" 0 0
"سارة" 4 4
"😀" 1 1
"a😀b" 3 3
"\ud83d" 1 1
"\ude00\ud83d" 2 2
"👍🏽" 2 2
~~~

- لو الخانة high ([[D800]] لـ [[DBFF]]) **والي بعدها** low ([[DC00]] لـ [[DFFF]])، دول حرف واحد: [[i++]] زيادة عشان نتخطى التانية.
- غير كده الخانة حرف لوحدها، حتى لو مكسورة. ده نفس سلوك الـ iterator بالظبط (العمود التالت).
- [[charCodeAt(i + 1)]] برّه النص بترجّع [[NaN]]، و [[NaN >= 0xDC00]] بـ [[false]]، فآخر حرف مبيعملش مشكلة من غير [[if]] زيادة.

ده اللي اتقاس في قسم ٧: أسرع من [[[...s].length]] لأنه مبيعملش array ولا نصوص.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عمل عدّاد لحقل «الاسم» بـ [[input.value.length]] بحد أقصى 20، ويوزر كتب [["سارة محمد إبراهيم 🇪🇬"]] واتقاله «الاسم طويل» مع إنه شايف ١٩ حرف. اشرحله في ٣ سطور إيه اللي حصل، وإيه الرقم اللي المفروض يتعد، وإيه الرقم اللي لازم يفضل للداتابيز.`, done: R`الشرح فيه إن [[length]] بيعد خانات UTF-16 والعلم ٤ خانات، وإن اللي يتعرض لليوزر هو الحروف الظاهرة (Segmenter)، وإن حد الداتابيز بيتحسب بالـ bytes أو الخانات حسب نوع العمود.`, sol: R`**الشرح النموذجي:**
1. [[length]] بيعد خانات UTF-16 مش حروف. العلم 🇪🇬 حرفين Unicode، كل واحد خانتين، يعني ٤. فالاسم (١٥ حرف ومسافتين) + مسافة + علم = ٢٢ خانة عند [[length]]، واليوزر شايف ١٩.
2. العدّاد اللي قدام اليوزر لازم يعد الحروف الظاهرة بـ [[Intl.Segmenter]] (درس جاي): العلم واحد، و «مُحَمَّد» ٤ مش ٨.
3. الحد الحقيقي في الداتابيز بيتعد بوحدة العمود: [[VARCHAR(20)]] في PostgreSQL بيعد code points، وفي MySQL بـ [[utf8mb4]] كمان، والـ bytes في UTF-8 (العلم ٨ bytes). فاعمل الحد اللي اليوزر شايفه بالـ graphemes، وخلّي الحد بتاع العمود أكبر بمسافة أمان.

~~~js flag.js
const name = "سارة محمد إبراهيم 🇪🇬";
console.log(name.length, [...name].length, [...new Intl.Segmenter().segment(name)].length);
~~~

~~~text الناتج
22 20 19
~~~

٣ أرقام لنفس الاسم: ٢٢ خانة، و ٢٠ code point (العلم اتنين)، و ١٩ حرف ظاهر. والحد ٢٠ وقع على أول رقم بس.` }
          ],
          check: {
            lang: "js",
            starter: R`function countCodePoints(str) {
  return str.length;
}`,
            tests: R`test("نص فاضي", () => expect(countCodePoints("")).toBe(0));
test("عربي: خانة لكل حرف", () => expect(countCodePoints("سارة")).toBe(4));
test("إيموجي = حرف واحد", () => expect(countCodePoints("a\u{1F600}b")).toBe(3));
test("لون البشرة حرف تاني", () => expect(countCodePoints("\u{1F44D}\u{1F3FD}")).toBe(2));
test("خانة مكسورة لوحدها = حرف", () => { expect(countCodePoints("\uD83D")).toBe(1); expect(countCodePoints("\uDE00\uD83D")).toBe(2); });
test("نفس رقم [...s].length على نص طويل", () => { const s = "أهلًا \u{1F600} ".repeat(50); expect(countCodePoints(s)).toBe([...s].length); });
test("من غير spread ولا for...of", () => { const src = String(countCodePoints); expect(/\.\.\.|for\s*\(\s*(const|let|var)\s+\w+\s+of|Array\.from/.test(src)).toBe(false); });`,
            solution: R`function countCodePoints(str) {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    const next = str.charCodeAt(i + 1);
    if (c >= 0xD800 && c <= 0xDBFF && next >= 0xDC00 && next <= 0xDFFF) i++;
    n++;
  }
  return n;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: String، UTF-16 characters و surrogate pairs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters" },
            { t: "MDN: String.prototype.length", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length" },
            { t: "MDN: String.prototype.charAt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt" },
            { t: "MDN: String.prototype.charCodeAt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt" },
            { t: "MDN: String.prototype.codePointAt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt" },
            { t: "MDN: String.fromCharCode()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode" },
            { t: "MDN: String.fromCodePoint()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint" },
            { t: "MDN: String.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Symbol.iterator" },
          ],
          pre: ["js/escape sequences و String.raw", "js/for...of و for...in", { to: "js/iterators و generators", why: R`لو عايز تفهم [[Symbol.iterator]] و [[next()]] بالتفصيل` }],
          deep: {
            why: R`أي عدّاد حروف، أو قص لنص، أو قلب، أو فحص «أول حرف»، بيتكسر على الإيموجي لو مبني على [[length]] و [[s[i]]]. والأخطاء دي صامتة: مفيش exception، بيطلع [[�]] في الشاشة أو [[URIError]] بعدين في حتة تانية. فهم الخانات هو اللي بيخلّيك تعرف ليه.`,
            how: R`النص في الذاكرة array من أرقام 16 bit. Unicode بيدّي كل حرف رقم (code point) من 0 لـ [[10FFFF]]. لو الرقم لحد [[FFFF]] بيتخزن في خانة واحدة، ولو أكبر بيتطرح منه [[10000]] ويتقسم 10 bits و 10 bits في خانتين: الأولى بين [[D800]] و [[DBFF]] والتانية بين [[DC00]] و [[DFFF]]. كل methods النصوص القديمة ([[length]] و [[charAt]] و [[slice]] و [[indexOf]]) بتشتغل على الخانات، والأحدث ([[codePointAt]] و [[fromCodePoint]] و الـ iterator) بتفهم الأزواج.`,
            when: R`[[length]] و [[slice]] لما بتتعامل مع مكان في النص (indexes). [[for...of]] و [[[...s]]] لما بتعد أو بتلف على حروف. [[codePointAt]] لما محتاج كود الحرف (فلترة، أو تصنيف، أو تحويل). و [[Intl.Segmenter]] لأي حاجة اليوزر بيشوفها (عداد، قص، قلب).`,
            mistakes: R`[[split("")]] و [[s[i]]] على نص فيه إيموجي. و [[String.fromCharCode]] بكود أكبر من [[FFFF]] (بيقص من غير error). و [[codePointAt(i)]] مع [[i++]]، فبتقع في نص الإيموجي. وحد أقصى في فورم بـ [[length]]. وتفتكر إن [[[...s].length]] هو اللي اليوزر شايفه: الأعلام والعيلات ولون البشرة والتشكيل أكتر من code point.`
          }
        },
        {
          cmd: "isWellFormed و toWellFormed",
          title: "تكتشف النص المكسور (نص إيموجي لوحده) قبل ما يوقّع encodeURIComponent، وتصلّحه",
          desc: R`لو قصّيت نص بـ [[slice]] أو [[substring]] في نص إيموجي، هيفضل نص الإيموجي لوحده: خانة surrogate من غير أختها، اسمها **lone surrogate**. النص ده «مش well-formed»: بيتعرض [[�]]، و [[encodeURIComponent]] بيرمي [[URIError: URI malformed]].
• [[s.isWellFormed()]]: بترجّع [[true]] لو مفيش ولا خانة مكسورة.
• [[s.toWellFormed()]]: بترجّع نسخة كل خانة مكسورة فيها بقت [[U+FFFD]] (علامة الاستبدال [[�]]).
والأحسن من التصليح إنك متكسرش أصلًا: اقطع على الحروف ([[[...s].slice]]) أو الـ graphemes.`,
          example: R`const msg = "تمام 😀";
const cut = msg.slice(0, 6);
console.log(cut.isWellFormed(), msg.isWellFormed());
try { encodeURIComponent(cut); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(encodeURIComponent(cut.toWellFormed()));
console.log(JSON.stringify(cut), JSON.stringify(cut.toWellFormed()));
const safe = [...msg].slice(0, 6).join("");
console.log(safe, safe.isWellFormed());`,
          try: R`في ملف: [[const t = "😀".slice(0, 1);]] واطبع [[t.isWellFormed()]] و [[JSON.stringify(t)]] و [[JSON.stringify(t.toWellFormed())]]. وبعدين جرّب [[encodeURIComponent(t)]] جوه [[try/catch]]، و [[new TextEncoder().encode(t)]]، و [[Buffer.from(t).toString("hex")]].`,
          sol: R`[[t.isWellFormed()]] بـ [[false]]، و [[JSON.stringify(t)]] بيطبع [["\ud83d"]]، و [[toWellFormed()]] بيطبع [["�"]]. و [[encodeURIComponent(t)]] بيرمي [[URIError: URI malformed]]. أما [[TextEncoder]] بيرجّع [[Uint8Array(3) [ 239, 191, 189 ]]] و [[Buffer]] بيرجّع [[efbfbd]]: الاتنين بدّلوا الخانة المكسورة بـ [[U+FFFD]] من غير ما يقولولك.`,
          teach: R`## الفكرة

من الدرس اللي فات: الإيموجي خانتين، high surrogate وبعده low. لو واحدة منهم فضلت لوحدها (قصّيت النص في نصه، أو قلبته بـ [[split("")]]، أو جالك من API بايظ)، النص بقى **ill-formed**. JavaScript نفسه مش بيمانع (النص array أرقام وخلاص)، بس أي حاجة بتحوّله لـ bytes (URL، أو ملف، أو شبكة) لازم تتصرف. الدرس بيوريك تكتشفه وتصلّحه وتمنعه. اتشغّل بـ Node 24.22، واتأكد في Chrome 157 (نفس الناتج).

---

## ١. إزاي النص بيتكسر

~~~js well.js
const msg = "تمام 😀";
const cut = msg.slice(0, 6);
~~~

[["تمام "]] ٥ خانات، والإيموجي خانتين، فالطول ٧. [[slice(0, 6)]] بياخد أول ٦ خانات، يعني «تمام » + **أول نص** الإيموجي بس. ومفيش error، و [[cut.length]] بـ 6 عادي.

---

## ٢. String.prototype.isWellFormed()

~~~js well.js
console.log(cut.isWellFormed(), msg.isWellFormed());
~~~

~~~text الناتج
false true
~~~

[[isWellFormed()]] بتلف على النص وترجّع [[false]] لو لقت خانة surrogate من غير أختها. الحالات:

| النص | [[isWellFormed()]] | ليه |
|---|---|---|
| [["\uD83D\uDE00"]] | [[true]] | high وبعده low: إيموجي سليم |
| [["\uDE00\uD83D"]] | [[false]] | low الأول: الترتيب غلط |
| [[""]] | [[true]] | مفيش حاجة مكسورة |
| [["abc\uDC00"]] | [[false]] | low لوحده في الآخر |
| [["\uD83D\uD83D\uDE00"]] | [[false]] | أول high ملوش low، حتى لو اللي بعده سليم |

(اتجرّبوا كلهم في التمرين الأول.)

---

## ٣. ليه ده مهم: [[encodeURIComponent]] بيرمي [[URIError]]

~~~js well.js
try { encodeURIComponent(cut); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
URIError: URI malformed
~~~

[[encodeURIComponent]] بيحوّل النص لـ bytes UTF-8 عشان يحطهم في رابط ([[%D8%AA]]...). والخانة المكسورة ملهاش bytes في UTF-8، فبيرمي. و [[encodeURI]] نفس الكلام. ده خطأ حقيقي بيحصل لما: معاينة رسالة اتقصت بـ [[slice]] واتبعتت في query string، أو كلمة بحث اتقصت لـ ٥٠ خانة، أو اسم ملف اتقص. و [[URIError]] من الأخطاء اللي محدش بيعمل لها [[catch]]، فالصفحة كلها بتقف.

---

## ٤. String.prototype.toWellFormed(): استبدال بـ [[U+FFFD]]

~~~js well.js
console.log(encodeURIComponent(cut.toWellFormed()));
console.log(JSON.stringify(cut), JSON.stringify(cut.toWellFormed()));
~~~

~~~text الناتج
%D8%AA%D9%85%D8%A7%D9%85%20%EF%BF%BD
"تمام \ud83d" "تمام �"
~~~

- [[toWellFormed()]] بترجّع نص **جديد** (الأصل مبيتغيرش) كل خانة مكسورة فيه بقت [[U+FFFD]]، الحرف [[�]] اللي اسمه replacement character: «هنا كان فيه حرف مش سليم».
- الطول بيفضل زي ما هو (6)، لأن [[U+FFFD]] خانة واحدة مكان خانة واحدة.
- [[encodeURIComponent]] اشتغل، و [[�]] بقت [[%EF%BF%BD]] (الـ ٣ bytes بتوع [[U+FFFD]] في UTF-8).
- [[JSON.stringify(cut)]] كتب الخانة المكسورة escape ([["\ud83d"]]) بدل ما يطلّع JSON بايظ. ده من ES2019 (اسمه well-formed JSON.stringify).

**إمتى [[toWellFormed]]:** قبل ما تبعت نص مش متأكد منه لحاجة مبتقبلش المكسور ([[encodeURIComponent]]، أو API، أو ملف). اليوزر هيشوف [[�]] بدل ما الطلب كله يفشل.

---

## ٥. [[TextEncoder]] و [[Buffer]] بيبدّلوا في صمت

~~~text الناتج
new TextEncoder().encode("\uD83D")   Uint8Array(3) [ 239, 191, 189 ]
new TextEncoder().encode("😀")        Uint8Array(4) [ 240, 159, 152, 128 ]
Buffer.from("\uD83D").toString("hex") efbfbd
Buffer.byteLength(cut)               12
~~~

[[239, 191, 189]] هما [[EF BF BD]]، يعني [[U+FFFD]]. يعني [[TextEncoder]] (في المتصفح و Node) و [[Buffer]] و [[fs.writeFileSync]] و [[fetch]] بيعملوا [[toWellFormed]] لوحدهم من غير ما يقولولك. والنتيجة: النص اتغيّر في السكوت، والـ [[�]] بيظهر في الداتابيز بعد أسبوع ومحدش عارف جه منين. فلو عايز تعرف، افحص بـ [[isWellFormed()]] قبل الحفظ وسجّل.

---

## ٦. الأحسن: متكسرش أصلًا

~~~js well.js
const safe = [...msg].slice(0, 6).join("");
console.log(safe, safe.isWellFormed());
~~~

~~~text الناتج
تمام 😀 true
~~~

[[[...msg]]] بيقطّع على الحروف الكاملة (الـ iterator من الدرس اللي فات)، فـ [[slice(0, 6)]] بقى «أول ٦ حروف» مش «أول ٦ خانات»، والإيموجي دخل كامل. و [[join("")]] رجّعه نص.

بس ده كمان مش كامل: الإيد بلون البشرة 👍🏽 حرفين، فممكن تقطع بينهم وتفضل الإيد من غير اللون (النص well-formed بس شكله اتغيّر). الحل الكامل للقص اللي اليوزر شايفه هو [[Intl.Segmenter]] (درس جاي، واتجرّب في التمرين التالت).

---

## ٧. بتكلّف كام؟

[[isWellFormed()]] على نص ١٠ مليون حرف عربي وفي آخره إيموجي: **6 ms** على جهاز عادي (Node 24.22). يعني تقدر تفحص أي نص جاي من يوزر أو من API من غير ما تفكر في الأداء.

---

## الخلاصة

| الحالة | اعمل |
|---|---|
| هتقص نص لعرض أو لينك | [[[...s].slice(...)]] أو Segmenter، مش [[slice]] على النص |
| نص جاي من برّه وهيتبعت في URL | [[s.toWellFormed()]] قبل [[encodeURIComponent]] |
| عايز تعرف لو فيه مشكلة (لوج أو validation) | [[s.isWellFormed()]] |
| شايف [[�]] في الداتابيز | النص اتكسر قبل الحفظ والـ encoder بدّله؛ دوّر على [[slice]] أو [[split("")]] |`,
          lines: [
            R`رسالة فيها إيموجي في الآخر. طولها 7 خانات: «تمام » خمسة والإيموجي اتنين.`,
            R`[[slice(0, 6)]] بتاخد أول ٦ خانات، فالإيموجي اتقص في نصه وفضل high surrogate لوحده من غير ولا error.`,
            R`[[isWellFormed()]] بترجّع [[false]] للمقصوص لأن فيه خانة مكسورة، و [[true]] للأصل.`,
            R`[[encodeURIComponent]] مبيقدرش يحوّل الخانة المكسورة لـ UTF-8، فبيرمي [[URIError: URI malformed]] واتمسك بـ [[catch]].`,
            R`[[toWellFormed()]] بدّلت الخانة المكسورة بـ [[U+FFFD]]، فـ [[encodeURIComponent]] اشتغل وطلّع [[%EF%BF%BD]] في الآخر.`,
            R`[[JSON.stringify]] بيكتب الخانة المكسورة escape ([[\ud83d]])، وبعد [[toWellFormed]] بقت الحرف [[�]] نفسه.`,
            R`القص الصح: [[[...msg]]] بيقطّع على الحروف الكاملة، فـ [[slice(0, 6)]] أخدت الإيموجي كامل، و [[join("")]] رجّعته نص.`,
            R`النص المقصوص صح بيتطبع كامل و [[isWellFormed()]] بـ [[true]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[isWellFormed()]] لكل واحد: [["\uD83D\uDE00"]] و [["\uDE00\uD83D"]] و [[""]] و [["abc\uDC00"]] و [["\uD83D\uD83D\uDE00"]] (من قسم ٢ في الشرح).`, done: R`توقعت [[true]] و [[false]] و [[true]] و [[false]] و [[false]]، وتقدر تقول ليه الأخيرة [[false]] مع إن فيها إيموجي سليم.`, sol: R`~~~js predict.js
for (const s of ["\uD83D\uDE00", "\uDE00\uD83D", "", "abc\uDC00", "\uD83D\uD83D\uDE00"]) console.log(JSON.stringify(s), s.isWellFormed());
~~~

~~~text الناتج
"😀" true
"\ude00\ud83d" false
"" true
"abc\udc00" false
"\ud83d😀" false
~~~

- الأول زوج سليم، و [[JSON.stringify]] طبعه الإيموجي نفسه.
- التاني الترتيب مقلوب: low قبل high، فالاتنين مكسورين.
- الأخير: أول [[D83D]] وراه [[D83D]] تاني مش low، فهو لوحده. والزوج اللي بعده سليم وبيتطبع 😀. خانة واحدة مكسورة كفاية تخلي النص كله [[false]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[buildUrl(base, params)]] بتعمل رابط بحث من object، وعمرها ما ترمي [[URIError]] حتى لو قيمة فيها إيموجي مقصوص. جرّبها على [[{ q: "تيشرت 👕".slice(0, 7), page: 2 }]] وعلى نفس الكلمة كاملة (من قسم ٣ و ٤ في الشرح).`, done: R`الكلمة المقصوصة بتطلع [[%EF%BF%BD]] مكان الإيموجي، والكاملة بتطلع [[%F0%9F%91%95]]، ومفيش [[try]] في الدالة لأنها مبقتش محتاجاه.`, sol: R`~~~js build-url.js
function buildUrl(base, params) {
  const q = Object.entries(params)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(String(v).toWellFormed()))
    .join("&");
  return base + "?" + q;
}
console.log(buildUrl("https://shop.example.test/search", { q: "تيشرت 👕".slice(0, 7), page: 2 }));
console.log(buildUrl("https://shop.example.test/search", { q: "تيشرت 👕", page: 2 }));
~~~

~~~text الناتج
https://shop.example.test/search?q=%D8%AA%D9%8A%D8%B4%D8%B1%D8%AA%20%EF%BF%BD&page=2
https://shop.example.test/search?q=%D8%AA%D9%8A%D8%B4%D8%B1%D8%AA%20%F0%9F%91%95&page=2
~~~

- [[Object.entries]] بترجّع [[[key, value]]] لكل خانة، و [[map]] بتعمل [[key=value]] متشفّرين، و [[join("&")]] بتلزقهم.
- [[String(v)]] الأول عشان [[page: 2]] رقم ومعندوش [[toWellFormed]]. وبعدها [[toWellFormed()]] قبل التشفير.
- في المتصفح فيه [[new URLSearchParams(params).toString()]] بيعمل ده كله، وبيبدّل المكسور بـ [[%EF%BF%BD]] لوحده من غير error، وبيكتب المسافة [[+]] مش [[%20]] (اتجرّب في Node: [[q=%D8%AA%D9%8A%D8%B4%D8%B1%D8%AA+%EF%BF%BD&page=2]]). الدالة دي بتوريك اللي بيحصل من جوه (درس «FormData و URLSearchParams»).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** إشعار بيعرض أول 25 خانة من الرسالة بـ [[chat.substring(0, 25)]] وبيبعتها في رابط، والرسالة [["الطلب اتشحن وهيوصل بكرة 👍🏽"]]. لاقي المشكلة، وصلّحها مرة بـ code points ومرة بالـ graphemes، وقارن (من قسم ٣ و ٦ في الشرح).`, done: R`النسخة القديمة [[isWellFormed()]] بـ [[false]] و [[encodeURIComponent]] بيرمي. نسخة الـ code points بتطلع الإيد من غير لون البشرة، ونسخة الـ graphemes بتطلع 👍🏽 كاملة.`, sol: R`~~~js preview.js
const chat = "الطلب اتشحن وهيوصل بكرة 👍🏽";
const previewBad = chat.substring(0, 25);
console.log(previewBad.length, previewBad.isWellFormed());
try { encodeURIComponent(previewBad); } catch (e) { console.log(e.name + ": " + e.message); }
const previewCp = [...chat].slice(0, 25).join("");
console.log(previewCp, previewCp.isWellFormed(), [...chat].length);
console.log(JSON.stringify([...chat].slice(24)));
const g = new Intl.Segmenter("ar", { granularity: "grapheme" });
const previewG = [...g.segment(chat)].slice(0, 25).map(s => s.segment).join("");
console.log(previewG, [...g.segment(chat)].length);
~~~

~~~text الناتج
25 false
URIError: URI malformed
الطلب اتشحن وهيوصل بكرة 👍 true 26
["👍","🏽"]
الطلب اتشحن وهيوصل بكرة 👍🏽 25
~~~

- النص ٢٤ خانة قبل الإيموجي، و [[substring(0, 25)]] أخدت أول نص الإيد بس: [[false]] و [[URIError]].
- [[[...chat]]] فيه ٢٦ حرف: الإيد واللون **حرفين** (السطر الرابع). فـ [[slice(0, 25)]] أخدت الإيد من غير اللون: well-formed بس اليوزر هيشوف إيد صفرا بدل اللي كتبها.
- الـ Segmenter شايف ٢٥ حرف ظاهر، و 👍🏽 واحد منهم، فالقص عليه صح. ده اللي تستخدمه في أي معاينة (درس «Intl.Segmenter»، ومشروع «معاينة الرسالة في الإشعار»).` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[myToWellFormed(str)]] بإيدك بـ [[charCodeAt]]: كل high من غير low بعده، وكل low من غير high قبله، يبقوا [["\uFFFD"]]، والأزواج السليمة زي ما هي. لازم ناتجها يساوي [[str.toWellFormed()]]. حلّها في المربع اللي تحت (من قسم ٤ في الشرح).`, done: R`كل الاختبارات عدّت، والدالة بتطابق [[toWellFormed()]] على [["\uD83D"]] و [["a\uDE00b"]] و [["\uDE00\uD83D"]] و [["\uD83D\uD83D\uDE00"]] والنصوص السليمة.`, sol: R`~~~js my-to-well-formed.js
function myToWellFormed(str) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF) {
      const n = str.charCodeAt(i + 1);
      if (n >= 0xDC00 && n <= 0xDFFF) { out += str[i] + str[i + 1]; i++; }
      else out += "\uFFFD";
    } else if (c >= 0xDC00 && c <= 0xDFFF) out += "\uFFFD";
    else out += str[i];
  }
  return out;
}
for (const s of ["سارة", "😀", "\uD83D", "a\uDE00b", "\uDE00\uD83D", "\uD83D\uD83D\uDE00"]) {
  console.log(JSON.stringify(s), JSON.stringify(myToWellFormed(s)), myToWellFormed(s) === s.toWellFormed());
}
~~~

~~~text الناتج
"سارة" "سارة" true
"😀" "😀" true
"\ud83d" "�" true
"a\ude00b" "a�b" true
"\ude00\ud83d" "��" true
"\ud83d😀" "�😀" true
~~~

- high: بص على اللي بعده. لو low ضيف الاتنين واقفز ([[i++]])، غير كده [[\uFFFD]].
- low: لو وصلناله هنا يبقى ملوش high قبله (لأن الـ high السليم كان هياكله في الخطوة اللي فاتت)، فـ [[\uFFFD]].
- الغلطة الشائعة: تنسى [[i++]] بعد الزوج، فالـ low يتقري تاني لوحده ويبقى [[�]] زيادة.` }
          ],
          check: {
            lang: "js",
            starter: R`function myToWellFormed(str) {
  return str;
}`,
            tests: R`test("النص السليم زي ما هو", () => { expect(myToWellFormed("سارة")).toBe("سارة"); expect(myToWellFormed("a\u{1F600}b")).toBe("a\u{1F600}b"); });
test("high لوحده", () => expect(myToWellFormed("\uD83D")).toBe("�"));
test("low لوحده في النص", () => expect(myToWellFormed("a\uDE00b")).toBe("a�b"));
test("ترتيب مقلوب = اتنين مكسورين", () => expect(myToWellFormed("\uDE00\uD83D")).toBe("��"));
test("high مكسور وبعده زوج سليم", () => expect(myToWellFormed("\uD83D😀")).toBe("�\u{1F600}"));
test("نفس ناتج toWellFormed", () => { for (const s of ["", "\uDC00x", "x\uD800", "\u{1F44D}\u{1F3FD}"]) expect(myToWellFormed(s)).toBe(s.toWellFormed()); });`,
            solution: R`function myToWellFormed(str) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF) {
      const n = str.charCodeAt(i + 1);
      if (n >= 0xDC00 && n <= 0xDFFF) { out += str[i] + str[i + 1]; i++; }
      else out += "�";
    } else if (c >= 0xDC00 && c <= 0xDFFF) out += "�";
    else out += str[i];
  }
  return out;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: String.prototype.isWellFormed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/isWellFormed" },
            { t: "MDN: String.prototype.toWellFormed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toWellFormed" },
            { t: "MDN: URIError: URI malformed", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Malformed_URI" },
            { t: "ECMAScript: String.prototype.isWellFormed", url: "https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.iswellformed" },
          ],
          pre: ["js/string و UTF-16: length و codePointAt"],
          deep: {
            why: R`النص المكسور مبيوقعش البرنامج وقت ما بيتكسر، بيوقعه بعدين: [[URIError]] في [[encodeURIComponent]]، أو [[�]] متخزن في الداتابيز. والسبب دايمًا قص أو قلب على الخانات. [[isWellFormed]] و [[toWellFormed]] (من ES2024، و Baseline من ٢٠٢٣) بيخلّوك تمسكه وتصلّحه في سطر.`,
            how: R`النص في JavaScript مجرد خانات 16 bit، وأي ترتيب مسموح. «well-formed» معناها كل خانة بين [[D800]] و [[DBFF]] وراها واحدة بين [[DC00]] و [[DFFF]]، وكل واحدة من التانية قبلها واحدة من الأولى. [[isWellFormed()]] بتلف مرة واحدة على الخانات (O(n))، و [[toWellFormed()]] بتعمل نسخة بنفس الطول وتبدّل أي خانة مكسورة بـ [[U+FFFD]]. وأي encoder لـ UTF-8 ([[TextEncoder]] و [[Buffer]]) بيعمل نفس التبديل في السكوت، أما [[encodeURIComponent]] بيرمي.`,
            when: R`[[toWellFormed()]] قبل [[encodeURIComponent]] على أي نص جاي من برّه أو متقص. [[isWellFormed()]] في validation أو لوج عشان تعرف إن فيه مشكلة قبل ما الـ encoder يخفيها. والأهم: اقطع على الحروف أو الـ graphemes بدل الخانات، فمتحتاجش الاتنين أصلًا.`,
            mistakes: R`[[s.slice(0, n)]] أو [[substring]] لمعاينة. و [[split("").reverse()]]. و [[try/catch]] حوالين [[encodeURIComponent]] وتسيب الطلب يفشل بدل ما تصلّح النص. وتفتكر إن [[TextEncoder]] هيرمي زي [[encodeURIComponent]]: لأ، بيبدّل في السكوت. وتفتكر إن [[toWellFormed]] بتصلّح الإيموجي: لأ، بتحط [[�]] مكانه، والحرف الأصلي ضاع.`
          }
        },
        {
          cmd: "normalize و التشكيل",
          title: "تقارن «أحمد» بـ «أحمد» صح لما يكونوا مكتوبين بحروف مختلفة، وتشيل التشكيل",
          desc: R`نفس الكلمة ممكن تتكتب بأكتر من طريقة في Unicode وتبان زي بعض بالظبط: «أ» حرف واحد ([[U+0623]]) أو «ا» وبعدها همزة فوق ([[U+0627]] + [[U+0654]])، و «é» حرف واحد أو «e» وعلامة. و [[===]] بيقول إنهم مختلفين.
• [[s.normalize()]] (أو [[normalize("NFC")]]) بتحوّل أي نص لشكل واحد ثابت: الحروف مركّبة، والتشكيل مترتب. اعملها على النصين قبل أي مقارنة أو حفظ.
• [[normalize("NFD")]] بتفك كل حرف لأساسه وعلاماته، ومعاها [[replace(/\p{M}/gu, "")]] بتشيل التشكيل.
• [[NFKC]] و [[NFKD]] بيفكوا كمان الأشكال «المتوافقة» (ﻻ ← لا، و ＡＢＣ ← ABC، و x² ← x2)، فبيغيّروا المعنى أحيانًا: للبحث بس، مش للتخزين.`,
          example: R`const a = "caf\u00e9";
const b = "cafe\u0301";
console.log(a === b, a.length, b.length);
console.log(a.normalize() === b.normalize());
const h1 = "\u0623\u062d\u0645\u062f";
const h2 = "\u0627\u0654\u062d\u0645\u062f";
console.log(h1 === h2, h1 === h2.normalize("NFC"));
console.log("\ufefb".normalize("NFKC"), "ＡＢＣ１２３".normalize("NFKC"));
console.log("مُحَمَّد".normalize("NFD").replace(/\p{M}/gu, ""));`,
          try: R`اكتب [[const x = "\u0645\u0651\u064e";]] (ميم وبعدها شدة وبعدها فتحة) و [[const y = "\u0645\u064e\u0651";]] (فتحة وبعدها شدة). اطبعهم: نفس الشكل. قارنهم بـ [[===]]، وبعدين بعد [[normalize()]]. واطبع الأكواد بعد الـ normalize لكل واحد.`,
          sol: R`[[x === y]] بـ [[false]]، و [[x.normalize() === y.normalize()]] بـ [[true]]. والاتنين بعد الـ normalize بقوا [[0645 064e 0651]]: الفتحة الأول وبعدها الشدة، لأن Unicode بيدّي كل علامة رقم ترتيب (الفتحة 30 والشدة 33) و NFC بيرتّبهم تصاعدي. ده بيحصل فعلًا: كيبوردات بتكتب الشدة الأول وكيبوردات بتكتبها بعد الحركة.`,
          teach: R`## الفكرة

Unicode فيه أكتر من طريقة تكتب نفس الحرف. الطرق دي اسمها «متكافئة» (canonically equivalent): العين مش هتفرق، بس الـ code points مختلفة، فـ [[===]] و [[includes]] و [[Set]] و [[Map]] والبحث في الداتابيز كلهم هيقولوا «مختلفين». [[normalize]] بتحوّل أي نص لشكل واحد متفق عليه. الدرس بيبدأ بمثال لاتيني بسيط، وبعدين العربي (الهمزة، والتشكيل، والحروف المركّبة)، وبعدين إزاي تشيل التشكيل للبحث. اتشغّل بـ Node 24.22 (ICU 78.3، Unicode 17)، و Chrome 157 طلّع نفس الناتج للي اتجرّب فيه.

---

## ١. نفس الشكل، حروف مختلفة

~~~js same.js
const a = "caf\u00e9";
const b = "cafe\u0301";
console.log(a === b, a.length, b.length);
~~~

~~~text الناتج
false 4 5
~~~

- [[a]]: «é» حرف واحد مركّب ([[U+00E9]]).
- [[b]]: «e» عادية ([[U+0065]]) وبعدها علامة الحدّة ([[U+0301]])، علامة بتتركّب على الحرف اللي قبلها (combining mark).
- الاتنين بيتطبعوا [[café]] بالظبط. بس الطول 4 و 5، و [[===]] بـ [[false]].

النصوص دي بتيجي فعلًا: ماك بيخزّن أسامي الملفات بالشكل المفكوك، والنسخ من PDF بيجيب أشكال مختلفة، وكيبوردات الموبايل بتكتب أحيانًا الحرف والعلامة لوحدهم.

---

## ٢. String.prototype.normalize(): الشكل الواحد

~~~js same.js
console.log(a.normalize() === b.normalize());
~~~

~~~text الناتج
true
~~~

[[normalize()]] من غير باراميتر = [[normalize("NFC")]]: بتركّب كل حرف + علامة ليهم حرف مركّب جاهز. فـ [[b.normalize()]] بقى 4 خانات زي [[a]]. وبترجّع نص جديد، والأصل مبيتغيرش.

---

## ٣. العربي: «أ» حرف واحد ولا «ا» + همزة؟

~~~js hamza.js
const h1 = "\u0623\u062d\u0645\u062f";
const h2 = "\u0627\u0654\u062d\u0645\u062f";
console.log(h1 === h2, h1 === h2.normalize("NFC"));
~~~

~~~text الناتج
false true
~~~

- [[h1]]: «أحمد» بالألف المهموزة حرف واحد ([[U+0623]]).
- [[h2]]: ألف عادية ([[U+0627]]) وبعدها «همزة فوق» ([[U+0654]])، وهي علامة بتتركّب زي التشكيل. على الشاشة «أحمد» برضه، بس ٥ خانات.
- [[normalize("NFC")]] ركّبت الألف والهمزة في [[U+0623]]، فبقوا زي بعض.

ونفس الكلام في «إ» ([[U+0627]] + [[U+0655]] همزة تحت) و «آ» ([[U+0627]] + [[U+0653]] مدة) و «ؤ» ([[U+0648]] + [[U+0654]]) و «ئ» ([[U+064A]] + [[U+0654]]). اتطبعوا بـ [[normalize("NFD")]] في القسم ٨.

---

## ٤. ترتيب التشكيل: الشدة قبل الفتحة ولا بعدها؟

~~~js shadda.js
const m1 = "\u0645\u0651\u064e";
const m2 = "\u0645\u064e\u0651";
const hex = s => [...s].map(c => c.codePointAt(0).toString(16).padStart(4, "0")).join(" ");
console.log(m1 === m2, m1.normalize() === m2.normalize());
console.log(hex(m1.normalize()), "|", hex(m2.normalize()));
~~~

~~~text الناتج
false true
0645 064e 0651 | 0645 064e 0651
~~~

«مَّ» ممكن تتكتب ميم + شدة + فتحة، أو ميم + فتحة + شدة، والشكل واحد. Unicode بيدّي كل علامة رقم اسمه combining class (الفتحة 30 والشدة 33)، و NFC (و NFD كمان) بيرتّب العلامات اللي ورا بعض بالرقم ده. فأي ترتيب كتبه اليوزر، الناتج واحد. ده سبب حقيقي إن اسم بتشكيل اتكتب من موبايلين مختلفين ميتلاقاش في البحث.

---

## ٥. الأشكال الأربعة

| الشكل | بيعمل إيه | «é» | «ﻻ» |
|---|---|---|---|
| [[NFC]] | يركّب (الافتراضي) | حرف واحد | زي ما هي (حرف واحد) |
| [[NFD]] | يفك لأساس + علامات | حرفين | زي ما هي |
| [[NFKC]] | يفك الأشكال المتوافقة وبعدين يركّب | حرف واحد | «لا» حرفين |
| [[NFKD]] | يفك الأشكال المتوافقة ويفك العلامات | حرفين | «لا» حرفين |

الـ K معناها compatibility. والأطوال اتقاست:

~~~text الناتج: الطول قبل وبعد كل شكل (الأصل، NFC، NFD، NFKC)
"é" (حرف واحد)       1 1 2 1
"é" (e + علامة)      2 1 2 1
"أ" (حرف واحد)       1 1 2 1
"أ" (ا + همزة)       2 1 2 1
"ﻻ"                  1 1 1 2
~~~

---

## ٦. NFKC: الأشكال «المتوافقة»

فيه حروف في Unicode موجودة عشان أنظمة قديمة بس: «ﻻ» حرف واحد ([[U+FEFB]]) هو نفسه «لا»، و «ﷲ» ([[U+FDF2]]) حرف واحد هو «الله»، والحروف العريضة ＡＢＣ (بتيجي من كيبوردات آسيوية). NFKC بيحوّلهم للعادي:

~~~text الناتج: s.normalize("NFKC")
x² -> x2
H₂O -> H2O
ﬁle -> file
① -> 1
٣ -> ٣
ﻻ -> لا
ＡＢＣ -> ABC
ﷲ -> الله
~~~

لاحظ إن [[x²]] بقت [[x2]] و [[H₂O]] بقت [[H2O]]: المعنى اتغيّر (مربع بقى ٢). عشان كده NFKC للبحث والمقارنة بس، ومتخزّنش بيه النص الأصلي. ولاحظ إن [[٣]] فضلت زي ما هي: الأرقام العربي مش «شكل متوافق» للأرقام الإنجليزي، دي أرقام مستقلة.

---

## ٧. اللي [[normalize]] مش بيعمله

| الحالة | بعد NFKC | تعملها إزاي |
|---|---|---|
| [[ة]] و [[ه]] | مختلفين | [[replace(/ة/g, "ه")]] في مفتاح البحث |
| [[ى]] و [[ي]] | مختلفين | [[replace(/ى/g, "ي")]] |
| التطويل [[ـ]] ([[U+0640]]) | بيفضل ([["مـحـمـد"]] لسه 7) | [[replace(/\u{640}/gu, "")]] |
| [[٣]] و [[3]] | مختلفين | جدول تحويل (مشروع «بحث في أسماء العملاء») |
| [[أ]] و [[ا]] | مختلفين (حرفين مختلفين في اللغة) | NFD وشيل العلامات (القسم الجاي) |

دول مش «نفس الحرف بطريقتين»، دول حروف مختلفة الناس بتبدّلها في الكتابة. [[normalize]] مبيلمسهاش، وده صح: في اسم أو عنوان «هدى» غير «هدي». بتوحّدهم بنفسك في مفتاح البحث بس.

---

## ٨. شيل التشكيل: NFD وبعدين [[\p{M}]]

~~~js strip.js
console.log("مُحَمَّد".normalize("NFD").replace(/\p{M}/gu, ""));
console.log("أحمد".normalize("NFD").replace(/\p{M}/gu, ""), "café".normalize("NFD").replace(/\p{M}/gu, ""));
~~~

~~~text الناتج
محمد
احمد cafe
~~~

1. [[normalize("NFD")]]: كل حرف مركّب اتفك لأساس + علامات.
2. [[replace(/\p{M}/gu, "")]]: [[\p{M}]] أي علامة (M = Mark: تشكيل، همزة فوق وتحت، مدة، علامات لاتيني)، و [[g]] كلهم، و [[u]] لازم عشان [[\p]] (درس «regex والعربي: Unicode properties»).

خد بالك من السطر التاني: «أحمد» بقت «احمد». الهمزة كانت «علامة» بعد NFD فاتشالت. للبحث ده اللي عايزه بالظبط (اللي يكتب «احمد» يلاقي «أحمد»)، بس للعرض لأ. والفك بتاع NFD:

~~~text الناتج: الأكواد بعد NFD (أو NFKD)
ئ  064a 0654
آ  0627 0653
إ  0627 0655
ؤ  0648 0654
ة  0629
ى  0649
~~~

يعني «ئ» بتبقى «ي» بعد الشيل، وده بالظبط الفخ اللي في درس «مسائل نصوص» («للمبتدئين» بقت «للمبتديين»): قرر هتشيل الهمزة ولا لأ قبل ما تستخدم NFD.

---

## ٩. إمتى تعمل normalize، وبيكلّف كام

**عند الحفظ وعند المقارنة، مش وقت العرض.** نموذج عملي: أي اسم أو عنوان جاي من فورم اعمله [[normalize("NFC")]] قبل ما يتحفظ، وأي كلمة بحث كمان. كده كل اللي في الداتابيز بشكل واحد. [[Set]] بيوري الفرق:

~~~text الناتج: نفس 6 أسامي من مصدرين (عدد المختلفين قبل وبعد NFC)
5 3
[ 'أسماء', 'محمَّد', 'سارة' ]
~~~

والتكلفة على نص مليون خانة عربي بتشكيل (Node 24.22، ٣ مرات):

~~~text الناتج
NFC 2.3 ms | NFD 7.3 ms | NFC on already-NFC 2.3 ms
NFC 2.3 ms | NFD 6.9 ms | NFC on already-NFC 2.4 ms
NFC 2.4 ms | NFD 7.2 ms | NFC on already-NFC 2.4 ms
~~~

رخيصة جدًا. و NFD أبطأ لأنه بيطوّل النص (بقى 1,140,000 خانة من 1,040,000).

---

## ١٠. الشكل الغلط

~~~text Node REPL
> "x".normalize("nfc")
Uncaught RangeError: The normalization form should be one of NFC, NFD, NFKC, NFKD.
~~~

الاسم حساس للحروف: [["NFC"]] كابيتال بس.

---

## الخلاصة

| عايز | اعمل |
|---|---|
| تقارن أو تخزّن نص من يوزر | [[normalize()]] (NFC) على الاتنين |
| تشيل التشكيل والهمزات للبحث | [[normalize("NFD").replace(/\p{M}/gu, "")]] |
| ﻻ و ＡＢＣ و ① يبقوا عاديين في البحث | [[normalize("NFKC")]] |
| ة/ه و ى/ي والتطويل والأرقام | [[replace]] بنفسك، normalize مش بيلمسهم |
| النص اللي بيتعرض | الأصل زي ما اليوزر كتبه (أو NFC بس) |`,
          lines: [
            R`«café» بحرف [[é]] واحد مركّب ([[U+00E9]])، طولها 4.`,
            R`«café» تانية: [[e]] عادية وبعدها علامة الحدّة [[U+0301]] لوحدها، طولها 5، وبتتعرض زي الأولى بالظبط.`,
            R`[[===]] بـ [[false]] والأطوال 4 و 5: نفس الشكل على الشاشة بس حروف مختلفة في الذاكرة.`,
            R`[[normalize()]] من غير باراميتر = NFC، بتركّب الحرف والعلامة، فالاتنين بقوا نفس النص و [[===]] بقت [[true]].`,
            R`«أحمد» بالألف المهموزة حرف واحد [[U+0623]]، زي ما الكيبورد العادي بيكتبها.`,
            R`«أحمد» تانية: ألف عادية وبعدها همزة فوق [[U+0654]] كعلامة. نفس الشكل، ٥ خانات بدل ٤.`,
            R`مختلفين بـ [[===]]، وبعد [[normalize("NFC")]] على التانية الهمزة اتركّبت مع الألف فبقوا زي بعض.`,
            R`NFKC بيفك الأشكال «المتوافقة»: حرف لام ألف المركّب بقى «لا» حرفين، والحروف والأرقام العريضة بقت عادية.`,
            R`NFD بيفك كل حرف لأساس وعلامات، و [[\p{M}]] بتشيل كل العلامات، فالتشكيل اتشال وفضلت «محمد».`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لكل نص من دول اكتب طوله، وبعد NFC، وبعد NFD، وبعد NFKC: [["\u00e9"]] و [["e\u0301"]] و [["\u0623"]] و [["\u0627\u0654"]] و [["\ufefb"]] (من قسم ٥ في الشرح).`, done: R`كتبت الجدول قبل التشغيل، والتشغيل طلّع [[1 1 2 1]] و [[2 1 2 1]] و [[1 1 2 1]] و [[2 1 2 1]] و [[1 1 1 2]]، وتقدر تقول ليه ﻻ هي الوحيدة اللي NFKC طوّلها.`, sol: R`~~~js forms.js
for (const s of ["\u00e9", "e\u0301", "\u0623", "\u0627\u0654", "\ufefb"]) {
  console.log(JSON.stringify(s), s.length, s.normalize("NFC").length, s.normalize("NFD").length, s.normalize("NFKC").length);
}
~~~

~~~text الناتج
"é" 1 1 2 1
"é" 2 1 2 1
"أ" 1 1 2 1
"أ" 2 1 2 1
"ﻻ" 1 1 1 2
~~~

- NFC بيوحّد الأشكال المركّبة والمفكوكة على حرف واحد (العمود التالت كله 1 ما عدا ﻻ اللي هي أصلًا حرف واحد).
- NFD بيفك أي حرف ليه علامة (2)، بس ﻻ ملهاش «علامة»، هي حرفين لازقين بشكل متوافق، فـ NFD سابها.
- NFKC بس اللي بيفك الشكل المتوافق: ﻻ بقت لام وألف (2).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك ٣ أسامي من التطبيق و ٣ من شيت Excel، نفس الناس، بس الشيت فيه «أسماء» بالهمزة المفكوكة و «محمَّد» بترتيب تشكيل مختلف: [[fromApp = ["\u0623\u0633\u0645\u0627\u0621", "\u0645\u062d\u0645\u0651\u064e\u062f", "\u0633\u0627\u0631\u0629"]]] و [[fromSheet = ["\u0627\u0654\u0633\u0645\u0627\u0621", "\u0645\u062d\u0645\u064e\u0651\u062f", "\u0633\u0627\u0631\u0629"]]]. عدّ الأسامي المختلفة قبل وبعد NFC (من قسم ٣ و ٤ و ٩ في الشرح).`, done: R`قبل الـ normalize [[Set]] فيه 5، وبعده 3، والقايمة النهائية «أسماء» و «محمَّد» و «سارة».`, sol: R`~~~js dedupe.js
const fromApp = ["\u0623\u0633\u0645\u0627\u0621", "\u0645\u062d\u0645\u0651\u064e\u062f", "\u0633\u0627\u0631\u0629"];
const fromSheet = ["\u0627\u0654\u0633\u0645\u0627\u0621", "\u0645\u062d\u0645\u064e\u0651\u062f", "\u0633\u0627\u0631\u0629"];
const all = [...fromApp, ...fromSheet];
console.log(new Set(all).size, new Set(all.map(n => n.normalize("NFC"))).size);
console.log([...new Set(all.map(n => n.normalize("NFC")))]);
~~~

~~~text الناتج
5 3
[ 'أسماء', 'محمَّد', 'سارة' ]
~~~

- «سارة» نفس الحروف في المصدرين، فاتحسبت مرة واحدة حتى من غير normalize. عشان كده 5 مش 6.
- [[map(n => n.normalize("NFC"))]] قبل الـ [[Set]]: الهمزة اتركّبت، والشدة والفتحة اترتبوا (الفتحة الأول)، فـ «أسماء» و «محمَّد» اتوحدوا.
- الأسامي مكتوبة escapes في الكود عشان تشوف الفرق: لو كتبتها بالكيبورد هتلاقي الاتنين نفس الشكل ومش هتعرف أنهي اللي مفكوك.

في الشغل الحقيقي: اعمل normalize وقت الـ import من الشيت، مش وقت المقارنة كل مرة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شاشة دخول بتدوّر على اليوزر بـ [[users.find(u => u.name === typed)]]. اليوزرة «أسماء» اتسجلت من موبايل خزّن الاسم [["\u0627\u0654\u0633\u0645\u0627\u0621"]]، ودلوقتي بتكتب اسمها من اللابتوب ([["\u0623\u0633\u0645\u0627\u0621"]]) والشاشة بتقول «مش موجود». صلّحها (من قسم ٣ في الشرح).`, done: R`القديمة بتقول «مش موجود» والجديدة «أهلًا» لنفس الكتابة، والتصليح في سطر المقارنة بس.`, sol: R`~~~js login.js
const users = [{ name: "\u0627\u0654\u0633\u0645\u0627\u0621", pass: "1234" }];
const loginBad = (n) => users.find(u => u.name === n) ? "أهلًا" : "مش موجود";
const loginOk = (n) => users.find(u => u.name.normalize() === n.normalize()) ? "أهلًا" : "مش موجود";
const typed = "\u0623\u0633\u0645\u0627\u0621";
console.log(typed, loginBad(typed), loginOk(typed));
~~~

~~~text الناتج
أسماء مش موجود أهلًا
~~~

- الاسم المطبوع «أسماء» عادي، والمقارنة القديمة فشلت عشان الخانات مختلفة.
- [[normalize()]] على الناحيتين: لازم الاتنين. لو عملته على اللي اتكتب بس، والمتخزن مفكوك، لسه مختلفين.
- التصليح الأحسن: normalize **وقت التسجيل** (النص بيتخزن NFC)، و normalize وقت الدخول. كده المقارنة في الداتابيز نفسها تبقى [[WHERE name = $__{1}]] عادي من غير ما تجيب كل اليوزرز.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** على فقرة عربي بتشكيل وهمزات مكررة لحد مليون خانة، قيس: الطول بعد NFC وبعد NFD، والوقت بتاع [[normalize("NFC")]] و [[normalize("NFD")]]، والوقت بتاع NFC على نص هو أصلًا NFC. اعمل كل قياس ٣ مرات، واكتب استنتاجك في سطرين (من قسم ٩ في الشرح).`, done: R`عندك ٣ سطور أرقام، والاستنتاج فيه إن NFD بيطوّل النص وأبطأ، وإن الـ normalize رخيص كفاية إنه يتعمل على كل input.`, sol: R`~~~js measure.js
const para = "إِنَّ الأَسْماءَ آمِنَةٌ، وَأُسْرَةُ أَحْمَدَ هُنا. ".repeat(20000);
console.log(para.length, para.normalize("NFC").length, para.normalize("NFD").length);
for (let r = 0; r < 3; r++) {
  let t = performance.now(); para.normalize("NFC"); const t1 = performance.now() - t;
  t = performance.now(); para.normalize("NFD"); const t2 = performance.now() - t;
  const n = para.normalize("NFC");
  t = performance.now(); n.normalize("NFC"); const t3 = performance.now() - t;
  console.log("NFC", t1.toFixed(1), "ms | NFD", t2.toFixed(1), "ms | NFC on already-NFC", t3.toFixed(1), "ms");
}
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
1040000 1040000 1140000
NFC 2.3 ms | NFD 7.3 ms | NFC on already-NFC 2.3 ms
NFC 2.3 ms | NFD 6.9 ms | NFC on already-NFC 2.4 ms
NFC 2.4 ms | NFD 7.2 ms | NFC on already-NFC 2.4 ms
~~~

**الاستنتاج:** NFC مغيّرش الطول (الفقرة مكتوبة من الكيبورد فهي أصلًا مركّبة)، و NFD زوّده ١٠٠ ألف خانة (كل همزة اتفكت)، وأبطأ ٣ مرات تقريبًا. ومليون خانة في ٢ ms معناه إن normalize على كل اسم أو بحث مش هيبان في أي قياس.

- [[performance.now()]] بيرجّع وقت بكسور الملي ثانية، والفرق بين قبل وبعد هو مدة السطر.
- القياس ٣ مرات لأن أول مرة ممكن تبقى أبطأ (الكود بيتجهز). لو رقم واحد شاذ، متبنيش عليه.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عايز يعمل [[normalize("NFKC")]] على كل النصوص قبل ما تتحفظ «عشان يبقى كله نضيف». اشرحله في ٣ سطور ليه لأ، بأمثلة اتجرّبت (من قسم ٦ في الشرح).`, done: R`الشرح فيه مثالين على الأقل المعنى اتغيّر فيهم (x² و H₂O أو ① أو ﬁ)، وإن NFKC مكانه مفتاح البحث، و NFC هو اللي للتخزين.`, sol: R`**الشرح النموذجي:**
1. NFKC بيبدّل الأشكال «المتوافقة» بالعادية، وده بيغيّر المعنى: [[x²]] بقت [[x2]] و [[H₂O]] بقت [[H2O]] و [[①]] بقت [[1]]. وصفة كيميا أو معادلة أو ترقيم اتخزنوا كده هيتعرضوا غلط، والأصل ضاع.
2. اللي عايزه للتخزين هو NFC: بيوحّد الأشكال المتكافئة (أ مركّبة ومفكوكة، وترتيب التشكيل) **من غير** ما يغيّر أي معنى.
3. NFKC مكانه مفتاح البحث (عمود جنب الأصل، أو وقت المقارنة)، عشان اللي يكتب «لا» يلاقي «ﻻ» واللي يكتب ABC يلاقي ＡＢＣ.

~~~js nfkc.js
for (const s of ["x²", "H₂O", "ﬁle", "①", "٣", "ﻻ", "ＡＢＣ", "\ufdf2"]) console.log(s, "->", s.normalize("NFKC"));
~~~

~~~text الناتج
x² -> x2
H₂O -> H2O
ﬁle -> file
① -> 1
٣ -> ٣
ﻻ -> لا
ＡＢＣ -> ABC
ﷲ -> الله
~~~` }
          ],
          flag: "script",
          ref: [
            { t: "MDN: String.prototype.normalize()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize" },
            { t: "ECMAScript: String.prototype.normalize", url: "https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.normalize" },
            { t: "Unicode: UAX #15 Normalization Forms", url: "https://unicode.org/reports/tr15/" },
          ],
          pre: ["js/string و UTF-16: length و codePointAt", { to: "js/regex: classes و quantifiers", why: R`[[\p{M}]] و flag [[u]] بيتشرحوا هناك، وفي درس «regex والعربي» في الوحدة دي` }],
          deep: {
            why: R`أي مقارنة نصوص من يوزرز (دخول، بحث، منع تكرار، مفاتيح [[Map]]) بتفشل في صمت لو نفس الكلمة جات بشكلين. وده بيحصل في العربي بالذات: الهمزة والتشكيل وترتيبه بيختلفوا حسب الكيبورد والموبايل ومصدر النسخ. [[normalize]] سطر واحد بيقفل الباب ده.`,
            how: R`Unicode بيدّي بعض الحروف شكلين: حرف مركّب جاهز، أو أساس + علامات (combining marks). وكل علامة ليها رقم ترتيب (combining class). [[NFD]] بيفك كل حرف مركّب ويرتّب العلامات بالرقم، و [[NFC]] بيعمل NFD وبعدين يركّب أي أساس + علامة ليهم حرف جاهز. والـ K بتزوّد خطوة: الحروف «المتوافقة» (ligatures وأشكال عريضة وأرقام فوق السطر وأشكال العرض العربي) بتتبدّل بأصلها. والجداول دي من ICU جوه المحرك، فممكن تختلف شوية بين نسخ قديمة جدًا.`,
            when: R`NFC على أي نص قبل ما يتحفظ أو يتقارن (أسامي، عناوين، كلمات بحث، أسماء ملفات). NFD + شيل [[\p{M}]] لمفتاح بحث من غير تشكيل. NFKC لمفتاح بحث يتجاهل الأشكال المتوافقة. والنص اللي بيتعرض يفضل زي ما اليوزر كتبه.`,
            mistakes: R`تقارن بـ [[===]] من غير normalize. أو تعمله على ناحية واحدة بس. أو تحفظ بـ NFKC فـ x² تبقى x2. أو تفتكر إن normalize بيوحّد ة/ه و ى/ي والتطويل والأرقام: لأ. أو تشيل [[\p{M}]] من غير NFD الأول، فالهمزة اللي في «أ» المركّبة مبتتشالش. أو تكتب [["nfc"]] صغيرة فترمي [[RangeError]].`
          }
        },
        {
          cmd: "Intl.Segmenter",
          title: "تعد وتقص الحروف اللي العين شايفاها، وتقسم الكلام لكلمات وجمل حتى في العربي",
          desc: R`[[Intl.Segmenter]] بيقسم النص زي ما البني آدم بيقراه. الحرف «مَّ» (ميم وفتحة وشدة) والإيموجي 👍🏽 (إيد ولون) والعلم 🇪🇬 كل واحد **حرف ظاهر واحد** (اسمه grapheme cluster)، مع إن [[length]] و [[[...s]]] بيعدّوهم أكتر.
• [[new Intl.Segmenter("ar", { granularity: "grapheme" })]]: تعمله مرة واحدة. و granularity ممكن [["grapheme"]] (حروف ظاهرة، الافتراضي) أو [["word"]] (كلمات) أو [["sentence"]] (جمل).
• [[segmenter.segment(text)]] بترجّع object اسمه Segments: تلف عليه بـ [[for...of]] أو [[[...]]]، وكل قطعة [[{ segment, index, input }]] (ومع word فيه [[isWordLike]]).
• [[segments.containing(i)]] بترجّع القطعة اللي فيها الخانة [[i]].
• [[resolvedOptions()]] بيقولك اللغة والـ granularity اللي اتستخدموا فعلًا، و [[Intl.Segmenter.supportedLocalesOf()]] بيقولك أنهي لغات مدعومة.`,
          example: R`const g = new Intl.Segmenter("ar", { granularity: "grapheme" });
const text = "مُحَمَّد 👍🏽";
console.log(text.length, [...text].length, [...g.segment(text)].length);
const w = new Intl.Segmenter("ar", { granularity: "word" });
const words = [...w.segment("أهلًا يا سارة، الطلب وصل!")].filter(s => s.isWordLike);
console.log(words.map(s => s.segment));
console.log(g.segment(text).containing(3));
console.log(g.resolvedOptions());
console.log(Intl.Segmenter.supportedLocalesOf(["ar-EG", "zz"]));`,
          try: R`اعمل [[const g = new Intl.Segmenter("ar")]] واطبع لكل نص من دول التلات أرقام ([[length]] و [[[...s].length]] و [[[...g.segment(s)].length]]): [["سارة"]] و [["أهلًا"]] و [["🇪🇬"]] و [["👍🏽"]] و [["e\u0301"]] و [["لا"]]. وبعدين اعمل segmenter بـ [["word"]] وقسّم [["والتوصيل كان سريع"]] واطبع الكلمات.`,
          sol: R`الأرقام: «سارة» [[4 4 4]]، و «أهلًا» [[5 5 4]] (التنوين مع اللام)، والعلم [[4 2 1]]، والإيد [[4 2 1]]، و é المفكوكة [[2 2 1]]، و «لا» [[2 2 2]] (لام وألف حرفين ظاهرين حتى لو الخط بيلزقهم). والكلمات: [[[ 'والتوصيل', 'كان', 'سريع' ]]]: «و» العطف فضلت لازقة في الكلمة، الـ Segmenter مبيفصلهاش.`,
          teach: R`## الفكرة

في الدرسين اللي فاتوا: [[length]] بيعد خانات، و [[[...s]]] بيعد code points. والاتنين مش اللي اليوزر شايفه. الحرف الظاهر (Unicode بيسميه **grapheme cluster**) ممكن يبقى حرف + تشكيل، أو إيموجي + لون بشرة، أو حرفين علم، أو عيلة من ٣ إيموجي بينهم حروف مخفية. [[Intl.Segmenter]] بيعرف القواعد دي من Unicode (UAX #29) ومن قواميس لكل لغة، وبيقسم النص لحروف ظاهرة أو كلمات أو جمل. كله اتشغّل بـ Node 24.22 (ICU 78.3)، واتجرّب الأساسي في Chrome 157 وطلع نفس الناتج.

---

## ١. [[new Intl.Segmenter(locale, options)]]

~~~js seg.js
const g = new Intl.Segmenter("ar", { granularity: "grapheme" });
const text = "مُحَمَّد 👍🏽";
console.log(text.length, [...text].length, [...g.segment(text)].length);
~~~

~~~text الناتج
13 11 6
~~~

- [[Intl]] هو الـ namespace بتاع كل حاجة ليها علاقة باللغات (زي [[Intl.DateTimeFormat]] في درس «UTC و Intl.DateTimeFormat»).
- [["ar"]]: اللغة (locale). للحروف الظاهرة القواعد واحدة تقريبًا في كل اللغات، بس للكلمات اللغة بتفرق (القسم ٥).
- [[{ granularity: "grapheme" }]]: «قسّم لحروف ظاهرة». وده الافتراضي لو مكتبتهوش.
- لازم [[new]]: [[Intl.Segmenter("ar")]] من غيرها بيرمي [[TypeError: Constructor Intl.Segmenter requires 'new']].

والتلات أرقام لنفس النص: ١٣ خانة، و ١١ code point (٨ للاسم بتشكيله + مسافة + إيد + لون)، و **٦ حروف ظاهرة**: م و ح و م و د والمسافة والإيد. ده الرقم اللي اليوزر بيعدّه.

---

## ٢. Intl.Segmenter.prototype.segment(): بترجّع Segments

[[g.segment(text)]] مبترجّعش array. بترجّع object اسمه **Segments** مربوط بالنص، وبيحسب القطع لما تطلبها:

~~~text الناتج: segs = g.segment("أهلًا 👋")
typeof segs                   object
segs.length                   undefined
typeof segs[Symbol.iterator]  function
typeof segs.containing        function
~~~

يعني مفيش [[length]] ولا [[map]] عليه مباشرة. عندك حاجتين بس: تلف عليه، أو تسأله بـ [[containing]].

---

## ٣. Segments [Symbol.iterator]: كل قطعة object

~~~text الناتج
[...segs].map(x => x.segment)    [ 'أ', 'ه', 'لً', 'ا', ' ', '👋' ]
segs[Symbol.iterator]().next()   { value: { segment: 'أ', index: 0, input: 'أهلًا 👋' }, done: false }
~~~

الـ [[[Symbol.iterator]]] بتاعه بيخلي [[for...of]] و [[[...segs]]] و [[Array.from(segs)]] يشتغلوا (نفس فكرة الـ iterator بتاع النص في درس «string و UTF-16»). بس كل قطعة **object** مش نص:

| الخانة | معناها |
|---|---|
| [[segment]] | النص بتاع القطعة نفسها: «لً» (لام + تنوين) قطعة واحدة |
| [[index]] | مكان أول خانة فيها في النص الأصلي، بالـ code units (عشان تستخدمه مع [[slice]]) |
| [[input]] | النص كله، نفس المرجع في كل قطعة |
| [[isWordLike]] | مع [["word"]] بس: [[true]] لو كلمة أو رقم، و [[false]] لو مسافة أو علامة |

عشان كده العدّ بيبقى [[[...g.segment(s)].length]]، والنصوص [[[...g.segment(s)].map(x => x.segment)]].

---

## ٤. Segments.containing(index): القطعة اللي فيها خانة معيّنة

~~~js seg.js
console.log(g.segment(text).containing(3));
~~~

~~~text الناتج
{ segment: 'حَ', index: 2, input: 'مُحَمَّد 👍🏽' }
~~~

الخانة 3 هي الفتحة اللي على الحاء، فرجّع القطعة كلها «حَ» اللي بتبدأ عند 2. وعلى [["أهلًا 👋"]]: [[containing(6)]] و [[containing(7)]] الاتنين بيرجّعوا 👋 عند 6 (الـ 7 هي النص التاني من الإيموجي)، و [[containing(99)]] و [[containing(-1)]] بيرجّعوا [[undefined]].

ده مفيد لما عندك **مكان** من حاجة تانية: مكان الكيرسر في [[<textarea>]] ([[selectionStart]] بالخانات)، أو [[index]] من [[indexOf]] أو regex، وعايز الكلمة أو الحرف الظاهر اللي هو فيه من غير ما تكسره (التمرين الرابع).

---

## ٥. granularity: "word" و isWordLike

~~~js words.js
const w = new Intl.Segmenter("ar", { granularity: "word" });
const text = "أهلًا يا سارة، الطلب رقم 25 وصل!";
for (const s of w.segment(text)) console.log(s.index, JSON.stringify(s.segment), s.isWordLike);
~~~

~~~text الناتج
0 "أهلًا" true
5 " " false
6 "يا" true
8 " " false
9 "سارة" true
13 "،" false
14 " " false
15 "الطلب" true
20 " " false
21 "رقم" true
24 " " false
25 "25" true
27 " " false
28 "وصل" true
31 "!" false
~~~

- كل حاجة قطعة: الكلمات والمسافات والعلامات. والقطع ورا بعض بتغطي النص كله.
- [[isWordLike]] بيفرّق: كلمة أو رقم ([[true]])، ومسافة أو «،» أو «!» ([[false]]). فـ [[filter(s => s.isWordLike)]] بيدّيك الكلمات بس.
- قارن بـ [[text.split(" ")]]: بيطلّع [['سارة،']] و [['وصل!']] بالعلامات لازقة.

**حدود مع العربي (اتجرّبت):** «و» العطف و «ال» و «بـ» مبيتفصلوش: «والتوصيل» كلمة واحدة، و «الأكل» مش «أكل». يعني عدّ الكلمات صح، بس لو عايز «جذر» الكلمة محتاج أداة تانية (stemmer). أما اللغات اللي مفيهاش مسافات أصلًا فهنا الـ Segmenter بيبان: [["東京に行きます"]] بالياباني اتقسمت [[[ '東京', 'に', '行き', 'ます' ]]] بقاموس جوه ICU.

---

## ٦. granularity: "sentence"

~~~text الناتج: [...new Intl.Segmenter("ar", { granularity: "sentence" }).segment(s)].map(x => x.segment)
[ 'الطلب وصل. ', 'شكرًا ليك! ', 'هتقيّم الخدمة؟ ', 'أكيد.' ]
[ 'السعر 12.5 جنيه. ', 'تمام؟' ]
~~~

بيعرف علامة الاستفهام العربي «؟»، والمسافة بعد الجملة بتفضل معاها. والسطر التاني: النقطة في [[12.5]] مقسمتش الجملة، وده اللي [[split(".")]] كان هيغلط فيه.

---

## ٧. Intl.Segmenter.prototype.resolvedOptions()

~~~js seg.js
console.log(g.resolvedOptions());
~~~

~~~text الناتج
{ locale: 'ar', granularity: 'grapheme' }
~~~

بيرجّع اللي **اتستخدم فعلًا** بعد ما المحرك اختار:

| الإنشاء | [[resolvedOptions()]] | ليه |
|---|---|---|
| [[new Intl.Segmenter("ar")]] | [[{ locale: 'ar', granularity: 'grapheme' }]] | الـ granularity الافتراضي grapheme |
| [[new Intl.Segmenter("ar-EG", { granularity: "word" })]] | [[{ locale: 'ar-EG', granularity: 'word' }]] | ar-EG مدعومة زي ما هي |
| [[new Intl.Segmenter("ar-u-nu-arab")]] | [[{ locale: 'ar', ... }]] | الجزء [[-u-nu-arab]] (نظام الأرقام) ملوش معنى للتقسيم فاتشال |
| [[new Intl.Segmenter()]] | [[{ locale: 'en-US', ... }]] على جهازي | من غير لغة بياخد لغة النظام، فالناتج بيختلف من جهاز لجهاز |

آخر صف هو السبب إنك تكتب اللغة دايمًا: نفس الكود ممكن يقسم كلمات مختلفة على سيرفر لغته غير جهازك.

---

## ٨. [[Intl.Segmenter.supportedLocalesOf()]]

~~~js seg.js
console.log(Intl.Segmenter.supportedLocalesOf(["ar-EG", "zz"]));
~~~

~~~text الناتج
[ 'ar-EG' ]
~~~

static method (على [[Intl.Segmenter]] نفسه): بتاخد لستة لغات وترجّع المدعوم منهم بس، بنفس الترتيب. [["zz"]] مش لغة فاتشالت. و [[["ar-EG", "ar-SA", "tlh", "en-GB"]]] رجّعت [[[ 'ar-EG', 'ar-SA', 'en-GB' ]]] ([[tlh]] لغة خيالية). مفيدة لما اللغة جاية من يوزر وعايز تختار fallback. والتاج الغلط في الكتابة نفسها بيرمي:

~~~text الناتج
Intl.Segmenter.supportedLocalesOf(["ar_EG"])
RangeError: Incorrect locale information provided
~~~

الشرطة التحتانية [[_]] مش مسموحة في أسماء اللغات (BCP 47)، الصح [["ar-EG"]].

---

## ٩. الأخطاء

| الكود | الخطأ |
|---|---|
| [[Intl.Segmenter("ar")]] | [[TypeError: Constructor Intl.Segmenter requires 'new']] (كل constructors الـ Intl الجديدة لازم [[new]]) |
| [[new Intl.Segmenter("ar", { granularity: "letter" })]] | [[RangeError: Value letter out of range for Intl.Segmenter options property granularity]] (المسموح grapheme و word و sentence بس) |
| [[new Intl.Segmenter("ar_EG")]] | [[RangeError: Incorrect locale information provided]] (اسم اللغة بشرطة [[-]] مش [[_]]) |

---

## ١٠. الأداء: اعمله مرة واحدة

على ٢٠ ألف رسالة قصيرة (Node 24.22):

~~~text الناتج
new each time 310 ms | one segmenter 131 ms | spread 6 ms
new each time 299 ms | one segmenter 126 ms | spread 8 ms
new each time 301 ms | one segmenter 139 ms | spread 8 ms
~~~

- عمل [[new Intl.Segmenter]] جوه الـ loop أبطأ مرتين ونص: الإنشاء بيحمّل قواعد اللغة.
- الـ Segmenter نفسه أبطأ من [[[...s]]] بحوالي ٢٠ مرة، لأنه بيطبّق قواعد Unicode كلها. فاستخدمه للحاجات اللي اليوزر بيشوفها (عداد، قص، تحديد)، مش لكل عملية على النص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| عدد الحروف اللي اليوزر شايفها | [[[...g.segment(s)].length]] |
| تقص من غير ما تكسر حرف | [[[...g.segment(s)].slice(0, n).map(x => x.segment).join("")]] |
| الكلمات بس | [[[...w.segment(s)].filter(x => x.isWordLike)]] |
| الكلمة اللي فيها الكيرسر | [[w.segment(s).containing(i)]] |
| الجمل | granularity [["sentence"]] |
| اللغة اللي اتستخدمت | [[resolvedOptions().locale]] |
| أنهي لغات مدعومة | [[Intl.Segmenter.supportedLocalesOf([...])]] |`,
          lines: [
            R`segmenter للحروف الظاهرة بالعربي. بيتعمل مرة واحدة ويتستخدم على أي عدد نصوص.`,
            R`اسم بتشكيل كامل وإيموجي بلون بشرة: كل حتة فيهم أكتر من خانة لحرف ظاهر واحد.`,
            R`تلات عدّات لنفس النص: 13 خانة، و 11 code point، و 6 حروف ظاهرة. التالت هو اللي اليوزر بيعدّه.`,
            R`segmenter تاني بـ granularity [["word"]] عشان يقسم كلمات بقواعد اللغة.`,
            R`[[filter(s => s.isWordLike)]] بيشيل المسافات والفاصلة وعلامة التعجب ويسيب الكلمات بس.`,
            R`[[map(s => s.segment)]] بياخد النص من كل قطعة، فبيطبع الخمس كلمات من غير ما «سارة،» تفضل لازقة في الفاصلة.`,
            R`[[containing(3)]] بيرجّع القطعة اللي فيها الخانة 3، يعني «حَ» كاملة اللي بتبدأ عند 2، مش الفتحة لوحدها.`,
            R`[[resolvedOptions()]] بيقول اللغة والـ granularity اللي اتستخدموا فعلًا: [['ar']] و [['grapheme']].`,
            R`[[supportedLocalesOf]] بترجّع اللغات المدعومة بس من اللستة: [["ar-EG"]] اتقبلت و [["zz"]] اتشالت.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لكل نص اكتب الـ ٣ أرقام ([[length]] و code points و graphemes): [["سارة"]] و [["أهلًا"]] و [["🇪🇬"]] و [["👍🏽"]] و [["e\u0301"]] و [["لا"]] (من قسم ١ في الشرح).`, done: R`كتبت [[4 4 4]] و [[5 5 4]] و [[4 2 1]] و [[4 2 1]] و [[2 2 1]] و [[2 2 2]] قبل التشغيل، وعرفت ليه «لا» اتنين.`, sol: R`~~~js counts.js
const g = new Intl.Segmenter("ar", { granularity: "grapheme" });
for (const s of ["سارة", "أهلًا", "🇪🇬", "👍🏽", "e\u0301", "لا"]) console.log(JSON.stringify(s), s.length, [...s].length, [...g.segment(s)].length);
~~~

~~~text الناتج
"سارة" 4 4 4
"أهلًا" 5 5 4
"🇪🇬" 4 2 1
"👍🏽" 4 2 1
"é" 2 2 1
"لا" 2 2 2
~~~

- «أهلًا»: التنوين علامة، فاتجمع مع اللام في حرف ظاهر واحد: ٥ code points و ٤ graphemes.
- العلم والإيد: كل واحد code pointين وحرف ظاهر واحد.
- «لا»: اللام والألف حرفين مستقلين. الخط بيرسمهم لازقين (ligature)، بس ده رسم مش Unicode، فـ ٢. (أما «ﻻ» المركّبة [[U+FEFB]] حرف واحد، بس دي بتيجي من مصادر قديمة، درس «normalize و التشكيل».)` },
            { lvl: 'تطبيق', t: R`**ابني:** [[truncate(str, max)]] بترجّع النص لو حروفه الظاهرة [[max]] أو أقل، وإلا أول [[max - 1]] حرف ظاهر وبعدهم [[…]]. جرّبها على [["مُحَمَّد بيسلّم 👋🏽"]] بـ 9، و [["قصير"]] بـ 9، و [["🇪🇬🇪🇬🇪🇬"]] بـ 2 (من قسم ٣ في الشرح).`, done: R`النتايج [["مُحَمَّد بيس…"]] و [["قصير"]] و [["🇪🇬…"]]، والناتج عمره ما بيعدّي [[max]] حرف ظاهر، والتشكيل والأعلام مبيتكسروش.`, sol: R`~~~js truncate.js
const g = new Intl.Segmenter("ar", { granularity: "grapheme" });
function truncate(str, max) {
  const parts = [...g.segment(str)];
  if (parts.length <= max) return str;
  return parts.slice(0, max - 1).map(p => p.segment).join("") + "…";
}
console.log(truncate("مُحَمَّد بيسلّم 👋🏽", 9));
console.log(truncate("قصير", 9));
console.log(truncate("🇪🇬🇪🇬🇪🇬", 2));
~~~

~~~text الناتج
مُحَمَّد بيس…
قصير
🇪🇬…
~~~

- [[parts]] array من القطع (objects)، و [[slice(0, max - 1)]] بتاخد أول [[max - 1]] حرف ظاهر عشان [[…]] تاخد الخانة الأخيرة.
- [[map(p => p.segment).join("")]] بيرجّع النصوص ويلزقها.
- لو كنت قصيت بـ [[str.slice(0, 8)]] كان «مُحَمَّد» نفسها (٨ خانات) هتاخد الحد كله، والعلم كان هيتقسم نصين يبان كحرفين E و G.
- النسخة دي بتقص في نص الكلمة («بيس…»). لو عايز تقف عند آخر كلمة كاملة، ده مشروع «معاينة الرسالة في الإشعار».` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ريفيو عميل: [["الأكل حلو والتوصيل سريع. الأكل سخن، والتوصيل كان سريع جدًا! هطلب تاني الأكل ده."]]. طلّع أكتر ٣ كلمات اتكررت وعددهم بالـ Segmenter (من قسم ٥ في الشرح).`, done: R`النتيجة [[[ [ 'الأكل', 3 ], [ 'والتوصيل', 2 ], [ 'سريع', 2 ] ]]]، ومفيش فاصلة ولا نقطة لازقة في أي كلمة، وتقدر تقول ليه «التوصيل» ظهرت بالـ «و».`, sol: R`~~~js review.js
const w = new Intl.Segmenter("ar", { granularity: "word" });
const review = "الأكل حلو والتوصيل سريع. الأكل سخن، والتوصيل كان سريع جدًا! هطلب تاني الأكل ده.";
const freq = new Map();
for (const s of w.segment(review)) {
  if (!s.isWordLike) continue;
  freq.set(s.segment, (freq.get(s.segment) || 0) + 1);
}
console.log([...freq].sort((a, b) => b[1] - a[1]).slice(0, 3));
~~~

~~~text الناتج
[ [ 'الأكل', 3 ], [ 'والتوصيل', 2 ], [ 'سريع', 2 ] ]
~~~

- [[Map]] عدّاد: لو الكلمة موجودة زوّد واحد، وإلا ابدأ من صفر (درس «Map و Set»).
- [[isWordLike]] شال «.» و «،» و «!» والمسافات، فـ «سريع.» اتعدت «سريع» مع التانية.
- [[[...freq]]] بيحوّل الـ Map لـ array من [[[key, value]]]، و [[sort]] تنازلي بالعدد، و [[slice(0, 3)]] أول ٣.
- «والتوصيل» بالـ «و»: الـ Segmenter مبيفصلش أدوات العطف، فلو في ريفيو تالت مكتوب «التوصيل» من غير «و» هتتعد كلمة تانية. لو ده مهم، شيل «و» من أول الكلمة بقاعدة بتاعتك (وخد بالك من «وصل» و «ورد» اللي «و» فيهم من الكلمة).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[wordAt(str, index)]] بترجّع الكلمة اللي فيها الخانة [[index]] (زي مكان الكيرسر في [[<textarea>]])، أو [[null]] لو الخانة على مسافة أو علامة أو برّه النص. جرّبها على [["اطلب 3 قهوة، ورقم الطلب 45"]] بالأماكن 1 و 7 و 4 و 11 و 100 و 24 (من قسم ٤ في الشرح).`, done: R`النتايج [["اطلب"]] و [["قهوة"]] و [[null]] و [[null]] و [[null]] و [["45"]]، ومفيش loop في الدالة.`, sol: R`~~~js word-at.js
const w = new Intl.Segmenter("ar", { granularity: "word" });
function wordAt(str, index) {
  const s = w.segment(str).containing(index);
  return s && s.isWordLike ? s.segment : null;
}
const msg = "اطلب 3 قهوة، ورقم الطلب 45";
console.log(wordAt(msg, 1), wordAt(msg, 7), wordAt(msg, 4), wordAt(msg, 11), wordAt(msg, 100), wordAt(msg, 24));
~~~

~~~text الناتج
اطلب قهوة null null null 45
~~~

- [[containing(index)]] بترجّع القطعة كلها حتى لو الـ index في نصها: 7 جوه «قهوة» اللي بتبدأ عند 7، و 1 جوه «اطلب».
- 4 مسافة، و 11 فاصلة: قطعة بس [[isWordLike]] بـ [[false]]، فـ [[null]].
- 100 برّه النص: [[containing]] بترجّع [[undefined]]، و [[s &&]] بيحمي من [[undefined.isWordLike]].
- في صفحة: [[wordAt(textarea.value, textarea.selectionStart)]] بيدّيك الكلمة اللي اليوزر واقف عليها (لـ autocomplete أو قاموس).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** عدّ الحروف الظاهرة في ٢٠ ألف رسالة ([["رسالة رقم " + i + " 👍🏽"]]) بـ ٣ طرق: [[new Intl.Segmenter]] جديد لكل رسالة، و segmenter واحد برّه الـ loop، و [[[...m].length]]. قيس كل طريقة ٣ مرات واكتب الاستنتاج (من قسم ١٠ في الشرح).`, done: R`عندك ٣ سطور أرقام، والعددين الأولين متساويين و [[spread]] مختلف (أكبر بـ 20000)، وعرفت ليه الفرق في العدد وليه الفرق في الوقت.`, sol: R`~~~js seg-bench.js
const msgs = Array.from({ length: 20000 }, (_, i) => "رسالة رقم " + i + " 👍🏽");
for (let r = 0; r < 3; r++) {
  let t = performance.now();
  let total1 = 0;
  for (const m of msgs) total1 += [...new Intl.Segmenter("ar", { granularity: "grapheme" }).segment(m)].length;
  const t1 = performance.now() - t;
  t = performance.now();
  const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });
  let total2 = 0;
  for (const m of msgs) total2 += [...seg.segment(m)].length;
  const t2 = performance.now() - t;
  t = performance.now();
  let total3 = 0;
  for (const m of msgs) total3 += [...m].length;
  const t3 = performance.now() - t;
  console.log(total1, total2, total3, "new each time", t1.toFixed(0), "ms | one segmenter", t2.toFixed(0), "ms | spread", t3.toFixed(0), "ms");
}
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
328890 328890 348890 new each time 310 ms | one segmenter 131 ms | spread 6 ms
328890 328890 348890 new each time 299 ms | one segmenter 126 ms | spread 8 ms
328890 328890 348890 new each time 301 ms | one segmenter 139 ms | spread 8 ms
~~~

**الاستنتاج:**
- العدد: الطريقتين بالـ Segmenter متساويين، و [[spread]] أكبر بـ 20000 بالظبط: كل رسالة فيها 👍🏽 اللي هي code pointين وحرف ظاهر واحد.
- الوقت: segmenter واحد أسرع من الجديد كل مرة بأكتر من مرتين، لأن الإنشاء بيجهز قواعد اللغة. و [[spread]] أسرع بكتير بس **غلط** للي اليوزر شايفه.
- القرار: segmenter واحد في أول الملف (زي مشاريع الوحدة كلها)، ومتستخدموش غير لما الرقم اللي اليوزر شايفه هو المطلوب.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من غير ما تقرا القسم ٧ و ٨، جاوب من صفحات MDN بتاعة [[resolvedOptions]] و [[supportedLocalesOf]]: (١) [[new Intl.Segmenter("ar-u-nu-arab").resolvedOptions().locale]] هيرجّع إيه وليه؟ (٢) [[supportedLocalesOf]] بترجّع إيه لو لغة مش مدعومة؟ وبعدين اتأكد بالتشغيل.`, done: R`كتبت الإجابتين قبل التشغيل، والتشغيل طلّع [['ar']] للأولى (والسبب: الـ Segmenter ملوش unicode extension keys)، ولستة من غير اللغات المش مدعومة للتانية.`, sol: R`**الإجابة النموذجية:**
1. [[locale]] في [[resolvedOptions]] هي اللغة اللي اتستخدمت فعلًا. الجزء [[-u-nu-arab]] اسمه unicode extension، و [[nu]] = numbering system. صفحة MDN للـ Segmenter مبتذكرش أي extension keys بيدعمها، فبيتشال، والناتج [['ar']].
2. [[supportedLocalesOf]] بترجّع array فيها اللغات المدعومة **بس**، بنفس ترتيبك. اللغة المش مدعومة بتتشال من غير error. أما التاج المكتوب غلط ([["ar_EG"]]) بيرمي [[RangeError]].

~~~js options.js
console.log(new Intl.Segmenter("ar-u-nu-arab").resolvedOptions());
console.log(new Intl.Segmenter("ar-EG", { granularity: "word" }).resolvedOptions());
console.log(Intl.Segmenter.supportedLocalesOf(["ar-EG", "ar-SA", "tlh", "en-GB"]));
console.log(Intl.Segmenter.supportedLocalesOf("ar-EG", { localeMatcher: "lookup" }));
~~~

~~~text الناتج
{ locale: 'ar', granularity: 'grapheme' }
{ locale: 'ar-EG', granularity: 'word' }
[ 'ar-EG', 'ar-SA', 'en-GB' ]
[ 'ar-EG' ]
~~~

والسطر الأخير: [[supportedLocalesOf]] بتقبل نص واحد مش array كمان، وخيار [[localeMatcher]] ([["lookup"]] أو [["best fit"]] الافتراضي) بيحدد طريقة المطابقة.` }
          ],
          flag: "script",
          ref: [
            { t: "MDN: Intl.Segmenter", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter" },
            { t: "MDN: Intl.Segmenter.prototype.segment()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment" },
            { t: "MDN: Segments", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment/Segments" },
            { t: "MDN: Segments.prototype.containing()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment/Segments/containing" },
            { t: "MDN: Segments.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment/Segments/Symbol.iterator" },
            { t: "MDN: Intl.Segmenter.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/resolvedOptions" },
            { t: "MDN: Intl.Segmenter.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/supportedLocalesOf" },
            { t: "Unicode: UAX #29 Text Segmentation", url: "https://unicode.org/reports/tr29/" },
          ],
          pre: ["js/string و UTF-16: length و codePointAt", { to: "js/Map و Set", why: R`التمرين التالت بيعد الكلمات في [[Map]]` }],
          deep: {
            why: R`أي حاجة اليوزر بيشوفها وبيعدها محتاجة الـ graphemes: عدّاد حروف البوست، والحد الأقصى في فورم، وقص المعاينة، وقلب النص، والكيرسر. و [[length]] و [[[...s]]] بيغلطوا في العربي بتشكيل وفي الإيموجي والأعلام. وتقسيم الكلمات بـ [[split(" ")]] بيسيب العلامات لازقة وبيفشل في اللغات اللي مفيهاش مسافات.`,
            how: R`الـ Segmenter بيطبّق قواعد Unicode UAX #29: «علامة combining تلزق في اللي قبلها»، و «ZWJ بين إيموجيين يلزقهم»، و «حرفين Regional Indicator = علم»... ولتقسيم الكلمات والجمل في بعض اللغات (الياباني والصيني والتايلاندي) بيستخدم قواميس من ICU جوه المحرك. و [[segment()]] بترجّع Segments «كسول»: مبيحسبش القطع كلها مقدمًا، بيحسبها وانت بتلف، و [[containing]] بيحسب حوالين الـ index بس. والـ index دايمًا بالـ code units عشان يشتغل مع [[slice]].`,
            when: R`grapheme: أي عدّ أو قص أو قلب اليوزر هيشوف نتيجته. word: عدّ كلمات، أو تحديد كلمة عند الكيرسر، أو بحث بالكلمة، أو أي لغة من غير مسافات. sentence: تقسيم مقال لجمل (ملخص، أو قراءة صوتية). ولأي عملية داخلية (مكان، مفتاح، تخزين) [[length]] و [[slice]] كفاية وأسرع.`,
            mistakes: R`تعمل [[new Intl.Segmenter]] جوه loop. أو تنسى [[new]]. أو تعامل الـ Segments كـ array ([[segs.length]] بـ [[undefined]]). أو تستخدم [[segment]] كأنه نص وهو object ([[x.segment]]). أو تسيب اللغة فاضية فتختلف النتيجة من جهاز لجهاز. أو تفتكر إن word segmentation بيفصل «و» و «ال» في العربي. أو تكتب [["ar_EG"]] بشرطة تحتانية.`
          }
        },
        {
          cmd: "string: indexOf و substring و concat",
          title: "تلاقي مكان كلمة في نص (أول مرة وآخر مرة وكل المرات)، وتقص بـ substring ولا slice، وتلزق بـ concat ولا +",
          desc: R`[[indexOf(x)]] بيرجّع مكان أول [[x]] في النص (رقم الخانة) أو [[-1]] لو مش موجود، و [[lastIndexOf(x)]] آخر مكان. والاتنين بياخدوا مكان يبدأوا منه، فتقدر تلاقي كل المرات بـ loop.
• لو عايز «موجود ولا لأ» بس: [[includes]] و [[startsWith]] و [[endsWith]] (وكلهم بياخدوا مكان كمان).
• القص: [[slice(a, b)]] و [[substring(a, b)]] الاتنين من [[a]] لحد قبل [[b]]، والفرق في السالب والمقلوب: [[slice]] بيعدّ السالب من الآخر، و [[substring]] بيخليه صفر وبيبدّل الطرفين لو مقلوبين.
• اللزق: [[a.concat(b, c)]] زي [[a + b + c]] بالظبط، و [[+]] أو template literal أوضح.
والأماكن كلها بالخانات (UTF-16)، زي [[length]].`,
          example: R`const file = "uploads/2026/menu.final.pdf";
console.log(file.indexOf("/"), file.lastIndexOf("/"), file.indexOf("x"));
const name = file.substring(file.lastIndexOf("/") + 1);
const ext = file.slice(file.lastIndexOf(".") + 1);
console.log(name, ext);
console.log(file.startsWith("uploads/"), file.endsWith(".pdf"), file.includes("2026"));
console.log("abcdef".substring(4, 1), "abcdef".slice(4, 1), "abcdef".slice(-3));
console.log("رقم ".concat(7, " من ", 10), "a" + 1 + 2, 1 + 2 + "a");`,
          try: R`خد [[const url = "https://shop.example.test/products/42?ref=home#reviews";]] وطلّع منه بـ [[indexOf]] و [[lastIndexOf]] و [[slice]] بس (من غير [[split]] ولا [[URL]]): الدومين، ورقم المنتج، وقيمة [[ref]]، والجزء بعد [[#]]. وبعدين جرّب نفس الكود على رابط مفيهوش [[?]] وشوف بيحصل إيه.`,
          sol: R`~~~js url-parts.js
const url = "https://shop.example.test/products/42?ref=home#reviews";
const start = url.indexOf("//") + 2;
const domain = url.slice(start, url.indexOf("/", start));
const q = url.indexOf("?"), h = url.indexOf("#");
const id = url.slice(url.lastIndexOf("/") + 1, q === -1 ? (h === -1 ? url.length : h) : q);
const ref = q === -1 ? null : url.slice(url.indexOf("ref=", q) + 4, h === -1 ? url.length : h);
const hash = h === -1 ? "" : url.slice(h + 1);
console.log(domain, id, ref, hash);
~~~

~~~text الناتج
shop.example.test 42 home reviews
~~~

ولو الرابط من غير [[?]] و [[#]] (اتجرّب على [["https://shop.example.test/products/42"]]): [[shop.example.test 42 null]] وخانة فاضية. من غير فحص [[-1]] كان [[slice(x, -1)]] هيقص آخر حرف من رقم المنتج. وفي الكود الحقيقي استخدم [[new URL(url)]] (درس «FormData و URLSearchParams»): ده تمرين على الأماكن.`,
          teach: R`## الفكرة

مسار ملف: [["uploads/2026/menu.final.pdf"]]. المثال بيدوّر فيه على [[/]] و [[.]]، ويطلّع اسم الملف والامتداد، ويسأل أسئلة «بيبدأ بـ؟ بيخلص بـ؟ فيه؟»، ويقارن طريقتين القص، ويلزق نصوص بـ [[concat]]. ده توسيع لدرس «string methods» (اللي فيه [[includes]] و [[slice]] الأساسيين) بالباراميترز والحالات الطرفية. اتشغّل بـ Node 24.22.

---

## ١. String.prototype.indexOf: أول مكان

~~~js find.js
const file = "uploads/2026/menu.final.pdf";
console.log(file.indexOf("/"), file.lastIndexOf("/"), file.indexOf("x"));
~~~

~~~text الناتج
7 12 -1
~~~

- [[indexOf("/")]]: بيدوّر من الأول ويرجّع رقم الخانة اللي فيها أول [[/]]: الحروف [[u p l o a d s]] هي 0 لـ 6، فالـ [[/]] عند 7.
- لو مش موجود: [[-1]]، مش [[undefined]] ولا [[false]]. ([[-1]] لأنه مستحيل يبقى مكان حقيقي.)
- حساس للحروف الكبيرة والصغيرة: [["Sara".indexOf("s")]] بـ [[-1]].
- بتدوّر على **نص** مش حرف بس: [[file.indexOf("2026")]] بـ 8 (أول الكلمة).

---

## ٢. String.prototype.lastIndexOf: آخر مكان

[[file.lastIndexOf("/")]] بـ 12: آخر [[/]] قبل [[menu]]. وده اللي بتحتاجه دايمًا في: اسم الملف من مسار (بعد آخر [[/]])، والامتداد (بعد آخر [[.]]: [[menu.final.pdf]] فيها نقطتين، و [[indexOf(".")]] كانت هتدّيك [[final.pdf]])، والدومين من إيميل (بعد آخر [[@]]).

~~~js find.js
const name = file.substring(file.lastIndexOf("/") + 1);
const ext = file.slice(file.lastIndexOf(".") + 1);
console.log(name, ext);
~~~

~~~text الناتج
menu.final.pdf pdf
~~~

[[+ 1]] عشان نبدأ **بعد** العلامة نفسها.

---

## ٣. تبدأ منين: الباراميتر التاني، ولاقي كل المرات

| النداء | النتيجة | ليه |
|---|---|---|
| [[file.indexOf("/", 8)]] | 12 | بيبدأ الدوّير من خانة 8، فبيتخطى أول [[/]] |
| [[file.lastIndexOf("/", 10)]] | 7 | بيدوّر لورا ابتداءً من خانة 10 |
| [[file.indexOf("")]] | 0 | النص الفاضي «موجود» في أي مكان |
| [[file.indexOf("", 999)]] | 27 | المكان بيتقص لطول النص |

الباراميتر التاني هو اللي بيخليك تلاقي **كل** المرات:

~~~js find-all.js
const text = "باب الباب بابا";
const hits = [];
let i = text.indexOf("باب");
while (i !== -1) { hits.push(i); i = text.indexOf("باب", i + 1); }
console.log(hits);
~~~

~~~text الناتج
[ 0, 6, 10 ]
~~~

كل لفة بتدوّر من بعد المكان اللي فات بخانة. وخد بالك من [[while (i !== -1)]]: لو كتبت [[while (i)]] الـ loop هيقف على طول لو أول مرة عند 0 (القسم ٩). ولاحظ إن «باب» جوه «الباب» اتحسبت (6): [[indexOf]] بتدوّر على حروف مش كلمات. للكلمات الكاملة استخدم regex بحدود أو [[Intl.Segmenter]].

---

## ٤. [[includes]] و [[startsWith]] و String.prototype.endsWith

~~~js ask.js
console.log(file.startsWith("uploads/"), file.endsWith(".pdf"), file.includes("2026"));
~~~

~~~text الناتج
true true true
~~~

لما عايز «فيه ولا لأ» بس، دول أوضح من [[indexOf(x) !== -1]]. وكل واحدة بتاخد باراميتر تاني:

| النداء | النتيجة | الباراميتر التاني |
|---|---|---|
| [[file.startsWith("2026", 8)]] | [[true]] | «بيبدأ بـ 2026 لو بدأت العد من خانة 8؟» |
| [[file.endsWith("2026", 12)]] | [[true]] | «لو النص طوله 12 بس، بيخلص بـ 2026؟» |
| [[file.includes("2026", 20)]] | [[false]] | «فيه 2026 من خانة 20 ولبعد؟» |

[[endsWith]] الوحيدة اللي الباراميتر التاني بتاعها **طول** مش مكان بداية.

---

## ٥. String.prototype.substring ولا [[slice]]؟

~~~js cut.js
console.log("abcdef".substring(4, 1), "abcdef".slice(4, 1), "abcdef".slice(-3));
~~~

~~~text الناتج
bcd  def
~~~

الاتنين «من [[a]] لحد قبل [[b]]». بس لما الأرقام غريبة بيختلفوا (المسافتين في الناتج فوق: [[slice(4, 1)]] رجّعت نص فاضي):

| النداء | [[substring]] | [[slice]] | الفرق |
|---|---|---|---|
| [[(1, 4)]] | [["bcd"]] | [["bcd"]] | زي بعض |
| [[(4, 1)]] | [["bcd"]] | [[""]] | [[substring]] بتبدّل الطرفين، و [[slice]] بترجّع فاضي |
| [[(-3)]] | [["abcdef"]] | [["def"]] | [[substring]] بتخلي السالب صفر، و [[slice]] بتعدّه من الآخر |
| [[(2, -1)]] | [["ab"]] | [["cde"]] | [[-1]] بقت 0 وبعدين اتبدّلوا، أما [[slice]] لحد قبل آخر حرف |
| [[(NaN, 2)]] | [["ab"]] | | [[NaN]] بقت 0 |
| [[(2, 99)]] | [["cdef"]] | [["cdef"]] | الرقم الكبير بيتقص لطول النص |

**القاعدة:** استخدم [[slice]]. السالب بتاعه مفيد ([[slice(-3)]] آخر ٣)، والمقلوب بيرجّع فاضي بدل ما يخبي غلطة في الحساب. و [[substring]] هتلاقيها في كود قديم كتير، فلازم تعرف سلوكها.

### [[substr]]: متقادمة

[["abcdef".substr(1, 3)]] بترجّع [["bcd"]]: الباراميتر التاني **طول** مش نهاية. MDN معلّمها deprecated (لسه شغالة عشان الكود القديم). متكتبهاش، وغيّرها لـ [[slice(start, start + length)]] لو قابلتها.

---

## ٦. String.prototype.concat ولا [[+]]؟

~~~js join.js
console.log("رقم ".concat(7, " من ", 10), "a" + 1 + 2, 1 + 2 + "a");
~~~

~~~text الناتج
رقم 7 من 10 a12 3a
~~~

- [["رقم ".concat(7, " من ", 10)]]: بتلزق كل الباراميترز ورا النص، وأي حاجة مش نص بتتحوّل بـ [[String()]] الأول.
- [["a" + 1 + 2]] بـ [["a12"]]: من الشمال لليمين، [["a" + 1]] بقت [["a1"]] (نص)، وبعدين [["a1" + 2]].
- [[1 + 2 + "a"]] بـ [["3a"]]: [[1 + 2]] أرقام الأول فبقت 3، وبعدين [[3 + "a"]].

| النداء | النتيجة |
|---|---|
| [["".concat(1, 2)]] | [["12"]] (نص مش 3) |
| [["x".concat(null, undefined)]] | [["xnullundefined"]] (بتتكتب كلمات زي [[String(null)]]) |
| [["x".concat([1, 2])]] | [["x1,2"]] (الـ array بتتحوّل بفواصل، والـ array جوه array كمان بتتفرد) |
| [["x".concat({ a: 1 })]] | [["x[object Object]"]] (الـ object مبيتحوّلش JSON لوحده) |
| [["x".concat(Symbol("s"))]] | [[TypeError: Cannot convert a Symbol value to a string]] (عكس [[String(sym)]] اللي بتشتغل) |

**القاعدة:** [[concat]] و [[+]] نفس النتيجة. MDN بتنصح بـ [[+]] أو template literal عشان أوضح. و [[concat]] مالهاش علاقة بـ [[Array.prototype.concat]] اللي بتلزق arrays.

---

## ٧. الأماكن دي خانات، مش حروف

~~~text Node REPL
> "😀 أهلًا".indexOf("أ")
3
> [..."😀 أهلًا"].indexOf("أ")
2
~~~

[[indexOf]] بيعدّ بالخانات، والإيموجي خانتين، فـ «أ» عند 3. وده **صح** لو هتستخدم الرقم مع [[slice]] أو [[substring]] على نفس النص (كلهم بنفس الوحدة). المشكلة بس لو عرضت الرقم ليوزر («الكلمة في الحرف رقم 3») أو خلطت أماكن من array حروف بأماكن في النص.

---

## ٨. فخاخ اتجرّبت

| الكود | النتيجة | ليه |
|---|---|---|
| [[if (text.indexOf("http"))]] | false لما الرابط **بيبدأ** بـ http | المكان 0 falsy، و [[-1]] truthy (التمرين الخامس) |
| [["a/b/c".indexOf(/b/)]] | 1 | الـ regex اتحوّل لنص [["/b/"]] واتلقى! [[indexOf]] مبتفهمش regex، استخدم [[search]] |
| [["abc".startsWith(/a/)]] | [[TypeError: First argument to String.prototype.startsWith must not be a regular expression]] | [[startsWith]] و [[endsWith]] و [[includes]] بيرفضوا regex صراحة |
| [["undefined".includes()]] | [[true]] | من غير باراميتر بيدوّر على [["undefined"]] كنص |

---

## الخلاصة

| عايز | استخدم |
|---|---|
| مكان أول ظهور | [[indexOf(x)]] (و [[-1]] = مش موجود) |
| مكان آخر ظهور (امتداد، اسم ملف) | [[lastIndexOf(x)]] |
| كل الأماكن | [[indexOf(x, i + 1)]] في [[while (i !== -1)]] |
| موجود ولا لأ | [[includes]] أو [[startsWith]] أو [[endsWith]] |
| جزء من النص | [[slice(a, b)]]، والسالب من الآخر |
| تفهم كود قديم | [[substring]] بتبدّل وبتصفّر السالب، و [[substr]] باراميترها التاني طول |
| تلزق | [[+]] أو template literal ([[concat]] نفس الشيء) |`,
          lines: [
            R`مسار ملف فيه [[/]] مرتين ونقطتين: كده [[indexOf]] و [[lastIndexOf]] هيدّوا نتايج مختلفة.`,
            R`أول [[/]] عند 7، وآخر [[/]] عند 12، و [["x"]] مش موجودة فـ [[-1]]. الأرقام أماكن خانات من صفر.`,
            R`[[substring]] من بعد آخر [[/]] لحد الآخر، فبيطلع اسم الملف [["menu.final.pdf"]]. الـ [[+ 1]] عشان العلامة نفسها متدخلش.`,
            R`[[slice]] من بعد آخر نقطة، فالامتداد [["pdf"]]. لو استخدمت [[indexOf(".")]] كان طلع [["final.pdf"]].`,
            R`بيطبع الاسم والامتداد: [[menu.final.pdf]] و [[pdf]].`,
            R`أسئلة «بيبدأ بـ؟ بيخلص بـ؟ فيه؟» بترجّع [[true]] أو [[false]] على طول، أوضح من مقارنة [[indexOf]] بـ [[-1]].`,
            R`الفرق بين القصّتين: [[substring(4, 1)]] بدّلت الطرفين فطلّعت [["bcd"]]، و [[slice(4, 1)]] رجّعت فاضي، و [[slice(-3)]] آخر ٣ حروف.`,
            R`[[concat]] بتلزق أرقام ونصوص زي [[+]]، والترتيب بيفرق: [["a" + 1 + 2]] بـ [["a12"]] و [[1 + 2 + "a"]] بـ [["3a"]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const s = "JavaScript";]]. اكتب ناتج [[s.substring(4)]] و [[s.slice(4)]] و [[s.substring(-6)]] و [[s.slice(-6)]] و [[s.substring(6, 2)]] و [[s.slice(6, 2)]] و [[s.substring(2, 6)]] (من قسم ٥ في الشرح).`, done: R`كتبت [["Script"]] و [["Script"]] و [["JavaScript"]] و [["Script"]] و [["vaSc"]] و [[""]] و [["vaSc"]] قبل التشغيل.`, sol: R`~~~js predict.js
const s = "JavaScript";
console.log(s.substring(4), s.slice(4), s.substring(-6), s.slice(-6), s.substring(6, 2), s.slice(6, 2), s.substring(2, 6));
~~~

~~~text الناتج
Script Script JavaScript Script vaSc  vaSc
~~~

- [[substring(-6)]]: السالب بقى 0، فالنص كله. و [[slice(-6)]]: [[10 - 6 = 4]]، فمن 4 للآخر.
- [[substring(6, 2)]]: بدّلت لـ [[(2, 6)]] فـ [[vaSc]]. و [[slice(6, 2)]]: البداية بعد النهاية، فنص فاضي (المسافتين في الناتج).
- يعني [[substring]] بتحاول «تفهم قصدك»، و [[slice]] بتعمل اللي كتبته بالظبط. ولو حسبة الأماكن عندك غلط، [[slice]] هتوريك (نتيجة فاضية) و [[substring]] هتخبيه.` },
            { lvl: 'سريع', t: R`**ابني:** [[parsePair(line)]] لسطر من ملف [[.env]] زي [["TOKEN = abc==xyz"]]: ترجّع [[{ key, value }]] متنضفين من المسافات، أو [[null]] لو مفيش [[=]]. القيمة نفسها ممكن يبقى فيها [[=]] (من قسم ١ في الشرح).`, done: R`[[parsePair("TOKEN = abc==xyz")]] بترجّع [[{ key: 'TOKEN', value: 'abc==xyz' }]]، و [["DEBUG"]] بترجّع [[null]]، و [["EMPTY="]] بترجّع قيمة فاضية. وعرفت ليه [[split("=")]] كان هيغلط.`, sol: R`~~~js parse-pair.js
function parsePair(line) {
  const i = line.indexOf("=");
  if (i === -1) return null;
  return { key: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
}
console.log(parsePair("TOKEN = abc==xyz"), parsePair("DEBUG"), parsePair("EMPTY="), "TOKEN = abc==xyz".split("="));
~~~

~~~text الناتج
{ key: 'TOKEN', value: 'abc==xyz' } null { key: 'EMPTY', value: '' } [ 'TOKEN ', ' abc', '', 'xyz' ]
~~~

- [[indexOf("=")]] بيدّي **أول** [[=]] بس، فاللي قبله المفتاح وكل اللي بعده القيمة، حتى لو فيها [[==]] (زي base64 اللي بيخلص بـ [[==]]).
- [[split("=")]] (آخر حاجة في الناتج) قطّعت عند كل [[=]] فالقيمة اتفرتكت لـ ٣ حتت.
- [[if (i === -1)]] الأول، وإلا [[slice(0, -1)]] كانت هترجّع [["DEBU"]] كمفتاح.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[findAll(text, word)]] بترجّع array بكل الأماكن اللي [[word]] بتبدأ فيها، **حتى المتداخلة** ([[findAll("aaaa", "aa")]] = [[[0, 1, 2]]])، و [[[]]] لو الكلمة فاضية أو مش موجودة. حلّها في المربع اللي تحت (من قسم ٣ في الشرح).`, done: R`كل الاختبارات عدّت: [[findAll("باب الباب بابا", "باب")]] بـ [[[0, 6, 10]]] و [[findAll("aaaa", "aa")]] بـ [[[0, 1, 2]]] و [[findAll("abc", "")]] بـ [[[]]] من غير loop لا نهائي.`, sol: R`~~~js find-all.js
function findAll(text, word) {
  if (word === "") return [];
  const hits = [];
  let i = text.indexOf(word);
  while (i !== -1) { hits.push(i); i = text.indexOf(word, i + 1); }
  return hits;
}
console.log(findAll("باب الباب بابا", "باب"), findAll("aaaa", "aa"), findAll("abc", "x"), findAll("abc", ""));
~~~

~~~text الناتج
[ 0, 6, 10 ] [ 0, 1, 2 ] [] []
~~~

- [[i + 1]] مش [[i + word.length]]: كده بنلاقي المتداخلة. لو عايز من غير تداخل ([[[0, 2]]] لـ [["aaaa"]]) استخدم [[i + word.length]].
- [[if (word === "")]] لازم: [[indexOf("")]] بيرجّع المكان اللي بتبدأ منه دايمًا، فمن غيره الـ loop هيلاقي 0 و 1 و 2 و 3، وبعدين [[indexOf("", 4)]] بيرجّع 3 (المكان بيتقص لطول النص)، فالـ loop مبيخلصش.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لستة ملفات من فولدر: [["report.pdf"]] و [["photo.final.JPG"]] و [[".env"]] و [["Makefile"]] و [["archive.tar.gz"]] و [["notes."]]. جمّعهم في object حسب الامتداد (lowercase)، واللي ملوش امتداد حقيقي في مجموعة «(من غير امتداد)» (من قسم ٢ في الشرح).`, done: R`[[pdf]] فيها report، و [[jpg]] فيها photo.final.JPG، و [[gz]] فيها archive.tar.gz، و «(من غير امتداد)» فيها [[.env]] و [[Makefile]] و [[notes.]].`, sol: R`~~~js group-ext.js
const files = ["report.pdf", "photo.final.JPG", ".env", "Makefile", "archive.tar.gz", "notes."];
function extOf(f) {
  const dot = f.lastIndexOf(".");
  if (dot <= 0 || dot === f.length - 1) return "(من غير امتداد)";
  return f.slice(dot + 1).toLowerCase();
}
const groups = {};
for (const f of files) (groups[extOf(f)] ||= []).push(f);
console.log(groups);
~~~

~~~text الناتج
{
  pdf: [ 'report.pdf' ],
  jpg: [ 'photo.final.JPG' ],
  '(من غير امتداد)': [ '.env', 'Makefile', 'notes.' ],
  gz: [ 'archive.tar.gz' ]
}
~~~

- [[dot <= 0]]: [[-1]] (مفيش نقطة، Makefile) أو 0 (النقطة في الأول: [[.env]] ملف مخفي اسمه env مش امتداد).
- [[dot === f.length - 1]]: النقطة آخر حرف ([["notes."]]) فمفيش امتداد بعدها.
- [[lastIndexOf]] بيدّي [[gz]] لـ [[archive.tar.gz]]. لو عايز [[tar.gz]] كامل محتاج قايمة امتدادات مركّبة.
- [[||=]] معناها «لو مفيش array للمفتاح ده اعمل واحدة»، وبعدين [[push]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const kind = l.indexOf("http") ? "رابط ويب" : "مش رابط ويب";]] على [["http://a.test"]] و [["ftp://b.test"]] و [["https://c.test"]] بيطلّع عكس الصح. لاقي ليه وصلّحه (من قسم ٨ في الشرح).`, done: R`عرفت إن 0 falsy و [[-1]] truthy، والتصليح بيقول «رابط ويب» لـ http و https و «مش رابط ويب» لـ ftp.`, sol: R`~~~js link-kind.js
const links = ["http://a.test", "ftp://b.test", "https://c.test"];
for (const l of links) {
  const bad = l.indexOf("http") ? "رابط ويب" : "مش رابط ويب";
  const good = l.startsWith("http://") || l.startsWith("https://") ? "رابط ويب" : "مش رابط ويب";
  console.log(l, l.indexOf("http"), bad, "|", good);
}
~~~

~~~text الناتج
http://a.test 0 مش رابط ويب | رابط ويب
ftp://b.test -1 رابط ويب | مش رابط ويب
https://c.test 0 مش رابط ويب | رابط ويب
~~~

- [[indexOf]] بيرجّع **مكان**: 0 لما الرابط بيبدأ بـ http، و 0 falsy، فالـ ternary اختار التاني. و [[-1]] (مش موجود) truthy فاختار الأول. الاتنين عكس المطلوب.
- [[startsWith]] بترجّع boolean فمفيش لخبطة، وكمان أدق: [[indexOf("http")]] كان هيقول «رابط ويب» على [["ftp://x.test/http"]].
- لو لازم [[indexOf]]: قارن صراحة [[l.indexOf("http") === 0]] أو [[!== -1]]. ده نفس الغلط في [[while (i)]] بتاع لاقي كل المرات.` },
            { lvl: 'تحدي', t: R`**refactor:** [[console.log("المجموع: " + a + b)]] مع [[a = 10]] و [[b = 5]] بيطبع [[105]]، وزميلك جرّب [["المجموع: ".concat(a, b)]] وطلع نفس الغلط. اكتب ٣ نسخ صح، وقول أنهي أوضح (من قسم ٦ في الشرح).`, done: R`النسخ التلاتة بيطبعوا «المجموع: 15»، وعرفت إن [[concat]] و [[+]] بيلزقوا من الشمال لليمين، وإن الحسبة لازم تتعمل قبل اللزق.`, sol: R`~~~js sum.js
const a = 10, b = 5;
console.log("المجموع: " + a + b);
console.log("المجموع: ".concat(a, b));
console.log("المجموع: " + (a + b));
console.log($__btالمجموع: $__{a + b}$__bt);
console.log("المجموع: ".concat(a + b));
~~~

~~~text الناتج
المجموع: 105
المجموع: 105
المجموع: 15
المجموع: 15
المجموع: 15
~~~

- أول سطرين غلط لنفس السبب: أول حاجة نص، فكل اللي بعدها بيتلزق نص: [["المجموع: 10"]] وبعدين [["5"]].
- التصليح: الحسبة تتعمل الأول، بالقوسين، أو جوه [[$__{ }]]، أو تبعت [[a + b]] كباراميتر واحد لـ [[concat]].
- الأوضح: الـ template literal: الحسبة باينة إنها حسبة، ومفيش [[+]] بمعنيين في نفس السطر.` }
          ],
          check: {
            lang: "js",
            starter: R`function findAll(text, word) {
  return [text.indexOf(word)];
}`,
            tests: R`test("عربي: باب جوه الباب وبابا", () => expect(findAll("باب الباب بابا", "باب")).toEqual([0, 6, 10]));
test("المتداخلة بتتحسب", () => expect(findAll("aaaa", "aa")).toEqual([0, 1, 2]));
test("مش موجودة = array فاضية", () => expect(findAll("abc", "x")).toEqual([]));
test("كلمة فاضية = array فاضية (من غير loop لا نهائي)", () => expect(findAll("abc", "")).toEqual([]));
test("في الأول وفي الآخر", () => expect(findAll("ab-ab", "ab")).toEqual([0, 3]));`,
            solution: R`function findAll(text, word) {
  if (word === "") return [];
  const hits = [];
  let i = text.indexOf(word);
  while (i !== -1) { hits.push(i); i = text.indexOf(word, i + 1); }
  return hits;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: String.prototype.indexOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf" },
            { t: "MDN: String.prototype.lastIndexOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf" },
            { t: "MDN: String.prototype.endsWith()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith" },
            { t: "MDN: String.prototype.substring()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring" },
            { t: "MDN: String.prototype.concat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat" },
            { t: "MDN Curriculum: JavaScript fundamentals، Text", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
          ],
          pre: ["js/string methods", "js/truthy و falsy"],
          deep: {
            why: R`استخراج جزء من نص (اسم ملف، امتداد، دومين، قيمة بعد [[=]]، رقم من رابط) بيحصل كل يوم، وأغلبه مش محتاج regex. والغلطات فيه صامتة: [[indexOf]] في [[if]]، و [[split]] على علامة ممكن تتكرر، و [[substring]] اللي بتبدّل الطرفين وتخبي حسبة غلط.`,
            how: R`[[indexOf]] بيمشي من البداية (أو من الباراميتر التاني) ويقارن النص خانة خانة، وأول ما يلاقيه يرجّع مكانه، وإلا [[-1]]. [[lastIndexOf]] نفس الكلام من الآخر لورا. والقص: [[slice]] بيحوّل السالب لـ [[length + n]] وبعدين يقص لو البداية قبل النهاية وإلا فاضي، و [[substring]] بيحوّل السالب و [[NaN]] لصفر ويبدّل لو مقلوبين. و [[concat]] بيحوّل كل باراميتر بـ [[String()]] ويلزق. والأماكن كلها خانات UTF-16.`,
            when: R`[[includes]] و [[startsWith]] و [[endsWith]] لأسئلة نعم ولا. [[indexOf]] و [[lastIndexOf]] لما محتاج المكان نفسه عشان تقص. [[slice]] للقص دايمًا. [[split]] لما العلامة فاصل بين حتت كتير متساوية (CSV)، و [[indexOf]] لما عايز «قبل أول علامة وبعدها». و [[URL]] للروابط و [[path]] للمسارات في الكود الحقيقي.`,
            mistakes: R`[[if (s.indexOf(x))]] (0 falsy). و [[indexOf(".")]] للامتداد بدل [[lastIndexOf]]. و [[slice(i + 1)]] من غير ما تتأكد إن [[i]] مش [[-1]] (هتقص من 0). و [[indexOf(regex)]] (بيتحوّل نص). و [[substr]] في كود جديد. و [["Total: " + a + b]]. وتعرض مكان [[indexOf]] ليوزر كأنه رقم الحرف وفيه إيموجي قبله.`
          }
        },
        {
          cmd: "toUpperCase و toLocaleUpperCase",
          title: "تكبّر وتصغّر الحروف صح في كل اللغات، وتقارن من غير ما الكبير والصغير يفرقوا",
          desc: R`[[toUpperCase()]] و [[toLowerCase()]] بيغيّروا حالة الحروف بقواعد Unicode العامة، والعربي بيعدّي زي ما هو لأنه ملوش كبير وصغير. والطول ممكن يتغيّر: [["ß".toUpperCase()]] بقت [["SS"]].
• [[toLocaleUpperCase("tr")]] و [[toLocaleLowerCase("tr")]] بيستخدموا قواعد لغة معيّنة. التركي مثلًا: [[i]] الكبيرة بتاعتها [[İ]] بنقطة، و [[I]] الصغيرة بتاعتها [[ı]] من غير نقطة.
• للمقارنة من غير حساسية: [[a.toLowerCase() === b.toLowerCase()]] سريعة وكفاية للإنجليزي، و [[Intl.Collator]] بـ [[sensitivity: "base"]] لما اللغة تفرق (وبيعتبر «أحمد» و «احمد» واحد).`,
          example: R`console.log("Sara".toUpperCase(), "Sara".toLowerCase());
console.log("مرحبا Sara".toUpperCase());
console.log("straße".toUpperCase(), "straße".length, "straße".toUpperCase().length);
console.log("istanbul".toUpperCase(), "istanbul".toLocaleUpperCase("tr"));
console.log("ISTANBUL".toLocaleLowerCase("tr"));
console.log("Istanbul".localeCompare("istanbul", "en", { sensitivity: "base" }) === 0);`,
          try: R`اطبع [["DİREKT".toLowerCase()]] و طوله، وقارنه بـ [["direkt"]] بـ [[===]]. وبعدين جرّب [["DİREKT".toLocaleLowerCase("tr")]]. واطبع أكواد حروف الناتج الأول بـ [[[...s].map(c => c.codePointAt(0).toString(16))]].`,
          sol: R`[["DİREKT".toLowerCase()]] طوله 7 مش 6، و [[=== "direkt"]] بـ [[false]]: الـ [[İ]] بقت [[i]] + علامة نقطة فوق ([[U+0307]]) عشان القواعد العامة متضيّعش النقطة. و [[toLocaleLowerCase("tr")]] بترجّع [["direkt"]] بالظبط (طول 6). والأكواد: [[64 69 307 72 65 6b 74]].`,
          teach: R`## الفكرة

الكبير والصغير (case) موجود في اللاتيني واليوناني والكيريلي والأرمني، ومش موجود في العربي والعبري والصيني. والقواعد مش «حرف قصاد حرف» دايمًا: فيه حروف بتبقى حرفين، وفيه لغات بتغيّر القاعدة. الدرس بيوريك الحالات دي والمقارنة الصح. اتشغّل بـ Node 24.22 (ICU 78.3)، و Chrome 157 طلّع نفس الناتج لـ [["istanbul".toLocaleUpperCase("tr")]] و [["DİREKT".toLowerCase().length]].

---

## ١. String.prototype.toUpperCase و toLowerCase

~~~js case.js
console.log("Sara".toUpperCase(), "Sara".toLowerCase());
~~~

~~~text الناتج
SARA sara
~~~

بيرجّعوا نص جديد (الأصل مبيتغيرش، زي كل methods النصوص). وبيشتغلوا على كل اللغات اللي ليها case: [["ÉCOLE".toLowerCase()]] بـ [["école"]]. وبيقبلوا أي حاجة تتحوّل نص: [[String.prototype.toUpperCase.call(true)]] بـ [["TRUE"]]، بس [[null]] و [[undefined]] بيرموا [[TypeError: String.prototype.toUpperCase called on null or undefined]].

---

## ٢. العربي بيعدّي زي ما هو

~~~js case.js
console.log("مرحبا Sara".toUpperCase());
~~~

~~~text الناتج
مرحبا SARA
~~~

الحروف العربي ملهاش كبير وصغير، فبتعدّي من غير تغيير، واللاتيني اللي جنبها بس اللي اتغيّر. عشان كده [["مرحبا".toUpperCase() === "مرحبا"]] بـ [[true]]، و [[/\p{Lu}|\p{Ll}/u.test("مرحبا")]] (حرف كبير أو صغير؟) بـ [[false]]: الحروف العربي في Unicode تصنيفها [[Lo]] (Letter, other). يعني [[toLowerCase()]] على إيميل أو username عربي آمنة، ومفيش داعي تفصل.

---

## ٣. الطول ممكن يتغيّر

~~~js case.js
console.log("straße".toUpperCase(), "straße".length, "straße".toUpperCase().length);
~~~

~~~text الناتج
STRASSE 6 7
~~~

الـ [[ß]] الألماني ملوش حرف كبير واحد في القواعد العامة، فبقى [[SS]]. ونفس الكلام [["ﬁle".toUpperCase()]] بـ [["FILE"]] (الحرف المركّب ﬁ بقى حرفين). فمتفترضش إن [[s.toUpperCase().length === s.length]]، ومتستخدمش أماكن من النص الأصلي على النسخة الكبيرة.

---

## ٤. String.prototype.toLocaleUpperCase و String.prototype.toLocaleLowerCase

~~~js locale.js
console.log("istanbul".toUpperCase(), "istanbul".toLocaleUpperCase("tr"));
console.log("ISTANBUL".toLocaleLowerCase("tr"));
~~~

~~~text الناتج
ISTANBUL İSTANBUL
ıstanbul
~~~

التركي (والأذري) فيهم ٤ حروف i: [[i]] و [[İ]] (بنقطة)، و [[ı]] و [[I]] (من غير نقطة). فالـ i الصغيرة كبيرها [[İ]]، والـ I الكبيرة صغيرها [[ı]]. [[toLocaleUpperCase("tr")]] بيطبّق القاعدة دي، و [[toUpperCase()]] لأ.

| النداء | النتيجة | ليه |
|---|---|---|
| [["i".toLocaleUpperCase("tr")]] | [["İ"]] | قاعدة التركي |
| [["i".toLocaleUpperCase("az")]] | [["İ"]] | الأذري نفس القاعدة |
| [["i".toLocaleUpperCase(["tr", "en"])]] | [["İ"]] | لستة لغات: بياخد أول واحدة مدعومة |
| [["i".toLocaleUpperCase(["en", "tr"])]] | [["I"]] | الإنجليزي جه الأول |
| [["i".toLocaleUpperCase("xx")]] | [["I"]] | لغة مش معروفة: القواعد العامة من غير error |
| [["i".toLocaleUpperCase()]] | [["I"]] على جهازي | من غير لغة: لغة النظام (هنا [[en-US]]) |

آخر صف خطير: نفس الكود على سيرفر لغته تركي هيدّي نتيجة تانية. فـ [[toLocaleUpperCase()]] من غير لغة **أسوأ** من [[toUpperCase()]]. يا تكتب اللغة، يا تستخدم [[toUpperCase()]].

---

## ٥. باج حقيقي: [["DİREKT".toLowerCase()]]

~~~text Node REPL
> "DİREKT".toLowerCase()
'di̇rekt'
> "DİREKT".toLowerCase().length
7
> "DİREKT".toLowerCase() === "direkt"
false
> "DİREKT".toLocaleLowerCase("tr") === "direkt"
true
~~~

القواعد العامة مبتعرفش إن [[İ]] صغيرها [[i]]، فبتعملها [[i]] + علامة «نقطة فوق» ([[U+0307]]) عشان متضيّعش النقطة. النتيجة شكلها «direkt» (النقطة فوق الـ i اللي ليها نقطة أصلًا) بس ٧ خانات، وأي بحث أو [[Set]] أو مقارنة هيعتبرها كلمة تانية. ده بيحصل في أي سيستم فيه يوزرز أتراك بيكتبوا tags أو usernames.

---

## ٦. المقارنة من غير ما الكبير والصغير يفرقوا

~~~js compare.js
console.log("Istanbul".localeCompare("istanbul", "en", { sensitivity: "base" }) === 0);
~~~

~~~text الناتج
true
~~~

عندك ٣ طرق:

| الطريقة | «café» و «cafe» | «أحمد» و «احمد» | «Straße» و «STRASSE» | الوقت على ٢٠٠ ألف مقارنة |
|---|---|---|---|---|
| [[a.toLowerCase() === b.toLowerCase()]] | مختلفين | مختلفين | مختلفين | 2 لـ 13 ms |
| [[a.localeCompare(b, "ar", { sensitivity: "base" })]] | زي بعض | زي بعض | زي بعض | حوالي 1100 ms |
| [[new Intl.Collator("ar", { sensitivity: "base" })]] مرة واحدة و [[col.compare(a, b)]] | زي بعض | زي بعض | زي بعض | 25 لـ 34 ms |

- [[sensitivity: "base"]] معناها «قارن الحرف الأساسي بس»: الكبير والصغير والعلامات (é و e) والهمزة (أ و ا) متفرقش. (ده من بيانات اللغة العربي في ICU، اتجرّب.)
- [[localeCompare]] بـ options بيعمل collator جديد كل نداء، فبطيء جدًا في loop. اعمل [[Intl.Collator]] مرة واحدة.
- [[toLowerCase()]] أسرع بكتير وكفاية للحاجات اللي فيها إنجليزي بس (إيميلات، أكواد، tags إنجليزي).

---

## ٧. الأخطاء

~~~text الناتج
"i".toLocaleUpperCase("tr_TR")             RangeError: Incorrect locale information provided
String.prototype.toUpperCase.call(null)    TypeError: String.prototype.toUpperCase called on null or undefined
~~~

اسم اللغة بشرطة [[-]] مش [[_]] ([["tr-TR"]]). وأي method نصوص على [[null]] بترمي، فلو القيمة ممكن تبقى فاضية: [[(name ?? "").toLowerCase()]].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تكبير أو تصغير لعرض أو تخزين، لغة مش معروفة | [[toUpperCase()]] و [[toLowerCase()]] |
| نص بلغة معروفة (تركي، أذري، ليتواني) | [[toLocaleUpperCase("tr")]] **باللغة** |
| مقارنة إنجليزي من غير حساسية | [[toLowerCase()]] على الاتنين |
| مقارنة أي لغة، أو تجاهل العلامات والهمزة | [[Intl.Collator]] بـ [[sensitivity: "base"]] مرة واحدة |
| متكتبش | [[toLocaleUpperCase()]] من غير لغة، وأماكن من الأصل على النسخة المتكبّرة |`,
          lines: [
            R`[[toUpperCase]] و [[toLowerCase]] بيرجّعوا نسخة جديدة كلها كبير أو كلها صغير، والأصل زي ما هو.`,
            R`العربي ملوش كبير وصغير فبيعدّي زي ما هو، وكلمة [[Sara]] بس اللي اتكبّرت.`,
            R`الـ [[ß]] الألماني كبيرها [[SS]]، فالطول بقى 7 بعد ما كان 6: التكبير ممكن يغيّر الطول.`,
            R`القواعد العامة بتدّي [[I]]، والتركي بيدّي [[İ]] بنقطة. [[toLocaleUpperCase("tr")]] هي اللي بتعرف الفرق.`,
            R`العكس في التركي: [[I]] صغيرها [[ı]] من غير نقطة، فبقت [[ıstanbul]].`,
            R`[[localeCompare]] بـ [[sensitivity: "base"]] بيرجّع 0 لما الاتنين نفس الحروف بغض النظر عن الكبير والصغير، فالمقارنة [[true]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [["كود js".toUpperCase()]] و [["ÉCOLE".toLowerCase()]] و [["i".toLocaleUpperCase("tr")]] و [["i".toLocaleUpperCase("en")]] و [["ß".toUpperCase().length]] (من قسم ١ لـ ٤ في الشرح).`, done: R`كتبت [["كود JS"]] و [["école"]] و [["İ"]] و [["I"]] و [[2]] قبل التشغيل.`, sol: R`~~~js predict.js
console.log("كود js".toUpperCase(), "ÉCOLE".toLowerCase(), "i".toLocaleUpperCase("tr"), "i".toLocaleUpperCase("en"), "ß".toUpperCase().length);
~~~

~~~text الناتج
كود JS école İ I 2
~~~

- العربي عدّى، و [[js]] بس اتكبّرت.
- الحروف بعلامات ليها كبير وصغير عادي ([[É]] و [[é]]).
- [[ß]] بقت [[SS]] حرفين.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[titleCase(str, locale)]] بتكبّر أول حرف من كل كلمة لاتيني وتصغّر الباقي، والكلمات العربي زي ما هي، واللغة بتتبعت للتكبير والتصغير. استخدم [[Intl.Segmenter]] بـ [["word"]]. جرّبها على [["دورة JAVASCRIPT للمبتدئين في istanbul"]] مرة بـ [["en"]] ومرة بـ [["tr"]]، وقارن (من قسم ٤ في الشرح).`, done: R`بـ [["en"]]: [["دورة Javascript للمبتدئين في Istanbul"]]. وبـ [["tr"]] لاحظت إن [[Javascript]] بقت [[Javascrıpt]] من غير نقطة و [[Istanbul]] بقت [[İstanbul]]، وعرفت ليه اللغة لازم تبقى لغة النص نفسه.`, sol: R`~~~js title-case.js
const seg = new Intl.Segmenter("en", { granularity: "word" });
function titleCase(str, locale = "en") {
  let out = "";
  for (const { segment, isWordLike } of seg.segment(str)) {
    if (!isWordLike) { out += segment; continue; }
    const [first, ...rest] = segment;
    out += first.toLocaleUpperCase(locale) + rest.join("").toLocaleLowerCase(locale);
  }
  return out;
}
console.log(titleCase("دورة JAVASCRIPT للمبتدئين في istanbul"));
console.log(titleCase("دورة JAVASCRIPT للمبتدئين في istanbul", "tr"));
~~~

~~~text الناتج
دورة Javascript للمبتدئين في Istanbul
دورة Javascrıpt للمبتدئين في İstanbul
~~~

- الـ Segmenter بيقسم كلمات ومسافات، والمسافات بتتلزق زي ما هي.
- [[const [first, ...rest] = segment]]: destructuring على النص بيقسمه حروف كاملة (الـ iterator)، فأول حرف لوحده والباقي array.
- الكلمات العربي بتعدّي في نفس الكود من غير [[if]]: التكبير مبيغيّرهاش.
- **الغلطة اللي باينة في السطر التاني:** [["tr"]] على نص إنجليزي خلّى [[I]] في JAVASCRIPT تبقى [[ı]]. اللغة هي لغة **الكلمة**، مش لغة اليوزر. في نص مخلوط استخدم [["en"]] أو [[toUpperCase()]]، و [["tr"]] بس على كلام تركي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سيستم tags فيه يوزرز أتراك، والتكرار بيتشال بـ [[new Set(tags.map(t => t.toLowerCase()))]]. على [[["DİREKT", "Direkt", "direkt"]]] الـ Set فيه 2 مش 1. لاقي ليه وصلّحه (من قسم ٥ في الشرح).`, done: R`عرفت إن [["DİREKT".toLowerCase()]] طوله 7، والتصليح بـ [[toLocaleLowerCase("tr")]] بيطلّع Set فيه [[direkt]] واحدة.`, sol: R`~~~js tags.js
const tags = ["DİREKT", "Direkt", "direkt"];
const bad = new Set(tags.map(t => t.toLowerCase()));
const good = new Set(tags.map(t => t.toLocaleLowerCase("tr")));
console.log(bad.size, [...bad].map(t => t.length), good.size, [...good]);
~~~

~~~text الناتج
2 [ 7, 6 ] 1 [ 'direkt' ]
~~~

- [[toLowerCase()]] عمل [[İ]] → [[i]] + [[U+0307]]، فبقت كلمة طولها 7 مختلفة عن [["direkt"]].
- [[toLocaleLowerCase("tr")]] بيعرف إن [[İ]] صغيرها [[i]] عادية.
- **بس خد بالك:** [["tr"]] على tag إنجليزي فيه [[I]] كبيرة ([["IPHONE"]]) هتطلع [[ıphone]]. لو الـ tags لغات مخلوطة، الحل الأأمن [[Intl.Collator("tr", { sensitivity: "base" })]] للمقارنة، أو تخزين لغة كل tag.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قارن ٤ أزواج ([["Sara"/"sara"]] و [["café"/"cafe"]] و [["أحمد"/"احمد"]] و [["Straße"/"STRASSE"]]) بـ ٣ طرق: [[toLowerCase]] و [[localeCompare]] بـ [[sensitivity: "base"]] و [[Intl.Collator]] واحد. وبعدين قيس الوقت على ٢٠٠ ألف مقارنة ٣ مرات (من قسم ٦ في الشرح).`, done: R`جدول النتايج بيوري إن [[toLowerCase]] بيقول «زي بعض» للأول بس، والتانيين للأربعة. والأرقام بتوري [[localeCompare]] أبطأ بحوالي ٤٠ مرة من [[Intl.Collator]].`, sol: R`~~~js compare-bench.js
const pairs = [["Sara", "sara"], ["café", "cafe"], ["أحمد", "احمد"], ["Straße", "STRASSE"]];
const col = new Intl.Collator("ar", { sensitivity: "base" });
for (const [x, y] of pairs) {
  console.log(x, y, x.toLowerCase() === y.toLowerCase(), x.localeCompare(y, "ar", { sensitivity: "base" }) === 0, col.compare(x, y) === 0);
}
const list = Array.from({ length: 200000 }, (_, i) => (i % 2 ? "Sara" : "sara") + i % 50);
for (let r = 0; r < 3; r++) {
  let t = performance.now(); let n1 = 0; for (const x of list) if (x.toLowerCase() === "sara7") n1++; const t1 = performance.now() - t;
  t = performance.now(); let n2 = 0; for (const x of list) if (x.localeCompare("sara7", "ar", { sensitivity: "base" }) === 0) n2++; const t2 = performance.now() - t;
  t = performance.now(); let n3 = 0; for (const x of list) if (col.compare(x, "sara7") === 0) n3++; const t3 = performance.now() - t;
  console.log(n1, n2, n3, "toLowerCase", t1.toFixed(0), "ms | localeCompare", t2.toFixed(0), "ms | Collator", t3.toFixed(0), "ms");
}
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
Sara sara true true true
café cafe false true true
أحمد احمد false true true
Straße STRASSE false true true
4000 4000 4000 toLowerCase 13 ms | localeCompare 1076 ms | Collator 25 ms
4000 4000 4000 toLowerCase 11 ms | localeCompare 1111 ms | Collator 28 ms
4000 4000 4000 toLowerCase 2 ms | localeCompare 1415 ms | Collator 34 ms
~~~

- الـ 4000 في الأعمدة التلاتة: نفس العدد، يعني الطرق متفقة على اللستة دي (كلها لاتيني).
- [[localeCompare]] بـ options بيعمل collator جديد في كل نداء، وده الفرق كله. [[Intl.Collator]] مرة واحدة برّه الـ loop.
- القرار: [[toLowerCase]] للإنجليزي البحت، و Collator واحد لأي بحث أو ترتيب أسامي فيها عربي أو علامات.` }
          ],
          flag: "script",
          ref: [
            { t: "MDN: String.prototype.toUpperCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase" },
            { t: "MDN: String.prototype.toLocaleUpperCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase" },
            { t: "MDN: String.prototype.toLocaleLowerCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase" },
            { t: "MDN: Intl.Collator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator" },
          ],
          pre: ["js/string methods", "js/Intl.Segmenter"],
          deep: {
            why: R`أي login أو بحث أو منع تكرار بيصغّر الحروف. ولو اليوزرز من لغات مختلفة، القاعدة العامة بتغلط: التركي بيطلّع كلمة بطول تاني، والألماني [[ß]] بيغيّر الطول، و [[toLocaleUpperCase()]] من غير لغة بيدّي نتيجة مختلفة على سيرفر تاني. ولازم تعرف إن العربي مش متأثر عشان متكتبش كود ملهوش لازمة.`,
            how: R`[[toUpperCase]] و [[toLowerCase]] بيستخدموا جداول Unicode العامة (اللي ممكن تحوّل حرف لأكتر من حرف، زي [[ß]] → [[SS]] و [[İ]] → [[i]] + [[U+0307]]). [[toLocaleUpperCase(locale)]] بيدوّر على أول لغة مدعومة في اللستة اللي بعتها، ولو ليها قواعد خاصة (التركي والأذري والليتواني) بيطبّقها، وغير كده بيرجع للقواعد العامة. ومن غير باراميتر بياخد لغة النظام. أما [[Intl.Collator]] فمبيغيّرش النص، بيقارن بقواعد ترتيب اللغة، و [[sensitivity]] بتحدد إيه اللي يفرق.`,
            when: R`[[toLowerCase()]] لإيميلات و usernames و tags إنجليزي وأي مفتاح تقني. [[toLocaleLowerCase(lang)]] لنص معروف لغته. [[Intl.Collator]] بـ [[sensitivity: "base"]] للبحث والترتيب في أسامي وكلام بشر، خصوصًا العربي (بيوحّد الهمزات) واللغات اللي فيها علامات.`,
            mistakes: R`[[toLocaleUpperCase()]] من غير لغة (النتيجة بتتغيّر حسب السيرفر). و [["tr"]] على نص إنجليزي ([[JAVASCRIPT]] بقت [[javascrıpt]]). وتفترض إن الطول ثابت بعد التكبير. و [[localeCompare]] بـ options جوه loop كبير. و [["tr_TR"]] بشرطة تحتانية ([[RangeError]]). و [[name.toLowerCase()]] و [[name]] ممكن تبقى [[null]].`
          }
        },
        {
          cmd: "padEnd و trimEnd",
          title: "تراص أعمدة في الترمنال حتى مع العربي والتشكيل، وتشيل المسافات والـ \\r من آخر السطور",
          desc: R`[[s.padEnd(n, fill)]] بتكمّل النص من آخره لحد ما طوله يبقى [[n]] (و [[padStart]] من أوله)، فتعمل أعمدة متراصة وأرقام بأصفار. والحشو ممكن يبقى أكتر من حرف ([["-="]]) وبيتقص على المقاس.
• الطول هنا [[length]] يعني خانات: «كَرَك» بتشكيلها ٥ خانات و ٣ حروف ظاهرة، فالعمود بيتزحلق. الحل إنك تحسب العرض بالحروف الظاهرة ([[Intl.Segmenter]]) وتكمّل بـ [[repeat]].
• [[s.trimEnd()]] بتشيل أي مسافة من **آخر** النص بس (و [[trimStart()]] من أوله): مسافات و tabs و [[\n]] و [[\r]] و NBSP و BOM. بس مش الـ ZWSP ([[U+200B]]) ولا التطويل.`,
          example: R`const items = [["شاي", 15], ["قهوة", 30], ["Mocha", 45]];
for (const [name, price] of items) {
  console.log(name.padEnd(8, ".") + String(price).padStart(5));
}
console.log("[" + "Tea".padEnd(8, "-=") + "]");
const line = "  أهلًا \t\n";
console.log("[" + line.trimEnd() + "]", "[" + line.trimStart() + "]");
console.log("x\u00a0".trimEnd().length, "x\u200b".trimEnd().length);`,
          try: R`اعمل قايمة أسعار من ٤ أصناف فيهم واحد بتشكيل ([["كَرَك"]]) وواحد بإيموجي، واطبعها بـ [[padEnd(10, ".")]]. شوف أنهي سطر اتزحلق، واطبع [[length]] لكل اسم جنب عدد حروفه الظاهرة. وبعدين اعمل [[const csv = "a  \r\nb\t\r\n";]] واطبع [[JSON.stringify(csv.split("\n"))]] قبل وبعد [[map(l => l.trimEnd())]].`,
          sol: R`سطر «كَرَك» بيطلع أقصر بخانتين (طولها 5 وحروفها الظاهرة 3، فـ [[padEnd]] زوّدت نقطتين ناقصين). والـ CSV: قبل [[["a  \r","b\t\r",""]]] وبعد [[["a","b",""]]]: [[trimEnd]] شالت المسافات والـ tab والـ [[\r]] اللي بتيجي من ملفات ويندوز. التصليح الكامل للأعمدة في التمرين الأخير.`,
          teach: R`## الفكرة

الترمنال مفيهوش جداول: كل اللي عندك سطور نص بخط ثابت العرض (monospace)، والأعمدة بتتراص لو كل خانة واخدة نفس العرض. [[padEnd]] و [[padStart]] بيكمّلوا النص لطول معيّن. والعكس: نص جاي من ملف أو فورم فيه مسافات زيادة في الآخر، و [[trimEnd]] بتشيلها. الدرس بيبني على «string methods» (اللي فيه [[padStart]] و [[trim]] الأساسيين) ويروح للعربي والإيموجي وملفات ويندوز. اتشغّل بـ Node 24.22 في Windows Terminal.

---

## ١. String.prototype.padEnd و padStart

~~~js menu.js
const items = [["شاي", 15], ["قهوة", 30], ["Mocha", 45]];
for (const [name, price] of items) {
  console.log(name.padEnd(8, ".") + String(price).padStart(5));
}
~~~

~~~text الناتج
شاي.....   15
قهوة....   30
Mocha...   45
~~~

- [[name.padEnd(8, ".")]]: «كمّل [[name]] من آخره بنقط لحد ما طوله 8». «شاي» ٣ فاتزوّد ٥ نقط، و «Mocha» ٥ فاتزوّد ٣.
- [[String(price).padStart(5)]]: الرقم اتحوّل نص الأول (الأرقام معندهاش [[padStart]])، واتكمّل من **أوله** بمسافات (الحشو الافتراضي مسافة) لطول 5. كده الآحاد تحت الآحاد، وده اللي بيخلي الأرقام تتقري.
- [[for (const [name, price] of items)]]: كل عنصر array من اتنين، والـ destructuring بيفكه (درس «array destructuring و spread»).

---

## ٢. الحشو والحالات الطرفية

| النداء | النتيجة | ليه |
|---|---|---|
| [["Tea".padEnd(8, "-=")]] | [["Tea-=-=-"]] | الحشو بيتكرر وبيتقص على المقاس |
| [["Tea".padEnd(2, ".")]] | [["Tea"]] | النص أطول من الطول المطلوب: زي ما هو، مبيتقصش |
| [["Tea".padEnd(8, "")]] | [["Tea"]] | حشو فاضي: زي ما هو |
| [["Tea".padEnd(-1)]] | [["Tea"]] | طول سالب: زي ما هو من غير error |
| [["".padEnd(3, "*")]] | [["***"]] | ينفع تعمل خط بيه |
| [["7".padStart(3, "0")]] | [["007"]] | رقم فاتورة أو ساعة |
| [["1234".padStart(3, "0")]] | [["1234"]] | الرقم الأطول مبيتقصش، خد بالك لو العمود ثابت |

---

## ٣. [[padEnd]] بيعد خانات: التشكيل والإيموجي بيزحلقوا العمود

~~~js menu2.js
const menu = [["شاي", 15], ["كَرَك", 25], ["قهوة 😀", 30], ["Tea", 10]];
for (const [n, p] of menu) console.log(n.padEnd(10, ".") + String(p).padStart(4));
~~~

~~~text الناتج
شاي.......  15
كَرَك.....  25
قهوة 😀...  30
Tea.......  10
~~~

في الترمنال سطر «كَرَك» بيطلع **أقصر بخانتين**، عشان:

~~~text الناتج: [الاسم، length، العرض الحقيقي]
[ 'شاي', 3, 3 ]
[ 'كَرَك', 5, 3 ]
[ 'قهوة 😀', 7, 7 ]
[ 'Tea', 3, 3 ]
~~~

- «كَرَك» ٣ حروف + فتحتين = ٥ خانات، بس التشكيل بيتحط **فوق** الحرف ومبياخدش خانة في الترمنال. فـ [[padEnd(10)]] حطت ٥ نقط على عرض حقيقي ٣ = ٨ بدل ١٠.
- «قهوة 😀»: الإيموجي خانتين في [[length]]، وصدفة واخد خانتين في الترمنال كمان (الإيموجي عريض)، فطلع مظبوط بالصدفة.

> لو بتقرا ده في المتصفح، الحروف العربي في خط الكود مش بنفس عرض الحروف الإنجليزي، فالأعمدة نفسها ممكن تبان مزحوحة هنا. الأرقام في الجدول اللي فوق هي اللي بتثبت المشكلة، والتراص الحقيقي بيبان في الترمنال.

---

## ٤. العرض الحقيقي: عدّ بالحروف الظاهرة

~~~js width.js
const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });
function width(str) {
  let w = 0;
  for (const { segment } of seg.segment(str)) w += /\p{Extended_Pictographic}/u.test(segment) ? 2 : 1;
  return w;
}
const padEndW = (str, n, fill = " ") => str + fill.repeat(Math.max(0, n - width(str)));
for (const [n, p] of menu) console.log(padEndW(n, 10, ".") + String(p).padStart(4));
~~~

~~~text الناتج
شاي.......  15
كَرَك.......  25
قهوة 😀...  30
Tea.......  10
~~~

- [[width]]: كل حرف ظاهر (grapheme، درس «Intl.Segmenter») خانة، والتشكيل جوه نفس الـ grapheme فمبيتعدّش، والإيموجي ([[\p{Extended_Pictographic}]]) خانتين.
- [[padEndW]]: بتحسب الناقص بنفسها وبتكمّل بـ [[repeat]]. و [[Math.max(0, ...)]] عشان [[repeat]] بالسالب بترمي [[RangeError]] لو النص أطول من العمود.
- «كَرَك» خدت ٧ نقط بدل ٥، وفي الترمنال العمود بقى مستقيم. (هنا في المتصفح السطر باين أطول لنفس سبب الملحوظة اللي فوق.)

ده تقريب كويس للعربي والإنجليزي والإيموجي. الحروف الصيني والياباني كمان عرضها خانتين، والحل الكامل مكتبة زي [[string-width]] اللي بتعرف جداول East Asian Width. مشروع «جدول طلبات متراص في الترمنال» بيبني على الدالة دي.

---

## ٥. String.prototype.trimEnd و trimStart

~~~js trim.js
const line = "  أهلًا \t\n";
console.log("[" + line.trimEnd() + "]", "[" + line.trimStart() + "]");
~~~

~~~text الناتج
[  أهلًا] [أهلًا
]
~~~

- [[trimEnd()]]: شالت المسافة والـ tab والسطر الجديد من الآخر، وسابت المسافتين اللي في الأول.
- [[trimStart()]]: العكس، فالـ tab والسطر الجديد فضلوا (عشان كده القوس اتطبع في سطر لوحده).
- [[trim()]] الاتنين مع بعض (درس «string methods»).

إمتى [[trimEnd]] بس؟ لما المسافات اللي في **أول** السطر ليها معنى: كود متزاح (indentation)، أو شعر، أو جدول نص. [[trimEnd]] بتنضّف المسافات الزيادة اللي في آخر السطور من غير ما تبوّظ الإزاحة.

---

## ٦. بتشيل إيه بالظبط؟

~~~js trim.js
console.log("x\u00a0".trimEnd().length, "x\u200b".trimEnd().length);
~~~

~~~text الناتج
1 2
~~~

الـ NBSP اتشال، والـ ZWSP فضل. جرّبنا كل حرف لوحده بعد [["x"]]:

| الحرف | [[trimEnd]] | ملحوظة |
|---|---|---|
| مسافة و [[\t]] و [[\n]] و [[\r]] | بتشيله | المسافات العادية وآخر السطر |
| NBSP [[U+00A0]] | بتشيله | بييجي من Word و HTML [[&nbsp;]] |
| BOM [[U+FEFF]] | بتشيله | بييجي في أول ملفات Excel، و [[trimStart]] بتشيله من الأول |
| مسافة صيني [[U+3000]] | بتشيله | أي مسافة في Unicode |
| ZWSP [[U+200B]] | **بتسيبه** | مش «مسافة» في Unicode، ده حرف تنسيق (Cf) |
| LRM [[U+200E]] | **بتسيبه** | علامة اتجاه، برضه Cf |
| التطويل [[U+0640]] | **بتسيبه** | ده حرف (Lm) مش مسافة |

يعني [[trim]] مش كفاية لنص منسوخ من واتساب أو PDF: الـ ZWSP و LRM و RLM محتاجين [[replace]] بنفسك (مشروع «textkit»).

---

## ٧. [[\r]] من ملفات ويندوز

~~~js crlf.js
const csv = "name,city   \r\nSara ,Cairo\t\r\nOmar,Giza  \r\n";
const rowsBad = csv.split("\n").map(l => l.split(","));
console.log(JSON.stringify(rowsBad));
const rows = csv.split("\n").map(l => l.trimEnd()).filter(l => l !== "").map(l => l.split(",").map(c => c.trim()));
console.log(JSON.stringify(rows));
console.log(rowsBad[2][1] === "Giza", rows[2][1] === "Giza");
~~~

~~~text الناتج
[["name","city   \r"],["Sara ","Cairo\t\r"],["Omar","Giza  \r"],[""]]
[["name","city"],["Sara","Cairo"],["Omar","Giza"]]
false true
~~~

ويندوز بيخلّص كل سطر بـ [[\r\n]]، و [[split("\n")]] بيسيب الـ [[\r]] في آخر كل سطر. ومش باين في الطباعة العادية، فـ [[city === "Giza"]] بترجّع [[false]] وانت مش فاهم ليه. [[trimEnd()]] على كل سطر بتشيله مع المسافات. (أو [[split(/\r?\n/)]] لو المسافات نفسها ليها معنى.)

---

## ٨. [[trimRight]] و [[trimLeft]]

أسماء قديمة لنفس الدوال: [[String.prototype.trimRight === String.prototype.trimEnd]] بـ [[true]]، واسم الدالة نفسها [["trimEnd"]]. موجودين عشان الكود القديم، واكتب [[trimEnd]] و [[trimStart]] لأنهم بيتكلموا عن «أول وآخر» النص مش «يمين وشمال»، وده بيفرق في العربي اللي أوله على اليمين.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| عمود نص بعرض ثابت (إنجليزي) | [[s.padEnd(n)]] |
| أرقام متراصة يمين | [[String(x).padStart(n)]] |
| أصفار قدام رقم | [[String(n).padStart(3, "0")]] |
| عمود فيه عربي بتشكيل أو إيموجي | احسب العرض بالـ graphemes وكمّل بـ [[repeat]] |
| تشيل المسافات من الآخر بس | [[trimEnd()]] |
| سطور ملف من ويندوز | [[split("\n").map(l => l.trimEnd())]] أو [[split(/\r?\n/)]] |
| ZWSP و LRM و RLM | [[replace]] بنفسك، [[trim]] مبتشيلهمش |`,
          lines: [
            R`٣ أصناف، كل واحد array فيه اسم وسعر. واحد إنجليزي عشان نتأكد إن العمود مستقيم للاتنين.`,
            R`[[for...of]] مع destructuring بيفك كل صنف لـ [[name]] و [[price]] في كل لفة.`,
            R`[[padEnd(8, ".")]] بيكمّل الاسم بنقط لطول 8، و [[padStart(5)]] بيكمّل السعر بمسافات من أوله، فالأسعار بتتراص يمين.`,
            R`قفلة الـ [[for]]: لحد هنا اتطبع سطر لكل صنف، والنقط ملت المسافة بين الاسم والسعر.`,
            R`الحشو [["-="]] اتكرر واتقص عند الطول 8، فبقى [[Tea-=-=-]]. الأقواس عشان المسافات والحشو يبانوا.`,
            R`نص فيه مسافتين في الأول، ومسافة و tab وسطر جديد في الآخر، زي سطر جاي من ملف.`,
            R`[[trimEnd]] شالت اللي في الآخر بس وسابت المسافتين، و [[trimStart]] شالت اللي في الأول بس وسابت الـ tab والسطر الجديد.`,
            R`NBSP اتشال فالطول بقى 1، والـ ZWSP (مسافة صفرية) فضل فالطول 2: [[trimEnd]] مبتشيلش حروف التنسيق المخفية.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [["7".padStart(3, "0")]] و [["1234".padStart(3, "0")]] و [["ab".padEnd(5, "xy")]] و [["ab".padEnd(5, "")]] و [["".padEnd(3, "*")]] (من قسم ٢ في الشرح).`, done: R`كتبت [["007"]] و [["1234"]] و [["abxyx"]] و [["ab"]] و [["***"]] قبل التشغيل.`, sol: R`~~~js predict.js
const show = s => "[" + s + "]";
console.log(show("7".padStart(3, "0")), show("1234".padStart(3, "0")), show("ab".padEnd(5, "xy")), show("ab".padEnd(5, "")), show("".padEnd(3, "*")));
~~~

~~~text الناتج
[007] [1234] [abxyx] [ab] [***]
~~~

- [["1234"]] أطول من 3 فرجع زي ما هو: [[padStart]] مبتقصش أبدًا.
- [["xy"]] اتكرر [[xyx]] واتقص على المقاس.
- الحشو الفاضي = مفيش حشو، من غير error.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[receipt(lines, width = 24)]] بترجّع إيصال كاشير كنص: سطر لكل صنف «الكمية × الاسم» على الشمال والإجمالي بقرشين على اليمين والنقط بينهم، وبعدين خط [[-]] بعرض الإيصال، وسطر «الإجمالي». جرّبها على لاتيه ٢ × ٤٥ وكرواسون ١ × ٣٠.٥ وميه ٣ × ٧ (من قسم ١ و ٢ في الشرح).`, done: R`كل السطور طولها 24 بالظبط، والأرقام آخرها تحت بعض، والإجمالي [[141.50]].`, sol: R`~~~js receipt.js
function receipt(lines, width = 24) {
  const out = [];
  let total = 0;
  for (const { item, qty, price } of lines) {
    const sum = qty * price;
    total += sum;
    const left = (qty + " × " + item);
    const right = sum.toFixed(2);
    out.push(left.padEnd(width - right.length, ".") + right);
  }
  out.push("".padEnd(width, "-"));
  out.push("الإجمالي".padEnd(width - total.toFixed(2).length) + total.toFixed(2));
  return out.join("\n");
}
console.log(receipt([{ item: "Latte", qty: 2, price: 45 }, { item: "Croissant", qty: 1, price: 30.5 }, { item: "Water", qty: 3, price: 7 }]));
~~~

~~~text الناتج
2 × Latte..........90.00
1 × Croissant......30.50
3 × Water..........21.00
------------------------
الإجمالي          141.50
~~~

- الفكرة: الشمال يتكمّل لـ [[width - right.length]]، فلما يتلزق فيه اليمين الطول الكلي [[width]] بالظبط، مهما كان طول الرقم.
- [[toFixed(2)]] قبل الحساب بتاع الطول: [[90]] بقت [["90.00"]]، فكل الأرقام نفس الشكل.
- [["".padEnd(width, "-")]] خط بالعرض كله.
- الأسماء إنجليزي هنا. لو هتبقى عربي بتشكيل استخدم [[padEndW]] من قسم ٤.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** CSV اتصدّر من Excel على ويندوز: [["name,city   \r\nSara ,Cairo\t\r\nOmar,Giza  \r\n"]]. قسّمه لصفوف وخانات نضيفة، واتأكد إن [[rows[2][1] === "Giza"]] (من قسم ٧ في الشرح).`, done: R`الناتج [[[["name","city"],["Sara","Cairo"],["Omar","Giza"]]]] من غير صف فاضي في الآخر، والمقارنة [[true]]، وعرفت ليه النسخة من غير [[trimEnd]] رجّعت [[false]].`, sol: R`~~~js csv.js
const csv = "name,city   \r\nSara ,Cairo\t\r\nOmar,Giza  \r\n";
const rowsBad = csv.split("\n").map(l => l.split(","));
console.log(JSON.stringify(rowsBad));
const rows = csv.split("\n").map(l => l.trimEnd()).filter(l => l !== "").map(l => l.split(",").map(c => c.trim()));
console.log(JSON.stringify(rows));
console.log(rowsBad[2][1] === "Giza", rows[2][1] === "Giza");
~~~

~~~text الناتج
[["name","city   \r"],["Sara ","Cairo\t\r"],["Omar","Giza  \r"],[""]]
[["name","city"],["Sara","Cairo"],["Omar","Giza"]]
false true
~~~

1. [[split("\n")]]: سطور، وكل سطر لسه في آخره [[\r]]، وآخر سطر فاضي (عشان الملف بيخلص بـ [[\n]]).
2. [[map(l => l.trimEnd())]]: شالت المسافات والـ tab والـ [[\r]] من آخر كل سطر.
3. [[filter(l => l !== "")]]: شالت السطر الفاضي.
4. [[split(",").map(c => c.trim())]]: خانات، وكل خانة متنضفة من الناحيتين ([["Sara "]] فيها مسافة قبل الفاصلة).

ده CSV بسيط. لو فيه خانات بين [["..."]] فيها فاصلة استخدم مكتبة (مش [[split]]).` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** المنيو [[[["شاي", 15], ["كَرَك", 25], ["قهوة 😀", 30], ["Tea", 10]]]] بـ [[n.padEnd(10, ".")]] سطر «كَرَك» بيطلع أقصر في الترمنال. اكتب [[width(str)]] و [[padEndW(str, n, fill)]] بالـ graphemes وصلّحه، واطبع [[length]] والعرض لكل اسم (من قسم ٣ و ٤ في الشرح).`, done: R`[[width("كَرَك")]] بـ 3 و [[length]] بتاعها 5، وسطرها بقى فيه ٧ نقط، وفي Windows Terminal كل الأسعار تحت بعض.`, sol: R`~~~js menu-fix.js
const menu = [["شاي", 15], ["كَرَك", 25], ["قهوة 😀", 30], ["Tea", 10]];
for (const [n, p] of menu) console.log(n.padEnd(10, ".") + String(p).padStart(4));
const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });
function width(str) {
  let w = 0;
  for (const { segment } of seg.segment(str)) w += /\p{Extended_Pictographic}/u.test(segment) ? 2 : 1;
  return w;
}
const padEndW = (str, n, fill = " ") => str + fill.repeat(Math.max(0, n - width(str)));
console.log("--");
for (const [n, p] of menu) console.log(padEndW(n, 10, ".") + String(p).padStart(4));
console.log(menu.map(([n]) => [n, n.length, width(n)]));
~~~

~~~text الناتج
شاي.......  15
كَرَك.....  25
قهوة 😀...  30
Tea.......  10
--
شاي.......  15
كَرَك.......  25
قهوة 😀...  30
Tea.......  10
[
  [ 'شاي', 3, 3 ],
  [ 'كَرَك', 5, 3 ],
  [ 'قهوة 😀', 7, 7 ],
  [ 'Tea', 3, 3 ]
]
~~~

- الجزء الأول (قبل [[--]]) هو الباج: «كَرَك» خدت ٥ نقط بس.
- [[width]] بتعدّ الـ graphemes، والتشكيل جوه الحرف بتاعه فمبيتعدّش. والإيموجي خانتين.
- [[Math.max(0, ...)]]: لو الاسم أطول من 10، [[repeat]] بالسالب كانت هترمي [[RangeError: Invalid count value: -2]] (مثلًا). كده بيرجع الاسم زي ما هو (ولو عايز تقصّه، مشروع «جدول طلبات متراص في الترمنال»).
- في المتصفح الجزء التاني ممكن يبان مزحوح لأن خط الكود مش بيدّي العربي نفس عرض الإنجليزي. الاختبار الحقيقي في الترمنال.` }
          ],
          flag: "script",
          ref: [
            { t: "MDN: String.prototype.padEnd()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd" },
            { t: "MDN: String.prototype.padStart()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart" },
            { t: "MDN: String.prototype.trimEnd()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd" },
            { t: "MDN: String.prototype.trimStart()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart" },
          ],
          pre: ["js/string methods", "js/Intl.Segmenter"],
          deep: {
            why: R`أي سكربت بيطبع تقرير أو جدول أو إيصال في الترمنال محتاج أعمدة متراصة، والأسامي العربي بتشكيل بتبوّظها لو اتعدت بـ [[length]]. وأي سطور جاية من ملف أو من Excel فيها مسافات و [[\r]] في الآخر بتبوّظ المقارنات في صمت. الاتنين بيتحلوا بسطر لو عرفت السبب.`,
            how: R`[[padEnd(n, fill)]] بتحسب [[n - length]]، ولو موجب بتكرر [[fill]] وتقصه على الطول ده وتلزقه في الآخر ([[padStart]] في الأول). والطول خانات UTF-16. [[trimEnd]] بتمشي من آخر النص لورا طول ما الحرف «مسافة» حسب تعريف ECMAScript: الـ WhiteSpace (مسافة و tab و NBSP و BOM وكل مسافات Unicode من نوع Zs) والـ LineTerminator ([[\n]] و [[\r]] و [[U+2028]] و [[U+2029]]). والـ ZWSP مش منهم لأن Unicode بيصنّفه Cf (format).`,
            when: R`[[padEnd]] و [[padStart]] للأعمدة في الترمنال وملفات النص الثابتة العرض، والأصفار قدام الأرقام. [[padEndW]] بالـ graphemes لأي عمود فيه عربي أو إيموجي. [[trimEnd]] لسطور ملف أو كود فيه إزاحة. [[trim]] لخانة فورم. و [[replace]] للحروف المخفية اللي [[trim]] مبتشوفهاش.`,
            mistakes: R`تفتكر إن [[padStart]] بتقص الرقم الأطول. و [[padEnd]] على اسم عربي بتشكيل. و [[repeat]] برقم سالب ([[RangeError]]). و [[split("\n")]] على ملف ويندوز من غير [[trimEnd]]. و [[trim]] وتفتكر إنها شالت الـ ZWSP. و [[x.padStart]] على رقم من غير [[String(x)]] ([[TypeError: x.padStart is not a function]]). وتحكم على التراص من المتصفح بدل الترمنال.`
          }
        },
        {
          cmd: "regex والعربي: Unicode properties",
          title: "تكتب regex بيفهم العربي والتشكيل والإيموجي: \\p{...} و flag u و v، والـ escapes جوه الـ regex",
          desc: R`وحدة الـ regex علّمتك [[\p{Script=Arabic}]] و [[\p{L}]] و [[\p{Nd}]]. هنا هنروح أبعد، للحاجات اللي بتبوّظ مع الكلام الحقيقي:
• **التشكيل مش من Script=Arabic:** الفتحة والشدة تصنيفهم [[Script=Inherited]]، فـ [[/\p{Script=Arabic}+/gu]] بتقطّع «مُحَمَّد» لأربع حروف. الصح [[\p{Script_Extensions=Arabic}]] (أو [[\p{scx=Arabic}]]) أو [[[\p{L}\p{M}]+]].
• [[\P{...}]] (P كبيرة) عكس [[\p{...}]]، و flag [[v]] بيسمح بتقاطع ([[[\p{Script=Arabic}&&\p{L}]]]) و [[\p{RGI_Emoji}]] للإيموجي كامل.
• جوه الـ regex فيه escapes للحروف زي النص ([[\u0627]] و [[\x41]] و [[\t]] و [[\/]])، بس [[\u{...}]] من غير flag [[u]] معناها حاجة تانية خالص، ومع [[u]] أي escape مش معروف بيبقى SyntaxError.`,
          example: R`const t = "قال: «اطلب ٣ أكواب»، مُحَمَّد مشي؟";
console.log(/\u0627/.test("ا"), /^.$/.test("😀"), /^.$/u.test("😀"));
console.log(t.match(/\p{Script=Arabic}+/gu));
console.log(t.match(/\p{Script_Extensions=Arabic}+/gu));
console.log(t.match(/[\p{L}\p{M}]+/gu));
console.log("a1٢".match(/\p{Nd}/gu), /^\p{Lu}/u.test("سارة"));
console.log("hi 👋🏽 ok".match(/\p{RGI_Emoji}/gv));`,
          try: R`اكتب [[const re = /\p{Script=Arabic}+/gu;]] وجرّبه بـ [[match]] على «أَهْلًا بيك» وعلى «أهلًا بيك». قارن عدد القطع. وبعدين بدّله بـ [[\p{scx=Arabic}]] وجرّب تاني. وآخر حاجة اطبع [[/\p{Script=Arabic}/u.test("\u064E")]] و [[/\p{Script=Inherited}/u.test("\u064E")]] ([[064E]] = الفتحة).`,
          sol: R`[[\p{Script=Arabic}+]] على «أَهْلًا بيك» بيطلّع قطع كتير ([[أ]] و [[ه]] و [[ل]] و [[ا]] و [[بيك]]) لأن كل حركة قطعت الكلمة، وعلى «أهلًا» من غير تشكيل بيطلّع [[[ 'أهل', 'ا', 'بيك' ]]] (التنوين برضه قطع). و [[\p{scx=Arabic}+]] بيطلّع الكلمتين كاملين. والسطرين الأخيرين [[false]] و [[true]]: الفتحة «موروثة» (Inherited) من الحرف اللي قبلها، مش Arabic.`,
          teach: R`## الفكرة

في وحدة الـ regex اتعلّمت [[\p{...}]] مع flag [[u]] و [[\p{Nd}]] للأرقام العربي و [[\p{Script=Arabic}]]. الدرس ده عن الحاجات اللي بتظهر لما تشغّل الـ regex على كلام حقيقي: تشكيل، وعلامات ترقيم عربي، وتطويل، وإيموجي بلون بشرة. وكمان الـ escapes جوه الـ regex نفسه، اللي بتتصرف غير النص في حالات. كله اتشغّل بـ Node 24.22 (Unicode 17)، وأهم سطر ([[\p{Script=Arabic}]] على «مُحَمَّد») اتجرّب في Chrome 157 وطلع نفس الناتج.

---

## ١. Character escape جوه الـ regex

~~~js escapes.js
console.log(/\u0627/.test("ا"), /\x41/.test("A"), /\t/.test("a\tb"), /\//.test("a/b"), /\./.test("a"), /\./.test("."));
~~~

~~~text الناتج
true true true true false true
~~~

نفس فكرة escapes النص (درس «escape sequences و String.raw»)، بس جوه [[/.../]]:

| الـ escape | بيطابق | ملحوظة |
|---|---|---|
| [[\u0627]] | الحرف [[U+0627]] (ا) | ٤ أرقام hex |
| [[\x41]] | [[A]] | رقمين hex |
| [[\t]] و [[\n]] و [[\r]] | tab وسطر جديد و CR | زي النص |
| [[\/]] | [[/]] | عشان [[/]] لوحدها بتقفل الـ regex |
| [[\.]] و [[\*]] و [[\(]] | الرمز نفسه | الـ escape بيلغي معناه الخاص (درس «regex: classes و quantifiers») |
| [[\0]] | الحرف null | [[/\0/.test("\0")]] بـ [[true]] |
| [[\cJ]] | Ctrl+J = سطر جديد | قديمة ونادرة: [[/\cJ/.test("\n")]] بـ [[true]] |
| [[\u{1F600}]] | 😀 | **مع flag [[u]] بس** (القسم الجاي) |

---

## ٢. من غير [[u]]: الـ regex بيشوف خانات

~~~js no-u.js
console.log(/\u{1F600}/u.test("😀"), /\u{1F600}/.test("😀"), /^\u{3}$/.test("uuu"));
console.log(/^.$/.test("😀"), /^.$/u.test("😀"), "😀".match(/./g).length, "😀".match(/./gu).length);
~~~

~~~text الناتج
true false true
false true 2 1
~~~

- من غير [[u]]، [[\u{1F600}]] مش escape: [[\u]] لوحدها بقت الحرف [[u]]، و [[{1F600}]] اتقرت كميّة! والدليل: [[/^\u{3}$/]] طابقت [["uuu"]] (حرف u تلات مرات). ومع [[u]] نفس الكتابة بتطابق الإيموجي.
- [[.]] من غير [[u]] = خانة واحدة، فالإيموجي نقطتين ([["😀".match(/./g).length]] بـ 2). مع [[u]] = code point كامل.

**القاعدة:** أي regex على كلام بشر اكتبه بـ [[u]] (أو [[v]]). من غيره الـ regex بيشتغل على الخانات زي [[split("")]].

---

## ٣. Unicode character class escape: [[\p{...}]] و [[\P{...}]]

[[\p{خاصية}]] = «أي حرف ليه الخاصية دي في Unicode»، و [[\P{خاصية}]] بـ P كبيرة = «أي حرف **ملوش** الخاصية». لازم [[u]] أو [[v]]. أهم الخصائص للعربي (كل صف اتجرّب حرف حرف):

| الحرف | [[Script=Arabic]] | [[scx=Arabic]] | [[\p{L}]] | [[\p{M}]] | [[\p{Nd}]] | [[\p{P}]] |
|---|---|---|---|---|---|---|
| [[ب]] [[U+0628]] | ✓ | ✓ | ✓ | | | |
| [[ً]] تنوين [[U+064B]] | **✗** | ✓ | | ✓ | | |
| [[ـ]] تطويل [[U+0640]] | **✗** | ✓ | ✓ | | | |
| [[،]] فاصلة [[U+060C]] | **✗** | ✓ | | | | ✓ |
| [[؟]] [[U+061F]] و [[؛]] [[U+061B]] | **✗** | ✓ | | | | ✓ |
| [[٣]] [[U+0663]] | ✓ | ✓ | | | ✓ | |
| [[٫]] فاصلة عشرية [[U+066B]] | ✓ | ✓ | | | | ✓ |
| [[ﻻ]] [[U+FEFB]] | ✓ | ✓ | ✓ | | | |
| [[3]] | | | | | ✓ | |

- **[[Script]]** (اختصاره [[sc]]): «الحرف ده من أنهي كتابة أساسًا». الفاصلة وعلامة الاستفهام العربي والتطويل [[Common]] (مشتركين بين كتابات)، والتشكيل [[Inherited]] (بياخد كتابة الحرف اللي قبله).
- **[[Script_Extensions]]** (اختصاره [[scx]]): «أنهي كتابات بتستخدم الحرف ده». فيها التشكيل والفاصلة والتطويل مع العربي.
- اسم الكتابة ينفع كامل أو مختصر: [[\p{Script=Arab}]] و [[\p{sc=Arabic}]] شغالين. بس [[\p{Arabic}]] لوحدها [[SyntaxError]] (القسم ٧).

---

## ٤. التشكيل بيقطّع [[\p{Script=Arabic}]]

~~~js script.js
const t = "قال: «اطلب ٣ أكواب»، مُحَمَّد مشي؟";
console.log(t.match(/\p{Script=Arabic}+/gu));
console.log(t.match(/\p{Script_Extensions=Arabic}+/gu));
console.log(t.match(/[\p{L}\p{M}]+/gu));
~~~

~~~text الناتج
[
  'قال', 'اطلب',
  '٣',   'أكواب',
  'م',   'ح',
  'م',   'د',
  'مشي'
]
[
  'قال',  'اطلب',
  '٣',    'أكواب',
  '،',    'مُحَمَّد',
  'مشي؟'
]
[ 'قال', 'اطلب', 'أكواب', 'مُحَمَّد', 'مشي' ]
~~~

1. [[\p{Script=Arabic}+]]: «مُحَمَّد» اتقطعت ٤ حروف، لأن كل حركة مش Arabic فوقفت التطابق. وده الـ regex اللي في درس «regex: classes و quantifiers» و «لعبة كتابة»: شغال على كلام من غير تشكيل بس. ونفس الكلام في «أهلًا»: التنوين بيقطعها لـ [['أهل', 'ا']].
2. [[\p{scx=Arabic}+]]: «مُحَمَّد» كاملة. بس لاحظ «،» لوحدها و «مشي؟» بعلامة الاستفهام: [[scx]] فيها الترقيم العربي كمان.
3. [[[\p{L}\p{M}]+]]: «حرف أو علامة»: الكلمات بس، كاملة بتشكيلها، من غير ترقيم ولا أرقام. ده الأنسب لاستخراج كلمات (عربي أو إنجليزي).

---

## ٥. الأرقام والحروف الكبيرة

~~~js digits.js
console.log("a1٢".match(/\p{Nd}/gu), /^\p{Lu}/u.test("سارة"));
~~~

~~~text الناتج
[ '1', '٢' ] false
~~~

- [[\p{Nd}]] (decimal digit) بيطابق [[1]] و [[٢]] و [[۳]] الفارسي، أما [[\d]] فـ 0-9 بس حتى مع [[u]] ([["a1٢۳".match(/\d/g)]] بـ [[[ '1' ]]]). وده فخ حقيقي: ترقيم [[٢-]] في أول سطر مش هيتشال بـ [[\d]].
- [[\p{Lu}]] (Letter, uppercase) على العربي [[false]]: العربي تصنيفه [[\p{Lo}]] (Letter, other). يعني «لازم حرف كبير» في الباسورد مستحيلة على كيبورد عربي، فاكتب الشرط إنجليزي صراحة أو اقبل [[\p{Lo}]].

---

## ٦. الإيموجي: [[\p{Extended_Pictographic}]] ولا [[\p{RGI_Emoji}]]

~~~js emoji.js
console.log("hi 👋🏽 ok".match(/\p{RGI_Emoji}/gv));
~~~

~~~text الناتج
[ '👋🏽' ]
~~~

- [[\p{RGI_Emoji}]] «خاصية نصوص» (property of strings): بتطابق إيموجي كامل حتى لو أكتر من code point (الإيد واللون، العيلة بحروف الـ ZWJ، الأعلام). محتاجة flag **[[v]]** (أحدث من [[u]]): مع [[u]] بترمي [[SyntaxError: Invalid regular expression: /\p{RGI_Emoji}/u: Invalid property name]].
- [[\p{Extended_Pictographic}]] بـ [[u]] بتطابق code point واحد: على نص فيه الإيد بلون البشرة وإيموجي العيلة (مكتوبة في الكود [[\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467}]]) طلّعت [[[ '👋', '👨', '👩', '👧' ]]]: الإيد من غير لونها والعيلة اتفرتكت. و [[RGI_Emoji]] على نفس النص طلّعت قطعتين كاملين.

والـ [[v]] كمان بيسمح بعمليات على الـ classes: [[[\p{Script=Arabic}&&\p{L}]]] (تقاطع: حرف عربي **و** حرف، فالأرقام العربي برّه) و [[[\p{L}--\p{Ll}]]] (طرح، في درس «groups و flags»). اتجرّب في التمرين التاني.

---

## ٧. escapes غلط مع [[u]] بترمي

~~~text الناتج: new RegExp(src, "u")
\a              SyntaxError: Invalid regular expression: /\a/u: Invalid escape
\-              SyntaxError: Invalid regular expression: /\-/u: Invalid escape
\p{Arabic}      SyntaxError: Invalid regular expression: /\p{Arabic}/u: Invalid property name
\p{Script=Arab} ok
[\-]            ok
~~~

- من غير [[u]]، [[/\a/]] بتطابق [[a]] في صمت (زي النص). مع [[u]] أي escape مش معروف **SyntaxError**، وده كويس: بيمسك الغلط بدري.
- [[\-]] برّه الأقواس المربعة مرفوضة مع [[u]]، وجواها ([[[\-]]]) مسموحة.
- [[\p{Arabic}]]: اسم الكتابة لازم بعد [[Script=]] أو [[scx=]]. اللي بيتكتب لوحده هو الـ General Category بس ([[\p{L}]] و [[\p{Lu}]] و [[\p{Nd}]]...).
- ومن غير [[u]] خالص: [[/\p{L}/.test("p{L}")]] بـ [[true]]! الـ [[\p]] بقت حرف [[p]] عادي.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| أي regex على كلام بشر | flag [[u]] (أو [[v]]) دايمًا |
| كلمة عربي بتشكيلها | [[\p{scx=Arabic}+]] أو [[[\p{L}\p{M}]+]]، مش [[\p{Script=Arabic}+]] |
| حروف عربي بس من غير أرقام وترقيم | [[[\p{Script=Arabic}&&\p{L}]]] بـ [[v]] |
| أي رقم في أي لغة | [[\p{Nd}]] مش [[\d]] |
| أي حاجة مش حرف | [[\P{L}]] |
| الإيموجي كامل | [[\p{RGI_Emoji}]] بـ [[v]] |
| حرف بكوده جوه regex | [[\u0627]]، أو [[\u{1F600}]] مع [[u]] |`,
          lines: [
            R`جملة فيها كل المشاكل: علامات تنصيص عربي، ورقم عربي، وفاصلة عربي، واسم بتشكيل، وعلامة استفهام عربي.`,
            R`[[\u0627]] escape جوه الـ regex بيطابق الألف. و [[.]] من غير [[u]] خانة واحدة فمبتطابقش الإيموجي، ومع [[u]] بتطابقه.`,
            R`[[\p{Script=Arabic}+]] قطّعت «مُحَمَّد» لأربع حروف لأن التشكيل [[Script=Inherited]] مش Arabic.`,
            R`[[\p{Script_Extensions=Arabic}+]] جابت «مُحَمَّد» كاملة، بس جابت الفاصلة العربي وعلامة الاستفهام كمان لأنهم «بيستخدموا مع العربي».`,
            R`[[[\p{L}\p{M}]+]] «حرف أو علامة»: كلمات كاملة بتشكيلها من غير ترقيم ولا أرقام.`,
            R`[[\p{Nd}]] بتطابق الرقم الإنجليزي والعربي، و [[\p{Lu}]] (حرف كبير) على العربي [[false]] لأنه ملوش كبير وصغير.`,
            R`[[\p{RGI_Emoji}]] مع flag [[v]] بتطابق الإيد بلون البشرة كإيموجي واحد.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[/^\u{2}$/.test("uu")]] و [[/^\u{2}$/u.test("uu")]] و [[/\p{L}/.test("p{L}")]] و [[/\p{L}/u.test("ب")]] و [[/^\P{L}+$/u.test("٣،")]] (من قسم ٢ و ٣ و ٧ في الشرح).`, done: R`كتبت [[true]] و [[false]] و [[true]] و [[true]] و [[true]] قبل التشغيل، وتقدر تشرح أول تلاتة.`, sol: R`~~~js predict.js
console.log(/^\u{2}$/.test("uu"), /^\u{2}$/u.test("uu"), /\p{L}/.test("p{L}"), /\p{L}/u.test("ب"), /^\P{L}+$/u.test("٣،"));
~~~

~~~text الناتج
true false true true true
~~~

- من غير [[u]]: [[\u{2}]] = حرف [[u]] مرتين، فطابقت [["uu"]]. ومع [[u]]: الحرف رقم 2 (حرف تحكم)، فلأ.
- من غير [[u]]: [[\p]] = حرف [[p]]، و [[{L}]] نص عادي، فطابقت النص [["p{L}"]] نفسه!
- [[\P{L}]]: «مش حرف»، والرقم العربي والفاصلة العربي الاتنين مش حروف.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[isArabicName(s)]] بترجّع [[true]] لو الاسم حروف عربي (بتشكيل أو من غير) ومسافات بس، ومن ٢ لـ ٤٠ حرف ظاهر بعد ما المسافات الزيادة تتشال. مش مقبول: أرقام (إنجليزي أو عربي)، وعلامات، وتطويل، ولاتيني، وأي حاجة مش نص. حلّها في المربع اللي تحت (من قسم ٣ و ٦ في الشرح).`, done: R`كل الاختبارات عدّت: «مُحَمَّد علي» و «  عُمر   خالد » [[true]]، و «سارة٣» و «سارة2» و «Sara» و «س» و «سارة ـــ» و [[null]] [[false]].`, sol: R`أول نسخة كتبتها كانت بـ [[\p{Script=Arabic}]]:

~~~js arabic-name.js
const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });
function isArabicNameV1(s) {
  if (typeof s !== "string") return false;
  const name = s.normalize("NFC").trim().replace(/\s+/g, " ");
  const len = [...seg.segment(name)].length;
  return len >= 2 && len <= 40 && /^[\p{Script=Arabic}\p{Mn} ]+$/u.test(name);
}
function isArabicName(s) {
  if (typeof s !== "string") return false;
  const name = s.normalize("NFC").trim().replace(/\s+/g, " ");
  const len = [...seg.segment(name)].length;
  return len >= 2 && len <= 40 && /^[[\p{Script=Arabic}&&\p{L}]\p{Mn} ]+$/v.test(name);
}
for (const n of ["سارة", "مُحَمَّد علي", "  عُمر   خالد ", "Sara", "سارة2", "سارة٣", "س", "سارة!", "", "سارة ـــ", null]) {
  console.log(JSON.stringify(n), isArabicNameV1(n), isArabicName(n));
}
~~~

~~~text الناتج (العمود الأول النسخة الأولى، والتاني المصلّحة)
"سارة" true true
"مُحَمَّد علي" true true
"  عُمر   خالد " true true
"Sara" false false
"سارة2" false false
"سارة٣" true false
"س" false false
"سارة!" false false
"" false false
"سارة ـــ" false false
null false false
~~~

**الغلطة اللي التشغيل مسكها:** «سارة٣» عدّت في النسخة الأولى، لأن الأرقام العربي [[Script=Arabic]] (الجدول في قسم ٣). التصليح بـ flag [[v]]: [[[\p{Script=Arabic}&&\p{L}]]] = «عربي **و** حرف»، فالأرقام والترقيم برّه. و [[\p{Mn}]] (Mark, nonspacing) عشان التشكيل (اللي هو مش Script=Arabic أصلًا، فلازم يتضاف لوحده).

- [[normalize("NFC")]] الأول عشان الهمزة المفكوكة تتعد حرف واحد.
- [[replace(/\s+/g, " ")]] و [[trim]] عشان «  عُمر   خالد » تتقبل (اليوزر بيكتب مسافات زيادة)، والطول يتحسب صح.
- الطول بالـ graphemes: «مُحَمَّد» ٤ مش ٨.
- التطويل [[Common]] مش [[Arabic]] فاترفض، وده قرار: لو عايز تقبله شيله بـ [[replace]] قبل الفحص.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[highlight = s => s.replace(/\p{Script=Arabic}+/gu, w => "[" + w + "]")]] بتعلّم الكلام العربي في نص. على [["قالت: أَهْلًا بيكم في Cairo"]] الكلمة اللي بتشكيل اتقطّعت. صلّحها بطريقتين (من قسم ٤ في الشرح).`, done: R`النسخة القديمة بتطلّع [[[أ]َ[ه]ْ[ل]ً[ا]]]، والطريقتين المصلّحين بيطلّعوا [[[أَهْلًا]]] كاملة، و [[Cairo]] من غير أقواس.`, sol: R`~~~js highlight.js
const highlightBad = s => s.replace(/\p{Script=Arabic}+/gu, w => "[" + w + "]");
const highlight = s => s.replace(/\p{scx=Arabic}+/gu, w => "[" + w + "]");
const quote = "قالت: أَهْلًا بيكم في Cairo";
console.log(highlightBad(quote));
console.log(highlight(quote));
const highlight2 = s => s.replace(/[\p{L}\p{M}]+/gu, w => /\p{Script=Arabic}/u.test(w) ? "[" + w + "]" : w);
console.log(highlight2(quote));
~~~

~~~text الناتج
[قالت]: [أ]َ[ه]ْ[ل]ً[ا] [بيكم] [في] Cairo
[قالت]: [أَهْلًا] [بيكم] [في] Cairo
[قالت]: [أَهْلًا] [بيكم] [في] Cairo
~~~

- القديمة: كل حركة ([[َ]] و [[ْ]] و [[ً]]) وقفت التطابق، فكل حرف بقى كلمة لوحده والحركات برّه الأقواس.
- [[\p{scx=Arabic}]]: التشكيل جوه. بس خد بالك إنها هتاخد «،» العربي كمان لو في النص.
- [[[\p{L}\p{M}]+]] يطلّع أي كلمة، وبعدين نسأل «فيها حرف عربي؟». أطول شوية بس أدق: الترقيم برّه، وكلمة مخلوطة زي «JSـ» بتتعامل صح.` },
            { lvl: 'تحدي', t: R`**ابني:** [[detectLang(text)]] بتعد الحروف العربي ([[\p{Script=Arabic}]]) واللاتيني ([[\p{Script=Latin}]]) وترجّع [[{ lang, ar, la }]]: [["ar"]] لو العربي ٨٠٪ أو أكتر من الحروف، و [["en"]] لو ٢٠٪ أو أقل، و [["mixed"]] غير كده، و [["unknown"]] لو مفيش حروف خالص. جرّبها على ٥ جمل منهم واحدة أرقام وإيموجي بس (من قسم ٣ في الشرح).`, done: R`«أهلًا بيك في الكورس» [["ar"]] 100، و «Hello and welcome» [["en"]]، و «الكورس ده عن JavaScript و Node» [["mixed"]] بنسبة 44 و 56، و [["1234 😀 !!"]] [["unknown"]] من غير قسمة على صفر.`, sol: R`~~~js detect-lang.js
function detectLang(text) {
  const ar = (text.match(/\p{Script=Arabic}/gu) || []).length;
  const la = (text.match(/\p{Script=Latin}/gu) || []).length;
  const total = ar + la;
  if (total === 0) return { lang: "unknown", ar: 0, la: 0 };
  const share = ar / total;
  const lang = share >= 0.8 ? "ar" : share <= 0.2 ? "en" : "mixed";
  return { lang, ar: Math.round(share * 100), la: Math.round((1 - share) * 100) };
}
for (const s of ["أهلًا بيك في الكورس", "Hello and welcome", "الكورس ده عن JavaScript و Node", "1234 😀 !!", "مُحَمَّد"]) console.log(JSON.stringify(s), detectLang(s));
~~~

~~~text الناتج
"أهلًا بيك في الكورس" { lang: 'ar', ar: 100, la: 0 }
"Hello and welcome" { lang: 'en', ar: 0, la: 100 }
"الكورس ده عن JavaScript و Node" { lang: 'mixed', ar: 44, la: 56 }
"1234 😀 !!" { lang: 'unknown', ar: 0, la: 0 }
"مُحَمَّد" { lang: 'ar', ar: 100, la: 0 }
~~~

- [[match(.../gu)]] بترجّع كل التطابقات أو [[null]]، و [[|| []]] عشان [[.length]] متقعش.
- هنا [[Script=Arabic]] **صح**: احنا بنعد حروف مش بنطلّع كلمات، والتشكيل مش محسوب (وده أحسن، عشان التشكيل ميكبّرش نسبة العربي). والأرقام العربي اتحسبت عربي، وده مقبول هنا.
- [[if (total === 0)]] قبل القسمة: من غيره [[0 / 0]] بـ [[NaN]] والـ lang كانت هتطلع [["mixed"]].
- استخدام حقيقي: تختار [[dir="rtl"]] أو [[dir="ltr"]] لتعليق جاي من يوزر، أو اللغة اللي هتبعتها لـ [[Intl.Segmenter]].` }
          ],
          check: {
            lang: "js",
            starter: R`function isArabicName(s) {
  return /^[\p{Script=Arabic} ]+$/u.test(s);
}`,
            tests: R`test("اسم عادي", () => expect(isArabicName("سارة")).toBe(true));
test("اسم بتشكيل ومسافة", () => expect(isArabicName("مُحَمَّد علي")).toBe(true));
test("مسافات زيادة بتتقبل", () => expect(isArabicName("  عُمر   خالد ")).toBe(true));
test("أرقام عربي وإنجليزي مرفوضة", () => { expect(isArabicName("سارة٣")).toBe(false); expect(isArabicName("سارة2")).toBe(false); });
test("لاتيني وعلامات وتطويل مرفوضين", () => { expect(isArabicName("Sara")).toBe(false); expect(isArabicName("سارة!")).toBe(false); expect(isArabicName("سارة ـــ")).toBe(false); });
test("حرف واحد، أو فاضي، أو مش نص", () => { expect(isArabicName("س")).toBe(false); expect(isArabicName("")).toBe(false); expect(isArabicName(null)).toBe(false); });
test("الطول بالحروف الظاهرة: ٤٠ حرف بتشكيل مقبولين", () => expect(isArabicName("مَ".repeat(40))).toBe(true));`,
            solution: R`const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });
function isArabicName(s) {
  if (typeof s !== "string") return false;
  const name = s.normalize("NFC").trim().replace(/\s+/g, " ");
  const len = [...seg.segment(name)].length;
  return len >= 2 && len <= 40 && /^[[\p{Script=Arabic}&&\p{L}]\p{Mn} ]+$/v.test(name);
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Character escape", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape" },
            { t: "MDN: Unicode character class escape", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape" },
            { t: "MDN: RegExp.prototype.unicodeSets (flag v)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets" },
            { t: "Unicode: UAX #24 Script Property (Script و Script_Extensions)", url: "https://www.unicode.org/reports/tr24/" },
          ],
          pre: ["js/regex: classes و quantifiers", "js/groups و flags", "js/normalize و التشكيل"],
          deep: {
            why: R`أي validation لاسم، أو استخراج كلمات، أو تعليم كلمات في بحث، أو اكتشاف لغة، بيشتغل على كلام حقيقي فيه تشكيل وترقيم عربي وإيموجي. و [[\p{Script=Arabic}]] اللي بيتكتب في كل مكان بيقطّع أي كلمة فيها حركة، ومحدش بيلاحظ لحد ما يوزر يكتب اسمه بالتشكيل.`,
            how: R`كل حرف في Unicode ليه خصائص: General Category (حرف [[L]] وأنواعه [[Lu]] و [[Ll]] و [[Lo]]، علامة [[M]]، رقم [[N]]، ترقيم [[P]]، تنسيق [[Cf]]...)، و Script (كتابة واحدة أساسية، أو [[Common]] للمشترك، أو [[Inherited]] للعلامات اللي بتاخد كتابة اللي قبلها)، و Script_Extensions (كل الكتابات اللي بتستخدمه). [[\p{...}]] بيسأل عن الخاصية دي. وflag [[u]] بيخلي الـ regex يمشي على code points ويفهم [[\p]] و [[\u{}]] ويرفض الـ escapes الغلط، و [[v]] بيزوّد التقاطع والطرح وخصائص النصوص زي [[RGI_Emoji]].`,
            when: R`[[u]] على أي regex لنص بشر. [[\p{scx=Arabic}]] أو [[[\p{L}\p{M}]]] لكلمات بتشكيل. [[\p{Script=Arabic}]] لعدّ الحروف (من غير التشكيل). [[\p{Nd}]] للأرقام. [[v]] مع [[&&]] لما محتاج «عربي وحرف». و [[\p{RGI_Emoji}]] لعدّ أو شيل الإيموجي.`,
            mistakes: R`[[\p{Script=Arabic}+]] على كلام بتشكيل. وتنسى [[u]] ([[\p]] بقت [[p]]، و [[\u{...}]] بقت كمية). و [[\p{Arabic}]] من غير [[Script=]]. و [[\d]] للأرقام العربي. و [[\p{Lu}]] كشرط «حرف كبير» على يوزر عربي. و [[\p{RGI_Emoji}]] بـ [[u]] بدل [[v]]. وتفتكر إن [[Script=Arabic]] حروف بس: فيها الأرقام العربي.`
          }
        },
      ]
    }
]);
