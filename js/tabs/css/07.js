// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "position و responsive",
      l: 1,
      n: "position بيطلّع العنصر من الترتيب العادي، و media queries بتغيّر الشكل حسب الشاشة",
      projects: [
        { lvl: 'صغير', t: R`زرار تواصل عايم مبيغطّيش حاجة`, what: R`زرار [[fixed]] على [[inset-inline-end]] و [[bottom: calc(1rem + env(safe-area-inset-bottom))]]، والكلام جنبه يختفي تحت 640، ولو فيه شريط CTA تحت على الموبايل الزرار يطلع فوقه. من درس [[sticky و fixed]].`, done: R`في rtl و ltr الزرار في ركن النهاية تحت، وعلى 360 مش فوق زرار «احجز» (قيس الاتنين بـ [[getBoundingClientRect]] ومفيش تداخل)، وبعد scroll 2000 لسه في نفس المكان.` },
        { lvl: 'صغير', t: R`كارت منتج بشارات ولينك واحد`, what: R`كارت فيه شارة خصم وشارة «جديد» وزرار مفضّلة كلهم absolute على أركان logical، والكارت كله لينك بـ [[::after]]. من درس [[position: absolute]].`, done: R`في rtl و ltr الشارات في الأركان الصح، و [[elementFromPoint]] فوق زرار المفضّلة بيرجّع BUTTON وفوق الباقي A، وقارئ الشاشة بيقرا لينك واحد بس.` },
        { lvl: 'متوسط', t: R`navbar بحالتين و drawer للموبايل`, what: R`هيدر sticky شفاف فوق الهيرو وبيبقى مصمت بظل بعد أول 40px scroll (class بـ listener [[{ passive: true }]])، وتحت 768 زرار ☰ بيفتح drawer من ناحية النهاية فوق scrim، و z-index من توكنز. بيجمع [[sticky و fixed]] و [[z-index]] و [[media queries]].`, done: R`الـ drawer بيدخل من الناحية الصح في rtl و ltr، والـ scrim بيقفله، و Escape بيقفله، والـ toggle عليه [[aria-expanded]] صح، و [[elementFromPoint]] فوق الـ drawer بيرجّع الـ drawer مش الهيدر، ومفيش scroll أفقي وهو مقفول.` },
        { lvl: 'متوسط', t: R`صفحة docs بفهرس لازق`, what: R`صفحة توثيق متخيلة: grid بعمودين، والفهرس [[sticky; top]] مع [[align-self: start]]، والعناوين [[scroll-margin-top]]، وتحت 1024 الفهرس يبقى [[<details>]] فوق المحتوى. من درس [[sticky و fixed]] و [[media queries]].`, done: R`على 1280 الفهرس فاضل ظاهر لحد آخر الصفحة، والضغط على أي لينك بيوصل للعنوان من غير ما يستخبى، وعلى 768 الفهرس مقفول فوق، ومفيش [[overflow: hidden]] على أي جد للفهرس.` },
        { lvl: 'كبير', t: R`landing page لعيادة أسنان متخيلة`, what: R`أقسام بـ id وروابط (خدمات، وقبل وبعد، وأسعار، وأسئلة)، و nav زجاجي sticky، وهيرو بعنوان [[clamp()]]، وسلايدر قبل وبعد بـ range و [[clip-path]]، وأسئلة بـ [[<details>]]، وزرار حجز عايم بيختفي لما توصل لقسم الأسعار، و z-index من توكنز. واختبار المقاسات بسكربت درس [[مصفوفة مقاسات]] بالعربي والإنجليزي. بيجمع الوحدة دي مع وحدة Flexbox و Grid والوحدات والمتغيرات.`, done: R`[[node matrix.js]] بيطلّع [[all sizes OK]] على ١٥ عرض × لغتين، والسكربت بيخرج بـ 0، والسلايدر بيشتغل بالكيبورد، وكل لينك في الـ nav بيوصل لعنوانه ظاهر، و Lighthouse › Accessibility أكتر من 90، والصفحة اتشغّلت مرتين ورا بعض بنفس النتيجة.`, ext: R`زوّد quiz «محتاج إيه؟» بخطوات، ونسخة إنجليزي كاملة بزرار لغة، و dark mode، وحط [[matrix.js]] في GitHub Actions يفشل لو أي مقاس اتكسر.` },
        { lvl: 'فكرة', t: R`صفحة إنقاذ: ٦ أعطال responsive`, what: R`اعمل صفحة فيها ٦ أعطال مقصودة: [[html, body { overflow-x: hidden }]] بيموّت الـ sticky، وعنصر مايل [[width: 106%]]، وأيقونة [[left]] في rtl، وقايمة [[z-index: 9999]] مستخبية، و meta viewport ناقص، وهيدر fixed مغطي العناوين. وبعدين صلّحهم واحد واحد.`, done: R`لكل عطل: سطر «العَرَض / إزاي لقيته / التصليح / إزاي اتأكدت» برقم متقاس (scrollWidth أو top أو elementFromPoint)، والمصفوفة بعد التصليح كلها OK.`, ext: R`ابعت الصفحة البايظة لزميل يحلّها وانت تراجع تشخيصه، وحوّل الفحص لسكربت CI بيفشل لو أي عطل رجع.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** شارة [[position: absolute; top: 8px; inset-inline-end: 8px]] جوه كارت **مش** عليه [[relative]]، بس جد الكارت (div حواليه) عليه [[transform: translateY(0)]]. الشارة هتتحسب من مين؟ وبعدين قيس.`, done: R`الشارة اتحسبت من الجد اللي عليه transform مش من الصفحة: في المعمل الجد بيبدأ عند (400، 100) والشارة عند (408، 108) في rtl. عرفت إن [[transform]] بيعمل containing block للـ absolute زي ما بيعمل للـ fixed.` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت منتج لمحل ورد متخيل: صورتين فوق بعض (التانية [[absolute; inset: 0; opacity: 0]] وتظهر مع [[:hover]] و [[:focus-within]])، وشارة خصم على ناحية النهاية، وزرار مفضّلة على ناحية البداية، والكارت كله لينك بـ [[::after]]، بس زرار المفضّلة لسه بيتضغط لوحده.`, done: R`[[document.elementFromPoint]] فوق زرار المفضّلة بيرجّع [[BUTTON]]، وفوق أي حتة تانية في الكارت بيرجّع [[A]]. بـ Tab على اللينك الصورة التانية بتظهر من غير ماوس. ولما تقلب [[dir]] الشارة والزرار بيبدّلوا الناحية.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حقل بحث في صفحة عربي: الأيقونة [[position: absolute; left: 12px]] والحقل [[padding-left: 40px]]. الكلام اللي بتكتبه بيبدأ تحت الأيقونة. صلّحه بحيث نفس الـ CSS يشتغل في العربي والإنجليزي.`, done: R`بعد [[inset-inline-start: 12px]] و [[padding-inline-start: 40px]]: في rtl الأيقونة يمين والكلام بيبدأ بعدها، وفي ltr الأيقونة شمال، ومفيش ولا [[left]] ولا [[right]] في الـ CSS.` },
            { lvl: 'تطبيق', t: R`**أشكال:** فقاعة كلام (tooltip) بديل مثلث بـ [[::after]] و [[border]] شفاف من ٣ نواحي، والمثلث تحت الفقاعة على ناحية البداية، بـ [[inset-inline-start]].`, done: R`المثلث لازق في الفقاعة من غير خط أبيض بينهم، ولما تقلب [[dir]] بيروح للناحية التانية لوحده، والفقاعة مبتأثرش على مكان أي عنصر حواليها (absolute).` },
            { lvl: 'تحدي', t: R`**ابني:** سلايدر «قبل وبعد» لصور ترميم متخيلة: صورتين فوق بعض في أب [[relative]]، والعليا [[clip-path: inset(0 0 0 var(--pos))]]، وفوقهم [[<input type="range">]] شفاف [[absolute; inset: 0]] بيكتب قيمته في [[--pos]]، وخط رأسي عند [[--pos]].`, done: R`الأسهم من الكيبورد بتحرّك الخط (لأن الـ range input حقيقي)، وعند 50 الخط في نص الصورة بالظبط، وعلى 360 الصورتين بعرض الشاشة ومفيش scroll أفقي، وكتبت إن [[clip-path]] و [[left]] مش logical فلازم تختبر في rtl.` },
          ],
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
            R`الكارت: [[<article>]] لأنه منتج قايم بذاته، وهو اللي هيبقى المرجع للشارة.`,
            R`الشارة «جديد»: [[<span>]] هيتطلّع من الترتيب ويتحط في ركن الكارت.`,
            R`صورة المنتج بمقاسها الأصلي (400 × 300) عشان المتصفح يحجز مكانها قبل ما تتحمّل.`,
            R`اسم المنتج لينك واحد بس، والـ [[::after]] بتاعه هيغطي الكارت كله.`,
            R`قفلة الكارت، وبعدها الـ CSS اللي بيحط كل حاجة مكانها.`,
            R`بداية الـ CSS: ٤ قواعد، كل واحدة لعنصر من اللي فوق.`,
            "الكارت مرجع للأولاد الـ absolute، ومكانه هو متغيرش.",
            "الشارة: فوق بنص rem، وعلى ناحية النهاية (يمين في الإنجليزي، شمال في العربي).",
            "الكارت كله يبقى clickable: طبقة شفافة من اللينك مغطية الكارت، والـ HTML لسه لينك واحد صح.",
            R`طبقة غامقة على الأب كله. [[inset: 0]] = top و right و bottom و left كلهم صفر.`,
            R`قفلة الـ [[<style>]]، وكده المثال خلص.`
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
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** صفحة تفاصيل كورس: grid بعمودين ([[1fr 22rem]])، والـ aside فيه كارت الحجز عليه [[position: sticky; top: 6rem]]، ومش بيلزق. الـ CSS مفيهوش overflow خالص. لاقي السبب.`, done: R`الـ aside بيتمطّ لطول الصف كله (align الافتراضي stretch)، فمفيش مكان يتحرك فيه: في المعمل طوله 3000 وبعد scroll 800 الـ top بقى -800. بعد [[align-self: start]] طوله قد محتواه وفضل لازق عند 96 (6rem).` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** ٣ صفحات فيها نفس الهيدر [[sticky; top: 0]]: (١) [[body { overflow-x: hidden }]]، (٢) [[html, body { overflow-x: hidden }]]، (٣) [[html, body { overflow-x: clip }]]. بعد [[scrollTo(0, 1000)]] الهيدر هيبقى فين في كل واحدة؟`, done: R`(١) [[top]] = 0 (لازق، لأن overflow الـ body لوحده بيتنقل للـ viewport)، (٢) [[top]] = -1000 (الـ body بقى scroll container مبيعملش scroll، فالهيدر مشي مع الصفحة)، (٣) [[top]] = 0. وعرفت ليه [[overflow-x: clip]] هو البديل الآمن.` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar كبسولة عايمة لمدونة رحالة متخيلة: [[position: fixed; inset-inline: 0; top: 0.75rem]]، وجواه صندوق [[max-width]] ومدوّر بالكامل وخلفيته نص شفافة و [[backdrop-filter: blur(16px)]]، ومعاه [[@supports not (backdrop-filter: blur(1px))]] بخلفية مصمتة. والأقسام عليها [[scroll-margin-top]] قد الـ nav.`, done: R`لما تدوس على لينك [[#الأقسام]] العنوان بيبان كله تحت الـ nav مش مستخبي وراه (الـ top بتاع العنوان أكبر من أو يساوي bottom بتاع الـ nav)، والـ nav فاضل على بعد 12 من فوق بعد أي scroll، وأول محتوى في الصفحة مش مستخبي (padding-top على الـ main).` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول طلبات طويل جوه صندوق [[max-height: 20rem; overflow: auto]] ورأسه [[th { position: sticky; top: 0 }]] بخلفية، وتحت الشاشة على الموبايل شريط تنقل [[fixed]] بـ [[padding-bottom: env(safe-area-inset-bottom)]].`, done: R`لما تعمل scroll **جوه** صندوق الجدول، الـ th بيفضل فوق الصندوق (هنا الـ overflow هو المقصود: الصندوق نفسه بيعمل scroll). وآخر صف في الصفحة باين فوق الشريط اللي تحت مش مستخبي تحته.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الهيدر (ارتفاعه 64) مرة [[fixed]] ومرة [[sticky]]، وتحته [[<h1>]]. قيس [[top]] بتاع الـ h1 قبل أي scroll في الاتنين، وصلّح نسخة الـ fixed.`, done: R`مع sticky الـ h1 بيبدأ تحت الهيدر (top أكبر من أو يساوي 64). مع fixed الـ h1 بيبدأ من فوق خالص تحت الهيدر ومستخبي (top أقل من 64)، والتصليح [[padding-top: 64px]] على الـ body أو متغير [[--nav-h]] بيرجّعه 64 أو أكتر.` },
          ],
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
            R`هيدر الموقع: هنخليه يلزق فوق وانت نازل من غير ما ياخد مكان حد.`,
            "sticky: في مكانه العادي لحد ما يوصل للحد...",
            "...اللي هو أول الشاشة، وساعتها يلزق.",
            "فوق المحتوى اللي بيعدّي تحته.",
            "خلفية بيضا نص شفافة.",
            "blur للي تحته: الشكل «الزجاجي» المشهور.",
            R`قفلة [[.site-header]]، والزرار العايم جاي بعده.`,
            R`زرار واتساب عايم: هيفضل في ركن الشاشة مهما عملت scroll.`,
            "ثابت في الشاشة مهما عملت scroll.",
            R`16px من تحت الشاشة (وعلى موبايل فيه شق زوّد [[env(safe-area-inset-bottom)]] عليها).`,
            "وعلى ناحية النهاية (بيتقلب في العربي).",
            R`قفلة [[.whatsapp]]، وآخر سطر لعناوين الجداول.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** كارت عليه [[transform: translateY(-4px)]] عند الـ hover، وجواه قايمة [[absolute; z-index: 50]] بتنزل على الكارت اللي بعده (اللي عليه نفس الـ hover). لما تقف على الكارت الأول القايمة هتبان؟ ولما الماوس يروح على القايمة نفسها؟`, done: R`كتبت توقعك، وجرّبت: الـ transform عمل stacking context للكارت، فالقايمة اتحبست جواه، والكارت اللي بعده (جاي بعده في الـ HTML وفي نفس المستوى) بيغطيها. والحل [[position: relative; z-index: 1]] على الكارت اللي عليه hover أو [[:focus-within]]، أو portal.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المثال بتاع الدرس بالظبط (هيدر [[z-index: 1]] وجواه قايمة [[9999]] وهيرو [[2]]). صلّحه بـ **تلات** طرق مختلفة ومن غير ما تزوّد أي رقم على القايمة.`, done: R`في التلات طرق [[document.elementFromPoint(50, 150)]] بيرجّع [[DIV.dropdown]]: (١) الهيدر [[z-index: 3]]، (٢) شيل الـ z-index من الهيدر، (٣) شيل [[z-index]] من الهيرو أو خليه [[auto]]. وكتبت أنهي واحدة أأمن لما الصفحة تكبر.` },
            { lvl: 'تطبيق', t: R`**ابني:** scale طبقات كتوكنز: [[--z-sticky: 10]] و [[--z-dropdown: 40]] و [[--z-modal: 50]] و [[--z-toast: 100]]، وصفحة فيها هيدر sticky وقايمة ومودال و toast كلهم فوق نفس النقطة.`, done: R`[[elementFromPoint]] عند النقطة اللي فيها الأربعة بيرجّع الـ toast، ولما تقفل الـ toast بيرجّع المودال، و grep على الـ CSS مفيهوش [[z-index:]] برقم مكتوب غير في تعريف التوكنز.` },
            { lvl: 'تطبيق', t: R`**أشكال:** كوتشينة ٣ كروت فوق بعض متفرّدين بـ [[rotate]] و [[translate]]، والكارت اللي الماوس عليه يطلع فوق الكل من غير ما الباقيين يتحركوا.`, done: R`الكارت اللي عليه hover أو focus هو اللي [[elementFromPoint]] بيرجّعه في المكان اللي متداخل فيه، والترتيب بيرجع زي ما كان لما الماوس يمشي، وكل الـ z-index أرقام صغيرة (1 لـ 3).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN (صفحة «Stacking context») لاقي ٣ خصائص بتعمل stacking context ومش مذكورة في الدرس، وجرّب كل واحدة على الهيدر بتاع المثال من غير z-index.`, done: R`عندك ٣ خصائص (مثلًا [[mix-blend-mode]] و [[contain: layout]] و [[perspective]] و [[view-transition-name]]) والرابط، ولكل واحدة ناتج [[elementFromPoint]] في نقطة جوه الهيدر نفسه (عشان القص ميلخبطش النتيجة): لو رجّعت [[MAIN.hero]] يبقى عملت context وحبست القايمة. ولو خاصية مكتوبة في MDN ومطلعتش context عندك (في Chrome 156 جربنا [[container-type: inline-size]] ومعملش) اكتب ده.` },
          ],
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

| على [[.header]] | مين فوق عند (50، 150) | ليه |
|---|---|---|
| [[z-index: 1]] (المثال) | MAIN.hero | الهيدر طبقة رقمها 1 والهيرو 2 |
| [[z-index: 3]] | DIV.dropdown | الطبقة كلها بقت أعلى من الهيرو |
| من غير z-index خالص | DIV.dropdown | مفيش طبقة، فالـ 9999 بتتقارن مع الهيرو مباشرة |
| [[opacity: 0.99]] من غير z-index | MAIN.hero | opacity عمل طبقة لوحده |
| [[transform: translateY(0)]] من غير z-index | MAIN.hero | transform عمل طبقة لوحده |
| [[isolation: isolate]] من غير z-index | MAIN.hero | isolation عمل طبقة مقصودة |

- [[z-index: 3]]: الطبقة كلها بقت أعلى من 2، فالقايمة طلعت معاها.
- من غير z-index: مفيش context، فالقايمة بتتقارن بالـ 9999 مع الهيرو مباشرة وتكسب.
- opacity و transform و isolation: كل واحد عمل context (رقمه زي 0)، فالقايمة اتحبست تاني تحت الهيرو.

## الخلاصة

- الـ z-index بيتقارن جوه نفس الـ stacking context بس.
- الأب اللي عليه z-index أو opacity أقل من 1 أو transform أو filter أو isolation بيحبس أولاده جواه.
- القايمة مستخبية؟ متزوّدش أصفار: ارفع الأب صاحب الـ context، أو طلّع القايمة برا بـ portal.`,
          lines: [
            R`الهيدر: هيعمل stacking context لما ناخد عليه [[z-index]] في الـ CSS.`,
            "قايمة بتنزل من الهيدر فوق الهيرو.",
            R`قفلة الهيدر: القايمة **ابن** الهيدر، ودي النقطة اللي هتفرق.`,
            R`الهيرو جاي بعد الهيدر، وهو **أخو** الهيدر مش أخو القايمة.`,
            R`بداية الـ CSS: كل سطر بيحط طبقة لعنصر واحد.`,
            "الهيدر عمل stacking context بـ z-index 1.",
            "9999 بس جوه طبقة الهيدر. بالنسبة للصفحة هو «1» زي أبوه.",
            "الهيرو 2 فبيغطّي الهيدر كله بما فيه القايمة. الحل: ارفع الهيدر نفسه، مش القايمة.",
            R`[[isolation: isolate]]: اعمل stacking context مقصود من غير z-index، عشان الـ z-index اللي جوه الكارت ميهربش برا.`,
            "خد بالك: opacity أقل من 1 و transform بيعملوا stacking context من غير ما تاخد بالك.",
            R`قفلة الـ [[<style>]]، وكده المثال خلص.`
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[@media (max-width: 768px) { .x { color: red } }]] وبعدها [[@media (min-width: 768px) { .x { color: blue } }]]. اللون هيبقى إيه على 767 و 768 و 769؟`, done: R`على 767 أحمر، وعلى 768 أزرق (الشرطين اتحققوا، والأخير في الملف كسب)، وعلى 769 أزرق. وعرفت ليه خلط [[max-width]] و [[min-width]] بنفس الرقم بيعمل نقطة فيها القاعدتين.` },
            { lvl: 'تطبيق', t: R`**ابني:** قسم باقات mobile-first: عمود واحد، ومن [[40rem]] عمودين، ومن [[64rem]] ٣. على الموبايل الباقة المميزة تيجي الأول بـ [[order: -1]]، وعلى الديسكتوب ترجع في النص.`, done: R`على 360 المميزة أول كارت، وعلى 768 عمودين، وعلى 1280 ٣ أعمدة والمميزة في النص. والـ CSS مفيهوش ولا [[max-width]]، ومفيش scroll أفقي في التلاتة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة الـ media queries بتاعتها صح بس على الموبايل الحقيقي بتظهر بشكل الديسكتوب. شغّلها في DevTools وضع الموبايل (أو Playwright بـ [[isMobile: true]] وعرض 390) واقرا [[innerWidth]].`, done: R`قبل: [[innerWidth]] = 980 وقاعدة [[min-width: 48rem]] متحققة على موبايل 390. بعد ما ضفت [[<meta name="viewport" content="width=device-width, initial-scale=1">]]: [[innerWidth]] = 390 والقاعدة مش متحققة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف CSS قديم فيه الـ breakpoints دي بـ [[max-width]] متوزعة: 1024 و 768 و 600 و 480 و 768 و 320 و 1024 و 600 و 768. اعدّهم واعمل جدول، وبعدين حوّلهم لـ ٣ أو ٤ breakpoints mobile-first بـ [[min-width]].`, done: R`عندك جدول فيه ٥ قيم فريدة وعدد كل واحدة (768 ×٣، و 1024 ×٢، و 600 ×٢، و 480 و 320 ×١)، والملف الجديد فيه ٤ [[min-width]] أو أقل، ولقطات 320 و 768 و 1280 قبل وبعد شبه بعض.` },
            { lvl: 'تطبيق', t: R`**ابني:** ٣ شروط مش للعرض: [[(hover: none)]] أزرار «أضف للسلة» تبان دايمًا على اللمس، و [[(prefers-reduced-motion: reduce)]] يلغي حركة الكروت، و [[print]] يخفي الـ nav والفوتر.`, done: R`من DevTools › Rendering جرّبت [[prefers-reduced-motion]] والحركة وقفت، ومن وضع الموبايل الأزرار باينة من غير hover، و Ctrl+P بيطلّع صفحة من غير nav.` },
            { lvl: 'تحدي', t: R`**refactor:** حوّل الـ media queries بتاعة المثال للشكل الجديد [[(width >= 40rem)]] و [[(40rem <= width < 64rem)]] وشيل أي تداخل.`, done: R`على 639 و 640 و 1023 و 1024 عدد الأعمدة نفسه زي قبل التحويل (1 و 2 و 2 و 4 في [[gridTemplateColumns]])، ومفيش عرض بتتحقق فيه قاعدتين متعارضتين.` },
          ],
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
            R`...المنتجات تبقى عمودين متساويين جنب بعض.`,
            R`قفلة أول media query، والتانية بتكمّل عليها.`,
            R`ومن 1024px وطالع (lg في Tailwind)...`,
            R`...المنتجات تبقى ٤ أعمدة، والقاعدة دي بتكسب لأنها جاية آخر الملف.`,
            R`قفلة التانية، وبعدها شروط مش للعرض خالص.`,
            "بس على أجهزة فيها ماوس بجد (مش شاشات لمس)...",
            "...الكارت يطلع لفوق عند الـ hover.",
            R`قفلة شرط الـ hover، وآخر شرط للثيم.`,
            "لو نظام التشغيل على الوضع الغامق...",
            R`...غيّر متغير الخلفية [[--bg]]، وكل اللي بيستخدمه بيتغيّر معاه.`,
            R`قفلة آخر media query، وكده المثال خلص.`
          ],
          sol: R`وانت بتسحب العرض: من الأصغر لحد 639px عمود واحد (كل كارت بعرض الشاشة). عند 640 بالظبط (يعني [[40rem]] لو خط المتصفح 16px) بيبقوا عمودين. عند 1024 ([[64rem]]) أربعة أعمدة. العرض الحالي بيظهر فوق الشاشة في وضع الموبايل، وشريط الـ media queries (من قايمة الـ ⋮ › Show media queries) بيرسم الـ breakpoints ألوان تدوس عليها.

من Rendering › Emulate CSS media feature prefers-color-scheme اختار [[dark]]: متغيّر [[--bg]] على [[:root]] اتغير؛ لو الـ body بيستخدم [[var(--bg)]] الخلفية هتغمق فورًا من غير ما تغيّر ثيم الجهاز. وتأثير الـ hover على الكروت مش هيشتغل في وضع الموبايل بالـ touch، لأن [[(hover: hover)]] مش متحققة.

لو عدد الأعمدة اتغير عند أرقام تانية، غالبًا خط المتصفح مش 16px (الـ rem في الـ media query بيتحسب من إعداد المتصفح، مش من [[html { font-size }]]). ولو مفيش أي تغيير، اتأكد إن الـ viewport meta موجود.`
        },
        {
          cmd: "مصفوفة مقاسات",
          title: "اختبار responsive بجد: كل العروض × العربي والإنجليزي، وقياس الـ scroll الأفقي، ولقطة لكل مقاس",
          desc: R`سحب حافة المتصفح بإيدك بيفوّت حاجات: بتبص على ٣ عروض بلغة واحدة. الطريقة اللي بتمسك المقاسات اللي بتتكسر **فعلًا**: سكربت Playwright بيلف على مصفوفة عروض ([[320]] و [[360]] و [[375]] و [[414]] و [[600]] و [[761]] لحد [[1024]] و [[1100]] و [[1440]] و [[1920]]) × لغتين (عربي RTL وإنجليزي)، ولكل واحدة: [[page.setViewportSize]]، ويقيس [[document.documentElement.scrollWidth]] مقابل [[innerWidth]] (أكبر = فيه scroll أفقي)، ويطلّع العناصر اللي خارجة برا الشاشة بالاسم، ويقيس أهداف اللمس الصغيرة، وياخد لقطة.

والأهم: **بعد كل تصليح شغّل المصفوفة كلها تاني**. في المعمل تصليح اللوجو على التابلت ([[flex: none]]) كسر الموبايل من 320 لـ 414، ومحدش كان هيشوفه لو اختبر التابلت بس. وكمان المصفوفة بتقولك أنهي قاعدة CSS بقت ملهاش لازمة.`,
          example: R`npm i -D playwright-core@1.64.1
node matrix.js
node matrix.js "fix=menu,touch,logo,phone"
# في Console المتصفح على أي صفحة:
document.documentElement.scrollWidth > innerWidth
[...document.querySelectorAll("body *")].filter(e => { const b = e.getBoundingClientRect(); return b.right > innerWidth || b.left < 0; })`,
          lines: [
            R`باكدج Playwright من غير المتصفحات ([[-D]] للتطوير بس). هنستخدم Chrome المتسطب على الجهاز بـ [[channel: "chrome"]] بدل ما ننزّل متصفح.`,
            R`شغّل السكربت اللي في الشرح على الصفحة زي ما هي: ٣٠ سطر (١٥ عرض × لغتين)، و [[OK]] أو [[BROKEN]] لكل واحد، ولقطة في [[shots/]].`,
            R`نفس المصفوفة على الصفحة بالتصليحات (المعمل بيشغّل كل تصليح بكلاس على [[<html>]] عشان نقارن). رقم الخروج [[0]] لو كله تمام، و [[1]] لو فيه مقاس مكسور: ينفع في CI.`,
            R`في Console: [[true]] = الصفحة أعرض من الشاشة، يعني فيه scroll أفقي.`,
            R`مين اللي خارج؟ كل عنصر في الـ body، اطلب مستطيله ([[getBoundingClientRect]])، وسيب اللي حافته اليمين بعد عرض الشاشة أو حافته الشمال قبل صفر (ده اللي بيحصل في RTL).`,
          ],
          try: R`خد صفحة عندك فيها navbar (أو ابني المعمل اللي في الشرح)، وشغّل المصفوفة عليها بالعربي والإنجليزي. اكتب كل مقاس [[BROKEN]] والعنصر اللي خارج. صلّح واحد بس، وشغّل المصفوفة كلها تاني: فيه مقاس كان سليم واتكسر؟`,
          flag: "term",
          teach: R`## العَرَض

الـ navbar «شغّال على الموبايل والديسكتوب»: جربته على 375 و 1440 من DevTools. وبعدين حد فتح الموقع على تابلت بالعربي، وزرار تغيير اللغة و «اشترك» مش ظاهرين خالص، والصفحة بتتسحب يمين وشمال. وحد تاني على موبايل صغير (320) زرار القايمة نصه برا الشاشة.

---

## المعمل

صفحة navbar فيها: لوجو (صورة 40×40 واسم)، و ٦ روابط، وزرار لغة، وزرار «اشترك الآن»، وزرار قايمة (☰) بيظهر على الموبايل. والصفحة بتشتغل بالعربي ([[dir="rtl"]]) وبـ [[?lang=en]] بالإنجليزي. واتشغّلت على ويندوز 11 بـ [[playwright-core]] 1.64.1 و Chrome 156 المتسطب (Node 24.22).

~~~css style.css (قبل)
.nav { display: flex; align-items: center; gap: 24px; padding: 12px 24px; }
.logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 20px; }
.links { display: flex; gap: 20px; white-space: nowrap; }
.actions { display: flex; align-items: center; gap: 12px; margin-inline-start: auto; white-space: nowrap; }
.lang { font-size: 14px; }
.cta { padding: 10px 18px; border-radius: 8px; }
.menu-btn { display: none; font-size: 22px; padding: 8px 14px; }
@media (max-width: 760px) {
  .links { display: none; }
  .menu-btn { display: inline-flex; }
}
~~~

والسكربت:

~~~js matrix.js
const { chromium } = require("playwright-core");
const BASE = "http://127.0.0.1:8931/";
const widths = [320, 360, 375, 414, 600, 761, 768, 820, 900, 1000, 1024, 1100, 1280, 1440, 1920];
const extra = process.argv[2] ? "&" + process.argv[2] : "";
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  const bad = [];
  for (const lang of ["ar", "en"]) {
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(BASE + "?lang=" + lang + extra);
      const r = await page.evaluate(() => {
        const iw = innerWidth, sw = document.documentElement.scrollWidth;
        const out = [...document.querySelectorAll("body *")]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.right > iw + 0.5 || b.left < -0.5); })
          .map(e => e.className || e.tagName.toLowerCase());
        const logo = Math.round(document.querySelector(".logo").getBoundingClientRect().height);
        const small = [...document.querySelectorAll("a, button")]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width && (b.width < 24 || b.height < 24); })
          .map(e => e.className + " " + Math.round(e.getBoundingClientRect().height) + "px");
        return { iw, sw, out: [...new Set(out)], logo, small };
      });
      await page.screenshot({ path: "shots/" + lang + "-" + w + ".png" });
      const ok = r.sw <= r.iw && r.logo <= 40 && !r.small.length;
      if (!ok) bad.push(lang + "-" + w);
      console.log(lang, String(w).padStart(4), "scrollWidth=" + r.sw, "logo=" + r.logo + "px", ok ? "OK" : "BROKEN", r.out.join(","), r.small.length ? "small: " + r.small.join(",") : "");
    }
  }
  console.log(bad.length ? "broken: " + bad.join(" ") : "all sizes OK");
  await browser.close();
  process.exitCode = bad.length ? 1 : 0;
})();
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[widths]] | العروض: موبايلات صغيرة (320 و 360) وشائعة (375 و 414)، وتابلت (761 لحد 1024)، و [[1100]] حدود القايمة، وديسكتوب. ومعاها حدود كل breakpoint (760 و 761) |
| [[channel: "chrome"]] | Chrome المتسطب. من غير [[npx playwright install]] |
| [[setViewportSize]] | غيّر عرض الصفحة. ده اللي الـ media queries بتشوفه |
| [[scrollWidth]] مقابل [[innerWidth]] | الصفحة أعرض من الشاشة = scroll أفقي. وده بيمسك RTL كمان (العنصر بيخرج شمال) |
| [[out]] | أسامي العناصر اللي حافتها برا الشاشة. [[0.5]] سماح للكسور |
| [[logo]] | ارتفاع اللوجو. أكتر من 40 = الاسم اتكسر على سطرين (اللوجو «اتضغط») |
| [[small]] | روابط وزراير أصغر من 24px في أي اتجاه (الحد الأدنى في WCAG 2.2، معيار 2.5.8، من الوثائق) |
| [[process.exitCode]] | [[1]] لو فيه مقاس مكسور، فينفع يتحط في CI |

