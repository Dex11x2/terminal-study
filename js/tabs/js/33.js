// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "Web Components",
      l: 3,
      n: "عناصر HTML بتعملها بنفسك (<user-card>) من غير framework: custom elements و shadow DOM و slots، وإزاي تستخدمها جوه React و Vue، وتدخل الفورم بـ ElementInternals، وتظهر من غير flash بـ Declarative Shadow DOM و :defined",
      pre: [
        { to: "js/class", why: R`الـ component نفسه [[class]] فيه [[constructor]] و methods و [[static]] و fields خاصة بـ [[#]]` },
        { to: "js/extends و super", why: R`[[extends HTMLElement]] و [[super()]] أول سطر في الـ constructor هما أول سطرين في أي component` },
        { to: "js/method definitions و property accessors", why: R`كل attribute بيبقى [[get]] و [[set]] على الـ class، وده قلب درس «attributes و properties»` },
        { to: "js/addEventListener", why: R`الـ components بتسمع لأحداث وبتبعت أحداث، وفهم الـ bubbling شرط لفهم [[composed]]` },
        { to: "js/شجرة الـ DOM: parent و children و siblings", why: R`الـ text nodes والفرق بين [[children]] و [[childNodes]] هو نفس الفرق بين [[assignedElements]] و [[assignedNodes]] في الـ slots` },
        { to: "js/import و export", why: R`كل component في ملف module لوحده بيتحمّل بـ [[<script type="module">]]` },
      ],
      projects: [
        { lvl: 'صغير', dir: "relative-time", t: R`[[<relative-time>]] زي GitHub`, what: R`[[<relative-time datetime="2026-10-29T10:00:00Z">]] بيكتب «قبل 3 دقائق» بـ [[Intl.RelativeTimeFormat("ar", { numeric: "auto" })]] (درس customElements.define)، وبيتحدّث كل دقيقة بـ [[setInterval]] بيتعمل في [[connectedCallback]] ويتمسح في [[disconnectedCallback]]، وبيسمع لتغيير [[datetime]].`, done: R`تاريخ من 3 دقايق بيطلع «قبل 3 دقائق» ومن يوم بيطلع «أمس»، وبعد دقيقة النص بيتغير لوحده، و [[setAttribute("datetime", ...)]] بيحدّثه على طول، و [[remove()]] بيوقّف الـ interval (عدّاد في الـ callback بيقف)، وتاريخ غلط بيكتب «تاريخ غلط» مش «Invalid Date».`, sol: R`## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>relative-time</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 16px; }
  li { margin-block: 4px; }
  relative-time { font-weight: 700; color: #1d4ed8; }
  relative-time[invalid] { color: #b91c1c; }
</style>
</head>
<body>
<h1>آخر النشاط</h1>
<ul id="list"></ul>
<p>عدد مرات التحديث: <span id="ticks">0</span></p>
<script>
class RelativeTime extends HTMLElement {
  static observedAttributes = ["datetime"];
  static #fmt = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
  static #units = [
    ["year", 365 * 24 * 3600],
    ["month", 30 * 24 * 3600],
    ["week", 7 * 24 * 3600],
    ["day", 24 * 3600],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  #timer = 0;
  connectedCallback() {
    this.render();
    this.#timer = setInterval(() => this.render(), 60_000);
  }
  disconnectedCallback() {
    clearInterval(this.#timer);
  }
  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }
  render() {
    const date = new Date(this.getAttribute("datetime"));
    if (Number.isNaN(date.getTime())) {
      this.textContent = "تاريخ غلط";
      this.setAttribute("invalid", "");
      return;
    }
    this.removeAttribute("invalid");
    this.title = date.toLocaleString("ar-EG");
    const diff = Math.round((date - Date.now()) / 1000);
    const [unit, size] = RelativeTime.#units.find(([, s]) => Math.abs(diff) >= s) ?? ["second", 1];
    this.textContent = RelativeTime.#fmt.format(Math.round(diff / size), unit);
    this.dispatchEvent(new Event("tick"));
  }
}
customElements.define("relative-time", RelativeTime);

// الصفحة: تواريخ نسبةً لدلوقتي عشان المعاينة تبان صح في أي وقت
const ago = (sec) => new Date(Date.now() - sec * 1000).toISOString();
const items = [
  ["سارة علّقت", ago(3 * 60)],
  ["اتعمل deploy", ago(2 * 3600)],
  ["علي فتح issue", ago(26 * 3600)],
  ["آخر نسخة", ago(40 * 24 * 3600)],
  ["تاريخ جاي من API بايظ", "not-a-date"],
];
const list = document.querySelector("#list");
let ticks = 0;
for (const [label, iso] of items) {
  const li = document.createElement("li");
  const t = document.createElement("relative-time");
  t.setAttribute("datetime", iso);
  t.addEventListener("tick", () => (document.querySelector("#ticks").textContent = ++ticks));
  li.append(label + " ", t);
  list.append(li);
}
</script>
</body>
</html>
~~~

## هتشوف إيه

لستة نشاط: «قبل 3 دقائق»، و «قبل ساعتين»، و «أمس»، و «الشهر الماضي»، والتاريخ البايظ بالأحمر «تاريخ غلط». لو وقفت بالماوس على أي وقت بيظهر التاريخ الكامل. وكل دقيقة النصوص بتتحدّث لوحدها، والعدّاد تحت بيزيد.

## الناتج المتقاس

اتجرّب في Chrome 158 بـ [[page.clock]] بتاع Playwright (ساعة مزيفة، عشان نقدّم الوقت دقيقة من غير ما نستنى):

~~~text الناتج
start: قبل 3 دقائق | قبل ساعتين | أمس | الشهر الماضي | تاريخ غلط | ticks 4
+1 min: قبل 4 دقائق | قبل ساعتين | أمس | الشهر الماضي | تاريخ غلط | ticks 8
first -> +3 days: خلال 3 أيام
first -> 1 day ago: أمس
after remove() + 3 min: ticks 10 -> 10
~~~

- بعد دقيقة «قبل 3» بقت «قبل 4» والعدّاد زاد 4 (الأربعة الصالحين اترسموا تاني).
- [[setAttribute("datetime", ...)]] غيّر النص على طول، من غير ما يستنى الدقيقة.
- بعد [[remove()]] لكل العناصر، ٣ دقايق عدّت والعدّاد فضل 10: الـ intervals اتمسحت.

## الكود حتة حتة

- **[[static #fmt = new Intl.RelativeTimeFormat("ar", { numeric: "auto" })]]:** formatter واحد لكل العناصر ([[static]])، لأن عمله تقيل نسبيًا. و [[numeric: "auto"]] هو اللي بيكتب «أمس» و «الشهر الماضي» بدل «قبل يوم واحد».
- **[[#units]] و [[find]]:** بنمشي من السنة للثانية وناخد أول وحدة الفرق أكبر منها أو يساويها. [[Math.abs]] عشان نفس الكود يشتغل للماضي والمستقبل («خلال 3 أيام»). و [[?? ["second", 1]]] لو الفرق صفر.
- **[[(date - Date.now()) / 1000]]:** طرح تاريخين بيدّي ميلي ثانية، والسالب = ماضي. [[Intl.RelativeTimeFormat]] بيفهم السالب لوحده.
- **[[Number.isNaN(date.getTime())]]:** [[new Date("not-a-date")]] مبيرميش error، بيرجّع «Invalid Date» وقيمته [[NaN]]. فبنفحص ونكتب «تاريخ غلط» ونحط attribute [[invalid]] عشان الـ CSS يلوّنه.
- **[[setInterval]] في [[connectedCallback]] و [[clearInterval]] في [[disconnectedCallback]]:** الاتنين مع بعض دايمًا. من غير المسح كل عنصر اتشال بيفضل شغال في الخلفية (memory leak).
- **[[if (this.isConnected)]] في [[attributeChangedCallback]]:** الصفحة بتعمل [[setAttribute]] قبل [[append]]، والـ callback بيتنادى ساعتها. مفيش داعي نرسم مرتين، [[connectedCallback]] هيرسم.
- **[[this.dispatchEvent(new Event("tick"))]]:** حدث صغير بنعدّ بيه مرات التحديث. ده اللي خلّى «الـ interval وقف» حاجة تتقاس مش كلام.
- **التواريخ في الصفحة نسبةً لـ [[Date.now()]]:** عشان المعاينة تقول «قبل 3 دقائق» في أي يوم تفتحها. في موقع حقيقي التاريخ بيجي ثابت من السيرفر.

## الغلطات اللي ممكن تقع فيها

- **«قبل 0 دقائق» أو «خلال 0 ثانية»:** لو نسيت [[Math.round]] أو قسمت على الوحدة الغلط. الترتيب من الكبير للصغير هو اللي بيضمن إن الرقم ≥ 1.
- **تبدأ الـ interval في الـ constructor:** العنصر اللي اتعمل بـ [[createElement]] ولسه ما دخلش الصفحة هيبدأ يعدّ، ولو اتنقل هيبقى عنده interval تاني. لازم في [[connectedCallback]] ويتمسح في [[disconnectedCallback]].` },
        { lvl: 'صغير', dir: "toggle-switch", t: R`[[<toggle-switch>]] بالكيبورد`, what: R`مفتاح on/off بـ shadow DOM (درس ٢) و [[checked]] boolean بيعمل reflect (درس ٤): [[role="switch"]] و [[aria-checked]] و [[tabindex="0"]]، وبيتقلب بالضغط أو Space أو Enter، وبيبعت [[change]] event فيه [[detail.checked]].`, done: R`Tab بيوصله و Space بيقلبه، و [[el.checked = true]] بيحط attribute [[checked]] و [[removeAttribute("checked")]] بيرجّع [[el.checked]] بـ [[false]]، و [[aria-checked]] ماشي مع الحالة، والـ [[change]] بيتبعت مرة واحدة لكل تغيير من اليوزر ومبيتبعتش لما الكود يغيّر [[checked]].`, sol: R`## الشكل النهائي

~~~live 170 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>toggle-switch</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 16px; }
  label { display: flex; align-items: center; gap: 10px; margin-block: 8px; }
</style>
</head>
<body>
<label><toggle-switch id="wifi" aria-labelledby="wifi-l"></toggle-switch> <span id="wifi-l">Wi-Fi</span></label>
<label><toggle-switch id="dark" checked aria-labelledby="dark-l"></toggle-switch> <span id="dark-l">الوضع الليلي</span></label>
<p id="out">آخر change: —</p>
<script>
class ToggleSwitch extends HTMLElement {
  static observedAttributes = ["checked"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>
        :host { display: inline-block; width: 46px; height: 26px; border-radius: 999px; background: var(--off, #9ca3af); position: relative; cursor: pointer; transition: background .2s; }
        :host([checked]) { background: var(--on, #16a34a); }
        :host(:focus-visible) { outline: 3px solid #2563eb; outline-offset: 2px; }
        .knob { position: absolute; top: 3px; inset-inline-start: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transition: inset-inline-start .2s; }
        :host([checked]) .knob { inset-inline-start: 23px; }
      </style>
      <span class="knob"></span>$__bt;
    this.addEventListener("click", () => this.#toggleByUser());
    this.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        this.#toggleByUser();
      }
    });
  }
  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "switch");
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
    this.#syncAria();
  }
  get checked() { return this.hasAttribute("checked"); }
  set checked(on) { this.toggleAttribute("checked", Boolean(on)); }
  attributeChangedCallback() { this.#syncAria(); }
  #syncAria() { this.setAttribute("aria-checked", String(this.checked)); }
  #toggleByUser() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { checked: this.checked } }));
  }
}
customElements.define("toggle-switch", ToggleSwitch);
document.addEventListener("change", (e) => {
  if (e.target.localName === "toggle-switch") document.querySelector("#out").textContent = $__btآخر change: $__{e.target.id} = $__{e.detail.checked}$__bt;
});
</script>
</body>
</html>
~~~

## هتشوف إيه

مفتاحين: Wi-Fi مقفول (رمادي) والوضع الليلي مفتوح (أخضر والدايرة على الناحية التانية). الضغط بالماوس بيقلبه بحركة، و Tab بيوصله بإطار أزرق، و Space أو Enter بيقلبوه، والسطر تحت بيكتب آخر [[change]].

## الناتج المتقاس

Playwright في Chrome 158 (ونفس الناتج جوه الصفحة الحية):

~~~text الناتج
start: wifi checked=false attr=false aria-checked=false | dark checked=true attr=true aria-checked=true
focused: wifi
Space: wifi checked=true attr=true aria-checked=true
Enter: wifi checked=false attr=false aria-checked=false
click dark: dark checked=false attr=false aria-checked=false
code wifi.checked = true: wifi checked=true attr=true aria-checked=true
removeAttribute: wifi checked=false attr=false aria-checked=false
change events: ["wifi:true","wifi:false","dark:false"] | آخر change: dark = false
~~~

٣ تغييرات من اليوزر (Space و Enter والضغطة) = ٣ أحداث [[change]]. والتغييرين من الكود ([[checked = true]] و [[removeAttribute]]) مبعتوش حاجة.

## الكود حتة حتة

- **[[get checked()]] / [[set checked(on)]]:** الـ attribute هو الحقيقة الوحيدة. [[toggleAttribute("checked", Boolean(on))]] بيحطه أو يشيله، فـ [[el.checked = true]] بيظهر [[checked]] في الـ HTML، و [[removeAttribute]] بيخلّي الـ getter يرجّع [[false]] لوحده.
- **[[observedAttributes = ["checked"]]] و [[#syncAria]]:** أي تغيير في الـ attribute (من الـ setter أو من HTML أو DevTools) بيحدّث [[aria-checked]]، فقارئ الشاشة دايمًا بيقول الحالة الصح.
- **[[role="switch"]] و [[tabindex="0"]] في [[connectedCallback]] مش الـ constructor:** المتصفح مش بيسمح تضيف attributes في الـ constructor: جرّبتها و [[document.createElement(...)]] طلّع [[NotSupportedError: Failed to execute 'createElement' on 'Document': The result must not have attributes]] والعنصر طلع مش متعرّف. و [[if (!this.hasAttribute(...))]] عشان لو اللي بيستخدمه حط قيمة بنفسه منغطّيهاش.
- **[[#toggleByUser]] هي اللي بتبعت [[change]]، مش الـ setter:** ده نفس سلوك [[<input type="checkbox">]]: الحدث للي اليوزر عمله بس. لو الـ setter بعت الحدث، أي كود بيعمل [[el.checked = saved]] وهو بيحمّل الإعدادات هيشغّل الـ listeners كأن اليوزر داس.
- **[[e.preventDefault()]] مع Space:** من غيره Space بيعمل scroll للصفحة.
- **[[:host([checked])]] و [[:host(:focus-visible)]]:** الشكل كله CSS بيقرا الـ attribute وحالة الـ focus. [[:focus-visible]] بيظهر الإطار مع الكيبورد بس مش مع الماوس.
- **[[inset-inline-start]] بدل [[left]]:** الدايرة بتتحرك في الاتجاه الصح في صفحة عربي RTL وإنجليزي LTR.
- **[[var(--on, #16a34a)]]:** ألوان قابلة للتغيير من بره من غير ما تلمس الـ component.

## الغلطات اللي ممكن تقع فيها

- **تخزّن الحالة في [[this._checked]]:** [[removeAttribute("checked")]] من DevTools مش هيغيّر الـ field، فالشكل يقول حاجة والـ property تقول حاجة.
- **تنسى [[role]] و [[aria-checked]]:** بالماوس كله تمام، بس قارئ الشاشة بيقول «group» أو ولا حاجة. ابدأ دايمًا بـ Tab و Space من غير ماوس.` },
        { lvl: 'متوسط', dir: "tab-group", t: R`[[<tab-group>]] بالـ slots`, what: R`[[<tab-group>]] جواه [[<button slot="tab">]] و [[<section slot="panel">]] بأي عدد (درس slots)، و [[slotchange]] بيربط كل تاب باللوحة بتاعته، والأسهم يمين وشمال بتتنقل بين التابات، والتاب النشط attribute [[selected]] (درس ٤)، و event [[tab-change]] بـ [[composed: true]].`, done: R`٣ تابات بيشتغلوا بالماوس والأسهم، وتزويد تاب رابع من Console بيشتغل من غير refresh، و [[selected="2"]] في الـ HTML بيفتح التالت، والـ CSS بتاع الصفحة مبيبوّظش شكل التابات، و listener على [[document]] بيستقبل [[tab-change]] بالـ index الصح.`, sol: R`## الشكل النهائي

~~~live 220 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>tab-group</title>
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; }
  /* CSS الصفحة بيحاول يبوّظ الزراير، والتابات لازم تفضل سليمة */
  button { background: hotpink; }
  section { padding: 0; }
</style>
</head>
<body>
<tab-group id="tg" selected="1">
  <button slot="tab">الوصف</button>
  <button slot="tab">المواصفات</button>
  <button slot="tab">التقييمات</button>
  <section slot="panel">مج قهوة سيراميك، بيشيل 350 مل.</section>
  <section slot="panel">الوزن 300 جرام، وينفع في المايكروويف.</section>
  <section slot="panel">★★★★☆ من 128 تقييم.</section>
</tab-group>
<p id="out">tab-change: —</p>
<script>
class TabGroup extends HTMLElement {
  static observedAttributes = ["selected"];
  #tabs = [];
  #panels = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>
        :host { display: block; border: 1px solid #d1d5db; border-radius: 10px; overflow: hidden; }
        [part="tablist"] { display: flex; gap: 4px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; }
        [part="panels"] { padding: 12px; }
        ::slotted([slot="tab"]) { background: none !important; border: 0 !important; border-bottom: 3px solid transparent !important; padding: 8px 14px !important; font: inherit; cursor: pointer; }
        ::slotted([slot="tab"][aria-selected="true"]) { border-bottom-color: #2563eb !important; color: #1d4ed8; font-weight: 700; }
        ::slotted([slot="panel"]) { padding: 0 !important; }
      </style>
      <div part="tablist" role="tablist"><slot name="tab"></slot></div>
      <div part="panels"><slot name="panel"></slot></div>$__bt;
    const [tabSlot, panelSlot] = this.shadowRoot.querySelectorAll("slot");
    const relink = () => {
      this.#tabs = tabSlot.assignedElements();
      this.#panels = panelSlot.assignedElements();
      this.#link();
      this.#show(this.selected, false);
    };
    tabSlot.addEventListener("slotchange", relink);
    panelSlot.addEventListener("slotchange", relink);
    tabSlot.addEventListener("click", (e) => {
      const i = this.#tabs.indexOf(e.target.closest('[slot="tab"]'));
      if (i >= 0) this.#select(i);
    });
    tabSlot.addEventListener("keydown", (e) => {
      const rtl = getComputedStyle(this).direction === "rtl";
      const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        this.#select(e.key === "Home" ? 0 : this.#tabs.length - 1, true);
      } else if (step) {
        e.preventDefault();
        const n = this.#tabs.length;
        this.#select((this.selected + step + n) % n, true);
      }
    });
  }
  get selected() {
    const i = Number(this.getAttribute("selected") ?? 0);
    return Number.isInteger(i) && i >= 0 && i < this.#tabs.length ? i : 0;
  }
  set selected(i) { this.setAttribute("selected", String(i)); }
  attributeChangedCallback() { this.#show(this.selected, false); }
  #link() {
    const id = this.id || "tg";
    this.#tabs.forEach((tab, i) => {
      tab.id ||= $__bt$__{id}-tab-$__{i}$__bt;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", $__bt$__{id}-panel-$__{i}$__bt);
    });
    this.#panels.forEach((panel, i) => {
      panel.id ||= $__bt$__{id}-panel-$__{i}$__bt;
      panel.setAttribute("role", "tabpanel");
      if (this.#tabs[i]) panel.setAttribute("aria-labelledby", this.#tabs[i].id);
    });
  }
  #select(i, focus = false) {
    const changed = i !== this.selected;
    this.selected = i;
    if (focus) this.#tabs[i]?.focus();
    if (changed) this.dispatchEvent(new CustomEvent("tab-change", { bubbles: true, composed: true, detail: { index: i, tab: this.#tabs[i] } }));
  }
  #show(i) {
    this.#tabs.forEach((tab, k) => {
      tab.setAttribute("aria-selected", String(k === i));
      tab.tabIndex = k === i ? 0 : -1;
    });
    this.#panels.forEach((panel, k) => (panel.hidden = k !== i));
  }
}
customElements.define("tab-group", TabGroup);
document.addEventListener("tab-change", (e) => {
  document.querySelector("#out").textContent = $__bttab-change: index $__{e.detail.index} ($__{e.detail.tab.textContent})$__bt;
});
</script>
</body>
</html>
~~~

## هتشوف إيه

صندوق فيه ٣ تابات، والتاني («المواصفات») مفتوح لأن [[selected="1"]]. التاب النشط تحته خط أزرق. الضغط أو الأسهم بيغيّروا اللوحة، والسطر تحت بيكتب الـ [[tab-change]] اللي وصل الـ document. والصفحة فيها [[button { background: hotpink }]] ومع ذلك التابات شفافة.

## الناتج المتقاس

Playwright في Chrome 158 (ونفسه جوه الصفحة الحية):

~~~text الناتج
start (selected="1"): selected=1 visible panel=1 focus=body | tab-change: —
click 3rd: selected=2 visible panel=2 focus=التقييمات | tab-change: index 2 (التقييمات)
ArrowLeft (RTL = next): selected=0 visible panel=0 focus=الوصف | tab-change: index 0 (الوصف)
ArrowRight: selected=2 visible panel=2 focus=التقييمات | tab-change: index 2 (التقييمات)
Home: selected=0 visible panel=0 focus=الوصف | tab-change: index 0 (الوصف)
added 4th + click: selected=3 visible panel=3 focus=الأسئلة | tab-change: index 3 (الأسئلة)
tab bg (page says hotpink): rgba(0, 0, 0, 0) | normal button: rgb(255, 105, 180) | aria: tab controls tg-panel-0
~~~

- أول ما الصفحة فتحت اللوحة التانية ظاهرة من غير أي ضغطة (ولو كتبت [[selected="2"]] بيفتح التالت، لأن العدّ من صفر).
- السهم الشمال في صفحة RTL بيروح للتاب اللي بعده، ومن الأخير بيلف للأول.
- تاب رابع اتضاف من JS اشتغل على طول من غير refresh.
- زرار عادي في الصفحة لونه hotpink، والتاب [[rgba(0, 0, 0, 0)]] (شفاف).

جرّب في Console:

~~~js
const tg = document.querySelector("tab-group");
tg.insertAdjacentHTML("beforeend", '<button slot="tab">الأسئلة</button><section slot="panel">مفيش أسئلة لسه.</section>');
tg.selected = 3;
~~~

## الكود حتة حتة

- **[[<slot name="tab">]] و [[<slot name="panel">]]:** أي عدد من الزراير والـ sections بيترتبوا في مكانهم. ومحتواهم فضل في الـ light DOM، فالـ SEO وقارئ الشاشة شايفينه.
- **[[relink]] على [[slotchange]] للاتنين:** كل ما عنصر يتضاف أو يتشال، بنقرا [[assignedElements()]] من جديد ونربط تاب رقم [[i]] باللوحة رقم [[i]]. ده اللي خلّى التاب الرابع يشتغل من غير ما نكتب كود له.
- **[[#link()]]:** بيحط [[role="tab"]] و [[aria-controls]] على كل زرار، و [[role="tabpanel"]] و [[aria-labelledby]] على كل لوحة. [[tab.id ||= ...]] بيدّي id بس لو مفيش.
- **[[get selected()]]:** بيقرا الـ attribute ويتأكد إنه رقم صحيح جوه عدد التابات، وإلا 0. فـ [[selected="9"]] أو [[selected="abc"]] بيفتحوا الأول بدل ما الصفحة تبان فاضية.
- **[[observedAttributes = ["selected"]]]:** [[tg.setAttribute("selected", "2")]] أو [[tg.selected = 2]] من بره بيغيّروا اللوحة.
- **roving tabindex في [[#show]]:** التاب النشط [[tabIndex = 0]] والباقي [[-1]]، فـ Tab بيدخل التابات مرة واحدة (على النشط)، والأسهم بتتنقل جواهم. ده شكل التابات في ARIA Authoring Practices.
- **[[getComputedStyle(this).direction === "rtl"]]:** في صفحة عربي «اللي بعده» ناحية الشمال، فالسهم الشمال +1.
- **[[#select]] بيبعت [[tab-change]] بس لو التاب اتغيّر**، بـ [[bubbles]] و [[composed]]، فالـ listener على [[document]] استقبله حتى لو [[tab-group]] جوه shadow DOM تاني.

## الغلطة اللي حصلت فعلًا

أول نسخة كان شكل التابات (الخط الأزرق والـ padding) مكتوب في CSS الصفحة، وده مش «الـ component محمي». ولما نقلته جوه الـ shadow بـ [[::slotted([slot="tab"])]] من غير [[!important]]، الزرار طلع [[rgb(255, 105, 180)]] (hotpink): العناصر المتعيّنة في slot لسه في الـ light DOM، و CSS الصفحة **بيكسب** على [[::slotted]] في الحالة العادية. الحل اللي اشتغل: [[!important]] جوه [[::slotted]] للخصايص اللي لازم تفضل ثابتة، لأن [[!important]] من جوه الـ shadow بيكسب على أي حاجة عادية من بره. والأجزاء اللي جوه الـ shadow نفسه (شريط التابات وإطار الصندوق) محمية من غير أي حاجة.

**الغلطة الشائعة:** تعمل [[querySelectorAll("button")]] مرة في [[connectedCallback]] بدل [[slotchange]]، فأي تاب بيتضاف بعدين مبيشتغلش.` },
        { lvl: 'متوسط', dir: "design-system", t: R`design system صغير`, what: R`٣ components ([[<ui-button>]] و [[<ui-card>]] و [[<ui-badge>]]) بيشاركوا [[CSSStyleSheet]] واحد بـ [[adoptedStyleSheets]] (درس shadow DOM)، والألوان كلها CSS custom properties، و [[::part]] للأجزاء اللي مسموح تتغير، وصفحة demo فيها الـ light و dark بتغيير variables على [[:root]] بس.`, done: R`تغيير [[--ui-primary]] في [[:root]] بيغيّر الـ ٣ components مع بعض، و [[p { color: red }]] في الصفحة مبيأثرش جواهم، و [[ui-button::part(label)]] بيكبّر الخط، والـ dark mode بيتقلب بزرار واحد من غير ما يلمس أي component، والـ stylesheet اتعمل مرة واحدة بس (ابحث في الكود: [[new CSSStyleSheet]] مرة واحدة).`, sol: R`## الشكل النهائي

~~~view 300 الصفحة شغالة (الملفين في ملف واحد عشان المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>design system صغير</title>
<style>
  :root { --ui-primary: #2563eb; --ui-surface: #ffffff; --ui-text: #111827; --ui-muted: #4b5563; }
  :root.dark { --ui-primary: #f59e0b; --ui-surface: #1f2937; --ui-text: #f9fafb; --ui-muted: #d1d5db; }
  body { margin: 16px; background: var(--ui-surface); color: var(--ui-text); font-family: system-ui, sans-serif; }
  :root.dark body { background: #111827; }
  p { color: red; }
  ui-button.big::part(label) { font-size: 20px; }
  ui-card { max-width: 340px; margin-block: 12px; }
</style>
<script type="module">
// ui.js: design system صغير: ٣ components بيشاركوا stylesheet واحد بس
const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt
  :host {
    --_primary: var(--ui-primary, #2563eb);
    --_surface: var(--ui-surface, #ffffff);
    --_text: var(--ui-text, #111827);
    --_muted: var(--ui-muted, #6b7280);
    --_radius: var(--ui-radius, 10px);
    font-family: var(--ui-font, system-ui, sans-serif);
    color: var(--_text);
  }
  :host([hidden]) { display: none !important; }

  /* ui-button */
  :host(ui-button) { display: inline-block; }
  :host(ui-button) button { all: unset; box-sizing: border-box; cursor: pointer; padding: 8px 16px; border-radius: var(--_radius); background: var(--_primary); color: #fff; }
  :host(ui-button) button:focus-visible { outline: 3px solid var(--_text); outline-offset: 2px; }
  :host(ui-button[variant="ghost"]) button { background: transparent; color: var(--_primary); box-shadow: inset 0 0 0 2px var(--_primary); }

  /* ui-card */
  :host(ui-card) { display: block; background: var(--_surface); border-radius: var(--_radius); padding: 16px; box-shadow: 0 1px 4px rgb(0 0 0 / .15); }
  :host(ui-card) ::slotted([slot="title"]) { margin: 0 0 6px; }
  :host(ui-card) .body { color: var(--_muted); }
  :host(ui-card) footer { margin-top: 12px; display: flex; gap: 8px; }

  /* ui-badge */
  :host(ui-badge) { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 12px; background: color-mix(in srgb, var(--_primary) 15%, transparent); color: var(--_primary); }
$__bt);

const templates = {
  "ui-button": $__bt<button part="button" type="button"><span part="label"><slot></slot></span></button>$__bt,
  "ui-card": $__bt<slot name="title"></slot><div class="body" part="body"><slot></slot></div><footer part="footer"><slot name="footer"></slot></footer>$__bt,
  "ui-badge": $__bt<span part="text"><slot></slot></span>$__bt,
};

for (const [name, html] of Object.entries(templates)) {
  customElements.define(name, class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [sheet];
      root.innerHTML = html;
    }
  });
}
</script>
</head>
<body>
<ui-button id="theme" variant="ghost">بدّل الثيم</ui-button>
<ui-card>
  <h3 slot="title">باقة Pro <ui-badge>جديد</ui-badge></h3>
  <span>كل المميزات، و <b>دعم ٢٤ ساعة</b>.</span>
  <ui-button slot="footer" class="big">اشترك</ui-button>
  <ui-button slot="footer" variant="ghost">التفاصيل</ui-button>
</ui-card>
<p>فقرة الصفحة حمرا، واللي جوه الـ components لأ.</p>
<script type="module">
  document.querySelector("#theme").addEventListener("click", () => document.documentElement.classList.toggle("dark"));
</script>
</body>
</html>
~~~

## هتشوف إيه

زرار «بدّل الثيم» بإطار، وكارت «باقة Pro» جنب عنوانه badge «جديد»، وتحت زرار «اشترك» بخط كبير و «التفاصيل» بإطار. الضغط على «بدّل الثيم» بيقلب الصفحة والـ ٣ components للبرتقالي على غامق، والفقرة الحمرا بتاعة الصفحة فضلت حمرا من غير ما تدخل جوه.

~~~text شجرة الملفات
design-system/
├── ui.js        ← الـ ٣ components والـ stylesheet المشترك
└── index.html   ← صفحة الـ demo
~~~

~~~js ui.js
// ui.js: design system صغير: ٣ components بيشاركوا stylesheet واحد بس
const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt
  :host {
    --_primary: var(--ui-primary, #2563eb);
    --_surface: var(--ui-surface, #ffffff);
    --_text: var(--ui-text, #111827);
    --_muted: var(--ui-muted, #6b7280);
    --_radius: var(--ui-radius, 10px);
    font-family: var(--ui-font, system-ui, sans-serif);
    color: var(--_text);
  }
  :host([hidden]) { display: none !important; }

  /* ui-button */
  :host(ui-button) { display: inline-block; }
  :host(ui-button) button { all: unset; box-sizing: border-box; cursor: pointer; padding: 8px 16px; border-radius: var(--_radius); background: var(--_primary); color: #fff; }
  :host(ui-button) button:focus-visible { outline: 3px solid var(--_text); outline-offset: 2px; }
  :host(ui-button[variant="ghost"]) button { background: transparent; color: var(--_primary); box-shadow: inset 0 0 0 2px var(--_primary); }

  /* ui-card */
  :host(ui-card) { display: block; background: var(--_surface); border-radius: var(--_radius); padding: 16px; box-shadow: 0 1px 4px rgb(0 0 0 / .15); }
  :host(ui-card) ::slotted([slot="title"]) { margin: 0 0 6px; }
  :host(ui-card) .body { color: var(--_muted); }
  :host(ui-card) footer { margin-top: 12px; display: flex; gap: 8px; }

  /* ui-badge */
  :host(ui-badge) { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 12px; background: color-mix(in srgb, var(--_primary) 15%, transparent); color: var(--_primary); }
$__bt);

const templates = {
  "ui-button": $__bt<button part="button" type="button"><span part="label"><slot></slot></span></button>$__bt,
  "ui-card": $__bt<slot name="title"></slot><div class="body" part="body"><slot></slot></div><footer part="footer"><slot name="footer"></slot></footer>$__bt,
  "ui-badge": $__bt<span part="text"><slot></slot></span>$__bt,
};

for (const [name, html] of Object.entries(templates)) {
  customElements.define(name, class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [sheet];
      root.innerHTML = html;
    }
  });
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>design system صغير</title>
<style>
  :root { --ui-primary: #2563eb; --ui-surface: #ffffff; --ui-text: #111827; --ui-muted: #4b5563; }
  :root.dark { --ui-primary: #f59e0b; --ui-surface: #1f2937; --ui-text: #f9fafb; --ui-muted: #d1d5db; }
  body { margin: 16px; background: var(--ui-surface); color: var(--ui-text); font-family: system-ui, sans-serif; }
  :root.dark body { background: #111827; }
  p { color: red; }
  ui-button.big::part(label) { font-size: 20px; }
  ui-card { max-width: 340px; margin-block: 12px; }
</style>
<script src="ui.js" defer></script>
</head>
<body>
<ui-button id="theme" variant="ghost">بدّل الثيم</ui-button>
<ui-card>
  <h3 slot="title">باقة Pro <ui-badge>جديد</ui-badge></h3>
  <span>كل المميزات، و <b>دعم ٢٤ ساعة</b>.</span>
  <ui-button slot="footer" class="big">اشترك</ui-button>
  <ui-button slot="footer" variant="ghost">التفاصيل</ui-button>
</ui-card>
<p>فقرة الصفحة حمرا، واللي جوه الـ components لأ.</p>
<script type="module">
  document.querySelector("#theme").addEventListener("click", () => document.documentElement.classList.toggle("dark"));
</script>
</body>
</html>
~~~

## الناتج المتقاس

Playwright في Chrome 158 قرا الألوان المحسوبة من جوه الـ shadow قبل وبعد الضغط:

~~~text الناتج
light: button bg=rgb(37, 99, 235) label size=20px | card body color=rgb(75, 85, 99) | badge color=rgb(37, 99, 235)
dark:  button bg=rgb(245, 158, 11) label size=20px | card body color=rgb(209, 213, 219) | badge color=rgb(245, 158, 11)
same sheet object shared: true
~~~

و [[grep -c "new CSSStyleSheet" ui.js]] بيطلع [[1]].

## الكود حتة حتة

- **[[const sheet = new CSSStyleSheet()]] مرة واحدة برة أي class:** كل instance من الـ ٣ بيعمل [[adoptedStyleSheets = [sheet]]] لنفس الـ object (السطر الأخير في الناتج [[true]]). المتصفح بيعمل parse للـ CSS مرة واحدة، و ١٠٠ زرار مبيعملوش ١٠٠ نسخة.
- **[[:host(ui-button) button]]:** عشان الـ sheet واحد للـ ٣، كل component ليه قواعده جوه [[:host(اسمه)]]، فـ [[button]] بتاع الزرار ميأثرش على الكارت.
- **[[--_primary: var(--ui-primary, #2563eb)]]:** الـ variable العام [[--ui-primary]] هو الـ API اللي اللي بيستخدمك يغيّره، والخاص [[--_primary]] (بشَرطة تحتية) هو اللي الـ components بتستخدمه جوه، وفيه الـ default في مكان واحد.
- **[[:root.dark { --ui-primary: ... }]]:** الـ dark mode كله تغيير variables على [[:root]]. الزرار بيعمل [[classList.toggle("dark")]] بس، ومفيش component اتلمس.
- **[[part="label"]] و [[ui-button.big::part(label)]]:** الجزء الوحيد المسموح يتغيّر من بره بالاسم، فـ «اشترك» خطه 20px.
- **[[color-mix(in srgb, var(--_primary) 15%, transparent)]]:** خلفية الـ badge لون أفتح من الأساسي من غير variable زيادة، فبيتغيّر لوحده مع الثيم.
- **[[button { all: unset; ... }]]:** بيمسح ستايل الزرار الافتراضي جوه، وبعدين [[:focus-visible]] بيرجّع إطار الكيبورد اللي [[all: unset]] شاله.
- **الـ templates في object و loop واحد:** الـ ٣ components نفس الشكل (shadow + sheet + HTML)، فبدل ٣ classes متكررة.

- **[[<script src="ui.js" defer>]] مش [[type="module"]]:** [[ui.js]] مفيهوش [[import]] ولا [[export]]، فـ script عادي بـ [[defer]] (بيستنى الصفحة تتقري) كفاية، والصفحة بتشتغل لو فتحتها كملف بدبل كليك. الـ module من [[file://]] Chrome بيرفضه (CORS)، فكانت الـ components هتفضل مش متعرّفة.

## الغلطات اللي ممكن تقع فيها

- **[[new CSSStyleSheet()]] جوه الـ constructor:** كل عنصر بيعمل sheet لوحده. نفس الشكل، بس مع ٢٠٠ زرار الذاكرة والوقت بيزيدوا على الفاضي. أول نسخة كتبتها كان فيها sheet عام وكمان sheet لكل نوع component، فالـ [[grep]] طلّع 2؛ دمجتهم في sheet واحد بـ [[:host(name)]].
- **تكتب الألوان ثابتة جوه الـ component:** ساعتها الـ dark mode محتاج تعدّل كل component. الـ variables هي الـ API.` },
        { lvl: 'كبير', dir: "image-uploader", t: R`[[<image-uploader>]] تستخدمه في أي framework`, what: R`component بيجمع الوحدة دي مع APIs المتصفح: input و drag and drop ومعاينة وفحص النوع بأول bytes والحجم، ورفع بـ progress وإلغاء. attributes [[accept]] و [[max-size]] و [[endpoint]] و [[multiple]]، و events [[upload-start]] و [[upload-done]] و [[upload-error]] بـ [[composed: true]]، و slots للنص والأيقونة، و [[revokeObjectURL]] و [[abort()]] لكل حاجة في [[disconnectedCallback]]. واستخدمه في صفحة HTML عادية، و React 19، و Vue.`, done: R`ملف أكبر من [[max-size]] أو نوعه غلط بيطلع [[upload-error]] فيه السبب ومبيتبعتش، والرفع على Slow 4G بيبين progress والإلغاء بيشتغل، وشيل العنصر من الصفحة في نص الرفع بيلغي الـ request (Network يأكد)، ونفس الـ component شغال في التلات أماكن والـ events بتوصل لـ state بتاع React و Vue، و تستات بـ [[node:test]] و jsdom بتتأكد من الـ attributes والـ events من غير متصفح.`, ext: R`خليه form-associated بـ [[attachInternals()]] عشان يتبعت مع الفورم، وزوّد crop للصورة، وانشره على npm بـ README وصفحة demo.`, sol: R`## الشكل النهائي

~~~view 330 الصفحة العادية (الملفات في ملف واحد عشان المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>image-uploader في HTML عادي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  image-uploader { --uploader-accent: #0b6e4f; }
  #log { background: #f3f4f6; padding: 8px; border-radius: 8px; font-size: 13px; white-space: pre-wrap; }
</style>
<script type="module">
// image-check.js: منطق الفحص من غير DOM، عشان يتختبر بـ node --test
const SIGNATURES = [
  ["image/png", [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  ["image/jpeg", [0xff, 0xd8, 0xff]],
  ["image/gif", [0x47, 0x49, 0x46, 0x38]],
];

// النوع الحقيقي من أول bytes، مش من الامتداد ولا file.type
function sniffType(bytes) {
  for (const [type, sig] of SIGNATURES) {
    if (sig.every((b, i) => bytes[i] === b)) return type;
  }
  const ascii = (from, to) => String.fromCharCode(...bytes.slice(from, to));
  if (bytes.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  return null;
}

// "2MB" أو "500KB" أو "1048576" → عدد bytes. أي حاجة تانية → null
function parseSize(text) {
  const m = /^\s*(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)?\s*$/i.exec(String(text ?? ""));
  if (!m) return null;
  const mult = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 }[(m[2] ?? "B").toUpperCase()];
  return Math.round(Number(m[1]) * mult);
}

// accept زي input: "image/png,image/jpeg" أو "image/*"
function accepts(accept, type) {
  if (!accept) return true;
  return accept.split(",").map((s) => s.trim().toLowerCase()).some((a) =>
    a === type || (a.endsWith("/*") && type?.startsWith(a.slice(0, -1))));
}

function formatBytes(n) {
  if (n < 1024) return $__bt$__{n} B$__bt;
  if (n < 1024 ** 2) return $__bt$__{(n / 1024).toFixed(1)} KB$__bt;
  return $__bt$__{(n / 1024 ** 2).toFixed(1)} MB$__bt;
}

// القرار كله في مكان واحد: { ok, type } أو { ok: false, reason, message }
function checkFile({ name, size, bytes }, { accept = "image/*", maxSize = null } = {}) {
  if (maxSize !== null && size > maxSize) {
    return { ok: false, reason: "too-big", message: $__bt$__{name}: $__{formatBytes(size)} أكبر من الحد $__{formatBytes(maxSize)}$__bt };
  }
  const type = sniffType(bytes);
  if (!type) return { ok: false, reason: "not-image", message: $__bt$__{name}: مش صورة (أول bytes مش PNG ولا JPEG ولا GIF ولا WebP)$__bt };
  if (!accepts(accept, type)) return { ok: false, reason: "type-not-allowed", message: $__bt$__{name}: النوع $__{type} مش مسموح ($__{accept})$__bt };
  return { ok: true, type };
}

// image-uploader.js: <image-uploader> يشتغل في HTML عادي و React و Vue

const css = $__bt
  :host { display: block; font: 15px/1.6 system-ui, sans-serif; }
  .drop { display: grid; place-items: center; gap: 4px; padding: 24px; border: 2px dashed var(--uploader-border, #9ca3af); border-radius: 12px; text-align: center; cursor: pointer; }
  .drop.over { border-color: var(--uploader-accent, #2563eb); background: color-mix(in srgb, var(--uploader-accent, #2563eb) 8%, transparent); }
  .drop:focus-visible { outline: 3px solid var(--uploader-accent, #2563eb); }
  ul { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 8px; }
  li { display: grid; grid-template-columns: 56px 1fr auto; gap: 10px; align-items: center; }
  img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; background: #eee; }
  progress { width: 100%; }
  .err { color: #b91c1c; }
  .ok { color: #15803d; }
  input { display: none; }
$__bt;

class ImageUploader extends HTMLElement {
  static observedAttributes = ["accept", "multiple"];
  #input;
  #list;
  #jobs = new Set();   // { xhr, url }: كل رفع، عشان نلغي اللي شغال ونفضّي الـ URLs لما العنصر يتشال

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>$__{css}</style>
      <div class="drop" part="drop" tabindex="0" role="button">
        <slot name="icon"><span aria-hidden="true">🖼️</span></slot>
        <slot name="label">اسحب صورة هنا أو دوس للاختيار</slot>
      </div>
      <input type="file">
      <ul part="list"></ul>$__bt;
    this.#input = this.shadowRoot.querySelector("input");
    this.#list = this.shadowRoot.querySelector("ul");
    const drop = this.shadowRoot.querySelector(".drop");
    drop.addEventListener("click", () => this.#input.click());
    drop.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.#input.click(); }
    });
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("over"));
    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      drop.classList.remove("over");
      this.addFiles(e.dataTransfer.files);
    });
    this.#input.addEventListener("change", () => {
      this.addFiles(this.#input.files);
      this.#input.value = "";
    });
  }

  attributeChangedCallback() {
    this.#input.accept = this.getAttribute("accept") ?? "image/*";
    this.#input.multiple = this.hasAttribute("multiple");
  }

  connectedCallback() { this.attributeChangedCallback(); }

  // اتشال من الصفحة: الغي أي رفع لسه شغال وفضّي الـ object URLs
  disconnectedCallback() {
    for (const { xhr, url } of this.#jobs) {
      if (xhr.readyState !== XMLHttpRequest.DONE) xhr.abort();
      URL.revokeObjectURL(url);
    }
    this.#jobs.clear();
  }

  // كل getter ليه setter بيكتب في الـ attribute: React 19 بيحط أي prop ليه property بنفس الاسم كـ property
  get maxSize() { return parseSize(this.getAttribute("max-size")); }
  set maxSize(v) { this.setAttribute("max-size", String(v)); }
  get endpoint() { return this.getAttribute("endpoint"); }
  set endpoint(v) { this.setAttribute("endpoint", v); }

  // public: ينفع تديله ملفات من الكود (والتستات بتستخدمه)
  async addFiles(fileList) {
    const files = [...fileList];
    for (const file of this.hasAttribute("multiple") ? files : files.slice(0, 1)) await this.#handle(file);
  }

  async #handle(file) {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const result = checkFile({ name: file.name, size: file.size, bytes: head }, {
      accept: this.getAttribute("accept") ?? "image/*",
      maxSize: this.maxSize,
    });
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.alt = "";
    const info = document.createElement("div");
    const name = document.createElement("div");
    name.textContent = $__bt$__{file.name} ($__{formatBytes(file.size)})$__bt;
    info.append(name);
    li.append(img, info);
    this.#list.append(li);

    if (!result.ok) {
      const msg = document.createElement("div");
      msg.className = "err";
      msg.textContent = result.message;
      info.append(msg);
      li.append(document.createElement("span"));
      this.#emit("upload-error", { file, reason: result.reason, message: result.message });
      return;
    }
    if (!this.endpoint) {
      this.#emit("upload-error", { file, reason: "no-endpoint", message: "مفيش endpoint" });
      return;
    }

    const url = URL.createObjectURL(file);
    img.src = url;
    const bar = document.createElement("progress");
    bar.max = 100;
    bar.value = 0;
    info.append(bar);
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "إلغاء";
    li.append(cancel);

    const xhr = new XMLHttpRequest();
    this.#jobs.add({ xhr, url });
    cancel.addEventListener("click", () => xhr.abort());
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) bar.value = Math.round((e.loaded / e.total) * 100);
    });
    const finish = (cls, text) => {
      bar.replaceWith(Object.assign(document.createElement("div"), { className: cls, textContent: text }));
      cancel.remove();
    };
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        finish("ok", "اترفعت ✓");
        this.#emit("upload-done", { file, response: JSON.parse(xhr.responseText) });
      } else {
        finish("err", $__btالسيرفر رجّع $__{xhr.status}$__bt);
        this.#emit("upload-error", { file, reason: "http", status: xhr.status, message: $__btHTTP $__{xhr.status}$__bt });
      }
    });
    xhr.addEventListener("error", () => {
      finish("err", "الشبكة وقعت");
      this.#emit("upload-error", { file, reason: "network", message: "network error" });
    });
    xhr.addEventListener("abort", () => {
      if (!this.isConnected) return;
      finish("err", "اتلغى");
      this.#emit("upload-error", { file, reason: "aborted", message: "اتلغى" });
    });
    xhr.open("POST", this.endpoint);
    xhr.setRequestHeader("content-type", result.type);
    xhr.setRequestHeader("x-file-name", encodeURIComponent(file.name));
    xhr.send(file);
    this.#emit("upload-start", { file, type: result.type });
  }

  #emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }
}

if (!customElements.get("image-uploader")) customElements.define("image-uploader", ImageUploader);
</script>
</head>
<body>
<h1>صورة المنتج</h1>
<image-uploader accept="image/png,image/jpeg,image/webp" max-size="2MB" endpoint="/upload" multiple>
  <span slot="label">اسحب صور المنتج هنا (PNG أو JPEG أو WebP، لحد 2MB)</span>
</image-uploader>
<pre id="log"></pre>
<script type="module">
  const out = document.querySelector("#log");
  for (const type of ["upload-start", "upload-done", "upload-error"]) {
    document.addEventListener(type, (e) => {
      const { file, reason, response } = e.detail;
      out.textContent += $__bt$__{type}: $__{file.name}$__{reason ? " | " + reason : ""}$__{response ? " | server got " + response.bytes + " bytes" : ""}\n$__bt;
    });
  }
</script>
</body>
</html>
~~~

> في المعاينة اختار صورة: الفحص والمعاينة والرسالة بيشتغلوا، بس الرفع نفسه هيقول «الشبكة وقعت» لأن مفيش سيرفر ورا الصفحة دي (اتجرّب: [[upload-error: photo.png | network]]). شغّل [[node server.mjs]] عشان الرفع الحقيقي.

## هتشوف إيه

مربع متقطع «اسحب صور المنتج هنا». اسحب صورة أو دوس واختار: كل ملف بيظهر في لستة بصورته الصغيرة وحجمه، والصالح بيبان تحته شريط progress وزرار «إلغاء» لحد ما يتكتب «اترفعت ✓». الكبير أو اللي مش صورة بيظهر بالأحمر بالسبب ومبيتبعتش. وتحت كل الـ events اللي وصلت الصفحة. ونفس العنصر شغال في صفحة React وصفحة Vue والـ events بتغيّر الـ state بتاعهم.

> **افتحه من السيرفر مش بدبل كليك:** بعد [[node server.mjs]] افتح [[http://localhost:8080/]]. لو فتحت [[index.html]] كملف ([[start index.html]] في خطوة ٤ تحت)، Chrome بيرفض يحمّل الـ module: جرّبتها وطلع [[Access to script at 'file:///.../image-uploader.js' from origin 'null' has been blocked by CORS policy]]، والرفع كمان محتاج [[/upload]] من السيرفر.

## الهيكل وترتيب البناء

~~~text شجرة الملفات
image-uploader/
├── package.json
├── image-check.js          ← ١. منطق الفحص من غير DOM (النوع والحجم والـ accept)
├── image-uploader.js       ← ٢. الـ component
├── server.mjs              ← ٣. بيقدّم الصفحات ويستقبل POST /upload
├── index.html              ← ٤. HTML عادي
├── react/App.jsx           ← ٥. React 19 (بيتعمله bundle بـ esbuild)
├── react/index.html
├── vue/index.html          ← ٦. Vue 3 من غير build
├── test/image-check.test.mjs   ← تستات المنطق
├── test/uploader.test.mjs      ← تستات الـ component في jsdom
└── e2e/                        ← فحص في Chrome بـ Playwright
    ├── make-images.mjs
    └── e2e.mjs
~~~

اتبنى بالترتيب ده: المنطق وتستاته الأول (أسهل حاجة تتختبر)، وبعدين الـ component، وبعدين السيرفر والصفحة العادية، وفي الآخر React و Vue.

~~~json package.json
{ "type": "module", "scripts": { "start": "node server.mjs", "test": "node --test", "build:react": "esbuild react/App.jsx --bundle --format=esm --jsx=automatic --outfile=react/app.bundle.js --define:process.env.NODE_ENV=\"production\" --minify" } }
~~~

~~~bash
npm i -D jsdom esbuild playwright-core && npm i react@19 react-dom@19 vue
npm test                      # التستات في Node
npm run build:react
node server.mjs               # http://localhost:8080/  و /react/  و /vue/
~~~

## ١. [[image-check.js]]

~~~js image-check.js
// image-check.js: منطق الفحص من غير DOM، عشان يتختبر بـ node --test
const SIGNATURES = [
  ["image/png", [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  ["image/jpeg", [0xff, 0xd8, 0xff]],
  ["image/gif", [0x47, 0x49, 0x46, 0x38]],
];

// النوع الحقيقي من أول bytes، مش من الامتداد ولا file.type
export function sniffType(bytes) {
  for (const [type, sig] of SIGNATURES) {
    if (sig.every((b, i) => bytes[i] === b)) return type;
  }
  const ascii = (from, to) => String.fromCharCode(...bytes.slice(from, to));
  if (bytes.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  return null;
}

// "2MB" أو "500KB" أو "1048576" → عدد bytes. أي حاجة تانية → null
export function parseSize(text) {
  const m = /^\s*(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)?\s*$/i.exec(String(text ?? ""));
  if (!m) return null;
  const mult = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 }[(m[2] ?? "B").toUpperCase()];
  return Math.round(Number(m[1]) * mult);
}

// accept زي input: "image/png,image/jpeg" أو "image/*"
export function accepts(accept, type) {
  if (!accept) return true;
  return accept.split(",").map((s) => s.trim().toLowerCase()).some((a) =>
    a === type || (a.endsWith("/*") && type?.startsWith(a.slice(0, -1))));
}

export function formatBytes(n) {
  if (n < 1024) return $__bt$__{n} B$__bt;
  if (n < 1024 ** 2) return $__bt$__{(n / 1024).toFixed(1)} KB$__bt;
  return $__bt$__{(n / 1024 ** 2).toFixed(1)} MB$__bt;
}

// القرار كله في مكان واحد: { ok, type } أو { ok: false, reason, message }
export function checkFile({ name, size, bytes }, { accept = "image/*", maxSize = null } = {}) {
  if (maxSize !== null && size > maxSize) {
    return { ok: false, reason: "too-big", message: $__bt$__{name}: $__{formatBytes(size)} أكبر من الحد $__{formatBytes(maxSize)}$__bt };
  }
  const type = sniffType(bytes);
  if (!type) return { ok: false, reason: "not-image", message: $__bt$__{name}: مش صورة (أول bytes مش PNG ولا JPEG ولا GIF ولا WebP)$__bt };
  if (!accepts(accept, type)) return { ok: false, reason: "type-not-allowed", message: $__bt$__{name}: النوع $__{type} مش مسموح ($__{accept})$__bt };
  return { ok: true, type };
}
~~~

- **[[sniffType]]:** النوع من أول bytes (الـ magic numbers): PNG بيبدأ بـ [[89 50 4E 47 0D 0A 1A 0A]]، و JPEG بـ [[FF D8 FF]]، و WebP بـ [[RIFF....WEBP]]. [[file.type]] جاي من الامتداد بس، فملف نص اسمه [[fake.png]] كان هيعدّي.
- **[[checkFile]]:** القرار كله في دالة واحدة بترجّع [[{ ok, reason, message }]]. الحجم الأول (مش محتاج نقرا حاجة)، وبعدين النوع الحقيقي، وبعدين [[accept]]. و [[reason]] كود ثابت ([[too-big]] و [[not-image]] و [[type-not-allowed]]) عشان الكود اللي بيسمع يقرر من غير ما يقرا الرسالة العربي.

## ٢. [[image-uploader.js]]

~~~js image-uploader.js
// image-uploader.js: <image-uploader> يشتغل في HTML عادي و React و Vue
import { checkFile, parseSize, formatBytes } from "./image-check.js";

const css = $__bt
  :host { display: block; font: 15px/1.6 system-ui, sans-serif; }
  .drop { display: grid; place-items: center; gap: 4px; padding: 24px; border: 2px dashed var(--uploader-border, #9ca3af); border-radius: 12px; text-align: center; cursor: pointer; }
  .drop.over { border-color: var(--uploader-accent, #2563eb); background: color-mix(in srgb, var(--uploader-accent, #2563eb) 8%, transparent); }
  .drop:focus-visible { outline: 3px solid var(--uploader-accent, #2563eb); }
  ul { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 8px; }
  li { display: grid; grid-template-columns: 56px 1fr auto; gap: 10px; align-items: center; }
  img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; background: #eee; }
  progress { width: 100%; }
  .err { color: #b91c1c; }
  .ok { color: #15803d; }
  input { display: none; }
$__bt;

export class ImageUploader extends HTMLElement {
  static observedAttributes = ["accept", "multiple"];
  #input;
  #list;
  #jobs = new Set();   // { xhr, url }: كل رفع، عشان نلغي اللي شغال ونفضّي الـ URLs لما العنصر يتشال

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>$__{css}</style>
      <div class="drop" part="drop" tabindex="0" role="button">
        <slot name="icon"><span aria-hidden="true">🖼️</span></slot>
        <slot name="label">اسحب صورة هنا أو دوس للاختيار</slot>
      </div>
      <input type="file">
      <ul part="list"></ul>$__bt;
    this.#input = this.shadowRoot.querySelector("input");
    this.#list = this.shadowRoot.querySelector("ul");
    const drop = this.shadowRoot.querySelector(".drop");
    drop.addEventListener("click", () => this.#input.click());
    drop.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.#input.click(); }
    });
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("over"));
    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      drop.classList.remove("over");
      this.addFiles(e.dataTransfer.files);
    });
    this.#input.addEventListener("change", () => {
      this.addFiles(this.#input.files);
      this.#input.value = "";
    });
  }

  attributeChangedCallback() {
    this.#input.accept = this.getAttribute("accept") ?? "image/*";
    this.#input.multiple = this.hasAttribute("multiple");
  }

  connectedCallback() { this.attributeChangedCallback(); }

  // اتشال من الصفحة: الغي أي رفع لسه شغال وفضّي الـ object URLs
  disconnectedCallback() {
    for (const { xhr, url } of this.#jobs) {
      if (xhr.readyState !== XMLHttpRequest.DONE) xhr.abort();
      URL.revokeObjectURL(url);
    }
    this.#jobs.clear();
  }

  // كل getter ليه setter بيكتب في الـ attribute: React 19 بيحط أي prop ليه property بنفس الاسم كـ property
  get maxSize() { return parseSize(this.getAttribute("max-size")); }
  set maxSize(v) { this.setAttribute("max-size", String(v)); }
  get endpoint() { return this.getAttribute("endpoint"); }
  set endpoint(v) { this.setAttribute("endpoint", v); }

  // public: ينفع تديله ملفات من الكود (والتستات بتستخدمه)
  async addFiles(fileList) {
    const files = [...fileList];
    for (const file of this.hasAttribute("multiple") ? files : files.slice(0, 1)) await this.#handle(file);
  }

  async #handle(file) {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const result = checkFile({ name: file.name, size: file.size, bytes: head }, {
      accept: this.getAttribute("accept") ?? "image/*",
      maxSize: this.maxSize,
    });
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.alt = "";
    const info = document.createElement("div");
    const name = document.createElement("div");
    name.textContent = $__bt$__{file.name} ($__{formatBytes(file.size)})$__bt;
    info.append(name);
    li.append(img, info);
    this.#list.append(li);

    if (!result.ok) {
      const msg = document.createElement("div");
      msg.className = "err";
      msg.textContent = result.message;
      info.append(msg);
      li.append(document.createElement("span"));
      this.#emit("upload-error", { file, reason: result.reason, message: result.message });
      return;
    }
    if (!this.endpoint) {
      this.#emit("upload-error", { file, reason: "no-endpoint", message: "مفيش endpoint" });
      return;
    }

    const url = URL.createObjectURL(file);
    img.src = url;
    const bar = document.createElement("progress");
    bar.max = 100;
    bar.value = 0;
    info.append(bar);
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "إلغاء";
    li.append(cancel);

    const xhr = new XMLHttpRequest();
    this.#jobs.add({ xhr, url });
    cancel.addEventListener("click", () => xhr.abort());
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) bar.value = Math.round((e.loaded / e.total) * 100);
    });
    const finish = (cls, text) => {
      bar.replaceWith(Object.assign(document.createElement("div"), { className: cls, textContent: text }));
      cancel.remove();
    };
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        finish("ok", "اترفعت ✓");
        this.#emit("upload-done", { file, response: JSON.parse(xhr.responseText) });
      } else {
        finish("err", $__btالسيرفر رجّع $__{xhr.status}$__bt);
        this.#emit("upload-error", { file, reason: "http", status: xhr.status, message: $__btHTTP $__{xhr.status}$__bt });
      }
    });
    xhr.addEventListener("error", () => {
      finish("err", "الشبكة وقعت");
      this.#emit("upload-error", { file, reason: "network", message: "network error" });
    });
    xhr.addEventListener("abort", () => {
      if (!this.isConnected) return;
      finish("err", "اتلغى");
      this.#emit("upload-error", { file, reason: "aborted", message: "اتلغى" });
    });
    xhr.open("POST", this.endpoint);
    xhr.setRequestHeader("content-type", result.type);
    xhr.setRequestHeader("x-file-name", encodeURIComponent(file.name));
    xhr.send(file);
    this.#emit("upload-start", { file, type: result.type });
  }

  #emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }
}

if (!customElements.get("image-uploader")) customElements.define("image-uploader", ImageUploader);
~~~

- **[[<slot name="icon">]] و [[<slot name="label">]] بـ fallback:** النص والأيقونة الافتراضيين، واللي بيستخدمه يغيّرهم بـ [[<span slot="label">]].
- **[[addFiles]] public:** الـ input والسحب الاتنين بيوصلوا هنا، والتستات كمان بتناديه مباشرة بملفات من غير ما تحتاج تسحب.
- **[[file.slice(0, 16).arrayBuffer()]]:** بنقرا ١٦ byte بس للفحص، مش الملف كله.
- **[[XMLHttpRequest]] مش [[fetch]]:** [[fetch]] لحد دلوقتي مبيدّيش progress للرفع، و [[xhr.upload]] بيبعت [[progress]]. و [[xhr.abort()]] للإلغاء.
- **[[textContent]] لاسم الملف:** الاسم جاي من جهاز اليوزر ([[<img src=x onerror=alert(1)>.png]] اسم ملف صالح)، فمبيتحطش كـ HTML.
- **[[#jobs]] و [[disconnectedCallback]]:** كل رفع متسجّل. لما العنصر يتشال، اللي لسه شغال بيتلغي وكل [[blob:]] URL بيتعمله [[revokeObjectURL]]. والـ [[abort]] listener بيرجع من غير event لو [[!this.isConnected]]، عشان محدش يستقبل «اتلغى» من عنصر مش موجود.
- **[[bubbles: true, composed: true]]:** الـ events بتوصل لـ [[document]] حتى لو العنصر جوه shadow DOM تاني.
- **setters لـ [[endpoint]] و [[maxSize]]:** شوف الغلطة الأولى تحت.

## ٣. [[server.mjs]]

~~~js server.mjs
// server.mjs: بيقدّم الصفحات ويستقبل الرفع على POST /upload. node server.mjs
import http from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT ?? 8080;
const MAX = 5 * 1024 * 1024;
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css" };
const vendor = { "/vendor/vue.js": createRequire(import.meta.url).resolve("vue/dist/vue.esm-browser.prod.js") };
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

function upload(req, res) {
  const name = decodeURIComponent(req.headers["x-file-name"] ?? "file");
  let bytes = 0;
  let done = false;
  log("upload start", name, req.headers["content-length"], "bytes");
  req.on("data", (chunk) => {
    bytes += chunk.length;
    if (bytes > MAX && !res.headersSent) {
      res.writeHead(413, { "content-type": "application/json" }).end(JSON.stringify({ error: "too big" }));
      req.destroy();
    }
  });
  req.on("end", () => {
    done = true;
    log("upload done", name, bytes, "bytes");
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ name, bytes, type: req.headers["content-type"] }));
  });
  req.on("close", () => { if (!done) log("upload ABORTED", name, "after", bytes, "bytes"); });
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "POST" && url.pathname === "/upload") return upload(req, res);
  const file = vendor[url.pathname] ?? path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : "");
  if (!file.startsWith(root) && !vendor[url.pathname]) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(PORT, () => log($__bthttp://localhost:$__{PORT}$__bt));
~~~

- **[[req.on("close")]] من غير [[end]]:** ده اللي بيكتب [[upload ABORTED]] في اللوج، والدليل إن الإلغاء وشيل العنصر قطعوا الطلب فعلًا.
- **[[MAX]] و 413:** السيرفر بيفحص الحجم تاني. فحص المتصفح عشان اليوزر يعرف بسرعة، وفحص السيرفر عشان أي حد يقدر يبعت طلب من غير الصفحة.
- **[[file.startsWith(root)]]:** يمنع [[/..%2f..%2fsecret]]؛ اتجرّب ورجّع 403.
- **[[/vendor/vue.js]]:** بيقدّم ملف Vue من [[node_modules]] عشان صفحة Vue تشتغل من غير build ولا CDN.

## ٤ و ٥ و ٦. التلات صفحات

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>image-uploader في HTML عادي</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  image-uploader { --uploader-accent: #0b6e4f; }
  #log { background: #f3f4f6; padding: 8px; border-radius: 8px; font-size: 13px; white-space: pre-wrap; }
</style>
<script type="module" src="image-uploader.js"></script>
</head>
<body>
<h1>صورة المنتج</h1>
<image-uploader accept="image/png,image/jpeg,image/webp" max-size="2MB" endpoint="/upload" multiple>
  <span slot="label">اسحب صور المنتج هنا (PNG أو JPEG أو WebP، لحد 2MB)</span>
</image-uploader>
<pre id="log"></pre>
<script type="module">
  const out = document.querySelector("#log");
  for (const type of ["upload-start", "upload-done", "upload-error"]) {
    document.addEventListener(type, (e) => {
      const { file, reason, response } = e.detail;
      out.textContent += $__bt$__{type}: $__{file.name}$__{reason ? " | " + reason : ""}$__{response ? " | server got " + response.bytes + " bytes" : ""}\n$__bt;
    });
  }
</script>
</body>
</html>
~~~

~~~jsx react/App.jsx
// react/App.jsx: نفس الـ component جوه React 19
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "../image-uploader.js";

function App() {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState("");
  return (
    <main>
      <h1>React 19</h1>
      <image-uploader
        accept="image/*"
        max-size="2MB"
        endpoint="/upload"
        onupload-done={(e) => setUploads((u) => [...u, e.detail.response])}
        onupload-error={(e) => setError(e.detail.message)}
      >
        <span slot="label">ارفع من React</span>
      </image-uploader>
      <p id="state">uploads in React state: {uploads.map((u) => $__bt$__{u.name} ($__{u.bytes})$__bt).join(", ") || "none"}</p>
      {error && <p id="error">آخر error: {error}</p>}
    </main>
  );
}
createRoot(document.querySelector("#root")).render(<App />);
~~~

~~~html react/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>image-uploader في React</title></head>
<body>
<div id="root"></div>
<script type="module" src="app.bundle.js"></script>
</body>
</html>
~~~

~~~html vue/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>image-uploader في Vue</title></head>
<body>
<div id="app">
  <h1>Vue 3</h1>
  <image-uploader accept="image/*" max-size="2MB" endpoint="/upload"
    @upload-done="uploads.push($event.detail.response)"
    @upload-error="error = $event.detail.message">
    <span slot="label">ارفع من Vue</span>
  </image-uploader>
  <p id="state">uploads in Vue state: {{ uploads.map(u => u.name + " (" + u.bytes + ")").join(", ") || "none" }}</p>
  <p id="error" v-if="error">آخر error: {{ error }}</p>
</div>
<script type="module">
  import { createApp, ref } from "/vendor/vue.js";
  import "/image-uploader.js";
  const app = createApp({
    setup() {
      return { uploads: ref([]), error: ref("") };
    },
  });
  // الـ template هنا بيتعمل compile في المتصفح، فالإعداد مكانه app.config
  app.config.compilerOptions.isCustomElement = (tag) => tag === "image-uploader";
  app.mount("#app");
</script>
</body>
</html>
~~~

- **React 19:** [[onupload-done]] بيسمع لـ [[upload-done]] بالظبط (تمرين «Web Components في React و Vue»).
- **Vue:** هنا [[app.config.compilerOptions.isCustomElement]] هو المكان الصح (عكس مشروع Vite) لأن الـ template مكتوب في الـ HTML وبيتعمل compile في المتصفح.

## التستات

~~~js test/image-check.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { sniffType, parseSize, accepts, checkFile } from "../image-check.js";

const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13];
const JPEG = [0xff, 0xd8, 0xff, 0xe0, 0, 16, 0x4a, 0x46, 0x49, 0x46, 0, 1];
const WEBP = [..."RIFF"].map((c) => c.charCodeAt(0)).concat([0, 0, 0, 0], [..."WEBP"].map((c) => c.charCodeAt(0)));
const TEXT = [..."hello world!"].map((c) => c.charCodeAt(0));

test("sniffType reads the magic bytes", () => {
  assert.equal(sniffType(PNG), "image/png");
  assert.equal(sniffType(JPEG), "image/jpeg");
  assert.equal(sniffType(WEBP), "image/webp");
  assert.equal(sniffType(TEXT), null);
  assert.equal(sniffType([]), null);
});

test("parseSize understands units and rejects junk", () => {
  assert.equal(parseSize("2MB"), 2 * 1024 * 1024);
  assert.equal(parseSize("500 kb"), 500 * 1024);
  assert.equal(parseSize("1.5MB"), 1572864);
  assert.equal(parseSize("1048576"), 1048576);
  assert.equal(parseSize("big"), null);
  assert.equal(parseSize(null), null);
});

test("accepts works like the input attribute", () => {
  assert.equal(accepts("image/*", "image/webp"), true);
  assert.equal(accepts("image/png, image/jpeg", "image/jpeg"), true);
  assert.equal(accepts("image/png", "image/gif"), false);
  assert.equal(accepts("", "image/gif"), true);
});

test("checkFile: size first, then real type, then accept", () => {
  assert.deepEqual(checkFile({ name: "a.png", size: 10, bytes: PNG }), { ok: true, type: "image/png" });
  assert.equal(checkFile({ name: "a.png", size: 3e6, bytes: PNG }, { maxSize: 2e6 }).reason, "too-big");
  assert.equal(checkFile({ name: "fake.png", size: 12, bytes: TEXT }).reason, "not-image");
  assert.equal(checkFile({ name: "a.jpg", size: 12, bytes: JPEG }, { accept: "image/png" }).reason, "type-not-allowed");
  assert.match(checkFile({ name: "a.png", size: 3145728, bytes: PNG }, { maxSize: 2097152 }).message, /3\.0 MB أكبر من الحد 2\.0 MB/);
});
~~~

~~~js test/uploader.test.mjs
// test/uploader.test.mjs: الـ component في jsdom: attributes و events ورفع حقيقي لسيرفر صغير، من غير متصفح
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { JSDOM } from "jsdom";

let received = [];
const server = http.createServer((req, res) => {
  let bytes = 0;
  req.on("data", (c) => (bytes += c.length));
  req.on("end", () => {
    received.push({ type: req.headers["content-type"], bytes });
    res.writeHead(201, { "content-type": "application/json" }).end(JSON.stringify({ name: "x", bytes }));
  });
});
await new Promise((r) => server.listen(0, r));
const origin = $__bthttp://localhost:$__{server.address().port}$__bt;

const dom = new JSDOM("<!doctype html><body></body>", { url: origin + "/" });
const { window } = dom;
Object.assign(globalThis, {
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  document: window.document,
  CustomEvent: window.CustomEvent,
  XMLHttpRequest: window.XMLHttpRequest,
});
// jsdom معندوش createObjectURL، فبنعمل واحد بسيط
let urls = 0;
URL.createObjectURL = () => $__btblob:fake/$__{++urls}$__bt;
URL.revokeObjectURL = () => {};
await import("../image-uploader.js");
after(() => server.close());

const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const file = (name, bytes, size = bytes.length) =>
  new window.File([new Uint8Array(bytes), new Uint8Array(Math.max(0, size - bytes.length))], name);

function make(attrs) {
  document.body.innerHTML = $__bt<image-uploader $__{attrs}></image-uploader>$__bt;
  const el = document.querySelector("image-uploader");
  const events = [];
  for (const t of ["upload-start", "upload-done", "upload-error"]) {
    el.addEventListener(t, (e) => events.push({ ...e.detail, type: t, composed: e.composed }));
  }
  return { el, events };
}
const nextEvent = (type) => new Promise((r) => document.addEventListener(type, (e) => r(e.detail), { once: true }));

test("attributes reach the hidden input", () => {
  const { el } = make('accept="image/png" multiple');
  const input = el.shadowRoot.querySelector("input");
  assert.equal(input.accept, "image/png");
  assert.equal(input.multiple, true);
  el.removeAttribute("multiple");
  assert.equal(input.multiple, false);
});

test("too big: upload-error too-big, composed, nothing sent", async () => {
  received = [];
  const { el, events } = make('max-size="1KB" endpoint="/upload"');
  await el.addFiles([file("big.png", PNG, 5000)]);
  assert.equal(events.length, 1);
  assert.equal(events[0].type, "upload-error");
  assert.equal(events[0].reason, "too-big");
  assert.equal(events[0].composed, true);
  assert.equal(received.length, 0);
});

test("text renamed .png: not-image", async () => {
  const { el, events } = make('endpoint="/upload"');
  await el.addFiles([file("fake.png", [...Buffer.from("hello, not an image")])]);
  assert.equal(events[0].reason, "not-image");
  assert.match(events[0].message, /fake\.png/);
});

test("without multiple only the first file is handled", async () => {
  const { el, events } = make('max-size="1KB"');
  await el.addFiles([file("a.png", PNG, 5000), file("b.png", PNG, 5000)]);
  assert.deepEqual(events.map((e) => e.file.name), ["a.png"]);
});

test("valid PNG: upload-start then upload-done with what the server got", async () => {
  received = [];
  const { el, events } = make('endpoint="/upload" max-size="2MB"');
  const done = nextEvent("upload-done");
  await el.addFiles([file("ok.png", PNG, 3000)]);
  const detail = await done;
  assert.deepEqual(events.map((e) => e.type), ["upload-start", "upload-done"]);
  assert.equal(detail.response.bytes, 3000);
  assert.deepEqual(received, [{ type: "image/png", bytes: 3000 }]);
});

test("properties write their attributes (React 19 sets them as properties)", () => {
  const { el } = make("");
  el.endpoint = "/api/images";
  el.maxSize = "500KB";
  assert.equal(el.getAttribute("endpoint"), "/api/images");
  assert.equal(el.maxSize, 512000);
});
~~~

- **سيرفر حقيقي على port [[0]]:** النظام بيختار port فاضي، فالتست مبيتخانقش مع حاجة شغالة. والـ XHR بتاع jsdom بيرفع له فعلًا، فاتأكدنا إن السيرفر استلم 3000 byte بنوع [[image/png]].
- **globals من jsdom:** [[CustomEvent]] و [[XMLHttpRequest]] لازم يبقوا بتوع jsdom مش بتوع Node، وإلا [[dispatchEvent]] بيرفض الحدث.

~~~text npm test (Node 24.22، jsdom 31.0.1)
✔ sniffType reads the magic bytes (1.2023ms)
✔ parseSize understands units and rejects junk (0.9539ms)
✔ accepts works like the input attribute (0.214ms)
✔ checkFile: size first, then real type, then accept (0.9545ms)
✔ attributes reach the hidden input (24.192ms)
✔ too big: upload-error too-big, composed, nothing sent (6.1051ms)
✔ text renamed .png: not-image (2.9359ms)
✔ without multiple only the first file is handled (2.7945ms)
✔ valid PNG: upload-start then upload-done with what the server got (36.8748ms)
✔ properties write their attributes (React 19 sets them as properties) (1.9648ms)
ℹ tests 10
ℹ pass 10
ℹ fail 0
~~~

## الفحص في Chrome

~~~js e2e/make-images.mjs
import fs from "node:fs"; import zlib from "node:zlib";
function png(w, h, seed) {
  const crc = (buf) => zlib.crc32(buf);
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td) >>> 0); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  const raw = Buffer.alloc((w * 3 + 1) * h); let x = seed;
  for (let i = 0; i < raw.length; i++) { if (i % (w * 3 + 1) === 0) { raw[i] = 0; continue; } x = (x * 1103515245 + 12345) & 0x7fffffff; raw[i] = x >> 16; }
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 0 })), chunk("IEND", Buffer.alloc(0))]);
}
fs.writeFileSync("photo.png", png(400, 400, 1));
fs.writeFileSync("big.png", png(1000, 1000, 2));
fs.writeFileSync("fake.png", "this is text, not a png");
for (const f of ["photo.png", "big.png", "fake.png"]) console.log(f, fs.statSync(f).size);
~~~

~~~js e2e/e2e.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = "http://localhost:8852";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
const cdp = await page.context().newCDPSession(page);
await cdp.send("Network.enable");
const slow = (on) => cdp.send("Network.emulateNetworkConditions", on ? { offline: false, latency: 100, downloadThroughput: 500000, uploadThroughput: 100000 } : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
const input = "image-uploader input[type=file]";
const logText = () => page.textContent("#log");
const serverLog = () => fs.readFileSync("server.log", "utf8").trim().split("\n").slice(-3).join(" || ");

await page.goto(BASE + "/");
await page.setInputFiles(input, ["big.png", "fake.png"]);
await page.waitForTimeout(300);
console.log("1) big + fake:\n" + await logText());
console.log("   rows:", await page.evaluate(() => [...document.querySelector("image-uploader").shadowRoot.querySelectorAll("li .err")].map((e) => e.textContent).join(" | ")));

await slow(true);
await page.setInputFiles(input, ["photo.png"]);
const samples = [];
for (let i = 0; i < 6; i++) { await page.waitForTimeout(700); samples.push(await page.evaluate(() => [...document.querySelector("image-uploader").shadowRoot.querySelectorAll("progress")].map((p) => p.value).join(","))); }
console.log("2) progress samples (100KB/s upload):", samples.join(" -> "));
await page.waitForFunction(() => document.querySelector("#log").textContent.includes("upload-done"), null, { timeout: 30000 });
console.log("   " + (await logText()).trim().split("\n").slice(-2).join(" | "));

await page.setInputFiles(input, ["photo.png"]);
await page.waitForTimeout(1500);
await page.locator("image-uploader li button").last().click();
await page.waitForTimeout(300);
console.log("3) cancel:", (await logText()).trim().split("\n").slice(-1)[0], "|| server:", serverLog());

await page.setInputFiles(input, ["photo.png"]);
await page.waitForTimeout(1500);
const urlsBefore = await page.evaluate(() => [...document.querySelector("image-uploader").shadowRoot.querySelectorAll("img[src^=blob]")].map((i) => i.src));
await page.evaluate(() => document.querySelector("image-uploader").remove());
await page.waitForTimeout(500);
const revoked = await page.evaluate(async (urls) => (await Promise.all(urls.map((u) => fetch(u).then(() => "alive", () => "revoked")))).join(","), urlsBefore);
console.log("4) remove() mid-upload: last log line:", (await logText()).trim().split("\n").slice(-1)[0], "|| server:", serverLog(), "|| blob urls:", revoked);
await slow(false);

for (const fw of ["react", "vue"]) {
  await page.goto($__bt$__{BASE}/$__{fw}/$__bt);
  await page.waitForSelector("image-uploader");
  await page.setInputFiles(input, ["photo.png"]);
  await page.waitForFunction(() => !document.querySelector("#state").textContent.endsWith("none"), null, { timeout: 15000 });
  await page.setInputFiles(input, ["big.png"]);
  await page.waitForSelector("#error");
  console.log($__bt5) $__{fw}:$__bt, await page.textContent("#state"), "|", await page.textContent("#error"));
}
await browser.close();
~~~

~~~bash
cd e2e && node make-images.mjs                       # photo.png 480533 و big.png 3001518 و fake.png 23
(cd .. && PORT=8852 node server.mjs > e2e/server.log &)
node e2e.mjs
~~~

~~~text الناتج (Chrome 158، الرفع متحدد بـ 100KB/s من CDP)
1) big + fake:
upload-error: big.png | too-big
upload-error: fake.png | not-image

   rows: big.png: 2.9 MB أكبر من الحد 2.0 MB | fake.png: مش صورة (أول bytes مش PNG ولا JPEG ولا GIF ولا WebP)
2) progress samples (100KB/s upload): 14 -> 31 -> 44 -> 61 -> 75 -> 89
   upload-start: photo.png | upload-done: photo.png | server got 480533 bytes
3) cancel: upload-error: photo.png | aborted || server: 10:16:57 upload done photo.png 480533 bytes || 10:16:57 upload start photo.png 480533 bytes || 10:16:59 upload ABORTED photo.png after 147456 bytes
4) remove() mid-upload: last log line: upload-start: photo.png || server: 10:16:59 upload ABORTED photo.png after 147456 bytes || 10:16:59 upload start photo.png 480533 bytes || 10:17:01 upload ABORTED photo.png after 147456 bytes || blob urls: revoked,revoked,revoked
5) react: uploads in React state: photo.png (480533) | آخر error: big.png: 2.9 MB أكبر من الحد 2.0 MB
5) vue: uploads in Vue state: photo.png (480533) | آخر error: big.png: 2.9 MB أكبر من الحد 2.0 MB
~~~

- **(1)** الكبير والمزيف اترفضوا قبل أي طلب (السيرفر مكتبش [[upload start]] ليهم).
- **(2)** الـ progress طلع 14 ثم 31 ثم 44 لحد 89 كل 0.7 ثانية، والسيرفر استلم 480533 byte = حجم الملف بالظبط.
- **(3)** «إلغاء» بعت [[aborted]]، والسيرفر كتب [[upload ABORTED ... after 147456 bytes]].
- **(4)** [[remove()]] في نص الرفع: مفيش event اتبعت، والسيرفر كتب ABORTED، والـ ٣ [[blob:]] URLs بقوا revoked ([[fetch]] عليهم فشل).
- **(5)** نفس الملفين في React و Vue: الصورة دخلت الـ state، والرسالة بتاعة الكبير وصلت.
- حجم الـ component من غير مكتبات: 7038 byte، و [[image-check.js]] 2251 byte، و bundle React كله (React نفسه جواه) 230512 byte بعد [[--minify]].

## الغلطات اللي حصلت فعلًا وأنا ببنيه

1. **صفحة React فضلت فاضية** و Console فيه [[Cannot set property endpoint of #<G0> which has only a getter]]. React 19 لقى [["endpoint" in el]] بـ [[true]] (عندي getter) فعمل [[el.endpoint = "/upload"]]، والـ getter من غير setter بيرمي في strict mode. التصليح: كل getter ليه setter بيكتب في الـ attribute. ([[max-size]] عدّى لأن مفيش property اسمها [["max-size"]] بالشَرطة، فـ React حطه attribute.)
2. **[[/react/]] رجّع 404:** [[readFile]] على فولدر بيفشل. السيرفر بقى يزوّد [[index.html]] لأي مسار آخره [[/]].
3. **تست الرفع وقع بـ [[['image/png', 'upload-done']]]:** كنت بكتب [[{ type: t, ...e.detail }]]، و [[detail]] فيه [[type]] بتاع الملف فغطّى اسم الحدث. الترتيب بقى [[{ ...e.detail, type: t }]]، والـ listeners بقت على العنصر نفسه مش [[document]] عشان متتراكمش بين التستات.` },
        { lvl: 'فكرة', dir: "drop-down", t: R`component تستخدمه في كل مشاريعك`, what: R`اختار حاجة بتعملها في كل مشروع (modal، أو toast، أو dropdown، أو date picker، أو rating) وابنيها Web Component واحد يشتغل مع أي framework: attributes للقيم البسيطة، و properties للمعقدة، و events للي بيحصل، و slots للمحتوى، و CSS variables للشكل.`, done: R`فيه صفحة demo فيها كل الحالات، وبيشتغل بالكيبورد بس، ومستخدم في مشروعين مختلفين على الأقل (واحد منهم React أو Vue)، و README بيشرح كل attribute و event بمثال.`, ext: R`اعمله بـ Lit وقارن حجم الكود والـ bundle بالنسخة اللي من غير مكتبة، وزوّد Declarative Shadow DOM عشان يترندر من السيرفر.`, sol: R`## الشكل النهائي

~~~view 280 صفحة الـ demo (الملفين في ملف واحد عشان المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>drop-down: صفحة الـ demo</title>
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; min-height: 260px; }
  .row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-block: 10px; }
  .brand { --dd-accent: #be185d; --dd-radius: 999px; }
</style>
<script type="module">
// drop-down.js: <drop-down> زي <select> بس بشكلك انت، ويشتغل في أي framework
const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt
  :host { display: inline-block; position: relative; font: inherit; --_accent: var(--dd-accent, #2563eb); --_radius: var(--dd-radius, 8px); }
  button { font: inherit; display: inline-flex; gap: 8px; align-items: center; padding: 6px 12px; border: 1px solid #9ca3af; border-radius: var(--_radius); background: var(--dd-bg, #fff); color: inherit; cursor: pointer; }
  button:focus-visible { outline: 3px solid var(--_accent); outline-offset: 1px; }
  [part="list"] { position: absolute; inset-inline-start: 0; top: calc(100% + 4px); min-width: 100%; margin: 0; padding: 4px; border: 1px solid #d1d5db; border-radius: var(--_radius); background: var(--dd-bg, #fff); box-shadow: 0 6px 20px rgb(0 0 0 / .15); z-index: 10; }
  :host(:not([open])) [part="list"] { display: none; }
  ::slotted([slot="option"]) { display: block; padding: 6px 10px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
  ::slotted([slot="option"][aria-selected="true"]) { font-weight: 700; color: var(--_accent); }
  ::slotted([slot="option"]:focus) { outline: none; background: color-mix(in srgb, var(--_accent) 12%, transparent); }
$__bt);

class DropDown extends HTMLElement {
  static observedAttributes = ["value", "open", "label"];
  #button;
  #slot;

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet];
    root.innerHTML = $__bt
      <button part="button" type="button" aria-haspopup="listbox" aria-expanded="false">
        <span part="label"></span><span aria-hidden="true">▾</span>
      </button>
      <div part="list" role="listbox"><slot name="option"></slot></div>$__bt;
    this.#button = root.querySelector("button");
    this.#slot = root.querySelector("slot");
    this.#button.addEventListener("click", () => this.#setOpen(!this.open, true));
    this.#button.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); this.#setOpen(true, true); }
    });
    this.#slot.addEventListener("slotchange", () => this.#sync());
    const list = root.querySelector("[part=list]");
    list.addEventListener("click", (e) => {
      const opt = e.target.closest('[slot="option"]');
      if (opt) this.#choose(opt);
    });
    list.addEventListener("keydown", (e) => this.#onListKey(e));
  }

  connectedCallback() { document.addEventListener("pointerdown", this.#outside); }
  disconnectedCallback() { document.removeEventListener("pointerdown", this.#outside); }

  get options() { return this.#slot.assignedElements(); }
  get value() { return this.getAttribute("value") ?? ""; }
  set value(v) { this.setAttribute("value", v); }
  get open() { return this.hasAttribute("open"); }
  set open(on) { this.toggleAttribute("open", Boolean(on)); }

  attributeChangedCallback() { this.#sync(); }

  #outside = (e) => {
    if (this.open && !e.composedPath().includes(this)) this.#setOpen(false, false);
  };

  #sync() {
    const opts = this.options;
    const current = opts.find((o) => o.dataset.value === this.value);
    opts.forEach((o) => {
      o.setAttribute("role", "option");
      o.tabIndex = -1;
      o.setAttribute("aria-selected", String(o === current));
    });
    this.shadowRoot.querySelector("[part=label]").textContent = current?.textContent.trim() ?? this.getAttribute("label") ?? "اختار";
    this.#button.setAttribute("aria-expanded", String(this.open));
  }

  #setOpen(on, moveFocus) {
    this.open = on;
    if (!moveFocus) return;
    if (on) {
      const opts = this.options;
      (opts.find((o) => o.dataset.value === this.value) ?? opts[0])?.focus();
    } else {
      this.#button.focus();
    }
  }

  #choose(opt) {
    const changed = opt.dataset.value !== this.value;
    this.value = opt.dataset.value;
    this.#setOpen(false, true);
    if (changed) this.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true, detail: { value: this.value, label: opt.textContent.trim() } }));
  }

  #onListKey(e) {
    const opts = this.options;
    const i = opts.indexOf(e.target.closest('[slot="option"]'));
    const go = (k) => { e.preventDefault(); opts[(k + opts.length) % opts.length].focus(); };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(opts.length - 1);
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.#choose(opts[i]); }
    else if (e.key === "Escape") { e.preventDefault(); this.#setOpen(false, true); }
    else if (e.key === "Tab") this.#setOpen(false, false);
  }
}

if (!customElements.get("drop-down")) customElements.define("drop-down", DropDown);
</script>
</head>
<body>
<div class="row">
  <span>الترتيب:</span>
  <drop-down id="sort" value="new" label="اختار الترتيب">
    <div slot="option" data-value="new">الأحدث</div>
    <div slot="option" data-value="cheap">الأرخص</div>
    <div slot="option" data-value="rated">الأعلى تقييمًا</div>
  </drop-down>
</div>
<div class="row">
  <span>من غير قيمة، وألوان تانية بالـ variables:</span>
  <drop-down class="brand" label="المقاس">
    <div slot="option" data-value="s">صغير</div>
    <div slot="option" data-value="m">وسط</div>
    <div slot="option" data-value="l">كبير</div>
  </drop-down>
</div>
<p id="out">change: —</p>
<script type="module">
  document.addEventListener("change", (e) => {
    if (e.target.localName === "drop-down") document.querySelector("#out").textContent = $__btchange: $__{e.target.id || e.target.className} = $__{e.detail.value} ($__{e.detail.label})$__bt;
  });
</script>
</body>
</html>
~~~

## النسخة النموذجية: [[<drop-down>]]، وليه ده بالذات

اخترت dropdown لأنه أكتر component بيتعمل من الأول في كل مشروع ([[<select>]] مبيتستايلش كويس)، وفيه كل حاجة الوحدة علّمتها في مكان واحد: attributes ([[value]] و [[label]] و [[open]])، و properties ([[value]] و [[open]] و [[options]])، و event ([[change]])، و slots (الاختيارات نفسها)، و CSS variables ([[--dd-accent]] و [[--dd-radius]] و [[--dd-bg]])، و [[::part]] ([[button]] و [[label]] و [[list]])، والكيبورد كامل. ومش محتاج سيرفر ولا مكتبة.

**هتشوف إيه:** زرار «الأحدث ▾». الضغط بيفتح لستة تحته، والاختيار بيقفلها ويكتب السطر تحت. التاني من غير قيمة فبيكتب «المقاس»، وشكله دايري ووردي من الـ variables بس.

~~~text شجرة الملفات
drop-down/
├── drop-down.js        ← الـ component
├── index.html          ← صفحة الـ demo
└── react/App.jsx       ← نفسه جوه React 19 (المشروع التاني)
~~~

~~~js drop-down.js
// drop-down.js: <drop-down> زي <select> بس بشكلك انت، ويشتغل في أي framework
const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt
  :host { display: inline-block; position: relative; font: inherit; --_accent: var(--dd-accent, #2563eb); --_radius: var(--dd-radius, 8px); }
  button { font: inherit; display: inline-flex; gap: 8px; align-items: center; padding: 6px 12px; border: 1px solid #9ca3af; border-radius: var(--_radius); background: var(--dd-bg, #fff); color: inherit; cursor: pointer; }
  button:focus-visible { outline: 3px solid var(--_accent); outline-offset: 1px; }
  [part="list"] { position: absolute; inset-inline-start: 0; top: calc(100% + 4px); min-width: 100%; margin: 0; padding: 4px; border: 1px solid #d1d5db; border-radius: var(--_radius); background: var(--dd-bg, #fff); box-shadow: 0 6px 20px rgb(0 0 0 / .15); z-index: 10; }
  :host(:not([open])) [part="list"] { display: none; }
  ::slotted([slot="option"]) { display: block; padding: 6px 10px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
  ::slotted([slot="option"][aria-selected="true"]) { font-weight: 700; color: var(--_accent); }
  ::slotted([slot="option"]:focus) { outline: none; background: color-mix(in srgb, var(--_accent) 12%, transparent); }
$__bt);

class DropDown extends HTMLElement {
  static observedAttributes = ["value", "open", "label"];
  #button;
  #slot;

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet];
    root.innerHTML = $__bt
      <button part="button" type="button" aria-haspopup="listbox" aria-expanded="false">
        <span part="label"></span><span aria-hidden="true">▾</span>
      </button>
      <div part="list" role="listbox"><slot name="option"></slot></div>$__bt;
    this.#button = root.querySelector("button");
    this.#slot = root.querySelector("slot");
    this.#button.addEventListener("click", () => this.#setOpen(!this.open, true));
    this.#button.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); this.#setOpen(true, true); }
    });
    this.#slot.addEventListener("slotchange", () => this.#sync());
    const list = root.querySelector("[part=list]");
    list.addEventListener("click", (e) => {
      const opt = e.target.closest('[slot="option"]');
      if (opt) this.#choose(opt);
    });
    list.addEventListener("keydown", (e) => this.#onListKey(e));
  }

  connectedCallback() { document.addEventListener("pointerdown", this.#outside); }
  disconnectedCallback() { document.removeEventListener("pointerdown", this.#outside); }

  get options() { return this.#slot.assignedElements(); }
  get value() { return this.getAttribute("value") ?? ""; }
  set value(v) { this.setAttribute("value", v); }
  get open() { return this.hasAttribute("open"); }
  set open(on) { this.toggleAttribute("open", Boolean(on)); }

  attributeChangedCallback() { this.#sync(); }

  #outside = (e) => {
    if (this.open && !e.composedPath().includes(this)) this.#setOpen(false, false);
  };

  #sync() {
    const opts = this.options;
    const current = opts.find((o) => o.dataset.value === this.value);
    opts.forEach((o) => {
      o.setAttribute("role", "option");
      o.tabIndex = -1;
      o.setAttribute("aria-selected", String(o === current));
    });
    this.shadowRoot.querySelector("[part=label]").textContent = current?.textContent.trim() ?? this.getAttribute("label") ?? "اختار";
    this.#button.setAttribute("aria-expanded", String(this.open));
  }

  #setOpen(on, moveFocus) {
    this.open = on;
    if (!moveFocus) return;
    if (on) {
      const opts = this.options;
      (opts.find((o) => o.dataset.value === this.value) ?? opts[0])?.focus();
    } else {
      this.#button.focus();
    }
  }

  #choose(opt) {
    const changed = opt.dataset.value !== this.value;
    this.value = opt.dataset.value;
    this.#setOpen(false, true);
    if (changed) this.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true, detail: { value: this.value, label: opt.textContent.trim() } }));
  }

  #onListKey(e) {
    const opts = this.options;
    const i = opts.indexOf(e.target.closest('[slot="option"]'));
    const go = (k) => { e.preventDefault(); opts[(k + opts.length) % opts.length].focus(); };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(opts.length - 1);
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.#choose(opts[i]); }
    else if (e.key === "Escape") { e.preventDefault(); this.#setOpen(false, true); }
    else if (e.key === "Tab") this.#setOpen(false, false);
  }
}

if (!customElements.get("drop-down")) customElements.define("drop-down", DropDown);
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>drop-down: صفحة الـ demo</title>
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; min-height: 260px; }
  .row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-block: 10px; }
  .brand { --dd-accent: #be185d; --dd-radius: 999px; }
</style>
<script src="drop-down.js" defer></script>
</head>
<body>
<div class="row">
  <span>الترتيب:</span>
  <drop-down id="sort" value="new" label="اختار الترتيب">
    <div slot="option" data-value="new">الأحدث</div>
    <div slot="option" data-value="cheap">الأرخص</div>
    <div slot="option" data-value="rated">الأعلى تقييمًا</div>
  </drop-down>
</div>
<div class="row">
  <span>من غير قيمة، وألوان تانية بالـ variables:</span>
  <drop-down class="brand" label="المقاس">
    <div slot="option" data-value="s">صغير</div>
    <div slot="option" data-value="m">وسط</div>
    <div slot="option" data-value="l">كبير</div>
  </drop-down>
</div>
<p id="out">change: —</p>
<script type="module">
  document.addEventListener("change", (e) => {
    if (e.target.localName === "drop-down") document.querySelector("#out").textContent = $__btchange: $__{e.target.id || e.target.className} = $__{e.detail.value} ($__{e.detail.label})$__bt;
  });
</script>
</body>
</html>
~~~

~~~jsx react/App.jsx
// react/App.jsx: نفس <drop-down> جوه React 19
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "../drop-down.js";

function App() {
  const [sort, setSort] = useState("new");
  return (
    <>
      <drop-down value={sort} onchange={(e) => setSort(e.detail.value)}>
        <div slot="option" data-value="new">الأحدث</div>
        <div slot="option" data-value="cheap">الأرخص</div>
      </drop-down>
      <p id="state">sort in React: {sort}</p>
    </>
  );
}
createRoot(document.querySelector("#root")).render(<App />);
~~~

## الناتج المتقاس

Playwright في Chrome 158 بالكيبورد بس الأول، وبعدين الماوس (ونفس الناتج حرف بحرف جوه المعاينة):

~~~text الناتج
start: value=new open=false aria-expanded=false label="الأحدث" focus=body | change: —
Tab, Enter: value=new open=true aria-expanded=true label="الأحدث" focus=الأحدث | change: —
Down x2: value=new open=true aria-expanded=true label="الأحدث" focus=الأعلى تقييمًا | change: —
Enter: value=rated open=false aria-expanded=false label="الأعلى تقييمًا" focus=button of sort | change: sort = rated (الأعلى تقييمًا)
Down (opens), Escape: value=rated open=false aria-expanded=false label="الأعلى تقييمًا" focus=button of sort | change: sort = rated (الأعلى تقييمًا)
open by click, click outside: value=rated open=false aria-expanded=false label="الأعلى تقييمًا" focus=body | change: sort = rated (الأعلى تقييمًا)
click cheap: value=cheap open=false aria-expanded=false label="الأرخص" focus=button of sort | change: sort = cheap (الأرخص)
code value=new (no change event): value=new open=false aria-expanded=false label="الأحدث" focus=button of sort | change: sort = cheap (الأرخص)
brand label: المقاس | radius: 999px
~~~

~~~text React 19.3.1 (esbuild، ضغطة وبعدين سهم و Enter)
sort in React: cheap | attribute value: cheap
~~~

## الكود حتة حتة، وليه التصميم ده

- **الاختيارات light DOM في [[slot="option"]] مش array في property:** اللي بيستخدمه بيكتب HTML عادي، والنص بيتقري لـ SEO ولقارئ الشاشة، والترجمة بتحصل في الـ HTML. و [[slotchange]] بيخلّي إضافة اختيار من JS تشتغل.
- **[[data-value]] على كل اختيار:** القيمة منفصلة عن النص المعروض، زي [[<option value>]].
- **[[value]] و [[open]] attributes بـ reflect:** [[drop-down[open]]] ينفع يتستايل من بره، والحالة تبان في DevTools، و [[:host(:not([open])) [part="list"]]] بيخفي اللستة من غير JS.
- **[[change]] بيتبعت من [[#choose]] بس ولو القيمة اتغيّرت:** [[el.value = "new"]] من الكود مبعتش حاجة (السطر قبل الأخير)، زي [[<select>]] بالظبط.
- **الكيبورد:** على الزرار Enter و Space والأسهم بيفتحوا ويحطوا الـ focus على المختار. جوه اللستة الأسهم و Home و End بيتنقلوا ([[%]] بيلف)، و Enter بيختار، و Escape بيقفل ويرجّع الـ focus للزرار، و Tab بيقفل ويسيب الـ focus يكمّل. ده شكل الـ listbox في ARIA Authoring Practices.
- **[[o.tabIndex = -1]]:** الاختيارات تقبل [[focus()]] من الكود من غير ما تبقى في ترتيب Tab.
- **[[#outside]] على [[pointerdown]] في [[document]] و [[e.composedPath().includes(this)]]:** الضغط بره بيقفل. [[composedPath()]] فيه كل العناصر اللي الحدث عدّى عليها حتى اللي جوه الـ shadow، فالسؤال «الضغطة جت من جوه العنصر ولا لأ؟» إجابته صح سواء دوست على الزرار اللي جوه الـ shadow أو على اختيار في الـ light DOM. والـ listener بيتشال في [[disconnectedCallback]].
- **[[aria-haspopup]] و [[aria-expanded]] و [[role="listbox"]] و [[role="option"]] و [[aria-selected]]:** دي اللي بتخلّي قارئ الشاشة يعرف إنه زرار بيفتح لستة، ومفتوح ولا مقفول، وأنهي اختيار متعلّم (من غيرها هو مجرد [[div]]s).
- **في React 19:** [[onchange]] بحروف صغيرة عشان React بيسمع لنفس الاسم اللي بعد [[on]] بالظبط (تمرين React في الوحدة). و [[value={sort}]] وصل property لأن العنصر عنده setter.

- **[[<script src="drop-down.js" defer>]]:** script عادي مش module، عشان صفحة الـ demo تتفتح كملف من غير سيرفر. ونفس الملف بيتعمله [[import "../drop-down.js"]] في React عادي (esbuild بيحطه في الـ bundle).

## لو عايز تكمّل (ext)

Lit بيقلل الكود اللي بيعمل sync بين الـ attributes والرسم، بس بيزوّد مكتبة (قيس الحجم قبل وبعد). و Declarative Shadow DOM محتاج السيرفر يكتب الـ [[<template shadowrootmode>]] زي تمرين الكروت في درس DSD.` },
      ],
      items: [
        {
          cmd: "customElements.define",
          title: "تعمل tag HTML جديد بـ customElements.define (custom elements)",
          ref: [
            { t: "MDN: Web Components", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components" },
            { t: "MDN: Using custom elements", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements" },
            { t: "MDN: CustomElementRegistry.define()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define" },
            { t: "MDN: CustomElementRegistry.whenDefined()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined" },
            { t: "MDN: :defined", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:defined" },
          ],
          pre: [
            { to: "js/defer و async و module", why: R`الـ [[<script type="module">]] بيتنفّذ بعد ما الصفحة تتقري، وده سبب إن العنصر بيظهر قبل ما يتسجّل (الـ upgrade)` },
          ],
          desc: R`[[customElements.define("user-card", UserCard)]] بيسجّل tag جديد، و [[UserCard]] class بيورث [[HTMLElement]]. من ساعتها أي [[<user-card>]] في الصفحة (حتى اللي كان موجود قبل التسجيل) بيبقى instance من الـ class ده.

الـ class ليه lifecycle callbacks: [[connectedCallback]] لما يدخل الصفحة، و [[disconnectedCallback]] لما يتشال، و [[attributeChangedCallback]] لما attribute من اللي في [[observedAttributes]] يتغير. والاسم **لازم** فيه [[-]].`,
          example: R`class UserCard extends HTMLElement {
  static observedAttributes = ["name", "role"];
  constructor() {
    super();
    console.log("constructor");
  }
  connectedCallback() {
    console.log("connected");
    this.render();
  }
  disconnectedCallback() {
    console.log("disconnected");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log($__btattribute $__{name}: $__{oldValue} -> $__{newValue}$__bt);
    this.render();
  }
  render() {
    const name = this.getAttribute("name") ?? "Guest";
    const role = this.getAttribute("role") ?? "member";
    this.textContent = $__bt$__{name} ($__{role})$__bt;
  }
}
customElements.define("user-card", UserCard);`,
          try: R`احفظ المثال [[user-card.js]]، واعمل صفحة فيها [[<user-card name="Sara" role="admin"></user-card>]] و [[<script type="module" src="user-card.js">]]. افتح Console: الترتيب إيه؟ وبعدين في الـ Console: [[document.querySelector("user-card").setAttribute("role", "owner")]]، وبعدين [[.remove()]]، وبعدين جرّب [[customElements.define("usercard", class extends HTMLElement {})]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل جوه try/catch: [[customElements.define("usercard", class extends HTMLElement {})]]، وبعدها تعرّف [[user-x]] مرتين، وبعدها نفس الـ class بإسمين مختلفين.`, done: R`الأول بيرمي [[DOMException]] اسمها [[SyntaxError]] (الاسم لازم فيه [[-]])، والتاني والتالت بيرموا [[NotSupportedError]] (الاسم أو الـ class اتسجّلوا قبل كده)، وتقدر تقول إزاي تتجنب التاني في ملف ممكن يتحمّل مرتين ([[if (!customElements.get("user-x"))]]).`, sol: R`~~~live 150 الأخطاء التلاتة جوه try/catch
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
function tryDefine(label, name, cls) {
  try {
    customElements.define(name, cls);
    log(label + ": OK");
  } catch (e) {
    log(label + ": " + e.name + " | " + (e instanceof DOMException) + " | " + e.message);
  }
}
class UserX extends HTMLElement {}
tryDefine("1 usercard", "usercard", class extends HTMLElement {});
tryDefine("2 user-x first", "user-x", UserX);
tryDefine("2 user-x again", "user-x", class extends HTMLElement {});
tryDefine("3 same class, new name", "user-y", UserX);
// الحل الآمن لملف ممكن يتحمّل مرتين:
if (!customElements.get("user-x")) customElements.define("user-x", class extends HTMLElement {});
log("safe define: no error, get = " + customElements.get("user-x").name);
</script>
~~~

~~~text الناتج (Chrome 158، ونفس الناتج جوه الصفحة الحية)
1 usercard: SyntaxError | true | Failed to execute 'define' on 'CustomElementRegistry': "usercard" is not a valid custom element name
2 user-x first: OK
2 user-x again: NotSupportedError | true | Failed to execute 'define' on 'CustomElementRegistry': the name "user-x" has already been used with this registry
3 same class, new name: NotSupportedError | true | Failed to execute 'define' on 'CustomElementRegistry': this constructor has already been used with this registry
safe define: no error, get = UserX
~~~

- **[[tryDefine]]:** دالة صغيرة بتلف كل [[define]] في [[try/catch]] عشان أول error ميوقفش الباقي، وبتطبع [[e.name]] (نوع الـ error) و [[instanceof DOMException]] (كلهم أخطاء المتصفح مش [[Error]] عادي) والرسالة بنصها.
- **الأول [[SyntaxError]]:** [["usercard"]] من غير [[-]]، فالاسم نفسه مش صالح. نفس الحاجة لو فيه حرف كبير ([["User-card"]]).
- **التاني والتالت [[NotSupportedError]] بس برسالتين مختلفتين:** الاسم اتسجّل قبل كده («the name ... has already been used»)، والـ class نفسه اتسجّل قبل كده («this constructor has already been used»). يعني كل اسم ليه class واحد، وكل class ليه اسم واحد.
- **الحل الآمن:** [[if (!customElements.get("user-x"))]] قبل [[define]]. [[get]] بترجّع الـ class المسجّل أو [[undefined]]، فالملف لو اتحمّل مرتين (مثلًا من صفحتين أو من HMR) المرة التانية بتعدّي من غير error.

**الغلطة الشائعة:** إنك تفتكر [[define]] التانية بتستبدل الأولى (زي ما بتعمل مع متغير). لأ: الـ registry مبيتمسحش ولا بيتعدّل، والطريقة الوحيدة إنك تفحص الأول.` },
            { lvl: 'تطبيق', t: R`ابني [[<copy-button text="npm i idb">]]: زرار بيكتب «انسخ»، والضغط بيعمل [[navigator.clipboard.writeText]] للـ [[text]]، ويكتب «اتنسخ ✓» لمدة ثانيتين ويرجع، ولو النسخ فشل يكتب «مقدرتش أنسخ».`, done: R`تضغط وتعمل paste في أي حتة فيطلع النص بالظبط، والزرار بيرجع «انسخ» بعد ثانيتين، والضغط مرتين بسرعة مبيخليش النص يرجع بدري (الـ timeout القديم اتلغى)، وتغيير [[text]] من Console بينسخ القيمة الجديدة.`, sol: R`~~~live 90 copy-button.html
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  copy-button button { font: inherit; padding: 6px 14px; border-radius: 8px; border: 1px solid #888; cursor: pointer; }
</style>
<p><code>npm i idb</code> <copy-button text="npm i idb"></copy-button></p>
<script>
class CopyButton extends HTMLElement {
  #timer = 0;
  #btn = null;
  connectedCallback() {
    if (this.#btn) return;
    this.#btn = document.createElement("button");
    this.#btn.type = "button";
    this.#btn.textContent = "انسخ";
    this.#btn.addEventListener("click", () => this.copy());
    this.append(this.#btn);
  }
  disconnectedCallback() {
    clearTimeout(this.#timer);
  }
  async copy() {
    const text = this.getAttribute("text") ?? "";
    let msg;
    try {
      await navigator.clipboard.writeText(text);
      msg = "اتنسخ ✓";
    } catch (e) {
      msg = "مقدرتش أنسخ";
      console.warn("copy failed:", e.name);
    }
    this.#btn.textContent = msg;
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => (this.#btn.textContent = "انسخ"), 2000);
  }
}
customElements.define("copy-button", CopyButton);
</script>
~~~

> **الصفحة الحية فوق هتكتب «مقدرتش أنسخ»، وده صح:** هي شغالة جوه iframe معزول ([[sandbox]]) ممنوع عليه الـ clipboard، فـ [[writeText]] بترمي [[NotAllowedError]] والفرع التاني بيشتغل. احفظها [[copy-button.html]] وافتحها من سيرفر محلي ([[npx serve]]) تلاقي النسخ شغال.

~~~text الناتج (Chrome 158 من localhost، Playwright بيضغط ويقرا الـ clipboard)
after click: اتنسخ ✓
clipboard: npm i idb
t=2.6s (second click at 1.6s): اتنسخ ✓
t=3.8s: انسخ
clipboard after attr change: npm i lit
~~~

~~~text الناتج جوه الصفحة الحية (sandbox)
Permissions policy violation: The Clipboard API has been blocked because of a permissions policy applied to the current document.
copy failed: NotAllowedError
after click: مقدرتش أنسخ
~~~

- **[[if (this.#btn) return;]]:** [[connectedCallback]] بيتنادى تاني لو العنصر اتنقل لمكان تاني في الصفحة، فمن غير السطر ده هيبقى عندك زرارين.
- **[[getAttribute("text")]] جوه [[copy()]] مش في [[connectedCallback]]:** بنقرا القيمة وقت الضغط، فتغيير [[text]] من Console بينسخ الجديد من غير [[observedAttributes]] (السطر الأخير في الناتج).
- **[[await navigator.clipboard.writeText]] جوه [[try]]:** بترجّع Promise بيترفض لو الصفحة مش secure context (مش https ولا localhost)، أو مفيش إذن، أو جوه iframe ممنوع.
- **[[clearTimeout(this.#timer)]] قبل [[setTimeout]] الجديد:** ده سر «الضغط مرتين بسرعة». الضغطة التانية عند 1.6 ثانية لغت الـ timer القديم، فعند 2.6 ثانية لسه «اتنسخ ✓»، والرجوع حصل بعد ثانيتين من **آخر** ضغطة (3.8).
- **[[disconnectedCallback]]:** لو العنصر اتشال والـ timer لسه شغال، بنلغيه عشان ميكتبش في زرار مش موجود.

**الغلطة الشائعة:** تنسى [[clearTimeout]]، فالضغطة الأولى ترجّع «انسخ» بدري وانت لسه ضاغط التانية من نص ثانية.` },
            { lvl: 'تحدي', t: R`صلّح باج الـ upgrade: الكود بيعمل [[el.name = "Sara"]] على [[<user-card>]] **قبل** [[customElements.define]] (السكربت اتحمّل متأخر)، والـ class فيه [[set name(v)]] بيرسم. الاسم مبيظهرش. صلّحها في [[connectedCallback]]، وخبّي العنصر لحد ما يتعرّف بـ [[user-card:not(:defined)]].`, done: R`قبل التصليح [[el.textContent]] فاضي و [[Object.hasOwn(el, "name")]] بـ [[true]] (الـ property العادية غطّت الـ setter)، وبعد التصليح (تقرا القيمة، و [[delete this.name]]، وتحطها تاني) بيرسم «Sara»، والصفحة مبيبانش فيها العنصر فاضي قبل التعريف، و [[customElements.whenDefined("user-card")]] بيتحل بعد [[define]].`, sol: R`~~~live 200 باج الـ upgrade وتصليحه
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  user-card:not(:defined) { visibility: hidden; }
  user-card { display: inline-block; padding: 6px 12px; border: 1px solid #999; border-radius: 8px; }
</style>
<user-card id="a"></user-card>
<user-card id="b"></user-card>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
// السكربت ده اشتغل قبل ما ملف الـ component يتحمّل
const a = document.querySelector("#a");
const b = document.querySelector("#b");
a.name = "Sara";
b.name = "Ali";
log("before define: hasOwn(a, 'name') = " + Object.hasOwn(a, "name") + " | :defined = " + a.matches(":defined"));
customElements.whenDefined("user-card").then(() => log("whenDefined resolved"));

// النسخة البايظة: setter بس، من غير تصليح
class BrokenCard extends HTMLElement {
  set name(v) { this.textContent = "Hi " + v; }
  get name() { return this.textContent.slice(3); }
}
// النسخة المصلّحة
class UserCard extends HTMLElement {
  #name = "";
  connectedCallback() {
    this.#upgrade("name");
    if (!this.textContent) this.#render();
  }
  #upgrade(prop) {
    if (Object.hasOwn(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  set name(v) { this.#name = String(v); this.#render(); }
  get name() { return this.#name; }
  #render() { this.textContent = "Hi " + (this.#name || "Guest"); }
}

// عشان نقارن: نسجّل البايظة باسم تاني على عنصر جديد بنفس المشكلة
const c = document.createElement("broken-card");
c.name = "Mona";
document.body.append(c);
customElements.define("broken-card", BrokenCard);
log("broken: text = '" + c.textContent + "' | hasOwn = " + Object.hasOwn(c, "name"));

setTimeout(() => {
  customElements.define("user-card", UserCard);
  log("fixed: a = '" + a.textContent + "', b = '" + b.textContent + "' | hasOwn(a) = " + Object.hasOwn(a, "name"));
  a.name = "Sara Ahmed";
  log("setter works now: '" + a.textContent + "'");
}, 500);
</script>
~~~

~~~text الناتج (Chrome 158، ونفسه في الصفحة الحية)
before define: hasOwn(a, 'name') = true | :defined = false
broken: text = '' | hasOwn = true
fixed: a = 'Hi Sara', b = 'Hi Ali' | hasOwn(a) = false
setter works now: 'Hi Sara Ahmed'
whenDefined resolved
~~~

**ليه الاسم مبيظهرش؟** قبل [[define]] العنصر [[HTMLElement]] عادي مفيهوش setter اسمه [[name]]، فـ [[a.name = "Sara"]] بتعمل property عادية **على العنصر نفسه** ([[hasOwn]] بـ [[true]]). وبعد الـ upgrade الـ setter موجود على الـ prototype، بس الـ property اللي على العنصر بتغطّيه: القراية والكتابة بيروحوا لها هي. عشان كده [[broken-card]] نصه فاضي.

**التصليح سطر سطر ([[#upgrade]]):**

- [[Object.hasOwn(this, prop)]]: فيه property اتحطت على العنصر قبل الـ upgrade؟
- [[const value = this[prop]]]: احفظ القيمة.
- [[delete this[prop]]]: امسح الـ property اللي بتغطّي، فـ [[this.name]] يرجع يوصل للـ setter اللي على الـ prototype.
- [[this[prop] = value]]: حطها تاني، والمرة دي بتعدّي من الـ setter فبيرسم.

- **[[user-card:not(:defined) { visibility: hidden; }]]:** العنصرين مخفيين لحد الـ [[define]] (نص ثانية في المثال)، فمحدش يشوف كارت فاضي. [[visibility]] مش [[display: none]] عشان المكان يفضل محجوز والصفحة متتنططش.
- **ترتيب الناتج:** «whenDefined resolved» طلعت **بعد** باقي السطور مع إن [[define]] قبلها: الـ Promise بيتحل في microtask، يعني بعد ما الكود اللي شغال دلوقتي (جوه الـ [[setTimeout]]) يخلص.

**الغلطة الشائعة:** تحط التصليح في الـ [[constructor]]. بيشتغل هنا، بس الشكل المعتمد (اللي Lit وغيره بيعملوه) في [[connectedCallback]] أو أول ما الـ class يجهز، ولكل property عامة ممكن حد يحطها بدري، مش [[name]] بس.` },
          ],
          flag: "script",
          deep: {
            why: R`عايز component (كارت، زرار، date picker) يشتغل في أي صفحة: React أو Vue أو HTML عادي أو CMS، من غير ما تعيد كتابته لكل framework. Web Components جزء من المتصفح نفسه، فمش محتاجة مكتبة ولا build. Design systems كبيرة (زي Shoelace/Web Awesome و Material Web) مبنية كده.`,
            how: R`[[customElements]] هو الـ registry (السجل) بتاع الصفحة. [[define(name, Class)]] بيربط الاسم بالـ class، والمتصفح بيعمل «upgrade» لكل [[<user-card>]] موجود: يشغّل الـ [[constructor]]، وبعدين [[attributeChangedCallback]] لكل attribute متابَع موجود، وبعدين [[connectedCallback]].

[[static observedAttributes]]: الـ attributes اللي عايز تتبلّغ بيها. أي attribute تاني (زي [[title]]) بيتغير من غير ما الـ callback يتنادى.

[[super()]] لازم أول سطر في الـ constructor (عشان [[HTMLElement]] يتجهز). ومتقراش attributes ولا تضيف أولاد في الـ constructor: لو العنصر اتعمل بـ [[createElement]] لسه معندوش attributes. اعمل ده في [[connectedCallback]].

الاسم لازم فيه [[-]] وحروف صغيرة: ده اللي بيفرّق الـ custom elements عن الـ tags الحقيقية (HTML عمره ما هيضيف tag فيه [[-]]). وكل اسم بيتسجّل مرة واحدة في الصفحة.`,
            when: R`components لازم تشتغل في أكتر من framework أو في صفحات مش بتاعتك (widgets، embeds)، و design systems، وصفحات من غير build. لتطبيق React كامل جوه React، الـ components العادية أسهل.`,
            mistakes: R`اسم من غير [[-]]: [[SyntaxError: ... is not a valid custom element name]]. وتسجّل نفس الاسم مرتين (ملف اتحمّل مرتين): [[NotSupportedError: ... has already been used with this registry]]. وتقرا [[getAttribute]] في الـ constructor. وتنسى [[observedAttributes]] فالـ callback عمره ما يتنادى. والصفحة بتظهر العنصر فاضي قبل التسجيل (FOUC): [[user-card:not(:defined) { visibility: hidden; }]].`
          },
          teach: R`## الصفحة اللي اتجرّبت

اتجرّب في Chrome 156 headless (عن طريق playwright-core) وسيرفر static صغير على localhost.

~~~text wc1.html
<!doctype html>
<style>user-card:not(:defined) { visibility: hidden; }</style>
<user-card name="Sara" role="admin"></user-card>
<script>console.log("before define:", document.querySelector("user-card").textContent === "" ? "empty" : "?", customElements.get("user-card"));</script>
<script type="module" src="user-card.js"></script>
~~~

- [[<user-card>]] قبل التسجيل: المتصفح بيعتبره عنصر مجهول وفاضي، مش error.
- [[:not(:defined)]]: CSS selector بيمسك الـ custom elements اللي لسه ماتسجّلتش، فمنظهرهاش فاضية.
- [[customElements.get("user-card")]]: الـ class المسجّل بالاسم ده، أو [[undefined]].

---

## ١. [[class UserCard extends HTMLElement]]

- [[extends HTMLElement]]: الـ class بيورث كل حاجة في أي عنصر: [[getAttribute]] و [[textContent]] و [[addEventListener]] و [[remove()]].
- [[static observedAttributes = ["name", "role"]]]: [[static]] يعني الخاصية على الـ class نفسه مش على كل instance. المتصفح بيقراها مرة وقت [[define]].

---

## ٢. الـ callbacks

| الـ callback | بيتنادى إمتى |
|---|---|
| [[constructor()]] | العنصر اتعمل أو اتعمله upgrade |
| [[connectedCallback()]] | دخل الـ document |
| [[disconnectedCallback()]] | اتشال من الـ document |
| [[attributeChangedCallback(name, old, new)]] | attribute متابَع اتغير (أو اتحط أول مرة) |

- [[render()]]: دالة بتاعتنا مش من المتصفح. [[?? "Guest"]]: لو [[getAttribute]] رجّع [[null]] خد [["Guest"]].
- [[this.textContent = ...]]: [[this]] هو العنصر نفسه.

---

## ٣. الترتيب الحقيقي

~~~text Console
before define: empty undefined
constructor
attribute name: null -> Sara
attribute role: null -> admin
connected
~~~

قبل التسجيل: العنصر فاضي و [[get]] رجّع [[undefined]]. وبعد [[define]]: upgrade → [[constructor]] → [[attributeChangedCallback]] لكل attribute موجود (القيمة القديمة [[null]]) → [[connectedCallback]].

---

## ٤. اللي حصل بعدها (من الـ Console)

~~~text الناتج
text: Sara (admin)
card.setAttribute("role", "owner")    → attribute role: admin -> owner     text: Sara (owner)
card.setAttribute("title", "x")       → (ولا حاجة: مش في observedAttributes)
card.remove()                          → disconnected
~~~

### بـ [[createElement]]

~~~text الناتج
const c2 = document.createElement("user-card");   → constructor
c2.setAttribute("name", "Ali");                    → attribute name: null -> Ali
document.body.append(c2);                          → connected
c2: Ali (member) | instanceof HTMLElement: true
~~~

لاحظ: الـ constructor اتنادى **قبل** أي attribute. لو كنت قريت [[getAttribute("name")]] في الـ constructor كان رجع [[null]].

---

## ٥. الأخطاء

~~~text الناتج
SyntaxError: Failed to execute 'define' on 'CustomElementRegistry': "usercard" is not a valid custom element name
NotSupportedError: Failed to execute 'define' on 'CustomElementRegistry': the name "user-card" has already been used with this registry
~~~

و [[await customElements.whenDefined("user-card")]] بيستنى لحد ما الاسم يتسجّل (لو الكود اللي بيستخدمه اشتغل قبل ملف الـ component).

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[customElements.define("x-y", Class)]] | سجّل tag، والاسم فيه [[-]] |
| [[observedAttributes]] | الـ attributes اللي تتبلّغ بيها |
| [[connectedCallback]] | المكان الصح للـ render والـ listeners |
| [[disconnectedCallback]] | نضّف (timers، listeners على [[window]]) |
| [[:not(:defined)]] | خبّي العنصر لحد ما يتسجّل |`,
          lines: [
            R`بنعرّف class بيورث [[HTMLElement]]، فالعنصر بتاعنا يبقى عنصر HTML حقيقي بكل خصايصه ([[getAttribute]] و [[textContent]] والـ events). من غير الوراثة دي المتصفح مش هيقدر يعمل منه عنصر.`,
            R`[[observedAttributes]]: الـ attributes اللي عايزين المتصفح يبلّغنا لما تتغير. [[static]] لأن المتصفح بيقراها من الـ class نفسه مرة وقت [[define]]. أي attribute مش في الليستة بيتغير من غير ما [[attributeChangedCallback]] تتنادى.`,
            R`الـ [[constructor]] بيتنادى لما العنصر يتعمل (من الـ HTML أو [[createElement]])، قبل ما يدخل الصفحة. متقراش attributes هنا: مع [[createElement]] لسه متحطتش، فـ [[getAttribute]] هترجّع [[null]].`,
            R`[[super()]] بينادي constructor بتاع [[HTMLElement]]. لازم يبقى أول سطر: قبله [[this]] مش موجود، وأي استخدام ليه يرمي [[ReferenceError]].`,
            R`سطر للتجربة: نشوف في الـ console إمتى الـ constructor اتنادى بالنسبة للـ callbacks التانية.`,
            R`نهاية الـ [[constructor]].`,
            R`[[connectedCallback]]: بيتنادى كل ما العنصر يدخل الصفحة. ده المكان الصح ترسم فيه وتبدأ timers. ولو العنصر اتنقل من مكان لمكان بيتنادى تاني، فخليه ميعملش حاجة مرتين.`,
            R`سطر للتجربة: يبيّن إن connected بيتنادى بعد الـ constructor والـ attributes.`,
            R`ارسم المحتوى أول ما العنصر يدخل الصفحة. الرسم في دالة لوحده لأننا هنحتاجه تاني لما attribute يتغير.`,
            R`نهاية [[connectedCallback]].`,
            R`[[disconnectedCallback]]: بيتنادى لما العنصر يتشال من الصفحة. هنا تنضّف أي حاجة بدأتها في connected (timers أو listeners على [[window]])، وإلا تفضل شغالة بعد ما العنصر اختفى.`,
            R`سطر للتجربة: نتأكد إن الشيلة اتلقطت.`,
            R`نهاية [[disconnectedCallback]].`,
            R`[[attributeChangedCallback]]: بيتنادى لما attribute من اللي في [[observedAttributes]] يتغير، ومعاه اسمه وقيمته القديمة والجديدة. وبيتنادى كمان لكل attribute موجود في الـ HTML من الأول، قبل [[connectedCallback]].`,
            R`اطبع اسم الـ attribute والقيمة القديمة والجديدة. أول مرة القيمة القديمة بتبقى [[null]] لأن الـ attribute مكانش موجود قبلها.`,
            R`ارسم تاني عشان النص يعكس القيمة الجديدة على طول، من غير ما اللي غيّر الـ attribute يعمل حاجة زيادة.`,
            R`نهاية [[attributeChangedCallback]].`,
            R`[[render]] دالة بتاعتنا (مش من المتصفح): بتكتب المحتوى من الـ attributes الحالية. الـ callbacks الاتنين بينادوها، فالرسم مكتوب في مكان واحد.`,
            R`اقرا [[name]]. [[getAttribute]] بترجّع [[null]] لو الـ attribute مش موجود، و [[??]] بتحط [[Guest]] بدلها. ([[??]] مش [[||]]: لو كتبت [[name=""]] النص الفاضي يفضل فاضي.)`,
            R`اقرا [[role]] بنفس الطريقة، والافتراضي [[member]].`,
            R`اكتب الاسم والدور كنص جوه العنصر. [[textContent]] مش [[innerHTML]]، فلو الاسم فيه [[<script>]] هيتعرض كنص ومش هيتنفّذ.`,
            R`نهاية [[render]].`,
            R`نهاية الـ class.`,
            R`سجّل الـ tag [[user-card]] واربطه بالـ class: من اللحظة دي أي [[<user-card>]] في الصفحة (موجود أو هيتضاف) يبقى instance منه. الاسم لازم فيه [[-]] عشان ميتلخبطش مع tags الـ HTML الحالية أو اللي هتتضاف بعدين.`,
          ],
          sol: R`الترتيب الحقيقي في Chrome 156:
[[constructor]] ← [[attribute name: null -> Sara]] ← [[attribute role: null -> admin]] ← [[connected]].
[[setAttribute("role", "owner")]] ← [[attribute role: admin -> owner]] والنص بقى [[Sara (owner)]].
[[remove()]] ← [[disconnected]].
[[define("usercard", ...)]] ← [[SyntaxError: ... "usercard" is not a valid custom element name]].`
        },
        {
          cmd: "shadow DOM",
          title: "shadow DOM: CSS جوه الـ component ميهربش ومحدش يدخله",
          ref: [
            { t: "MDN: Using shadow DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM" },
            { t: "MDN: :host", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host" },
            { t: "MDN: ::part()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part" },
            { t: "MDN: ShadowRoot.adoptedStyleSheets", url: "https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets" },
            { t: "MDN: Event.composedPath()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath" },
            { t: "MDN: Event.composed", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/composed" },
          ],
          pre: [
            { to: "css/CSS variables", why: R`الـ custom properties ([[--tag-bg]]) هي الطريقة الرسمية تغيّر شكل الـ component من بره` },
          ],
          desc: R`[[this.attachShadow({ mode: "open" })]] بيدّي العنصر DOM خاص بيه (shadow root): الـ CSS اللي جواه مبيأثرش على الصفحة، و CSS الصفحة مبيدخلوش. فـ [[p { color: red }]] في الصفحة مش هيلوّن الـ [[<p>]] اللي جوه الـ component.

الطرق الرسمية للتخصيص من بره: CSS custom properties ([[--tag-bg]]) بتعدّي جوه، و [[::part(name)]] لعناصر الـ component علّم عليها بـ [[part]]، و [[:host]] جوه بيستايل العنصر نفسه.`,
          example: R`const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt
  :host { display: inline-block; padding: 4px 8px; border-radius: 6px; background: var(--tag-bg, #eee); }
  :host([sale]) { background: #fde68a; }
  p { margin: 0; color: green; font-weight: bold; }
$__bt);
class PriceTag extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet];
    root.innerHTML = $__bt<p part="amount"></p>$__bt;
  }
  connectedCallback() {
    this.shadowRoot.querySelector("p").textContent = $__bt$__{this.getAttribute("amount") ?? 0} EGP$__bt;
  }
}
customElements.define("price-tag", PriceTag);`,
          try: R`احفظ المثال [[price-tag.js]]، واعمل صفحة فيها [[p { color: red; }]] و [[price-tag { --tag-bg: #dbeafe; }]] و [[price-tag::part(amount) { font-size: 20px; }]]، وفيها [[<p>]] عادي و [[<price-tag amount="250">]] و [[<price-tag amount="99" sale>]]. لون أنهي [[p]] أحمر؟ وجرّب [[document.querySelectorAll("p").length]] و [[getComputedStyle]] على الـ [[p]] اللي جوه.`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين جرّب: نفس [[PriceTag]] مرة بـ [[mode: "open"]] ومرة بـ [[mode: "closed"]]. إيه ناتج [[el.shadowRoot]] و [[document.querySelector("price-tag p")]] في كل مرة؟`, done: R`في الـ open [[el.shadowRoot]] بيرجّع ShadowRoot وفي الـ closed بيرجّع [[null]]، و [[querySelector]] من الـ document بيرجّع [[null]] في الحالتين (مبيدخلش جوه الـ shadow)، و [[el.shadowRoot.querySelector("p")]] بيلاقيه في الـ open بس.`, sol: R`~~~live 150 open و closed جنب بعض
<price-tag amount="250"></price-tag>
<price-tag-closed amount="99"></price-tag-closed>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
function makeTag(mode) {
  return class extends HTMLElement {
    #root;
    constructor() {
      super();
      this.#root = this.attachShadow({ mode });
      this.#root.innerHTML = "<p part='amount'></p>";
    }
    connectedCallback() {
      this.#root.querySelector("p").textContent = (this.getAttribute("amount") ?? 0) + " EGP";
    }
  };
}
customElements.define("price-tag", makeTag("open"));
customElements.define("price-tag-closed", makeTag("closed"));
const open = document.querySelector("price-tag");
const closed = document.querySelector("price-tag-closed");
log("open.shadowRoot:   " + open.shadowRoot);
log("closed.shadowRoot: " + closed.shadowRoot);
log("document.querySelector('price-tag p'):        " + document.querySelector("price-tag p"));
log("document.querySelector('price-tag-closed p'): " + document.querySelector("price-tag-closed p"));
log("open.shadowRoot.querySelector('p'): " + open.shadowRoot.querySelector("p").textContent);
</script>
~~~

~~~text الناتج (Chrome 158، ونفسه في الصفحة الحية)
open.shadowRoot:   [object ShadowRoot]
closed.shadowRoot: null
document.querySelector('price-tag p'):        null
document.querySelector('price-tag-closed p'): null
open.shadowRoot.querySelector('p'): 250 EGP
~~~

- **[[makeTag(mode)]]:** دالة بترجّع class، عشان نعمل نفس الـ component بالـ mode الاتنين من غير ما نكرر الكود. واتسجّلوا باسمين لأن الاسم الواحد ميتسجّلش مرتين (التمرين اللي فات).
- **[[#root]]:** الـ class بيحفظ الـ shadow root في private field، لأن في الـ [[closed]] [[this.shadowRoot]] نفسها [[null]] حتى جوه الـ class. ده الشكل الصح لأي component: متعتمدش على [[this.shadowRoot]].
- **[[closed.shadowRoot]] بـ [[null]]:** الفرق الوحيد بين الاتنين إن الـ open بيدّي اللي بره مفتاح ([[el.shadowRoot]]) والـ closed لأ.
- **[[document.querySelector("price-tag p")]] بـ [[null]] في الحالتين:** الـ selectors من الـ document مبتدخلش أي shadow root، open أو closed. عشان تلاقي الـ [[p]] لازم تبدأ من الـ shadow root نفسه، وده متاح في الـ open بس.

**الغلطة الشائعة:** تفتكر [[closed]] حماية أمنية. لأ: أي كود في الصفحة يقدر يغيّر [[Element.prototype.attachShadow]] قبل ما الـ component يتحمّل ويمسك الـ root. الـ closed بيمنع الكود اللي بره يعتمد على تفاصيل جوه بالغلط، بس كمان بيصعّب الاختبارات والـ DevTools extensions، فمعظم المكتبات بتستخدم [[open]].` },
            { lvl: 'تطبيق', t: R`ابني theming لـ [[price-tag]]: [[--tag-bg]] و [[--tag-color]] و [[--tag-radius]] بقيم default جوه الـ component، وصفحة فيها زرار dark mode بيغيّر الـ variables على [[:root]] بس، و [[::part(amount)]] للخط.`, done: R`زرار الـ dark بيغيّر شكل كل الـ tags مع بعض، والـ tag من غير أي variable متعرّف بياخد الـ default، و [[p { color: red }]] في الصفحة مبيأثرش جوه، لكن [[font-family]] على [[body]] بيوصل جوه (الخصائص اللي بتتورث بتعدّي الـ shadow boundary).`, sol: R`~~~live 170 theming بالـ variables و ::part
<style>
  :root { --tag-bg: #eef6ff; --tag-color: #0b3d91; }
  :root.dark { --tag-bg: #1f2937; --tag-color: #fde68a; --tag-radius: 999px; }
  body { font-family: Georgia, serif; margin: 16px; }
  :root.dark body { background: #111827; color: #e5e7eb; }
  p { color: red; }
  price-tag::part(amount) { font-size: 20px; letter-spacing: 1px; }
  .plain { --tag-bg: initial; }
</style>
<button id="theme" type="button">dark mode</button>
<p>الفقرة دي بتاعة الصفحة (حمرا)</p>
<price-tag amount="250"></price-tag>
<price-tag amount="99" sale></price-tag>
<price-tag amount="40" class="plain"></price-tag>
<script>
const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt
  :host {
    display: inline-block; padding: 4px 10px; margin: 4px;
    background: var(--tag-bg, #eee);
    color: var(--tag-color, #222);
    border-radius: var(--tag-radius, 6px);
  }
  :host([sale]) { outline: 2px dashed currentColor; }
  p { margin: 0; font-weight: bold; }
$__bt);
class PriceTag extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet];
    root.innerHTML = $__bt<p part="amount"></p>$__bt;
  }
  connectedCallback() {
    this.shadowRoot.querySelector("p").textContent = $__bt$__{this.getAttribute("amount") ?? 0} EGP$__bt;
  }
}
customElements.define("price-tag", PriceTag);
document.querySelector("#theme").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
</script>
~~~

~~~text الناتج (Chrome 158: getComputedStyle على كل tag من بره ومن جوه الـ shadow، قبل وبعد زرار dark)
light:
250: bg=rgb(238, 246, 255) radius=6px | p color=rgb(11, 61, 145) font=Georgia, serif size=20px
99: bg=rgb(238, 246, 255) radius=6px | p color=rgb(11, 61, 145) font=Georgia, serif size=20px
40: bg=rgb(238, 238, 238) radius=6px | p color=rgb(11, 61, 145) font=Georgia, serif size=20px
dark:
250: bg=rgb(31, 41, 55) radius=999px | p color=rgb(253, 230, 138) font=Georgia, serif size=20px
99: bg=rgb(31, 41, 55) radius=999px | p color=rgb(253, 230, 138) font=Georgia, serif size=20px
40: bg=rgb(238, 238, 238) radius=999px | p color=rgb(253, 230, 138) font=Georgia, serif size=20px
page p color: rgb(255, 0, 0)
~~~

**هتشوف إيه:** ٣ tags بالأزرق الفاتح (التالت رمادي)، وزرار dark بيقلب الصفحة والـ tags مع بعض لخلفية غامقة وخط أصفر وحواف مدوّرة، من غير ما يلمس الـ component.

- **[[var(--tag-bg, #eee)]] جوه [[:host]]:** القيمة التانية هي الـ default. الـ CSS custom properties بتتورث زي [[color]]، فبتعدّي الـ shadow boundary: اللي بتحطه على [[:root]] بيوصل لكل tag.
- **[[--tag-radius]] مش متعرّف في الـ light:** فكل الـ tags خدت [[6px]] الـ default. وفي الـ dark اتعرّف على [[:root.dark]] فبقى [[999px]].
- **[[.plain { --tag-bg: initial; }]]:** [[initial]] لـ custom property معناها «مش متعرّف»، فالـ tag التالت رجع للـ default [[#eee]] في الحالتين. كده جرّبنا «tag من غير variable بياخد الـ default».
- **[[p { color: red; }]] في الصفحة:** الفقرة بتاعة الصفحة حمرا ([[rgb(255, 0, 0)]])، والـ [[p]] اللي جوه الـ tags لونها من [[--tag-color]]: selectors الصفحة مبتدخلش.
- **[[font=Georgia, serif]] جوه:** [[font-family]] خاصية بتتورث، والـ shadow root بيورث من الـ host، فخط الـ [[body]] وصل جوه من غير ما نعمل حاجة. [[color]] كمان بيتورث، بس إحنا غطّيناه بـ [[--tag-color]].
- **[[price-tag::part(amount)]]:** الطريقة الرسمية الوحيدة تستايل عنصر جوه الـ shadow من بره: الـ [[p]] عليه [[part="amount"]]، فخد [[20px]].
- **الزرار بيعمل [[classList.toggle("dark")]] على [[<html>]] بس:** كل التغيير CSS، ومفيش ولا سطر JS في الـ component اتغيّر.

**الغلطة الشائعة:** تكتب [[price-tag p { ... }]] من بره وتستغرب إنه مبيشتغلش. من بره عندك ٣ أبواب بس: الخصائص اللي بتتورث، والـ custom properties، و [[::part]].` },
            { lvl: 'تحدي', t: R`اتوقع وصلّح: listener على [[document]] لـ [[click]]، واضغط على الـ [[<p>]] اللي جوه الـ shadow. اطبع [[e.target.tagName]] و [[e.composedPath().at(0).tagName]]. وبعدين ابعت من جوه [[new CustomEvent("price-click", { bubbles: true })]] وشوف الـ document بيستقبله ولا لأ.`, done: R`[[e.target.tagName]] بيطلع [[PRICE-TAG]] (retargeting) و [[composedPath().at(0)]] بيطلع [[P]]، والـ [[price-click]] مبيوصلش الـ document لحد ما تزوّد [[composed: true]]، وبعدها بيوصل، وتقدر تقول ليه الـ [[click]] العادي وصل من غير ما تعمل حاجة (الأحداث المدمجة composed).`, sol: R`~~~live 120 retargeting و composed
<price-tag amount="250"></price-tag>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
class PriceTag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "<p part='amount'>250 EGP</p>";
    const p = this.shadowRoot.querySelector("p");
    p.addEventListener("click", (e) => {
      log("inside: e.target = " + e.target.tagName);
      p.dispatchEvent(new CustomEvent("price-click", { bubbles: true }));
      p.dispatchEvent(new CustomEvent("price-click", { bubbles: true, composed: true, detail: { fixed: true } }));
    });
  }
}
customElements.define("price-tag", PriceTag);
document.addEventListener("click", (e) => {
  log("document click: target = " + e.target.tagName + " | composedPath().at(0) = " + e.composedPath().at(0).tagName + " | composed = " + e.composed);
});
document.addEventListener("price-click", (e) => {
  log("document got price-click, composed = " + e.composed + " | target = " + e.target.tagName);
});
document.querySelector("price-tag").shadowRoot.querySelector("p").click();
</script>
~~~

~~~text الناتج (Chrome 158، ونفسه في الصفحة الحية)
inside: e.target = P
document got price-click, composed = true | target = PRICE-TAG
document click: target = PRICE-TAG | composedPath().at(0) = P | composed = true
~~~

- **[[e.target]] جوه = [[P]]، ومن الـ document = [[PRICE-TAG]]:** ده الـ retargeting. أول ما الحدث يخرج من الـ shadow root، المتصفح بيغيّر [[target]] للـ host عشان اللي بره ميشوفش تفاصيل جوه.
- **[[e.composedPath().at(0)]] = [[P]]:** المسار الكامل اللي الحدث مشي فيه، من أعمق عنصر للـ [[window]]. وفي shadow root [[closed]] الـ path من بره بيقف عند الـ host.
- **أول [[price-click]] ([[bubbles: true]] بس) مااتطبعش خالص:** [[bubbles]] بيطلّعه لحد الـ shadow root ويقف هناك. الحدث اللي اتطبع هو التاني اللي فيه [[composed: true]]، وكمان اتعمله retargeting لـ [[PRICE-TAG]].
- **ليه الـ [[click]] وصل من غير ما نعمل حاجة؟** [[composed = true]]: المتصفح بيعمل أحداث الـ UI المدمجة ([[click]] و [[input]] و [[keydown]] و [[focus]]...) composed من الأول.
- **الترتيب:** [[price-click]] اتطبع **قبل** [[click]] على الـ document، لأن [[dispatchEvent]] متزامن: اتنفّذ جوه listener الـ [[p]] قبل ما الـ [[click]] الأصلي يكمّل طلوعه للـ document.

**الغلطة الشائعة:** تبعت [[CustomEvent]] من جوه الـ shadow بـ [[bubbles: true]] وتنسى [[composed: true]]، فاللي بيستخدم الـ component يسمع على العنصر من بره ومفيش حاجة توصل. (البديل: ابعته من [[this]] نفسه، الـ host، وساعتها [[bubbles]] كفاية.)` },
          ],
          flag: "script",
          deep: {
            why: R`أي component بيتحط في صفحة مش بتاعتك بيواجه مشكلتين: CSS الصفحة بيبوّظه ([[p { color: red }]] أو [[* { box-sizing }]] أو reset)، و CSS بتاعه بيبوّظ الصفحة. الـ shadow DOM بيحل الاتنين من غير BEM ولا CSS modules.`,
            how: R`[[attachShadow]] بيعمل shadow root متعلّق بالعنصر (الـ host). اللي جوه shadow root ليه scope لوحده: الـ selectors اللي جوه مبتشوفش بره والعكس، و [[document.querySelector]] مبيدخلوش. [[mode: "open"]] معناها [[el.shadowRoot]] متاح من بره (للأدوات والاختبارات)، و [["closed"]] بيرجّع [[null]].

اللي بيعدّي جوه: الخصائص اللي بتتورث (inherited) زي [[color]] و [[font-family]] بتتورث من الـ host عادي، والـ CSS custom properties ([[--x]]) كمان. فـ [[var(--tag-bg, #eee)]] بياخد القيمة من الصفحة أو [[#eee]].

[[:host]] = العنصر نفسه من جوه، و [[:host([sale])]] = لو عليه attribute [[sale]]. وقواعد الصفحة على الـ host نفسه ([[price-tag { background: pink }]]) **بتكسب** على [[:host]]: الـ component بيحط افتراضي والصفحة تقدر تغيّره.

[[CSSStyleSheet]] + [[replaceSync]] + [[adoptedStyleSheets]] (Constructable Stylesheets): الـ CSS بيتعمل parse مرة واحدة ويتشارك بين كل الـ instances، بدل [[<style>]] في كل واحد.`,
            when: R`أي component هيتحط في صفحات تانية، أو design system. ولو component داخلي في تطبيقك والـ CSS بتاعك متحكم فيه، ممكن متحتاجش shadow DOM (وتستخدم الـ light DOM عادي).`,
            mistakes: R`تحط [[<link rel="stylesheet">]] بتاع الموقع وتستغرب إنه مش بيأثر جوه. وفورمات جوه shadow DOM: [[<input>]] جوه shadow root مش بيتبعت مع [[<form>]] بره (محتاج form-associated custom elements و [[ElementInternals]]). و [[document.querySelector]] في الاختبارات مش لاقي العنصر: ادخل بـ [[el.shadowRoot.querySelector]] (و Playwright بيدخل الـ open shadow لوحده). و [[mode: "closed"]] فاكره حماية: مش أمان، بس بيصعّب الاختبار.`
          },
          teach: R`## الصفحة

اتجرّب في Chrome 156 headless، والقيم من [[getComputedStyle]] (القيمة النهائية بعد كل الـ CSS).

~~~text wc2.html
<style>
  p { color: red; }
  price-tag { --tag-bg: #dbeafe; }
  price-tag::part(amount) { font-size: 20px; }
</style>
<p id="page-p">paragraph in the page</p>
<price-tag amount="250"></price-tag>
<price-tag amount="99" sale></price-tag>
~~~

---

## ١. الـ stylesheet المشترك

~~~text price-tag.js
const sheet = new CSSStyleSheet();
sheet.replaceSync($__bt ... $__bt);
~~~

- [[new CSSStyleSheet()]]: stylesheet فاضي من JavaScript.
- [[replaceSync(css)]]: حط فيه الـ CSS ده. بيتعمل مرة واحدة بره الـ class، فكل الـ [[price-tag]] بيشاوروا على نفس الـ object.
- جوه الـ CSS:
  - [[:host { ... background: var(--tag-bg, #eee); }]]: العنصر نفسه. [[var(--tag-bg, #eee)]] = قيمة المتغير لو موجود، وإلا [[#eee]].
  - [[:host([sale])]]: العنصر لو عليه [[sale]].
  - [[p { color: green }]]: الـ [[p]] اللي **جوه** الـ shadow root بس.

---

## ٢. الـ constructor

- [[this.attachShadow({ mode: "open" })]]: اعمل shadow root ورجّعه. ومن ساعتها [[this.shadowRoot]] بيشاور عليه.
- [[root.adoptedStyleSheets = [sheet]]]: استخدم الـ stylesheet المشترك جوه.
- [[root.innerHTML = $__bt<p part="amount"></p>$__bt]]: محتوى الـ shadow. [[part="amount"]] بيعلّم العنصر ده إن الصفحة مسموحلها تستايله بـ [[::part(amount)]].

و [[connectedCallback]] بيكتب [[250 EGP]] جوه الـ [[p]] اللي في الـ shadow.

---

## ٣. النتيجة

~~~text الناتج
page p color: rgb(255, 0, 0)
shadow p color: rgb(0, 128, 0) | font-size: 20px
host bg: rgb(219, 234, 254) | sale bg: rgb(253, 230, 138)
querySelectorAll('p') from document: 1
a.textContent: '' | shadow text: '250 EGP'
shadowRoot mode: open
~~~

| السطر | معناه |
|---|---|
| [[page p]] أحمر | قاعدة الصفحة اشتغلت على [[p]] الصفحة |
| [[shadow p]] أخضر | [[p { color: red }]] ماعدّاش جوه، و [[green]] بتاع الـ component هو اللي اشتغل |
| [[font-size: 20px]] | [[::part(amount)]] من الصفحة عدّى، لأن الـ component سمح بـ [[part]] |
| [[host bg]] أزرق فاتح | [[--tag-bg]] من الصفحة عدّى جوه [[var()]] |
| [[sale bg]] أصفر | [[:host([sale])]] اشتغلت لأن العنصر عليه attribute اسمه [[sale]] |
| [[querySelectorAll('p')]] = 1 | الـ document مش شايف الـ [[p]] اللي جوه الـ shadow |
| [[textContent]] فاضي | النص في الـ shadow مش في العنصر نفسه |

[[rgb(219, 234, 254)]] هو [[#dbeafe]]: [[getComputedStyle]] بيرجّع الألوان دايمًا بصيغة [[rgb()]].

### مين يكسب؟

ضفت للصفحة [[price-tag { background: pink; font-family: monospace; }]]:

~~~text الناتج
host bg with outer rule: rgb(255, 192, 203) | inner font-family (inherited): monospace
~~~

- قاعدة الصفحة على الـ host كسبت [[:host]]: الـ component بيدّي افتراضي، والصفحة تقدر تغيّره.
- [[font-family]] بتتورث، فعدّت جوه الـ shadow عادي.

---

## الخلاصة

| من بره الـ component | بيعدّي جوه؟ |
|---|---|
| [[p { color: red }]] (selector عادي) | لأ، الـ selectors بتاعة الصفحة مبتوصلش للعناصر اللي جوه الـ shadow |
| خصائص بتتورث ([[color]] و [[font-family]] على الـ host) | آه، بتنزل من الـ host لولاده زي أي عنصر |
| [[--custom-property]] | آه، وده الطريق الرسمي عشان الصفحة تغيّر ألوان الـ component |
| [[::part(name)]] | آه، للعناصر اللي عليها [[part]] |
| [[document.querySelector]] | لأ، ادخل بـ [[el.shadowRoot]] |`,
          lines: [
            R`[[CSSStyleSheet]] جديد معمول بالـ JS (constructable stylesheet). بنعمله مرة واحدة برّه الـ class، فكل [[price-tag]] في الصفحة يستخدم نفس الـ object بدل ما كل واحد يعمل parse لنفس الـ CSS.`,
            R`[[replaceSync]] بتحط الـ CSS ده جوه الـ stylesheet. السطر ده بيفتح template literal، فالـ CSS مكتوب على كذا سطر تحته.`,
            R`[[:host]] = العنصر [[price-tag]] نفسه من جوه الـ shadow. الخلفية [[var(--tag-bg, #eee)]]: لو الصفحة عرّفت [[--tag-bg]] تاخده (الـ CSS variables بتعدّي جوه الـ shadow)، وإلا الرمادي الافتراضي. ده الطريق الرسمي للصفحة تغيّر اللون.`,
            R`[[:host([sale])]]: لو العنصر نفسه عليه attribute [[sale]] (زي [[<price-tag sale>]]) الخلفية تبقى صفرا. كده الصفحة تغيّر الشكل بـ attribute من غير ما تلمس الـ CSS اللي جوه.`,
            R`استايل للـ [[p]] اللي جوه الـ shadow بس. الـ [[p]] اللي في الصفحة مش هيتأثر، و CSS الصفحة (زي [[p { color: red; }]]) مش هيوصل للـ [[p]] ده. ده العزل اللي shadow DOM معمول عشانه.`,
            R`نهاية الـ template literal بتاع الـ CSS وقفلة [[replaceSync]].`,
            R`class العنصر، بيورث [[HTMLElement]] زي أي custom element.`,
            R`الـ [[constructor]]: هنا بنعمل الـ shadow root مرة واحدة لكل عنصر.`,
            R`[[super()]] لازم الأول قبل أي استخدام لـ [[this]].`,
            R`[[attachShadow]] بتعمل شجرة DOM مستخبية جوه العنصر وبترجّعها. [[mode: "open"]] يعني الصفحة تقدر توصلها بـ [[el.shadowRoot]] (مفيد للتست والـ debugging)؛ مع [[closed]] بترجّع [[null]]. وبتتنادى مرة واحدة بس لكل عنصر، التانية بترمي error.`,
            R`[[adoptedStyleSheets]]: ليستة الـ stylesheets اللي الـ shadow ده بيستخدمها. بنحط فيها الـ [[sheet]] المشترك، فالـ CSS يتطبّق جوه الـ shadow بس.`,
            R`محتوى الـ shadow: [[p]] فاضي هنكتب فيه السعر. [[part="amount"]] بيفتح باب للصفحة تستايل العنصر ده بالذات بـ [[price-tag::part(amount)]]، وباقي الـ shadow يفضل مقفول.`,
            R`نهاية الـ [[constructor]].`,
            R`[[connectedCallback]]: لما العنصر يدخل الصفحة، ساعتها الـ attributes بتاعته موجودة ونقدر نقراها.`,
            R`اكتب السعر جوه الـ [[p]] اللي في الـ shadow، من attribute [[amount]] أو 0. لازم [[this.shadowRoot.querySelector]] مش [[this.querySelector]]: التانية بتدوّر في أولاد العنصر العاديين (light DOM) ومش هتلاقي الـ [[p]].`,
            R`نهاية [[connectedCallback]].`,
            R`نهاية الـ class.`,
            R`سجّل [[price-tag]] واربطه بالـ class، فأي [[<price-tag>]] في الصفحة يشتغل بالـ shadow والاستايل ده.`,
          ],
          sol: R`الناتج الحقيقي في Chrome 156:
[[p]] الصفحة: [[rgb(255, 0, 0)]] (أحمر). [[p]] اللي جوه: [[rgb(0, 128, 0)]] (أخضر) و [[font-size: 20px]] من [[::part]].
خلفية الأول [[rgb(219, 234, 254)]] (من [[--tag-bg]])، والتاني [[rgb(253, 230, 138)]] (من [[:host([sale])]]).
[[document.querySelectorAll("p").length]] = [[1]]: الـ document مش شايف اللي جوه الـ shadow.`
        },
        {
          cmd: "slots",
          title: "slots: المحتوى اللي جوه الـ tag يظهر في مكان تحدده",
          ref: [
            { t: "MDN: Using templates and slots", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots" },
            { t: "MDN: ::slotted()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::slotted" },
            { t: "MDN: HTMLSlotElement.assignedNodes()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedNodes" },
            { t: "MDN: slotchange event", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event" },
          ],
          desc: R`[[<slot>]] جوه الـ shadow DOM مكان فاضي بيتملي بالأولاد اللي اليوزر كتبهم جوه الـ tag. [[<slot name="title">]] بيتملي بالعنصر اللي عليه [[slot="title"]]، و [[<slot>]] من غير اسم بياخد الباقي. والمحتوى اللي جوه [[<slot>]] نفسه بيظهر لو مفيش حاجة اتحطت (fallback).

العناصر دي بتفضل في الـ light DOM (بتاعة الصفحة)، فـ CSS الصفحة بيأثر عليها، والـ component بيستايلها بـ [[::slotted()]].`,
          example: R`class AppCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>
        article { border: 1px solid #ccc; border-radius: 8px; padding: 12px; }
        ::slotted(h3) { margin: 0 0 8px; color: navy; }
        footer { color: gray; font-size: 12px; }
      </style>
      <article>
        <slot name="title"><h3>No title</h3></slot>
        <slot></slot>
        <footer><slot name="footer">default footer</slot></footer>
      </article>$__bt;
    this.shadowRoot.querySelector("slot:not([name])").addEventListener("slotchange", (e) => {
      console.log("slotchange: body has", e.target.assignedElements().length, "element(s)");
    });
  }
}
customElements.define("app-card", AppCard);`,
          try: R`احفظ المثال [[app-card.js]] واعمل كارتين: الأول فيه [[<h3 slot="title">Order #42</h3>]] و [[<p>]] و [[<button>]]، والتاني فيه [[<p>]] بس. إيه اللي ظهر في التاني مكان العنوان والفوتر؟ وبعدين ضيف للتاني [[<span slot="footer">paid</span>]] من الـ Console، وضيف [[<p>]] جديد للأول: إمتى [[slotchange]] بيتنادى؟`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع: [[<app-card>]] جواه [[<h3 slot="title">]] و [[<p>]] كل واحد في سطر لوحده. الـ slot اللي من غير اسم: [[assignedNodes().length]] كام و [[assignedElements().length]] كام؟ وبعدين شغّل.`, done: R`[[assignedElements()]] بيرجّع 1 (الـ [[p]] بس)، و [[assignedNodes()]] بيرجّع أكتر (الـ text nodes بتاعة المسافات والسطور الجديدة بتتحسب، في الشكل ده 4)، والـ [[h3]] مش منهم لأنه راح للـ slot اللي اسمه [[title]].`, sol: R`~~~live 160 assignedNodes مقابل assignedElements
<app-card>
  <h3 slot="title">Order #12</h3>
  <p>3 items</p>
</app-card>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
class AppCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <article>
        <slot name="title"><h3>No title</h3></slot>
        <slot></slot>
      </article>$__bt;
  }
}
customElements.define("app-card", AppCard);
const slot = document.querySelector("app-card").shadowRoot.querySelector("slot:not([name])");
const nodes = slot.assignedNodes();
log("assignedNodes().length = " + nodes.length);
log("assignedElements().length = " + slot.assignedElements().length);
log("nodes: " + nodes.map(n => n.nodeType === 3 ? JSON.stringify(n.data) : n.tagName).join(" , "));
const title = document.querySelector("app-card").shadowRoot.querySelector("slot[name=title]");
log("title slot: " + title.assignedElements().map(e => e.tagName).join(","));
</script>
~~~

~~~text الناتج (Chrome 158، ونفسه في الصفحة الحية)
assignedNodes().length = 4
assignedElements().length = 1
nodes: "\n  " , "\n  " , P , "\n"
title slot: H3
~~~

- **[[assignedElements()]] = 1:** العناصر بس، يعني الـ [[<p>]].
- **[[assignedNodes()]] = 4:** كل الـ nodes اللي ملهاش [[slot]] بتروح للـ slot اللي من غير اسم، ومنهم الـ text nodes بتاعة السطر الجديد والمسافتين قبل كل عنصر. السطر التالت في الناتج بيبيّنهم: ٣ نصوص فاضية و [[P]].
- **الـ [[h3]] مش منهم:** عليه [[slot="title"]] فراح للـ slot اللي اسمه [[title]] (السطر الأخير).
- **الرقم بيتغيّر مع شكل الـ HTML:** لو كتبت [[<app-card><h3 slot="title">…</h3><p>…</p></app-card>]] في سطر واحد من غير مسافات، [[assignedNodes()]] تبقى 1.

**الغلطة الشائعة:** تستخدم [[assignedNodes().length]] عشان تعرف «فيه محتوى ولا لأ»، فالمسافات بتخليه دايمًا أكبر من صفر. استخدم [[assignedElements()]]، أو فلتر النصوص الفاضية: [[nodes.filter(n => n.nodeType === 1 || n.data.trim())]].` },
            { lvl: 'تطبيق', t: R`ابني [[<info-alert type="warning">]]: slot اسمه [[icon]] فيه fallback «⚠» (و «ℹ» لو [[type="info"]])، و slot عادي للرسالة، وزرار إغلاق جوه الـ shadow بيشيل العنصر ويبعت [[close]] event.`, done: R`alert من غير أيقونة بيظهر الـ fallback الصح حسب [[type]]، وأيقونة [[<span slot="icon">]] بتاعتك بتظهر مكانها، والإغلاق بيشيل العنصر والـ listener على العنصر بيستقبل [[close]]، والـ CSS بتاع الصفحة بيلوّن الرسالة (لأنها لسه في الـ light DOM).`, sol: R`~~~live 200 info-alert.html
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  info-alert { margin-block: 8px; }
  info-alert strong { color: #7c2d12; }
</style>
<info-alert type="warning">الباقة هتخلص <strong>بكرة</strong></info-alert>
<info-alert type="info">فيه تحديث جديد</info-alert>
<info-alert type="info"><span slot="icon">🔔</span>عندك رسالتين</info-alert>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
const ICONS = { warning: "⚠", info: "ℹ" };
class InfoAlert extends HTMLElement {
  static observedAttributes = ["type"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>
        :host { display: flex; gap: 8px; align-items: center; padding: 8px 12px; border-radius: 8px; background: #fef3c7; }
        :host([type="info"]) { background: #e0f2fe; }
        .msg { flex: 1; }
        button { border: 0; background: none; font-size: 18px; cursor: pointer; }
      </style>
      <span class="icon"><slot name="icon"><span id="fallback"></span></slot></span>
      <span class="msg"><slot></slot></span>
      <button type="button" aria-label="اقفل">×</button>$__bt;
    this.shadowRoot.querySelector("button").addEventListener("click", () => this.close());
  }
  attributeChangedCallback() { this.#renderIcon(); }
  connectedCallback() { this.#renderIcon(); }
  #renderIcon() {
    this.shadowRoot.querySelector("#fallback").textContent = ICONS[this.getAttribute("type")] ?? ICONS.info;
  }
  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    this.remove();
  }
}
customElements.define("info-alert", InfoAlert);
document.querySelectorAll("info-alert").forEach((a, i) => a.addEventListener("close", () => log("close event from alert " + (i + 1))));
</script>
~~~

~~~text الناتج (Chrome 158: Playwright قرا كل alert، وبعدين ضغط × على الأول)
warning: icon ⚠ (fallback) | strong color rgb(124, 45, 18)
info: icon ℹ (fallback) | strong color -
info: icon 🔔 (yours) | strong color -
close event from alert 1
alerts left: 2
~~~

**هتشوف إيه:** ٣ تنبيهات: الأصفر بـ ⚠، والأزرق بـ ℹ، والتالت بأيقونة الجرس اللي حطيناها بإيدنا. الضغط على × بيشيل التنبيه ويكتب تحت «close event from alert N».

- **[[<slot name="icon"><span id="fallback"></span></slot>]]:** اللي جوه الـ slot هو الـ fallback، وبيظهر بس لو مفيش عنصر عليه [[slot="icon"]]. خلّيناه [[span]] فاضي و JS بيكتب فيه الأيقونة، عشان الـ fallback يتغيّر مع [[type]].
- **[[ICONS[type] ?? ICONS.info]]:** أي [[type]] مش معروف أو مش موجود ياخد ℹ بدل ما يبقى فاضي.
- **[[observedAttributes = ["type"]]] و [[#renderIcon]]:** تغيير [[type]] من Console بيغيّر الأيقونة على طول، والخلفية بتتغيّر لوحدها من [[:host([type="info"])]].
- **[[close()]]:** بيبعت الـ event الأول وبعدين [[remove()]]. والـ event بيتبعت من [[this]] (الـ host) مش من الزرار اللي جوه، فمش محتاج [[composed]] عشان listener على العنصر يستقبله.
- **[[strong color rgb(124, 45, 18)]]:** الرسالة لسه في الـ light DOM (الـ slot بيعرضها بس، مبينقلهاش)، فـ CSS الصفحة [[info-alert strong]] بيوصلها.

**الغلطة الشائعة:** تكتب [[this.remove()]] الأول وبعدين [[dispatchEvent]] بـ [[bubbles: true]]: العنصر خلاص برة الصفحة، فالـ listener على [[document]] مش هيستقبل حاجة (الـ listener على العنصر نفسه بس اللي هيستقبل).` },
            { lvl: 'تحدي', t: R`ابني footer بيختفي لوحده: شيل الـ fallback من slot الـ [[footer]] في [[AppCard]]، وفي [[slotchange]] حط [[hidden]] على الـ [[<footer>]] لو [[assignedNodes({ flatten: true }).length]] بصفر. وجرّب تضيف وتشيل [[<span slot="footer">]] من Console.`, done: R`كارت من غير footer مفيهوش الخط الرمادي ولا المسافة بتاعته، وإضافة [[<span slot="footer">paid</span>]] بتظهره على طول، وشيلها بيخفيه تاني، و [[slotchange]] بيتنادى مع كل إضافة أو شيل للـ slot ده بس مش لما تغيّر نص جوه الـ span.`, sol: R`~~~live 300 footer بيختفي لوحده
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } app-card { display: block; margin-block: 8px; }</style>
<app-card id="c1"><h3 slot="title">Order #12</h3><p>3 items</p></app-card>
<app-card id="c2"><h3 slot="title">Order #13</h3><p>1 item</p><span slot="footer">paid</span></app-card>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
class AppCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>
        article { border: 1px solid #ccc; border-radius: 8px; padding: 12px; }
        ::slotted(h3) { margin: 0 0 8px; color: navy; }
        footer { color: gray; font-size: 12px; border-top: 1px solid #ddd; margin-top: 8px; padding-top: 6px; }
      </style>
      <article>
        <slot name="title"><h3>No title</h3></slot>
        <slot></slot>
        <footer><slot name="footer"></slot></footer>
      </article>$__bt;
    const slot = this.shadowRoot.querySelector("slot[name=footer]");
    const footer = this.shadowRoot.querySelector("footer");
    const update = () => {
      footer.hidden = slot.assignedNodes({ flatten: true }).length === 0;
      log(this.id + ": slotchange -> footer hidden = " + footer.hidden);
    };
    slot.addEventListener("slotchange", update);
    footer.hidden = true;
  }
}
customElements.define("app-card", AppCard);
</script>
~~~

~~~text الناتج (Chrome 158: Playwright زوّد span للكارت الأول، وغيّر نصه، وبعدين شاله)
c2: slotchange -> footer hidden = false
start: c1 footer hidden=true height=113.53125 | c2 footer hidden=false height=139.71875
c1: slotchange -> footer hidden = false
after add: c1 footer hidden=false height=139.71875 | c2 footer hidden=false height=139.71875
after text change (no slotchange expected)
c1: slotchange -> footer hidden = true
after remove: c1 footer hidden=true height=113.53125 | c2 footer hidden=false height=139.71875
~~~

جرّبه انت من Console في الصفحة الحية أو صفحتك:

~~~js
const s = document.createElement("span"); s.slot = "footer"; s.textContent = "paid";
document.querySelector("#c1").append(s);   // الخط الرمادي بيظهر
s.textContent = "refunded";                 // مفيش slotchange
s.remove();                                 // بيختفي تاني
~~~

- **[[<slot name="footer"></slot>]] من غير fallback:** لو كان فيه «default footer» كان الـ footer عمره ما هيبقى فاضي.
- **[[footer.hidden = true]] في الـ constructor:** ده أهم سطر. [[slotchange]] بيتبعت لما الـ slot ياخد أو يسيب nodes، والكارت الأول مفيهوش footer من الأول فمفيش [[slotchange]] اتبعت له خالص (لاحظ إن الناتج فيه c2 بس في الأول). فلازم نبدأ مخفي.
- **[[assignedNodes({ flatten: true })]]:** [[flatten]] بيدوّر جوه الـ slots المتداخلة (لو حد حط [[<slot slot="footer">]] من component تاني جواه)، وبيرجّع الـ fallback لو مفيش حاجة متعيّنة.
- **الارتفاع:** الكارت الأول 113.5px والتاني 139.7px، والفرق (حوالي 26px) هو الـ footer بخطه وmargin والـ padding، وبيروح ويرجع مع الإضافة والشيل.
- **تغيير النص جوه الـ span مبيبعتش [[slotchange]]:** الـ slot لسه شايل نفس الـ span، والحدث بيتبعت لما **مين** متعيّن يتغيّر، مش لما محتواه يتغيّر.

**الغلطة الشائعة:** تعتمد على [[slotchange]] بس وتنسى الحالة الأولى، فالكارت اللي من غير footer يفضل فيه الخط الرمادي لحد أول تغيير.` },
          ],
          flag: "script",
          deep: {
            why: R`component زي كارت أو dialog أو layout محتاج ياخد محتوى من اللي بيستخدمه (عنوان، نص، أزرار) ويحطه في أماكن معينة جوه التصميم بتاعه. ده نفس فكرة [[children]] في React و [[<slot>]] في Vue (Vue أخدت الاسم والفكرة من هنا).`,
            how: R`الأولاد اللي اليوزر كتبهم جوه [[<app-card>]] مش بيتنقلوا جوه الـ shadow: بيفضلوا أولاد العنصر في الـ light DOM، والمتصفح بس بيعرضهم (render) مكان الـ [[<slot>]] المناسب. عشان كده [[h3.parentNode === card]] و CSS الصفحة شغال عليهم.

كل عنصر عليه [[slot="x"]] بيروح لـ [[<slot name="x">]]. الباقي (من غير [[slot]]) بيروح للـ slot اللي من غير اسم، ولو مفيش، مش بيظهر. لو slot ماجلوش حاجة، المحتوى اللي جواه هو اللي بيظهر (fallback).

[[slot.assignedElements()]]: العناصر اللي اتحطت فيه. و [[slotchange]] event بيتنادى على الـ slot لما الليستة دي تتغير (وأول مرة كمان). و [[::slotted(h3)]]: من جوه الـ shadow، استايل للـ [[h3]] اللي اتحط في slot (العنصر نفسه بس، مش أولاده).`,
            when: R`أي component بيغلّف محتوى: cards، و modals، و tabs، و layouts. ولو المحتوى داتا (array of items) مش HTML، مرّرها property (درس [[attributes و properties]]).`,
            mistakes: R`تنسى [[slot="title"]] على العنصر فيروح للـ slot الافتراضي. وتحاول تستايل أولاد العنصر اللي في الـ slot بـ [[::slotted(div p)]]: مش شغال، [[::slotted]] بيمسك العنصر اللي في الـ slot مباشرة بس. وتدوّر على الـ [[h3]] في [[shadowRoot.querySelector]]: هو في الـ light DOM.`
          },
          teach: R`## الصفحة

اتجرّب في Chrome 156 headless.

~~~text wc3.html
<app-card id="c1">
  <h3 slot="title">Order #42</h3>
  <p>3 items, 250 EGP</p>
  <button>Pay</button>
</app-card>
<app-card id="c2"><p>no title, no footer</p></app-card>
~~~

---

## ١. الـ template جوه الـ shadow

- [[this.attachShadow({ mode: "open" }).innerHTML = ...]]: [[attachShadow]] بيرجّع الـ shadow root، فبنكتب فيه على طول.
- [[<slot name="title"><h3>No title</h3></slot>]]: مكان للعنوان، ولو مفيش: [[No title]].
- [[<slot></slot>]]: الـ slot الافتراضي: أي ابن من غير [[slot=]].
- [[<slot name="footer">default footer</slot>]]: مكان للفوتر، وافتراضيًا [[default footer]].
- [[::slotted(h3)]]: استايل للـ [[h3]] اللي اتحط في أي slot.

---

## ٢. مين راح فين

~~~text الناتج
c1 -> title: H3 | (default): P,BUTTON | footer: fallback
c2 -> title: fallback | (default): P | footer: fallback
h3 color: rgb(0, 0, 128) | still in light DOM: true
~~~

| | [[title]] | الافتراضي | [[footer]] |
|---|---|---|---|
| [[c1]] | الـ [[h3]] | [[p]] و [[button]] | [[default footer]] |
| [[c2]] | [[No title]] | [[p]] | [[default footer]] |

- [[assignedElements()]] رجّع العناصر اللي في كل slot، و [[fallback]] (كلمة من سكربت الاختبار) يعني ليستة فاضية فالمحتوى الافتراضي ظهر.
- [[rgb(0, 0, 128)]] = [[navy]]: [[::slotted(h3)]] اشتغل.
- [[still in light DOM: true]]: [[h3.parentNode]] لسه هو [[c1]] نفسه. اتعرض جوه، بس مكانه في الشجرة متغيرش.

---

## ٣. [[slotchange]]

~~~text الناتج (Console)
slotchange: body has 2 element(s)
slotchange: body has 1 element(s)
slotchange: body has 3 element(s)
~~~

| السطر | ليه |
|---|---|
| 2 | أول ما [[c1]] اتعمل: [[p]] و [[button]] |
| 1 | [[c2]]: [[p]] |
| 3 | ضفت [[<p>more</p>]] لـ [[c1]] بـ [[append]] |

ولما ضفت [[<span slot="footer">paid</span>]] لـ [[c2]]: الفوتر بقى [[SPAN]] (بدل [[default footer]])، بس مفيش سطر [[slotchange]]، لأن الـ listener على الـ slot الافتراضي بس:

~~~text الناتج
c2 after append -> title: fallback | (default): P | footer: SPAN
~~~

- [[querySelector("slot:not([name])")]]: الـ slot اللي ملوش [[name]].
- [[e.target]]: الـ slot نفسه. [[assignedElements()]]: العناصر (مش النصوص) اللي فيه.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[<slot>]] | الأولاد اللي من غير [[slot=]] |
| [[<slot name="x">]] + [[slot="x"]] | عنصر في مكان معين |
| محتوى جوه [[<slot>]] | fallback لو مفيش حاجة |
| [[::slotted(sel)]] | استايل للعنصر اللي في الـ slot (مش أولاده) |
| [[slotchange]] و [[assignedElements()]] | اعرف إيه اللي اتحط |

العناصر في الـ slots بتفضل في الـ light DOM: CSS الصفحة شغال عليها، و [[document.querySelector]] بيلاقيها.`,
          lines: [
            R`class الكارت، بيورث [[HTMLElement]]. فكرته: هيكل ثابت (إطار وعنوان وفوتر) والصفحة هي اللي تحط المحتوى جواه.`,
            R`الـ [[constructor]]: هنعمل فيه الـ shadow والـ template مرة واحدة.`,
            R`[[super()]] بينادي constructor بتاع [[HTMLElement]]، ولازم يبقى الأول قبل أي [[this]].`,
            R`[[attachShadow]] بترجّع الـ shadow root، فبنكتب [[innerHTML]] عليه على طول في نفس السطر. والـ template literal بيبدأ هنا ويكمّل لحد [[</article>]].`,
            R`[[<style>]] جوه الـ shadow: الاستايل ده بيطبّق على عناصر الـ shadow بس، ومش بيطلع للصفحة.`,
            R`شكل الكارت: إطار رمادي وحواف مدوّرة ومسافة جوه. الـ [[article]] ده جوه الـ shadow، فأي [[article]] في الصفحة مش هيتأثر.`,
            R`[[::slotted(h3)]]: استايل لأي [[h3]] الصفحة حطته في slot. العناصر دي فاضلة في الـ light DOM، فده الطريق من جوه الـ shadow تستايلها. بيمسك العنصر المحطوط نفسه بس، مش أولاده.`,
            R`استايل الـ [[footer]] اللي جوه الـ shadow: رمادي وخط صغير.`,
            R`نهاية الـ [[<style>]]، وبعده محتوى الكارت نفسه.`,
            R`[[<article>]]: الإطار اللي فيه الأماكن التلاتة.`,
            R`slot اسمه [[title]]: أي عنصر في الصفحة عليه [[slot="title"]] يتعرض هنا. والـ [[h3]] اللي جواه fallback بيظهر بس لو الصفحة محطتش عنوان.`,
            R`الـ slot الافتراضي (من غير [[name]]): بياخد كل أولاد العنصر اللي مش عليهم [[slot]]، زي [[p]] و [[button]]. لو مفيش slot زي ده، الأولاد دول مش هيظهروا خالص.`,
            R`slot اسمه [[footer]] جوه [[<footer>]]، فاللي الصفحة تحطه فيه ياخد استايل الفوتر. ولو محطتش حاجة، يظهر نص default footer.`,
            R`نهاية [[<article>]] والـ template literal، فالـ [[innerHTML]] اتكتب.`,
            R`هات الـ slot اللي ملوش [[name]] (الافتراضي) واسمع لـ [[slotchange]]: بيتنادى لما العناصر المتحطوطة فيه تتغير (ولد اتضاف أو اتشال)، وأول مرة يتحطوا كمان.`,
            R`[[e.target]] هو الـ slot نفسه، و [[assignedElements()]] بترجّع العناصر اللي اتحطت فيه (من غير النصوص والمسافات). بنطبع عددهم عشان نشوف التغيير.`,
            R`نهاية الـ [[slotchange]] listener.`,
            R`نهاية الـ [[constructor]].`,
            R`نهاية الـ class.`,
            R`سجّل [[app-card]]، فأي [[<app-card>]] في الصفحة ياخد الهيكل ده وأولاده يتوزعوا على الـ slots.`,
          ],
          sol: R`في التاني ظهر [[No title]] و [[default footer]] (الـ fallback). وبعد ما ضفت [[<span slot="footer">paid</span>]] الفوتر بقى [[paid]].

[[slotchange]] اتنادى ٣ مرات: [[2]] (أول [[c1]])، و [[1]] (أول [[c2]])، و [[3]] (لما ضفت [[p]] لـ [[c1]]). إضافة الـ [[span]] لـ [[c2]] ماطلّعتش سطر لأن الـ listener على الـ slot الافتراضي بس، مش [[footer]].`
        },
        {
          cmd: "attributes و properties",
          title: "attributes ولا properties، والـ events من الـ component",
          ref: [
            { t: "MDN: Using custom elements (responding to attribute changes)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements" },
            { t: "MDN: :host", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host" },
          ],
          pre: [
            { to: "js/method definitions و property accessors", why: R`الـ reflect كله [[get]] بيقرا الـ attribute و [[set]] بيكتبه` },
          ],
          desc: R`الـ attribute نص في الـ HTML ([[value="3"]])، والـ property قيمة JavaScript على العنصر ([[el.value = 3]]، أو array، أو object). الـ component الكويس بيعمل getter/setter يربط الاتنين للقيم البسيطة (reflect)، والـ boolean بيبقى «الـ attribute موجود ولا لأ» مش قيمته، والداتا المعقدة property بس.

ولما حاجة تحصل جوه بيبعت [[CustomEvent]] بـ [[detail]]، و [[bubbles: true]] عشان يطلع لفوق، و [[composed: true]] عشان يعدّي حدود الـ shadow DOM.`,
          example: R`class StarRating extends HTMLElement {
  static observedAttributes = ["value", "disabled"];
  #labels = ["bad", "ok", "good", "great", "perfect"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn || this.disabled) return;
      this.value = Number(btn.dataset.v);
      this.dispatchEvent(new CustomEvent("rating-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }));
    });
  }
  get value() { return Number(this.getAttribute("value") ?? 0); }
  set value(v) { this.setAttribute("value", String(v)); }
  get disabled() { return this.hasAttribute("disabled"); }
  set disabled(on) { this.toggleAttribute("disabled", Boolean(on)); }
  get labels() { return this.#labels; }
  set labels(list) { this.#labels = list; this.render(); }
  attributeChangedCallback() { this.render(); }
  connectedCallback() { this.render(); }
  render() {
    this.shadowRoot.innerHTML = this.#labels.map((label, i) =>
      $__bt<button data-v="$__{i + 1}" title="$__{label}" $__{this.disabled ? "disabled" : ""}>$__{i < this.value ? "★" : "☆"}</button>$__bt
    ).join("");
  }
}
customElements.define("star-rating", StarRating);`,
          try: R`احفظ المثال [[star-rating.js]] وحط [[<div id="box"><star-rating value="3"></star-rating></div>]]. من الـ Console: اقرا [[r.value]] ونوعه، واعمل [[r.value = 5]] وبص على الـ HTML، و [[r.disabled = true]]، و [[r.setAttribute("disabled", "false")]] واقرا [[r.disabled]]، و [[r.setAttribute("labels", "a,b,c")]] مقابل [[r.labels = ["no", "maybe", "yes"]]]. وحط listener على [[#box]] واضغط نجمة.`,
          practice: [
            { lvl: 'سريع', t: R`ابني property [[size]] على [[star-rating]] بتعمل reflect لـ attribute [[size]] ([["s"]] أو [["m"]] أو [["l"]]) والـ default [["m"]]، والـ CSS جوه بـ [[:host([size="l"])]].`, done: R`[[r.size = "l"]] بيحط [[size="l"]] في الـ HTML والنجوم بتكبر، و [[r.removeAttribute("size")]] بيخلّي [[r.size]] يرجّع [["m"]]، و [[r.size = "xl"]] بيتجاهل القيمة وبيكتب warning وبيفضل على القديمة.`, sol: R`~~~live 190 size بيعمل reflect
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }</style>
<star-rating value="3"></star-rating>
<star-rating value="4" size="l"></star-rating>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
const SIZES = ["s", "m", "l"];
class StarRating extends HTMLElement {
  static observedAttributes = ["value", "size"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  get size() {
    const s = this.getAttribute("size");
    return SIZES.includes(s) ? s : "m";
  }
  set size(v) {
    if (!SIZES.includes(v)) {
      console.warn($__btstar-rating: size "$__{v}" مش مسموح، المسموح $__{SIZES.join(" / ")}$__bt);
      return;
    }
    this.setAttribute("size", v);
  }
  get value() { return Number(this.getAttribute("value") ?? 0); }
  set value(v) { this.setAttribute("value", String(v)); }
  attributeChangedCallback() { this.render(); }
  connectedCallback() { this.render(); }
  render() {
    let html = $__bt<style>
      button { border: 0; background: none; padding: 0 2px; font-size: 20px; color: #f59e0b; }
      :host([size="s"]) button { font-size: 14px; }
      :host([size="l"]) button { font-size: 32px; }
    </style>$__bt;
    for (let i = 1; i <= 5; i++) html += $__bt<button type="button">$__{i <= this.value ? "★" : "☆"}</button>$__bt;
    this.shadowRoot.innerHTML = html;
  }
}
customElements.define("star-rating", StarRating);
const r = document.querySelector("star-rating");
const px = () => getComputedStyle(r.shadowRoot.querySelector("button")).fontSize;
log("start: r.size = " + r.size + " | font " + px());
r.size = "l";
log('r.size = "l" -> ' + r.outerHTML.split(">")[0] + "> | font " + px());
r.removeAttribute("size");
log("removeAttribute -> r.size = " + r.size + " | font " + px());
r.size = "s";
r.size = "xl";
log('r.size = "xl" -> r.size = ' + r.size + " | attribute " + r.getAttribute("size"));
</script>
~~~

~~~text الناتج (Chrome 158، ونفسه في الصفحة الحية)
start: r.size = m | font 20px
r.size = "l" -> <star-rating value="3" size="l"> | font 32px
removeAttribute -> r.size = m | font 20px
star-rating: size "xl" مش مسموح، المسموح s / m / l
r.size = "xl" -> r.size = s | attribute s
~~~

**الفكرة:** الـ attribute هو مكان القيمة الوحيد، والـ property مجرد getter و setter عليه. كده الاتنين عمرهم ما يختلفوا.

- **[[get size()]]:** بيقرا الـ attribute، ولو مش موجود أو قيمته مش من الـ ٣ بيرجّع [["m"]]. فالـ default مش متخزن في أي حتة: هو نتيجة «مفيش attribute».
- **[[set size(v)]]:** بيفحص الأول، ولو القيمة مش مسموحة بيكتب [[console.warn]] و [[return]] من غير ما يلمس الـ attribute، فالقيمة القديمة ([["s"]]) فضلت.
- **[[this.setAttribute("size", v)]]:** ده الـ reflect: القيمة بتظهر في الـ HTML (السطر التاني في الناتج)، وبتشغّل [[attributeChangedCallback]] لأن [[size]] في [[observedAttributes]] فبيرسم تاني.
- **[[:host([size="l"]) button]]:** الـ CSS جوه الـ shadow بيقرا الـ attribute بتاع العنصر نفسه. ده سبب إن الـ reflect مهم: الـ CSS بيشوف attributes، مش properties.
- **[[removeAttribute("size")]]:** رجّع [[r.size]] لـ [["m"]] والخط لـ [[20px]] من غير أي كود زيادة.

**الغلطة الشائعة:** تخزّن القيمة في field ([[this._size]]) وتعمل reflect كمان، فلما حد يغيّر الـ attribute من HTML أو DevTools الـ field يفضل على القديم. خلّي مصدر واحد للحقيقة.` },
            { lvl: 'تطبيق', t: R`اكتب اختبار بـ [[node:test]] و jsdom (custom elements شغالة فيه) لـ [[value]]: لازم يبقى رقم صحيح من 0 لعدد الـ labels، وأي حاجة برا كده تتقص للحد، و [[NaN]] تتجاهل. التستات الأول وبعدين التصليح في الـ setter.`, done: R`التستات بتقع على كود الدرس الأصلي، وبعد التصليح [[r.value = 9]] بيبقى 5 و [[r.value = -1]] بيبقى 0 و [[r.value = 2.7]] بيبقى 3 و [[r.value = "abc"]] مبيغيّرش القيمة، و [[node --test]] بيعدّي، والـ attribute في الـ HTML بيطابق الـ property في كل حالة.`, sol: R`**هتشوف إيه:** ٧ تستات بتقع ٥ منهم على كود الدرس، وبعد التصليح في الـ setter الـ ٧ بيعدّوا. اتشغّل بـ Node 24.22 و jsdom 31.0.1.

~~~text شجرة الملفات
star-rating-test/
├── package.json
├── star-rating.test.mjs
├── before/star-rating.js   ← كود الدرس زي ما هو
└── after/star-rating.js    ← بعد التصليح
~~~

~~~json package.json
{ "type": "module", "scripts": { "test": "node --test" }, "devDependencies": { "jsdom": "^31.0.1" } }
~~~

~~~js star-rating.test.mjs
// star-rating.test.mjs: node --test (الملف بيختار النسخة من متغير VERSION)
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><body></body>");
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
const { document } = dom.window;
await import($__bt./$__{process.env.VERSION ?? "after"}/star-rating.js$__bt);

let r;
beforeEach(() => {
  document.body.innerHTML = "<star-rating></star-rating>";
  r = document.querySelector("star-rating");
});

const filled = () => [...r.shadowRoot.querySelectorAll("button")].filter(b => b.textContent === "★").length;

for (const [input, expected] of [[3, 3], [9, 5], [-1, 0], [2.7, 3], ["4", 4]]) {
  test($__btvalue = $__{JSON.stringify(input)} -> $__{expected}$__bt, () => {
    r.value = input;
    assert.equal(r.value, expected);
    assert.equal(r.getAttribute("value"), String(expected));
    assert.equal(filled(), expected);
  });
}

test('value = "abc" is ignored', () => {
  r.value = 2;
  r.value = "abc";
  assert.equal(r.value, 2);
  assert.equal(r.getAttribute("value"), "2");
});

test("the max follows labels.length", () => {
  r.labels = ["bad", "ok", "great"];
  r.value = 9;
  assert.equal(r.value, 3);
});
~~~

~~~js after/star-rating.js
// star-rating.js: بعد التصليح، الـ setter بيقص القيمة ويتجاهل NaN
export class StarRating extends HTMLElement {
  static observedAttributes = ["value", "disabled"];
  #labels = ["bad", "ok", "good", "great", "perfect"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  get value() { return Number(this.getAttribute("value") ?? 0); }
  set value(v) {
    const n = Math.round(Number(v));
    if (Number.isNaN(n)) return;
    const clamped = Math.min(Math.max(n, 0), this.#labels.length);
    this.setAttribute("value", String(clamped));
  }
  get labels() { return this.#labels; }
  set labels(list) { this.#labels = list; this.render(); }
  attributeChangedCallback() { this.render(); }
  connectedCallback() { this.render(); }
  render() {
    this.shadowRoot.innerHTML = this.#labels.map((label, i) =>
      $__bt<button data-v="$__{i + 1}" title="$__{label}">$__{i < this.value ? "★" : "☆"}</button>$__bt
    ).join("");
  }
}
if (!customElements.get("star-rating")) customElements.define("star-rating", StarRating);
~~~

(نسخة [[before/]] هي نفسها بس الـ setter سطر واحد: [[set value(v) { this.setAttribute("value", String(v)); }]].)

~~~bash
npm i -D jsdom
VERSION=before node --test     # في PowerShell: $env:VERSION="before"; node --test
VERSION=after node --test
~~~

~~~text الناتج: قبل التصليح
✔ value = 3 -> 3 (12.7788ms)
✖ value = 9 -> 5 (2.8842ms)
✖ value = -1 -> 0 (1.7672ms)
✖ value = 2.7 -> 3 (1.3913ms)
✔ value = "4" -> 4 (3.3353ms)
✖ value = "abc" is ignored (1.5761ms)
✖ the max follows labels.length (1.2146ms)
ℹ tests 7
ℹ pass 2
ℹ fail 5
...
✖ value = 9 -> 5 (2.8842ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  9 !== 5
...
✖ value = "abc" is ignored (1.5761ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  NaN !== 2
~~~

~~~text الناتج: بعد التصليح
✔ value = 3 -> 3 (26.9022ms)
✔ value = 9 -> 5 (5.4271ms)
✔ value = -1 -> 0 (4.0469ms)
✔ value = 2.7 -> 3 (7.056ms)
✔ value = "4" -> 4 (2.9859ms)
✔ value = "abc" is ignored (2.0063ms)
✔ the max follows labels.length (2.7398ms)
ℹ tests 7
ℹ pass 7
ℹ fail 0
~~~

- **[[globalThis.HTMLElement = dom.window.HTMLElement]]:** الـ component بيكتب [[extends HTMLElement]] و [[customElements.define]] كأنه في متصفح. بنحط نسخ jsdom على الـ global **قبل** ما نستورد الملف، عشان كده الاستيراد [[await import(...)]] مش [[import]] فوق (الـ imports العادية بتتنفّذ قبل أي سطر في الملف).
- **[[beforeEach]]:** كل تست بياخد عنصر جديد، فتست مبيأثرش في اللي بعده.
- **كل تست بيفحص ٣ حاجات:** الـ property، والـ attribute، وعدد النجوم المرسومة. كده بيمسك لو الـ reflect أو الرسم اتكسر.
- **[[Math.round(Number(v))]]:** [[2.7]] تبقى 3، و [["4"]] تبقى 4، و [["abc"]] تبقى [[NaN]].
- **[[if (Number.isNaN(n)) return;]]:** قبل التصليح [["abc"]] اتكتبت في الـ attribute فبقى [[value]] بـ [[NaN]]، وده التست اللي وقع بـ [[NaN !== 2]].
- **[[Math.min(Math.max(n, 0), this.#labels.length)]]:** القص بين 0 وعدد الـ labels (مش 5 ثابتة)، والتست الأخير بيتأكد إن ٣ labels بيخلّوا الحد 3.

**الغلطة الشائعة:** تكتب التصليح في الـ getter بدل الـ setter ([[return Math.min(...)]])، فالـ property تطلع صح بس الـ attribute في الـ HTML يفضل [[9]]، والتست بيقع على سطر [[getAttribute]].` },
            { lvl: 'تحدي', t: R`ابني star-rating يتبعت مع الفورم: [[static formAssociated = true]] و [[this.#internals = this.attachInternals()]] و [[setFormValue(String(value))]] مع كل تغيير، و [[required]] بيعمل [[setValidity({ valueMissing: true }, "اختار تقييم")]] لما القيمة صفر. (jsdom مبيدعمش [[setFormValue]]، فجرّبه في المتصفح).`, done: R`[[new FormData(form).get("rating")]] بيرجّع [["4"]] بعد ما تختار 4 نجوم، والفورم اللي فيه [[required]] من غير تقييم مبيتبعتش وبيظهر «اختار تقييم»، و [[form.reset()]] بيرجّع النجوم صفر لو عملت [[formResetCallback]]، والـ rating بيظهر في [[form.elements]].`, sol: R`~~~live 160 star-rating جوه فورم
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  star-rating:invalid { outline: 2px solid #dc2626; border-radius: 6px; }
</style>
<form id="f">
  <star-rating name="rating" required></star-rating>
  <button>ابعت</button>
  <button type="reset">امسح</button>
</form>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
class StarRating extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = ["value", "required"];
  #internals = this.attachInternals();
  #labels = ["bad", "ok", "good", "great", "perfect"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      this.value = Number(btn.dataset.v);
    });
  }
  get value() { return Number(this.getAttribute("value") ?? 0); }
  set value(v) { this.setAttribute("value", String(v)); }
  get form() { return this.#internals.form; }
  get name() { return this.getAttribute("name"); }
  get validity() { return this.#internals.validity; }
  get validationMessage() { return this.#internals.validationMessage; }
  checkValidity() { return this.#internals.checkValidity(); }
  attributeChangedCallback() { this.#sync(); }
  connectedCallback() { this.#sync(); }
  formResetCallback() { this.value = 0; }
  #sync() {
    const v = this.value;
    this.shadowRoot.innerHTML = $__bt<style>button { border: 0; background: none; font-size: 22px; color: #f59e0b; cursor: pointer; }</style>$__bt +
      this.#labels.map((label, i) => $__bt<button type="button" data-v="$__{i + 1}" title="$__{label}">$__{i < v ? "★" : "☆"}</button>$__bt).join("");
    this.#internals.setFormValue(v ? String(v) : null);
    if (this.hasAttribute("required") && !v) {
      this.#internals.setValidity({ valueMissing: true }, "اختار تقييم", this.shadowRoot.querySelector("button"));
    } else {
      this.#internals.setValidity({});
    }
  }
}
customElements.define("star-rating", StarRating);
const form = document.querySelector("#f");
const stars = form.querySelector("star-rating");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  log("submit: " + JSON.stringify([...new FormData(form)]));
});
stars.addEventListener("invalid", () => log("invalid: " + stars.validationMessage));
log("in form.elements: " + [...form.elements].map(el => el.tagName).join(", "));
log("start: checkValidity = " + form.checkValidity() + " | rating = " + new FormData(form).get("rating"));
</script>
~~~

~~~text الناتج (Chrome 158: Playwright ضغط «ابعت» فاضي، وبعدين النجمة الرابعة، وبعدين «ابعت» و «امسح»؛ ونفسه في الصفحة الحية)
in form.elements: STAR-RATING, BUTTON, BUTTON
invalid: اختار تقييم
start: checkValidity = false | rating = null
invalid: اختار تقييم
after 4 stars: rating = 4 | valid = true
submit: [["rating","4"]]
after reset: value = 0 | rating = null
~~~

**هتشوف إيه:** ٥ نجوم فاضية حواليها إطار أحمر ([[:invalid]]). «ابعت» من غير تقييم مبيبعتش والمتصفح بيطلّع فقاعة «اختار تقييم» عند أول نجمة. بعد ما تختار ٤، الإطار بيختفي و «ابعت» بيطبع [[rating=4]]، و «امسح» بيرجّع الكل فاضي.

- **[[static formAssociated = true]]:** بيقول للمتصفح «العنصر ده بيدخل الفورم زي [[<input>]]»، فبيظهر في [[form.elements]] (أول سطر) وبيستقبل [[formResetCallback]].
- **[[#internals = this.attachInternals()]]:** مرة واحدة كـ field. الـ internals هي اللي فيها [[setFormValue]] و [[setValidity]] و [[form]].
- **[[setFormValue(v ? String(v) : null)]]:** القيمة اللي هتتبعت باسم [[name]]. [[null]] معناها «متبعتش حاجة»، عشان كده [[rating = null]] في الأول وبعد الـ reset.
- **[[setValidity({ valueMissing: true }, "اختار تقييم", anchor)]]:** بيخلّي العنصر invalid برسالتك، والـ anchor (أول زرار جوه الـ shadow) هو اللي الفقاعة بتطلع عنده. و [[setValidity({})]] بيرجّعه valid.
- **أول [[invalid]] طلع من [[form.checkValidity()]]:** الدالة بتبعت [[invalid]] لكل عنصر مش صالح، مش [[submit]] بس.
- **[[get validity]] و [[validationMessage]] و [[checkValidity()]]:** بنعرضهم بنفسنا عشان العنصر يتعامل زي أي input من بره ([[stars.validationMessage]] اتقرت في الـ listener).
- **[[formResetCallback() { this.value = 0; }]]:** من غيره [[form.reset()]] مبيعرفش يرجّع حاجة في عنصر بتاعك.
- **jsdom مبيدعمش [[attachInternals]]** زي ما التمرين قال، فده اتجرّب في Chrome بس.

**الغلطة الشائعة:** تحط [[setFormValue]] في الـ click handler بس، فالقيمة اللي جاية من الـ HTML ([[value="3"]]) أو من الكود ([[el.value = 2]]) متتبعتش. خلّيها في المكان اللي كل التغييرات بتعدّي منه ([[#sync]]).` },
          ],
          flag: "script",
          deep: {
            why: R`الـ HTML مبيعرفش غير نصوص: [[<star-rating value="3">]] قيمته [["3"]] مش 3. والـ frameworks (React و Vue) بتمرّر arrays و objects. لو الـ component فاهم attributes بس، مستحيل تديله ليستة. ولو فاهم properties بس، مينفعش يتكتب في HTML عادي. والـ events هي الطريقة الوحيدة يقول بيها للصفحة «اليوزر عمل حاجة».`,
            how: R`[[get value()]] / [[set value(v)]]: لما حد يكتب [[el.value = 5]] الـ setter بيكتبها attribute، و [[attributeChangedCallback]] بيعيد الرسم. فالمصدر واحد (الـ attribute) والاتنين متطابقين: ده اسمه reflect.

Boolean attributes في HTML: الوجود هو المعنى. [[disabled="false"]] لسه **disabled**، لأن [[hasAttribute]] بيسأل «موجود؟» مش «قيمته إيه؟». و [[toggleAttribute(name, force)]] بيحطه أو يشيله.

[[#labels]]: الـ [[#]] = private field، محدش يوصله من بره الـ class. و [[labels]] property بس من غير attribute: array مينفعش يبقى attribute من غير ما تعمل parse لنص.

الـ events: [[dispatchEvent(new CustomEvent(name, { detail, bubbles, composed }))]]. [[bubbles]] = يطلع للأب وأبوه. [[composed]] = يعدّي من shadow root للـ document. لو بتعمل dispatch على [[this]] (الـ host) و الـ host نفسه في الـ document، [[bubbles]] كفاية. لكن لو الـ component نفسه جوه shadow root تاني (component جوه component)، من غير [[composed]] الـ event بيقف عند الـ shadow root ده. وعشان كده بنحطها دايمًا.`,
            when: R`أي component هيتستخدم من framework أو بداتا مش نص. اعمل reflect للقيم البسيطة (string و number و boolean)، و property بس للـ arrays والـ objects، وevent لكل تغيير بيعمله اليوزر.`,
            mistakes: R`[[disabled="false"]] وتستغرب إنه disabled. وتقرا [[getAttribute("value")]] وتقارنه برقم: نص. وتعمل reflect لـ object فيبقى [["[object Object]"]] في الـ HTML. وتنسى [[composed: true]] والـ component هيتحط جوه component تاني. واسم event بحروف كبيرة ([[ratingChange]]): بعض الـ frameworks بتحوّل الأسامي لحروف صغيرة، فخليه [[rating-change]].`
          },
          teach: R`## الصفحة

اتجرّب في Chrome 156 headless، والكود في الـ Console بتاع الصفحة.

~~~text wc4.html
<div id="box"><star-rating value="3"></star-rating></div>
<script type="module" src="star-rating.js"></script>
~~~

---

## ١. [[value]]: attribute ↔ property

~~~text الناتج
attr "3" -> property: 3 (number) | ★★★☆☆
r.value = 5 -> attribute: "5" | ★★★★★
~~~

- [[get value()]]: [[getAttribute("value")]] نص أو [[null]]، و [[?? 0]] لو مش موجود، و [[Number()]] يحوّله. فـ [[r.value]] رقم.
- [[set value(v)]]: [[setAttribute("value", String(v))]]: الـ property بتتكتب attribute.
- الـ attribute اتغير ← [[attributeChangedCallback]] ← [[render()]]: النجوم اتحدّثت لوحدها.

---

## ٢. [[disabled]]: boolean attribute

~~~text الناتج
r.disabled = true -> outerHTML: <star-rating value="5" disabled=""></star-rating>
setAttribute("disabled","false") -> r.disabled = true
~~~

- [[toggleAttribute("disabled", true)]] حط [[disabled=""]]: القيمة فاضية، المهم إنه موجود.
- [[setAttribute("disabled", "false")]] لسه **true**: [[hasAttribute]] بيسأل عن الوجود. زي [[<button disabled="false">]] في HTML: الزرار disabled. عشان تلغيه: [[removeAttribute("disabled")]] أو [[r.disabled = false]].

---

## ٣. [[labels]]: property بس

~~~text الناتج
setAttribute("labels","a,b,c") -> buttons: 5
r.labels = [3 items] -> buttons: 3 | attribute labels: a,b,c
~~~

- الـ attribute [[labels]] ملوش أي معنى عند الـ component (مش في [[observedAttributes]] ومحدش بيقراه)، فالأزرار فضلت 5.
- [[r.labels = [...]]]: الـ setter حط الـ array في [[#labels]] وعمل render: 3 أزرار.
- والـ attribute القديم [[a,b,c]] فضل في الـ HTML زي ما هو ملوش لازمة.

---

## ٤. الضغطة والـ event

~~~text الناتج
box got rating-change: {"value":2} | target: STAR-RATING | composedPath[0]: STAR-RATING
document click target: STAR-RATING
after click: value=2 | ★★☆
~~~

خطوات الـ click handler:

1. [[e.target.closest("button")]]: أقرب [[button]] للمكان اللي اتضغط (أو هو نفسه). لو الضغطة بره الأزرار: [[null]].
2. [[if (!btn || this.disabled) return]]: مفيش زرار أو الـ component disabled: متعملش حاجة.
3. [[this.value = Number(btn.dataset.v)]]: [[dataset.v]] = قيمة [[data-v]] (نص). وده بيعدّي على الـ setter فبيتعمل reflect و render.
4. [[dispatchEvent(new CustomEvent("rating-change", {...}))]]: [[detail]] الداتا اللي عايز تبعتها.

- [[#box]] (الأب) استلم الـ event لأن [[bubbles: true]].
- [[document click target: STAR-RATING]]: الـ click الأصلي حصل على [[button]] **جوه** الـ shadow، بس من بره الـ target بقى الـ host. ده اسمه retargeting: الصفحة مش بتشوف تفاصيل جوه الـ component.
- النجوم 3 بس دلوقتي ([[★★☆]]) لأن [[labels]] بقت 3.

### ليه [[composed: true]]؟

حطيت [[<star-rating>]] جوه shadow root بتاع [[div]] تاني (component جوه component)، وبعت اتنين events من الـ star-rating:

~~~text الناتج
document got composed event, target=DIV
shadow root got plain event
~~~

- [[composed: true]]: عدّى لحد الـ document، والـ target بقى [[DIV]] (الـ host الخارجي، retargeting تاني).
- من غير [[composed]]: وقف عند الـ shadow root اللي فيه، والـ document ماشافهوش.

---

## الخلاصة

| النوع | الطريقة | مثال |
|---|---|---|
| نص أو رقم | attribute ↔ property (reflect) | [[value]] |
| boolean | الوجود: [[hasAttribute]] و [[toggleAttribute]] | [[disabled]] |
| array أو object | property بس | [[labels]] |
| حاجة حصلت | [[CustomEvent]] + [[detail]] + [[bubbles]] + [[composed]] | [[rating-change]] |`,
          lines: [
            R`class عنصر التقييم بالنجوم، بيورث [[HTMLElement]]. هيبيّن الفرق بين attributes (نص في الـ HTML) و properties (أي قيمة JS على الـ object).`,
            R`بنتابع [[value]] و [[disabled]] بس: لو أي واحد فيهم اتغير (من الـ HTML أو [[setAttribute]] أو الـ setters اللي تحت) [[attributeChangedCallback]] تتنادى فنرسم تاني.`,
            R`private field ([[#]]): أسامي النجوم، ومحدش من برّه الـ class يوصله مباشرة. ده property بس من غير attribute، لأن array مينفعش يتحط في attribute من غير ما يتحوّل لنص. الافتراضي 5 أسامي، يعني 5 نجوم.`,
            R`الـ [[constructor]]: shadow root ومستمع واحد للضغط.`,
            R`[[super()]] لازم الأول قبل [[this]].`,
            R`اعمل shadow root مفتوح؛ الأزرار هتترسم جواه في [[render]].`,
            R`مستمع واحد على الـ shadow root كله بدل listener على كل زرار (event delegation). ليه؟ [[render]] بيعمل الأزرار من جديد كل مرة، فأي listener على زرار بعينه كان هيضيع مع كل رسم.`,
            R`[[closest("button")]]: الضغطة ممكن تبقى على حاجة جوه الزرار، فبنطلع لأقرب [[button]]. ولو الضغطة بره أي زرار بترجّع [[null]].`,
            R`مفيش زرار، أو العنصر [[disabled]]: اخرج ومتغيرش حاجة. ([[this.disabled]] هنا بينادي الـ getter اللي تحت.)`,
            R`[[dataset.v]] رقم النجمة من [[data-v]] بس كنص، فـ [[Number]] بيحوّله. والكتابة في [[this.value]] بتعدّي على الـ setter اللي بيكتب الـ attribute، وده بيشغّل [[attributeChangedCallback]] فيرسم.`,
            R`بلّغ الصفحة إن اليوزر غيّر التقييم بـ [[CustomEvent]] اسمه [[rating-change]]. الاسم حروف صغيرة وشرطة لأن بعض الـ frameworks بتحوّل أسامي الـ events لحروف صغيرة.`,
            R`[[detail]]: الداتا اللي بتتبعت مع الـ event. اللي بيسمع بيقراها من [[e.detail.value]].`,
            R`[[bubbles: true]]: الـ event يطلع من العنصر لأبوه وجدّه، فتقدر تسمعله على أي أب (زي [[document]]). من غيرها لازم الـ listener يبقى على العنصر نفسه.`,
            R`[[composed: true]]: الـ event يعدّي حدود الـ shadow root. ضروري لو العنصر ده نفسه اتحط جوه shadow DOM بتاع component تاني، وإلا الـ event يقف عنده.`,
            R`نهاية الـ options وقفلة [[CustomEvent]] و [[dispatchEvent]].`,
            R`نهاية الـ click listener.`,
            R`نهاية الـ [[constructor]].`,
            R`getter لـ [[value]]: لما حد يقرا [[el.value]] بنرجّع الـ attribute كرقم. [[Number]] لأن [[getAttribute]] دايمًا بترجّع نص، و [[?? 0]] لو مفيش attribute.`,
            R`setter لـ [[value]]: [[el.value = 3]] بتكتب [[value="3"]] على العنصر. ده اسمه reflect: الـ property والـ attribute دايمًا متطابقين، وتغيير الـ attribute بيشغّل الرسم.`,
            R`getter لـ [[disabled]]: boolean attribute، المعنى في وجوده مش قيمته. [[hasAttribute]] بترجّع [[true]] حتى لو مكتوب [[disabled="false"]].`,
            R`setter لـ [[disabled]]: [[toggleAttribute(name, force)]] بتحط الـ attribute لو [[force]] بـ [[true]] وتشيله لو [[false]]. و [[Boolean(on)]] بتحوّل أي قيمة ([[0]] أو نص فاضي مثلًا) لـ true أو false صريحة.`,
            R`getter لـ [[labels]]: بيرجّع الـ array الخاص. مفيش attribute ليها، فالطريق الوحيد تقراها أو تغيّرها هو الـ property.`,
            R`setter لـ [[labels]]: بيحفظ الـ array الجديد ويرسم على طول، لأن [[labels]] مش attribute ومش في [[observedAttributes]]، فمحدش هينادي [[attributeChangedCallback]] لوحده.`,
            R`[[value]] أو [[disabled]] اتغيروا (بأي طريقة): ارسم من جديد. مش محتاجين الـ arguments لأن الرسم بيقرا كل حاجة من الأول.`,
            R`أول ما العنصر يدخل الصفحة ارسم. من غيره، عنصر ملوش attributes متابَعة مش هيترسم خالص، لأن [[attributeChangedCallback]] مش هتتنادى.`,
            R`[[render]]: بيبني الأزرار من الـ state الحالي.`,
            R`استبدل محتوى الـ shadow كله بزرار لكل اسم في [[#labels]]. [[map]] بتدّي الاسم ورقمه [[i]] (بيبدأ من 0).`,
            R`كل زرار: [[data-v]] رقم النجمة ([[i + 1]] عشان يبدأ من 1)، و [[title]] الاسم اللي يظهر لما تقف عليه، و [[disabled]] لو العنصر disabled، والنجمة مليانة ★ لو رقمها أقل من أو يساوي القيمة وإلا فاضية ☆.`,
            R`[[map]] بترجّع array نصوص، و [[join("")]] بتلزقهم نص واحد. من غيرها [[innerHTML]] كان هيحوّل الـ array لنص بفواصل، فتظهر [[,]] بين النجوم.`,
            R`نهاية [[render]].`,
            R`نهاية الـ class.`,
            R`سجّل [[star-rating]]. الدرس الجاي بيستخدمه من React و Vue.`,
          ],
          sol: R`الناتج الحقيقي في Chrome 156:
[[r.value]] ← [[3]] ونوعه [[number]]. [[r.value = 5]] ← الـ HTML بقى [[value="5"]].
[[r.disabled = true]] ← [[<star-rating value="5" disabled="">]]. و [[setAttribute("disabled", "false")]] ← [[r.disabled]] لسه [[true]].
[[setAttribute("labels", "a,b,c")]] ← لسه 5 أزرار. [[r.labels = ["no", "maybe", "yes"]]] ← 3 أزرار.
ضغطة النجمة التانية ← [[#box]] استلم [[rating-change]] و [[detail]] = [[{"value":2}]] و [[target]] = [[STAR-RATING]].`
        },
        {
          cmd: "Web Components في React و Vue",
          title: "تستخدم custom element جوه React 19 و Vue",
          ref: [
            { t: "React: Custom HTML elements", url: "https://react.dev/reference/react-dom/components#custom-html-elements" },
            { t: "Vue: Vue and Web Components", url: "https://vuejs.org/guide/extras/web-components.html" },
          ],
          pre: [
            { to: "react", why: R`لو أول مرة تشوف JSX و [[useState]]` },
            { to: "js/dynamic import()", why: R`باج ترتيب التحميل في التمرين التالت معمول بـ [[import()]] بعد الـ render` },
          ],
          desc: R`React 19 بيدعم الـ custom elements كاملة: لو العنصر عنده property بنفس الاسم بيحطها property (فالـ arrays والـ objects بتوصل صح)، وإلا attribute، و [[onrating-change]] بيسمع لـ event اسمه [[rating-change]]. React 18 كان بيحوّل كل حاجة attribute نص، ومكانش بيسمع للـ custom events.

Vue بيدعمها من زمان: [[:labels="labels"]] و [[@rating-change="..."]] شغالين، بس لازم تقول للـ compiler إن الـ tag ده مش component بتاع Vue: [[compilerOptions.isCustomElement]].`,
          example: R`import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./star-rating.js";
function App() {
  const [rating, setRating] = useState(4);
  return (
    <>
      <star-rating
        value={rating}
        labels={["bad", "ok", "great"]}
        onrating-change={(e) => setRating(e.detail.value)}
      />
      <p id="react-out">rating in React: {rating}</p>
    </>
  );
}
createRoot(document.querySelector("#root")).render(<App />);`,
          try: R`خد [[star-rating.js]] من الدرس اللي فات، واعمل المثال بـ React 19 (Vite أو esbuild). اضغط النجمة التانية: الرقم في الـ [[<p>]] اتغير؟ وكام زرار ظهر؟ وبعدين نفس الكود بـ React 18: إيه اللي اتغير في الـ HTML؟ وفي Vue اكتب [[<star-rating :value="rating" :labels="labels" @rating-change="rating = $event.detail.value" />]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين جرّب في React 19: [[<star-rating onRatingChange={...} />]] مقابل [[onrating-change={...}]] لما العنصر بيبعت [[rating-change]].`, done: R`[[onrating-change]] بيشتغل و [[onRatingChange]] لأ: React 19 بيسمع لـ event اسمه بالظبط زي اللي بعد [[on]] ([[RatingChange]] بالحروف دي)، فلو عايز camelCase لازم العنصر يبعت event اسمه كده. ولو ابعت [[RatingChange]] من Console الـ handler التاني بيشتغل.`, sol: R`اتجرّب بـ React 19.3.1 و esbuild 0.28.2 في Chrome 158. [[star-rating.js]] هو بتاع درس «attributes و properties» زي ما هو (بيبعت [[rating-change]] بـ [[bubbles]] و [[composed]]).

~~~jsx d0.jsx
// d0.jsx: الاسمين جنب بعض على نفس العنصر
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./star-rating.js";

function App() {
  const [log, setLog] = useState([]);
  const add = (line) => setLog((l) => [...l, line]);
  return (
    <>
      <star-rating
        value={2}
        onrating-change={(e) => add("onrating-change: " + e.detail.value)}
        onRatingChange={(e) => add("onRatingChange: " + e.type)}
      />
      <pre id="log">{log.join("\n")}</pre>
    </>
  );
}
createRoot(document.querySelector("#root")).render(<App />);
~~~

~~~html d0.html
<!doctype html>
<meta charset="utf-8">
<div id="root"></div>
<script type="module" src="d0.bundle.js"></script>
~~~

~~~bash
npm i react@19 react-dom@19 esbuild
npx esbuild d0.jsx --bundle --format=esm --jsx=automatic --outfile=d0.bundle.js --define:process.env.NODE_ENV='"production"'
npx serve .
~~~

~~~text الناتج (Playwright ضغط النجمة الرابعة، وبعدين بعت RatingChange من الـ Console)
after click 4th star:
onrating-change: 4
after dispatching RatingChange:
onrating-change: 4
onRatingChange: RatingChange
~~~

- **[[onrating-change]] اشتغل:** React 19 لما يلاقي prop بيبدأ بـ [[on]] على tag فيه [[-]] وقيمته function، بيعمل [[addEventListener]] باسم الحدث = اللي بعد [[on]] بالظبط: [[rating-change]].
- **[[onRatingChange]] مااشتغلش مع الضغطة:** نفس القاعدة، فـ React سمع لحدث اسمه [[RatingChange]] (بالحروف الكبيرة دي). أسامي الأحداث حساسة لحالة الحروف، والعنصر بيبعت [[rating-change]].
- **لما بعتنا [[new CustomEvent("RatingChange")]] بإيدنا:** الـ handler التاني اشتغل وطبع [[e.type]] = [[RatingChange]]. ده الدليل إن React بيستخدم الاسم زي ما هو من غير ما يحوّله.
- **[[--define:process.env.NODE_ENV]]:** React بيقرا المتغير ده، والمتصفح مفيهوش [[process]]، فـ esbuild بيبدّله بنص ثابت وقت الـ bundle.

**الغلطة الشائعة:** تكتب [[onRatingChange]] عشان «ده شكل props في React»، والـ component بيبعت [[rating-change]] (الشكل المعتاد في Web Components)، فمفيش error ولا تحذير، الـ handler بس عمره ما بيتنادى. يا تكتب [[onrating-change]]، يا الـ component يبعت الاسمين.` },
            { lvl: 'تطبيق', t: R`صلّح التحذير في Vue: استخدم [[<star-rating>]] في Vite + Vue من غير config، وشوف Console، وبعدين زوّد [[compilerOptions.isCustomElement]] في [[vue()]] جوه [[vite.config]] بحيث أي tag فيه [[-]] ومش component بتاعك يتساب.`, done: R`قبل التصليح Console فيه [[Failed to resolve component: star-rating]]، وبعده التحذير بيختفي، و [[:labels]] بيوصل كـ array (٣ زراير مش ٥)، و [[@rating-change]] بيحدّث الـ ref، والـ components بتاعتك اللي فيها [[-]] (لو عندك) لسه شغالة.`, sol: R`اتجرّب بـ Vite 8.3.8 و Vue 3.5.46 و [[@vitejs/plugin-vue]] 6.0.11 في Chrome 158.

~~~text شجرة الملفات
vue-stars/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.js
    ├── App.vue
    ├── UiNote.vue        ← component بتاعي اسمه فيه شَرطة
    └── star-rating.js    ← من درس «attributes و properties»
~~~

~~~js src/main.js
import { createApp } from "vue";
import "./star-rating.js";
import App from "./App.vue";
createApp(App).mount("#app");
~~~

~~~html src/App.vue
<script setup>
import { ref } from "vue";
import UiNote from "./UiNote.vue";
const rating = ref(4);
const labels = ["bad", "ok", "great"];
</script>

<template>
  <star-rating :value="rating" :labels="labels" @rating-change="rating = $event.detail.value" />
  <p id="vue-out">rating in Vue: {{ rating }}</p>
  <ui-note>component بتاعي اسمه فيه شَرطة</ui-note>
</template>
~~~

~~~html src/UiNote.vue
<template><small class="note"><slot /></small></template>
~~~

**قبل التصليح:** [[vite.config.js]] فيه [[plugins: [vue()]]] بس.

~~~text Console (قبل)
[Vue warn]: Failed to resolve component: star-rating
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
  at <App>
buttons: 3 | labels: ["bad","ok","great"]
[Vue warn]: Failed to resolve component: star-rating     ← تاني مع كل re-render بعد الضغطة
rating in Vue: 2
~~~

لاحظ إن الصفحة اشتغلت رغم التحذير: Vue ملقاش component بالاسم ده فرسمه عنصر عادي. بس التحذير بيتكرر مع كل render، وفي الـ build الـ compiler بيعمل [[resolveComponent]] على الفاضي.

**التصليح:**

~~~js vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// الـ tags اللي فيها شَرطة ومش components بتاعتنا = custom elements
const myComponents = new Set(["ui-note"]);

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-") && !myComponents.has(tag),
        },
      },
    }),
  ],
});
~~~

~~~text Console (بعد)
buttons: 3 | labels: ["bad","ok","great"]
ui-note rendered as: <small class=note>
rating in Vue: 2
~~~

- **[[isCustomElement: (tag) => ...]]:** دالة بياخدها الـ template compiler وقت الـ build: لو رجّعت [[true]] للـ tag، Vue بيعمله [[createElement]] عادي ومبيدوّرش عليه كـ component.
- **[[!myComponents.has(tag)]]:** جرّبت الأول [[tag.includes("-")]] لوحدها، فالـ component بتاعي اتكسر: الصفحة رسمت [[<ui-note>component بتاعي اسمه فيه شَرطة</ui-note>]] كعنصر مجهول بدل [[<small class="note">]]. عشان كده الـ Set بيستثني components المشروع اللي في أسمائها شَرطة. (حل تاني: خلّي الـ custom elements كلها ببادئة ثابتة وافحص [[tag.startsWith("star-")]].)
- **[[:labels="labels"]]:** الـ [[:]] = قيمة JS. Vue لقى [[labels]] property على العنصر ([["labels" in el]]) فحطها property، فوصلت array و ٣ زراير مش ٥.
- **[[@rating-change]]:** بيسمع للحدث باسمه بالظبط، و [[$event]] هو الـ [[CustomEvent]] فالقيمة في [[$event.detail.value]].

**الغلطة الشائعة:** تحط [[isCustomElement]] في [[app.config.compilerOptions]] في [[main.js]] وانت شغال بـ Vite و ملفات [[.vue]]. ده بيأثر بس على الـ templates اللي بتتعمل compile في المتصفح (الـ full build)، أما ملفات [[.vue]] فبتتعمل compile وقت الـ build، فمكانها [[vite.config.js]].` },
            { lvl: 'تحدي', t: R`صلّح باج ترتيب التحميل: في React 19 خلّي [[import "./star-rating.js"]] يحصل **بعد** [[createRoot().render()]] (مثلًا [[setTimeout(() => import("./star-rating.js"))]])، واعمل [[labels={["bad", "ok", "great"]}]]. عدّ الزراير وبص على الـ HTML، وبعدين صلّحها.`, done: R`قبل التصليح بيظهر ٥ زراير مش ٣، والـ HTML فيه [[labels="bad,ok,great"]] كنص (React لقى العنصر مش متعرّف فحطها attribute)، وبعد التصليح ([[import]] قبل الـ render، أو [[await customElements.whenDefined("star-rating")]] قبل [[createRoot]]) بيظهر ٣ ومفيش attribute اسمه [[labels]].`, sol: R`اتجرّب بـ React 19.3.1 و esbuild 0.28.2 ([[--splitting]] عشان الـ [[import()]] يبقى ملف لوحده) في Chrome 158.

~~~jsx d2-bug.jsx
// d2-bug.jsx: الـ component بيتحمّل بعد الـ render
import { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [rating, setRating] = useState(4);
  return (
    <>
      <star-rating
        value={rating}
        labels={["bad", "ok", "great"]}
        onrating-change={(e) => setRating(e.detail.value)}
      />
      <p id="react-out">rating in React: {rating}</p>
    </>
  );
}
createRoot(document.querySelector("#root")).render(<App />);
setTimeout(() => import("./star-rating.js"), 300);
~~~

~~~text الناتج (قبل التصليح)
buttons: 5
html: <star-rating value="4" labels="bad,ok,great">
labels property: ["bad","ok","good","great","perfect"]
rating in React: 2
~~~

**ليه ٥؟** وقت الـ render [[star-rating]] لسه مش متعرّف، فـ React سأل [["labels" in el]] ولقاها [[false]] (عنصر [[HTMLElement]] عادي)، فحط [[labels]] **attribute** نص: [["bad,ok,great"]]. وبعد ٣٠٠ms الـ component اتعرّف واتعمله upgrade، بس هو مبيقراش attribute اسمه [[labels]]، فرسم الـ ٥ الافتراضيين. والـ [[onrating-change]] اشتغل عادي لأن [[addEventListener]] مبيفرقش معاه العنصر متعرّف ولا لأ.

~~~jsx d2-fix.jsx
// d2-fix.jsx: استنى الـ component يتعرّف قبل أول render
import { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [rating, setRating] = useState(4);
  return (
    <>
      <star-rating
        value={rating}
        labels={["bad", "ok", "great"]}
        onrating-change={(e) => setRating(e.detail.value)}
      />
      <p id="react-out">rating in React: {rating}</p>
    </>
  );
}
setTimeout(() => import("./star-rating.js"), 300);
await customElements.whenDefined("star-rating");
createRoot(document.querySelector("#root")).render(<App />);
~~~

~~~text الناتج (بعد التصليح)
buttons: 3
html: <star-rating value="4">
labels property: ["bad","ok","great"]
rating in React: 2
~~~

- **[[await customElements.whenDefined("star-rating")]]:** بيستنى لحد ما الاسم يتسجّل، وبعدها بس [[createRoot().render()]]. ساعتها React بيلاقي [[labels]] property فبيحطها array. والـ top-level [[await]] شغال لأن الـ bundle [[--format=esm]].
- **مفيش attribute اسمه [[labels]] في الـ HTML بعد التصليح:** ده الفحص اللي بيأكد إن القيمة راحت property.
- **الحل الأبسط لو تقدر:** [[import "./star-rating.js";]] فوق في نفس الملف قبل الـ render (زي مثال الدرس). [[whenDefined]] للحالة اللي الـ component جاي من [[<script>]] تاني أو CDN ومش في إيدك ترتيبه.

**الغلطة الشائعة:** تصلّحها جوه الـ component بإنه يقرا attribute [[labels]] ويعمله [[split(",")]]. ده بيخبّي المشكلة للـ arrays البسيطة بس، وأي object أو array فيه فاصلة هيوصل بايظ. الصح إن الـ property توصل property.` },
          ],
          flag: "script",
          deep: {
            why: R`أغلب ما هتقابل Web Components هيبقى جوه تطبيق React أو Vue: design system الشركة، أو widget من طرف تالت (دفع، خرايط، chat). لازم تعرف تبعتلهم داتا وتسمع للـ events، والفروق بين النسخ بتعمل bugs غريبة (array بقى نص [["bad,ok,great"]]).`,
            how: R`React 19: لما يرسم tag فيه [[-]]، لكل prop بيسأل «العنصر عنده property بالاسم ده؟» ([["labels" in el]]). لو آه بيعمل [[el.labels = value]]، وإلا [[setAttribute]]. والـ props اللي بتبدأ بـ [[on]] بتتحول [[addEventListener]] على اسم الـ event بعد [[on]] بالظبط ([[onrating-change]] ← [[rating-change]]). عشان كده الـ component لازم يتسجّل (يتعمل import) قبل الرسم.

React 18 وأقدم: كل prop على custom element بيبقى attribute نص (فالـ array بقى [["bad,ok,great"]])، والـ events لازم [[ref]] و [[addEventListener]] بإيدك.

Vue: الـ compiler لازم يعرف إن [[star-rating]] مش component. في Vite: [[vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.includes("-") } } })]]. من غيرها بيحاول يعمل [[resolveComponent]] ويطلّع warning. و [[:prop]] بيحطها property لو العنصر عنده property بالاسم ده (زي React 19). و Vue كمان بيعمل Web Components: [[defineCustomElement]] بيحوّل component بتاع Vue لـ custom element يشتغل في أي صفحة.`,
            when: R`design system مبني Web Components بيتستخدم في تطبيق React أو Vue، أو العكس: component بتاع Vue عايز تديه لفريق React (بـ [[defineCustomElement]]).`,
            mistakes: R`React 18: تبعت array وتلاقيه نص في الـ attribute، أو [[onRatingChange]] ومحدش بينادي. React 19: [[onRatingChange]] بحروف كبيرة بيسمع لـ [[RatingChange]] مش [[rating-change]]، فاكتب اسم الـ event زي ما هو. Vue: تنسى [[isCustomElement]] مع SFC في Vite فيطلع [[Failed to resolve component]]. وتعمل import للـ component بعد ما React رسم فيتعامل كعنصر مجهول وقتها.`
          },
          teach: R`## React 19

الـ bundle اتعمل بـ esbuild 0.28 (React 19.3.1)، واتجرّب في Chrome 156 headless. [[star-rating.js]] هو بتاع درس [[attributes و properties]].

---

## ١. الكود

- [[import "./star-rating.js"]]: import من غير أسماء = شغّل الملف بس، فيسجّل [[<star-rating>]]. لازم قبل [[render]].
- [[value={rating}]]: رقم. React شاف إن العنصر عنده property [[value]] (الـ getter/setter) فعمل [[el.value = 4]].
- [[labels={["bad", "ok", "great"]}]]: array، و [[labels]] property، فوصل array.
- [[onrating-change={(e) => setRating(e.detail.value)}]]: [[on]] + اسم الـ event بالظبط. [[e.detail.value]] الداتا اللي الـ component بعتها.
- [[<>...</>]]: Fragment، أكتر من عنصر من غير div زيادة.

## ٢. النتيجة

~~~text الناتج (React 19.3.1)
html: <star-rating value="4"></star-rating>
buttons: 3 | value prop: 4
rating in React: 2      (بعد الضغط على النجمة التانية)
~~~

- [[value="4"]] في الـ HTML: React حط الـ property، والـ setter عمل reflect.
- 3 أزرار: الـ array وصل.
- [[rating in React: 2]]: الـ event وصل و [[setRating]] اشتغل.

## ٣. نفس الكود بـ React 18.3

~~~text الناتج (React 18)
html: <star-rating value="4" labels="bad,ok,great"></star-rating>
buttons: 5 | value prop: 4
rating in React: 4      (بعد نفس الضغطة)
~~~

- [[labels="bad,ok,great"]]: React 18 حوّل الـ array لنص وحطه attribute، والـ component مش بيقرا attribute اسمه [[labels]]، فـ 5 أزرار (الافتراضي).
- [[rating in React: 4]]: [[onrating-change]] اتجاهل خالص.

| | React 18 | React 19 |
|---|---|---|
| prop بسيط ([[value]]) | attribute نص | property لو موجودة |
| array / object | attribute نص ([["bad,ok,great"]]) | property (الـ array نفسه) |
| [[onxxx]] | متجاهل (محتاج ref و addEventListener) | [[addEventListener("xxx")]] |

---

## Vue 3.5

~~~text vue-app.js (المهم)
const app = createApp({
  setup() {
    const rating = ref(4);
    const labels = ["bad", "ok", "great"];
    return { rating, labels };
  },
  template: $__bt
    <star-rating :value="rating" :labels="labels" @rating-change="rating = $event.detail.value" />
    <p id="vue-out">rating in Vue: {{ rating }}</p>$__bt,
});
app.config.compilerOptions.isCustomElement = (tag) => tag.includes("-");
app.mount("#app");
~~~

- [[:labels="labels"]]: الـ [[:]] = قيمة JavaScript مش نص. Vue شاف إن [[labels]] property على العنصر فحطها property.
- [[@rating-change="..."]]: [[addEventListener("rating-change")]]، و [[$event]] هو الـ event نفسه.
- [[isCustomElement]]: «أي tag فيه [[-]] اعتبره عنصر HTML، متدوّرش عليه كـ component».

~~~text الناتج (Vue 3.5.44)
html: <star-rating value="4"></star-rating>
buttons: 3
rating in Vue: 2
~~~

### من غير [[isCustomElement]]

الـ compiler بيطلّع كود مختلف. جرّبته بـ [[@vue/compiler-dom]] على نفس الـ template:

~~~text الناتج
without isCustomElement: const _component_star_rating = _resolveComponent("star-rating") | return (_openBlock(), _createBlock(_component_star_rating, {
with isCustomElement:    return (_openBlock(), _createElementBlock("star-rating", {
~~~

من غيره بيدوّر على component اسمه [[star-rating]]، ومش هيلاقيه:

~~~text Console
[Vue warn]: Failed to resolve component: star-rating
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
~~~

(في الـ template اللي بيتعمله compile في المتصفح، Vue بيسأل [[customElements.get(tag)]] لوحده فاشتغل من غير الإعداد. بس مع SFC في Vite، الـ compile بيحصل وقت الـ build ومحدش يعرف إيه المسجّل، فالإعداد لازم في [[vite.config]].)

### Vue بيعمل Web Component

~~~text vue-app.js
const HelloBadge = defineCustomElement({
  props: { name: String },
  styles: ["span { color: purple; }"],
  setup(props) {
    return () => h("span", $__btHi $__{props.name} from a Vue-made element$__bt);
  },
});
customElements.define("hello-badge", HelloBadge);
~~~

~~~text الناتج: hello-badge.shadowRoot.innerHTML
<style>span { color: purple; }</style><span>Hi Sara from a Vue-made element</span>
~~~

component بتاع Vue بقى [[<hello-badge name="Sara">]] يشتغل في أي صفحة، بـ shadow DOM والـ styles جواه.

---

## الخلاصة

| | React 19 | Vue 3 |
|---|---|---|
| تبعت array | [[labels={arr}]] | [[:labels="arr"]] |
| تسمع لـ event | [[onrating-change={fn}]] | [[@rating-change="fn"]] |
| إعداد | ولا حاجة | [[isCustomElement]] في الـ compiler |
| تعمل Web Component | مكتبات بره React | [[defineCustomElement]] |

وفي React 18 أو أقدم: [[ref]] و [[el.labels = ...]] و [[addEventListener]] بإيدك.`,
          lines: [
            R`[[useState]] من React عشان نحفظ التقييم في state، والـ component يترسم تاني لما يتغير.`,
            R`[[createRoot]] من [[react-dom/client]]: بتربط React بعنصر في الصفحة وترسم فيه.`,
            R`import من غير أسامي: بيشغّل الملف وبس، والملف بينادي [[customElements.define]]. لازم قبل الرسم، لأن React 19 بيسأل «العنصر عنده property بالاسم ده؟»، ولو العنصر لسه مش متسجّل مش هيلاقي [[labels]] فيبعتها attribute نص.`,
            R`component اسمه [[App]]، فيه الـ custom element وسطر بيعرض القيمة.`,
            R`state للتقييم بيبدأ بـ 4. و [[setRating]] هنستخدمها لما الـ component يبلّغنا بتغيير.`,
            R`الـ JSX اللي [[App]] بيرسمه.`,
            R`Fragment ([[<>]]): بيلم العنصرين من غير ما يضيف [[div]] زيادة في الصفحة، لأن الـ component لازم يرجّع حاجة واحدة.`,
            R`الـ custom element نفسه. React بيعرف إنه custom element من الشرطة في الاسم، فبيتعامل مع الـ props بطريقة غير [[div]].`,
            R`[[value]] رقم. React 19 لقى إن العنصر عنده property اسمها [[value]] (الـ getter/setter)، فعمل [[el.value = 4]] بدل [[setAttribute]]، والـ setter عمل reflect للـ attribute. React 18 كان بيحطه attribute نص على طول.`,
            R`array: [[labels]] property على العنصر، فـ React 19 بيبعت الـ array نفسه وتظهر 3 نجوم. في React 18 كان بيبقى attribute نص [[bad,ok,great]] والعنصر مش بيقراه، فتفضل 5.`,
            R`[[on]] + اسم الـ event بالظبط: React 19 بيسمع لـ event اسمه [[rating-change]]. لما اليوزر يضغط نجمة، [[e.detail.value]] فيها الرقم فنحدّث الـ state. لو كتبت [[onRatingChange]] هيسمع لـ [[RatingChange]] ومحدش بيبعته.`,
            R`نهاية [[<star-rating>]] (self-closing: من غير أولاد).`,
            R`سطر بيعرض القيمة اللي في state بتاع React، عشان نتأكد إن الـ event وصل وحدّثها.`,
            R`نهاية الـ Fragment اللي لامم العنصرين.`,
            R`نهاية الـ [[return]].`,
            R`نهاية [[App]].`,
            R`دوّر على [[#root]] في الصفحة، واعمل منه root لـ React، وارسم [[<App />]] جواه.`,
          ],
          sol: R`React 19.3.1: [[<star-rating value="4">]] و 3 أزرار، وبعد الضغطة [[rating in React: 2]].
React 18.3: [[<star-rating value="4" labels="bad,ok,great">]] و 5 أزرار، والرقم فضل [[4]] (الـ event متجاهل).
Vue 3.5.44 بالـ template ده و [[isCustomElement]]: 3 أزرار و [[rating in Vue: 2]].`
        },
        {
          cmd: "form-associated و ElementInternals",
          title: "component يدخل الفورم زي input حقيقي: قيمة، و required، و reset (ElementInternals)",
          ref: [
            { t: "MDN: ElementInternals", url: "https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals" },
            { t: "MDN: HTMLElement.attachInternals()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals" },
            { t: "MDN: ElementInternals.setFormValue()", url: "https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue" },
            { t: "MDN: ElementInternals.setValidity()", url: "https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity" },
            { t: "web.dev: More capable form controls", url: "https://web.dev/articles/more-capable-form-controls" },
          ],
          pre: [
            { to: "js/FormData و URLSearchParams", why: R`الـ component بيحط قيمته في نفس الـ [[FormData]] اللي الفورم بيبعتها` },
          ],
          desc: R`الـ custom element العادي الفورم مش شايفه: [[new FormData(form)]] مبيلاقيش قيمته، و [[required]] عليه ملوش معنى، و [[form.reset()]] مبيرجّعوش. الحل سطرين: [[static formAssociated = true]] في الـ class، و [[this.attachInternals()]] اللي بيرجّع [[ElementInternals]]: object خاص بالـ component بيكلّم بيه الفورم.

من [[ElementInternals]]: [[setFormValue(value)]] (القيمة اللي هتتبعت باسم الـ [[name]])، و [[setValidity(flags, message)]] (صالح ولا لأ، والرسالة)، و [[form]] و [[labels]]، و [[role]] و [[ariaValueNow]] لقارئ الشاشة من غير ما تحط attributes على العنصر، و [[states]] لـ [[:state()]] في CSS. ومعاهم callbacks: [[formResetCallback]] و [[formDisabledCallback]] و [[formAssociatedCallback]].

ده اللي بيخلّي مكتبات زي Shoelace و Material Web تعمل [[<sl-input>]] يتبعت مع الفورم من غير [[<input type="hidden">]] مخبّي جنبه.`,
          example: R`class StarRating extends HTMLElement {
  static formAssociated = true;
  #internals = this.attachInternals();
  #value = 0;
  connectedCallback() {
    this.tabIndex = 0;
    this.#internals.role = "slider";
    this.#internals.ariaValueMax = "5";
    this.addEventListener("click", () => (this.value = (this.#value % 5) + 1));
    this.#sync();
  }
  get value() { return this.#value; }
  set value(v) { this.#value = Number(v); this.#sync(); }
  get form() { return this.#internals.form; }
  get name() { return this.getAttribute("name"); }
  formResetCallback() { this.value = 0; }
  #sync() {
    this.#internals.setFormValue(this.#value ? String(this.#value) : null);
    if (this.hasAttribute("required") && !this.#value) this.#internals.setValidity({ valueMissing: true }, "اختار عدد النجوم");
    else this.#internals.setValidity({});
    this.#internals.ariaValueNow = String(this.#value);
    this.textContent = "★".repeat(this.#value) + "☆".repeat(5 - this.#value);
  }
}
customElements.define("star-rating", StarRating);
const form = document.querySelector("form");
const stars = form.querySelector("star-rating");
console.log(form.checkValidity(), JSON.stringify([...new FormData(form)]));
stars.click();
stars.click();
console.log(form.checkValidity(), JSON.stringify([...new FormData(form)]));
form.reset();
console.log(stars.value, JSON.stringify([...new FormData(form)]));`,
          try: R`حط فوق الـ script ده الـ HTML: [[<form><label>تقييمك <star-rating name="rating" required></star-rating></label><input name="note" value="hi"><button>ابعت</button></form>]]، وفي الـ CSS [[star-rating:invalid { outline: 2px solid red; }]]. افتح الصفحة: الإطار الأحمر ظاهر؟ دوس «ابعت» من غير نجوم: الفورم اتبعت ولا لأ؟ وبعدين امسح سطر [[static formAssociated = true]] وشوف أول error في الـ Console.`,
          practice: [
            { lvl: 'سريع', t: R`صلّح الكود البايظ: component اسمه [[<color-pick>]] فيه [[static formAssociated = true]]، والـ constructor بيعمل [[this.attachInternals()]]، و [[connectedCallback]] بيعمل [[this.attachInternals()]] تاني عشان يحط القيمة. شغّله وانقل العنصر من مكان لمكان في الصفحة ([[append]] في div تاني)، واقرا الـ error وصلّحه.`, done: R`ظهر [[NotSupportedError]] برسالة فيها [[ElementInternals for the specified element was already attached.]] أول ما الـ [[connectedCallback]] اتنادى، وصلّحته بإن الـ internals تتعمل مرة واحدة في field ([[#internals = this.attachInternals()]]) وكل حتة تستخدمها، والنقل بين الأماكن بقى يشتغل من غير errors.`, sol: R`**الكود البايظ:**

~~~html color-pick-bug.html
<form><div id="a"><color-pick name="color"></color-pick></div><div id="b"></div></form>
<script>
class ColorPick extends HTMLElement {
  static formAssociated = true;
  constructor() {
    super();
    this.attachInternals();
  }
  connectedCallback() {
    const internals = this.attachInternals();
    internals.setFormValue("#0ea5e9");
  }
}
customElements.define("color-pick", ColorPick);
document.querySelector("#b").append(document.querySelector("color-pick"));
</script>
~~~

~~~text الـ errors (Chrome 158، من pageerror في Playwright)
NotSupportedError: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.
NotSupportedError: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.
~~~

الـ error طلع **مرتين**: أول ما العنصر اتعمله upgrade ودخل الصفحة ([[connectedCallback]] الأولى)، وتاني لما اتنقل لـ [[#b]] ([[append]] بيشيله ويدخّله، فـ [[connectedCallback]] بتتنادى تاني). [[attachInternals()]] مسموح مرة واحدة بس في عمر العنصر.

**التصليح:**

~~~live 170 color-pick.html
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; } #a, #b { border: 1px dashed #999; padding: 8px; margin-block: 6px; }</style>
<form>
  <div id="a">A: <color-pick name="color"></color-pick></div>
  <div id="b">B: </div>
</form>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
class ColorPick extends HTMLElement {
  static formAssociated = true;
  #internals = this.attachInternals();
  #input = null;
  connectedCallback() {
    if (!this.#input) {
      this.#input = document.createElement("input");
      this.#input.type = "color";
      this.#input.value = "#0ea5e9";
      this.#input.addEventListener("input", () => this.#internals.setFormValue(this.#input.value));
      this.append(this.#input);
    }
    this.#internals.setFormValue(this.#input.value);
  }
}
customElements.define("color-pick", ColorPick);
const form = document.querySelector("form");
const pick = document.querySelector("color-pick");
log("in A: " + new FormData(form).get("color"));
document.querySelector("#b").append(pick);
log("moved to B: " + new FormData(form).get("color") + " | parent = " + pick.parentElement.id);
document.querySelector("#a").append(pick);
log("moved back to A: no error");
</script>
~~~

~~~text الناتج (Chrome 158، ونفسه في الصفحة الحية)
in A: #0ea5e9
moved to B: #0ea5e9 | parent = b
moved back to A: no error
~~~

- **[[#internals = this.attachInternals();]]:** field بيتعمل مرة واحدة لما الـ instance يتعمل (قبل الـ constructor body)، وكل الـ methods بتستخدم نفس الـ [[#internals]]. الـ [[#]] كمان بيخلّي الـ internals مش متاحة لأي كود بره، وده مهم: اللي معاه الـ internals يقدر يغيّر قيمة الفورم والـ validity.
- **[[if (!this.#input)]]:** نفس الفكرة للـ [[<input>]]: [[connectedCallback]] بتتنادى مع كل نقل، فبنبني مرة واحدة بس.
- **[[setFormValue]] في [[connectedCallback]] ومع كل [[input]]:** القيمة اللي في الفورم دايمًا هي اللون الحالي.

**الغلطة الشائعة:** تنقل [[attachInternals()]] لـ [[connectedCallback]] لوحدها (من غير الـ constructor) وتفتكر كده اتحلت. أول نقل للعنصر هيرمي نفس الـ error. القاعدة: كل حاجة «مرة واحدة» (internals، shadow root، listeners على العنصر نفسه) في الـ constructor أو field، و [[connectedCallback]] للحاجات اللي ينفع تتكرر.` },
            { lvl: 'تطبيق', t: R`ابني [[<tag-input name="tags">]]: بتكتب كلمة وتدوس Enter تبقى tag، وكل tag فيه ✕ يمسحه. القيمة اللي بتتبعت مع الفورم الـ tags كلها، كل واحد لوحده: اعمل [[FormData]] جوه الـ component وابعته لـ [[setFormValue]]، و [[min="1"]] بيخلّيه [[valueMissing]] لو فاضي، و [[formResetCallback]] بيفضّيه.`, done: R`بعد ٣ tags، [[new FormData(form).getAll("tags")]] بيرجّع الـ ٣ كلمات في array، و [[form.checkValidity()]] بـ [[false]] وهو فاضي و [[true]] بعد أول tag، و [[form.reset()]] بيفضّيه ويخلّي [[getAll]] array فاضية، والإيرور اللي بيظهر وانت بتبعت فاضي هو رسالتك انت.`, sol: R`~~~live 170 tag-input.html
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  tag-input:invalid { outline: 2px solid #dc2626; border-radius: 8px; }
</style>
<form id="f">
  <tag-input name="tags" min="1"></tag-input>
  <button>ابعت</button>
  <button type="reset">امسح</button>
</form>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
class TagInput extends HTMLElement {
  static formAssociated = true;
  #internals = this.attachInternals();
  #tags = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = $__bt
      <style>
        :host { display: inline-flex; flex-wrap: wrap; gap: 6px; padding: 6px; border: 1px solid #999; border-radius: 8px; }
        .tag { background: #e0f2fe; border-radius: 999px; padding: 2px 4px 2px 10px; }
        .tag button { border: 0; background: none; cursor: pointer; }
        input { border: 0; outline: none; font: inherit; min-width: 8ch; }
      </style>
      <span id="list"></span>
      <input placeholder="اكتب و Enter" aria-label="tag جديد">$__bt;
    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      const word = input.value.trim();
      if (word && !this.#tags.includes(word)) this.#tags.push(word);
      input.value = "";
      this.#sync();
    });
    this.shadowRoot.querySelector("#list").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-i]");
      if (!btn) return;
      this.#tags.splice(Number(btn.dataset.i), 1);
      this.#sync();
    });
  }
  connectedCallback() { this.#sync(); }
  get value() { return [...this.#tags]; }
  get validationMessage() { return this.#internals.validationMessage; }
  formResetCallback() { this.#tags = []; this.#sync(); }
  #sync() {
    const list = this.shadowRoot.querySelector("#list");
    list.replaceChildren(...this.#tags.map((t, i) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      const x = document.createElement("button");
      x.type = "button";
      x.dataset.i = i;
      x.textContent = "✕";
      x.setAttribute("aria-label", "امسح " + t);
      span.append(x);
      return span;
    }));
    const name = this.getAttribute("name");
    const data = new FormData();
    for (const t of this.#tags) data.append(name, t);
    this.#internals.setFormValue(data);
    const min = Number(this.getAttribute("min") ?? 0);
    if (this.#tags.length < min) {
      this.#internals.setValidity({ valueMissing: true }, $__btزوّد $__{min} tag على الأقل$__bt, this.shadowRoot.querySelector("input"));
    } else {
      this.#internals.setValidity({});
    }
  }
}
customElements.define("tag-input", TagInput);
const form = document.querySelector("#f");
form.addEventListener("submit", (e) => { e.preventDefault(); log("submit: " + JSON.stringify(new FormData(form).getAll("tags"))); });
form.querySelector("tag-input").addEventListener("invalid", (e) => log("invalid: " + e.target.validationMessage));
</script>
~~~

~~~text الناتج (Chrome 158: Playwright ضغط «ابعت» فاضي، وكتب css و html و «  js  » و css تاني، ومسح html، وبعت، وعمل reset)
invalid: زوّد 1 tag على الأقل
empty: [] valid=false
invalid: زوّد 1 tag على الأقل
after css, html, js, css: ["css","html","js"] valid=true
after ✕ on html: ["css","js"] valid=true
submit: ["css","js"]
invalid: زوّد 1 tag على الأقل
after reset: [] valid=false
~~~

**هتشوف إيه:** خانة بإطار أحمر. اكتب كلمة واضغط Enter تتحول لـ tag أزرق جنبه ✕، والإطار يختفي بعد أول tag. «ابعت» بيطبع الـ tags كـ array.

- **[[const data = new FormData(); data.append(name, t)]]:** ده سر القيم المتعددة. [[setFormValue]] بتقبل نص أو [[File]] أو [[FormData]]، ولو اديتها [[FormData]] كل entry فيها بيتبعت لوحده، فـ [[getAll("tags")]] بترجّع array زي [[<select multiple>]].
- **[[this.getAttribute("name")]]:** الاسم جاي من الـ HTML، فنفس الـ component ينفع بـ [[name="skills"]] في فورم تاني.
- **[[min]] و [[setValidity({ valueMissing: true }, ...)]]:** أقل من [[min]] = invalid برسالتك انت (أول سطر في الناتج). والـ anchor هو الـ [[<input>]] اللي جوه، فالفقاعة بتطلع عنده.
- **[[word && !this.#tags.includes(word)]]:** [[trim()]] شال المسافات من «  js  »، والفاضي والمكرر ([[css]] التانية) اتجاهلوا.
- **[[e.preventDefault()]] في الـ Enter:** من غيره Enter جوه فورم بيبعت الفورم.
- **[[replaceChildren]] و [[textContent]] بدل [[innerHTML]]:** الـ tag ممكن يبقى أي نص يكتبه اليوزر، فمنحطوش كـ HTML (XSS).
- **[[formResetCallback]]:** بيفضّي الـ array ويعمل [[#sync]]، فالقيمة رجعت [[[]]] والإطار الأحمر رجع.

**الغلطة الشائعة:** تبعت [[setFormValue(this.#tags.join(","))]]، فالسيرفر يستقبل نص واحد [["css,js"]]، وأي tag فيه فاصلة يبوّظ التقسيم.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: بـ playwright (أو في الـ Console لو مش متاح) اكتب ٦ تستات لـ [[star-rating]] بتاع الدرس: قيمة أول ما يفتح، وضغطة، و ٦ ضغطات بترجع لـ 1، و [[reset()]]، و [[required]] بيمنع [[submit]] (اسمع لـ [[invalid]] event)، و [[<fieldset disabled>]] حواليه بيخلّي [[formDisabledCallback]] يتنادى بـ [[true]]. وبعدين زوّد دعم الكيبورد (الأسهم) وخلّي التستات تمسكه.`, done: R`التستات الست بتعدّي، وتست الـ [[submit]] بيلاقي [[invalid]] event على [[STAR-RATING]] والفورم مااتبعتش، وبعد ضغطة واحدة [[submit]] اتبعت بـ [[rating=1]]، وتست الكيبورد بيفشل قبل ما تزوّد الأسهم وبيعدّي بعدها، و [[formDisabledCallback]] اتنادى بـ [[true]] ثم [[false]].`, sol: R`اتجرّب بـ playwright-core 1.65.1 و [[node:test]] (Node 24.22) على Chrome 158، وسيرفر static صغير.

~~~text شجرة الملفات
stars-tests/
├── star-rating.js          ← component الدرس + formDisabledCallback + الأسهم
├── star-rating.before.js   ← نفسه من غير الأسهم
├── test.html               ← فورم فيه fieldset و star-rating required
└── stars.test.mjs
~~~

~~~js star-rating.js
// star-rating.js: component الدرس + formDisabledCallback + الأسهم
class StarRating extends HTMLElement {
  static formAssociated = true;
  #internals = this.attachInternals();
  #value = 0;
  #disabled = false;
  connectedCallback() {
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
    this.#internals.role = "slider";
    this.#internals.ariaValueMin = "0";
    this.#internals.ariaValueMax = "5";
    this.addEventListener("click", this.#onClick);
    this.addEventListener("keydown", this.#onKey);
    this.#sync();
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.#onClick);
    this.removeEventListener("keydown", this.#onKey);
  }
  #onClick = () => {
    if (!this.#disabled) this.value = (this.#value % 5) + 1;
  };
  #onKey = (e) => {
    if (this.#disabled) return;
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    this.value = Math.min(5, Math.max(0, this.#value + step));
  };
  get value() { return this.#value; }
  set value(v) { this.#value = Number(v); this.#sync(); }
  get form() { return this.#internals.form; }
  get name() { return this.getAttribute("name"); }
  formResetCallback() { this.value = 0; }
  formDisabledCallback(disabled) {
    this.#disabled = disabled;
    (window.disabledCalls ??= []).push(disabled);
  }
  #sync() {
    this.#internals.setFormValue(this.#value ? String(this.#value) : null);
    if (this.hasAttribute("required") && !this.#value) this.#internals.setValidity({ valueMissing: true }, "اختار عدد النجوم");
    else this.#internals.setValidity({});
    this.#internals.ariaValueNow = String(this.#value);
    this.textContent = "★".repeat(this.#value) + "☆".repeat(5 - this.#value);
  }
}
customElements.define("star-rating", StarRating);
~~~

~~~html test.html
<!doctype html>
<meta charset="utf-8">
<form id="f">
  <fieldset id="fs">
    <star-rating name="rating" required></star-rating>
  </fieldset>
  <button>ابعت</button>
</form>
<script>
  window.submitted = [];
  window.invalidOn = [];
  const form = document.querySelector("#f");
  form.addEventListener("submit", (e) => { e.preventDefault(); submitted.push([...new FormData(form)]); });
  form.addEventListener("invalid", (e) => invalidOn.push(e.target.tagName), true);
  const s = document.createElement("script");
  s.src = new URLSearchParams(location.search).get("src") ?? "star-rating.js";
  document.body.append(s);
</script>
~~~

~~~js stars.test.mjs
// stars.test.mjs: node --test stars.test.mjs  (سيرفر static شغال في نفس الفولدر)
import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const SRC = process.env.SRC ?? "star-rating.js";
const URL = $__bthttp://localhost:$__{process.env.PORT ?? 8080}/test.html?src=$__{SRC}$__bt;
let browser, page;
before(async () => {
  browser = await chromium.launch({ channel: "chrome" });
  page = await browser.newPage();
});
after(() => browser.close());
beforeEach(async () => {
  await page.goto(URL);
  await page.waitForFunction(() => customElements.get("star-rating"));
});
const value = () => page.evaluate(() => document.querySelector("star-rating").value);
const sent = () => page.evaluate(() => new FormData(document.querySelector("#f")).get("rating"));

test("starts at 0 and sends nothing", async () => {
  assert.equal(await value(), 0);
  assert.equal(await sent(), null);
  assert.equal(await page.textContent("star-rating"), "☆☆☆☆☆");
});

test("one click = 1 star, sent as rating=1", async () => {
  await page.click("star-rating");
  assert.equal(await value(), 1);
  assert.equal(await sent(), "1");
});

test("6 clicks wrap back to 1", async () => {
  for (let i = 0; i < 6; i++) await page.click("star-rating");
  assert.equal(await value(), 1);
});

test("form.reset() goes back to 0", async () => {
  await page.click("star-rating");
  await page.click("star-rating");
  await page.evaluate(() => document.querySelector("#f").reset());
  assert.equal(await value(), 0);
  assert.equal(await sent(), null);
});

test("required blocks submit until there is a rating", async () => {
  await page.click("button");
  assert.deepEqual(await page.evaluate(() => invalidOn), ["STAR-RATING"]);
  assert.deepEqual(await page.evaluate(() => submitted), []);
  await page.click("star-rating");
  await page.click("button");
  assert.deepEqual(await page.evaluate(() => submitted), [[["rating", "1"]]]);
});

test("fieldset disabled calls formDisabledCallback(true) then (false)", async () => {
  await page.evaluate(() => { fs.disabled = true; });
  await page.click("star-rating", { force: true });
  assert.equal(await value(), 0, "a click while disabled changes nothing");
  await page.evaluate(() => { fs.disabled = false; });
  assert.deepEqual(await page.evaluate(() => window.disabledCalls), [true, false]);
});

test("keyboard: ArrowRight x3, ArrowLeft x1 = 2", async () => {
  await page.focus("star-rating");
  for (const k of ["ArrowRight", "ArrowRight", "ArrowRight", "ArrowLeft"]) await page.keyboard.press(k);
  assert.equal(await value(), 2);
  assert.equal(await page.evaluate(() => document.querySelector("star-rating").ariaValueNow ?? null), null, "ariaValueNow lives on internals, not on the element");
});
~~~

~~~bash
npm i -D playwright-core          # بيستخدم Chrome المتسطّب عندك (channel: "chrome")
npx serve -l 8080 .               # في ترمنال تاني
SRC=star-rating.before.js node --test stars.test.mjs
node --test stars.test.mjs
~~~

~~~text الناتج: قبل الأسهم
✔ starts at 0 and sends nothing (422.1485ms)
✔ one click = 1 star, sent as rating=1 (253.6942ms)
✔ 6 clicks wrap back to 1 (177.2882ms)
✔ form.reset() goes back to 0 (77.8818ms)
✔ required blocks submit until there is a rating (271.7247ms)
✔ fieldset disabled calls formDisabledCallback(true) then (false) (56.5651ms)
✖ keyboard: ArrowRight x3, ArrowLeft x1 = 2 (61.4088ms)
ℹ tests 7
ℹ pass 6
ℹ fail 1
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  0 !== 2
~~~

~~~text الناتج: بعد الأسهم
✔ starts at 0 and sends nothing (400.7564ms)
✔ one click = 1 star, sent as rating=1 (239.4079ms)
✔ 6 clicks wrap back to 1 (181.2032ms)
✔ form.reset() goes back to 0 (79.8301ms)
✔ required blocks submit until there is a rating (361.9266ms)
✔ fieldset disabled calls formDisabledCallback(true) then (false) (58.2476ms)
✔ keyboard: ArrowRight x3, ArrowLeft x1 = 2 (64.1746ms)
ℹ tests 7
ℹ pass 7
ℹ fail 0
~~~

- **[[beforeEach]] بيعمل [[page.goto]]:** كل تست بيبدأ من صفحة جديدة، فقيمة تست مبتدخلش في اللي بعده. و [[waitForFunction(() => customElements.get(...))]] بيستنى الـ component يتسجّل لأنه بيتحمّل بـ [[<script>]] بيتضاف من JS.
- **[[?src=]] في الـ URL:** نفس الصفحة بتحمّل النسختين، فالتستات واحدة والنسخة بتتغيّر بمتغير [[SRC]].
- **تست الـ [[required]]:** listener على الفورم بـ [[capture]] ([[true]]) بيمسك [[invalid]] من أي عنصر، لأن [[invalid]] مبيعملش bubble. اتأكدنا إنه جه من [[STAR-RATING]] وإن [[submitted]] فاضية، وبعد ضغطة واحدة الفورم اتبعت بـ [[rating=1]].
- **[[formDisabledCallback(disabled)]]:** المتصفح بيناديها لما [[<fieldset disabled>]] (أو [[disabled]] على العنصر نفسه) يتغيّر. خزّنا القيمة في [[#disabled]] عشان الضغط والكيبورد ميعملوش حاجة وهو disabled، وفي [[window.disabledCalls]] عشان التست يقراها: [[[true, false]]].
- **[[#onKey]]:** الأسهم يمين وفوق +1، وشمال وتحت -1، و [[Math.min(5, Math.max(0, ...))]] بيقص. و [[e.preventDefault()]] عشان السهم ميعملش scroll للصفحة. اتعمل كـ arrow function field عشان [[removeEventListener]] في [[disconnectedCallback]] يلاقي نفس الدالة.
- **التست الأخير بيفحص كمان إن [[ariaValueNow]] مش على العنصر:** الـ ARIA اللي بنحطه على [[#internals]] بيوصل لقارئ الشاشة من غير ما يظهر attribute في الـ HTML، فاللي بيستخدم الـ component يقدر يغطّيه بـ [[aria-valuenow]] بتاعه لو عايز.

**الغلطة الشائعة:** تكتب التست بـ [[page.keyboard.press]] من غير [[page.focus]] الأول، فالأسهم بتروح للـ [[body]] والتست يقع حتى بعد ما تزوّد الأسهم. العنصر محتاج [[tabIndex = 0]] عشان يقبل الـ focus أصلًا.` },
          ],
          flag: "script",
          deep: {
            why: R`أي design system فيه inputs مخصوصة: تقييم بالنجوم، و date picker، و tags، و rich text. من غير form-associated، كل واحد محتاج [[<input type="hidden">]] بيتنسخ له القيمة بإيدك، والـ validation والـ reset والـ autofill كلهم بيتكتبوا من الأول وبيبوظوا. بالـ ElementInternals الـ component بيبقى input حقيقي: الفورم والـ CSS ([[:invalid]]) وقارئ الشاشة كلهم بيتعاملوا معاه زي [[<input>]].`,
            how: R`[[static formAssociated = true]] بيقول للمتصفح «العنصر ده بيتبع الفورم اللي حواليه». و [[attachInternals()]] مسموحة مرة واحدة لكل عنصر، ولـ custom elements بس ([[NotSupportedError]] على [[div]]).

[[setFormValue(v)]]: [[v]] نص أو [[File]] أو [[FormData]] (لأكتر من قيمة)، و [[null]] يعني «مفيش قيمة» فمش هيتبعت خالص (زي checkbox مش متعلّم). [[setValidity({ valueMissing: true }, msg)]] بيخلّيه invalid، و [[setValidity({})]] صالح. الـ flags نفس أسامي [[ValidityState]]: [[valueMissing]] و [[tooShort]] و [[patternMismatch]] و [[customError]]...

الـ callbacks: [[formAssociatedCallback(form)]] لما يدخل فورم أو يخرج، و [[formDisabledCallback(disabled)]] لما [[<fieldset disabled>]] حواليه يتغير، و [[formResetCallback()]] مع [[form.reset()]]، و [[formStateRestoreCallback(state)]] لما المتصفح يرجّع القيمة (back أو autofill).

[[internals.role]] و [[ariaValueNow]] (اسمها ARIA reflection) بيحطوا الدور والقيمة في شجرة الـ accessibility من غير attributes ظاهرة في الـ HTML يقدر حد من برّه يغيّرها. و [[internals.states.add("on")]] بيخلّي [[:state(on)]] في CSS تمسك.`,
            when: R`أي component هيتحط جوه [[<form>]] وليه قيمة: تقييم، وتاريخ، وألوان، وtags، و rich text، و select مخصوص. ومش لزرار أو كارت أو حاجة عرض: دول مش محتاجين يتبعتوا مع الفورم.`,
            mistakes: R`تنسى [[static formAssociated = true]] فـ [[setFormValue]] يرمي [[NotSupportedError: ... The target element is not a form-associated custom element.]] وتنادي [[attachInternals()]] في [[connectedCallback]] فتتنادى تاني لما العنصر يتنقل وترمي. وتعمل [[getter]] لـ [[value]] من غير ما تنادي [[setFormValue]] لما القيمة تتغير، فالفورم بيبعت القيمة القديمة. وتنسى [[formResetCallback]] فالـ [[reset]] بيرجّع كل الخانات إلا بتاعتك. وتنسى [[tabIndex]] فمحدش يقدر يوصله بالكيبورد. وتنسى إن [[name]] لازم attribute على العنصر عشان القيمة تتبعت باسم.`
          },
          teach: R`## الفكرة في سطر

[[<star-rating name="rating" required>]] لازم يتصرف زي [[<input name="rating" required>]]: قيمته تتبعت مع الفورم، والفورم ميتبعتش لو هو فاضي، و [[reset]] يرجّعه صفر. المثال بيعمل ده بـ [[ElementInternals]] من غير أي [[<input type="hidden">]].

اتشغّل في Chrome 156 headless (عن طريق playwright-core) بالـ HTML اللي في «جرّب» (فورم فيه [[star-rating]] و [[input]] اسمه [[note]] قيمته [[hi]]).

---

## ١. السطرين اللي بيدخّلوه الفورم

~~~text app.js
class StarRating extends HTMLElement {
  static formAssociated = true;
  #internals = this.attachInternals();
  #value = 0;
~~~

- [[static formAssociated = true]]: [[static]] يعني على الـ class نفسه مش على كل عنصر. المتصفح بيقرا الخاصية دي وقت [[customElements.define]] ويقول «ده عنصر فورم».
- [[#internals = this.attachInternals()]]: field خاص (الـ [[#]] من درس «EventEmitter»). [[attachInternals()]] بترجّع [[ElementInternals]]: الـ object اللي الـ component بيكلّم بيه الفورم والـ accessibility. بنحطه في [[#]] عشان محدش برّه يقدر يغيّر قيمة الفورم من ورا الـ component.
- [[#value = 0]]: القيمة الحقيقية: عدد النجوم.

جرّبت [[attachInternals()]] مرتين على نفس العنصر، وعلى [[div]]، وجرّبت [[setFormValue]] على component من غير [[formAssociated]]:

~~~text الناتج (Chrome)
NotSupportedError: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.
NotSupportedError: Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.
NotSupportedError: Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element.
~~~

## ٢. [[connectedCallback]]: الكيبورد وقارئ الشاشة

~~~text app.js
  connectedCallback() {
    this.tabIndex = 0;
    this.#internals.role = "slider";
    this.#internals.ariaValueMax = "5";
    this.addEventListener("click", () => (this.value = (this.#value % 5) + 1));
    this.#sync();
  }
~~~

- [[tabIndex = 0]]: يخلّي العنصر يتوصله بـ Tab زي أي input.
- [[#internals.role = "slider"]]: يقول لقارئ الشاشة «ده slider». ده اسمه ARIA reflection: نفس [[role="slider"]] بس من غير attribute ظاهر في الـ HTML يقدر حد يمسحه.
- [[ariaValueMax = "5"]]: أقصى قيمة. من غيرها الـ slider كان بيتقري من 0 لـ 100 (شفت ده في شجرة الـ accessibility).
- [[(this.#value % 5) + 1]]: [[%]] باقي القسمة: كل ضغطة بتزوّد نجمة، وبعد 5 بترجع 1 (0←1، 4←5، 5←1).
- [[this.#sync()]]: يحدّث القيمة في الفورم والشكل أول مرة.

دي شجرة الـ accessibility بعد ضغطة (من Chrome DevTools Protocol):

~~~text الناتج
slider "تقييمك" invalid="false" focusable=true valuemin=0 valuemax=5 value=1
~~~

الاسم [["تقييمك"]] جه من الـ [[<label>]] اللي حواليه لوحده: عناصر الفورم بس هي اللي الـ label بيتربط بيها، والـ [[formAssociated]] خلّاه منهم.

## ٣. الـ getters والـ setters

~~~text app.js
  get value() { return this.#value; }
  set value(v) { this.#value = Number(v); this.#sync(); }
  get form() { return this.#internals.form; }
  get name() { return this.getAttribute("name"); }
~~~

- [[value]]: بيقرا ويكتب [[#value]]، والكتابة بتنادي [[#sync]] عشان الفورم يعرف على طول. [[Number(v)]] عشان [[stars.value = "3"]] تشتغل.
- [[form]]: الفورم اللي العنصر جواه. [[#internals.form]] بيعرفه لوحده (جرّبت: [[stars.form === form]] بـ [[true]]).
- [[name]]: زي [[input.name]]. الـ [[name]] الحقيقي اللي بيتبعت هو الـ attribute، والـ getter ده للي بيكتب JS بس.

## ٤. [[formResetCallback]]

~~~text app.js
  formResetCallback() { this.value = 0; }
~~~

المتصفح بيناديها لوحده لما [[form.reset()]] يحصل (أو زرار [[type="reset"]]). وفيه أخواتها:

| الـ callback | بيتنادى إمتى |
|---|---|
| [[formResetCallback()]] | [[form.reset()]]: رجّع القيمة الأولانية |
| [[formDisabledCallback(disabled)]] | [[<fieldset disabled>]] حواليه اتقفل أو اتفتح (جرّبتها: [[true]] ثم [[false]]) |
| [[formAssociatedCallback(form)]] | العنصر دخل فورم أو خرج منه (جرّبتها: اتنادى بالـ [[FORM]]) |
| [[formStateRestoreCallback(state)]] | المتصفح بيرجّع قيمة قديمة (Back، أو autofill)، من الـ docs |

## ٥. [[#sync]]: القيمة والـ validation

~~~text app.js
  #sync() {
    this.#internals.setFormValue(this.#value ? String(this.#value) : null);
    if (this.hasAttribute("required") && !this.#value) this.#internals.setValidity({ valueMissing: true }, "اختار عدد النجوم");
    else this.#internals.setValidity({});
    this.#internals.ariaValueNow = String(this.#value);
    this.textContent = "★".repeat(this.#value) + "☆".repeat(5 - this.#value);
  }
~~~

- [[#sync()]]: method خاصة (نفس فكرة الـ [[#]]).
- [[setFormValue(...)]]: دي القيمة اللي [[FormData]] هيشوفها باسم الـ [[name]]. لو صفر بنبعت [[null]] يعني «مفيش قيمة»، فمش هتتبعت خالص زي checkbox مش متعلّم.
- [[setValidity({ valueMissing: true }, "اختار عدد النجوم")]]: «أنا invalid، والسبب إن القيمة ناقصة، والرسالة دي». الـ flags نفس أسامي [[input.validity]]: [[valueMissing]] و [[tooShort]] و [[rangeOverflow]] و [[customError]]...
- [[setValidity({})]]: object فاضي يعني «مفيش مشاكل، أنا صالح».
- [[ariaValueNow]]: القيمة الحالية لقارئ الشاشة.
- [[textContent = "★".repeat(n) + "☆".repeat(5 - n)]]: [[repeat]] بتكرر النص n مرة: نجوم مليانة بالعدد، والباقي فاضية.

## ٦. التشغيل

~~~text app.js
customElements.define("star-rating", StarRating);
const form = document.querySelector("form");
const stars = form.querySelector("star-rating");
console.log(form.checkValidity(), JSON.stringify([...new FormData(form)]));
stars.click();
stars.click();
console.log(form.checkValidity(), JSON.stringify([...new FormData(form)]));
form.reset();
console.log(stars.value, JSON.stringify([...new FormData(form)]));
~~~

~~~text الناتج (Chrome 156)
false [["note","hi"]]
true [["rating","2"],["note","hi"]]
0 [["note","hi"]]
~~~

- [[[...new FormData(form)]]]: [[FormData]] بيلم كل قيم الفورم، و [[...]] بيحوّلها array من أزواج [[[name, value]]] عشان نطبعها.
- **السطر الأول**: [[checkValidity()]] بـ [[false]] لأن [[required]] والقيمة صفر، و [[rating]] مش في الـ FormData (القيمة [[null]]).
- **التاني**: بعد ضغطتين القيمة 2، فبقى صالح و [[rating]] بقى [["2"]] **قبل** [[note]]، بترتيب العناصر في الـ HTML زي أي input.
- **التالت**: [[form.reset()]] نادى [[formResetCallback]] فرجع صفر واختفى من الـ FormData.

### وكمان جرّبت

- [[star-rating:invalid]] في الـ CSS مسكت العنصر وهو فاضي: [[stars.matches(":invalid")]] بـ [[true]].
- [[form.requestSubmit()]] وهو فاضي: [[submit]] مااتعملش، وبدله [[invalid]] event اتبعت على [[STAR-RATING]]. وبعد ضغطة واحدة [[submit]] اتعمل بـ [[[["rating","1"],["note","hi"]]]].
- [[this.#internals.states.add("on")]] خلّى [[x-t:state(on) { color: red }]] تشتغل (لونه طلع [[rgb(255, 0, 0)]]): كده تعمل حالات CSS خاصة بالـ component.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[static formAssociated = true]] | العنصر ده بيتبع الفورم اللي حواليه زي input |
| [[this.attachInternals()]] | مرة واحدة بس، وبترجّع [[ElementInternals]] |
| [[setFormValue(v)]] | القيمة اللي هتتبعت، و [[null]] يعني متتبعتش |
| [[setValidity(flags, msg)]] و [[setValidity({})]] | invalid بسبب ورسالة، أو صالح |
| [[internals.role]] و [[ariaValueNow]] | الدور والقيمة لقارئ الشاشة من غير attributes |
| [[formResetCallback]] و [[formDisabledCallback]] | الفورم اتعمله reset أو الـ fieldset اتقفل |

- لازم [[name]] attribute عشان القيمة تتبعت باسم.
- كل ما القيمة تتغير نادي [[setFormValue]] و [[setValidity]] مع بعض.
- [[tabIndex = 0]] ودعم الكيبورد عليك انت، الـ internals مبتعملهمش.`,
          lines: [
            R`component اسمه [[StarRating]] بيورث [[HTMLElement]] زي أي custom element (درس «customElements.define»).`,
            R`[[static]] على الـ class نفسه: بيقول للمتصفح وقت الـ [[define]] إن العنصر ده بيتبع الفورم زي [[<input>]]. من غيره [[setFormValue]] بترمي [[NotSupportedError]].`,
            R`[[attachInternals()]] بترجّع [[ElementInternals]]: الـ object اللي الـ component بيكلّم بيه الفورم وقارئ الشاشة. مسموحة مرة واحدة بس، عشان كده في field بيتعمل مع العنصر، و [[#]] بتخليه خاص فمحدش برّه يغيّر قيمة الفورم.`,
            R`عدد النجوم الحالي، خاص برضه. القيمة اللي الفورم بيشوفها بتيجي من هنا عن طريق [[#sync]].`,
            R`بيتنادى لما العنصر يدخل الصفحة، فبنجهّز فيه الكيبورد وقارئ الشاشة والضغط.`,
            R`[[tabIndex = 0]] بيخلّي العنصر ياخد focus بـ Tab زي أي input، وإلا اللي بيستخدم الكيبورد مش هيوصله.`,
            R`بيقول لقارئ الشاشة إن ده [[slider]]، من غير attribute [[role]] ظاهر في الـ HTML (اسمها ARIA reflection). والاسم بييجي من الـ [[<label>]] اللي حواليه لوحده.`,
            R`أقصى قيمة 5. من غيرها قارئ الشاشة كان بيقول إن المدى من 0 لـ 100، لأن ده الافتراضي للـ slider.`,
            R`كل ضغطة بتزوّد نجمة، و [[% 5]] (باقي القسمة على 5) بيخلّيها ترجع 1 بعد 5. وبنكتب في [[this.value]] (الـ setter) مش في [[#value]] مباشرة، عشان الـ setter هو اللي بيبلّغ الفورم.`,
            R`بنحدّث القيمة في الفورم والشكل من أول ما العنصر يظهر، عشان [[required]] يتحسب صح قبل أي ضغطة.`,
            R`نهاية [[connectedCallback]].`,
            R`القراية: [[stars.value]] بيرجّع عدد النجوم كرقم.`,
            R`الكتابة: [[Number(v)]] عشان [[stars.value = "3"]] نص يشتغل برضه، وبعدها [[#sync]] يبلّغ الفورم ويرسم. أي كتابة من برّه أو من الضغط بتعدّي من هنا.`,
            R`الفورم اللي العنصر جواه، زي [[input.form]]. [[#internals.form]] بيعرفه لوحده من مكان العنصر في الصفحة.`,
            R`الاسم زي [[input.name]]. القيمة بتتبعت باسم الـ attribute [[name]]، والـ getter ده بس عشان الكود اللي بيقرا [[el.name]] يلاقيه.`,
            R`المتصفح بيناديها لوحده مع [[form.reset()]] أو زرار [[type="reset"]]: بنرجّع صفر، والـ setter بيبلّغ الفورم.`,
            R`method خاصة بتعمل كل اللي لازم يحصل لما القيمة تتغير، في مكان واحد.`,
            R`القيمة اللي [[FormData]] هيشوفها باسم الـ [[name]]. صفر يعني [[null]]: «مفيش قيمة» فمش هتتبعت خالص، زي checkbox مش متعلّم.`,
            R`لو عليه [[required]] والقيمة صفر: invalid بسبب [[valueMissing]] (نفس اسم [[input.validity.valueMissing]])، والرسالة اللي المتصفح هيعرضها لما الفورم يتبعت.`,
            R`غير كده [[setValidity({})]]: object فاضي يعني «مفيش مشاكل». لازم تناديها صراحةً، وإلا العنصر يفضل invalid من آخر مرة.`,
            R`القيمة الحالية لقارئ الشاشة، فبيقول «1 من 5» مثلًا.`,
            R`الشكل: [[repeat]] بتكرر النجمة المليانة بعدد القيمة، والفاضية للباقي لحد 5.`,
            R`نهاية [[#sync]].`,
            R`نهاية الـ class.`,
            R`بنسجّل الـ tag. المتصفح هنا بيقرا [[formAssociated]] ويربط أي [[<star-rating>]] بالفورم اللي حواليه.`,
            R`الفورم من الـ HTML اللي في «جرّب».`,
            R`الـ component جوه الفورم.`,
            R`[[checkValidity()]] بـ [[false]] لأنه [[required]] وفاضي. و [[[...new FormData(form)]]] بيحوّل قيم الفورم لـ array من أزواج عشان نطبعها، و [[rating]] مش فيها لأن القيمة [[null]].`,
            R`ضغطة: القيمة بقت 1.`,
            R`ضغطة تانية: القيمة بقت 2.`,
            R`دلوقتي [[true]]، و [[rating]] بقى [["2"]] في الـ FormData قبل [[note]] بترتيب العناصر في الـ HTML.`,
            R`[[reset()]] بيرجّع كل خانات الفورم، وبينادي [[formResetCallback]] بتاعنا.`,
            R`القيمة رجعت 0، و [[rating]] اختفى من الـ FormData تاني.`,
          ],
          sol: R`الناتج في Chrome 156: [[false [["note","hi"]]]] ثم [[true [["rating","2"],["note","hi"]]]] ثم [[0 [["note","hi"]]]]. الإطار الأحمر ظاهر وهو فاضي ([[:invalid]] مسكت)، ودوسة «ابعت» من غير نجوم مبعتتش الفورم: بدلها [[invalid]] event اتبعت على العنصر والمتصفح عرض «اختار عدد النجوم» (شكل الفقاعة نفسها من الـ docs، لأن الـ headless مبيرسمهاش).

لما تمسح [[static formAssociated = true]]، أول [[setFormValue]] جوه [[#sync]] بيرمي: [[NotSupportedError: Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element.]] ([[attachInternals()]] نفسها بتنجح، بس مش بتربطه بالفورم).

الدعم من الـ docs (MDN: ElementInternals): Chrome و Edge و Firefox، و Safari من 16.4.`
        },
        {
          cmd: "Declarative Shadow DOM و :defined",
          title: "الـ component يظهر صح من أول لحظة (من غير flash)، حتى قبل ما الـ JS يتحمّل",
          ref: [
            { t: "MDN: Using shadow DOM (declaratively with HTML)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM" },
            { t: "MDN: <template> (shadowrootmode)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template" },
            { t: "MDN: Element.setHTMLUnsafe()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTMLUnsafe" },
            { t: "MDN: :defined", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:defined" },
          ],
          desc: R`الـ custom element بيبقى عنصر فاضي مالوش شكل لحد ما الـ JS يتحمّل ويعمل [[customElements.define]]. على نت بطيء ده بيبان: الصفحة بتظهر بالنص الخام أو فاضية، وبعدين فجأة الـ component يترسم ويزق اللي تحته (flash وlayout shift).

فيه حلّين بيكمّلوا بعض:

• **Declarative Shadow DOM**: [[<template shadowrootmode="open">]] جوه العنصر في الـ HTML نفسه. الـ parser بيعمل الـ shadow root منه على طول، فالشكل والـ CSS الداخلي يظهروا قبل أي JS (وده اللي بيخلّي SSR للـ Web Components ممكن).
• **[[:defined]] و [[customElements.whenDefined]]**: [[:not(:defined)]] في CSS بتمسك العنصر لحد ما يتسجّل، فتحجز له مكان أو تخفيه، و [[whenDefined("x-y")]] Promise بتتحل لما يتسجّل عشان الكود اللي محتاجه يستنى.`,
          example: R`<style>
  user-badge:not(:defined) { opacity: 0.5; pointer-events: none; }
</style>
<user-badge>
  <template shadowrootmode="open">
    <style>b { color: teal; }</style>
    <b>★</b> <slot></slot>
  </template>
  سارة
</user-badge>
<script type="module">
  const first = document.querySelector("user-badge");
  console.log("قبل:", first.matches(":defined"), !!first.shadowRoot, getComputedStyle(first).opacity);
  class UserBadge extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) this.attachShadow({ mode: "open" }).innerHTML = "<style>b { color: teal; }</style><b>★</b> <slot></slot>";
      this.shadowRoot.querySelector("b").addEventListener("click", () => this.toggleAttribute("starred"));
    }
  }
  customElements.whenDefined("user-badge").then(() => console.log("whenDefined اتحلّت"));
  customElements.define("user-badge", UserBadge);
  console.log("بعد:", first.matches(":defined"), getComputedStyle(first).opacity);
  const extra = document.createElement("user-badge");
  extra.textContent = "علي";
  document.body.append(extra);
  console.log("من JS:", extra.shadowRoot.innerHTML.length > 0);
</script>`,
          try: R`احفظ المثال كـ [[index.html]] وشغّله بـ [[npx serve]]. وبعدين خلّي الـ [[define]] يتأخر: لفّه في [[setTimeout(() => { ... }, 2000)]] واعمل refresh: النجمة واللون ظاهرين من الأول؟ والعنصر باهت لمدة ثانيتين؟ وبعدين امسح الـ [[<template>]] من الـ HTML (يعني من غير Declarative Shadow DOM) وجرّب تاني: إيه اللي بيظهر في الثانيتين؟ وأخيرًا شيل [[if (!this.shadowRoot)]] وخلّي [[attachShadow]] دايمًا: إيه اللي اتكسر؟`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[div.innerHTML = '<x-y><template shadowrootmode="open"><b>hi</b></template></x-y>']] وبعدين [[div.firstChild.shadowRoot]]: هيرجّع إيه؟ ونفس الكلام بـ [[div.setHTMLUnsafe(...)]] بدل [[innerHTML]]؟ اكتب توقعك وبعدين شغّله في Console بتاع Chrome.`, done: R`[[innerHTML]] رجّع [[null]] والـ [[<template>]] فضل template عادي جوه العنصر، والـ Console طلّع تحذير فيه [[Use setHTMLUnsafe() or parseHTMLUnsafe() instead.]]، و [[setHTMLUnsafe]] رجّع shadow root فعلًا، وتقدر تقول ليه [[innerHTML]] مبيعملهاش (عشان الكود القديم ميتفاجئش).`, sol: R`~~~live 110 innerHTML مقابل setHTMLUnsafe
<div id="d1"></div>
<div id="d2"></div>
<pre id="log"></pre>
<script>
const log = (s) => { document.querySelector("#log").textContent += s + "\n"; console.log(s); };
const html = '<x-y><template shadowrootmode="open"><b>hi</b></template></x-y>';
const d1 = document.querySelector("#d1");
d1.innerHTML = html;
log("innerHTML:     shadowRoot = " + d1.firstChild.shadowRoot + " | first child = " + d1.firstChild.firstElementChild?.tagName);
const d2 = document.querySelector("#d2");
d2.setHTMLUnsafe(html);
log("setHTMLUnsafe: shadowRoot = " + d2.firstChild.shadowRoot + " | inside = " + d2.firstChild.shadowRoot.innerHTML);
const doc = Document.parseHTMLUnsafe("<body>" + html);
log("parseHTMLUnsafe: shadowRoot = " + doc.body.firstChild.shadowRoot);
</script>
~~~

~~~text Console (Chrome 158، ونفسه في الصفحة الحية)
Found declarative shadowrootmode attribute on a template, but declarative Shadow DOM is not being parsed. Use setHTMLUnsafe() or parseHTMLUnsafe() instead.
innerHTML:     shadowRoot = null | first child = TEMPLATE
setHTMLUnsafe: shadowRoot = [object ShadowRoot] | inside = <b>hi</b>
parseHTMLUnsafe: shadowRoot = [object ShadowRoot]
~~~

- **[[innerHTML]]:** رجّع [[null]]، والـ [[<template shadowrootmode>]] فضل [[<template>]] عادي جوه [[x-y]] (أول ابن = [[TEMPLATE]])، و Chrome طلّع التحذير اللي فوق بنصه.
- **[[setHTMLUnsafe(html)]]:** نفس [[innerHTML]] بس بيفهم Declarative Shadow DOM، فالـ shadow root اتعمل وجواه [[<b>hi</b>]].
- **[[Document.parseHTMLUnsafe(html)]]:** نفس الفكرة بس بيرجّع document جديد بدل ما يكتب في عنصر (لو عايز تـ parse من غير ما تعرض).
- **ليه [[innerHTML]] مبيعملهاش؟** عشان الكود القديم. مواقع كتير بتحط HTML من مصادر تانية بـ [[innerHTML]] ومتوقعة إن [[<template>]] يفضل template. لو [[innerHTML]] بدأ يعمل shadow roots فجأة، كود sanitizers قديم ممكن يعدّي حاجات مكانش بيشوفها (المحتوى جوه الـ shadow مش ظاهر لـ [[querySelector]] بتاعه). عشان كده الميزة الجديدة جت في دالة جديدة.
- **كلمة [[Unsafe]] في الاسم:** الدالة مبتعملش sanitize، زي [[innerHTML]] بالظبط. متديهاش نص جاي من يوزر.

**الغلطة الشائعة:** تجيب HTML فيه DSD بـ [[fetch]] (مثلًا partial من السيرفر) وتحطه بـ [[innerHTML]]، والكروت تظهر فاضية من غير shadow. استخدم [[setHTMLUnsafe]].` },
            { lvl: 'تطبيق', t: R`ابني [[<product-card>]] بيظهر صح على 3G: خلّي السيرفر (Node صغير أو حتى ملف HTML) يرجّع ٣ كروت كل واحد فيه [[<template shadowrootmode="open">]] بالصورة والاسم والسعر والـ CSS، وزرار «أضف للسلة» مبيشتغلش غير بعد الـ [[define]]. والكروت اللي بتتضاف بعدين من JS ([[createElement]]) بتعمل نفس الـ shadow بنفسها.`, done: R`في DevTools ← Network ← Slow 3G مع تعطيل كاش، الكروت بتبان بشكلها الكامل قبل ما ملف الـ JS يخلص تحميل، والزرار باهت ومبيستجبش بـ [[:not(:defined)]]، وبعد الـ [[define]] بيشتغل، و Lighthouse بيقول CLS قريب من 0، وكارت جديد من JS شكله زي القديم بالظبط.`, sol: R`~~~view 330 الشكل النهائي: ٣ كروت جاية بـ DSD من السيرفر
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>المنتجات</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; }
  
</style>
</head>
<body>
<h1>المنتجات</h1>
<product-card name="مج قهوة" price="120" color="#f59e0b"><template shadowrootmode="open"><style>
  :host { display: inline-block; width: 180px; margin: 6px; vertical-align: top; }
  article { border: 1px solid #ddd; border-radius: 12px; padding: 10px; font: 15px/1.5 system-ui, sans-serif; }
  img { display: block; width: 100%; height: 100px; border-radius: 8px; object-fit: cover; }
  h3 { margin: 8px 0 2px; font-size: 16px; }
  .price { color: #0b6e4f; font-weight: 700; }
  button { width: 100%; margin-top: 6px; padding: 6px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font: inherit; cursor: pointer; }
  :host(:not(:defined)) button { opacity: 0.4; pointer-events: none; }
</style>
<article>
  <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22180%22%20height%3D%22100%22%3E%3Crect%20width%3D%22180%22%20height%3D%22100%22%20fill%3D%22%23f59e0b%22%2F%3E%3C%2Fsvg%3E" alt="" width="180" height="100">
  <h3>مج قهوة</h3>
  <div class="price">120 ج.م</div>
  <button type="button">أضف للسلة</button>
</article></template></product-card>
<product-card name="دفتر A5" price="65" color="#10b981"><template shadowrootmode="open"><style>
  :host { display: inline-block; width: 180px; margin: 6px; vertical-align: top; }
  article { border: 1px solid #ddd; border-radius: 12px; padding: 10px; font: 15px/1.5 system-ui, sans-serif; }
  img { display: block; width: 100%; height: 100px; border-radius: 8px; object-fit: cover; }
  h3 { margin: 8px 0 2px; font-size: 16px; }
  .price { color: #0b6e4f; font-weight: 700; }
  button { width: 100%; margin-top: 6px; padding: 6px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font: inherit; cursor: pointer; }
  :host(:not(:defined)) button { opacity: 0.4; pointer-events: none; }
</style>
<article>
  <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22180%22%20height%3D%22100%22%3E%3Crect%20width%3D%22180%22%20height%3D%22100%22%20fill%3D%22%2310b981%22%2F%3E%3C%2Fsvg%3E" alt="" width="180" height="100">
  <h3>دفتر A5</h3>
  <div class="price">65 ج.م</div>
  <button type="button">أضف للسلة</button>
</article></template></product-card>
<product-card name="قلم حبر" price="40" color="#6366f1"><template shadowrootmode="open"><style>
  :host { display: inline-block; width: 180px; margin: 6px; vertical-align: top; }
  article { border: 1px solid #ddd; border-radius: 12px; padding: 10px; font: 15px/1.5 system-ui, sans-serif; }
  img { display: block; width: 100%; height: 100px; border-radius: 8px; object-fit: cover; }
  h3 { margin: 8px 0 2px; font-size: 16px; }
  .price { color: #0b6e4f; font-weight: 700; }
  button { width: 100%; margin-top: 6px; padding: 6px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font: inherit; cursor: pointer; }
  :host(:not(:defined)) button { opacity: 0.4; pointer-events: none; }
</style>
<article>
  <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22180%22%20height%3D%22100%22%3E%3Crect%20width%3D%22180%22%20height%3D%22100%22%20fill%3D%22%236366f1%22%2F%3E%3C%2Fsvg%3E" alt="" width="180" height="100">
  <h3>قلم حبر</h3>
  <div class="price">40 ج.م</div>
  <button type="button">أضف للسلة</button>
</article></template></product-card>
<p id="cart">السلة: 0</p>
<script type="module">
  let n = 0;
  document.addEventListener("add-to-cart", () => (document.querySelector("#cart").textContent = "السلة: " + ++n));
</script>
<script type="module">
// card-template.mjs: شكل الكارت من جوه، نفس الملف بيستخدمه السيرفر والمتصفح
const CARD_CSS = $__bt
  :host { display: inline-block; width: 180px; margin: 6px; vertical-align: top; }
  article { border: 1px solid #ddd; border-radius: 12px; padding: 10px; font: 15px/1.5 system-ui, sans-serif; }
  img { display: block; width: 100%; height: 100px; border-radius: 8px; object-fit: cover; }
  h3 { margin: 8px 0 2px; font-size: 16px; }
  .price { color: #0b6e4f; font-weight: 700; }
  button { width: 100%; margin-top: 6px; padding: 6px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font: inherit; cursor: pointer; }
  :host(:not(:defined)) button { opacity: 0.4; pointer-events: none; }
$__bt;

const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function cardShadow({ name, price, color }) {
  const img = $__btdata:image/svg+xml,$__{encodeURIComponent($__bt<svg xmlns="http://www.w3.org/2000/svg" width="180" height="100"><rect width="180" height="100" fill="$__{color}"/></svg>$__bt)}$__bt;
  return $__bt<style>$__{CARD_CSS}</style>
<article>
  <img src="$__{img}" alt="" width="180" height="100">
  <h3>$__{escapeHTML(name)}</h3>
  <div class="price">$__{Number(price)} ج.م</div>
  <button type="button">أضف للسلة</button>
</article>$__bt;
}

// product-card.js: الـ component. لو السيرفر بعت DSD بيستخدمه، وإلا بيبني الـ shadow بنفسه

class ProductCard extends HTMLElement {
  #wired = false;
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" }).innerHTML = cardShadow({
        name: this.getAttribute("name") ?? "",
        price: this.getAttribute("price") ?? 0,
        color: this.getAttribute("color") ?? "#ccc",
      });
    }
    if (this.#wired) return;
    this.#wired = true;
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("add-to-cart", { bubbles: true, detail: { name: this.getAttribute("name") } }));
    });
  }
}
customElements.define("product-card", ProductCard);
</script>
</body>
</html>
~~~

**هتشوف إيه:** ٣ كروت كاملة (الصورة والاسم والسعر والزرار) بتظهر مع أول رسمة للصفحة، وزرار «أضف للسلة» باهت ومبيستجبش لحد ما ملف الـ JS يوصل، وبعدها بيشتغل ويزوّد «السلة». (الشكل اللي فوق ملف واحد عشان يشتغل في المعاينة، والمشروع الحقيقي ٣ ملفات تحت.)

~~~text شجرة الملفات
product-cards/
├── card-template.mjs   ← شكل الكارت من جوه: السيرفر والمتصفح بيستخدموه
├── product-card.js     ← الـ component
└── server.mjs          ← بيرجّع الصفحة بالكروت جاهزة
~~~

~~~js card-template.mjs
// card-template.mjs: شكل الكارت من جوه، نفس الملف بيستخدمه السيرفر والمتصفح
export const CARD_CSS = $__bt
  :host { display: inline-block; width: 180px; margin: 6px; vertical-align: top; }
  article { border: 1px solid #ddd; border-radius: 12px; padding: 10px; font: 15px/1.5 system-ui, sans-serif; }
  img { display: block; width: 100%; height: 100px; border-radius: 8px; object-fit: cover; }
  h3 { margin: 8px 0 2px; font-size: 16px; }
  .price { color: #0b6e4f; font-weight: 700; }
  button { width: 100%; margin-top: 6px; padding: 6px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; font: inherit; cursor: pointer; }
  :host(:not(:defined)) button { opacity: 0.4; pointer-events: none; }
$__bt;

const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function cardShadow({ name, price, color }) {
  const img = $__btdata:image/svg+xml,$__{encodeURIComponent($__bt<svg xmlns="http://www.w3.org/2000/svg" width="180" height="100"><rect width="180" height="100" fill="$__{color}"/></svg>$__bt)}$__bt;
  return $__bt<style>$__{CARD_CSS}</style>
<article>
  <img src="$__{img}" alt="" width="180" height="100">
  <h3>$__{escapeHTML(name)}</h3>
  <div class="price">$__{Number(price)} ج.م</div>
  <button type="button">أضف للسلة</button>
</article>$__bt;
}
~~~

~~~js product-card.js
// product-card.js: الـ component. لو السيرفر بعت DSD بيستخدمه، وإلا بيبني الـ shadow بنفسه
import { cardShadow } from "./card-template.mjs";

class ProductCard extends HTMLElement {
  #wired = false;
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" }).innerHTML = cardShadow({
        name: this.getAttribute("name") ?? "",
        price: this.getAttribute("price") ?? 0,
        color: this.getAttribute("color") ?? "#ccc",
      });
    }
    if (this.#wired) return;
    this.#wired = true;
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("add-to-cart", { bubbles: true, detail: { name: this.getAttribute("name") } }));
    });
  }
}
customElements.define("product-card", ProductCard);
~~~

~~~js server.mjs
// server.mjs: node server.mjs  ثم افتح http://localhost:8080/ (DSD) أو /?mode=js (من غير DSD)
import http from "node:http";
import { readFile } from "node:fs/promises";
import { cardShadow } from "./card-template.mjs";

const products = [
  { name: "مج قهوة", price: 120, color: "#f59e0b" },
  { name: "دفتر A5", price: 65, color: "#10b981" },
  { name: "قلم حبر", price: 40, color: "#6366f1" },
];
const attrs = (p) => $__btname="$__{p.name}" price="$__{p.price}" color="$__{p.color}"$__bt;

function page(mode) {
  const cards = products.map((p) => mode === "js"
    ? $__bt<product-card $__{attrs(p)}></product-card>$__bt
    : $__bt<product-card $__{attrs(p)}><template shadowrootmode="open">$__{cardShadow(p)}</template></product-card>$__bt
  ).join("\n");
  return $__bt<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>المنتجات</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; }
  $__{mode === "js" ? "product-card:not(:defined) { visibility: hidden; }" : ""}
</style>
</head>
<body>
<h1>المنتجات</h1>
$__{cards}
<p id="cart">السلة: 0</p>
<script type="module">
  let n = 0;
  document.addEventListener("add-to-cart", () => (document.querySelector("#cart").textContent = "السلة: " + ++n));
</script>
<script type="module" src="/product-card.js"></script>
</body>
</html>$__bt;
}

const types = { ".js": "text/javascript", ".mjs": "text/javascript" };
http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(page(url.searchParams.get("mode")));
  }
  const file = url.pathname.slice(1);
  if (!["product-card.js", "card-template.mjs"].includes(file)) {
    res.writeHead(404);
    return res.end("not found");
  }
  res.writeHead(200, { "content-type": types[file.slice(file.lastIndexOf("."))] });
  res.end(await readFile(new URL(file, import.meta.url)));
}).listen(process.env.PORT ?? 8080, () => console.log("http://localhost:" + (process.env.PORT ?? 8080)));
~~~

~~~bash
node server.mjs      # افتح http://localhost:8080/  وفي DevTools: Network ← Slow 3G و Disable cache
~~~

~~~text الناتج (Chrome 158 بـ Slow 3G من CDP: latency 2000ms و 50KB/s، والكروت اتقرت قبل وبعد الـ JS)
before JS: t=2119ms defined=false shadow=true button opacity=0.4 pointer-events=none
after define: t=6309ms defined=true shadow=true button opacity=1 pointer-events=auto
السلة: 1
createElement card same shadow as server card: true
~~~

- **[[<template shadowrootmode="open">]] جوه كل [[<product-card>]]:** الـ HTML parser بيعمل الـ shadow root وهو بيقرا الصفحة، من غير أي JS. عشان كده عند 2.1 ثانية الكروت كان ليها shadow ومترسومة، والـ component لسه مش متعرّف.
- **[[:host(:not(:defined)) button]] جوه الـ CSS:** selectors الصفحة مبتدخلش الـ shadow، فالزرار الباهت لازم يتكتب من جوه. [[:host(...)]] بيسأل عن حالة العنصر نفسه، و [[pointer-events: none]] بيمنع الضغط لحد الـ [[define]].
- **[[cardShadow()]] في ملف مشترك:** السيرفر بيكتب نفس الـ markup اللي المتصفح بيبنيه، فالكارت الجديد من JS شكله زي القديم بالظبط (آخر سطر: [[true]]).
- **[[escapeHTML]] للاسم:** الاسم بيتحط جوه HTML من السيرفر، فأي [[<]] فيه لازم يتحوّل.
- **[[if (!this.shadowRoot)]]:** الكارت اللي جه بـ DSD عنده shadow root من الأول، فالـ component مبيرسمش فوقه. اللي جاي من [[createElement]] معندوش، فبيبني.

**الغلطة اللي حصلت فعلًا وأنا ببنيه:** أول نسخة كانت بتبني الـ shadow في الـ [[constructor]]، والسطر الأخير طلع [[false]]: الكارت الجديد كان اسمه فاضي. [[createElement("product-card")]] بيشغّل الـ constructor **قبل** [[setAttribute("name", ...)]]، فـ [[getAttribute]] رجّعت [[null]]. التصليح: البناء في [[connectedCallback]] (زي ما درس «customElements.define» قال)، و [[#wired]] عشان الـ listener يتحط مرة واحدة لو العنصر اتنقل.

**حاجة اتقاست ومش متوقعة:** الزرار اشتغل عند 6.3 ثانية مش 4: [[product-card.js]] وصل عند 4 ثواني، وبعدين طلب [[card-template.mjs]] ده round trip تاني بـ 2 ثانية. لو عايز تقصّرها: [[<link rel="modulepreload" href="/card-template.mjs">]] في الـ [[<head>]] بيخلّي الملفين يتطلبوا مع بعض.` },
            { lvl: 'تحدي', t: R`قارن وقيس: نفس صفحة الـ ٣ كروت بطريقتين: (١) من غير DSD و [[product-card:not(:defined) { visibility: hidden }]]، و (٢) بـ DSD. قيس في Chrome DevTools ← Performance (أو Lighthouse) بـ Slow 3G: إمتى الكروت تظهر (FCP و LCP)، وكام CLS، واكتب جدول بالأرقام.`, done: R`عندك جدول فيه FCP و LCP و CLS للطريقتين من ٣ تشغيلات لكل واحدة، والـ DSD بيظهر الكروت قبل ما الـ JS يخلص (LCP أقل بفرق واضح على Slow 3G)، وكتبت جملة بالعيب: الـ HTML بقى أكبر لأن الـ CSS بيتكرر في كل كارت.`, sol: R`نفس مشروع التمرين اللي فات ([[server.mjs]] بيرجّع الطريقتين: [[/?mode=js]] من غير DSD و [[product-card:not(:defined) { visibility: hidden }]]، و [[/]] بـ DSD). القياس بسكربت بدل Lighthouse عشان يتكرر بنفس الظروف:

~~~js measure.mjs
// measure.mjs: node measure.mjs  (server.mjs شغال) — بيقيس الطريقتين ٣ مرات على Slow 3G
import { chromium } from "playwright-core";

const BASE = $__bthttp://localhost:$__{process.env.PORT ?? 8080}/$__bt;
const SLOW_3G = { offline: false, latency: 2000, downloadThroughput: 50000, uploadThroughput: 50000 }; // نفس أرقام Slow 3G القديمة في DevTools
const browser = await chromium.launch({ channel: "chrome" });

async function run(mode) {
  const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0 };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (__m.lcp = e.startTime))).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) __m.cls += e.value; })).observe({ type: "layout-shift", buffered: true });
  });
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", SLOW_3G);
  await page.bringToFront();
  await page.goto(BASE + (mode === "js" ? "?mode=js" : ""), { waitUntil: "load" });
  await page.waitForTimeout(1000);
  const r = await page.evaluate(() => {
    const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
    const js = performance.getEntriesByType("resource").find((e) => e.name.endsWith("product-card.js"));
    const html = performance.getEntriesByType("navigation")[0];
    return { fcp, lcp: __m.lcp, cls: __m.cls, jsDone: js.responseEnd, htmlBytes: html.transferSize };
  });
  await ctx.close();
  return r;
}

const rows = [];
for (const mode of ["js", "dsd"]) for (let i = 1; i <= 3; i++) {
  const r = await run(mode);
  rows.push({ mode, run: i, FCP: Math.round(r.fcp), LCP: Math.round(r.lcp), CLS: r.cls.toFixed(3), "JS done": Math.round(r.jsDone), "HTML bytes": r.htmlBytes });
}
console.table(rows);
await browser.close();
~~~

~~~bash
node server.mjs          # ترمنال
node measure.mjs         # ترمنال تاني
~~~

~~~text الناتج (Chrome 158 headless، Slow 3G، كاش مقفول، كل تشغيلة context جديد)
┌─────────┬───────┬─────┬──────┬──────┬─────────┬─────────┬────────────┐
│ (index) │ mode  │ run │ FCP  │ LCP  │ CLS     │ JS done │ HTML bytes │
├─────────┼───────┼─────┼──────┼──────┼─────────┼─────────┼────────────┤
│ 0       │ 'js'  │ 1   │ 2092 │ 6168 │ '0.021' │ 4078    │ 1077       │
│ 1       │ 'js'  │ 2   │ 2064 │ 6200 │ '0.021' │ 4088    │ 1077       │
│ 2       │ 'js'  │ 3   │ 2072 │ 6180 │ '0.021' │ 4065    │ 1077       │
│ 3       │ 'dsd' │ 1   │ 2088 │ 2088 │ '0.000' │ 4135    │ 4197       │
│ 4       │ 'dsd' │ 2   │ 2088 │ 2088 │ '0.000' │ 4145    │ 4197       │
│ 5       │ 'dsd' │ 3   │ 2104 │ 2104 │ '0.000' │ 4150    │ 4197       │
└─────────┴───────┴─────┴──────┴──────┴─────────┴─────────┴────────────┘
~~~

| | من غير DSD | بـ DSD |
|---|---|---|
| FCP (أول رسمة) | حوالي 2.07 ثانية | حوالي 2.09 ثانية |
| LCP (الكروت ظهرت) | حوالي 6.18 ثانية | حوالي 2.09 ثانية |
| CLS | 0.021 | 0 |
| حجم الـ HTML | 1077 byte | 4197 byte |

**الخلاصة بالأرقام:** FCP واحد تقريبًا (العنوان بيظهر مع أول رسمة في الحالتين)، بس الكروت في الطريقة الأولى مخفية لحد ما الـ JS والـ module اللي بيستورده يوصلوا، فالـ LCP اتأخر 4 ثواني. وبـ DSD الكروت هي أول رسمة، فـ LCP = FCP.

- **CLS 0.021 من غير DSD:** العنصر قبل الـ [[define]] inline فاضي مالوش حجم ([[visibility: hidden]] بيخفي بس مبيحجزش مكان لحاجة مش موجودة)، فلما الـ shadow اتبنى سطر «السلة» نزل تحت. بـ DSD الكروت ليها حجمها من الأول.
- **العيب:** الـ HTML بقى أكبر ٤ مرات تقريبًا (4197 مقابل 1077) لأن الـ [[<style>]] بتاع الكارت اتكرر ٣ مرات. مع ١٠٠ كارت ده كتير. الحلول: الـ CSS المشترك في ملف واحد بـ [[<link rel="stylesheet">]] جوه الـ template (المتصفح بيحمّله مرة)، أو ضغط gzip اللي بيقلل التكرار جدًا.
- **ليه ٣ تشغيلات:** عشان تتأكد إن الرقم ثابت ومش صدفة. هنا الفرق بين التشغيلات أقل من 40ms لأن الـ throttling ثابت، وعلى شبكة حقيقية الفرق بيبقى أكبر.

**الغلطة الشائعة:** تقيس بالـ cache شغال، فالـ JS بييجي من الكاش في التشغيلة التانية والطريقتين يبانوا زي بعض. [[setCacheDisabled]] و context جديد لكل تشغيلة.` },
          ],
          flag: "script",
          deep: {
            why: R`الـ Web Components من غير DSD كانت محتاجة JS عشان تتعرض خالص، فمكانتش بتنفع مع SSR ولا مع SEO ولا على نت بطيء: الصفحة بتفضل فاضية أو بتنط. DSD خلّى السيرفر يبعت الـ shadow DOM جاهز في الـ HTML، و [[:defined]] بيخلّيك تتحكم في الشكل في الفترة اللي قبل ما الـ JS يوصل.`,
            how: R`الـ parser لما يلاقي [[<template shadowrootmode="open">]] كأول ولد لعنصر، بيعمل [[attachShadow]] للعنصر ويحط محتوى الـ template جوه الـ shadow root، والـ template نفسه بيختفي من الـ DOM (جرّبت: [[document.querySelectorAll("template").length]] بـ 0). ده بيحصل وقت الـ parsing بس: [[innerHTML]] مبيعملهوش، لازم [[setHTMLUnsafe]] أو [[Document.parseHTMLUnsafe]].

لما الـ [[define]] يحصل بعدين، الـ constructor بيلاقي [[this.shadowRoot]] موجود فعلًا. لو ناديت [[attachShadow]] على عنصر عنده declarative shadow root، المتصفح بيرجّع **نفس** الـ root بس **فاضي** (جرّبتها: [[r === el.shadowRoot]] بـ [[true]] و [[innerHTML]] بـ [[""]]). عشان كده [[if (!this.shadowRoot)]].

[[shadowrootmode="closed"]]: [[el.shadowRoot]] بـ [[null]] من برّه، والـ component يوصله من [[this.attachInternals().shadowRoot]] (جرّبت: رجّع المحتوى).

[[:defined]] بتمسك أي عنصر HTML عادي، وأي custom element **بعد** ما اتسجّل. و [[customElements.whenDefined(name)]] بتتحل بالـ class لما الاسم يتسجّل، كـ microtask بعد الـ [[define]] (جرّبت: [[بعد:]] اتطبعت قبل [[whenDefined اتحلّت]]).`,
            when: R`DSD: أي component بيترسم من السيرفر (Lit SSR، و Astro، و Enhance، أو HTML بتكتبه بإيدك) أو في صفحة السرعة فيها مهمة. و [[:not(:defined)]]: دايمًا تقريبًا، ولو بس عشان تحجز مكان ([[display: block; min-height]]) بدل ما الصفحة تنط. و [[whenDefined]]: لما كود محتاج methods العنصر (زي [[el.open()]]) وانت مش ضامن الـ script اتحمّل.`,
            mistakes: R`[[attachShadow]] من غير ما تبص على [[this.shadowRoot]] فتمسح الـ DSD وتعمل flash بإيدك. وتحط الـ template بـ [[innerHTML]] وتستغرب إنه مااشتغلش. و [[:not(:defined) { display: none }]] على component عنده DSD: كده خبّيت الشكل اللي السيرفر تعب فيه. وتنادي methods على العنصر قبل الـ [[define]] (لسه [[HTMLElement]] عادي): [[el.open is not a function]]. وعنصر اتعمل بـ [[createElement]] قبل الـ [[define]] ومش في الصفحة مبيتعملوش upgrade لوحده (جرّبت: فضل [[HTMLElement]] لحد [[customElements.upgrade(el)]]).`
          },
          teach: R`## الفكرة في سطر

[[<user-badge>]] جه من السيرفر جاهز بالـ shadow DOM بتاعه (النجمة واللون)، فبيظهر صح قبل الـ JS. لحد ما الـ JS يسجّله هو باهت ومبيستجبش ([[:not(:defined)]])، وبعد الـ [[define]] الـ class بيستخدم الـ shadow root الموجود بدل ما يعمل واحد جديد.

اتشغّل في Chrome 156 headless (عن طريق playwright-core) من [[http://127.0.0.1]].

---

## ١. الـ CSS: قبل التسجيل

~~~text index.html
<style>
  user-badge:not(:defined) { opacity: 0.5; pointer-events: none; }
</style>
~~~

- [[:defined]]: pseudo-class بتمسك أي عنصر «متعرّف»: كل عناصر HTML العادية، وأي custom element **بعد** [[customElements.define]].
- [[:not(:defined)]]: العكس: الـ custom element اللي لسه متسجّلش.
- [[opacity: 0.5]]: باهت، عشان اليوزر يحس إنه لسه مش جاهز.
- [[pointer-events: none]]: الضغط عليه مبيعملش حاجة، لأن الـ listeners لسه مااتحطتش.

لو الـ component **مفيهوش** DSD (هيترسم من الـ JS بس)، الأحسن تحجز مكانه بدل ما تخفيه، عشان الصفحة متنطش لما يظهر:

~~~text style.css
product-card:not(:defined) { display: block; min-height: 320px; }
~~~

## ٢. الـ HTML: Declarative Shadow DOM

~~~text index.html
<user-badge>
  <template shadowrootmode="open">
    <style>b { color: teal; }</style>
    <b>★</b> <slot></slot>
  </template>
  سارة
</user-badge>
~~~

- [[<template shadowrootmode="open">]]: لما الـ parser يقابل template بالـ attribute ده كأول ولد لعنصر، بيعمل shadow root للعنصر ويحط جواه محتوى الـ template. [[open]] زي [[attachShadow({ mode: "open" })]]: الـ JS من برّه يقدر يوصل بـ [[el.shadowRoot]].
- [[<style>b { color: teal; }</style>]]: CSS جوه الـ shadow، مقفول عليه زي درس «shadow DOM».
- [[<slot></slot>]]: هنا هيظهر اللي جوه العنصر من برّه (درس «slots»).
- [[سارة]]: ده الـ light DOM: محتوى عادي جوه [[<user-badge>]]، والـ slot بيعرضه.

جرّبت وده قبل أي [[define]]:

~~~text الناتج
قبل: false true 0.5
~~~

يعني: لسه مش [[:defined]]، بس الـ [[shadowRoot]] **موجود فعلًا**، والـ CSS بتاع [[:not(:defined)]] شغّال (0.5). ولون النجمة جوه الـ shadow طلع [[rgb(0, 128, 128)]] (teal) من غير أي JS. والـ [[<template>]] نفسه اختفى: [[document.querySelectorAll("template").length]] بقى 0.

### ليه مبيشتغلش مع [[innerHTML]]؟

~~~text الناتج (Chrome)
Found declarative shadowrootmode attribute on a template, but declarative Shadow DOM is not being parsed. Use setHTMLUnsafe() or parseHTMLUnsafe() instead.
innerHTML: false
setHTMLUnsafe: true
~~~

الـ DSD بيتعمل وقت تحميل الصفحة بس. لو بتحط HTML من JS، [[innerHTML]] بيسيب الـ template عادي (عشان الكود القديم ميتغيّرش سلوكه فجأة)، و [[el.setHTMLUnsafe(html)]] هي اللي بتفهم DSD. («Unsafe» لأنها مش بتنضّف الـ HTML زي [[innerHTML]] بالظبط: متحطش فيها حاجة من اليوزر من غير تنضيف، درس XSS في وحدة الـ DOM.)

## ٣. الـ class: استخدم الموجود

~~~text index.html
  class UserBadge extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) this.attachShadow({ mode: "open" }).innerHTML = "<style>b { color: teal; }</style><b>★</b> <slot></slot>";
      this.shadowRoot.querySelector("b").addEventListener("click", () => this.toggleAttribute("starred"));
    }
  }
~~~

- [[if (!this.shadowRoot)]]: لو العنصر جه من السيرفر بـ DSD، الـ shadow root موجود: متعملش واحد جديد. لو اتعمل من JS ([[createElement]])، مفيش: اعمله بنفس المحتوى.
- [[attachShadow(...).innerHTML = "..."]]: [[attachShadow]] بترجّع الـ shadow root، فبنحط جواه المحتوى في نفس السطر.
- [[this.shadowRoot.querySelector("b")]]: في الحالتين دلوقتي فيه shadow root، فبنحط الـ listener: الضغط على النجمة بيعمل [[toggleAttribute("starred")]] (يحط الـ attribute لو مش موجود ويشيله لو موجود). جرّبت: بعد ضغطة [[hasAttribute("starred")]] بـ [[true]].

### ليه الـ [[if]] مهم؟

جرّبت [[attachShadow]] على عنصر عنده declarative shadow root:

~~~text الناتج
attachShadow on DSD: true ""
~~~

رجّع **نفس** الـ root ([[true]])، بس **فاضي** ([[""]]): المتصفح مسح المحتوى اللي جه من السيرفر. يعني من غير الـ [[if]]، كل الشغل ده بيتمسح ويترسم تاني من JS: نفس الـ flash اللي كنا بنهرب منه.

> لو الـ template [[shadowrootmode="closed"]]: [[el.shadowRoot]] بـ [[null]] حتى من جوه الـ class. الـ component يوصله بـ [[this.attachInternals().shadowRoot]] (جرّبتها: رجّع المحتوى).

## ٤. [[whenDefined]] و [[define]]

~~~text index.html
  customElements.whenDefined("user-badge").then(() => console.log("whenDefined اتحلّت"));
  customElements.define("user-badge", UserBadge);
  console.log("بعد:", first.matches(":defined"), getComputedStyle(first).opacity);
~~~

- [[customElements.whenDefined(name)]]: Promise بتتحل لما الاسم ده يتسجّل (بالـ class نفسه). لو متسجّل خلاص، بتتحل على طول.
- [[define]]: العنصر اللي في الصفحة بيتعمله **upgrade**: الـ constructor بيتنادى عليه، ويبقى [[:defined]].

~~~text الناتج
بعد: true 1
~~~

الـ CSS اتشال لوحده (opacity رجعت 1)، من غير ما نكتب أي سطر JS يشيل class.

## ٥. عنصر جديد من JS

~~~text index.html
  const extra = document.createElement("user-badge");
  extra.textContent = "علي";
  document.body.append(extra);
  console.log("من JS:", extra.shadowRoot.innerHTML.length > 0);
~~~

~~~text الناتج
من JS: true
~~~

هنا مفيش DSD، فالـ [[if]] عمل [[attachShadow]] والمحتوى اتحط، ولون النجمة برضه teal. نفس الـ component بيشتغل في الحالتين.

### الترتيب الكامل

~~~text الناتج (Chrome 156)
قبل: false true 0.5
بعد: true 1
من JS: true
whenDefined اتحلّت
~~~

[[whenDefined]] اتحلّت **آخر حاجة**، مع إن الـ [[define]] كان قبل «بعد»: الـ [[.then]] بيشتغل microtask بعد ما الكود اللي شغّال يخلص (درس «microtasks و macrotasks»).

### عنصر اتعمل قبل الـ define

~~~text الناتج
before define: HTMLElement
after define, not in doc: HTMLElement
after upgrade: LateEl
~~~

[[createElement("late-el")]] قبل الـ [[define]]، ومش متحط في الصفحة: الـ define مبيعملوش upgrade لوحده لأنه مش في الـ document، لحد ما تحطه في الصفحة أو تنادي [[customElements.upgrade(el)]].

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[<template shadowrootmode="open">]] | shadow root جاهز من الـ HTML وقت التحميل، من غير JS |
| [[if (!this.shadowRoot)]] | استخدم الـ root اللي جه من السيرفر، و [[attachShadow]] عليه بيفضّيه |
| [[setHTMLUnsafe(html)]] | DSD من JS، لأن [[innerHTML]] بيتجاهله |
| [[:not(:defined)]] | شكل العنصر قبل الـ [[define]]: باهت، أو مكان محجوز |
| [[customElements.whenDefined(name)]] | Promise بتتحل لما الاسم يتسجّل |
| [[customElements.upgrade(el)]] | upgrade لعنصر اتعمل قبل الـ define ومش في الصفحة |

- DSD للشكل قبل الـ JS، و [[:defined]] للحالة لحد ما يبقى تفاعلي: الاتنين مع بعض.
- متخبّيش بـ [[display: none]] component عنده DSD.
- الدعم (من الـ docs، MDN): Chrome و Edge من 111، و Safari من 16.4، و Firefox من 123.`,
          lines: [
            R`CSS عادي للصفحة. لازم يكون في الـ [[<head>]] أو قبل العنصر، عشان يشتغل من أول ما الصفحة ترسم.`,
            R`[[:not(:defined)]] بتمسك [[<user-badge>]] بس لحد ما الـ JS يعمل [[define]]: باهت ومبيستقبلش ضغطات، عشان اليوزر ميدوسش على حاجة لسه مبتشتغلش. وبعد الـ define القاعدة بتتشال لوحدها.`,
            R`نهاية الـ [[<style>]] بتاع الصفحة. القاعدة دي بتفضل موجودة على طول، بس [[:not(:defined)]] هي اللي بتقرر تمسك العنصر ولا لأ.`,
            R`العنصر نفسه في الـ HTML. المتصفح مش عارفه لسه، فبيعامله كعنصر عادي لحد الـ [[define]].`,
            R`Declarative Shadow DOM: template كأول ولد بـ [[shadowrootmode="open"]] بيخلّي الـ parser يعمل shadow root للعنصر ويحط المحتوى ده جواه، قبل أي JS.`,
            R`CSS جوه الـ shadow: بيلوّن الـ [[<b>]] اللي جوه بس، ومبيأثرش على أي [[<b>]] في الصفحة.`,
            R`النجمة، وبعدها [[<slot>]]: المكان اللي هيظهر فيه المحتوى العادي اللي جوه [[<user-badge>]] (هنا «سارة»).`,
            R`نهاية الـ template. بعد الـ parsing الـ template نفسه بيختفي من الـ DOM ويبقى shadow root.`,
            R`المحتوى العادي (light DOM): الاسم اللي بيتعرض في الـ slot. ده بيفضل نص عادي في الصفحة، فمحركات البحث وقارئ الشاشة شايفينه.`,
            R`نهاية [[<user-badge>]]. لحد هنا كل حاجة HTML بس: لو الـ JS اتأخر أو فشل، العنصر لسه ظاهر بالنجمة والاسم.`,
            R`[[type="module"]]: بيتنفّذ بعد ما الصفحة كلها تتعمل parse (زي [[defer]])، فالعنصر والـ shadow بتاعه موجودين ساعتها.`,
            R`بنمسك أول [[<user-badge>]] (اللي جه من الـ HTML).`,
            R`قبل الـ [[define]]: [[matches(":defined")]] بـ [[false]]، والـ [[shadowRoot]] **موجود** بفضل الـ DSD، والـ opacity 0.5 من قاعدة [[:not(:defined)]]. الناتج: [[قبل: false true 0.5]].`,
            R`الـ class بتاع الـ component.`,
            R`الـ constructor بيتنادى لما الـ [[define]] يحصل (للعناصر اللي في الصفحة) أو مع [[createElement]] بعدها.`,
            R`[[super()]] لازم أول سطر في constructor أي class بيورث، عشان [[HTMLElement]] يجهّز العنصر.`,
            R`لو مفيش shadow root (العنصر اتعمل من JS)، اعمل واحد وحط فيه نفس المحتوى اللي في الـ template. ولو موجود من الـ DSD، سيبه: [[attachShadow]] عليه كان هيرجّعه فاضي ويمسح اللي السيرفر بعته.`,
            R`في الحالتين فيه shadow root دلوقتي، فبنحط الـ listener على النجمة: كل ضغطة بتقلب attribute [[starred]] (موجود ← مش موجود والعكس). الـ JS بيضيف التفاعل بس، الشكل كان جاهز.`,
            R`نهاية الـ constructor.`,
            R`نهاية الـ class.`,
            R`[[whenDefined]] Promise بتتحل لما [[user-badge]] يتسجّل. الكود اللي محتاج العنصر جاهز يستنى هنا. والـ [[then]] بيشتغل كـ microtask، فالسطر ده هيطبع **آخر حاجة**.`,
            R`التسجيل: العنصر اللي في الصفحة بيتعمله upgrade على طول (الـ constructor بيتنادى عليه) ويبقى [[:defined]].`,
            R`بعد الـ [[define]]: [[true]] والـ opacity رجعت 1 لوحدها لأن [[:not(:defined)]] مبقتش ماسكة. الناتج: [[بعد: true 1]].`,
            R`عنصر تاني من JS. هنا مفيش DSD، فالـ constructor هيعمل الـ shadow بنفسه.`,
            R`المحتوى العادي بتاعه، اللي هيظهر في الـ slot.`,
            R`بنحطه في آخر الـ [[body]]. الـ shadow اتعمل خلاص في الـ constructor (وقت [[createElement]] لأن الاسم متسجّل)، فبيظهر بشكله على طول.`,
            R`الـ shadow root اتعمل وفيه محتوى: [[من JS: true]]. يعني نفس الـ class شغّال للعنصر اللي جه من السيرفر واللي اتعمل من JS.`,
            R`نهاية الـ [[<script>]]. ولأنه module، أي متغير جواه ([[first]] و [[extra]]) مش global ومش هيتلخبط مع scripts تانية.`,
          ],
          sol: R`الناتج في Chrome 156 بالترتيب: [[قبل: false true 0.5]] ثم [[بعد: true 1]] ثم [[من JS: true]] ثم [[whenDefined اتحلّت]]. ولون النجمة جوه الـ shadow [[rgb(0, 128, 128)]] قبل الـ define وبعده.

مع [[setTimeout]] ثانيتين: النجمة واللون والاسم ظاهرين من أول لحظة (الـ DSD)، والعنصر باهت لمدة ثانيتين وبعدين بيبقى عادي. من غير الـ [[<template>]]: في الثانيتين بيظهر «سارة» بس كنص عادي باهت من غير نجمة، وبعدين النجمة تظهر فجأة (ده الـ flash). ولو شلت [[if (!this.shadowRoot)]]: [[attachShadow]] على الـ DSD بيرجّع الـ root فاضي، فالمحتوى بيتمسح ويترسم من الـ string اللي في الـ JS، والنتيجة شكلها واحد بس الشغل اللي السيرفر بعته اترمى، ولو المحتوى في الـ string مختلف عن الـ template هتشوف نط.

(الشكل البصري في الثانيتين اتأكد بـ [[getComputedStyle]]؛ الإحساس بالـ flash نفسه على نت بطيء جرّبه بإيدك في DevTools.)`
        }
      ]
    }
]);
