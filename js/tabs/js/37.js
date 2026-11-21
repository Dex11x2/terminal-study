// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "توصل للإجابة بنفسك في JavaScript",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تستخدم الـ console كأداة تحقيق، مش [[console.log]] وبس.`,
        R`تسأل أي كائن عن نفسه: نوعه، وصفاته، وجه منين.`,
        R`تقرا رسالة الخطأ وتعرف منها السطر والسبب.`,
        R`تربط الخطأ بسببه بـ [[cause]] بدل ما تضيّعه.`,
      ],
      use: {
        prog: R`الـ console فيه ١٥ دالة، وأغلب الناس بتستخدم واحدة. والباقي بيختصر وقت التشخيص لنص.`,
        work: R`رسالة الخطأ في JavaScript بتقولك **اسم المتغير** اللي كان [[undefined]]. وده نص الإجابة.`,
        cs: R`الـ prototype chain هو إزاي JavaScript بيلاقي الصفات. وفهمه بيخلي [[undefined is not a function]] تبقى سؤال ليه إجابة.`,
      },
      lab: R`mkdir -p ~/lab/jslab && cd ~/lab/jslab && npm init -y`,
      projects: [
        { lvl: 'صغير', t: R`جدول بدل عشرين سطر`, what: R`خد أي مصفوفة كائنات في مشروعك و [[console.table]] عليها. وبعدين [[console.table(rows, ['اسم','سعر'])]] بالأعمدة اللي تهمك. من درس «الـ console أكبر من log».`, done: R`الجدول بيطلع بعمود [[(index)]] وبالأعمدة اللي اخترتها بس، وكل كائن في صف، ومسحت كل [[console.log]] اللي كانت بتطبع نفس الداتا سطر سطر.`, sol: R`## الشكل النهائي

~~~text الناتج (node after.js، Node 24)
┌─────────┬────────┬─────────────┬──────┬───────┬──────────┐
│ (index) │ id     │ اسم         │ سعر  │ مخزون │ قسم      │
├─────────┼────────┼─────────────┼──────┼───────┼──────────┤
│ 0       │ 'P-01' │ 'سماعة'     │ 650  │ 12    │ 'صوت'    │
│ 1       │ 'P-02' │ 'كيبورد'    │ 900  │ 0     │ 'ملحقات' │
│ 2       │ 'P-03' │ 'ماوس'      │ 250  │ 40    │ 'ملحقات' │
│ 3       │ 'P-04' │ 'شاشة 24'   │ 4200 │ 3     │ 'شاشات'  │
│ 4       │ 'P-05' │ 'كابل HDMI' │ 120  │ 75    │          │
└─────────┴────────┴─────────────┴──────┴───────┴──────────┘
┌─────────┬─────────────┬──────┐
│ (index) │ اسم         │ سعر  │
├─────────┼─────────────┼──────┤
│ 0       │ 'سماعة'     │ 650  │
│ 1       │ 'كيبورد'    │ 900  │
│ 2       │ 'ماوس'      │ 250  │
│ 3       │ 'شاشة 24'   │ 4200 │
│ 4       │ 'كابل HDMI' │ 120  │
└─────────┴─────────────┴──────┘
┌─────────┬─────────────┬───────┐
│ (index) │ اسم         │ مخزون │
├─────────┼─────────────┼───────┤
│ P-01    │ 'سماعة'     │ 12    │
│ P-02    │ 'كيبورد'    │ 0     │
│ P-03    │ 'ماوس'      │ 40    │
│ P-04    │ 'شاشة 24'   │ 3     │
│ P-05    │ 'كابل HDMI' │ 75    │
└─────────┴─────────────┴───────┘
~~~

(الأعمدة العربي ممكن تبان مش متظبطة في بعض الترمنالات لأن عرض الحروف العربي بيتحسب غلط؛ في Console المتصفح الجدول بيتعرض جدول HTML ومظبوط.)

## هتشوف إيه

٣ جداول لنفس الداتا: الأول كل الأعمدة، والتاني الاسم والسعر بس، والتالت عمود [[(index)]] فيه الـ id بدل 0 و 1 و 2. وده بدل خمس سطور [[console.log]] مش واضح فيها أنهي رقم السعر وأنهي المخزون.

## الكود

~~~json products.json
[
  { "id": "P-01", "اسم": "سماعة", "سعر": 650, "مخزون": 12, "قسم": "صوت" },
  { "id": "P-02", "اسم": "كيبورد", "سعر": 900, "مخزون": 0, "قسم": "ملحقات" },
  { "id": "P-03", "اسم": "ماوس", "سعر": 250, "مخزون": 40, "قسم": "ملحقات" },
  { "id": "P-04", "اسم": "شاشة 24", "سعر": 4200, "مخزون": 3, "قسم": "شاشات" },
  { "id": "P-05", "اسم": "كابل HDMI", "سعر": 120, "مخزون": 75 }
]
~~~

**قبل** (اللي كان في المشروع):

~~~js before.js
const products = require("./products.json");
for (const p of products) {
  console.log(p.id, p.اسم, p.سعر, p.مخزون, p.قسم);
}
~~~

~~~text الناتج (node before.js)
P-01 سماعة 650 12 صوت
P-02 كيبورد 900 0 ملحقات
P-03 ماوس 250 40 ملحقات
P-04 شاشة 24 4200 3 شاشات
P-05 كابل HDMI 120 75 undefined
~~~

**بعد:**

~~~js after.js
const products = require("./products.json");

console.table(products);                 // كل الأعمدة
console.table(products, ["اسم", "سعر"]); // الأعمدة اللي تهمني بس

// (index) مفيد أكتر لو بقى الـ id: حوّل الـ array لـ object مفاتيحه الـ ids
console.table(Object.fromEntries(products.map((p) => [p.id, p])), ["اسم", "مخزون"]);
~~~

## كل حتة بتعمل إيه

- **[[console.table(products)]]:** صف لكل object، وعمود لكل مفتاح ظهر في **أي** object، و [[(index)]] هو الـ index في الـ array. الخانة الفاضية تحت [[قسم]] في آخر صف معناها إن الـ object ده ملوش المفتاح أصلًا، أوضح بكتير من [[undefined]] اللي في آخر سطر من [[before.js]].
- **[[console.table(products, ["اسم", "سعر"])]]:** التاني array بأسامي الأعمدة اللي تتعرض بس، بنفس ترتيبها.
- **[[Object.fromEntries(products.map((p) => [p.id, p]))]]:** بيحوّل الـ array لـ object مفاتيحه الـ ids. [[console.table]] على object بيستخدم المفاتيح كـ [[(index)]]، فتعرف الصف من الـ id على طول.
- **النصوص بعلامات تنصيص** ([['P-01']]) والأرقام من غيرها: الجدول بيوريك النوع، فلو سعر جه [['650']] نص هتلاحظه.

**التأكد إن الـ log القديم اتشال:** [[grep -c "console.log" before.js after.js]] طلع [[before.js:1]] و [[after.js:0]]. في مشروع أكبر: [[grep -rn "console.log" src/]] (أو Ctrl+Shift+F في VS Code).

**الغلطة الشائعة:** [[console.table]] على داتا متداخلة: الخانة بتطلع object مضغوط، ولو أعمق من مستوى بيبقى [[[Object]]] (جرّبت [[console.table([{ a: { w: { x: 1 } } }])]] في Node طلعت الخانة [[{ w: [Object] }]]). فكّ اللي محتاجه الأول بـ [[map]] لـ object مسطّح، زي [[products.map((p) => ({ اسم: p.اسم, عرض: p.dims.w }))]].` },
        { lvl: 'صغير', t: R`قيس بدل ما تخمّن`, what: R`[[console.time]] و [[console.timeEnd]] حوالين الحتة اللي بتشك إنها بطيئة. وبعدين [[console.timeLog]] في النص عشان تعرف الوقت راح فين بالظبط.`, done: R`عندك ٣ أرقام على الأقل لنفس العداد (اتنين [[timeLog]] و [[timeEnd]])، وعرفت أنهي خطوة واخدة أكبر وقت وكاتبها في تعليق برقمها.`, sol: R`## الشكل النهائي

~~~text الناتج (node report.js، Node 24 على Windows)
تقرير: 264.795ms ١. بناء النص
تقرير: 618.097ms ٢. split و map
تقرير: 671.528ms ٣. التجميع
تقرير: 760.021ms
4 مدن، وأعلى مبلغ 996.5
~~~

(تشغيلة تانية: 256 و 610 و 671 و 773. الأرقام بتختلف من جهاز للتاني، والنسب بينهم هي المهمة.)

## هتشوف إيه

عداد واحد اسمه [[تقرير]] وأربع أرقام: تلاتة من [[timeLog]] بعد كل خطوة (ومعاهم اسم الخطوة)، والأخير من [[timeEnd]]. **كل رقم هو الوقت من [[console.time]] لحد السطر ده**، مش وقت الخطوة لوحدها.

## الكود

~~~js report.js
// تقرير مبيعات: إيه اللي بطيء فيه؟ بدل التخمين، عداد واحد و timeLog بعد كل خطوة
console.time("تقرير");

// ١. توليد CSV فيه 300 ألف سطر (كأنه ملف اتقرا)
const cities = ["القاهرة", "الإسكندرية", "الجيزة", "المنصورة"];
let csv = "id,city,amount\n";
for (let i = 0; i < 300_000; i++) csv += $__bt$__{i},$__{cities[i % 4]},$__{(i % 997) + 0.5}\n$__bt;
console.timeLog("تقرير", "١. بناء النص");

// ٢. التفكيك لـ objects
const rows = csv.trim().split("\n").slice(1).map((line) => {
  const [id, city, amount] = line.split(",");
  return { id: Number(id), city, amount: Number(amount) };
});
console.timeLog("تقرير", "٢. split و map");

// ٣. الإجمالي لكل مدينة
const totals = {};
for (const r of rows) totals[r.city] = (totals[r.city] ?? 0) + r.amount;
console.timeLog("تقرير", "٣. التجميع");

// ٤. ترتيب كل الصفوف بالمبلغ
rows.sort((a, b) => b.amount - a.amount);
console.timeEnd("تقرير");

console.log(Object.keys(totals).length, "مدن، وأعلى مبلغ", rows[0].amount);

// القياس (Node 24): ١ = 265ms، ٢ = 353ms، ٣ = 53ms، ٤ = 88ms من 760ms
// الخطوة ٢ (split و map) هي الأبطأ: تقريبًا نص الوقت
~~~

## القراية: الوقت راح فين

الأرقام تراكمية، فوقت كل خطوة = الرقم ناقص اللي قبله:

| الخطوة | الرقم المتراكم | وقت الخطوة |
|---|---|---|
| ١. بناء النص | 265ms | 265ms |
| ٢. split و map | 618ms | **353ms** (الأكبر) |
| ٣. التجميع | 672ms | 53ms |
| ٤. الترتيب | 760ms | 88ms |

ومكتوب في آخر الكود كتعليق بالأرقام: الخطوة ٢ (split و map على 300 ألف سطر) = 353ms من 760، تقريبًا نص الوقت. يعني لو هتحسّن حاجة، ابدأ بالتفكيك: مثلًا تقرا السطور وتجمّع في نفس اللفة من غير ما تعمل 300 ألف object، أو تستخدم stream بدل ما تعمل النص كله الأول. الترتيب اللي كنت فاكره هو البطيء ٨٨ms بس.

## كل حتة

- **[[console.time(label)]]:** بيبدأ عداد بالاسم ده. ينفع كذا عداد في نفس الوقت بأسامي مختلفة.
- **[[console.timeLog(label, ...data)]]:** بيطبع الوقت لحد دلوقتي **من غير ما يوقف العداد**، وأي arguments زيادة بتتطبع جنبه (هنا اسم الخطوة).
- **[[console.timeEnd(label)]]:** بيطبع ويقفل العداد. بعدها نفس الاسم ينفع يبدأ من جديد.
- **السطر الأخير** ([[4 مدن...]]) بيستخدم النتايج، عشان متبقاش بتقيس كود محدش بيستخدم ناتجه.

## الغلطات اللي ممكن تقع فيها

**١. تقرا الأرقام كأنها وقت كل خطوة.** [[618ms]] مش وقت الـ split، ده من البداية. الجدول اللي فوق هو القراية الصح.

**٢. الاسم لازم يبقى نفس الحرف بالظبط.** غلطة حرف واحدة:

~~~text الناتج (console.time("تقرير") ثم console.timeEnd("تقارير"))
(node:34236) Warning: No such label 'تقارير' for console.timeEnd()
(Use $__btnode --trace-warnings ...$__bt to show where the warning was created)
~~~

مفيش رقم خالص، بس warning. حط الاسم في متغير ([[const T = "تقرير"]]) واستخدمه في الأربع نداءات.

**٣. تقيس مرة واحدة وتحكم.** شغّل مرتين على الأقل؛ أول تشغيلة ساعات أبطأ (الـ JIT لسه بيسخن). ولو محتاج دقة أكتر لدالة واحدة: [[performance.now()]] و loop بيكررها.` },
        { lvl: 'متوسط', t: R`اربط أخطاءك`, what: R`في أي [[catch]] عندك بترمي خطأ جديد، ضيف [[{ cause: e }]]. وبعد أسبوع هتلاقي أخطاءك بتقول السبب الحقيقي بدل «حصل خطأ». من درس «اقرا رسالة الخطأ في JavaScript».`, done: R`مفيش [[throw new Error]] جوه [[catch]] في المشروع من غير [[cause]] (دوّرت بالبحث في المحرر)، ولما تكسر حاجة عن قصد، الخطأ اللي بيوصل فيه السبب الأصلي ومكانه.`, sol: R`## الشكل النهائي

نفس الخطأ (ملف إعدادات فيه فاصلة زيادة) قبل وبعد. **قبل:**

~~~text الناتج (node main.js في before، من غير سطور at)
C:\lab\before\src\orders.js:8
    throw new Error("المتجر مقدرش يبدأ");
    ^

Error: المتجر مقدرش يبدأ

Node.js v24.22.1
~~~

**بعد:**

~~~text الناتج (node main.js في after، من غير سطور at، والمسار اتقصّر)
C:\lab\after\src\orders.js:8
    throw new Error("المتجر مقدرش يبدأ", { cause: e });
    ^

Error: المتجر مقدرش يبدأ
  [cause]: Error: ملف الإعدادات مش JSON
      ... 6 lines matching cause stack trace ...
    [cause]: SyntaxError: Expected double-quoted property name in JSON at position 16 (line 1 column 17)
  }
}

Node.js v24.22.1
~~~

## هتشوف إيه

قبل: «المتجر مقدرش يبدأ» وخلاص، ومحدش عارف ليه. بعد: نفس الرسالة، وتحتها السلسلة كاملة: المتجر وقع لأن ملف الإعدادات مش JSON، والسبب التقني إن فيه حاجة غلط في الحرف رقم 16 (الفاصلة اللي قبل [[}]]). ولو الملف مش موجود أصلًا السلسلة بتقول ده:

~~~text الناتج (node main.js nothing.json، أول السطور)
Error: المتجر مقدرش يبدأ
  [cause]: Error: مش قادر أقرا ملف الإعدادات
    [cause]: Error: ENOENT: no such file or directory, open 'C:\lab\after\nothing.json'
      code: 'ENOENT',
~~~

## الكود (بعد التصليح)

~~~text شجرة الملفات
shop/
├── main.js
├── shop.json            { "port": 3000, }  ← الفاصلة الزيادة عن قصد
└── src/
    ├── config.js
    └── orders.js
~~~

~~~js src/config.js
const fs = require("node:fs");

function loadConfig(path) {
  let text;
  try {
    text = fs.readFileSync(path, "utf8");
  } catch (e) {
    throw new Error("مش قادر أقرا ملف الإعدادات", { cause: e });
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("ملف الإعدادات مش JSON", { cause: e });
  }
}
module.exports = { loadConfig };
~~~

~~~js src/orders.js
const { loadConfig } = require("./config");

function startShop(configPath) {
  try {
    const config = loadConfig(configPath);
    return "المتجر شغال على port " + config.port;
  } catch (e) {
    throw new Error("المتجر مقدرش يبدأ", { cause: e });
  }
}
module.exports = { startShop };
~~~

~~~js main.js
const { startShop } = require("./src/orders");
console.log(startShop(process.argv[2] ?? "shop.json"));
~~~

الفرق عن النسخة القديمة ٣ سطور بس:

~~~text الناتج (diff before/src after/src)
8c8
<     throw new Error("مش قادر أقرا ملف الإعدادات");
---
>     throw new Error("مش قادر أقرا ملف الإعدادات", { cause: e });
13c13
<     throw new Error("ملف الإعدادات مش JSON");
---
>     throw new Error("ملف الإعدادات مش JSON", { cause: e });
8c8
<     throw new Error("المتجر مقدرش يبدأ");
---
>     throw new Error("المتجر مقدرش يبدأ", { cause: e });
~~~

## إزاي تلاقي كل الأماكن

**بالبحث:** في VS Code Ctrl+Shift+F على [[throw new]]، أو من الترمنال:

~~~text الناتج (grep -rn "throw new Error" before --include=*.js)
before/src/config.js:8:    throw new Error("مش قادر أقرا ملف الإعدادات");
before/src/config.js:13:    throw new Error("ملف الإعدادات مش JSON");
before/src/orders.js:8:    throw new Error("المتجر مقدرش يبدأ");
~~~

ده بيطلّع كل [[throw]]، حتى اللي برّه [[catch]] (اللي مش محتاج cause). في مشروع كبير الأحسن سكربت بيدوّر جوه الـ [[catch]] بس:

~~~js find-missing-cause.mjs
// بيدوّر في كل ملفات .js على throw new ...Error(...) جوه catch من غير cause
// node find-missing-cause.mjs <folder>
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? ".";
const files = readdirSync(root, { recursive: true })
  .filter((f) => f.endsWith(".js") && !f.includes("node_modules"));

let found = 0;
for (const file of files) {
  const src = readFileSync(join(root, file), "utf8");
  for (const m of src.matchAll(/catch\s*\((\w+)\)\s*\{/g)) {
    // لاقي آخر الـ block بعدّ الأقواس (كفاية لكود عادي من غير أقواس جوه نصوص)
    let depth = 1, i = m.index + m[0].length;
    while (depth > 0 && i < src.length) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}") depth--;
      i++;
    }
    const block = src.slice(m.index, i);
    for (const t of block.matchAll(/throw new \w*Error\(([^;]*)\);/g)) {
      if (!/\bcause\s*:/.test(t[1])) {
        const line = src.slice(0, m.index + t.index).split("\n").length;
        console.log($__bt$__{file}:$__{line}  $__{t[0].trim()}$__bt);
        found++;
      }
    }
  }
}
console.log(found === 0 ? "مفيش throw جوه catch من غير cause" : $__bt$__{found} لازم يتصلحوا$__bt);
process.exitCode = found ? 1 : 0;
~~~

~~~text الناتج (node find-missing-cause.mjs before ثم after)
src\config.js:8  throw new Error("مش قادر أقرا ملف الإعدادات");
src\config.js:13  throw new Error("ملف الإعدادات مش JSON");
src\orders.js:8  throw new Error("المتجر مقدرش يبدأ");
3 لازم يتصلحوا

مفيش throw جوه catch من غير cause
~~~

- **[[readdirSync(root, { recursive: true })]]:** كل الملفات في الفولدر واللي جواه (Node 20 وأحدث).
- **عدّ الأقواس:** من [[{]] بتاعة الـ catch لحد ما الـ depth يرجع صفر = آخر الـ block. بسيط ومش بيفهم الأقواس جوه النصوص، وده مكتوب في التعليق؛ لمشروع حقيقي فيه قاعدة جاهزة في ESLint اسمها [[preserve-caught-error]] بتعمل نفس الفحص بالـ AST (من وثائق ESLint، ماتشغّلتش هنا).
- **[[process.exitCode = 1]]** لو لقى حاجة، فينفع يتحط في CI أو pre-commit.

**الغلطة الشائعة:** [[throw new Error("فشل: " + e.message)]]: الرسالة فيها السبب بس الـ stack والنوع ([[e.code]] زي [[ENOENT]]) ضاعوا، ومتقدرش تعمل [[if (err.cause?.code === "ENOENT")]] عشان تتصرف حسب السبب.` },
        { lvl: 'متوسط', t: R`مترجم رسايل الأخطاء`, what: R`[[explain(e)]] بتاخد أي خطأ وترجّع نصيحة بالعربي حسب [[e.name]] وشكل الرسالة: [[reading 'x']] يبقى «اللي قبل [[.x]] كان undefined أو null»، و [[is not a function]] يبقى «اتأكد من الاسم والاستيراد»، و [[is not defined]] يبقى «الاسم مش متعرّف». من الدرسين.`, done: R`٦ أخطاء حقيقية (عملتها بإيدك بـ [[try]]) كل واحد بيطلع النصيحة الصح واسم المتغير أو الصفة من الرسالة نفسها، والخطأ اللي مش معروف بيرجّع رسالة عامة ومعاها النص الأصلي، ولو الخطأ فيه [[cause]] النصيحة بتتقال للسبب كمان.`, sol: R`## الشكل النهائي

~~~text الناتج (node explain.js، Node 24)
TypeError: اللي قبل .name كان undefined. اطبع القيمة دي قبل السطر، أو استخدم ?. لو مسموح تبقى فاضية.

TypeError: api.fetchUsers مش function. اتأكد من الاسم (غلطة كتابة؟) ومن الـ import، وإن القيمة مش undefined.

TypeError: بتغيّر متغير متعرّف بـ const. لو محتاج تغيّره استخدم let.

ReferenceError: الاسم cartTotl مش متعرّف في أي مكان شايفه السطر ده. غلطة كتابة، أو import ناقص، أو متعرّف جوه block تاني.

ReferenceError: total متعرّف بـ let أو const بعد السطر ده (الـ TDZ). انقل التعريف لفوق.

SyntaxError: النص مش JSON صح عند الحرف رقم 8. افتح الداتا وبص على المكان ده (فاصلة زيادة؟ علامة تنصيص ناقصة؟).

RangeError: معرفش الخطأ ده لسه. الرسالة الأصلية: «Invalid array length»

Error: «ملف الإعدادات مكسور» (رسالة من الكود نفسه، السبب تحت لو موجود)
  ← السبب: SyntaxError: النص مش JSON صح عند الحرف رقم 1. افتح الداتا وبص على المكان ده (فاصلة زيادة؟ علامة تنصيص ناقصة؟).
~~~

## هتشوف إيه

٨ أخطاء اتعملت بإيدها جوه [[try]]. أول ٦ معروفين: كل واحد نصيحة بالعربي فيها الاسم اللي جه من الرسالة نفسها ([[.name]] و [[api.fetchUsers]] و [[cartTotl]] و [[total]] ورقم الحرف 8). السابع ([[RangeError]]) مش في القواعد، فبيرجع رسالة عامة ومعاها النص الأصلي. والتامن [[Error]] عادي من الكود ومعاه [[cause]]، فالنصيحة بتتقال للسبب كمان بإزاحة.

الرسايل الأصلية اللي القواعد بتقرا منها (من نفس التشغيلة):

~~~text الناتج (e.name + ": " + e.message لأول ٦)
TypeError: Cannot read properties of undefined (reading 'name')
TypeError: api.fetchUsers is not a function
TypeError: Assignment to constant variable.
ReferenceError: cartTotl is not defined
ReferenceError: Cannot access 'total' before initialization
SyntaxError: Expected double-quoted property name in JSON at position 8 (line 1 column 9)
~~~

## الكود

~~~js explain.js
// قواعد: كل قاعدة بتطابق name ورسالة، وبتطلّع الاسم من الرسالة نفسها
const rules = [
  {
    name: "TypeError",
    re: /Cannot read properties of (undefined|null) \(reading '([^']+)'\)/,
    say: (m) => $__btاللي قبل .$__{m[2]} كان $__{m[1]}. اطبع القيمة دي قبل السطر، أو استخدم ?. لو مسموح تبقى فاضية.$__bt,
  },
  {
    name: "TypeError",
    re: /^(.+) is not a function$/,
    say: (m) => $__bt$__{m[1]} مش function. اتأكد من الاسم (غلطة كتابة؟) ومن الـ import، وإن القيمة مش undefined.$__bt,
  },
  {
    name: "TypeError",
    re: /Assignment to constant variable/,
    say: () => "بتغيّر متغير متعرّف بـ const. لو محتاج تغيّره استخدم let.",
  },
  {
    name: "ReferenceError",
    re: /^(.+) is not defined$/,
    say: (m) => $__btالاسم $__{m[1]} مش متعرّف في أي مكان شايفه السطر ده. غلطة كتابة، أو import ناقص، أو متعرّف جوه block تاني.$__bt,
  },
  {
    name: "ReferenceError",
    re: /Cannot access '([^']+)' before initialization/,
    say: (m) => $__bt$__{m[1]} متعرّف بـ let أو const بعد السطر ده (الـ TDZ). انقل التعريف لفوق.$__bt,
  },
  {
    name: "SyntaxError",
    re: /in JSON at position (\d+)/,
    say: (m) => $__btالنص مش JSON صح عند الحرف رقم $__{m[1]}. افتح الداتا وبص على المكان ده (فاصلة زيادة؟ علامة تنصيص ناقصة؟).$__bt,
  },
];

function explain(e, depth = 0) {
  if (!(e instanceof Error)) return $__btقيمة اترمت ومش Error: $__{String(e)}$__bt;
  const rule = rules.find((r) => r.name === e.name && r.re.test(e.message));
  let out;
  if (rule) out = $__bt$__{e.name}: $__{rule.say(e.message.match(rule.re))}$__bt;
  else if (e.name === "Error") out = $__btError: «$__{e.message}» (رسالة من الكود نفسه، السبب تحت لو موجود)$__bt;
  else out = $__bt$__{e.name}: معرفش الخطأ ده لسه. الرسالة الأصلية: «$__{e.message}»$__bt;
  if (e.cause !== undefined && depth < 5) {
    out += "\n" + "  ".repeat(depth + 1) + "← السبب: " + explain(e.cause, depth + 1);
  }
  return out;
}

module.exports = { explain };

if (require.main === module) {
  const tries = [
    () => { const user = undefined; return user.name; },
    () => { const api = {}; api.fetchUsers(); },
    () => { const port = 3000; port = 4000; },
    () => cartTotl([1, 2]),
    () => { total; let total = 5; },
    () => JSON.parse('{"a": 1,}'),
    () => { throw new RangeError("Invalid array length"); },
    () => {
      try { JSON.parse("{bad}"); }
      catch (err) { throw new Error("ملف الإعدادات مكسور", { cause: err }); }
    },
  ];
  for (const t of tries) {
    try { t(); } catch (e) { console.log(explain(e)); console.log(); }
  }
}
~~~

## كل حتة بتعمل إيه

- **[[rules]] داتا مش [[if]] ورا بعض:** كل قاعدة [[name]] و regex و [[say]]. تزوّد خطأ جديد = سطر جديد في الـ array من غير ما تلمس [[explain]].
- **الـ regex بيطلّع الأسماء:** [[\(reading '([^']+)'\)]] بيمسك اسم الـ property في group، و [[say]] بتاخد ناتج [[match]] وتحط [[m[2]]] في الجملة. كده النصيحة بتقول «اللي قبل .name» مش «فيه property مش موجودة».
- **[[r.name === e.name]] مع الـ regex:** نفس شكل الرسالة ممكن يطلع من نوعين، فالاتنين لازم يتطابقوا.
- **[[Error]] العادي:** ده غالبًا [[throw new Error("...")]] من كودك، فالرسالة نفسها هي الشرح، وأهم حاجة السبب اللي تحته.
- **الـ [[cause]]:** [[explain]] بتنادي نفسها على [[e.cause]] بـ [[depth + 1]] (إزاحة أكبر)، ومعاها حد [[depth < 5]] عشان cause بيشاور على نفسه ميعلّقش.
- **[[require.main === module]]:** التجارب بتشتغل لما تشغّل الملف مباشرة بس، ولما ملف تاني يعمل [[require("./explain")]] بياخد [[explain]] من غير ما التجارب تطبع.

## الغلطات اللي حصلت وأنا ببنيه

**١. الخطأ اللي ليه cause كان بيطلع «معرفش».** أول نسخة كان فيها فرعين بس (قاعدة أو «معرفش»)، فالتامن طلع:

~~~text الناتج (أول نسخة، آخر سطرين)
Error: معرفش الخطأ ده لسه. الرسالة الأصلية: «ملف الإعدادات مكسور»
  ← السبب: SyntaxError: النص مش JSON صح عند الحرف رقم 1. ...
~~~

صح تقنيًا، بس مضلل: الرسالة دي كتبها المبرمج وواضحة. التصليح: فرع لـ [[e.name === "Error"]] بيعرض الرسالة كما هي ويقول إن السبب تحت.

**٢. الـ regex الأول كان بيطابق الرسالة كلها.** كتبته [[^Expected double-quoted property name in JSON]]، وجرّبت [[JSON.parse("[1, 2")]] فطلع «معرفش» لأن الرسالة شكلها تاني خالص ([[Expected ',' or ']' after array element in JSON at position 5 (line 1 column 6)]]). أخطاء الـ JSON ليها صيغ كتير حسب الغلطة، والجزء الثابت فيهم كلهم [[in JSON at position (d+)]]، فالقاعدة بقت تدوّر عليه بس. الدرس: رسايل الأخطاء مش API ثابت (وبتتغير بين نسخ Node كمان)، اختار أقل جزء يكفي.

**الغلطة الشائعة:** تعتمد على [[e.message]] في منطق البرنامج نفسه (مش في رسالة لليوزر). للمنطق استخدم [[e.name]] و [[instanceof]] و [[e.code]] ([[ENOENT]] مثلًا)، لأنهم ثابتين.` },
        { lvl: 'كبير', t: R`صندوق تشخيص لأي سكربت`, what: R`[[debug.js]] بيعمل export لـ [[log]] و [[table]] و [[time]] اللي بيشتغلوا بس لو [[process.env.DEBUG]] بـ [[1]]، و [[run(main)]] بيلف الدالة الأساسية: لو رمت يطبع السلسلة كلها بـ [[printChain]] ويحط [[process.exitCode = 1]]. من الوحدة دي ومن وحدات الدوال والأخطاء.`, done: R`من غير [[DEBUG]] السكربت مبيطبعش غير الأخطاء، ومعاه بيطبع الجداول والأوقات. وخطأ فيه ٣ مستويات [[cause]] بيطبع ٣ سطور وكود الخروج ١. ومعاه [[check.mjs]] بـ [[node:assert]] بيتأكد إن [[printChain]] بتقف على الدايرة، والسكربت بيتشغّل مرتين ورا بعض من غير مشاكل.`, ext: R`زوّد مستويات (warn و error)، ووقت لكل سطر، وكتابة في ملف لوج، وحوّله لـ package تستخدمه في كل مشاريعك.`, sol: R`## الشكل النهائي

~~~text الناتج (node report.mjs: عادي، مفيش غير النتيجة)
الإجمالي لكل مدينة: { 'القاهرة': 340, 'الإسكندرية': 1275, 'الجيزة': 400 }
~~~

~~~text الناتج (DEBUG=1 node report.mjs: الجداول والأوقات كمان)
[time] قراية الملف: 1.0ms
[debug] عدد الطلبات: 5
┌─────────┬────┬──────────────┬───────┐
│ (index) │ id │ city         │ total │
├─────────┼────┼──────────────┼───────┤
│ 0       │ 1  │ 'القاهرة'    │ 250   │
│ 1       │ 2  │ 'الإسكندرية' │ 1200  │
│ 2       │ 3  │ 'القاهرة'    │ 90    │
└─────────┴────┴──────────────┴───────┘
[time] التجميع: 0.0ms
الإجمالي لكل مدينة: { 'القاهرة': 340, 'الإسكندرية': 1275, 'الجيزة': 400 }
~~~

~~~text الناتج (node report.mjs broken.json ثم echo $?)
Error: التقرير مطلعش
  ← Error: broken.json مش JSON
    ← SyntaxError: Unexpected token ']', ..."": 250 }, ] " is not valid JSON
1
~~~

~~~text الناتج (node report.mjs nope.json، المسار اتقصّر)
Error: التقرير مطلعش
  ← Error: مش قادر أقرا nope.json
    ← Error: ENOENT: no such file or directory, open 'C:\lab\debug-box\nope.json'
~~~

~~~text الناتج (node --test check.mjs)
✔ من غير DEBUG: log و table و time ساكتين (2.8305ms)
✔ مع DEBUG=1: بيطبعوا (0.4501ms)
✔ سلسلة ٣ مستويات = ٣ سطور من برّه لجوه (0.4304ms)
✔ printChain بتقف على الدايرة (0.4039ms)
✔ cause نص بيتطبع ويقف، والحد الأقصى بيتحترم (0.5596ms)
✔ run: الخطأ بيتطبع وكود الخروج 1، والنجاح بيسيبه 0 (0.4463ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

## هتشوف إيه

نفس السكربت بـ ٤ أشكال: عادي بيطبع النتيجة بس. مع [[DEBUG=1]] بيطبع الأوقات وعدد الطلبات وجدول أول ٣. لو الملف بايظ أو مش موجود: ٣ سطور للسلسلة من برّه لجوه (المعنى، وبعدين أنهي ملف، وبعدين السبب التقني) وكود الخروج 1. والتستات ٦ من ٦. وشغّلته مرتين ورا بعض على الداتا السليمة والاتنين خرجوا بـ 0 من غير أي أثر من التشغيلة اللي قبلها.

**في PowerShell:** [[$env:DEBUG="1"; node report.mjs]] وبعدين [[Remove-Item Env:DEBUG]]. ومع [[DEBUG]] والملف بايظ بيطبع الـ stack الكامل تحت السلسلة (جرّبتها في pwsh: السلسلة وبعدين [[Error: التقرير مطلعش]] و [[at main (...report.mjs:27:11)]]).

## شجرة الملفات وترتيب البناء

~~~text شجرة الملفات
debug-box/
├── debug.js       الصندوق نفسه: log و table و time و printChain و run (١)
├── check.mjs      التستات (٢)
├── report.mjs     سكربت بيستخدمه (٣)
├── orders.json    داتا سليمة
└── broken.json    داتا فيها فاصلة زيادة عن قصد
~~~

اتبنى بالترتيب ده: [[printChain]] الأول ومعاه تستاته (أصعب حتة: الدايرة والحد)، وبعدين [[log]] و [[table]] و [[time]] وتست «ساكتين من غير DEBUG»، وبعدين [[run]]، وفي الآخر [[report.mjs]] كاستخدام حقيقي.

## الكود

~~~js debug.js
// صندوق تشخيص: log و table و time بيشتغلوا بس مع DEBUG=1، و run بيطبع سلسلة الأخطاء
const enabled = () => process.env.DEBUG === "1";   // دالة مش ثابت: بتتقري وقت النداء

export function log(...args) {
  if (enabled()) console.error("[debug]", ...args);
}

export function table(rows, columns) {
  if (enabled()) console.table(rows, columns);
}

// time("قراية") بترجّع دالة؛ نادها لما الخطوة تخلص
export function time(label) {
  const start = performance.now();
  return () => {
    const ms = performance.now() - start;
    if (enabled()) console.error($__bt[time] $__{label}: $__{ms.toFixed(1)}ms$__bt);
    return ms;
  };
}

// بترجّع السطور (عشان تتختبر) وبتطبعها لو اتبعت write
export function printChain(err, write = (line) => console.error(line), max = 10) {
  const lines = [];
  const seen = new Set();
  let cur = err;
  while (cur !== undefined && cur !== null && lines.length < max) {
    if (seen.has(cur)) {                               // الخطأ ده ظهر قبل كده: دايرة
      lines.push("  ".repeat(lines.length) + "↺ (السبب بيرجع لخطأ اتطبع فوق)");
      break;
    }
    if (typeof cur === "object") seen.add(cur);
    const raw = cur instanceof Error ? $__bt$__{cur.name}: $__{cur.message}$__bt : String(cur);
    const text = raw.replace(/\s*\n\s*/g, " ");                 // رسالة فيها سطور تبقى سطر واحد
    lines.push("  ".repeat(lines.length) + (lines.length ? "← " : "") + text);
    cur = cur instanceof Error ? cur.cause : undefined;
  }
  for (const line of lines) write(line);
  return lines;
}

export async function run(main) {
  try {
    await main();
  } catch (err) {
    printChain(err);
    if (enabled() && err instanceof Error) console.error(err.stack);   // الـ stack كامل في وضع التشخيص بس
    process.exitCode = 1;
  }
}
~~~

~~~js check.mjs
// node --test check.mjs   (أو node check.mjs: node:test بيشتغل لوحده كمان)
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { log, table, time, printChain, run } from "./debug.js";

// بنمسك console.error و console.table عشان نعرف اتطبع إيه
let printed;
const original = { error: console.error, table: console.table };
beforeEach(() => {
  printed = [];
  console.error = (...a) => printed.push(a.join(" "));
  console.table = (rows) => printed.push("TABLE " + rows.length);
  delete process.env.DEBUG;
  process.exitCode = 0;
});
afterEach(() => {
  Object.assign(console, original);
  delete process.env.DEBUG;
  process.exitCode = 0;
});

test("من غير DEBUG: log و table و time ساكتين", () => {
  log("x"); table([{ a: 1 }]); const ms = time("t")();
  assert.deepEqual(printed, []);
  assert.equal(typeof ms, "number");
});

test("مع DEBUG=1: بيطبعوا", () => {
  process.env.DEBUG = "1";
  log("عدد", 3); table([{ a: 1 }, { a: 2 }]); time("قراية")();
  assert.equal(printed[0], "[debug] عدد 3");
  assert.equal(printed[1], "TABLE 2");
  assert.match(printed[2], /^\[time\] قراية: \d+\.\dms$/);
});

test("سلسلة ٣ مستويات = ٣ سطور من برّه لجوه", () => {
  const e = new Error("التقرير مطلعش", { cause: new Error("orders.json مش JSON", { cause: new SyntaxError("bad") }) });
  const lines = printChain(e, () => {});
  assert.equal(lines.length, 3);
  assert.equal(lines[0], "Error: التقرير مطلعش");
  assert.equal(lines[2], "    ← SyntaxError: bad");
});

test("printChain بتقف على الدايرة", () => {
  const a = new Error("A"); const b = new Error("B", { cause: a }); a.cause = b;
  const lines = printChain(a, () => {});
  assert.equal(lines.length, 3);
  assert.match(lines[2], /↺/);
});

test("cause نص بيتطبع ويقف، والحد الأقصى بيتحترم", () => {
  assert.deepEqual(printChain(new Error("x", { cause: "الديسك مليان" }), () => {}), ["Error: x", "  ← الديسك مليان"]);
  let deep = new Error("0");
  for (let i = 1; i < 50; i++) deep = new Error(String(i), { cause: deep });
  assert.equal(printChain(deep, () => {}, 10).length, 10);
});

test("run: الخطأ بيتطبع وكود الخروج 1، والنجاح بيسيبه 0", async () => {
  await run(async () => { throw new Error("وقع", { cause: new TypeError("السبب") }); });
  assert.equal(process.exitCode, 1);
  assert.deepEqual(printed, ["Error: وقع", "  ← TypeError: السبب"]);
  process.exitCode = 0; printed = [];
  await run(async () => {});
  assert.equal(process.exitCode, 0);
  assert.deepEqual(printed, []);
});
~~~

~~~js report.mjs
// سكربت حقيقي الشكل بيستخدم الصندوق: بيقرا طلبات ويطلّع إجمالي كل مدينة
// node report.mjs [orders.json]
import { readFile } from "node:fs/promises";
import { log, table, time, run } from "./debug.js";

async function loadOrders(path) {
  let text;
  try {
    text = await readFile(path, "utf8");
  } catch (e) {
    throw new Error($__btمش قادر أقرا $__{path}$__bt, { cause: e });
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error($__bt$__{path} مش JSON$__bt, { cause: e });
  }
}

async function main() {
  const path = process.argv[2] ?? "orders.json";
  const endLoad = time("قراية الملف");
  let orders;
  try {
    orders = await loadOrders(path);
  } catch (e) {
    throw new Error("التقرير مطلعش", { cause: e });
  }
  endLoad();
  log("عدد الطلبات:", orders.length);
  table(orders.slice(0, 3), ["id", "city", "total"]);

  const endSum = time("التجميع");
  const byCity = {};
  for (const o of orders) byCity[o.city] = (byCity[o.city] ?? 0) + o.total;
  endSum();

  console.log("الإجمالي لكل مدينة:", byCity);
}

run(main);
~~~

~~~json orders.json
[
  { "id": 1, "city": "القاهرة", "total": 250 },
  { "id": 2, "city": "الإسكندرية", "total": 1200 },
  { "id": 3, "city": "القاهرة", "total": 90 },
  { "id": 4, "city": "الجيزة", "total": 400 },
  { "id": 5, "city": "الإسكندرية", "total": 75 }
]
~~~

~~~json broken.json
[ { "id": 1, "city": "القاهرة", "total": 250 }, ]
~~~

## كل حتة مهمة

- **[[enabled]] دالة مش ثابت:** [[process.env.DEBUG]] بيتقري كل نداء. لو كان [[const enabled = process.env.DEBUG === "1"]] كان هيتحسب مرة واحدة ساعة الـ import، والتست اللي بيغيّر [[DEBUG]] في النص كان هيفضل شايف القيمة القديمة.
- **التشخيص على [[console.error]]:** stderr مش stdout. كده [[node report.mjs > out.txt]] بيكتب النتيجة بس في الملف، والتشخيص يفضل على الشاشة. ([[console.table]] بيكتب على stdout، فلو محتاج تفصله برده اكتبه بـ [[console.error]] على نص.)
- **[[time(label)]] بترجّع دالة:** بدل [[console.time]] و [[timeEnd]] باسم لازم يتكتب مرتين صح. والوقت بيرجع كرقم حتى لو مش هيتطبع، فينفع تستخدمه.
- **[[printChain]] بترجّع السطور:** و [[write]] باراميتر، فالتست بيبعت [[() => {}]] ويفحص الـ array من غير ما يطبع حاجة. الدايرة بـ [[Set]] (بتقف أول ما خطأ يتكرر، مش بعد ١٠)، والحد [[max]] للسلاسل الطويلة بجد.
- **[[run(main)]]:** [[await main()]] جوه [[try]]، فأي خطأ (sync أو async) بيوصل. [[process.exitCode = 1]] مش [[process.exit(1)]] عشان أي حاجة لسه بتتكتب (لوج مثلًا) تكمّل.
- **[[check.mjs]]:** بيبدّل [[console.error]] و [[console.table]] بدوال بتجمع في array قبل كل تست ويرجّعهم بعده، وبيرجّع [[process.exitCode]] لصفر في الآخر؛ وإلا تست [[run]] كان هيخلي [[node --test]] نفسه يخرج بـ 1.

## الغلطات اللي حصلت وأنا ببنيه

**١. رسالة الـ JSON كسرت السطر.** أول تشغيل على [[broken.json]] طلع كده:

~~~text الناتج (أول نسخة من printChain)
Error: التقرير مطلعش
  ← Error: broken.json مش JSON
    ← SyntaxError: Unexpected token ']', ..."": 250 }, ]
" is not valid JSON
~~~

رسالة [[JSON.parse]] بتقتبس آخر حتة من النص، والملف آخره سطر جديد، فالرسالة نفسها فيها [[\n]]. التصليح: [[raw.replace(/\s*\n\s*/g, " ")]] قبل الطباعة، فكل مستوى سطر واحد.

**٢. وأنا بزوّد التصليح ده من الترمنال** (بـ [[node -e '...']] جوه Git Bash) الـ [[\s]] و [[\n]] اتاكلوا من الـ escaping، والملف بقى فيه regex مكسور:

~~~text الناتج (node report.mjs بعد التعديل الغلط)
SyntaxError: Invalid regular expression: missing /
~~~

التصليح: عدّلت الملف من الـ editor مباشرة. الدرس: تعديل كود فيه backslashes من سطر أوامر غلطة سهلة؛ افتح الملف.

**الغلطة الشائعة:** تطبع الـ stack كامل دايمًا. لليوزر العادي السلسلة (٣ سطور بالعربي) أوضح، والـ stack للمطوّر لما يطلبه بـ [[DEBUG=1]].` },
        { lvl: 'فكرة', t: R`دليل أعطال مشروعك`, what: R`كل مرة مشروعك يقع، سجّل الرسالة بنصها، والسبب الحقيقي، والتصليح، والسطر اللي كان المفروض يمسكه. انت اللي بتختار الشكل (صفحة، أو ملف JSON، أو أداة بتدوّر فيه).`, done: R`فيه ١٠ أعطال حقيقية على الأقل، وكل واحد فيه الرسالة الأصلية والسبب والتصليح، وتقدر تدوّر فيهم بكلمة من الرسالة.`, ext: R`اربطه بـ [[explain]] عشان لما خطأ يحصل تاني يقولك «حصل قبل كده، والتصليح كان كذا».`, sol: R`## نسخة نموذجية: دليل أعطال بيتأكد من نفسه

اخترت الشكل: ملف [[faults.json]] (داتا تتقري وتتعدل بسهولة، وتتحط في git مع المشروع) وأداة صغيرة [[faults.mjs]] بتدوّر فيه بكلمة. وزوّدت حاجة واحدة مش في المطلوب: كل عطل معاه [[repro]] (كود صغير بيعمل نفس الخطأ)، والأداة بـ [[--verify]] بتشغّلهم كلهم وتتأكد إن الرسايل لسه زي المكتوبة. لما تحدّث Node والرسالة تتغير، هتعرف إن البحث بالنص القديم مش هيلاقيها.

الأعطال العشرة دي حقيقية: كلها حصلت فعلًا وأنا ببني حلول الوحدة دي ووحدة أسئلة الانترفيو، ومكتوبة هنا بأسامي معمل.

## الشكل النهائي

~~~text الناتج (node faults.mjs --verify، Node 24)
✔ #1  Cannot read properties of null (reading 'length')
✔ #2  Maximum call stack size exceeded
✔ #3  Unexpected token ':'
✔ #4  Converting circular structure to JSON
✔ #5  Expected double-quoted property name in JSON at position 16
✔ #6  number 5 is not iterable
✔ #7  Cannot access 'total' before initialization
✔ #8  Missing expected rejection (TypeError)
✔ #9  Assignment to constant variable
✔ #10  Invalid regular expression: missing /
10 من 10 لسه بنفس الرسالة
~~~

~~~text الناتج (node faults.mjs circular)
#2  Maximum call stack size exceeded
  السبب:   deepClone بيسجّل النسخة في seen بعد ما ينسخ العيال، فـ o.self بيبدأ نسخة جديدة للأبد
  التصليح: seen.set(value, out) قبل اللفة على المفاتيح
  كان هيتمسك بـ: تست: object بيشاور على نفسه بيتنسخ و c.self === c

#4  Converting circular structure to JSON
  السبب:   JSON.stringify على object فيه self = نفسه (نسخ بـ JSON.parse(JSON.stringify(x)))
  التصليح: structuredClone(x) للنسخ، أو replacer بيشيل المفتاح الدايري للوج
  كان هيتمسك بـ: متستخدمش JSON كـ deep clone عام
~~~

~~~text الناتج (node faults.mjs redis)
مفيش عطل فيه «redis»
~~~

## هتشوف إيه

- **[[--verify]]:** سطر لكل عطل بـ ✔ لو الـ repro لسه بيطلّع نفس الرسالة، و ✖ ومعاه الرسالة الجديدة لو اتغيرت. وكود الخروج 1 لو فيه ✖ (ينفع في CI بعد تحديث Node).
- **البحث:** الكلمة بتتدوّر في الرسالة والسبب والتصليح والـ tags، فـ [[circular]] لقت عطلين: واحد رسالته مفيهاش الكلمة أصلًا ([[Maximum call stack]]) بس السبب والـ tags فيهم.

## الكود

~~~json faults.json
[
  {
    "id": 1,
    "message": "Cannot read properties of null (reading 'length')",
    "cause": "الـ default parameter arity = fn.length بيتحسب قبل أول سطر في الدالة، فـ curry(null) وقعت قبل فحص الـ TypeError بتاعنا",
    "fix": "arity = fn?.length، والفحص جوه الدالة هو اللي يرمي",
    "catch": "تست: assert.throws(() => curry(null), { message: /curry: الـ fn/ })",
    "tags": ["curry", "default", "TypeError"],
    "repro": "function curry(fn, arity = fn.length) { if (typeof fn !== 'function') throw new TypeError('curry: الـ fn لازم function'); } curry(null);"
  },
  {
    "id": 2,
    "message": "Maximum call stack size exceeded",
    "cause": "deepClone بيسجّل النسخة في seen بعد ما ينسخ العيال، فـ o.self بيبدأ نسخة جديدة للأبد",
    "fix": "seen.set(value, out) قبل اللفة على المفاتيح",
    "catch": "تست: object بيشاور على نفسه بيتنسخ و c.self === c",
    "tags": ["deepClone", "circular", "recursion", "RangeError"],
    "repro": "function clone(v, seen = new WeakMap()) { if (typeof v !== 'object' || v === null) return v; if (seen.has(v)) return seen.get(v); const out = {}; for (const k of Object.keys(v)) out[k] = clone(v[k], seen); seen.set(v, out); return out; } const o = {}; o.self = o; clone(o);"
  },
  {
    "id": 3,
    "message": "Unexpected token ':'",
    "cause": "require() على ملف .map: Node بيعامل أي امتداد مش معروف كـ JavaScript، فأول \"version\": اتقرا كود",
    "fix": "JSON.parse(fs.readFileSync(path, 'utf8')) لأي ملف JSON مش امتداده .json",
    "catch": "اقرا الامتداد: require بيفهم .json بس كـ JSON",
    "tags": ["require", "json", "sourcemap", "SyntaxError"],
    "repro": "const fs = require('node:fs'), os = require('node:os'), path = require('node:path'); const f = path.join(os.tmpdir(), 'faults-demo.js.map'); fs.writeFileSync(f, '{\\n  \"version\": 3\\n}'); try { require(f); } finally { fs.rmSync(f); }"
  },
  {
    "id": 4,
    "message": "Converting circular structure to JSON",
    "cause": "JSON.stringify على object فيه self = نفسه (نسخ بـ JSON.parse(JSON.stringify(x)))",
    "fix": "structuredClone(x) للنسخ، أو replacer بيشيل المفتاح الدايري للوج",
    "catch": "متستخدمش JSON كـ deep clone عام",
    "tags": ["json", "circular", "clone", "TypeError"],
    "repro": "const c = {}; c.c = c; JSON.stringify(c);"
  },
  {
    "id": 5,
    "message": "Expected double-quoted property name in JSON at position 16",
    "cause": "ملف الإعدادات فيه فاصلة بعد آخر قيمة: { \"port\": 3000, }",
    "fix": "شيل الفاصلة؛ وفي الكود: throw new Error('الإعدادات مش JSON', { cause: e }) عشان اللوج يقول أنهي ملف",
    "catch": "فحص JSON في CI (node -e \"JSON.parse(require('fs').readFileSync('shop.json','utf8'))\")",
    "tags": ["json", "config", "SyntaxError"],
    "repro": "JSON.parse('{ \"port\": 3000, }');"
  },
  {
    "id": 6,
    "message": "number 5 is not iterable",
    "cause": "Promise.all(5): المدخل لازم iterable",
    "fix": "ابعت array: Promise.all([p1, p2])",
    "catch": "الـ promise بيترفض مش بيرمي sync، فلازم await جوه try أو .catch",
    "tags": ["promise", "iterable", "TypeError"],
    "repro": "await Promise.all(5);"
  },
  {
    "id": 7,
    "message": "Cannot access 'total' before initialization",
    "cause": "استخدام متغير let قبل سطر تعريفه (الـ TDZ)",
    "fix": "انقل let total لفوق قبل أول استخدام",
    "catch": "ESLint no-use-before-define",
    "tags": ["let", "tdz", "ReferenceError"],
    "repro": "total; let total = 5;"
  },
  {
    "id": 8,
    "message": "Missing expected rejection (TypeError)",
    "cause": "promiseAll بـ Array.from(items): Array.from(5) بيرجّع array فاضية مش بيرمي، فـ promiseAll(5) اتحلت بـ [] بدل ما ترفض",
    "fix": "افحص typeof items?.[Symbol.iterator] === 'function' الأول وارجع Promise.reject(new TypeError(...))",
    "catch": "تست: await assert.rejects(promiseAll(5), TypeError)",
    "tags": ["promise", "Array.from", "test", "AssertionError"],
    "repro": "const assert = require('node:assert'); const promiseAll = (items) => new Promise((res) => { const list = Array.from(items); if (list.length === 0) res([]); }); await assert.rejects(promiseAll(5), TypeError);"
  },
  {
    "id": 9,
    "message": "Assignment to constant variable",
    "cause": "const port = 3000 وبعدين port = 4000 في نفس الملف",
    "fix": "let لو القيمة بتتغير، أو متغير جديد",
    "catch": "TypeScript أو ESLint no-const-assign بيمسكها قبل التشغيل",
    "tags": ["const", "TypeError"],
    "repro": "const port = 3000; port = 4000;"
  },
  {
    "id": 10,
    "message": "Invalid regular expression: missing /",
    "cause": "تعديل ملف من node -e '...' في Git Bash: الـ \\s و \\n اتاكلوا من الـ escaping، والـ regex اتكسر على سطرين",
    "fix": "عدّل الملف من الـ editor، أو اكتب السكربت في ملف .js بدل سطر أوامر",
    "catch": "شغّل الملف بعد أي تعديل آلي (node --check file.js)",
    "tags": ["regex", "shell", "escaping", "SyntaxError"],
    "repro": "eval('const r = /s*\\ns*/g;');"
  }
]
~~~

~~~js faults.mjs
// دليل أعطال: node faults.mjs <كلمة>   |   node faults.mjs --verify
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const faults = JSON.parse(readFileSync(new URL("./faults.json", import.meta.url), "utf8"));
const arg = process.argv[2];

if (!arg) {
  console.log($__bt$__{faults.length} عطل. استخدم: node faults.mjs <كلمة>  أو  --verify$__bt);
} else if (arg === "--verify") {
  // بيعيد كل عطل من الـ repro بتاعه، ويتأكد إن الرسالة لسه زي المكتوبة (لو Node اتحدّث)
  const AsyncFunction = (async () => {}).constructor;
  const require = createRequire(import.meta.url);
  let ok = 0;
  for (const f of faults) {
    let got = "(مرماش حاجة)";
    try { await new AsyncFunction("require", f.repro)(require); }
    catch (e) { got = e.message; }
    const same = got.includes(f.message);
    if (same) ok++;
    console.log($__bt$__{same ? "✔" : "✖"} #$__{f.id}  $__{same ? f.message : "اتغيرت: " + got}$__bt);
  }
  console.log($__bt$__{ok} من $__{faults.length} لسه بنفس الرسالة$__bt);
  process.exitCode = ok === faults.length ? 0 : 1;
} else {
  const q = arg.toLowerCase();
  const hits = faults.filter((f) =>
    [f.message, f.cause, f.fix, ...f.tags].some((s) => s.toLowerCase().includes(q)));
  if (hits.length === 0) console.log($__btمفيش عطل فيه «$__{arg}»$__bt);
  for (const f of hits) {
    console.log($__bt#$__{f.id}  $__{f.message}$__bt);
    console.log($__bt  السبب:   $__{f.cause}$__bt);
    console.log($__bt  التصليح: $__{f.fix}$__bt);
    console.log($__bt  كان هيتمسك بـ: $__{f.catch}\n$__bt);
  }
}
~~~

## ليه التصميم ده

- **الحقول الأربعة** هي اللي المطلوب بيقول عليها: الرسالة بنصها ([[message]]) عشان تلاقيها لما تشوفها تاني في لوج، والسبب الحقيقي ([[cause]]) لأن الرسالة لوحدها نادرًا بتقول السبب (#2 رسالته «stack اتملى» والسبب ترتيب سطرين)، والتصليح ([[fix]])، و [[catch]]: التست أو الفحص اللي كان هيمسكه قبل ما يوصل. الحقل ده أهمهم: كل عطل بيتحوّل لتست أو قاعدة lint.
- **[[message]] جزء ثابت من الرسالة مش كلها:** #5 مكتوب لحد [[position 16]] من غير [[(line 1 column 17)]]، فالبحث والـ verify بيستخدموا [[includes]].
- **[[repro]] بـ AsyncFunction:** [[new AsyncFunction("require", code)]] بيعمل دالة async من النص، فالأعطال اللي فيها [[await]] (#6 و #8) بتشتغل. و [[createRequire]] بيدّي [[require]] جوه ملف [[.mjs]].
- **#3 بيعمل ملف مؤقت** في [[os.tmpdir()]] ويمسحه في [[finally]]، عشان الـ repro ميسيبش زبالة.
- **JSON مش قاعدة بيانات:** ١٠ أو ٢٠٠ عطل JSON كفاية وبيتقري في ms. لو بقوا آلاف، SQLite.

**إزاي تكمّل عليه:** كل مرة مشروعك يقع، قبل ما تصلّح: انسخ الرسالة، واكتب repro من ٣ سطور (ده لوحده بيوضح السبب نص المرات)، وبعد التصليح اكتب [[cause]] و [[fix]] و [[catch]]. و [[ext]] بتاع المشروع ([[explain]] تقول «حصل قبل كده») سطر واحد: [[faults.find((f) => err.message.includes(f.message))]].` },
      ],
      n: R`JavaScript بيدّيك أدوات تسأله بيها، ورسايل أخطاء بتقول السبب. القسم ده عن استخدامهم بدل التخمين`,
      pre: [
        { to: "js/try و catch و finally", why: R`الوحدة كلها بتمسك أخطاء وتقراها، وبتستخدم [[finally]] عشان تقفل group حتى لو الدالة رمت` },
        { to: "js/custom errors و cause", why: R`درس رسايل الأخطاء ومشاريعه مبنيين على [[cause]] و [[class ... extends Error]]` },
        { to: "js/import و export", why: R`مشروع صندوق التشخيص ملف بيعمل [[export]] لدواله وسكربت تاني بيعمل [[import]]` },
      ],
      items: [
        {
          cmd: "الـ console أكبر من log",
          title: "table و group و time و count",
          learn: R`تستخدم دوال الـ console اللي بتختصر وقت التشخيص.`,
          out: R`جدول بدل عشرين سطر، وقياس بدل تخمين.`,
          use: {
            prog: R`[[console.table]] على مصفوفة كائنات بتوريك البيانات كجدول — وده بيكشف الصف الشاذ في لمحة.`,
            work: R`[[console.time]] بتجاوب على «إيه البطيء» في سطرين، من غير أي أداة.`,
          },
          desc: R`الـ console فيه حوالي ١٥ دالة، وأغلب الناس بتستخدم [[log]] بس. والباقي بيوفّر وقت حقيقي:

**[[console.table(rows)]]** بتعرض مصفوفة كائنات كـ**جدول**. وبتاخد عمود تاني: [[console.table(rows, ['اسم','سعر'])]] بتعرض الأعمدة دي بس.

**[[console.group]]** و [[console.groupEnd]]** بيعملوا تداخل في الناتج. مفيدين لما تكون بتسجّل حاجة ليها مستويات (طلب فيه عناصر، أو دالة بتنادي دوال).

**[[console.time]]** و [[console.timeEnd]]** بيقيسوا الوقت بين نقطتين. و [[console.timeLog]] بتطبع الوقت الحالي من غير ما توقف العداد.

**[[console.count]]** بتعد كام مرة السطر ده اتنفّذ. مفيدة أوي لما تشك إن دالة بتتنادى أكتر من اللازم.

**[[console.assert(cond, msg)]]** بتطبع بس لو الشرط غلط. أهدأ من [[if]].

**[[console.trace()]]** بتطبع سلسلة النداءات من غير ما ترمي خطأ. بتجاوب على «مين نادى الدالة دي؟».

**[[console.dir(obj, { depth: null })]]** في Node بتعرض الكائن كامل مهما كان متداخل. [[console.log]] بتقف عند مستوى معيّن وبتكتب [[[Object]]].`,
          example: R`const rows = [
  { اسم: 'لابتوب', سعر: 15000, عدد: 2 },
  { اسم: 'ماوس',   سعر: 250,   عدد: 10 },
  { اسم: 'شاشة',   سعر: 4200,  عدد: 3 },
];

console.table(rows);
console.table(rows, ['اسم', 'سعر']);

console.group('الطلب #12');
console.log('العميل: أحمد');
console.groupEnd();

for (const r of rows) console.count('صف');

console.time('المعالجة');
rows.map(r => r.سعر * r.عدد);
console.timeEnd('المعالجة');`,
          lines: [
            R`array فيها objects بنفس المفاتيح، وده الشكل اللي [[console.table]] بتعرضه أحسن حاجة: كل object صف، وكل مفتاح عمود.`,
            R`أول صف: object بتلات مفاتيح ([[اسم]] و [[سعر]] و [[عدد]]). المفاتيح بالعربي عادي، JS بتقبلها أسامي خصايص.`,
            R`صف تاني بنفس المفاتيح. المسافات الزيادة بعد الفصلات بس عشان الأعمدة تبان متظبطة في الكود، ومالهاش أي تأثير على الناتج.`,
            R`صف تالت بنفس الشكل. لو صف ناقصه مفتاح، الخانة بتاعته في الجدول بتطلع فاضية.`,
            R`نهاية الـ array.`,
            R`[[console.table]] بترسم جدول فيه عمود [[(index)]] برقم كل صف، وبعده عمود لكل مفتاح. أسهل بكتير من [[console.log]] اللي بتطبع objects ورا بعض وصعب تقارن بينها.`,
            R`التاني array بأسامي الأعمدة اللي عايزها بس، فالجدول بيطلع [[اسم]] و [[سعر]] من غير [[عدد]]. مفيد لما الـ objects فيها مفاتيح كتير وانت مهتم باتنين.`,
            R`[[console.group]] بيطبع العنوان ده، وكل اللي بيتطبع بعده بيتزاح لجوه لحد [[groupEnd]]. بيخلي logs العملية الواحدة متجمعة ومتتلخبطش مع غيرها.`,
            R`السطر ده بيطلع مزاح تحت عنوان «الطلب #12»، فتعرف وانت بتقرا إنه تبع الطلب ده.`,
            R`[[groupEnd]] بيقفل آخر group مفتوح، واللي بعده يرجع لأول السطر. لو نسيته كل الـ logs اللي بعده هتفضل مزاحة.`,
            R`[[console.count]] بتطبع الـ label ومعاه عدد المرات اللي السطر ده اتنفّذ: [[صف: 1]] و [[صف: 2]] و [[صف: 3]]. بتعرّفك دالة اتنادت كام مرة من غير ما تعمل عدّاد بإيدك، و [[countReset]] بترجّعه من الأول.`,
            R`[[console.time]] بتبدأ ساعة باسم [[المعالجة]]. ممكن تشغّل كذا ساعة مع بعض بأسامي مختلفة.`,
            R`الشغل اللي عايز تقيس وقته: هنا بنحسب إجمالي كل صف. أي كود بين [[time]] و [[timeEnd]] بيتحسب.`,
            R`[[console.timeEnd]] بتوقف الساعة وتطبع الوقت زي [[المعالجة: 0.05ms]]. **نفس الاسم** لازم يتكرر بالظبط؛ لو اختلف حرف هتطلع warning إن مفيش label بالاسم ده ومش هيتطبع وقت.`,
          ],
          try: R`خد مصفوفة كائنات من مشروعك وجرّب [[console.table]] عليها. وبعدين [[console.table(rows, ['عمود'])]]. وبعدين حط [[console.count]] جوه دالة بتشك إنها بتتنادى كتير.`,
          ref: [
            { t: "MDN: console", url: "https://developer.mozilla.org/en-US/docs/Web/API/console" },
            { t: "MDN: console.table()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/table_static" },
            { t: "MDN: console.group()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/group_static" },
            { t: "MDN: console.count()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/count_static" },
            { t: "MDN: console.time()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/time_static" },
            { t: "MDN: console.assert()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static" },
            { t: "Node.js: Console", url: "https://nodejs.org/api/console.html" },
          ],
          pre: [
            { to: "js/higher-order functions", why: R`تمرين [[traced(fn, label)]] بياخد دالة ويرجّع دالة جديدة بتلفها` },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب على ورقة إيه اللي هيتطبع بالظبط (والمسافات) من: [[console.group('A'); console.log('x'); console.group('B'); console.log('y'); console.groupEnd(); console.groupEnd(); console.log('z')]]، وبعدين [[f(); f(); f(); console.countReset('صف'); f()]] لو [[f]] جواها [[console.count('صف')]].`, done: R`شغّلته في Node وطابق ورقتك: [[x]] قبلها مسافتين، و [[y]] أربعة، و [[z]] من غير مسافات، والعداد طبع [[صف: 1]] و [[صف: 2]] و [[صف: 3]] وبعد الـ reset [[صف: 1]] تاني.`, sol: R`**التوقع على الورقة:**

~~~text
A
  x
  B
    y
z
صف: 1
صف: 2
صف: 3
صف: 1
~~~

~~~js group-count.js
console.group('A');
console.log('x');
console.group('B');
console.log('y');
console.groupEnd();
console.groupEnd();
console.log('z');

function f() { console.count('صف'); }
f(); f(); f();
console.countReset('صف');
f();
~~~

~~~text الناتج (node group-count.js، Node 24)
A
  x
  B
    y
z
صف: 1
صف: 2
صف: 3
صف: 1
~~~

**ليه المسافات كده:** كل [[console.group]] بيطبع العنوان بتاعه في المستوى الحالي، وبعدين بيزوّد الإزاحة مسافتين لكل اللي بعده (في Node؛ في المتصفح بيبقى سهم بيتفتح ويتقفل). فـ [[A]] من غير مسافات، و [[x]] تحته بمسافتين، وعنوان [[B]] نفسه بمسافتين لأنه جوه [[A]]، و [[y]] بأربعة. كل [[groupEnd]] بيرجّع مستوى، والاتنين رجّعوا لصفر فـ [[z]] من غير مسافات.

**الحاجة اللي سهل تفوتك:** عنوان [[B]] نفسه متزاح، مش بس اللي جواه. ولو نسيت [[groupEnd]] واحدة، كل اللي بيتطبع بعد كده في البرنامج كله هيفضل متزاح.

**العداد:** [[console.count(label)]] بيطبع [[label: n]] وبيزوّد عداد خاص بالـ label ده. [[console.countReset('صف')]] بيرجّعه صفر، فالنداء اللي بعده [[صف: 1]] تاني. والعدادات بالاسم، فـ [[console.count('عمود')]] ليه عداد لوحده.

**إزاي تتأكد من المسافات بعينك:** [[node group-count.js | cat -A]] في Git Bash بيوري آخر كل سطر بـ [[$]]، والمسافات قبل الكلام بتبان.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية الشكل:** اعمل مصفوفة ٨ طلبات زي رد API (فيها [[id]] و [[total]] و [[status]])، وحط فيهم غلطتين: [[total: -2]] وطلب من غير [[id]]. اكتب [[checkOrders(rows)]] بتعمل [[console.assert]] على كل صف، وفي الآخر [[console.table]] للصفوف البايظة بس بعمودين.`, done: R`بيطلع سطرين [[Assertion failed]] بالظبط (واحد لكل غلطة)، والجدول فيه الصفين دول بس وفيه عمود [[(index)]] والعمودين اللي اخترتهم، والصفوف السليمة مبتطبعش ولا حاجة.`, sol: R`~~~js orders.js
const orders = [
  { id: 101, total: 250, status: "paid" },
  { id: 102, total: 1200, status: "paid" },
  { id: 103, total: -2, status: "paid" },          // غلطة: total سالب
  { id: 104, total: 90, status: "pending" },
  { total: 400, status: "paid" },                   // غلطة: من غير id
  { id: 106, total: 75, status: "refunded" },
  { id: 107, total: 3300, status: "paid" },
  { id: 108, total: 15, status: "pending" },
];

function checkOrders(rows) {
  const bad = {};                                   // object: الـ (index) هيبقى رقم الصف الأصلي
  rows.forEach((r, i) => {
    const okId = Number.isInteger(r.id);
    const okTotal = typeof r.total === "number" && r.total >= 0;
    console.assert(okId, $__btصف $__{i}: مفيش id$__bt, r);
    console.assert(okTotal, $__btصف $__{i}: total غلط ($__{r.total})$__bt);
    if (!okId || !okTotal) bad[i] = r;
  });
  const count = Object.keys(bad).length;
  if (count) console.table(bad, ["id", "total"]);
  return count;
}
console.log("عدد البايظ:", checkOrders(orders));
~~~

~~~text الناتج (node orders.js)
Assertion failed: صف 2: total غلط (-2)
Assertion failed: صف 4: مفيش id { total: 400, status: 'paid' }
┌─────────┬─────┬───────┐
│ (index) │ id  │ total │
├─────────┼─────┼───────┤
│ 2       │ 103 │ -2    │
│ 4       │     │ 400   │
└─────────┴─────┴───────┘
عدد البايظ: 2
~~~

**كل حتة:**

- **[[console.assert(condition, ...msg)]]:** لو الشرط true مبيعملش أي حاجة، ولو false بيطبع [[Assertion failed:]] والرسالة (على stderr). عشان كده الـ ٦ صفوف السليمة مطبعتش ولا حرف، والاتنين البايظين طلّعوا سطر لكل واحد. وأي arguments بعد الرسالة بتتطبع جنبها زي [[console.log]] (الـ object في السطر التاني).
- **مش بيوقف البرنامج:** عكس [[assert]] بتاع [[node:assert]] اللي بيرمي error. [[console.assert]] للتشخيص وانت شغال، و [[node:assert]] للتستات.
- **[[bad]] object مش array:** [[console.table]] بيستخدم مفاتيح الـ object كعمود [[(index)]]. فبقى [[2]] و [[4]] (رقم الصف في الداتا الأصلية) بدل [[0]] و [[1]]، وتعرف تروح للصف على طول.
- **[[console.table(bad, ["id", "total"])]]:** التاني array بأسامي الأعمدة، فـ [[status]] اتشال. والخانة الفاضية تحت [[id]] هي الصف اللي ملوش [[id]] أصلًا.
- **الشروط:** [[Number.isInteger(r.id)]] بيمسك [[undefined]] والنص، و [[typeof r.total === "number" && r.total >= 0]] بيمسك السالب ولو [[total]] جه نص.

**الغلطة الشائعة:** [[console.assert(r.id, ...)]]: الـ id لو 0 هيطلع «مفيش id» غلط، لأن 0 falsy. اكتب الشرط صريح.` },
            { lvl: 'تحدي', t: R`**ابني أداة:** [[traced(fn, label)]] بترجّع دالة جديدة بتعمل [[console.group(label)]] و [[console.count(label)]] قبل النداء، و [[console.groupEnd()]] في [[finally]] حتى لو الدالة رمت. جرّبها على [[fib]] التكرارية الملفوفة نفسها.`, done: R`[[fib(5)]] بترجّع [[5]] والعداد وصل [[15]] نداء، وكل نداء داخلي مزاح مسافتين أكتر من اللي ناداه. ولو خليت الدالة ترمي، السطر اللي بتطبعه بعد الـ [[catch]] بيبدأ من غير مسافات (يعني [[groupEnd]] اتنادت).`, sol: R`~~~js traced.js
function traced(fn, label) {
  return function (...args) {
    console.group(label + "(" + args.join(", ") + ")");
    console.count(label);
    try {
      return fn.apply(this, args);
    } finally {
      console.groupEnd();                 // بتتنادى حتى لو fn رمت
    }
  };
}

let fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));
fib = traced(fib, "fib");                 // النداءات الداخلية بتنادي الاسم fib، يعني الملفوفة
console.log("النتيجة:", fib(5));

const boom = traced(() => { throw new Error("وقعت"); }, "boom");
try { boom(); } catch (e) { console.log("بعد الـ catch:", e.message); }
~~~

~~~text الناتج (node traced.js)
fib(5)
  fib: 1
  fib(4)
    fib: 2
    fib(3)
      fib: 3
      fib(2)
        fib: 4
        fib(1)
          fib: 5
        fib(0)
          fib: 6
      fib(1)
        fib: 7
    fib(2)
      fib: 8
      fib(1)
        fib: 9
      fib(0)
        fib: 10
  fib(3)
    fib: 11
    fib(2)
      fib: 12
      fib(1)
        fib: 13
      fib(0)
        fib: 14
    fib(1)
      fib: 15
النتيجة: 5
boom()
  boom: 1
بعد الـ catch: وقعت
~~~

**إزاي اشتغلت:**

- **[[traced]] بترجّع دالة جديدة** بتفتح group باسم النداء والـ args ([[fib(4)]])، وتعد، وتنادي الأصلية بـ [[fn.apply(this, args)]].
- **[[try / finally]]:** الـ [[finally]] بيتنفّذ بعد [[return]] وبعد [[throw]]، فالـ group بيتقفل في الحالتين. ده سبب إن [[بعد الـ catch]] طبعت من غير مسافات: [[groupEnd]] اتنادت حتى إن [[boom]] رمت.
- **«الملفوفة نفسها»:** [[let fib]] وبعدين [[fib = traced(fib, "fib")]]. جوه الدالة الأصلية [[fib(n - 1)]] بتدوّر على الاسم [[fib]] وقت النداء، والاسم ده بقى بيشاور على النسخة الملفوفة، فكل نداء داخلي بيعدّي على [[traced]] ويتزاح. (نفس فكرة [[memoize]] في درس الانترفيو.)
- **15 نداء:** [[fib(5)]] بتعمل 15 نداء في الشجرة، وآخر سطر [[fib: 15]]. والشجرة اللي بتشوفها هي شجرة الـ recursion بالظبط: [[fib(3)]] اتحسبت مرتين و [[fib(2)]] ٣ مرات، وده اللي الـ memoize بيوفّره.

**الغلطة الشائعة:** [[const fib = ...]] ثم [[const tracedFib = traced(fib, "fib")]]: النداءات الداخلية هتنادي [[fib]] الأصلية، فهتشوف group واحد بس و [[fib: 1]]. أو [[groupEnd]] بعد [[return]] من غير [[finally]]: أول error هيسيب كل اللي بعده متزاح.` },
          ],
          flag: "console",
          deep: {
            why: R`عشرين [[console.log]] في لوب بيدّوا ناتج مش بيتقري. وجدول واحد بيكشف الصف الشاذ في لمحة.`,
            how: R`**[[console.table]]** بتشتغل على مصفوفة كائنات (كل كائن صف، والمفاتيح أعمدة) أو على كائن كائنات (المفاتيح تبقى الـ index). ولو العناصر قيم بسيطة، بتعمل عمود واحد اسمه [[Values]].

وعمود [[(index)]] بيتولّد لوحده: رقم الصف في المصفوفة، أو المفتاح في الكائن.

**[[console.time]]** بتستخدم ساعة عالية الدقة. و**الاسم لازم يتطابق** بين [[time]] و [[timeEnd]] — ولو مش متطابق، بيطلّع تحذير ومبيطبعش.

ولو محتاج دقة أعلى: [[performance.now()]] بترجّع رقم بالملي ثانية بكسور، وتقدر تحسب الفرق بنفسك.

**[[console.dir]]** في Node بتاخد [[{ depth: null }]] عشان تعرض كل المستويات. و [[console.log]] بتقف عند عمق ٢ افتراضيًا وبتكتب [[[Object]]]. وتقدر تغيّر الافتراضي: [[util.inspect.defaultOptions.depth = null]].

وفي المتصفح، [[console.dir]] بتعرض الكائن كشجرة قابلة للفتح، و [[console.log]] على عنصر DOM بتعرضه كـ HTML — فـ [[dir]] هي اللي تستخدمها لو عايز تشوف صفات العنصر.

**[[console.trace]]** بتطبع الـ stack من غير ما ترمي. والفرق عن [[new Error().stack]] إنها بتطبع على طول وبتتنسّق في DevTools.

**وفي الإنتاج**: الـ console في Node بيكتب على stdout/stderr، وده **متزامن** على الملفات في بعض الأنظمة. فلوب فيها [[console.log]] آلاف المرات بتبطّأ البرنامج فعلًا. استخدم مكتبة لوج (زي [[pino]]) في الإنتاج.`,
            when: R`[[table]] مع أي مصفوفة كائنات. و [[count]] أول ما تشك في عدد النداءات. و [[time]] قبل ما تفترض إن حاجة بطيئة.`,
            mistakes: R`تستخدم [[log]] في لوب بدل [[table]] بعد اللوب. أو تكتب اسم مختلف في [[timeEnd]]. أو تسيب [[console.log]] في لوب كبيرة في الإنتاج.`
          },
          teach: R`## خمستاشر دالة، وانت بتستخدم واحدة

---

## ١. [[console.table]]

~~~js Node 24
const rows = [
  { اسم: 'لابتوب', سعر: 15000, عدد: 2 },
  { اسم: 'ماوس',   سعر: 250,   عدد: 10 },
  { اسم: 'شاشة',   سعر: 4200,  عدد: 3 },
];
console.table(rows);
~~~

~~~text الناتج (اتشغّل فعلًا)
┌─────────┬──────────┬───────┬─────┐
│ (index) │ اسم      │ سعر   │ عدد │
├─────────┼──────────┼───────┼─────┤
│ 0       │ 'لابتوب' │ 15000 │ 2   │
│ 1       │ 'ماوس'   │ 250   │ 10  │
│ 2       │ 'شاشة'   │ 4200  │ 3   │
└─────────┴──────────┴───────┴─────┘
~~~

وبأعمدة محددة:

~~~js
console.table(rows, ['اسم', 'سعر']);
~~~

~~~text الناتج (اتشغّل فعلًا)
┌─────────┬──────────┬───────┐
│ (index) │ اسم      │ سعر   │
├─────────┼──────────┼───────┤
│ 0       │ 'لابتوب' │ 15000 │
│ 1       │ 'ماوس'   │ 250   │
│ 2       │ 'شاشة'   │ 4200  │
└─────────┴──────────┴───────┘
~~~

> عمود [[(index)]] بيتولّد لوحده. ولو مررت كائن بدل مصفوفة، بيبقى المفاتيح.

---

## ٢. [[console.group]]

~~~js
console.group('الطلب #12');
console.log('العميل: أحمد');
console.group('العناصر');
console.log('لابتوب × 2');
console.groupEnd();
console.groupEnd();
~~~

~~~text الناتج (اتشغّل فعلًا)
الطلب #12
  العميل: أحمد
  العناصر
    لابتوب × 2
~~~

وفي المتصفح، المجموعات بتبقى **قابلة للطي**.

---

## ٣. [[console.count]]: الدالة دي بتتنادى كام مرة؟

~~~js
for (const r of rows) console.count('صف');
~~~

~~~text الناتج (اتشغّل فعلًا)
صف: 1
صف: 2
صف: 3
~~~

حطها جوه دالة بتشك إنها بتتنادى أكتر من اللازم. الرقم بيجاوب على طول.

---

## ٤. [[console.time]]: قيس بدل ما تخمّن

~~~js
console.time('المعالجة');
// ... الشغل
console.timeLog('المعالجة', 'بعد التحميل');   // بتطبع من غير ما توقف
// ... شغل تاني
console.timeEnd('المعالجة');
~~~

> **الاسم لازم يتطابق** بين [[time]] و [[timeEnd]]. ولو مش متطابق، بيطلّع تحذير ومبيطبعش.

---

## ٥. [[console.dir]] لما [[log]] تقول [[[Object]]]

~~~js المشكلة
console.log(deepObject);
// { a: { b: { c: [Object] } } }
~~~

~~~js الحل في Node
console.dir(deepObject, { depth: null });
~~~

[[console.log]] بتقف عند عمق **٢** افتراضيًا. و [[{ depth: null }]] بتعرض الكل.

~~~js أو غيّر الافتراضي مرة واحدة
import util from 'node:util';
util.inspect.defaultOptions.depth = null;
~~~

وفي المتصفح، [[console.dir]] على عنصر DOM بتعرض **صفاته**، و [[console.log]] بتعرضه كـ HTML.

---

## ٦. والباقي

| الدالة | بتعمل إيه |
|---|---|
| [[console.assert(c, m)]] | تطبع **بس لو الشرط غلط** |
| [[console.trace()]] | تطبع سلسلة النداءات من غير ما ترمي |
| [[console.warn]] / [[error]] | بتروح على **stderr** في Node |
| [[console.groupCollapsed]] | مجموعة مطوية (في المتصفح) |

[[console.trace]] بتجاوب على «مين نادى الدالة دي؟» من غير debugger.

---

## ٧. وفي الإنتاج

[[console.log]] في Node بيكتب على stdout، وده **متزامن** على الملفات في بعض الأنظمة. فلوب فيها آلاف الطباعات بتبطّأ البرنامج فعلًا.

في الإنتاج استخدم مكتبة لوج (زي [[pino]]) — بتكتب غير متزامن وبتطلّع JSONL تقدر تقراه بأداة (زي [[jl]] في مشروع node).

---

## الخلاصة

- [[table]] لأي مصفوفة كائنات.
- [[count]] لعدد النداءات، و [[time]] للوقت.
- [[dir(x, { depth: null })]] لما تشوف [[[Object]]].
- [[trace]] لـ «مين ناداني؟».
- [[console.log]] مش للإنتاج.`,
          sol: R`[[console.table]] بناتجها الحقيقي، و [[group]] و [[count]].`,
          solCode: R`console.table(rows);
// ┌─────────┬──────────┬───────┬─────┐
// │ (index) │ اسم      │ سعر   │ عدد │
// ├─────────┼──────────┼───────┼─────┤
// │ 0       │ 'لابتوب' │ 15000 │ 2   │
// │ 1       │ 'ماوس'   │ 250   │ 10  │
// │ 2       │ 'شاشة'   │ 4200  │ 3   │
// └─────────┴──────────┴───────┴─────┘

console.group('الطلب #12');
console.log('العميل: أحمد');
//   الطلب #12
//     العميل: أحمد

for (const r of rows) console.count('صف');
// صف: 1
// صف: 2
// صف: 3

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "اقرا رسالة الخطأ في JavaScript",
          title: "الرسالة بتقول اسم المتغير، و cause بتربط السبب",
          learn: R`تفك الأخطاء الشائعة من رسالتها، وتربط الخطأ بسببه.`,
          out: R`تحل أغلب أخطاء JavaScript من السطر الأول.`,
          use: {
            prog: R`[[Cannot read properties of undefined (reading 'name')]] بتقولك حاجتين: اللي قبل النقطة [[undefined]]، واللي بعدها [[name]]. ودول نص الإجابة.`,
            work: R`الخطأ اللي بيترمي من غير [[cause]] بيضيّع السبب الحقيقي. وبعد شهر بتلاقي «حصل خطأ» في اللوج ومعرفش ليه.`,
            cs: R`سلسلة الأسباب (exception chaining) موجودة في كل لغة. وفي JavaScript اسمها [[cause]]، وهي من ES2022.`,
          },
          desc: R`أخطاء JavaScript أوضح مما الناس فاكرة. المشكلة إن الناس بتقرا آخر سطر بس.

**الأخطاء اللي هتقابلها:**

[[TypeError: Cannot read properties of undefined (reading 'name')]] — حاولت تقرا [[.name]] من حاجة قيمتها [[undefined]]. والرسالة بتقولك **اسم الصفة** اللي حاولت تقراها، فده بيحدد السطر.

[[TypeError: o.a is not a function]] — [[o.a]] موجودة بس مش دالة. غالبًا خطأ في الاسم أو في الاستيراد.

[[ReferenceError: x is not defined]] — الاسم ده مش موجود خالص. غير [[undefined]]: دي قيمة، ودي اسم مش معرّف.

[[SyntaxError: Expected property name or '}' in JSON at position 1]] — JSON مكسور، **والموضع فيه**.

**والفرق بين [[TypeError]] و [[ReferenceError]] مهم:**

[[undefined.x]] → [[TypeError]]: المتغير موجود وقيمته [[undefined]].
[[notDeclared]] → [[ReferenceError]]: الاسم نفسه مش موجود.

**و [[cause]]** (من ES2022) بتربط الخطأ بسببه:

[[throw new Error('ملف الإعدادات مكسور', { cause: e })]]

وبعدها [[e.cause]] فيها الخطأ الأصلي كامل. من غيرها، لو مسكت [[SyntaxError]] ورميت [[Error]] جديد، السبب الحقيقي بيضيع.`,
          example: R`// الأخطاء الشائعة
const u = undefined;  u.name;          // TypeError
const n = null;       n.name;          // TypeError
const o = { a: 1 };   o.a();           // TypeError
notDefinedAnywhere;                     // ReferenceError
JSON.parse('{bad}');                    // SyntaxError

// و cause بتربط الخطأ بسببه
try {
  JSON.parse('{bad}');
} catch (e) {
  throw new Error('ملف الإعدادات مكسور', { cause: e });
}`,
          lines: [
            R`[[u]] قيمته [[undefined]] وبنقرا منه [[name]]، فالرسالة [[Cannot read properties of undefined (reading 'name')]]. اقراها كده: كنت بتقرا [[name]]، واللي قبل النقطة كان [[undefined]]. فدوّر ليه المتغير ده فاضي، مش على [[name]].`,
            R`نفس المشكلة بس القيمة [[null]]، فالرسالة بتقول [[of null]] بدل [[of undefined]]. الفرق ده بيدلّك: [[null]] غالبًا جاية من [[querySelector]] ملقاش العنصر أو API رجّع null، و [[undefined]] غالبًا متغير مالوش قيمة أو خاصية مش موجودة.`,
            R`[[o.a]] موجودة بس قيمتها [[1]] مش دالة، فلما تحط [[()]] بعدها الرسالة [[o.a is not a function]]. الرسالة بتقولك الاسم اللي ناديته بالظبط، فاطبع قيمته أو [[typeof]] بتاعه وشوف هو إيه فعلًا.`,
            R`اسم عمره ما اتعرّف بـ [[let]] أو [[const]] أو [[function]] في أي مكان، فده [[ReferenceError]] برسالة [[notDefinedAnywhere is not defined]]. غالبًا غلطة إملائية في الاسم، أو متغير متعرّف في scope تاني.`,
            R`JSON مكسور: المفاتيح في JSON لازم بين علامات تنصيص مزدوجة. الرسالة [[Expected property name or '}' in JSON at position 1]] بتقولك المكان بالظبط: الحرف رقم 1 (العد من صفر)، يعني [[b]].`,
            R`[[try]] حوالين الحاجة اللي ممكن ترمي، عشان نمسكها ونضيف عليها معلومة تفهّم اللي هيقرا.`,
            R`نفس الـ parse البايظ: هيرمي SyntaxError والتنفيذ ينط على [[catch]].`,
            R`[[catch]] بتمسك الـ SyntaxError في [[e]].`,
            R`بنرمي error جديد برسالة بتقول **إيه** اللي باظ من ناحية التطبيق (ملف الإعدادات)، و [[{ cause: e }]] بتربطه بالأصلي. من غيرها اللي يقرا الـ log هيشوف «ملف الإعدادات مكسور» بس وميعرفش السبب؛ معاها Node بيطبع الـ SyntaxError الأصلي تحت كلمة [[cause]].`,
            R`نهاية الـ catch.`,
          ],
          try: R`شغّل كل سطر لوحده في [[node -e]] واقرا الرسالة. وبعدين جرّب [[cause]]: ارمي خطأ من جوه [[catch]] مرة بيها ومرة من غيرها، وقارن اللي بيوصل للي بره.`,
          ref: [
            { t: "MDN: JavaScript error reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors" },
            { t: "MDN: TypeError", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError" },
            { t: "MDN: ReferenceError", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError" },
            { t: "MDN: Error: cause", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause" },
            { t: "Node.js: Errors", url: "https://nodejs.org/api/errors.html" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب [[errorKind(fn)]] بتنادي الدالة جوه [[try]] وترجّع [[e.name]] أو [[ok]]. قبل ما تشغّل، اكتب توقعك لـ [[() => undefined.x]] و [[() => notDefined]] و [[() => JSON.parse('{bad}')]] و [[() => null()]] و [[() => 1]].`, done: R`الناتج: [[TypeError]] و [[ReferenceError]] و [[SyntaxError]] و [[TypeError]] و [[ok]]، ومكتوب جنب كل واحدة الفرق في سطر (القيمة [[undefined]] غير الاسم اللي مش موجود).`, sol: R`**التوقع:** [[TypeError]] و [[ReferenceError]] و [[SyntaxError]] و [[TypeError]] و [[ok]].

~~~js error-kind.js
function errorKind(fn) {
  try {
    fn();
    return "ok";
  } catch (e) {
    return e.name;
  }
}

const cases = [
  ["() => undefined.x", () => undefined.x],
  ["() => notDefined", () => notDefined],
  ["() => JSON.parse('{bad}')", () => JSON.parse("{bad}")],
  ["() => null()", () => null()],
  ["() => 1", () => 1],
];
for (const [label, fn] of cases) console.log(label.padEnd(28), errorKind(fn));

// الرسايل نفسها، عشان تشوف الفرق
for (const [label, fn] of cases.slice(0, 4)) {
  try { fn(); } catch (e) { console.log(e.name + ": " + e.message); }
}
~~~

~~~text الناتج (node error-kind.js، Node 24)
() => undefined.x            TypeError
() => notDefined             ReferenceError
() => JSON.parse('{bad}')    SyntaxError
() => null()                 TypeError
() => 1                      ok
TypeError: Cannot read properties of undefined (reading 'x')
ReferenceError: notDefined is not defined
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
TypeError: null is not a function
~~~

**الفرق في سطر لكل واحدة:**

| الكود | النوع | ليه |
|---|---|---|
| [[undefined.x]] | TypeError | القيمة موجودة وهي [[undefined]]، والغلط إنك عملت عليها عملية مينفعش (تقرا property) |
| [[notDefined]] | ReferenceError | الاسم نفسه مش موجود في أي scope، JS مش لاقية متغير أصلًا |
| [[JSON.parse('{bad}')]] | SyntaxError | النص مش JSON صح: بعد [[{]] لازم اسم بين علامات تنصيص |
| [[null()]] | TypeError | نفس عيلة الأولى: القيمة [[null]] واتعاملت كأنها function |
| [[() => 1]] | ok | مفيش error، فـ [[errorKind]] رجّعت [["ok"]] |

**القاعدة اللي تمشي بيها:** TypeError = «القيمة نوعها غلط للي بتعمله» (وأول حاجة تبص عليها: مين اللي قبل النقطة أو القوسين). ReferenceError = «الاسم ده مش موجود» (غلطة كتابة، أو import ناقص، أو متغير برّه الـ scope). SyntaxError من [[JSON.parse]] = الداتا مش الكود.

**سطور الرسايل** بتوريك إن الرسالة نفسها بتقول المكان: [[(reading 'x')]] اسم الـ property، و [[at position 1]] رقم الحرف في النص.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[function parseConfig(t) { try { return JSON.parse(t); } catch (e) { throw new Error('الإعدادات مكسورة'); } }]]. اللوج في الإنتاج بيقول «الإعدادات مكسورة» بس ومحدش عارف فين. صلّحها من غير ما تشيل الرسالة العربي.`, done: R`بعد التصليح: [[e.cause instanceof SyntaxError]] بترجّع [[true]]، و [[e.cause.message]] فيها [[at position 1]] لما تبعت [[{bad}]]. ولو سبت الخطأ يطلع من غير [[catch]]، Node بيطبع السبب تحت الرسالة في سطر فيه [[cause]] و [[SyntaxError]].`, sol: R`~~~js parse-config.js
function parseConfigBad(t) {
  try { return JSON.parse(t); } catch (e) { throw new Error('الإعدادات مكسورة'); }
}
function parseConfig(t) {
  try { return JSON.parse(t); } catch (e) { throw new Error('الإعدادات مكسورة', { cause: e }); }
}

try { parseConfigBad('{bad}'); } catch (e) { console.log("البايظ:", e.message, "| cause:", e.cause); }

try { parseConfig('{bad}'); } catch (e) {
  console.log("المصلّح:", e.message);
  console.log(e.cause instanceof SyntaxError, "|", e.cause.message);
}

parseConfig('{bad}');   // من غير catch: Node بيطبع الخطأ والسبب
~~~

~~~text الناتج (node parse-config.js، المسار اتقصّر لـ C:\lab وسطور node:internal الأخيرة اتشالت)
البايظ: الإعدادات مكسورة | cause: undefined
المصلّح: الإعدادات مكسورة
true | Expected property name or '}' in JSON at position 1 (line 1 column 2)
C:\lab\parse-config.js:5
  try { return JSON.parse(t); } catch (e) { throw new Error('الإعدادات مكسورة', { cause: e }); }
                                            ^

Error: الإعدادات مكسورة
    at parseConfig (C:\lab\parse-config.js:5:51)
    at Object.<anonymous> (C:\lab\parse-config.js:15:1)
    ... 6 lines matching cause stack trace ...
    at node:internal/main/run_main_module:33:47 {
  [cause]: SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
      at JSON.parse (<anonymous>)
      at parseConfig (C:\lab\parse-config.js:5:21)
      at Object.<anonymous> (C:\lab\parse-config.js:15:1)
      at Module._compile (node:internal/modules/cjs/loader:1929:14)
      ...
}

Node.js v24.22.1
~~~

**التصليح كلمة واحدة:** [[{ cause: e }]] كتاني argument لـ [[new Error]]. الرسالة العربي زي ما هي (دي اللي اليوزر أو اللوج يشوفها)، والخطأ الأصلي محفوظ جواها في [[e.cause]].

- **البايظ:** [[cause]] بـ undefined. الـ [[SyntaxError]] اتمسك واترمى، ومعاه ضاع «فين بالظبط» (position 1).
- **المصلّح:** [[e.cause instanceof SyntaxError]] بـ true، و [[e.cause.message]] فيها [[at position 1]].
- **من غير catch:** Node طبع الـ stack بتاع الخطأ الخارجي، وتحته سطر بيبدأ بـ [[cause]] بين قوسين مربعين وجنبه الـ SyntaxError بالـ stack بتاعه. [[... 6 lines matching cause stack trace ...]] معناها إن Node شال السطور المكررة بين الاتنين.

**ليه مش [[throw e]] وخلاص:** كده هتفقد الرسالة اللي بتقول «إيه اللي كنا بنعمله» (الإعدادات). الـ cause بيدّيك الاتنين: المعنى من فوق، والسبب التقني من تحت.

**الغلطة الشائعة:** [[new Error('الإعدادات مكسورة: ' + e.message)]]. الرسالة بتبقى أطول بس الـ stack والنوع بتوع الأصلي بيضيعوا، ومتقدرش تعمل [[instanceof SyntaxError]] بعدها.` },
            { lvl: 'تحدي', t: R`**ابني ومسألة:** [[class ValidationError extends Error]] فيها [[field]]، وسلسلة ٣ مستويات بـ [[cause]] (ValidationError ← Error ← SyntaxError). واكتب [[printChain(e)]] بتمشي على [[cause]] وتطبع كل مستوى في سطر.`, done: R`بتطبع ٣ سطور بالترتيب من برا لجوه بالشكل [[Name: message]]، ولو [[cause]] نص بتطبعه زي ما هو وتقف، ولو فيه دايرة (خطأ [[cause]] بتاعه هو نفسه) بتقف بعد ١٠ مستويات بدل ما تعلّق.`, sol: R`~~~js chain.js
class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);          // options فيه cause، و Error بيحطه لوحده
    this.name = "ValidationError";
    this.field = field;
  }
}

function printChain(e, max = 10) {
  let cur = e;
  for (let depth = 0; depth < max && cur != null; depth++) {
    if (cur instanceof Error) {
      console.log("  ".repeat(depth) + cur.name + ": " + cur.message);
      cur = cur.cause;
    } else {
      console.log("  ".repeat(depth) + String(cur));   // cause نص (أو أي قيمة): اطبعه واقف
      return;
    }
  }
  if (cur != null) console.log("… وقفت بعد " + max + " مستويات (غالبًا دايرة)");
}

function loadUser(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("ملف اليوزر مش JSON", { cause: e });
  }
  return data;
}
try {
  try {
    loadUser('{"email": ');
  } catch (e) {
    throw new ValidationError("email", "الإيميل مش مقروء", { cause: e });
  }
} catch (e) {
  console.log("field =", e.field);
  printChain(e);
}

console.log("--- cause نص");
printChain(new Error("فشل الحفظ", { cause: "الديسك مليان" }));

console.log("--- دايرة");
const loop = new Error("أنا السبب");
loop.cause = loop;
printChain(loop);
~~~

~~~text الناتج (node chain.js)
field = email
ValidationError: الإيميل مش مقروء
  Error: ملف اليوزر مش JSON
    SyntaxError: Unexpected end of JSON input
--- cause نص
Error: فشل الحفظ
  الديسك مليان
--- دايرة
Error: أنا السبب
  Error: أنا السبب
    Error: أنا السبب
      Error: أنا السبب
        Error: أنا السبب
          Error: أنا السبب
            Error: أنا السبب
              Error: أنا السبب
                Error: أنا السبب
                  Error: أنا السبب
… وقفت بعد 10 مستويات (غالبًا دايرة)
~~~

**كل حتة:**

- **[[class ValidationError extends Error]]:** [[super(message, options)]] بيبعت الـ [[{ cause }]] لـ [[Error]] اللي بيحطه على [[this.cause]] لوحده. [[this.name]] لازم يتكتب بإيدك، وإلا هيطلع [["Error"]]. و [[field]] معلومة زيادة اللي بيمسك الخطأ يقدر يستخدمها (يلوّن الحقل في الفورم مثلًا).
- **السلسلة ٣ مستويات:** [[JSON.parse]] رمى SyntaxError ← [[loadUser]] لفّه في Error ← اللي فوق لفّه في ValidationError. كل مستوى بيضيف معنى من غير ما يضيّع اللي تحته.
- **[[printChain]]:** بتمشي على [[cur = cur.cause]] لحد ما يبقى null، وكل مستوى بإزاحة أكبر عشان الترتيب من برّه لجوه يبان.
- **cause نص:** الـ [[cause]] ممكن يبقى أي قيمة مش لازم Error. لو مش Error بنطبعه زي ما هو ونقف، لأن مفيش [[.cause]] تاني نكمّل منه.
- **الدايرة:** [[loop.cause = loop]] بيعمل سلسلة لا نهائية. الـ [[max]] بيوقف بعد ١٠ ويقول السبب، بدل ما البرنامج يعلّق. (بديل أدق: [[Set]] بالأخطاء اللي شفناها، وتقف أول ما واحد يتكرر.)

**الغلطة الشائعة:** [[while (e.cause)]] من غير حد، فأول دايرة تعلّق البرنامج. أو تنسى [[this.name]] فكل أخطاءك تطلع [[Error:]] ومتعرفش أنهي نوع.` },
          ],
          flag: "console",
          deep: {
            why: R`الوقت اللي بيضيع في نسخ الرسالة في جوجل أطول من قرايتها. والرسالة بتقولك اسم الصفة واسم المتغير.`,
            how: R`**[[Cannot read properties of undefined (reading 'x')]]** جزئين:

[[undefined]] — **نوع** الحاجة اللي على اليسار.
[[reading 'x']] — **اسم** الصفة اللي حاولت تقراها.

فلو السطر فيه [[a.b.c.d]]، الرسالة بتقولك أنهي واحدة هي الـ [[undefined]] عن طريق اللي بعدها.

**والحل المعتاد**: [[?.]] (optional chaining). [[a?.b?.c]] بترجّع [[undefined]] بدل ما ترمي. بس **خد بالك**: دي بتخفي المشكلة أحيانًا — لو [[a]] المفروض تكون موجودة، الـ [[?.]] بتخلي الخطأ يظهر بعدين وفي مكان تاني.

**[[TypeError]] مقابل [[ReferenceError]]**:

| الحالة | النوع |
|---|---|
| المتغير موجود وقيمته [[undefined]] | [[TypeError]] |
| الاسم مش معرّف خالص | [[ReferenceError]] |
| متغير [[let]] قبل سطر تعريفه | [[ReferenceError: Cannot access 'x' before initialization]] |

والأخيرة دي اسمها temporal dead zone، وبتحصل مع [[let]] و [[const]] مش [[var]].

**[[cause]]** من ES2022، ومدعومة في Node 16.9+ وكل المتصفحات الحديثة. وبتتعرض في الـ stack trace تلقائيًا في Node:

~~~text
Error: ملف الإعدادات مكسور
    at ...
  [cause]: SyntaxError: Expected property name or '}' in JSON at position 1
~~~

**وكلاسات الأخطاء بتاعتك**: ورّث من [[Error]] وحط [[this.name]]:

~~~text
class HttpError extends Error {
  constructor(status) { super($__btHTTP $__{status}$__bt); this.name = 'HttpError'; this.status = status; }
}
~~~

و [[instanceof]] بتشتغل عليها، فتقدر تفرّق بين أنواع الفشل في [[catch]]. (ودي اللي هنبنيها في المشروع.)

**و [[Error.captureStackTrace]]** في Node بتشيل الـ constructor من الـ stack، فالسطر الأول يبقى مكان الرمي الحقيقي.`,
            when: R`كل خطأ. و [[cause]] في أي [[catch]] بترمي منه خطأ جديد.`,
            mistakes: R`تحط [[?.]] في كل مكان فتخفي المشاكل بدل ما تحلها. أو ترمي خطأ جديد من غير [[cause]] فتضيّع السبب. أو تخلط بين [[TypeError]] و [[ReferenceError]] وتدوّر في المكان الغلط.`
          },
          teach: R`## الرسالة بتقول أكتر مما تفتكر

~~~text اتشغّلوا فعلًا · Node 24
undefined.x      -> TypeError: Cannot read properties of undefined (reading 'name')
null.x           -> TypeError: Cannot read properties of null (reading 'name')
مش دالة          -> TypeError: o.a is not a function
متغير مش معرّف   -> ReferenceError: notDefinedAnywhere is not defined
JSON غلط         -> SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

---

## ١. فك أول رسالة

~~~text
Cannot read properties of undefined (reading 'name')
                          ^^^^^^^^^           ^^^^
                          نوع اللي            الصفة اللي
                          على اليسار          حاولت تقراها
~~~

فلو السطر [[user.profile.name]]:

- [[reading 'name']] معناها إن [[user.profile]] هي الـ [[undefined]].
- **مش** [[user]] — لو [[user]] كانت undefined، الرسالة كانت هتقول [[reading 'profile']].

**الرسالة بتحدد الحلقة المكسورة في السلسلة.**

---

## ٢. [[TypeError]] مقابل [[ReferenceError]]

| الحالة | النوع | معناه |
|---|---|---|
| [[u.x]] و [[u === undefined]] | [[TypeError]] | المتغير موجود، قيمته فاضية |
| [[notDeclared]] | [[ReferenceError]] | **الاسم مش موجود خالص** |
| [[let]] قبل سطر تعريفه | [[ReferenceError]] | temporal dead zone |

الفرق بيحدد مكان البحث: الأولى في **البيانات**، والتانية في **الكود**.

~~~text والتالتة شكلها
ReferenceError: Cannot access 'x' before initialization
~~~

وبتحصل مع [[let]] و [[const]] بس، مش [[var]].

---

## ٣. [[?.]] بتحل، وأحيانًا بتخبّي

~~~js
const name = user?.profile?.name;   // undefined بدل ما ترمي
~~~

مفيدة لما الغياب **متوقّع**. وخطر لما يكون مش متوقّع:

~~~js
const id = response?.data?.user?.id;   // لو undefined، هتعرف فين؟
~~~

لو [[response.data]] المفروض تكون موجودة دايمًا، الـ [[?.]] بتخلي الخطأ يظهر **بعدين وفي مكان تاني**. وساعتها التشخيص أصعب.

> القاعدة: [[?.]] للغياب المتوقّع، و**سيب الخطأ يرمي** للغياب اللي معناه بق.

---

## ٤. [[cause]]: متضيّعش السبب

~~~js من غيرها — السبب ضاع
try { JSON.parse(raw); }
catch (e) { throw new Error('ملف الإعدادات مكسور'); }
~~~

~~~js بيها
try { JSON.parse(raw); }
catch (e) { throw new Error('ملف الإعدادات مكسور', { cause: e }); }
~~~

~~~text الناتج (اتشغّل فعلًا)
ملف الإعدادات مكسور
  السبب: SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

**الرسالة بتقول المشكلة، و [[cause]] بتقول السبب.** والاتنين محتاجين بعض: «ملف الإعدادات مكسور» من غير السبب مش بتساعد، و [[SyntaxError at position 1]] من غير السياق مش بتساعد.

و Node بيعرضها في الـ stack تلقائيًا:

~~~text
Error: ملف الإعدادات مكسور
    at loadConfig (...)
  [cause]: SyntaxError: Expected property name or '}' in JSON at position 1
~~~

---

## ٥. وكلاسات أخطاء بتاعتك

~~~js
class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} على $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}
~~~

