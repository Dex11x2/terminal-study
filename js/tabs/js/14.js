// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "prototypes و classes",
      l: 2,
      n: "الوراثة في JS بالـ prototype chain، و class شكل أوضح لنفس الفكرة، و extends و super و private fields",
      pre: [
        { to: "js/this", why: R`كل method في كلاس بتشتغل بـ this، و [[new]] قاعدة من قواعد this الأربعة`},
        { to: "js/object literal", why: R`الكلاس طريقة تانية تعمل بيها objects بـ methods، والـ getters اتشافت هناك الأول`},
        { to: "js/closure", why: R`الـ private fields [[#]] بتعمل نفس اللي الـ closure كان بيعمله: حالة محدش يوصلها من برّه`},
      ],
      projects: [
        { lvl: 'صغير', t: R`كلاس فلوس`, what: R`[[class Money]] بتخزّن المبلغ بالقروش في [[#cents]] (عدد صحيح)، وفيها [[add(other)]] بترجّع Money جديدة، و [[format()]] بترجّع [["12.50 جنيه"]]، و [[static from(pounds)]]. من درس class.`, done: R`[[Money.from(0.1).add(Money.from(0.2)).format()]] بترجّع [["0.30 جنيه"]] (مش [[0.30000000000000004]])، و [[add]] مبتغيرش الأصل، ومبلغ سالب أو مش رقم بيرمي RangeError.`, sol: R`~~~js money.js
class Money {
  #cents;                                    // عدد صحيح دايمًا

  constructor(cents) {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new RangeError("المبلغ لازم يبقى عدد قروش صحيح مش سالب: " + cents);
    }
    this.#cents = cents;
  }

  static from(pounds) {
    if (typeof pounds !== "number" || !Number.isFinite(pounds) || pounds < 0) {
      const shown = typeof pounds === "string" ? '"' + pounds + '"' : String(pounds);
      throw new RangeError("المبلغ لازم يبقى رقم مش سالب: " + shown);
    }
    return new Money(Math.round(pounds * 100));
  }

  get cents() {
    return this.#cents;
  }

  add(other) {
    if (!(other instanceof Money)) throw new TypeError("add بتاخد Money بس");
    return new Money(this.#cents + other.#cents);   // instance جديدة، والأصل زي ما هو
  }

  format() {
    return (this.#cents / 100).toFixed(2) + " جنيه";
  }
}

console.log(0.1 + 0.2);
const a = Money.from(0.1);
const sum = a.add(Money.from(0.2));
console.log(sum.format(), "| الأصل:", a.format(), "| قروش:", sum.cents);
console.log(Money.from(12.5).format(), Money.from(0).format(), Money.from(1999.99).add(Money.from(0.01)).format());

for (const bad of [-5, "10", NaN, Infinity]) {
  try { Money.from(bad); } catch (e) { console.log(e.name + ": " + e.message); }
}
try { a.add(0.2); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(a.cents, a.toString(), JSON.stringify(a));
~~~

## هتشوف إيه

~~~text الناتج (node money.js، Node 24)
0.30000000000000004
0.30 جنيه | الأصل: 0.10 جنيه | قروش: 30
12.50 جنيه 0.00 جنيه 2000.00 جنيه
RangeError: المبلغ لازم يبقى رقم مش سالب: -5
RangeError: المبلغ لازم يبقى رقم مش سالب: "10"
RangeError: المبلغ لازم يبقى رقم مش سالب: NaN
RangeError: المبلغ لازم يبقى رقم مش سالب: Infinity
TypeError: add بتاخد Money بس
10 [object Object] {}
~~~

## كل حتة بتعمل إيه

- **[[#cents]] عدد صحيح:** المشكلة في أول سطر ([[0.30000000000000004]]) سببها إن 0.1 و 0.2 مش بيتخزنوا بالظبط في الـ binary. القروش أعداد صحيحة، والأعداد الصحيحة لحد [[Number.MAX_SAFE_INTEGER]] بتتخزن بالظبط، فـ 10 + 20 = 30 دايمًا.
- **[[static from(pounds)]]:** المدخل بالجنيه (زي ما اليوزر بيكتب)، و [[Math.round(pounds * 100)]] بيحوّل لقروش ويقرّب أي كسر صغير زي [[0.1 * 100 = 10.000000000000002]].
- **الـ constructor بيتحقق كمان:** حتى لو حد نادى [[new Money(1.5)]] مباشرة، بيترفض. فمستحيل يبقى فيه Money قيمتها مش سليمة.
- **[[other.#cents]]:** الـ private field ينفع يتقري من أي instance من **نفس الكلاس** جوه جسم الكلاس. و [[instanceof Money]] قبلها عشان لو حد بعت رقم، الرسالة تبقى واضحة بدل [[TypeError: Cannot read private member]].
- **[[add]] بترجّع [[new Money]]:** الـ object مبيتغيرش بعد ما يتعمل (immutable)، والدليل [[a.format()]] لسه 0.10.
- **آخر سطر:** الـ private field مش بيظهر في [[JSON.stringify]] ([[{}]]) ولا في [[toString]]. لو محتاج تحفظه زوّد [[toJSON]] (تمرين BankAccount).

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة كانت [[this.pounds = pounds]] و [[add]] بتجمع جنيهات:** [[Money.from(0.1).add(Money.from(0.2)).format()]] طلعت [["0.30"]] بالصدفة بسبب [[toFixed(2)]]، لكن [[sum.pounds === 0.3]] كانت [[false]]، وأي مقارنة أو تجميع كبير كان هيبوظ. القروش هي الحل الحقيقي مش التقريب في العرض.
- **[[typeof pounds !== "number"]] لوحدها:** عدّت [[NaN]] و [[Infinity]] (نوعهم number). زوّدت [[Number.isFinite]].
- **رسالة الـ error كانت بتقول [[null]] لـ NaN و Infinity:** كنت كاتب [[JSON.stringify(pounds)]] في الرسالة، و [[JSON.stringify(NaN)]] بـ [["null"]]. بقت [[String(pounds)]]، وعلامات تنصيص للنص بس عشان يبان إن [["10"]] نص.` },
        { lvl: 'صغير', t: R`Stack بـ private field`, what: R`[[class Stack]] فيها [[#items]] و [[push]] و [[pop]] و [[peek]] و getter [[size]]، و [[pop]] على stack فاضي بيرمي Error برسالة. من درس class.`, done: R`[[push(1).push(2)]] بتتسلسل (لأنها بترجّع this)، و [[pop()]] بترجّع [[2]]، و [[size]] صح، و [[stack.items]] بترجّع [[undefined]] من برّه.`, sol: R`~~~js stack.js
class Stack {
  #items = [];

  push(item) {
    this.#items.push(item);
    return this;                     // عشان push(1).push(2)
  }
  pop() {
    if (this.#items.length === 0) throw new Error("الـ stack فاضي: مفيش حاجة تتشال");
    return this.#items.pop();
  }
  peek() {
    return this.#items.at(-1);
  }
  get size() {
    return this.#items.length;
  }
}

const stack = new Stack();
stack.push(1).push(2);
console.log(stack.pop(), stack.size, stack.peek(), stack.items);
stack.pop();
try {
  stack.pop();
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// استخدام حقيقي: الأقواس متقفلة صح؟
function isBalanced(text) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const open = new Stack();
  for (const ch of text) {
    if ("([{".includes(ch)) open.push(ch);
    else if (ch in pairs) {
      if (open.size === 0 || open.pop() !== pairs[ch]) return false;
    }
  }
  return open.size === 0;
}
console.log(isBalanced("f(a[0], { b: 1 })"), isBalanced("(]"), isBalanced("(("), isBalanced("))"));
~~~

## هتشوف إيه

~~~text الناتج (node stack.js، Node 24)
2 1 1 undefined
Error: الـ stack فاضي: مفيش حاجة تتشال
true false false false
~~~

## كل حتة بتعمل إيه

- **[[#items]]:** الـ array الخاصة. [[stack.items]] من برّه بـ [[undefined]] لأن [[#items]] مش خاصية اسمها items أصلًا.
- **[[push]] بترجّع [[this]]:** النداء [[stack.push(1)]] بيرجّع stack، فـ [[.push(2)]] بتتنده عليه.
- **[[pop]] على فاضي بيرمي Error:** عكس [[Array.prototype.pop]] اللي بترجّع [[undefined]] بهدوء. في stack، الشيل من فاضي غالبًا باج (زي قوس قافل من غير فاتح)، فالأحسن يبان.
- **[[peek]] بـ [[at(-1)]]:** آخر عنصر من غير ما يشيله.
- **[[get size]]:** getter، فبيتقري [[stack.size]] من غير أقواس، ومفيش طريقة تكتب فيه.
- **[[isBalanced]]:** كل قوس فاتح بيدخل الـ stack، وكل قافل لازم يقابل آخر فاتح. وفي الآخر الـ stack لازم يبقى فاضي. ده نفس اللي محرر الكود بيعمله وهو بيلوّن الأقواس.

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[isBalanced("))")]] رمت Error بدل ما ترجّع false:** [[open.pop()]] على stack فاضي. الحل [[open.size === 0 ||]] قبلها.
- **[[size()]] كانت method:** [[stack.size]] كانت بترجّع الدالة نفسها والـ console طبع [[[Function: size]]]. خليتها getter.` },
        { lvl: 'متوسط', t: R`عيلة errors للـ API`, what: R`[[class AppError extends Error]] فيها [[status]]، ومنها [[NotFoundError]] (404) و [[ValidationError]] (400 ومعاها [[field]]) و [[AuthError]] (401). ودالة [[toResponse(err)]] بترجّع [[{ status, body }]] حسب النوع بـ [[instanceof]]، وأي error مش معروف بيبقى 500 من غير تفاصيله. من درس extends و super ودرس class.`, done: R`كل نوع بيطلع الـ status بتاعه، و [[new TypeError("x")]] بيطلع 500 والـ body مفيهوش [["x"]]، و [[err.name]] صح لكل نوع، وكل ده متجرّب بـ [[console.assert]].`, sol: R`~~~js errors.js
class AppError extends Error {
  constructor(message, status = 500, options) {
    super(message, options);
    this.name = this.constructor.name;      // اسم الكلاس الحقيقي حتى في الأبناء
    this.status = status;
  }
}
class NotFoundError extends AppError {
  constructor(what) {
    super(what + " مش موجود", 404);
  }
}
class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400);
    this.field = field;
  }
}
class AuthError extends AppError {
  constructor(message = "لازم تسجّل دخول") {
    super(message, 401);
  }
}

function toResponse(err, log = console.error) {
  if (err instanceof ValidationError) {
    return { status: err.status, body: { error: err.message, field: err.field } };
  }
  if (err instanceof AppError) {
    return { status: err.status, body: { error: err.message } };
  }
  log("[500]", err);                         // التفاصيل للّوج بس، مش لليوزر
  return { status: 500, body: { error: "حصل خطأ عندنا" } };
}

// الاختبارات
let passed = 0, total = 0;
function check(cond, msg) {
  total++;
  console.assert(cond, msg);
  if (cond) passed++;
}

const logged = [];
const quiet = (...a) => logged.push(a);

const nf = toResponse(new NotFoundError("المنتج 7"));
check(nf.status === 404 && nf.body.error === "المنتج 7 مش موجود", "404");
const val = toResponse(new ValidationError("الإيميل غلط", "email"));
check(val.status === 400 && val.body.field === "email", "400 + field");
const auth = toResponse(new AuthError());
check(auth.status === 401 && auth.body.error === "لازم تسجّل دخول", "401");
const unknown = toResponse(new TypeError("x is undefined في db.js:42"), quiet);
check(unknown.status === 500, "500");
check(!JSON.stringify(unknown.body).includes("x is undefined"), "الـ body مفيهوش التفاصيل");
check(logged.length === 1 && logged[0][1] instanceof TypeError, "التفاصيل راحت للّوج");
check(new NotFoundError("x").name === "NotFoundError" && new AuthError().name === "AuthError", "name");
check(new ValidationError("m", "f") instanceof AppError && new ValidationError("m", "f") instanceof Error, "السلسلة");
check(String(new AuthError()) === "AuthError: لازم تسجّل دخول", "String(err)");
const wrapped = new AppError("فشل الحفظ", 503, { cause: new Error("ECONNREFUSED") });
check(toResponse(wrapped).status === 503 && wrapped.cause.message === "ECONNREFUSED", "cause");

console.log(passed + " من " + total + " assert عدّوا");
console.log(nf, val, unknown);
~~~

## هتشوف إيه

~~~text الناتج (node errors.js، Node 24)
10 من 10 assert عدّوا
{ status: 404, body: { error: 'المنتج 7 مش موجود' } } { status: 400, body: { error: 'الإيميل غلط', field: 'email' } } { status: 500, body: { error: 'حصل خطأ عندنا' } }
~~~

## كل حتة بتعمل إيه

- **[[AppError extends Error]]:** كل errors التطبيق ليهم أب واحد فيه [[status]]. فـ [[toResponse]] تقدر تقول «أي AppError، خد الـ status بتاعه» من غير ما تعرف كل الأنواع.
- **[[this.name = this.constructor.name]]:** مكتوبة مرة واحدة في الأب، وبتدّي كل ابن اسمه هو، لأن this وقت التنفيذ هي الـ instance الحقيقي ([[NotFoundError]] مثلًا). ملحوظة: لو الكود اتعمله minify الأسامي ممكن تتغير، وساعتها اكتب الاسم صريح في كل كلاس.
- **[[super(message, options)]]:** الـ [[options]] بتعدّي [[{ cause }]] لـ Error، فتقدر تلف error قديم في جديد من غير ما تضيّع الأصلي (آخر assert).
- **ترتيب الـ [[instanceof]]:** [[ValidationError]] الأول لأنه محتاج [[field]] زيادة. لو [[AppError]] الأول كان هيمسكه وتضيع الـ field.
- **الـ 500:** أي error مش معروف (باج حقيقي) بيروح للّوج كامل، واليوزر بياخد رسالة عامة. ده أمان: رسالة زي [["x is undefined في db.js:42"]] بتكشف تفاصيل الكود لأي حد.
- **[[log]] parameter:** في الشغل الحقيقي [[console.error]]، وفي الاختبار دالة بتجمع، فنتأكد إن التفاصيل اتسجّلت من غير ما تملا الشاشة.

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[err.name]] كان [["Error"]] لكل الأنواع:** نسيت [[this.name]]، والـ [[name]] بيتورث من [[Error.prototype]]. الـ assert بتاع name مسكها.
- **أول [[toResponse]] كانت بترجّع [[body: { error: err.message }]] لأي error:** رسالة الـ TypeError بتفاصيل الملف ظهرت في الـ response. الـ assert الخامس اتكتب عشان ده ميرجعش.` },
        { lvl: 'متوسط', dir: "shapes-page", t: R`أشكال على الصفحة`, what: R`[[Shape]] وتحتها [[Circle]] و [[Rect]] و [[Square extends Rect]]، كل واحدة بتعرف [[area()]] و [[render(root)]] بترسم [[div]] بالمقاس الصح بـ [[style]]. فورم بتختار منه الشكل والمقاسات وبيضيفه. من دروس الوحدة ووحدة الـ DOM.`, done: R`[[new Square(3) instanceof Rect]] بترجّع [[true]]، والمساحة الكلية تحت الرسمة بتتحدث مع كل شكل جديد، والمقاس السالب أو الفاضي بيطلع رسالة ومبيرسمش.`, sol: R`~~~live 470 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أشكال</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  form { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  input, select, button { font: inherit; padding: 4px 8px; }
  input { width: 70px; }
  #canvas { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; min-height: 80px; margin: 12px 0; padding: 10px; background: #fff; border: 1px dashed #cbd5e1; border-radius: 8px; }
  .shape { background: #60a5fa; display: grid; place-items: center; color: #fff; font-size: 12px; }
  .shape.circle { border-radius: 50%; background: #f59e0b; }
  .error { color: #b91c1c; min-height: 1.6em; margin: 4px 0; }
</style>
</head>
<body>
<form id="form">
  <select name="type" aria-label="الشكل">
    <option value="circle">دايرة (نص قطر)</option>
    <option value="rect">مستطيل (عرض × طول)</option>
    <option value="square">مربع (ضلع)</option>
  </select>
  <input name="a" inputmode="decimal" aria-label="المقاس الأول" placeholder="أ">
  <input name="b" inputmode="decimal" aria-label="المقاس التاني" placeholder="ب">
  <button>ارسم</button>
</form>
<p class="error" id="error" role="alert"></p>
<div id="canvas"></div>
<p>المساحة الكلية: <b id="total">0</b> وحدة مربعة</p>
<script>
  const UNIT = 10;                                    // كل وحدة = 10px على الشاشة

  class Shape {
    area() { return 0; }
    size() { return { w: 0, h: 0 }; }
    render(root) {
      const { w, h } = this.size();
      const el = document.createElement("div");
      el.className = "shape " + this.constructor.name.toLowerCase();
      el.style.width = w * UNIT + "px";
      el.style.height = h * UNIT + "px";
      el.textContent = Number(this.area().toFixed(1));
      el.title = this.constructor.name;
      root.append(el);
      return el;
    }
    static checkSize(...nums) {
      for (const n of nums) {
        if (!Number.isFinite(n) || n < 1 || n > 30) throw new RangeError("المقاسات لازم تبقى أرقام من 1 لـ 30");
      }
    }
  }
  class Circle extends Shape {
    constructor(r) { super(); Shape.checkSize(r); this.r = r; }
    area() { return Math.PI * this.r ** 2; }
    size() { return { w: this.r * 2, h: this.r * 2 }; }
  }
  class Rect extends Shape {
    constructor(w, h) { super(); Shape.checkSize(w, h); this.w = w; this.h = h; }
    area() { return this.w * this.h; }
    size() { return { w: this.w, h: this.h }; }
  }
  class Square extends Rect {
    constructor(side) { super(side, side); }
  }

  const shapes = [];
  const form = document.querySelector("#form");
  const error = document.querySelector("#error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { type, a, b } = Object.fromEntries(new FormData(form));
    const x = a.trim() === "" ? NaN : Number(a);
    const y = b.trim() === "" ? NaN : Number(b);
    try {
      const shape = type === "circle" ? new Circle(x) : type === "rect" ? new Rect(x, y) : new Square(x);
      shape.render(document.querySelector("#canvas"));
      shapes.push(shape);
      error.textContent = "";
      const total = shapes.reduce((sum, s) => sum + s.area(), 0);
      document.querySelector("#total").textContent = Number(total.toFixed(1));
    } catch (err) {
      if (!(err instanceof RangeError)) throw err;
      error.textContent = err.message;
    }
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

فورم فيه اختيار الشكل وخانتين للمقاسات وزرار «ارسم». كل شكل بيترسم في المساحة اللي تحت بمقاسه الحقيقي (كل وحدة 10px): الدايرة برتقاني مدوّر، والمستطيل والمربع أزرق، ومكتوب جوه كل واحد مساحته. وتحت المساحة الكلية بتزيد مع كل شكل. مقاس سالب أو فاضي أو أكبر من 30 بيطلع رسالة حمرا ومبيرسمش.

~~~text الناتج (Chrome 157، Playwright)
دايرة 3        → div 60×60px، border-radius 50%، مكتوب 28.3، الكلية 28.3
مستطيل 4 × 2   → div 40×20px، مكتوب 8، الكلية 36.3
مربع 3         → div 30×30px، مكتوب 9، الكلية 45.3، و class="shape square"
مستطيل -2 × 3  → «المقاسات لازم تبقى أرقام من 1 لـ 30»، ومفيش شكل جديد
مستطيل 5 × فاضي → نفس الرسالة
new Square(3) instanceof Rect → true
~~~

## كل حتة بتعمل إيه

- **[[Shape]]** فيها [[render]] مكتوبة مرة واحدة: بتسأل [[this.size()]] و [[this.area()]]، وكل ابن بيرد بطريقته (polymorphism). و [[this.constructor.name.toLowerCase()]] بيدّي الـ class بتاع الـ CSS ([[circle]] أو [[rect]] أو [[square]]) من غير [[if]].
- **[[Square extends Rect]]:** المربع **نوع من** المستطيل، فبيورث [[area]] و [[size]] كاملين، والـ constructor بتاعه سطر واحد [[super(side, side)]]. والدليل [[instanceof Rect]] بـ [[true]].
- **[[static checkSize(...nums)]]:** التحقق في مكان واحد بيستخدمه كل constructor. بيرمي [[RangeError]] قبل ما أي حاجة تترسم.
- **[[a.trim() === "" ? NaN : Number(a)]]:** لأن [[Number("")]] بـ [[0]] مش NaN، وكانت هتعدّي على أنها رقم.
- **[[if (!(err instanceof RangeError)) throw err]]:** الـ catch بيمسك أخطاء التحقق بس. أي باج تاني يطلع في Console زي ما هو.
- **[[el.style.width = w * UNIT + "px"]]:** المقاس في الـ JS بالوحدات، والتحويل لبيكسل في مكان واحد.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الخانة الفاضية كانت بترسم شكل بمقاس 0:** [[Number("")]] بـ 0. اتصلحت بحالة الفاضي.
- **[[Square]] كانت بتكرر [[area() { return this.side ** 2; }]]:** كود مكرر ممكن يختلف عن Rect بعدين. الوراثة الصح إنها تبعت الضلع مرتين لـ Rect وخلاص.` },
        { lvl: 'كبير', t: R`نظام مكتبة كتب`, what: R`classes [[Book]] و [[Member]] و [[Library]]: الـ Library فيها Maps خاصة للكتب والأعضاء والاستعارات، و [[borrow(memberId, isbn)]] و [[returnBook]] بيرموا errors من عيلة [[LibraryError]] ([[NotFoundError]] و [[AlreadyBorrowedError]] و [[LimitError]] لو العضو عنده ٣ كتب). و [[toJSON]] و [[static fromJSON]] عشان الحالة تتحفظ في ملف وترجع. وفي [[test.js]] حالات بـ [[console.assert]] لكل error ولرحلة حفظ وتحميل كاملة، وكل عملية بتتكتب في لوج بـ [[console.info]]. من الوحدة دي، و JSON و Map من وحدة الـ objects، و this.`, done: R`[[node test.js]] بيعدّي كل الـ asserts: استعارة كتاب مستعار بترمي [[AlreadyBorrowedError]] والحالة متغيرتش، والكتاب الرابع بيرمي [[LimitError]]، وبعد [[fromJSON(JSON.stringify(lib))]] كل الاستعارات زي ما هي و [[borrow]] شغالة على النسخة الجديدة، وملف JSON بايظ بيطلع error واضح مش crash غامض.`, ext: R`زوّد مواعيد إرجاع وغرامات بالتواريخ، وواجهة DOM فوقه، وبحث بالعنوان والمؤلف.`, sol: R`## الشكل النهائي

~~~text الناتج (node demo.js، Node 24)
[library] كتاب: 111 «مقدمة في JS»
[library] كتاب: 222 «الشبكات ببساطة»
[library] عضو: m1
[library] استعارة: m1 ← 111
اتحفظ: 332 حرف
بعد التحميل: [ '111' ] 222 متاح؟ true
استعارة على النسخة الجديدة: [ '111', '222' ]
AlreadyBorrowedError: الكتاب 111 مستعار دلوقتي
true LibraryError: ملف الحالة بايظ (Unexpected end of JSON input)
~~~

~~~text الناتج (node --test library.test.js، Node 24)
✔ Book و Member بيرفضوا البيانات الناقصة (1.41ms)
✔ استعارة كتاب مستعار بترمي AlreadyBorrowedError والحالة متغيرتش (0.7786ms)
✔ الكتاب الرابع بيرمي LimitError (0.8194ms)
✔ عضو أو كتاب مش موجود، أو رجوع من غير المستعير: NotFoundError (0.2713ms)
✔ كل الـ errors من عيلة LibraryError و Error (0.2216ms)
✔ رحلة حفظ وتحميل كاملة (0.4056ms)
✔ JSON بايظ أو شكله غلط بيطلع LibraryError واضح (0.2464ms)
✔ كل عملية بتتكتب في اللوج (0.1339ms)
ℹ tests 8
ℹ suites 0
ℹ pass 8
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 91.9328
~~~

## شجرة الملفات وترتيب البناء

~~~text الملفات
library/
├── library.js        ← الـ errors و Book و Member و Library، وبيتصدّروا
├── demo.js           ← رحلة كاملة: إضافة واستعارة وحفظ في library.json وتحميل
└── library.test.js   ← الاختبارات بـ node --test
~~~

1. عيلة الـ errors، وبعدين [[Book]] و [[Member]] بالتحقق، واختبار ليهم.
2. [[Library]]: الإضافة، وبعدين [[borrow]] بالتلات أخطاء، وبعدين [[returnBook]]، واختبار مع كل واحدة.
3. [[toJSON]] و [[fromJSON]] واختبار رايح جاي، وبعدين الملف البايظ.
4. [[demo.js]] آخر حاجة.

## الكود

~~~js library.js
class LibraryError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = this.constructor.name;
  }
}
class NotFoundError extends LibraryError {}
class AlreadyBorrowedError extends LibraryError {}
class LimitError extends LibraryError {}

function requireText(value, what) {
  if (typeof value !== "string" || value.trim() === "") throw new TypeError(what + " لازم يبقى نص مش فاضي");
  return value.trim();
}

class Book {
  constructor({ isbn, title, author = "" }) {
    this.isbn = requireText(isbn, "isbn");
    this.title = requireText(title, "title");
    this.author = String(author);
  }
}

class Member {
  constructor({ id, name }) {
    this.id = requireText(id, "id");
    this.name = requireText(name, "name");
  }
}

class Library {
  static LIMIT = 3;
  #books = new Map();      // isbn ← Book
  #members = new Map();    // id ← Member
  #loans = new Map();      // isbn ← memberId
  #log;

  constructor({ log = console.info } = {}) {
    this.#log = log;
  }

  addBook(data) {
    const book = data instanceof Book ? data : new Book(data);
    this.#books.set(book.isbn, book);
    this.#log("[library] كتاب: " + book.isbn + " «" + book.title + "»");
    return book;
  }

  addMember(data) {
    const member = data instanceof Member ? data : new Member(data);
    this.#members.set(member.id, member);
    this.#log("[library] عضو: " + member.id);
    return member;
  }

  #book(isbn) {
    const book = this.#books.get(isbn);
    if (!book) throw new NotFoundError("مفيش كتاب بالـ isbn ده: " + isbn);
    return book;
  }

  #member(id) {
    const member = this.#members.get(id);
    if (!member) throw new NotFoundError("مفيش عضو بالـ id ده: " + id);
    return member;
  }

  loansOf(memberId) {
    return [...this.#loans].filter(([, m]) => m === memberId).map(([isbn]) => isbn);
  }

  isAvailable(isbn) {
    this.#book(isbn);
    return !this.#loans.has(isbn);
  }

  borrow(memberId, isbn) {
    this.#member(memberId);
    this.#book(isbn);
    const holder = this.#loans.get(isbn);
    if (holder !== undefined) throw new AlreadyBorrowedError("الكتاب " + isbn + " مستعار دلوقتي");
    if (this.loansOf(memberId).length >= Library.LIMIT) {
      throw new LimitError(memberId + " معاه " + Library.LIMIT + " كتب، لازم يرجّع واحد الأول");
    }
    this.#loans.set(isbn, memberId);
    this.#log("[library] استعارة: " + memberId + " ← " + isbn);
    return this;
  }

  returnBook(memberId, isbn) {
    this.#book(isbn);
    if (this.#loans.get(isbn) !== memberId) throw new NotFoundError(memberId + " مش مستعير " + isbn);
    this.#loans.delete(isbn);
    this.#log("[library] رجوع: " + memberId + " → " + isbn);
    return this;
  }

  toJSON() {
    return {
      version: 1,
      books: [...this.#books.values()],
      members: [...this.#members.values()],
      loans: [...this.#loans],
    };
  }

  static fromJSON(text, options) {
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new LibraryError("ملف الحالة بايظ (" + e.message + ")", { cause: e });
    }
    if (data?.version !== 1 || ![data.books, data.members, data.loans].every(Array.isArray)) {
      throw new LibraryError("ملف الحالة شكله غلط: مستني version 1 و books و members و loans");
    }
    const lib = new Library(options);
    data.books.forEach((b) => lib.addBook(b));
    data.members.forEach((m) => lib.addMember(m));
    for (const [isbn, memberId] of data.loans) lib.borrow(memberId, isbn);   // من نفس الباب: نفس التحقق
    return lib;
  }
}

module.exports = { Library, Book, Member, LibraryError, NotFoundError, AlreadyBorrowedError, LimitError };
~~~

~~~js demo.js
const fs = require("node:fs");
const { Library, LibraryError } = require("./library.js");

const lib = new Library();
lib.addBook({ isbn: "111", title: "مقدمة في JS", author: "منى" });
lib.addBook({ isbn: "222", title: "الشبكات ببساطة" });
lib.addMember({ id: "m1", name: "Sara" });
lib.borrow("m1", "111");

fs.writeFileSync("library.json", JSON.stringify(lib, null, 2));
console.log("اتحفظ:", fs.readFileSync("library.json", "utf8").length, "حرف");

const loaded = Library.fromJSON(fs.readFileSync("library.json", "utf8"), { log: () => {} });
console.log("بعد التحميل:", loaded.loansOf("m1"), "222 متاح؟", loaded.isAvailable("222"));
loaded.borrow("m1", "222");
console.log("استعارة على النسخة الجديدة:", loaded.loansOf("m1"));

try {
  lib.borrow("m1", "111");
} catch (e) {
  console.log(e.name + ": " + e.message);
}

fs.writeFileSync("broken.json", '{"version": 1, "books": [');
try {
  Library.fromJSON(fs.readFileSync("broken.json", "utf8"));
} catch (e) {
  console.log(e instanceof LibraryError, e.name + ": " + e.message);
}
~~~

~~~js library.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const L = require("./library.js");

function fresh() {
  const logs = [];
  const lib = new L.Library({ log: (msg) => logs.push(msg) });
  ["1", "2", "3", "4"].forEach((n) => lib.addBook({ isbn: n, title: "كتاب " + n }));
  lib.addMember({ id: "sara", name: "Sara" });
  lib.addMember({ id: "ali", name: "Ali" });
  return { lib, logs };
}

test("Book و Member بيرفضوا البيانات الناقصة", () => {
  assert.throws(() => new L.Book({ title: "x" }), { name: "TypeError", message: "isbn لازم يبقى نص مش فاضي" });
  assert.throws(() => new L.Member({ id: "m", name: "  " }), TypeError);
});

test("استعارة كتاب مستعار بترمي AlreadyBorrowedError والحالة متغيرتش", () => {
  const { lib } = fresh();
  lib.borrow("sara", "1");
  assert.throws(() => lib.borrow("ali", "1"), L.AlreadyBorrowedError);
  assert.deepEqual(lib.loansOf("sara"), ["1"]);
  assert.deepEqual(lib.loansOf("ali"), []);
});

test("الكتاب الرابع بيرمي LimitError", () => {
  const { lib } = fresh();
  lib.borrow("sara", "1").borrow("sara", "2").borrow("sara", "3");
  assert.throws(() => lib.borrow("sara", "4"), { name: "LimitError", message: "sara معاه 3 كتب، لازم يرجّع واحد الأول" });
  assert.equal(lib.isAvailable("4"), true);
});

test("عضو أو كتاب مش موجود، أو رجوع من غير المستعير: NotFoundError", () => {
  const { lib } = fresh();
  assert.throws(() => lib.borrow("nobody", "1"), { name: "NotFoundError" });
  assert.throws(() => lib.borrow("sara", "999"), L.NotFoundError);
  lib.borrow("sara", "1");
  assert.throws(() => lib.returnBook("ali", "1"), L.NotFoundError);
  lib.returnBook("sara", "1");
  assert.equal(lib.isAvailable("1"), true);
});

test("كل الـ errors من عيلة LibraryError و Error", () => {
  for (const E of [L.NotFoundError, L.AlreadyBorrowedError, L.LimitError]) {
    const e = new E("x");
    assert.ok(e instanceof L.LibraryError && e instanceof Error);
    assert.equal(e.name, E.name);
  }
});

test("رحلة حفظ وتحميل كاملة", () => {
  const { lib } = fresh();
  lib.borrow("sara", "1").borrow("ali", "2");
  const copy = L.Library.fromJSON(JSON.stringify(lib), { log() {} });
  assert.deepEqual(copy.loansOf("sara"), ["1"]);
  assert.deepEqual(copy.loansOf("ali"), ["2"]);
  copy.borrow("sara", "3");
  assert.throws(() => copy.borrow("ali", "1"), L.AlreadyBorrowedError);
  assert.equal(lib.isAvailable("3"), true);          // الأصل متأثرش
});

test("JSON بايظ أو شكله غلط بيطلع LibraryError واضح", () => {
  assert.throws(() => L.Library.fromJSON("{bad"), (e) => e instanceof L.LibraryError && /بايظ/.test(e.message) && e.cause instanceof SyntaxError);
  assert.throws(() => L.Library.fromJSON('{"version":2}'), /شكله غلط/);
  assert.throws(() => L.Library.fromJSON("null"), L.LibraryError);
});

test("كل عملية بتتكتب في اللوج", () => {
  const { lib, logs } = fresh();
  logs.length = 0;
  lib.borrow("sara", "1");
  lib.returnBook("sara", "1");
  assert.deepEqual(logs, ["[library] استعارة: sara ← 1", "[library] رجوع: sara → 1"]);
});
~~~

## كل حتة مهمة بتعمل إيه

- **عيلة [[LibraryError]]:** الأبناء فاضيين ([[class LimitError extends LibraryError {}]]) لأن الفرق بينهم هو **النوع** بس، وده اللي الكود اللي بيمسك بيسأل عليه بـ [[instanceof]]. و [[this.name = this.constructor.name]] في الأب بيدّي كل واحد اسمه.
- **[[#books]] و [[#members]] و [[#loans]] Maps خاصة:** محدش يقدر يحط استعارة من غير [[borrow]]، فالتحقق مستحيل يتلف حواليه. و [[#loans]] مفتاحها الـ isbn، فكتاب واحد مستعار مع واحد بس بطبيعة الشكل.
- **[[#book(isbn)]] و [[#member(id)]] private methods:** بيدوّروا ويرموا [[NotFoundError]]، فكل method عامة بتبدأ بسطر واحد بدل [[if]] متكرر.
- **ترتيب التحقق في [[borrow]]:** كل الفحوصات قبل [[set]]، فأي error بيسيب الحالة زي ما هي (الاختبار التاني بيثبت ده).
- **[[static LIMIT = 3]]:** الحد على الكلاس، فتقدر تغيّره في مكان واحد، والرسالة بتقراه.
- **[[toJSON]] بيرجّع [[version]] و arrays:** Maps مش بتتحوّل JSON لوحدها ([[JSON.stringify(new Map())]] بـ [[{}]])، فبنحوّلها arrays. والـ version عشان لو الشكل اتغيّر بعدين تعرف الملف القديم.
- **[[fromJSON]] بيبني بـ [[addBook]] و [[borrow]]:** نفس الأبواب الرسمية، فملف متلاعب فيه (كتاب مستعار مرتين، أو ٤ كتب لعضو) بيرمي نفس الـ errors. و [[JSON.parse]] جوه [[try]] بيتلف في [[LibraryError]] مع [[cause]]، فالرسالة مفهومة والسبب الأصلي محفوظ.
- **[[log]] parameter:** [[console.info]] في التشغيل العادي، ودالة بتجمع في الاختبار.

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[JSON.stringify(lib)]] طلّع [[{}]]:** الـ private fields مش بتتحفظ. اتحل بـ [[toJSON]].
- **[[fromJSON]] الأولى كانت بتعمل [[lib.#loans = new Map(data.loans)]]:** شغالة، لكن ملف فيه نفس الكتاب مع عضوين اتحمّل من غير أي اعتراض. البناء بـ [[borrow]] قفل الثغرة دي.
- **[[node demo.js]] كانت بتملا الشاشة بسطور [[[library]]] وقت التحميل:** بعت [[{ log: () => {} }]] للنسخة اللي بتتحمّل في الـ demo.` },
        { lvl: 'فكرة', t: R`موديل لحاجة حقيقية`, what: R`اختار حاجة فيها أنواع ووراثة حقيقية (حسابات بنك بأنواعها، أو موظفين ومديرين، أو وسائل مواصلات، أو عناصر في لعبة)، واعملها classes بـ private fields و validation و errors خاصة بيها. وقبل أي extends اسأل نفسك: ينفع تركيب أحسن؟ انت اللي بتختار.`, done: R`فيه مكان واحد على الأقل اخترت فيه composition بدل الوراثة وكاتب ليه في كومنت، ومفيش field مهم يتعدل من برّه غير من method بتتحقق، وفيه ٥ asserts على الأقل بتعدّي.`, ext: R`اربطه بصفحة، واحفظه JSON، وبعد قسم TypeScript اكتب الـ types بتاعته.`, sol: R`النسخة النموذجية: حسابات بنك. **الوراثة** في مكان واحد بس (حساب التوفير نوع من الحساب)، و **التركيب** في سجل العمليات (الحساب «عنده» سجل، مش «هو» سجل).

~~~js bank.js
class BankError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
class InsufficientFundsError extends BankError {}

// سجل العمليات: كلاس لوحده، والحساب بيستخدمه جواه (composition)
class Ledger {
  #entries = [];
  record(type, amount) {
    this.#entries.push({ type, amount, at: this.#entries.length + 1 });
  }
  get entries() {
    return this.#entries.map((e) => ({ ...e }));      // نسخ: محدش يعدّل السجل من برّه
  }
}

class Account {
  #balance = 0;
  // composition: الحساب «عنده» سجل. لو ورثنا من Ledger كان أي حد هيقدر ينادي record ويزوّر عملية.
  #ledger = new Ledger();

  constructor(owner) {
    if (typeof owner !== "string" || owner.trim() === "") throw new TypeError("owner لازم يبقى نص");
    this.owner = owner;
  }
  static #check(amount) {
    if (!Number.isInteger(amount) || amount <= 0) throw new RangeError("المبلغ لازم يبقى عدد صحيح موجب (بالقروش)");
  }
  deposit(amount) {
    Account.#check(amount);
    this.#balance += amount;
    this.#ledger.record("deposit", amount);
    return this;
  }
  withdraw(amount) {
    Account.#check(amount);
    if (amount > this.#balance) throw new InsufficientFundsError("الرصيد " + this.#balance + " مش كفاية لـ " + amount);
    this.#balance -= amount;
    this.#ledger.record("withdraw", amount);
    return this;
  }
  get balance() {
    return this.#balance;
  }
  get history() {
    return this.#ledger.entries;
  }
}

// inheritance: حساب التوفير «نوع من» الحساب، بكل سلوكه وزيادة الفايدة
class SavingsAccount extends Account {
  #rate;
  constructor(owner, ratePercent) {
    super(owner);
    if (!(ratePercent >= 0 && ratePercent <= 30)) throw new RangeError("الفايدة من 0 لـ 30%");
    this.#rate = ratePercent;
  }
  addInterest() {
    const interest = Math.floor(this.balance * this.#rate / 100);
    if (interest > 0) this.deposit(interest);
    return interest;
  }
}

// الاختبارات
let passed = 0, total = 0;
const check = (cond, msg) => { total++; console.assert(cond, msg); if (cond) passed++; };
const throwsType = (fn, Type) => { try { fn(); return false; } catch (e) { return e instanceof Type; } };

const acc = new Account("Sara").deposit(10000).withdraw(2500);
check(acc.balance === 7500, "الرصيد بعد إيداع وسحب");
check(throwsType(() => acc.withdraw(999999), InsufficientFundsError), "سحب أكبر من الرصيد");
check(acc.balance === 7500, "السحب الفاشل مغيّرش حاجة");
check(throwsType(() => acc.deposit(-5), RangeError) && throwsType(() => acc.deposit(10.5), RangeError), "مبلغ سالب أو كسر");
acc.balance = 1e9;                                    // getter من غير setter: متجاهَل في sloppy
check(acc.balance === 7500, "مفيش تعديل للرصيد من برّه");
acc.history.push({ type: "deposit", amount: 1e9 });
check(acc.history.length === 2, "السجل مبيتعدّلش من برّه");
const sav = new SavingsAccount("Omar", 10).deposit(5000);
check(sav.addInterest() === 500 && sav.balance === 5500, "الفايدة");
check(sav instanceof Account && sav.history.at(-1).type === "deposit", "التوفير نوع من الحساب وبيستخدم نفس السجل");
check(throwsType(() => new SavingsAccount("X", 50), RangeError) && throwsType(() => new Account(""), TypeError), "validation في الـ constructor");
check(new InsufficientFundsError("x").name === "InsufficientFundsError", "اسم الـ error");

console.log(passed + " من " + total + " assert عدّوا");
console.log(acc.history);
try { acc.withdraw(8000); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج (node bank.js، Node 24)
10 من 10 assert عدّوا
[
  { type: 'deposit', amount: 10000, at: 1 },
  { type: 'withdraw', amount: 2500, at: 2 }
]
InsufficientFundsError: الرصيد 7500 مش كفاية لـ 8000
~~~

## ليه اخترت التصميم ده

- **مكان واحد للوراثة:** [[SavingsAccount extends Account]] لأن جملة «حساب التوفير **هو** حساب» صح: كل اللي بيتعمل على الحساب بيتعمل عليه، وبيزوّد [[addInterest]]. والـ [[instanceof Account]] بيعدّي، فأي كود بيتعامل مع حسابات بيقبله.
- **التركيب في السجل (الكومنت جوه الكود بيقول ليه):** [[Account extends Ledger]] كانت هتخلّي [[record]] جزء من الـ API بتاع الحساب، وأي حد يقدر يكتب «إيداع مليون» في السجل من غير فلوس. [[#ledger]] جوه الحساب معناه إن الحساب بس هو اللي بيكتب فيه.
- **كل حاجة مهمة private:** [[#balance]] بيتغيّر من [[deposit]] و [[withdraw]] بس (اللي بيتحققوا)، والـ getter مالوش setter، و [[history]] بيرجّع نسخ. والـ asserts الخامس والسادس بيثبتوا إن التعديل من برّه ملوش أثر.
- **المبالغ بالقروش أعداد صحيحة:** نفس درس مشروع [[Money]]، و [[static #check]] private static method بتتحقق في مكان واحد.
- **[[this.balance]] في [[addInterest]] مش [[this.#balance]]:** الـ private field بتاع الأب مش متاح للابن (كل كلاس شايف الـ [[#]] بتوعه بس)، فالابن بيستخدم الـ getter والـ [[deposit]] الرسميين، وده كمان بيسجّل الفايدة في السجل لوحده.

**إزاي تعرف إن نسختك صح:** عندك مكان فيه composition ومكتوب جنبه ليه، ومفيش field مهم بيتغير غير من method بتتحقق (جرّب تكتب فيه من برّه وتأكد إنه مااتغيرش)، و ٥ asserts على الأقل بتعدّي بـ [[node]]. والسؤال اللي يحسم أي [[extends]]: «الابن **هو** الأب؟» لو الإجابة «لأ، بيستخدمه» يبقى تركيب.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const base = { greet() { return "hi " + this.name; } }; const u = Object.create(base); u.name = "Sara";]] واطبع [[u.greet()]] و [[Object.hasOwn(u, "greet")]] و [["greet" in u]].`, done: R`[["hi Sara"]] ثم [[false]] ثم [[true]]: الـ method مش على u، اتلقت في الـ prototype.`, sol: R`~~~js create-base.js
const base = {
  greet() {
    return "hi " + this.name;
  },
};
const u = Object.create(base);   // object جديد الـ prototype بتاعه base
u.name = "Sara";

console.log(u.greet());
console.log(Object.hasOwn(u, "greet"));
console.log("greet" in u);
console.log(Object.getPrototypeOf(u) === base, Object.keys(u));
~~~

~~~text الناتج (node create-base.js، Node 24)
hi Sara
false
true
true [ 'name' ]
~~~

**ليه كده:**

- **[[Object.create(base)]]** بتعمل object فاضي، والسهم الخفي بتاعه (الـ prototype) بيشاور على base.
- **[[u.greet()]]:** JS دوّرت على [[greet]] في u نفسه، ملقتهاش، فطلعت للـ prototype ولقتها في base. ولما اتنادت، this هي u (اللي قبل النقطة)، فـ [[this.name]] = [["Sara"]].
- **[[Object.hasOwn(u, "greet")]]** بتسأل «المفتاح ده على u نفسه؟»: لأ. و **[["greet" in u]]** بتسأل «موجود في أي حتة في السلسلة؟»: أيوه.
- **[[Object.keys(u)]]** بيرجّع المفاتيح الخاصة بس: [[name]].

**الغلطة الشائعة:** تستخدم [[in]] عشان تعرف إذا المفتاح «بتاع» الـ object. [[in]] بيشوف السلسلة كلها، فـ [["toString" in {}]] بـ [[true]]. للمفاتيح الخاصة [[Object.hasOwn]].` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[chainOf(obj)]] بتلف بـ [[Object.getPrototypeOf]] لحد null، وترجّع أسامي الـ constructors اللي في السلسلة ([[proto.constructor.name]]).`, done: R`[[chainOf([ ])]] بترجّع [[[ 'Array', 'Object' ] ]]، و [[chainOf(new Map())]] بترجّع [[[ 'Map', 'Object' ] ]]، و [[chainOf(Object.create(null))]] بترجّع array فاضية.`, sol: R`~~~js chain-of.js
function chainOf(obj) {
  const names = [];
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    names.push(proto.constructor?.name ?? "(من غير constructor)");
    proto = Object.getPrototypeOf(proto);
  }
  return names;
}