---

## ١. أول تشغيل: كل حاجة مكسورة، بس بأشكال مختلفة

~~~text node matrix.js (مختصر)
ar  320 scrollWidth=363 logo=60px BROKEN actions,menu-btn small: lang 21px
ar  375 scrollWidth=375 logo=60px BROKEN  small: lang 21px
ar  600 scrollWidth=600 logo=40px BROKEN  small: lang 21px
ar  761 scrollWidth=924 logo=60px BROKEN actions,lang,cta small: lang 21px
ar  900 scrollWidth=924 logo=60px BROKEN actions,cta small: lang 21px
ar 1000 scrollWidth=1000 logo=40px BROKEN  small: lang 21px
en  320 scrollWidth=366 logo=60px BROKEN actions,menu-btn small: lang 21px
en  761 scrollWidth=761 logo=60px BROKEN  small: lang 21px
en  820 scrollWidth=820 logo=40px BROKEN  small: lang 21px
~~~

نقرا المشاكل الأربعة:

| المشكلة | فين | الدليل |
|---|---|---|
| (أ) اللوجو بيتضغط | إنجليزي 761 و 768، والموبايل في الاتنين | [[logo=60px]]: الاسم نزل سطر تاني لأن [[.logo]] بيتصغّر عشان يدّي مكان للروابط |
| (ب) الأزرار برا الشاشة | **عربي** من 761 لحد 900 | [[scrollWidth=924]] والخارج [[lang]] و [[cta]]. الكلام العربي أطول ([[الصفحة الرئيسية]] مقابل [[Home]])، فالروابط ([[nowrap]]) زقّت الأزرار برا |
| (ج) زرار القايمة برا | 320 و 360 في الاتنين | [[scrollWidth=363]] و [[366]]، والخارج [[menu-btn]] |
| (د) هدف لمس صغير | كل المقاسات | [[lang 21px]]: زرار اللغة ارتفاعه 21 بس |

