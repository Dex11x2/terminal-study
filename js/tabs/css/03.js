// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الجداول",
      l: 1,
      n: "جدول بيانات حقيقي: عناوين مربوطة بالخلايا، وبيتعرض على الموبايل، وبيترتب ويتقسم صفحات",
      items: [
        {
          cmd: "table",
          title: "جدول بيانات يفهمه قارئ الشاشة",
          desc: R`[[<table>]] للبيانات اللي ليها صفوف وأعمدة بس (طلبات، مستخدمين، أسعار)، مش لتقسيم الصفحة. و [[<caption>]] عنوان الجدول، و [[<thead>]] و [[<tbody>]] و [[<tfoot>]] بيقسموه، و [[<th>]] خلية عنوان.

و [[scope="col"]] بيقول إن الـ th ده عنوان العمود اللي تحته، و [[scope="row"]] عنوان الصف اللي جنبه. فقارئ الشاشة وهو ماشي في الخلايا بيقول «الإجمالي، 1,250 ج» مش «1,250 ج» وخلاص.`,
          example: R`<table>
  <caption>طلبات الأسبوع ده</caption>
  <thead>
    <tr>
      <th scope="col">رقم الطلب</th>
      <th scope="col">العميل</th>
      <th scope="col">الإجمالي</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1042</th>
      <td>منى علي</td>
      <td>1,250 ج</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">المجموع</th>
      <td>1,250 ج</td>
    </tr>
  </tfoot>
</table>`,
          try: R`اعمل الجدول وزوّد 3 طلبات. افتح DevTools › Elements واختار خلية [[<td>]]، وافتح تاب Accessibility (جنب Styles) وبص على الـ role. وبعدين غيّر كل [[<th>]] لـ [[<td>]] وبص تاني. ولو معاك قارئ شاشة: في NVDA ادخل الجدول واتنقل بـ Ctrl+Alt+الأسهم، وفي VoiceOver بـ Ctrl+Option+الأسهم.`,
          flag: "script",
          deep: {
            why: R`لوحات الأدمن والداشبوردات أغلبها جداول. والجدول من غير عناوين مربوطة بالنسبة لقارئ الشاشة لستة أرقام ملهاش معنى: «1,250، 980، 3,400» من غير ما يعرف دي إيه. ولو عملته بـ divs و grid، بيضيع التنقل بالصف والعمود خالص.`,
            how: R`المتصفح بيبني من الجدول شجرة accessibility فيها [[table]] و [[row]] و [[columnheader]] و [[rowheader]] و [[cell]]. قارئ الشاشة بيستخدمها في وضع الجدول: لما تتحرك عمود يقول عنوان العمود الجديد، ولما تنزل صف يقول عنوان الصف.

[[<caption>]] هو الاسم (accessible name) بتاع الجدول، ولازم يبقى أول حاجة جوه [[<table>]]. ولو مش عايزه يبان، خبيه بـ [[sr-only]] بدل ما تشيله.

الجدول البسيط (صف عناوين واحد فوق) المتصفح غالبًا بيخمّن الـ scope صح لوحده، بس [[scope]] بيخليه أكيد، وضروري لو فيه عناوين صفوف. والجداول المعقدة (عنوانين متداخلين) محتاجة [[headers]] و [[id]]، بس الأحسن تقسمها لجداول أبسط.

و [[colspan]] و [[rowspan]] بيدمجوا خلايا. و [[tfoot]] للمجموع، وبيتقري في آخر الجدول.`,
            when: R`أي بيانات القارئ ممكن يقارن فيها بين صفوف أو أعمدة. لو كل عنصر ليه صورة ووصف وزرار (كروت منتجات)، ده مش جدول، ده list أو grid عادي.`,
            mistakes: R`جدول لتقسيم الصفحة (ده كان من 2005). [[<td><b>]] بدل [[<th>]]. من غير caption فالجدول ملوش اسم. جدول بـ divs و [[display: grid]] وبعدين محتاج [[role="table"]] و [[role="row"]] على كل حاجة. وتغيّر [[display]] بتاع [[<table>]] أو [[<tr>]] لـ block أو flex عشان الموبايل: في متصفحات (Safari بالذات، ولو في نسخ قديمة) ده كان بيشيل معنى الجدول من قارئ الشاشة، فلو عملت كده اختبر.`
          },
          teach: R`## الفكرة في سطرين

جدول فيه صف عناوين فوق، وصف بيانات، وصف مجموع تحت. كل خلية عنوان معمولة [[<th>]] ومكتوب عليها هي عنوان لعمود ولا لصف، فقارئ الشاشة يعرف كل رقم تبع إيه. فتحته في Chrome (headless) وطلّعت شجرة الـ accessibility بتاعة Chrome، وبعدين غيّرت حاجات وقارنت.

---

## ١. العناصر واحد واحد

| العنصر | اختصار إيه | دوره |
|---|---|---|
| [[<table>]] | | الجدول كله |
| [[<caption>]] | | عنوان الجدول. لازم أول حاجة جوه table |
| [[<thead>]] | table head | جزء العناوين |
| [[<tbody>]] | table body | جزء البيانات |
| [[<tfoot>]] | table foot | جزء المجموع تحت |
| [[<tr>]] | table row | صف |
| [[<th>]] | table header | خلية عنوان |
| [[<td>]] | table data | خلية بيانات |

والـ attributes:

- [[scope="col"]]: الـ th ده عنوان العمود اللي تحته. [[col]] من column.
- [[scope="row"]]: الـ th ده عنوان الصف اللي هو فيه.
- [[colspan="2"]]: الخلية دي واخدة عرض عمودين. اتقاس [[cell.colSpan]] = 2 لخلية «المجموع».

---

## ٢. الشكل الافتراضي

قست كل خلية:

| الخلية | [[font-weight]] | [[text-align]] |
|---|---|---|
| [[th]] | 700 (تقيل) | center |
| [[td]] | 400 (عادي) | start |

يعني المتصفح بيفرّق بينهم في الشكل كمان، بس الأهم الفرق في المعنى.

---

## ٣. اللي قارئ الشاشة شايفه

~~~text شجرة الـ accessibility
table "طلبات الأسبوع ده"
  caption
  rowgroup
    row
      columnheader "رقم الطلب"
      columnheader "العميل"
      columnheader "الإجمالي"
  row
    rowheader "1042"
    cell "منى علي"
    cell "1,250 ج"
  rowgroup
    row
      rowheader "المجموع"
      cell "1,250 ج"
~~~

اقراها كده:

- [[table "طلبات الأسبوع ده"]]: اسم الجدول جه من الـ caption.
- [[columnheader]]: الـ th اللي عليه [[scope="col"]].
- [[rowheader]]: الـ th اللي عليه [[scope="row"]]. فلما قارئ الشاشة يقف على «1,250 ج» يقدر يقول «الطلب 1042، الإجمالي».
- [[rowgroup]]: الـ thead والـ tfoot. (الـ tbody هنا Chrome مش بيعرضه كـ node لوحده، الصف بيبان تحت الجدول على طول.)

---

## ٤. لو كل الـ th بقوا td

~~~text شجرة الـ accessibility
table "طلبات الأسبوع ده"
  row
    cell "رقم الطلب"
    cell "العميل"
    cell "الإجمالي"
  row
    cell "1042"
    cell "منى علي"
    cell "1,250 ج"
~~~

مفيش ولا [[columnheader]] ولا [[rowheader]]: كله [[cell]]. الشكل كمان اتغيّر (كلهم 400 و start)، بس قارئ الشاشة خسر أكتر: مبقاش عارف «1,250 ج» تبع أنهي عمود.

---

## ٥. لو الـ caption برا الـ table

حطيت [[<caption>]] قبل [[<table>]] بدل جواه:

~~~text شجرة الـ accessibility
StaticText "طلبات الأسبوع ده"
table
  ...
~~~

الكلام بقى نص عادي برا، والجدول بقى [[table]] من غير اسم. ده لأن [[caption]] برا [[table]] ملوش معنى، فالمتصفح اتجاهله كعنصر وساب الكلام بس.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| اسم للجدول | [[<caption>]] أول حاجة جوه [[<table>]] |
| عنوان عمود | [[<th scope="col">]] |
| عنوان صف | [[<th scope="row">]] |
| خلية تاخد عمودين | [[colspan="2"]] |
| تقسيم الأجزاء | [[thead]] و [[tbody]] و [[tfoot]] |

- [[<td><b>]] مش بديل لـ [[<th>]]: الشكل تقيل بس قارئ الشاشة شايفه [[cell]].`,
          lines: [
            "بداية الجدول.",
            "عنوان الجدول، واسمه عند قارئ الشاشة.",
            "جزء العناوين.",
            "صف.",
            R`عنوان عمود: [[scope="col"]].`,
            "عنوان عمود تاني.",
            "عنوان عمود تالت.",
            "قفلة الصف.",
            "قفلة العناوين.",
            "جسم الجدول: البيانات.",
            "صف طلب.",
            R`رقم الطلب عنوان الصف ده: [[scope="row"]].`,
            "خلية عادية.",
            "خلية عادية.",
            "قفلة الصف.",
            "قفلة الجسم.",
            "جزء المجموع تحت.",
            "صف.",
            R`عنوان صف واخد عمودين بـ [[colspan="2"]].`,
            "المجموع.",
            "قفلة الصف.",
            "قفلة tfoot.",
            "قفلة الجدول."
          ],
          sol: R`مع [[<th scope="col">]]، تاب Accessibility بيعرض الـ role بتاع العناوين [[columnheader]]، والخلية [[cell]]، وعنوان الصف [[rowheader]]، والجدول اسمه «طلبات الأسبوع ده» من الـ caption.

لما تحوّل الـ th لـ td: العناوين بقت [[cell]] عادية، ولو قارئ الشاشة شغال هتلاحظ إنه بيقول الرقم لوحده من غير اسم العمود. ودا بالظبط الفرق اللي المستخدم الكفيف بيحس بيه.

لو الجدول ملوش اسم في تاب Accessibility، اتأكد إن الـ [[<caption>]] أول حاجة جوه [[<table>]] مش قبله.`
        },
        {
          cmd: "جدول responsive",
          title: "جدول عريض على موبايل عرضه 375",
          desc: R`الجدول مبيتكسرش زي الكلام، فعلى الموبايل بيوسّع الصفحة كلها ويعمل scroll أفقي. الحل: لفّه في [[<div>]] عليه [[overflow-x: auto]]، فالجدول هو اللي يعمل scroll جوه مكانه والصفحة تفضل ثابتة.

والـ div ده بياخد [[tabindex="0"]] عشان مستخدم الكيبورد يقدر يعمل scroll بالأسهم، و [[role="region"]] مع [[aria-labelledby]] للـ caption عشان قارئ الشاشة يعرف هو إيه.

وتحسينات: عناوين ثابتة فوق بـ [[position: sticky]]، وصفوف مخططة (zebra) بـ [[nth-child(even)]]، و hover على الصف، والأرقام [[tabular-nums]] ومحاذية للآخر. وفي Tailwind: [[overflow-x-auto]] و [[sticky top-0]] و [[even:bg-gray-50]] و [[hover:bg-gray-100]] و [[tabular-nums]].`,
          example: R`<div class="table-wrap" role="region" aria-labelledby="orders-cap" tabindex="0">
  <table>
    <caption id="orders-cap">الطلبات</caption>
    ...
  </table>
</div>
// styles.css
.table-wrap { overflow: auto; max-height: 70dvh; }
.table-wrap table { border-collapse: separate; border-spacing: 0; min-width: 40rem; width: 100%; }
.table-wrap th, .table-wrap td { padding: 0.5rem 0.75rem; text-align: start; white-space: nowrap; border-block-end: 1px solid var(--color-border); }
.table-wrap thead th { position: sticky; top: 0; z-index: 1; background: var(--color-bg); }
.table-wrap tbody tr:nth-child(even) { background: var(--color-muted); }
.table-wrap tbody tr:hover { background: var(--color-hover); }
.table-wrap .num { text-align: end; font-variant-numeric: tabular-nums; }
.table-wrap:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }`,
          try: R`اعمل جدول 8 أعمدة و 30 صف، وافتحه في وضع الموبايل في DevTools من غير الـ wrapper: الصفحة كلها بتتحرك يمين وشمال. حط الـ wrapper: الجدول بس اللي بيتحرك. وبعدين دوس Tab لحد ما الـ wrapper ياخد focus وجرّب الأسهم، وانزل تحت وشوف العناوين فاضلة فوق ولا لأ. وأخيرًا غيّر [[separate]] لـ [[collapse]] وبص على خط العناوين وانت نازل.`,
          flag: "script",
          deep: {
            why: R`لوحات الأدمن بتتفتح من الموبايل أكتر مما تتخيل. والجدول اللي بيوسّع الصفحة بيبوّظ كل حاجة تانية: الـ header بيتحرك، والأزرار بتخرج برا الشاشة. والعناوين الثابتة مهمة لأن بعد 20 صف محدش فاكر العمود التالت كان إيه.`,
            how: R`[[overflow: auto]] بيخلي الـ div ده scroll container. و [[position: sticky]] بيلزق في أقرب scroll container فوقه، فالـ th هنا بيلزق في أول الـ wrapper مش في أول الشاشة. عشان كده الـ wrapper محتاج [[max-height]]: من غيرها مفيش scroll رأسي جواه، والعناوين مش هتلزق.

[[border-collapse: collapse]] بيخلي البوردرات تتشارك بين الخلايا، وده بيخلي بوردر الـ th الـ sticky ميتحركش معاه. عشان كده [[separate]] مع [[border-spacing: 0]] والبوردر على كل خلية. والـ [[background]] على الـ th ضروري، وإلا الصفوف هتبان من ورا العنوان وهي بتعدّي.

[[tabular-nums]] بيخلي كل الأرقام نفس العرض فالأعمدة تبقى على خط واحد. و [[text-align: start]] و [[end]] بدل left و right عشان يتقلبوا لوحدهم في العربي.

و [[tabindex="0"]] على div عادي محتاج role واسم، وإلا قارئ الشاشة هيقول «clickable» أو ولا حاجة. و Chrome الحديث بيدّي الـ scroll containers focus لوحده، بس مش كل المتصفحات، فخليه صريح.

البديل التاني على الموبايل: كل صف يتحول لكارت (label و value). بيبقى أحلى في الجداول الصغيرة، بس بيضيّع المقارنة بين الصفوف، ومحتاج CSS كتير. ابدأ بالـ scroll.`,
            when: R`أي جدول أكتر من 3 أو 4 أعمدة. الـ sticky header لما الجدول أطول من الشاشة. الـ zebra في الجداول العريضة عشان العين متتوهش في الصف.`,
            mistakes: R`[[overflow-x: auto]] على [[<table>]] نفسه (مش بيشتغل، الجدول مبيعملش overflow). sticky من غير max-height على الـ wrapper. th sticky من غير background. [[border-collapse: collapse]] فالبوردر يفضل مكانه. [[text-align: left]] في موقع عربي. وتقطع الأعمدة على الموبايل بـ [[display: none]] فالمستخدم ميعرفش إنها موجودة.`
          },
          teach: R`## الفكرة في سطرين

بنلف الجدول في [[div]] بيعمل scroll لوحده، فالجدول العريض يتحرك جوه مكانه والصفحة تفضل ثابتة، وصف العناوين يفضل لازق فوق وانت نازل. جرّبت جدول 8 أعمدة و 30 صف بالـ CSS ده بالظبط في Chrome (headless) على موبايل عرضه 375، وعرّفت الألوان كده عشان الـ [[var()]] تشتغل:

~~~text style.css
:root { --color-border: #ddd; --color-bg: #fff; --color-muted: #f5f5f5; --color-hover: #eef; --color-brand: #2563eb; }
~~~

[[--color-bg]] اسمه CSS variable (متغير بيبدأ بـ [[--]])، و [[var(--color-bg)]] بتجيب قيمته. و [[:root]] هو [[<html>]]. (المتغيرات ليها درس في «الوحدات والمتغيرات».)

---

## ١. الـ HTML

~~~text index.html
<div class="table-wrap" role="region" aria-labelledby="orders-cap" tabindex="0">
  <table>
    <caption id="orders-cap">الطلبات</caption>
~~~

| الحتة | ليه |
|---|---|
| [[class="table-wrap"]] | عشان الـ CSS يمسكه |
| [[role="region"]] | يقول لقارئ الشاشة «دي منطقة» |
| [[aria-labelledby="orders-cap"]] | اسم المنطقة = كلام العنصر اللي الـ id بتاعه [[orders-cap]] (الـ caption) |
| [[tabindex="0"]] | خلي الـ div ياخد focus بـ Tab. [[0]] = بالترتيب الطبيعي |

في شجرة الـ accessibility ظهر [[region "الطلبات" focusable=true]].

---

## ٢. الـ wrapper: [[overflow: auto; max-height: 70dvh;]]

- [[overflow: auto]]: لو المحتوى أكبر من الصندوق، اعمل scroll جواه (ولو مش أكبر، متعملش scrollbar).
- [[max-height: 70dvh]]: أقصى ارتفاع 70% من ارتفاع الشاشة. [[dvh]] = 1% من ارتفاع الشاشة الظاهرة فعلًا (dynamic viewport height).

القياس:

| | عرض الصفحة كلها ([[scrollWidth]]) | عرض الشاشة |
|---|---|---|
| الجدول من غير wrapper | 648 | 375 |
| جوه الـ wrapper | 375 | 375 |

من غير الـ wrapper الصفحة كلها بقت 648 عرض، يعني scroll أفقي للصفحة كلها. معاه: الصفحة 375، والـ wrapper عرضه 359 والجدول جواه 640، فالـ 281 الزيادة بيتحركوا جوه الـ wrapper بس. وارتفاع الـ wrapper اتقاس 467 (70% من 667).

---

## ٣. الجدول: [[border-collapse: separate; border-spacing: 0; min-width: 40rem; width: 100%;]]

- [[min-width: 40rem]]: [[rem]] = حجم خط الصفحة (16px افتراضيًا)، يعني 640px على الأقل. ده اللي بيخلي الأعمدة متتزنقش.
- [[width: 100%]]: ولو المساحة أكبر من 640، املاها.
- [[border-collapse]] و [[border-spacing]]: شرحهم تحت في السطر بتاع الـ sticky.

---

## ٤. الخلايا

~~~text style.css
.table-wrap th, .table-wrap td { padding: 0.5rem 0.75rem; text-align: start; white-space: nowrap; border-block-end: 1px solid var(--color-border); }
~~~

- الفاصلة بين الـ selectors: القاعدة على الاتنين.
- [[padding: 0.5rem 0.75rem]]: قيمتين = فوق وتحت 8px، والجنبين 12px.
- [[text-align: start]]: أول السطر حسب الاتجاه، يعني يمين في العربي.
- [[white-space: nowrap]]: متكسرش الكلام على سطرين.
- [[border-block-end]]: الخط اللي **تحت** الخلية. [[block]] هو الاتجاه الرأسي و [[end]] آخره.

---

## ٥. العناوين اللازقة

~~~text style.css
.table-wrap thead th { position: sticky; top: 0; z-index: 1; background: var(--color-bg); }
~~~

- [[position: sticky]] و [[top: 0]]: العنصر يمشي عادي، ولما يوصل لأول الـ scroll container يلزق فيه.
- [[z-index: 1]]: يبقى فوق الصفوف اللي بتعدّي تحته.
- [[background]]: من غيرها الصفوف تبان من ورا العنوان. اتقاست [[rgb(255, 255, 255)]].

نزلت في الـ wrapper بالأسهم وقست:

| | [[scrollTop]] بتاع الـ wrapper | أول الـ wrapper | أول الـ th |
|---|---|---|---|
| قبل | 0 | 8 | 26 (تحت الـ caption) |
| بعد سهمين لتحت | 120 | 8 | **8** |
| بعد PageDown | 528 | 8 | **8** |

الـ caption طلع لفوق واختفى، والـ th فضل لازق في أول الـ wrapper.

### ليه [[max-height]] ضرورية؟

شلتها ونزلت الصفحة 400 بيكسل: ارتفاع الـ wrapper بقى 1103 (الجدول كله)، و [[scrollTop]] جواه فضل 0، والـ th بقى عند -338 (طلع برا الشاشة). يعني مفيش scroll رأسي جوه الـ wrapper، فالـ sticky ملوش حاجة يلزق فيها.

### ليه [[separate]] مش [[collapse]]؟

خليت خط الخلايا أحمر وتخين ونزلت، وصوّرت الجزء اللي فوق:

- مع [[collapse]]: الـ th لازق فوق بس **من غير** الخط اللي تحته، والخط فضل مكانه الأصلي واتحرك مع الصفوف.
- مع [[separate]]: الخط لازق تحت العنوان.

في collapse البوردر بيبقى مشترك بين الخلية واللي تحتها، فمش ملك الـ th لوحده عشان يتحرك معاه. و [[border-spacing: 0]] بيشيل الفراغ اللي [[separate]] بيحطه بين الخلايا.

---

## ٦. باقي السطور

| السطر | اتقاس |
|---|---|
| [[tbody tr:nth-child(even)]] (الصفوف الزوجية) | الصف 1 شفاف، والصف 2 [[rgb(245, 245, 245)]] |
| [[tbody tr:hover]] | لون الصف اللي الماوس عليه |
| [[.num { text-align: end; font-variant-numeric: tabular-nums; }]] | محاذاة [[end]] (شمال في العربي)، وكل رقم نفس العرض |
| [[.table-wrap:focus-visible]] | بعد Tab: outline [[solid rgb(37, 99, 235)]] |

---

## ٧. بالكيبورد

دوست Tab لحد ما الـ wrapper اتعلّم، وبعدين الأسهم:

~~~text الناتج
سهم شمال مرة:    scrollLeft = -40
سهم شمال مرتين:  scrollLeft = -80
~~~

كل سهم 40 بيكسل. والرقم بالسالب لأن الصفحة RTL: الـ scroll بيبدأ من اليمين (0) ويمشي ناحية الشمال بالسالب.

---

## الخلاصة

| عايز | الحل |
|---|---|
| الصفحة متتوسعش | wrapper بـ [[overflow: auto]] |
| العناوين تلزق | [[position: sticky; top: 0]] + [[max-height]] على الـ wrapper + [[background]] |
| الخط يلزق مع العنوان | [[border-collapse: separate; border-spacing: 0]] |
| الكيبورد يعمل scroll | [[tabindex="0"]] و [[role="region"]] واسم |`,
          lines: [
            R`الـ wrapper: منطقة ليها اسم، وبتاخد focus عشان الكيبورد يعمل scroll.`,
            "الجدول نفسه جوه.",
            R`الـ caption ليه id عشان الـ wrapper ياخد اسمه منه.`,
            "الصفوف (زي الدرس اللي فات).",
            "قفلة الجدول.",
            "قفلة الـ wrapper.",
            R`الـ scroll جوه الـ wrapper في الاتجاهين، وأقصى ارتفاع 70% من الشاشة عشان الـ sticky يشتغل.`,
            R`عرض أدنى للجدول (غير كده الأعمدة هتتزنق)، و [[separate]] عشان البوردر يتحرك مع العنوان الـ sticky.`,
            R`مسافات، ومحاذاة للبداية (يمين في العربي)، ومن غير كسر سطر، وخط تحت كل خلية.`,
            R`العناوين بتلزق فوق وهي جوه الـ wrapper، وخلفية عشان الصفوف متبانش من وراها.`,
            "الصفوف الزوجية بلون خفيف (zebra).",
            "الصف اللي الماوس عليه بيتلوّن.",
            "أعمدة الأرقام: للآخر وكل الأرقام نفس العرض.",
            "لما الـ wrapper ياخد focus من الكيبورد يبان."
          ],
          sol: R`من غير الـ wrapper: الصفحة كلها بيبقى فيها scroll أفقي، والـ header واللينكات بيتحركوا مع الجدول. مع الـ wrapper: الصفحة ثابتة، والجدول بس اللي بيتحرك جوه مكانه.

بالكيبورد: Tab بيوصل للـ wrapper وبيظهر عليه outline، والأسهم يمين وشمال وتحت وفوق بتعمل scroll. قارئ الشاشة بيقول «الطلبات، region».

وانت نازل: العناوين فاضلة فوق الـ wrapper. لو مش لازقة، يبقى الـ wrapper ملوش [[max-height]] (فالـ scroll بيحصل في الصفحة مش جواه). ومع [[collapse]] هتلاقي خط تحت العناوين فاضل مكانه والعناوين طالعة من غيره: ده السبب إننا استخدمنا [[separate]].`
        },
        {
          cmd: "ترتيب وصفحات في الـ URL",
          title: "جدول بيترتب ويتقسم صفحات، والرابط فاكر مكانك",
          desc: R`حالة الجدول (مترتب بإيه، وأنهي صفحة، وبتدوّر على إيه) مكانها الـ URL: [[?sort=price&dir=desc&page=2]]. كده الـ refresh مبيرجّعكش للأول، وزرار Back بيشتغل، وتقدر تبعت اللينك لزميلك يشوف نفس اللي انت شايفه.

الترتيب: [[<button>]] جوه الـ [[<th>]] (عشان يتضغط بالكيبورد)، و [[aria-sort="ascending"]] أو [[descending]] على الـ th المترتب بيه بس.

ولو البيانات كبيرة (آلاف الصفوف)، الترتيب والتقسيم بيحصلوا في السيرفر (LIMIT و OFFSET أو cursor، في «تاب SQL و Prisma»)، والصفحة بتبعت الـ query بس. وفي React فيه TanStack Table: مكتبة headless بتدّيك منطق الترتيب والفلترة والصفحات، وانت اللي بترسم الـ HTML (راجع «تاب React» لـ TanStack Query من نفس العيلة).`,
          example: R`const COLS = ['name', 'price', 'stock'];
function readState(search = location.search) {
  const p = new URLSearchParams(search);
  const sort = COLS.includes(p.get('sort')) ? p.get('sort') : 'name';
  const dir = p.get('dir') === 'desc' ? 'desc' : 'asc';
  const page = Math.max(1, Number.parseInt(p.get('page'), 10) || 1);
  return { sort, dir, page };
}
document.querySelector('thead').addEventListener('click', (e) => {
  const col = e.target.closest('button')?.closest('th')?.dataset.col;
  if (!col) return;
  const s = readState();
  const p = new URLSearchParams(location.search);
  p.set('sort', col);
  p.set('dir', s.sort === col && s.dir === 'asc' ? 'desc' : 'asc');
  p.delete('page');
  history.pushState(null, '', '?' + p);
  render();
});
window.addEventListener('popstate', render);
function render() {
  const { sort, dir } = readState();
  for (const th of document.querySelectorAll('thead th[data-col]')) {
    if (th.dataset.col === sort) th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    else th.removeAttribute('aria-sort');
  }
  // وارسم الصفوف: view(rows, readState()) وحط النتيجة في tbody
}`,
          try: R`اكتب الدالة [[view(rows, state, perPage)]] اللي بترتب الصفوف حسب [[sort]] و [[dir]] وترجع صفوف الصفحة المطلوبة وعدد الصفحات. جرّبها في node على 5 منتجات بـ [[readState('?sort=price&dir=desc&page=2')]] و [[perPage = 2]]، وكمان على [[?page=99]] و [[?sort=hack]].`,
          flag: "script",
          deep: {
            why: R`أشهر شكوى في لوحات الأدمن: «رتّبت وفلترت ودخلت على طلب ورجعت، لقيت كل حاجة راحت». لو الحالة في [[useState]] بس، أي refresh أو Back بيمسحها. الـ URL هو الـ state الوحيد اللي بيعيش مع الـ refresh والـ history والمشاركة.`,
            how: R`[[URLSearchParams]] بيقرا ويكتب الـ query بأمان (بيعمل encode للعربي والمسافات). [[history.pushState]] بيغيّر الـ URL من غير reload وبيضيف خطوة في الـ history، و [[replaceState]] بيغيّره من غير خطوة (مناسب للكتابة في البحث حرف حرف). و [[popstate]] بيحصل لما المستخدم يدوس Back أو Forward، فبترسم تاني من الـ URL.

كل حاجة جاية من الـ URL مدخلات من المستخدم: عشان كده [[COLS.includes]] (قايمة بالأعمدة المسموحة) و [[parseInt]] مع حد أدنى. ولو الـ sort بيتحط في SQL من غير تحقق، دي SQL injection.

لما الترتيب يتغير، الصفحة ترجع للأولى ([[p.delete('page')]])، وإلا هتفضل في صفحة 7 من ترتيب جديد ملوش علاقة.

[[aria-sort]] بيتحط على عمود واحد بس في المرة، وقارئ الشاشة بيقول «السعر، ascending». والزرار جوه الـ th مش الـ th نفسه اللي بيتضغط، عشان ياخد focus ويشتغل بـ Enter.

في Next.js الصفحة (server component) بتستلم [[searchParams]] وتجيب الصفحة المطلوبة بس من الداتابيز، واللينكات بين الصفحات [[<Link href="?page=3">]] (تفاصيل في «تاب Next.js»). وفي client component بتقرا بـ [[useSearchParams]] وتكتب بـ [[router.replace]].`,
            when: R`أي جدول فيه ترتيب أو فلترة أو صفحات. لو الصفوف أقل من كام مية، رتّب وقسّم في المتصفح. لو أكتر، في السيرفر. و TanStack Table لما يبقى عندك جداول كتير بمميزات كتير (إخفاء أعمدة، اختيار صفوف، فلترة لكل عمود)، مش لجدول واحد بسيط.`,
            mistakes: R`الحالة في state بس فتضيع مع الـ refresh. تثق في [[?sort=]] وتحطه في SQL. متصفّرش الصفحة لما الترتيب يتغير. [[pushState]] مع كل حرف في البحث فالـ Back يبقى 20 ضغطة. تعمل الـ th كله clickable من غير زرار. [[aria-sort]] على كل الأعمدة. وتجيب 10,000 صف للمتصفح عشان تعرض 20. وسؤال انترفيو: «offset ولا cursor pagination؟» offset سهل ويدّيك «صفحة 7 من 20» بس بيبطأ في الصفحات البعيدة وبيكرر أو يفوّت صفوف لو البيانات بتتغير، و cursor سريع وثابت بس مفيهوش «روح لصفحة 7».`
          },
          teach: R`## الفكرة في سطرين

حالة الجدول (مترتب بأنهي عمود، وتصاعدي ولا تنازلي، وفي أنهي صفحة) مكتوبة في الـ URL بعد الـ [[?]]. الكود فيه 3 أجزاء: دالة بتقرا الحالة من الـ URL، وضغطة على عنوان عمود بتكتب حالة جديدة في الـ URL، ودالة رسم بتحط [[aria-sort]]. جرّبت [[readState]] و [[view]] (من الحل) في Node، وجرّبت الضغطات والـ Back في Chrome (headless) على جدول عناوينه كده:

~~~text index.html
<th data-col="name"><button>الاسم</button></th>
<th data-col="price"><button>السعر</button></th>
<th data-col="stock"><button>المخزون</button></th>
~~~

[[data-col]] attribute من عندنا: أي attribute بيبدأ بـ [[data-]] مسموح تخترعه، وبتقراه من JavaScript بـ [[el.dataset.col]].

---

## ١. شكل الـ query

~~~text الـ URL
/orders?sort=price&dir=desc&page=2
~~~

بعد [[?]] أزواج [[key=value]] بينهم [[&]]. [[desc]] اختصار descending (تنازلي، من الكبير للصغير)، و [[asc]] ascending (تصاعدي).

---

## ٢. [[readState]]: اقرا الحالة بأمان

~~~text app.js
const COLS = ['name', 'price', 'stock'];
function readState(search = location.search) {
  const p = new URLSearchParams(search);
  const sort = COLS.includes(p.get('sort')) ? p.get('sort') : 'name';
  const dir = p.get('dir') === 'desc' ? 'desc' : 'asc';
  const page = Math.max(1, Number.parseInt(p.get('page'), 10) || 1);
  return { sort, dir, page };
}
~~~

- [[search = location.search]]: باراميتر ليه قيمة افتراضية. [[location.search]] هو الجزء من [[?]] لآخره. والقيمة الافتراضية دي هي اللي خلتني أجرّب الدالة في Node وأديها string بإيدي.
- [[new URLSearchParams(search)]]: بيفك الـ query، و [[p.get('sort')]] بيرجّع القيمة أو [[null]] لو مش موجودة.
- [[COLS.includes(...)]]: القيمة في قايمة المسموح؟ وإلا [[name]]. ده اسمه allowlist.
- [[dir]]: [[desc]] بالظبط وإلا [[asc]].
- [[Number.parseInt(x, 10)]]: حوّل لرقم صحيح بالنظام العشري (الـ [[10]]). لو مش رقم بيرجّع [[NaN]]، و [[|| 1]] بتاخد 1 بداله (لأن NaN بيتعامل كـ false). و [[Math.max(1, ...)]] بيرجّع الأكبر، فأي رقم أقل من 1 يبقى 1.
- [[return { sort, dir, page }]]: object، و [[{ sort }]] اختصار [[{ sort: sort }]].

اللي رجع في Node:

| الـ query | النتيجة |
|---|---|
| [[?sort=price&dir=desc&page=2]] | [[{ sort: 'price', dir: 'desc', page: 2 }]] |
| [[?sort=hack&page=-3]] | [[{ sort: 'name', dir: 'asc', page: 1 }]] |
| [[?page=abc&dir=DESC]] | [[{ sort: 'name', dir: 'asc', page: 1 }]] |
| [[?page=2.7]] | [[page: 2]] |
| [[?page=99]] | [[page: 99]] (القص لآخر صفحة بيحصل في [[view]]) |

لاحظ [[DESC]] بحروف كبيرة اترفضت: المقارنة [[===]] حساسة لحالة الحروف.

---

## ٣. الضغطة على عنوان

~~~text app.js
document.querySelector('thead').addEventListener('click', (e) => {
  const col = e.target.closest('button')?.closest('th')?.dataset.col;
  if (!col) return;
~~~

listener واحد على الـ [[thead]] كله بدل واحد لكل زرار (اسمها event delegation). السطر الطويل من الشمال لليمين:

1. [[e.target]]: العنصر اللي اتضغط بالظبط.
2. [[.closest('button')]]: أقرب [[button]] من العنصر ده لفوق (أو هو نفسه). لو الضغطة مش على زرار بيرجّع [[null]].
3. [[?.]]: اسمها optional chaining: لو اللي قبلها [[null]] وقّف ورجّع [[undefined]] بدل ما الكود يقع.
4. [[.closest('th')]]: الـ th اللي فيه الزرار.
5. [[.dataset.col]]: قيمة [[data-col]].

و [[if (!col) return]]: لو مفيش عمود، اخرج.

~~~text app.js
  const s = readState();
  const p = new URLSearchParams(location.search);
  p.set('sort', col);
  p.set('dir', s.sort === col && s.dir === 'asc' ? 'desc' : 'asc');
  p.delete('page');
  history.pushState(null, '', '?' + p);
  render();
});
~~~

- [[p.set]] بيغيّر قيمة (أو يضيفها)، و [[p.delete]] بيشيلها.
- [[&&]] يعني «و»: نفس العمود **و** كان تصاعدي؟ يبقى تنازلي. أي حاجة تانية: تصاعدي.
- [[history.pushState(null, '', '?' + p)]]: غيّر الـ URL من غير reload، وضيف خطوة في الـ history. [[p]] لما يتلزق في string بيتحوّل لـ [[sort=...&dir=...]].

---

## ٤. [[render]] و [[popstate]]

~~~text app.js
window.addEventListener('popstate', render);
function render() {
  const { sort, dir } = readState();
  for (const th of document.querySelectorAll('thead th[data-col]')) {
    if (th.dataset.col === sort) th.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    else th.removeAttribute('aria-sort');
  }
}
~~~

- [[popstate]]: الحدث اللي بيحصل لما المستخدم يدوس Back أو Forward.
- [[const { sort, dir } = readState()]]: destructuring: خد الخانتين دول من الـ object في متغيرين بنفس الاسم.
- [[th[data-col]]]: كل th عليه الـ attribute ده.
- [[aria-sort]] على العمود المترتب بيه بس، وبيتشال من الباقي.

---

## ٥. اللي حصل في المتصفح

| الخطوة | الـ URL | [[aria-sort]] |
|---|---|---|
| فتحت الصفحة | (فاضي) | name: ascending |
| ضغطت «السعر» | [[?sort=price&dir=asc]] | price: ascending |
| ضغطت «السعر» تاني | [[?sort=price&dir=desc]] | price: descending |
| زوّدت [[&page=4&q=سماعة]] وضغطت «الاسم» | [[?sort=name&dir=asc&q=...]] | name: ascending |
| Back | [[?sort=price&dir=desc&page=4&q=...]] | price: descending |
| Back | [[?sort=price&dir=asc]] | price: ascending |
| Refresh | [[?sort=price&dir=asc]] | price: ascending |

- الـ [[page]] اتمسحت لما الترتيب اتغيّر، والـ [[q]] (البحث) فضلت لأننا بدأنا من نسخة الـ query الحالية.
- الـ [[q]] ظهرت [[%D8%B3...]]: ده الـ encoding بتاع «سماعة» عشان الـ URL ميبقاش فيه حروف غير ASCII.
- الـ Back رجّع كل حالة قديمة، والـ refresh مضيّعش حاجة.

---

## ٦. [[view]] من الحل

| الاستدعاء | الصفوف | page | pages |
|---|---|---|---|
| [[?sort=price&dir=desc&page=2]] و 2 في الصفحة | شاحن 250، ماوس 180 | 2 | 3 |
| [[?page=99]] و 2 في الصفحة | ماوس 180 | 3 | 3 |

- [[toSorted]]: ترتيب في نسخة جديدة (الأصل ميتغيّرش).
- [[a[sort] - b[sort]]] للأرقام: سالب يعني a قبل b.
- [[localeCompare(b, 'ar')]] للكلام: ترتيب القاموس العربي. الفرق بيبان مع الهمزات:

~~~text الناتج في Node
sort() عادي:     آمنة أحمد إبراهيم ابتسام بسمة ياسر
localeCompare:   آمنة ابتسام إبراهيم أحمد بسمة ياسر
~~~

الـ [[sort()]] العادي رتّب بأرقام الحروف في Unicode، فـ «أ» و «إ» جم قبل «ا».

- [[Math.ceil(5 / 2)]] = 3: [[ceil]] بيقرّب لفوق. و [[Math.min(page, pages)]] بيقص 99 لـ 3.
- [[slice((p - 1) * perPage, p * perPage)]]: صفحة 2 بـ 2 في الصفحة = من 2 لـ 4 (من غير 4)، يعني الصف التالت والرابع.

---

## الخلاصة

| الحتة | الدور |
|---|---|
| [[URLSearchParams]] | يقرا ويكتب الـ query |
| allowlist و [[Math.max]] | أي حاجة جاية من الـ URL مدخلات مش مضمونة |
| [[pushState]] | URL جديد من غير reload وبخطوة في الـ history |
| [[popstate]] | ارسم تاني لما Back أو Forward |
| [[p.delete('page')]] | ترتيب جديد = صفحة أولى |
| [[aria-sort]] | على عمود واحد بس |`,
          lines: [
            R`الأعمدة المسموح الترتيب بيها. أي حاجة تانية في الـ URL بتتجاهل.`,
            "بتقرا الحالة من الـ URL.",
            "بتفك الـ query.",
            R`عمود الترتيب لو مسموح، غير كده [[name]].`,
            R`الاتجاه: [[desc]] أو [[asc]] بس.`,
            "رقم الصفحة، ولو مش رقم أو أقل من 1 يبقى 1.",
            "ترجع الحالة.",
            "قفلة.",
            "ضغطة على أي حاجة في العناوين...",
            R`...لو كانت على زرار جوه th عليه [[data-col]]، خد اسم العمود.`,
            "مش زرار ترتيب؟ اخرج.",
            "الحالة الحالية.",
            "نسخة من الـ query عشان نعدّلها ونسيب الباقي (زي البحث).",
            "العمود الجديد.",
            "نفس العمود وكان تصاعدي؟ يبقى تنازلي. غير كده تصاعدي.",
            "الترتيب اتغير، فارجع للصفحة الأولى.",
            "غيّر الـ URL من غير reload، وضيف خطوة في الـ history.",
            "ارسم.",
            "قفلة.",
            "Back و Forward: ارسم من الـ URL تاني.",
            "الرسم.",
            "الحالة من الـ URL.",
            "لكل عنوان بيترتب...",
            R`العمود المترتب بيه ياخد [[aria-sort]]...`,
            "...والباقي من غيره.",
            "قفلة الـ for.",
            "قفلة."
          ],
          sol: R`على 5 منتجات (سماعة 450، ماوس 180، كيبورد 900، شاحن 250، كابل 60) بـ [[?sort=price&dir=desc&page=2]] و 2 في الصفحة: الترتيب تنازلي 900، 450، 250، 180، 60، فصفحة 2 فيها الشاحن (250) والماوس (180)، و [[pages]] بـ 3.

[[?sort=hack&page=-3]] بيرجع [[{ sort: 'name', dir: 'asc', page: 1 }]]، و [[?page=99]] بيرجع آخر صفحة (3) مش صفحة فاضية.

الغلط الشائع: ترتيب الأسماء العربي بـ [[a < b]] أو [[sort()]] من غير دالة، فالترتيب يمشي بأكواد الحروف. [[localeCompare(b, 'ar')]] بترتب زي القاموس. والغلط التاني: [[rows.sort()]] بيغيّر المصفوفة الأصلية، و [[toSorted()]] بيرجّع نسخة.`,
          solCode: R`function view(rows, { sort, dir, page }, perPage = 20) {
  const sorted = rows.toSorted((a, b) => {
    const r = typeof a[sort] === 'number' ? a[sort] - b[sort] : a[sort].localeCompare(b[sort], 'ar');
    return dir === 'asc' ? r : -r;
  });
  const pages = Math.max(1, Math.ceil(sorted.length / perPage));
  const p = Math.min(page, pages);
  return { rows: sorted.slice((p - 1) * perPage, p * perPage), page: p, pages };
}
const rows = [
  { name: 'سماعة', price: 450, stock: 12 },
  { name: 'ماوس', price: 180, stock: 0 },
  { name: 'كيبورد', price: 900, stock: 5 },
  { name: 'شاحن', price: 250, stock: 30 },
  { name: 'كابل', price: 60, stock: 100 },
];
console.log(view(rows, readState('?sort=price&dir=desc&page=2'), 2));
// { rows: [ شاحن 250, ماوس 180 ], page: 2, pages: 3 }`
        }
      ]
    }
]);
