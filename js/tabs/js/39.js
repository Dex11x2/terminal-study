// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "من مشكلة لكود",
      l: 2,
      time: R`حوالي ساعتين`,
      goal: [
        R`تاخد طلب مكتوب بالعربي وتطلّع منه **توقيع دالة** قبل ما تكتب سطر.`,
        R`تبني الحل على خطوات، **كل خطوة بتشتغل**، بدل ما تكتب الكل وتجرّب في الآخر.`,
        R`لما تعلق، تصغّر المشكلة لحد ما السبب يبان لوحده.`,
        R`تختار التركيبة الصح — والفرق بينهم **مئات الأضعاف** مش رأي.`,
      ],
      use: {
        prog: R`الفرق بين اللي بيعرف اللغة واللي بيعرف يبني مش في عدد الدوال اللي حافظها. هو في الطريقة اللي بيحوّل بيها مشكلة مبهمة لكود شغّال.`,
        cs: R`تفكيك المشكلة (decomposition) وحلّ حالة أبسط الأول (reduction) هم أقدم أدوات في علوم الحاسب. ومستقلين عن اللغة تمامًا.`,
        work: R`الطلب اللي بيجيلك مكتوب بالعربي ومبهم. وأول نص ساعة شغلك هي تحويله لحاجة محددة — ودي المهارة اللي محدش بيعلّمها.`,
      },
      lab: R`mkdir -p ~/lab/solve && cd ~/lab/solve && npm init -y && npm pkg set type=module`,
      pre: [
        { to: "js/pseudocode", why: R`الوحدة كلها بتكتب الخطوات بالكلام قبل الكود، وده امتداد ليه` },
        { to: "js/map و filter و reduce", why: R`كل الحلول بتجمّع وتفلتر بيهم، والنسخ v1 لـ v4 بتتبني فوقهم` },
        { to: "js/Map و Set", why: R`درس «اختار التركيبة الصح» والمشروع الكبير مبنيين عليهم` },
        { to: "js/اقرا الـ error", why: R`«لما تعلق» بيبدأ من رسالة الخطأ وبيكمّل بالتصغير` },
      ],
      projects: [
        { lvl: 'صغير', t: R`اختبر التركيبة بنفسك`, what: R`خد لوب في مشروعك فيها [[.find()]] أو [[.includes()]] جوه [[.map()]] وقيس الفرق قبل وبعد ما تحوّلها لـ [[Map]]. من درس «اختار التركيبة الصح».`, done: R`قست قبل وبعد بـ [[console.time]] على نفس الداتا، والناتج نفسه قبل وبعد ([[assert.deepStrictEqual]] عدّى)، والرقمين مكتوبين في رسالة الـ commit.`, sol: R`## هتشوف إيه

دالة في كتالوج متجر بتعلّم المنتجات اللي عليها خصم، وجواها [[includes]] جوه [[map]]. القياس قبل وبعد التحويل لـ [[Set]] على نفس الداتا، و [[assert.deepStrictEqual]] بيثبت إن الناتج متغيّرش، والأرقام في رسالة الـ commit:

~~~text الناتج (git log)
5157e01 catalog: markSales بـ Set بدل includes
includes جوه map كانت O(n × m). الـ Set بتتبني مرة واحدة برا الـ map.
القياس (30000 منتج، 8000 خصم، console.time، تشغيلتين):
  قبل: 349.7ms و 356.3ms
  بعد: 2.9ms و 3.0ms
الناتج متطابق: assert.deepStrictEqual مع expected.json من النسخة القديمة.

5c4a351 catalog: markSales بـ includes
~~~

حوالي **١٢٠ ضعف**. المشروع هنا متألّف عشان الحل يتنسخ ويشتغل؛ في مشروعك هتدوّر على اللوب بتاعتك بـ [[grep -rn "includes(" src]] وتعمل نفس الخطوات.

## ١. قبل: الكود والقياس

~~~js catalog.js (قبل)
// بيعلّم المنتجات اللي عليها خصم
export function markSales(products, saleIds) {
  return products.map((p) => ({ ...p, onSale: saleIds.includes(p.id) }));
}
~~~

~~~js bench.mjs
import assert from 'node:assert/strict';
import { markSales } from './catalog.js';

// داتا بحجم قريب من الحقيقي: 30 ألف منتج، و 8 آلاف عليهم خصم
const products = Array.from({ length: 30000 }, (_, i) => ({ id: 'p' + i, price: (i % 90) + 10 }));
const saleIds = Array.from({ length: 8000 }, (_, i) => 'p' + ((i * 37) % 30000));

const label = process.argv[2] ?? 'run';
console.time(label);
const out = markSales(products, saleIds);
console.timeEnd(label);

// الناتج المرجعي محفوظ من النسخة القديمة، والجديدة لازم تطابقه
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
if (!existsSync('expected.json')) writeFileSync('expected.json', JSON.stringify(out));
assert.deepStrictEqual(out, JSON.parse(readFileSync('expected.json', 'utf8')));
console.log('الناتج مطابق ✔ | عليهم خصم:', out.filter((p) => p.onSale).length);
~~~

~~~bash
node bench.mjs قبل
~~~

~~~text الناتج (تشغيلتين)
قبل: 349.727ms
الناتج مطابق ✔ | عليهم خصم: 8000
قبل: 356.264ms
الناتج مطابق ✔ | عليهم خصم: 8000
~~~

- **[[bench.mjs]]** بيقيس الدالة بس بـ [[console.time]] (بناء الداتا برا القياس).
- **[[expected.json]]:** أول تشغيل بيحفظ ناتج النسخة القديمة. وكل تشغيل بعد كده بيقارن بيه بـ [[assert.deepStrictEqual]]، فلو التحويل غيّر حرف في الناتج، السكربت هيقع.
- [[(i * 37) % 30000]]: الـ ids اللي عليها خصم متفرّقة، مش أول 8000، عشان [[includes]] متلاقيش بدري بالصدفة والقياس يكدب.
- **ليه بطيء:** لكل منتج من الـ 30000، [[includes]] بتلف على الـ 8000 لحد ما تلاقي أو تخلص. يعني لحد ٢٤٠ مليون مقارنة.

## ٢. بعد: [[Set]] برا الـ [[map]]

~~~js catalog.js (بعد)
// بيعلّم المنتجات اللي عليها خصم
export function markSales(products, saleIds) {
  const onSale = new Set(saleIds);                 // مرة واحدة برا الـ map
  return products.map((p) => ({ ...p, onSale: onSale.has(p.id) }));
}
~~~

~~~bash
node bench.mjs بعد
~~~

~~~text الناتج (تشغيلتين)
بعد: 2.875ms
الناتج مطابق ✔ | عليهم خصم: 8000
بعد: 2.976ms
الناتج مطابق ✔ | عليهم خصم: 8000
~~~

- [[new Set(saleIds)]] لفة واحدة على الـ 8000، و [[onSale.has(p.id)]] خطوة واحدة تقريبًا لكل منتج. من O(n × m) لـ O(n + m).
- السطر بتاع الـ [[Set]] **برا** الـ [[map]]. لو جوه، هيتبني 30000 مرة وهيبقى أبطأ من الأول.
- «الناتج مطابق ✔» هو الشرط الأساسي: تحسين بيغيّر النتيجة مش تحسين.

## ٣. الـ commit بالأرقام

~~~bash
git add catalog.js
git commit
~~~

ورسالة الـ commit هي اللي فوق في [[git log]]: سطر عنوان، وسطر فاضي، وبعدين ليه، والقياس قبل وبعد بالرقم، وإزاي اتأكدت إن الناتج هو هو. [[expected.json]] مش داخل الـ commit؛ ده ملف قياس مؤقت.

## غلطة حصلت

كتبت رسالة الـ commit **قبل** ما أشغّل القياس التاني، وحطيت فيها «بعد: 4.6ms و 4.4ms» من تخميني. القياس الحقيقي طلع 2.9 و 3.0. صلّحتها بـ [[git commit --amend]] (الـ commit لسه عندي ومااترفعش، فالـ amend آمن). القاعدة: الرقم يتكتب **بعد** ما يتقاس، بالظبط زي ما طلع.` },
        { lvl: 'صغير', t: R`دفتر «علقت فين»`, what: R`كل مرة تعلق أكتر من ١٥ دقيقة، اكتب: المشكلة، وإيه اللي جرّبته، وإيه اللي حلّها. بعد شهر هتلاقي **نفس** الأسباب بتتكرر — ودي أسرع طريقة تبطّل تقع فيها. من درس «لما تعلق: صغّر المشكلة».`, done: R`فيه ٥ مداخل على الأقل، وكل واحد فيه أصغر حالة بتعيد الباج بالكود، وصنّفتهم (نوع غلط، مفتاح ناقص، async، ...) ولقيت أكتر سبب بيتكرر.`, sol: R`## هتشوف إيه

دفتر بشكل ثابت (ملف JSON) فيه كل مرة علقت فيها أكتر من ١٥ دقيقة، وأداة صغيرة بتلخّصه وبتشغّل «أصغر حالة» بتاعة كل مدخل عشان تتأكد إنها لسه بتعيد الباج. الدفتر ده نموذج متألّف بـ ٦ مداخل؛ دفترك انت هيتملي من شغلك.

~~~text الناتج (node tally.mjs)
6 مداخل، 205 دقيقة علقت فيها

نوع غلط        ■■■  3 مرات، 95 دقيقة
مفتاح ناقص     ■    1 مرات، 25 دقيقة
async          ■    1 مرات، 55 دقيقة
مفاتيح موروثة  ■    1 مرات، 30 دقيقة

الـ repro لكل مدخل (لسه بيعيد الباج؟):
  2026-10-03 0 + '10'                                             -> '010'
  2026-10-07 Number(undefined) + 5                                -> NaN
  2026-10-12 (async () => ({ name: 'منى' }))().name               -> undefined
  2026-10-20 const c = {}; c.constructor = (c.constructor || 0) + 1 -> 'function Object() { [native code] }1'
  2026-10-28 [10, 9, 1].sort()                                    -> [ 1, 10, 9 ]
  2026-11-04 ['1', '2', '3'].map(parseInt)                        -> [ 1, NaN, NaN ]
~~~

**الاستنتاج من الدفتر:** أكتر سبب بيتكرر «نوع غلط» (٣ من ٦، و ٩٥ دقيقة): نص مكان رقم، و [[sort]] بيقارن كنصوص، و [[parseInt]] بياخد الـ index. يعني الخطوة الأولى في درس «لما تعلق» ([[typeof]] على المدخلات) كانت هتوفّر حوالي نص الوقت. ودي المعلومة اللي الدفتر معمول عشانها.

## شكل المدخل

كل مدخل فيه نفس الحقول، عشان الأداة تقدر تقراه:

| الحقل | فيه إيه |
|---|---|
| [[date]] و [[minutes]] | إمتى وقد إيه |
| [[kind]] | التصنيف: نوع غلط، مفتاح ناقص، async، مفاتيح موروثة... |
| [[problem]] | العَرَض زي ما شفته («طالع NaN») |
| [[tried]] | اللي جرّبته وماحلّش، بصراحة |
| [[repro]] | **أصغر كود** بيعيد الباج، سطر واحد لو أمكن |
| [[fix]] | التصليح وسببه |

~~~json stuck-log.json
[
  {
    "date": "2026-10-03", "minutes": 40, "kind": "نوع غلط",
    "problem": "مجموع سلة المشتريات طالع 010205 بدل 35",
    "tried": "قريت الـ reduce ٣ مرات، وغيّرت الأسماء",
    "repro": "0 + '10'",
    "fix": "Number(r.price) قبل الجمع: الأسعار كانت جاية نصوص من الـ API"
  },
  {
    "date": "2026-10-07", "minutes": 25, "kind": "مفتاح ناقص",
    "problem": "إجمالي الفاتورة NaN من غير أي error",
    "tried": "console.log على المجموع في الآخر بس",
    "repro": "Number(undefined) + 5",
    "fix": "صف فيه amount مش price. بقيت أطبع Object.keys لكل صف، والصف الغلط بيترمي بسبب"
  },
  {
    "date": "2026-10-12", "minutes": 55, "kind": "async",
    "problem": "اسم اليوزر بيظهر undefined في الهيدر",
    "tried": "فكرت إن الـ API بيرجّع داتا ناقصة",
    "repro": "(async () => ({ name: 'منى' }))().name",
    "fix": "نسيت await: الدالة بترجّع Promise، والـ Promise ملوش .name"
  },
  {
    "date": "2026-10-20", "minutes": 30, "kind": "مفاتيح موروثة",
    "problem": "عدّاد الكلمات طلّع نص غريب لكلمة constructor",
    "tried": "دوّرت على الكلمة في النص الأصلي",
    "repro": "const c = {}; c.constructor = (c.constructor || 0) + 1",
    "fix": "Map بدل object"
  },
  {
    "date": "2026-10-28", "minutes": 20, "kind": "نوع غلط",
    "problem": "ترتيب الأسعار طالع 1 ثم 10 ثم 9",
    "tried": "افتكرت إن الداتا نفسها مترتبة غلط",
    "repro": "[10, 9, 1].sort()",
    "fix": "sort من غير دالة بيقارن كنصوص. sort((a, b) => a - b)"
  },
  {
    "date": "2026-11-04", "minutes": 35, "kind": "نوع غلط",
    "problem": "تحويل خانات الفورم لأرقام طلّع NaN في كل حاجة بعد الأولى",
    "tried": "شكّيت في قيم الفورم نفسها",
    "repro": "['1', '2', '3'].map(parseInt)",
    "fix": "map بتبعت الـ index كأساس لـ parseInt. map(Number)"
  }
]
~~~

## الأداة

~~~js tally.mjs
// node tally.mjs stuck-log.json : ملخص الدفتر، وبيشغّل الـ repro بتاع كل مدخل يتأكد إنه لسه بيعيد الباج
import { readFile } from 'node:fs/promises';
import { inspect } from 'node:util';
import vm from 'node:vm';

const file = process.argv[2] ?? 'stuck-log.json';
const log = JSON.parse(await readFile(file, 'utf8'));

const byKind = new Map();
for (const e of log) {
  const k = byKind.get(e.kind) ?? { count: 0, minutes: 0 };
  k.count++;
  k.minutes += e.minutes;
  byKind.set(e.kind, k);
}

console.log($__bt$__{log.length} مداخل، $__{log.reduce((s, e) => s + e.minutes, 0)} دقيقة علقت فيها\n$__bt);
for (const [kind, { count, minutes }] of [...byKind].sort((a, b) => b[1].count - a[1].count)) {
  console.log(kind.padEnd(14), '■'.repeat(count).padEnd(4), count, 'مرات،', minutes, 'دقيقة');
}

console.log('\nالـ repro لكل مدخل (لسه بيعيد الباج؟):');
for (const e of log) {
  const value = await vm.runInNewContext(e.repro);   // سياق معزول، والكود من الدفتر بتاعك انت
  console.log(' ', e.date, e.repro.padEnd(52), '->', inspect(value));
}
~~~

- **[[byKind]]** ([[Map]]): لكل تصنيف عدد المرات ومجموع الدقايق. والترتيب بالعدد تنازلي، فأكتر سبب بيطلع فوق.
- [['■'.repeat(count)]]: عمود بسيط بيخلي الفرق يبان بالعين.
- **[[vm.runInNewContext(e.repro)]]:** بيشغّل نص الـ repro كـ JavaScript في سياق جديد معزول عن متغيرات الأداة، ويرجّع قيمة آخر تعبير. كده كل [[repro]] في الدفتر **متجرّب فعلًا** مش مكتوب من الذاكرة. و [[await]] قبله عشان لو repro رجّع Promise.
- [[inspect]] بدل [[JSON.stringify]]: أول نسخة كانت بـ [[JSON.stringify]] وطبعت [[null]] مكان [[NaN]] (JSON مفيهوش NaN)، فكانت هتكدب في أهم سطرين.

> [[node:vm]] **مش حماية** من كود خبيث؛ هو بس بيفصل المتغيرات. هنا ده كفاية لأن الكود من دفترك انت. متشغّلش بيه كود من حد تاني.

## كل مدخل اتصغّر إزاي

- **المجموع [[010205]]:** من [[reduce]] بـ ٣ صفوف لـ [[0 + '10']]. السطر ده لوحده بيقول «الـ [[+]] بتلزّق».
- **NaN من غير error:** من فاتورة كاملة لـ [[Number(undefined) + 5]]. يعني فيه مفتاح ناقص.
- **[[undefined]] في الهيدر:** من component كامل لسطر: دالة [[async]] بترجّع Promise، و [[.name]] على الـ Promise نفسه [[undefined]]. الـ 55 دقيقة راحوا في الشك في الـ API بدل [[typeof]] على اللي راجع (كان هيقول [[object]] وهو Promise).
- **[[constructor]]:** من عدّاد كلمات على نص طويل لـ object فاضي وسطر واحد.

**الغلطة اللي بتبوّظ الدفتر:** تكتب «اتحلّت» في [[fix]] من غير السبب، أو تكتب [[repro]] طويل (الدالة كلها). بعد شهر مش هتفهم المدخل، ومش هتقدر تصنّفه، ومش هتطلع منه بحاجة.` },
        { lvl: 'متوسط', dir: "bakery-landing", t: R`طبّقها على مشروع ١ في تاب «المشاريع»`, what: R`قبل ما تكتب سطر في landing page، اكتب المدخلات والمخرجات والقواعد على ورقة. وقارن الوقت اللي خلّصت فيه بآخر مرة بدأت من غير ما تعمل كده. من درسي «من جملة لتوقيع دالة» و «ابدأ بأبسط حاجة تشتغل».`, done: R`الورقة فيها الأربع إجابات ومثالين قبل أول سطر كود، والـ commits بتبيّن نسخ صغيرة كل واحدة شغالة (مش commit واحد في الآخر)، والوقتين مكتوبين جنب بعض.`, sol: R`## الشكل النهائي

~~~live 520 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فرن الحارة</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #2b2118; background: #fffaf2; }
  header, main { max-width: 60rem; margin: 0 auto; padding: 16px; }
  header { border-bottom: 3px solid #d98e2b; }
  h1 { margin: 0; color: #8a4b08; }
  .cards { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; grid-template-columns: 1fr; }
  .cards li { background: #fff; border: 1px solid #ecd9bf; border-radius: 10px; padding: 12px; overflow-wrap: anywhere; }
  .cards h3 { margin: 0 0 4px; font-size: 1.05rem; }
  .cards p { margin: 0; }
  nav { float: inline-end; }
  nav a { color: #8a4b08; }
  .order { display: inline-block; padding: 10px 18px; border-radius: 8px; background: #1f7a3a; color: #fff; text-decoration: none; font-weight: 700; }
  .order:focus-visible { outline: 3px solid #d98e2b; outline-offset: 2px; }
  @media (min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
</style>
</head>
<body>
  <header>
    <nav><a href="en.html" lang="en" hreflang="en">English</a></nav>
    <h1>فرن الحارة</h1>
    <p>عيش بلدي وفينو طازة كل يوم من الفجر.</p>
  </header>
  <main>
    <section aria-labelledby="products">
      <h2 id="products">منتجاتنا</h2>
      <ul class="cards">
        <li><h3>عيش بلدي</h3><p>٥ أرغفة بـ ١٠ جنيه</p></li>
        <li><h3>عيش فينو بالسمسم والحبة السودا</h3><p>الكيس بـ ٢٥ جنيه</p></li>
        <li><h3>بقسماط</h3><p>الكيلو بـ ٦٠ جنيه</p></li>
      </ul>
    </section>
    <section aria-labelledby="visit">
      <h2 id="visit">المواعيد والعنوان</h2>
      <p>كل يوم من ٥ الفجر لـ ١١ بالليل، شارع النصر قدام المدرسة.</p>
      <a class="order" href="https://wa.me/201000000000">اطلب على واتساب</a>
    </section>
  </main>
</body>
</html>
~~~

ده حل نموذجي لـ «فرن الحارة» (محل متألّف) بالطريقة: ورقة الأول، وبعدين ٤ نسخ صغيرة كل واحدة شغالة ولها commit. مشروع ١ في تاب «المشاريع» فيه تفاصيل أكتر (accessibility و Lighthouse والنشر)؛ هنا التركيز على **ترتيب الشغل**.

## ١. الورقة قبل أول سطر

~~~text PLAN.md
# ورقة قبل الكود: landing page لـ «فرن الحارة»

## ١. إيه اللي داخل؟
- اسم المحل وجملة واحدة عنه
- ٣ منتجات: الاسم والسعر بالجنيه
- المواعيد، والعنوان، ورقم واتساب
- اللغتين: عربي (الأساسي) وإنجليزي

## ٢. إيه اللي طالع؟
- صفحتين: index.html (عربي، RTL) و en.html (إنجليزي، LTR)، ولينك بينهم فوق
- أقسام بالترتيب: هيدر، المنتجات، المواعيد والعنوان، زرار «اطلب على واتساب»

## ٣. القواعد
- من غير JavaScript (الصفحة لازم تشتغل لو السكربتات مقفولة)
- على 360px: مفيش scroll بالعرض، والمنتجات تحت بعض
- على 768px وأكتر: المنتجات ٣ جنب بعض

## ٤. الحالات الحدّية
- اسم منتج طويل: ميكسرش الكارت
- رقم واتساب: لينك wa.me بالأرقام بس (من غير + ولا مسافات)
- اللينك للغة التانية عليه lang الصح

## مثالين
- عادي: موبايل 360px، أفتح الصفحة، أشوف ٣ كروت تحت بعض، وأضغط واتساب
- حدّي: منتج اسمه «عيش فينو بالسمسم والحبة السودا» على 360px: الاسم بيلف لسطرين والكارت بيطول
~~~

الأربع إجابات ومثالين، والأهم إن القواعد فيها **أرقام بتتقاس** (360px، 768px، ٣ جنب بعض)، فكل نسخة ليها «خلصت» واضحة.

## ٢. النسخ: كل واحدة بتشتغل

~~~bash
git log --reverse --format='%h %ad %s' --date=format:'%H:%M:%S'
~~~

~~~text الناتج
f9e03bf 12:46:58 الورقة: المدخلات والمخرجات والقواعد والحالات الحدّية
b5f46a7 12:46:59 v1: الهيكل وعنوان المحل بس
64a1592 12:47:11 v2: المحتوى كله من غير CSS
4a6b934 12:47:23 v3: CSS: كروت تحت بعض في الموبايل و ٣ جنب بعض من 768px
7f54047 12:47:37 v4: النسخة الإنجليزي ولينك بين اللغتين
~~~

| النسخة | اتضاف إيه | بتشتغل إزاي تتأكد |
|---|---|---|
| v1 | [[<!doctype>]] و [[lang]] و [[dir]] و [[<h1>]] بس | افتحها: العنوان يمين والتاب اسمه «فرن الحارة» |
| v2 | المحتوى كله بـ HTML semantic، من غير CSS | الصفحة مقروءة من غير أي ستايل، وزرار واتساب بيفتح |
| v3 | CSS: [[grid]] عمود واحد، و ٣ أعمدة من 768px | القياس تحت |
| v4 | [[en.html]] ولينك [[hreflang]] بين الصفحتين | [[lang]] و [[dir]] صح في الاتنين |

> الأوقات دي من بنائي أنا (بالملفات جاهزة في دماغي، فالفروق ثواني). اللي المشروع بيطلبه منك: سجّل **وقتك انت** بالطريقة دي، وجنبه وقت آخر مرة بدأت فيها مشروع من غير ورقة.

## ٣. الملفات النهائية

[[index.html]] هو اللي فوق في «الشكل النهائي»، والنسخة الإنجليزي:

~~~live 520 en.html
<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Al-Hara Bakery</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #2b2118; background: #fffaf2; }
  header, main { max-width: 60rem; margin: 0 auto; padding: 16px; }
  header { border-bottom: 3px solid #d98e2b; }
  h1 { margin: 0; color: #8a4b08; }
  .cards { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; grid-template-columns: 1fr; }
  .cards li { background: #fff; border: 1px solid #ecd9bf; border-radius: 10px; padding: 12px; overflow-wrap: anywhere; }
  .cards h3 { margin: 0 0 4px; font-size: 1.05rem; }
  .cards p { margin: 0; }
  nav { float: inline-end; }
  nav a { color: #8a4b08; }
  .order { display: inline-block; padding: 10px 18px; border-radius: 8px; background: #1f7a3a; color: #fff; text-decoration: none; font-weight: 700; }
  .order:focus-visible { outline: 3px solid #d98e2b; outline-offset: 2px; }
  @media (min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
</style>
</head>
<body>
  <header>
    <nav><a href="index.html" lang="ar" hreflang="ar">عربي</a></nav>
    <h1>Al-Hara Bakery</h1>
    <p>Fresh baladi bread and rolls every day from dawn.</p>
  </header>
  <main>
    <section aria-labelledby="products">
      <h2 id="products">Our bread</h2>
      <ul class="cards">
        <li><h3>Baladi bread</h3><p>5 loaves for EGP 10</p></li>
        <li><h3>Sesame and black seed rolls</h3><p>EGP 25 a bag</p></li>
        <li><h3>Rusks</h3><p>EGP 60 a kilo</p></li>
      </ul>
    </section>
    <section aria-labelledby="visit">
      <h2 id="visit">Hours and address</h2>
      <p>Daily, 5 am to 11 pm, El-Nasr Street opposite the school.</p>
      <a class="order" href="https://wa.me/201000000000">Order on WhatsApp</a>
    </section>
  </main>
</body>
</html>
~~~

- **[[overflow-wrap: anywhere]]** على الكارت: ده جزء من رد الحالة الحدّية في الورقة («اسم منتج طويل»). الاسم اللي فيه مسافات بيلف لوحده، و [[overflow-wrap]] بتغطي الحالة الأوحش: كلمة واحدة طويلة من غير مسافات (كود منتج أو رابط) كانت هتوسّع الكارت وتعمل scroll بالعرض.
- **[[grid-template-columns: 1fr]]** ثم [[repeat(3, 1fr)]] من 768px: نفس القاعدة اللي في الورقة بالحرف.
- **[[float: inline-end]]** على لينك اللغة: بيروح «آخر السطر» حسب اتجاه الصفحة: شمال في العربي ويمين في الإنجليزي، من غير CSS مختلف للصفحتين.
- **[[lang="en" hreflang="en"]]** على لينك «English»: قارئ الشاشة بينطق الكلمة إنجليزي، والـ [[hreflang]] بيقول إن الصفحة اللي رايحلها إنجليزي.
- [[https://wa.me/201000000000]]: أرقام بس من غير [[+]] ولا مسافات (قاعدة من الورقة). الرقم هنا متألّف.

## ٤. القياس (Chromium، Playwright)

~~~text الناتج
index.html @360px: scrollWidth=360 | صفوف الكروت=3 | كارت 2: 328x82 | lang=ar dir=rtl
index.html @768px: scrollWidth=768 | صفوف الكروت=1 | كارت 2: 237x109 | lang=ar dir=rtl
en.html @360px: scrollWidth=360 | صفوف الكروت=3 | كارت 2: 328x82 | lang=en dir=ltr
en.html @768px: scrollWidth=768 | صفوف الكروت=1 | كارت 2: 237x109 | lang=en dir=ltr
~~~

- [[scrollWidth]] بيساوي عرض الشاشة في الأربع حالات: مفيش scroll بالعرض.
- «صفوف الكروت» = عدد قيم [[top]] المختلفة للكروت: ٣ صفوف على الموبايل (تحت بعض) وصف واحد على 768 (جنب بعض).
- كارت ٢ (الاسم الطويل) ارتفاعه 82 على 360 و 109 على 768: الاسم لف لسطرين لما العمود ضاق، ومكسرش العرض.

## ليه الترتيب ده

في v3 الـ CSS اتكتب على صفحة **فيها المحتوى كله** من v2، ومنها الكارت بالاسم الطويل، فالحالة الحدّية كانت قدام عيني وأنا بكتب الـ grid، والقياس فوق اتعمل عليها. لو الـ CSS اتكتب على صفحة فاضية بنصوص قصيرة، الكارت ده كان هيظهر لأول مرة في الآخر. وكل commit فيه حاجة واحدة، فلو v3 كسرت حاجة، [[git diff 64a1592 4a6b934]] بيورّي الـ 14 سطر بس اللي اتغيّروا.` },
        { lvl: 'متوسط', t: R`اقرا مكتبة صغيرة كاملة`, what: R`[[ms]] أو [[nanoid]] على npm مكتبات صغيرة. اقرا الكود كله وافهم كل سطر. ودي أسرع طريقة تشوف كود محترف. وصغّر أي سطر مش فاهمه لحالة تجربها في [[node -e]] (درس «لما تعلق: صغّر المشكلة»).`, done: R`كتبت تعليق بالعربي جنب كل دالة، ولقيت ٣ حالات حدّية المكتبة بتتعامل معاها وكتبت لكل واحدة [[assert]] بيعدّي، وتقدر تشرح لزميل في ٣ سطور المكتبة بتعمل إيه من جوه.`, sol: R`## هتشوف إيه

قراية كاملة لمكتبة [[ms]] (نسخة 2.1.3، ملف واحد 162 سطر بيحوّل [['2h']] لملي ثواني والعكس): ملاحظات بالعربي لكل دالة، وتصغير السطور الصعبة بـ [[node -e]]، و ٤ اختبارات لحالات حدّية المكتبة بتتعامل معاها. ومنهم اتنين **توقّعي فيهم طلع غلط**، وده أهم حاجة في المشروع.

~~~text الناتج النهائي (node --test ms-edges.test.mjs)
✔ ١) نص أطول من 100 حرف بيرجّع undefined من غير ما يجرّب الـ regex (0.9207ms)
✔ ٢) نص فاضي بيرمي، ونص مش مفهوم بيرجّع undefined (0.5017ms)
✔ ٣) الجمع في long من 1.5 مش من 2 (0.1863ms)
✔ ٤) السنة 365.25 يوم، والأرقام العشرية والسالبة في النص (0.1148ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~

## ١. هات الكود من غير ما تسطّب حاجة

~~~bash
mkdir ms-read && cd ms-read
npm pack ms@2.1.3
tar xzf ms-2.1.3.tgz
wc -l package/index.js
~~~

~~~text الناتج
ms-2.1.3.tgz
162 package/index.js
~~~

[[npm pack]] بينزّل الـ tarball اللي بيتنشر على npm بالظبط، من غير [[node_modules]] ولا scripts بتشتغل. وعشان الاختبارات تقدر تعمل [[import ms from 'ms']]، نسخت فولدر [[package]] لـ [[node_modules/ms]] في فولدر المشروع.

## ٢. الملاحظات: كل دالة بتعمل إيه

~~~text ms-notes.md
السطور 5–10: ثوابت الوحدات بالملي ثانية (s, m, h, d, w, y). السنة = 365.25 يوم (متوسط بالسنة الكبيسة).

السطور 26–38 (الدالة اللي بتتصدّر): الباب الوحيد.
  نص مش فاضي -> parse. رقم محدود (isFinite) -> fmtShort أو fmtLong حسب options.long.
  أي حاجة تانية (نص فاضي، NaN، Infinity، object) -> بترمي Error فيه القيمة بـ JSON.stringify.

السطور 48–103 parse(str): نص -> ملي ثواني.
  - لو النص أطول من 100 حرف: ترجع undefined على طول (حماية من regex بطيء على مدخل ضخم).
  - regex واحد بياخد الرقم (ممكن سالب وممكن عشري) والوحدة (اختيارية، والافتراضي ms).
  - switch على الوحدة بكل أشكالها (h, hr, hrs, hour, hours...) وبيضرب في الثابت.
  - مش مطابق -> undefined، مش Error. (عكس الدالة الرئيسية مع النص الفاضي!)

السطور 113–128 fmtShort(ms): ملي ثواني -> '2h'. أكبر وحدة الرقم المطلق بتاعه يوصلها، و Math.round.
السطور 138–153 fmtLong(ms): نفس الفكرة بكلمة كاملة: '2 hours'.
السطور 159–162 plural(...): بتحط s في الآخر لو الرقم المطلق >= 1.5 من الوحدة.

ملخص في 3 سطور لزميل:
  ms بتحوّل بين نص زي '2h' وعدد ملي ثواني في الاتجاهين، بـ regex واحد و switch.
  المدخل الغلط: النص الفاضي بيرمي، والنص اللي مش مفهوم بيرجّع undefined من غير صوت.
  التنسيق بيقرّب بـ Math.round لأكبر وحدة، والجمع بيبدأ من 1.5.
~~~

## ٣. السطر الصعب: الـ regex، متصغّر بـ [[node -e]]

~~~bash
node -e "const re=/^(-?(?:\d+)?\.?\d+) *(ms|s|m|h)?$/i; for (const t of ['1h','.5h','1.5 h','1.h','-2m','1  s']) console.log(JSON.stringify(t), '->', JSON.stringify(re.exec(t)?.slice(1,3) ?? null))"
~~~

~~~text الناتج
"1h" -> ["1","h"]
".5h" -> [".5","h"]
"1.5 h" -> ["1.5","h"]
"1.h" -> null
"-2m" -> ["-2","m"]
"1  s" -> ["1","s"]
~~~

نسخة مصغّرة من الـ regex (٤ وحدات بس) وجرّبتها على أشكال. اللي اتفهم منها: [[(?:\d+)?\.?\d+]] معناها «أرقام اختيارية، ونقطة اختيارية، وأرقام لازم». فـ [[.5]] بتعدّي، و [[1.]] لأ (لازم رقم بعد النقطة). و [[ *]] أي عدد مسافات بين الرقم والوحدة. وأكدت على المكتبة نفسها: [[ms('1.h')]] بـ [[undefined]]، و [[ms('1  s')]] بـ 1000، و [[ms('5')]] بـ 5 (من غير وحدة = ms).

## ٤. الاختبارات: ٣ حالات حدّية وأكتر

~~~js ms-edges.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ms from 'ms';

test('١) نص أطول من 100 حرف بيرجّع undefined من غير ما يجرّب الـ regex', () => {
  assert.equal(ms('1'.repeat(101)), undefined);
  assert.ok(Number.isFinite(ms('1'.repeat(100))));   // 100 حرف بالظبط لسه بيتحلل (1.11e99)
});

test('٢) نص فاضي بيرمي، ونص مش مفهوم بيرجّع undefined', () => {
  assert.throws(() => ms(''), /val is not a non-empty string or a valid number/);
  assert.equal(ms('ساعة'), undefined);
  assert.equal(ms('1 fortnight'), undefined);
  assert.throws(() => ms(NaN), /val=null/);          // JSON.stringify(NaN) = null في الرسالة
});

test('٣) الجمع في long من 1.5 مش من 2', () => {
  assert.equal(ms(60_000, { long: true }), '1 minute');
  assert.equal(ms(89_000, { long: true }), '1 minute');     // 1.48 دقيقة
  assert.equal(ms(90_000, { long: true }), '2 minutes');    // 1.5 بالظبط: Math.round بقت 2 والجمع بدأ
  assert.equal(ms(90_000), '2m');
  assert.equal(ms(-90_000), '-1m');                          // Math.round(-1.5) = -1: السالب مش مراية الموجب
});

test('٤) السنة 365.25 يوم، والأرقام العشرية والسالبة في النص', () => {
  assert.equal(ms('1y'), 365.25 * 24 * 60 * 60 * 1000);
  assert.equal(ms('.5h'), 30 * 60 * 1000);
  assert.equal(ms('-1.5 Hours'), -5_400_000);                // الحروف مش فارقة (flag i)
});
~~~

## اللي توقعته غلط (أول تشغيل)

~~~text أول تشغيل: 2 فشلوا
✖ ١) نص أطول من 100 حرف بيرجّع undefined من غير ما يجرّب الـ regex (1.4744ms)
✖ ٣) الجمع في long من 1.5 مش من 2 (0.3091ms)
ℹ pass 2
ℹ fail 2
    actual: 1.111111111111111e+99,
  '-1m' !== '-2m'
~~~

- **الأول غلطة مني في الحساب:** كتبت إن [['1'.repeat(100)]] = [[1e99]]، والحقيقة إن ١٠٠ واحد ورا بعض = 1.11 × 10^99. المكتبة صح، والاختبار اتعدّل يفحص إنه رقم محدود بس.
- **التاني اكتشاف حقيقي عن المكتبة:** [[ms(90000)]] بـ [['2m']] بس [[ms(-90000)]] بـ [['-1m']] مش [['-2m']]. السبب في سطر 122: [[Math.round(ms / m)]]، و [[Math.round]] في JavaScript بيقرّب الـ .5 لفوق ناحية +∞ دايمًا: [[Math.round(-1.5)]] بـ [[-1]] (جرّبت: [[2 -1 3 -2]] لـ 1.5 و -1.5 و 2.5 و -2.5). يعني السالب مش مراية الموجب. اتكتب كاختبار عشان أي حد يغيّر التقريب يعرف إنه بيغيّر السلوك ده.

**الغلطة الشائعة في القراية:** تقرا الكود وتقول «فهمت» من غير ما تشغّل ولا سطر. الاتنين اللي فوق مكانوش هيبانوا بالقراية.` },
        { lvl: 'كبير', t: R`منظّف تقارير المبيعات`, what: R`[[report.mjs]] بياخد ملف JSON فيه طلبات جاية من أكتر من مصدر (أسعار نصوص، ومفاتيح ناقصة، ومدن بمسافات وبحروف مختلفة، و status بأشكال مختلفة)، ويطلّع تقرير لكل مدينة: عدد، ومجموع، ومتوسط، وأعلى طلب. من الوحدة كلها: توقيع الأول، ونسخ على خطوات، وتصغير لكل باج، و [[Map]] و [[Set]].`, done: R`على ملف فيه ٥٠ صف منهم ١٠ بايظين: التقرير صح، والصفوف المرفوضة بتتطبع مع سبب كل واحد ومبتوقّعش الأداة، و [[check.mjs]] بـ [[node:assert]] فيه الحالات الحدّية (ملف فاضي، وكله مرفوض، ومدينة واحدة، و [[constructor]] كاسم مدينة)، وملف مش موجود أو JSON بايظ بيطلّع رسالة واضحة وكود خروج ١، وتشغيله مرتين بيطلّع نفس الناتج.`, ext: R`خليه يقرا CSV كمان، ويطلّع التقرير HTML أو CSV، وزوّد فلتر بالتاريخ من الترمنال.`, sol: R`## هتشوف إيه

أداة ترمنال بتاخد ملف طلبات جاي من أكتر من مصدر (أسعار نصوص وأرقام عربي وفواصل، ومدن بمسافات وبأشكال كتابة مختلفة وبالإنجليزي، و status بلغتين)، وبتطلّع تقرير لكل مدينة، والصفوف البايظة بتتطبع بسببها من غير ما الأداة تقع:

~~~text الناتج (node report.mjs orders.json)
50 صف: 32 مدفوع اتحسب، 8 مش مدفوع، 10 مرفوض

الإسكندرية   عدد  12 | مجموع     20413 | متوسط  1701.08 | أعلى S012 (2557)
القاهرة      عدد  11 | مجموع     17799 | متوسط  1618.09 | أعلى S033 (2895)
الجيزة       عدد   6 | مجموع      9570 | متوسط     1595 | أعلى S002 (2309)
أسوان        عدد   3 | مجموع      6307 | متوسط  2102.33 | أعلى S037 (2171)

الصفوف المرفوضة:
  صف 3 (id B01): مدينة فاضية أو ناقصة
  صف 8 (id B02): مدينة فاضية أو ناقصة
  صف 13 (id B03): المبلغ مش رقم: "خمسمية"
  صف 18 (id B04): المبلغ مش رقم: null
  صف 23 (id B05): مبلغ سالب
  صف 28 (id B06): status مش معروف: "shipped?"
  صف 33 (id -): مفيش id
  صف 38 (id -): الصف مش object
  صف 43 (id -): الصف مش object
  صف 48 (id B10): المبلغ مش رقم: ""
~~~

~~~text والأخطاء اللي بتوقف الأداة: رسالة واضحة وكود خروج 1
$ node report.mjs nope.json
✖ الملف مش موجود: nope.json
$ node report.mjs broken.json
✖ الملف مش JSON سليم: Expected double-quoted property name in JSON at position 11 (line 2 column 1)
$ node report.mjs
✖ الاستخدام: node report.mjs <ملف.json>
~~~

## الصورة الكبيرة

~~~text
 orders.json ──► report.mjs ──► buildReport ──► لكل صف: cleanRow ──► سليم ومدفوع؟ ──► Map بالمدينة
 (ملف خام)       (قراية الملف     (lib/report.js)   (lib/clean.js)        │                    │
                  والأخطاء)                                            مرفوض ──► rejected      ▼
                                                                                      formatReport ──► الترمنال
~~~

## ليه الأدوات دي

| القرار | اخترنا | البديل | ليه |
|---|---|---|---|
| التجميع | [[Map]] بمفتاح المدينة | object عادي | مدينة اسمها [[constructor]] كانت هتوقّع الأداة (اتجرّب تحت) |
| الحالات المقبولة | [[Set]] لـ [[PAID]] و [[NOT_PAID]] | [[if]] طويلة | قايمة واضحة تتعدّل في سطر، و [[has]] سريعة |
| مقارنة المدن | [[cityKey]] بيوحّد أشكال الحروف | مقارنة النص زي ما هو | [[القاهرة]] و [[القاهره]] و [[القاهـــرة]] نفس المدينة |
| الإنجليزي | جدول [[CITY_ALIASES]] صريح | ترجمة تلقائية | قرار مكتوب قدام صاحب التقرير، مش تخمين متخبّي |
| الفحص | [[node:test]] و [[node:assert]] | Vitest أو Jest | مدمجين في Node، و [[node check.mjs]] لوحده بيشغّلهم |
| الداتا | [[gen-data.mjs]] بعشوائي ثابت | ملف مكتوب بإيد | ٥٠ صف بيتولدوا زي ما هم كل مرة، فالاختبار يقدر يقارن بالحرف |

## الملفات

~~~text
sales-report/
  package.json      {"type":"module"}
  report.mjs        الأداة: قراية الملف والأخطاء والطباعة
  lib/clean.js      صف خام -> صف نضيف أو سبب رفض
  lib/report.js     التجميع والتقرير
  gen-data.mjs      بيعمل orders.json (50 صف، منهم 10 بايظين)
  check.mjs         9 اختبارات
~~~

## البناء خطوة خطوة

### ١. التوقيع والأسئلة الأول (درس «من جملة لتوقيع دالة»)

- **المدخل:** مصفوفة طلبات، كل طلب فيه [[id]] و [[city]] و [[total]] (أو [[amount]] من المصدر التاني) و [[status]].
- **المخرج:** لكل مدينة عدد ومجموع ومتوسط وأعلى طلب، مرتّبين بالمجموع، ولستة مرفوض بالسبب.
- **قواعد اتقررت:** المدفوع بس بيتحسب (والملغي والـ pending مش مرفوضين، بس مش محسوبين)، و status مش معروف = مرفوض، والمبلغ الفاضي مرفوض مش صفر، والسالب مرفوض.

### ٢. الداتا

~~~js gen-data.mjs
// node gen-data.mjs : بيعمل orders.json فيه 50 صف (40 سليم بأشكال مختلفة + 10 بايظين)، ونفس الملف كل مرة
import { writeFileSync } from 'node:fs';

let seed = 42;
const rand = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;   // عشوائي بس ثابت
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

const cityForms = ['القاهرة', 'القاهره', ' القاهرة ', 'cairo', 'الإسكندرية', 'الاسكندرية', 'Alexandria',
                   'الجيزة', 'الجيزه', 'أسوان', 'القاهـــرة'];
const statuses = ['paid', 'PAID', 'مدفوع', 'paid', 'pending', 'ملغي'];
const amountForms = [(n) => n, (n) => String(n), (n) => n.toLocaleString('en-US'),
                     (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d])];

const rows = [];
for (let i = 1; i <= 40; i++) {
  const n = 50 + Math.floor(rand() * 3000);
  rows.push({ id: 'S' + String(i).padStart(3, '0'), city: pick(cityForms), total: pick(amountForms)(n), status: pick(statuses) });
}

const bad = [
  { id: 'B01', total: 300, status: 'paid' },                         // مفيش مدينة
  { id: 'B02', city: '   ', total: 300, status: 'paid' },            // مدينة مسافات بس
  { id: 'B03', city: 'الجيزة', total: 'خمسمية', status: 'paid' },     // المبلغ كلام
  { id: 'B04', city: 'الجيزة', total: null, status: 'paid' },         // المبلغ null
  { id: 'B05', city: 'أسوان', total: -200, status: 'paid' },          // سالب
  { id: 'B06', city: 'القاهرة', total: 100, status: 'shipped?' },     // status مش معروف
  { city: 'القاهرة', total: 100, status: 'paid' },                   // مفيش id
  null,                                                              // مش object
  ['القاهرة', 100],                                                  // مصفوفة مش object
  { id: 'B10', city: 'القاهرة', total: '' , status: 'paid' },         // مبلغ فاضي (Number('') كانت هتبقى 0)
];
// البايظين متوزعين وسط السليمين مش في الآخر
bad.forEach((row, k) => rows.splice(3 + k * 5, 0, row));

writeFileSync('orders.json', JSON.stringify(rows, null, 2) + '\n');
console.log('orders.json:', rows.length, 'صف');
~~~

~~~bash
node gen-data.mjs
~~~

~~~text الناتج، وأول صفوف في orders.json (كل صف متلخّص في سطر)
orders.json: 50 صف
[
  { "id": "S001", "city": "الاسكندرية", "total": "١٧٩٦", "status": "pending" },
  { "id": "S002", "city": "الجيزة", "total": "2,309", "status": "paid" },
  { "id": "S003", "city": " القاهرة ", "total": "197", "status": "ملغي" },
  { "id": "B01", "total": 300, "status": "paid" },
  ...
~~~

- [[rand]]: مولّد عشوائي بسيط (LCG) بيبدأ من [[seed = 42]]، فكل تشغيل بيطلّع نفس الملف. [[Math.random]] كانت هتطلّع داتا مختلفة كل مرة والاختبار مش هيعرف يقارن.
- **البايظين متوزعين** بـ [[splice]] وسط السليمين، عشان الأداة تتختبر إنها بتكمّل بعد صف بايظ، مش بس في الآخر.

### ٣. التنضيف: صف واحد

~~~js lib/clean.js
// clean.js: صف خام جاي من أي مصدر -> صف نضيف، أو سبب الرفض

// أسامي إنجليزي معروفة. القرار ده اتاخد مع صاحب التقرير، ومكتوب هنا مش متخبّي في if
export const CITY_ALIASES = new Map([
  ['cairo', 'القاهرة'],
  ['giza', 'الجيزة'],
  ['alexandria', 'الإسكندرية'],
]);

const PAID = new Set(['paid', 'مدفوع', 'completed']);
const NOT_PAID = new Set(['pending', 'cancelled', 'ملغي', 'refunded']);
const ARABIC_DIGITS = /[٠-٩]/g;

// مفتاح المقارنة: نفس المدينة بأي شكل كتابة بتدّي نفس المفتاح
export function cityKey(name) {
  return name
    .normalize('NFC')
    .replace(/ـ/g, '')                      // التطويل: القاهـــرة
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة(?=\s|$)/g, 'ه')               // القاهرة = القاهره
    .replace(/ى(?=\s|$)/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function toAmount(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  if (typeof v !== 'string') return NaN;
  const s = v.replace(ARABIC_DIGITS, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/,/g, '').trim();
  return /^\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
}

// بترجّع { ok: true, row } أو { ok: false, why }
export function cleanRow(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return { ok: false, why: 'الصف مش object' };
  const id = String(raw.id ?? '').trim();
  if (!id) return { ok: false, why: 'مفيش id' };

  const rawCity = typeof raw.city === 'string' ? raw.city.replace(/\s+/g, ' ').trim() : '';
  if (!rawCity) return { ok: false, why: 'مدينة فاضية أو ناقصة' };
  const city = CITY_ALIASES.get(rawCity.toLowerCase()) ?? rawCity;

  const amount = toAmount(raw.total ?? raw.amount);
  if (Number.isNaN(amount)) return { ok: false, why: $__btالمبلغ مش رقم: $__{JSON.stringify(raw.total ?? raw.amount ?? null)}$__bt };
  if (amount < 0) return { ok: false, why: 'مبلغ سالب' };

  const status = String(raw.status ?? '').trim().toLowerCase();
  if (!PAID.has(status) && !NOT_PAID.has(status)) return { ok: false, why: $__btstatus مش معروف: $__{JSON.stringify(raw.status ?? null)}$__bt };

  return { ok: true, row: { id, city, key: cityKey(city), amount, paid: PAID.has(status) } };
}
~~~

- **[[cityKey]]** للمقارنة بس: بيشيل التطويل، ويوحّد [[أ]] و [[إ]] و [[آ]] لـ [[ا]]، و [[ة]] لـ [[ه]] و [[ى]] لـ [[ي]] **في آخر الكلمة بس** ([[(?=\s|$)]] معناها «بعدها مسافة أو آخر النص»)، ويلم المسافات. الاسم اللي بيتعرض مش بيتغيّر.
- **[[toAmount]]:** رقم سليم يعدّي، والنص بيتحوّل أرقامه العربي لإنجليزي ويتشال منه الفاصلة، وبعدين لازم يطابق [[/^\d+(\.\d+)?$/]]. فـ [['']] و [[12abc]] و [[خمسمية]] بيبقوا [[NaN]].
- **[[cleanRow]]** بيرجّع [[{ ok, row }]] أو [[{ ok: false, why }]] بدل ما يرمي: الصف البايظ داتا عادية، مش استثناء يوقّف البرنامج. وأول سطر بيرفض [[null]] والمصفوفات قبل ما يقرا أي خاصية.
- **[[raw.total ?? raw.amount]]:** المصدر التاني بيسمّي الحقل [[amount]].

### ٤. التقرير

~~~js lib/report.js
// report.js: صفوف خام -> تقرير لكل مدينة + الصفوف المرفوضة بأسبابها
import { cleanRow } from './clean.js';

const round2 = (n) => Math.round(n * 100) / 100;

export function buildReport(rawRows) {
  const groups = new Map();      // مفتاح المدينة -> { forms, count, total, max }
  const rejected = [];
  let unpaid = 0;

  rawRows.forEach((raw, index) => {
    const res = cleanRow(raw);
    if (!res.ok) { rejected.push({ index, id: raw?.id ?? null, why: res.why }); return; }
    const { row } = res;
    if (!row.paid) { unpaid++; return; }

    let g = groups.get(row.key);
    if (!g) groups.set(row.key, (g = { forms: new Map(), count: 0, total: 0, max: null }));
    g.forms.set(row.city, (g.forms.get(row.city) ?? 0) + 1);
    g.count++;
    g.total += row.amount;
    if (!g.max || row.amount > g.max.amount) g.max = { id: row.id, amount: row.amount };
  });

  const cities = [...groups.values()].map((g) => ({
    city: [...g.forms].sort((a, b) => b[1] - a[1])[0][0],   // أكتر شكل اتكتب بيه الاسم
    count: g.count,
    total: round2(g.total),
    avg: round2(g.total / g.count),
    max: g.max,
  })).sort((a, b) => b.total - a.total || a.city.localeCompare(b.city, 'ar'));

  return { cities, rejected, unpaid, input: rawRows.length };
}

export function formatReport({ cities, rejected, unpaid, input }) {
  const lines = [];
  lines.push($__bt$__{input} صف: $__{input - rejected.length - unpaid} مدفوع اتحسب، $__{unpaid} مش مدفوع، $__{rejected.length} مرفوض$__bt);
  lines.push('');
  if (cities.length === 0) lines.push('مفيش مبيعات مدفوعة.');
  for (const c of cities) {
    lines.push($__bt$__{c.city.padEnd(12)} عدد $__{String(c.count).padStart(3)} | مجموع $__{String(c.total).padStart(9)} | متوسط $__{String(c.avg).padStart(8)} | أعلى $__{c.max.id} ($__{c.max.amount})$__bt);
  }
  if (rejected.length) {
    lines.push('', 'الصفوف المرفوضة:');
    for (const r of rejected) lines.push($__bt  صف $__{r.index} (id $__{r.id ?? '-'}): $__{r.why}$__bt);
  }
  return lines.join('\n');
}
~~~

- **[[groups]] Map:** المفتاح [[cityKey]]، والقيمة فيها [[forms]] (كل شكل اتكتب بيه الاسم وعدده)، فالاسم المعروض هو **أكتر شكل اتكتب**: [[الإسكندرية]] كسبت [[الاسكندرية]].
- [[round2]]: المتوسط بخانتين عشريتين بس، عشان [[1701.0833333]] متتطبعش كده.
- **الترتيب:** بالمجموع تنازلي، والتعادل بالاسم بـ [[localeCompare(..., 'ar')]]، فالناتج ثابت.
- [[formatReport]] منفصلة عن [[buildReport]]: الحساب بيتختبر من غير ما يعدّي على نصوص، والطباعة بتتغيّر (HTML أو CSV) من غير ما الحساب يتلمس.

### ٥. الأداة

~~~js report.mjs
#!/usr/bin/env node
// node report.mjs orders.json
import { readFile } from 'node:fs/promises';
import { buildReport, formatReport } from './lib/report.js';

function fail(message) {
  console.error('✖ ' + message);
  process.exit(1);
}

const file = process.argv[2];
if (!file) fail('الاستخدام: node report.mjs <ملف.json>');

let text;
try {
  text = await readFile(file, 'utf8');
} catch (e) {
  fail(e.code === 'ENOENT' ? $__btالملف مش موجود: $__{file}$__bt : $__btمقدرتش أقرا $__{file}: $__{e.code ?? e.message}$__bt);
}

let rows;
try {
  rows = JSON.parse(text.replace(/^\uFEFF/, ''));      // ملفات Excel/Notepad ساعات بتبدأ بـ BOM
} catch (e) {
  fail($__btالملف مش JSON سليم: $__{e.message}$__bt);
}
if (!Array.isArray(rows)) fail('الملف لازم يبقى مصفوفة طلبات [ ... ]');

console.log(formatReport(buildReport(rows)));
~~~

- **[[fail]]** بتطبع على [[stderr]] بـ [[console.error]] وتخرج بـ 1، فأي سكربت تاني أو CI يعرف إنها فشلت.
- [[e.code === 'ENOENT']]: الكود اللي Node بيحطه لـ «الملف مش موجود»، فالرسالة بقت مفهومة بدل stack trace.
- [[text.replace(/^\uFEFF/, '')]]: ملفات بتتحفظ من Excel أو Notepad ساعات بتبدأ بحرف BOM مخفي، و [[JSON.parse]] بيرمي عليه.

### ٦. الاختبارات

~~~js check.mjs
// node --test check.mjs   (أو node check.mjs)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildReport } from './lib/report.js';
import { cityKey, toAmount } from './lib/clean.js';

const paid = (id, city, total) => ({ id, city, total, status: 'paid' });
const dir = mkdtempSync(join(tmpdir(), 'report-check-'));
const run = (...args) => spawnSync(process.execPath, ['report.mjs', ...args], { encoding: 'utf8' });
const fileWith = (name, content) => { const p = join(dir, name); writeFileSync(p, content); return p; };

test('ملف فاضي []: مفيش مدن ومفيش crash', () => {
  const r = buildReport([]);
  assert.deepEqual(r.cities, []);
  assert.equal(r.rejected.length, 0);
});

test('كله مرفوض: كل صف ليه سبب', () => {
  const r = buildReport([null, { id: 'x' }, { id: 'y', city: 'القاهرة', total: 'كتير', status: 'paid' }]);
  assert.deepEqual(r.cities, []);
  assert.deepEqual(r.rejected.map((x) => x.why), ['الصف مش object', 'مدينة فاضية أو ناقصة', 'المبلغ مش رقم: "كتير"']);
});

test('مدينة واحدة بأشكال كتابة مختلفة = سطر واحد', () => {
  const r = buildReport([paid('1', 'القاهرة', 100), paid('2', ' القاهره ', '200'), paid('3', 'cairo', 300), paid('4', 'القاهـــرة', '٤٠٠')]);
  assert.equal(r.cities.length, 1);
  assert.deepEqual(r.cities[0], { city: 'القاهرة', count: 4, total: 1000, avg: 250, max: { id: '4', amount: 400 } });
});

test('constructor كاسم مدينة بيتعد عادي', () => {
  const r = buildReport([paid('1', 'constructor', 10), paid('2', 'constructor', 5), paid('3', '__proto__', 7)]);
  assert.deepEqual(r.cities.map((c) => [c.city, c.total]), [['constructor', 15], ['__proto__', 7]]);
});

test('المبالغ: أرقام عربي وفواصل، والفاضي مش صفر', () => {
  assert.equal(toAmount('١٢٥٠'), 1250);
  assert.equal(toAmount('1,250'), 1250);
  assert.ok(Number.isNaN(toAmount('')));
  assert.ok(Number.isNaN(toAmount('12abc')));
  assert.equal(cityKey('الإسكندرية'), cityKey('الاسكندريه'));
});

test('ملف مش موجود: رسالة واضحة وكود خروج 1', () => {
  const r = run(join(dir, 'nope.json'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /الملف مش موجود/);
});

test('JSON بايظ: رسالة واضحة وكود خروج 1', () => {
  const r = run(fileWith('bad.json', '[{"id": 1,'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /الملف مش JSON سليم/);
});

test('ملف بيبدأ بـ BOM بيتقري عادي', () => {
  const r = run(fileWith('bom.json', String.fromCharCode(0xfeff) + JSON.stringify([paid('1', 'أسوان', 50)])));
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /أسوان/);
});

test('التشغيل مرتين على orders.json بيطلّع نفس الناتج بالحرف', () => {
  const a = run('orders.json'), b = run('orders.json');
  assert.equal(a.status, 0);
  assert.equal(a.stdout, b.stdout);
  assert.match(a.stdout, /50 صف: 32 مدفوع اتحسب، 8 مش مدفوع، 10 مرفوض/);
});
~~~

~~~bash
node --test check.mjs
~~~

~~~text الناتج
✔ ملف فاضي []: مفيش مدن ومفيش crash (1.259ms)
✔ كله مرفوض: كل صف ليه سبب (0.4658ms)
✔ مدينة واحدة بأشكال كتابة مختلفة = سطر واحد (0.435ms)
✔ constructor كاسم مدينة بيتعد عادي (0.2492ms)
✔ المبالغ: أرقام عربي وفواصل، والفاضي مش صفر (0.1853ms)
✔ ملف مش موجود: رسالة واضحة وكود خروج 1 (51.2985ms)
✔ JSON بايظ: رسالة واضحة وكود خروج 1 (47.727ms)
✔ ملف بيبدأ بـ BOM بيتقري عادي (49.2428ms)
✔ التشغيل مرتين على orders.json بيطلّع نفس الناتج بالحرف (105.4088ms)
ℹ tests 9
ℹ pass 9
ℹ fail 0
~~~

- [[spawnSync(process.execPath, ['report.mjs', ...])]]: بيشغّل الأداة نفسها كبروسيس، فبنختبر كود الخروج ورسالة [[stderr]] زي ما اليوزر هيشوفهم بالظبط. [[process.execPath]] هو مسار [[node]] اللي شغال دلوقتي.
- [[mkdtempSync]]: فولدر مؤقت جديد للملفات البايظة، فالاختبار مبيوسّخش فولدر المشروع.
- **آخر اختبار:** نفس الملف مرتين ونفس الـ [[stdout]] بالحرف، وده بيثبت إن مفيش حاجة عشوائية في الترتيب ولا في الناتج.

## الغلطة اللي الاختبار ده موجود عشانها

جرّبت نسخة من [[report.js]] بـ object عادي ([[const groups = {}]]) بدل [[Map]]، وشغّلت نفس الاختبارات:

~~~text
✖ constructor كاسم مدينة بيتعد عادي (0.2827ms)
ℹ pass 8
ℹ fail 1
  TypeError [Error]: Cannot read properties of undefined (reading 'set')
~~~

[[groups['constructor']]] في object عادي مش [[undefined]]، دي الدالة [[Object]] الموروثة. فالكود افتكر إن المجموعة موجودة، وحاول يكتب في [[g.forms]] اللي مش موجودة، و **الأداة كلها وقعت** بسبب صف واحد فيه اسم مدينة غريب. مع [[Map]] مفيش مفاتيح موروثة، فالمدينة دي اتعدّت زي أي مدينة.

## بعد ما يخلص

- **CSV:** قارئ تاني بيطلّع نفس شكل الصفوف، و [[buildReport]] زي ما هي.
- **HTML أو CSV للتقرير:** [[formatReport]] تانية.
- **فلتر بالتاريخ:** [[--from 2026-11-01]] من [[process.argv]]، وحقل [[date]] في [[cleanRow]].
- **الأداء:** لفة واحدة على الصفوف و [[Map]]، فالوقت O(n) والترتيب على المدن بس. ومليون صف هيبقى محدود بقراية الملف نفسه.` },
        { lvl: 'فكرة', t: R`مشكلة من شغلك بالطريقة كاملة`, what: R`خد مشكلة حقيقية عندك أو عند حد تعرفه (حساب مرتبات، أو جدول مذاكرة، أو مخزون محل) وامشي بيها الطريق كله: أسئلة وتوقيع، ونسخ على خطوات، وتصغير لما تعلق، وتركيبة مقاسة. انت اللي بتختار المشكلة.`, done: R`فيه ملف فيه الأسئلة والإجابات اللي اتجمعت من صاحب المشكلة، والـ commits بتوري النسخ، واختبارات للحالات الحدّية، وصاحب المشكلة جرّبها على داتا حقيقية.`, ext: R`حوّلها لصفحة أو أداة يستخدمها هو بنفسه، واكتب README بيشرح القواعد اللي اتفقتوا عليها.`, sol: R`## نسخة نموذجية: مخزون بقالة صغيرة

ده **مثال واحد** للطريقة كاملة على مشكلة متألّفة («بقالة الأمانة»): أسئلة لصاحب المحل، وقواعد طلعت منها، واختبارات قبل الكود، و ٤ نسخ كل واحدة commit، وتشغيل على يوم كامل. مشكلتك انت هتبقى غيرها، بس الملفات والترتيب هم هم.

~~~text الناتج: تقفيل يوم (node day.mjs stock.json moves.json)
رصيد آخر اليوم:
  R-01  رز 1 كيلو    18
  S-02  سكر 1 كيلو   8
  T-03  شاي 250 جم   14
  O-04  زيت 1 لتر    8

اطلب من التاجر:
  سكر 1 كيلو: فاضل 8 والحد 10

حركات متنفّذتش (راجعها):
  حركة رقم 4: بيع 9 من «زيت 1 لتر» والرصيد 8 بس
  حركة رقم 6: كود مش معروف: S-2
  حركة رقم 7: كمية مش رقم صحيح موجب: 1.5
~~~

٣ أغلاط تسجيل حقيقية الشكل (بيع أكتر من الرف، وكود ناقص شرطة، ونص كيس) اتمسكوا ومااتنفّذوش، والرصيد فضل صح.

## ليه التصميم ده

| القرار | ليه |
|---|---|
| الأسئلة في ملف قبل أي كود | كل قاعدة في الكود ليها سطر في [[QUESTIONS.md]] بيقول مين قررها، وصاحب المحل يقدر يقراها ويصحّحها |
| الصنف بكوده ([[R-01]]) | صاحب المحل قال الاسم بيتكتب بأشكال، والكود ثابت على الرف |
| الحركة الغلط بتتسجّل ومبتوقّفش اليوم | حركة واحدة غلط متمنعش تقفيل ٢٠٠ حركة سليمة |
| [[closeDay]] دالة نقية بترجّع نسخة | بتتختبر من غير ملفات، والرصيد الأصلي مبيتغيّرش لو حصل غلط في النص |
| [[Object.hasOwn]] للكود | كود زي [[constructor]] مبيتلخبطش مع خصائص [[Object]] الموروثة ([['constructor' in {}]] بـ [[true]]، و [[Object.hasOwn({}, 'constructor')]] بـ [[false]]: جرّبتهم) |

~~~text الملفات
grocery-stock/
  QUESTIONS.md         الأسئلة والإجابات والقواعد
  inventory.js         closeDay
  inventory.test.js    7 اختبارات، واحد لكل قاعدة
  day.mjs              تقفيل اليوم من الترمنال
  stock.json           رصيد الصبح
  moves.json           حركات اليوم
~~~

## ١. الأسئلة

~~~text QUESTIONS.md
# مخزون «بقالة الأمانة»: الأسئلة والإجابات (اتجمعت من صاحب المحل قبل أي كود)

س: بتسجّل إيه كل يوم؟
ج: الصبح بعرف عندي كام من كل صنف. وطول اليوم: بيع، وبضاعة جديدة بتيجي من التاجر.

س: الصنف بيتعرّف إزاي؟ بالاسم؟
ج: بكود مكتوب على الرف (R-01, S-02...). الاسم بيتكتب بأشكال مختلفة.

س: لو اتسجّل بيع أكتر من اللي في الرف؟
ج: يبقى غلط في التسجيل. متنقصش الرصيد تحت الصفر، ونبهني.

س: تحب تعرف إمتى الصنف قرّب يخلص؟
ج: أيوه، كل صنف ليه حد. السكر مثلًا تحت 10 أكياس أطلب.

س: صنف جه في البيع ومش في الرصيد خالص؟
ج: يبقى كود غلط. متضيفهوش، ونبهني.

س: الكسور؟ (نص كيلو)
ج: الأصناف كلها بالقطعة أو الكيس. لو جه كسر يبقى غلط.

القواعد اللي طلعت:
1. الصنف بكوده، مش باسمه.
2. البيع اللي يخلّي الرصيد سالب: ميتنفّذش، ويتسجّل غلط.
3. كود مش معروف: ميتنفّذش، ويتسجّل غلط.
4. الكمية لازم رقم صحيح موجب.
5. في آخر اليوم: لستة الأصناف اللي تحت الحد بتاعها.
~~~

## ٢. الاختبارات قبل الكود

~~~js inventory.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { closeDay } from './inventory.js';

const stock = () => ({
  'R-01': { name: 'رز 1 كيلو', qty: 20, min: 5 },
  'S-02': { name: 'سكر 1 كيلو', qty: 12, min: 10 },
  'T-03': { name: 'شاي 250 جم', qty: 3, min: 4 },
});

test('بيع وتوريد بيغيّروا الرصيد', () => {
  const r = closeDay(stock(), [{ type: 'sale', code: 'R-01', qty: 4 }, { type: 'restock', code: 'R-01', qty: 10 }]);
  assert.equal(r.stock['R-01'].qty, 26);
  assert.deepEqual(r.errors, []);
});

test('ق٢: بيع أكتر من الرصيد ميتنفّذش ويتسجّل', () => {
  const r = closeDay(stock(), [{ type: 'sale', code: 'T-03', qty: 5 }]);
  assert.equal(r.stock['T-03'].qty, 3);
  assert.deepEqual(r.errors, [{ index: 0, why: 'بيع 5 من «شاي 250 جم» والرصيد 3 بس' }]);
});

test('ق٣: كود مش معروف ميتضافش', () => {
  const r = closeDay(stock(), [{ type: 'restock', code: 'X-99', qty: 5 }]);
  assert.equal('X-99' in r.stock, false);
  assert.equal(r.errors[0].why, 'كود مش معروف: X-99');
});

test('ق٤: الكمية لازم رقم صحيح موجب', () => {
  const r = closeDay(stock(), [
    { type: 'sale', code: 'R-01', qty: 0.5 }, { type: 'sale', code: 'R-01', qty: -2 }, { type: 'sale', code: 'R-01', qty: '3' },
  ]);
  assert.equal(r.stock['R-01'].qty, 20);
  assert.equal(r.errors.length, 3);
});

test('ق٥: الأصناف اللي تحت الحد في آخر اليوم', () => {
  const r = closeDay(stock(), [{ type: 'sale', code: 'S-02', qty: 3 }]);
  assert.deepEqual(r.low, [{ code: 'T-03', name: 'شاي 250 جم', qty: 3, min: 4 }, { code: 'S-02', name: 'سكر 1 كيلو', qty: 9, min: 10 }]);
});

test('الرصيد الأصلي مبيتعدّلش (closeDay بترجّع نسخة)', () => {
  const s = stock();
  closeDay(s, [{ type: 'sale', code: 'R-01', qty: 4 }]);
  assert.equal(s['R-01'].qty, 20);
});

test('نوع حركة غلط بيتسجّل', () => {
  assert.equal(closeDay(stock(), [{ type: 'gift', code: 'R-01', qty: 1 }]).errors[0].why, 'نوع حركة مش معروف: gift');
});
~~~

## ٣. النسخ

~~~bash
git log --reverse --format='%h %s'
~~~

~~~text الناتج
5601e0d الأسئلة والقواعد من صاحب المحل
545c5bf v1: closeDay بترجّع الشكل الصح من غير حساب
a8ba82b الاختبارات من القواعد (حمرا على v1)
82ded9b v2: البيع والتوريد من غير فحص
24bbc16 v3: الفحص: كود ونوع وكمية ورصيد، والغلط بيتسجّل
1a4ee69 v4: الأصناف اللي تحت الحد، الأقرب للخلصان الأول
~~~

| النسخة | الاختبارات | اللي اتعلّمته منها |
|---|---|---|
| v1 (الشكل بس) | 1 من 7 | الاختبارات نفسها شغالة وبتفشل للسبب الصح |
| v2 (حساب من غير فحص) | 2 من 7 | كود مش معروف وقّع الدالة كلها: [[TypeError: Cannot read properties of undefined (reading 'qty')]]. ده اللي كان هيحصل لصاحب المحل لو اتسلّم v2 |
| v3 (الفحص) | 6 من 7 | فاضل ق٥ بس، يعني الفحص كامل |
| v4 (الحد) | 7 من 7 | خلصت |

## ٤. الكود النهائي

~~~js inventory.js
// closeDay(stock, moves): حركات اليوم على رصيد الصبح -> رصيد آخر اليوم، والأغلاط، والأصناف اللي قرّبت تخلص
const TYPES = new Set(['sale', 'restock']);

function check(m, out) {
  if (!TYPES.has(m?.type)) return $__btنوع حركة مش معروف: $__{m?.type}$__bt;
  if (!Object.hasOwn(out, m.code)) return $__btكود مش معروف: $__{m.code}$__bt;                 // ق٣
  if (!Number.isInteger(m.qty) || m.qty <= 0) return $__btكمية مش رقم صحيح موجب: $__{JSON.stringify(m.qty)}$__bt;   // ق٤
  const item = out[m.code];
  if (m.type === 'sale' && m.qty > item.qty) return $__btبيع $__{m.qty} من «$__{item.name}» والرصيد $__{item.qty} بس$__bt;   // ق٢
  return null;
}

export function closeDay(stock, moves) {
  const out = structuredClone(stock);              // منلمسش الرصيد اللي جاي
  const errors = [];
  moves.forEach((m, index) => {
    const why = check(m, out);
    if (why) { errors.push({ index, why }); return; }
    out[m.code].qty += m.type === 'sale' ? -m.qty : m.qty;
  });

  const low = Object.entries(out)                  // ق٥
    .filter(([, item]) => item.qty < item.min)
    .map(([code, { name, qty, min }]) => ({ code, name, qty, min }))
    .sort((a, b) => a.qty / a.min - b.qty / b.min);   // الأقرب للخلصان الأول

  return { stock: out, low, errors };
}
~~~

- **[[check(m, out)]]** بترجّع سبب الغلط أو [[null]]، وكل سطر فيها عليه رقم القاعدة اللي في [[QUESTIONS.md]].
- [[m?.type]]: حركة [[null]] في الملف متوقّعش الفحص نفسه.
- [[structuredClone(stock)]]: نسخة عميقة، فـ [[out[code].qty]] بيتغيّر في النسخة بس (الاختبار السادس بيثبت ده).
- **ترتيب [[low]]** بـ [[qty / min]]: الشاي (3 من 4) قبل السكر (9 من 10)، لأنه أقرب للخلصان نسبيًا. ده قرار مني، ومكتوب في رسالة الـ commit عشان صاحب المحل يقول لو عايز غيره.

~~~js day.mjs
// node day.mjs stock.json moves.json : تقفيل اليوم
import { readFileSync, writeFileSync } from 'node:fs';
import { closeDay } from './inventory.js';

const [stockFile = 'stock.json', movesFile = 'moves.json'] = process.argv.slice(2);
const { stock, low, errors } = closeDay(JSON.parse(readFileSync(stockFile, 'utf8')), JSON.parse(readFileSync(movesFile, 'utf8')));

console.log('رصيد آخر اليوم:');
for (const [code, { name, qty }] of Object.entries(stock)) console.log($__bt  $__{code}  $__{name.padEnd(12)} $__{qty}$__bt);
console.log(low.length ? '\nاطلب من التاجر:' : '\nمفيش صنف تحت الحد.');
for (const l of low) console.log($__bt  $__{l.name}: فاضل $__{l.qty} والحد $__{l.min}$__bt);
if (errors.length) console.log('\nحركات متنفّذتش (راجعها):');
for (const e of errors) console.log($__bt  حركة رقم $__{e.index + 1}: $__{e.why}$__bt);

writeFileSync('stock-end.json', JSON.stringify(stock, null, 2) + '\n');   // رصيد بكرة الصبح
~~~

~~~json stock.json
{
  "R-01": { "name": "رز 1 كيلو", "qty": 20, "min": 5 },
  "S-02": { "name": "سكر 1 كيلو", "qty": 12, "min": 10 },
  "T-03": { "name": "شاي 250 جم", "qty": 3, "min": 4 },
  "O-04": { "name": "زيت 1 لتر", "qty": 8, "min": 3 }
}
~~~

~~~json moves.json
[
  { "type": "sale", "code": "R-01", "qty": 2 },
  { "type": "sale", "code": "S-02", "qty": 4 },
  { "type": "restock", "code": "T-03", "qty": 12 },
  { "type": "sale", "code": "O-04", "qty": 9 },
  { "type": "sale", "code": "T-03", "qty": 1 },
  { "type": "sale", "code": "S-2", "qty": 1 },
  { "type": "sale", "code": "R-01", "qty": 1.5 }
]
~~~

~~~text الناتج (npm test)
✔ بيع وتوريد بيغيّروا الرصيد (2.3123ms)
✔ ق٢: بيع أكتر من الرصيد ميتنفّذش ويتسجّل (0.3371ms)
✔ ق٣: كود مش معروف ميتضافش (0.2394ms)
✔ ق٤: الكمية لازم رقم صحيح موجب (0.1522ms)
✔ ق٥: الأصناف اللي تحت الحد في آخر اليوم (0.1876ms)
✔ الرصيد الأصلي مبيتعدّلش (closeDay بترجّع نسخة) (0.1442ms)
✔ نوع حركة غلط بيتسجّل (0.1953ms)
ℹ tests 7
ℹ pass 7
ℹ fail 0
~~~

## خليه بتاعك

[[day.mjs]] بيكتب [[stock-end.json]] اللي يبقى رصيد بكرة الصبح. الخطوة الجاية الحقيقية: صاحب المشكلة يجرّبها على يوم حقيقي من دفتره، وكل حاجة تطلع غلط عنده تبقى سؤال جديد في [[QUESTIONS.md]] واختبار جديد قبل ما تتصلّح. ولما يرتاح لها: صفحة بسيطة فيها فورم «بيع» و «توريد» بدل ما يكتب JSON.` },
      ],
      n: R`دي مش دروس عن JavaScript — دي عن **الطريقة**. الكود كله هنا بـ JavaScript عشان يبقى ملموس، بس اللي هتتعلمه بيشتغل مع أي لغة. والفرق بين اللي بيعرف اللغة واللي بيعرف يبني هو ده بالظبط`,
      items: [
        {
          cmd: "من جملة لتوقيع دالة",
          title: "حوّل الطلب المبهم لحاجة محددة قبل أي سطر",
          learn: R`تطلّع من أي طلب: المدخلات، والمخرجات، والقواعد، والحالات الحدّية.`,
          out: R`توقيع دالة وأمثلة، قبل ما تكتب كود.`,
          use: {
            prog: R`التوقيع عقد. ولما تكتبه الأول، التنفيذ بيبقى تفصيلة — والعكس بيخليك تكتشف إنك بنيت الحاجة الغلط بعد ساعتين.`,
            work: R`الطلب بييجي مبهم دايمًا. و«إيه بالظبط اللي داخل وإيه اللي طالع؟» هو السؤال اللي بيكشف إن الطلب نفسه مش واضح — **لصاحبه كمان**.`,
            cs: R`المواصفة قبل التنفيذ. و[[types]] و[[docstrings]] و[[tests]] كلهم أشكال من نفس الفكرة: قول المطلوب قبل الطريقة.`,
          },
          desc: R`الطلب بييجي كده: **«عايز أعرف كل مدينة بعنا فيها بكام»**.

ولو فتحت المحرر دلوقتي، هتكتب حاجة وبعد ساعة تكتشف إنك فهمت غلط.

**أربع أسئلة قبل أي سطر:**

**١. إيه اللي داخل؟** مش «الطلبات» — **شكل** الطلبات. مصفوفة؟ من إيه؟ فيها أنهي حقول؟ الأسعار أرقام ولا نصوص؟

**٢. إيه اللي طالع؟** object؟ مصفوفة؟ مرتّبة إزاي؟ الأرقام مقرّبة؟

**٣. إيه القواعد؟** الطلبات الملغية بتتحسب؟ والمدينة الفاضية؟ والمبلغ السالب؟

**٤. إيه الحالات الحدّية؟** قايمة فاضية؟ مدينة واحدة؟ مبلغ بصفر؟

والإجابات بتطلّع **توقيع**:

~~~text
salesByCity(orders: Order[], opts?: { onlyPaid?: boolean }): Record<string, number>
~~~

ومعاه **مثالين**: واحد عادي وواحد حدّي. والاتنين دول هم أول اختبارين هتكتبهم.

**والسؤال الرابع هو اللي بيكشف المبهم.** لما تسأل «الطلب الملغي بيتحسب؟» هتلاقي اللي طلب منك **مفكّرش** فيها. وده مش تعطيل — ده أهم حاجة بتعملها في أول نص ساعة.`,
          example: R`// الطلب: «عايز أعرف كل مدينة بعنا فيها بكام»

// ١) شكل المدخل — اكتبه بمثال حقيقي
const orders = [
  { id: 'A1', city: 'القاهرة',     total: 1500, status: 'paid' },
  { id: 'A2', city: 'الجيزة',      total: 300,  status: 'pending' },
  { id: 'A3', city: 'القاهرة',     total: 900,  status: 'paid' },
  { id: 'A4', city: 'الإسكندرية', total: 2400, status: 'paid' },
];

// ٢) شكل المخرج — اكتبه بإيدك قبل الكود
// { 'القاهرة': 2400, 'الإسكندرية': 2400 }   مرتّب من الأكبر

// ٣) القواعد
//    - المدفوع بس (status === 'paid')
//    - مرتّب تنازليًا
//    - المدينة الفاضية تتجاهل

// ٤) الحالات الحدّية
//    - [] -> {}
//    - كله pending -> {}

// والتوقيع
function salesByCity(orders, { onlyPaid = true } = {}) { /* ... */ }`,
          lines: [
            R`مثال حقيقي بقيم حقيقية. **مش وصف** — داتا تقدر تشغّلها. و«قايمة طلبات» مش إجابة، دي إجابة.`,
            R`صف عادي — ومنه عرفت إن [[total]] رقم مش نص.`,
            R`صف فيه [[pending]] عشان تختبر الفلترة.`,
            R`صف تاني لنفس المدينة عشان تختبر التجميع.`,
            R`مدينة تالتة بمبلغ كبير عشان تختبر الترتيب.`,
            R`قفلة. والمخرج والقواعد والحالات الحدّية كلهم مكتوبين كتعليقات تحتها — **قبل** أي كود.`,
            R`والتوقيع. [[{ onlyPaid = true } = {}]] بتخلي الخيار اختياري بقيمة افتراضية.`,
          ],
          try: R`خد أي طلب في مشروعك دلوقتي واكتب الأربع إجابات قبل ما تفتح المحرر. ولو عجزت تكتب شكل المخرج بإيدك، **اسأل** — الطلب لسه مبهم.`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها قبل ما تكتب:** الطلب «عايز أعرف أكتر ٣ منتجات اتباعت». من غير ولا سطر كود، اكتب في تعليق الأربع إجابات والتوقيع ومثالين (عادي وحدّي).`, done: R`التوقيع فيه نوع المدخل وشكل المخرج (مصفوفة مرتبة ولا object؟)، وفيه مثال للقايمة الفاضية بيرجع إيه، وكاتب سؤال واحد على الأقل للي طلب ميقدرش الكود يجاوبه (الكمية ولا المبلغ؟ والتعادل؟ والملغي؟).`, sol: R`**إجابة نموذجية:** التمرين من غير كود، فالحل هو التعليق ده. وتحته نسخة سريعة اتشغّلت عشان أتأكد إن الأمثلة اللي كتبتها بإيدي متسقة مع بعض (الجزء ده مش مطلوب منك).

~~~js top-products.mjs
// الطلب: «عايز أعرف أكتر ٣ منتجات اتباعت»
//
// ١) المدخل (بمثال): بنود الطلبات، كل بند منتج وكمية وسعر وحالة الطلب
//    [{ orderId: 'A1', product: 'قلم', qty: 3, price: 15, status: 'paid' }, ...]
// ٢) المخرج (مكتوب بإيدي): مصفوفة مرتّبة مش object، لأن «أكتر ٣» ترتيب
//    [{ product: 'كشكول', qty: 7 }, { product: 'قلم', qty: 5 }, { product: 'مسطرة', qty: 2 }]
// ٣) القواعد (افتراضات لحد ما صاحب الطلب يرد):
//    - «اتباعت» = بالكمية، والمدفوع بس
//    - التعادل: الاسم أبجديًا عشان الناتج ميتغيّرش من تشغيلة للتانية
// ٤) الحالات الحدّية:
//    - [] -> []
//    - منتجين بس -> مصفوفة فيها 2 مش 3
//    - كله pending -> []
//
// التوقيع:
//    topProducts(lines: Line[], n = 3): Array<{ product: string, qty: number }>
//
// أسئلة لصاحب الطلب (الكود ميقدرش يجاوبها):
//    1. بالكمية ولا بالمبلغ؟ (10 أقلام بـ 150 ولا لابتوب واحد بـ 20000؟)
//    2. الطلبات الملغية والمرتجعة بتتحسب؟
//    3. في فترة معيّنة (الشهر ده؟) ولا من الأول؟
//    4. لو اتنين متعادلين على المركز التالت، نعرض الاتنين؟

// --- نسخة سريعة عشان نتأكد إن الأمثلة نفسها متسقة (مش مطلوبة في التمرين) ---
import assert from 'node:assert/strict';

function topProducts(lines, n = 3) {
  const qty = new Map();
  for (const l of lines) if (l.status === 'paid') qty.set(l.product, (qty.get(l.product) ?? 0) + l.qty);
  return [...qty].map(([product, q]) => ({ product, qty: q }))
    .sort((a, b) => b.qty - a.qty || a.product.localeCompare(b.product, 'ar'))
    .slice(0, n);
}

const lines = [
  { orderId: 'A1', product: 'قلم', qty: 3, price: 15, status: 'paid' },
  { orderId: 'A1', product: 'كشكول', qty: 4, price: 40, status: 'paid' },
  { orderId: 'A2', product: 'كشكول', qty: 3, price: 40, status: 'paid' },
  { orderId: 'A3', product: 'قلم', qty: 2, price: 15, status: 'paid' },
  { orderId: 'A3', product: 'مسطرة', qty: 2, price: 10, status: 'paid' },
  { orderId: 'A4', product: 'شنطة', qty: 9, price: 300, status: 'pending' },
];
assert.deepEqual(topProducts(lines), [{ product: 'كشكول', qty: 7 }, { product: 'قلم', qty: 5 }, { product: 'مسطرة', qty: 2 }]);
assert.deepEqual(topProducts([]), []);
assert.deepEqual(topProducts(lines.slice(0, 2)), [{ product: 'كشكول', qty: 4 }, { product: 'قلم', qty: 3 }]);
assert.deepEqual(topProducts([lines[5]]), []);
console.log('الأمثلة الأربعة متسقة ✔');
~~~

~~~text الناتج (node top-products.mjs)
الأمثلة الأربعة متسقة ✔
~~~

**ليه الإجابة دي:**

- **المخرج مصفوفة مش object:** «أكتر ٣» معناها ترتيب، والمصفوفة هي اللي بتحفظ الترتيب بوضوح وبتسمح بـ [[slice(0, n)]]. object زي [[{ 'قلم': 5 }]] كان هيخلي كل اللي بيستخدمه يرتّب تاني.
- **كل عنصر [[{ product, qty }]]:** أسامي واضحة بدل زوج مصفوفة (العنصر 0 الاسم و 1 الكمية)، فاللي بيعرضها في جدول ميحتاجش يفتكر مين رقم 0 ومين رقم 1.
- **الافتراضات مكتوبة:** «بالكمية» و «المدفوع بس» و «التعادل أبجدي» قرارات خدتها عشان أكمّل، ومكتوبة عشان صاحب الطلب يصحّحها لو غلط.
- **مثال المنتجين:** بيرجّع 2 مش 3، ومش بيكمّل بـ [[null]]. ده سؤال حدّي ناس كتير بتنساه.

**أهم سطر في الإجابة:** سؤال «بالكمية ولا بالمبلغ؟». لو اتضاف للمثال بند مدفوع فيه لابتوب واحد بـ 20000: بالكمية مش هيدخل الـ ٣ أصلًا (كميته 1)، وبالمبلغ هيبقى الأول بفرق ضخم. نفس الداتا وترتيبين مختلفين خالص، والكود عمره ما هيعرف يختار لوحده.

**الغلطة الشائعة:** تكتب التوقيع [[topProducts(orders)]] وخلاص. من غير نوع المخرج وشكله، اللي هيستخدم الدالة هيكتشف إنها بترجّع object بعد ما يبني الجدول.` },
            { lvl: 'تطبيق', t: R`**مسألة:** نفّذ [[salesByCity(orders, { onlyPaid = true } = {})]] على داتا الدرس، واكتب الحالات الحدّية اللي في المثال كـ [[assert.deepEqual]] قبل الكود.`, done: R`على داتا الدرس بترجّع القاهرة 2400 والإسكندرية 2400، ومع [[{ onlyPaid: false }]] الجيزة بتظهر بـ 300، والقايمة الفاضية بترجّع [[{}]]، والطلب اللي مدينته فاضية مبيظهرش. والـ asserts كلها عدّت.`, sol: R`**التفكير قبل الكود:** المدخل والمخرج والقواعد مكتوبين في الدرس. فأول حاجة: كل مثال وكل حالة حدّية تتحوّل لسطر [[assert]]، وبعدين الكود.

~~~js sales.mjs
import assert from 'node:assert/strict';

// الاختبارات الأول: من الأمثلة والحالات الحدّية اللي اتكتبت قبل الكود
const orders = [
  { id: 'A1', city: 'القاهرة',     total: 1500, status: 'paid' },
  { id: 'A2', city: 'الجيزة',      total: 300,  status: 'pending' },
  { id: 'A3', city: 'القاهرة',     total: 900,  status: 'paid' },
  { id: 'A4', city: 'الإسكندرية', total: 2400, status: 'paid' },
];

function checks() {
  assert.deepEqual(salesByCity(orders), { 'القاهرة': 2400, 'الإسكندرية': 2400 });
  assert.deepEqual(salesByCity(orders, { onlyPaid: false }), { 'القاهرة': 2400, 'الإسكندرية': 2400, 'الجيزة': 300 });
  assert.deepEqual(salesByCity([]), {});
  assert.deepEqual(salesByCity([{ id: 'B1', city: 'الجيزة', total: 300, status: 'pending' }]), {});
  assert.deepEqual(salesByCity([{ id: 'B2', city: '', total: 500, status: 'paid' }, orders[0]]), { 'القاهرة': 1500 });
  assert.deepEqual(Object.keys(salesByCity(orders, { onlyPaid: false })), ['القاهرة', 'الإسكندرية', 'الجيزة']);
}

// والتنفيذ
function salesByCity(orders, { onlyPaid = true } = {}) {
  const totals = {};
  for (const o of orders) {
    if (onlyPaid && o.status !== 'paid') continue;
    if (!o.city?.trim()) continue;                 // المدينة الفاضية تتجاهل
    totals[o.city] = (totals[o.city] ?? 0) + o.total;
  }
  return Object.fromEntries(Object.entries(totals).sort((a, b) => b[1] - a[1]));
}

checks();
console.log(salesByCity(orders));
console.log(salesByCity(orders, { onlyPaid: false }));
console.log('كل الـ asserts عدّت ✔');
~~~

~~~text الناتج (node sales.mjs)
{ 'القاهرة': 2400, 'الإسكندرية': 2400 }
{ 'القاهرة': 2400, 'الإسكندرية': 2400, 'الجيزة': 300 }
كل الـ asserts عدّت ✔
~~~

**والـ asserts فشلت الأول فعلًا:** قبل التنفيذ، حطيت [[function salesByCity() { return {}; }]] وشغّلت:

~~~text الناتج قبل التنفيذ
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
+ actual - expected

+ {}
- {
-   'الإسكندرية': 2400,
-   'القاهرة': 2400
- }
~~~

ده بيثبت إن الاختبارات بتختبر حاجة فعلًا (اختبار عمره ما فشل ممكن يكون مش شغال أصلًا).

**الكود سطر سطر:**

- [[{ onlyPaid = true } = {}]]: الخيار اختياري بقيمة افتراضية، و [[= {}]] في الآخر عشان [[salesByCity(orders)]] من غير تاني argument متقعش في الـ destructuring.
- [[if (onlyPaid && o.status !== 'paid') continue]]: الفلترة جوه نفس اللوب بدل [[filter]] منفصلة، فمفيش array تانية في الذاكرة.
- [[!o.city?.trim()]]: بيمسك [[undefined]] و [[null]] و [['']] و [[' ']] مرة واحدة. و [[?.]] عشان صف من غير [[city]] خالص ميرميش.
- [[(totals[o.city] ?? 0) + o.total]]: أول مرة المدينة بتظهر قيمتها [[undefined]]، و [[?? 0]] بتبدأ من صفر.
- [[Object.entries]] ثم [[sort]] بالمبلغ تنازلي ثم [[Object.fromEntries]]: object مفاتيحه نصوص بيحفظ ترتيب الإضافة، فالترتيب بيفضل.
- **آخر assert بـ [[Object.keys]]:** [[deepEqual]] على objects مبيهتمش بترتيب المفاتيح، فالترتيب محتاج اختبار لوحده.

**الغلطة الشائعة:** تكتب الـ asserts بعد الكود وتنسخ الناتج اللي طلع فيها. كده الاختبار بيثبت إن الكود بيعمل اللي بيعمله، مش اللي المفروض يعمله.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** الطلبات جاية من API كده: [[{ city: 'القاهرة ', total: '1500', status: 'PAID' }]] و [[{ city: 'cairo', total: 900, status: 'paid' }]] و [[{ city: '', total: 300 }]]. قبل ما تكتب، طلّع كل سؤال الداتا دي بتفرضه، وقرر قاعدة لكل واحد، وبعدين نفّذ.`, done: R`عندك لستة قواعد مكتوبة (المسافات، وحالة الحروف، و [[total]] نص، و [[status]] ناقص، والمدينة بالانجليزي) وكل قاعدة ليها assert، والدالة بتجمع [[القاهرة ]] مع [[القاهرة]]، وكاتب سؤال للي طلب عن [[cairo]] بدل ما تخمّن.`, sol: R`**الخطوة الأولى: الأسئلة اللي الداتا بتفرضها.** بصيت على التلات صفوف واحد واحد وكتبت كل حاجة مش زي مثال الدرس:

| اللي في الداتا | السؤال | القاعدة اللي قررتها |
|---|---|---|
| [['القاهرة ']] بمسافة | نفس [['القاهرة']]؟ | أيوه: [[trim]] قبل أي حاجة (ق١) |
| [['PAID']] | نفس [['paid']]؟ | أيوه: المقارنة lowercase (ق٢) |
| [['1500']] نص | رقم؟ ولو [['خمسمية']] أو فاضي؟ | نص بشكل رقم بس بيتحوّل، وغير كده الصف بيترفض بسبب (ق٣) |
| مفيش [[status]] | مدفوع ولا لأ؟ | مش مدفوع: مش هفترض إن فلوس اتدفعت (ق٤) |
| [['']] مدينة فاضية | تتحسب فين؟ | الصف بيترفض بسبب (ق٥) |
| [['cairo']] | هي [['القاهرة']]؟ | **مش هخمّن**: بتفضل لوحدها وبتتعلّم «محتاج قرار»، وبسأل اللي طلب (ق٦) |

والمخرج اتغيّر بسبب الأسئلة دي: مبقاش object المبالغ بس، بقى [[{ totals, rejected, unknownCities }]]، عشان الصفوف المرفوضة والأسماء المشكوك فيها متختفيش بهدوء.

~~~js dirty-sales.mjs
import assert from 'node:assert/strict';

// القواعد اللي قررتها (ولكل واحدة assert تحت):
// ق١ المسافات: المدينة بتتعمل لها trim قبل أي حاجة              'القاهرة ' = 'القاهرة'
// ق٢ حالة الحروف: status بيتقارن lowercase                         'PAID' = 'paid'
// ق٣ total نص: بيتحوّل بـ Number، ولو مش رقم سليم الصف بيترفض       '1500' -> 1500
// ق٤ status ناقص: الطلب مش محسوب مدفوع (مش هنفترض إنه اتدفع)
// ق٥ المدينة الفاضية: الصف بيترفض
// ق٦ المدينة بالإنجليزي ('cairo'): مش هخمّن إنها القاهرة؛ بتفضل لوحدها وبتطلع في لستة «محتاج قرار»
//    سؤال للي طلب: «cairo» و «القاهرة» نفس المدينة؟ ولو أيوه، نعمل جدول أسماء؟

// ق٣: نص بشكل رقم بس. Number('') بترجّع 0، فالخانة الفاضية كانت هتعدّي كصفر من غير الفحص ده
const toNumber = (v) => (typeof v === 'number' ? v : /^\s*-?\d+(\.\d+)?\s*$/.test(v ?? '') ? Number(v) : NaN);

export function salesByCity(rows) {
  const totals = {};
  const rejected = [];
  const unknownCities = new Set();
  for (const r of rows) {
    const city = String(r.city ?? '').trim();                        // ق١
    const status = String(r.status ?? '').toLowerCase();             // ق٢ و ق٤
    const total = toNumber(r.total);                                 // ق٣
    if (!city) { rejected.push({ row: r, why: 'مدينة فاضية' }); continue; }        // ق٥
    if (!Number.isFinite(total)) { rejected.push({ row: r, why: 'المبلغ مش رقم' }); continue; }
    if (status !== 'paid') continue;                                 // ق٤: ناقص أو pending
    if (/^[a-z\s]+$/i.test(city)) unknownCities.add(city);           // ق٦
    totals[city] = (totals[city] ?? 0) + total;
  }
  const sorted = Object.fromEntries(Object.entries(totals).sort((a, b) => b[1] - a[1]));
  return { totals: sorted, rejected, unknownCities: [...unknownCities] };
}

const api = [
  { city: 'القاهرة ', total: '1500', status: 'PAID' },
  { city: 'cairo', total: 900, status: 'paid' },
  { city: '', total: 300 },
  { city: 'القاهرة', total: 200, status: 'paid' },
  { city: 'الجيزة', total: 'خمسمية', status: 'paid' },
  { city: 'الجيزة', total: 400 },
];

const out = salesByCity(api);
assert.deepEqual(out.totals, { 'القاهرة': 1700, 'cairo': 900 });           // ق١ + ق٢ + ق٣ + ق٦
assert.equal(salesByCity([{ city: 'X', total: 5 }]).totals.X, undefined);   // ق٤
assert.deepEqual(out.rejected.map((x) => x.why), ['مدينة فاضية', 'المبلغ مش رقم']);   // ق٥ و ق٣
assert.deepEqual(out.unknownCities, ['cairo']);                             // ق٦
assert.equal(salesByCity([{ city: 'أسوان', total: '', status: 'paid' }]).rejected[0].why, 'المبلغ مش رقم');   // ق٣: الفاضي مش صفر
assert.deepEqual(salesByCity([]), { totals: {}, rejected: [], unknownCities: [] });
console.log(out.totals);
console.log('مرفوض:', out.rejected.map((x) => $__bt$__{JSON.stringify(x.row)} ($__{x.why})$__bt).join(' | '));
console.log('محتاج قرار:', out.unknownCities);
console.log('كل القواعد عدّت ✔');
~~~

~~~text الناتج (node dirty-sales.mjs)
{ 'القاهرة': 1700, cairo: 900 }
مرفوض: {"city":"","total":300} (مدينة فاضية) | {"city":"الجيزة","total":"خمسمية","status":"paid"} (المبلغ مش رقم)
محتاج قرار: [ 'cairo' ]
كل القواعد عدّت ✔
~~~

**ليه كده:**

- [['القاهرة ']] بـ 1500 (نص و [[PAID]]) اتجمعت مع [['القاهرة']] بـ 200 = 1700. يعني ق١ و ق٢ و ق٣ شغالين مع بعض.
- [[String(r.city ?? '')]]: لو [[city]] [[undefined]] أو رقم، بيبقى نص قبل [[trim]]، فمفيش [[TypeError: r.city.trim is not a function]].
- **[[toNumber]] بـ regex:** في الأول كتبت [[Number(r.total)]] وبس، وبعدين افتكرت إن [[Number('')]] و [[Number('  ')]] بيرجّعوا **0** (جرّبتها: [[0 0]]). يعني خانة مبلغ فاضية كانت هتعدّي كصفر ومحدش يعرف. فالنص لازم يبقى بشكل رقم الأول، وفيه assert لـ [[total: '']] بيثبت إنه بيترفض.
- **الصف اللي مفيهوش [[status]]** ([[الجيزة]] بـ 400) مااترفضش ومااتحسبش: هو صف سليم بس مش مدفوع.
- **[[/^[a-z\s]+$/i]]:** مدينة كلها حروف إنجليزي بتتعلّم «محتاج قرار». ده مش ترجمة، ده تنبيه بس.

**السؤال اللي هبعته لصاحب الطلب:** «جالي [[cairo]] بالإنجليزي في صفوف من المصدر التاني. أعتبرها القاهرة؟ ولو فيه مدن تانية كده، تحب نعمل جدول أسماء ([[{ cairo: 'القاهرة', giza: 'الجيزة' }]]) يتراجع قبل التقرير؟»

**الغلطة الشائعة:** تعمل [[if (city === 'cairo') city = 'القاهرة']] وتكمّل. ده تخمين متخبّي في الكود، والمرة الجاية هييجي [[Cairo]] أو [[El Qahira]] ومحدش هيعرف إن فيه قاعدة أصلًا.` },
          ],
          ref: [
            { t: "MDN: Default parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters" },
            { t: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
            { t: "MDN: Object.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries" },
            { t: "MDN: Object.fromEntries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries" },
          ],
          pre: [{ to: "js/object destructuring و spread", why: R`التوقيع [[{ onlyPaid = true } = {}]] destructuring بقيمة افتراضية` }],
          deep: {
            why: R`أغلب الوقت الضايع في البرمجة مش في الكتابة — هو في كتابة الحاجة الغلط. والأربع أسئلة دي بتكتشف ده في عشر دقايق بدل ساعتين.`,
            how: R`**ليه المثال الحقيقي أهم من الوصف؟** لأن الوصف بيخبّي الأسئلة. «قايمة طلبات» مش بتقولك: الأسعار أرقام ولا نصوص؟ المدينة ممكن تبقى فاضية؟ فيه حقل [[status]] أصلًا؟

ولما تكتب مثال بقيم حقيقية، الأسئلة دي بتطلع لوحدها.

**والمخرج المكتوب بإيدك** هو أول اختبار. حرفيًا:

~~~text
assert.deepEqual(salesByCity(orders), { 'القاهرة': 2400, 'الإسكندرية': 2400 });
~~~

**والحالات الحدّية** ليها قايمة بتتكرر في كل مشكلة تقريبًا:

| الحالة | السؤال |
|---|---|
| فاضي | [[[]]] بترجّع إيه؟ |
| عنصر واحد | المنطق بيشتغل؟ |
| مكرر | بيتجمّع ولا بيتكتب فوق؟ |
| ناقص | مفتاح مش موجود؟ |
| حدود | صفر، وسالب، ورقم ضخم |
| نوع غلط | نص مكان رقم |

مرّ عليها في كل مرة. وهتلاقي نص الأسئلة المهمة فيها.

**والتوقيع بيحدد شكل الكود.** لو رجّعت [[Record<string, number>]] يبقى اللي بيستخدمها هيعمل [[Object.entries]] عشان يرتّب. ولو رجّعت [[Array<{city, total}>]] يبقى الترتيب جواها. والاختيار ده بيتاخد **دلوقتي** مش بعدين.

**ولو اللي طلب منك مش موجود؟** اكتب افتراضاتك صريحة في أول الدالة كتعليق، وكمّل. والافتراض المكتوب أحسن من افتراض مخبّي — لأن حد هيقراه ويصححه.`,
            when: R`قبل أي كود. وخصوصًا لما الطلب يبان بسيط — البسيط هو اللي بيخبّي الأسئلة.`,
            mistakes: R`تبدأ بالكود على طول. أو تكتب «قايمة طلبات» بدل مثال حقيقي. أو تسيب الحالات الحدّية لبعدين. أو تفترض من غير ما تكتب الافتراض.`
          },
          teach: R`## الطلب بييجي كده

> «عايز أعرف كل مدينة بعنا فيها بكام»

ولو فتحت المحرر دلوقتي، هتكتب حاجة وبعد ساعة تكتشف إنك فهمت غلط.

---

## الأربع أسئلة

### ١. إيه اللي داخل؟ — **بمثال، مش بوصف**

~~~js
const orders = [
  { id: 'A1', city: 'القاهرة',     total: 1500, status: 'paid' },
  { id: 'A2', city: 'الجيزة',      total: 300,  status: 'pending' },
  { id: 'A3', city: 'القاهرة',     total: 900,  status: 'paid' },
  { id: 'A4', city: 'الإسكندرية', total: 2400, status: 'paid' },
];
~~~

«قايمة طلبات» **مش** إجابة. المثال ده إجابة — وهو اللي بيكشف إن فيه حقل [[status]]، وإن [[total]] رقم مش نص.

### ٢. إيه اللي طالع؟ — **اكتبه بإيدك**

~~~text
{ 'القاهرة': 2400, 'الإسكندرية': 2400 }
~~~

**لو مقدرتش تكتبه، يبقى الطلب لسه مبهم.** وده في حد ذاته معلومة.

### ٣. إيه القواعد؟

- المدفوع بس.
- مرتّب تنازليًا.
- المدينة الفاضية تتجاهل.

### ٤. إيه الحالات الحدّية؟

| الحالة | ترجّع إيه | ليه |
|---|---|---|
| [[[]]] | [[{}]] | مفيش مبيعات، مش [[null]] ولا error |
| كله [[pending]] | [[{}]] | الفلترة شالت كله |
| مدينة واحدة | [[{ 'القاهرة': 1500 }]] | التجميع شغال من غير ما يكون فيه حاجة يجمعها |

---

## والسؤال الرابع هو الأهم

لما تسأل **«الطلب الملغي بيتحسب؟»**، في أغلب الوقت هتلاقي إن اللي طلب منك **مفكّرش فيها**.

ده مش تعطيل. ده أهم حاجة بتعملها في أول نص ساعة — وهي اللي بتمنع إنك تبني حاجة وترميها.

---

## والناتج: توقيع

~~~js
function salesByCity(orders, { onlyPaid = true } = {}) { /* ... */ }
~~~

وده بيحدد شكل الكود كله:

| لو رجّعت | اللي بيستخدمها |
|---|---|
| [[Record<string, number>]] | هيعمل [[Object.entries]] عشان يرتّب |
| [[Array<{city, total}>]] | الترتيب جواها، واللي بيستخدمها ياخدها زي ما هي |

والاختيار ده بيتاخد **دلوقتي**، مش بعد ما تكتب ٥٠ سطر.

---

## وقايمة الحالات الحدّية اللي بتتكرر

| الحالة | السؤال |
|---|---|
| فاضي | [[[]]] بترجّع إيه؟ |
| عنصر واحد | المنطق بيشتغل؟ |
| مكرر | بيتجمّع ولا بيتكتب فوق؟ |
| ناقص | مفتاح مش موجود؟ |
| حدود | صفر، سالب، رقم ضخم |
| نوع غلط | نص مكان رقم |

**مرّ عليها في كل مشكلة.** هتلاقي نص الأسئلة المهمة فيها.

---

## وتكلفة الحل: Big-O من التوقيع

التوقيع بيقولك التكلفة قبل الكود. [[salesByCity]] لازم تشوف كل طلب مرة على الأقل، فمستحيل تبقى أقل من **O(n)**. والترتيب على المدن بس (k مدينة) فهو **O(k log k)**. فالحل الطبيعي **O(n + k log k)**، ولو لقيت نفسك كاتب لوب جوه لوب على الطلبات (O(n²))، يبقى فيه حاجة غلط في الطريقة. والقياس الفعلي في الدرس اللي بعده.

| شكل الحل | Big-O | مع مليون طلب |
|---|---|---|
| مرور واحد + ترتيب المدن | O(n + k log k) | عشرات الملي ثواني |
| لكل مدينة، لف على كل الطلبات | O(n × k) | k ضعف الأول |
| لكل طلب، دوّر على مدينته في array | O(n × k) برضه | نفس المشكلة بشكل تاني |

---

## ولو اللي طلب منك مش موجود؟

~~~js
// افتراض: الطلبات الملغية متتحسبش. لو ده غلط، غيّر onlyPaid.
function salesByCity(orders, { onlyPaid = true } = {}) { }
~~~

**افتراض مكتوب أحسن من افتراض مخبّي** — لأن حد هيقراه ويصححه.

---

## الخلاصة

- مثال حقيقي، مش وصف.
- اكتب المخرج بإيدك — ولو مقدرتش، الطلب مبهم.
- الحالات الحدّية **قبل** الكود، ومن القايمة اللي فوق.
- التوقيع بيحدد شكل كل اللي بعده.
- الافتراض يتكتب، ميتخبّاش.`,
          sol: R`الأربع إجابات على الطلب المبهم، والتوقيع اللي طلع منهم. ولاحظ إن المخرج مكتوب بإيد قبل أي كود.`,
          solCode: R`// الطلب: «عايز أعرف كل مدينة بعنا فيها بكام»

// ١) المدخل (مثال حقيقي):
//    [{ id:'A1', city:'القاهرة', total:1500, status:'paid' }, ...]

// ٢) المخرج (مكتوب بإيدي قبل الكود):
//    { 'القاهرة': 2400, 'الإسكندرية': 2400 }

// ٣) القواعد: المدفوع بس | مرتّب تنازليًا | المدينة الفاضية تتجاهل

// ٤) الحدّية: [] -> {} | كله pending -> {} | مدينة واحدة -> { 'القاهرة': 1500 }

// والتوقيع:
function salesByCity(orders, { onlyPaid = true } = {}) { /* ... */ }

// والمخرج اللي كتبته بإيدك هو أول اختبار، حرفيًا:
// assert.deepEqual(salesByCity(orders), { 'القاهرة': 2400, 'الإسكندرية': 2400 });`
        },

        {
          cmd: "ابدأ بأبسط حاجة تشتغل",
          title: "أربع نسخ، كل واحدة بتشتغل، كل واحدة أقرب",
          learn: R`تبني الحل على خطوات صغيرة، كل خطوة ليها ناتج تقدر تشوفه.`,
          out: R`متوصلش لحالة «كتبت ٨٠ سطر ومش شغالين ومش عارف فين».`,
          use: {
            prog: R`الهيكل العظمي الماشي (walking skeleton): حاجة ناقصة **بس شغالة** من أول دقيقة. وكل خطوة بتضيف حتة والكل بيفضل شغّال.`,
            work: R`الكود اللي بيشتغل من أول خطوة بيدّيك معلومات. واللي مش بيشتغل غير في الآخر بيدّيك قلق.`,
            cs: R`التطوير التزايدي: كل حالة وسيطة صحيحة. والعكس — «الانفجار الكبير» — بيخلي الخطأ ممكن يكون في أي مكان من ٨٠ سطر.`,
          },
          desc: R`أكبر غلطة في حل أي مشكلة: تكتب الحل كامل وتشغّله في الآخر.

لأن لما يفشل، الخطأ ممكن يكون في أي سطر. ولما يشتغل، مش عارف هو شغّال صح ولا بالصدفة.

**البديل: كل خطوة بتشتغل.**

ناخد نفس المشكلة بتاعة الدرس اللي فات، ونحلها على أربع نسخ:

**v1 — قيمة ثابتة.** ترجّع [[{ 'القاهرة': 0 }]] محفورة. سخيفة؟ لأ — دي بتثبت إن الشكل صح، وإن الدالة بتتنادى، وإن اللي بيستخدمها بيشتغل.

**v2 — عدّ، من غير فلترة ولا ترتيب.** [[{ 'القاهرة': 2, 'الجيزة': 1, 'الإسكندرية': 1 }]]. التجميع شغّال.

**v3 — المبلغ بدل العدد.** سطر واحد اتغيّر: [[+1]] بقت [[+ r.total]].

**v4 — الفلترة والترتيب.** وخلاص.

**وكل نسخة ليها ناتج شفته بعينك.** فلو v3 طلعت غلط، المشكلة في السطر اللي غيّرته — مش في ٨٠ سطر.

وده مش «أسلوب تعليمي». ده إزاي الناس بتشتغل فعلًا لما المشكلة أصعب من إنها تتحل في الدماغ.`,
          example: R`// v1 — أبسط حاجة تشتغل: قيمة ثابتة
const v1 = () => ({ 'القاهرة': 0 });

// v2 — عدّ حقيقي، من غير فلترة
const v2 = (rows) => {
  const out = {};
  for (const r of rows) out[r.city] = (out[r.city] ?? 0) + 1;
  return out;
};

// v3 — المبلغ بدل العدد (سطر واحد اتغيّر)
const v3 = (rows) => {
  const out = {};
  for (const r of rows) out[r.city] = (out[r.city] ?? 0) + r.total;
  return out;
};

// v4 — المدفوع بس، ومرتّب
const v4 = (rows) => Object.fromEntries(
  Object.entries(v3(rows.filter(r => r.status === 'paid'))).sort((a, b) => b[1] - a[1])
);`,
          lines: [
            R`النسخة الأولى بترجّع قيمة محفورة من غير أي حساب. فايدتها إنها بتثبت شكل الناتج (object مفاتيحه مدن) وإن النداء شغّال، قبل ما تفكر في المنطق. والقوسين حوالين الـ [[{}]] لازمين، وإلا JS هتفهمها جسم دالة مش object.`,
            R`النسخة التانية بتعمل حاجة حقيقية بس أبسط من المطلوب: بتعدّ الطلبات في كل مدينة بدل ما تجمع المبالغ. بتاخد [[rows]] وهي array الطلبات.`,
            R`[[out]] object فاضي هنتجمّع فيه النتيجة: كل مدينة مفتاح وعددها قيمة.`,
            R`لكل طلب: بنقرا العدد الحالي للمدينة، ولو مفيش لسه بنبدأ من صفر، ونزوّد واحد. [[??]] مش [[||]] — عشان الصفر ميتعاملش كغياب. أول مرة المدينة بتظهر مبيبقاش ليها مفتاح في [[out]] فقيمتها [[undefined]]، و [[undefined + 1]] كانت هتدّي [[NaN]].`,
            R`بنرجّع الـ object بعد ما اللوب تخلص، فيه عدد الطلبات لكل مدينة.`,
            R`نهاية [[v2]].`,
            R`النسخة التالتة: نفس الهيكل بالظبط، بس بنجمع المبلغ بدل العدد. التطوير خطوة صغيرة فوق حاجة شغّالة، فلو باظت تعرف السبب على طول.`,
            R`object فاضي جديد للمجاميع. كل نسخة ليها [[out]] بتاعها، فالنسخ مش بتأثر على بعض.`,
            R`**سطر واحد اتغيّر عن v2**: [[+ 1]] بقت [[+ r.total]]، فبدل ما نعدّ بنجمع المبلغ. ده لأن [[total]] رقم في الداتا؛ لو كان نص كانت [[+]] هتلزّق النصوص.`,
            R`بنرجّع المجموع لكل مدينة، شامل الطلبات اللي لسه [[pending]] (الفلترة لسه مجتش).`,
            R`نهاية [[v3]].`,
            R`النسخة الأخيرة بتضيف الحتتين الناقصين: المدفوع بس، والترتيب من الأكبر للأصغر. و [[Object.fromEntries]] بتحوّل array أزواج [مفتاح، قيمة] لـ object تاني.`,
            R`من جوه لبرّه: [[filter]] بتسيب المدفوع، و [[v3]] بتجمع (إعادة استخدام بدل ما نكتبها تاني)، و [[Object.entries]] بتحوّل الناتج لأزواج، و [[sort]] بترتّبهم بالمبلغ (العنصر رقم 1 في كل زوج) تنازلي. والـ object الناتج بيحتفظ بالترتيب ده لأن مفاتيحه نصوص مش أرقام.`,
            R`قفلة [[Object.fromEntries]]. وكل نسخة من الأربعة بتشتغل لوحدها — جرّبهم واحدة واحدة.`
          ],
          try: R`شغّل الأربعة على نفس الداتا واطبع ناتج كل واحدة. وبعدين خد مشكلة في شغلك وقسّمها لأربع نسخ بنفس الطريقة — وشغّل كل واحدة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في داتا الدرس القاهرة والإسكندرية الاتنين 2400. لو عملت [[Object.entries(v4(orders)).slice(0, 1)]]، مين هيطلع الأول؟ اكتب توقعك وسببه، وبعدين شغّل.`, done: R`طلعت القاهرة بـ 2400، لأن [[sort]] في JavaScript stable (العنصرين المتساويين بيفضلوا بترتيب إضافتهم)، والقاهرة اتضافت الأول. وكاتب لو التعادل محتاج قاعدة تانية تقولها مين.`, sol: R`**التوقّع قبل التشغيل:** القاهرة. السبب: [[v3]] بيضيف المدن بترتيب ظهورها في الداتا (القاهرة في الصف الأول، والإسكندرية في الرابع)، و [[sort]] في JavaScript **stable** من ES2019: العنصرين اللي المقارنة بتقول إنهم متساويين ([[b[1] - a[1]]] بـ 0) بيفضلوا بترتيبهم قبل الترتيب.

~~~js tie.mjs
const orders = [
  { id: 'A1', city: 'القاهرة',     total: 1500, status: 'paid' },
  { id: 'A2', city: 'الجيزة',      total: 300,  status: 'pending' },
  { id: 'A3', city: 'القاهرة',     total: 900,  status: 'paid' },
  { id: 'A4', city: 'الإسكندرية', total: 2400, status: 'paid' },
];
const v3 = (rows) => {
  const out = {};
  for (const r of rows) out[r.city] = (out[r.city] ?? 0) + r.total;
  return out;
};
const v4 = (rows) => Object.fromEntries(
  Object.entries(v3(rows.filter(r => r.status === 'paid'))).sort((a, b) => b[1] - a[1])
);

console.log('قبل الترتيب:', Object.entries(v3(orders.filter(r => r.status === 'paid'))));
console.log('الأول:', Object.entries(v4(orders)).slice(0, 1));

// لو الإسكندرية جت الأول في الداتا؟
const swapped = [orders[3], orders[0], orders[1], orders[2]];
console.log('بعد ما غيّرت ترتيب الداتا:', Object.entries(v4(swapped)).slice(0, 1));

// قاعدة تعادل صريحة: المبلغ تنازلي، ولو متساويين الاسم أبجديًا
const v4b = (rows) => Object.fromEntries(
  Object.entries(v3(rows.filter(r => r.status === 'paid')))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ar'))
);
console.log('بقاعدة تعادل:', Object.entries(v4b(orders)).slice(0, 1), Object.entries(v4b(swapped)).slice(0, 1));
~~~

~~~text الناتج (node tie.mjs)
قبل الترتيب: [ [ 'القاهرة', 2400 ], [ 'الإسكندرية', 2400 ] ]
الأول: [ [ 'القاهرة', 2400 ] ]
بعد ما غيّرت ترتيب الداتا: [ [ 'الإسكندرية', 2400 ] ]
بقاعدة تعادل: [ [ 'الإسكندرية', 2400 ] ] [ [ 'الإسكندرية', 2400 ] ]
~~~

**قراية الناتج:**

- **السطر الأول:** قبل [[sort]] القاهرة أولًا، فبعده برضه أولًا. التوقّع صح.
- **السطر التالت أهم واحد:** نفس الداتا بالظبط بس بترتيب صفوف مختلف، والأول بقى الإسكندرية. يعني «مين الأول» في التعادل بيعتمد على ترتيب الصفوف اللي جاية من الـ API، وده حاجة انت مش متحكم فيها.
- **الحل قاعدة تعادل صريحة:** [[b[1] - a[1] || a[0].localeCompare(b[0], 'ar')]]. لو الفرق في المبلغ صفر (falsy)، [[||]] بتروح للمقارنة التانية بالاسم. و [[localeCompare]] بـ [['ar']] بيرتّب الحروف العربي صح. دلوقتي الناتج واحد مهما ترتيب الداتا.

**القاعدة اللي هسأل عليها صاحب الطلب:** «لو مدينتين متعادلين، تحب الترتيب بالاسم؟ ولا بعدد الطلبات (الإسكندرية طلب واحد بـ 2400 والقاهرة طلبين)؟». الكود دلوقتي بيقول «بالاسم» لأنها أبسط قاعدة ثابتة، بس ده قرار مش حقيقة.

**الغلطة الشائعة:** تعتمد على stable sort كأنها قاعدة عمل. هي ضمان إن الترتيب **مش هيتلخبط عشوائي**، مش ضمان إن الترتيب **صح**.` },
            { lvl: 'تطبيق', t: R`**ابنيها على خطوات:** «متوسط الطلب لكل مدينة». اكتب v1 (قيمة ثابتة)، و v2 (عدّ)، و v3 (مجموع وعدد)، و v4 (المتوسط مقرّب)، وشغّل كل واحدة واطبعها قبل اللي بعدها.`, done: R`الأربع نسخ موجودين وكل واحدة اتطبعت، و v4 على كل طلبات الدرس بترجّع القاهرة 1200 والجيزة 300 والإسكندرية 2400، وكل نسخة اتغيّر فيها حاجة واحدة بس عن اللي قبلها.`, sol: R`**التفكير:** المتوسط = المجموع ÷ العدد، فمحتاجين الاتنين لكل مدينة **في نفس اللفة**. فالخطوات: الشكل (v1)، ثم العدد لوحده (v2)، ثم المجموع والعدد سوا (v3)، ثم القسمة والتقريب (v4). وكل نسخة بتتطبع قبل اللي بعدها.

~~~js avg.mjs
const orders = [
  { id: 'A1', city: 'القاهرة',     total: 1500, status: 'paid' },
  { id: 'A2', city: 'الجيزة',      total: 300,  status: 'pending' },
  { id: 'A3', city: 'القاهرة',     total: 900,  status: 'paid' },
  { id: 'A4', city: 'الإسكندرية', total: 2400, status: 'paid' },
];

// v1: قيمة ثابتة بالشكل الصح
const v1 = () => ({ 'القاهرة': 0 });
console.log('v1:', v1(orders));

// v2: عدّ الطلبات لكل مدينة
const v2 = (rows) => {
  const out = {};
  for (const r of rows) out[r.city] = (out[r.city] ?? 0) + 1;
  return out;
};
console.log('v2:', v2(orders));

// v3: المجموع والعدد سوا (اللي اتغيّر: القيمة بقت object بدل رقم)
const v3 = (rows) => {
  const out = {};
  for (const r of rows) {
    const acc = (out[r.city] ??= { sum: 0, count: 0 });
    acc.sum += r.total;
    acc.count += 1;
  }
  return out;
};
console.log('v3:', v3(orders));

// v4: المتوسط مقرّب (اللي اتغيّر: سطر بيحوّل { sum, count } لرقم)
const v4 = (rows) => Object.fromEntries(
  Object.entries(v3(rows)).map(([city, { sum, count }]) => [city, Math.round(sum / count)])
);
console.log('v4:', v4(orders));
console.log('v4 على []:', v4([]));
~~~

~~~text الناتج (node avg.mjs)
v1: { 'القاهرة': 0 }
v2: { 'القاهرة': 2, 'الجيزة': 1, 'الإسكندرية': 1 }
v3: {
  'القاهرة': { sum: 2400, count: 2 },
  'الجيزة': { sum: 300, count: 1 },
  'الإسكندرية': { sum: 2400, count: 1 }
}
v4: { 'القاهرة': 1200, 'الجيزة': 300, 'الإسكندرية': 2400 }
v4 على []: {}
~~~

**كل نسخة غيّرت حاجة واحدة:**

| من | لـ | اللي اتغيّر |
|---|---|---|
| v1 | v2 | قيمة محفورة → لفة حقيقية بتعدّ |
| v2 | v3 | القيمة بقت [[{ sum, count }]] بدل رقم |
| v3 | v4 | سطر [[map]] بيحوّل [[{ sum, count }]] لـ [[Math.round(sum / count)]] |

**السطور المهمة:**

- [[out[r.city] ??= { sum: 0, count: 0 }]]: [[??=]] بتحط القيمة **بس لو** المفتاح [[undefined]] أو [[null]]، وبترجّع القيمة اللي في المفتاح في الحالتين. فـ [[acc]] بيشاور على نفس الـ object اللي جوه [[out]]، و [[acc.sum += ...]] بيعدّل جوه [[out]] مباشرة.
- [[([city, { sum, count }]) => ...]]: destructuring جوه destructuring: الزوج اسمه [[city]] وقيمته، ومن الـ value بناخد [[sum]] و [[count]].
- **v4 بتعيد استخدام v3:** مفيش لفة جديدة، القسمة بس.
- **القاهرة 1200:** (1500 + 900) ÷ 2. والجيزة 300 لأن مفيش فلترة (التمرين قال «كل الطلبات»).
- **[[v4([])]] بـ [[{}]]:** القسمة على صفر مستحيلة هنا، لأن أي مدينة موجودة في [[v3]] ليها [[count]] واحد على الأقل. ده سبب كويس إن المجموع والعدد يتحسبوا مع بعض.

**الغلطة الشائعة:** تحسب المتوسط جوه اللفة نفسها: تبدأ بأول مبلغ وتعمل [[avg = (avg + r.total) / 2]] مع كل طلب. جرّبتها: على طلبين القاهرة ([[1500]] و [[900]]) طلعت 1200 صح بالصدفة، ولما زوّدت طلب تالت بـ [[600]] طلعت 900 والصح 1000. احفظ المجموع والعدد واقسم **في الآخر**.` },
            { lvl: 'تحدي', t: R`**مسألة على خطوات:** [[topWords(text, n)]] بترجّع أكتر [[n]] كلمات متكررة ومعاها العدد، من غير فرق بين الحروف الكبيرة والصغيرة ومن غير علامات الترقيم. ابدأ بـ v1 ثابتة وكبّرها.`, done: R`[[topWords('Hi hi, HI! bye', 3)]] بترجّع [[hi]] بـ 3 و [[bye]] بـ 1 بس (مش ٣ عناصر)، والنص الفاضي بيرجّع مصفوفة فاضية، و [[n]] بـ 0 بترجّع فاضية، وعندك ٤ نسخ في الملف كل واحدة شغالة.`, sol: R`**التفكير:** المدخل نص و [[n]]. المخرج مصفوفة مرتّبة [[{ word, count }]] فيها [[n]] **على الأكتر**. الحالات الحدّية: نص فاضي، و [[n]] بـ 0، وكلمات أقل من [[n]]. والخطوات: الشكل، ثم العدّ الخام، ثم التنضيف (حروف صغيرة ومن غير ترقيم)، ثم الترتيب والقص.

~~~js top-words.mjs
import assert from 'node:assert/strict';

const sample = 'Hi hi, HI! bye';

// v1: الشكل الصح بقيمة محفورة
const v1 = () => [{ word: 'hi', count: 3 }];
console.log('v1:', v1(sample, 3));

// v2: عدّ حقيقي، بس بالتقسيم على المسافات وبس
const v2 = (text) => {
  const counts = new Map();
  for (const w of text.split(' ')) counts.set(w, (counts.get(w) ?? 0) + 1);
  return [...counts].map(([word, count]) => ({ word, count }));
};
console.log('v2:', v2(sample));

// v3: حروف صغيرة ومن غير علامات ترقيم (اللي اتغيّر: سطر التقطيع)
const words = (text) => text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? [];
const v3 = (text) => {
  const counts = new Map();
  for (const w of words(text)) counts.set(w, (counts.get(w) ?? 0) + 1);
  return [...counts].map(([word, count]) => ({ word, count }));
};
console.log('v3:', v3(sample));

// v4: الترتيب وأول n (اللي اتغيّر: sort و slice)
const topWords = (text, n) =>
  v3(text).sort((a, b) => b.count - a.count || a.word.localeCompare(b.word)).slice(0, Math.max(0, n));
console.log('v4:', topWords(sample, 3));

assert.deepEqual(topWords('Hi hi, HI! bye', 3), [{ word: 'hi', count: 3 }, { word: 'bye', count: 1 }]);
assert.deepEqual(topWords('', 3), []);
assert.deepEqual(topWords('a b c', 0), []);
assert.deepEqual(topWords('ده نص، ونص تاني! نص', 1), [{ word: 'نص', count: 2 }]);   // «ونص» كلمة لوحدها
console.log('الحالات الحدّية عدّت ✔');
~~~

~~~text الناتج (node top-words.mjs)
v1: [ { word: 'hi', count: 3 } ]
v2: [
  { word: 'Hi', count: 1 },
  { word: 'hi,', count: 1 },
  { word: 'HI!', count: 1 },
  { word: 'bye', count: 1 }
]
v3: [ { word: 'hi', count: 3 }, { word: 'bye', count: 1 } ]
v4: [ { word: 'hi', count: 3 }, { word: 'bye', count: 1 } ]
الحالات الحدّية عدّت ✔
~~~

**ليه كل نسخة:**

- **v1** بتثبت شكل المخرج: مصفوفة objects. أي كود بيعرضها يتكتب من دلوقتي.
- **v2** بتعدّ فعلًا، والناتج بيكشف المشكلة بالعين: [[Hi]] و [[hi,]] و [[HI!]] اتعدّوا ٣ كلمات مختلفة. ده اللي بيبرّر الخطوة الجاية، مش تخمين.
- **v3** غيّرت سطر التقطيع بس: [[toLowerCase()]] ثم [[match(/[\p{L}\p{N}']+/gu)]]. [[\p{L}]] أي حرف في أي لغة (عربي كمان)، و [[\p{N}]] أي رقم، و [[u]] لازم عشان [[\p{...}]] تشتغل، و [[g]] عشان يرجّع كل الكلمات. و [[?? []]] لأن [[match]] بترجّع [[null]] لو مفيش ولا كلمة (النص الفاضي).
- **v4** زوّدت [[sort]] (العدد تنازلي، والتعادل بالأبجدية عشان الناتج ثابت) و [[slice(0, Math.max(0, n))]]. [[slice]] مبترميش لو [[n]] أكبر من العدد، فـ [[hi]] و [[bye]] رجعوا اتنين بس مع [[n = 3]].

**حاجة اكتشفتها وأنا بختبر:** كتبت assert إن [['ده نص، ونص تاني! نص']] فيه [[نص]] ٣ مرات، وفشل:

~~~text الناتج
+     count: 2,
-     count: 3,
      word: 'نص'
~~~

[[ونص]] كلمة واحدة بالنسبة للكود، لأن واو العطف لازقة فيها. الكود صح والتوقّع هو اللي كان غلط. في العربي «الكلمة» محتاجة قرار: تشيل [[و]] و [[ال]] من الأول؟ ده اسمه stemming، ومحتاج قواعد لغة مش regex بسيط. فسيبت الـ assert على 2 وكتبت السبب جنبه، ولو التطبيق محتاجه يبقى سؤال لصاحب الطلب.

**الغلطة الشائعة:** تبدأ بـ v3 على طول بـ regex معقد قبل ما تشوف ناتج v2. ساعتها مش هتعرف إيه بالظبط اللي الـ regex بيحله، ولا هتلاحظ حالة زي [[ونص]].` },
          ],
          ref: [
            { t: "MDN: Array.prototype.sort()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" },
            { t: "MDN: Nullish coalescing (??)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing" },
            { t: "MDN: Nullish coalescing assignment (??=)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment" },
            { t: "MDN: String.prototype.localeCompare()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare" },
            { t: "Node.js: Test runner (node:test)", url: "https://nodejs.org/api/test.html" },
          ],
          pre: [{ to: "js/sort و toSorted", why: R`v4 بترتّب بـ [[sort]] ودالة مقارنة، والتمرين الأول عن الـ stable sort` }],
          deep: {
            why: R`الكود اللي بيشتغل بيدّي معلومات. واللي مش بيشتغل بيدّي قلق. والفرق بينهم إنك تشغّل بدري وكتير.`,
            how: R`**ليه v1 مش سخيفة؟** لأنها بتختبر كل حاجة **حوالين** المنطق: الدالة متصدّرة صح؟ الاستيراد شغّال؟ اللي بيستخدمها بيتعامل مع الشكل ده؟ الاختبار بيعدّي؟

وفي مشروع ويب، v1 هي اللي بتثبت إن الـ route شغّال والـ JSON بيوصل للواجهة. والمنطق تفصيلة بعد كده.

ودي نفس فكرة **mock** أو **stub**: حاجة بترجّع الشكل الصح بقيمة غلط، عشان تبني حواليها.

**والقاعدة في كل خطوة: غيّر حاجة واحدة.** لو غيّرت الفلترة والترتيب سوا وفشلت، اتنين احتمال. ولو واحدة، احتمال واحد.

**وإزاي تقسّم؟** الترتيب اللي بيشتغل غالبًا:

١. الشكل الصح بقيمة غلط.
٢. المنطق الأساسي على **كل** الداتا.
٣. الفلترة.
٤. الترتيب والتنسيق.
٥. الحالات الحدّية.

لاحظ إن الحالات الحدّية **في الآخر**. التعامل معاها بدري بيلخبط المنطق الأساسي.

**والعلاقة بالـ TDD**: نفس الحلقة بالظبط (اختبار أحمر، أقل كود يخليه أخضر، نضّف). والحالات الحدّية **تتكتب اختبارات من الأول** وتفضل حمرا لحد الخطوة الخامسة: كده مش هتنساها. وده اللي حصل فعلًا في الدرس: اختبار «المدينة الفاضية تتجاهل» فشل على v4 وكشف إنها ناسية القاعدة دي، وسطر في [[filter]] صلّحها.

**و Big-O الحل** O(n + k log k): مرور واحد على الصفوف، وترتيب المدن بس (k). وقِسته: 100 ألف صف 3.8ms و 800 ألف 24.1ms، يعني الوقت ماشي مع عدد الصفوف.

**وعلامة إنك مش بتعمل ده**: لما تلاقي نفسك كتبت ٣٠ سطر من غير ما تشغّل. وقف وشغّل اللي معاك.`,
            when: R`أي مشكلة أكبر من إنها تتحل في دماغك. وده أصغر مما تفتكر.`,
            mistakes: R`تكتب الكل وتشغّل في الآخر. أو تغيّر حاجتين في خطوة. أو تبدأ بالحالات الحدّية. أو تعتبر v1 «ضياع وقت».`
          },
          teach: R`## الغلطة: تكتب الكل وتشغّل في الآخر

لما يفشل، الخطأ ممكن يكون في أي سطر من ٨٠.
ولما يشتغل، مش عارف هو صح ولا بالصدفة.

---

## البديل: أربع نسخ، كل واحدة بتشتغل

~~~js v1 — قيمة محفورة
const v1 = () => ({ 'القاهرة': 0 });
~~~

~~~text اتشغّل فعلًا · Node 24
v1: { 'القاهرة': 0 }
~~~

**سخيفة؟ لأ.** دي بتثبت: الشكل صح، والدالة بتتنادى، واللي بيستخدمها بيشتغل.

---

~~~js v2 — عدّ حقيقي، من غير فلترة
const v2 = (rows) => {
  const out = {};
  for (const r of rows) out[r.city] = (out[r.city] ?? 0) + 1;
  return out;
};
~~~

~~~text اتشغّل فعلًا
v2: { 'القاهرة': 2, 'الجيزة': 1, 'الإسكندرية': 1 }
~~~

التجميع شغّال. **شفته بعينك.**

---

~~~js v3 — المبلغ بدل العدد
for (const r of rows) out[r.city] = (out[r.city] ?? 0) + r.total;
//                                                      ^^^^^^^^ ده بس اللي اتغيّر
~~~

~~~text اتشغّل فعلًا
v3: { 'القاهرة': 2400, 'الجيزة': 300, 'الإسكندرية': 2400 }
~~~

**سطر واحد اتغيّر.** فلو الناتج غلط، انت عارف فين.

---

~~~js v4 — الفلترة والترتيب
const v4 = (rows) => Object.fromEntries(
  Object.entries(v3(rows.filter(r => r.status === 'paid'))).sort((a, b) => b[1] - a[1])
);
~~~

~~~text اتشغّل فعلًا
v4: { 'القاهرة': 2400, 'الإسكندرية': 2400 }
~~~

وخلاص. [[الجيزة]] اختفت لأنها [[pending]].

---

## ١. القاعدة: غيّر **حاجة واحدة** في كل خطوة

لو غيّرت الفلترة والترتيب سوا وفشلت → احتمالين.
لو واحدة → احتمال واحد.

---

## ٢. وإزاي تقسّم؟

~~~text الترتيب اللي بيشتغل غالبًا
١. الشكل الصح بقيمة غلط          <-- v1
٢. المنطق الأساسي على كل الداتا   <-- v2، v3
٣. الفلترة                        <-- v4
٤. الترتيب والتنسيق               <-- v4
٥. الحالات الحدّية                <-- في الآخر
~~~

**والحالات الحدّية في الآخر عن قصد.** التعامل معاها بدري بيلخبط المنطق الأساسي.

---

## ٣. و v1 دي حاجة ليها اسم

في مشروع ويب، v1 هي اللي بتثبت إن الـ route شغّال والـ JSON بيوصل للواجهة. والمنطق تفصيلة بعد كده.

ودي نفس فكرة الـ **mock** أو الـ **stub**: حاجة بترجّع **الشكل** الصح بقيمة غلط، عشان تبني حواليها.

والاسم الكامل للنمط: **walking skeleton** — هيكل عظمي ماشي. ناقص، بس ماشي.

---

## ٤. وعلامة إنك مش بتعمل ده

**لما تلاقي نفسك كتبت ٣٠ سطر من غير ما تشغّل.**

وقف. شغّل اللي معاك. حتى لو ناقص.

---

## ٥. TDD: اختبارات الحالات الحدّية قبل الكود

«الحالات الحدّية في الآخر» معناها **التعامل** معاها في الآخر، مش **كتابتها**. اكتبها اختبارات من الأول، من القايمة اللي طلعت في درس «من جملة لتوقيع دالة»، وسيبها تفشل. هي اللي هتقولك إمتى خلصت.

ده TDD (Test-Driven Development): **أحمر** (اختبار فاشل)، **أخضر** (أقل كود يعدّيه)، **نضّف** (refactor والاختبارات لسه خضرا).

~~~js sales.test.js — مكتوب قبل ما v4 تبقى الحل النهائي
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { salesByCity } from './sales.js';

const paid = (city, total) => ({ city, total, status: 'paid' });

test('قايمة فاضية', () => assert.deepEqual(salesByCity([]), {}));
test('كله pending', () => assert.deepEqual(salesByCity([{ city: 'الجيزة', total: 300, status: 'pending' }]), {}));
test('مدينة واحدة', () => assert.deepEqual(salesByCity([paid('القاهرة', 1500)]), { 'القاهرة': 1500 }));
test('المدينة الفاضية تتجاهل', () => assert.deepEqual(salesByCity([paid('', 300), paid('القاهرة', 10)]), { 'القاهرة': 10 }));
test('الترتيب تنازلي', () => assert.deepEqual(Object.keys(salesByCity([paid('أ', 1), paid('ب', 5), paid('ج', 3)])), ['ب', 'ج', 'أ']));
~~~

- [[paid(city, total)]]: دالة صغيرة بتعمل صف مدفوع، عشان كل اختبار يبقى سطر واحد مقروء.
- كل [[test]] حالة واحدة من القايمة، واسمه **هو** الحالة. فلما يفشل، الاسم بيقولك أنهي قاعدة اتكسرت.
- [[assert.deepEqual]] من [[node:assert/strict]] بتقارن الـ object بالمحتوى مش بالـ reference.
- [[Object.keys(...)]] في آخر اختبار بيختبر **الترتيب** لوحده، لأن [[deepEqual]] على objects مبتهتمش بترتيب المفاتيح.

~~~text node --test على v4 (sales.js = v4) · اتشغّل فعلًا · Node 24.22.1
✔ قايمة فاضية (1.197ms)
✔ كله pending (0.1442ms)
✔ مدينة واحدة (0.2509ms)
✖ المدينة الفاضية تتجاهل (1.05ms)
✔ الترتيب تنازلي (0.1851ms)
ℹ tests 5
ℹ pass 4
ℹ fail 1

  + actual - expected
    {
  +   '': 300,
      'القاهرة': 10
    }
~~~

**الاختبار لقى باج حقيقي في v4.** القاعدة التالتة من الدرس اللي فات («المدينة الفاضية تتجاهل») كانت مكتوبة في التعليقات، و v4 نسيتها. وعين اللي بيبص على [[console.log]] مكانتش هتلاحظ، لأن الداتا التجريبية مفيهاش مدينة فاضية.

~~~js v5 — سطر واحد اتغيّر (الأخضر)
rows.filter(r => r.status === 'paid' && r.city.trim() !== '')
~~~

~~~text اتشغّل فعلًا
✔ قايمة فاضية (1.1452ms)
✔ كله pending (0.6432ms)
✔ مدينة واحدة (0.2371ms)
✔ المدينة الفاضية تتجاهل (0.1244ms)
✔ الترتيب تنازلي (0.1773ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

| الخطوة | بتعمل إيه | علامة إنك عملتها صح |
|---|---|---|
| أحمر | اختبار لحالة واحدة، وتشغّله **قبل** الكود | بيفشل، وبالسبب اللي انت متوقعه |
| أخضر | أقل تغيير يخليه يعدّي | الاختبار ده بقى أخضر والباقي فضل أخضر |
| نضّف | تحسّن الأسماء أو تفصل دالة | الاختبارات كلها خضرا من غير ما تلمسها |

> ليه تشوفه **أحمر** الأول؟ لأن الاختبار اللي عمره ما فشل ممكن يكون مش بيختبر حاجة (اسم دالة غلط، [[assert]] ناقص). الفشل الأول بيثبت إن الاختبار شغال. وتفاصيل أكتر في تاب هندسة البرمجيات.

---

## ٦. Big-O للحل: O(n + k log k)

قول تكلفة الحل **بالرقم**، مش «سريع»:

| الخطوة | التكلفة | ليه |
|---|---|---|
| [[filter]] | O(n) | بيعدّي على الـ n صف مرة واحدة |
| التجميع في [[out]] | O(n) | كل صف قراية وكتابة في object، وده O(1) في المتوسط |
| [[Object.entries]] | O(k) | k = عدد المدن، وغالبًا أصغر من n بكتير |
| [[sort]] | O(k log k) | ترتيب k مدينة بس، مش n صف |
| **الكل** | **O(n + k log k)** | ولو k صغيرة (٢٧ محافظة) بتبقى عمليًا O(n) |

والذاكرة O(n) عشان [[filter]] بتعمل array جديدة، و O(k) للـ object. ولو الداتا ضخمة، لوب واحد بـ [[if]] جواه من غير [[filter]] بيوفّر الـ array دي.

~~~text قياس: 27 مدينة، متوسط 5 تشغيلات · اتشغّل فعلًا · Node 24.22.1
 100000 صف -> 3.8 ms
 200000 صف -> 7.9 ms
 400000 صف -> 13.5 ms
 800000 صف -> 24.1 ms
~~~

**الصفوف بتتضاعف والوقت بيتضاعف تقريبًا** (٣.٨ ← ٧.٩ ← ١٣.٥ ← ٢٤.١). ده شكل O(n) في القياس. ولو كان فيه لوب جوه لوب، الضعف في الصفوف كان هيبقى أربع أضعاف في الوقت (درس «اختار التركيبة الصح»).

---

## الخلاصة

- كل نسخة **بتشتغل**، حتى لو ناقصة.
- v1 بقيمة محفورة بتثبت كل حاجة حوالين المنطق.
- **حاجة واحدة** في كل خطوة.
- الحالات الحدّية في الآخر.
- كتبت ٣٠ سطر من غير ما تشغّل؟ وقف.
- اختبارات الحالات الحدّية تتكتب **الأول** وتفشل (TDD)، وتتحل في الآخر. واحد منهم لقى إن v4 ناسية المدينة الفاضية.
- الحل O(n + k log k): الوقت اتضاعف مع الصفوف في القياس.`,
          sol: R`الأربع نسخ بناتجهم الحقيقي — وكل واحدة شغالة.`,
          solCode: R`const v1 = () => ({ 'القاهرة': 0 });
const v2 = (rows) => { const out={}; for (const r of rows) out[r.city]=(out[r.city]??0)+1; return out; };
const v3 = (rows) => { const out={}; for (const r of rows) out[r.city]=(out[r.city]??0)+r.total; return out; };
const v4 = (rows) => Object.fromEntries(
  Object.entries(v3(rows.filter(r => r.status==='paid'))).sort((a,b) => b[1]-a[1])
);

// الناتج (اتشغّل فعلًا على Node 24.22.1):
// v1: { 'القاهرة': 0 }
// v2: { 'القاهرة': 2, 'الجيزة': 1, 'الإسكندرية': 1 }
// v3: { 'القاهرة': 2400, 'الجيزة': 300, 'الإسكندرية': 2400 }
// v4: { 'القاهرة': 2400, 'الإسكندرية': 2400 }
//
// وبين v2 و v3 سطر واحد اتغيّر: ‎+ 1‎ بقت ‎+ r.total‎

// TDD: اختبار «المدينة الفاضية تتجاهل» اتكتب قبل الحل وفشل على v4:
//   actual: { '': 300, 'القاهرة': 10 }   expected: { 'القاهرة': 10 }
// v5 = v4 بسطر filter واحد زيادة:
const v5 = (rows) => Object.fromEntries(
  Object.entries(v3(rows.filter(r => r.status==='paid' && r.city.trim() !== ''))).sort((a,b) => b[1]-a[1])
);
// ℹ tests 5  ℹ pass 5  ℹ fail 0
//
// Big-O: O(n + k log k) — n صف و k مدينة. وقِسته: 100000 صف 3.8ms، 800000 صف 24.1ms`
        },

        {
          cmd: "لما تعلق: صغّر المشكلة",
          title: "اطبع الشكل، واعزل أصغر حالة، وقارن",
          learn: R`تلاقي سبب الباج بتصغير المشكلة بدل ما تبص في الكود كله.`,
          out: R`توصل للسبب في دقايق بدل ساعة تخمين.`,
          use: {
            prog: R`أغلب باجات JavaScript سببها **نوع** مش منطق. و [[typeof]] على المدخلات بتكشف نصهم في سطر.`,
            work: R`«بيطلّع نتيجة غلط» مش معلومة. و«الحقل ده نص مش رقم» معلومة. والتحويل بينهم هو الشغل.`,
            cs: R`تقليل المشكلة (reduction): تشيل من الحالة الفاشلة لحد ما تبقى أصغر حاجة لسه بتفشل. واللي فاضل هو السبب.`,
          },
          desc: R`الكود بيطلّع نتيجة غلط. وأول رد فعل عند الناس: تبص في الكود وتقرا.

**وده أبطأ طريقة.**

الطريقة الأسرع إنك **تصغّر** لحد ما السبب يبان لوحده. أربع خطوات:

**١. اطبع الشكل، مش القيمة.** [[console.log(rows)]] بتوريك القيم. و [[rows.map(r => typeof r.price)]] بتوريك **الأنواع** — وفي JavaScript، ده نص الباجات.

**٢. اعزل أصغر حالة بتعيد الباج.** مش الدالة كلها — سطر. لو [[0 + '10']] بتدّي [["010"]]، خلاص لقيته.

**٣. قارن المتوقع بالفعلي.** واطبع النوع كمان: [[JSON.stringify]] بتوريك الفرق بين [[35]] و [["35"]] اللي [[console.log]] بتخبّيه.

**٤. صلّح، واكتب اختبار بيثبت.** الاختبار هو اللي بيمنع الباج يرجع.

**ومثال حقيقي:** مجموع المفروض يطلع ٣٥.

[[rows.reduce((s, r) => s + r.price, 0)]]

والناتج: **[["010205"]]**. نص.

[[typeof]] على المدخلات بتقول: [[string, string, string]]. والأسعار نصوص، و [[+]] على نص بتلزّق مش بتجمع.

**وفيه حالة أوجع:** مفتاح ناقص. [[Number(undefined)]] بتدّي [[NaN]]، و [[NaN]] في أي عملية بتسمّم النتيجة كلها. والناتج بيبقى [[NaN]] — من غير أي رسالة خطأ.`,
          example: R`const rows = [{ price: '10' }, { price: '20' }, { price: '5' }];

// الباج: المفروض 35
const bug = rows.reduce((s, r) => s + r.price, 0);
// "010205"  ← نص

// ١) اطبع الشكل مش القيمة
rows.map(r => typeof r.price);        // ['string','string','string']

// ٢) أصغر حالة بتعيد الباج
0 + '10';                              // "010"

// ٣) الإصلاح
rows.reduce((s, r) => s + Number(r.price), 0);   // 35

// والحالة الأوجع: مفتاح ناقص
const rows2 = [{ price: '10' }, { amount: '20' }, { price: '5' }];
Number(undefined);                     // NaN
rows2.reduce((s, r) => s + Number(r.price), 0);          // NaN
rows2.reduce((s, r) => s + (Number(r.price) || 0), 0);   // 15`,
          lines: [
            R`الداتا. والأسعار **نصوص** — وده اللي هيكسر.`,
            R`الباج: الناتج [["010205"]] مش [[35]]. و [[JSON.stringify]] هي اللي بتوريك إنه نص — [[console.log]] كانت هتطبع [[010205]] من غير علامات تنصيص.`,
            R`**الخطوة الأولى**: الأنواع مش القيم. وطلعوا كلهم [[string]].`,
            R`**الخطوة التانية**: أصغر سطر بيعيد الباج. و [[+]] على نص بتلزّق.`,
            R`**الخطوة التالتة**: الإصلاح — [[Number()]] بتحوّل.`,
            R`والحالة الأوجع: المفتاح هنا اسمه [[amount]] مش [[price]].`,
            R`ليه الحالة دي بتبوّظ؟ الصف التاني ملوش [[price]]، فـ [[r.price]] بترجّع [[undefined]]، و [[Number(undefined)]] بتدّي [[NaN]] (مش صفر، عكس [[Number(null)]] اللي بتدّي 0).`,
            R`و [[NaN]] واحدة بتسمّم المجموع كله — **من غير أي رسالة خطأ**.`,
            R`والحل: [[|| 0]] بتحوّل [[NaN]] لصفر لأن [[NaN]] falsy، فالمجموع 15 (10 + 5). بس خلي بالك: كده الصف الغلط بيتعدّى بهدوء؛ لو المفروض كل صف فيه [[price]]، الأحسن تطبع تحذير أو ترمي error بدل ما تخفيه.`
          ],
          try: R`خد باج عندك دلوقتي وطبّق الأربع خطوات بالترتيب. ابدأ بـ [[typeof]] على كل مدخل. ولو الباج في داتا جاية من API، اطبع [[Object.keys]] على أول عنصر.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[ ['1', '2', '3'].map(parseInt)]] بترجّع [[1, NaN, NaN]]. صغّرها لحد ما تلاقي أصغر سطر بيعيد الباج.`, done: R`لقيت إن [[map]] بتبعت الـ index كـ argument تاني، و [[parseInt('2', 1)]] لوحدها بترجّع [[NaN]] (أساس 1 مش موجود)، والتصليح [[.map(Number)]] أو [[.map(s => parseInt(s, 10))]] بيرجّع [[1, 2, 3]].`, sol: R`**التصغير بالخطوات:** بدل ما أبص في [[parseInt]] وأخمّن، اطبع اللي [[map]] بتبعته فعلًا، وبعدين نادي [[parseInt]] بإيدك بنفس القيم.

~~~js parse-int.mjs
// الباج
console.log("['1', '2', '3'].map(parseInt) =", ['1', '2', '3'].map(parseInt));

// ١) اطبع اللي map بتبعته فعلًا
['1', '2', '3'].map((...args) => console.log('map بعتت:', JSON.stringify(args)));

// ٢) أصغر حالة: نادي parseInt بنفس الـ arguments بإيدك
console.log("parseInt('1', 0) =", parseInt('1', 0));   // 0 = «خمّن الأساس» فبقى 10
console.log("parseInt('2', 1) =", parseInt('2', 1));   // أساس 1 مش موجود
console.log("parseInt('3', 2) =", parseInt('3', 2));   // 3 مش رقم في الثنائي

// ٣) التصليح
console.log('map(Number) =', ['1', '2', '3'].map(Number));
console.log('map(s => parseInt(s, 10)) =', ['1', '2', '3'].map((s) => parseInt(s, 10)));
~~~

~~~text الناتج (node parse-int.mjs)
['1', '2', '3'].map(parseInt) = [ 1, NaN, NaN ]
map بعتت: ["1",0,["1","2","3"]]
map بعتت: ["2",1,["1","2","3"]]
map بعتت: ["3",2,["1","2","3"]]
parseInt('1', 0) = 1
parseInt('2', 1) = NaN
parseInt('3', 2) = NaN
map(Number) = [ 1, 2, 3 ]
map(s => parseInt(s, 10)) = [ 1, 2, 3 ]
~~~

**الخطوة اللي كشفت كل حاجة:** [[(...args) => console.log(...)]]. [[...args]] بيلم **كل** الـ arguments في مصفوفة، فبان إن [[map]] بتبعت ٣ حاجات: العنصر، والـ index، والمصفوفة كلها. و [[parseInt]] بتاخد argument تاني هو الأساس (radix)، فالـ index دخل مكانه.

**أصغر سطر بيعيد الباج:** [[parseInt('2', 1)]] لوحده بـ [[NaN]]: الأساس لازم من 2 لـ 36، و 1 مش منهم. و [[parseInt('3', 2)]] بـ [[NaN]] لأن 3 مش رقم في الثنائي (فيه 0 و 1 بس). والأول نجح بالصدفة لأن أساس 0 معناه «خمّن»، فبقى عشري.

**التصليحين:**

- [[map(Number)]]: [[Number]] بتاخد argument واحد وبتتجاهل الباقي، فالـ index ملوش أثر.
- [[map((s) => parseInt(s, 10))]]: انت اللي بتحدد الـ arguments، والأساس 10 صريح. ده الأحسن لو النص ممكن يبقى فيه حاجة بعد الرقم ([[parseInt('12px', 10)]] بـ 12، و [[Number('12px')]] بـ [[NaN]]).

**الغلطة الشائعة:** تبعت أي دالة جاهزة لـ [[map]] أو [[forEach]] على طول ([[map(parseInt)]]، [[map(fn)]]). اتأكد إن الدالة دي متفهمش الـ argument التاني بتاع [[map]] (الـ index) على إنه حاجة تانية.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** رد API: [[{ qty: '2', price: 10 }]] و [[{ qty: 3, price: '5' }]] و [[{ price: 7 }]]. المجموع [[qty * price]] طالع [[NaN]]. طبّق الأربع خطوات بالترتيب: [[typeof]] و [[Object.keys]] على كل صف الأول.`, done: R`طبعت جدول الأنواع والمفاتيح ولقيت الصف التالت من غير [[qty]]، وقررت قاعدة: لو تتجاهله المجموع 35، ولو [[qty]] الافتراضي 1 المجموع 42. وكاتب اختبار للقاعدة اللي اخترتها.`, sol: R`الأربع خطوات بالترتيب في ملف واحد:

~~~js cart.mjs
import assert from 'node:assert/strict';

const rows = [{ qty: '2', price: 10 }, { qty: 3, price: '5' }, { price: 7 }];

// الباج
console.log('المجموع:', rows.reduce((s, r) => s + r.qty * r.price, 0));

// ١) الأنواع والمفاتيح لكل صف
console.table(rows.map((r, i) => ({ صف: i, keys: Object.keys(r).join(','), qty: typeof r.qty, price: typeof r.price, 'qty*price': r.qty * r.price })));

// ٢) أصغر حالة
console.log('undefined * 7 =', undefined * 7, "| '2' * 10 =", '2' * 10);

// ٣) القاعدتين
const total = (rows, { missingQty }) => rows.reduce((s, r) => {
  if (r.qty === undefined && missingQty === 'skip') return s;
  const qty = r.qty === undefined ? 1 : Number(r.qty);
  return s + qty * Number(r.price);
}, 0);
console.log('لو الصف من غير qty يتجاهل:', total(rows, { missingQty: 'skip' }));
console.log('لو qty الافتراضي 1      :', total(rows, { missingQty: 'one' }));

// ٤) الاختبار للقاعدة اللي اخترتها (الافتراضي 1)
assert.equal(total(rows, { missingQty: 'one' }), 42);
assert.equal(total([{ qty: '4', price: '2.5' }], { missingQty: 'one' }), 10);
assert.equal(total([], { missingQty: 'one' }), 0);
console.log('الاختبار عدّى ✔');
~~~

~~~text الناتج (node cart.mjs)
المجموع: NaN
┌─────────┬────┬─────────────┬─────────────┬──────────┬───────────┐
│ (index) │ صف │ keys        │ qty         │ price    │ qty*price │
├─────────┼────┼─────────────┼─────────────┼──────────┼───────────┤
│ 0       │ 0  │ 'qty,price' │ 'string'    │ 'number' │ 20        │
│ 1       │ 1  │ 'qty,price' │ 'number'    │ 'string' │ 15        │
│ 2       │ 2  │ 'price'     │ 'undefined' │ 'number' │ NaN       │
└─────────┴────┴─────────────┴─────────────┴──────────┴───────────┘
undefined * 7 = NaN | '2' * 10 = 20
لو الصف من غير qty يتجاهل: 35
لو qty الافتراضي 1      : 42
الاختبار عدّى ✔
~~~

**الجدول قال كل حاجة في سطر واحد:**

- الصف 0 و 1 فيهم نصوص ([['2']] و [['5']])، بس **مش هم المشكلة**: [[*]] بتحوّل النص لرقم (عكس [[+]] اللي بتلزّق)، فطلعوا 20 و 15 صح.
- الصف 2 مفاتيحه [[price]] بس، و [[qty]] نوعها [[undefined]]، و [[undefined * 7]] بـ [[NaN]]. وواحدة [[NaN]] سمّمت المجموع كله.
- [[console.table]] بيعرض كل صف في سطر، فالخانة الشاذة بتبان بالعين بدل ما تقرا ٣ objects.

**القاعدة محتاجة قرار، مش تصليح:** الصف من غير [[qty]] معناه إيه؟

| القاعدة | المجموع | إمتى تبقى صح |
|---|---|---|
| يتجاهل | 35 | لو الصف ده داتا بايظة ومينفعش نعتمد عليها |
| [[qty]] الافتراضي 1 | 42 | لو الـ API بيشيل [[qty]] لما تبقى 1 (بيحصل كتير عشان يوفّر) |

اخترت **الافتراضي 1** وكتبت له اختبار، بس ده سؤال لازم يتسأل لصاحب الـ API.

- [[Number(r.price)]] و [[Number(r.qty)]] صريحين: حتى لو [[*]] بتحوّل لوحدها، الكود بيقول «أنا عارف إن دي ممكن تبقى نص». ولو جه [[+]] في يوم من الأيام مش هيلزّق.
- الاختبار فيه حالة [['2.5']] (كسر كنص) ومصفوفة فاضية.

**الغلطة الشائعة:** تحط [[|| 0]] على الناتج فيطلع 35 وتكمّل. كده انت اخترت قاعدة «يتجاهل» من غير ما تعرف إنك اخترتها، والرقم اللي هيتعرض للعميل ممكن يبقى ناقص 7.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار الأول:** عدّاد كلمات [[counts[w] = (counts[w] || 0) + 1]] بيطلّع رقم غريب لكلمة واحدة بس في نص إنجليزي طويل. اكتب أصغر اختبار بيعيد الباج قبل ما تصلّح.`, done: R`الاختبار بيفشل على كلمة [[constructor]] (العدد بقى نص بيبدأ بـ [[function Object()]] لأنها صفة موروثة)، وبعد التصليح بـ [[Map]] أو [[Object.create(null)]] بقى بيعدّي والعدد 1، والاختبار فاضل في الملف عشان الباج ميرجعش.`, sol: R`**التصغير قبل الاختبار:** «رقم غريب لكلمة واحدة في نص طويل». بدل ما أدوّر في النص كله، طبعت الكلمات اللي عددها مش رقم ([[typeof counts[w] !== 'number']])، فطلعت كلمة واحدة: [[constructor]]. يعني أصغر نص بيعيد الباج هو الكلمة دي لوحدها.

**الخطوة ١: الاختبار الأول، على الكود البايظ زي ما هو.**

~~~js words.js (البايظ)
// عدّاد كلمات (النسخة اللي فيها الباج)
export function countWords(text) {
  const counts = {};
  for (const w of text.toLowerCase().split(/\s+/).filter(Boolean)) counts[w] = (counts[w] || 0) + 1;
  return counts;
}
~~~

~~~js words.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countWords } from './words.js';

test('كلمة constructor بتتعد 1 (أصغر حالة بتعيد الباج)', () => {
  assert.equal(countWords('constructor').constructor, 1);
});

test('العادي لسه شغال', () => {
  assert.deepEqual(countWords('The cat and the hat'), { the: 2, cat: 1, and: 1, hat: 1 });
});
~~~

~~~text الناتج (node --test words.test.js): أحمر
✖ كلمة constructor بتتعد 1 (أصغر حالة بتعيد الباج) (1.2814ms)
✔ العادي لسه شغال (0.6757ms)
ℹ tests 2
ℹ pass 1
ℹ fail 1
  + actual - expected

  + 'function Object() { [native code] }1'
  - 1
~~~

**ليه الرقم ده؟** [[counts]] object عادي، فبيورث من [[Object.prototype]] خاصية اسمها [[constructor]] قيمتها الدالة [[Object]]. أول مرة الكلمة تظهر، [[counts['constructor']]] مش [[undefined]]، دي دالة، و [[(دالة || 0)]] بترجّع الدالة، و [[دالة + 1]] بتحوّلها لنص وتلزّق [[1]]. ومفيش أي error.

**الخطوة ٢: التصليح، والاختبار هو هو.**

~~~js words.js (المصلّح)
// عدّاد كلمات: Map بدل object، فمفيش مفاتيح موروثة زي constructor
export function countWords(text) {
  const counts = new Map();
  for (const w of text.toLowerCase().split(/\s+/).filter(Boolean)) counts.set(w, (counts.get(w) ?? 0) + 1);
  return Object.fromEntries(counts);   // نفس شكل الناتج القديم، فاللي بيستخدمه مبيتغيّرش
}
~~~

~~~text الناتج: أخضر
✔ كلمة constructor بتتعد 1 (أصغر حالة بتعيد الباج) (0.6948ms)
✔ العادي لسه شغال (0.6349ms)
ℹ tests 2
ℹ pass 2
ℹ fail 0
~~~

- [[new Map()]]: الـ [[Map]] مفيهاش مفاتيح موروثة، فـ [[counts.get('constructor')]] بـ [[undefined]] أول مرة، و [[?? 0]] بتبدأ من صفر.
- [[Object.fromEntries(counts)]] في الآخر: الدالة بترجّع نفس شكل الناتج القديم (object)، فالكود اللي بيستخدمها مااتغيّرش. والـ object الجديد فيه [[constructor]] كخاصية **بتاعته** بقيمة 1، فالاختبار بيعدّي.
- البديل: [[const counts = Object.create(null)]]، object من غير prototype خالص.
- **الاختبار التاني** بيتأكد إن التصليح مكسرش العادي. والاتنين **فاضلين** في الملف: لو حد رجّع object عادي في يوم، الأول هيبقى أحمر تاني.

**الغلطة الشائعة:** تصلّح بـ [[if (w === 'constructor') continue]]. هتعدّي الحالة دي، وبعدين [[__proto__]] تيجي: جرّبتها مرتين في object عادي، والنتيجة إن الكلمة **اختفت خالص** ([[Object.keys]] طلعت فاضية) لأن الكتابة في [[__proto__]] بتتجاهل النص. ولو شلت [[toLowerCase]] في يوم، [[toString]] و [[valueOf]] هيعملوا نفس حكاية [[constructor]]. التصليح الصح بيشيل **السبب** (المفاتيح الموروثة)، مش الكلمة.` },
          ],
          ref: [
            { t: "MDN: typeof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" },
            { t: "MDN: Number() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number" },
            { t: "MDN: NaN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN" },
            { t: "MDN: Number.isNaN()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" },
            { t: "MDN: parseInt()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt" },
            { t: "MDN: console.table()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/table_static" },
          ],
          pre: [{ to: "js/typeof", why: R`أول خطوة في التصغير هي [[typeof]] على كل مدخل` }, { to: "js/number و NaN", why: R`[[NaN]] بيسمّم أي حساب، و [[Number.isNaN]] هو الفحص الصح` }],
          deep: {
            why: R`القراية بتدوّر على اللي **انت فاكر** إنه المشكلة. والتصغير بيوصّلك للي **فعلًا** المشكلة.`,
            how: R`**ليه الأنواع قبل القيم؟** لأن JavaScript بيحوّل الأنواع لوحده من غير ما يزعق:

| التعبير | النتيجة | ليه |
|---|---|---|
| [[0 + '10']] | [["010"]] | [[+]] مع نص بتلزّق، فالصفر بقى نص |
| [['10' - 5]] | **[[5]]** | [[-]] مالهاش معنى للنصوص، فبتحوّل لرقم |
| [[[] + {}]] | [["[object Object]"]] | الاتنين اتحوّلوا لنص ([[""]] و [["[object Object]"]]) |
| [[Number(null)]] | [[0]] | [[null]] بتتحسب صفر في الحساب |
| [[Number(undefined)]] | [[NaN]] | مفتاح ناقص = [[NaN]] بيسمّم المجموع |
| [[Number('')]] | [[0]] | خانة فاضية بتعدّي كصفر |
| [[typeof null]] | [["object"]] | غلطة قديمة في اللغة، اتسابت عشان التوافق |

ولاحظ التناقض: [[+]] بتلزّق النصوص، و [[-]] بتحوّلهم لأرقام. ودي أشهر مصيدة في اللغة.

**و [[NaN]] ليها خاصية خطرة**: أي عملية فيها [[NaN]] بترجّع [[NaN]]. فقيمة واحدة بتسمّم كل حاجة. و [[NaN !== NaN]] — فاستخدم [[Number.isNaN()]] للفحص.

**وطرق التصغير:**

| الطريقة | إمتى |
|---|---|
| [[typeof]] على المدخلات | أول حاجة، دايمًا |
| أصغر سطر بيعيد الباج | عشان تتأكد إنك فهمت |
| **التنصيف (bisect)** | الكود طويل: عطّل النص وشوف |
| [[git bisect]] | «كان شغّال امبارح» |
| [[JSON.stringify]] | يفرّق بين [[35]] و [["35"]] و [[undefined]] |
| [[console.table]] | داتا جدولية: كل صف في سطر وكل مفتاح عمود، فالناقص بيبان فاضي |
| [[debugger]] | تقف وتبص على كل حاجة |

**والبطة المطاطية** مش نكتة: اشرح المشكلة بصوت عالي لحد (أو لحاجة). عملية الشرح بتجبرك تحدد، والتحديد بيكشف.

**وعلامة إنك بتخمّن**: لما تغيّر حاجة وتشغّل من غير ما تتوقّع النتيجة. وقف، واتوقّع الأول، وبعدين شغّل. لو الحقيقة خالفت توقعك، **هناك** المعلومة.`,
            when: R`أول ما تعلق أكتر من ١٥ دقيقة. وقبل ما تنسخ الرسالة في جوجل.`,
            mistakes: R`تقرا الكود بدل ما تشغّله. أو تغيّر حاجات عشوائي وتشوف. أو تطبع القيم من غير الأنواع. أو تستخدم [[x === NaN]] (بترجّع [[false]] دايمًا).`
          },
          teach: R`## الباج: المفروض ٣٥

~~~js
const rows = [{ price: '10' }, { price: '20' }, { price: '5' }];
const bug = rows.reduce((s, r) => s + r.price, 0);
~~~

~~~text اتشغّل فعلًا · Node 24
الفعلي: "010205" | النوع: string
~~~

وأول رد فعل عند الناس: يبصوا في الكود ويقروا. **وده أبطأ طريقة.**

---

## ١. اطبع **الشكل**، مش القيمة

~~~js
rows.map(r => typeof r.price)
~~~

~~~text اتشغّل فعلًا
string, string, string   <-- نصوص مش أرقام
~~~

**في JavaScript، ده نص الباجات.** اللغة بتحوّل الأنواع لوحدها من غير ما تزعق.

---

## ٢. أصغر حالة بتعيد الباج

~~~js
0 + '10'
~~~

~~~text اتشغّل فعلًا
"010"
~~~

**خلاص، لقيته.** مش محتاج تقرا باقي الدالة.

---

## ٣. والإصلاح

~~~js
rows.reduce((s, r) => s + Number(r.price), 0)   // 35
~~~

و Big-O الإصلاح زي الأصل: **O(n)** وقت (مرور واحد) و **O(1)** ذاكرة زيادة (رقم واحد بيتجمع فيه). التصغير مغيّرش الخوارزمية، غيّر النوع بس.

---

## ٤. والحالة الأوجع: مفتاح ناقص

~~~js
const rows2 = [{ price: '10' }, { amount: '20' }, { price: '5' }];
~~~

~~~text اتشغّل فعلًا
Number(undefined) = NaN
المجموع: NaN        <-- NaN واحدة بتسمّم كل حاجة
والحل: 15
~~~

[[NaN]] في أي عملية بترجّع [[NaN]]. فقيمة واحدة ناقصة بتخرّب النتيجة كلها — **من غير أي رسالة خطأ**.

~~~js الحل
rows2.reduce((s, r) => s + (Number(r.price) || 0), 0)   // 15
~~~

> و [[NaN !== NaN]]. فالفحص بـ [[x === NaN]] بيرجّع [[false]] **دايمًا**. استخدم [[Number.isNaN(x)]].

---

## ٥. جدول التحويلات اللي بتوقّع

| التعبير | النتيجة | ليه |
|---|---|---|
| [[0 + '10']] | [["010"]] | [[+]] مع نص بتلزّق، فالصفر بقى نص |
| [['10' - 5]] | **[[5]]** | [[-]] مالهاش معنى للنصوص، فبتحوّل لرقم |
| [[[] + {}]] | [["[object Object]"]] | الاتنين اتحوّلوا لنص ([[""]] و [["[object Object]"]]) |
| [[Number(null)]] | [[0]] | [[null]] بتتحسب صفر في الحساب |
| [[Number(undefined)]] | [[NaN]] | مفتاح ناقص = [[NaN]] بيسمّم المجموع |
| [[Number('')]] | [[0]] | خانة فاضية بتعدّي كصفر |
| [[typeof null]] | [["object"]] | غلطة قديمة في اللغة، اتسابت عشان التوافق |

**لاحظ التناقض:** [[+]] بتلزّق، و [[-]] بتحوّل. ودي أشهر مصيدة في اللغة.

---

## ٦. وطرق التصغير

| الطريقة | إمتى |
|---|---|
| [[typeof]] على المدخلات | **أول حاجة، دايمًا** |
| أصغر سطر بيعيد الباج | تتأكد إنك فهمت |
| **التنصيف**: عطّل نص الكود | الكود طويل |
| [[git bisect]] | «كان شغّال امبارح» |
| [[JSON.stringify]] | يفرّق بين [[35]] و [["35"]] و [[undefined]] |
| [[console.table]] | داتا جدولية: كل صف في سطر وكل مفتاح عمود، فالناقص بيبان فاضي |

---

## ٧. والبطة المطاطية مش نكتة

اشرح المشكلة بصوت عالي — لحد، أو لحاجة.

**عملية الشرح بتجبرك تحدد، والتحديد بيكشف.** وده بيحصل كتير جدًا: الإجابة بتيجي وانت بتشرح، قبل ما حد يرد.

---

## ٨. وعلامة إنك بتخمّن

**لما تغيّر حاجة وتشغّل من غير ما تتوقّع النتيجة.**

وقف. اتوقّع الأول. وبعدين شغّل.

ولو الحقيقة خالفت توقعك — **هناك** المعلومة اللي ناقصاك.

---

## الخلاصة

- الأنواع قبل القيم.
- أصغر سطر بيعيد الباج.
- [[JSON.stringify]] بتكشف [[35]] مقابل [["35"]].
- [[NaN]] بتسمّم، و [[Number.isNaN]] للفحص.
- اتوقّع قبل ما تشغّل.`,
          sol: R`الباج بناتجه الحقيقي، والأربع خطوات، والحالة الأوجع.`,
          solCode: R`const rows = [{ price:'10' }, { price:'20' }, { price:'5' }];
rows.reduce((s, r) => s + r.price, 0);
// "010205"  |  النوع: string        <-- المفروض 35

rows.map(r => typeof r.price);
// string, string, string            <-- ١) الأنواع

0 + '10';
// "010"                             <-- ٢) أصغر حالة

rows.reduce((s, r) => s + Number(r.price), 0);
// 35                                <-- ٣) الإصلاح

// والحالة الأوجع: مفتاح ناقص
const rows2 = [{ price:'10' }, { amount:'20' }, { price:'5' }];
Number(undefined);                                        // NaN
rows2.reduce((s, r) => s + Number(r.price), 0);           // NaN
rows2.reduce((s, r) => s + (Number(r.price) || 0), 0);    // 15

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "اختار التركيبة الصح",
          title: "مئات الأضعاف — الفرق مش رأي",
          learn: R`تختار بين مصفوفة و Set و Map و object بناءً على العملية اللي بتتكرر.`,
          out: R`كودك بيفضل سريع لما الداتا تكبر.`,
          use: {
            prog: R`[[.includes()]] جوه [[.map()]] أشهر سبب لبطء مفاجئ. وبتبقى سريعة على ١٠٠ عنصر وبتقع على ١٠٠ ألف.`,
            cs: R`المصفوفة بتدوّر عنصر عنصر (O(n))، والـ Set/Map بتحسب مكان المفتاح مباشرة (O(1) متوسطًا). والفرق بيكبر مع حجم الداتا.`,
            work: R`الكود اللي اشتغل على بيانات تجربة وبقى بطيء على بيانات حقيقية — السبب ده في أغلب الحالات.`,
          },
          desc: R`أربع تراكيب بتستخدمها في JavaScript، والاختيار بينهم مش ذوق.

