// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "this",
      l: 2,
      n: "this بتتحدد وقت النداء مش وقت الكتابة، والـ arrow بتاخدها من برّه، و call و bind بيحددوها بإيدك",
      pre: [
        { to: "js/object literal", why: R`this بتظهر جوه الـ methods اللي على الـ object، فلازم تكون كاتب objects بـ methods`},
        { to: "js/closure", why: R`الـ arrow بتاخد this من برّه زي ما الـ closure بياخد أي متغير، و [[const self = this]] closure عادي`},
        { to: "js/addEventListener", why: R`نص التمارين والمشاريع handlers، و this جوه الـ handler ليها قاعدة خاصة`},
      ],
      projects: [
        { lvl: 'صغير', dir: "stopwatch", t: R`ساعة إيقاف`, what: R`object فيه [[start]] و [[stop]] و [[reset]] بيعرض الوقت في الصفحة، والـ interval جواه arrow عشان تشوف this بتاعة الـ object. من درس arrow و this.`, done: R`start و stop و reset شغالين بأي ترتيب، و start مرتين مبتعدّش الضعف، والأزرار متربوطة صح ([[btn.addEventListener("click", () => sw.start())]] مش [[sw.start]] لوحدها).`, sol: R`~~~live 230 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ساعة إيقاف</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #0f172a; color: #f8fafc; text-align: center; }
  #time { font: 700 56px/1.2 ui-monospace, monospace; direction: ltr; margin: 12px 0; }
  button { font: inherit; padding: 6px 18px; margin: 4px; border: 1px solid #94a3b8; border-radius: 8px; background: #1e293b; color: inherit; cursor: pointer; }
</style>
</head>
<body>
<div id="time">00:00.0</div>
<button type="button" id="start">ابدأ</button>
<button type="button" id="stop">وقّف</button>
<button type="button" id="reset">صفّر</button>
<script>
  const display = document.querySelector("#time");

  const sw = {
    elapsed: 0,          // الملّي ثانية اللي اتجمعت قبل آخر start
    startedAt: null,     // Date.now() وقت آخر start، أو null وهي واقفة
    id: null,            // رقم الـ interval اللي بيرسم
    now() {
      return this.elapsed + (this.startedAt === null ? 0 : Date.now() - this.startedAt);
    },
    start() {
      if (this.id !== null) return;                    // شغالة أصلًا
      this.startedAt = Date.now();
      this.id = setInterval(() => this.render(), 100); // arrow: this = sw
      this.render();
    },
    stop() {
      if (this.id === null) return;
      clearInterval(this.id);
      this.id = null;
      this.elapsed += Date.now() - this.startedAt;
      this.startedAt = null;
      this.render();
    },
    reset() {
      this.stop();
      this.elapsed = 0;
      this.render();
    },
    format(ms) {
      const tenths = Math.floor(ms / 100);
      const m = Math.floor(tenths / 600);
      const s = Math.floor(tenths / 10) % 60;
      return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0") + "." + (tenths % 10);
    },
    render() {
      display.textContent = this.format(this.now());
    },
  };

  document.querySelector("#start").addEventListener("click", () => sw.start());
  document.querySelector("#stop").addEventListener("click", () => sw.stop());
  document.querySelector("#reset").addEventListener("click", () => sw.reset());
</script>
</body>
</html>
~~~

## هتشوف إيه

رقم كبير [[00:00.0]] وتحته ٣ أزرار. «ابدأ» بيشغّل العدّ بعُشر الثانية، و «وقّف» بيثبّت الرقم، و «ابدأ» تاني بيكمّل من مكانه، و «صفّر» بيرجّعه صفر حتى لو شغالة.

~~~text الناتج (Chrome 157، Playwright)
ابدأ، 1.25 ثانية، وقّف            → 00:01.2
ابدأ مرتين ورا بعض، 1 ثانية، وقّف → 00:02.2   (كمّلت من 1.2، ومعدّتش الضعف)
الـ intervals الشغالة بعد الضغطتين → 1
صفّر وهي شغالة                    → 00:00.0، والـ interval اتقفل
~~~

## كل حتة بتعمل إيه

- **الوقت من [[Date.now()]] مش من عدّ الـ ticks:** [[setInterval]] مش مضمون يشتغل كل 100ms بالظبط (التاب في الخلفية بيتبطّأ لحد ثانية). فالـ interval بيرسم بس، والوقت الحقيقي بيتحسب من الفرق بين دلوقتي و [[startedAt]].
- **[[elapsed]]:** اللي اتجمع قبل كده. [[stop]] بتضيف عليه المدة الأخيرة، فـ [[start]] تاني بتكمّل من مكانها.
- **[[setInterval(() => this.render(), 100)]]:** الـ arrow جوه start، فـ this هي sw. لو function عادية this كانت هتبقى window و [[this.render]] مش موجودة.
- **[[if (this.id !== null) return]]:** بيمنع interval تاني. و [[stop]] بتحط [[id = null]] عشان start تقدر تشتغل تاني.
- **الأزرار بـ [[() => sw.start()]]:** لو [[addEventListener("click", sw.start)]] this جوه start هتبقى الزرار، و [[this.startedAt]] هيتكتب على الزرار والساعة مش هتتحرك.
- **[[direction: ltr]]** على الرقم: عشان الصفحة RTL، والأرقام والنقطتين لازم يفضلوا بالترتيب ده.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة كانت [[this.tenths++]] كل 100ms:** بعد دقيقة في تاب في الخلفية الساعة كانت متأخرة ثواني. الحل الحساب من [[Date.now()]].
- **[[stop()]] كانت بتعمل [[elapsed = this.now()]] بعد ما [[startedAt = null]]:** الحساب ضاع وكل وقفة بترجع لآخر قيمة قبلها. الترتيب: اجمع الأول وبعدين صفّر [[startedAt]].` },
        { lvl: 'صغير', t: R`loggers بأسامي`, what: R`[[makeLogger(name)]] بترجّع [[{ info, warn, error }]] كل واحدة [[console.x.bind(console, "[" + name + "]")]]، واستخدمها في جزئين من الكود. من درس call و apply و bind.`, done: R`[[db.info("connected")]] بيطبع [[[db] connected]] و [[ui.warn("slow")]] بيطلع تحذير أصفر فيه [[[ui] slow]]، ورقم السطر في Console بيشاور على مكان النداء مش على ملف الـ logger.`, sol: R`~~~js logger.js
function makeLogger(name) {
  const tag = "[" + name + "]";
  return {
    info: console.info.bind(console, tag),
    warn: console.warn.bind(console, tag),
    error: console.error.bind(console, tag),
  };
}

if (typeof module !== "undefined") module.exports = makeLogger;
~~~

~~~js app.js
// في Node بـ require، وفي المتصفح makeLogger جاية من logger.js اللي اتحمّل قبله
const createLogger = typeof require === "function" ? require("./logger.js") : makeLogger;

const db = createLogger("db");
const ui = createLogger("ui");

db.info("connected");
ui.warn("slow");
db.error("timeout after", 3000, "ms");
ui.info("render", { items: 3 });
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>loggers</title></head>
<body>
<p>افتح Console (F12).</p>
<script src="logger.js"></script>
<script src="app.js"></script>
</body>
</html>
~~~

## هتشوف إيه

~~~text الناتج (node app.js، Node 24)
[db] connected
[ui] slow
[db] timeout after 3000 ms
[ui] render { items: 3 }
~~~

وفي Chrome (الصفحة من سيرفر محلي، اتقري بـ Playwright من [[msg.location()]]):

~~~text Console بتاع Chrome 157
info     [db] connected                 app.js:7
warning  [ui] slow                      app.js:8    ← أصفر
error    [db] timeout after 3000 ms     app.js:9    ← أحمر
info     [ui] render {items: 3}         app.js:10
~~~

## كل حتة بتعمل إيه

- **[[console.info.bind(console, tag)]]:** دالة جديدة this فيها console، وأول argument متثبت بالـ tag. فـ [[db.info("connected")]] = [[console.info("[db]", "connected")]]. وأي arguments زيادة (رقم أو object) بتتطبع بشكلها، مش متحوّلة لنص.
- **رقم السطر:** ده المكسب الحقيقي من bind. الدالة المربوطة هي console.info نفسها، فـ DevTools بيكتب جنب الرسالة مكان **النداء** ([[app.js:8]]) مش [[logger.js]]. لو كتبت wrapper عادي [[info: (...a) => console.info(tag, ...a)]] كل الرسايل هتشاور على سطر جوه logger.js.
- **[[warn]] و [[error]]:** في المتصفح أصفر وأحمر وبيتفلتروا من قايمة المستويات. وفي Node بيروحوا لـ stderr (عشان كده تقدر تفصلهم بـ [[node app.js 2> errors.log]]).
- **سطر [[createLogger]]:** نفس الملف شغال في Node والمتصفح. في Node [[require]] موجودة، وفي المتصفح الدالة [[makeLogger]] جاية من الـ script اللي قبله. (اسم مختلف عشان [[const makeLogger]] كانت هتتعارض مع الـ function declaration اللي بنفس الاسم وترمي [[SyntaxError: Identifier 'makeLogger' has already been declared]].)

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة كانت wrapper بـ arrow:** كل الرسايل في Chrome كانت بتقول [[logger.js:4]]، فمش عارف مين اللي كتب. الـ bind حلّها.
- **[[const makeLogger = require(...)]] في app.js:** في المتصفح السطر ده وقع بالـ SyntaxError اللي فوق، والصفحة مطبعتش حاجة. الحل اسم تاني.` },
        { lvl: 'متوسط', dir: "mini-jquery", t: R`jQuery صغير بتاعك`, what: R`[[$(selector)]] بترجّع object فيه [[els]] (array العناصر) و methods بترجّع [[this]] عشان تتسلسل: [[addClass]] و [[text]] و [[on(event, fn)]]، و [[on]] بتنادي fn بـ [[fn.call(el, e)]] عشان this جوه الـ handler يبقى العنصر. من دروس this و call و apply و bind، والـ DOM.`, done: R`[[$("li").addClass("x").text("hi")]] بتشتغل في سطر واحد على كل العناصر، وجوه [[on("click", function () { ... })]] الـ [[this]] هو العنصر اللي اتضغط، و [[$("#nope")]] مبيقعش وبيعمل ولا حاجة.`, sol: R`~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>jQuery صغير</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  li { padding: 4px 8px; margin: 4px 0; border-radius: 6px; cursor: pointer; list-style: none; }
  .item { background: #e2e8f0; }
  .picked { background: #bbf7d0; font-weight: 700; }
  #log { color: #475569; }
</style>
</head>
<body>
<h1 id="title">...</h1>
<ul>
  <li>قهوة</li>
  <li>شاي</li>
  <li>كاكاو</li>
</ul>
<p id="log"></p>
<script>
  function $(target) {
    const els =
      typeof target === "string" ? [...document.querySelectorAll(target)] :
      target instanceof Element ? [target] : [];
    return {
      els,
      addClass(name) {
        els.forEach((el) => el.classList.add(name));
        return this;                                   // عشان تتسلسل
      },
      text(value) {
        if (value === undefined) return els[0]?.textContent ?? "";
        els.forEach((el) => { el.textContent = value; });
        return this;
      },
      on(type, fn) {
        els.forEach((el) => el.addEventListener(type, (e) => fn.call(el, e)));
        return this;
      },
    };
  }

  $("#title").text("المشروبات").addClass("title");
  $("li").addClass("item").on("click", function () {
    $(this).addClass("picked");                        // this = العنصر اللي اتضغط
    $("#log").text("اخترت: " + $(this).text());
  });
  $("#nope").addClass("x").text("مش هيحصل حاجة").on("click", () => {});
</script>
</body>
</html>
~~~

## هتشوف إيه

عنوان «المشروبات» وتحته ٣ عناصر رمادي. أي عنصر تضغطه بيخضرّ وبيتقِل، والسطر اللي تحت بيقول «اخترت: ...». وسطر [[$("#nope")]] اللي بيدوّر على عنصر مش موجود بيعدّي من غير ولا error.

~~~text الناتج (Chrome 157، Playwright)
#title بعد التشغيل       → «المشروبات»، class="title"
li                       → ٣ عناصر كلهم class="item"
ضغطة على «شاي»           → class="item picked"، و #log: «اخترت: شاي»
$("#nope").els.length    → 0، ومفيش error في Console
~~~

## كل حتة بتعمل إيه

- **[[$(target)]]:** بتقبل selector (نص) أو عنصر جاهز. [[[...document.querySelectorAll(target)]]] بتحوّل الـ NodeList لـ array. ولو مفيش ولا عنصر، [[els]] فاضية وكل الـ methods بتلف على فاضي، فمفيش crash.
- **[[return this]] في كل method:** this هنا الـ object اللي [[$()]] رجّعته (لأن النداء [[obj.addClass(...)]] فيه نقطة)، فالنداء اللي بعده بيتعمل على نفس الـ object: [[$("li").addClass("item").on(...)]].
- **[[fn.call(el, e)]]:** بننادي دالة اليوزر بـ this = العنصر، زي jQuery الحقيقية. عشان كده جوه [[function () { ... }]] بتقدر تكتب [[$(this)]]. لاحظ إن الـ wrapper نفسه arrow، عادي، لأن this اللي بتوصل لدالة اليوزر بتتحدد بالـ call مش بالـ wrapper.
- **[[text()]] من غير argument:** بتقرا نص أول عنصر (getter)، ومع argument بتكتب في الكل (setter وبترجّع this).

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[addClass]] كانت arrow:** [[addClass: (name) => { ...; return this; }]]. الـ this طلع [[window]] فالتسلسل وقع: [[TypeError: $(...).addClass(...).on is not a function]]. الـ methods لازم شكلها العادي.
- **[[on]] كانت [[el.addEventListener(type, fn)]] على طول:** شغالة وthis = العنصر، بس لو اليوزر بعت arrow بتاعته الـ this بتضيع. الـ [[call]] بتخلّي السلوك واحد ومكتوب صريح.` },
        { lvl: 'متوسط', dir: "tabs-widget", t: R`widget tabs بيتشال نضيف`, what: R`object [[tabs]] فيه [[init(root)]] بيضيف listeners و [[destroy()]] بيشيلهم. الـ handlers methods على الـ object، فبتربطها بـ bind مرة واحدة في init وتخزّنها. من دروس this و call و apply و bind، و event delegation.`, done: R`بعد [[destroy()]] الضغط على أي tab مبيعملش حاجة، و [[init]] تاني بيرجّعه شغال، و [[init]] على اتنين root مختلفين كل واحد بيشتغل لوحده (اعمل نسخة object لكل واحد).`, sol: R`~~~live 380 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>tabs بتتشال نضيف</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  .tabs { border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px; margin-bottom: 12px; background: #fff; }
  [role="tab"] { font: inherit; padding: 4px 12px; border: 0; border-bottom: 3px solid transparent; background: none; cursor: pointer; }
  [role="tab"][aria-selected="true"] { border-color: #2563eb; font-weight: 700; }
  [role="tabpanel"] { padding: 8px 4px 0; }
  .controls button { font: inherit; margin-inline-end: 6px; }
</style>
</head>
<body>
<div class="tabs" id="product">
  <div role="tablist">
    <button type="button" role="tab" data-tab="desc" aria-selected="true">الوصف</button>
    <button type="button" role="tab" data-tab="specs" aria-selected="false">المواصفات</button>
  </div>
  <div role="tabpanel" data-tab="desc">مج سيراميك 350 مل.</div>
  <div role="tabpanel" data-tab="specs" hidden>الوزن 300 جرام.</div>
</div>
<div class="tabs" id="faq">
  <div role="tablist">
    <button type="button" role="tab" data-tab="ship" aria-selected="true">الشحن</button>
    <button type="button" role="tab" data-tab="return" aria-selected="false">الإرجاع</button>
  </div>
  <div role="tabpanel" data-tab="ship">من ٢ لـ ٤ أيام.</div>
  <div role="tabpanel" data-tab="return" hidden>خلال ١٤ يوم.</div>
</div>
<p class="controls">
  <button type="button" id="destroy">destroy للأول</button>
  <button type="button" id="init">init للأول تاني</button>
</p>
<script>
  const tabs = {
    root: null,
    boundClick: null,
    init(root) {
      if (this.root) return this;                       // متعملش listener تاني
      this.root = root;
      this.boundClick = this.onClick.bind(this);        // نسخة مربوطة مرة واحدة ومتخزّنة
      root.addEventListener("click", this.boundClick);
      return this;
    },
    destroy() {
      if (!this.root) return;
      this.root.removeEventListener("click", this.boundClick);   // نفس الـ reference
      this.root = null;
      this.boundClick = null;
    },
    onClick(e) {
      const tab = e.target.closest('[role="tab"]');
      if (tab) this.select(tab.dataset.tab);
    },
    select(name) {
      this.root.querySelectorAll('[role="tab"]').forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === name)));
      this.root.querySelectorAll('[role="tabpanel"]').forEach((p) => { p.hidden = p.dataset.tab !== name; });
    },
  };

  const productTabs = { ...tabs }.init(document.querySelector("#product"));
  const faqTabs = { ...tabs }.init(document.querySelector("#faq"));

  document.querySelector("#destroy").addEventListener("click", () => productTabs.destroy());
  document.querySelector("#init").addEventListener("click", () => productTabs.init(document.querySelector("#product")));
</script>
</body>
</html>
~~~

## هتشوف إيه

صندوقين tabs: «الوصف / المواصفات» و «الشحن / الإرجاع». كل صندوق بيقلّب لوحده. «destroy للأول» بيخلّي الأول ميستجبش (التاني شغال عادي)، و «init للأول تاني» بيرجّعه.

~~~text الناتج (Chrome 157، Playwright)
ضغطة «المواصفات»                   → الأول بيعرض «الوزن 300 جرام»، التاني زي ما هو
ضغطة «الإرجاع»                     → التاني بيعرض «خلال ١٤ يوم»، الأول زي ما هو
destroy للأول، ضغطة «الوصف»        → الأول لسه على «المواصفات» (مفيش استجابة)
destroy مرتين                      → مفيش error
init للأول، ضغطة «الوصف»           → رجع «مج سيراميك 350 مل.»
init مرتين، وبعدين destroy، وضغطة  → مفيش استجابة (مفيش listener زيادة اتساب)
~~~

## كل حتة بتعمل إيه

- **[[this.onClick.bind(this)]] في init وتخزينها في [[boundClick]]:** الـ handler method بتستخدم this، والمتصفح بيناديها بـ this = الـ root، فلازم bind. ولأن كل bind دالة جديدة، بنعملها **مرة واحدة** ونخزّنها، فـ [[removeEventListener]] في destroy بيلاقي نفس الـ reference ويشيله فعلًا.
- **[[if (this.root) return this]]:** init مرتين متعملش listener تاني. ومن غير السطر ده، init التانية كانت هتكتب فوق [[boundClick]] والأولى تفضل متعلّقة للأبد ومحدش يقدر يشيلها.
- **[[{ ...tabs }]]:** نسخة object لكل صندوق، فيها نفس الـ methods بس [[root]] و [[boundClick]] بتوعها. الـ methods بتستخدم this، فكل نسخة شغالة على بياناتها. (في الوحدة الجاية ده هيبقى [[class Tabs]] و [[new]].)
- **event delegation:** listener واحد على الـ root بدل واحد لكل tab، و [[closest('[role="tab"]')]] بيعرّفنا اللي اتضغط.
- **[[aria-selected]] و [[hidden]]:** القارئ الصوتي بيعرف أنهي tab مختار، والـ panels التانية مخفية فعلًا.

## الغلطات اللي حصلت وإزاي اتصلحت

- **[[root.removeEventListener("click", this.onClick.bind(this))]] في destroy:** الضغط فضل شغال بعد destroy. نفس فخ تمرين bind: دالة جديدة مش هي اللي اتضافت.
- **object واحد [[tabs]] للصندوقين:** init الأول اشتغلت، والتانية رجعت على طول لأن [[this.root]] مش null. الحل نسخة لكل صندوق.` },
        { lvl: 'كبير', dir: "modal-factory", t: R`modal بيتعمل لأي حاجة`, what: R`[[createModal({ title, body, onConfirm })]] بترجّع object فيه [[open]] و [[close]] و [[destroy]]. وهو مفتوح: Esc والضغط على الخلفية بيقفلوه، والـ listeners دول بيتضافوا في [[open]] ويتشالوا في [[close]] (بنسخ مربوطة متخزنة)، والفوكس بيرجع للزرار اللي فتحه. التحقق: [[title]] لازم string مش فاضية وإلا [[TypeError]] برسالة واضحة، والنصوص بـ [[textContent]]، و [[onConfirm]] لو رمت error المودال ميتقفلش وبيعرض الرسالة. وكل open و close بيتكتبوا بـ [[console.debug]]. من الوحدة دي و scope و closures والـ DOM.`, done: R`مودالين في نفس الصفحة كل واحد بيقفل لوحده، و ١٠ مرات فتح وقفل وبعدهم Esc بيشغّل handler واحد بس (حط log واتأكد)، وبعد [[destroy()]] مفيش عنصر باقي في الـ DOM، و [[createModal({})]] بيرمي TypeError، و title فيه [[<b>]] بيظهر كنص.`, ext: R`زوّد trap للفوكس جوه المودال بـ Tab، وأنيميشن فتح وقفل، وحوّله لـ [[<dialog>]] الحقيقي وقارن الكود.`, sol: R`## الشكل النهائي

~~~view 420 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مودال لأي حاجة</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  button { font: inherit; padding: 6px 14px; margin: 4px; border: 1px solid #94a3b8; border-radius: 8px; background: #fff; cursor: pointer; }
  .modal-backdrop { position: fixed; inset: 0; background: rgb(15 23 42 / 0.55); display: grid; place-items: center; padding: 16px; }
  .modal-backdrop[hidden] { display: none; }
  .modal { background: #fff; border-radius: 12px; padding: 16px; width: min(360px, 100%); box-shadow: 0 10px 30px rgb(0 0 0 / 0.3); }
  .modal h2 { margin: 0 0 8px; font-size: 20px; }
  .modal-error { color: #b91c1c; min-height: 1.6em; margin: 4px 0; }
</style>
</head>
<body>
<h1>الإعدادات</h1>
<button type="button" id="open-delete">احذف الحساب</button>
<button type="button" id="open-news">اشترك في النشرة</button>
<button type="button" id="destroy-news">امسح مودال النشرة نهائيًا</button>
<p id="status"></p>
<script>
// كل نداء بيعمل مودال جديد. الـ listeners بتاعة Esc والخلفية بتتضاف في open وتتشال في close بنفس النسخ المربوطة.
function createModal(options, doc = globalThis.document) {
  const { title, body = "", onConfirm = () => {}, log = console.debug } = options ?? {};
  if (typeof title !== "string" || title.trim() === "") {
    throw new TypeError("createModal: title لازم يبقى نص مش فاضي");
  }
  if (typeof onConfirm !== "function") {
    throw new TypeError("createModal: onConfirm لازم يبقى function");
  }

  const backdrop = doc.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.hidden = true;
  const box = doc.createElement("div");
  box.className = "modal";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", title);
  const heading = doc.createElement("h2");
  heading.textContent = title;                       // نص، مش HTML
  const text = doc.createElement("p");
  text.textContent = body;
  const error = doc.createElement("p");
  error.className = "modal-error";
  error.setAttribute("role", "alert");
  const confirmBtn = doc.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.textContent = "تأكيد";
  const cancelBtn = doc.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "إلغاء";
  box.append(heading, text, error, confirmBtn, cancelBtn);
  backdrop.append(box);
  doc.body.append(backdrop);

  const modal = {
    isOpen: false,
    destroyed: false,
    opener: null,
    open() {
      if (this.isOpen || this.destroyed) return this;
      this.isOpen = true;
      this.opener = doc.activeElement;              // نرجّعله الفوكس بعدين
      backdrop.hidden = false;
      doc.addEventListener("keydown", this.onKeydown);
      backdrop.addEventListener("click", this.onBackdrop);
      confirmBtn.focus();
      log("[modal] open:", title);
      return this;
    },
    close() {
      if (!this.isOpen) return this;
      this.isOpen = false;
      backdrop.hidden = true;
      error.textContent = "";
      doc.removeEventListener("keydown", this.onKeydown);
      backdrop.removeEventListener("click", this.onBackdrop);
      this.opener?.focus?.();
      log("[modal] close:", title);
      return this;
    },
    confirm() {
      try {
        onConfirm();
        this.close();
      } catch (e) {
        error.textContent = e.message;               // المودال فاضل مفتوح
        log("[modal] confirm failed:", e.message);
      }
    },
    destroy() {
      this.close();
      backdrop.remove();
      this.destroyed = true;
    },
    handleKeydown(e) {
      if (e.key === "Escape") this.close();
    },
    handleBackdrop(e) {
      if (e.target === backdrop) this.close();       // الضغط جوه الصندوق مبيقفلش
    },
  };

  // نسخ مربوطة مرة واحدة: نفس الـ reference في addEventListener و removeEventListener
  modal.onKeydown = modal.handleKeydown.bind(modal);
  modal.onBackdrop = modal.handleBackdrop.bind(modal);
  confirmBtn.addEventListener("click", () => modal.confirm());
  cancelBtn.addEventListener("click", () => modal.close());
  return modal;
}

if (typeof module !== "undefined") module.exports = { createModal };
</script>
<script>
  const statusEl = document.querySelector("#status");
  let attempts = 0;

  const deleteModal = createModal({
    title: "تحذف الحساب؟",
    body: "الحذف مبيترجعش.",
    onConfirm() {
      attempts++;
      if (attempts === 1) throw new Error("السيرفر مش متاح، جرّب تاني");
      statusEl.textContent = "اتحذف (محاولة " + attempts + ")";
    },
  });

  const newsModal = createModal({
    title: "<b>النشرة</b> الأسبوعية",
    body: "رسالة واحدة كل أسبوع.",
    onConfirm() { statusEl.textContent = "اشتركت"; },
  });

  document.querySelector("#open-delete").addEventListener("click", () => deleteModal.open());
  document.querySelector("#open-news").addEventListener("click", () => newsModal.open());
  document.querySelector("#destroy-news").addEventListener("click", () => {
    newsModal.destroy();
    statusEl.textContent = "مودال النشرة اتمسح";
  });

  try {
    createModal({});
  } catch (e) {
    console.warn(e.name + ": " + e.message);
  }
</script>
</body>
</html>
~~~

## هتشوف إيه

٣ أزرار. «احذف الحساب» بيفتح مودال: أول «تأكيد» بيطلع رسالة حمرا «السيرفر مش متاح، جرّب تاني» والمودال فاضل مفتوح، والتاني بيقفله ويكتب «اتحذف». «اشترك في النشرة» بيفتح مودال تاني عنوانه فيه [[<b>]] بيظهر كنص زي ما هو. Esc أو الضغط على الخلفية الغامقة بيقفل، والفوكس بيرجع للزرار اللي فتح. «امسح مودال النشرة نهائيًا» بيشيله من الصفحة.

~~~text الناتج (Chrome 157، Playwright، الملفات من سيرفر محلي)
فتح «احذف» وتأكيد                → «السيرفر مش متاح، جرّب تاني»، لسه مفتوح
تأكيد تاني                       → اتقفل، و #status: «اتحذف (محاولة 2)»
فتح «النشرة»                     → العنوان النصي «<b>النشرة</b> الأسبوعية»، ومفيش <b> في الـ DOM
Esc                              → اتقفل، و document.activeElement = زرار «اشترك في النشرة»
ضغطة على الخلفية / جوه الصندوق   → بيقفل / مبيقفلش
١٠ مرات فتح وقفل ثم فتح و Esc    → [modal] close اتكتبت مرة واحدة بعد الـ Esc
destroy                          → .modal-backdrop في الصفحة: 1 بدل 2، وفتح بعدها مبيعملش حاجة
createModal({})                  → TypeError: createModal: title لازم يبقى نص مش فاضي
~~~

## شجرة الملفات وترتيب البناء

~~~text الملفات
modal-factory/
├── index.html       ← الصفحة والـ CSS، ومودالين متجرّبين
├── modal.js         ← createModal: بيشتغل في المتصفح، وبيتصدّر لـ Node
└── modal.test.js    ← اختبارات بـ node --test على DOM مزيّف صغير
~~~

1. [[createModal]] بالتحقق والعناصر بس، وافتحه بإيدك.
2. [[open]] و [[close]] بالـ [[hidden]]، وبعدين Esc والخلفية بالنسخ المربوطة.
3. الفوكس، و [[onConfirm]] اللي بترمي، و [[destroy]].
4. الاختبارات: كل سلوك من اللي فوق اختبار.

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مودال لأي حاجة</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  button { font: inherit; padding: 6px 14px; margin: 4px; border: 1px solid #94a3b8; border-radius: 8px; background: #fff; cursor: pointer; }
  .modal-backdrop { position: fixed; inset: 0; background: rgb(15 23 42 / 0.55); display: grid; place-items: center; padding: 16px; }
  .modal-backdrop[hidden] { display: none; }
  .modal { background: #fff; border-radius: 12px; padding: 16px; width: min(360px, 100%); box-shadow: 0 10px 30px rgb(0 0 0 / 0.3); }
  .modal h2 { margin: 0 0 8px; font-size: 20px; }
  .modal-error { color: #b91c1c; min-height: 1.6em; margin: 4px 0; }
</style>
</head>
<body>
<h1>الإعدادات</h1>
<button type="button" id="open-delete">احذف الحساب</button>
<button type="button" id="open-news">اشترك في النشرة</button>
<button type="button" id="destroy-news">امسح مودال النشرة نهائيًا</button>
<p id="status"></p>
<script src="modal.js"></script>
<script>
  const statusEl = document.querySelector("#status");
  let attempts = 0;

  const deleteModal = createModal({
    title: "تحذف الحساب؟",
    body: "الحذف مبيترجعش.",
    onConfirm() {
      attempts++;
      if (attempts === 1) throw new Error("السيرفر مش متاح، جرّب تاني");
      statusEl.textContent = "اتحذف (محاولة " + attempts + ")";
    },
  });

  const newsModal = createModal({
    title: "<b>النشرة</b> الأسبوعية",
    body: "رسالة واحدة كل أسبوع.",
    onConfirm() { statusEl.textContent = "اشتركت"; },
  });

  document.querySelector("#open-delete").addEventListener("click", () => deleteModal.open());
  document.querySelector("#open-news").addEventListener("click", () => newsModal.open());
  document.querySelector("#destroy-news").addEventListener("click", () => {
    newsModal.destroy();
    statusEl.textContent = "مودال النشرة اتمسح";
  });

  try {
    createModal({});
  } catch (e) {
    console.warn(e.name + ": " + e.message);
  }
</script>
</body>
</html>
~~~

~~~js modal.js
// كل نداء بيعمل مودال جديد. الـ listeners بتاعة Esc والخلفية بتتضاف في open وتتشال في close بنفس النسخ المربوطة.
function createModal(options, doc = globalThis.document) {
  const { title, body = "", onConfirm = () => {}, log = console.debug } = options ?? {};
  if (typeof title !== "string" || title.trim() === "") {
    throw new TypeError("createModal: title لازم يبقى نص مش فاضي");
  }
  if (typeof onConfirm !== "function") {
    throw new TypeError("createModal: onConfirm لازم يبقى function");
  }

  const backdrop = doc.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.hidden = true;
  const box = doc.createElement("div");
  box.className = "modal";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", title);
  const heading = doc.createElement("h2");
  heading.textContent = title;                       // نص، مش HTML
  const text = doc.createElement("p");
  text.textContent = body;
  const error = doc.createElement("p");
  error.className = "modal-error";
  error.setAttribute("role", "alert");
  const confirmBtn = doc.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.textContent = "تأكيد";
  const cancelBtn = doc.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "إلغاء";
  box.append(heading, text, error, confirmBtn, cancelBtn);
  backdrop.append(box);
  doc.body.append(backdrop);

  const modal = {
    isOpen: false,
    destroyed: false,
    opener: null,
    open() {
      if (this.isOpen || this.destroyed) return this;
      this.isOpen = true;
      this.opener = doc.activeElement;              // نرجّعله الفوكس بعدين
      backdrop.hidden = false;
      doc.addEventListener("keydown", this.onKeydown);
      backdrop.addEventListener("click", this.onBackdrop);
      confirmBtn.focus();
      log("[modal] open:", title);
      return this;
    },
    close() {
      if (!this.isOpen) return this;
      this.isOpen = false;
      backdrop.hidden = true;
      error.textContent = "";
      doc.removeEventListener("keydown", this.onKeydown);
      backdrop.removeEventListener("click", this.onBackdrop);
      this.opener?.focus?.();
      log("[modal] close:", title);
      return this;
    },
    confirm() {
      try {
        onConfirm();
        this.close();
      } catch (e) {
        error.textContent = e.message;               // المودال فاضل مفتوح
        log("[modal] confirm failed:", e.message);
      }
    },
    destroy() {
      this.close();
      backdrop.remove();
      this.destroyed = true;
    },
    handleKeydown(e) {
      if (e.key === "Escape") this.close();
    },
    handleBackdrop(e) {
      if (e.target === backdrop) this.close();       // الضغط جوه الصندوق مبيقفلش
    },
  };

  // نسخ مربوطة مرة واحدة: نفس الـ reference في addEventListener و removeEventListener
  modal.onKeydown = modal.handleKeydown.bind(modal);
  modal.onBackdrop = modal.handleBackdrop.bind(modal);
  confirmBtn.addEventListener("click", () => modal.confirm());
  cancelBtn.addEventListener("click", () => modal.close());
  return modal;
}

if (typeof module !== "undefined") module.exports = { createModal };
~~~

~~~js modal.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { createModal } = require("./modal.js");

// DOM مزيّف صغير: كفاية للحاجات اللي createModal بتستخدمها بس
class FakeEl {
  constructor(tag, doc) {
    this.tagName = tag.toUpperCase();
    this.doc = doc;
    this.children = [];
    this.parent = null;
    this.attrs = {};
    this.listeners = {};
    this.hidden = false;
    this.textContent = "";
  }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  append(...els) { for (const el of els) { el.parent = this; this.children.push(el); } }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter((c) => c !== this); this.parent = null; }
  addEventListener(type, fn) { (this.listeners[type] ??= new Set()).add(fn); }
  removeEventListener(type, fn) { this.listeners[type]?.delete(fn); }
  count(type) { return this.listeners[type]?.size ?? 0; }
  fire(type, extra = {}) { for (const fn of [...(this.listeners[type] ?? [])]) fn({ target: this, ...extra }); }
  focus() { this.doc.activeElement = this; }
}
class FakeDoc extends FakeEl {
  constructor() {
    super("#document", null);
    this.doc = this;
    this.body = new FakeEl("body", this);
    this.activeElement = this.body;
  }
  createElement(tag) { return new FakeEl(tag, this); }
}
function setup(extra = {}) {
  const doc = new FakeDoc();
  const logs = [];
  const modal = createModal({ title: "عنوان", log: (...a) => logs.push(a.join(" ")), ...extra }, doc);
  const backdrop = doc.body.children.at(-1);
  const box = backdrop.children[0];
  return { doc, logs, modal, backdrop, box, confirmBtn: box.children[3] };
}

test("التحقق: title فاضي أو مش نص أو onConfirm مش دالة بيرمي TypeError", () => {
  const doc = new FakeDoc();
  assert.throws(() => createModal({}, doc), { name: "TypeError", message: "createModal: title لازم يبقى نص مش فاضي" });
  assert.throws(() => createModal(undefined, doc), TypeError);
  assert.throws(() => createModal({ title: "   " }, doc), TypeError);
  assert.throws(() => createModal({ title: "x", onConfirm: "yes" }, doc), /onConfirm/);
  assert.equal(doc.body.children.length, 0);
});

test("١٠ مرات فتح وقفل: مفيش listener زيادة، و Esc بيشغّل handler واحد", () => {
  const { doc, logs, modal } = setup();
  for (let i = 0; i < 10; i++) { modal.open(); modal.close(); }
  assert.equal(doc.count("keydown"), 0);
  modal.open();
  modal.open();                                      // فتح مرتين مبيضيفش
  assert.equal(doc.count("keydown"), 1);
  logs.length = 0;
  doc.fire("keydown", { key: "Escape" });
  assert.deepEqual(logs, ["[modal] close: عنوان"]);
  assert.equal(modal.isOpen, false);
});

test("الخلفية بتقفل، والضغط جوه الصندوق لأ، وزرار غير Esc لأ", () => {
  const { doc, modal, backdrop, box } = setup();
  modal.open();
  doc.fire("keydown", { key: "Enter" });
  backdrop.fire("click", { target: box });
  assert.equal(modal.isOpen, true);
  backdrop.fire("click");
  assert.equal(modal.isOpen, false);
});

test("الفوكس بيروح لزرار التأكيد وبيرجع للي فتح", () => {
  const { doc, modal, confirmBtn } = setup();
  const opener = doc.createElement("button");
  opener.focus();
  modal.open();
  assert.equal(doc.activeElement, confirmBtn);
  modal.close();
  assert.equal(doc.activeElement, opener);
});

test("onConfirm لو رمت: المودال فاضل مفتوح والرسالة ظاهرة، والمرة اللي بعدها بيقفل", () => {
  let n = 0;
  const { modal, box } = setup({ onConfirm() { if (++n === 1) throw new Error("فشل"); } });
  modal.open();
  modal.confirm();
  assert.equal(modal.isOpen, true);
  assert.equal(box.children[2].textContent, "فشل");
  modal.confirm();
  assert.equal(modal.isOpen, false);
  assert.equal(box.children[2].textContent, "");
});

test("destroy بيشيل العنصر، والفتح بعده مبيعملش حاجة، ومودالين مستقلين", () => {
  const doc = new FakeDoc();
  const a = createModal({ title: "A", log() {} }, doc);
  const b = createModal({ title: "B", log() {} }, doc);
  a.open();
  b.open();
  b.close();
  assert.equal(a.isOpen, true);
  a.destroy();
  assert.equal(doc.body.children.length, 1);
  a.open();
  assert.equal(a.isOpen, false);
  assert.equal(doc.count("keydown"), 0);
});
~~~

~~~text الناتج (node --test modal.test.js، Node 24)
✔ التحقق: title فاضي أو مش نص أو onConfirm مش دالة بيرمي TypeError (1.405ms)
✔ ١٠ مرات فتح وقفل: مفيش listener زيادة، و Esc بيشغّل handler واحد (0.7731ms)
✔ الخلفية بتقفل، والضغط جوه الصندوق لأ، وزرار غير Esc لأ (0.7237ms)
✔ الفوكس بيروح لزرار التأكيد وبيرجع للي فتح (0.1555ms)
✔ onConfirm لو رمت: المودال فاضل مفتوح والرسالة ظاهرة، والمرة اللي بعدها بيقفل (0.2189ms)
✔ destroy بيشيل العنصر، والفتح بعده مبيعملش حاجة، ومودالين مستقلين (0.1992ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 79.9282
~~~

## كل حتة مهمة بتعمل إيه

- **[[modal.handleKeydown.bind(modal)]] متخزّنة في [[modal.onKeydown]]:** دي قلب الوحدة. الـ handler method بتستخدم [[this.close()]]، والمتصفح بيناديها بـ this = الـ document، فلازم bind. ولأن كل bind دالة جديدة، بنعملها مرة واحدة، فـ [[open]] بتضيف نفس الـ reference و [[close]] بتشيله فعلًا. والاختبار التاني بيثبت إن بعد ١٠ مرات مفيش ولا listener متساب.
- **[[if (this.isOpen || this.destroyed) return this]]:** فتح مرتين مبيضيفش listener تاني، والفتح بعد destroy مبيعملش حاجة.
- **[[this.opener = doc.activeElement]]:** قبل ما نحرّك الفوكس بنفتكر مين كان عليه، و [[close]] بترجّعه. ده مهم لليوزر اللي بيستخدم الكيبورد: من غيره الفوكس بيتوه في أول الصفحة.
- **[[confirm()]] جوه [[try]]:** لو [[onConfirm]] رمت (السيرفر وقع مثلًا) الرسالة بتظهر في [[role="alert"]] والمودال مبيتقفلش، فاليوزر يقدر يجرّب تاني.
- **[[textContent]] للعنوان والنص:** [[<b>]] في العنوان بيظهر حروف زي ما هو، ومفيش HTML بيتنفذ. لو [[innerHTML]] كان أي نص جاي من يوزر يقدر يحقن script.
- **[[doc = globalThis.document]] parameter:** في المتصفح الافتراضي هو الـ document الحقيقي، وفي الاختبار بنبعت [[FakeDoc]]. ده اللي خلّى الاختبار يشتغل في Node من غير متصفح.
- **[[log = console.debug]]:** كل open و close بيتكتبوا. في Chrome بيظهروا لما تفعّل مستوى Verbose، وفي الاختبار بنبعت دالة بتجمعهم في array ونتأكد منهم.

## الغلطات اللي حصلت وإزاي اتصلحت

- **المودال مكانش بيستخبى خالص:** [[.modal-backdrop { display: grid }]] كسبت على الـ [[hidden]] (اللي هو أصلًا [[display: none]] من الـ browser styles وأضعف من أي CSS بتكتبه). الحل سطر [[.modal-backdrop[hidden] { display: none; }]].
- **Esc كان بيقفل وبعدها بيكتب «close» مرتين:** أول نسخة كانت بتعمل [[addEventListener("keydown", this.handleKeydown.bind(this))]] جوه open، وبعد كام فتحة بقى فيه كذا listener. اتصلحت بالنسخ المتخزّنة، والاختبار التاني اتكتب عشان ميرجعش.
- **الضغط على زرار «تأكيد» كان بيقفل المودال من غير ما يسأل:** الضغطة كانت بتطلع (bubbling) للخلفية و [[handleBackdrop]] كان بيقفل على أي ضغطة. الحل [[e.target === backdrop]]: الخلفية نفسها بس.` },
        { lvl: 'فكرة', dir: "xo-game", t: R`لعبة صغيرة بـ objects`, what: R`لعبة بسيطة (XO، أو اضرب الخلد، أو memory cards) فيها object للعبة نفسها بـ methods ([[start]] و [[move]] و [[reset]])، و timers و listeners كتير بيستخدموا this. انت اللي بتختار اللعبة وقواعدها.`, done: R`بتتلعب من الأول للآخر وبتعرف مين كسب، و reset بيرجّعها من غير ما تعمل refresh ومن غير timers زيادة شغالة، ومفيش ولا [[TypeError]] بتاع this في Console.`, ext: R`زوّد أعلى سكور في localStorage، ومستويات صعوبة، وصوت، وحوّلها لـ classes بعد الوحدة الجاية.`, sol: R`النسخة النموذجية: XO لاعبين على نفس الجهاز، وكل دور ليه ١٠ ثواني، ولو خلصت الدور بيروح للتاني.

~~~live 430 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>XO بالوقت</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; text-align: center; }
  .board { display: grid; grid-template-columns: repeat(3, 72px); gap: 6px; justify-content: center; margin: 12px 0; direction: ltr; }
  .board button { height: 72px; font: 700 32px/1 system-ui, sans-serif; border: 2px solid #94a3b8; border-radius: 10px; background: #fff; cursor: pointer; }
  .board button:disabled { cursor: default; color: #0f172a; }
  .status { font-weight: 700; min-height: 1.6em; }
  .reset { font: inherit; padding: 6px 16px; border-radius: 8px; border: 1px solid #94a3b8; background: #fff; cursor: pointer; }
</style>
</head>
<body>
<div id="game">
  <p class="status" aria-live="polite"></p>
  <div class="board"></div>
  <button type="button" class="reset">لعبة جديدة</button>
</div>
<script>
  const game = {
    lines: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    board: [],
    turn: "X",
    winner: null,
    timeLeft: 0,
    timerId: null,
    cells: [],
    statusEl: null,

    init(root) {
      this.statusEl = root.querySelector(".status");
      const boardEl = root.querySelector(".board");
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.dataset.i = i;
        cell.setAttribute("aria-label", "خانة " + (i + 1));
        boardEl.append(cell);
        this.cells.push(cell);
      }
      boardEl.addEventListener("click", (e) => {        // arrow: this = game
        const cell = e.target.closest("button");
        if (cell) this.move(Number(cell.dataset.i));
      });
      root.querySelector(".reset").addEventListener("click", () => this.reset());
      this.start();
    },
    start() {
      this.board = Array(9).fill("");
      this.turn = "X";
      this.winner = null;
      this.startTimer();
      this.render();
    },
    startTimer() {
      clearInterval(this.timerId);                     // أي timer قديم يتقفل الأول
      this.timeLeft = 10;
      this.timerId = setInterval(() => this.tick(), 1000);
    },
    stopTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
    },
    tick() {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.switchTurn();
      this.render();
    },
    move(i) {
      if (this.winner || this.board[i] !== "") return false;
      this.board[i] = this.turn;
      this.winner = this.findWinner();
      if (this.winner) this.stopTimer();
      else this.switchTurn();
      this.render();
      return true;
    },
    switchTurn() {
      this.turn = this.turn === "X" ? "O" : "X";
      this.startTimer();
    },
    findWinner() {
      for (const [a, b, c] of this.lines) {
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) return this.board[a];
      }
      return this.board.every((v) => v !== "") ? "تعادل" : null;
    },
    reset() {
      this.start();
    },
    render() {
      this.cells.forEach((cell, i) => {
        cell.textContent = this.board[i];
        cell.disabled = this.board[i] !== "" || this.winner !== null;
      });
      this.statusEl.textContent =
        this.winner === "تعادل" ? "تعادل!" :
        this.winner ? "كسب " + this.winner :
        "الدور على " + this.turn + " (فاضل " + this.timeLeft + " ث)";
    },
  };

  game.init(document.querySelector("#game"));
</script>
</body>
</html>
~~~

## هتشوف إيه

جملة «الدور على X (فاضل 10 ث)» والرقم بينزل كل ثانية، وتحتها ٩ خانات. كل ضغطة بتكتب X أو O وتقلب الدور وتبدأ الـ ١٠ ثواني من الأول. لو الوقت خلص الدور بيروح للتاني. لما حد يكمّل صف أو عمود أو قطر: «كسب X» والخانات بتتقفل. «لعبة جديدة» بترجّع كل حاجة.

~~~text الناتج (Chrome 157، Playwright، والـ ١٠ ثواني بساعة متحكَّم فيها page.clock)
X: 0، O: 1، X: 4، O: 2، X: 8      → «كسب X»، والـ 9 خانات disabled، والـ timer واقف
لعبة جديدة ٥ مرات ورا بعض         → intervals شغالة: 1
١٠ ثواني من غير لعب               → «الدور على O (فاضل 10 ث)»
X O X / X O O / O X X              → «تعادل!»
Console                             → مفيش ولا error
~~~

## ليه التصميم ده

- **object واحد [[game]] فيه الحالة والـ methods:** كل حاجة بتتقري وتتكتب بـ [[this]]، وده تمرين الوحدة كله في مكان واحد.
- **كل الـ callbacks arrows:** الـ click على اللوحة، وزرار reset، و [[setInterval(() => this.tick(), 1000)]]. الـ arrow اتكتبت جوه method اتندهت كـ [[game.init()]] أو [[game.startTimer()]]، فـ this جواها game. ولو أي واحد فيهم بقى function عادية، this هتبقى الزرار أو window، و [[this.move]] هترمي TypeError.
- **[[clearInterval]] في أول [[startTimer]]:** ده اللي بيضمن «من غير timers زيادة». كل دور جديد، وكل reset، بيقفل القديم قبل ما يعمل جديد، فمهما ضغطت «لعبة جديدة» فيه interval واحد بس (اتقاس: 1 بعد ٥ مرات).
- **[[stopTimer]] لما حد يكسب:** عشان الـ tick ميقلبش الدور بعد ما اللعبة خلصت.
- **event delegation على اللوحة:** listener واحد للتسع خانات، و [[dataset.i]] بيقول أنهي خانة.
- **[[direction: ltr]]** على اللوحة: عشان ترتيب الخانات (0 فوق شمال) يطابق أرقام الـ [[lines]] حتى والصفحة RTL.

**إزاي تعرف إن نسختك صح:** العب لحد ما حد يكسب ولحد التعادل، واضغط «لعبة جديدة» كذا مرة وراقب إن العدّ التنازلي بينزل ثانية بثانية مش أسرع (لو بينزل أسرع يبقى فيه interval زيادة). وافتح Console واتأكد إن مفيش ولا [[TypeError]].` },
      ],
      items: [
        {
          cmd: "this",
          title: "this بتشاور على إيه؟",
          desc: R`[[this]] في دالة عادية بتتحدد لحظة النداء، حسب طريقة النداء مش مكان الكتابة. ٤ قواعد بالترتيب:

١. [[new Fn()]]: this هو الـ object الجديد.
٢. [[fn.call(obj)]] أو [[apply]] أو [[bind]]: this هو obj.
٣. [[obj.fn()]]: this هو اللي قبل النقطة.
٤. [[fn()]] لوحدها: undefined في strict mode (والـ modules والـ classes)، أو الـ global object في الكود القديم.

والـ arrow function مالهاش this خالص، بتاخدها من الـ scope اللي اتكتبت فيه (الدرس الجاي).`,
          example: R`"use strict";
const user = {
  name: "Sara",
  hi() { return this?.name; },
};
user.hi();                       // "Sara": اللي قبل النقطة
const fn = user.hi;
fn();                            // undefined: من غير نقطة this = undefined
user.hi.call({ name: "Ali" });   // "Ali": انت اللي حددت
function Person(name) { this.name = name; }
const p = new Person("Omar");    // this = الـ object الجديد
const btn = { label: "Save", click() { console.log(this?.label); } };
setTimeout(btn.click, 0);        // undefined: اتبعتت من غير btn`,
          try: R`شيل [[?.]] من [[hi]] وشغّل تاني واقرا الـ TypeError. وبعدين صلّح سطر setTimeout بطريقتين: [[() => btn.click()]] و [[btn.click.bind(btn)]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const counter = { n: 0, inc() { this.n++; return this.n; } }]]: نادي [[counter.inc()]] مرتين، وبعدين [[const inc = counter.inc; inc();]] في ملف [[.mjs]] (strict).`, done: R`النداء التاني بيرجّع [[2]]، و [[inc()]] بتطلع [[TypeError: Cannot read properties of undefined (reading 'n')]]. ولو شغّلته في ملف [[.js]] عادي في Node من غير strict بيرجّع [[NaN]] بهدوء (this بقت الـ global object)، ودي أوحش.`, sol: R`~~~js inc-strict.mjs
const counter = { n: 0, inc() { this.n++; return this.n; } };
console.log(counter.inc(), counter.inc());

const inc = counter.inc;
try {
  console.log(inc());
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~js inc-sloppy.cjs
const counter = { n: 0, inc() { this.n++; return this.n; } };
console.log(counter.inc(), counter.inc());

const inc = counter.inc;
console.log(inc());
console.log("globalThis.n =", globalThis.n);   // اتعملت global من غير ما نقصد
~~~

~~~text الناتج (node inc-strict.mjs ثم node inc-sloppy.cjs، Node 24)
1 2
TypeError: Cannot read properties of undefined (reading 'n')
---
1 2
NaN
globalThis.n = NaN
~~~

**ليه كده:**

- **[[counter.inc()]]:** فيه [[counter.]] قبل النداء، فـ this هي counter، والعدّاد 1 ثم 2.
- **[[const inc = counter.inc]]:** ده نسخ للدالة نفسها بس، من غير الـ object. والـ this بتتحدد **وقت النداء** مش وقت التعريف، و [[inc()]] مفيش حاجة قبل النقطة.
- **في [[.mjs]] (module = strict لوحده):** this بقت [[undefined]]، و [[undefined.n]] بترمي TypeError على طول. الغلطة بانت.
- **في [[.cjs]] (sloppy):** this بقت الـ global object، و [[globalThis.n]] مش موجودة فـ [[undefined + 1]] = [[NaN]]. والأوحش إن السطر الأخير بيثبت إن الكود عمل متغير global اسمه n بـ NaN من غير أي رسالة.

**الغلطة الشائعة:** تفتكر إن الدالة «بتاعة» الـ object وفاكرة إنها جواه. الدالة مستقلة، والـ object بيتحدد من شكل النداء بس. ولو محتاج تبعتها لوحدها: [[counter.inc.bind(counter)]] أو [[() => counter.inc()]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const user = { name: "Sara", greet() { console.log("Hi " + this.name); } }; setTimeout(user.greet, 0);]]. شغّله في Node.`, done: R`بيطبع [[Hi undefined]] لأن setTimeout نادت الدالة لوحدها من غير [[user.]]. بعد [[setTimeout(() => user.greet(), 0)]] أو [[user.greet.bind(user)]] بيطبع [[Hi Sara]].`, sol: R`~~~js greet-timeout.js
const user = {
  name: "Sara",
  greet() {
    console.log("Hi " + this.name);
  },
};

setTimeout(user.greet, 0);                    // الدالة لوحدها
setTimeout(function () {
  console.log("this جوه callback الـ setTimeout في Node:", this.constructor.name);
}, 0);
setTimeout(() => user.greet(), 0);            // تصليح ١
setTimeout(user.greet.bind(user), 0);         // تصليح ٢
~~~

~~~text الناتج (node greet-timeout.js، Node 24)
Hi undefined
this جوه callback الـ setTimeout في Node: Timeout
Hi Sara
Hi Sara
~~~

ونفس السطر الأول جوه [[<script>]] عادي في صفحة (Chrome 157، Playwright):

~~~text الناتج في Console بتاع Chrome
Hi
~~~

**ليه كده:**

- **[[setTimeout(user.greet, 0)]]** بتبعت الدالة من غير [[user.]]، و setTimeout هي اللي بتناديها بعدين بطريقتها. فـ this مش user.
- **في Node** setTimeout بتنادي الـ callback و this هي الـ [[Timeout]] object نفسه (السطر التاني بيثبت ده)، ومفيهوش [[name]]، فـ [[Hi undefined]].
- **في المتصفح** this بتبقى [[window]]، و [[window.name]] خاصية حقيقية قيمتها نص فاضي، فبيطبع [["Hi "]] من غير undefined خالص. يعني نفس الباج بيظهر بشكلين مختلفين، والتاني أصعب تلاحظه.
- **التصليحين:** الـ arrow بتنادي [[user.greet()]] بنفسها وقت التشغيل (فيه نقطة)، و [[bind(user)]] بترجّع دالة جديدة الـ this بتاعها متثبّت على user مهما اتندهت إزاي.

**الغلطة الشائعة:** [[setTimeout(user.greet(), 0)]] بالأقواس: ده بينادي greet **دلوقتي** وبيبعت ناتجها ([[undefined]]) لـ setTimeout. الطباعة بتطلع صح بالصدفة بس مش متأخرة.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** في صفحة: زرار عليه [[addEventListener("click", function () { this.textContent = "اتضغط"; })]]. وبعدين نفس الحاجة بـ arrow جوه [[<script type="module">]].`, done: R`مع function نص الزرار بيتغير (this هي الزرار، زي [[e.currentTarget]])، ومع الـ arrow بيطلع TypeError في Console فيه [[setting 'textContent']] والزرار زي ما هو، لأن this في الـ module بـ [[undefined]].`, sol: R`~~~live 210 function ولا arrow في handler
<button type="button" id="fn">function عادية</button>
<button type="button" id="arrow">arrow في module</button>
<p id="err"></p>
<script>
  // script عادي: function عادية، this = العنصر اللي عليه الـ listener
  document.querySelector("#fn").addEventListener("click", function (e) {
    this.textContent = "اتضغط";
    console.log(this === e.currentTarget);   // true
  });
  window.addEventListener("error", (e) => {
    document.querySelector("#err").textContent = "Console: " + e.message;
  });
</script>
<script type="module">
  // module: الـ arrow بتاخد this من برّه، و this على مستوى الـ module بـ undefined
  document.querySelector("#arrow").addEventListener("click", () => {
    this.textContent = "اتضغط";
  });
</script>
~~~

اضغط الزرارين. ده اللي اتقاس بـ Playwright في Chrome 157 جوه نفس الـ preview:

~~~text الناتج (Chrome 157)
ضغطة على «function عادية»  → النص بقى «اتضغط»، و Console: true
ضغطة على «arrow في module» → الزرار زي ما هو
                             Console: Uncaught TypeError: Cannot set properties of undefined (setting 'textContent')
~~~

**ليه كده:**

- **الـ function العادية كـ listener:** المتصفح بيناديها و this = العنصر اللي عليه الـ listener، وهو نفس [[e.currentTarget]].
- **الـ arrow مالهاش this بتاعتها:** بتاخد this من المكان اللي اتكتبت فيه. وفي [[<script type="module">]] الـ this على مستوى الملف [[undefined]] (الـ modules strict)، فـ [[undefined.textContent = ...]] بترمي TypeError.
- **لو نفس الـ arrow في script عادي** كانت this هتبقى [[window]]، والسطر كان هيكتب [[window.textContent]] بهدوء من غير error، والزرار مش هيتغير. أسوأ.

**الغلطة الشائعة:** تحوّل كل الدوال لـ arrow «عشان أقصر». في الـ handler اللي محتاج العنصر استخدم function عادية، أو الأوضح: arrow بـ [[(e) => e.currentTarget.textContent = "اتضغط"]]، وده بيشتغل في الحالتين.` },
            { lvl: 'تطبيق', t: R`**ابني:** object [[cart]] فيه [[items]] و [[add(name, price)]] بترجّع [[this]] (عشان تقدر تسلسل) و [[total()]] بتجمع بـ this.items.`, done: R`[[cart.add("mug", 120).add("cap", 90).total()]] بترجّع 210. ولو add مبترجّعش this، النداء التاني بيوقع بـ TypeError إن add مش موجودة على undefined.`, sol: R`~~~js cart-chain.js
const cart = {
  items: [],
  add(name, price) {
    this.items.push({ name, price });
    return this;                     // عشان النداء اللي بعده يلاقي cart
  },
  total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  },
};

console.log(cart.add("mug", 120).add("cap", 90).total());

const broken = {
  items: [],
  add(name, price) { this.items.push({ name, price }); },   // من غير return
};
try {
  broken.add("mug", 120).add("cap", 90);
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~text الناتج (node cart-chain.js، Node 24)
210
TypeError: Cannot read properties of undefined (reading 'add')
~~~

**ليه كده:**

- **[[return this]]:** [[cart.add(...)]] بترجّع cart نفسه، فـ [[.add("cap", 90)]] اللي بعدها بتتنده على cart تاني (و this جواها cart برضه لأن فيه نقطة). وآخر حاجة [[total()]].
- **[[this.items.reduce(...)]]:** بتجمع الأسعار من 0: 120 + 90 = 210.
- **من غير return:** الدالة بترجّع [[undefined]]، فالنداء التاني بقى [[undefined.add(...)]]، والرسالة بتقول بالظبط «بتقرا add من undefined».

**الغلطة الشائعة:** تكتب [[add]] كـ arrow: [[add: (name, price) => { this.items.push(...) }]]. الـ arrow مالهاش this، فبتاخد this اللي برّه الـ object ([[{}]] في ملف CommonJS) وبتوقع بـ [[Cannot read properties of undefined (reading 'push')]].` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** دالة واحدة [[function who() { return this?.tag; }]] ونادِها بست طرق: [[obj.who()]]، و متخزّنة في متغير، و [[who.call({ tag: "C" })]]، و [[new]] (اطبع الـ object نفسه)، وجوه [[setTimeout(obj.who)]]، و [[[1].forEach(function () {...}, { tag: "F" })]] بالـ thisArg. اكتب توقعك الأول.`, done: R`عندك جدول ٦ سطور فيه توقعك والناتج الحقيقي جنب بعض، وكل سطر مختلف مكتوب جنبه أنهي قاعدة من الأربعة اتطبّقت. مثلًا الـ forEach بيرجّع [["F"]] لأن التاني بتاعها هو this.`, sol: R`~~~js who.mjs
function who() {
  seen.push(this?.tag);
  return this?.tag;
}
const seen = [];
const obj = { tag: "A", who };

const rows = [];
rows.push(["1) obj.who()", obj.who()]);
const stored = obj.who;
rows.push(["2) متخزّنة في متغير", stored()]);
rows.push(["3) who.call({ tag: 'C' })", who.call({ tag: "C" })]);
rows.push(["4) new who()", new who()]);
[1].forEach(who, { tag: "F" });
rows.push(["6) forEach بالـ thisArg", seen.at(-1)]);
setTimeout(obj.who, 0);
setTimeout(() => {
  rows.splice(4, 0, ["5) setTimeout(obj.who)", seen.at(-1)]);
  for (const [label, value] of rows) console.log(label.padEnd(28), value);
}, 10);
~~~

~~~text الناتج (node who.mjs، Node 24، strict لأنه module)
1) obj.who()                 A
2) متخزّنة في متغير          undefined
3) who.call({ tag: 'C' })    C
4) new who()                 who {}
5) setTimeout(obj.who)       undefined
6) forEach بالـ thisArg      F
~~~

