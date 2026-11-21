// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ objects",
      l: 1,
      n: "تبني objects وتقرا منها وتنسخها وتلف عليها، و Map و Set و JSON، وليه التعديل في مكان بيظهر في مكان تاني",
      pre: [
        { to: "js/function و arrow", why: R`كل تمرين ومشروع هنا دالة بتاخد object وترجّع object، والـ methods جوه الـ object دوال`},
        { to: "js/map و filter و reduce", why: R`[[Object.entries]] بترجّع array، والشغل كله بعدها [[map]] و [[filter]] و [[reduce]]`},
        { to: "js/array destructuring و spread", why: R`نفس الـ [[...]] والفك اللي اتعلمته على الـ arrays، هنا على الـ objects`},
        { to: "js/primitives و objects", why: R`الفرق بين القيمة والـ reference هو أساس درس «reference و copy»`},
      ],
      projects: [
        { lvl: 'صغير', t: R`كارت منتج في الـ console`, what: R`object لمنتج فيه اسم وسعر ومفتاح [["in-stock"]] وخصم ممكن يبقى موجود أو لأ، و method [[describe()]] بتطبع جملة فيها السعر بعد الخصم لو فيه. من درس object literal: الأقواس والـ shorthand و [[?.]].`, done: R`مع خصم ومن غير خصم [[describe()]] بتطلع جملة صح ومفيش TypeError، ولو [[in-stock]] بـ [[false]] الجملة بتقول «خلصان».`, sol: R`## الشكل النهائي

~~~text الناتج: node product.js (Node 24)
Mug: 90 جنيه بدل 120 (خصم 25%)
Cap: 90 جنيه
Shirt: خلصان دلوقتي
undefined true
~~~

## هتشوف إيه

٣ منتجات: واحد عليه خصم بيطلع بسعرين، وواحد من غير خصم بسعره بس، وواحد خلصان عليه خصم بس الجملة بتقول «خلصان» من غير ما تحسب حاجة. وآخر سطر بيثبت إن قراية [[discount?.percent]] على منتج مالوش خصم بترجّع [[undefined]] مش error.

## الكود

~~~js product.js
function makeProduct({ name, price, inStock = true, discount }) {
  return {
    name,
    price,
    "in-stock": inStock,
    discount,
    finalPrice() {
      const pct = this.discount?.percent ?? 0;
      return Math.round(this.price * (100 - pct)) / 100;
    },
    describe() {
      if (!this["in-stock"]) return $__bt$__{this.name}: خلصان دلوقتي$__bt;
      const pct = this.discount?.percent;
      if (pct) return $__bt$__{this.name}: $__{this.finalPrice()} جنيه بدل $__{this.price} (خصم $__{pct}%)$__bt;
      return $__bt$__{this.name}: $__{this.price} جنيه$__bt;
    },
  };
}

const mug = makeProduct({ name: "Mug", price: 120, discount: { percent: 25 } });
const cap = makeProduct({ name: "Cap", price: 90 });
const shirt = makeProduct({ name: "Shirt", price: 300, inStock: false, discount: { percent: 10 } });

for (const p of [mug, cap, shirt]) console.log(p.describe());
console.log(cap.discount?.percent, cap["in-stock"]);
~~~

## كل حتة بتعمل إيه

- **[[makeProduct({ name, price, inStock = true, discount })]]:** الدالة بتاخد object واحد وبتفكه في الـ parameters (destructuring)، فالترتيب مش مهم والـ default بتاع [[inStock]] بيشتغل لو مبعتوش.
- **[[name, price,]]:** الـ shorthand من درس object literal.
- **[["in-stock": inStock]]:** المفتاح فيه شرطة، فبين علامات تنصيص، وبيتقري بالأقواس بس: [[this["in-stock"]]].
- **[[this.discount?.percent ?? 0]]:** الخصم ممكن يبقى مش موجود. [[?.]] بيوقف لو [[discount]] بـ [[undefined]]، و [[??]] بيحط 0 مكانه. من غيرهم [[cap.describe()]] كانت هتقع بـ [[TypeError: Cannot read properties of undefined (reading 'percent')]].
- **[[Math.round(this.price * (100 - pct)) / 100]]:** السعر بعد الخصم مقرّب لأقرب قرش. [[120 * 0.75]] هنا بتطلع 90 بالظبط، بس [[0.1 * 3]] بتطلع [[0.30000000000000004]]، فالحساب بالقروش وبعدين القسمة أأمن.
- **[[describe()]]:** method بالشكل المختصر عشان [[this]] يبقى المنتج نفسه. أول شرط «خلصان» قبل حساب الخصم، فالمنتج الخلصان مبيعرضش سعر.

## الغلطات اللي حصلت وإزاي اتصلحت

- **جرّبنا [[describe: () => ...]]** (arrow) بدل الشكل المختصر، فطلعت كل الجمل «undefined: خلصان دلوقتي»، حتى للمنتج المتاح: الـ arrow مالهاش [[this]] بتاعها، فـ [[this]] بقى بتاع الملف كله (object فاضي)، و [[this["in-stock"]]] بـ [[undefined]] يعني falsy. اتصلحت بالشكل المختصر [[describe() {}]].
- **[[this.in-stock]]** بتطلّع [[ReferenceError: stock is not defined]] (نفس تمرين [[phone]] في درس object literal). لازم [[this["in-stock"]]].

## اتقاس

اتشغّل بـ Node 24: الحالات التلاتة (خصم، من غير خصم، خلصان) بتطلع الجمل اللي فوق، ومفيش ولا [[TypeError]].` },
        { lvl: 'صغير', t: R`منظّف لستة الإيميلات`, what: R`دالة بتاخد array إيميلات فيها تكرار ومسافات وحروف كبيرة ([[" A@x.com"]] و [["a@x.com"]])، وترجّع array نضيفة من غير تكرار بـ [[trim]] و [[toLowerCase]] و Set. من درس Map و Set.`, done: R`[[[" A@x.com", "a@x.com", "b@x.com "] ]] بترجّع [[[ 'a@x.com', 'b@x.com' ] ]]، و array فاضية بترجّع array فاضية.`, sol: R`## الشكل النهائي

~~~text الناتج: node clean-emails.js (Node 24)
[ 'a@x.com', 'b@x.com' ]
[]
[ 'mona@site.org', 'omar@site.org' ]
~~~

## هتشوف إيه

السطر الأول هو حالة الـ [[done]] بالظبط: ٣ إيميلات فيهم مسافات وحروف كبيرة طلعوا اتنين. التاني array فاضية رجعت فاضية. والتالت حالات من الحياة: نص كله مسافات اتشال، و [["\n"]] في آخر إيميل متنسخ من ملف اتشال، والحروف الكبيرة في الدومين اتوحّدت.

## الكود

~~~js clean-emails.js
function cleanEmails(list) {
  const cleaned = list
    .map((e) => String(e).trim().toLowerCase())
    .filter((e) => e !== "");
  return [...new Set(cleaned)];
}

console.log(cleanEmails([" A@x.com", "a@x.com", "b@x.com "]));
console.log(cleanEmails([]));
console.log(cleanEmails(["  ", "Mona@Site.org", "mona@site.org\n", "omar@site.org"]));
~~~

## كل حتة بتعمل إيه

1. **[[String(e)]]:** لو اللستة جاية من فورم أو ملف وفيها رقم أو [[null]]، [[trim]] هتقع عليه. [[String]] بتضمن إنه نص.
2. **[[.trim()]]:** بتشيل المسافات والـ tabs والـ [["\n"]] من الأول والآخر، مش من النص.
3. **[[.toLowerCase()]]:** الإيميل مبيفرّقش بين الحروف الكبيرة والصغيرة عمليًا، فبنوحّده قبل المقارنة.
4. **[[.filter((e) => e !== "")]]:** اللي كان مسافات بس بقى [[""]] بعد [[trim]]، فبنشيله.
5. **[[[...new Set(cleaned)] ]]:** الـ Set بتشيل التكرار وبتحافظ على ترتيب أول ظهور، والـ spread بيرجّعها array.

## فخاخ اتجرّبت

- **الترتيب:** [[new Set(list)]] **قبل** التنضيف بيسيب [[" A@x.com"]] و [["a@x.com"]] اتنين. القاعدة: نضّف الأول، وبعدين قارن.
- **الإيميل الفاضي:** من غير الـ [[filter]] كان فيه [[""]] في النتيجة التالتة.

## اتقاس

Node 24: الحالات التلاتة اللي فوق. والدالة مبتعدّلش الـ array اللي جالها ([[map]] و [[filter]] بيعملوا arrays جديدة).` },
        { lvl: 'متوسط', t: R`سلة مشتريات من غير تعديل في مكان`, what: R`موديول فيه [[addItem(cart, item)]] و [[removeItem(cart, id)]] و [[changeQty(cart, id, qty)]] و [[total(cart)]]، كل واحدة بترجّع cart جديدة بـ spread (درس destructuring و spread، ودرس reference و copy)، وبعدين [[JSON.stringify]] للسلة و [[JSON.parse]] ليها تاني (درس JSON).`, done: R`بعد ٣ عمليات الـ cart الأصلية زي ما هي ([[cart !== next]])، و [[total]] صح بعد ما المنتج اتضاف مرتين (الكمية زادت مش سطر جديد)، والسلة بعد الـ JSON وراجعة بتطلع نفس [[total]].`, sol: R`## الشكل النهائي

~~~text الناتج: node demo.mjs (Node 24)
original: { items: [] }
next: mug×2, cap×3
cart !== next: true | lines: 2
total: 510
json: {"items":[{"id":"mug","name":"Mug","price":120,"qty":2},{"id":"cap","name":"Cap","price":90,"qty":3}]}
after JSON: 510 true
removed: 270
كمية غلط: -1
still: 510
~~~

## هتشوف إيه

[[original]] لسه فاضية بعد كل العمليات، و [[next]] فيها سطرين بس مع إن الـ Mug اتضاف مرتين (الكمية بقت 2). الإجمالي 120×2 + 90×3 = 510، وبعد [[JSON.stringify]] و [[JSON.parse]] نفس الـ 510. وكمية سالبة بترمي Error والسلة متغيّرتش.

## شجرة الملفات

~~~text
cart/
├── cart.mjs   ← الدوال (الموديول)
└── demo.mjs   ← بيجرّبهم ويطبع
~~~

الامتداد [[.mjs]] بيقول لـ Node إن الملف ES module فيقبل [[import]] و [[export]] (هيتشرحوا بالتفصيل في وحدة modules؛ هنا كفاية إن [[export]] بتطلّع الدالة من الملف و [[import]] بتجيبها).

## الكود

~~~js cart.mjs
// كل دالة بترجّع cart جديدة ومبتلمسش اللي جالها
export function addItem(cart, item) {
  const found = cart.items.find((i) => i.id === item.id);
  if (found) return changeQty(cart, item.id, found.qty + (item.qty ?? 1));
  return { ...cart, items: [...cart.items, { ...item, qty: item.qty ?? 1 }] };
}

export function removeItem(cart, id) {
  return { ...cart, items: cart.items.filter((i) => i.id !== id) };
}

export function changeQty(cart, id, qty) {
  if (!Number.isInteger(qty) || qty < 0) throw new Error($__btكمية غلط: $__{qty}$__bt);
  if (qty === 0) return removeItem(cart, id);
  return { ...cart, items: cart.items.map((i) => (i.id === id ? { ...i, qty } : i)) };
}

export function total(cart) {
  return cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
}
~~~

~~~js demo.mjs
import { addItem, removeItem, changeQty, total } from "./cart.mjs";

const cart = { items: [] };
const mug = { id: "mug", name: "Mug", price: 120 };
const cap = { id: "cap", name: "Cap", price: 90 };

const a = addItem(cart, mug);
const b = addItem(a, cap);
const c = addItem(b, mug);           // نفس المنتج تاني: الكمية تزيد
const next = changeQty(c, "cap", 3);

console.log("original:", cart);
console.log("next:", next.items.map((i) => $__bt$__{i.id}×$__{i.qty}$__bt).join(", "));
console.log("cart !== next:", cart !== next, "| lines:", next.items.length);
console.log("total:", total(next));

const text = JSON.stringify(next);
const back = JSON.parse(text);
console.log("json:", text);
console.log("after JSON:", total(back), total(back) === total(next));

console.log("removed:", total(removeItem(next, "mug")));
try {
  changeQty(next, "mug", -1);
} catch (e) {
  console.log(e.message);
}
console.log("still:", total(next));
~~~

## كل حتة بتعمل إيه

- **[[addItem]]:** لو المنتج موجود بالـ id، بتسيب الشغل لـ [[changeQty]] بالكمية الجديدة (فمفيش سطرين لنفس المنتج). ولو مش موجود: [[{ ...cart, items: [...cart.items, { ...item, qty }] }]] = تلات نسخ: السلة، والـ array، والمنتج نفسه (عشان لو حد عدّل [[mug]] بعدين ميبانش في السلة).
- **[[removeItem]]:** [[filter]] بترجّع array جديدة من غير المنتج.
- **[[changeQty]]:** بتتحقق الأول ([[Number.isInteger]] وموجب)، والصفر معناه «شيله». و [[map]] بتعمل object جديد للمنتج اللي اتغيّر بس، والباقي بيرجع هو هو.
- **[[total]]:** [[reduce]] على [[price * qty]] بقيمة بداية 0 (فالسلة الفاضية = 0 مش error).
- **الـ JSON:** السلة كلها داتا (من غير دوال ولا Dates)، فبتعدّي [[stringify]] و [[parse]] من غير ما حاجة تضيع. ده اللي هيخليك تحفظها في [[localStorage]] في وحدة الـ DOM.

## الغلطات اللي حصلت وإزاي اتصلحت

- **فخ [[found.qty += 1]]:** لو [[addItem]] زوّدت الكمية في مكانها، [[next]] هيطلع صح بس السلة القديمة هتتغيّر كمان، لأن [[found]] هو نفس الـ object اللي فيها (درس «reference و copy»). عشان كده الزيادة بتروح لـ [[changeQty]] اللي بتعمل نسخة.
- **الكمية النص:** جرّبنا سلة فيها [[qty: "3"]] (نص، زي اللي بييجي من input أو من JSON متكتب بالإيد). [[total]] طلّع 270 صح لأن الضرب بيحوّل النص لرقم، فالباج مستخبي. بس [[addItem]] لنفس المنتج عملت [["3" + 1]] = [["31"]]. من غير التحقق كانت السلة هتبقى فيها ٣١ كاب؛ مع التحقق في [[changeQty]] طلع [[Error: كمية غلط: 31]] على طول ووصّلنا للمشكلة.

## اتقاس

Node 24: كل السطور اللي فوق، و [[cart !== next]] بـ [[true]]، والسلة بعد الـ JSON نفس الإجمالي.` },
        { lvl: 'متوسط', t: R`قارن إعدادين`, what: R`دالة [[diffConfig(oldCfg, newCfg)]] بترجّع [[{ added, removed, changed }]]: المفاتيح الجديدة، واللي اتشالت، واللي قيمتها اتغيرت ومعاها القيمة القديمة والجديدة. من دروس Object.keys و entries و Map و Set ([[difference]]).`, done: R`على [[{ port: 3000, debug: false }]] و [[{ port: 8080, debug: false, cache: true }]]: [[added]] فيها [[cache]] بس، و [[removed]] فاضية، و [[changed]] فيها [[port]] من 3000 لـ 8080، و [[debug]] مش ظاهرة في أي حتة.`, sol: R`## الشكل النهائي

~~~text الناتج: node diff-config.js (Node 24)
{
  added: [ 'cache' ],
  removed: [],
  changed: { port: { from: 3000, to: 8080 } }
}
{ added: [], removed: [ 'tls' ], changed: {} }
{ added: [], removed: [], changed: {} }
{ added: [], removed: [], changed: {} }
{ list: { from: [ 1 ], to: [ 1, 2 ] } }
~~~

## هتشوف إيه

أول نتيجة هي حالة الـ [[done]]: [[cache]] جديدة، ومفيش حاجة اتشالت، و [[port]] اتغيّرت من 3000 لـ 8080، و [[debug]] (نفس القيمة) مش ظاهرة. التانية مفتاح اتشال. والتلاتة اللي بعدها حالات طرفية: [[NaN]] مع [[NaN]] مش «اتغيّر»، و array بنفس المحتوى مش «اتغيّر»، و array محتواها اختلف «اتغيّر».

## الكود

~~~js diff-config.js
// قيمتين متساويتين؟ الـ primitives بـ Object.is، والـ objects والـ arrays بمحتواها
const same = (a, b) =>
  Object.is(a, b) ||
  (typeof a === "object" && a !== null && typeof b === "object" && b !== null &&
    JSON.stringify(a) === JSON.stringify(b));

function diffConfig(oldCfg, newCfg) {
  const before = new Set(Object.keys(oldCfg));
  const after = new Set(Object.keys(newCfg));

  const added = [...after.difference(before)];
  const removed = [...before.difference(after)];
  const changed = {};
  for (const key of before.intersection(after)) {
    if (!same(oldCfg[key], newCfg[key])) changed[key] = { from: oldCfg[key], to: newCfg[key] };
  }
  return { added, removed, changed };
}

console.log(diffConfig({ port: 3000, debug: false }, { port: 8080, debug: false, cache: true }));
console.log(diffConfig({ host: "a", tls: true }, { host: "a" }));
console.log(diffConfig({ x: NaN }, { x: NaN }));
console.log(diffConfig({ list: [1] }, { list: [1] }));
console.log(diffConfig({ list: [1] }, { list: [1, 2] }).changed);
~~~

## كل حتة بتعمل إيه

- **[[new Set(Object.keys(...))]]:** المفاتيح بتاعة كل إعداد في Set، عشان نستخدم عمليات المجموعات.
- **[[after.difference(before)]]:** اللي في الجديد ومش في القديم = اتضاف. والعكس = اتشال.
- **[[before.intersection(after)]]:** المفاتيح اللي في الاتنين، ودي بس اللي ممكن تكون «اتغيّرت».
- **[[same(a, b)]]:** [[Object.is]] للـ primitives (وبيقول إن [[NaN]] زي [[NaN]]، عكس [[===]])، ولو الاتنين objects بنقارن المحتوى بـ [[JSON.stringify]].

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة قارنت بـ [[!==]]:** [[{ x: NaN }]] مع [[{ x: NaN }]] طلعت «اتغيّرت» لأن [[NaN !== NaN]] بـ [[true]]. اتبدّلت بـ [[Object.is]].
- **وبعدها [[{ list: [1] }]] مع [[{ list: [1] }]] طلعت [[changed: { list: { from: [Array], to: [Array] } }]]:** الاتنين arrays مختلفين في الذاكرة (reference)، فـ [[Object.is]] قالت مختلفين مع إن المحتوى واحد. ده نفس درس «reference و copy». اتصلحت بمقارنة المحتوى للـ objects.
- **حدود الحل ده:** [[JSON.stringify]] بتفرّق بين [[{ a: 1, b: 2 }]] و [[{ b: 2, a: 1 }]] (ترتيب المفاتيح)، وبتشيل [[undefined]]. للإعدادات العادية ده كفاية؛ لو محتاج دقة أكتر اكتب مقارنة recursive أو استخدم [[util.isDeepStrictEqual]] بتاعة Node.

## اتقاس

Node 24 (اللي فيه [[Set.prototype.difference]] و [[intersection]]): الحالات الخمسة اللي فوق.` },
        { lvl: 'كبير', t: R`مخزن بضاعة بيتحفظ في ملف`, what: R`سكربت Node [[inventory.js]] فيه دوال [[add]] و [[sell]] و [[report]] على object منتجات (المفتاح الـ SKU)، والحالة بتتحفظ في [[inventory.json]] وبتتقري منه في أول التشغيل بـ [[safeParse]] (درس JSON). كل دالة بتتحقق من المدخلات: الكمية رقم صحيح موجب، والبيع مش أكتر من المخزون، والـ SKU موجود؛ ولو فيه غلط بترمي Error برسالة واضحة والحالة متتغيرش (اشتغل على نسخة بـ [[structuredClone]] وبعدها بدّل). و [[report]] بيطلّع المنتجات الخلصانة بـ [[Object.entries]]. وفي ملف [[test.js]] شوية [[console.assert]] على كل حالة. من كل دروس الوحدة.`, done: R`[[node test.js]] بيخلص من غير ولا assertion فاشلة. بيع كمية أكبر من المخزون بيطبع رسالة والملف متغيّرش. ولو كتبت كلام بايظ في [[inventory.json]] السكربت بيبدأ بمخزن فاضي وبيطبع تحذير بدل ما يقع. وبتشغّله مرتين ورا بعض والأرقام بتكمّل من آخر مرة.`, ext: R`زوّد سجل عمليات (Map من التاريخ للعمليات)، و [[undo]] لآخر عملية، وتصدير CSV للتقرير.`, sol: R`## الشكل النهائي

~~~text الترمنال (Node 24، في فولدر فاضي)
$ node inventory.js add mug 5 Mug
1 منتج، 5 قطعة، الخلصان: مفيش
$ node inventory.js add cap 2 Cap
2 منتج، 7 قطعة، الخلصان: مفيش
$ node inventory.js sell cap 2
2 منتج، 5 قطعة، الخلصان: cap
$ node inventory.js sell mug 9
غلط: مفيش كفاية من mug: موجود 5 وعايز 9
$ node inventory.js add mug 1.5
غلط: الكمية لازم رقم صحيح أكبر من صفر، وجالي: 1.5
$ node inventory.js sell nope 1
غلط: مفيش منتج بالـ SKU ده: nope
$ cat inventory.json
{
  "mug": {
    "name": "Mug",
    "qty": 5
  },
  "cap": {
    "name": "Cap",
    "qty": 0
  }
}
$ echo {bad > inventory.json
$ node inventory.js report
تحذير: inventory.json بايظ (اتنسخ في inventory.json.broken)، هبدأ بمخزن فاضي
0 منتج، 0 قطعة، الخلصان: مفيش
~~~

~~~text الناتج: node test.js
✔ add بيزوّد ومبيلمسش الأصل (1.448ms)
✔ الكمية لازم رقم صحيح موجب (0.4012ms)
✔ sell أكتر من المخزون بيرمي والحالة زي ما هي (0.202ms)
✔ report بيطلّع الخلصان (0.7792ms)
✔ load على ملف بايظ بيرجّع مخزن فاضي (6.0255ms)
✔ safeParse (0.1621ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 14.3512
~~~

## هتشوف إيه

كل أمر بيطبع ملخص المخزن بعده، والأرقام بتكمّل من آخر تشغيل لأنها في [[inventory.json]]. البيع أكتر من المخزون والكمية الكسر والـ SKU الغلط بيطبعوا سطر «غلط:» واضح، والملف بعدهم لسه فيه [[mug: 5]] (العملية الغلط متحفظتش). ولما الملف بقى كلام بايظ، السكربت مقعش: نسخ الملف البايظ جنبه وبدأ من الصفر.

## شجرة الملفات وترتيب البناء

~~~text
inventory/
├── inventory.js     ← المنطق (add و sell و report و load و save) + الأوامر من الترمنال
├── test.js          ← اختبارات بـ node:test
└── inventory.json   ← بيتعمل لوحده أول مرة
~~~

1. الدوال الصافية الأول ([[add]] و [[sell]] و [[report]]): بتاخد state وترجّع state جديدة، من غير ملفات. دي اللي بتتختبر بسهولة.
2. [[safeParse]] و [[load]] و [[save]]: الملف.
3. الأوامر من الترمنال تحت [[require.main === module]].
4. [[test.js]] بيجرّب كل دالة بحالاتها.

## الكود

~~~js inventory.js
// مخزن بضاعة: الحالة object مفتاحه الـ SKU، وبتتحفظ في inventory.json
const fs = require("node:fs");

const FILE = process.env.INVENTORY_FILE ?? "inventory.json";

function safeParse(text, fallback) {
  try {
    return JSON.parse(text) ?? fallback;
  } catch {
    return fallback;
  }
}

function load(file = FILE) {
  if (!fs.existsSync(file)) return {};
  const data = safeParse(fs.readFileSync(file, "utf8"), null);
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    fs.copyFileSync(file, file + ".broken"); // منضيّعش الملف البايظ، يمكن يتصلّح بالإيد
    console.warn($__btتحذير: $__{file} بايظ (اتنسخ في $__{file}.broken)، هبدأ بمخزن فاضي$__bt);
    return {};
  }
  return data;
}

function save(state, file = FILE) {
  fs.writeFileSync(file, JSON.stringify(state, null, 2) + "\n");
}

function checkQty(qty) {
  if (!Number.isInteger(qty) || qty <= 0) throw new Error($__btالكمية لازم رقم صحيح أكبر من صفر، وجالي: $__{qty}$__bt);
}

function add(state, sku, qty, name = sku) {
  checkQty(qty);
  if (typeof sku !== "string" || sku.trim() === "") throw new Error("الـ SKU فاضي");
  const next = structuredClone(state);
  next[sku] ??= { name, qty: 0 };
  next[sku].qty += qty;
  return next;
}

function sell(state, sku, qty) {
  checkQty(qty);
  if (!Object.hasOwn(state, sku)) throw new Error($__btمفيش منتج بالـ SKU ده: $__{sku}$__bt);
  if (qty > state[sku].qty) throw new Error($__btمفيش كفاية من $__{sku}: موجود $__{state[sku].qty} وعايز $__{qty}$__bt);
  const next = structuredClone(state);
  next[sku].qty -= qty;
  return next;
}

function report(state) {
  const entries = Object.entries(state);
  return {
    products: entries.length,
    units: entries.reduce((sum, [, p]) => sum + p.qty, 0),
    outOfStock: entries.filter(([, p]) => p.qty === 0).map(([sku]) => sku),
  };
}

module.exports = { safeParse, load, save, add, sell, report };

// لما يتشغّل من الترمنال: node inventory.js add mug 5 Mug
if (require.main === module) {
  const [cmd, sku, qtyText, name] = process.argv.slice(2);
  let state = load();
  try {
    if (cmd === "add") state = add(state, sku, Number(qtyText), name);
    else if (cmd === "sell") state = sell(state, sku, Number(qtyText));
    else if (cmd !== "report") throw new Error("الأوامر: add SKU QTY [NAME] | sell SKU QTY | report");
    if (cmd !== "report") save(state); // بنحفظ بس بعد ما العملية تنجح
    const r = report(state);
    console.log($__bt$__{r.products} منتج، $__{r.units} قطعة، الخلصان: $__{r.outOfStock.join(", ") || "مفيش"}$__bt);
  } catch (e) {
    console.error("غلط: " + e.message);
    process.exitCode = 1;
  }
}
~~~

~~~js test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { add, sell, report, load, save, safeParse } = require("./inventory.js");

test("add بيزوّد ومبيلمسش الأصل", () => {
  const s0 = {};
  const s1 = add(s0, "mug", 5, "Mug");
  const s2 = add(s1, "mug", 2);
  assert.deepEqual(s0, {});
  assert.equal(s1.mug.qty, 5);
  assert.equal(s2.mug.qty, 7);
  assert.equal(s2.mug.name, "Mug");
});

test("الكمية لازم رقم صحيح موجب", () => {
  for (const bad of [0, -1, 1.5, NaN, "3"]) assert.throws(() => add({}, "mug", bad), /الكمية/);
});

test("sell أكتر من المخزون بيرمي والحالة زي ما هي", () => {
  const s = add({}, "cap", 2);
  assert.throws(() => sell(s, "cap", 3), /مفيش كفاية/);
  assert.equal(s.cap.qty, 2);
  assert.throws(() => sell(s, "nope", 1), /مفيش منتج/);
});

test("report بيطلّع الخلصان", () => {
  let s = add({}, "mug", 1);
  s = add(s, "cap", 4);
  s = sell(s, "mug", 1);
  assert.deepEqual(report(s), { products: 2, units: 4, outOfStock: ["mug"] });
});

test("load على ملف بايظ بيرجّع مخزن فاضي", (t) => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "inv-")), "inventory.json");
  t.mock.method(console, "warn", () => {});
  fs.writeFileSync(file, "{bad json");
  assert.deepEqual(load(file), {});
  fs.writeFileSync(file, "[1,2]");
  assert.deepEqual(load(file), {});
  save({ mug: { name: "Mug", qty: 3 } }, file);
  assert.equal(load(file).mug.qty, 3);
});

test("safeParse", () => {
  assert.deepEqual(safeParse('{"a":1}', {}), { a: 1 });
  assert.deepEqual(safeParse("null", {}), {});
  assert.deepEqual(safeParse("{x", []), []);
});
~~~

## كل حتة مهمة بتعمل إيه

- **الحالة object مفتاحه الـ SKU:** [[{ mug: { name, qty } }]]. الوصول لمنتج [[state[sku]]] على طول من غير [[find]]، و [[Object.hasOwn(state, sku)]] بتسأل «موجود؟» من غير ما تتلخبط في [[toString]] أو [[constructor]] (جرّب [[node inventory.js sell toString 1]]: الرسالة «مفيش منتج» مش crash).
- **[[structuredClone(state)]] وبعدين التعديل:** كل التحقق بيحصل **قبل** النسخ، والتعديل على النسخة بس. لو حصل [[throw]] في أي حتة، الـ state القديمة سليمة، وفي الـ CLI [[save]] مبتتنادى أصلًا.
- **[[next[sku] ??= { name, qty: 0 }]]:** لو المنتج جديد اعمله بكمية صفر، وبعدين زوّد. سطر واحد للحالتين.
- **[[checkQty]]:** [[Number.isInteger]] بترفض [[1.5]] و [[NaN]] (من [[Number("abc")]]) والنص [["3"]] (في الاختبارات). والـ CLI بيحوّل بـ [[Number(qtyText)]] فـ [["abc"]] بتبقى [[NaN]] وبتترفض.
- **[[report]]:** [[Object.entries]] مرة واحدة، ومنها العدد ومجموع القطع ([[reduce]]) والخلصان ([[filter]] ثم [[map]] للـ SKU).
- **[[load]]:** ملف مش موجود = مخزن فاضي ساكت (أول تشغيل). ملف موجود بس مش JSON، أو JSON بس مش object (زي [[[1,2]]]) = تحذير، ونسخة [[.broken]]، ومخزن فاضي.
- **[[require.main === module]]:** الجزء ده بيشتغل بس لما تشغّل [[node inventory.js]]، مش لما [[test.js]] يعمل [[require]]. فالاختبارات مبتلمسش [[inventory.json]] الحقيقي.
- **[[process.exitCode = 1]]** في الغلط: السكربت بيقول للترمنال إنه فشل (مفيد لو اتشغّل من سكربت تاني)، من غير [[process.exit()]] اللي بتقطع أي كتابة لسه بتحصل.
- **الاختبارات:** [[node:test]] و [[assert/strict]] (درس الاختبارات هييجي بعدين، بس الشكل بسيط: [[test("اسم", () => {...})]] و [[assert.equal]] و [[assert.throws]]). اختبار الملف بيكتب في فولدر مؤقت ([[fs.mkdtempSync]]) و [[t.mock.method(console, "warn")]] بيسكّت التحذير جوه الاختبار.

## الغلطات اللي حصلت وإزاي اتصلحت

- **التحذير كان بيطلع مرتين:** أول نسخة من الـ CLI كانت بتعمل [[report(load())]] بعد الحفظ، فالملف البايظ اتقري مرتين. اتصلحت بإن [[report]] تشتغل على الـ state اللي في الذاكرة.
- **الملف البايظ كان بيضيع:** أول [[add]] بعد ملف بايظ كانت بتكتب فوقه، فلو كان فيه داتا اتبوظ فيها حرف واحد بس كانت هتروح. اتصلحت بـ [[fs.copyFileSync(file, file + ".broken")]] قبل ما نبدأ من جديد.
- **[[state[sku]]] مع [["toString"]]:** أول نسخة كانت بتسأل [[if (!state[sku])]]، و [[state["toString"]]] موجودة (دالة موروثة من [[Object.prototype]]). فـ [[sell toString 1]] عدّت من غير أي error: البيع «نجح» والملف متغيّرش، وفي الخفاء [[next.toString.qty -= 1]] كتبت [[qty = NaN]] على [[Object.prototype.toString]] نفسها، الدالة اللي كل objects البرنامج بتشاركها. اتصلحت بـ [[Object.hasOwn]] اللي بتسأل عن مفاتيح الـ object نفسه بس.

## اتقاس

- [[node test.js]]: ٦ اختبارات، ٦ نجحوا.
- الجلسة اللي فوق اتشغّلت حرفيًا في فولدر فاضي (Node 24 على Windows، و Git Bash للـ [[echo]] و [[cat]]). وتشغيله مرتين ورا بعض بيكمّل الأرقام.` },
        { lvl: 'فكرة', t: R`دفتر حاجتك انت`, what: R`اختار حاجة بتتابعها بنفسك (مصاريفك، الكتب اللي قريتها، الأفلام، تمارين الجيم) واعملها كـ objects: كل سجل object، والكل في Map أو object بمفتاح، وفيه بحث وتجميع وإحصائيات بـ [[Object.entries]]، وبيتحفظ JSON. انت اللي بتقرر الخصايص.`, done: R`فيه ٣ أسئلة على الأقل الكود بيجاوبها (أكتر حاجة صرفت عليها، مجموع الشهر، إلخ)، والبيانات بتفضل بعد ما تقفل وتفتح، والملف البايظ مبيوقّعش البرنامج.`, ext: R`حوّله لصفحة بعد وحدة الـ DOM، وخلّيه يستورد CSV، وزوّد مقارنة بين شهرين بـ [[diffConfig]] بتاعتك.`, sol: R`## الشكل النهائي (نسخة نموذجية: دفتر مصاريف)

~~~text الترمنال (Node 24)
$ node ledger.js
دفتر جديد اتعمل فيه 5 سجلات
١. مجموع نوفمبر: 1030
٢. أكتر حاجة صرفت عليها في نوفمبر: [ 'كتب', 650 ]
٣. لكل قسم في نوفمبر: { 'أكل': 300, 'مواصلات': 80, 'كتب': 650 }
٤. أغلى عملية: { id: 5, date: '2026-11-12', amount: 650, category: 'كتب', note: '' }
$ node ledger.js add 2026-11-20 45 مواصلات تاكسي
الدفتر اتفتح وفيه 5 سجلات
اتضاف. الدفتر فيه 6 سجلات
١. مجموع نوفمبر: 1075
٢. أكتر حاجة صرفت عليها في نوفمبر: [ 'كتب', 650 ]
٣. لكل قسم في نوفمبر: { 'أكل': 300, 'مواصلات': 125, 'كتب': 650 }
٤. أغلى عملية: { id: 5, date: '2026-11-12', amount: 650, category: 'كتب', note: '' }
$ node ledger.js add 20-11 45 x
الدفتر اتفتح وفيه 6 سجلات
غلط: التاريخ لازم YYYY-MM-DD
...
$ echo "not json" > ledger.json
$ node ledger.js
تحذير: الدفتر بايظ (SyntaxError)، اتنسخ في ledger.json.broken وهبدأ من جديد
دفتر جديد اتعمل فيه 5 سجلات
١. مجموع نوفمبر: 1030
...
~~~

## هتشوف إيه

أول تشغيل بيعمل دفتر فيه ٥ سجلات تجربة ويجاوب ٤ أسئلة. تقفل وتفتح (تشغّل تاني) والسجلات موجودة، وتضيف سجل من الترمنال والأرقام بتتحدّث (مواصلات من 80 لـ 125). التاريخ الغلط بيترفض، والملف البايظ بيتنسخ على جنب ومبيوقّعش البرنامج.

## الكود

~~~js ledger.js
// دفتر مصاريف: كل سجل object، والكل في Map بالـ id، وبيتحفظ JSON
const fs = require("node:fs");
const FILE = "ledger.json";

function load() {
  try {
    const rows = JSON.parse(fs.readFileSync(FILE, "utf8"));
    if (!Array.isArray(rows)) throw new Error("مش array");
    return new Map(rows.map((r) => [r.id, r]));
  } catch (e) {
    if (e.code !== "ENOENT") {
      fs.copyFileSync(FILE, FILE + ".broken");
      console.warn($__btتحذير: الدفتر بايظ ($__{e.name})، اتنسخ في $__{FILE}.broken وهبدأ من جديد$__bt);
    }
    return new Map();
  }
}

function save(book) {
  fs.writeFileSync(FILE, JSON.stringify([...book.values()], null, 2) + "\n");
}

function addEntry(book, { date, amount, category, note = "" }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("التاريخ لازم YYYY-MM-DD");
  if (!(amount > 0)) throw new Error("المبلغ لازم أكبر من صفر");
  const id = (Math.max(0, ...book.keys()) || 0) + 1;
  const next = new Map(book);
  next.set(id, { id, date, amount, category, note });
  return next;
}

const inMonth = (book, month) => [...book.values()].filter((r) => r.date.startsWith(month));

function totalsByCategory(rows) {
  const totals = Object.groupBy(rows, (r) => r.category);
  return Object.fromEntries(
    Object.entries(totals).map(([cat, list]) => [cat, list.reduce((s, r) => s + r.amount, 0)])
  );
}

function topCategory(rows) {
  const entries = Object.entries(totalsByCategory(rows));
  if (entries.length === 0) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a));
}

// --- الاستخدام ---
let book = load();
if (book.size === 0) {
  book = addEntry(book, { date: "2026-10-03", amount: 450, category: "أكل" });
  book = addEntry(book, { date: "2026-10-09", amount: 120, category: "مواصلات" });
  book = addEntry(book, { date: "2026-11-02", amount: 300, category: "أكل", note: "سوبر ماركت" });
  book = addEntry(book, { date: "2026-11-05", amount: 80, category: "مواصلات" });
  book = addEntry(book, { date: "2026-11-12", amount: 650, category: "كتب" });
  save(book);
  console.log("دفتر جديد اتعمل فيه", book.size, "سجلات");
} else {
  console.log("الدفتر اتفتح وفيه", book.size, "سجلات");
}

// node ledger.js add 2026-11-20 45 مواصلات "تاكسي"
const [cmd, date, amount, category, note] = process.argv.slice(2);
if (cmd === "add") {
  try {
    book = addEntry(book, { date, amount: Number(amount), category, note });
    save(book);
    console.log("اتضاف. الدفتر فيه", book.size, "سجلات");
  } catch (e) {
    console.error("غلط: " + e.message);
    process.exitCode = 1;
  }
}

const nov = inMonth(book, "2026-11");
console.log("١. مجموع نوفمبر:", nov.reduce((s, r) => s + r.amount, 0));
console.log("٢. أكتر حاجة صرفت عليها في نوفمبر:", topCategory(nov));
console.log("٣. لكل قسم في نوفمبر:", totalsByCategory(nov));
console.log("٤. أغلى عملية:", [...book.values()].reduce((a, b) => (b.amount > a.amount ? b : a)));
~~~

## ليه التصميم ده

- **كل سجل object بـ [[id]] و [[date]] و [[amount]] و [[category]] و [[note]]:** دي الخصايص اللي الأسئلة محتاجاها، ومفيش أكتر. التاريخ نص [["YYYY-MM-DD"]] مش [[Date]]: بيتحفظ في JSON زي ما هو، وبيترتب صح كنص، و [[startsWith("2026-11")]] بتجيب الشهر من غير أي حساب توقيت.
- **Map بالـ id في الذاكرة، و array في الملف:** الـ Map بتخلي [[get(id)]] و [[delete(id)]] مباشرة (لو زوّدت «امسح سجل»)، بس [[JSON.stringify]] على Map بيطلع [[{}]] (درس JSON)، فبنحفظ [[[...book.values()] ]] ونرجّعها Map بـ [[new Map(rows.map((r) => [r.id, r]))]].
- **[[addEntry]] بترجّع Map جديدة:** نفس فكرة السلة: الدفتر القديم مبيتعدّلش، فلو التحقق فشل مفيش حاجة اتغيّرت ومفيش حفظ.
- **[[Object.groupBy]] ثم [[Object.entries]]:** تجميع بالقسم، وبعدين مجموع كل قسم، وبعدين الأكبر بـ [[reduce]].
- **الملف البايظ:** [[try]] حوالين القراية والـ parse، وأي حاجة غير «الملف مش موجود» ([[ENOENT]]) بتنسخ الملف لـ [[.broken]] قبل ما نبدأ من جديد. دفتر مصاريف سنة مينفعش يضيع عشان حرف.

## الغلطات اللي حصلت وإزاي اتصلحت

- **رسالة التحذير الأولى** كانت [[e.message]] وفيها النص البايظ كله بسطوره، فاتغيّرت لـ [[e.name]] ([[SyntaxError]]).
- **أول نسخة كانت بتكتب فوق الملف البايظ** بداتا التجربة، فاتزوّدت النسخة الاحتياطية.

## خليه بتاعك

غيّر الأقسام والأسئلة لحاجتك (الكتب: [[pages]] و [[rating]]، والجيم: [[exercise]] و [[weight]] و [[reps]] وسؤال «أعلى وزن لكل تمرين»). وبعد وحدة الـ DOM حوّله لصفحة بنفس الدوال، والحفظ في [[localStorage]] بدل الملف.

## اتقاس

الجلسة اللي فوق اتشغّلت بـ Node 24 على Windows، وسطور [[...]] مكان نفس الأسئلة الأربعة متكررة.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اعمل object اسمه [[phone]] فيه [[brand]] و [[price]] ومفتاح [["in-stock"]]. اقرا كل واحد مرة بالنقطة ومرة بالأقواس، وجرّب [[phone.in-stock]] بالنقطة. وبعدين امسح [[price]] بـ [[delete]] واسأل [["price" in phone]].`, done: R`[[phone["in-stock"]]] بترجّع [[true]]، و [[phone.in-stock]] بتطلع [[ReferenceError: stock is not defined]] (JS قراها طرح: [[phone.in]] ناقص [[stock]])، و [["price" in phone]] بعد المسح بترجّع [[false]].`, sol: R`~~~js phone.js
const phone = { brand: "Nokia", price: 1500, "in-stock": true };

console.log(phone.brand, phone["brand"]);
console.log(phone.price, phone["price"]);
console.log(phone["in-stock"]);

try {
  console.log(phone.in-stock);
} catch (e) {
  console.log(e.name + ": " + e.message);
}

delete phone.price;
console.log("price" in phone, phone.price);
console.log(phone);
~~~

~~~text الناتج (node phone.js، Node 24)
Nokia Nokia
1500 1500
true
ReferenceError: stock is not defined
false undefined
{ brand: 'Nokia', 'in-stock': true }
~~~

**ليه كده:**

- **النقطة والأقواس بيقروا نفس الخاصية** لما الاسم ينفع يبقى اسم متغير ([[brand]] و [[price]]). الأقواس بتاخد نص، فـ [[phone["brand"]]] هي هي [[phone.brand]].
- **[["in-stock"]] فيه شرطة،** فلازم يتكتب بين علامات تنصيص في الـ object، ولازم يتقري بالأقواس بس: [[phone["in-stock"]]].
- **[[phone.in-stock]]** JS بيقراها طرح: [[phone.in]] (خاصية اسمها [[in]]، مش موجودة فقيمتها [[undefined]]) ناقص متغير اسمه [[stock]]. ومفيش متغير بالاسم ده، فـ [[ReferenceError: stock is not defined]]. لو كان فيه متغير [[stock]] كان هيطلع [[NaN]] من غير أي error، وده أسوأ.
- **[[delete phone.price]]** شالت المفتاح نفسه، فـ [["price" in phone]] بقت [[false]] والقراية بترجّع [[undefined]].

**الغلطة الشائعة:** تفتكر إن [[phone.price = undefined]] زي [[delete]]. لأ: الأولى بتسيب المفتاح موجود وقيمته [[undefined]]، فـ [["price" in phone]] تفضل [[true]]. لو عايز «المفتاح مش موجود» استخدم [[delete]]، ولو بتسأل «موجود؟» استخدم [[in]] أو [[Object.hasOwn]] مش [[phone.price !== undefined]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const field = "price"; const product = { price: 120 }; console.log(product.field);]]. ليه undefined؟`, done: R`فهمت إن [[product.field]] بتدوّر على مفتاح اسمه حرفيًا [["field"]]. بعد [[product[field]]] بيطبع 120.`, sol: R`~~~js field-bug.js
const field = "price";
const product = { price: 120 };

console.log(product.field);   // بيدوّر على مفتاح اسمه "field"
console.log(product[field]);  // بيقرا قيمة المتغير field = "price"
~~~

~~~text الناتج
undefined
120
~~~

**ليه [[undefined]]:** النقطة دايمًا بتاخد الكلمة اللي بعدها **حرفيًا** كاسم مفتاح. [[product.field]] معناها «هات المفتاح اللي اسمه [["field"]]»، والـ object مفيهوش مفتاح بالاسم ده، فرجّع [[undefined]] من غير error.

**التصليح:** [[product[field]]]. الأقواس بتحسب اللي جواها الأول: [[field]] متغير قيمته [["price"]]، فبقت [[product["price"]]] = 120.

**القاعدة:** اسم المفتاح مكتوب في الكود وثابت ← نقطة. اسم المفتاح جاي من متغير أو من اليوزر أو من loop ← أقواس. وده نفس سبب إن [[for (const key in obj) obj.key]] بيرجّع [[undefined]] كل مرة، والصح [[obj[key]]].` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[makeProduct(name, price, field, value)]] بترجّع object فيه [[name]] و [[price]] بالـ shorthand، ومفتاح اسمه جاي في [[field]] (computed)، و method اسمها [[label()]] بترجّع الاسم والسعر في جملة.`, done: R`[[makeProduct("Mug", 120, "color", "red")]] بيرجّع object فيه [[color: 'red']] مش [[field]]، و [[.label()]] بترجّع [["Mug — 120 جنيه"]]، ونفس الدالة مع [["size", "L"]] بتعمل مفتاح [[size]].`, sol: R`~~~js make-product.js
function makeProduct(name, price, field, value) {
  return {
    name,
    price,
    [field]: value,
    label() {
      return $__bt$__{this.name} — $__{this.price} جنيه$__bt;
    },
  };
}

const mug = makeProduct("Mug", 120, "color", "red");
console.log(mug);
console.log(mug.label());
console.log("field" in mug);

const shirt = makeProduct("Shirt", 300, "size", "L");
console.log(shirt.size, shirt.label());
~~~

~~~text الناتج
{ name: 'Mug', price: 120, color: 'red', label: [Function: label] }
Mug — 120 جنيه
false
L Shirt — 300 جنيه
~~~

**كل سطر بيعمل إيه:**

- **[[name,]] و [[price,]]:** الـ shorthand. لما اسم المفتاح زي اسم المتغير، [[name]] لوحدها معناها [[name: name]].
- **[[[field]: value]]:** computed key. الأقواس المربعة حوالين المفتاح بتقول «احسب اسم المفتاح من المتغير». فـ [[field = "color"]] عمل مفتاح [[color]]، و [["field" in mug]] طلعت [[false]].
- **[[label() { ... }]]:** method بالشكل المختصر (بدل [[label: function () {...}]]). جواها [[this]] هو الـ object اللي اتنادت عليه ([[mug.label()]] ← [[this]] = [[mug]]).

**الغلطة الشائعة:** تكتب [[label: () => ...this.name...]] (arrow). الـ arrow مالهاش [[this]] بتاعها، فـ [[this.name]] هيطلع [[undefined]]. الـ methods اللي محتاجة [[this]] تتكتب بالشكل المختصر (درس «arrow و this» في وحدة this). والغلطة التانية: تكتب [[field: value]] من غير أقواس، فيطلع مفتاح اسمه [["field"]] حرفيًا.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سطر CSV [["Mug,120,red"]] والعناوين [[["name", "price", "color"]]]. حوّله لـ object بـ split و [[Object.fromEntries]]، وبعدين خلي price رقم.`, done: R`الأول بيطلع [[{ name: 'Mug', price: '120', color: 'red' }]] والسعر نص، وبعد [[Number]] على price بيبقى [[price: 120]] و [[typeof]] بتاعه "number".`, sol: R`~~~js csv-row.js
const headers = ["name", "price", "color"];
const line = "Mug,120,red";

const values = line.split(",");
const pairs = headers.map((h, i) => [h, values[i]]);
const row = Object.fromEntries(pairs);
console.log(row, typeof row.price);

row.price = Number(row.price);
console.log(row, typeof row.price);
~~~

~~~text الناتج
{ name: 'Mug', price: '120', color: 'red' } string
{ name: 'Mug', price: 120, color: 'red' } number
~~~

**الخطوات:**

1. **[[line.split(",")]]** بتقطّع السطر عند كل فاصلة: [[["Mug", "120", "red"]]]. كله نصوص، لأن الملف نص.
2. **[[headers.map((h, i) => [h, values[i] ])]]** بتعمل أزواج [[[اسم، قيمة]]] بنفس الـ index: [[["name", "Mug"]]] وهكذا.
3. **[[Object.fromEntries(pairs)]]** بتحوّل لستة الأزواج لـ object. ده عكس [[Object.entries]] (الدرس الجاي).
4. **[[Number(row.price)]]** بتحوّل [["120"]] لـ 120. لازم تتعمل لكل عمود رقمي، وإلا [[row.price + 10]] هتطلع [["12010"]] (لزق نصوص مش جمع).

**الغلطة الشائعة:** تسيب السعر نص وتكتشف المشكلة بعدين في الجمع أو الترتيب ([[sort]] على نصوص بيحط [["100"]] قبل [["20"]]). في CSV حقيقي كمان فيه قيم جواها فاصلة بين علامات تنصيص ([["Mug, big"]])، و [[split(",")]] مبيفهمهاش. للملفات الحقيقية استخدم مكتبة CSV.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[getPath(obj, path)]] بتقرا خاصية متداخلة من نص فيه نقط زي [["user.address.city"]]، وترجّع [[undefined]] لو أي مستوى في النص ناقص. استخدم [[split(".")]] و [[reduce]] و [[?.]].`, done: R`[[getPath({ user: { address: { city: "Cairo" } } }, "user.address.city")]] بترجّع [["Cairo"]]، و [[getPath({}, "user.address.city")]] بترجّع [[undefined]] من غير TypeError، و [[getPath({ a: 0 }, "a")]] بترجّع [[0]] مش [[undefined]].`, sol: R`~~~js get-path.js
function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

