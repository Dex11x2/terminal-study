// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "widgets و scroll وميزات جديدة",
      l: 3,
      n: "accordion و tabs من غير مكتبة، و scroll مظبوط، وحركة بين الصفحات، وإزاي تعرف الميزة الجديدة تنفع ولا لسه",
      items: [
        {
          cmd: "details و summary",
          title: "accordion و FAQ من غير ولا سطر JavaScript",
          desc: R`[[<details>]] بيتفتح ويتقفل لوحده، و [[<summary>]] جواه هو الجزء اللي بتدوس عليه. والباقي بيظهر لما يتفتح. شغال بالماوس والكيبورد (Enter و Space)، وقارئ الشاشة بيقول «collapsed» و «expanded» من غير aria.

و [[open]] بيخليه مفتوح من الأول، و [[details[open] > summary]] في CSS للشكل وهو مفتوح. ولو اديت كذا details نفس [[name]]، يبقوا accordion حصري: فتح واحد بيقفل الباقي.`,
          example: R`<section aria-labelledby="faq-title">
  <h2 id="faq-title">أسئلة متكررة</h2>
  <details name="faq" open>
    <summary>التوصيل بياخد قد إيه؟</summary>
    <p>من يومين لـ 4 أيام عمل جوه القاهرة والجيزة.</p>
  </details>
  <details name="faq">
    <summary>أقدر أرجّع المنتج؟</summary>
    <p>أيوه، خلال 14 يوم وهو في علبته.</p>
  </details>
</section>
// styles.css
details { border-block-end: 1px solid var(--color-border); padding-block: 0.75rem; }
summary { cursor: pointer; font-weight: 600; }
details[open] > summary { margin-block-end: 0.5rem; color: var(--color-brand); }`,
          try: R`اعمل الـ FAQ بـ 4 أسئلة. امشي بـ Tab بس وافتح واقفل بـ Enter و Space. افتح سؤال والتاني مفتوح: حصل إيه؟ وبعدين شيل [[name]] وجرّب تاني. وأخيرًا اقفل كل الأسئلة ودوّر بـ Ctrl+F على كلمة في إجابة مقفولة.`,
          flag: "script",
          deep: {
            why: R`الـ FAQ والإعدادات المتقدمة و «اعرف أكتر» في كل موقع. ناس كتير بتعملها بـ useState و div و onClick، وبتنسى الكيبورد والـ aria-expanded. details بيعمل كل ده صح ببلاش، وبيشتغل حتى لو الـ JavaScript لسه متحمّلش.`,
            how: R`الـ summary بياخد focus لوحده، و role بتاعه عند قارئ الشاشة زرار بـ expanded أو collapsed. الـ [[open]] attribute بيتضاف ويتشال مع كل ضغطة، وفيه حدث [[toggle]] على الـ details لو محتاج تعمل حاجة (تحفظ الحالة مثلًا).

الـ [[name]] (accordion حصري) بقى مدعوم في كل المتصفحات الحديثة من 2024، والمتصفح القديم بيتجاهله فكل واحد بيتفتح لوحده، يعني progressive enhancement من غير ما حاجة تبوظ.

البحث في الصفحة (Ctrl+F) بيلاقي الكلام جوه details مقفول ويفتحه لوحده في Chrome ومتصفحات تانية، بعكس [[display: none]] اللي البحث مبيشوفوش.

السهم اللي جنب الـ summary هو [[::marker]] (أو [[::-webkit-details-marker]] في Safari القديم). وتقدر تشيله بـ [[list-style: none]] على الـ summary وتحط أيقونة بتلف مع [[details[open] summary]]. وتحريك الفتح والقفل بقى ممكن بـ [[::details-content]] و [[interpolate-size]]، بس لسه مش في كل المتصفحات، فخليه تحسين إضافي.`,
            when: R`FAQ، و «تفاصيل إضافية»، وفلاتر في sidebar على الموبايل، وأي محتوى بيتفتح ويتقفل وملوش علاقة بباقي الصفحة. ومش لمنيو التنقل ولا الـ dropdowns (بتتقفل لما تدوس برا، و details مبيعملش كده)، ولا للـ tabs.`,
            mistakes: R`زرار أو لينك جوه الـ summary (عنصر تفاعلي جوه عنصر تفاعلي). تعمل details كمنيو في الـ header وتستغرب إنه مبيتقفلش. تشيل الـ marker ومتحطش أي علامة إنه بيتفتح. و [[<h3>]] جوه الـ summary: مسموح، بس قارئات شاشة كتير بتقراه زرار وخلاص فالعنوان بيضيع من لستة العناوين، فلو العناوين مهمة للتنقل حط الـ h3 قبل الـ details.`
          },
          teach: R`## صندوق بيتفتح ويتقفل، والمتصفح عامل كل الشغل

المثال جزء FAQ فيه سؤالين: كل سؤال [[<details>]]، والسطر اللي بتدوس عليه [[<summary>]]، والإجابة هي أي حاجة بعده. مفيش ولا سطر JavaScript، والكيبورد وقارئ الشاشة شغالين لوحدهم. حطينا المثال في صفحة وفتحناها في Chrome 154 (headless، عن طريق playwright)، وكل رقم تحت متقاس منها.

---

## ١. الحاوية: [[<section aria-labelledby="faq-title">]]

[[<section>]] جزء من الصفحة ليه موضوع واحد. و [[aria-labelledby]] معناها «اسم الجزء ده هو الكلام اللي جوه العنصر اللي الـ id بتاعه كذا»، و [[faq-title]] هو الـ id بتاع الـ [[<h2>]] اللي تحته على طول. فقارئ الشاشة بيعرّف الجزء باسمه، وده اللي طلع في الـ accessibility tree (الشجرة اللي المتصفح بيبعتها لقارئ الشاشة):

~~~text الـ accessibility tree (أول سطرين)
region   "أسئلة متكررة"
heading  "أسئلة متكررة"
~~~

[[region]] هو الدور اللي [[<section>]] بياخده لما يبقى ليه اسم. من غير اسم بيبقى مجرد صندوق ملوش دور.

## ٢. السؤال الأول: [[<details name="faq" open>]]

فيه حاجتين جديدين:

| الـ attribute | معناه |
|---|---|
| [[open]] | الصندوق مفتوح من أول ما الصفحة تحمّل. ملوش قيمة: وجوده بس معناه «مفتوح» (boolean attribute) |
| [[name="faq"]] | أي [[<details>]] ليهم نفس الـ name بقوا مجموعة: واحد بس يتفتح في نفس الوقت (accordion حصري) |

قبل أي ضغطة سألنا المتصفح عن [[open]] بتاع الاتنين:

~~~text الناتج
[ true, false ]
~~~

الأول مفتوح (عشان [[open]]) والتاني مقفول.

## ٣. [[<summary>]]: الجزء اللي بيتداس عليه

[[<summary>]] لازم يبقى **أول ابن** للـ [[<details>]]، وهو الحاجة الوحيدة اللي بتفضل باينة والصندوق مقفول. المتصفح بيدّيه ٣ حاجات ببلاش:

1. **focus بالكيبورد**: دوسنا Tab مرتين، والـ focus وقف على الـ summary الأول وبعدين التاني، من غير [[tabindex]].
2. **فتح وقفل بـ Enter و Space**، زي أي زرار.
3. **حالة لقارئ الشاشة**: في الـ accessibility tree بتاع Chrome الـ summary دوره [[DisclosureTriangle]] (يعني «زرار بيفتح ويقفل حاجة»)، ومعاه [[expanded=true]] أو [[false]]، فقارئ الشاشة بيقول «expanded» أو «collapsed» من غير ما تكتب [[aria-expanded]].

## ٤. [[<p>]] الإجابة و [[</details>]]

الإجابة أي حاجة بعد الـ summary. لما الصندوق مقفول المتصفح مش بيرسمها: سألناه [[checkVisibility()]] على إجابة السؤال التاني (المقفول) فرجّع [[false]].

## ٥. السؤال التاني: [[<details name="faq">]]

نفس الـ name، ومن غير [[open]]. ده اللي جرّبناه بالكيبورد، والـ focus على الـ summary التاني:

| الضغطة | [[open]] للاتنين |
|---|---|
| البداية | [[true, false]] |
| Enter | [[false, true]] |
| Space | [[false, false]] |
| Space تاني | [[false, true]] |

أول Enter فتح التاني **وقفل الأول لوحده**، وده شغل [[name="faq"]]. ولما شلنا الـ name من الاتنين وفتحناهم، الاتنين فضلوا مفتوحين: [[true, true]].

> المتصفح القديم اللي مش فاهم [[name]] بيتجاهله، فكل سؤال بيتفتح لوحده. مفيش حاجة بتبوظ.

ولما الحالة بتتغير، الـ details بيبعت حدث اسمه [[toggle]]. قفلنا الأول من الكود والحدث وصل بـ [[open->closed]] (الحالة القديمة والجديدة)، فلو عايز تحفظ أنهي سؤال مفتوح، ده مكانه.

---

## ٦. الـ CSS سطر سطر

### [[details { border-block-end: 1px solid var(--color-border); padding-block: 0.75rem; }]]

- [[border-block-end]]: خط في **آخر** الصندوق في اتجاه الكتابة الرأسي، يعني تحت. ده logical property: بيتبع اتجاه الكتابة بدل ما تقول [[bottom]].
- [[var(--color-border)]]: لون جاي من CSS variable اسمه [[--color-border]] متعرّف في مكان تاني (في التجربة عرّفناه [[#ccc]]).
- [[padding-block: 0.75rem]]: مسافة فوق وتحت. [[rem]] مضروبة في خط الـ html (16px)، فطلعت:

~~~text getComputedStyle على أول details
border-bottom: 1px solid rgb(204, 204, 204)
padding-top: 12px   padding-bottom: 12px
~~~

### [[summary { cursor: pointer; font-weight: 600; }]]

[[cursor: pointer]] الماوس يبقى إيد فالمستخدم يعرف إنه بيتداس. و [[font-weight: 600]] تخانة الخط (400 عادي و 700 bold)، فالسؤال يبان أتقل من الإجابة.

### [[details[open] > summary { ... }]]

نفكّ الـ selector:

| الحتة | معناها |
|---|---|
| [[details]] | أي عنصر details |
| [[[open]]] | ... بس اللي عليه attribute اسمه open، يعني المفتوح دلوقتي |
| [[>]] | ابن **مباشر** |
| [[summary]] | الـ summary بتاعه |

يعني «السؤال بتاع الصندوق المفتوح بس». ولأن المتصفح بيحط ويشيل [[open]] مع كل ضغطة، الشكل بيتغير لوحده. والقيم:

~~~text getComputedStyle وأول سؤال مفتوح
summary 1 (مفتوح):  color: rgb(37, 99, 235)   margin-block-end: 8px
summary 2 (مقفول):  color: rgb(0, 0, 0)
~~~

[[0.5rem]] بقت [[8px]]، واللون جه من [[--color-brand]] (عرّفناه أزرق في التجربة).

---

## ٧. السهم اللي جنب السؤال

الـ summary الـ [[display]] بتاعه طلع [[list-item]]، وعشان كده ليه علامة زي بنود القوايم، وهي السهم. اسمها [[::marker]]. لو عايز تغيّرها: [[summary { list-style: none; }]] وحط أيقونة بنفسك بتلف مع [[details[open]]]. ولو شلتها حط علامة تانية، وإلا المستخدم مش هيعرف إنه بيتفتح.

وتحريك الفتح والقفل: Chrome 154 رجّع [[true]] لـ [[CSS.supports('selector(::details-content)')]] و [[CSS.supports('interpolate-size', 'allow-keywords')]]، بس دول لسه مش في كل المتصفحات، فخليهم تحسين إضافي.

> البحث بـ Ctrl+F جوه إجابة مقفولة (المتصفح بيفتح الـ details لوحده) مقدرناش نجرّبه في headless، والكلام عنه من الـ docs بتاعة Chrome.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[<details>]] | الصندوق كله |
| [[<summary>]] | أول ابن: السؤال، بياخد focus، و Enter و Space بيفتحوه |
| [[open]] | مفتوح دلوقتي (بتحطه للبداية، والمتصفح بيغيّره) |
| [[name]] | نفس الاسم = واحد بس مفتوح |
| [[details[open] > summary]] | شكل السؤال وهو مفتوح |
| حدث [[toggle]] | لو محتاج تعرف من الكود |

- مش محتاج [[aria-expanded]] ولا JavaScript: المتصفح بيعمل الاتنين.
- متحطش زرار أو لينك جوه الـ summary، ومتستخدموش لمنيو بيتقفل لما تدوس برا.`,
          lines: [
            "الجزء كله ليه اسم من العنوان.",
            "العنوان.",
            R`سؤال مفتوح من الأول، و [[name="faq"]] بيربطه بالباقي.`,
            "الجزء اللي بيتداس عليه، وبياخد focus لوحده.",
            "الإجابة: بتبان بس وهو مفتوح.",
            "قفلة.",
            "سؤال تاني بنفس الـ name: فتحه بيقفل الأول.",
            "السؤال.",
            "الإجابة.",
            "قفلة.",
            "قفلة الـ section.",
            "خط بين الأسئلة ومسافة.",
            "السؤال شكله بيتداس.",
            "السؤال المفتوح بلون البراند ومسافة تحته."
          ],
          sol: R`بالكيبورد: Tab بيقف على كل summary، و Enter أو Space بيفتحوا ويقفلوا، وقارئ الشاشة بيقول «التوصيل بياخد قد إيه؟، button، expanded».

مع [[name="faq"]]: فتح السؤال التاني قفل الأول لوحده. من غير name: الاتنين يفضلوا مفتوحين.

Ctrl+F على كلمة في إجابة مقفولة: في Chrome و Edge الـ details بيتفتح لوحده ويظلل الكلمة. لو متصفحك مبيعملش كده، دي ميزة لسه بتتنشر، والباقي شغال عادي.`
        },
        {
          cmd: "roving tabindex",
          title: "tabs بتتحرك بالأسهم زي البرامج الحقيقية",
          desc: R`الـ tabs widget واحد: Tab بيدخله مرة واحدة ويطلع منه مرة واحدة، وجواه بتتحرك بالأسهم. عشان كده roving tabindex: الـ tab المختار بس عليه [[tabindex="0"]]، والباقي [[tabindex="-1"]]. ولما تدوس سهم، بتنقل الـ 0 والـ focus للي بعده.

الـ roles: [[tablist]] على الحاوية، و [[tab]] على كل زرار ومعاه [[aria-selected]] و [[aria-controls]]، و [[tabpanel]] على كل محتوى ومعاه [[aria-labelledby]].

وفي العربي (RTL) الأسهم بتتقلب: السهم الشمال هو «اللي بعده».`,
          example: R`const list = document.querySelector('[role=tablist]');
const tabs = [...list.querySelectorAll('[role=tab]')];
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
list.addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  const rtl = getComputedStyle(list).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  if (step) select(tabs[(i + step + tabs.length) % tabs.length]);
  else if (e.key === 'Home') select(tabs[0]);
  else if (e.key === 'End') select(tabs.at(-1));
  else return;
  e.preventDefault();
});
list.addEventListener('click', (e) => {
  const t = e.target.closest('[role=tab]');
  if (t) select(t);
});`,
          try: R`اكتب الـ HTML بتاع 3 tabs (الحساب، والأمان، والفواتير) بالـ roles والـ attributes اللي في الشرح، وحط السكربت في صفحة [[dir="rtl"]]. دوس Tab: بيقف على كام tab؟ جرّب الأسهم و Home و End، وبعدين Tab تاني: راح فين؟`,
          flag: "script",
          deep: {
            why: R`لو كل tab بياخد Tab، مستخدم الكيبورد لازم يعدّي 8 tabs عشان يوصل للمحتوى. والأسهم هي اللي مستخدم قارئ الشاشة متوقعها، لأن ده سلوك الـ tabs في كل برنامج. ونفس الفكرة في toolbar، و radio group، و listbox، و menu، و grid.`,
            how: R`[[tabindex="-1"]] بيشيل العنصر من ترتيب الـ Tab بس بيسيبه يقبل [[focus()]] من الكود. فالـ widget كله بيبان في الـ Tab كعنصر واحد (اللي عليه 0)، ولما ترجع له بتلاقي آخر tab كنت عليه.

[[(i + step + tabs.length) % tabs.length]] بيلف: من الأخير للأول ومن الأول للأخير. و [[getComputedStyle(list).direction]] بيعرف الاتجاه من الـ CSS الحقيقي (موروث من [[dir]] على الـ html)، فنفس الكود يشتغل في العربي والإنجليزي.

ده «automatic activation»: السهم بيختار ويعرض على طول. لو عرض المحتوى تقيل (بيجيب بيانات)، الأحسن «manual activation»: السهم بينقل الـ focus بس، و Enter أو Space بيختار.

و [[hidden]] على الـ panels بيشيلهم من الشاشة وقارئ الشاشة. والـ tabpanel ممكن ياخد [[tabindex="0"]] لو مفيهوش أي عنصر بياخد focus، عشان Tab يوصل للمحتوى.

الـ combobox (حقل بحث بقايمة اقتراحات) أصعب بكتير: [[aria-activedescendant]]، والكتابة، والفلترة، والإعلان عن عدد النتايج. متكتبوش بإيدك: استخدم مكتبة headless زي React Aria أو Headless UI أو Base UI، ولو الاقتراحات بسيطة فيه [[<datalist>]] الأصلي.`,
            when: R`اكتب roving tabindex بإيدك لو مش بتستخدم مكتبة، أو عشان تفهم إيه اللي بيحصل. في مشروع React عادي استخدم Radix Tabs (أو shadcn Tabs) اللي عاملين كل ده صح، واعرف تختبرهم بالكيبورد.`,
            mistakes: R`كل الـ tabs [[tabindex="0"]]. الأسهم في RTL بالعكس. tabs من divs من غير roles. تعمل tabs بـ [[<a href="#">]] بتغيّر المحتوى (ده تنقل لو كل tab صفحة فعلًا، فيبقى nav عادي مش tabs). تنسى [[e.preventDefault()]] فالسهم يعمل scroll للصفحة كمان. وسؤال انترفيو: «إيه roving tabindex وليه؟» والإجابة: وقفة Tab واحدة للـ widget، والأسهم جواه، زي الـ radio group.`
          },
          teach: R`## الفكرة في سطرين

الـ tabs كلها «وقفة Tab» واحدة: الـ tab المختار بس عليه [[tabindex="0"]] والباقي [[-1]]، والأسهم هي اللي بتتنقّل جوه. والـ [[0]] ده «بيلف» (roving) مع الاختيار، ومن هنا جه الاسم. المثال هو الـ JavaScript بس، والـ HTML اللي بيشتغل عليه في الحل (solCode). حطينا الاتنين في صفحة [[dir="rtl"]] بين لينكين («قبل» و «بعد») وجرّبناهم بالكيبورد في Chrome 154 (headless عن طريق playwright).

---

## ١. الـ HTML الأول (من الحل)

~~~text الـ HTML (مختصر)
<div role="tablist" aria-label="الإعدادات">
  <button type="button" role="tab" id="tab-1" aria-selected="true"  aria-controls="panel-1" tabindex="0">الحساب</button>
  <button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">الأمان</button>
  ...
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">بيانات الحساب...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>...</div>
~~~

| الحاجة | معناها |
|---|---|
| [[role="tablist"]] | الحاوية: «دي مجموعة tabs». و [[aria-label]] اسمها |
| [[role="tab"]] | كل زرار tab. زرار حقيقي ([[<button>]]) عشان ياخد focus ويتداس |
| [[type="button"]] | عشان لو الزرار جوه form ميبعتوش |
| [[aria-selected]] | مختار ولا لأ (نص: [[true]] أو [[false]]) |
| [[aria-controls="panel-1"]] | الـ id بتاع المحتوى اللي الـ tab ده بيعرضه |
| [[tabindex="0"]] / [[-1]] | 0 = بيقف عليه Tab. و -1 = Tab بيعدّيه، بس الكود يقدر يعمل له [[focus()]] |
| [[role="tabpanel"]] + [[aria-labelledby]] | المحتوى، واسمه هو كلام الـ tab بتاعه |
| [[hidden]] | مستخبي من الشاشة ومن قارئ الشاشة |

ده الـ accessibility tree بعد ما اخترنا «الفواتير»:

~~~text الـ accessibility tree
tablist  "الإعدادات"
tabpanel "الفواتير"
tab      "الحساب"    selected=false
tab      "الأمان"    selected=false
tab      "الفواتير"  selected=true
~~~

الـ panel اسمه «الفواتير» عشان [[aria-labelledby]]، وباقي الـ panels مش ظاهرين خالص عشان [[hidden]].

---

## ٢. أول سطرين: نمسك العناصر

~~~javascript
const list = document.querySelector('[role=tablist]');
const tabs = [...list.querySelectorAll('[role=tab]')];
~~~

- [[const]] متغير مش هيتغير. و [[document.querySelector]] بيرجّع **أول** عنصر بيطابق selector، و [[[role=tablist]]] selector بالـ attribute: «العنصر اللي role بتاعه tablist».
- [[list.querySelectorAll]] بيرجّع **كل** اللي بيطابق، بس جوه [[list]] بس.
- [[[...]]]: الـ [[...]] اسمها spread، بتفرد العناصر جوه array حقيقية. ليه؟ [[querySelectorAll]] بيرجّع NodeList، ومفيهاش [[indexOf]] ولا [[at]] اللي هنحتاجهم تحت.

## ٣. الدالة [[select(tab)]]: كل التغيير في مكان واحد

~~~javascript
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
~~~

بتاخد الـ tab الجديد وتلف على **كل** الـ tabs ([[for (const t of tabs)]]: [[t]] كل واحد بالدور):

1. [[const on = t === tab;]]: [[===]] مقارنة، فـ [[on]] بتبقى [[true]] للـ tab الجديد بس و [[false]] للباقي.
2. [[setAttribute('aria-selected', String(on))]]: بيكتب الـ attribute. و [[String(on)]] بيحوّل [[true]] لنص [[«true»]]، لأن قيم الـ aria نصوص.
3. [[t.tabIndex = on ? 0 : -1;]]: [[? :]] اسمه ternary: «لو on يبقى 0، غير كده -1». ده قلب الفكرة: الـ [[0]] بينتقل للجديد.
4. السطر الطويل من جوه لبرة: [[t.getAttribute('aria-controls')]] بيرجّع [[«panel-2»]] مثلًا، و [[document.getElementById(...)]] بيجيب العنصر ده، و [[.hidden = !on]] ([[!]] = عكس) بيخفيه لو مش مختار ويظهره لو مختار.

وبعد اللفة: [[tab.focus()]] بينقل الـ focus للجديد. ده شغال رغم إن الـ tabindex كان -1، لأن -1 بيمنع Tab بس مش الكود.

## ٤. الأسهم: [[list.addEventListener('keydown', (e) => { ... })]]

[[addEventListener]] بيقول «لما يحصل حدث كذا شغّل الدالة دي». و [[keydown]] = زرار في الكيبورد اتداس. و [[(e) => {...}]] دالة (arrow function)، و [[e]] الحدث نفسه وفيه [[e.key]] اسم الزرار. الحدث متسجّل على الـ tablist مرة واحدة، والضغطة على أي tab جواه بتوصله (اسمها event delegation).

### [[const i = tabs.indexOf(document.activeElement);]]

[[document.activeElement]] العنصر اللي عليه الـ focus دلوقتي، و [[indexOf]] رقمه في الـ array (من 0).

### [[const rtl = getComputedStyle(list).direction === 'rtl';]]

[[getComputedStyle]] بيرجّع الـ CSS النهائي اللي المتصفح طبّقه، و [[direction]] موروث من [[dir]] على الـ html. في صفحة [[dir="rtl"]] رجّع [[rtl]]، وفي صفحة [[ltr]] رجّع [[ltr]].

### [[const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];]]

ده object صغير بنستخدمه كجدول، وبعده على طول [[[e.key]]] بيطلّع منه القيمة بتاعة الزرار اللي اتداس:

| الزرار | في RTL | في LTR |
|---|---|---|
| [[ArrowRight]] | [[-1]] (اللي قبله) | [[1]] (اللي بعده) |
| [[ArrowLeft]] | [[1]] (اللي بعده) | [[-1]] |
| أي زرار تاني | [[undefined]] | [[undefined]] |

في العربي الترتيب من اليمين للشمال، فالشمال هو «اللي بعده».

### [[if (step) select(tabs[(i + step + tabs.length) % tabs.length]);]]

[[undefined]] بيتحسب false، فالـ if دي بتشتغل للأسهم بس. والحسبة بتلف: [[%]] باقي القسمة.

~~~text الحسبة على ٣ tabs (اتحسبت في المتصفح)
من الأخير (2) لقدام:  (2 + 1 + 3) % 3 = 0   ← الأول
من الأول (0) لورا:    (0 - 1 + 3) % 3 = 2   ← الأخير
من غير + tabs.length:  -1 % 3 = -1          ← مفيش عنصر رقمه -1
~~~

عشان كده بنزوّد [[tabs.length]] قبل الـ [[%]]: في JavaScript باقي قسمة رقم سالب بيطلع سالب.

### Home و End و [[else return]]

[[tabs[0]]] الأول، و [[tabs.at(-1)]] الأخير ([[at]] بتقبل رقم سالب يعدّ من الآخر). وأي زرار تاني: [[return]] نخرج من الدالة ونسيبه للمتصفح (Tab مثلًا لازم يشتغل عادي).

### [[e.preventDefault();]]

بيمنع الشغل الافتراضي للزرار: السهم كان هيعمل scroll للصفحة كمان. اتأكدنا: بعد سهم [[e.defaultPrevented]] بقى [[true]]، وبعد حرف [[a]] فضل [[false]] (خرج من [[return]] قبلها).

## ٥. الماوس: [[click]] و [[closest]]

[[e.target]] العنصر اللي اتداس عليه بالظبط، و [[closest('[role=tab]')]] بيطلع لفوق لحد ما يلاقي أقرب عنصر (هو نفسه أو جد) role بتاعه tab، ولو مفيش يرجّع [[null]] فالـ [[if (t)]] بتتجاهل الضغطة.

---

## ٦. اللي حصل فعلًا بالكيبورد (RTL)

| الضغطة | الـ focus | [[tabIndex]] للتلاتة | الـ panel الظاهر |
|---|---|---|---|
| Tab مرتين (من أول الصفحة) | الحساب | [[0,-1,-1]] | panel-1 |
| ← (ArrowLeft) | الأمان | [[-1,0,-1]] | panel-2 |
| ← | الفواتير | [[-1,-1,0]] | panel-3 |
| ← | الحساب (لفّ) | [[0,-1,-1]] | panel-1 |
| → (ArrowRight) | الفواتير (لفّ لورا) | [[-1,-1,0]] | panel-3 |
| Home | الحساب | [[0,-1,-1]] | panel-1 |
| ← ثم Tab | لينك «بعد» | [[-1,0,-1]] | panel-2 |
| Shift+Tab | الأمان | [[-1,0,-1]] | panel-2 |

- Tab مرتين بس: مرة للينك «قبل» ومرة للـ tabs كلهم، والـ tabs التانيين اتعدّوا.
- Tab من جوه خرج على طول للينك «بعد»، لأن الـ panel ملوش tabindex ومفيهوش حاجة بتاخد focus.
- Shift+Tab رجع على «الأمان» (آخر واحد كنا عليه) مش على الأول.

وفي صفحة [[ltr]] نفس الكود: أول ← راح لـ «الفواتير» (لفّ لورا)، و → راح للي بعده. يعني الاتجاه بيتقلب لوحده من الـ CSS.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[tabindex]] 0 على واحد و -1 على الباقي | وقفة Tab واحدة للـ widget |
| [[select()]] | aria-selected و tabIndex و hidden و focus مع بعض |
| [[direction]] من [[getComputedStyle]] | الأسهم تتقلب في العربي |
| [[(i + step + n) % n]] | اللف من الأخير للأول والعكس |
| [[preventDefault]] | السهم ميعملش scroll |

- ده «automatic activation»: السهم بيعرض المحتوى على طول. لو العرض تقيل خلي السهم ينقل الـ focus بس و Enter يختار.
- في مشروع React حقيقي استخدم Radix Tabs، بس اختبره بنفس الجدول اللي فوق.`,
          lines: [
            "الحاوية.",
            "كل الـ tabs في مصفوفة.",
            "اختيار tab.",
            "لكل tab...",
            "...هو ده المختار؟",
            "aria-selected بـ true أو false.",
            "المختار بس عليه 0 والباقي -1: وقفة Tab واحدة.",
            "المحتوى بتاعه يبان والباقي يستخبى.",
            "قفلة الـ for.",
            "الـ focus على الـ tab الجديد.",
            "قفلة.",
            "الأسهم جوه الـ tablist.",
            "مكان الـ focus الحالي.",
            "الاتجاه الحقيقي من الـ CSS.",
            "في RTL اليمين = اللي قبله والشمال = اللي بعده.",
            "سهم: روح للي بعده أو قبله ولف في الآخر.",
            "Home: الأول.",
            "End: الأخير.",
            "أي زرار تاني: سيبه للمتصفح.",
            "منع الـ scroll بالأسهم.",
            "قفلة.",
            "الضغط بالماوس...",
            "...على أي tab...",
            "...يختاره.",
            "قفلة."
          ],
          sol: R`Tab من برا بيقف على «الحساب» بس (الوحيد اللي عليه 0). في [[dir="rtl"]]: السهم الشمال بيروح لـ «الأمان» والمحتوى بتاعه يظهر، والسهم اليمين يرجع (ومن الأول بيلف للأخير)، و Home و End للأول والآخر. و Tab بعد كده بيخرج من الـ tabs على طول للـ panel أو اللي بعده.

جربنا الكود ده في jsdom: بعد ArrowLeft في RTL الـ focus على t2 والـ tabIndex بقوا [[-1,0,-1]] والـ panel التاني ظهر.

لو كل tab واقف عليه Tab: نسيت [[tabindex="-1"]] على الباقي في الـ HTML. لو الأسهم بالعكس: الـ [[dir]] مش متحط، أو بتقرا [[document.dir]] بدل الـ CSS.`,
          solCode: R`<div role="tablist" aria-label="الإعدادات">
  <button type="button" role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0">الحساب</button>
  <button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">الأمان</button>
  <button type="button" role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1">الفواتير</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">بيانات الحساب...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>كلمة السر والـ 2FA...</div>
<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>الفواتير...</div>`
        },
        {
          cmd: "scroll-snap و scroll-margin",
          title: "carousel من CSS بس، وعنوان ميستخباش تحت الـ header",
          desc: R`[[scroll-snap-type: x mandatory]] على الحاوية و [[scroll-snap-align: start]] على العناصر: لما المستخدم يسيب الـ scroll، بيقف على أول كارت بالظبط بدل ما يقف في النص. carousel كامل بـ swipe على الموبايل من غير مكتبة.

و [[scroll-margin-top]] على العنصر بيسيب مسافة فوقه لما المتصفح يعمل scroll ليه (لينك [[#pricing]]، أو [[scrollIntoView]])، فالعنوان ميستخباش تحت الـ header الثابت. و [[scroll-padding-top]] على الـ html نفس الفكرة بس لكل العناصر مرة واحدة، وبيشمل الـ focus بالـ Tab.`,
          example: R`<ul class="carousel" tabindex="0" aria-label="منتجات مقترحة">
  <li><img src="/p/1.webp" alt="سماعة" width="300" height="300"></li>
  <li><img src="/p/2.webp" alt="ماوس" width="300" height="300"></li>
</ul>
// styles.css
.carousel { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scroll-padding-inline: 1rem; padding-inline: 1rem; }
.carousel > li { flex: 0 0 80%; scroll-snap-align: start; list-style: none; }
html { scroll-padding-top: 5rem; }
h2[id] { scroll-margin-top: 6rem; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`,
          try: R`اعمل carousel بـ 6 كروت وافتحه في وضع الموبايل واسحب: بيقف فين؟ شيل [[scroll-snap-type]] واسحب تاني. وبعدين اعمل header ثابت ارتفاعه 64px ولينك لـ [[#faq]] تحت، ودوس عليه مع وبدون [[scroll-padding-top]].`,
          flag: "script",
          deep: {
            why: R`الـ carousels مكتبات JavaScript تقيلة عشان حاجة الـ CSS بيعملها أحسن (الـ swipe طبيعي وبنفس إحساس النظام). والـ header الثابت اللي بياكل العنوان اللي رحتله بلينك، أو الحقل اللي عليه focus، مشكلة في كل موقع تقريبًا، ودي قاعدة 2.4.11 في WCAG 2.2.`,
            how: R`[[mandatory]] بيجبر الوقوف على نقطة snap دايمًا، و [[proximity]] بيقف عليها بس لو قريب منها (أحسن لو العناصر أطول من الشاشة، لأن mandatory ممكن يمنعك تشوف نص عنصر طويل). و [[scroll-snap-align]] بيحدد نقطة الوقوف: [[start]] أو [[center]] أو [[end]]، وبتتقلب لوحدها في RTL لأنها logical.

[[scroll-padding-inline]] على الحاوية بيخلي نقطة الوقوف بعد مسافة من الحافة، فالكارت ميلزقش في الطرف. و [[flex: 0 0 80%]] بيخلي جزء من الكارت اللي بعده باين، ودا اللي بيقول للمستخدم «فيه حاجة كمان، اسحب».

[[overscroll-behavior-x: contain]] بيمنع إن الـ scroll لما يخلص يكمّل في الصفحة، أو يعمل «رجوع» في Safari و Chrome على الموبايل.

[[scroll-margin-top]] على العنصر و [[scroll-padding-top]] على الـ scroll container (هنا [[html]]) الاتنين بيتجمعوا. والـ [[scroll-behavior: smooth]] جوه [[prefers-reduced-motion: no-preference]] عشان اللي طالب حركة أقل ميتعبش.

و [[tabindex="0"]] على الـ carousel عشان مستخدم الكيبورد يقدر يعمل scroll بالأسهم (زي درس الجدول). ولو عايز أزرار «التالي والسابق»، [[scrollBy({ left: el.clientWidth })]] سطر واحد، والـ snap بيظبط الوقفة.`,
            when: R`carousel منتجات أو صور أو testimonials، و galleries، و onboarding screens على الموبايل. و scroll-padding-top في أي موقع فيه header ثابت. ولو محتاج autoplay أو loop لا نهائي أو thumbnails متزامنة، ساعتها مكتبة (Embla مثلًا).`,
            mistakes: R`[[mandatory]] مع عناصر أطول من الشاشة فالمستخدم ميعرفش يوصل لنصها. [[scroll-behavior: smooth]] من غير احترام reduced motion. carousel بيتحرك لوحده ومفيهوش إيقاف. كل الكروت بعرض 100% فالمستخدم مش عارف إن فيه غيرهم. و [[scroll-margin-top]] بقيمة ثابتة والـ header ارتفاعه بيتغير على الموبايل، فخليها CSS variable بارتفاع الـ header.`
          },
          teach: R`## حاجتين في درس واحد

1. **scroll-snap**: الـ scroll الأفقي في الـ carousel يقف دايمًا على بداية كارت، مش في النص.
2. **scroll-padding و scroll-margin**: لما المتصفح يعمل scroll لعنصر (لينك [[#faq]] مثلًا)، يسيب مسافة فوقه عشان الـ header الثابت ميغطيهوش.

حطينا المثال في صفحة فيها header ثابت ارتفاعه 64px، وخلينا الـ carousel عرضه 400px بـ 6 كروت، وقسنا كل حاجة في Chrome 154 (headless عن طريق playwright).

---

## ١. الـ HTML

~~~text index.html
<ul class="carousel" tabindex="0" aria-label="منتجات مقترحة">
  <li><img src="/p/1.webp" alt="سماعة" width="300" height="300"></li>
  <li><img src="/p/2.webp" alt="ماوس" width="300" height="300"></li>
</ul>
~~~

- [[<ul>]] لستة، و [[<li>]] كل كارت. لستة عشان قارئ الشاشة يقول «لستة فيها كذا عنصر».
- [[tabindex="0"]]: الـ [[<ul>]] مش بياخد focus لوحده. الـ 0 بيحطه في ترتيب الـ Tab، فمستخدم الكيبورد يقف عليه ويعمل scroll بالأسهم.
- [[aria-label]]: اسم اللستة لقارئ الشاشة، لأن مفيش عنوان جنبها.
- [[width]] و [[height]] على الصورة: المتصفح يحجز مكانها قبل ما توصل (درس «احجز المكان» تحت).

---

## ٢. سطر الحاوية: [[.carousel { ... }]]

السطر طويل، فنفكّه خاصية خاصية:

| الخاصية | بتعمل إيه |
|---|---|
| [[display: flex]] | الكروت جنب بعض في صف |
| [[gap: 1rem]] | 16px بين كل كارت والتاني |
| [[overflow-x: auto]] | الكروت أعرض من الحاوية؟ اعمل scroll أفقي (x = أفقي) |
| [[scroll-snap-type: x mandatory]] | الوقوف على نقط الـ snap في الاتجاه الأفقي، و [[mandatory]] = إجباري دايمًا |
| [[overscroll-behavior-x: contain]] | لما الـ scroll يوصل للآخر ميكمّلش في الصفحة ولا يعمل «رجوع» |
| [[scroll-padding-inline: 1rem]] | نقطة الوقوف بعد 16px من الحافة مش لازقة فيها |
| [[padding-inline: 1rem]] | مسافة 16px يمين وشمال جوه الحاوية |

[[inline]] في [[scroll-padding-inline]] و [[padding-inline]] معناها اتجاه السطر (الأفقي في العربي والإنجليزي)، يعني الجنبين مع بعض.

## ٣. سطر الكارت: [[.carousel > li { flex: 0 0 80%; scroll-snap-align: start; list-style: none; }]]

- [[flex: 0 0 80%]] تلات أرقام: [[0]] ميكبرش، و [[0]] ميصغرش، و [[80%]] عرضه 80% من الحاوية. فالكارت اللي بعده بيبان طرفه، وده بيقول للمستخدم «اسحب، فيه كمان».
- [[scroll-snap-align: start]]: نقطة الوقوف هي **بداية** الكارت (في العربي بدايته اليمين، لأن start logical).
- [[list-style: none]]: يشيل النقطة اللي قبل كل [[<li>]].

اللي اتقاس:

~~~text getBoundingClientRect و offsetLeft
عرض الكارت:              320   (80% من 400)
بداية كل كارت:           16, 352, 688, 1024, 1360, 1696
~~~

الأول بيبدأ عند 16 (الـ padding)، وكل واحد بعده بـ 336 = 320 عرض + 16 gap.

### التجربة: قلنا للـ carousel يروح لمكان، ووقف فين؟

| [[scrollTo]] لـ | مع [[scroll-snap-type]] | من غيره |
|---|---|---|
| 100 | 0 | 100 |
| 200 | 336 | 200 |
| 400 | 336 | 400 |

من غير snap بيقف مكان ما قلتله بالظبط، ممكن في نص كارتين. مع الـ snap بيروح لأقرب نقطة وقوف: 0 (الكارت الأول) أو 336 (التاني). و 336 دي بداية الكارت التاني (352) ناقص الـ [[scroll-padding-inline]] (16).

وبالكيبورد: Tab وقف على الـ carousel، وكل سهم يمين نقله كارت بالظبط:

~~~text scrollLeft بعد كل ArrowRight
336
672
1008
~~~

وفي صفحة [[dir="rtl"]] نفس الكود: الكارت الأول لازق في الحافة اليمين بعد 16px، وبعد [[scrollTo]] لـ -200 (في RTL الـ scrollLeft بيبقى سالب) وقف عند [[-336]] والكارت التاني بقى على بعد 16px من اليمين. يعني [[start]] اتقلبت لوحدها.

---

## ٤. [[html { scroll-padding-top: 5rem; }]] و [[h2[id] { scroll-margin-top: 6rem; }]]

الاتنين بيسيبوا مسافة فوق العنصر لما المتصفح يعمل scroll ليه، بس من مكانين مختلفين:

| الخاصية | بتتحط على | معناها |
|---|---|---|
| [[scroll-padding-top]] | الحاوية اللي بتعمل scroll (هنا [[html]] = الصفحة كلها) | «أي عنصر تروحله، سيب فوقه كذا» |
| [[scroll-margin-top]] | العنصر نفسه | «لما تروحلي أنا، سيب فوقي كذا» |

و [[h2[id]]] يعني «أي h2 عليه id»، لأن دول بس اللي بيبقى ليهم لينك [[#]].

جرّبنا بلينك [[#faq]] (على h2 عليه [[id="faq"]]) وبـ [[scrollIntoView()]] على فقرة عادية، وقسنا بُعد العنصر من فوق الشاشة:

| | h2 بعد [[#faq]] | فقرة بعد [[scrollIntoView]] |
|---|---|---|
| المثال زي ما هو | 176px | 80px |
| من غير الاتنين | 0px (تحت الـ header) | 0px |

- الفقرة: 80 = [[5rem]] بتاعة [[scroll-padding-top]] بس.
- الـ h2: 176 = 80 + 96 ([[6rem]]): **الاتنين بيتجمعوا**. فلو حطيت الاتنين خليهم مع بعض قد ارتفاع الـ header ومسافة صغيرة، مش كل واحد لوحده قد الـ header.
- من غيرهم: العنصر بيبقى عند 0، يعني ورا الـ header اللي ارتفاعه 64.

## ٥. [[@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }]]

- [[scroll-behavior: smooth]]: الـ scroll للينكات بيبقى ناعم بدل ما ينط.
- [[@media (prefers-reduced-motion: no-preference)]]: «بس لو المستخدم **مش** طالب حركة أقل من إعدادات نظامه».

اتأكدنا: الـ [[scroll-behavior]] المحسوب على الـ html كان [[smooth]] في الوضع العادي، ولما شغّلنا المتصفح بـ reduced motion بقى [[auto]] (ينط على طول).

> [[overscroll-behavior-x: contain]] وإحساس الـ swipe على الموبايل محتاجين تليفون حقيقي، والكلام عنهم من الـ docs بتاعة MDN.

---

## الخلاصة

| الخاصية | على مين | ليه |
|---|---|---|
| [[scroll-snap-type: x mandatory]] | الحاوية اللي عليها [[overflow]] | يقف على نقط |
| [[scroll-snap-align: start]] | الأولاد المباشرين | النقطة = بداية الكارت |
| [[scroll-padding-inline]] | الحاوية | الوقفة بعد مسافة من الحافة |
| [[scroll-padding-top]] | [[html]] | مسافة فوق أي عنصر بتروحله |
| [[scroll-margin-top]] | العنصر | مسافة زيادة ليه هو، وبتتجمع مع اللي فوق |

- الـ snap شغال بس لو [[overflow]] و [[scroll-snap-type]] على **نفس** العنصر.
- [[mandatory]] مع كروت أطول من الشاشة غلط: استخدم [[proximity]].`,
          lines: [
            "القايمة الأفقية: ليها اسم وبتاخد focus للـ scroll بالكيبورد.",
            "كارت.",
            "كارت.",
            "قفلة.",
            R`flex أفقي، و scroll أفقي، والوقوف إجباري على نقط الـ snap، والـ scroll ميكمّلش للصفحة، ونقطة الوقوف بعد 1rem من الحافة.`,
            "كل كارت 80% من العرض (فاللي بعده باين)، والوقوف على بدايته.",
            "أي scroll لعنصر (لينك # أو focus) يسيب 5rem للـ header الثابت.",
            "والعناوين اللي ليها id مسافة زيادة.",
            "scroll ناعم للينكات، بس للي مش طالب حركة أقل."
          ],
          sol: R`مع [[scroll-snap-type]]: لما تسيب إيدك في أي مكان، الـ carousel بيكمّل لحد ما بداية كارت تبقى على الحافة (بعد 1rem). من غيره: بيقف مكان ما سبته، ممكن في نص كارتين.

اللينك لـ [[#faq]] من غير scroll-padding: العنوان بيبقى تحت الـ header الثابت ومش باين. مع [[scroll-padding-top: 5rem]]: العنوان باين تحت الـ header على طول. ونفس الحكاية مع Tab على حقل تحت الـ header وانت طالع لفوق.

لو الـ snap مش شغال: اتأكد إن [[overflow-x: auto]] على نفس العنصر اللي عليه [[scroll-snap-type]]، وإن [[scroll-snap-align]] على الأولاد المباشرين.`
        },
        {
          cmd: "View Transitions",
          title: "حركة ناعمة بين حالتين أو صفحتين",
          desc: R`[[document.startViewTransition(update)]] بياخد صورة للصفحة قبل، ويشغّل الدالة اللي بتغيّر الـ DOM، وياخد صورة بعد، ويعمل crossfade بينهم. ولو عنصر ليه [[view-transition-name]] في الحالتين، بيتحرك ويكبر من مكانه القديم للجديد (صورة المنتج في اللستة بتطير لصفحة التفاصيل).

وبين صفحات حقيقية (MPA): [[@view-transition { navigation: auto; }]] في CSS الصفحتين، من غير JavaScript.

دي progressive enhancement: لو المتصفح مش بيدعمها، التغيير بيحصل عادي من غير حركة.`,
          example: R`function show(view) {
  const update = () => document.querySelector('main').replaceChildren(view);
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
  document.startViewTransition(update);
}
// styles.css
.product-42 .thumb { view-transition-name: product-42; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }
@view-transition { navigation: auto; }
@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none; } }`,
          try: R`اعمل لستة منتجات وصفحة تفاصيل في نفس الـ HTML، وبدّل بينهم بـ [[show()]]. جرّب من غير [[view-transition-name]]، وبعدين حطه على صورة المنتج في الحالتين بنفس الاسم. وفي DevTools › More tools › Animations بطّأ الحركة لـ 10% وشوف إيه اللي بيتحرك.`,
          flag: "script",
          deep: {
            why: R`الحركة بين الحالات بتوضح للمستخدم إيه اللي حصل: الصورة اللي داس عليها بقت الصورة الكبيرة، مش صفحة جديدة ظهرت فجأة. قبل كده ده كان محتاج مكتبات animation وحسابات أماكن بإيدك. دلوقتي سطر.`,
            how: R`المتصفح بيعمل snapshot للعناصر اللي ليها أسماء (والصفحة كلها اسمها [[root]])، ويبني شجرة pseudo-elements فوق الصفحة: [[::view-transition-group(name)]] جواه [[::view-transition-old]] و [[::view-transition-new]]. الـ group بيتحرك ويتغير مقاسه من المكان القديم للجديد، والـ old والـ new بيعملوا crossfade. وكله animations عادية تقدر تغيّرها في CSS.

[[view-transition-name]] لازم يبقى فريد في الصفحة وقت الحركة: لو عنصرين بنفس الاسم الحركة بتتلغي. عشان كده في اللستات بيتحط اسم لكل عنصر (inline style بالـ id)، أو بيتحط على العنصر اللي اتداس بس قبل الحركة.

الدعم: الـ same-document ([[startViewTransition]]) بقى في كل المتصفحات الأساسية من أواخر 2025. الـ cross-document ([[@view-transition]]) في Chrome و Edge و Safari، ولسه مش في كل المتصفحات وقت كتابة الدرس، فراجع caniuse. وفي الحالتين الكود بيشتغل عادي من غير الحركة لو مش مدعوم.

في React و Next: فيه شغل على مكون [[<ViewTransition>]] في React و flag تجريبي في Next.js، اتأكد من حالتهم في الدوكس بتاعة النسخة اللي عندك قبل ما تعتمد عليهم.`,
            when: R`لستة لتفاصيل، وتبديل الـ tabs أو الـ views، وتغيير ترتيب لستة، وفتح صورة كبيرة. وخليها قصيرة (200 لـ 300ms) وقليلة، واحترم reduced motion دايمًا.`,
            mistakes: R`نفس الـ view-transition-name على كذا عنصر فمفيش حركة خالص. حركة طويلة بتخلي الموقع يحس إنه بطيء. تنسى reduced motion. تستدعي [[startViewTransition]] من غير ما تتأكد إنه موجود فالموقع يقع في المتصفحات اللي مش بتدعمه. والدالة اللي جوه async وبتجيب بيانات من السيرفر: الصفحة بتبقى متجمدة لحد ما تخلص، فهات البيانات الأول وبعدين ابدأ الحركة.`
          },
          teach: R`## صورة قبل، وصورة بعد، والمتصفح بيحرّك بينهم

انت بتغيّر الـ DOM عادي، والمتصفح هو اللي بيعمل الحركة: بياخد لقطة للصفحة قبل التغيير، ويشغّل التغيير، وياخد لقطة بعده، ويعمل fade بينهم. المثال فيه دالة JavaScript للتغيير جوه نفس الصفحة، و ٤ سطور CSS. جرّبناه في Chrome 154 (headless عن طريق playwright): لستة فيها مربع صغير (الصورة) بنبدّلها بصفحة تفاصيل فيها نفس المربع كبير.

---

## ١. الدالة [[show(view)]]

~~~javascript
function show(view) {
  const update = () => document.querySelector('main').replaceChildren(view);
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
  document.startViewTransition(update);
}
~~~

### السطر ١: [[const update = () => ...]]

[[update]] دالة صغيرة (arrow function) فيها التغيير نفسه ومبتتنفّذش دلوقتي. [[document.querySelector('main')]] بيجيب عنصر [[<main>]]، و [[replaceChildren(view)]] بيشيل كل اللي جواه ويحط [[view]] مكانه. شايلينها في متغير عشان نديها للمتصفح، وهو يقرر إمتى يشغّلها.

### السطر ٢: الشرط الطويل

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[document.startViewTransition]] | الدالة نفسها. لو المتصفح مش بيدعمها بتبقى [[undefined]] |
| [[!]] | عكس: «لو مش موجودة» |
| [[||]] | «أو» |
| [[matchMedia('(prefers-reduced-motion: reduce)')]] | بيسأل: المستخدم طالب حركة أقل من إعدادات نظامه؟ |
| [[.matches]] | [[true]] لو أيوه |
| [[return update();]] | غيّر على طول من غير حركة واخرج من الدالة |

### السطر ٣: [[document.startViewTransition(update)]]

ده اللي بيشغّل الحركة. اختبرناه:

~~~text الناتج
startViewTransition موجودة:              function
مباشرة بعد show() هل المحتوى اتغيّر؟     false
بعد ما الحركة خلصت:                       true
~~~

يعني [[update]] مبتتنفذش في نفس اللحظة: المتصفح بياخد اللقطة الأولى الأول وبعدين يشغّلها.

وشغّلنا المتصفح تاني بإعداد reduced motion: مفيش transition اتعمل خالص، والمحتوى اتغيّر **في نفس اللحظة** ([[true]] مباشرة بعد [[show()]]).

---

## ٢. الـ CSS

### [[.product-42 .thumb { view-transition-name: product-42; }]]

[[view-transition-name]] بيدّي العنصر اسم. لو عنصر ليه **نفس الاسم** قبل وبعد التغيير، المتصفح بيعتبرهم نفس الحاجة: بيحرّكه ويكبّره من مكانه القديم لمكانه الجديد بدل الـ fade. هنا الصورة الصغيرة في اللستة والكبيرة في التفاصيل الاتنين جوه عنصر عليه [[product-42]].

### الشجرة اللي المتصفح بيبنيها

أثناء الحركة سألنا المتصفح [[document.getAnimations()]] (كل الـ animations الشغالة دلوقتي):

~~~text الناتج (مختصر)
::view-transition-group(root)        250ms
::view-transition-group(product-42)  250ms
::view-transition-old(root)          fade-out  200ms
::view-transition-new(root)          fade-in   200ms
::view-transition-old(product-42)    fade-out  250ms
::view-transition-new(product-42)    fade-in   250ms
~~~

| الاسم | هو إيه |
|---|---|
| [[root]] | اسم الصفحة كلها، موجود لوحده |
| [[::view-transition-group(اسم)]] | الصندوق اللي بيتحرك ويتغير مقاسه من القديم للجديد |
| [[::view-transition-old(اسم)]] | اللقطة القديمة، بتختفي (fade-out) |
| [[::view-transition-new(اسم)]] | اللقطة الجديدة، بتظهر (fade-in) |

دول pseudo-elements (عناصر وهمية المتصفح بيعملها فوق الصفحة، وتقدر تستايلها بـ CSS) وكل حركة فيهم animation عادية.

### [[::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }]]

الفاصلة بين selectorين = نفس القاعدة للاتنين. [[animation-duration]] مدة الحركة. والناتج فوق بيأكدها: الـ old والـ new بتوع [[root]] بقوا [[200ms]]، والباقي فضل على الافتراضي [[250ms]].

### [[@view-transition { navigation: auto; }]]

ده لحركة بين **صفحتين حقيقيتين** (لينك عادي بيفتح صفحة تانية، MPA). لازم يبقى في CSS الصفحتين، وهما على نفس الـ origin (نفس الدومين والبروتوكول والبورت). عملنا صفحتين على نفس السيرفر فيهم السطر ده ودوسنا على لينك: الصفحة الجديدة وصلها حدث [[pagereveal]] وفيه [[viewTransition]] موجود ([[true]])، يعني الحركة اشتغلت من غير ولا سطر JavaScript. و Chrome فهم السطر ده كـ [[CSSViewTransitionRule]].

### [[@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none; } }]]

[[*]] = أي اسم. «لو المستخدم طالب حركة أقل، بطّل حركة كل الـ groups». الـ JavaScript فوق بيحمي الحركة اللي جوه الصفحة، والسطر ده بيحمي الحركة بين الصفحات (اللي مفيهاش JavaScript).

---

## ٣. الغلطة اللي بتلغي كل حاجة: اسم متكرر

حطينا عنصرين عليهم [[product-42]] في نفس الوقت وشغّلنا transition:

~~~text الناتج
[console] Unexpected duplicate view-transition-name: product-42
ready ← InvalidStateError
المحتوى اتغيّر؟ true
~~~

الحركة اتلغت، بس التغيير نفسه حصل. عشان كده في لستة منتجات كل عنصر لازم ياخد اسم مختلف ([[product-42]] و [[product-43]]...)، أو تحط الاسم على العنصر اللي اتداس بس قبل الحركة.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[startViewTransition(update)]] | لقطة قبل، شغّل update، لقطة بعد، حرّك |
| الشرط قبلها | متصفح قديم أو reduced motion: غيّر من غير حركة |
| [[view-transition-name]] | اسم فريد = العنصر بيطير من مكان لمكان |
| [[::view-transition-old/new/group]] | الحركة نفسها، وتتغير بـ CSS |
| [[@view-transition]] | نفس الكلام بين صفحتين، في CSS الاتنين |

- الحركة قصيرة (200 لـ 300ms) واحترم reduced motion دايمًا.
- هات البيانات قبل [[startViewTransition]]، مش جوه [[update]]، عشان الصفحة متتجمدش.`,
          lines: [
            "بتعرض view جديد (لستة أو تفاصيل).",
            "التغيير نفسه: بدّل محتوى الـ main.",
            "المتصفح مش بيدعم، أو المستخدم طالب حركة أقل؟ غيّر من غير حركة.",
            "غير كده: غيّر جوه view transition.",
            "قفلة.",
            "صورة المنتج ليها نفس الاسم في اللستة والتفاصيل، فبتطير من مكان للتاني.",
            "الـ crossfade بتاع الصفحة كلها أسرع من الافتراضي.",
            "حركة بين الصفحات الحقيقية (لازم في الصفحتين ونفس الـ origin).",
            "اللي طالب حركة أقل: من غير animation."
          ],
          sol: R`من غير [[view-transition-name]]: الصفحة كلها بتعمل fade من اللستة للتفاصيل. مع الاسم على الصورة في الحالتين: الصورة بتتحرك وتكبر من مكانها في اللستة لمكانها في التفاصيل، والباقي fade. في Animations panel بـ 10% هتشوف الـ group بيتحرك والـ old والـ new بيتبدّلوا.

لو مفيش أي حركة: غالبًا الاسم متكرر (كل صور اللستة عليها نفس الاسم)، أو متصفحك مش بيدعم، أو إعداد reduce motion شغال في نظامك. ولو الصفحة وقفت ثانية قبل الحركة: الـ update فيه fetch، هات البيانات قبل.`
        },
        {
          cmd: "text-wrap",
          title: "عنوان سطره الأخير كلمة لوحدها",
          desc: R`[[text-wrap: balance]] بيوزّع كلام العنوان على السطور بالتساوي، بدل سطر مليان وسطر فيه كلمة واحدة. و [[text-wrap: pretty]] للفقرات: بيحاول ميخليش كلمة لوحدها في آخر سطر.

وفي Tailwind v4: [[text-balance]] و [[text-pretty]]. ومعاهم [[line-clamp-2]] لو عايز تقطع الكلام بعد سطرين بـ «…».`,
          example: R`h1, h2, h3 { text-wrap: balance; }
p, li, figcaption { text-wrap: pretty; }
.price { white-space: nowrap; }
.card-title { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
<h2 className="text-balance">عرض الصيف: خصم على كل السماعات والشواحن الأصلية</h2>
<p className="text-pretty max-w-prose">...</p>
<h3 className="line-clamp-2">اسم منتج طويل جدًا جاي من الداتابيز ومحدش عارف طوله</h3>`,
          try: R`اعمل عنوان طويل في كارت عرضه 20rem، وغيّر عرض الشاشة لحد ما السطر الأخير يبقى كلمة واحدة. ضيف [[text-wrap: balance]] وشوف الفرق. وبعدين في DevTools اكتب في Console [[CSS.supports('text-wrap', 'pretty')]].`,
          flag: "script",
          deep: {
            why: R`العناوين في الكروت والهيرو بتتقسم وحش على بعض الشاشات، والمصممين كانوا بيحطوا [[<br>]] بإيدهم (وده بيبوظ على شاشة تانية). سطر CSS بيحلها لكل المقاسات.`,
            how: R`[[balance]] بيجرب عروض مختلفة ويختار اللي يخلي السطور قريبة من بعض، وعشان ده مكلّف المتصفحات بتطبقه على عدد سطور محدود (في Chrome حوالي 6)، فهو للعناوين والكلام القصير بس. والصندوق نفسه عرضه مبيتغيرش، الكلام بس اللي بيتوزع جواه.

[[pretty]] أرخص: بيبص على آخر كام سطر ويحاول يتجنب كلمة لوحدها. ودعمه لسه مش في كل المتصفحات وقت كتابة الدرس، واللي مش بيدعمه بيتجاهله ويكسر عادي، فحطه من غير قلق.

[[white-space: nowrap]] على حاجة مينفعش تتقسم (سعر بعملته، رقم تليفون). و [[line-clamp]] بيقطع بعد عدد سطور ويحط «…»، والصيغة الـ [[-webkit-]] هي اللي شغالة في كل المتصفحات لحد دلوقتي، و Tailwind بيكتبها لك.

وكل ده بيشتغل مع العربي عادي لأنه بيكسر عند المسافات.`,
            when: R`balance: كل العناوين (ممكن في الـ base styles مرة واحدة). pretty: الفقرات والـ captions. line-clamp: عناوين الكروت ووصف المنتجات اللي طولها مش معروف.`,
            mistakes: R`balance على فقرات طويلة (مش هيشتغل أو هيبطّأ). [[<br>]] يدوي في العناوين. line-clamp من غير [[overflow: hidden]]. تقطع الكلام بـ JavaScript (substring) فيتقطع في نص كلمة، وقارئ الشاشة يقرا نص الكلام بس، مع line-clamp الكلام كله موجود وبيتقري.`
          },
          teach: R`## المتصفح هو اللي بيقرر الكلام يتكسر فين

لما الكلام ميكفيش في سطر، المتصفح بيملا السطر الأول على الآخر، واللي فاضل ينزل تحت، حتى لو كلمة واحدة. المثال فيه ٤ سطور CSS بتغيّر ده، و ٣ سطور JSX بنفس الكلام بكلاسات Tailwind. قسنا الـ CSS في Chrome 154 (headless عن طريق playwright) بخط Arial، وبنينا كلاسات Tailwind في مشروع Vite 8 و Tailwind 4.3.3 حقيقي.

---

## ١. [[h1, h2, h3 { text-wrap: balance; }]]

الفواصل بين الـ selectors = نفس القاعدة للتلاتة. و [[text-wrap]] بتقول للمتصفح يكسر السطور إزاي، و [[balance]] = «وزّع الكلام على السطور بحيث تبقى قريبة من بعض في الطول».

حطينا العنوان «عرض الصيف: خصم على كل السماعات والشواحن الأصلية» (24px) في كارت، وقسنا عرض كل سطر:

| عرض الكارت | من غير balance | مع balance |
|---|---|---|
| 320px | سطر 311 وسطر 142 | سطر 229 وسطر 224 |
| 300px | 229 و 224 | 229 و 224 |

على 320 من غير balance السطر الأول مليان والتاني نصه فاضي. مع balance السطرين تقريبًا قد بعض. ولما الكارت بقى 300 الكسر الطبيعي جه متوازن لوحده، فالـ balance ملوش تأثير. وعرض الكارت نفسه فضل 320 في الحالتين: الكلام بس اللي بيتوزع جواه.

المتصفح بيعمل ده بإنه يجرّب أكتر من عرض، وده مكلّف، فبيطبّقه على عدد سطور قليل بس (الـ docs بتاعة Chrome بتقول حوالي ٦). عشان كده للعناوين بس.

## ٢. [[p, li, figcaption { text-wrap: pretty; }]]

[[pretty]] للفقرات: بيبص على آخر السطور ويحاول ميسيبش كلمة لوحدها في الآخر. أرخص من balance فينفع على كلام طويل. [[li]] بند في لستة، و [[figcaption]] الكلام اللي تحت صورة.

~~~text في Console بتاع Chrome 154
CSS.supports('text-wrap', 'pretty')    → true
CSS.supports('text-wrap', 'balance')   → true
~~~

[[CSS.supports]] بيسأل المتصفح «انت فاهم الخاصية دي بالقيمة دي؟». المتصفح اللي يرجّع [[false]] بيتجاهل السطر ويكسر عادي، فمفيش حاجة بتبوظ.

> [[text-wrap]] في الحقيقة اختصار لخاصيتين: Chrome رجّع [[text-wrap-mode: wrap]] و [[text-wrap-style: balance]] لما حطينا [[text-wrap: balance]].

## ٣. [[.price { white-space: nowrap; }]]

[[white-space: nowrap]] = «متكسرش السطر جوه العنصر ده خالص». حطينا «1,250 جنيه» جوه جملة في صندوق ضيق (88px):

| | السعر اتقسم على كام سطر؟ |
|---|---|
| من غير [[nowrap]] | 2 (الرقم في سطر و «جنيه» في سطر) |
| مع [[nowrap]] | 1 |

للسعر بعملته، ورقم التليفون، وأي حاجة معناها يبوظ لو اتقسمت.

## ٤. [[.card-title { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }]]

ده «اقطع بعد سطرين وحط …». ٤ خصائص لازم مع بعض:

| الخاصية | ليه |
|---|---|
| [[display: -webkit-box]] | نوع صندوق قديم، هو اللي الـ line-clamp بيشتغل عليه |
| [[-webkit-box-orient: vertical]] | العناصر جواه فوق بعض |
| [[-webkit-line-clamp: 2]] | سطرين بس، وآخرهم «…» |
| [[overflow: hidden]] | اللي بعد السطرين يستخبى |

[[-webkit-]] اسمها prefix: اسم قديم بدأ في متصفحات WebKit، والصيغة دي هي اللي شغالة في كل المتصفحات.

حطينا اسم منتج طويل (خط 20px و [[line-height: 1.5]]، يعني السطر 30px):

~~~text getBoundingClientRect و scrollHeight
الارتفاع الظاهر:     60   (سطرين × 30)
الارتفاع الحقيقي:    90   (الكلام محتاج 3 سطور)
~~~

والكلام كله لسه موجود: اسم العنوان في الـ accessibility tree طلع الجملة كاملة، فقارئ الشاشة بيقرا كل حاجة. ده الفرق عن إنك تقطع بـ [[substring]] في JavaScript.

---

## ٥. نفس الكلام بـ Tailwind

~~~text JSX
<h2 className="text-balance">...</h2>
<p className="text-pretty max-w-prose">...</p>
<h3 className="line-clamp-2">...</h3>
~~~

[[className]] هو [[class]] بس في React (لأن [[class]] كلمة محجوزة في JavaScript). بنينا الملف ده في مشروع Vite و Tailwind 4.3.3، وده الـ CSS اللي Tailwind طلّعه للكلاسات دي بالظبط:

~~~text CSS الناتج من vite build
.line-clamp-2 {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.max-w-prose {
  max-width: 65ch;
}
.text-balance {
  text-wrap: balance;
}
.text-pretty {
  text-wrap: pretty;
}
~~~

نفس الـ CSS اللي كتبناه بإيدنا فوق. وزيادة [[max-w-prose]]: أقصى عرض [[65ch]]، و [[ch]] عرض حرف الصفر في الخط ده، يعني حوالي ٦٥ حرف في السطر، وده عرض مريح للقراية.

---

## الخلاصة

| الحاجة | لمين | Tailwind |
|---|---|---|
| [[text-wrap: balance]] | العناوين والكلام القصير | [[text-balance]] |
| [[text-wrap: pretty]] | الفقرات | [[text-pretty]] |
| [[white-space: nowrap]] | سعر، تليفون | [[whitespace-nowrap]] |
| line-clamp (٤ خصائص) | عنوان كارت طوله مش معروف | [[line-clamp-2]] |

- balance مش بيغيّر عرض الصندوق، بيوزّع الكلام جواه بس.
- متحطش [[<br>]] بإيدك في العناوين: بيبوظ على شاشة تانية.`,
          lines: [
            "كل العناوين: السطور متوازنة.",
            "الفقرات: من غير كلمة يتيمة في الآخر (لو المتصفح بيدعم).",
            "السعر ميتقسمش على سطرين.",
            "العنوان سطرين بالكتير وبعدين «…».",
            "نفس balance بـ Tailwind.",
            R`نفس pretty، و [[max-w-prose]] عرض مريح للقراية.`,
            "نفس القطع بعد سطرين بـ Tailwind."
          ],
          sol: R`من غير balance: على بعض العروض هتلاقي سطر مليان وتحته «الأصلية» لوحدها. مع balance: سطرين قريبين من بعض في الطول، وعرض الكارت زي ما هو.

[[CSS.supports('text-wrap', 'pretty')]] بيرجع true في Chrome و Edge (ومتصفحات تانية حسب النسخة)، ولو رجع false ده معناه إن المتصفح هيتجاهل السطر، مش إن الصفحة هتبوظ.

لو balance ملوش أي تأثير: غالبًا الكلام أطول من الحد اللي المتصفح بيطبقه عليه، أو العنصر [[display: inline]].`
        },
        {
          cmd: "Baseline و @supports",
          title: "الميزة دي أستخدمها ولا لسه؟ Baseline و caniuse و @supports",
          desc: R`Baseline علامة بتلاقيها في MDN و caniuse: «Newly available» يعني الميزة شغالة في آخر نسخة من Chrome و Edge و Firefox و Safari (ديسكتوب وموبايل)، و «Widely available» يعني عدّى على ده 30 شهر، فأغلب الناس عندهم نسخة بتدعمها.

caniuse.com بيدّيك التفاصيل: أنهي نسخة، ونسبة المستخدمين، والمشاكل المعروفة. و [[@supports]] في CSS (و [[CSS.supports()]] في JavaScript) بيسأل المتصفح نفسه: لو بتدعم الحاجة دي طبّق ده.

و browserslist (في [[package.json]]) بيقول لأدوات الـ build (autoprefixer و Lightning CSS و Babel وغيرهم) إنت بتدعم أنهي متصفحات، فيضيفوا fallbacks على قدها.`,
          example: R`.card { background: white; }
@supports (background: color-mix(in oklch, red, blue)) {
  .card { background: color-mix(in oklch, var(--color-brand) 8%, white); }
}
@supports not selector(:has(a)) {
  .has-fallback { display: block; }
}
if (CSS.supports('anchor-name', '--x')) document.documentElement.classList.add('has-anchor');
// package.json
"browserslist": ["baseline widely available"]`,
          try: R`في أي فولدر فيه Node شغّل [[npx browserslist "baseline widely available"]] و [[npx browserslist --coverage "baseline widely available"]] و [[npx browserslist "defaults"]]. وبعدين افتح MDN لـ [[text-wrap]] و [[:has()]] وبص على علامة Baseline فوق كل صفحة.`,
          flag: "script",
          deep: {
            why: R`كل شهر فيه ميزة CSS جديدة، وسؤال «أستخدمها في الشغل؟» كان محتاج تفتح caniuse وتحسب نسب. Baseline بتدّيك إجابة سريعة، و @supports بيخليك تستخدم الجديد النهارده من غير ما تكسر القديم. ودا بيتسأل في الانترفيو: «بتتعامل إزاي مع ميزة مش مدعومة في كل المتصفحات؟»`,
            how: R`progressive enhancement: اكتب الأساس اللي شغال في كل حتة الأول (خلفية بيضا)، وبعدين جوه [[@supports]] التحسين. المتصفح اللي مش فاهم الشرط بيتجاهل البلوك كله. و [[selector()]] جوه @supports بيسأل عن selector (زي [[:has()]]). و [[not]] للـ fallback.

في CSS أصلًا المتصفح بيتجاهل أي خاصية مش فاهمها، فكتير كفاية تكتب السطرين ورا بعض: [[color: red; color: oklch(...)]] والقديم ياخد الأول والجديد ياخد التاني. @supports بتحتاجها لما التحسين محتاج أكتر من خاصية أو بيغيّر الـ layout.

browserslist بيقبل queries زي [[defaults]] (أكتر من 0.5% استخدام وآخر نسختين ومتصفحات مش ميتة)، و [[baseline widely available]]، و [[baseline 2024]]. البيانات جاية من caniuse-lite، فحدّثها كل فترة بـ [[npx update-browserslist-db@latest]].

و Vite من نسخة 7 الـ build target الافتراضي بتاعه [[baseline-widely-available]]. و Tailwind v4 نفسه مبني على CSS حديث (cascade layers و [[@property]] و [[color-mix]])، فمحتاج متصفحات حديثة (Safari 16.4 و Chrome 111 و Firefox 128 تقريبًا وطالع)، ولو لازم تدعم أقدم من كده خليك على v3.`,
            when: R`قبل ما تستخدم أي ميزة CSS أو JavaScript جديدة في مشروع حقيقي: Widely available استخدمها عادي. Newly available استخدمها كتحسين مع fallback. لسه مش Baseline: @supports أو استنى. وحط browserslist في أول المشروع عشان كل الأدوات تتفق.`,
            mistakes: R`تستخدم ميزة لأنها شغالة في Chrome عندك (نص مستخدمين الموبايل في مصر وغيرها على Safari أو متصفحات قديمة). @supports على حاجة كل المتصفحات بتدعمها (كود زيادة على الفاضي). تنسى تحدّث caniuse-lite فالـ build يستهدف متصفحات قديمة. تكتب الـ fallback بعد الجديد (الترتيب مهم: الأساس الأول). وتفتكر إن autoprefixer بيضيف الميزة نفسها: هو بيضيف prefixes بس، مش polyfills.`
          },
          teach: R`## ٣ أدوات لسؤال واحد: «الميزة دي أستخدمها؟»

| الأداة | بتسأل مين | إمتى |
|---|---|---|
| Baseline و caniuse | بيانات عن كل المتصفحات | قبل ما تكتب الكود |
| [[@supports]] و [[CSS.supports()]] | المتصفح اللي فاتح الصفحة دلوقتي | وقت التشغيل |
| browserslist | أدوات الـ build | وقت الـ build |

المثال فيه الـ ٣. شغّلنا الـ CSS والـ JavaScript في Chrome 154 (headless عن طريق playwright)، و browserslist 4.29.3 من الترمنال (بيانات caniuse-lite نسخة 1.0.30001814).

---

## ١. [[.card { background: white; }]]: الأساس الأول

ده السطر اللي **أي** متصفح فاهمه. بيتكتب الأول، عشان المتصفح القديم ياخده ويقف.

## ٢. [[@supports (background: color-mix(in oklch, red, blue)) { ... }]]

[[@supports]] بيسأل المتصفح: «انت فاهم الخاصية دي بالقيمة دي؟». لو أيوه بيطبّق اللي جوه الأقواس، لو لأ بيتجاهل البلوك كله.

والسؤال هنا عن [[color-mix()]]: دالة بتخلط لونين. جوه البلوك:

~~~text styles.css
.card { background: color-mix(in oklch, var(--color-brand) 8%, white); }
~~~

| الحتة | معناها |
|---|---|
| [[in oklch]] | اخلط في مساحة ألوان اسمها oklch (الخلط فيها شكله طبيعي للعين) |
| [[var(--color-brand) 8%]] | 8% من لون البراند |
| [[white]] | والباقي (92%) أبيض |

في التجربة لون البراند أزرق، والخلفية المحسوبة طلعت:

~~~text getComputedStyle(.card).backgroundColor
oklch(0.963685 0.0172613 262.885)
~~~

يعني أبيض فيه لمسة زرقا خفيفة: الـ [[0.96]] إضاءة عالية جدًا، و [[0.017]] تشبّع قليل، و [[262]] درجة اللون (أزرق). والمتصفح اللي مش بيدعم [[color-mix]] كان هياخد [[white]] من السطر الأول.

## ٣. [[@supports not selector(:has(a)) { .has-fallback { display: block; } }]]

- [[selector(...)]]: السؤال هنا عن **selector** مش خاصية: «انت فاهم [[:has()]]؟».
- [[not]]: اعكس السؤال: البلوك يتطبق بس لو المتصفح **مش** فاهم.

فده الـ fallback: يظهر بس في المتصفحات القديمة. في Chrome 154 [[:has()]] مدعوم، فالبلوك اتجاهل والـ display فضل [[none]] (اللي حطيناه للعنصر برا).

## ٤. [[if (CSS.supports('anchor-name', '--x')) document.documentElement.classList.add('has-anchor');]]

نفس السؤال من JavaScript:

- [[CSS.supports('anchor-name', '--x')]]: اسم الخاصية وقيمة ليها. [[anchor-name]] من ميزة anchor positioning، وقيمتها لازم تبدأ بـ [[--]].
- [[document.documentElement]]: عنصر [[<html>]]، و [[classList.add]] بيضيف له كلاس.

~~~text الناتج في Chrome 154
CSS.supports('anchor-name', '--x')   → true
CSS.supports('anchor-name', 'x')     → false   (قيمة غلط)
<html class="has-anchor">
~~~

السطر التاني بيوضح إن السؤال عن الخاصية **والقيمة** مع بعض. وبعد كده في CSS تقدر تكتب [[.has-anchor .tooltip { ... }]].

## ٥. ليه ساعات مش محتاج [[@supports]] خالص

المتصفح بيتجاهل أي سطر مش فاهمه ويكمّل. جرّبنا:

~~~text styles.css
.x { color: red; color: oklch(0.6 0.2 30); width: 10px; width: foo(1); }
~~~

Chrome طلّع اللون [[oklch(0.6 0.2 30)]] (فهم التاني فكسب)، والعرض [[10px]] (مفهمش [[foo(1)]] فرجع للي قبله). فلو التحسين خاصية واحدة، سطرين ورا بعض كفاية. [[@supports]] لما التحسين أكتر من خاصية أو بيغيّر الـ layout.

---

## ٦. browserslist في [[package.json]]

~~~json
"browserslist": ["baseline widely available"]
~~~

ده سطر في ملف إعدادات المشروع بيقول لكل أدوات الـ build (Vite و autoprefixer و Babel وغيرهم) «أنا بدعم المتصفحات دي». و [[baseline widely available]] = كل نسخة متصفح فيها الميزات اللي بقالها 30 شهر أو أكتر في كل المتصفحات الأساسية.

جرّب تشوف اللستة دي بنفسك (شغّلناها في PowerShell على ويندوز):

~~~powershell
npx browserslist "baseline widely available"
npx browserslist --coverage "baseline widely available"
~~~

~~~text الناتج (مختصر)
and_chr 154
and_ff 157
chrome 154
...
chrome 123
...
firefox 124
...
safari 17.4
These browsers account for 87.4% of all users globally
~~~

- [[npx]] بيشغّل أداة من npm من غير ما تتسطب global.
- الأسامي: [[and_chr]] كروم أندرويد، و [[ios_saf]] سفاري الآيفون.
- اللستة طلعت 134 نسخة، أقدمها Chrome و Edge 123 و Firefox 124 و Safari 17.4.
- [[--coverage]]: نسبة المستخدمين اللي عندهم النسخ دي، بيانات caniuse.

وقارن بـ [[defaults]]:

~~~powershell
npx browserslist "defaults"
~~~

طلع 35 نسخة بس، بس فيها [[chrome 109]] و [[op_mini all]] (Opera Mini) و [[kaios 2.5]]. ليه؟ [[defaults]] مبني على **نسبة الاستخدام** (أكتر من 0.5% وآخر نسختين)، مش على الميزات، فبيجيب نسخ قديمة لسه ناس كتير عليها.

> الأرقام دي بتتغير مع كل نسخة من caniuse-lite. حدّثها بـ [[npx update-browserslist-db@latest]].

---

## الخلاصة

| الحالة في MDN | تعمل إيه |
|---|---|
| Widely available | استخدمها عادي |
| Newly available | استخدمها كتحسين، والأساس قبلها |
| مش Baseline | [[@supports]] أو استنى |

- الترتيب مهم: الأساس الأول، والجديد بعده أو جوه [[@supports]].
- autoprefixer بيضيف prefixes بس، مش بيعمل الميزة في المتصفح اللي معندوش.`,
          lines: [
            "الأساس: شغال في كل المتصفحات.",
            R`لو المتصفح بيدعم [[color-mix]]...`,
            "...خلفية فيها لمسة خفيفة من لون البراند.",
            "قفلة.",
            R`لو المتصفح مش بيدعم [[:has()]]...`,
            "...اعرض الـ fallback.",
            "قفلة.",
            R`نفس السؤال من JavaScript: لو بيدعم anchor positioning علّم الـ html بكلاس.`,
            "الأدوات كلها تستهدف المتصفحات اللي فيها الميزات المنتشرة من 30 شهر أو أكتر."
          ],
          sol: R`وقت كتابة الدرس (بيانات caniuse-lite في سبتمبر 2026)، [[baseline widely available]] طلّع 133 نسخة متصفح، أقدمها تقريبًا Chrome 123 و Firefox 124 و Safari 17.4، و [[--coverage]] قال إنهم حوالي 87% من المستخدمين في العالم. الأرقام عندك هتختلف حسب نسخة البيانات، ودا الطبيعي.

[[defaults]] بيطلّع لستة مختلفة: فيها متصفحات أقدم بكتير (زي Chrome 109 و Opera Mini) لأنه مبني على نسبة الاستخدام مش على الميزات.

في MDN: [[:has()]] عليه Baseline (متاح في كل المتصفحات الأساسية)، و [[text-wrap]] ممكن تلاقي قيمه مختلفة الحالة (balance منتشرة، و pretty لسه مش في كل حتة). ودا بالظبط المكان اللي تقرر منه: balance استخدمها عادي، و pretty كتحسين.`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتسأل في أي انترفيو frontend، بإجابة تقولها بصوتك في دقيقة",
      items: [
        {
          cmd: "4 طبقات و box-sizing",
          title: "اشرح الـ box model (Explain the CSS box model)",
          desc: R`كل عنصر صندوق من 4 طبقات من جوه لبرا: content و padding و border و margin. الـ width الافتراضي (content-box) بيحدد المحتوى بس، فالـ padding والـ border بيتزودوا عليه. مع [[border-box]] الـ width بيبقى العرض الكامل شامل الـ padding والـ border، ودا اللي بنحطه على كل حاجة في أي مشروع (و Tailwind بيعمله في الـ Preflight). الـ margin برا الحساب في الحالتين، والـ margin الرأسي بين عنصرين block بيعمل collapse: الأكبر بس اللي بيفضل.`,
          example: R`.box { width: 200px; padding: 20px; border: 5px solid; }
.box { box-sizing: content-box; }
.box { box-sizing: border-box; }`,
          try: R`افتح DevTools › Computed على أي عنصر، واشرح الأرقام اللي في رسمة الصندوق بصوت عالي كأنك في انترفيو.`,
          flag: "script",
          deep: {
            why: "سؤال أساسي بيختبر إنك فاهم ليه الحاجات بتطلع أعرض من المتوقع، وإنك مش بتحل كل حاجة بالتجربة.",
            how: "لو عايز تتميز: margin collapse مش بيحصل جوه flex و grid ولا في الاتجاه الأفقي، والـ padding بالنسبة المئوية بيتحسب من عرض الأب حتى الرأسي، والعناصر الـ inline بتتجاهل width و height والـ margin الرأسي.",
            when: R`أسئلة المتابعة: «إيه الـ margin collapse وإمتى مبيحصلش؟» و «inline و block و inline-block الفرق؟» و «[[width: 100%]] مع padding ليه بيعمل scroll أفقي؟».`,
            mistakes: "«الـ margin جزء من العرض». أو «border-box بيشيل الـ padding». أو نسيان إن الافتراضي content-box مش border-box."
          },
          teach: R`## السؤال: العنصر ده عرضه كام على الشاشة؟

المثال صندوق واحد بـ 3 أرقام، وسطرين بيغيّروا طريقة حسابه. السطر التاني والتالت **بدايل لبعض**، مش بيتكتبوا مع بعض. جرّبنا كل واحد على صندوق لوحده في Chrome 154 (headless عن طريق playwright)، وزوّدنا [[margin: 30px]] عشان نشوف هو بيتحسب ولا لأ.

---

## ١. الطبقات الأربعة من جوه لبرا

~~~text الصندوق
margin    مسافة برا العنصر، بينه وبين اللي جنبه (شفافة)
border    الإطار
padding   مسافة جوه الإطار، حوالين الكلام
content   الكلام نفسه
~~~

## ٢. [[.box { width: 200px; padding: 20px; border: 5px solid; }]]

- [[width: 200px]]: العرض. بس عرض **إيه** بالظبط؟ ده اللي السطرين الجايين بيحددوه.
- [[padding: 20px]]: رقم واحد = نفس المسافة من الأربع جهات، يعني 20 يمين و 20 شمال.
- [[border: 5px solid]]: إطار سمكه 5 ومصمت ([[solid]]). من غير لون بياخد لون الكلام.

## ٣. [[box-sizing: content-box]]: الافتراضي

[[box-sizing]] بتقول الـ [[width]] بيقيس لحد فين. [[content-box]] = الكلام بس، فالـ padding والـ border بيتزودوا عليه:

~~~text الحساب
200 (content) + 20 + 20 (padding) + 5 + 5 (border) = 250
~~~

~~~text اللي Chrome قاسه
box-sizing:     content-box
width في CSS:   200px
offsetWidth:    250   (لحد الـ border)
clientWidth:    240   (من غير الـ border)
~~~

و [[box-sizing]] بتاع [[<body>]] من غير أي CSS طلع [[content-box]]: ده الافتراضي فعلًا.

## ٤. [[box-sizing: border-box]]: اللي كل المشاريع بتحطه

[[border-box]] = الـ [[width]] بيقيس لحد الـ border، فالمحتوى هو اللي بيصغر:

~~~text الحساب
200 - 40 (padding) - 10 (border) = 150 للمحتوى
~~~

~~~text اللي Chrome قاسه
offsetWidth:    200
clientWidth:    190
المحتوى:        150
~~~

والـ margin ([[30px]]) فضل برا الحساب في الحالتين: مش داخل في [[offsetWidth]] ولا في الـ 200.

| | [[content-box]] | [[border-box]] |
|---|---|---|
| الـ 200 بتقيس | المحتوى بس | لحد الـ border |
| العرض على الشاشة | 250 | 200 |
| المحتوى | 200 | 150 |
| الـ margin | برا | برا |

ليه كل المشاريع (و Tailwind في الـ Preflight) بتحط [[border-box]] على كل حاجة؟ عشان [[width: 50%]] مع padding يفضل 50% فعلًا، مش أعرض.

## ٥. نقطة تزوّد بيها الإجابة: margin collapse

عنصرين block تحت بعض، الأول [[margin-bottom: 30px]] والتاني [[margin-top: 20px]]:

| الأب | المسافة بينهم |
|---|---|
| عادي (block) | 30 (الأكبر بس) |
| [[display: flex]] عمودي | 50 (المجموع) |

ده الـ margin collapse: الـ margin الرأسي بين عنصرين block بيتدمج ويفضل الأكبر، وده مش بيحصل جوه flex ولا grid.

---

## الخلاصة

- الترتيب من جوه لبرا: content ثم padding ثم border ثم margin.
- [[content-box]] (الافتراضي): العرض الظاهر = width + padding + border.
- [[border-box]]: العرض الظاهر = width، والمحتوى بيصغر.
- الـ margin عمره ما بيدخل في العرض.`,
          lines: [
            "صندوق بعرض 200 و padding 20 و border 5.",
            "content-box: العرض الظاهر 200 + 40 + 10 = 250.",
            "border-box: العرض الظاهر 200، والمحتوى 150."
          ],
          sol: R`إجابة نموذجية على [[.box]] في المثال: «الرسمة فيها 4 طبقات من جوه لبرا: content، وبعدين padding، وبعدين border، وبعدين margin. مع [[content-box]] (الافتراضي) الـ 200 دي عرض المحتوى بس، فالعنصر على الشاشة 200 + 20×2 + 5×2 = 250px. مع [[border-box]] الـ 200 هي العرض الكلي لحد الـ border، فالمحتوى بيصغر لـ 200 − 40 − 10 = 150px. الـ margin برا الحساب في الحالتين، وهو مسافة بيني وبين اللي جنبي مش جزء من العنصر.»

نقط تزوّد بيها الإجابة: إن كل المشاريع الحديثة (و Tailwind في الـ preflight) بتعمل [[*, ::before, ::after { box-sizing: border-box }]] لأن الحساب بيبقى أسهل مع [[width: 50%]] و padding. وإن الـ margin الرأسي بين عنصرين block بيعمل collapse (بياخد الأكبر مش المجموع)، وده مش بيحصل جوه flex ولا grid. وإن [[offsetWidth]] بيرجع العرض لحد الـ border، و [[clientWidth]] من غير الـ border.

الغلط اللي يوقعك: تقول إن الـ margin داخل في الـ width مع border-box، أو تنسى الـ border في الحساب وتقول 240.`
        },
        {
          cmd: "(id, class, type)",
          title: "إزاي المتصفح بيقرر أنهي قاعدة تكسب؟ (How does CSS specificity work?)",
          desc: R`لما قاعدتين بيغيّروا نفس الخاصية على نفس العنصر، المتصفح بيبص الأول على [[!important]]، وبعدين الـ inline style، وبعدين الـ cascade layers، وبعدين الـ specificity، وآخر حاجة الترتيب في الكود. الـ specificity تلات خانات: عدد الـ ids، وبعدين الـ classes والـ attributes والـ pseudo-classes، وبعدين أنواع العناصر والـ pseudo-elements. بتتقارن خانة خانة، فـ id واحد يغلب أي عدد classes. و [[:where()]] وزنها صفر، والوراثة ملهاش وزن خالص.`,
          example: R`nav a { color: gray; }
.link { color: blue; }
nav .link:hover { color: navy; }
:where(nav) .link { color: teal; }`,
          try: R`اكتب 5 selectors على ورقة واحسب الـ specificity بتاعتهم، وبعدين اتأكد بإنك تقف عليهم في DevTools › Styles.`,
          flag: "script",
          deep: {
            why: "بيتسأل عشان يعرف هل بتفهم ليه CSS بيتصرف كده، ولا بتحط !important لحد ما يشتغل.",
            how: R`لو عايز تتميز: اذكر إن Tailwind v4 بيستخدم cascade layers، وإن أي CSS برا layer بيغلب الـ utilities مهما كانت الـ specificity. واذكر إن [[:is()]] و [[:not()]] و [[:has()]] وزنهم = أتقل حاجة جواهم.`,
            when: R`أسئلة المتابعة: «!important بيتعامل إزاي؟» و «إيه الـ cascade layers؟» و «[[:is()]] وزنها كام؟» و «إزاي تتجنب حروب الـ specificity في مشروع كبير؟» (BEM، أو utility-first، أو layers).`,
            mistakes: "«اللي مكتوب آخر بيكسب» على طول (ده آخر معيار بس). «11 class تغلب id» (لأ، الخانات مش بتتحوّل). «الـ inline style مينفعش يتغلب» (!important بيغلبه)."
          },
          teach: R`## ٤ قواعد على نفس اللينك، مين يكسب؟

الـ 4 سطور كلهم بيغيّروا [[color]] لنفس العنصر: لينك [[<a class="link">]] جوه [[<nav>]]. حطيناهم في صفحة في Chrome 154 (headless عن طريق playwright)، وطلّعنا الـ specificity بتاعة كل selector من الـ DevTools Protocol (نفس الرقم اللي بيظهر لما تقف على الـ selector في DevTools › Styles).

---

## ١. الـ specificity: ٣ خانات

~~~text (A, B, C)
A  عدد الـ ids                          #main
B  الـ classes والـ attributes والـ pseudo-classes   .link  [href]  :hover
C  أنواع العناصر والـ pseudo-elements    nav  a  ::after
~~~

بتتقارن خانة خانة من الشمال: اللي A بتاعه أكبر يكسب على طول، ولو اتعادلوا نبص على B، وبعدين C. والخانات مبتفيضش على بعض: 11 class مش بيعملوا id.

## ٢. نحسب الأربعة

| السطر | الـ selector | الحساب | اللي Chrome قاله |
|---|---|---|---|
| ١ | [[nav a]] | نوعين (nav و a) | (0,0,2) |
| ٢ | [[.link]] | class واحد | (0,1,0) |
| ٣ | [[nav .link:hover]] | نوع + class + pseudo-class | (0,2,1) |
| ٤ | [[:where(nav) .link]] | [[:where()]] صفر + class | (0,1,0) |

- المسافة بين حتتين في الـ selector (زي [[nav a]]) معناها «جوه»: أي a جوه nav. وهي نفسها ملهاش وزن.
- [[:hover]] pseudo-class (حالة: الماوس فوقه)، فبيتعد في خانة B زي الـ class، مش C.
- [[:where(...)]] بيطابق اللي جواه بس **وزنه صفر دايمًا**. عشان كده Chrome عرض مكوّنات السطر الرابع [[.link]] بس.

## ٣. اللي حصل فعلًا

~~~text getComputedStyle(.link).color
من غير hover:          rgb(0, 128, 128)   teal
والماوس فوقه:          rgb(0, 0, 128)     navy
لو مسحنا السطر الرابع:  rgb(0, 0, 255)     blue
~~~

نمشي ورا المتصفح:

1. **من غير hover**: السطر ٣ مش منطبق أصلًا. الباقيين: (0,0,2) و (0,1,0) و (0,1,0). الـ (0,0,2) خسر (B عنده 0). السطرين ٢ و ٤ متعادلين، فاللي **جاي آخر في الملف** يكسب: السطر ٤، teal.
2. **مع hover**: السطر ٣ (0,2,1) أكبر من الكل في خانة B، navy.
3. **من غير السطر ٤**: [[.link]] لوحده (0,1,0) غلب [[nav a]] (0,0,2)، blue.

## ٤. أمثلة زيادة طلّعناها من نفس الصفحة

| الـ selector | Chrome | ليه |
|---|---|---|
| [[#main .link::after]] | (1,1,1) | id + class + pseudo-element (خانة C) |
| [[:is(#main, nav) .link]] | (1,1,0) | [[:is()]] بياخد وزن **أتقل** حاجة جواه (#main) |

ده الفرق بين [[:is()]] و [[:where()]]: نفس الشغل، بس [[:where()]] صفر و [[:is()]] أتقل اللي جواه. والمكتبات بتستخدم [[:where()]] عشان تسهّل عليك تغطّي على الستايل بتاعها بكلاس واحد.

## ٥. الـ specificity مش أول حاجة

قبلها المتصفح بيبص على حاجات أهم بالترتيب ده:

1. [[!important]].
2. الـ inline style ([[style="..."]] على العنصر).
3. الـ cascade layers ([[@layer]]): أي قاعدة برا layer بتغلب أي قاعدة جوه layer، مهما كانت الـ specificity. ودا بيفرق مع Tailwind v4 لأن الـ utilities بتاعته جوه [[@layer utilities]].
4. الـ specificity.
5. الترتيب في الملف.

والوراثة (اللون اللي جاي من الأب) أضعف من أي قاعدة على العنصر نفسه، حتى [[*]].

---

## الخلاصة

- ٣ خانات (id، class/attribute/pseudo-class، type/pseudo-element) بتتقارن من الشمال.
- [[:hover]] و [[[type]]] في خانة الـ class، و [[::after]] في خانة الـ type.
- [[:where()]] صفر، و [[:is()]] و [[:not()]] و [[:has()]] أتقل حاجة جواهم.
- التعادل؟ اللي جاي آخر يكسب.`,
          lines: [
            "(0,0,2).",
            "(0,1,0): بتغلب اللي فوق.",
            "(0,2,1): class و pseudo-class ونوع.",
            R`(0,1,0): الـ where صفر، فزي [[.link]] بالظبط، والترتيب هو اللي يحسم.`
          ],
          sol: R`مثال محلول لـ 5 selectors (والأرقام دي بالظبط اللي DevTools بيظهرها لما تقف عليهم): [[nav a]] ‏(0,0,2)، و [[.link]] ‏(0,1,0)، و [[nav .link:hover]] ‏(0,2,1) لأن [[:hover]] pseudo-class بيتحسب زي الكلاس، و [[:where(nav) .link]] ‏(0,1,0) لأن [[:where]] بيصفّر اللي جواه، و [[#main .link::after]] ‏(1,1,1) لأن الـ pseudo-element بيتحسب زي الـ type.

الإجابة اللي تقولها: «المتصفح بيقارن 3 خانات بالترتيب (id، class/attribute/pseudo-class، type/pseudo-element)، زي رقم من 3 خانات من غير ما واحدة تفيض على التانية؛ 11 كلاس عمرهم ما يغلبوا id واحد. لو اتعادلوا، اللي جاي آخر في الملف يكسب. والـ inline style أقوى منهم كلهم، و [[!important]] بيقلب اللعبة. وقبل الـ specificity أصلًا بيبص على الـ origin والـ [[@layer]]: القاعدة اللي برا layer بتكسب أي قاعدة جوه layer.» وزوّد: [[:is()]] و [[:not()]] بياخدوا specificity أقوى حاجة جواهم، و [[:where()]] صفر، وده بيستخدم في المكتبات عشان تسهّل عليك تغطي عليها.

الغلط الشائع في الحساب: تعد [[:hover]] أو [[[type="email"]]] كـ type (هما خانة الكلاس)، أو تعد [[*]] و [[>]] (قيمتهم صفر).`
        },
        {
          cmd: "بُعد واحد وبُعدين",
          title: "إمتى تستخدم flex وإمتى grid؟ (Flexbox vs Grid)",
          desc: R`Flexbox للـ layout في بُعد واحد: صف أو عمود، والعناصر نفسها بتحدد حجمها، والمساحة بتتوزع حسب محتواها. Grid للـ layout في بُعدين: بتعرّف الصفوف والأعمدة من الأب، والعناصر بتتحط في الخانات، فالأعمدة بتفضل متصفة في كل الصفوف. عمليًا: flex للمكونات (navbar، وأيقونة جنب كلام، وزراير)، و grid للـ layout (الصفحة، وشبكة كروت، وفورم بعمودين). وغالبًا بستخدمهم مع بعض: grid للهيكل و flex جوه كل خانة.`,
          example: R`.nav { display: flex; justify-content: space-between; align-items: center; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }`,
          try: R`اعمل نفس شبكة الكروت مرة بـ [[flex-wrap]] ومرة بـ grid بـ 5 كروت، وشوف الفرق في الكارت الأخير. دي أحسن إجابة عملية تقولها.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار الأداة حسب المشكلة، مش حسب العادة.",
            how: R`لو عايز تتميز: flex «content-out» (المحتوى بيحدد المقاسات)، و grid «layout-in» (الأب بيحدد والمحتوى بيتحط). واذكر [[subgrid]] لما عايز كروت جوه grid عناوينها وأزرارها متصفة.`,
            when: R`أسئلة المتابعة: «ليه آخر سطر في كروت flex-wrap شكله غريب؟» و «إيه الفرق بين auto-fit و auto-fill؟» و «ليه [[flex: 1]] مش بيوزّع بالتساوي ساعات؟» (المحتوى و min-width: auto).`,
            mistakes: "«grid أحدث فهو أحسن»، أو «flex للموبايل و grid للديسكتوب». الاتنين مش بديل لبعض، والإجابة لازم تبقى عن الأبعاد ومين بيتحكم في المقاسات: المحتوى ولا الأب."
          },
          teach: R`## سطرين، وكل سطر مثال على واحد فيهم

السطر الأول navbar بـ flex (صف واحد)، والتاني شبكة كروت بـ grid (صفوف وأعمدة). حطينا الاتنين في صفحة عرضها 1200px في Chrome 154 (headless عن طريق playwright) وقسنا مكان كل عنصر.

---

## ١. [[.nav { display: flex; justify-content: space-between; align-items: center; }]]

| الخاصية | معناها |
|---|---|
| [[display: flex]] | الأولاد جنب بعض في صف (بُعد واحد) |
| [[justify-content: space-between]] | على **طول الصف**: الأول في أول الصف، والأخير في آخره، والفاضي يتوزع بينهم |
| [[align-items: center]] | على **العرض التاني** (الرأسي هنا): كل واحد في النص |

حطينا جوه nav ارتفاعه 60 لوجو (ارتفاعه 20) ولينكات وزرار (ارتفاعه 40):

~~~text getBoundingClientRect
لوجو:     left 0      top 20   ارتفاع 20
لينكات:   left 577    top 21   ارتفاع 18
دخول:     left 1160   top 10   ارتفاع 40
~~~

- [[space-between]]: اللوجو على الحافة (0)، والزرار لازق في الآخر (1160 + عرضه 40 = 1200)، واللينكات في النص.
- [[center]]: كل واحد [[top]] بتاعه = (60 − ارتفاعه) ÷ 2. اللوجو (60 − 20) ÷ 2 = 20، والزرار (60 − 40) ÷ 2 = 10.

كل عنصر أخد المقاس اللي محتواه محتاجه، والـ flex وزّع **الفاضي** بس. ده معنى «المحتوى بيحدد».

## ٢. [[.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }]]

الحتة الطويلة نفكّها من جوه لبرا:

### [[1fr]]

[[fr]] = fraction، جزء من المساحة الفاضية. كل الأعمدة [[1fr]] يعني بيقسموا الفاضي بالتساوي.

### [[minmax(250px, 1fr)]]

العمود عمره ما يصغر عن 250px، ويكبر لحد [[1fr]].

### [[repeat(auto-fit, ...)]]

[[repeat]] بيكرر نفس العمود. و [[auto-fit]] بدل رقم: «حط أكبر عدد أعمدة يساع». على 1200 مع [[gap: 1rem]] (16px):

~~~text الحساب
كام عمود 250 + 16 بيساعوا في 1200 + 16؟   1216 ÷ 266 = 4.57 → 4
عرض كل عمود: (1200 − 3 × 16) ÷ 4 = 288
~~~

~~~text getComputedStyle(.cards).gridTemplateColumns
288px 288px 288px 288px
~~~

الأعمدة اتحددت **على الأب** قبل ما الكروت تتحط فيها. ده معنى «الأب بيحدد».

---

## ٣. التجربة اللي بتفرق: ٥ كروت

نفس الـ 5 كروت مرة بالـ grid اللي فوق، ومرة بـ flex: [[flex-wrap: wrap; gap: 1rem]] وكل كارت [[flex: 1 1 250px]] (يكبر، ويصغر، ويبدأ من 250):

| الكارت | grid: العرض @ (x, y) | flex-wrap: العرض @ (x, y) |
|---|---|---|
| 1 | 288 @ (0, 0) | 288 @ (0, 0) |
| 2 | 288 @ (304, 0) | 288 @ (304, 0) |
| 3 | 288 @ (608, 0) | 288 @ (608, 0) |
| 4 | 288 @ (912, 0) | 288 @ (912, 0) |
| 5 | **288** @ (0, 34) | **1200** @ (0, 34) |

أول سطر متطابق. الفرق في الخامس:

- **flex**: كل سطر بيوزّع المساحة على عناصره **لوحده**. السطر التاني فيه كارت واحد، فـ [[flex-grow: 1]] مطّه على السطر كله: 1200.
- **grid**: الأعمدة متعرّفة على الأب، فالخامس قعد في العمود الأول بنفس العرض (288) والباقي فاضي.

## ٤. سؤال المتابعة: [[auto-fit]] ولا [[auto-fill]]؟

نفس السطر بكارتين بس:

| | الكروت | الأعمدة |
|---|---|---|
| [[auto-fit]] | 592 و 592 | الأعمدة الفاضية اتشالت، فالكارتين اتمطوا |
| [[auto-fill]] | 288 و 288 | [[288px 288px 288px 288px]]: الأعمدة الفاضية فضلت محجوزة |

---

## الخلاصة

| | flex | grid |
|---|---|---|
| الأبعاد | واحد (صف أو عمود) | اتنين |
| مين بيحدد المقاس | المحتوى | الأب |
| آخر سطر في الكروت | بيتمط | بيفضل في العمود |
| مثال | navbar، زراير، أيقونة وكلام | شبكة كروت، layout الصفحة، فورم |

- الاتنين مع بعض عادي: grid للهيكل و flex جوه كل كارت.`,
          lines: [
            "flex: عناصر في صف، والمسافة بينهم.",
            "grid: شبكة أعمدة متساوية بتتأقلم مع العرض."
          ],
          sol: R`اللي هتشوفه بـ 5 كروت على شاشة تساع 4: مع [[flex-wrap]] و [[flex: 1 1 250px]] أول 4 في سطر، والخامس لوحده في السطر التاني وممطوط بعرض الشاشة كلها (قست ده على 1200px: الأربعة 288px والخامس 1200px). مع grid بـ [[repeat(auto-fit, minmax(250px, 1fr))]] الخامس بنفس عرض الباقيين وتحت الأول بالظبط، والباقي من السطر فاضي.

الإجابة النموذجية: «flex بيفكّر في بُعد واحد: كل سطر بيوزّع المساحة على عناصره لوحده ومش عارف حاجة عن السطر اللي تحته، عشان كده الأخير بيتمط. grid بيفكّر في بُعدين: الأعمدة متعرّفة على الأب، فكل العناصر بترص على نفس الخطوط. بستخدم flex لما المحتوى هو اللي يحدد المقاس (nav، أزرار جنب بعض، سطر صورة واسم وزرار)، و grid لما الـ layout هو اللي يحدد (شبكة كروت، layout الصفحة، فورم بـ label وinput متراصين).»

ونقطة زيادة: الاتنين مش بديل لبعض، وكتير بتلاقي grid للصفحة و flex جوه كل كارت. ولو حد قالك «flex للحاجات الصغيرة و grid للكبيرة» ده مش دقيق؛ المعيار بُعد واحد ولا اتنين.`
        },
        {
          cmd: "containing block",
          title: "إيه الفرق بين قيم position الخمسة؟",
          desc: R`[[static]] الافتراضي: العنصر في الـ flow و top و left ملهمش تأثير. [[relative]] في الـ flow ومكانه محجوز، وبيتزق بصريًا بس، وبيبقى مرجع لأولاده الـ absolute. [[absolute]] بيطلع من الـ flow ومكانه بيتحسب من أقرب جد positioned. [[fixed]] بيطلع من الـ flow ومكانه من الشاشة، فبيفضل ثابت مع الـ scroll. [[sticky]] بيتصرف relative لحد ما يوصل للحد اللي حددته ([[top: 0]]) وبعدين يلزق، جوه حدود أبوه بس.`,
          example: R`.parent { position: relative; }
.badge { position: absolute; top: 0; inset-inline-end: 0; }
.header { position: sticky; top: 0; }`,
          try: R`اعمل الـ 5 قيم على 5 مربعات في صفحة طويلة واعمل scroll، واشرح اللي بيحصل لكل واحد.`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل «العنصر راح فين؟» و «ليه الهيدر مش ثابت؟» سببها position، فبيتسأل كتير.",
            how: R`لو عايز تتميز: الـ containing block بتاع absolute هو أقرب جد positioned، بس [[transform]] أو [[filter]] على أي جد بيعمل containing block برضه، حتى للـ fixed. ودا سبب إن مودال fixed جوه عنصر متحرك بيتحبس، والحل portal.`,
            when: R`أسئلة المتابعة: «ليه الـ sticky مش شغال؟» (overflow على جد، أو مفيش top، أو الأب قد العنصر بالظبط). «ليه fixed جوه عنصر عليه transform بيتصرف غلط؟» و «z-index بيشتغل على مين؟».`,
            mistakes: "«absolute بيتحسب من الأب» (من أقرب جد positioned، مش الأب المباشر بالضرورة). «fixed دايمًا من الشاشة» (إلا لو جد عليه transform أو filter). ونسيان sticky خالص."
          },
          teach: R`## الكلمة اللي الإجابة بتلف حواليها: containing block

الـ containing block هو «المستطيل اللي العنصر بيتحسب مكانه منه»: [[top: 0]] يعني صفر من فوق **إيه** بالظبط؟ المثال ٣ سطور بيستخدموا [[relative]] و [[absolute]] و [[sticky]]، وجرّبنا الخمس قيم في صفحة طويلة في Chrome 154 (headless عن طريق playwright)، وقسنا مكان كل عنصر من فوق الشاشة قبل الـ scroll وبعد scroll بـ 400px.

---

## ١. [[.parent { position: relative; }]]

[[relative]] لوحده من غير [[top]] ولا [[left]] مش بيحرّك الأب خالص. ليه موجود؟ عشان أي عنصر [[position]] بتاعه أي حاجة غير [[static]] اسمه **positioned**، والـ absolute بيدوّر على أقرب جد positioned يتحسب منه. يعني السطر ده معناه: «أنا المرجع لأولادي الـ absolute».

## ٢. [[.badge { position: absolute; top: 0; inset-inline-end: 0; }]]

- [[absolute]]: الشارة خرجت من الـ flow (مبقاش ليها مكان محجوز)، ومكانها بالأرقام من الـ containing block (الأب اللي فوق).
- [[top: 0]]: لازقة في أول الأب من فوق.
- [[inset-inline-end: 0]]: لازقة في **آخر** السطر. [[inset]] اسم مجمّع لـ top و right و bottom و left، و [[inline-end]] = آخر اتجاه الكتابة.

أب عرضه 300 وشارة 20 × 20:

| الصفحة | بُعد الشارة من فوق الأب | من شمال الأب | من يمين الأب |
|---|---|---|---|
| [[dir="ltr"]] | 0 | 280 | 0 (في الركن اليمين) |
| [[dir="rtl"]] | 0 | 0 (في الركن الشمال) | 280 |

نفس السطر في الاتنين، والشارة راحت لآخر السطر حسب اللغة. لو كنت كتبت [[right: 0]] كانت هتفضل يمين في العربي كمان.

## ٣. [[.header { position: sticky; top: 0; }]]

[[sticky]] = عادي لحد ما يوصل لـ [[top: 0]] من الشاشة وانت نازل، وبعدين يلزق:

~~~text getBoundingClientRect().top
قبل الـ scroll:      200   (مكانه العادي في الصفحة)
بعد scroll 400:      0     (لزق فوق)
~~~

---

## ٤. الخمس قيم جنب بعض

نفس الصفحة فيها كمان عنصر [[static]] عليه [[top: 50px]]، وعنصر [[relative]] عليه [[top: 10px; left: 10px]]، وعنصر [[fixed]] في الركن:

| القيمة | قبل الـ scroll | بعد 400 | اللي حصل |
|---|---|---|---|
| [[static]] + [[top: 50px]] | 240 | -160 | الـ [[top]] اتجاهل خالص، ومشي مع الصفحة |
| [[relative]] + [[top/left: 10px]] | 268، left 10 | -132 | اتزق 10 لتحت و 10 لليمين، ومشي مع الصفحة |
| العنصر اللي بعد الـ relative | 288 | -112 | مكانه بعد المكان **الأصلي** للـ relative |
| [[absolute]] (الشارة) | 0 من الأب | 0 من الأب | ماشي مع أبوه |
| [[fixed]] | 0 | 0 | ثابت في الشاشة |
| [[sticky]] | 200 | 0 | لزق |

العنصر اللي بعد الـ relative بيوضح إن المكان الأصلي محجوز: الـ relative ارتفاعه 30 ومكانه الأصلي كان 258، فاللي بعده جه عند 258 + 30 = 288، حتى والـ relative متزحزح لـ 268.

---

## ٥. الفخين اللي بيفرّقوك في الانترفيو

### fixed جوه عنصر عليه [[transform]]

حطينا عنصر [[fixed]] جوه div عليه [[transform: translateX(0)]] (تحريك بصفر، شكله مش بيتغير):

~~~text getBoundingClientRect().top
fixed عادي:            0  ←  0      (ثابت)
fixed جوه transform:   618 ← 218    (مشي مع الصفحة)
~~~

الـ [[transform]] على الجد عمل containing block جديد، فالـ fixed بقى بيتحسب من الجد مش من الشاشة. ونفس الحكاية مع [[filter]]. عشان كده المودالات بتتحط في portal برا أي عنصر متحرك.

### sticky جوه [[overflow: hidden]]

هيدر sticky تاني جوه div عليه [[overflow: hidden]]: قبل الـ scroll 668، وبعده 268. يعني **ملزقش**. الـ overflow خلّى الـ div هو الـ scroll container بتاع الهيدر، والـ div نفسه مش بيعمل scroll، فالـ sticky ملوش حاجة يلزق فيها.

---

## الخلاصة

| القيمة | في الـ flow؟ | بيتحسب من |
|---|---|---|
| [[static]] | أيوه | مفيش ([[top]] ملوش تأثير) |
| [[relative]] | أيوه، ومكانه محجوز | مكانه الأصلي |
| [[absolute]] | لأ | أقرب جد positioned |
| [[fixed]] | لأ | الشاشة (إلا لو جد عليه transform أو filter) |
| [[sticky]] | أيوه | أقرب scroll container، جوه حدود أبوه |`,
          lines: [
            "الأب مرجع للـ absolute.",
            "الشارة في ركن النهاية فوق.",
            "الهيدر يلزق فوق وانت نازل."
          ],
          sol: R`اللي هتشوفه وانت بتعمل scroll: [[static]] بيمشي مع الصفحة، و [[top]] و [[z-index]] ملهمش أي تأثير عليه. [[relative]] بيمشي مع الصفحة برضه، بس متزحزح بالـ [[top]]/[[left]] عن مكانه الأصلي، والمكان الأصلي فاضي محجوز (اللي بعده مش بيطلع مكانه). [[absolute]] خرج من الـ flow خالص (اللي بعده طلع مكانه)، ومتحط بالنسبة لأقرب أب positioned، ولو مفيش بالنسبة لأول شاشة، وبيمشي مع الـ scroll. [[fixed]] ثابت في مكانه على الشاشة مهما عملت scroll. [[sticky]] بيمشي عادي لحد ما يوصل للـ [[top]] بتاعه، وبعدين بيلزق، ولما أبوه يخلص بيمشي معاه ويطلع.

الإجابة النموذجية بتلف حوالين كلمة containing block: «لكل عنصر فيه حد بيتحسب منه. للـ absolute هو أقرب جد مش static، للـ fixed هو الـ viewport، للـ sticky هو أقرب scroll container.» والفخ اللي يفرّقك: الـ fixed بيبطّل يبقى بالنسبة للشاشة لو أي جد عليه [[transform]] أو [[filter]] أو [[contain]]، وساعتها بيتصرف زي absolute جوه الجد ده. والـ sticky بيبطّل لو فيه جد عليه [[overflow: hidden]].`
        },
        {
          cmd: "mobile-first",
          title: "هتعمل الموقع responsive إزاي؟ (Responsive strategy)",
          desc: R`أبدأ بـ meta viewport، وبعدين أكتب الـ CSS الأساسي لأصغر شاشة، وأضيف بـ [[min-width]] media queries للأكبر، والـ breakpoints حسب المحتوى (لما الشكل يبوظ) مش حسب أجهزة. وبعتمد على layouts مرنة من نفسها: flex-wrap، و grid بـ auto-fit و minmax، ووحدات مرنة: rem و % و clamp للخطوط والمسافات، وصور بـ [[max-width: 100%]] و srcset. وللمكونات اللي بتتحط في أماكن مختلفة container queries. وبختبر على أجهزة حقيقية مش DevTools بس، وبتأكد من أهداف اللمس (حوالي 44px، وأقل حاجة 24 في WCAG 2.2) ومن إن مفيش حاجة مهمة معتمدة على hover.`,
          example: R`.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); }
h1 { font-size: clamp(1.75rem, 1rem + 3vw, 3rem); }
@media (width >= 64rem) { .layout { grid-template-columns: 16rem 1fr; } }`,
          try: R`خد صفحة من مشروع ليك، وافتحها على 320px و 768px و 1440px، واكتب كل مكان بيبوظ والـ breakpoint اللي هيحله.`,
          flag: "script",
          deep: {
            why: "بيختبر إن عندك منهج، مش «بظبط لحد ما يبان كويس».",
            how: "لو عايز تتميز: اذكر إن breakpoints بـ rem بتحترم إعداد خط المستخدم، وإن Tailwind v4 بيلف hover في (hover: hover)، وإنك بتعمل intrinsic layouts (auto-fit و clamp و container queries) فالـ media queries بتقل.",
            when: "أسئلة المتابعة: «الفرق بين mobile-first و desktop-first؟» و «إيه الـ breakpoints اللي بتستخدمها وليه؟» و «container queries ولا media queries؟» و «بتتعامل مع الصور إزاي؟».",
            mistakes: "«بستخدم Bootstrap أو Tailwind فهو responsive لوحده». أو إجابة كلها breakpoints لأجهزة معينة من غير layouts مرنة. أو نسيان الـ viewport meta."
          },
          teach: R`## ٣ سطور، وكل واحد طريقة مختلفة للتأقلم

السطرين الأولانيين بيتأقلموا **لوحدهم** من غير أي media query، والتالت breakpoint واحد بس للـ layout الكبير. حطيناهم في صفحة فيها [[<meta name="viewport" content="width=device-width, initial-scale=1">]] (من غيرها الموبايل بيعرض الصفحة كأنها ديسكتوب ومصغّرة)، وفتحناها في Chrome 154 (headless عن طريق playwright) على عروض مختلفة.

---

## ١. الشبكة: [[grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr))]]

نفكّها من جوه لبرا:

### [[min(16rem, 100%)]]

[[min()]] بياخد الأصغر من الاتنين: 16rem (256px) أو عرض الحاوية كلها. على شاشة أعرض من 256 بيطلع 256، وعلى حاوية أضيق بيطلع عرضها.

### [[minmax(..., 1fr)]]

العمود مايصغرش عن الرقم اللي فوق، ويكبر لحد [[1fr]] (جزء متساوي من الفاضي).

### [[repeat(auto-fit, ...)]]

حط أكبر عدد أعمدة يساع، والفاضي يتوزع عليهم. و [[gap: 1rem]] = 16px بين الأعمدة.

اللي اتقاس (الشبكة في الصفحة من غير sidebar لحد 1024):

| عرض الشاشة | الأعمدة |
|---|---|
| 320 | عمود واحد 320 |
| 768 | 2 × 376 |
| 1023 | 3 × 330 |
| 1440 (والـ sidebar ظاهر) | 4 × 284 |

من غير ولا media query: من عمود لـ 4.

### ليه [[min(16rem, 100%)]] مش [[16rem]] بس؟

جرّبنا الاتنين على شاشة 240px (موبايل صغير أو حاوية ضيقة):

| | العمود | scroll أفقي للصفحة؟ |
|---|---|---|
| [[minmax(min(16rem, 100%), 1fr)]] | 240 | لأ |
| [[minmax(16rem, 1fr)]] | 256 | **أيوه** |

العمود رفض يصغر عن 256 فخرج برا الشاشة. الـ [[min()]] بيحل ده.

## ٢. [[h1 { font-size: clamp(1.75rem, 1rem + 3vw, 3rem); }]]

[[clamp(أقل، المفضّل، أقصى)]]: خد القيمة اللي في النص، بس متنزلش عن الأولى ومتطلعش عن التالتة.

- [[1.75rem]] = 28px أقل حاجة، و [[3rem]] = 48px أقصى حاجة.
- [[1rem + 3vw]]: [[vw]] = 1% من عرض الشاشة. فالخط بيكبر مع الشاشة، والـ [[1rem]] موجود عشان تكبير الخط من إعدادات المستخدم يأثر عليه (قيمة [[vw]] لوحدها مبتكبرش مع إعداد الخط).

| الشاشة | [[1rem + 3vw]] | الناتج اللي Chrome حسبه |
|---|---|---|
| 320 | 16 + 9.6 = 25.6 | 28px (الحد الأدنى) |
| 768 | 16 + 23.04 = 39.04 | 39.04px |
| 1440 | 16 + 43.2 = 59.2 | 48px (الحد الأقصى) |

## ٣. [[@media (width >= 64rem) { .layout { grid-template-columns: 16rem 1fr; } }]]

- [[@media (...)]]: القاعدة اللي جوه تتطبق بس لو الشرط صح.
- [[width >= 64rem]]: الشاشة عرضها 64rem أو أكتر. [[64rem]] = 1024px بالخط الافتراضي (16). ودي صيغة الـ range الجديدة، زي [[min-width: 64rem]] القديمة بالظبط.
- [[16rem 1fr]]: عمودين، sidebar ثابت 256 والباقي للمحتوى.

ده mobile-first: الـ CSS العادي (برا الـ media query) هو الموبايل (عمود واحد)، والـ media query **بتزوّد** للشاشة الكبيرة.

| الشاشة | أعمدة الـ layout |
|---|---|
| 1023 | [[1023px]] (عمود واحد) |
| 1024 | [[256px 768px]] |
| 1440 | [[256px 1184px]] |

### ليه الـ breakpoint بالـ rem؟

شغّلنا Chrome بخط افتراضي 20px بدل 16 (زي مستخدم مكبّر الخط من الإعدادات):

| الشاشة | الـ layout |
|---|---|
| 1024 | [[1024px]]: الـ sidebar **مظهرش** |
| 1280 | [[320px 960px]] |

[[64rem]] بقت 64 × 20 = 1280. يعني لما الخط كبر، الصفحة استنت شاشة أعرض قبل ما تقسم لعمودين، والـ sidebar نفسه كبر لـ 320. بالـ px كان الكلام الكبير هيتزنق في عمودين على 1024.

---

## الخلاصة

| الأداة | بتعمل إيه | محتاجة media query؟ |
|---|---|---|
| [[auto-fit]] + [[minmax]] + [[min()]] | عدد الأعمدة حسب المساحة | لأ |
| [[clamp()]] بـ rem + vw | خط بيكبر بين حدين | لأ |
| [[@media (width >= 64rem)]] | تغيير الـ layout نفسه | أيوه، واحدة |

- ابدأ بالموبايل، وزوّد بـ [[min-width]] / [[>=]] لما الشكل يبوظ، مش عند مقاس جهاز.
- الـ breakpoints بالـ rem عشان تحترم خط المستخدم.`,
          lines: [
            "شبكة بتتأقلم مع أي عرض من غير breakpoints.",
            "عنوان بيكبر مع الشاشة بين حد أدنى وأقصى.",
            "breakpoint واحد للـ layout الكبير: sidebar ومحتوى."
          ],
          sol: R`نموذج لنتيجة التجربة (صفحة منتجات عادية): على 320: الـ nav اللينكات طالعة برا الشاشة ← محتاج منيو burger تحت 48rem. الجدول بيعمل scroll للصفحة كلها ← wrapper بـ [[overflow-x: auto]] (مش breakpoint). الـ h1 كبير ومكسّر كلمات ← [[clamp()]]. على 768: كارتين في السطر وفيه فراغ كبير ← [[auto-fit]] يحلها من غير breakpoint. على 1440: السطور طويلة جدًا في القراية ← [[max-width: 65ch]]. والـ sidebar محتاج يظهر جنب ← breakpoint عند 64rem.

الإجابة النموذجية: «ببدأ بالموبايل لأنه أصعب حالة، والـ CSS الأساسي من غير media query بيبقى للشاشة الصغيرة، وبزوّد بـ [[min-width]] لما الشكل يبوظ مش لما جهاز معين يظهر. أول ما أقدر أحلّها من غير breakpoint بعملها: [[auto-fit]] و [[clamp()]] و [[min()]] و flex-wrap. والـ breakpoints بالـ rem عشان تحترم خط المستخدم. ولو المكون بيتحط في أماكن بعروض مختلفة، container query أحسن من media query. وبختبر على جهاز حقيقي عشان dvh و الـ touch و الـ hover.»

الغلط اللي يبان في الإجابة: تعد breakpoints بأسماء أجهزة (iPhone و iPad)، أو تكتب الـ desktop الأول وتصلّح بـ [[max-width]] فالموبايل ينزّل CSS مش محتاجه ويكتب فوقه.`
        },
        {
          cmd: "rem من الـ root",
          title: "إيه الفرق بين px و em و rem؟ (px vs em vs rem)",
          desc: R`[[px]] وحدة ثابتة. [[rem]] مضروبة في font-size بتاع الـ root (html)، والافتراضي 16px، وبتتغير لو المستخدم كبّر الخط من إعدادات المتصفح. [[em]] مضروبة في font-size بتاع العنصر نفسه، وفي خاصية font-size نفسها بتاعة الأب، فبتتراكم لو العناصر جوه بعض. أنا بستخدم rem للخطوط والمسافات عشان تحترم إعدادات المستخدم وتفضل متناسقة، و em للحاجات اللي لازم تتناسب مع خط المكون نفسه زي padding الزرار أو أيقونة جنب كلام، و px للحاجات اللي لازم تفضل رفيعة زي الـ border.`,
          example: R`html { font-size: 100%; }
.btn { font-size: 1.125rem; padding: 0.5em 1em; border: 1px solid; }`,
          try: R`كبّر خط المتصفح من الإعدادات وافتح موقع ليك: اللي مكبرش مكتوب بـ px. دي إجابة عملية قوية في الانترفيو.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الوحدات، وبيفتح باب الـ accessibility.",
            how: R`لو عايز تتميز: Tailwind كله rem ([[--spacing: 0.25rem]])، والـ media queries بـ rem أو em بتتحسب من خط المتصفح الافتراضي مش من خط الـ html، و clamp بـ rem + vw عشان الـ zoom يفضل شغال.`,
            when: R`أسئلة المتابعة: «إيه مشكلة [[html { font-size: 62.5% }]]؟» و «الـ media queries بـ em بتتحسب من إيه؟» و «vw في الخطوط؟».`,
            mistakes: "«rem من الأب» (ده em). «px أسهل ومفيش فرق» (بيكسر تكبير الخط). «em دايمًا من الأب» (بس في font-size، وفي باقي الخصائص من العنصر نفسه)."
          },
          teach: R`## ٣ وحدات في سطرين

المثال سطرين بس، بس فيهم الـ ٣ وحدات: [[%]] و [[rem]] على الخط، و [[em]] على الـ padding، و [[px]] على الـ border. جرّبناهم في Chrome 154 (headless عن طريق playwright) مرة بخط المتصفح الافتراضي (16px)، ومرة وإحنا مغيّرين إعداد الخط في المتصفح لـ 20px (زي مستخدم اختار خط أكبر من الإعدادات).

---

## ١. [[html { font-size: 100%; }]]

[[%]] في [[font-size]] نسبة من خط الأب. والـ [[<html>]] ملوش أب، فالـ 100% من **إعداد المستخدم** في المتصفح:

| إعداد المتصفح | [[font-size]] بتاع الـ html |
|---|---|
| 16 (الافتراضي) | 16px |
| 20 | 20px |

السطر ده هو الافتراضي أصلًا، بس كتابته بتقول «أنا عارف ومش هغيّره لـ px».

## ٢. [[.btn { font-size: 1.125rem; ... }]]

[[rem]] = root em: مضروب في خط الـ [[<html>]] (الـ root). فـ 1.125 × 16 = **18px**.

## ٣. [[padding: 0.5em 1em]]

رقمين في [[padding]]: الأول فوق وتحت، والتاني يمين وشمال. و [[em]] هنا مضروب في خط **الزرار نفسه** (18) مش الـ html:

~~~text الحساب
فوق وتحت:     0.5 × 18 = 9px
يمين وشمال:   1   × 18 = 18px
~~~

ليه em هنا؟ عشان لو عملت زرار أكبر (كلاس [[.btn-lg]] فيه [[font-size: 1.5rem]] = 24px)، الـ padding يكبر لوحده معاه: Chrome حسبه [[12px / 24px]] من غير ما تكتب padding تاني.

## ٤. [[border: 1px solid]]

[[px]] ثابت. الـ border لازم يفضل رفيع مهما الخط كبر.

---

## ٥. اللي Chrome حسبه في الحالتين

| | خط 16 (افتراضي) | خط 20 (المستخدم كبّره) |
|---|---|---|
| html | 16px | 20px |
| خط الزرار ([[1.125rem]]) | 18px | 22.5px |
| الـ padding ([[0.5em 1em]]) | 9px / 18px | 11.25px / 22.5px |
| الـ border ([[1px]]) | 1px | 1px |

كل حاجة كبرت 25% (من 16 لـ 20) ما عدا الـ border. لو كنت كاتب [[font-size: 18px]]، الزرار كان هيفضل 18 ومستخدم الخط الكبير ميستفادش حاجة.

## ٦. الـ em بيتراكم

[[font-size: 0.9em]] على div، وجواه div تاني بنفس الكلاس:

~~~text الحساب واللي Chrome حسبه
16 × 0.9 × 0.9 = 12.96px
~~~

في [[font-size]] الـ em بيتحسب من خط **الأب**، فكل مستوى بيضرب في اللي قبله. ده سبب إن الخطوط بالـ rem أريح.

## ٧. سؤال المتابعة: [[html { font-size: 62.5% }]]

ناس بتعمل كده عشان الـ rem يبقى 10px والحساب يبقى سهل. جرّبناه:

| الـ html | إعداد المتصفح | الـ html طلع | خط الزرار |
|---|---|---|---|
| [[62.5%]] | 16 | 10px | 11.25px |
| [[62.5%]] | 20 | 12.5px | 14.06px |
| [[10px]] | 20 | 10px | 11.25px |

- [[62.5%]] لسه بيحترم إعداد المستخدم (كبر لـ 12.5)، بس لازم تكتب كل حاجة بأرقام أكبر (1.8rem بدل 1.125rem).
- [[10px]] على الـ html **لغى** إعداد المستخدم خالص: 10 في الحالتين.

ونقطة زيادة: الـ media query بـ rem مبتتأثرش بـ [[font-size]] اللي على الـ html. جرّبنا [[@media (width >= 64rem)]] على شاشة 1024 مع [[62.5%]] وخط 16: اتطبقت (64 × 16 = 1024، مش 64 × 10). ومع إعداد خط 20 مااتطبقتش (64 × 20 = 1280). يعني الـ media query بتتحسب من إعداد المتصفح بس.

---

## الخلاصة

| الوحدة | مضروبة في | استخدمها لـ |
|---|---|---|
| [[px]] | ثابتة | border وظلال |
| [[rem]] | خط الـ [[<html>]] (إعداد المستخدم) | الخطوط والمسافات العامة |
| [[em]] | خط العنصر نفسه (وفي [[font-size]]: خط الأب) | padding زرار، أيقونة جنب كلام |

- الـ zoom (Ctrl و +) بيكبّر كل حاجة حتى الـ px، فهو مش الاختبار. الاختبار إعداد الخط في المتصفح.`,
          lines: [
            "الأساس 16، أو اللي المستخدم اختاره.",
            "الخط 18، والـ padding 9 و 18 من خط الزرار، والـ border بكسل ثابت."
          ],
          sol: R`اللي هتلاقيه بعد ما تخلي خط المتصفح Large (20px): الكلام اللي مكتوب بـ rem أو em كبر بنسبة 25%، واللي مكتوب بـ px فضل زي ما هو. غالبًا هتلاقي عناوين وأزرار كبرت وحاجات زي الـ footer أو badge صغيرة فضلت صغيرة، وده معناه إن فيه [[font-size: 12px]] في مكان.

الإجابة النموذجية: «[[px]] ثابت ومش بيحترم إعداد خط المستخدم. [[rem]] نسبة من خط الـ [[<html>]] (16px افتراضيًا، أو اللي المستخدم اختاره)، فالصفحة كلها بتكبر مع الإعداد ده. [[em]] نسبة من خط العنصر نفسه (أو الأب لو في [[font-size]])، فبيتراكم لو متداخل: [[0.9em]] جوه [[0.9em]] = 0.81. بستخدم rem للخط والمسافات العامة، و em للحاجات اللي لازم تتناسب مع خط العنصر زي padding الزرار ([[0.5em 1em]] في المثال بيكبر لوحده مع [[.btn-lg]])، و px للـ borders والظلال اللي مش لازم تكبر.»

والنقطة اللي بتفرّقك: متعملش [[html { font-size: 62.5% }]] عشان الحساب يبقى أسهل، ولو عملتها متكتبش [[font-size: 10px]] بدلها أبدًا، لأن الـ px على الـ html بيلغي إعداد المستخدم خالص. وإن الـ zoom (Ctrl +) بيكبّر px كمان، فهو مش الاختبار.`
        },
        {
          cmd: "توليد on-demand",
          title: "Tailwind بيشتغل إزاي من جوه؟ وإيه عيوبه؟",
          desc: R`Tailwind أداة build مش مكتبة runtime. بيعمل scan لملفات المشروع ويدوّر على أسماء كلاسات بيعرفها، ويطلّع CSS للي اتكتب بس، فالملف النهائي صغير مهما المشروع كبر. في v4 الإعداد في CSS: [[@import "tailwindcss"]] و [[@theme]] للتوكنز، والقيم متغيرات CSS، والناتج في cascade layers. والـ variants زي [[hover:]] و [[md:]] بتلف الكلاس في selector أو media query. العيوب: الـ HTML بيبقى مزحوم، والكلاسات لازم تتكتب كاملة (مينفعش تبنيها بـ string)، والتعارض بين الكلاسات محتاج tailwind-merge، والفريق محتاج يتفق على التوكنز عشان ميبقاش كله arbitrary values.`,
          example: R`<button className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-brand/90 md:px-6">حفظ</button>`,
          try: R`افتح CSS الناتج لمشروع Tailwind ودوّر على كلاس مش مستخدم: مش هتلاقيه. ودي الـ «on-demand» اللي تشرحها.`,
          flag: "script",
          deep: {
            why: "بيتسأل لأنه في كل مشروع حديث، والإجابة بتفرق بين اللي بيستخدمه واللي فاهمه.",
            how: R`لو عايز تتميز: الـ scan نصي مش بيفهم JavaScript، ودا سبب إن [[bg-$__{color}-500]] مش شغال. والـ utilities جوه [[@layer utilities]]، فأي CSS عادي برا layer بيغلبها. وإعادة الاستخدام بتبقى بمكونات React و cva، مش بـ [[@apply]] في كل حتة.`,
            when: R`أسئلة المتابعة: «بتعمل dark mode إزاي؟» و «إيه الفرق بين v3 و v4؟» و «إزاي بتعيد استخدام الستايلات؟» و «ليه مش CSS Modules؟».`,
            mistakes: "«Tailwind زي الـ inline styles» (لأ: فيه variants و media queries وتوكنز، والـ CSS بيتعمله cache). «بيطلّع كل الكلاسات وبعدين يمسح اللي مش مستخدم» (ده شكل قديم؛ دلوقتي بيولّد اللي محتاجه بس). و @apply في كل حتة فترجع لـ CSS عادي."
          },
          teach: R`## من كلاسات في الـ HTML لملف CSS

المثال زرار واحد بـ 7 كلاسات. عشان نشوف Tailwind بيعمل إيه بيهم، عملنا مشروع Vite 8.3.3 و Tailwind 4.3.3 حقيقي: ملف CSS فيه سطرين، وملف JSX فيه الزرار ده بس، وعملنا [[npx vite build]] (من غير minify عشان نقرا الناتج).

~~~text src/style.css
@import "tailwindcss";
@theme { --color-brand: oklch(0.55 0.2 260); }
~~~

- [[@import "tailwindcss"]]: ده كل الإعداد في v4. مفيش [[tailwind.config.js]].
- [[@theme]]: هنا بتعرّف التوكنز (ألوانك ومسافاتك). [[--color-brand]] بيعمل كلاسات [[bg-brand]] و [[text-brand]] وغيرهم. من غيره [[bg-brand]] مش هيتولّد، لأنه مش من ألوان Tailwind الجاهزة.

---

## ١. الـ scan: Tailwind بيدوّر على إيه؟

وقت الـ build بيقرا ملفات المشروع **كنص** ويدوّر على أي كلمة شكلها كلاس يعرفه. ودي التجربة اللي بتثبت إنه نص مش كود:

~~~text src/App.jsx (تجربة)
<button className={$__bt rounded-lg bg-$__{color}-500$__bt}>حفظ</button>
// px-5 مكتوبة في تعليق بس
export const map = { green: "bg-green-500" };
~~~

~~~text اتولّد في الـ CSS؟
bg-red-500     لأ    (حتى لو color = "red" وقت التشغيل)
bg-green-500   أيوه  (مكتوبة كاملة في object)
px-5           أيوه  (رغم إنها في تعليق!)
~~~

الـ scanner مش بيشغّل JavaScript، فـ [[bg-$__{color}-500]] بالنسبة له مش كلاس. ولقى [[px-5]] في تعليق فولّدها. عشان كده الكلاسات لازم تتكتب كاملة.

## ٢. الكلاسات اللي في المثال وناتجها

ده الجزء اللي Tailwind ولّده للزرار، بالظبط:

~~~text CSS الناتج (جزء الـ utilities)
@layer utilities {
  .rounded-lg { border-radius: var(--radius-lg); }
  .bg-brand { background-color: var(--color-brand); }
  .px-4 { padding-inline: calc(var(--spacing) * 4); }
  .py-2 { padding-block: calc(var(--spacing) * 2); }
  .text-white { color: var(--color-white); }
  @media (hover: hover) {
    .hover\:bg-brand\/90:hover { background-color: #1c69e3e6; }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\:bg-brand\/90:hover { background-color: color-mix(in oklab, var(--color-brand) 90%, transparent); }
    }
  }
  @media (min-width: 48rem) {
    .md\:px-6 { padding-inline: calc(var(--spacing) * 6); }
  }
}
~~~

نقرا كل كلاس:

| الكلاس | الـ CSS | ملاحظة |
|---|---|---|
| [[rounded-lg]] | [[border-radius: var(--radius-lg)]] | [[--radius-lg]] = [[.5rem]] في الـ theme |
| [[bg-brand]] | [[background-color: var(--color-brand)]] | من [[@theme]] بتاعنا |
| [[px-4]] | [[padding-inline: calc(var(--spacing) * 4)]] | [[--spacing]] = [[.25rem]]، يعني 1rem |
| [[py-2]] | [[padding-block: ... * 2]] | 0.5rem فوق وتحت |
| [[text-white]] | [[color: var(--color-white)]] | [[#fff]] |
| [[hover:bg-brand/90]] | لون البراند بشفافية 90% | ملفوف في [[@media (hover: hover)]] |
| [[md:px-6]] | 1.5rem يمين وشمال | ملفوف في media query عند 48rem (768px) |

### الـ variants: [[hover:]] و [[md:]]

الـ variant هو الحتة اللي قبل [[:]]. هو مش بيعمل CSS جديد، بيلف نفس الكلاس:

- [[hover:]] بيضيف [[:hover]] للـ selector، **وكمان** بيلفه في [[@media (hover: hover)]]، يعني الأجهزة اللي فيها ماوس بس. على الموبايل الـ hover مش بيعلق بعد اللمس.
- [[/90]] شفافية: Tailwind كتب لون جاهز ([[#1c69e3e6]]، و [[e6]] في الآخر = 90%) للمتصفحات القديمة، وجوه [[@supports]] نسخة بـ [[color-mix]] للجديدة.
- [[md:]] بيلفه في media query. Tailwind نفسه بيكتبها [[@media (width >= 48rem)]] (ودي اللي طلعت لما جرّبنا [[npx @tailwindcss/cli]])، و [[vite build]] حوّلها للصيغة القديمة [[min-width]] عشان المتصفحات اللي بيستهدفها. نفس المعنى.

و [[\:]] و [[\/]] في أسماء الكلاسات: الـ [[\]] بيهرّب الرمز، لأن [[:]] و [[/]] ليهم معنى في الـ selectors.

## ٣. الـ layers

~~~text أول الملف (مختصر)
@layer theme { :root, :host { --spacing: .25rem; --color-brand: oklch(55% .2 260); ... } }
@layer base { ... }        ← الـ Preflight (الـ reset)
@layer components;
@layer utilities { ... }   ← الكلاسات
~~~

كل حاجة جوه [[@layer]]. والـ theme فيه **بس** المتغيرات اللي اتستخدمت (مش كل ألوان Tailwind). والنتيجة إن أي CSS بتكتبه انت برا layer بيغلب الـ utilities، مهما كانت الـ specificity.

## ٤. الحجم

الملف كله 309 سطر من [[vite build]] من غير minify، و 200 سطر من الـ CLI، وأغلبه الـ Preflight. ولو المشروع فيه 1000 زرار بنفس الكلاسات، الملف مش هيكبر: كل كلاس بيتولد مرة واحدة.

---

## الخلاصة

| | |
|---|---|
| إمتى بيشتغل | وقت الـ build، مش في المتصفح |
| بيدوّر إزاي | بيقرا الملفات كنص |
| بيطلّع إيه | الكلاسات اللي لقاها بس، جوه [[@layer utilities]] |
| الـ variants | بتلف الكلاس في [[:hover]] أو media query |
| الفخ | [[bg-$__{color}-500]] مش بيتولّد: اكتب الأسامي كاملة |`,
          lines: [
            "كل كلاس قاعدة CSS صغيرة، و Tailwind بيطلّع دول بس."
          ],
          sol: R`اللي هتلاقيه: الكلاسات اللي في الـ HTML بس، زي [[.px-4]] و [[.md\:px-6]] جوه [[@media (width >= 48rem)]]، و [[.hover\:bg-brand\/90]] ملفوفة في [[@media (hover: hover)]]. لو دوّرت على [[.px-5]] أو [[.bg-red-500]] ومش مستخدمهم مش هتلاقيهم. ولما طلّعت CSS للزرار ده لوحده بـ Tailwind v4.3.3 الملف كله (بالـ reset والـ theme) كان 200 سطر بالـ CLI ([[npx @tailwindcss/cli]]) و 309 سطر بـ [[vite build]] من غير minify، مش آلاف، وأغلبه الـ preflight. (و [[vite build]] بيكتب الـ media query [[@media (min-width: 48rem)]]، نفس المعنى بالصيغة القديمة.)

الإجابة النموذجية: «Tailwind بيعمل scan لملفات المشروع (في v4 أوتوماتيك، مع [[@source]] لو محتاج)، وبيدوّر على أي كلمة شكلها كلاس، ويولّد CSS للكلاسات دي بس. عشان كده الـ CSS النهائي صغير ومبيكبرش مع حجم المشروع قد ما بيكبر مع عدد الكلاسات المختلفة. العيوب: الـ HTML بيبقى مليان كلاسات وبيتقري بصعوبة، ومحتاج [[cn]]/tailwind-merge عشان التعارضات، والكلاسات المتركبة بالـ string زي [[$__btbg-$__{color}-500$__bt]] مبتتولدش لأن الـ scanner مش بيشغّل الكود، ومحتاج build step، وفيه منحنى تعلم للأسماء.»

والحل لمشكلة الكلاسات الديناميكية اللي تقوله: اكتب الأسماء كاملة في object ([[{ red: "bg-red-500", green: "bg-green-500" }]])، أو [[@source inline(...)]] لو لازم.`
        },
        {
          cmd: "semantic HTML أولًا",
          title: "إيه أهم حاجات الـ accessibility في الفرونت إند؟",
          desc: R`أبدأ بـ HTML صح: عناصر semantic، و button للأفعال و a للتنقل، و label لكل حقل، و alt للصور، وعناوين بالترتيب. ده بيدّي نص الـ accessibility ببلاش. بعدين الكيبورد: كل حاجة بتتوصل بـ Tab، والـ focus باين بـ focus-visible، والمودالات بتحبس الـ focus وبترجّعه. بعدين التباين: 4.5:1 للكلام العادي. و aria بس للحاجات اللي HTML مش بيوصفها: aria-expanded و aria-live و aria-label لأزرار الأيقونات. واحترام prefers-reduced-motion. وبختبر بالكيبورد وبـ Lighthouse أو axe، وأحيانًا بقارئ شاشة حقيقي.`,
          example: R`<button aria-label="إغلاق" onClick={close}><X aria-hidden="true" /></button>`,
          try: R`اعمل audit لصفحة من مشروعك بـ Lighthouse › Accessibility، وصلّح أول 3 مشاكل، واحكي عنهم في الانترفيو كمثال حقيقي.`,
          flag: "script",
          deep: {
            why: "شركات كتير عندها التزامات قانونية بالـ accessibility، والسؤال بيفرق بين اللي بيبني UI للماوس بس واللي بيبني لكل الناس.",
            how: "لو عايز تتميز: اذكر الـ accessibility tree والـ role/name/state، وإن primitives زي Radix بتحل focus trap و Escape والـ aria، وإن WCAG 2.2 AA هو المعيار المعتاد.",
            when: "أسئلة المتابعة: «الفرق بين aria-label و aria-labelledby؟» و «إزاي تعمل مودال accessible؟» و «إيه WCAG AA؟» و «بتختبر إزاي؟».",
            mistakes: R`«بحط aria على كل حاجة» (no ARIA is better than bad ARIA). «[[role="button"]] على div كفاية». «الـ accessibility للمكفوفين بس» (كيبورد، ونظر ضعيف، وعمى ألوان، وحساسية للحركة، وموبايل في الشمس).`
          },
          teach: R`## زرار من غير كلام: قارئ الشاشة هيقول إيه؟

المثال زرار «إغلاق» في React، جواه أيقونة X بس ومفيهوش ولا كلمة. قارئ الشاشة مش بيشوف الأيقونة، بيقرا **اسم** الزرار من الـ accessibility tree (الشجرة اللي المتصفح بيبنيها من الصفحة لقارئ الشاشة، وكل عنصر فيها ليه role و name و state). حوّلنا السطر لـ HTML عادي (الأيقونة [[<svg>]]، زي ما مكتبات الأيقونات بتطلّعها)، وسألنا Chrome 154 (headless عن طريق playwright) عن الـ accessibility tree بتاع كل نسخة.

---

## ١. نفكّ السطر

~~~text JSX
<button aria-label="إغلاق" onClick={close}><X aria-hidden="true" /></button>
~~~

| الحتة | معناها |
|---|---|
| [[<button>]] | زرار حقيقي: بياخد focus بالـ Tab، و Enter و Space بيدوسوه، ودوره [[button]] |
| [[aria-label="إغلاق"]] | اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه |
| [[onClick={close}]] | لما يتداس شغّل الدالة [[close]]. الـ [[{}]] في JSX معناها «ده كود JavaScript مش نص» |
| [[<X />]] | مكوّن أيقونة (من مكتبة زي lucide-react) بيطلّع [[<svg>]]. والـ [[/>]] قفلة لعنصر ملوش أولاد |
| [[aria-hidden="true"]] | خبّي الأيقونة من قارئ الشاشة: هي زينة، والاسم موجود على الزرار |

## ٢. اللي Chrome قاله لكل نسخة

عملنا 5 نسخ. وحطينا جوه الـ svg [[<title>x icon</title>]] زي ما ملفات أيقونات كتير بتيجي، عشان نشوف هيأثر إزاي:

| النسخة | الـ role | الاسم اللي قارئ الشاشة هيقوله | الأيقونة |
|---|---|---|---|
| ١. المثال: [[aria-label]] + أيقونة [[aria-hidden]] | button | «إغلاق» | متجاهلة |
| ٢. من غير [[aria-label]] | button | **«»** (فاضي) | متجاهلة |
| ٣. من غير الاتنين | button | «x icon» | image |
| ٤. [[aria-label]] بس | button | «إغلاق» | image (ظاهرة لوحدها) |
| ٥. [[<div role="button">]] بدل button | button | «إغلاق» | متجاهلة |

نقرا الجدول:

- **٢**: زرار من غير اسم. قارئ الشاشة هيقول «button» وخلاص، وده أشهر مشكلة بيطلّعها Lighthouse: «Buttons do not have an accessible name».
- **٣**: الاسم جه من [[<title>]] جوه الـ svg بالإنجليزي وبكلام ملوش معنى للمستخدم. أسوأ من إنك تختار الاسم بنفسك.
- **٤**: الاسم صح، بس الأيقونة لسه في الشجرة كعنصر [[image]] لوحده. [[aria-hidden]] بيشيلها.
- **٥**: الاسم والدور صح، بس لما دوسنا Tab خمس مرات، الـ focus عدّى على الأربع أزرار الحقيقية وخرج من الصفحة من غير ما يقف على الـ div. وكمان Enter و Space مش هيشغّلوه من غير كود. عشان كده [[<button>]] الحقيقي أحسن من [[role="button"]].

---

## ٣. ده جزء من إجابة أكبر

المثال بيوضح الترتيب اللي في الإجابة:

1. **HTML صح الأول**: [[<button>]] جاب الـ role والـ focus والكيبورد ببلاش (النسخة ٥ وضّحت الفرق).
2. **اسم لكل حاجة تفاعلية**: كلام جوه الزرار، أو [[aria-label]] لو مفيش كلام، أو [[<label>]] للحقول.
3. **ARIA للحاجات اللي HTML مش بيوصفها بس**: هنا [[aria-label]] و [[aria-hidden]]. ولو فيه كلام ظاهر جوه الزرار متحطش [[aria-label]]: الاسم بيطلع من الكلام لوحده.

وبعدهم: focus ظاهر، وتباين 4.5:1، و [[prefers-reduced-motion]]، واختبار بالكيبورد وأداة زي Lighthouse أو axe.

---

## الخلاصة

| | |
|---|---|
| زرار أيقونة | [[aria-label]] على الزرار + [[aria-hidden="true"]] على الأيقونة |
| [[<button>]] مش [[<div>]] | focus وكيبورد ببلاش |
| اتأكد بنفسك | DevTools › Elements › Accessibility: شوف الـ Name |`,
          lines: [
            R`زرار أيقونة: اسمه من [[aria-label]]، والأيقونة زينة مخفية عن قارئ الشاشة.`
          ],
          sol: R`مثال لنتيجة حقيقية بعد audit (دي أشهر 3 مشاكل بتطلع): «Buttons do not have an accessible name» على زرار أيقونة ← ضفت [[aria-label]] وحطيت [[aria-hidden="true"]] على الأيقونة زي المثال. «Background and foreground colors do not have a sufficient contrast ratio» على كلام رمادي ← غيّرت [[gray-400]] لـ [[gray-600]]. «Form elements do not have associated labels» على حقل بحث ← ضفت [[<label>]] مخفي بـ [[sr-only]]. والسكور طلع من 78 لـ 96 مثلًا.

الإجابة النموذجية للسؤال: «أول حاجة HTML صح: button للزرار و a للينك و label لكل input و landmarks وعناوين بالترتيب، ودي بتحل أغلب المشاكل ببلاش. بعدها الكيبورد: كل حاجة توصلها بـ Tab، و focus ظاهر، ومودال بيحبس الـ focus ويرجّعه. بعدها الـ contrast، وبعدها alt للصور. و ARIA آخر حاجة، للحالات اللي HTML ملوش فيها زي [[aria-expanded]] و [[aria-live]]، لأن ARIA غلط أسوأ من مفيش ARIA.»

وقول إن Lighthouse بيلقط حوالي ثلث المشاكل بس، فبتكمّل بتجربة بالكيبورد وقارئ الشاشة. القصة الحقيقية بأرقام قبل وبعد هي اللي بتفرّق مش الكلام العام.`
        },
        {
          cmd: "احجز المكان",
          title: "إيه هو CLS وإزاي تقلله؟",
          desc: R`CLS مقياس من Core Web Vitals لحركة المحتوى المفاجئة وانت بتتفرج على الصفحة، والمطلوب 0.1 أو أقل. أشهر أسبابه صور و iframes من غير مقاسات، وخطوط بتتبدّل بمقاسات مختلفة، ومحتوى بيتحط فوق محتوى موجود زي البانرات والإعلانات. الحل في كلمة: احجز المكان قبل ما المحتوى يوصل: width و height أو aspect-ratio للصور والفيديو، و min-height أو skeleton للمحتوى الديناميكي، و size-adjust أو next/font للخطوط، والإشعارات fixed بدل ما تزق الصفحة. والحركة بـ transform مش بتتحسب، والتغيير اللي بيحصل بعد ضغطة المستخدم على طول مش بيتحسب.`,
          example: R`<img src="/hero.webp" width="1200" height="600" alt="...">`,
          try: R`شغّل Lighthouse على صفحة ليك واكتب الـ CLS، وصلّح سبب واحد، وقيس تاني. رقم قبل وبعد في الانترفيو بيفرق جدًا.`,
          flag: "script",
          deep: {
            why: "Core Web Vitals بتأثر على ترتيب جوجل وعلى تجربة المستخدم، فبتتسأل في أي انترفيو frontend.",
            how: "لو عايز تتميز: CLS = أكبر مجموعة shifts متقاربة (session window)، وكل shift = المساحة المتأثرة × المسافة. واذكر الفرق بين lab data (Lighthouse) و field data (Search Console و web-vitals).",
            when: "أسئلة المتابعة: «إيه باقي Core Web Vitals؟» (LCP أقل من 2.5 ثانية، و INP أقل من 200ms). «بتقيس في الحقيقة إزاي مش في المعمل؟» و «ليه CLS عالي عند المستخدمين وواطي عندك؟».",
            mistakes: "«CLS يعني الصفحة بطيئة» (ده LCP). «lazy loading بيقلل CLS» (لوحده لأ، وممكن يزوّده لو مفيش مقاسات). وتخلط INP مع FID القديم (FID اتشال سنة 2024 و INP بقى مكانه)."
          },
          teach: R`## الصورة جت متأخر وزقّت الكلام

لو المتصفح ميعرفش مقاس الصورة قبل ما توصل، بيرسم الصفحة كأن الصورة ارتفاعها صفر، ولما توصل الكلام اللي تحتها بيتزق لتحت فجأة. ده layout shift، و CLS (Cumulative Layout Shift) مجموعهم. عملنا صفحة فيها عنوان، وبعده صورة webp حقيقية 1200 × 600 السيرفر بتاعنا بيأخرها 800ms، وتحتها كلام، وقسنا في Chrome 154 (headless عن طريق playwright) بـ [[PerformanceObserver]] (الـ API اللي بيبلّغ عن كل layout shift، ونفس اللي مكتبة web-vitals بتستخدمه).

---

## ١. نفكّ السطر

~~~text index.html
<img src="/hero.webp" width="1200" height="600" alt="...">
~~~

| الحتة | معناها |
|---|---|
| [[src="/hero.webp"]] | مكان الصورة. [[webp]] صيغة صور أصغر من jpg و png |
| [[width="1200"]] و [[height="600"]] | المقاس الطبيعي للصورة، أرقام من غير [[px]] |
| [[alt="..."]] | وصف الصورة لقارئ الشاشة، وبيظهر لو الصورة مااتحمّلتش |

## ٢. المتصفح بيعمل إيه بالرقمين؟

سألنا Chrome عن [[aspect-ratio]] المحسوب على الصورة:

~~~text getComputedStyle(img).aspectRatio
مع width و height:   auto 1200 / 600
من غيرهم:            auto
~~~

المتصفح حوّل الرقمين لنسبة (2:1) لوحده، وبيحجز المكان بيها قبل ما أي byte من الصورة يوصل. و [[auto]] معناها «لما الصورة الحقيقية توصل استخدم نسبتها هي».

## ٣. التجربة: قبل ما الصورة توصل وبعدها

قسنا مكان الكلام اللي تحت الصورة (من فوق الصفحة) أول ما الـ HTML اتقرا، وبعد ما الصورة وصلت:

| | ارتفاع الصورة قبل | الكلام قبل | الكلام بعد | CLS |
|---|---|---|---|---|
| مع [[width]] و [[height]] | 600 | 700 | 700 | **0** |
| من غيرهم | 0 | 114 | 700 | **0.18** |

من غير الأبعاد الكلام نط 586px لتحت. والحد: [[0.1]] أو أقل كويس، وفوق [[0.25]] وحش.

وعلى شاشة موبايل (375px) نفس الصفحة من غير أبعاد طلعت **0.63**: الرقم أكبر بكتير لأن نفس الكلام على شاشة ضيقة بيبقى سطور أكتر، فبيملا جزء أكبر من الشاشة، وكله اتزق. CLS بيتحسب تقريبًا كده:

~~~text
layout shift = نسبة الشاشة اللي اتأثرت × نسبة المسافة اللي اتحركتها من الشاشة
~~~

## ٤. الموبايل: الرقمين لوحدهم مش كفاية

على شاشة 375 الصورة بالـ attributes بس طلعت عرضها **1200** (أعرض من الشاشة). عشان كده أي مشروع بيحط:

~~~text styles.css
img { max-width: 100%; height: auto; }
~~~

- [[max-width: 100%]]: متعدّيش عرض الأب.
- [[height: auto]]: الارتفاع من النسبة، مش الـ 600 الثابتة.

ومع السطر ده على 375: الصورة بقت 375 × 187.5 (نفس النسبة 2:1) **قبل** ما توصل، والـ CLS فضل 0. يعني الـ CSS بيصغّر، و [[width]] و [[height]] بيدّوا النسبة. الاتنين محتاجين بعض. (و Tailwind بيحط السطر ده في الـ Preflight.)

---

## ٥. نفس الفكرة لباقي الأسباب

| السبب | تحجز المكان إزاي |
|---|---|
| صورة أو فيديو | [[width]] و [[height]]، أو [[aspect-ratio]] في CSS |
| iframe (يوتيوب، خريطة) | [[aspect-ratio: 16 / 9]] |
| إعلان أو بانر أو حاجة من API | [[min-height]] أو skeleton بنفس المقاس |
| خط بيتبدّل | [[size-adjust]] أو next/font |
| إشعار بيظهر فجأة | [[position: fixed]] بدل ما يزق الصفحة |

والحركة بـ [[transform]] مش بتتحسب، والتغيير اللي بيحصل خلال 500ms من ضغطة المستخدم مش بيتحسب (الـ API بيعلّم عليه [[hadRecentInput]]، وده اللي الكود بتاعنا كان بيتجاهله).

---

## الخلاصة

- CLS = المحتوى اتحرك من غير ما المستخدم يعمل حاجة. الكويس [[0.1]] أو أقل.
- الحل في كلمة: **احجز المكان** قبل ما المحتوى يوصل.
- [[width]] + [[height]] على الصورة، و [[max-width: 100%; height: auto]] في CSS.
- Lighthouse بيقيس التحميل بس (lab). الأرقام الحقيقية (field) من Search Console أو web-vitals.`,
          lines: [
            "width و height بيحجزوا المكان بنسبة 2:1 قبل ما الصورة توصل."
          ],
          sol: R`نموذج لنتيجة: CLS قبل حوالي 0.4 (أحمر، الحد 0.1 للكويس و 0.25 للوحش) وسببه صورة الهيرو من غير أبعاد. بعد ما ضفت [[width]] و [[height]] بقى 0 تقريبًا. (قسناه في Chrome على صفحة تجربة فيها عنوان وهيرو 1200×600 بيتأخر 800ms وتحته كلام: من غير أبعاد 0.18 على شاشة 1280 و 0.63 على شاشة 375، ومع [[width]] و [[height]] صفر في الاتنين.) الأسباب التانية المعتادة: الخط لما يتبدّل، وبانر أو إعلان بيتحط فوق المحتوى بعد التحميل، و iframe من غير [[aspect-ratio]]، و skeleton مقاسه مختلف عن المحتوى الحقيقي.

الإجابة النموذجية: «CLS بيقيس قد إيه المحتوى الظاهر اتحرك من غير ما المستخدم يعمل حاجة، ورقمه (مساحة اللي اتحرك × المسافة) من غير وحدة. بقلله بإني أحجز المكان قبل ما الحاجة توصل: width و height أو aspect-ratio للصور والفيديو، و min-height للإعلانات والحاجات اللي جاية من API، وخط بـ [[size-adjust]] أو next/font، وأي حاجة بتظهر فجأة تبقى fixed أو تحت المحتوى، والحركات بـ transform مش top.»

وقول الفرق بين lab (Lighthouse بيقيس التحميل بس) و field (CrUX من مستخدمين حقيقيين وبيعد الـ shifts طول عمر الصفحة)، وإن الـ shift اللي بيحصل خلال 500ms من ضغطة المستخدم مش بيتحسب.`
        },
        {
          cmd: "مراحل الرسم",
          title: "إيه الفرق بين reflow و repaint؟",
          desc: R`المتصفح بيرسم على مراحل: يحسب الـ styles، وبعدين layout (أو reflow): أماكن ومقاسات كل العناصر، وبعدين paint (أو repaint): يلوّن البكسلات، وبعدين composite: يركّب الطبقات. تغيير width أو margin أو إضافة عنصر بيعمل reflow، وممكن يأثر على الصفحة كلها، وبعده repaint. تغيير color أو background بيعمل repaint بس. و transform و opacity غالبًا composite بس، ودا ليه الحركات بتتعمل بيهم. والأخطر layout thrashing: قراية مقاس زي offsetHeight بعد كتابة style، فالمتصفح يعمل reflow فوري، ولو في loop بيتكرر مية مرة. الحل: اقرا الكل الأول وبعدين اكتب، أو requestAnimationFrame.`,
          example: R`el.style.width = "200px";
const h = el.offsetHeight;
el.style.transform = "translateX(10px)";`,
          try: R`سجّل في DevTools › Performance وانت بتحرّك عنصر بـ [[left]] مرة وبـ [[transform]] مرة، وقارن الـ Layout والـ Paint في كل حالة.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم ليه الموقع بيقطّع، مش بس إنه بيقطّع.",
            how: R`لو عايز تتميز: الخصائص اللي بتعمل forced reflow (offsetWidth و getBoundingClientRect و scrollTop و getComputedStyle)، و [[will-change]] بيرقّي العنصر لطبقة لوحده بس بياكل ذاكرة، و ResizeObserver و IntersectionObserver بدل القراية في loop.`,
            when: R`أسئلة المتابعة: «إزاي تكتشف ده في DevTools؟» (Performance وتحذير Forced reflow). «إيه [[will-change]] وإمتى تستخدمه؟» و «ليه animation لـ top أبطأ من translate؟».`,
            mistakes: "«repaint أغلى من reflow» (العكس، والـ reflow غالبًا بيجيب repaint معاه). «transform ببلاش» (على عناصر كتير أو كبيرة بياكل ذاكرة GPU). و will-change على كل حاجة."
          },
          teach: R`## المتصفح بيرسم على ٤ مراحل

~~~text مراحل الرسم
Style       يحسب أنهي CSS بيتطبق على كل عنصر
Layout      يحسب مكان ومقاس كل عنصر         (ده الـ reflow)
Paint       يلوّن البكسلات                   (ده الـ repaint)
Composite   يركّب الطبقات فوق بعض ويعرضها
~~~

أي تغيير بيبدأ من مرحلة ويكمّل اللي بعدها. تغيير المقاس بيبدأ من Layout (أغلى حاجة)، وتغيير اللون من Paint، و [[transform]] و [[opacity]] غالبًا Composite بس. المثال ٣ سطور JavaScript على عنصر [[el]]. عدّينا مرات الـ Style والـ Layout في Chrome 154 (headless عن طريق playwright) بعدّادات [[RecalcStyleCount]] و [[LayoutCount]] من الـ DevTools Protocol، قبل وبعد كل حاجة.

---

## ١. [[el.style.width = "200px";]]

[[el.style]] الـ inline style بتاع العنصر، والسطر ده بيغيّر العرض. المتصفح **مش** بيعمل layout دلوقتي: بيعلّم إن الـ layout بقى قديم ويستنى الـ frame الجاية (الشاشة بتترسم حوالي 60 مرة في الثانية)، عشان لو غيّرت ١٠ حاجات يحسبهم مرة واحدة.

~~~text العدّادات بعد السطر ده لوحده
Layout +0   Style +0
~~~

## ٢. [[const h = el.offsetHeight;]]

[[offsetHeight]] ارتفاع العنصر لحد الـ border. عشان يرجّع رقم صح بعد ما غيّرت العرض (العرض ممكن يغيّر الارتفاع لو الكلام اتكسر)، المتصفح **مضطر** يحسب الـ layout حالًا، في نص الكود بتاعك:

~~~text العدّادات: كتابة width وبعدها قراية offsetHeight
Layout +1   Style +1
~~~

ده اسمه forced synchronous layout (أو forced reflow). ولما قرينا [[offsetHeight]] من غير ما نكتب حاجة قبله: [[+0]]، لأن الـ layout كان محسوب أصلًا.

الحاجات اللي بتعمل كده لما تقراها: [[offsetWidth]] و [[offsetHeight]] و [[clientWidth]] و [[scrollTop]] و [[getBoundingClientRect()]] و [[getComputedStyle()]].

## ٣. [[el.style.transform = "translateX(10px)";]]

[[transform]] بيحرّك العنصر **بعد** الـ layout: مكانه في الصفحة ومقاسه مبيتغيروش، والمتصفح بيزقّه وهو بيركّب الطبقات. عشان كده اللي بعده مبيتأثرش، ومش محتاج layout ولا paint في كل frame.

> لاحظ: Chrome عدّ Layout +1 برضه لما كتبنا [[transform]] أو [[color]] وقرينا [[offsetHeight]] بعدها. أي كتابة قبل قراية بتجبر المتصفح يتأكد إن كل حاجة محسوبة، حتى لو الحساب نفسه طلع خفيف. فالقاعدة: متقراش بعد ما تكتب، مهما كانت الخاصية.

---

## ٤. ليه ده مهم: layout thrashing

١٠٠ عنصر، وعايزين نكبّر كل واحد 1px عن عرضه الحالي. بطريقتين:

~~~javascript
// الطريقة الغلط: اقرا واكتب جوه نفس اللفة
for (const it of items) { it.style.width = (it.offsetWidth + 1) + 'px'; }

// الطريقة الصح: اقرا الكل الأول، وبعدين اكتب الكل
const ws = items.map(it => it.offsetWidth);
items.forEach((it, i) => it.style.width = (ws[i] + 1) + 'px');
~~~

~~~text العدّادات
اقرا واكتب في نفس اللفة:   Layout +100
اقرا الكل وبعدين اكتب:     Layout +1
~~~

في الأولى كل لفة بتكتب، واللفة اللي بعدها بتقرا، فالمتصفح بيعمل layout كامل ١٠٠ مرة. ده اسمه layout thrashing. والحل: اقرا الكل الأول وبعدين اكتب، أو أجّل الكتابة لـ [[requestAnimationFrame]].

## ٥. الحركة: [[left]] ولا [[transform]]؟

حرّكنا نفس العنصر 300px لمدة ثانية بـ CSS animation، مرة بـ [[left]] ومرة بـ [[transform: translateX()]]:

| الحركة | Layout في الثانية | Style في الثانية |
|---|---|---|
| [[left]] | 302 | 302 |
| [[transform]] | 2 | 17 |

[[left]] بيغيّر المكان في الـ layout، فكل frame فيها layout و paint. [[transform]] اتعمل في الـ composite بس. ده اللي هتشوفه في DevTools › Performance: مع [[left]] كل frame فيها Layout (بنفسجي) و Paint (أخضر)، ومع [[transform]] لأ.

---

## الخلاصة

| التغيير | بيبدأ من | أمثلة |
|---|---|---|
| مقاس أو مكان | Layout (reflow) + Paint | [[width]] و [[margin]] و [[left]] و [[font-size]] وإضافة عنصر |
| شكل بس | Paint (repaint) | [[color]] و [[background]] و [[box-shadow]] |
| تحريك وشفافية | Composite غالبًا | [[transform]] و [[opacity]] |

- reflow أغلى من repaint، وغالبًا بيجيبه معاه.
- قراية مقاس بعد كتابة style = layout فوري. في loop = thrashing.
- الحركة بـ [[transform]] و [[opacity]] مش [[top]] و [[left]].`,
          lines: [
            "كتابة: بتخلي الـ layout قديم.",
            "قراية مقاس: reflow فوري (forced).",
            "transform: غالبًا composite بس."
          ],
          sol: R`اللي هتشوفه في Performance: مع [[left]] كل frame فيه Recalculate Style، وبعدين Layout (بنفسجي)، وبعدين Paint (أخضر)، وبعدين Composite. مع [[transform]] هتلاقي Recalculate Style و Composite Layers بس، ومفيش Layout ولا Paint لكل frame (لو العنصر اتعمله layer، ودا بيحصل تلقائي وقت الـ animation أو بـ [[will-change: transform]]). ولو فعّلت Rendering › Paint flashing، العنصر اللي بيتحرك بـ left هيبقى متلوّن أخضر طول الوقت، واللي بـ transform لأ.

الإجابة النموذجية: «المتصفح بيعمل Style، بعدين Layout (reflow: يحسب مكان ومقاس كل حاجة)، بعدين Paint (repaint: يرسم البكسلات)، بعدين Composite (يركّب الطبقات على الـ GPU). reflow بيحصل لما تغيّر حاجة ليها علاقة بالمقاس أو المكان (width و left و font-size وإضافة عنصر)، وبيجر وراه paint. repaint لوحده لما تغيّر شكل من غير مقاس (color و background). و transform و opacity بيتعملوا في الـ composite بس، وعشان كده هما اللي تحرّك بيهم.»

وفي المثال: السطر التاني ([[offsetHeight]]) بيجبر المتصفح يعمل layout حالًا عشان يرجّعلك رقم صح بعد ما غيّرت الـ width، ودا forced synchronous layout. لو اتكرر في loop يبقى layout thrashing.`
        },
        {
          cmd: "stacking context",
          title: "ليه z-index: 9999 مش بيطلّع العنصر فوق؟",
          desc: R`z-index بيتقارن بس بين عناصر في نفس الـ stacking context. أي عنصر positioned عليه z-index، أو عليه opacity أقل من 1، أو transform، أو filter، أو [[isolation: isolate]]، بيعمل context جديد، وكل اللي جواه بيترتب جواه، وبعدين الـ context كله بيتعامل كوحدة واحدة مع اللي برا. فابن عليه 9999 جوه أب عليه [[z-index: 1]] عمره ما هيطلع فوق أخو الأب اللي عليه 2. الحل إني أرفع العنصر اللي عامل الـ context، أو أطلّع العنصر برا خالص بـ portal، ودا اللي Radix بيعمله للمودالات والـ dropdowns.`,
          example: R`.header { position: relative; z-index: 1; }
.header .menu { position: absolute; z-index: 9999; }
.hero { position: relative; z-index: 2; }`,
          try: R`اعمل المثال ده وصلّحه بطريقتين: مرة برفع الـ header، ومرة بنقل القايمة برا الـ header. اشرح الفرق.`,
          flag: "script",
          deep: {
            why: "مشكلة بتحصل في كل مشروع، والسؤال بيفرق بين اللي بيزوّد أصفار واللي فاهم الطبقات.",
            how: R`لو عايز تتميز: اذكر إن animation بـ transform (framer-motion مثلًا) بتعمل context جديد فجأة، وإن [[isolation: isolate]] بيعمل context مقصود من غير z-index، وإن مشروع كبير محتاج scale ثابت للـ z-index.`,
            when: "أسئلة المتابعة: «إيه الحاجات اللي بتعمل stacking context؟» و «إيه isolation: isolate؟» و «إزاي تنظّم z-index في مشروع كبير؟».",
            mistakes: "«اللي رقمه أكبر فوق دايمًا». «z-index بيشتغل على أي عنصر» (محتاج positioned أو ابن flex أو grid)."
          },
          teach: R`## الـ 9999 خسرت قدام 2، ليه؟

المثال ٣ سطور فيهم المشكلة بالظبط، والحل فيه طريقتين. حطينا كله في صفحة [[dir="rtl"]] في Chrome 154 (headless عن طريق playwright): هيدر ارتفاعه 60، وجواه قايمة 200 × 150 نازلة من [[top: 40px]] (يعني نازلة على الهيرو)، وتحته هيرو ارتفاعه 400. وسألنا المتصفح بـ [[document.elementFromPoint(x, y)]]: «مين العنصر اللي فوق خالص عند النقطة دي؟»، على نقطة جوه القايمة والهيرو في نفس الوقت (y = 120).

~~~text الـ HTML
<header class="header">هيدر<div class="menu">قايمة</div></header>
<main class="hero">هيرو</main>
~~~

القايمة **ابن** الهيدر، والهيرو **أخو** الهيدر. دي أهم معلومة في الدرس.

---

## ١. [[.header { position: relative; z-index: 1; }]]

[[z-index]] بيشتغل بس على عنصر positioned (أي [[position]] غير [[static]]) أو ابن flex أو grid. و [[position: relative]] + [[z-index]] رقم = الهيدر عمل **stacking context**: مجموعة مقفولة. كل اللي جوه الهيدر بيترتب جواه، وبعدين المجموعة كلها بتترسم كطبقة واحدة رقمها 1 قدام اللي برا.

## ٢. [[.header .menu { position: absolute; z-index: 9999; }]]

[[.header .menu]] = أي [[.menu]] جوه [[.header]]. الـ 9999 بتتقارن مع إخوات القايمة **جوه الهيدر** بس. بالنسبة لباقي الصفحة، القايمة جزء من طبقة الهيدر (1).

## ٣. [[.hero { position: relative; z-index: 2; }]]

الهيرو والهيدر الاتنين أولاد [[<body>]]، فدول اللي بيتقارنوا: 2 ضد 1. الهيرو فوق الهيدر **وكل اللي جواه**.

~~~text elementFromPoint(1100, 120)
MAIN.hero
~~~

القايمة موجودة (مكانها [[1080, 40]] بعرض 200 وارتفاع 150) بس مستخبية ورا الهيرو.

---

## ٤. الحلين (الحل في solCode)

### الطريقة ١: ارفع الهيدر نفسه

~~~text styles.css
.header { position: relative; z-index: 3; }
~~~

~~~text elementFromPoint(1100, 120)
DIV.menu
~~~

الطبقة كلها بقت 3، أعلى من 2، فالقايمة طلعت معاها. بس الهيدر **كله** بقى فوق الهيرو، فلو الهيرو فيه حاجة المفروض تطلع فوق الهيدر، مش هتعرف.

### الطريقة ٢: طلّع القايمة برا الهيدر (Portal)

~~~text الـ HTML
<header class="header">هيدر</header>
<main class="hero">هيرو</main>
<div class="menu">قايمة</div>
~~~

~~~text styles.css
.header { position: relative; z-index: 1; }
.menu { position: fixed; top: 4rem; inset-inline-start: 1rem; z-index: 50; }
.hero { position: relative; z-index: 2; }
~~~

- القايمة بقت أخت الهيرو، فـ 50 بتتقارن مع 2 مباشرة.
- [[position: fixed]] مكانها من الشاشة. [[top: 4rem]] = 64px من فوق، و [[inset-inline-start: 1rem]] = 16px من **بداية** السطر (اليمين في العربي).

~~~text الناتج
مكان القايمة: left 1064، top 64  (يعني 16 من اليمين في شاشة 1280)
elementFromPoint(1084, 120) → DIV.menu
~~~

والهيدر فضل 1. ده اللي React بيعمله بـ [[createPortal]] لـ [[document.body]]، وعشان كده Radix و shadcn بيحطوا الـ dropdown والـ dialog في Portal.

---

## ٥. الفخ: القايمة مقصوصة مش مستخبية

رفعنا الهيدر لـ 3 (الطريقة ١) وزوّدنا عليه [[overflow: hidden]]:

~~~text elementFromPoint(1100, 120)
MAIN.hero
~~~

رجعت تستخبى! بس السبب المرة دي مش z-index: [[overflow: hidden]] بيقص أي حاجة طالعة برا حدود الهيدر (ارتفاعه 60 والقايمة نازلة لـ 190). أي رقم z-index مش هيحلها. الحل الوحيد هنا الطريقة ٢.

---

## الخلاصة

| | |
|---|---|
| مين بيعمل stacking context | positioned + z-index، و [[opacity]] أقل من 1، و [[transform]]، و [[filter]]، و [[isolation: isolate]]، و [[fixed]] و [[sticky]] |
| الـ z-index بيتقارن مع مين | الإخوات جوه نفس الـ context بس |
| القايمة مستخبية | ارفع الأب صاحب الـ context، أو portal |
| القايمة مقصوصة | ده [[overflow]]، والحل portal بس |

- متزوّدش أصفار: دوّر على الأب اللي عامل الـ context.`,
          lines: [
            "الهيدر عمل context بـ 1.",
            "9999 بس جوه الهيدر، يعني بالنسبة للصفحة «1».",
            "الهيرو 2 فبيغطّي الهيدر والقايمة."
          ],
          sol: R`الطريقتين وإيه اللي هتشوفه: الأولى ترفع الهيدر: [[.header { z-index: 3 }]] (أي رقم أكبر من 2). القايمة بتظهر فوق الهيرو، بس خلي بالك إن الهيدر كله بقى فوق الهيرو، فلو الهيرو فيه حاجة المفروض تطلع فوق الهيدر (زي صورة طالعة لفوق) مش هتعرف. الطريقة التانية تطلّع القايمة من الهيدر في الـ DOM (بـ [[createPortal]] لـ [[document.body]] في React، أو تحط العنصر آخر الـ body)، وتحسب مكانها بـ JavaScript أو بـ CSS anchor positioning. ساعتها الـ 9999 بتاعتها بتتقارن مع الهيرو مباشرة وتكسب، والهيدر بيفضل 1.

الشرح النموذجي: «z-index بيتقارن بس بين الإخوات جوه نفس الـ stacking context. الهيدر بـ [[position]] و [[z-index: 1]] عمل context، فكل اللي جواه، حتى لو 9999، بيترسم كوحدة واحدة على مستوى 1، والهيرو على مستوى 2. الرفع بيغيّر ترتيب الوحدة كلها، والنقل بيطلّع القايمة من الوحدة خالص.» وده السبب إن Radix و shadcn بيحطوا الـ dropdown والـ dialog في Portal.

وقول إن فيه حاجات تانية بتعمل context من غير z-index: [[opacity]] أقل من 1، و [[transform]]، و [[filter]]، و [[isolation: isolate]]، و [[position: fixed]] و [[sticky]]. ولو القايمة بتتقص مش بتستخبى، يبقى ده [[overflow: hidden]] على الهيدر مش z-index، وده حلّه النقل بس.`,
          solCode: R`/* الطريقة 1: ارفع الـ context كله */
.header { position: relative; z-index: 3; }
.header .menu { position: absolute; z-index: 9999; }
.hero { position: relative; z-index: 2; }

/* الطريقة 2: القايمة برا الهيدر في الـ DOM (Portal) */
/* <body> <header class="header">...</header> <main class="hero">...</main> <div class="menu">...</div> </body> */
.header { position: relative; z-index: 1; }
.menu { position: fixed; top: 4rem; inset-inline-start: 1rem; z-index: 50; }
.hero { position: relative; z-index: 2; }`
        }
      ]
    }
]);