**الجدول (التوقع والحقيقي والقاعدة):**

| النداء | الناتج | القاعدة |
|---|---|---|
| [[obj.who()]] | [["A"]] | ضمني: اللي قبل النقطة |
| متخزّنة في متغير | [[undefined]] | من غير نقطة: [[undefined]] في strict (والـ [[?.]] منعت الـ TypeError) |
| [[who.call({ tag: "C" })]] | [["C"]] | صريح: call بتحدد this |
| [[new who()]] | [[who {}]] | new: this = object جديد، والـ [[return]] لقيمة مش object بيتجاهل |
| [[setTimeout(obj.who)]] | [[undefined]] | الدالة اتبعتت من غير obj، و Node بيناديها بـ this = الـ Timeout |
| [[forEach(who, { tag: "F" })]] | [["F"]] | التاني بتاع forEach هو this (صريح من جوه) |

**ليه السطر الرابع [[who {}]]:** مع [[new]] الدالة بتشتغل على object جديد فاضي، و [[this?.tag]] بـ undefined. والـ [[return undefined]] مش object، فـ new بتتجاهله وبترجّع الـ object الجديد، و Node بيطبعه باسم الدالة اللي عملته.

**ليه الترتيب في الكود كده:** setTimeout بيشتغل بعد كل السطور المتزامنة، فحطّيت الطباعة كلها في timeout تاني بعده بـ 10ms، وحطّيت سطر الـ setTimeout في مكانه رقم 5.