const data = { user: { address: { city: "Cairo" } } };
console.log(getPath(data, "user.address.city"));
console.log(getPath({}, "user.address.city"));
console.log(getPath({ a: 0 }, "a"));
console.log(getPath({ a: null }, "a.b"));

// النسخة البايظة: || بتبلع الـ 0
const bad = (obj, path) => path.split(".").reduce((acc, key) => (acc && acc[key]) || undefined, obj);
console.log(bad({ a: 0 }, "a"));
~~~

~~~text الناتج
Cairo
undefined
0
undefined
undefined
~~~

**إزاي بتشتغل:** [[split(".")]] بتحوّل [["user.address.city"]] لـ [[["user", "address", "city"]]]، و [[reduce]] بتمشي عليهم واحد واحد وهي شايلة «المكان اللي وصلنا له» في [[acc]]، وبتبدأ من الـ object نفسه:

~~~text الخطوات على data
acc = data            key = "user"     ← data?.user              = { address: {...} }
acc = { address }     key = "address"  ← acc?.address            = { city: "Cairo" }
acc = { city }        key = "city"     ← acc?.city               = "Cairo"
~~~

- **[[acc?.[key]]]:** الـ optional chaining مع الأقواس. لو [[acc]] بقى [[undefined]] أو [[null]] في أي خطوة، السلسلة بتقف وترجّع [[undefined]] بدل [[TypeError: Cannot read properties of undefined]]. ده اللي خلّى [[getPath({}, ...)]] و [[{ a: null }]] يعدّوا.
- **[[{ a: 0 }]] رجّعت 0:** لأن [[?.]] بيقف عند [[null]] و [[undefined]] بس، مش عند أي قيمة falsy.