**السؤال الوحيد: إيه العملية اللي بتتكرر؟**

| محتاج | استخدم |
|---|---|
| ترتيب، وتكرار على الكل | **Array** |
| «هل العنصر ده موجود؟» | **Set** |
| «هات القيمة بتاعة المفتاح ده» | **Map** أو object |
| مفاتيح مش نصوص، أو ترتيب مضمون | **Map** |

**والفرق مقيس:** دوّرت على ١٠٠٠ عنصر × ٢٠ مرة، في مجموعة فيها ٥٠ ألف:

| الطريقة | الوقت | Big-O للبحث الواحد |
|---|---|---|
| [[arr.includes]] | **٩٠٨.٦ ms** | O(n): بتمشي عنصر عنصر |
| [[set.has]] | ٢.٥ ms | O(1) في المتوسط: hash |
| [[obj[key] ]] | ١.٣ ms | O(1) في المتوسط: hash |
| [[map.get]] | ١.٧ ms | O(1) في المتوسط: hash |

**مئات الأضعاف.** والنسبة بتختلف من تشغيلة لتشغيلة ومن جهاز لجهاز (قِستها مرة ٨٠٠ ومرة ٣٥٩)، بس **المرتبة** واحدة: ميلي ثانية واحدة مقابل تقريبًا ثانية.