**الغلطة الشائعة:** تطبّق قاعدة «اللي قبل النقطة» على السطر التاني لأن الدالة «جاية من obj». المهم شكل النداء اللحظة دي: [[stored()]] مفيش قبلها حاجة.` }
          ],
          ref: [
            { t: "MDN: this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" },
            { t: "MDN: Strict mode", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode" },
            { t: "MDN: new", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new" },
            { t: "MDN: Event.currentTarget", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget" },
            { t: "MDN: setTimeout() (the «this» problem)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout" },
          ],
          flag: "script",
          deep: {
            why: R`[[this]] أكتر حاجة بتلخبط اللي جايين من Java أو Python، وسبب bugs زي «Cannot read properties of undefined (reading 'name')» لما تبعت method كـ callback. وسؤال انترفيو مضمون تقريبًا.`,
            how: R`فكّر فيها كـ باراميتر مخفي بيتبعت مع كل نداء. [[user.hi()]] معناها «نادي hi وابعت user كـ this». لما تعمل [[const fn = user.hi]]، انت خدت الدالة لوحدها، والعلاقة بـ user اتقطعت، لأن الدالة نفسها مش «ملك» الـ object، هي بس متحطوطة فيه.

نفس الحاجة لما تبعت method كـ callback: [[setTimeout(btn.click)]] و [[addEventListener("click", obj.method)]] و [[promise.then(obj.method)]] كلهم بيبعتوا الدالة من غير الـ object.