**الغلطة الشائعة** في آخر سطرين: النسخة القديمة [[(acc && acc[key]) || undefined]] بتبلع الـ 0 والـ [[""]] والـ [[false]]، لأن [[||]] بيعدّي أي falsy. طلّعت [[undefined]] لـ [[{ a: 0 }]] مع إن القيمة موجودة.` }
          ],
          ref: [
            { t: "MDN: Working with objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects" },
            { t: "MDN: Object initializer", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer" },
            { t: "MDN: Property accessors", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors" },
            { t: "MDN: Optional chaining (?.)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining" },
            { t: "MDN: delete", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete" },
            { t: "MDN: in", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in" },
            { t: "MDN Learn: JavaScript object basics", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics" },
          ],
          pre: [{ to: "js/primitives و objects", why: R`الـ object قيمة بتتشال بالـ reference، ودي اللي بتبنيها هنا بالأقواس`}, { to: "js/template literals", why: R`الـ method [[label()]] في التمارين بترجّع جملة بـ [[$__{ }]]`}],
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
          teach: R`## الفكرة في سطرين

الـ object «شنطة» فيها حاجات ليها أسامي: كل حاجة **مفتاح** (key) و**قيمة** (value). المثال بيعمل object لمنتج اسمه product، وبعدين يقرا منه بكذا طريقة، ويضيف ويمسح، ويسأل «المفتاح ده موجود؟». كل الأرقام اللي تحت طالعة من تشغيل الكود في ملف [[app.js]] بـ Node 24 ([[node app.js]]) مع [[console.log]] حوالين كل سطر.

---

## ١. المتغيرين اللي فوق

~~~text app.js
const key = "color";
const name = "Mug";
~~~

[[const]] بيعمل متغير مينفعش يتربط بقيمة تانية. الاتنين strings عادية، بس هنستخدمهم جوه الـ object بطريقتين مختلفتين: [[key]] كـ **اسم مفتاح**، و [[name]] كـ **قيمة**.

---

## ٢. بناء الـ object سطر سطر

~~~text app.js
const product = {
  name,
  price: 120,
  [key]: "red",
  "in-stock": true,
  describe() {
    return $__bt$__{this.name} بـ $__{this.price}$__bt;
  },
};
~~~

### [[{ }]]: object literal

القوسين المعووجين بعد [[=]] معناهم «اعمل object جديد دلوقتي». و literal يعني إنك كاتب القيمة نفسها في الكود، زي ما [["Mug"]] string literal. وكل خاصية بتتفصل عن اللي بعدها بـ [[,]]. والفاصلة بعد آخر خاصية (trailing comma) مسموحة، وبتسهّل إضافة سطر جديد.

### [[name,]]: الـ shorthand

لما اسم المفتاح زي اسم المتغير بالظبط، مش لازم تكتبه مرتين. [[name,]] هي نفسها [[name: name,]]: مفتاح اسمه name، وقيمته قيمة المتغير name يعني [["Mug"]].

### [[price: 120]]: الشكل العادي

المفتاح على الشمال، و [[:]] ، والقيمة على اليمين. المفتاح من غير علامات تنصيص لأنه اسم عادي (حروف وأرقام و [[_]] و [[$]]).

### [[[key]: "red"]]: الـ computed key

الأقواس المربعة حوالين المفتاح معناها: «متاخدش الكلمة key حرفيًا، احسب قيمتها». قيمة [[key]] هي [["color"]]، فالخاصية اللي اتعملت اسمها color.

### [["in-stock": true]]: مفتاح بحروف غريبة

[[-]] في JS معناها طرح، فمينفعش تكتب [[in-stock: true]] من غير تنصيص. أي مفتاح فيه شرطة أو مسافة أو يبدأ برقم لازم يتكتب كـ string.

### [[describe() { ... }]]: method

دالة جوه object اسمها **method**. الشكل [[describe() {}]] اختصار لـ [[describe: function () {}]]. وجواها:

- [[this]]: الـ object اللي الـ method اتنادت عليه. لما تكتب [[product.describe()]]، اللي قبل النقطة هو product، فـ [[this.name]] تبقى [["Mug"]].
- [[$__bt...$__bt]] مع [[$__{...}]]: template literal (درس template literals)، بيحط القيم جوه النص.

لو طبعت الـ object كله:

~~~text الناتج: console.log(product)
{
  name: 'Mug',
  price: 120,
  color: 'red',
  'in-stock': true,
  describe: [Function: describe]
}
~~~

لاحظ إن [[[key]]] بقت [[color]] فعلًا، و Node بيكتب [['in-stock']] بين تنصيص عشان فيها شرطة.

---

## ٣. القراية بـ ٣ طرق

~~~text app.js
product.price;            // 120
product["in-stock"];      // true
product[key];             // "red"
~~~

| الشكل | معناه | الناتج |
|---|---|---|
| [[product.price]] | النقطة: المفتاح اسمه حرفيًا price | [[120]] |
| [[product["in-stock"]]] | الأقواس مع string: لازم هنا عشان الشرطة | [[true]] |
| [[product[key]]] | الأقواس مع متغير: اسم المفتاح هو قيمة key | [[red]] |

والفرق بين النقطة والأقواس مع المتغير هو أشهر لخبطة. جرّبتها:

~~~text الناتج
product.key        →  undefined
product[key]       →  red
~~~

[[product.key]] بتدوّر على مفتاح اسمه حرفيًا [["key"]]، ومفيش. ولو حاولت تقرا بالنقطة مفتاح فيه شرطة:

~~~text الناتج: product.in-stock
ReferenceError: stock is not defined
~~~

JS فهمها [[product.in - stock]]: يعني اقرا خاصية اسمها in واطرح منها متغير اسمه stock، والمتغير ده مش موجود.

---

## ٤. إضافة ومسح خاصية

~~~text app.js
product.size = "L";       // إضافة خاصية
delete product.size;      // مسح خاصية
~~~

- لو كتبت لخاصية مش موجودة، بتتعمل. فبعد السطر الأول [[product.size]] بقت [["L"]].
- بس استنى: product معمول بـ [[const]]! [[const]] بيمنع إنك تربط **المتغير** بـ object تاني ([[product = {}]] غلط)، لكن مش بيمنع إنك تعدّل **جوه** الـ object.
- [[delete]] بيشيل المفتاح نفسه. بعده [[product.size]] بترجع undefined و [["size" in product]] بترجع false.

---

## ٥. [[in]]: المفتاح موجود؟

~~~text app.js
"price" in product;       // true
~~~

[[in]] بترجّع true أو false. وفايدتها إنها بتفرّق بين «المفتاح مش موجود» و «موجود وقيمته undefined»:

~~~text الناتج
const p2 = { x: undefined };
"x" in p2   →  true
p2.x        →  undefined
~~~

---

## ٦. [[?.]]: optional chaining

~~~text app.js
product.discount?.value;  // undefined من غير error
~~~

اتقرا من الشمال: [[product.discount]] مش موجودة، فقيمتها undefined. من غير [[?.]]، قراية [[.value]] من undefined بترمي error:

~~~text الناتج: product.discount.value
TypeError: Cannot read properties of undefined (reading 'value')
~~~

الرسالة بتقولك بالظبط: حاولت تقرا [['value']] من حاجة undefined. أما [[?.]] فمعناها «لو اللي على الشمال null أو undefined، وقّف هنا ورجّع undefined». فالسطر بيطلع [[undefined]] بهدوء.

---

## ٧. الـ method و this

~~~text الناتج
product.describe()   →  Mug بـ 120
~~~

ولو فصلت الدالة عن الـ object ([[const f = product.describe; f()]]) الناتج في Node كان [[undefined بـ undefined]]: النداء مبقاش قبله [[product.]]، فـ this مبقتش product. ده موضوع درس this.

---

## ٨. فخاخ [[?.]] و [[??]]

[[?.]] و [[??]] بيختصروا كتير، وليهم خمس حالات بتلخبط. كلهم اتجرّبوا على Node 24.22.1:

~~~js opt.js
const u1 = { profile: null };
const u2 = { profile: {} };
console.log(u1.profile?.address.city);
console.log(u2.profile?.address.city);
~~~

~~~text الناتج (السطر التاني بيرمي)
undefined
TypeError: Cannot read properties of undefined (reading 'city')
~~~

### ١. [[?.]] بتحمي **اللي قبلها** بس

في [[u1]]: [[profile]] بـ [[null]] فـ [[?.]] وقفت السلسلة **كلها** ورجّعت [[undefined]]، و [[.city]] متنفذتش أصلًا (اسمها short-circuit).

في [[u2]]: [[profile]] موجود ({})، فـ [[?.]] عدّت، و [[.address]] طلعت [[undefined]]، و [[.city]] اتقرت منها من غير حماية. لو [[address]] ممكن تبقى ناقصة كمان: [[u2.profile?.address?.city]] (طلعت [[undefined]]).

### ٢. مينفعش تكتب بيها

~~~text user?.name = "x"
SyntaxError: Invalid left-hand side in assignment
~~~

[[?.]] للقراية والنداء بس. لو عايز تكتب لو موجود: [[if (user) user.name = "x"]].

### ٣. [[??]] مع [[||]] من غير أقواس ممنوعة

~~~text null ?? 0 || 5
SyntaxError: Unexpected token '||'
~~~

اللغة رافضة تخمّن الأولوية. حط الأقواس: [[(null ?? 0) || 5]] طلعت [[5]].

### ٤. [[??]] و [[||]] مش نفس الحاجة مع الصفر والنص الفاضي

| التعبير | الناتج | ليه |
|---|---|---|
| [[0 \|\| 'd']] | [['d']] | [[0]] falsy، فـ [[\|\|]] عدّتها |
| [[0 ?? 'd']] | [[0]] | [[0]] مش null ولا undefined |
| [['' ?? 'd']] | [['']] | النص الفاضي مش nullish |
| [[NaN ?? 'd']] | [[NaN]] | [[NaN]] رقم، فـ [[??]] مبتلمسهوش |

يعني [[??]] **مبتنضّفش** القيم الغلط، بتملا الناقص بس. لو [[NaN]] ممكن ييجي (رقم من فورم مثلًا) افحصه بـ [[Number.isNaN]].

### ٥. [[?.]] ممكن تخبّي الباج

[[order?.items?.length ?? 0]] بيطلع [[0]] بهدوء سواء الطلب مفيهوش بنود فعلًا أو الـ API بعت [[item]] بدل [[items]] بالغلط. الصفحة بتقول «مفيش بنود» والباج مستخبي. استخدم [[?.]] لما الحاجة **مسموح** تكون ناقصة، مش في كل نقطة «احتياطي» (درس «اقرا رسالة الخطأ في JavaScript» فيه الحالة دي بالتفصيل).

---

## الخلاصة

| الحاجة | الشكل | تفتكر إيه |
|---|---|---|
| shorthand | [[{ name }]] | = [[{ name: name }]] |
| computed key | [[{ [key]: v }]] | المفتاح = قيمة المتغير |
| مفتاح غريب | [[{ "in-stock": v }]] | تنصيص، وتقراه بالأقواس |
| method | [[describe() {}]] | this = اللي قبل النقطة |
| قراية بمتغير | [[obj[key]]] | مش [[obj.key]] |
| إضافة / مسح | [[obj.x = 1]] / [[delete obj.x]] | شغال مع const |
| موجود؟ | [["x" in obj]] | true حتى لو القيمة undefined |
| ممكن ناقص | [[obj.a?.b]] | undefined بدل TypeError |