class Animal {}
class Dog extends Animal {}

console.log(chainOf([]));
console.log(chainOf(new Map()));
console.log(chainOf(Object.create(null)));
console.log(chainOf(new Dog()));
console.log(chainOf(Object.create(Object.create(null))));
~~~

~~~text الناتج (node chain-of.js، Node 24)
[ 'Array', 'Object' ]
[ 'Map', 'Object' ]
[]
[ 'Dog', 'Animal', 'Object' ]
[ '(من غير constructor)' ]
~~~

**ليه كده:**

- **[[Object.getPrototypeOf(obj)]]** بترجّع السهم الخفي. بنبدأ من prototype بتاع obj نفسه (مش obj)، ونفضل نطلع لحد ما نوصل [[null]]، وده آخر السلسلة دايمًا.
- **[[proto.constructor.name]]:** كل prototype عادي فيه [[constructor]] بيشاور على الدالة أو الكلاس اللي عملته، و [[.name]] اسمه. فـ Array.prototype بيدّي [["Array"]].
- **[[Object.create(null)]]:** object مالوش prototype خالص، فالـ loop مبيلفش، و array فاضية.
- **[[?.]] و [[??]]:** آخر سطر عامل prototype مالوش [[constructor]] (اتعمل بـ [[Object.create(null)]])، فمن غير [[?.]] كان [[undefined.name]] هيرمي TypeError.