في الـ event listeners العادية (function مش arrow) الـ this هو العنصر اللي عليه الـ listener ([[currentTarget]]).

و [[new]] بيعمل ٤ حاجات: object جديد، ويربط الـ prototype بتاعه بـ [[Fn.prototype]]، وينادي Fn بـ this = الـ object ده، ويرجّعه (درس prototypes).

في الـ top level بتاع ES module الـ this بـ undefined، وفي CommonJS بـ [[module.exports]].`,
            when: "مع الـ methods في الـ objects والـ classes. ولما تبعت method كـ callback، لفّها في arrow أو bind.",
            mistakes: R`تبعت method كـ callback من غير bind. وتستخدم arrow كـ method وتستنى this تبقى الـ object. وتستخدم this جوه function عادية جوه method (callback في forEach مثلًا) وتستنى نفس this. وفي الانترفيو: «إيه الناتج؟» على كود فيه [[const f = obj.method; f()]]، واذكر القواعد الأربعة بالترتيب.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيجيب **نفس الدالة** وينادِيها بـ ٥ طرق مختلفة، وكل مرة [[this]] جواها بتطلع حاجة مختلفة. الفكرة اللي هتطلع بيها: [[this]] مش مكتوبة جوه الدالة، دي بتتحدد **لحظة النداء** من شكل سطر النداء نفسه. الكود اتشغّل كملف في Node 24، وجزء الـ setTimeout اتجرّب كمان في Chrome.