لاحظ إن (ب) **مش موجودة بالإنجليزي** على نفس العرض (en 761 الـ [[scrollWidth=761]] سليم). لو جربت بلغة واحدة، كنت هتفوّتها. ولاحظ إن [[scrollWidth]] بالعربي سليم على 1000 ومكسور على 900 (و 1000 مكتوب عليه [[BROKEN]] بسبب زرار اللغة بس): الكسر في **نطاق** (761 لحد 900 تقريبًا)، مش عند breakpoint واحد.

> في RTL العنصر اللي بيخرج بيخرج **شمال** ([[left]] بالسالب). الشرط [[b.left < -0.5]] هو اللي مسكه. ولو كنت بتدوّر على [[right > innerWidth]] بس، هتقول «سليم».

---

## ٢. التصليح الأول: القايمة من 1100، و 359، واللمس

~~~css
.lang { padding-block: 10px; }
@media (max-width: 1100px) {
  .links { display: none; }
  .menu-btn { display: inline-flex; }
}
@media (max-width: 359px) {
  .nav { gap: 12px; padding-inline: 12px; }
  .actions { gap: 8px; }
  .cta { padding: 8px 12px; font-size: 14px; }
  .menu-btn { padding: 6px 10px; }
}
~~~

- (ب): بدل ما الروابط تستخبى تحت 761، تستخبى تحت 1100 ويظهر ☰. الحد اتاخد من المصفوفة: العربي مكسور لحد 900 وسليم من 1000، و 1100 فيه هامش للكلام الأطول.
- (ج): الشاشات اللي أصغر من 360: مسافات وأحجام أصغر.
- (د): [[padding-block: 10px]] على زرار اللغة يكبّر مساحة اللمس من غير ما يكبّر الكلام.

