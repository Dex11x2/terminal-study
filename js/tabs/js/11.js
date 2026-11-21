// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "HTML و CSS و JavaScript مع بعض: تبني الصفحة كاملة وتربطهم",
      l: 2,
      n: "مين بيعمل إيه في الصفحة، وإزاي الملفات التلاتة بتتربط، والعقد اللي بينهم (classes و data و aria و CSS variables)، والفورم والحركة والـ responsive والثيم من التلاتة، وتتبّع باج بيعدّي بينهم، و ٧ مشاريع كاملة بشكلها وكودها",
      pre: [
        { to: "css/semantic HTML", why: R`الطبقة الأولى في كل مشروع هنا: عناصر ليها معنى ([[<button>]] و [[<nav>]] و [[<form>]]) قبل أي ستايل أو سكربت` },
        { to: "css/selectors", why: R`الـ CSS والـ JS بيمسكوا نفس العناصر بنفس الـ selectors، والوحدة كلها مبنية على كده` },
        { to: "css/box model", why: R`كل مشروع فيه كروت وأزرار ومسافات، ودرس DevTools بيقرا الـ box model في Computed` },
        { to: "css/flexbox", why: R`الـ layouts في المشاريع flex و grid، ودرس الـ responsive بيبني عليهم` },
        { to: "css/form و label", why: R`درس الفورم بيكمّل على الـ label والـ name والـ constraints اللي اتعلمتها في HTML` },
        { to: "css/CSS variables", why: R`المتغيرات هي الطريقة اللي JS بيبعت بيها أرقام للـ CSS ([[--progress]]) والثيم كله مبني عليها` },
        { to: "js/querySelector", why: R`أول خطوة في أي ربط: JS بيمسك العنصر اللي الـ HTML عمله` },
        { to: "js/textContent و classList", why: R`أغلب الربط بين JS و CSS هو class أو attribute بيتغيّر` },
        { to: "js/addEventListener", why: R`كل سلوك في الوحدة بيبدأ بحدث: click و submit و keydown و input` },
        { to: "js/event delegation", why: R`المشاريع الكبيرة فيها لستات بتترسم من جديد، فالـ listener بيتحط على الأب` },
        { to: "js/defer و async و module", why: R`درس الربط بيكمّل من هنا: مكان الـ [[<script>]] وليه [[type="module"]] محتاج سيرفر` },
      ],
      projects: [
        { lvl: 'صغير', dir: "product-card", t: R`كارت منتج بعدّاد كمية و «أضف للسلة»`, what: R`صفحة منتج واحد: صورة واسم وسعر، وعدّاد كمية بزرارين [[−]] و [[+]] وحقل رقم (من ١ لـ ١٠، والزرار بيتقفل عند الحد)، والإجمالي بيتحسب وانت بتغيّر، و «أضف للسلة» بيزوّد رقم السلة اللي في الـ header (بحركة صغيرة) ويكتب «اتضاف ٣ للسلة» لقارئ الشاشة. الـ HTML فورم حقيقي بيتبعت لو JS موقعش، والـ JS بيكتب [[data-count]] و [[data-state]] بس والـ CSS بيرسمهم. من دروس «مين بيعمل إيه» و «الجسر» و «الحركة».`, done: R`بالكيبورد بس: Tab للـ [[+]] و Enter بيزوّد، والكمية مبتعدّيش ١٠ حتى لو كتبت ٥٠، والإجمالي بالأرقام العربي صح، والسلة بقت ٣ بعد ما ضفت ٣، و axe صفر، ومفيش scroll أفقي على 360 و 768 و 1280، ومفيش ولا [[style.]] في الـ JS.`, sol: R`~~~view 640 640 الشكل النهائي: غيّر الكمية ودوس «أضف للسلة»
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>كوباية سيراميك: متجر فخّار</title>
  <style>
:root { --brand: #1d4ed8; --ink: #0f172a; --muted: #475569; --line: #cbd5e1; --ok: #15803d; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: #f1f5f9; }
.top { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #fff; border-block-end: 1px solid var(--line); }
.logo { font-weight: 800; color: var(--ink); text-decoration: none; }
.cart-link { color: var(--ink); text-decoration: none; }
.badge { display: inline-block; min-width: 1.6em; padding: 0 6px; border-radius: 999px; background: var(--brand); color: #fff; text-align: center; font-weight: 700; }
.badge[data-count="0"] { background: var(--line); color: var(--ink); }
.badge.is-bumped { animation: bump .3s ease-out; }
@keyframes bump { 50% { scale: 1.4; } }
main { padding: 16px; }
.product { max-width: 380px; margin: auto; padding: 16px; background: #fff; border-radius: 16px; box-shadow: 0 2px 10px #0001; }
.photo { aspect-ratio: 4 / 3; border-radius: 12px; background: radial-gradient(circle at 50% 60%, #1e3a8a 0 28%, transparent 29%), linear-gradient(#dbeafe, #bfdbfe); }
.product h1 { font-size: 1.3rem; margin: 12px 0 0; }
.price { font-size: 1.4rem; font-weight: 800; color: var(--brand); margin: 0 0 8px; }
.buy label { font-weight: 700; }
.qty { display: flex; gap: 6px; margin: 4px 0; }
.qty button, .qty input { font: inherit; height: 44px; border: 1px solid var(--line); border-radius: 8px; background: #fff; }
.qty button { width: 44px; font-size: 1.3rem; cursor: pointer; }
.qty input { width: 72px; text-align: center; }
.qty button:disabled { opacity: .4; cursor: not-allowed; }
.total { color: var(--muted); }
.add { width: 100%; height: 48px; font: inherit; font-weight: 800; color: #fff; background: var(--brand); border: 0; border-radius: 10px; cursor: pointer; transition: background .2s; }
.add:hover { background: #1e40af; }
.add[data-state="added"] { background: var(--ok); }
:is(button, input, a):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.status { min-height: 1.6em; margin: 8px 0 0; color: var(--ok); font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .badge.is-bumped { animation: none; } .add { transition: none; } }
</style>
  <script type="module">
const form = document.querySelector(".js-buy");
const qty = form.elements.qty;
const addBtn = form.querySelector(".add");
const badge = document.querySelector(".js-badge");
const status = document.querySelector(".js-status");
const product = form.closest(".product");
const price = Number(product.dataset.price);
const money = new Intl.NumberFormat("ar-EG");

const state = { qty: 1, inCart: 0 };

function clamp(n) {
  return Math.min(Number(qty.max), Math.max(Number(qty.min), Math.round(n) || 1));
}

function render() {
  qty.value = state.qty;
  form.querySelector('[data-step="-1"]').disabled = state.qty <= Number(qty.min);
  form.querySelector('[data-step="1"]').disabled = state.qty >= Number(qty.max);
  form.querySelector(".js-total").textContent = money.format(state.qty * price) + " جنيه";
  badge.dataset.count = state.inCart;
  badge.textContent = money.format(state.inCart);
}

form.addEventListener("click", (e) => {
  const step = e.target.closest(".js-step");
  if (!step) return;
  state.qty = clamp(state.qty + Number(step.dataset.step));
  render();
});

qty.addEventListener("change", () => {
  state.qty = clamp(Number(qty.value));
  render();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  state.inCart += state.qty;
  render();
  status.textContent = "اتضاف " + money.format(state.qty) + " للسلة";
  addBtn.dataset.state = "added";
  addBtn.textContent = "اتضاف ✓";
  badge.classList.remove("is-bumped");
  badge.offsetWidth; // نعيد تشغيل الـ animation لو اتداس تاني بسرعة
  badge.classList.add("is-bumped");
  await new Promise((r) => setTimeout(r, 1500));
  addBtn.dataset.state = "idle";
  addBtn.textContent = "أضف للسلة";
});

render();
</script>
</head>
<body>
  <header class="top">
    <a class="logo" href="./">فخّار</a>
    <a class="cart-link" href="#cart">السلة <span class="badge js-badge" data-count="0">0</span></a>
  </header>
  <main>
    <article class="product" data-id="mug-blue" data-price="120">
      <div class="photo" role="img" aria-label="كوباية سيراميك زرقا"></div>
      <h1>كوباية سيراميك زرقا</h1>
      <p class="price"><span class="js-price">١٢٠</span> جنيه</p>
      <form class="buy js-buy" action="/cart" method="post">
        <input type="hidden" name="id" value="mug-blue">
        <label for="qty">الكمية</label>
        <div class="qty">
          <button type="button" class="js-step" data-step="-1" aria-label="قلّل الكمية">−</button>
          <input id="qty" name="qty" type="number" min="1" max="10" value="1" inputmode="numeric">
          <button type="button" class="js-step" data-step="1" aria-label="زوّد الكمية">+</button>
        </div>
        <p class="total">الإجمالي: <output class="js-total" for="qty">١٢٠ جنيه</output></p>
        <button class="add" type="submit" data-state="idle">أضف للسلة</button>
      </form>
      <p class="status js-status" role="status"></p>
    </article>
  </main>
</body>
</html>
~~~

**هتشوف إيه:** header فيه «فخّار» على اليمين و «السلة ٠» على الشمال (الصفر رمادي). تحته كارت أبيض بحواف مدورة: صورة كوباية زرقا مرسومة بالـ CSS، والاسم، والسعر «١٢٠ جنيه» بالأزرق. تحته «الكمية» وصف فيه [[−]] (باهت لأنك عند ١) والرقم و [[+]]، و «الإجمالي: ١٢٠ جنيه». ولما تدوس «أضف للسلة» الزرار بيخضر ويقول «اتضاف ✓» ثانية ونص، ورقم السلة بينط ويبقى أزرق، وتحت الزرار «اتضاف ١ للسلة».

### الملفات

~~~text product-card/
product-card/
├── index.html      المنتج والفورم (شغال من غير JS)
├── css/
│   └── styles.css  الشكل والحالات ([[data-count="0"]] و [[data-state="added"]] و [[.is-bumped]])
└── js/
    └── app.js      الحالة والحساب، ومبيكتبش غير نص و attributes و class واحد
~~~

### تشغّله إزاي

~~~powershell
mkdir product-card; cd product-card
mkdir css, js
ni index.html, css/styles.css, js/app.js
code .
npx serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (في Git Bash: [[mkdir -p product-card/{css,js} && cd product-card && touch index.html css/styles.css js/app.js]]، والباقي زي ما هو. وبدل [[npx serve]] ينفع [[python -m http.server 8080]] أو [[server.mjs]] من درس «تشغّل المشروع وتعرضه».)

### لو مشتغلش

- **فتحته بدبل كليك:** الشكل كامل بس [[−]] و [[+]] مبيعملوش حاجة، و «أضف للسلة» بيودّيك لصفحة فاضية. Console: [[Access to script at 'file:///C:/Users/ali/product-card/js/app.js' from origin 'null' has been blocked by CORS policy: ...]]. التصليح: سيرفر محلي.
- **الرقم بينط أول مرة بس:** دوست «أضف» مرتين ورا بعض، والمرة التانية من غير حركة. قست [[badge.getAnimations().length]] بعد الدوسة التانية: **0** من غير سطر [[badge.offsetWidth]]، و **1** معاه. لأن شيل الـ class وحطه في نفس اللحظة المتصفح مبيشوفهوش تغيير. السطر ده بيجبره يحسب الـ style بين الاتنين.
- **الحقل فاضي:** لو اليوزر مسح الرقم، [[Number("")]] = 0 و [[Math.round(0) || 1]] = 1، فالكمية بترجع ١ مش ٠ (قستها: الحقل رجع [["1"]]).

### إزاي التلاتة مربوطين

| JS بيمسك | JS بيكتب | CSS بيرسم |
|---|---|---|
| [[.js-buy]] (الفورم) و [[submit]] | [[state.inCart]] ← [[badge.dataset.count]] | [[.badge[data-count="0"]]] رمادي، وغيره أزرق |
| [[.js-step]] بـ [[data-step="1"]] و [[-1]] (delegation على الفورم) | [[disabled]] على الزرار عند الحد | [[.qty button:disabled]] باهت |
| [[#qty]] و [[change]] | [[qty.value]] و نص [[.js-total]] | — |
| [[.add]] | [[data-state="added"]] ثانية ونص | [[.add[data-state="added"]]] أخضر |
| [[.js-badge]] | class [[is-bumped]] | [[@keyframes bump]]، ومن غيرها مع [[prefers-reduced-motion]] |
| [[.js-status]] ([[role="status"]]) | نص «اتضاف ٣ للسلة» | لون أخضر. وقارئ الشاشة بيقوله |

**الحدث ← الحالة ← العرض:** كل listener بيغيّر [[state.qty]] أو [[state.inCart]] بس، وبعدين [[render()]] بتكتب الكمية والإجمالي والأزرار والـ badge. والـ HTML شايل البيانات الثابتة: السعر في [[data-price]] على الكارت، والحدود في [[min]] و [[max]] على الحقل، فالـ JS بيقراهم مش بيكررهم.

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>كوباية سيراميك: متجر فخّار</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <header class="top">
    <a class="logo" href="./">فخّار</a>
    <a class="cart-link" href="#cart">السلة <span class="badge js-badge" data-count="0">0</span></a>
  </header>
  <main>
    <article class="product" data-id="mug-blue" data-price="120">
      <div class="photo" role="img" aria-label="كوباية سيراميك زرقا"></div>
      <h1>كوباية سيراميك زرقا</h1>
      <p class="price"><span class="js-price">١٢٠</span> جنيه</p>
      <form class="buy js-buy" action="/cart" method="post">
        <input type="hidden" name="id" value="mug-blue">
        <label for="qty">الكمية</label>
        <div class="qty">
          <button type="button" class="js-step" data-step="-1" aria-label="قلّل الكمية">−</button>
          <input id="qty" name="qty" type="number" min="1" max="10" value="1" inputmode="numeric">
          <button type="button" class="js-step" data-step="1" aria-label="زوّد الكمية">+</button>
        </div>
        <p class="total">الإجمالي: <output class="js-total" for="qty">١٢٠ جنيه</output></p>
        <button class="add" type="submit" data-state="idle">أضف للسلة</button>
      </form>
      <p class="status js-status" role="status"></p>
    </article>
  </main>
</body>
</html>
~~~

~~~css css/styles.css
:root { --brand: #1d4ed8; --ink: #0f172a; --muted: #475569; --line: #cbd5e1; --ok: #15803d; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: #f1f5f9; }
.top { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #fff; border-block-end: 1px solid var(--line); }
.logo { font-weight: 800; color: var(--ink); text-decoration: none; }
.cart-link { color: var(--ink); text-decoration: none; }
.badge { display: inline-block; min-width: 1.6em; padding: 0 6px; border-radius: 999px; background: var(--brand); color: #fff; text-align: center; font-weight: 700; }
.badge[data-count="0"] { background: var(--line); color: var(--ink); }
.badge.is-bumped { animation: bump .3s ease-out; }
@keyframes bump { 50% { scale: 1.4; } }
main { padding: 16px; }
.product { max-width: 380px; margin: auto; padding: 16px; background: #fff; border-radius: 16px; box-shadow: 0 2px 10px #0001; }
.photo { aspect-ratio: 4 / 3; border-radius: 12px; background: radial-gradient(circle at 50% 60%, #1e3a8a 0 28%, transparent 29%), linear-gradient(#dbeafe, #bfdbfe); }
.product h1 { font-size: 1.3rem; margin: 12px 0 0; }
.price { font-size: 1.4rem; font-weight: 800; color: var(--brand); margin: 0 0 8px; }
.buy label { font-weight: 700; }
.qty { display: flex; gap: 6px; margin: 4px 0; }
.qty button, .qty input { font: inherit; height: 44px; border: 1px solid var(--line); border-radius: 8px; background: #fff; }
.qty button { width: 44px; font-size: 1.3rem; cursor: pointer; }
.qty input { width: 72px; text-align: center; }
.qty button:disabled { opacity: .4; cursor: not-allowed; }
.total { color: var(--muted); }
.add { width: 100%; height: 48px; font: inherit; font-weight: 800; color: #fff; background: var(--brand); border: 0; border-radius: 10px; cursor: pointer; transition: background .2s; }
.add:hover { background: #1e40af; }
.add[data-state="added"] { background: var(--ok); }
:is(button, input, a):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.status { min-height: 1.6em; margin: 8px 0 0; color: var(--ok); font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .badge.is-bumped { animation: none; } .add { transition: none; } }
~~~

~~~js js/app.js
const form = document.querySelector(".js-buy");
const qty = form.elements.qty;
const addBtn = form.querySelector(".add");
const badge = document.querySelector(".js-badge");
const status = document.querySelector(".js-status");
const product = form.closest(".product");
const price = Number(product.dataset.price);
const money = new Intl.NumberFormat("ar-EG");

const state = { qty: 1, inCart: 0 };

function clamp(n) {
  return Math.min(Number(qty.max), Math.max(Number(qty.min), Math.round(n) || 1));
}

function render() {
  qty.value = state.qty;
  form.querySelector('[data-step="-1"]').disabled = state.qty <= Number(qty.min);
  form.querySelector('[data-step="1"]').disabled = state.qty >= Number(qty.max);
  form.querySelector(".js-total").textContent = money.format(state.qty * price) + " جنيه";
  badge.dataset.count = state.inCart;
  badge.textContent = money.format(state.inCart);
}

form.addEventListener("click", (e) => {
  const step = e.target.closest(".js-step");
  if (!step) return;
  state.qty = clamp(state.qty + Number(step.dataset.step));
  render();
});

qty.addEventListener("change", () => {
  state.qty = clamp(Number(qty.value));
  render();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  state.inCart += state.qty;
  render();
  status.textContent = "اتضاف " + money.format(state.qty) + " للسلة";
  addBtn.dataset.state = "added";
  addBtn.textContent = "اتضاف ✓";
  badge.classList.remove("is-bumped");
  badge.offsetWidth; // نعيد تشغيل الـ animation لو اتداس تاني بسرعة
  badge.classList.add("is-bumped");
  await new Promise((r) => setTimeout(r, 1500));
  addBtn.dataset.state = "idle";
  addBtn.textContent = "أضف للسلة";
});

render();
~~~

### أهم الحتت

- **الفورم حقيقي:** [[action="/cart"]] و [[method="post"]] و [[name="id"]] و [[name="qty"]]. من غير JS الزرارين [[−]] و [[+]] ملهمش لازمة ([[type="button"]] مبيعملوش حاجة)، بس الحقل نفسه شغال و «أضف للسلة» بيبعت [[id=mug-blue&qty=3]] للسيرفر.
- **[[<output for="qty">]]:** عنصر معناه «نتيجة حساب»، وبيتقري لقارئ الشاشة مربوط بالحقل.
- **[[aria-label="زوّد الكمية"]]** على [[+]]: من غيرها قارئ الشاشة هيقول «plus» أو «زرار» بس.
- **[[clamp()]]:** [[Math.round]] بيشيل الكسور، و [[|| 1]] للفاضي، و [[Math.min]] و [[Math.max]] بالحدود اللي في الـ HTML.
- **[[Intl.NumberFormat("ar-EG")]]:** «١٬٢٠٠» بالأرقام العربي والفاصل، من غير ما نكتب تحويل بإيدنا.
- **الصورة [[div role="img" aria-label]]:** هنا رسمة CSS عشان المشروع يبقى ٣ ملفات بس. في متجر حقيقي [[<img src alt width height>]].

### اتقاس (Chrome 158، Playwright، من سيرفر محلي)

~~~text
أول ما فتحت:        الكمية 1، الإجمالي «١٢٠ جنيه»، السلة «٠» (data-count="0")، − متقفل
+ مرتين:            3، «٣٦٠ جنيه»، − و + شغالين
كتبت 50 وسبت الحقل:  10، «١٬٢٠٠ جنيه»، + متقفل
كتبت 3 و «أضف»:      السلة «٣» (data-count="3")، الزرار «اتضاف ✓» وبعد 350ms لونه rgb(21, 128, 61)
                     الحالة: «اتضاف ٣ للسلة»، و badge.getAnimations().length = 1
بعد 1.7 ثانية:       الزرار رجع «أضف للسلة»
axe-core 4.10.2:    0 violations
scrollWidth:        360 ← 360، 768 ← 768، 1280 ← 1280 (مفيش scroll أفقي)
page errors:        ولا واحد
~~~` },
        { lvl: 'صغير', dir: "reading-progress", t: R`مقال بشريط قراية وفهرس بيتابعك`, what: R`صفحة مقال طويل: header ثابت فوق وتحته شريط بيتملا كل ما تنزل (من ٠ لـ ١٠٠٪)، وفهرس على الجنب (فوق المقال على الموبايل) بيعلّم القسم اللي بتقراه دلوقتي، وزرار «↑ لفوق» بيظهر بعد ما تنزل شاشة كاملة. اللينكات كلها [[<a href="#...">]] شغالة من غير JS، والنزول ناعم بـ CSS بس لو اليوزر مش طالب حركة أقل. JS بيكتب رقم واحد ([[--progress]]) و attributes بس. من دروس «الجسر» و «الحركة» و «الـ responsive».`, done: R`الشريط نصه بالظبط لما تبقى في نص الصفحة ([[--progress]] = 0.5)، والفهرس بيعلّم القسم الصح لما تدوس أي لينك فيه حتى آخر قسم، و «لفوق» مخفي في الأول وبيرجّعك لـ [[scrollY = 0]]، و axe صفر، ومفيش scroll أفقي على 360 و 768 و 1280.`, sol: R`~~~view 640 640 الشكل النهائي: انزل في المقال، ودوس على الفهرس
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>إزاي تحمّص البن في البيت: مدونة حبّة</title>
  <style>
:root { --ink: #1c1917; --muted: #57534e; --brand: #b45309; --paper: #fffbeb; --progress: 0; }
* { box-sizing: border-box; }
html { scroll-padding-top: 64px; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
body { margin: 0; font: 17px/1.8 system-ui, sans-serif; color: var(--ink); background: var(--paper); }
.top { position: sticky; top: 0; z-index: 2; padding: 12px 16px; background: #fff; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: var(--ink); text-decoration: none; }
.bar { position: absolute; inset-block-end: -1px; inset-inline-start: 0; height: 4px; width: calc(var(--progress) * 100%); background: var(--brand); }
.layout { display: grid; gap: 24px; max-width: 980px; margin: auto; padding: 16px; }
@media (min-width: 900px) { .layout { grid-template-columns: 220px 1fr; } .toc { position: sticky; top: 72px; align-self: start; } }
.toc h2 { font-size: 1rem; margin: 0 0 4px; }
.toc ol { margin: 0; padding-inline-start: 20px; }
.toc a { color: var(--muted); }
.toc a[aria-current="true"] { color: var(--brand); font-weight: 800; }
article { max-width: 65ch; }
.lead { color: var(--muted); font-size: 1.1rem; }
section { margin-block-end: 48px; }
/* آخر قسم طوله شاشة على الأقل، عشان أي قسم يقدر يطلع لفوق لما تدوس عليه في الفهرس */
section:last-child { min-height: calc(100vh - 80px); }
.to-top { position: fixed; inset-block-end: 16px; inset-inline-end: 16px; padding: 8px 14px; border-radius: 999px; background: var(--ink); color: #fff; text-decoration: none; opacity: 0; translate: 0 12px; pointer-events: none; transition: opacity .2s, translate .2s; }
.to-top[data-visible="true"] { opacity: 1; translate: 0 0; pointer-events: auto; }
a:focus-visible { outline: 3px solid var(--brand); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .to-top { transition: none; } }
</style>
  <script type="module">
const root = document.documentElement;
const toTop = document.querySelector(".to-top");
const links = new Map([...document.querySelectorAll(".toc a")].map((a) => [a.hash.slice(1), a]));

function setCurrent(id) {
  for (const [key, a] of links) {
    if (key === id) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  }
}

// ١. شريط القراية وزرار «لفوق»: رقم ونص، والشكل كله في CSS
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = root.scrollHeight - root.clientHeight;
    const progress = max > 0 ? root.scrollTop / max : 0;
    root.style.setProperty("--progress", progress.toFixed(3));
    toTop.dataset.visible = root.scrollTop > root.clientHeight;
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ٢. القسم اللي بتقراه دلوقتي يتعلّم في الفهرس
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) setCurrent(e.target.id);
  }
}, { root: document, rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll("article section").forEach((s) => io.observe(s));
</script>
</head>
<body>
  <header class="top">
    <div class="bar" aria-hidden="true"></div>
    <a class="logo" href="#top">مدونة حبّة</a>
  </header>
  <main class="layout" id="top">
    <nav class="toc" aria-label="محتوى المقال">
      <h2>في المقال</h2>
      <ol>
        <li><a href="#tools">الأدوات</a></li>
        <li><a href="#heat">الحرارة</a></li>
        <li><a href="#cracks">الطقّة الأولى والتانية</a></li>
        <li><a href="#rest">الراحة بعد التحميص</a></li>
      </ol>
    </nav>
    <article>
      <h1>إزاي تحمّص البن في البيت</h1>
      <p class="lead">من غير ماكينة: حلّة تقيلة، ومعلقة خشب، و ١٥ دقيقة.</p>
      <section id="tools"><h2>الأدوات</h2><p>حلّة حديد أو ألومنيوم تقيل، ومعلقة خشب، ومصفاية معدن واسعة للتبريد. ابدأ بـ ١٥٠ جرام بن أخضر، ومتزوّدش عشان الحبوب تتحرك براحتها.</p><p>الشباك مفتوح أو الشفاط شغال: التحميص بيطلّع دخان وقشر خفيف.</p></section>
      <section id="heat"><h2>الحرارة</h2><p>نار متوسطة، والحلّة تسخن لوحدها ٣ دقايق قبل ما تحط البن. قلّب من غير ما تقف، كل حبة لازم تلمس قاع الحلّة نفس الوقت تقريبًا، وإلا هيطلع لونين.</p><p>بعد ٤ دقايق اللون بيبقى أصفر، وريحة زي العيش، وده طبيعي.</p></section>
      <section id="cracks"><h2>الطقّة الأولى والتانية</h2><p>حوالي الدقيقة ٨ هتسمع طقطقة زي الفشار: دي الطقّة الأولى، والبن بقى تحميص فاتح. لو عايز وسط استنى دقيقتين كمان. الطقّة التانية أهدى وأسرع، وبعدها التحميص غامق والزيت بيطلع على الحبوب.</p><p>شيل البن قبل اللون اللي عايزه بشوية، لأنه بيكمّل تحميص من حرارته.</p></section>
      <section id="rest"><h2>الراحة بعد التحميص</h2><p>اقلبه في المصفاية وحرّكه لحد ما يبرد في دقيقتين، وانفخ القشر. سيبه ١٢ ساعة على الأقل في برطمان مش مقفول خالص قبل ما تطحنه، عشان الغاز اللي جواه يطلع.</p><p>أحسن طعم بيبقى من اليوم التالت لحد أسبوعين.</p></section>
    </article>
    <a class="to-top" href="#top" data-visible="false">↑ لفوق</a>
  </main>
</body>
</html>
~~~

**هتشوف إيه:** header أبيض فيه «مدونة حبّة»، وتحته خط بني رفيع طوله صفر. على الكمبيوتر الفهرس عمود على اليمين بيفضل ثابت وانت نازل، وعلى الموبايل فوق المقال. كل ما تنزل الخط البني بيطول، واللينك بتاع القسم اللي قدامك في الفهرس بيبقى بني وتقيل. بعد شاشة نزول بيطلع زرار أسود «↑ لفوق» في الركن الشمال تحت.

### الملفات

~~~text reading-progress/
reading-progress/
├── index.html      المقال والفهرس (لينكات لأقسام بـ id) وزرار لفوق (لينك لـ #top)
├── css/
│   └── styles.css  الـ header الثابت، والشريط من --progress، والفهرس الحالي، والزرار
└── js/
    └── app.js      scroll ← --progress و data-visible، و IntersectionObserver ← aria-current
~~~

### تشغّله إزاي

~~~powershell
mkdir reading-progress; cd reading-progress
mkdir css, js
ni index.html, css/styles.css, js/app.js
code .
npx serve -l 8080
~~~

وافتح [[http://localhost:8080]]، وجرّبها على 360 بـ Ctrl+Shift+M. (في Git Bash: [[mkdir -p reading-progress/{css,js} && cd reading-progress && touch index.html css/styles.css js/app.js]].)

### لو مشتغلش

- **axe قال [[landmark-one-main]] و [[region]]:** أول نسخة كان المحتوى في [[<div class="layout">]] وزرار «لفوق» برّه أي landmark. قارئ الشاشة بيدوّر على [[<main>]] عشان يقفز للمحتوى على طول. التصليح: [[<main class="layout">]] والزرار جواه، و axe بقى صفر.
- **الفهرس بيعلّم القسم الغلط:** على 1280 دوست «الحرارة» والفهرس علّم «الراحة بعد التحميص». السبب إن الصفحة كانت قصيرة: المتصفح مقدرش ينزل لحد ما «الحرارة» توصل فوق، فوقف في آخر الصفحة والـ observer شاف آخر قسم. أول تصليح جرّبته كان في JS («لو وصلت للآخر علّم آخر قسم») وطلّع نفس الغلط بالعكس. التصليح الصح كان سطر CSS: [[section:last-child { min-height: calc(100vh - 80px); }]] فأي قسم يقدر يطلع لفوق. بعده الأربع لينكات علّموا الصح على 1280 و 360.
- **الفهرس شغال في الصفحة وبايظ جوه iframe:** في الـ preview بتاع الموقع (iframe معزول) الفهرس كان دايمًا بيعلّم آخر قسم. السبب: [[IntersectionObserver]] من غير [[root]] بيقيس على شاشة الصفحة **الأم**، و [[rootMargin]] بيتجاهل لما الـ iframe من origin تاني، فالشريط الضيق بقى الإطار كله. التصليح: [[{ root: document, rootMargin: "-20% 0px -70% 0px" }]]، وده بيقيس على شاشة الصفحة نفسها في أي مكان اتحطت فيه. بعدها الأربع لينكات علّموا الصح جوه الـ iframe وبرّاه.
- **الشريط واقف عند صفر:** لو فتحته بدبل كليك، Console فيه [[Access to script at 'file:///C:/Users/ali/reading-progress/js/app.js' from origin 'null' has been blocked by CORS policy: ...]]. اللينكات لسه شغالة (HTML)، بس الشريط والفهرس لأ. سيرفر محلي.

### إزاي التلاتة مربوطين

| الـ HTML بيدي | الـ JS بيكتب | الـ CSS بيرسم |
|---|---|---|
| [[<html>]] (المكان اللي المتغير بيتحط عليه) | [[--progress]] من ٠ لـ ١ مع كل scroll | [[.bar { width: calc(var(--progress) * 100%) }]] |
| [[<a class="to-top" data-visible="false">]] | [[data-visible]] true لما تنزل شاشة | [[[data-visible="true"]]] ظاهر بحركة، وغيره شفاف ومبيتداسش |
| [[<nav class="toc">]] بلينكات [[#tools]] و [[#heat]]… و [[<section id>]] | [[aria-current="true"]] على لينك القسم اللي في نص الشاشة | [[.toc a[aria-current="true"]]] بني وتقيل |
| اللينكات نفسها بتنقل | — | [[scroll-behavior: smooth]] (لو مفيش reduce) و [[scroll-padding-top]] عشان العنوان ميتداراش تحت الـ header |

**الحدث ← الحالة ← العرض:** [[scroll]] ← نحسب النسبة في [[requestAnimationFrame]] ← [[setProperty]]. و [[IntersectionObserver]] ← القسم اللي دخل الشريط الضيق اللي بين ٢٠٪ و ٣٠٪ من فوق الشاشة ← [[setCurrent(id)]].

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>إزاي تحمّص البن في البيت: مدونة حبّة</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <header class="top">
    <div class="bar" aria-hidden="true"></div>
    <a class="logo" href="#top">مدونة حبّة</a>
  </header>
  <main class="layout" id="top">
    <nav class="toc" aria-label="محتوى المقال">
      <h2>في المقال</h2>
      <ol>
        <li><a href="#tools">الأدوات</a></li>
        <li><a href="#heat">الحرارة</a></li>
        <li><a href="#cracks">الطقّة الأولى والتانية</a></li>
        <li><a href="#rest">الراحة بعد التحميص</a></li>
      </ol>
    </nav>
    <article>
      <h1>إزاي تحمّص البن في البيت</h1>
      <p class="lead">من غير ماكينة: حلّة تقيلة، ومعلقة خشب، و ١٥ دقيقة.</p>
      <section id="tools"><h2>الأدوات</h2><p>حلّة حديد أو ألومنيوم تقيل، ومعلقة خشب، ومصفاية معدن واسعة للتبريد. ابدأ بـ ١٥٠ جرام بن أخضر، ومتزوّدش عشان الحبوب تتحرك براحتها.</p><p>الشباك مفتوح أو الشفاط شغال: التحميص بيطلّع دخان وقشر خفيف.</p></section>
      <section id="heat"><h2>الحرارة</h2><p>نار متوسطة، والحلّة تسخن لوحدها ٣ دقايق قبل ما تحط البن. قلّب من غير ما تقف، كل حبة لازم تلمس قاع الحلّة نفس الوقت تقريبًا، وإلا هيطلع لونين.</p><p>بعد ٤ دقايق اللون بيبقى أصفر، وريحة زي العيش، وده طبيعي.</p></section>
      <section id="cracks"><h2>الطقّة الأولى والتانية</h2><p>حوالي الدقيقة ٨ هتسمع طقطقة زي الفشار: دي الطقّة الأولى، والبن بقى تحميص فاتح. لو عايز وسط استنى دقيقتين كمان. الطقّة التانية أهدى وأسرع، وبعدها التحميص غامق والزيت بيطلع على الحبوب.</p><p>شيل البن قبل اللون اللي عايزه بشوية، لأنه بيكمّل تحميص من حرارته.</p></section>
      <section id="rest"><h2>الراحة بعد التحميص</h2><p>اقلبه في المصفاية وحرّكه لحد ما يبرد في دقيقتين، وانفخ القشر. سيبه ١٢ ساعة على الأقل في برطمان مش مقفول خالص قبل ما تطحنه، عشان الغاز اللي جواه يطلع.</p><p>أحسن طعم بيبقى من اليوم التالت لحد أسبوعين.</p></section>
    </article>
    <a class="to-top" href="#top" data-visible="false">↑ لفوق</a>
  </main>
</body>
</html>
~~~

~~~css css/styles.css
:root { --ink: #1c1917; --muted: #57534e; --brand: #b45309; --paper: #fffbeb; --progress: 0; }
* { box-sizing: border-box; }
html { scroll-padding-top: 64px; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
body { margin: 0; font: 17px/1.8 system-ui, sans-serif; color: var(--ink); background: var(--paper); }
.top { position: sticky; top: 0; z-index: 2; padding: 12px 16px; background: #fff; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: var(--ink); text-decoration: none; }
.bar { position: absolute; inset-block-end: -1px; inset-inline-start: 0; height: 4px; width: calc(var(--progress) * 100%); background: var(--brand); }
.layout { display: grid; gap: 24px; max-width: 980px; margin: auto; padding: 16px; }
@media (min-width: 900px) { .layout { grid-template-columns: 220px 1fr; } .toc { position: sticky; top: 72px; align-self: start; } }
.toc h2 { font-size: 1rem; margin: 0 0 4px; }
.toc ol { margin: 0; padding-inline-start: 20px; }
.toc a { color: var(--muted); }
.toc a[aria-current="true"] { color: var(--brand); font-weight: 800; }
article { max-width: 65ch; }
.lead { color: var(--muted); font-size: 1.1rem; }
section { margin-block-end: 48px; }
/* آخر قسم طوله شاشة على الأقل، عشان أي قسم يقدر يطلع لفوق لما تدوس عليه في الفهرس */
section:last-child { min-height: calc(100vh - 80px); }
.to-top { position: fixed; inset-block-end: 16px; inset-inline-end: 16px; padding: 8px 14px; border-radius: 999px; background: var(--ink); color: #fff; text-decoration: none; opacity: 0; translate: 0 12px; pointer-events: none; transition: opacity .2s, translate .2s; }
.to-top[data-visible="true"] { opacity: 1; translate: 0 0; pointer-events: auto; }
a:focus-visible { outline: 3px solid var(--brand); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .to-top { transition: none; } }
~~~

~~~js js/app.js
const root = document.documentElement;
const toTop = document.querySelector(".to-top");
const links = new Map([...document.querySelectorAll(".toc a")].map((a) => [a.hash.slice(1), a]));

function setCurrent(id) {
  for (const [key, a] of links) {
    if (key === id) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  }
}

// ١. شريط القراية وزرار «لفوق»: رقم ونص، والشكل كله في CSS
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = root.scrollHeight - root.clientHeight;
    const progress = max > 0 ? root.scrollTop / max : 0;
    root.style.setProperty("--progress", progress.toFixed(3));
    toTop.dataset.visible = root.scrollTop > root.clientHeight;
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ٢. القسم اللي بتقراه دلوقتي يتعلّم في الفهرس
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) setCurrent(e.target.id);
  }
}, { root: document, rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll("article section").forEach((s) => io.observe(s));
~~~

### أهم الحتت

- **[[{ passive: true }]]** على [[scroll]]: بيقول للمتصفح إن الكود مش هيعمل [[preventDefault()]]، فالـ scroll مبيستناش الـ JS.
- **[[ticking]] و [[requestAnimationFrame]]:** الـ [[scroll]] ممكن يتبعت أكتر من مرة في الـ frame الواحد. بنحسب مرة واحدة قبل الرسمة الجاية بس.
- **[[scrollHeight - clientHeight]]:** أقصى مسافة تقدر تنزلها. لو الصفحة أقصر من الشاشة بتبقى صفر، فـ [[max > 0 ?]] بيمنع القسمة على صفر.
- **[[root: document]] و [[rootMargin: "-20% 0px -70% 0px"]]:** الـ root هو شاشة الصفحة دي (مش الصفحة الأم لو احنا جوه iframe)، والـ margin بيصغّر «الشاشة» اللي الـ observer بيبص فيها لشريط من ٢٠٪ لـ ٣٠٪ من فوق. القسم اللي بيعدّي في الشريط ده هو اللي «بتقراه».
- **[[pointer-events: none]]** على الزرار المخفي: شفاف بس لسه في مكانه، فمن غيرها كان هيتداس من غير ما يبان.
- **[[aria-hidden="true"]]** على الشريط: رسم بس، قارئ الشاشة ملوش دعوة بيه.
- **[[scroll-padding-top: 64px]]:** لما لينك يودّيك لقسم، المتصفح بيسيب ٦٤px فوقه، فالعنوان ميستخباش تحت الـ header الثابت.

### اتقاس (Chrome 158، Playwright، من سيرفر محلي)

~~~text
360×640 أول الصفحة:   --progress 0.000، الشريط 0px، data-visible="false"
نص الصفحة:            0.500، الشريط 172px من 345، data-visible="true"
آخر الصفحة:           1.000، الشريط 345px
«↑ لفوق»:             scrollY = 0
دوسة على كل لينك في الفهرس (1280 و 360، وجوه iframe معزول): الأدوات ← الأدوات، الحرارة ← الحرارة، الطقّة ← الطقّة، الراحة ← الراحة
axe-core 4.10.2:      0 violations (بعد ما الـ <main> اتضاف)
scrollWidth:          360 ← 345، 768 ← 753، 1280 ← 1265 (أقل من الشاشة بعرض الـ scrollbar، مفيش scroll أفقي)
page errors:          ولا واحد
~~~` },
        { lvl: 'متوسط', dir: "photo-gallery", t: R`معرض صور بـ dialog وأسهم الكيبورد`, what: R`صفحة فيها ٦ صور في grid بيتظبط لوحده (عمود على الموبايل لحد ٤ على الكمبيوتر). الدوسة على صورة بتفتحها كبيرة في [[<dialog>]] modal فيه الوصف و «٢ من ٦»، وزرارين قبل وبعد، والأسهم بتقلّب (في RTL السهم الشمال = اللي بعدها)، وبعد الأخيرة ترجع للأولى، و Escape أو دوسة برّه أو ✕ بتقفل والـ focus بيرجع للصورة اللي فتحتها. من غير JS كل صورة لينك بيفتح الصورة نفسها. من دروس «نفس الميزة بتلات طرق» و «الـ responsive» و «الجسر».`, done: R`بالكيبورد بس: Tab لتاني صورة و Enter بيفتح «٢ من ٦»، والسهم الشمال «٣ من ٦»، وبعد السادسة «١ من ٦»، و Escape بيرجّع الـ focus للصورة التانية. والـ JS مقفول: الدوسة بتفتح الصورة. axe صفر والـ dialog مقفول ومفتوح، والـ grid عمود على 360 و ٣ على 768 و ٤ على 1280 من غير scroll أفقي.`, ext: R`زوّد السحب بالصباع على الموبايل ([[pointerdown]] و [[pointerup]] والفرق في [[clientX]])، و [[<img srcset>]] لكل صورة بحجمين، والرابط يتغيّر لـ [[#photo-3]] عشان تبعت صورة معينة لحد.`, sol: R`~~~view 600 600 الشكل النهائي: دوس على أي صورة، وجرّب الأسهم و Escape
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>رحلات سارة: معرض الصور</title>
  <style>
:root { --ink: #0f172a; --line: #e2e8f0; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: #f8fafc; }
main { max-width: 1100px; margin: auto; padding: 16px; }
h1 { margin: 0; }
.hint { color: #475569; margin-top: 0; }
.grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); }
.grid a { display: block; border-radius: 10px; overflow: hidden; }
.grid img { display: block; width: 100%; height: auto; transition: scale .2s; }
.grid a:hover img { scale: 1.04; }
.grid a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
.lightbox { width: min(900px, 100vw - 32px); max-height: calc(100dvh - 32px); padding: 0; border: 0; border-radius: 14px; background: #0f172a; color: #fff; }
.lightbox::backdrop { background: #000c; }
.lightbox figure { margin: 0; }
.lightbox img { display: block; width: 100%; max-height: 70dvh; object-fit: contain; background: #000; }
.lightbox figcaption { padding: 8px 14px; }
.count { color: #94a3b8; }
.controls { display: flex; gap: 8px; padding: 0 14px 14px; }
.controls button { font: inherit; font-size: 1.2rem; min-width: 44px; height: 44px; border-radius: 8px; border: 1px solid #475569; background: #1e293b; color: #fff; cursor: pointer; }
.controls .close { margin-inline-start: auto; }
.controls button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .grid img { transition: none; } }
</style>
  <script type="module">
const grid = document.querySelector(".js-grid");
const box = document.querySelector(".js-box");
const big = box.querySelector(".js-big");
const links = [...grid.querySelectorAll("a")];
const nums = new Intl.NumberFormat("ar-EG");
let current = 0;

function show(i) {
  current = (i + links.length) % links.length; // بعد الأخيرة ترجع للأولى، وقبل الأولى للأخيرة
  const thumb = links[current].querySelector("img");
  big.src = links[current].href;
  big.alt = thumb.alt;
  box.querySelector(".js-caption").textContent = thumb.alt;
  box.querySelector(".js-count").textContent = nums.format(current + 1) + " من " + nums.format(links.length);
}

grid.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  e.preventDefault();
  show(links.indexOf(link));
  box.showModal();
});

box.querySelector(".js-next").addEventListener("click", () => show(current + 1));
box.querySelector(".js-prev").addEventListener("click", () => show(current - 1));

box.addEventListener("keydown", (e) => {
  // في صفحة RTL «اللي بعدها» على الشمال، فالسهم الشمال بيقدّم
  if (e.key === "ArrowLeft") show(current + 1);
  if (e.key === "ArrowRight") show(current - 1);
});
</script>
</head>
<body>
  <main>
    <h1>رحلات سارة</h1>
    <p class="hint">دوس على أي صورة تكبر، والأسهم بتقلّب.</p>
    <ul class="grid js-grid">
      <li><a href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230ea5e9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230c4a6e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%A8%D8%AD%D8%B1%3C%2Ftext%3E%3C%2Fsvg%3E"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230ea5e9%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230c4a6e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%A8%D8%AD%D8%B1%3C%2Ftext%3E%3C%2Fsvg%3E" alt="بحر أزرق قبل الغروب" width="600" height="400" loading="lazy"></a></li>
      <li><a href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f59e0b%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237c2d12%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22210%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%B5%D8%AD%D8%B1%D8%A7%3C%2Ftext%3E%3C%2Fsvg%3E"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23f59e0b%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237c2d12%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22210%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%B5%D8%AD%D8%B1%D8%A7%3C%2Ftext%3E%3C%2Fsvg%3E" alt="كثبان رملية في الصحرا" width="600" height="400" loading="lazy"></a></li>
      <li><a href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2322c55e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2314532d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22270%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%BA%D9%8A%D8%B7%3C%2Ftext%3E%3C%2Fsvg%3E"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2322c55e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2314532d%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22270%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%BA%D9%8A%D8%B7%3C%2Ftext%3E%3C%2Fsvg%3E" alt="غيط برسيم أخضر" width="600" height="400" loading="lazy"></a></li>
      <li><a href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23a855f7%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233b0764%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22330%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%BA%D8%B1%D9%88%D8%A8%3C%2Ftext%3E%3C%2Fsvg%3E"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23a855f7%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233b0764%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22330%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%BA%D8%B1%D9%88%D8%A8%3C%2Ftext%3E%3C%2Fsvg%3E" alt="سما بنفسجي وقت الغروب" width="600" height="400" loading="lazy"></a></li>
      <li><a href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23ef4444%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23450a0a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22390%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%B3%D9%88%D9%82%3C%2Ftext%3E%3C%2Fsvg%3E"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23ef4444%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23450a0a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22390%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D8%B3%D9%88%D9%82%3C%2Ftext%3E%3C%2Fsvg%3E" alt="سوق مليان فوانيس حمرا" width="600" height="400" loading="lazy"></a></li>
      <li><a href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2364748b%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230f172a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22450%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D9%84%D9%8A%D9%84%3C%2Ftext%3E%3C%2Fsvg%3E"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2364748b%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230f172a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22450%22%20cy%3D%22140%22%20r%3D%2250%22%20fill%3D%22%23fff8%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22320%22%20font-family%3D%22sans-serif%22%20font-size%3D%2256%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fff%22%3E%D9%84%D9%8A%D9%84%3C%2Ftext%3E%3C%2Fsvg%3E" alt="شارع بالليل" width="600" height="400" loading="lazy"></a></li>
    </ul>
  </main>
  <dialog id="box" class="lightbox js-box" closedby="any" aria-labelledby="box-caption">
    <figure>
      <img class="js-big" src="" alt="">
      <figcaption id="box-caption"><span class="js-caption"></span> <span class="count js-count"></span></figcaption>
    </figure>
    <div class="controls">
      <button type="button" class="js-prev" aria-label="الصورة اللي قبلها">→</button>
      <button type="button" class="js-next" aria-label="الصورة اللي بعدها">←</button>
      <button type="button" commandfor="box" command="close" class="close" aria-label="اقفل">✕</button>
    </div>
  </dialog>
</body>
</html>
~~~

**هتشوف إيه:** عنوان «رحلات سارة» وسطر رمادي، وتحتهم ٦ صور ملونة (بحر، صحرا، غيط، غروب، سوق، ليل) بحواف مدورة، بتكبر سنة لما الماوس يقف عليها. الدوسة بتغمّق الصفحة كلها وبتفتح الصورة كبيرة على خلفية كحلي، وتحتها «كثبان رملية في الصحرا ٢ من ٦»، وتحت زرارين أسهم و ✕ على الشمال.

### الملفات

~~~text photo-gallery/
photo-gallery/
├── index.html        الصور كلينكات، والـ dialog فاضي مستني
├── css/
│   └── styles.css    الـ grid، والـ dialog و ::backdrop
├── js/
│   └── app.js        بيملا الـ dialog ويفتحه، والأسهم
└── images/
    ├── 1.svg … 6.svg  الصور (هنا رسومات SVG صغيرة؛ في مشروعك صورك JPG أو WebP)
~~~

### تشغّله إزاي

~~~powershell
mkdir photo-gallery; cd photo-gallery
mkdir css, js, images
ni index.html, css/styles.css, js/app.js
ni images/1.svg, images/2.svg, images/3.svg, images/4.svg, images/5.svg, images/6.svg
code .
npx serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (Git Bash: [[mkdir -p photo-gallery/{css,js,images} && cd photo-gallery && touch index.html css/styles.css js/app.js images/{1..6}.svg]]. و [[{1..6}]] بتتفك لـ ٦ أسامي.) ولو عندك صور حقيقية حطها في [[images/]] وغيّر الأسامي في الـ HTML.

### لو مشتغلش

- **[[TypeError: Cannot read properties of undefined (reading 'querySelector')]] لما تدوس «→» على أول صورة:** أول نسخة كانت [[current = i % links.length]]. في JavaScript [[-1 % 6]] = [[-1]] مش [[5]]، فـ [[links[-1]]] = [[undefined]]. التصليح: [[(i + links.length) % links.length]]. (قستها: الرسالة طلعت عند [[app.js:10:32]] والعدّاد فضل «١ من ٦».)
- **الصورة الكبيرة مش ظاهرة:** لو مسار [[images/2.svg]] غلط، Network فيه [[2.svg 404]]، والـ [[<img>]] بيبان مكسور. واسم الملف لازم بنفس الحروف الصغيرة على السيرفر.
- **فتحته بدبل كليك:** الصور بتظهر، بس الدوسة بتفتح الصورة في الصفحة كلها بدل الـ dialog، و Console: [[Access to script at 'file:///C:/Users/ali/photo-gallery/js/app.js' from origin 'null' has been blocked by CORS policy: ...]]. ده نفسه سلوك «من غير JS»، فالصفحة لسه بتشتغل. سيرفر محلي.

### إزاي التلاتة مربوطين

| الـ HTML بيدي | الـ JS بيعمل | الـ CSS بيرسم |
|---|---|---|
| [[<ul class="js-grid">]] فيه [[<a href="images/N.svg">]] حوالين كل [[<img alt>]] | listener واحد على الـ [[<ul>]]، و [[closest("a")]]، و [[preventDefault()]] | [[.grid]] بـ [[auto-fill]] و [[minmax(min(100%, 220px), 1fr)]] |
| [[<dialog id="box" closedby="any">]] فاضي | [[show(i)]] بتملا [[src]] و [[alt]] والنص، و [[showModal()]] | [[.lightbox]] و [[::backdrop]] و [[object-fit: contain]] |
| [[<button commandfor="box" command="close">]] | — (HTML بيقفل لوحده) | [[.controls .close]] على الطرف |
| [[alt]] كل صورة | بيبقى الوصف تحت الصورة الكبيرة ونص بديل ليها | — |
| — | [[keydown]] على الـ dialog: الأسهم | — |

**الحدث ← الحالة ← العرض:** دوسة أو سهم ← [[current]] (رقم واحد) ← [[show()]] بتكتب الصورة والوصف والعدّاد. والبيانات (مسار الصورة ووصفها) **في الـ HTML**: الـ JS بيقراها من اللينكات، فمفيش array في الـ JS تتكرر فيها نفس المعلومات ويتنسى يتحدث.

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>رحلات سارة: معرض الصور</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <main>
    <h1>رحلات سارة</h1>
    <p class="hint">دوس على أي صورة تكبر، والأسهم بتقلّب.</p>
    <ul class="grid js-grid">
      <li><a href="images/1.svg"><img src="images/1.svg" alt="بحر أزرق قبل الغروب" width="600" height="400" loading="lazy"></a></li>
      <li><a href="images/2.svg"><img src="images/2.svg" alt="كثبان رملية في الصحرا" width="600" height="400" loading="lazy"></a></li>
      <li><a href="images/3.svg"><img src="images/3.svg" alt="غيط برسيم أخضر" width="600" height="400" loading="lazy"></a></li>
      <li><a href="images/4.svg"><img src="images/4.svg" alt="سما بنفسجي وقت الغروب" width="600" height="400" loading="lazy"></a></li>
      <li><a href="images/5.svg"><img src="images/5.svg" alt="سوق مليان فوانيس حمرا" width="600" height="400" loading="lazy"></a></li>
      <li><a href="images/6.svg"><img src="images/6.svg" alt="شارع بالليل" width="600" height="400" loading="lazy"></a></li>
    </ul>
  </main>
  <dialog id="box" class="lightbox js-box" closedby="any" aria-labelledby="box-caption">
    <figure>
      <img class="js-big" src="" alt="">
      <figcaption id="box-caption"><span class="js-caption"></span> <span class="count js-count"></span></figcaption>
    </figure>
    <div class="controls">
      <button type="button" class="js-prev" aria-label="الصورة اللي قبلها">→</button>
      <button type="button" class="js-next" aria-label="الصورة اللي بعدها">←</button>
      <button type="button" commandfor="box" command="close" class="close" aria-label="اقفل">✕</button>
    </div>
  </dialog>
</body>
</html>
~~~

~~~css css/styles.css
:root { --ink: #0f172a; --line: #e2e8f0; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: #f8fafc; }
main { max-width: 1100px; margin: auto; padding: 16px; }
h1 { margin: 0; }
.hint { color: #475569; margin-top: 0; }
.grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); }
.grid a { display: block; border-radius: 10px; overflow: hidden; }
.grid img { display: block; width: 100%; height: auto; transition: scale .2s; }
.grid a:hover img { scale: 1.04; }
.grid a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
.lightbox { width: min(900px, 100vw - 32px); max-height: calc(100dvh - 32px); padding: 0; border: 0; border-radius: 14px; background: #0f172a; color: #fff; }
.lightbox::backdrop { background: #000c; }
.lightbox figure { margin: 0; }
.lightbox img { display: block; width: 100%; max-height: 70dvh; object-fit: contain; background: #000; }
.lightbox figcaption { padding: 8px 14px; }
.count { color: #94a3b8; }
.controls { display: flex; gap: 8px; padding: 0 14px 14px; }
.controls button { font: inherit; font-size: 1.2rem; min-width: 44px; height: 44px; border-radius: 8px; border: 1px solid #475569; background: #1e293b; color: #fff; cursor: pointer; }
.controls .close { margin-inline-start: auto; }
.controls button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .grid img { transition: none; } }
~~~

~~~js js/app.js
const grid = document.querySelector(".js-grid");
const box = document.querySelector(".js-box");
const big = box.querySelector(".js-big");
const links = [...grid.querySelectorAll("a")];
const nums = new Intl.NumberFormat("ar-EG");
let current = 0;

function show(i) {
  current = (i + links.length) % links.length; // بعد الأخيرة ترجع للأولى، وقبل الأولى للأخيرة
  const thumb = links[current].querySelector("img");
  big.src = links[current].href;
  big.alt = thumb.alt;
  box.querySelector(".js-caption").textContent = thumb.alt;
  box.querySelector(".js-count").textContent = nums.format(current + 1) + " من " + nums.format(links.length);
}

grid.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  e.preventDefault();
  show(links.indexOf(link));
  box.showModal();
});

box.querySelector(".js-next").addEventListener("click", () => show(current + 1));
box.querySelector(".js-prev").addEventListener("click", () => show(current - 1));

box.addEventListener("keydown", (e) => {
  // في صفحة RTL «اللي بعدها» على الشمال، فالسهم الشمال بيقدّم
  if (e.key === "ArrowLeft") show(current + 1);
  if (e.key === "ArrowRight") show(current - 1);
});
~~~

والصور (واحدة كمثال، والباقيين بنفس الشكل بألوان وكلمة مختلفة):

~~~html images/1.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#0c4a6e"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="150" cy="140" r="50" fill="#fff8"/><text x="300" y="320" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#fff">بحر</text></svg>
~~~

~~~html images/2.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#7c2d12"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="210" cy="140" r="50" fill="#fff8"/><text x="300" y="320" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#fff">صحرا</text></svg>
~~~

~~~html images/3.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#22c55e"/><stop offset="1" stop-color="#14532d"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="270" cy="140" r="50" fill="#fff8"/><text x="300" y="320" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#fff">غيط</text></svg>
~~~

~~~html images/4.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#a855f7"/><stop offset="1" stop-color="#3b0764"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="330" cy="140" r="50" fill="#fff8"/><text x="300" y="320" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#fff">غروب</text></svg>
~~~

~~~html images/5.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#450a0a"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="390" cy="140" r="50" fill="#fff8"/><text x="300" y="320" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#fff">سوق</text></svg>
~~~

~~~html images/6.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="#64748b"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><circle cx="450" cy="140" r="50" fill="#fff8"/><text x="300" y="320" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#fff">ليل</text></svg>
~~~

### أهم الحتت

- **[[minmax(min(100%, 220px), 1fr)]]:** كل عمود ٢٢٠px على الأقل، بس لو الشاشة أصغر من ٢٢٠ يبقى [[100%]]، فمفيش scroll أفقي على موبايل صغير. و [[auto-fill]] بيحط أعمدة قد ما يكفي.
- **[[width="600" height="400"]]** على كل [[<img>]]: المتصفح بيحجز المكان بالنسبة دي قبل ما الصورة توصل، فالصفحة متنطّش. و [[loading="lazy"]] بيأجل الصور اللي تحت.
- **[[showModal()]] من JS** مش [[command="show-modal"]] على اللينكات: لازم نعرف أنهي صورة اتداست ونملا الـ dialog الأول. أما القفل فـ HTML ([[command="close"]] و [[closedby]] و Escape).
- **الـ focus:** [[showModal()]] بيحطه على أول زرار جوه، ولما الـ dialog يتقفل بيرجّعه للعنصر اللي كان عليه قبل الفتح (اللينك). مكتبناش ولا سطر لده.
- **[[keydown]] على الـ dialog مش على [[document]]:** الأسهم تشتغل بس والمعرض مفتوح، ومتبوظش الـ scroll في الصفحة.
- **[[max-height: 70dvh]]:** [[dvh]] ارتفاع الشاشة الفعلي على الموبايل (بعد شريط المتصفح)، فالصورة والأزرار دايمًا جوه الشاشة.

### اتقاس (Chrome 158، Playwright، من سيرفر محلي)

~~~text
Tab لتاني صورة + Enter:   open=true، «كثبان رملية في الصحرا» «٢ من ٦»، الـ focus على زرار «→»
سهم شمال:                «غيط برسيم أخضر» «٣ من ٦»
سهم يمين ٣ مرات:          «شارع بالليل» «٦ من ٦» (لف من الأولى للأخيرة)
Escape:                  open=false، والـ focus على لينك images/2.svg
السادسة ثم «←»:           «بحر أزرق قبل الغروب» «١ من ٦»
✕:                       open=false
JS مقفول، دوسة على التالتة: المتصفح فتح images/3.svg
axe-core 4.10.2:         0 violations والـ dialog مقفول، و 0 وهو مفتوح
الـ grid:                360 ← عمود (scrollWidth 345)، 768 ← ٣ أعمدة، 1280 ← ٤ أعمدة، مفيش scroll أفقي
page errors:             ولا واحد
~~~` },
        { lvl: 'متوسط', dir: "table-booking", t: R`حجز ترابيزة في ٣ خطوات`, what: R`فورم حجز لمطعم متخيّل مقسوم ٣ خطوات: الميعاد (يوم من النهارده وطالع، وساعة، وعدد من ١ لـ ٨)، وبياناتك (اسم وموبايل مصري وملاحظات بعدّاد حروف)، وتأكيد بيعرض اللي اخترته. شريط تقدّم وأسماء الخطوات فوق، و «التالي» مبيعدّيش وفيه غلط (برسايل عربي)، و «رجوع» بيحتفظ باللي كتبته، والـ focus بيروح لعنوان الخطوة الجديدة، و «احجز» بيبعت لـ [[/api/book]] ويعرض رقم الحجز. **من غير JS** الخطوات التلاتة ظاهرة تحت بعض والفورم بيتبعت عادي. من دروس «الفورم من التلاتة» و «الحالة ← الصفحة» و «الجسر».`, done: R`«التالي» فاضي بيقول «اختار اليوم» وميتحركش، وتاريخ قديم «اختار النهارده أو بعده»، و ١٢ فرد «أكتر حاجة ٨ أفراد»، وموبايل ١٠ أرقام بيترفض، والمراجعة فيها كل اللي كتبته، والسيرفر رجّع رقم حجز، والـ JS مقفول: الخطوات كلها ظاهرة والإرسال بيرجع [[{"ok":true,...}]]. axe صفر، ومفيش scroll أفقي على 360 و 768 و 1280.`, sol: R`~~~view 620 620 الشكل النهائي: املا الخطوات واحجز
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>احجز ترابيزة: مطعم ورقة عنب</title>
  <style>
:root { --brand: #15803d; --ink: #14532d; --line: #bbf7d0; --bad: #b91c1c; --progress: 0; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #0f172a; background: #f0fdf4; }
main { max-width: 480px; margin: auto; padding: 16px; }
h1 { margin: 0 0 8px; color: var(--ink); }
.steps { display: flex; justify-content: space-between; list-style: none; margin: 0; padding: 0; color: #64748b; font-size: .9rem; }
.steps li[aria-current="step"] { color: var(--ink); font-weight: 800; }
.progress { height: 6px; margin: 6px 0 12px; border-radius: 3px; background: var(--line); overflow: hidden; }
.progress::after { content: ""; display: block; height: 100%; width: calc(var(--progress) * 100%); background: var(--brand); transition: width .3s; }
.step { display: grid; gap: 4px; margin: 0 0 12px; padding: 12px 16px 16px; border: 1px solid var(--line); border-radius: 12px; background: #fff; }
.step[hidden] { display: none; } /* display: grid اللي فوق أقوى من [hidden] بتاع المتصفح */
legend { font-weight: 800; padding: 0 6px; }
label { font-weight: 700; margin-top: 6px; }
input, select, textarea { font: inherit; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; background: #fff; }
:is(input, select, textarea):user-invalid { border-color: var(--bad); background: #fef2f2; }
:is(input, select, textarea, button):focus-visible, legend:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
#phone { direction: ltr; text-align: right; }
small { color: #475569; }
.review { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; margin: 0; }
.review dt { color: #475569; }
.review dd { margin: 0; font-weight: 700; }
.nav { display: flex; gap: 8px; }
.nav button { font: inherit; font-weight: 700; padding: 10px 18px; border-radius: 8px; border: 2px solid var(--brand); cursor: pointer; }
.js-back { background: #fff; color: var(--brand); }
.js-next, .js-submit { margin-inline-start: auto; background: var(--brand); color: #fff; }
.js-submit:disabled { opacity: .6; cursor: progress; }
.status:empty { display: none; }
.status { padding: 8px; border-radius: 8px; background: #dcfce7; color: var(--ink); font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .progress::after { transition: none; } }
</style>
  <script>
// في الـ preview مفيش سيرفر: الـ fetch لـ /api/book بيرد هنا بنفس رد server.mjs
const realFetch = window.fetch;
window.fetch = async (url, opts) => {
  if (!String(url).endsWith("/api/book")) return realFetch(url, opts);
  await new Promise((r) => setTimeout(r, 400));
  const data = JSON.parse(opts.body || "{}");
  const ok = data.date && data.time && /^01[0125][0-9]{8}$/.test(data.phone || "");
  const body = ok ? { ok: true, code: "W-" + Math.floor(1000 + Math.random() * 9000) } : { message: "بيانات ناقصة" };
  return new Response(JSON.stringify(body), { status: ok ? 200 : 400, headers: { "Content-Type": "application/json" } });
};
</script>
<script type="module">
const form = document.querySelector(".js-wizard");
const steps = [...form.querySelectorAll(".step")];
const stepList = document.querySelector(".js-steps");
const back = form.querySelector(".js-back");
const next = form.querySelector(".js-next");
const submit = form.querySelector(".js-submit");
const LAST = steps.length;
const MESSAGES = {
  date: { valueMissing: "اختار اليوم", rangeUnderflow: "اختار النهارده أو بعده" },
  time: { valueMissing: "اختار الساعة" },
  guests: { valueMissing: "اكتب العدد", rangeUnderflow: "فرد واحد على الأقل", rangeOverflow: "أكتر حاجة ٨ أفراد" },
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم حرفين على الأقل" },
  phone: { valueMissing: "اكتب موبايلك", patternMismatch: "١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" },
};
const LABELS = { date: "اليوم", time: "الساعة", guests: "الأفراد", name: "الاسم", phone: "الموبايل", notes: "ملاحظات" };

// JS شغال: نقسّم الفورم خطوات ونعرض الرسايل بنفسنا. من غيره الفورم كله ظاهر وبيتبعت عادي
const state = { step: 1 };
form.noValidate = true;
stepList.hidden = false;

// أقل يوم = النهارده بتوقيت الجهاز (toISOString بيرجّع UTC، وبعد ١٢ بالليل في مصر ممكن يطلع امبارح)
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
form.elements.date.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

function check(el) {
  if (!el.name || !el.willValidate) return true;
  el.setCustomValidity("");
  const rules = MESSAGES[el.name] || {};
  for (const flag in rules) {
    if (el.validity[flag]) {
      el.setCustomValidity(rules[flag]);
      break;
    }
  }
  return el.checkValidity();
}

function stepIsValid(n) {
  const bad = [...steps[n - 1].elements].filter((el) => !check(el));
  if (bad.length) bad[0].reportValidity();
  return bad.length === 0;
}

function renderReview() {
  const review = form.querySelector(".js-review");
  review.replaceChildren();
  for (const [key, value] of new FormData(form)) {
    if (!value) continue;
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = LABELS[key];
    dd.textContent = value;
    review.append(dt, dd);
  }
}

function render(moveFocus) {
  steps.forEach((s, i) => { s.hidden = i + 1 !== state.step; });
  for (const li of stepList.children) {
    if (Number(li.dataset.step) === state.step) li.setAttribute("aria-current", "step");
    else li.removeAttribute("aria-current");
  }
  document.documentElement.style.setProperty("--progress", (state.step - 1) / (LAST - 1));
  back.hidden = state.step === 1;
  next.hidden = state.step === LAST;
  submit.hidden = state.step !== LAST;
  if (state.step === LAST) renderReview();
  if (moveFocus) steps[state.step - 1].querySelector("legend").focus();
}

next.addEventListener("click", () => {
  if (!stepIsValid(state.step)) return;
  state.step++;
  render(true);
});

back.addEventListener("click", () => {
  state.step--;
  render(true);
});

form.addEventListener("input", (e) => {
  check(e.target);
  if (e.target.name === "notes") {
    const left = e.target.maxLength - e.target.value.length;
    form.querySelector(".js-count").textContent = "فاضل " + left.toLocaleString("ar-EG") + " حرف";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (state.step !== LAST) return; // Enter في حقل قبل الخطوة الأخيرة ميبعتش
  submit.disabled = true;
  const status = form.querySelector(".js-status");
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    status.textContent = "اتحجز. رقم الحجز " + data.code + "، وهنكلمك على الموبايل.";
    submit.hidden = true;
    back.hidden = true;
    steps[LAST - 1].querySelector("legend").focus(); // الزرار اللي كان عليه الـ focus اختفى
  } catch {
    status.textContent = "الحجز متبعتش، جرّب تاني.";
  } finally {
    submit.disabled = false;
  }
});

render(false);
</script>
</head>
<body>
  <main>
    <h1>احجز ترابيزة</h1>
    <ol class="steps js-steps" hidden>
      <li data-step="1">الميعاد</li>
      <li data-step="2">بياناتك</li>
      <li data-step="3">تأكيد</li>
    </ol>
    <div class="progress" aria-hidden="true"></div>
    <form class="wizard js-wizard" action="/api/book" method="post">
      <fieldset class="step" data-step="1">
        <legend tabindex="-1">١. الميعاد</legend>
        <label for="date">اليوم</label>
        <input id="date" name="date" type="date" required>
        <label for="time">الساعة</label>
        <select id="time" name="time" required>
          <option value="">اختار</option>
          <option>13:00</option><option>15:00</option><option>19:00</option><option>21:00</option>
        </select>
        <label for="guests">عدد الأفراد</label>
        <input id="guests" name="guests" type="number" min="1" max="8" value="2" required>
      </fieldset>
      <fieldset class="step" data-step="2">
        <legend tabindex="-1">٢. بياناتك</legend>
        <label for="name">الاسم</label>
        <input id="name" name="name" required minlength="2" autocomplete="name">
        <label for="phone">الموبايل</label>
        <input id="phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel">
        <label for="notes">ملاحظات (اختياري)</label>
        <textarea id="notes" name="notes" maxlength="200" rows="3" aria-describedby="notes-count"></textarea>
        <small id="notes-count" class="js-count">فاضل ٢٠٠ حرف</small>
      </fieldset>
      <fieldset class="step" data-step="3">
        <legend tabindex="-1">٣. راجع واحجز</legend>
        <dl class="review js-review"></dl>
        <p class="status js-status" role="status"></p>
      </fieldset>
      <div class="nav">
        <button type="button" class="js-back" hidden>رجوع</button>
        <button type="button" class="js-next" hidden>التالي</button>
        <button type="submit" class="js-submit">احجز</button>
      </div>
    </form>
  </main>
</body>
</html>
~~~

**هتشوف إيه:** عنوان أخضر «احجز ترابيزة»، وتحته «الميعاد ‧ بياناتك ‧ تأكيد» والأولى تقيلة، وشريط تقدّم فاضي. كارت أبيض فيه «١. الميعاد»: تاريخ وقايمة ساعات وعدد أفراد، و «التالي» أخضر على الشمال. كل خطوة الشريط بيتملا نصه ثم كله، و «رجوع» بيظهر على اليمين. في الآخر لستة بكل اللي اخترته، و «احجز»، وبعدها «اتحجز. رقم الحجز W-…».

### الملفات

~~~text table-booking/
table-booking/
├── index.html       فورم واحد فيه ٣ fieldset (شغال كفورم عادي من غير JS)
├── css/
│   └── styles.css   الخطوات، والشريط من --progress، و :user-invalid
├── js/
│   └── app.js       الخطوة الحالية، والتحقق لكل خطوة، والمراجعة، والإرسال
└── server.mjs       سيرفر درس «تشغّل المشروع وتعرضه» + جزء /api/book
~~~

### تشغّله إزاي

~~~powershell
mkdir table-booking; cd table-booking
mkdir css, js
ni index.html, css/styles.css, js/app.js, server.mjs
code .
node server.mjs
~~~

[[server.mjs]] هو اللي في درس «تشغّل المشروع وتعرضه» بالظبط، وزوّد الجزء ده قبل سطر [[const file = …]]:

~~~js server.mjs (الجزء الجديد)
  if (req.method === "POST" && path === "/api/book") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const data = req.headers["content-type"]?.includes("json")
      ? JSON.parse(body || "{}")
      : Object.fromEntries(new URLSearchParams(body));
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!data.date || !data.time || !/^01[0125][0-9]{8}$/.test(data.phone || "")) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "بيانات ناقصة" }));
    }
    const code = "W-" + Math.floor(1000 + Math.random() * 9000);
    console.log("حجز جديد:", code, data.date, data.time, data.guests);
    return res.end(JSON.stringify({ ok: true, code }));
  }
~~~

وافتح [[http://localhost:8080]]. (هنا [[npx serve]] مش كفاية: بيبعت ملفات بس ومعندوش [[/api/book]]، فالطلب مش هيرجع [[ok]] وهيظهر «الحجز متبعتش، جرّب تاني».)

### لو مشتغلش

- **الخطوات التلاتة ظاهرة مع بعض والـ JS شغال:** الـ JS حط [[hidden]] صح (قسته: [[false, true, true]])، بس الـ [[display]] المحسوب كان [[grid]] للتلاتة. السبب إن [[.step { display: grid }]] بتاعي أقوى من [[[hidden] { display: none }]] بتاع المتصفح (أي قاعدة في ملفك بتغلب ستايل المتصفح). التصليح سطر: [[.step[hidden] { display: none; }]]. بعده [[grid, none, none]]. والأزرار مكانش فيها المشكلة لأن [[.nav button]] مبيكتبش [[display]].
- **Enter في حقل في الخطوة الأولى:** المتصفح بيعتبره إرسال للفورم (implicit submission). من غير سطر [[if (state.step !== LAST) return]] كان هيبعت الحجز ناقص. قسته: Enter في «عدد الأفراد» والخطوة فضلت الأولى ومفيش طلب.
- **بعد «احجز» الـ focus ضاع:** الزرار اللي كان عليه الـ focus اختفى ([[hidden]])، فالـ focus راح للـ [[<body>]] (قسته: [[BODY]]). التصليح: [[legend.focus()]] بتاع الخطوة الأخيرة، و [[tabindex="-1"]] على الـ [[<legend>]] عشان يقبل focus من JS بس.
- **فتحته بدبل كليك:** الخطوات التلاتة ظاهرة (زي من غير JS)، و Console: [[Access to script at 'file:///C:/Users/ali/table-booking/js/app.js' from origin 'null' has been blocked by CORS policy: ...]].

### إزاي التلاتة مربوطين

| الـ HTML بيدي | الـ JS بيعمل | الـ CSS بيرسم |
|---|---|---|
| [[<fieldset class="step">]] × ٣ و [[<legend tabindex="-1">]] | [[hidden]] على كل خطوة غير الحالية، و [[focus()]] على الـ legend | [[.step[hidden]]] مخفي |
| [[<ol class="js-steps" hidden>]] | يظهرها، و [[aria-current="step"]] على الحالية | [[li[aria-current="step"]]] تقيل |
| [[<div class="progress" aria-hidden="true">]] | [[--progress]] = ٠ أو ٠٫٥ أو ١ على [[<html>]] | [[.progress::after]] عرضه منها |
| [[required]] و [[min]] و [[max]] و [[pattern]] و [[minlength]] و [[maxlength]] | [[setCustomValidity]] برسايل عربي، و [[reportValidity]] على أول غلط في الخطوة | [[:user-invalid]] أحمر |
| أزرار «رجوع» و «التالي» [[hidden]]، و «احجز» ظاهر | يظهر ويخفي حسب الخطوة | — |
| [[action="/api/book"]] | [[fetch]] JSON، والزرار متقفل وقت الطلب | [[:disabled]] |

**الحدث ← الحالة ← العرض:** «التالي» ← [[stepIsValid(state.step)]] ← [[state.step++]] ← [[render(true)]]. الحالة رقم واحد بس، وكل اللي اليوزر كتبه فاضل في الحقول نفسها (مش بنمسحها لما نخفيها)، فـ «رجوع» بيلاقي كل حاجة.

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>احجز ترابيزة: مطعم ورقة عنب</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <main>
    <h1>احجز ترابيزة</h1>
    <ol class="steps js-steps" hidden>
      <li data-step="1">الميعاد</li>
      <li data-step="2">بياناتك</li>
      <li data-step="3">تأكيد</li>
    </ol>
    <div class="progress" aria-hidden="true"></div>
    <form class="wizard js-wizard" action="/api/book" method="post">
      <fieldset class="step" data-step="1">
        <legend tabindex="-1">١. الميعاد</legend>
        <label for="date">اليوم</label>
        <input id="date" name="date" type="date" required>
        <label for="time">الساعة</label>
        <select id="time" name="time" required>
          <option value="">اختار</option>
          <option>13:00</option><option>15:00</option><option>19:00</option><option>21:00</option>
        </select>
        <label for="guests">عدد الأفراد</label>
        <input id="guests" name="guests" type="number" min="1" max="8" value="2" required>
      </fieldset>
      <fieldset class="step" data-step="2">
        <legend tabindex="-1">٢. بياناتك</legend>
        <label for="name">الاسم</label>
        <input id="name" name="name" required minlength="2" autocomplete="name">
        <label for="phone">الموبايل</label>
        <input id="phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel">
        <label for="notes">ملاحظات (اختياري)</label>
        <textarea id="notes" name="notes" maxlength="200" rows="3" aria-describedby="notes-count"></textarea>
        <small id="notes-count" class="js-count">فاضل ٢٠٠ حرف</small>
      </fieldset>
      <fieldset class="step" data-step="3">
        <legend tabindex="-1">٣. راجع واحجز</legend>
        <dl class="review js-review"></dl>
        <p class="status js-status" role="status"></p>
      </fieldset>
      <div class="nav">
        <button type="button" class="js-back" hidden>رجوع</button>
        <button type="button" class="js-next" hidden>التالي</button>
        <button type="submit" class="js-submit">احجز</button>
      </div>
    </form>
  </main>
</body>
</html>
~~~

~~~css css/styles.css
:root { --brand: #15803d; --ink: #14532d; --line: #bbf7d0; --bad: #b91c1c; --progress: 0; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #0f172a; background: #f0fdf4; }
main { max-width: 480px; margin: auto; padding: 16px; }
h1 { margin: 0 0 8px; color: var(--ink); }
.steps { display: flex; justify-content: space-between; list-style: none; margin: 0; padding: 0; color: #64748b; font-size: .9rem; }
.steps li[aria-current="step"] { color: var(--ink); font-weight: 800; }
.progress { height: 6px; margin: 6px 0 12px; border-radius: 3px; background: var(--line); overflow: hidden; }
.progress::after { content: ""; display: block; height: 100%; width: calc(var(--progress) * 100%); background: var(--brand); transition: width .3s; }
.step { display: grid; gap: 4px; margin: 0 0 12px; padding: 12px 16px 16px; border: 1px solid var(--line); border-radius: 12px; background: #fff; }
.step[hidden] { display: none; } /* display: grid اللي فوق أقوى من [hidden] بتاع المتصفح */
legend { font-weight: 800; padding: 0 6px; }
label { font-weight: 700; margin-top: 6px; }
input, select, textarea { font: inherit; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; background: #fff; }
:is(input, select, textarea):user-invalid { border-color: var(--bad); background: #fef2f2; }
:is(input, select, textarea, button):focus-visible, legend:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
#phone { direction: ltr; text-align: right; }
small { color: #475569; }
.review { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; margin: 0; }
.review dt { color: #475569; }
.review dd { margin: 0; font-weight: 700; }
.nav { display: flex; gap: 8px; }
.nav button { font: inherit; font-weight: 700; padding: 10px 18px; border-radius: 8px; border: 2px solid var(--brand); cursor: pointer; }
.js-back { background: #fff; color: var(--brand); }
.js-next, .js-submit { margin-inline-start: auto; background: var(--brand); color: #fff; }
.js-submit:disabled { opacity: .6; cursor: progress; }
.status:empty { display: none; }
.status { padding: 8px; border-radius: 8px; background: #dcfce7; color: var(--ink); font-weight: 700; }
@media (prefers-reduced-motion: reduce) { .progress::after { transition: none; } }
~~~

~~~js js/app.js
const form = document.querySelector(".js-wizard");
const steps = [...form.querySelectorAll(".step")];
const stepList = document.querySelector(".js-steps");
const back = form.querySelector(".js-back");
const next = form.querySelector(".js-next");
const submit = form.querySelector(".js-submit");
const LAST = steps.length;
const MESSAGES = {
  date: { valueMissing: "اختار اليوم", rangeUnderflow: "اختار النهارده أو بعده" },
  time: { valueMissing: "اختار الساعة" },
  guests: { valueMissing: "اكتب العدد", rangeUnderflow: "فرد واحد على الأقل", rangeOverflow: "أكتر حاجة ٨ أفراد" },
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم حرفين على الأقل" },
  phone: { valueMissing: "اكتب موبايلك", patternMismatch: "١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" },
};
const LABELS = { date: "اليوم", time: "الساعة", guests: "الأفراد", name: "الاسم", phone: "الموبايل", notes: "ملاحظات" };

// JS شغال: نقسّم الفورم خطوات ونعرض الرسايل بنفسنا. من غيره الفورم كله ظاهر وبيتبعت عادي
const state = { step: 1 };
form.noValidate = true;
stepList.hidden = false;

// أقل يوم = النهارده بتوقيت الجهاز (toISOString بيرجّع UTC، وبعد ١٢ بالليل في مصر ممكن يطلع امبارح)
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
form.elements.date.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

function check(el) {
  if (!el.name || !el.willValidate) return true;
  el.setCustomValidity("");
  const rules = MESSAGES[el.name] || {};
  for (const flag in rules) {
    if (el.validity[flag]) {
      el.setCustomValidity(rules[flag]);
      break;
    }
  }
  return el.checkValidity();
}

function stepIsValid(n) {
  const bad = [...steps[n - 1].elements].filter((el) => !check(el));
  if (bad.length) bad[0].reportValidity();
  return bad.length === 0;
}

function renderReview() {
  const review = form.querySelector(".js-review");
  review.replaceChildren();
  for (const [key, value] of new FormData(form)) {
    if (!value) continue;
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = LABELS[key];
    dd.textContent = value;
    review.append(dt, dd);
  }
}

function render(moveFocus) {
  steps.forEach((s, i) => { s.hidden = i + 1 !== state.step; });
  for (const li of stepList.children) {
    if (Number(li.dataset.step) === state.step) li.setAttribute("aria-current", "step");
    else li.removeAttribute("aria-current");
  }
  document.documentElement.style.setProperty("--progress", (state.step - 1) / (LAST - 1));
  back.hidden = state.step === 1;
  next.hidden = state.step === LAST;
  submit.hidden = state.step !== LAST;
  if (state.step === LAST) renderReview();
  if (moveFocus) steps[state.step - 1].querySelector("legend").focus();
}

next.addEventListener("click", () => {
  if (!stepIsValid(state.step)) return;
  state.step++;
  render(true);
});

back.addEventListener("click", () => {
  state.step--;
  render(true);
});

form.addEventListener("input", (e) => {
  check(e.target);
  if (e.target.name === "notes") {
    const left = e.target.maxLength - e.target.value.length;
    form.querySelector(".js-count").textContent = "فاضل " + left.toLocaleString("ar-EG") + " حرف";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (state.step !== LAST) return; // Enter في حقل قبل الخطوة الأخيرة ميبعتش
  submit.disabled = true;
  const status = form.querySelector(".js-status");
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    status.textContent = "اتحجز. رقم الحجز " + data.code + "، وهنكلمك على الموبايل.";
    submit.hidden = true;
    back.hidden = true;
    steps[LAST - 1].querySelector("legend").focus(); // الزرار اللي كان عليه الـ focus اختفى
  } catch {
    status.textContent = "الحجز متبعتش، جرّب تاني.";
  } finally {
    submit.disabled = false;
  }
});

render(false);
~~~

### أهم الحتت

- **الفورم واحد مش ٣:** [[FormData]] في الآخر بيقرا كل الحقول حتى المخفية، والإرسال من غير JS بيبعت كله مرة واحدة.
- **[[stepIsValid(n)]]:** [[steps[n - 1].elements]] حقول الـ fieldset ده بس، فالتحقق خطوة بخطوة. و [[filter]] بيلم الغلط كله ويعرض أوله.
- **[[el.willValidate]]:** الأزرار والـ fieldset مش بيتحققوا، فبنعدّيهم.
- **أقل تاريخ بتوقيت الجهاز:** [[new Date().toISOString().slice(0, 10)]] بيرجّع التاريخ بـ UTC، فبعد ١٢ بالليل في مصر (UTC+2) بيقول امبارح. عشان كده [[getFullYear()]] و [[getMonth() + 1]] و [[getDate()]].
- **المراجعة بـ [[textContent]]:** الاسم والملاحظات من اليوزر، فمفيش [[innerHTML]] (درس «innerHTML هي الباب»).
- **[[#phone { direction: ltr; text-align: right; }]]:** الأرقام تتكتب من الشمال لليمين، والحقل لسه محاذي يمين مع باقي الفورم.

### اتقاس (Chrome 158، Playwright، server.mjs على localhost)

~~~text
أول ما فتحت:              الخطوات [ظاهر، مخفي، مخفي]، «الميعاد» حالية، --progress 0، أزرار: التالي بس
«التالي» فاضي:            «اختار اليوم»، والـ focus على حقل التاريخ، والخطوة زي ما هي
تاريخ 2020-01-01:         «اختار النهارده أو بعده» (min = 2026-11-21)
١٢ فرد:                   «أكتر حاجة ٨ أفراد»
الخطوة ٢:                 --progress 0.5، الـ focus على «٢. بياناتك»، أزرار: رجوع و التالي
موبايل 0101234567:        «١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015»
ملاحظات ١٨ حرف:          «فاضل ١٨٢ حرف»
الخطوة ٣:                 المراجعة: اليوم 2026-11-24، الساعة 19:00، الأفراد 4، الاسم سارة، الموبايل 01012345678، ملاحظات
«رجوع» ثم «التالي»:       الحقول فاضلة زي ما هي
«احجز»:                   «اتحجز. رقم الحجز W-5348، وهنكلمك على الموبايل.»، والـ focus على «٣. راجع واحجز»
الترمنال:                 حجز جديد: W-5348 2026-11-24 19:00 4
JS مقفول:                 الخطوات الـ ٣ ظاهرة، والإرسال راح /api/book ورجع 200 {"ok":true,"code":"W-7230"}
axe-core 4.10.2:          0 violations
scrollWidth:              360 ← 360، 768 ← 768، 1280 ← 1280
page errors:              ولا واحد
~~~` },
        { lvl: 'كبير', dir: "mini-shop", t: R`متجر صغير: منتجات من JSON وفلتر وسلة جانبية وطلب`, what: R`متجر فخّار متخيّل: المنتجات بتيجي من [[data/products.json]] بـ [[fetch]] وبتترسم من [[<template>]]، وبحث وأقسام (radio) بيتكتبوا في الرابط ([[?q=كبير&cat=plates]]) فالـ refresh والمشاركة بيرجّعوا نفس الفلتر. «أضف للسلة» بيزوّد، والسلة [[<dialog>]] بتطلع من الجنب بزرار من غير JS ([[command="show-modal"]])، وفيها [[−]] و [[+]] و «شيل» والإجمالي، وبتفضل بعد الـ refresh ([[localStorage]] في [[try]]). وتحتها فورم توصيل برسايل عربي بيبعت لـ [[/api/order]]، و **السيرفر بيحسب الإجمالي بنفسه** من الأسعار اللي عنده. ٤ ملفات ومعاهم [[server.mjs]]. من كل دروس الوحدة.`, done: R`الأقسام والبحث بيغيّروا الرابط وبيرجعوا بعد الـ refresh، والسلة فضلت بعد الـ refresh، و [[−]] لحد الصفر بيشيل المنتج والـ focus بيروح لحاجة موجودة، والطلب الفاضي بيقول «اكتب اسمك»، والطلب الصح بيرجّع رقم وإجمالي من السيرفر، وطلب متلاعب فيه ([[{ "mug-blue": 1000 }]]) بيرجع 400. axe صفر والسلة مقفولة ومفتوحة، والـ grid عمود على 360 و ٣ على 768 و ٥ على 1280 من غير scroll أفقي، ومفيش page errors.`, ext: R`زوّد ترتيب (السعر طالع ونازل) في الرابط كمان، وصفحة لكل منتج [[product.html?id=mug-blue]] بتقرا نفس الـ JSON، والسيرفر يحفظ الطلبات في ملف [[orders.json]] ويرجّعها في [[/api/orders]] لصفحة أدمن بسيطة.`, sol: R`~~~view 640 640 الشكل النهائي: فلتر، وضيف منتجات، وافتح السلة واطلب
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>متجر فخّار</title>
  <style>
:root { --brand: #9a3412; --ink: #1c1917; --muted: #57534e; --line: #e7e5e4; --bg: #fafaf9; --ok: #15803d; --bad: #b91c1c; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
:is(a, button, input, textarea):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

/* الـ header: لوجو وبحث وسلة، والبحث بياخد سطر لوحده على الموبايل */
.top { position: sticky; top: 0; z-index: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; padding: 10px 16px; background: #fff; border-block-end: 1px solid var(--line); }
.logo { font-weight: 800; font-size: 1.2rem; color: var(--brand); text-decoration: none; }
search { flex: 1 1 200px; order: 3; }
@media (min-width: 600px) { search { order: 0; } }
.filters input { width: 100%; font: inherit; padding: 6px 10px; border: 1px solid var(--line); border-radius: 999px; }
.cart-btn { margin-inline-start: auto; font: inherit; padding: 6px 12px; border: 1px solid var(--line); border-radius: 999px; background: #fff; cursor: pointer; }
.badge { display: inline-block; min-width: 1.6em; padding: 0 6px; border-radius: 999px; background: var(--brand); color: #fff; text-align: center; }
.badge[data-count="0"] { background: var(--line); color: var(--ink); }

main { max-width: 1100px; margin: auto; padding: 16px; }
main h1 { margin: 0 0 8px; font-size: 1.4rem; }
.cats { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; border: 0; }
.cats legend { width: 100%; margin-bottom: 4px; font-weight: 700; }
.cats label { padding: 4px 12px; border: 1px solid var(--line); border-radius: 999px; background: #fff; cursor: pointer; }
.cats label:has(:checked) { background: var(--ink); color: #fff; border-color: var(--ink); }
.cats label:has(:focus-visible) { outline: 3px solid #f59e0b; outline-offset: 2px; }
.cats input { position: absolute; opacity: 0; }
.result { color: var(--muted); }

/* الكروت: عددهم في الصف حسب العرض، كل كارت ٢٠٠px على الأقل */
.grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); }
.card { display: grid; gap: 4px; padding: 12px; background: #fff; border: 1px solid var(--line); border-radius: 12px; }
.thumb { aspect-ratio: 1; border-radius: 10px; background: radial-gradient(circle at 50% 55%, var(--c) 0 32%, transparent 33%), #f5f5f4; }
.card .name { font-size: 1rem; margin: 4px 0 0; }
.card .price { margin: 0; color: var(--brand); font-weight: 800; }
.add { font: inherit; font-weight: 700; padding: 8px; border: 0; border-radius: 8px; background: var(--brand); color: #fff; cursor: pointer; }
.add[data-in-cart]:not([data-in-cart="0"]) { background: var(--ok); }

/* السلة: dialog لازق في الطرف الشمال (margin-inline-start: auto في RTL) وداخل من برّه الشاشة */
.cart { margin: 0; margin-inline-start: auto; width: min(420px, 100vw); max-width: 100vw; height: 100dvh; max-height: 100dvh; padding: 16px; border: 0; background: #fff; overflow-y: auto; }
.cart::backdrop { background: #0006; }
.cart[open] { animation: slide-in .25s ease-out; }
@keyframes slide-in { from { translate: -100% 0; } }
.cart:dir(ltr)[open] { animation-name: slide-in-ltr; }
@keyframes slide-in-ltr { from { translate: 100% 0; } }
.cart-head { display: flex; justify-content: space-between; align-items: center; }
.cart-head h2 { margin: 0; }
.cart-head button { font: inherit; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 8px; background: #fff; cursor: pointer; }
.lines { list-style: none; margin: 12px 0; padding: 0; }
.line { display: grid; grid-template-columns: 1fr auto; gap: 4px 8px; align-items: center; padding: 8px 0; border-block-end: 1px solid var(--line); }
.line .qty { display: flex; align-items: center; gap: 4px; }
.line button { font: inherit; min-width: 32px; height: 32px; border: 1px solid var(--line); border-radius: 6px; background: #fff; cursor: pointer; }
.line .remove { color: var(--bad); }
.empty[hidden], .checkout[hidden] { display: none; }
.sum { font-weight: 800; }
.checkout { display: grid; gap: 4px; }
.checkout h3 { margin: 8px 0 0; }
.checkout label { font-weight: 700; }
.checkout input, .checkout textarea { font: inherit; padding: 8px; border: 2px solid var(--line); border-radius: 8px; }
.checkout :user-invalid { border-color: var(--bad); }
#c-phone { direction: ltr; text-align: right; }
.pay { margin-top: 8px; font: inherit; font-weight: 800; padding: 10px; border: 0; border-radius: 8px; background: var(--ok); color: #fff; cursor: pointer; }
.pay:disabled { opacity: .6; cursor: progress; }
.msg:empty { display: none; }
.msg { padding: 8px; border-radius: 8px; background: #dcfce7; font-weight: 700; }
.msg.is-error { background: #fee2e2; color: var(--bad); }
@media (prefers-reduced-motion: reduce) { .cart[open] { animation: none; } }
</style>
  <script>
// في الـ preview مفيش سيرفر: ملف الـ JSON محطوط هنا، و fetch بيرجّعه من غير شبكة
const FILES = {"data/products.json": "[ { \"id\": \"mug-blue\", \"name\": \"كوباية زرقا\", \"cat\": \"cups\", \"price\": 120, \"color\": \"#1d4ed8\" }, { \"id\": \"mug-sand\", \"name\": \"كوباية رملي\", \"cat\": \"cups\", \"price\": 110, \"color\": \"#d6a76c\" }, { \"id\": \"cup-espresso\", \"name\": \"فنجان إسبريسو\", \"cat\": \"cups\", \"price\": 75, \"color\": \"#7c2d12\" }, { \"id\": \"plate-big\", \"name\": \"طبق كبير\", \"cat\": \"plates\", \"price\": 210, \"color\": \"#0f766e\" }, { \"id\": \"plate-small\", \"name\": \"طبق صغير\", \"cat\": \"plates\", \"price\": 95, \"color\": \"#65a30d\" }, { \"id\": \"bowl-soup\", \"name\": \"سلطانية شوربة\", \"cat\": \"plates\", \"price\": 140, \"color\": \"#b45309\" }, { \"id\": \"vase-tall\", \"name\": \"فازة طويلة\", \"cat\": \"decor\", \"price\": 350, \"color\": \"#7e22ce\" }, { \"id\": \"pot-mini\", \"name\": \"أصيص صغير\", \"cat\": \"decor\", \"price\": 160, \"color\": \"#be123c\" } ]"};
const realFetch = window.fetch;
window.fetch = (u, o) => FILES[u] ? Promise.resolve(new Response(FILES[u], { headers: { "Content-Type": "application/json" } })) : realFetch(u, o);
</script>
<script>
// وكمان /api/order: بيحسب الإجمالي من نفس ملف المنتجات زي server.mjs
const fetchBeforeOrder = window.fetch;
window.fetch = async (url, opts) => {
  if (!String(url).endsWith("/api/order")) return fetchBeforeOrder(url, opts);
  await new Promise((r) => setTimeout(r, 400));
  const data = JSON.parse(opts.body || "{}");
  const products = JSON.parse(FILES["data/products.json"]);
  let total = 0;
  for (const [id, qty] of Object.entries(data.items || {})) total += (products.find((p) => p.id === id) || { price: 0 }).price * qty;
  const ok = total > 0 && /^01[0125][0-9]{8}$/.test(data.phone || "");
  const body = ok ? { ok: true, number: Math.floor(10000 + Math.random() * 90000), total } : { message: "البيانات ناقصة" };
  return new Response(JSON.stringify(body), { status: ok ? 200 : 400, headers: { "Content-Type": "application/json" } });
};
</script>
<script type="module">
// ١. الحالة: المنتجات من السيرفر، والفلتر من الرابط، والسلة من التخزين
const CATS = { cups: "كوبايات", plates: "أطباق", decor: "ديكور" };
const money = (n) => n.toLocaleString("ar-EG") + " جنيه";
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
};
const params = new URLSearchParams(location.search);
const state = {
  products: [],
  q: params.get("q") || "",
  cat: CATS[params.get("cat")] ? params.get("cat") : "all",
  cart: store.get("cart", {}),   // { "mug-blue": 2 }
  error: "",
};

// ٢. العناصر اللي الـ JS بيكتب فيها
const $ = (sel) => document.querySelector(sel);
const grid = $(".js-grid");
const tpl = $("#card-tpl");
const search = $(".js-filters").elements.q;
const lines = $(".js-lines");
const checkout = $(".js-checkout");

// ٣. حسابات من الحالة (مبتتخزنش)
const visible = () => state.products.filter((p) =>
  (state.cat === "all" || p.cat === state.cat) && p.name.includes(state.q.trim()));
const cartItems = () => Object.entries(state.cart)
  .map(([id, qty]) => ({ ...state.products.find((p) => p.id === id), qty }))
  .filter((item) => item.name);
const cartCount = () => cartItems().reduce((n, item) => n + item.qty, 0);
const cartSum = () => cartItems().reduce((n, item) => n + item.qty * item.price, 0);

// ٤. render: الحالة ← الصفحة
function renderGrid() {
  const list = visible();
  grid.replaceChildren(...list.map((p) => {
    const li = tpl.content.firstElementChild.cloneNode(true);
    li.dataset.id = p.id;
    li.querySelector(".thumb").style.setProperty("--c", p.color);
    li.querySelector(".name").textContent = p.name;
    li.querySelector(".price").textContent = money(p.price);
    return li;
  }));
  $(".js-result").textContent = state.error || (list.length ? list.length.toLocaleString("ar-EG") + " منتج" : "مفيش منتجات بالبحث ده");
}

function renderCart() {
  for (const li of grid.children) {
    const qty = state.cart[li.dataset.id] || 0;
    const btn = li.querySelector(".add");
    btn.dataset.inCart = qty;
    btn.textContent = qty ? "في السلة (" + qty.toLocaleString("ar-EG") + ") + واحد" : "أضف للسلة";
  }
  const items = cartItems();
  lines.replaceChildren(...items.map((item) => {
    const li = document.createElement("li");
    li.className = "line";
    li.dataset.id = item.id;
    li.innerHTML = '<span class="n"></span><span class="qty"><button type="button" data-delta="-1">−</button><b></b><button type="button" data-delta="1">+</button><button type="button" class="remove" data-delta="remove">شيل</button></span>';
    li.querySelector(".n").textContent = item.name + " · " + money(item.price * item.qty);
    li.querySelector("b").textContent = item.qty.toLocaleString("ar-EG");
    for (const b of li.querySelectorAll("button")) b.setAttribute("aria-label", { "-1": "قلّل ", 1: "زوّد ", remove: "شيل " }[b.dataset.delta] + item.name);
    return li;
  }));
  $(".js-empty").hidden = items.length > 0;
  checkout.hidden = items.length === 0;
  $(".js-sum").textContent = money(cartSum());
  const badge = $(".js-badge");
  badge.dataset.count = cartCount();
  badge.textContent = cartCount().toLocaleString("ar-EG");
  store.set("cart", state.cart);
}

function syncUrl() {
  const p = new URLSearchParams();
  if (state.q) p.set("q", state.q);
  if (state.cat !== "all") p.set("cat", state.cat);
  // جوه iframe معزول (زي الـ preview) تغيير الرابط بيرمي SecurityError: الفلتر يشتغل والرابط ميتغيّرش
  try { history.replaceState(null, "", p.size ? "?" + p : location.pathname); } catch {}
}

// ٥. الأحداث: بتغيّر الحالة وتنده render
search.value = state.q;
document.querySelector('.js-cats input[value="' + state.cat + '"]').checked = true;

$(".js-filters").addEventListener("submit", (e) => e.preventDefault());
search.addEventListener("input", () => { state.q = search.value; syncUrl(); renderGrid(); renderCart(); });
$(".js-cats").addEventListener("change", (e) => { state.cat = e.target.value; syncUrl(); renderGrid(); renderCart(); });

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  const id = btn.closest(".card").dataset.id;
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
});

lines.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.closest(".line").dataset.id;
  const d = btn.dataset.delta;
  state.cart[id] = d === "remove" ? 0 : state.cart[id] + Number(d);
  if (state.cart[id] <= 0) delete state.cart[id];
  renderCart();
  // الزرار اللي اتداس ممكن يكون اتمسح مع السطر: رجّع الـ focus لحاجة موجودة
  const same = lines.querySelector('[data-id="' + id + '"] [data-delta="' + d + '"]');
  (same || $(".cart-head button")).focus();
});

// ٦. الطلب: رسايل عربي، والسيرفر بيحسب الإجمالي بنفسه من الـ id والكمية
const MESSAGES = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم حرفين على الأقل" },
  phone: { valueMissing: "اكتب موبايلك", patternMismatch: "١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" },
  address: { valueMissing: "اكتب العنوان", tooShort: "العنوان قصير، زوّد الشارع والمنطقة" },
};
function check(el) {
  if (!MESSAGES[el.name]) return;
  el.setCustomValidity("");
  for (const flag in MESSAGES[el.name]) if (el.validity[flag]) { el.setCustomValidity(MESSAGES[el.name][flag]); break; }
}
checkout.noValidate = true;
checkout.addEventListener("input", (e) => check(e.target));
checkout.addEventListener("submit", async (e) => {
  e.preventDefault();
  for (const el of checkout.elements) check(el);
  if (!checkout.reportValidity()) return;
  const pay = checkout.querySelector(".pay");
  const msg = $(".js-msg");
  pay.disabled = true;
  msg.className = "msg js-msg";
  try {
    const res = await fetch(checkout.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(checkout)), items: state.cart }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    state.cart = {};
    renderCart();
    checkout.reset();
    checkout.hidden = false;
    msg.textContent = "طلبك رقم " + data.number + " بـ " + money(data.total) + ". هنكلمك قبل التوصيل.";
  } catch (err) {
    msg.classList.add("is-error");
    msg.textContent = err.message || "الطلب متبعتش، جرّب تاني.";
  } finally {
    pay.disabled = false;
  }
});

// ٧. أول تحميل
try {
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error(res.status);
  state.products = await res.json();
} catch {
  state.error = "مقدرناش نحمّل المنتجات. اعمل refresh.";
}
renderGrid();
renderCart();
</script>
</head>
<body>
  <header class="top">
    <a class="logo" href="./">فخّار</a>
    <search>
      <form class="filters js-filters" role="search">
        <label class="sr-only" for="q">دوّر على منتج</label>
        <input id="q" name="q" type="search" placeholder="دوّر…" autocomplete="off">
      </form>
    </search>
    <button class="cart-btn" type="button" commandfor="cart" command="show-modal" aria-haspopup="dialog">
      السلة <span class="badge js-badge" data-count="0">0</span>
    </button>
  </header>

  <main>
    <h1>منتجات فخّار</h1>
    <fieldset class="cats js-cats">
      <legend>القسم</legend>
      <label><input type="radio" name="cat" value="all" checked> الكل</label>
      <label><input type="radio" name="cat" value="cups"> كوبايات</label>
      <label><input type="radio" name="cat" value="plates"> أطباق</label>
      <label><input type="radio" name="cat" value="decor"> ديكور</label>
    </fieldset>
    <p class="result js-result" role="status">بيحمّل المنتجات…</p>
    <ul class="grid js-grid" aria-label="المنتجات"></ul>
    <noscript><p>المتجر بيحمّل المنتجات بـ JavaScript. شغّله أو اتصل بينا على 0100000000.</p></noscript>
  </main>

  <template id="card-tpl">
    <li class="card">
      <div class="thumb" aria-hidden="true"></div>
      <h2 class="name"></h2>
      <p class="price"></p>
      <button class="add" type="button">أضف للسلة</button>
    </li>
  </template>

  <dialog id="cart" class="cart js-cart" closedby="any" aria-labelledby="cart-title">
    <div class="cart-head">
      <h2 id="cart-title">السلة</h2>
      <button type="button" commandfor="cart" command="close" aria-label="اقفل السلة">✕</button>
    </div>
    <ul class="lines js-lines"></ul>
    <p class="empty js-empty">السلة فاضية.</p>
    <p class="sum">الإجمالي: <output class="js-sum">٠ جنيه</output></p>
    <form class="checkout js-checkout" action="/api/order" method="post">
      <h3>بيانات التوصيل</h3>
      <label for="c-name">الاسم</label>
      <input id="c-name" name="name" required minlength="2" autocomplete="name">
      <label for="c-phone">الموبايل</label>
      <input id="c-phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel">
      <label for="c-address">العنوان</label>
      <textarea id="c-address" name="address" required minlength="10" rows="2" autocomplete="street-address"></textarea>
      <button class="pay" type="submit">اطلب</button>
      <p class="msg js-msg" role="status"></p>
    </form>
  </dialog>
</body>
</html>
~~~

**هتشوف إيه:** header أبيض ثابت فوق: «فخّار» بالبني، ومربع بحث مدور، و «السلة ٠». تحته «منتجات فخّار»، وأقسام كـ pills (المختار أسود)، و «٨ منتج»، وكروت فيها دايرة ملونة واسم وسعر بني وزرار «أضف للسلة». لما تضيف الزرار بيخضر ويقول «في السلة (٢) + واحد»، ورقم السلة يتغيّر. «السلة» بتفتح لوحة بيضا من الشمال بالطول كله (على الموبايل بالعرض كله)، والخلفية بتغمق.

### الملفات

~~~text mini-shop/
mini-shop/
├── index.html          الـ header والأقسام والـ template والـ dialog وفورم الطلب
├── css/
│   └── styles.css      الـ grid والكروت والسلة الجانبية والحالات
├── js/
│   └── app.js          الحالة، و render، والرابط، والتخزين، والطلب
├── data/
│   └── products.json   المنتجات (السيرفر بيقرا نفس الملف للأسعار)
└── server.mjs          سيرفر درس «تشغّل المشروع وتعرضه» + جزء /api/order
~~~

**ترتيب البناء اللي مشيت عليه:** الـ HTML كله بشكله الثابت (كارت واحد مكتوب بإيدي، وسلة فيها سطر) ← الـ CSS عليه لحد ما الشكل يبقى صح على 360 و 1280 ← الكارت يتنقل لـ [[<template>]] والسطر يتمسح ← [[products.json]] و [[fetch]] و [[renderGrid()]] ← الفلتر والرابط ← السلة و [[renderCart()]] ← التخزين ← الطلب والسيرفر ← axe والمقاسات. كل خطوة كانت شغالة قبل اللي بعدها.

### تشغّله إزاي

~~~powershell
mkdir mini-shop; cd mini-shop
mkdir css, js, data
ni index.html, css/styles.css, js/app.js, data/products.json, server.mjs
code .
node server.mjs
~~~

(Git Bash: [[mkdir -p mini-shop/{css,js,data} && cd mini-shop && touch index.html css/styles.css js/app.js data/products.json server.mjs]].) [[server.mjs]] بتاع درس «تشغّل المشروع وتعرضه»، وزوّد قبل سطر [[const file = …]]:

~~~js server.mjs (الجزء الجديد)
  if (req.method === "POST" && path === "/api/order") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let data;
    try { data = JSON.parse(body); } catch { data = {}; }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    // الأسعار من ملف السيرفر، مش من المتصفح: اللي جاي من برّه id وكمية بس
    const products = JSON.parse(await readFile(join(root, "data/products.json"), "utf8"));
    let total = 0;
    for (const [id, qty] of Object.entries(data.items || {})) {
      const p = products.find((x) => x.id === id);
      if (!p || !Number.isInteger(qty) || qty < 1 || qty > 20) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "فيه منتج أو كمية غلط في السلة" }));
      }
      total += p.price * qty;
    }
    if (!total || !/^01[0125][0-9]{8}$/.test(data.phone || "") || (data.name || "").length < 2) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "البيانات ناقصة" }));
    }
    const number = Math.floor(10000 + Math.random() * 90000);
    console.log("طلب جديد:", number, total, data.items);
    return res.end(JSON.stringify({ ok: true, number, total }));
  }
~~~

وافتح [[http://localhost:8080]]. مع [[npx serve]] المنتجات والسلة شغالين، والطلب بس هو اللي محتاج [[server.mjs]].

### لو مشتغلش

- **«مقدرناش نحمّل المنتجات»:** مسار [[data/products.json]] غلط أو الملف مش موجود. Network: [[products.json 404]]. ومن غير سطر [[if (!res.ok) throw …]] كانت الرسالة اللي ظهرت (قستها): [[SyntaxError: Unexpected token 'م', "مش موجود: "... is not valid JSON]]، لأن [[fetch]] مبيرميش على 404 و [[res.json()]] حاول يقرا صفحة الـ 404.
- **axe قال [[page-has-heading-one]]:** أول نسخة مكانش فيها [[<h1>]] (اللوجو لينك مش عنوان). قارئ الشاشة بيقفز للـ h1 عشان يعرف الصفحة عن إيه. زوّدت [[<h1>منتجات فخّار</h1>]] و axe بقى صفر.
- **رسايل الفورم طلعت إنجليزي:** [[reportValidity()]] لوحده عرض «Please fill out this field.». زوّدت [[MESSAGES]] و [[check()]] زي درس «الفورم من التلاتة»، فبقت «اكتب اسمك» و «العنوان قصير، زوّد الشارع والمنطقة».
- **الفلتر واقف جوه الـ preview بتاع الموقع:** الأقسام والبحث مكانوش بيغيّروا حاجة جوه الـ iframe المعزول، و Console فيه [[SecurityError: Failed to execute 'replaceState' on 'History': A history state object with URL '…?cat=plates' cannot be created in a document with origin 'null' and URL 'about:srcdoc'.]]. الـ error حصل في [[syncUrl()]] **قبل** [[renderGrid()]]، فالـ listener وقف في نصه. التصليح: [[replaceState]] جوه [[try]]، والفلتر بقى شغال في الـ preview (من غير ما الرابط يتغيّر) وعلى السيرفر بالرابط. نفس درس [[localStorage]]: أي API ممكن يتمنع في مكان، اللي بعده ميقفش عليه.
- **فتحته بدبل كليك:** صفحة فاضية فيها «بيحمّل المنتجات…» بس، و Console: [[Access to script at 'file:///C:/Users/ali/mini-shop/js/app.js' from origin 'null' has been blocked by CORS policy: ...]]. وحتى لو الـ JS اشتغل، [[fetch("data/products.json")]] من [[file://]] بيتمنع برضه.

### إزاي التلاتة مربوطين

| الـ HTML بيدي | الـ JS بيعمل | الـ CSS بيرسم |
|---|---|---|
| [[<template id="card-tpl">]] بالكارت فاضي | [[cloneNode(true)]] لكل منتج، ويكتب الاسم والسعر بـ [[textContent]]، و [[data-id]] | [[.grid]] بـ [[auto-fill]] |
| [[<div class="thumb">]] | [[style.setProperty("--c", p.color)]] (رقم/لون من البيانات) | [[radial-gradient(var(--c) …)]] |
| [[<input type="radio" name="cat">]] جوه [[<fieldset>]] | [[change]] ← [[state.cat]] ← الرابط و [[renderGrid()]] | [[label:has(:checked)]] أسود، و [[label:has(:focus-visible)]] |
| [[<search>]] و [[<input type="search">]] | [[input]] ← [[state.q]] | — |
| [[<button commandfor="cart" command="show-modal">]] | — (HTML بيفتح) | [[.cart[open]]] بحركة، و [[::backdrop]] |
| [[<span class="badge" data-count>]] | [[data-count]] والرقم | [[[data-count="0"]]] رمادي |
| زرار [[.add]] في كل كارت | [[data-in-cart]] والنص | [[[data-in-cart]:not([data-in-cart="0"])]] أخضر |
| [[<form action="/api/order">]] و [[required]] و [[pattern]] و [[minlength]] | رسايل عربي، و [[fetch]] بـ [[items]] بس (من غير أسعار) | [[:user-invalid]] و [[.pay:disabled]] |

**الحدث ← الحالة ← العرض:** كل listener بيغيّر حاجة في [[state]] ([[q]] أو [[cat]] أو [[cart]]) وبعدين [[renderGrid()]] و/أو [[renderCart()]]. والحاجات المشتقة (المنتجات الظاهرة، والعدد، والإجمالي) دوال بتتحسب من [[state]] كل مرة ومبتتخزنش، فمستحيل الرقم اللي في الـ badge يختلف عن السلة.

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>متجر فخّار</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <header class="top">
    <a class="logo" href="./">فخّار</a>
    <search>
      <form class="filters js-filters" role="search">
        <label class="sr-only" for="q">دوّر على منتج</label>
        <input id="q" name="q" type="search" placeholder="دوّر…" autocomplete="off">
      </form>
    </search>
    <button class="cart-btn" type="button" commandfor="cart" command="show-modal" aria-haspopup="dialog">
      السلة <span class="badge js-badge" data-count="0">0</span>
    </button>
  </header>

  <main>
    <h1>منتجات فخّار</h1>
    <fieldset class="cats js-cats">
      <legend>القسم</legend>
      <label><input type="radio" name="cat" value="all" checked> الكل</label>
      <label><input type="radio" name="cat" value="cups"> كوبايات</label>
      <label><input type="radio" name="cat" value="plates"> أطباق</label>
      <label><input type="radio" name="cat" value="decor"> ديكور</label>
    </fieldset>
    <p class="result js-result" role="status">بيحمّل المنتجات…</p>
    <ul class="grid js-grid" aria-label="المنتجات"></ul>
    <noscript><p>المتجر بيحمّل المنتجات بـ JavaScript. شغّله أو اتصل بينا على 0100000000.</p></noscript>
  </main>

  <template id="card-tpl">
    <li class="card">
      <div class="thumb" aria-hidden="true"></div>
      <h2 class="name"></h2>
      <p class="price"></p>
      <button class="add" type="button">أضف للسلة</button>
    </li>
  </template>

  <dialog id="cart" class="cart js-cart" closedby="any" aria-labelledby="cart-title">
    <div class="cart-head">
      <h2 id="cart-title">السلة</h2>
      <button type="button" commandfor="cart" command="close" aria-label="اقفل السلة">✕</button>
    </div>
    <ul class="lines js-lines"></ul>
    <p class="empty js-empty">السلة فاضية.</p>
    <p class="sum">الإجمالي: <output class="js-sum">٠ جنيه</output></p>
    <form class="checkout js-checkout" action="/api/order" method="post">
      <h3>بيانات التوصيل</h3>
      <label for="c-name">الاسم</label>
      <input id="c-name" name="name" required minlength="2" autocomplete="name">
      <label for="c-phone">الموبايل</label>
      <input id="c-phone" name="phone" type="tel" required pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel">
      <label for="c-address">العنوان</label>
      <textarea id="c-address" name="address" required minlength="10" rows="2" autocomplete="street-address"></textarea>
      <button class="pay" type="submit">اطلب</button>
      <p class="msg js-msg" role="status"></p>
    </form>
  </dialog>
</body>
</html>
~~~

~~~css css/styles.css
:root { --brand: #9a3412; --ink: #1c1917; --muted: #57534e; --line: #e7e5e4; --bg: #fafaf9; --ok: #15803d; --bad: #b91c1c; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
:is(a, button, input, textarea):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

/* الـ header: لوجو وبحث وسلة، والبحث بياخد سطر لوحده على الموبايل */
.top { position: sticky; top: 0; z-index: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; padding: 10px 16px; background: #fff; border-block-end: 1px solid var(--line); }
.logo { font-weight: 800; font-size: 1.2rem; color: var(--brand); text-decoration: none; }
search { flex: 1 1 200px; order: 3; }
@media (min-width: 600px) { search { order: 0; } }
.filters input { width: 100%; font: inherit; padding: 6px 10px; border: 1px solid var(--line); border-radius: 999px; }
.cart-btn { margin-inline-start: auto; font: inherit; padding: 6px 12px; border: 1px solid var(--line); border-radius: 999px; background: #fff; cursor: pointer; }
.badge { display: inline-block; min-width: 1.6em; padding: 0 6px; border-radius: 999px; background: var(--brand); color: #fff; text-align: center; }
.badge[data-count="0"] { background: var(--line); color: var(--ink); }

main { max-width: 1100px; margin: auto; padding: 16px; }
main h1 { margin: 0 0 8px; font-size: 1.4rem; }
.cats { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; border: 0; }
.cats legend { width: 100%; margin-bottom: 4px; font-weight: 700; }
.cats label { padding: 4px 12px; border: 1px solid var(--line); border-radius: 999px; background: #fff; cursor: pointer; }
.cats label:has(:checked) { background: var(--ink); color: #fff; border-color: var(--ink); }
.cats label:has(:focus-visible) { outline: 3px solid #f59e0b; outline-offset: 2px; }
.cats input { position: absolute; opacity: 0; }
.result { color: var(--muted); }

/* الكروت: عددهم في الصف حسب العرض، كل كارت ٢٠٠px على الأقل */
.grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); }
.card { display: grid; gap: 4px; padding: 12px; background: #fff; border: 1px solid var(--line); border-radius: 12px; }
.thumb { aspect-ratio: 1; border-radius: 10px; background: radial-gradient(circle at 50% 55%, var(--c) 0 32%, transparent 33%), #f5f5f4; }
.card .name { font-size: 1rem; margin: 4px 0 0; }
.card .price { margin: 0; color: var(--brand); font-weight: 800; }
.add { font: inherit; font-weight: 700; padding: 8px; border: 0; border-radius: 8px; background: var(--brand); color: #fff; cursor: pointer; }
.add[data-in-cart]:not([data-in-cart="0"]) { background: var(--ok); }

/* السلة: dialog لازق في الطرف الشمال (margin-inline-start: auto في RTL) وداخل من برّه الشاشة */
.cart { margin: 0; margin-inline-start: auto; width: min(420px, 100vw); max-width: 100vw; height: 100dvh; max-height: 100dvh; padding: 16px; border: 0; background: #fff; overflow-y: auto; }
.cart::backdrop { background: #0006; }
.cart[open] { animation: slide-in .25s ease-out; }
@keyframes slide-in { from { translate: -100% 0; } }
.cart:dir(ltr)[open] { animation-name: slide-in-ltr; }
@keyframes slide-in-ltr { from { translate: 100% 0; } }
.cart-head { display: flex; justify-content: space-between; align-items: center; }
.cart-head h2 { margin: 0; }
.cart-head button { font: inherit; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 8px; background: #fff; cursor: pointer; }
.lines { list-style: none; margin: 12px 0; padding: 0; }
.line { display: grid; grid-template-columns: 1fr auto; gap: 4px 8px; align-items: center; padding: 8px 0; border-block-end: 1px solid var(--line); }
.line .qty { display: flex; align-items: center; gap: 4px; }
.line button { font: inherit; min-width: 32px; height: 32px; border: 1px solid var(--line); border-radius: 6px; background: #fff; cursor: pointer; }
.line .remove { color: var(--bad); }
.empty[hidden], .checkout[hidden] { display: none; }
.sum { font-weight: 800; }
.checkout { display: grid; gap: 4px; }
.checkout h3 { margin: 8px 0 0; }
.checkout label { font-weight: 700; }
.checkout input, .checkout textarea { font: inherit; padding: 8px; border: 2px solid var(--line); border-radius: 8px; }
.checkout :user-invalid { border-color: var(--bad); }
#c-phone { direction: ltr; text-align: right; }
.pay { margin-top: 8px; font: inherit; font-weight: 800; padding: 10px; border: 0; border-radius: 8px; background: var(--ok); color: #fff; cursor: pointer; }
.pay:disabled { opacity: .6; cursor: progress; }
.msg:empty { display: none; }
.msg { padding: 8px; border-radius: 8px; background: #dcfce7; font-weight: 700; }
.msg.is-error { background: #fee2e2; color: var(--bad); }
@media (prefers-reduced-motion: reduce) { .cart[open] { animation: none; } }
~~~

~~~js js/app.js
// ١. الحالة: المنتجات من السيرفر، والفلتر من الرابط، والسلة من التخزين
const CATS = { cups: "كوبايات", plates: "أطباق", decor: "ديكور" };
const money = (n) => n.toLocaleString("ar-EG") + " جنيه";
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
};
const params = new URLSearchParams(location.search);
const state = {
  products: [],
  q: params.get("q") || "",
  cat: CATS[params.get("cat")] ? params.get("cat") : "all",
  cart: store.get("cart", {}),   // { "mug-blue": 2 }
  error: "",
};

// ٢. العناصر اللي الـ JS بيكتب فيها
const $ = (sel) => document.querySelector(sel);
const grid = $(".js-grid");
const tpl = $("#card-tpl");
const search = $(".js-filters").elements.q;
const lines = $(".js-lines");
const checkout = $(".js-checkout");

// ٣. حسابات من الحالة (مبتتخزنش)
const visible = () => state.products.filter((p) =>
  (state.cat === "all" || p.cat === state.cat) && p.name.includes(state.q.trim()));
const cartItems = () => Object.entries(state.cart)
  .map(([id, qty]) => ({ ...state.products.find((p) => p.id === id), qty }))
  .filter((item) => item.name);
const cartCount = () => cartItems().reduce((n, item) => n + item.qty, 0);
const cartSum = () => cartItems().reduce((n, item) => n + item.qty * item.price, 0);

// ٤. render: الحالة ← الصفحة
function renderGrid() {
  const list = visible();
  grid.replaceChildren(...list.map((p) => {
    const li = tpl.content.firstElementChild.cloneNode(true);
    li.dataset.id = p.id;
    li.querySelector(".thumb").style.setProperty("--c", p.color);
    li.querySelector(".name").textContent = p.name;
    li.querySelector(".price").textContent = money(p.price);
    return li;
  }));
  $(".js-result").textContent = state.error || (list.length ? list.length.toLocaleString("ar-EG") + " منتج" : "مفيش منتجات بالبحث ده");
}

function renderCart() {
  for (const li of grid.children) {
    const qty = state.cart[li.dataset.id] || 0;
    const btn = li.querySelector(".add");
    btn.dataset.inCart = qty;
    btn.textContent = qty ? "في السلة (" + qty.toLocaleString("ar-EG") + ") + واحد" : "أضف للسلة";
  }
  const items = cartItems();
  lines.replaceChildren(...items.map((item) => {
    const li = document.createElement("li");
    li.className = "line";
    li.dataset.id = item.id;
    li.innerHTML = '<span class="n"></span><span class="qty"><button type="button" data-delta="-1">−</button><b></b><button type="button" data-delta="1">+</button><button type="button" class="remove" data-delta="remove">شيل</button></span>';
    li.querySelector(".n").textContent = item.name + " · " + money(item.price * item.qty);
    li.querySelector("b").textContent = item.qty.toLocaleString("ar-EG");
    for (const b of li.querySelectorAll("button")) b.setAttribute("aria-label", { "-1": "قلّل ", 1: "زوّد ", remove: "شيل " }[b.dataset.delta] + item.name);
    return li;
  }));
  $(".js-empty").hidden = items.length > 0;
  checkout.hidden = items.length === 0;
  $(".js-sum").textContent = money(cartSum());
  const badge = $(".js-badge");
  badge.dataset.count = cartCount();
  badge.textContent = cartCount().toLocaleString("ar-EG");
  store.set("cart", state.cart);
}

function syncUrl() {
  const p = new URLSearchParams();
  if (state.q) p.set("q", state.q);
  if (state.cat !== "all") p.set("cat", state.cat);
  // جوه iframe معزول (زي الـ preview) تغيير الرابط بيرمي SecurityError: الفلتر يشتغل والرابط ميتغيّرش
  try { history.replaceState(null, "", p.size ? "?" + p : location.pathname); } catch {}
}

// ٥. الأحداث: بتغيّر الحالة وتنده render
search.value = state.q;
document.querySelector('.js-cats input[value="' + state.cat + '"]').checked = true;

$(".js-filters").addEventListener("submit", (e) => e.preventDefault());
search.addEventListener("input", () => { state.q = search.value; syncUrl(); renderGrid(); renderCart(); });
$(".js-cats").addEventListener("change", (e) => { state.cat = e.target.value; syncUrl(); renderGrid(); renderCart(); });

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  const id = btn.closest(".card").dataset.id;
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
});

lines.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.closest(".line").dataset.id;
  const d = btn.dataset.delta;
  state.cart[id] = d === "remove" ? 0 : state.cart[id] + Number(d);
  if (state.cart[id] <= 0) delete state.cart[id];
  renderCart();
  // الزرار اللي اتداس ممكن يكون اتمسح مع السطر: رجّع الـ focus لحاجة موجودة
  const same = lines.querySelector('[data-id="' + id + '"] [data-delta="' + d + '"]');
  (same || $(".cart-head button")).focus();
});

// ٦. الطلب: رسايل عربي، والسيرفر بيحسب الإجمالي بنفسه من الـ id والكمية
const MESSAGES = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم حرفين على الأقل" },
  phone: { valueMissing: "اكتب موبايلك", patternMismatch: "١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" },
  address: { valueMissing: "اكتب العنوان", tooShort: "العنوان قصير، زوّد الشارع والمنطقة" },
};
function check(el) {
  if (!MESSAGES[el.name]) return;
  el.setCustomValidity("");
  for (const flag in MESSAGES[el.name]) if (el.validity[flag]) { el.setCustomValidity(MESSAGES[el.name][flag]); break; }
}
checkout.noValidate = true;
checkout.addEventListener("input", (e) => check(e.target));
checkout.addEventListener("submit", async (e) => {
  e.preventDefault();
  for (const el of checkout.elements) check(el);
  if (!checkout.reportValidity()) return;
  const pay = checkout.querySelector(".pay");
  const msg = $(".js-msg");
  pay.disabled = true;
  msg.className = "msg js-msg";
  try {
    const res = await fetch(checkout.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(checkout)), items: state.cart }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    state.cart = {};
    renderCart();
    checkout.reset();
    checkout.hidden = false;
    msg.textContent = "طلبك رقم " + data.number + " بـ " + money(data.total) + ". هنكلمك قبل التوصيل.";
  } catch (err) {
    msg.classList.add("is-error");
    msg.textContent = err.message || "الطلب متبعتش، جرّب تاني.";
  } finally {
    pay.disabled = false;
  }
});

// ٧. أول تحميل
try {
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error(res.status);
  state.products = await res.json();
} catch {
  state.error = "مقدرناش نحمّل المنتجات. اعمل refresh.";
}
renderGrid();
renderCart();
~~~

~~~json data/products.json
[
  { "id": "mug-blue", "name": "كوباية زرقا", "cat": "cups", "price": 120, "color": "#1d4ed8" },
  { "id": "mug-sand", "name": "كوباية رملي", "cat": "cups", "price": 110, "color": "#d6a76c" },
  { "id": "cup-espresso", "name": "فنجان إسبريسو", "cat": "cups", "price": 75, "color": "#7c2d12" },
  { "id": "plate-big", "name": "طبق كبير", "cat": "plates", "price": 210, "color": "#0f766e" },
  { "id": "plate-small", "name": "طبق صغير", "cat": "plates", "price": 95, "color": "#65a30d" },
  { "id": "bowl-soup", "name": "سلطانية شوربة", "cat": "plates", "price": 140, "color": "#b45309" },
  { "id": "vase-tall", "name": "فازة طويلة", "cat": "decor", "price": 350, "color": "#7e22ce" },
  { "id": "pot-mini", "name": "أصيص صغير", "cat": "decor", "price": 160, "color": "#be123c" }
]
~~~

### أهم الحتت

- **[[<template>]]:** المتصفح بيقراه ومبيعرضوش. [[tpl.content.firstElementChild.cloneNode(true)]] نسخة جديدة كل مرة، فالـ HTML بتاع الكارت مكتوب مرة في الـ HTML مش جوه string في الـ JS، والاسم بيتكتب بـ [[textContent]] فمفيش XSS.
- **الفلتر في الرابط:** [[URLSearchParams(location.search)]] وقت الفتح، و [[history.replaceState]] (جوه [[try]]) مع كل تغيير (مش [[pushState]] عشان كل حرف في البحث ميبقاش خطوة في Back). وقيمة [[cat]] من الرابط بتتفحص ([[CATS[...] ?]]) قبل ما تتستخدم.
- **[[store]]:** [[localStorage]] جوه [[try]] (درس «الحالة ← الصفحة»)، و [[JSON.parse]] كمان جوه نفس الـ [[try]] لو حد كتب قيمة بايظة. والـ preview هنا بيستخدم الـ fallback (السلة مبتتفتكرش فيه).
- **السلة بتتخزن [[{ id: qty }]] بس** مش المنتج كله، فلو السعر اتغيّر في الـ JSON السلة بتاخد الجديد. و [[cartItems()]] بيشيل أي id مبقاش موجود ([[filter((item) => item.name)]]).
- **الـ focus بعد «شيل»:** السطر بيتمسح ومعاه الزرار، فبنرجّع الـ focus لنفس الزرار في السطر الجديد لو موجود، أو لـ «✕».
- **السيرفر مبيصدّقش:** الـ JS بيبعت [[items]] (id وكمية)، والسيرفر بيقرا [[data/products.json]] بنفسه ويحسب، ويرفض id مش موجود أو كمية مش صحيحة. حتى لو حد بعت [[total: 1]] السيرفر تجاهله ورجّع ٢٤٠ (قستها).
- **[[@keyframes slide-in { from { translate: -100% 0 } }]]:** في RTL السلة لازقة في الشمال، فبتدخل من الشمال. و [[:dir(ltr)]] بيقلب الاتجاه لو الصفحة اتحولت إنجليزي.

### اتقاس (Chrome 158، Playwright، server.mjs على localhost)

~~~text
أول ما فتحت:              «٨ منتج»، ٨ كروت، الرابط من غير query، السلة «٠»
قسم أطباق:                «٣ منتج»، الرابط ?cat=plates
بحث «كبير»:               «١ منتج»، الرابط ?q=%D9%83%D8%A8%D9%8A%D8%B1&cat=plates
refresh:                  نفس النتيجة والبحث مكتوب «كبير»
٢ كوباية زرقا + فازة:      السلة «٣»، والزرار «في السلة (٢) + واحد»
فتحت السلة:               «كوباية زرقا · ٢٤٠ جنيه» و «فازة طويلة · ٣٥٠ جنيه»، الإجمالي «٥٩٠ جنيه»، الـ focus على «اقفل السلة»
− على الكوباية:           «٤٧٠ جنيه»، والـ focus فضل على «قلّل كوباية زرقا»
شيل الفازة:               سطر واحد، والـ focus على «اقفل السلة»، «١٢٠ جنيه»
refresh:                  السلة «١»
اطلب فاضي:                الـ focus على الاسم و «اكتب اسمك»
عنوان «المعادي»:           «العنوان قصير، زوّد الشارع والمنطقة»
طلب صح:                   «طلبك رقم 62088 بـ ١٢٠ جنيه. هنكلمك قبل التوصيل.»، والسلة «٠»
POST بـ mug-blue: 1000:   400 {"message":"فيه منتج أو كمية غلط في السلة"}
POST بـ total: 1:         200 والإجمالي 240 (السيرفر حسبه)
products.json 404:        «مقدرناش نحمّل المنتجات. اعمل refresh.» و ٠ كروت
axe-core 4.10.2:          0 violations والسلة مقفولة، و 0 وهي مفتوحة
الـ grid:                 360 ← عمود، 768 ← ٣، 1280 ← ٥، و scrollWidth أقل من الشاشة في التلاتة
السلة:                    360 ← عرض 360 من أول الشاشة، 1280 ← عرض 420 لازقة في الشمال
page errors:              ولا واحد
~~~` },
        { lvl: 'كبير', dir: "habit-tracker", t: R`متتبع عادات: جدول آخر ٧ أيام بالكيبورد`, what: R`جدول فيه العادات صفوف وآخر ٧ أيام أعمدة (النهارده آخر واحد ومتعلّم)، كل خانة زرار بيتعلّم ✓ ([[aria-pressed]])، وجنب كل عادة «ورا بعض» (كام يوم متتالي لحد النهارده، وبيخضر من ٣)، ودايرة فوق بنسبة الإنجاز مرسومة بـ [[conic-gradient]] من رقم بيبعته JS. **الكيبورد:** Tab بيدخل الجدول مرة واحدة بس، والأسهم بتتنقل بين الخانات (roving tabindex)، و Space بيعلّم. فورم لعادة جديدة (مفيش تكرار، برسايل عربي)، و ✕ بيشيل. الثيم فاتح وغامق حسب الجهاز من CSS بس، والحالة بتتحفظ في [[localStorage]] (في [[try]]). من دروس «الحالة ← الصفحة» و «الجسر» و «DevTools للتلاتة».`, done: R`Tab مرة واحدة بيوصل لخانة النهارده في أول عادة، والسهم اليمين بيرجع يوم، وتحت بينزل عادة، و Space بيعلّم والنسبة والـ «ورا بعض» بيتغيّروا، و Tab من الجدول بيطلع على طول. الـ refresh بيحتفظ بكل حاجة. العادة المكررة «العادة دي موجودة». axe صفر في الفاتح والغامق، والصفحة مفيهاش scroll أفقي على 360 (الجدول بس هو اللي بيعمل scroll جوه صندوقه).`, ext: R`زوّد أسبوع قبل وبعد بزرارين (الرابط [[?week=-1]])، وتصدير CSV لكل الأيام، وإشعار كل يوم الساعة ٩ بالليل لو النهارده فاضي (درس «Notification و permissions»).`, sol: R`~~~view 600 600 الشكل النهائي: علّم أيام، وجرّب Tab والأسهم و Space
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>عاداتي: متتبع أسبوعي</title>
  <style>
:root { color-scheme: light dark; --bg: light-dark(#f8fafc, #0b1120); --card: light-dark(#fff, #111827); --ink: light-dark(#0f172a, #e5e7eb); --muted: light-dark(#64748b, #94a3b8); --line: light-dark(#e2e8f0, #1f2937); --done: #15803d; --today: #f59e0b; --today-text: light-dark(#b45309, #fbbf24); --done-text: light-dark(#15803d, #4ade80); --pct: 0; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
main { max-width: 760px; margin: auto; padding: 16px; }
.head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
h1 { margin: 0; font-size: clamp(1.2rem, 4vw, 1.8rem); }

/* الدايرة: الـ JS بيبعت --pct من ٠ لـ ١، و conic-gradient بيرسم القوس */
.ring { flex: none; display: grid; place-items: center; width: 72px; aspect-ratio: 1; border-radius: 50%; background: conic-gradient(var(--done) calc(var(--pct) * 360deg), var(--line) 0); }
.ring span { display: grid; place-items: center; width: 56px; aspect-ratio: 1; border-radius: 50%; background: var(--bg); font-weight: 800; }

/* الجدول بيعمل scroll جوه نفسه لو الشاشة ضيقة، والصفحة نفسها لأ.
   position: relative عشان الـ caption المخفي (absolute) يفضل جوه الصندوق ده */
.board { position: relative; margin-top: 12px; overflow-x: auto; background: var(--card); border: 1px solid var(--line); border-radius: 12px; }
.grid { border-collapse: collapse; width: 100%; min-width: 440px; }
.grid th, .grid td { padding: 6px 4px; text-align: center; border-block-end: 1px solid var(--line); }
.grid thead th { color: var(--muted); font-weight: 600; }
.grid abbr { text-decoration: none; }
.grid th[scope="row"] { text-align: start; padding-inline-start: 12px; font-weight: 700; white-space: nowrap; }
.grid th.is-today { color: var(--today-text); font-weight: 800; }
.day { width: 36px; height: 36px; border: 2px solid var(--line); border-radius: 10px; background: transparent; cursor: pointer; }
.day[aria-pressed="true"] { background: var(--done); border-color: var(--done); }
.day[aria-pressed="true"]::after { content: "✓"; color: #fff; font-weight: 800; }
td.is-today .day { border-color: var(--today); }
.day:focus-visible, .remove:focus-visible, .add :focus-visible { outline: 3px solid var(--today); outline-offset: 2px; }
.streak { font-weight: 800; color: var(--muted); }
.streak[data-hot] { color: var(--done-text); }
.remove { width: 32px; height: 32px; border: 0; border-radius: 8px; background: transparent; color: var(--muted); cursor: pointer; }
.remove:hover { color: #dc2626; }

.add { margin-top: 16px; }
.add label { font-weight: 700; }
.add-row { display: flex; gap: 8px; }
.add input { flex: 1; min-width: 0; font: inherit; padding: 8px 10px; border: 2px solid var(--line); border-radius: 8px; background: var(--card); color: inherit; }
.add input:user-invalid { border-color: #dc2626; }
.add button { font: inherit; font-weight: 700; padding: 8px 16px; border: 0; border-radius: 8px; background: var(--done); color: #fff; cursor: pointer; }
.note { min-height: 1.6em; color: var(--muted); }
</style>
  <script type="module">
const KEY = "habits-v1";
const nums = new Intl.NumberFormat("ar-EG");
const dayName = new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long" });
const dayNum = new Intl.DateTimeFormat("ar-EG", { day: "numeric" });

// ١. آخر ٧ أيام بتوقيت الجهاز، والنهارده آخر عمود. المفتاح "2026-11-21" (مش toISOString عشان UTC)
const pad = (n) => String(n).padStart(2, "0");
const key = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);             // نص اليوم: setDate مبيتلخبطش في يوم تغيير الساعة
  d.setDate(d.getDate() - (6 - i));
  return { date: d, key: key(d) };
});

// ٢. التخزين جوه try: ممكن يكون مقفول (iframe معزول أو تصفح خاص)
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); return true; } catch { return false; } },
};

// ٣. الحالة: كل عادة فيها الأيام اللي اتعملت فيها
const sample = (...back) => back.map((b) => days[6 - b].key);
const state = store.get() || {
  habits: [
    { id: 1, name: "أشرب ٨ كوبايات مية", done: sample(0, 1, 2, 4) },
    { id: 2, name: "رياضة ٢٠ دقيقة", done: sample(1, 3) },
    { id: 3, name: "أقرا ١٠ صفحات", done: sample(0, 1, 2, 3, 4, 5) },
  ],
};
const focus = { row: 0, col: 6 };

// ٤. حسابات من الحالة (مبتتخزنش)
const isDone = (h, c) => h.done.includes(days[c].key);
function streak(h) {
  let n = 0;
  for (let c = 6; c >= 0 && isDone(h, c); c--) n++;
  return n;
}
function percent() {
  const all = state.habits.length * 7;
  const done = state.habits.reduce((n, h) => n + days.filter((_, c) => isDone(h, c)).length, 0);
  return all ? done / all : 0;
}

// ٥. render: الحالة ← الصفحة
const rows = document.querySelector(".js-rows");
const tpl = document.querySelector("#row-tpl");
const note = document.querySelector(".js-note");

document.querySelectorAll(".js-day").forEach((th, c) => {
  const abbr = document.createElement("abbr");
  abbr.title = dayName.format(days[c].date);
  abbr.textContent = dayNum.format(days[c].date);
  th.append(abbr);
  th.classList.toggle("is-today", c === 6);
});

function render() {
  rows.replaceChildren(...state.habits.map((h, r) => {
    const tr = tpl.content.firstElementChild.cloneNode(true);
    tr.dataset.id = h.id;
    tr.querySelector(".name").textContent = h.name;
    tr.querySelectorAll(".day").forEach((btn, c) => {
      btn.setAttribute("aria-pressed", isDone(h, c));
      btn.setAttribute("aria-label", h.name + "، " + dayName.format(days[c].date));
      btn.dataset.row = r;
      btn.dataset.col = c;
      btn.tabIndex = r === focus.row && c === focus.col ? 0 : -1;
      btn.parentElement.classList.toggle("is-today", c === 6);
    });
    const s = streak(h);
    const cell = tr.querySelector(".streak");
    cell.textContent = nums.format(s);
    cell.toggleAttribute("data-hot", s >= 3);
    tr.querySelector(".remove").setAttribute("aria-label", "شيل " + h.name);
    return tr;
  }));
  const p = Math.round(percent() * 100);
  const ring = document.querySelector(".js-ring");
  ring.style.setProperty("--pct", percent().toFixed(3));
  ring.setAttribute("aria-label", "اتعمل " + nums.format(p) + "٪ من آخر ٧ أيام");
  document.querySelector(".js-percent").textContent = nums.format(p) + "٪";
  if (!store.set(state)) note.textContent = "التخزين مقفول هنا: التغييرات مش هتتحفظ بعد الـ refresh.";
}

function focusCell() {
  rows.querySelector('[data-row="' + focus.row + '"][data-col="' + focus.col + '"]')?.focus();
}

// ٦. الأحداث: بتغيّر الحالة وتنده render
rows.addEventListener("click", (e) => {
  const day = e.target.closest(".day");
  const remove = e.target.closest(".remove");
  if (day) {
    const h = state.habits[Number(day.dataset.row)];
    const k = days[Number(day.dataset.col)].key;
    h.done = h.done.includes(k) ? h.done.filter((x) => x !== k) : [...h.done, k];
    focus.row = Number(day.dataset.row);
    focus.col = Number(day.dataset.col);
    render();
    focusCell();
  }
  if (remove) {
    const id = Number(remove.closest("tr").dataset.id);
    const name = state.habits.find((h) => h.id === id).name;
    state.habits = state.habits.filter((h) => h.id !== id);
    focus.row = 0;
    render();
    note.textContent = "اتشالت «" + name + "»";
    document.querySelector("#habit").focus();
  }
});

// الأسهم بتتنقل بين المربعات (roving tabindex): Tab بيدخل الجدول مرة واحدة ويطلع منه مرة واحدة
rows.addEventListener("keydown", (e) => {
  if (!e.target.matches(".day")) return;
  const moves = { ArrowLeft: [0, 1], ArrowRight: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0], Home: [0, -6], End: [0, 6] };
  const m = moves[e.key];
  if (!m) return;
  e.preventDefault();
  focus.row = Math.min(state.habits.length - 1, Math.max(0, focus.row + m[0]));
  focus.col = Math.min(6, Math.max(0, focus.col + m[1]));
  render();
  focusCell();
});

const form = document.querySelector(".js-add");
const input = form.elements.habit;
form.noValidate = true;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  const dup = state.habits.some((h) => h.name === name);
  input.setCustomValidity(!name ? "اكتب اسم العادة" : dup ? "العادة دي موجودة" : "");
  if (!input.reportValidity()) return;
  state.habits.push({ id: Date.now(), name, done: [] });
  form.reset();
  render();
  note.textContent = "اتضافت «" + name + "»";
});
input.addEventListener("input", () => input.setCustomValidity(""));

render();
</script>
</head>
<body>
  <main>
    <header class="head">
      <h1>عاداتي آخر ٧ أيام</h1>
      <div class="ring js-ring" role="img" aria-label="اتعمل ٠٪ من الأسبوع"><span class="js-percent">٠٪</span></div>
    </header>

    <div class="board">
      <table class="grid">
        <caption class="sr-only">العادات وآخر ٧ أيام: دوس على المربع لما تعمل العادة في اليوم ده، والأسهم بتتنقل بين المربعات</caption>
        <thead>
          <tr>
            <th scope="col">العادة</th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col">ورا بعض</th>
            <th scope="col"><span class="sr-only">شيل</span></th>
          </tr>
        </thead>
        <tbody class="js-rows"></tbody>
      </table>
    </div>

    <form class="add js-add">
      <label for="habit">عادة جديدة</label>
      <div class="add-row">
        <input id="habit" name="habit" required maxlength="30" autocomplete="off" placeholder="مثلًا: مشي ٢٠ دقيقة">
        <button type="submit">زوّد</button>
      </div>
    </form>
    <p class="note js-note" role="status"></p>
    <noscript><p>المتتبع محتاج JavaScript عشان يرسم الجدول ويحفظ.</p></noscript>
  </main>

  <template id="row-tpl">
    <tr>
      <th scope="row" class="name"></th>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td class="streak"></td>
      <td><button type="button" class="remove">✕</button></td>
    </tr>
  </template>
</body>
</html>
~~~

**هتشوف إيه:** «عاداتي آخر ٧ أيام» وجنبه دايرة فيها «٥٧٪» والقوس الأخضر واخد أكتر من نصها. تحته جدول: عمود أسماء العادات، و ٧ أعمدة بأرقام الأيام (آخرها النهارده باللون البرتقالي الغامق وخاناته بإطار برتقالي)، وخانات خضرا فيها ✓ واللي فاضية إطار رمادي، وعمود «ورا بعض» (٣ و ٦ بالأخضر)، و ✕. تحت فورم «عادة جديدة». على الموبايل الجدول بيتزق جوه صندوقه بالصباع والصفحة نفسها ثابتة. ولو الجهاز غامق الصفحة كلها غامقة.

### الملفات

~~~text habit-tracker/
habit-tracker/
├── index.html      الـ header والجدول (رؤوس فاضية) والـ template بتاع الصف والفورم
├── css/
│   └── styles.css  الثيم بـ light-dark()، والدايرة من --pct، والخانات من aria-pressed
└── js/
    └── app.js      الأيام، والحالة، والحسابات، و render، والكيبورد، والتخزين
~~~

**ترتيب البناء:** جدول HTML ثابت بصفين مكتوبين بإيدي ← CSS لحد ما الشكل يبقى صح على 360 و 1280 ← الصف يتنقل لـ [[<template>]] ← [[days]] و [[state]] و [[render()]] ← الدوسة ← الحسابات (النسبة و «ورا بعض») ← الكيبورد ← الفورم ← التخزين ← axe في الوضعين والمقاسات.

### تشغّله إزاي

~~~powershell
mkdir habit-tracker; cd habit-tracker
mkdir css, js
ni index.html, css/styles.css, js/app.js
code .
npx serve -l 8080
~~~

وافتح [[http://localhost:8080]]. (Git Bash: [[mkdir -p habit-tracker/{css,js} && cd habit-tracker && touch index.html css/styles.css js/app.js]].) عشان تبدأ من الأول: Console › [[localStorage.removeItem("habits-v1")]] و Ctrl+R.

### لو مشتغلش

- **scroll أفقي على الصفحة كلها على 360:** قست [[document.documentElement.scrollWidth]] = **537** والشاشة 360، مع إن الجدول جوه صندوق [[overflow-x: auto]]. اللي كان بيطلع برّه هو الـ [[<caption class="sr-only">]]: [[position: absolute]] من غير أب [[position: relative]]، فاتحسب من الصفحة كلها في مكانه جوه الجدول العريض. سطر [[position: relative]] على [[.board]] رجّعها **360**.
- **axe قال [[color-contrast]]:** رقم النهارده كان بلون [[#f59e0b]] على أبيض (برتقالي فاتح)، وزرار «زوّد» أبيض على [[#16a34a]]. خليت النص [[--today-text: light-dark(#b45309, #fbbf24)]] (غامق في الفاتح، فاتح في الغامق) والأخضر [[#15803d]]، و «ورا بعض» في الغامق [[#4ade80]]. axe بقى صفر في الوضعين.
- **«التخزين مقفول هنا»:** دي مش غلطة. الـ preview بتاع الموقع iframe معزول و [[localStorage]] بيرمي [[SecurityError]] (درس «الحالة ← الصفحة»)، فالـ [[store.set()]] رجّع [[false]] والصفحة قالت كده بدل ما تقع.
- **فتحته بدبل كليك:** جدول فاضي من غير صفوف، و Console: [[Access to script at 'file:///C:/Users/ali/habit-tracker/js/app.js' from origin 'null' has been blocked by CORS policy: ...]].

### إزاي التلاتة مربوطين

| الـ HTML بيدي | الـ JS بيعمل | الـ CSS بيرسم |
|---|---|---|
| [[<table>]] و [[<caption>]] و [[<th scope="col">]] و [[<th scope="row">]] | بيملا رؤوس الأيام بـ [[<abbr title="السبت، ٢١ نوفمبر">]] | [[.grid th.is-today]] برتقالي |
| [[<template id="row-tpl">]] فيه ٧ [[<button class="day" aria-pressed>]] | نسخة لكل عادة، و [[aria-pressed]] و [[aria-label]] و [[tabIndex]] لكل خانة | [[.day[aria-pressed="true"]]] أخضر و [[::after]] بـ ✓ |
| [[<td class="streak">]] | الرقم، و [[data-hot]] لو ٣ أو أكتر | [[.streak[data-hot]]] أخضر |
| [[<div class="ring" role="img">]] | [[--pct]] رقم من ٠ لـ ١، و [[aria-label]] بالنسبة | [[conic-gradient(var(--done) calc(var(--pct) * 360deg), …)]] |
| — | — | [[color-scheme: light dark]] و [[light-dark()]]: الثيم من الجهاز |
| [[<form>]] و [[required]] و [[maxlength]] | تكرار ← [[setCustomValidity("العادة دي موجودة")]] | [[:user-invalid]] |
| [[<p role="status">]] | «اتضافت» و «اتشالت» و «التخزين مقفول» | — |

**الحدث ← الحالة ← العرض:** دوسة أو مفتاح ← [[state.habits]] أو [[focus]] ← [[render()]] بترسم الصفوف كلها ← [[focusCell()]] يرجّع الـ focus للخانة الصح (لأن [[render()]] عملت أزرار جديدة). وكل الأرقام (النسبة و «ورا بعض») دوال بتتحسب من [[state]].

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>عاداتي: متتبع أسبوعي</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <main>
    <header class="head">
      <h1>عاداتي آخر ٧ أيام</h1>
      <div class="ring js-ring" role="img" aria-label="اتعمل ٠٪ من الأسبوع"><span class="js-percent">٠٪</span></div>
    </header>

    <div class="board">
      <table class="grid">
        <caption class="sr-only">العادات وآخر ٧ أيام: دوس على المربع لما تعمل العادة في اليوم ده، والأسهم بتتنقل بين المربعات</caption>
        <thead>
          <tr>
            <th scope="col">العادة</th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col" class="js-day"></th>
            <th scope="col">ورا بعض</th>
            <th scope="col"><span class="sr-only">شيل</span></th>
          </tr>
        </thead>
        <tbody class="js-rows"></tbody>
      </table>
    </div>

    <form class="add js-add">
      <label for="habit">عادة جديدة</label>
      <div class="add-row">
        <input id="habit" name="habit" required maxlength="30" autocomplete="off" placeholder="مثلًا: مشي ٢٠ دقيقة">
        <button type="submit">زوّد</button>
      </div>
    </form>
    <p class="note js-note" role="status"></p>
    <noscript><p>المتتبع محتاج JavaScript عشان يرسم الجدول ويحفظ.</p></noscript>
  </main>

  <template id="row-tpl">
    <tr>
      <th scope="row" class="name"></th>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td><button type="button" class="day" aria-pressed="false"></button></td>
      <td class="streak"></td>
      <td><button type="button" class="remove">✕</button></td>
    </tr>
  </template>
</body>
</html>
~~~

~~~css css/styles.css
:root { color-scheme: light dark; --bg: light-dark(#f8fafc, #0b1120); --card: light-dark(#fff, #111827); --ink: light-dark(#0f172a, #e5e7eb); --muted: light-dark(#64748b, #94a3b8); --line: light-dark(#e2e8f0, #1f2937); --done: #15803d; --today: #f59e0b; --today-text: light-dark(#b45309, #fbbf24); --done-text: light-dark(#15803d, #4ade80); --pct: 0; }
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: var(--ink); background: var(--bg); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
main { max-width: 760px; margin: auto; padding: 16px; }
.head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
h1 { margin: 0; font-size: clamp(1.2rem, 4vw, 1.8rem); }

/* الدايرة: الـ JS بيبعت --pct من ٠ لـ ١، و conic-gradient بيرسم القوس */
.ring { flex: none; display: grid; place-items: center; width: 72px; aspect-ratio: 1; border-radius: 50%; background: conic-gradient(var(--done) calc(var(--pct) * 360deg), var(--line) 0); }
.ring span { display: grid; place-items: center; width: 56px; aspect-ratio: 1; border-radius: 50%; background: var(--bg); font-weight: 800; }

/* الجدول بيعمل scroll جوه نفسه لو الشاشة ضيقة، والصفحة نفسها لأ.
   position: relative عشان الـ caption المخفي (absolute) يفضل جوه الصندوق ده */
.board { position: relative; margin-top: 12px; overflow-x: auto; background: var(--card); border: 1px solid var(--line); border-radius: 12px; }
.grid { border-collapse: collapse; width: 100%; min-width: 440px; }
.grid th, .grid td { padding: 6px 4px; text-align: center; border-block-end: 1px solid var(--line); }
.grid thead th { color: var(--muted); font-weight: 600; }
.grid abbr { text-decoration: none; }
.grid th[scope="row"] { text-align: start; padding-inline-start: 12px; font-weight: 700; white-space: nowrap; }
.grid th.is-today { color: var(--today-text); font-weight: 800; }
.day { width: 36px; height: 36px; border: 2px solid var(--line); border-radius: 10px; background: transparent; cursor: pointer; }
.day[aria-pressed="true"] { background: var(--done); border-color: var(--done); }
.day[aria-pressed="true"]::after { content: "✓"; color: #fff; font-weight: 800; }
td.is-today .day { border-color: var(--today); }
.day:focus-visible, .remove:focus-visible, .add :focus-visible { outline: 3px solid var(--today); outline-offset: 2px; }
.streak { font-weight: 800; color: var(--muted); }
.streak[data-hot] { color: var(--done-text); }
.remove { width: 32px; height: 32px; border: 0; border-radius: 8px; background: transparent; color: var(--muted); cursor: pointer; }
.remove:hover { color: #dc2626; }

.add { margin-top: 16px; }
.add label { font-weight: 700; }
.add-row { display: flex; gap: 8px; }
.add input { flex: 1; min-width: 0; font: inherit; padding: 8px 10px; border: 2px solid var(--line); border-radius: 8px; background: var(--card); color: inherit; }
.add input:user-invalid { border-color: #dc2626; }
.add button { font: inherit; font-weight: 700; padding: 8px 16px; border: 0; border-radius: 8px; background: var(--done); color: #fff; cursor: pointer; }
.note { min-height: 1.6em; color: var(--muted); }
~~~

~~~js js/app.js
const KEY = "habits-v1";
const nums = new Intl.NumberFormat("ar-EG");
const dayName = new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long" });
const dayNum = new Intl.DateTimeFormat("ar-EG", { day: "numeric" });

// ١. آخر ٧ أيام بتوقيت الجهاز، والنهارده آخر عمود. المفتاح "2026-11-21" (مش toISOString عشان UTC)
const pad = (n) => String(n).padStart(2, "0");
const key = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);             // نص اليوم: setDate مبيتلخبطش في يوم تغيير الساعة
  d.setDate(d.getDate() - (6 - i));
  return { date: d, key: key(d) };
});

// ٢. التخزين جوه try: ممكن يكون مقفول (iframe معزول أو تصفح خاص)
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); return true; } catch { return false; } },
};

// ٣. الحالة: كل عادة فيها الأيام اللي اتعملت فيها
const sample = (...back) => back.map((b) => days[6 - b].key);
const state = store.get() || {
  habits: [
    { id: 1, name: "أشرب ٨ كوبايات مية", done: sample(0, 1, 2, 4) },
    { id: 2, name: "رياضة ٢٠ دقيقة", done: sample(1, 3) },
    { id: 3, name: "أقرا ١٠ صفحات", done: sample(0, 1, 2, 3, 4, 5) },
  ],
};
const focus = { row: 0, col: 6 };

// ٤. حسابات من الحالة (مبتتخزنش)
const isDone = (h, c) => h.done.includes(days[c].key);
function streak(h) {
  let n = 0;
  for (let c = 6; c >= 0 && isDone(h, c); c--) n++;
  return n;
}
function percent() {
  const all = state.habits.length * 7;
  const done = state.habits.reduce((n, h) => n + days.filter((_, c) => isDone(h, c)).length, 0);
  return all ? done / all : 0;
}

// ٥. render: الحالة ← الصفحة
const rows = document.querySelector(".js-rows");
const tpl = document.querySelector("#row-tpl");
const note = document.querySelector(".js-note");

document.querySelectorAll(".js-day").forEach((th, c) => {
  const abbr = document.createElement("abbr");
  abbr.title = dayName.format(days[c].date);
  abbr.textContent = dayNum.format(days[c].date);
  th.append(abbr);
  th.classList.toggle("is-today", c === 6);
});

function render() {
  rows.replaceChildren(...state.habits.map((h, r) => {
    const tr = tpl.content.firstElementChild.cloneNode(true);
    tr.dataset.id = h.id;
    tr.querySelector(".name").textContent = h.name;
    tr.querySelectorAll(".day").forEach((btn, c) => {
      btn.setAttribute("aria-pressed", isDone(h, c));
      btn.setAttribute("aria-label", h.name + "، " + dayName.format(days[c].date));
      btn.dataset.row = r;
      btn.dataset.col = c;
      btn.tabIndex = r === focus.row && c === focus.col ? 0 : -1;
      btn.parentElement.classList.toggle("is-today", c === 6);
    });
    const s = streak(h);
    const cell = tr.querySelector(".streak");
    cell.textContent = nums.format(s);
    cell.toggleAttribute("data-hot", s >= 3);
    tr.querySelector(".remove").setAttribute("aria-label", "شيل " + h.name);
    return tr;
  }));
  const p = Math.round(percent() * 100);
  const ring = document.querySelector(".js-ring");
  ring.style.setProperty("--pct", percent().toFixed(3));
  ring.setAttribute("aria-label", "اتعمل " + nums.format(p) + "٪ من آخر ٧ أيام");
  document.querySelector(".js-percent").textContent = nums.format(p) + "٪";
  if (!store.set(state)) note.textContent = "التخزين مقفول هنا: التغييرات مش هتتحفظ بعد الـ refresh.";
}

function focusCell() {
  rows.querySelector('[data-row="' + focus.row + '"][data-col="' + focus.col + '"]')?.focus();
}

// ٦. الأحداث: بتغيّر الحالة وتنده render
rows.addEventListener("click", (e) => {
  const day = e.target.closest(".day");
  const remove = e.target.closest(".remove");
  if (day) {
    const h = state.habits[Number(day.dataset.row)];
    const k = days[Number(day.dataset.col)].key;
    h.done = h.done.includes(k) ? h.done.filter((x) => x !== k) : [...h.done, k];
    focus.row = Number(day.dataset.row);
    focus.col = Number(day.dataset.col);
    render();
    focusCell();
  }
  if (remove) {
    const id = Number(remove.closest("tr").dataset.id);
    const name = state.habits.find((h) => h.id === id).name;
    state.habits = state.habits.filter((h) => h.id !== id);
    focus.row = 0;
    render();
    note.textContent = "اتشالت «" + name + "»";
    document.querySelector("#habit").focus();
  }
});

// الأسهم بتتنقل بين المربعات (roving tabindex): Tab بيدخل الجدول مرة واحدة ويطلع منه مرة واحدة
rows.addEventListener("keydown", (e) => {
  if (!e.target.matches(".day")) return;
  const moves = { ArrowLeft: [0, 1], ArrowRight: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0], Home: [0, -6], End: [0, 6] };
  const m = moves[e.key];
  if (!m) return;
  e.preventDefault();
  focus.row = Math.min(state.habits.length - 1, Math.max(0, focus.row + m[0]));
  focus.col = Math.min(6, Math.max(0, focus.col + m[1]));
  render();
  focusCell();
});

const form = document.querySelector(".js-add");
const input = form.elements.habit;
form.noValidate = true;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  const dup = state.habits.some((h) => h.name === name);
  input.setCustomValidity(!name ? "اكتب اسم العادة" : dup ? "العادة دي موجودة" : "");
  if (!input.reportValidity()) return;
  state.habits.push({ id: Date.now(), name, done: [] });
  form.reset();
  render();
  note.textContent = "اتضافت «" + name + "»";
});
input.addEventListener("input", () => input.setCustomValidity(""));

render();
~~~

### أهم الحتت

- **الأيام بتوقيت الجهاز:** [[key(d)]] بيكتب [["2026-11-21"]] من [[getFullYear]] و [[getMonth]] و [[getDate]]، مش [[toISOString()]] اللي بـ UTC. و [[setHours(12)]] قبل [[setDate]] عشان يوم تغيير الساعة الصيفي ميخليش يومين يبقوا نفس التاريخ.
- **التخزين بالتاريخ مش برقم العمود:** [[done]] لستة تواريخ زي [["2026-11-20"]]. بكرة الأعمدة بتتزق يوم، والأيام اللي اتعلّمت بتفضل في مكانها الصح.
- **roving tabindex:** خانة واحدة بس [[tabIndex = 0]] والباقي [[-1]]. فـ Tab بيدخل الجدول على الخانة دي ويطلع على اللي بعده (زرار ✕) مرة واحدة، بدل ٢١ Tab. والأسهم بتغيّر [[focus]] وتعيد الرسم. في RTL [[ArrowLeft]] = اليوم اللي بعده.
- **[[e.preventDefault()]]** على الأسهم بس: من غيره السهم كان هيعمل scroll للصندوق كمان.
- **[[render()]] بتعمل الأزرار من جديد**، فالزرار اللي كان عليه الـ focus بيتمسح. [[focusCell()]] بعد كل [[render()]] بيرجّعه بنفس الـ [[data-row]] و [[data-col]] (درس «الـ DOM مش مكان الحالة» بيشرح الفخ ده).
- **الدايرة:** [[conic-gradient]] بيلف لون لحد [[--pct * 360deg]] والباقي رمادي، و [[span]] جواها بلون الخلفية بيعمل الفتحة. ومن ناحية قارئ الشاشة [[role="img"]] و [[aria-label]] بالجملة.

### اتقاس (Chrome 158، Playwright، من سيرفر محلي، يوم ٢١ نوفمبر)

~~~text
الرؤوس:                  ١٥ … ٢١، والـ title «السبت، ٢١ نوفمبر» على الأخير
أول ما فتحت:             «٥٧٪»، ورا بعض: ٣ (أخضر) و ٠ و ٦ (أخضر)
خانات فيها tabIndex 0:    1
Tab:                     «أشرب ٨ كوبايات مية، السبت، ٢١ نوفمبر»
سهم يمين:                «… الجمعة، ٢٠ نوفمبر»
سهم تحت + Space:          الرياضة يوم الجمعة اتشالت، «٥٢٪»
End ثم Tab:              الـ focus طلع على «شيل رياضة ٢٠ دقيقة»
دوسة على النهارده للرياضة: «٥٧٪»، ورا بعض للرياضة ١
refresh:                 نفس الخانات ونفس الأرقام
زوّد فاضي:               «اكتب اسم العادة»
زوّد «رياضة ٢٠ دقيقة»:    «العادة دي موجودة»
زوّد «مشي» ثم ✕:          «اتضافت «مشي»» ثم «اتشالت «مشي»» والـ focus رجع لحقل العادة
axe-core 4.10.2:         0 violations في الفاتح و 0 في الغامق (بعد تصليح الألوان)
scrollWidth الصفحة:       360 ← 360، 768 ← 768، 1280 ← 1280 (والجدول على 360: 539 جوه صندوق 326 بيعمل scroll)
page errors:             ولا واحد
~~~` },
        { lvl: 'فكرة', dir: "my-place", t: R`صفحة لمكان بتعرفه، بخطة للتلات طبقات قبل الكود`, what: R`اختار مكان حقيقي حواليك (محل، أو ورشة، أو مطعم صغير، أو درس خصوصي، أو جيم) واعمله صفحة واحدة. **قبل ما تكتب سطر:** اكتب في [[PLAN.md]] جدول فيه كل ميزة، وهتتعمل في أنهي طبقة (HTML أو CSS أو JS) وليه، واختار دايمًا أبسط طبقة تقدر عليها (درس «مين بيعمل إيه»). وبعدين ابني بنفس الترتيب: HTML لوحده يشتغل، ثم CSS، ثم JS للي محدش غيره يعمله. لازم يبقى فيها حاجة واحدة على الأقل JS بيعملها بجد، وحاجة واحدة شكلها «تفاعلية» بس من غير JS.`, done: R`فيه [[PLAN.md]] بجدول الطبقات مكتوب قبل الكود، والصفحة من غير JS بتعرض كل المعلومات المهمة (التليفون والمواعيد والأسعار)، و axe صفر، ومفيش scroll أفقي على 360 و 768 و 1280، وصاحب المكان (أو صاحبك) فتحها من موبايله وفهمها من غير ما تشرحله.`, ext: R`حطها على GitHub Pages (درس «تشغّل المشروع وتعرضه»)، وزوّد [[<meta property="og:...">]] عشان اللينك يبان كويس على واتساب، وصفحة إنجليزي بنفس الـ CSS. وخلي «مفتوح دلوقتي» يقول «بيفتح بكرة الساعة ٩» لو المحل قفل لليوم.`, sol: R`~~~view 620 620 النسخة النموذجية: فطاطري متخيّل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>فطاطري عم سيد: المنيو والمواعيد</title>
  <meta name="description" content="فطير مشلتت وحلو وحادق في شارع البحر. المنيو والأسعار ومواعيد الفتح.">
  <style>
:root { --brand: #92400e; --ink: #1c1917; --cream: #fef3c7; --ok: #166534; --closed: #991b1b; }
* { box-sizing: border-box; }
body { margin: 0; font: 17px/1.7 system-ui, sans-serif; color: var(--ink); background: #fffbeb; }
:is(a, input):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

.hero { padding: 32px 16px; text-align: center; background: var(--brand); color: #fff; }
.hero h1 { margin: 0; font-size: clamp(1.8rem, 6vw, 3rem); }
.hero p { margin: 4px 0; }
.call { display: inline-block; margin-top: 12px; padding: 10px 20px; border-radius: 999px; background: #fff; color: var(--brand); font-weight: 800; text-decoration: none; }

/* حالة «مفتوح دلوقتي»: الـ JS بيكتب data-state بس */
.open { display: inline-block; padding: 2px 12px; border-radius: 999px; background: #ffffff33; }
.open[data-state="open"] { background: #dcfce7; color: var(--ok); font-weight: 800; }
.open[data-state="closed"] { background: #fee2e2; color: var(--closed); font-weight: 800; }

main { display: grid; gap: 24px; max-width: 900px; margin: auto; padding: 16px; }
@media (min-width: 760px) { main { grid-template-columns: 3fr 2fr; } }
h2 { margin: 0 0 8px; color: var(--brand); }

/* الفلتر من غير JS: radio حقيقي، و :has() بيخبّي اللي مش من القسم */
.filter { display: flex; gap: 6px; margin: 0 0 8px; padding: 0; border: 0; }
.filter legend { float: inline-start; margin-inline-end: 6px; font-weight: 700; }
.filter label { padding: 2px 12px; border: 1px solid #d6d3d1; border-radius: 999px; background: #fff; cursor: pointer; }
.filter label:has(:checked) { background: var(--brand); color: #fff; border-color: var(--brand); }
.filter label:has(:focus-visible) { outline: 3px solid #f59e0b; outline-offset: 2px; }
.filter input { position: absolute; opacity: 0; }
main:has(#f-sweet:checked) .item:not([data-cat="sweet"]),
main:has(#f-savory:checked) .item:not([data-cat="savory"]) { display: none; }

.menu { list-style: none; margin: 0; padding: 0; }
.item { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-block-end: 1px dashed #d6d3d1; }
.hours div { padding: 8px 12px; border-radius: 10px; background: var(--cream); margin-bottom: 8px; }
.hours div.is-today { outline: 2px solid var(--brand); }
.hours dt { font-weight: 800; }
.hours dd { margin: 0; }
footer { padding: 16px; text-align: center; color: #57534e; }
</style>
  <script type="module">
// الشغلة الوحيدة اللي HTML و CSS ميقدروش عليها: «مفتوح دلوقتي ولا لأ» محتاج الساعة
const status = document.querySelector(".js-open");
const rows = [...document.querySelectorAll(".js-hours [data-days]")];
const time = new Intl.DateTimeFormat("ar-EG", { hour: "numeric" });

function update(now = new Date()) {
  const day = now.getDay();               // الحد 0 … السبت 6، بتوقيت الجهاز
  const hour = now.getHours() + now.getMinutes() / 60;
  const row = rows.find((r) => r.dataset.days.split(",").map(Number).includes(day));
  for (const r of rows) r.classList.toggle("is-today", r === row);
  if (!row) return;
  const open = Number(row.dataset.open), close = Number(row.dataset.close);
  const at = (h) => new Date(now.getFullYear(), now.getMonth(), now.getDate(), h);
  const isOpen = hour >= open && hour < close;
  status.dataset.state = isOpen ? "open" : "closed";
  status.textContent = isOpen
    ? "مفتوح دلوقتي، بيقفل " + time.format(at(close))
    : "مقفول دلوقتي، بيفتح " + time.format(at(open));
}

update();
setInterval(update, 60 * 1000);           // الصفحة ممكن تفضل مفتوحة ساعات
</script>
</head>
<body>
  <header class="hero">
    <h1>فطاطري عم سيد</h1>
    <p>فطير بلدي على الفرن من ١٩٨٨</p>
    <p class="open js-open" data-state="unknown" role="status">المواعيد تحت</p>
    <a class="call" href="tel:+20100000000">اتصل واطلب: 0100000000</a>
  </header>

  <main>
    <section aria-labelledby="menu-title">
      <h2 id="menu-title">المنيو</h2>
      <fieldset class="filter">
        <legend>اعرض</legend>
        <label><input type="radio" name="cat" id="f-all" checked> الكل</label>
        <label><input type="radio" name="cat" id="f-sweet"> حلو</label>
        <label><input type="radio" name="cat" id="f-savory"> حادق</label>
      </fieldset>
      <ul class="menu">
        <li class="item" data-cat="sweet"><span>فطير بالسكر والقشطة</span><b>٦٠ جنيه</b></li>
        <li class="item" data-cat="sweet"><span>فطير بالعسل والمكسرات</span><b>٨٥ جنيه</b></li>
        <li class="item" data-cat="savory"><span>فطير بالجبنة الرومي</span><b>٧٠ جنيه</b></li>
        <li class="item" data-cat="savory"><span>فطير باللحمة المفرومة</span><b>١١٠ جنيه</b></li>
        <li class="item" data-cat="savory"><span>مشلتت سادة</span><b>٤٥ جنيه</b></li>
      </ul>
    </section>

    <section aria-labelledby="hours-title">
      <h2 id="hours-title">المواعيد</h2>
      <dl class="hours js-hours">
        <div data-days="6,0,1,2,3,4" data-open="9" data-close="23"><dt>السبت للخميس</dt><dd>٩ الصبح لـ ١١ بالليل</dd></div>
        <div data-days="5" data-open="14" data-close="24"><dt>الجمعة</dt><dd>٢ الضهر لـ ١٢ بالليل</dd></div>
      </dl>
    </section>
  </main>

  <footer><p>٤٢ شارع البحر، الإسكندرية</p></footer>
</body>
</html>
~~~

**هتشوف إيه:** شريط بني كبير فوق فيه «فطاطري عم سيد» وتحته سطر، وشارة «مفتوح دلوقتي، بيقفل ١١ م» خضرا (أو «مقفول دلوقتي» حمرا حسب ساعة جهازك)، وزرار أبيض «اتصل واطلب». تحت: «المنيو» بأزرار «الكل / حلو / حادق» والأصناف بأسعارها، و «المواعيد» وصف النهارده عليه إطار. على الكمبيوتر المنيو والمواعيد جنب بعض.

### الخطة قبل الكود ([[PLAN.md]])

~~~text PLAN.md
# فطاطري عم سيد: الخطة

الناس عايزة تعرف ٣ حاجات: بيبيع إيه وبكام، فاتح ولا لأ، وتتصل إزاي.

| الميزة                  | الطبقة        | ليه
|-------------------------|---------------|------------------------------------------------
| الاسم والمنيو والأسعار    | HTML          | لازم تبان من غير أي حاجة، ولجوجل
| زرار «اتصل»              | HTML (tel:)   | لينك بيفتح الاتصال على الموبايل من غير JS
| المواعيد                 | HTML (dl)     | جدول أيام ومواعيد = قايمة تعريفات
| الشكل والألوان والموبايل  | CSS           | grid عمودين من 760px، و clamp للعنوان
| فلتر حلو / حادق          | HTML + CSS    | radio حقيقي (كيبورد وقارئ شاشة) و :has() يخبّي. مفيش داعي لـ JS
| «مفتوح دلوقتي»           | JS            | محتاج ساعة الجهاز. HTML و CSS ميعرفوش الوقت
| المواعيد بأرقام للـ JS     | HTML (data-*) | الأرقام في الـ HTML جنب الكلام اللي بيتقري، فمكان واحد يتعدّل

ترتيب البناء: HTML كامل وأفتحه من غير CSS ← CSS على 360 ثم 1280 ← الفلتر بـ :has ← JS للمواعيد ← axe والمقاسات.
~~~

**ليه التصميم ده:** ميزة واحدة بس محتاجة JS، وحتى لو JS موقعش الشارة بتقول «المواعيد تحت» والمواعيد مكتوبة. والفلتر مثال على حاجة شكلها تفاعلية بس HTML و CSS عملوها بعناصر حقيقية (مش حيلة الـ checkbox اللي في درس «نفس الميزة بتلات طرق»: هنا الـ radio هو فعلًا اختيار واحد من كذا، وده معناه الصح).

### الملفات

~~~text my-place/
my-place/
├── PLAN.md         الخطة اللي فوق
├── index.html      كل المعلومات، والفلتر radio، والمواعيد بـ data-days و data-open و data-close
├── css/
│   └── styles.css  الشكل، والفلتر بـ :has()، والشارة من data-state
└── js/
    └── app.js      «مفتوح دلوقتي» بس
~~~

### تشغّله إزاي

~~~powershell
mkdir my-place; cd my-place
mkdir css, js
ni PLAN.md, index.html, css/styles.css, js/app.js
code .
npx serve -l 8080
~~~

وافتح [[http://localhost:8080]] على الكمبيوتر، ومن الموبايل على نفس الـ Wi-Fi بـ IP جهازك (درس «تشغّل المشروع وتعرضه»). (Git Bash: [[mkdir -p my-place/{css,js} && cd my-place && touch PLAN.md index.html css/styles.css js/app.js]].)

### لو مشتغلش

- **«بيقفل الساعة 23 بالليل»:** أول نسخة كانت بتحسب الساعة بإيدي: [[(close % 24 || 12) + " بالليل"]]. جرّبتها في Node وطلّعت «بيقفل الساعة 23 بالليل» لـ 23. بدّلتها بـ [[Intl.DateTimeFormat("ar-EG", { hour: "numeric" })]] وبقت «١١ م» و «١٢ ص» من غير ولا سطر حساب.
- **الشارة بتقول «المواعيد تحت» وبس:** الـ JS مشتغلش. افتح Console: لو [[file://]] هتلاقي [[Access to script at 'file:///C:/Users/ali/my-place/js/app.js' from origin 'null' has been blocked by CORS policy: ...]]. الفلتر والباقي شغالين لأنهم HTML و CSS.
- **اليوم الغلط:** [[getDay()]] الحد = 0 والسبت = 6. لو كتبت [[data-days="0,1,2,3,4,5"]] للسبت للخميس هتلاقي الجمعة واخدة مواعيد السبت. قست بساعة متثبتة (تحت) إن الجمعة بتقرا سطر الجمعة.

### إزاي التلاتة مربوطين

| الـ HTML بيدي | الـ JS بيعمل | الـ CSS بيرسم |
|---|---|---|
| [[<p class="js-open" data-state="unknown" role="status">]] بنص احتياطي | [[data-state="open"]] أو [[closed]] والنص | [[.open[data-state="open"]]] أخضر و [[closed]] أحمر |
| [[<div data-days="6,0,1,2,3,4" data-open="9" data-close="23">]] | بيقرا الأرقام ويختار سطر النهارده | [[.hours div.is-today]] بإطار |
| [[<input type="radio" id="f-sweet">]] و [[data-cat]] على كل صنف | — | [[main:has(#f-sweet:checked) .item:not([data-cat="sweet"])]] مخفي |
| [[<a href="tel:+20100000000">]] | — | [[.call]] زرار |

### الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>فطاطري عم سيد: المنيو والمواعيد</title>
  <meta name="description" content="فطير مشلتت وحلو وحادق في شارع البحر. المنيو والأسعار ومواعيد الفتح.">
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <header class="hero">
    <h1>فطاطري عم سيد</h1>
    <p>فطير بلدي على الفرن من ١٩٨٨</p>
    <p class="open js-open" data-state="unknown" role="status">المواعيد تحت</p>
    <a class="call" href="tel:+20100000000">اتصل واطلب: 0100000000</a>
  </header>

  <main>
    <section aria-labelledby="menu-title">
      <h2 id="menu-title">المنيو</h2>
      <fieldset class="filter">
        <legend>اعرض</legend>
        <label><input type="radio" name="cat" id="f-all" checked> الكل</label>
        <label><input type="radio" name="cat" id="f-sweet"> حلو</label>
        <label><input type="radio" name="cat" id="f-savory"> حادق</label>
      </fieldset>
      <ul class="menu">
        <li class="item" data-cat="sweet"><span>فطير بالسكر والقشطة</span><b>٦٠ جنيه</b></li>
        <li class="item" data-cat="sweet"><span>فطير بالعسل والمكسرات</span><b>٨٥ جنيه</b></li>
        <li class="item" data-cat="savory"><span>فطير بالجبنة الرومي</span><b>٧٠ جنيه</b></li>
        <li class="item" data-cat="savory"><span>فطير باللحمة المفرومة</span><b>١١٠ جنيه</b></li>
        <li class="item" data-cat="savory"><span>مشلتت سادة</span><b>٤٥ جنيه</b></li>
      </ul>
    </section>

    <section aria-labelledby="hours-title">
      <h2 id="hours-title">المواعيد</h2>
      <dl class="hours js-hours">
        <div data-days="6,0,1,2,3,4" data-open="9" data-close="23"><dt>السبت للخميس</dt><dd>٩ الصبح لـ ١١ بالليل</dd></div>
        <div data-days="5" data-open="14" data-close="24"><dt>الجمعة</dt><dd>٢ الضهر لـ ١٢ بالليل</dd></div>
      </dl>
    </section>
  </main>

  <footer><p>٤٢ شارع البحر، الإسكندرية</p></footer>
</body>
</html>
~~~

~~~css css/styles.css
:root { --brand: #92400e; --ink: #1c1917; --cream: #fef3c7; --ok: #166534; --closed: #991b1b; }
* { box-sizing: border-box; }
body { margin: 0; font: 17px/1.7 system-ui, sans-serif; color: var(--ink); background: #fffbeb; }
:is(a, input):focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

.hero { padding: 32px 16px; text-align: center; background: var(--brand); color: #fff; }
.hero h1 { margin: 0; font-size: clamp(1.8rem, 6vw, 3rem); }
.hero p { margin: 4px 0; }
.call { display: inline-block; margin-top: 12px; padding: 10px 20px; border-radius: 999px; background: #fff; color: var(--brand); font-weight: 800; text-decoration: none; }

/* حالة «مفتوح دلوقتي»: الـ JS بيكتب data-state بس */
.open { display: inline-block; padding: 2px 12px; border-radius: 999px; background: #ffffff33; }
.open[data-state="open"] { background: #dcfce7; color: var(--ok); font-weight: 800; }
.open[data-state="closed"] { background: #fee2e2; color: var(--closed); font-weight: 800; }

main { display: grid; gap: 24px; max-width: 900px; margin: auto; padding: 16px; }
@media (min-width: 760px) { main { grid-template-columns: 3fr 2fr; } }
h2 { margin: 0 0 8px; color: var(--brand); }

/* الفلتر من غير JS: radio حقيقي، و :has() بيخبّي اللي مش من القسم */
.filter { display: flex; gap: 6px; margin: 0 0 8px; padding: 0; border: 0; }
.filter legend { float: inline-start; margin-inline-end: 6px; font-weight: 700; }
.filter label { padding: 2px 12px; border: 1px solid #d6d3d1; border-radius: 999px; background: #fff; cursor: pointer; }
.filter label:has(:checked) { background: var(--brand); color: #fff; border-color: var(--brand); }
.filter label:has(:focus-visible) { outline: 3px solid #f59e0b; outline-offset: 2px; }
.filter input { position: absolute; opacity: 0; }
main:has(#f-sweet:checked) .item:not([data-cat="sweet"]),
main:has(#f-savory:checked) .item:not([data-cat="savory"]) { display: none; }

.menu { list-style: none; margin: 0; padding: 0; }
.item { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-block-end: 1px dashed #d6d3d1; }
.hours div { padding: 8px 12px; border-radius: 10px; background: var(--cream); margin-bottom: 8px; }
.hours div.is-today { outline: 2px solid var(--brand); }
.hours dt { font-weight: 800; }
.hours dd { margin: 0; }
footer { padding: 16px; text-align: center; color: #57534e; }
~~~

~~~js js/app.js
// الشغلة الوحيدة اللي HTML و CSS ميقدروش عليها: «مفتوح دلوقتي ولا لأ» محتاج الساعة
const status = document.querySelector(".js-open");
const rows = [...document.querySelectorAll(".js-hours [data-days]")];
const time = new Intl.DateTimeFormat("ar-EG", { hour: "numeric" });

function update(now = new Date()) {
  const day = now.getDay();               // الحد 0 … السبت 6، بتوقيت الجهاز
  const hour = now.getHours() + now.getMinutes() / 60;
  const row = rows.find((r) => r.dataset.days.split(",").map(Number).includes(day));
  for (const r of rows) r.classList.toggle("is-today", r === row);
  if (!row) return;
  const open = Number(row.dataset.open), close = Number(row.dataset.close);
  const at = (h) => new Date(now.getFullYear(), now.getMonth(), now.getDate(), h);
  const isOpen = hour >= open && hour < close;
  status.dataset.state = isOpen ? "open" : "closed";
  status.textContent = isOpen
    ? "مفتوح دلوقتي، بيقفل " + time.format(at(close))
    : "مقفول دلوقتي، بيفتح " + time.format(at(open));
}

update();
setInterval(update, 60 * 1000);           // الصفحة ممكن تفضل مفتوحة ساعات
~~~

### أهم الحتت

- **[[data-days]] بالأرقام:** نفس أرقام [[getDay()]]، فالـ JS بيقارن من غير جدول أسامي. والكلام اللي الناس بتقراه («السبت للخميس») جنبهم في نفس العنصر، فاللي يعدّل المواعيد بيعدّل الاتنين في مكان واحد.
- **[[setInterval(update, 60 * 1000)]]:** الصفحة ممكن تفضل مفتوحة في تاب، فالشارة بتتحدث كل دقيقة.
- **[[update(now = new Date())]]:** الوقت parameter بقيمة افتراضية. في التجربة نقدر نبعت وقت معيّن، وفي الصفحة بياخد دلوقتي.
- **[[legend { float: inline-start }]]:** بيخلي «اعرض» على نفس سطر الأزرار (الـ legend مبيتحطش في flex غير كده).

### اتقاس (Chrome 158، Playwright بساعة متثبتة وتوقيت Africa/Cairo)

~~~text
السبت ١٠ الصبح:       open    «مفتوح دلوقتي، بيقفل ١١ م»   سطر «السبت للخميس»   خلفية rgb(220, 252, 231)
السبت ١١:٣٠ بالليل:    closed  «مقفول دلوقتي، بيفتح ٩ ص»    سطر «السبت للخميس»   خلفية rgb(254, 226, 226)
الجمعة ١ الضهر:        closed  «مقفول دلوقتي، بيفتح ٢ م»    سطر «الجمعة»
الجمعة ١١:٣٠ بالليل:   open    «مفتوح دلوقتي، بيقفل ١٢ ص»   سطر «الجمعة»
فلتر «حلو»:            ٢ أصناف ظاهرين، وسهم شمال نقل لـ «حادق» (٣ أصناف)
JS مقفول:             الفلتر شغال (حادق = ٣)، والشارة «المواعيد تحت»
axe-core 4.10.2:      0 violations
scrollWidth:          360 ← 345، 768 ← 768، 1280 ← 1280
~~~` },
      ],
      items: [
        {
          cmd: "مين بيعمل إيه: HTML و CSS و JS",
          title: "تلات لغات في صفحة واحدة: HTML المحتوى والمعنى، و CSS الشكل، و JavaScript السلوك",
          desc: R`كل صفحة ويب تلات طبقات فوق بعض: **HTML** بيقول «فيه إيه وده معناه إيه» (عنوان، زرار، فورم)، و **CSS** بيقول «شكله إيه» (لون، مسافات، layout)، و **JavaScript** بيقول «لما يحصل كذا اعمل كذا» (دوسة، كتابة، بيانات من السيرفر). كل طبقة بتشتغل على اللي تحتها، ولو واحدة من فوق وقعت، اللي تحتها لازم يفضل شغال.
• HTML لوحده: صفحة مقروءة ومفهومة لقارئ الشاشة ولجوجل، والفورم بيتبعت للسيرفر.
• + CSS: نفس المحتوى بشكل وترتيب ومقاسات للموبايل، وحالات زي [[:hover]] و [[:focus-visible]] من غير ولا سطر JS.
• + JS: سلوك من غير ما الصفحة تتحمّل من جديد: عدّاد، وفلتر، وبيانات بـ [[fetch]].
القاعدة اسمها **progressive enhancement**: ابدأ من HTML شغال، وكل طبقة «بتحسّن» مش «بتشغّل».`,
          example: R`<button class="like" type="button" aria-pressed="false">أعجبني <span class="count">0</span></button>
<style>
  .like { padding: 6px 14px; border: 2px solid #be123c; border-radius: 999px; background: #fff; color: #be123c; font: inherit; }
  .like[aria-pressed="true"] { background: #be123c; color: #fff; }
</style>
<script>
  const like = document.querySelector(".like");
  like.addEventListener("click", () => {
    const on = like.getAttribute("aria-pressed") !== "true";
    like.setAttribute("aria-pressed", on);
    like.querySelector(".count").textContent = on ? 1 : 0;
  });
</script>`,
          try: R`حط المثال في ملف [[like.html]] وافتحه في Chrome. دوس على الزرار مرتين وبص في تاب Elements على [[aria-pressed]] وهو بيتغيّر. وبعدين امسح سطر [[.like[aria-pressed="true"]]] من الـ CSS ودوس تاني: الرقم لسه بيتغيّر؟ واللون؟ مين فيهم اللي بطّل يشتغل وليه؟`,
          sol: R`- **الرقم لسه بيتغيّر** من ٠ لـ ١ ومن ١ لـ ٠: ده شغل JS ([[textContent]]) ومحدش لمسه.
- **[[aria-pressed]] لسه بيتقلب** في Elements بين [["true"]] و [["false"]]: JS لسه بيكتبه.
- **اللون مبقاش بيتغيّر:** القاعدة اللي بترسم الحالة [[true]] اتمسحت، فالـ attribute موجود بس محدش بيرسمه.

ده الدرس كله في تجربة واحدة: JS بيغيّر **الحالة** (attribute)، و CSS هو اللي **بيرسمها**. لو شلت الرسم الحالة تفضل صح، ولو شلت JS الشكل يفضل ثابت. كل طبقة شغلتها لوحدها. (اتجرّب في Chrome 158 من سيرفر محلي.)`,
          teach: R`## الفكرة

الدارس اللي لسه خارج من كورس HTML و CSS ووحدة «الـ DOM» عارف التلات لغات، بس غالبًا كل واحدة لوحدها. الدرس ده بيجاوب على سؤال واحد: **لما أبني ميزة، كل حتة فيها تروح في أنهي لغة؟** والإجابة مش ذوق، ليها سبب: كل لغة بتعمل حاجة معينة أحسن من التانيين، وبتفشل بطريقة مختلفة.

كل النواتج هنا من Chrome 158 على ويندوز، والصفحة متقدّمة من سيرفر محلي صغير بـ [[node:http]] (درس «link و script» بيشرحه).

---

## ١. المثال: زرار «أعجبني»

~~~live 90 زرار أعجبني: دوس عليه
<button class="like" type="button" aria-pressed="false">أعجبني <span class="count">0</span></button>
<style>
  .like { padding: 6px 14px; border: 2px solid #be123c; border-radius: 999px; background: #fff; color: #be123c; font: inherit; }
  .like[aria-pressed="true"] { background: #be123c; color: #fff; }
</style>
<script>
  const like = document.querySelector(".like");
  like.addEventListener("click", () => {
    const on = like.getAttribute("aria-pressed") !== "true";
    like.setAttribute("aria-pressed", on);
    like.querySelector(".count").textContent = on ? 1 : 0;
  });
</script>
~~~

اقراه كتلات حتت:

- **HTML:** [[<button type="button">]] مش [[<div>]]. الزرار بيوصله الـ Tab لوحده، وبيشتغل بـ Enter و Space، وقارئ الشاشة بيقول «زرار». و [[aria-pressed="false"]] بيقول إنه زرار **بيتقلب** (toggle) وحالته دلوقتي مش متداس. و [[<span class="count">]] مكان الرقم.
- **CSS:** [[.like]] الشكل العادي، و [[.like[aria-pressed="true"]]] الشكل وهو متداس. الـ CSS مش عارف حاجة عن الدوس، هو بيرسم **الحالة** اللي مكتوبة في الـ HTML.
- **JS:** بيسمع للـ click، وبيقلب الحالة، وبيكتب الرقم. مبيلمسش لون ولا border.

لو فتحت DevTools ودوست، هتشوف السطر ده بيتغيّر في Elements:

~~~text Elements بعد أول دوسة (Chrome 158)
<button class="like" type="button" aria-pressed="true">أعجبني <span class="count">1</span></button>
~~~

---

## ٢. نفس الصفحة تلات مرات

عشان تشوف كل طبقة بتضيف إيه، خد كارت منتج وابنيه طبقة طبقة.

### HTML بس

~~~live 260 HTML بس: مفيش شكل، بس كل حاجة موجودة ومفهومة
<article class="product">
  <h1>كوباية سيراميك</h1>
  <p>كوباية ٣٥٠ مللي، تتغسل في الغسالة، ولونها أزرق غامق.</p>
  <p class="price">١٢٠ جنيه</p>
  <form class="add" action="/cart" method="post">
    <input type="hidden" name="id" value="mug">
    <button type="submit">أضف للسلة</button>
  </form>
  <p class="cart" role="status">في السلة: <span class="count">0</span></p>
</article>
~~~

شكلها وحش بس **مفيش حاجة ناقصة**: العنوان عنوان، والسعر مكتوب، والزرار جوه [[<form>]] بـ [[action="/cart"]] و [[method="post"]]، يعني لو داسوا عليه المتصفح بيبعت [[id=mug]] للسيرفر لوحده. ده اللي بيخلي الصفحة تشتغل حتى لو الـ CSS والـ JS ماوصلوش.

> في الـ preview هنا مفيش سيرفر، فلو دوست الزرار الفورم هيحاول يروح لـ [[/cart]]. على سيرفر حقيقي ده بالظبط اللي المفروض يحصل.

### + CSS

~~~live 300 HTML و CSS: نفس العناصر، بشكل
<style>
  body { margin: 0; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: #f1f5f9; color: #0f172a; }
  .product { max-width: 320px; margin: auto; padding: 16px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0002; }
  .product h1 { margin: 0; font-size: 1.3rem; }
  .price { font-size: 1.4rem; font-weight: 700; color: #1d4ed8; margin: 4px 0; }
  .add button { width: 100%; padding: 10px; font: inherit; font-weight: 700; color: #fff; background: #1d4ed8; border: 0; border-radius: 8px; cursor: pointer; }
  .add button:hover { background: #1e40af; }
  .add button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
  .cart { color: #475569; }
  .cart.has-items { color: #15803d; font-weight: 700; }
</style>
<article class="product">
  <h1>كوباية سيراميك</h1>
  <p>كوباية ٣٥٠ مللي، تتغسل في الغسالة، ولونها أزرق غامق.</p>
  <p class="price">١٢٠ جنيه</p>
  <form class="add" action="/cart" method="post">
    <input type="hidden" name="id" value="mug">
    <button type="submit">أضف للسلة</button>
  </form>
  <p class="cart" role="status">في السلة: <span class="count">0</span></p>
</article>
~~~

ولا سطر HTML اتغيّر. الـ CSS مسك العناصر بالـ classes اللي كانت موجودة ([[.product]] و [[.price]] و [[.add]]) ورسمها. ولاحظ إن الـ hover والـ focus **حالات** CSS بيعرفها لوحده من غير JS: مرّر الماوس، أو دوس Tab لحد الزرار. وفيه قاعدة [[.cart.has-items]] مستنية class محدش حطه لسه: دي اللي JS هيشغّلها.

### + JS

~~~live 300 التلاتة: الزرار بيزوّد السلة من غير ما الصفحة تتحمّل
<style>
  body { margin: 0; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: #f1f5f9; color: #0f172a; }
  .product { max-width: 320px; margin: auto; padding: 16px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0002; }
  .product h1 { margin: 0; font-size: 1.3rem; }
  .price { font-size: 1.4rem; font-weight: 700; color: #1d4ed8; margin: 4px 0; }
  .add button { width: 100%; padding: 10px; font: inherit; font-weight: 700; color: #fff; background: #1d4ed8; border: 0; border-radius: 8px; cursor: pointer; }
  .add button:hover { background: #1e40af; }
  .add button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
  .cart { color: #475569; }
  .cart.has-items { color: #15803d; font-weight: 700; }
</style>
<article class="product">
  <h1>كوباية سيراميك</h1>
  <p>كوباية ٣٥٠ مللي، تتغسل في الغسالة، ولونها أزرق غامق.</p>
  <p class="price">١٢٠ جنيه</p>
  <form class="add" action="/cart" method="post">
    <input type="hidden" name="id" value="mug">
    <button type="submit">أضف للسلة</button>
  </form>
  <p class="cart" role="status">في السلة: <span class="count">0</span></p>
</article>
<script type="module">
  const form = document.querySelector(".add");
  const count = document.querySelector(".count");
  const cart = document.querySelector(".cart");
  let items = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    items++;
    count.textContent = items;
    cart.classList.toggle("has-items", items > 0);
  });
</script>
~~~

الـ JS مسك الفورم ([[querySelector(".add")]])، وسمع لـ [[submit]] مش [[click]] (الـ submit بيحصل من الدوسة ومن Enter كمان)، و [[e.preventDefault()]] بتقول للمتصفح «متبعتش الفورم للسيرفر، أنا هتصرف». وبعدين زوّد الرقم وحط class [[has-items]]، والـ CSS اللي كان مستني رسم السطر أخضر.

---

## ٣. جدول: مين يقدر يعمل إيه

| المهمة | HTML | CSS | JS |
|---|---|---|---|
| المعنى (ده عنوان، ده زرار، ده فورم) | **هو بس** | لأ | يقدر يحط [[role]] بس ده ترقيع |
| الكيبورد والـ focus | ببلاش مع [[<button>]] و [[<a>]] و [[<input>]] | يرسم الـ focus ([[:focus-visible]]) | يكتبه بإيده لو استخدمت [[<div>]] |
| الشكل والمقاسات والـ layout | لأ | **هو بس** | يقدر يكتب [[style]] بس ده بيكسر الـ cascade (درس «الجسر») |
| حالات بسيطة: hover و focus و checked و invalid | جزء ([[required]] و [[<details>]]) | **أغلبها** | مش محتاج |
| يتحقق من الفورم | [[required]] و [[type="email"]] و [[pattern]] | يرسم الغلط ([[:user-invalid]]) | رسايل خاصة وقواعد بين حقلين |
| يغيّر محتوى من غير reload | لأ | لأ | **هو بس** |
| يجيب بيانات من السيرفر | الفورم بيبعت ويحمّل صفحة جديدة | لأ | [[fetch]] من غير reload |
| يفتكر حاجة بعد الـ refresh | لأ | لأ | [[localStorage]] |

اقرا الجدول من الشمال لليمين: **اختار أبسط لغة تقدر تعمل الحاجة.** لو HTML بيعملها (زرار، فورم بيتبعت، [[<details>]] بيفتح ويقفل) خليها HTML. لو حالة شكل (hover، قايمة مفتوحة) خليها CSS. و JS للي محدش غيره يقدر عليه.

---

## ٤. لو ملف وقع: progressive enhancement متقاس

قسمت الكارت لـ ٣ ملفات ([[index.html]] و [[css/styles.css]] و [[js/app.js]]، الدرس الجاي بيشرح الربط) وجرّبت في Chrome 158 بـ Playwright تلات حالات:

~~~text الحالة ١: كل حاجة وصلت، ودوست الزرار مرتين
.count = "2"
.cart  class = "cart has-items"   اللون = rgb(21, 128, 61)   (الأخضر)
الرابط فضل http://127.0.0.1:8891/l1/   (مفيش reload)
~~~

~~~text الحالة ٢: ملف الـ CSS اتمنع (route abort)، ودوست الزرار
h1 font-size = 32px          (حجم المتصفح الافتراضي، مش 1.3rem)
body background = rgba(0, 0, 0, 0)   (شفاف = أبيض)
button background = rgb(240, 240, 240)   (زرار المتصفح الرمادي)
عرض الكارت = 1264px          (مفيش max-width، واخد الشاشة كلها)
.count بعد الدوسة = "1"       (الـ JS لسه شغال)
~~~

~~~text الحالة ٣: الـ JavaScript مقفول، ودوست الزرار
المتصفح راح لـ http://127.0.0.1:8891/cart
الطلب: POST   البيانات: id=mug
رد السيرفر: 404   (السيرفر التجريبي مفيهوش /cart، بس الطلب وصل)
~~~

الحالة ٣ هي المهمة: **من غير ولا سطر JS المنتج وصل للسيرفر.** في موقع حقيقي السيرفر كان هيضيفه للسلة ويرجّع صفحة. وده بيحصل أكتر مما تتخيل: سكربت وقع بـ 404، أو error في سطر قبله، أو نت ضعيف والملف لسه بيتحمّل والناس بتدوس، أو إضافة في المتصفح بتمنع سكربتات.

ولو الـ CSS وقع (الحالة ٢) الصفحة وحشة بس كل حاجة مقروءة وبالترتيب الصح، لأن الترتيب جاي من الـ HTML مش من الـ CSS.

**قارن بالطريقة العكسية** (كل حاجة JS): [[<div class="btn" onclick="add()">]] والصفحة بتتكتب بـ [[innerHTML]]. لو الـ JS موقعش مفيش زرار أصلًا ولا محتوى، والـ [[<div>]] مبيوصلوش الكيبورد، وقارئ الشاشة مش عارف إنه زرار.

---

## ٥. اللي بيحصل في المتصفح بالترتيب

1. **HTML:** المتصفح بيقرا الملف من فوق لتحت ويعمل شجرة الـ DOM. كل [[<link rel="stylesheet">]] و [[<script src>]] بيطلب ملفه.
2. **CSS:** بيتقري ويتعمل منه CSSOM، والمتصفح بيستناه قبل أول رسمة (عشان ميرسمش الصفحة من غير شكل وبعدين يقلبها).
3. **الرسم:** DOM + CSSOM = render tree، ثم layout (المقاسات) ثم paint.
4. **JS:** السكربت بـ [[type="module"]] أو [[defer]] بيشتغل بعد ما الـ HTML يخلص، فيلاقي العناصر، ويسجّل الـ listeners.
5. **بعد كده:** كل حدث (دوسة، كتابة) بيشغّل JS، و JS بيغيّر الـ DOM (نص، أو class، أو attribute)، والمتصفح بيعيد حساب الـ CSS للعناصر اللي اتغيّرت ويرسم تاني.

يعني الـ DOM هو **المكان اللي التلاتة بيتقابلوا فيه**: HTML بيبنيه، و CSS بيقراه، و JS بيعدّله.

---

## ٦. أسئلة بتتسأل كتير

- **«ينفع أحط CSS جوه HTML؟»** ينفع ([[<style>]] و [[style=""]])، بس ملف منفصل بيتكاش مرة واحدة لكل الصفحات، وبيتقري من غير ما تدوّر في HTML. الـ preview هنا بيحط الكل في ملف واحد عشان يترسم، وفي مشروعك كل لغة في ملفها.
- **«ينفع JS يعمل الصفحة كلها؟»** ينفع، وده اللي React بيعمله. بس ساعتها لازم تعوّض اللي HTML كان بيديهولك ببلاش (المعنى، والكيبورد، والشغل من غير JS أو بالـ server rendering). ودي مشكلة الفريموركات تحلها، مش أول مشروع ليك.
- **«الـ CSS يقدر يعمل سلوك؟»** حاجات زي [[:hover]] و [[:checked]] و [[:target]] و [[:has()]] بتعمل حاجات شبه السلوك. درس «نفس الميزة بتلات طرق» بيقارن ده بالأرقام.

---

## الخلاصة

| اللغة | سؤالها | لو وقعت |
|---|---|---|
| HTML | فيه إيه، وده معناه إيه؟ | مفيش صفحة. عشان كده هي اللي لازم تشتغل لوحدها |
| CSS | شكله إيه، ومكانه فين؟ | صفحة وحشة بس مقروءة وبالترتيب |
| JS | لما يحصل كذا، اعمل إيه؟ | الصفحة شغالة بالطريقة القديمة (الفورم بيتبعت والصفحة بتتحمّل) لو الـ HTML اتكتب صح |

اللي ميتلخبطش: JS بيغيّر **الحالة** (نص، class، attribute)، و CSS بيرسم الحالة، و HTML بيدي المعنى. وابدأ دايمًا من HTML يشتغل لوحده.`,
          lines: [
            R`[[<button type="button">]] زرار حقيقي بالكيبورد، و [[aria-pressed="false"]] بيقول إنه toggle مش متداس، و [[<span class="count">]] مكان الرقم`,
            R`أول الـ CSS: في المثال جوه نفس الملف عشان يبقى صغير، وفي المشروع بيبقى في [[css/styles.css]]`,
            R`شكل الزرار العادي: حدود بلون وحواف مدورة، و [[font: inherit]] عشان الزرار ياخد خط الصفحة بدل خط المتصفح`,
            R`نفس الزرار لما [[aria-pressed]] يبقى [["true"]]: خلفية ملونة. ده selector بيقرا attribute، فالـ CSS بيرسم الحالة من غير ما يعرف مين غيّرها`,
            R`آخر الـ CSS: قفلة [[<style>]]`,
            R`أول الـ JS: في آخر الصفحة عشان العنصر يكون اتعمل قبله (الدرس الجاي بيشرح [[defer]] و [[type="module"]] بدل كده)`,
            R`بيمسك الزرار بنفس الـ class اللي الـ CSS بيستخدمها ويحطه في متغير`,
            R`بيسجّل دالة تشتغل مع كل دوسة (و Enter و Space كمان لأنه [[<button>]] حقيقي)`,
            R`بيحسب الحالة الجديدة: لو مكانتش [["true"]] تبقى [[true]]، يعني بيقلبها`,
            R`بيكتب الحالة في الـ attribute: ده السطر اللي بيخلي الـ CSS يغيّر اللون، وقارئ الشاشة يقول «متداس»`,
            R`بيكتب الرقم في الـ span بـ [[textContent]]: ١ لو متداس و ٠ لو لأ`,
            R`قفلة الدالة وقفلة [[addEventListener]] مع بعض`,
            R`آخر الـ JS: قفلة [[<script>]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** لكل طلب من الـ ٨ دول قول أنهي لغة لازم تعمله، والأبسط لو فيه أكتر من واحدة: (١) العنوان يبان في نتيجة جوجل، (٢) الزرار يغمق لما الماوس يقف عليه، (٣) الفورم ميتبعتش والإيميل فاضي، (٤) عدّاد بيقول فاضل كام حرف وانت بتكتب، (٥) القايمة تبقى عمود على الموبايل وصف على الكمبيوتر، (٦) سؤال في صفحة الأسئلة يتفتح ويتقفل، (٧) المنتجات تيجي من السيرفر من غير reload، (٨) الصفحة تفتكر إنك اخترت الوضع الليلي.`, done: R`كتبت لكل طلب لغة وسبب في سطر، وقارنت بالحل: ٨ من ٨، أو عرفت ليه غلطت في اللي غلطت فيه.`, sol: R`| # | الطلب | اللغة | ليه |
|---|---|---|---|
| ١ | العنوان في جوجل | HTML | [[<title>]] و [[<h1>]] و [[<meta name="description">]]. جوجل بيقرا الـ HTML |
| ٢ | الزرار يغمق مع الماوس | CSS | [[:hover]] حالة بيعرفها الـ CSS لوحده |
| ٣ | الفورم ميتبعتش والإيميل فاضي | HTML | [[required]] و [[type="email"]]: المتصفح بيمنع الإرسال ويكتب رسالة من غير سطر JS |
| ٤ | عدّاد الحروف | JS | محتاج يسمع لكل حرف ([[input]] event) ويكتب رقم. ([[maxlength]] في HTML بيمنع الزيادة بس مبيعدّش) |
| ٥ | القايمة عمود ثم صف | CSS | [[flex-direction]] جوه [[@media]] أو container query |
| ٦ | سؤال يتفتح ويتقفل | HTML | [[<details>]] و [[<summary>]]: الفتح والقفل والكيبورد وقارئ الشاشة ببلاش |
| ٧ | منتجات من السيرفر من غير reload | JS | [[fetch]] ثم رسم. HTML لوحده يقدر يحمّل صفحة جديدة بس |
| ٨ | يفتكر الوضع الليلي | JS + CSS | الـ CSS بيرسم الوضعين ([[prefers-color-scheme]] أو [[data-theme]])، و JS بس اللي يقدر يحفظ اختيارك في [[localStorage]] |

**الغلطة الشايعة:** (٣) و (٦) بيتكتبوا JS. الاتنين HTML جاهز: أقصر، وشغال من غير JS، والكيبورد وقارئ الشاشة متظبطين. و (٨) فيها لغتين: الشكل CSS والذاكرة JS.` },
            { lvl: 'تطبيق', t: R`**ابني:** الـ HTML ده لكارت وصفة، متغيّرش فيه غير إنك تزوّد classes أو attributes: [[<article><h2>كشري</h2><p>المدة: ٤٥ دقيقة</p><button type="button">ضيفها للمفضلة</button></article>]]. زوّد طبقة CSS (كارت بحدود وزرار شكله pill) وطبقة JS: الزرار بيتقلب بين «ضيفها للمفضلة» و «في المفضلة ✓»، والكارت ياخد إطار ذهبي وهو في المفضلة.`, done: R`الزرار بيتقلب بالماوس وبالكيبورد (Tab ثم Space)، والإطار الذهبي جاي من قاعدة CSS بتقرا حالة (مش [[style]] من JS)، و [[aria-pressed]] بيتغيّر في Elements.`, sol: R`~~~live 230 كارت الوصفة: دوس الزرار، وجرّب Tab ثم Space
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; background: #fafaf9; }
  .recipe { max-width: 280px; padding: 12px 16px; border: 2px solid #e7e5e4; border-radius: 12px; background: #fff; }
  .recipe h2 { margin: 0; }
  .recipe:has(.fav[aria-pressed="true"]) { border-color: #ca8a04; box-shadow: 0 0 0 3px #fde68a; }
  .fav { font: inherit; padding: 4px 14px; border-radius: 999px; border: 1px solid #a8a29e; background: #fff; cursor: pointer; }
  .fav[aria-pressed="true"] { background: #fef3c7; border-color: #ca8a04; }
  .fav:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
</style>
<article class="recipe">
  <h2>كشري</h2>
  <p>المدة: ٤٥ دقيقة</p>
  <button type="button" class="fav" aria-pressed="false">ضيفها للمفضلة</button>
</article>
<script>
  const fav = document.querySelector(".fav");
  fav.addEventListener("click", () => {
    const on = fav.getAttribute("aria-pressed") !== "true";
    fav.setAttribute("aria-pressed", on);
    fav.textContent = on ? "في المفضلة ✓" : "ضيفها للمفضلة";
  });
</script>
~~~

- **اللي اتزوّد على الـ HTML:** class [[fav]] و [[aria-pressed="false"]] بس. باقي الـ HTML زي ما هو.
- **الإطار الذهبي من غير JS يلمس الكارت:** [[.recipe:has(.fav[aria-pressed="true"])]] معناها «الكارت اللي جواه زرار حالته true». JS غيّر الزرار بس، والـ CSS قرا الحالة من فوق. (لو مش عايز [[:has()]]، JS يحط class على الكارت، بس كده الحالة بقت في مكانين.)
- **JS بيغيّر نص الزرار؟** النص محتوى، فده شغل JS. واللون والإطار شكل، فده شغل CSS.

~~~text اتقاس (Chrome 158، الصفحة نفسها)
بعد دوسة:        aria-pressed="true"  النص «في المفضلة ✓»  border-color الكارت = rgb(202, 138, 4)
بعد دوسة تانية:  aria-pressed="false" النص «ضيفها للمفضلة»  border-color = rgb(231, 229, 228)
بالكيبورد: Tab وصل للزرار (outline أزرق ظاهر)، و Space قلبه
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة دي «شغالة» بس كل حاجة فيها JS: [[<div id="app"></div><script>app.innerHTML = '<div class="btn" onclick="toggle()">اعرض التفاصيل</div><div id="d" style="display:none">التوصيل خلال يومين</div>'; function toggle(){ d.style.display = d.style.display === "none" ? "block" : "none"; d.style.color = "green"; }</script>]]. قسّمها تلات طبقات: المحتوى في HTML يبان لو JS موقعش، والزرار زرار حقيقي، والشكل في CSS.`, done: R`لو مسحت الـ [[<script>]] النص «التوصيل خلال يومين» لسه في الصفحة، والزرار بيوصله Tab ويشتغل بـ Enter، ومفيش ولا [[style]] بيتكتب من JS.`, sol: R`أبسط حل إن HTML يعمل الميزة كلها لوحده: [[<details>]].

~~~live 160 التفاصيل بـ details: من غير ولا سطر JS
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .more summary { cursor: pointer; color: #1d4ed8; font-weight: 700; }
  .more summary:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
  .more[open] p { color: #15803d; }
</style>
<details class="more">
  <summary>اعرض التفاصيل</summary>
  <p>التوصيل خلال يومين</p>
</details>
~~~

ولو المطلوب زرار بـ JS (عشان تصميم معين)، المحتوى يفضل في الـ HTML و JS يخفيه هو بس:

~~~live 160 نفس الميزة بزرار و hidden و aria-expanded
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .toggle { font: inherit; color: #1d4ed8; background: none; border: 0; padding: 0; font-weight: 700; cursor: pointer; }
  .toggle[aria-expanded="true"] + #details { color: #15803d; }
</style>
<button class="toggle" type="button" aria-expanded="false" aria-controls="details" hidden>اعرض التفاصيل</button>
<p id="details">التوصيل خلال يومين</p>
<script>
  const btn = document.querySelector(".toggle");
  const box = document.querySelector("#details");
  // JS بيخفي التفاصيل ويظهر الزرار أول ما يشتغل، فلو موقعش: التفاصيل ظاهرة ومفيش زرار ميت
  box.hidden = true;
  btn.hidden = false;
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", open);
    box.hidden = !open;
  });
</script>
~~~

**المشاكل اللي اتصلحت:**

| في الكود القديم | المشكلة | التصليح |
|---|---|---|
| [[innerHTML]] بيكتب الصفحة | لو JS موقعش الصفحة فاضية | المحتوى في الـ HTML، والزرار [[hidden]] لحد ما JS يظهره |
| [[<div onclick>]] | مبيوصلوش Tab ولا Enter، وقارئ الشاشة مبيقولش «زرار» | [[<summary>]] أو [[<button>]] |
| [[style.display]] و [[style.color]] | الشكل في JS، ومحدش يقدر يغيّره من الـ CSS | [[hidden]] للإخفاء، والألوان في CSS |
| [[onclick="toggle()"]] و [[d.style]] | بيعتمد على إن الـ id بقى متغير global ([[d]]) | [[querySelector]] و [[addEventListener]] |

~~~text اتقاس (Chrome 158)
الـ script اتمسح:  details: النص في الـ DOM ومقفول (بيتفتح بـ Enter)   الزرار: النص ظاهر والزرار مستخبي (hidden)
مع الـ script:      Tab للزرار ← Enter ← aria-expanded="true" والنص ظهر أخضر
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل كارت المنتج بتاع الدرس بالتلات ملفات من سيرفر محلي ([[npx serve]] أو أي سيرفر)، وجرّب التلات حالات بإيدك من DevTools: (أ) امنع ملف الـ CSS، (ب) اقفل JavaScript، (ج) خلّي ملف JS يرجع 404. لكل حالة اكتب: الشكل، والزرار بيعمل إيه، وإيه اللي في Console و Network.`, done: R`عندك جدول بالتلات حالات بأرقام من DevTools (حجم الـ h1 في Computed، و status الطلب في Network)، وعرفت ليه (ب) و (ج) نفس النتيجة للزرار.`, sol: R`**الأدوات في Chrome:**

- **تمنع ملف:** DevTools › Network › كليك يمين على [[styles.css]] › Block request URL، وبعدين Ctrl+R. (أو Ctrl+Shift+P واكتب «Show Request blocking».)
- **تقفل JS:** Ctrl+Shift+P في DevTools واكتب «Disable JavaScript»، وبعدين Ctrl+R. وارجع «Enable JavaScript» بعدها.
- **404:** غيّر في الـ HTML [[js/app.js]] لـ [[js/ap.js]].

~~~text اللي ظهر عندي (Chrome 158، سيرفر node:http محلي)
(أ) CSS ممنوع:   الـ h1 في Computed = 32px، الكارت بعرض الشاشة، الزرار رمادي.
                 الزرار بيزوّد العدّاد عادي (JS شغال). Network: styles.css اتمنع (blockedReason: inspector)
(ب) JS مقفول:    الشكل كامل. الزرار بيبعت الفورم: الصفحة راحت لـ /cart
                 Network: cart  POST  404  (Payload: id=mug)
(ج) app.js 404:  الشكل كامل. Console: Failed to load resource: the server responded with a status of 404 (Not Found)   ← ap.js
                 الزرار بيبعت الفورم زي (ب) بالظبط: POST /cart
~~~

**ليه (ب) و (ج) واحد:** في الحالتين مفيش listener على [[submit]]، فمحدش نادى [[preventDefault()]]، فالمتصفح عمل الافتراضي بتاعه: بعت الفورم. ده اللي بيخلي HTML السليم «شبكة أمان» تحت JS. ولو الزرار كان [[<div onclick>]] الحالتين كانوا هيبقوا زرار ميت.

**ليه 32px:** من غير CSS الـ [[<h1>]] بياخد حجم المتصفح [[2em]] من الـ 16px = 32. (المتصفحات الجديدة شالت القاعدة القديمة اللي كانت بتصغّر الـ h1 جوه [[<article>]] و [[<section>]]، فبقى 32 هنا كمان.)` },
            { lvl: 'تحدي', t: R`**ابني:** فقرة «اقرا المزيد» بـ progressive enhancement: من غير JS المقال كله ظاهر. مع JS: يتقص لـ ٣ سطور ويظهر زرار «اقرا المزيد» يفتحه ويقفله. الزرار نفسه ميبانش خالص لو JS مش شغال.`, done: R`من غير الـ [[<script>]] النص كله ظاهر ومفيش زرار. مع الـ script تلات سطور بس وزرار، والدوسة بتفتح وبتقفل، و [[aria-expanded]] بيتغيّر.`, sol: R`~~~live 260 اقرا المزيد: الـ JS بيقص، مش الـ HTML
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; max-width: 420px; }
  /* القص بيحصل بس لما JS يحط .clamp، فمن غيره النص كامل */
  .article.clamp { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
  .more { font: inherit; color: #1d4ed8; background: none; border: 0; padding: 0; cursor: pointer; font-weight: 700; }
  .more:focus-visible { outline: 3px solid #f59e0b; }
</style>
<p class="article" id="art">القهوة المختصة يعني حبوب متقيّمة من ٨٠ درجة أو أكتر على مقياس جمعية القهوة المختصة، ومتحمّصة من قريب، ومطحونة قبل التحضير على طول. الفرق مش في السعر بس: الطعم بيبان فيه المكان اللي الحبوب اتزرعت فيه، والتحميص الفاتح بيسيب الحموضة والفاكهة، والغامق بيدي مرارة وشوكولاتة. عشان كده نفس الحبوب بتطلع مختلفة من محمصة للتانية.</p>
<script>
  const art = document.querySelector("#art");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "more";
  btn.setAttribute("aria-controls", "art");
  function set(open) {
    art.classList.toggle("clamp", !open);
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "اقفل" : "اقرا المزيد";
  }
  set(false);
  art.after(btn);
  btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
</script>
~~~

- **الزرار بيتعمل من JS** ([[createElement]]) لأنه ملوش لازمة من غير JS. ده الاستثنا الوحيد للقاعدة «المحتوى في HTML»: عناصر التحكم اللي شغلها JS بس، JS هو اللي يعملها، فمتبقاش زرار ميت لو JS موقعش.
- **القص في CSS** ([[-webkit-line-clamp: 3]] تحت class [[clamp]])، و JS بيحط الـ class ويشيله. لو JS موقعش، محدش حط [[clamp]]، فالنص كامل.
- **[[-webkit-line-clamp]]** محتاجة [[display: -webkit-box]] و [[-webkit-box-orient: vertical]] و [[overflow: hidden]]. الاسم فيه [[-webkit-]] بس شغالة في Chrome و Firefox و Safari.

~~~text اتقاس (Chrome 158، عرض 420)
مع JS:     ارتفاع الفقرة 81.6px (٣ سطور × 27.2px، يعني 16px × 1.7)، الزرار «اقرا المزيد»، aria-expanded="false"
بعد دوسة:  ارتفاع الفقرة 190.4px (٧ سطور)، الزرار «اقفل»، aria-expanded="true"
من غير الـ script: ارتفاع الفقرة 190.4px ومفيش زرار
~~~` },
          ],
          ref: [
            { t: "MDN: Progressive enhancement", url: "https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement" },
            { t: "MDN: HTML basics", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content" },
            { t: "MDN: <form>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form" },
            { t: "MDN: HTMLFormElement: submit event", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event" },
            { t: "MDN: Event.preventDefault()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault" },
            { t: "MDN: aria-pressed", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed" },
            { t: "MDN: How browsers work (Populating the page)", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work" },
          ],
          pre: [{ to: "css/a و button", why: R`الدرس كله قايم على إن [[<button>]] زرار حقيقي بالكيبورد و [[<div>]] لأ` }, { to: "css/JavaScript مبيقفلش على حد", why: R`نفس الفكرة من ناحية الـ accessibility: الصفحة متقفلش على حد لو JS موقعش` }],
          deep: {
            why: R`أغلب الباجات في مشاريع المبتدئين مش في اللغة، في الحدود بين اللغات: لون بيتكتب من JS فمحدش يعرف يغيّره من CSS، أو زرار [[<div>]] الكيبورد مبيوصلوش، أو صفحة فاضية لأن سكربت وقع. لما تعرف كل لغة شغلتها إيه، الكود بيبقى أقصر، والصفحة بتشتغل في ظروف أكتر.`,
            how: R`المتصفح بيبني الـ DOM من الـ HTML، ويحسب الـ style لكل عنصر من الـ CSS (CSSOM)، ويرسم. الـ JS بيشتغل بعد كده وبيتعامل مع نفس الـ DOM: لما بيغيّر class أو attribute، المتصفح بيعيد حساب الـ selectors اللي ليها علاقة ويرسم تاني. يعني JS عمره ما بيرسم بنفسه؛ بيغيّر بيانات في الـ DOM، و CSS هو اللي بيقرر الشكل. وأي سلوك افتراضي (الفورم بيتبعت، اللينك بيفتح، الـ details بيتفتح) بيحصل لوحده لحد ما JS يقول [[preventDefault()]].`,
            when: R`في كل ميزة اسأل بالترتيب: HTML يقدر يعملها؟ ([[<details>]] و [[<dialog>]] و [[required]] و الفورم). لو لأ، CSS يقدر؟ ([[:hover]] و [[:checked]] و [[@media]]). لو لأ، JS. والطبقة اللي فوق متخليش اللي تحت يبوظ: JS يمنع الافتراضي بس لما يكون هيعمل بداله.`,
            mistakes: R`[[<div onclick>]] بدل [[<button>]]. ألوان وmargins بتتكتب من JS بـ [[el.style]]. محتوى مهم بيتكتب بـ [[innerHTML]] فمبيبانش من غير JS ولا لجوجل أحيانًا. [[preventDefault()]] على فورم من غير ما JS يبعته بنفسه، فالفورم بقى ميت. التفكير إن «اليوزر عنده JS دايمًا»: الملف ممكن يقع بـ 404 أو يتأخر أو error في سطر قبله يوقف الباقي.`,
          },
        },
        {
          cmd: "link و script: تربط الملفات التلاتة",
          title: "فولدر المشروع، و link و script في الـ head، والمسارات النسبية، وليه محتاج سيرفر محلي، والأخطاء لما مسار يغلط",
          desc: R`المشروع الحقيقي تلات ملفات على الأقل: [[index.html]] و [[css/styles.css]] و [[js/app.js]]. الـ HTML هو اللي بيربطهم: [[<link rel="stylesheet" href="css/styles.css">]] و [[<script type="module" src="js/app.js"></script>]] في الـ [[<head>]]. المسار نسبي لمكان ملف الـ HTML نفسه، والـ module محتاج الصفحة تتفتح من سيرفر ([[http://]]) مش بدبل كليك ([[file://]]).
• الـ CSS في الـ head بيوقّف أول رسمة لحد ما يوصل: الصفحة متظهرش من غير شكل (FOUC).
• [[type="module"]] بيستنى الـ HTML يخلص لوحده (زي [[defer]])، وبيسمح بـ [[import]].
• لو مسار غلط مفيش error في الصفحة: الملف بيرجع 404 في Network والصفحة بتشتغل ناقصة. ولو السيرفر بعت نوع غلط: «Failed to load module script… MIME type».`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>متجر بسيط</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <h1>أهلًا</h1>
</body>
</html>`,
          try: R`اعمل الفولدر اللي في الشرح بالتلات ملفات، وافتح [[index.html]] بدبل كليك: العنوان أزرق؟ الإجمالي اتكتب؟ افتح Console. وبعدين من جوه الفولدر شغّل [[npx serve -l 8080]] وافتح [[http://localhost:8080]]: إيه اللي اتغيّر؟ وبعدين غيّر [[css/styles.css]] لـ [[css/style.css]] واعمل Ctrl+R وبص في Network.`,
          sol: R`~~~text Chrome 158 بدبل كليك (file://)
العنوان أزرق: أيوه (الـ CSS بيتقري من file:// عادي)
الإجمالي: «…» (الـ JS مشتغلش)
Console: Access to script at 'file:///C:/Users/ali/shop/js/app.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

~~~text من http://localhost:8080
العنوان أزرق، والإجمالي «١٬٢٥٠ جنيه»، و Console: app.js اشتغل، والـ h1: أهلًا
~~~

~~~text بعد ما غيّرت الاسم لـ css/style.css
العنوان أسود (مفيش CSS)، والـ JS لسه شغال
Network: style.css   404   stylesheet
Console: Failed to load resource: the server responded with a status of 404 (Not Found)
~~~

الـ CSS اشتغل من [[file://]] والـ module لأ، لأن الـ modules بتتحمّل بقواعد CORS والصفحة اللي من ملف الـ origin بتاعها [["null"]]. والمسار الغلط مبيوقعش الصفحة: بيسيبها ناقصة، والدليل الوحيد في Network و Console.`,
          teach: R`## الفكرة

في وحدة «الـ DOM» والدروس اللي فاتت كان كل حاجة في ملف واحد عشان الـ preview. في الشغل الحقيقي كل لغة في ملفها: بتتكاش مرة واحدة، وكذا صفحة بتستخدم نفس الـ CSS، وكل واحد بيدوّر في مكانه. الدرس ده عن الخيوط اللي بتربطهم، واللي بيحصل لما خيط يتقطع. كل اللي هنا اتشغّل في Chrome 158 على ويندوز، والسيرفر [[node:http]] على Node 24.

---

## ١. شجرة المشروع

~~~text shop/
shop/
├── index.html          الصفحة: المحتوى، وبتربط الباقي
├── css/
│   └── styles.css      الشكل
├── js/
│   ├── app.js          نقطة البداية: بيمسك العناصر ويسجّل الأحداث
│   └── format.js       دوال مساعدة، app.js بيعملها import
├── assets/
│   └── logo.svg        صور وأيقونات وخطوط
└── server.mjs          سيرفر التجربة (الدرس الجاي، ومش جزء من الموقع)
~~~

الأسامي دي مش إجبارية، بس متعارف عليها: أي حد يفتح المشروع يعرف يلاقي الحاجة. وكلها حروف إنجليزي صغيرة من غير مسافات، لأن السيرفرات على لينكس بتفرّق بين [[Logo.svg]] و [[logo.svg]] وويندوز لأ: الصفحة تشتغل عندك وتقع بعد النشر.

### الملفات

~~~css css/styles.css
body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; color: #0f172a; }
h1 { color: #1d4ed8; }
~~~

~~~js js/format.js
export function price(n) {
  return n.toLocaleString("ar-EG") + " جنيه";
}
~~~

~~~js js/app.js
import { price } from "./format.js";

document.querySelector("#total").textContent = price(1250);
console.log("app.js اشتغل، والـ h1:", document.querySelector("h1").textContent);
~~~

و [[index.html]] هو المثال، وجوه الـ body زوّدت [[<p class="total">الإجمالي: <output id="total">…</output></p>]] و [[<img src="assets/logo.svg" alt="لوجو المتجر" width="64" height="64">]].

---

## ٢. [[<link>]] و [[<script>]]: الخيطين

### [[<link rel="stylesheet" href="css/styles.css">]]

- [[rel="stylesheet"]] بيقول «الملف ده CSS طبّقه». **من غيرها المتصفح مبيطلبش الملف أصلًا:** جرّبت [[<link href="css/styles.css">]] لوحدها، و Network مفيهوش طلب لـ styles.css خالص، ومفيش ولا error. أهدى باج ممكن تقابله.
- [[href]] المسار، نسبي لمكان ملف الـ HTML.
- مكانه **في الـ [[<head>]]**، عشان المتصفح يعرف إن فيه شكل جاي قبل ما يرسم أي حاجة (الجزء ٥ بيقيسها).

### [[<script type="module" src="js/app.js"></script>]]

- [[type="module"]]: الملف ده module، فيقدر يعمل [[import]] و [[export]]، ومتغيراته مش global، وبيشتغل بـ strict mode.
- **بيستنى لوحده:** الـ module بيتحمّل في الخلفية وبيشتغل بعد ما الـ HTML كله يتقري، زي [[defer]] بالظبط. عشان كده ينفع في الـ head وهيلاقي [[#total]]. ولو كتبت [[defer]] جنبه ملهاش أي تأثير.
- لازم يتقفل بـ [[</script>]] حتى لو فاضي. [[<script src="..." />]] مش بيقفله في HTML.
- **الترتيب:** لو فيه أكتر من module أو [[defer]] بيشتغلوا بترتيبهم في الصفحة. بس الأحسن ملف واحد في الـ HTML ([[app.js]])، وهو يعمل [[import]] للباقي، فالترتيب بيبقى في الكود مش في الـ HTML.

### [[import]] جوه الـ module

[[import { price } from "./format.js"]]: في المتصفح من غير أدوات (Vite وغيره) المسار لازم يبدأ بـ [[./]] أو [[../]] أو [[/]]، ولازم فيه [[.js]]. ومسار الـ import نسبي **لملف الـ JS نفسه** ([[js/app.js]])، مش لملف الـ HTML. جرّبت [[from "./format"]] من غير [[.js]]:

~~~text Network و Console (Chrome 158)
format   404   script
Failed to load resource: the server responded with a status of 404 (Not Found)
والإجمالي فضل «…»: الـ module كله وقف لأن واحد من الـ imports بتاعته موقع
~~~

---

## ٣. المسارات النسبية

المسار بيتحسب من **الفولدر اللي فيه الصفحة اللي فاتحها**. اتحسبت بـ [[new URL(path, page)]] في Node 24، ودي نفس القاعدة اللي المتصفح بيمشي عليها:

| المسار في الصفحة | الصفحة [[localhost:8080/blog/post.html]] | الصفحة [[sara.github.io/shop/blog/post.html]] |
|---|---|---|
| [[css/styles.css]] | [[/blog/css/styles.css]] (404) | [[/shop/blog/css/styles.css]] (404) |
| [[../css/styles.css]] | [[/css/styles.css]] ✓ | [[/shop/css/styles.css]] ✓ |
| [[/css/styles.css]] | [[/css/styles.css]] ✓ | [[/css/styles.css]] (404: نسي [[/shop]]) |

- **من غير شَرطة:** «جنبي». صفحة في فولدر فرعي لازم [[../]] تطلع خطوة.
- **[[../]]:** اطلع فولدر لفوق.
- **بشَرطة في الأول [[/]]:** «من أول الموقع». بتشتغل على سيرفرك، وبتقع على GitHub Pages لو الموقع في [[/اسم-الريبو/]]، لأن أول الموقع هناك هو الدومين مش الريبو.

ولما الصفحة [[about/index.html]] استخدمت نفس [[css/styles.css]] و [[js/app.js]] و [[assets/logo.svg]] بتوع الرئيسية، ده اللي حصل:

~~~text http://127.0.0.1:8891/l2/about/   (performance.getEntriesByType("resource"))
about/css/styles.css   404
about/js/app.js        404
about/assets/logo.svg  404
الـ h1 = rgb(0, 0, 0)، والصورة مكسورة، ومفيش JS
~~~

التلاتة اتطلبوا من جوه [[about/]] عشان المسار نسبي. التصليح: [[../css/styles.css]] و [[../js/app.js]] و [[../assets/logo.svg]].

> لاحظ إن **الصفحة نفسها اشتغلت**. مفيش رسالة «الصفحة بايظة». المسار الغلط بيبان بس في Network (Status 404) وفي Console (Failed to load resource). خليهم مفتوحين وانت بتبني.

---

## ٤. ليه محتاج سيرفر: [[file://]] والـ modules

لما تدوس دبل كليك على [[index.html]] الرابط بيبقى [[file:///C:/Users/ali/shop/index.html]]. الـ CSS والصور بيشتغلوا عادي، بس الـ module لأ:

~~~text Chrome 158 headless بـ --enable-logging (المسار متقصّر)
Access to script at 'file:///C:/Users/ali/shop/js/app.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

الـ modules (و [[fetch]] كمان) بيمشوا بقواعد CORS دايمًا. الصفحة اللي من ملف الـ origin بتاعها [["null"]]، والمتصفح مبيسمحش لـ [["null"]] يقرا ملفات تانية كـ modules. الحل مش تشيل [[type="module"]]، الحل سيرفر محلي.

الحل مش تشيل [[type="module"]]، الحل **سيرفر محلي**: برنامج بيبعت الملفات للمتصفح على [[http://localhost:PORT]]، فالصفحة يبقى ليها origin حقيقي. أسرع واحد:

~~~powershell
cd shop
npx serve -l 8080
~~~

وافتح [[http://localhost:8080]]. الدرس الجاي «تشغّل المشروع وتعرضه» بيشرح ٣ طرق للسيرفر ويقارنهم (ومنهم سيرفر بإيدك في ٣٠ سطر بـ [[node:http]])، وإزاي تفتحه من الموبايل وتنشره.

---

## ٥. الـ CSS بيوقّف الرسم: ودي حاجة كويسة (FOUC)

خليت السيرفر يأخّر [[styles.css]] ثانية ونص، وقست أول رسمة (FCP، أول مرة المتصفح يرسم نص أو صورة) ووقت وصول الـ CSS، ٣ مرات لكل حالة:

~~~text performance.getEntriesByName("first-contentful-paint") و responseEnd بتاع الـ CSS (ms)
                          FCP          الـ CSS وصل
link في الـ head:          1540 1520 1520   1527 1512 1515
link في آخر الـ body:      20   20   20     1522 1522 1512
link في الـ head من غير تأخير: 24 24 20    7    8    7
~~~

- **في الـ head:** الشاشة فاضية ١٫٥ ثانية، وبعدين الصفحة بتظهر **بشكلها** مرة واحدة. الـ CSS اسمه **render-blocking**: المتصفح مبيرسمش لحد ما يوصل.
- **في آخر الـ body:** المتصفح رسم بعد 20ms **من غير شكل** (عنوان أسود وخط المتصفح)، وبعد ١٫٥ ثانية كل حاجة اتنطّت لشكلها. ده اسمه **FOUC** (Flash Of Unstyled Content): وميض الصفحة من غير ستايل.

يعني الـ «تأخير» اللي بيعمله الـ CSS في الـ head مقصود: أحسن من صفحة بتتنطّ. الحل لو الـ CSS كبير إنه يبقى صغير ويتكاش، مش إنه ينزل تحت. والـ JS عكسه: [[type="module"]] مبيوقّفش الرسم.

---

## ٦. لو خيط اتقطع

الصفحة **مبتقعش**: بتشتغل ناقصة. الدليل في مكانين: Network (سطر لكل ملف، والـ Status لازم [[200]] والـ Type يطابق) و Console (رسالة لكل ملف موقعش). الأخطاء دي كلها برسايلها الحقيقية وترتيب التدوير عليها في درس «لما المشروع ميشتغلش».

---

## الخلاصة

| الخيط | فين | القاعدة |
|---|---|---|
| [[<link rel="stylesheet" href>]] | الـ head | من غير [[rel]] مبيتحمّلش، وفي الـ head عشان مفيش FOUC |
| [[<script type="module" src>]] | الـ head | بيستنى الـ HTML لوحده، ومحتاج سيرفر |
| [[import ... from "./x.js"]] | جوه الـ JS | نسبي لملف الـ JS، و [[./]] و [[.js]] إجباري |
| [[href]] و [[src]] في الـ HTML | أي مكان | نسبي لملف الـ HTML |

اللي ميتلخبطش: افتح المشروع من [[http://localhost]] مش بدبل كليك، وخلّي Network مفتوح، وأي 404 أو MIME معناه خيط مقطوع.`,
          lines: [
            R`[[<!doctype html>]] بيقول للمتصفح يمشي بالقواعد الحديثة (standards mode)، ومن غيره حاجات في الـ CSS بتتحسب غلط`,
            R`الصفحة عربي ومن اليمين للشمال: [[lang]] للنطق والخطوط، و [[dir]] لاتجاه كل حاجة`,
            R`أول الـ [[<head>]]: معلومات عن الصفحة وملفاتها، مش بتترسم`,
            R`ترميز الصفحة UTF-8 عشان العربي يظهر صح، ولازم يبقى في أول الـ head`,
            R`عرض الصفحة على الموبايل يبقى عرض الشاشة، من غيره الموبايل بيرسمها كأنها كمبيوتر ويصغّرها`,
            R`اسم التاب في المتصفح، وهو كمان العنوان في نتيجة البحث`,
            R`الخيط الأول: ملف الـ CSS. [[rel="stylesheet"]] إجباري، و [[href]] نسبي لمكان [[index.html]]`,
            R`الخيط التاني: ملف الـ JS كـ module، فبيستنى الـ HTML يخلص لوحده وبيقدر يعمل [[import]]`,
            R`نهاية الـ head: كل اللي فوق ده مش بيترسم، ده معلومات وروابط`,
            R`أول الجزء اللي بيترسم: المحتوى`,
            R`العنوان اللي الـ CSS هيلوّنه أزرق والـ JS هيقراه في الـ Console`,
            R`آخر الـ body: لاحظ إن مفيش [[<script>]] هنا، الـ module في الـ head كفاية`,
            R`نهاية الصفحة: قفلة [[<html>]] اللي فتحناها في السطر التاني`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة في [[blog/post.html]] فيها [[<link rel="stylesheet" href="css/styles.css">]]. الملف موجود في [[css/styles.css]] في أول المشروع. الصفحة هتلاقيه؟ ولو كتبت [[/css/styles.css]] وبعدين رفعت الموقع على GitHub Pages في [[https://sara.github.io/shop/]]؟ اكتب توقعك لكل مسار، وبعدين اتأكد بـ [[new URL()]] في Node.`, done: R`كتبت لكل مسار الرابط الكامل اللي هيتطلب قبل ما تشغّل، وطابقت الناتج الحقيقي، وعرفت أنهي مسار بيشتغل في المكانين.`, sol: R`~~~js paths.mjs
const cases = [
  ["css/styles.css", "http://localhost:8080/blog/post.html"],
  ["../css/styles.css", "http://localhost:8080/blog/post.html"],
  ["/css/styles.css", "http://localhost:8080/blog/post.html"],
  ["css/styles.css", "https://sara.github.io/shop/blog/post.html"],
  ["../css/styles.css", "https://sara.github.io/shop/blog/post.html"],
  ["/css/styles.css", "https://sara.github.io/shop/blog/post.html"],
  ["css/styles.css", "https://sara.github.io/shop"],
];
for (const [rel, page] of cases) console.log(rel.padEnd(18), "→", new URL(rel, page).href);
~~~

~~~text node paths.mjs (Node 24.22)
css/styles.css     → http://localhost:8080/blog/css/styles.css
../css/styles.css  → http://localhost:8080/css/styles.css
/css/styles.css    → http://localhost:8080/css/styles.css
css/styles.css     → https://sara.github.io/shop/blog/css/styles.css
../css/styles.css  → https://sara.github.io/shop/css/styles.css
/css/styles.css    → https://sara.github.io/css/styles.css
css/styles.css     → https://sara.github.io/css/styles.css
~~~

- **[[css/styles.css]] من [[blog/]]** بيدوّر جوه [[blog/css/]]: 404.
- **[[../css/styles.css]]** هو الوحيد اللي شغال في المكانين، لأنه بيطلع خطوة من مكان الصفحة أيًّا كان الموقع فين.
- **[[/css/styles.css]]** شغال على [[localhost]] ووقع على GitHub Pages: الـ [[/]] معناها أول الدومين، والموقع هناك جوه [[/shop/]].
- **السطر الأخير مفاجأة:** [[https://sara.github.io/shop]] **من غير شَرطة في الآخر** بيتعامل كأن [[shop]] ملف، فالفولدر هو [[/]]. عشان كده GitHub Pages بيحوّلك لـ [[/shop/]] بشَرطة.

[[new URL(path, base)]] هي نفس الخوارزمية اللي المتصفح بيحسب بيها أي [[href]] و [[src]]، فاستخدمها تتأكد قبل ما تنشر.` },
            { lvl: 'تطبيق', t: R`**ابني:** الفولدر اللي في الشرح بالظبط ([[index.html]] و [[css/styles.css]] و [[js/app.js]] و [[js/format.js]] و [[assets/logo.svg]])، وشغّله بـ [[npx serve -l 8080]]، وافتح Network قبل ما تعمل Ctrl+R.`, done: R`Network فيه ٥ طلبات كلهم [[200]] بالـ Type الصح، والإجمالي مكتوب بالأرقام العربي، وعرفت ليه [[format.js]] آخر واحد.`, sol: R`الأوامر من PowerShell (في Git Bash: [[mkdir -p shop/css shop/js shop/assets]] و [[touch]] بدل [[ni]]، والدرس الجاي بيشرحهم):

~~~powershell
mkdir shop
cd shop
mkdir css, js, assets
ni index.html, css/styles.css, js/app.js, js/format.js, assets/logo.svg
~~~

والكود نفسه اللي في الشرح، و [[assets/logo.svg]]:

~~~html assets/logo.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#1d4ed8"/><text x="32" y="42" font-size="28" text-anchor="middle" fill="#fff">م</text></svg>
~~~

~~~powershell
npx serve -l 8080
~~~

~~~text Network في Chrome 158 بعد Ctrl+R (بالترتيب اللي اتطلبوا بيه)
Name         Status  Type
localhost    200     document
styles.css   200     stylesheet
app.js       200     script
logo.svg     200     svg+xml
format.js    200     script
~~~

- **[[format.js]] اتطلب آخر واحد:** المتصفح مايعرفش إنه موجود غير لما ينزّل [[app.js]] ويقراه ويلاقي الـ [[import]]. ده اسمه module graph: كل import طلب جديد بعد الملف اللي طلبه. في المشاريع الكبيرة ده بيبقى سلسلة طويلة، وعشان كده فيه أدوات بتجمعهم في ملف واحد (Vite في كورس React).
- **[[logo.svg]] قبل [[format.js]]:** الصورة متكتوبة في الـ HTML، فالمتصفح طلبها وهو بيقرا الـ HTML، قبل ما الـ module يوصل ويتقري.
- **الإجمالي «١٬٢٥٠ جنيه»:** [[toLocaleString("ar-EG")]] بيكتب الأرقام بالعربي والفاصل [[٬]] كل ٣ أرقام.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة دي فيها ٣ غلطات في الربط، ومفيش ولا واحدة بتوقف الصفحة: [[<link href="css/styles.css">]] في الـ head، و [[<script type="module" src="js/app.js"></script>]]، وجوه [[app.js]]: [[import { price } from "./format";]]. لاقيهم من DevTools بس (من غير ما تقرا الكود الأول)، وصلّحهم.`, done: R`كتبت لكل غلطة الدليل اللي لقيته في DevTools، وبعد التصليح العنوان أزرق والإجمالي مكتوب ومفيش ولا 404.`, sol: R`~~~text اللي ظهر في DevTools قبل التصليح (Chrome 158)
Elements › h1 › Computed › color: rgb(0, 0, 0)       ← الـ CSS مش متطبق
Network: app.js 200 script، و format 404 script        ← مفيش styles.css خالص!
Console: Failed to load resource: the server responded with a status of 404 (Not Found)
الإجمالي فضل «…»
~~~

**الغلطة ١: [[<link>]] من غير [[rel]].** الدليل الغريب إن styles.css **مش موجود في Network أصلًا**، لا 200 ولا 404. المتصفح مش عارف ده ستايل، فمطلبهوش. التصليح: [[<link rel="stylesheet" href="css/styles.css">]].

**الغلطة ٢: [[import]] من غير [[.js]].** Network فيه طلب اسمه [[format]] من غير امتداد رجع 404. المتصفح مبيخمّنش الامتداد زي Node القديم أو Vite. التصليح: [[from "./format.js"]].

**الغلطة ٣ (مستخبية):** لما import واحد بيقع، **الـ module كله مبيشتغلش**، حتى السطور اللي ملهاش علاقة بـ [[price]]. عشان كده الإجمالي «…» ومفيش ولا [[console.log]] من [[app.js]]. فلو لقيت ملف JS «مش بيعمل أي حاجة» ومفيش error باسمه، دوّر على import واقع.

~~~text بعد التصليح
Network: styles.css 200، app.js 200، format.js 200
الـ h1 = rgb(29, 78, 216)، والإجمالي «١٬٢٥٠ جنيه»
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة تانية [[about/index.html]] في نفس المشروع، بنفس الـ CSS والـ JS واللوجو بالظبط (من غير ما تنسخهم)، وفيها لينك للرئيسية. وتشتغل لو الموقع على [[localhost]] أو على GitHub Pages جوه [[/shop/]].`, done: R`Network في [[about/]] فيه ٤ طلبات كلهم [[200]] من [[css/]] و [[js/]] و [[assets/]] اللي في أول المشروع (مش من [[about/css/]])، والعنوان أزرق، والإجمالي اتكتب، واللينك بيرجّعك للرئيسية.`, sol: R`~~~html about/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>عن المتجر</title>
  <link rel="stylesheet" href="../css/styles.css">
  <script type="module" src="../js/app.js"></script>
</head>
<body>
  <nav><a href="../">الرئيسية</a> · <a href="./">عن المتجر</a></nav>
  <h1>عن المتجر</h1>
  <p class="total">الإجمالي: <output id="total">…</output></p>
  <img src="../assets/logo.svg" alt="لوجو المتجر" width="64" height="64">
</body>
</html>
~~~

~~~text http://localhost:8080/about/   (performance.getEntriesByType("resource")، Chrome 158)
/css/styles.css    200
/js/app.js         200
/assets/logo.svg   200
/js/format.js      200
الـ h1 = rgb(29, 78, 216)، والإجمالي «١٬٢٥٠ جنيه»
~~~

- **[[../]] في كل مسار:** الصفحة جوه [[about/]]، فلازم تطلع خطوة لفوق عشان توصل لـ [[css/]]. ومش [[/css/]] بشَرطة، لأن دي هتقع على GitHub Pages (التمرين الأول).
- **[[format.js]] مش محتاج تعديل:** الـ [[import "./format.js"]] جوه [[app.js]] نسبي لـ [[app.js]] نفسه، و [[app.js]] لسه في [[js/]]. مسارات الـ JS متتأثرش بمكان الصفحة.
- **[[href="../"]]** بيودّي للفولدر اللي فوق، والسيرفر بيرجّع [[index.html]] بتاعه. و [[href="./"]] للصفحة نفسها.
- **[[app.js]] اشتغل هنا كمان** وكتب الإجمالي، لأن نفس العناصر ([[#total]]) موجودة. لو صفحة مفيهاش [[#total]] كان [[querySelector]] هيرجّع [[null]] ويوقع (درس «لما المشروع ميشتغلش» بيوري الرسالة وإزاي تتجنبها).` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[main.js]] فيه [[import "./a.js"; import "./b.js";]]، والاتنين فيهم [[import { add, count } from "./c.js"; add(); console.log(..., count);]]، و [[c.js]] فيه [[console.log("c.js اشتغل"); export let count = 0; export function add() { count++; }]]. كام مرة [[c.js]] هيتطلب من السيرفر؟ وكام مرة هيطبع؟ و [[count]] هيطلع كام في a وفي b؟ وبالترتيب؟`, done: R`كتبت توقعك، وشغّلت، و Console و Network طابقوا: [[c.js]] اتطلب مرة واتشغّل مرة، و a طبعت ١ و b طبعت ٢.`, sol: R`~~~js js/g/c.js
console.log("c.js اشتغل");
export let count = 0;
export function add() { count++; }
~~~

~~~js js/g/a.js
import { add, count } from "./c.js";
add();
console.log("a.js: count =", count);
~~~

[[b.js]] نفس [[a.js]] بـ «b.js» في الرسالة، و [[main.js]]:

~~~js js/g/main.js
import "./a.js";
import "./b.js";
console.log("main.js اشتغل آخر واحد");
~~~

~~~text Console (Chrome 158)
c.js اشتغل
a.js: count = 1
b.js: count = 2
main.js اشتغل آخر واحد
~~~

~~~text Network
main.js  a.js  b.js  c.js     ← c.js مرة واحدة
~~~

- **الـ module بيتحمّل ويشتغل مرة واحدة** مهما اتعمله import من كام ملف. كل الملفات اللي بتعمل import لـ [[c.js]] بياخدوا **نفس النسخة**. عشان كده ينفع ملف [[state.js]] واحد يشيل حالة التطبيق وكل الملفات تشوفها.
- **الترتيب:** المتصفح بيشغّل الأعمق الأول (depth-first): [[c.js]] قبل [[a.js]] لأن [[a.js]] محتاجه، وبعدين [[b.js]] (و [[c.js]] خلاص اشتغل)، وآخر حاجة [[main.js]].
- **[[count]] في b بقى ٢ مش ١:** الـ import في JavaScript **live binding**: [[count]] في [[b.js]] مش نسخة من القيمة، ده شباك على المتغير اللي في [[c.js]]. بعد [[add()]] بتاعة a و b بقى ٢. (ومتقدرش تكتب [[count++]] من a: [[TypeError: Assignment to constant variable.]] لأن الـ import read-only.)` },
          ],
          ref: [
            { t: "MDN: <link>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link" },
            { t: "MDN: <script>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script" },
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "MDN: Render-blocking", url: "https://developer.mozilla.org/en-US/docs/Glossary/Render_blocking" },
            { t: "MDN: First contentful paint", url: "https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint" },
            { t: "MDN: MIME types", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types" },
            { t: "MDN: URL() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL/URL" },
            { t: "MDN: CORS errors", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors" },
            { t: "Node.js: http", url: "https://nodejs.org/api/http.html" },
          ],
          pre: [{ to: "css/المسارات: مطلق ونسبي", why: R`نفس قاعدة المسارات النسبية في اللينكات، هنا بنطبقها على [[href]] و [[src]]` }, { to: "css/فولدر لكل مشروع", why: R`ترتيب الفولدر والأسامي اللي من غير مسافات` }, { to: "js/import و export", why: R`الـ [[import]] اللي جوه [[app.js]]` }],
          deep: {
            why: R`أغلب «الكود مش شغال» عند اللي لسه بيبدأ مش في الكود: الملف مبيوصلش. مسار نسبي من فولدر غلط، أو [[rel]] ناقصة، أو صفحة مفتوحة بدبل كليك. ومفيش رسالة كبيرة بتقولك، الصفحة بتشتغل ناقصة. لما تعرف الخيوط وتعرف تقرا Network، المشكلة دي بتتحل في دقيقة بدل ساعة.`,
            how: R`المتصفح بيقرا الـ HTML من فوق. أول ما يقابل [[<link rel="stylesheet">]] بيطلب الملف، وبيكمّل قراية، بس **مبيرسمش** لحد ما الـ CSS يوصل (render-blocking). و [[<script type="module">]] بيتطلب في الخلفية، وبعد ما الـ HTML يخلص بيتقري، والمتصفح بيلاقي فيه [[import]] فيطلب الملفات دي، ولما الشجرة كلها توصل يشغّلها بالترتيب. كل مسار بيتحسب بـ [[new URL(path, base)]]: الـ base للـ HTML هو رابط الصفحة، وللـ import هو رابط ملف الـ JS. ولكل رد المتصفح بيبص على [[Content-Type]]: الـ module لازم JavaScript وإلا بيترفض.`,
            when: R`[[<link rel="stylesheet">]] في الـ head لكل CSS الصفحة محتاجاه من أول رسمة. [[<script type="module">]] في الـ head لكود الصفحة. [[<script>]] عادي من غير [[defer]] بس لحاجة لازم تشتغل قبل الرسم (زي سكربت الثيم في درس «الحالة ← الصفحة»). سيرفر محلي دايمًا وانت بتبني، حتى لو الصفحة شغالة من [[file://]]، عشان تشوف نفس اللي هيحصل بعد النشر.`,
            mistakes: R`فتح الصفحة بدبل كليك والـ modules مش شغالة. [[<link href>]] من غير [[rel]]. [[import "./x"]] من غير [[.js]]. نفس المسارات في صفحة جوه فولدر فرعي. [[/css/...]] في موقع على GitHub Pages في فولدر الريبو. أسامي فيها حروف كبيرة أو مسافات وتشتغل على ويندوز وتقع على لينكس. [[<script src="..." />]] من غير [[</script>]]. السكربت في آخر الـ body **و** [[defer]] و [[DOMContentLoaded]] كلهم مع بعض «للاحتياط».`,
          },
        },
        {
          cmd: "تشغّل المشروع وتعرضه: سيرفر محلي ونشر",
          title: "من فولدر فاضي لصفحة على رابط: تعمل الملفات من الترمنال، وتشغّلها بـ ٣ سيرفرات، وتشوفها من الموبايل، وتتخلص من الكاش، وتنشرها",
          desc: R`المشروع مش بيتفتح بدبل كليك. بيتعمل من الترمنال، ويتفتح في VS Code، ويشتغل من **سيرفر محلي** على [[http://localhost:PORT]]، ويتنشر على رابط حقيقي.
• **تعمله:** [[mkdir]] و [[ni]] في PowerShell، أو [[mkdir -p]] و [[touch]] في Git Bash، وبعدين [[code .]].
• **تشغّله:** [[npx serve]] أو [[python -m http.server]] أو [[node server.mjs]] (٣٠ سطر بإيدك)، أو إضافة Live Server في VS Code. كلهم بيعملوا نفس الحاجة: يبعتوا الملفات بالنوع الصح.
• **تشوفه:** [[http://localhost:8080]]، و Ctrl+Shift+R لو الكاش عاند، و Ctrl+Shift+M لمقاس موبايل، أو من الموبايل نفسه على نفس الـ Wi-Fi بـ IP جهازك.
• **تنشره:** [[git push]] و GitHub Pages، أو تسحب الفولدر على موقع استضافة.`,
          example: R`mkdir shop
cd shop
mkdir css, js, assets
ni index.html, css/styles.css, js/app.js
code .
npx serve -l 8080
python -m http.server 8080
node server.mjs
git init -b main
git add .
git commit -m "أول نسخة"
git remote add origin https://github.com/sara/shop.git
git push -u origin main`,
          try: R`اعمل فولدر [[shop]] بالأوامر دي (أو بنسخة Git Bash اللي في الشرح)، وحط فيه ملفات درس «link و script». شغّله بـ [[npx serve -l 8080]] وافتح [[http://localhost:8080]]. وقّفه بـ Ctrl+C، وشغّله بـ [[python -m http.server 8080]]، وافتح [[http://localhost:8080/css/]]: إيه اللي ظهر؟ وجرّب نفس الرابط مع [[server.mjs]].`,
          sol: R`~~~text http://localhost:8080/css/ مع كل سيرفر (اتجرّب على ويندوز 11)
npx serve (14.2.8):         صفحة فيها لستة ملفات الفولدر (styles.css)
python -m http.server (3.14.3): صفحة HTML فيها لستة ملفات الفولدر (styles.css)
node server.mjs:            404 «مش موجود: /css/»
~~~

[[serve]] و [[python]] بيعرضوا محتوى أي فولدر مفيهوش [[index.html]] (directory listing)، وده مريح وانت بتجرّب بس مش حاجة تسيبها على سيرفر حقيقي. [[server.mjs]] اللي كتبناه بيدوّر على [[index.html]] بس، فرجّع 404. الصفحة نفسها ([[/]]) اشتغلت بنفس الشكل في التلاتة.`,
          teach: R`## الفكرة

درس «link و script» قال إن الصفحة لازم تتفتح من سيرفر. الدرس ده بيمشي معاك من أول ما الفولدر مش موجود لحد ما الصفحة على رابط تبعته لحد، بكل أمر بيتكتب في الترمنال، وبالفرق بين الطرق. كله اتجرّب على ويندوز 11: PowerShell 7 و Git Bash، و Node 24.22، و Python 3.14.3، و Chrome 158، و VS Code 1.147، و git 2.56.

---

## ١. تعمل الفولدر والملفات من الترمنال

### PowerShell

~~~powershell
mkdir shop
cd shop
mkdir css, js, assets
ni index.html, css/styles.css, js/app.js
~~~

~~~text الناتج (مختصر، pwsh 7)
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          11/21/2026  1:58 PM                css
d----          11/21/2026  1:58 PM                js
d----          11/21/2026  1:58 PM                assets
-a---          11/21/2026  1:58 PM              0 index.html
...
-a---          11/21/2026  1:58 PM              0 styles.css
-a---          11/21/2026  1:58 PM              0 app.js
~~~

- **[[mkdir css, js, assets]]:** الفاصلة في PowerShell معناها «لستة»، فبيعمل التلات فولدرات مرة واحدة. [[d----]] يعني directory.
- **[[ni]]** اختصار [[New-Item]]: بيعمل ملف فاضي ([[Length 0]]). والمسار [[css/styles.css]] شغال بالشَرطة العادية في ويندوز كمان.

### Git Bash (ونفسه في لينكس والماك)

~~~bash
mkdir -p shop/{css,js,assets}
cd shop
touch index.html css/styles.css js/app.js
find . | sort
~~~

~~~text الناتج (Git Bash، bash 5.3)
.
./assets
./css
./css/styles.css
./index.html
./js
./js/app.js
~~~

- **[[-p]]:** اعمل الفولدرات اللي في النص لو مش موجودة، ومتعترضش لو موجودة.
- **[[{css,js,assets}]]:** الـ shell بيفكّها لتلات كلمات ([[shop/css shop/js shop/assets]]) قبل ما [[mkdir]] يشوفها. اسمها brace expansion، ومش موجودة في PowerShell.
- **[[touch]]** بيعمل الملف لو مش موجود (ولو موجود بيحدّث وقت التعديل بس، مبيمسحش اللي فيه).

### تفتحه في VS Code

~~~powershell
code .
~~~

النقطة يعني «الفولدر اللي أنا فيه». VS Code بيفتح الفولدر كله في الشمال (Explorer). لو [[code]] مش متعرّف: في VS Code افتح Command Palette (Ctrl+Shift+P) واكتب «Shell Command: Install 'code' command in PATH» (على الماك)، وعلى ويندوز بيتضاف وقت التسطيب. اتأكد بـ [[code --version]] (هنا طلع [[1.147.0]]).

---

## ٢. تشغّله: ٣ سيرفرات، وإضافة

كلهم بيعملوا نفس الشغلة: بيستنوا طلب على بورت، ويقروا الملف من الفولدر، ويبعتوه مع [[Content-Type]] صح. شغّل أي واحد **من جوه فولدر المشروع**، ووقّفه بـ Ctrl+C.

### أ. [[npx serve]]

~~~powershell
npx serve -l 8080
~~~

~~~text الناتج (serve 14.2.8، أول مرة بيسأل ينزّله: اكتب y، أو استخدم npx --yes)
 INFO  Accepting connections at http://localhost:8080
~~~

[[npx]] بيشغّل package من npm من غير ما تسطّبه في المشروع (بينزل في كاش npm). و [[-l]] اختصار [[--listen]]: البورت. من غيره بيختار 3000.

### ب. [[python -m http.server]]

~~~powershell
python -m http.server 8080
~~~

~~~text الناتج (Python 3.14.3)
Serving HTTP on :: port 8080 (http://[::]:8080/) ...
::ffff:127.0.0.1 - - [21/Nov/2026 14:00:51] "GET / HTTP/1.1" 200 -
~~~

[[-m http.server]] بيشغّل موديول جاي مع Python. البورت الافتراضي 8000. ولو Python مش متسطّب، [[python]] على ويندوز بيفتح Microsoft Store بدل ما يشتغل؛ استخدم [[npx serve]].

### ج. [[node server.mjs]]: سيرفر بإيدك

لو مش عايز تنزّل حاجة، Node فيه [[node:http]]. ده كفاية لأي مشروع في الوحدة دي، وكل المشاريع هنا اتقاست بيه:

~~~js server.mjs
// server.mjs: سيرفر صغير للتجربة على جهازك، من غير أي package
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const root = process.cwd();
const port = process.env.PORT || 8080;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

http.createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const file = join(root, path.endsWith("/") ? path + "index.html" : path);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end();
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
    console.log(200, path);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("مش موجود: " + path);
    console.log(404, path);
  }
}).listen(port, () => console.log("شغال على http://localhost:" + port));
~~~

- **[[root = process.cwd()]]:** الفولدر اللي انت واقف فيه في الترمنال. شغّله من جوه [[shop]]: [[node server.mjs]].
- **[[TYPES]]:** نوع كل ملف حسب امتداده. **ده أهم جزء:** المتصفح بيرفض يشغّل module لو النوع مش JavaScript (الجزء ٦).
- **[[new URL(req.url, ...).pathname]]:** بياخد [[/js/app.js]] من الطلب من غير [[?x=1]]. و [[decodeURIComponent]] بيرجّع الحروف العربي والمسافات من [[%D8...]].
- **[[path + "index.html"]]:** الطلب [[/]] أو [[/about/]] بيرجّع [[index.html]] اللي جوه الفولدر.
- **[[file.startsWith(root)]]:** حماية: طلب زي [[/..%2F..%2Fserver.mjs]] بيتفك لـ [[/../../server.mjs]] ويطلع برّه الفولدر. جرّبته بـ [[curl --path-as-is]] ورجع [[403]].
- **[[catch]]:** الملف مش موجود، فـ 404 ورسالة.

~~~text node server.mjs، وبعدين فتحت الصفحة في Chrome، و curl للحالات التانية
شغال على http://localhost:8080
200 /
200 /js/app.js
404 /js/ap.js
~~~

> ده سيرفر **للتجربة على جهازك**. مفيش cache ولا ضغط ولا HTTPS. للنشر استخدم GitHub Pages أو أي استضافة static.

### د. إضافة Live Server في VS Code (من وثائقها)

إضافة «Live Server» (Ritwick Dey) بيظهر لها زرار «Go Live» تحت في شريط VS Code. بتشغّل سيرفر على بورت 5500 وبتفتح المتصفح، **وبتعمل refresh لوحدها** كل ما تحفظ. مريحة جدًا للـ HTML و CSS. (الكلام ده من صفحة الإضافة؛ مسطّبتهاش هنا عشان متعدّلش في VS Code بتاع الجهاز.)

### المقارنة (اتقاست بـ [[curl -D -]] على نفس الفولدر)

| | [[npx serve]] | [[python -m http.server]] | [[node server.mjs]] |
|---|---|---|---|
| محتاج إيه | Node و نت أول مرة | Python | Node بس |
| البورت لو مكتبتش | 3000 | 8000 | 8080 (من الكود) |
| نوع [[app.js]] | [[application/javascript; charset=utf-8]] | [[text/javascript]] | [[text/javascript; charset=utf-8]] |
| فولدر من غير [[index.html]] ([[/css/]]) | لستة الملفات | لستة الملفات | 404 |
| ملف مش موجود | 404 صفحة HTML | 404 صفحة HTML | 404 نص |
| بيسجّل الطلبات | لأ | أيوه، سطر لكل طلب | أيوه (احنا كتبناه) |
| refresh لوحده | لأ | لأ | لأ (Live Server بس) |

التلاتة شغّلوا الصفحة نفسها بالظبط (العنوان أزرق، والإجمالي اتكتب، ومفيش errors). اختار اللي موجود عندك. ولو حاجة غريبة بتحصل، [[server.mjs]] بيطبع كل طلب فبتعرف المتصفح طلب إيه بالظبط.

---

## ٣. تشوفه: الرابط والكاش والموبايل

### الرابط

[[http://localhost:8080]] و [[http://127.0.0.1:8080]] نفس الجهاز. [[localhost]] اسم، و [[127.0.0.1]] رقمه. والبورت بعد النقطتين لازم يطابق اللي السيرفر بيقول عليه.

### الكاش: «عدّلت ومفيش حاجة اتغيّرت»

لو السيرفر بيقول للمتصفح «خزّن الملف ساعة» ([[Cache-Control: max-age=3600]]، استضافات كتير بتعمل كده)، المتصفح بيستخدم النسخة القديمة. جرّبت ده: الصفحة اتفتحت والعنوان أزرق، وبعدين غيّرت اللون في [[styles.css]] لأحمر:

~~~text Chrome 158، [[performance.getEntriesByType("resource")]] لملف styles.css
Ctrl+R (reload عادي):        العنوان rgb(29, 78, 216) أزرق قديم   transferSize = 0   (من الكاش)
Ctrl+R تاني:                  نفس الأزرق، transferSize = 0
Ctrl+Shift+R (hard reload):  rgb(220, 38, 38) أحمر جديد           transferSize = 400
~~~

- **[[transferSize = 0]]** يعني الملف مجاش من الشبكة خالص.
- **Ctrl+Shift+R** (على الماك Cmd+Shift+R) بيطلب كل حاجة من السيرفر من غير كاش.
- **الحل الدايم وانت بتبني:** DevTools › Network › علّم «Disable cache». طول ما DevTools مفتوح الكاش مقفول. جرّبتها: غيّرت اللون لأخضر، و Ctrl+R عادي جاب الأخضر على طول.
- السيرفرات التلاتة اللي فوق مبتبعتش [[max-age]]، فالمشكلة دي أقل معاهم، بس بتظهر بعد النشر.

### مقاس الموبايل من الكمبيوتر

F12 ثم Ctrl+Shift+M (Device toolbar): اختار عرض 360 أو جهاز من اللستة. الصفحة بتترسم بالعرض ده، و [[@media]] بتشتغل عليه. ده كفاية لأغلب الشغل، بس اللمس والكيبورد الحقيقي والأداء بيبانوا على موبايل حقيقي.

### من الموبايل نفسه

السيرفرات التلاتة بتسمع على **كل** كروت الشبكة مش على [[localhost]] بس:

~~~text Get-NetTCPConnection -State Listen (والـ IP متغيّر)
LocalAddress LocalPort OwningProcess
::                8080         ...
~~~

[[::]] يعني «أي عنوان». فلو الموبايل على نفس الـ Wi-Fi:

~~~powershell
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
~~~

خد الـ IP بتاع كارت الـ Wi-Fi (شكله [[192.168.1.23]])، وافتح من الموبايل [[http://192.168.1.23:8080]]. في bash/الماك: [[ipconfig getifaddr en0]] (الماك) أو [[hostname -I]] (لينكس). جرّبت الرابط بالـ IP ده من نفس الجهاز ورجّع 200 من التلاتة.

- **أول مرة** ويندوز بيسأل «Allow access» لـ Node أو Python على الشبكة: وافق على Private بس.
- **مش شغال؟** اتأكد إن الاتنين على نفس الشبكة، وإن الشبكة مش «Public» في ويندوز، وإن الراوتر مش عامل client isolation (شبكات الكافيهات والفنادق غالبًا).
- و [[python -m http.server --bind 127.0.0.1]] عكسها: جهازك بس.

---

## ٤. تنشره

### GitHub Pages: [[git]] ثم إعداد

~~~bash
git init -b main
git add .
git status --short
git commit -m "أول نسخة من المتجر"
git remote add origin https://github.com/sara/shop.git
git push -u origin main
~~~

جرّبت كل ده لحد [[push]] على ريبو [[--bare]] على الجهاز بدل GitHub (عشان منعملش حساب أو ريبو حقيقي):

~~~text الناتج (git 2.56)
Initialized empty Git repository in ~/run/shop/.git/
A  assets/logo.svg
A  css/styles.css
A  index.html
A  js/app.js
A  js/format.js
A  server.mjs
[main (root-commit) 6702905] أول نسخة من المتجر
 6 files changed, 60 insertions(+)
To ../shop-remote.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
~~~

- **[[git init -b main]]:** فولدر [[.git]] جوه المشروع، والفرع اسمه [[main]].
- **[[git add .]]** يجهّز كل الملفات، و **[[git status --short]]** بيوريك اللي اتجهّز ([[A]] = added)، و **[[commit]]** يحفظهم كنسخة برسالة.
- **[[remote add origin]]:** عنوان الريبو على GitHub (بتعمله الأول من الموقع: New repository، من غير README عشان ميحصلش تعارض).
- **[[push -u origin main]]:** يرفع، و [[-u]] بيربط الفرع عشان المرة الجاية [[git push]] بس.
- على ويندوز ممكن تشوف [[warning: in the working copy of 'index.html', LF will be replaced by CRLF]]: تحذير عن نهايات السطور، مش غلط.

**وبعدين في GitHub (من وثائق GitHub Pages):** الريبو › Settings › Pages › Build and deployment › Source: «Deploy from a branch» › Branch: [[main]] والفولدر [[/ (root)]] › Save. بعد دقيقة لعشرة الموقع بيبقى على [[https://sara.github.io/shop/]].

**افتكر المسارات:** الموقع في [[/shop/]] مش في أول الدومين، فـ [[href="/css/styles.css"]] هيقع ([[href="css/styles.css"]] صح). وأسامي الملفات حساسة للحروف الكبيرة هناك.

### استضافة بالسحب والإفلات (من وثائقها)

مواقع زي Netlify فيها صفحة «Drop» ([[app.netlify.com/drop]]): بتسحب فولدر المشروع (اللي فيه [[index.html]]) وترميه في الصفحة، وبيطلعلك رابط على طول. مناسبة تبعت نسخة لحد يشوفها في دقيقة، بس من غير تاريخ تعديلات زي git. (من وثائق Netlify؛ متجرّبتش هنا عشان محتاجة حساب.)

---

## الخلاصة

| الخطوة | PowerShell | Git Bash |
|---|---|---|
| الفولدر والملفات | [[mkdir shop; cd shop; mkdir css, js, assets; ni index.html, css/styles.css, js/app.js]] | [[mkdir -p shop/{css,js,assets} && cd shop && touch index.html css/styles.css js/app.js]] |
| تفتحه | [[code .]] | [[code .]] |
| تشغّله | [[npx serve -l 8080]] أو [[python -m http.server 8080]] أو [[node server.mjs]] | نفس الأوامر |
| تشوفه | [[http://localhost:8080]]، و Ctrl+Shift+R، و Disable cache | نفسه |
| من الموبايل | [[Get-NetIPAddress]] ثم [[http://IP:8080]] | [[hostname -I]] أو [[ipconfig getifaddr en0]] |
| تنشره | [[git add .]] ثم [[commit]] ثم [[push]] و Settings › Pages | نفسه |

اللي ميتلخبطش: السيرفر بيشتغل من جوه فولدر المشروع، والبورت في الرابط لازم يطابق، و Disable cache وانت بتبني، والمسارات من غير [[/]] في الأول عشان GitHub Pages.`,
          lines: [
            R`[[mkdir]] بيعمل فولدر المشروع اسمه [[shop]] في المكان اللي انت واقف فيه في الترمنال`,
            R`[[cd]] بيدخّلك جوه الفولدر، فكل الأوامر اللي بعده بتشتغل جواه`,
            R`تلات فولدرات مرة واحدة: الفاصلة في PowerShell معناها لستة. في Git Bash: [[mkdir -p css js assets]]`,
            R`[[ni]] (New-Item) بيعمل التلات ملفات فاضيين بمساراتهم. في Git Bash: [[touch]] بنفس المسارات`,
            R`بيفتح الفولدر اللي انت فيه (النقطة) في VS Code`,
            R`الطريقة الأولى: سيرفر جاهز من npm من غير تسطيب، على بورت 8080، ويتوقف بـ Ctrl+C`,
            R`الطريقة التانية: السيرفر اللي جاي مع Python على نفس البورت (واحد بس يشتغل في المرة)`,
            R`الطريقة التالتة: السيرفر اللي كتبته بإيدك في [[server.mjs]] بـ [[node:http]]، والبورت من [[PORT]] أو 8080`,
            R`بيعمل ريبو git جوه الفولدر (فولدر [[.git]] مستخبي) والفرع الأساسي اسمه [[main]]`,
            R`بيجهّز كل الملفات اللي في الفولدر للـ commit (النقطة = كله)`,
            R`بيحفظ نسخة من الملفات المجهّزة برسالة بتوصف التغيير`,
            R`بيقول لـ git عنوان الريبو اللي على GitHub واسمه المختصر [[origin]]. [[sara/shop]] اسم متخيّل`,
            R`بيرفع فرع [[main]] لـ [[origin]]، و [[-u]] بيربطهم عشان المرة الجاية [[git push]] لوحدها تكفي`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[python -m http.server --help]] بس، اعرف إزاي تشغّل السيرفر على فولدر [[shop]] **من برّاه** (من غير [[cd]])، ويسمع على جهازك بس (مش الشبكة)، على بورت 8894.`, done: R`كتبت أمر واحد، وجرّبته، والصفحة فتحت من [[http://127.0.0.1:8894]]، وعرفت تقول ليه الموبايل مش هيقدر يفتحها.`, sol: R`~~~text python -m http.server --help (السطور المهمة، Python 3.14.3)
usage: python.exe -m http.server [-h] [--cgi] [-b ADDRESS] [-d DIRECTORY]
                                 [-p VERSION] [--tls-cert PATH]
                                 [--tls-key PATH] [--tls-password-file PATH]
                                 [port]
  port                  bind to this port (default: 8000)
  -b, --bind ADDRESS    bind to this address (default: all interfaces)
~~~

~~~powershell
python -m http.server 8894 --bind 127.0.0.1 --directory shop
~~~

~~~text الناتج (وبعدين فتحت الرابط)
Serving HTTP on 127.0.0.1 port 8894 (http://127.0.0.1:8894/) ...
127.0.0.1 - - [21/Nov/2026 14:06:50] "GET / HTTP/1.1" 200 -
~~~

- **[[--directory shop]]** (أو [[-d]]): الفولدر اللي هيتبعت منه، بدل الفولدر الحالي.
- **[[--bind 127.0.0.1]]** (أو [[-b]]): يسمع على عنوان الجهاز الداخلي بس. لاحظ إن السطر بقى [[127.0.0.1]] بدل [[::]]، فطلب من IP الشبكة أو من الموبايل مش هيوصله. ده الأأمن لو انت على Wi-Fi عام.
- **[[port]]** من غير اسم (positional)، فـ [[8894]] لوحدها في أي مكان بعد [[http.server]].

الـ help بيتقري كده: اللي بين [[[ ]]] اختياري، والكلمة الكبيرة ([[ADDRESS]] و [[DIRECTORY]]) مكان قيمة تكتبها.` },
            { lvl: 'تطبيق', t: R`**ابني:** شغّل مشروع [[shop]] بـ [[node server.mjs]]، وافتحه من موبايلك على نفس الـ Wi-Fi. اكتب الأوامر اللي استخدمتها، والرابط اللي فتحته (بـ IP متغيّر لو هتنشره)، وأي حاجة وقفتك.`, done: R`الصفحة فتحت على الموبايل بالعنوان الأزرق والإجمالي، والترمنال فيه سطر [[200 /]] من الموبايل، وعرفت IP جهازك من الأمر مش من التخمين.`, sol: R`~~~powershell
cd shop
node server.mjs
~~~

وفي ترمنال تاني:

~~~powershell
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
~~~

~~~text الناتج (مختصر، والأرقام متغيّرة)
InterfaceAlias                IPAddress
--------------                ---------
Ethernet 2                    172.20.80.1
Bluetooth Network Connection  169.254.12.40
Ethernet                      169.254.200.7
Wi-Fi                         192.168.1.23
Loopback Pseudo-Interface 1   127.0.0.1
~~~

على جهاز حقيقي اللستة طويلة (كروت Bluetooth و VPN و Hyper-V). اللي يهمك اللي جنب [[Wi-Fi]]: عنوانه بيبدأ غالبًا بـ [[192.168.]] أو [[10.]]. و [[169.254.]] معناها كارت مش متوصّل.

ومن الموبايل: [[http://192.168.1.23:8080]].

~~~text ترمنال السيرفر بعد ما الموبايل فتح
شغال على http://localhost:8080
200 /
200 /css/styles.css
200 /js/app.js
200 /assets/logo.svg
200 /js/format.js
404 /favicon.ico
~~~

- **السيرفر طبع [[http://localhost:8080]]** بس هو بيسمع على كل العناوين: [[.listen(port)]] من غير عنوان = [[::]]. اتأكدت بـ [[Get-NetTCPConnection -State Listen -LocalPort 8080]] (الـ LocalAddress [[::]]) وبـ طلب على [[http://192.168.1.23:8080/]] رجع 200.
- **الـ IP الصح:** اللي جنب [[Wi-Fi]] (أو [[Ethernet]] لو الكمبيوتر بسلك والموبايل على نفس الراوتر). [[127.0.0.1]] ده الجهاز نفسه، مينفعش من الموبايل.
- **اللي ممكن يوقفك:** نافذة Windows Firewall أول مرة (وافق على Private)، أو الشبكة متعرّفة Public في ويندوز (Settings › Network › Wi-Fi › Private network)، أو شبكة عامة بتمنع الأجهزة تشوف بعض.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** «غيّرت لون العنوان في [[styles.css]] وحفظت وعملت refresh عشر مرات والصفحة لسه بالأزرق». السيرفر بيبعت [[Cache-Control: max-age=3600]]. اثبت إن ده كاش من Network، وصلّحه بطريقتين: واحدة ليك وانت بتبني، وواحدة للناس بعد النشر.`, done: R`لقيت [[(memory cache)]] أو [[(disk cache)]] في عمود Size جنب styles.css و [[transferSize]] صفر، و Ctrl+Shift+R جاب اللون الجديد، وعندك حل للناس مش «قولهم يعملوا Ctrl+Shift+R».`, sol: R`**الإثبات:** DevTools › Network › Ctrl+R. جنب [[styles.css]] في عمود Size مكتوب [[(memory cache)]] أو [[(disk cache)]] بدل حجم. ومن Console:

~~~js Console
performance.getEntriesByType("resource").find((r) => r.name.includes("styles.css")).transferSize
~~~

~~~text Chrome 158 (السيرفر بيبعت max-age=3600)
بعد Ctrl+R:        0      واللون rgb(29, 78, 216) القديم
بعد Ctrl+Shift+R:  400    واللون rgb(220, 38, 38) الجديد
~~~

**الحل ليك وانت بتبني:** Network › علّم **Disable cache** (شغال طول ما DevTools مفتوح). جرّبت: غيّرت اللون تاني و Ctrl+R عادي جاب الجديد. أو سيرفر تطوير مبيبعتش [[max-age]] (التلاتة اللي في الدرس).

**الحل للناس:** غيّر **اسم الملف** كل ما محتواه يتغيّر، فالمتصفح يشوفه ملف جديد:

~~~html index.html
<link rel="stylesheet" href="css/styles.css?v=2">
~~~

[[?v=2]] بيخلي الرابط مختلف، والكاش متخزّن بالرابط. الأدوات زي Vite بتعمل ده لوحدها باسم فيه hash ([[styles.4f2a9c.css]]). ده اسمه cache busting.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** خلّي [[server.mjs]] يأخّر ملفات الـ CSS ثانية ونص (لو الرابط فيه [[?slow]]). وجرّب صفحتين: [[<link>]] في الـ head، و [[<link>]] في آخر الـ body. قيس أول رسمة بـ [[performance.getEntriesByName("first-contentful-paint")]]، واقرا لون الـ h1 كل ربع ثانية وهي بتتحمّل.`, done: R`عندك رقمين لكل حالة (FCP ووقت وصول الـ CSS) من ٣ مرات، وجملة بتشرح ليه الأسرع في الرسم هو الأوحش للعين.`, sol: R`التعديل في [[server.mjs]] قبل [[readFile]]:

~~~js server.mjs (جوه الـ try، أول سطر)
if (req.url.includes("?slow") && file.endsWith(".css")) await new Promise((r) => setTimeout(r, 1500));
~~~

وفي الصفحة [[href="css/styles.css?slow"]]. القياس من Console بعد ما الصفحة تخلص:

~~~js Console
const fcp = performance.getEntriesByName("first-contentful-paint")[0].startTime;
const css = performance.getEntriesByType("resource").find((r) => r.name.includes("styles.css")).responseEnd;
console.log(Math.round(fcp), Math.round(css));
~~~

~~~text الأرقام (ms، Chrome 158، ٣ مرات)
link في الـ head:       FCP 1520 1520 1532   الـ CSS 1515 1513 1523
link في آخر الـ body:   FCP   20   24   20   الـ CSS 1525 1522 1523
~~~

- **[[performance.getEntriesByName("first-contentful-paint")]]** بيرجّع الوقت من أول ما الصفحة بدأت لحد أول رسمة فيها محتوى. و **[[responseEnd]]** آخر byte من الملف وصل إمتى.
- **في الـ head** الـ FCP بعد وصول الـ CSS بـ ٥ لـ ٩ms: المتصفح مستني الـ CSS يوصل ويرسم على طول.
- **في الـ body** الـ FCP بعد 20ms، **قبل الـ CSS بـ ١٫٥ ثانية**: المتصفح رسم المحتوى اللي فوق الـ link من غير شكل، وبعدين قلبه. قريت لون الـ h1 وهي بتتحمّل (الكاش مقفول): [[rgb(0, 0, 0)]] عند 20 و 284 و 546 و 812 و 1078 و 1343ms، يعني عنوان أسود مرسوم على الشاشة أكتر من ثانية وربع، وبعدين اتقلب أزرق. الرقم أحسن والتجربة أوحش، وده اسمه FOUC.

**ليه FCP ممكن يكدب:** هو بيقيس «اترسم حاجة» مش «اترسمت صح». عشان كده بنقيس بعينك وبالرقم مع بعض.` },
            { lvl: 'تحدي', t: R`**انشره:** حوّل [[shop]] لريبو git واعمل commit، وارفعه. لو عندك حساب GitHub: ريبو جديد و Pages من [[main]]. لو لأ: ارفعه على ريبو [[--bare]] على جهازك، واعمل منه [[clone]] في فولدر تاني، وشغّل النسخة دي بسيرفر واتأكد إنها شغالة زي الأصل.`, done: R`[[git log --oneline]] في الـ clone فيه الـ commit بتاعك، والصفحة من الـ clone شغالة (أو الرابط على [[github.io]] شغال)، والـ Console من غير errors.`, sol: R`~~~bash
git init --bare -b main ../shop-remote.git
git init -b main
git add .
git commit -m "أول نسخة من المتجر"
git remote add origin ../shop-remote.git
git push -u origin main
cd ..
git clone shop-remote.git shop-clone
git -C shop-clone log --oneline
ls shop-clone
~~~

~~~text الناتج (git 2.56، Git Bash)
Initialized empty Git repository in ~/run/shop-remote.git/
Initialized empty Git repository in ~/run/shop/.git/
[main (root-commit) 6702905] أول نسخة من المتجر
 6 files changed, 60 insertions(+)
To ../shop-remote.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
Cloning into 'shop-clone'...
done.
6702905 أول نسخة من المتجر
assets  css  index.html  js  server.mjs
~~~

- **[[--bare]]:** ريبو من غير ملفات شغل، فيه التاريخ بس. ده بالظبط اللي GitHub عنده على السيرفر، فالتجربة دي بتعدّي على نفس الخطوات.
- **[[git -C shop-clone log]]:** [[-C]] بيشغّل الأمر كأنك جوه الفولدر ده من غير [[cd]].
- **الـ clone فيه [[server.mjs]] كمان:** مش مشكلة على GitHub Pages (مش هيتشغّل، هو ملف ساكن). لو مش عايزه يتنشر حطه في فولدر [[tools/]] أو في [[.gitignore]].

ولما شغّلت الـ clone بسيرفر، الصفحة طلعت بنفس الشكل بالظبط: يعني كل الملفات اللي محتاجاها اترفعت. **ده الاختبار الحقيقي قبل أي نشر:** لو ملف مش متضاف في git (نسيت [[git add]]) هيشتغل عندك ويقع عند الناس.

**على GitHub (من وثائق GitHub Pages):** New repository › [[shop]] › من غير README، وبعدين [[git remote add origin https://github.com/<اسمك>/shop.git]] و [[git push -u origin main]]، وبعدين Settings › Pages › Deploy from a branch › [[main]] و [[/ (root)]] › Save.` },
          ],
          ref: [
            { t: "MDN: How do you set up a local testing server?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server" },
            { t: "MDN: HTTP caching", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching" },
            { t: "MDN: Cache-Control", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control" },
            { t: "Python: http.server", url: "https://docs.python.org/3/library/http.server.html" },
            { t: "Node.js: http", url: "https://nodejs.org/api/http.html" },
            { t: "serve (GitHub)", url: "https://github.com/vercel/serve" },
            { t: "VS Code: Command line interface", url: "https://code.visualstudio.com/docs/configure/command-line" },
            { t: "GitHub Docs: Creating a GitHub Pages site", url: "https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site" },
            { t: "Chrome DevTools: Network features reference", url: "https://developer.chrome.com/docs/devtools/network/reference" },
          ],
          pre: [{ to: "css/mkdir و ni و touch", why: R`نفس أوامر الفولدرات والملفات، هنا لمشروع فيه تلات لغات` }, { to: "css/code . و Emmet !", why: R`فتح الفولدر في VS Code` }, { to: "js/link و script: تربط الملفات التلاتة", why: R`ليه الصفحة محتاجة سيرفر أصلًا` }],
          deep: {
            why: R`أغلب الوقت الضايع في أول مشروع مش في الكود: الصفحة مفتوحة بدبل كليك فالـ modules واقفة، أو الكاش بيعرض نسخة قديمة فبتصلّح حاجة اتصلحت، أو المشروع شغال عندك ومش شغال بعد النشر عشان ملف ماترفعش أو مسار بيبدأ بـ [[/]]. الدرس ده بيقفل الحاجات دي من الأول بأوامر ثابتة بتتكرر في كل مشروع.`,
            how: R`السيرفر المحلي برنامج بيفتح بورت ويستنى طلبات HTTP. لما المتصفح يطلب [[/js/app.js]]، السيرفر بيحوّل الرابط لمسار ملف جوه الفولدر، ويقراه، ويرد بيه ومعاه [[Content-Type]] حسب الامتداد. الصفحة بقى ليها origin حقيقي ([[http://localhost:8080]]) فالـ modules و [[fetch]] شغالين. المتصفح بيخزّن الردود حسب [[Cache-Control]] و [[ETag]]: Ctrl+R بيعيد طلب الصفحة نفسها بس وممكن ياخد الملفات التانية من الكاش، و Ctrl+Shift+R بيطلب كله. و GitHub Pages سيرفر static زي ده بالظبط، بيقرا الملفات من فرع في الريبو.`,
            when: R`[[npx serve]] لو Node عندك وعايز أسرع حاجة. [[python -m http.server]] لو Python موجود وانت على جهاز مش بتاعك. [[server.mjs]] لما تحب تشوف كل طلب أو تزوّد API تجريبي (درس الفورم). Live Server وانت بتشتغل على HTML و CSS وعايز refresh لوحده. GitHub Pages لأي حاجة هتفضل وتتعدّل، والسحب والإفلات لنسخة سريعة تبعتها.`,
            mistakes: R`تشغيل السيرفر من فولدر غلط (فوق المشروع) فكل حاجة 404. فتح بورت غير اللي السيرفر طبعه. تشغيل سيرفرين على نفس البورت (درس الأخطاء فيه [[EADDRINUSE]]). نسيان Disable cache وتصليح حاجة متصلحة. فتح [[localhost]] من الموبايل (ده الموبايل نفسه). [[git add]] لملف ونسيان التاني. مسارات بـ [[/]] في الأول على GitHub Pages. ريبو GitHub بـ README وبعدين [[push]] بيترفض لأن التاريخ مختلف.`,
          },
        },
        {
          cmd: "لما المشروع ميشتغلش: الأخطاء المشهورة",
          title: "الرسايل اللي هتقابلها في أول مشروع بنصها الحقيقي: معناها إيه، وبتدوّر عليها فين، وتصلّحها إزاي، وبأنهي ترتيب",
          desc: R`المشروع اللي فيه تلات لغات بيقع في الحدود بينهم، والرسايل بتتكرر: [[404]] لملف، و [[Failed to load module script … MIME type]]، و [[blocked by CORS policy]] من [[file://]]، و [[Cannot read properties of null (reading 'addEventListener')]]، و [[Cannot use import statement outside a module]]، و [[price is not defined]] بين ملفين، و [[… is not valid JSON]]، و [[EADDRINUSE]] لما البورت مشغول، وصفحة مش بتتحدث بسبب الكاش.
**ترتيب التدوير:** Console (فيه رسالة؟) ← Network (كل ملف وصل [[200]] وبالنوع الصح؟) ← Elements و Styles (العنصر موجود؟ القاعدة متطبقة ولا متشطّبة؟) ← Sources (breakpoint في السطر وشوف القيم).`,
          example: R`Get-NetTCPConnection -LocalPort 8895 -State Listen | Select-Object OwningProcess
Get-Process -Id 35852
Stop-Process -Id 35852
netstat -ano | grep ":8895 "
taskkill //PID 35852 //F`,
          try: R`خد مشروع [[shop]] من درس «link و script»، واكسره بإيدك مرة لكل غلطة في جدول الشرح (غيّر حرف في مسار، شيل [[type="module"]]، حط السكربت من غير [[defer]] في الـ head…). كل مرة قبل ما تفتح الصفحة اكتب الرسالة اللي متوقعها، وبعدين قارن باللي في Console.`,
          sol: R`لو كتبت الرسايل صح من غير ما تبص في الجدول، انت كده بتقرا الـ Console زي المحترف. والأهم من الرسالة **مكانها**: معظم الأخطاء دي مبتوقفش الصفحة، بتسيبها ناقصة. فأول عادة: Console مفتوح دايمًا وانت بتبني، وأي سطر أحمر يتقري قبل ما تكمّل.

~~~text اللي ظهر عندي لما كسرت كل واحدة لوحدها (Chrome 158)
مسار CSS غلط:          Failed to load resource: the server responded with a status of 404 (Not Found)
شيلت type="module":    Uncaught SyntaxError: Cannot use import statement outside a module
سكربت عادي في الـ head:  Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
~~~`,
          teach: R`## الفكرة

الدرسين اللي فاتوا وروك الأخطاء دي وهي بتحصل. هنا هي مجمّعة في مكان واحد، كل واحدة بالرسالة اللي Chrome 158 (أو Node 24) طلّعها فعلًا، وسببها، وتصليحها. كل مثال اتعمل بصفحة صغيرة على سيرفر [[server.mjs]] بتاع درس «تشغّل المشروع وتعرضه».

---

## ٠. الترتيب: من فين تبدأ

| الخطوة | فين | السؤال | لو لقيت |
|---|---|---|---|
| ١ | Console | فيه سطر أحمر؟ | اقرا الرسالة واسم الملف والسطر اللي جنبها ([[buy.js:1]]) ودوس عليه |
| ٢ | Network (Ctrl+R وهو مفتوح) | كل ملف [[200]]؟ والـ Type صح؟ | [[404]]: مسار. Type غلط: السيرفر أو fallback |
| ٣ | Elements و Styles | العنصر موجود؟ القاعدة ظاهرة؟ متشطّبة؟ | مش موجود: الـ HTML أو JS مرسمهوش. متشطّبة: قاعدة تانية كسبت (specificity) |
| ٤ | Sources | الكود وصل للسطر ده أصلًا؟ القيم إيه؟ | دوس على رقم السطر (breakpoint) وأعد التحميل، وبص على المتغيرات في Scope |

ودايمًا: **غلطة واحدة في المرة.** صلّح أول سطر أحمر وأعد التحميل، لأن الأخطاء اللي بعده ساعات بتكون نتيجته.

---

## ١. الـ CSS مش متطبق: [[404]]

~~~text Console (Chrome 158)
Failed to load resource: the server responded with a status of 404 (Not Found)      styles.css:1
~~~

- **المعنى:** المتصفح طلب الملف من مسار مفيهوش حاجة. الصفحة اشتغلت، بس من غير شكل.
- **فين:** Network › السطر الأحمر › Headers › Request URL: هتلاقي المسار الكامل اللي اتطلب ([[/about/css/styles.css]] مثلًا).
- **التصليح:** المسار نسبي لمكان ملف الـ HTML (درس «link و script»). وأسامي الملفات حساسة للحروف الكبيرة على السيرفرات.
- **حالة أخبث:** [[<link href>]] من غير [[rel="stylesheet"]]: مفيش طلب في Network ولا رسالة خالص.

---

## ٢. [[Failed to load module script … MIME type]]

~~~text Console (Chrome 158)
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.
~~~

- **المعنى:** السيرفر بعت الملف بنوع مش JavaScript، والـ modules ليها فحص صارم.
- **لو النوع [["text/html"]]:** غالبًا المسار غلط والسيرفر رجّع صفحة HTML بدل 404 (استضافات الـ SPA). التمرين التالت بيوريها.
- **لو [["text/plain"]] أو [["application/octet-stream"]]:** السيرفر مش عارف [[.js]]. صلّح الـ [[TYPES]] في سيرفرك، أو استخدم سيرفر تاني.
- **فين:** Network › الملف › Headers › Response Headers › [[Content-Type]].

---

## ٣. [[blocked by CORS policy]] من [[file://]]

~~~text Console (Chrome 158، المسار متقصّر)
Access to script at 'file:///C:/Users/ali/shop/js/app.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

- **المعنى:** الصفحة مفتوحة بدبل كليك، والـ module (أو [[fetch]]) محتاج origin حقيقي.
- **التصليح:** سيرفر محلي وافتح [[http://localhost:PORT]]. متشيلش [[type="module"]] عشان «يشتغل».

---

## ٤. [[Cannot read properties of null (reading 'addEventListener')]]

~~~js js/buy.js
document.querySelector("#buy").addEventListener("click", () => {
  alert("اتضاف");
});
~~~

~~~text Console (Chrome 158)
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at buy.js:1:31
~~~

- **المعنى:** [[querySelector]] رجّع [[null]] (ملقاش العنصر)، وبعدين الكود حاول ينادي [[.addEventListener]] على [[null]]. الرقم [[1:31]] سطر ١ حرف ٣١، يعني بالظبط عند [[.addEventListener]].
- **السبب ١: السكربت اشتغل قبل العنصر.** [[<script src="js/buy.js">]] عادي في الـ head بيشتغل أول ما يتقري، والـ [[<button>]] لسه مجاش. **التصليح:** [[type="module"]] أو [[defer]].
- **السبب ٢: الـ selector غلط.** جرّبت [[document.querySelector(".buy-btn")]] والزرار [[class="buy"]]: نفس الرسالة بالظبط عند [[sel.js:1:35]]، حتى والسكربت module. **التصليح:** اكتب الـ selector في Console الأول: [[document.querySelector(".buy-btn")]] بيرجّع [[null]] قدامك.
- **السبب ٣: العنصر في صفحة تانية.** نفس [[app.js]] متربط في صفحتين وواحدة مفيهاش الزرار. **التصليح:** [[const btn = document.querySelector("#buy"); if (btn) btn.addEventListener(…)]] أو [[?.]]: [[document.querySelector("#buy")?.addEventListener(…)]].
- **إزاي تفرّق بينهم:** في Console اكتب نفس الـ [[querySelector]] بعد ما الصفحة تخلص. لو رجّع العنصر، يبقى السبب ١ (التوقيت). لو [[null]]، يبقى ٢ أو ٣.

---

## ٥. [[Cannot use import statement outside a module]]

~~~text Console (Chrome 158)
Uncaught SyntaxError: Cannot use import statement outside a module
~~~

- **المعنى:** الملف فيه [[import]] واتحمّل بـ [[<script src>]] عادي.
- **التصليح:** [[<script type="module" src="js/app.js"></script>]].
- **في Node 24** ملف [[.js]] فيه [[import]] بيشتغل لوحده (Node بيكتشف إنه ESM). بس لو [[package.json]] فيه [["type": "commonjs"]] بتطلع نفس الرسالة: [[SyntaxError: Cannot use import statement outside a module]]، والتصليح [[.mjs]] أو [["type": "module"]]. (درس «CommonJS و ESM».)

---

## ٦. [[price is not defined]] بين ملفين

~~~js js/price.js
function price(n) {
  return n.toLocaleString("ar-EG") + " جنيه";
}
~~~

~~~js js/main.js
document.querySelector("#out").textContent = price(1250);
~~~

والصفحة فيها [[<script type="module" src="js/price.js">]] وبعده [[<script type="module" src="js/main.js">]]:

~~~text Console (Chrome 158)
Uncaught ReferenceError: price is not defined
    at main.js:1:10
~~~

- **المعنى:** كل module ليه scope خاص بيه. [[price]] موجودة جوه [[price.js]] بس، مش global، حتى لو الملفين في نفس الصفحة وبالترتيب الصح.
- **التصليح:** [[export function price…]] في [[price.js]]، و [[import { price } from "./price.js";]] في أول [[main.js]]، وسطر [[<script>]] واحد في الـ HTML لـ [[main.js]] بس.
- **ليه كان «شغال» زمان:** بالـ scripts العادية (من غير [[type="module"]]) كل function بتبقى global، فالكود ده كان هيشتغل. وده بالظبط اللي الـ modules جت تمنعه: ملف يكتب فوق متغيرات ملف تاني من غير ما حد ياخد باله.

---

## ٧. [[… is not valid JSON]]

~~~js js/load.js
const res = await fetch("data/product.json");
const products = await res.json();
~~~

~~~text Console (Chrome 158)
Failed to load resource: the server responded with a status of 404 (Not Found)      data/product.json
Uncaught SyntaxError: Unexpected token 'م', "مش موجود: "... is not valid JSON
~~~

- **المعنى:** الملف اسمه [[products.json]] والكود طلب [[product.json]]. السيرفر رجّع 404 ومعاه نص «مش موجود»، و [[fetch]] **مبيرميش error على 404**، فالكود كمّل و [[res.json()]] حاول يقرا النص كـ JSON.
- **الشكل المشهور:** [[Unexpected token '<', "<!doctype "... is not valid JSON]]، لما السيرفر يرجّع صفحة HTML (404 أو fallback). أول حرف [[<]] يعني «ده HTML مش JSON».
- **التصليح:** المسار، و **افحص [[res.ok]] قبل [[json()]]** (التمرين الأخير).

---

## ٨. الصفحة مش بتتحدث: الكاش

مفيش رسالة خالص: انت غيّرت الملف والمتصفح بيعرض القديم. **العلامة:** في Network عمود Size مكتوب [[(memory cache)]] أو [[(disk cache)]]. **التصليح:** Ctrl+Shift+R، أو Network › Disable cache طول ما بتبني (درس «تشغّل المشروع وتعرضه» قاسها). ولو السكربت هو اللي قديم، اتأكد كمان إنك حفظت الملف (VS Code بيحط نقطة على اسم الملف اللي متحفظش).

---

## ٩. [[EADDRINUSE]]: البورت مشغول

شغّلت [[server.mjs]] على بورت 8895 وهو شغال قبل كده في ترمنال تاني:

~~~text node server.mjs (Node 24.22)
node:events:505
    throw er; // Unhandled 'error' event
    ^

Error: listen EADDRINUSE: address already in use :::8895
    at Server.setupListenHandle [as _listen2] (node:net:2390:16)
    ...
  code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 8895
}
~~~

- **المعنى:** EADDRINUSE = Error ADDRess IN USE. برنامج تاني (غالبًا نسخة قديمة من نفس السيرفر في ترمنال نسيته) ماسك البورت.
- **الحل الأسهل:** بورت تاني ([[$env:PORT=8896; node server.mjs]] في PowerShell، أو [[PORT=8896 node server.mjs]] في bash)، أو ارجع للترمنال القديم واعمل Ctrl+C.
- **مين ماسكه؟ في PowerShell:**

~~~text PowerShell 7
> Get-NetTCPConnection -LocalPort 8895 -State Listen | Select-Object LocalAddress, LocalPort, State, OwningProcess

LocalAddress LocalPort  State OwningProcess
------------ ---------  ----- -------------
::                8895 Listen         38632

> Get-Process -Id 38632 | Select-Object Id, ProcessName, Path

   Id ProcessName Path
   -- ----------- ----
38632 node        C:\Program Files\nodejs\node.exe

> Stop-Process -Id 38632
~~~

- **في Git Bash (أو cmd):** [[netstat]] بيطلّع كل الاتصالات، و [[grep]] (في cmd: [[findstr]]) بيفلتر:

~~~text Git Bash
$ netstat -ano | grep ":8895 "
  TCP    0.0.0.0:8895           0.0.0.0:0              LISTENING       35852
  TCP    127.0.0.1:59617        127.0.0.1:8895         TIME_WAIT       0

$ taskkill //PID 35852 //F
SUCCESS: The process with PID 35852 has been terminated.
~~~

- **آخر رقم** في سطر [[LISTENING]] هو الـ PID. سطور [[TIME_WAIT]] اتصالات قديمة بتخلص لوحدها، سيبها.
- **[[//PID]] بشَرطتين في Git Bash:** Git Bash بيحوّل أي حاجة شكلها [[/PID]] لمسار ويندوز، فالشَرطة المزدوجة بتمنعه. في cmd و PowerShell: [[taskkill /PID 35852 /F]].
- **[[/F]]** = force. و **قبل ما توقف أي PID** بص على اسمه بـ [[Get-Process -Id]]: لو مش [[node]] أو [[python]] اللي انت شغّلته، ممكن يكون برنامج تاني بتاعك. متوقفش حاجة بالاسم ([[Stop-Process -Name node]]) لأن ده بيقفل كل برامج Node حتى VS Code ساعات.

---

## الخلاصة

| الرسالة | السبب الأشهر | التصليح |
|---|---|---|
| [[404 (Not Found)]] | مسار غلط أو حروف كبيرة | المسار نسبي للـ HTML |
| [[Failed to load module script … MIME type]] | السيرفر بعت نوع غلط، أو HTML بدل الملف | [[Content-Type]] أو المسار |
| [[blocked by CORS policy]] و [[origin 'null']] | [[file://]] | سيرفر محلي |
| [[Cannot read properties of null]] | سكربت قبل العنصر، أو selector غلط، أو صفحة تانية | [[type="module"]]، واختبر الـ selector في Console، و [[?.]] |
| [[Cannot use import statement outside a module]] | [[<script>]] من غير [[type="module"]] | زوّده |
| [[X is not defined]] بين ملفين | module من غير [[export]] و [[import]] | صدّر واستورد |
| [[… is not valid JSON]] | [[fetch]] جاب 404 أو HTML | المسار، و [[res.ok]] |
| مفيش رسالة والصفحة قديمة | الكاش أو الملف متحفظش | Ctrl+Shift+R و Disable cache |
| [[EADDRINUSE]] | سيرفر تاني على نفس البورت | Ctrl+C فيه، أو بورت تاني، أو [[Get-NetTCPConnection]] ثم [[Stop-Process -Id]] |

اللي ميتلخبطش: اقرا أول سطر أحمر بس، واسم الملف والسطر اللي جنبه، وبعدين Network. ومتوقفش process غير بالـ PID بعد ما تتأكد هو مين.`,
          lines: [
            R`مين ماسك البورت 8895؟ [[Get-NetTCPConnection]] بيرجّع الاتصالات، و [[-State Listen]] اللي مستنية طلبات بس، و [[OwningProcess]] رقم البرنامج (PID)`,
            R`قبل ما توقف حاجة: بيوريك اسم البرنامج صاحب الرقم ده ومكانه، عشان تتأكد إنه السيرفر بتاعك`,
            R`بيوقف البرنامج ده بالرقم بالظبط، فالبورت يفضى`,
            R`نفس السؤال في Git Bash: [[netstat -ano]] كل الاتصالات بأرقام الـ PID، و [[grep]] بيسيب سطور البورت ده بس`,
            R`بيوقف البرنامج بالرقم من Git Bash أو cmd. [[//]] بشَرطتين في Git Bash بس، و [[/F]] بيقفله حتى لو مش راضي`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وشخّص:** لكل رسالة قول السبب الأقرب، وأول مكان هتبص فيه، والتصليح: (أ) [[Uncaught SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON]]، (ب) [[Uncaught TypeError: Cannot read properties of null (reading 'classList')]] في صفحة [[about.html]] بس، والرئيسية سليمة، (ج) [[Uncaught ReferenceError: render is not defined]] والدالة موجودة في [[ui.js]]، (د) صفحة مش بتتغيّر بعد التعديل ومفيش ولا رسالة.`, done: R`لكل واحدة كتبت سبب وتصليح في سطر، وطابقوا الحل، أو عرفت ليه اختلفوا.`, sol: R`| | السبب | تبص فين | التصليح |
|---|---|---|---|
| أ | [[fetch]] جاب صفحة HTML (404 أو fallback) و [[res.json()]] قراها | Network › الطلب › Response | صلّح المسار، وافحص [[res.ok]] و [[Content-Type]] قبل [[json()]] |
| ب | [[app.js]] متربط في الصفحتين، و [[about.html]] مفيهاش العنصر اللي الـ selector بيدوّر عليه | Console: الرسالة واسم الملف والسطر، وبعدين [[document.querySelector(...)]] في Console صفحة about | [[?.]] أو [[if (el)]]، أو كل صفحة بـ module ليها |
| ج | [[ui.js]] module و [[render]] مش [[export]]، أو الملف اللي بيستخدمها معملهاش [[import]] | Sources › الملفين، وسطر الـ import | [[export function render]] و [[import { render } from "./ui.js"]] |
| د | الكاش، أو الملف متحفظش، أو بتعدّل نسخة في فولدر تاني غير اللي السيرفر شغال منه | Network › Size ([[(memory cache)]])، و VS Code (نقطة على اسم الملف)، والترمنال (السيرفر شغال من أنهي فولدر) | Ctrl+Shift+R و Disable cache، و Ctrl+S |

**(د) فيها فخ مشهور:** السيرفر شغال من فولدر [[shop]] القديم وانت فاتح [[shop-v2]] في VS Code. السيرفر بيبعت الملفات اللي جوه الفولدر اللي اتشغّل منه بس، فأي تعديل في الفولدر التاني مش هيبان مهما عملت. [[server.mjs]] بيطبع كل طلب، فلو مطبعش حاجة لما عملت Ctrl+R يبقى انت بتكلم سيرفر تاني.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<script src="js/buy.js"></script>]] في الـ head، و [[buy.js]] فيه [[document.querySelector("#buy").addEventListener("click", …)]]. صلّحه بـ ٣ طرق مختلفة، وقول ليه كل واحدة بتشتغل، وأنهي فيهم هتختار.`, done: R`التلات طرق شغالين ومفيش errors في Console، وكتبت ليه [[type="module"]] هو اللي هتختاره.`, sol: R`~~~html index.html (الطريقة ١: defer)
<script src="js/buy.js" defer></script>
~~~

~~~html index.html (الطريقة ٢: module)
<script type="module" src="js/buy.js"></script>
~~~

~~~html index.html (الطريقة ٣: السكربت في آخر الـ body)
<body>
  <button id="buy" type="button">اشتري</button>
  <script src="js/buy.js"></script>
</body>
~~~

~~~text Chrome 158، كل طريقة لوحدها
قبل التصليح:  Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')  buy.js:1:31
الطرق التلاتة: مفيش errors، والدوسة بتطلّع «اتضاف»
~~~

- **[[defer]]:** حمّل في الخلفية، وشغّل بعد ما الـ HTML كله يتقري. الزرار موجود.
- **[[type="module"]]:** نفس توقيت [[defer]] لوحده، وكمان [[import]] و scope خاص. **ده اللي هتختاره** لأي كود جديد.
- **آخر الـ body:** بيشتغل لأن الزرار اتقري قبله، بس التحميل مبيبدأش غير لما المتصفح يوصل لآخر الصفحة، فالـ JS بيتأخر في الصفحات الكبيرة.
- **اللي مش حل:** [[setTimeout(…, 100)]] (بيشتغل بالصدفة لو الصفحة سريعة)، و [[window.onload = …]] (بيستنى كل الصور كمان، و [[onload]] تاني في ملف تاني بيمسحه).` },
            { lvl: 'تطبيق', t: R`**ابني:** اعمل [[EADDRINUSE]] بإيدك: شغّل [[node server.mjs]] في ترمنال، وشغّله تاني في ترمنال تاني. وبعدين حرّر البورت مرة من PowerShell ومرة من Git Bash، من غير ما تقفل الترمنال الأول بإيدك.`, done: R`شفت [[Error: listen EADDRINUSE: address already in use :::8080]] بنفسك، ولقيت الـ PID بالطريقتين، واتأكدت من اسمه قبل ما توقفه، وبعدها [[node server.mjs]] اشتغل عادي.`, sol: R`~~~text الترمنال التاني (Node 24.22، البورت عندي كان 8895)
Error: listen EADDRINUSE: address already in use :::8895
  code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 8895
~~~

**PowerShell:**

~~~powershell
$id = (Get-NetTCPConnection -LocalPort 8895 -State Listen).OwningProcess
Get-Process -Id $id | Select-Object Id, ProcessName, Path
Stop-Process -Id $id
~~~

~~~text الناتج
   Id ProcessName Path
   -- ----------- ----
38632 node        C:\Program Files\nodejs\node.exe
~~~

**Git Bash:**

~~~bash
netstat -ano | grep ":8895 " | grep LISTENING
taskkill //PID 35852 //F
~~~

~~~text الناتج
  TCP    0.0.0.0:8895           0.0.0.0:0              LISTENING       35852
SUCCESS: The process with PID 35852 has been terminated.
~~~

- **[[(...).OwningProcess]]:** القوسين بيشغّلوا الأمر الأول، والنقطة بتاخد خاصية واحدة منه، فـ [[$id]] بقى رقم بس.
- **الترمنال الأول** اللي كان فيه السيرفر رجع للـ prompt لوحده، لأن البرنامج اللي جواه اتقفل.
- **Git Bash من غير [[//]]:** جرّبت [[taskkill /PID 999999 /F]] وطلع [[ERROR: Invalid argument/option - 'C:/Program Files/Git/PID'.]]: Git Bash حوّل [[/PID]] لمسار جوه فولدر Git. ده سلوكه مع أي أمر ويندوز ليه options بشَرطة.
- **[[grep LISTENING]]:** بيشيل سطور [[TIME_WAIT]]، فبيفضل سطر واحد والـ PID في آخره.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** استضافات كتير (و [[serve -s]]) بترجّع [[index.html]] لأي رابط مش موجود عشان تطبيقات الصفحة الواحدة (SPA). اعمل سيرفر بيعمل كده، وغلّط في اسم ملف الـ CSS واسم ملف الـ JS. إيه اللي يظهر في Console؟ وفي Network؟ ليه ده أصعب من 404؟`, done: R`لقيت إن الـ JS بيدي رسالة MIME فيها [["text/html"]]، والـ CSS بيرجع 200 ومبيتطبقش من غير ولا رسالة، وعرفت تثبت ده من Headers › Content-Type.`, sol: R`التعديل في [[server.mjs]]: في الـ [[catch]] بدل 404، رجّع [[index.html]]:

~~~js server.mjs (الـ catch بس)
} catch {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(await readFile(join(root, "index.html")));
}
~~~

والصفحة فيها [[href="css/style.css"]] (ناقص s) و [[src="js/ap.js"]] (ناقص p).

~~~text Chrome 158
Network:  style.css  200  stylesheet     ap.js  200  script
Console:  Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
الـ h1 = rgb(0, 0, 0)، والإجمالي «…»
~~~

- **الـ JS:** المتصفح استلم صفحة HTML مكان الـ module. ولأن الـ modules ليها فحص نوع صارم، رفضها برسالة واضحة فيها [["text/html"]]. أول ما تشوف [["text/html"]] في رسالة MIME، اعرف إن المسار غلط والسيرفر رجّع صفحة.
- **الـ CSS:** Status [[200]] (السيرفر «لقى» حاجة)، وتاب Console ساكت في Chrome 158، والستايل مش متطبق. الدليل الوحيد: Network › style.css › Headers › [[Content-Type: text/html]]، أو Preview بيوريك صفحة HTML مكان CSS.
- **ليه أصعب من 404:** الـ 404 لونها أحمر في Network وليها سطر في Console. الـ fallback بيخلي كل حاجة شكلها «نجحت».

القاعدة: لما حاجة متطبقتش، بص على **Type و Content-Type** في Network مش على الـ Status بس.` },
            { lvl: 'تحدي', t: R`**ابني:** اكتب [[getJSON(url)]] بترمي error **مفهوم** لو الرد مش [[ok]] أو مش JSON، واستخدمها في صفحة منتجات بتعرض «المنتجات مش متاحة دلوقتي» لليوزر والتفاصيل في Console، بدل [[Unexpected token]].`, done: R`بمسار غلط: الصفحة فيها رسالة مفهومة، و Console فيه [[مقدرتش أجيب data/product.json: 404 Not Found]]. بالمسار الصح: المنتجات ظاهرة.`, sol: R`~~~js js/load.js
async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("مقدرتش أجيب " + url + ": " + res.status + " " + res.statusText);
  const type = res.headers.get("Content-Type") || "";
  if (!type.includes("application/json")) throw new Error(url + " مش JSON، نوعه: " + type);
  return res.json();
}

const list = document.querySelector("#list");
try {
  const products = await getJSON("data/product.json");
  list.innerHTML = products.map((p) => "<li>" + p.name + "</li>").join("");
} catch (err) {
  list.innerHTML = "<li>المنتجات مش متاحة دلوقتي</li>";
  console.error(err.message);
}
~~~

~~~text Chrome 158 (server.mjs)
بالمسار الغلط data/product.json:
  Console: مقدرتش أجيب data/product.json: 404 Not Found
  الصفحة: «المنتجات مش متاحة دلوقتي»
بالمسار الصح data/products.json:
  الصفحة: «كوباية»، ومفيش errors
~~~

- **[[res.ok]]** بيبقى [[true]] لو الـ status من 200 لـ 299 بس. [[fetch]] نفسه مبيرميش error على 404 و 500، بيرمي بس لو الشبكة وقعت. فلازم تفحص بنفسك.
- **[[Content-Type]]:** حماية من الـ fallback اللي بيرجّع HTML بـ 200. من غيرها [[res.ok]] هيعدّي و [[json()]] يقع بـ [[Unexpected token '<']].
- **[[await]] في أول الملف** (top-level await) شغال لأن الملف [[type="module"]].
- **اليوزر شاف جملة، والمبرمج شاف التفاصيل:** الرسالة التقنية ملهاش لازمة لليوزر، والجملة العامة ملهاش لازمة ليك.
- **[[innerHTML]] مع [[p.name]]:** هنا البيانات من ملفك. لو من مستخدمين، استخدم [[textContent]] (درس «innerHTML هي الباب»).` },
          ],
          ref: [
            { t: "MDN: What went wrong? Troubleshooting JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong" },
            { t: "MDN: TypeError: Cannot read properties of null", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_type" },
            { t: "MDN: ReferenceError: x is not defined", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined" },
            { t: "MDN: SyntaxError: JSON.parse: bad parsing", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/JSON_bad_parse" },
            { t: "MDN: SyntaxError: import declarations may only appear at top level of a module", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/import_decl_module_top_level" },
            { t: "MDN: Response.ok", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok" },
            { t: "Chrome DevTools: Console overview", url: "https://developer.chrome.com/docs/devtools/console" },
            { t: "Microsoft Learn: Get-NetTCPConnection", url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection?view=windowsserver2025-ps" },
            { t: "Microsoft Learn: taskkill", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill" },
          ],
          pre: [{ to: "js/اقرا رسالة الخطأ في JavaScript", why: R`إزاي تقرا الرسالة والـ stack trace، والدرس ده بيطبّقه على أخطاء الربط` }, { to: "js/تشغّل المشروع وتعرضه: سيرفر محلي ونشر", why: R`السيرفر والكاش والبورت اللي الأخطاء هنا جاية منهم` }],
          deep: {
            why: R`الأخطاء دي مش صعبة، بس ليها شكل محيّر: الصفحة شغالة نص شغل، والرسالة إنجليزي طويلة، وأحيانًا مفيش رسالة خالص. اللي بيعرف الرسايل دي بالشكل يصلّحها في دقيقة، واللي ميعرفهاش بيعيد كتابة الكود من الأول. وترتيب ثابت للتدوير (Console ثم Network ثم Elements ثم Sources) بيمنعك تلف في دواير.`,
            how: R`كل خطأ من دول بيحصل في مرحلة مختلفة من تحميل الصفحة: الـ 404 والـ MIME والـ CORS وقت ما المتصفح بيطلب الملفات (Network)، و [[SyntaxError]] وقت ما بيقرا الملف قبل ما يشغّله (الملف كله مبيشتغلش)، و [[TypeError]] و [[ReferenceError]] وقت التشغيل عند سطر معيّن (اللي قبله اشتغل واللي بعده لأ)، و [[EADDRINUSE]] في Node قبل ما الصفحة تتطلب أصلًا. عشان كده الرسالة نفسها بتقولك المرحلة: لو فيها اسم ملف ورقم سطر وحرف، يبقى الكود اتقري ووقع هناك.`,
            when: R`افتح Console و Network قبل أول Ctrl+R في أي مشروع، وسيبهم مفتوحين. لما حاجة متشتغلش: اقرا أول سطر أحمر، ودوس على اسم الملف جنبه. ولو مفيش سطر أحمر: Network (حاجة متطلبتش أو جت من الكاش)، وبعدين Elements (العنصر موجود والقاعدة متطبقة؟)، وبعدين breakpoint في Sources.`,
            mistakes: R`تصليح كذا حاجة مرة واحدة فمتعرفش أنهي اللي صلّحت. تجاهل أول رسالة والتركيز على آخر واحدة. شيل [[type="module"]] عشان CORS يختفي. [[setTimeout]] بدل [[defer]]. [[Stop-Process -Name node]] أو [[taskkill /IM node.exe]] بيقفل كل برامج Node. [[taskkill /PID]] بشَرطة واحدة في Git Bash. [[res.json()]] من غير [[res.ok]]. تصليح الكود وهو أصلًا الكاش.`,
          },
        },
        {
          cmd: "الجسر: classes و data و aria و CSS variables",
          title: "العقد بين JS و CSS: الـ JS بيكتب الحالة في attribute أو class أو متغير، والـ CSS بيرسمها",
          desc: R`الـ JS والـ CSS مبيكلموش بعض مباشرة. بيتقابلوا على العنصر نفسه: JS **بيكتب الحالة** فيه، و CSS **بيقرا الحالة** بـ selector ويرسمها. فيه ٤ أدوات للكتابة دي:
• **class:** [[el.classList.toggle("is-open", open)]] والـ CSS [[.menu.is-open]]. لحالة شكل بسيطة.
• **[[data-*]]:** [[el.dataset.state = "loading"]] والـ CSS [[[data-state="loading"]]]. لحالة ليها أكتر من قيمتين.
• **[[aria-*]]:** [[btn.setAttribute("aria-expanded", "true")]] والـ CSS [[[aria-expanded="true"]]]. لما الحالة ليها معنى لقارئ الشاشة، فبتكتبها مرة واحدة وتخدم الاتنين.
• **CSS variable:** [[el.style.setProperty("--progress", 0.6)]] والـ CSS [[width: calc(var(--progress) * 100%)]]. لما JS عنده **رقم** مش حالة.
والقاعدة: JS ميكتبش [[el.style.color]] ولا [[el.style.display]]. الشكل كله في CSS.`,
          example: R`<div class="upload" data-state="idle" style="--progress: 0">
  <div class="bar"></div>
  <button class="js-start" type="button">ارفع الملف</button>
</div>
<style>
  .bar { height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; }
  .bar::after { content: ""; display: block; height: 100%; width: calc(var(--progress) * 100%); background: #2563eb; }
  .upload[data-state="done"] .bar::after { background: #16a34a; }
</style>
<script>
  const box = document.querySelector(".upload");
  document.querySelector(".js-start").addEventListener("click", () => {
    box.dataset.state = "loading";
    let p = 0;
    const timer = setInterval(() => {
      p += 0.25;
      box.style.setProperty("--progress", p);
      if (p >= 1) { clearInterval(timer); box.dataset.state = "done"; }
    }, 200);
  });
</script>`,
          try: R`شغّل المثال ودوس الزرار، وبص في Elements على [[data-state]] و [[style="--progress: …"]] وهما بيتغيّروا. وبعدين من Console اكتب [[document.querySelector(".upload").style.setProperty("--progress", 0.5)]]: الشريط وصل لنصه من غير ما تلمس الـ CSS؟ وجرّب [[document.querySelector(".upload").dataset.state = "done"]].`,
          sol: R`~~~text Elements أثناء الرفع وبعده (Chrome 158)
<div class="upload" data-state="loading" style="--progress: 0.5;">
<div class="upload" data-state="done" style="--progress: 1;">
~~~

- [[setProperty("--progress", 0.5)]] من الـ Console حرّك الشريط للنص على طول: الـ CSS بيقرا المتغير في [[calc(var(--progress) * 100%)]]، ومش فارق معاه مين كتبه.
- [[dataset.state = "done"]] قلب لون الشريط أخضر حتى لو [[--progress]] نص: لأن قاعدة اللون مربوطة بالحالة [[done]] مش بالرقم.

ده العقد: JS عنده حاجتين يكتبهم (الحالة والرقم)، و CSS عنده القواعد اللي بتترجمهم لشكل.`,
          teach: R`## الفكرة

درس «مين بيعمل إيه» قال إن JS بيغيّر الحالة و CSS بيرسمها. الدرس ده بيقول **إزاي** بالظبط: فين JS يكتب، وبأنهي شكل، وإزاي CSS يقرا. ولو اتفقت على ده من الأول، تقدر تغيّر التصميم كله من غير ما تلمس سطر JS، والعكس. كل النواتج من Chrome 158.

---

## ١. المثال: شريط رفع

~~~live 120 دوس «ارفع الملف»
<div class="upload" data-state="idle" style="--progress: 0">
  <div class="bar"></div>
  <button class="js-start" type="button">ارفع الملف</button>
</div>
<style>
  .bar { height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; }
  .bar::after { content: ""; display: block; height: 100%; width: calc(var(--progress) * 100%); background: #2563eb; }
  .upload[data-state="done"] .bar::after { background: #16a34a; }
</style>
<script>
  const box = document.querySelector(".upload");
  document.querySelector(".js-start").addEventListener("click", () => {
    box.dataset.state = "loading";
    let p = 0;
    const timer = setInterval(() => {
      p += 0.25;
      box.style.setProperty("--progress", p);
      if (p >= 1) { clearInterval(timer); box.dataset.state = "done"; }
    }, 200);
  });
</script>
~~~

الـ JS هنا بيكتب حاجتين بس: [[data-state]] (حالة بكلمة: [[idle]] ثم [[loading]] ثم [[done]]) و [[--progress]] (رقم من ٠ لـ ١). مفيش ولا لون ولا عرض في الـ JS. والـ CSS عنده قاعدتين: العرض من الرقم، واللون الأخضر من الحالة.

---

## ٢. الأداة الأولى: class

~~~js
menu.classList.toggle("is-open", open);   // open = true بيحط الـ class، و false بيشيله
~~~

~~~css
.menu { display: none; }
.menu.is-open { display: block; }
~~~

- **[[classList.toggle(name, force)]]:** من غير التاني بيقلب. ومع التاني ([[true]] أو [[false]]) بيحط أو بيشيل حسبه. الشكل التاني أأمن، لأن الحالة جاية من متغير عندك مش من «اللي كان موجود».
- **اسم الـ class:** متعارف إن الحالة تبدأ بـ [[is-]] أو [[has-]] ([[is-open]] و [[is-active]] و [[has-error]]). لما تشوفها في الـ CSS تعرف إن JS هو اللي بيحطها.
- **إمتى:** حالة شكل ليها قيمتين بس، ومش ليها معنى لقارئ الشاشة.

---

## ٣. الأداة التانية: [[data-*]] و [[dataset]]

~~~text Console (Chrome 158)، على <div id="u" data-user-id="7">
> u.dataset.userId
'7'
> u.dataset.count = 3
> typeof u.dataset.count
'string'
> u.outerHTML
'<div id="u" data-user-id="7" data-count="3"></div>'
> delete u.dataset.count
> u.dataset.isAdmin = false
> u.outerHTML
'<div id="u" data-user-id="7" data-is-admin="false"></div>'
~~~

- **الاسم بيتحوّل:** [[data-user-id]] في HTML = [[dataset.userId]] في JS. الشرطة والحرف اللي بعدها بيبقى حرف كبير (camelCase)، و [[data-]] بيتشال.
- **كله نص:** [[dataset.count = 3]] بيتخزن [["3"]]. ولو حطيت [[false]] بيتكتب [["false"]] (نص مش فاضي، يعني truthy!). محتاج رقم؟ [[Number(el.dataset.count)]].
- **[[delete el.dataset.x]]** بيشيل الـ attribute.
- **في CSS:** [[[data-state="loading"]]] بيقرا القيمة بالظبط. وكمان [[attr()]] بيعرض القيمة كنص في [[content]].
- **إمتى:** حالة ليها أكتر من قيمتين ([[idle]] و [[loading]] و [[done]] و [[error]]) بدل ٤ classes لازم تشيل التلاتة التانيين كل مرة.

---

## ٤. الأداة التالتة: [[aria-*]]: حالة ليها معنى

بعض الحالات مش شكل بس: «القايمة دي مفتوحة» أو «الزرار ده متداس» أو «ده اللينك بتاع الصفحة اللي انت فيها». قارئ الشاشة محتاج يعرفها كمان. فبدل ما تكتب class للشكل و [[aria]] لقارئ الشاشة، اكتب الـ [[aria]] بس وخلّي الـ CSS يقراها:

| الحالة | الـ attribute | الـ CSS |
|---|---|---|
| زرار بيفتح ويقفل حاجة | [[aria-expanded="true"]] | [[button[aria-expanded="true"] .arrow { rotate: 180deg; }]] |
| زرار toggle (مفضلة، كتم صوت) | [[aria-pressed="true"]] | [[.fav[aria-pressed="true"] { background: gold; }]] |
| اللينك بتاع الصفحة الحالية | [[aria-current="page"]] | [[nav a[aria-current="page"] { font-weight: 700; }]] |
| حقل فيه غلط | [[aria-invalid="true"]] | [[input[aria-invalid="true"] { border-color: red; }]] |
| حاجة بتتحمّل | [[aria-busy="true"]] | [[.list[aria-busy="true"] { opacity: .5; }]] |

والفايدة متقاسة: الحالة في مكان واحد، فمستحيل الشكل يقول «مفتوح» وقارئ الشاشة يقول «مقفول». في DevTools › Elements › Accessibility، الزرار اللي [[aria-expanded="true"]] بيبان كده:

~~~text شجرة الـ accessibility (Chrome 158، Accessibility.getFullAXTree من CDP، ودي نفس اللي في الـ pane)
button "التوصيل بياخد قد إيه؟"  focusable=true  expanded=true  controls="x"
~~~

> قاعدة: [[aria]] بتتحط على العنصر الصح بس ([[aria-expanded]] على الزرار اللي بيفتح، مش على اللوحة نفسها). لو مش متأكد إن العنصر ده بيتقري بالحالة دي، استخدم class أو [[data-*]].

---

## ٥. الأداة الرابعة: CSS variables من JS

لما JS عنده **رقم** (نسبة التحميل، مكان الماوس، عدد العناصر)، مينفعش class لكل رقم. ابعت الرقم في متغير:

~~~js
box.style.setProperty("--progress", 0.6);               // يكتب style="--progress: 0.6"
getComputedStyle(box).getPropertyValue("--progress");   // يقرا: "0.6"
box.style.removeProperty("--progress");                 // يشيله
~~~

~~~css
.bar::after { width: calc(var(--progress) * 100%); }
~~~

- **ليه [[setProperty]] مش [[box.style["--progress"]]]:** الـ properties اللي بتبدأ بـ [[--]] مش موجودة كأسامي على [[style]]. جرّبت [[box.style["--x"] = 1]]: مكتبش حاجة في الـ style.
- **ابعت رقم من غير وحدة**، والـ CSS هو اللي يقرر الوحدة: [[calc(var(--progress) * 100%)]] للعرض، أو [[calc(var(--progress) * 360deg)]] لدايرة. لو بعت [["60%"]] الـ CSS مقدرش يستخدمه في حاجة تانية.
- **القيمة بتتورّث:** المتغير على [[.upload]]، والـ [[.bar::after]] اللي جواه شافه. فممكن تكتبه مرة على الأب وكل الأولاد يستخدموه.
- **ده مش [[el.style.width]]:** انت مش بتكتب شكل، بتبعت معلومة. الـ CSS لسه بيقرر هي هتبقى عرض ولا لون ولا دوران، وتقدر تغيّر ده من غير JS.

---

## ٦. ليه مش [[el.style.color = "green"]]؟

جرّبت زرارين بنفس الـ CSS: الأول JS لوّنه بـ [[el.style.background]]، والتاني JS حط عليه class [[is-done]] والـ CSS لوّنه. وبعدين وقفت بالماوس عليهم:

~~~live 150 مرّر الماوس على الزرارين
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 8px 16px; border: 0; border-radius: 8px; color: #fff; background: #2563eb; cursor: pointer; margin-inline-end: 8px; }
  button:hover { background: #1e3a8a; }
  button.is-done { background: #16a34a; }
  button.is-done:hover { background: #14532d; }
</style>
<button id="a" type="button">لوّنه JS بـ style</button>
<button id="b" type="button">JS حط class</button>
<script>
  document.querySelector("#a").style.background = "#16a34a";
  document.querySelector("#b").classList.add("is-done");
</script>
~~~

~~~text getComputedStyle(…).backgroundColor (Chrome 158)
                 عادي                 والماوس فوقه
style من JS:     rgb(22, 163, 74)     rgb(22, 163, 74)    ← الـ hover مات
class من JS:     rgb(22, 163, 74)     rgb(20, 83, 45)     ← الـ hover شغال
~~~

[[el.style]] بيكتب [[style=""]] على العنصر، وده أقوى من أي selector في الـ CSS (specificity أعلى من الـ id). فأي قاعدة بعد كده ([[:hover]] و [[@media (prefers-color-scheme: dark)]] و [[:focus-visible]]) مبتقدرش عليه غير بـ [[!important]].

| | [[el.style.background = …]] | class أو attribute |
|---|---|---|
| الـ hover والـ focus | بيموتوا | شغالين |
| الوضع الليلي و [[@media]] | مبيقدروش يغيّروه | بيغيّروه |
| المصمم عايز يغيّر اللون | يدوّر في الـ JS | يغيّر سطر CSS |
| الحالة تتقري من DevTools | لون، مش «خلص» | [[is-done]] أو [[data-state="done"]] |
| transition | شغالة | شغالة |

**الاستثنا الوحيد:** المتغيرات ([[--progress]]) وقيم بتتحسب كل frame (مكان عنصر بتسحبه). دي معلومة مش شكل، فالـ [[style]] مكانها.

---

## ٧. الأسامي: hooks لـ JS و classes للشكل

لو JS بيمسك الزرار بـ [[.btn-primary]]، والمصمم غيّره لـ [[.btn-accent]]، الـ JS وقع ([[querySelector]] رجّع [[null]]) من غير ما حد يلمس ملف JS. الحل إن كل واحد ليه أسامي:

| لمين | الشكل | مثال | قاعدة |
|---|---|---|---|
| الشكل (CSS) | class عادي | [[.btn]] و [[.btn-primary]] | JS ميقراهوش |
| hook لـ JS | [[js-]] أو [[data-]] | [[.js-start]] و [[[data-action="add"]]] | CSS ميرسمهوش |
| حالة (الاتنين) | [[is-]] و [[data-state]] و [[aria-*]] | [[.is-open]] و [[[aria-expanded]]] | JS بيكتبها و CSS بيقراها |

~~~html
<button class="btn btn-primary js-add" data-id="mug" type="button">أضف</button>
~~~

المصمم يقدر يشيل [[btn-primary]] براحته، و JS ماسك [[js-add]]. ولما تقرا HTML حد تاني كاتبه تعرف على طول مين بيستخدم إيه.

---

## الخلاصة

| JS عنده | يكتبه فين | الـ CSS بيقراه إزاي |
|---|---|---|
| حالة بقيمتين | [[classList.toggle("is-x", bool)]] | [[.is-x]] |
| حالة بأكتر من قيمتين | [[el.dataset.state = "loading"]] | [[[data-state="loading"]]] |
| حالة ليها معنى (مفتوح، متداس، حالي، غلط) | [[setAttribute("aria-expanded", bool)]] | [[[aria-expanded="true"]]] |
| رقم | [[style.setProperty("--x", n)]] | [[var(--x)]] جوه [[calc()]] |

اللي ميتلخبطش: JS بيكتب **حالة أو رقم**، مش لون ولا مسافة. و [[dataset]] كله نص. و [[aria]] بتخدم الشكل وقارئ الشاشة في سطر واحد.`,
          lines: [
            R`الصندوق اللي فيه الحالة: [[data-state="idle"]] (لسه مبدأش) و [[--progress: 0]] (الرقم اللي الـ CSS هيرسم بيه)`,
            R`الشريط نفسه فاضي، والـ [[::after]] بتاعه هو الجزء الملوّن`,
            R`الزرار بـ class [[js-start]]: اسم معمول لـ JS بس، والـ CSS مش بيستخدمه`,
            R`قفلة الصندوق: الشريط والزرار جوه نفس العنصر اللي شايل الحالة`,
            R`أول الـ CSS، في الملف ده عشان المثال صغير`,
            R`الشريط الرمادي: ارتفاعه وحوافه، و [[overflow: hidden]] عشان الجزء الملوّن ميطلعش برّه الحواف`,
            R`الجزء الملوّن: عرضه [[--progress]] مضروب في ١٠٠٪. ده المكان الوحيد اللي الرقم بيتحوّل فيه لشكل`,
            R`لما الحالة [[done]] اللون يبقى أخضر. القاعدة دي بتقرا [[data-state]] اللي JS كتبه`,
            R`نهاية الـ CSS: قاعدتين بس بيترجموا الرقم والحالة لشكل`,
            R`بداية الـ JS، في آخر المثال عشان العناصر تكون اتعملت قبله`,
            R`بيمسك الصندوق اللي فيه الحالة عشان يكتب فيه`,
            R`بيمسك الزرار بالـ hook بتاعه [[.js-start]] ويسمع للدوسة`,
            R`أول ما يدوس: الحالة [[loading]]. في الـ HTML بقت [[data-state="loading"]]`,
            R`عدّاد التقدم بيبدأ من صفر`,
            R`[[setInterval]] بيشغّل الدالة كل ٢٠٠ms، وبيرجّع رقم نوقّفه بيه بعدين`,
            R`كل مرة يزوّد الربع، فبعد ٤ مرات يوصل ١`,
            R`بيكتب الرقم في المتغير: [[style="--progress: 0.25"]] ثم [[0.5]]… والـ CSS بيعيد حساب العرض لوحده`,
            R`لما يوصل ١ يوقف العدّاد ويكتب الحالة [[done]]، فالـ CSS يلوّنه أخضر`,
            R`قفلة الدالة اللي بتتكرر ورقم الـ ٢٠٠ms`,
            R`قفلة الـ listener`,
            R`نهاية الـ JS: مفيش ولا سطر فيه لون أو عرض، كله حالة ورقم`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[<p id="p" data-user-id="7"></p>]] شغّلت: [[p.dataset.count = 1; p.dataset.count++; p.dataset.userId += 1; p.dataset.isNew = false; console.log(p.outerHTML, typeof p.dataset.count, Boolean(p.dataset.isNew));]]. إيه اللي هيتطبع؟`, done: R`كتبت توقعك للتلات قيم، وشغّلت في Console، وعرفت ليه [[userId]] بقى [["71"]] و [[isNew]] طلع [[true]].`, sol: R`~~~text Console (Chrome 158)
<p id="p" data-user-id="71" data-count="2" data-is-new="false"></p> string true
~~~

- **[[data-count="2"]]:** [[++]] بيحوّل [["1"]] لرقم ويزوّد ويرجّع يكتب [["2"]]. اشتغل صح بالصدفة، لأن [[++]] عملية أرقام بس.
- **[[data-user-id="71"]] مش [[8]]:** [[+= 1]] على نص هو **لزق** نصوص: [["7" + 1 = "71"]]. ده الباج الحقيقي اللي بيحصل في عدّادات السلة. التصليح: [[p.dataset.userId = Number(p.dataset.userId) + 1]].
- **[[Boolean(p.dataset.isNew)]] = [[true]]:** القيمة [["false"]] نص مش فاضي، والنص المش فاضي truthy. عشان تقرا boolean: [[p.dataset.isNew === "true"]]. أو متكتبش [["false"]] خالص: [[delete p.dataset.isNew]] وافحص بـ [["isNew" in p.dataset]].
- **[[isNew]] بقى [[data-is-new]]:** كل حرف كبير اتحوّل لشرطة وحرف صغير.` },
            { lvl: 'تطبيق', t: R`**ابني:** مؤشر قوة الباسورد: [[<input type="password">]] وتحته شريط. JS يحسب درجة من ٠ لـ ٤ (طول ٨ أو أكتر، وفيه رقم، وفيه حرف كبير، وفيه رمز) ويكتبها في [[data-strength]] و [[--strength]] بس. الـ CSS يرسم العرض من الرقم، واللون والكلمة («ضعيف» و «متوسط» و «قوي») من الحالة.`, done: R`ولا لون ولا كلمة في الـ JS، والشريط بيتحرك وانت بتكتب، والكلمة جاية من [[content]] في CSS أو من [[<output>]] بيكتبه JS، و [[123]] بيدي ١ و [[Abc12345!]] بيدي ٤.`, sol: R`~~~live 190 اكتب باسورد وشوف الشريط
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 360px; }
  input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 10px; }
  .meter { --strength: 0; height: 8px; margin-top: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
  .meter::after { content: ""; display: block; height: 100%; width: calc(var(--strength) / 4 * 100%); background: var(--c, #dc2626); transition: width .2s; }
  .meter[data-strength="2"] { --c: #d97706; }
  .meter[data-strength="3"], .meter[data-strength="4"] { --c: #16a34a; }
  .label::after { content: "ضعيف"; color: #dc2626; }
  .meter[data-strength="2"] + .label::after { content: "متوسط"; color: #b45309; }
  .meter[data-strength="3"] + .label::after, .meter[data-strength="4"] + .label::after { content: "قوي"; color: #15803d; }
</style>
<label for="pw">الباسورد</label>
<input id="pw" type="password" autocomplete="new-password" aria-describedby="pw-hint">
<div class="meter" data-strength="0" aria-hidden="true"></div>
<p class="label" id="pw-hint">القوة: </p>
<script>
  const pw = document.querySelector("#pw");
  const meter = document.querySelector(".meter");
  function score(s) {
    return [s.length >= 8, /\d/.test(s), /[A-Z]/.test(s), /[^A-Za-z0-9]/.test(s)].filter(Boolean).length;
  }
  pw.addEventListener("input", () => {
    const n = score(pw.value);
    meter.dataset.strength = n;
    meter.style.setProperty("--strength", n);
  });
</script>
~~~

- **JS بيكتب رقم واحد في مكانين:** [[data-strength]] للحالة (CSS بيختار اللون والكلمة) و [[--strength]] للعرض ([[calc(var(--strength) / 4 * 100%)]]).
- **[[--c]] متغير داخلي في الـ CSS:** كل حالة بتغيّر [[--c]] بس، والـ [[::after]] بيستخدمه. بدل ما نكرر [[background]] في كل قاعدة.
- **الكلمة في [[content]]:** شكل مش بيانات، فتنفع في CSS. بس قارئ الشاشة بيقرا [[content]] أحيانًا ومش مضمون، فلو الكلمة مهمة ليه اكتبها JS في [[<output>]] بدلها. والشريط نفسه [[aria-hidden="true"]] لأنه رسم بس.
- **[[score]]:** array من ٤ شروط، [[filter(Boolean)]] بيسيب اللي [[true]]، والطول هو الدرجة.

~~~text اتقاس (Chrome 158، الكتابة بـ page.fill)
"123"        → data-strength="1"  عرض الشريط 90px من 360 (25%)   «ضعيف»
"abcdefgh1"  → data-strength="2"  180px (50%)  «متوسط»
"Abc12345!"  → data-strength="4"  360px (100%) «قوي»
(القياس بعد 600ms، عشان الـ transition بتاع 200ms يخلص. لو قست على طول هتلاقي العرض لسه بيتحرك)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المصمم غيّر class الزرار من [[btn-blue]] لـ [[btn-brand]] فالسلة وقفت. الكود: [[<button class="btn-blue">أضف</button><span class="badge">0</span>]] و [[document.querySelector(".btn-blue").onclick = () => { const b = document.querySelector(".badge"); b.textContent = +b.textContent + 1; b.style.background = "red"; b.style.display = "inline-block"; }]]. صلّحه بحيث المصمم يغيّر أي class شكل من غير ما JS يقع، والـ badge يستخبى وهو صفر.`, done: R`JS بيمسك hooks بس ([[js-]] أو [[data-]])، ومفيش [[style.]] في الـ JS، والـ badge مخفي وهو صفر ولونه من الـ CSS، وغيّرت [[btn-brand]] لأي اسم والزرار لسه شغال.`, sol: R`~~~live 130 دوس «أضف» كذا مرة
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .btn-brand { font: inherit; padding: 6px 14px; border: 0; border-radius: 8px; background: #7c3aed; color: #fff; cursor: pointer; }
  .badge { display: inline-block; min-width: 1.5em; padding: 0 6px; border-radius: 999px; background: #dc2626; color: #fff; text-align: center; }
  .badge[data-count="0"] { display: none; }
</style>
<button class="btn-brand js-add" type="button">أضف</button>
<span class="badge js-count" data-count="0" aria-live="polite">0</span>
<script>
  const badge = document.querySelector(".js-count");
  document.querySelector(".js-add").addEventListener("click", () => {
    const n = Number(badge.dataset.count) + 1;
    badge.dataset.count = n;
    badge.textContent = n;
  });
</script>
~~~

| قبل | المشكلة | بعد |
|---|---|---|
| [[querySelector(".btn-blue")]] | JS مربوط باسم شكل، فأول تغيير في التصميم كسره | [[.js-add]]: اسم لـ JS بس |
| [[+b.textContent + 1]] | الرقم بيتقري من النص المعروض (لو اتكتب «٣» بالعربي يبقى [[NaN]]) | الرقم في [[data-count]] و [[Number()]] |
| [[b.style.background = "red"]] | اللون في JS | في [[.badge]] |
| [[b.style.display = "inline-block"]] | الإخفاء والإظهار في JS، وأول ما الصفحة تفتح بيبان «0» | [[.badge[data-count="0"] { display: none; }]] |
| [[.onclick =]] | أي سكربت تاني يكتب [[onclick]] يمسح ده | [[addEventListener]] |

~~~text اتقاس (Chrome 158)
أول ما الصفحة فتحت: الـ badge display = none
بعد ٣ دوسات: data-count="3"، النص «3»، display = inline-block، اللون rgb(220, 38, 38)
غيّرت btn-brand لـ btn-anything في Elements: الدوسة لسه بتزوّد
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس كارت المنتج مرتين: مرة JS بيحدد الحالة «نفد» بـ [[el.style.opacity = .5]] و [[el.style.filter = "grayscale(1)"]]، ومرة بـ [[data-stock="out"]] والـ CSS بيرسمها. زوّد قاعدة [[@media (prefers-color-scheme: dark)]] وقاعدة [[:hover]] لكل واحد. قيس بـ [[getComputedStyle]] في الوضعين (Rendering › Emulate prefers-color-scheme) ومع الماوس.`, done: R`جدول فيه قيم [[opacity]] و [[filter]] للكارتين في ٣ حالات (عادي، dark، hover)، وجملة بتقول أنهي حالة اتكسرت ليه.`, sol: R`~~~live 210 الكارتين: مرّر الماوس على الاتنين
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; display: flex; gap: 12px; flex-wrap: wrap; }
  .card { width: 150px; padding: 12px; border-radius: 10px; background: #fff; border: 1px solid #ddd; }
  .card[data-stock="out"] { opacity: .5; filter: grayscale(1); }
  .card[data-stock="out"]:hover { opacity: .8; }
  .card:hover { box-shadow: 0 4px 12px #0003; }
  @media (prefers-color-scheme: dark) {
    body { background: #111; color: #eee; }
    .card { background: #222; border-color: #444; }
    .card[data-stock="out"] { opacity: .7; }
  }
</style>
<div class="card" id="a"><b>كوباية</b><p>style من JS</p></div>
<div class="card" id="b"><b>كوباية</b><p>data-stock من JS</p></div>
<script>
  const a = document.querySelector("#a");
  a.style.opacity = 0.5;
  a.style.filter = "grayscale(1)";
  document.querySelector("#b").dataset.stock = "out";
</script>
~~~

~~~text getComputedStyle(card).opacity (Chrome 158، Playwright emulateMedia و hover)
                 فاتح عادي   فاتح + hover   غامق عادي
style من JS:     0.5         0.5            0.5
data-stock:      0.5         0.8            0.7
filter في الحالات كلها: grayscale(1)
~~~

- **[[style]] كسب في الحالات كلها:** الـ [[style=""]] specificity بتاعه فوق أي selector، فقاعدة الـ dark ([[.7]] عشان النص الرمادي يبان على خلفية غامقة) وقاعدة الـ hover مقدروش يغيّروه. عشان تصلّح ده هتكتب [[!important]] في الـ CSS، وكده بقيت بتحارب كودك.
- **[[data-stock]]:** الـ JS قال «نفد» بس، وكل حالة في الـ CSS قررت الشكل المناسب ليها.
- **ليه الـ filter زي ما هو:** مفيش قاعدة غيّرته، فالاتنين [[grayscale(1)]]. الفرق في اللي **ممكن** يتغيّر.` },
            { lvl: 'تحدي', t: R`**ابني:** قايمة تنقّل فيها ٣ لينكات (الرئيسية، المنتجات، تواصل) لأقسام في نفس الصفحة. لما تدوس لينك يبقى هو [[aria-current="page"]] والباقيين لأ، والـ CSS يرسم اللينك الحالي (خط تحته وتقيل) من الـ attribute بس. وتأكد من الـ Accessibility pane.`, done: R`لينك واحد بس عليه [[aria-current]] في أي وقت، والشكل من [[a[aria-current="page"]]]، ولو JS مقفول اللينكات لسه بتنقل للأقسام.`, sol: R`~~~live 240 دوس على اللينكات
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; }
  nav { display: flex; gap: 16px; padding: 12px 16px; background: #0f172a; position: sticky; top: 0; }
  nav a { color: #cbd5e1; text-decoration: none; padding-block: 4px; }
  nav a:focus-visible { outline: 2px solid #fbbf24; outline-offset: 4px; }
  nav a[aria-current="page"] { color: #fff; font-weight: 700; border-block-end: 3px solid #fbbf24; }
  section { min-height: 140px; padding: 16px; border-block-end: 1px solid #e2e8f0; }
</style>
<nav class="js-nav" aria-label="أقسام الصفحة">
  <a href="#home" aria-current="page">الرئيسية</a>
  <a href="#products">المنتجات</a>
  <a href="#contact">تواصل</a>
</nav>
<section id="home"><h2>الرئيسية</h2></section>
<section id="products"><h2>المنتجات</h2></section>
<section id="contact"><h2>تواصل</h2></section>
<script>
  const nav = document.querySelector(".js-nav");
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    for (const a of nav.querySelectorAll("a")) a.removeAttribute("aria-current");
    link.setAttribute("aria-current", "page");
  });
</script>
~~~

- **listener واحد على الـ [[<nav>]]** (event delegation): [[closest("a")]] بيلاقي اللينك حتى لو الدوسة على حاجة جواه.
- **[[removeAttribute]] مش [[aria-current="false"]]:** الاتنين صح، بس الشيل أنضف والـ CSS selector [[[aria-current="page"]]] مش هيمسك غير الحالي.
- **مفيش [[preventDefault()]]:** اللينك بيعمل شغله العادي (يروح للقسم)، و JS بيزوّد الحالة بس. فمن غير JS التنقل شغال والعلامة بس هي اللي مبتتحركش.
- **[[border-block-end]]** مش [[border-bottom]]: logical property، نفس النتيجة هنا وبتفضل صح لو الكتابة اتغيّرت لعمودي.

~~~text بعد ما دوست «المنتجات» (Chrome 158)
الرئيسية  aria-current=null   font-weight 400
المنتجات  aria-current="page" font-weight 700
تواصل     aria-current=null   font-weight 400
~~~

> شجرة الـ accessibility اللي Chrome 158 بيطلّعها من CDP مفيهاش [[aria-current]] كـ property في اللستة (جرّبت [[Accessibility.getFullAXTree]])، بس قارئات الشاشة بتقراها: NVDA و VoiceOver بيقولوا «current page» حسب MDN. فاتأكد منها بقارئ شاشة حقيقي (درس «كيبورد وقارئ شاشة» في كورس CSS).` },
          ],
          ref: [
            { t: "MDN: Element.classList", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList" },
            { t: "MDN: DOMTokenList.toggle()", url: "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle" },
            { t: "MDN: Use data attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes" },
            { t: "MDN: HTMLElement.dataset", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" },
            { t: "MDN: aria-expanded", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded" },
            { t: "MDN: aria-current", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current" },
            { t: "MDN: Using CSS custom properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties" },
            { t: "MDN: CSSStyleDeclaration.setProperty()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty" },
            { t: "MDN: Attribute selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors" },
            { t: "MDN: Specificity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity" },
          ],
          pre: [{ to: "css/[attr] و combinators", why: R`الـ CSS بيقرا الحالة بـ attribute selectors زي [[[data-state="done"]]]` }, { to: "css/specificity", why: R`ليه [[el.style]] بيكسب أي قاعدة في الـ CSS` }, { to: "css/aria", why: R`معنى [[aria-expanded]] و [[aria-pressed]] و [[aria-current]] قبل ما نستخدمهم في الـ CSS` }],
          deep: {
            why: R`من غير عقد واضح، الشكل بيتوزّع بين الملفين: لون في الـ CSS ولون تاني بيتكتب من JS، وحالة في class وحالة تانية في aria، والتعديل في مكان بيكسر التاني. لما JS يكتب الحالة بس و CSS يرسم بس، كل ملف بيتقري لوحده، والمصمم والمبرمج بيشتغلوا من غير ما يدوسوا على بعض، والـ accessibility بتيجي مع الشكل.`,
            how: R`كل ما JS يغيّر class أو attribute أو custom property على عنصر، المتصفح بيعلّم العنصر ده (وأحيانًا اللي جواه وجنبه) إن الـ style بتاعه محتاج يتحسب تاني، وفي الـ frame الجاي بيشوف أنهي selectors بقت بتطابق، ويحسب القيم، ويعمل layout و paint للي اتغيّر بس. الـ custom property بتتورّث زي [[color]]، فقيمة على الأب بتوصل لكل الأولاد. و [[el.style]] بيكتب في الـ [[style]] attribute، وده في الـ cascade أعلى من أي selector في ملفات الـ CSS (غير [[!important]]).`,
            when: R`class لحالة شكل بقيمتين. [[data-*]] لحالة بأكتر من قيمتين أو بيانات صغيرة (id المنتج) يحتاجها JS وقت الدوسة. [[aria-*]] لما الحالة ليها دور معروف (مفتوح، متداس، الحالي، غلط، بيتحمّل). CSS variable لأي رقم. و [[el.style]] للمتغيرات والقيم اللي بتتغيّر كل frame بس (سحب، أو تتبع ماوس).`,
            mistakes: R`[[el.style.display = "none"]] بدل [[hidden]] أو class. [[dataset.x = false]] وبعدين [[if (dataset.x)]] (نص [["false"]] truthy). [[dataset.count += 1]] بيلزق نص. JS بيمسك classes الشكل ([[.btn-primary]]). نفس الحالة في class و [[aria]] مع بعض وواحدة بتتنسي. [[box.style["--x"] = 1]] بدل [[setProperty]]. بعت [["60%"]] في متغير بدل [[0.6]] فالـ CSS مقدرش يحسب بيه. [[aria-expanded]] على اللوحة بدل الزرار.`,
          },
        },
        {
          cmd: "نفس الميزة بتلات طرق",
          title: "سؤال بيتفتح ونافذة تأكيد: بـ HTML لوحده، وبـ CSS لوحده، وبـ JS، والفرق متقاس في الكيبورد وقارئ الشاشة والحجم",
          desc: R`كتير من الحاجات اللي زمان كانت محتاجة JS بقى HTML بيعملها لوحده: [[<details>]] للسؤال اللي بيتفتح، و [[<dialog>]] مع [[command="show-modal"]] لنافذة تأكيد، و [[popover]] لصندوق صغير بيطلع وبيتقفل بـ Escape. وفيه حيل CSS بتقلّدهم ([[:checked]] و [[:target]])، بس بتبوّظ الكيبورد وقارئ الشاشة. و JS لما تحتاج حاجة مش موجودة جاهزة.
القاعدة بالقياس: **HTML الأول** (شغال من غير JS، والكيبورد وقارئ الشاشة متظبطين)، **وبعدين JS** لو محتاج سلوك زيادة. **وحيل CSS للسلوك لأ.**`,
          example: R`<details name="faq">
  <summary>التوصيل بياخد قد إيه؟</summary>
  <p>من يوم لـ ٣ أيام جوه القاهرة.</p>
</details>
<button type="button" commandfor="confirm" command="show-modal">احذف الطلب</button>
<dialog id="confirm" closedby="any">
  <p>متأكد إنك عايز تحذف الطلب؟</p>
  <form method="dialog">
    <button value="no">لأ</button>
    <button value="yes">أيوه احذف</button>
  </form>
</dialog>`,
          try: R`شغّل المثال واستخدمه بالكيبورد بس: Tab للسؤال و Enter، و Tab للزرار و Enter، و Escape. لاحظ الـ focus راح فين لما النافذة اتفتحت ولما اتقفلت. وبعدين اقفل JavaScript من DevTools (Ctrl+Shift+P ثم «Disable JavaScript») وجرّب تاني.`,
          sol: R`~~~text Chrome 158، بالكيبورد بس
Enter على السؤال:           اتفتح، و DevTools › Accessibility: expanded=true
Enter على «احذف الطلب»:     النافذة اتفتحت modal، والـ focus راح لأول زرار جواها («لأ»)
Escape:                     اتقفلت، والـ focus رجع لـ «احذف الطلب» لوحده
JS مقفول:                   السؤال والنافذة والـ Escape شغالين زي ما هم
~~~

ولا سطر JS في المثال. كل ده سلوك HTML: [[<details>]] بيفتح ويقفل، و [[command="show-modal"]] بيفتح الـ [[<dialog>]] كـ modal، و [[<form method="dialog">]] بيقفله والزرار اللي اتداس قيمته بتتحفظ في [[dialog.returnValue]].`,
          teach: R`## الفكرة

درس «مين بيعمل إيه» قال «اختار أبسط لغة تقدر تعمل الحاجة». هنا بنطبقها على ميزتين بيتعملوا في كل موقع تقريبًا: سؤال بيتفتح (accordion أو FAQ) ونافذة تأكيد (modal)، كل واحدة بالطرق التلاتة، والقياس في Chrome 158: الكيبورد، وشجرة الـ accessibility (اللي قارئ الشاشة بيقراها، من [[Accessibility.getFullAXTree]] وهي نفس اللي في DevTools › Elements › Accessibility)، والشغل من غير JS، والحجم.

---

## ١. سؤال بيتفتح: HTML لوحده

~~~live 130 details: دوس على السؤال، أو Tab ثم Enter
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  details { border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; }
  summary { cursor: pointer; font-weight: 700; }
  summary:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
  details[open] { background: #eff6ff; }
</style>
<details name="faq">
  <summary>التوصيل بياخد قد إيه؟</summary>
  <p>من يوم لـ ٣ أيام جوه القاهرة.</p>
</details>
<details name="faq">
  <summary>أقدر أرجّع المنتج؟</summary>
  <p>أيوه، خلال ١٤ يوم وهو بحالته.</p>
</details>
~~~

- **[[<details>]]** صندوق مقفول، و **[[<summary>]]** هو الجزء اللي بيبان وبيتداس. الدوسة و Enter و Space بيفتحوه، وفيه attribute [[open]] بيتحط لوحده (والـ CSS بيرسمه: [[details[open]]]).
- **[[name="faq"]]:** الأسئلة اللي ليها نفس الاسم بيبقوا مجموعة، فلما تفتح واحد التاني بيتقفل لوحده (exclusive accordion). من غير JS.
- **قارئ الشاشة:** الـ summary بيتقري كده:

~~~text شجرة الـ accessibility (Chrome 158)
group
  DisclosureTriangle "التوصيل بياخد قد إيه؟"  focusable=true  expanded=false
بعد Enter:  expanded=true، والفقرة ظهرت في الشجرة
~~~

---

## ٢. نفس السؤال: CSS لوحده (حيلة الـ checkbox)

~~~live 110 حيلة الـ checkbox: دوس على السؤال
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .faq-toggle { position: absolute; opacity: 0; }
  .faq label { cursor: pointer; font-weight: 700; }
  .faq-a { display: none; }
  .faq-toggle:checked ~ .faq-a { display: block; }
</style>
<div class="faq">
  <input type="checkbox" id="q1" class="faq-toggle">
  <label for="q1">التوصيل بياخد قد إيه؟</label>
  <p class="faq-a">من يوم لـ ٣ أيام جوه القاهرة.</p>
</div>
~~~

الـ [[<label for="q1">]] بيقلب الـ checkbox المستخبي، و [[:checked ~ .faq-a]] معناها «الإجابة اللي بعد checkbox متعلّم». بتشتغل بالماوس. بس شوف قارئ الشاشة:

~~~text شجرة الـ accessibility (Chrome 158)
checkbox "التوصيل بياخد قد إيه؟"  focusable=true  checked=false
~~~

- **قارئ الشاشة بيقول «checkbox، مش متعلّم»** لسؤال. اليوزر الكفيف هيفتكر إنه بيوافق على حاجة.
- **Enter مبيعملش حاجة:** الـ checkbox بيتقلب بـ Space بس. فاللي متعوّد على Enter في الأزرار مش هيعرف يفتحه.
- **ولو حد خبّى الـ checkbox بـ [[display: none]]** (أشهر نسخة من الحيلة): Tab مبيوصلوش أصلًا. قست: الـ focus فضل على [[BODY]]، والسؤال مش في شجرة الـ accessibility خالص (بقى [[LabelText]] من غير اسم)، والإجابة مستحيل توصلها من الكيبورد.

---

## ٣. نفس السؤال: JS

~~~live 110 زرار و aria-expanded و hidden
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .faq-q { font: inherit; font-weight: 700; background: none; border: 0; padding: 0; cursor: pointer; }
  .faq-q:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
  .faq-q[aria-expanded="true"] { color: #1d4ed8; }
</style>
<div class="faq">
  <button type="button" class="faq-q" aria-expanded="false" aria-controls="a1">التوصيل بياخد قد إيه؟</button>
  <p id="a1" class="faq-a" hidden>من يوم لـ ٣ أيام جوه القاهرة.</p>
</div>
<script>
  for (const btn of document.querySelectorAll(".faq-q")) {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open);
      document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
    });
  }
</script>
~~~

~~~text شجرة الـ accessibility (Chrome 158)
button "التوصيل بياخد قد إيه؟"  focusable=true  expanded=false
~~~

صح لقارئ الشاشة والكيبورد، بس **انت** اللي كتبت كل ده: الزرار والحالة والإخفاء. ومن غير JS الإجابة [[hidden]] على طول ومحدش يقدر يفتحها (جرّبتها والـ JS مقفول: الدوسة معملتش حاجة، والإجابة فضلت مستخبية). يعني نسخة JS محتاجة الحيلة بتاعة درس «مين بيعمل إيه»: JS هو اللي يخفي أول ما يشتغل.

### المقارنة

| | [[<details>]] | حيلة الـ checkbox | زرار + JS |
|---|---|---|---|
| قارئ الشاشة بيقول | DisclosureTriangle، expanded | **checkbox، checked** (غلط) | button، expanded |
| Enter | بيفتح | **مبيعملش حاجة** | بيفتح |
| من غير JS | شغال | شغال | **الإجابة مستخبية للأبد** (لو مكتوبة [[hidden]] في HTML) |
| سؤال واحد مفتوح في المرة | [[name="faq"]] | radio بدل checkbox (ومبيتقفلش تاني) | كود زيادة |
| الحجم (الملف، بالـ bytes) | 155 | 365 | 568 |
| تقدر تعمل animation للفتح | محدود ([[::details-content]] في المتصفحات الجديدة) | أيوه | أيوه |

---

## ٤. نافذة تأكيد: [[<dialog>]] من غير JS، و [[popover]]

~~~live 200 دوس «احذف الطلب»، وجرّب Escape، ودوس برّه النافذة
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid #94a3b8; background: #fff; cursor: pointer; }
  button:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
  dialog { border: 0; border-radius: 12px; padding: 16px 20px; box-shadow: 0 10px 30px #0004; }
  dialog::backdrop { background: #0f172a99; }
  [popover] { border: 1px solid #94a3b8; border-radius: 8px; padding: 4px 12px; }
  .danger { background: #dc2626; color: #fff; border-color: #dc2626; }
</style>
<button type="button" commandfor="confirm" command="show-modal">احذف الطلب</button>
<button type="button" popovertarget="help">مساعدة</button>
<dialog id="confirm" closedby="any">
  <p>متأكد إنك عايز تحذف الطلب؟</p>
  <form method="dialog">
    <button value="no">لأ</button>
    <button value="yes" class="danger">أيوه احذف</button>
  </form>
</dialog>
<div id="help" popover><p>الطلب بيتحذف خلال ٢٤ ساعة.</p></div>
~~~

- **[[commandfor="confirm" command="show-modal"]]:** الزرار بيفتح الـ dialog اللي [[id]] بتاعه [[confirm]] كـ modal. ده الـ Invoker Commands في HTML، شغال في Chrome 158 من غير JS. قيم تانية: [[close]] و [[toggle-popover]] و [[show-popover]] و [[hide-popover]].
- **modal يعني:** باقي الصفحة متقفلة (inert)، والنافذة فوق كل حاجة (top layer)، والـ focus جواها، و Escape بيقفلها، والـ focus بيرجع للزرار اللي فتحها. ده كله ببلاش.
- **[[closedby="any"]]:** دوسة برّه النافذة كمان بتقفلها (light dismiss).
- **[[<form method="dialog">]]:** أي زرار جواه بيقفل النافذة، والـ [[value]] بتاعه بيتحط في [[dialog.returnValue]]. JS بيقرا ده لو هيعمل حاجة (التمرين الرابع).
- **[[popover]] و [[popovertarget]]:** صندوق مش modal (الصفحة لسه شغالة)، بيتقفل بـ Escape أو بدوسة برّه. مناسب لمساعدة صغيرة أو قايمة.

~~~text بالكيبورد بس (Chrome 158، الصفحة نفسها من سيرفر)
Enter على «احذف الطلب»:  open=true  :modal=true  والـ focus على «لأ»
Escape:                  open=false  والـ focus رجع لـ «احذف الطلب»
دوسة «أيوه احذف»:        اتقفلت، و returnValue = "yes"
Enter على «مساعدة»:      :popover-open = true
Escape:                  اتقفل، والـ focus فضل على «مساعدة»
والـ JS مقفول:           الـ dialog والـ popover بيفتحوا، و Escape بيقفل الـ dialog
~~~

### ونفس النافذة بـ CSS لوحده ([[:target]])

~~~html
<a href="#t">احذف</a>
<div id="t" class="target-modal"><p>متأكد؟</p><a href="#">اقفل</a></div>
<style>
  .target-modal { display: none; position: fixed; inset: 30% 20%; background: #fff; border: 2px solid; }
  .target-modal:target { display: block; }
</style>
~~~

اللينك بيغيّر الـ hash لـ [[#t]]، و [[:target]] بيطابق العنصر اللي الـ id بتاعه في الـ hash. (مش متعرض حي هنا لأن الـ preview بيعالج اللينكات بنفسه، فالـ hash مبيتغيّرش.) قسته في Chrome من سيرفر:

~~~text :target في Chrome 158
Enter على «احذف»:   النافذة ظهرت، بس الـ focus فضل على BODY (مش جواها)
Escape:              ولا حاجة. فضلت مفتوحة
history.length:      زاد واحد (كل فتحة = خطوة في Back)
زرار Back:           قفلها
~~~

يعني الـ focus مش جواها، وباقي الصفحة لسه بيتعمله Tab من وراها، و Escape ميت، و Back بقى «اقفل النافذة». ده اللي بيخلي حيل CSS للسلوك فكرة وحشة.

---

## ٥. إمتى JS؟

HTML بيغطي: فتح وقفل، ونافذة modal، و popover، وفورم بيتحقق (الدرس الجاي). **JS لما:**

- السلوك مش موجود جاهز: تبويبات (tabs) بأسهم الكيبورد، أو carousel، أو autocomplete.
- محتاج **تعمل حاجة** بعد الحدث: النافذة قالت «أيوه» ← امسح الطلب من السيرفر.
- البيانات جاية من برّه: الأسئلة نفسها من [[fetch]].

ولما تكتب JS، ابدأ من عنصر HTML الصح ([[<button>]] و [[<dialog>]]) وزوّد عليه، متبدأش من [[<div>]].

---

## الخلاصة

| الميزة | الأحسن | ليه | تجنّب |
|---|---|---|---|
| سؤال بيتفتح | [[<details>]] و [[name]] | كيبورد وقارئ شاشة ومن غير JS | حيلة الـ checkbox |
| نافذة تأكيد | [[<dialog>]] و [[command="show-modal"]] | focus و Escape و inert ببلاش | [[:target]] و [[<div>]] بـ [[display]] |
| صندوق صغير | [[popover]] | Escape ودوسة برّه | [[:hover]] بس (موبايل مفيهوش hover) |
| tabs أو carousel | JS على [[<button>]] | مفيش عنصر جاهز | — |

اللي ميتلخبطش: HTML الأول، و JS يزوّد، و CSS يرسم. وأي حيلة CSS بتعمل سلوك، قيس الكيبورد وقارئ الشاشة قبل ما تستخدمها.`,
          lines: [
            R`صندوق سؤال، و [[name="faq"]] بيخليه جزء من مجموعة: يتفتح واحد بس في المرة`,
            R`[[<summary>]] الجزء اللي بيبان وبيتداس، وبيتفتح بالماوس و Enter و Space`,
            R`الإجابة: بتظهر بس لما الصندوق يتفتح، والمتصفح بيحط [[open]] على الـ [[<details>]] لوحده`,
            R`قفلة الصندوق، ومفيش ولا سطر JS بيفتحه أو يقفله`,
            R`زرار بيفتح الـ dialog اللي [[id]] بتاعه [[confirm]] كـ modal، من غير JS، بـ [[commandfor]] و [[command]]`,
            R`النافذة نفسها مقفولة لحد ما الزرار يفتحها، و [[closedby="any"]] بيقفلها لو دوست برّاها`,
            R`نص السؤال جوه النافذة`,
            R`فورم [[method="dialog"]]: أي زرار جواه بيقفل النافذة بدل ما يبعت لسيرفر`,
            R`زرار «لأ» بقيمة [[no]]، وهو أول عنصر فالـ focus بيروحله لما النافذة تتفتح`,
            R`زرار «أيوه» بقيمة [[yes]]، والقيمة دي بتتحفظ في [[dialog.returnValue]] لما يتداس`,
            R`قفلة الفورم اللي جوه النافذة`,
            R`قفلة النافذة: Escape والـ focus ورجوعه للزرار كلهم من المتصفح`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** لكل ميزة قول HTML لوحده، ولا HTML + JS، وبأنهي عنصر: (١) قايمة «حسابي» صغيرة بتطلع من زرار وتتقفل لما تدوس برّه، (٢) نافذة «سجّل دخول» فوق الصفحة، (٣) أسئلة شائعة يتفتح منها واحد بس، (٤) تبويبات «الوصف / المواصفات / التقييمات» بأسهم الكيبورد، (٥) إشعار «اتضاف للسلة» بيختفي بعد ٣ ثواني، (٦) tooltip بيشرح أيقونة.`, done: R`لكل ميزة اخترت عنصر وكتبت سطر ليه، وطابقت الحل.`, sol: R`| # | الميزة | الحل | ليه |
|---|---|---|---|
| ١ | قايمة «حسابي» | HTML: [[popover]] و [[popovertarget]] | بيتقفل بـ Escape وبدوسة برّه لوحده، وفوق كل حاجة |
| ٢ | نافذة تسجيل دخول | HTML: [[<dialog>]] و [[command="show-modal"]]، و JS لو هتبعت الفورم بـ [[fetch]] | الـ modal والـ focus و Escape ببلاش |
| ٣ | أسئلة واحد بس مفتوح | HTML: [[<details name="faq">]] | الـ [[name]] بيقفل الباقي لوحده |
| ٤ | تبويبات بالأسهم | HTML + JS: [[<button role="tab">]] و [[aria-selected]] | مفيش عنصر tabs جاهز، والأسهم لازم JS |
| ٥ | إشعار بيختفي | HTML + JS: [[<div role="status">]] و [[setTimeout]] | الوقت محتاج JS، و [[role="status"]] بيخلي قارئ الشاشة يقوله |
| ٦ | tooltip | HTML: [[popover="hint"]] أو نص ظاهر جنب الأيقونة، أو [[aria-label]] على الزرار | [[title]] مبيبانش على الموبايل ولا للكيبورد |

**الغلطة الشايعة:** (٢) و (١) بيتكتبوا [[<div>]] و [[display: none]] و JS لكل حاجة. النسخة دي محتاجة focus trap و Escape و inert بإيدك، وغالبًا واحدة منهم بتتنسي.` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة أسئلة شائعة لمحل متخيّل، ٤ أسئلة، يتفتح واحد بس في المرة، والسؤال المفتوح ليه خلفية مختلفة وسهم بيلف، ومن غير ولا سطر JS.`, done: R`لما تفتح سؤال التاني بيتقفل، والسهم بيلف ١٨٠ درجة، وكله بالكيبورد، و DevTools مفيهوش [[<script>]].`, sol: R`~~~live 260 ٤ أسئلة، واحد بس مفتوح
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 480px; }
  details { border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 8px; }
  summary { list-style: none; display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; cursor: pointer; font-weight: 700; }
  summary::-webkit-details-marker { display: none; }
  summary::after { content: "▾"; transition: rotate .2s; }
  details[open] summary::after { rotate: 180deg; }
  details[open] { background: #f0f9ff; border-color: #7dd3fc; }
  summary:focus-visible { outline: 3px solid #0284c7; outline-offset: 2px; border-radius: 10px; }
  details p { margin: 0; padding: 0 14px 12px; }
  @media (prefers-reduced-motion: reduce) { summary::after { transition: none; } }
</style>
<h1>أسئلة شائعة</h1>
<details name="faq" open>
  <summary>التوصيل بياخد قد إيه؟</summary>
  <p>من يوم لـ ٣ أيام جوه القاهرة.</p>
</details>
<details name="faq">
  <summary>أقدر أرجّع المنتج؟</summary>
  <p>أيوه، خلال ١٤ يوم وهو بحالته.</p>
</details>
<details name="faq">
  <summary>الدفع إزاي؟</summary>
  <p>كاش عند الاستلام أو بالكارت.</p>
</details>
<details name="faq">
  <summary>فيه ضمان؟</summary>
  <p>سنة على كل الأجهزة.</p>
</details>
~~~

- **[[name="faq"]]** على الأربعة: مجموعة واحدة. والأول [[open]] من الأول.
- **[[list-style: none]]** و **[[::-webkit-details-marker]]** بيشيلوا المثلث الافتراضي (الأول لـ Firefox والجديد، والتاني لـ Safari)، و [[::after]] بيحط سهمنا.
- **[[details[open] summary::after]]:** الـ CSS بيقرا الـ attribute اللي المتصفح حطه، زي ما بيقرا الحالة اللي JS بيحطها في درس «الجسر».
- **[[rotate: 180deg]]** خاصية لوحدها (من غير [[transform]])، و [[transition]] عليها، ومن غير حركة لو اليوزر طالب كده.

~~~text اتقاس (Chrome 158)
فتحت التالت بـ Tab ثم Enter:  details المفتوحة = [3]، الأول اتقفل لوحده
rotate بتاع سهم المفتوح = 180deg، والباقيين none
document.scripts.length = 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الأسئلة دي معمولة بحيلة الـ checkbox و [[.toggle { display: none; }]]: [[<input type="checkbox" id="q1" class="toggle"><label for="q1">الدفع إزاي؟</label><p class="a">كاش أو كارت.</p>]] و [[.a { display: none } .toggle:checked + label + .a { display: block }]]. اليوزرز بالكيبورد مش عارفين يفتحوها. أثبت المشكلة بالقياس وصلّحها.`, done: R`قبل التصليح: Tab مبيوصلش للسؤال (القياس بيقول [[BODY]]). بعده: Tab بيوصل، و Enter بيفتح، وقارئ الشاشة بيقول [[expanded]] مش [[checkbox]].`, sol: R`**الإثبات:** في الصفحة دوس Tab وبعدين في Console: [[document.activeElement.tagName]].

~~~text Chrome 158
قبل:  document.activeElement.tagName = "BODY"   (Tab معدّاش على حاجة)
      شجرة الـ accessibility: LabelText من غير اسم، ومفيش checkbox (display: none بيشيله من الشجرة)
~~~

**التصليح:** العنصر اللي معمول للحكاية دي:

~~~live 120 بعد التصليح: Tab ثم Enter
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  summary { cursor: pointer; font-weight: 700; }
  summary:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
</style>
<details>
  <summary>الدفع إزاي؟</summary>
  <p class="a">كاش أو كارت.</p>
</details>
~~~

~~~text بعد (Chrome 158)
Tab:    document.activeElement.tagName = "SUMMARY"
Enter:  الإجابة ظهرت
الشجرة: DisclosureTriangle "الدفع إزاي؟"  focusable=true  expanded=true
~~~

- **[[display: none]] على الـ input** بيشيله من الـ Tab ومن شجرة الـ accessibility خالص. الـ [[<label>]] لوحده مش عنصر بيتعمله focus.
- **تصليح «نص نص»:** [[opacity: 0]] بدل [[display: none]] (زي الشرح) بيرجّع الـ Tab، بس قارئ الشاشة لسه بيقول «checkbox»، و Enter لسه مبيفتحش. التصليح الكامل هو تغيير العنصر.
- **ومفيش CSS اتشال:** القواعد اللي كانت بترسم السؤال اتنقلت لـ [[summary]]، والإخفاء والإظهار بقوا شغل المتصفح.` },
            { lvl: 'تحدي', t: R`**ابني:** لستة طلبات، كل طلب جنبه «احذف». الدوسة بتفتح **نفس** [[<dialog>]] (واحد بس في الصفحة) فيه اسم الطلب. «أيوه» تمسح الطلب من اللستة، و «لأ» أو Escape ميعملوش حاجة. HTML يعمل اللي يقدر عليه و JS يعمل الباقي بس.`, done: R`الـ dialog واحد، واسم الطلب الصح جواه، و «أيوه» بتمسح الطلب ده بس، و Escape ميمسحش، والـ focus بيرجع لحاجة منطقية بعد المسح.`, sol: R`~~~live 260 دوس «احذف» على أي طلب
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  ul { padding: 0; list-style: none; max-width: 360px; }
  li { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #e2e8f0; }
  button { font: inherit; padding: 4px 10px; border-radius: 6px; border: 1px solid #94a3b8; background: #fff; cursor: pointer; }
  button:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
  .danger { background: #dc2626; color: #fff; border-color: #dc2626; }
  dialog { border: 0; border-radius: 12px; box-shadow: 0 10px 30px #0004; }
  dialog::backdrop { background: #0f172a99; }
</style>
<h1 id="title" tabindex="-1">طلباتي</h1>
<ul class="js-orders">
  <li data-id="101"><span>طلب ١٠١: كوباية</span><button type="button" commandfor="confirm" command="show-modal">احذف</button></li>
  <li data-id="102"><span>طلب ١٠٢: شنطة</span><button type="button" commandfor="confirm" command="show-modal">احذف</button></li>
  <li data-id="103"><span>طلب ١٠٣: كشكول</span><button type="button" commandfor="confirm" command="show-modal">احذف</button></li>
</ul>
<dialog id="confirm" closedby="any">
  <p>تحذف <b class="js-name"></b>؟</p>
  <form method="dialog">
    <button value="no">لأ</button>
    <button value="yes" class="danger">أيوه احذف</button>
  </form>
</dialog>
<script>
  const dialog = document.querySelector("#confirm");
  let current = null;
  // event "command" بييجي على الـ dialog لما زرار commandfor يفتحه، و source هو الزرار نفسه
  dialog.addEventListener("command", (e) => {
    current = e.source.closest("li");
    dialog.querySelector(".js-name").textContent = current.querySelector("span").textContent;
    dialog.returnValue = "";
  });
  dialog.addEventListener("close", () => {
    if (dialog.returnValue !== "yes" || !current) return;
    const next = current.nextElementSibling || current.previousElementSibling;
    current.remove();
    (next ? next.querySelector("button") : document.querySelector("#title")).focus();
  });
</script>
~~~

- **HTML عمل:** الفتح ([[command="show-modal"]]) والقفل ([[method="dialog"]] و Escape و [[closedby]]) والـ focus جوه النافذة ورجوعه.
- **JS عمل حاجتين بس:** يعرف أنهي طلب ([[command]] event، و [[e.source]] الزرار اللي اتداس)، ويمسح لما [[returnValue]] يبقى [["yes"]] (في [[close]] event).
- **[[dialog.returnValue = ""]]** عند كل فتح: الـ [[close]] بيحصل كمان مع Escape، والكود بيقرا [[returnValue]] ساعتها. جرّبت من غير السطر ده: «أيوه» على طلب، وبعدين Escape على طلب تاني، و Chrome 158 رجّع [[returnValue]] لـ [[""]] لوحده ومفيش حاجة اتمسحت. بس الكود اللي بيمسح بيانات ميعتمدش على تفصيلة زي دي، فالسطر بيضمن إن كل فتحة بتبدأ من غير قيمة قديمة.
- **الـ focus بعد المسح:** الزرار اللي فتح النافذة اتمسح مع الطلب، فالمتصفح مش هيلاقي يرجّعه فين. فبنحطه على زرار الطلب اللي بعده (أو اللي قبله، أو العنوان لو اللستة فضيت؛ عشان كده [[tabindex="-1"]] على العنوان).

~~~text اتقاس (Chrome 158)
احذف على ١٠٢ ← النافذة: «تحذف طلب ١٠٢: شنطة؟» ← أيوه ← اللستة: 101, 103، والـ focus على زرار ١٠٣
احذف على ١٠١ ← Escape ← اللستة: 101, 103 (متمسحش)
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN اعرف: (أ) إيه القيم اللي [[command]] بياخدها غير [[show-modal]]؟ (ب) إمتى تستخدم [[popover="manual"]] بدل [[popover]] العادي؟ (ج) [[closedby]] بياخد إيه، وإيه الافتراضي للـ modal؟ جرّب كل إجابة في صفحة.`, done: R`٣ إجابات، كل واحدة برابط MDN وتجربة بتأكدها في Chrome.`, sol: R`**(أ) قيم [[command]]** (MDN: [[HTMLButtonElement.command]]): [[show-modal]] و [[close]] و [[request-close]] للـ dialog، و [[show-popover]] و [[hide-popover]] و [[toggle-popover]] للـ popover، وأي قيمة بتبدأ بـ [[--]] (custom command) بتوصل لـ JS في [[command]] event من غير ما المتصفح يعمل حاجة.

**(ب) [[popover="manual"]]:** مبيتقفلش بـ Escape ولا بدوسة برّه، ومبيقفلش الـ popovers التانية لما يتفتح. مناسب لإشعار (toast) لازم يفضل لحد ما الكود يقفله أو اليوزر يدوس «x».

**(ج) [[closedby]]:** [[any]] (Escape ودوسة برّه)، و [[closerequest]] (Escape بس)، و [[none]] (مفيش غير زرار جواه). الافتراضي للـ modal اللي اتفتح بـ [[showModal()]] أو [[show-modal]] هو [[closerequest]].

~~~text اتجرّب في Chrome 158
<button commandfor="d" command="close"> جوه الـ dialog: قفلها
popover="manual": Escape مقفلهوش، و hidePopover() قفله
closedby="none" على modal: Escape مقفلهاش
~~~` },
          ],
          ref: [
            { t: "MDN: <details>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details" },
            { t: "MDN: <summary>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary" },
            { t: "MDN: <dialog>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog" },
            { t: "MDN: Invoker Commands API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API" },
            { t: "MDN: HTMLButtonElement.command", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/command" },
            { t: "MDN: popover", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover" },
            { t: "MDN: closedby", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby" },
            { t: "MDN: :target", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target" },
            { t: "MDN: :checked", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:checked" },
            { t: "MDN: Accessibility tree", url: "https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree" },
          ],
          pre: [{ to: "css/details و summary", why: R`العنصر نفسه وتنسيقه` }, { to: "css/dialog و closedby", why: R`الـ dialog والـ modal و [[closedby]] من ناحية HTML` }, { to: "css/popover و popovertarget", why: R`الـ popover من ناحية HTML` }, { to: "css/:target و :focus-within", why: R`[[:target]] اللي حيلة النافذة مبنية عليه` }],
          deep: {
            why: R`أي سلوك بتكتبه بـ JS انت مسؤول عن كل تفاصيله: الكيبورد، والـ focus، وقارئ الشاشة، والشغل من غير JS. والعناصر الجاهزة في HTML جاية بالحاجات دي متجرّبة في كل المتصفحات. وحيل CSS بتدي الشكل من غير المعنى، فاللي بيستخدم كيبورد أو قارئ شاشة بيتقفل برّه. عشان كده الاختيار بالترتيب ده بيوفّر كود ويقفل باجات قبل ما تحصل.`,
            how: R`[[<details>]] و [[<dialog>]] و [[popover]] ليهم سلوك مكتوب في مواصفة HTML: المتصفح بيضيفلهم الـ role والحالة في شجرة الـ accessibility ([[expanded]] و [[modal]])، وبيتعامل مع الكيبورد، وبيحط الـ modal والـ popover في الـ top layer فوق أي [[z-index]]. و [[command]] على زرار بيخلي المتصفح يشغّل [[showModal()]] أو [[togglePopover()]] بنفسه، ويبعت [[command]] event على العنصر عشان JS يزوّد لو عايز. أما [[:checked]] و [[:target]] فهما selectors: بيغيّروا الشكل بس، والعنصر لسه checkbox أو لينك في كل حاجة تانية.`,
            when: R`[[<details>]] لأي محتوى بيتفتح ويتقفل. [[<dialog>]] لأي نافذة بتوقف الصفحة (تأكيد، أو فورم قصير). [[popover]] لقوايم وصناديق صغيرة. JS فوقهم لما محتاج تعمل حاجة بعد الحدث أو تجيب بيانات. JS من الأول لـ tabs و carousel و autocomplete. وحيل CSS بس للشكل اللي ملوش معنى (زي تغيير صورة بالـ hover في صفحة عرض).`,
            mistakes: R`حيلة الـ checkbox بـ [[display: none]]. نافذة بـ [[<div>]] من غير focus ولا Escape. [[showModal()]] بـ JS والـ [[command]] بيعملها من غير JS. نسيان [[returnValue = ""]] قبل كل فتح. مسح العنصر اللي فتح النافذة وسيب الـ focus يضيع. [[:hover]] لفتح قايمة (الموبايل والكيبورد مفيهمش hover). [[hidden]] على محتوى في الـ HTML وJS هو الوحيد اللي بيظهره.`,
          },
        },
        {
          cmd: "الفورم من التلاتة: تحقق وإرسال",
          title: "فورم اشتراك كامل: HTML بيحدد القواعد، و CSS بيرسم الغلط في وقته، و JS بيكتب الرسايل بالعربي ويبعت بـ fetch ويمنع الإرسال مرتين، والسيرفر بيتحقق تاني",
          desc: R`الفورم أوضح مكان بتشوف فيه التلات لغات بيشتغلوا مع بعض:
• **HTML** بيكتب القواعد: [[required]] و [[type="email"]] و [[pattern]] و [[minlength]]. ومن غير JS خالص المتصفح بيمنع الإرسال وبيبعت الفورم للسيرفر لوحده.
• **CSS** بيرسم الحالة: [[:user-invalid]] (أحمر بعد ما اليوزر يلمس الحقل بس، مش من أول ما الصفحة تفتح) و [[:focus-visible]] و [[button:disabled]].
• **JS** بيزوّد: رسايل عربي بـ [[setCustomValidity()]] حسب [[validity]]، وإرسال بـ [[fetch]] من غير reload، وقفل الزرار وقت الإرسال، وغلط السيرفر (الإيميل متسجّل) بيظهر على الحقل نفسه.
• **السيرفر** بيتحقق تاني دايمًا: أي حد يقدر يبعت طلب من غير الفورم خالص.`,
          example: R`form.noValidate = true;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  for (const input of form.elements) if (input.name) check(input);
  if (!form.reportValidity()) return;
  button.disabled = true;
  try {
    const res = await fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await res.json();
    if (!res.ok) { form.elements[data.field].setCustomValidity(data.message); form.reportValidity(); return; }
    status.textContent = "اتسجّلت";
  } finally {
    button.disabled = false;
  }
});`,
          try: R`شغّل الفورم من الشرح على [[server.mjs]] بعد ما تزوّد الـ API. ابعته فاضي، وبعدين بإيميل [[sara@]]، وبعدين بـ [[taken@example.com]]، وبعدين بإيميل سليم. افتح Network وشوف كام طلب راح. وبعدين دوس «اشترك» ٣ مرات ورا بعض بسرعة: كام طلب؟`,
          sol: R`~~~text Chrome 158، server.mjs على localhost
فاضي:                 مفيش طلب. «اكتب اسمك» تحت الاسم، والحقلين المطلوبين بإطار أحمر، والـ focus على الاسم
sara@:                مفيش طلب. «الإيميل لازم يبقى زي name@example.com»
taken@example.com:    طلب واحد ← 409، والرسالة «الإيميل ده متسجّل قبل كده» على حقل الإيميل
إيميل سليم:            طلب ← 200، والفورم اتمسح، و «اتسجّلت. هيوصلك أول إيميل يوم الجمعة.»
٣ دوسات ورا بعض:       طلب واحد بس في Network (الزرار اتقفل بعد أول دوسة)
~~~

اللي اتحقق في المتصفح متبعتش أصلًا، فالسيرفر مشافش غير الطلبات اللي ممكن تنجح. واللي المتصفح ميعرفوش (الإيميل متسجّل) جه من السيرفر واتعرض في نفس المكان.`,
          teach: R`## الفكرة

وحدة «الفورم» في كورس HTML علمتك القواعد ([[required]] و [[pattern]] و Constraint Validation API)، ودرس «FormData و URLSearchParams» علمك تقرا الفورم في JS. الدرس ده بيجمعهم في فورم واحد حقيقي بيتبعت لسيرفر، وبيقول كل قاعدة مكانها فين وليه. كله اتجرّب في Chrome 158 على [[server.mjs]] من درس «تشغّل المشروع وتعرضه» بعد ما زوّدنا فيه API.

---

## ١. الشكل النهائي

~~~view 470 360 الفورم شغال: ابعته فاضي، وبـ sara@، وبـ taken@example.com، وبإيميل سليم
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>اشترك في النشرة</title>
  <style>
body { margin: 0; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: #f8fafc; color: #0f172a; }
.signup { max-width: 360px; margin: auto; display: grid; gap: 4px; padding: 16px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0002; }
.signup h1 { margin: 0 0 8px; font-size: 1.3rem; }
label { font-weight: 700; margin-top: 8px; }
input { font: inherit; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; }
input:focus-visible { outline: 3px solid #2563eb; outline-offset: 1px; }
input:user-invalid { border-color: #dc2626; background: #fef2f2; }
input:required:user-valid { border-color: #16a34a; }
small { color: #475569; }
button { margin-top: 12px; font: inherit; font-weight: 700; padding: 10px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; cursor: pointer; }
button:disabled { background: #94a3b8; cursor: progress; }
.signup[aria-busy="true"] input { opacity: .6; }
.status:empty { display: none; }
.status { margin: 8px 0 0; padding: 8px; border-radius: 8px; background: #f0fdf4; color: #166534; }
.status.is-error { background: #fef2f2; color: #991b1b; }
</style>
  <script>
// في الـ preview مفيش سيرفر: الـ fetch لـ /api/signup بيرد هنا بنفس ردود server.mjs (تأخير 800ms، و taken@example.com بترجع 409)
const realFetch = window.fetch;
window.fetch = async (url, opts) => {
  if (!String(url).endsWith("/api/signup")) return realFetch(url, opts);
  await new Promise((r) => setTimeout(r, 800));
  const data = JSON.parse(opts.body || "{}");
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "")) return reply(400, { field: "email", message: "الإيميل مش صح" });
  if (data.email === "taken@example.com") return reply(409, { field: "email", message: "الإيميل ده متسجّل قبل كده" });
  return reply(200, { ok: true });
};
</script>
<script type="module">
const form = document.querySelector(".signup");
const button = form.querySelector("button");
const status = form.querySelector(".status");

// JS شغال: احنا اللي هنعرض الأخطاء بالعربي، فبنطفي فقاعة المتصفح التلقائية وقت الإرسال.
// من غير JS السطر ده مبيتنفّذش، فالمتصفح بيتحقق لوحده زي ما الـ HTML قال.
form.noValidate = true;

// رسايل عربي بدل رسايل المتصفح، حسب نوع الغلط في validity
const MESSAGES = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم حرفين على الأقل" },
  email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل لازم يبقى زي name@example.com" },
  phone: { patternMismatch: "الموبايل ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" },
};

function check(input) {
  input.setCustomValidity("");
  const rules = MESSAGES[input.name] || {};
  for (const flag in rules) {
    if (input.validity[flag]) {
      input.setCustomValidity(rules[flag]);
      break;
    }
  }
}

form.addEventListener("input", (e) => check(e.target));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  for (const input of form.elements) if (input.name) check(input);
  if (!form.reportValidity()) return;

  button.disabled = true;
  form.setAttribute("aria-busy", "true");
  status.className = "status";
  status.textContent = "";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json();
    if (!res.ok) {
      const input = form.elements[data.field];
      if (input) {
        input.setCustomValidity(data.message);
        input.reportValidity();
      } else throw new Error(data.message);
      return;
    }
    form.reset();
    status.textContent = "اتسجّلت. هيوصلك أول إيميل يوم الجمعة.";
  } catch (err) {
    status.className = "status is-error";
    status.textContent = "حصلت مشكلة في الاتصال، جرّب تاني.";
  } finally {
    button.disabled = false;
    form.removeAttribute("aria-busy");
  }
});
</script>
</head>
<body>
  <form class="signup" action="/api/signup" method="post">
    <h1>اشترك في النشرة</h1>
    <label for="name">الاسم</label>
    <input id="name" name="name" required minlength="2" autocomplete="name">
    <label for="email">الإيميل</label>
    <input id="email" name="email" type="email" required autocomplete="email">
    <label for="phone">الموبايل (اختياري)</label>
    <input id="phone" name="phone" type="tel" pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel" aria-describedby="phone-hint">
    <small id="phone-hint">١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015</small>
    <button type="submit">اشترك</button>
    <p class="status" role="status"></p>
  </form>
</body>
</html>
~~~

> في الـ preview مفيش سيرفر، فـ [[fetch("/api/signup")]] بيرد عليه كود صغير جوه الصفحة بنفس ردود [[server.mjs]] بالظبط. في مشروعك الطلب بيروح للسيرفر الحقيقي.

---

## ٢. الـ HTML: القواعد، وشغال لوحده

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>اشترك في النشرة</title>
  <link rel="stylesheet" href="css/styles.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <form class="signup" action="/api/signup" method="post">
    <h1>اشترك في النشرة</h1>
    <label for="name">الاسم</label>
    <input id="name" name="name" required minlength="2" autocomplete="name">
    <label for="email">الإيميل</label>
    <input id="email" name="email" type="email" required autocomplete="email">
    <label for="phone">الموبايل (اختياري)</label>
    <input id="phone" name="phone" type="tel" pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel" aria-describedby="phone-hint">
    <small id="phone-hint">١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015</small>
    <button type="submit">اشترك</button>
    <p class="status" role="status"></p>
  </form>
</body>
</html>
~~~

- **[[action="/api/signup"]] و [[method="post"]]:** لو JS موقعش، المتصفح بيبعت الفورم هنا بنفسه. جرّبت والـ JS مقفول: الفورم الفاضي متبعتش وظهرت فقاعة المتصفح «Please fill out this field.»، والمليان راح لـ [[/api/signup]] ورجع [[200]] و [[{"ok":true}]] (صفحة شكلها وحش، بس الاشتراك وصل).
- **[[required]]** و **[[minlength="2"]]** و **[[type="email"]]** و **[[pattern="01[0125][0-9]{8}"]]:** القواعد نفسها. الـ [[pattern]] بيتطابق على القيمة **كلها** من غير ما تكتب [[^]] و [[$]].
- **[[autocomplete]]:** المتصفح يملا من البيانات المحفوظة. و **[[inputmode="numeric"]]** كيبورد أرقام على الموبايل (مش زي [[type="number"]] اللي بيشيل الصفر اللي في الأول).
- **[[aria-describedby="phone-hint"]]:** قارئ الشاشة بيقرا الملحوظة مع الحقل.
- **[[role="status"]]** على مكان رسالة النجاح: قارئ الشاشة بيقولها لما تتكتب من غير ما الـ focus يتحرك.

---

## ٣. الـ CSS: الغلط يبان في وقته

~~~css css/styles.css
body { margin: 0; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: #f8fafc; color: #0f172a; }
.signup { max-width: 360px; margin: auto; display: grid; gap: 4px; padding: 16px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0002; }
.signup h1 { margin: 0 0 8px; font-size: 1.3rem; }
label { font-weight: 700; margin-top: 8px; }
input { font: inherit; padding: 8px 10px; border: 2px solid #cbd5e1; border-radius: 8px; }
input:focus-visible { outline: 3px solid #2563eb; outline-offset: 1px; }
input:user-invalid { border-color: #dc2626; background: #fef2f2; }
input:required:user-valid { border-color: #16a34a; }
small { color: #475569; }
button { margin-top: 12px; font: inherit; font-weight: 700; padding: 10px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; cursor: pointer; }
button:disabled { background: #94a3b8; cursor: progress; }
.signup[aria-busy="true"] input { opacity: .6; }
.status:empty { display: none; }
.status { margin: 8px 0 0; padding: 8px; border-radius: 8px; background: #f0fdf4; color: #166534; }
.status.is-error { background: #fef2f2; color: #991b1b; }
~~~

- **[[:user-invalid]] مش [[:invalid]]:** [[:invalid]] بيطابق الحقل المطلوب الفاضي **من أول ما الصفحة تفتح**، فالفورم بيبان أحمر قبل ما اليوزر يكتب حرف. [[:user-invalid]] بيستنى لحد ما اليوزر يلمس الحقل ويسيبه، أو يحاول يبعت. قست: أول ما الصفحة فتحت الإطارات كلها [[rgb(203, 213, 225)]] (رمادي)، وبعد «اشترك» فاضي الاسم والإيميل بقوا [[rgb(220, 38, 38)]].
- **[[input:required:user-valid]]:** أخضر للمطلوب الصح بس. أول نسخة كانت [[input:user-valid]]، والموبايل الفاضي (اختياري) بقى أخضر بعد الإرسال، وده بيقول «تمام» على حاجة اليوزر مكتبهاش.
- **[[button:disabled]]** و **[[.signup[aria-busy="true"]]]:** شكل الإرسال. JS بيحط الحالة و CSS بيرسمها (درس «الجسر»).
- **[[.status:empty]]:** الصندوق مبيبانش وهو فاضي، فمفيش مربع أخضر فاضي فوق.

---

## ٤. الـ JS: الرسايل والإرسال

~~~js js/app.js
const form = document.querySelector(".signup");
const button = form.querySelector("button");
const status = form.querySelector(".status");

// JS شغال: احنا اللي هنعرض الأخطاء بالعربي، فبنطفي فقاعة المتصفح التلقائية وقت الإرسال.
// من غير JS السطر ده مبيتنفّذش، فالمتصفح بيتحقق لوحده زي ما الـ HTML قال.
form.noValidate = true;

// رسايل عربي بدل رسايل المتصفح، حسب نوع الغلط في validity
const MESSAGES = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم حرفين على الأقل" },
  email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل لازم يبقى زي name@example.com" },
  phone: { patternMismatch: "الموبايل ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" },
};

function check(input) {
  input.setCustomValidity("");
  const rules = MESSAGES[input.name] || {};
  for (const flag in rules) {
    if (input.validity[flag]) {
      input.setCustomValidity(rules[flag]);
      break;
    }
  }
}

form.addEventListener("input", (e) => check(e.target));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  for (const input of form.elements) if (input.name) check(input);
  if (!form.reportValidity()) return;

  button.disabled = true;
  form.setAttribute("aria-busy", "true");
  status.className = "status";
  status.textContent = "";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json();
    if (!res.ok) {
      const input = form.elements[data.field];
      if (input) {
        input.setCustomValidity(data.message);
        input.reportValidity();
      } else throw new Error(data.message);
      return;
    }
    form.reset();
    status.textContent = "اتسجّلت. هيوصلك أول إيميل يوم الجمعة.";
  } catch (err) {
    status.className = "status is-error";
    status.textContent = "حصلت مشكلة في الاتصال، جرّب تاني.";
  } finally {
    button.disabled = false;
    form.removeAttribute("aria-busy");
  }
});
~~~

### [[form.noValidate = true]]

من غيره، لما الفورم فيه غلط والمتصفح بيمنع الإرسال بنفسه، **الـ [[submit]] event مبيحصلش أصلًا**. أول نسخة كانت من غير السطر ده، وفقاعة المتصفح طلعت بالإنجليزي «Please fill out this field.» لأن كود الرسايل العربي ماتنفّذش. السطر ده بيقول للمتصفح «متمنعش، أنا هتحقق»، وبيحصل من JS بس، فلو JS موقعش المتصفح بيتحقق لوحده زي الأول.

### [[check(input)]] و [[setCustomValidity()]]

كل [[input]] ليه [[validity]]: object فيه flag لكل نوع غلط. قست:

~~~text input.validity (Chrome 158)، الـ flags اللي true بس
الإيميل فاضي:         valueMissing
الإيميل «sara@»:      typeMismatch
الإيميل «a@b»:        valid           ← type="email" بيقبله
الموبايل فاضي:         valid           ← مش required، والـ pattern مبيتشيكش على الفاضي
الموبايل «0123»:      patternMismatch
الموبايل «٠١٠١٢٣٤٥٦٧٨»: patternMismatch ← أرقام عربي (التمرين الأخير)
~~~

[[check]] بتمسح الرسالة القديمة ([[setCustomValidity("")]])، وبتلف على الرسايل بتاعة الحقل ده، وأول flag صح بتحط رسالته. **أي نص غير فاضي في [[setCustomValidity]] بيخلي الحقل invalid**، عشان كده لازم المسح في الأول، وإلا الحقل يفضل غلط للأبد.

### [[reportValidity()]]

بتعمل التحقق، ولو فيه غلط بتعرض الفقاعة (برسالتنا) على أول حقل غلط وبتحط الـ focus عليه، وبترجّع [[false]]. قست بعد «اشترك» فاضي: الـ focus على [[#name]] ورسالته «اكتب اسمك».

### الإرسال

- **[[new FormData(form)]]** بيقرا كل الحقول اللي ليها [[name]]، و **[[Object.fromEntries]]** بيحولها object، و **[[JSON.stringify]]** نص يتبعت.
- **[[button.disabled = true]]** قبل الطلب، ورجوعها في [[finally]] (بيتنفّذ نجح أو فشل). قست ٣ دوسات ورا بعض: **طلب واحد**. ولما شلت السطر ده: **٣ طلبات**، يعني ٣ اشتراكات أو ٣ طلبات شرا.
- **[[if (!res.ok)]]:** [[fetch]] مبيرميش error على 409. السيرفر بيرد بـ [[{ field, message }]]، و JS بيحط الرسالة على الحقل اللي اسمه [[field]] بنفس [[setCustomValidity]]، فالغلط اللي جه من السيرفر شكله زي اللي جه من المتصفح بالظبط.
- **[[catch]]:** الشبكة وقعت أو السيرفر رجّع حاجة مش JSON. رسالة عامة لليوزر.
- **أول ما اليوزر يكتب تاني** ([[input]] event) [[check]] بتمسح رسالة السيرفر. قست: بعد 409 وكتبت إيميل تاني، [[validationMessage]] بقى [[""]].

---

## ٥. السيرفر: بيتحقق تاني

الجزء ده بيتحط في [[server.mjs]] قبل سطر [[const file = …]]:

~~~js server.mjs (الجزء الجديد)
  if (req.method === "POST" && path === "/api/signup") {
    let body = "";
    for await (const chunk of req) body += chunk;
    // من JS بيجي JSON، ومن الفورم العادي (JS مقفول) بيجي name=...&email=...
    const data = req.headers["content-type"]?.includes("json")
      ? JSON.parse(body || "{}")
      : Object.fromEntries(new URLSearchParams(body));
    await new Promise((r) => setTimeout(r, 800)); // تأخير مقصود عشان تشوف الزرار وهو متقفل
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "")) {
      res.writeHead(400);
      return res.end(JSON.stringify({ field: "email", message: "الإيميل مش صح" }));
    }
    if (data.email === "taken@example.com") {
      res.writeHead(409);
      return res.end(JSON.stringify({ field: "email", message: "الإيميل ده متسجّل قبل كده" }));
    }
    console.log("اشتراك جديد:", data.email);
    return res.end(JSON.stringify({ ok: true }));
  }
~~~

- **ليه تاني؟** أي حد يقدر يبعت [[POST /api/signup]] بـ curl أو من Console من غير الفورم. قواعد المتصفح للراحة، وقواعد السيرفر للأمان. وهنا كمان هما **مختلفين**: [[type="email"]] قبل [[a@b]]، والسيرفر بيطلب نقطة بعد الـ [[@]] فرجّع [[400]] والرسالة «الإيميل مش صح» ظهرت على الحقل (قستها).
- **JSON أو فورم عادي:** من JS بيجي [[application/json]]، ومن الفورم من غير JS بيجي [[application/x-www-form-urlencoded]] ([[name=…&email=…]])، فـ [[URLSearchParams]] بيفكه.
- **التأخير 800ms** للتجربة بس، عشان تشوف الزرار وهو متقفل.

~~~text ترمنال السيرفر (Node 24.22، شغّلته بـ PORT=8895)
شغال على http://localhost:8895
200 /
200 /js/app.js
200 /css/styles.css
اشتراك جديد: sara@example.com
~~~

طلبات الـ 409 والـ 400 مبتتسجّلش لأن السطر [[console.log]] بعد الـ [[return]] بتاعهم.

---

## الخلاصة: مين بيعمل إيه في الفورم

| الشغلة | مين | إزاي |
|---|---|---|
| الحقل مطلوب، نوعه، شكله | HTML | [[required]] و [[type]] و [[pattern]] و [[minlength]] |
| الفورم يتبعت من غير JS | HTML | [[action]] و [[method]] و [[name]] |
| الغلط يبان أحمر بعد ما يلمسه | CSS | [[:user-invalid]] |
| الزرار شكله وهو بيبعت | CSS | [[:disabled]] و [[[aria-busy]]] |
| رسايل عربي | JS | [[validity]] و [[setCustomValidity]] و [[reportValidity]] |
| قاعدة بين حقلين (تأكيد الباسورد) | JS | [[setCustomValidity]] (التمرين الرابع) |
| إرسال من غير reload، ومرة واحدة | JS | [[fetch]] و [[disabled]] و [[finally]] |
| الإيميل متسجّل، والأمان | السيرفر | تحقق تاني و [[409]] و [[{ field, message }]] |

اللي ميتلخبطش: [[noValidate]] من JS بس، و [[setCustomValidity("")]] قبل كل فحص، و [[:user-invalid]] مش [[:invalid]]، والزرار يتقفل قبل [[fetch]] ويرجع في [[finally]]، والسيرفر ميصدّقش المتصفح.`,
          lines: [
            R`JS شغال، فبنقفل فقاعة المتصفح التلقائية وقت الإرسال عشان نعرض رسايلنا. من غير JS السطر ده مبيتنفّذش والمتصفح بيتحقق لوحده`,
            R`بنسمع للإرسال (دوسة الزرار أو Enter في أي حقل)، و [[async]] عشان هنستنى السيرفر بـ [[await]]`,
            R`نوقف الإرسال العادي (reload لصفحة السيرفر)، لأن JS هيبعت بنفسه`,
            R`نلف على كل عناصر الفورم اللي ليها [[name]] ونحط الرسالة العربي المناسبة لكل واحد`,
            R`[[reportValidity()]] بتعرض أول غلط وتحط الـ focus عليه وترجّع [[false]]، فنوقف هنا من غير طلب`,
            R`نقفل الزرار قبل الطلب، فأي دوسة تانية وقت الانتظار مبتعملش حاجة`,
            R`[[try]] عشان لو الشبكة وقعت نرجع الزرار ونعرض رسالة بدل ما الصفحة تقف`,
            R`نبعت الحقول كـ JSON لنفس الرابط اللي في [[action]] بتاع الـ HTML، فالمسار مكتوب في مكان واحد`,
            R`نقرا رد السيرفر: [[{ ok: true }]] أو [[{ field, message }]]`,
            R`لو الرد مش 2xx: الرسالة على الحقل اللي السيرفر سمّاه، بنفس شكل أخطاء المتصفح، ونوقف`,
            R`نجح: رسالة في مكان [[role="status"]] فقارئ الشاشة بيقولها`,
            R`[[finally]] بيتنفّذ في كل الحالات: نجاح أو غلط سيرفر أو شبكة واقعة`,
            R`نرجّع الزرار عشان اليوزر يقدر يصلّح ويبعت تاني`,
            R`قفلة [[finally]]`,
            R`قفلة الـ listener: كل الإرسال في دالة واحدة`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** كل قاعدة دي مكانها فين (HTML، أو CSS، أو JS، أو السيرفر، أو أكتر من واحد): (١) الاسم مطلوب، (٢) الإيميل مش متسجّل قبل كده، (٣) الحقل الغلط إطاره أحمر، (٤) «تأكيد الباسورد» زي الباسورد، (٥) السن من ١٦ لـ ٩٩، (٦) متبعتش الطلب مرتين، (٧) رسالة الغلط بالعربي، (٨) محدش يسجّل ١٠٠ حساب في دقيقة.`, done: R`لكل قاعدة مكان وسبب، وعرفت إن السيرفر موجود في أغلبهم.`, sol: R`| # | القاعدة | فين | ليه |
|---|---|---|---|
| ١ | الاسم مطلوب | HTML [[required]] + السيرفر | المتصفح للراحة، والسيرفر لأن الطلب ممكن ييجي من برّه الفورم |
| ٢ | الإيميل مش متسجّل | السيرفر بس | المتصفح ميعرفش مين متسجّل. JS بيعرض الرد ([[409]]) |
| ٣ | إطار أحمر | CSS [[:user-invalid]] | حالة شكل والمتصفح عارفها |
| ٤ | تأكيد الباسورد | JS [[setCustomValidity]] | قاعدة بين حقلين، HTML مفيهوش attribute ليها |
| ٥ | السن ١٦–٩٩ | HTML [[type="number" min="16" max="99"]] + السيرفر | HTML عنده القاعدة جاهزة |
| ٦ | متبعتش مرتين | JS [[disabled]] + السيرفر (unique على الإيميل) | الزرار بيمنع الدوسة، والسيرفر بيمنع لو الطلب اتكرر من الشبكة |
| ٧ | الرسالة بالعربي | JS [[setCustomValidity]] | رسايل المتصفح بلغة المتصفح نفسه مش لغة الصفحة |
| ٨ | ١٠٠ حساب في دقيقة | السيرفر بس (rate limit) | أي حاجة في المتصفح سهل تتشال |

**القاعدة:** كل حاجة مهمة بتتكتب في السيرفر. المتصفح بيكررها عشان اليوزر يعرف غلطته بسرعة من غير ما يستنى.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<input type="email" required>]] و [[<input type="tel" pattern="01[0125][0-9]{8}">]] (مش required). إيه الـ flags اللي هتبقى [[true]] في [[validity]] لكل قيمة: الإيميل [[""]] و [[sara@]] و [[a@b]]، والموبايل [[""]] و [[0123]] و [[01012345678]]؟`, done: R`كتبت توقعك لكل قيمة، وجرّبت في Console بـ [[input.value = ...; input.validity]]، وعرفت ليه [[a@b]] صح والموبايل الفاضي صح.`, sol: R`~~~js Console
const v = (el) => Object.keys(Object.getPrototypeOf(el.validity)).filter((k) => el.validity[k]);
email.value = "sara@"; v(email);
~~~

~~~text Chrome 158
الإيميل ""            ['valueMissing']
الإيميل "sara@"       ['typeMismatch']
الإيميل "a@b"         ['valid']
الموبايل ""            ['valid']
الموبايل "0123"        ['patternMismatch']
الموبايل "01012345678" ['valid']
~~~

- **[[a@b]] صح:** [[type="email"]] بيطلب حاجة قبل وبعد الـ [[@]] بس، والدومين من غير نقطة مقبول (زي [[admin@localhost]]). عايز نقطة؟ [[pattern]] أو السيرفر.
- **الموبايل الفاضي صح:** [[pattern]] و [[minlength]] مبيتشيكوش على القيمة الفاضية. «فاضي» شغلة [[required]] بس. فحقل اختياري بـ [[pattern]] معناه «لو كتبت، اكتب صح».
- **[[valid]]** هو نفسه flag: [[true]] لما كل التانيين [[false]].
- **[[Object.keys(Object.getPrototypeOf(el.validity))]]:** الـ flags getters على الـ prototype مش على الـ object نفسه، فـ [[Object.keys(el.validity)]] بيرجّع [[[]]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم طلب أكل بيتبعت بـ [[fetch]]، واليوزرز بيشتكوا إن الطلب بيتسجّل مرتين وتلاتة. الكود: [[form.addEventListener("submit", async (e) => { e.preventDefault(); const res = await fetch("/api/order", { method: "POST", body: new FormData(form) }); msg.textContent = res.ok ? "تم" : "غلط"; });]]. أثبت المشكلة بالأرقام وصلّحها.`, done: R`قبل: ٣ دوسات = ٣ طلبات في Network. بعد: ٣ دوسات = طلب واحد، والزرار بيرجع يشتغل بعد الرد حتى لو الشبكة وقعت.`, sol: R`**الإثبات:** Network مفتوح، والسيرفر بطيء (أو Network › Throttling › Slow 4G)، ودوس الزرار ٣ مرات.

~~~text Chrome 158 على فورم الدرس، مع السيرفر اللي بيتأخر 800ms
من غير button.disabled:  ٣ دوسات ← 3 طلبات لـ /api/signup
مع button.disabled:      ٣ دوسات ← 1 طلب، و button.disabled = true و aria-busy="true" وقت الانتظار
~~~

~~~js js/app.js (التصليح)
const button = form.querySelector("button[type=submit]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (button.disabled) return;
  button.disabled = true;
  form.setAttribute("aria-busy", "true");
  try {
    const res = await fetch("/api/order", { method: "POST", body: new FormData(form) });
    msg.textContent = res.ok ? "تم" : "غلط";
  } catch {
    msg.textContent = "مفيش اتصال، جرّب تاني";
  } finally {
    button.disabled = false;
    form.removeAttribute("aria-busy");
  }
});
~~~

- **[[button.disabled = true]] قبل [[await]]:** لازم قبل أول [[await]]. لو بعده، الدوسة التانية بتلحق تدخل وانت مستني.
- **[[if (button.disabled) return]]:** حماية زيادة. قست Enter في حقل والزرار [[disabled]]: الـ [[submit]] event محصلش خالص (المتصفح مبيعملش implicit submission لو زرار الإرسال متقفل). بس لو الفورم فيه أكتر من زرار submit، أو حد نادى [[form.requestSubmit()]] من كود تاني، السطر ده هو اللي بيمنع.
- **[[finally]]:** من غيره، لو الشبكة وقعت الزرار هيفضل متقفل للأبد واليوزر مش هيقدر يحاول تاني.
- **والسيرفر برضه:** طلب الأكل يتعمله id فريد في الفورم ([[<input type="hidden" name="key">]] بقيمة [[crypto.randomUUID()]]) والسيرفر يرفض نفس الـ key مرتين. ده لأن الطلب ممكن يتكرر من الشبكة نفسها من غير دوسة.` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم تغيير باسورد: «الباسورد الجديد» ([[minlength="8"]]) و «تأكيده». لو التأكيد مش زي الجديد: رسالة «الباسوردين مش زي بعض» على حقل التأكيد، بالعربي، والإطار أحمر بعد ما يلمسه بس. والرسالة تختفي أول ما يصلّح، حتى لو صلّح الحقل **الأول** مش التاني.`, done: R`«abcd1234» و «abcd1235» بيدي الرسالة على التأكيد، وتعديل الأول لـ «abcd1235» بيشيلها، و [[form.checkValidity()]] بيرجّع [[true]] بعدها.`, sol: R`~~~live 250 جرّب باسوردين مختلفين، وبعدين صلّح أي واحد فيهم
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  form { display: grid; gap: 4px; max-width: 300px; }
  label { font-weight: 700; margin-top: 6px; }
  input { font: inherit; padding: 6px 8px; border: 2px solid #cbd5e1; border-radius: 6px; }
  input:user-invalid { border-color: #dc2626; }
  .err { color: #b91c1c; min-height: 1.6em; margin: 0; font-size: .9rem; }
  button { margin-top: 8px; font: inherit; padding: 8px; }
</style>
<form id="pw-form">
  <label for="pw">الباسورد الجديد</label>
  <input id="pw" name="pw" type="password" required minlength="8" autocomplete="new-password">
  <label for="pw2">تأكيده</label>
  <input id="pw2" name="pw2" type="password" required autocomplete="new-password" aria-describedby="pw2-err">
  <p class="err" id="pw2-err" aria-live="polite"></p>
  <button>غيّر الباسورد</button>
</form>
<script>
  const form = document.querySelector("#pw-form");
  const pw = form.elements.pw, pw2 = form.elements.pw2, err = document.querySelector("#pw2-err");
  form.noValidate = true;
  function match() {
    const bad = pw2.value !== "" && pw2.value !== pw.value;
    pw2.setCustomValidity(bad ? "الباسوردين مش زي بعض" : "");
    err.textContent = bad ? pw2.validationMessage : "";
  }
  pw.addEventListener("input", match);
  pw2.addEventListener("input", match);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    match();
    if (form.reportValidity()) err.textContent = "اتغيّر (تجربة)";
  });
</script>
~~~

- **[[match()]] على الحقلين:** القاعدة بين حقلين، فلازم تتفحص لما **أي واحد** يتغيّر. لو على التأكيد بس، تصليح الأول مش هيشيل الرسالة (دي الغلطة الشايعة).
- **[[pw2.value !== ""]]:** وهو فاضي مش «مختلف»؛ ده شغل [[required]]. من غيره الرسالة بتظهر وانت لسه بتكتب أول حقل.
- **الرسالة في الصفحة كمان** ([[.err]] بـ [[aria-live="polite"]] و [[aria-describedby]]): الفقاعة بتظهر وقت الإرسال بس، والنص تحت الحقل بيفضل ظاهر وانت بتكتب.

~~~text اتقاس (Chrome 158، الصفحة نفسها)
pw="abcd1234"  pw2="abcd1235"  ← validationMessage = «الباسوردين مش زي بعض»، checkValidity = false
غيّرت pw لـ "abcd1235"         ← validationMessage = ""، checkValidity = true، النص اختفى
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** يوزرز كتير بيكتبوا الموبايل من كيبورد عربي فبيطلع [[٠١٠١٢٣٤٥٦٧٨]]، والفورم بيرفضه ([[patternMismatch]]) مع إن الرقم صح. خلّي الحقل يقبل الأرقام العربي (والفارسي) ويبعت للسيرفر أرقام إنجليزي، من غير ما تغيّر الـ [[pattern]].`, done: R`كتابة [[٠١٠١٢٣٤٥٦٧٨]] بتتحوّل في الحقل لـ [[01012345678]] وانت بتكتب، والـ validity بقى [[valid]]، والقيمة اللي في [[FormData]] إنجليزي. والمؤشر مبيقفزش لآخر الحقل لو بتعدّل في النص.`, sol: R`~~~live 160 اكتب ٠١٠١٢٣٤٥٦٧٨ بالأرقام العربي
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 6px 8px; border: 2px solid #cbd5e1; border-radius: 6px; direction: ltr; }
  input:user-invalid { border-color: #dc2626; }
  input:user-valid { border-color: #16a34a; }
</style>
<label for="phone">الموبايل</label>
<input id="phone" name="phone" type="tel" pattern="01[0125][0-9]{8}" inputmode="numeric" autocomplete="tel">
<p id="out" dir="ltr"></p>
<script>
  const phone = document.querySelector("#phone");
  // ٠ = U+0660 لحد ٩، و ۰ (فارسي) = U+06F0 لحد ۹: نحوّل الاتنين لـ 0-9
  function toLatin(s) {
    return s.replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660).replace(/[۰-۹]/g, (d) => d.charCodeAt(0) - 0x06f0);
  }
  phone.addEventListener("input", () => {
    const latin = toLatin(phone.value);
    if (latin !== phone.value) {
      const pos = phone.selectionStart;
      phone.value = latin;
      phone.setSelectionRange(pos, pos);
    }
    document.querySelector("#out").textContent = phone.value + " → " + (phone.validity.valid ? "valid" : "patternMismatch");
  });
</script>
~~~

- **[[[٠-٩]]]:** range في الـ regex من حرف ٠ لحرف ٩ العربي (code points من [[0x0660]] لـ [[0x0669]])، و [[d.charCodeAt(0) - 0x0660]] بيرجّع الرقم من ٠ لـ ٩. والدالة اللي في [[replace]] رقمها بيتحوّل لنص لوحده.
- **[[selectionStart]] و [[setSelectionRange]]:** لما تكتب [[value]] من JS المؤشر بيقفز للآخر. بنحفظ مكانه ونرجّعه. الطول مبيتغيّرش (حرف بحرف)، فنفس المكان صح.
- **[[if (latin !== phone.value)]]:** متكتبش [[value]] لو مفيش تغيير، عشان متلخبطش الكتابة العادية.
- **[[direction: ltr]]** للحقل: الرقم يتقري من الشمال زي ما بيتكتب.
- **مين يعمل إيه:** HTML لسه صاحب القاعدة ([[pattern]])، و JS بينضّف المُدخل قبل ما القاعدة تتطبق، والسيرفر لازم يعمل نفس التحويل لأن الطلب ممكن ييجي من غير الصفحة.

~~~text اتقاس (Chrome 158، page.fill بالأرقام العربي)
كتبت "٠١٠١٢٣٤٥٦٧٨"  ← القيمة "01012345678"   validity.valid = true
كتبت "۰۱۲۳۴۵۶۷۸۹۰"  ← القيمة "01234567890"   valid (فارسي، اتحوّل برضه)
كتبت "۰۱۳۳۴۵۶۷۸۹۰"  ← القيمة "01334567890"   patternMismatch (التالت لازم 0 أو 1 أو 2 أو 5)
كتبت ٥ في نص "0101234"  ← "01501234" والمؤشر فضل بعد الـ 5 (selectionStart = 3)
~~~` },
          ],
          ref: [
            { t: "MDN: Client-side form validation", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation" },
            { t: "MDN: Constraint validation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation" },
            { t: "MDN: ValidityState", url: "https://developer.mozilla.org/en-US/docs/Web/API/ValidityState" },
            { t: "MDN: HTMLInputElement.setCustomValidity()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity" },
            { t: "MDN: HTMLFormElement.reportValidity()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity" },
            { t: "MDN: HTMLFormElement.noValidate", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/noValidate" },
            { t: "MDN: :user-invalid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid" },
            { t: "MDN: Sending forms through JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript" },
            { t: "MDN: FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData" },
            { t: "MDN: pattern", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/pattern" },
          ],
          pre: [{ to: "css/Constraint Validation API", why: R`[[validity]] و [[setCustomValidity]] من ناحية HTML` }, { to: "css/:checked و :invalid", why: R`الفرق بين [[:invalid]] و [[:user-invalid]]` }, { to: "js/FormData و URLSearchParams", why: R`قراية الفورم وبعته` }, { to: "js/تشغّل المشروع وتعرضه: سيرفر محلي ونشر", why: R`الـ [[server.mjs]] اللي بنزوّد عليه الـ API` }],
          deep: {
            why: R`الفورم هو المكان اللي فلوس وبيانات الناس بتعدّي منه، وأي غلطة فيه بتبان على طول: رسالة إنجليزي في موقع عربي، أو طلب اتسجّل مرتين، أو فورم أحمر قبل ما حد يكتب، أو فورم مبيتبعتش لأن سكربت وقع. لما كل قاعدة في مكانها الصح، الفورم بيشتغل في أسوأ الظروف وبيبقى مريح في أحسنها.`,
            how: R`كل [[input]] بيحسب [[validity]] من الـ attributes بتاعته كل ما القيمة تتغيّر. [[setCustomValidity(msg)]] بيزوّد flag اسمه [[customError]] لحد ما يتمسح بـ [[""]]. لما الفورم يتبعت من غير [[noValidate]]، المتصفح بيفحص كل الحقول، ولو فيه غلط بيعرض الفقاعة ومبيبعتش [[submit]] event خالص. ومع [[noValidate]] الـ event بيحصل والكود بيقرر بـ [[reportValidity()]]. و [[:user-invalid]] بيطابق بس بعد ما اليوزر يغيّر القيمة ويسيب الحقل، أو بعد محاولة إرسال (حتى من [[reportValidity()]]).`,
            when: R`HTML لكل قاعدة ليها attribute. JS لما محتاج رسايل بلغة الصفحة، أو قاعدة بين حقلين، أو إرسال من غير reload، أو تنضيف المُدخل (الأرقام العربي). السيرفر لكل قاعدة من غير استثنا، وللحاجات اللي المتصفح ميعرفهاش (موجود، متاح، مسموح). [[:user-invalid]] بدل [[:invalid]] في أي فورم جديد.`,
            mistakes: R`[[setCustomValidity]] من غير ما تمسح الأول، فالحقل يفضل invalid. كود الرسايل في [[submit]] من غير [[noValidate]] فمبيتنفّذش. [[novalidate]] مكتوب في الـ HTML فالفورم من غير JS بيبعت أي حاجة. [[:invalid]] فالفورم أحمر من الأول. قفل الزرار بعد [[await]]. نسيان [[finally]]. الاعتماد على [[type="email"]] كأنه تحقق كامل. السيرفر بيصدّق المتصفح. قاعدة بين حقلين بتتفحص من ناحية واحدة بس.`,
          },
        },
        {
          cmd: "الحركة: CSS بيتحرك و JS بيقول إمتى",
          title: "إشعار بيدخل ويخرج: الحركة في CSS، و JS بيحط class ويستنى transitionend أو finished، و prefers-reduced-motion في الاتنين",
          desc: R`أغلب الحركة في صفحة بتبقى **transition في CSS** و **class بيحطه JS**: JS بيقول «الإشعار ظهر» ([[classList.add("is-visible")]]) و CSS بيقول «يدخل من تحت في ٢٠٠ms». ولما JS محتاج يعمل حاجة **بعد** الحركة (يشيل العنصر)، بيستنى [[transitionend]] أو [[el.getAnimations()]] و [[finished]].
• عنصر لسه داخل الصفحة مبيعملش transition من «مكانش موجود»: الحل [[@starting-style]] في CSS.
• [[prefers-reduced-motion: reduce]]: الـ CSS بيشيل الحركة، و JS لازم يعرف ([[matchMedia]])، لأن [[transitionend]] مبيجيش لو مفيش transition، والكود اللي مستنيه بيعلق.
• الحركة اللي أرقامها بتتحسب وقت التشغيل أو محتاجة تحكم: [[element.animate()]] (Web Animations API).`,
          example: R`<button class="js-show" type="button">احفظ</button>
<div class="toast" role="status"></div>
<style>
  .toast { position: fixed; inset-block-end: 16px; inset-inline-start: 16px; padding: 10px 16px; border-radius: 8px; background: #0f172a; color: #fff; opacity: 0; translate: 0 20px; transition: opacity .2s, translate .2s; }
  .toast.is-visible { opacity: 1; translate: 0 0; }
  @media (prefers-reduced-motion: reduce) { .toast { transition: none; } }
</style>
<script>
  const toast = document.querySelector(".toast");
  document.querySelector(".js-show").addEventListener("click", async () => {
    toast.textContent = "اتحفظ ✓";
    toast.classList.add("is-visible");
    await new Promise((r) => setTimeout(r, 2000));
    toast.classList.remove("is-visible");
    await Promise.all(toast.getAnimations().map((a) => a.finished));
    toast.textContent = "";
  });
</script>`,
          try: R`شغّل المثال ودوس «احفظ». وبعدين من DevTools › Ctrl+Shift+P › «Rendering» › Emulate CSS media feature prefers-reduced-motion › reduce، ودوس تاني: الإشعار لسه بيظهر ويختفي؟ وبيختفي النص في الآخر؟ وجرّب تبدّل سطر [[getAnimations]] بـ [[await new Promise((r) => toast.addEventListener("transitionend", r, { once: true }))]]: إيه اللي بيحصل في الوضعين؟`,
          sol: R`~~~text Chrome 158، الصفحة من سيرفر
عادي:     opacity 0 ← 1 في 200ms، وبعد ثانيتين 1 ← 0، وبعدها النص اتمسح
reduce:   بيظهر ويختفي فورًا من غير حركة، والنص اتمسح برضه
بـ transitionend + reduce:  الإشعار اختفى بس النص «اتحفظ ✓» فضل في الـ DOM، والكود اللي بعد الـ await متنفّذش أبدًا
~~~

[[getAnimations()]] بيرجّع [[[]]] لما مفيش transition، و [[Promise.all([])]] بتتحل على طول، فالكود بيكمّل. أما [[transitionend]] فحدث بيحصل **لما transition تخلص**، ولو مفيش transition مفيش حدث، والـ Promise بتفضل مستنية للأبد. ده باج حقيقي بيحصل للناس اللي مفعّلين «تقليل الحركة» بس، فمحدش بياخد باله منه.`,
          teach: R`## الفكرة

كورس CSS علمك [[transition]] و [[@keyframes]]، ودرس «Web Animations API» علمك [[element.animate()]]. السؤال هنا: **مين يملك الحركة؟** القاعدة: الـ CSS بيوصف الحركة (المدة والـ easing والشكل قبل وبعد)، و JS بيقول **إمتى** (يحط ويشيل class) وبيستنى لو محتاج يعمل حاجة بعدها. كله اتجرّب في Chrome 158.

---

## ١. المثال: إشعار بيدخل ويخرج

~~~live 140 دوس «احفظ»
<button class="js-show" type="button">احفظ</button>
<div class="toast" role="status"></div>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .toast { position: fixed; inset-block-end: 16px; inset-inline-start: 16px; padding: 10px 16px; border-radius: 8px; background: #0f172a; color: #fff; opacity: 0; translate: 0 20px; transition: opacity .2s, translate .2s; }
  .toast.is-visible { opacity: 1; translate: 0 0; }
  @media (prefers-reduced-motion: reduce) { .toast { transition: none; } }
</style>
<script>
  const toast = document.querySelector(".toast");
  document.querySelector(".js-show").addEventListener("click", async () => {
    toast.textContent = "اتحفظ ✓";
    toast.classList.add("is-visible");
    await new Promise((r) => setTimeout(r, 2000));
    toast.classList.remove("is-visible");
    await Promise.all(toast.getAnimations().map((a) => a.finished));
    toast.textContent = "";
  });
</script>
~~~

- **CSS:** الشكل المخفي ([[opacity: 0]] و [[translate: 0 20px]]) والشكل الظاهر ([[.is-visible]])، و [[transition]] بين الاتنين في ٢٠٠ms. **مفيش ولا رقم حركة في الـ JS.**
- **JS:** [[add("is-visible")]] ثم ثانيتين ثم [[remove]]، وبعدين بيستنى الحركة تخلص قبل ما يمسح النص.
- **[[role="status"]]:** قارئ الشاشة بيقول «اتحفظ ✓» لما النص يتكتب. الحركة للعين، والنص للكل.

---

## ٢. تستنى الحركة تخلص: [[transitionend]] ولا [[finished]]؟

~~~text Chrome 158 (تاب ظاهر): الإشعار بيختفي، والكود بيستنى قبل ما يمسح النص
                          transition عادي                     prefers-reduced-motion: reduce
transitionend:            اتنده مرتين (opacity و translate)    ولا مرة، والكود اللي مستنيه علق
getAnimations():          [CSSTransition, CSSTransition]      []
Promise.all(...finished): اتحلت بعد 203ms                     اتحلت بعد 0ms
~~~

> اتقاس في تاب **ظاهر**. التاب اللي في الخلفية المتصفح بيوقّف فيه رسم الـ frames، فالحركات بتقف في نصها والأرقام بتطلع غلط. قيس الحركة وانت شايف الصفحة.

- **[[transitionend]]** بيتبعت مرة **لكل خاصية** بتتحرك (هنا اتنين: [[opacity]] و [[translate]])، فلو بتعدّهم أو مش بتستخدم [[{ once: true }]] هتشتغل مرتين. وبيتبعت بس لو الـ transition حصلت وخلصت فعلًا.
- **[[el.getAnimations()]]** بيرجّع كل الحركات الشغالة على العنصر: CSS transitions و CSS animations و [[animate()]]، كلهم objects من نوع [[Animation]] وفيهم [[finished]] (Promise). ولو مفيش حركة بيرجّع [[[]]] و [[Promise.all([])]] بتتحل فورًا. **ده الأأمن.**
- **قراية [[getAnimations()]] لازم بعد تغيير الـ class:** المتصفح بيعمل الـ transition أول ما يحسب الـ style الجديد، و [[getAnimations()]] نفسها بتجبره يحسبه، فالحركة بتظهر في اللستة على طول.

---

## ٣. عنصر جديد مبيتحركش: [[@starting-style]]

لو JS عمل عنصر وحطه في الصفحة **وفي نفس اللحظة** حط عليه [[is-visible]]، المتصفح مبيشوفش «قبل» للعنصر، فبيرسمه على طول في الشكل الأخير من غير transition:

~~~text Chrome 158: document.body.append(el); el.classList.add("is-visible"); ثم el.getAnimations().length
من غير @starting-style:  0   (ظهر فجأة)
مع @starting-style:      2   (opacity و translate اتحركوا من قيم @starting-style)
~~~

~~~css
.toast.is-visible {
  opacity: 1;
  translate: 0 0;
  @starting-style {
    opacity: 0;
    translate: 0 20px;
  }
}
~~~

[[@starting-style]] بيقول للمتصفح «لما العنصر ده يترسم لأول مرة، اعتبر إنه كان كده»، فالـ transition بتشتغل من القيم دي. الحل القديم كان قراية [[el.offsetWidth]] (تجبر المتصفح يحسب) أو [[requestAnimationFrame]] مرتين قبل ما تحط الـ class.

---

## ٤. [[prefers-reduced-motion]]: في CSS وفي JS

ناس كتير بيدوخوا أو بيتشتتوا من الحركة، فبيفعّلوا «تقليل الحركة» في الويندوز أو الموبايل. الصفحة بتعرف بـ media query:

~~~css
@media (prefers-reduced-motion: reduce) { .toast { transition: none; } }
~~~

~~~js
const calm = matchMedia("(prefers-reduced-motion: reduce)");
calm.matches;                                   // true أو false دلوقتي
calm.addEventListener("change", () => { … });   // لو اليوزر غيّرها والصفحة مفتوحة
~~~

~~~text Chrome 158 بـ Rendering › Emulate prefers-reduced-motion
no-preference:  matchMedia(...).matches = false   transition-duration = 0.2s, 0.2s
reduce:         matchMedia(...).matches = true    transition-duration = 0s
~~~

- **في CSS:** شيل أو قصّر الحركة. ومش لازم تشيل كل حاجة: تغيّر الـ [[opacity]] مريح عادة، الحركة اللي بتنقل أو بتكبّر هي المشكلة.
- **في JS:** أي حركة بـ [[animate()]] أو [[scrollIntoView({ behavior: "smooth" })]] أو عدّاد بيعدّ، JS هو اللي لازم يقرر، لأن الـ CSS مش شايفها.

---

## ٥. مين يملك إيه

| الحالة | الحركة في | JS بيعمل |
|---|---|---|
| hover و focus | CSS لوحده ([[:hover]] و [[transition]]) | ولا حاجة |
| حاجة بتفتح وتقفل (قايمة، إشعار) | CSS ([[transition]] على class) | يحط ويشيل الـ class، ويستنى [[finished]] لو هيشيل العنصر |
| عنصر بيدخل الصفحة | CSS ([[@starting-style]]) | [[append]] بس |
| حركة أرقامها من JS (روح للمكان اللي اتداس، سحب) | [[element.animate()]] | كل حاجة، ويحترم [[matchMedia]] |
| حركة بتتكرر (loading) | CSS [[@keyframes]] | يحط class [[is-loading]] |

**ليه مش [[setInterval]] يغيّر [[style.left]]؟** بيشتغل على الـ main thread مع كل الكود التاني، ومش مربوط بالـ frames فبيتقطع، وبيعمل layout في كل خطوة، والـ CSS مش شايفه فـ [[prefers-reduced-motion]] مش هتأثر. transitions و [[animate()]] على [[transform]] و [[opacity]] المتصفح بيشغّلها على الـ compositor.

---

## الخلاصة

اللي ميتلخبطش: الحركة في CSS، و JS بيحط class. استنى بـ [[Promise.all(el.getAnimations().map((a) => a.finished))]] مش [[transitionend]] ولا [[setTimeout]] بنفس المدة. عنصر جديد يحتاج [[@starting-style]]. و [[prefers-reduced-motion]] في CSS للـ transitions، وفي [[matchMedia]] لأي حركة JS بيعملها.`,
          lines: [
            R`الزرار اللي بيعرض الإشعار، بـ hook اسمه [[js-show]]`,
            R`مكان الإشعار فاضي، و [[role="status"]] عشان قارئ الشاشة يقول النص لما يتكتب`,
            R`بداية الـ CSS: الحركة كلها هنا مش في الـ JS`,
            R`الإشعار في الركن تحت، ومخفي ([[opacity: 0]] ونازل ٢٠px)، و [[transition]] بيقول إن أي تغيير في الاتنين ياخد ٢٠٠ms`,
            R`الشكل الظاهر: شفافية كاملة وفي مكانه. الـ transition بتحرّكه من فوق لهنا ومن هنا لفوق`,
            R`لو اليوزر طالب حركة أقل: مفيش transition، فالإشعار بيظهر ويختفي فورًا`,
            R`نهاية الـ CSS: قاعدتين للحالتين وقاعدة للحركة الهادية`,
            R`بداية الـ JS، بعد العناصر`,
            R`بنمسك الإشعار مرة واحدة ونستخدمه في كل دوسة`,
            R`مع كل دوسة على الزرار: دالة [[async]] عشان هنستنى وقت وحركة`,
            R`نكتب النص الأول، فقارئ الشاشة يقوله`,
            R`نحط الحالة الظاهرة، والـ CSS بيحرّكه لجوه`,
            R`نستنى ثانيتين والإشعار ظاهر`,
            R`نشيل الحالة، والـ CSS بيحرّكه لبرّه`,
            R`نستنى كل الحركات اللي على العنصر تخلص. لو مفيش حركة (reduce) اللستة فاضية وبنكمّل على طول`,
            R`بعد ما اختفى خالص نمسح النص، عشان قارئ الشاشة ميلاقيش نص قديم`,
            R`قفلة الـ listener`,
            R`نهاية الـ JS: مفيش ولا مدة ولا مسافة هنا، كله في CSS`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.box { opacity: 0; transition: opacity .3s; } .box.on { opacity: 1; }]] و JS: [[const el = document.createElement("div"); el.className = "box"; document.body.append(el); el.classList.add("on"); console.log(el.getAnimations().length);]]. هيطبع كام؟ وهتشوف حركة؟ وإيه اللي يتغيّر لو قبل [[add]] كتبت [[el.offsetWidth;]]؟`, done: R`توقعت، وجرّبت النسختين، وعرفت ليه [[offsetWidth]] بتفرق، وعرفت الحل الحديث.`, sol: R`~~~text Chrome 158
من غير offsetWidth:   0   والعنصر ظهر فجأة
مع el.offsetWidth;:   1   وفيه حركة من 0 لـ 1 في 300ms
~~~

- **من غيرها:** العنصر اتضاف واتحط عليه [[on]] قبل ما المتصفح يحسب الـ style بتاعه ولو مرة. أول حساب بيلاقيه [[opacity: 1]] على طول، ومفيش «قيمة قديمة» يعمل منها transition.
- **[[el.offsetWidth]]:** قراية مقاس بتجبر المتصفح يحسب الـ style والـ layout **دلوقتي**، فبيتسجّل إن الـ opacity كانت 0. بعدها [[add("on")]] تغيير حقيقي، فالـ transition بتشتغل. اسمها «forced reflow»، وبتكلّف لو اتعملت كتير.
- **الحل الحديث من غير JS:** [[@starting-style { .box.on { opacity: 0; } }]] (أو جوه القاعدة نفسها). جرّبته على نفس الـ [[.box]]: [[getAnimations().length]] = 1 من غير [[offsetWidth]].` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة جانبية (drawer) بتدخل من الجنب لما تدوس «☰ القايمة» وبتخرج بـ «اقفل» أو Escape. الحركة كلها CSS ([[translate]] على [[[aria-expanded]]] أو class)، و JS بيقلب الحالة بس. ومن غير حركة لو [[prefers-reduced-motion]]. وتدخل من اليمين في صفحة RTL.`, done: R`الـ JS مفيهوش أرقام ولا [[style]]، والقايمة داخلة من اليمين، و Escape بيقفلها ويرجّع الـ focus للزرار، و [[transition-duration]] بيبقى [[0s]] مع reduce.`, sol: R`~~~live 280 دوس «☰ القايمة»
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; min-height: 240px; }
  button { font: inherit; padding: 6px 12px; cursor: pointer; }
  .drawer { position: fixed; inset-block: 0; inset-inline-start: 0; width: min(260px, 80vw); padding: 16px; background: #0f172a; color: #fff;
    translate: 100% 0; visibility: hidden; transition: translate .25s ease-out, visibility 0s .25s; }
  .drawer.is-open { translate: 0 0; visibility: visible; transition: translate .25s ease-out; }
  .drawer a { color: #bae6fd; display: block; padding: 6px 0; }
  @media (prefers-reduced-motion: reduce) { .drawer, .drawer.is-open { transition: none; } }
</style>
<button class="js-open" type="button" aria-expanded="false" aria-controls="menu">☰ القايمة</button>
<nav class="drawer" id="menu" aria-label="القايمة">
  <button class="js-close" type="button">اقفل</button>
  <a href="#">الرئيسية</a><a href="#">المنتجات</a><a href="#">تواصل</a>
</nav>
<script>
  const openBtn = document.querySelector(".js-open");
  const drawer = document.querySelector("#menu");
  function setOpen(open) {
    drawer.classList.toggle("is-open", open);
    openBtn.setAttribute("aria-expanded", open);
    (open ? drawer.querySelector(".js-close") : openBtn).focus();
  }
  openBtn.addEventListener("click", () => setOpen(true));
  drawer.querySelector(".js-close").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) setOpen(false);
  });
</script>
~~~

- **[[translate: 100% 0]]:** في RTL الـ [[inset-inline-start]] هو اليمين، و [[100%]] بتزق القايمة لليمين برّه الشاشة بعرضها.
- **[[visibility: hidden]] مع تأخير [[0s .25s]]:** وهي مقفولة لازم تبقى مخفية عن الـ Tab وقارئ الشاشة، مش برّه الشاشة بس. التأخير بيخلي الإخفاء يحصل **بعد** ما الحركة تخلص، وفي الفتح [[visibility]] بتتغيّر فورًا.
- **الـ focus:** لما تفتح بيروح لـ «اقفل»، ولما تقفل بيرجع للزرار. والـ JS معندوش ولا رقم.

~~~text اتقاس (Chrome 158)
بعد الفتح:   translate = "0px", visibility = visible, focus على «اقفل»
Escape:      class is-open اتشال، والـ focus على «☰ القايمة»، و aria-expanded="false"
بعد 300ms:   visibility = hidden (Tab مبيدخلش جوه القايمة)
reduce:      transition-duration = 0s
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شكوى من يوزرز «تقليل الحركة» بس: «الكارت اللي بمسحه بيختفي بس بيفضل واخد مكانه». الكود: [[card.classList.add("is-leaving"); card.addEventListener("transitionend", () => card.remove());]] والـ CSS فيه [[@media (prefers-reduced-motion: reduce) { .card { transition: none; } }]]. أثبت السبب وصلّحه بحيث يشتغل في الوضعين.`, done: R`في الوضعين الكارت بيتمسح من الـ DOM ([[document.querySelectorAll(".card").length]] بيقل)، ومن غير [[setTimeout]].`, sol: R`~~~live 200 دوس «امسح» على أي كارت
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .card { display: flex; justify-content: space-between; padding: 8px 12px; margin-bottom: 8px; border: 1px solid #cbd5e1; border-radius: 8px; transition: opacity .25s, translate .25s; }
  .card.is-leaving { opacity: 0; translate: -30px 0; }
  @media (prefers-reduced-motion: reduce) { .card { transition: none; } }
</style>
<div class="list">
  <div class="card">إشعار ١ <button type="button">امسح</button></div>
  <div class="card">إشعار ٢ <button type="button">امسح</button></div>
  <div class="card">إشعار ٣ <button type="button">امسح</button></div>
</div>
<script>
  document.querySelector(".list").addEventListener("click", async (e) => {
    const card = e.target.closest("button")?.closest(".card");
    if (!card) return;
    card.classList.add("is-leaving");
    await Promise.all(card.getAnimations().map((a) => a.finished));
    card.remove();
  });
</script>
~~~

~~~text Chrome 158، الكود القديم والجديد، والوضعين
                       عادي                       reduce
transitionend القديم:   اتمسح بعد 250ms             transitionend متبعتش، الكارت فضل (مخفي بس واخد مكانه)
getAnimations الجديد:  اتمسح بعد 250ms             اتمسح على طول
~~~

- **السبب:** مع [[transition: none]] مفيش transition، فـ [[transitionend]] مبيحصلش، فـ [[remove()]] متنفّذتش. الكارت [[opacity: 0]] بس لسه في الـ layout.
- **التصليح:** [[getAnimations()]] بيرجّع اللي شغال فعلًا. في reduce اللستة فاضية و [[Promise.all([])]] بتتحل فورًا.
- **مش [[setTimeout(…, 250)]]:** المدة مكتوبة في مكانين، وأول ما حد يغيّر الـ CSS لـ [[.4s]] الكارت هيتمسح قبل ما الحركة تخلص.
- **ولا [[transitionend]] مع فحص [[matchMedia]]:** بيشتغل، بس لو حد شال الـ transition لسبب تاني (أو المدة [[0s]] من theme) هيعلق تاني.` },
            { lvl: 'تحدي', t: R`**ابني:** عدّاد في صفحة «إحصائيات» بيعدّ من ٠ لـ ١٢٥٠ عميل في ثانية لما يظهر على الشاشة، وبالأرقام العربي. مع [[prefers-reduced-motion]] الرقم يظهر نهائي على طول. وقارئ الشاشة يقرا الرقم النهائي بس، مش ١٢٥٠ رقم.`, done: R`العدّاد بيبدأ لما يبان (مش وقت تحميل الصفحة)، وبيخلص على ١٬٢٥٠ بالظبط، ومع reduce بيبان ١٬٢٥٠ على طول، والرقم اللي بيتغيّر [[aria-hidden]] والنهائي في نص لقارئ الشاشة.`, sol: R`~~~live 260 انزل لتحت عشان العدّاد يبان
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .spacer { height: 300px; color: #64748b; }
  .stat { font-size: 2.5rem; font-weight: 800; color: #1d4ed8; font-variant-numeric: tabular-nums; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
<p class="spacer">انزل ↓</p>
<p><span class="stat js-count" data-to="1250" aria-hidden="true">٠</span> عميل
  <span class="sr-only">1250</span></p>
<script>
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  const fmt = new Intl.NumberFormat("ar-EG");
  function run(el) {
    const to = Number(el.dataset.to);
    if (calm.matches) { el.textContent = fmt.format(to); return; }
    const start = performance.now(), ms = 1000;
    function frame(now) {
      const t = Math.min((now - start) / ms, 1);
      el.textContent = fmt.format(Math.round(to * (1 - (1 - t) ** 3)));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
  });
  document.querySelectorAll(".js-count").forEach((el) => io.observe(el));
</script>
~~~

- **ليه JS هنا مش CSS:** الحركة **نص بيتغيّر** مش خاصية CSS، فمفيش transition تعملها. فـ JS بيملكها كلها، وبالتالي هو اللي لازم يقرا [[matchMedia]].
- **[[requestAnimationFrame]]** بيشغّل الدالة قبل كل رسمة، و [[now]] وقتها بالـ ms. [[t]] من ٠ لـ ١، و [[1 - (1 - t) ** 3]] بيبدأ سريع ويبطّأ (ease-out). و [[Math.min(..., 1)]] بيضمن إن آخر رقم ١٢٥٠ بالظبط.
- **[[IntersectionObserver]]** بيبدأ العدّ لما العنصر يبان بس، ومرة واحدة ([[unobserve]]).
- **قارئ الشاشة:** الرقم المتحرك [[aria-hidden="true"]]، والنهائي في [[.sr-only]] (مخفي للعين بس). من غير كده ممكن يقرا «٣٧٢» في نص العدّ.
- **[[tabular-nums]]:** كل الأرقام نفس العرض، فالكلمة اللي بعده متترعشش وهو بيعدّ.

~~~text اتقاس (Chrome 158، تاب ظاهر)
                 قبل الـ scroll   بعده بربع ثانية   بعده بثانية ونص
عادي:            «٠»              «٧٤٢»             «١٬٢٥٠»
reduce:          «٠»              «١٬٢٥٠»           «١٬٢٥٠»
~~~` },
          ],
          ref: [
            { t: "MDN: Using CSS transitions", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using" },
            { t: "MDN: transitionend event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event" },
            { t: "MDN: Element.getAnimations()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations" },
            { t: "MDN: Animation.finished", url: "https://developer.mozilla.org/en-US/docs/Web/API/Animation/finished" },
            { t: "MDN: @starting-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style" },
            { t: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion" },
            { t: "MDN: Window.matchMedia()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia" },
            { t: "MDN: requestAnimationFrame()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" },
          ],
          pre: [{ to: "css/transition و @keyframes", why: R`الـ transition والـ keyframes نفسهم في CSS` }, { to: "js/Web Animations API: element.animate", why: R`الحركة من JS و [[Animation]] و [[finished]]` }, { to: "css/تكبير الخط و prefers-reduced-motion", why: R`ليه في ناس بتقفل الحركة، والـ media query في CSS` }],
          deep: {
            why: R`الحركة لما تتوزّع بين CSS و JS بتبقى صعبة تتصلّح: مدة مكتوبة في الاتنين، و [[setTimeout]] بيعدّ حركة اتغيّرت، وكود بيعلق للناس اللي مقللين الحركة بس. لما CSS يملك الحركة و JS يملك التوقيت والحالة، كل ملف فيه حاجة واحدة، والمصمم يغيّر المدة من غير ما يكسر حاجة.`,
            how: R`لما class يتغيّر، المتصفح بيحسب الـ style الجديد، ولكل خاصية عليها [[transition]] وقيمتها اتغيّرت بيعمل [[CSSTransition]] object من القيمة القديمة للجديدة. الـ object ده بيظهر في [[el.getAnimations()]] وفيه [[finished]]، ولما يخلص بيبعت [[transitionend]] لكل خاصية. لو [[transition: none]] أو المدة صفر، مفيش object ولا event. والعنصر اللي لسه داخل الصفحة ملوش قيمة قديمة، فمفيش transition إلا لو [[@starting-style]] أداله قيمة بداية.`,
            when: R`CSS [[transition]] لأي حالة بقيمتين (ظاهر ومخفي، مفتوح ومقفول). [[@keyframes]] لحركة بتتكرر. [[@starting-style]] لعنصر داخل. [[animate()]] لحركة أرقامها من JS أو محتاجة pause و reverse. [[requestAnimationFrame]] لحاجة مش خاصية CSS (نص بيتغيّر، canvas). و [[getAnimations()]] و [[finished]] كل ما تستنى حركة.`,
            mistakes: R`[[transitionend]] والكود يعلق مع reduce. [[transitionend]] من غير [[once]] فبيتنفّذ مرة لكل خاصية. [[setTimeout]] بنفس مدة الـ CSS. class على عنصر لسه متضاف ومفيش حركة. [[display: none]] في الحالة المخفية فالخروج مش بيتحرك. حركة برّه الشاشة بس والعناصر لسه بيوصلها Tab (نسيت [[visibility]]). عدّاد أو [[scrollIntoView]] smooth من غير [[matchMedia]].`,
          },
        },
        {
          cmd: "الـ responsive من التلاتة: CSS الأول",
          title: "الصفحة على كل المقاسات: الصور في HTML، والـ layout في CSS (media و container queries)، و JS للي CSS ميقدرش عليه بس (matchMedia و ResizeObserver)",
          desc: R`الـ responsive مش شغلة لغة واحدة، بس فيه ترتيب: **CSS الأول.**
• **HTML:** الصورة المناسبة للمقاس: [[srcset]] و [[sizes]] (المتصفح بيختار الحجم)، و [[<picture>]] (صورة مختلفة خالص على الموبايل). وده لازم في HTML لأن المتصفح بيبدأ يحمّل الصور قبل ما الـ CSS أو الـ JS يشتغلوا.
• **CSS:** كل الـ layout: [[@media]] على عرض الشاشة، و [[@container]] على عرض المكان اللي العنصر فيه، و [[clamp()]] و grid بـ [[auto-fit]].
• **JS:** بس للي CSS ميقدرش عليه: **سلوك** بيتغيّر مع المقاس ([[matchMedia]] و [[change]])، أو **أرقام** محتاجها في الكود (عرض canvas بـ [[ResizeObserver]]).
والغلطة المشهورة: [[window.addEventListener("resize")]] بيحط classes حسب [[innerWidth]]. الـ CSS بيعمل ده أسرع وأصح ومن أول رسمة.`,
          example: R`<img src="https://picsum.photos/id/30/800/600" srcset="https://picsum.photos/id/30/400/300 400w, https://picsum.photos/id/30/800/600 800w" sizes="(min-width: 768px) 50vw, 100vw" alt="كوباية على ترابيزة خشب" width="800" height="600">
<div class="cards"><article class="card"><h2>كوباية</h2><p>١٢٠ جنيه</p></article></div>
<style>
  img { max-width: 100%; height: auto; }
  .cards { container-type: inline-size; }
  @container (min-width: 420px) { .card { display: flex; gap: 12px; } }
</style>
<script>
  const wide = matchMedia("(min-width: 768px)");
  console.log("شاشة واسعة؟", wide.matches);
  wide.addEventListener("change", (e) => console.log("اتغيّرت:", e.matches));
  new ResizeObserver(([entry]) => console.log("عرض الكروت:", Math.round(entry.contentRect.width))).observe(document.querySelector(".cards"));
</script>`,
          try: R`حط المثال في صفحة على سيرفر محلي وافتح Console و Network. صغّر النافذة وكبّرها (أو Ctrl+Shift+M وغيّر العرض): إمتى [[change]] بيتطبع، وإمتى [[ResizeObserver]] بيطبع؟ وفي Network، أنهي صورة اتحمّلت على عرض 360 وأنهي على 1280؟ (اعمل Ctrl+Shift+R بعد كل تغيير مقاس عشان الكاش).`,
          sol: R`~~~text Chrome 158، الكاش مقفول
عرض 360:   Console: شاشة واسعة؟ false   عرض الكروت: 344     الصورة: 400/300
عرض 1280:  Console: شاشة واسعة؟ true    عرض الكروت: 1264    الصورة: 800/600
غيّرت العرض من 1280 لـ 700 على ٢٤ خطوة: «اتغيّرت: false» مرة واحدة بس (لما نزل تحت 768)، و «عرض الكروت» مع كل خطوة
~~~

- **[[change]]** بيتبعت لما الـ media query **تقلب** من true لـ false أو العكس بس، مش مع كل بيكسل. عشان كده هو اللي تستخدمه لتغيير سلوك.
- **[[ResizeObserver]]** بيتبعت مع كل تغيير في مقاس العنصر نفسه (حتى لو الشاشة متغيّرتش، زي لما sidebar يتفتح). ده لما محتاج الرقم نفسه.
- **الصورة:** على 360 الـ [[sizes]] قال [[100vw]] = 360px، فالمتصفح اختار أصغر صورة عرضها 360 أو أكتر: [[400w]]. على 1280 [[50vw]] = 640، فاختار [[800w]]. على شاشة بكثافة 2 (موبايل حديث) نفس الـ 360 كانت هتحتاج 720، فهيختار [[800w]] (التمرين التاني).`,
          teach: R`## الفكرة

كورس CSS علمك [[@media]] و [[@container]] و [[<picture>]] كل واحد لوحده. هنا السؤال: لما الصفحة لازم تتغيّر مع المقاس، **كل تغيير مكانه فين؟** والإجابة مبنية على حاجة واحدة: **مين بيعرف بدري.** المتصفح بيقرا الـ HTML الأول، وبيحسب الـ CSS قبل أول رسمة، و JS بيشتغل في الآخر. فالحاجة اللي لازم تبقى صح من أول لحظة، مكانها في الأبكر. كله اتجرّب في Chrome 158 على 360 و 768 و 1280.

---

## ١. صفحة فيها الأنواع التلاتة

~~~live 420 360 غيّر العرض من الزراير فوق (موبايل وتابلت وكامل)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #0f172a; }
  header { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: #0f172a; color: #fff; }
  .menu-btn { font: inherit; background: none; color: inherit; border: 1px solid #64748b; border-radius: 6px; padding: 2px 10px; }
  nav ul { list-style: none; margin: 0; padding: 0; }
  nav a { color: #bae6fd; }
  .nav-links { display: none; }
  .nav-links.is-open { display: block; position: absolute; inset-inline: 0; top: 44px; background: #1e293b; padding: 8px 16px; }
  @media (min-width: 768px) {
    .menu-btn { display: none; }
    .nav-links { display: flex; gap: 16px; position: static; background: none; padding: 0; }
  }
  main { padding: 16px; display: grid; gap: 16px; }
  @media (min-width: 768px) { main { grid-template-columns: 1fr 2fr; } }
  .cards { container-type: inline-size; display: grid; gap: 8px; }
  .card { padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px; }
  .card .thumb { width: 100%; aspect-ratio: 4 / 3; background: #bae6fd; border-radius: 6px; }
  @container (min-width: 420px) { .card { display: grid; grid-template-columns: 120px 1fr; gap: 12px; } }
  canvas { width: 100%; height: 80px; display: block; background: #f8fafc; border-radius: 8px; }
</style>
</head>
<body>
<header>
  <b>متجر</b>
  <nav aria-label="الأقسام">
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="links">القايمة</button>
    <ul class="nav-links" id="links"><li><a href="#">المنتجات</a></li><li><a href="#">العروض</a></li><li><a href="#">تواصل</a></li></ul>
  </nav>
</header>
<main>
  <section class="cards" aria-label="منتجات">
    <article class="card"><div class="thumb"></div><div><h2>كوباية</h2><p>١٢٠ جنيه</p></div></article>
    <article class="card"><div class="thumb"></div><div><h2>شنطة</h2><p>١٥٠ جنيه</p></div></article>
  </section>
  <section aria-label="المبيعات">
    <h2>المبيعات آخر أسبوع</h2>
    <canvas class="js-chart" role="img" aria-label="المبيعات: ٣ و ٧ و ٤ و ٩ و ٦ و ١٢ و ١٠"></canvas>
  </section>
</main>
<script>
  // ١. سلوك: القايمة على الموبايل بزرار. لما الشاشة تتسع، الحالة المفتوحة لازم تتقفل (CSS ميقدرش يغيّر attribute)
  const btn = document.querySelector(".menu-btn");
  const links = document.querySelector("#links");
  function setOpen(open) {
    links.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open);
  }
  btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
  matchMedia("(min-width: 768px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

  // ٢. رقم: الـ canvas محتاج عرضه بالبيكسل عشان يرسم صح، و CSS بيدي الشكل بس
  const canvas = document.querySelector(".js-chart");
  const data = [3, 7, 4, 9, 6, 12, 10];
  function draw(width) {
    const dpr = devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(80 * dpr);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = 8 + (i * (width - 16)) / (data.length - 1);
      const y = 72 - (v / 12) * 64;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.stroke();
  }
  new ResizeObserver(([entry]) => draw(entry.contentRect.width)).observe(canvas);
</script>
</body>
</html>
~~~

اقراها كتلات طبقات:

- **CSS عمل الـ layout كله:** الزرار والقايمة بيتبدّلوا عند 768 ([[@media]])، والـ main بيبقى عمودين، والكارت بيبقى أفقي لما **المكان بتاعه** يوصل 420px ([[@container]])، مش الشاشة. جرّب «تابلت»: الشاشة 768 والكروت في عمود ضيق، فالكارت فضل رأسي. ده اللي [[@media]] ميعرفش يعمله.
- **JS عمل حاجتين بس:**
  - **سلوك:** لو فتحت القايمة على الموبايل وبعدين الشاشة اتسعت، الـ CSS بيعرض اللينكات في الـ header، بس [[aria-expanded="true"]] و [[is-open]] لسه موجودين، ولما ترجع تصغّر القايمة هتبقى مفتوحة لوحدها. [[matchMedia(...).addEventListener("change")]] بيقفلها لما الشاشة تعدّي 768.
  - **رقم:** الـ [[<canvas>]] بيرسم بيكسلات. CSS بيكبّره ([[width: 100%]]) بس لو عدد البيكسلات اللي جواه ثابت الخط هيتمط ويبقى مشوّش. [[ResizeObserver]] بيدي العرض الحقيقي فيرسم بيه، ومضروب في [[devicePixelRatio]] عشان يبقى حاد على شاشات الموبايل.

~~~text اتقاس (Chrome 158)
                       360            768            1280
زرار القايمة           ظاهر           مخفي           مخفي
عرض .cards             313            240            406
الكارت                 رأسي           رأسي           رأسي (406 < 420)
canvas.width (dpr 1)   313            480            811
scrollWidth ≤ عرض الشاشة (مفيش scroll أفقي) في التلاتة
~~~

لاحظ إن الكارت عمره ما بقى أفقي هنا، حتى على 1280: مكانه في العمود الصغير 406 بس. لو حطيت نفس الكارت في صفحة تانية بعمود أعرض هيبقى أفقي لوحده. ده الـ container query.

~~~text فتحت القايمة على 360، ووسّعت لـ 1280، ورجعت 360
من غير سطر matchMedia:  القايمة رجعت مفتوحة لوحدها، و aria-expanded="true"
مع السطر:                القايمة مقفولة، و aria-expanded="false"
~~~

---

## ٢. HTML: الصورة الصح من الأول

~~~html
<img src="https://picsum.photos/id/30/800/600"
     srcset="https://picsum.photos/id/30/400/300 400w, https://picsum.photos/id/30/800/600 800w"
     sizes="(min-width: 768px) 50vw, 100vw"
     alt="كوباية على ترابيزة خشب" width="800" height="600">
~~~

- **[[srcset]]:** لستة صور بنفس المحتوى ومقاسات مختلفة، وجنب كل واحدة عرضها الحقيقي بالـ [[w]].
- **[[sizes]]:** الصورة هتتعرض بعرض قد إيه: لو الشاشة 768 أو أكتر نص الشاشة، وإلا الشاشة كلها. المتصفح لسه مقراش الـ CSS، فانت بتقوله.
- **المتصفح بيضرب** العرض ده في كثافة الشاشة ([[devicePixelRatio]]) ويختار أصغر صورة تكفي. والنتيجة في [[img.currentSrc]].
- **[[width]] و [[height]]:** نسبة الصورة، فالمتصفح يحجز مكانها قبل ما توصل (مفيش CLS). و [[height: auto]] في الـ CSS بيخليها تصغر مع العرض بنفس النسبة.

**ليه مش JS؟** لو JS هو اللي بيحط [[src]] حسب [[innerWidth]]، المتصفح مش هيبدأ يحمّل الصورة غير بعد ما الـ JS يتحمّل ويشتغل، فأهم صورة في الصفحة بتتأخر. الـ preload scanner في المتصفح بيقرا [[srcset]] وهو لسه بيقرا الـ HTML.

**[[<picture>]]** لما الصورة نفسها مختلفة (قص مربع على الموبايل وعريض على الكمبيوتر):

~~~html
<picture>
  <source media="(min-width: 768px)" srcset="https://picsum.photos/id/30/1200/500">
  <img src="https://picsum.photos/id/30/600/600" alt="كوباية على ترابيزة خشب" width="600" height="600">
</picture>
~~~

---

## ٣. CSS: [[@media]] ولا [[@container]]؟

| | [[@media (min-width: 768px)]] | [[@container (min-width: 420px)]] |
|---|---|---|
| بيسأل عن | عرض الشاشة كلها | عرض أقرب أب عليه [[container-type]] |
| مناسب لـ | layout الصفحة: كام عمود، الـ header | component بيتحط في أماكن مختلفة (كارت في main و sidebar) |
| محتاج | ولا حاجة | [[container-type: inline-size]] على الأب |
| اتقاس فوق على 768 | القايمة بقت في الـ header | الكارت فضل رأسي لأن مكانه 235 بس |

---

## ٤. JS: [[matchMedia]] و [[ResizeObserver]]، مش [[resize]]

| | [[window.addEventListener("resize")]] | [[matchMedia(q).addEventListener("change")]] | [[new ResizeObserver(cb).observe(el)]] |
|---|---|---|---|
| بيتبعت إمتى | مع كل تغيير في الشاشة (عشرات المرات وانت بتسحب) | لما الـ query تقلب بس | لما مقاس العنصر نفسه يتغيّر |
| أول ما الصفحة تفتح | لأ (لازم تنده الدالة بإيدك) | [[matches]] متاح على طول | آه، بيتبعت مرة في الأول |
| بيعرف مقاس عنصر | لأ، الشاشة بس | لأ | آه، وده الوحيد |
| استخدمه لـ | تقريبًا ولا حاجة النهارده | سلوك بيتغيّر مع المقاس | canvas و charts و «اقرا المزيد لو النص طويل» |

~~~text غيّرت العرض من 1280 لـ 700 على ٢٤ خطوة (Chrome 158)
resize:          اتبعت 23 مرة
matchMedia:      اتبعت مرة واحدة (لما العرض نزل تحت 768)
ResizeObserver:  اتبعت 23 مرة على .cards
~~~

---

## الخلاصة

| التغيير | فين | ليه |
|---|---|---|
| الصورة بحجم مناسب | HTML [[srcset]] و [[sizes]] | المتصفح بيحمّلها قبل CSS و JS |
| صورة مختلفة على الموبايل | HTML [[<picture>]] | نفس السبب |
| layout الصفحة | CSS [[@media]] | من أول رسمة ومن غير JS |
| شكل component حسب مكانه | CSS [[@container]] | الشاشة مش هي المقياس |
| سلوك بيتغيّر (قايمة تتقفل) | JS [[matchMedia]] و [[change]] | CSS ميغيّرش attributes ولا state |
| رقم في الكود (canvas) | JS [[ResizeObserver]] | CSS ميديش أرقام للـ JS |

اللي ميتلخبطش: CSS الأول، و HTML للصور، و JS لما تحتاج سلوك أو رقم. و [[resize]] على [[window]] غالبًا معناه إنك بتعمل في JS حاجة CSS بيعملها.`,
          lines: [
            R`صورة واحدة بحجمين في [[srcset]]، و [[sizes]] بيقول هتتعرض قد إيه، والمتصفح بيختار الأنسب قبل ما الـ CSS يتقري. و [[width]] و [[height]] بيحجزوا مكانها`,
            R`كارت جوه حاوية [[.cards]]: الحاوية هي اللي الـ container query هتقيس عرضها`,
            R`بداية الـ CSS: الـ layout كله هنا، وبيتطبق من أول رسمة`,
            R`الصورة متعدّيش عرض مكانها، وطولها يتغيّر بنفس النسبة`,
            R`بنعلن إن [[.cards]] container، فالكروت اللي جواها تقدر تسأل عن عرضه`,
            R`لو الحاوية ٤٢٠px أو أكتر الكارت يبقى أفقي، مهما كان عرض الشاشة`,
            R`نهاية الـ CSS: الـ layout كله هنا من غير JS`,
            R`بداية الـ JS: للسلوك والأرقام بس`,
            R`media query في JS: object فيه [[matches]] دلوقتي وبيبعت [[change]] لما تقلب`,
            R`نطبع الحالة وقت فتح الصفحة: [[true]] لو الشاشة ٧٦٨ أو أكتر`,
            R`[[change]] بيتبعت مرة لما الشاشة تعدّي ٧٦٨ في أي اتجاه، و [[e.matches]] الحالة الجديدة`,
            R`[[ResizeObserver]] بيدينا عرض [[.cards]] نفسه مع كل تغيير، ومرة في الأول. ده الرقم اللي CSS ميقدرش يبعته`,
            R`نهاية الـ JS: مفيش ولا class بيتحط حسب العرض، ده شغل الـ CSS`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** كل حاجة دي مكانها HTML ولا CSS ولا JS: (١) ٣ أعمدة كروت على الكمبيوتر وعمود على الموبايل، (٢) صورة الـ hero أصغر على الموبايل، (٣) خط العنوان يكبر مع الشاشة، (٤) الـ sidebar يتحول لـ drawer تحت ٧٦٨ ولو كان مفتوح يتقفل لما الشاشة تكبر، (٥) جراف بيترسم على canvas بعرض مكانه، (٦) الكارت في الـ sidebar رأسي وفي الـ main أفقي، (٧) جدول كبير يبقى scroll أفقي على الموبايل.`, done: R`لكل واحدة مكان وسبب، والـ JS طلع في اتنين بس.`, sol: R`| # | الحاجة | فين | إزاي |
|---|---|---|---|
| ١ | ٣ أعمدة ثم واحد | CSS | [[grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))]] من غير ولا media query |
| ٢ | صورة أصغر | HTML | [[srcset]] و [[sizes]] |
| ٣ | خط بيكبر | CSS | [[font-size: clamp(1.5rem, 4vw, 3rem)]] |
| ٤ | sidebar ← drawer | CSS للشكل + JS | الـ layout [[@media]]، و [[matchMedia]] بيقفل الحالة المفتوحة |
| ٥ | canvas بعرض مكانه | JS | [[ResizeObserver]] |
| ٦ | الكارت حسب مكانه | CSS | [[@container]] |
| ٧ | جدول بيعمل scroll | CSS | أب بـ [[overflow-x: auto]] |

**الغلطة الشايعة:** (١) و (٦) بيتكتبوا بـ [[resize]] و [[classList]]. وكمان (٤) بيتكتب كله JS، والـ CSS هنا أحسن للشكل لأنه بيبقى صح من أول رسمة، و JS بيمسك الحالة بس.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[<img srcset="a.jpg 400w, b.jpg 800w, c.jpg 1600w" sizes="(min-width: 768px) 50vw, 100vw">]]. أنهي صورة هتتحمّل: (أ) عرض 360 وكثافة 1، (ب) عرض 360 وكثافة 3 (موبايل حديث)، (ج) عرض 1280 وكثافة 1، (د) عرض 1280 وكثافة 2؟ احسب، وبعدين قيس بـ [[img.currentSrc]].`, done: R`حسبت العرض المطلوب بالبيكسل لكل حالة (عرض العرض × الكثافة) واخترت، وطابقت [[currentSrc]] في Chrome بـ Device toolbar (والـ DPR من القايمة)، والكاش مقفول.`, sol: R`**الحساب:** العرض اللي الصورة هتتعرض بيه (من [[sizes]]) × الكثافة = البيكسلات المطلوبة، والمتصفح بياخد أصغر صورة عرضها يكفي.

| | sizes | × كثافة | مطلوب | الاختيار |
|---|---|---|---|---|
| أ | 100vw = 360 | × 1 | 360 | [[a.jpg]] (400) |
| ب | 100vw = 360 | × 3 | 1080 | [[c.jpg]] (1600) |
| ج | 50vw = 640 | × 1 | 640 | [[b.jpg]] (800) |
| د | 50vw = 640 | × 2 | 1280 | [[c.jpg]] (1600) |

~~~text img.currentSrc (Chrome 158، context جديد لكل حالة عشان الكاش)
360 × 1:   a.jpg
360 × 3:   c.jpg
1280 × 1:  b.jpg
1280 × 2:  c.jpg
~~~

- **(ب) مفاجأة:** الموبايل الصغير بياخد **أكبر** صورة، لأن شاشته ٣ بيكسلات لكل بيكسل CSS. عشان كده الـ [[srcset]] مهم للموبايل مش للكمبيوتر بس.
- **الكاش بيلخبط القياس:** لو المتصفح عنده صورة أكبر في الكاش ممكن يستخدمها بدل الأصغر. عشان كده كل حالة في context جديد (أو Disable cache).
- **[[sizes]] غلط = صورة غلط:** لو كتبت [[100vw]] والصورة فعلًا بتتعرض في عمود ٣٠٠px، المتصفح هيحمّل أكبر من اللازم.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ layout ده معمول بـ JS: [[function layout() { document.body.classList.toggle("is-mobile", innerWidth < 768); } window.addEventListener("resize", layout);]]، والـ CSS فيه [[.is-mobile main { grid-template-columns: 1fr; }]] و [[main { display: grid; grid-template-columns: 1fr 2fr; }]]. اليوزرز على الموبايل بيشوفوا عمودين مزنوقين أول ما الصفحة تفتح. ليه؟ صلّحه.`, done: R`عرفت إن [[layout()]] مبيتنادش في الأول، وصلّحته بـ CSS بس (من غير JS)، والـ main عمود واحد على 360 من أول رسمة.`, sol: R`**السبب:** [[resize]] بيتبعت لما الشاشة **تتغيّر** بس. أول ما الصفحة تفتح على موبايل محدش بيغيّر حاجة، فـ [[is-mobile]] مبيتحطش، والـ main بيفضل عمودين.

~~~text Chrome 158، عرض 360، الكود القديم
أول ما الصفحة فتحت:   body.className = ""        grid-template-columns = "104px 208px"
بعد ما غيّرت العرض لـ 361 ورجعت 360:  body.className = "is-mobile"   "328px"
~~~

حتى لو ناديت [[layout()]] في الأول، الصفحة بتترسم مرة بعمودين قبل ما JS يشتغل (وميض). **التصليح:** CSS بيعرف عرض الشاشة من أول رسمة:

~~~css css/styles.css
main { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 768px) {
  main { grid-template-columns: 1fr 2fr; }
}
~~~

والـ JS كله يتمسح.

~~~text بعد التصليح (Chrome 158)
360:   grid-template-columns = "328px"            (عمود واحد من أول رسمة)
1280:  grid-template-columns = "410.663px 821.338px"
~~~

- **mobile-first:** القاعدة العادية للموبايل (عمود)، والـ [[@media (min-width)]] بتزوّد للشاشات الأكبر. كده الموبايل مبيحمّلش حاجة مش محتاجها.
- **[[innerWidth]] و [[@media]] مش نفس الرقم دايمًا:** [[innerWidth]] فيه عرض الـ scrollbar على الكمبيوتر، و [[@media (min-width)]] كمان بيحسبه، بس [[document.documentElement.clientWidth]] مبيحسبوش. سبب تاني تخلي الـ CSS يقرر.` },
            { lvl: 'تحدي', t: R`**ابني:** فقرة وصف منتج بتتقص لـ ٣ سطور، وزرار «اقرا المزيد» **يظهر بس لو النص فعلًا أطول من ٣ سطور** في العرض الحالي. لو كبّرت الشاشة والنص بقى يكفي في ٣ سطور، الزرار يختفي. والـ layout كله CSS.`, done: R`على 360 النص الطويل ليه زرار والقصير لأ، وعلى 1280 الزرار بتاع الطويل اختفى لو النص بقى ٣ سطور أو أقل، من غير reload.`, sol: R`~~~live 230 140 غيّر العرض وشوف الزرار
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; }
  .desc { margin: 0; }
  .desc.clamp { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
  .more { font: inherit; color: #1d4ed8; background: none; border: 0; padding: 0; cursor: pointer; font-weight: 700; }
  .more[hidden] { display: none; }
  .box { max-width: 900px; margin-bottom: 16px; }
</style>
<div class="box"><p class="desc clamp" id="d1">كوباية سيراميك ٣٥٠ مللي، معمولة يدوي في الفيوم، كل واحدة لونها مختلف شوية عن التانية لأن الطلا بيتعمل بالإيد. تتغسل في الغسالة وتدخل الميكروويف. الشحن خلال يومين جوه القاهرة وتلات أيام للمحافظات، والإرجاع خلال ١٤ يوم لو فيها أي عيب.</p>
<button class="more" type="button" aria-controls="d1" aria-expanded="false" hidden>اقرا المزيد</button></div>
<div class="box"><p class="desc clamp" id="d2">كوباية سيراميك ٣٥٠ مللي.</p>
<button class="more" type="button" aria-controls="d2" aria-expanded="false" hidden>اقرا المزيد</button></div>
<script>
  for (const btn of document.querySelectorAll(".more")) {
    const p = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open);
      p.classList.toggle("clamp", !open);
      btn.textContent = open ? "اقفل" : "اقرا المزيد";
    });
    new ResizeObserver(() => {
      if (btn.getAttribute("aria-expanded") === "true") return;
      btn.hidden = p.scrollHeight <= p.clientHeight + 1;
    }).observe(p);
  }
</script>
~~~

- **[[scrollHeight]] و [[clientHeight]]:** الأول ارتفاع النص كله حتى المقصوص، والتاني الظاهر. لو الأول أكبر يبقى فيه نص مستخبي، فالزرار له لازمة. و [[+ 1]] عشان التقريب في الكسور.
- **[[ResizeObserver]] على الفقرة نفسها:** لما عرضها يتغيّر (الشاشة أو أي حاجة)، بنعيد السؤال. ده الرقم اللي CSS ميقدرش يديه لـ JS.
- **الزرار [[hidden]] في الـ HTML:** لو JS موقعش النص مقصوص من غير زرار. هنا اخترت القص في الـ HTML نفسه (class [[clamp]] مكتوب) عشان القياس يبقى من أول رسمة؛ لو عايز النص كامل من غير JS، خلّي JS يحط [[clamp]] زي تمرين درس «مين بيعمل إيه».

~~~text اتقاس (Chrome 158)
360:   الطويل: scrollHeight 163 > clientHeight 82 ← الزرار ظاهر.  القصير: 27 و 27 ← مخفي
1280:  الطويل: scrollHeight 54 ≤ clientHeight 54 ← الزرار مخفي.  القصير: مخفي
فتحت على 360 وكبّرت لـ 1280 من غير reload: زرار الطويل اختفى لوحده (ResizeObserver)
~~~` },
          ],
          ref: [
            { t: "MDN: Responsive web design", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design" },
            { t: "MDN: Responsive images", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images" },
            { t: "MDN: <img> srcset و sizes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" },
            { t: "MDN: <picture>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture" },
            { t: "MDN: Container queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries" },
            { t: "MDN: Using media queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using" },
            { t: "MDN: Testing media queries programmatically", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Testing" },
            { t: "MDN: ResizeObserver", url: "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver" },
            { t: "MDN: Window.devicePixelRatio", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio" },
          ],
          pre: [{ to: "css/media queries", why: R`[[@media]] نفسها والـ mobile-first` }, { to: "css/container queries", why: R`[[@container]] و [[container-type]]` }, { to: "css/picture", why: R`[[<picture>]] و [[srcset]] من ناحية HTML` }, { to: "js/ResizeObserver", why: R`الـ API نفسه بتفاصيله` }],
          deep: {
            why: R`الـ responsive اللي معمول بـ JS بيتأخر (الصفحة بتترسم غلط وبعدين بتتصلّح)، وبيتقطع (عشرات الـ events وانت بتسحب)، وبيقع لو JS موقعش. واللي معمول بـ CSS بيبقى صح من أول رسمة. والصور لو اتقررت في JS بتتحمّل متأخر وغالبًا أكبر من اللازم. لما كل تغيير في أبكر لغة تقدر عليه، الصفحة أسرع وأخف ومحتاجة كود أقل.`,
            how: R`المتصفح بيقرا الـ HTML وبيشغّل preload scanner بيلاقي الصور ويختار من [[srcset]] حسب [[sizes]] و [[devicePixelRatio]] ويبدأ التحميل. وبعدين بيحسب الـ CSS: كل [[@media]] بتتقيّم على الشاشة، وكل [[@container]] على أقرب أب ليه [[container-type]] بعد ما مقاسه يتحسب. و JS في الآخر: [[matchMedia]] بيدي نفس تقييم الـ CSS ويبعت [[change]] لما يقلب، و [[ResizeObserver]] بيتبعت بعد الـ layout وقبل الرسم لكل عنصر مقاسه اتغيّر.`,
            when: R`[[srcset]] لأي صورة كبيرة، و [[<picture>]] لو القص مختلف. [[@media]] لـ layout الصفحة، و [[@container]] لأي component بيتحط في أماكن مختلفة. [[matchMedia]] لما سلوك أو حالة لازم تتغيّر مع المقاس. [[ResizeObserver]] لما الكود نفسه محتاج عرض أو طول عنصر. و [[resize]] على [[window]] تقريبًا مش محتاجه.`,
            mistakes: R`[[resize]] و [[classList]] بدل [[@media]]. نسيان إن [[resize]] مبيتبعتش في الأول. صورة واحدة كبيرة لكل المقاسات. [[sizes]] مش مطابق للعرض الحقيقي. canvas بعرض CSS بس فالرسم مشوّش. [[@container]] من غير [[container-type]] على الأب فمبيشتغلش ومن غير error. حالة مفتوحة على الموبايل بتفضل بعد ما الشاشة تكبر.`,
          },
        },
        {
          cmd: "الحالة ← الصفحة: state و render والثيم",
          title: "object واحد فيه الحالة، ودالة render بتكتبها في الـ DOM (نص و attributes)، والـ CSS بيرسم، وثيم فاتح وغامق وزي الجهاز بيتحفظ ومن غير وميض",
          desc: R`لما الصفحة فيها أكتر من حاجة بتتغيّر، الطريقة اللي بتفضل مفهومة: **object واحد [[state]]** فيه كل الحالة، و **دالة [[render()]]** بتكتبها في الصفحة، والأحداث **بتغيّر [[state]] بس وتنده [[render()]]**. و [[render]] بتكتب نص و attributes (زي [[data-theme]] و [[aria-pressed]])، والـ CSS بيرسمهم.
والثيم أحسن مثال على التلاتة:
• **CSS:** الألوان كلها متغيرات، و [[color-scheme]] و [[light-dark()]] بيختاروا حسب الجهاز أو حسب [[data-theme]].
• **JS:** بيحفظ اختيار اليوزر في [[localStorage]] (جوه [[try]] لأنه ممكن يرمي error)، وبيكتبه على [[<html>]].
• **HTML:** سكربت صغير **عادي في الـ head** بيقرا الاختيار قبل أول رسمة، فمفيش وميض أبيض قبل الغامق.`,
          example: R`const state = { theme: "system", items: 0 };
function render() {
  document.documentElement.dataset.theme = state.theme;
  for (const b of document.querySelectorAll("[data-set-theme]")) b.setAttribute("aria-pressed", b.dataset.setTheme === state.theme);
  document.querySelector(".js-items").textContent = state.items;
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-set-theme]");
  if (btn) state.theme = btn.dataset.setTheme;
  if (e.target.closest(".js-add")) state.items++;
  render();
});
render();`,
          try: R`شغّل صفحة الشرح من سيرفر محلي، واختار «غامق»، واعمل refresh: الصفحة فتحت غامقة على طول؟ وبعدين من DevTools › Rendering › Emulate prefers-color-scheme غيّر الجهاز لـ dark و light وانت على «زي الجهاز». وبعدين افتح Console واكتب [[localStorage.getItem("theme")]].`,
          sol: R`~~~text Chrome 158، من http://localhost
اخترت «غامق» ثم Ctrl+R:     أول frame خلفيته rgb(15, 23, 42) (غامق)، مفيش أبيض
«زي الجهاز» + emulate dark:  الصفحة غمقت على طول من غير JS
«زي الجهاز» + emulate light: فتحت
localStorage.getItem("theme") → 'dark' بعد ما اخترت غامق، و 'system' بعد «زي الجهاز»
~~~

«زي الجهاز» بيتبع الجهاز لحظيًا من غير ولا سطر JS، لأن الـ CSS فيه [[color-scheme: light dark]] و [[light-dark()]]، والمتصفح بيعيد الحساب لوحده لما الجهاز يتغيّر. الـ JS بيدخل بس لما اليوزر **يختار** حاجة غير الجهاز.`,
          teach: R`## الفكرة

درس «الـ DOM مش مكان الحالة» في وحدة «ابني تطبيق بإيدك» شرح ليه الحالة تبقى في JS مش في الـ DOM. الدرس ده بيكمّل من ناحية التلات لغات: [[render()]] بتكتب **إيه** في الـ DOM عشان CSS يرسم وقارئ الشاشة يفهم، والثيم كمثال كامل لحاجة بتعدّي على التلاتة وفيها فخين حقيقيين: الوميض، و [[localStorage]] اللي بيرمي error. كله اتجرّب في Chrome 158.

---

## ١. المثال

~~~live 250 اختار ثيم، ودوس «أضف» كذا مرة
<!doctype html>
<html lang="ar" dir="rtl" data-theme="system">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
  // قبل أول رسمة: اقرا الاختيار المحفوظ لو التخزين متاح
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  } catch (e) {}
</script>
<style>
  :root { color-scheme: light dark; --bg: light-dark(#ffffff, #0f172a); --fg: light-dark(#0f172a, #e2e8f0); --accent: light-dark(#1d4ed8, #93c5fd); --line: light-dark(#cbd5e1, #334155); }
  :root[data-theme="light"] { color-scheme: light; }
  :root[data-theme="dark"] { color-scheme: dark; }
  body { margin: 0; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: var(--bg); color: var(--fg); }
  .themes { display: flex; gap: 6px; flex-wrap: wrap; }
  button { font: inherit; padding: 4px 12px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: inherit; cursor: pointer; }
  button[aria-pressed="true"] { background: var(--accent); color: var(--bg); border-color: var(--accent); }
  button:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
  .note { font-size: .85rem; opacity: .8; }
  .note:empty { display: none; }
</style>
</head>
<body>
  <div class="themes" role="group" aria-label="الثيم">
    <button type="button" data-set-theme="light">فاتح</button>
    <button type="button" data-set-theme="dark">غامق</button>
    <button type="button" data-set-theme="system">زي الجهاز</button>
  </div>
  <p>في السلة: <b class="js-items">0</b> <button type="button" class="js-add">أضف</button></p>
  <p class="note js-note"></p>
<script type="module">
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
  };
  const state = { theme: store.get("theme") || "system", items: 0, saved: true };

  function render() {
    document.documentElement.dataset.theme = state.theme;
    for (const b of document.querySelectorAll("[data-set-theme]")) b.setAttribute("aria-pressed", b.dataset.setTheme === state.theme);
    document.querySelector(".js-items").textContent = state.items;
    document.querySelector(".js-note").textContent = state.saved ? "" : "الاختيار مش هيتحفظ هنا (التخزين مقفول في الصفحة دي)";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-set-theme]");
    if (btn) {
      state.theme = btn.dataset.setTheme;
      state.saved = store.set("theme", state.theme);
    }
    if (e.target.closest(".js-add")) state.items++;
    render();
  });
  render();
</script>
</body>
</html>
~~~

> في الـ preview هنا التخزين مقفول (الصفحة في iframe معزول)، فهتشوف الملحوظة اللي تحت لما تختار ثيم. الثيم بيتغيّر عادي بس مبيتفتكرش. من سيرفر محلي بيتحفظ (الجزء ٤).

---

## ٢. [[state]] و [[render()]]: مين يكتب إيه

- **[[state]]** هو المصدر الوحيد: [[theme]] و [[items]] و [[saved]]. محدش بيقرا الحالة من الـ DOM.
- **الأحداث** (listener واحد على [[document]] بـ [[closest]]) بتغيّر [[state]] بس، وبعدين [[render()]].
- **[[render()]]** بتكتب ٣ أنواع حاجات بس:

| بتكتب | مثال | مين بيستخدمه |
|---|---|---|
| attribute حالة على عنصر عالي | [[<html data-theme="dark">]] | CSS: [[:root[data-theme="dark"]]] |
| attribute معنى | [[aria-pressed="true"]] على الزرار المختار | CSS للشكل، وقارئ الشاشة «متداس» |
| نص | [[textContent = state.items]] | العين وقارئ الشاشة |

ومفيش ولا لون في الـ JS. [[render()]] مش بترسم، بتوصف. وأي حد يفتح Elements يشوف [[data-theme]] و [[aria-pressed]] ويعرف الصفحة في أنهي حالة.

**ليه [[render()]] بتكتب كل حاجة كل مرة؟** عشان الصفحة متتلخبطش: مفيش حالة اتنسيت تتحدث. والكتابة لنفس القيمة مبتعملش إعادة رسم (المتصفح بيقارن). لما الصفحة تكبر جدًا، دي المشكلة اللي React بيحلها.

---

## ٣. الثيم من CSS: [[color-scheme]] و [[light-dark()]]

~~~css
:root { color-scheme: light dark; --bg: light-dark(#ffffff, #0f172a); --fg: light-dark(#0f172a, #e2e8f0); }
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }
~~~

- **[[color-scheme: light dark]]:** الصفحة بتدعم الاتنين، والمتصفح يختار حسب الجهاز. وكمان الـ scrollbar وعناصر الفورم بيتلوّنوا لوحدهم.
- **[[light-dark(A, B)]]:** A لو الـ scheme فاتح، و B لو غامق. كل الألوان متغيرات بتتحسب منها.
- **[[data-theme="dark"]]** بيغيّر [[color-scheme]] بس، فكل [[light-dark()]] في الصفحة بتقلب مرة واحدة. و [[system]] ملهوش قاعدة، فبيفضل [[light dark]] ويتبع الجهاز.

~~~text Chrome 158: getComputedStyle(document.body).backgroundColor
data-theme   الجهاز light        الجهاز dark
system       rgb(255, 255, 255)  rgb(15, 23, 42)
light        rgb(255, 255, 255)  rgb(255, 255, 255)
dark         rgb(15, 23, 42)     rgb(15, 23, 42)
~~~

---

## ٤. التخزين: [[localStorage]] ممكن يرمي error

~~~text Chrome 158
من سيرفر محلي:            localStorage.setItem("theme", "dark") اشتغل، وبعد Ctrl+R الثيم غامق
جوه iframe معزول (الـ preview): SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.
~~~

- **مجرد قراية [[window.localStorage]]** بترمي error في iframe معزول، وكمان في بعض أوضاع التصفح الخاص أو لما اليوزر يقفل الكوكيز. من غير [[try]] السكربت كله بيقف والصفحة مبتشتغلش.
- **[[store.get]] و [[store.set]]** بيلفوا الاتنين في [[try]]: الـ get بيرجّع [[null]]، والـ set بيرجّع [[false]]، و [[render()]] بتعرض ملحوظة بدل ما تكدب وتقول اتحفظ.
- **ليه [[saved]] في [[state]]؟** عشان الملحوظة حالة زي أي حالة: [[render()]] هي اللي تكتبها.

---

## ٥. الوميض: السكربت العادي في الـ head

لو الاختيار المحفوظ «غامق» والجهاز فاتح، والكود اللي بيقرا التخزين في [[type="module"]] بس، الصفحة بتترسم بيضا الأول وبعدين بتغمق. قست أول frame (لون الـ body في أول [[requestAnimationFrame]]، وده قبل أول رسمة) مع ملف [[app.js]] بيتأخر ٣٠٠ms زي نت بطيء:

~~~text Chrome 158، المحفوظ dark والجهاز light
الثيم في الـ module بس:             أول frame rgb(255, 255, 255) ← وبعد ما الـ module اشتغل rgb(15, 23, 42)
سكربت عادي صغير في الـ head (زي فوق): أول frame rgb(15, 23, 42)
~~~

السكربت العادي من غير [[defer]] بيوقّف قراية الـ HTML لحد ما يشتغل، وده عادة عيب (درس «defer و async و module»)، بس هنا ده المطلوب بالظبط: ٤ سطور بتشتغل قبل أي رسمة. خليه صغير، ومن غير [[src]] (ملف خارجي هيستنى الشبكة)، وفي [[try]].

---

## الخلاصة

| الطبقة | في الثيم | في السلة |
|---|---|---|
| HTML | [[data-theme]] على [[<html>]]، وأزرار بـ [[aria-pressed]]، وسكربت صغير في الـ head | [[<b class="js-items">]] مكان الرقم |
| CSS | [[color-scheme]] و [[light-dark()]] ومتغيرات، و [[[aria-pressed="true"]]] | ولا حاجة |
| JS | [[state.theme]] ← [[render()]] ← [[dataset.theme]]، والتخزين في [[try]] | [[state.items++]] ← [[render()]] |

اللي ميتلخبطش: الأحداث بتغيّر [[state]] بس، و [[render()]] بتكتب attributes ونص بس، و CSS بيرسم. والتخزين في [[try]] دايمًا، والثيم المحفوظ بيتقري في سكربت صغير في الـ head.`,
          lines: [
            R`الحالة كلها في object واحد: الثيم المختار وعدد اللي في السلة`,
            R`[[render()]]: الدالة الوحيدة اللي بتكتب في الصفحة من الحالة`,
            R`بتكتب الثيم على [[<html>]] كـ [[data-theme]]، والـ CSS بيغيّر الألوان كلها منه`,
            R`لكل زرار ثيم: [[aria-pressed="true"]] لو هو المختار و [[false]] للباقي، والـ CSS بيلوّن المختار من الـ attribute ده`,
            R`بتكتب العدد في مكانه كنص. مفيش ولا لون ولا class شكل في [[render()]]`,
            R`قفلة [[render()]]`,
            R`listener واحد على الصفحة كلها بدل listener لكل زرار (event delegation)`,
            R`[[closest]] بيلاقي زرار الثيم حتى لو الدوسة على حاجة جواه، وإلا [[null]]`,
            R`لو زرار ثيم: الحالة الجديدة من [[data-set-theme]] بتاعه. ومفيش كتابة في الـ DOM هنا`,
            R`لو زرار «أضف»: العدد يزيد في [[state]] بس`,
            R`بعد أي تغيير، [[render()]] تكتب الحالة الجديدة كلها`,
            R`قفلة الـ listener`,
            R`أول [[render()]] وقت فتح الصفحة، عشان الأزرار تتعلّم والرقم يتكتب`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الكود ده في صفحة جوه [[<iframe sandbox="allow-scripts">]]: [[const t = localStorage.getItem("theme") || "system"; document.documentElement.dataset.theme = t; console.log("تمام");]]. هيطبع «تمام»؟ والثيم هيتكتب؟ وإيه اللي يتغيّر لو لفّيت أول سطر في [[try]]؟`, done: R`توقعت إن السطر الأول بيرمي و «تمام» متطبعش، وجرّبت، وكتبت الرسالة الحقيقية، وبعد [[try]] اتطبعت.`, sol: R`~~~text Chrome 158، جوه iframe بـ sandbox="allow-scripts" بس
Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.
«تمام» متطبعتش، و data-theme متكتبش
~~~

~~~js بعد التصليح
let t = "system";
try {
  t = localStorage.getItem("theme") || "system";
} catch (e) {}
document.documentElement.dataset.theme = t;
console.log("تمام");
~~~

~~~text بعد التصليح
تمام      و data-theme="system"
~~~

- **الـ error بيحصل في قراية [[localStorage]] نفسها** مش في [[getItem]]. فحتى [[if (localStorage)]] بيرمي. عشان كده [[try]] حوالين أي سطر فيه الكلمة دي.
- **الـ sandbox من غير [[allow-same-origin]]** بيدي الصفحة origin مجهول، والتخزين مربوط بالـ origin، فمفيش مكان يتحفظ فيه. ده اللي في الـ preview بتاع الموقع ده، وفي iframes إعلانات ومحررات أكواد كتير.
- **ليه error مش [[null]]:** المتصفح بيقولك «مفيش تخزين أصلًا» مش «مفيش قيمة». الفرق مهم: [[null]] معناها أول زيارة، والـ error معناه ميتحفظش أبدًا.` },
            { lvl: 'تطبيق', t: R`**ابني:** لستة مهام صغيرة بـ [[state]] و [[render()]]: [[state = { tasks: [...], filter: "all" }]]، وتلات أزرار فلتر (الكل، اللي فاضلة، اللي خلصت) بـ [[aria-pressed]]، وكل مهمة checkbox. [[render()]] بتكتب الـ [[hidden]] على كل [[<li>]] حسب الفلتر، وعدد الفاضلة في نص. الـ CSS بيرسم المهمة اللي خلصت بخط عليها من [[:checked]].`, done: R`مفيش [[style]] في الـ JS، والفلتر بيخفي بـ [[hidden]]، والعدد صح بعد كل تغيير، والـ listener واحد على الأب، و [[render()]] الدالة الوحيدة اللي بتكتب في الـ DOM.`, sol: R`~~~live 260 علّم مهام وغيّر الفلتر
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .filters button { font: inherit; padding: 2px 10px; border-radius: 999px; border: 1px solid #94a3b8; background: #fff; cursor: pointer; }
  .filters button[aria-pressed="true"] { background: #0f172a; color: #fff; }
  ul { list-style: none; padding: 0; }
  li label { display: flex; gap: 8px; align-items: center; }
  li:has(:checked) span { text-decoration: line-through; color: #64748b; }
</style>
<div class="app">
  <div class="filters" role="group" aria-label="الفلتر">
    <button type="button" data-filter="all">الكل</button>
    <button type="button" data-filter="open">اللي فاضلة</button>
    <button type="button" data-filter="done">اللي خلصت</button>
  </div>
  <ul class="js-list"></ul>
  <p>فاضل: <b class="js-left"></b></p>
</div>
<script>
  const state = {
    filter: "all",
    tasks: [
      { id: 1, text: "اشتري لبن", done: false },
      { id: 2, text: "ادفع النت", done: true },
      { id: 3, text: "ذاكر درس الثيم", done: false },
    ],
  };
  const list = document.querySelector(".js-list");
  // الـ li بتتعمل مرة واحدة، و render بتحدّث حالتها بس
  list.innerHTML = state.tasks.map((t) => '<li data-id="' + t.id + '"><label><input type="checkbox"><span></span></label></li>').join("");

  function render() {
    for (const b of document.querySelectorAll("[data-filter]")) b.setAttribute("aria-pressed", b.dataset.filter === state.filter);
    for (const t of state.tasks) {
      const li = list.querySelector('[data-id="' + t.id + '"]');
      li.querySelector("span").textContent = t.text;
      li.querySelector("input").checked = t.done;
      li.hidden = (state.filter === "open" && t.done) || (state.filter === "done" && !t.done);
    }
    document.querySelector(".js-left").textContent = state.tasks.filter((t) => !t.done).length;
  }

  document.querySelector(".app").addEventListener("click", (e) => {
    const f = e.target.closest("[data-filter]");
    if (f) { state.filter = f.dataset.filter; render(); }
  });
  list.addEventListener("change", (e) => {
    const id = Number(e.target.closest("li").dataset.id);
    state.tasks.find((t) => t.id === id).done = e.target.checked;
    render();
  });
  render();
</script>
~~~

- **[[li:has(:checked) span]]:** الخط على المهمة من الـ CSS، من حالة الـ checkbox نفسه. JS بيكتب [[checked]] من [[state]] بس.
- **الـ [[<li>]] بتتعمل مرة واحدة،** و [[render()]] بتحدّث جواها. لو [[render()]] كانت بتعيد [[innerHTML]] كله مع كل دوسة، الـ checkbox اللي دوست عليه كان هيتمسح ويتعمل جديد والـ focus يضيع (درس «الـ DOM مش مكان الحالة» بيشرح الفخ ده).
- **[[change]] مش [[click]] للـ checkbox:** بيحصل بالماوس و Space، وبعد ما القيمة اتغيّرت فعلًا.
- **الحالة المشتقة** (عدد الفاضلة) بتتحسب في [[render()]] مش بتتخزن، فمستحيل تبقى غلط.

~~~text اتقاس (Chrome 158)
الأول:                  الكل aria-pressed=true، ٣ ظاهرين، فاضل: 2
علّمت «اشتري لبن»:      فاضل: 1، والخط عليها (text-decoration: line-through)
«اللي فاضلة»:            ظاهر: «ذاكر درس الثيم» بس
«اللي خلصت»:             ظاهر: «اشتري لبن» و «ادفع النت»
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اليوزرز اللي اختاروا «غامق» بيشوفوا الصفحة بيضا لحظة كل ما يفتحوها. الكود كله في [[js/app.js]] ([[type="module"]]): [[const saved = localStorage.getItem("theme"); if (saved) document.documentElement.dataset.theme = saved;]]. أثبت الوميض بالقياس وصلّحه.`, done: R`عندك رقمين: لون أول frame قبل وبعد التصليح، والجهاز light والمحفوظ dark، والملف متأخر (Network throttling أو سيرفر بطيء).`, sol: R`**القياس:** سكربت صغير في أول الـ head بيسجّل لون الـ body في أول [[requestAnimationFrame]] (اللي بيتنفّذ قبل أول رسمة):

~~~html index.html (للقياس بس، أول سطر في الـ head)
<script>requestAnimationFrame(() => console.log("أول frame:", getComputedStyle(document.body).backgroundColor));</script>
~~~

~~~text Chrome 158، الجهاز light، المحفوظ dark، و app.js بيتأخر 300ms
قبل:  أول frame: rgb(255, 255, 255)     وبعد ~300ms الصفحة غمقت
بعد:  أول frame: rgb(15, 23, 42)
~~~

**التصليح:** القراية تتنقل لسكربت عادي صغير في الـ head، قبل الـ CSS:

~~~html index.html (الـ head)
<script>
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  } catch (e) {}
</script>
<link rel="stylesheet" href="css/styles.css">
<script type="module" src="js/app.js"></script>
~~~

- **ليه الـ module متأخر:** [[type="module"]] بيشتغل بعد ما الـ HTML كله يتقري، والمتصفح ممكن يرسم قبله (خصوصًا لو الملف لسه بيتحمّل). فالصفحة بتترسم بالثيم الافتراضي.
- **السكربت العادي من غير [[src]]:** بيشتغل في مكانه فورًا قبل ما المتصفح يكمّل قراية، فـ [[data-theme]] موجود قبل أول رسمة. ولو كان [[src]] لملف، المتصفح هيستنى الملف من الشبكة ويوقّف الصفحة كلها.
- **[[saved === "light" || saved === "dark"]]:** متكتبش أي قيمة من التخزين في الصفحة من غير ما تتأكد منها. قيمة قديمة زي [["blue"]] من نسخة قديمة من الموقع هتعمل [[data-theme="blue"]] مفيش ليه CSS.
- **الـ module لسه محتاج يقرا نفس القيمة** عشان [[state.theme]] (زي المثال في الشرح)، فالقراية في مكانين. ده مقبول: الـ head للرسمة الأولى، والـ module للحالة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** تلات نسخ من الثيم: (أ) JS بيقرا [[matchMedia("(prefers-color-scheme: dark)")]] ويكتب [[data-theme="dark"]] أو [[light]] وقت التحميل بس، (ب) نفس (أ) ومعاه listener على [[change]]، (ج) CSS بس ([[color-scheme: light dark]] و [[light-dark()]]) و JS بيكتب [[data-theme]] بس لو اليوزر اختار. غيّر ثيم الجهاز والصفحة مفتوحة: أنهي نسخة بتتبعه؟ وكام سطر JS في كل واحدة؟`, done: R`جدول بالتلات نسخ: بتتبع الجهاز لحظيًا ولا لأ، وبتشتغل من غير JS ولا لأ، وعدد سطور الـ JS، واختيارك وليه.`, sol: R`~~~text Chrome 158، Rendering › Emulate prefers-color-scheme، والصفحة مفتوحة على «زي الجهاز»
                         غيّرت الجهاز لـ dark          JS مقفول          سطور JS للثيم
(أ) matchMedia وقت التحميل   فضلت فاتحة لحد الـ refresh     فاتحة دايمًا       3
(ب) matchMedia + change      غمقت                          فاتحة دايمًا       6
(ج) CSS light-dark()         غمقت                          بتتبع الجهاز       0 (للمتابعة)، 1 للاختيار
~~~

~~~css (ج) كله
:root { color-scheme: light dark; --bg: light-dark(#ffffff, #0f172a); --fg: light-dark(#0f172a, #e2e8f0); }
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }
body { background: var(--bg); color: var(--fg); }
~~~

- **(أ)** بيقرا الجهاز مرة واحدة، فلو الجهاز اتقلب بالليل لوحده (ويندوز والموبايل بيعملوا كده) الصفحة مش هتحس.
- **(ب)** صح، بس بيكرر حاجة المتصفح بيعملها، وبيقع لو JS موقعش.
- **(ج)** المتصفح بيعيد حساب [[light-dark()]] لوحده لما الجهاز يتغيّر، والـ JS دوره بس يكتب اختيار اليوزر لو اختار. **ده اللي هتختاره.** ونفس الفكرة من غير [[light-dark()]]: [[@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #0f172a; } }]] (لمتصفحات أقدم من 2024).

القاعدة نفسها بتاعة الدرس: المتصفح والـ CSS عارفين الجهاز، و JS بيمسك **اختيار اليوزر** بس.` },
          ],
          ref: [
            { t: "MDN: color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme" },
            { t: "MDN: light-dark()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark" },
            { t: "MDN: prefers-color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme" },
            { t: "MDN: Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
            { t: "MDN: HTMLElement.dataset", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" },
            { t: "MDN: aria-pressed", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed" },
            { t: "MDN: <iframe> sandbox", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#sandbox" },
          ],
          pre: [{ to: "js/الـ DOM مش مكان الحالة", why: R`ليه الحالة في JS والـ DOM بيعرضها بس` }, { to: "js/Web Storage: localStorage و sessionStorage", why: R`[[localStorage]] نفسه وحدوده` }, { to: "css/CSS variables", why: R`الألوان كلها متغيرات بتتغيّر من مكان واحد` }],
          deep: {
            why: R`الصفحة اللي كل listener فيها بيغيّر الـ DOM بإيده بتوصل لحالة محدش فاهمها: الزرار بيقول «غامق» والصفحة فاتحة، والعدّاد بيقول ٣ والسلة فيها ٢. لما الحالة في مكان واحد و [[render()]] هي الوحيدة اللي بتكتب، الصفحة دايمًا بتعكس الحالة، والـ CSS يقدر يرسم كل حاجة من attributes واضحة. والثيم بالذات بيبان فيه كل فخ: الوميض، والتخزين، والجهاز.`,
            how: R`الأحداث بتنده دوال بتغيّر [[state]]، وبعدين [[render()]] بتكتب attributes ونص. كل كتابة لـ attribute بتعلّم العناصر المتأثرة للـ style recalc، والمتصفح في الـ frame الجاي بيحسب [[:root[data-theme="dark"]]] و [[light-dark()]] و [[[aria-pressed="true"]]] ويرسم. [[light-dark()]] بتتحسب حسب [[color-scheme]] على العنصر، و [[color-scheme: light dark]] بيتحل حسب [[prefers-color-scheme]] بتاع الجهاز، فتغيير الجهاز بيعيد الحساب من غير JS. والسكربت العادي في الـ head بيتنفّذ وقت القراية قبل أي layout أو paint.`,
            when: R`[[state]] و [[render()]] لأي صفحة فيها أكتر من حاجتين بيتغيّروا مع بعض. [[data-*]] على [[<html>]] لحالة بتأثر على الصفحة كلها (ثيم، لغة، كثافة). [[color-scheme]] و [[light-dark()]] لأي ثيم فاتح وغامق. سكربت head صغير لأي حالة محفوظة بتغيّر الشكل من أول رسمة. ولما الحالة والشاشات تكتر جدًا، framework (كورس React).`,
            mistakes: R`قراية الحالة من الـ DOM ([[textContent]] و [[classList.contains]]). [[render()]] بتكتب [[style]]. إعادة [[innerHTML]] كله مع كل تغيير فالـ focus بيضيع. [[localStorage]] من غير [[try]]. قيمة من التخزين بتتكتب في الصفحة من غير فحص. الثيم المحفوظ بيتقري في module فيحصل وميض. [[matchMedia]] وقت التحميل بس بدل CSS. حالة مشتقة بتتخزن (عدد الفاضلة) فبتبقى غلط.`,
          },
        },
        {
          cmd: "DevTools للتلاتة: باج بيعدّي بين اللغات",
          title: "تتبّع باج مش في لغة واحدة: الـ class اتحط ومش باين، والدوسة مش بتعمل حاجة، والزرار مش زرار، بـ Elements و Styles و Computed و Console و Sources و Accessibility",
          desc: R`أصعب الباجات هي اللي كل لغة فيها «صح» لوحدها: JS حط الـ class فعلًا، والـ CSS فيه القاعدة فعلًا، بس الشكل متغيّرش. الطريقة: **امشي على الخيط من طرف لطرف** وافحص كل نقطة في DevTools:
• **الـ class أو الـ attribute اتحط؟** Elements (السطر بيلمع لما يتغيّر).
• **القاعدة بتطابق؟ ومتشطّبة؟** Styles: قاعدة متشطّبة = قاعدة تانية كسبتها، والـ specificity جنب كل selector لما تقف عليه. و Computed بيقولك القيمة النهائية جاية منين.
• **الـ listener موجود على العنصر ده؟** Elements › Event Listeners، أو [[getEventListeners($0)]] في Console.
• **الكود وصل للسطر؟** Sources › breakpoint، أو Event Listener Breakpoints › Mouse › click.
• **العنصر ليه معنى؟** Elements › Accessibility: الـ role والاسم والحالة.`,
          example: R`$0
$0.className
getComputedStyle($0).backgroundColor
$0.matches(".tab.is-active")
getEventListeners($0)
document.querySelectorAll(".tab").length`,
          try: R`افتح صفحة الشرح (التابات البايظة) من سيرفر محلي. دوس على «المواصفات»: حصل إيه؟ اعمل Inspect على التاب الأول، وفي Console اكتب السطور اللي في المثال واحد واحد. وبعدين Inspect على التاب التاني واكتب [[getEventListeners($0)]]. إيه الفرق؟`,
          sol: R`~~~text Console في Chrome 158 (التاب الأول متعلّم بـ Inspect، فهو $0)
> $0
<button class="tab is-active" type="button" data-panel="p1">الوصف</button>
> $0.className
'tab is-active'
> getComputedStyle($0).backgroundColor
'rgb(255, 255, 255)'
> $0.matches(".tab.is-active")
true
> getEventListeners($0)
{click: Array(1)}
> document.querySelectorAll(".tab").length
2
~~~

~~~text والتاب التاني ($0)
> getEventListeners($0)
{}
~~~

- **[[$0]]** آخر عنصر اخترته في Elements. و **[[getEventListeners]]** و **[[$0]]** موجودين في Console بتاع DevTools بس (مش في كودك).
- **التاب الأول:** الـ class موجود ([[is-active]])، والـ selector بيطابق ([[true]])، بس الخلفية بيضا. يبقى الـ CSS فيه قاعدة أقوى (الجزء ١ في الشرح).
- **التاب التاني:** مفيش listener خالص. يبقى الـ JS ربط الحدث بعنصر واحد بس (الجزء ٢).
- **[[.tab]] رجّع ٢ والتابات اللي شايفها ٣:** التالت مش [[.tab]] أصلًا (الجزء ٣).`,
          teach: R`## الفكرة

درس «لما المشروع ميشتغلش» كان عن أخطاء ليها رسالة. هنا الباجات **مفيهاش رسالة**: مفيش سطر أحمر، والصفحة شغالة، بس حاجة مش بتحصل. والسبب دايمًا في **الوصلة** بين لغتين. الطريقة إنك تمشي على السلسلة: حدث ← listener ← state ← attribute أو class ← selector ← قيمة محسوبة ← شكل، وتشوف أنهي حلقة مقطوعة. كله اتجرّب في Chrome 158 بالـ DevTools نفسه وبـ Playwright (نفس البيانات من CDP).

---

## ١. الصفحة البايظة

~~~live 230 تابات فيها ٣ باجات: دوس على التابات، وجرّب Tab من الكيبورد
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #tabs { display: flex; gap: 4px; border-block-end: 2px solid #1d4ed8; }
  #tabs .tab { font: inherit; padding: 6px 14px; border: 1px solid #cbd5e1; border-block-end: 0; border-radius: 8px 8px 0 0; background: #fff; color: #334155; cursor: pointer; }
  .tab.is-active { background: #1d4ed8; color: #fff; }
  .panel { padding: 12px 4px; }
</style>
<nav id="tabs">
  <button class="tab is-active" type="button" data-panel="p1">الوصف</button>
  <button class="tab" type="button" data-panel="p2">المواصفات</button>
  <div class="tab-x" data-panel="p3">التقييمات</div>
</nav>
<section class="panel" id="p1">كوباية سيراميك معمولة يدوي.</section>
<section class="panel" id="p2" hidden>٣٥٠ مللي، تدخل الميكروويف.</section>
<section class="panel" id="p3" hidden>٤٫٥ من ٥ (٣٢ تقييم).</section>
<script>
  const tab = document.querySelector(".tab");
  tab.addEventListener("click", () => {
    for (const t of document.querySelectorAll(".tab")) t.classList.toggle("is-active", t === tab);
    for (const p of document.querySelectorAll(".panel")) p.hidden = p.id !== tab.dataset.panel;
  });
</script>
~~~

الأعراض: التاب الأول مش أزرق مع إنه «active»، والدوسة على «المواصفات» مبتعملش حاجة، و «التقييمات» شكلها مختلف ومبيوصلهاش Tab. ولا سطر في Console.

---

## ٢. الباج الأول: الـ class موجود والشكل لأ (specificity)

**المشي على السلسلة:**

1. **Elements:** اختار التاب الأول. الـ class فيه [[tab is-active]]. يبقى JS (أو الـ HTML) عمل اللي عليه.
2. **Styles:** قاعدة [[.tab.is-active]] موجودة، بس [[background]] و [[color]] فيها **متشطّبين**. وفوقها قاعدة [[#tabs .tab]] فيها [[background: #fff]] مش متشطّبة. لما تقف على الـ selector بيظهر الـ specificity:

~~~text Styles (Chrome 158) لما تقف على كل selector، ونفس الأرقام من CSS.getMatchedStylesForNode في CDP
#tabs .tab        Specificity: (1, 1, 0)
.tab.is-active    Specificity: (0, 2, 0)
~~~

3. **Computed:** [[background-color: rgb(255, 255, 255)]]، ولو فتحت السهم جنبها بيقولك جاية من [[#tabs .tab]].

**السبب:** [[(1, 1, 0)]] أكبر من [[(0, 2, 0)]] عشان أول رقم (الـ ids) بيكسب مهما كان التاني. فالقاعدة اللي فيها [[#tabs]] بتغلب حتى لو مكتوبة قبل.

**التصليح** (من الأحسن للأوحش):

| التصليح | الـ specificity | ليه |
|---|---|---|
| [[.tabs .tab]] بدل [[#tabs .tab]] (class على الـ nav) | (0, 2, 0) و (0, 2, 0) | متساويين، فاللي بعد يكسب. ودي القاعدة: classes بس للشكل |
| [[:where(#tabs) .tab]] | (0, 1, 0) | [[:where()]] بيصفّر الـ specificity بتاعة اللي جواه |
| [[#tabs .tab.is-active]] | (1, 2, 0) | شغال، بس سباق specificity هيتكرر |
| [[!important]] | — | بيكسر أي تعديل بعده |

~~~text بعد ما غيّرت #tabs .tab لـ .tabs .tab (Chrome 158)
getComputedStyle(التاب الأول).backgroundColor → rgb(29, 78, 216)
~~~

---

## ٣. الباج التاني: الدوسة مبتعملش حاجة (الـ listener على عنصر غلط)

1. **Console فاضي:** يبقى مفيش error. الكود إما مشتغلش، أو اشتغل على حاجة تانية.
2. **Elements › التاب التاني › تاب Event Listeners** (في العمود اللي جنب Styles): فاضي. وعلى التاب الأول فيه [[click]]. ونفس الكلام من Console:

~~~text CDP DOMDebugger.getEventListeners (نفس اللي في الـ pane)، Chrome 158
الوصف:      click
المواصفات:  (مفيش)
~~~

3. **Sources:** حط breakpoint في سطر [[const tab = …]] وأعد التحميل، ووقف على [[tab]]: عنصر واحد، التاب الأول.

**السبب:** [[querySelector]] بيرجّع **أول** عنصر بس. والكود كمان جواه [[t === tab]] و [[tab.dataset.panel]]، يعني حتى لو اتربط بكل التابات هيفضل يختار الأول.

**التصليح:** listener واحد على الأب، والتاب من [[e.target.closest]]:

~~~js
document.querySelector("#tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  for (const t of document.querySelectorAll(".tab")) t.classList.toggle("is-active", t === tab);
  for (const p of document.querySelectorAll(".panel")) p.hidden = p.id !== tab.dataset.panel;
});
~~~

> **Event Listener Breakpoints:** في Sources › العمود اليمين › Event Listener Breakpoints › Mouse › [[click]]. أي دوسة في الصفحة بتوقف عند أول سطر في أي listener بيتنفّذ. لو دوست ومفيش وقفة، يبقى مفيش listener وصلته الدوسة. (من وثائق Chrome DevTools.)

---

## ٤. الباج التالت: «التقييمات» مش زرار (Accessibility)

1. **Elements › Accessibility** على «التقييمات»: الـ role [[generic]]، ومفيش Focusable. وعلى «الوصف»: role [[button]] و Focusable.

~~~text شجرة الـ accessibility (Chrome 158)
button "الوصف"        focusable=true
button "المواصفات"    focusable=true
generic               (مفيش اسم ولا focus)
~~~

2. **Styles:** القواعد اللي بتطابق [[.tab]] مش بتطابقه، لأن الـ class بتاعه [[tab-x]]. فالشكل مختلف كمان.

**السبب:** [[<div class="tab-x">]] نسخة قديمة من التاب: مش عنصر بيتعمله Tab، ومش [[.tab]] فلا الـ CSS ولا الـ JS شايفينه.

**التصليح:** [[<button class="tab" type="button" data-panel="p3">التقييمات</button>]]. عنصر واحد صح بيصلّح التلات مشاكل: الشكل (الـ CSS بقى يطابقه)، والدوسة (الـ delegation بيلاقيه بـ [[closest(".tab")]])، والكيبورد وقارئ الشاشة.

---

## ٥. والنسخة المصلّحة

~~~live 230 بعد التصليح: دوس، وجرّب Tab ثم Enter
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .tabs { display: flex; gap: 4px; border-block-end: 2px solid #1d4ed8; }
  .tabs .tab { font: inherit; padding: 6px 14px; border: 1px solid #cbd5e1; border-block-end: 0; border-radius: 8px 8px 0 0; background: #fff; color: #334155; cursor: pointer; }
  .tab.is-active { background: #1d4ed8; color: #fff; }
  .tab:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
  .panel { padding: 12px 4px; }
</style>
<nav class="tabs" id="tabs">
  <button class="tab is-active" type="button" data-panel="p1">الوصف</button>
  <button class="tab" type="button" data-panel="p2">المواصفات</button>
  <button class="tab" type="button" data-panel="p3">التقييمات</button>
</nav>
<section class="panel" id="p1">كوباية سيراميك معمولة يدوي.</section>
<section class="panel" id="p2" hidden>٣٥٠ مللي، تدخل الميكروويف.</section>
<section class="panel" id="p3" hidden>٤٫٥ من ٥ (٣٢ تقييم).</section>
<script>
  document.querySelector("#tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    for (const t of document.querySelectorAll(".tab")) t.classList.toggle("is-active", t === tab);
    for (const p of document.querySelectorAll(".panel")) p.hidden = p.id !== tab.dataset.panel;
  });
</script>
~~~

> ده لسه مش tabs كاملة لقارئ الشاشة ([[role="tablist"]] و [[aria-selected]] والأسهم). تمرين «تبويبات و accordion و slider» في «بنك تمارين بالكود» بيكمّلها.

---

## ٦. باجات تانية بنفس الطريقة

| العَرَض | الحلقة المقطوعة | تشوفها فين |
|---|---|---|
| class اتحط والشكل متغيّرش | قاعدة أقوى، أو الـ selector غلط (حرف)، أو القاعدة جوه [[@media]] مش متفعّلة | Styles (متشطّبة أو مش موجودة)، و Computed |
| الشكل اتغيّر والـ class لأ | [[el.style]] من JS | Elements: [[style="..."]] على العنصر، و Styles: [[element.style]] فوق |
| [[Cannot read properties of null]] | السكربت قبل العنصر أو selector غلط | Console (درس «لما المشروع ميشتغلش») |
| الدوسة بتشتغل مرتين | listener اتسجّل مرتين (الكود اتنفّذ مرتين) | Event Listeners: اتنين [[click]] |
| العنصر موجود ومش باين | [[hidden]] أو [[display: none]] أو برّه الشاشة أو [[opacity: 0]] | Elements (العنصر باهت)، و Computed: [[display]] و [[visibility]] |
| الـ attribute اتغيّر مين غيّره؟ | كود في مكان تاني | Elements › كليك يمين › Break on › attribute modifications (من وثائق DevTools) |

---

## الخلاصة

اللي ميتلخبطش: الباج اللي مفيهوش رسالة امشي على سلسلته: Elements (اتحط؟) ← Styles (بيطابق؟ متشطّب؟) ← Computed (القيمة من مين؟) ← Event Listeners (مربوط بمين؟) ← Sources (اتنفّذ؟) ← Accessibility (ليه معنى؟). و [[$0]] و [[getEventListeners($0)]] في Console أسرع طريق.`,
          lines: [
            R`[[$0]] في Console بتاع DevTools = آخر عنصر اخترته في Elements. أسرع طريقة تمسك عنصر من غير selector`,
            R`بيوريك الـ classes اللي على العنصر دلوقتي، فتعرف JS حط الـ class ولا لأ`,
            R`القيمة النهائية بعد ما كل القواعد اتحسبت. لو مش اللي متوقعه، يبقى قاعدة تانية كسبت`,
            R`بيسأل: الـ selector ده بيطابق العنصر؟ [[true]] معناها القاعدة المفروض تشتغل، فالمشكلة في الـ cascade`,
            R`الـ listeners اللي على العنصر ده بالظبط. موجود في Console بتاع DevTools بس، مش في كود الصفحة`,
            R`عدد العناصر اللي الـ selector ده بيلاقيها: لو أقل من اللي شايفه في الصفحة، فيه عنصر مختلف`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** زميلك بيقول «حطيت [[classList.add("is-open")]] والقايمة مش بتظهر، يبقى الـ JS بايظ». اكتبله في ٤ سطور الخطوات اللي في DevTools اللي هتعرّفه الحلقة المقطوعة فين، بالترتيب.`, done: R`٤ خطوات، كل واحدة فيها التاب في DevTools والسؤال اللي بتجاوبه، وبتبدأ بالتأكد إن الـ class اتحط فعلًا.`, sol: R`1. **Elements:** اختار القايمة ودوس الزرار. السطر لمع و [[is-open]] ظهر في الـ class؟ لو لأ: الـ JS فعلًا (حط breakpoint في Sources في سطر [[add]] وشوف وصل ولا لأ، أو [[getEventListeners]] على الزرار).
2. **Styles:** فيه قاعدة [[.menu.is-open]]؟ لو مش موجودة: الـ CSS (حرف غلط في الاسم، أو الملف مش متحمّل: Network). لو موجودة ومتشطّبة: قاعدة تانية أقوى، وقف على الـ selectors وقارن الـ specificity.
3. **Computed:** [[display]] و [[visibility]] و [[opacity]] و [[transform]] قيمتهم إيه؟ ودوس السهم يقولك القيمة جاية من أنهي قاعدة. ممكن [[display: block]] صح بس [[translate]] لسه برّه الشاشة.
4. **Accessibility و Layout:** العنصر ليه مقاس (اقف عليه في Elements، المستطيل الأزرق في الصفحة)؟ ولو فيه [[hidden]] attribute أو [[inert]] فوق في الشجرة.

**الفكرة:** كل خطوة بتقفل لغة. بعد الخطوة ١ عرفت JS ولا لأ، وبعد ٢ و ٣ عرفت CSS ولا لأ. متبدأش بتعديل الكود قبل ما تعرف الحلقة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[.alert { display: none; } .alert.is-visible { display: block; }]] و [[@media (min-width: 768px) { .page .alert { display: none; } }]]، و JS بيحط [[is-visible]] صح. الرسالة بتظهر على الموبايل ومبتظهرش على الكمبيوتر. لاقي السبب من Styles وصلّحه.`, done: R`عرفت إن [[.page .alert]] جوه الـ media query specificity بتاعها (0, 2, 0) وجاية بعد، فبتكسب [[.alert.is-visible]] (0, 2, 0)، وصلّحت من غير [[!important]].`, sol: R`~~~live 160 غيّر العرض لـ «كامل» وشوف الرسالة
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .alert { display: none; padding: 8px 12px; border-radius: 8px; background: #fef3c7; }
  .alert.is-visible { display: block; }
  @media (min-width: 768px) { .page .alert:not(.is-visible) { display: none; } }
</style>
<div class="page">
  <p class="alert" role="status">الطلب اتحفظ</p>
</div>
<script>
  document.querySelector(".alert").classList.add("is-visible");
</script>
~~~

~~~text Styles على 1280 قبل التصليح (Chrome 158)
.page .alert   { display: none }    ← مش متشطّبة   (0, 2, 0)   @media (min-width: 768px)
.alert.is-visible { display: block } ← متشطّبة     (0, 2, 0)
Computed: display: none
~~~

- **السبب:** الاتنين specificity واحدة، فاللي **بعد** في الملف بيكسب، والـ media query جاية في الآخر. الـ [[@media]] مبتزوّدش specificity، هي بس بتشغّل القاعدة أو لأ. فعلى الموبايل القاعدة مش متفعّلة والرسالة ظاهرة، وعلى الكمبيوتر بتكسب.
- **التصليح:** القاعدة جوه الـ media تستثني الحالة الظاهرة: [[.page .alert:not(.is-visible)]]. ([[:not()]] بياخد specificity اللي جواه، فبقت (0, 3, 0)، بس مبقتش تطابق العنصر الظاهر أصلًا.) أو أحسن: اسأل نفسك القاعدة دي موجودة ليه أصلًا، وامسحها لو ملهاش لازمة.

~~~text بعد التصليح
360 و 1280: display = block، والرسالة ظاهرة
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زرار «أضف» بيزوّد العدّاد **اتنين** كل دوسة. الكود: [[function init() { document.querySelector(".js-add").addEventListener("click", () => { count++; out.textContent = count; }); } init(); document.querySelector(".js-reset").addEventListener("click", () => { count = 0; out.textContent = 0; init(); });]]. لاقيه بـ Event Listeners وصلّحه.`, done: R`[[getEventListeners]] على الزرار وريك ٢ [[click]] بعد ما دوست «صفّر» مرة، و ٣ بعد مرتين. وبعد التصليح ١ دايمًا.`, sol: R`~~~text Console (Chrome 158)، $0 = زرار «أضف»
أول ما الصفحة فتحت:   getEventListeners($0).click.length → 1
بعد «صفّر» مرة:        → 2   (والدوسة بتزوّد 2)
بعد «صفّر» مرتين:      → 3
~~~

**السبب:** [[init()]] بتتنده تاني في «صفّر»، و [[addEventListener]] بيضيف listener **جديد** كل مرة (دالة arrow جديدة، فالمتصفح مش شايفها نفس اللي قبلها). كل listener بيزوّد واحد.

~~~live 130 بعد التصليح: «أضف» و «صفّر»
<style> body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } button { font: inherit; padding: 4px 12px; } </style>
<p>العدد: <b class="js-out">0</b></p>
<button type="button" class="js-add">أضف</button>
<button type="button" class="js-reset">صفّر</button>
<script>
  let count = 0;
  const out = document.querySelector(".js-out");
  const render = () => { out.textContent = count; };
  document.querySelector(".js-add").addEventListener("click", () => { count++; render(); });
  document.querySelector(".js-reset").addEventListener("click", () => { count = 0; render(); });
</script>
~~~

- **الـ listeners بتتسجّل مرة واحدة** وقت التشغيل، و «صفّر» بيغيّر الحالة بس. ده نفس فصل [[state]] و [[render()]] اللي في درس «الحالة ← الصفحة».
- **لو لازم تسجّل وتشيل:** [[{ once: true }]]، أو تحفظ الدالة في متغير و [[removeEventListener]] بنفس المتغير، أو [[AbortController]] و [[signal]].

~~~text بعد التصليح
getEventListeners($0).click.length → 1 بعد أي عدد «صفّر»، والدوسة بتزوّد 1
~~~` },
            { lvl: 'تحدي', t: R`**ابني الأداة:** اكتب snippet تشغّله في Console على أي صفحة، بيطلّع جدول ([[console.table]]) بكل عنصر بيتداس (فيه [[cursor: pointer]]) **ومش** button ولا link ولا input، يعني «شكله زرار ومش زرار». جرّبه على صفحة التابات البايظة.`, done: R`الجدول فيه «التقييمات» ([[div.tab-x]] لو حطيت عليه [[cursor: pointer]])، وفاضي على النسخة المصلّحة، والـ snippet مكتوب يتنسخ ويشتغل.`, sol: R`~~~js Snippet (DevTools › Sources › Snippets، أو الصقه في Console)
const real = "a[href], button, input, select, textarea, summary, label, [role=button], [role=link], [role=tab]";
const fake = [...document.querySelectorAll("body *")].filter((el) =>
  getComputedStyle(el).cursor === "pointer" && !el.closest(real)
);
console.table(fake.map((el) => ({
  tag: el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ").join(".") : ""),
  text: el.textContent.trim().slice(0, 30),
  tabIndex: el.tabIndex,
})));
~~~

~~~text الناتج على صفحة التابات البايظة بعد ما زوّدت .tab-x { cursor: pointer } (Chrome 158)
(index)  tag          text        tabIndex
0        div.tab-x    التقييمات    -1

وعلى النسخة المصلّحة: جدول فاضي ([])
~~~

- **[[cursor: pointer]]** إشارة إن المصمم قصده «ده بيتداس». لو العنصر مش واحد من العناصر التفاعلية، يبقى مش بيوصله الكيبورد.
- **[[el.closest(real)]]** مش [[el.matches]]: عشان [[<span>]] جوه [[<button>]] واخد [[cursor: pointer]] بالوراثة ميطلعش غلط.
- **[[tabIndex = -1]]:** المتصفح بيقولك العنصر ده مش في ترتيب الـ Tab.
- **Sources › Snippets:** تحفظ الكود ده وتشغّله على أي صفحة بـ Ctrl+Enter. من وثائق Chrome DevTools.` },
          ],
          ref: [
            { t: "Chrome DevTools: View and change CSS", url: "https://developer.chrome.com/docs/devtools/css" },
            { t: "Chrome DevTools: Console utilities API reference", url: "https://developer.chrome.com/docs/devtools/console/utilities" },
            { t: "Chrome DevTools: Pause your code with breakpoints", url: "https://developer.chrome.com/docs/devtools/javascript/breakpoints" },
            { t: "Chrome DevTools: Accessibility features reference", url: "https://developer.chrome.com/docs/devtools/accessibility/reference" },
            { t: "MDN: Specificity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity" },
            { t: "MDN: :where()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where" },
            { t: "MDN: Element.closest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest" },
            { t: "MDN: EventTarget.addEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
          ],
          pre: [{ to: "css/specificity", why: R`الأرقام التلاتة اللي بتقرر أنهي قاعدة تكسب` }, { to: "css/فحص الـ CSS: validator و DevTools", why: R`Styles و Computed من ناحية CSS` }, { to: "js/breakpoints و node --inspect و source maps", why: R`الـ breakpoints في Sources` }, { to: "js/لما المشروع ميشتغلش: الأخطاء المشهورة", why: R`الأخطاء اللي ليها رسالة، والدرس ده للي مالهاش` }],
          deep: {
            why: R`الباج اللي مفيهوش رسالة بيضيّع وقت أكتر من أي باج تاني، لأن الواحد بيعدّل في الكود عشوائي. وفي مشروع فيه تلات لغات، أغلب الباجات من النوع ده: كل لغة صح لوحدها والوصلة بينهم مقطوعة. لما تعرف تمشي على السلسلة في DevTools، بتعرف المكان في دقيقة، وبتصلّح سطر واحد بدل ما تكتب الحتة من الأول.`,
            how: R`Elements بيعرض الـ DOM الحي (مش ملف الـ HTML)، فأي تغيير من JS بيظهر فيه. Styles بيعرض كل قاعدة بتطابق العنصر مترتبة بالأولوية (الأقوى فوق)، والخاصية المتشطّبة معناها إن قاعدة فوقها غلبتها. Computed بيعرض القيمة النهائية ومصدرها. Event Listeners بيقرا الـ listeners المسجلة على العنصر وأجداده. Sources بيوقف التنفيذ عند سطر أو حدث. و Accessibility بيعرض الشجرة اللي قارئ الشاشة بيقراها: role واسم وحالة لكل عنصر.`,
            when: R`أول ما حاجة «مش بتحصل» ومفيش رسالة: قبل ما تغيّر سطر. ابدأ من الآخر (الشكل) وارجع لورا (Computed ثم Styles ثم Elements ثم Event Listeners ثم Sources)، أو من الأول لو متأكد إن الحدث مش بيوصل. والـ Accessibility pane في كل مرة تعمل عنصر تفاعلي.`,
            mistakes: R`تعديل الكود قبل ما تعرف الحلقة المقطوعة. [[!important]] كأول حل. ids في selectors الشكل. [[querySelector]] لما محتاج كل العناصر. تسجيل listener جوه دالة بتتنده كذا مرة. نسخة قديمة من عنصر باسم class مختلف. افتراض إن الـ class موجود من غير ما تبص في Elements. افتراض إن [[@media]] بتزوّد specificity.`,
          },
        },
      ],
    }
]);