وبعدها تقدر تفرّق في الـ [[catch]]:

~~~js
catch (e) {
  if (e instanceof HttpError && e.status === 404) { ... }
  else if (e instanceof NetworkError) { ... }
  else throw e;
}
~~~

**و [[else throw e]] مهمة**: اللي متعرفوش رميه تاني، متبلعوش.

ودي بالظبط اللي هنبنيها في المشروع الجاي.

---

## الخلاصة

- [[reading 'x']] بتحدد الحلقة المكسورة.
- [[TypeError]] = بيانات، [[ReferenceError]] = كود.
- [[?.]] للغياب المتوقّع بس.
- [[cause]] في أي [[catch]] بترمي منه.
- كلاسات أخطاء + [[instanceof]] + [[else throw e]].`,
          sol: R`الأخطاء الشائعة برسايلها الحقيقية، و [[cause]] وهي بتحفظ السبب.`,
          solCode: R`// (اتشغّلوا فعلًا على Node 24.22.1)
// undefined.x      -> TypeError: Cannot read properties of undefined (reading 'name')
// null.x           -> TypeError: Cannot read properties of null (reading 'name')
// o.a()            -> TypeError: o.a is not a function
// notDefined       -> ReferenceError: notDefinedAnywhere is not defined
// JSON.parse('{bad}') -> SyntaxError: Expected property name or '}' in JSON at position 1