~~~text node matrix.js "fix=menu,small,touch" (اللي فضل مكسور بس)
ar  320 scrollWidth=320 logo=60px BROKEN
ar  360 scrollWidth=363 logo=60px BROKEN actions,menu-btn
ar  375 scrollWidth=375 logo=60px BROKEN
ar  414 scrollWidth=414 logo=60px BROKEN
en  320 scrollWidth=320 logo=60px BROKEN
en  360 scrollWidth=366 logo=60px BROKEN actions,menu-btn
en  375 scrollWidth=375 logo=60px BROKEN
en  414 scrollWidth=414 logo=60px BROKEN
broken: ar-320 ar-360 ar-375 ar-414 en-320 en-360 en-375 en-414
~~~

التابلت كله سليم، واللمس اتحل في كل المقاسات. بس شوف 320 و 360: قاعدة 359 صلّحت 320 ([[scrollWidth=320]])، و **360 لسه مكسور** ([[363]]) لأن 360 مش أقل من 359. الحد اتحط بالتخمين، والمصفوفة كشفته.

---

## ٣. التصليح التاني: اللوجو [[flex: none]]... وكسر الموبايل

~~~css
.logo { flex: none; }
~~~

[[flex: none]] = [[flex: 0 0 auto]]: متكبرش، ومتصغرش، وعرضك قد محتواك. فالاسم مش هينزل سطر تاني.