---

## ١. [["use strict";]]

~~~text app.js
"use strict";
~~~

ده نص لوحده في أول الملف، و JS فاهمه كأمر اسمه **directive**: «شغّل الملف ده في **strict mode**». الـ strict mode نسخة أصرم من JS بتقفل شوية تصرفات قديمة غلط، واللي يهمنا منها هنا واحدة بس:

> الدالة اللي تتنادي من غير حاجة قبلها، [[this]] جواها بتبقى [[undefined]].

ومن غير strict، [[this]] في الحالة دي بتبقى الـ **global object** (في المتصفح [[window]]، وفي Node [[globalThis]]). جرّبناها في ملف من غير "use strict":

~~~text app.js
function show() { return this === globalThis; }
console.log(show());
~~~

~~~text الناتج
true
~~~

وفي أي ES module أو جوه أي [[class]]، الـ strict mode شغال لوحده من غير ما تكتب السطر ده.

---

## ٢. الـ object والـ method

~~~text app.js
const user = {
  name: "Sara",
  hi() { return this?.name; },
};
~~~

- [[const user = { ... }]]: **object literal**، يعني object مكتوب بإيدك بين [[{ }]].
- [[name: "Sara"]]: خاصية (property) اسمها name وقيمتها النص Sara.
- [[hi() { ... }]]: **method**، يعني دالة متحطوطة جوه object. الشكل ده اختصار لـ [[hi: function () { ... }]].
- [[this?.name]]: اقرا name من [[this]]. والـ [[?.]] اسمها **optional chaining**: لو اللي قبلها [[undefined]] أو [[null]]، رجّع [[undefined]] بدل ما البرنامج يقع. حطّيناها عشان المثال يكمّل للآخر.

---

## ٣. قاعدة النقطة: [[user.hi()]]

~~~text app.js
user.hi();   // "Sara"
~~~

~~~text الناتج
Sara
~~~

لما الدالة تتنادي بعد نقطة، [[this]] بيبقى **اللي قبل النقطة**. هنا قبل النقطة [[user]]، فـ [[this.name]] هي [["Sara"]].

---

## ٤. الدالة لوحدها: [[fn()]]

~~~text app.js
const fn = user.hi;
fn();        // undefined
~~~

- [[user.hi]] من غير [[()]] معناها «هات الدالة نفسها، متنادِيهاش». فـ [[fn]] بقى بيشاور على **نفس** الدالة.
- [[fn()]]: نداء من غير نقطة. مفيش حاجة قبل النقطة، فـ [[this]] بـ [[undefined]] (strict mode)، و [[?.]] رجّعت undefined.

~~~text الناتج
undefined
~~~

ولو شلت [[?.]] وكتبت [[this.name]]، Node بيقول:

~~~text الناتج
TypeError: Cannot read properties of undefined (reading 'name')
~~~

يعني «بتحاول تقرا name من حاجة undefined». ده أشهر error ليه علاقة بـ this. الدرس هنا: الدالة **مش ملك** الـ object، هي بس متخزنة فيه. أول ما تاخدها لوحدها، العلاقة بـ user بتتقطع.

---

## ٥. انت اللي بتحدد: [[call]]

~~~text app.js
user.hi.call({ name: "Ali" });   // "Ali"
~~~

[[call]] method موجودة على كل دالة: بتنادي الدالة **دلوقتي**، وأول argument ليها بيبقى [[this]]. هنا بعتنا object جديد فيه name = Ali:

~~~text الناتج
Ali
~~~

تفاصيل [[call]] و [[apply]] و [[bind]] في درس «call و apply و bind».

---

## ٦. [[new]]: object جديد

~~~text app.js
function Person(name) { this.name = name; }
const p = new Person("Omar");
~~~

- [[function Person(name)]]: دالة عادية، بس اسمها بحرف كبير كعُرف إنها **constructor function** (الشكل القديم للـ class).
- [[new Person("Omar")]]: [[new]] بيعمل object فاضي جديد، وينادي Person و [[this]] = الـ object ده، وفي الآخر يرجّعه.

~~~text الناتج: console.log(p)
Person { name: 'Omar' }
~~~

ولو نسيت [[new]] ([[Person("x")]]) في strict mode، this بـ undefined، و [[this.name = ...]] بتقع:

~~~text الناتج
TypeError: Cannot set properties of undefined (setting 'name')
~~~

---

## ٧. الفخ: method كـ callback

~~~text app.js
const btn = { label: "Save", click() { console.log(this?.label); } };
setTimeout(btn.click, 0);   // undefined
~~~

- [[setTimeout(fn, 0)]]: نادي fn بعد ٠ ملي ثانية، يعني «أول ما الكود الحالي يخلص».
- [[btn.click]] من غير [[()]]: احنا بعتنا **الدالة لوحدها**، زي خطوة ٤ بالظبط. و setTimeout هي اللي هتناديها بعدين، ومش عارفة حاجة عن btn.

~~~text الناتج
undefined
~~~

وطب this كانت إيه ساعتها؟ جرّبنا نطبعها: في Node طلعت object اسمه [[Timeout]] (Node بينادي الـ callback و this = الـ timer نفسه)، وفي Chrome طلعت [[window]]. في الحالتين **مش btn**، وده المهم.

والتصليح بطريقتين (اتجرّبوا والاتنين طبعوا [[Save]]):

~~~text app.js
setTimeout(() => btn.click(), 0);     // نادي بنقطة جوه arrow
setTimeout(btn.click.bind(btn), 0);   // ثبّت this بـ bind
~~~

---

## القواعد الأربعة بالترتيب

| شكل النداء | [[this]] | في المثال |
|---|---|---|
| [[new Fn()]] | الـ object الجديد | [[new Person("Omar")]] |
| [[fn.call(obj)]] أو [[apply]] أو [[bind]] | obj | [[{ name: "Ali" }]] |
| [[obj.fn()]] | اللي قبل النقطة | [[user]] |
| [[fn()]] لوحدها | undefined (strict) أو global (من غير strict) | [[fn()]] |

## الخلاصة

- [[this]] بتتحدد وقت النداء، مش وقت الكتابة. بص على **سطر النداء**: فيه new؟ فيه call أو bind؟ فيه نقطة؟ ولا لوحدها؟
- [[obj.method]] من غير أقواس بتاخد الدالة لوحدها، فـ this بتضيع. ده اللي بيحصل في setTimeout و addEventListener و then.
- الـ arrow function مالهاش this خالص، وده موضوع الدرس الجاي.`,
          lines: [
            R`بيشغّل strict mode للملف كله. الفرق اللي يهمنا: دالة متنادية لوحدها [[this]] جواها بتبقى [[undefined]] بدل الـ global object، فالغلطة تبان بدل ما الكود يقرا من [[window]] بالسكوت. والـ modules والـ classes strict لوحدهم.`,
            R`object هنستخدمه نشوف [[this]] بتتحدد إزاي من شكل سطر النداء.`,
            R`الخاصية اللي الـ method هتحاول تقراها عن طريق [[this]].`,
            R`method بترجّع [[this.name]]. [[this]] مش متثبتة هنا وقت الكتابة، بتتحدد كل مرة الدالة تتنادى. والـ [[?.]] عشان لما [[this]] تبقى [[undefined]] نرجّع [[undefined]] بدل ما المثال يقع بـ TypeError.`,
            R`نهاية الـ object.`,
            R`قاعدة ٣: نادينا بنقطة، فـ [[this]] هو اللي قبل النقطة ([[user]]) ورجّعت [["Sara"]].`,
            R`بناخد الدالة نفسها من غير ما نناديها (مفيش [[()]]). [[fn]] دلوقتي نفس الدالة بالظبط، بس مبقاش فيه حاجة بتربطها بـ [[user]].`,
            R`قاعدة ٤: نداء من غير نقطة، فـ [[this]] بقت [[undefined]] (strict mode) ورجّعت [[undefined]]. نفس الدالة، نداء مختلف، نتيجة مختلفة: ده أهم حاجة في [[this]].`,
            R`قاعدة ٢: [[call]] بتنادي الدالة وانت بتحدد [[this]] بإيدك كأول argument، فرجّعت [["Ali"]] مع إن الدالة متعرّفة جوه [[user]].`,
            R`constructor function: الشكل القديم قبل [[class]]. لما تتنادى بـ [[new]]، [[this.name = name]] بتحط الخاصية على الـ object الجديد.`,
            R`قاعدة ١: [[new]] بيعمل object فاضي جديد، ويخليه [[this]] جوه [[Person]]، ويرجّعه، فـ [[p.name]] بقت [["Omar"]]. ومن غير [[new]] في strict mode، [[this]] هتبقى [[undefined]] و [[this.name = name]] هترمي TypeError.`,
            R`object تاني فيه method بتطبع [[this.label]]، عشان نشوف أشهر مكان [[this]] بتضيع فيه.`,
            R`بعتنا الدالة لوحدها من غير [[()]]، و [[setTimeout]] هي اللي هتناديها بعدين من غير [[btn.]] قبلها. فـ [[this]] مبقتش [[btn]] (في Node بتبقى object الـ [[Timeout]] وفي Chrome [[window]]) ويطبع [[undefined]]. الحل [[btn.click.bind(btn)]] أو [[() => btn.click()]].`,
          ],
          sol: R`من غير [[?.]]، سطر [[fn()]] بيطلع [[TypeError: Cannot read properties of undefined (reading 'name')]]: في strict mode الدالة لما تتنادي من غير نقطة قبلها this بتبقى undefined، ومفيش name جوه undefined.

سطر setTimeout بعد التصليح بيطبع [["Save"]] في الطريقتين. [[() => btn.click()]] بتنادي click والنقطة موجودة، فـ this بقت btn. و [[btn.click.bind(btn)]] بتعمل دالة جديدة this فيها متثبتة على btn. الغلطة الشائعة إنك تكتب [[setTimeout(btn.click(), 0)]]: كده انت بتنادي الدالة فورًا وبتبعت ناتجها (undefined) لـ setTimeout.`
        },
        {
          cmd: "arrow و this",
          title: "ليه الـ arrow function بتحل مشكلة this جوه callback؟",
          desc: R`الـ arrow function مالهاش [[this]] بتاعتها. لما تقرا this جواها، بتاخدها من الـ scope اللي اتكتبت فيه، زي أي متغير عادي (lexical this).

ده بيخليها مثالية للـ callbacks جوه methods: [[setInterval(() => this.tick(), 1000)]] بتشوف this بتاعة الـ method. وبيخليها غلط كـ method في object، لأنها هتاخد this من برّه الـ object.`,
          example: R`const timer = {
  seconds: 0,
  startBroken() {
    setTimeout(function () {
      console.log(this?.seconds); // undefined: this مش timer
    }, 0);
  },
  start() {
    setTimeout(() => {
      this.seconds++;             // this = timer، أخدها من start
      console.log(this.seconds);  // 1
    }, 0);
  },
  bad: () => typeof this,         // arrow كـ method: this من برّه الـ object
};
timer.startBroken();
timer.start();`,
          try: R`قبل الـ arrows كان الحل [[const self = this;]] قبل الـ callback. صلّح [[startBroken]] بالطريقة دي، وبعدين بـ [[.bind(this)]] بعد الـ function.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const o = { a: () => this, b() { return this; } }]] واطبع [[o.b() === o]] و [[o.a() === o]].`, done: R`الأول [[true]] والتاني [[false]]: الـ arrow كـ method أخدت this من برّه الـ object.`, sol: R`~~~js arrow-method.cjs
const o = { a: () => this, b() { return this; } };
console.log(o.b() === o, o.a() === o);
console.log("o.a() في CommonJS:", o.a(), "و module.exports:", o.a() === module.exports);
~~~

~~~js arrow-method.mjs
const o = { a: () => this, b() { return this; } };
console.log(o.b() === o, o.a() === o);
console.log("o.a() في module:", o.a());
~~~

~~~text الناتج (node arrow-method.cjs ثم node arrow-method.mjs، Node 24)
true false
o.a() في CommonJS: {} و module.exports: true
---
true false
o.a() في module: undefined
~~~

**ليه كده:**

- **[[b() { return this; }]]** method عادية، فـ [[o.b()]] this = o: [[true]].
- **[[a: () => this]]** arrow: مالهاش this، فبتاخد this اللي في المكان اللي الـ object نفسه مكتوب فيه، مش الـ object. والأقواس [[{ }]] بتاعة الـ object مش scope.
- **this البرّاني ده إيه؟** في ملف CommonJS ([[.cjs]] أو [[.js]] عادي) هو [[module.exports]] (object فاضي [[{}]])، وفي الـ module ([[.mjs]]) هو [[undefined]]، وفي script عادي في المتصفح [[window]]. في الحالات كلها مش o.

**الغلطة الشائعة:** تكتب methods كـ arrow عشان شكلها أحدث. للـ methods استخدم الشكل المختصر [[b() {}]]، والـ arrow للـ callbacks اللي جوه الـ method.` },
            { lvl: 'تطبيق', t: R`**ابني:** stopwatch object: [[seconds]] و [[start()]] بـ [[this.id = setInterval(() => this.seconds++, 1000)]] و [[stop()]] بـ [[clearInterval(this.id)]] و [[reset()]]. اعرض الثواني في صفحة.`, done: R`بعد [[start()]] بحوالي ٣ ثواني [[seconds]] بقت [[3]]، و [[stop()]] بيوقفها فعلًا، و [[start()]] مرتين ورا بعض مبيعدّش أسرع (اتأكد إن مفيش interval شغال قبل ما تعمل واحد جديد).`, sol: R`~~~live 200 stopwatch بالـ arrow
<p><b id="sec">0</b> ثانية</p>
<button type="button" id="start">ابدأ</button>
<button type="button" id="stop">وقّف</button>
<button type="button" id="reset">صفّر</button>
<script>
  const out = document.querySelector("#sec");
  const stopwatch = {
    seconds: 0,
    id: null,
    start() {
      if (this.id !== null) return;                 // شغال أصلًا: متعملش interval تاني
      this.id = setInterval(() => {
        this.seconds++;                             // arrow: this = stopwatch
        this.render();
      }, 1000);
    },
    stop() {
      clearInterval(this.id);
      this.id = null;
    },
    reset() {
      this.stop();
      this.seconds = 0;
      this.render();
    },
    render() {
      out.textContent = this.seconds;
    },
  };
  document.querySelector("#start").addEventListener("click", () => stopwatch.start());
  document.querySelector("#stop").addEventListener("click", () => stopwatch.stop());
  document.querySelector("#reset").addEventListener("click", () => stopwatch.reset());
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
ابدأ، واستنى 3.2 ثانية         → 3
ابدأ مرتين ورا بعض، 3.2 ثانية → 3 (مش 6)
وقّف، واستنى 2 ثانية           → لسه 3
صفّر                           → 0
~~~