> المفاتيح دايمًا strings (أو symbols): [[Object.keys({ 1: "a" })]] طلعت [[[ '1' ]]] والنوع string.
- [[?.]] بتحمي اللي قبلها بس، ومينفعش تكتب بيها، و [[??]] مع [[||]] لازمها أقواس.`,
          lines: [
            R`اسم مفتاح محفوظ في متغير. هنستخدمه تحت كـ computed key، يعني اسم الخاصية نفسه هيتحدد وقت التشغيل من قيمة المتغير ده، مش وقت ما تكتب الكود.`,
            R`متغير عادي اسمه [[name]]. موجود هنا عشان نشوف الـ shorthand في السطر الرابع: لما اسم المتغير هو هو اسم الخاصية اللي عايز تعملها.`,
            R`بداية الـ object literal: الأقواس [[{ }]] بتعمل object جديد في الميموري، و [[product]] بيشاور عليه. الـ [[const]] بتمنع إن [[product]] يشاور على حاجة تانية، بس مش بتمنع تعديل اللي جواه.`,
            R`shorthand: لما المتغير والخاصية نفس الاسم بتكتب الاسم مرة واحدة، وده بالظبط زي [[name: name]]. فالخاصية [[name]] قيمتها [["Mug"]] اللي في المتغير.`,
            R`الشكل العادي: المفتاح وبعده [[:]] وبعده القيمة. المفتاح هنا string ([["price"]]) حتى لو مكتبتش علامات تنصيص، والفصلة بتفصل بين الخصايص.`,
            R`computed key: الأقواس المربعة معناها «احسب اسم المفتاح من اللي جوايا». [[key]] قيمته [["color"]]، فالخاصية اللي اتعملت اسمها [[color]] وقيمتها [["red"]]. من غير الأقواس هيبقى عندك خاصية اسمها حرفيًا [[key]].`,
            R`الاسم فيه شرطة فلازم يتكتب بين علامات تنصيص، لأن من غيرها JS هتفهم [[in-stock]] كـ «in ناقص stock» وتطلع SyntaxError. وهتقراه بعدين بالأقواس المربعة بس، مش بالنقطة.`,
            R`method بالشكل المختصر: ده نفس [[describe: function () {}]] بس أقصر. الـ method هي دالة متخزنة كخاصية في الـ object، وبتتنادى بـ [[product.describe()]].`,
            R`بترجّع نص مبني من خصايص الـ object. [[this]] هنا هو الـ object اللي قبل النقطة وقت النداء، فـ [[product.describe()]] بتطلع [["Mug بـ 120"]]. لو خدت الدالة في متغير وناديتها لوحدها [[this]] بيضيع (الـ sol فيه التفاصيل).`,
            R`نهاية [[describe]]. الفصلة اللي بعدها مسموحة حتى لو دي آخر خاصية (trailing comma)، وبتسهّل إنك تضيف خاصية بعدها من غير ما تنسى فصلة.`,
            R`نهاية الـ object. دلوقتي [[product]] فيه خمس خصايص: [[name]] و [[price]] و [[color]] و [["in-stock"]] و [[describe]].`,
            R`قراية بالنقطة: أوضح طريقة، وبتنفع لما اسم الخاصية معروف وانت بتكتب الكود ومفيهوش رموز زي الشرطة أو المسافة.`,
            R`قراية بالأقواس المربعة واسم الخاصية string، ولازم هنا عشان الشرطة: [[product.in-stock]] بالنقطة بتتقري طرح ([[product.in]] ناقص [[stock]]) وترمي ReferenceError لأن [[stock]] مش متعرّف.`,
            R`الأقواس المربعة بتقبل متغير كمان: [[key]] قيمته [["color"]] فده نفس [[product.color]] ويرجّع [["red"]]. خلي بالك: [[product.key]] بالنقطة بتدوّر على خاصية اسمها حرفيًا [[key]] وترجّع [[undefined]].`,
            R`إضافة خاصية بعد الإنشاء: أول ما تدّي قيمة لخاصية مش موجودة بتتعمل. ومسموح مع [[const]] لأنك بتعدّل جوه الـ object مش بتغيّر [[product]] نفسه. لو عايز تمنع ده فيه [[Object.freeze]].`,
            R`[[delete]] بتشيل الخاصية من الـ object خالص، فبعدها [[product.size]] بترجّع [[undefined]] و [[Object.keys]] مش هتشوفها. ده غير إنك تكتب [[product.size = undefined]]: ساعتها المفتاح بيفضل موجود وقيمته فاضية.`,
            R`[[in]] بتسأل «المفتاح ده موجود؟» وترجّع [[true]] أو [[false]]، وده أدق من [[if (product.price)]] اللي هتقول لأ لو السعر [[0]]. بس خلي بالك إنها بتعد الخصايص الموروثة كمان: [["toString" in product]] بترجّع [[true]].`,
            R`[[discount]] مش موجودة فقيمتها [[undefined]]، و [[?.]] (optional chaining) بتوقف وترجّع [[undefined]] بدل ما تحاول تقرا [[value]] من [[undefined]]. من غيرها [[product.discount.value]] بترمي TypeError وتوقف البرنامج.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من [[const movie = { title: "Up", year: 2009 }]] طلّع [[title]] في متغير اسمه [[name]]، و [[lang]] بـ default [["en"]]، في سطر destructuring واحد.`, done: R`[[name]] بيطبع [["Up"]] و [[lang]] بيطبع [["en"]]، و [[movie]] لسه فيه مفتاحين بس ومفيش [[lang]] اتضاف له.`, sol: R`~~~js movie.js
const movie = { title: "Up", year: 2009 };

const { title: name, lang = "en" } = movie;
console.log(name, lang);
console.log(movie);
console.log(typeof title);
~~~

~~~text الناتج
Up en
{ title: 'Up', year: 2009 }
undefined
~~~

- **[[title: name]]:** في الـ destructuring النقطتين معناهم «خد المفتاح [[title]] وحطه في متغير اسمه [[name]]». الاسم الجديد على اليمين، عكس الـ object literal. ولذلك [[typeof title]] طلعت [[undefined]]: مفيش متغير اسمه [[title]] اتعمل.
- **[[lang = "en"]]:** default. بيشتغل لما القيمة [[undefined]] (المفتاح مش موجود أو موجود وقيمته [[undefined]])، مش لما تكون [[null]] أو [[0]].
- **[[movie]] متغيّرش:** الـ destructuring بيقرا بس، والـ default بيتحط في المتغير مش في الـ object.

**الغلطة الشائعة:** تكتب [[const { name: title } = movie]] وانت قصدك العكس، فتطلع [[name]] مش معرّف. افتكرها كده: «[[مفتاح: متغير]]». والتانية: تفتكر إن [[lang = "en"]] بيشتغل مع [[null]]؛ لأ، لو السيرفر بيبعت [[null]] استخدم [[movie.lang ?? "en"]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const updated = { name: "New", ...user };]] على [[user = { name: "Ali", age: 30 }]]. ليه الاسم لسه Ali؟`, done: R`فهمت إن اللي بييجي آخر هو اللي بيكسب، فـ [[...user]] رجّعت الاسم القديم. بعد [[{ ...user, name: "New" }]] الاسم بقى New والـ age لسه 30.`, sol: R`~~~js spread-order.js
const user = { name: "Ali", age: 30 };

const broken = { name: "New", ...user };
console.log(broken);

const fixed = { ...user, name: "New" };
console.log(fixed);
console.log(user);
~~~

~~~text الناتج
{ name: 'Ali', age: 30 }
{ name: 'New', age: 30 }
{ name: 'Ali', age: 30 }
~~~

**ليه الاسم فضل Ali:** الـ object literal بيتبني من الشمال لليمين، ولو مفتاح اتكرر **آخر واحد بيكسب**. [[{ name: "New", ...user }]] حطت [[name: "New"]] الأول، وبعدين [[...user]] نسخت [[name: "Ali"]] فوقها.

**التصليح:** الـ spread الأول (القيم القديمة)، والتعديلات بعده: [[{ ...user, name: "New" }]]. والـ [[user]] الأصلي متغيّرش في الحالتين لأن الـ spread بيعمل object جديد.

**القاعدة اللي تحفظها:** «الافتراضي الأول، والتعديل الأخير». نفس الترتيب في [[{ ...defaults, ...options }]]: اختيارات اليوزر بعد الافتراضيات عشان تكسب.` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[updateTodo(todos, id, changes)]] بترجّع array جديدة: الـ todo اللي الـ id بتاعه مطابق بيبقى [[{ ...todo, ...changes }]]، والباقي زي ما هو، ومن غير ما تلمس الـ array الأصلية.`, done: R`بعد [[const next = updateTodo(todos, 2, { done: true })]]: الـ todo رقم ٢ في [[todos]] لسه [[done: false]] وفي [[next]] بقى [[true]]، و [[next === todos]] بترجّع [[false]]، والعناصر اللي متعدّلتش هي هي ([[next.at(0) === todos.at(0)]] بترجّع [[true]]).`, sol: R`~~~js update-todo.js
function updateTodo(todos, id, changes) {
  return todos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo));
}

const todos = [
  { id: 1, text: "اشتري لبن", done: false },
  { id: 2, text: "ذاكر JS", done: false },
  { id: 3, text: "رد على الإيميل", done: true },
];

const next = updateTodo(todos, 2, { done: true });
console.log(todos[1].done, next[1].done);
console.log(next === todos);
console.log(next.at(0) === todos.at(0));
console.log(next.at(1) === todos.at(1));
~~~

~~~text الناتج
false true
false
true
false
~~~

- **[[todos.map(...)]]** بترجّع array جديدة دايمًا، فـ [[next === todos]] بـ [[false]].
- **[[todo.id === id ? { ...todo, ...changes } : todo]]:** الـ todo المطلوب بيتعمل منه object جديد فيه كل قديمه وفوقه التغييرات (آخر واحد بيكسب). الباقي بيترجع **هو نفسه** مش نسخة، فـ [[next.at(0) === todos.at(0)]] بـ [[true]] و [[next.at(1) === todos.at(1)]] بـ [[false]].
- **ليه نسيب الباقي زي ما هو؟** ده اللي React وأي مكتبة state بتعتمد عليه: تقارن بالـ reference ([[===]]) وتعرف أنهي عنصر بس اللي اتغيّر من غير ما تقارن كل خاصية.

**الغلطة الشائعة:** [[const t = todos.find(...); t.done = true; return [...todos];]]. الـ array جديدة بس الـ todo اللي جواها هو نفسه اتعدّل، فـ [[todos[1].done]] الأصلي بقى [[true]] كمان. الـ spread على الـ array بيعمل نسخة **سطحية**.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** إعدادات افتراضية [[{ theme: "light", notify: { email: true, sms: false } }]] وإعدادات اليوزر المحفوظة [[{ notify: { sms: true } }]]. ادمجهم بـ spread واطبع النتيجة.`, done: R`الدمج العادي طلّع [[notify: { sms: true }]] و [[email]] ضاعت، لأن الـ spread سطحي. بعد ما تدمج [[notify]] لوحدها كمان ([[notify: { ...defaults.notify, ...saved.notify }]]) طلع [[{ email: true, sms: true }]].`, sol: R`~~~js merge-settings.js
const defaults = { theme: "light", notify: { email: true, sms: false } };
const saved = { notify: { sms: true } };

const shallow = { ...defaults, ...saved };
console.log(shallow);

const merged = {
  ...defaults,
  ...saved,
  notify: { ...defaults.notify, ...saved.notify },
};
console.log(merged);
console.log(defaults.notify);
~~~

~~~text الناتج
{ theme: 'light', notify: { sms: true } }
{ theme: 'light', notify: { email: true, sms: true } }
{ email: true, sms: false }
~~~

**ليه [[email]] ضاعت في الأول:** الـ spread **سطحي** (shallow): بيحط كل مفتاح من المستوى الأول زي ما هو. [[saved]] فيها مفتاح [[notify]]، فقيمته ([[{ sms: true }]] كلها) حلّت محل [[notify]] بتاع الافتراضي كله، مش اتدمجت جواه.

**التصليح:** ادمج المستوى التاني بإيدك: [[notify: { ...defaults.notify, ...saved.notify }]]، وحطه **بعد** [[...saved]] عشان يكسب. وآخر سطر بيأكّد إن [[defaults.notify]] لسه زي ما هو.

**الغلطة الشائعة:** تفتكر إن الـ spread بيعمل deep merge لأن المستوى الأول اشتغل صح. لو الإعدادات فيها مستويات كتير، اكتب دالة [[deepMerge]] recursive أو استخدم مكتبة، ومتستخدمش [[structuredClone]] هنا: هي بتنسخ مش بتدمج.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[omit(obj, key)]] بسطر destructuring واحد فيه computed key و rest ([[const { [key]: _, ...rest } = obj]]). وبعدين عمّمها لـ [[omit(obj, ...keys)]]، واكتب العكس [[pick(obj, ...keys)]].`, done: R`[[omit({ a: 1, b: 2, c: 3 }, "a", "c")]] بترجّع [[{ b: 2 }]]، و [[pick({ a: 1, b: 2 }, "a", "z")]] بترجّع [[{ a: 1 }]] من غير [[z: undefined]]، والـ object الأصلي متغيّرش في الحالتين.`, sol: R`~~~js omit-pick.js
function omitOne(obj, key) {
  const { [key]: _, ...rest } = obj;
  return rest;
}

function omit(obj, ...keys) {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
}

function pick(obj, ...keys) {
  return Object.fromEntries(keys.filter((k) => Object.hasOwn(obj, k)).map((k) => [k, obj[k]]));
}

const src = { a: 1, b: 2, c: 3 };
console.log(omitOne(src, "b"));
console.log(omit(src, "a", "c"));
console.log(pick({ a: 1, b: 2 }, "a", "z"));
console.log(src);

// pick من غير فلتر: بتعمل z: undefined
const naive = (obj, ...keys) => Object.fromEntries(keys.map((k) => [k, obj[k]]));
console.log(naive({ a: 1, b: 2 }, "a", "z"));
~~~

~~~text الناتج
{ a: 1, c: 3 }
{ b: 2 }
{ a: 1 }
{ a: 1, b: 2, c: 3 }
{ a: 1, z: undefined }
~~~

- **[[const { [key]: _, ...rest } = obj]]:** المفتاح اللي اسمه في [[key]] (computed، بالأقواس) بيروح في متغير اسمه [[_]] (اسم متعارف عليه لـ «مش محتاجه»)، و [[...rest]] بياخد كل الباقي في object جديد. فده [[omit]] لمفتاح واحد في سطر.
- **[[omit(obj, ...keys)]]:** لأكتر من مفتاح الـ destructuring مش هينفع بعدد مش معروف، فبنمشي على [[Object.entries]] ونفلتر اللي مش في [[keys]] ونرجّعها بـ [[fromEntries]].
- **[[pick]]:** بنمشي على المفاتيح المطلوبة ونسيب اللي مش موجود فعلًا ([[Object.hasOwn(obj, k)]]).

**الغلطة الشائعة** في آخر سطر: [[pick]] من غير فلتر عملت [[z: undefined]]. شكلها بسيط بس بتفرق: [["z" in result]] بقت [[true]]، و [[JSON.stringify]] هتشيلها بس [[Object.keys]] هتعدّها. والـ [[src]] الأصلي متغيّرش في أي حالة: الـ rest والـ [[fromEntries]] بيعملوا objects جديدة.` }
          ],
          ref: [
            { t: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
            { t: "MDN: Spread syntax (...)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
          ],
          pre: [{ to: "js/array destructuring و spread", why: R`نفس الفكرة على الـ arrays بالترتيب، وهنا بالاسم`}, { to: "js/default و rest و spread", why: R`الـ default والـ rest في الـ parameters هما هما في الـ destructuring`}],
          flag: "script",
          deep: {
            why: R`بتقلل التكرار ([[user.name]] و [[user.email]] في كل سطر)، وبتخلي باراميترات الدوال والـ props في React واضحة من أول سطر. و [[...rest]] أنضف طريقة تشيل خاصية حساسة قبل ما تبعت الداتا.`,
            how: R`الـ destructuring بيدوّر على المفاتيح بالاسم (عكس الـ arrays بالترتيب). ولو المفتاح مش موجود القيمة undefined، والـ default بيشتغل.

التفكيك المتداخل [[{ address: { city } }]] بيعمل متغير [[city]] بس، مش [[address]]. ولو address نفسها undefined هيرمي TypeError، عشان كده [[= {}]].

الـ spread بينسخ الخصايص الخاصة بالـ object (own enumerable) بترتيبها، واللي بعده بيكتب فوقه. وهو shallow: [[updated.address]] هي نفس الـ object اللي في [[user.address]]. ومبينسخش getters كـ getters (بياخد قيمتها) ولا الـ prototype، فـ spread لـ instance من class بيطلّع object عادي من غير methods.`,
            when: R`في باراميترات الدوال والـ props، ولما تاخد جزء من رد API، ولما تعدّل state: [[setUser({ ...user, name })]]. وللقيم الافتراضية: [[{ ...defaults, ...options }]].`,
            mistakes: R`ترتيب الـ spread غلط فالـ defaults تمسح اختيارات اليوزر. وتفتكر إن [[{ ...user }]] نسخة عميقة وتعدّل [[copy.address.city]] فالأصل يتغير. وتفك من undefined فيرمي «Cannot destructure property 'x' of 'undefined' as it is undefined.». وتعمل [[const { password, ...rest }]] وتنسى إن [[password]] بقت متغير unused (عادي، أو سمّيه [[password: _]]).`
          },
          teach: R`## الفكرة في سطرين

**destructuring** يعني «فك»: بدل ما تكتب [[const name = user.name]] و [[const email = user.email]] كل واحدة في سطر، بتكتب الشكل اللي عايزه على الشمال و JS يطلّع القيم. و **spread** ([[...]]) العكس تقريبًا: بيفرد خصايص object جوه object جديد. كل النواتج تحت من تشغيل المثال في [[app.js]] بـ Node 24.

---

## ١. الـ object اللي هنفك منه

~~~text app.js
const user = { id: 1, name: "Sara", email: "s@example.com", password: "x" };
~~~

object عادي فيه ٤ خصايص، منهم [[password]] اللي مش عايزينها تطلع برّه.

---

## ٢. فك بسيط

~~~text app.js
const { name, email } = user;
~~~

لما [[{ }]] تيجي **على شمال** [[=]] معناها مش «اعمل object»، معناها «فك». JS بيدوّر في user على مفتاح اسمه name ويحطه في متغير اسمه name، ونفس الكلام لـ email. التدوير **بالاسم** مش بالترتيب: لو كتبت [[{ email, name }]] هتاخد نفس القيم.

~~~text الناتج: console.log(name, email)
Sara s@example.com
~~~

---

## ٣. تغيير الاسم والـ default

~~~text app.js
const { name: fullName, role = "user" } = user;
~~~

- [[name: fullName]]: اقرا المفتاح name، بس حطه في متغير اسمه **fullName**. اتعوّد تقراها «name ← fullName». ومفيش متغير اسمه name بيتعمل من السطر ده (وده كويس، لأن name معمول في السطر اللي فوق، ولو اتعمل تاني بـ const هيبقى SyntaxError).
- [[role = "user"]]: user مفيهوش role، فالقيمة كانت هتبقى undefined، و [[=]] هنا معناها «لو undefined خد دي».

~~~text الناتج: console.log(fullName, role)
Sara user
~~~

---

## ٤. [[...rest]]: لم الباقي

~~~text app.js
const { password, ...safeUser } = user;
~~~

[[password]] بيتفك لوحده، و [[...safeUser]] (لازم تكون الأخيرة) بتلم **كل اللي فضل** في object جديد:

~~~text الناتج: console.log(password, safeUser)
x { id: 1, name: 'Sara', email: 's@example.com' }
~~~

ده الشكل المعتاد عشان تشيل حقل حساس قبل ما ترجّع يوزر من API.

---

## ٥. spread: نسخة معدّلة

~~~text app.js
const updated = { ...user, name: "Sara Ali" };
~~~

هنا [[{ }]] **على يمين** [[=]]، يعني object جديد. و [[...user]] جواه معناها «انسخ كل خصايص user هنا»، وبعدين [[name: "Sara Ali"]] بتكتب فوق الـ name اللي اتنسخت:

~~~text الناتج: console.log(updated, user.name)
{ id: 1, name: 'Sara Ali', email: 's@example.com', password: 'x' } Sara
~~~

الأصل لسه [["Sara"]]: احنا معدّلناش user، عملنا object تاني.

---

## ٦. ترتيب الـ spread: الأخير بيكسب

~~~text app.js
const userSettings = { lang: "en" };
const settings = { theme: "light", lang: "ar", ...userSettings };
~~~

الـ object بيتبني من الشمال لليمين: theme بـ light، و lang بـ ar، وبعدين [[...userSettings]] بتحط lang بـ en فوق ar:

~~~text الناتج: console.log(settings)
{ theme: 'light', lang: 'en' }
~~~

ولو عكست وحطيت [[...userSettings]] في الأول:

~~~text الناتج
{ lang: 'ar', theme: 'light' }
~~~

اختيار اليوزر اتمسح. ولاحظ كمان إن lang بقت أول مفتاح: المفتاح بياخد مكانه من أول مرة اتحط فيها، والقيمة من آخر مرة.

---

## ٧. فك جوه باراميتر دالة

~~~text app.js
function show({ name, address: { city } = {} }) {
  return $__bt$__{name} من $__{city ?? "مكان مش معروف"}$__bt;
}
show(user);   // "Sara من مكان مش معروف"
~~~

نفكها من جوه لبرّه:

1. [[{ name, ... }]] مكان الباراميتر: الدالة بتاخد object وتفكه على طول.
2. [[address: { city }]]: فك متداخل. ادخل جوه address وطلّع city. المتغير اللي بيتعمل هو **city بس**، مفيش متغير اسمه address.
3. [[= {}]]: لو address مش موجودة، اعتبرها object فاضي. من غيرها جرّبت:

~~~text الناتج: نفس الدالة من غير = {}
TypeError: Cannot read properties of undefined (reading 'city')
~~~

4. [[city ?? "مكان مش معروف"]]: [[??]] (nullish coalescing) بترجّع اللي على اليمين لو الشمال null أو undefined بس.

~~~text الناتج
show(user)                                         →  Sara من مكان مش معروف
show({ name: "Omar", address: { city: "Cairo" } }) →  Omar من Cairo
show()                                             →  TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.
~~~

الأخيرة لأن مفيش object خالص يتفك. لو عايزها تشتغل، حط [[= {}]] للباراميتر كله كمان.

---

## الخلاصة

| الشكل | مكانه | معناه |
|---|---|---|
| [[const { a } = obj]] | شمال [[=]] | فك بالاسم |
| [[{ a: b }]] | شمال | اقرا a وسمّيه b |
| [[{ a = 1 }]] | شمال | default لو undefined |
| [[{ a, ...rest }]] | شمال | الباقي في object جديد |
| [[{ ...obj, a: 2 }]] | يمين | نسخة والأخير بيكسب |
| [[{ a: { b } = {} }]] | باراميتر | فك متداخل بأمان |

> الـ spread نسخة **سطحية**: لو جوه user فيه object تاني، النسخة والأصل بيشاوروا على نفس الـ object (الدرس الجاي).`,
          lines: [
            R`object فيه بيانات يوزر ومعاها [[password]]، ودي الخاصية اللي مش عايزينها تطلع في response ولا في log. هنستخدمه في كل السطور اللي جاية.`,
            R`destructuring: بيعمل متغيرين [[name]] و [[email]] وياخد قيمهم من الخصايص اللي بنفس الاسم في [[user]]، بدل سطرين [[const name = user.name]]. لو الاسم مش موجود في الـ object المتغير بيبقى [[undefined]] من غير error.`,
            R`[[name: fullName]] معناها «خد [[name]] وحطه في متغير اسمه [[fullName]]» (مفيدة هنا لأن [[name]] متعرّف في السطر اللي فوق). و [[role = "user"]] قيمة default اشتغلت لأن [[user]] مفيهوش [[role]]. الـ default بيشتغل مع [[undefined]] بس، مش مع [[null]].`,
            R`rest: [[password]] اتحط في متغير لوحده، و [[...safeUser]] لمّ كل الخصايص الباقية في object جديد. فـ [[safeUser]] فيه [[id]] و [[name]] و [[email]] من غير الباسورد، وده اللي تبعته للـ frontend. الـ [[...]] لازم تبقى آخر حاجة جوه الأقواس.`,
            R`spread: [[...user]] بينسخ كل خصايص [[user]] في object جديد، وبعدها [[name]] بتكتب فوق النسخة. الترتيب مهم: اللي بييجي بعد بيكسب. والأصل [[user]] متغيرش، وده اللي React محتاجه عشان يعرف إن الـ state اتغير.`,
            R`إعدادات اختارها اليوزر، وفيها اللغة بس. هنحطها فوق الإعدادات الافتراضية في السطر الجاي.`,
            R`الـ defaults الأول وبعدها [[...userSettings]]: أي مفتاح موجود في الاتنين بياخد قيمة اللي بعده، فـ [[lang]] بقت [["en"]] و [[theme]] فضلت [["light"]]. لو عكست الترتيب اختيارات اليوزر هتتداس تحت الـ defaults.`,
            R`الدالة بتفك الـ object اللي جايلها في الباراميتر نفسه: [[name]] من أول مستوى، و [[address: { city }]] بتدخل جوه [[address]] وتطلّع [[city]] بس ([[address]] نفسها مش بتبقى متغير). و [[= {}]] بتحمي من إن [[address]] تكون ناقصة: من غيرها هيحاول يفك [[undefined]] ويرمي TypeError.`,
            R`[[city]] هنا [[undefined]] لأن مفيش address، فـ [[??]] بتحط النص البديل. [[??]] بتشتغل مع [[null]] و [[undefined]] بس، عكس [[||]] اللي بتعتبر [[""]] و [[0]] فاضيين وتستبدلهم برضه.`,
            R`نهاية [[show]].`,
            R`بنبعت [[user]] كله والدالة بتاخد منه اللي محتاجاه بس. مفيش [[address]] فالـ [[= {}]] اشتغلت و [[city]] طلعت [[undefined]]، والناتج [["Sara من مكان مش معروف"]] من غير أي error.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، خمّن: [[const cart = { items: ["mug"] }; const copy = { ...cart }; copy.items.push("cap");]] وبعدها اطبع [[cart.items]] و [[copy === cart]] و [[copy.items === cart.items]].`, done: R`[[cart.items]] بيطبع [[[ 'mug', 'cap' ] ]] (الأصل اتغيّر)، و [[copy === cart]] بترجّع [[false]] بس [[copy.items === cart.items]] بترجّع [[true]]: النسخة جديدة والـ array اللي جواها مشتركة.`, sol: R`~~~js shared-items.js
const cart = { items: ["mug"] };
const copy = { ...cart };
copy.items.push("cap");

console.log(cart.items);
console.log(copy === cart);
console.log(copy.items === cart.items);
~~~

~~~text الناتج
[ 'mug', 'cap' ]
false
true
~~~

~~~text الرسمة بعد السطر التاني
[ cart ] ──> { items: ─┐ }
                       ├──> [ "mug", "cap" ]
[ copy ] ──> { items: ─┘ }
~~~

- **[[{ ...cart }]]** عمل object **جديد** (فـ [[copy === cart]] بـ [[false]])، بس نسخ قيمة [[items]] زي ما هي، والقيمة دي reference لنفس الـ array.
- **[[copy.items.push("cap")]]** عدّلت الـ array المشتركة، فبانت من [[cart.items]] كمان، و [[copy.items === cart.items]] بـ [[true]].

**الغلطة الشائعة:** «عملت نسخة بالـ spread يبقى أمان». الـ spread بيحمي المستوى الأول بس. لو هتعدّل حاجة جوه، انسخها هي كمان ([[{ ...cart, items: [...cart.items] }]]) أو استخدم [[structuredClone(cart)]].` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[addTag(user, tag)]] بترجّع user جديد فيه الـ tag زيادة في [[tags]]، من غير ما تلمس الأصل: spread على الـ object وعلى الـ array اللي جواه.`, done: R`بعد [[const u2 = addTag(u1, "vip")]]: [[u1.tags]] لسه زي ما كانت، و [[u2.tags]] فيها [["vip"]] في الآخر، و [[u2.tags === u1.tags]] بترجّع [[false]].`, sol: R`~~~js add-tag.js
function addTag(user, tag) {
  return { ...user, tags: [...user.tags, tag] };
}

const u1 = { name: "Sara", tags: ["new"] };
const u2 = addTag(u1, "vip");

console.log(u1.tags);
console.log(u2.tags);
console.log(u2.tags === u1.tags);

// الغلطة: spread على الـ object بس
const wrong = (user, tag) => {
  const copy = { ...user };
  copy.tags.push(tag);
  return copy;
};
const u3 = wrong(u1, "gold");
console.log(u1.tags, u3.tags === u1.tags);
~~~

~~~text الناتج
[ 'new' ]
[ 'new', 'vip' ]
false
[ 'new', 'gold' ] true
~~~

- **[[{ ...user, tags: [...user.tags, tag] }]]:** نسختين في سطر: الـ object الخارجي جديد، و [[tags]] array جديدة فيها القديم وبعده الـ tag. فـ [[u2.tags === u1.tags]] بـ [[false]] و [[u1.tags]] زي ما كانت.
- **مفيش [[push]]:** [[push]] بتعدّل الـ array في مكانها. الـ spread جوه [[[ ]]] بيعمل array جديدة.

**الغلطة الشائعة** (الدالة [[wrong]] في آخر الكود): spread على الـ object بس وبعدين [[copy.tags.push]]. النتيجة إن [[u1.tags]] نفسها بقت فيها [["gold"]]، و [[u3.tags === u1.tags]] بـ [[true]]. القاعدة: كل مستوى هتعدّل فيه لازم يتنسخ.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const DEFAULTS = { tags: [] }; const makeUser = (name) => ({ ...DEFAULTS, name });]]. اعمل يوزرين وزوّد [["vip"]] في tags الأول بس، واطبع tags التاني.`, done: R`قبل التصليح التاني كمان فيه [[["vip"]]] لأن الاتنين شايلين نفس الـ array. بعد [[tags: []]] جديدة جوه makeUser (أو [[tags: [...DEFAULTS.tags]]]) التاني بيفضل [[[]]].`, sol: R`~~~js defaults-bug.js
const DEFAULTS = { tags: [] };