~~~text node matrix.js "fix=menu,small,touch,logo" (اللي فضل مكسور بس)
ar  320 scrollWidth=346 logo=40px BROKEN actions,menu-btn
ar  360 scrollWidth=407 logo=40px BROKEN actions,menu-btn
ar  375 scrollWidth=407 logo=40px BROKEN actions,menu-btn
en  320 scrollWidth=360 logo=40px BROKEN actions,menu-btn
en  360 scrollWidth=420 logo=40px BROKEN actions,menu-btn
en  375 scrollWidth=420 logo=40px BROKEN actions,menu-btn
en  414 scrollWidth=420 logo=40px BROKEN actions,menu-btn
~~~

اللوجو بقى 40 في كل حتة، **بس** الموبايل بقى أسوأ: 375 و 414 كانوا من غير scroll أفقي، دلوقتي [[407]] و [[420]]. اللوجو كان بيتصغّر عشان يدّي مكان للأزرار على الموبايل، ولما منعناه، الأزرار اتزقّت برا. ده **بالظبط** اللي سحب الحافة بالإيد مبيمسكوش: صلّحت التابلت وانت بتبص على التابلت.

---

## ٤. التصليح التالت: الموبايل يشيل اسم اللوجو بصريًا

~~~css
@media (max-width: 480px) {
  .logo span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
}
~~~