try {
  try { JSON.parse('{bad}'); }
  catch (e) { throw new Error('ملف الإعدادات مكسور', { cause: e }); }
} catch (e) {
  console.log(e.message);
  console.log('  السبب:', e.cause.name + ':', e.cause.message);
}
// ملف الإعدادات مكسور
//   السبب: SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)`
        },
        {
          cmd: "breakpoints و node --inspect و source maps",
          title: "breakpoint بشرط، و logpoint، و Chrome DevTools على Node، و source maps",
          learn: R`توقّف الكود عند البند الغلط بس، وتطبع من غير ما تعدّل الكود، وتوصّل DevTools بـ Node، وتقرا stack الكود المضغوط بأسطر الملف الأصلي.`,
          out: R`تلاقي البند اللي بيبوّظ الحساب من أول توقّف، والـ stack trace بيشاور على [[src/cart.ts:6]] مش [[dist/cart.js:1:523]].`,
          use: {
            prog: R`درس «debugger» في أول التاب علّمك تحط breakpoint وتمشي سطر سطر. ده الخطوة اللي بعدها: لما اللوب فيها ألف بند وانت عايز تقف عند البند الغلط بس.`,
            work: R`الكود اللي بيتنشر مضغوط (minified) في سطر واحد. من غير source map، الـ stack بتاع الإنتاج بيقولك [[at c (cart.js:1:523)]] وده مش بيقول حاجة.`,
            cs: R`الـ debugger بيكلم البرنامج بـ protocol اسمه Chrome DevTools Protocol على WebSocket. عشان كده نفس DevTools بتاعة Chrome بتعرف تتحكم في Node.`,
          },
          desc: R`لما breakpoint عادي يوقف ألف مرة في لوب، استخدم **conditional breakpoint**: بيوقف بس لما شرط تكتبه يبقى [[true]]، زي [[Number.isNaN(it.price * it.qty)]]. و **logpoint** بيطبع رسالة من غير ما يوقف ومن غير ما تلمس الكود. و [[node --inspect-brk app.js]] بيفتح باب لـ Chrome DevTools ([[chrome://inspect]]) ويستنى قبل أول سطر. و [[node --enable-source-maps]] بيخلي الـ stack trace يشاور على الملف الأصلي (TypeScript مثلًا) بدل الكود المضغوط.

ده تكملة لدرس «debugger» في وحدة «أساسيات البرمجة»: هناك اتعلمت breakpoint عادي و [[debugger;]] و [[node inspect]]. هنا هنمسك نفس الأدوات في حالات الشغل الحقيقي.

كله اتجرّب على Node 24.22.1 و esbuild 0.28.2 على ويندوز. خطوات واجهة Chrome و VS Code من الـ docs بتاعتهم.`,
          example: R`// cart.js: الإجمالي بيطلع NaN، ومش عارفين أنهي بند السبب
function total(items) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  return sum;
}
console.log(total([{ price: 10, qty: 2 }, { price: 5, qty: '3' }, { price: 7 }]));`,
          lines: [
            R`دالة بتجمع سعر كل بند في كميته. في المشروع الحقيقي الـ [[items]] جاية من API أو فورم، وممكن تبقى ألف بند، فمش هتلاقي الغلط بعينك.`,
            R`المجموع بيبدأ من صفر. لو أي بند طلّع [[NaN]]، المجموع كله هيبقى [[NaN]] من اللحظة دي وبعدها، لأن أي حساب فيه [[NaN]] بيطلّع [[NaN]].`,
            R`بنلف على البنود واحد واحد. ده المكان اللي breakpoint عادي فيه بيوقف مع كل بند، ومع ألف بند هتدوس «كمّل» ألف مرة.`,
            R`**السطر اللي هنحط عليه الـ breakpoint** (سطر 5 في الملف). [[it.qty]] لو مش موجودة بتبقى [[undefined]]، و [[7 * undefined]] بـ [[NaN]]. ولو [[qty]] نص زي [['3']]، الضرب بيحوّله رقم ويعدّي (5 × '3' = 15)، فده مش هو السبب.`,
            R`نهاية اللوب.`,
            R`بيرجّع المجموع، و [[NaN]] هنا معناه إن بند واحد على الأقل كان ناقص.`,
            R`نهاية [[total]].`,
            R`النداء بتلات بنود: الأول سليم، والتاني [[qty]] فيه نص، والتالت مفيهوش [[qty]] خالص. الناتج المطبوع [[NaN]]، والسؤال: أنهي بند؟`,
          ],
          try: R`احفظ المثال [[cart.js]] وشغّل [[node inspect cart.js]]. اكتب [[sb('cart.js', 5, 'Number.isNaN(it.price * it.qty)')]] وبعدين [[c]]: هيقف كام مرة؟ اكتب [[exec it]]. وبعدين جرّب [[node --inspect-brk cart.js]] وافتح [[chrome://inspect]] في Chrome ودوس inspect.`,
          ref: [
            { t: "Node.js: Debugger (node inspect)", url: "https://nodejs.org/api/debugger.html" },
            { t: "Node.js: Debugging Node.js", url: "https://nodejs.org/learn/getting-started/debugging" },
            { t: "Node.js: --enable-source-maps", url: "https://nodejs.org/api/cli.html#--enable-source-maps" },
            { t: "Chrome DevTools: Pause your code with breakpoints", url: "https://developer.chrome.com/docs/devtools/javascript/breakpoints" },
            { t: "MDN: debugger", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger" },
            { t: "MDN: Source map", url: "https://developer.mozilla.org/en-US/docs/Glossary/Source_map" },
            { t: "esbuild: sourcemap", url: "https://esbuild.github.io/api/#sourcemap" },
          ],
          pre: [
            { to: "js/for...of و for...in", why: R`الـ breakpoint بالشرط بيوقف جوه loop على عنصر معيّن، فلازم تكون فاهم الـ loop بيلف إزاي` },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على المثال، قبل ما تشغّل، اكتب الـ breakpoint بالشرط [[typeof it.qty !== 'number']] هيوقف كام مرة وعند أنهي بنود، وقيمة [[sum]] عند كل توقّف. بعدين شغّلها بـ [[node inspect]].`, done: R`وقف مرتين: عند [[{ price: 5, qty: '3' }]] و [[sum]] بـ 20، وعند [[{ price: 7 }]] و [[sum]] بـ 35. وكاتب ليه البند التاني وقف رغم إنه مش السبب (الشرط عن النوع مش عن [[NaN]]).`, sol: R`**التوقع:** يوقف مرتين. الأولى عند [[{ price: 5, qty: '3' }]] و [[sum]] بـ 20 (البند الأول اتجمع: 10 × 2). والتانية عند [[{ price: 7 }]] و [[sum]] بـ 35 (البند التاني اتجمع: 5 × "3" = 15 لأن [[*]] بيحوّل النص لرقم).

~~~js cart.js
// cart.js: الإجمالي بيطلع NaN، ومش عارفين أنهي بند السبب
function total(items) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  return sum;
}
console.log(total([{ price: 10, qty: 2 }, { price: 5, qty: '3' }, { price: 7 }]));
~~~

**التشغيل بـ [[node inspect]]** (الـ debugger اللي جوه Node نفسه، في الترمنال من غير أي editor):

~~~text الأوامر اللي اتكتبت جوه debug>
setBreakpoint('cart.js', 5, "typeof it.qty !== 'number'")
cont
exec [JSON.stringify(it), sum]
cont
exec [JSON.stringify(it), sum]
cont
.exit
~~~

~~~text الناتج (node inspect cart.js، Node 24، السطور المهمة)
debug> Break on start in cart.js:9
debug> break in cart.js:5
  3   let sum = 0;
  4   for (const it of items) {
> 5     sum += it.price * it.qty;
  6   }
  7   return sum;
debug> [ '{"price":5,"qty":"3"}', 20 ]
debug> break in cart.js:5
> 5     sum += it.price * it.qty;
debug> [ '{"price":7}', 35 ]
debug> < NaN
~~~

**كل أمر:**

- **[[node inspect cart.js]]:** بيشغّل السكربت واقف على أول سطر ([[Break on start]]) ومستنيك.
- **[[setBreakpoint('cart.js', 5, "...")]]:** breakpoint على السطر 5 ومعاه شرط: يوقف بس لو الشرط true. (اختصاره [[sb]].) [[help]] جوه [[debug>]] بيقول بس «Set a breakpoint»؛ الـ argument التالت (الشرط) مكتوب في وثائق Node، صفحة Debugger، قسم Breakpoints: «It is also possible to set a conditional breakpoint that only breaks when a given expression evaluates to true»، ومعاه المثال [[setBreakpoint('script.js', 1, 'num < 4')]].
- **[[cont]]** (أو [[c]]): كمّل لحد الـ breakpoint الجاي. البند الأول [[qty: 2]] رقم فالشرط false ومحصلش وقوف.
- **[[exec ...]]:** بيقيّم expression في الـ scope الحالي. [[JSON.stringify(it)]] عشان يبان إن الـ qty نص بعلامات تنصيص.
- آخر [[cont]]: البرنامج كمّل وطبع [[NaN]] (السطر اللي بيبدأ بـ [[<]] هو ناتج البرنامج نفسه).

**ليه البند التاني وقف وهو مش السبب:** الشرط بيسأل عن **النوع** ([[typeof]])، و [["3"]] نص فوقف. بس [[5 * "3"]] بـ 15 رقم سليم، فالبند ده مش اللي عمل NaN. البند التالت ملوش [[qty]] خالص: [[7 * undefined]] بـ NaN، وأي حاجة + NaN بـ NaN. لو عايز توقف على السبب بالظبط: [[Number.isNaN(it.price * it.qty)]] بيوقف مرة واحدة عند [[{ price: 7 }]].

**الغلطة الشائعة:** تحط breakpoint من غير شرط في loop وتفضل تدوس [[cont]] ٥٠٠ مرة. الشرط هو اللي بيخلي الـ breakpoint ينفع في loops كبيرة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اعمل [[orders.json]] فيه ٥٠٠ طلب ([[{ id, price, qty }]]) بسكربت صغير، وخلّي ٣ طلبات عشوائية ناقصها [[qty]]. لاقيهم بـ logpoint واحد بيطبع [[it.id]] بس لما الحساب [[NaN]]، من غير ما تعدّل سطر في الكود.`, done: R`الكود ما اتلمسش ([[git diff]] فاضي)، والترمنال طبع ٣ سطور بالظبط فيهم الـ [[id]] التلاتة اللي خليتهم ناقصين، والبرنامج ما وقفش ولا مرة.`, sol: R`**١. الداتا:** سكربت بيعمل ٥٠٠ طلب ويشيل [[qty]] من ٣ عشوائي، ويطبع الـ ids اللي اتشالت عشان تقارن بيها بعدين:

~~~js make-orders.js
// بيعمل orders.json فيه 500 طلب، و 3 منهم عشوائي من غير qty
const fs = require("node:fs");
const orders = Array.from({ length: 500 }, (_, i) => ({
  id: 1000 + i,
  price: Math.round(Math.random() * 500 + 10),
  qty: 1 + Math.floor(Math.random() * 5),
}));
const broken = new Set();
while (broken.size < 3) broken.add(Math.floor(Math.random() * orders.length));
for (const i of broken) delete orders[i].qty;
fs.writeFileSync("orders.json", JSON.stringify(orders, null, 1));
console.log("الطلبات الناقصة:", [...broken].sort((a, b) => a - b).map((i) => orders[i].id).join(", "));
~~~

~~~js total-orders.js
const orders = require("./orders.json");

function total(items) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  return sum;
}
console.log("الإجمالي:", total(orders));
~~~

~~~text الناتج (node make-orders.js ثم node total-orders.js)
الطلبات الناقصة: 1133, 1313, 1376
الإجمالي: NaN
~~~

(الأرقام بتتغير كل مرة تشغّل [[make-orders.js]] لأنها عشوائية.)

**٢. الـ logpoint من الترمنال:** Node 24 فيه وضع اسمه probe في [[node inspect]] (لقيته في [[node inspect --help]] تحت «Non-interactive probe mode»): بيقيّم expression كل ما التنفيذ يعدّي على سطر، ويطبع النتيجة، ومن غير ما يوقف البرنامج. ده نفس فكرة الـ logpoint في Chrome DevTools و VS Code.

~~~bash
node inspect --probe total-orders.js:6 --expr "it.id" --cond "Number.isNaN(it.price * it.qty)" total-orders.js
~~~

~~~text الناتج (المسار اتقصّر لـ C:/lab)
Hit 1 at file:///C:/lab/total-orders.js:6:15
  it.id = 1133
Hit 2 at file:///C:/lab/total-orders.js:6:15
  it.id = 1313
Hit 3 at file:///C:/lab/total-orders.js:6:15
  it.id = 1376
Completed
~~~

٣ سطور بالظبط، ونفس الـ ids اللي [[make-orders.js]] طبعها.

- **[[--probe total-orders.js:6]]:** السطر اللي فيه [[sum += ...]] (رقم 6 في الملف ده، مش 5 زي مثال الدرس، لأن فيه سطر [[require]] فوق).
- **[[--expr "it.id"]]:** اللي يتطبع. **[[--cond "..."]]:** يتطبع بس لما الحساب NaN، فالـ ٤٩٧ طلب السليمين مبيظهروش.
- **مبيوقفش:** وضع الـ probe non-interactive، فالبرنامج بيكمّل لآخره و [[Completed]] في الآخر.

**٣. الكود ما اتلمسش:**

~~~bash
git diff --stat
~~~

مطلعش ولا حرف (الملفات كانت متعملها commit قبل التشغيل).

**نفس الكلام في DevTools** (لو بتحب الواجهة): [[node --inspect-brk total-orders.js]]، وافتح [[chrome://inspect]] ودوس inspect، وفي Sources كليك يمين على رقم السطر 6 ← Add conditional breakpoint، واكتب [[Number.isNaN(it.price * it.qty) && (console.log(it.id), false)]]: الـ [[console.log]] بيطبع، والـ [[false]] في الآخر بيخلي الـ breakpoint ميوقفش، يعني logpoint بشرط. (خطوات الواجهة دي من وثائق Chrome DevTools؛ اللي اتشغّل فعلًا هنا هو أمر الـ probe اللي فوق.)

**الغلطة الشائعة:** تزوّد [[console.log]] جوه الـ loop وتنسى تشيله، أو يطبع ٥٠٠ سطر وتدوّر فيهم بعينك.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ابني [[src/cart.ts]] بـ [[npx esbuild src/cart.ts --bundle --minify --platform=node --outfile=dist/cart.js]] مرة من غير [[--sourcemap]] ومرة بيها، وخلّي الدالة ترمي error لبند ناقص. شغّل كل نسخة بـ [[node]] وبـ [[node --enable-source-maps]].`, done: R`عندك جدول ٤ خانات بأول سطر [[at]] في كل حالة: من غير map الاتنين بيقولوا [[dist/cart.js:1:...]]، ومع map و [[--enable-source-maps]] بيقول [[src/cart.ts]] بسطر الـ [[throw]] الحقيقي واسم الدالة الأصلي بدل الحرف المضغوط. وكاتب حجم [[cart.js.map]].`, sol: R`~~~ts src/cart.ts
type Item = { name: string; price: number; qty?: number };

function lineTotal(item: Item): number {
  if (item.qty === undefined) {
    throw new Error($__btالبند "$__{item.name}" ناقصه qty$__bt);
  }
  return item.price * item.qty;
}

export function cartTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

console.log(cartTotal([
  { name: "كيبورد", price: 900, qty: 1 },
  { name: "ماوس", price: 250 },
]));
~~~

**البناء مرتين** (كل نسخة في فولدر عشان الاتنين يفضلوا موجودين للمقارنة):

~~~bash
npm i -D esbuild
npx esbuild src/cart.ts --bundle --minify --platform=node --outfile=dist/nomap/cart.js
npx esbuild src/cart.ts --bundle --minify --platform=node --sourcemap --outfile=dist/map/cart.js
~~~

~~~text الناتج (esbuild 0.25.12)
  dist\nomap\cart.js  818b 

  dist\map\cart.js      851b 
  dist\map\cart.js.map  1.1kb
~~~

**التشغيل ٤ مرات:** [[node dist/nomap/cart.js]] و [[node --enable-source-maps dist/nomap/cart.js]] وبعدين نفس الاتنين على [[dist/map/cart.js]]. أول سطرين من كل stack (المسار اتقصّر لـ C:\lab):

| النسخة | [[node]] | [[node --enable-source-maps]] |
|---|---|---|
| من غير map | [[at q (C:\lab\dist\nomap\cart.js:1:503)]] | [[at q (C:\lab\dist\nomap\cart.js:1:503)]] |
| مع map | [[at q (C:\lab\dist\map\cart.js:1:503)]] | [[at lineTotal (C:\lab\src\cart.ts:5:11)]] |

وحجم [[cart.js.map]]: 1162 byte (اللي esbuild كتبه 1.1kb).

**القراية:**

- **من غير map:** السطر 1 والعمود 503، لأن الـ minify حط الكود كله في سطر واحد، واسم الدالة [[q]] لأن [[lineTotal]] اتضغط. [[--enable-source-maps]] مش هيعمل حاجة لأن مفيش map يقرا منه.
- **مع map بس من غير الـ flag:** نفس الشكل البايظ. Node مبيقراش الـ source maps لوحده (عشان التكلفة)، لازم تطلبها.
- **مع الاتنين:** [[src/cart.ts:5:11]] هو سطر الـ [[throw]] الحقيقي في ملف الـ TypeScript، والاسم [[lineTotal]] رجع. الـ map فيه جدول بيقول «العمود 503 في السطر 1 = السطر 5 في cart.ts»، وفيه أسامي الدوال الأصلية.
- **[[--sourcemap]] زوّد سطر واحد في آخر [[cart.js]]** ([[//# sourceMappingURL=cart.js.map]])، وده سبب إن الحجم بقى 851 بدل 818.

**إمتى تستخدمه:** في الـ production على Node شغّل بـ [[--enable-source-maps]] (أو [[NODE_OPTIONS=--enable-source-maps]]) عشان اللوج يقولك الملف والسطر الحقيقي. في المتصفح DevTools بيقرا الـ map لوحده لو موجود جنب الملف.

**الغلطة الشائعة:** تبني بـ [[--sourcemap]] وتفتكر خلاص، وتفضل تشوف [[cart.js:1:503]] في اللوج لأنك نسيت الـ flag. أو ترفع الـ [[.map]] على سيرفر عام وانت مش عايز الكود الأصلي يبان (الـ map فيه المصدر كامل).` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** على [[cart.js]] بتاع قسم «logpoint من الترمنال»، لاقي الصنف اللي بيبوّظ الإجمالي بأمر [[node inspect --probe]] **واحد** يطبع الصنف ده بس، من غير ما تعدّل الملف ومن غير ما تعدّ اللفات بعينك.`, done: R`الأمر بيطبع [[Hit 1]] واحدة بس، فيها [[item = {name: "مياه", price: 12, qty: 3}]]، وبعدها [[Completed]].`, sol: R`~~~bash
node inspect --probe cart.js:11 --expr "item" --cond "Number.isNaN(line)" cart.js
~~~

~~~text الناتج (Node 24.22، المسار اتقصّر لـ …/)
Hit 1 at …/cart.js:11:3
  item = {name: "مياه", price: 12, qty: 3}
Completed
~~~

**ليه كده:**

- [[--probe cart.js:11]]: السطر [[total += line]]. وقتها [[line]] اتحسب خلاص (السطر اللي قبله اتنفّذ)، فنقدر نسأل عليه. لو حطيته على سطر ١٠ هتاخد [[ReferenceError]] أول مرة لأن [[line]] لسه في الـ TDZ.
- [[--expr "item"]]: عايز الصنف نفسه مش الرقم، عشان تعرف تصلّح إيه.
- [[--cond "Number.isNaN(line)"]]: الـ probe بيسجّل بس لما الشرط يبقى true، فبدل ٤ مرات بتاخد المرة اللي فيها المشكلة. و [[Number.isNaN]] مش [[line === NaN]]، لأن [[NaN]] مبيساويش نفسه (درس «number و NaN»)، فالتانية عمرها ما هتطلع true والأمر بيطبع [[Missed probes: cart.js:11]] (اتجرّب)، كأن السطر ماتنفّذش.

**الغلطة الشائعة:** تكتب الشرط [[line === NaN]] فتطلعلك [[Missed probes]]، فتفتكر إن رقم السطر غلط والسطر سليم. أو تنسى إن البرنامج نفسه بيطبع [[الإجمالي: NaN]] في التشغيل العادي بس: في وضع الـ probe الـ output بتاعه مبيظهرش.

والتصليح بعد ما عرفت السبب: [[(item.fee ?? 0)]] بدل [[item.fee]]، فالإجمالي يبقى ٢٣٩.` },
          ],
          flag: "script",
          deep: {
            why: R`[[console.log]] في لوب فيها ألف بند بيطبع ألف سطر، وبيخليك تعدّل الكود وتنسى تمسح. والـ breakpoint العادي بيوقف ألف مرة. الشرط بيخليك تسأل البرنامج سؤال محدد: «وقّف لما الحساب يبوظ». والـ source map بيخلي أخطاء الإنتاج تتقري أصلًا.`,
            how: R`**الشرط بيتنفّذ جوه البرنامج نفسه**، في نفس الـ scope بتاع السطر: يعني [[it]] و [[sum]] متاحين فيه. الـ debugger بيقيّمه كل مرة السطر ده هيتنفّذ، ولو طلع truthy بيوقف. ولو الشرط نفسه رمى error (زي [[it.x.y]] و [[it.x]] مش موجودة)، DevTools بتعتبره false ومبتوقفش، فاكتب شرط آمن.

**والـ logpoint** في الحقيقة conditional breakpoint شرطه [[console.log(...)]]: [[console.log]] بترجّع [[undefined]] (falsy)، فبيطبع ومبيوقفش. ده اللي عملناه في [[node inspect]] بالظبط، و Chrome و VS Code عاملين له زرار لوحده.

**[[--inspect]] و [[--inspect-brk]] و [[--inspect-wait]]:**

| الخيار | بيعمل إيه |
|---|---|
| [[--inspect]] | يفتح البورت ويكمّل على طول. سكربت قصير بيخلص قبل ما تلحق توصّل |
| [[--inspect-brk]] | يفتح البورت **ويوقف قبل أول سطر** لحد ما تدوس كمّل |
| [[--inspect-wait]] | يستنى لحد ما debugger يتوصّل، وبعدين يكمّل من غير توقّف |
| [[--inspect=9230]] | بورت تاني غير 9229، لو بتشغّل برنامجين |

والبورت بيفتح على [[127.0.0.1]] بس. **متفتحوش على [[0.0.0.0]]**: أي حد يوصل للبورت ده يقدر يشغّل أي كود على جهازك بصلاحيات البرنامج (تحذير صريح في docs بتاعة Node). ولو محتاج تـ debug سيرفر بعيد، استخدم SSH tunnel: [[ssh -L 9229:127.0.0.1:9229 server]].

**الـ source map** ملف JSON (النسخة 3)، فيه [[sources]] (الملفات الأصلية)، و [[names]] (الأسماء الأصلية قبل الضغط)، و [[mappings]] (نص مضغوط بـ Base64 VLQ بيقول كل حتة في الناتج جت من أنهي سطر وعمود في الأصل). وآخر سطر في [[cart.js]] بيقول مكانه: [[//# sourceMappingURL=cart.js.map]]. والمتصفح بيقراه لوحده لما DevTools مفتوحة، و Node محتاج [[--enable-source-maps]] (أو [[NODE_OPTIONS=--enable-source-maps]]).`,
            when: R`conditional breakpoint: لوب كبير والغلط في بند واحد. logpoint: عايز تتبع قيمة من غير ما تعدّل الكود أو في كود مش بتاعك. [[--inspect-brk]]: سكربت Node أو سيرفر محتاج DevTools كاملة (Watch و Call Stack و Memory). source maps: أي كود بيتعمله build (TypeScript، bundler، minify) في التطوير وفي لوج الإنتاج.`,
            mistakes: R`تشغّل [[node --inspect cart.js]] على سكربت قصير وتستغرب إن مفيش حاجة وقفت: خلص وطبع [[NaN]] قبل ما DevTools توصل، استخدم [[--inspect-brk]]. وتسيب [[debugger;]] في الكود وتفتكر إنه مش مضر: هو فعلًا مبيعملش حاجة من غير debugger متوصّل، بس أي حد فاتح DevTools هيقف عنده، فامسحه قبل الـ commit. وتفتح [[--inspect=0.0.0.0]] على سيرفر. وتنشر [[.map]] فيه [[sourcesContent]] على الموقع العام فالكود الأصلي كله يبقى متاح لأي حد. وتنسى [[--enable-source-maps]] فتفتكر الـ map مش شغال.`
          },
          teach: R`## الخطوة اللي بعد درس «debugger»

في درس «debugger» (وحدة «أساسيات البرمجة») حطيت breakpoint عادي، و [[debugger;]]، وشغّلت [[node inspect]] ومشيت سطر سطر. هنا نفس الأدوات في تلات مشاكل بتقابلك كل يوم:

1. اللوب فيها ألف بند، والغلط في واحد.
2. البرنامج سيرفر أو سكربت Node، وعايز DevTools كاملة مش ترمنال.
3. الكود اللي بيقع اتعمله build، والـ stack بيقول [[cart.js:1:523]].

كله اتشغّل على Node 24.22.1 على ويندوز.

---

## ١. conditional breakpoint: وقّف عند البند الغلط بس

breakpoint عادي على سطر 5 ([[sum += it.price * it.qty;]]) بيوقف مع كل بند. الشرط بيخليه يوقف بس لما الحساب يبوظ:

~~~text node inspect cart.js (اللي بعد debug> هو اللي اتكتب)
debug> sb('cart.js', 5, 'Number.isNaN(it.price * it.qty)')
debug> c
break in cart.js:5
  3   let sum = 0;
  4   for (const it of items) {
> 5     sum += it.price * it.qty;
  6   }
  7   return sum;
debug> exec it
{ price: 7 }
debug> exec sum
35
~~~

- [[sb('cart.js', 5, '...')]]: اختصار [[setBreakpoint]]: الملف، والسطر، والشرط كنص JavaScript.
- [[c]]: كمّل ([[cont]]). عدّى أول بندين من غير ما يوقف، ووقف عند التالت بس.
- [[exec it]]: البند اللي وقف عنده: [[{ price: 7 }]]، مفيهوش [[qty]]. **ده السبب.**
- [[exec sum]]: [[35]] = 10×2 + 5×3. يعني البند التاني ([[qty: '3']] نص) اتحسب صح، والضرب حوّله رقم.

### في Chrome و VS Code (من الـ docs)

| الأداة | إزاي |
|---|---|
| Chrome DevTools | Sources، كليك يمين على رقم السطر، و Add conditional breakpoint، واكتب الشرط |
| VS Code | كليك يمين على يسار رقم السطر، و Add Conditional Breakpoint، وتختار Expression |
| VS Code بعدد مرات | نفس القايمة، و Hit Count بيوقف بعد عدد مرات معيّن (زي البند رقم 500) |

> الشرط بيتنفّذ في نفس الـ scope بتاع السطر، فـ [[it]] و [[sum]] و [[items]] متاحين فيه. ولو الشرط نفسه رمى error، بيتحسب false ومش هيوقف خالص، فاكتبه آمن ([[it?.qty]] بدل [[it.qty.x]]).

---

## ٢. logpoint: اطبع من غير ما تعدّل الكود

الـ logpoint بيطبع رسالة كل ما السطر يتنفّذ، **ومبيوقفش**. مفيش [[console.log]] تنسى تمسحه قبل الـ commit.

وفي الحقيقة هو breakpoint شرطه [[console.log(...)]]. و [[console.log]] بترجّع [[undefined]]، يعني false، فبيطبع ويكمّل:

~~~text node inspect cart.js
debug> sb('cart.js', 5, 'console.log("[logpoint]", JSON.stringify(it), "sum =", sum)')
debug> c
< [logpoint] {"price":10,"qty":2} sum = 0
< [logpoint] {"price":5,"qty":"3"} sum = 20
< [logpoint] {"price":7} sum = 35
< NaN
~~~

- السطور اللي بتبدأ بـ [[<]] هي اللي البرنامج طبعها (مش الـ debugger).
- تلات سطور، واحد لكل لفة، وبعدهم [[NaN]] بتاع البرنامج نفسه. والملف ما اتلمسش.

| الأداة | الـ logpoint فيها |
|---|---|
| Chrome DevTools | كليك يمين على رقم السطر، و Add logpoint، واكتب تعبير زي [['it', it]] |
| VS Code | Add Logpoint، والمتغيرات بين أقواس معقوفة زي [[it = {it.price}]] (من docs بتاعة VS Code) |
| الترمنال (Node 24) | [[node inspect --probe]]، القسم اللي جاي |

### logpoint من الترمنال: [[node inspect --probe]]

من Node 24 فيه طريقة أسرع من الـ logpoint اليدوي: [[node inspect]] بيشغّل البرنامج، ويقيّم تعبير كل مرة التنفيذ يوصل لسطر معيّن، ويطبع النتايج، من غير ما توقّف البرنامج ولا تكتب حرف في الملف. ملف المعمل ([[cart.js]]): سلة فيها صنف ناقصه رسوم التوصيل، فالإجمالي بيطلع [[NaN]]:

~~~js cart.js
const items = [
  { name: "قهوة", price: 45, qty: 2, fee: 5 },
  { name: "كرواسون", price: 38, qty: 1, fee: 5 },
  { name: "مياه", price: 12, qty: 3 },
  { name: "كيكة", price: 60, qty: 1, fee: 5 },
];

let total = 0;
for (const item of items) {
  const line = item.price * item.qty + item.fee;
  total += line;
}
console.log("الإجمالي:", total);
~~~

~~~bash
node cart.js
node inspect --probe cart.js:11 --expr "total" cart.js
~~~

~~~text الناتج (Node 24.22 على Windows، والمسار اتقصّر لـ …/)
الإجمالي: NaN
Hit 1 at …/cart.js:11:3
  total = 0
Hit 2 at …/cart.js:11:3
  total = 95
Hit 3 at …/cart.js:11:3
  total = 138
Hit 4 at …/cart.js:11:3
  total = NaN
Completed
~~~

- [[--probe cart.js:11]]: الملف ورقم السطر (من 1). اسم الملف بيتطابق مع آخر المسار، فـ [[cart.js]] كفاية حتى لو الملف جوه فولدرات. وتقدر تزوّد العمود بعد نقطتين تانيين.
- [[--expr "total"]]: التعبير اللي يتقيّم عند السطر، وفي نفس الـ scope بتاعه. لازم ييجي على طول بعد [[--probe]] بتاعه.
- وبعدهم اسم البرنامج نفسه ([[cart.js]]).
- **القيمة اللي بتتطبع هي قبل ما السطر يتنفّذ:** أول مرة [[total = 0]] مع إن الصنف الأول اتحسب، لأن [[total += line]] لسه ماتنفّذتش. فالـ [[NaN]] ظهر في المرة الرابعة، يعني الصنف التالت هو اللي بوّظه.
- **الـ output بتاع البرنامج نفسه بيختفي:** [[الإجمالي: NaN]] ظهرت في التشغيل العادي بس، ومش في stdout ولا stderr في وضع الـ probe. فشغّل البرنامج مرة عادي لو محتاج تشوف اللي بيطبعه.
- [[Completed]] معناها البرنامج خلص، والـ exit code صفر.

**الـ options اللي بتختصر الطريق (كلهم اتجرّبوا على نفس الملف):**

| الأمر | اللي طلع |
|---|---|
| [[--expr "[item.name, typeof item.price, line]"]] | array كل مرة: [[["مياه", "number", NaN]]] في المرة التالتة |
| [[--expr "item" --cond "Number.isNaN(line)"]] | مرة واحدة بس: [[item = {name: "مياه", price: 12, qty: 3}]]: الصنف اللي ناقصه [[fee]] على طول |
| [[--max-hit 1]] | أول مرة بس وبعدين بيفصل، والبرنامج بيكمّل لوحده |
| [[--probe cart.js:11 --expr "line" --probe cart.js:13 --expr "total"]] | أكتر من probe في أمر واحد: ٤ مرات لـ [[line]] ومرة لـ [[total = NaN]] |
| [[--json]] | نفس النتايج JSON: [[{"probe":0,"event":"hit","hit":1,…,"result":{"type":"number","value":0}}]] |
| [[--probe nope.js:3 …]] | [[Missed probes: nope.js:3]]: السطر عمره ما اتنفّذ أو الملف غلط |

**فخ الـ [[let]] و [[const]]:** لو حطيت الـ probe على سطر التعريف نفسه ([[--probe cart.js:10 --expr "line"]])، أول مرة بيطلع [[ReferenceError: Cannot access 'line' from debugger]]، لأن [[line]] لسه في الـ TDZ (درس «hoisting و TDZ»): الـ probe بيشتغل قبل السطر. والمرات اللي بعدها بتطبع قيمة اللفة اللي فاتت. الحل: حط الـ probe على السطر اللي بعد التعريف، زي ما الـ help بتاع Node نفسه بيقول.

وفي PowerShell نفس الأمر بالظبط، بس التعبير بين علامتين مفردين لو فيه علامات تنصيص مزدوجة: [[node inspect --probe cart.js:11 --expr 'item.name' cart.js]].

---

## ٣. [[debugger;]] بيوقف بس لو فيه حد بيسمع

~~~text d.js
let x = 1;
debugger;
console.log("كمّل عادي، x =", x);
~~~

~~~text node d.js
كمّل عادي، x = 1
~~~

من غير debugger متوصّل، السطر ده مالوش أي أثر. بس أي حد فاتح DevTools على الصفحة هيقف عنده، فامسحه قبل الـ commit (أداة lint زي ESLint عندها قاعدة [[no-debugger]] بتمسكه).

---

## ٤. [[node --inspect]] و Chrome DevTools

[[node inspect]] (من غير الشرطتين) debugger نصي في الترمنال. و [[--inspect]] (بالشرطتين) بيفتح باب لأي debugger تاني، وأشهرهم Chrome DevTools.

### [[--inspect]] لوحده: السكربت خلص قبل ما توصل

~~~text node --inspect cart.js
Debugger listening on ws://127.0.0.1:9229/650a04e4-ad1d-4f58-b006-a9314e329449
For help, see: https://nodejs.org/learn/getting-started/debugging
NaN
~~~

طبع [[NaN]] وخرج على طول. [[--inspect]] بيفتح البورت ويكمّل، فمناسب لسيرفر شغال على طول، مش لسكربت بيخلص في ملي ثانية.

### [[--inspect-brk]]: استنى قبل أول سطر

~~~text node --inspect-brk cart.js
Debugger listening on ws://127.0.0.1:9229/97d1013c-ddb2-4bb1-ba37-031642798c98
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

ومفيش [[NaN]]: البرنامج واقف قبل سطر 9 لحد ما debugger يتوصّل ويقول كمّل.

| الحتة | معناها |
|---|---|
| [[ws://]] | WebSocket: الاتصال اللي الـ debugger بيتكلم عليه مع البرنامج |
| [[127.0.0.1]] | بيسمع على جهازك بس، محدش من الشبكة يوصله |
| [[9229]] | البورت الافتراضي، وتغيّره بـ [[--inspect-brk=9230]] |
| [[97d1013c-...]] | id عشوائي جديد كل تشغيلة، عشان صفحة ويب متخمّنش العنوان |

### توصّل Chrome (من docs بتاعة Node و Chrome)

1. افتح [[chrome://inspect]] في Chrome.
2. تحت Remote Target هتلاقي [[cart.js]]، دوس **inspect**.
3. هتفتح DevTools فيها Sources و Console و Memory، والبرنامج واقف على أول سطر. والترمنال بيطبع [[Debugger attached.]].
4. حط breakpoints (عادي أو بشرط) زي أي صفحة، ودوس F8 عشان يكمّل.

Chrome بيعرف البرنامج منين؟ بيسأل [[http://127.0.0.1:9229/json/list]]. جرّبتها بـ [[curl]] والبرنامج واقف على بورت 9240:

~~~text curl -s http://127.0.0.1:9240/json/list (جزء)
"description": "node.js instance",
"title": "cart.js",
"type": "node",
"webSocketDebuggerUrl": "ws://127.0.0.1:9240/56841089-8979-4353-bfe1-4aa4ec1ce3fd"
~~~

| الخيار | إمتى |
|---|---|
| [[--inspect]] | سيرفر شغال على طول وعايز توصّل وقت ما تحب |
| [[--inspect-brk]] | سكربت قصير، أو الغلط في أول ما البرنامج يقوم |
| [[--inspect-wait]] | يستنى لحد ما debugger يتوصّل، وبعدين يكمّل من غير ما يوقف على أول سطر |

> **متكتبش [[--inspect=0.0.0.0]] على سيرفر.** جرّبتها والرسالة بقت [[ws://0.0.0.0:9231/...]]: أي حد يوصل للبورت ده يقدر يشغّل أي كود جوه البرنامج. ولو محتاج تـ debug سيرفر بعيد: [[ssh -L 9229:127.0.0.1:9229 user@server]] وبعدين [[chrome://inspect]] على جهازك.

### Pause on exceptions

في Sources في DevTools فيه اختيار «Pause on uncaught exceptions» (و «caught» كمان). بيوقف البرنامج **في السطر اللي رمى** والمتغيرات لسه موجودة، بدل ما تقرا الـ stack بعد ما كل حاجة ماتت. (من docs بتاعة Chrome.)

---

## ٥. source maps: الـ stack يشاور على الملف الأصلي

الكود اللي بيتنشر بيتعمله build: TypeScript بيتحول JS، والـ bundler بيجمّع الملفات ويضغطها في سطر واحد. فالـ error بيقول مكان في الناتج مش في الكود اللي انت كتبته.

~~~text src/cart.ts
type Item = { price: number; qty?: number };

export function total(items: Item[]): number {
  let sum = 0;
  for (const it of items) {
    if (it.qty === undefined) throw new Error($__btqty ناقصة في بند سعره $__{it.price}$__bt);
    sum += it.price * it.qty;
  }
  return sum;
}

console.log(total([{ price: 10, qty: 2 }, { price: 7 }]));
~~~

~~~text npx esbuild src/cart.ts --bundle --minify --platform=node --sourcemap --outfile=dist/cart.js
  dist\cart.js      771b
  dist\cart.js.map  916b
~~~

| الحتة | معناها |
|---|---|
| [[--bundle]] | اجمع الملف وكل اللي بيستورده في ملف واحد |
| [[--minify]] | اضغط: شيل المسافات وغيّر الأسماء لحروف ([[total]] بقت [[c]]) |
| [[--platform=node]] | الناتج هيشتغل على Node مش في المتصفح |
| [[--sourcemap]] | اعمل [[cart.js.map]] جنبه، وحط في آخر [[cart.js]] سطر بيقول مكانه |

### من غير [[--enable-source-maps]]

~~~text node dist/cart.js
Error: qty ناقصة في بند سعره 7
    at c (C:\...\sm\dist\cart.js:1:523)
    at Object.<anonymous> (C:\...\sm\dist\cart.js:1:677)
~~~

[[c]] و [[1:523]]: الدالة اسمها حرف، والمكان السطر الوحيد عند الحرف رقم 523. مش هتعرف ده فين في الكود بتاعك.

### معاه

~~~text node --enable-source-maps dist/cart.js
C:\...\sm\src\cart.ts:6
    if (it.qty === undefined) throw new Error($__btqty ناقصة في بند سعره $__{it.price}$__bt);
                              ^

Error: qty ناقصة في بند سعره 7
    at total (C:\...\sm\src\cart.ts:6:37)
    at Object.<anonymous> (C:\...\sm\src\cart.ts:12:13)
~~~

- [[src/cart.ts:6:37]]: الملف الأصلي، السطر 6 اللي فيه [[throw]]، والعمود 37.
- [[at total]]: اسم الدالة الأصلي رجع، من [[names]] اللي في الـ map.
- وفوق، Node طبع السطر الأصلي نفسه وسهم تحت مكان الرمي.

و [[NODE_OPTIONS=--enable-source-maps node dist/cart.js]] بتدّي نفس النتيجة، ودي اللي بتتحط في السيرفر أو الـ Dockerfile.

### جوه الـ map

~~~text آخر سطر في dist/cart.js
//# sourceMappingURL=cart.js.map
~~~

~~~text مفاتيح cart.js.map
version          3
sources          [ '../src/cart.ts' ]
names            [ 'cart_exports', '__export', 'total', '__toCommonJS', 'items', 'sum' ]
sourcesContent   (نسخة من الكود الأصلي كله)
mappings         4ZAAA,IAAAA,EAAA,GAAAC,...
~~~

| المفتاح | فيه إيه |
|---|---|
| [[sources]] | الملفات الأصلية اللي الناتج جه منها |
| [[names]] | الأسماء قبل الضغط، ومنها [[total]] رجعت مكان [[c]] |
| [[mappings]] | نص مضغوط (Base64 VLQ) بيربط كل حتة في الناتج بسطر وعمود في الأصل |
| [[sourcesContent]] | الكود الأصلي نفسه، عشان DevTools تعرضه حتى لو الملفات مش عندك |

- لما شلت الـ [[.map]] من جنب الملف، [[--enable-source-maps]] رجع يطبع [[dist/cart.js:1:523]]: لازم الملف يبقى موجود في المكان اللي السطر الأخير بيقوله.
- في المتصفح، DevTools بتقرا الـ map لوحدها وبتعرض [[cart.ts]] في Sources، وتحط breakpoint فيه كأنه الكود اللي بيتنفّذ.
- **وفي الإنتاج:** الـ map فيه كودك كله ([[sourcesContent]]). لو مش عايز الكود يبقى متاح للناس، متنشرهوش على الموقع العام، وارفعه لأداة تتبّع الأخطاء بس (Sentry مثلًا) أو استخدم [[--sourcemap=external]] من غير ما تنشر الـ [[.map]].

---

## الخلاصة

| المشكلة | الأداة |
|---|---|
| لوب كبير والغلط في بند واحد | conditional breakpoint بشرط زي [[Number.isNaN(...)]] |
| عايز تتبّع قيمة من غير تعديل | logpoint |
| سكربت Node وعايز DevTools كاملة | [[node --inspect-brk app.js]] و [[chrome://inspect]] |
| سيرفر شغال | [[--inspect]] على [[127.0.0.1]]، ومن بعيد بـ SSH tunnel |
| stack الكود المضغوط مش بيتقري | [[--sourcemap]] في الـ build و [[--enable-source-maps]] في Node |

- [[debugger;]] مالوش أثر من غير debugger متوصّل، بس امسحه قبل الـ commit.
- الشرط اللي بيرمي error بيتحسب false: اكتبه آمن.
- الـ [[.map]] فيه كودك كله: فكّر قبل ما تنشره.`,
          sol: R`الـ breakpoint بالشرط [[Number.isNaN(it.price * it.qty)]] وقف **مرة واحدة** بس، عند [[{ price: 7 }]] و [[sum]] بـ [[35]]: البند ده مفيهوش [[qty]]. والبند [[qty: '3']] مش السبب لأن الضرب حوّله رقم.

و [[node --inspect-brk cart.js]] طبع [[Debugger listening on ws://127.0.0.1:9229/...]] ومطبعش [[NaN]] لأنه واقف قبل أول سطر لحد ما Chrome يتوصّل من [[chrome://inspect]].`,
          solCode: R`// node inspect cart.js   (Node 24.22.1، اتشغّل فعلًا)
// debug> sb('cart.js', 5, 'Number.isNaN(it.price * it.qty)')
// debug> c
// break in cart.js:5
// debug> exec it
// { price: 7 }
// debug> exec sum
// 35

// والتصليح: البند الناقص يترفض بدل ما يبوّظ المجموع بصمت
function total(items) {
  let sum = 0;
  for (const it of items) {
    const qty = Number(it.qty);
    if (!Number.isFinite(qty)) throw new Error($__btالكمية ناقصة في بند سعره $__{it.price}$__bt);
    sum += it.price * qty;
  }
  return sum;
}
// total([{ price: 10, qty: 2 }, { price: 5, qty: '3' }])  ->  35
// ولو فيه { price: 7 }  ->  Error: الكمية ناقصة في بند سعره 7`
        }
      ]
    }
]);