والسبب إن [[includes]] بتمشي على العناصر واحد واحد لحد ما تلاقي. ومع ٥٠ ألف عنصر، دي ٢٥ ألف مقارنة في المتوسط لكل بحث. والـ [[Set]] بتحسب مكان المفتاح مباشرة.

**وأشهر شكل للمشكلة دي:**

[[users.filter(u => bannedIds.includes(u.id))]]

دي لوب جوه لوب. ولو الاتنين ١٠ آلاف، دي ١٠٠ مليون مقارنة. والحل سطر واحد: [[const banned = new Set(bannedIds)]].

**و Map مقابل object:** الـ object مفاتيحه نصوص بس (أو symbols)، وفيه مفاتيح موروثة من الـ prototype. والـ Map بتاخد **أي حاجة** كمفتاح، وبتحافظ على ترتيب الإضافة، وليها [[.size]].`,
          example: R`const N = 50_000;
const ids = Array.from({ length: N }, (_, i) => 'u' + i);

const arr = ids.slice();
const set = new Set(ids);
const obj = Object.fromEntries(ids.map(id => [id, true]));
const map = new Map(ids.map(id => [id, true]));

// دوّر على 1000 عنصر × 20 مرة
arr.includes(p);   // 908.6 ms
set.has(p);        //   2.5 ms
obj[p];            //   1.3 ms
map.get(p);        //   1.7 ms