ده نمط «sr-only»: الاسم مستخبي من الشاشة بس قارئ الشاشة لسه بيقراه (درس aria)، فاللينك لسه اسمه «متجر أكمي». والصورة 40px كفاية كلوجو على الموبايل.

~~~text node matrix.js "fix=menu,small,touch,logo,phone"
all sizes OK
~~~

ورقم الخروج [[0]].

## ٥. وقاعدة 359؟ المصفوفة بتقول إنها مبقتش لازمة

شلنا قاعدة [[max-width: 359px]] وشغّلنا تاني:

~~~text node matrix.js "fix=menu,touch,logo,phone"
all sizes OK
~~~

لما الاسم اتشال على الموبايل، اتوفّر مكان كفاية لـ 320. فالقاعدة دي بقت كود ميت: امسحها. (في الحالة الأصلية قاعدة [[max-width: 359px]] كانت هي اللي صلّحت 320، لأن ترتيب التصليحات كان مختلف. المصفوفة هي اللي بتقرر، مش الذاكرة.)

---

## اللي المصفوفة دي **مبتقولهوش**

- Chromium مش Safari. وأجهزة آيفون في Playwright بتشتغل على WebKit (محتاج [[npx playwright install webkit]]، مش متسطب هنا). فالـ [[100vh]] في Safari، والفيديو، و [[env(safe-area-inset-top)]] (النوتش) محتاجين جهاز حقيقي أو على الأقل WebKit.
- الخطوط: لو الخط بيتحمّل من النت والسكربت صوّر قبل ما يحمّل، العرض هيختلف. استنى [[document.fonts.ready]] قبل القياس.
- التفاعل: القايمة لما تتفتح، والـ hover، والكيبورد. ده اختبار تاني.
- الشكل: [[scrollWidth]] سليم ميعنيش إن الشكل حلو. عشان كده فيه لقطة لكل مقاس في [[shots/]]: ٣٠ صورة تبص عليهم في دقيقة.