**الغلطة الشائعة:** تبدأ الـ loop بـ [[let proto = obj]] فيطلع اسم obj نفسه في الأول ([[Array]] مرتين لما obj يبقى Array.prototype مثلًا). أو تكتب الشرط [[while (proto)]] وده صح هنا، بس [[!== null]] أوضح في المعنى.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** في Console اكتب [[[]]] وافتح سهم [[Prototype]] مرتين. لاقي ٣ methods على Array.prototype عمرك ما استخدمتها، واقرا صفحة واحدة منهم على MDN وجرّبها. واطبع [[Object.getOwnPropertyNames(Array.prototype).length]].`, done: R`كتبت ٣ أسامي (مثلًا [[with]] و [[copyWithin]] و [[findLast]]) ومثال شغّال لواحدة. والرقم في Node 24 طلع 40 (ممكن يختلف شوية في المتصفح)، والمستوى التاني كان Object.prototype وفيه [[hasOwnProperty]] و [[toString]].`, sol: R`~~~js array-proto.js
const own = Object.getOwnPropertyNames(Array.prototype);
console.log(own.length);
console.log(own.filter((n) => ["with", "copyWithin", "findLast", "toSpliced", "flatMap"].includes(n)));

const next = Object.getPrototypeOf(Array.prototype);
console.log(next === Object.prototype, Object.hasOwn(next, "hasOwnProperty"), Object.hasOwn(next, "toString"));