const makeUserBroken = (name) => ({ ...DEFAULTS, name });
const a = makeUserBroken("Ali");
const b = makeUserBroken("Mona");
a.tags.push("vip");
console.log("broken:", b.tags, a.tags === b.tags, DEFAULTS.tags);

DEFAULTS.tags.length = 0; // نرجّع الـ DEFAULTS فاضية بعد البوظان
const makeUser = (name) => ({ ...DEFAULTS, name, tags: [...DEFAULTS.tags] });
const c = makeUser("Ali");
const d = makeUser("Mona");
c.tags.push("vip");
console.log("fixed:", d.tags, c.tags === d.tags, DEFAULTS.tags);
~~~

~~~text الناتج
broken: [ 'vip' ] true [ 'vip' ]
fixed: [] false []
~~~

**الباج:** [[{ ...DEFAULTS, name }]] نسخت [[tags]] كـ reference. فكل يوزر بيتعمل شايل **نفس** الـ array اللي في [[DEFAULTS]]. [[a.tags.push("vip")]] عدّلت الـ array الوحيدة دي، فبانت في [[b]] وفي [[DEFAULTS]] نفسها (أي يوزر هيتعمل بعد كده هيبدأ بـ [["vip"]]).

**التصليح:** كل نداء يعمل array جديدة: [[tags: [...DEFAULTS.tags]]] بعد الـ spread (أو [[tags: []]] لو الافتراضي دايمًا فاضي). السطر ده بييجي **بعد** [[...DEFAULTS]] عشان يكسب.

**ليه الباج ده خطير:** مبيطلّعش error، وبيظهر بس لما يوزر تاني يتعمل، وغالبًا في مكان بعيد عن السطر الغلط. نفس الشيء مع [[function f(list = SHARED)]] أو object افتراضي متشارك بين components.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[deepCopy(value)]] بنفسك بـ recursion: لو array انسخ كل عنصر، ولو object انسخ كل مفتاح، ولو Date اعمل Date جديدة بنفس الوقت، وغير كده رجّع القيمة زي ما هي. قارنها بـ [[structuredClone]].`, done: R`[[deepCopy({ a: { b: [1] } })]] لما تعدّل [[a.b]] في النسخة الأصل مبيتغيرش، و [[deepCopy({ d: new Date(0) }).d instanceof Date]] بترجّع [[true]] و [[.getTime()]] بتاعها [[0]]، ونفس النتايج بتطلع من [[structuredClone]].`, sol: R`~~~js deep-copy.js
function deepCopy(value) {
  if (Array.isArray(value)) return value.map(deepCopy);
  if (value instanceof Date) return new Date(value.getTime());
  if (value !== null && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepCopy(v);
    return out;
  }
  return value;
}

const original = { a: { b: [1] } };
const mine = deepCopy(original);
const native = structuredClone(original);
mine.a.b.push(2);
native.a.b.push(3);
console.log(original.a.b, mine.a.b, native.a.b);

const d1 = deepCopy({ d: new Date(0) }).d;
const d2 = structuredClone({ d: new Date(0) }).d;
console.log(d1 instanceof Date, d1.getTime(), d2 instanceof Date, d2.getTime());

console.log(deepCopy(null), deepCopy(5), deepCopy("hi"));
~~~

~~~text الناتج
[ 1 ] [ 1, 2 ] [ 1, 3 ]
true 0 true 0
null 5 hi
~~~

**الترتيب جوه [[deepCopy]] مهم:**

1. **[[Array.isArray]] الأول:** الـ array نوعها [["object"]] برضه، فلو اتسألت بعد شرط الـ object كانت هتتحوّل لـ object بمفاتيح [["0"]] و [["1"]]. [[value.map(deepCopy)]] بتنسخ كل عنصر بنفس الدالة (recursion).
2. **[[Date]] قبل الـ object:** الـ Date ملهاش مفاتيح خاصة، فـ [[Object.entries]] كانت هترجّع [[{}]]. [[new Date(value.getTime())]] بتعمل تاريخ جديد بنفس اللحظة.
3. **[[value !== null && typeof value === "object"]]:** [[typeof null]] بيطلع [["object"]] (غلطة قديمة في اللغة)، فلازم نستبعده.
4. **أي حاجة تانية** (رقم ونص و [[null]]) primitive، بترجع زي ما هي لأنها مش بتتعدّل.

**المقارنة:** النسختين اتصرفوا زي بعض في الحالات دي (الأصل فضل [[[ 1 ]]]). الفرق إن [[structuredClone]] بتعرف كمان Map و Set والـ references الدايرية ([[a.self = a]]) اللي [[deepCopy]] دي هتلف فيها لحد [[RangeError: Maximum call stack size exceeded]]. في الشغل الحقيقي استخدم [[structuredClone]]، واكتب دي عشان تفهم هي بتعمل إيه.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** انسخ [[{ d: new Date(0), m: new Map([ [1, 2] ]), u: undefined }]] مرة بـ [[JSON.parse(JSON.stringify(x))]] ومرة بـ [[structuredClone(x)]]، واطبع النسختين و [[typeof]] لـ [[d]].`, done: R`نسخة JSON: [[d]] بقت string [["1970-01-01T00:00:00.000Z"]]، و [[m]] بقت [[{}]]، و [[u]] اختفت. نسخة structuredClone: [[d instanceof Date]] true و [[m]] لسه Map فيها [[1 => 2]] و [[u]] موجودة.`, sol: R`~~~js json-vs-clone.js
const x = { d: new Date(0), m: new Map([[1, 2]]), u: undefined };

const viaJson = JSON.parse(JSON.stringify(x));
const viaClone = structuredClone(x);

console.log(viaJson);
console.log(typeof viaJson.d, "u" in viaJson);

console.log(viaClone);
console.log(viaClone.d instanceof Date, viaClone.m.get(1), "u" in viaClone);

try {
  structuredClone({ f() {} });
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~text الناتج
{ d: '1970-01-01T00:00:00.000Z', m: {} }
string false
{ d: 1970-01-01T00:00:00.000Z, m: Map(1) { 1 => 2 }, u: undefined }
true 2 true
DataCloneError: f() {} could not be cloned.
~~~

**اللي ضاع في نسخة JSON:**

| القيمة | بعد [[JSON.parse(JSON.stringify(x))]] | بعد [[structuredClone(x)]] |
|---|---|---|
| [[Date]] | نص ISO ([[typeof]] = [["string"]]) | [[Date]] حقيقية |
| [[Map]] | [[{}]] فاضي، الداتا راحت | [[Map]] فيها [[1 => 2]] |
| [[undefined]] | المفتاح اختفى | موجود |

- **ليه:** [[JSON.stringify]] بتحوّل لنص JSON، والـ JSON مفيهوش غير نصوص وأرقام و [[true]]/[[false]]/[[null]] وarrays وobjects. أي حاجة تانية بتتحوّل أو تضيع، ومن غير error.
- **[[structuredClone]]** بتنسخ القيم نفسها بالخوارزمية اللي المتصفح بيستخدمها في [[postMessage]].
- **آخر سطر:** [[structuredClone]] مبتنسخش الدوال، وبترمي [[DataCloneError]]. يعني object فيه methods أو class instance بيرجع object عادي أو بيقع.

**الغلطة الشائعة:** [[JSON.parse(JSON.stringify(x))]] كـ «deep copy» لأنها اشتغلت على objects بسيطة. أول ما يدخل تاريخ أو Map الباج بيظهر بعيد.` }
          ],
          ref: [
            { t: "MDN: structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone" },
            { t: "MDN: Shallow copy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy" },
            { t: "MDN: Deep copy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy" },
            { t: "MDN: Spread syntax (...)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
          ],
          pre: [{ to: "js/primitives و objects", why: R`ليه [[a = b]] بتخلي متغيرين يشاوروا على نفس الـ object`}],
          flag: "script",
          deep: {
            why: R`أشهر مصدر bugs غريبة: «أنا معدّلتش الليستة دي!» بس عدّلت نسخة شايلة نفس الـ reference. وفي React الـ state لازم تتعمل جديدة، لأن React بيقارن بالـ reference ([[Object.is]])، فلو عدّلت في مكانها مش هيعمل render.`,
            how: R`الـ primitives بتتنسخ بالقيمة، والـ objects (ومنها arrays والدوال) بتتنسخ بالـ reference. JS دايمًا pass by value، بس «القيمة» في حالة الـ object هي الـ reference نفسه. عشان كده الدالة تقدر تعدّل جوه الـ object، بس لو عملت [[obj = {}]] جوه الدالة المتغير اللي برّه مش هيتأثر.

[[structuredClone]] بتستخدم نفس الخوارزمية اللي بتنقل الداتا بين workers: بتنسخ Date و Map و Set و RegExp و arrays متداخلة، وبتتعامل مع المراجع الدائرية (circular). ومبتنسخش الدوال ولا عناصر الـ DOM ولا الـ prototype (instance من class بترجع object عادي).

[[JSON.parse(JSON.stringify(x))]] الحل القديم: بيضيّع undefined والدوال، والـ Date بتبقى string، و NaN بتبقى null، ويقع على circular.`,
            when: R`نسخة سطحية للتعديل على المستوى الأول (أغلب تعديلات الـ state). [[structuredClone]] لما محتاج نسخة مستقلة تمامًا من داتا متداخلة. وفي React مع state متداخلة كبيرة ناس بتستخدم Immer.`,
            mistakes: R`تعمل [[const copy = original]] وتفتكرها نسخة. وتعدّل object اتبعتلك كـ argument (دالة بتعدّل مدخلاتها اسمها impure، وده صعب تتبّعه). وتستخدم JSON للنسخ العميق مع Dates. وفي الانترفيو: «pass by value ولا reference؟» و «shallow vs deep copy».`
          },
          teach: R`## الفكرة في سطرين

المتغير اللي فيه object مش شايل الـ object نفسه، شايل **reference**: عنوان بيقول «الـ object موجود هناك في الذاكرة». فلو نسخت المتغير، نسخت العنوان، والاتنين بيشاوروا على نفس الحاجة. المثال بيوري ٤ حالات: نسخ العنوان، ونسخة سطحية، ونسخة عميقة، ودالة بتعدّل اللي اتبعتلها. النواتج من تشغيله في Node 24.

---

## ١. [[const b = a]]: مش نسخة

~~~text app.js
const a = { name: "Sara", tags: ["js"] };
const b = a;
b.name = "Omar";
console.log(a.name);            // "Omar"
~~~

السطر التاني مبيعملش object جديد. فيه object **واحد** في الذاكرة، وعليه اسمين: a و b.

~~~text الناتج
Omar
a === b  →  true
~~~

[[===]] على objects بتسأل «نفس العنوان؟» مش «نفس المحتوى؟»، وهنا الجواب true.

---

## ٢. [[{ ...a }]]: نسخة سطحية (shallow)

~~~text app.js
const shallow = { ...a };
shallow.tags.push("ts");
console.log(a.tags);            // ["js", "ts"]
~~~

[[{ ...a }]] عملت object **جديد** ونسخت فيه خصايص a واحدة واحدة. بس قيمة tags نفسها reference لـ array، فاللي اتنسخ هو العنوان:

~~~text الناتج
shallow === a            →  false
shallow.tags === a.tags  →  true
a.tags بعد push          →  [ 'js', 'ts' ]
~~~

يعني المستوى الأول جديد (لو عملت [[shallow.name = "Mona"]] الأصل مش هيتأثر، جرّبتها و a.name فضلت Omar)، بس أي حاجة جوه مشتركة. و [[Object.assign({}, a)]] بتعمل نفس الحاجة بالظبط (tags برضه طلعت مشتركة).

---

## ٣. [[structuredClone(a)]]: نسخة عميقة (deep)

~~~text app.js
const deep = structuredClone(a);
deep.tags.push("react");
console.log(a.tags);            // ["js", "ts"]
~~~

[[structuredClone]] دالة جاهزة في المتصفحات و Node، بتنسخ كل مستوى، فالـ array اللي جوه بقت array جديدة:

~~~text الناتج
deep.tags === a.tags  →  false
a.tags                →  [ 'js', 'ts' ]
deep.tags             →  [ 'js', 'ts', 'react' ]
~~~

---

## ٤. objects بنفس المحتوى مش متساويين

~~~text app.js
console.log({ x: 1 } === { x: 1 }); // false
~~~

كل [[{ }]] بتعمل object جديد بعنوان جديد. المحتوى نفسه، بس العنوانين مختلفين، فالناتج [[false]].

---

## ٥. دالة بتعدّل اللي اتبعتلها

~~~text app.js
function rename(obj) { obj.name = "X"; }
rename(a);
console.log(a.name);            // "X"
~~~

لما بتنادي [[rename(a)]]، الباراميتر obj بياخد **نسخة من العنوان**، فـ obj و a بيشاوروا على نفس الـ object، والتعديل باين برّه. الناتج [[X]].

بس لو جوه الدالة غيّرت الباراميتر نفسه لـ object تاني:

~~~text app.js
function replace(obj) { obj = { name: "new" }; }
replace(a);
~~~

a.name فضلت [[X]]: انت غيّرت النسخة المحلية من العنوان، مش الـ object. عشان كده بنقول JS دايمًا **pass by value**، والقيمة في حالة الـ object هي العنوان.

---

## ٦. حدود structuredClone و JSON

~~~text الناتج: Node 24
structuredClone({ date: new Date(), fn() {} })
DataCloneError: fn() {} could not be cloned.
~~~

الدوال مبتتنسخش، فبيرمي error صريح. من غير fn، الـ Date بترجع Date حقيقية ([[instanceof Date]] بـ true). والطريقة القديمة:

~~~text الناتج
JSON.parse(JSON.stringify({ date: new Date("2026-01-01"), fn() {}, u: undefined, n: NaN }))
{ date: '2026-01-01T00:00:00.000Z', n: null }    typeof date → string
~~~

fn و u اختفوا من غير ما حد يقولك، والـ Date بقت string، و NaN بقت null.

---

## الخلاصة

| الكود | object جديد؟ | اللي جوه مشترك؟ |
|---|---|---|
| [[const b = a]] | لأ | كله مشترك |
| [[{ ...a }]] / [[Object.assign({}, a)]] | أيوه | أيوه |
| [[structuredClone(a)]] | أيوه | لأ (ومبينسخش الدوال) |
| [[JSON.parse(JSON.stringify(a))]] | أيوه | لأ، بس بيبوّظ Date و undefined و NaN |

> [[===]] على objects بتقارن العناوين، مش المحتوى.`,
          lines: [
            R`object فيه string ([[name]]) وجواه array ([[tags]]). وجود الـ array جوه الـ object هو اللي هيبيّن الفرق بين النسخة السطحية والعميقة تحت.`,
            R`ده مش نسخ. المتغير في JS مش شايل الـ object نفسه، شايل reference (عنوانه)، فـ [[b]] بقى بيشاور على نفس الـ object اللي [[a]] بيشاور عليه: object واحد في الميموري وليه اسمين.`,
            R`بنعدّل [[name]] عن طريق [[b]]. ولأن مفيش غير object واحد، التعديل حصل في الحاجة اللي [[a]] شايفها برضه.`,
            R`بيطبع [["Omar"]] رغم إننا عمرنا ما لمسنا [[a]]. ده من أشهر الـ bugs: تفتكر إنك عملت نسخة وتعدّل فيها، فالأصل يتغيّر من وراك في حتة تانية في الكود.`,
            R`[[{ ...a }]] بتعمل object جديد فعلًا، بس بتنسخ أول مستوى بس: [[name]] string فاتنسخ، لكن [[tags]] reference فالنسخة بتشاور على نفس الـ array بتاع الأصل. ده اسمه shallow copy، و [[Object.assign]] بتعمل نفس الحاجة.`,
            R`بنضيف لـ [[tags]] عن طريق النسخة. [[push]] بتعدّل الـ array نفسه مش بتعمل array جديد، والـ array ده مشترك بين [[shallow]] و [[a]].`,
            R`[[a.tags]] بقت فيها [["ts"]]: التعديل وصل للأصل لأن الـ array اللي جوه مكانش اتنسخ. الحل لو عايز تعدّل حاجة متداخلة: اعمل array جديد للمستوى ده كمان، زي [[{ ...a, tags: [...a.tags, "ts"] }]].`,
            R`[[structuredClone]] بتعمل deep copy: بتنسخ كل المستويات، فالـ object والـ array اللي جواه كلهم جداد. مدمجة في المتصفح و Node، وبتعرف تنسخ Date و Map و Set، بس بترمي [[DataCloneError]] لو جوه الـ object دالة.`,
            R`بنضيف [["react"]] للـ [[tags]] بتاعة النسخة العميقة. المرة دي الـ array ده نسخة مستقلة، مش هو هو اللي في [[a]].`,
            R`الأصل لسه [["js", "ts"]] من غير [["react"]]: النسخة العميقة مالهاش أي علاقة بالأصل، فعدّل فيها براحتك.`,
            R`[[===]] مع الـ objects بتقارن الـ reference، يعني بتسأل «ده نفس الـ object؟» مش «نفس المحتوى؟». هنا فيه object-ين اتعملوا كل واحد لوحده، فالنتيجة [[false]]. عشان تقارن المحتوى لازم تقارن الخصايص بنفسك.`,
            R`دالة بتغيّر خاصية في الـ object اللي جالها. الباراميتر [[obj]] بياخد نسخة من الـ reference مش من الـ object، يعني بيشاور على نفس الـ object اللي اتبعت.`,
            R`بنبعت [[a]] للدالة. مفيش نسخ بيحصل وقت النداء: الدالة شغالة على نفس الـ object بالظبط.`,
            R`[[a.name]] بقى [["X"]]: الدالة عدّلت الأصل. عشان كده الدوال اللي بتاخد objects (زي الـ reducers في React) المفروض ترجّع object جديد بدل ما تعدّل اللي جالها.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** من [[const stock = { mug: 5, cap: 0, shirt: 2 }]] اطبع عدد المنتجات بـ [[Object.keys]]، ومجموع القطع بـ [[Object.values]] و [[reduce]].`, done: R`العدد [[3]] والمجموع [[7]]، والكود بيشتغل من غير تعديل لو زوّدت منتج رابع في الـ object.`, sol: R`~~~js stock.js
const stock = { mug: 5, cap: 0, shirt: 2 };

const count = Object.keys(stock).length;
const pieces = Object.values(stock).reduce((sum, n) => sum + n, 0);
console.log(count, pieces);

stock.hat = 4;
console.log(Object.keys(stock).length, Object.values(stock).reduce((sum, n) => sum + n, 0));
~~~

~~~text الناتج
3 7
4 11
~~~

- **[[Object.keys(stock).length]]:** الـ object مالوش [[length]]، فبنطلّع مفاتيحه كـ array ونعدّها.
- **[[Object.values(stock).reduce((sum, n) => sum + n, 0)]]:** القيم بس ([[[5, 0, 2]]])، وبعدين نجمعهم. الـ [[0]] في الآخر هو قيمة البداية: من غيرها object فاضي هيرمي [[TypeError: Reduce of empty array with no initial value]].
- **زوّدنا [[hat: 4]]** والسطر نفسه طلّع 4 و 11 من غير ما نغيّر حاجة، لأن الكود مش كاتب أسامي المنتجات.

**الغلطة الشائعة:** [[stock.length]] بيطلع [[undefined]]، أو [[for...in]] من غير ما تاخد بالك إنها بتلف كمان على المفاتيح الموروثة. [[Object.keys]] و [[values]] بيرجّعوا المفاتيح الخاصة بالـ object بس.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[Object.keys({ b: 1, 2: "x", a: 2, 1: "y" })]] بترجّع إيه وبأنهي ترتيب؟`, done: R`طلع [[["1", "2", "b", "a"]]]: المفاتيح اللي شكلها أرقام بتيجي الأول متربة تصاعدي، وبعدها النصوص بترتيب الإضافة، وكلهم strings. فمتعتمدش على ترتيب object فيه ids رقمية.`, sol: R`~~~js key-order.js
const keys = Object.keys({ b: 1, 2: "x", a: 2, 1: "y" });
console.log(keys);
console.log(keys.map((k) => typeof k));

