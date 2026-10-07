// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "ملفات كبيرة وشغل تقيل",
      l: 3,
      n: "ملفات أكبر من الرام بـ streams، وتصدير CSV و Excel، وفاتورة PDF عربي، وحسابات تقيلة من غير ما السيرفر يهنّج، و request id في كل لوج",
      items: [
        {
          cmd: "streams و pipeline",
          title: "ملف ٢ جيجا من غير ما الرام تتملى",
          desc: R`[[fs.readFile]] بيحط الملف كله في الذاكرة مرة واحدة. الـ stream بيقراه حتة حتة (64KB افتراضيًا): تعالج الحتة وترميها وتاخد اللي بعدها، فالذاكرة ثابتة مهما كان حجم الملف.

[[pipeline]] من [[node:stream/promises]] بيوصّل streams ورا بعض (اقرا ← حوّل ← اضغط ← اكتب)، وبيتعامل مع الـ backpressure والأخطاء، وبيقفل الكل لو واحد فشل. و [[readline]] مع [[for await]] بيدّيك الملف سطر سطر.`,
          example: R`import { createReadStream, createWriteStream } from "node:fs";
import { createInterface } from "node:readline";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

export async function importUsers(path) {
  const lines = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  let batch = [], total = 0, header = true;
  for await (const line of lines) {
    if (header) { header = false; continue; }
    const [, email] = line.split(",");
    batch.push({ email });
    if (batch.length === 1000) {
      total += (await db.user.createMany({ data: batch, skipDuplicates: true })).count;
      batch = [];
    }
  }
  if (batch.length) total += (await db.user.createMany({ data: batch, skipDuplicates: true })).count;
  return total;
}

await pipeline(createReadStream("export.csv"), createGzip(), createWriteStream("export.csv.gz"));`,
          try: R`اعمل ملف CSV فيه ٢ مليون سطر (سكربت بيكتب بـ [[write]] ويستنى [[drain]])، وبعدين احسب مجموع عمود بطريقتين: [[readFileSync(...).split("\n")]]، و readline. اطبع [[process.memoryUsage().rss]] في آخر كل واحدة. وبعدين اضغط الملف بـ pipeline وقارن الحجم.`,
          flag: "script",
          deep: {
            why: R`استيراد عملاء من Excel، وتصدير طلبات السنة، ورفع فيديو، ولوجات: كلها ملفات ممكن تبقى أكبر من الرام المتاحة للـ container. [[readFile]] على ملف ٥٠٠ ميجا في container حده ٥١٢ ميجا معناه crash. وحتى لو الرام كفاية، ٣ يوزرز بيرفعوا مع بعض كفاية يوقّعوا السيرفر.`,
            how: R`جربناها على CSV حجمه ٥٨ ميجا (٢ مليون سطر): [[readFileSync]] ثم [[split("\n")]] ثم [[split(",")]] وصل الـ RSS لـ ٥٧٩ ميجا (كل سطر بقى string و array). و readline عمل نفس الحساب بـ ٨٦ ميجا. ولو الملف ٢٠ ضعف، الأولى هتقع والتانية تقريبًا نفس الرقم.

الـ backpressure: لو القراية أسرع من الكتابة (ديسك سريع وشبكة بطيئة)، الحتت اللي اتقرت ومتكتبتش بتتكوّم في الذاكرة. [[writable.write()]] بيرجّع [[false]] لما البافر يتملى، والمفروض تستنى event الـ [[drain]] قبل ما تكتب تاني. [[pipeline]] بيعمل ده لوحده، ومعاه [[for await]] على stream بيقرا الحتة الجاية بس لما انت تخلص من اللي قبلها، فلو الداتابيز بطيئة القراية بتبطّأ معاها.

الاستيراد على دفعات: [[createMany]] كل ١٠٠٠ صف بدل insert لكل سطر (٢٠٠ ألف رحلة للقاعدة) أو [[createMany]] واحدة بالملف كله (كل الصفوف في الذاكرة تاني). و [[skipDuplicates]] بيتجاهل الإيميلات الموجودة بدل ما الدفعة كلها تفشل.

و [[pipeline]] بدل [[.pipe()]]: الـ pipe مبيمررش الأخطاء، فلو القراية فشلت الـ write stream بيفضل مفتوح والطلب معلّق. pipeline بيقفل الكل ويرمي الخطأ عشان [[await]] يمسكه. ونفس الفكرة مع HTTP: [[res]] في Express writable stream، فتقدر تعمل [[pipeline(createReadStream(file), res)]] (الدرس الجاي).

وملف CSV حقيقي فيه قيم بين [[""]] فيها فواصل وسطور جديدة: [[line.split(",")]] هنا للتوضيح بس. في الشغل استخدم parser بيدعم streams زي [[csv-parse]].`,
            when: "أي ملف ممكن يكبر: استيراد، وتصدير، ورفع، ولوجات. ولو الملف أكيد صغير (config أو JSON بـ كيلوبايتات)، readFile أبسط.",
            mistakes: R`[[multer.memoryStorage()]] للرفع الكبير، فكل ملف مرفوع في الرام (درس [[multer]]). و [[await]] لكل insert لوحده جوه الـ loop فالاستيراد ياخد ساعة. و [[.pipe()]] من غير error handling. وتقرا الـ upload كله في [[Buffer.concat]] عشان تحسب hash، والـ hash نفسه ينفع stream ([[crypto.createHash]] كـ Transform). وتعمل الاستيراد جوه الطلب نفسه فالـ request يعدّي timeout بتاع Nginx (٦٠ ثانية): الملفات الكبيرة بتروح job (درس [[background jobs]]) والـ API يرد 202.`
          },
          teach: R`## حاجتين: استيراد سطر سطر، وضغط ملف

دالة [[importUsers]] بتقرا CSV سطر سطر وتكتب اليوزرز في القاعدة كل ١٠٠٠ مرة واحدة. والسطر الأخير بيضغط ملف بـ gzip من غير ما يحطه في الذاكرة. جرّبنا كل ده على ويندوز 11 بـ Node 24: ملف حقيقي ٢ مليون سطر (٥٧.٨ ميجا) من كود الحل، و [[db]] مزيّف بيقلّد [[createMany]] بتاع Prisma (بيعد ويتجاهل الإيميل المكرر) عشان نشوف الدفعات من غير قاعدة.

---

## ١. الـ imports

| الـ import | من | بيعمل إيه |
|---|---|---|
| [[createReadStream]] و [[createWriteStream]] | [[node:fs]] | يقرا/يكتب ملف حتة حتة (64KB افتراضيًا) |
| [[createInterface]] | [[node:readline]] | يحوّل stream بايتات لسطور |
| [[createGzip]] | [[node:zlib]] | stream بيضغط اللي داخله |
| [[pipeline]] | [[node:stream/promises]] | يوصّل streams ورا بعض ويرجّع promise |

و [[node:]] قبل الاسم معناها «module جاي مع Node»، مش باكدج من npm.

---

## ٢. [[createInterface({ input: createReadStream(path), crlfDelay: Infinity })]]

من جوه لبرة:

1. [[createReadStream(path)]]: stream بيقرا الملف حتة حتة.
2. [[createInterface({ input })]]: بيلم الحتت ويطلّع سطور كاملة (السطر ممكن يتقسم على حتتين، وهو بيلزقهم).
3. [[crlfDelay: Infinity]]: ملفات ويندوز آخر السطر فيها [[\r\n]] (CR = Carriage Return، و LF = Line Feed). القيمة دي بتضمن إن [[\r\n]] دايمًا تتحسب سطر واحد مش سطرين. جرّبنا ملف بـ [[\r\n]]: الإيميلات طلعت نضيفة من غير [[\r]] في آخرها.

---

## ٣. المتغيرات

[[let batch = [], total = 0, header = true;]]: الدفعة الحالية، وعدد اللي اتكتب، وهل لسه أول سطر (العناوين). [[let]] لأنهم بيتغيروا.

---

## ٤. [[for await (const line of lines)]]

[[for await]] بتلف على حاجة async: كل لفة بتستنى السطر الجاي. والأهم: السطر الجاي **مبيتقريش** غير لما جسم اللفة يخلص. فلو [[await db.user.createMany]] أخد وقت، القراية من الديسك بتقف وتستناه، وده الـ backpressure (الضغط الراجع: الأبطأ بيبطّأ الأسرع بدل ما الحاجات تتكوّم في الذاكرة).

### جوه اللفة

- [[if (header) { header = false; continue; }]]: أول سطر عناوين ([[id,email]])، فاقلب الـ flag و [[continue]] = «روح للفة الجاية».
- [[const [, email] = line.split(",");]]: [[split(",")]] بيقسم السطر عند الفواصل لـ array، والأقواس المربعة على الشمال (array destructuring) بتوزّع عناصر الـ array على متغيرات: الفاصلة الفاضية في أولها معناها «سيب أول عنصر (الـ id)»، والتاني يروح في [[email]].
- [[batch.push({ email })]]: ضيفه للدفعة. [[{ email }]] اختصار [[{ email: email }]].
- [[if (batch.length === 1000)]]: الدفعة كملت؟ [[===]] مقارنة من غير تحويل أنواع.

### كتابة الدفعة

~~~js
total += (await db.user.createMany({ data: batch, skipDuplicates: true })).count;
batch = [];
~~~

[[createMany]] بيكتب الألف صف في أمر واحد ويرجّع [[{ count }]] (عدد اللي اتكتب فعلًا). و [[skipDuplicates: true]] يعني لو إيميل موجود (عليه unique) اتجاهله بدل ما الدفعة كلها تفشل. والسطر اللي بعده بيخلي [[batch]] array فاضية: دفعة جديدة، والقديمة مبقاش حد شايلها فالذاكرة بتتحرر.

---

## ٥. بعد اللفة

[[if (batch.length) total += ...]]: آخر دفعة غالبًا أقل من ١٠٠٠ (لو الملف ٢٠٠١ سطر، فاضل ١). [[batch.length]] لوحده كشرط: صفر = false.

جرّبنا ملف فيه ٢٠٠١ يوزر، آخر واحد إيميله متكرر:

~~~text الناتج
users.csv total 2000 createMany calls 3
~~~

٣ مرات للقاعدة (١٠٠٠ و ١٠٠٠ و ١)، والمكرر اتجاهل فالعدد ٢٠٠٠. لو كنا عملنا insert لكل سطر كان ٢٠٠١ مرة.

---

## ٦. [[await pipeline(createReadStream("export.csv"), createGzip(), createWriteStream("export.csv.gz"))]]

بالترتيب: اقرا ← اضغط ← اكتب. كل حتة بتعدّي على التلاتة وتترمي، و [[pipeline]]:

- بيستنى الكتابة لو أبطأ من القراية (backpressure).
- لو أي واحد فشل بيقفل التلاتة ويرمي الخطأ، فـ [[await]] يمسكه في [[try/catch]].
- الـ promise بيخلص لما الملف يتكتب كله.

جرّبناه على ملف الـ ٢ مليون سطر، وجرّبنا ملف مش موجود:

~~~text الناتج
csv MB 57.8 gz MB 11.2
caught: ENOENT ENOENT: no such file or directory, open '...\nope.csv'
~~~

الـ CSV اتضغط لحوالي الخُمس (نص متكرر بيتضغط كويس). و ENOENT = Error NO ENTry: الملف مش موجود، والخطأ وصل للـ [[catch]] بدل ما يعلّق.

---

## ٧. كود الحل: الفرق في الذاكرة بالأرقام

### [[gen.mjs]]: كتابة ٢ مليون سطر

~~~js
if (!out.write($__bt$__{i},user$__{i}@x.com,$__{(i % 900) + 100}\n$__bt)) await once(out, "drain");
~~~

[[out.write]] بيرجّع [[false]] لما البافر بتاع الكتابة يتملى، و [[once(out, "drain")]] (من [[node:events]]) promise بيخلص لما البافر يفضى. و [[(i % 900) + 100]]: [[%]] باقي القسمة، فالمبلغ دايمًا بين ١٠٠ و ٩٩٩. و [[2_000_000]]: الـ [[_]] للقراية بس. وفي الآخر [[out.end()]] «خلصت» و [[once(out, "finish")]] استنى لحد ما اتكتب. أخد حوالي ١٢ ثانية والـ RSS ١٣٠ ميجا.

### [[sum.mjs]] (readline) قصاد [[readFileSync]] و [[split]]

~~~text الناتج: readline
{ rows: 2000000, total: 1098930200, rssMB: 103 }
~~~

~~~text الناتج: readFileSync ثم split("\n")
{ rows: 2000000, total: 1098930200, rssMB: 389 }
~~~

نفس المجموع بالظبط، بس الطريقة التانية أكلت حوالي ٤ أضعاف. RSS = Resident Set Size: الرام اللي الـ process ماسكها فعلًا، و [[/ 1e6]] بيحوّل البايت لميجا ([[1e6]] = مليون). الـ ١٠٣ ميجا معظمها Node نفسه ثابت مهما الملف كبر، أما الـ ٣٨٩ فبتكبر مع الملف: الملف كله نص، وبعدين array فيها ٢ مليون string. (الأرقام بتختلف من جهاز لجهاز وطريقة لطريقة: الـ ٥٧٩ و ٨٦ المكتوبين في باقي الدرس من تجربة تانية، بس الفرق دايمًا كبير.)

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[createReadStream]] + [[readline]] | سطر سطر، والذاكرة ثابتة |
| [[for await]] | السطر الجاي يستنى اللي قبله يخلص (backpressure) |
| دفعات ١٠٠٠ + [[createMany]] | رحلات قليلة للقاعدة، ومن غير ما الملف كله يبقى في الذاكرة |
| [[pipeline]] | يوصّل streams ويقفل الكل ويرمي الخطأ لو حاجة فشلت |
| [[write]] بيرجّع false ← [[drain]] | لو بتكتب بإيدك، استنى البافر |

- [[split(",")]] هنا للتوضيح. CSV حقيقي فيه [[""]] وفواصل جوه القيم، فاستخدم parser زي [[csv-parse]].`,
          lines: [
            "القراية والكتابة كـ streams.",
            "readline: stream لسطور.",
            "ضغط gzip كـ stream.",
            "pipeline بـ promise.",
            "دالة الاستيراد.",
            "اقرا الملف سطر سطر، و crlfDelay عشان ملفات Windows.",
            "دفعة، والعدد، وأول سطر عناوين.",
            "كل سطر أول ما يتقري.",
            "اتخطى سطر العناوين.",
            "العمود التاني هو الإيميل (CSV بسيط، في الحقيقي استخدم parser).",
            "ضيفه للدفعة.",
            "الدفعة وصلت ١٠٠٠؟",
            "اكتبهم في أمر واحد، واتجاهل المكرر.",
            "ابدأ دفعة جديدة، والقديمة تتمسح من الذاكرة.",
            "قفلة.",
            "قفلة.",
            "آخر دفعة ناقصة.",
            "رجّع العدد.",
            "قفلة.",
            "اقرا ← اضغط ← اكتب، والـ backpressure والأخطاء على pipeline."
          ],
          sol: R`أرقام تقريبية من تجربة على ملف ٥٨ ميجا و ٢ مليون سطر: طريقة [[split]] وصلت لحوالي ٥٧٩ ميجا RSS، و readline لحوالي ٨٦ ميجا لنفس المجموع بالظبط ([[rows: 2000000]]). والنسخة المضغوطة حوالي ١١ ميجا.

الأرقام عندك هتختلف، بس الفرق لازم يبقى كبير، ولو كبّرت الملف الأولى هتكبر معاه والتانية لأ.

ولو سكربت الكتابة نفسه أكل رام كتير، يبقى بتعمل [[write]] من غير ما تستنى [[drain]]: الكتابة بتتكوّم في البافر، ودي الـ backpressure بعينها.`,
          solCode: R`// gen.mjs
import { createWriteStream } from "node:fs";
import { once } from "node:events";
const out = createWriteStream("big.csv");
out.write("id,email,amount\n");
for (let i = 1; i <= 2_000_000; i++) {
  if (!out.write($__bt$__{i},user$__{i}@x.com,$__{(i % 900) + 100}\n$__bt)) await once(out, "drain");
}
out.end();
await once(out, "finish");

// sum.mjs
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
const rl = createInterface({ input: createReadStream("big.csv"), crlfDelay: Infinity });
let total = 0, rows = 0, header = true;
for await (const line of rl) {
  if (header) { header = false; continue; }
  total += Number(line.split(",")[2]); rows++;
}
console.log({ rows, total, rssMB: Math.round(process.memoryUsage().rss / 1e6) });`
        },
        {
          cmd: "تصدير CSV و Excel",
          title: "زرار «تصدير»: CSV و Excel بيتكتبوا وهما بيتبعتوا",
          desc: R`التصدير بيقرا من القاعدة على دفعات (cursor)، ويحوّل كل صف لسطر، ويكتبه في الرد على طول. [[res.attachment("orders.csv")]] بيحط [[Content-Disposition: attachment]] فالمتصفح ينزّله كملف بدل ما يعرضه.

و Excel بـ [[exceljs]] في وضع الـ streaming: [[WorkbookWriter]] بيكتب في [[res]] مباشرة، وكل صف بيتعمله [[commit]] ويتشال من الذاكرة.`,
          example: R`import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import ExcelJS from "exceljs";

async function* ordersInBatches(size = 1000) {
  let cursor;
  while (true) {
    const batch = await db.order.findMany({ take: size, ...(cursor && { skip: 1, cursor: { id: cursor } }), orderBy: { id: "asc" }, include: { user: { select: { email: true } } } });
    if (batch.length === 0) return;
    yield* batch;
    cursor = batch.at(-1).id;
  }
}
const cell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\n\r]/.test(s) ? $__bt"$__{s.replaceAll('"', '""')}"$__bt : s;
};
async function* toCsv(rows) {
  yield "﻿id,email,amount_egp,status\n";
  for await (const o of rows) yield [o.id, o.user.email, (o.amountCents / 100).toFixed(2), o.status].map(cell).join(",") + "\n";
}

router.get("/orders.csv", requireRole("ADMIN"), async (req, res) => {
  res.attachment("طلبات-سبتمبر.csv");
  await pipeline(Readable.from(toCsv(ordersInBatches())), res);
});

router.get("/orders.xlsx", requireRole("ADMIN"), async (req, res) => {
  res.attachment("orders.xlsx");
  const wb = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res, useStyles: true });
  const ws = wb.addWorksheet("الطلبات", { views: [{ rightToLeft: true, state: "frozen", ySplit: 1 }] });
  ws.columns = [{ header: "رقم الطلب", key: "id", width: 28 }, { header: "الإيميل", key: "email", width: 30 }, { header: "المبلغ", key: "amount", width: 12, style: { numFmt: "#,##0.00" } }];
  for await (const o of ordersInBatches()) ws.addRow({ id: o.id, email: o.user.email, amount: o.amountCents / 100 }).commit();
  await wb.commit();
});`,
          try: R`اعمل ٢٥٠٠ طلب بـ [[createMany]] (واحد منهم ليوزر إيميله [[=HYPERLINK("http://evil.com","click")]])، ونزّل الـ CSV من المتصفح وافتحه في Excel. العربي باين صح؟ والإيميل الغريب اتعرض كنص ولا كلينك؟ وبعدين نزّل الـ xlsx: الشيت من اليمين للشمال والصف الأول ثابت؟`,
          flag: "script",
          deep: {
            why: R`«عايز أنزّل الطلبات Excel» من أول ٣ طلبات في أي لوحة أدمن أو نظام محاسبة. والطريقة الساذجة ([[findMany()]] من غير حد ثم [[join]] ثم [[res.send]]) شغالة على ١٠٠ صف، وبتوقّع السيرفر على ٥٠٠ ألف: كل الصفوف في الذاكرة، وبعدين النص كله، والطلب بيعدّي الـ timeout قبل ما أول بايت يوصل.`,
            how: R`[[ordersInBatches]] async generator: بيجيب ١٠٠٠ ويسلّمهم واحد واحد، وبعدين يجيب الـ ١٠٠٠ اللي بعدهم من آخر id (cursor pagination، أسرع من [[skip]] الكبير). و [[Readable.from(generator)]] بيحوّل الـ generator لـ stream، و pipeline بيوصّله بـ [[res]] بالـ backpressure: لو الشبكة بطيئة، الـ generator ميجيبش الدفعة الجاية لحد ما الرد يلحق.

[[﻿]] في الأول (BOM): من غيره Excel على Windows بيفتح الـ UTF-8 كأنه ترميز قديم والعربي يطلع رموز. و [[res.attachment(name)]] بيحط [[Content-Type]] من الامتداد، و [[Content-Disposition]] فيه [[filename]] للمتصفحات القديمة و [[filename*=UTF-8''...]] للاسم العربي (جربناها).

دالة [[cell]] فيها حاجتين. الـ escaping: أي قيمة فيها فاصلة أو [[""]] أو سطر جديد بتتحط بين [[""]] والـ [[""]] اللي جواها بتتضاعف. و CSV injection: قيمة بتبدأ بـ [[=]] أو [[+]] أو [[-]] أو [[@]] Excel بيعتبرها formula ويشغّلها، فيوزر يسمّي نفسه [[=HYPERLINK(...)]] والأدمن يدوس. الحل تحط [[']] قبلها فتبقى نص.

exceljs: [[WorkbookWriter({ stream: res })]] بيكتب الملف وهو بيتبني. و [[row.commit()]] بيكتب الصف ويشيله من الذاكرة، و [[wb.commit()]] في الآخر بيقفل الملف والـ stream. و [[rightToLeft: true]] للشيت العربي، و [[ySplit: 1]] يثبّت صف العناوين، و [[numFmt]] بيخلي المبلغ رقم حقيقي يتجمع في Excel مش نص.

تصدير بمئات الآلاف من الصفوف أو تقرير بحسابات تقيلة: متخليش الطلب يستنى. اعمل job (درس [[background jobs]])، يكتب الملف في S3، ويبعت لينك (signed URL) بالإيميل أو إشعار.`,
            when: "أي تصدير من لوحة أدمن. CSV لو هيتفتح في أي برنامج أو هيتعمله import في نظام تاني. xlsx لو اليوزر هيشتغل عليه في Excel ومحتاج أرقام وتنسيق وعربي من اليمين.",
            mistakes: R`[[findMany()]] من غير حد ثم [[res.send(csv)]]. و CSV من غير BOM فالعربي بايظ في Excel. و [[join(",")]] من غير escaping فأول عنوان فيه فاصلة يكسر الأعمدة. و CSV injection. والتصدير من غير صلاحيات، أو بيصدّر كل الأعمدة بما فيها hash الباسورد. و [[new ExcelJS.Workbook()]] العادي لملف كبير: بيبني كل حاجة في الذاكرة الأول.`
          },
          teach: R`## ٤ حتت بتتركّب ورا بعض

1. [[ordersInBatches]]: بتجيب الطلبات من القاعدة ١٠٠٠ ١٠٠٠.
2. [[cell]]: بتجهّز خانة واحدة عشان الـ CSV ميتكسرش ومحدش يحقن formula.
3. [[toCsv]]: بتحوّل كل طلب لسطر.
4. الـ routes: CSV بـ [[pipeline]]، و Excel بـ exceljs، والاتنين بيكتبوا في الرد وهما شغالين.

جرّبنا الكود ده كما هو في Express 5 على ويندوز 11 (Node 24 و exceljs 4.4)، مع [[db]] مزيّف فيه ٢٥٠٠ طلب بيقلّد [[findMany]] بتاع Prisma (take و skip و cursor)، والطلب الأول ليوزر إيميله [[=HYPERLINK("http://evil.com","click")]]، و [[requireRole]] بيعدّي الكل.

---

## ١. [[async function* ordersInBatches(size = 1000)]]

[[function*]] (بنجمة) = generator: دالة بتطلّع قيم واحدة ورا التانية بـ [[yield]] بدل [[return]] مرة واحدة. و [[async]] قبلها: بتقدر تعمل [[await]] جواها، واللي بيستخدمها بيلف عليها بـ [[for await]]. و [[size = 1000]] قيمة افتراضية.

### الـ query

~~~js
db.order.findMany({ take: size, ...(cursor && { skip: 1, cursor: { id: cursor } }), orderBy: { id: "asc" }, include: { user: { select: { email: true } } } })
~~~

| الحتة | معناها |
|---|---|
| [[take: size]] | هات ١٠٠٠ بس |
| [[...(cursor && {...})]] | أول مرة [[cursor]] فاضي فـ [[&&]] بيرجّع [[undefined]] و [[...undefined]] مبيضيفش حاجة. بعد كده بيضيف [[skip]] و [[cursor]] |
| [[cursor: { id: cursor }]] | ابدأ من الطلب ده |
| [[skip: 1]] | واتخطاه هو نفسه (اتبعت في الدفعة اللي فاتت) |
| [[orderBy: { id: "asc" }]] | ترتيب ثابت تصاعدي، من غيره الـ cursor ملوش معنى |
| [[include: { user: { select: { email: true } } }]] | هات اليوزر المرتبط، بس الإيميل بتاعه |

### باقي اللفة

- [[while (true)]] لفة من غير نهاية، والخروج منها بـ [[return]].
- [[if (batch.length === 0) return;]]: مفيش صفوف تاني؟ خلصنا.
- [[yield* batch]]: [[yield*]] (بنجمة) بتطلّع عناصر الـ array واحد واحد، كأنك كتبت [[yield]] لكل صف.
- [[cursor = batch.at(-1).id]]: [[at(-1)]] آخر عنصر. الـ id بتاعه نقطة البداية للدفعة الجاية.

والميزة: الـ generator بيقف عند كل [[yield]] لحد ما اللي بيقرا يطلب الصف الجاي. فالدفعة الجاية مبتتجابش غير لما الصفوف اللي قبلها تتكتب. في التجربة، ٢٥٠٠ صف عملوا ٤ نداءات [[findMany]]: ١٠٠٠ و ١٠٠٠ و ٥٠٠ وواحدة فاضية بتقول «خلصنا».

---

## ٢. [[cell(v)]]

~~~js
let s = String(v ?? "");
if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
return /[",\n\r]/.test(s) ? $__bt"$__{s.replaceAll('"', '""')}"$__bt : s;
~~~

1. [[v ?? ""]]: [[??]] لو [[v]] بـ [[null]] أو [[undefined]] خد [[""]]. و [[String(...)]] حوّل أي حاجة لنص.
2. الـ regex الأول: [[^]] في أوله يعني «بيبدأ بـ»، والأقواس المربعة بعدها يعني «حرف واحد من دول»: [[=]] أو [[+]] أو [[-]] (بالـ [[\]] قبلها لأنها جوه الأقواس ليها معنى) أو [[@]] أو tab أو CR. لو بيبدأ بيهم Excel بيعتبره formula، فبنحط [[']] قبله. [[.test(s)]] بترجّع true أو false.
3. الـ regex التاني: فيه [[""]] أو فاصلة أو سطر جديد؟ يبقى لازم الخانة تتحط بين [[""]]، و [[replaceAll('"', '""')]] بيضاعف أي [[""]] جوه (ده قانون CSV).

---

## ٣. [[async function* toCsv(rows)]]

- أول [[yield]]: سطر العناوين، وقبله حرف مش باين: الـ BOM (Byte Order Mark، الحرف U+FEFF). جرّبنا: أول ٣ بايتات في الملف النازل [[ef bb bf]]، ودي علامة UTF-8 اللي Excel على ويندوز بيحتاجها عشان يقرا العربي صح.
- [[for await (const o of rows)]]: لف على الـ generator اللي فات.
- [[.map(cell).join(",")]] على array فيها الخانات بالترتيب: و [[map(cell)]] عدّي كل واحدة على [[cell]]، و [[join(",")]] لزّقهم بفاصلة. و [[(o.amountCents / 100).toFixed(2)]]: المبلغ متخزن قروش، فبنقسم على ١٠٠ ونسيب رقمين عشريين.

---

## ٤. route الـ CSV

~~~js
res.attachment("طلبات-سبتمبر.csv");
await pipeline(Readable.from(toCsv(ordersInBatches())), res);
~~~

- [[res.attachment(name)]]: بيحط [[Content-Type]] من الامتداد و [[Content-Disposition: attachment]] (نزّله كملف).
- من جوه لبرة: [[ordersInBatches()]] ← [[toCsv(...)]] ← [[Readable.from(...)]] (حوّل الـ generator لـ readable stream) ← [[pipeline(..., res)]] (اكتبه في الرد، و [[res]] نفسه writable stream).

بـ [[curl -s -D - -o orders.csv http://localhost:5855/api/admin/orders.csv]] ([[-D -]] اطبع الـ headers، و [[-o]] احفظ الـ body في ملف):

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="?????-??????.csv"; filename*=UTF-8''%D8%B7%D9%84%D8%A8%D8%A7%D8%AA-%D8%B3%D8%A8%D8%AA%D9%85%D8%A8%D8%B1.csv
Transfer-Encoding: chunked
~~~

- [[filename=]] للمتصفحات القديمة: الـ header مينفعش فيه غير ASCII، فالعربي بقى [[?]].
- [[filename*=UTF-8'']] الاسم الحقيقي بالـ percent-encoding، والمتصفحات الحديثة بتقرا ده.
- [[Transfer-Encoding: chunked]]: مفيش [[Content-Length]]، لأن السيرفر مكانش يعرف الحجم وهو بيبعت. الرد بيتبعت حتت.

~~~text أول ٣ سطور من orders.csv
﻿id,email,amount_egp,status
cm000001,"'=HYPERLINK(""http://evil.com"",""click"")",10.00,PENDING
cm000002,mona@example.com,10.01,PENDING
~~~

الإيميل الخبيث بقى يبدأ بـ [[']] (مش formula)، وعشان فيه [[""]] و فواصل اتحط بين [[""]] واتضاعفت اللي جواه. والملف ٢٥٠١ سطر (عناوين + ٢٥٠٠).

---

## ٥. route الـ Excel

| السطر | بيعمل إيه |
|---|---|
| [[new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res, useStyles: true })]] | ملف xlsx بيتكتب في الرد وهو بيتبني. [[useStyles]] عشان التنسيق (numFmt) يشتغل |
| [[addWorksheet("الطلبات", { views: [...] })]] | شيت باسم عربي. [[rightToLeft: true]] من اليمين، و [[state: "frozen", ySplit: 1]] الصف الأول ثابت |
| [[ws.columns]] | array فيها كل عمود: [[header]] العنوان، و [[key]] اسم الحقل في الصف، و [[width]] العرض، و [[numFmt: "#,##0.00"]] رقم بفاصل آلاف ورقمين عشريين |
| [[ws.addRow({...}).commit()]] | ضيف صف و [[commit]] = اكتبه في الـ stream وشيله من الذاكرة |
| [[await wb.commit()]] | اقفل الملف، وده بيقفل الرد |

جرّبنا: الرد [[Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet]] و [[filename="orders.xlsx"]]، والملف ٥٧٦٢٦ بايت. ومفتحناهوش في Excel، بس قريناه تاني بـ exceljs:

~~~text الناتج (مختصر): اسم الشيت وعدد الصفوف والـ views، وبعدين numFmt ونوع خانة المبلغ C2
الطلبات 2501 [{"workbookViewId":0,"rightToLeft":true,"state":"frozen","xSplit":0,"ySplit":1,"topLeftCell":"A2",...}]
#,##0.00 number
~~~

اسم الشيت صح، و ٢٥٠١ صف، والاتجاه والتثبيت متسجلين، والمبلغ رقم حقيقي مش نص. والإيميل الخبيث في الـ XML جوه الملف متخزن كقيمة نص من غير عنصر [[<f>]] (اللي هو الـ formula)، فـ exceljs بيكتب النص كنص، والخطر الأكبر في الـ CSV.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| async generator + cursor | دفعات من القاعدة، والدفعة الجاية بس لما الرد يلحق |
| [[cell]] | escaping لـ CSV + منع CSV injection بـ [[']] |
| BOM في أول الملف | Excel يقرا العربي صح |
| [[res.attachment]] | ينزل كملف، والاسم العربي في [[filename*]] |
| [[pipeline(Readable.from(...), res)]] | stream للرد مع الـ backpressure |
| [[WorkbookWriter]] + [[row.commit()]] | Excel كبير من غير ما يتبني كله في الذاكرة |`,
          lines: [
            "يحوّل generator لـ stream.",
            "pipeline.",
            "exceljs.",
            "generator بيجيب الطلبات دفعة دفعة.",
            "آخر id اتقري.",
            "لحد ما الداتا تخلص.",
            "١٠٠٠ صف بعد آخر id، مترتبين، ومعاهم إيميل اليوزر بس.",
            "مفيش تاني؟ خلصنا.",
            "سلّم الصفوف واحد واحد.",
            "افتكر آخر id للدفعة الجاية.",
            "قفلة.",
            "قفلة.",
            "تجهيز خانة CSV.",
            "حوّل لنص.",
            "لو بتبدأ برمز formula، حط ' قبلها عشان Excel يعرضها كنص.",
            "لو فيها فاصلة أو علامة تنصيص أو سطر جديد، حطها بين علامتين وضاعف اللي جواها.",
            "قفلة.",
            "generator بيطلّع سطور CSV.",
            "BOM عشان Excel يفهم UTF-8، وبعده العناوين.",
            "كل طلب سطر، والمبلغ بالجنيه.",
            "قفلة.",
            "endpoint الـ CSV للأدمن بس.",
            "نزّله كملف باسم عربي، و Content-Type بيتحط من الامتداد.",
            "الصفوف ← CSV ← الرد، مع الـ backpressure.",
            "قفلة.",
            "endpoint الـ Excel.",
            "نزّله كملف xlsx.",
            "workbook بيكتب في الرد وهو بيتبني.",
            "شيت عربي من اليمين، والصف الأول ثابت.",
            "الأعمدة، والمبلغ رقم بتنسيق.",
            "كل صف يتكتب ويتشال من الذاكرة.",
            "اقفل الملف والرد.",
            "قفلة."
          ],
          sol: R`المتوقع في الـ CSV: العربي مقروء في Excel (بفضل الـ BOM)، و ٢٥٠٠ سطر بعد العناوين، والإيميل الغريب ظاهر كنص بيبدأ بـ [[']] ومش لينك. واسم الملف العربي ظاهر صح في التنزيلات.

في الـ xlsx: اسم الشيت «الطلبات»، والاتجاه من اليمين للشمال، والصف الأول ثابت وانت بتنزل، وعمود المبلغ أرقام (جرّب [[SUM]] عليه).

لو العربي طلع رموز، الـ BOM ناقص. ولو الإيميل اتعرض كلينك أو Excel حذّرك من «external content»، دالة [[cell]] مش متطبّقة على العمود ده. ولو الملف طلع بايظ ومش بيفتح، غالبًا حصل خطأ في النص بعد ما الـ headers اتبعتت: شوف اللوج، وخلي الأخطاء في النص تقفل الاتصال بدل ما تكتب JSON جوه الملف.`,
          solCode: R`const u = await db.user.create({ data: { email: '=HYPERLINK("http://evil.com","click")' } });
await db.order.createMany({ data: Array.from({ length: 2500 }, (_, i) => ({ userId: u.id, amountCents: 1000 + i })) });
// curl -s -D - -o orders.csv http://localhost:3000/api/admin/orders.csv -H "Authorization: Bearer $TOKEN"
// Content-Disposition: attachment; filename="?????-??????.csv"; filename*=UTF-8''%D8%B7%D9%84...
// head -2 orders.csv
// id,email,amount_egp,status
// cm...,"'=HYPERLINK(""http://evil.com"",""click"")",10.00,PENDING`
        },
        {
          cmd: "فاتورة PDF",
          title: "فاتورة PDF عربي من HTML بـ Playwright",
          desc: R`أسهل طريقة لـ PDF شكله حلو: تكتبه HTML و CSS (اللي انت عارفهم)، وتخلي Chromium يطبعه. Playwright بيفتح متصفح headless، و [[page.setContent(html)]] ثم [[page.pdf()]] بيرجّع Buffer.

للعربي: [[dir="rtl"]] و [[lang="ar"]] في الـ HTML، وخط عربي محطوط جوه الصفحة بـ [[@font-face]] (مش معتمد على خطوط السيرفر)، و [[document.fonts.ready]] قبل الطباعة.`,
          example: R`import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const font = readFileSync("assets/fonts/NotoNaskhArabic-Regular.ttf").toString("base64");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const money = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });

const invoiceHtml = (o) => $__bt<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face { font-family: "Naskh"; src: url(data:font/ttf;base64,$__{font}) format("truetype"); }
body { font-family: "Naskh", sans-serif; } td, th { border: 1px solid #ccc; padding: 6px; text-align: start; }
</style></head><body><h1>فاتورة رقم $__{esc(o.number)}</h1><p>العميل: $__{esc(o.customer)}</p>
<table>$__{o.items.map((it) => $__bt<tr><td>$__{esc(it.name)}</td><td>$__{it.qty}</td><td>$__{money.format(it.price)}</td></tr>$__bt).join("")}</table>
<p>الإجمالي: $__{money.format(o.total)}</p></body></html>$__bt;

const browser = await chromium.launch();
export async function renderInvoice(order) {
  const page = await browser.newPage();
  try {
    await page.setContent(invoiceHtml(order), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({ format: "A4", printBackground: true, margin: { top: "15mm", bottom: "15mm", left: "12mm", right: "12mm" } });
  } finally { await page.close(); }
}

router.get("/orders/:id/invoice.pdf", requireAuth, async (req, res) => {
  const order = await ordersService.getForInvoice(req.user.id, req.params.id);
  res.type("pdf").attachment($__btinvoice-$__{order.number}.pdf$__bt).send(await renderInvoice(order));
});`,
          try: R`[[npm i playwright]] و [[npx playwright install chromium]]، ونزّل خط Noto Naskh Arabic أو Cairo حطه في [[assets/fonts]]. اعمل فاتورة فيها اسم عميل [[منى <script>]] وصنف إنجليزي وصنف عربي، واحفظ الـ PDF وافتحه. وبعدين شيل الـ [[@font-face]] وشوف الفرق على السيرفر (أو في Docker) مش على جهازك.`,
          flag: "script",
          deep: {
            why: R`الفواتير والإيصالات والشهادات لازم تبقى PDF: بتتطبع وبتتبعت وبتتحفظ. ومكتبات الـ PDF اللي بترسم بالإحداثيات (زي pdfkit) صعبة جدًا مع العربي: الحروف لازم تتوصل وتتقلب، والجدول من اليمين. Chromium بيعمل كل ده صح لأنه نفس المحرك اللي بيعرض المواقع العربي، وانت بتصمم بـ HTML و CSS.`,
            how: R`[[chromium.launch()]] تقيل (ثانية وأكتر ومئات الميجا)، فبتفتحه مرة وانت بتقوم وتعمل صفحة جديدة لكل فاتورة، و [[page.close()]] في [[finally]] عشان الصفحات متتراكمش. جربناها: الفاتورة كلها (صفحة جديدة و setContent و pdf) حوالي ٣٥٠ms بعد ما المتصفح مفتوح.

الخط: السيرفر (خصوصًا Docker slim أو alpine) غالبًا معندوش خط عربي، فالحروف تطلع مربعات أو بخط fallback وحش. [[@font-face]] بـ data URL من ملف جوه المشروع بيضمن نفس الشكل في كل مكان، والـ PDF بيتضمّن فيه الخط (جربنا: الخط ظهر embedded جوه الملف). و [[document.fonts.ready]] بيستنى الخط يتحمّل قبل الطباعة.

الـ RTL: [[dir="rtl"]] على [[html]] بيقلب الجدول والنصوص، و [[text-align: start]] بدل [[right]] عشان يمشي مع الاتجاه. والأرقام: [[ar-EG]] في [[Intl.NumberFormat]] بيطلّع أرقام عربية شرقية ([[١٥٠٫٠٠ ج.م.]])، ولو عايز 150.00 استخدم [[ar-EG-u-nu-latn]].

الأمان: أي قيمة من اليوزر (الاسم والعنوان والملاحظات) بتدخل الـ HTML لازم تتهرّب ([[esc]])، وإلا حد يحط [[<img src=http://internal-service/...>]] والمتصفح اللي على السيرفر بتاعك يحمّله (SSRF). ولو هتعرض صور، حطها data URL أو من دومينك بس. و [[setContent]] مش [[goto]] على URL جاي من اليوزر.

الحجم: Playwright محتاج Chromium ومكتباته. في Docker استخدم الصورة الرسمية [[mcr.microsoft.com/playwright]] أو [[npx playwright install --with-deps chromium]] في الـ Dockerfile. والفواتير الكتير (آخر الشهر لكل العملاء) تتعمل في worker من queue مش في الـ API، وتتحفظ في S3، والـ endpoint يرجّع اللينك.`,
            when: "أي PDF فيه تصميم أو عربي: فواتير وإيصالات وشهادات وتقارير. لـ PDF بسيط جدًا إنجليزي بس (label شحن)، pdfkit أخف. ولو عندك Next.js، ممكن تعمل الفاتورة صفحة عادية وتطبعها بنفس الطريقة.",
            mistakes: R`[[chromium.launch()]] جوه الـ route لكل طلب: بطء، وتحت الضغط الرام بتخلص. ونسيان [[page.close()]] فالصفحات تتراكم لحد ما المتصفح يقع. والخط من Google Fonts بلينك: السيرفر ممكن ميكونش عنده نت برّه، والطباعة تحصل قبل ما يتحمّل. وقيم اليوزر من غير escape. والعربي شكله صح على جهازك (عندك خطوط) وبايظ على السيرفر، فاختبر في Docker.`
          },
          teach: R`## HTML في string، ومتصفح بيطبعه

الملف فيه ٣ حتت: دوال صغيرة بتجهّز الكلام (خط، و escape، وفلوس)، ودالة [[invoiceHtml]] بتبني صفحة HTML للفاتورة، و [[renderInvoice]] بتخلي Chromium يطبع الصفحة دي PDF. جرّبناه على ويندوز 11 بـ Node 24 و Playwright 1.63 (Chromium اتسطب بـ [[npx playwright install chromium]])، وخط Noto Naskh Arabic من مشروع Noto الرسمي.

---

## ١. الـ imports والخط

~~~js
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const font = readFileSync("assets/fonts/NotoNaskhArabic-Regular.ttf").toString("base64");
~~~

- [[chromium]] من Playwright: بيشغّل متصفح Chromium من الكود.
- [[readFileSync]] بيقرا ملف الخط كله (Buffer بايتات). هنا مقبول إنه sync لأنه بيحصل مرة واحدة وانت بتقوم، مش جوه طلب.
- [[.toString("base64")]]: base64 طريقة تكتب بيها أي بايتات كحروف إنجليزي وأرقام، عشان نحطها جوه نص الـ HTML.

---

## ٢. [[esc]]: الـ escape

~~~js
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", ... })[c]);
~~~

- [[/[&<>"']/g]]: أي حرف من الخمسة دول، و [[g]] = global (كله، مش أول واحد بس).
- [[replace]] بدالة: كل حرف لقاه بيتبعت للدالة ([[c]]) واللي ترجّعه بيتحط مكانه.
- الدالة بترجّع object فيه كل حرف وبديله، و [c] بعده بيجيب البديل بالحرف نفسه. يعني [[<]] تبقى [[&lt;]] (entity: طريقة HTML تكتب بيها الحرف كنص).

جرّبنا باسم عميل [[منى <script>]]، والـ HTML اللي اتبنى فيه:

~~~text جزء من الـ HTML
<h1>فاتورة رقم INV-1042</h1><p>العميل: منى &lt;script&gt;</p>
~~~

فالمتصفح بيعرض [[<script>]] كحروف، ومبيعتبرهاش tag.

---

## ٣. [[money]]: [[Intl.NumberFormat]]

[[Intl]] جزء من JavaScript لتنسيق الأرقام والتواريخ حسب اللغة. [[ar-EG]] = عربي مصر، و [[style: "currency", currency: "EGP"]] = فلوس بالجنيه. جرّبنا:

~~~text الناتج
money.format(150)    →  ١٥٠٫٠٠ ج.م.
money.format(390.5)  →  ٣٩٠٫٥٠ ج.م.
ar-EG-u-nu-latn      →  150.00 ج.م.
~~~

أرقام عربية شرقية والعلامة العشرية [[٫]]. و [[-u-nu-latn]] في آخر اسم اللغة معناها «numbering system: latin» لو عايز 150.00.

---

## ٤. [[invoiceHtml(o)]]: template string

الدالة بترجّع string بين backticks، وجواها [[$__{...}]] بيتحط مكانها قيمة. الأهم فيها:

| الحتة | ليه |
|---|---|
| [[<html lang="ar" dir="rtl">]] | اللغة عربي، والاتجاه من اليمين للشمال لكل الصفحة |
| [[<meta charset="utf-8">]] | الحروف UTF-8 عشان العربي |
| [[@font-face { font-family: "Naskh"; src: url(data:font/ttf;base64,...) }]] | خط اسمه Naskh، والملف نفسه جوه الـ URL ([[data:]] URL) فمش محتاج نت ولا خطوط على السيرفر |
| [[font-family: "Naskh", sans-serif]] | استخدم الخط ده، ولو حرف مش فيه خد [[sans-serif]] |
| [[text-align: start]] | الكلام يبدأ من «البداية»، واللي هي اليمين مع rtl |
| [[esc(o.number)]] و [[esc(o.customer)]] | أي حاجة من اليوزر بتعدّي على esc |
| [[o.items.map((it) => ...).join("")]] | لكل صنف [[<tr>]] (صف) فيه ٣ [[<td>]] (خانات)، و [[join("")]] بيلزّقهم من غير فاصل |

---

## ٥. [[const browser = await chromium.launch();]]

بيشغّل Chromium **headless** (من غير شباك). عندنا أخد من ٠.٧ لـ ١.٢ ثانية، فبيتعمل مرة واحدة في أول الملف، مش مع كل فاتورة.

---

## ٦. [[renderInvoice(order)]]

~~~js
const page = await browser.newPage();
try {
  await page.setContent(invoiceHtml(order), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  return await page.pdf({ format: "A4", printBackground: true, margin: {...} });
} finally { await page.close(); }
~~~

1. [[browser.newPage()]]: تاب جديد، خفيف.
2. [[page.setContent(html, { waitUntil: "load" })]]: حط الـ HTML في التاب واستنى event الـ [[load]].
3. [[page.evaluate(() => document.fonts.ready)]]: شغّل الكود ده **جوه المتصفح**. [[document.fonts.ready]] promise بيخلص لما كل الخطوط تتحمّل.
4. [[page.pdf({...})]]: اطبع. [[format: "A4"]] مقاس الورقة، و [[printBackground: true]] اطبع الألوان والخلفيات (افتراضيًا الطباعة بتشيلها)، و [[margin]] الهوامش بالـ mm. بيرجّع Buffer.
5. [[finally { await page.close(); }]]: اقفل التاب في كل الأحوال.

### كود الحل

~~~text الناتج
launch ms 1218
first render ms 226
second render ms 172
pdf bytes 58332 isBuffer true
~~~

الفاتورة نفسها حوالي ٢٠٠ms بعد ما المتصفح مفتوح، والملف بيبدأ بـ [[%PDF-1.4]]. وفتحنا الـ PDF: صفحة واحدة، والعنوان والجدول من اليمين، والحروف العربي متوصلة، و [[<script>]] ظاهر كنص، والمبالغ بأرقام عربية.

### الخطوط اللي جوه الملف

دوّرنا على [[/FontName]] جوه الـ PDF:

~~~text الناتج
/FontName /AAAAAA+SegoeUI-Bold
/FontName /BAAAAA+NotoNaskhArabic-Regular
/FontName /CAAAAA+SegoeUI
~~~

Noto Naskh embedded (و [[AAAAAA+]] معناها subset: الحروف المستخدمة بس). بس لاحظ Segoe UI: خط Noto Naskh Arabic فيه حروف عربي بس، فالكلام الإنجليزي ([[INV-1042]] و [[Mouse pad]]) خده الـ fallback ([[sans-serif]])، وده على ويندوز Segoe UI. على سيرفر لينكس هيبقى خط تاني. لو عايز الإنجليزي كمان ثابت في كل مكان، ضيف [[@font-face]] تاني لخط لاتيني وحطه في [[font-family]].

---

## ٧. الـ route

~~~js
res.type("pdf").attachment($__btinvoice-$__{order.number}.pdf$__bt).send(await renderInvoice(order));
~~~

- [[getForInvoice(req.user.id, req.params.id)]]: بيجيب الطلب **بتاع اليوزر ده بس** (ownership، درس [[ownership (IDOR)]]).
- [[res.type("pdf")]] بيحط [[Content-Type: application/pdf]]، و [[attachment(...)]] اسم الملف، و [[send(buffer)]] بيبعت البايتات.

جرّبناه بـ [[curl -s -D - -o inv.pdf]]:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="invoice-INV-1042.pdf"
Content-Length: 47418
~~~

هنا فيه [[Content-Length]] (مش chunked زي التصدير) لأن الـ PDF كله Buffer جاهز قبل ما يتبعت.

> اللي مجرّبناهوش هنا: نفس الكود من غير [[@font-face]] جوه Docker لينكس من غير خطوط. شكل المربعات أو الخط البديل في الحالة دي من الـ docs وتجارب الناس، وجرّبه بنفسك قبل الإنتاج.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[chromium.launch()]] مرة واحدة | تقيل، والصفحات خفيفة |
| [[newPage]] ثم [[close]] في [[finally]] | تاب لكل فاتورة ومفيش تسريب |
| [[dir="rtl"]] + [[text-align: start]] | الاتجاه العربي |
| [[@font-face]] بـ data URL + [[document.fonts.ready]] | نفس الخط في كل مكان، ومتطبعش قبل ما يتحمّل |
| [[esc]] | اسم اليوزر يفضل نص، مش HTML |
| [[Intl.NumberFormat("ar-EG")]] | فلوس بالعربي، و [[-u-nu-latn]] للأرقام الإنجليزي |`,
          lines: [
            "Playwright.",
            "قراية ملف الخط.",
            "الخط العربي كـ base64 عشان يتحط جوه الصفحة.",
            "escape لأي قيمة من اليوزر قبل ما تدخل الـ HTML.",
            "تنسيق الفلوس بالعربي والجنيه.",
            "دالة بتبني HTML الفاتورة: عربي ومن اليمين.",
            "الخط العربي من data URL، مش من النت ولا من السيرفر.",
            "الخط على الصفحة، والجدول بيمشي مع الاتجاه.",
            "العنوان واسم العميل بعد الـ escape.",
            "صف لكل صنف.",
            "الإجمالي.",
            "متصفح واحد للتطبيق كله.",
            "دالة الفاتورة.",
            "صفحة جديدة لكل فاتورة.",
            "جرّب...",
            "حط الـ HTML واستنى يتحمّل.",
            "استنى الخطوط.",
            "اطبع A4 بالخلفيات والهوامش، ورجّع Buffer.",
            "وفي كل الأحوال اقفل الصفحة.",
            "قفلة.",
            "endpoint الفاتورة.",
            "هات الطلب بتاع اليوزر ده بس (ownership).",
            "نوع PDF واسم ملف، وابعت الـ Buffer.",
            "قفلة."
          ],
          sol: R`المتوقع: PDF صفحة واحدة، العنوان والجدول من اليمين للشمال، والحروف العربي متوصلة صح، واسم العميل ظاهر كنص [[منى <script>]] (مش اتشال ولا اتنفّذ)، والصنف الإنجليزي ظاهر عادي جوه الجدول، والمبالغ بأرقام عربية.

ولو فتحت خصائص الـ PDF (Document Properties ← Fonts) هتلاقي Noto Naskh Arabic (أو الخط اللي اخترته) embedded.

من غير الـ [[@font-face]]: على جهازك غالبًا هيبان كويس لأن عندك خطوط عربي. في Docker أو سيرفر من غير خطوط هيطلع مربعات أو خط fallback. ده بالظبط سبب إنك تحط الخط جوه الصفحة.

الكود ده سكربت صغير يحفظ الملف للتجربة.`,
          solCode: R`import { writeFileSync } from "node:fs";
import { renderInvoice } from "./invoice.js";

const pdf = await renderInvoice({
  number: "INV-1042",
  customer: "منى <script>",
  items: [{ name: "مج سيراميك", qty: 2, price: 150 }, { name: "Mouse pad", qty: 1, price: 90.5 }],
  total: 390.5,
});
writeFileSync("invoice.pdf", pdf);
console.log("pdf bytes", pdf.length);
process.exit(0);`
        },
        {
          cmd: "worker_threads و cluster",
          title: "حساب تقيل: worker_threads ولا cluster ولا نسخ ورا load balancer؟",
          desc: R`Node بيشغّل الـ JavaScript بتاعك على thread واحد. لو route عمل حساب ٥٠٠ms (hash تقيل، أو معالجة صورة بـ JS، أو تقرير بحسابات)، كل الطلبات التانية بتستنى.

الحلول ٣ ولكل واحد مكان: [[worker_threads]] ينقل الحساب لـ thread تاني فالـ event loop يفضل فاضي. و [[cluster]] (أو PM2 cluster) يشغّل نسخ من السيرفر كله على نفس الجهاز، واحدة لكل core. ونسخ كتير (containers) ورا load balancer هو الـ scaling الحقيقي.`,
          example: R`import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }

if (!isMainThread) {
  parentPort.postMessage(fib(workerData.n));
} else {
  const runInWorker = (n) => new Promise((resolve, reject) => {
    const w = new Worker(new URL(import.meta.url), { workerData: { n } });
    w.once("message", resolve);
    w.once("error", reject);
  });
  app.get("/blocking", (req, res) => res.json({ v: fib(38) }));
  app.get("/offloaded", async (req, res) => res.json({ v: await runInWorker(38) }));
  app.get("/ping", (req, res) => res.json({ ok: true }));
}`,
          try: R`شغّل السيرفر ده، ومن سكربت تاني (process تاني!) ابعت [[/blocking]] وبعده بـ ٥٠ms [[/ping]] واطبع [[/ping]] أخد قد إيه. كرر مع [[/offloaded]]. وبعدين فكّر: لو ١٠٠ طلب [[/offloaded]] جم مع بعض، هيحصل إيه؟`,
          flag: "script",
          deep: {
            why: R`الـ event loop هو اللي بيخلي Node يخدم آلاف الاتصالات بـ thread واحد، طول ما كل حاجة I/O (قاعدة وشبكة وملفات). أول ما كود JS ياخد وقت CPU، السيرفر كله بيقف: الـ health check يفشل، والـ load balancer يفتكره واقع، والطلبات السريعة تبقى بطيئة. وفي الانترفيو «Node single-threaded، إزاي بتعمل حاجة تقيلة؟» سؤال شبه أكيد.`,
            how: R`جربناها بسيرفر و client في process منفصل: وهو بيحسب [[fib(38)]] في الـ route نفسه، [[/ping]] أخد ٤٢١ms (استنى الحساب يخلص). ومع worker، [[/ping]] أخد ٢ms. الحساب نفسه مبقاش أسرع (أبطأ شوية كمان، بسبب تشغيل الـ worker)، بس السيرفر فضل بيرد. (لو جربت الـ client والسيرفر في نفس الـ process، الـ client نفسه هيتعطّل والأرقام تضحك عليك.)

[[worker_threads]]: thread حقيقي بـ V8 لوحده وذاكرة لوحده، وبيتكلموا بـ [[postMessage]] (الداتا بتتنسخ، أو [[SharedArrayBuffer]] / transfer للـ buffers الكبيرة). تشغيل worker ليه تكلفة (عشرات الـ ms وذاكرة)، فلو الشغل متكرر اعمل pool ثابت بعدد الـ cores (مكتبة زي [[piscina]]) بدل worker جديد لكل طلب. ولو ١٠٠ طلب جم مع بعض من غير pool، هتعمل ١٠٠ thread وتخلّص الرام.

[[cluster]]: الـ process الرئيسية بتعمل fork لنسخ من السيرفر كله، وكلهم بيسمعوا على نفس البورت. كده بتستخدم كل الـ cores للطلبات العادية. PM2 بـ [[-i max]] بيعمل نفس الحاجة. بس كل نسخة ذاكرة منفصلة: الـ sessions في الذاكرة، والكاش المحلي، والـ rate limit، والـ cron، كلها بتتكرر أو بتبوظ. عشان كده الشرط الأول إن التطبيق stateless (Redis للـ state).

في Docker و Kubernetes: container فيه process واحدة، وتكبّر بعدد الـ containers ورا load balancer، مش cluster جوه container. ده بيدّيك نفس الفايدة ومعاها إنك تكبّر على أكتر من جهاز وتعمل restart لنسخة من غير الباقي (درس «scaling path» في «تاب بناء مشروع كامل»).

وأوقات الحل مش ولا واحد فيهم: الشغل التقيل اللي مش لازم يرجع في نفس الطلب (فيديو، تقارير، ألف صورة) مكانه queue و worker process لوحدها (درس [[background jobs]]). وفيه حاجات شكلها تقيلة وهي أصلًا بتتعمل برّه الـ event loop: [[bcrypt]] و [[sharp]] و [[crypto.pbkdf2]] بيشتغلوا في thread pool بتاع libuv لو استخدمت النسخة الـ async.`,
            when: "worker_threads: حساب CPU لازم يرجع في نفس الطلب ومفيش مكتبة native بتعمله. cluster أو PM2: سيرفر VPS واحد عليه أكتر من core ومن غير Docker. نسخ ورا load balancer: الإنتاج الطبيعي. queue: أي حاجة تقيلة مش لازم الرد يستناها.",
            mistakes: R`worker جديد لكل طلب من غير حد. واستخدام النسخ الـ Sync ([[bcrypt.hashSync]] و [[crypto.pbkdf2Sync]] و [[fs.readFileSync]]) جوه routes. و cluster والتطبيق فيه state في الذاكرة. و [[JSON.parse]] لـ body ضخم (١٠٠ ميجا) بيوقّف الـ loop برضه، فحط [[limit]] على [[express.json]]. وفي الانترفيو: «worker_threads زي cluster؟» لأ: threads جوه نفس الـ process للحساب، و cluster نسخ من السيرفر كله للطلبات.`
          },
          teach: R`## ملف واحد بيشتغل مرتين

الملف ده بيتشغّل كسيرفر، ونفس الملف بيتشغّل تاني جوه worker يحسب. [[isMainThread]] هو اللي بيفرّق: في السيرفر [[true]]، وجوه الـ worker [[false]]. وفيه ٣ routes عشان نقيس: [[/blocking]] بيحسب في الـ thread الرئيسي، و [[/offloaded]] بيحسب في worker، و [[/ping]] خفيف. جرّبناه على ويندوز 11 بـ Node 24 و Express 5 (السيرفر على البورت 5856، و [[app]] بيتعمل جوه الـ [[else]])، على جهاز فيه ١٦ logical processor.

---

## ١. [[import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";]]

| الاسم | إيه هو |
|---|---|
| [[Worker]] | كلاس: [[new Worker(file)]] بيشغّل الملف ده في thread جديد |
| [[isMainThread]] | [[true]] لو الكود شغال في الـ thread الرئيسي |
| [[parentPort]] | جوه الـ worker: القناة اللي بيكلّم بيها اللي شغّله |
| [[workerData]] | جوه الـ worker: الداتا اللي اتبعتت له وهو بيبدأ |

---

## ٢. [[function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }]]

Fibonacci بالـ recursion (الدالة بتنادي نفسها). مكتوبة بالطريقة البطيئة **عمدًا**: [[fib(38)]] بيعمل عشرات الملايين من النداءات، فبياخد حوالي نص ثانية CPU. والنتيجة [[39088169]].

---

## ٣. فرع الـ worker

~~~js
if (!isMainThread) {
  parentPort.postMessage(fib(workerData.n));
}
~~~

[[!]] = «مش». يعني لو احنا جوه worker: احسب الرقم اللي جالك في [[workerData.n]]، وابعت النتيجة بـ [[postMessage]]. وبعدها الـ worker مبقاش عنده شغل فبيخلص لوحده.

> كل حاجة **برّه** الـ [[if]] بتتنفّذ في الـ worker كمان، لأنه بيشغّل الملف من أوله. عشان كده [[app]] و [[app.listen]] لازم يبقوا جوه الـ [[else]]، وإلا كل worker هيحاول يفتح السيرفر تاني.

---

## ٤. [[runInWorker(n)]]

~~~js
const runInWorker = (n) => new Promise((resolve, reject) => {
  const w = new Worker(new URL(import.meta.url), { workerData: { n } });
  w.once("message", resolve);
  w.once("error", reject);
});
~~~

- [[new Promise((resolve, reject) => ...)]]: promise بإيدك. [[resolve(x)]] = خلص بنجاح بالقيمة x، و [[reject(err)]] = فشل.
- [[import.meta.url]]: عنوان الملف الحالي كـ URL ([[file:///C:/.../server.mjs]]). و [[new URL(...)]] بيحوّله object تقبله [[Worker]]. يعني «شغّل نفس الملف ده».
- [[{ workerData: { n } }]]: ابعت [[n]] للـ worker.
- [[w.once("message", resolve)]]: أول رسالة توصل = النتيجة، فالـ promise يخلص بيها. [[once]] بدل [[on]] لأننا مستنيين رسالة واحدة.
- [[w.once("error", reject)]]: لو الكود جوه الـ worker رمى خطأ، الـ promise يترفض والـ route يرجّع خطأ.

---

## ٥. الـ routes

- [[/blocking]]: [[res.json({ v: fib(38) })]] مباشرة. طول ما [[fib]] شغالة، الـ event loop واقف: ولا طلب تاني بيتقري.
- [[/offloaded]]: [[await runInWorker(38)]]. الـ route بيستنى promise، والـ event loop فاضي يخدم غيره لحد ما الـ worker يرد.
- [[/ping]]: بيرد على طول. ده المقياس: لو أخد وقت، يبقى السيرفر كان مشغول.

---

## ٦. كود الحل: client في process لوحده

~~~js
const heavy = fetch(url + path);
await new Promise((r) => setTimeout(r, 50));
const t = performance.now();
await fetch(url + "/ping");
~~~

ابعت الطلب التقيل **من غير** [[await]] (يفضل شغال)، واستنى ٥٠ms عشان يوصل السيرفر ويبدأ، وبعدين قيس [[/ping]]. وفي الآخر [[await heavy]] عشان منسيبش طلب معلّق. شغّلناه مرتين:

~~~text الناتج (تشغيل ١ ثم ٢)
/blocking ping took 503 ms       /blocking ping took 661 ms
/offloaded ping took 14 ms       /offloaded ping took 11 ms
~~~

مع [[/blocking]]، الـ ping استنى الحساب كله يخلص. مع [[/offloaded]]، رد في حوالي ١٠ms. والطلبين رجعوا نفس النتيجة [[{"v":39088169}]].

وقسنا كل route لوحده من غير ping:

~~~text الناتج
/blocking alone took 516 ms
/offloaded alone took 636 ms
~~~

الـ worker **مش** بيسرّع الحساب، بالعكس أبطأ بحوالي ١٠٠ms: تشغيل thread جديد بـ V8 لوحده وتحميل الملف والـ imports تاني. اللي كسبناه إن السيرفر فضل بيرد على غيره. ولو الـ client كان في نفس الـ process بتاع السيرفر، كان هو نفسه هيقف مع [[/blocking]] والأرقام تكدب.

---

## ٧. والـ ١٠٠ طلب مع بعض؟

كل طلب = [[new Worker]] جديد = thread و V8 وذاكرة. الجهاز هنا فيه ١٦ logical processor ([[os.availableParallelism()]] رجّع [[16]])، فـ ١٠٠ worker هيتزاحموا على ١٦، وكل واحد ياخد أطول، والرام تكبر. الحل pool ثابت بعدد الـ cores (مكتبة [[piscina]]) والباقي يستنى دوره، أو queue.

---

## الخلاصة

| | بيعمل إيه | إمتى |
|---|---|---|
| [[worker_threads]] | يشغّل حساب CPU في thread تاني | حساب لازم يرجع في نفس الطلب |
| [[cluster]] / PM2 | نسخ من السيرفر كله على نفس الجهاز | VPS من غير Docker |
| containers ورا load balancer | نسخ على أجهزة | الإنتاج العادي |
| queue + worker process | الشغل يتعمل بعدين | الحاجة التقيلة اللي الرد مش لازم يستناها |

- worker مش بيسرّع الحساب، بيحمي الـ event loop.
- كل حاجة برّه [[if (!isMainThread)]] بتتنفّذ في الـ worker كمان.`,
          lines: [
            "worker_threads.",
            "حساب تقيل عمدًا (fibonacci بالـ recursion).",
            "لو الكود ده شغال جوه worker...",
            "...احسب وابعت النتيجة للـ thread الرئيسي.",
            "وإلا احنا في السيرفر نفسه.",
            "دالة بتشغّل نفس الملف كـ worker بالرقم وترجّع promise.",
            "worker جديد من نفس الملف، والرقم في workerData.",
            "أول رسالة هي النتيجة.",
            "ولو الـ worker وقع، الـ promise تترفض.",
            "قفلة.",
            "route بيحسب في الـ event loop نفسه: السيرفر كله بيقف.",
            "route بيحسب في worker: السيرفر فاضي يرد على غيره.",
            "route خفيف نقيس بيه.",
            "قفلة."
          ],
          sol: R`أرقام من تجربة (fib(38) حوالي نص ثانية): مع [[/blocking]]، [[/ping]] أخد حوالي ٤٢٠ms لأنه استنى الحساب. مع [[/offloaded]]، [[/ping]] أخد حوالي ٢ms، والطلب التقيل نفسه أخد وقت أطول شوية (تشغيل الـ worker).

لو [[/ping]] طلع سريع في الحالتين، غالبًا بتقيس من نفس الـ process اللي فيها السيرفر، أو بعت الـ ping قبل ما الطلب التقيل يوصل.

والـ ١٠٠ طلب: ١٠٠ worker مع بعض، كل واحد thread و V8 وذاكرة، على جهاز فيه ٤ cores. الرام تطير والكل يبطأ. الحل pool بعدد الـ cores (piscina)، والطلبات الزيادة تستنى في طابور، أو تتحول لـ queue.`,
          solCode: R`// client.mjs (process منفصل عن السيرفر)
const url = "http://localhost:3000";
for (const path of ["/blocking", "/offloaded"]) {
  const heavy = fetch(url + path);
  await new Promise((r) => setTimeout(r, 50));
  const t = performance.now();
  await fetch(url + "/ping");
  console.log(path, "ping took", Math.round(performance.now() - t), "ms");
  await heavy;
}
// /blocking ping took 421 ms
// /offloaded ping took 2 ms`
        },
        {
          cmd: "AsyncLocalStorage",
          title: "request id في كل سطر لوج من غير ما تعدّيه لكل دالة",
          desc: R`[[AsyncLocalStorage]] بيخليك تحط object في أول الطلب ([[als.run(store, next)]])، وأي كود بيتنفّذ بعد كده في نفس الطلب (حتى بعد await ودوال تانية وملفات تانية) يقدر يقراه بـ [[als.getStore()]]، وكل طلب شايف الـ object بتاعه بس حتى لو ١٠٠ طلب شغالين مع بعض.

الاستخدام الأشهر: logger بيحط الـ request id و id اليوزر في كل سطر لوحده، فتجمع قصة طلب واحد من وسط آلاف السطور.`,
          example: R`import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

export const requestContext = new AsyncLocalStorage();

app.use((req, res, next) => {
  const reqId = req.get("x-request-id") ?? randomUUID();
  res.setHeader("x-request-id", reqId);
  requestContext.run({ reqId }, next);
});
app.use(requireAuthOptional, (req, res, next) => {
  const ctx = requestContext.getStore();
  if (ctx) ctx.userId = req.user?.id ?? null;
  next();
});

export const logger = pino({
  mixin: () => {
    const ctx = requestContext.getStore();
    return ctx ? { reqId: ctx.reqId, userId: ctx.userId } : {};
  },
});

// payments.service.js: مفيش req هنا خالص
export async function chargeCard(amount) {
  logger.info({ amount }, "charging card");
}`,
          try: R`اعمل الـ middleware والـ logger، وابعت طلبين مع بعض ([[Promise.all]]) بـ [[x-request-id]] مختلف لكل واحد، والـ service بيعمل [[await]] بوقت عشوائي قبل اللوج. اتأكد إن كل سطر معاه الـ id الصح رغم إن السطور متلخبطة في الترتيب. وبعدين اكتب لوج برّه أي طلب (في [[setInterval]] مثلًا): إيه اللي بيطلع في reqId؟`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوجات بتاعة ٥٠ طلب بتتكتب متداخلة. من غير id مشترك، مفيش طريقة تعرف «الخطأ ده في الدفع حصل في أنهي طلب ولأنهي يوزر». والحل القديم إنك تعدّي [[req]] أو [[logger]] لكل دالة لحد آخر service، وده بيوسّخ كل الـ signatures ودايمًا حد بينسى.`,
            how: R`[[als.run(store, fn)]] بيشغّل [[fn]] ويربط الـ store بكل الشغل الـ async اللي بيبدأ جواها: promises و timers و callbacks. Node بيتابع «مين بدأ مين» ويعدّي الـ store معاها. فـ [[next]] وكل الـ middleware والـ route والـ services اللي بعده شايفين نفس الـ object. جربناها: طلبين A و B مع بعض، السطور طلعت بالترتيب ده: A و B و B و B و A و A، وكل سطر معاه الـ reqId والـ userId الصح. واللوج اللي برّه أي طلب طلع من غير reqId.

الـ store object عادي، فتقدر تضيف عليه بعد كده (زي [[ctx.userId]] بعد الـ auth). و [[mixin]] في pino بيتنادى مع كل سطر لوج ويدمج اللي بيرجّعه، فكل [[logger.info]] في أي ملف بيطلع ومعاه الـ context.

[[x-request-id]]: لو Nginx أو الـ load balancer بيحط id، استخدمه عشان سطر Nginx وسطر التطبيق يتربطوا. ورجّعه في الرد عشان اليوزر أو الواجهة يبعته في شكوى، وانت تدوّر بيه. و pino-http بيعمل [[req.log]] بالـ id (درس [[pino]])، بس [[req.log]] محتاج [[req]]، والـ ALS بيوصّل الـ id لأماكن ملهاش [[req]].

فيه أماكن الـ context ممكن يضيع فيها: مكتبات قديمة بتستخدم callbacks بتاعتها أو connection pools بتنفّذ الـ callback في context اتصال قديم. لو لقيت reqId فاضي في مكان المفروض يبقى فيه، ده السبب غالبًا. والـ jobs في BullMQ مبتورثش الـ context: ابعت الـ reqId في داتا الـ job وافتح [[run]] جديد في الـ worker.

ونفس الفكرة بيستخدمها Sentry و OpenTelemetry من جوه عشان يربطوا الأخطاء والـ traces بالطلب.`,
            when: "أي API هيتشغّل في الإنتاج وفيه أكتر من طبقة (routes و services). وكمان لحاجات زي tenant id في تطبيق multi-tenant، أو transaction تتشارك بين services.",
            mistakes: R`تحط الـ context في متغير global عادي ([[let currentUser]]): مع طلبين مع بعض، الأول بيشوف يوزر التاني، ودي ثغرة مش bug بس. و [[als.enterWith()]] بدل [[run]] من غير ما تفهمه: بيغيّر الـ context لباقي الـ sync code اللي بعده وممكن يسرّب لطلبات تانية. وتخزن حاجات تقيلة (الـ body كله) في الـ store. وفي الانترفيو: «إزاي تعمل request id لكل لوج في Node؟» الإجابة: AsyncLocalStorage، ومش global ولا تعدية req لكل دالة.`
          },
          teach: R`## «شنطة» لكل طلب، وأي كود يقدر يفتحها

أول middleware بيعمل object صغير للطلب (فيه الـ request id)، وبيشغّل باقي الطلب كله «جواه». بعد كده أي دالة في أي ملف تقدر تسأل «إيه الـ object بتاع الطلب اللي أنا شغالة فيه؟» من غير ما حد يعدّيلها [[req]]. والـ logger بيستخدم ده عشان يحط الـ id في كل سطر لوحده. جرّبنا المثال كما هو في Express 5 و pino 10 على ويندوز 11 بـ Node 24، على البورت 5857، مع [[requireAuthOptional]] بسيط بياخد اليوزر من header [[x-user]]، وجرّبنا كود الحل كمان.

---

## ١. الـ imports و [[new AsyncLocalStorage()]]

- [[AsyncLocalStorage]] من [[node:async_hooks]]: الكلاس اللي بيعمل التخزين ده. ALS اختصار اسمه.
- [[randomUUID]] من [[node:crypto]]: id عشوائي.
- [[export const requestContext = new AsyncLocalStorage();]]: واحد بس للتطبيق كله، و [[export]] عشان الـ logger وأي ملف تاني يستورده. هو مش الـ object نفسه، هو «المخزن» اللي كل طلب ليه فيه درج لوحده.

---

## ٢. أول middleware

~~~js
const reqId = req.get("x-request-id") ?? randomUUID();
res.setHeader("x-request-id", reqId);
requestContext.run({ reqId }, next);
~~~

1. [[req.get("x-request-id")]]: لو Nginx أو الواجهة باعتين id، خده. [[??]]: لو مش موجود ([[undefined]]) اعمل واحد جديد.
2. [[res.setHeader]]: رجّعه في الرد، عشان اللي عنده مشكلة يبعتهولك.
3. [[requestContext.run(store, fn)]]: شغّل [[fn]] (هنا [[next]]، يعني باقي الطلب كله) ومعاها الـ store ده. أي حاجة async بتبدأ جوه [[fn]] (promise أو timer أو await) بتفضل شايفة نفس الـ store، وNode هو اللي بيتابع مين بدأ مين.

ليه [[run]] تلف [[next]] بدل ما تحط الـ object في متغير؟ لأن متغير عادي واحد لكل التطبيق، و ١٠٠ طلب شغالين مع بعض هيكتبوا فيه فوق بعض.

---

## ٣. تاني middleware: ضيف اليوزر

~~~js
app.use(requireAuthOptional, (req, res, next) => {
  const ctx = requestContext.getStore();
  if (ctx) ctx.userId = req.user?.id ?? null;
  next();
});
~~~

- [[app.use(a, b)]]: middlewareين ورا بعض: الأول بيحط [[req.user]] لو فيه، والتاني بيكمّل.
- [[getStore()]]: هات الـ object بتاع الطلب ده. ده نفس الـ object اللي اتعمل في [[run]]، فلو ضفت عليه حاجة كل الكود اللي بعدك هيشوفها.
- [[if (ctx)]]: برّه أي [[run]] بيرجع [[undefined]].
- [[req.user?.id ?? null]]: لو مفيش يوزر [[null]] (مش undefined، عشان يظهر في اللوج صريح).

---

## ٤. الـ logger: [[mixin]]

~~~js
export const logger = pino({
  mixin: () => {
    const ctx = requestContext.getStore();
    return ctx ? { reqId: ctx.reqId, userId: ctx.userId } : {};
  },
});
~~~

[[mixin]] دالة pino بيناديها مع **كل** سطر لوج، واللي بترجّعه بيتدمج في السطر. هنا: لو احنا جوه طلب حط الـ id واليوزر، وإلا ولا حاجة.

---

## ٥. الـ service: مفيش [[req]] خالص

~~~js
export async function chargeCard(amount) {
  logger.info({ amount }, "charging card");
}
~~~

[[logger.info(object, message)]]: الـ object بيتدمج في السطر، والرسالة في [[msg]]. والـ service دي مش عارفة حاجة عن Express، ومع ذلك سطرها هيطلع ومعاه الطلب.

---

## ٦. التشغيل الحقيقي

route [[POST /pay]] بيستنى ٢٠ms وبعدين ينادي [[chargeCard(150)]]، وفيه timer بيعمل لوج برّه أي طلب. طلبين بـ curl:

~~~bash
curl -i -X POST -H "x-request-id: req-123" -H "x-user: u7" http://localhost:5857/pay
curl -i -X POST http://localhost:5857/pay
~~~

~~~text الـ headers اللي رجعت
x-request-id: req-123
x-request-id: 35c898e8-7045-452d-8396-be610d6f7436
~~~

الأول رجّعلنا الـ id بتاعنا، والتاني اتعمله UUID. واللوج (من غير [[time]] و [[pid]]، و [[hostname]] اتغيّر لـ ALI-PC):

~~~text اللوج
{"level":30,"hostname":"ALI-PC","msg":"timer outside any request"}
{"level":30,"hostname":"ALI-PC","reqId":"req-123","userId":"u7","amount":150,"msg":"charging card"}
{"level":30,"hostname":"ALI-PC","reqId":"35c898e8-7045-452d-8396-be610d6f7436","userId":null,"amount":150,"msg":"charging card"}
~~~

[[level 30]] = info في pino. السطر بتاع الـ timer من غير reqId (برّه [[run]])، والتانيين فيهم الطلب واليوزر رغم إن [[chargeCard]] متعرفش عنهم حاجة.

### كود الحل: طلبين في نفس اللحظة

كود الحل نسخة أصغر من غير pino: [[log]] بتطبع JSON فيه [[als.getStore()?.reqId]] ([[?.]] عشان برّه الطلب الـ store [[undefined]])، و [[chargeCard]] بتستنى وقت عشوائي لحد ٣٠ms، و [[supertest]] بيبعت طلبين A و B مع بعض بـ [[Promise.all]] من غير ما يفتح بورت. شغّلناه مرتين:

~~~text التشغيل الأول
{"reqId":"A","userId":"u1","msg":"start"}
{"reqId":"B","userId":"u2","msg":"start"}
{"reqId":"A","userId":"u1","msg":"charging"}
{"reqId":"A","userId":"u1","msg":"done"}
{"reqId":"B","userId":"u2","msg":"charging"}
{"reqId":"B","userId":"u2","msg":"done"}
{"msg":"outside any request"}
~~~

~~~text التشغيل التاني
{"reqId":"A","userId":"u1","msg":"start"}
{"reqId":"B","userId":"u2","msg":"start"}
{"reqId":"B","userId":"u2","msg":"charging"}
{"reqId":"B","userId":"u2","msg":"done"}
{"reqId":"A","userId":"u1","msg":"charging"}
{"reqId":"A","userId":"u1","msg":"done"}
{"msg":"outside any request"}
~~~

الترتيب اتغيّر (الوقت عشوائي)، بس كل سطر لسه معاه الطلب واليوزر بتوعه. وآخر سطر من غير reqId: [[JSON.stringify]] بيشيل أي خاصية قيمتها [[undefined]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[new AsyncLocalStorage()]] | مخزن واحد للتطبيق |
| [[run(store, next)]] في أول middleware | كل الطلب بيتنفّذ ومعاه الـ store بتاعه |
| [[getStore()]] | هات الـ store من أي مكان، أو [[undefined]] برّه طلب |
| [[mixin]] في pino | الـ id في كل سطر لوج لوحده |
| [[x-request-id]] داخل وخارج | تربط لوج Nginx والتطبيق وشكوى اليوزر |

- متحطش الـ context في متغير global عادي: طلبين مع بعض هيشوفوا بيانات بعض.
- لازم يبقى أول middleware عشان كل اللي بعده يبقى جواه.`,
          lines: [
            "AsyncLocalStorage من Node.",
            "مولّد id.",
            "store واحد للتطبيق كله.",
            "أول middleware.",
            "خد الـ id من Nginx لو موجود، وإلا اعمل واحد.",
            "رجّعه في الرد عشان يتربط بالشكاوى.",
            "شغّل باقي الطلب كله جوه context فيه الـ id.",
            "قفلة.",
            "بعد الـ auth...",
            "...هات الـ context بتاع الطلب ده...",
            "...وضيف عليه id اليوزر.",
            "كمّل.",
            "قفلة.",
            "الـ logger.",
            "مع كل سطر لوج...",
            "...هات الـ context...",
            "...وحط الـ reqId والـ userId لو فيه طلب.",
            "قفلة.",
            "قفلة.",
            "service مالهاش أي علاقة بـ Express.",
            "لوج عادي، والـ reqId والـ userId بيتحطوا لوحدهم.",
            "قفلة."
          ],
          sol: R`المتوقع: السطور تطلع متداخلة، زي كده: A start، B start، B charging، B done، A charging، A done. وكل سطر معاه الـ reqId والـ userId الصح بتوعه، رغم إن الاتنين شغالين في نفس الوقت.

اللوج اللي برّه أي طلب بيطلع من غير reqId، لأن [[getStore()]] بترجع [[undefined]] برّه [[run]]. عشان كده الـ mixin فيه [[ctx ?]].

لو لقيت A بياخد id بتاع B، يبقى فيه متغير عادي مشترك بدل الـ ALS، أو فيه [[enterWith]] في مكان. ولو الـ reqId فاضي جوه الـ service، يبقى الـ middleware بتاع [[run]] مش أول واحد، أو فيه مكتبة بتقطع الـ context.`,
          solCode: R`import { AsyncLocalStorage } from "node:async_hooks";
import express from "express";
import request from "supertest";

const als = new AsyncLocalStorage();
const log = (msg) => console.log(JSON.stringify({ reqId: als.getStore()?.reqId, userId: als.getStore()?.userId, msg }));
const chargeCard = async () => { await new Promise((r) => setTimeout(r, Math.random() * 30)); log("charging"); };

const app = express();
app.use((req, res, next) => als.run({ reqId: req.get("x-request-id") }, next));
app.use((req, res, next) => { als.getStore().userId = req.get("x-user"); next(); });
app.post("/pay", async (req, res) => { log("start"); await chargeCard(); log("done"); res.json({ ok: true }); });

await Promise.all([
  request(app).post("/pay").set("x-request-id", "A").set("x-user", "u1"),
  request(app).post("/pay").set("x-request-id", "B").set("x-user", "u2"),
]);
log("outside any request"); // {"msg":"outside any request"}`
        }
      ]
    }
]);