const scores = [10, 20, 30];
console.log(scores.with(1, 99), scores);              // نسخة، والأصل زي ما هو
console.log([1, 2, 3, 4, 5].copyWithin(0, 3));        // بيعدّل في نفس الـ array
console.log([5, 12, 8, 130, 44].findLast((n) => n > 10));
~~~

~~~text الناتج (node array-proto.js، Node 24)
40
[ 'copyWithin', 'findLast', 'flatMap', 'toSpliced', 'with' ]
true true true
[ 10, 99, 30 ] [ 10, 20, 30 ]
[ 4, 5, 3, 4, 5 ]
44
~~~

ونفس السطر الأول في Console بتاع Chrome 157 (Playwright): [[40]] برضه.

**الإجابة النموذجية:**

- **في Console:** اكتب [[ [] ]] وبعدين افتح السهم اللي مكتوب عليه Prototype وجنبه [[Array(0)]]: ده Array.prototype وفيه كل الـ methods ([[at]] و [[map]] و [[with]]...). والسهم اللي جواه (Prototype وجنبه [[Object]]) بيفتح Object.prototype وفيه [[hasOwnProperty]] و [[toString]] و [[valueOf]]. والسطر التاني في الناتج بيثبت المستوى ده بالكود.
- **٣ methods ممكن متكونش استخدمتها:**
  - [[with(index, value)]]: نسخة جديدة بقيمة متغيرة في مكان، والأصل متلمسش ([[[ 10, 20, 30 ] ]] فضلت زي ما هي).
  - [[copyWithin(target, start)]]: بتنسخ حتة من الـ array فوق حتة تانية **في نفس الـ array**: [[4, 5]] اتنسخوا مكان أول عنصرين.
  - [[findLast(fn)]]: زي [[find]] بس من الآخر: أول عنصر من ورا أكبر من 10 هو 44.
- **[[40]]** في Node 24 و Chrome 157 (نفس الـ V8 تقريبًا). في Firefox أو نسخة قديمة ممكن يطلع رقم تاني، لأن كل نسخة بتضيف methods جديدة (زي [[with]] و [[toSpliced]] في 2023).

**الغلطة الشائعة:** تعد بـ [[Object.keys(Array.prototype)]] فيطلع [[0]]: الـ methods المبنية non-enumerable، و [[keys]] بيرجّع الـ enumerable بس. [[getOwnPropertyNames]] بيرجّع الكل.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** عدّاد كلمات بـ object عادي: [[const c = {}; for (const w of text.split(" ")) c[w] = (c[w] || 0) + 1;]]. جرّبه على [["constructor constructor"]]. وصلّحه بطريقتين: [[Object.create(null)]] و [[Object.hasOwn]].`, done: R`قبل التصليح [[c.constructor]] بتطلع نص غريب فيه [[native code]] و [[11]] بدل [[2]]، لأن [[c["constructor"] ]] لقت [[Object]] في الـ prototype. وبعد أي تصليح [[c.constructor]] بترجّع [[2]].`, sol: R`~~~js word-count.js
const text = "constructor constructor";

// البايظ: object عادي وارث من Object.prototype
const c = {};
for (const w of text.split(" ")) c[w] = (c[w] || 0) + 1;
console.log("قبل:", c.constructor);

// تصليح ١: object من غير prototype
const c1 = Object.create(null);
for (const w of text.split(" ")) c1[w] = (c1[w] || 0) + 1;
console.log("Object.create(null):", c1.constructor);

// تصليح ٢: نسأل عن المفتاح الخاص بس
const c2 = {};
for (const w of text.split(" ")) c2[w] = (Object.hasOwn(c2, w) ? c2[w] : 0) + 1;
console.log("Object.hasOwn:", c2.constructor);

// الحل الأنضف من غير فخاخ: Map
const m = new Map();
for (const w of text.split(" ")) m.set(w, (m.get(w) ?? 0) + 1);
console.log("Map:", m.get("constructor"), m.get("toString"));
~~~

~~~text الناتج (node word-count.js، Node 24)
قبل: function Object() { [native code] }11
Object.create(null): 2
Object.hasOwn: 2
Map: 2 undefined
~~~

**ليه كده:**

- **[[c["constructor"]]] في أول لفة** مش موجود على c، فـ JS طلعت للـ prototype ولقت [[Object.prototype.constructor]] (الدالة [[Object]] نفسها). [[c[w] || 0]] رجّعت الدالة (truthy)، و [[دالة + 1]] بتحوّل الدالة لنص وتلزق [["1"]] جنبها. اللفة التانية لزقت [["1"]] تاني. عشان كده [[function Object() { [native code] }11]].
- **[[Object.create(null)]]:** object مالوش prototype خالص، فـ [[constructor]] مش موجودة وبتبدأ من 0. ده اللي بيتسمى «dictionary object».
- **[[Object.hasOwn(c2, w)]]:** بنعدّ بس لو المفتاح على c2 نفسه، فالموروث بيتجاهل.
- **Map:** مفيهاش مفاتيح موروثة أصلًا، و [[m.get("toString")]] بـ [[undefined]]. ده الأنسب لعدّ كلمات جاية من يوزر.

**الغلطة الشائعة:** تفتكر إن الكلمات «الغريبة» نادرة. أي نص من يوزر ممكن يبقى فيه [[constructor]] أو [[toString]] أو [[__proto__]]، والأخيرة أخطر: [[c["__proto__"] = ...]] بتغيّر الـ prototype نفسه مش بتعمل مفتاح.` },
            { lvl: 'تحدي', t: R`**اشرحها:** لـ [[class Animal {}]] و [[class Dog extends Animal {}]] و [[const d = new Dog()]]: ارسم السلسلة من d لحد null، وأثبت كل سهم بسطر [[Object.getPrototypeOf(...) === ...]].`, done: R`الرسمة: d ← Dog.prototype ← Animal.prototype ← Object.prototype ← null، و ٤ سطور كلهم بيطبعوا [[true]]. وكمان [[Object.getPrototypeOf(Dog) === Animal]] true (الكلاس نفسه وارث للـ static).`, sol: R`~~~text الرسمة
d ──► Dog.prototype ──► Animal.prototype ──► Object.prototype ──► null

Dog ──► Animal ──► Function.prototype     (الكلاسات نفسها: عشان الـ static يتورث)
~~~

~~~js dog-chain.js
class Animal {}
class Dog extends Animal {}
const d = new Dog();

console.log(Object.getPrototypeOf(d) === Dog.prototype);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype) === null);
console.log("Dog ← Animal:", Object.getPrototypeOf(Dog) === Animal);
console.log("Animal ← Function.prototype:", Object.getPrototypeOf(Animal) === Function.prototype);
~~~

~~~text الناتج (node dog-chain.js، Node 24)
true
true
true
true
Dog ← Animal: true
Animal ← Function.prototype: true
~~~

**الإجابة النموذجية:**

- **السلسلة الأولى (الـ instances):** [[new Dog()]] بتعمل d وسهمه على [[Dog.prototype]]. و [[extends Animal]] خلّت [[Dog.prototype]] نفسه سهمه على [[Animal.prototype]]. و Animal كلاس عادي، فـ prototype بتاعه سهمه على [[Object.prototype]]، وده سهمه على [[null]] (آخر السلسلة). الـ ٤ سطور الأولى بيثبتوا كل سهم.
- **السلسلة التانية (الكلاسات):** [[extends]] بتعمل سهم تاني بين الكلاسات نفسها: [[Dog]] سهمه على [[Animal]]. ده اللي بيخلّي [[Dog.create()]] تلاقي [[static create()]] لو كانت معرّفة في Animal.
- **ليه ده مهم:** [[d.toString()]] بتشتغل لأن JS بتلف السلسلة الأولى لحد Object.prototype. و [[d instanceof Animal]] بيسأل «Animal.prototype موجود في سلسلة d؟».

**الغلطة الشائعة:** ترسم d ← Dog ← Animal (الكلاسات نفسها). الـ instance سهمه على [[Dog.prototype]] مش على [[Dog]]: [[Object.getPrototypeOf(d) === Dog]] بـ [[false]].` }
          ],
          ref: [
            { t: "MDN: Inheritance and the prototype chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain" },
            { t: "MDN: Object.create()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create" },
            { t: "MDN: Object.getPrototypeOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf" },
            { t: "MDN: Object.hasOwn()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn" },
          ],
          pre: [{ to: "js/Map و Set", why: R`تمرين عدّ الكلمات بيقارن الـ object العادي بـ Map اللي مفيهاش مفاتيح موروثة`}],
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
          teach: R`## الكود ده بيعمل إيه؟

جزئين: الأول بيثبت إن [[map]] مش موجودة على الـ array نفسها، موجودة «فوقها» في السلسلة. والتاني بيعمل سلسلة بإيدنا: object اسمه [[cat]] بيورث method من object اسمه [[animal]]. اتشغّل في Node 24، وكل سطر طبعناه بـ console.log.

---

## ١. مين الـ prototype بتاع الـ array؟

~~~text app.js
const arr = [1, 2];
Object.getPrototypeOf(arr) === Array.prototype;
~~~

- [[Object.getPrototypeOf(x)]]: دالة جاهزة بترجّع الـ **prototype** بتاع x، يعني الـ object اللي x بيدوّر فيه لما ميلاقيش حاجة عنده.
- [[Array.prototype]]: object واحد في JS كلها، متخزّن فيه map و filter و push وكل methods الـ arrays.
- [[===]]: هل الاتنين **نفس** الـ object بالظبط؟

~~~text الناتج
true
~~~

يعني كل array بتعملها، الـ prototype بتاعها هو نفس الـ [[Array.prototype]].

---

## ٢. وفوقه؟

~~~text app.js
Object.getPrototypeOf(Array.prototype) === Object.prototype;
~~~

~~~text الناتج
true
~~~

و [[Object.prototype]] ده آخر محطة، الـ prototype بتاعه [[null]] (طبعناه: [[Object.getPrototypeOf(Object.prototype)]] طلع [[null]]). فالسلسلة:

~~~text السلسلة
arr  →  Array.prototype  →  Object.prototype  →  null
~~~

---

## ٣. [[Object.hasOwn]] ضد [[in]]

~~~text app.js
Object.hasOwn(arr, "map");
"map" in arr;
~~~

- [[Object.hasOwn(obj, key)]] (من ES2022): الخاصية دي **على الـ object نفسه**؟ من غير ما يدوّر فوق.
- [[key in obj]]: الخاصية دي موجودة **في أي حتة في السلسلة**؟

~~~text الناتج
false
true
~~~

map مش على arr، بس [[in]] لقاها في Array.prototype. وللمقارنة: [[Object.hasOwn(arr, 0)]] و [[Object.hasOwn(arr, "length")]] طلعوا [[true]]: العناصر و length على الـ array نفسها.

---

## ٤. سلسلة بإيدك: [[Object.create]]

~~~text app.js
const animal = { speak() { return $__bt$__{this.name} بيتكلم$__bt; } };
const cat = Object.create(animal);
cat.name = "Mishmish";
~~~

- [[animal]]: object عادي فيه method واحدة. و [[$__bt...$__bt]] نص template، و [[$__{this.name}]] بتتبدل بالاسم.
- [[Object.create(animal)]]: اعمل object **فاضي** والـ prototype بتاعه animal.
- [[cat.name = "Mishmish"]]: خاصية على cat نفسه.

~~~text الناتج: console.log(cat)
{ name: 'Mishmish' }
~~~

لاحظ إن [[speak]] مش ظاهرة: هي مش على cat.

---

## ٥. القراية بتمشي في السلسلة

~~~text app.js
cat.speak();
Object.getPrototypeOf(cat) === animal;
~~~

~~~text الناتج
Mishmish بيتكلم
true
~~~

اللي حصل خطوة خطوة:

1. JS دوّر على [[speak]] في cat: مش موجودة.
2. طلع للـ prototype (animal): لقاها.
3. نادها، و **this = cat** لأن النداء كان [[cat.speak()]] (قاعدة النقطة)، فـ [[this.name]] = Mishmish.

---

## ٦. الكتابة مبتمشيش في السلسلة (shadowing)

~~~text app.js
cat.speak = () => "مياو";
animal.speak.call(cat);
~~~

- [[cat.speak = ...]]: الكتابة **دايمًا** بتحط الخاصية على cat نفسه. فبقى فيه speak على cat «بتغطّي» على اللي فوق. ده اسمه **shadowing**.
- [[animal.speak.call(cat)]]: اللي فوق لسه موجودة زي ما هي، ندهناها بـ this = cat بـ [[call]].

~~~text الناتج
مياو                    ← cat.speak()
Mishmish بيتكلم        ← animal.speak.call(cat)
~~~

و [[Object.keys(cat)]] بقت فيها [['name']] و [['speak']]، و animal ملمستش.

---

## ٧. object من غير prototype

جرّبنا [[Object.create(null)]] (من التجربة):

~~~text app.js
const o = Object.create(null);
o.toString;
"toString" in o;
String(o);
~~~

~~~text الناتج
undefined
false
TypeError: Cannot convert object to primitive value
~~~

مفيش سلسلة خالص، فمفيش toString، و [[String(o)]] مش لاقي طريقة يحوّله لنص. ده مفيد كـ dictionary نضيف من غير مفاتيح موروثة.

---

## الخلاصة

| العملية | بتعمل إيه |
|---|---|
| [[Object.getPrototypeOf(x)]] | هات الحلقة اللي فوق x |
| [[Object.create(p)]] | object جديد فوقه p |
| [[Object.hasOwn(x, k)]] | k على x نفسه؟ |
| [[k in x]] | k في أي حتة في السلسلة؟ |
| قراية [[x.k]] | دوّر في x وبعدين فوق لحد null |
| كتابة [[x.k = v]] | على x نفسه دايمًا (shadowing) |