// وأشهر شكل للمشكلة
users.filter(u => bannedIds.includes(u.id));        // لوب جوه لوب
const banned = new Set(bannedIds);
users.filter(u => banned.has(u.id));                 // سطر واحد`,
          lines: [
            R`عدد العناصر اللي هنجرّب عليها: ٥٠ ألف. الـ [[_]] في الرقم فاصل للقراية بس وJS بتتجاهله. الفرق بين التراكيب مبيبانش على ١٠ عناصر، بيبان لما الداتا تكبر.`,
            R`[[Array.from]] بـ [[length]] بتعمل array بالطول ده، والدالة بتدّي كل مكان قيمته: [[u0]] و [[u1]]… لحد [[u49999]]. دي المفاتيح اللي هندوّر عليها.`,
            R`نسخة من نفس الـ ids في array عادية. هنحط نفس الداتا في أربع تراكيب ونقارن سرعة البحث فيهم.`,
            R`[[Set]] بنفس الـ ids. الـ [[Set]] مناسب لما السؤال «موجود ولا لأ؟» من غير قيمة مرتبطة.`,
            R`object عادي كل id فيه مفتاح وقيمته [[true]]. [[Object.fromEntries]] بتحوّل array أزواج لـ object. ده الأسلوب القديم قبل [[Map]]، ومناسب لما المفتاح نص وعايز تربطه بقيمة.`,
            R`[[Map]] بنفس الأزواج. زي الـ object في الربط، بس مفاتيحه ممكن تبقى أي نوع (حتى objects)، وفيها [[size]]، ومفيش خطر مفاتيح موروثة زي [["constructor"]].`,
            R`البحث في الـ array بـ [[includes]] بيمشي عنصر عنصر من الأول، فكل بحث ممكن يعدّي على الـ ٥٠ ألف. لما كررناه آلاف المرات خد حوالي ٩٠٠ms (الأرقام اتقاست على جهاز واحد، المهم النسبة بينهم).`,
            R`[[Set]] بيحسب مكان القيمة من الـ hash بتاعها ويروح له على طول، فالبحث وقته شبه ثابت مهما الـ [[Set]] كبرت. نفس الشغل خد ٢.٥ms، يعني أسرع بمئات المرات.`,
            R`القراية من object بالمفتاح برضه بتروح للمكان على طول، والأسرع في القياس ده (١.٣ms). بيرجّع [[true]] أو [[undefined]] لو المفتاح مش موجود.`,
            R`[[Map]] قريب جدًا من الـ object (١.٧ms). الفرق بين التلاتة دول صغير ومتغيّر من جهاز لجهاز؛ الفرق الحقيقي بينهم وبين الـ array.`,
            R`**أشهر شكل للمشكلة**: [[includes]] جوه [[filter]] = لوب جوه لوب. لكل يوزر بنلف على كل الـ banned، فـ ١٠ آلاف يوزر مع ١٠ آلاف banned ممكن يوصلوا لـ ١٠٠ مليون مقارنة.`,
            R`والحل: حوّل القايمة لـ [[Set]] **مرة واحدة** قبل اللوب. التحويل نفسه لفة واحدة على الـ banned، ومش جوه الـ [[filter]] عشان ميتعادش لكل يوزر.`,
            R`وبعدها [[has]] بدل [[includes]]: كل سؤال بقى خطوة واحدة تقريبًا، فالشغل كله بقى لفة واحدة على اليوزرز. نفس الناتج بالظبط بس أسرع بكتير لما الداتا تكبر.`
          ],
          try: R`دوّر في مشروعك على [[.includes(]] أو [[.find(]] **جوه** [[.map(]] أو [[.filter(]]. لو لقيت واحدة والداتا بتكبر، حوّلها لـ [[Set]] أو [[Map]] وقيس الفرق بـ [[console.time]].`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** [[const arr = Array.from({ length: 20000 }, (_, i) => 'k' + (i % 5000))]]. شيل التكرار مرة بـ [[arr.filter((x, i) => arr.indexOf(x) === i)]] ومرة بـ [[new Set(arr)]]، وقيس الاتنين بـ [[console.time]].`, done: R`الطريقتين طلّعوا 5000 عنصر، و [[Set]] أسرع بكتير (الرقمين مكتوبين)، وكاتب ليه: [[indexOf]] بتمشي على المصفوفة من الأول لكل عنصر.`, sol: R`~~~js unique.mjs