const byId = { 30: "c", 10: "a", 20: "b" };
console.log(Object.values(byId));
~~~

~~~text الناتج
[ '1', '2', 'b', 'a' ]
[ 'string', 'string', 'string', 'string' ]
[ 'a', 'b', 'c' ]
~~~

**قاعدة الترتيب (من المواصفة، مش صدفة):**

1. المفاتيح اللي شكلها index صحيح ([["1"]] و [["2"]] و [["10"]]) الأول، **متربة تصاعدي** مهما كان ترتيب كتابتها.
2. بعدها باقي النصوص **بترتيب الإضافة** ([["b"]] ثم [["a"]]).
3. (وفي الآخر الـ Symbols، بس [[Object.keys]] مبترجّعهاش).

وكل المفاتيح [["string"]]، حتى اللي كتبتها رقم. والمثال التاني بيوضح الفخ: ids رقمية اتكتبت 30 ثم 10 ثم 20 وطلعت مترتبة 10 و 20 و 30. لو الترتيب مهم (لستة مرتبة بالأحدث مثلًا) استخدم array أو [[Map]]، لأن الـ Map بتحافظ على ترتيب الإضافة لأي نوع مفتاح.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك درجات [[{ sara: 85, omar: 42, ali: 67 }]]. طلّع object فيه الناجحين بس (٥٠ أو أكتر) بـ entries و filter و fromEntries، وطلّع اسم أعلى واحد بـ [[Object.entries]] و [[reduce]].`, done: R`الناجحين [[{ sara: 85, ali: 67 }]]، وأعلى واحد [["sara"]]، والـ object الأصلي لسه فيه [[omar]].`, sol: R`~~~js grades.js
const grades = { sara: 85, omar: 42, ali: 67 };

const passed = Object.fromEntries(
  Object.entries(grades).filter(([, score]) => score >= 50)
);
console.log(passed);

const [topName] = Object.entries(grades).reduce((best, cur) => (cur[1] > best[1] ? cur : best));
console.log(topName);
console.log(grades);
~~~

~~~text الناتج
{ sara: 85, ali: 67 }
sara
{ sara: 85, omar: 42, ali: 67 }
~~~

- **الناجحين:** [[Object.entries(grades)]] بترجّع [[[["sara", 85], ["omar", 42], ["ali", 67]]]]. [[filter(([, score]) => score >= 50)]] بتفك كل زوج وتتجاهل الاسم (الفاصلة في الأول معناها «سيب أول عنصر»)، و [[Object.fromEntries]] بترجّع الأزواج اللي فضلت object.
- **الأعلى:** [[reduce]] شايلة أحسن زوج لحد دلوقتي في [[best]] وبتبدّله لو [[cur[1]]] أكبر. من غير قيمة بداية، فأول زوج هو البداية. وفي الآخر [[const [topName] = ...]] بتاخد الاسم من الزوج.
- **[[grades]]** لسه فيها [[omar]]: الـ entries نسخة، والـ [[filter]] على النسخة.

**الغلطة الشائعة:** [[Math.max(...Object.values(grades))]] بتديك 85 بس من غير الاسم، فتضطر تدوّر تاني. والـ entries بتشيل الاتنين مع بعض.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[mapValues(obj, fn)]] بتطبّق fn على كل قيمة وترجّع object جديد بنفس المفاتيح، بـ entries و map و fromEntries. جرّبها بخصم ١٠٪ على قايمة أسعار.`, done: R`[[mapValues({ mug: 100, cap: 50 }, (p) => p * 0.9)]] بترجّع [[{ mug: 90, cap: 45 }]]، والـ object الأصلي لسه 100 و 50.`, sol: R`~~~js map-values.js
function mapValues(obj, fn) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
}

const prices = { mug: 100, cap: 50 };
const sale = mapValues(prices, (p) => p * 0.9);
console.log(sale);
console.log(prices);
console.log(mapValues({ a: 1 }, (v, k) => k + v));
~~~

~~~text الناتج
{ mug: 90, cap: 45 }
{ mug: 100, cap: 50 }
{ a: 'a1' }
~~~

- **الوصفة:** [[entries]] ← [[map]] على الأزواج ← [[fromEntries]]. ده الشكل اللي بتعمل بيه أي «map على object»، لأن الـ object نفسه مالوش [[map]].
- **[[([k, v]) => [k, fn(v, k)]]]:** بنفك الزوج، ونرجّع زوج جديد بنفس المفتاح وقيمة جديدة. وبعتنا [[k]] لـ [[fn]] كمان، فينفع تستخدم اسم المفتاح (آخر سطر).
- **[[prices]] زي ما هو** لأن كل خطوة بترجّع حاجة جديدة.

**تنبيه:** [[100 * 0.9]] طلعت 90 بالظبط هنا، بس أسعار تانية ممكن تطلع زي [[44.99999]] (درس «number و NaN»). للفلوس قرّب بـ [[Math.round(p * 0.9 * 100) / 100]] أو احسب بالقروش.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اكتب [[groupBy(items, key)]] بترجّع object كل مفتاح فيه array العناصر اللي ليها القيمة دي (مثلًا منتجات مجمّعة بالـ [[category]]). وبعدين قارنها بـ [[Object.groupBy(items, (i) => i.category)]] اللي في Node 21 والمتصفحات الحديثة.`, done: R`الاتنين بيرجّعوا نفس المفاتيح ونفس الـ arrays بنفس الترتيب ([[JSON.stringify]] بتاعهم واحد)، و Node بيطبع بتاع [[Object.groupBy]] [[[Object: null prototype] ]] لأنه object مالوش prototype، فـ [[toString]] مش موجودة عليه.`, sol: R`~~~js group-by.js
function groupBy(items, key) {
  const out = {};
  for (const item of items) {
    const k = item[key];
    (out[k] ??= []).push(item);
  }
  return out;
}

const items = [
  { name: "Mug", category: "kitchen" },
  { name: "Cap", category: "clothes" },
  { name: "Plate", category: "kitchen" },
  { name: "Shirt", category: "clothes" },
];

const mine = groupBy(items, "category");
const native = Object.groupBy(items, (i) => i.category);

console.log(JSON.stringify(mine) === JSON.stringify(native));
console.log(mine.kitchen.map((i) => i.name), native.clothes.map((i) => i.name));
console.log(Object.getPrototypeOf(native), typeof native.toString);
console.log(native);
~~~

~~~text الناتج
true
[ 'Mug', 'Plate' ] [ 'Cap', 'Shirt' ]
null undefined
[Object: null prototype] {
  kitchen: [
    { name: 'Mug', category: 'kitchen' },
    { name: 'Plate', category: 'kitchen' }
  ],
  clothes: [
    { name: 'Cap', category: 'clothes' },
    { name: 'Shirt', category: 'clothes' }
  ]
}
~~~

- **[[(out[k] ??= []).push(item)]]:** لو مفيش array للمفتاح ده لسه، اعمل واحدة ([[??=]] بتكتب بس لو القيمة [[null]] أو [[undefined]])، وبعدين زوّد العنصر. سطر واحد بدل [[if]].
- **المقارنة:** [[JSON.stringify]] للاتنين طلع واحد، فالمفاتيح والـ arrays والترتيب متطابقين. الفرق إن [[Object.groupBy]] بتاخد **دالة**، فتقدر تجمّع بحاجة محسوبة ([[(p) => p.price > 100 ? "غالي" : "رخيص"]]) مش مفتاح موجود بس.
- **[[[Object: null prototype] ]]:** الـ object اللي [[Object.groupBy]] بترجّعه معمول بـ [[Object.create(null)]]، فـ [[Object.getPrototypeOf]] بـ [[null]] و [[toString]] مش عليه. ده مقصود: لو فيه قسم اسمه [["constructor"]] أو [["toString"]] مش هيتلخبط مع خصايص موروثة.

**الغلطة الشائعة:** [[String(result)]] أو [[$__bt$__{result}$__bt]] على ناتج [[Object.groupBy]] بيرمي [[TypeError: Cannot convert object to primitive value]]. اطبعه بـ [[console.log]] أو [[JSON.stringify]]. و [[Object.groupBy]] محتاجة Node 21 أو متصفح من ٢٠٢٤ وطالع.` }
          ],
          ref: [
            { t: "MDN: Object.keys()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys" },
            { t: "MDN: Object.values()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values" },
            { t: "MDN: Object.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries" },
            { t: "MDN: Object.fromEntries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries" },
            { t: "MDN: Object.groupBy()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy" },
          ],
          pre: [{ to: "js/map و filter و reduce", why: R`الـ entries array، وكل الحساب عليها بالتلات دول`}, { to: "js/for...of و for...in", why: R`ليه [[for...in]] بتلف على مفاتيح موروثة و [[Object.keys]] لأ`}],
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
          teach: R`## الفكرة في سطرين

الـ array عندها map و filter و for...of، والـ object معندوش. الحل: حوّل الـ object لـ array بـ [[Object.keys]] أو [[Object.values]] أو [[Object.entries]]، اشتغل عليها، ولو محتاج ترجع object استخدم [[Object.fromEntries]]. النواتج من تشغيل المثال في Node 24.

---

## ١. التلات دوال

~~~text app.js
const prices = { mug: 120, shirt: 300, cap: 90 };
Object.keys(prices);
Object.values(prices);
Object.entries(prices);
~~~

[[Object]] هنا مش object بتاعك، ده الـ constructor الجاهز في JS، وعليه دوال مساعدة بتاخد الـ object كـ argument.

~~~text الناتج
[ 'mug', 'shirt', 'cap' ]
[ 120, 300, 90 ]
[ [ 'mug', 120 ], [ 'shirt', 300 ], [ 'cap', 90 ] ]
~~~

- keys: المفاتيح (strings دايمًا).
- values: القيم.
- entries: array، كل عنصر فيها array صغيرة من اتنين [[[key, value]]]. ودي اسمها «أزواج» (pairs).

---

## ٢. اللف على الأزواج

~~~text app.js
for (const [item, price] of Object.entries(prices)) {
  console.log(item, price);
}
~~~

[[for...of]] بتلف على عناصر الـ array، وكل عنصر هو [[["mug", 120]]]. و [[[item, price]]] هنا **array destructuring**: أول عنصر في item، والتاني في price.

~~~text الناتج
mug 120
shirt 300
cap 90
~~~

---

## ٣. تعديل كل القيم: entries ← map ← fromEntries

~~~text app.js
const discounted = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 0.9])
);
~~~

اتقرا من جوه لبرّه:

### الخطوة ١: [[Object.entries(prices)]]

الأزواج اللي شفناها فوق.

### الخطوة ٢: [[.map(([k, v]) => [k, v * 0.9])]]

لكل زوج: فكّه لـ k و v، ورجّع زوج جديد بنفس المفتاح والسعر بعد خصم ١٠٪.

~~~text الناتج بعد map
[ [ 'mug', 108 ], [ 'shirt', 270 ], [ 'cap', 81 ] ]
~~~

### الخطوة ٣: [[Object.fromEntries(...)]]

العكس: بتاخد أزواج وترجّع object.

~~~text الناتج: discounted
{ mug: 108, shirt: 270, cap: 81 }
~~~

---

## ٤. فلترة بالقيمة

~~~text app.js
const cheap = Object.fromEntries(Object.entries(prices).filter(([, v]) => v < 200));
~~~

نفس الحركة بس بـ filter. والجديد [[[, v]]]: الفاصلة من غير اسم قبلها معناها «اتخطى أول عنصر»، لأننا محتاجين القيمة بس.

~~~text الناتج
{ mug: 120, cap: 90 }
~~~

shirt اتشالت لأن 300 مش أقل من 200.

---

## ٥. [[Object.hasOwn]]

~~~text app.js
Object.hasOwn(prices, "mug"); // true
~~~

بتسأل «المفتاح ده موجود **على الـ object نفسه**؟». الفرق عن [[in]] بيبان مع حاجة موروثة:

~~~text الناتج
Object.hasOwn(prices, "mug")       →  true
Object.hasOwn(prices, "toString")  →  false
"toString" in prices               →  true
~~~

toString مش في prices، جاية من [[Object.prototype]] اللي كل object بيورث منه (درس prototype chain)، و [[in]] بتدوّر هناك كمان.

---

## ٦. حل «جرّب» (الـ solCode)

~~~text app.js
const list = Object.entries(prices).map(([name, price]) => ({ name, price }));
const back = Object.fromEntries(list.map(({ name, price }) => [name, price]));
~~~

- [[({ name, price })]]: arrow بترجّع object، والقوسين حوالين [[{ }]] لازمين. من غيرهم JS هيفهم [[{]] كبداية جسم الدالة مش object.
- الرجوع: كل object يتفك لـ name و price ويرجع زوج.

~~~text الناتج
[
  { name: 'mug', price: 120 },
  { name: 'shirt', price: 300 },
  { name: 'cap', price: 90 }
]
{ mug: 120, shirt: 300, cap: 90 }
~~~

وبعدها الكود بيعمل [[Object.create({ inherited: 1 })]]: object جديد الـ prototype بتاعه فيه inherited، و [[Object.assign]] بتحط فيه الأسعار. والمقارنة:

~~~text الناتج
for...in: mug
for...in: shirt
for...in: cap
for...in: inherited
[ 'mug', 'shirt', 'cap' ]
~~~

[[for...in]] لفّت كمان على الموروث، و [[Object.keys]] لأ.

---

## الخلاصة

| الدالة | بترجّع |
|---|---|
| [[Object.keys(o)]] | array المفاتيح |
| [[Object.values(o)]] | array القيم |
| [[Object.entries(o)]] | array أزواج [[[k, v]]] |
| [[Object.fromEntries(pairs)]] | object من أزواج |
| [[Object.hasOwn(o, k)]] | true لو المفتاح على الـ object نفسه |

> ترتيب المفاتيح: الأرقام الصحيحة الأول تصاعدي، وبعدها الـ strings بترتيب الإضافة. [[Object.keys({ b: 1, 10: "x", a: 2, 2: "y" })]] طلعت [[[ '2', '10', 'b', 'a' ]]].`,
          lines: [
            R`object بيربط اسم كل منتج بسعره. الـ object العادي مش iterable، فـ [[for...of]] عليه مباشرة بترمي TypeError، وعشان كده بنحتاج الدوال اللي جاية تحوّله array.`,
            R`[[Object.keys]] بترجّع array فيها أسامي الخصايص (strings) بترتيب الإضافة. ولأنها array، تقدر تستخدم [[length]] و [[map]] و [[filter]] عليها. (المفاتيح اللي شكلها أرقام بتتحط الأول بالترتيب التصاعدي.)`,
            R`[[Object.values]] بترجّع القيم بس من غير الأسامي. مفيدة لما الحساب على القيم بس، زي مجموع الأسعار بـ [[reduce]].`,
            R`[[Object.entries]] بترجّع array، وكل عنصر فيها array صغيرة من اتنين: المفتاح والقيمة. ده الشكل اللي تلف عليه لما تكون محتاج الاتنين مع بعض.`,
            R`بنلف على الأزواج بـ [[for...of]]، والأقواس المربعة بعد [[const]] بتفك كل زوج على طول: المفتاح في [[item]] والقيمة في [[price]]، بدل ما تقرا كل واحد بالـ index.`,
            R`بيطبع اسم المنتج وسعره في كل لفة: [[mug 120]] وبعدها [[shirt 300]] وبعدها [[cap 90]]، بنفس ترتيب الإضافة.`,
            R`نهاية الـ loop.`,
            R`[[Object.fromEntries]] عكس [[entries]]: بتاخد array أزواج وترجّع object. الطريقة كلها: حوّل الـ object لـ array، استخدم أدوات الـ arrays، ورجّعه object تاني.`,
            R`[[map]] بتلف على الأزواج وترجّع لكل زوج زوج جديد: نفس المفتاح والقيمة مضروبة في [[0.9]] (خصم ١٠٪). لازم ترجّع array من اتنين؛ لو رجّعت الرقم لوحده [[fromEntries]] هترمي TypeError إن القيمة مش entry.`,
            R`نهاية نداء [[fromEntries]]. [[discounted]] object جديد بالأسعار بعد الخصم، والأصل [[prices]] زي ما هو.`,
            R`نفس الفكرة بـ [[filter]]: سيب الأزواج اللي قيمتها أقل من ٢٠٠ بس، فالنتيجة فيها [[mug]] و [[cap]]. الفصلة اللي في الأول في [[([, v])]] معناها «اتخطى العنصر الأول (المفتاح) وخد التاني في [[v]]»، لأننا مش محتاجين المفتاح في الشرط.`,
            R`[[Object.hasOwn]] بتسأل: المفتاح ده موجود في الـ object نفسه؟ أأمن من [[in]] لأنها مش بتعد الخصايص الموروثة زي [[toString]]، وأأمن من [[if (prices.mug)]] اللي هتقول لأ لو السعر [[0]].`,
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
          try: R`اكتب دالة [[countWords(text)]] بترجّع Map فيها كل كلمة وعدد مرات ظهورها. وبعدين حوّل الناتج لـ object بـ [[Object.fromEntries]] واطبعه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[countWords]] بترجّع Map، وبتتجاهل الحروف الكبيرة والمسافات الزيادة.`,
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** شيل التكرار من لستة إيميلات: [[new Set(["a@x.com", "b@x.com", "a@x.com"])]]، واطبع [[size]]، ورجّعها array بـ [[[...set] ]].`, done: R`[[size]] بيطبع [[2]] والـ array [[[ 'a@x.com', 'b@x.com' ] ]] بنفس ترتيب أول ظهور.`, sol: R`~~~js dedupe.js
const set = new Set(["a@x.com", "b@x.com", "a@x.com"]);
console.log(set.size);
console.log([...set]);
console.log(set);
~~~

~~~text الناتج
2
[ 'a@x.com', 'b@x.com' ]
Set(2) { 'a@x.com', 'b@x.com' }
~~~

- **[[new Set(array)]]:** الـ Set مبتقبلش نفس القيمة مرتين، فالتكرار التاني لـ [["a@x.com"]] اتجاهل. والترتيب ترتيب أول ظهور.
- **[[size]] مش [[length]]:** الـ Set والـ Map بيستخدموا [[size]] (خاصية مش دالة، من غير أقواس).
- **[[[...set] ]]:** الـ spread بيلف على الـ Set ويحط قيمه في array جديدة، عشان تقدر تستخدم [[map]] و [[filter]] و [[join]]. ونفس الحاجة [[Array.from(set)]].

**الغلطة الشائعة:** [[" A@x.com"]] و [["a@x.com"]] مش تكرار في عين الـ Set: المقارنة بالظبط (زي [[===]]). نضّف الأول ([[trim]] و [[toLowerCase]]) وبعدين حط في الـ Set، وده بالظبط مشروع «منظّف لستة الإيميلات».` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const o = {}; o[1] = "a"; o["1"] = "b";]] و [[const m = new Map(); m.set(1, "a"); m.set("1", "b");]]. اكتب [[Object.keys(o).length]] و [[m.size]] و [[o[1]]] قبل التشغيل.`, done: R`طلع 1 و 2 و [["b"]]. الـ object حوّل [[1]] لـ [["1"]] فالتانية كتبت فوق الأولى، والـ Map فرّقت بين الرقم والنص.`, sol: R`~~~js map-keys.js
const o = {};
o[1] = "a";
o["1"] = "b";

