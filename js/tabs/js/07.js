// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "المصفوفات",
      l: 1,
      n: "map و filter و reduce بدل اللوبات، و find و some، ومين بيعدّل الـ array ومين بيرجّع واحدة جديدة",
      pre: [
        { to: "js/for...of و for...in", why: R`اللف على عناصر الـ array واحد واحد، واللي [[map]] و [[filter]] بتعمله من غير loop` },
        { to: "js/function و arrow", why: R`كل method في الوحدة بتاخد arrow function صغيرة زي [[(n) => n * 2]]` },
        { to: "js/higher-order functions", why: R`[[map]] و [[filter]] و [[reduce]] و [[sort]] كلهم higher-order: بتبعتلهم دالة وهم ينادوها` },
      ],
      projects: [
        { lvl: 'صغير', t: R`لوحة طلبات اليوم`, what: R`array طلبات ([[{ id, total, status }]]): عدد كل status، وإجمالي المدفوع، ومتوسط الطلب، وأكبر طلب. كله بـ [[filter]] و [[map]] و [[reduce]] من غير for. من درس «map و filter و reduce».`, done: R`على طلبات الدرس (250 paid و 900 pending و 400 paid) إجمالي المدفوع 650 وأكبر طلب 900. ولو الـ array فاضية مفيش NaN ولا [[TypeError: Reduce of empty array with no initial value]].`, sol: R`**هتشوف إيه:** دالة [[summarize(orders)]] بترجّع object فيه ٤ إجابات: عدد كل status، وإجمالي المدفوع، ومتوسط الطلب، وأكبر طلب. ومتجرّبة على طلبات الدرس، وعلى array فاضية، وعلى طلبات فيها status جديد.

~~~js dashboard.js
// لوحة طلبات اليوم: كله بـ filter و map و reduce من غير for
function summarize(orders) {
  const counts = orders.reduce((acc, o) => ({ ...acc, [o.status]: (acc[o.status] ?? 0) + 1 }), {});
  const paidTotal = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.total, 0);
  const average = orders.length === 0 ? 0 : orders.reduce((sum, o) => sum + o.total, 0) / orders.length;
  const biggest = orders.reduce((best, o) => (best === null || o.total > best.total ? o : best), null);
  return { counts, paidTotal, average: Math.round(average * 100) / 100, biggest };
}

const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
console.log(summarize(orders));
console.log(summarize([]));
console.log(summarize([...orders, { id: 4, total: 75.5, status: "cancelled" }]));
~~~

~~~text الناتج: node dashboard.js
{
  counts: { paid: 2, pending: 1 },
  paidTotal: 650,
  average: 516.67,
  biggest: { id: 2, total: 900, status: 'pending' }
}
{ counts: {}, paidTotal: 0, average: 0, biggest: null }
{
  counts: { paid: 2, pending: 1, cancelled: 1 },
  paidTotal: 650,
  average: 406.38,
  biggest: { id: 2, total: 900, status: 'pending' }
}
~~~

**كل سطر بيعمل إيه:**

- **[[counts]]:** [[reduce]] بتبدأ من [[{}]]، وكل لفة بترجّع object جديد فيه كل اللي فات ([[...acc]]) والـ status ده متزوّد واحد. [[[o.status]]] بين أقواس مربعة = اسم المفتاح جاي من متغير، و [[acc[o.status] ?? 0]] = «لو أول مرة يبقى صفر». و status جديد زي [["cancelled"]] اتعدّ لوحده من غير ما نكتب اسمه في الكود.
- **[[paidTotal]]:** [[filter]] للمدفوع، وبعدين [[reduce]] بتجمع من 0: 250 + 400 = 650.
- **[[average]]:** المجموع على العدد، بس لو العدد صفر بنرجّع 0 قبل ما نقسم. و [[Math.round(x * 100) / 100]] تقريب لقرشين.
- **[[biggest]]:** [[reduce]] قيمتها الأولية [[null]] («لسه ملقيناش حاجة»)، وكل لفة بتسيب الأكبر. على array فاضية بترجّع [[null]] بهدوء.

**الغلطات اللي حصلت في أول محاولة** (جرّبتها على array فاضية):

~~~js first-try.js
const orders = [];
console.log(Math.max(...orders.map((o) => o.total)));
console.log(orders.reduce((s, o) => s + o.total, 0) / orders.length);
try {
  orders.reduce((best, o) => (o.total > best.total ? o : best));
} catch (error) {
  console.log(error.name + ": " + error.message);
}
~~~

~~~text الناتج: node first-try.js
-Infinity
NaN
TypeError: Reduce of empty array with no initial value
~~~

- [[Math.max(...[])]] بـ [[-Infinity]]: كانت هتظهر في اللوحة كإن أكبر طلب «سالب ما لا نهاية».
- القسمة على [[orders.length]] وهو صفر: [[0 / 0]] بـ [[NaN]].
- [[reduce]] من غير قيمة أولية على فاضية: [[TypeError]] بيوقّف الصفحة كلها.

الإصلاح في الحل: قيمة أولية في كل [[reduce]] (0 أو [[null]] أو [[{}]])، وفحص [[length === 0]] قبل القسمة. وده بالظبط شرط الـ done: «لو الـ array فاضية مفيش NaN ولا TypeError».` },
        { lvl: 'صغير', t: R`ترتيب الطلاب`, what: R`array طلاب ([[{ name, score }]]): رتّبهم بالدرجة تنازلي، واللي درجاتهم زي بعض بالاسم أبجدي، من غير ما تبوّظ الأصل. من درس «sort و toSorted».`, done: R`المترتب صح، والـ array الأصلية لسه بنفس ترتيبها (اطبعها بعد الترتيب واتأكد).`, sol: R`**هتشوف إيه:** جدول ترتيب من ٥ طلاب: المركز والاسم والدرجة، الأعلى الأول، واللي درجاتهم زي بعض مترتبين أبجدي. وتحته الـ array الأصلية بنفس ترتيبها القديم.

~~~js students.js
// ترتيب الطلاب: الدرجة تنازلي، واللي درجاتهم زي بعض بالاسم أبجدي
const students = [
  { name: "Omar", score: 88 },
  { name: "Sara", score: 95 },
  { name: "ali", score: 88 },
  { name: "Mona", score: 70 },
  { name: "Hana", score: 95 },
];

const byRank = (a, b) => b.score - a.score || a.name.localeCompare(b.name);
const ranked = students.toSorted(byRank);

ranked.forEach((s, i) => console.log($__bt$__{String(i + 1).padStart(2)}. $__{s.name.padEnd(5)} $__{s.score}$__bt));
console.log("الأصل:", students.map((s) => s.name).join(", "));
~~~

~~~text الناتج: node students.js
 1. Hana  95
 2. Sara  95
 3. ali   88
 4. Omar  88
 5. Mona  70
الأصل: Omar, Sara, ali, Mona, Hana
~~~

**كل حتة بتعمل إيه:**

- [[byRank]]: comparator واحد بمفتاحين. [[b.score - a.score]] الدرجة تنازلي، ولو طلع 0 (درجتين زي بعض) [[||]] بتروح لـ [[a.name.localeCompare(b.name)]] الاسم تصاعدي. Hana قبل Sara (الاتنين 95)، و ali قبل Omar (الاتنين 88).
- [[toSorted]]: بترجّع array جديدة، فـ [[students]] فضلت Omar, Sara, ali... زي ما دخلت. سميت الـ comparator باسم ([[byRank]]) عشان يتقري ويتستخدم تاني.
- [[String(i + 1).padStart(2)]] و [[padEnd(5)]]: الأرقام والأسامي في عواميد تحت بعض.

**الغلطة اللي حصلت:** أول نسخة كانت بتقارن الأسامي بـ [[<]]:

~~~js first-try.js
const students = [
  { name: "Omar", score: 88 },
  { name: "ali", score: 88 },
];
const byRank = (a, b) => b.score - a.score || (a.name < b.name ? -1 : 1);
console.log(students.toSorted(byRank).map((s) => s.name));
~~~

~~~text الناتج: node first-try.js
[ 'Omar', 'ali' ]
~~~

Omar طلع قبل ali، لأن [[<]] بيقارن أكواد الحروف، وكل الحروف الكبيرة (O = 79) قبل كل الصغيرة (a = 97). [[localeCompare]] بترتّب زي القاموس، فـ ali قبل Omar زي ما البني آدم متوقع. واسم الطالب بيتكتب بأي شكل، فالمقارنة لازم متفرقش.` },
        { lvl: 'متوسط', t: R`سلة مشتريات immutable`, what: R`[[addItem]] و [[removeItem]] و [[updateQty]] و [[cartTotal]]، كل دالة بترجّع سلة جديدة بـ spread و [[map]] و [[filter]] ومبتعدّلش القديمة. وإضافة منتج موجود بتزوّد الكمية. من وحدة «المصفوفات» و «default و rest و spread».`, done: R`لو عملت [[Object.freeze(cart)]] الأول كل الدوال لسه شغالة (لو دالة بتعمل push هتوقع بـ [[TypeError: Cannot add property ...]]). و [[updateQty(cart, id, 0)]] بتشيل المنتج، وإضافة نفس المنتج مرتين بتخلي الكمية 2 مش سطرين.`, sol: R`**هتشوف إيه:** سلسلة سلال ورا بعض (c1 لحد c5)، كل واحدة متجمّدة بـ [[Object.freeze]] وكل دالة اشتغلت عليها عادي: إضافة نفس المنتج مرتين بقت كمية 2 في سطر واحد، وتعديل الكمية لـ 0 شال المنتج، والسلال القديمة زي ما هي. وفي الآخر [[push]] على سلة متجمّدة وقع.

~~~js cart.js
"use strict";
// سلة immutable: كل دالة بترجّع سلة جديدة ومبتلمسش القديمة

function addItem(cart, product, qty = 1) {
  const exists = cart.some((item) => item.id === product.id);
  if (exists) {
    return cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item));
  }
  return [...cart, { ...product, qty }];
}

function removeItem(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function updateQty(cart, id, qty) {
  if (qty <= 0) return removeItem(cart, id);
  return cart.map((item) => (item.id === id ? { ...item, qty } : item));
}

function cartTotal(cart) {
  const cents = cart.reduce((sum, item) => sum + Math.round(item.price * 100) * item.qty, 0);
  return cents / 100;
}

const mug = { id: 1, name: "Mug", price: 120 };
const tea = { id: 2, name: "Tea", price: 12.5 };

const empty = Object.freeze([]);
const c1 = Object.freeze(addItem(empty, mug));
const c2 = Object.freeze(addItem(c1, mug));
const c3 = Object.freeze(addItem(c2, tea, 3));
const c4 = Object.freeze(updateQty(c3, 1, 5));
const c5 = updateQty(c4, 2, 0);

console.log("c2:", c2);
console.log("c3:", c3, "الإجمالي", cartTotal(c3));
console.log("c4 qty:", c4.map((i) => $__bt$__{i.name}×$__{i.qty}$__bt).join(" "), "| c3 لسه:", c3.map((i) => $__bt$__{i.name}×$__{i.qty}$__bt).join(" "));
console.log("c5:", c5, "الإجمالي", cartTotal(c5));
console.log("empty:", empty, "c1:", c1.length, "سطر");

try {
  c1.push(tea);
} catch (error) {
  console.log("push على سلة متجمّدة:", error.message);
}
~~~

~~~text الناتج: node cart.js
c2: [ { id: 1, name: 'Mug', price: 120, qty: 2 } ]
c3: [
  { id: 1, name: 'Mug', price: 120, qty: 2 },
  { id: 2, name: 'Tea', price: 12.5, qty: 3 }
] الإجمالي 277.5
c4 qty: Mug×5 Tea×3 | c3 لسه: Mug×2 Tea×3
c5: [ { id: 1, name: 'Mug', price: 120, qty: 5 } ] الإجمالي 600
empty: [] c1: 1 سطر
push على سلة متجمّدة: Cannot add property 1, object is not extensible
~~~

**كل دالة بتعمل إيه:**

- **[[addItem]]:** [[some]] الأول: المنتج موجود؟ لو أيوه، [[map]] بترجّع array جديدة: العنصر ده object جديد بكمية أكبر ([[{ ...item, qty: item.qty + qty }]])، والباقي زي ما هو. لو لأ، [[[...cart, { ...product, qty }]]] array جديدة فيها القديم والجديد. و [[qty = 1]] default.
- **[[removeItem]]:** [[filter]] بتسيب كل حاجة ما عدا الـ id ده.
- **[[updateQty]]:** لو الكمية 0 أو أقل، بتستخدم [[removeItem]] بدل ما تسيب سطر كميته صفر. وإلا [[map]] زي [[addItem]].
- **[[cartTotal]]:** [[reduce]] بالقروش ([[Math.round(price * 100)]]) عشان 12.5 × 3 تتجمع صح، والقسمة على 100 في الآخر.
- **[[Object.freeze]] على كل سلة:** ده الاختبار نفسه. لو أي دالة عملت [[push]] أو [[cart[0].qty = ...]]، الملف [[use strict]] فهترمي [[TypeError]] على طول.

**ليه c3 لسه [[Mug×2]] بعد ما عملنا c4:** [[updateQty]] عملت array جديدة و object جديد للـ Mug، والقديم ملمسناهوش. ده اللي بيخلي React يعرف إن الـ state اتغيّر (بيقارن الـ reference)، ويخليك تعمل «تراجع» بإنك ترجع للسلة اللي قبلها.

**الغلطة اللي حصلت:** أول [[addItem]] كانت [[cart.push(...)]] و [[return cart]]:

~~~js first-try.js
"use strict";
function addItem(cart, product) {
  cart.push({ ...product, qty: 1 });
  return cart;
}
const c1 = Object.freeze([]);
try {
  addItem(c1, { id: 1, name: "Mug", price: 120 });
} catch (error) {
  console.log(error.name + ": " + error.message);
}
~~~

~~~text الناتج: node first-try.js
TypeError: Cannot add property 0, object is not extensible
~~~

السلة المتجمّدة رفضت الإضافة، وده بالظبط اللي الـ done طالبه: الـ freeze بيكشف أي دالة بتعدّل. ولاحظ إن [[Object.freeze]] بيجمّد مستوى واحد (الـ array)، مش الـ objects اللي جواها. عشان كده [[map]] بـ [[{ ...item }]] مهم: لو كتبت [[item.qty += 1]] جوه الـ map مش هتوقع، بس هتعدّل السلة القديمة من غير ما تحس.` },
        { lvl: 'متوسط', t: R`بحث وفلترة منتجات`, what: R`[[search(products, { q, min, max, inStock, sortBy, page })]]: بحث بالاسم من غير ما يفرق في الحروف الكبيرة ([[includes]])، ومدى سعر، والمتاح بس، وترتيب، وصفحة ٥ منتجات بـ [[slice]]. كل الـ options ليها defaults. من وحدة «المصفوفات» و «default و rest و spread» و «string methods».`, done: R`[[search(products)]] من غير options بيرجّع أول ٥، والبحث بـ [["MUG"]] بيلاقي "Mug"، والصفحة بعد الآخر بترجّع [[[]]]، والـ products الأصلية مبتتغيّرش.`, sol: R`**هتشوف إيه:** ٦ نداءات لنفس الدالة [[search]] بـ options مختلفة: من غير options خالص (أول ٥ بالاسم)، والصفحة التانية، وصفحة بعد الآخر (فاضية)، وبحث بحروف كبيرة، وبحث + المتاح بس + ترتيب بالسعر، ومدى سعر. وفي الآخر تأكيد إن الـ products الأصلية متغيّرتش.

~~~js search.js
// بحث وفلترة منتجات: كل الـ options ليها defaults، والـ products الأصلية مبتتغيّرش
const PAGE_SIZE = 5;

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
};

function search(products, { q = "", min = 0, max = Infinity, inStock = false, sortBy = "name", page = 1 } = {}) {
  const needle = q.trim().toLowerCase();
  const compare = sorters[sortBy] ?? sorters.name;
  const start = (page - 1) * PAGE_SIZE;
  return products
    .filter((p) => p.name.toLowerCase().includes(needle))
    .filter((p) => p.price >= min && p.price <= max)
    .filter((p) => !inStock || p.stock > 0)
    .toSorted(compare)
    .slice(start, start + PAGE_SIZE);
}

const products = [
  { name: "Mug", price: 120, stock: 4 },
  { name: "Travel Mug", price: 240, stock: 0 },
  { name: "Cap", price: 90, stock: 12 },
  { name: "Notebook", price: 45, stock: 30 },
  { name: "Pen", price: 15, stock: 100 },
  { name: "Tote Bag", price: 150, stock: 7 },
  { name: "Sticker", price: 10, stock: 0 },
  { name: "Mug Set", price: 400, stock: 2 },
];
const snapshot = JSON.stringify(products);
const names = (list) => list.map((p) => $__bt$__{p.name} $__{p.price}$__bt).join(" | ");

console.log("1:", names(search(products)));
console.log("2:", names(search(products, { page: 2 })));
console.log("3:", names(search(products, { page: 3 })));
console.log("4:", names(search(products, { q: "MUG" })));
console.log("5:", names(search(products, { q: "mug", inStock: true, sortBy: "priceDesc" })));
console.log("6:", names(search(products, { min: 40, max: 150, sortBy: "priceAsc" })));
console.log("الأصل متغيّرش:", JSON.stringify(products) === snapshot);
~~~

~~~text الناتج: node search.js
1: Cap 90 | Mug 120 | Mug Set 400 | Notebook 45 | Pen 15
2: Sticker 10 | Tote Bag 150 | Travel Mug 240
3: 
4: Mug 120 | Mug Set 400 | Travel Mug 240
5: Mug Set 400 | Mug 120
6: Notebook 45 | Cap 90 | Mug 120 | Tote Bag 150
الأصل متغيّرش: true
~~~

**كل حتة بتعمل إيه:**

- **الباراميتر التاني** [[{ q = "", min = 0, max = Infinity, inStock = false, sortBy = "name", page = 1 } = {}]]: object options بـ default لكل خانة، و [[= {}]] عشان [[search(products)]] من غير options تشتغل. [[max = Infinity]] يعني «مفيش حد أقصى» من غير ما نكتب if.
- **[[q.trim().toLowerCase()]] و [[p.name.toLowerCase().includes(needle)]]:** الطرفين بحروف صغيرة، فـ [["MUG"]] لقت Mug و Mug Set و Travel Mug. و [[""]] (البحث الفاضي) بيتطابق مع أي نص، فمن غير [[q]] كل المنتجات بتعدّي.
- **[[!inStock || p.stock > 0]]:** لو الفلتر مقفول ([[inStock]] false) الشرط true لكل منتج. لو مفتوح، المتاح بس.
- **[[sorters[sortBy] ?? sorters.name]]:** object فيه الـ comparators بالاسم (زي آلة الحاسبة في الوحدة اللي فاتت)، ولو حد بعت sortBy مش معروف نرجع للاسم بدل ما نوقع.
- **[[toSorted]] ثم [[slice(start, start + PAGE_SIZE)]]:** الترتيب **قبل** التقسيم لصفحات، وإلا كل صفحة هتبقى مترتبة لوحدها. و [[slice]] بعد الآخر بترجّع [[[]]] من غير error (السطر 3).
- **[[JSON.stringify(products) === snapshot]]:** بنصوّر الداتا قبل وبعد ونقارن، أبسط طريقة نتأكد إن مفيش حاجة اتعدّلت.

**الغلطات اللي حصلت:**

~~~js first-try.js
const products = ["Cap", "Mug", "Mug Set", "Notebook", "Pen", "Sticker", "Tote Bag", "Travel Mug"];
const page = (list, n, size = 5) => list.slice(n * size, n * size + size);
console.log(page(products, 1));
console.log("Mug".includes("MUG"), "Mug".includes(""));
~~~

~~~text الناتج: node first-try.js
[ 'Sticker', 'Tote Bag', 'Travel Mug' ]
false true
~~~

- حسبت بداية الصفحة [[n * size]]، فـ [[page(products, 1)]] رجّعت التانية (Sticker...) والأولى ضاعت. الصفحات بتبدأ من 1 عند اليوزر ومن 0 في [[slice]]، فالصح [[(page - 1) * size]].
- [["Mug".includes("MUG")]] بـ false: [[includes]] بيفرق في الحروف الكبيرة، عشان كده الطرفين [[toLowerCase]].
- ملاحظة: [[filter(...).sort(...)]] كانت هتبقى آمنة هنا برضه، لأن [[filter]] بترجّع array جديدة و [[sort]] بتعدّلها هي مش الأصل. بس [[toSorted]] بتفضل صح حتى لو حد شال الـ filter بعدين.` },
        { lvl: 'كبير', t: R`تقرير مبيعات من داتا API`, what: R`الصق JSON مبيعات (٢٠ عملية: id و product و qty و price و date زي [["2026-03-14"]]) في متغير، وفيهم ٣ بايظين (qty نص، price سالب، date ناقص). [[report(sales)]] بتفصل البايظ مع سببه، وتجمع الإجمالي لكل شهر (من [[date.slice(0, 7)]])، وأكتر ٣ منتجات بيعًا، وتعرض بـ [[console.table]]. واختبارات بـ [[check]]. من وحدة «المصفوفات» و «القيم والأنواع» و «الدوال».`, done: R`الـ ٣ البايظين ظاهرين في جدول لوحدهم بسبب كل واحد، والإجمالي الكلي = مجموع الشهور بالظبط (بالقروش)، والـ top 3 مترتبين تنازلي، و [[report([])]] بيطبع «مفيش مبيعات» من غير error، والـ sales الأصلية زي ما هي.`, ext: R`زوّد مقارنة كل شهر باللي قبله بالنسبة المئوية، وخلّيه يقبل فلتر بمدى تاريخ.`, sol: R`**هتشوف إيه:** ٣ جداول في الترمنال بـ [[console.table]]: العمليات البايظة وسبب كل واحدة، والإجمالي لكل شهر، وأكتر ٣ منتجات بيعًا بالكمية، وبعدهم الإجمالي الكلي. ونداء على array فاضية بيقول «مفيش مبيعات». ومعاه ٧ اختبارات بـ [[node --test]].

~~~text شجرة الملفات
sales-report/
├── sales.js         الداتا: ٢٠ عملية زي ما رجعت من API (٣ بايظين)
├── report.js        problem و analyze و report
├── report.test.js   الاختبارات (node --test)
└── run.js           بيطبع التقرير
~~~

**ترتيب البناء:** [[problem]] الأول (هي اللي بتقرر مين سليم)، وبعدين [[analyze]] اللي بترجّع أرقام بس من غير طباعة (عشان تتختبر)، وبعدين [[report]] اللي بتعرض، وآخر حاجة الاختبارات.

~~~js sales.js
// ٢٠ عملية بيع زي ما بترجع من API (فيهم ٣ بايظين عن قصد)
module.exports = [
  { id: 1, product: "Mug", qty: 2, price: 120, date: "2026-01-03" },
  { id: 2, product: "Cap", qty: 1, price: 90, date: "2026-01-05" },
  { id: 3, product: "Tea", qty: 6, price: 12.5, date: "2026-01-09" },
  { id: 4, product: "Mug", qty: 1, price: 120, date: "2026-01-14" },
  { id: 5, product: "Notebook", qty: 3, price: 45, date: "2026-01-20" },
  { id: 6, product: "Tea", qty: "2", price: 12.5, date: "2026-01-22" },
  { id: 7, product: "Pen", qty: 10, price: 15, date: "2026-02-01" },
  { id: 8, product: "Mug", qty: 3, price: 120, date: "2026-02-04" },
  { id: 9, product: "Cap", qty: 2, price: 90, date: "2026-02-08" },
  { id: 10, product: "Tea", qty: 4, price: 12.5, date: "2026-02-11" },
  { id: 11, product: "Tote Bag", qty: 1, price: 150, date: "2026-02-15" },
  { id: 12, product: "Pen", qty: 5, price: 15, date: "2026-02-19" },
  { id: 13, product: "Cap", qty: 1, price: -50, date: "2026-02-21" },
  { id: 14, product: "Notebook", qty: 2, price: 45, date: "2026-02-27" },
  { id: 15, product: "Tea", qty: 8, price: 12.5, date: "2026-03-02" },
  { id: 16, product: "Mug", qty: 2, price: 120, date: "2026-03-06" },
  { id: 17, product: "Pen", qty: 4, price: 15, date: "2026-03-10" },
  { id: 18, product: "Tote Bag", qty: 2, price: 150, date: "" },
  { id: 19, product: "Cap", qty: 3, price: 90, date: "2026-03-18" },
  { id: 20, product: "Notebook", qty: 1, price: 45, date: "2026-03-25" },
];
~~~

~~~js report.js
"use strict";
// تقرير مبيعات: يفصل البايظ بسببه، ويجمع كل شهر، ويطلّع أكتر ٣ منتجات بيعًا

const DATE = /^\d{4}-\d{2}-\d{2}$/;

// سبب البوظان، أو null لو العملية سليمة
function problem(sale) {
  if (typeof sale.qty !== "number" || !Number.isInteger(sale.qty) || sale.qty <= 0) return $__btqty مش رقم صحيح موجب ($__{JSON.stringify(sale.qty)})$__bt;
  if (typeof sale.price !== "number" || !(sale.price >= 0)) return $__btprice مش سليم ($__{JSON.stringify(sale.price)})$__bt;
  if (typeof sale.date !== "string" || !DATE.test(sale.date)) return $__btdate ناقص أو مش بالشكل YYYY-MM-DD ($__{JSON.stringify(sale.date)})$__bt;
  return null;
}

const cents = (sale) => Math.round(sale.price * 100) * sale.qty;

function analyze(sales) {
  const bad = sales.filter((s) => problem(s) !== null).map((s) => ({ id: s.id, reason: problem(s) }));
  const good = sales.filter((s) => problem(s) === null);

  const monthCents = good.reduce((acc, s) => {
    const month = s.date.slice(0, 7);
    return { ...acc, [month]: (acc[month] ?? 0) + cents(s) };
  }, {});
  const months = Object.entries(monthCents)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([month, c]) => ({ month, total: c / 100 }));

  const qtyByProduct = good.reduce((acc, s) => ({ ...acc, [s.product]: (acc[s.product] ?? 0) + s.qty }), {});
  const top = Object.entries(qtyByProduct)
    .map(([product, qty]) => ({ product, qty }))
    .toSorted((a, b) => b.qty - a.qty || a.product.localeCompare(b.product))
    .slice(0, 3);

  const grandTotal = good.reduce((sum, s) => sum + cents(s), 0) / 100;
  return { bad, months, top, grandTotal, count: good.length };
}

function report(sales, { table = console.table, log = console.log } = {}) {
  if (!Array.isArray(sales) || sales.length === 0) {
    log("مفيش مبيعات");
    return null;
  }
  const result = analyze(sales);
  if (result.bad.length > 0) {
    log($__btعمليات بايظة ($__{result.bad.length}):$__bt);
    table(result.bad);
  }
  log($__btالإجمالي لكل شهر ($__{result.count} عملية سليمة):$__bt);
  table(result.months);
  log("أكتر ٣ منتجات بيعًا:");
  table(result.top);
  log($__btالإجمالي الكلي: $__{result.grandTotal}$__bt);
  return result;
}

module.exports = { problem, analyze, report };
~~~

~~~js run.js
const sales = require("./sales");
const { report } = require("./report");

report(sales);
report([]);
~~~

~~~js report.test.js
const test = require("node:test");
const assert = require("node:assert");
const sales = require("./sales");
const { problem, analyze, report } = require("./report");

const result = analyze(sales);

test("الـ ٣ البايظين ظاهرين بسبب كل واحد", () => {
  assert.deepStrictEqual(result.bad.map((b) => b.id), [6, 13, 18]);
  assert.match(result.bad[0].reason, /^qty/);
  assert.match(result.bad[1].reason, /^price/);
  assert.match(result.bad[2].reason, /^date/);
});

test("الإجمالي الكلي = مجموع الشهور بالظبط", () => {
  const sumMonths = result.months.reduce((s, m) => s + Math.round(m.total * 100), 0) / 100;
  assert.strictEqual(result.grandTotal, sumMonths);
  assert.strictEqual(result.count, 17);
});

test("الشهور مترتبة وأرقامها صح", () => {
  assert.deepStrictEqual(result.months, [
    { month: "2026-01", total: 660 },
    { month: "2026-02", total: 1055 },
    { month: "2026-03", total: 715 },
  ]);
});

test("أكتر ٣ منتجات مترتبين تنازلي", () => {
  assert.deepStrictEqual(result.top, [
    { product: "Pen", qty: 19 },
    { product: "Tea", qty: 18 },
    { product: "Mug", qty: 8 },
  ]);
});

test("report([]) بتقول «مفيش مبيعات» من غير error", () => {
  const lines = [];
  assert.strictEqual(report([], { log: (l) => lines.push(l) }), null);
  assert.deepStrictEqual(lines, ["مفيش مبيعات"]);
});

test("الـ sales الأصلية متغيّرتش", () => {
  const before = JSON.stringify(sales);
  report(sales, { table: () => {}, log: () => {} });
  assert.strictEqual(JSON.stringify(sales), before);
});

test("problem بيمسك الحالات الطرفية", () => {
  assert.strictEqual(problem({ qty: 1, price: 0, date: "2026-01-01" }), null);
  assert.match(problem({ qty: 1.5, price: 10, date: "2026-01-01" }), /^qty/);
  assert.match(problem({ qty: 1, price: NaN, date: "2026-01-01" }), /^price/);
  assert.match(problem({ qty: 1, price: 10 }), /^date/);
});
~~~

~~~text الناتج: node run.js
عمليات بايظة (3):
┌─────────┬────┬──────────────────────────────────────────┐
│ (index) │ id │ reason                                   │
├─────────┼────┼──────────────────────────────────────────┤
│ 0       │ 6  │ 'qty مش رقم صحيح موجب ("2")'             │
│ 1       │ 13 │ 'price مش سليم (-50)'                    │
│ 2       │ 18 │ 'date ناقص أو مش بالشكل YYYY-MM-DD ("")' │
└─────────┴────┴──────────────────────────────────────────┘
الإجمالي لكل شهر (17 عملية سليمة):
┌─────────┬───────────┬───────┐
│ (index) │ month     │ total │
├─────────┼───────────┼───────┤
│ 0       │ '2026-01' │ 660   │
│ 1       │ '2026-02' │ 1055  │
│ 2       │ '2026-03' │ 715   │
└─────────┴───────────┴───────┘
أكتر ٣ منتجات بيعًا:
┌─────────┬─────────┬─────┐
│ (index) │ product │ qty │
├─────────┼─────────┼─────┤
│ 0       │ 'Pen'   │ 19  │
│ 1       │ 'Tea'   │ 18  │
│ 2       │ 'Mug'   │ 8   │
└─────────┴─────────┴─────┘
الإجمالي الكلي: 2430
مفيش مبيعات
~~~

~~~text الناتج: node --test
✔ الـ ٣ البايظين ظاهرين بسبب كل واحد (1.3562ms)
✔ الإجمالي الكلي = مجموع الشهور بالظبط (0.7134ms)
✔ الشهور مترتبة وأرقامها صح (0.1526ms)
✔ أكتر ٣ منتجات مترتبين تنازلي (0.1437ms)
✔ report([]) بتقول «مفيش مبيعات» من غير error (0.1778ms)
✔ الـ sales الأصلية متغيّرتش (0.2107ms)
✔ problem بيمسك الحالات الطرفية (0.2723ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 86.5031
~~~

**أهم الحتت وليه كده:**

| الحتة | بتعمل إيه | ليه |
|---|---|---|
| [[problem(sale)]] | بترجّع السبب كنص أو [[null]] | نفس الدالة بتفصل ([[filter]]) وبتكتب السبب ([[map]])، فالقاعدة مكتوبة مرة واحدة |
| [[typeof sale.qty !== "number"]] | [["2"]] نص بيتحسب بايظ | لو حوّلناه بـ [[Number]] كنا هنخبّي إن الـ API بيبعت أنواع غلط |
| [[!(sale.price >= 0)]] | سالب أو NaN أو مش رقم | [[NaN < 0]] بـ false، فلو كتبنا [[price < 0]] الـ NaN كان هيعدّي. [[NaN >= 0]] برضه false، فالنفي بيمسكه |
| [[DATE.test(sale.date)]] | الشكل [[YYYY-MM-DD]] | [[""]] و [[undefined]] بيقعوا، والشهر بعدها [[slice(0, 7)]] مضمون |
| [[cents(sale)]] | السعر بالقروش × الكمية | الإجمالي الكلي = مجموع الشهور بالظبط، من غير كسور [[0.1 + 0.2]] |
| [[{ ...acc, [month]: ... }]] | object بيتجمع فيه كل شهر | نفس شكل [[counts]] في لوحة الطلبات |
| [[Object.entries(...).toSorted(...)]] | الشهور مترتبة | ترتيب المفاتيح في الـ object مش وعد تعتمد عليه للعرض |
| [[b.qty - a.qty \|\| a.product.localeCompare(b.product)]] | الكمية تنازلي، والتعادل بالاسم | الـ top 3 ثابت كل مرة حتى لو منتجين نفس الكمية |
| [[report(sales, { table, log })]] | الطباعة دوال بتتبعت | الاختبار بيبعت دوال بتجمّع السطور بدل ما تطبع، فيتأكد من «مفيش مبيعات» |

**الغلطة اللي حصلت وأنا ببنيه:** أول تشغيل للاختبارات وقع في الشهور:

~~~text الناتج: node --test (أول مرة، مختصر)
✖ الشهور مترتبة وأرقامها صح (1.1694ms)
ℹ pass 6
ℹ fail 1
  +     total: 1055
  -     total: 945
~~~

كنت حاسب فبراير بإيدي 945. رجعت عدّيت العمليات السليمة واحدة واحدة: 150 (Pen) + 360 (Mug) + 180 (Cap) + 50 (Tea) + 150 (Tote Bag) + 75 (Pen) + 90 (Notebook) = 1055، والعملية 13 (السعر السالب) مستبعدة. الكود كان صح والمتوقع اللي في الاختبار هو اللي غلط، فصلّحته لـ 1055. الدرس: الاختبار بيقارن رقمين، ولما يختلفوا ارجع للداتا نفسها قبل ما تعدّل الكود. ونفس الكلام في الـ top 3: كنت متوقع Tea الأول، والعدّ بيقول Pen بـ 19 (10 + 5 + 4) قبل Tea بـ 18 (6 + 4 + 8، من غير العملية 6 البايظة).` },
        { lvl: 'فكرة', t: R`داتا من حياتك`, what: R`اختار لستة حقيقية عندك: مصاريف الشهر، أفلام اتفرجت عليها، ماتشات فريقك، ساعات مذاكرة. اكتبها array objects وطلّع منها ٥ أسئلة ليها إجابة بـ map و filter و reduce و sort و find.`, done: R`كل سؤال إجابته دالة لوحدها ورقمها مطابق لحسبتك بإيدك على الأقل في سؤالين.`, ext: R`اعرضها في صفحة HTML بعد وحدة الـ DOM، وزوّد رسم بسيط بالـ CSS.`, sol: R`**نسخة نموذجية:** مصاريف شهر (١٢ مصروف بالفئة والمبلغ واليوم)، و ٥ أسئلة كل واحد إجابته دالة: الإجمالي، وكل فئة أخدت كام، وأغلى ٣ مصاريف، وأول يوم الأكل عدّى فيه حد معين، وهل المواصلات عدّت حد.

~~~js expenses.js
// مصاريف شهر، و ٥ أسئلة كل سؤال إجابته دالة
const expenses = [
  { day: 1, what: "إيجار", category: "سكن", amount: 4500 },
  { day: 2, what: "سوبر ماركت", category: "أكل", amount: 820 },
  { day: 3, what: "مواصلات الأسبوع", category: "مواصلات", amount: 210 },
  { day: 6, what: "فطار برّه", category: "أكل", amount: 150 },
  { day: 9, what: "كهربا", category: "فواتير", amount: 380 },
  { day: 10, what: "مواصلات الأسبوع", category: "مواصلات", amount: 230 },
  { day: 14, what: "سوبر ماركت", category: "أكل", amount: 760 },
  { day: 15, what: "نت", category: "فواتير", amount: 450 },
  { day: 17, what: "مواصلات الأسبوع", category: "مواصلات", amount: 195 },
  { day: 21, what: "عشا مع صحابي", category: "أكل", amount: 540 },
  { day: 24, what: "مواصلات الأسبوع", category: "مواصلات", amount: 240 },
  { day: 28, what: "سوبر ماركت", category: "أكل", amount: 690 },
];

// ١. صرفت كام في الشهر؟
const total = (list) => list.reduce((sum, e) => sum + e.amount, 0);

// ٢. كل فئة أخدت كام، من الأكبر للأصغر؟
const byCategory = (list) =>
  Object.entries(Object.groupBy(list, (e) => e.category))
    .map(([category, items]) => ({ category, amount: total(items) }))
    .toSorted((a, b) => b.amount - a.amount);

// ٣. أغلى ٣ مصاريف (من غير الإيجار)؟
const topThree = (list) =>
  list.filter((e) => e.category !== "سكن").toSorted((a, b) => b.amount - a.amount).slice(0, 3).map((e) => $__bt$__{e.what} $__{e.amount}$__bt);

// ٤. أول يوم الأكل عدّى فيه 1500 مجمّع؟
function dayFoodPassed(list, limit) {
  let running = 0;
  const hit = list.find((e) => e.category === "أكل" && (running += e.amount) > limit);
  return hit ? hit.day : null;
}

// ٥. فيه أسبوع المواصلات عدّت فيه 235؟ وكلها أقل من 300؟
const transport = (list) => list.filter((e) => e.category === "مواصلات");
const anyOver = (list, n) => transport(list).some((e) => e.amount > n);
const allUnder = (list, n) => transport(list).every((e) => e.amount < n);

console.log("١. الإجمالي:", total(expenses));
console.table(byCategory(expenses));
console.log("٣. أغلى ٣:", topThree(expenses));
console.log("٤. الأكل عدّى 1500 يوم:", dayFoodPassed(expenses, 1500));
console.log("٥. مواصلات فوق 235:", anyOver(expenses, 235), "| كلها تحت 300:", allUnder(expenses, 300));
~~~

~~~text الناتج: node expenses.js
١. الإجمالي: 9165
┌─────────┬───────────┬────────┐
│ (index) │ category  │ amount │
├─────────┼───────────┼────────┤
│ 0       │ 'سكن'     │ 4500   │
│ 1       │ 'أكل'     │ 2960   │
│ 2       │ 'مواصلات' │ 875    │
│ 3       │ 'فواتير'  │ 830    │
└─────────┴───────────┴────────┘
٣. أغلى ٣: [ 'سوبر ماركت 820', 'سوبر ماركت 760', 'سوبر ماركت 690' ]
٤. الأكل عدّى 1500 يوم: 14
٥. مواصلات فوق 235: true | كلها تحت 300: true
~~~

**ليه اخترت الأسئلة دي:** كل سؤال بيستخدم أداة مختلفة من الوحدة، فهي مراجعة للوحدة كلها على داتا تخصّك:

| السؤال | الأداة | ليه هي |
|---|---|---|
| الإجمالي | [[reduce]] | لمّ لستة في رقم واحد |
| كل فئة | [[Object.groupBy]] ثم [[map]] ثم [[toSorted]] | تقسيم، وبعدين حساب لكل مجموعة، وبعدين ترتيب |
| أغلى ٣ | [[filter]] ثم [[toSorted]] ثم [[slice]] ثم [[map]] | شيل الإيجار (معروف ومش مفيد في السؤال)، رتّب، خد أول ٣، حوّلهم نص |
| أول يوم عدّى الحد | [[find]] | محتاج **أول** واحد ونقف |
| فيه / كلها | [[some]] و [[every]] | إجابة نعم/لا |

**اتأكدت بإيدي في سؤالين:** الأكل = 820 + 150 + 760 + 540 + 690 = 2960 زي الجدول. وأول يوم الأكل عدّى 1500: يوم 2 بقى 820، ويوم 6 بقى 970، ويوم 14 بقى 1730، فيوم 14 زي ما الدالة قالت.

**حاجة تاخد بالك منها:** [[dayFoodPassed]] بتزوّد [[running]] **جوه** شرط [[find]]. ده side effect جوه callback، ومسموح هنا لأن [[find]] بتمشي بالترتيب وبتقف عند أول true، والمتغير محلي جوه الدالة. بس لو نقلت نفس الفكرة لـ [[filter]] أو ناديت الدالة مرتين على نفس المتغير هتتلخبط. النسخة الأوضح لو حد تاني هيقرا الكود: loop عادي بـ [[for...of]] و [[break]].` }
      ],
      items: [
        {
          cmd: "array literals و index و length",
          title: "array يعني إيه: لستة في متغير واحد، تقرا عنصر وتعدّله برقمه، وتزوّد وتشيل من أولها وآخرها",
          desc: R`الـ array لستة قيم مترتبة في متغير واحد: [[const cart = ["عيش", "لبن", "جبنة"];]]. بتكتبها بين [[[ ]]] (ده اسمه array literal)، وكل عنصر ليه رقم مكانه (الـ index) **بيبدأ من 0**: [[cart[0]]] أول عنصر، و [[cart[cart.length - 1]]] آخر عنصر.
• تقرا بـ [[arr[i]]] وتعدّل بـ [[arr[i] = y]]، و [[length]] عدد العناصر (وتقدر تكتب فيه كمان: [[arr.length = 0]] بتفضّيها).
• [[push]] و [[pop]] بيزوّدوا ويشيلوا من **الآخر**، و [[unshift]] و [[shift]] من **الأول**.
• [[indexOf(x)]] مكان العنصر أو [[-1]]، و [[join(", ")]] بتحوّل الـ array لنص، و [[split(", ")]] بترجّع النص array.
ولو قريت index مش موجود مفيش error: بيرجع [[undefined]]. وده أول فخ في الـ arrays.`,
          example: R`const cart = ["عيش", "لبن", "جبنة"];
console.log(cart[0], cart[2], cart.length);
cart[1] = "لبن قليل الدسم";
cart.push("بيض");
const last = cart.pop();
cart.unshift("مية");
const first = cart.shift();
console.log(cart.indexOf("جبنة"), cart.indexOf("شاي"));
const text = cart.join("، ");
console.log(text, text.split("، "));`,
          try: R`اعمل [[const scores = [70, 85, 90];]]. اطبع أول درجة وآخر درجة من غير ما تكتب الرقم 2 (استخدم [[length]]). زوّد درجة 60 في الآخر، وغيّر أول درجة لـ 75، واطبع مكان 90 بـ [[indexOf]]. وبعدين اطبع [[scores[10]]] وشوف بيحصل إيه، واكتب [[scores[10] = 100]] واطبع الـ array كلها و [[length]].`,
          sol: R`~~~js scores.js
const scores = [70, 85, 90];
console.log(scores[0], scores[scores.length - 1]);
scores.push(60);
scores[0] = 75;
console.log(scores, scores.indexOf(90));
console.log(scores[10]);
scores[10] = 100;
console.log(scores, scores.length);
~~~

~~~text الناتج
70 90
[ 75, 85, 90, 60 ] 2
undefined
[ 75, 85, 90, 60, <6 empty items>, 100 ] 11
~~~

- [[scores[scores.length - 1]]]: الطول 3، والـ index بيبدأ من 0، فآخر عنصر عند 2. كده الكود شغال مهما الطول اتغيّر.
- [[scores[10]]] مش error: بيرجّع [[undefined]] بهدوء لأن مفيش عنصر هناك.
- الكتابة في [[scores[10]]] **بتطوّل** الـ array لـ 11، والأماكن من 4 لـ 9 بقت فاضية (holes). Node بيكتبها [[<6 empty items>]]. ده نادرًا ما بيبقى قصدك: في القسم ٩ من الشرح هتعرف ليه تتجنبه.`,
          teach: R`## الفكرة: لستة في متغير واحد

عندك ٣ حاجات تشتريها. من غير array هتكتب:

~~~js
const item1 = "عيش";
const item2 = "لبن";
const item3 = "جبنة";
~~~

وبعدين؟ لو بقوا ٢٠؟ ولو عايز تلف عليهم بـ loop، أو تعدّهم، أو تضيف واحد وانت شغال؟ مفيش طريقة تقول «كل المتغيرات اللي اسمها item». الـ **array** (مصفوفة) بتحل ده: **قيمة واحدة جواها لستة قيم مترتبة**، في متغير واحد:

~~~js
const cart = ["عيش", "لبن", "جبنة"];
~~~

ودلوقتي تقدر: تعدّهم ([[cart.length]])، وتلف عليهم ([[for (const item of cart)]] من درس «for...of و for...in»)، وتزوّد وتشيل، وتبعتهم لدالة كحاجة واحدة. أي «لستة» في برنامج حقيقي (منتجات، رسايل، درجات، صفوف من داتابيز) هي array. كل الأرقام اللي تحت من تشغيل الكود على Node 24.22 (ويندوز 11).

---

## ١. array literals: [[[a, b, c]]]

الطريقة اللي هتكتب بيها array في ٩٩٪ من الوقت اسمها **array literal**: قوسين مربعين، والعناصر جواهم مفصولة بـ [[,]].

~~~js literals.js
const mixed = [1, "اتنين", true, null, { id: 3 }, [4, 5]];
console.log(mixed.length, typeof mixed, Array.isArray(mixed), Array.isArray("abc"));
const empty = [];
console.log(empty, empty.length);
const long = [
  "سطر أول",
  "سطر تاني",
];
console.log(long.length);
~~~

~~~text الناتج
6 object true false
[] 0
2
~~~

- **أي نوع ينفع يبقى عنصر**، حتى خليط: رقم ونص و boolean و [[null]] و object و array جوه array. في الشغل الحقيقي بتخلّي العناصر من نوع واحد (كلها أرقام، أو كلها objects بنفس الشكل) عشان الكود اللي بيلف عليها يبقى بسيط.
- [[typeof]] بيقول [["object"]] مش [["array"]]: الـ array نوع خاص من الـ objects (درس «typeof»). عشان تسأل «ده array؟» استخدم [[Array.isArray(x)]].
- [[[]]] array فاضية طولها 0، وهي البداية المعتادة قبل ما تملاها بـ [[push]].
- **الفاصلة الأخيرة** ([["سطر تاني",]]) مسموحة ومش بتزوّد عنصر: الطول 2. بنكتبها لما الـ array على كذا سطر، عشان لما تزوّد سطر الـ diff في Git يبقى سطر واحد.

---

## ٢. الـ index من 0: [[arr[i]]] للقراية

كل عنصر ليه رقم مكانه، اسمه **index**، و**بيبدأ من 0** مش 1:

~~~text الأماكن
 index:    0       1       2
 القيمة:  "عيش"   "لبن"   "جبنة"
~~~

~~~js read.js
const a = [10, 20, 30];
console.log(a[0], a[a.length - 1], a[3], a[-1], a["1"], a[1.5]);
~~~

~~~text الناتج
10 30 undefined undefined 20 undefined
~~~

| القراية | النتيجة | ليه |
|---|---|---|
| [[a[0]]] | 10 | أول عنصر دايمًا عند 0 |
| [[a[a.length - 1]]] | 30 | آخر عنصر: الطول 3، فآخر index هو 2 |
| [[a[3]]] | [[undefined]] | برّه المدى: مفيش error، بيرجع [[undefined]] بهدوء |
| [[a[-1]]] | [[undefined]] | السالب مش «من الآخر» مع الأقواس. [[a.at(-1)]] هي اللي بتعمل كده (وحدة «المصفوفات و Map و Set كاملين») |
| [[a["1"]]] | 20 | الـ index بيتحوّل لنص من جوه، فـ [["1"]] و [[1]] نفس المكان |
| [[a[1.5]]] | [[undefined]] | مفيش مكان نص: [["1.5"]] اسم خاصية مش موجودة |

**ليه من 0؟** الرقم معناه «بعد أول عنصر بكام خطوة»: الأول بعد 0 خطوات. وده نفس اللي شفته في النصوص: [["abc"[0]]] بـ [["a"]] (درس «string methods»).

**الفخ الأشهر:** [[undefined]] بيكمّل في الكود لحد ما يوقع بعيد عن مكان الغلط:

~~~text الناتج: names[names.length].length
TypeError: Cannot read properties of undefined (reading 'length')
~~~

[[names[names.length]]] برّه المدى دايمًا (آخر index هو [[length - 1]])، فرجع [[undefined]]، وبعدين [[.length]] عليه وقعت. لو شفت الرسالة دي جنب array، دوّر على index غلط.

---

## ٣. [[arr[i] = y]]: تعدّل عنصر

نفس الأقواس، بس على شمال [[=]]:

~~~js write.js
const b = ["x", "y"];
b[0] = "X";
b[4] = "Z";
console.log(b, b.length);
~~~

~~~text الناتج
[ 'X', 'y', <2 empty items>, 'Z' ] 5
~~~

- [[b[0] = "X"]]: بدّلت أول عنصر. الـ array نفسها هي هي، اللي اتغيّر جواها.
- [[b[4] = "Z"]]: الـ index ده برّه المدى، فالـ array **طوّلت** لـ 5، والمكانين 2 و 3 بقوا فاضيين (القسم ٩). لو قصدك تزوّد في الآخر استخدم [[push]].
- **[[const]] مش بيمنع التعديل:** [[const]] معناها إن المتغير مينفعش يشاور على array تانية، مش إن الـ array متجمّدة. فـ [[b[0] = "X"]] شغالة، أما [[b = ["new"]]] فبتوقع:

~~~text الناتج: const c = ["a"]; c = ["b"];
TypeError: Assignment to constant variable.
~~~

---

## ٤. Array.prototype.length: العدد، وتكتب فيه كمان

[[length]] خاصية (من غير قوسين) = **آخر index + 1**. ومش للقراية بس:

~~~js length.js
const d = [1, 2, 3, 4, 5];
d.length = 2; console.log(d);
d.length = 4; console.log(d);
d.length = 0; console.log(d);
~~~

~~~text الناتج
[ 1, 2 ]
[ 1, 2, <2 empty items> ]
[]
~~~

| الكتابة | بيحصل إيه |
|---|---|
| [[d.length = 2]] | بيقص: العناصر من index 2 ولبعد اتمسحت **ومش بترجع** لو كبّرت الطول تاني |
| [[d.length = 4]] | بيطوّل بأماكن فاضية مش [[undefined]] حقيقية |
| [[d.length = 0]] | بيفضّي الـ array نفسها: أي متغير تاني بيشاور عليها هيشوفها فاضية كمان |

والفرق بين [[d.length = 0]] و [[d = []]]: التانية بتعمل array **جديدة** (ومش هتنفع مع [[const]] أصلًا)، والقديمة لسه موجودة عند أي حد شايلها (درس «reference و copy»).

---

## ٥. Array.prototype.push و Array.prototype.pop: من الآخر

~~~js end.js
const cart = ["عيش", "لبن قليل الدسم", "جبنة"];
console.log(cart.push("بيض"), cart);
const last = cart.pop();
console.log(last, cart);
console.log([1, 2].push(3, 4, 5));
console.log([].pop());
~~~

~~~text الناتج
4 [ 'عيش', 'لبن قليل الدسم', 'جبنة', 'بيض' ]
بيض [ 'عيش', 'لبن قليل الدسم', 'جبنة' ]
5
undefined
~~~

- [[push(x)]] بيزوّد في الآخر و**بيرجّع الطول الجديد** (4)، مش الـ array. وتقدر تبعتله كذا عنصر مرة واحدة: [[push(3, 4, 5)]] رجّعت 5.
- [[pop()]] بيشيل آخر عنصر و**بيرجّعه** ("بيض")، فتقدر تشيله في متغير.
- [[pop()]] على array فاضية: [[undefined]] من غير error. فلو بتلف بـ [[while]] اسأل عن [[length]] مش عن الناتج (لأن عنصر قيمته [[undefined]] هيلخبطك).
- الاتنين **بيعدّلوا الـ array نفسها**. وده اسمه stack (كومة أطباق): آخر واحد دخل أول واحد يطلع. زي «تراجع» (Ctrl+Z).

---

## ٦. Array.prototype.shift و Array.prototype.unshift: من الأول

~~~js start.js
const cart = ["عيش", "لبن قليل الدسم", "جبنة"];
console.log(cart.unshift("مية"), cart);
const first = cart.shift();
console.log(first, cart);
const q = [3, 4];
console.log(q.unshift(1, 2), q);
~~~

~~~text الناتج
4 [ 'مية', 'عيش', 'لبن قليل الدسم', 'جبنة' ]
مية [ 'عيش', 'لبن قليل الدسم', 'جبنة' ]
4 [ 1, 2, 3, 4 ]
~~~

- [[unshift(x)]] بيزوّد في **الأول** وبيرجّع الطول الجديد. و [[unshift(1, 2)]] بيحطّهم بنفس ترتيبهم: [[[1, 2, 3, 4]]].
- [[shift()]] بيشيل **أول** عنصر وبيرجّعه، و[[undefined]] لو فاضية.
- **كل العناصر بتتحرك:** بعد [[shift]] اللي كان عند 1 بقى عند 0. عشان كده [[shift]] على array كبيرة أبطأ بكتير من [[pop]] (اتقاس في التمرين السادس: على 100 ألف عنصر [[shift]] حوالي ثانية و [[pop]] حوالي ملي ثانية).
- [[push]] + [[shift]] = طابور (queue): أول واحد دخل أول واحد يطلع، زي طابور البنك.

---

## ٧. Array.prototype.indexOf: العنصر ده فين؟

~~~js find.js
console.log(cart.indexOf("جبنة"), cart.indexOf("شاي"));
console.log([NaN].indexOf(NaN), [NaN].includes(NaN), [{ id: 1 }].indexOf({ id: 1 }), ["1", 1].indexOf(1), [1, 2, 1].indexOf(1, 1));
~~~

~~~text الناتج
2 -1
-1 true -1 1 2
~~~

| النداء | النتيجة | ليه |
|---|---|---|
| [[indexOf("جبنة")]] | 2 | مكان **أول** مرة لقاه |
| [[indexOf("شاي")]] | [[-1]] | مش موجود. اسأل [[=== -1]]، مش [[if (i)]]: لأن 0 مكان حقيقي و falsy |
| [[[NaN].indexOf(NaN)]] | [[-1]] | بيقارن بـ [[===]]، و [[NaN === NaN]] بـ [[false]]. [[includes]] بتلاقيه |
| [[[{ id: 1 }].indexOf({ id: 1 })]] | [[-1]] | object تاني بنفس الشكل مش هو نفسه (درس «reference و copy») |
| [[["1", 1].indexOf(1)]] | 1 | [[===]] مبيحوّلش أنواع: النص [["1"]] مش الرقم 1 |
| [[[1, 2, 1].indexOf(1, 1)]] | 2 | الباراميتر التاني: ابدأ الدوّير من index 1 |

لو عايز «موجود ولا لأ» بس، [[includes]] أوضح (درس «find و some و includes»). و [[indexOf]] لما محتاج المكان نفسه عشان تعدّل فيه: [[cart[cart.indexOf("لبن")] = "زبادي"]] (بس اتأكد الأول إنه مش [[-1]]، وإلا [[cart[-1] = ...]] هتعمل خاصية غريبة اسمها [["-1"]]).

---

## ٨. Array.prototype.join و [[split]]: من array لنص وبالعكس

~~~js text.js
const text = cart.join("، ");
console.log(text, text.split("، "));
console.log([1, 2, 3].join(), [1, 2, 3].join(""), [1, null, undefined, 3].join("-"), [].join(","));
console.log("abc".split(""), "".split(","), "a,,b".split(","), "a, b".split(","));
~~~

~~~text الناتج
عيش، لبن قليل الدسم، جبنة [ 'عيش', 'لبن قليل الدسم', 'جبنة' ]
1,2,3 123 1---3
[ 'a', 'b', 'c' ] [ '' ] [ 'a', '', 'b' ] [ 'a', ' b' ]
~~~

- [[join(sep)]] بتلزق العناصر بالفاصل اللي تختاره وترجّع **نص**. من غير فاصل: [[,]]. و [[""]] من غير فاصل خالص.
- [[null]] و [[undefined]] بيبقوا نص فاضي في [[join]] ([["1---3"]]: مكانهم فاضي بين الشرط). و [[[].join(",")]] نص فاضي.
- [[split(sep)]] (من درس «string methods») العكس: بتقطّع النص عند الفاصل وترجّع array. فـ [[text.split("، ")]] رجّعت نفس الـ array: ده الـ **round trip**.
- فخاخ [[split]]: [[""]] بيرجّع [[[""]]] (عنصر واحد فاضي، مش [[[]]])، والفاصلتين ورا بعض بيعملوا عنصر فاضي، و [["a, b".split(",")]] سابت المسافة في [[" b"]] (نضّفها بـ [[trim]]).
- **الـ round trip بيبوظ** لو عنصر جواه الفاصل نفسه: [["مصنع النور, فرع 2"]] بعد [[join(",")]] و [[split(",")]] بقت عنصرين (التمرين الرابع). ده سبب إن CSV الحقيقي بيحط القيم دي بين علامات تنصيص، وإن JSON (درس «JSON») أأمن لتخزين array.

---

## ٩. الفراغات (holes) والـ index برّه المدى

~~~js holes.js
const h = [1, , 3];
console.log(h, h.length, 1 in h, h[1]);
for (const x of h) console.log("for of", x);
h.forEach(x => console.log("forEach", x));
~~~

~~~text الناتج
[ 1, <1 empty item>, 3 ] 3 false undefined
for of 1
for of undefined
for of 3
forEach 1
forEach 3
~~~

- [[[1, , 3]]] (فاصلتين ورا بعض) أو [[arr[10] = x]] أو [[length]] أكبر: بيعملوا **hole**: مكان محسوب في [[length]] بس **مفيهوش عنصر أصلًا**. [[1 in h]] بـ [[false]] (السؤال «فيه عنصر عند 1؟»).
- القراية منه [[undefined]]، زي index برّه المدى. بس الدوال مش بتتعامل معاه زي بعض: [[for...of]] بيدّيك [[undefined]]، و [[forEach]] **بيتخطاه** خالص (سطرين بس). جدول كامل بمين بيتخطى ومين لأ في وحدة «المصفوفات و Map و Set كاملين».
- **القاعدة:** متعملش holes. زوّد بـ [[push]]، واعمل array بطول معين بـ [[Array.from({ length: n }, ...)]] (الوحدة الجاية) مش بـ [[arr[n] = x]].

---

## الخلاصة

| عايز | اكتب | بيعدّل الأصل؟ | بيرجّع |
|---|---|---|---|
| array جديدة | [[[a, b, c]]] أو [[[]]] | لأ | الـ array |
| أول / آخر عنصر | [[arr[0]]] / [[arr[arr.length - 1]]] | لأ | العنصر أو [[undefined]] |
| تغيّر عنصر | [[arr[i] = y]] | أيوه | [[y]] |
| العدد | [[arr.length]] | لأ | رقم |
| تفضّي أو تقص | [[arr.length = 0]] / [[arr.length = n]] | أيوه | |
| تزوّد / تشيل من الآخر | [[push(x)]] / [[pop()]] | أيوه | الطول الجديد / العنصر اللي اتشال |
| تزوّد / تشيل من الأول | [[unshift(x)]] / [[shift()]] | أيوه (وكل العناصر بتتحرك) | الطول الجديد / العنصر اللي اتشال |
| مكان عنصر | [[indexOf(x)]] | لأ | الـ index أو [[-1]] |
| array لنص ورجوع | [[join(sep)]] و [[split(sep)]] | لأ | نص / array |

> الدروس اللي بعد كده في الوحدة دي بتلف على الـ array كلها: [[map]] و [[filter]] و [[reduce]] و [[find]] و [[sort]]. وكل method تانية (عددهم أكتر من ٣٠) في وحدة «المصفوفات و Map و Set كاملين».`,
          lines: [
            R`array literal: قوسين مربعين وجواهم ٣ نصوص مفصولة بفواصل. المتغير [[cart]] شايل اللستة كلها كقيمة واحدة، وأماكنها 0 و 1 و 2.`,
            R`[[cart[0]]] أول عنصر «عيش» (الـ index بيبدأ من 0)، و [[cart[2]]] تالت عنصر «جبنة»، و [[cart.length]] بـ 3 عدد العناصر. الناتج: [[عيش جبنة 3]].`,
            R`[[cart[1] = ...]] بتبدّل العنصر اللي عند index 1 («لبن») بقيمة جديدة. ده تعديل جوه الـ array، فـ [[const]] مش بيمنعه.`,
            R`[[push]] بتزوّد «بيض» في الآخر، فالطول بقى 4، وبترجّع الطول الجديد (4) لو حبيت تستخدمه.`,
            R`[[pop]] بتشيل آخر عنصر («بيض») وترجّعه في [[last]]، فالـ array رجعت ٣ عناصر.`,
            R`[[unshift]] بتزوّد «مية» في **الأول**، فكل العناصر اتزحزحت خطوة: «عيش» بقى عند 1.`,
            R`[[shift]] بتشيل أول عنصر («مية») وترجّعه في [[first]]، والباقي رجع مكانه: «عيش» عند 0 تاني.`,
            R`[[indexOf]] بيدوّر على القيمة ويرجّع مكانها: «جبنة» عند 2، و «شاي» مش موجود فـ [[-1]]. الناتج: [[2 -1]].`,
            R`[[join("، ")]] بتلزق العناصر في نص واحد بينهم فاصلة عربي ومسافة: [["عيش، لبن قليل الدسم، جبنة"]].`,
            R`بيطبع النص، وبعده [[split]] بنفس الفاصل اللي رجّع نفس الـ array: ده الـ round trip من array لنص ورجوع.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const a = [10, 20, 30]; a[5] = 60;]]. اكتب قبل التشغيل: [[a.length]] و [[a[4]]] و [[a.indexOf(60)]] و [[a.indexOf(undefined)]]، وشكل [[console.log(a)]] (من القسم ٣ و ٩ في الشرح).`, done: R`كتبت 6 و [[undefined]] و 5 و [[-1]]، و [[[ 10, 20, 30, <2 empty items>, 60 ]]]، وعرفت ليه [[indexOf(undefined)]] مش 3.`, sol: R`~~~js predict.js
const a = [10, 20, 30];
a[5] = 60;
console.log(a.length, a[4], a.indexOf(60), a.indexOf(undefined));
console.log(a);
~~~

~~~text الناتج
6 undefined 5 -1
[ 10, 20, 30, <2 empty items>, 60 ]
~~~

- الكتابة عند index 5 خلّت الطول 6 (آخر index + 1)، والمكانين 3 و 4 **فاضيين** (holes).
- [[a[4]]] بـ [[undefined]] لأنه مفيش عنصر هناك، والقراية من مكان فاضي زي القراية من برّه المدى.
- [[a.indexOf(undefined)]] بـ [[-1]] مش 3: [[indexOf]] **بيتخطى الأماكن الفاضية** خالص (مفيش عنصر يتقارن). لو كانت [[[10, undefined]]] (قيمة [[undefined]] حقيقية) كانت هترجّع 1. وده سبب إن الـ holes بتلخبط.` },
            { lvl: 'سريع', t: R`**محاكاة:** (١) طابور عيادة: ٣ مرضى بيوصلوا بـ [[push]]، والدكتور بيدخّل أول واحد بـ [[shift]]، وبعدين حالة طوارئ بتيجي في **أول** الطابور بـ [[unshift]]، واطبع الطابور بـ [[join(" ← ")]]. (٢) زرار «تراجع»: ٣ عمليات بـ [[push]] وتراجع واحد بـ [[pop]] (من القسم ٥ و ٦ في الشرح).`, done: R`أول من دخل «سارة»، والطوارئ دخلت قبل «عمر»، والطابور في الآخر [[عمر ← منى]]، والتراجع شال آخر عملية بس.`, sol: R`~~~js clinic.js
const queue = [];
queue.push("سارة");
queue.push("عمر");
queue.push("منى");
console.log("دخل الدكتور:", queue.shift(), "| مستنيين:", queue.length);
queue.unshift("حالة طوارئ");
console.log("دخل الدكتور:", queue.shift(), "| الطابور:", queue.join(" ← "));
const undo = [];
undo.push("كتب: أهلا");
undo.push("مسح كلمة");
undo.push("كتب: بيكم");
console.log("تراجع عن:", undo.pop(), "| فاضل:", undo);
~~~

~~~text الناتج
دخل الدكتور: سارة | مستنيين: 2
دخل الدكتور: حالة طوارئ | الطابور: عمر ← منى
تراجع عن: كتب: بيكم | فاضل: [ 'كتب: أهلا', 'مسح كلمة' ]
~~~

- **الطابور (queue):** بتزوّد من آخر ([[push]]) وبتاخد من أول ([[shift]])، فاللي وصل الأول بيدخل الأول. و [[unshift]] بتكسر الدور عمدًا للطوارئ.
- **التراجع (stack):** بتزوّد وبتاخد من نفس الناحية (الآخر)، فآخر عملية هي أول واحدة تتلغي. ده بالظبط إزاي Ctrl+Z شغال في أي محرر.
- [[shift]] و [[pop]] بيرجّعوا العنصر اللي اتشال، فاستخدمناه في نفس سطر الطباعة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[for (let i = 0; i <= names.length; i++) console.log(i, names[i].length);]] على [[["سارة", "عمر", "منى"]]] بيطبع ٣ سطور وبعدين يوقع. شغّله، اقرا الـ error، ولاقي السطر اللي فيه المشكلة وصلّحه (من القسم ٢ في الشرح).`, done: R`شفت [[TypeError: Cannot read properties of undefined (reading 'length')]]، وعرفت إن [[i]] وصل 3 و [[names[3]]] برّه المدى، والتصليح بـ [[<]] بيطبع ٣ سطور ومفيش error.`, sol: R`~~~js loop-bug.js
const names = ["سارة", "عمر", "منى"];
for (let i = 0; i <= names.length; i++) console.log(i, names[i]);
try { console.log(names[names.length].length); } catch (e) { console.log(e.constructor.name + ": " + e.message); }
for (let i = 0; i < names.length; i++) console.log(i, names[i], names[i].length);
~~~

~~~text الناتج
0 سارة
1 عمر
2 منى
3 undefined
TypeError: Cannot read properties of undefined (reading 'length')
0 سارة 4
1 عمر 3
2 منى 3
~~~

- الطول 3، فالأماكن 0 و 1 و 2. الشرط [[i <= names.length]] بيخلي [[i]] يوصل 3، و [[names[3]]] بـ [[undefined]] (مش error)، وبعدين [[.length]] على [[undefined]] هي اللي وقعت.
- التصليح: [[i < names.length]]. ده اسمه off-by-one، أشهر باج في الـ loops.
- الأحسن خالص: [[for (const name of names)]] مفيهوش index تغلط فيه أصلًا. استخدم الـ index بس لما محتاج الرقم نفسه.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سطر CSV من شيت عملاء: [["1023,منى علي,القاهرة,250"]] (الرقم، والاسم، والمدينة، والرصيد). قطّعه بـ [[split]]، وغيّر المدينة لـ «الجيزة»، وزوّد الرصيد 50، ورجّعه سطر بـ [[join]]. وبعدين جرّب عميل اسمه [["مصنع النور, فرع 2"]] وشوف الـ round trip بيعمل إيه (من القسم ٨ في الشرح).`, done: R`السطر بقى [[1023,منى علي,الجيزة,300]] (مش [[25050]])، وعرفت إن الاسم اللي فيه فاصلة بيطلع ٥ حتت بدل ٤.`, sol: R`~~~js csv-row.js
const row = "1023,منى علي,القاهرة,250";
const cells = row.split(",");
cells[3] = String(Number(cells[3]) + 50);
cells[2] = "الجيزة";
console.log(cells, cells.join(","));
const bad = ["1024", "مصنع النور, فرع 2", "طنطا", "90"].join(",");
console.log(bad, bad.split(",").length);
~~~

~~~text الناتج
[ '1023', 'منى علي', 'الجيزة', '300' ] 1023,منى علي,الجيزة,300
1024,مصنع النور, فرع 2,طنطا,90 5
~~~

- [[split(",")]] رجّعت ٤ نصوص، فالرصيد [["250"]] **نص**. لو كتبت [[cells[3] + 50]] كان طلع [["25050"]] (لزق نصوص). عشان كده [[Number(...)]] الأول، وبعدين [[String]] عشان يرجع نص زي باقي الخانات.
- [[cells[2] = ...]] تعديل بالـ index: عارفين إن المدينة الخانة التالتة من شكل الملف.
- السطر التاني: اسم فيه [[,]] اتقسم لاتنين، فالخانات بقت ٥ والرصيد اتزحزح لمكان المدينة. CSV الحقيقي بيحل ده بعلامات تنصيص حوالين القيمة، فمتقراش CSV حقيقي بـ [[split(",")]] (استخدم مكتبة، أو JSON لما انت اللي بتكتب الملف).` },
            { lvl: 'تحدي', t: R`**مسألة:** [[rotate(list, k)]] بترجّع array **جديدة** فيها العناصر متلفّة [[k]] خطوات لشمال ([[rotate(["سبت", "أحد", "اتنين", "تلات"], 1)]] = [[["أحد", "اتنين", "تلات", "سبت"]]])، من غير ما تغيّر الأصل. واتعامل مع: array فاضية، و [[k]] أكبر من الطول، و [[k = 0]]. استخدم [[push]] و [[shift]] بس. حلّها في المربع اللي تحت.`, done: R`كل الاختبارات عدّت: [[rotate(days, 6)]] زي [[rotate(days, 2)]]، و [[rotate([], 3)]] بترجّع [[[]]] من غير loop لا نهائي، و [[days]] بعد كل ده لسه زي ما هي.`, sol: R`~~~js rotate.js
function rotate(list, k) {
  const out = [];
  for (const x of list) out.push(x);
  if (out.length === 0) return out;
  const steps = k % out.length;
  for (let i = 0; i < steps; i++) out.push(out.shift());
  return out;
}
const days = ["سبت", "أحد", "اتنين", "تلات"];
console.log(rotate(days, 1), rotate(days, 6), rotate([], 3), rotate(days, 0), days);
~~~

~~~text الناتج
[ 'أحد', 'اتنين', 'تلات', 'سبت' ] [ 'اتنين', 'تلات', 'سبت', 'أحد' ] [] [ 'سبت', 'أحد', 'اتنين', 'تلات' ] [ 'سبت', 'أحد', 'اتنين', 'تلات' ]
~~~

- **النسخة الأول:** [[out]] array جديدة بنملاها من [[list]]. لو اشتغلنا على [[list]] نفسها بـ [[shift]] و [[push]] كنا هنبوّظ الـ array بتاعة اللي نادى الدالة.
- **لفة واحدة = [[out.push(out.shift())]]:** شيل الأول وحطه في الآخر. السطر بيتقري من جوه لبرة.
- **[[k % out.length]]:** ٦ لفات على ٤ عناصر زي لفتين بالظبط، فبنوفّر اللف الزيادة.
- **الفاضية قبل [[%]]:** [[k % 0]] بـ [[NaN]]، و [[i < NaN]] دايمًا [[false]] فكانت هتعدّي بالصدفة. بس الشرط الصريح أوضح لأي حد هيقرا الكود.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل array فيها 10000 رقم، وفضّيها مرة بـ [[pop]] في [[while (a.length)]] ومرة بـ [[shift]]، وقيس كل مرة بـ [[performance.now()]]. وبعدين نفس الكلام على 100000. اكتب الأرقام، واشرح في سطرين ليه الفرق بيكبر كده (من القسم ٦ في الشرح).`, done: R`عندك ٤ أرقام حقيقية من جهازك، والفرق على 100000 بقى مئات المرات مش الضعف، وكتبت إن [[shift]] بتحرّك كل العناصر الباقية.`, sol: R`~~~js shift-vs-pop.js
function build(n) { const a = []; for (let i = 0; i < n; i++) a.push(i); return a; }
for (const n of [10000, 100000]) {
  let a = build(n);
  let t = performance.now();
  while (a.length) a.pop();
  const pop = performance.now() - t;
  a = build(n);
  t = performance.now();
  while (a.length) a.shift();
  const shift = performance.now() - t;
  console.log(n, "pop:", pop.toFixed(2) + "ms", "shift:", shift.toFixed(2) + "ms");
}
~~~

~~~text الناتج (Node 24.22، تشغيلتين على نفس الجهاز)
10000 pop: 0.26ms shift: 0.64ms
100000 pop: 1.24ms shift: 780.19ms

10000 pop: 0.20ms shift: 0.58ms
100000 pop: 1.02ms shift: 1004.38ms
~~~

- [[pop]] بيشيل آخر عنصر ويقلّل [[length]]، ومفيش حاجة تانية تتحرك، فكل نداء تقريبًا نفس الوقت.
- [[shift]] لازم ينقل كل العناصر الباقية خطوة لشمال عشان الـ index يبدأ من 0 تاني. لو عندك n عنصر، أول [[shift]] بيحرّك n-1، واللي بعده n-2... المجموع حوالي n²/2 حركة. عشان كده ١٠ أضعاف العناصر خلّت الوقت أكتر من ألف ضعف.
- على 10000 الفرق صغير لأن V8 عنده حيلة للـ arrays الصغيرة (بيحرّك بداية الـ array في الذاكرة بدل ما ينقل العناصر)، وجرّبنا أرقام تانية: 20000 أخدت 49ms و 50000 أخدت 263ms. **الخلاصة:** طابور كبير ([[shift]] كتير) محتاج تصميم تاني (index بيتحرك بدل [[shift]]، وده في المستوى ٣)، وطابور فيه مية عنصر مفيهوش أي مشكلة.` },
          ],
          check: {
            lang: "js",
            starter: R`function rotate(list, k) {
  return list;
}`,
            tests: R`const days = ["سبت", "أحد", "اتنين", "تلات"];
test("لفة واحدة", () => expect(rotate(days, 1)).toEqual(["أحد", "اتنين", "تلات", "سبت"]));
test("k أكبر من الطول", () => expect(rotate(days, 6)).toEqual(["اتنين", "تلات", "سبت", "أحد"]));
test("k = 0 بترجّع نفس الترتيب", () => expect(rotate(days, 0)).toEqual(["سبت", "أحد", "اتنين", "تلات"]));
test("array فاضية", () => expect(rotate([], 3)).toEqual([]));
test("الأصل متغيّرش وراجعت array جديدة", () => { const r = rotate(days, 2); expect(days).toEqual(["سبت", "أحد", "اتنين", "تلات"]); expect(r === days).toBe(false); });`,
            solution: R`function rotate(list, k) {
  const out = [];
  for (const x of list) out.push(x);
  if (out.length === 0) return out;
  const steps = k % out.length;
  for (let i = 0; i < steps; i++) out.push(out.shift());
  return out;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
            { t: "MDN: Array literal notation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#array_literal_notation" },
            { t: "MDN: Array.prototype.length", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length" },
            { t: "MDN: Array.prototype.push()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" },
            { t: "MDN: Array.prototype.pop()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop" },
            { t: "MDN: Array.prototype.shift()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift" },
            { t: "MDN: Array.prototype.unshift()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift" },
            { t: "MDN: Array.prototype.indexOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf" },
            { t: "MDN: Array.prototype.join()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join" },
            { t: "MDN: String.prototype.split()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" },
            { t: "MDN Curriculum: JavaScript fundamentals، Arrays", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
          ],
          pre: ["js/المتغيرات والأنواع والعمليات", "js/for و while", { to: "js/string methods", why: R`[[split]] اتشرحت هناك، وهنا هنستخدمها مع [[join]] رايح جاي` }],
          deep: {
            why: R`أي برنامج حقيقي بيتعامل مع **لستات**: منتجات في سلة، ورسايل في شات، وصفوف راجعة من API. الـ array هي الطريقة اللي اللغة بتشيل بيها لستة مترتبة في قيمة واحدة تتبعت لدالة وتتلف عليها وتتحوّل JSON. وكل الدروس اللي جاية ([[map]] و [[filter]] و [[sort]] وفي React [[items.map(...)]]) مبنية على إنك فاهم الـ index والـ length و push و pop كويس.`,
            how: R`الـ array من جوه object عادي بخاصية [[length]] ومفاتيح أرقام ([["0"]] و [["1"]]...)، عشان كده [[typeof]] بيقول [["object"]] و [[a["1"]]] زي [[a[1]]]. [[length]] دايمًا «أكبر index + 1»: لما تكتب عند index أكبر منه بيكبر لوحده، ولما تصغّره بنفسك العناصر اللي بعده بتتمسح. والمحرك (V8) بيخزّن الـ array اللي من غير holes وعناصرها نوع واحد بشكل مضغوط وسريع جدًا، والـ holes بتخليه يحوّلها لشكل أبطأ. و [[push]] و [[pop]] بيشتغلوا على الآخر فمش محتاجين يحرّكوا حاجة، أما [[shift]] و [[unshift]] فبيعيدوا ترقيم كل العناصر (اتقاس في التمرين السادس).`,
            when: R`array لما الترتيب مهم أو بتلف على الكل: لستة منتجات، خطوات، رسايل. [[push]] و [[pop]] لأي stack (تراجع، تاريخ الصفحات، أقواس مفتوحة). [[push]] و [[shift]] لطابور صغير. [[indexOf]] لما محتاج **المكان** (عشان تعدّل فيه)، و [[includes]] لما عايز «موجود؟» بس. و [[join]] لعرض اللستة كنص، و [[split]] لقراية نص بسيط (سطر إعدادات، تاجات مفصولة بفواصل). ولو بتدوّر بالـ id كتير، أو عايز من غير تكرار: [[Map]] و [[Set]] (درس «Map و Set»).`,
            mistakes: R`[[arr[arr.length]]] بدل [[arr[arr.length - 1]]] لآخر عنصر. و [[i <= arr.length]] في الـ loop. و [[if (arr.indexOf(x))]] (المكان 0 falsy، و [[-1]] truthy). و [[arr[-1]]] متوقع آخر عنصر (ده [[at(-1)]]). و [[const arr = []; arr = [...]]] (TypeError)، أو العكس: فاكر إن [[const]] بتمنع [[push]]. و [[push]] بترجّع الطول مش الـ array: [[const list = [].push(1)]] بيخلي [[list]] = 1. و [[shift]] جوه loop على array ضخمة. و [[arr[100] = x]] بيعمل 99 hole. و [[split(",")]] على CSV فيه فواصل جوه القيم.`
          }
        },
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[[1, 2, 3, 4].map(n => n * 10)]] و [[[1, 2, 3, 4].filter(n => n % 2 === 0)]].`, done: R`[[[10, 20, 30, 40]]] و [[[2, 4]]]، والأصل لسه [[[1, 2, 3, 4]]].`, sol: R`~~~js predict.js
const nums = [1, 2, 3, 4];
console.log(nums.map((n) => n * 10));
console.log(nums.filter((n) => n % 2 === 0));
console.log(nums);
~~~

~~~text الناتج
[ 10, 20, 30, 40 ]
[ 2, 4 ]
[ 1, 2, 3, 4 ]
~~~

**ليه:**

- [[map]] بتنادي الدالة على **كل** عنصر، وبتحط اللي رجع في array جديدة بنفس الطول: ٤ عناصر دخلت، ٤ طلعوا مضروبين في 10.
- [[filter]] بتنادي الدالة على كل عنصر، وبتاخد العنصر **نفسه** (مش ناتج الدالة) لو الدالة رجّعت true. [[n % 2 === 0]] باقي القسمة على 2 صفر، يعني زوجي: 2 و 4.
- آخر سطر: [[nums]] زي ما هي. التلاتة ([[map]] و [[filter]] و [[reduce]]) مبيعدّلوش الأصل، بيرجّعوا قيمة جديدة.

**الغلطة الشائعة:** تتوقع إن [[filter]] بترجّع [[[false, true, false, true]]]. دي اللي [[map]] كانت هترجّعه لو اديتها نفس الشرط. [[map]] = «حوّل كل واحد»، و [[filter]] = «سيب اللي ينفع بس».` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const total = cart.reduce((s, item) => s + item.price);]] على [[[{ price: 10 }, { price: 20 }]]]. شغّلها، وجرّبها كمان على [[[]]].`, done: R`قبل التصليح بترجّع [["[object Object]20"]] (أول عنصر بقى الـ s وهو object)، وعلى [[[]]] بتوقع بـ [[TypeError: Reduce of empty array with no initial value]]. بعد ما تزوّد [[, 0]] كقيمة بداية: 30 و 0.`, sol: R`الكود البايظ، على السلة وعلى array فاضية:

~~~js total-broken.js
const cart = [{ price: 10 }, { price: 20 }];
const total = cart.reduce((s, item) => s + item.price);
console.log(total, typeof total);
try {
  [].reduce((s, item) => s + item.price);
} catch (error) {
  console.log(error.name + ": " + error.message);
}
~~~

~~~text الناتج
[object Object]20 string
TypeError: Reduce of empty array with no initial value
~~~

**اللي حصل:** من غير قيمة بداية، [[reduce]] بتاخد **أول عنصر** كبداية وتبدأ اللف من التاني. فأول لفة كانت [[s = { price: 10 }]] و [[item = { price: 20 }]]، و [[object + 20]] بيحوّل الـ object لنص [["[object Object]"]] ويلزق: نص مش رقم. وعلى array فاضية مفيش أول عنصر أصلًا، فبترمي TypeError.

التصليح:

~~~js total-fixed.js
const cart = [{ price: 10 }, { price: 20 }];
const sum = (items) => items.reduce((s, item) => s + item.price, 0);
console.log(sum(cart), sum([]));
~~~

~~~text الناتج
30 0
~~~

- [[, 0]] بعد الدالة: قيمة البداية. أول لفة [[s = 0]] و [[item]] أول منتج، فكل لفة رقم + رقم.
- على [[[]]] مفيش لفات خالص، فـ [[reduce]] بترجّع القيمة الأولية 0 زي ما هي.

