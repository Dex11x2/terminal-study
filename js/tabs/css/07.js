// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "position و responsive",
      l: 1,
      n: "position بيطلّع العنصر من الترتيب العادي، و media queries بتغيّر الشكل حسب الشاشة",
      items: [
        {
          cmd: "position: absolute",
          title: "حط شارة على ركن الكارت بالظبط",
          desc: R`[[position: relative]] العنصر في مكانه العادي، بس بيبقى «مرجع» لأي ابن [[absolute]]. [[position: absolute]] بيطلّع العنصر من الترتيب خالص (الباقي بيتصرف كأنه مش موجود)، ومكانه بيتحسب من أقرب جد عليه position غير [[static]].

عشان كده النمط المشهور: الأب [[relative]] والابن [[absolute]] بـ [[top: 0]] و [[inset-inline-end: 0]].`,
          example: R`<article class="card">
  <span class="badge">جديد</span>
  <img src="/p.webp" alt="سماعة" width="400" height="300">
  <a class="stretched" href="/products/42">سماعة لاسلكي</a>
</article>
<style>
  .card { position: relative; }
  .badge { position: absolute; top: 0.5rem; inset-inline-end: 0.5rem; }
  .stretched::after { content: ""; position: absolute; inset: 0; }
  .overlay { position: absolute; inset: 0; background: rgb(0 0 0 / 0.5); }
</style>`,
          try: R`امسح [[position: relative]] من الكارت وشوف الشارة طارت لركن الصفحة (أو لأقرب جد relative). وبعدين دوس على أي مكان في الكارت: اللينك بيشتغل بسبب [[::after]].`,
          flag: "script",
          deep: {
            why: "فيه حاجات لازم تبقى فوق حاجات: شارة على صورة، وأيقونة جوه input، وطبقة غامقة على هيرو، وزرار X في ركن المودال. الترتيب العادي (flow) مش بيعمل ده، و absolute بيعمله بالظبط.",
            how: R`[[static]] الافتراضي: العنصر في الـ flow، و top و left ملهمش تأثير. [[relative]]: في الـ flow ومكانه محجوز، و top و left بيزقوه بصريًا بس من غير ما يأثروا على الباقي. [[absolute]]: برا الـ flow، ومكانه بيتحسب من الـ containing block، اللي هو أقرب جد position بتاعه مش static. لو مفيش، بيتحسب من أول الصفحة.

[[inset]] اختصار للأربعة، و [[inset: 0]] مع absolute = غطّي الأب كله. و [[inset-inline-start]] و [[inset-inline-end]] بيتقلبوا مع [[dir]]، فالشارة تفضل في ركن «النهاية» في العربي والإنجليزي من غير تعديل.

العنصر الـ absolute عرضه بيبقى قد محتواه مش قد الأب، إلا لو حددت left و right الاتنين أو width.

وفيه حاجات تانية بتعمل containing block للـ absolute: [[transform]] و [[filter]] على الجد. ودا مهم أكتر مع [[fixed]] (الدرس الجاي).

في Tailwind: [[relative]] و [[absolute]] و [[inset-0]] و [[top-2]] و [[inset-e-2]] (من v4.2 بدل [[end-2]] اللي بقت deprecated).`,
            when: "عنصر فوق عنصر جوه حدود الأب: شارات، وأيقونات جوه حقول، و overlays، وزرار إغلاق، وكارت كله clickable.",
            mistakes: R`absolute من غير أب relative فالعنصر يروح مكان غريب. absolute للـ layout العادي (أعمدة وكروت) فأي تغيير في الكلام يبوّظ كل حاجة: ده شغل flex و grid. و [[right: 0]] في موقع عربي وإنجليزي فالشارة في نفس الناحية في اللغتين.`
          },
          teach: R`## الشارة بتتحط بالأرقام، بس من أنهي نقطة؟

[[position: absolute]] بيقول للعنصر: «اطلع من الترتيب العادي، واتحط على بُعد كذا من حافة **مرجع**». والسؤال كله: مين المرجع؟ حطينا المثال في صفحة عرضها 1200 وارتفاعها 800، والكارت عرضه 400 ونازل 100px من فوق، وقسنا كل حاجة بـ [[getBoundingClientRect()]].

---

## ١. الـ HTML

~~~text index.html
<article class="card">
  <span class="badge">جديد</span>
  <img src="/p.webp" alt="سماعة" width="400" height="300">
  <a class="stretched" href="/products/42">سماعة لاسلكي</a>
</article>
~~~

[[<article>]] عنصر لمحتوى قايم بذاته (كارت منتج). جواه شارة، وصورة، ولينك واحد.

## ٢. [[.card { position: relative; }]]

[[relative]] لوحدها مش بتحرك الكارت ولا مليمتر: هو لسه في مكانه، والكارت فضل عند left = 50 و top = 100. فايدتها إنها بتخلي الكارت **مرجع** لأي ابن absolute. والمرجع ده اسمه containing block.

## ٣. [[.badge { position: absolute; top: 0.5rem; inset-inline-end: 0.5rem; }]]

- [[absolute]]: الشارة طلعت من الترتيب، والصورة طلعت لفوق مكانها كأنها مش موجودة.
- [[top: 0.5rem]]: 8px تحت حافة الكارت اللي فوق.
- [[inset-inline-end: 0.5rem]]: 8px من حافة **نهاية السطر**. [[inline]] = اتجاه الكلام، و [[end]] = نهايته: يمين في الإنجليزي، شمال في العربي.

| الصفحة | الكارت | الشارة |
|---|---|---|
| ltr | من 50 لـ 450 | من 418.81 لـ 442، و top = 108 |
| rtl | من 750 لـ 1150 | من 758، و top = 108 |

في ltr الشارة آخرها 442 = 450 - 8، وفي rtl أولها 758 = 750 + 8. نفس السطر، والناحية اتقلبت لوحدها.

## ٤. [[.stretched::after { content: ""; position: absolute; inset: 0; }]]

- [[::after]] اسمه pseudo-element: عنصر وهمي المتصفح بيعمله جوه اللينك، بعد كلامه. ومبيظهرش إلا لو ليه [[content]]، حتى لو فاضي [[""]].
- [[inset: 0]] اختصار [[top: 0; right: 0; bottom: 0; left: 0]]: اتمد على المرجع كله.

المرجع هنا الكارت (اللينك نفسه مش عليه position)، فالـ ::after بقى طبقة شفافة فوق الكارت كله:

~~~text الناتج
::after  position: absolute   width: 400px   height: 318px
العنصر اللي تحت الماوس فوق الصورة: A.stretched
~~~

[[document.elementFromPoint(x, y)]] دالة بترجع العنصر اللي فوق خالص عند النقطة دي. فوق الصورة رجعت اللينك، يعني الضغطة هناك بتفتح المنتج.

## ٥. [[.overlay { position: absolute; inset: 0; background: rgb(0 0 0 / 0.5); }]]

طبقة غامقة على الأب كله. [[rgb(0 0 0 / 0.5)]] = أسود (أحمر وأخضر وأزرق صفر)، والرقم بعد [[/]] الشفافية: 0.5 يعني نص. جربناها في أب 300 × 200 relative: طلعت 300 × 200 بالظبط من نقطة (0، 0)، ولونها [[rgba(0, 0, 0, 0.5)]].

---

## التجربة: نشيل [[position: relative]] من الكارت

| | مع relative | من غيره |
|---|---|---|
| الشارة (ltr) | left 418.81، top 108 | left 1168.81، top 8 |
| الشارة (rtl) | left 758، top 108 | left 8، top 8 |
| مقاس الـ ::after | 400 × 318 | 1200 × 800 |
| ضغطة برا الكارت خالص | div عادي | A.stretched |

من غير مرجع، الاتنين اتحسبوا من أول شاشة في الصفحة (اسمها initial containing block، قد الـ viewport): الشارة طارت لركن الصفحة، واللينك الوهمي غطى أول شاشة كلها.

## الخلاصة

| القيمة | في الترتيب؟ | top و left بيتحسبوا من |
|---|---|---|
| [[static]] (الافتراضي) | آه | ملهمش تأثير |
| [[relative]] | آه، ومكانه محجوز | مكانه هو |
| [[absolute]] | لأ | أقرب جد position بتاعه مش static |

- النمط: الأب [[relative]] والابن [[absolute]].
- [[inset-inline-end]] بدل [[right]] عشان العربي والإنجليزي.`,
          lines: [
            "الكارت.",
            "الشارة.",
            "صورة المنتج.",
            "اسم المنتج لينك.",
            "قفلة.",
            "CSS.",
            "الكارت مرجع للأولاد الـ absolute، ومكانه هو متغيرش.",
            "الشارة: فوق بنص rem، وعلى ناحية النهاية (يمين في الإنجليزي، شمال في العربي).",
            "الكارت كله يبقى clickable: طبقة شفافة من اللينك مغطية الكارت، والـ HTML لسه لينك واحد صح.",
            R`طبقة غامقة على الأب كله. [[inset: 0]] = top و right و bottom و left كلهم صفر.`,
            "قفلة."
          ],
          sol: R`بـ [[position: relative]]: شارة «جديد» في ركن الكارت فوق، ناحية نهاية السطر (الشمال في صفحة rtl، واليمين في ltr) لأن [[inset-inline-end]] منطقية. بعد ما تمسحه: الشارة بتطير لركن الصفحة فوق خالص (أو لركن أقرب جد عليه position غير static)، لأن الـ absolute بيتحسب من أقرب أب positioned، ولو مفيش بيتحسب من الصفحة.

والحاجة اللي ممكن متاخدش بالك منها: الـ [[::after]] بتاع اللينك برضه بقى [[inset: 0]] على أول شاشة من الصفحة كلها (الـ initial containing block)، يعني أي ضغطة في أي حتة فيها بتفتح المنتج، حتى برا الكارت. ترجّع الـ relative وتدوس على الصورة أو على فراغ في الكارت: اللينك بيشتغل والماوس بيبقى إيد، وده من [[::after]] اللي مغطي الكارت.

لو اللينك مش بيشتغل لما تدوس على الصورة، غالبًا فيه عنصر تاني عليه position وجاي بعد اللينك في الـ HTML فهو فوقه، أو الـ card ناقصها relative.`
        },
        {
          cmd: "sticky و fixed",
          title: "هيدر ثابت وانت بتعمل scroll",
          desc: R`[[position: fixed]] ثابت في الشاشة نفسها مهما عملت scroll (هيدر، أو زرار واتساب في الركن). وبيطلع من الـ flow، فلازم تسيب مكانه بـ padding.

[[position: sticky]] عادي في مكانه لحد ما يوصل لحد معين ([[top: 0]])، ساعتها يلزق وانت نازل، ويفضل لازق لحد ما أبوه يخلص. مش بياخد مكان حد ومش محتاج padding.`,
          example: R`.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(12px);
}
.whatsapp {
  position: fixed;
  bottom: 1rem;
  inset-inline-end: 1rem;
}
.table th { position: sticky; top: 0; }`,
          try: R`اعمل صفحة طويلة بالهيدر ده، وبعدين حط [[overflow: hidden]] على div بيلف الصفحة كلها: الـ sticky هيبطّل. غيّره لـ [[overflow: clip]] وشوفه رجع يشتغل.`,
          flag: "script",
          deep: {
            why: R`الهيدر الثابت والأزرار العايمة موجودين في كل موقع تقريبًا. وأشهر شكوى: «الـ sticky مش شغال»، وليها أسباب محددة لو عرفتها مش هتضيّع ساعة.`,
            how: R`[[fixed]]: الـ containing block بتاعه الشاشة، فبيفضل مكانه والصفحة بتتحرك تحته. وبيطلع من الـ flow، فلو هيدر fixed ارتفاعه 64، أول 64 من المحتوى هتستخبى تحته، ولازم [[padding-top]] على الـ body أو الـ main. والاستثناء المهم: لو أي جد عليه [[transform]] أو [[filter]] أو [[backdrop-filter]] أو [[will-change: transform]]، الـ fixed بيتحسب منه هو مش من الشاشة. ودا بيحصل كتير لما تحط مودال fixed جوه عنصر عليه animation بـ framer-motion (بيستخدم transform)، فالمودال يطلع جوه الكارت. الحل portal لآخر الـ body (Radix بيعمل ده).

[[sticky]]: هجين. بيتصرف relative لحد ما الـ scroll يوصّله للحد اللي حددته (لازم [[top]] أو [[bottom]]، من غيرهم مش هيلزق). وبيلزق جوه حدود أبوه بس: لما الأب يخلص يمشي معاه، عشان كده sticky جوه div قد ارتفاعه بالظبط مش هيعمل حاجة.

والسبب التاني: sticky بيلزق بالنسبة لأقرب جد «بيعمل scroll». أي جد عليه [[overflow: hidden]] أو [[auto]] بيبقى هو الـ scroll container، ولو هو نفسه مش بيعمل scroll، الـ sticky مش هيتحرك. [[overflow: clip]] بيقص زي hidden بس مش بيعمل scroll container.

و [[backdrop-filter]] على الهيدر شكله حلو بس تقيل على الموبايلات الضعيفة، لأن المتصفح بيعيد حساب الـ blur مع كل scroll.`,
            when: "sticky للهيدر والـ sidebar وعناوين الجداول وعناوين الأقسام في قايمة طويلة. fixed للأزرار العايمة، والمودال والـ overlay (أحسن في portal)، والإشعارات.",
            mistakes: R`sticky من غير [[top]]. جد عليه [[overflow-x: hidden]] (اتحط عشان يمنع scroll أفقي) فالـ sticky يموت: استخدم [[overflow-x: clip]]. وهيدر fixed من غير padding فأول عنوان في الصفحة مستخبي تحته.`
          },
          teach: R`## عنصرين بيفضلوا ظاهرين وانت بتعمل scroll

حطينا المثال في صفحة [[dir="rtl"]] عرضها 1200 وارتفاعها 800، فيها الهيدر، وبعده محتوى طوله 3000، وزرار الواتساب. وقسنا مكان كل عنصر **على الشاشة** بـ [[getBoundingClientRect()]] قبل الـ scroll وبعد [[scrollTo(0, 1000)]] (يعني نزلنا 1000px).

---

## ١. الهيدر

~~~text style.css
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 255 255 / 0.8);
  backdrop-filter: blur(12px);
}
~~~

- [[position: sticky]]: العنصر في مكانه العادي، لحد ما الـ scroll يوصّله للحد اللي تحت.
- [[top: 0]]: الحد = أول الشاشة. لما الهيدر يوصل له يلزق. من غير [[top]] الـ sticky مبيعملش حاجة.
- [[z-index: 10]]: يبقى فوق المحتوى اللي بيعدّي تحته (الدرس الجاي).
- [[rgb(255 255 255 / 0.8)]]: أبيض شفافيته 80%.
- [[backdrop-filter: blur(12px)]]: يغبّش اللي **ورا** العنصر بـ 12px. أبيض نص شفاف + blur = الشكل «الزجاجي».

~~~text الناتج
قبل الـ scroll:      header top: 0
بعد scroll 1000:    header top: 0   (لازق)
~~~

## ٢. زرار الواتساب

~~~text style.css
.whatsapp {
  position: fixed;
  bottom: 1rem;
  inset-inline-end: 1rem;
}
~~~

[[fixed]] = المرجع الشاشة نفسها. [[bottom: 1rem]] = 16px من تحت، و [[inset-inline-end]] = 16px من نهاية السطر (الشمال في rtl).

~~~text الناتج (قبل وبعد الـ scroll)
whatsapp left: 16   top: 766   width: 37.72   height: 18
~~~

766 + 18 = 784 = 800 - 16. ونفس الرقم بعد ما نزلنا 1000: مبيتحركش.

## ٣. [[.table th { position: sticky; top: 0; }]]

[[th]] خانة العنوان في الجدول. sticky عليها = رأس الجدول يفضل ظاهر وانت نازل في الصفوف، بس جوه حدود الجدول (sticky بيلزق جوه أبوه بس).

---

## التجربة: [[overflow]] على div بيلف الصفحة

لفّينا كل حاجة في [[<div class="wrap">]] وجربنا ٣ قيم:

| الـ wrap | header top بعد scroll 1000 | النتيجة |
|---|---|---|
| من غير overflow | 0 | لازق |
| [[overflow: hidden]] | -1000 | مشي مع الصفحة واختفى |
| [[overflow: clip]] | 0 | لازق |

ليه؟ [[overflow: hidden]] بيخلي الـ div ده **scroll container** (عنصر ممكن يعمل scroll جواه)، والـ sticky بيلزق بالنسبة لأقرب scroll container. والـ div نفسه مبيعملش scroll (الصفحة هي اللي بتتحرك)، فالهيدر مالقاش حاجة يلزق فيها. [[overflow: clip]] بيقص زي hidden بالظبط، بس مش بيعمل scroll container.

## فخ الـ fixed: [[transform]] على جد

حطينا عنصر [[position: fixed; inset: 0]] جوه div عليه [[transform: translateY(0)]] (transform مبيحركش حاجة، بس موجود):

~~~text الناتج
المتوقع:  0، 0، 1200 × 800 (الشاشة كلها)
الفعلي:   left 100، top 300، 300 × 200 (قد الـ div)
~~~

أي [[transform]] أو [[filter]] على جد بيخليه هو المرجع بدل الشاشة. عشان كده المودال بيتحط في portal في آخر الـ body.

## الخلاصة

| | في الترتيب؟ | بيلزق في |
|---|---|---|
| [[sticky]] | آه، ومحتاج [[top]] | أقرب scroll container، جوه حدود أبوه |
| [[fixed]] | لأ، فاحجز مكانه بـ padding | الشاشة (إلا لو جد عليه transform أو filter) |

- sticky مش شغال؟ دوّر على [[top]] ناقص، أو أب قد الهيدر بس، أو [[overflow]] على جد. وبدل [[overflow-x: hidden]] استخدم [[overflow-x: clip]].`,
          lines: [
            "هيدر الموقع.",
            "sticky: في مكانه العادي لحد ما يوصل للحد...",
            "...اللي هو أول الشاشة، وساعتها يلزق.",
            "فوق المحتوى اللي بيعدّي تحته.",
            "خلفية بيضا نص شفافة.",
            "blur للي تحته: الشكل «الزجاجي» المشهور.",
            "قفلة.",
            "زرار عايم.",
            "ثابت في الشاشة مهما عملت scroll.",
            "تحت بـ 16px.",
            "وعلى ناحية النهاية (بيتقلب في العربي).",
            "قفلة.",
            "رأس الجدول يفضل ظاهر وانت نازل في الصفوف."
          ],
          sol: R`الأول الهيدر بيلزق فوق وانت بتعمل scroll، ولما تنزل تحته الكلام بيبان مغبّش ورا الخلفية النص شفافة. بعد [[overflow: hidden]] على الـ div اللي بيلف الصفحة: الهيدر بيمشي مع الصفحة ويختفي فوق زي أي عنصر عادي. السبب إن [[overflow: hidden]] بيخلي الـ div ده scroll container، فالـ sticky بيلزق جواه هو، وهو نفسه مش بيعمل scroll (الصفحة هي اللي بتعمل)، فمفيش حاجة تحصل.

مع [[overflow: clip]]: الهيدر رجع يلزق. [[clip]] بيقص اللي طالع برا زي hidden بالظبط، بس من غير ما يعمل scroll container. زرار الواتساب ([[fixed]]) في الحالات التلاتة ثابت في ركن الشاشة (تحت ناحية الشمال في rtl).

لو الـ sticky مش شغال من الأول خالص، الأسباب المعتادة: ناسي [[top: 0]]، أو الأب المباشر للهيدر طوله قد الهيدر بس (sticky بيلزق جوه أبوه بس)، أو فيه [[overflow]] على أي جد فوق.`
        },
        {
          cmd: "z-index",
          title: "مين فوق مين: الطبقات في الصفحة",
          desc: R`[[z-index]] بيحدد مين فوق مين، بس بيشتغل على عنصر position بتاعه مش static (أو ابن flex أو grid). والأهم: المقارنة بتحصل جوه نفس الـ stacking context بس.

الـ stacking context زي «طبقة مقفولة»: كل اللي جواها بيترتب مع بعض، وبعدين الطبقة كلها بتترتب مع اللي برا كوحدة واحدة. فابن عليه 9999 جوه أب عليه [[z-index: 1]] عمره ما هيطلع فوق عنصر برا عليه 2.`,
          example: R`<header class="header">
  <div class="dropdown">قايمة</div>
</header>
<main class="hero">...</main>
<style>
  .header { position: relative; z-index: 1; }
  .dropdown { position: absolute; z-index: 9999; }
  .hero { position: relative; z-index: 2; }
  .card { isolation: isolate; }
  .fade-in { opacity: 0.99; transform: translateY(0); }
</style>`,
          try: R`اعمل الكود ده وشوف القايمة مستخبية تحت الهيرو رغم الـ 9999. غيّر z-index الهيدر لـ 3 وشوفها ظهرت. وبعدين ضيف [[opacity: 0.99]] على الهيدر من غير z-index وشوف إنه عمل طبقة جديدة برضه.`,
          flag: "script",
          deep: {
            why: "الـ dropdown اللي مستخبي تحت السكشن اللي بعده، والمودال اللي تحت الهيدر، مشاكل كل مشروع. والحل الغلط إنك تزوّد أصفار في الـ z-index، ومش هيشتغل مهما زوّدت، لأن المشكلة في الطبقات مش في الرقم.",
            how: R`الصفحة نفسها stacking context. وأي عنصر بيعمل context جديد لو: position (relative أو absolute) ومعاه z-index مش auto، أو position fixed أو sticky، أو ابن flex أو grid عليه z-index، أو [[opacity]] أقل من 1، أو [[transform]] أو [[filter]] أو [[backdrop-filter]] أو [[clip-path]] أو [[mask]] مش none، أو [[isolation: isolate]]، أو [[will-change]] على حاجة منهم.

جوه أي context، الترتيب من تحت لفوق: خلفية وحدود صاحب الـ context، وبعدين الأولاد اللي z-index بتاعهم سالب، وبعدين العناصر العادية، وبعدين الـ floats، وبعدين الـ inline، وبعدين الـ positioned اللي z-index بتاعهم auto أو 0 بترتيب الـ HTML، وبعدين الموجب بالترتيب.

الـ context بيتعامل كوحدة: الـ z-index بتاع أي حد جواه ملوش معنى برا. عشان كده الحل دايمًا إنك ترفع العنصر صاحب الـ context (الهيدر)، أو تطلّع العنصر برا خالص بـ portal، زي ما Radix و shadcn بيعملوا للمودال والـ dropdown: بيحطوهم في آخر الـ body.

framer-motion بيحط transform على العناصر اللي بيحركها، فبيعمل context جديد. قايمة جوه كارت متحرك ممكن تستخبى فجأة بسبب ده.`,
            when: R`خلي عندك scale صغير ثابت: 10 للـ sticky، و 40 للـ dropdown، و 50 للمودال، و 100 للـ toast. وفي Tailwind [[z-10]] و [[z-50]]. واستخدم portal لأي حاجة لازم تبقى فوق كل حاجة.`,
            mistakes: R`[[z-index: 99999]] بدل ما تفهم الطبقات. z-index على عنصر static (مش بيعمل حاجة، إلا لو ابن flex أو grid). وتنسى إن opacity و transform بيعملوا context، فبعد ما تضيف animation الترتيب يتلخبط.`
          },
          teach: R`## ليه 9999 خسرت قدام 2؟

[[z-index]] رقم بيقول مين فوق مين لما عنصرين يقعوا على نفس المكان. بس الرقم بيتقارن **جوه مجموعة** بس، والمجموعة دي اسمها stacking context. حطينا المثال في Chrome: هيدر ارتفاعه 60، وجواه قايمة حمرا 200 × 150 نازلة من top = 40 (يعني نازلة على الهيرو)، وتحته هيرو ارتفاعه 400. وسألنا المتصفح بـ [[document.elementFromPoint(50, 150)]]: مين العنصر اللي فوق خالص عند النقطة دي؟ النقطة دي جوه القايمة وجوه الهيرو في نفس الوقت.

---

## ١. الـ HTML

~~~text index.html
<header class="header">
  <div class="dropdown">قايمة</div>
</header>
<main class="hero">...</main>
~~~

القايمة **ابن** الهيدر، والهيرو **أخو** الهيدر.

## ٢. [[.header { position: relative; z-index: 1; }]]

[[z-index]] بيشتغل على عنصر عليه position (أو ابن flex أو grid). و [[relative]] مع [[z-index]] رقم = الهيدر عمل stacking context جديد. من دلوقتي الهيدر وكل اللي جواه بيتعاملوا **كطبقة واحدة رقمها 1** قدام أي حد برا.

## ٣. [[.dropdown { position: absolute; z-index: 9999; }]]

الـ 9999 بتتقارن مع إخوات القايمة جوه الهيدر بس. بالنسبة للصفحة القايمة جزء من طبقة الهيدر (1).

## ٤. [[.hero { position: relative; z-index: 2; }]]

الهيرو في نفس مستوى الهيدر (الاتنين أولاد body)، فالمقارنة 2 ضد 1: الهيرو فوق، وبيغطي القايمة.

~~~text الناتج
elementFromPoint(50, 150) → MAIN.hero
~~~

## ٥. [[.card { isolation: isolate; }]]

[[isolation: isolate]] بيعمل stacking context **من غير** z-index ومن غير ما يغيّر أي حاجة في الشكل. فايدته: الـ z-index اللي جوه الكارت ميأثرش على اللي برا.

## ٦. [[.fade-in { opacity: 0.99; transform: translateY(0); }]]

[[opacity]] الشفافية من 0 لـ 1، و [[translateY(0)]] تحريك رأسي بصفر. الاتنين مش بيغيّروا الشكل تقريبًا، بس كل واحد منهم لوحده بيعمل stacking context. ده الفخ.

---

## التجربة: غيّرنا اللي على الهيدر بس

| على [[.header]] | مين فوق عند (50، 150) |
|---|---|
| [[z-index: 1]] (المثال) | MAIN.hero |
| [[z-index: 3]] | DIV.dropdown |
| من غير z-index خالص | DIV.dropdown |
| [[opacity: 0.99]] من غير z-index | MAIN.hero |
| [[transform: translateY(0)]] من غير z-index | MAIN.hero |
| [[isolation: isolate]] من غير z-index | MAIN.hero |

- [[z-index: 3]]: الطبقة كلها بقت أعلى من 2، فالقايمة طلعت معاها.
- من غير z-index: مفيش context، فالقايمة بتتقارن بالـ 9999 مع الهيرو مباشرة وتكسب.
- opacity و transform و isolation: كل واحد عمل context (رقمه زي 0)، فالقايمة اتحبست تاني تحت الهيرو.

## الخلاصة

- الـ z-index بيتقارن جوه نفس الـ stacking context بس.
- الأب اللي عليه z-index أو opacity أقل من 1 أو transform أو filter أو isolation بيحبس أولاده جواه.
- القايمة مستخبية؟ متزوّدش أصفار: ارفع الأب صاحب الـ context، أو طلّع القايمة برا بـ portal.`,
          lines: [
            "الهيدر.",
            "قايمة بتنزل من الهيدر فوق الهيرو.",
            "قفلة.",
            "الهيرو تحت الهيدر.",
            "CSS.",
            "الهيدر عمل stacking context بـ z-index 1.",
            "9999 بس جوه طبقة الهيدر. بالنسبة للصفحة هو «1» زي أبوه.",
            "الهيرو 2 فبيغطّي الهيدر كله بما فيه القايمة. الحل: ارفع الهيدر نفسه، مش القايمة.",
            R`[[isolation: isolate]]: اعمل stacking context مقصود من غير z-index، عشان الـ z-index اللي جوه الكارت ميهربش برا.`,
            "خد بالك: opacity أقل من 1 و transform بيعملوا stacking context من غير ما تاخد بالك.",
            "قفلة."
          ],
          sol: R`بالكود زي ما هو: القايمة الحمرا اللي تحت الهيدر مستخبية ورا الهيرو، رغم الـ 9999. الهيدر عنده [[z-index: 1]] فعمل stacking context، وكل اللي جواه محبوس في الطبقة 1 كوحدة واحدة، والهيرو بـ 2 فوقها كلها. الـ 9999 بتتقارن بس مع إخوات القايمة جوه الهيدر.

غيّر الهيدر لـ 3: القايمة ظهرت فوق الهيرو، لأن الطبقة كلها بقت أعلى من 2. امسح الـ z-index من الهيدر خالص: القايمة برضه بتظهر (مفيش context، فالـ 9999 بتتقارن مع الهيرو مباشرة). ضيف [[opacity: 0.99]] من غير z-index: القايمة استخبت تاني، لأن opacity أقل من 1 بتعمل stacking context لوحدها، وكذلك [[transform]] و [[filter]] و [[isolation: isolate]].

الغلط الشائع إنك تزوّد القايمة لـ 99999: مش هيفرق أبدًا. ابحث عن الأب اللي عامل الـ context (في DevTools › Layers أو بإنك تشيل خصائص من الأب واحدة واحدة).`
        },
        {
          cmd: "media queries",
          title: "تصميم يبدأ من الموبايل ويكبر",
          desc: R`[[@media (min-width: 48rem) { ... }]] = القواعد دي تشتغل بس لما الشاشة 768 أو أكبر. mobile-first معناها تكتب الـ CSS العادي للموبايل الأول (عمود واحد، وخط أصغر)، وتضيف بـ [[min-width]] للشاشات الأكبر.

ودا نفس اللي Tailwind بيعمله: [[md:grid-cols-3]] = من md وطالع. والكلاس من غير prefix = الموبايل وكل حاجة فوقه.`,
          example: R`.products { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 40rem) {
  .products { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 64rem) {
  .products { grid-template-columns: repeat(4, 1fr); }
}
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}
@media (prefers-color-scheme: dark) {
  :root { --bg: oklch(0.17 0.03 265); }
}`,
          try: R`افتح DevTools وضع الموبايل (Ctrl+Shift+M) واسحب العرض ببطء، وشوف عدد الأعمدة بيتغير عند 640 و 1024. وبعدين من DevTools › Rendering › Emulate CSS media feature جرّب prefers-color-scheme: dark.`,
          flag: "script",
          deep: {
            why: "أكتر من نص الزيارات من الموبايل. لو بدأت من الديسكتوب، هتقعد تكتب قواعد تلغي قواعد (float none، و width auto، و display none) لحد ما الموبايل يبان كويس. من الموبايل، الأبسط هو الأساس، والشاشات الكبيرة بتضيف بس.",
            how: R`الـ media query بتتقيّم على الـ viewport (بعد meta viewport). و [[min-width: 40rem]] الـ rem فيها من خط المتصفح الافتراضي، فلو المستخدم كبّر الخط، الـ breakpoint بيتنقل معاه، ودا صح (الشاشة «بقت أضيق» بالنسبة للكلام).

الشكل الجديد [[@media (width >= 48rem)]] نفس المعنى وأوضح، وبيدعم ranges: [[(40rem <= width < 64rem)]]. و Tailwind v4 بيطلّع الشكل ده.

مش كل media queries للعرض: [[hover: hover]] و [[pointer: coarse]] بيفرّقوا الماوس عن اللمس، و [[prefers-color-scheme]] للثيم، و [[prefers-reduced-motion]] للحركة، و [[print]] للطباعة. و Tailwind v4 بيلف [[hover:]] في [[@media (hover: hover)]] لوحده، عشان على الموبايل الـ hover بيعلق بعد اللمس.

الـ breakpoints بتختارها حسب المحتوى مش حسب أجهزة معينة: صغّر الشاشة لحد ما الشكل يبوظ، وهناك حط breakpoint. وافتراضي Tailwind: [[sm]] 40rem، و [[md]] 48rem، و [[lg]] 64rem، و [[xl]] 80rem، و [[2xl]] 96rem.`,
            when: "أي موقع. ابدأ من 375px، وكبّر، وضيف breakpoint لما الشكل يحتاج. ولو المكون نفسه لازم يتغير حسب مكانه مش حسب الشاشة، استخدم container queries (المستوى التالت).",
            mistakes: R`تكتب desktop-first بـ [[max-width]] وبعدين تخلطه مع min-width، فعند 768 بالظبط قاعدتين بيشتغلوا. وفي Tailwind تفتكر [[sm:]] = الموبايل: لأ، sm = من 640 وطالع، والموبايل هو الكلاس من غير prefix. وتنسى meta viewport فالـ media queries مش بتشتغل على الموبايل أصلًا.`
          },
          teach: R`## قواعد بتشتغل بشرط

[[@media (شرط) { ... }]] = القواعد اللي جوه تشتغل بس لما الشرط يتحقق. والشرط ممكن يبقى عرض الشاشة، أو نوع الماوس، أو ثيم الجهاز. فتحنا المثال في Chrome بعروض مختلفة، وقرينا الأعمدة بـ [[getComputedStyle(...).gridTemplateColumns]]، والشروط نفسها بـ [[matchMedia("(شرط)").matches]]، ودي دالة بترجع true لو الشرط متحقق دلوقتي.

---

## ١. الأساس للموبايل (من غير أي شرط)

~~~text style.css
.products { display: grid; gap: 1rem; grid-template-columns: 1fr; }
~~~

عمود واحد. السطر ده بيشتغل على **كل** الشاشات، والشروط اللي تحت بتغطي عليه في الشاشات الأكبر.

## ٢. من 640 وطالع

~~~text style.css
@media (min-width: 40rem) {
  .products { grid-template-columns: repeat(2, 1fr); }
}
~~~

[[min-width: 40rem]] = «العرض 40rem **أو أكتر**». والـ rem جوه الـ media query بيتحسب من خط المتصفح الافتراضي (16)، يعني 640px. والقاعدة اللي جوه ليها نفس الـ specificity بتاعة الأساس وجاية بعده، فبتكسب.

## ٣. من 1024 وطالع

~~~text style.css
@media (min-width: 64rem) {
  .products { grid-template-columns: repeat(4, 1fr); }
}
~~~

64 × 16 = 1024. فوق 1024 الشرطين متحققين، والأخير في الملف بيكسب: ٤ أعمدة.

| العرض | الأعمدة المتقاسة |
|---|---|
| 375 | 375px |
| 639 | 639px |
| 640 | 312px 312px |
| 1023 | 503.5px 503.5px |
| 1024 | 244px 244px 244px 244px |
| 1440 | 348px 348px 348px 348px |

التغيير حصل عند 640 و 1024 بالظبط. و 312 = (640 - 16) ÷ 2، و 244 = (1024 - 3 × 16) ÷ 4.

## ٤. [[@media (hover: hover)]]

~~~text style.css
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}
~~~

[[hover: hover]] = الجهاز عنده حاجة تقدر «تقف» فوق العناصر (ماوس). و [[translateY(-4px)]] = حرّك العنصر 4px لفوق (السالب لفوق).

| الجهاز في التجربة | [[(hover: hover)]] | [[(pointer: coarse)]] | transform بعد الوقوف على الكارت |
|---|---|---|---|
| ديسكتوب بماوس | true | false | matrix(1, 0, 0, 1, 0, -4) |
| موبايل باللمس | false | true | none |

[[matrix(1, 0, 0, 1, 0, -4)]] هي الطريقة اللي المتصفح بيكتب بيها [[translateY(-4px)]]: آخر رقم هو التحريك الرأسي. و [[pointer: coarse]] = مؤشر «تخين» (صباع). على اللمس الكارت متحركش، فمفيش hover يعلق بعد اللمس.

## ٥. [[@media (prefers-color-scheme: dark)]]

~~~text style.css
@media (prefers-color-scheme: dark) {
  :root { --bg: oklch(0.17 0.03 265); }
}
~~~

الشرط متحقق لو نظام التشغيل على الوضع الغامق. فتحنا الصفحة مرة بثيم فاتح ومرة غامق (والـ body فيه [[background: var(--bg, white)]]):

| ثيم الجهاز | [[--bg]] | خلفية الـ body |
|---|---|---|
| light | (مش متعرّف) | rgb(255, 255, 255) |
| dark | oklch(0.17 0.03 265) | oklch(0.17 0.03 265) |

---

## الخلاصة

- mobile-first: الأساس من غير شرط للموبايل، و [[min-width]] بيضيف للأكبر.
- لما كذا شرط يتحققوا، الأخير في الملف بيكسب، فرتّبهم من الصغير للكبير.
- [[40rem]] = 640 و [[64rem]] = 1024 لو خط المتصفح 16.
- [[hover: hover]] للماوس بس، و [[prefers-color-scheme]] لثيم الجهاز.`,
          lines: [
            "الأساس للموبايل: عمود واحد.",
            "من 640px (sm في Tailwind)...",
            "...عمودين.",
            "قفلة.",
            "من 1024px (lg)...",
            "...4 أعمدة.",
            "قفلة.",
            "بس على أجهزة فيها ماوس بجد (مش شاشات لمس)...",
            "...الكارت يطلع لفوق عند الـ hover.",
            "قفلة.",
            "لو نظام التشغيل على الوضع الغامق...",
            "...غيّر متغير الخلفية.",
            "قفلة."
          ],
          sol: R`وانت بتسحب العرض: من الأصغر لحد 639px عمود واحد (كل كارت بعرض الشاشة). عند 640 بالظبط (يعني [[40rem]] لو خط المتصفح 16px) بيبقوا عمودين. عند 1024 ([[64rem]]) أربعة أعمدة. العرض الحالي بيظهر فوق الشاشة في وضع الموبايل، وشريط الـ media queries (من قايمة الـ ⋮ › Show media queries) بيرسم الـ breakpoints ألوان تدوس عليها.

من Rendering › Emulate CSS media feature prefers-color-scheme اختار [[dark]]: متغيّر [[--bg]] على [[:root]] اتغير؛ لو الـ body بيستخدم [[var(--bg)]] الخلفية هتغمق فورًا من غير ما تغيّر ثيم الجهاز. وتأثير الـ hover على الكروت مش هيشتغل في وضع الموبايل بالـ touch، لأن [[(hover: hover)]] مش متحققة.

لو عدد الأعمدة اتغير عند أرقام تانية، غالبًا خط المتصفح مش 16px (الـ rem في الـ media query بيتحسب من إعداد المتصفح، مش من [[html { font-size }]]). ولو مفيش أي تغيير، اتأكد إن الـ viewport meta موجود.`
        }
      ]
    },
    {
      t: "الصور والفيديو و SVG",
      l: 1,
      n: "صورة بتملا مكانها من غير ما تتمط، وصيغ حديثة بـ fallback، وفيديو و YouTube و SVG بيتصرفوا صح",
      items: [
        {
          cmd: "object-fit",
          title: "صورة الكارت تملا المكان من غير ما تتمط",
          desc: R`لما تدّي صورة عرض وارتفاع مش بنفس نسبتها، المتصفح بيمطّها. [[object-fit: cover]] بيخليها تملا المكان كله وتتقص من الأطراف، و [[contain]] بيخليها تبان كلها وتسيب فراغ (مناسب للّوجو وصور المنتجات اللي مينفعش حاجة منها تتقص).

و [[object-position]] بيحدد أنهي جزء يفضل باين لما تتقص: [[50% 20%]] يعني قريب من فوق، مفيد لصور الناس عشان الوش ميتقصش.

ومعاهم [[aspect-ratio]] عشان كل الكروت تبقى نفس الشكل مهما كانت الصور. وفي Tailwind: [[aspect-square]] و [[object-cover]] و [[object-top]].`,
          example: R`.card-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 50% 20%;
}
.logo { width: 8rem; height: 4rem; object-fit: contain; }
<img class="card-img" src="/p/42.webp" width="800" height="600" alt="سماعة سودا">
<img className="aspect-square w-full object-cover object-top" src="/team/mona.webp" alt="منى، مديرة المبيعات" width="400" height="400" />
<div className="relative aspect-video"><Image src="/hero.webp" alt="" fill sizes="100vw" className="object-cover" /></div>`,
          try: R`حط صورة طولية (بورتريه) في صندوق [[aspect-ratio: 4 / 3]]، وفي DevTools غيّر [[object-fit]] بين [[fill]] و [[cover]] و [[contain]] و [[none]]. وبعدين مع cover غيّر [[object-position]] لـ [[top]] و [[bottom]] وشوف أنهي جزء بيختفي.`,
          flag: "script",
          deep: {
            why: R`كروت المنتجات والفريق والمقالات بتيجي صورها بمقاسات مختلفة من ناس مختلفة. من غير object-fit يا الصور تتمط (منظر مش احترافي خالص)، يا كل كارت بارتفاع مختلف والـ grid يبوظ.`,
            how: R`الـ [[<img>]] ليه صندوق (العرض والارتفاع اللي انت اديتهم) ومحتوى (الصورة نفسها بنسبتها). [[object-fit]] بيقول المحتوى يتحط إزاي جوه الصندوق: [[fill]] (الافتراضي) بيمطّه، و [[cover]] بيكبّره لحد ما يغطي الصندوق كله ويقص الزيادة، و [[contain]] بيصغّره لحد ما يبان كله، و [[none]] بيسيبه بمقاسه الأصلي، و [[scale-down]] زي contain بس عمره ما يكبّر الصورة.

[[object-position]] بنفس فكرة [[background-position]]: القيمة الافتراضية [[50% 50%]] (النص). لو القص بيقطع الوشوش، ارفعها لفوق.

الـ [[width]] و [[height]] في الـ HTML لسه مهمين عشان يحجزوا المكان (درس img)، بس خد بالك: الـ [[height]] اللي في الـ HTML المتصفح بيعامله كأنه [[height]] في CSS، فلو سبته، الصورة بتاخد ارتفاعه وتتجاهل الـ [[aspect-ratio]]. عشان كده لازم [[height: auto]] في CSS، و Tailwind بيحطها لكل الصور في الـ Preflight.

[[<Image fill>]] في Next.js بيخلي الصورة [[position: absolute]] وتملا أبوها، فالأب لازم يبقى [[relative]] وليه مقاس (هنا [[aspect-video]])، و [[object-cover]] بيمنع المط، و [[sizes]] ضروري عشان يختار الملف الصح.`,
            when: R`أي صورة في صندوق مقاسه ثابت: كروت، و avatars، وهيرو. contain للّوجو وصور المنتجات على خلفية بيضا اللي مينفعش حاجة منها تتقص. و [[object-fit]] بيشتغل كمان على [[<video>]].`,
            mistakes: R`[[height: 200px]] على صورة من غير object-fit فتتمط. [[background-image]] بدل [[<img>]] عشان تستخدم [[background-size: cover]]: كده ضاع الـ alt والـ lazy loading والـ srcset. [[<Image fill>]] والأب مش relative فالصورة تملا الصفحة كلها. و cover على لوجو فيتقص نصه.`
          },
          teach: R`## الصورة جوه صندوق مش بنفس نسبتها

أي [[<img>]] فيه حاجتين: **الصندوق** (المقاس اللي الـ CSS اداهوله) و**الصورة نفسها** بنسبتها الأصلية. لما النسبتين مختلفين، [[object-fit]] بيقرر الصورة تتحط إزاي. عشان نشوف ده بالأرقام، عملنا صورة طولية 600 × 900 مقسومة لـ ٩ شرايط ألوان، كل شريط 100px، مترقمين من 0 (فوق) لـ 8 (تحت). حطيناها في كارت عرضه 400، وصوّرنا الصورة في Chrome وقرينا لون أول سطر وآخر سطر فيها: كده نعرف أنهي جزء من الصورة باين.

---

## ١. [[.card-img]] سطر سطر

~~~text style.css
.card-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 50% 20%;
}
~~~

- [[width: 100%]]: عرض الكارت = 400.
- [[height: auto]]: مهم جدًا. الـ HTML فيه [[height="600"]]، والمتصفح بيعامله كأنه CSS. جربنا من غير السطر ده: الصورة طلعت **400 × 600** والـ aspect-ratio اتجاهل. ومعاه: **400 × 300**.
- [[aspect-ratio: 4 / 3]]: الارتفاع = العرض × 3 ÷ 4 = 300.
- [[object-fit: cover]]: كبّر الصورة لحد ما تغطي الصندوق كله، واقصص الزيادة.
- [[object-position: 50% 20%]]: لو فيه قص، أنهي جزء يفضل باين. الرقم الأول أفقي والتاني رأسي.

### الحسبة بتاعة cover

الصورة 600 × 900 والصندوق 400 × 300. عشان تغطي العرض لازم تصغر لـ 400 ÷ 600 = ⅔، فتبقى 400 × 600. الارتفاع 600 والصندوق 300، يعني 300 بكسل زيادة لازم يتقصوا. و [[20%]] معناها: اقصص 20% من الزيادة من فوق والباقي من تحت.

| object-position | اللي باين من فوق لتحت |
|---|---|
| [[50% 50%]] (الافتراضي) | شريط 2 لـ 6 (النص) |
| [[50% 20%]] (المثال) | شريط 0 لـ 5 |
| [[top]] | شريط 0 لـ 4 |
| [[bottom]] | شريط 4 لـ 8 |

مع [[20%]] أول شريط (فوق خالص) باين، فلو صورة شخص، الراس مش هتتقص.

## ٢. القيم الخمسة على نفس الصورة

| object-fit | اللي حصل (متقاس) |
|---|---|
| [[fill]] (الافتراضي) | الـ ٩ شرايط كلهم باينين ومضغوطين: الصورة اتمطّت |
| [[cover]] | الصندوق مليان، وجزء من فوق وتحت اتقص |
| [[contain]] | الصورة كلها باينة (شريط 0 لـ 8)، والجنبين فاضيين أبيض |
| [[none]] | الصورة بمقاسها الأصلي في النص: شريط 3 لـ 5 بس |
| [[scale-down]] | زي contain، بس عمره ما يكبّر صورة صغيرة |

## ٣. [[.logo { width: 8rem; height: 4rem; object-fit: contain; }]]

صندوق 128 × 64 بالعرض، والصورة طولية. مع [[contain]]: النص فيه الصورة، والشمال واليمين فاضيين (أبيض). يعني اللوجو كله باين من غير قص ولا مط.

## ٤. نفس الكلام بـ HTML و Tailwind و Next

~~~text index.html
<img class="card-img" src="/p/42.webp" width="800" height="600" alt="سماعة سودا">
~~~

الـ [[width]] و [[height]] في الـ HTML بيدّوا المتصفح النسبة قبل ما الصورة تتحمّل، فيحجز المكان.

~~~text Tailwind
<img className="aspect-square w-full object-cover object-top" ... />
~~~

[[aspect-square]] = [[aspect-ratio: 1 / 1]]، و [[w-full]] = [[width: 100%]]، و [[object-cover]] و [[object-top]] نفس الخصائص. ومش محتاج [[h-auto]] لأن الـ Preflight بتاع Tailwind بيحط [[height: auto]] على كل الصور.

~~~text Next.js
<div className="relative aspect-video"><Image src="/hero.webp" alt="" fill sizes="100vw" className="object-cover" /></div>
~~~

[[fill]] بيخلي الصورة [[position: absolute]] و [[inset: 0]]، فبتملا الأب. عشان كده الأب [[relative]] (مرجع) و [[aspect-video]] (= 16 / 9، عشان يبقى ليه ارتفاع).

## الخلاصة

- [[cover]] للكروت والـ avatars (مليانة ومقصوصة)، و [[contain]] للّوجوهات (كاملة).
- [[object-position]] بيختار الجزء الباين، ورفعه لفوق بيحمي الوشوش.
- مع [[aspect-ratio]] على صورة فيها [[height]] في الـ HTML، اكتب [[height: auto]].`,
          lines: [
            "صورة الكارت.",
            "عرض الكارت كله.",
            R`[[height: auto]]: ألغي الارتفاع اللي جاي من [[height="600"]] في الـ HTML، عشان الـ aspect-ratio هو اللي يحسب الارتفاع.`,
            "كل الكروت نفس النسبة مهما كانت الصورة.",
            "املا الصندوق كله واقصص الزيادة بدل ما تمط.",
            "لو فيه قص، خلّي الجزء اللي فوق شوية باين (عشان الوشوش).",
            "قفلة.",
            R`لوجو: مقاس ثابت، و [[contain]] عشان يبان كله من غير قص.`,
            "الصورة في الـ HTML، ومقاسها الأصلي لحجز المكان.",
            "نفس الفكرة بـ Tailwind: مربع، ومليان، والقص من تحت.",
            R`Next Image بـ [[fill]]: الأب [[relative]] وليه نسبة، والصورة [[object-cover]].`
          ],
          sol: R`[[fill]]: الصورة الطولية اتمطت بالعرض والوشوش عريضة. [[cover]]: الصندوق مليان والصورة بنسبتها، بس اتقص جزء من فوق ومن تحت. [[contain]]: الصورة كلها باينة وفيه فراغ يمين وشمال. [[none]]: الصورة بحجمها الأصلي، غالبًا جزء صغير منها بس اللي باين.

مع cover و [[object-position: top]]: اللي فوق باين واللي تحت اتقص، و [[bottom]] العكس. لو التغيير ملوش أي تأثير، يبقى الصورة نسبتها قريبة من الصندوق أصلًا، جرّب صورة أطول.`
        },
        {
          cmd: "picture",
          title: "صورة مختلفة للموبايل، و AVIF مع fallback",
          desc: R`[[<picture>]] بيحط جواه كذا [[<source>]] وفي الآخر [[<img>]]. المتصفح بيمشي على الـ sources بالترتيب وياخد أول واحد ينفع (نوعه مدعوم و [[media]] بتاعته متحققة)، ويعرضه في الـ img. ولو ولا واحد نفع، بياخد الـ img نفسه.

استخدامين: صيغ حديثة ([[AVIF]] أصغر بكتير، وبعدها [[WebP]]، وبعدها JPEG للقديم)، و art direction: صورة مقصوصة مختلفة للموبايل (مش نفس الصورة أصغر، لأن ده شغل [[srcset]] في درس img).

الـ [[alt]] والـ [[width]] و [[height]] و [[loading]] والكلاسات كلها على الـ [[<img>]]، مش على picture.`,
          example: R`<picture>
  <source media="(max-width: 767px)" type="image/avif" srcset="/hero-mobile.avif" width="800" height="1000">
  <source media="(max-width: 767px)" type="image/webp" srcset="/hero-mobile.webp" width="800" height="1000">
  <source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w" sizes="100vw">
  <source type="image/webp" srcset="/hero-800.webp 800w, /hero-1600.webp 1600w" sizes="100vw">
  <img src="/hero-1600.jpg" width="1600" height="700" alt="عرض الصيف: خصم 30% على السماعات" fetchpriority="high">
</picture>`,
          try: R`حوّل صورة لـ AVIF و WebP (من squoosh.app أو [[npx sharp-cli]])، واعمل الـ picture. افتح DevTools › Network وفلتر على Img: شوف أنهي ملف اتحمّل على عرض كبير، وبعدين وضع الموبايل واعمل refresh. وقارن أحجام الملفات التلاتة.`,
          flag: "script",
          deep: {
            why: R`صورة الهيرو غالبًا أكبر حاجة في الصفحة وهي اللي بتحدد LCP. نفس الصورة بـ AVIF ممكن تبقى نص حجم الـ WebP وأصغر بكتير من JPEG. وصورة عريضة 16:9 على موبايل طولي بتبقى شريط صغير الكلام اللي فيها مش باين، فمحتاج صورة مقصوصة تانية.`,
            how: R`المتصفح بيقرا [[type]] ويسأل نفسه: أعرف أفك الصيغة دي؟ لو لأ بيعدّي من غير ما يحمّل حاجة. وبيقرا [[media]] زي media query. أول source يعدّي الاتنين بيكسب، وجواه [[srcset]] و [[sizes]] بيشتغلوا عادي زي درس img. فالترتيب مهم: الأدق (موبايل + AVIF) الأول، والعام في الآخر.

[[width]] و [[height]] على الـ source: لما صورة الموبايل نسبتها مختلفة (4:5 بدل 16:9)، دول بيخلوا المتصفح يحجز المكان الصح ليها بدل ما يستخدم نسبة الـ img، فمفيش CLS.

AVIF بقت مدعومة في كل المتصفحات الحديثة، بس الـ fallback مش بيكلّف حاجة (المتصفح مبيحمّلش غير ملف واحد)، والـ encode بتاعها أبطأ، فاعملها وقت الـ build مش مع كل request.

في Next.js، [[<Image>]] بيحوّل الصيغة لوحده حسب اللي المتصفح بيقول إنه بيدعمه (WebP افتراضيًا، و AVIF لو ضفتها في [[images.formats]] في الـ config)، فمش محتاج picture عشان الصيغ. بس لـ art direction لسه محتاج picture أو [[getImageProps]].`,
            when: R`صور الهيرو والبانرات الكبيرة: صيغ حديثة دايمًا، و art direction لما الصورة فيها كلام أو تفاصيل هتضيع على الموبايل. الصور الصغيرة والأيقونات: مش محتاجة.`,
            mistakes: R`الـ [[alt]] أو الكلاس على [[<picture>]] بدل الـ img. الـ source العام قبل الخاص فالموبايل ياخد صورة الديسكتوب. picture لنفس الصورة بمقاسات مختلفة (ده srcset). تنسى الـ [[<img>]] جوه فمفيش صورة خالص. و [[src]] على [[<source>]] بدل [[srcset]] (الـ source مبيقراش src جوه picture).`
          },
          teach: R`## المتصفح بيختار ملف واحد من قايمة

[[<picture>]] نفسه مبيعرضش حاجة. هو بيدّي المتصفح قايمة اختيارات ([[<source>]])، والمتصفح ياخد **أول واحد** ينفعه ويحطه في الـ [[<img>]] اللي في الآخر. عشان نتأكد من ده، عملنا ملفات حقيقية بـ sharp (مكتبة Node لتحويل الصور) لصورة تجربة 1600 × 700، وفتحنا المثال في Chrome بمقاسات مختلفة، وسجلنا كل request للصور.

---

## ١. السطرين الأولانيين: الموبايل

~~~text index.html
<source media="(max-width: 767px)" type="image/avif" srcset="/hero-mobile.avif" width="800" height="1000">
<source media="(max-width: 767px)" type="image/webp" srcset="/hero-mobile.webp" width="800" height="1000">
~~~

- [[media]]: شرط زي media query. [[max-width: 767px]] = الشاشة 767 أو أصغر.
- [[type]]: صيغة الملف (اسمها MIME type). لو المتصفح مبيعرفش يفك [[image/avif]]، بيعدّي السطر من غير ما يحمّل حاجة.
- [[srcset]]: الملف (أو الملفات). جوه picture لازم [[srcset]] مش [[src]].
- [[width="800" height="1000"]]: نسبة الصورة دي (4:5)، عشان المتصفح يحجز مكان بالنسبة الصح.

## ٢. السطرين التانيين: الشاشات الكبيرة

~~~text index.html
<source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w" sizes="100vw">
<source type="image/webp" srcset="/hero-800.webp 800w, /hero-1600.webp 1600w" sizes="100vw">
~~~

- مفيش [[media]]، فبيشتغلوا على أي شاشة.
- [[800w]] = الملف ده عرضه 800 بكسل. والمتصفح بيختار مقاس حسب [[sizes]].
- [[sizes="100vw"]] = الصورة هتتعرض بعرض الشاشة كلها.

## ٣. الـ img: الاحتياطي والمكان اللي الصورة بتتعرض فيه

~~~text index.html
<img src="/hero-1600.jpg" width="1600" height="700" alt="عرض الصيف: خصم 30% على السماعات" fetchpriority="high">
~~~

لو ولا source نفع، الـ [[src]] بتاعه هو اللي بيتحمّل (JPEG، كل المتصفحات بتعرفه). و [[fetchpriority="high"]] = حمّلها بأولوية عالية لأنها أهم صورة فوق. والـ alt والمقاس هنا مش على picture.

---

## اللي اتحمّل فعلًا

| الشاشة | الملفات اللي اتطلبت | المقاس المعروض |
|---|---|---|
| 1200، كثافة 1 | [[/hero-1600.avif]] بس | 1200 × 525 |
| 1200، كثافة 2 | [[/hero-1600.avif]] بس | 1200 × 525 |
| 700 | [[/hero-mobile.avif]] بس | 700 × 875 |
| 390، كثافة 3 | [[/hero-mobile.avif]] بس | 390 × 487.5 |

- في كل حالة ملف **واحد** اتحمّل.
- على 1200 اختار 1600 مش 800: الصورة هتتعرض 1200 بكسل، والـ 800 أصغر من المطلوب.
- على 700 الصورة بقت طولية: 700 × 875 = نسبة 4:5 بتاعة صورة الموبايل، مش 1600 × 700. ده من الـ [[width]] و [[height]] اللي على الـ source.

ولما غيّرنا [[image/avif]] لصيغة وهمية (كأننا متصفح قديم مبيعرفش AVIF)، اتحمّل [[/hero-1600.webp]] بدالها.

## أحجام الملفات اللي عملناها

| الملف | الحجم |
|---|---|
| hero-1600.jpg | 268,494 byte |
| hero-1600.webp | 252,490 byte |
| hero-1600.avif | 107,321 byte |
| hero-800.avif | 11,614 byte |

الصورة دي متولّدة (ألوان متدرجة ونقط عشوائية)، فالفرق في صورة حقيقية بيختلف، بس الترتيب غالبًا كده: AVIF أصغر، وبعدها WebP، وبعدها JPEG.

## الخلاصة

- المتصفح بيمشي على الـ sources بالترتيب وياخد أول واحد [[type]] و [[media]] بتوعه ينفعوا، فالأدق الأول.
- [[srcset]] على الـ source، و [[alt]] والمقاس والكلاسات على الـ img.
- ملف واحد بس بيتحمّل، فالـ fallback ملوش تمن.`,
          lines: [
            "بداية الـ picture.",
            R`موبايل وبيدعم AVIF: صورة مقصوصة طولي، ونسبتها الخاصة بـ width و height.`,
            "موبايل ومش بيدعم AVIF: نفس الصورة WebP.",
            R`شاشة كبيرة وبيدعم AVIF: مقاسين، والمتصفح يختار بـ [[sizes]].`,
            "شاشة كبيرة و WebP.",
            R`آخر احتمال والمكان اللي الصورة بتتعرض فيه فعلًا: الـ alt والمقاس والأولوية هنا.`,
            "قفلة."
          ],
          sol: R`على عرض كبير في Chrome: هتلاقي [[hero-1600.avif]] اتحمّل (الـ [[hero-800.avif]] بيتاخد بس لما الصورة هتتعرض 800 بكسل حقيقي أو أقل، يعني عرض الشاشة × الكثافة)، ومفيش WebP ولا JPEG. في وضع الموبايل بعد refresh: [[hero-mobile.avif]] والصورة بقت طولية. ملف واحد بس بيتحمّل في كل مرة.

الأحجام: غالبًا AVIF أصغر من WebP بشوية لنص، والاتنين أصغر بكتير من JPEG (الأرقام بتختلف حسب الصورة والجودة).

لو لقيت صورة الديسكتوب على الموبايل: الـ sources الخاصة بالموبايل لازم تيجي الأول. ولو مفيش حاجة اتحمّلت: اتأكد إنك كتبت [[srcset]] مش [[src]] على الـ source.`
        },
        {
          cmd: "video و iframe",
          title: "فيديو بيشتغل لوحده على الموبايل، و YouTube ميتقّلش الصفحة",
          desc: R`[[<video>]] محتاج [[controls]] عشان المستخدم يشغّل ويوقف، و [[poster]] صورة لحد ما يشتغل، و [[preload="metadata"]] عشان ميحمّلش الفيديو كله على الفاضي. والترجمة بـ [[<track kind="captions">]] وملف WebVTT.

فيديو خلفية بيشتغل لوحده لازم [[muted autoplay loop playsinline]]: المتصفحات بتمنع الـ autoplay بصوت، و iPhone من غير [[playsinline]] بيفتحه full screen.

و [[<iframe>]] (YouTube أو خريطة) لازم له [[title]] و [[loading="lazy"]]. وأحسن من كده: facade، يعني صورة الفيديو وزرار تشغيل، والـ iframe يتعمل بس لما المستخدم يدوس.`,
          example: R`<video controls preload="metadata" poster="/video/intro.jpg" width="1280" height="720">
  <source src="/video/intro.webm" type="video/webm">
  <source src="/video/intro.mp4" type="video/mp4">
  <track kind="captions" src="/video/intro.ar.vtt" srclang="ar" label="عربي" default>
</video>
<video autoplay muted loop playsinline poster="/hero.jpg" aria-hidden="true" src="/hero.mp4"></video>
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="شرح المنتج في دقيقتين" width="560" height="315" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
<button type="button" class="yt-facade" data-id="VIDEO_ID" aria-label="شغّل: شرح المنتج في دقيقتين" style="background-image: url(https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg)">▶</button>`,
          try: R`حط iframe يوتيوب عادي في صفحة، وافتح Network واعمل refresh: عدّ الـ requests والحجم. وبعدين بدّله بزرار الـ facade واكتب السكربت اللي لما تدوس عليه يحط الـ iframe مكانه ويشغّله، وقارن الـ Network تاني قبل الضغط.`,
          flag: "script",
          deep: {
            why: R`iframe يوتيوب واحد بيحمّل مئات الـ KB من JavaScript قبل ما حد يدوس play، وبيبطّأ الصفحة حتى لو محدش هيتفرج. والفيديو من غير poster بيبان مربع أسود. والفيديو من غير ترجمة مش مفهوم للصم، ولا لأي حد فاتح الموبايل في مواصلات من غير سماعة.`,
            how: R`الـ [[<source>]] جوه video زي picture: المتصفح ياخد أول نوع يعرف يشغّله. [[preload="none"]] مبيحمّلش حاجة، و [[metadata]] بيحمّل المدة وأول frame بس، و [[auto]] ممكن يحمّل كتير.

سياسة الـ autoplay: المتصفح بيسمح بالتشغيل التلقائي لو الفيديو [[muted]] (أو المستخدم اتفاعل مع الموقع قبل كده). و [[playsinline]] لـ iOS Safari. والفيديو اللي بيشتغل لوحده أكتر من 5 ثواني لازم يبقى فيه طريقة توقفه (WCAG)، وتحترم [[prefers-reduced-motion]] (متشغلوش لوحده).

ملف الـ VTT نص عادي: أول سطر [[WEBVTT]]، وبعدين لكل جملة سطر وقت [[00:00.000 --> 00:03.000]] وتحته الكلام. و [[kind="captions"]] (كل الصوت مكتوب) غير [[subtitles]] (ترجمة للغة تانية). ولو الـ VTT على domain تاني، الـ video محتاج [[crossorigin]] والسيرفر يبعت CORS.

الـ facade: زرار بصورة الفيديو من [[i.ytimg.com]]، ولما يتضغط تعمل iframe بـ [[?autoplay=1]] وتحطه مكانه. فيه مكتبة جاهزة اسمها [[lite-youtube-embed]]. و [[youtube-nocookie.com]] بيقلل الـ cookies لحد ما المستخدم يشغّل. وفي الحالتين الـ iframe محتاج [[title]] عشان قارئ الشاشة يعرف هو إيه.`,
            when: R`فيديو بتاعك (شرح، إعلان): [[<video>]] بـ controls و poster و captions. خلفية للهيرو: muted autoplay loop playsinline وقصير وخفيف، ومعاه زرار إيقاف. فيديو يوتيوب في صفحة فيها كذا فيديو أو في الـ landing: facade دايمًا.`,
            mistakes: R`autoplay من غير muted فمبيشتغلش ومفيش أي error. نسيان playsinline فالآيفون يفتحه full screen. فيديو 50MB في الهيرو على موبايل. iframe من غير title. 10 iframes يوتيوب في صفحة واحدة. فيديو خلفية ملوش زرار إيقاف ومبيحترمش reduced motion. وترجمة محروقة في الفيديو نفسه بدل track (مبتتكبرش ومبتتقفلش ومبتتدوّرش).`
          },
          teach: R`## ٣ طرق تحط فيديو في صفحة

فيديو بتاعك بأزرار تحكم، وفيديو خلفية بيشتغل لوحده، وفيديو يوتيوب. عشان نجرّب بجد، عملنا بـ ffmpeg فيديو تجربة 1280 × 720 مدته ٦ ثواني بصيغتين (WebM و MP4)، وصورة poster، وملف ترجمة، وفتحنا المثال في Chrome. وقرينا حالة كل فيديو من JavaScript: [[currentSrc]] (الملف اللي اختاره)، و [[paused]] (واقف؟)، و [[duration]] (المدة بالثواني).

---

## ١. الفيديو العادي

~~~text index.html
<video controls preload="metadata" poster="/video/intro.jpg" width="1280" height="720">
  <source src="/video/intro.webm" type="video/webm">
  <source src="/video/intro.mp4" type="video/mp4">
  <track kind="captions" src="/video/intro.ar.vtt" srclang="ar" label="عربي" default>
</video>
~~~

- [[controls]]: أزرار التشغيل والصوت والوقت بتاعة المتصفح.
- [[poster]]: صورة بتظهر لحد ما المستخدم يشغّل.
- [[preload="metadata"]]: حمّل المعلومات (المدة والمقاس) بس.
- [[width]] و [[height]]: النسبة، عشان يحجز المكان.
- [[<source>]]: زي picture، المتصفح بياخد أول [[type]] يعرف يشغّله. Chrome اختار [[/video/intro.webm]].
- [[<track kind="captions">]]: ملف ترجمة. [[srclang]] لغته، و [[label]] اسمه في القايمة، و [[default]] = مفعّل من الأول.

~~~text الناتج
currentSrc: /video/intro.webm   paused: true   duration: 6.008
textTracks[0]: captions، عربي، ar، mode: showing، 2 cues
~~~

[[showing]] = الترجمة ظاهرة، و 2 cues = الجملتين اللي في الملف.

### ملف الـ VTT

~~~text intro.ar.vtt
WEBVTT

00:00.000 --> 00:03.000
أهلًا، ده فيديو تجربة

00:03.000 --> 00:06.000
وده السطر التاني
~~~

أول سطر لازم [[WEBVTT]]. وكل جملة (اسمها cue) سطر وقت [[من --> لحد]] بالدقايق والثواني، وتحته الكلام، وسطر فاضي بينها.

### [[preload]] بيفرق قد إيه؟

جربنا فيديو WebM مدته 60 ثانية وحجمه حوالي 8 ميجا، وعدّينا الـ bytes اللي السيرفر المحلي بعتها في أول ٤ ثواني من غير ما حد يدوس play:

| preload | اللي اتبعت | المدة معروفة؟ |
|---|---|---|
| [[none]] | ولا byte | لأ (NaN) |
| [[metadata]] | حوالي 1.4 ميجا (أول 7.6 ثانية) | آه، 60 |
| [[auto]] | حوالي 5.5 ميجا (أول 26 ثانية) | آه، 60 |

يعني Chrome مع metadata بيحمّل حتة صغيرة من الأول مش المعلومات بس، بس أقل بكتير من auto.

## ٢. فيديو الخلفية

~~~text index.html
<video autoplay muted loop playsinline poster="/hero.jpg" aria-hidden="true" src="/hero.mp4"></video>
~~~

- [[autoplay]]: يشتغل لوحده. [[muted]]: من غير صوت. [[loop]]: يعيد لما يخلص.
- [[playsinline]]: على iPhone يشتغل مكانه في الصفحة مش full screen.
- [[aria-hidden="true"]]: قارئ الشاشة يتجاهله، لأنه زينة.

قارنّاه بنفس الفيديو بـ [[autoplay]] من غير [[muted]]:

| | paused بعد التحميل |
|---|---|
| [[autoplay muted]] | false (شغال) |
| [[autoplay]] لوحده | true (Chrome منعه) |

ومفيش أي error في الـ Console: الفيديو بيفضل واقف وخلاص.

## ٣. يوتيوب: iframe ضد facade

~~~text index.html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="شرح المنتج في دقيقتين" width="560" height="315" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
~~~

- [[<iframe>]] صفحة جوه صفحتك. [[title]] اسمها لقارئ الشاشة.
- [[loading="lazy"]]: متتحمّلش غير لما تقرب من الشاشة.
- [[allow]]: الصلاحيات اللي الصفحة اللي جوه تاخدها (تشغيل تلقائي، وفيديو محمي، وصورة جوه صورة).

~~~text index.html
<button type="button" class="yt-facade" data-id="VIDEO_ID" aria-label="شغّل: شرح المنتج في دقيقتين" style="background-image: url(https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg)">▶</button>
~~~

الـ facade زرار عادي خلفيته صورة الفيديو من [[i.ytimg.com]]، و [[data-id]] فيه رقم الفيديو، و [[aria-label]] اسم الزرار.

جربنا الاتنين بفيديو يوتيوب حقيقي، وعدّينا الـ requests في أول ٦ ثواني:

| | requests | الحجم تقريبًا |
|---|---|---|
| iframe عادي (الفيديو في الشاشة) | 15 (من 7 domains) | 1164 KB |
| facade قبل الضغط | 2 (الصفحة والصورة) | 24 KB |

### الـ solCode: إزاي الـ facade بيتحول iframe

- [[document.addEventListener('click', ...)]]: اسمع أي ضغطة في الصفحة.
- [[e.target.closest('.yt-facade')]]: الضغطة كانت على الزرار أو جواه؟ لو لأ [[return]].
- [[document.createElement('iframe')]]: اعمل iframe جديد.
- [[iframe.src = ...]]: الرابط مبني بـ template string: [[btn.dataset.id]] بيقرا [[data-id]]، و [[?autoplay=1]] = اشتغل على طول.
- [[title]] من [[aria-label]]، و [[allow]] و [[allowFullscreen]] والمقاس زي الـ iframe العادي.
- [[btn.replaceWith(iframe)]]: حط الـ iframe مكان الزرار.
- [[iframe.focus()]]: الـ focus كان على الزرار اللي اتشال، فحطه على الـ iframe عشان مستخدم الكيبورد ميتوهش.

بعد ما ضغطنا: الـ iframe اتعمل بالرابط [[...embed/VIDEO_ID?autoplay=1]] والـ title صح، و [[document.activeElement]] (العنصر اللي عليه الـ focus) بقى [[IFRAME]].

## الخلاصة

| الحالة | لازم |
|---|---|
| فيديو بتاعك | [[controls]] و [[poster]] و [[preload="metadata"]] و [[<track>]] |
| فيديو خلفية | [[autoplay muted loop playsinline]] و [[aria-hidden]] |
| يوتيوب | [[title]] و [[loading="lazy"]]، وأحسن facade |

- autoplay من غير muted بيتمنع في سكوت.`,
          lines: [
            "فيديو عادي: أزرار تحكم، ويحمّل المدة بس، وصورة لحد ما يشتغل، ومقاس عشان يحجز المكان.",
            "WebM الأول (أصغر غالبًا).",
            "MP4 للباقي.",
            R`الترجمة: ملف VTT بالعربي، و [[default]] مفعّلة من الأول.`,
            "قفلة.",
            R`فيديو خلفية: بيشتغل لوحده لأنه [[muted]]، ومش full screen على الآيفون، ومخفي عن قارئ الشاشة لأنه زينة.`,
            R`يوتيوب عادي: [[nocookie]]، و [[title]] للـ accessibility، و [[lazy]] ميتحملش غير لما يقرب.`,
            "الـ facade: زرار بصورة الفيديو، والـ iframe بيتعمل بس لما يتضغط."
          ],
          sol: R`الـ iframe العادي: حوالي 15 request من كذا domain (JavaScript و CSS و fonts من يوتيوب) وحجم حوالي 1.1MB قبل ما تدوس play (ده اللي اتقاس في Chrome على فيديو حقيقي). الـ facade قبل الضغط: request واحد (الصورة، عشرات الـ KB). بعد الضغط: الـ iframe بيتحمّل ويشتغل على طول لأن فيه [[autoplay=1]].

لو الفيديو مشتغلش لوحده بعد الضغط: اتأكد إن [[allow]] فيه [[autoplay]]. ولو الـ focus ضاع بعد ما الزرار اتشال: حط الـ focus على الـ iframe الجديد.`,
          solCode: R`document.addEventListener('click', (e) => {
  const btn = e.target.closest('.yt-facade');
  if (!btn) return;
  const iframe = document.createElement('iframe');
  iframe.src = $__bthttps://www.youtube-nocookie.com/embed/$__{btn.dataset.id}?autoplay=1$__bt;
  iframe.title = btn.getAttribute('aria-label');
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.width = 560;
  iframe.height = 315;
  btn.replaceWith(iframe);
  iframe.focus();
});`
        },
        {
          cmd: "SVG",
          title: "SVG: inline ولا img؟ و currentColor و svgo",
          desc: R`[[<img src="logo.svg">]]: سهل وبيتكاش، بس الـ CSS بتاع صفحتك مش بيوصل جواه، فمتقدرش تغيّر لونه مع الـ hover أو الـ dark mode.

[[<svg>]] inline في الـ HTML: الـ CSS بيوصل لكل جزء فيه، و [[fill="currentColor"]] أو [[stroke="currentColor"]] بيخليه ياخد لون الكلام اللي حواليه ([[color]]). ده اللي lucide-react بيعمله.

وأي SVG طالع من Figma أو Illustrator فيه زبالة (metadata، و groups فاضية، وأرقام بـ 6 decimals). [[svgo]] بينضّفه وغالبًا بيصغّره للنص أو أقل.`,
          example: R`<img src="/logo.svg" alt="متجر النور" width="120" height="32">
<button type="button" class="icon-btn" aria-label="السلة">
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
</button>
<svg role="img" aria-labelledby="chart-t" viewBox="0 0 100 40"><title id="chart-t">المبيعات زادت 20% الشهر ده</title>...</svg>
// styles.css
.icon-btn { color: var(--color-gray-700); }
.icon-btn:hover { color: var(--color-brand); }`,
          try: R`صدّر أيقونة من Figma (أو خد أي SVG) وشغّل [[npx svgo icon.svg -o icon.min.svg]] وقارن الملفين. وبعدين حط نفس الأيقونة مرة كـ [[<img>]] ومرة inline جوه زرار عليه [[color: red]]: أنهي واحدة اتلوّنت؟`,
          flag: "script",
          deep: {
            why: R`الأيقونات في كل حتة: أزرار، ومنيو، وحالات. لو كل لون محتاج ملف SVG منفصل، هيبقى عندك 4 نسخ من كل أيقونة (عادي، و hover، و dark، و disabled). مع currentColor أيقونة واحدة بتاخد لون أي مكان تتحط فيه.`,
            how: R`الـ [[<img>]] بيعامل الـ SVG كصورة منفصلة: document لوحده، والـ CSS و JavaScript بتوع الصفحة مش بيوصلوله، والمتصفح بيكاشه زي أي صورة. الـ inline جزء من الـ DOM: [[:hover]] و CSS variables و [[currentColor]] كلهم بيشتغلوا، بس بيتقل حجم الـ HTML ومبيتكاش لوحده.

[[currentColor]] معناها «قيمة [[color]] في العنصر ده»، وبتتورث من الأب. فلو الـ path عليه [[fill="currentColor"]] والزرار [[color: red]]، الأيقونة حمرا.

الـ accessibility: أيقونة جوه زرار أو جنب كلام يبقى [[aria-hidden="true"]] والاسم على الزرار. SVG بيعني حاجة لوحده (رسم بياني، لوجو inline) ياخد [[role="img"]] واسم من [[<title>]] أو [[aria-label]].

svgo (نسخة 4) بيشيل الـ XML declaration والتعليقات والـ metadata والـ groups الفاضية ويقصّر الأرقام، وبيسيب [[viewBox]] و [[<title>]] افتراضيًا. والـ [[fill="#000"]] بيشيله لأن الأسود هو الافتراضي، وساعتها الأيقونة inline بتبقى سودا مش currentColor، فحط [[fill="currentColor"]] على الـ [[<svg>]] نفسه، أو اعمل [[svgo.config.mjs]] فيه plugin [[convertColors]] بـ [[currentColor: true]].

وفي React: الأيقونات من مكتبة (lucide-react) أو ملفات بتتحول لـ components بـ SVGR. واللوجو الكبير أو الرسومات التوضيحية [[<img>]] أحسن عشان الكاش.`,
            when: R`أيقونات بتتلوّن أو بتتحرك: inline أو مكتبة أيقونات. لوجو ثابت، ورسومات كبيرة، وصور مقالات: [[<img>]]. وأي SVG جاي من برنامج تصميم: svgo قبل ما يدخل المشروع.`,
            mistakes: R`SVG من غير [[viewBox]] فمبيتكبرش ولا بيصغر صح. لون ثابت [[fill="#333"]] جوه الأيقونة فمبتتلونش. [[<img src="icon.svg">]] وتستغرب ليه [[color]] مش شغال. SVG inline تقيل (خريطة، رسمة 200KB) بيتكرر في كل صفحة. أيقونة لوحدها في زرار من غير اسم. و SVG جاي من مستخدمين بيتحط inline: ممكن يكون فيه [[<script>]] (XSS)، فنضّفه أو اعرضه كـ img.`
          },
          teach: R`## SVG صورة مكتوبة كـ كود

SVG (Scalable Vector Graphics) ملف نصي فيه أشكال: دواير وخطوط ومسارات بأرقام. عشان كده بيتكبر لأي مقاس من غير ما يبوظ. وتقدر تحطه بطريقتين: كصورة بـ [[<img>]]، أو تلزق الكود نفسه في الـ HTML (inline). جربنا الاتنين في Chrome على زرار لونه أحمر، وقرينا لون الخط من [[getComputedStyle]] ومن صورة الشاشة نفسها.

---

## ١. اللوجو كـ img

~~~text index.html
<img src="/logo.svg" alt="متجر النور" width="120" height="32">
~~~

ملف منفصل، المتصفح بيكاشه، و [[alt]] اسمه. بس هو document مقفول: الـ CSS بتاع الصفحة مش بيدخل جواه.

## ٢. الأيقونة inline جوه زرار

~~~text index.html
<button type="button" class="icon-btn" aria-label="السلة">
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
</button>
~~~

- [[aria-label="السلة"]]: اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه.
- [[viewBox="0 0 24 24"]]: الرسمة مرسومة على لوحة 24 × 24. أي أرقام جوه بتتحسب على اللوحة دي، و [[width]] و [[height]] المقاس على الشاشة. لو كبّرتهم لـ 48 الرسمة تكبر معاهم.
- [[fill="none"]]: الأشكال من جوه فاضية. [[stroke="currentColor"]]: الخط حواليها بلون [[color]] بتاع الأب. [[stroke-width="2"]]: سُمك الخط.
- [[aria-hidden="true"]]: قارئ الشاشة يتجاهل الرسمة، والاسم على الزرار.
- [[<circle cx="9" cy="20" r="1" />]]: دايرة مركزها (9، 20) ونص قطرها 1. دول عجلتين السلة.
- [[<path d="...">]]: [[d]] أوامر رسم: [[M1 1]] = روح للنقطة (1، 1)، و [[h4]] = خط أفقي 4، و [[l2.7 13.4]] = خط للنقطة دي بالنسبة للحالية، و [[a]] = قوس (الركن المدوّر)، و [[L]] = خط لنقطة، و [[H6]] = خط أفقي لحد x = 6.

## ٣. اللون من CSS

~~~text style.css
.icon-btn { color: var(--color-gray-700); }
.icon-btn:hover { color: var(--color-brand); }
~~~

(الـ [[// styles.css]] في المثال مجرد عنوان بيقول الحتة دي في ملف CSS.)

~~~text الناتج: stroke بتاع الـ path
عادي:          oklch(0.373 0.034 259.733)   (رمادي غامق)
وقت الـ hover:  rgb(255, 0, 0)               (لون البراند في التجربة)
~~~

الأيقونة ملهاش ولا قاعدة CSS، بس [[currentColor]] بيقرا [[color]] من الزرار.

## ٤. SVG بيعني حاجة لوحده

~~~text index.html
<svg role="img" aria-labelledby="chart-t" viewBox="0 0 100 40"><title id="chart-t">المبيعات زادت 20% الشهر ده</title>...</svg>
~~~

[[role="img"]] = عامله كصورة، و [[aria-labelledby="chart-t"]] = اسمك هو الكلام اللي في العنصر اللي id بتاعه [[chart-t]]، يعني الـ [[<title>]]. قرينا شجرة الـ accessibility من Chrome، والرسمة ظهرت كده:

~~~text الناتج
image: المبيعات زادت 20% الشهر ده
~~~

---

## التجربة الأولى: svgo على ملف من برنامج تصميم

عملنا أيقونة السلة بالشكل اللي Illustrator بيصدّره (فيها [[<?xml>]] وتعليق البرنامج و [[<metadata>]] و [[<g>]] جوه [[<g>]] و [[fill="#000000"]] وأرقام زي [[9.000000]])، وشغلنا:

~~~powershell
npx svgo icon.svg -o icon.min.svg
~~~

[[npx]] بيشغّل أداة من npm من غير ما تسطّبها global، و [[-o]] = output: اسم الملف الجديد.

~~~text الناتج
icon.svg:
Done in 11 ms!
0.915 KiB - 67% = 0.302 KiB
~~~

~~~text icon.min.svg
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" viewBox="0 0 24 24"><title>السلة</title><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path fill="none" stroke="#000" stroke-width="2" d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
~~~

- من 937 byte لـ 309: الـ xml والتعليق والـ metadata والـ g اتشالوا، و [[9.000000]] بقت [[9]]، والـ path اتكتب أقصر.
- [[viewBox]] و [[<title>]] لسه موجودين.
- [[fill="#000000"]] على الدواير اتشال (الأسود هو الافتراضي)، و [[stroke="#000"]] على الـ path فضل.

## التجربة التانية: مين بيتلوّن؟

حطينا ٣ زراير عليهم [[color: red]]، وقرينا الألوان:

| جوه الزرار | النتيجة المتقاسة |
|---|---|
| الأيقونة inline بـ [[currentColor]] | stroke = rgb(255, 0, 0)، والبكسلات على الشاشة حمرا |
| [[<img src="icon.min.svg">]] | البكسلات سودا (0، 0، 0) |
| icon.min.svg ملزوق inline | stroke = rgb(0, 0, 0) و fill الدواير rgb(0, 0, 0) |

الـ img مقفول على الـ CSS. والملف المنضّف حتى لو inline فضل أسود، لأن الألوان مكتوبة جواه ([[stroke="#000"]]) أو مش موجودة خالص (افتراضي أسود). عشان كده الـ solCode بيستخدم plugin [[convertColors]] بـ [[currentColor: true]] يحوّل أي لون ثابت لـ [[currentColor]]. جربناه على نفس الملف: الـ path طلع [[stroke="currentColor"]]، بس الدواير طلعت من غير [[fill]] خالص (الـ [[#000000]] اتشال قبل ما يتحوّل)، يعني هتفضل سودا. فضيف [[fill="currentColor"]] على الـ [[<svg>]] نفسه، والدواير هتورثه.

## الخلاصة

| | [[<img>]] | inline |
|---|---|---|
| الكاش | آه | لأ (جزء من الـ HTML) |
| CSS و [[currentColor]] | مش بيوصلوا | بيشتغلوا |
| مناسب لـ | لوجو، رسومات كبيرة | أيقونات بتتلوّن |

- أيقونة جوه زرار: [[aria-hidden="true"]] عليها والاسم على الزرار. SVG بيعني حاجة: [[role="img"]] واسم.
- أي SVG من برنامج تصميم: svgo الأول، وبعدين [[currentColor]] بدل الألوان الثابتة.`,
          lines: [
            R`لوجو ثابت: [[<img>]] بيتكاش، ومقاس، و alt.`,
            "زرار أيقونة: الاسم على الزرار.",
            R`الأيقونة inline: الخطوط بلون الكلام ([[currentColor]])، ومخفية عن قارئ الشاشة لأن الزرار ليه اسم.`,
            "عجلتين السلة.",
            "جسم السلة.",
            "قفلة الـ svg.",
            "قفلة الزرار.",
            R`SVG بيعني حاجة لوحده: [[role="img"]] واسمه من الـ [[<title>]].`,
            "لون الأيقونة هو لون الزرار.",
            "في الـ hover الزرار بيتلوّن، والأيقونة معاه من غير أي CSS ليها."
          ],
          sol: R`على أيقونة تجربة، svgo طبع حاجة زي [[Done in 14 ms! 0.449 KiB - 65.4% = 0.155 KiB]]. الملف الجديد سطر واحد: من غير [[<?xml>]] ولا التعليق بتاع البرنامج ولا [[<metadata>]] ولا الـ [[<g>]]، والأرقام اتقصّرت ([[7.000]] بقت [[7]])، والـ [[viewBox]] و [[<title>]] لسه موجودين.

الـ inline جوه الزرار الأحمر اتلوّن أحمر (لو فيه [[currentColor]])، والـ img فضل بلونه الأصلي، لأن الـ CSS مش بيدخل جوه الـ img.

لو الـ inline فضل أسود: الأيقونة فيها [[fill]] بلون ثابت أو svgo شال [[fill="#000"]] فبقت على الافتراضي (أسود). حط [[fill="currentColor"]] على الـ [[<svg>]].`,
          solCode: R`// svgo.config.mjs: أي لون ثابت في الأيقونة يبقى currentColor
export default {
  plugins: ['preset-default', { name: 'convertColors', params: { currentColor: true } }],
};`
        }
      ]
    }
]);