- كل array و object و دالة جزء من سلسلة كده، والـ class (الدرس الجاي) بتبني نفس السلسلة بشكل أوضح.`,
          lines: [
            R`array عادية. هنستخدمها نشوف منين جات [[map]] و [[filter]] مع إننا عمرنا ما عرّفناهم عليها.`,
            R`كل object ليه لينك مخفي لـ object تاني اسمه الـ prototype. الـ array بتاعتنا الـ prototype بتاعها [[Array.prototype]]، وده المكان اللي فيه [[map]] و [[filter]] و [[push]] متعرّفين **مرة واحدة** لكل الـ arrays.`,
            R`و [[Array.prototype]] نفسه ليه prototype هو [[Object.prototype]] (فيه [[toString]] و [[hasOwnProperty]]). ده آخر حلقة، والـ prototype بتاعه [[null]]: هنا السلسلة بتخلص.`,
            R`[[Object.hasOwn]] بيسأل عن الخصايص اللي على الـ object **نفسه** بس، ورجّع [[false]]: [[arr]] مفيهاش [[map]] فعلًا.`,
            R`[[in]] بيدوّر في السلسلة كلها، فلاقى [[map]] على [[Array.prototype]] ورجّع [[true]]. ده نفس اللي بيحصل لما تكتب [[arr.map]]: JS بيدوّر في الـ object، ولو ملقاش يطلع للـ prototype، وهكذا لحد [[null]].`,
            R`object فيه method [[speak]] بتستخدم [[this.name]]. هنخليه prototype لـ object تاني بدل ما نكرر الـ method.`,
            R`[[Object.create]] بيعمل object فاضي جديد ويخلي الـ prototype بتاعه [[animal]]. فـ [[cat]] نفسه مفيهوش أي خاصية، بس يقدر يستخدم أي حاجة في [[animal]].`,
            R`بيحط [[name]] على [[cat]] نفسه (own property) مش على [[animal]]، فلو عملنا object تاني من نفس الـ [[animal]] مش هيشوف الاسم ده.`,
            R`[[speak]] مش على [[cat]]، فـ JS طلع في السلسلة ولقاها على [[animal]]. بس [[this]] لسه [[cat]] (اللي قبل النقطة)، فـ [[this.name]] بقت [["Mishmish"]].`,
            R`بيأكد إن اللينك المخفي بتاع [[cat]] رايح لـ [[animal]] بالظبط، ورجّع [[true]].`,
            R`الكتابة **عمرها ما بتطلع في السلسلة**: بتعمل [[speak]] جديدة على [[cat]] نفسه. ودلوقتي [[cat.speak()]] بترجّع [["مياو"]] لأن JS بيلاقيها على [[cat]] الأول وميطلعش لفوق (shadowing).`,
            R`النسخة الأصلية لسه على [[animal]] متلمستش، و [[call(cat)]] بتشغّلها بـ [[this]] هو [[cat]] فترجّع [["Mishmish بيتكلم"]]. يعني الـ shadowing خبّى الـ method على [[cat]] بس، ممسحهاش.`,
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
          try: R`ضيف [[withdraw(amount)]] بترمي error لو الرصيد مش كفاية. وبعدين جرّب تكتب [[acc.#balance]] برا الكلاس: هتلاقي SyntaxError قبل ما الملف يشتغل أصلًا. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الكلاس جاهز في المربع: ضيف [[withdraw]]، و getter اسمه [[history]] بيرجّع العمليات اللي نجحت بس بالترتيب، كل واحدة [[{ type: "deposit", amount: 100 }]] (أو [["withdraw"]]). خزّن السجل في field خاص [[#log]]، واللي بره ميقدرش يعدّل السجل حتى لو عمل push في الـ array اللي رجعتله.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** [[class Temperature]] فيها [[#celsius]] من الـ constructor، و getter [[fahrenheit]]، و [[static fromFahrenheit(f)]] بترجّع instance جديدة.`, done: R`[[new Temperature(100).fahrenheit]] بترجّع [[212]]، و [[Temperature.fromFahrenheit(32)]] بترجّع instance الـ fahrenheit بتاعها [[32]]، و [[new Temperature(0).fromFahrenheit]] بترجّع [[undefined]] (الـ static على الكلاس مش الـ instance).`, sol: R`~~~js temperature.js
class Temperature {
  #celsius;
  constructor(celsius) {
    this.#celsius = celsius;
  }
  get fahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }
  get celsius() {
    return this.#celsius;
  }
  static fromFahrenheit(f) {
    return new Temperature((f - 32) * 5 / 9);
  }
}

console.log(new Temperature(100).fahrenheit);
const t = Temperature.fromFahrenheit(32);
console.log(t instanceof Temperature, t.fahrenheit, t.celsius);
console.log(new Temperature(0).fromFahrenheit);
const body = Temperature.fromFahrenheit(100);
console.log(body.celsius, body.celsius.toFixed(1));
~~~

~~~text الناتج (node temperature.js، Node 24)
212
true 32 0
undefined
37.77777777777778 37.8
~~~

**ليه كده:**

- **[[#celsius]]** private field: معرّف في جسم الكلاس، ومحدش يقدر يقراه من برّه غير بالـ getter.
- **[[get fahrenheit()]]:** getter: بتتقري زي خاصية من غير أقواس ([[t.fahrenheit]])، وبتتحسب كل مرة من [[#celsius]]، فمفيش رقمين ممكن يختلفوا.
- **[[static fromFahrenheit(f)]]:** على الكلاس نفسه ([[Temperature.fromFahrenheit]])، وبترجّع [[new Temperature(...)]]. ده اسمه factory method: طريقة تانية تعمل بيها instance.
- **[[new Temperature(0).fromFahrenheit]] بـ [[undefined]]:** الـ static مش في سلسلة الـ instance، هي على الكلاس.
- **آخر سطر:** 100 فهرنهايت = [[37.77777777777778]] سلزيوس. الـ getter بيرجّع الرقم كامل، والتقريب للعرض بس بـ [[toFixed(1)]] (اللي بترجّع نص [["37.8"]]). متخزّنش الرقم المقرّب جوه الكلاس عشان التحويل رايح جاي ميخسرش دقة.

**الغلطة الشائعة:** تكتب [[fahrenheit()]] method وتناديها [[t.fahrenheit]] من غير أقواس، فترجعلك الدالة نفسها. أو العكس: getter وتناديه [[t.fahrenheit()]] فـ [[TypeError: t.fahrenheit is not a function]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[class Cart {}]] وبعدها [[const c = Cart();]]. اقرا الرسالة وصلّح.`, done: R`الرسالة [[TypeError: Class constructor Cart cannot be invoked without 'new']]. بعد [[new Cart()]] بيشتغل. وعرفت إن ده فرق بين الكلاس والـ function العادية اللي كانت هتشتغل غلط من غير ما تقول.`, sol: R`~~~js cart-no-new.js
class Cart {}
try {
  const c = Cart();
} catch (e) {
  console.log(e.name + ": " + e.message);
}
const c = new Cart();
console.log(c instanceof Cart);

function OldCart() { this.items = []; }
const oops = OldCart();                // من غير new، ومن غير error
console.log(oops, typeof globalThis.items);
~~~

~~~text الناتج (node cart-no-new.js، Node 24)
TypeError: Class constructor Cart cannot be invoked without 'new'
true
undefined object
~~~

**ليه كده:**

- **الكلاس لازم يتنده بـ [[new]]:** [[new]] هي اللي بتعمل الـ object الجديد وتديه لـ this. والكلاس بيرفض يتنده من غيرها برسالة واضحة.
- **الـ function القديمة (constructor function) مش بتحمي نفسها:** [[OldCart()]] من غير new اشتغلت كدالة عادية، this بقت الـ global object (ملف [[.js]] sloppy)، فـ [[this.items = []]] عملت متغير global اسمه [[items]]، والدالة رجّعت [[undefined]]. كل ده من غير ولا رسالة.

**الغلطة الشائعة:** تفتكر إن [[class]] مجرد شكل أحلى للـ function. في حاجات زيادة: لازم [[new]]، وجسمه strict mode لوحده، وبيتعمله TDZ زي [[let]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class C { static count = 0; constructor() { C.count++; } }]]، وبعدين [[new C(); new C();]] واطبع [[C.count]] و [[new C().count]] و [[C.count]] تاني.`, done: R`توقعت وطلع 2 و undefined و 3: الـ static على الكلاس نفسه مش على الـ instance، وسطر [[new C().count]] نفسه زوّد العدّاد.`, sol: R`~~~js static-count.js
class C {
  static count = 0;
  constructor() {
    C.count++;
  }
}
new C();
new C();
console.log(C.count);
console.log(new C().count);
console.log(C.count);
~~~

~~~text الناتج (node static-count.js، Node 24)
2
undefined
3
~~~

**ليه كده:**

- **[[static count = 0]]:** خاصية على الكلاس [[C]] نفسه، مش على كل instance. والـ constructor بيزوّدها بـ [[C.count++]].
- **أول سطر:** اتعمل instanceين، فـ 2.
- **[[new C().count]]:** ده **عمل instance تالت** (العدّاد بقى 3)، وبعدين قرا [[count]] من الـ instance، والـ instance مفيهوش [[count]] ولا في سلسلته (الـ static مش على [[C.prototype]])، فـ [[undefined]].
- **التالت:** 3 بسبب السطر اللي فات.

**الغلطة الشائعة:** تكتب [[this.count++]] في الـ constructor. this هنا الـ instance الجديد، فبيعمل [[count]] عليه بـ [[NaN]] والعدّاد بتاع الكلاس مبيتحركش. للـ static اكتب اسم الكلاس ([[C.count]]) أو [[this.constructor.count]] لو عايزه يشتغل مع الوراثة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class Cart]] فيها [[#items]] (Map)، و [[add(name, price, qty = 1)]] بترمي [[TypeError]] لو السعر مش رقم و [[RangeError]] لو الكمية صفر أو سالبة، و [[remove(name)]]، و getters [[total]] و [[count]].`, done: R`بعد [[add("mug", 120, 2)]] و [[add("cap", 90)]]: [[total]] بترجّع [[330]] و [[count]] بترجّع [[3]]، و [[add("x", "10")]] بترمي TypeError والسلة متغيرتش، و [[cart.#items]] برّه الكلاس SyntaxError.`, sol: R`~~~js cart-class.js
class Cart {
  #items = new Map();                       // name ← { price, qty }

  add(name, price, qty = 1) {
    if (typeof price !== "number" || !Number.isFinite(price)) {
      throw new TypeError("السعر لازم يبقى رقم: " + JSON.stringify(price));
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError("الكمية لازم تبقى عدد صحيح أكبر من صفر");
    }
    const old = this.#items.get(name);
    this.#items.set(name, { price, qty: (old?.qty ?? 0) + qty });
    return this;
  }
  remove(name) {
    return this.#items.delete(name);
  }
  get total() {
    let sum = 0;
    for (const { price, qty } of this.#items.values()) sum += price * qty;
    return sum;
  }
  get count() {
    let n = 0;
    for (const { qty } of this.#items.values()) n += qty;
    return n;
  }
}

const cart = new Cart();
cart.add("mug", 120, 2).add("cap", 90);
console.log(cart.total, cart.count);

for (const bad of [() => cart.add("x", "10"), () => cart.add("y", 5, 0), () => cart.add("z", 5, -1)]) {
  try { bad(); } catch (e) { console.log(e.name + ": " + e.message); }
}
console.log("بعد المحاولات:", cart.total, cart.count);
console.log(cart.remove("cap"), cart.remove("cap"), cart.total);

try {
  eval("cart.#items");
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~text الناتج (node cart-class.js، Node 24)
330 3
TypeError: السعر لازم يبقى رقم: "10"
RangeError: الكمية لازم تبقى عدد صحيح أكبر من صفر
RangeError: الكمية لازم تبقى عدد صحيح أكبر من صفر
بعد المحاولات: 330 3
true false 240
SyntaxError: Private field '#items' must be declared in an enclosing class
~~~

**ليه كده:**

- **[[#items = new Map()]]:** private field بيتعمل لكل instance. Map عشان المفتاح اسم المنتج والقيمة [[{ price, qty }]].
- **التحقق قبل أي تعديل:** الـ [[throw]] بيحصل قبل سطر [[set]]، فالمحاولات البايظة مغيّرتش السلة (330 و 3 زي ما هما). [[TypeError]] للنوع الغلط و [[RangeError]] للرقم اللي برّه المدى المسموح.
- **[[Number.isFinite(price)]]:** بيرفض [[NaN]] و [[Infinity]] كمان، مش بس النصوص. و [[Number.isInteger(qty)]] بيرفض [[1.5]].
- **[[get total]] و [[get count]]:** بيتحسبوا من الـ Map كل مرة، فمستحيل يبقوا غلط بعد [[remove]].
- **[[cart.#items]] برّه الكلاس:** ده SyntaxError وقت **قراية** الكود، يعني لو كتبته في الملف نفسه الملف كله مش هيشتغل. عشان أوريك الرسالة من غير ما أوقف الملف حطيته في [[eval]].

**الغلطة الشائعة:** تتحقق بـ [[if (!price)]]: بيرفض منتج سعره 0 (هدية)، وبيقبل [["10"]] لأنه نص truthy. اسأل عن النوع صريح.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[JSON.stringify(acc)]] على الـ BankAccount بتاعة الدرس. وبعدين زوّد [[toJSON()]] بترجّع [[{ owner, balance }]] و [[static fromJSON(text)]] بترجّع instance حقيقية بنفس الرصيد (من غير ما تكسر الـ private field).`, done: R`من غير toJSON بيطلع [['{"owner":"Sara"}']] بس (الـ private fields مش بتتحفظ). وبعدها [[BankAccount.fromJSON(JSON.stringify(acc))]] بترجّع object [[instanceof BankAccount]] بـ [[true]]، والرصيد نفسه، و [[deposit]] شغالة عليه.`, sol: R`~~~js bank-json.js
class BankAccount {
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
  toJSON() {
    return { owner: this.owner, balance: this.#balance };
  }
  static fromJSON(text) {
    const data = JSON.parse(text);
    if (typeof data?.owner !== "string" || !Number.isFinite(data.balance) || data.balance < 0) {
      throw new TypeError("بيانات الحساب مش سليمة");
    }
    const acc = new BankAccount(data.owner);
    if (data.balance > 0) acc.deposit(data.balance);   // من الباب الرسمي، مش من برّه
    return acc;
  }
}

const acc = new BankAccount("Sara").deposit(100).deposit(50);
const json = JSON.stringify(acc);
console.log(json);

const copy = BankAccount.fromJSON(json);
console.log(copy instanceof BankAccount, copy.balance, copy.deposit(25).balance, acc.balance);
console.log(BankAccount.fromJSON('{"owner":"Ali","balance":0}').balance);

for (const bad of ['{"owner":"X","balance":-5}', '{"balance":10}', "{bad"]) {
  try { BankAccount.fromJSON(bad); } catch (e) { console.log(e.name + ": " + e.message); }
}
~~~

ومن غير [[toJSON]] (نفس الكلاس من غير الـ method دي):

~~~js bank-json-before.js
class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) { this.#balance += amount; return this; }
}
console.log(JSON.stringify(new BankAccount("Sara").deposit(150)));
~~~

~~~text الناتج (node bank-json-before.js ثم node bank-json.js، Node 24)
{"owner":"Sara"}
---
{"owner":"Sara","balance":150}
true 150 175 150
0
TypeError: بيانات الحساب مش سليمة
TypeError: بيانات الحساب مش سليمة
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

**ليه كده:**

- **من غير toJSON:** [[JSON.stringify]] بيحفظ الخصائص العادية الـ enumerable بس، والـ private fields مش خصائص أصلًا. فالرصيد ضاع.
- **[[toJSON()]]:** لو الـ object فيه method بالاسم ده، [[JSON.stringify]] بيناديها وبيحفظ اللي رجعته بدل الـ object. فبنقرّر احنا إيه اللي يتحفظ.
- **[[static fromJSON(text)]]:** بتعمل instance حقيقية بـ [[new]] (فـ [[instanceof]] true والـ methods شغالة)، وبتحط الرصيد **بـ [[deposit]]** اللي بتتحقق، مش بكتابة على الـ field. وبتتحقق من الشكل الأول، فـ رصيد سالب أو owner ناقص بيرمي TypeError واضح، و JSON بايظ بيطلع [[SyntaxError]] من [[JSON.parse]] نفسها.
- **[[if (data.balance > 0)]]:** لأن [[deposit(0)]] بترمي RangeError، والحساب الفاضي لازم يرجع عادي.
- **[[copy.deposit(25)]] مغيّرش [[acc]]:** دول instanceين مستقلين.

**الغلطة الشائعة:** [[Object.assign(new BankAccount(), data)]] بدل fromJSON. [[balance]] getter على الـ prototype ومالوش setter، و [[Object.assign]] بيكتب بالتعيين العادي، فبيرمي [[TypeError: Cannot set property balance of #<BankAccount> which has only a getter]] (اتجرّبت). والـ private field مستحيل يتكتب من برّه أصلًا، عشان كده الطريق الوحيد method جوه الكلاس زي [[deposit]].` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[class Queue]] لطابور البنك بـ [[#items]]: [[enqueue(name)]] و [[dequeue()]] و [[peek()]] و getter [[size]]. دخّل Ali و Mona و Omar، وخدّم اتنين.`, done: R`[[dequeue()]] مرتين بترجّع Ali ثم Mona، و [[size]] بقى 1، و [[peek()]] بترجّع Omar. و [[dequeue()]] على طابور فاضي بترجّع undefined من غير error.`, sol: R`~~~js bank-queue.js
class Queue {
  #items = [];
  enqueue(name) {
    this.#items.push(name);
    return this;
  }
  dequeue() {
    return this.#items.shift();          // undefined لو فاضي
  }
  peek() {
    return this.#items[0];
  }
  get size() {
    return this.#items.length;
  }
}

const q = new Queue();
q.enqueue("Ali").enqueue("Mona").enqueue("Omar");
console.log(q.dequeue(), q.dequeue());
console.log(q.size, q.peek());
console.log(q.dequeue(), q.dequeue(), q.size);
~~~

~~~text الناتج (node bank-queue.js، Node 24)
Ali Mona
1 Omar
Omar undefined 0
~~~

**ليه كده:**

- **طابور = اللي دخل الأول يخرج الأول (FIFO):** [[push]] بتحط في الآخر، و [[shift]] بتشيل من الأول. فـ Ali ثم Mona.
- **[[peek()]]:** بيبص على أول واحد من غير ما يشيله.
- **[[shift()]] على array فاضية** بترجّع [[undefined]] من غير error، فمش محتاج [[if]].
- **[[#items]] private:** محدش يقدر يعمل [[q.items.unshift("واسطة")]] ويدخل قبل الدور.

**الغلطة الشائعة:** [[pop()]] بدل [[shift()]]: ده stack (اللي دخل آخر يخرج الأول)، فـ Omar هيتخدم الأول. وللمعلومة: [[shift]] على array فيها مليون عنصر بطيئة لأنها بتزحزح الكل، فالطوابير الضخمة بتتعمل بـ index للبداية بدل shift.` }
          ],
          ref: [
            { t: "MDN: Classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" },
            { t: "MDN: Using classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes" },
            { t: "MDN: Private elements", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements" },
            { t: "MDN: static", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static" },
            { t: "MDN: getter", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get" },
            { t: "MDN: constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor" },
          ],
          pre: [{ to: "js/prototype chain", why: R`الكلاس بيبني نفس السلسلة: الـ methods على [[Class.prototype]]`}, { to: "js/JSON", why: R`تمرين [[toJSON]] و [[fromJSON]] بيحفظ instance ويرجّعها`}],
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
          teach: R`## الكود ده بيعمل إيه؟

بيعرّف «قالب» لحساب بنكي: كل حساب ليه صاحب ورصيد، والرصيد **private** محدش يقدر يلعب فيه من برّه، وتزوّده بـ [[deposit]] بس. وفي الآخر بيجرّب الحاجات اللي الكلاس بيوفّرها. اتشغّل في Node 24 كملف [[.cjs]] وكملف [[.mjs]].

---

## ١. [[class]] والـ static

~~~text app.js
class BankAccount {
  static count = 0;
~~~

- [[class BankAccount { ... }]]: بيعرّف كلاس اسمه BankAccount. العُرف إن اسم الكلاس يبدأ بحرف كبير.
- [[static count = 0;]]: خاصية على **الكلاس نفسه** مش على كل حساب. فيه [[BankAccount.count]] واحدة بس مشتركة. بنستخدمها نعدّ الحسابات اللي اتعملت.

---

## ٢. الـ private field

~~~text app.js
  #balance = 0;
~~~

- [[#balance]]: الـ [[#]] جزء من الاسم، ومعناها **private**: الخاصية دي موجودة على كل حساب، بس مفيش أي كود يقدر يقراها أو يكتبها **غير الكود اللي جوه الكلاس**.
- [[= 0]]: كل حساب جديد بيبدأ رصيده 0. ده اسمه **field**: بيتحط على كل instance لوحده وقت ما يتعمل.

---

## ٣. الـ constructor

~~~text app.js
  constructor(owner) {
    this.owner = owner;
    BankAccount.count++;
  }
~~~

- [[constructor]]: دالة خاصة بتتنادي **لوحدها** مع [[new]]. الـ arguments اللي بتبعتها لـ new بتوصل هنا.
- [[this.owner = owner]]: [[this]] هنا = الحساب الجديد (قاعدة new). فبنحط عليه خاصية **عامة** اسمها owner.
- [[BankAccount.count++]]: زوّد العداد اللي على الكلاس.

---

## ٤. method بتعدّل الرصيد

~~~text app.js
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
~~~

- [[deposit(amount)]]: method. كل methods الكلاس بتتحط **مرة واحدة** على [[BankAccount.prototype]]، وكل الحسابات بتشوفها من السلسلة (درس prototype chain).
- [[if (amount <= 0) throw ...]]: افحص الـ input الأول. [[throw new RangeError(...)]] بيوقف الدالة ويرمي error من نوع RangeError (قيمة برّه المدى المسموح).
- [[this.#balance += amount]]: زوّد الرصيد. ده مسموح لأننا **جوه** الكلاس.
- [[return this]]: رجّع الحساب نفسه. ده اللي بيخلّي [[acc.deposit(100).deposit(50)]] تشتغل: أول deposit بترجّع acc، فالتانية بتتنادي عليه. ده اسمه **chaining**.

---

## ٥. getter

~~~text app.js
  get balance() {
    return this.#balance;
  }
}
~~~

- [[get balance()]]: **getter**: دالة بتتقري كأنها خاصية عادية. تكتب [[acc.balance]] **من غير أقواس**، وهي بتشتغل وترجّع الرصيد.
- مفيش [[set balance()]]، يعني الرصيد **للقراية بس** من برّه.

---

## ٦. الاستخدام

~~~text app.js
const acc = new BankAccount("Sara");
acc.deposit(100).deposit(50);
acc.balance;
~~~

~~~text الناتج
BankAccount { owner: 'Sara' }      ← console.log(acc)
true                               ← acc.deposit(100) === acc
150                                ← acc.balance
~~~

لاحظ إن [[console.log(acc)]] في Node مبيعرضش [[#balance]] خالص. ولا [[Object.keys(acc)]] (طلعت [['owner']] بس) ولا [[JSON.stringify(acc)]] (طلعت [[{"owner":"Sara"}]]).

---

## ٧. تحاول تكتب الرصيد من برّه

~~~text app.js
acc.balance = 1e6;
~~~

[[1e6]] يعني 1 × 10 أس 6 = مليون. النتيجة بتفرق حسب الملف:

| الملف | اللي حصل |
|---|---|
| [[.cjs]] (من غير "use strict") | الكتابة اتجاهلت في صمت، و [[acc.balance]] فضلت [[150]] |
| [[.mjs]] (strict لوحده) | [[TypeError: Cannot set property balance of #<BankAccount> which has only a getter]] |

ولو حاولت توصل للـ private نفسه من برّه الكلاس:

~~~text app.js
console.log(acc.#balance);
~~~

~~~text الناتج
SyntaxError: Private field '#balance' must be declared in an enclosing class
~~~

ده **SyntaxError**: الملف كله مش بيشتغل، حتى السطور اللي قبل الغلطة، لأن JS بيلاقيها وهو بيقرا الكود قبل ما ينفّذه.

---

## ٨. الكلاس من جوه

~~~text app.js
BankAccount.count;
typeof BankAccount;
~~~

~~~text الناتج
1
function
~~~

- [[BankAccount.count]] = 1 (حساب واحد اتعمل). و [[acc.count]] طلعت [[undefined]]: الـ static على الكلاس مش على الـ instance.
- [[typeof BankAccount]] = [["function"]]: الكلاس في الآخر constructor function. وطبعنا [[Object.getOwnPropertyNames(BankAccount.prototype)]]:

~~~text الناتج
[ 'constructor', 'deposit', 'balance' ]
~~~

يعني deposit والـ getter على الـ prototype، و [[Object.hasOwn(acc, "deposit")]] طلعت [[false]].

ومن الفروق عن الـ function العادية: مينفعش تنادي الكلاس من غير new:

~~~text الناتج: BankAccount("x")
TypeError: Class constructor BankAccount cannot be invoked without 'new'
~~~

---

## ٩. setter: الكتابة بتعدّي على فحص

الـ getter بيخلي القراية تبان خاصية. والـ **setter** هو الجزء التاني: [[obj.price = 50]] شكلها كتابة عادية، بس بتنادي دالة بتفحص الأول.

~~~js setter.mjs
class Product {
  #price = 0;
  constructor(name, price) {
    this.name = name;
    this.price = price;            // بيعدّي على الـ setter كمان
  }
  get price() { return this.#price; }
  set price(value) {
    if (!Number.isFinite(value) || value < 0) throw new RangeError($__btسعر غلط: $__{value}$__bt);
    this.#price = Math.round(value * 100) / 100;
  }
}
const p = new Product('mug', 120);
p.price = 99.999;
console.log(p.price);
try { p.price = -5; } catch (e) { console.log(e.name + ':', e.message); }
try { new Product('cap', '90'); } catch (e) { console.log(e.name + ':', e.message); }
console.log(Object.keys(p), JSON.stringify(p));
~~~

~~~text الناتج · Node 24.22.1
100
RangeError: سعر غلط: -5
RangeError: سعر غلط: 90
[ 'name' ] {"name":"mug"}
~~~

- [[set price(value)]]: دالة بتاخد parameter واحد بالظبط، القيمة اللي على يمين الـ [[=]].
- الـ constructor نفسه بيكتب [[this.price = price]]، فالفحص بيحصل **من أول لحظة**. لو كتب في [[this.#price]] مباشرة، [[new Product('cap', -5)]] كانت هتعدّي.
- [['90']] اترفضت لأن [[Number.isFinite('90')]] بـ [[false]] (مبتحوّلش نصوص، عكس [[isFinite]] القديمة).
- [[99.999]] اتقرّبت لـ [[100]]: الـ setter مش بس بيفحص، ممكن **ينضّف** كمان.
- [[Object.keys]] و [[JSON.stringify]] مبيشوفوش [[price]]، لأن الـ getter والـ setter متعرّفين على [[Product.prototype]] مش على الـ object. فـ [[Object.hasOwn(p, 'price')]] بـ [[false]] و [['price' in p]] بـ [[true]]. ولو محتاجها في الـ JSON، [[toJSON()]] (التحدي اللي تحت).

### الفخ الكلاسيكي: setter بيكتب في نفسه

~~~js
class Bad { set price(v) { this.price = v; } }
new Bad().price = 1;
~~~

~~~text الناتج
RangeError: Maximum call stack size exceeded
~~~

[[this.price = v]] جوه الـ setter بتنادي الـ setter تاني، وهكذا للأبد (recursion من غير base case، درس «function و arrow»). عشان كده القيمة نفسها بتتخزن في اسم تاني: [[#price]] أو [[_price]].

### ونفس الكلام في object عادي

~~~js
const temp = { c: 0, get f() { return this.c * 9 / 5 + 32; }, set f(v) { this.c = (v - 32) * 5 / 9; } };
temp.f = 212;
console.log(temp.c, temp.f);   // 100 212
~~~

| الشكل | امتى |
|---|---|
| خاصية عادية | مفيش قاعدة، أي قيمة مقبولة |
| [[get]] لوحده | قيمة محسوبة أو للقراية بس |
| [[get]] و [[set]] | الكتابة لازم تتفحص أو تتحوّل (سعر، درجة حرارة، إيميل) |
| method زي [[setPrice(v)]] | لو العملية تقيلة أو ممكن تفشل كتير، عشان اللي بيقرا الكود يعرف إنها مش مجرد كتابة |

---

## الخلاصة

| الحتة | مكانها | مين يوصلها |
|---|---|---|
| [[static count]] | الكلاس نفسه | [[BankAccount.count]] |
| [[#balance]] | كل instance | كود الكلاس بس |
| [[this.owner]] | كل instance | أي حد |
| [[deposit]] و [[get balance]] | [[BankAccount.prototype]] | كل الـ instances بالسلسلة |

- [[return this]] في آخر method = chaining.
- getter من غير setter = خاصية للقراية بس.
- في التمرين تحت هتضيف [[withdraw]] وسجل للعمليات: بص على deposit كويس، وفكّر إيه الحالات الغلط اللي لازم ترفضها، وإيه اللي لازم ترجّعه عشان الـ chaining يفضل شغال، وفين تخزّن السجل بحيث محدش من بره يقدر يعدّله.
- setter بيفحص وينضّف قبل ما يكتب، والقيمة نفسها في [[#field]] تاني، وإلا recursion للأبد.`,
          lines: [
            R`بيعرّف كلاس: قالب نعمل منه حسابات بـ [[new BankAccount(...)]]. كل حساب object ليه رصيده، والـ methods متشاركة بينهم.`,
            R`[[static]] معناها الخاصية دي على الكلاس **نفسه** مش على كل حساب. فيه [[count]] واحد بس للكل ([[BankAccount.count]])، ومش هتلاقيه في [[acc.count]].`,
            R`private field: كل حساب بيبدأ برصيد 0، والـ [[#]] بتمنع أي كود برّه الكلاس يقرا أو يكتب الرصيد (حتى المحاولة نفسها SyntaxError). فالطريقة الوحيدة لتغييره هي [[deposit]].`,
            R`الدالة اللي بتتنادى أوتوماتيك مع [[new]]، والـ arguments اللي في [[new BankAccount("Sara")]] بتوصلها. هنا بنجهّز الحساب الجديد.`,
            R`بتحط اسم صاحب الحساب كخاصية عادية (public) على الـ instance الجديد، فأي حد يقدر يقرا [[acc.owner]].`,
            R`كل مرة حساب يتعمل نزوّد العداد المشترك اللي على الكلاس. استخدمنا اسم الكلاس مش [[this]]، لأن [[this]] هنا الحساب الجديد مش الكلاس.`,
            R`نهاية الـ [[constructor]].`,
            R`method: بتتحط على [[BankAccount.prototype]] مرة واحدة، وكل الحسابات بتستخدم نفس الدالة عن طريق الـ prototype chain بدل ما كل حساب ياخد نسخة.`,
            R`بنرفض أي مبلغ صفر أو سالب فورًا بـ error واضح. من غير الفحص ده [[deposit(-100)]] كانت هتسحب فلوس من غير ما حد يلاحظ. و [[RangeError]] نوع error مناسب لقيمة برّه المدى المسموح.`,
            R`بنزوّد الرصيد الخاص. ده مسموح لأن السطر جوه الكلاس.`,
            R`بترجّع الحساب نفسه، فتقدر تكمّل نداء تاني على طول ([[acc.deposit(100).deposit(50)]]). من غيرها [[deposit]] هترجّع [[undefined]] والنداء التاني هيرمي TypeError.`,
            R`نهاية [[deposit]].`,
            R`getter: دالة بتتقري كإنها خاصية، فتكتب [[acc.balance]] من غير [[()]]. ولأن مفيش [[set balance]]، الرصيد يتقري بس ومحدش يغيّره من برّه.`,
            R`بترجّع قيمة الـ private field. كده الرصيد ظاهر للقراية بس، والتعديل الوحيد عن طريق [[deposit]] اللي بتفحص المبلغ.`,
            R`نهاية الـ getter.`,
            R`نهاية الكلاس [[BankAccount]].`,
            R`[[new]] بيعمل object جديد، وينادي الـ [[constructor]] بـ [["Sara"]]، ويرجّع الحساب. دلوقتي [[owner]] بقى [["Sara"]]، والرصيد 0، و [[BankAccount.count]] بقى 1.`,
            R`chaining: أول [[deposit]] رجّعت [[acc]] نفسه، فاتنادت التانية عليه. الرصيد بقى 150.`,
            R`الـ getter اشتغل من غير [[()]] ورجّع [[150]].`,
            R`محاولة تغيير الرصيد لمليون. ولأن [[balance]] getter من غير setter، الكتابة بتتجاهل بالسكوت في الكود العادي، وفي strict mode (وجوه الـ modules) بترمي TypeError. والرصيد يفضل 150.`,
            R`بنقرا الـ [[static]] من الكلاس نفسه: [[1]] لأننا عملنا حساب واحد. أما [[acc.count]] كانت هترجّع [[undefined]].`,
            R`بيرجّع [["function"]]: الكلاس في الآخر constructor function بشكل أنضف، والـ methods بتتحط على الـ prototype زي ما شفنا في درس الـ prototype chain.`,
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
try { acc.withdraw(500); } catch (e) { console.log(e.message); }`,
          check: {
            lang: "js",
            starter: R`class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  withdraw(amount) {
    // موجب، ومش أكبر من الرصيد، و return this
  }
  get balance() { return this.#balance; }
  get history() {
    return [];
  }
}`,
            tests: R`test("deposit(100).deposit(50).withdraw(30) ← balance 120", () => expect(new BankAccount("Sara").deposit(100).deposit(50).withdraw(30).balance).toBe(120));
test("withdraw أكبر من الرصيد بترمي error، والرصيد ميتغيّرش", () => {
  const acc = new BankAccount("Ali").deposit(100);
  expect(() => acc.withdraw(500)).toThrow();
  expect(() => acc.withdraw(0)).toThrow();
  expect(acc.balance).toBe(100);
});
test("history: العمليات اللي نجحت بس، بالترتيب", () => {
  const acc = new BankAccount("Sara").deposit(100).withdraw(30);
  try { acc.withdraw(500); } catch {}
  try { acc.deposit(-1); } catch {}
  acc.deposit(5);
  expect(acc.history).toEqual([{ type: "deposit", amount: 100 }, { type: "withdraw", amount: 30 }, { type: "deposit", amount: 5 }]);
});
test("اللي بره ميقدرش يعدّل السجل", () => {
  const acc = new BankAccount("Mona").deposit(10);
  acc.history.push({ type: "deposit", amount: 1e6 });
  acc.history.length = 0;
  expect(acc.history).toEqual([{ type: "deposit", amount: 10 }]);
});
test("كل حساب ليه سجله", () => {
  const a = new BankAccount("A").deposit(1), b = new BankAccount("B");
  expect([a.history.length, b.history.length]).toEqual([1, 0]);
});
test("withdraw بترجّع this عشان الـ chaining", () => {
  const acc = new BankAccount("Omar").deposit(50);
  expect(acc.withdraw(10) === acc).toBe(true);
});`,
            solution: R`class BankAccount {
  #balance = 0;
  #log = [];
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    this.#log.push({ type: "deposit", amount });
    return this;
  }
  withdraw(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    if (amount > this.#balance) throw new Error($__btالرصيد مش كفاية: معاك $__{this.#balance} وعايز تسحب $__{amount}$__bt);
    this.#balance -= amount;
    this.#log.push({ type: "withdraw", amount });
    return this;
  }
  get balance() { return this.#balance; }
  get history() { return this.#log.map(e => ({ ...e })); }
}`
          }
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
          practice: [
            { lvl: 'سريع', t: R`**ابني:** [[class Shape]] فيها [[area()]] بترجّع 0 و [[describe()]] بترجّع [[this.constructor.name]] والمساحة. ورّث منها [[Circle]] و [[Rect]] وغيّر [[area]] في كل واحد.`, done: R`[[new Circle(1).describe()]] بترجّع [["Circle: 3.14"]] (لو قرّبت بـ [[Number(area.toFixed(2))]])، و [[new Rect(2, 3).describe()]] بترجّع [["Rect: 6"]]، و [[describe]] نفسها مكتوبة مرة واحدة في Shape.`, sol: R`~~~js shapes.js
class Shape {
  area() {
    return 0;
  }
  describe() {
    return this.constructor.name + ": " + Number(this.area().toFixed(2));
  }
}
class Circle extends Shape {
  constructor(r) {
    super();
    this.r = r;
  }
  area() {
    return Math.PI * this.r ** 2;
  }
}
class Rect extends Shape {
  constructor(w, h) {
    super();
    this.w = w;
    this.h = h;
  }
  area() {
    return this.w * this.h;
  }
}

console.log(new Circle(1).describe());
console.log(new Rect(2, 3).describe());
console.log(new Shape().describe());
console.log(Object.hasOwn(Circle.prototype, "describe"), "describe" in new Circle(1));
~~~

~~~text الناتج (node shapes.js، Node 24)
Circle: 3.14
Rect: 6
Shape: 0
false true
~~~

**ليه كده:**

- **[[describe]] مكتوبة مرة واحدة في Shape،** و Circle و Rect بيلاقوها في السلسلة (آخر سطر: مش على Circle.prototype، بس موجودة).
- **[[this.area()]] جوه describe:** this هي الـ instance الحقيقي (Circle مثلًا)، فـ JS بتدوّر على [[area]] من أول سلسلته وتلاقي نسخة Circle الأول. ده اسمه polymorphism: نفس السطر بيشغّل كود مختلف حسب النوع.
- **[[this.constructor.name]]:** الـ constructor بتاع الـ instance هو الكلاس اللي اتعمل بيه، فـ [["Circle"]] مش [["Shape"]].
- **[[Number(x.toFixed(2))]]:** [[toFixed]] بترجّع نص [["3.14"]] و [["6.00"]]، و [[Number]] بيشيل الأصفار الزيادة: 6 مش 6.00.
- **[[super()]] في كل constructor:** لازم قبل [[this.r = r]] (التمرين اللي جاي).

**الغلطة الشائعة:** تكتب [[describe]] في كل كلاس ابن، أو تكتب [[if (this instanceof Circle)]] جوه Shape. الكلاس الأب ميعرفش ولاده: كل ابن بيغيّر [[area]] بس.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[class Child extends Parent { constructor(n) { this.x = 1; super(n); } }]]. اعمل [[new Child(1)]] واقرا الرسالة.`, done: R`الرسالة [[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]. بعد ما تخلي [[super(n)]] أول سطر بيشتغل، و [[this.x]] بـ 1.`, sol: R`~~~js super-order.js
class Parent {
  constructor(n) {
    this.n = n;
  }
}
class Broken extends Parent {
  constructor(n) {
    this.x = 1;          // قبل super
    super(n);
  }
}
class Child extends Parent {
  constructor(n) {
    super(n);            // الأول
    this.x = 1;
  }
}

try {
  new Broken(1);
} catch (e) {
  console.log(e.name + ": " + e.message);
}
const c = new Child(1);
console.log(c.x, c.n);
~~~

~~~text الناتج (node super-order.js، Node 24)
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
1 1
~~~

**ليه كده:**

- **في كلاس وارث ([[extends]])، الـ object نفسه بيتعمل في constructor الأب،** و [[super(n)]] هي اللي بتناديه. قبلها this لسه مش موجودة، فأي [[this.x]] بيرمي ReferenceError (نفس فكرة الـ TDZ).
- **بعد [[super(n)]]:** الأب حط [[n]]، وبعدين الابن حط [[x]].

**الغلطة الشائعة:** تنسى [[super()]] خالص في constructor الابن. الرسالة ساعتها نفسها (أول ما تلمس this أو الـ constructor يخلص). ولو الابن مالوش constructor أصلًا، JS بتعمله واحد لوحده بينادي [[super(...args)]]، فمش لازم تكتبه لو مش هتزوّد حاجة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class ValidationError extends Error]] بتاخد [[(message, field)]]، وبتنادي [[super(message)]]، وبتحط [[this.name]] و [[this.field]]. ارميها من [[validateUser(user)]] لو الإيميل مفيهوش [[@]]، وامسكها في [[try]] وفرّق بـ [[instanceof]].`, done: R`[[err instanceof ValidationError]] و [[err instanceof Error]] الاتنين [[true]]، و [[err.field]] بترجّع [["email"]]، و [[String(err)]] بترجّع [["ValidationError: "]] وبعدها الرسالة، وأي error تاني (زي TypeError) مبيتمسكش في نفس الفرع.`, sol: R`~~~js validation-error.js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateUser(user) {
  if (typeof user?.email !== "string" || !user.email.includes("@")) {
    throw new ValidationError("الإيميل لازم يبقى فيه @", "email");
  }
  return true;
}

function trySave(user) {
  try {
    validateUser(user);
    return "اتحفظ";
  } catch (err) {
    if (err instanceof ValidationError) return "خانة " + err.field + ": " + err.message;
    throw err;                              // أي error تاني مش بتاعنا: يطلع لفوق
  }
}

try {
  validateUser({ email: "sara.example" });
} catch (err) {
  console.log(err instanceof ValidationError, err instanceof Error, err.field);
  console.log(String(err));
}
console.log(trySave({ email: "sara@site.test" }));
console.log(trySave({ email: "sara" }));
try {
  trySave(null);
  trySave({ get email() { throw new TypeError("باظ"); } });
} catch (err) {
  console.log("طلع برّه:", err.name, err.message);
}
~~~

~~~text الناتج (node validation-error.js، Node 24)
true true email
ValidationError: الإيميل لازم يبقى فيه @
اتحفظ
خانة email: الإيميل لازم يبقى فيه @
طلع برّه: TypeError باظ
~~~

**ليه كده:**

- **[[super(message)]]:** constructor بتاع Error هو اللي بيحط [[message]] و [[stack]]. لازم قبل أي this.
- **[[this.name = "ValidationError"]]:** من غيرها [[name]] بيفضل [["Error"]] (موروث من Error.prototype)، و [[String(err)]] كانت هتطلع [["Error: ..."]].
- **[[instanceof]] الاتنين true:** ValidationError.prototype وبعده Error.prototype في السلسلة.
- **[[trySave(null)]]:** [[user?.email]] رجّعت undefined فطلع ValidationError عادي واتمسك جوه. لكن الـ getter اللي بيرمي [[TypeError]] مش ValidationError، فـ [[throw err]] رماه تاني لبرّه. ده المطلوب: كل catch يمسك اللي يعرف يتعامل معاه بس.

**الغلطة الشائعة:** [[catch (err) { return "الإيميل غلط"; }]] من غير [[instanceof]]: أي باج حقيقي (TypeError من كود تاني) هيتعرض لليوزر كإنه «إيميل غلط» ومحدش هيعرف إن فيه مشكلة.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[class A { hi() { return "A"; } } class B extends A { hi() { return super.hi() + "B"; } }]]. اكتب ناتج [[new B().hi()]] و [[new B() instanceof A]] و [[Object.getPrototypeOf(B) === A]].`, done: R`توقعت وطلع [["AB"]] و [[true]] و [[true]]. و [[super.hi()]] نادت نسخة A من غير ما تدخل في loop.`, sol: R`~~~js super-method.js
class A {
  hi() {
    return "A";
  }
}
class B extends A {
  hi() {
    return super.hi() + "B";
  }
}
console.log(new B().hi());
console.log(new B() instanceof A);
console.log(Object.getPrototypeOf(B) === A);
console.log(new A().hi());
~~~

~~~text الناتج (node super-method.js، Node 24)
AB
true
true
A
~~~

**ليه كده:**

- **[[super.hi()]]** بتدوّر على [[hi]] بداية من **prototype الأب** ([[A.prototype]])، مش من الـ object نفسه. فبتلاقي نسخة A على طول وترجّع [["A"]]، وبعدين B بتزوّد [["B"]].
- **ليه مفيش loop:** لو كتبت [[this.hi()]] بدل [[super.hi()]]، this هي الـ B instance، والدوّارة هتبدأ من B.prototype وتلاقي [[hi]] بتاعة B نفسها، فتنادي نفسها للأبد ([[RangeError: Maximum call stack size exceeded]]).
- **[[instanceof A]]:** A.prototype في سلسلة الـ instance. و [[Object.getPrototypeOf(B) === A]]: الكلاس نفسه وارث من الكلاس (عشان الـ static).
- **[[new A().hi()]]** لسه [["A"]]: B مغيّرتش حاجة في A.

**الغلطة الشائعة:** تستخدم [[super]] في دالة عادية برّه الكلاس أو في arrow برّه method: [[SyntaxError: 'super' keyword unexpected here]]. الـ super بتشتغل جوه methods الكلاس (أو object literal methods) بس.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[class Store extends EventTarget]] فيها Map خاصة و [[set(key, value)]] بتعمل [[dispatchEvent(new CustomEvent("change", { detail: { key, value } }))]]. وبعدين اكتبها تاني بالتركيب (composition): [[#events = new EventTarget()]] جواها و [[on(fn)]] بتاعتك.`, done: R`في Node والمتصفح: [[store.addEventListener("change", (e) => console.log(e.detail))]] وبعدها [[store.set("theme", "dark")]] بيطبع [[{ key: 'theme', value: 'dark' }]]. والنسخة اللي بالتركيب بتطبع نفس الحاجة، بس من برّه مفيش [[dispatchEvent]] تقدر تناديها، وتقدر تقول أنهي أأمن وليه.`, sol: R`~~~js store-events.js
// ١) وراثة: Store هو نفسه EventTarget
class InheritStore extends EventTarget {
  #data = new Map();
  set(key, value) {
    this.#data.set(key, value);
    this.dispatchEvent(new CustomEvent("change", { detail: { key, value } }));
  }
  get(key) {
    return this.#data.get(key);
  }
}

// ٢) تركيب: Store جواه EventTarget خاص
class ComposedStore {
  #data = new Map();
  #events = new EventTarget();
  set(key, value) {
    this.#data.set(key, value);
    this.#events.dispatchEvent(new CustomEvent("change", { detail: { key, value } }));
  }
  get(key) {
    return this.#data.get(key);
  }
  on(fn) {
    const listener = (e) => fn(e.detail);
    this.#events.addEventListener("change", listener);
    return () => this.#events.removeEventListener("change", listener);   // unsubscribe
  }
}

const s1 = new InheritStore();
s1.addEventListener("change", (e) => console.log("وراثة:", e.detail));
s1.set("theme", "dark");

const s2 = new ComposedStore();
const off = s2.on((detail) => console.log("تركيب:", detail));
s2.set("theme", "dark");
off();
s2.set("theme", "light");                       // مفيش طباعة بعد off

// مين يقدر يزوّر حدث من برّه؟
s1.dispatchEvent(new CustomEvent("change", { detail: { key: "theme", value: "مزوّر" } }));
console.log("s1 لسه:", s1.get("theme"), "| s2.dispatchEvent:", typeof s2.dispatchEvent);
~~~

~~~text الناتج (node store-events.js، Node 24)
وراثة: { key: 'theme', value: 'dark' }
تركيب: { key: 'theme', value: 'dark' }
وراثة: { key: 'theme', value: 'مزوّر' }
s1 لسه: dark | s2.dispatchEvent: undefined
~~~

اتجرّب نفس الملف في Console بتاع Chrome 157 (Playwright) وطلع نفس السطور ([[CustomEvent]] و [[EventTarget]] موجودين في الاتنين).

**ليه كده:**

- **الوراثة:** [[InheritStore]] **هو** EventTarget، فكل methods الـ EventTarget بقت جزء من الـ API بتاعه: [[addEventListener]] و [[removeEventListener]] و **[[dispatchEvent]]**. والسطر قبل الأخير بيثبت المشكلة: أي حد من برّه بعت حدث «change» مزوّر، والـ listener صدّقه وطبع «مزوّر» مع إن القيمة الحقيقية لسه [["dark"]].
- **التركيب:** [[ComposedStore]] **عنده** EventTarget خاص في [[#events]]. من برّه مفيش غير [[set]] و [[get]] و [[on]]، و [[typeof s2.dispatchEvent]] بـ [["undefined"]]. فمحدش يقدر يطلق حدث غير الـ store نفسه.
- **[[on(fn)]] بترجّع دالة unsubscribe:** الـ [[listener]] متخزّن في الـ closure، فـ [[removeEventListener]] بياخد نفس الـ reference (نفس فكرة تمرين removeEventListener في درس call و apply و bind).
- **[[CustomEvent]] و [[detail]]:** حدث بيشيل بيانات في [[detail]]، موجود في المتصفح و Node 19+.

**أنهي أأمن:** التركيب. الـ API الصغير معناه حاجات أقل ممكن تتستخدم غلط، وتقدر تغيّر جوه (تبدّل EventTarget بـ Set من الدوال) من غير ما تكسر حد. الوراثة تنفع لما الكلاس فعلًا **نوع** من الأب ومحتاج كل الـ API بتاعه (زي custom element بيورث HTMLElement).

**الغلطة الشائعة:** تفتكر إن [[extends]] هي الطريقة الوحيدة «تاخد» قدرات كلاس تاني. اسأل «هو نوع منه؟» ولا «بيستخدمه؟». الـ Store بيستخدم الأحداث، مش نوع من الأحداث.` }
          ],
          ref: [
            { t: "MDN: extends", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends" },
            { t: "MDN: super", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super" },
            { t: "MDN: ReferenceError: must call super constructor before using 'this'", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Super_not_called" },
            { t: "MDN: Error (custom error types)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" },
            { t: "MDN: instanceof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof" },
            { t: "MDN: CustomEvent", url: "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent" },
          ],
          pre: [{ to: "js/class", why: R`الوراثة بين كلاسات، فلازم الكلاس نفسه يبقى واضح الأول`}, { to: "js/addEventListener", why: R`تمرين [[Store extends EventTarget]] بيستخدم نفس [[addEventListener]] بتاع الـ DOM`}],
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
          teach: R`## الكود ده بيعمل إيه؟

كلاس أب [[User]] فيه اسم و method بتوصفه، وكلاس ابن [[Admin]] بياخد كل حاجة من User ويزوّد عليها صلاحيات، ويعدّل الوصف **من غير ما يعيد كتابة** وصف الأب. اتشغّل في Node 24.

---

## ١. الكلاس الأب

~~~text app.js
class User {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return $__btUser: $__{this.name}$__bt;
  }
}
~~~

كلاس عادي زي الدرس اللي فات: constructor بيحط [[name]] على الـ instance، و method [[describe]] بترجّع نص template. [[new User("Ali").describe()]] بترجّع [[User: Ali]].

---

## ٢. [[extends]]

~~~text app.js
class Admin extends User {
~~~

[[extends User]] معناها «Admin نوع من User». JS بيوصّل سلسلتين prototype (اتأكدنا من الاتنين، طلعوا [[true]]):

- [[Object.getPrototypeOf(Admin.prototype) === User.prototype]]: أي admin لما ميلاقيش method عنده، بيدوّر في methods بتاعة User.
- [[Object.getPrototypeOf(Admin) === User]]: حتى الـ static بتاعة User بتتورث.

---

## ٣. constructor الابن و [[super()]]

~~~text app.js
  constructor(name, permissions) {
    super(name);
    this.permissions = permissions;
  }
~~~

- الـ constructor بياخد باراميتر زيادة: [[permissions]] (array صلاحيات).
- [[super(name)]]: **نادي constructor الأب** وابعتله name. هو اللي بيعمل الـ object ويحط عليه [[this.name]].
- [[this.permissions = ...]]: بعد كده بس نقدر نستخدم this ونزوّد.

ليه الترتيب ده إجباري؟ في كلاس وارث، الـ object **مبيتعملش** غير لما الأب يعمله جوه super. فـ this قبل super مش موجودة أصلًا. جرّبنا [[this.x = 1; super(n);]]:

~~~text الناتج
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
~~~

يعني «في الكلاس الوارث (derived) لازم تنادي super قبل ما تلمس this».

---

## ٤. override و [[super.describe()]]

~~~text app.js
  describe() {
    return $__bt$__{super.describe()} (admin: $__{this.permissions.join(", ")})$__bt;
  }
}
~~~

- كتبنا [[describe]] تاني في Admin: دي اسمها **override**. لما تنادي [[a.describe()]]، JS بيلاقيها في Admin.prototype الأول فبيوقف هناك.
- [[super.describe()]]: «هات نسخة **الأب** من describe ونادِيها على نفس this». فبترجّع [[User: Sara]].
- [[this.permissions.join(", ")]]: [[join]] بتلزق عناصر الـ array في نص واحد بالفاصل اللي تديهولها: [["users, billing"]].
- والنص كله: نتيجة الأب + الزيادة بين أقواس.

---

## ٥. الاستخدام

~~~text app.js
const a = new Admin("Sara", ["users", "billing"]);
a.describe();
a instanceof Admin;
a instanceof User;
~~~

~~~text الناتج
Admin { name: 'Sara', permissions: [ 'users', 'billing' ] }   ← console.log(a)
User: Sara (admin: users, billing)
true
true
~~~

- [[name]] جت من constructor الأب (عن طريق super)، و [[permissions]] من الابن، والاتنين على نفس الـ object.
- [[a instanceof User]] = [[true]]: [[instanceof]] بيمشي في سلسلة a ويسأل «User.prototype موجود فيها؟»، وهو موجود.

---

## ٦. من غير constructor خالص

من التجربة:

~~~text app.js
class Guest extends User {}
new Guest("x").describe();
~~~

~~~text الناتج
User: x
~~~

لو مكتبتش constructor، JS بيعمل واحد لوحده كده: [[constructor(...args) { super(...args); }]]، يعني بيبعت كل حاجة للأب زي ما هي.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[class B extends A]] | B بيورث methods و static بتاعة A |
| [[super(...)]] في الـ constructor | نادي constructor الأب. إجباري قبل أي this |
| [[super.method()]] | نادي نسخة الأب من method على نفس this |
| method بنفس الاسم في الابن | override: بتغطّي على بتاعة الأب |
| مفيش constructor في الابن | JS بيبعت كل الـ arguments للأب لوحده |

- اكتب constructor في الابن بس لو عندك حاجة **زيادة** تعملها.
- استخدم الوراثة لعلاقة «نوع من» حقيقية (Admin نوع من User، و NotFoundError نوع من Error).`,
          lines: [
            R`الكلاس الأب: فيه اللي أي مستخدم محتاجه (اسم و [[describe]])، والكلاسات اللي هتورث منه هتاخد ده من غير ما تكرره.`,
            R`بيتنادى مع [[new User(...)]]، أو من الكلاس الابن عن طريق [[super(...)]].`,
            R`بيحط الاسم على الـ instance. ولما [[Admin]] ينادي [[super(name)]]، السطر ده هو اللي بيحط الاسم على الـ admin.`,
            R`نهاية constructor الأب.`,
            R`method على [[User.prototype]]، فأي [[User]] وأي كلاس ابن يقدر يناديها.`,
            R`بترجّع وصف بسيط زي [["User: Sara"]]. و [[this]] هنا هتبقى الـ instance اللي اتنادت عليه، حتى لو كان [[Admin]].`,
            R`نهاية [[describe]].`,
            R`نهاية الكلاس [[User]].`,
            R`[[extends]] بيخلي [[Admin.prototype]] يورث من [[User.prototype]]، فأي admin عنده [[describe]] وأي method تانية في [[User]] أوتوماتيك، ونضيف عليها اللي يخص الـ admin بس.`,
            R`constructor خاص بالابن، بياخد الاسم زي الأب وكمان قايمة الصلاحيات.`,
            R`بينادي constructor الأب بالاسم عشان يعمل الجزء بتاعه. في كلاس ابن لازم [[super()]] قبل أي استخدام لـ [[this]]، وإلا ReferenceError، لأن الأب هو اللي بيجهّز [[this]] أصلًا.`,
            R`بعد [[super]] بقى مسموح نستخدم [[this]]، فبنضيف الخاصية اللي الـ admin بس عنده.`,
            R`نهاية constructor الابن.`,
            R`override: [[describe]] جديدة على [[Admin.prototype]]. لما تنادي [[a.describe()]]، JS بيلاقي دي الأول في السلسلة فمبيوصلش لنسخة الأب.`,
            R`[[super.describe()]] بتنادي نسخة الأب (بنفس [[this]]) فترجّع [["User: Sara"]]، وبنكمّل عليها الصلاحيات مفصولة بـ [[join(", ")]]. كده بنعيد استخدام كود الأب بدل ما ننسخه.`,
            R`نهاية [[describe]] الجديدة.`,
            R`نهاية الكلاس [[Admin]].`,
            R`بيعمل admin: constructor [[Admin]] بينادي [[super("Sara")]] فيتحط [[name]]، وبعدين [[permissions]] تتحط.`,
            R`بيشغّل النسخة الجديدة (الـ override)، اللي جواها نادت نسخة الأب: [["User: Sara (admin: users, billing)"]].`,
            R`[[instanceof]] بيدوّر في الـ prototype chain بتاعة [[a]] على [[Admin.prototype]]، ولقاها فرجّع [[true]].`,
            R`و [[User.prototype]] برضه في السلسلة (فوق [[Admin.prototype]])، فـ [[true]]. يعني الـ admin يتعامل كـ user في أي كود مستني user.`,
          ],
          sol: R`من غير [[super(name)]] بيطلع [[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]: في الكلاس الابن this مبتتعملش غير لما الأب يعملها بـ super، فأي [[this.x]] قبلها ممنوع. ولو حطيت super بعد [[this.permissions = ...]] نفس الـ error.

[[class Guest extends User {}]] من غير constructor و [[new Guest("x").describe()]] بترجّع [["User: x"]]: لو مكتبتش constructor، JS بيعملك واحد لوحده [[constructor(...args) { super(...args); }]] بيبعت كل حاجة للأب. فمتكتبش constructor غير لو عندك حاجة زيادة تعملها.`
        }
      ]
    }
]);