const arr = Array.from({ length: 20000 }, (_, i) => 'k' + (i % 5000));

console.time('filter + indexOf');
const a = arr.filter((x, i) => arr.indexOf(x) === i);
console.timeEnd('filter + indexOf');

console.time('new Set');
const b = [...new Set(arr)];
console.timeEnd('new Set');

console.log('العدد:', a.length, b.length, '| نفس الترتيب:', a.every((x, i) => x === b[i]));
~~~

~~~text الناتج (node unique.mjs، تشغيلتين)
filter + indexOf: 91.081ms
new Set: 1.509ms
العدد: 5000 5000 | نفس الترتيب: true
filter + indexOf: 90.613ms
new Set: 1.47ms
العدد: 5000 5000 | نفس الترتيب: true
~~~

**حوالي ٦٠ ضعف** على ٢٠ ألف عنصر، والناتج واحد بالظبط (العدد والترتيب).

**ليه:**

- **[[arr.indexOf(x)]]** بتدوّر من أول المصفوفة لحد ما تلاقي [[x]]. وبتتنادى مرة لكل عنصر من الـ 20000. القيم بتتكرر كل 5000، فكل بحث بيمشي لحد 5000 خطوة على الأكتر (حوالي 2500 في المتوسط)، يعني عشرات الملايين من المقارنات. ده O(n × k): n عدد العناصر و k عدد القيم المختلفة.
- **[[new Set(arr)]]** بيلف مرة واحدة، وكل إضافة بتحسب مكان القيمة بالـ hash، والمكرر مبيتضافش تاني. يعني حوالي 20000 خطوة: O(n).
- **[[...new Set(arr)]] جوه قوسين مصفوفة** بيرجّعها مصفوفة. والـ [[Set]] بيحفظ ترتيب أول ظهور، فالناتج زي الطريقة الأولى بالظبط، وده اللي [[every]] أثبته.
- [[console.time]] و [[console.timeEnd]] بنفس الاسم: بيطبع الوقت بين الاتنين.