const m = new Map();
m.set(1, "a");
m.set("1", "b");

console.log(Object.keys(o).length, m.size, o[1]);
console.log(o, m);
console.log(m.get(1), m.get("1"));
~~~

~~~text الناتج
1 2 b
{ '1': 'b' } Map(2) { 1 => 'a', '1' => 'b' }
a b
~~~

- **الـ object:** مفاتيحه نصوص (أو Symbols) بس. [[o[1]]] اتحوّلت لـ [[o["1"]]]، فالسطر التالت كتب فوق التاني. مفتاح واحد قيمته [["b"]]، و [[o[1]]] بيقرا نفس المفتاح.
- **الـ Map:** المفتاح بيفضل بنوعه. [[1]] و [["1"]] مفتاحين مختلفين (المقارنة زي [[===]])، فـ [[m.size]] بـ 2.

**إمتى ده بيعضّ:** ids جاية من الـ URL أو من input (نص) وانت مخزّنها في Map بأرقام: [[map.get("5")]] بترجّع [[undefined]] مع إن [[5]] موجود. حوّل النوع قبل [[get]]، أو خزّن بنوع واحد على طول.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك لوج زيارات: array فيها [[{ user, page }]]. طلّع Map فيها كل صفحة وعدد زياراتها، و Set فيها اليوزرز المختلفين، واطبع الصفحات من الأكتر للأقل.`, done: R`على لوج فيه ٥ زيارات منهم ٣ لـ [["/"]] من يوزرين: [[map.get("/")]] بيرجّع [[3]]، و [[users.size]] بيرجّع عدد اليوزرز المختلفين بس، والصفحة اللي فيها ٣ زيارات بتطلع الأولى.`, sol: R`~~~js visits.js
const log = [
  { user: "sara", page: "/" },
  { user: "omar", page: "/shop" },
  { user: "sara", page: "/" },
  { user: "omar", page: "/" },
  { user: "sara", page: "/about" },
];

const views = new Map();
for (const { page } of log) views.set(page, (views.get(page) ?? 0) + 1);

const users = new Set(log.map((v) => v.user));

console.log(views.get("/"), users.size);
const ranked = [...views].sort((a, b) => b[1] - a[1]);
for (const [page, n] of ranked) console.log(page.padEnd(7), n);
~~~

~~~text الناتج
3 2
/       3
/shop   1
/about  1
~~~

- **العدّ:** [[views.set(page, (views.get(page) ?? 0) + 1)]]. أول مرة [[get]] بترجّع [[undefined]] فـ [[??]] بتحط 0. (وفي Node 24 ونسخ المتصفحات الجديدة فيه [[getOrInsert]]، درس «Map: كل الـ methods».)
- **اليوزرز المختلفين:** [[new Set(log.map((v) => v.user))]]: كل اليوزرز في array، والـ Set شالت التكرار، فـ [[size]] = 2.
- **الترتيب:** [[[...views] ]] بتحوّل الـ Map لأزواج [[[page, n]]]، و [[sort((a, b) => b[1] - a[1])]] بترتب بالعدد من الأكبر. الـ Map نفسها مالهاش [[sort]].

**الغلطة الشائعة:** [[views[page]++]] على Map. الأقواس دي بتكتب خاصية عادية على الـ object بتاع الـ Map مش جوه الـ Map، فـ [[views.get("/")]] تفضل [[undefined]] و [[views.size]] صفر.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على 50000 رقم، ابحث عن 1000 قيمة مرة بـ [[arr.includes(x)]] ومرة بـ [[set.has(x)]]، وقيس كل واحدة بـ [[console.time]].`, done: R`الاتنين لقوا نفس العدد، والـ includes أخدت عشرات المللي ثواني والـ Set أقل من 1ms على أغلب الأجهزة. وعرفت إن Set تستاهل لما تسأل «موجود؟» كتير على لستة كبيرة.`, sol: R`~~~js includes-vs-has.js
const arr = Array.from({ length: 50000 }, (_, i) => i * 2);
const set = new Set(arr);
const queries = Array.from({ length: 1000 }, (_, i) => i * 97);

console.time("includes");
let a = 0;
for (const q of queries) if (arr.includes(q)) a++;
console.timeEnd("includes");

console.time("set.has");
let b = 0;
for (const q of queries) if (set.has(q)) b++;
console.timeEnd("set.has");

console.log(a, b);
~~~

~~~text الناتج (Node 24 على لابتوب عادي؛ الأرقام بتتغيّر بين تشغيل وتاني)
includes: 21.468ms
set.has: 0.116ms
500 500
~~~

- **الاتنين لقوا 500:** نفس النتيجة، فالمقارنة عادلة.
- **[[arr.includes(q)]]** بيمشي على الـ array من الأول لحد ما يلاقي أو يخلص: لكل سؤال لحد ٥٠ ألف مقارنة، و ١٠٠٠ سؤال = عشرات الملايين في أسوأ حالة.
- **[[set.has(q)]]** بيروح للقيمة على طول (hash table)، فالوقت تقريبًا ثابت مهما كبرت اللستة. الفرق هنا أكتر من ١٠٠ مرة (في تشغيل تاني طلع ٢١ms و ٠.٢٦ms، فالنسبة بتتغيّر بس الفرق دايمًا ضخم).

**إمتى تستاهل:** لو هتسأل «موجود؟» مرة أو مرتين على لستة صغيرة، [[includes]] كفاية وأوضح، وبناء الـ Set نفسه بياخد وقت. لما الأسئلة كتير واللستة كبيرة (فلترة لستة بلستة تانية مثلًا) حوّل اللي بتسأل فيها لـ Set مرة واحدة برّه الـ loop. **والغلطة الشائعة:** تعمل [[new Set(arr)]] **جوه** الـ loop، فتدفع تمن البناء كل مرة وتبقى أبطأ من [[includes]].` },
            { lvl: 'تحدي', t: R`**مسألة:** صلاحيات: [[required = new Set(["read", "write"])]] و [[userPerms = new Set(["read"])]]. استخدم [[isSubsetOf]] و [[difference]] عشان تقول اليوزر يقدر يدخل ولا لأ وناقصه إيه. وبعدين جرّب [[map.set({ id: 1 }, "x")]] وبعده [[map.get({ id: 1 })]].`, done: R`[[required.isSubsetOf(userPerms)]] بترجّع [[false]] و [[[...required.difference(userPerms)] ]] بترجّع [[[ 'write' ] ]]. و [[map.get({ id: 1 })]] بترجّع [[undefined]]، وتقدر تشرح ليه: الـ Map بتقارن الـ objects بالـ reference، فلازم تخزّن الـ object في متغير وتستخدمه هو.`, sol: R`~~~js perms.js
const required = new Set(["read", "write"]);
const userPerms = new Set(["read"]);

console.log(required.isSubsetOf(userPerms));
console.log([...required.difference(userPerms)]);

const map = new Map();
map.set({ id: 1 }, "x");
console.log(map.get({ id: 1 }));

const key = { id: 1 };
map.set(key, "y");
console.log(map.get(key), map.size);
~~~

~~~text الناتج
false
[ 'write' ]
undefined
y 2
~~~

- **[[required.isSubsetOf(userPerms)]]:** «كل اللي في [[required]] موجود في [[userPerms]]؟». [[write]] مش موجودة، فـ [[false]]: يتمنع.
- **[[required.difference(userPerms)]]:** اللي في الأولى ومش في التانية = الناقص. بترجّع Set جديدة، فحوّلناها array للطباعة. (الـ methods دي جديدة: Node 22 والمتصفحات من ٢٠٢٤.)
- **[[map.get({ id: 1 })]] رجّعت [[undefined]]:** كل [[{ id: 1 }]] مكتوبة في الكود object جديد في الذاكرة. الـ Map بتقارن الـ objects بالـ reference ([[===]])، فالـ object اللي في [[get]] مش هو اللي في [[set]] مع إن شكلهم واحد. والـ object الأولاني فضل جوه الـ Map ومحدش يقدر يوصله (ولذلك [[size]] = 2).
- **الحل:** خزّن الـ object في متغير ([[key]]) واستخدمه هو في [[set]] و [[get]]. ولو المفتاح المنطقي هو الـ id، استخدم [[map.set(user.id, user)]] بدل الـ object.` },
            { lvl: 'تحدي', t: R`**محاكاة:** cache بيشيل آخر عنصرين بس (LRU) بـ Map: [[get(key)]] بتنقل المفتاح للآخر (delete ثم set)، و [[set(key, v)]] لو الحجم عدّى 2 بتمسح أول مفتاح ([[map.keys().next().value]]). شغّل: set a، set b، get a، set c، واطبع المفاتيح.`, done: R`المفاتيح في الآخر [[["a", "c"]]]: b اتمسحت لأنها الأقدم استخدام (a اتقرت بعدها). و [[get("b")]] بترجّع undefined.`, sol: R`~~~js lru.js
function createLRU(limit = 2) {
  const map = new Map();
  return {
    get(key) {
      if (!map.has(key)) return undefined;
      const value = map.get(key);
      map.delete(key);
      map.set(key, value);
      return value;
    },
    set(key, value) {
      map.delete(key);
      map.set(key, value);
      if (map.size > limit) map.delete(map.keys().next().value);
    },
    keys: () => [...map.keys()],
  };
}

const cache = createLRU(2);
cache.set("a", 1);
cache.set("b", 2);
console.log(cache.get("a"));
cache.set("c", 3);
console.log(cache.keys());
console.log(cache.get("b"));
~~~

~~~text الناتج
1
[ 'a', 'c' ]
undefined
~~~

**الفكرة:** الـ Map بتحافظ على ترتيب الإضافة، فأول مفتاح فيها = الأقدم. لو كل استخدام بينقل المفتاح للآخر، يبقى أول مفتاح = **الأقدم استخدامًا**، وده اللي LRU (Least Recently Used) بيمسحه.

~~~text الخطوات
set a     →  [a]
set b     →  [a, b]
get a     →  [b, a]        (delete ثم set نقلت a للآخر)
set c     →  [b, a, c]  ← الحجم 3 > 2، امسح أول واحد (b)  →  [a, c]
get b     →  undefined
~~~

- **[[map.keys().next().value]]:** [[keys()]] بترجّع iterator، و [[next()]] أول خطوة فيه، و [[.value]] أول مفتاح. من غير ما نحوّل الـ Map كلها array.
- **[[map.delete(key)]] في أول [[set]]:** لو المفتاح موجود قبل كده، [[set]] لوحدها بتغيّر القيمة **ومكانه بيفضل** زي ما هو. المسح الأول بيضمن إنه يروح للآخر.

**الغلطة الشائعة:** تنسى الـ delete في [[get]]، فالقراية متعتبرش استخدام، وتطلع المفاتيح [[["b", "c"]]] (اتمسح a مع إنه لسه مستخدم). ده الفرق بين LRU و FIFO.` }
          ],
          ref: [
            { t: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
            { t: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" },
            { t: "MDN: Keyed collections", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections" },
            { t: "MDN: Set.prototype.isSubsetOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf" },
            { t: "MDN: Set.prototype.difference()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference" },
          ],
          pre: [{ to: "js/find و some و includes", why: R`[[includes]] على array هي اللي [[Set.has]] بتعملها أسرع`}],
          flag: "script",
          deep: {
            why: "مسائل كتير (في الشغل وفي الانترفيو) بتبقى «اتأكد إن ده مكررش» أو «عدّ كل حاجة ظهرت كام مرة» أو «هات العنصر بالـ id بسرعة». Set و Map بيحوّلوا حلول O(n²) لـ O(n) (تاب DSA).",
            how: R`الاتنين hash tables من جوه، فالإضافة والبحث والمسح O(1) في المتوسط. وبيقارنوا المفاتيح بـ SameValueZero: زي === بس NaN بتساوي NaN. يعني objects بنفس المحتوى مفاتيح مختلفة.

Map أحسن من object كـ dictionary لما: المفاتيح مش strings، أو بتضيف وتمسح كتير، أو المفاتيح جاية من اليوزر (object عنده مفاتيح موروثة زي [[toString]]، و [[__proto__]] خطر). و object أحسن لما الشكل ثابت ومعروف، أو هتعمله JSON (الـ Map بيطلع [[{}]] في JSON.stringify).

وفيه [[WeakMap]] و [[WeakSet]]: المفاتيح objects بس، ومبيمنعوش الـ garbage collector يمسحها. مفيدين لو عايز تربط داتا بـ object (عنصر DOM مثلًا) من غير ما تسبب memory leak (المستوى ٣).`,
            when: R`Set لإزالة التكرار، و «شفت ده قبل كده؟»، وعمليات المجموعات. Map للعد والـ caches والبحث بالـ id، وأي dictionary مفاتيحه ديناميكية.`,
            mistakes: R`[[JSON.stringify(map)]] وتستغرب [[{}]]: حوّله الأول بـ [[Object.fromEntries]]. و [[map[key] = v]] بدل [[map.set]]: كده حطيت خاصية عادية على الـ object مش entry في الـ Map. واستخدام array مع includes جوه loop على داتا كبيرة.`
          },
          teach: R`## الفكرة في سطرين

[[Map]] زي object بس معمولة مخصوص عشان تبقى «قاموس»: مفتاح من أي نوع وقيمته، بـ methods واضحة. و [[Set]] زي array بس مفيهاش تكرار، وسؤال «موجود؟» فيها سريع. النواتج من تشغيل المثال في Node 24، وهو فيه عمليات المجموعات الجديدة (ES2025) زي intersection.

---

## ١. Map: إنشاء وإضافة

~~~text app.js
const visits = new Map();
visits.set("/home", 1);
visits.set("/about", 3);
~~~

- [[new Map()]]: [[new]] بتعمل instance جديدة من الـ class الجاهز Map، فاضية.
- [[set(key, value)]]: بتحط القيمة تحت المفتاح. لو المفتاح موجود بتستبدل قيمته. وبترجّع الـ Map نفسها:

~~~text الناتج: console.log(visits.set("/home", 1))
Map(1) { '/home' => 1 }
~~~

[[Map(1)]] يعني فيها عنصر واحد، والسهم [[=>]] في الطباعة معناه «المفتاح ده قيمته كذا».

---

## ٢. القراية والسؤال والعدد

~~~text app.js
visits.get("/home");             // 1
visits.has("/cart");             // false
visits.size;                     // 2
~~~

| السطر | بيعمل إيه | الناتج |
|---|---|---|
| [[get(k)]] | هات القيمة | [[1]] |
| [[has(k)]] | المفتاح موجود؟ | [[false]] |
| [[size]] | عدد العناصر (خاصية من غير قوسين) | [[2]] |

ولو عملت [[get]] لمفتاح مش موجود، بترجع [[undefined]] (جرّبت [[visits.get("/cart")]]).

---

## ٣. مفتاح object

~~~text app.js
const userObj = { id: 1 };
visits.set(userObj, "المفتاح object");
~~~

ده اللي object عادي ميقدرش يعمله: المفتاح نفسه object.

~~~text الناتج: console.log(visits)
Map(3) { '/home' => 1, '/about' => 3, { id: 1 } => 'المفتاح object' }
~~~

لو جرّبت نفس الحركة على object عادي، المفتاح بيتحوّل string:

~~~text الناتج
const o = {}; o[userObj] = 1; Object.keys(o)   →  [ '[object Object]' ]
~~~

وخلي بالك: الـ Map بتقارن المفاتيح بالعنوان (reference)، مش بالمحتوى:

~~~text الناتج
visits.get({ id: 1 })   →  undefined
visits.get(userObj)     →  المفتاح object
~~~

[[{ id: 1 }]] الجديدة object تاني بعنوان تاني (درس reference و copy).

---

## ٤. اللف على Map

~~~text app.js
for (const [path, count] of visits) console.log(path, count);
~~~

كل عنصر في Map وانت بتلف عليها هو زوج [[[key, value]]]، فبنفكه بـ [[[path, count]]]. والترتيب هو ترتيب الإضافة:

~~~text الناتج
/home 1
/about 3
{ id: 1 } المفتاح object
~~~

---

## ٥. Set: من غير تكرار

~~~text app.js
const tags = new Set(["js", "ts", "js"]);
tags.size;                       // 2
tags.add("react").has("react");  // true
~~~

- [[new Set([...])]]: بتاخد array (أو أي حاجة بتتلف عليها) وتشيل التكرار.

~~~text الناتج: console.log(tags, tags.size)
Set(2) { 'js', 'ts' } 2
~~~

- [[add]] بتضيف وترجّع الـ Set نفسها، فتقدر تكمّل عليها بـ [[.has]] في نفس السطر. الناتج [[true]].

وأشهر استخدام: [[[...new Set([3, 1, 3, 2, 1])]]] طلعت [[[ 3, 1, 2 ]]]، يعني شيل التكرار من array وارجع array.

---

## ٦. عمليات المجموعات

~~~text app.js
const a = new Set([1, 2, 3]), b = new Set([2, 3, 4]);
a.intersection(b);
a.union(b);
a.difference(b);
~~~

~~~text الناتج
Set(2) { 2, 3 }          intersection: الموجود في الاتنين
Set(4) { 1, 2, 3, 4 }    union: الكل من غير تكرار
Set(1) { 1 }             difference: اللي في a ومش في b
~~~

وكل واحدة بترجّع Set **جديدة**: بعدهم a لسه [[Set(3) { 1, 2, 3 }]].

---

## ٧. فخين

~~~text الناتج
JSON.stringify(visits)       →  {}
const m = new Map(); m["x"] = 1;  m.size → 0   m.get("x") → undefined
~~~

- JSON مبيعرفش Map، فبتطلع [[{}]] فاضية. حوّلها الأول بـ [[Object.fromEntries]].
- [[m["x"] = 1]] حطت خاصية عادية على الـ object، مش entry في الـ Map. دايمًا [[set]] و [[get]].

---

## الخلاصة

| | Map | Set |
|---|---|---|
| بتشيل | أزواج مفتاح وقيمة | قيم من غير تكرار |
| إضافة | [[set(k, v)]] | [[add(v)]] |
| قراية | [[get(k)]] | (مفيش، بتسأل بس) |
| موجود؟ | [[has(k)]] | [[has(v)]] |
| مسح | [[delete(k)]] | [[delete(v)]] |
| العدد | [[size]] | [[size]] |
| اللف | [[[k, v]]] بالترتيب | القيم بالترتيب |

