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
    }
]);