**ليه كده:**

- **[[setInterval(() => { this.seconds++ })]]:** الـ arrow اتكتبت جوه [[start]]، فـ this جواها هي this بتاعة start، وهي stopwatch لأن start اتندهت كـ [[stopwatch.start()]].
- **لو كانت [[function () { this.seconds++ }]]:** setInterval بتنادي الدالة بـ this = [[window]]، فـ [[window.seconds]] بقت NaN والرقم مبيتحركش.
- **[[if (this.id !== null) return]]:** من غيره الضغطة التانية بتعمل interval تاني، والأولى لسه شغالة ومحدش ماسك رقمها، فبيعد مرتين في الثانية ومبيقفش بـ stop.
- **الأزرار بـ [[() => stopwatch.start()]]:** لو كتبت [[addEventListener("click", stopwatch.start)]] this جوه start هتبقى الزرار نفسه، و [[this.id]] هيتكتب على الزرار.

**الغلطة الشائعة:** [[stop()]] من غير [[this.id = null]]: بعد ما توقف مش هتعرف تبدأ تاني لأن الشرط شايف إن فيه id.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[class A { f = () => 1; g() { return 1; } }]]. اعمل instanceين واطبع [[a1.f === a2.f]] و [[a1.g === a2.g]].`, done: R`طلع [[false]] و [[true]]: الـ arrow كـ class field بتتعمل نسخة جديدة مع كل instance (this مربوطة لوحدها بس بتاخد ذاكرة)، والـ method العادية واحدة على الـ prototype. فلو عندك آلاف instances ومش محتاج تبعت الدالة كـ callback، الـ method أوفر.`, sol: R`~~~js fields.js
class A {
  f = () => 1;          // class field: نسخة لكل instance
  g() { return 1; }     // method: واحدة على A.prototype
}
const a1 = new A(), a2 = new A();
console.log(a1.f === a2.f, a1.g === a2.g);
console.log(Object.hasOwn(a1, "f"), Object.hasOwn(a1, "g"));

function measure(Cls) {
  globalThis.gc();
  const before = process.memoryUsage().heapUsed;
  const list = Array.from({ length: 100000 }, () => new Cls());
  globalThis.gc();
  const mb = (process.memoryUsage().heapUsed - before) / 1024 / 1024;
  return mb.toFixed(1) + " MB لـ " + list.length + " instance";
}
class WithArrow { f = () => 1; }
class WithMethod { f() { return 1; } }
console.log("arrow field:", measure(WithArrow));
console.log("method:     ", measure(WithMethod));
~~~

~~~text الناتج (node --expose-gc fields.js، Node 24)
false true
true false
arrow field: 9.2 MB لـ 100000 instance
method:      3.1 MB لـ 100000 instance
~~~

**ليه كده:**

- **[[f = () => 1]]** class field: الـ constructor بيعمل arrow **جديدة** ويحطها على كل instance كخاصية خاصة بيه ([[Object.hasOwn(a1, "f")]] بـ [[true]]). عشان كده [[a1.f === a2.f]] [[false]].
- **[[g() {}]]** method: بتتعمل مرة واحدة على [[A.prototype]]، والـ instances بيلاقوها في السلسلة ([[hasOwn]] بـ [[false]])، فـ [[a1.g === a2.g]] [[true]].
- **القياس:** 100 ألف instance بالـ arrow field أخدوا حوالي ٤ أضعاف الذاكرة اللي أخدوها بالـ method (9.2 MB قصاد 2.4 MB هنا، والرقم بيختلف شوية من تشغيل للتاني). الفرق ده الـ 100 ألف دالة الزيادة.
- **[[--expose-gc]] و [[globalThis.gc()]]:** بيشغّل جامع الزبالة قبل وبعد القياس عشان الرقم يبقى للـ objects اللي لسه عايشة بس.

**إمتى تختار إيه:** الـ arrow field لما الـ method هتتبعت callback كتير ([[onClick = () => ...]] في component) لأن this متثبتة لوحدها. والـ method العادية في كل حاجة تانية، خصوصًا لو هتعمل instances كتير.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const scaler = { factor: 2, scale(arr) { return arr.map(function (x) { return x * this.factor; }); } }]]. شغّل [[scaler.scale([1, 2, 3])]] في ملف [[.mjs]] وبعدين في [[.js]] عادي، وصلّحها بتلات طرق: arrow، و thisArg التاني بتاع [[map]]، و [[const self = this]].`, done: R`في [[.mjs]] بتطلع [[TypeError: Cannot read properties of undefined (reading 'factor')]]، وفي [[.js]] من غير strict بترجّع [[[ NaN, NaN, NaN ] ]]. والتلات تصليحات بيرجّعوا [[[ 2, 4, 6 ] ]].`, sol: R`~~~js scaler.mjs
const scaler = {
  factor: 2,
  scale(arr) {
    return arr.map(function (x) { return x * this.factor; });
  },
  scaleArrow(arr) {
    return arr.map((x) => x * this.factor);                  // ١) arrow
  },
  scaleThisArg(arr) {
    return arr.map(function (x) { return x * this.factor; }, this);   // ٢) thisArg
  },
  scaleSelf(arr) {
    const self = this;                                       // ٣) self
    return arr.map(function (x) { return x * self.factor; });
  },
};

try {
  console.log(scaler.scale([1, 2, 3]));
} catch (e) {
  console.log(e.name + ": " + e.message);
}
console.log(scaler.scaleArrow([1, 2, 3]), scaler.scaleThisArg([1, 2, 3]), scaler.scaleSelf([1, 2, 3]));
~~~

~~~js scaler-sloppy.cjs
const scaler = {
  factor: 2,
  scale(arr) {
    return arr.map(function (x) { return x * this.factor; });
  },
};
console.log(scaler.scale([1, 2, 3]));
~~~

~~~text الناتج (node scaler.mjs ثم node scaler-sloppy.cjs، Node 24)
TypeError: Cannot read properties of undefined (reading 'factor')
[ 2, 4, 6 ] [ 2, 4, 6 ] [ 2, 4, 6 ]
---
[ NaN, NaN, NaN ]
~~~

**ليه كده:**

- **الـ function اللي جوه map** بتتنده من map نفسها من غير نقطة، فـ this جواها مش scaler: [[undefined]] في strict (TypeError)، والـ global object في sloppy ([[globalThis.factor]] مش موجودة، فـ [[x * undefined]] = NaN).
- **١) arrow:** مالهاش this، فبتاخد this بتاعة [[scaleArrow]] وهي scaler.
- **٢) thisArg:** الـ argument التاني لـ [[map]] (و forEach و filter و some...) بيتبعت كـ this للـ callback. شغال مع function عادية بس، الـ arrow بتتجاهله.
- **٣) [[const self = this]]:** بتحفظ this في متغير عادي، والـ function الجوّانية بتقراه بالـ closure. ده الشكل القديم قبل الـ arrow، وهتشوفه في كود قديم كتير.

**الغلطة الشائعة:** تحط thisArg مع arrow: [[arr.map((x) => x * this.factor, scaler)]]. الـ arrow مش بتاخد this من أي حد، فالتاني ملوش أي تأثير.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب قاعدة من سطرين لزميلك: إمتى تكتب method عادية وإمتى arrow، وطبّقها على ٣ أماكن: method في object، و callback جوه method، و event handler محتاج العنصر نفسه.`, done: R`القاعدة: method عادية للدوال اللي على الـ object، و arrow للـ callbacks جواها عشان تاخد this بتاعة الـ method. والتلات أماكن: method عادية، و arrow، و function عادية (أو [[e.currentTarget]]) للـ handler.`, sol: R`**القاعدة (سطرين):**

1. الدالة اللي **على** الـ object (method) اكتبها method عادية [[name() {}]]، عشان this تبقى الـ object.
2. الدالة اللي **جوه** method وبتتبعت لحد تاني (callback لـ map أو setTimeout أو then) اكتبها arrow، عشان تاخد this بتاعة الـ method. والـ handler اللي محتاج العنصر: function عادية، أو أحسن [[e.currentTarget]].

والتلات أماكن متطبّقة ومتجرّبة:

~~~js rule.js
const saveBtn = new EventTarget();      // EventTarget في Node بيتصرف زي الزرار
saveBtn.label = "Save";
const sendBtn = new EventTarget();
sendBtn.label = "Send";

const form = {
  name: "signup",
  fields: ["email", "password"],
  describe() {                          // ١) method عادية: this = form
    return this.fields.map((f) => this.name + "." + f);   // ٢) arrow: this من describe
  },
};
console.log(form.describe());

saveBtn.addEventListener("click", function (e) {          // ٣) handler محتاج العنصر
  console.log(this.label, this === e.currentTarget);
});
sendBtn.addEventListener("click", (e) => console.log(e.currentTarget.label));   // نفس الحاجة بالـ arrow
saveBtn.dispatchEvent(new Event("click"));
sendBtn.dispatchEvent(new Event("click"));
~~~

~~~text الناتج (node rule.js، Node 24)
[ 'signup.email', 'signup.password' ]
Save true
Send
~~~

**ملحوظة اتلقت وقت التجربة:** في Node 24 لما حطّيت listenerين على نفس الـ EventTarget، [[e.currentTarget]] طلع [[null]] جوه التاني (في Chrome بيبقى العنصر في الاتنين). عشان كده كل handler هنا على عنصر لوحده.

**ليه القاعدة دي:** الـ method عايزة this ديناميكية (أي object بيناديها)، والـ callback عايز this ثابتة (بتاعة الـ method اللي هو جواها). والـ arrow هي اللي بتثبّت. والـ handler بيتنده من المتصفح بـ this = العنصر، وده بيضيع مع الـ arrow، فإما function عادية أو [[e.currentTarget]] اللي بيشتغل مع الاتنين.

**الغلطة الشائعة:** القاعدة العكسية «arrow في كل حتة». بتوقع في أول method على object.` }
          ],
          ref: [
            { t: "MDN: Arrow function expressions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
            { t: "MDN: Public class fields", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields" },
            { t: "MDN: setInterval()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval" },
          ],
          pre: [{ to: "js/this", why: R`لازم تعرف القواعد الأربعة الأول عشان تفهم ليه الـ arrow مالهاش this بتاعتها`}, { to: "js/function و arrow", why: R`الفرق في الشكل اتشرح هناك، وهنا الفرق في السلوك`}],
          flag: "script",
          deep: {
            why: "مشكلة this جوه callbacks كانت أشهر مشكلة في JS قبل ES2015، وكان الحل [[var self = this]] في كل حتة. الـ arrows حلّتها، بس لو مش فاهم ليه، هتستخدمها في المكان الغلط.",
            how: R`الـ arrow بتعامل this زي أي متغير من برّه: بتدوّر عليها في الـ scope chain. عشان كده [[call]] و [[bind]] و [[apply]] مبيغيّروش this بتاعة arrow خالص، ومينفعش تتعمل بـ [[new]].

جوه [[start]]، الـ this هو timer (قاعدة النقطة). الـ arrow اتكتبت جوه start فبتشوف نفس الـ this.

أما [[bad]] فاتكتبت في الـ object literal، والـ object literal مش scope. فالـ this بتاعتها هي بتاعة المكان اللي فيه الـ object كله: undefined في ES module، أو [[module.exports]] في CommonJS.

وفي الـ classes، فيه شكل شائع: [[handleClick = () => { ... }]] كـ class field. هنا الـ arrow بتاخد this = الـ instance، لأن الـ fields بتتعمل جوه الـ constructor. ده كان منتشر في React class components.`,
            when: "arrow لأي callback جوه method محتاج this. method عادية (مش arrow) لأي دالة في object أو class هتتنادي بـ obj.method().",
            mistakes: R`arrow كـ method في object. و arrow كـ event listener وانت محتاج [[this]] = العنصر (استخدم [[e.currentTarget]] بدالها). وتحاول تغيّر this بتاعة arrow بـ bind. وفي الانترفيو: «ليه arrow function مالهاش this؟» و «ينفع تعمل new لـ arrow؟» (لأ، TypeError).`
          },
          teach: R`## الكود ده بيعمل إيه؟

object اسمه [[timer]] فيه ٣ methods، وكل واحدة بتجرّب [[this]] في مكان مختلف: callback بـ [[function]] عادية (بايظة)، و callback بـ arrow (شغالة)، و arrow مستخدمة كـ method (غلط). اتشغّل في Node 24 كملف [[.cjs]] وكملف [[.mjs]]، وجزء منه في Chrome.

---

## ١. الـ object والعداد

~~~text app.js
const timer = {
  seconds: 0,
~~~

[[seconds]] خاصية رقم بتبدأ من 0، وهي اللي عايزين نزوّدها من جوه callback.

---

## ٢. [[startBroken]]: callback بـ function عادية

~~~text app.js
  startBroken() {
    setTimeout(function () {
      console.log(this?.seconds);
    }, 0);
  },
~~~

- [[startBroken() { ... }]]: method. لما نناديها [[timer.startBroken()]]، الـ this **جواها هي** = timer (قاعدة النقطة).
- [[setTimeout(function () { ... }, 0)]]: بنبعت لـ setTimeout دالة جديدة مكتوبة بـ [[function]]. الدالة دي ليها **this بتاعتها**، بتتحدد لما setTimeout تناديها، ومش هي اللي بتاخدها من startBroken.
- setTimeout بتناديها من غير [[timer.]] قبلها، فـ this جواها مش timer.

~~~text الناتج
undefined
~~~

وطبعنا this نفسها جوه الـ callback: في Node طلعت object من نوع [[Timeout]]، وفي Chrome طلعت [[window]]. الاتنين مفيهمش seconds، فالنتيجة undefined.

---

## ٣. [[start]]: callback بـ arrow

~~~text app.js
  start() {
    setTimeout(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 0);
  },
~~~

- [[() => { ... }]]: **arrow function**. الفرق المهم: **مالهاش this بتاعتها**. لما تكتب this جواها، JS بيدوّر عليها برّه، في المكان اللي الـ arrow **اتكتبت** فيه، بالظبط زي ما بيدوّر على أي متغير. ده اسمه **lexical this**.
- الـ arrow اتكتبت جوه [[start]]، و this بتاعة start = timer، فـ this جوه الـ arrow = timer.
- [[this.seconds++]]: زوّد seconds واحد ([[++]] = زوّد 1).

~~~text الناتج
1
~~~

---

## ٤. [[bad]]: arrow كـ method

~~~text app.js
  bad: () => typeof this,
};
~~~

- [[bad: () => ...]]: خاصية قيمتها arrow function.
- [[typeof this]]: [[typeof]] بيرجّع نوع القيمة كنص ([["object"]] أو [["undefined"]] ...).

هنا الـ arrow اتكتبت **جوه الـ object literal**، والـ [[{ }]] بتاعة الـ object **مش scope**، مش زي جسم الدالة. فالـ arrow بتطلع تدوّر على this برّه الـ object خالص، في الملف نفسه:

| مكان التشغيل | [[timer.bad()]] | ليه |
|---|---|---|
| ملف [[.cjs]] (CommonJS) | [["object"]] | this في أول الملف = [[module.exports]] |
| ملف [[.mjs]] (ES module) | [["undefined"]] | this في أول الـ module = undefined |
| Chrome (script عادي) | [["object"]] | this في أول الصفحة = [[window]] |

كلهم اتجرّبوا. وفي ولا واحدة this = timer. ولما جرّبنا [[timer.bad.call(timer)]] الناتج فضل نفسه: [[call]] مبتقدرش تغيّر this بتاعة arrow. وكمان [[new]] على arrow بيقع:

~~~text الناتج: const A = () => 1; new A();
TypeError: A is not a constructor
~~~

---

## ٥. التشغيل

~~~text app.js
timer.startBroken();
timer.start();
~~~

~~~text الناتج (Node)
undefined
1
~~~

الاتنين بيرجعوا فورًا، والـ callbacks بتشتغل بعد ما الكود المتزامن يخلص، بنفس الترتيب اللي اتسجّلت بيه.

---

## ٦. الحل القديم (الـ solCode)

قبل الـ arrows (ES2015)، كان فيه طريقتين:

~~~text app.js
  withSelf() {
    const self = this;
    setTimeout(function () {
      self.seconds++;
      console.log("self", self.seconds);
    }, 0);
  },
~~~

- [[const self = this;]]: احفظ this بتاعة الـ method في متغير عادي **قبل** الـ callback. والـ callback بيشوف [[self]] بالـ closure (أي دالة بتشوف المتغيرات اللي حواليها).

~~~text app.js
  withBind() {
    setTimeout(function () {
      this.seconds++;
      console.log("bind", this.seconds);
    }.bind(this), 0);
  },
~~~

- [[function () { ... }.bind(this)]]: [[bind]] بترجّع **نسخة** من الدالة this فيها متثبتة على القيمة اللي بعتها. والـ [[this]] اللي جوه أقواس bind اتقرت وقت تنفيذ withBind، يعني = timer.

~~~text الناتج
self 1
bind 2
~~~

الاتنين زوّدوا نفس الـ seconds (1 وبعدين 2)، يعني الاتنين شافوا timer فعلًا.

---

## الخلاصة

| | function عادية | arrow |
|---|---|---|
| ليها this بتاعتها؟ | أيوه، بتتحدد وقت النداء | لأ، بتاخدها من المكان اللي اتكتبت فيه |
| call و bind بيغيّروها؟ | أيوه | لأ |
| ينفع new؟ | أيوه | لأ (TypeError) |
| تنفع كـ method في object؟ | أيوه | لأ: this هتيجي من برّه الـ object |
| تنفع كـ callback جوه method؟ | محتاجة bind أو self | أيوه، وده استخدامها الأساسي |

القاعدة: **method = function عادية، callback جوه method = arrow**.`,
          lines: [
            R`object فيه عداد وتلات methods، هنقارن فيهم [[function]] و arrow جوه callback.`,
            R`العداد اللي الـ callbacks هتحاول توصله عن طريق [[this.seconds]].`,
            R`method عادية: لما تتنادى [[timer.startBroken()]] بتبقى [[this]] جواها [[timer]]. المشكلة هتبقى في الدالة اللي جواها.`,
            R`بنبعت لـ [[setTimeout]] دالة مكتوبة بـ [[function]]. الدالة دي ليها [[this]] خاصة بيها بتتحدد لما [[setTimeout]] تناديها، ومش بتورث [[this]] بتاعة [[startBroken]].`,
            R`[[setTimeout]] نادتها من غير [[timer.]]، فـ [[this]] هنا مش [[timer]] (في Node object الـ [[Timeout]] وفي Chrome [[window]]) ومفيهاش [[seconds]]، فبيطبع [[undefined]]. والـ [[?.]] بس عشان المثال ميقعش لو [[this]] طلعت [[undefined]].`,
            R`نهاية الـ callback، والـ [[0]] هو التأخير بالملي ثانية: «أول ما الكود الحالي يخلص».`,
            R`نهاية [[startBroken]].`,
            R`method تانية بنفس الفكرة بس بالطريقة الصح. لما تتنادى [[timer.start()]]، [[this]] جواها [[timer]].`,
            R`الـ callback المرة دي arrow function، والـ arrow مالهاش [[this]] بتاعتها خالص: بتستخدم [[this]] بتاعة المكان اللي اتكتبت فيه، يعني [[start]].`,
            R`[[this]] هنا هي [[this]] بتاعة [[start]]، يعني [[timer]]، فـ [[seconds]] بتزيد من 0 لـ 1 فعلًا. ده السبب إن الـ arrow هي الاختيار المعتاد للـ callbacks جوه methods.`,
            R`بيطبع [[1]]: الزيادة حصلت على [[timer]] نفسه.`,
            R`نهاية الـ arrow callback.`,
            R`نهاية [[start]].`,
            R`العكس: arrow مستخدمة كـ method. الـ object literal مش scope، فـ [[this]] جواها جاية من المكان اللي الـ object كله متكتب فيه (مش [[timer]])، فـ [[this.seconds]] جواها مكانتش هتشتغل. القاعدة: الـ methods بـ [[function]] أو الشكل المختصر، والـ arrow للـ callbacks اللي جواها.`,
            R`نهاية الـ object [[timer]].`,
            R`بيشغّل النسخة الغلط: بعد ما الكود الحالي يخلص بيطبع [[undefined]].`,
            R`بيشغّل النسخة الصح: بيطبع [[1]] بعد الـ [[undefined]] بتاعة اللي قبله، لأن الـ timers اللي ليها نفس التأخير بتشتغل بترتيب تسجيلها.`,
          ],
          sol: R`بـ self: جوه الـ function العادية اكتب [[self.seconds++]] بدل this. وبـ bind: [[setTimeout(function () { ... }.bind(this), 0)]]. في الاتنين الـ callback بقى شايف timer، ولو ناديت الطريقتين ورا بعض هتلاقي seconds بتزيد (1 وبعدين 2).

[[timer.bad()]] في ملف Node بترجّع [["object"]] (this بتاع الملف CommonJS هو module.exports)، وفي ES module بترجّع [["undefined"]]، وفي Console المتصفح [["object"]] (window). المهم إنها أبدًا مش timer. والغلطة إنك تكتب [[const self = this]] جوه الـ callback نفسه: ساعتها بتاخد this الغلط. لازم تتكتب في startBroken قبل setTimeout.`,
          solCode: R`const timer = {
  seconds: 0,
  withSelf() {
    const self = this;
    setTimeout(function () {
      self.seconds++;
      console.log("self", self.seconds);
    }, 0);
  },
  withBind() {
    setTimeout(function () {
      this.seconds++;
      console.log("bind", this.seconds);
    }.bind(this), 0);
  },
};
timer.withSelf(); // self 1
timer.withBind(); // bind 2`
        },
        {
          cmd: "call و apply و bind",
          title: "تحدد this بإيدك",
          desc: R`التلاتة بيخلوك تقرر this هتبقى إيه:

[[fn.call(obj, a, b)]]: نادي دلوقتي و this = obj، والـ arguments ورا بعض.
[[fn.apply(obj, [a, b])]]: نفس الكلام بس الـ arguments في array.
[[fn.bind(obj, a)]]: متناديش، رجّع دالة جديدة this بتاعتها متثبتة دايمًا على obj، وممكن تثبّت أول arguments كمان (partial application).`,
          example: R`function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
const sara = { name: "Sara" };
intro.call(sara, "Hi", "!");          // "Hi, I'm Sara!"
intro.apply(sara, ["Hey", "."]);      // "Hey, I'm Sara."
const saraIntro = intro.bind(sara, "Hello");
saraIntro("?");                       // "Hello, I'm Sara?"
saraIntro.call({ name: "Ali" }, "!"); // "Hello, I'm Sara!": bind مبيتغيرش
const btn = { label: "Save", click() { console.log(this.label); } };
setTimeout(btn.click.bind(btn), 0);   // "Save"`,
          try: R`اكتب [[myBind(fn, ctx, ...args)]] بإيدك: بترجّع دالة بتنادي [[fn.apply(ctx, [...args, ...newArgs])]]. ده سؤال انترفيو مشهور (المستوى ٣ فيه نسخة كاملة). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** [[Math.max.apply(null, [3, 9, 2])]] وقارنها بـ [[Math.max(...[3, 9, 2])]]. وجرّب الاتنين على array فاضية.`, done: R`الاتنين بيرجّعوا [[9]]، ومع array فاضية الاتنين بيرجّعوا [[-Infinity]] (فاتأكد إن الـ array مش فاضية قبلها).`, sol: R`~~~js max-apply.js
const nums = [3, 9, 2];
console.log(Math.max.apply(null, nums), Math.max(...nums));
console.log(Math.max.apply(null, []), Math.max(...[]));

const big = new Array(200000).fill(1);
try {
  Math.max(...big);
} catch (e) {
  console.log("200 ألف عنصر:", e.name + ": " + e.message);
}
console.log("بالـ reduce:", big.reduce((m, x) => (x > m ? x : m), -Infinity));
~~~

~~~text الناتج (node max-apply.js، Node 24)
9 9
-Infinity -Infinity
200 ألف عنصر: RangeError: Maximum call stack size exceeded
بالـ reduce: 1
~~~

**ليه كده:**

- **[[apply(null, nums)]]:** الـ argument الأول this (Math.max مبتستخدمهاش، فـ null)، والتاني array بتتفك arguments: [[Math.max(3, 9, 2)]]. والـ spread [[...nums]] بيعمل نفس الفك بشكل أحدث.
- **array فاضية:** [[Math.max()]] من غير arguments بترجّع [[-Infinity]] (أصغر حاجة، عشان أي رقم يكسبها). فلو الـ array ممكن تبقى فاضية اتأكد قبلها.
- **الحد:** الاتنين بيحطوا كل عنصر argument على الـ stack، فـ 200 ألف عنصر بيرموا [[RangeError]] (جرّبت في Node 24: 120 ألف عدّوا و 150 ألف وقعوا، والرقم بيختلف حسب الـ engine). للـ arrays الكبيرة [[reduce]].

**الغلطة الشائعة:** [[Math.max(nums)]] من غير فك: بتبعت الـ array نفسها argument واحد، فبترجّع [[NaN]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[function show(a, b) { return this.x + a + b; }]]. اكتب ناتج [[show.call({ x: 1 }, 2, 3)]] و [[show.apply({ x: 1 }, [2, 3])]] و [[show.bind({ x: 10 }, 1)(2)]] و [[show.bind({ x: 1 }).bind({ x: 100 })(0, 0)]].`, done: R`توقعت وطلع 6 و 6 و 13 و 1. والأخيرة لأن الـ bind التاني مبيقدرش يغيّر this بعد أول bind.`, sol: R`~~~js show-bind.js
function show(a, b) {
  return this.x + a + b;
}
console.log(show.call({ x: 1 }, 2, 3));
console.log(show.apply({ x: 1 }, [2, 3]));
console.log(show.bind({ x: 10 }, 1)(2));
console.log(show.bind({ x: 1 }).bind({ x: 100 })(0, 0));
~~~

~~~text الناتج (node show-bind.js، Node 24)
6
6
13
1
~~~

**ليه كده:**

- **[[call({ x: 1 }, 2, 3)]]:** this = [[{ x: 1 }]] والباقي arguments واحد واحد: 1 + 2 + 3 = 6.
- **[[apply({ x: 1 }, [2, 3])]]:** نفس الحاجة بس الـ arguments في array: 6.
- **[[bind({ x: 10 }, 1)]]:** بترجّع دالة جديدة this فيها 10 و a متثبت بـ 1. نداها بـ [[(2)]] فـ b = 2: 10 + 1 + 2 = 13.
- **[[bind(...).bind(...)]]:** أول bind عملت دالة this جواها متثبتة للأبد. التاني بيحاول يغيّر this بتاعة الدالة الجديدة دي، بس هي أصلًا مبتستخدمش this بتاعتها، بتنادي الأصلية بـ [[{ x: 1 }]]. فـ 1 + 0 + 0 = 1.

**الغلطة الشائعة:** تفتكر إن bind التانية «بتكتب فوق» الأولى. الـ bind التانية بتقدر تثبّت arguments زيادة بس، الـ this خلاص اتحدد.` },
            { lvl: 'تطبيق', t: R`**ابني:** اعمل logger بـ prefix: [[const log = console.log.bind(console, "[app]")]]، و [[const add5 = add.bind(null, 5)]] لـ [[add = (a, b) => a + b]].`, done: R`[[log("started")]] بيطبع [[[app] started]]، و [[add5(3)]] بترجّع [[8]]: الـ bind ثبّت أول argument، و [[null]] مكان this عشان add مش بتستخدمها.`, sol: R`~~~js prefix-logger.js
const log = console.log.bind(console, "[app]");
log("started");
log("users:", 3);

const add = (a, b) => a + b;
const add5 = add.bind(null, 5);
console.log(add5(3), add5(-5));
~~~

~~~text الناتج (node prefix-logger.js، Node 24)
[app] started
[app] users: 3
8 0
~~~

**ليه كده:**

- **[[console.log.bind(console, "[app]")]]:** دالة جديدة this فيها console (عشان log محتاجاها في بعض البيئات)، وأول argument متثبت بـ [["[app]"]]. أي حاجة تبعتها بتتحط بعده، فـ [[log("users:", 3)]] = [[console.log("[app]", "users:", 3)]].
- **[[add.bind(null, 5)]]:** ده اسمه partial application: ثبّتنا [[a]] بـ 5، والدالة الجديدة بتاخد [[b]] بس. و [[null]] مكان this لأن add arrow أصلًا مبتستخدمش this (والـ arrow بتتجاهل this اللي بتتبعت).

**الغلطة الشائعة:** [[const log = console.log]] من غير bind. في Node وفي Chrome الحديث شغالة، لكن في بيئات قديمة كانت بترمي [[Illegal invocation]] لأن log محتاجة this = console. الـ bind بيضمن الاتنين.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** widget فيه [[onClick() { console.log(this.name); }]]. ضيفه على زرار بـ [[btn.addEventListener("click", widget.onClick.bind(widget))]] وحاول تشيله بـ [[removeEventListener]] بنفس الكتابة. وبعدين صلّحه.`, done: R`الشيل مبيشتغلش والضغط لسه بيطبع، لأن [[widget.onClick.bind(widget) === widget.onClick.bind(widget)]] بترجّع [[false]] (كل bind دالة جديدة). وبعد ما تخزّن النسخة المربوطة في متغير وتبعته للاتنين، الضغط بعد الشيل مبيطبعش حاجة.`, sol: R`~~~live 300 removeEventListener و bind
<p><button type="button" id="a">زرار A</button> <button type="button" id="remove-a">شيل listener A (غلط)</button></p>
<p><button type="button" id="b">زرار B</button> <button type="button" id="remove-b">شيل listener B (صح)</button></p>
<ol id="log"></ol>
<script>
  const log = (t) => {
    const li = document.createElement("li");
    li.textContent = t;
    document.querySelector("#log").append(li);
  };
  const widgetA = { name: "A", onClick() { log("ضغطة على " + this.name); } };
  const widgetB = { name: "B", onClick() { log("ضغطة على " + this.name); } };

  // الغلط: كل bind بيعمل دالة جديدة
  const a = document.querySelector("#a");
  a.addEventListener("click", widgetA.onClick.bind(widgetA));
  document.querySelector("#remove-a").addEventListener("click", () => {
    a.removeEventListener("click", widgetA.onClick.bind(widgetA));
    log("شلت A؟ bind === bind: " + (widgetA.onClick.bind(widgetA) === widgetA.onClick.bind(widgetA)));
  });

  // الصح: النسخة المربوطة في متغير، ونفس الـ reference للاتنين
  const b = document.querySelector("#b");
  const boundB = widgetB.onClick.bind(widgetB);
  b.addEventListener("click", boundB);
  document.querySelector("#remove-b").addEventListener("click", () => {
    b.removeEventListener("click", boundB);
    log("شلت B");
  });
</script>
~~~

~~~text الناتج (Chrome 157، Playwright: A ثم «شيل A» ثم A، و B ثم «شيل B» ثم B)
1. ضغطة على A
2. شلت A؟ bind === bind: false
3. ضغطة على A          ← لسه شغال
4. ضغطة على B
5. شلت B
                        ← الضغطة على B بعد الشيل مطبعتش حاجة
~~~

**ليه كده:**

- **[[removeEventListener]]** بيدوّر على **نفس الدالة بالظبط** (نفس الـ reference) اللي اتضافت. و [[bind]] كل مرة بترجّع دالة جديدة، فالدالة اللي بتحاول تشيلها عمرها ما اتضافت، والشيل بيعدّي من غير أي error ومن غير ما يعمل حاجة.
- **التصليح:** [[const boundB = widgetB.onClick.bind(widgetB)]] مرة واحدة، وتبعت **نفس المتغير** للـ add والـ remove.

**الغلطة الشائعة:** نفس الفخ مع الـ arrow: [[addEventListener("click", () => w.onClick())]] وبعدين [[removeEventListener("click", () => w.onClick())]]. اتنين arrows شكلهم واحد بس دالتين مختلفين. أي دالة هتشيلها لازم تتخزّن في متغير. (والحل الأحدث: [[AbortController]] و [[{ signal }]] بيشيل كل الـ listeners مرة واحدة.)` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[myBind(fn, thisArg, ...preset)]] من غير [[bind]]: بترجّع دالة بتنادي fn بـ apply أو call بالـ this والـ arguments المثبتة وبعدها الجديدة.`, done: R`[[myBind(show, { x: 1 }, 2)(3)]] بترجّع 6 زي [[show.bind({ x: 1 }, 2)(3)]]، و [[myBind(Math.max, null)(4, 9)]] بترجّع 9.`, sol: R`~~~js my-bind.js
function myBind(fn, thisArg, ...preset) {
  return function (...args) {
    return fn.apply(thisArg, [...preset, ...args]);
  };
}