## الخلاصة

| | |
|---|---|
| المصفوفة | عروض الموبايل والتابلت والديسكتوب **وحدود كل breakpoint** × كل لغة |
| scroll أفقي | [[document.documentElement.scrollWidth > innerWidth]] |
| مين خارج | [[getBoundingClientRect()]]: [[right > innerWidth]] **أو** [[left < 0]] (RTL) |
| اللمس | أصغر من 24px = مشكلة (WCAG 2.2، معيار 2.5.8) |
| بعد كل تصليح | المصفوفة **كلها** تاني. تصليح مقاس بيكسر مقاس |
| رقم الخروج | [[0]] أو [[1]]: حطها في CI |

> سحب الحافة بالإيد بيوريك المقاسات اللي انت بتبص عليها. المصفوفة بتوريك المقاسات اللي الزوار عليها.`,
          deep: {
            why: R`أغلب كسر الـ responsive بيحصل في نطاقات مش عند أرقام مشهورة: تابلت بالعربي، أو موبايل صغير، أو حد الـ breakpoint بالظبط. والعربي والإنجليزي بيتكسروا في أماكن مختلفة لأن طول الكلام مختلف. والأخطر: التصليح بيتعمل وانت بتبص على مقاس واحد، فبيكسر مقاس تاني مش قدامك. المصفوفة بتخلّي «سليم» رقم بيتقاس، مش إحساس.`,
            how: R`[[setViewportSize]] بيغيّر عرض الـ viewport اللي الـ media queries بتتقيّم عليه، وبعد [[goto]] الصفحة بتتبني من جديد بالعرض ده. [[scrollWidth]] بتاع [[documentElement]] هو عرض المحتوى كله بما فيه اللي خارج، فلو أكبر من [[innerWidth]] فيه scroll أفقي. وفي RTL الصفحة بتبدأ من اليمين، فالعنصر اللي بيفيض بيروح شمال ([[left]] سالب)، وده بيزوّد [[scrollWidth]] برضه. و [[flex: none]] بيلغي [[flex-shrink]]، فالعنصر مبيتنازلش عن مكانه، فاللي جنبه هو اللي بيتزق. والـ sr-only بيشيل العنصر من حساب العرض ([[position: absolute]]) من غير ما يشيله من الـ accessibility tree.`,
            when: R`قبل أي إطلاق، وبعد أي تعديل في الـ header أو الـ navbar أو أي حاجة [[nowrap]] أو [[flex]]، وبعد إضافة لغة. وكخطوة في CI: السكربت بيخرج [[1]] لو فيه مقاس مكسور، فالـ PR بيقف. ولو الصفحة طويلة، اعمل المصفوفة على أهم ٣ صفحات بس (الرئيسية، والمنتج، والدفع).`,
            mistakes: R`تختبر ٣ عروض بلغة واحدة. تدوّر على [[right > innerWidth]] بس فتفوّت RTL. تحط breakpoint بالتخمين (359) من غير ما تجرّب الرقم اللي بعده (360). تصلّح مقاس ومتعيدش الباقي. تسيب قواعد بقت ميتة بعد تصليح تاني. تفتكر Chromium = Safari. وتشيل اسم اللوجو بـ [[display: none]] فيضيع اسم اللينك عند قارئ الشاشة.`
          },
          sol: R`أول تشغيل على صفحة فيها navbar طويل غالبًا هيطلع [[BROKEN]] في: الموبايلات الصغيرة (عنصر في [[actions]] برا)، والتابلت بالعربي ([[scrollWidth]] أكبر من العرض)، وأي رابط ارتفاعه أقل من 24. على المعمل: [[broken:]] فيها الـ ٣٠ مقاس في أول تشغيل (بسبب زرار اللغة 21px)، و ٨ بعد التصليح الأول (الموبايل)، و ٧ بعد [[flex: none]] على اللوجو، وصفر ([[all sizes OK]]) بعد قاعدة 480.