**الغلطة الشائعة:** تقيس على ٢٠ عنصر وتقول «الاتنين نفس السرعة». الفرق مبيبانش غير لما الداتا تكبر، لأن واحدة بتكبر خطي والتانية بتكبر أسرع بكتير. قيس على حجم قريب من الحقيقي.` },
            { lvl: 'تطبيق', t: R`**refactor:** [[orders.map(o => ({ ...o, user: users.find(u => u.id === o.userId) }))]] على 20 ألف طلب و 20 ألف يوزر. حوّلها لـ [[Map]] من غير ما يتغيّر الناتج.`, done: R`[[assert.deepStrictEqual]] بين الناتج القديم والجديد بيعدّي، والنسخة الجديدة أسرع بفرق كبير (الوقتين مكتوبين)، والـ [[Map]] بتتبني مرة واحدة برا الـ [[map]].`, sol: R`**التفكير:** العملية اللي بتتكرر ٢٠ ألف مرة هي «هات اليوزر اللي الـ id بتاعه كذا». ده سؤال «قيمة المفتاح»، فالتركيبة الصح [[Map]] من الـ id لليوزر. والشرط: الناتج **ميتغيّرش**، فـ [[assert.deepStrictEqual]] بين القديم والجديد.

~~~js join.mjs
import assert from 'node:assert/strict';