function show(a, b) {
  return this.x + a + b;
}
console.log(myBind(show, { x: 1 }, 2)(3), show.bind({ x: 1 }, 2)(3));
console.log(myBind(Math.max, null)(4, 9));
console.log(myBind(show, { x: 10 })(1, 2), myBind(show, { x: 0 }, 1, 2)());

const user = { name: "Sara", hi(greet) { return greet + " " + this.name; } };
const hi = myBind(user.hi, user);
setTimeout(() => console.log(hi("أهلا")), 0);
~~~

~~~text الناتج (node my-bind.js، Node 24)
6 6
9
13 3
أهلا Sara
~~~

**ليه كده:**

- **[[...preset]]** في الـ parameters بيلم كل اللي بعد thisArg في array (rest)، و [[...args]] بيلم arguments النداء الجديد.
- **[[fn.apply(thisArg, [...preset, ...args])]]:** بننادي الأصلية بالـ this اللي اتحفظ، والـ arguments المثبتة الأول وبعدها الجديدة. ودي بالظبط اللي [[bind]] بتعمله.
- **[[thisArg]] و [[preset]] في الـ closure:** الدالة اللي رجعت فاكراهم، فحتى لما اتبعتت لـ setTimeout، this فضلت user.

**الفرق عن bind الحقيقية** (للمعرفة): الحقيقية بتشتغل مع [[new]] (بتتجاهل thisArg)، وبتحط [[name]] بـ [["bound show"]] و [[length]] صح. للاستخدام العادي الشكل ده كفاية.

**الغلطة الشائعة:** [[return fn.apply(thisArg, preset.concat(arguments))]] جوه arrow: الـ arrow مالهاش [[arguments]] بتاعتها، فبتاخد arguments بتاعة myBind نفسها. الـ rest [[...args]] أوضح وأسلم.` }
          ],
          ref: [
            { t: "MDN: Function.prototype.call()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call" },
            { t: "MDN: Function.prototype.apply()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" },
            { t: "MDN: Function.prototype.bind()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" },
            { t: "MDN: EventTarget.removeEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener" },
          ],
          pre: [{ to: "js/this", why: R`call و apply و bind هما القاعدة الصريحة من قواعد this`}, { to: "js/default و rest و spread", why: R`الـ spread هو البديل الحديث لـ apply، و [[...args]] بيلم الـ arguments في [[myBind]]`}],
          flag: "script",
          deep: {
            why: "بتحتاجهم لما تبعت method كـ callback (bind)، أو تستعير method من object لـ object تاني (call). و bind بالذات بيحل مشكلة this الضايعة في setTimeout و addEventListener.",
            how: R`[[call]] و [[apply]] بينادوا فورًا، والفرق بس في شكل الـ arguments. قبل الـ spread كان [[Math.max.apply(null, arr)]] الطريقة الوحيدة تبعت array كـ arguments، ودلوقتي [[Math.max(...arr)]] أوضح.

[[bind]] بترجّع «bound function»، والـ this فيها متثبت للأبد: call و apply و bind تاني مش بيغيّروه. الاستثناء الوحيد [[new]]، اللي بيتجاهل الـ this المتثبت.

كل [[bind]] بيعمل دالة جديدة. فلو عملت [[addEventListener("click", this.fn.bind(this))]] مش هتعرف تشيله بـ removeEventListener، لأن الـ bind التاني هيعمل دالة مختلفة. احفظ الـ bound function في متغير الأول.

واستعارة methods: [[Array.prototype.slice.call(arguments)]] كانت الطريقة القديمة لتحويل array-like لـ array، ودلوقتي [[Array.from]].`,
            when: R`[[bind]] لما تبعت method كـ callback وعايز this تفضل. [[call]] لما تستعير method أو تنادي بـ this معيّن. [[apply]] نادرًا دلوقتي.`,
            mistakes: R`[[bind]] وتفتكرها نادت الدالة. و bind جوه render أو loop فتعمل دوال جديدة كل مرة. وتحاول تعمل bind لـ arrow. وفي الانترفيو: «الفرق بين call و apply و bind؟» و «اكتب bind بإيدك».`
          },
          teach: R`## الكود ده بيعمل إيه؟

دالة واحدة [[intro]] بتستخدم [[this]]، وبنناديها ٣ مرات بـ this مختلفة بإيدنا: بـ [[call]]، وبـ [[apply]]، وبنسخة متثبتة بـ [[bind]]. وفي الآخر بنستخدم bind عشان نصلّح مشكلة setTimeout من درس this. اتشغّل في Node 24.

---

## ١. الدالة

~~~text app.js
function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
~~~

- [[greeting]] و [[punct]] (اختصار punctuation، علامة الترقيم): باراميترين عاديين.
- النص اللي بين علامتين [[$__bt]] اسمه **template literal**: نص تقدر تحط جواه قيم بـ [[$__{...}]]. فـ [[$__{greeting}]] بتتبدل بقيمة greeting، و [[$__{this.name}]] بقيمة name من this.
- الدالة نفسها مش عارفة this هتبقى إيه. ده هيتحدد **وقت النداء**.

---

## ٢. [[call]]: نادي دلوقتي و this = اللي تقوله

~~~text app.js
const sara = { name: "Sara" };
intro.call(sara, "Hi", "!");
~~~

- [[intro.call(...)]]: كل دالة في JS هي object، وعليها methods جاهزة منها [[call]].
- أول argument ([[sara]]) بيبقى **this**، والباقي ([["Hi"]] و [["!"]]) بيتبعتوا للدالة ورا بعض.

~~~text الناتج
Hi, I'm Sara!
~~~

---

## ٣. [[apply]]: نفس الكلام بس الـ arguments في array

~~~text app.js
intro.apply(sara, ["Hey", "."]);
~~~

الفرق الوحيد إن الـ arguments جوه array واحدة: [[apply(sara, ["Hey", "."])]]. وسهل تفتكرها: **a**pply = **a**rray.

~~~text الناتج
Hey, I'm Sara.
~~~

apply كانت مهمة زمان لما تكون الـ arguments عندك في array، زي [[Math.max.apply(null, [3, 9, 2])]]. دلوقتي الـ spread [[...]] بيعمل نفس الشغل: [[Math.max(...[3, 9, 2])]]، والاتنين طلّعوا [[9]].

---

## ٤. [[bind]]: متناديش، رجّع دالة جديدة

~~~text app.js
const saraIntro = intro.bind(sara, "Hello");
saraIntro("?");
~~~

- [[intro.bind(sara, "Hello")]]: **مبتنفّذش** intro. بترجّع دالة **جديدة**: this فيها متثبتة على sara، وأول argument متثبت على [["Hello"]] (ده اسمه **partial application**: تثبّت جزء من الـ arguments).
- [[saraIntro("?")]]: لما تنادي النسخة الجديدة، اللي بتبعته بييجي **بعد** المتثبت، فـ [["?"]] بقت punct.

~~~text الناتج
Hello, I'm Sara?
~~~

وطبعنا شوية معلومات عن الدالة الجديدة:

~~~text الناتج: typeof saraIntro, saraIntro.name, saraIntro.length, intro.length
function bound intro 1 2
~~~

يعني: هي function، واسمها [["bound intro"]] (Node بيعلّم إنها نسخة bind)، و [[length]] (عدد الباراميترات المتوقعة) بقى 1 بدل 2، لأن واحد اتثبت.

---

## ٥. bind مبتتغيرش

~~~text app.js
saraIntro.call({ name: "Ali" }, "!");
~~~

جرّبنا نغيّر this بـ call على النسخة المتثبتة:

~~~text الناتج
Hello, I'm Sara!
~~~

الـ [["!"]] وصلت (arguments عادية)، بس this فضلت Sara. الـ bound function this فيها متثبتة **للأبد**: لا call ولا apply ولا bind تاني يغيّروها. (الاستثناء الوحيد [[new]]، وده نادر.)

وحاجة مهمة: كل [[bind]] بيعمل دالة جديدة:

~~~text الناتج: intro.bind(sara) === intro.bind(sara)
false
~~~

عشان كده لو عملت [[addEventListener("click", obj.fn.bind(obj))]]، مش هتعرف تشيله بـ [[removeEventListener]] بـ bind تاني. احفظ النسخة في متغير الأول.

---

## ٦. الاستخدام الأشهر: callback

~~~text app.js
const btn = { label: "Save", click() { console.log(this.label); } };
setTimeout(btn.click.bind(btn), 0);
~~~

من غير bind، setTimeout كانت هتنادي click لوحدها و this تضيع (درس this). [[btn.click.bind(btn)]] بتعمل نسخة this فيها btn، و setTimeout تنادي النسخة دي:

~~~text الناتج
Save
~~~

---

## الخلاصة

| | بينادي دلوقتي؟ | الـ arguments | بيرجّع |
|---|---|---|---|
| [[fn.call(obj, a, b)]] | أيوه | ورا بعض | ناتج fn |
| [[fn.apply(obj, [a, b])]] | أيوه | في array | ناتج fn |
| [[fn.bind(obj, a)]] | لأ | تثبّت أولهم (اختياري) | دالة جديدة this فيها obj للأبد |

- call و apply للنداء مرة واحدة بـ this معيّنة. bind لما هتبعت الدالة لحد تاني يناديها بعدين.
- التمرين تحت بيطلب منك تكتب [[myBind]] بنفسك. فكّر في اللي شفته في خطوة ٤ و ٥: bind بترجّع **دالة**، والدالة دي لما تتنادي لازم تستخدم الـ this المحفوظ والـ arguments القديمة والجديدة بالترتيب.`,
          lines: [
            R`دالة عادية بتستخدم [[this]] مع إنها مش جوه object. [[this]] هتتحدد وقت النداء، و [[greeting]] و [[punct]] باراميترات عادية.`,
            R`بترجّع جملة متركّبة بـ template literal: التحية، وبعدين [[this.name]] من الـ object اللي هيتحدد، وبعدين علامة الترقيم. لو اتنادت [[intro()]] كده من غير [[this]] في strict mode هترمي TypeError لأن [[this]] بـ [[undefined]].`,
            R`نهاية [[intro]].`,
            R`object عادي فيه [[name]] بس، ومفيهوش [[intro]] كـ method. هنستعير الدالة ونشغّلها عليه.`,
            R`[[call]] بتنادي الدالة **فورًا**: أول argument بيبقى [[this]] ([[sara]])، والباقي arguments الدالة ورا بعض. النتيجة [["Hi, I'm Sara!"]].`,
            R`نفس [[call]] بالظبط، الفرق الوحيد إن arguments الدالة بتتبعت في array واحدة. مفيدة لما الـ arguments تكون جاهزة في array، والنهارده [[intro.call(sara, ...args)]] بتعمل نفس الحاجة.`,
            R`[[bind]] **مبتنادِيش** الدالة: بترجّع دالة جديدة [[this]] فيها متثبتة على [[sara]] على طول، وكمان أول argument ([["Hello"]]) متثبت (partial application).`,
            R`بننادي الدالة الجديدة بالـ argument الباقي بس، فـ [["Hello"]] المتثبت يبقى [[greeting]] و [["?"]] يبقى [[punct]]: [["Hello, I'm Sara?"]].`,
            R`حتى [[call]] مقدرتش تغيّر [[this]] بتاعة دالة اتعملها [[bind]]: لسه [[Sara]]، و [["!"]] بس اتبعت كـ argument. فلو عايز [[this]] تانية، اعمل [[bind]] من الدالة الأصلية [[intro]] مش من [[saraIntro]].`,
            R`object فيه method بتعتمد على [[this.label]]، وهنبعتها لـ [[setTimeout]] زي ما بيحصل مع الـ event handlers.`,
            R`[[bind(btn)]] بتعمل نسخة [[this]] فيها متثبتة على [[btn]] **قبل** ما نبعتها، فلما [[setTimeout]] تناديها لوحدها تفضل [[this]] هي [[btn]] ويطبع [[Save]]. من غير [[bind]] كانت هتطبع [[undefined]].`,
          ],
          sol: R`[[myBind(intro, sara, "Hi")("!")]] لازم ترجّع [["Hi, I'm Sara!"]]، زي bind المدمجة. والـ args اللي اتحددت وقت الـ bind بتيجي الأول، وبعدها اللي بتتبعت وقت النداء.

ولو ناديت الناتج بـ [[.call({ name: "Ali" }, "!")]] هيفضل Sara، لأن جوه الدالة اللي رجّعتها انت بتنادي [[fn.apply(ctx, ...)]] بالـ ctx المحفوظ في الـ closure وبتتجاهل this الجديدة. الغلطة الشائعة إنك ترجّع [[fn.apply(ctx, args)]] على طول بدل ما ترجّع دالة، فالدالة تتنفّذ وقت الـ bind نفسه. والنسخة دي مبتدعمش [[new]]، والمستوى ٣ بيكمّلها.`,
          solCode: R`function myBind(fn, ctx, ...args) {
  return function (...newArgs) {
    return fn.apply(ctx, [...args, ...newArgs]);
  };
}
function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
const saraIntro = myBind(intro, { name: "Sara" }, "Hi");
console.log(saraIntro("!"));                    // "Hi, I'm Sara!"
console.log(saraIntro.call({ name: "Ali" }, "?")); // "Hi, I'm Sara?"`,
          check: {
            lang: "js",
            starter: R`function myBind(fn, ctx, ...args) {
  // رجّع دالة، متنفّذش fn دلوقتي
}`,
            tests: R`function intro(greeting, punct) { return greeting + ", I'm " + this.name + punct; }
test("myBind(intro, sara, 'Hi')('!') ← \"Hi, I'm Sara!\"", () => expect(myBind(intro, { name: "Sara" }, "Hi")("!")).toBe("Hi, I'm Sara!"));
test("بترجّع دالة ومش بتنادي fn وقت الـ bind", () => {
  let calls = 0;
  const b = myBind(() => calls++, null);
  expect([typeof b, calls]).toEqual(["function", 0]);
});
test("الـ args بتاعة الـ bind الأول وبعدها بتاعة النداء", () => expect(myBind((...a) => a.join(""), null, "a", "b")("c", "d")).toBe("abcd"));
test("this متتغيرش بـ call بعد الـ bind", () => expect(myBind(intro, { name: "Sara" }, "Hi").call({ name: "Ali" }, "?")).toBe("Hi, I'm Sara?"));
test("بترجّع ناتج fn", () => expect(myBind(function () { return this.x * 2; }, { x: 21 })()).toBe(42));`,
            solution: R`function myBind(fn, ctx, ...args) {
  return function (...newArgs) {
    return fn.apply(ctx, [...args, ...newArgs]);
  };
}`
          }
        }
      ]
    }
]);