**الغلطة الشائعة:** إن الكود القديم بيشتغل صح لو العناصر أرقام ([[[10, 20].reduce((s, n) => s + n)]] بـ 30)، فتتعوّد تشيل الـ 0. أول ما العناصر تبقى objects، أو الـ array تبقى فاضية، بيبوظ. القاعدة: اكتب القيمة الأولية دايمًا، ونوعها نفس نوع الناتج اللي عايزه (0 لمجموع، [[[]]] لـ array، [[{}]] لـ object).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** منتجات جاية من API فيها [[{ name, price, inStock }]]: طلّع أسامي المتاح اللي أقل من 200، وإجمالي أسعار المتاح بس، في سلسلة filter و map و reduce.`, done: R`على Mug 120 متاح و Shirt 300 متاح و Cap 90 مش متاح: الأسامي [[["Mug"]]] والإجمالي 420.`, sol: R`~~~js products.js
const products = [
  { name: "Mug", price: 120, inStock: true },
  { name: "Shirt", price: 300, inStock: true },
  { name: "Cap", price: 90, inStock: false },
];
const cheapNames = products
  .filter((p) => p.inStock && p.price < 200)
  .map((p) => p.name);
const stockTotal = products
  .filter((p) => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log(cheapNames, stockTotal);
~~~

~~~text الناتج
[ 'Mug' ] 420
~~~

**كل سلسلة بتعمل إيه:**

- **الأسامي:** [[filter]] بتسيب اللي متاح **و** أقل من 200 (Mug بس: Shirt غالي و Cap مش متاح)، وبعدين [[map]] بتحوّل كل object لاسمه. الترتيب ده مهم: نفلتر الأول على الـ objects الكاملة (لسه فيها السعر)، وبعدين نحوّل.
- **الإجمالي:** [[filter]] للمتاح (Mug و Shirt)، وبعدين [[reduce]] بتجمع [[p.price]] من 0: 120 + 300 = 420.
- كل خطوة بترجّع array جديدة، فالنقطة اللي في أول السطر اللي بعدها بتكمّل عليها. كتابة كل خطوة في سطر بيخلي السلسلة تتقري زي جملة.

**الغلطة الشائعة:** تعمل [[map]] الأول ([[products.map((p) => p.name).filter(...)]]): بعد الـ map بقى عندك نصوص بس، فـ [[p.price]] جوه الـ filter بقت [[undefined]] والشرط [[undefined < 200]] false دايمًا، فالناتج [[[]]] من غير error. فلتر وانت لسه معاك الداتا كلها، وحوّل في الآخر.` },
            { lvl: 'تطبيق', t: R`**أشكال:** من [[[3, 5, 2]]] اطبع bar chart أفقي: كل رقم سطر [[#]] بعدده، بـ [[map]] و [[repeat]] و [[join("\n")]] من غير ولا for.`, done: R`بيطبع [[###]] ثم [[#####]] ثم [[##]]. ولو زوّدت قبل كل سطر الرقم نفسه ([[n + " " + "#".repeat(n)]]) الشكل بيبقى زي تقرير.`, sol: R`~~~js bars.js
const values = [3, 5, 2];
console.log(values.map((n) => "#".repeat(n)).join("\n"));
console.log(values.map((n) => n + " " + "#".repeat(n)).join("\n"));
const sales = [["سبت", 4], ["أحد", 7], ["اتنين", 1]];
console.log(sales.map(([day, n]) => day.padEnd(6) + "█".repeat(n) + " " + n).join("\n"));
~~~

~~~text الناتج
###
#####
##
3 ###
5 #####
2 ##
سبت   ████ 4
أحد   ███████ 7
اتنين █ 1
~~~

**ليه:**

- [[map((n) => "#".repeat(n))]]: كل رقم بيتحوّل لنص فيه [[#]] بعدده. [[repeat]] method على النصوص بتكرر النص n مرة (درس «string methods»). فالـ array بقت [[["###", "#####", "##"]]].
- [[join("\n")]]: بتلزق السطور بـ newline بينهم، فـ [[console.log]] واحد بيطبع الشكل كله. [[\n]] جوه علامات التنصيص معناها «سطر جديد».
- النسخة التانية بتزوّد الرقم قبل الشريط، زي تقرير.
- النسخة التالتة على داتا حقيقية الشكل (مبيعات كل يوم): [[([day, n])]] بتفك كل زوج (درس «array destructuring و spread»)، و [[padEnd(6)]] بتخلي الأشرطة تبدأ من نفس العمود، و [[█]] شكله أحسن من [[#]].

**الغلطة الشائعة:** تعمل [[values.map(...)]] وتنسى [[join]]، فتطبع الـ array نفسها: [[[ '###', '#####', '##' ]]] في سطر واحد بالأقواس والعلامات. [[map]] بترجّع array دايمًا، والـ [[join]] هو اللي بيحوّلها نص للعرض.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** جمّع الطلبات حسب الـ status بـ reduce في object من الـ ids: [[{ paid: [1, 3], pending: [2] }]]، وبعدين قارن بـ [[Object.groupBy]].`, done: R`الـ reduce بيرجّع [[{ paid: [1, 3], pending: [2] }]]، و [[Object.groupBy(orders, o => o.status)]] بيجمع الـ objects كاملة مش الـ ids، و Node بيطبعه [[[Object: null prototype]]].`, sol: R`~~~js group.js
const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
const ids = orders.reduce((groups, o) => {
  (groups[o.status] ??= []).push(o.id);
  return groups;
}, {});
console.log(ids);

const byStatus = Object.groupBy(orders, (o) => o.status);
console.log(byStatus);
console.log(Object.getPrototypeOf(byStatus), "toString" in byStatus, "toString" in ids);

const idsFromGroup = Object.fromEntries(
  Object.entries(byStatus).map(([status, list]) => [status, list.map((o) => o.id)])
);
console.log(idsFromGroup);
~~~

~~~text الناتج
{ paid: [ 1, 3 ], pending: [ 2 ] }
[Object: null prototype] {
  paid: [
    { id: 1, total: 250, status: 'paid' },
    { id: 3, total: 400, status: 'paid' }
  ],
  pending: [ { id: 2, total: 900, status: 'pending' } ]
}
null false true
{ paid: [ 1, 3 ], pending: [ 2 ] }
~~~

**ليه كل حتة:**

- **الـ reduce:** البداية [[{}]] object فاضي. كل لفة: [[groups[o.status] ??= []]] معناها «لو المفتاح ده مالوش قيمة لسه، حط array فاضية»، وبيرجّع الـ array نفسها، فـ [[.push(o.id)]] على طول. وبعدين [[return groups]] عشان اللفة اللي بعدها تستلم نفس الـ object.
- **[[Object.groupBy(orders, (o) => o.status)]]:** نفس التقسيم في سطر، بس بيحط **الـ objects كاملة** في كل مجموعة، مش اللي انت اخترته. ولو عايز الـ ids بس، حوّل بعد كده (آخر سطر: [[Object.entries]] و [[map]] و [[Object.fromEntries]]).
- **[[[Object: null prototype]]]:** الـ object اللي راجع من [[groupBy]] ملوش prototype: [[Object.getPrototypeOf]] طلعت [[null]]، و [[toString]] مش موجودة فيه. ده مقصود: لو status اسمه [["constructor"]] أو [["toString"]] مش هيضرب في methods موروثة. الـ object بتاعك من الـ reduce فيه [[toString]] موروثة (طلعت true).

**الغلطة الشائعة:** تنسى [[return groups]] في آخر الـ callback، فاللفة التانية بتستلم [[undefined]] وتقع بـ [[TypeError: Cannot read properties of undefined (reading 'pending')]] (جرّبتها). والتانية: تفتكر إن [[groupBy]] بترجّع Map أو array. هي object عادي (من غير prototype)، ولو عايز Map فيه [[Map.groupBy]] (وحدة «المصفوفات و Map و Set كاملين»).` },
            { lvl: 'تحدي', t: R`**refactor:** ده كود بـ for: [[const out = []; for (const p of products) { if (p.inStock) { out.push(p.name.toUpperCase()); } }]]. حوّله لسلسلة filter و map في سطر، وتأكد إن الناتج واحد على نفس البيانات.`, done: R`على Mug و Shirt متاحين و Cap مش متاح الاتنين بيرجّعوا [[["MUG", "SHIRT"]]]، و [[JSON.stringify]] بتاعهم واحد. ومفيش [[push]] ولا متغير بيتغيّر في النسخة الجديدة.`, sol: R`~~~js refactor.js
const products = [
  { name: "Mug", inStock: true },
  { name: "Cap", inStock: false },
  { name: "Shirt", inStock: true },
];
const out = [];
for (const p of products) {
  if (p.inStock) {
    out.push(p.name.toUpperCase());
  }
}
const names = products.filter((p) => p.inStock).map((p) => p.name.toUpperCase());
console.log(out, names);
console.log(JSON.stringify(out) === JSON.stringify(names));
~~~

~~~text الناتج
[ 'MUG', 'SHIRT' ] [ 'MUG', 'SHIRT' ]
true
~~~

**إزاي اتحوّل:**

| في الـ for | في السلسلة |
|---|---|
| [[if (p.inStock)]] | [[filter((p) => p.inStock)]]: الشرط نفسه بقى دالة |
| [[out.push(p.name.toUpperCase())]] | [[map((p) => p.name.toUpperCase())]]: اللي بيتعمل لكل عنصر بقى دالة |
| [[const out = []]] و [[push]] | مفيش: [[map]] هي اللي بتعمل الـ array |

- الاتنين طلعوا [[[ 'MUG', 'SHIRT' ]]]، و [[JSON.stringify]] بتاعهم متساوي (true). مقارنة الـ arrays نفسها بـ [[===]] كانت هتطلع false لأنهم array تين مختلفتين حتى لو المحتوى واحد، فبنقارن النص.
- النسخة الجديدة مفيهاش متغير بيتغيّر ([[out]] كانت بتكبر جوه الـ loop)، فمفيش حالة وسطانية تتلخبط فيها.

**الغلطة الشائعة:** تعمل [[map]] الأول وتحط الشرط جواها: [[products.map((p) => p.inStock ? p.name.toUpperCase() : null)]]، فيطلع [[[ 'MUG', null, 'SHIRT' ]]]: [[map]] دايمًا بترجّع نفس الطول. الحذف شغلة [[filter]].` }
          ],
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
          teach: R`## الفكرة

عندنا ليستة طلبات، وعايزين إجمالي الفلوس من الطلبات المدفوعة بس. المثال بيعملها على ٣ خطوات: [[filter]] (خد المدفوع)، و [[map]] (خد الـ total من كل واحد)، و [[reduce]] (اجمع). وبعدين نفس الحساب بسلسلة واحدة، وفي الآخر [[Object.groupBy]]. اتشغّل كملف [[orders.js]] في Node 24.

---

## ١. الداتا

~~~text orders.js
const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
~~~

array فيها ٣ objects، وكل object طلب ليه [[id]] و [[total]] (المبلغ) و [[status]] (الحالة: paid يعني مدفوع، pending يعني مستني). ده شكل الداتا اللي بتيجي من أي API. والفاصلة بعد آخر عنصر مسموحة (trailing comma).

---

## ٢. [[filter]]: خد المدفوع بس

~~~text orders.js
const paid = orders.filter((o) => o.status === "paid");
~~~

- [[filter]] بتلف على كل عنصر، وتنادي الدالة اللي اديتها عليه.
- [[(o) => o.status === "paid"]]: [[o]] الطلب الحالي، والدالة بترجّع true لو حالته paid.
- العناصر اللي رجعت true بس بتدخل array جديدة.

~~~text الناتج من console.log(paid)
[
  { id: 1, total: 250, status: 'paid' },
  { id: 3, total: 400, status: 'paid' }
]
~~~

---

## ٣. [[map]]: حوّل كل طلب لرقمه

~~~text orders.js
const totals = paid.map((o) => o.total);
~~~

[[map]] بتلف على كل عنصر، وتحط **اللي الدالة رجّعته** في array جديدة بنفس الطول. الدالة هنا بترجّع [[o.total]].

~~~text الناتج من console.log(totals)
[ 250, 400 ]
~~~

---

## ٤. [[reduce]]: اجمعهم في رقم واحد

~~~text orders.js
const revenue = totals.reduce((sum, t) => sum + t, 0);
console.log(revenue); // 650
~~~

[[reduce]] بتاخد حاجتين:

1. دالة [[(sum, t) => sum + t]]: [[sum]] اسمه الـ **accumulator** (المجمّع: الناتج لحد دلوقتي)، و [[t]] العنصر الحالي. اللي الدالة بترجّعه يبقى الـ sum الجديد.
2. [[0]]: القيمة اللي sum بيبدأ بيها.

حطينا طباعة جوه الدالة عشان نشوف كل لفة:

~~~text الناتج
sum = 0 t = 250 → 250
sum = 250 t = 400 → 650
~~~

| اللفة | sum قبل | t | sum بعد |
|---|---|---|---|
| ١ | 0 (القيمة الأولية) | 250 | 250 |
| ٢ | 250 | 400 | 650 |

والناتج النهائي [[650]]. لو نسيت القيمة الأولية والـ array فاضية:

~~~text الناتج من [].reduce((a, b) => a + b)
TypeError: Reduce of empty array with no initial value
~~~

---

## ٥. نفس الحساب بسلسلة واحدة

~~~text orders.js
const revenue2 = orders
  .filter((o) => o.status === "paid")
  .reduce((sum, o) => sum + o.total, 0);
~~~

- كل method بترجّع array، فتكمّل عليها بنقطة. كتبناها على كذا سطر عشان تتقري، والسطر اللي بيبدأ بـ [[.]] تكملة للي قبله.
- شلنا الـ map: الـ reduce بتاخد الطلب كله ([[o]]) وتجمع [[o.total]] على طول. الناتج برضه 650.

> لو لزقت السطور دي في Node REPL سطر سطر، هيطلعلك [[Invalid REPL keyword]]، لأن الـ REPL بيفهم السطر اللي بيبدأ بنقطة كأمر خاص بيه زي [[.help]]. شغّلها من ملف.

---

## ٦. [[Object.groupBy]]: قسّم حسب الحالة

~~~text orders.js
const byStatus = Object.groupBy(orders, (o) => o.status);
~~~

بتاخد الـ array ودالة بترجّع «اسم المجموعة» لكل عنصر، وترجّع object: كل مفتاح اسم مجموعة، وقيمته array عناصرها.

~~~text الناتج من console.log(byStatus) (Node 24)
[Object: null prototype] {
  paid: [
    { id: 1, total: 250, status: 'paid' },
    { id: 3, total: 400, status: 'paid' }
  ],
  pending: [ { id: 2, total: 900, status: 'pending' } ]
}
~~~

[[null prototype]] معناها إن الـ object ده معمول من غير الخصايص الموروثة (زي [[toString]])، عشان لو مجموعة اسمها [["constructor"]] متتضربش مع حاجة جاهزة.

---

## ٧. حل الـ try

~~~text try.js
const pendingCount = orders.filter((o) => o.status === "pending").length;
const maxTotal = Math.max(...orders.map((o) => o.total));
const totalsById = orders.reduce((acc, o) => {
  acc[o.id] = o.total;
  return acc;
}, {});
console.log(pendingCount, maxTotal, totalsById);
~~~

- [[pendingCount]]: فلتر الـ pending وخد طول الناتج.
- [[maxTotal]]: [[map]] بتطلّع [[[250, 900, 400]]]، و [[...]] بتفردهم لـ [[Math.max]].
- [[totalsById]]: الـ reduce هنا بتبدأ بـ object فاضي [[{}]]، وكل لفة بتحط خانة [[acc[o.id] = o.total]]، و [[return acc]] عشان اللفة الجاية تستلمه.

~~~text الناتج (Node 24)
1 900 { '1': 250, '2': 900, '3': 400 }
~~~

المفاتيح بين [[' ']] لأن مفاتيح الـ objects دايمًا strings.

---

## الخلاصة

| الدالة | بترجّع | الطول |
|---|---|---|
| [[filter(fn)]] | array بالعناصر اللي fn رجّعت لها true | نفسه أو أقل |
| [[map(fn)]] | array باللي fn رجّعته لكل عنصر | نفسه بالظبط |
| [[reduce(fn, start)]] | قيمة واحدة (رقم، object، أي حاجة) | - |
| [[Object.groupBy(arr, fn)]] | object مجموعات | - |

التلاتة مبيعدّلوش الـ array الأصلية، وابعت القيمة الأولية للـ reduce دايمًا.`,
          lines: [
            R`بنعمل array اسمها [[orders]]، كل عنصر فيها object بيمثّل طلب. ده بالظبط شكل الداتا اللي بترجعلك من API غالبًا: ليستة objects ليهم نفس المفاتيح.`,
            R`أول طلب: [[id]] بيميّزه، و [[total]] المبلغ، و [[status]] حالته. حالته [[paid]] فهيدخل في الحساب.`,
            R`تاني طلب، حالته [[pending]] (لسه متدفعش)، فالـ [[filter]] هيشيله ومش هيتحسب في الإيراد رغم إنه أكبر مبلغ.`,
            R`تالت طلب، مدفوع برضه. يبقى عندنا طلبين مدفوعين مجموعهم [[250 + 400]].`,
            R`نهاية الـ array. الفاصلة بعد آخر عنصر (trailing comma) مسموحة في JS ومش بتعمل عنصر فاضي، وبتخلي إضافة سطر جديد بعدين أسهل.`,
            R`[[filter]] بتعدّي على كل طلب وتسأل الدالة: «أخليه؟». اللي بيرجّع [[true]] بيدخل array جديدة. النتيجة array فيها الطلبين المدفوعين بس، والأصل [[orders]] زي ما هو.`,
            R`[[map]] بتحوّل كل عنصر لحاجة تانية وبترجّع array بنفس الطول. هنا كل طلب بقى رقم الـ [[total]] بتاعه، فـ [[totals]] بقت array فيها 250 و 400 بس.`,
            R`[[reduce]] بتلم الـ array كلها في قيمة واحدة. [[sum]] هو الشايل اللي بيتراكم، بيبدأ من [[0]] (الـ argument التاني)، وكل لفة بيبقى [[sum + t]]. من غير الـ [[0]] هيبدأ بأول عنصر، ولو الـ array فاضية هيرمي TypeError.`,
            R`بيطبع [[650]]، يعني مجموع الطلبين المدفوعين ([[250 + 400]]).`,
            R`نفس الحساب بس في سلسلة (chaining): كل method بترجّع array فبنكمّل عليها بالـ method اللي بعدها من غير متغيرات وسيطة.`,
            R`أول حلقة في السلسلة: نفس الـ [[filter]] اللي فوق، بيسيب الطلبات المدفوعة بس.`,
            R`وبعدها [[reduce]] على طول بتجمع [[o.total]] من كل طلب، فاستغنينا عن الـ [[map]] لأن الدالة نفسها بتقرا الرقم من الـ object. النتيجة برضه [[650]].`,
            R`[[Object.groupBy]] بتقسّم الـ array لمجموعات حسب اللي الدالة بترجّعه: النتيجة object فيه مفتاح [[paid]] جواه array الطلبين، ومفتاح [[pending]] جواه طلب واحد. موجودة في Node 21 والمتصفحات الحديثة بس.`
          ],
          ref: [
            { t: "MDN: Array.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" },
            { t: "MDN: Array.prototype.filter()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" },
            { t: "MDN: Array.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" },
            { t: "MDN: Array.prototype.forEach()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" },
            { t: "MDN: Object.groupBy()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy" },
          ],
          pre: ["js/array literals و index و length", "js/higher-order functions"],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[[5, 12, 8]]]: [[find(n => n > 10)]] و [[findIndex(n => n > 10)]] و [[find(n => n > 100)]].`, done: R`12 و 1 و undefined.`, sol: R`~~~js predict.js
const nums = [5, 12, 8];
console.log(nums.find((n) => n > 10));
console.log(nums.findIndex((n) => n > 10));
console.log(nums.find((n) => n > 100));
console.log(nums.findIndex((n) => n > 100));
~~~

~~~text الناتج
12
1
undefined
-1
~~~

**ليه:**

- [[find]] بتلف من الأول وبتقف عند **أول** عنصر الشرط بتاعه true، وبترجّع العنصر نفسه: 12. والـ 8 عمرها ما اتسألت.
- [[findIndex]] نفس اللف، بس بترجّع **المكان**: 12 عند index 1.
- لو مفيش عنصر نافع: [[find]] بترجّع [[undefined]]، و [[findIndex]] بترجّع [[-1]] (زي [[indexOf]]).

**الغلطة الشائعة:** تستخدم ناتج [[find]] على طول ([[nums.find(...).toFixed(2)]]). لو مفيش نتيجة هتقع بـ TypeError على [[undefined]]. افحص الأول، أو [[?.]] (الـ try بتاع الدرس). ولو العنصر نفسه ممكن يبقى [[undefined]] أو 0، اعتمد على [[findIndex]] عشان تفرّق بين «ملقتش» و «لقيت قيمة falsy».` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const roles = ["admin", "editor"]; if (roles.indexOf("admin")) console.log("أهلًا يا أدمن");]]. ليه الرسالة مبتظهرش؟`, done: R`[[roles.indexOf("admin")]] بترجّع 0 وده falsy، فالـ if مبتدخلش. بعد [[roles.includes("admin")]] الرسالة بتظهر، ولو [["admin"]] مش موجودة مبتظهرش.`, sol: R`~~~js roles.js
const roles = ["admin", "editor"];
console.log("indexOf:", roles.indexOf("admin"), Boolean(roles.indexOf("admin")));
if (roles.indexOf("admin")) console.log("أهلًا يا أدمن (بـ indexOf)");
if (roles.includes("admin")) console.log("أهلًا يا أدمن (بـ includes)");
const guest = ["viewer"];
console.log("indexOf في guest:", guest.indexOf("admin"), Boolean(guest.indexOf("admin")));
if (guest.includes("admin")) console.log("مش هتتطبع");
~~~

~~~text الناتج
indexOf: 0 false
أهلًا يا أدمن (بـ includes)
indexOf في guest: -1 true
~~~

**اللي حصل:**

- [[roles.indexOf("admin")]] رجّعت 0، لأن [["admin"]] أول عنصر. والـ 0 falsy، فالـ if اعتبرتها «مش موجودة» والرسالة الأولى متطبعتش.
- والعكس أسوأ: في [[guest]] مفيش admin، و [[indexOf]] رجّعت [[-1]]، و [[-1]] **truthy**. يعني لو كان الكود بـ [[indexOf]] كان هيرحّب بالضيف كإنه أدمن، ده باج أمان مش شكل بس.
- [[includes]] بترجّع [[true]] أو [[false]] بس، فمفيش لبس: الرسالة ظهرت لـ roles ومظهرتش لـ guest.

**الغلطة الشائعة:** إنك تصلّحها بـ [[indexOf(x) > 0]]: كده [["admin"]] اللي عند 0 لسه مش هتتحسب. لو محتاج [[indexOf]] لازم [[!== -1]]. ولو السؤال «موجود؟» بس، [[includes]] هي الإجابة.` },
            { lvl: 'تطبيق', t: R`**ابني:** سلة: [[hasOutOfStock]] بـ some (فيه منتج stock بتاعه 0؟)، و [[allPaid]] بـ every على الطلبات.`, done: R`لو منتج واحد stock بتاعه 0 [[hasOutOfStock]] true، و [[[].every(...)]] على array فاضية بترجّع true (فكّر ليه ده ممكن يبقى bug).`, sol: R`~~~js checks.js
const cart = [
  { name: "Mug", stock: 4 },
  { name: "Cap", stock: 0 },
  { name: "Shirt", stock: 9 },
];
const orders = [
  { id: 1, paid: true },
  { id: 2, paid: false },
];
const hasOutOfStock = (items) => items.some((item) => item.stock === 0);
const allPaid = (list) => list.every((o) => o.paid);

console.log(hasOutOfStock(cart), hasOutOfStock(cart.filter((i) => i.stock > 0)));
console.log(allPaid(orders), allPaid(orders.filter((o) => o.paid)));
console.log("every على فاضية:", allPaid([]), "| some على فاضية:", hasOutOfStock([]));

const canShip = (list) => list.length > 0 && allPaid(list);
console.log("canShip([]):", canShip([]));
~~~

~~~text الناتج
true false
false true
every على فاضية: true | some على فاضية: false
canShip([]): false
~~~

**ليه:**

- [[some((item) => item.stock === 0)]]: true أول ما يلاقي عنصر واحد بيحقق الشرط (Cap)، وبيقف من غير ما يكمّل. لما شلنا الخلصان بـ [[filter]] رجعت false.
- [[every((o) => o.paid)]]: true لو **كلهم** بيحققوا الشرط، و false أول ما يلاقي واحد مش محققه (الطلب 2).
- **على array فاضية:** [[every]] بترجّع true و [[some]] بترجّع false. منطقيًا «كل العناصر مدفوعة» صح لما مفيش عناصر أصلًا (مفيش عنصر يكسر القاعدة)، وده اسمه vacuous truth.

**ليه ده ممكن يبقى bug:** تخيّل زرار «اشحن الطلبات» بيظهر لما [[allPaid(orders)]] true. اليوزر مفيش عنده طلبات خالص، والزرار ظاهر وبيحاول يشحن لستة فاضية. التصليح في [[canShip]]: [[list.length > 0 && allPaid(list)]]، ورجعت false للفاضية.

**الغلطة الشائعة:** تكتب [[filter(...).length > 0]] بدل [[some]]. نفس النتيجة، بس [[filter]] بتلف على الـ array كلها وتعمل array جديدة، و [[some]] بتقف عند أول واحد.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[users = [{ email: "Sara@Mail.com", name: "Sara" }, { email: "omar@mail.com", name: "Omar" }]]] واليوزر كتب [["sara@mail.com"]] في فورم الدخول. لاقيه بـ find.`, done: R`المقارنة العادية [[===]] بترجّع undefined، وبعد ما تصغّر الطرفين بـ [[toLowerCase()]] بترجّع object فيه Sara. وبتقول للمستخدم «مش موجود» لو find رجّعت undefined بدل ما توقع على [[.name]].`, sol: R`~~~js login.js
const users = [
  { email: "Sara@Mail.com", name: "Sara" },
  { email: "omar@mail.com", name: "Omar" },
];
function findUser(input) {
  const wanted = input.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === wanted);
}
const typed = "sara@mail.com";
console.log(users.find((u) => u.email === typed));
console.log(findUser(typed));
console.log(findUser("  OMAR@mail.com "));

for (const input of ["sara@mail.com", "nobody@mail.com"]) {
  const user = findUser(input);
  console.log(user ? $__btأهلًا يا $__{user.name}$__bt : $__btمفيش حساب بـ $__{input}$__bt);
}
~~~

~~~text الناتج
undefined
{ email: 'Sara@Mail.com', name: 'Sara' }
{ email: 'omar@mail.com', name: 'Omar' }
أهلًا يا Sara
مفيش حساب بـ nobody@mail.com
~~~

**ليه:**

- أول سطر: [[u.email === typed]] رجّعت [[undefined]]، لأن [["Sara@Mail.com"]] و [["sara@mail.com"]] نصين مختلفين حرف حرف. [[===]] بتفرّق بين الحروف الكبيرة والصغيرة.
- [[findUser]]: بنصغّر **الطرفين** بـ [[toLowerCase()]] قبل المقارنة، و [[trim()]] على اللي اليوزر كتبه عشان المسافات اللي بتتنسخ مع الإيميل. فـ [["  OMAR@mail.com "]] لقت Omar.
- اللوب الأخير هو اللي في الواقع: [[find]] ممكن ترجّع [[undefined]]، فبنسأل [[user ?]] قبل ما نقرا [[user.name]]، وبنقول رسالة واضحة بدل ما نوقع.

**الغلطة الشائعة:** تصغّر طرف واحد بس ([[u.email === typed.toLowerCase()]]): Sara مش هتتلاقي لأن الإيميل المتخزن نفسه فيه حروف كبيرة. والأحسن في الحقيقة إنك تخزّن الإيميل متصغّر من الأول وقت التسجيل، فالمقارنة تبقى بسيطة في كل حتة.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[hasAll(perms, required)]] بترجّع true لو اليوزر عنده كل الصلاحيات المطلوبة. وجرّب [[[NaN].includes(NaN)]] و [[[NaN].indexOf(NaN)]].`, done: R`[[hasAll(["read", "write"], ["read"])]] true، و [[hasAll(["read"], ["read", "delete"])]] false. و includes بترجّع true و indexOf بترجّع -1.`, sol: R`~~~js perms.js
function hasAll(perms, required) {
  return required.every((p) => perms.includes(p));
}
console.log(hasAll(["read", "write"], ["read"]));
console.log(hasAll(["read"], ["read", "delete"]));
console.log(hasAll(["read"], []));
console.log([NaN].includes(NaN), [NaN].indexOf(NaN));
~~~

~~~text الناتج
true
false
true
true -1
~~~

**ليه:**

- [[required.every((p) => perms.includes(p))]]: بنلف على **المطلوب** مش على اللي عند اليوزر، ونسأل عن كل صلاحية: «موجودة عنده؟». لو واحدة ناقصة ([["delete"]]) [[every]] بتقف وترجّع false.
- [[hasAll(["read"], [])]] بـ true: مفيش صلاحيات مطلوبة، فـ [[every]] على فاضية true، وده المنطقي هنا (صفحة مش محتاجة صلاحيات يدخلها أي حد).
- [[[NaN].includes(NaN)]] true و [[indexOf]] بـ [[-1]]: [[indexOf]] بيقارن بـ [[===]]، و [[NaN === NaN]] false. [[includes]] بيستخدم مقارنة اسمها SameValueZero بتعتبر NaN بيساوي NaN.

**الغلطة الشائعة:** تلف على الاتجاه الغلط: [[perms.every((p) => required.includes(p))]]. دي بتسأل «كل اللي عند اليوزر مطلوب؟»، فيوزر عنده read و write وطالب read بس هيترفض (write مش في المطلوب). اسأل نفسك: مين اللي لازم **كله** يتحقق؟ هو ده اللي تعمل عليه [[every]].` }
          ],
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
          teach: R`## الفكرة

[[filter]] بترجّع **كل** اللي بيحقق الشرط. بس ساعات انت عايز عنصر واحد، أو إجابة نعم/لا. الدوال دي معمولة لكده، وبتقف أول ما تلاقي الإجابة. المثال بيسأل ليستة مستخدمين كذا سؤال. اتشغّل في Node 24 REPL.

---

## ١. الداتا

~~~text users.js
const users = [
  { id: 1, name: "Sara", admin: true },
  { id: 2, name: "Omar", admin: false },
  { id: 3, name: "Ali", admin: false },
];
~~~

٣ مستخدمين، واحد بس [[admin]] (مدير).

---

## ٢. [[find]] و [[findIndex]] و [[findLast]]

~~~text Node REPL
> users.find((u) => u.id === 2)
{ id: 2, name: 'Omar', admin: false }
> users.find((u) => u.id === 9)
undefined
> users.findIndex((u) => u.id === 2)
1
> users.findLast((u) => !u.admin)
{ id: 3, name: 'Ali', admin: false }
~~~

- [[find(fn)]]: بترجّع **أول عنصر** الدالة رجّعت له true. مش array، العنصر نفسه.
- لو مفيش: [[undefined]]. وده اللي بيوقّع الناس (تحت).
- [[findIndex(fn)]]: نفس الكلام بس بترجّع **مكانه**. Omar في المكان 1 (العدّ من 0). ولو مش موجود بترجّع [[-1]].
- [[findLast(fn)]]: بتدوّر من الآخر. [[!u.admin]] يعني «مش admin»، وآخر واحد كده Ali.

### بتقف بدري فعلًا؟

عدّينا كام مرة الدالة اتنادت وإحنا بندوّر على id 1:

~~~text الناتج
find calls 1
filter calls 3
~~~

[[find]] لقت Sara من أول مرة ووقفت، و [[filter]] لفت على الـ ٣.

---

## ٣. [[some]] و [[every]]: نعم أو لا

~~~text Node REPL
> users.some((u) => u.admin)
true
> users.every((u) => u.admin)
false
~~~

- [[some]]: «فيه واحد على الأقل admin؟» أيوة، Sara.
- [[every]]: «كلهم admins؟» لأ.

وعلى array فاضية: [[[].every(...)]] بـ true و [[[].some(...)]] بـ false (اتجرّبوا). المنطق: مفيش عنصر كسر الشرط، ومفيش عنصر حققه.

---

## ٤. [[includes]] و [[indexOf]]

~~~text Node REPL
> ["js", "ts"].includes("ts")
true
> [NaN].includes(NaN)
true
> [NaN].indexOf(NaN)
-1
~~~

- [[includes(value)]]: بتاخد **قيمة** مش دالة: «القيمة دي موجودة؟».
- [[indexOf(value)]]: مكان القيمة، أو [[-1]].
- الفرق مع NaN: [[indexOf]] بتقارن بـ [[===]]، و [[NaN === NaN]] false فمبتلاقيهاش. [[includes]] بتستخدم مقارنة اسمها SameValueZero بتعتبر NaN زي نفسها.

---

## ٥. اللي بيحصل في الـ try

لو [[find]] ملقتش وقريت منها على طول:

~~~text app.js
const user = users.find((u) => u.id === 9);
console.log(user.name);
~~~

~~~text الناتج (Node 24)
TypeError: Cannot read properties of undefined (reading 'name')
~~~

[[user]] بـ undefined، ومفيش خانات جوه undefined. [[user?.name]] بتحل ده: الـ [[?.]] (optional chaining) معناها «لو اللي قبلي null أو undefined، رجّع undefined وخلاص».

و [[includes]] مع object:

~~~text الناتج من users.includes(users[0]) و users.includes({ id: 1, name: "Sara", admin: true })
true false
~~~

الأول نفس الـ object اللي في الـ array فلقيته. التاني object **جديد** بنفس المحتوى، و [[includes]] بتقارن بالـ reference، فمش هو. للمحتوى استخدم [[some((u) => u.id === 1)]].

---

## الخلاصة

| السؤال | الدالة | بترجّع لو ملقتش |
|---|---|---|
| هات أول واحد | [[find(fn)]] | [[undefined]] |
| مكانه فين | [[findIndex(fn)]] | [[-1]] |
| من الآخر | [[findLast(fn)]] / [[findLastIndex(fn)]] | [[undefined]] / [[-1]] |
| فيه واحد على الأقل؟ | [[some(fn)]] | false |
| كلهم؟ | [[every(fn)]] | - |
| القيمة دي موجودة؟ | [[includes(value)]] | false |

[[find]] ممكن ترجّع undefined، فاستخدم [[?.]] قبل ما تقرا منها.`,
          lines: [
            R`بنعمل array اسمها [[users]] فيها ٣ مستخدمين، كل واحد object فيه [[id]] و [[name]] و [[admin]] (true أو false). هنستخدمها نجرّب عليها دوال البحث.`,
            R`سارة: [[id]] بتاعها 1 وهي admin. هي الوحيدة اللي [[admin: true]]، وده اللي هيفرق في [[some]] و [[every]] تحت.`,
            R`عمر: [[id]] بتاعه 2 ومش admin. هو اللي هنلاقيه بـ [[find]] و [[findIndex]].`,
            R`علي: آخر واحد في الليستة ومش admin، فهو اللي [[findLast]] هيرجّعه لما ندوّر من الآخر على حد مش admin.`,
            R`نهاية الـ array.`,
            R`[[find]] بتلف من الأول وترجّع أول عنصر الدالة ترجّعله [[true]] وتقف على طول. هنا بترجّع الـ object بتاع عمر نفسه (مش نسخة)، فلو عدّلت فيه هيتعدّل جوه [[users]].`,
            R`مفيش حد [[id]] بتاعه 9، فـ [[find]] بترجّع [[undefined]]. لو كتبت بعدها [[.name]] على طول هيرمي TypeError، فاعمل check الأول أو استخدم [[?.name]].`,
            R`[[findIndex]] زي [[find]] بس بترجّع المكان (index) مش العنصر: عمر في المكان [[1]] لأن العدّ بيبدأ من صفر. ولو مش لاقي بترجّع [[-1]] مش [[undefined]].`,
            R`[[findLast]] بتدوّر من آخر الـ array لأولها، فأول واحد مش admin تقابله من الآخر هو علي. مفيدة لما عايز «أحدث» عنصر في ليستة مترتبة بالوقت.`,
            R`[[some]] بتسأل: «فيه عنصر واحد على الأقل بيحقق الشرط؟». بترجّع [[true]] أول ما تلاقي سارة وتقف، من غير ما تكمّل على الباقي.`,
            R`[[every]] بتسأل: «كلهم بيحققوا الشرط؟». عمر مش admin فترجّع [[false]] وتقف عنده. خلي بالك: على array فاضية [[every]] بترجّع [[true]].`,
            R`[[includes]] بتسأل لو القيمة دي نفسها موجودة في الـ array، وبترجّع [[true]] أو [[false]]. بتنفع للقيم البسيطة (نصوص وأرقام)، مش للـ objects لأنها بتقارن الـ reference.`,
            R`[[NaN]] مش بيساوي نفسه بـ [[===]]، بس [[includes]] بتستخدم مقارنة اسمها SameValueZero بتعتبر [[NaN]] زي [[NaN]]، فبترجّع [[true]].`,
            R`[[indexOf]] بتقارن بـ [[===]]، و [[NaN === NaN]] بـ [[false]]، فعمرها ما بتلاقيه وبترجّع [[-1]]. عشان كده لما بتسأل «موجود ولا لأ» استخدم [[includes]].`
          ],
          ref: [
            { t: "MDN: Array.prototype.find()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find" },
            { t: "MDN: Array.prototype.findIndex()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex" },
            { t: "MDN: Array.prototype.findLast()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast" },
            { t: "MDN: Array.prototype.some()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some" },
            { t: "MDN: Array.prototype.every()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every" },
            { t: "MDN: Array.prototype.includes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes" },
            { t: "MDN: Optional chaining (?.)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining" },
          ],
          pre: ["js/map و filter و reduce"],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[[10, 1, 2].sort()]] وبعدين [[[10, 1, 2].sort((a, b) => a - b)]].`, done: R`[[[1, 10, 2]]] و [[[1, 2, 10]]].`, sol: R`~~~js predict.js
console.log([10, 1, 2].sort());
console.log([10, 1, 2].sort((a, b) => a - b));
console.log([10, 1, 2].map(String).sort());
~~~

~~~text الناتج
[ 1, 10, 2 ]
[ 1, 2, 10 ]
[ '1', '10', '2' ]
~~~

**ليه:**

- [[sort()]] من غير دالة بتحوّل كل عنصر لنص وترتّب حرف حرف زي القاموس. [["10"]] و [["2"]]: أول حرف [["1"]] قبل [["2"]]، فـ 10 قبل 2. السطر التالت بيوريك نفس الترتيب بالظبط على النصوص.
- [[sort((a, b) => a - b)]]: الدالة دي اسمها comparator، وبترجّع رقم: سالب يعني a قبل b، وموجب يعني b قبل a، وصفر يعني زي بعض. [[a - b]] بيطلع سالب لما a أصغر، فالأصغر الأول: تصاعدي.

**الغلطة الشائعة:** تكتب comparator بيرجّع boolean: [[sort((a, b) => a > b)]]. الـ false بتتحسب 0 («زي بعض»)، فالترتيب بيطلع غلط أو صح بالصدفة حسب الـ array. جرّبتها في Node 24: [[[3, 1, 2].sort((a, b) => a > b)]] رجّعت [[[ 3, 1, 2 ]]] زي ما هي من غير أي ترتيب. الـ comparator لازم يرجّع رقم.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const scores = [40, 90, 70, 100, 60]; const top = scores.sort((a, b) => b - a).slice(0, 3);]] وبعدها اطبع [[scores]]. المطلوب scores تفضل زي ما دخلت.`, done: R`قبل التصليح scores بقت [[[100, 90, 70, 60, 40]]] (sort بتغيّر الأصل). بعد [[toSorted]]: top [[[100, 90, 70]]] و scores لسه [[[40, 90, 70, 100, 60]]].`, sol: R`~~~js top.js
const scores = [40, 90, 70, 100, 60];
const top = scores.sort((a, b) => b - a).slice(0, 3);
console.log("قبل التصليح:", top, scores);

const scores2 = [40, 90, 70, 100, 60];
const top2 = scores2.toSorted((a, b) => b - a).slice(0, 3);
console.log("بعد التصليح:", top2, scores2);
~~~

~~~text الناتج
قبل التصليح: [ 100, 90, 70 ] [ 100, 90, 70, 60, 40 ]
بعد التصليح: [ 100, 90, 70 ] [ 40, 90, 70, 100, 60 ]
~~~

**اللي حصل:** [[top]] طلعت صح في المرتين، فالباج مستخبي. بس [[scores]] في النسخة الأولى اترتبت هي نفسها: [[sort]] بتعدّل الـ array الأصلية (mutating) وبترجّع نفس الـ array، و [[slice]] بعدها هي اللي عملت نسخة. فأي كود تاني بيعرض الدرجات بترتيب الطلاب اتبوظ.

**التصليح:** [[toSorted]] (ES2023) نفس [[sort]] بالظبط بنفس الـ comparator، بس بترجّع array **جديدة** وتسيب الأصل. فـ [[scores2]] فضلت بترتيبها اللي دخلت بيه.

- [[(a, b) => b - a]]: تنازلي (الأكبر الأول).
- [[slice(0, 3)]]: أول ٣ من غير ما يعدّل.

**الغلطة الشائعة:** تصلّحها بـ [[[...scores].sort(...)]]. دي شغالة برضه (نسخة الأول وبعدين رتّب)، وهتشوفها في كود قديم كتير. [[toSorted]] أوضح في النية، ومتاحة في Node 20+ وكل المتصفحات الحديثة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** رتّب منتجات بالسعر تصاعدي، واللي سعرهم زي بعض بالاسم ([[localeCompare]])، بـ toSorted.`, done: R`المنتجين اللي بنفس السعر مترتبين أبجدي، والـ array الأصلية بنفس ترتيبها القديم.`, sol: R`~~~js by-price.js
const products = [
  { name: "Mug", price: 120 },
  { name: "Cap", price: 90 },
  { name: "Bag", price: 120 },
  { name: "Pen", price: 15 },
  { name: "Apron", price: 90 },
];
const sorted = products.toSorted((a, b) => a.price - b.price || a.name.localeCompare(b.name));
console.log(sorted.map((p) => $__bt$__{p.price} $__{p.name}$__bt).join(" | "));
console.log(products.map((p) => p.name).join(", "));
~~~

~~~text الناتج
15 Pen | 90 Apron | 90 Cap | 120 Bag | 120 Mug
Mug, Cap, Bag, Pen, Apron
~~~

**ليه:**

- [[a.price - b.price]]: الترتيب الأساسي بالسعر تصاعدي.
- [[|| a.name.localeCompare(b.name)]]: لو السعرين زي بعض الطرح بيطلع 0، والـ 0 falsy، فـ [[||]] بتروح للمقارنة التانية: الاسم. ولو السعرين مختلفين الطرح رقم مش صفر (truthy) فبيترجّع على طول ومحدش بيبص على الاسم.
- [[localeCompare]] بترجّع سالب أو صفر أو موجب زي ما الـ comparator محتاج، وبتقارن النصوص حسب قواعد اللغة. فـ Apron قبل Cap (الاتنين 90)، و Bag قبل Mug (الاتنين 120).
- آخر سطر: الـ [[products]] الأصلية بنفس ترتيبها (Mug, Cap, Bag...) لأننا استخدمنا [[toSorted]].

**الغلطة الشائعة:** تعمل sort مرتين: الأول بالسعر وبعدين بالاسم. التاني بيبوّظ الأول (هيبقى مترتب بالاسم بس). الترتيب بأكتر من مفتاح بيبقى comparator واحد بـ [[||]]، المفتاح الأهم الأول.` },
            { lvl: 'تطبيق', t: R`**ابني:** لوحة ترتيب لعبة: [[{ n, p, t }]] (الاسم، والنقط، والوقت بالثواني). رتّب بالنقط تنازلي، ولو النقط زي بعض الأسرع الأول، واطبع [[1. Omar 95]] وهكذا.`, done: R`على Sara 90 في 120، و Omar 95 في 200، و Ali 90 في 100: بيطبع [[1. Omar 95]] ثم [[2. Ali 90]] ثم [[3. Sara 90]]. والـ comparator سطر واحد: [[b.p - a.p || a.t - b.t]].`, sol: R`~~~js leaderboard.js
const players = [
  { n: "Sara", p: 90, t: 120 },
  { n: "Omar", p: 95, t: 200 },
  { n: "Ali", p: 90, t: 100 },
];
const board = players.toSorted((a, b) => b.p - a.p || a.t - b.t);
board.forEach((pl, i) => console.log($__bt$__{i + 1}. $__{pl.n} $__{pl.p}$__bt));
console.log(players.map((pl) => pl.n));
~~~

~~~text الناتج
1. Omar 95
2. Ali 90
3. Sara 90
[ 'Sara', 'Omar', 'Ali' ]
~~~

**ليه:**

- [[b.p - a.p]]: النقط تنازلي (الأعلى الأول)، عشان كده b قبل a.
- [[|| a.t - b.t]]: لو النقط زي بعض، الوقت **تصاعدي** (الأقل وقت = الأسرع الأول). Ali و Sara الاتنين 90، و Ali خلّص في 100 ثانية، فطلع قبل Sara.
- [[forEach((pl, i) => ...)]]: الـ callback بياخد العنصر ومكانه، فـ [[i + 1]] هو المركز (الـ index بيبدأ من 0).
- آخر سطر: [[players]] بترتيبها الأصلي، لأن اللوحة اتعملت بـ [[toSorted]].

**الغلطة الشائعة:** تخلي الاتنين نفس الاتجاه ([[b.p - a.p || b.t - a.t]])، فالأبطأ يطلع الأول في التعادل. كل مفتاح ليه اتجاهه: «أكتر أحسن» يبقى [[b - a]]، و «أقل أحسن» يبقى [[a - b]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** رتّب [[["file10", "file2", "file1"]]] بـ [[sort()]] عادي، وبعدين بـ [[localeCompare(b, undefined, { numeric: true })]]. وجرّب [[["Sara", "omar", "Ali"]]] بالطريقتين.`, done: R`العادي [[["file1", "file10", "file2"]]] والـ numeric [[["file1", "file2", "file10"]]]. والأسامي: [[sort()]] بيحط "omar" في الآخر (الحروف الكبيرة الأول)، و [[localeCompare]] بيرتّب Ali ثم omar ثم Sara.`, sol: R`~~~js natural.js
const files = ["file10", "file2", "file1"];
console.log(files.toSorted());
console.log(files.toSorted((a, b) => a.localeCompare(b, undefined, { numeric: true })));
const names = ["Sara", "omar", "Ali"];
console.log(names.toSorted());
console.log(names.toSorted((a, b) => a.localeCompare(b)));
const collator = new Intl.Collator(undefined, { numeric: true });
console.log(["v1.10", "v1.9", "v1.2"].toSorted(collator.compare));
~~~

~~~text الناتج
[ 'file1', 'file10', 'file2' ]
[ 'file1', 'file2', 'file10' ]
[ 'Ali', 'Sara', 'omar' ]
[ 'Ali', 'omar', 'Sara' ]
[ 'v1.2', 'v1.9', 'v1.10' ]
~~~

**ليه:**

- **العادي:** [[toSorted()]] من غير comparator بيقارن الـ code units حرف حرف: [["file1"]] و [["file10"]] بيبدأوا زي بعض، و [["file2"]] بعدهم لأن [["2"]] بعد [["1"]]. والأسامي: كل الحروف الكبيرة (A-Z) قبل كل الصغيرة (a-z) في الجدول، فـ [["omar"]] راح الآخر.
- **[[localeCompare(b, undefined, { numeric: true })]]:** [[undefined]] معناها «لغة الجهاز الافتراضية»، و [[numeric: true]] بيقرا الأرقام اللي جوه النص كأرقام، فـ 2 قبل 10. ده اللي اسمه natural sort، زي ما مستكشف الملفات بيرتّب.
- **[[localeCompare]] للأسامي:** بيرتّب زي القاموس من غير ما يفرق كبير وصغير في الأول: Ali ثم omar ثم Sara.
- **[[Intl.Collator]]:** نفس قواعد [[localeCompare]] بس بتتعمل مرة وتتستخدم كتير ([[collator.compare]] بتتبعت كـ comparator على طول). أسرع لما الـ array كبيرة، لأن الإعدادات مش بتتجهز مع كل مقارنة. وجرّبتها على أرقام نسخ: v1.2 ثم v1.9 ثم v1.10.

**الغلطة الشائعة:** ترتّب أسامي اليوزرز بـ [[sort()]] العادي، فاللي كتب اسمه بحرف صغير يطلع آخر اللستة. أي نص هيشوفه بني آدم رتّبه بـ [[localeCompare]] أو [[Intl.Collator]].` }
          ],
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
          teach: R`## الفكرة

[[sort]] بترتّب الـ array، بس فيها مفاجأتين: من غير دالة بترتّب كـ **نصوص**، وبتعدّل الـ array الأصلية. المثال بيوري الاتنين، وبعدين [[toSorted]] اللي بترجّع نسخة، وترتيب نصوص، وترتيب بمفتاحين، و [[with]]. اتشغّل في Node 24.

---

## ١. [[sort()]] من غير دالة

~~~text Node REPL
> [10, 1, 2].sort()
[ 1, 10, 2 ]
~~~

من غير دالة مقارنة، [[sort]] بتحوّل كل عنصر لـ string وتقارن حرف حرف زي القاموس: [["10"]] بيبدأ بـ [["1"]] فييجي قبل [["2"]]. نفس اللي بيحصل لو رتّبت كلمات.

---

## ٢. دالة المقارنة [[(a, b) => a - b]]

~~~text Node REPL
> [10, 1, 2].sort((a, b) => a - b)
[ 1, 2, 10 ]
~~~

[[sort]] بتاخد عنصرين [[a]] و [[b]] وتسأل الدالة: مين الأول؟ والدالة ترد برقم:

| الرد | المعنى |
|---|---|
| سالب | [[a]] قبل [[b]] |
| موجب | [[b]] قبل [[a]] |
| صفر | زي بعض، سيبهم |

و [[a - b]] بتطلع كده بالظبط: لو a أصغر، الفرق سالب فـ a الأول. حطينا طباعة جوه الدالة نشوف المقارنات:

~~~text الناتج (Node 24)
compare(1, 10) = -9
compare(2, 1) = 1
compare(2, 10) = -8
compare(2, 1) = 1
~~~

عدد المقارنات وترتيبها بيعتمد على الخوارزمية جوه المحرك، متعتمدش عليه. المهم إن الدالة ترجّع الإشارة الصح. و [[b - a]] بتعكس الترتيب (تنازلي).

---

## ٣. [[toSorted]]: نسخة مترتبة والأصل زي ما هو

~~~text sort.js
const prices = [300, 100, 200];
const sorted = prices.toSorted((a, b) => a - b);
console.log(prices);                     // [300, 100, 200]: الأصل زي ما هو
console.log(sorted);                     // [100, 200, 300]
~~~

~~~text الناتج
[ 300, 100, 200 ]
[ 100, 200, 300 ]
~~~

[[toSorted]] (من ES2023، يعني إصدار ٢٠٢٣ من JavaScript) بتعمل نفس شغل sort بس على **نسخة**. قارنها بـ [[sort]]:

~~~text app.js
const prices = [300, 100, 200];
const x = prices.sort();
console.log(prices, x === prices);
~~~

~~~text الناتج
[ 100, 200, 300 ] true
~~~

[[sort]] رتّبت [[prices]] نفسها، ورجّعت نفس الـ array ([[x === prices]] true). ده اللي بيبوّظ الـ state في React.

---

## ٤. ترتيب نصوص: [[localeCompare]]

~~~text Node REPL
> const names = ["Omar", "sara", "Ali"];
undefined
> names.toSorted((a, b) => a.localeCompare(b))
[ 'Ali', 'Omar', 'sara' ]
~~~

[[a.localeCompare(b)]] بتقارن نصين بقواعد اللغة وترجّع سالب أو موجب أو صفر، فبتنفع كدالة مقارنة على طول. ليه مش [[sort()]] العادية؟ اتجرّب بأسماء تانية:

~~~text الناتج من ["sara", "Omar", "ali"].sort() ثم بـ localeCompare
[ 'Omar', 'ali', 'sara' ] [ 'ali', 'Omar', 'sara' ]
~~~

الترتيب العادي بيحط كل الحروف الكبيرة قبل الصغيرة (لأن [["O"]] رقمه في الجدول أصغر من [["a"]])، فـ Omar قبل ali. [[localeCompare]] بترتّب زي القاموس.

---

## ٥. الترتيب بمفتاحين

~~~text sort.js
const products = [{ name: "B", price: 50 }, { name: "A", price: 50 }];
products.toSorted((a, b) => a.price - b.price || a.name.localeCompare(b.name));
~~~

~~~text الناتج
[ { name: 'A', price: 50 }, { name: 'B', price: 50 } ]
~~~

1. [[a.price - b.price]]: [[50 - 50]] بـ 0.
2. [[||]]: الـ 0 falsy، فـ [[||]] بتكمّل للي بعدها (درس truthy).
3. [[a.name.localeCompare(b.name)]]: قارن بالاسم، [["B"]] و [["A"]] بتطلع موجب، فـ A الأول.

لو الأسعار مختلفة، الفرق مش صفر فـ [[||]] بترجّعه على طول ومبتبصش على الاسم.

---

## ٦. [[with]]: نسخة بعنصر واحد متغير

~~~text Node REPL
> prices.with(0, 999)
[ 999, 100, 200 ]
~~~

(ده على [[prices]] قبل ما نعمل [[sort]] اللي في القسم ٣.) [[with(index, value)]] بترجّع نسخة فيها العنصر رقم 0 بقى 999، والأصل زي ما هو. ولو الـ index برا الحدود: [[RangeError: Invalid index : 5]].

---

## الخلاصة

| بتعدّل الأصل | النسخة اللي مبتعدّلش | بترجّع إيه |
|---|---|---|
| [[sort(fn)]] | [[toSorted(fn)]] | array جديدة مترتبة |
| [[reverse()]] | [[toReversed()]] | array جديدة معكوسة |
| [[splice(i, n)]] | [[toSpliced(i, n)]] | array جديدة من غير العناصر دي (و [[splice]] بترجّع **المشال**) |
| [[arr[i] = v]] | [[with(i, v)]] | array جديدة بعنصر واحد متغيّر |

- أرقام: [[(a, b) => a - b]] تصاعدي و [[b - a]] تنازلي. نصوص: [[localeCompare]].
- مع state أو داتا مشتركة استخدم النسخ اللي على اليمين.`,
          lines: [
            R`[[sort]] من غير دالة مقارنة بتحوّل كل عنصر لنص وترتّب بالحروف، و «10» بيبدأ بـ «1» فبييجي قبل «2». ده أشهر bug في ترتيب الأرقام.`,
            R`مع دالة مقارنة: لو [[a - b]] سالب يبقى a قبل b، لو موجب b قبل a، ولو صفر يفضلوا زي ما هم. [[a - b]] يرتّب تصاعدي، و [[b - a]] تنازلي.`,
            R`array أسعار مش مترتبة. هنرتّبها من غير ما نبوّظ ترتيبها الأصلي.`,
            R`[[toSorted]] بترجّع array **جديدة** مترتبة، عكس [[sort]] اللي بترتّب الـ array نفسها في مكانها. ده مهم لما الـ array دي state في React مثلًا ومينفعش تتعدّل.`,
            R`بيطبع الأصل 300 و 100 و 200 بنفس ترتيبه، وده الدليل إن [[toSorted]] ملمستهوش. لو كنا استخدمنا [[sort]] كان الأصل اترتّب هو كمان.`,
            R`بيطبع النسخة الجديدة مترتبة تصاعدي.`,
            R`أسماء فيها حروف كبيرة وصغيرة. [[sort]] العادية بتقارن أكواد الحروف، والحروف الكبيرة كلها قبل الصغيرة، فاسم زي «Zed» كان هييجي قبل «sara».`,
            R`[[localeCompare]] بتقارن نصين حسب قواعد اللغة وبترجّع رقم سالب أو موجب أو صفر، فبتتحط مكان [[a - b]] في دالة المقارنة. بترتّب «sara» في مكانها الأبجدي بغض النظر عن الحرف الكبير، وبتشتغل مع العربي.`,
            R`منتجين ليهم نفس السعر بالظبط، عشان نشوف هنرتّبهم إزاي لما الشرط الأولاني يتعادل.`,
            R`ترتيب بأكتر من شرط: الأول بالسعر، ولو السعر واحد يبقى الفرق [[0]] وده falsy، فـ [[||]] بتروح للشرط التاني وترتّب بالاسم. فـ A بييجي قبل B.`,
            R`[[with]] بترجّع نسخة من الـ array فيها العنصر في المكان ده متغيّر، والأصل زي ما هو. هي البديل الـ immutable للتعديل المباشر بالـ index (اللي بيغيّر الأصل)، ولو الـ index برّه الـ array بترمي RangeError.`
          ],
          ref: [
            { t: "MDN: Array.prototype.sort()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" },
            { t: "MDN: Array.prototype.toSorted()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted" },
            { t: "MDN: Array.prototype.toReversed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed" },
            { t: "MDN: Array.prototype.with()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with" },
            { t: "MDN: String.prototype.localeCompare()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare" },
          ],
          pre: ["js/map و filter و reduce"],
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
          try: R`اكتب دالة [[removeAt(arr, i)]] بترجّع array جديدة من غير العنصر رقم i، بـ spread و slice (من غير splice). وبعدين اعملها بـ [[toSpliced]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[removeAt]] (النسخة بتاعة spread و slice).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const [first, , third] = ["a", "b", "c"];]] واطبع الاتنين.`, done: R`"a" و "c".`, sol: R`~~~js predict.js
const [first, , third] = ["a", "b", "c"];
console.log(first, third);
const [x, y, z, w] = ["a", "b", "c"];
console.log(w);
~~~

~~~text الناتج
a c
undefined
~~~

**ليه:**

- الـ destructuring بياخد العناصر **بالترتيب**: أول اسم ← index 0، والتاني ← index 1...
- المكان الفاضي بين الفاصلتين ([[, ,]]) معناه «اتخطى العنصر ده»، فـ [["b"]] اتساب و [[third]] خد [["c"]].
- السطر التاني: [[w]] رابع اسم والـ array فيها ٣ بس، فبياخد [[undefined]] من غير error، زي [[arr[3]]] بالظبط.

**الغلطة الشائعة:** تنسى فاصلة: [[const [first, third] = ["a", "b", "c"]]] بيخلي [[third]] = [["b"]]. الاسم مالوش أي علاقة بالمكان، الترتيب بس هو اللي بيحدد.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** فك تاريخ جاي كنص: [[const [y, m, d] = "2026-10-29".split("-").map(Number);]].`, done: R`y بـ 2026 و m بـ 10 و d بـ 29، و [[typeof m]] "number" مش "string".`, sol: R`~~~js date.js
const [y, m, d] = "2026-10-29".split("-").map(Number);
console.log(y, m, d, typeof m);
const [y2, m2] = "2026-10-29".split("-");
console.log(y2, m2, typeof m2, m2 + 1);
console.log(new Date(y, m - 1, d).toDateString());
~~~

~~~text الناتج
2026 10 29 number
2026 10 string 101
Thu Oct 29 2026
~~~

**ليه:**

- [["2026-10-29".split("-")]] بترجّع ٣ **نصوص**: [[["2026", "10", "29"]]].
- [[.map(Number)]] بتحوّل كل واحد لرقم ([[Number]] بتاخد أول argument بس، فمفيش مشكلة الـ index اللي بتحصل مع [[parseInt]]).
- [[const [y, m, d] = ...]] بتفك الـ array الناتجة في ٣ متغيرات في سطر واحد، فـ [[typeof m]] بـ [["number"]].
- السطر التاني من غير [[map(Number)]]: [[m2]] نص، و [[m2 + 1]] بقت [["101"]] (لزق) مش 11. ده الباج اللي التحويل بيمنعه.
- [[new Date(y, m - 1, d)]]: الشهور في [[Date]] بتبدأ من 0 (يناير = 0)، فلازم [[m - 1]] (وحدة «التواريخ والوقت»).

**الغلطة الشائعة:** تنسى إن [[split]] بيرجّع نصوص دايمًا، وتكمّل حساب عليها. [[*]] و [[-]] بيحوّلوا لوحدهم فبيخبّوا المشكلة، لحد ما [[+]] تلزق بدل ما تجمع.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[const [x = 5, y = 7] = [undefined, null];]] و [[const [p, ...rest] = "abc";]]. اكتب x و y و p و rest قبل التشغيل.`, done: R`توقعت وطلع x بـ 5 و y بـ null و p بـ [["a"]] و rest [[["b", "c"]]]. وعرفت إن الـ default بيشتغل مع undefined بس، وإن الـ string بتتفك حروف لأنها iterable.`, sol: R`~~~js predict.js
const [x = 5, y = 7] = [undefined, null];
console.log(x, y);
const [p, ...rest] = "abc";
console.log(p, rest);
const [a = 1, b = a * 2] = [];
console.log(a, b);
~~~

~~~text الناتج
5 null
a [ 'b', 'c' ]
1 2
~~~

**ليه:**

- [[x = 5]]: العنصر الأول [[undefined]]، فالـ default اشتغل: 5.
- [[y = 7]]: العنصر التاني [[null]]، و [[null]] قيمة مش «مفيش»، فالـ default مشتغلش: [[null]]. نفس قاعدة الـ default parameters بالظبط (درس «default و rest و spread»).
- [[const [p, ...rest] = "abc"]]: الـ destructuring بتاع الـ arrays بيشتغل على أي حاجة iterable، والنص iterable حرف حرف. فـ [[p]] = [["a"]] و [[...rest]] لمّت الباقي في array: [[[ 'b', 'c' ]]] (array حقيقية مش نص).
- السطر التالت (زيادة): الـ default ممكن يستخدم متغير قبله: [[b = a * 2]] بقت 2.

**الغلطة الشائعة:** تتوقع [[y]] بـ 7 لأن «null يعني مفيش». الـ defaults في JS (في الباراميترات والـ destructuring) بتشتغل مع [[undefined]] بس. لو الداتا ممكن يبقى فيها null، استخدم [[y ?? 7]] بعد التفكيك.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const a = [ [1], [2] ]; const b = [...a]; b[0].push(9);]] واطبع [[a[0]]]. وبعدين صلّح بـ [[structuredClone]].`, done: R`قبل التصليح [[a[0]]] بقت [[[1, 9]]] (الـ spread نسخ الـ array من برا بس)، وبعد [[structuredClone(a)]] بتفضل [[[1]]].`, sol: R`~~~js copy.js
const a = [[1], [2]];
const b = [...a];
b[0].push(9);
console.log(a[0], b[0] === a[0]);

const c = [[1], [2]];
const d = structuredClone(c);
d[0].push(9);
console.log(c[0], d[0], d[0] === c[0]);

const e = [[1], [2]];
const f = e.map((inner) => [...inner]);
f[0].push(9);
console.log(e[0], f[0]);
~~~

~~~text الناتج
[ 1, 9 ] true
[ 1 ] [ 1, 9 ] false
[ 1 ] [ 1, 9 ]
~~~

**ليه:**

- [[[...a]]] بيعمل array **جديدة من برّه**، بس العناصر اللي جواها هي هي: الـ arrays الداخلية بتتنسخ بالـ reference. فـ [[b[0] === a[0]]] بـ true، و [[push(9)]] على [[b[0]]] غيّر [[a[0]]] كمان. ده اسمه shallow copy.
- [[structuredClone(c)]]: نسخة عميقة (deep copy): بينسخ كل مستوى لحد آخره، فـ [[d[0]]] array تانية خالص ([[d[0] === c[0]]] بـ false)، والـ push مأثرش في [[c]]. موجودة في Node 17+ وكل المتصفحات الحديثة.
- الحل التالت: [[e.map((inner) => [...inner])]] بينسخ مستويين بإيدك. كفاية لو انت عارف إن الداتا مستويين بس، ومش محتاج تنسخ كل حاجة.

**الغلطة الشائعة:** تفتكر إن spread أو [[slice()]] أو [[Array.from]] بيعملوا نسخة كاملة. التلاتة shallow. ولو الـ array فيها objects ([[[{ qty: 1 }]]]) وعدّلت [[copy[0].qty]]، الأصل هيتعدّل. و [[structuredClone]] مبينسخش الدوال: بيرمي [[DataCloneError]] لو لقى دالة جوه الداتا.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[rotate(arr, k)]] بتلف الـ array لليمين k خطوة بـ spread و slice، ومن غير ما تغيّر الأصل. خلي بالك من k أكبر من الطول ومن الـ array الفاضية.`, done: R`[[rotate([1, 2, 3, 4], 1)]] بترجّع [[[4, 1, 2, 3]]]، و [[rotate([1, 2, 3, 4], 5)]] نفس الناتج، و [[rotate([], 2)]] بترجّع [[[]]]، و [[rotate([1, 2], 0)]] بترجّع [[[1, 2]]] نسخة جديدة.`, sol: R`~~~js rotate.js
function rotate(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const cut = n - (k % n);
  return [...arr.slice(cut), ...arr.slice(0, cut)];
}
const nums = [1, 2, 3, 4];
console.log(rotate(nums, 1), rotate(nums, 5), rotate([], 2));
const same = rotate([1, 2], 0);
console.log(same, rotate(nums, 4), nums);
const original = [1, 2];
console.log(rotate(original, 0) === original);
~~~

~~~text الناتج
[ 4, 1, 2, 3 ] [ 4, 1, 2, 3 ] []
[ 1, 2 ] [ 1, 2, 3, 4 ] [ 1, 2, 3, 4 ]
false
~~~

**ليه كل سطر:**

- اللف لليمين خطوة = آخر عنصر ييجي الأول. يعني نقطع الـ array عند [[cut]]: اللي بعد القطع ييجي الأول، واللي قبله بعده.
- [[k % n]]: ٥ خطوات على ٤ عناصر زي خطوة واحدة. فـ [[rotate(nums, 5)]] زي [[rotate(nums, 1)]]، و [[rotate(nums, 4)]] رجعت الترتيب الأصلي.
- [[cut = n - (k % n)]]: لخطوة واحدة على ٤ عناصر القطع عند 3، فـ [[slice(3)]] = [[[4]]] و [[slice(0, 3)]] = [[[1, 2, 3]]].
- [[[...a, ...b]]]: spread بيدمج القطعتين في array جديدة. و [[slice]] نفسها مبتعدّلش، فـ [[nums]] زي ما هي.
- [[if (n === 0) return []]]: من غيرها [[k % 0]] بـ NaN. و [[k = 0]]: [[cut = n]] فالناتج نسخة كاملة، و [[=== original]] بـ false، يعني array جديدة فعلًا مش نفس الـ reference.

**الغلطة اللي وقعت فيها:** أول نسخة كانت من غير [[%]]، باستخدام الـ index السالب في [[slice]]:

~~~js rotate-bug.js
// من غير % : الخطوات أكبر من الطول
const rotateBug = (arr, k) => [...arr.slice(-k), ...arr.slice(0, -k)];
console.log(rotateBug([1, 2, 3, 4], 1), rotateBug([1, 2, 3, 4], 5), rotateBug([1, 2, 3, 4], 0));
~~~

~~~text الناتج
[ 4, 1, 2, 3 ] [ 1, 2, 3, 4 ] [ 1, 2, 3, 4 ]
~~~

[[k = 1]] طلعت صح، بس [[k = 5]] رجّعت الترتيب الأصلي: [[slice(-5)]] على ٤ عناصر بيرجّع الـ array كلها (السالب أكبر من الطول بيتقص للأول)، و [[slice(0, -5)]] بيرجّع [[[]]]. و [[k = 0]] طلعت صح **بالصدفة**: [[slice(-0)]] زي [[slice(0)]]. الـ [[%]] بيخلي الحسبة صح لأي k من غير ما تعتمد على صدف [[slice]].` }
          ],
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
          teach: R`## الفكرة

حاجتين بتمشوا مع بعض:

- **destructuring**: تفك array لمتغيرات في سطر واحد، بالترتيب.
- **spread** ([[...]]): تفرد عناصر array جوه array تانية، فتعمل نسخة أو تدمج أو تضيف من غير ما تعدّل الأصل.

كل سطر في المثال اتشغّل في Node 24، وطبعنا المتغيرات بعده.

---

## ١. فك بالترتيب

~~~text destructuring.js
const [first, second] = ["a", "b", "c"];
~~~

الأقواس المربعة **على الشمال** من [[=]] مش array، دي «قالب»: أول اسم ياخد العنصر 0، والتاني ياخد العنصر 1. والـ [["c"]] ملهاش اسم فاتسابت.

~~~text الناتج من console.log(first, second)
a b
~~~

ده نفس [[const first = arr[0]; const second = arr[1];]] بس في سطر. وده اللي في React: [[const [count, setCount] = useState(0)]]، [[useState]] بترجّع array فيها عنصرين.

---

## ٢. تتخطى عناصر

~~~text destructuring.js
const [, , third] = ["a", "b", "c"];
~~~

كل فاصلة من غير اسم قبلها = «اتخطى العنصر ده». فاتخطينا 0 و 1، و [[third]] خد [["c"]].

---

## ٣. الباقي بـ [[...rest]]

~~~text destructuring.js
const [head, ...rest] = [1, 2, 3, 4];      // head = 1, rest = [2, 3, 4]
~~~

~~~text الناتج
1 [ 2, 3, 4 ]
~~~

[[...]] هنا (على الشمال) معناها «لمّ الباقي في array». لازم تبقى آخر حاجة. ولو مفيش باقي بتبقى array فاضية: [[const [r1, ...r2] = [1]]] خلّت [[r2]] بـ [[[]]].

---

## ٤. قيمة افتراضية

~~~text destructuring.js
const [x = 0] = [];                        // x = 0
~~~

الـ array فاضية، فالعنصر 0 [[undefined]]، فـ [[x]] خد الـ default. والـ default زي الباراميترات: لـ undefined بس. اتجرّب [[const [y = 0] = [null]]] و [[y]] طلعت [[null]].

---

## ٥. تبديل متغيرين

~~~text destructuring.js
let a = 1, b = 2;
[a, b] = [b, a];                           // تبديل: a = 2, b = 1
~~~

1. [[let a = 1, b = 2;]]: متغيرين في سطر واحد بفاصلة.
2. اليمين [[[b, a]]] بيتحسب الأول: array مؤقتة [[[2, 1]]].
3. الشمال [[[a, b]]] بيفكها: a بقت 2 و b بقت 1.

~~~text الناتج
2 1
~~~

مهم: [[;]] في آخر السطر الأول. اتجرّب من غيرها في ملف:

~~~text الناتج من غير ; (Node 24)
[a, b] = [b, a]
    ^

ReferenceError: Cannot access 'b' before initialization
~~~

JS قرا السطرين كأنهم [[let a = 1, b = 2[a, b] = [b, a]]]: الـ [[[]] في أول السطر اتلزقت في الـ 2 اللي قبلها.

---

## ٦. spread: دمج ونسخ وإضافة

~~~text destructuring.js
const merged = [...[1, 2], ...[3, 4], 5];  // [1, 2, 3, 4, 5]
const copy = [...merged];
const withNew = [...merged, 6];            // إضافة من غير push
~~~

- [[...[1, 2]]] جوه array جديدة = حط [[1, 2]] هنا كعناصر منفصلة. فـ merged بقت [[[1, 2, 3, 4, 5]]].
- [[[...merged]]]: array جديدة بنفس العناصر. نسخة.
- [[[...merged, 6]]]: نسخة + عنصر في الآخر، و merged نفسها متلمستش.

~~~text الناتج من console.log(copy === merged, withNew, merged)
false [ 1, 2, 3, 4, 5, 6 ] [ 1, 2, 3, 4, 5 ]
~~~

[[copy === merged]] false: array تانية في الذاكرة. بس النسخة **سطحية** (shallow): لو العناصر objects، النسخة بتشاور على نفس الـ objects:

~~~text app.js
const objs = [{ n: 1 }];
const cp = [...objs];
cp[0].n = 99;
console.log(objs);
~~~

~~~text الناتج
[ { n: 99 } ]
~~~

---

## ٧. شيل التكرار بـ Set

~~~text destructuring.js
const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
~~~

~~~text الناتج من console.log(new Set([1, 1, 2, 3, 3]), unique)
Set(3) { 1, 2, 3 } [ 1, 2, 3 ]
~~~

1. [[new Set([...])]]: [[Set]] مجموعة مبتقبلش تكرار، فبتشيل التكرار لوحدها. بس هي مش array.
2. [[[...set]]]: افردها جوه array.

---

## ٨. [[flat]]

~~~text destructuring.js
const rows = [[1, 2], [3, 4]];
rows.flat();                               // [1, 2, 3, 4]
~~~

[[rows]] array جواها arrays. [[flat()]] بتفردها مستوى واحد. ولو العمق أكتر:

~~~text الناتج من [1, [2, [3, [4]]]].flat() و flat(Infinity)
[ 1, 2, [ 3, [ 4 ] ] ] [ 1, 2, 3, 4 ]
~~~

---

## الخلاصة

| الكود | مكان [[...]] | المعنى |
|---|---|---|
| [[const [a, b] = arr]] | - | فك بالترتيب |
| [[const [, , c] = arr]] | - | اتخطى عناصر |
| [[const [h, ...rest] = arr]] | شمال [[=]] | لمّ الباقي |
| [[const [x = 0] = arr]] | - | default لو undefined |
| [[[...a, ...b]]] | يمين [[=]] | دمج / نسخة سطحية |
| [[[...new Set(arr)]]] | يمين [[=]] | شيل التكرار |

التمرين اللي تحت عايز array جديدة من غير عنصر معيّن والأصل يفضل زي ما هو: فكّر إزاي [[slice]] (درس string methods، وبتشتغل على الـ arrays بنفس الطريقة) و spread ممكن يساعدوك.`,
          lines: [
            R`array destructuring: بيفك الـ array لمتغيرات بالترتيب، فـ [[first]] بقى «a» و [[second]] بقى «b»، والعنصر التالت اتساب لأننا مطلبناهوش.`,
            R`الفاصلة الفاضية معناها «اتخطى العنصر ده». فاصلتين يعني اتخطينا الأول والتاني، فـ [[third]] أخد «c».`,
            R`[[...rest]] بيلم كل اللي فاضل في array جديدة. لازم ييجي في الآخر، ولو حطيته في النص هيدّي SyntaxError.`,
            R`الـ array فاضية فمفيش عنصر أول، والقيمة [[undefined]]، فـ [[x]] بياخد القيمة الافتراضية [[0]]. خلي بالك: الافتراضي بيشتغل مع [[undefined]] بس، لو العنصر [[null]] هيفضل [[null]].`,
            R`متغيرين بـ [[let]] (مش [[const]]) لأننا هنغيّر قيمتهم في السطر الجاي.`,
            R`تبديل القيم في سطر واحد: اليمين بيتعمل array جديدة فيها قيمة b وبعدها قيمة a الأول، وبعدين بتتفك تاني في [[a]] و [[b]]. من غير الطريقة دي كنت محتاج متغير مؤقت تالت.`,
            R`الـ spread [[...]] بيفرد عناصر كل array جوه array جديدة، فبندمج اتنين ونزوّد [[5]] في الآخر في خطوة واحدة.`,
            R`نسخة جديدة من [[merged]]: تعديل [[copy]] مش هيأثر على [[merged]]. بس النسخة سطحية (shallow): لو جواها objects، الاتنين بيشاوروا على نفس الـ objects.`,
            R`[[Set]] مبيقبلش قيمة مكررة، فبيشيل التكرار، وبعدين الـ spread بيرجّعه array عادية. ده أقصر طريقة تعمل array من غير تكرار للقيم البسيطة.`,
            R`array جديدة فيها كل عناصر [[merged]] وفي آخرها [[6]]، والأصل متلمسش. [[push]] كانت هتعدّل [[merged]] نفسها، وده اللي بنتجنّبه في state.`,
            R`[[rows]] array جواها arrays (مصفوفة ٢ في ٢)، زي صفوف جدول.`,
            R`[[flat]] بتفك مستوى واحد من التداخل، فبقت array واحدة فيها ٤ أرقام. لو التداخل أعمق ابعتلها العمق، زي [[flat(2)]] أو [[flat(Infinity)]].`
          ],
          ref: [
            { t: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
            { t: "MDN: Spread syntax (...)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
            { t: "MDN: Array.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" },
            { t: "MDN: Array.prototype.toSpliced()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced" },
            { t: "MDN: Array.prototype.flat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat" },
            { t: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" },
            { t: "MDN: structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone" },
          ],
          pre: ["js/default و rest و spread", "js/array literals و index و length"],
          sol: R`[[removeAt(["a", "b", "c", "d"], 1)]] بترجّع [[["a", "c", "d"]]] والأصل زي ما هو. و [[arr.toSpliced(1, 1)]] بترجّع نفس الناتج في سطر واحد: هي splice بس من غير ما تعدّل الأصل.

خلي بالك من index سالب: [[toSpliced(-1, 1)]] بتشيل آخر عنصر صح، لكن نسخة slice بتاعتك مع [[-1]] هتطلع array أطول من الأصل (لأن [[slice(0)]] بيرجّع كله). لو هتستخدم نسختك، افحص إن i بين 0 والطول.`,
          solCode: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
const letters = ["a", "b", "c", "d"];
console.log(removeAt(letters, 1));     // ["a", "c", "d"]
console.log(letters.toSpliced(1, 1));  // ["a", "c", "d"]
console.log(letters);                  // ["a", "b", "c", "d"]: الأصل زي ما هو`,
          check: {
            lang: "js",
            starter: R`const removeAt = (arr, i) => arr;`,
            tests: R`test("removeAt(['a', 'b', 'c', 'd'], 1) ← ['a', 'c', 'd']", () => expect(removeAt(["a", "b", "c", "d"], 1)).toEqual(["a", "c", "d"]));
test("الأصل زي ما هو", () => {
  const letters = ["a", "b", "c"];
  removeAt(letters, 0);
  expect(letters).toEqual(["a", "b", "c"]);
});
test("بترجّع array جديدة مش نفس الـ reference", () => { const a = [1, 2]; expect(removeAt(a, 5) === a).toBe(false); });
test("أول عنصر وآخر عنصر", () => expect([removeAt([1, 2, 3], 0), removeAt([1, 2, 3], 2)]).toEqual([[2, 3], [1, 2]]));
test("index برا الحدود ← نسخة زي ما هي", () => expect(removeAt([1, 2, 3], 7)).toEqual([1, 2, 3]));`,
            solution: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];`
          }
        }
      ]
    }
]);