const users = Array.from({ length: 20000 }, (_, i) => ({ id: 'u' + i, name: 'يوزر ' + i }));
const orders = Array.from({ length: 20000 }, (_, i) => ({ id: 'o' + i, userId: 'u' + ((i * 7919) % 20000), total: i % 500 }));

// قبل: find جوه map = لكل طلب، لف على اليوزرز
console.time('قبل: find جوه map');
const before = orders.map(o => ({ ...o, user: users.find(u => u.id === o.userId) }));
console.timeEnd('قبل: find جوه map');

// بعد: Map بتتبني مرة واحدة برا الـ map
console.time('بعد: Map');
const byId = new Map(users.map(u => [u.id, u]));
const after = orders.map(o => ({ ...o, user: byId.get(o.userId) }));
console.timeEnd('بعد: Map');

assert.deepStrictEqual(after, before);
console.log('الناتج متطابق ✔ | مثال:', JSON.stringify(after[1]));
~~~

~~~text الناتج (node join.mjs)
قبل: find جوه map: 1.125s
بعد: Map: 5.005ms
الناتج متطابق ✔ | مثال: {"id":"o1","userId":"u7919","total":1,"user":{"id":"u7919","name":"يوزر 7919"}}
~~~

**من ١.١ ثانية لـ ٥ ملي ثانية** (أكتر من ٢٠٠ ضعف)، والناتج متطابق.