> في تمرين [[countWords]] اللي تحت هتحتاج [[get]] و [[set]] و [[has]] أو [[??]]: فكّر إيه اللي [[get]] بترجّعه أول مرة تشوف فيها كلمة.`,
          lines: [
            R`[[Map]] جديدة فاضية. الـ Map معمولة مخصوص لـ key ← value: المفتاح يقدر يبقى أي نوع (حتى object)، وبتحفظ ترتيب الإضافة، وعندها [[size]] جاهز.`,
            R`[[set]] بتضيف مفتاح وقيمته، ولو المفتاح موجود بتغيّر قيمته بس. هنا بنعدّ زيارات كل صفحة: [["/home"]] اتزارت مرة.`,
            R`مفتاح تاني بقيمة تانية. [[set]] بترجّع الـ Map نفسها، فتقدر تكتب السطرين دول في سطر واحد: [[visits.set(a, 1).set(b, 2)]].`,
            R`[[get]] بترجّع القيمة بتاعة المفتاح، أو [[undefined]] لو مش موجود. مع Map لازم [[get]]: القراية بالنقطة أو بالأقواس المربعة زي الـ object بترجّع [[undefined]]، لأن الداتا متخزنة جوه الـ Map مش كخصايص.`,
            R`[[has]] بتسأل المفتاح موجود ولا لأ وترجّع [[true]] أو [[false]]. أدق من إنك تشيك على نتيجة [[get]]، لأن ممكن تكون مخزّن [[0]] أو [[undefined]] كقيمة فعلًا.`,
            R`عدد العناصر جاهز في [[size]]، وهي خاصية مش method فمن غير أقواس ([[size()]] بترمي TypeError). في الـ object العادي محتاج [[Object.keys(obj).length]].`,
            R`object عادي هنستخدمه كمفتاح في السطر الجاي.`,
            R`في Map المفتاح ممكن يبقى object، والمقارنة بالـ reference: [[visits.get(userObj)]] ترجّع القيمة، لكن [[visits.get({ id: 1 })]] ترجّع [[undefined]] لأنه object تاني. في الـ object العادي المفتاح بيتحوّل string، فكل الـ objects بتبقى [["[object Object]"]] وتدوس على بعض.`,
            R`الـ Map iterable: [[for...of]] بيلف عليها بترتيب الإضافة، وكل عنصر array من اتنين بنفكه في [[path]] و [[count]]. فبيطبع [[/home 1]] وبعدها [[/about 3]] وبعدها الـ object ومعاه قيمته.`,
            R`[[Set]] مجموعة قيم مفيهاش تكرار: اديناها [["js"]] مرتين واتخزنت مرة واحدة. ودي أسهل طريقة تشيل التكرار من array: [[Array.from(new Set(arr))]].`,
            R`[[size]] بتطلع [[2]] مش [[3]]، لأن التكرار اتشال وقت الإنشاء نفسه.`,
            R`[[add]] بتضيف قيمة (ولو موجودة مبتعملش حاجة) وبترجّع الـ Set نفسها، فكمّلنا عليها بـ [[has]] اللي بتسأل القيمة موجودة. [[has]] في Set أسرع بكتير من [[includes]] في array كبيرة، لأنها مش بتلف على العناصر.`,
            R`مجموعتين بينهم [[2]] و [[3]] مشتركين. هنستخدمهم في عمليات المجموعات اللي جاية.`,
            R`[[intersection]]: القيم اللي موجودة في الاتنين. العمليات دي بترجّع Set جديدة ومش بتعدّل [[a]] ولا [[b]]. وهي جديدة (Node 22 والمتصفحات الحديثة)، فلو البيئة أقدم هتلاقيها مش موجودة وترمي [[is not a function]].`,
            R`[[union]]: كل القيم من الاتنين، والمكرر بيتحسب مرة واحدة.`,
            R`[[difference]]: اللي في [[a]] ومش في [[b]]. الترتيب فارق هنا: [[b.difference(a)]] هتطلع [[Set {4}]].`,
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
console.log(Object.fromEntries(counts)); // { js: 2, is: 2, fun: 1, and: 1, fast: 1 }`,
          check: {
            lang: "js",
            starter: R`function countWords(text) {
  const counts = new Map();
  // ...
  return counts;
}`,
            tests: R`test("بترجّع Map", () => expect(countWords("a b") instanceof Map).toBe(true));
test("'js is fun and JS is fast' ← { js: 2, is: 2, fun: 1, and: 1, fast: 1 }", () => expect(Object.fromEntries(countWords("js is fun and JS is fast"))).toEqual({ js: 2, is: 2, fun: 1, and: 1, fast: 1 }));
test("مسافات زيادة مش كلمات: '  a   b a ' ← { a: 2, b: 1 }", () => expect(Object.fromEntries(countWords("  a   b a "))).toEqual({ a: 2, b: 1 }));
test("نص فاضي ← Map فاضية", () => expect(countWords("").size).toBe(0));
test("مفيش NaN: (m.get(w) ?? 0) + 1", () => expect([...countWords("x x x").values()]).toEqual([3]));`,
            solution: R`function countWords(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().split(/\s+/).filter(Boolean)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}`
          }
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** خمّن الأول، وبعدين شغّل [[JSON.stringify({ a: 1, b: undefined, c: () => 1, d: NaN })]] و [[JSON.stringify(new Map([ ["a", 1] ]))]].`, done: R`الأول بيطلع [['{"a":1,"d":null}']] (الـ undefined والدالة اختفوا، والـ NaN بقت null)، والتاني بيطلع [['{}']]: الـ Map بتضيع لو مش حوّلتها بـ [[Object.fromEntries]] الأول.`, sol: R`~~~js stringify-loss.js
console.log(JSON.stringify({ a: 1, b: undefined, c: () => 1, d: NaN }));
console.log(JSON.stringify(new Map([["a", 1]])));
console.log(JSON.stringify(Object.fromEntries(new Map([["a", 1]]))));
console.log(JSON.stringify([undefined, () => 1, NaN]));
~~~

~~~text الناتج
{"a":1,"d":null}
{}
{"a":1}
[null,null,null]
~~~

| القيمة | جوه object | جوه array |
|---|---|---|
| [[undefined]] | المفتاح بيختفي | بتبقى [[null]] |
| دالة | المفتاح بيختفي | بتبقى [[null]] |
| [[NaN]] و [[Infinity]] | [[null]] | [[null]] |
| [[Map]] و [[Set]] | [[{}]] | [[{}]] |

- **ليه array بتحط [[null]]:** لو شالت العنصر الـ indexes اللي بعده هتتزحلق، فبتحط [[null]] تحافظ على المكان.
- **الـ Map طلعت [[{}]]:** [[JSON.stringify]] بتاخد الخصايص الـ enumerable بتاعة الـ object، والـ Map مخزّنة داتاها جوه مش كخصايص. الحل [[Object.fromEntries(map)]] قبلها (السطر التالت)، أو [[[...map] ]] لو المفاتيح مش نصوص.

**الغلطة الشائعة:** تخزّن Map في [[localStorage]] بـ [[JSON.stringify]] مباشرة، والكود ميطلّعش error، وبعد الـ refresh الداتا [[{}]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[JSON.parse("{'a': 1}")]]. شغّلها واقرا الرسالة، وصلّح النص.`, done: R`بتوقع بـ [[SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)]]: الـ JSON مبيقبلش علامة [[']]. بعد [['{"a": 1}']] بترجّع [[{ a: 1 }]].`, sol: R`~~~js parse-quotes.js
try {
  JSON.parse("{'a': 1}");
} catch (e) {
  console.log(e.name + ": " + e.message);
}
console.log(JSON.parse('{"a": 1}'));
~~~

~~~text الناتج (Node 24)
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
{ a: 1 }
~~~

**اقرا الرسالة:** «Expected property name or '}'» = «كنت مستني اسم خاصية أو قفلة القوس». و «position 1 (line 1 column 2)» = الحرف التاني في النص، اللي هو [[']]. يعني أول ما شاف علامة التنصيص الواحدة وقف.

**ليه:** الـ JSON أضيق من JavaScript: أسامي المفاتيح والنصوص **لازم** بين علامة [["]] المزدوجة. ومفيش كمان trailing comma ([[{"a": 1,}]])، ولا كومنتات، ولا [[undefined]].

**التصليح:** النص يبقى [['{"a": 1}']] (الـ JavaScript string حواليه بعلامة واحدة عشان المزدوجة اللي جوه متتقفلش). وفي الكود الحقيقي متكتبش JSON بإيدك أصلًا: اعمله بـ [[JSON.stringify(obj)]] واتأكد إنه سليم.

**ملحوظة:** نص الرسالة بيختلف بين المتصفحات والنسخ (Firefox بيكتب [[JSON.parse: expected property name or '}']])، فمتعتمدش على النص في الكود، اعتمد على [[e.name === "SyntaxError"]].` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[safeParse(text, fallback)]]: بترجّع الـ object لو النص JSON سليم، وترجّع [[fallback]] لو النص بايظ أو الناتج [[null]]. ودي اللي هتستخدمها مع [[localStorage.getItem]].`, done: R`[[safeParse('{"x":1}', {})]] بترجّع [[{ x: 1 }]]، و [[safeParse("{bad", [ ])]] بترجّع [[[ ] ]] من غير error، و [[safeParse(null, [ ])]] بترجّع [[[ ] ]] (لأن [[JSON.parse(null)]] لوحدها بترجّع [[null]]).`, sol: R`~~~js safe-parse.js
function safeParse(text, fallback) {
  try {
    const value = JSON.parse(text);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

console.log(safeParse('{"x":1}', {}));
console.log(safeParse("{bad", []));
console.log(safeParse(null, []));
console.log(JSON.parse(null));
console.log(safeParse("0", 5), safeParse("false", true));
~~~

~~~text الناتج
{ x: 1 }
[]
[]
null
0 false
~~~

- **[[try]] حوالين [[JSON.parse]]:** النص البايظ بيرمي [[SyntaxError]]، فالـ [[catch]] بيرجّع الـ fallback بدل ما البرنامج يقع. و [[catch {]] من غير متغير مسموح لما مش محتاج الـ error.
- **[[value ?? fallback]]:** [[JSON.parse(null)]] مبيرميش! بيحوّل [[null]] لنص [["null"]] ويرجّع [[null]] (السطر الرابع). ودي بالظبط القيمة اللي [[localStorage.getItem]] بترجّعها لمفتاح مش موجود. الـ [[??]] بيحوّلها للـ fallback.
- **آخر سطر:** [["0"]] و [["false"]] JSON سليم، فرجعوا [[0]] و [[false]] مش الـ fallback. ده سبب إننا استخدمنا [[??]] مش [[||]]: [[||]] كانت هترجّع 5 و [[true]] وتضيّع قيم محفوظة صح.

**الاستخدام:** [[const cart = safeParse(localStorage.getItem("cart"), [])]]. سطر واحد مبيوقعش لو المفتاح مش موجود أو حد عدّل القيمة بإيده من DevTools.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** نص JSON فيه ٣ طلبات [[{ id, name, price, qty, secret }]] (Mug 120×2، و Cap 90×1، و Shirt 300×1). احسب الإجمالي، واطبع الطلب الأول من غير secret بـ [[JSON.stringify(order, ["name", "price"], 2)]].`, done: R`الإجمالي 630. والطباعة ٤ سطور: [[{]] ثم [["name": "Mug",]] ثم [["price": 120]] ثم [[}]]، ومفيش id ولا qty ولا secret. وعرفت إن الـ array التانية في stringify بتختار المفاتيح.`, sol: R`~~~js orders.js
const text = $__bt[
  { "id": 1, "name": "Mug", "price": 120, "qty": 2, "secret": "a1" },
  { "id": 2, "name": "Cap", "price": 90, "qty": 1, "secret": "b2" },
  { "id": 3, "name": "Shirt", "price": 300, "qty": 1, "secret": "c3" }
]$__bt;

const orders = JSON.parse(text);
const total = orders.reduce((sum, o) => sum + o.price * o.qty, 0);
console.log(total);
console.log(JSON.stringify(orders[0], ["name", "price"], 2));
~~~

~~~text الناتج
630
{
  "name": "Mug",
  "price": 120
}
~~~

- **[[JSON.parse(text)]]:** النص بقى array فيها ٣ objects حقيقية، والأرقام أرقام ([[typeof]] = [["number"]]) مش نصوص زي الـ CSV.
- **الإجمالي:** [[reduce]] بتجمع [[price * qty]]: 240 + 90 + 300 = 630.
- **[[JSON.stringify(orders[0], ["name", "price"], 2)]]:**
  - التاني ([[replacer]]) لما يبقى array، بيبقى «القايمة البيضا»: المفاتيح دي بس اللي تطلع، بالترتيب ده.
  - التالت ([[space]]) = 2: مسافتين لكل مستوى، وكل مفتاح في سطر. من غيره بيطلع سطر واحد مضغوط.

**تنبيه أمان:** القايمة البيضا أأمن من إنك «تشيل» [[secret]] بإيدك، لأن أي مفتاح سري يتضاف بعدين مش هيطلع غير لو كتبته في القايمة. بس متعتمدش عليها كأمان حقيقي: الأسرار متتبعتش للمتصفح من الأول.` },
            { lvl: 'تحدي', t: R`**مسألة:** استخدم التاني بتاع [[JSON.parse(text, reviver)]]: دالة [[(key, value) => ...]] بتشوف أي string شكلها تاريخ ISO ([[/^\d{4}-\d{2}-\d{2}T/]]) وترجّعها [[new Date(value)]]. جرّبها على order فيه [[createdAt]] و [[note: "hello"]].`, done: R`بعد الـ parse [[back.createdAt instanceof Date]] بترجّع [[true]] و [[back.createdAt.getUTCFullYear()]] بترجّع السنة الصح، و [[back.note]] لسه string [["hello"]].`, sol: R`~~~js reviver.js
const ISO = /^\d{4}-\d{2}-\d{2}T/;
const order = { id: 7, createdAt: new Date("2026-11-21T09:30:00Z"), note: "hello" };

const text = JSON.stringify(order);
console.log(text);

const back = JSON.parse(text, (key, value) =>
  typeof value === "string" && ISO.test(value) ? new Date(value) : value
);
console.log(back.createdAt instanceof Date, back.createdAt.getUTCFullYear());
console.log(typeof back.note, back.note);

const plain = JSON.parse(text);
console.log(typeof plain.createdAt);
~~~

~~~text الناتج
{"id":7,"createdAt":"2026-11-21T09:30:00.000Z","note":"hello"}
true 2026
string hello
string
~~~

- **[[JSON.stringify]]** حوّل الـ Date لنص ISO (بتنادي [[toJSON]] بتاعتها)، و [[JSON.parse]] العادي بيرجّعه نص (آخر سطر: [["string"]]). الـ JSON ملوش نوع تاريخ.
- **الـ reviver** دالة [[(key, value)]] [[JSON.parse]] بتناديها على كل قيمة بعد ما تتقري، من جوه لبرة، واللي ترجّعه يبقى القيمة الجديدة. لو رجّعت [[value]] زي ما هي، مفيش تغيير.
- **الشرط:** النص بس ([[typeof value === "string"]]) وشكله تاريخ ISO (السنة-الشهر-اليوم ثم [[T]]) يتحوّل [[new Date(value)]]. فـ [[note]] فضلت نص.
- **[[getUTCFullYear()]]** مش [[getFullYear()]]: النص بالـ UTC ([[Z]] في الآخر)، و [[getFullYear]] بتقرا بتوقيت الجهاز، وفي آخر ليلة في السنة ممكن تطلع سنة تانية.

**الغلطة الشائعة:** regex واسعة زي [[/\d{4}/]] بتحوّل أي نص فيه ٤ أرقام (رقم تليفون أو كود منتج) لتاريخ [[Invalid Date]]. خلّي الشرط ضيق، أو حوّل مفاتيح معروفة بالاسم ([[key === "createdAt"]]).` }
          ],
          ref: [
            { t: "MDN: JSON", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" },
            { t: "MDN: JSON.parse()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" },
            { t: "MDN: JSON.stringify()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" },
            { t: "MDN Learn: Working with JSON", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON" },
          ],
          pre: [{ to: "js/Object.keys و entries", why: R`[[Object.fromEntries]] بتحوّل Map لـ object قبل [[JSON.stringify]]`}, { to: "js/string methods", why: R`الـ JSON نص، وبتقراه وتقطّعه زي أي نص`}],
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
          teach: R`## الفكرة في سطرين

الـ object عايش في ذاكرة البرنامج بس. عشان تبعته لسيرفر أو تخزّنه في ملف أو localStorage لازم يبقى **نص**. [[JSON.stringify]] بتحوّله نص، و [[JSON.parse]] بترجّع النص object. JSON = JavaScript Object Notation، يعني «طريقة كتابة objects زي JS» بس بقواعد أضيق. النواتج من Node 24، وحتة localStorage من Chrome headless.

---

## ١. object فيه حاجات مش JSON

~~~text app.js
const order = { id: 7, items: ["mug"], createdAt: new Date("2026-01-01"), note: undefined };
~~~

[[new Date("2026-01-01")]] بتعمل object تاريخ (أول يوم في ٢٠٢٦ الساعة 00:00 UTC). و note قيمتها undefined. الاتنين ملهمش مكان في JSON، وهنشوف بيحصلهم إيه.

---

## ٢. [[JSON.stringify]]: object ← نص

~~~text app.js
const text = JSON.stringify(order);
~~~

~~~text الناتج: console.log(text, typeof text)
{"id":7,"items":["mug"],"createdAt":"2026-01-01T00:00:00.000Z"} string
~~~

لاحظ ٣ حاجات:

1. المفاتيح بقت بين [[""]]: ده إجباري في JSON.
2. [[note]] اختفت خالص: stringify بيتجاهل أي خاصية قيمتها undefined أو دالة.
3. الـ Date بقت string بشكل ISO. الـ T بتفصل التاريخ عن الوقت، و [[.000]] ملّي ثانية، و Z يعني UTC.

ولو الحاجات دي جوه array بتبقى null بدل ما تختفي، عشان الترتيب ميبوظش: [[JSON.stringify([undefined, () => 1, NaN])]] طلعت [[[null,null,null]]].

---

## ٣. نسخة منسقة للقراية

~~~text app.js
JSON.stringify(order, null, 2);
~~~

الباراميتر التاني (replacer) [[null]] يعني «متغيرش حاجة»، والتالت [[2]] عدد المسافات في كل مستوى:

~~~text الناتج
{
  "id": 7,
  "items": [
    "mug"
  ],
  "createdAt": "2026-01-01T00:00:00.000Z"
}
~~~

---

## ٤. [[JSON.parse]]: نص ← object

~~~text app.js
const back = JSON.parse(text);
typeof back.createdAt;          // "string"
new Date(back.createdAt);
~~~

~~~text الناتج
{ id: 7, items: [ 'mug' ], createdAt: '2026-01-01T00:00:00.000Z' }
string
2026-01-01T00:00:00.000Z
~~~

parse مبتعرفش إن النص ده كان Date، فبترجّعه string. لازم انت تعمل [[new Date(...)]] عليه عشان ترجع Date (و [[getFullYear()]] عليها طلعت 2026).

---

## ٥. نص بايظ

~~~text app.js
try {
  JSON.parse("{bad json}");
} catch (err) {
  console.log("JSON بايظ:", err.message);
}
~~~

- [[try { }]]: جرّب الكود ده.
- [[catch (err) { }]]: لو رمى error، متوقعش البرنامج، تعالى هنا، و err هو الـ error.
- [[err.message]]: نص الرسالة.

~~~text الناتج
JSON بايظ: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

نوعه [[SyntaxError]]. والرسالة بتقولك: عند الحرف رقم 1 (العد بيبدأ من 0، يعني حرف b) كان متوقع اسم مفتاح بين تنصيص أو [[}]].

ورسالتين هتشوفهم كتير:

~~~text الناتج
JSON.parse("[object Object]")   →  SyntaxError: "[object Object]" is not valid JSON
JSON.parse("<!DOCTYPE html>")   →  SyntaxError: Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
~~~

الأولى معناها إن حد خزّن object من غير stringify، والتانية إن السيرفر رجّع صفحة HTML بدل JSON.

---

## ٦. localStorage (حل «جرّب»)

~~~text app.js
localStorage.setItem("cart", JSON.stringify({ items: ["mug"], total: 120 }));
const cart = JSON.parse(localStorage.getItem("cart")) ?? { items: [], total: 0 };
~~~

شغّلته في Chrome headless على صفحة من سيرفر محلي، وعملت reload بين السطرين:

~~~text الناتج
getItem("cart")  →  '{"items":["mug"],"total":120}'   (typeof: string)
cart.items       →  ["mug"]
getItem("nope")  →  null
~~~

localStorage بيخزّن strings بس. ولو المفتاح مش موجود [[getItem]] بترجع null، و [[JSON.parse(null)]] بترجع null، فـ [[??]] بتحط القيمة الافتراضية. ولو نسيت stringify:

~~~text الناتج: setItem("bad", { items: ["mug"] }) وبعدين parse
[object Object] | SyntaxError: "[object Object]" is not valid JSON
~~~

---

## ٧. BigInt

~~~text الناتج: JSON.stringify({ a: 1n })
TypeError: Do not know how to serialize a BigInt
~~~

[[1n]] رقم BigInt (أرقام صحيحة كبيرة جدًا)، و JSON معندوش النوع ده، فبيرمي error بدل ما يخمّن.

---

## الخلاصة

| الحاجة في JS | بعد stringify |
|---|---|
| مفتاح | بين [[""]] |
| undefined أو دالة في object | بتختفي |
| undefined أو دالة أو NaN في array | [[null]] |
| NaN و Infinity | [[null]] |
| Date | string ISO (ومترجعش Date لوحدها) |
| BigInt | TypeError |

> [[JSON.parse]] على أي نص جاي من برّه جوه [[try]] دايمًا.`,
          lines: [
            R`object فيه حاجتين مالهمش مكان في JSON: [[Date]] (JSON مفيهوش نوع تاريخ) و [[undefined]] (JSON مفيهوش undefined أصلًا). هنشوف كل واحدة بيحصلها إيه.`,
            R`[[JSON.stringify]] بتحوّل الـ object لـ string تقدر تبعته في request أو تحفظه في ملف أو localStorage. [[note]] اختفت خالص لأن قيمتها [[undefined]]، و [[createdAt]] بقت نص زي [["2026-01-01T00:00:00.000Z"]]. والدوال بتختفي بنفس الطريقة.`,
            R`التاني [[null]] مكان الـ replacer (مش محتاجينه)، والتالت [[2]] عدد المسافات. الناتج نفس الداتا بس على سطور ومتزاحة، فينفع للطباعة وانت بتدوّر على مشكلة أو لملف config هيقراه بني آدم.`,
            R`[[JSON.parse]] بتعمل العكس: بتاخد النص وترجّع object جديد. ده اللي بيحصل لما تقرا رد API أو ملف JSON.`,
            R`[[typeof]] بيقول [["string"]]: [[JSON.parse]] متعرفش إن النص ده كان تاريخ، فبيرجع string عادي. لو ناديت عليه [[getFullYear()]] هيرمي TypeError إنها مش function.`,
            R`لازم تحوّله تاريخ بنفسك بـ [[new Date()]] بعد الـ parse. ونفس الكلام لأي نوع مش موجود في JSON، زي Map و Set: بتحوّلهم بإيدك في الرايح وفي الجاي.`,
            R`[[JSON.parse]] بترمي error لو النص مش JSON سليم، وأي نص جاي من برّه (API أو ملف أو localStorage) ممكن يكون بايظ، فبنحطها جوه [[try]].`,
            R`JSON بيشترط إن المفاتيح تبقى بين علامات تنصيص مزدوجة، و [[{bad json}]] مش كده، فـ [[parse]] بترمي SyntaxError والتنفيذ بيقفز على [[catch]] على طول.`,
            R`[[catch]] بتمسك الـ error في [[err]]، فالبرنامج مبيقعش ويكمّل اللي بعد الـ try/catch عادي.`,
            R`بيطبع رسالة مفهومة ومعاها [[err.message]]، اللي هنا [[Expected property name or '}' in JSON at position 1]] فيعرّفك مكان المشكلة. وفي الكود الحقيقي هنا المكان اللي ترجّع فيه قيمة default بدل الداتا البايظة.`,
            R`نهاية الـ try/catch.`,
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
    }
]);
