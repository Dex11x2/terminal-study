// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "Web Components",
      l: 3,
      n: "عناصر HTML بتعملها بنفسك (<user-card>) من غير framework: custom elements و shadow DOM و slots، وإزاي تستخدمها جوه React و Vue، وتدخل الفورم بـ ElementInternals، وتظهر من غير flash بـ Declarative Shadow DOM و :defined",
      projects: [
        { lvl: 'صغير', t: R`[[<relative-time>]] زي GitHub`, what: R`[[<relative-time datetime="2026-10-29T10:00:00Z">]] بيكتب «قبل 3 دقائق» بـ [[Intl.RelativeTimeFormat("ar", { numeric: "auto" })]] (درس customElements.define)، وبيتحدّث كل دقيقة بـ [[setInterval]] بيتعمل في [[connectedCallback]] ويتمسح في [[disconnectedCallback]]، وبيسمع لتغيير [[datetime]].`, done: R`تاريخ من 3 دقايق بيطلع «قبل 3 دقائق» ومن يوم بيطلع «أمس»، وبعد دقيقة النص بيتغير لوحده، و [[setAttribute("datetime", ...)]] بيحدّثه على طول، و [[remove()]] بيوقّف الـ interval (عدّاد في الـ callback بيقف)، وتاريخ غلط بيكتب «تاريخ غلط» مش «Invalid Date».` },
        { lvl: 'صغير', t: R`[[<toggle-switch>]] بالكيبورد`, what: R`مفتاح on/off بـ shadow DOM (درس ٢) و [[checked]] boolean بيعمل reflect (درس ٤): [[role="switch"]] و [[aria-checked]] و [[tabindex="0"]]، وبيتقلب بالضغط أو Space أو Enter، وبيبعت [[change]] event فيه [[detail.checked]].`, done: R`Tab بيوصله و Space بيقلبه، و [[el.checked = true]] بيحط attribute [[checked]] و [[removeAttribute("checked")]] بيرجّع [[el.checked]] بـ [[false]]، و [[aria-checked]] ماشي مع الحالة، والـ [[change]] بيتبعت مرة واحدة لكل تغيير من اليوزر ومبيتبعتش لما الكود يغيّر [[checked]].` },
        { lvl: 'متوسط', t: R`[[<tab-group>]] بالـ slots`, what: R`[[<tab-group>]] جواه [[<button slot="tab">]] و [[<section slot="panel">]] بأي عدد (درس slots)، و [[slotchange]] بيربط كل تاب باللوحة بتاعته، والأسهم يمين وشمال بتتنقل بين التابات، والتاب النشط attribute [[selected]] (درس ٤)، و event [[tab-change]] بـ [[composed: true]].`, done: R`٣ تابات بيشتغلوا بالماوس والأسهم، وتزويد تاب رابع من Console بيشتغل من غير refresh، و [[selected="2"]] في الـ HTML بيفتح التالت، والـ CSS بتاع الصفحة مبيبوّظش شكل التابات، و listener على [[document]] بيستقبل [[tab-change]] بالـ index الصح.` },
        { lvl: 'متوسط', t: R`design system صغير`, what: R`٣ components ([[<ui-button>]] و [[<ui-card>]] و [[<ui-badge>]]) بيشاركوا [[CSSStyleSheet]] واحد بـ [[adoptedStyleSheets]] (درس shadow DOM)، والألوان كلها CSS custom properties، و [[::part]] للأجزاء اللي مسموح تتغير، وصفحة demo فيها الـ light و dark بتغيير variables على [[:root]] بس.`, done: R`تغيير [[--ui-primary]] في [[:root]] بيغيّر الـ ٣ components مع بعض، و [[p { color: red }]] في الصفحة مبيأثرش جواهم، و [[ui-button::part(label)]] بيكبّر الخط، والـ dark mode بيتقلب بزرار واحد من غير ما يلمس أي component، والـ stylesheet اتعمل مرة واحدة بس (ابحث في الكود: [[new CSSStyleSheet]] مرة واحدة).` },
        { lvl: 'كبير', t: R`[[<image-uploader>]] تستخدمه في أي framework`, what: R`component بيجمع الوحدة دي مع APIs المتصفح: input و drag and drop ومعاينة وفحص النوع بأول bytes والحجم، ورفع بـ progress وإلغاء. attributes [[accept]] و [[max-size]] و [[endpoint]] و [[multiple]]، و events [[upload-start]] و [[upload-done]] و [[upload-error]] بـ [[composed: true]]، و slots للنص والأيقونة، و [[revokeObjectURL]] و [[abort()]] لكل حاجة في [[disconnectedCallback]]. واستخدمه في صفحة HTML عادية، و React 19، و Vue.`, done: R`ملف أكبر من [[max-size]] أو نوعه غلط بيطلع [[upload-error]] فيه السبب ومبيتبعتش، والرفع على Slow 4G بيبين progress والإلغاء بيشتغل، وشيل العنصر من الصفحة في نص الرفع بيلغي الـ request (Network يأكد)، ونفس الـ component شغال في التلات أماكن والـ events بتوصل لـ state بتاع React و Vue، و تستات بـ [[node:test]] و jsdom بتتأكد من الـ attributes والـ events من غير متصفح.`, ext: R`خليه form-associated بـ [[attachInternals()]] عشان يتبعت مع الفورم، وزوّد crop للصورة، وانشره على npm بـ README وصفحة demo.` },
        { lvl: 'فكرة', t: R`component تستخدمه في كل مشاريعك`, what: R`اختار حاجة بتعملها في كل مشروع (modal، أو toast، أو dropdown، أو date picker، أو rating) وابنيها Web Component واحد يشتغل مع أي framework: attributes للقيم البسيطة، و properties للمعقدة، و events للي بيحصل، و slots للمحتوى، و CSS variables للشكل.`, done: R`فيه صفحة demo فيها كل الحالات، وبيشتغل بالكيبورد بس، ومستخدم في مشروعين مختلفين على الأقل (واحد منهم React أو Vue)، و README بيشرح كل attribute و event بمثال.`, ext: R`اعمله بـ Lit وقارن حجم الكود والـ bundle بالنسخة اللي من غير مكتبة، وزوّد Declarative Shadow DOM عشان يترندر من السيرفر.` },
      ],
      items: [
        {
          cmd: "customElements.define",
          title: "تعمل tag HTML جديد بـ customElements.define (custom elements)",
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
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل جوه try/catch: [[customElements.define("usercard", class extends HTMLElement {})]]، وبعدها تعرّف [[user-x]] مرتين، وبعدها نفس الـ class بإسمين مختلفين.`, done: R`الأول بيرمي [[DOMException]] اسمها [[SyntaxError]] (الاسم لازم فيه [[-]])، والتاني والتالت بيرموا [[NotSupportedError]] (الاسم أو الـ class اتسجّلوا قبل كده)، وتقدر تقول إزاي تتجنب التاني في ملف ممكن يتحمّل مرتين ([[if (!customElements.get("user-x"))]]).` },
            { lvl: 'تطبيق', t: R`ابني [[<copy-button text="npm i idb">]]: زرار بيكتب «انسخ»، والضغط بيعمل [[navigator.clipboard.writeText]] للـ [[text]]، ويكتب «اتنسخ ✓» لمدة ثانيتين ويرجع، ولو النسخ فشل يكتب «مقدرتش أنسخ».`, done: R`تضغط وتعمل paste في أي حتة فيطلع النص بالظبط، والزرار بيرجع «انسخ» بعد ثانيتين، والضغط مرتين بسرعة مبيخليش النص يرجع بدري (الـ timeout القديم اتلغى)، وتغيير [[text]] من Console بينسخ القيمة الجديدة.` },
            { lvl: 'تحدي', t: R`صلّح باج الـ upgrade: الكود بيعمل [[el.name = "Sara"]] على [[<user-card>]] **قبل** [[customElements.define]] (السكربت اتحمّل متأخر)، والـ class فيه [[set name(v)]] بيرسم. الاسم مبيظهرش. صلّحها في [[connectedCallback]]، وخبّي العنصر لحد ما يتعرّف بـ [[user-card:not(:defined)]].`, done: R`قبل التصليح [[el.textContent]] فاضي و [[Object.hasOwn(el, "name")]] بـ [[true]] (الـ property العادية غطّت الـ setter)، وبعد التصليح (تقرا القيمة، و [[delete this.name]]، وتحطها تاني) بيرسم «Sara»، والصفحة مبيبانش فيها العنصر فاضي قبل التعريف، و [[customElements.whenDefined("user-card")]] بيتحل بعد [[define]].` },
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
            { lvl: 'سريع', t: R`اتوقع وبعدين جرّب: نفس [[PriceTag]] مرة بـ [[mode: "open"]] ومرة بـ [[mode: "closed"]]. إيه ناتج [[el.shadowRoot]] و [[document.querySelector("price-tag p")]] في كل مرة؟`, done: R`في الـ open [[el.shadowRoot]] بيرجّع ShadowRoot وفي الـ closed بيرجّع [[null]]، و [[querySelector]] من الـ document بيرجّع [[null]] في الحالتين (مبيدخلش جوه الـ shadow)، و [[el.shadowRoot.querySelector("p")]] بيلاقيه في الـ open بس.` },
            { lvl: 'تطبيق', t: R`ابني theming لـ [[price-tag]]: [[--tag-bg]] و [[--tag-color]] و [[--tag-radius]] بقيم default جوه الـ component، وصفحة فيها زرار dark mode بيغيّر الـ variables على [[:root]] بس، و [[::part(amount)]] للخط.`, done: R`زرار الـ dark بيغيّر شكل كل الـ tags مع بعض، والـ tag من غير أي variable متعرّف بياخد الـ default، و [[p { color: red }]] في الصفحة مبيأثرش جوه، لكن [[font-family]] على [[body]] بيوصل جوه (الخصائص اللي بتتورث بتعدّي الـ shadow boundary).` },
            { lvl: 'تحدي', t: R`اتوقع وصلّح: listener على [[document]] لـ [[click]]، واضغط على الـ [[<p>]] اللي جوه الـ shadow. اطبع [[e.target.tagName]] و [[e.composedPath().at(0).tagName]]. وبعدين ابعت من جوه [[new CustomEvent("price-click", { bubbles: true })]] وشوف الـ document بيستقبله ولا لأ.`, done: R`[[e.target.tagName]] بيطلع [[PRICE-TAG]] (retargeting) و [[composedPath().at(0)]] بيطلع [[P]]، والـ [[price-click]] مبيوصلش الـ document لحد ما تزوّد [[composed: true]]، وبعدها بيوصل، وتقدر تقول ليه الـ [[click]] العادي وصل من غير ما تعمل حاجة (الأحداث المدمجة composed).` },
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
            { lvl: 'سريع', t: R`اتوقع: [[<app-card>]] جواه [[<h3 slot="title">]] و [[<p>]] كل واحد في سطر لوحده. الـ slot اللي من غير اسم: [[assignedNodes().length]] كام و [[assignedElements().length]] كام؟ وبعدين شغّل.`, done: R`[[assignedElements()]] بيرجّع 1 (الـ [[p]] بس)، و [[assignedNodes()]] بيرجّع أكتر (الـ text nodes بتاعة المسافات والسطور الجديدة بتتحسب، في الشكل ده 4)، والـ [[h3]] مش منهم لأنه راح للـ slot اللي اسمه [[title]].` },
            { lvl: 'تطبيق', t: R`ابني [[<info-alert type="warning">]]: slot اسمه [[icon]] فيه fallback «⚠» (و «ℹ» لو [[type="info"]])، و slot عادي للرسالة، وزرار إغلاق جوه الـ shadow بيشيل العنصر ويبعت [[close]] event.`, done: R`alert من غير أيقونة بيظهر الـ fallback الصح حسب [[type]]، وأيقونة [[<span slot="icon">]] بتاعتك بتظهر مكانها، والإغلاق بيشيل العنصر والـ listener على العنصر بيستقبل [[close]]، والـ CSS بتاع الصفحة بيلوّن الرسالة (لأنها لسه في الـ light DOM).` },
            { lvl: 'تحدي', t: R`ابني footer بيختفي لوحده: شيل الـ fallback من slot الـ [[footer]] في [[AppCard]]، وفي [[slotchange]] حط [[hidden]] على الـ [[<footer>]] لو [[assignedNodes({ flatten: true }).length]] بصفر. وجرّب تضيف وتشيل [[<span slot="footer">]] من Console.`, done: R`كارت من غير footer مفيهوش الخط الرمادي ولا المسافة بتاعته، وإضافة [[<span slot="footer">paid</span>]] بتظهره على طول، وشيلها بيخفيه تاني، و [[slotchange]] بيتنادى مع كل إضافة أو شيل للـ slot ده بس مش لما تغيّر نص جوه الـ span.` },
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
            { lvl: 'سريع', t: R`ابني property [[size]] على [[star-rating]] بتعمل reflect لـ attribute [[size]] ([["s"]] أو [["m"]] أو [["l"]]) والـ default [["m"]]، والـ CSS جوه بـ [[:host([size="l"])]].`, done: R`[[r.size = "l"]] بيحط [[size="l"]] في الـ HTML والنجوم بتكبر، و [[r.removeAttribute("size")]] بيخلّي [[r.size]] يرجّع [["m"]]، و [[r.size = "xl"]] بيتجاهل القيمة وبيكتب warning وبيفضل على القديمة.` },
            { lvl: 'تطبيق', t: R`اكتب اختبار بـ [[node:test]] و jsdom (custom elements شغالة فيه) لـ [[value]]: لازم يبقى رقم صحيح من 0 لعدد الـ labels، وأي حاجة برا كده تتقص للحد، و [[NaN]] تتجاهل. التستات الأول وبعدين التصليح في الـ setter.`, done: R`التستات بتقع على كود الدرس الأصلي، وبعد التصليح [[r.value = 9]] بيبقى 5 و [[r.value = -1]] بيبقى 0 و [[r.value = 2.7]] بيبقى 3 و [[r.value = "abc"]] مبيغيّرش القيمة، و [[node --test]] بيعدّي، والـ attribute في الـ HTML بيطابق الـ property في كل حالة.` },
            { lvl: 'تحدي', t: R`ابني star-rating يتبعت مع الفورم: [[static formAssociated = true]] و [[this.#internals = this.attachInternals()]] و [[setFormValue(String(value))]] مع كل تغيير، و [[required]] بيعمل [[setValidity({ valueMissing: true }, "اختار تقييم")]] لما القيمة صفر. (jsdom مبيدعمش [[setFormValue]]، فجرّبه في المتصفح).`, done: R`[[new FormData(form).get("rating")]] بيرجّع [["4"]] بعد ما تختار 4 نجوم، والفورم اللي فيه [[required]] من غير تقييم مبيتبعتش وبيظهر «اختار تقييم»، و [[form.reset()]] بيرجّع النجوم صفر لو عملت [[formResetCallback]]، والـ rating بيظهر في [[form.elements]].` },
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
            { lvl: 'سريع', t: R`اتوقع وبعدين جرّب في React 19: [[<star-rating onRatingChange={...} />]] مقابل [[onrating-change={...}]] لما العنصر بيبعت [[rating-change]].`, done: R`[[onrating-change]] بيشتغل و [[onRatingChange]] لأ: React 19 بيسمع لـ event اسمه بالظبط زي اللي بعد [[on]] ([[RatingChange]] بالحروف دي)، فلو عايز camelCase لازم العنصر يبعت event اسمه كده. ولو ابعت [[RatingChange]] من Console الـ handler التاني بيشتغل.` },
            { lvl: 'تطبيق', t: R`صلّح التحذير في Vue: استخدم [[<star-rating>]] في Vite + Vue من غير config، وشوف Console، وبعدين زوّد [[compilerOptions.isCustomElement]] في [[vue()]] جوه [[vite.config]] بحيث أي tag فيه [[-]] ومش component بتاعك يتساب.`, done: R`قبل التصليح Console فيه [[Failed to resolve component: star-rating]]، وبعده التحذير بيختفي، و [[:labels]] بيوصل كـ array (٣ زراير مش ٥)، و [[@rating-change]] بيحدّث الـ ref، والـ components بتاعتك اللي فيها [[-]] (لو عندك) لسه شغالة.` },
            { lvl: 'تحدي', t: R`صلّح باج ترتيب التحميل: في React 19 خلّي [[import "./star-rating.js"]] يحصل **بعد** [[createRoot().render()]] (مثلًا [[setTimeout(() => import("./star-rating.js"))]])، واعمل [[labels={["bad", "ok", "great"]}]]. عدّ الزراير وبص على الـ HTML، وبعدين صلّحها.`, done: R`قبل التصليح بيظهر ٥ زراير مش ٣، والـ HTML فيه [[labels="bad,ok,great"]] كنص (React لقى العنصر مش متعرّف فحطها attribute)، وبعد التصليح ([[import]] قبل الـ render، أو [[await customElements.whenDefined("star-rating")]] قبل [[createRoot]]) بيظهر ٣ ومفيش attribute اسمه [[labels]].` },
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
            { lvl: 'سريع', t: R`صلّح الكود البايظ: component اسمه [[<color-pick>]] فيه [[static formAssociated = true]]، والـ constructor بيعمل [[this.attachInternals()]]، و [[connectedCallback]] بيعمل [[this.attachInternals()]] تاني عشان يحط القيمة. شغّله وانقل العنصر من مكان لمكان في الصفحة ([[append]] في div تاني)، واقرا الـ error وصلّحه.`, done: R`ظهر [[NotSupportedError]] برسالة فيها [[ElementInternals for the specified element was already attached.]] أول ما الـ [[connectedCallback]] اتنادى، وصلّحته بإن الـ internals تتعمل مرة واحدة في field ([[#internals = this.attachInternals()]]) وكل حتة تستخدمها، والنقل بين الأماكن بقى يشتغل من غير errors.` },
            { lvl: 'تطبيق', t: R`ابني [[<tag-input name="tags">]]: بتكتب كلمة وتدوس Enter تبقى tag، وكل tag فيه ✕ يمسحه. القيمة اللي بتتبعت مع الفورم الـ tags كلها، كل واحد لوحده: اعمل [[FormData]] جوه الـ component وابعته لـ [[setFormValue]]، و [[min="1"]] بيخلّيه [[valueMissing]] لو فاضي، و [[formResetCallback]] بيفضّيه.`, done: R`بعد ٣ tags، [[new FormData(form).getAll("tags")]] بيرجّع الـ ٣ كلمات في array، و [[form.checkValidity()]] بـ [[false]] وهو فاضي و [[true]] بعد أول tag، و [[form.reset()]] بيفضّيه ويخلّي [[getAll]] array فاضية، والإيرور اللي بيظهر وانت بتبعت فاضي هو رسالتك انت.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: بـ playwright (أو في الـ Console لو مش متاح) اكتب ٦ تستات لـ [[star-rating]] بتاع الدرس: قيمة أول ما يفتح، وضغطة، و ٦ ضغطات بترجع لـ 1، و [[reset()]]، و [[required]] بيمنع [[submit]] (اسمع لـ [[invalid]] event)، و [[<fieldset disabled>]] حواليه بيخلّي [[formDisabledCallback]] يتنادى بـ [[true]]. وبعدين زوّد دعم الكيبورد (الأسهم) وخلّي التستات تمسكه.`, done: R`التستات الست بتعدّي، وتست الـ [[submit]] بيلاقي [[invalid]] event على [[STAR-RATING]] والفورم مااتبعتش، وبعد ضغطة واحدة [[submit]] اتبعت بـ [[rating=1]]، وتست الكيبورد بيفشل قبل ما تزوّد الأسهم وبيعدّي بعدها، و [[formDisabledCallback]] اتنادى بـ [[true]] ثم [[false]].` },
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
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[div.innerHTML = '<x-y><template shadowrootmode="open"><b>hi</b></template></x-y>']] وبعدين [[div.firstChild.shadowRoot]]: هيرجّع إيه؟ ونفس الكلام بـ [[div.setHTMLUnsafe(...)]] بدل [[innerHTML]]؟ اكتب توقعك وبعدين شغّله في Console بتاع Chrome.`, done: R`[[innerHTML]] رجّع [[null]] والـ [[<template>]] فضل template عادي جوه العنصر، والـ Console طلّع تحذير فيه [[Use setHTMLUnsafe() or parseHTMLUnsafe() instead.]]، و [[setHTMLUnsafe]] رجّع shadow root فعلًا، وتقدر تقول ليه [[innerHTML]] مبيعملهاش (عشان الكود القديم ميتفاجئش).` },
            { lvl: 'تطبيق', t: R`ابني [[<product-card>]] بيظهر صح على 3G: خلّي السيرفر (Node صغير أو حتى ملف HTML) يرجّع ٣ كروت كل واحد فيه [[<template shadowrootmode="open">]] بالصورة والاسم والسعر والـ CSS، وزرار «أضف للسلة» مبيشتغلش غير بعد الـ [[define]]. والكروت اللي بتتضاف بعدين من JS ([[createElement]]) بتعمل نفس الـ shadow بنفسها.`, done: R`في DevTools ← Network ← Slow 3G مع تعطيل كاش، الكروت بتبان بشكلها الكامل قبل ما ملف الـ JS يخلص تحميل، والزرار باهت ومبيستجبش بـ [[:not(:defined)]]، وبعد الـ [[define]] بيشتغل، و Lighthouse بيقول CLS قريب من 0، وكارت جديد من JS شكله زي القديم بالظبط.` },
            { lvl: 'تحدي', t: R`قارن وقيس: نفس صفحة الـ ٣ كروت بطريقتين: (١) من غير DSD و [[product-card:not(:defined) { visibility: hidden }]]، و (٢) بـ DSD. قيس في Chrome DevTools ← Performance (أو Lighthouse) بـ Slow 3G: إمتى الكروت تظهر (FCP و LCP)، وكام CLS، واكتب جدول بالأرقام.`, done: R`عندك جدول فيه FCP و LCP و CLS للطريقتين من ٣ تشغيلات لكل واحدة، والـ DSD بيظهر الكروت قبل ما الـ JS يخلص (LCP أقل بفرق واضح على Slow 3G)، وكتبت جملة بالعيب: الـ HTML بقى أكبر لأن الـ CSS بيتكرر في كل كارت.` },
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