**اللي اتغيّر:**

- [[new Map(users.map(u => [u.id, u]))]]: لفة واحدة على اليوزرز بتعمل أزواج (الـ id واليوزر) والـ [[Map]] بتاخدهم. ده O(m).
- [[byId.get(o.userId)]]: بدل [[find]] اللي بتلف لحد ما تلاقي (في المتوسط ١٠ آلاف مقارنة)، [[get]] بتروح للمكان على طول. فالكل بقى O(n + m) بدل O(n × m).
- **اليوزر اللي مش موجود:** [[find]] بترجّع [[undefined]] و [[get]] كمان بترجّع [[undefined]]، فالسلوك في الحالة دي هو هو. وده من أسباب إن [[deepStrictEqual]] عدّى.
- [[(i * 7919) % 20000]]: عشان الطلبات تشاور على يوزرز متلخبطين مش بالترتيب (لو بالترتيب، [[find]] كانت هتلاقي بدري وكان القياس هيكدب).

**الغلطة اللي جرّبتها: الـ [[Map]] جوه الـ [[map]].**

~~~js join-mistake.mjs
const users = Array.from({ length: 20000 }, (_, i) => ({ id: 'u' + i, name: 'يوزر ' + i }));
const orders = Array.from({ length: 2000 }, (_, i) => ({ id: 'o' + i, userId: 'u' + ((i * 7919) % 20000) }));

// ❌ الـ Map بتتبني جوه الـ map: مرة لكل طلب (2000 طلب بس هنا، مش 20000)
console.time('Map جوه الـ map (2000 طلب)');
orders.map(o => ({ ...o, user: new Map(users.map(u => [u.id, u])).get(o.userId) }));
console.timeEnd('Map جوه الـ map (2000 طلب)');
~~~

~~~text الناتج
Map جوه الـ map (2000 طلب): 3.571s
~~~

٣.٦ ثانية على **عُشر** الطلبات بس، أبطأ من [[find]] نفسها. لأن كل طلب بيبني [[Map]] جديدة من الـ ٢٠ ألف يوزر وبيرميها. القاعدة: التركيبة تتبني **مرة واحدة برا اللوب**.` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[lruCache(limit)]] بـ [[Map]]: [[get]] بيحرّك المفتاح للآخر، و [[set]] لو الحجم عدّى [[limit]] بيشيل أقدم مفتاح ([[map.keys().next().value]]).`, done: R`مع [[limit]] بـ 2: [[set('a')]] و [[set('b')]] و [[get('a')]] و [[set('c')]] يبقى [[b]] اتشال والمفاتيح بالترتيب [[a]] ثم [[c]]، و [[get]] لمفتاح مش موجود بترجّع [[undefined]] ومبتغيّرش الترتيب، و [[set]] لمفتاح موجود مبيزوّدش الحجم.`, sol: R`**التفكير:** محتاجين حاجتين بسرعة: «هات قيمة المفتاح» و «مين الأقدم». الـ [[Map]] بتعمل الاتنين: [[get]] بالمفتاح، وبتحفظ **ترتيب الإضافة**، فأول مفتاح فيها هو الأقدم. و «استخدمته دلوقتي» = شيله وحطه تاني فيروح للآخر.

~~~js lru.js
// lruCache(limit): لما يتملي، اللي اتستخدم من أطول وقت هو اللي بيطلع
export function lruCache(limit) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('limit لازم رقم صحيح 1 أو أكتر');
  const map = new Map();                       // الـ Map بتحفظ ترتيب الإضافة: الأول = الأقدم
  return {
    get(key) {
      if (!map.has(key)) return undefined;     // مش موجود: متغيّرش الترتيب
      const value = map.get(key);
      map.delete(key);                         // شيله وحطه تاني = بقى الأحدث
      map.set(key, value);
      return value;
    },
    set(key, value) {
      if (map.has(key)) map.delete(key);       // موجود: تحديث، والحجم مبيزيدش
      map.set(key, value);
      if (map.size > limit) map.delete(map.keys().next().value);   // أقدم مفتاح
      return this;
    },
    keys: () => [...map.keys()],
    get size() { return map.size; },
  };
}
~~~

~~~js lru.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lruCache } from './lru.js';

test('get بيحرّك للآخر، والزيادة بتشيل الأقدم', () => {
  const c = lruCache(2);
  c.set('a', 1).set('b', 2);
  assert.equal(c.get('a'), 1);                 // a بقى الأحدث
  c.set('c', 3);                               // الحجم 3 > 2: الأقدم (b) يطلع
  assert.deepEqual(c.keys(), ['a', 'c']);
  assert.equal(c.get('b'), undefined);
});

test('get لمفتاح مش موجود: undefined ومبيغيّرش الترتيب', () => {
  const c = lruCache(2);
  c.set('a', 1).set('b', 2);
  assert.equal(c.get('zzz'), undefined);
  assert.deepEqual(c.keys(), ['a', 'b']);
});

test('set لمفتاح موجود: القيمة اتحدّثت والحجم هو هو', () => {
  const c = lruCache(2);
  c.set('a', 1).set('b', 2).set('a', 10);
  assert.equal(c.size, 2);
  assert.deepEqual(c.keys(), ['b', 'a']);
  assert.equal(c.get('a'), 10);
});

test('قيمة undefined محفوظة بتتفرق عن «مش موجود»', () => {
  const c = lruCache(2);
  c.set('x', undefined).set('y', 1);
  c.get('x');                                  // لازم يحرّك x للآخر رغم إن قيمته undefined
  assert.deepEqual(c.keys(), ['y', 'x']);
});
~~~

~~~text الناتج (node --test lru.test.js)
✔ get بيحرّك للآخر، والزيادة بتشيل الأقدم (1.1951ms)
✔ get لمفتاح مش موجود: undefined ومبيغيّرش الترتيب (0.6002ms)
✔ set لمفتاح موجود: القيمة اتحدّثت والحجم هو هو (0.1423ms)
✔ قيمة undefined محفوظة بتتفرق عن «مش موجود» (0.1271ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~

**السيناريو اللي في التمرين خطوة خطوة** (أول اختبار):

~~~text
set('a')  -> [a]
set('b')  -> [a, b]
get('a')  -> [b, a]      a اتشال واتحط في الآخر
set('c')  -> [b, a, c]   الحجم 3 > 2
          -> [a, c]      أقدم واحد (b) طلع
~~~

**الحتت المهمة:**

- [[map.keys().next().value]]: [[keys()]] بترجّع iterator بالترتيب، و [[next()]] بتاخد أول عنصر بس من غير ما تلف على الكل. يعني شيل الأقدم O(1).
- **[[map.delete]] ثم [[map.set]]** في [[get]]: [[set]] لمفتاح موجود **مبيغيّرش مكانه** في الترتيب، فلازم تمسح الأول عشان يروح للآخر.
- **نفس الحكاية في [[set]]** لمفتاح موجود: تمسحه وترجّعه، فبيبقى الأحدث والحجم مبيزيدش.
- [[return this]] في [[set]]: عشان [[c.set('a', 1).set('b', 2)]] تتكتب في سطر.
- [[get size()]]: getter بيقرا الحجم الحالي.

**الغلطة اللي جرّبتها:** كتبت [[get]] بـ [[const v = map.get(key); if (v === undefined) return undefined;]] بدل [[map.has(key)]]. الاختبار الرابع مسكها:

~~~text
✖ قيمة undefined محفوظة بتتفرق عن «مش موجود» (0.9758ms)
  + actual - expected
    [
  +   'x',
      'y',
  -   'x'
    ]
~~~

المفتاح [[x]] موجود وقيمته [[undefined]]، فالنسخة الغلط افتكرته مش موجود ومحرّكتهوش، وبقى أول واحد هيطلع رغم إنه لسه متستخدم. [[has]] بتسأل «المفتاح موجود؟» مش «القيمة مش undefined؟».` },
          ],
          ref: [
            { t: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
            { t: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" },
            { t: "MDN: Array.prototype.includes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes" },
            { t: "MDN: Object.create()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create" },
            { t: "MDN: WeakMap", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap" },
            { t: "MDN: console.time()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/time_static" },
          ],
          pre: [{ to: "js/Map و Set", why: R`الدرس بيقارن [[Map]] و [[Set]] بالمصفوفة والـ object، فلازم تعرف الـ API بتاعهم الأول` }],
          deep: {
            why: R`الكود اللي بيشتغل على ١٠٠ صف وبيقع على ١٠٠ ألف مش «محتاج سيرفر أقوى» — محتاج تركيبة صح. والفرق بمئات الأضعاف مش تحسين صغير.`,
            how: R`**ليه المصفوفة بطيئة في البحث؟** [[includes]] و [[indexOf]] و [[find]] بيمشوا عنصر عنصر. ومع [[n]] عنصر، المتوسط [[n/2]] مقارنة. ودي **O(n)**.

و [[Set]] و [[Map]] بيستخدموا hash table: بيحسبوا من المفتاح مكان مباشرة. ودي **O(1)** في المتوسط.

**ولوب جوه لوب = O(n×m).** مع ١٠ آلاف × ١٠ آلاف = ١٠٠ مليون. وتحويل القايمة الداخلية لـ [[Set]] بيخليها **O(n+m)** = ٢٠ ألف.

**Map مقابل object:**

| | object | Map |
|---|---|---|
| المفاتيح | نصوص و symbols بس | **أي حاجة** (حتى كائنات) |
| الترتيب | معقد (الأرقام بتترتّب الأول) | **ترتيب الإضافة** |
| الحجم | [[Object.keys(o).length]] | [[map.size]] |
| مفاتيح موروثة | **أيوه** — [[toString]] و غيرها | لأ |
| JSON | مباشرة | محتاج تحويل |

ومصيدة الـ object: [[{}['toString']]] بترجّع دالة، مش [[undefined]]. فلو بتعد كلمات والكلمة [[toString]] جت، هتلاقي حاجة غريبة. و [[Object.create(null)]] بتعمل object من غير prototype، أو استخدم [[Map]].

**وتراكيب تانية تستاهل:**

[[WeakMap]] / [[WeakSet]]: المفاتيح كائنات، ومش بتمنع الـ garbage collector. مفيدة لربط بيانات بكائنات من غير تسريب ذاكرة.

**ومتى المصفوفة أحسن؟** لما العملية المتكررة هي **التكرار على الكل** أو **الترتيب**. [[map]] و [[filter]] و [[sort]] على مصفوفة أسرع وأوضح من أي تركيبة تانية.

**والقاعدة:** اسأل «إيه العملية اللي هتتكرر آلاف المرات؟» واختار على أساسها. وتحويل التركيبة **مرة واحدة** قبل اللوب تقريبًا دايمًا بيكسب.`,
            when: R`أي لوب جوه لوب. وأي بحث بيتكرر. وقبل ما تفترض إن الكود «بطيء بطبيعته».`,
            mistakes: R`[[includes]] جوه [[filter]]. أو تحوّل لـ [[Set]] **جوه** اللوب (بتلغي الفايدة). أو تستخدم object كقاموس من غير [[Object.create(null)]] وتتفاجئ بـ [[toString]]. أو تقارن بـ [[===]] على كائنات في [[Set]] (بتقارن بالمرجع مش بالمحتوى).`
          },
          teach: R`## السؤال الوحيد: إيه العملية اللي بتتكرر؟

| محتاج | استخدم |
|---|---|
| ترتيب، وتكرار على الكل | **Array** |
| «هل ده موجود؟» | **Set** |
| «هات قيمة المفتاح ده» | **Map** أو object |
| مفاتيح مش نصوص، أو ترتيب مضمون | **Map** |

---

## ١. والفرق مقيس

بحث عن ١٠٠٠ عنصر × ٢٠ مرة، في مجموعة فيها **٥٠ ألف**:

~~~text اتشغّل فعلًا · Node 24
arr.includes  908.6 ms
set.has         2.5 ms
obj[k]          1.3 ms
map.get         1.7 ms

الفرق: 359x
~~~

**مئات الأضعاف.** ثانية تقريبًا مقابل ٢ ميلي ثانية.

> النسبة نفسها بتتغير كل تشغيلة (قِستها مرة ٣٥٩ ومرة ٨٠٠). متحفظش الرقم — احفظ **المرتبة**: المصفوفة بتمشي على الكل، والـ Set بتوصل على طول.

**ليه؟** [[includes]] بتمشي عنصر عنصر — ٢٥ ألف مقارنة في المتوسط لكل بحث. و [[Set]] بتحسب مكان المفتاح مباشرة.

---

## ٢. وأشهر شكل للمشكلة

~~~js لوب جوه لوب
users.filter(u => bannedIds.includes(u.id));
~~~

لو الاتنين ١٠ آلاف → **١٠٠ مليون مقارنة**.

~~~js والحل سطر واحد
const banned = new Set(bannedIds);
users.filter(u => banned.has(u.id));
~~~

→ **٢٠ ألف**.

> **بس خد بالك:** حوّل لـ [[Set]] **قبل** اللوب. لو حوّلت جواها، بتعمل Set جديد كل مرة والفايدة بتروح.

---

## ٣. Map مقابل object

| | object | Map |
|---|---|---|
| المفاتيح | نصوص و symbols بس | **أي حاجة** — حتى كائنات |
| الترتيب | معقد (الأرقام الأول) | **ترتيب الإضافة** |
| الحجم | [[Object.keys(o).length]] | [[map.size]] |
| مفاتيح موروثة | **أيوه** | لأ |
| JSON | مباشرة | محتاج تحويل |

### ومصيدة الـ object

~~~js
const counts = {};
counts['toString']            // ليست undefined — دي دالة موروثة!
~~~

فلو بتعد كلمات وجت كلمة [[toString]] أو [[constructor]]، هتلاقي حاجة غريبة.

~~~js الحل
const counts = Object.create(null);   // من غير prototype
// أو ببساطة
const counts = new Map();
~~~

---

## ٤. ومتى المصفوفة **أحسن**؟

لما العملية المتكررة هي **التكرار على الكل** أو **الترتيب**.

[[map]] و [[filter]] و [[sort]] على مصفوفة أسرع وأوضح من أي تركيبة تانية. المصفوفة مش «بطيئة» — هي بطيئة في **البحث** بس.

---

## ٥. و [[WeakMap]] للحالة الخاصة

مفاتيحها **كائنات**، ومش بتمنع الـ garbage collector من إنه ينضّفها.

~~~js تربط بيانات بكائن من غير تسريب ذاكرة
const meta = new WeakMap();
meta.set(domNode, { clicks: 0 });
// لما الـ node يتشال من الصفحة، البيانات بتتنضّف لوحدها
~~~

---

## ٦. القاعدة

~~~text
اسأل: إيه العملية اللي هتتكرر آلاف المرات؟
   ↓
اختار على أساسها
   ↓
وحوّل التركيبة مرة واحدة قبل اللوب
~~~

التحويل **مرة واحدة** تقريبًا دايمًا بيكسب، حتى لو شكله شغل زيادة.

---

## الخلاصة

- مئات الأضعاف بين [[includes]] و [[has]] — مش رأي.
- [[includes]] جوه [[filter]] = لوب جوه لوب.
- حوّل لـ [[Set]] **قبل** اللوب مش جواها.
- object بيورث [[toString]] — استخدم [[Map]] أو [[Object.create(null)]].
- المصفوفة أحسن للتكرار والترتيب.`,
          sol: R`القياس الحقيقي — والفرق بمئات الأضعاف. والنسبة بتتغير كل تشغيلة، بس المرتبة ثابتة.`,
          solCode: R`const N = 50_000;
const ids = Array.from({length:N}, (_,i) => 'u' + i);
const arr = ids.slice(), set = new Set(ids);
const obj = Object.fromEntries(ids.map(id => [id,true]));
const map = new Map(ids.map(id => [id,true]));
// بحث عن 1000 عنصر × 20 مرة:

// الناتج (اتشغّل فعلًا على Node 24.22.1):
//   arr.includes  908.6 ms    O(n) لكل بحث -> O(q × n) للكل
//   set.has         2.5 ms    O(1) متوسط  -> O(q + n) مع بناء الـ Set
//   obj[k]          1.3 ms    O(1) متوسط
//   map.get         1.7 ms    O(1) متوسط
//   الفرق: 359x   (وفي تشغيلة تانية 800x — المرتبة هي الثابت)

// وأشهر شكل للمشكلة:
users.filter(u => bannedIds.includes(u.id));   // O(n×m)
// والحل:
const banned = new Set(bannedIds);
users.filter(u => banned.has(u.id));            // O(n+m)`
        }
      ]
    }
]);