والإجابة على السؤال: أيوه. تصليح اللوجو على التابلت ([[flex: none]]) خلّى 375 و 414 (اللي كانوا من غير scroll أفقي) يطلّعوا [[scrollWidth=407]] و [[420]]. ده اللي بيحصل لما تصلّح وانت بتبص على مقاس واحد.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة RTL فيها زرار [[position: absolute; left: -40px]]. [[document.documentElement.scrollWidth > innerWidth]] هيرجّع إيه؟ والفلتر اللي بيدوّر على [[b.right > innerWidth]] بس هيلاقي الزرار؟ جرّب في Console.`, done: R`كتبت توقعك للاتنين، وجربت: الفلتر بـ [[right]] بس ملقاش الزرار، والفلتر بـ [[left < 0]] لقاه.` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة navbar بالعربي والإنجليزي (٦ روابط وزرارين ولوجو)، وشغّل عليها [[matrix.js]] من غير تعديل. اكتب جدول: كل مقاس [[BROKEN]] والعنصر الخارج، ومجمّعة في «نطاقات» (من كام لكام).`, done: R`عندك جدول فيه نطاق واحد على الأقل بيختلف بين العربي والإنجليزي، وكل سطر فيه اسم العنصر الخارج من ناتج السكربت.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[@media (max-width: 359px) { .menu-btn { padding: 4px } }]] اتكتب عشان زرار القايمة برا الشاشة على «الموبايلات الصغيرة»، والمصفوفة لسه بتقول [[360 BROKEN]]. ليه؟ صلّحه بقيمة متقاسة مش متخمّنة، وأثبت بالمصفوفة.`, done: R`شرحت إن 360 مش أقل من 359، ولقيت أصغر عرض سليم بالمصفوفة، والحد الجديد بيخلّي 320 و 360 و 375 [[OK]] من غير ما يكسر الباقي.` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على السكربت: لكل مقاس مكسور، احفظ لقطة للعنصر الخارج بس ([[element.screenshot]]) في [[shots/broken/]]، واطبع حجم الصفحة الكلي ([[scrollWidth]]) جنب العرض.`, done: R`بعد التشغيل [[shots/broken/]] فيه صورة لكل مقاس [[BROKEN]] (وفاضي لو [[all sizes OK]])، والناتج فيه العرضين جنب بعض.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[bounds.js]]: بياخد ملف CSS ويطلّع كل [[min-width]] و [[max-width]] بالبكسل، ويطبع لكل واحد العرض اللي عنده والعرض اللي بعده أو قبله (يعني [[max-width: 359px]] = 359 و 360)، ويدمجهم مع المصفوفة الأساسية مترتبين ومن غير تكرار. وبعدين خلي [[matrix.js]] يقرا المصفوفة منه.`, done: R`[[node bounds.js style.css]] على المعمل بيطبع لستة فيها [[359 360]] و [[760 761]] و [[1100 1101]] جنب 320 و 1440، و [[matrix.js]] بيلف عليهم.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الصفحة بخط من Google Fonts. شغّل المصفوفة مرة من غير انتظار الخط، ومرة بعد [[await page.evaluate(() => document.fonts.ready)]]. فيه مقاس نتيجته اختلفت؟ اكتب ليه.`, done: R`عندك نتيجتين، ولو فيه فرق مكتوب المقاس واللي اتغيّر (عرض أو ارتفاع اللوجو)، ولو مفيش مكتوب ليه (الخط كان متخزّن، أو مقاساته قريبة من الافتراضي).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import fs from "node:fs";
fs.writeFileSync("style.css", ".a{}\n@media (max-width: 760px) { .x{} }\n@media (max-width: 1100px) { .y{} }\n@media (max-width: 359px) { .z{} }\n@media (min-width: 48rem) { .w{} }\n");
const base = [320, 375, 414, 768, 1024, 1440];
const css = fs.readFileSync("style.css", "utf8");
const extra = [];
for (const m of css.matchAll(/\((min|max)-width:\s*([\d.]+)(px|rem)\)/g)) {
  const px = m[3] === "rem" ? Number(m[2]) * 16 : Number(m[2]);
  extra.push(...(m[1] === "max" ? [px, px + 1] : [px - 1, px]));
}
const widths = [...new Set([...base, ...extra])].sort((a, b) => a - b);
console.log("widths: " + widths.join(" "));
const rows = [{ w: 360, sw: 363, iw: 360 }, { w: 375, sw: 375, iw: 375 }, { w: 761, sw: 924, iw: 761 }];
console.log("broken: " + rows.filter(r => r.sw > r.iw).map(r => r.w).join(" "));`, expect: [R`widths: 320 359 360 375 414 760 761 767 768 1024 1100 1101 1440`, R`broken: 360 761`] },
          ],
        }
      ]
    }
]);
