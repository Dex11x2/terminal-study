// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "بنك تمارين HTML و CSS",
      l: 2,
      time: R`حوالي ١٠ ساعات لو حليت كل حاجة بإيدك: ساعة ونص لكل درس، ونص ساعة للفحص في كل درس`,
      goal: [
        R`تحل أي تمرين CSS بنفس الخطوات: المقاس من برا الأول، وبعدين أنهي أداة بترسمه، وبعدين تقيس النتيجة برقم بدل ما تقول «شكله تمام».`,
        R`ترسم بالـ CSS بس ١٠ أشكال (مثلث، ودايرة، وتذكرة، وفقاعة كلام، وقلب، ولودر، وسهم، ونجمة، وعلم، وشطرنج) من غير ولا صورة.`,
        R`تبني ٨ layouts بتتكرر في كل شغل (holy grail، وشبكة كروت، و bento، وسايدبار بيتقفل، ومودال، وفوتر تحت، و masonry، و navbar عربي) وتثبت إنها سليمة على 1200 و 360.`,
        R`تلاقي وتصلّح أشهر أخطاء الـ CSS الحقيقية: الصفحة اللي بتفيض على الموبايل، والـ sticky اللي مش بيلزق، والمودال اللي تحت الهيدر، و [[100vh]]، و [[margin-left]] في صفحة عربي، و [[!important]].`,
        R`تتوقع مين يكسب في الـ cascade قبل ما تشغّل ([[:is()]] و [[:where()]] و [[:has()]] و [[@layer]] و [[!important]])، وتكتب دالة بتحسب الـ specificity وتعدّي ١٥ اختبار.`,
        R`توصّل فورم لـ axe صفر، وتعرف الحاجات اللي axe مش بيشوفها (منها التباين في الكلام العربي المتوصل)، وتكتب فحص ذاتي يلقطها.`,
      ],
      use: {
        prog: R`كل درس قبل كده علّمك أداة. هنا الأدوات بتشتغل مع بعض في تمرين ليه هدف متقاس: «المثلث 80×70»، «٥ عواميد على 1168px»، «مفيش scroll أفقي على 360». والفحص بيقولك عدّيت ولا لأ من غير ما تخمّن.`,
        work: R`نص شغل الـ frontend الحقيقي «الصفحة دي باظت على الموبايل» و «الزرار ده مش بيبان» و «المودال تحت الهيدر». التمارين هنا متجمعة من أخطاء اتكررت في مواقع حقيقية (بأسماء متخيلة)، والطريقة اللي بتحلها بيها هي هي اللي هتستخدمها في أي تيكت.`,
        cs: R`ورا كل تمرين فكرة حسابية: الـ auto-fit قسمة صحيحة، و clip-path نقط على دايرة بالـ sin و cos، والسهم دوران متجه بمصفوفة، والـ specificity مقارنة lexicographic لـ ٣ أرقام، والتباين معادلة luminance من WCAG.`,
      },
      lab: R`mkdir bank-css && cd bank-css && code .   # ملف HTML لكل درس، افتحه في Chrome، و F12 ثم Console عشان تلزق الفحص الذاتي`,
      projects: [
        { lvl: 'صغير', t: R`كتالوج أشكال CSS`, what: R`صفحة فيها الأشكال العشرة من درس «أشكال بالـ CSS»، كل شكل في كارت تحته اسمه وزرار «انسخ الـ CSS» بيحط الكود في الـ clipboard ([[navigator.clipboard.writeText]])، ومعاهم ٣ أشكال زيادة من عندك (سداسي بـ [[regularPolygon(6)]]، وبادج متعرّج، وسهم مزدوج). كل الألوان متغيرات في [[:root]].`, done: R`الفحص الذاتي بتاع الدرس بيطبع [[النتيجة: 12 من 12]]، وكل زرار نسخ بيطلّع رسالة «اتنسخ» بـ [[role="status"]]، ولما تغيّر لون واحد في [[:root]] كل الأشكال اللي بتستخدمه بتتغير، ومفيش ولا صورة في الصفحة (Network › Img فاضي).` },
        { lvl: 'صغير', t: R`bookmarklet كاشف الفيضان`, what: R`حوّل فحص درس «صفحات بتفيض على 360» لـ bookmarklet: لينك [[javascript:]] تحطه في شريط العلامات، لما تدوس عليه على أي صفحة بيحط إطار أحمر حوالين كل عنصر طالع برا الشاشة، وبيكتب جنبه عرضه، وبيطبع اللستة في الـ Console.`, done: R`على صفحة الدرس البايظة على عرض 360 بيعلّم الـ ٨ أجزاء، وعلى النسخة السليمة مبيعلّمش حاجة، ولو دوست عليه مرتين الإطارات بتتشال مش بتتكرر.` },
        { lvl: 'متوسط', t: R`مدقق ألوان الثيم`, what: R`صفحة بتاخد لستة ألوان الثيم (خلفيات وكلام) من textarea بصيغة [[--name: #hex]]، وبتعمل جدول بـ [[buildTable]] من درس «مسائل بالـ JS على الصفحة» فيه كل لون كلام على كل خلفية: النسبة بـ [[contrastRatio]]، و AA و AAA للكلام العادي والكبير، ومعاينة صغيرة للكلام نفسه بالعربي.`, done: R`[[#767676]] على أبيض بيطلع 4.54 و AA، و [[#a1a1aa]] على أبيض 2.56 وبيتعلّم أحمر، ولون مكتوب غلط بيطلّع رسالة تحت الـ textarea مش crash، والجدول نفسه بيعدّي الفحص الذاتي بتاع درس «accessibility: لحد axe صفر».` },
        { lvl: 'متوسط', t: R`مكتبة layouts بـ container queries`, what: R`الـ layouts التمانية من درس «layouts بالـ flex والـ grid»، كل واحد في component بيعتمد على [[@container]] مش على عرض الشاشة، وصفحة عرض فيها slider بيغيّر عرض الحاوية من 280 لـ 1200px وتشوف كل layout بيتغير قدامك.`, done: R`الفحص الذاتي بتاع الدرس بيعدّي على 1200 و 360، ولما تحط نفس الـ component في سايدبار ضيق على شاشة عريضة بياخد شكل الموبايل لوحده، و [[@media]] مش موجود في ملف الـ layouts خالص.` },
        { lvl: 'كبير', t: R`صفحة متجر متخيل كاملة من التمارين`, what: R`صفحة «متجر الياسمين» (اسم متخيل) متجمعة من الوحدة كلها: navbar عربي، وهيرو بـ [[min-height: 100dvh]]، وشبكة منتجات auto-fit فيها شارات في ركن النهاية، وباقات بزراير على خط واحد، واختيار توصيل بـ [[:has()]]، وفورم دخول، وتنبيه في الـ top layer، وجدول طلبات من [[buildTable]]. بالعربي والإنجليزي بنفس الـ CSS، وكل الحركة بتقف مع reduced motion.`, done: R`كل فحوص الوحدة الذاتية بتعدّي على 320 و 360 و 768 و 1200 و 1440، و axe صفر، والفحص بتاع التباين صفر (عشان axe بيسكت عن العربي)، والصفحة بتتصفح بالكيبورد بس، و Lighthouse Accessibility ١٠٠ و Performance فوق ٩٠، ومنشورة برابط.`, ext: R`زوّد ملف [[checks.js]] بيجمع كل الفحوص الذاتية ويشغّلها بـ Playwright على المقاسات الخمسة في GitHub Actions، والـ PR اللي بيكسر فحص بيقع.` },
        { lvl: 'كبير', t: R`بنك تمارين CSS بيتصحح لوحده`, what: R`صفحة زي الموقع ده بالظبط بس للـ CSS: لكل تمرين وصف الهدف، و textarea للـ CSS بتاعك، و iframe بـ [[srcdoc]] بيعرض النتيجة، وزرار «افحص» بيشغّل الفحص الذاتي جوه الـ iframe ويعرض PASS و FAIL. ابدأ بتمارين الأشكال والـ layouts، والعرض بيتغير بأزرار 360 و 768 و 1200 بتغيّر عرض الـ iframe.`, done: R`الحل المرجعي لكل تمرين بيعدّي والحل الغلط بيقع بنفس الرسايل اللي في الدروس، والـ CSS بتاعك بيتحفظ في [[localStorage]] (جوه try/catch) وبيرجع بعد reload، و CSS فيه loop أو غلط مش بيوقّع الصفحة، والصفحة نفسها axe صفر.`, ext: R`زوّد وضع «تحدي اليوم» بتمرين عشوائي وعدّاد وقت، وصفحة إحصائيات بتقولك أنهي نوع تمارين بتقع فيه أكتر.` },
        { lvl: 'فكرة', t: R`تمرين من موقع بتحبه`, what: R`اختار component من موقع بتستخدمه كل يوم (كارت منتج، أو شريط بحث، أو قايمة، أو تذكرة حجز)، وارسمه من الصفر، واكتب له وصف هدف بالأرقام وفحص ذاتي بنفس شكل الدروس (PASS و FAIL ورسالة بتقول الغلط فين).`, done: R`زميل حل تمرينك من الوصف بس من غير ما يشوف الأصل، والفحص بتاعك قال PASS على حله لما كان صح و FAIL برسالة مفهومة لما غيّرت فيه حاجة واحدة.`, ext: R`ابعته كاقتراح تمرين للبنك ده بنفس الحقول: الهدف، والحل المرجعي، والفحص، وناتجه على حل صح وحل غلط.` },
      ],
      n: R`هنا مفيش أداة جديدة: هنا بتستخدم كل اللي اتعلمته في تمارين ليها هدف متقاس. ٨ دروس، فيهم ٦٧ تمرين: أشكال، و layouts، وصفحات بتفيض، وأخطاء حقيقية تصلّحها، وتوقّع الـ cascade، و accessibility، ومسائل JS، وصفحات من وصف. ٤ دروس فيهم تمرين بيتصحح لوحده هنا في الصفحة، والباقي ليه فحص ذاتي تلزقه في الـ Console. كل فحص اتشغّل على حل صح وحل غلط في Chrome بـ Playwright على ويندوز ١١ بـ Node 24.22.1، والنواتج اللي في الدروس منسوخة من التشغيل ده`,
      items: [
        {
          cmd: "أشكال بالـ CSS",
          title: "ارسم ١٠ أشكال بالـ CSS بس: مثلث ودايرة وتذكرة وقلب ونجمة وشطرنج",
          learn: R`تحوّل أي شكل لسؤالين: مقاسه من برا كام، وأنهي أداة CSS بترسمه (border ولا radius ولا gradient ولا clip-path ولا pseudo-element).`,
          out: R`صفحة فيها ١٠ أشكال بتعدّي الفحص الذاتي ١٢ من ١٢، ودالتين بيولّدوا [[clip-path]] لأي مضلّع أو نجمة وبيعدّوا ١٠ اختبارات.`,
          use: {
            prog: R`الأشكال أسرع طريقة تفهم بيها الـ box model والـ borders والـ gradients بجد: الغلطة بتبان بعينك على طول، والفحص بيقولك بكام بكسل.`,
            work: R`الأشكال دي موجودة في كل موقع: سهم «التالي» في السلايدر، ولودر وقت التحميل، وفقاعة الشات، وشارة «جديد»، وتذكرة حجز بقطعين على الجنب، وخلفية مربعات. رسمها بالـ CSS بدل صورة يعني ملف أقل، ولون بيتغير من متغير واحد، وشكل حاد على أي شاشة.`,
            cs: R`المثلث بالـ borders هو إن الـ border بيتقابل مع اللي جنبه في خط مايل (الركن بيتقسم نصين). والنجمة نقط على دايرتين بالـ sin والـ cos. والسهم متجه بيلف بمصفوفة الدوران. والشطرنج دالة دورية بتتكرر كل 60px.`,
          },
          desc: R`كل تمرين هنا هدفه مكتوب بالأرقام (المقاس واللون والاتجاه)، وانت بتختار الأداة. الأدوات خمسة بس، وكل شكل بيتعمل بواحدة منهم أو اتنين مع بعض.

• **border**: لما العنصر يبقى [[width: 0; height: 0]]، الـ borders بتتقابل في النص، وكل واحد بيبقى مثلث. خلي ٣ منهم شفافين يفضل مثلث واحد.
• **border-radius**: [[50%]] على مربع بيعمل دايرة، وعلى مستطيل بيعمل بيضاوي.
• **gradient**: [[linear-gradient]] بحدود حادة بيعمل خطوط (علم)، و [[radial-gradient]] بيعمل دواير (القطع في التذكرة)، و [[repeating-conic-gradient]] بيعمل مربعات (شطرنج).
• **clip-path**: بيقص العنصر على شكل [[polygon()]] من نقط بالنسبة المئوية: نجمة، سداسي، سهم.
• **::before و ::after**: عنصرين زيادة ببلاش من غير HTML، للديل في الفقاعة ونصين القلب والخط المتقطع في التذكرة.

وفي الآخر الفحص الذاتي: كود صغير تلزقه في الـ Console بيقيس كل شكل بـ [[getComputedStyle]] و [[offsetWidth]] ويطبع [[PASS]] أو [[FAIL]] ومعاه السبب. ده تطبيق على دروس «box model» و «display» و «SVG» و «transition و @keyframes» في التاب ده.`,
          example: R`<div class="tri"></div>
<div class="dot"></div>
<style>
.tri {
  width: 0;
  height: 0;
  border-inline: 40px solid transparent;
  border-bottom: 70px solid #e11d48;
}
.dot {
  box-sizing: border-box;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #0ea5e9;
  border: 4px solid #0c4a6e;
}
</style>`,
          lines: [
            R`عنصر فاضي هيبقى المثلث. مفيش جواه كلام، والشكل كله جاي من الـ borders بتاعته.`,
            R`عنصر فاضي تاني هيبقى الدايرة، وهنا الشكل جاي من [[border-radius]].`,
            R`بنكتب الـ CSS في نفس الملف عشان التمرين يبقى ملف واحد تفتحه في المتصفح على طول.`,
            R`بداية قواعد المثلث. اسم الـ class [[tri]] اختصار triangle.`,
            R`العرض صفر: كده مفيش مساحة محتوى، والـ borders الأربعة بيتقابلوا في نقطة واحدة في النص.`,
            R`الارتفاع صفر كمان، فالـ border اللي تحت بيبان كمثلث كامل مش شبه منحرف.`,
            R`[[border-inline]] بيحط border على الجنبين (اليمين والشمال) بـ 40px شفاف. الاتنين مع بعض 80px وده عرض قاعدة المثلث، وشفافيتهم هي اللي بتقص الجنبين مايل.`,
            R`الـ border اللي تحت 70px باللون، وده ارتفاع المثلث. ولأن مفيش border فوق، رأس المثلث بيشاور لفوق.`,
            R`قفلة قواعد المثلث. المقاس من برا بقى 80 × 70 مع إن الـ width صفر.`,
            R`بداية قواعد الدايرة، واسم الـ class [[dot]] يعني نقطة.`,
            R`[[border-box]] يعني الـ width بيشمل الـ border. من غيره الدايرة هتبقى 96 + 4 + 4 = 104px مش 96.`,
            R`العرض 96px وده قطر الدايرة كلها شامل الإطار.`,
            R`نفس الارتفاع، لأن الدايرة لازم مربع الأول. لو الارتفاع اختلف هتطلع بيضاوي.`,
            R`[[50%]] نص العرض لكل ركن، فالأركان الأربعة بيتقابلوا ويعملوا دايرة كاملة.`,
            R`لون الدايرة من جوه (سماوي).`,
            R`الإطار 4px بلون كحلي، وبيلف مع الـ radius لوحده.`,
            R`قفلة قواعد الدايرة.`,
            R`قفلة الـ style. افتح الملف في Chrome وقيس بالفحص اللي في الشرح.`,
          ],
          teach: R`## الفكرة في سطر

قبل ما تكتب أي CSS، اكتب **المقاس من برا** و **الأداة**. المثلث «80 × 70 بالـ borders»، والدايرة «96 × 96 بالـ radius». وبعد ما تخلص، متقولش «شكله تمام»: لزّق الفحص الذاتي واقرا الأرقام. كل اللي تحت اتشغّل في Chrome بـ Playwright على ويندوز ١١، والنواتج منسوخة زي ما طلعت.

---

## إزاي تحل أي تمرين شكل

1. **اقرا الهدف كأرقام:** العرض والطول من برا، واللون بالـ hex، والاتجاه.
2. **اختار الأداة** من الجدول تحت. لو الشكل جزئين (فقاعة وديل) يبقى عنصر وواحد من [[::before]] أو [[::after]].
3. **ابني على صفحة فاضية** فيها العنصر لوحده، وخلي [[outline: 1px dashed]] مؤقت عشان تشوف حدود الصندوق.
4. **قيس:** الفحص الذاتي بيقرا [[offsetWidth]] (المقاس من غير الدوران) و [[getComputedStyle]] (القيمة اللي المتصفح حسبها فعلًا).

| الشكل | الأداة | ليه دي بالذات |
|---|---|---|
| مثلث، وديل الفقاعة | [[border]] على عنصر [[width: 0]] | الـ borders بتتقابل مايل، وده أقدم وأخف طريقة، وشغالة في كل متصفح |
| دايرة، ولودر | [[border-radius: 50%]] | ركن مدوّر بنص العرض بيقفل الدايرة |
| تذكرة بقطعين | [[mask]] بـ [[radial-gradient]] | الـ mask بيخرّم الخلفية نفسها، فالقطع شفاف فعلًا مش لون أبيض فوقها |
| علم، وشطرنج | [[linear-gradient]] و [[repeating-conic-gradient]] | الخطوط والمربعات بتتكرر، فبتترسم من غير ولا عنصر |
| نجمة، وسداسي | [[clip-path: polygon()]] | نقط بالنسبة المئوية فالشكل بيكبر ويصغر مع العنصر |
| قلب | مربع متلف و [[::before]] و [[::after]] دواير | ٣ أشكال بسيطة جنب بعض بيعملوا شكل معقد |

---

## التمارين العشرة

الصفحة: [[<html lang="ar" dir="rtl">]]، وكل شكل [[<div id="...">]] فاضي بالـ id اللي جنب اسمه. الفحص بيدوّر عليهم بالـ id ده.

### ١. مثلث [[#tri]]
بيشاور لفوق، قاعدته 80px وارتفاعه 70px، لونه [[#e11d48]]. ينفع بالـ borders أو بـ [[clip-path]] بـ ٣ نقط، والفحص بيقبل الاتنين.

### ٢. دايرة [[#circle]]
قطرها **96px شامل الإطار**، لونها [[#0ea5e9]]، وإطار 4px [[#0c4a6e]]. الفخ: من غير [[box-sizing: border-box]] بتطلع 104.

### ٣. تذكرة [[#ticket]]
280 × 120، لونها [[#fde68a]]، فيها قطعين نص دايرة (نص قطرهم 12px) على الجنبين في النص، وخط رأسي متقطع 2px على بعد 200px من البداية، من [[::after]].

~~~css التذكرة: الـ mask بيخرّم دايرتين
.ticket {
  mask: radial-gradient(circle 12px at 0 50%, #0000 98%, #000) left / 51% 100% no-repeat,
        radial-gradient(circle 12px at 100% 50%, #0000 98%, #000) right / 51% 100% no-repeat;
}
~~~

كل [[radial-gradient]] فيه دايرة شفافة ([[#0000]]) والباقي أسود ([[#000]] يعني «يبان»). الأولى مركزها على الحرف الشمال والتانية على اليمين، وكل واحدة بتغطي نص العرض بس ([[51%]] عشان ميبقاش فيه خط فاضي في النص).

### ٤. فقاعة كلام [[#bubble]]
220 × 80 من غير الديل، لونها [[#22c55e]]، أركانها 16px. والديل مثلث من [[::after]] بـ [[position: absolute; top: 100%]] (يعني تحت الفقاعة على طول) بنفس لونها.

### ٥. قلب [[#heart]]
لونه [[#ef4444]]: مربع 60px متلف 45 درجة، و [[::before]] و [[::after]] دواير 60px واحدة مزقوقة لليمين ([[left: -30px]]) وواحدة لفوق ([[top: -30px]]).

### ٦. لودر [[#loader]]
دايرة 48px بإطار 6px [[#e5e7eb]] وجزء واحد ([[border-top-color]]) [[#6366f1]]، بتلف لفة كاملة كل [[0.8s]] على طول ([[infinite]])، **وبتقف** لو اليوزر مفعّل تقليل الحركة: [[@media (prefers-reduced-motion: reduce) { #loader { animation: none } }]].

### ٧. سهم «التالي» [[#chevron]]
24 × 24 بخط 4px [[#0f172a]]. الصفحة عربي، فـ «التالي» بيشاور **شمال**. الطريقة: مربع ليه border على ناحيتين جنب بعض بس (الركن بينهم هو راس السهم)، وبعدين [[rotate]] لحد ما الراس يبص شمال.

> الفحص هنا بيحسب الاتجاه بالرياضة: الركن اللي بين الـ borders متجه زي (-1, -1) لـ top و left، والدوران بزاوية θ بيحوّله لـ (x cosθ − y sinθ، x sinθ + y cosθ). لو الناتج (−1.41، 0) يبقى بيشاور شمال. يعني أي تركيبة borders ودوران بتوصل لنفس الاتجاه بتعدّي، مش طريقة واحدة بس.

### ٨. نجمة [[#star]]
خماسية 120 × 120، لونها [[#f59e0b]]، بـ [[clip-path: polygon()]] بـ **١٠ نقط** (٥ أطراف و ٥ زوايا جوه). النقط نفسها بتطلع من [[starPolygon(5, 0.382)]] في التمرين اللي بيتصحح لوحده تحت.

### ٩. علم «جمهورية الواحة» (متخيل) [[#flag]]
240 × 160: ٣ خطوط أفقية متساوية [[#166534]] ثم [[#ffffff]] ثم [[#166534]] **بحدود حادة** (مش متدرجة)، ودايرة صفرا [[#facc15]] قطرها 40px في النص. كله [[background]] واحد بطبقتين:

~~~css خلفيتين: الدايرة فوق والخطوط تحت
.flag {
  background: radial-gradient(circle 20px, #facc15 98%, #0000),
              linear-gradient(#166534 33.333%, #ffffff 0 66.666%, #166534 0);
}
~~~

الحد الحاد: [[#ffffff 0 66.666%]] معناها «الأبيض يبدأ من 0» (يعني من مكان ما اللي قبله خلص بالظبط) لحد الثلثين. ولما تكتب [[linear-gradient(#166534, #ffffff, #166534)]] من غير مواقع بتطلع ألوان سايحة في بعض، والفحص بيقع.

### ١٠. شطرنج [[#chess]]
240 × 240، ٨ × ٨ مربعات كل واحد 30px، **من غير ولا عنصر جوه**:

~~~css مربعين × مربعين بيتكرروا
.chess { background: repeating-conic-gradient(#1e293b 0 25%, #f1f5f9 0 50%) 0 0 / 60px 60px; }
~~~

الـ conic بيلف حوالين النقطة: ربع غامق، وربع فاتح، ويتكرر، فالبلاطة الـ 60px فيها ٤ مربعات 30px متبادلين. و [[/ 60px 60px]] هي [[background-size]]: البلاطة بتتكرر ٤ مرات في كل اتجاه.

---

## الفحص الذاتي

افتح صفحتك في Chrome، و F12، وتاب Console، والصق الكود ده و Enter. أول مرة Chrome بيحذّرك من اللزق ويطلب تكتب [[allow pasting]] (ده حماية من حد يقولك «الصق الكود ده» على موقع بنك)، فاكتبها مرة واحدة بس على صفحتك انت.

~~~js الفحص الذاتي: الأشكال
(() => {
  const cs = (el, p) => getComputedStyle(el, p || null);
  const rgb = c => { const i = document.createElement('i'); i.style.color = c; document.body.append(i); const v = cs(i).color; i.remove(); return v; };
  const round = el => { const r = cs(el).borderTopLeftRadius; return r === '50%' || parseFloat(r) >= el.offsetWidth / 2; };
  let pass = 0, all = 0;
  const ok = (name, cond, why) => { all++; if (cond) pass++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : ' ← ' + why)); };
  const size = (el, w, h) => el.offsetWidth === w && el.offsetHeight === h;
  const sz = el => el.offsetWidth + '×' + el.offsetHeight;
  const get = id => document.getElementById(id) || (console.log('FAIL #' + id + ' ← مفيش عنصر بالـ id ده'), all++, null);
  let el;
  if ((el = get('tri'))) {
    const s = cs(el), borders = s.width === '0px' && s.borderBottomColor === rgb('#e11d48') && s.borderLeftColor === 'rgba(0, 0, 0, 0)';
    const clip = s.clipPath.startsWith('polygon') && s.clipPath.split(',').length === 3 && s.backgroundColor === rgb('#e11d48');
    ok('1 المثلث', size(el, 80, 70) && (borders || clip), 'المقاس ' + sz(el) + ' والمطلوب 80×70، بـ borders (width: 0) أو clip-path بـ ٣ نقط');
  }
  if ((el = get('circle'))) {
    const s = cs(el);
    ok('2 الدايرة', size(el, 96, 96) && round(el) && s.borderTopWidth === '4px' && s.backgroundColor === rgb('#0ea5e9'), 'المقاس ' + sz(el) + ' (المطلوب 96×96 بالـ border)، والـ radius ' + s.borderTopLeftRadius);
  }
  if ((el = get('ticket'))) {
    const s = cs(el), a = cs(el, '::after'), mask = s.maskImage || s.webkitMaskImage || '';
    ok('3 التذكرة', size(el, 280, 120) && /radial-gradient/.test(mask) && a.content !== 'none' && (a.borderLeftStyle === 'dashed' || a.borderRightStyle === 'dashed'), 'لازم 280×120 و mask فيه radial-gradient للقطعين و ::after بخط dashed (المقاس ' + sz(el) + ')');
  }
  if ((el = get('bubble'))) {
    const s = cs(el), a = cs(el, '::after');
    const tail = a.content !== 'none' && a.position === 'absolute' && parseFloat(a.top) >= el.offsetHeight - 1 && (a.borderTopColor === s.backgroundColor || a.backgroundColor === s.backgroundColor);
    ok('4 فقاعة الكلام', size(el, 220, 80) && s.borderTopLeftRadius === '16px' && tail, 'الديل لازم ::after بـ position: absolute تحت الفقاعة (top: 100%) وبنفس لونها');
  }
  if ((el = get('heart'))) {
    const s = cs(el), b = cs(el, '::before'), a = cs(el, '::after'), red = rgb('#ef4444');
    const parts = [b, a].every(p => p.content !== 'none' && (p.borderTopLeftRadius === '50%' || parseFloat(p.borderTopLeftRadius) >= el.offsetWidth / 2) && p.backgroundColor === red);
    ok('5 القلب', s.backgroundColor === red && parts && (s.rotate !== 'none' || s.transform !== 'none'), 'مربع متلف 45 درجة و ::before و ::after دواير بنفس اللون');
  }
  if ((el = get('loader'))) {
    const s = cs(el);
    const rm = [...document.styleSheets].some(sh => { try { return [...sh.cssRules].some(r => r.media && /prefers-reduced-motion:\s*reduce/.test(r.media.mediaText) && [...r.cssRules].some(x => x.selectorText && el.matches(x.selectorText))); } catch (e) { return false; } });
    ok('6 اللودر: الشكل', size(el, 48, 48) && round(el) && s.borderTopColor === rgb('#6366f1') && s.borderRightColor === rgb('#e5e7eb'), 'دايرة 48 بحد رمادي وجزء واحد (top) بنفسجي');
    ok('6 اللودر: الحركة', s.animationName !== 'none' && s.animationDuration === '0.8s' && s.animationIterationCount === 'infinite', 'المدة ' + s.animationDuration + ' والتكرار ' + s.animationIterationCount + '، والمطلوب 0.8s و infinite');
    ok('6 اللودر: reduced motion', rm, 'مفيش @media (prefers-reduced-motion: reduce) بيوقّف الحركة على العنصر ده');
  }
  if ((el = get('chevron'))) {
    const s = cs(el), w = k => parseFloat(s['border' + k + 'Width']) > 0;
    const x = w('Left') && !w('Right') ? -1 : w('Right') && !w('Left') ? 1 : 0, y = w('Top') && !w('Bottom') ? -1 : w('Bottom') && !w('Top') ? 1 : 0;
    const unit = { deg: 1, turn: 360, rad: 180 / Math.PI, grad: 0.9 };
    const m = /(-?[\d.]+)(deg|turn|rad|grad)/.exec(s.rotate) || [0, 0, 'deg'];
    let deg = m[1] * unit[m[2]];
    const mx = /matrix\(([^,]+), ([^,]+)/.exec(s.transform);
    if (mx) deg += Math.atan2(+mx[2], +mx[1]) * 180 / Math.PI;
    const r = deg * Math.PI / 180, tx = x * Math.cos(r) - y * Math.sin(r), ty = x * Math.sin(r) + y * Math.cos(r);
    const dir = !x || !y ? 'مش واضح (لازم borderين جنب بعض بس)' : Math.abs(ty) < 0.3 ? (tx < 0 ? 'شمال' : 'يمين') : Math.abs(tx) < 0.3 ? (ty < 0 ? 'فوق' : 'تحت') : 'مايل';
    ok('7 سهم «التالي» في صفحة عربي', size(el, 24, 24) && dir === 'شمال', 'السهم بيشاور ' + dir + '، والمطلوب شمال');
  }
  if ((el = get('star'))) {
    const s = cs(el), n = s.clipPath.startsWith('polygon') ? s.clipPath.split(',').length : 0;
    ok('8 النجمة', size(el, 120, 120) && n === 10 && s.backgroundColor === rgb('#f59e0b'), 'الـ polygon فيه ' + n + ' نقطة، والنجمة الخماسية ١٠ (٥ أطراف و ٥ جوه)');
  }
  if ((el = get('flag'))) {
    const bg = cs(el).backgroundImage, lin = (bg.match(/linear-gradient\(.*\)/) || [''])[0];
    const pos = [...lin.matchAll(/(-?[\d.]+)(%|px)/g)].map(m => m[2] === '%' ? +m[1] : m[1] / el.offsetHeight * 100);
    const at = v => pos.some(p => Math.abs(p - v) < 0.5);
    const colors = ['#166534', '#ffffff', '#facc15'].every(c => bg.includes(rgb(c)));
    ok('9 العلم', size(el, 240, 160) && colors && /radial-gradient/.test(bg) && at(100 / 3) && at(200 / 3), 'لازم ٣ خطوط متساوية بحدود حادة عند الثلث والثلثين، ودايرة radial-gradient صفرا في النص');
  }
  if ((el = get('chess'))) {
    const s = cs(el);
    ok('10 الشطرنج', size(el, 240, 240) && el.childElementCount === 0 && /gradient/.test(s.backgroundImage) && s.backgroundSize === '60px 60px', 'من غير عناصر جوه (فيه ' + el.childElementCount + ')، و background-size لازم 60px 60px (مربعين × مربعين)، والموجود ' + s.backgroundSize);
  }
  console.log('النتيجة: ' + pass + ' من ' + all);
})();
~~~

حاجات في الفحص تستاهل تفهمها لأنك هتكتب زيها:

- [[offsetWidth]] بيرجّع المقاس **من غير** [[rotate]] و [[transform]]. لو قست القلب المتلف بـ [[getBoundingClientRect()]] هتلاقي 85 مش 60، لأن ده الصندوق اللي حوالين الشكل بعد الدوران.
- [[rgb('#e11d48')]] بيحوّل الـ hex للصيغة اللي [[getComputedStyle]] بيرجّعها ([[rgb(225, 29, 72)]])، عشان المقارنة تبقى نص بنص.
- [[getComputedStyle(el, '::after')]] بيقرا الـ pseudo-element، وده الطريقة الوحيدة توصله من JS لأنه مش في الـ DOM.
- اللودر: الفحص بيلف على [[document.styleSheets]] ويدوّر على [[@media (prefers-reduced-motion: reduce)]] فيه قاعدة بتطابق العنصر. يعني بيتأكد من الكود نفسه مش من إعدادات جهازك.

### الناتج على حل غلط

الحل الغلط فيه أشهر ١٠ غلطات: المثلث بـ [[width: 80px]] مع الـ borders، والدايرة من غير [[border-box]]، والتذكرة من غير mask، والفقاعة من غير ديل، والقلب من غير الدوايرتين، واللودر بـ [[2s]] من غير [[infinite]]، والسهم مقلوب، والنجمة ٣ نقط، والعلم متدرج، والشطرنج من ٤ عناصر.

~~~text Chrome، الحل الغلط
FAIL 1 المثلث ← المقاس 160×140 والمطلوب 80×70، بـ borders (width: 0) أو clip-path بـ ٣ نقط
FAIL 2 الدايرة ← المقاس 104×104 (المطلوب 96×96 بالـ border)، والـ radius 50%
FAIL 3 التذكرة ← لازم 280×120 و mask فيه radial-gradient للقطعين و ::after بخط dashed (المقاس 280×120)
FAIL 4 فقاعة الكلام ← الديل لازم ::after بـ position: absolute تحت الفقاعة (top: 100%) وبنفس لونها
FAIL 5 القلب ← مربع متلف 45 درجة و ::before و ::after دواير بنفس اللون
FAIL 6 اللودر: الشكل ← دايرة 48 بحد رمادي وجزء واحد (top) بنفسجي
FAIL 6 اللودر: الحركة ← المدة 2s والتكرار 1، والمطلوب 0.8s و infinite
FAIL 6 اللودر: reduced motion ← مفيش @media (prefers-reduced-motion: reduce) بيوقّف الحركة على العنصر ده
FAIL 7 سهم «التالي» في صفحة عربي ← السهم بيشاور يمين، والمطلوب شمال
FAIL 8 النجمة ← الـ polygon فيه 3 نقطة، والنجمة الخماسية ١٠ (٥ أطراف و ٥ جوه)
FAIL 9 العلم ← لازم ٣ خطوط متساوية بحدود حادة عند الثلث والثلثين، ودايرة radial-gradient صفرا في النص
FAIL 10 الشطرنج ← من غير عناصر جوه (فيه 4)، و background-size لازم 60px 60px (مربعين × مربعين)، والموجود auto
النتيجة: 0 من 12
~~~

لاحظ المثلث: 160×140 مش 80×70، لأن الـ width الـ 80 اتزاد عليه 40 + 40 borders، والارتفاع 70 اتزاد عليه 70 border. وده نفس سبب الدايرة 104: الـ borders بتتزاد على الـ width في [[content-box]].

### الناتج على الحل المرجعي

~~~text Chrome، الحل اللي في «الحل» تحت
PASS 1 المثلث
PASS 2 الدايرة
PASS 3 التذكرة
PASS 4 فقاعة الكلام
PASS 5 القلب
PASS 6 اللودر: الشكل
PASS 6 اللودر: الحركة
PASS 6 اللودر: reduced motion
PASS 7 سهم «التالي» في صفحة عربي
PASS 8 النجمة
PASS 9 العلم
PASS 10 الشطرنج
النتيجة: 12 من 12
~~~

---

## التمرين اللي بيتصحح لوحده: مولّد clip-path

النجمة والسداسي محتاجين نقط محسوبة. اكتب دالتين بيرجّعوا نص [[polygon(...)]] جاهز:

- [[regularPolygon(n)]]: مضلّع منتظم بـ n ضلع، أول نقطة فوق في النص ([[50% 0%]]) والباقي مع عقارب الساعة.
- [[starPolygon(n, inner)]]: نجمة بـ n طرف. النقط بتتبادل بين دايرة نص قطرها 50% ودايرة جوه نص قطرها [[50% × inner]].

المعادلة: النقطة رقم i زاويتها [[-90 + i × 360 / n]] درجة للمضلّع ([[i × 180 / n]] للنجمة لأن النقط ضعف العدد)، و [[x = 50 + r × cos(a)]] و [[y = 50 + r × sin(a)]]. الـ -90 عشان أول نقطة تبقى فوق، لأن الزاوية صفر بتبص يمين. وكل رقم بيتقرّب لرقم عشري واحد بـ [[Number(v.toFixed(1))]]، وده بيشيل [[50.0]] ويحوّل [[-0]] لـ [[0]].

## خلاصة

- المقاس من برا الأول، والأداة تاني، والفحص في الآخر.
- [[width: 0]] و borders = مثلثات. و [[border-box]] = المقاس اللي كتبته هو اللي بيطلع.
- الـ gradient بحدود حادة = خطوط ومربعات من غير عناصر، والـ mask بيخرّم بجد.
- [[clip-path]] نقط بالنسبة المئوية، والنقط دي رياضة (sin و cos) تتكتب مرة في دالة.
- الحركة ليها دايمًا [[prefers-reduced-motion]]، والسهم في العربي بيشاور عكس الإنجليزي.`,
          try: R`اعمل ملف [[shapes.html]] فيه العشر عناصر بالـ ids اللي في الشرح، وارسمهم واحد واحد، والصق الفحص الذاتي بعد كل شكل. مش لازم تبدأ بالترتيب: ابدأ بالدايرة والمثلث، وسيب القلب والتذكرة للآخر. وبعدها اكتب [[regularPolygon]] و [[starPolygon]] في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عنصر [[width: 0; height: 0; border: 20px solid; border-color: red green blue orange]]. قبل ما تفتحه ارسم على ورقة اللي هيظهر، واكتب [[offsetWidth]] هيبقى كام. وبعدين افتحه وقيس في الـ Console.`, done: R`رسمت مربع 40 × 40 متقسم ٤ مثلثات بتتقابل في النص (أحمر فوق، وأخضر يمين، وأزرق تحت، وبرتقاني شمال)، و [[offsetWidth]] طلع 40، وفهمت إن المثلث في التمرين الأول هو ده بالظبط بس ٣ منهم شفافين.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اللودر ده بيلف مرة وبيقف، ولو اليوزر مفعّل «تقليل الحركة» في ويندوز (Settings › Accessibility › Visual effects › Animation effects) لسه بيلف: [[.spin { animation: spin 2s linear; }]]. صلّحه، واتأكد من reduced motion من DevTools › Rendering › Emulate CSS media feature prefers-reduced-motion.`, done: R`زوّدت [[infinite]] وغيّرت المدة لـ [[0.8s]]، وزوّدت [[@media (prefers-reduced-motion: reduce)]] بيحط [[animation: none]]، ولما فعّلت المحاكاة في Rendering وقف، وفحص اللودر بيطبع الـ ٣ سطور PASS.` },
            { lvl: 'تطبيق', t: R`**ابني:** شارة سداسية 100 × 100 لونها [[#7c3aed]] جواها رقم «٧» أبيض في النص بالظبط، بـ [[clip-path]] من [[regularPolygon(6)]] و [[display: grid; place-items: center]]. وبعدين خليها تلف ببطء ٦٠ درجة بس لما الماوس يقف عليها.`, done: R`الـ clip-path في Computed هو [[polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)]]، والرقم في النص (الفرق بين مركز الرقم ومركز الشارة صفر بـ [[getBoundingClientRect]])، والدوران على [[:hover]] بـ [[transition]] وبيرجع لما الماوس يمشي.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ارسم الشطرنج مرتين: مرة بـ ٦٤ [[<div>]] جوه grid، ومرة بـ gradient واحد. في كل مرة اطبع [[document.querySelectorAll('*').length]]، وسجّل Performance في DevTools وانت بتغيّر حجم الشاشة ٥ ثواني، وقارن وقت Layout.`, done: R`عندك رقمين لعدد العناصر (الفرق ٦٤ بالظبط) ورقمين لوقت Layout من تاب Performance، ومكتوب جنبهم أنهي أسرع وبكام. ولو الفرق صغير جدًا مكتوب كده بصراحة: ٦٤ عنصر قليلين، والفرق بيبان في جدول فيه آلاف الخانات.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** زوّد على الفحص الذاتي سطر لشكل جديد: تذكرة «صعود» زي التمرين ٣ بس القطعين فوق وتحت (مش يمين وشمال). اكتب الشكل، واكتب الـ [[ok(...)]] بتاعه، وخليه يقع على التذكرة القديمة وينجح على الجديدة.`, done: R`الفحص الجديد بيقرا [[maskImage]] ويتأكد إن مراكز الدواير [[50% 0px]] و [[50% 100%]]، وبيطبع FAIL برسالة مفهومة على تذكرة التمرين ٣ و PASS على الجديدة، والفحوص القديمة لسه ١٢ من ١٢.` },
          ],
          deep: {
            why: R`الأشكال مش رفاهية: كل سهم ولودر وشارة في موقع حقيقي يا إما صورة يا إما CSS. الـ CSS بيتغير لونه من متغير واحد في [[:root]]، ومبيضربش على شاشة 3x، ومش محتاج طلب شبكة. والأهم إن التمرين ده بيعلّمك تقرا الـ box model بالأرقام: المثلث 160 × 140 بدل 80 × 70 هو نفس الغلطة اللي بتخلي كارت أعرض من مكانه في أي layout.`,
            how: R`كل شكل بيترسم من واحدة من خمس حاجات المتصفح بيعملها لوحده. الـ borders بتتقابل في الأركان بخط مايل، فلما المحتوى صفر بيفضل ٤ مثلثات. والـ [[border-radius]] بيقص الركن بقوس، و [[50%]] بيخلي الأقواس تقفل دايرة. والـ gradients صور بيرسمها المتصفح وقت الرسم (paint)، فبتتكرر بـ [[background-size]] من غير عناصر. و [[clip-path]] و [[mask]] بيحصلوا في آخر خطوة: العنصر بيترسم كامل، وبعدين اللي برا الشكل بيتشال، فالـ layout مش بيتأثر (العنصر واخد مكانه المستطيل كامل). والفحص بيقرا القيم بعد ما المتصفح حسبها ([[getComputedStyle]] بيرجّع الألوان [[rgb()]] والمقاسات px)، فبيقارن بالنتيجة مش بالكود اللي كتبته، وعشان كده بيقبل أكتر من طريقة لنفس الشكل.`,
            when: R`الـ borders للمثلثات الصغيرة (ديل، وسهم dropdown). و [[clip-path]] لأي مضلّع أو لما الشكل لازم يتحرك أو يكبر. والـ gradients للخلفيات والأنماط المتكررة. والـ mask للتخريم الحقيقي (التذكرة على خلفية فيها صورة). ولو الشكل معقد (لوجو، أيقونة فيها منحنيات كتير) استخدم SVG، شوف درس «SVG» في التاب ده. والقاعدة: لو محتاج أكتر من ٣ عناصر زيادة عشان شكل، يبقى SVG أحسن.`,
            mistakes: R`تحط [[width]] على المثلث فيطلع شبه منحرف. أو تنسى [[box-sizing: border-box]] فكل شكل بإطار يكبر. أو تكتب [[border-color: transparent]] قبل [[border-bottom]] وتستغرب إن اللون اختفى (الترتيب في الـ cascade). أو تكتب [[content]] ناقص في [[::after]] فالـ pseudo-element مش بيتعمل خالص (من غير [[content: ""]] مفيش عنصر). أو تقيس شكل متلف بـ [[getBoundingClientRect]] وتلاقي رقم أكبر وتفتكر إنه غلط. أو تعمل السهم بـ [[right]] و [[rotate(45deg)]] وتنسى إن الصفحة عربي. أو تعمل لودر بيلف على طول من غير [[prefers-reduced-motion]]، ودي مشكلة حقيقية لناس عندهم دوخة من الحركة.`,
          },
          sol: R`الحل المرجعي كامل تحت، وده بالظبط اللي طلّع [[النتيجة: 12 من 12]] في Chrome بـ Playwright. الأرقام اللي تستاهل تفتكرها: المثلث [[border-inline: 40px]] و [[border-bottom: 70px]]، والدايرة [[border-box]]، والنجمة نقطها من [[starPolygon(5, 0.382)]] (الـ 0.382 بتطلّع نجمة منتظمة: أضلاعها على خطوط مستقيمة).

وحل المربع اللي بيتصحح لوحده: [[regularPolygon]] و [[starPolygon]] في نفس الكود تحت. لو اختبار «مفيش -0%» وقع، يبقى بتطبع الرقم بـ [[toFixed(1)]] بس من غير [[Number()]]، فبيطلع [[50.0%]] أو [[-0.0%]].`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أشكال</title>
<style>
body { font-family: system-ui, sans-serif; display: flex; flex-wrap: wrap; gap: 32px; padding: 24px; align-items: flex-start; }
#tri { width: 0; height: 0; border-inline: 40px solid transparent; border-bottom: 70px solid #e11d48; }
#circle { box-sizing: border-box; width: 96px; height: 96px; border-radius: 50%; background: #0ea5e9; border: 4px solid #0c4a6e; }
#ticket { position: relative; width: 280px; height: 120px; background: #fde68a;
  mask: radial-gradient(circle 12px at 0 50%, #0000 98%, #000) left / 51% 100% no-repeat,
        radial-gradient(circle 12px at 100% 50%, #0000 98%, #000) right / 51% 100% no-repeat; }
#ticket::after { content: ""; position: absolute; inset-block: 12px; inset-inline-start: 200px; border-inline-start: 2px dashed #92400e; }
#bubble { position: relative; width: 220px; height: 80px; background: #22c55e; border-radius: 16px; }
#bubble::after { content: ""; position: absolute; top: 100%; left: 24px; border: 12px solid transparent; border-top-color: #22c55e; border-bottom: 0; }
#heart { position: relative; width: 60px; height: 60px; background: #ef4444; rotate: 45deg; margin: 20px; }
#heart::before, #heart::after { content: ""; position: absolute; width: 60px; height: 60px; border-radius: 50%; background: #ef4444; }
#heart::before { left: -30px; }
#heart::after { top: -30px; }
#loader { width: 48px; height: 48px; box-sizing: border-box; border: 6px solid #e5e7eb; border-top-color: #6366f1; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
@media (prefers-reduced-motion: reduce) { #loader { animation: none; } }
#chevron { width: 24px; height: 24px; box-sizing: border-box; border-top: 4px solid #0f172a; border-left: 4px solid #0f172a; rotate: -45deg; }
#star { width: 120px; height: 120px; background: #f59e0b;
  clip-path: polygon(50% 0%, 61.2% 34.5%, 97.6% 34.5%, 68.2% 55.9%, 79.4% 90.5%, 50% 69.1%, 20.6% 90.5%, 31.8% 55.9%, 2.4% 34.5%, 38.8% 34.5%); }
#flag { width: 240px; height: 160px;
  background: radial-gradient(circle 20px, #facc15 98%, #0000),
              linear-gradient(#166534 33.333%, #ffffff 0 66.666%, #166534 0); }
#chess { width: 240px; height: 240px; background: repeating-conic-gradient(#1e293b 0 25%, #f1f5f9 0 50%) 0 0 / 60px 60px; }
</style>
</head>
<body>
<div id="tri"></div>
<div id="circle"></div>
<div id="ticket"></div>
<div id="bubble"></div>
<div id="heart"></div>
<div id="loader" role="status" aria-label="بيحمّل"></div>
<div id="chevron"></div>
<div id="star"></div>
<div id="flag"></div>
<div id="chess"></div>
<script>
// حل التمرين اللي بيتصحح لوحده
const f = v => Number(v.toFixed(1)) + '%';
function regularPolygon(n) {
  if (!Number.isInteger(n) || n < 3) throw new RangeError('n لازم رقم صحيح 3 أو أكتر');
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (-90 + i * 360 / n) * Math.PI / 180;
    pts.push(f(50 + 50 * Math.cos(a)) + ' ' + f(50 + 50 * Math.sin(a)));
  }
  return 'polygon(' + pts.join(', ') + ')';
}
function starPolygon(n, inner) {
  if (!Number.isInteger(n) || n < 3) throw new RangeError('n لازم رقم صحيح 3 أو أكتر');
  if (!(inner > 0 && inner < 1)) throw new RangeError('inner لازم بين 0 و 1');
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const a = (-90 + i * 180 / n) * Math.PI / 180, r = i % 2 ? 50 * inner : 50;
    pts.push(f(50 + r * Math.cos(a)) + ' ' + f(50 + r * Math.sin(a)));
  }
  return 'polygon(' + pts.join(', ') + ')';
}
</script>
</body>
</html>`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`// كل دالة بترجّع نص زي "polygon(50% 0%, 100% 50%, ...)"
// النقطة: x = 50 + r * cos(a) و y = 50 + r * sin(a)، والزاوية بالراديان = درجة * Math.PI / 180
// كل رقم برقم عشري واحد: Number(v.toFixed(1))، وأول نقطة فوق في النص (زاوية -90)
function regularPolygon(n) {}
function starPolygon(n, inner) {}`,
            tests: R`test("regularPolygon(4) معيّن", () => expect(regularPolygon(4)).toBe("polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"));
test("regularPolygon(3) مثلث", () => expect(regularPolygon(3)).toBe("polygon(50% 0%, 93.3% 75%, 6.7% 75%)"));
test("regularPolygon(6) سداسي", () => expect(regularPolygon(6)).toBe("polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)"));
test("starPolygon(5, 0.382): ١٠ نقط", () => expect(starPolygon(5, 0.382).split(",").length).toBe(10));
test("starPolygon(5, 0.382): أول ٣ نقط", () => expect(starPolygon(5, 0.382).startsWith("polygon(50% 0%, 61.2% 34.5%, 97.6% 34.5%,")).toBe(true));
test("starPolygon(4, 0.5)", () => expect(starPolygon(4, 0.5)).toBe("polygon(50% 0%, 67.7% 32.3%, 100% 50%, 67.7% 67.7%, 50% 100%, 32.3% 67.7%, 0% 50%, 32.3% 32.3%)"));
test("مفيش -0% ولا 50.0%", () => expect(/-0%|\.0%/.test(regularPolygon(8) + starPolygon(6, 0.5))).toBe(false));
test("n أقل من 3 بيرمي RangeError", () => expect(() => regularPolygon(2)).toThrow("n لازم"));
test("n مش رقم صحيح بيرمي", () => expect(() => starPolygon(4.5, 0.5)).toThrow("n لازم"));
test("inner برا (0, 1) بيرمي", () => expect(() => starPolygon(5, 1.2)).toThrow("inner"));`,
            solution: R`const f = v => Number(v.toFixed(1)) + '%';
function regularPolygon(n) {
  if (!Number.isInteger(n) || n < 3) throw new RangeError('n لازم رقم صحيح 3 أو أكتر');
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (-90 + i * 360 / n) * Math.PI / 180;
    pts.push(f(50 + 50 * Math.cos(a)) + ' ' + f(50 + 50 * Math.sin(a)));
  }
  return 'polygon(' + pts.join(', ') + ')';
}
function starPolygon(n, inner) {
  if (!Number.isInteger(n) || n < 3) throw new RangeError('n لازم رقم صحيح 3 أو أكتر');
  if (!(inner > 0 && inner < 1)) throw new RangeError('inner لازم بين 0 و 1');
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const a = (-90 + i * 180 / n) * Math.PI / 180, r = i % 2 ? 50 * inner : 50;
    pts.push(f(50 + r * Math.cos(a)) + ' ' + f(50 + r * Math.sin(a)));
  }
  return 'polygon(' + pts.join(', ') + ')';
}`
          },
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const f = v => Number(v.toFixed(1)) + "%";
function starPolygon(n, inner) {
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const a = (-90 + i * 180 / n) * Math.PI / 180, r = i % 2 ? 50 * inner : 50;
    pts.push(f(50 + r * Math.cos(a)) + " " + f(50 + r * Math.sin(a)));
  }
  return "polygon(" + pts.join(", ") + ")";
}
function tip(sides, deg) {
  const x = sides.includes("left") ? -1 : sides.includes("right") ? 1 : 0;
  const y = sides.includes("top") ? -1 : sides.includes("bottom") ? 1 : 0;
  const r = deg * Math.PI / 180, tx = x * Math.cos(r) - y * Math.sin(r), ty = x * Math.sin(r) + y * Math.cos(r);
  return Math.abs(ty) < 0.3 ? (tx < 0 ? "left" : "right") : Math.abs(tx) < 0.3 ? (ty < 0 ? "up" : "down") : "diagonal";
}
console.log("star points: " + starPolygon(5, 0.382).split(",").length);
console.log("first: " + starPolygon(5, 0.382).slice(0, 26));
console.log("top+left -45: " + tip(["top", "left"], -45));
console.log("top+right 45: " + tip(["top", "right"], 45));
console.log("top+right 135: " + tip(["top", "right"], 135));`, expect: [R`star points: 10`, R`first: polygon(50% 0%, 61.2% 34.5`, R`top+left -45: left`, R`top+right 45: right`, R`top+right 135: down`] },
          ],
        },
        {
          cmd: "layouts بالـ flex والـ grid",
          title: "ابني ٨ layouts بتتطلب في كل شغل وأثبت إنها سليمة على 1200 و 360",
          learn: R`ترسم أي layout كصناديق على عرضين قبل الكود، وتختار flex لصف واحد و grid للصفوف والعواميد مع بعض، وتقيس النتيجة بأرقام.`,
          out: R`صفحة فيها ٨ layouts بتعدّي فحص ذاتي ١١ من ١١ على 1200 وعلى 360، وتلات دوال بتحسب الـ auto-fit والـ span قبل ما المتصفح يحسبهم.`,
          use: {
            prog: R`الـ layout هو أول حاجة بتتكسر في أي صفحة. لو عرفت تحسب «كام عمود هيطلع» و «الكارت ده عرضه كام» قبل ما تفتح المتصفح، يبقى انت مش بتجرب لحد ما يزبط.`,
            work: R`الثمانية دول هم ٩٠٪ من صفحات أي شغل: لوحة تحكم (سايدبار بيتقفل)، ومتجر (شبكة كروت)، وصفحة هبوط (bento)، وتأكيد مسح (مودال)، وصفحة فاضية لسه فوترها في النص (الفوتر تحت)، ومعرض صور (masonry)، و navbar عربي.`,
            cs: R`[[repeat(auto-fit, minmax(220px, 1fr))]] قسمة صحيحة: [[floor((W + gap) / (min + gap))]]. والـ span جمع: عمودين = عمودين + gap واحد. وده نفس تفكير توزيع عناصر على عدد ثابت من الخانات (bin packing البسيط).`,
          },
          desc: R`كل layout هنا ليه هدف بالأرقام على عرضين: الشاشة العريضة (1200) والموبايل (360). وانت بتختار الأداة، والفحص بيقيس.

• **flex** لما العناصر في صف واحد (أو عمود واحد) وكل واحد حجمه من محتواه: navbar، وصف أزرار، وجوه الكارت.
• **grid** لما فيه صفوف وعواميد مع بعض لازم يتصفّوا: holy grail، والكروت، و bento، والسايدبار مع المحتوى.
• **[[grid-template-areas]]** بيخليك ترسم الـ layout بالكلام، وتغيّر الرسمة بس في الـ media query.
• **[[auto-fit]] و [[minmax()]]** بيخلي عدد العواميد يتحسب لوحده من العرض، من غير media query خالص.
• **CSS columns** للـ masonry: العناصر بتنزل عمود عمود بأطوال مختلفة.
• **logical properties** ([[margin-inline-start]] مش [[margin-left]]) عشان الصفحة العربي تبقى صح من غير ما تقلب حاجة بإيدك.

ده تطبيق على دروس «flexbox» و «grid» و «auto-fit و minmax» و «grid-template-areas» و «media queries» و «logical properties» في التاب ده.`,
          example: R`.page {
  display: grid;
  gap: 12px;
  grid-template-areas: "head" "nav" "main" "side" "foot";
}
@media (min-width: 900px) {
  .page {
    grid-template-columns: 200px 1fr 240px;
    grid-template-areas:
      "head head head"
      "nav  main side"
      "foot foot foot";
  }
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 16px;
}`,
          lines: [
            R`بداية الـ holy grail: الصفحة كلها grid واحد فيه هيدر وقايمة ومحتوى وجانبي وفوتر.`,
            R`[[display: grid]] بيخلي الأولاد الخمسة خانات في شبكة بدل ما يبقوا فوق بعض بالـ block العادي.`,
            R`مسافة 12px بين كل خانة واللي جنبها أو تحتها، من غير margin على أي عنصر.`,
            R`على الموبايل (من غير media query) خمس صفوف بالترتيب: كل كلمة بين علامتين صف، والعمود واحد بس.`,
            R`قفلة قواعد الموبايل. ده الأساس (mobile first)، والشاشة العريضة بتتزاد عليه.`,
            R`من 900px وطالع: الشاشة بقت عريضة كفاية لـ ٣ عواميد جنب بعض.`,
            R`نفس العنصر، بقواعد زيادة بتغلب اللي فوق لأنها بعدها في الملف وبنفس الـ specificity.`,
            R`٣ عواميد: القايمة 200px ثابت، والمحتوى [[1fr]] (الباقي كله)، والجانبي 240px. وفي صفحة [[dir="rtl"]] العمود الأول بيبقى على اليمين لوحده.`,
            R`الرسمة الجديدة بتبدأ هنا: كل سطر تحت صف، وكل كلمة اسم خانة.`,
            R`الصف الأول: الهيدر واخد التلات عواميد. لما الاسم يتكرر جنب بعض الخانة بتتمد.`,
            R`الصف الأوسط: القايمة والمحتوى والجانبي، كل واحد في عمود. المسافات الزيادة بعد [[nav]] للترتيب بس ومالهاش معنى.`,
            R`الصف الأخير: الفوتر بعرض الصفحة كلها.`,
            R`قفلة قواعد [[.page]] جوه الـ media query.`,
            R`قفلة الـ media query نفسها.`,
            R`بداية شبكة الكروت: عدد العواميد هنا مش مكتوب، المتصفح بيحسبه.`,
            R`grid تاني للكروت، ومالوش علاقة بالـ grid بتاع الصفحة.`,
            R`[[auto-fit]] يعني «حط أكتر عدد عواميد يكفي»، و [[minmax(..., 1fr)]] يعني كل عمود مش أقل من الحد ويكبر يملا الباقي. و [[min(220px, 100%)]] عشان على شاشة أضيق من 220 العمود ياخد العرض المتاح بدل ما يطلع برا.`,
            R`مسافة 16px بين الكروت، وهي بتدخل في حساب عدد العواميد (شوف [[autoFitColumns]] تحت).`,
            R`قفلة قواعد الكروت. الشبكة دي شغالة على أي عرض من غير ولا media query.`,
          ],
          teach: R`## الفكرة في سطر

ارسم الـ layout **صناديق على ورقة مرتين**: مرة على 1200 ومرة على 360. لو الصناديق في صف واحد يبقى flex، ولو صفوف وعواميد لازم يتصفوا يبقى grid. اكتب الموبايل الأول، وزوّد الشاشة العريضة في media query، وفي الآخر قيس على العرضين. كل الأرقام تحت من Chrome بـ Playwright على ويندوز ١١.

---

## إزاي تقيس على عرضين

في DevTools دوس Ctrl+Shift+M (Device Toolbar)، واختار Responsive، واكتب العرض 1200 مرة و 360 مرة، والصق الفحص الذاتي في كل مرة. الفحص بيقرا [[innerWidth]] ويختار الهدف المناسب للعرض ده. وأهم دالة فيه [[getBoundingClientRect()]]: بترجّع [[left]] و [[right]] و [[top]] و [[width]] لأي عنصر بالبكسل من أول الشاشة، فتقدر تقول «القايمة على اليمين خالص» بالأرقام.

---

## التمارين التمانية

الصفحة [[dir="rtl"]] و [[box-sizing: border-box]] على كل حاجة، وفيها ٨ أجزاء بالـ ids والـ classes اللي تحت.

### ١. holy grail [[#grail]]
هيدر، و [[.g-nav]] و [[.g-main]] و [[.g-side]]، وفوتر. **من 900px:** القايمة على اليمين (أول عمود في العربي) بعرض 200، والجانبي على الشمال بعرض 240، والتلاتة في نفس الصف. **أقل من 900:** كل جزء بعرض الصفحة وتحت اللي قبله بنفس ترتيب الـ HTML.

### ٢. شبكة كروت [[#cards]]
٧ كروت، كل كارت **مش أقل من 220px** وبيكبر يملا، و gap 16. على 1200 (العرض المتاح 1168) لازم ٥ في الصف الأول، وعلى 360 كارت واحد. ومفيش كارت يطلع برا الحاوية.

### ٣. bento [[#bento]]
٤ عواميد، وكل صف 120px، و gap 12. [[.b1]] عمودين × صفين، و [[.b2]] عمودين × صف، والباقي خانة خانة. **أقل من 600:** عمودين بس، و [[.b1]] بياخد العرض كله.

### ٤. سايدبار بيتقفل [[#app]]
سايدبار 260px والمحتوى الباقي. **أقل من 768:** السايدبار 64px وكلام اللينكات ([[.label]]) مستخبي والأيقونات بس اللي فاضلة.

### ٥. مودال في النص [[#overlay]]
[[<div id="overlay" hidden>]] بيغطي الشاشة كلها بلون شفاف، وجواه [[.modal]] **في نص الشاشة بالظبط** وعرضه [[min(480px, 100% - 32px)]]. والفخ الحقيقي هنا: لو كتبت [[display: grid]] على الـ overlay، الـ [[hidden]] بيبطل يخفيه، لأن [[hidden]] نفسه مجرد [[display: none]] في CSS المتصفح، وأي قاعدة بتاعتك بتغلبه. الحل سطر زيادة: [[#overlay[hidden] { display: none; }]].

### ٦. الفوتر تحت [[#shell]]
هيدر و [[.s-main]] و [[.s-foot]] جوه حاوية [[min-height: 400px]] (مكان الشاشة في التمرين). المحتوى قصير؟ الفوتر يلزق في آخر الـ 400. المحتوى طويل؟ الفوتر ينزل تحته من غير ما يغطيه. الحل: [[grid-template-rows: auto 1fr auto]].

### ٧. masonry [[#masonry]]
٩ عناصر بأطوال مختلفة في ٣ عواميد (كل عمود مش أقل من 200px، و gap 16)، **ومفيش عنصر يتقسم** نصه في عمود ونصه في اللي بعده. الحل [[columns: 3 200px]] و [[break-inside: avoid]].

> الفحص بيعرف إن العنصر اتقسم من [[el.getClientRects().length]]: العنصر العادي ليه مستطيل واحد، واللي اتقسم بين عمودين ليه اتنين.

### ٨. navbar عربي [[#topnav]]
لوجو، وروابط، وزرار «اطلب دلوقتي». اللوجو في البداية (يمين خالص)، والزرار في الآخر (شمال خالص)، ومن غير ولا [[left]] أو [[right]] أو [[margin-left]] أو [[padding-left]] في القواعد بتاعته. وعلى 360 مفيش حاجة طالعة برا.

---

## الفحص الذاتي

~~~js الفحص الذاتي: layouts
(() => {
  const W = innerWidth, q = s => document.querySelector(s), R = el => el.getBoundingClientRect();
  const near = (a, b) => Math.abs(a - b) <= 1.5;
  const inner = el => { const s = getComputedStyle(el); return el.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight); };
  let pass = 0, all = 0;
  const ok = (name, cond, why) => { all++; if (cond) pass++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : ' ← ' + why)); };
  const px = v => Math.round(v) + 'px';
  console.log('عرض الشاشة ' + W + 'px: جرّب تاني على 1200 و 360 (Device Toolbar)');
  const g = q('#grail'), nav = q('.g-nav'), main = q('.g-main'), side = q('.g-side'), gr = R(g);
  if (W >= 900) ok('1 holy grail (عريض)', near(R(nav).right, gr.right) && near(R(nav).width, 200) && near(R(side).width, 240) && near(R(side).left, gr.left) && near(R(nav).top, R(main).top) && near(R(side).top, R(main).top),
    'القايمة لازم على اليمين بعرض 200 والجانبي على الشمال بعرض 240 وفي نفس الصف (القايمة ' + px(R(nav).width) + ' والجانبي ' + px(R(side).width) + ')');
  else ok('1 holy grail (ضيق)', [q('.g-head'), nav, main, side, q('.g-foot')].every((el, i, a) => near(R(el).width, gr.width) && (!i || R(el).top >= R(a[i - 1]).bottom)),
    'على الموبايل كل جزء بعرض الصفحة وتحت اللي قبله بالترتيب');
  const cards = [...document.querySelectorAll('#cards .card')], cw = inner(q('#cards'));
  const want = Math.max(1, Math.floor((cw + 16) / (220 + 16))), cols = new Set(cards.map(c => Math.round(R(c).top))).size ? cards.filter(c => near(R(c).top, R(cards[0]).top)).length : 0;
  ok('2 شبكة الكروت', cols === Math.min(want, cards.length) && cards.every(c => R(c).right <= R(q('#cards')).right + 1 && R(c).left >= R(q('#cards')).left - 1),
    'الصف الأول فيه ' + cols + ' كروت، والمتوقع ' + want + ' على العرض ده (auto-fit و minmax 220px)، ومفيش كارت يطلع برا');
  const bento = q('#bento'), bw = inner(bento), n = W >= 600 ? 4 : 2, col = (bw - (n - 1) * 12) / n, b1 = R(q('.b1')), b2 = R(q('.b2'));
  ok('3 bento', near(b1.width, 2 * col + 12) && near(b1.height, 252) && near(b2.width, 2 * col + 12) && near(b2.height, 120) && near(R(q('#bento .b:nth-child(3)')).width, col),
    'الكبير لازم عمودين × صفين (' + px(2 * col + 12) + ' × 252px) والعريض عمودين × صف، والموجود ' + px(b1.width) + ' × ' + px(b1.height));
  const sd = R(q('.side')), labels = [...document.querySelectorAll('.side .label')];
  if (W >= 768) ok('4 السايدبار (عريض)', near(sd.width, 260) && labels.every(l => l.offsetWidth > 0), 'عرضه ' + px(sd.width) + ' والمطلوب 260 والكلام ظاهر');
  else ok('4 السايدبار (ضيق)', near(sd.width, 64) && labels.every(l => getComputedStyle(l).display === 'none'), 'على أقل من 768 عرضه لازم 64 والكلام مستخبي، والموجود ' + px(sd.width));
  const ov = q('#overlay');
  const hiddenOk = ov.hidden && getComputedStyle(ov).display === 'none';
  ov.hidden = false;
  const m = R(q('.modal')), center = near(m.left + m.width / 2, innerWidth / 2) && near(m.top + m.height / 2, innerHeight / 2), mw = Math.min(480, document.documentElement.clientWidth - 32);
  ov.hidden = true;
  ok('5 المودال: hidden بيخفيه', hiddenOk, 'العنصر عليه hidden بس ظاهر: display في الـ CSS بيغلب [hidden] بتاع المتصفح');
  ok('5 المودال: في النص وعرضه مظبوط', center && near(m.width, mw), 'نص المودال لازم في نص الشاشة وعرضه ' + px(mw) + '، والموجود عرض ' + px(m.width) + ' ونصه عند ' + px(m.left + m.width / 2) + ' من ' + px(innerWidth / 2));
  const shell = q('#shell'), foot = q('.s-foot'), sm = q('.s-main');
  const short = near(R(foot).bottom, R(shell).bottom) && near(R(shell).height, 400);
  const extra = document.createElement('div'); extra.style.height = '700px'; sm.append(extra);
  const long = R(foot).top >= R(sm).bottom - 1 && near(R(foot).bottom, R(shell).bottom);
  extra.remove();
  ok('6 الفوتر تحت', short && long, 'مع محتوى قصير الفوتر لازم يلزق في آخر الـ 400px، ومع محتوى طويل ينزل تحته من غير ما يغطيه');
  const ms = [...document.querySelectorAll('#masonry .m')], mcw = inner(q('#masonry'));
  const mwant = Math.max(1, Math.min(3, Math.floor((mcw + 16) / (200 + 16)))), lefts = new Set(ms.map(x => Math.round(R(x).left))).size;
  const split = ms.filter(x => x.getClientRects().length > 1).length;
  ok('7 masonry', lefts === mwant && split === 0, lefts + ' عواميد والمتوقع ' + mwant + '، و ' + split + ' عنصر متقسم بين عمودين (break-inside)');
  const tn = q('#topnav'), ts = getComputedStyle(tn), nr = R(tn), logo = R(q('.logo')), cta = R(q('.cta'));
  const pad = parseFloat(ts.paddingLeft);
  ok('8 navbar عربي: اللوجو في البداية والزرار في الآخر', near(logo.right, nr.right - pad) && near(cta.left, nr.left + pad), 'في العربي اللوجو يمين خالص والزرار شمال خالص، والزرار دلوقتي على بعد ' + px(cta.left - nr.left - pad) + ' من الشمال');
  ok('8 navbar عربي: مفيش حاجة طالعة', tn.scrollWidth <= tn.clientWidth, 'الـ nav عرض محتواه ' + tn.scrollWidth + ' وهو ' + tn.clientWidth);
  const phys = [];
  for (const sh of document.styleSheets) { let rules; try { rules = [...sh.cssRules]; } catch (e) { continue; }
    for (const r of rules) if (r.style && r.selectorText && /#topnav|\.logo|\.links|\.cta/.test(r.selectorText))
      for (const m of r.style.cssText.matchAll(/(?:^|;\s*)((?:margin|padding)-(?:left|right)|left|right|float)\s*:/g)) phys.push(r.selectorText + ' { ' + m[1] + ' }'); }
  ok('8 navbar عربي: logical properties بس', !phys.length, 'لقيت ' + phys.join(' و '));
  console.log('النتيجة: ' + pass + ' من ' + all);
})();
~~~

ليه الفحص بيدوّر في [[r.style.cssText]] مش [[getPropertyValue('margin-left')]]؟ لأن [[padding: 12px 16px]] بيتفرد جوه المتصفح لـ [[padding-left]] و [[padding-right]]، فالطريقة التانية كانت هتقول «لقيت padding-left» على كود سليم. أول نسخة من الفحص ده عملت كده فعلًا وطلّعت FAIL على الحل الصح، و [[cssText]] بيرجّع اللي انت كتبته ([[padding: 12px 16px;]]) فالـ regex بيلقط بس اللي اتكتب بالاسم.

### الحل الغلط على 1200 و 360

الحل الغلط بالأساليب اللي بتتشاف كتير: holy grail بـ flex و widths ثابتة، وكروت [[repeat(3, 1fr)]]، و bento من غير span، وسايدبار مبيتقفلش، ومودال بـ [[top: 50%; left: 50%]] من غير translate، وفوتر من غير grid، و masonry من غير [[break-inside]]، و [[margin-left: auto]] على الزرار (منقول من موقع إنجليزي).

~~~text Chrome على 1200، الحل الغلط
FAIL 1 holy grail (عريض) ← القايمة لازم على اليمين بعرض 200 والجانبي على الشمال بعرض 240 وفي نفس الصف (القايمة 216px والجانبي 256px)
FAIL 2 شبكة الكروت ← الصف الأول فيه 3 كروت، والمتوقع 5 على العرض ده (auto-fit و minmax 220px)، ومفيش كارت يطلع برا
FAIL 3 bento ← الكبير لازم عمودين × صفين (578px × 252px) والعريض عمودين × صف، والموجود 283px × 120px
PASS 4 السايدبار (عريض)
FAIL 5 المودال: hidden بيخفيه ← العنصر عليه hidden بس ظاهر: display في الـ CSS بيغلب [hidden] بتاع المتصفح
FAIL 5 المودال: في النص وعرضه مظبوط ← نص المودال لازم في نص الشاشة وعرضه 480px، والموجود عرض 528px ونصه عند 864px من 600px
FAIL 6 الفوتر تحت ← مع محتوى قصير الفوتر لازم يلزق في آخر الـ 400px، ومع محتوى طويل ينزل تحته من غير ما يغطيه
FAIL 7 masonry ← 3 عواميد والمتوقع 3، و 1 عنصر متقسم بين عمودين (break-inside)
FAIL 8 navbar عربي: اللوجو في البداية والزرار في الآخر ← في العربي اللوجو يمين خالص والزرار شمال خالص، والزرار دلوقتي على بعد 745px من الشمال
PASS 8 navbar عربي: مفيش حاجة طالعة
FAIL 8 navbar عربي: logical properties بس ← لقيت .cta { margin-left }
النتيجة: 2 من 11
~~~

اقرا الأرقام: القايمة 216 مش 200 لأن الحل الغلط مفيهوش [[box-sizing: border-box]] والـ padding 8 + 8 اتزاد. والمودال 528 لنفس السبب (480 + 24 + 24)، ونصه عند 864 لأن [[left: 50%]] بيحط **أول** المودال في النص مش نصه. والزرار على بعد 745px من الشمال: [[margin-left: auto]] في صفحة عربي بيحط المسافة الفاضية **بين** الزرار والحافة الشمال، فالزرار فضل لازق في الروابط.

~~~text Chrome على 360، الحل الغلط
FAIL 1 holy grail (ضيق) ← على الموبايل كل جزء بعرض الصفحة وتحت اللي قبله بالترتيب
FAIL 2 شبكة الكروت ← الصف الأول فيه 3 كروت، والمتوقع 1 على العرض ده (auto-fit و minmax 220px)، ومفيش كارت يطلع برا
FAIL 3 bento ← الكبير لازم عمودين × صفين (328px × 252px) والعريض عمودين × صف، والموجود 73px × 120px
FAIL 4 السايدبار (ضيق) ← على أقل من 768 عرضه لازم 64 والكلام مستخبي، والموجود 260px
FAIL 5 المودال: hidden بيخفيه ← العنصر عليه hidden بس ظاهر: display في الـ CSS بيغلب [hidden] بتاع المتصفح
FAIL 5 المودال: في النص وعرضه مظبوط ← نص المودال لازم في نص الشاشة وعرضه 328px، والموجود عرض 528px ونصه عند 444px من 180px
FAIL 6 الفوتر تحت ← مع محتوى قصير الفوتر لازم يلزق في آخر الـ 400px، ومع محتوى طويل ينزل تحته من غير ما يغطيه
PASS 7 masonry
FAIL 8 navbar عربي: اللوجو في البداية والزرار في الآخر ← في العربي اللوجو يمين خالص والزرار شمال خالص، والزرار دلوقتي على بعد -18px من الشمال
FAIL 8 navbar عربي: مفيش حاجة طالعة ← الـ nav عرض محتواه 330 وهو 328
FAIL 8 navbar عربي: logical properties بس ← لقيت .cta { margin-left }
النتيجة: 1 من 11
~~~

الـ masonry عدّى على 360 مع إنه غلط: عمود واحد مفيهوش حاجة تتقسم. وده سبب إن **لازم تفحص على عرضين**: غلطة بتبان على عرض وتستخبى على التاني.

### الحل المرجعي

~~~text Chrome على 1200 وعلى 360، الحل اللي في «الحل»
عرض الشاشة 1200px: جرّب تاني على 1200 و 360 (Device Toolbar)
PASS 1 holy grail (عريض)
PASS 2 شبكة الكروت
PASS 3 bento
PASS 4 السايدبار (عريض)
PASS 5 المودال: hidden بيخفيه
PASS 5 المودال: في النص وعرضه مظبوط
PASS 6 الفوتر تحت
PASS 7 masonry
PASS 8 navbar عربي: اللوجو في البداية والزرار في الآخر
PASS 8 navbar عربي: مفيش حاجة طالعة
PASS 8 navbar عربي: logical properties بس
النتيجة: 11 من 11
~~~

وعلى 360 نفس الـ ١١ سطر PASS بس السطور ١ و ٤ مكتوب فيها «(ضيق)».

---

## التمرين اللي بيتصحح لوحده: احسب قبل المتصفح

| الدالة | بترجّع | المعادلة |
|---|---|---|
| [[autoFitColumns(width, min, gap)]] | عدد العواميد اللي [[repeat(auto-fit, minmax(min, 1fr))]] هيعملها | [[floor((width + gap) / (min + gap))]] ومش أقل من 1 |
| [[trackWidth(width, min, gap)]] | عرض العمود بعد ما الـ [[1fr]] يملا، برقم عشري واحد | [[(width − gap × (n − 1)) / n]] |
| [[spanSize(span, track, gap)]] | عرض (أو طول) خانة واخدة كذا عمود | [[span × track + (span − 1) × gap]] |

ليه [[width + gap]]؟ لأن n عمود فيهم n − 1 gap بس، فلو زوّدت gap واحد للعرض بقى عندك n مجموعة «عمود + gap» بالظبط. واتأكدت في Chrome: حاوية 1164px بتطلّع ٥ عواميد عرضهم 220، و 1163px بتطلّع ٤ عرضهم 278.75، يعني بكسل واحد بيفرق عمود.

## خلاصة

- صناديق على ورقة على عرضين قبل أي كود.
- flex لصف، و grid لصفوف وعواميد، و [[grid-template-areas]] لما الترتيب بيتغير.
- [[minmax(min(220px, 100%), 1fr)]] مش [[minmax(220px, 1fr)]]، عشان الشاشة الضيقة.
- [[hidden]] بيبطل مع أي [[display]] بتاعك، فزوّد [[[hidden] { display: none }]].
- في العربي: [[margin-inline-start: auto]] مش [[margin-left: auto]]، والعمود الأول في الـ grid على اليمين لوحده.
- افحص على 1200 و 360: كل عرض بيخبي غلطات.`,
          try: R`اعمل [[layouts.html]] فيه الأجزاء التمانية بنفس الـ ids والـ classes (الهيكل كله في الحل)، وابني layout واحد كل مرة والصق الفحص على 1200 وعلى 360 من Device Toolbar. وبعدها اكتب [[autoFitColumns]] و [[trackWidth]] و [[spanSize]] في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** حاوية عرضها 700px، و [[grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px]]. هيطلع كام عمود وعرض كل واحد كام؟ احسب بالمعادلة على ورقة، وبعدين افتحه وقيس بـ [[getBoundingClientRect().width]].`, done: R`حسبت [[floor(716 / 236) = 3]] عواميد، وكل واحد [[(700 − 32) / 3 = 222.67]]، والمتصفح طلّع 3 عواميد و [[222.65625]] (الفرق من تقريب البكسل لـ 1/64).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مودال [[.overlay { position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; }]] و [[<div class="overlay" hidden>]]، والصفحة كلها متغطية رمادي من أول ما تفتح. لاقي السبب من Elements › Computed › display، وصلّحه بسطر واحد من غير ما تشيل [[display: flex]].`, done: R`Computed قال [[display: flex]] مع إن العنصر عليه [[hidden]]، وفهمت إن [[hidden]] مجرد [[display: none]] بأقل specificity، وزوّدت [[.overlay[hidden] { display: none; }]]، وفحص المودال بقى PASS في الحالتين.` },
            { lvl: 'تطبيق', t: R`**ابني:** dashboard: هيدر فوق، وسايدبار، و ٤ كروت أرقام (KPI) في صف بيبقى ٢ × ٢ على التابلت وواحد تحت التاني على الموبايل، وتحتهم جدول بياخد العرض كله. كله بـ grid واحد و [[grid-template-areas]] بتتغير في media query.`, done: R`على 1200 الكروت ٤ في صف، وعلى 768 اتنين في صف، وعلى 360 واحد، والجدول تحتهم بعرض المحتوى في التلاتة، والـ HTML نفسه متغيرش بين العروض (الترتيب كله من الـ CSS)، وفحص الـ overflow بتاع الدرس اللي بعده بيقول [[مفيش scroll أفقي]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل نفس شبكة الكروت مرة بـ [[auto-fit]] ومرة بـ [[auto-fill]]، بـ ٣ كروت بس، على 1200. إيه الفرق في عرض الكارت؟ وامتى تختار دي ودي؟`, done: R`مع [[auto-fit]] الـ ٣ كروت بيتمدوا يملوا الصف (حوالي 379px كل واحد)، ومع [[auto-fill]] فضلوا قريب من 220 وفيه خانات فاضية في الآخر، والقياس مكتوب بالأرقام، ومكتوب إن auto-fill أحسن لما عايز الكروت متتمددش لما يبقوا قليلين.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه [[margin-left: auto]] بيحط زرار الـ navbar في آخره في صفحة إنجليزي ومش في صفحة عربي، والحل اللي بيشتغل في الاتنين.`, done: R`الشرح بيقول إن الـ auto margin بياخد المسافة الفاضية في الناحية اللي هو فيها، وفي الإنجليزي الشمال هي «قبل» الزرار وفي العربي هي «بعده»، وإن [[margin-inline-start: auto]] معناها «قبل» في اللغتين، وزميلك طبّقها على navbar بلغتين ونجحت.` },
          ],
          deep: {
            why: R`أغلب باجات الـ CSS اللي بتتبلّغ في الشغل layout: «الكارت ده أعرض من التاني»، و «الزرار مش في مكانه في العربي»، و «المودال مش في النص على الآيفون». والـ layouts التمانية دول بيتكرروا في كل مشروع، فلو كل واحد منهم بقى عندك وصفة مجرّبة ومتقاسة، بتكتب أي صفحة جديدة من القطع دي من غير تجربة وتخمين.`,
            how: R`الـ grid بيحسب العواميد الأول: الثابت ([[200px]]) بياخد حقه، والباقي بيتقسم على الـ [[fr]]. ومع [[auto-fit]] المتصفح بيجرب أكبر عدد عواميد بحجم الـ min يدخل، وبعدين الـ [[1fr]] بيوزع الباقي، وده بالظبط [[floor((W + gap) / (min + gap))]]. و [[grid-template-areas]] بيحط كل عنصر في الخانة اللي اسمها زي [[grid-area]] بتاعه، فترتيب الـ HTML بيفضل منطقي لقارئ الشاشة والشكل بيتغير. والـ flex بيحسب كل عنصر من محتواه، وأي [[auto]] margin بياكل المسافة الفاضية في اتجاهه. والاتجاه نفسه ([[dir="rtl"]]) بيقلب «البداية» و «النهاية» لوحده لـ grid و flex والـ logical properties، بس [[left]] و [[right]] بيفضلوا ثابتين. والـ CSS columns بيصب العناصر في العمود الأول لحد ما يتملا (الطول متوازن)، و [[break-inside: avoid]] بيمنع العنصر يتقسم بين عمودين.`,
            when: R`grid لأي حاجة ليها صفوف وعواميد لازم يتصفوا (صفحة، شبكة، فورم بعمودين). flex لصف واحد بيتوزع حسب المحتوى (navbar، أزرار، جوه الكارت). CSS columns للـ masonry لما الترتيب من فوق لتحت مقبول، ولو لازم الترتيب يبقى بالصف يبقى JavaScript أو [[grid-template-rows: masonry]] لما يبقى Baseline (لسه مش في كل المتصفحات وقت كتابة الدرس، شوف درس «Baseline و @supports»). و container queries بدل media queries لما الـ component بيتحط في أماكن بعروض مختلفة.`,
            mistakes: R`[[minmax(220px, 1fr)]] من غير [[min(..., 100%)]] فعلى 200px الكارت بيطلع برا. و [[left: 50%; top: 50%]] من غير [[translate: -50% -50%]] فأول المودال في النص مش نصه (والأسهل [[display: grid; place-items: center]] على الـ overlay). و [[margin-left: auto]] في صفحة عربي. و [[display]] على عنصر عليه [[hidden]]. و [[height: 100vh]] على الصفحة عشان الفوتر ينزل، فالمحتوى الطويل بيتقص (الصح [[min-height]] و [[1fr]]). و [[position: sticky]] على عنصر في grid من غير [[align-self: start]] فبيتمد بطول الصف ومبيلزقش. و قياس على عرض واحد بس.`,
          },
          sol: R`الحل المرجعي كامل تحت (الـ CSS والـ HTML)، وده اللي طلّع ١١ من ١١ على 1200 وعلى 360. أهم ٥ سطور فيه: [[grid-template-areas]] بتتغير في [[@media (min-width: 900px)]]، و [[minmax(min(220px, 100%), 1fr)]]، و [[#overlay[hidden] { display: none; }]]، و [[grid-template-rows: auto 1fr auto]]، و [[.cta { margin-inline-start: auto; }]].

وحل المربع اللي بيتصحح لوحده في آخر الكود. لو اختبار «1164 = ٥ و 1163 = ٤» وقع، يبقى نسيت تزوّد gap على العرض قبل القسمة.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>layouts</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
section > *, .b, .m, .card { background: #e0e7ff; padding: 8px; }
#grail { display: grid; gap: 12px; grid-template-areas: "head" "nav" "main" "side" "foot"; }
.g-head { grid-area: head; } .g-nav { grid-area: nav; } .g-main { grid-area: main; min-height: 160px; } .g-side { grid-area: side; } .g-foot { grid-area: foot; }
@media (min-width: 900px) {
  #grail { grid-template-columns: 200px 1fr 240px; grid-template-areas: "head head head" "nav main side" "foot foot foot"; }
}
#cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 16px; }
#bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 120px; gap: 12px; }
.b1 { grid-column: span 2; grid-row: span 2; }
.b2 { grid-column: span 2; }
@media (max-width: 599px) { #bento { grid-template-columns: repeat(2, 1fr); } }
#app { display: grid; grid-template-columns: 260px 1fr; gap: 12px; min-height: 200px; }
.side { display: flex; flex-direction: column; gap: 8px; }
@media (max-width: 767px) {
  #app { grid-template-columns: 64px 1fr; }
  .side .label { display: none; }
}
#overlay { position: fixed; inset: 0; display: grid; place-items: center; background: rgb(0 0 0 / .5); }
#overlay[hidden] { display: none; }
.modal { width: min(480px, 100% - 32px); background: #fff; padding: 24px; border-radius: 12px; }
#shell { min-height: 400px; display: grid; grid-template-rows: auto 1fr auto; gap: 8px; }
#masonry { columns: 3 200px; column-gap: 16px; }
.m { break-inside: avoid; margin-block-end: 16px; }
#topnav { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; padding: 12px 16px; background: #0f172a; }
#topnav a { color: #fff; }
.links { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
.cta { margin-inline-start: auto; }
</style>
</head>
<body>
<section id="grail">
  <header class="g-head">الهيدر</header>
  <nav class="g-nav">القايمة</nav>
  <main class="g-main">المحتوى الأساسي</main>
  <aside class="g-side">جانبي</aside>
  <footer class="g-foot">الفوتر</footer>
</section>
<section id="cards">
  <article class="card">كارت ١</article><article class="card">كارت ٢</article><article class="card">كارت ٣</article><article class="card">كارت ٤</article>
  <article class="card">كارت ٥</article><article class="card">كارت ٦</article><article class="card">كارت ٧</article>
</section>
<section id="bento">
  <div class="b b1">كبير</div><div class="b b2">عريض</div><div class="b">٣</div><div class="b">٤</div><div class="b">٥</div><div class="b">٦</div>
</section>
<section id="app">
  <aside class="side"><a href="#">🏠 <span class="label">الرئيسية</span></a><a href="#">📦 <span class="label">الطلبات</span></a><a href="#">⚙ <span class="label">الإعدادات</span></a></aside>
  <div class="content">المحتوى</div>
</section>
<div id="overlay" hidden><div class="modal" role="dialog" aria-label="تأكيد">متأكد إنك عايز تمسح الطلب؟</div></div>
<section id="shell"><header>هيدر</header><main class="s-main">صفحة قصيرة</main><footer class="s-foot">فوتر</footer></section>
<section id="masonry">
  <div class="m" style="height:90px">١</div><div class="m" style="height:160px">٢</div><div class="m" style="height:120px">٣</div>
  <div class="m" style="height:200px">٤</div><div class="m" style="height:80px">٥</div><div class="m" style="height:140px">٦</div>
  <div class="m" style="height:110px">٧</div><div class="m" style="height:170px">٨</div><div class="m" style="height:100px">٩</div>
</section>
<nav id="topnav"><a class="logo" href="#">متجر الورد</a><ul class="links"><li><a href="#">المنتجات</a></li><li><a href="#">العروض</a></li><li><a href="#">تواصل</a></li></ul><a class="cta" href="#">اطلب دلوقتي</a></nav>
<script>
// حل التمرين اللي بيتصحح لوحده
function autoFitColumns(width, min, gap) {
  if (width <= 0 || min <= 0 || gap < 0) throw new RangeError('الأرقام لازم موجبة');
  return Math.max(1, Math.floor((width + gap) / (min + gap)));
}
function trackWidth(width, min, gap) {
  const n = autoFitColumns(width, min, gap);
  return Math.round((width - gap * (n - 1)) / n * 10) / 10;
}
function spanSize(span, track, gap) {
  return span * track + (span - 1) * gap;
}
</script>
</body>
</html>`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`// repeat(auto-fit, minmax(min, 1fr)) مع gap: كام عمود؟ وعرض كل عمود كام؟
function autoFitColumns(width, min, gap) {}
function trackWidth(width, min, gap) {}
function spanSize(span, track, gap) {}`,
            tests: R`test("1168px و min 220 و gap 16: ٥ عواميد", () => expect(autoFitColumns(1168, 220, 16)).toBe(5));
test("الـ gap بيتحسب: 700px بـ gap 16 = ٣ مش ٢", () => expect(autoFitColumns(700, 220, 16)).toBe(3));
test("بالظبط على الحد: 5×220 + 4×16 = 1164px = ٥", () => expect([autoFitColumns(1164, 220, 16), autoFitColumns(1163, 220, 16)]).toEqual([5, 4]));
test("أضيق من الـ min: عمود واحد مش صفر", () => expect(autoFitColumns(328, 340, 12)).toBe(1));
test("gap صفر", () => expect(autoFitColumns(900, 300, 0)).toBe(3));
test("أرقام سالبة بترمي RangeError", () => expect(() => autoFitColumns(-1, 220, 16)).toThrow("موجبة"));
test("trackWidth: العمود بيكبر عشان يملا (1fr)", () => expect(trackWidth(1168, 220, 16)).toBe(220.8));
test("trackWidth: عمود واحد بياخد العرض كله", () => expect(trackWidth(328, 340, 12)).toBe(328));
test("spanSize: كارت عمودين = عمودين + gap واحد", () => expect(spanSize(2, 283, 12)).toBe(578));
test("spanSize: صفين بارتفاع 120 = 252", () => expect(spanSize(2, 120, 12)).toBe(252));`,
            solution: R`function autoFitColumns(width, min, gap) {
  if (width <= 0 || min <= 0 || gap < 0) throw new RangeError('الأرقام لازم موجبة');
  return Math.max(1, Math.floor((width + gap) / (min + gap)));
}
function trackWidth(width, min, gap) {
  const n = autoFitColumns(width, min, gap);
  return Math.round((width - gap * (n - 1)) / n * 10) / 10;
}
function spanSize(span, track, gap) {
  return span * track + (span - 1) * gap;
}`
          },
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const autoFitColumns = (width, min, gap) => Math.max(1, Math.floor((width + gap) / (min + gap)));
const trackWidth = (width, min, gap) => { const n = autoFitColumns(width, min, gap); return (width - gap * (n - 1)) / n; };
const spanWidth = (span, col, gap) => span * col + (span - 1) * gap;
for (const w of [1168, 700, 328]) console.log(w + "px: " + autoFitColumns(w, 220, 16) + " columns of " + trackWidth(w, 220, 16).toFixed(1) + "px");
const col = (1168 - 3 * 12) / 4;
console.log("bento big tile: " + spanWidth(2, col, 12) + "x" + spanWidth(2, 120, 12));`, expect: [R`1168px: 5 columns of 220.8px`, R`700px: 3 columns of 222.7px`, R`328px: 1 columns of 328.0px`, R`bento big tile: 578x252`] },
          ],
        },
        {
          cmd: "صفحات بتفيض على 360",
          title: "صفحة بتعمل scroll أفقي على الموبايل: لاقي العنصر وصلّحه (٨ حالات)",
          learn: R`تلاقي العنصر اللي مسبب الـ scroll الأفقي في دقيقة بكود في الـ Console بدل ما تشيل CSS واحدة واحدة، وتصلّح السبب نفسه مش العَرَض.`,
          out: R`صفحة فيها ٨ أسباب حقيقية للفيضان بتعدّي من [[0 من 8]] لـ [[8 من 8]]، وفحص بيكشف الحيلة بتاعة [[overflow-x: hidden]] على الـ body.`,
          use: {
            prog: R`الفيضان الأفقي أشهر باج responsive: سطر CSS واحد في أي حتة في الصفحة بيخلي الصفحة كلها تتهز يمين وشمال على الموبايل.`,
            work: R`دي أكتر تيكت بتيجي من صاحب الشغل بعد ما يفتح الموقع من موبايله: «الصفحة بتتحرك لما أسحب». ولو صلّحتها بـ [[overflow-x: hidden]] على الـ body هتكسر الـ sticky header وهتخبي محتوى بجد، والفحص هنا بيقولك ده.`,
            cs: R`الفحص بيلف على كل عنصر في الشجرة ويقارن مستطيله بحدود الأب: ده traversal على شجرة الـ DOM بـ O(n). والكلام بيتقاس بـ [[Range]] لأن النص مش عنصر وملوش [[getBoundingClientRect]] لوحده.`,
          },
          desc: R`الصفحة بتفيض لما عنصر واحد بس يبقى أعرض من الشاشة. والطريقة: **لاقي العنصر الأول، وبعدين صلّح السبب**. فيه ٨ أسباب بيتكرروا في كل موقع:

• صورة بعرض ثابت ([[width="600"]]) من غير [[max-width: 100%]].
• كلمة طويلة من غير مسافات (إيميل، أو كود خصم، أو لينك) من غير [[overflow-wrap: anywhere]].
• جدول عريض من غير حاوية بـ [[overflow-x: auto]].
• صف أزرار flex من غير [[flex-wrap: wrap]].
• [[width: 100vw]]، وده أعرض من الصفحة بعرض شريط الـ scroll على ويندوز.
• grid بـ [[minmax(340px, 1fr)]] على شاشة مكانها 328.
• [[<pre>]] فيه سطر كود طويل.
• عنصر flex فيه كلمة طويلة: الـ [[min-width: auto]] الافتراضي بيمنعه يصغر عن الكلمة.

وفي صفحة عربي الفيضان بيبقى **ناحية الشمال** (أرقام [[left]] بالسالب)، فلو دوّرت على [[right > innerWidth]] بس مش هتلاقي حاجة. ده تطبيق على دروس «media queries» و «مصفوفة مقاسات» و «auto-fit و minmax» و «جدول responsive» في التاب ده.`,
          example: R`const W = document.documentElement.clientWidth;
const out = [...document.querySelectorAll('body *')].filter(el => {
  const r = el.getBoundingClientRect();
  return r.width && (r.right > W + 0.5 || r.left < -0.5);
});
console.log('الصفحة ' + document.documentElement.scrollWidth + 'px والشاشة ' + W + 'px، و ' + out.length + ' عنصر طالع برا');
out.forEach(el => el.style.outline = '2px solid red');
out.slice(0, 6).forEach(el => console.log(el.tagName.toLowerCase() + (el.className ? '.' + el.className : '') + ' ' + Math.round(el.getBoundingClientRect().left) + ' → ' + Math.round(el.getBoundingClientRect().right)));`,
          lines: [
            R`عرض الشاشة من غير شريط الـ scroll. [[clientWidth]] بتاع [[<html>]] هو المساحة اللي المحتوى المفروض يفضل جواها، وده أدق من [[innerWidth]] اللي بيشمل الشريط.`,
            R`بنلف على كل عنصر جوه الـ body ونخلي اللي طالع برا بس. [[[...]]] بيحوّل الـ NodeList لـ array عشان [[filter]] تشتغل عليها.`,
            R`مستطيل العنصر بالبكسل من أول الشاشة: [[left]] و [[right]] و [[width]].`,
            R`العنصر طالع لو آخره بعد حافة الشاشة اليمين، **أو** أوله قبل حافتها الشمال (وده اللي بيحصل في العربي). و [[r.width]] بيستبعد العناصر المستخبية اللي عرضها صفر، و 0.5 سماح لكسور البكسل.`,
            R`قفلة الـ filter. لحد هنا [[out]] فيها كل عنصر حدوده برا الشاشة.`,
            R`بنطبع عرض الصفحة كلها ([[scrollWidth]]) جنب عرض الشاشة. لو الاتنين متساويين يبقى مفيش scroll أفقي، ولو الأول أكبر يبقى فيه.`,
            R`بنحط إطار أحمر على كل عنصر طالع عشان تشوفه بعينك. [[outline]] مش بياخد مكان، فمش بيغيّر الـ layout اللي بتقيسه.`,
            R`بنطبع أول ٦ عناصر باسمهم ومن فين لفين. أول واحد في اللستة غالبًا هو السبب، واللي بعده أولاده.`,
          ],
          teach: R`## الفكرة في سطر

**متشيلش CSS واحدة واحدة.** لاقي العنصر الطالع بكود، واسأل «ليه ده أعرض من مكانه؟»، وصلّح السبب ده بالذات. وبعدين افحص تاني. كل الأرقام تحت من Chrome بـ Playwright على عرض 360 × 640 على ويندوز ١١.

---

## الخطوة ١: الكود اللي في المثال، وحدوده

على الصفحة البايظة (الأجزاء التمانية تحت):

~~~text الكود اللي في المثال، الصفحة البايظة على 360
الصفحة 793px والشاشة 360px، و 17 عنصر طالع برا
img -256 → 344
table -240 → 344
tbody -238 → 342
tr -238 → 342
th -67 → 7
th -159 → -69
~~~

لاحظ: كل الأرقام [[left]] بالسالب و [[right]] جوه الشاشة (344). الصفحة [[dir="rtl"]]، فالعنصر بيبدأ من اليمين ويفيض شمال. ولو كنت بدوّر على [[right > W]] بس، كنت هتلاقي صفر.

وعلى الصفحة **بعد التصليح**:

~~~text نفس الكود، الصفحة السليمة على 360
الصفحة 360px والشاشة 360px، و 11 عنصر طالع برا
table -240 → 344
tbody -238 → 342
tr -238 → 342
th -67 → 7
th -159 → -69
th -238 → -161
~~~

الصفحة مبقاش فيها scroll (360 = 360)، بس الكود لسه بيقول ١١ عنصر! دول الجدول وأولاده جوه [[.table-wrap]] اللي عليها [[overflow-x: auto]]: الجدول أعرض من الشاشة **عن قصد** والحاوية بتعمل scroll لوحدها. يعني الكود البسيط بيدي إنذار كاذب، وعشان كده الفحص الذاتي تحت بيتخطى أي عنصر جوه scroll container.

---

## الخطوة ٢: الأسباب التمانية وتصليحها

الصفحة: «متجر الورد» (متخيل)، [[<html lang="ar" dir="rtl">]]، و [[section { padding: 16px }]]، فالمكان المتاح جوه كل جزء على 360 هو **328px**. كل جزء [[<section id="s1">]] لحد [[s8]].

| الجزء | اللي بيفيض | ليه | التصليح |
|---|---|---|---|
| [[s1]] صورة المنتج | [[<img width="600">]] | الـ attribute بيدي الصورة عرض 600 ثابت | [[img { max-width: 100%; height: auto; }]]، والـ [[height: auto]] عشان النسبة متبوظش |
| [[s2]] إيميل الدعم | [[customer.support.orders.team@...]] | المتصفح بيكسر السطر عند المسافات بس، والإيميل كلمة واحدة | [[overflow-wrap: anywhere]] بيسمح يكسر جوه الكلمة لما مفيش حل تاني |
| [[s3]] جدول الطلبات | [[<table>]] فيه ٦ عواميد [[nowrap]] | الجدول مبيصغرش عن محتوى خلاياه | حاوية [[.table-wrap { overflow-x: auto }]]: الجدول يعمل scroll جواها والصفحة لأ |
| [[s4]] أزرار الفلتر | ٦ أزرار في [[display: flex]] | الـ flex الافتراضي [[nowrap]]: صف واحد مهما حصل | [[flex-wrap: wrap]] |
| [[s5]] الهيرو | [[width: 100vw]] | 100vw = الشاشة كلها، والـ section فيه padding 16، فالهيرو طالع 16px | امسح الـ width (الـ block بياخد عرض أبوه لوحده) |
| [[s6]] كروت المميزات | [[minmax(340px, 1fr)]] | أقل عرض للعمود 340 والمكان 328 | [[minmax(min(340px, 100%), 1fr)]] |
| [[s7]] كود الـ API | [[<pre>]] بسطر 765px | الـ pre مبيكسرش السطور (وده صح للكود) | [[pre { overflow-x: auto; }]] |
| [[s8]] صف المنتج | [[span.name]] في flex | عنصر الـ flex [[min-width: auto]]، يعني مبيصغرش عن أطول كلمة جواه | [[.name { min-width: 0; overflow-wrap: anywhere; }]] |

> **[[100vw]] على ويندوز:** شغّلت صفحة فيها [[width: 100vw]] بس ومفيش padding، في Chrome عادي (مش headless) على ويندوز ١١: [[innerWidth]] 1200، و [[clientWidth]] 1185 (شريط الـ scroll 15px)، والعنصر 1200، يعني scroll أفقي 15px على أي كمبيوتر ويندوز. ونفس الصفحة في Chrome **headless** طلّعت 1200 و 1200 ومفيش مشكلة، لأن headless شريطه مش بياخد مكان. يعني اختبار آلي بس ممكن يعدّي الباج ده.

---

## الخطوة ٣: الفحص الذاتي

بيقيس كل [[section[id]]] لوحده: كل عنصر جواه لازم يفضل جوه مساحة المحتوى (من غير الـ padding)، وكل كلام لازم يفضل جواها برضه. الكلام بيتقاس بـ [[document.createRange()]] لأن النص مش عنصر: الـ Range بيحوط الحروف نفسها ويرجّع مستطيلها. وأي حاجة جوه أب عليه [[overflow-x]] غير [[visible]] بتتخطى، لأنها بتعمل scroll جواه مش في الصفحة.

~~~js الفحص الذاتي: الفيضان
(() => {
  const W = document.documentElement.clientWidth, de = document.documentElement;
  const scroller = el => /auto|scroll|hidden|clip/.test(getComputedStyle(el).overflowX);
  const insideScroller = (el, sec) => { for (let p = el.parentElement; p && p !== sec; p = p.parentElement) if (scroller(p)) return true; return false; };
  const name = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList.length ? '.' + [...el.classList].join('.') : '');
  let pass = 0, all = 0;
  console.log('الصفحة: عرض الشاشة ' + W + ' وعرض المحتوى ' + de.scrollWidth + (de.scrollWidth > W ? ' ← فيه scroll أفقي' : ' ← مفيش scroll أفقي'));
  for (const sec of document.querySelectorAll('section[id]')) {
    const s = getComputedStyle(sec), r0 = sec.getBoundingClientRect();
    const left = r0.left + parseFloat(s.paddingLeft) + parseFloat(s.borderLeftWidth), right = r0.right - parseFloat(s.paddingRight) - parseFloat(s.borderRightWidth);
    const bad = [];
    for (const el of sec.querySelectorAll('*')) {
      if (insideScroller(el, sec)) continue;
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      if (r.right > right + 0.5 || r.left < left - 0.5) bad.push(name(el) + ' عرضه ' + Math.round(r.width) + 'px والمكان ' + Math.round(right - left) + 'px');
    }
    const walk = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    for (let t; (t = walk.nextNode());) {
      if (!t.data.trim() || insideScroller(t.parentElement, sec) || scroller(t.parentElement) && t.parentElement !== sec) continue;
      const rg = document.createRange(); rg.selectNodeContents(t);
      const r = rg.getBoundingClientRect();
      if (r.right > right + 0.5 || r.left < left - 0.5) bad.push('كلام في ' + name(t.parentElement) + ' عرضه ' + Math.round(r.width) + 'px: «' + t.data.trim().slice(0, 18) + '…»');
    }
    all++; if (!bad.length) pass++;
    console.log((bad.length ? 'FAIL ' : 'PASS ') + sec.id + ' ' + sec.querySelector('h2').textContent + (bad.length ? ' ← ' + bad.slice(0, 2).join('، و ') : ''));
  }
  console.log('النتيجة: ' + pass + ' من ' + all + (de.scrollWidth > W ? '، والصفحة لسه بتفيض' : ''));
})();
~~~

### على الصفحة البايظة

~~~text Chrome على 360، قبل التصليح
الصفحة: عرض الشاشة 360 وعرض المحتوى 793 ← فيه scroll أفقي
FAIL s1 ١ صورة المنتج ← img عرضه 600px والمكان 328px
FAIL s2 ٢ إيميل الدعم ← كلام في p عرضه 399px: «ابعتلنا على custom…»
FAIL s3 ٣ جدول الطلبات ← table عرضه 584px والمكان 328px، و tbody عرضه 580px والمكان 328px
FAIL s4 ٤ أزرار الفلتر ← button عرضه 78px والمكان 328px، و button عرضه 63px والمكان 328px
FAIL s5 ٥ الهيرو ← div.hero عرضه 360px والمكان 328px
FAIL s6 ٦ كروت المميزات ← div.f عرضه 340px والمكان 328px، و div.f عرضه 340px والمكان 328px
FAIL s7 ٧ كود الـ API ← code عرضه 765px والمكان 328px، و كلام في code عرضه 765px: «fetch("https://flo…»
FAIL s8 ٨ صف المنتج ← span.name عرضه 388px والمكان 328px، و button عرضه 41px والمكان 328px
النتيجة: 0 من 8، والصفحة لسه بتفيض
~~~

في [[s4]] الزرار عرضه 78px بس وطالع: العيب مش في عرضه، في إن الصف كله مبيلفّش. وفي [[s8]] الزرار «أضف» (41px) طالع لأن [[span.name]] اللي قبله زقه برا. يعني أول عنصر في الرسالة هو السبب، والتاني ضحيته.

### الحيلة اللي بتخبي المشكلة

لو حطيت [[html, body { overflow-x: hidden; }]] على الصفحة البايظة من غير ما تصلّح حاجة:

~~~text Chrome على 360، الصفحة البايظة + overflow-x: hidden على الـ body
الصفحة: عرض الشاشة 360 وعرض المحتوى 360 ← مفيش scroll أفقي
...
النتيجة: 0 من 8
~~~

الـ scroll اختفى فعلًا، بس الـ ٨ أجزاء لسه بايظين: الصورة مقصوصة، والإيميل نصه مش باين، وآخر عمود في الجدول اختفى. والـ [[overflow]] على الـ body كمان بيخلي الـ body scroll container، فأي [[position: sticky]] جواه بيبطل يلزق في الشاشة (التمرين الأول في الدرس اللي بعده). الفحص مش بيتضحك عليه لأنه بيقيس كل جزء على حدوده هو، مش الصفحة كلها.

### بعد التصليح

~~~text Chrome على 360 (وعلى 1200 نفس النتيجة)
الصفحة: عرض الشاشة 360 وعرض المحتوى 360 ← مفيش scroll أفقي
PASS s1 ١ صورة المنتج
PASS s2 ٢ إيميل الدعم
PASS s3 ٣ جدول الطلبات
PASS s4 ٤ أزرار الفلتر
PASS s5 ٥ الهيرو
PASS s6 ٦ كروت المميزات
PASS s7 ٧ كود الـ API
PASS s8 ٨ صف المنتج
النتيجة: 8 من 8
~~~

---

## الخطوات اللي بتحل بيها أي صفحة بتفيض

| الخطوة | بتعمل إيه |
|---|---|
| Device Toolbar على 360 (و 320 لو عايز تتأكد) | الموبايلات الصغيرة لسه موجودة، وعرض 320 بيكشف حاجات 360 بيعدّيها |
| الكود اللي في المثال | بيديك أول عنصر طالع في ثانية، ومعاه إطار أحمر تشوفه |
| اسأل «ليه أعرض من مكانه؟» | عرض ثابت؟ كلمة طويلة؟ nowrap؟ min-width بتاع flex؟ minmax؟ |
| صلّح العنصر ده بس | مش [[overflow: hidden]] على الأب اللي فوقه |
| الفحص الذاتي | بيتأكد إن الجزء كله سليم، وإن الحيلة مش مستخبية |
| جرّب على ويندوز بشريط scroll عادي | عشان [[100vw]] اللي headless مبيشوفهوش |

## خلاصة

- في العربي الفيضان ناحية الشمال: دوّر على [[left < 0]] كمان.
- [[max-width: 100%]] للصور، و [[overflow-wrap: anywhere]] للكلام الطويل، و [[overflow-x: auto]] للجداول والكود، و [[flex-wrap]] للصفوف، و [[min(…, 100%)]] جوه [[minmax]]، و [[min-width: 0]] لعناصر الـ flex.
- [[100vw]] مش عرض الصفحة: فيه شريط الـ scroll.
- [[overflow-x: hidden]] على الـ body بيخبي المشكلة وبيكسر الـ sticky. لو مضطر استخدم [[overflow-x: clip]] على الجزء نفسه بس.`,
          try: R`انسخ الصفحة البايظة من «الحل» (الجزء اللي قبل التصليح)، وافتحها على 360 في Device Toolbar، وشغّل الكود اللي في المثال وبعده الفحص الذاتي. صلّح الأجزاء التمانية واحد واحد، وبعد كل تصليح شغّل الفحص تاني لحد ما يطلع [[النتيجة: 8 من 8]] والصفحة 360 = 360. وجرّب حيلة [[overflow-x: hidden]] مرة عشان تشوف الفحص بيكشفها.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة [[dir="rtl"]] فيها صورة [[width="600"]] على شاشة 360. الكود ده هيلاقيها؟ [[[...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > innerWidth)]]. اكتب إجابتك وبعدين جرّب.`, done: R`كتبت «لأ» قبل التجربة لأن في RTL الصورة بتبدأ من اليمين وآخرها جوه الشاشة وأولها بالسالب، والكود رجّع array فاضية فعلًا، ولما زوّدت [[|| r.left < 0]] لقاها.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كارت فيه [[display: flex]]: أيقونة، و [[<h3>]] فيه اسم ملف طويل من غير مسافات ([[تقرير_المبيعات_الشهري_النهائي_بعد_التعديل.xlsx]])، وزرار «تحميل». على 360 الزرار طالع برا. صلّحه من غير ما تخلي الاسم يتقص بـ [[...]].`, done: R`الفحص الذاتي على الكارت PASS، والاسم بيتكسر على سطرين جوه الكارت، والزرار جوه الشاشة. والتصليح [[min-width: 0]] على الـ h3 (أو على الـ wrapper بتاعه) و [[overflow-wrap: anywhere]]، ومكتوب ليه [[min-width: 0]] لوحدها مش كفاية (الكلمة لسه مبتتكسرش).` },
            { lvl: 'تطبيق', t: R`**ابني:** حوّل الكود اللي في المثال لـ bookmarklet: لينك [[javascript:]] في شريط العلامات بيحط الإطار الأحمر، ولو دوست تاني بيشيله.`, done: R`على الصفحة البايظة بيعلّم الصورة والجدول والأزرار، وعلى السليمة مبيعلّمش حاجة برا [[.table-wrap]]، والدوسة التانية بترجّع كل [[outline]] زي ما كان (مش بتشيل outline العنصر الأصلي لو كان ليه).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN اعرف الفرق بين [[overflow: hidden]] و [[overflow: clip]]: أنهي واحد بيعمل scroll container؟ وأنهي واحد بيسمح بـ [[overflow-clip-margin]]؟ وجرّب الاتنين على أب جواه [[position: sticky]].`, done: R`مكتوب إن [[hidden]] بيعمل scroll container (الـ sticky بيلزق جواه ومش في الشاشة، والعنصر لسه بيتعمله scroll بـ JS)، و [[clip]] مش بيعمل (الـ sticky شغال)، وإن [[overflow-clip-margin]] مع [[clip]] بس، والتجربة على الـ sticky طلّعت نفس الكلام.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** شغّل الفحص الذاتي بـ Playwright على 320 و 360 و 414 و 768 و 1024 و 1440، واطبع جدول: العرض، وعدد الأجزاء اللي عدّت، و [[scrollWidth]]. ويقع (exit code 1) لو أي عرض فيه FAIL.`, done: R`[[node matrix.mjs]] على الصفحة السليمة بيطبع ٦ صفوف كلها [[8 من 8]] وبيخرج بـ 0، وعلى البايظة بيطبع الأرقام الحقيقية وبيخرج بـ 1، ومكتوب جنبه إن headless مش بيشوف باج [[100vw]] وإزاي تتأكد منه (Chrome عادي على ويندوز).` },
          ],
          deep: {
            why: R`الموبايل أغلب الزيارات في أي موقع عربي، والـ scroll الأفقي أول حاجة اليوزر بيحسها: الصفحة بتتحرك تحت صباعه وكأنها «مكسورة». وحلها بالتخمين (شيل CSS لحد ما يتصلح) بياخد ساعة ويكسر حاجات تانية، وحلها بالقياس بياخد دقيقة.`,
            how: R`أي box بياخد عرضه من واحد من تلاتة: عرض أبوه (الـ block العادي)، أو قيمة ثابتة كتبتها (أو attribute زي [[width="600"]])، أو أقل عرض لمحتواه (min-content). الفيضان بيحصل لما التاني أو التالت أكبر من الأول. الكلام بيتكسر عند فرص الكسر بس (المسافات، وبعد [[-]] في بعض الحالات)، فكلمة طويلة من غير فرص min-content بتاعها عرضها كلها، و [[overflow-wrap: anywhere]] بيضيف فرص كسر في أي حرف ويخلي الـ min-content صغير. عناصر الـ flex والـ grid عندها [[min-width: auto]] يعني «مش أقل من min-content»، فـ [[min-width: 0]] بيلغي الحد ده. والجداول بتحسب عرضها من خلاياها ومبتصغرش، فالحل الوحيد حاوية بتعمل scroll. والصفحة في الآخر بتعمل scroll أفقي لما [[scrollWidth]] بتاع [[<html>]] يبقى أكبر من [[clientWidth]].`,
            when: R`افحص على 360 بعد أي section جديد، وقبل أي نشر، وكل ما تضيف محتوى من برا (إيميلات، ولينكات، وأسماء ملفات، وجداول من API). ولما المحتوى جاي من يوزر (تعليقات، وأسماء) خلي [[overflow-wrap: anywhere]] على حاوية الكلام من الأول. و [[overflow-x: clip]] على جزء معين بس لما يكون فيه ديكور مقصود يطلع برا (دواير خلفية مثلًا)، مش على الـ body.`,
            mistakes: R`[[overflow-x: hidden]] على [[html, body]] كحل نهائي. أو تدوّر على [[right > innerWidth]] بس في صفحة عربي. أو تستخدم [[word-break: break-all]] على كل الكلام فيتكسر الكلام العربي والإنجليزي العادي في نص الكلمة (الـ [[overflow-wrap: anywhere]] بيكسر لما يضطر بس). أو [[width: 100vw]] عشان «الهيرو ياخد الشاشة كلها». أو تختبر في headless بس فتفوتك مشكلة الـ scrollbar. أو تحط [[max-width: 100%]] على الصورة وتنسى [[height: auto]] فالصورة تتمط بالطول. أو تقيس على 1200 وتفتكر إن «الموبايل هيبقى زيه».`,
          },
          sol: R`تحت الصفحة البايظة كاملة، وبعدها سطور التصليح التمانية. الصفحة البايظة طلّعت [[0 من 8]] وعرض محتوى 793px على 360، ونفس الصفحة بعد ما زوّدت السطور التمانية في آخر الـ [[<style>]] طلّعت [[8 من 8]] و 360 = 360 على 360 وعلى 1200.

السطور التمانية بالترتيب: [[img { max-width: 100%; height: auto; }]]، و [[p { overflow-wrap: anywhere; }]]، و [[.table-wrap { overflow-x: auto; }]]، و [[.chips { flex-wrap: wrap; }]]، و [[.hero { width: auto; }]]، و [[.features { grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); }]]، و [[pre { overflow-x: auto; }]]، و [[.name { min-width: 0; overflow-wrap: anywhere; }]].`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر الورد</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; }
section { padding: 16px; border-bottom: 1px solid #ddd; }
td, th { padding: 8px 16px; white-space: nowrap; border: 1px solid #ccc; }
.chips { display: flex; gap: 8px; }
.chips button { padding: 8px 20px; }
.hero { width: 100vw; padding: 40px 24px; background: #fce7f3; font-size: 28px; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 12px; }
.f { padding: 16px; background: #ecfccb; }
pre { background: #0f172a; color: #e2e8f0; padding: 12px; }
.row { display: flex; align-items: center; gap: 8px; }
.name { font-weight: 600; }
/* التصليح: السطور دي بتتزاد في الآخر، والصفحة من غيرها هي البايظة */
img { max-width: 100%; height: auto; }
p { overflow-wrap: anywhere; }
.table-wrap { overflow-x: auto; }
.chips { flex-wrap: wrap; }
.hero { width: auto; }
.features { grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); }
pre { overflow-x: auto; }
.name { min-width: 0; overflow-wrap: anywhere; }
</style>
</head>
<body>
<section id="s1"><h2>١ صورة المنتج</h2><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='600' height='300' fill='%2393c5fd'/%3E%3C/svg%3E" width="600" height="300" alt="كوباية قهوة على ترابيزة خشب"></section>
<section id="s2"><h2>٢ إيميل الدعم</h2><p>ابعتلنا على customer.support.orders.team@flowershopexample.com وكود الخصم بتاعك WELCOMEFLOWERSHOPSPRING2026</p></section>
<section id="s3"><h2>٣ جدول الطلبات</h2><div class="table-wrap"><table><tr><th>رقم الطلب</th><th>العميل</th><th>المنتج</th><th>الكمية</th><th>السعر</th><th>الحالة</th></tr><tr><td>1042</td><td>سارة منير</td><td>بوكيه ورد بلدي</td><td>2</td><td>450 ج.م.</td><td>اتشحن</td></tr></table></div></section>
<section id="s4"><h2>٤ أزرار الفلتر</h2><div class="chips"><button>الكل</button><button>ورد</button><button>نباتات</button><button>هدايا</button><button>عروض</button><button>جديد</button></div></section>
<section id="s5"><h2>٥ الهيرو</h2><div class="hero">أحلى ورد في المدينة</div></section>
<section id="s6"><h2>٦ كروت المميزات</h2><div class="features"><div class="f">توصيل في نفس اليوم</div><div class="f">تغليف هدايا</div><div class="f">دفع عند الاستلام</div></div></section>
<section id="s7"><h2>٧ كود الـ API</h2><pre><code>fetch("https://flower-shop-example.com/api/v2/orders?status=shipped&amp;limit=50").then(r =&gt; r.json())</code></pre></section>
<section id="s8"><h2>٨ صف المنتج</h2><div class="row"><span class="ico">🌹</span><span class="name">بوكيه_ورد_بلدي_أحمر_كبير_مع_كارت_إهداء_مكتوب_بخط_اليد</span><button>أضف</button></div></section>
</body>
</html>`,
          flag: "script",
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import fs from "node:fs";
fs.writeFileSync("bad.css", ".hero { width: 100vw; }\n.chips { display: flex; gap: 8px; }\n.features { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }\n.box { width: 600px; }\ntd { white-space: nowrap; }\n");
fs.writeFileSync("good.css", ".hero { width: auto; }\n.chips { display: flex; flex-wrap: wrap; }\n.features { grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); }\n.box { width: min(600px, 100%); }\n.table-wrap { overflow-x: auto; }\n");
const PHONE = 360;
function risks(css) {
  const out = [];
  css.split("\n").forEach((line, i) => {
    const at = "line " + (i + 1) + ": ";
    if (/\b100vw\b/.test(line)) out.push(at + "100vw is wider than the page when a scrollbar exists");
    const w = /(?:^|[\s;{])(?:min-)?width:\s*(\d+)px/.exec(line);
    if (w && +w[1] > PHONE) out.push(at + "fixed width " + w[1] + "px > " + PHONE);
    const mm = /minmax\((\d+)px/.exec(line);
    if (mm && +mm[1] > PHONE - 32) out.push(at + "minmax(" + mm[1] + "px) without min(): one column still overflows");
    if (/white-space:\s*nowrap/.test(line)) out.push(at + "nowrap: make sure the parent scrolls (overflow-x: auto)");
  });
  return out;
}
for (const f of ["bad.css", "good.css"]) { const r = risks(fs.readFileSync(f, "utf8")); console.log(f + ": " + r.length + " risks"); r.forEach(x => console.log("  " + x)); }`, expect: [R`bad.css: 4 risks`, R`line 1: 100vw is wider than the page when a scrollbar exists`, R`line 3: minmax(340px) without min(): one column still overflows`, R`line 4: fixed width 600px > 360`, R`good.css: 0 risks`] },
          ],
        },
        {
          cmd: "صلّح الكود البايظ",
          title: "١٠ أخطاء CSS حقيقية: الـ sticky والمودال تحت الهيدر و 100vh و margin-left في العربي",
          learn: R`تمشي من العَرَض («الفهرس مش بيلزق») للقاعدة اللي عاملاه بترتيب ثابت في DevTools، وتصلّح السبب بأقل تغيير، وتثبت إنه اتصلّح بالقياس.`,
          out: R`صفحة فيها ١٠ أخطاء بتعدّي من [[0 من 11]] لـ [[11 من 11]] على 360 وعلى 1200، ومعاها linter صغير بـ Node بيلقط ٧ منهم من ملف الـ CSS قبل ما تفتح المتصفح.`,
          use: {
            prog: R`الأخطاء دي مش أخطاء كتابة: الكود «شغال» ومفيش error في أي حتة. العيب في فهم قاعدة من قواعد CSS (scroll container، و stacking context، و logical direction)، وعشان كده بتتكرر لحد ما تفهم القاعدة.`,
            work: R`كل واحد من العشرة اتلقى في مواقع حقيقية اتبنت بـ HTML و CSS أو Tailwind (والأسماء هنا متخيلة): [[overflow-x: hidden]] على الـ body كسر الـ sticky header، ومودال ورا الهيدر رغم [[z-index: 9999]]، و [[group-hover]] من غير [[group]]، و [[!important]] بالمئات، وعنوان عربي متقطع بـ [[letter-spacing]].`,
            cs: R`الـ stacking context شجرة: العنصر مبيتقارنش بالـ z-index بتاعه غير مع إخواته جوه نفس الـ context، فـ 9999 جوه context قيمته 0 أقل من 10 برا. والـ sticky بيلزق في أقرب scroll container فوقه، وده بحث لفوق في الشجرة (ancestor walk).`,
          },
          desc: R`كل خطأ هنا ليه **عَرَض** بتشوفه، و **سبب** في قاعدة واحدة، و **تصليح** بسطر أو اتنين. والمهم الترتيب اللي بتدوّر بيه، مش إنك تحفظ العشرة:

1. شوف العَرَض بعينك، وقيسه برقم (الفحص الذاتي بيعمل ده).
2. افتح Elements › Styles على العنصر: القواعد المشطوبة هي اللي خسرت، واللي فوقها هي اللي كسبت.
3. افتح Computed: القيمة النهائية، ودوس على السهم جنبها يوديك للقاعدة.
4. لو العيب في العلاقة بين عنصرين (sticky، أو z-index، أو group-hover) اطلع لفوق في الشجرة ودوّر على الأب اللي بيغيّر القاعدة.
5. صلّح السبب، وقيس تاني.

الأخطاء العشرة: sticky مات بسبب [[overflow]] على أب، وشارة بـ [[right]] في صفحة بلغتين، ومسافة أيقونة بـ [[margin-left]]، وتنبيه تحت الهيدر بسبب [[transform]] من أنيميشن، و [[group-hover]] من غير [[group]]، وهيرو [[height: 100vh]]، و [[outline: none]] من غير بديل، و [[letter-spacing]] سالب على العربي، و [[!important]] بيمنع زرار المسح يبقى أحمر، وصورة من غير [[width]] و [[height]]. ده تطبيق على دروس «sticky و fixed» و «z-index» و «logical properties» و «group و peer» و «dvh» و «focus-visible» و «CLS» في التاب ده.`,
          example: R`.layout { overflow-x: hidden; }
.badge { right: 8px; }
.btn svg { margin-left: 8px; }
.hero { height: 100vh; }
.btn-plain:focus { outline: none; }
.title { letter-spacing: -0.03em; }
.btn { background: #2563eb !important; }
.btn-danger { background: #dc2626; }`,
          lines: [
            R`حد حطه عشان «يمنع scroll أفقي». بس [[overflow]] بأي قيمة غير [[visible]] و [[clip]] بيخلي العنصر scroll container، والفهرس الـ sticky جواه بقى بيلزق في [[.layout]] مش في الشاشة.`,
            R`الشارة في الركن اليمين دايمًا. في الكارت الإنجليزي ده «النهاية» صح، وفي العربي «النهاية» هي الشمال، فالشارة بقت في البداية غلط.`,
            R`المسافة على شمال الأيقونة. في العربي الأيقونة يمين والكلام شمالها فالمسافة في مكانها، وفي الإنجليزي الأيقونة شمال فالمسافة بقت برا والكلام لازق فيها.`,
            R`ارتفاع ثابت بطول الشاشة. على الموبايل [[100vh]] أطول من الجزء الظاهر (شريط العنوان)، ولما الكلام يكتر بيتقص لأن الارتفاع ثابت.`,
            R`شال حلقة الـ focus عشان «شكلها وحش» لما تدوس بالماوس، ومحطش بديل لـ [[:focus-visible]]، فاللي بيتنقل بـ Tab مش عارف هو فين.`,
            R`تباعد سالب بين الحروف عشان العنوان «يبقى شيك» زي التصميم الإنجليزي. في العربي الحروف متوصلة، والتباعد بيقطع الوصلة بينهم.`,
            R`لون الزرار الأساسي بـ [[!important]]، فأي قاعدة بعده (حتى لو أتقل) مش هتغيّر الخلفية إلا بـ [[!important]] تاني.`,
            R`زرار المسح المفروض أحمر، والقاعدة صح ومكتوبة بعد اللي فوقها، بس بتخسر قصاد الـ [[!important]] فالزرار فاضل أزرق.`,
          ],
          teach: R`## الفكرة في سطر

**العَرَض مش السبب.** «الفهرس مش بيلزق» عَرَض، و «أب عليه [[overflow]]» سبب. دوّر بالترتيب: قيس، و Styles، و Computed، واطلع في الشجرة لفوق. وكل الأرقام تحت من Chrome بـ Playwright على ويندوز ١١ على 360 × 640 و 1200.

---

## الأخطاء العشرة: العَرَض والسبب والتصليح

الصفحة: «متجر الورد» (متخيل)، [[lang="ar" dir="rtl"]]، كل خطأ في [[<section id="b1">]] لحد [[b10]]. الـ CSS البايظ هو اللي في المثال فوق، وفي HTML تلات حاجات بايظة كمان: اللينك [[.card-link]] من غير [[group]]، والتنبيه [[.alert]] جوه [[.page]] المتحرك، والصورة [[.banner]] من غير [[width]] و [[height]].

| # | العَرَض | بتدوّر فين | السبب | التصليح | اللي رفضناه وليه |
|---|---|---|---|---|---|
| ١ | الفهرس بيطلع مع الـ scroll | اطلع من [[.toc]] لفوق في Elements، وشوف Computed › overflow لكل أب | [[.layout { overflow-x: hidden }]] عامل scroll container | [[overflow-x: clip]] (بيقص من غير scroll container) | شيل الـ overflow خالص: لو كان حاطه عشان عنصر بيفيض، الفيضان هيرجع |
| ٢ | شارة «جديد» في الركن الغلط في العربي | Computed › right على الشارة في الكارتين | [[right]] اتجاه فيزيائي ثابت | [[inset-inline-end: 8px]] | [[[dir=rtl] .badge { left: 8px; right: auto }]]: قاعدتين لكل حاجة، وأول ما تنسى واحدة تبوظ |
| ٣ | «Save» لازقة في الأيقونة | Box model بتاع الـ svg في الزرار الإنجليزي | [[margin-left]] على الـ svg | [[gap: 8px]] على الزرار (هو [[inline-flex]] أصلًا) | [[margin-inline-end]]: سليم برضه، بس [[gap]] بيشتغل لو الأيقونة اتنقلت بعد الكلام |
| ٤ | التنبيه ورا الهيدر رغم [[z-index: 9999]] | اطلع من [[.alert]] لفوق ودوّر على transform أو opacity أو filter | أنيميشن [[rise]] بـ [[both]] ساب [[transform]] على [[.page]]، فبقى stacking context قيمته صفر | التنبيه في الـ top layer: [[popover="manual"]] و [[showPopover()]] | [[z-index: 99999]] على التنبيه: مش هيفرق، هو محبوس جوه [[.page]] |
| ٥ | السهم مبيتحركش مع الـ hover | ابحث في Elements (Ctrl+F) عن [[group]] في آباء السهم | [[.group:hover .group-hover\:...]] محتاج أب عليه [[class="group"]] | زوّد [[group]] على [[.card-link]] | تكتب [[.card-link:hover .arrow]] بإيدك: بتلف حوالين الأداة بدل ما تستخدمها صح |
| ٦ | الكلام في الهيرو مقصوص على الموبايل | Computed › height على [[.hero]] مقابل [[scrollHeight]] | [[height: 100vh]] ثابت، و [[100vh]] على الموبايل أطول من الظاهر | [[min-height: 100dvh]] | [[height: 100dvh]]: الطول الصح بس لسه بيقص الكلام الكتير |
| ٧ | مش باين انت فين لما تدوس Tab | Styles على الزرار وفعّل [[:focus-visible]] من زرار [[:hov]] | [[outline: none]] على [[:focus]] من غير بديل | سيبها، وزوّد [[:focus-visible { outline: 3px solid }]] | تشيل [[outline: none]] خالص: الحلقة هتظهر مع الماوس كمان، والتصميم ممكن يرفضها |
| ٨ | العنوان العربي حروفه منفصلة | Computed › letter-spacing على [[.title]] | [[letter-spacing: -0.03em]] على كل اللغات | [[.title:lang(en) { letter-spacing: -0.03em }]] | [[!important]] بصفر للعربي: حرب تانية |
| ٩ | زرار المسح أزرق | Styles على [[.btn-danger]]: قاعدته مشطوبة | [[.btn { background: ... !important }]] | امسح الـ [[!important]] (الترتيب لوحده كفاية) | [[.btn-danger { background: red !important }]]: كده كل variant جديد محتاج [[!important]] |
| ١٠ | الصفحة بتتزق لتحت لما الصورة تحمّل | Performance › Layout Shifts، أو Computed › aspect-ratio | [[<img>]] من غير [[width]] و [[height]]: المتصفح مش عارف طولها | [[width="800" height="400"]] على الصورة | [[height: 400px]] في CSS: بيبوظ الصورة على الموبايل (الصح [[height: auto]] مع الـ attributes) |

> **١٠٠vh على الموبايل:** إن [[100vh]] بيتحسب على أكبر ارتفاع للشاشة (لما شريط العنوان يختفي)، فبيبقى أطول من اللي ظاهر أول ما الصفحة تفتح، ده من الوثائق (web.dev و MDN في صفحات [[dvh]] و [[svh]]). محاكاة الموبايل في Chrome DevTools مش بتعرض شريط عنوان، فـ [[100vh]] و [[100dvh]] بيطلعوا نفس الرقم هناك، والفرق بيبان على موبايل حقيقي بس. عشان كده الفحص بيقيس حاجتين: الكلام مقصوص ولا لأ (ده بيتقاس في أي مكان)، والقاعدة فيها [[100vh]] ولا لأ.

> **ليه ٤ بالذات صعب:** [[z-index]] بيتقارن جوه الـ stacking context بس. والـ context بيتعمل من حاجات مالهاش علاقة بالـ z-index: [[transform]] غير [[none]]، و [[opacity]] أقل من 1، و [[filter]]، و [[isolation: isolate]]، و [[position]] مع [[z-index]] رقم. الأنيميشن هنا [[animation: rise .3s both]]: الـ [[both]] بيسيب آخر frame ([[translateY(0)]]) متطبق على طول، و [[translateY(0)]] لسه [[transform]] غير [[none]].

---

## الفحص الذاتي

الفحص بيعمل حاجتين ممكن تستغربهم: بيعمل [[scrollTo]] للصفحة عشان يجرّب الـ sticky بجد ويرجّعها مكانها، وبيستخدم [[document.elementFromPoint(x, y)]] عشان يسأل المتصفح «مين ظاهر فوق في النقطة دي؟»، وده نفس اللي إيدك هتدوس عليه.

~~~js الفحص الذاتي: الأخطاء العشرة
(() => {
  const q = s => document.querySelector(s), R = el => el.getBoundingClientRect(), cs = el => getComputedStyle(el);
  const near = (a, b) => Math.abs(a - b) <= 1.5;
  const rules = []; for (const sh of document.styleSheets) { try { rules.push(...[...sh.cssRules].filter(r => r.selectorText)); } catch (e) {} }
  const rulesFor = (el, clean) => rules.filter(r => { try { return el.matches(clean ? r.selectorText.replace(/:focus(-visible|-within)?/g, '') : r.selectorText); } catch (e) { return false; } });
  let pass = 0, all = 0;
  const ok = (name, cond, why) => { all++; if (cond) pass++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : ' ← ' + why)); };
  const y0 = scrollY, toc = q('.toc'), lay = q('.layout');
  scrollTo(0, lay.offsetTop + 300);
  const stuck = near(R(toc).top, 0);
  let culprit = ''; for (let p = toc.parentElement; p; p = p.parentElement) if (/hidden|auto|scroll/.test(cs(p).overflowX + cs(p).overflowY)) { culprit = p.className || p.tagName; break; }
  scrollTo(0, y0);
  ok('1 الفهرس بيلزق فوق', stuck, 'بعد scroll الفهرس مش عند top: 0' + (culprit ? '، وفيه أب عامل overflow: «' + culprit + '» (ده بيبقى scroll container والـ sticky بيلزق جواه)' : ''));
  const [rc, lc] = document.querySelectorAll('.pcard'), rb = R(rc.querySelector('.badge')), lb = R(lc.querySelector('.badge'));
  ok('2 الشارة في ركن النهاية في اللغتين', near(rb.left, R(rc).left + 8) && near(lb.right, R(lc).right - 8), 'في العربي لازم شمال وفي الإنجليزي يمين: right ثابتة مبتتقلبش، استخدم inset-inline-end');
  const gaps = [...document.querySelectorAll('#b3 .btn')].map(b => { const i = R(b.querySelector('svg')), t = R(b.querySelector('span')); return Math.round(i.left > t.left ? i.left - t.right : t.left - i.right); });
  ok('3 مسافة الأيقونة 8px في اللغتين', gaps.every(g => g >= 7 && g <= 9), 'المسافة بين الأيقونة والكلام: ' + gaps.join(' و ') + 'px (عربي ثم إنجليزي)');
  const al = q('.alert'); al.scrollIntoView({ block: 'center' });
  const ar = R(al), hit = document.elementFromPoint(ar.left + ar.width / 2, ar.top + 4);
  let ctx = ''; for (let p = al.parentElement; p; p = p.parentElement) { const s = cs(p); const why = s.transform !== 'none' ? 'transform' : s.filter !== 'none' ? 'filter' : +s.opacity < 1 ? 'opacity' : s.zIndex !== 'auto' && s.position !== 'static' ? 'z-index' : ''; if (why) { ctx = (p.className || p.tagName) + ' (عليه ' + why + ')'; break; } }
  ok('4 التنبيه فوق الهيدر', hit && al.contains(hit), 'في النقطة دي ظاهر «' + (hit ? hit.className || hit.tagName : '؟') + '» مش التنبيه' + (ctx ? '، والتنبيه محبوس في stacking context بتاع ' + ctx : ''));
  scrollTo(0, y0);
  const orphans = [...document.querySelectorAll('[class*="group-hover:"]')].filter(el => !el.parentElement.closest('.group'));
  ok('5 group-hover ليه group', !orphans.length, orphans.length + ' عنصر عليه group-hover: ومفيش أب عليه class="group"، فالـ selector عمره ما بيتطابق');
  const hero = q('.hero'), vh = rulesFor(hero).filter(r => /(^|[^d])100vh/.test(r.style.cssText) && /height/.test(r.style.cssText));
  ok('6 الهيرو: المحتوى مش مقصوص', hero.scrollHeight <= hero.clientHeight + 1, 'المحتوى ' + hero.scrollHeight + 'px والهيرو ' + hero.clientHeight + 'px: height ثابت بيقص، استخدم min-height');
  ok('6 الهيرو: مش 100vh', !vh.length, vh.map(r => r.selectorText + ' { ' + r.style.cssText + ' }').join(' ') + ': على الموبايل 100vh أطول من الجزء الظاهر، استخدم 100dvh أو 100svh');
  const bp = q('.btn-plain'), killed = rulesFor(bp, true).some(r => /:focus\b/.test(r.selectorText) && /outline: (none|0)/.test(r.style.cssText));
  const ring = rulesFor(bp, true).some(r => /:focus-visible/.test(r.selectorText) && /outline: [^n0]|box-shadow/.test(r.style.cssText));
  ok('7 الـ focus باين بالكيبورد', !killed || ring, 'فيه outline: none على :focus ومفيش بديل على :focus-visible، فاللي بيستخدم Tab مش شايف هو فين');
  const ls = [...document.querySelectorAll('body *')].filter(el => /[؀-ۿ]/.test(el.textContent) && el.closest('[lang]').lang.startsWith('ar') && !['normal', '0px'].includes(cs(el).letterSpacing));
  ok('8 مفيش letter-spacing على العربي', !ls.length, ls.map(el => el.tagName.toLowerCase() + '.' + el.className + ' = ' + cs(el).letterSpacing).join(' و ') + ': التباعد بيقطع وصل الحروف العربي');
  const d = q('.btn-danger'), imp = rulesFor(d).filter(r => /!important/.test(r.style.cssText)).map(r => r.selectorText);
  ok('9 زرار المسح أحمر', cs(d).backgroundColor === 'rgb(220, 38, 38)', 'لونه ' + cs(d).backgroundColor + (imp.length ? '، لأن ' + imp.join(' و ') + ' فيه !important' : ''));
  const imgs = [...document.querySelectorAll('img')].filter(i => cs(i).aspectRatio === 'auto');
  ok('10 الصور حاجزة مكانها', !imgs.length, imgs.length + ' صورة من غير width و height (ولا aspect-ratio)، فالمتصفح مش عارف ارتفاعها لحد ما تحمّل والصفحة بتتزق (CLS)');
  console.log('النتيجة: ' + pass + ' من ' + all);
})();
~~~

### على الصفحة البايظة (360 × 640)

~~~text Chrome على 360، قبل التصليح
FAIL 1 الفهرس بيلزق فوق ← بعد scroll الفهرس مش عند top: 0، وفيه أب عامل overflow: «layout» (ده بيبقى scroll container والـ sticky بيلزق جواه)
FAIL 2 الشارة في ركن النهاية في اللغتين ← في العربي لازم شمال وفي الإنجليزي يمين: right ثابتة مبتتقلبش، استخدم inset-inline-end
FAIL 3 مسافة الأيقونة 8px في اللغتين ← المسافة بين الأيقونة والكلام: 8 و 0px (عربي ثم إنجليزي)
FAIL 4 التنبيه فوق الهيدر ← في النقطة دي ظاهر «site-head» مش التنبيه، والتنبيه محبوس في stacking context بتاع page (عليه transform)
FAIL 5 group-hover ليه group ← 1 عنصر عليه group-hover: ومفيش أب عليه class="group"، فالـ selector عمره ما بيتطابق
FAIL 6 الهيرو: المحتوى مش مقصوص ← المحتوى 814px والهيرو 640px: height ثابت بيقص، استخدم min-height
FAIL 6 الهيرو: مش 100vh ← .hero { height: 100vh; }: على الموبايل 100vh أطول من الجزء الظاهر، استخدم 100dvh أو 100svh
FAIL 7 الـ focus باين بالكيبورد ← فيه outline: none على :focus ومفيش بديل على :focus-visible، فاللي بيستخدم Tab مش شايف هو فين
FAIL 8 مفيش letter-spacing على العربي ← h1.title = -1.2px: التباعد بيقطع وصل الحروف العربي
FAIL 9 زرار المسح أحمر ← لونه rgb(37, 99, 235)، لأن .btn فيه !important
FAIL 10 الصور حاجزة مكانها ← 1 صورة من غير width و height (ولا aspect-ratio)، فالمتصفح مش عارف ارتفاعها لحد ما تحمّل والصفحة بتتزق (CLS)
النتيجة: 0 من 11
~~~

وعلى 1200 نفس الصفحة البايظة طلّعت [[1 من 11]]: «الهيرو: المحتوى مش مقصوص» عدّى، لأن الشاشة العريضة الكلام فيها بياخد سطور أقل وبيدخل في الـ 800px. يعني الغلطة دي **مش بتبان غير على الموبايل**، والـ [[-1.2px]] في ٨ هي [[-0.03em]] × 40px (حجم الخط).

### بعد التصليح

~~~text Chrome على 360 وعلى 1200، الحل اللي في «الحل»
PASS 1 الفهرس بيلزق فوق
PASS 2 الشارة في ركن النهاية في اللغتين
PASS 3 مسافة الأيقونة 8px في اللغتين
PASS 4 التنبيه فوق الهيدر
PASS 5 group-hover ليه group
PASS 6 الهيرو: المحتوى مش مقصوص
PASS 6 الهيرو: مش 100vh
PASS 7 الـ focus باين بالكيبورد
PASS 8 مفيش letter-spacing على العربي
PASS 9 زرار المسح أحمر
PASS 10 الصور حاجزة مكانها
النتيجة: 11 من 11
~~~

> **غلطة حصلت وانا بكتب الفحص:** أول تصليح لـ ٤ كان [[animation-fill-mode: backwards]] بدل [[both]]: بعد ما الأنيميشن يخلص الـ transform بيتشال والـ context بيختفي. والفحص طلّع FAIL برضه، لأنه اشتغل والأنيميشن لسه شغال (الـ transform كان لسه [[translateY(5.3px)]]). يعني التصليح ده بيصلّح «بعد ثانية» بس، والتنبيه ممكن يظهر في أول ثانية بالظبط. الـ top layer ([[popover]]) بيصلّح في كل لحظة، وده اللي في الحل.

---

## linter صغير قبل المتصفح

٧ من العشرة بيبانوا من ملف الـ CSS لوحده من غير ما تفتح المتصفح. الـ [[ci]] بتاع الدرس ده بيشغّل linter صغير بـ Node على الـ CSS البايظ والسليم:

~~~text node lint.mjs، Node 24.22.1
bad.css: 7 problems
  line 1: overflow makes a scroll container: a sticky child sticks inside it (try clip)
  line 2: physical side: flips wrong between Arabic and English (use inline-start/end)
  line 3: physical side: flips wrong between Arabic and English (use inline-start/end)
  line 4: height: 100vh cuts content and is taller than a phone screen (min-height: 100dvh)
  line 7: !important: the next rule can't win without another !important
  outline removed on :focus with no :focus-visible ring
  negative letter-spacing that also hits Arabic text
good.css: 0 problems
~~~

والتلاتة الباقيين (التنبيه، و group، والصورة) محتاجين HTML أو حساب المتصفح، فمبيبانوش غير بالفحص الذاتي. وفي مشروع حقيقي الـ linter ده اسمه Stylelint، و [[stylelint-use-logical]] بيلقط ٢ و ٣.

## خلاصة

- قيس العَرَض، و Styles، و Computed، واطلع في الشجرة لفوق. بالترتيب ده.
- [[overflow]] غير [[visible]] و [[clip]] = scroll container، والـ sticky بيلزق جواه.
- [[z-index]] محبوس جوه الـ stacking context، و [[transform]] و [[opacity]] و [[filter]] بيعملوا context. التنبيهات والمودالات مكانها الـ top layer ([[popover]] و [[<dialog>]]).
- في صفحة بلغتين: [[inset-inline-end]] و [[gap]] و [[margin-inline]]، مش [[left]] و [[right]].
- [[min-height: 100dvh]] مش [[height: 100vh]]، و [[:focus-visible]] بدل ما تشيل الـ outline، و [[letter-spacing]] للإنجليزي بس.
- [[!important]] بيكسب النهارده ويخسّرك بكرة. والصور ليها [[width]] و [[height]] دايمًا.`,
          try: R`انسخ الحل من «الحل»، وارجّعه بايظ: حط الـ CSS اللي في المثال في آخر الـ [[<style>]] مكان سطور التصليح، وشيل [[group]] من [[.card-link]] و [[popover]] من [[.alert]] و [[width]] و [[height]] من [[.banner]]. شغّل الفحص على 360 (لازم [[0 من 11]])، وصلّح خطأ خطأ بالترتيب اللي في الشرح، وقبل كل تصليح اكتب السبب في سطر قبل ما تبص في الجدول.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<header style="position: sticky; top: 0">]] جوه [[<div style="overflow: auto; height: 300px">]] جوه صفحة طويلة. لما تعمل scroll للصفحة كلها (مش الـ div) الهيدر هيلزق في الشاشة؟ اكتب، وبعدين جرّب.`, done: R`كتبت «لأ» قبل التجربة، والهيدر مشي مع الصفحة فعلًا، وفهمت إنه بيلزق جوه الـ div بس لما الـ div نفسه يعمل scroll، لأن الـ div بقى أقرب scroll container ليه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مودال [[position: fixed; inset: 0; z-index: 1000]] جوه [[<main class="fade-in">]]، و [[.fade-in { animation: fade .4s forwards }]] بيغيّر [[opacity]] من 0 لـ 1، والهيدر [[position: sticky; z-index: 50]]. المودال بيظهر تحت الهيدر. لاقي السبب بـ [[getComputedStyle]] على آباء المودال، وصلّحه بـ [[<dialog>]] و [[showModal()]].`, done: R`[[getComputedStyle(main).opacity]] طلع [[1]] بعد ثانية ونص والمودال لسه تحت الهيدر، و [[document.getAnimations().length]] طلع 1: الأنيميشن بـ [[forwards]] لسه «شغال» (ماسك آخر frame)، وأنيميشن على [[opacity]] بيفضل عامل stacking context طول ما هو شغال حتى لو القيمة 1. والتصليح بـ [[<dialog>]]: [[elementFromPoint]] على مكان الهيدر رجّع الـ dialog من أول لحظة، و Escape بيقفله لوحده.` },
            { lvl: 'تطبيق', t: R`**refactor:** خد ملف CSS فيه ٥ قواعد بـ [[!important]] (زرار أساسي وتلات variants ورسالة خطأ)، وشيل كل الـ [[!important]] من غير ما ولا لون يتغير، باستخدام [[@layer base, components, utilities]].`, done: R`مفيش ولا [[!important]] في الملف، والفحص الذاتي بيقرا نفس [[backgroundColor]] لكل زرار قبل وبعد (اطبعهم في جدول)، و variant جديد بيتكتب في [[@layer components]] من غير أي حيلة ويكسب.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** زوّد على الفحص الذاتي خطأ ١١: «الـ sticky في grid من غير [[align-self: start]]». ابني الحالة الأول (sticky بيتمد بطول الصف فمبيلزقش)، واكتب الـ [[ok(...)]] اللي يلقطها برسالة بتقول السبب.`, done: R`الفحص الجديد بيقيس إن ارتفاع الـ sticky بيساوي ارتفاع أبوه (وده معناه إنه متمد ومش هيتحرك)، وبيطبع FAIL برسالة فيها [[align-self]] على الحالة البايظة و PASS بعد ما تزوّد [[align-self: start]]، والـ ١١ القديمين لسه PASS.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب ٣ سطور لزميل بيقول «حطيت z-index: 99999 ولسه تحت»: ليه الرقم مش بيفرق، وإزاي يلاقي الأب اللي حابسه في DevTools، والحل اللي مش بيعتمد على أرقام.`, done: R`الشرح فيه إن الـ z-index بيتقارن جوه الـ context بس، وإن الأب اللي عليه [[transform]] أو [[opacity]] أو [[filter]] أو [[isolation]] بيعمل context، وإنه يلاقيه من Elements › Computed على كل أب (أو Layers panel)، وإن الحل [[<dialog>]] أو [[popover]] (الـ top layer). وزميلك صلّح بيه مودال حقيقي.` },
          ],
          deep: {
            why: R`الأخطاء دي مبتطلّعش error ولا warning، والصفحة بتشتغل على جهازك، والمشكلة بتظهر عند يوزر تاني: على موبايل، أو بالكيبورد، أو بالإنجليزي، أو بعد scroll. وكل واحد منهم بيتصلّح غلط بنفس الطريقة كل مرة ([[z-index]] أكبر، و [[!important]] زيادة، و [[overflow: hidden]] على الـ body)، والتصليح الغلط بيعمل خطأ جديد. لو فهمت القاعدة اللي ورا كل واحد بتصلّحه مرة واحدة.`,
            how: R`الـ sticky بيدوّر على أقرب أب «بيعمل scroll» (أي [[overflow]] غير [[visible]] و [[clip]])، وبيلزق في حدوده هو مش الشاشة، حتى لو الأب ده عمره ما عمل scroll فعلًا. والـ stacking context شجرة: المتصفح بيرسم كل context كوحدة واحدة، وجواه بيرتب الأولاد بالـ z-index، فعنصر جوه context بـ z-index صفر مبيعدّيش عنصر برا بـ 10 مهما كان رقمه. والـ top layer ([[<dialog>]] و [[popover]] و fullscreen) طبقة فوق كل الـ contexts، والمتصفح بيرسمها في الآخر. و [[right]] و [[left]] اتجاهات شاشة، و [[inline-start]] و [[inline-end]] اتجاهات كتابة بتتقلب مع [[dir]]. و [[!important]] بيعمل طبقة أعلى في الـ cascade، فالـ specificity والترتيب مبقوش يفرقوا قصاده. والصورة من غير أبعاد مقاسها صفر لحد ما الملف يوصل، والـ [[width]] و [[height]] بيدوا المتصفح النسبة ([[aspect-ratio: auto 800 / 400]] في Computed) فيحجز المكان من الأول.`,
            when: R`استخدم الترتيب ده (قيس، و Styles، و Computed، والشجرة) مع أي «الـ CSS مش شغال». وشغّل الـ linter (أو Stylelint بالـ plugins دي) في الـ CI عشان ٢ و ٣ و ٦ و ٩ ميرجعوش. والـ top layer لأي حاجة لازم تبان فوق كل حاجة: مودال، و toast، وقايمة منسدلة جوه جدول عليه [[overflow]]. و [[overflow-x: clip]] لما محتاج تقص من غير ما تكسر الـ sticky.`,
            mistakes: R`تزوّد [[z-index]] بدل ما تدوّر على الـ context. أو تصلّح الـ sticky بإنك تشيله وتعمله [[position: fixed]] فيغطي المحتوى. أو تحط [[[dir=rtl]]] overrides لكل [[left]] و [[right]] في المشروع بدل logical properties. أو تكتب [[group-hover]] في Tailwind وتنسى [[group]]، أو تحط [[group]] على أب بعيد فكل الكروت بتتحرك مع بعض. أو تحط [[height: 100dvh]] بدل [[min-height]] فالكلام لسه بيتقص. أو تشيل [[outline]] عشان «المصمم عايز كده». أو تصلّح بـ [[animation-fill-mode]] وتختبر بعد ما الأنيميشن يخلص فتفتكر إنه اتصلّح.`,
          },
          sol: R`الحل المرجعي تحت: الصفحة السليمة كاملة. سطور التصليح في آخر الـ [[<style>]] (من [[.layout { overflow-x: clip; }]] لحد [[.btn-danger]])، والتلات تغييرات في HTML: [[class="card-link group"]]، و [[popover="manual"]] على التنبيه مع [[showPopover()]] في آخر الصفحة، و [[width="800" height="400"]] على الصورة. الصفحة دي طلّعت [[11 من 11]] على 360 وعلى 1200.

ولاحظ إن [[.btn-plain:focus { outline: none; }]] لسه موجودة في الحل: الشيل مع الماوس مقبول، الغلط إنه ميبقاش فيه [[:focus-visible]]. وإن [[.alert[popover]]] محتاج [[inset: auto]] و [[margin: 0]] عشان المتصفح بيحط الـ popover في نص الشاشة افتراضيًا.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر الورد</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; }
section { padding: 16px; border-bottom: 1px solid #ddd; }
.layout { display: grid; grid-template-columns: 160px 1fr; gap: 16px; }
.toc { position: sticky; top: 0; align-self: start; background: #e0f2fe; padding: 8px; }
.long { height: 1500px; background: #f8fafc; }
.cards { display: flex; gap: 16px; }
.pcard { position: relative; width: 200px; height: 120px; padding: 40px 12px 0; background: #fef3c7; }
.badge { position: absolute; top: 8px; background: #be123c; color: #fff; padding: 2px 8px; }
.btn { display: inline-flex; align-items: center; padding: 8px 14px; background: #2563eb; color: #fff; border: 0; }
.site-head { position: relative; z-index: 10; height: 60px; background: #0f172a; color: #fff; padding: 16px; }
.page { position: relative; animation: rise .3s both; }
@keyframes rise { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.alert { position: absolute; top: -40px; inset-inline-start: 16px; z-index: 9999; background: #16a34a; color: #fff; padding: 8px 12px; }
.arrow { display: inline-block; transition: translate .2s; }
.group:hover .group-hover\:translate-x-1 { translate: -4px; }
.hero { background: #fce7f3; padding: 24px; overflow: hidden; }
.title { font-size: 40px; }
.banner { display: block; width: 100%; }
.layout { overflow-x: clip; }
.badge { inset-inline-end: 8px; }
.btn { gap: 8px; }
.alert[popover] { position: fixed; inset: auto; top: 8px; inset-inline-start: 16px; margin: 0; border: 0; }
.hero { min-height: 100dvh; }
.btn-plain:focus { outline: none; }
.btn-plain:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
.title:lang(en) { letter-spacing: -0.03em; }
.btn-danger { background: #dc2626; }
</style></head>
<body>
<section id="b1"><h2>١ الفهرس الـ sticky</h2>
  <div class="layout"><aside class="toc">الفهرس: المقدمة · الأسعار · الأسئلة</aside><article class="long">مقال طويل عن تنسيق الورد…</article></div></section>
<section id="b2"><h2>٢ شارة «جديد» في الركن</h2>
  <div class="cards"><div class="pcard" dir="rtl"><span class="badge">جديد</span>بوكيه ورد</div><div class="pcard" dir="ltr" lang="en"><span class="badge">New</span>Flower box</div></div></section>
<section id="b3"><h2>٣ مسافة الأيقونة في الزرار</h2>
  <button class="btn" dir="rtl"><svg width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="7"/></svg><span>حفظ</span></button>
  <button class="btn" dir="ltr" lang="en"><svg width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="7"/></svg><span>Save</span></button></section>
<section id="b4"><h2>٤ التنبيه تحت الهيدر</h2>
  <header class="site-head">هيدر الموقع</header>
  <div class="page"><div class="alert" role="alert" popover="manual">الطلب اتأكد</div><p>محتوى الصفحة</p></div></section>
<section id="b5"><h2>٥ السهم مش بيتحرك مع الـ hover</h2>
  <a href="#" class="card-link group">شوف كل العروض <span class="arrow group-hover:translate-x-1">←</span></a></section>
<section id="b6"><h2>٦ الهيرو على الموبايل</h2>
  <div class="hero"><h3>ورد طازة كل يوم</h3><p>نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل. نص طويل عن المتجر بيتكرر عشان يبان على الموبايل.</p><a href="#" class="btn">اطلب</a></div></section>
<section id="b7"><h2>٧ الـ focus اختفى</h2><button class="btn-plain">اشترك</button></section>
<section id="b8"><h2>٨ العنوان العربي متقطّع</h2><h1 class="title">عروض الربيع</h1></section>
<section id="b9"><h2>٩ زرار المسح لونه غلط</h2><button class="btn btn-danger">امسح الطلب</button></section>
<section id="b10"><h2>١٠ الصورة بتزق الصفحة</h2><img class="banner" width="800" height="400" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23fbcfe8'/%3E%3C/svg%3E" alt="بوكيه ورد أحمر على ترابيزة"></section>
<div style="height:1200px"></div>
<script>document.querySelector(".alert").showPopover();</script></body>
</html>`,
          flag: "script",
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import fs from "node:fs";
fs.writeFileSync("bad.css", ".layout { overflow-x: hidden; }\n.badge { right: 8px; }\n.btn svg { margin-left: 8px; }\n.hero { height: 100vh; }\n.btn-plain:focus { outline: none; }\n.title { letter-spacing: -0.03em; }\n.btn { background: #2563eb !important; }\n");
fs.writeFileSync("good.css", ".layout { overflow-x: clip; }\n.badge { inset-inline-end: 8px; }\n.btn { gap: 8px; }\n.hero { min-height: 100dvh; }\n.btn-plain:focus { outline: none; }\n.btn-plain:focus-visible { outline: 3px solid #2563eb; }\n.title:lang(en) { letter-spacing: -0.03em; }\n");
const RULES = [
  [/overflow(-x|-y)?:\s*(hidden|auto|scroll)/, "overflow makes a scroll container: a sticky child sticks inside it (try clip)"],
  [/(?:^|[\s;{])(left|right|margin-left|margin-right|padding-left|padding-right):/, "physical side: flips wrong between Arabic and English (use inline-start/end)"],
  [/(?:^|[\s;{])height:\s*100vh/, "height: 100vh cuts content and is taller than a phone screen (min-height: 100dvh)"],
  [/!important/, "!important: the next rule can't win without another !important"],
];
function lint(css) {
  const out = [];
  css.split("\n").forEach((line, i) => RULES.forEach(([re, msg]) => { if (re.test(line)) out.push("line " + (i + 1) + ": " + msg); }));
  if (/:focus\s*\{[^}]*outline:\s*(none|0)/.test(css) && !/:focus-visible\s*\{[^}]*(outline:\s*[1-9]|box-shadow)/.test(css)) out.push("outline removed on :focus with no :focus-visible ring");
  if (/letter-spacing:\s*-/.test(css.replace(/[^{}]*:lang\(en\)[^{]*\{[^}]*\}/g, ""))) out.push("negative letter-spacing that also hits Arabic text");
  return out;
}
for (const f of ["bad.css", "good.css"]) { const r = lint(fs.readFileSync(f, "utf8")); console.log(f + ": " + r.length + " problems"); r.forEach(x => console.log("  " + x)); }`, expect: [R`bad.css: 7 problems`, R`line 1: overflow makes a scroll container`, R`line 4: height: 100vh cuts content`, R`outline removed on :focus with no :focus-visible ring`, R`negative letter-spacing that also hits Arabic text`, R`good.css: 0 problems`] },
          ],
        },
        {
          cmd: "توقّع الـ cascade",
          title: "مين يكسب؟ ١٤ لغز بـ :is() و :where() و :has() و @layer و !important",
          learn: R`تحسب مين يكسب في أي تعارض بأربع أسئلة بالترتيب (important؟ وأنهي layer؟ والـ specificity كام؟ ومين الأخير؟) قبل ما تفتح DevTools.`,
          out: R`١٤ لغز تتوقعهم على ورقة وفحص بيقارن توقعك باللي Chrome حسبه، ودالة [[specificity()]] بتحسب (a, b, c) لأي selector وبتعدّي ١٥ اختبار.`,
          use: {
            prog: R`نص أسئلة «الـ CSS ده مش شغال» إجابتها «فيه قاعدة تانية بتكسب». لو عرفت تحسب مين يكسب من غير تجربة، بتعرف تكتب CSS بيكسب من أول مرة من غير [[!important]].`,
            work: R`مكتبات المكونات (shadcn و Tailwind و Bootstrap) كلها مبنية على القواعد دي: Tailwind v4 حاطط كل حاجة في [[@layer]]، و [[:where()]] بيتستخدم عشان الـ reset ميغلبش الـ classes بتاعتك. وسؤال «specificity بتاع ده كام؟» من أشهر أسئلة انترفيو الـ frontend.`,
            cs: R`الـ specificity رقم من ٣ خانات بيتقارن lexicographic زي الكلمات في القاموس: الخانة الأولى الأول، ولو اتساوت التانية. فـ (1, 0, 0) أكبر من (0, 99, 99). والـ parser اللي هتكتبه مثال صغير على tokenizer بيمشي على النص حرف حرف ويتعامل مع الأقواس المتداخلة.`,
          },
          desc: R`لما قاعدتين بيحطوا قيمة لنفس الخاصية على نفس العنصر، المتصفح بيسأل ٤ أسئلة **بالترتيب**، وأول سؤال فيه فرق بيحسم:

1. **important؟** القاعدة اللي عليها [[!important]] بتكسب العادية. (وجوه الـ important، ترتيب الـ layers بيتقلب.)
2. **أنهي layer؟** القواعد اللي برا أي [[@layer]] بتكسب اللي جوه. وجوه الـ layers، الـ layer اللي اتعرّف **آخر** بيكسب.
3. **الـ specificity:** (a, b, c) = عدد الـ ids، وعدد الـ classes والـ attributes والـ pseudo-classes، وعدد الـ types والـ pseudo-elements. [[:where()]] بصفر، و [[:is()]] و [[:not()]] و [[:has()]] بياخدوا أتقل حاجة جواهم.
4. **الترتيب:** لو كله متساوي، اللي مكتوب بعد في الملف بيكسب.

وقبل الأربعة دول: الـ [[style=""]] اللي على العنصر بيكسب أي قاعدة عادية، والقيمة الموروثة من الأب بتخسر قصاد أي قاعدة على العنصر نفسه حتى [[*]]. ده تطبيق على دروس «selectors» و «specificity» و «cascade» و «:has()» في التاب ده، وسؤال «(id, class, type)» في وحدة الانترفيو.`,
          example: R`p { color: red; }
.note { color: blue; }
:where(.box) .note { color: green; }
:is(.box, .x) p { color: orange; }
@layer base, theme;
@layer base { p.note { color: purple; } }
@layer theme { p { color: teal; } }`,
          lines: [
            R`specificity (0, 0, 1): type واحد. القاعدة دي أضعف واحدة من الأربعة اللي برا الـ layers.`,
            R`(0, 1, 0): class واحدة، أتقل من الـ type، فبتغلب الأحمر.`,
            R`[[:where()]] مالوش وزن، فدي (0, 1, 0) زي اللي قبلها بالظبط، ولأنها بعدها في الملف بتغلبها: الأزرق خسر قصاد الأخضر بالترتيب بس.`,
            R`[[:is(.box, .x)]] بياخد وزن أتقل واحد جواه (class)، وبعده [[p]]، فدي (0, 1, 1): أتقل من الأخضر، والبرتقاني بيكسب لحد هنا.`,
            R`بنعرّف ترتيب الـ layers: [[base]] الأول وبعده [[theme]]. الترتيب ده بيحسم بين الـ layers نفسهم.`,
            R`[[p.note]] (0, 1, 1) جوه [[base]]. نفس وزن البرتقاني، بس أي قاعدة جوه layer بتخسر قصاد أي قاعدة برا الـ layers مهما كان وزنها.`,
            R`[[p]] جوه [[theme]]. [[theme]] بيكسب [[base]] لأنه اتعرّف بعده، بس الاتنين بيخسروا قصاد البرتقاني اللي برا. والنتيجة في Chrome على [[<div class="box"><p class="note">]]: [[rgb(255, 165, 0)]] يعني برتقاني.`,
          ],
          teach: R`## الفكرة في سطر

متخمّنش ومتفتحش DevTools الأول: اسأل الأسئلة الأربعة بالترتيب، واكتب إجابتك على ورقة، وبعدين خلي الفحص يقارن. اللي بيوقع الناس دايمًا: [[:where()]] بصفر، و [[:is()]] بياخد الأتقل، والقواعد اللي برا الـ layers بتكسب، و [[!important]] بيقلب ترتيب الـ layers، والوراثة بتخسر قصاد أي حاجة.

---

## الأسئلة الأربعة كجدول

| السؤال | اللي بيكسب | مثال |
|---|---|---|
| ٠. فيه [[style=""]] على العنصر؟ | الـ inline style يكسب أي قاعدة عادية في ملفات CSS | [[<p style="color: red">]] يغلب [[#id.class p]] |
| ١. فيه [[!important]]؟ | القاعدة الـ important تكسب العادية، حتى الـ inline style العادي | [[p { color: green !important }]] يغلب [[style="color: red"]] |
| ٢. أنهي layer؟ (عادي) | برا الـ layers يكسب، وبعدين الـ layer الأخير في الترتيب | [[@layer x { #t {...} }]] يخسر قصاد [[p {...}]] برا |
| ٢. أنهي layer؟ (important) | بالعكس: الـ layer **الأول** يكسب | [[base]] الـ important يغلب [[theme]] الـ important |
| ٣. الـ specificity | (a, b, c) الأكبر من الشمال لليمين | (1, 0, 0) يغلب (0, 9, 9) |
| ٤. الترتيب | الأخير في الملف | [[.a]] بعدها [[.b]]: [[class="b a"]] بياخد [[.b]] |

ليه الـ important بيتقلب؟ عشان الـ layer الأساسي (reset، أو مكتبة) يقدر يقول «القيمة دي مهمة ومحدش يغيّرها»، والـ layers اللي بعده متقدرش تغلبها حتى بـ [[!important]]. وده من مواصفات CSS Cascade Level 5، واللغز ٨ تحت بيثبته في Chrome.

### الـ specificity حتة حتة

| الحتة | بتتعد في | ملاحظة |
|---|---|---|
| [[#id]] | a | id واحد أتقل من أي عدد classes |
| [[.class]] و [[[type="email"]]] و [[:hover]] و [[:focus]] | b | الـ attribute والـ pseudo-class زي الـ class بالظبط |
| [[p]] و [[::before]] (و [[:before]] القديمة) | c | الـ pseudo-element زي الـ type |
| [[*]] و [[>]] و [[+]] و [[~]] والمسافة | ولا حاجة | العلامات بتربط بس، مالهاش وزن |
| [[:where(...)]] | صفر | مهما كان جواه |
| [[:is(...)]] و [[:not(...)]] و [[:has(...)]] | أتقل حاجة جواه | [[:is(#a, .x)]] = (1, 0, 0) حتى لو العنصر طابق [[.x]] بس |
| [[:nth-child(2n of .on)]] | b + أتقل حاجة بعد [[of]] | دي (0, 2, 0) |

---

## الألغاز الـ ١٤

كل لغز CSS و HTML صغيرين. في ١ لحد ١٢: العنصر اللي [[id="t"]] لونه إيه؟ وفي ١٣ و ١٤: الـ selector بيطابق كام عنصر؟ اكتب كل الإجابات على ورقة **قبل** ما تشغّل حاجة.

~~~text الألغاز
1   p { color: red } .note { color: blue }
    <p class="note" id="t">

2   #a p { color: red } .box .note { color: green }
    <div id="a" class="box"><p class="note" id="t">

3   :where(#a) p { color: red } p.note { color: green }
    <div id="a"><p class="note" id="t">

4   :is(#a, .x) p { color: red } .box p.note { color: green }
    <div id="a" class="box"><p class="note" id="t">

5   .note { color: red !important } #t { color: green }
    <p class="note" id="t">

6   @layer base, theme;
    @layer theme { p { color: green } }
    @layer base { #t.note { color: red } }
    <p class="note" id="t">

7   @layer x { #t { color: red } } p { color: green }
    <p id="t">

8   @layer base, theme;
    @layer base { p { color: red !important } }
    @layer theme { p { color: green !important } }
    <p id="t">

9   .card:has(img) { color: red } .card { color: green }
    <div class="card" id="t"><img alt="">

10  #a { color: red } p { color: green }
    <div id="a"><p id="t">

11  .a { color: red } .b { color: green }
    <p class="b a" id="t">

12  p { color: green !important }
    <p id="t" style="color: red">

13  كام عنصر بيطابق  li:not(.off)
    <ul><li>١</li><li class="off">٢</li><li>٣</li><li class="off">٤</li><li>٥</li></ul>

14  كام عنصر بيطابق  label:has(+ input:invalid)
    <label>الاسم</label><input required>
    <label>الإيميل</label><input type="email" value="sara@example.com">
    <label>الموبايل</label><input pattern="01[0-9]{9}" value="123">
~~~

---

## الفحص: توقعك مقابل Chrome

اكتب توقعاتك في [[guess]] (اسم اللون بالإنجليزي، أو العدد)، والصق الكود في Console أي صفحة (حتى [[about:blank]]). لكل لغز بيعمل [[<iframe>]] مستخبي بـ [[srcdoc]] فيه الـ CSS والـ HTML بتوعه بس، عشان الألغاز متأثرش في بعض ولا في صفحتك، ويقرا اللون بـ [[getComputedStyle]] أو العدد بـ [[querySelectorAll(...).length]].

~~~js الفحص: توقّع الـ cascade
(async () => {
  // اكتب توقعك لكل لغز: اسم لون بالإنجليزي (red أو green أو blue) أو عدد العناصر
  const guess = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '', 11: '', 12: '', 13: 0, 14: 0 };
  const P = {
    1: ['p { color: red } .note { color: blue }', '<p class="note" id="t">؟</p>'],
    2: ['#a p { color: red } .box .note { color: green }', '<div id="a" class="box"><p class="note" id="t">؟</p></div>'],
    3: [':where(#a) p { color: red } p.note { color: green }', '<div id="a"><p class="note" id="t">؟</p></div>'],
    4: [':is(#a, .x) p { color: red } .box p.note { color: green }', '<div id="a" class="box"><p class="note" id="t">؟</p></div>'],
    5: ['.note { color: red !important } #t { color: green }', '<p class="note" id="t">؟</p>'],
    6: ['@layer base, theme; @layer theme { p { color: green } } @layer base { #t.note { color: red } }', '<p class="note" id="t">؟</p>'],
    7: ['@layer x { #t { color: red } } p { color: green }', '<p id="t">؟</p>'],
    8: ['@layer base, theme; @layer base { p { color: red !important } } @layer theme { p { color: green !important } }', '<p id="t">؟</p>'],
    9: ['.card:has(img) { color: red } .card { color: green }', '<div class="card" id="t"><img alt="">؟</div>'],
    10: ['#a { color: red } p { color: green }', '<div id="a"><p id="t">؟</p></div>'],
    11: ['.a { color: red } .b { color: green }', '<p class="b a" id="t">؟</p>'],
    12: ['p { color: green !important }', '<p id="t" style="color: red">؟</p>'],
    13: ['li:not(.off) { color: red }', '<ul><li>١</li><li class="off">٢</li><li>٣</li><li class="off">٤</li><li>٥</li></ul>', 'li:not(.off)'],
    14: ['label:has(+ input:invalid) { color: red }', '<form><label>الاسم</label><input required><label>الإيميل</label><input type="email" value="sara@example.com"><label>الموبايل</label><input pattern="01[0-9]{9}" value="123"></form>', 'label:has(+ input:invalid)'],
  };
  const named = c => { const i = document.createElement('i'); i.style.color = c; document.body.append(i); const v = getComputedStyle(i).color; i.remove(); return v; };
  let pass = 0;
  for (const n of Object.keys(P)) {
    const [css, html, sel] = P[n], f = document.createElement('iframe');
    f.style.cssText = 'position:absolute;width:10px;height:10px;opacity:0';
    f.srcdoc = '<style>' + css + '</style>' + html;
    await new Promise(r => { f.onload = r; document.body.append(f); });
    const d = f.contentDocument;
    const got = sel ? d.querySelectorAll(sel).length : getComputedStyle(d.getElementById('t')).color;
    const want = sel ? guess[n] : named(guess[n] || 'transparent');
    const right = got === want; if (right) pass++;
    console.log((right ? 'PASS ' : 'FAIL ') + n + ': ' + (sel ? 'عدد العناصر ' + got : 'اللون ' + got) + (right ? '' : ' ← انت قلت ' + guess[n]));
    f.remove();
  }
  console.log('النتيجة: ' + pass + ' من ' + Object.keys(P).length);
})();
~~~

- [[named(c)]] بيحوّل اسم اللون اللي كتبته ([[red]]) للصيغة اللي المتصفح بيرجّعها ([[rgb(255, 0, 0)]]) عن طريق عنصر مؤقت، عشان المقارنة تبقى نص بنص. ولاحظ إن [[green]] في CSS هو [[rgb(0, 128, 0)]] مش [[rgb(0, 255, 0)]] (ده [[lime]]).
- [[await new Promise(r => { f.onload = r; ... })]] بيستنى الـ iframe يحمّل قبل ما يقرا، ولولاها كنت هتقرا من document فاضي.
- الناتج الحقيقي على توقعات صح وتوقعات غلط موجود في «الحل»، عشان متشوفش الإجابات قبل ما تحل.

---

## التمرين اللي بيتصحح لوحده: احسب الـ specificity بنفسك

اكتب [[specificity(selector)]] بترجّع [[[a, b, c]]] لـ selector واحد (من غير فواصل على المستوى الأول)، و [[compareSpecificity(x, y)]] بترجّع 1 لو x أتقل و -1 لو أخف و 0 لو متساويين. الطريقة: امشي على النص حرف حرف بـ index:

| الحرف | تعمل إيه |
|---|---|
| [[#]] | اقرا الاسم اللي بعده، و a + 1 |
| [[.]] | اقرا الاسم، و b + 1 |
| [[[]] | اقفز لحد [[]]] اللي بيقفل (واتخطى أي [[]]] جوه علامات تنصيص)، و b + 1 |
| [[::]] | اقرا الاسم، و c + 1 |
| [[:]] | اقرا الاسم. لو [[before]] أو [[after]] أو [[first-line]] أو [[first-letter]] يبقى c + 1. لو بعده [[(]] اقرا لحد القوس اللي بيقفله (عدّ الأقواس المتداخلة) وقرر حسب الاسم: [[where]] صفر، و [[is]] و [[not]] و [[has]] أتقل حاجة جوه، و [[nth-child(... of S)]] b + 1 + أتقل S. وغير كده b + 1 |
| حرف أو [[-]] | اسم type: اقرا الاسم، و c + 1 |
| أي حاجة تانية | مسافة أو [[>]] أو [[+]] أو [[~]] أو [[*]]: اتخطاها |

و «أتقل حاجة جوه» يعني قسّم الكلام على الفواصل **اللي برا أي قوس** ([[:is(.a, :not(.b, .c))]] فيها فاصلة واحدة على المستوى ده)، واحسب كل جزء بنفس الدالة (recursion)، وخد الأكبر بـ [[compareSpecificity]].

## خلاصة

- الترتيب: inline style، و important، و layer، و specificity، و الترتيب في الملف. وأول فرق بيحسم.
- [[:where()]] بصفر (للـ resets والمكتبات)، و [[:is()]] و [[:not()]] و [[:has()]] بالأتقل جواهم.
- برا الـ layers بيكسب جوه، والـ layer الأخير بيكسب، وفي الـ important بالعكس.
- الوراثة بتخسر قصاد أي قاعدة على العنصر نفسه.
- ترتيب الـ classes في [[class=""]] ملوش أي لازمة، المهم ترتيبهم في ملف الـ CSS.`,
          try: R`حل الألغاز الـ ١٤ على ورقة من غير ما تشغّل حاجة، واكتبهم في [[guess]] في الفحص، والصقه في Console. لكل لغز وقعت فيه، ارجع للجدول وقول أنهي سؤال من الأربعة كان هيحسمه. وبعدين اكتب [[specificity]] و [[compareSpecificity]] في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** احسب specificity للأربعة دول من غير كود: [[nav ul li a:hover]] و [[#menu .item]] و [[:where(#menu) .item.active]] و [[input:not([type="checkbox"]):focus-visible]]. رتّبهم من الأتقل للأخف.`, done: R`(0, 1, 4) و (1, 1, 0) و (0, 2, 0) و (0, 2, 1) (الـ [[:not([type])]] بياخد وزن الـ attribute اللي جواه، يعني class واحدة)، والترتيب [[#menu .item]] ثم [[input:not(...):focus-visible]] ثم [[:where(#menu) .item.active]] ثم [[nav ul li a:hover]]، ودالتك في المربع طلّعت نفس الأرقام.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف reset فيه [[a { color: inherit; text-decoration: none; }]] و [[button { background: none; }]]، والمكونات بتاعتك [[.link { color: blue; }]] شغالة، بس [[.card a { color: inherit; }]] من reset تاني بتغلب [[.link]] جوه الكروت. صلّح من غير ما تلمس المكونات ولا تزوّد [[!important]].`, done: R`لفّيت الـ reset في [[:where()]] ([[:where(.card) a]]) أو في [[@layer reset]] متعرّف قبل باقي الملف، و [[.link]] جوه الكارت بقى أزرق، والفحص بـ [[getComputedStyle]] طلّع [[rgb(0, 0, 255)]]، ومكتوب ليه كل حل من الاتنين اشتغل.` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة فيها ٣ layers بالترتيب [[@layer reset, components, utilities]]، وزرار ليه [[.btn]] في components و [[.mt-4]] و [[.bg-red]] في utilities. اثبت إن الـ utility بيكسب الـ component حتى لو الـ component selector أتقل ([[.card .btn]]).`, done: R`[[getComputedStyle]] على الزرار طلّع خلفية [[.bg-red]] مع إن [[.card .btn]] (0, 2, 0) أتقل من [[.bg-red]] (0, 1, 0)، ولما شيلت سطر [[@layer reset, components, utilities]] من فوق والترتيب بقى حسب أول ظهور، النتيجة اتغيرت أو فضلت، ومكتوب ليه.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** زوّد ٣ ألغاز على الفحص (رقم ١٥ و ١٦ و ١٧) من عندك: واحد فيه [[@scope]]، وواحد فيه nesting ([[.card { & p { ... } }]])، وواحد فيه [[revert-layer]]. توقّع الأول، وبعدين شغّل.`, done: R`الألغاز التلاتة شغالة في الفحص بنفس الشكل، ولكل واحد مكتوب توقعك واللي Chrome قاله وليه، ولو اتفاجئت في واحد مكتوب أنهي قاعدة من MDN فسّرته.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اشرح لزميل في ٣ سطور ليه Tailwind v4 حاطط الـ utilities في [[@layer utilities]] مش برا الـ layers، وإيه اللي بيحصل لو كتبت CSS عادي برا أي layer في نفس المشروع.`, done: R`الشرح بيقول إن الـ layers بتخلي الترتيب ثابت مهما كانت الـ specificity، وإن الـ CSS اللي برا أي layer بيكسب كل الـ utilities (حتى [[p]] لوحدها تغلب [[.text-red-500]])، وإن ده سبب شائع لـ «الـ class بتاعة Tailwind مش شغالة»، وجربته في صفحة وطلع كده.` },
          ],
          deep: {
            why: R`أغلب [[!important]] في أي مشروع اتكتب لأن حد مكنش عارف ليه قاعدته بتخسر. لو عرفت الأسئلة الأربعة، بتعرف تخلي قاعدتك تكسب بأقل وزن ممكن، وتسيب مكان للي بعدك. والألغاز دي بالظبط شكل أسئلة الانترفيو، والإجابة اللي بتقولها هي «هسأل الأربعة بالترتيب».`,
            how: R`المتصفح بيجمع كل القواعد اللي بتطابق العنصر لكل خاصية، وبيرتبهم بالترتيب ده: الأصل (المتصفح ولا الموقع) مع الـ importance، وبعدين الـ layer، وبعدين الـ specificity، وبعدين ترتيب الظهور، وياخد الأول. الـ inline style بيتعامل كأنه specificity أعلى من أي selector. والـ specificity بتتحسب لكل selector في اللستة لوحده: [[a, #b]] قاعدة بوزنين، وكل عنصر بياخد وزن الـ selector اللي طابقه. أما [[:is(a, #b)]] فوزن واحد للكل (الأتقل)، وده الفرق بينهم. والوراثة مش «قاعدة ضعيفة»: هي قيمة بتتاخد بس لو مفيش ولا قاعدة على العنصر نفسه للخاصية دي. والـ [[:has()]] بيتحسب زي [[:is()]]، وده اللي بيخلي [[.card:has(img)]] يغلب [[.card]].`,
            when: R`استخدم [[:where()]] في أي CSS هيتعاد استخدامه وعايزه يتغلب بسهولة (reset، ومكتبة، وقواعد افتراضية). واستخدم [[@layer]] لما المشروع فيه مصادر CSS كتير (reset ومكتبة ومكوناتك و utilities) عشان الترتيب يتحدد مرة في أول سطر. و [[:is()]] لتقصير selectors طويلة بس خلي بالك إنه بياخد الأتقل. و [[!important]] للـ utilities اللي لازم تكسب دايمًا ([[.visually-hidden]]) ولحاجات اليوزر (accessibility overrides)، مش لحل خناقة.`,
            mistakes: R`تفتكر إن [[:where(#a)]] ليه وزن id. أو إن [[:is(#a, .x) p]] وزنه class لما العنصر طابق [[.x]]. أو إن ترتيب الـ classes في الـ HTML بيفرق. أو إن [[!important]] في layer متأخر هيغلب [[!important]] في layer قبله. أو إنك تكتب CSS برا الـ layers في مشروع Tailwind v4 وتستغرب إن الـ utilities مش شغالة. أو إن القيمة الموروثة من [[#a]] أتقل من [[p]] لأن «الأب عليه id». أو تعد [[::before]] كـ class. أو تنسى إن [[green]] في CSS مش أخضر فاقع.`,
          },
          sol: R`**توقعات صح** (اللي في السطر ده) طلّعت ١٤ من ١٤ في Chrome بـ Playwright:

[[{ 1: 'blue', 2: 'red', 3: 'green', 4: 'red', 5: 'red', 6: 'green', 7: 'green', 8: 'red', 9: 'red', 10: 'green', 11: 'green', 12: 'green', 13: 3, 14: 2 }]]

~~~text Chrome، توقعات صح
PASS 1: اللون rgb(0, 0, 255)
PASS 2: اللون rgb(255, 0, 0)
PASS 3: اللون rgb(0, 128, 0)
PASS 4: اللون rgb(255, 0, 0)
PASS 5: اللون rgb(255, 0, 0)
PASS 6: اللون rgb(0, 128, 0)
PASS 7: اللون rgb(0, 128, 0)
PASS 8: اللون rgb(255, 0, 0)
PASS 9: اللون rgb(255, 0, 0)
PASS 10: اللون rgb(0, 128, 0)
PASS 11: اللون rgb(0, 128, 0)
PASS 12: اللون rgb(0, 128, 0)
PASS 13: عدد العناصر 3
PASS 14: عدد العناصر 2
النتيجة: 14 من 14
~~~

و**توقعات غلط** (عكس كل واحدة) طلّعت كده، والسطر بيقولك اللي Chrome حسبه واللي انت قلته:

~~~text Chrome، توقعات غلط
FAIL 1: اللون rgb(0, 0, 255) ← انت قلت red
FAIL 2: اللون rgb(255, 0, 0) ← انت قلت green
FAIL 3: اللون rgb(0, 128, 0) ← انت قلت red
FAIL 4: اللون rgb(255, 0, 0) ← انت قلت green
FAIL 5: اللون rgb(255, 0, 0) ← انت قلت green
FAIL 6: اللون rgb(0, 128, 0) ← انت قلت red
FAIL 7: اللون rgb(0, 128, 0) ← انت قلت red
FAIL 8: اللون rgb(255, 0, 0) ← انت قلت green
FAIL 9: اللون rgb(255, 0, 0) ← انت قلت green
FAIL 10: اللون rgb(0, 128, 0) ← انت قلت red
FAIL 11: اللون rgb(0, 128, 0) ← انت قلت red
FAIL 12: اللون rgb(0, 128, 0) ← انت قلت red
FAIL 13: عدد العناصر 3 ← انت قلت 2
FAIL 14: عدد العناصر 2 ← انت قلت 1
النتيجة: 0 من 14
~~~

ليه كل واحدة: ١ class تغلب type. ٢ (1, 0, 1) تغلب (0, 2, 0). ٣ [[:where]] صفر فـ (0, 0, 1) قصاد (0, 1, 1). ٤ [[:is]] بياخد [[#a]] فـ (1, 0, 1) قصاد (0, 2, 1). ٥ important يغلب id. ٦ [[theme]] اتعرّف بعد [[base]] فبيكسب رغم الـ id. ٧ برا الـ layers يغلب جوه رغم الـ id. ٨ في الـ important الـ layer الأول يكسب. ٩ [[:has(img)]] بيزوّد (0, 0, 1). ١٠ الوراثة من [[#a]] بتخسر قصاد [[p]]. ١١ [[.b]] متكتبة بعد في الملف. ١٢ important من الملف يغلب inline عادي. ١٣ تلاتة من خمسة مش [[.off]]. ١٤ الاسم فاضي و [[required]] فـ invalid، والإيميل سليم، والموبايل [[123]] مش طالع على الـ pattern فـ invalid.

وحل [[specificity]] تحت: tokenizer بيمشي حرف حرف، وبيستدعي نفسه للي جوه [[:is()]] و [[:not()]] و [[:has()]].`,
          solCode: R`function specificity(selector) {
  const s = selector.trim();
  let a = 0, b = 0, c = 0, i = 0;
  const ident = () => { const m = /^-?[\w-]+/.exec(s.slice(i)); i += m ? m[0].length : 0; return m ? m[0].toLowerCase() : ''; };
  const group = () => {
    let depth = 1, j = i + 1, q = '';
    for (; j < s.length && depth; j++) {
      const ch = s[j];
      if (q) { if (ch === q) q = ''; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '(') depth++; else if (ch === ')') depth--;
    }
    const inside = s.slice(i + 1, j - 1); i = j; return inside;
  };
  const split = list => { const out = []; let depth = 0, q = '', cur = '';
    for (const ch of list) {
      if (q) { if (ch === q) q = ''; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '(') depth++; else if (ch === ')') depth--;
      if (ch === ',' && !depth && !q) { out.push(cur); cur = ''; } else cur += ch;
    }
    return out.concat(cur).filter(x => x.trim()); };
  const most = list => split(list).map(specificity).reduce((m, x) => compareSpecificity(x, m) > 0 ? x : m, [0, 0, 0]);
  const add = x => { a += x[0]; b += x[1]; c += x[2]; };
  while (i < s.length) {
    const ch = s[i];
    if (ch === '#') { i++; ident(); a++; }
    else if (ch === '.') { i++; ident(); b++; }
    else if (ch === '[') { let q = ''; for (i++; i < s.length; i++) { const x = s[i]; if (q) { if (x === q) q = ''; } else if (x === '"' || x === "'") q = x; else if (x === ']') break; } i++; b++; }
    else if (ch === ':' && s[i + 1] === ':') { i += 2; ident(); if (s[i] === '(') group(); c++; }
    else if (ch === ':') {
      i++; const name = ident();
      if (['before', 'after', 'first-line', 'first-letter'].includes(name)) c++;
      else if (s[i] !== '(') b++;
      else {
        const arg = group();
        if (name === 'where') {}
        else if (['is', 'not', 'has', 'matches', '-webkit-any'].includes(name)) add(most(arg));
        else if (/^nth-(last-)?child$/.test(name) && / of /.test(arg)) { b++; add(most(arg.slice(arg.indexOf(' of ') + 4))); }
        else b++;
      }
    }
    else if (/[\w-]/.test(ch)) { ident(); c++; }
    else i++;
  }
  return [a, b, c];
}
function compareSpecificity(x, y) {
  for (let k = 0; k < 3; k++) if (x[k] !== y[k]) return x[k] > y[k] ? 1 : -1;
  return 0;
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`// specificity("#a .b p") => [1, 1, 1]
// :where() = صفر، و :is() و :not() و :has() = أتقل selector جواهم، و ::before = c
function specificity(selector) {}
// 1 لو x أتقل، و -1 لو أخف، و 0 لو متساويين
function compareSpecificity(x, y) {}`,
            tests: R`test("p = (0,0,1)", () => expect(specificity("p")).toEqual([0, 0, 1]));
test(".note = (0,1,0)", () => expect(specificity(".note")).toEqual([0, 1, 0]));
test("#a p = (1,0,1)", () => expect(specificity("#a p")).toEqual([1, 0, 1]));
test("ul li.active a:hover = (0,2,3)", () => expect(specificity("ul li.active a:hover")).toEqual([0, 2, 3]));
test("attribute و pseudo-class بيتعدّوا زي class", () => expect(specificity('input[type="email"]:focus')).toEqual([0, 2, 1]));
test("pseudo-element بيتعد زي type", () => expect(specificity("a::before")).toEqual([0, 0, 2]));
test("الشكل القديم :after لسه pseudo-element", () => expect(specificity("p:after")).toEqual([0, 0, 2]));
test(":where() بصفر", () => expect(specificity(":where(#a, .x) p")).toEqual([0, 0, 1]));
test(":is() بياخد أتقل واحد جواه", () => expect(specificity(":is(#a, .x) p")).toEqual([1, 0, 1]));
test(":not() زي :is()", () => expect(specificity("li:not(.off, #x)")).toEqual([1, 0, 1]));
test(":has() زي :is()", () => expect(specificity(".card:has(> img)")).toEqual([0, 1, 1]));
test("* والـ combinators بصفر", () => expect([specificity("*"), specificity("* > *"), specificity("h1 + p ~ span")]).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 3]]));
test(":nth-child(... of S) = class + أتقل S", () => expect(specificity("li:nth-child(2n+1 of .on)")).toEqual([0, 2, 1]));
test("] جوه علامات تنصيص مش بتقفل الـ attribute", () => expect(specificity('a[title="x]y"].on')).toEqual([0, 2, 1]));
test("compareSpecificity: id واحد يغلب ٩ classes", () => expect([compareSpecificity([1, 0, 0], [0, 9, 9]), compareSpecificity([0, 1, 0], [0, 1, 0]), compareSpecificity([0, 0, 1], [0, 1, 0])]).toEqual([1, 0, -1]));`,
            solution: R`function specificity(selector) {
  const s = selector.trim();
  let a = 0, b = 0, c = 0, i = 0;
  const ident = () => { const m = /^-?[\w-]+/.exec(s.slice(i)); i += m ? m[0].length : 0; return m ? m[0].toLowerCase() : ''; };
  const group = () => {
    let depth = 1, j = i + 1, q = '';
    for (; j < s.length && depth; j++) {
      const ch = s[j];
      if (q) { if (ch === q) q = ''; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '(') depth++; else if (ch === ')') depth--;
    }
    const inside = s.slice(i + 1, j - 1); i = j; return inside;
  };
  const split = list => { const out = []; let depth = 0, q = '', cur = '';
    for (const ch of list) {
      if (q) { if (ch === q) q = ''; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '(') depth++; else if (ch === ')') depth--;
      if (ch === ',' && !depth && !q) { out.push(cur); cur = ''; } else cur += ch;
    }
    return out.concat(cur).filter(x => x.trim()); };
  const most = list => split(list).map(specificity).reduce((m, x) => compareSpecificity(x, m) > 0 ? x : m, [0, 0, 0]);
  const add = x => { a += x[0]; b += x[1]; c += x[2]; };
  while (i < s.length) {
    const ch = s[i];
    if (ch === '#') { i++; ident(); a++; }
    else if (ch === '.') { i++; ident(); b++; }
    else if (ch === '[') { let q = ''; for (i++; i < s.length; i++) { const x = s[i]; if (q) { if (x === q) q = ''; } else if (x === '"' || x === "'") q = x; else if (x === ']') break; } i++; b++; }
    else if (ch === ':' && s[i + 1] === ':') { i += 2; ident(); if (s[i] === '(') group(); c++; }
    else if (ch === ':') {
      i++; const name = ident();
      if (['before', 'after', 'first-line', 'first-letter'].includes(name)) c++;
      else if (s[i] !== '(') b++;
      else {
        const arg = group();
        if (name === 'where') {}
        else if (['is', 'not', 'has', 'matches', '-webkit-any'].includes(name)) add(most(arg));
        else if (/^nth-(last-)?child$/.test(name) && / of /.test(arg)) { b++; add(most(arg.slice(arg.indexOf(' of ') + 4))); }
        else b++;
      }
    }
    else if (/[\w-]/.test(ch)) { ident(); c++; }
    else i++;
  }
  return [a, b, c];
}
function compareSpecificity(x, y) {
  for (let k = 0; k < 3; k++) if (x[k] !== y[k]) return x[k] > y[k] ? 1 : -1;
  return 0;
}`
          },
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`function specificity(selector) {
  const s = selector.trim();
  let a = 0, b = 0, c = 0, i = 0;
  const ident = () => { const m = /^-?[\w-]+/.exec(s.slice(i)); i += m ? m[0].length : 0; return m ? m[0].toLowerCase() : ''; };
  const group = () => {
    let depth = 1, j = i + 1, q = '';
    for (; j < s.length && depth; j++) {
      const ch = s[j];
      if (q) { if (ch === q) q = ''; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '(') depth++; else if (ch === ')') depth--;
    }
    const inside = s.slice(i + 1, j - 1); i = j; return inside;
  };
  const split = list => { const out = []; let depth = 0, q = '', cur = '';
    for (const ch of list) {
      if (q) { if (ch === q) q = ''; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '(') depth++; else if (ch === ')') depth--;
      if (ch === ',' && !depth && !q) { out.push(cur); cur = ''; } else cur += ch;
    }
    return out.concat(cur).filter(x => x.trim()); };
  const most = list => split(list).map(specificity).reduce((m, x) => compareSpecificity(x, m) > 0 ? x : m, [0, 0, 0]);
  const add = x => { a += x[0]; b += x[1]; c += x[2]; };
  while (i < s.length) {
    const ch = s[i];
    if (ch === '#') { i++; ident(); a++; }
    else if (ch === '.') { i++; ident(); b++; }
    else if (ch === '[') { let q = ''; for (i++; i < s.length; i++) { const x = s[i]; if (q) { if (x === q) q = ''; } else if (x === '"' || x === "'") q = x; else if (x === ']') break; } i++; b++; }
    else if (ch === ':' && s[i + 1] === ':') { i += 2; ident(); if (s[i] === '(') group(); c++; }
    else if (ch === ':') {
      i++; const name = ident();
      if (['before', 'after', 'first-line', 'first-letter'].includes(name)) c++;
      else if (s[i] !== '(') b++;
      else {
        const arg = group();
        if (name === 'where') {}
        else if (['is', 'not', 'has', 'matches', '-webkit-any'].includes(name)) add(most(arg));
        else if (/^nth-(last-)?child$/.test(name) && / of /.test(arg)) { b++; add(most(arg.slice(arg.indexOf(' of ') + 4))); }
        else b++;
      }
    }
    else if (/[\w-]/.test(ch)) { ident(); c++; }
    else i++;
  }
  return [a, b, c];
}
function compareSpecificity(x, y) {
  for (let k = 0; k < 3; k++) if (x[k] !== y[k]) return x[k] > y[k] ? 1 : -1;
  return 0;
}
const cases = ["p", "#a p", ":where(#a) p", ":is(#a, .x) p", "ul li.active a:hover", "a::before", ".card:has(> img)", "li:nth-child(2n+1 of .on)", 'a[title="x]y"].on'];
for (const c of cases) console.log(c + " = (" + specificity(c).join(",") + ")");
console.log("id vs 9 classes: " + compareSpecificity(specificity("#a"), specificity(".a.b.c.d.e.f.g.h.i")));`, expect: [R`p = (0,0,1)`, R`#a p = (1,0,1)`, R`:where(#a) p = (0,0,1)`, R`:is(#a, .x) p = (1,0,1)`, R`ul li.active a:hover = (0,2,3)`, R`.card:has(> img) = (0,1,1)`, R`li:nth-child(2n+1 of .on) = (0,2,1)`, R`a[title="x]y"].on = (0,2,1)`, R`id vs 9 classes: 1`] },
          ],
        },
        {
          cmd: "accessibility: لحد axe صفر",
          title: "صلّح فورم اشتراك وأزرار أيقونات لحد ما axe يقول صفر، وبعدين لاقي اللي axe مش شايفه",
          learn: R`تشغّل axe من الـ Console على أي صفحة وتقرا كل violation (القاعدة والعنصر والتصليح)، وتعرف إن «axe صفر» بداية مش نهاية: فيه حاجات بتتقاس بفحص تاني وبالكيبورد بإيدك.`,
          out: R`صفحة بتعدّي من ٨ violations لصفر في axe 4.14، ومن [[0 من 10]] لـ [[10 من 10]] في فحص ذاتي بيلقط ٣ حاجات axe سكت عنها: placeholder مكان label، و div بيتداس عليه، وتباين الكلام العربي.`,
          use: {
            prog: R`الـ accessibility في الكود معناها إن العنصر بيقول هو إيه (button ولا لينك ولا حقل) واسمه إيه، وإن الكيبورد بيوصله، وإن الكلام مقري. وكل ده بيتقاس، مش «إحساس».`,
            work: R`مواقع كتير مطلوب منها WCAG 2.2 AA بالقانون (في أوروبا من ٢٠٢٥ بقانون European Accessibility Act)، وأي عميل كبير بيشغّل axe أو Lighthouse على شغلك قبل ما يستلمه. والأخطاء هنا بالظبط اللي بتتلقى في صفحات الهبوط: أزرار أيقونات من غير اسم، و placeholder مكان label، وكلام رمادي فاتح على أبيض.`,
            cs: R`التباين معادلة من WCAG: كل لون بيتحوّل لـ luminance (إضاءة نسبية) بعد ما يتشال منه الـ gamma بتاع sRGB، والنسبة [[(L1 + 0.05) / (L2 + 0.05)]]. والاسم المتاح (accessible name) خوارزمية من مواصفة اسمها accname: [[aria-labelledby]] الأول، وبعدين [[aria-label]]، وبعدين الـ label، وبعدين المحتوى.`,
          },
          desc: R`الطريقة ٣ خطوات، بالترتيب ده:

1. **axe:** مكتبة بتفحص الصفحة بـ ٩٠ قاعدة تقريبًا في ثانية، وكل violation بيقولك اسم القاعدة ([[button-name]]) والعنصر ([[button.menu-btn]]) وإزاي تصلّح. بتشغّلها من الـ Console (الكود في الشرح) أو من إضافة axe DevTools أو Lighthouse.
2. **الفحص الذاتي:** ١٠ أسئلة axe مش بيسألها أو بيسكت عنها. أهمهم: الـ placeholder لوحده مش label (axe بيقبله كاسم)، والـ [[<div onclick>]] مش بيوصله Tab (axe مبيعرفش إنه بيتداس عليه)، و **تباين الكلام العربي المتوصل** (axe 4.14 بيتخطاه، والسبب في الشرح).
3. **الكيبورد بإيدك:** Tab لكل حاجة بالترتيب، و Enter و Space بيشغّلوا، و Escape بيقفل، والـ focus باين دايمًا.

الصفحة اللي هتصلّحها: فورم اشتراك في «نادي القراءة» (متخيل) فيه ١٠ أخطاء: من غير [[lang]]، ولوجو من غير [[alt]]، وزرار قايمة أيقونة من غير اسم وعليه [[aria-expanded="yes"]]، ولينك سلة أيقونة من غير اسم، وعنوان [[h4]] بعد [[h1]] على طول، وحقول بـ placeholder بس، و select من غير label، وكلام [[#a1a1aa]] على أبيض، وزرار «اشترك» [[<div>]]، وقايمة [[<ul>]] جواها [[<div>]]. ده تطبيق على دروس «aria» و «focus-visible» و «contrast ratio» و «WCAG 2.2» و «axe و Lighthouse» و «كيبورد وقارئ شاشة» في التاب ده.`,
          example: R`<label for="email">الإيميل</label>
<input id="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint">
<p class="hint" id="email-hint">هنبعتلك كتاب كل شهر</p>
<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="القايمة">
  <svg width="20" height="20" aria-hidden="true"><path d="M2 5h16M2 10h16M2 15h16" stroke="#000"/></svg>
</button>
<a href="/cart" aria-label="السلة"><svg width="20" height="20" aria-hidden="true"><circle cx="10" cy="10" r="8"/></svg></a>
<button class="btn" type="submit">اشترك</button>`,
          lines: [
            R`label ظاهر، و [[for="email"]] بيربطه بالحقل اللي [[id]] بتاعه [[email]]: الضغط على الكلمة بيركّز في الحقل، وقارئ الشاشة بيقول «الإيميل» لما توصله.`,
            R`الحقل نفسه: [[type="email"]] بيجيب كيبورد الإيميل على الموبايل، و [[autocomplete]] بيخلي المتصفح يملاه، و [[dir="ltr"]] عشان الإيميل يتكتب من الشمال، و [[aria-describedby]] بيربط جملة المساعدة اللي تحته فقارئ الشاشة بيقراها بعد الاسم.`,
            R`جملة المساعدة بلون [[#52525b]] (تباين 7.73 على أبيض) بدل [[#a1a1aa]] (2.56)، و [[id]] بتاعها هو اللي الحقل بيشاور عليه.`,
            R`زرار القايمة: [[aria-expanded="false"]] (القيمة لازم true أو false مش yes)، و [[aria-controls]] بيقول القايمة اللي بيفتحها، و [[aria-label]] بيديله اسم لأن مفيش كلام جواه.`,
            R`الأيقونة نفسها [[aria-hidden="true"]] عشان قارئ الشاشة ميقولش «صورة» أو يقرا الـ path. الاسم جاي من الزرار.`,
            R`قفلة الزرار. لو كان [[<div>]] كان لازم [[tabindex]] و [[role]] و key handlers، و [[<button>]] بيجيب ده كله ببلاش.`,
            R`لينك السلة: نفس فكرة زرار القايمة، [[aria-label="السلة"]] على اللينك، والـ svg مستخبي عن قارئ الشاشة.`,
            R`زرار الإرسال الحقيقي بدل [[<div onclick>]]: بيوصله Tab، و Enter و Space بيشغّلوه، و [[type="submit"]] بيبعت الفورم من غير JavaScript.`,
          ],
          teach: R`## الفكرة في سطر

**axe الأول، والفحص الذاتي تاني، والكيبورد بإيدك في الآخر.** axe بيلقط أغلب الأخطاء اللي ليها قاعدة واضحة، بس فيه حاجات بيسكت عنها، وأخطرها في موقع عربي إنه **بيتخطى تباين الكلام العربي المتوصل**. كل الأرقام تحت من Chrome بـ Playwright على ويندوز ١١ و axe-core 4.14.0.

---

## الصفحة البايظة

~~~html نادي القراءة: قبل التصليح
<!doctype html>
<html dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشترك في نادي القراءة</title>
<style>
body { font-family: system-ui, sans-serif; padding: 16px; }
.hint { color: #a1a1aa; }
.menu-btn { width: 40px; height: 40px; }
.fake-btn { display: inline-block; padding: 8px 16px; background: #4f46e5; color: #fff; cursor: pointer; }
</style>
</head>
<body>
<header>
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'/%3E" width="40" height="40">
  <button class="menu-btn" aria-expanded="yes"><svg width="20" height="20"><path d="M2 5h16M2 10h16M2 15h16" stroke="#000"/></svg></button>
  <a href="/cart"><svg width="20" height="20"><circle cx="10" cy="10" r="8"/></svg></a>
</header>
<main>
  <h1>اشترك في نادي القراءة</h1>
  <h4>بياناتك</h4>
  <form>
    <input type="text" placeholder="الاسم">
    <input type="email" placeholder="الإيميل">
    <select><option>القاهرة</option><option>الإسكندرية</option></select>
    <p class="hint">هنبعتلك كتاب كل شهر</p>
    <div class="fake-btn" onclick="this.closest('form').requestSubmit()">اشترك</div>
  </form>
  <ul class="perks"><div>شحن مجاني</div><li>خصم ١٠٪</li></ul>
</main>
</body>
</html>
~~~

---

## الخطوة ١: axe من الـ Console

الكود ده بيحمّل axe من jsDelivr (لو مش محمّل)، ويشغّله على الصفحة كلها، ويطبع كل violation. شغّال على ملف مفتوح من جهازك (file://) وعلى localhost. وعلى مواقع عليها Content Security Policy بتمنع scripts من برا هيطبع «axe محملش»، وساعتها استخدم إضافة axe DevTools أو Lighthouse.

~~~js axe من الـ Console
(async () => {
  if (!window.axe) await new Promise((done, fail) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/axe-core@4.14.0/axe.min.js';
    s.onload = done; s.onerror = () => fail(new Error('axe محملش: النت أو CSP بتاع الصفحة'));
    document.head.append(s);
  });
  const r = await axe.run();
  console.log('axe ' + axe.version + ': ' + r.violations.length + ' violations');
  r.violations.forEach(v => console.log('FAIL ' + v.id + ' (' + v.nodes.length + '): ' + v.help + ' ← ' + v.nodes[0].target.join(' ')));
})();
~~~

~~~text Chrome، الصفحة البايظة
axe 4.14.0: 8 violations
FAIL aria-valid-attr-value (1): ARIA attributes must conform to valid values ← button
FAIL button-name (1): Buttons must have discernible text ← button
FAIL heading-order (1): Heading levels should only increase by one ← h4
FAIL html-has-lang (1): <html> element must have a lang attribute ← html
FAIL image-alt (1): Images must have alternative text ← img
FAIL link-name (1): Links must have discernible text ← a
FAIL list (1): <ul> and <ol> must only directly contain <li>, <script> or <template> elements ← ul
FAIL select-name (1): Select element must have an accessible name ← select
~~~

| قاعدة axe | المعنى | التصليح في الحل |
|---|---|---|
| [[html-has-lang]] | قارئ الشاشة مش عارف ينطق بأنهي لغة، فممكن يقرا العربي بنطق إنجليزي | [[<html lang="ar" dir="rtl">]] |
| [[image-alt]] | الصورة ملهاش بديل نصي، فقارئ الشاشة بيقرا اسم الملف أو يسكت | [[alt="نادي القراءة"]] (والديكور [[alt=""]]) |
| [[button-name]] | زرار أيقونة من غير كلام، فبيتقري «زرار» وبس | [[aria-label="القايمة"]] و [[aria-hidden]] على الـ svg |
| [[aria-valid-attr-value]] | [[aria-expanded="yes"]]: القيم المسموحة [[true]] و [[false]] بس | [[aria-expanded="false"]] وبتتقلب بـ JS لما القايمة تفتح |
| [[link-name]] | لينك أيقونة من غير اسم | [[aria-label="السلة"]] |
| [[heading-order]] | [[h1]] وبعده [[h4]] على طول: قارئ الشاشة بيتنقل بالعناوين وبيتوه | [[h2]] (لو عايز الحجم أصغر غيّره بالـ CSS مش بالمستوى) |
| [[select-name]] | الـ select ملوش label | [[<label for="city">المدينة</label>]] |
| [[list]] | [[<ul>]] جواها [[<div>]]: قارئ الشاشة بيقول «قايمة من عنصر واحد» | كل عنصر [[<li>]] |

وبعد التصليح:

~~~text Chrome، الحل المرجعي
axe 4.14.0: 0 violations
~~~

---

## الخطوة ٢: اللي axe مسكتش عنه في الصفحة دي

ارجع للصفحة البايظة: فيها ٣ أخطاء كمان axe مقالش عليهم ولا كلمة:

1. **الحقول بـ placeholder بس.** axe 4.14 عدّى [[label]] على الحقلين لأنه بيحسب الـ placeholder اسم. بس الـ placeholder بيختفي أول ما تكتب حرف، فاللي نسي الحقل ده بتاع إيه مش هيعرف، وده ضد WCAG 3.3.2 (Labels or Instructions).
2. **«اشترك» [[<div onclick>]].** axe مبيعرفش إن فيه event listener، فمش بيقول حاجة. بس Tab مش بيوصله، يعني اللي بيستخدم كيبورد بس مش هيعرف يشترك خالص.
3. **[[.hint]] لونه [[#a1a1aa]] على أبيض: التباين 2.56:1** والمطلوب 4.5. وده axe مقالش عليه.

### ليه axe سكت عن التباين؟

جرّبت صفحة فيها ٤ فقرات بنفس اللون [[#a1a1aa]] على أبيض، وشغّلت قاعدة [[color-contrast]] بس:

~~~text axe 4.14.0، color-contrast على ٤ فقرات بنفس اللون (السطور مختصرة)
p:nth-child(2) Element has insufficient color contrast of 2.56 ...   ← «ا د ر ز و» (حروف منفصلة)
p:nth-child(3) Element has insufficient color contrast of 2.56 ...   ← «كتاب hello» (فيها إنجليزي)
p:nth-child(4) Element has insufficient color contrast of 2.56 ...   ← «١٢٣٤٥»
~~~

الفقرة الأولى «هنبعتلك كتاب كل شهر» (عربي متوصل بس) **مش في اللستة**. ولما سألت axe نفسه بـ [[axe.commons.text.isIconLigature()]] على كل فقرة:

~~~text axe.commons.text.isIconLigature
هنبعتلك كتاب كل شهر → true
ا د ر ز و → false
كتاب hello → false
١٢٣٤٥ → false
~~~

axe بيحاول يعرف «الكلام ده أيقونة؟» (زي خطوط الأيقونات اللي كلمة [[home]] فيها بتترسم بيت)، وبيرسم الكلام ويقارن شكله. الحروف العربي المتوصلة شكلها بيتغير لما تتوصل (ligatures)، فـ axe بيفتكرها أيقونة وبيتخطاها. يعني على أي صفحة عربي، **axe صفر في التباين مالوش معنى**، وأي فحص تباين لازم تعمله بنفسك (الفحص الذاتي تحت، أو الـ color picker في DevTools، أو [[contrastRatio]] من الدرس اللي بعده).

---

## الخطوة ٣: الفحص الذاتي

~~~js الفحص الذاتي: accessibility
(() => {
  let pass = 0, all = 0;
  const ok = (name, bad, why) => { all++; if (!bad.length) pass++; console.log((bad.length ? 'FAIL ' : 'PASS ') + name + (bad.length ? ' ← ' + why + ': ' + bad.slice(0, 3).join(' ، ') : '')); };
  const tag = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : el.classList.length ? '.' + el.classList[0] : '');
  const all$ = s => [...document.querySelectorAll(s)];
  const named = el => (el.getAttribute('aria-label') || '').trim() || (el.getAttribute('aria-labelledby') || '').split(' ').some(id => document.getElementById(id)) || el.textContent.trim() || [...el.querySelectorAll('img[alt]')].some(i => i.alt.trim());
  ok('1 الصفحة ليها lang', document.documentElement.lang ? [] : ['<html>'], 'قارئ الشاشة مش عارف ينطق بأنهي لغة');
  ok('2 كل صورة ليها alt', all$('img:not([alt])').map(tag), 'صورة من غير alt خالص (الديكور ياخد alt="")');
  ok('3 كل حقل ليه label ظاهر', all$('input:not([type=hidden],[type=submit],[type=button]), select, textarea').filter(el => !el.labels.length && !el.getAttribute('aria-labelledby')).map(el => tag(el) + (el.placeholder ? ' (placeholder بس)' : '')), 'الـ placeholder بيختفي أول ما تكتب ومش label');
  ok('4 كل زرار ولينك ليه اسم', all$('button, a[href], [role=button]').filter(el => !named(el)).map(tag), 'قارئ الشاشة هيقول «زرار» وبس');
  ok('5 قيم ARIA سليمة', all$('[aria-expanded], [aria-pressed], [aria-checked]').filter(el => ['aria-expanded', 'aria-pressed', 'aria-checked'].some(a => el.hasAttribute(a) && !['true', 'false', 'mixed'].includes(el.getAttribute(a)))).map(tag), 'القيمة لازم true أو false');
  ok('6 اللي بيتداس عليه بيتوصل بالكيبورد', all$('[onclick]').filter(el => !el.matches('a[href], button, input, select, textarea, summary') && !(el.tabIndex >= 0 && el.getAttribute('role'))).map(tag), 'عنصر عليه onclick و Tab مش بيوصله، استخدم button');
  const lum = c => { const v = c.match(/[\d.]+/g).slice(0, 3).map(x => x / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const bgOf = el => { for (let p = el; p; p = p.parentElement) { const b = getComputedStyle(p).backgroundColor, a = b.match(/[\d.]+/g); if (a && (a.length < 4 || +a[3] === 1)) return b; } return 'rgb(255, 255, 255)'; };
  const low = all$('body *').filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.data.trim()) && el.getClientRects().length).map(el => {
    const s = getComputedStyle(el), L1 = lum(s.color), L2 = lum(bgOf(el)), r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const big = parseFloat(s.fontSize) >= 24 || parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700;
    return r < (big ? 3 : 4.5) ? tag(el) + ' ' + r.toFixed(2) + ':1' : null; }).filter(Boolean);
  ok('7 تباين الكلام (axe بيسكت عن العربي المتوصل)', low, 'أقل من 4.5:1 (أو 3:1 للكبير)');
  const hs = all$('h1, h2, h3, h4, h5, h6').map(h => +h.tagName[1]), jumps = hs.filter((h, i) => i && h > hs[i - 1] + 1).map(h => 'h' + h);
  ok('8 العناوين مبتنطش مستوى', jumps, 'عنوان نط مستوى');
  ok('9 القوايم جواها li بس', all$('ul > :not(li, script, template), ol > :not(li, script, template)').map(tag), 'قارئ الشاشة بيعدّ العناصر غلط');
  ok('10 الأهداف ٢٤×٢٤ على الأقل (WCAG 2.2)', all$('button, a[href], input, select').filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.width < 24 || r.height < 24) && getComputedStyle(el).display !== 'inline'; }).map(tag), 'صغيرة على الصباع');
  console.log('النتيجة: ' + pass + ' من ' + all + ' (وبعدها شغّل axe، وجرّب بالكيبورد بس)');
})();
~~~

~~~text Chrome، الصفحة البايظة
FAIL 1 الصفحة ليها lang ← قارئ الشاشة مش عارف ينطق بأنهي لغة: <html>
FAIL 2 كل صورة ليها alt ← صورة من غير alt خالص (الديكور ياخد alt=""): img
FAIL 3 كل حقل ليه label ظاهر ← الـ placeholder بيختفي أول ما تكتب ومش label: input (placeholder بس) ، input (placeholder بس) ، select
FAIL 4 كل زرار ولينك ليه اسم ← قارئ الشاشة هيقول «زرار» وبس: button.menu-btn ، a
FAIL 5 قيم ARIA سليمة ← القيمة لازم true أو false: button.menu-btn
FAIL 6 اللي بيتداس عليه بيتوصل بالكيبورد ← عنصر عليه onclick و Tab مش بيوصله، استخدم button: div.fake-btn
FAIL 7 تباين الكلام (axe بيسكت عن العربي المتوصل) ← أقل من 4.5:1 (أو 3:1 للكبير): p.hint 2.56:1
FAIL 8 العناوين مبتنطش مستوى ← عنوان نط مستوى: h4
FAIL 9 القوايم جواها li بس ← قارئ الشاشة بيعدّ العناصر غلط: div
FAIL 10 الأهداف ٢٤×٢٤ على الأقل (WCAG 2.2) ← صغيرة على الصباع: input ، input ، select
النتيجة: 0 من 10 (وبعدها شغّل axe، وجرّب بالكيبورد بس)
~~~

وأول ما شغّلته على الحل المرجعي طلّع [[9 من 10]]: الحقول الافتراضية في Chrome ارتفاعها حوالي 21px، يعني أقل من 24 (WCAG 2.2 2.5.8 Target Size Minimum). زوّدت [[input, select, .btn { min-height: 44px; }]] (44 هو اللي Apple و WCAG AAA بيقولوا عليه) وبقى:

~~~text Chrome، الحل المرجعي
PASS 1 الصفحة ليها lang
PASS 2 كل صورة ليها alt
PASS 3 كل حقل ليه label ظاهر
PASS 4 كل زرار ولينك ليه اسم
PASS 5 قيم ARIA سليمة
PASS 6 اللي بيتداس عليه بيتوصل بالكيبورد
PASS 7 تباين الكلام (axe بيسكت عن العربي المتوصل)
PASS 8 العناوين مبتنطش مستوى
PASS 9 القوايم جواها li بس
PASS 10 الأهداف ٢٤×٢٤ على الأقل (WCAG 2.2)
النتيجة: 10 من 10 (وبعدها شغّل axe، وجرّب بالكيبورد بس)
~~~

إزاي الفحص بيحسب التباين: لكل عنصر فيه كلام مباشر، بياخد لون الكلام، ويطلع لفوق في الآباء لحد أول خلفية مش شفافة (ولو ملقاش يفترض أبيض)، ويحسب الـ luminance للاتنين بمعادلة WCAG، والنسبة. والكلام الكبير (24px، أو 18.66px و bold) حده 3 بدل 4.5. وده تبسيط: مش بيحسب الخلفيات الصور ولا الـ gradients ولا الشفافية بين طبقتين، فلو الخلفية صورة قيس بالـ color picker في DevTools.

---

## الخطوة ٤: الكيبورد بإيدك (٢ دقيقة)

| جرّب | المفروض يحصل |
|---|---|
| Tab من أول الصفحة | اللوجو مش بيوصله (مش لينك)، وبعدين زرار القايمة، ولينك السلة، والحقول بالترتيب، و «اشترك» |
| كل Tab | فيه إطار واضح حوالين العنصر (لو مفيش، ارجع لـ [[:focus-visible]]) |
| Enter على «اشترك» وانت في آخر حقل | الفورم بيتبعت، والحقل الفاضي اللي [[required]] بيوقفه برسالة |
| Space على زرار القايمة | [[aria-expanded]] بيتقلب [[true]] والقايمة بتظهر (ده محتاج JS صغير) |
| Shift+Tab | بيرجع بنفس الترتيب بالعكس |

ولو عايز تسمع الصفحة: NVDA على ويندوز (مجاني) أو Narrator (Ctrl+Win+Enter)، وشوف درس «كيبورد وقارئ شاشة» في التاب ده.

## خلاصة

- axe بيلقط الأخطاء اللي ليها قاعدة: [[lang]] و [[alt]] والأسماء وقيم ARIA والعناوين والقوايم.
- axe صفر مش معناه accessible: placeholder مكان label، و [[<div onclick>]]، والتباين في العربي المتوصل لازم يتقاسوا بفحص تاني.
- كل عنصر بيتداس عليه = [[<button>]] أو [[<a href>]]. والأيقونة = [[aria-label]] على الزرار و [[aria-hidden]] على الـ svg.
- الحقول والأزرار مش أقل من 24 × 24، والأحسن 44.
- الكيبورد بإيدك في الآخر دايمًا.`,
          try: R`انسخ الصفحة البايظة من الشرح لملف، وافتحه في Chrome، وشغّل كود axe (لازم 8 violations) والفحص الذاتي (لازم [[0 من 10]]). صلّح خطأ خطأ لحد ما الاتنين يبقوا نضاف، وفي الآخر اعمل جدول الكيبورد بإيدك من غير ماوس خالص.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<button><img src="trash.svg" alt=""></button>]]. الزرار ده اسمه إيه لقارئ الشاشة؟ وaxe هيقول إيه؟ وبعدين: نفس الزرار بس [[alt="امسح الطلب"]]؟`, done: R`كتبت إن الأول ملوش اسم (الـ alt الفاضي بيقول «الصورة ديكور») و axe هيطلّع [[button-name]]، والتاني اسمه «امسح الطلب» من الـ alt. شغّلت axe على الاتنين وطلع كده، وشفت الاسم في DevTools › Accessibility › Name.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** قايمة منسدلة [[<div class="dropdown" onclick="toggle()">الحساب ▾</div>]] وتحتها [[<div class="menu" style="display:none">]] فيها ٣ لينكات. حوّلها لحاجة بتشتغل بالكيبورد وقارئ الشاشة: [[<button aria-expanded aria-controls>]]، و Escape بيقفل ويرجّع الـ focus للزرار.`, done: R`Tab بيوصل للزرار، و Enter و Space بيفتحوا، و [[aria-expanded]] بيتقلب [[true]] و [[false]] (شفته في Elements وهو بيتغير)، و Escape بيقفل والـ focus بيرجع للزرار، والفحص الذاتي بند ٦ PASS، و axe صفر.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** خد ألوان الثيم بتاع أي مشروع عندك (أو اعمل ٦ ألوان متخيلة: كلام عادي، وكلام باهت، ولينك، وزرار، وخطأ، ونجاح) واحسب تباين كل لون كلام على الخلفية بتاعته. اعمل جدول، وصلّح أي واحد تحت 4.5 بأقل تغيير في اللون.`, done: R`الجدول فيه كل زوج والنسبة برقمين عشريين، والأرقام نفس اللي بيطلعها الـ color picker في DevTools، وكل لون اتصلّح مكتوب قبله وبعده والنسبة الجديدة (فوق 4.5)، واللون الجديد قريب من القديم بالعين.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل axe و Lighthouse (Accessibility) والفحص الذاتي على نفس الصفحة البايظة. اعمل جدول: كل خطأ من العشرة، وأنهي أداة لقطته.`, done: R`الجدول فيه ١٠ صفوف و ٣ عواميد، ومكتوب إن placeholder والـ div والتباين العربي اتلقطوا بالفحص الذاتي بس (أو مكتوب لو Lighthouse لقط حاجة منهم)، ومكتوب رقم Lighthouse قبل وبعد التصليح.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق axe-core على GitHub (ملف [[doc/API.md]])، اعرف إزاي تشغّل قاعدة واحدة بس ([[runOnly]])، وإزاي تقصر الفحص على جزء من الصفحة (context)، وإزاي تقفل قاعدة. وشغّل [[color-contrast]] لوحدها على [[form]] بس.`, done: R`عندك سطر [[axe.run('form', { runOnly: ['color-contrast'] })]] شغال وبيطبع النتيجة، ومكتوب إزاي تقفل قاعدة ([[rules: { 'heading-order': { enabled: false } }]])، وإن قفل قاعدة عشان «تطلع صفر» مش تصليح.` },
          ],
          deep: {
            why: R`حوالي ١٦٪ من الناس عندهم إعاقة من نوع ما (رقم منظمة الصحة العالمية في ٢٠٢٣، من موقعهم)، ومعاهم أي حد إيده مشغولة، أو شاشته فيها شمس، أو بيستخدم كيبورد بس. والأخطاء العشرة دي بتمنع حد يشترك أصلًا (الزرار اللي Tab مش بيوصله)، أو بتخليه يتوه (الحقل اللي اسمه اختفى). وفي الشغل: مناقصات وعقود كتير بتطلب WCAG AA مكتوب، و axe أو Lighthouse بيتشغّلوا في الاستلام.`,
            how: R`المتصفح بيبني من الـ DOM شجرة تانية اسمها accessibility tree: كل عنصر فيها ليه role (button، و link، و textbox) و name و state ([[expanded]]). قارئ الشاشة بيقرا الشجرة دي مش الـ HTML. و [[<button>]] بياخد role و focus و Enter و Space ببلاش، و [[<div>]] بياخد ولا حاجة. والاسم بيتحسب بالترتيب: [[aria-labelledby]]، وبعدين [[aria-label]]، وبعدين [[<label>]] المربوط، وبعدين المحتوى (والـ [[alt]] جواه)، وبعدين [[title]] أو [[placeholder]]. وعشان كده axe بيقبل الـ placeholder: هو فعلًا آخر مصدر في الخوارزمية. و axe نفسه script بيمشي على الـ DOM ويطبّق قواعد ليها إجابة أكيدة، وأي حاجة محتاجة حكم (هل الـ alt ده وصف كويس؟ هل الترتيب منطقي؟) بيحطها في incomplete أو مبيفحصهاش.`,
            when: R`شغّل axe بعد أي component جديد (ثانية واحدة من الـ Console)، وفي الـ CI بـ [[@axe-core/playwright]] على الصفحات المهمة. والفحص الذاتي والكيبورد قبل أي تسليم. وقارئ الشاشة الحقيقي (NVDA) قبل الإطلاق على الفورمات والمودالات والقوايم المنسدلة، لأنها أكتر حاجات بتبوظ.`,
            mistakes: R`تقفل قاعدة في axe عشان الرقم يبقى صفر. أو تحط [[aria-label]] على [[<div>]] وتفتكره بقى زرار (لسه مفيش role ولا focus). أو [[role="button"]] من غير [[tabindex="0"]] ومن غير Enter و Space. أو [[aria-hidden="true"]] على عنصر بيتداس عليه، فبيختفي من قارئ الشاشة ويفضل في Tab. أو تعتمد على axe في التباين في صفحة عربي. أو [[alt]] بيكرر الكلام اللي جنب الصورة («صورة كتاب» تحت عنوان الكتاب). أو تختار المستوى بتاع العنوان عشان حجمه ([[h4]] عشان «صغير»).`,
          },
          sol: R`الحل المرجعي الصفحة كاملة تحت. axe 4.14.0 عليها [[0 violations]]، والفحص الذاتي [[10 من 10]]، و Tab بيمشي على زرار القايمة ثم السلة ثم الاسم والإيميل والمدينة و «اشترك».

الفرق عن البايظة: [[lang="ar"]]، و [[alt]] على اللوجو، و [[aria-label]] و [[aria-expanded="false"]] و [[aria-controls]] على زرار القايمة، و [[aria-label]] على لينك السلة، و [[aria-hidden]] على الأيقونات، و [[h2]] بدل [[h4]]، وكل حقل في [[.field]] بـ [[<label for>]]، و [[aria-describedby]] للجملة اللي تحت الإيميل، ولونها [[#52525b]]، و [[<button type="submit">]] بدل الـ div، و [[<li>]] بدل الـ div في القايمة، و [[min-height: 44px]] للحقول والزرار.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشترك في نادي القراءة</title>
<style>
body { font-family: system-ui, sans-serif; padding: 16px; }
.hint { color: #52525b; }
.menu-btn { width: 44px; height: 44px; }
.btn { padding: 8px 16px; background: #4f46e5; color: #fff; border: 0; }
.field { display: grid; gap: 4px; margin-block-end: 12px; }
input, select, .btn { min-height: 44px; font: inherit; }
</style>
</head>
<body>
<header>
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'/%3E" width="40" height="40" alt="نادي القراءة">
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="القايمة"><svg width="20" height="20" aria-hidden="true"><path d="M2 5h16M2 10h16M2 15h16" stroke="#000"/></svg></button>
  <nav id="menu" hidden><a href="/books">الكتب</a></nav>
  <a href="/cart" aria-label="السلة"><svg width="20" height="20" aria-hidden="true"><circle cx="10" cy="10" r="8"/></svg></a>
</header>
<main>
  <h1>اشترك في نادي القراءة</h1>
  <h2>بياناتك</h2>
  <form>
    <div class="field"><label for="name">الاسم</label><input id="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="email">الإيميل</label><input id="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint"><p class="hint" id="email-hint">هنبعتلك كتاب كل شهر</p></div>
    <div class="field"><label for="city">المدينة</label><select id="city"><option>القاهرة</option><option>الإسكندرية</option></select></div>
    <button class="btn" type="submit">اشترك</button>
  </form>
  <ul class="perks"><li>شحن مجاني</li><li>خصم ١٠٪</li></ul>
</main>
</body>
</html>`,
          flag: "script",
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const lum = hex => { const h = hex.replace("#", ""); const v = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
for (const [fg, bg] of [["#a1a1aa", "#ffffff"], ["#52525b", "#ffffff"], ["#ffffff", "#4f46e5"]]) console.log(fg + " on " + bg + ": " + ratio(fg, bg).toFixed(2) + ":1 " + (ratio(fg, bg) >= 4.5 ? "AA" : "FAIL"));
const html = '<label for="name">الاسم</label><input id="name"><input type="email" placeholder="الإيميل"><label for="phone">الموبايل</label><input id="tel">';
const ids = [...html.matchAll(/<input[^>]*\bid="([^"]+)"/g)].map(m => m[1]);
const fors = [...html.matchAll(/<label[^>]*\bfor="([^"]+)"/g)].map(m => m[1]);
const inputs = [...html.matchAll(/<input[^>]*>/g)].length;
console.log("inputs " + inputs + ", labelled " + ids.filter(id => fors.includes(id)).length + ", label for nothing: " + fors.filter(f => !ids.includes(f)).join(" "));`, expect: [R`#a1a1aa on #ffffff: 2.56:1 FAIL`, R`#52525b on #ffffff: 7.73:1 AA`, R`#ffffff on #4f46e5: 6.29:1 AA`, R`inputs 3, labelled 1, label for nothing: phone`] },
          ],
        },
        {
          cmd: "مسائل بالـ JS على الصفحة",
          title: "٤ مسائل بتتصحح لوحدها: جدول من بيانات، ونسبة التباين، و px لـ rem، و clamp() من مقاسين",
          learn: R`تكتب منطق الصفحة كدوال صافية (pure functions) بتاخد بيانات وترجّع نص أو رقم، وتختبرها من غير متصفح، وبعدين توصّلها بالـ DOM في سطر واحد.`,
          out: R`٥ دوال ([[buildTable]] و [[contrastRatio]] و [[passesAA]] و [[pxToRem]] و [[fluidClamp]]) بتعدّي ١٥ اختبار هنا في الصفحة، ومستخدمة في صفحة حقيقية اتقاست في Chrome على ٤ عروض.`,
          use: {
            prog: R`الفصل بين «حساب» و «عرض» هو أهم عادة في الـ frontend: الحساب بيتختبر في ملّي ثانية من غير متصفح، والعرض سطر [[innerHTML]] أو [[textContent]]. والمربع اللي بيصحح هنا نفسه بيشغّل الكود في Web Worker مفيهوش [[document]] خالص، فلازم الدوال تبقى صافية.`,
            work: R`الأربعة دول أدوات بتتعمل فعلًا في كل design system: جدول من JSON جاي من API (ومن غير XSS)، ومدقق ألوان الثيم، وتحويل تصميم px لـ rem عشان حجم الخط بتاع اليوزر يشتغل، و fluid typography بـ [[clamp()]] بدل ٥ media queries.`,
            cs: R`الـ escape هو أول دفاع ضد XSS: أي نص جاي من برا بيتحوّل لـ entities قبل ما يدخل HTML. والـ luminance فيها تحويل من gamma لخطي (linearization). و [[clamp()]] معادلة خط مستقيم y = mx + b بين نقطتين، وده كل الـ fluid typography.`,
          },
          desc: R`كل مسألة هنا دالة بتاخد مدخل بسيط وترجّع نص أو رقم، وليها حالات طرفية محددة. الاختبارات اللي في المربع تحت بتتشغل على كودك وتقولك كل حالة عدّت ولا لأ.

• **[[buildTable(rows, columns)]]**: بترجّع نص HTML لجدول فيه [[<thead>]] و [[<th scope="col">]] و [[<tbody>]]. وأي قيمة بتتعمل escape ([[<]] تبقى [[&lt;]])، والصفر بيظهر [[0]] مش فاضي، والمفتاح الناقص خانة فاضية، ولو مفيش صفوف صف واحد «مفيش بيانات» بـ [[colspan]].
• **[[contrastRatio(a, b)]]**: نسبة التباين بين لونين hex بمعادلة WCAG برقمين عشريين، و [[#000]] على [[#fff]] = 21. و [[passesAA(fg, bg, large)]] بتقول بيعدّي 4.5 (أو 3 للكلام الكبير).
• **[[pxToRem(css, base)]]**: بتحوّل كل [[Npx]] في نص CSS لـ rem (16 افتراضي)، و [[0px]] بتبقى [[0]]، ومبتلمسش اسم class زي [[.px-4]].
• **[[fluidClamp(minPx, maxPx, minVw, maxVw)]]**: بترجّع [[clamp(1rem, 0.5714rem + 1.9048vw, 2rem)]] اللي بيخلي الخط 16px على 360 و 32px على 1200 وبيكبر بينهم على خط مستقيم.

ده تطبيق على دروس «rem و em» و «clamp()» و «contrast ratio» و «table» في التاب ده، ودروس الـ strings والـ regex في تاب JavaScript.`,
          example: R`const rows = [{ name: 'سارة', total: 450 }, { name: '<b>علي</b>', total: 0 }];
const cols = [{ key: 'name', label: 'العميل' }, { key: 'total', label: 'الإجمالي' }];
document.querySelector('#out').innerHTML = buildTable(rows, cols);
document.querySelector('h1').style.fontSize = fluidClamp(16, 32, 360, 1200);
console.log(getComputedStyle(document.querySelector('h1')).fontSize, contrastRatio('#767676', '#ffffff'));`,
          lines: [
            R`البيانات: صفين، والتاني اسمه فيه HTML ([[<b>علي</b>]]) عشان نجرّب إن الـ escape شغال، والإجمالي صفر عشان نجرّب إنه بيظهر.`,
            R`العواميد: كل عمود [[key]] بيقول ياخد القيمة منين في الصف، و [[label]] الكلام اللي في الـ [[<th>]]. الترتيب هنا هو ترتيب العواميد في الجدول.`,
            R`بنحط ناتج [[buildTable]] في الصفحة بـ [[innerHTML]]. ده آمن هنا **بس** لأن الدالة عاملة escape لكل قيمة. والخانة التانية هتعرض [[<b>علي</b>]] ككلام زي ما هو، مش كلمة bold.`,
            R`بنحط الـ [[clamp()]] اللي الدالة طلّعته كحجم خط للعنوان مباشرة من JavaScript. في مشروع حقيقي بتطلّعه مرة وتحطه في ملف الـ CSS.`,
            R`بنقرا حجم الخط اللي المتصفح حسبه فعلًا على العرض الحالي، ونسبة تباين الرمادي [[#767676]] على أبيض. في Chrome على 360 طلع [[16px 4.54]]، وعلى 1200 طلع [[32px 4.54]].`,
          ],
          teach: R`## الفكرة في سطر

**الحساب في دالة صافية، والعرض سطر واحد.** الدالة الصافية بتاخد مدخل وترجّع ناتج من غير ما تلمس [[document]] ولا [[window]] ولا متغير برّاها، فبتتختبر في أي مكان: هنا في المربع (Web Worker مفيهوش DOM)، وفي Node، وفي المتصفح. كل الأرقام تحت اتشغّلت في Node 24.22.1 وفي Chrome بـ Playwright على ويندوز ١١.

---

## إزاي تحل أي مسألة من دول

1. **جدول مدخل ومخرج قبل الكود:** ٣ حالات عادية و ٣ طرفية (فاضي، صفر، سالب، كلام فيه رموز).
2. **أبسط حل يعدّي الحالة الأولى**، وبعدين الحالات الطرفية واحدة واحدة.
3. **شغّل الاختبارات** بعد كل تغيير (Ctrl+Enter في المربع).
4. **وصّلها بالصفحة** في الآخر، واتأكد بعينك مرة واحدة.

---

## المسألة ١: [[buildTable(rows, columns)]]

| المدخل | المخرج (الجزء المهم) | ليه الحالة دي |
|---|---|---|
| [[[{ name: "سارة", total: 450 }]]] | [[<tr><td>سارة</td><td>450</td></tr>]] | الحالة العادية: صف لكل object وخانة لكل عمود بنفس ترتيب [[columns]] |
| اسم فيه [[<img src=x onerror="alert(1)">]] | [[<td>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</td>]] | من غير escape الصورة بتتعمل والـ [[onerror]] بيشغّل JavaScript |
| [[{ name: "علي", total: 0 }]] | [[<td>0</td>]] مش [[<td></td>]] | الصفر قيمة حقيقية، و [[||]] بيمسحها لأنها falsy |
| [[{ name: "منى" }]] (من غير total) | [[<td></td>]] مش [[<td>undefined</td>]] | المفتاح الناقص خانة فاضية، مش كلمة [[undefined]] قدام العميل |
| [[[]]] (مفيش صفوف) | [[<tr><td colspan="2">مفيش بيانات</td></tr>]] | جدول فاضي من غير رسالة بيبان كأنه لسه بيحمّل |

الـ escape: ٥ حروف بس بيتغيروا: [[&]] لـ [[&amp;]] (لازم الأول، وإلا هتعمل escape للـ escape)، و [[<]] و [[>]]، و [["]] لـ [[&quot;]]، و [[']] لـ [[&#39;]]. ومن غيره، أي يوزر اسمه فيه [[<img onerror>]] بيشغّل JavaScript في صفحة كل اللي بيشوفوا الجدول، وده XSS (شوف تاب الأمان).

والصفر: [[r.total || '']] بيرجّع [[""]] لما القيمة صفر، لأن الصفر falsy. الصح [[r.total ?? '']]: الـ [[??]] بيبدّل [[null]] و [[undefined]] بس.

---

## المسألة ٢: [[contrastRatio(a, b)]] و [[passesAA]]

المعادلة من WCAG 2.2 بالخطوات:

1. hex لـ ٣ أرقام من 0 لـ 255. و [[#rgb]] المختصر كل حرف بيتكرر: [[#777]] = [[#777777]].
2. كل رقم ÷ 255، وبعدين نشيل الـ gamma: لو ≤ 0.04045 يبقى ÷ 12.92، وإلا [[((v + 0.055) / 1.055) ** 2.4]].
3. الـ luminance: [[0.2126 R + 0.7152 G + 0.0722 B]]. الأخضر أكبر معامل لأن العين أحس بيه.
4. النسبة: [[(الأفتح + 0.05) / (الأغمق + 0.05)]]، ومن غير ما يفرق مين الكلام ومين الخلفية.

| الألوان | النسبة | AA كلام عادي (4.5) | AA كلام كبير (3) |
|---|---|---|---|
| [[#000]] على [[#fff]] | 21 | ✓ | ✓ |
| [[#767676]] على [[#fff]] | 4.54 | ✓ (أفتح رمادي بيعدّي) | ✓ |
| [[#777777]] على [[#fff]] | 4.48 | ✗ (درجة واحدة فرقت) | ✓ |
| [[#a1a1aa]] على [[#fff]] | 2.56 | ✗ | ✗ |

ودي نفس المعادلة اللي في الفحص الذاتي بتاع الدرس اللي قبله، اللي لقطت التباين العربي اللي axe سكت عنه.

---

## المسألة ٣: [[pxToRem(css, base = 16)]]

| المدخل | المخرج | ليه الحالة دي |
|---|---|---|
| [[a{padding:24px 12px;margin:-8px 0px}]] | [[a{padding:1.5rem 0.75rem;margin:-0.5rem 0}]] | أكتر من رقم في نفس السطر، وسالب، وصفر بيتكتب [[0]] من غير وحدة |
| [[.px-4{gap:8px}]] | [[.px-4{gap:0.5rem}]] | اسم الـ class فيه [[px]] ولازم يفضل زي ما هو |
| [[@media (min-width: 768px){}]] | [[@media (min-width: 48rem){}]] | الـ media queries بالـ rem بتتحرك مع حجم خط اليوزر |
| [[h1{font-size:2.5px}]] | [[h1{font-size:0.1563rem}]] | كسر، والناتج ٤ أرقام عشرية بالكتير |
| [[a{gap:20px}]] و [[base = 10]] | [[a{gap:2rem}]] | مشاريع قديمة كانت بتخلي الـ html 10px |

الـ regex: [[/(-?\d*\.?\d+)px\b/g]]: سالب اختياري، وأرقام وكسر اختياري، وبعدهم [[px]] وبعدها حد كلمة ([[\b]]). و [[.px-4]] مش بيتطابق لأن قبل [[px]] نقطة مش رقم. وكل رقم بيتقرّب بـ [[Number((n / base).toFixed(4))]]، و [[Number()]] بتشيل الأصفار اللي في الآخر ([[1.5000]] تبقى [[1.5]]).

ليه rem أصلًا؟ لأن اليوزر اللي مكبّر الخط في إعدادات المتصفح (Settings › Appearance › Font size) الـ px بتاعك بيتجاهله، والـ rem بيكبر معاه. شوف درس «rem و em».

---

## المسألة ٤: [[fluidClamp(minPx, maxPx, minVw, maxVw)]]

عايز العنوان 16px على 360 و 32px على 1200 وبينهم خط مستقيم:

| الخطوة | الحساب | الرقم |
|---|---|---|
| الميل (slope) | [[(32 − 16) / (1200 − 360)]] | 0.019048 px لكل px من العرض |
| بالـ vw | [[slope × 100]] (لأن 1vw = 1% من العرض) | 1.9048vw |
| نقطة البداية | [[16 − 0.019048 × 360]] | 9.1429px = 0.5714rem |
| النتيجة | [[clamp(min, start + slope vw, max)]] | [[clamp(1rem, 0.5714rem + 1.9048vw, 2rem)]] |

وحطيت الناتج في صفحة وقست في Chrome:

~~~text Chrome، getComputedStyle(h1).fontSize
360: h1 = 16px
780: h1 = 23.9998px
1200: h1 = 32px
1600: h1 = 32px
~~~

على 780 (في النص بالظبط) المفروض 24، وطلع 23.9998 لأن الأرقام اتقربت لـ ٤ أرقام عشرية. وعلى 1600 فضل 32 لأن [[clamp]] قافل على الـ max. ولو [[maxVw]] أصغر من [[minVw]] الدالة بترمي [[RangeError]]، لأن الميل هيطلع بالسالب والخط هيصغر وانت بتكبّر الشاشة.

---

## الصفحة اللي بتجمعهم

بعد ما المربع يقول ✓، حط الدوال في [[<script>]] في صفحة فيها [[<h1>]] و [[<div id="out">]] وشغّل المثال. قست كده في Chrome:

~~~text Chrome، صفحة فيها الدوال والمثال
360: h1 = 16px، الخلايا: 2، فيه <b>؟ false، النص: <b>سارة</b>
1200: h1 = 32px، الخلايا: 2، فيه <b>؟ false، النص: <b>سارة</b>
~~~

«فيه [[<b>]]؟ false» يعني مفيش عنصر [[<b>]] اتعمل في الجدول، والكلام ظاهر بالحروف زي ما هو. ده الـ escape شغال في المتصفح الحقيقي، مش في الاختبار بس. (الصفحة دي كان الاسم فيها [[<b>سارة</b>]]، والمثال فيه [[<b>علي</b>]]، ونفس الفكرة.)

## خلاصة

- الدالة الصافية بترجّع، والـ DOM في سطر واحد برّاها.
- escape لأي نص قبل HTML، و [[&]] الأول. و [[??]] مش [[||]] عشان الصفر.
- التباين: hex، وبعدين ÷ 255 وشيل الـ gamma، وبعدين luminance، وبعدين النسبة. ورمادي [[#767676]] أفتح لون بيعدّي على أبيض.
- [[px ÷ 16 = rem]]، والـ regex بيتأكد إن قبل [[px]] رقم.
- [[clamp()]] = خط مستقيم بين نقطتين، والميل بالـ vw = الميل × 100.`,
          try: R`اكتب الخمس دوال في المربع اللي تحت ودوس «شغّل واختبر» (أو Ctrl+Enter). ابدأ بـ [[contrastRatio]] لأنها معادلة بس، وبعدين [[pxToRem]]، وسيب [[buildTable]] للآخر عشان الـ escape. لما الـ ١٥ يعدّوا، حطهم في صفحة وشغّل المثال على 360 و 1200.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[pxToRem("border: 1px solid; width: calc(100% - 32px)")]] هيرجّع إيه؟ وهل [[1px]] لازم يتحوّل؟ اكتب، وبعدين شغّل.`, done: R`كتبت [[border: 0.0625rem solid; width: calc(100% - 2rem)]] قبل التشغيل وطلع كده، وكتبت رأيك: الـ border الـ 1px الأحسن يفضل px (عشان الخط ميختفيش أو يتخن مع تكبير الخط)، وزوّدت خيار [[keep1px]] على الدالة واختبار ليه.` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «مدقق الألوان»: خانتين [[<input type="color">]] للكلام والخلفية، ومعاينة لجملة عربي بالألوان دي، والنسبة بـ [[contrastRatio]]، وتلات علامات AA و AAA و «كبير»، وبتتحدّث مع كل تغيير ([[input]] event).`, done: R`أسود على أبيض بيطلع 21 والتلاتة ✓، و [[#777777]] بيطلع 4.48 و AA ✗ و «كبير» ✓، والنتيجة بتتقري لقارئ الشاشة ([[aria-live="polite"]])، والصفحة نفسها بتعدّي الفحص الذاتي بتاع درس «accessibility: لحد axe صفر».` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف JSON فيه ٢٠ طلب متخيل (رقم، وعميل، ومبلغ، وحالة، وتاريخ) منهم واحد العميل فيه [[<script>]] وواحد المبلغ صفر وواحد من غير حالة. اعرضه بـ [[buildTable]]، وزوّد عمود فيه المبلغ متنسّق بـ [[Intl.NumberFormat('ar-EG')]].`, done: R`الجدول فيه ٢٠ صف، والـ [[<script>]] ظاهر كلام مش بيشتغل (Elements فيه [[&lt;script&gt;]])، والصفر ظاهر [[٠]]، والحالة الناقصة خانة فاضية، والمبالغ بالأرقام العربي، والجدول بيعدّي فحص الفيضان على 360 جوه [[.table-wrap]].` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** زوّد ٥ اختبارات من عندك على [[fluidClamp]] و [[contrastRatio]]: مقاسين متساويين ([[fluidClamp(16, 16, 360, 1200)]])، و [[minPx]] أكبر من [[maxPx]] (خط بيصغر)، و hex بحروف كابيتال، و hex بـ ٨ حروف (فيه alpha)، ومسافات قبل وبعد اللون. قرر السلوك الصح لكل واحد واكتبه في اسم الاختبار.`, done: R`الخمس اختبارات شغالين في المربع جنب الـ ١٥ الأصليين، وكل واحد اسمه بيقول السلوك اللي اخترته (مثلًا «alpha مش مدعوم وبيرمي error»)، والدوال اتعدّلت لحد ما الـ ٢٠ عدّوا.` },
            { lvl: 'تحدي', t: R`**refactor:** الدالة دي شغالة بس بتكتب في الـ DOM من جواها فمبتتختبرش من غير متصفح: [[function render(rows) { const t = document.createElement('table'); rows.forEach(r => { t.innerHTML += '<tr><td>' + r.name + '</td></tr>'; }); document.body.append(t); }]]. قسّمها لدالة صافية ترجّع نص (بالـ escape) وسطر واحد يحطه، وقارن الوقت على ٥٠٠٠ صف.`, done: R`عندك [[buildRows(rows)]] صافية بتعدّي اختبار escape في Node، وسطر [[out.innerHTML = buildRows(rows)]]، ورقمين من [[performance.now()]] على ٥٠٠٠ صف: الـ [[+=]] على [[innerHTML]] جوه loop أبطأ بكتير (كل مرة بيعيد بناء الجدول كله)، والفرق مكتوب برقم.` },
          ],
          deep: {
            why: R`أغلب باجات الـ frontend اللي بتوصل للمستخدم جاية من منطق مختلط بالعرض: دالة بتحسب وبتكتب في الـ DOM وبتقرا من [[window]] في نفس الوقت، فمحدش بيختبرها لأن اختبارها محتاج متصفح. ولما تفصلهم، الحساب بيبقى ١٥ اختبار في ملّي ثانية، والعرض سطر مش محتاج اختبار. والمسائل الأربعة مش تمارين وخلاص: هي أدوات بتتكتب فعلًا في كل design system.`,
            how: R`المربع اللي في الصفحة بيبني Web Worker من نص الكود بتاعك والاختبارات، والـ Worker ده thread منفصل مفيهوش [[document]] ولا [[window]]، فأي دالة بتلمس الـ DOM بتقع بـ [[ReferenceError]]. وبعد ٣ ثواني لو مخلصش بيتقفل (loop مبتخلصش). والدوال الصافية بتشتغل هناك زي ما بتشتغل في Node بالظبط. وفي الصفحة الحقيقية [[innerHTML]] بيعمل parse للنص كـ HTML، فلو النص فيه [[<]] حقيقي هيبقى tag، وعشان كده الـ escape بيحوّله لـ [[&lt;]] اللي المتصفح بيعرضه كحرف. والـ [[clamp()]] بيتحسب كل ما الشاشة تتغير: [[0.5714rem + 1.9048vw]] على 780 = 9.14 + 14.86 = 24px تقريبًا.`,
            when: R`أي حساب في الصفحة (سعر، وتاريخ، وفلترة، وتحويل وحدات، وتوليد HTML من بيانات) يبقى دالة صافية في ملف لوحده، واختبرها بـ Vitest (درس «اختبار JS بـ Vitest» في تاب JavaScript). و [[buildTable]] بالـ escape لما الجدول بسيط ومش محتاج تفاعل، ولو محتاج ترتيب وفلترة بقى component في React أو Vue (الـ JSX بيعمل escape لوحده). و [[fluidClamp]] للعناوين والمسافات الكبيرة، مش للكلام العادي (خليه [[1rem]] ثابت عشان القراية).`,
            mistakes: R`[[r[c.key] || '']] فالصفر يختفي. أو escape لـ [[<]] و [[>]] بس ونسيان [["]] (بيكسر attribute). أو escape لـ [[&]] في الآخر فتطلع [[&amp;lt;]]. أو [[toFixed(4)]] من غير [[Number()]] فتطلع [[1.5000rem]]. أو regex [[/(\d+)px/]] يحوّل [[.px-4]] أو ينسى السالب والكسور. أو معادلة التباين من غير شيل الـ gamma (النسبة تطلع غلط بكتير). أو [[clamp]] بالـ px بس ([[9.14px + 1.9vw]]) فمبيكبرش مع حجم خط اليوزر. أو [[document.querySelector]] جوه الدالة اللي بتتصحح فتقع في الـ Worker.`,
          },
          sol: R`الحل تحت هو اللي عدّى الـ ١٥ اختبار في Node 24.22.1 (نفس الاختبارات اللي في المربع). حل غلط (جدول من غير thead ولا escape، والتباين صفر، و [[replace(/px/g, 'rem')]]) عدّى صفر من ١٥، وأول ٦ رسايل من نفس محرك الاختبارات اللي في الصفحة كانوا كده:

~~~text حل غلط في المربع
✗ buildTable: صف واحد: المتوقع "<table><thead><tr><th scope=\"col\">العميل</th><th scope=\"col\">الإجمالي</th></tr></thead><tbody><tr><td>سارة</td><td>450</td></tr></tbody></table>" بس طلع "<table><tr><td>سارة</td><td>450</td></tr></table>"
✗ buildTable: الكلام بيتعمله escape (مفيش XSS): المتوقع true بس طلع false
✗ buildTable: الصفر بيظهر، والخانة الناقصة فاضية: المتوقع true بس طلع false
✗ buildTable: مفيش صفوف: المتوقع true بس طلع false
✗ contrastRatio: أسود على أبيض = 21: المتوقع 21 بس طلع 0
✗ contrastRatio: #767676 على أبيض = 4.54، والترتيب مش فارق: المتوقع [4.54,4.54] بس طلع [0,0]
~~~

النقط اللي بتوقع الناس: الـ [[&]] أول حرف في الـ escape، و [[??]] مش [[||]]، و [[\b]] بعد [[px]] في الـ regex، و [[Number()]] حوالين [[toFixed(4)]]، والترتيب في [[contrastRatio]] بـ [[sort]] عشان النسبة متطلعش أقل من 1.`,
          solCode: R`function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function buildTable(rows, columns) {
  const head = '<thead><tr>' + columns.map(c => '<th scope="col">' + escapeHtml(c.label) + '</th>').join('') + '</tr></thead>';
  const body = rows.length
    ? rows.map(r => '<tr>' + columns.map(c => '<td>' + escapeHtml(r[c.key] ?? '') + '</td>').join('') + '</tr>').join('')
    : '<tr><td colspan="' + columns.length + '">مفيش بيانات</td></tr>';
  return '<table>' + head + '<tbody>' + body + '</tbody></table>';
}
function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(ch => ch + ch).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error('لون مش مفهوم: ' + hex);
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round((hi + 0.05) / (lo + 0.05) * 100) / 100;
}
function passesAA(fg, bg, large = false) {
  return contrastRatio(fg, bg) >= (large ? 3 : 4.5);
}
const trim4 = n => String(Number(n.toFixed(4)));
function pxToRem(css, base = 16) {
  return css.replace(/(-?\d*\.?\d+)px\b/g, (m, n) => Number(n) === 0 ? '0' : trim4(n / base) + 'rem');
}
function fluidClamp(minPx, maxPx, minVw, maxVw, base = 16) {
  if (maxVw <= minVw) throw new RangeError('maxVw لازم أكبر من minVw');
  const slope = (maxPx - minPx) / (maxVw - minVw), start = minPx - slope * minVw;
  return 'clamp(' + trim4(minPx / base) + 'rem, ' + trim4(start / base) + 'rem + ' + trim4(slope * 100) + 'vw, ' + trim4(maxPx / base) + 'rem)';
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`// كل دالة بترجّع نص أو رقم، ومن غير document (الكود بيتشغل في Worker)
function buildTable(rows, columns) {}
function contrastRatio(a, b) {}
function passesAA(fg, bg, large = false) {}
function pxToRem(css, base = 16) {}
function fluidClamp(minPx, maxPx, minVw, maxVw, base = 16) {}`,
            tests: R`const cols = [{ key: "name", label: "العميل" }, { key: "total", label: "الإجمالي" }];
test("buildTable: صف واحد", () => expect(buildTable([{ name: "سارة", total: 450 }], cols)).toBe('<table><thead><tr><th scope="col">العميل</th><th scope="col">الإجمالي</th></tr></thead><tbody><tr><td>سارة</td><td>450</td></tr></tbody></table>'));
test("buildTable: الكلام بيتعمله escape (مفيش XSS)", () => expect(buildTable([{ name: '<img src=x onerror="alert(1)">', total: "A&B" }], cols).includes('<td>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</td><td>A&amp;B</td>')).toBe(true));
test("buildTable: الصفر بيظهر، والخانة الناقصة فاضية", () => expect(buildTable([{ name: "علي", total: 0 }, { name: "منى" }], cols).includes("<tr><td>علي</td><td>0</td></tr><tr><td>منى</td><td></td></tr>")).toBe(true));
test("buildTable: مفيش صفوف", () => expect(buildTable([], cols).includes('<tbody><tr><td colspan="2">مفيش بيانات</td></tr></tbody>')).toBe(true));
test("contrastRatio: أسود على أبيض = 21", () => expect(contrastRatio("#000", "#fff")).toBe(21));
test("contrastRatio: #767676 على أبيض = 4.54، والترتيب مش فارق", () => expect([contrastRatio("#767676", "#ffffff"), contrastRatio("#ffffff", "#767676")]).toEqual([4.54, 4.54]));
test("contrastRatio: نفس اللون = 1", () => expect(contrastRatio("#4f46e5", "#4F46E5")).toBe(1));
test("passesAA: #777 بيقع في الكلام العادي وينجح في الكبير", () => expect([passesAA("#777777", "#ffffff"), passesAA("#777777", "#ffffff", true)]).toEqual([false, true]));
test("contrastRatio: لون مش hex بيرمي error", () => expect(() => contrastRatio("red", "#fff")).toThrow("لون مش مفهوم"));
test("pxToRem: أرقام عادية وسالبة وصفر", () => expect(pxToRem("a{padding:24px 12px;margin:-8px 0px}")).toBe("a{padding:1.5rem 0.75rem;margin:-0.5rem 0}"));
test("pxToRem: مبيلمسش اسم class فيه px", () => expect(pxToRem(".px-4{gap:8px}")).toBe(".px-4{gap:0.5rem}"));
test("pxToRem: media query وكسور و base تاني", () => expect([pxToRem("@media (min-width: 768px){}"), pxToRem("h1{font-size:2.5px}"), pxToRem("a{gap:20px}", 10)]).toEqual(["@media (min-width: 48rem){}", "h1{font-size:0.1563rem}", "a{gap:2rem}"]));
test("fluidClamp: 16px على 360 لحد 32px على 1200", () => expect(fluidClamp(16, 32, 360, 1200)).toBe("clamp(1rem, 0.5714rem + 1.9048vw, 2rem)"));
test("fluidClamp: أرقام بتطلع مدوّرة", () => expect(fluidClamp(24, 48, 320, 1280)).toBe("clamp(1.5rem, 1rem + 2.5vw, 3rem)"));
test("fluidClamp: المقاسات بالعكس بترمي RangeError", () => expect(() => fluidClamp(16, 32, 1200, 360)).toThrow("maxVw"));`,
            solution: R`function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function buildTable(rows, columns) {
  const head = '<thead><tr>' + columns.map(c => '<th scope="col">' + escapeHtml(c.label) + '</th>').join('') + '</tr></thead>';
  const body = rows.length
    ? rows.map(r => '<tr>' + columns.map(c => '<td>' + escapeHtml(r[c.key] ?? '') + '</td>').join('') + '</tr>').join('')
    : '<tr><td colspan="' + columns.length + '">مفيش بيانات</td></tr>';
  return '<table>' + head + '<tbody>' + body + '</tbody></table>';
}
function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(ch => ch + ch).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error('لون مش مفهوم: ' + hex);
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round((hi + 0.05) / (lo + 0.05) * 100) / 100;
}
function passesAA(fg, bg, large = false) {
  return contrastRatio(fg, bg) >= (large ? 3 : 4.5);
}
const trim4 = n => String(Number(n.toFixed(4)));
function pxToRem(css, base = 16) {
  return css.replace(/(-?\d*\.?\d+)px\b/g, (m, n) => Number(n) === 0 ? '0' : trim4(n / base) + 'rem');
}
function fluidClamp(minPx, maxPx, minVw, maxVw, base = 16) {
  if (maxVw <= minVw) throw new RangeError('maxVw لازم أكبر من minVw');
  const slope = (maxPx - minPx) / (maxVw - minVw), start = minPx - slope * minVw;
  return 'clamp(' + trim4(minPx / base) + 'rem, ' + trim4(start / base) + 'rem + ' + trim4(slope * 100) + 'vw, ' + trim4(maxPx / base) + 'rem)';
}`
          },
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function buildTable(rows, columns) {
  const head = '<thead><tr>' + columns.map(c => '<th scope="col">' + escapeHtml(c.label) + '</th>').join('') + '</tr></thead>';
  const body = rows.length
    ? rows.map(r => '<tr>' + columns.map(c => '<td>' + escapeHtml(r[c.key] ?? '') + '</td>').join('') + '</tr>').join('')
    : '<tr><td colspan="' + columns.length + '">مفيش بيانات</td></tr>';
  return '<table>' + head + '<tbody>' + body + '</tbody></table>';
}
function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(ch => ch + ch).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error('لون مش مفهوم: ' + hex);
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round((hi + 0.05) / (lo + 0.05) * 100) / 100;
}
function passesAA(fg, bg, large = false) {
  return contrastRatio(fg, bg) >= (large ? 3 : 4.5);
}
const trim4 = n => String(Number(n.toFixed(4)));
function pxToRem(css, base = 16) {
  return css.replace(/(-?\d*\.?\d+)px\b/g, (m, n) => Number(n) === 0 ? '0' : trim4(n / base) + 'rem');
}
function fluidClamp(minPx, maxPx, minVw, maxVw, base = 16) {
  if (maxVw <= minVw) throw new RangeError('maxVw لازم أكبر من minVw');
  const slope = (maxPx - minPx) / (maxVw - minVw), start = minPx - slope * minVw;
  return 'clamp(' + trim4(minPx / base) + 'rem, ' + trim4(start / base) + 'rem + ' + trim4(slope * 100) + 'vw, ' + trim4(maxPx / base) + 'rem)';
}
console.log(buildTable([{ name: "<b>سارة</b>", total: 0 }], [{ key: "name", label: "العميل" }, { key: "total", label: "الإجمالي" }]));
console.log("contrast " + contrastRatio("#767676", "#fff") + " AA " + passesAA("#777777", "#ffffff"));
console.log(pxToRem(".px-4{padding:24px 12px;margin:-8px 0px}"));
console.log(fluidClamp(16, 32, 360, 1200));`, expect: [R`<td>&lt;b&gt;`, R`<td>0</td>`, R`contrast 4.54 AA false`, R`.px-4{padding:1.5rem 0.75rem;margin:-0.5rem 0}`, R`clamp(1rem, 0.5714rem + 1.9048vw, 2rem)`] },
          ],
        },
        {
          cmd: "صفحات من وصف",
          title: "ابني ٣ أجزاء من وصف مكتوب بس: باقات أسعار، وشاشة دخول، واختيار توصيل بـ :has()",
          learn: R`تحوّل وصف مكتوب (من عميل أو مدير منتج) لأرقام وحالات، وتبني الـ HTML الأول من غير CSS، وبعدين الموبايل، وبعدين الشاشة العريضة، وبعدين الحالات (اختيار وفوكس)، وتثبت كل جملة في الوصف بسطر في الفحص.`,
          out: R`٣ أجزاء بتعدّي فحص ذاتي [[8 من 8]] على 1200 و [[7 من 7]] على 360، والحل الغلط اللي «شكله قريب» بيقع في [[1 من 8]].`,
          use: {
            prog: R`أصعب حاجة في الـ CSS مش الخصائص، هي إنك تقرا «الزراير على خط واحد تحت» وتعرف إنها [[flex-direction: column]] و [[margin-block-start: auto]]. التمرين ده بيعلّمك تترجم الجملة لقاعدة.`,
            work: R`ده شكل شغلك الحقيقي: محدش هيديك Figma لكل حاجة. هيقولك «عايز ٣ باقات والوسطانية مميزة، وعلى الموبايل المميزة الأول»، وانت تبني وتثبت. والتلات أجزاء دول موجودين في أي SaaS أو متجر: الأسعار، والدخول، والاختيار في الـ checkout.`,
            cs: R`[[:has()]] أول selector في CSS بيبص على الأولاد عشان يقرر للأب («parent selector»)، والمتصفح بيعيد حسابه كل ما حالة أي ولد تتغير. والفحص بيعمل اختبار حالة (state test): يغيّر الاختيار ويقيس، ويرجّعه زي ما كان.`,
          },
          desc: R`كل جزء ليه وصف بالكلام زي ما العميل بيكتبه، وكل جملة فيه بتتحول لرقم أو حالة بيتقاس:

• **الباقات:** ٣ باقات جنب بعض بنفس العرض والطول، والزراير على خط واحد تحت مهما كان طول الكلام، والوسطانية «مميزة» بألوان معكوسة ([[#0f172a]] وكلام أبيض)، وعلى الموبايل عمود واحد **والمميزة الأول**، والزراير مش أقل من 44px.
• **الدخول:** على الشاشة العريضة نصين (صورة ديكور وفورم)، والفورم مش أعرض من 400px في نص نصه. على الموبايل الصورة مش موجودة والفورم بعرض الشاشة. الحقول والزرار بعرض الفورم وطولهم 44.
• **اختيار التوصيل:** ٣ كروت radio، المختار عليه إطار 2px [[#4f46e5]] وخلفية [[#eef2ff]] **من غير JavaScript**، والـ radio نفسه لسه بيوصله Tab، والـ focus باين على الكارت كله.

والطريقة واحدة للتلاتة: HTML سليم الأول ([[<article>]] و [[<label for>]] و [[<fieldset>]] و [[<legend>]])، وبعدين الموبايل، وبعدين [[@media (min-width: ...)]]، وبعدين الحالات بـ [[:has()]] و [[:focus-visible]]. ده تطبيق على دروس «:has()» و «fieldset و radio» و «flexbox» و «grid» و «focus-visible» في التاب ده، وعلى الوحدة دي كلها.`,
          example: R`.plan { display: flex; flex-direction: column; gap: 8px; }
.plan-btn { margin-block-start: auto; min-height: 44px; }
.featured { background: #0f172a; color: #fff; order: -1; }
@media (min-width: 720px) { .plans { grid-template-columns: repeat(3, 1fr); } .featured { order: 0; } }
.opt:has(input:checked) { border: 2px solid #4f46e5; background: #eef2ff; }
.opt:has(input:focus-visible) { outline: 3px solid #4f46e5; outline-offset: 2px; }`,
          lines: [
            R`كل باقة عمود flex: العنوان والسعر والمميزات والزرار فوق بعض، و 8px بينهم. وده اللي هيخلي الزرار يقدر يتزق لتحت.`,
            R`[[margin-block-start: auto]] على الزرار بياكل كل المسافة الفاضية **فوقه** في العمود، فبيتزق لآخر الكارت. ولأن الـ grid بيخلي الكروت الـ ٣ بنفس الطول، الزراير بتقف على خط واحد. و 44px أقل طول مريح للصباع.`,
            R`الباقة المميزة: الألوان معكوسة، و [[order: -1]] بيطلّعها الأول في العمود على الموبايل (الافتراضي [[order: 0]] لكل الباقي).`,
            R`من 720px: ٣ عواميد متساوية بـ [[repeat(3, 1fr)]]، و [[order: 0]] بيرجّع المميزة لمكانها في النص زي الـ HTML.`,
            R`الكارت اللي **جواه** radio مختار بياخد الإطار والخلفية. [[:has(input:checked)]] بيتحسب تاني كل ما الاختيار يتغير، من غير ولا سطر JavaScript.`,
            R`لما الـ radio ياخد focus بالكيبورد، الإطار بيظهر على الكارت كله مش على الدايرة الصغيرة بس، فاللي بيستخدم Tab والأسهم شايف هو فين.`,
          ],
          teach: R`## الفكرة في سطر

**كل جملة في الوصف = سطر في الفحص.** «الزراير على خط واحد» يعني [[bottom]] بتاع الـ ٣ زراير متساوي. «المميزة الأول على الموبايل» يعني [[top]] بتاعها أصغر واحد. ولو جملة مش قادر تقيسها، اسأل صاحب الوصف قبل ما تبني. كل الأرقام تحت من Chrome بـ Playwright على ويندوز ١١.

---

## الخطوات من الوصف للصفحة

1. **طلّع الأرقام والحالات:** اكتب جدول «الجملة ← الرقم اللي بيتقاس».
2. **HTML من غير CSS:** لو الصفحة مش مفهومة من غير CSS (عناوين، و labels، وترتيب منطقي)، الهيكل غلط.
3. **الموبايل الأول:** عمود واحد، وده غالبًا نص الشغل.
4. **الشاشة العريضة** في [[@media (min-width: ...)]].
5. **الحالات:** مختار، و focus، و hover، و disabled.
6. **الفحص** على 1200 و 360، وبالكيبورد.

---

## الجزء ١: الباقات [[#pricing]]

| الجملة في الوصف | بتتقاس إزاي | القاعدة |
|---|---|---|
| ٣ جنب بعض بنفس العرض | [[width]] الـ ٣ متساوي و [[top]] متساوي | [[grid-template-columns: repeat(3, 1fr)]] |
| بنفس الطول | [[height]] متساوي | الـ grid بيمد الخانات لطول أطول واحدة ([[align-items: stretch]] افتراضي) |
| الزراير على خط واحد تحت | [[bottom]] الزراير متساوي | الكارت [[flex column]] والزرار [[margin-block-start: auto]] |
| الوسطانية معكوسة | [[backgroundColor]] = [[rgb(15, 23, 42)]] و [[color]] أبيض | [[.featured]] |
| على الموبايل المميزة الأول | [[top]] بتاعها أصغر واحد | [[order: -1]] تحت 720 |
| الزراير ٤٤ | [[height]] ≥ 44 | [[min-height: 44px]] |

> **[[order]] والكيبورد:** [[order]] بيغيّر الشكل بس، وترتيب Tab بيفضل ترتيب الـ HTML. يعني على الموبايل الباقة المميزة فوق، بس Tab بيوصل زرار «بداية» الأول. WCAG (1.3.2 و 2.4.3) بيطلب الترتيب يبقى منطقي، وهنا الفرق باقة واحدة فمقبول. لو الفرق أكبر من كده، رتّب الـ HTML بالترتيب الأهم، وحرّك على الشاشة العريضة بـ [[grid-column]] بدل [[order]].

## الجزء ٢: شاشة الدخول [[#login]]

| الجملة | بتتقاس إزاي | القاعدة |
|---|---|---|
| نصين على العريضة | عرض [[.art]] = نص عرض [[#login]] | [[grid-template-columns: 1fr 1fr]] من 900 |
| الفورم مش أعرض من 400 في نص نصه | عرض الفورم ≤ 400 | [[max-width: 400px; margin-inline: auto]] |
| الصورة مش موجودة على الموبايل | [[display]] = [[none]] | [[.art { display: none }]] وبترجع من 900 |
| الحقول بعرض الفورم وطولها 44 | عرض كل حقل = عرض محتوى الفورم، والطول ≥ 44 | الفورم [[flex column]] و [[min-height: 44px]] |

## الجزء ٣: اختيار التوصيل [[#picker]]

| الجملة | بتتقاس إزاي | القاعدة |
|---|---|---|
| المختار بإطار بنفسجي من غير JS | الفحص بيدوس على الاختيار التاني ويقرا [[borderTopWidth]] و [[borderTopColor]] للتلاتة | [[.opt:has(input:checked)]] |
| الـ radio لسه بيوصله Tab | [[display]] مش [[none]] و [[visibility]] مش [[hidden]] | [[accent-color]] بدل ما تخفيه وترسم واحد مزيف |
| الـ focus على الكارت كله | (بالكيبورد بإيدك) | [[.opt:has(input:focus-visible)]] |

ليه مش [[display: none]] على الـ radio وترسم دايرة بـ [[::before]]؟ لأن [[display: none]] بيشيل العنصر من شجرة الـ accessibility ومن Tab، فالاختيار بيبقى بالماوس بس. ولو لازم شكل مخصص، استخبى بصريًا بس ([[opacity: 0; position: absolute]]) أو استخدم [[appearance: none]] وارسم على الـ input نفسه.

---

## الفحص الذاتي

الفحص بيعمل اختبار حالة في الجزء ٣: بيعمل [[click()]] على الـ radio التاني، ويقرا الإطار على التلات كروت، ويرجّع الاختيار الأصلي. ده بيثبت إن الـ CSS بيتفاعل مع الحالة فعلًا مش مكتوب على كارت واحد ثابت.

~~~js الفحص الذاتي: صفحات من وصف
(() => {
  const W = innerWidth, R = el => el.getBoundingClientRect(), cs = el => getComputedStyle(el);
  const near = (a, b) => Math.abs(a - b) <= 1.5, px = v => Math.round(v) + 'px';
  let pass = 0, all = 0;
  const ok = (name, cond, why) => { all++; if (cond) pass++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : ' ← ' + why)); };
  console.log('عرض الشاشة ' + W + 'px: جرّب على 1200 و 360');
  const plans = [...document.querySelectorAll('.plan')], rs = plans.map(R), feat = document.querySelector('.featured'), btns = plans.map(p => R(p.querySelector('.plan-btn')));
  if (W >= 720) {
    ok('1 الباقات: ٣ جنب بعض بنفس العرض والطول', rs.every(r => near(r.top, rs[0].top) && near(r.height, rs[0].height) && near(r.width, rs[0].width)), 'الأطوال ' + rs.map(r => px(r.height)).join(' و ') + ' والعروض ' + rs.map(r => px(r.width)).join(' و '));
    ok('1 الباقات: الزراير على خط واحد تحت', btns.every(b => near(b.bottom, btns[0].bottom)), 'آخر الزراير عند ' + btns.map(b => px(b.bottom)).join(' و ') + ': خلي الكارت flex column والزرار margin-block-start: auto');
  } else {
    ok('1 الباقات: عمود واحد والمميزة الأول', rs.every(r => near(r.width, R(document.querySelector('.plans')).width)) && R(feat).top === Math.min(...rs.map(r => r.top)), 'على الموبايل كل باقة بعرض الصفحة، والمميزة فوق الكل');
  }
  ok('1 الباقة المميزة لونها معكوس', cs(feat).backgroundColor === 'rgb(15, 23, 42)' && cs(feat).color === 'rgb(255, 255, 255)', 'الخلفية ' + cs(feat).backgroundColor + ' والمطلوب #0f172a بكلام أبيض');
  ok('1 الزراير ٤٤px على الأقل', btns.every(b => b.height >= 44), 'الطول ' + btns.map(b => px(b.height)).join(' و '));
  const art = document.querySelector('.art'), form = document.querySelector('.login-form'), fields = [...form.querySelectorAll('input, button')];
  if (W >= 900) ok('2 الدخول: نصين، والفورم في نص نصه', art.offsetWidth > 0 && near(R(art).width, R(document.querySelector('#login')).width / 2) && R(form).width <= 401, 'الصورة ' + px(R(art).width) + ' من ' + px(R(document.querySelector('#login')).width) + '، والفورم ' + px(R(form).width) + ' (أقصاه 400)');
  else ok('2 الدخول: الصورة مستخبية والفورم بعرض الشاشة', cs(art).display === 'none' && R(form).right <= W && R(form).left >= 0, 'على الموبايل الصورة لازم display: none والفورم مايطلعش برا (الفورم من ' + px(R(form).left) + ' لـ ' + px(R(form).right) + ')');
  ok('2 الحقول والزرار بعرض الفورم وطولهم ٤٤', fields.every(f => near(R(f).width, R(form).width - parseFloat(cs(form).paddingLeft) - parseFloat(cs(form).paddingRight)) && R(f).height >= 44), fields.map(f => px(R(f).width) + '×' + px(R(f).height)).join(' و '));
  const opts = [...document.querySelectorAll('.opt')], radios = opts.map(o => o.querySelector('input'));
  const border = o => cs(o).borderTopWidth + ' ' + cs(o).borderTopColor;
  const on = '2px rgb(79, 70, 229)', before = radios.findIndex(r => r.checked);
  const first = opts.map(border);
  radios[1].click();
  const second = opts.map(border);
  radios[before].click();
  ok('3 الاختيار: الكارت المختار بس عليه إطار بنفسجي', first[before] === on && second[1] === on && second.filter(b => b === on).length === 1, 'قبل الضغط: ' + first.join(' / ') + '، وبعد اختيار التاني: ' + second.join(' / ') + ' (من غير JS: .opt:has(input:checked))');
  ok('3 الاختيار: الـ radio لسه بيتوصل بالكيبورد', radios.every(r => cs(r).display !== 'none' && cs(r).visibility !== 'hidden'), 'display: none على الـ input بيشيله من الـ Tab ومن قارئ الشاشة');
  console.log('النتيجة: ' + pass + ' من ' + all);
})();
~~~

### الحل الغلط

الحل الغلط «شكله قريب» في لقطة شاشة: باقات [[inline-block]] بعرض [[30%]]، وصورة الدخول [[width: 50%]] على طول، وفورم [[width: 400px]] ثابت، و radio بـ [[display: none]] والإطار على [[.opt.checked]] (class المفروض JavaScript يحطها ومحدش بيحطها).

~~~text Chrome على 1200، الحل الغلط
عرض الشاشة 1200px: جرّب على 1200 و 360
FAIL 1 الباقات: ٣ جنب بعض بنفس العرض والطول ← الأطوال 223px و 265px و 244px والعروض 350px و 350px و 350px
FAIL 1 الباقات: الزراير على خط واحد تحت ← آخر الزراير عند 298px و 340px و 319px: خلي الكارت flex column والزرار margin-block-start: auto
FAIL 1 الباقة المميزة لونها معكوس ← الخلفية rgba(0, 0, 0, 0) والمطلوب #0f172a بكلام أبيض
PASS 1 الزراير ٤٤px على الأقل
FAIL 2 الدخول: نصين، والفورم في نص نصه ← الصورة 584px من 1200px، والفورم 400px (أقصاه 400)
FAIL 2 الحقول والزرار بعرض الفورم وطولهم ٤٤ ← 187px×33px و 187px×33px و 36px×17px
FAIL 3 الاختيار: الكارت المختار بس عليه إطار بنفسجي ← قبل الضغط: 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225)، وبعد اختيار التاني: 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225) (من غير JS: .opt:has(input:checked))
FAIL 3 الاختيار: الـ radio لسه بيوصله بالكيبورد ← display: none على الـ input بيشيله من الـ Tab ومن قارئ الشاشة
النتيجة: 1 من 8
~~~

اقرا الأرقام: الصورة 584 من 1200 مش 600 لأن [[#login]] فيه padding 16 من كل ناحية، يعني «نص» بالـ [[%]] نص المحتوى مش نص الشاشة. والحقول 187px لأن [[<input>]] عرضه الافتراضي من الـ [[size]] بتاعه (حوالي ٢٠ حرف) مش من أبوه. والزرار 36 × 17: زرار «دخول» من غير padding ولا [[min-height]].

~~~text Chrome على 360، الحل الغلط
عرض الشاشة 360px: جرّب على 1200 و 360
FAIL 1 الباقات: عمود واحد والمميزة الأول ← على الموبايل كل باقة بعرض الصفحة، والمميزة فوق الكل
FAIL 1 الباقة المميزة لونها معكوس ← الخلفية rgba(0, 0, 0, 0) والمطلوب #0f172a بكلام أبيض
PASS 1 الزراير ٤٤px على الأقل
FAIL 2 الدخول: الصورة مستخبية والفورم بعرض الشاشة ← على الموبايل الصورة لازم display: none والفورم مايطلعش برا (الفورم من 16px لـ 255px)
FAIL 2 الحقول والزرار بعرض الفورم وطولهم ٤٤ ← 187px×33px و 187px×33px و 36px×17px
FAIL 3 الاختيار: الكارت المختار بس عليه إطار بنفسجي ← قبل الضغط: 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225)، وبعد اختيار التاني: 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225) / 1px rgb(203, 213, 225) (من غير JS: .opt:has(input:checked))
FAIL 3 الاختيار: الـ radio لسه بيوصله بالكيبورد ← display: none على الـ input بيشيله من الـ Tab ومن قارئ الشاشة
النتيجة: 1 من 7
~~~

الفورم «من 16px لـ 255px» على 360: الـ [[width: 400px]] اتجاهل لأن الفورم عنصر flex جنب الصورة، و [[flex-shrink: 1]] الافتراضي صغّره لحد ما الاتنين دخلوا. يعني [[width]] في flex «اقتراح» مش أمر.

### الحل المرجعي

~~~text Chrome على 1200
عرض الشاشة 1200px: جرّب على 1200 و 360
PASS 1 الباقات: ٣ جنب بعض بنفس العرض والطول
PASS 1 الباقات: الزراير على خط واحد تحت
PASS 1 الباقة المميزة لونها معكوس
PASS 1 الزراير ٤٤px على الأقل
PASS 2 الدخول: نصين، والفورم في نص نصه
PASS 2 الحقول والزرار بعرض الفورم وطولهم ٤٤
PASS 3 الاختيار: الكارت المختار بس عليه إطار بنفسجي
PASS 3 الاختيار: الـ radio لسه بيوصله بالكيبورد
النتيجة: 8 من 8
~~~

وعلى 360 السبعة PASS ([[7 من 7]]): سطر الباقات بقى «عمود واحد والمميزة الأول»، وسطر الدخول بقى «الصورة مستخبية». والباقات على 1200 عرض كل واحدة [[378.66]] تقريبًا، يعني [[(1168 − 2 × 16) / 3]] بالظبط.

## خلاصة

- كل جملة في الوصف = رقم بيتقاس = سطر في الفحص.
- HTML سليم الأول، وبعدين الموبايل، وبعدين العريض، وبعدين الحالات.
- «الزراير على خط واحد» = كروت بنفس الطول (grid) + كارت flex column + [[margin-block-start: auto]].
- [[width]] في flex بيتصغّر لوحده، و [[<input>]] عرضه مش من أبوه.
- [[:has(input:checked)]] بدل class من JavaScript، والـ radio الحقيقي يفضل موجود.
- [[order]] بيغيّر الشكل مش ترتيب Tab.`,
          try: R`خد الـ HTML من «الحل» من غير الـ CSS، وابني التلات أجزاء من الجداول اللي في الشرح بس (متبصش على الحل). الصق الفحص على 1200 وعلى 360 لحد ما يبقى [[8 من 8]] و [[7 من 7]]، وبعدين اتنقل في الصفحة كلها بـ Tab والأسهم بس.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ كروت في [[display: flex]] (مش grid)، كل كارت [[flex: 1]] وطول الكلام فيهم مختلف. الكروت هتبقى بنفس الطول؟ والزراير على خط واحد من غير [[margin-block-start: auto]]؟`, done: R`كتبت إن الطول هيتساوى (الـ flex row بيمد الأولاد بـ [[align-items: stretch]] زي الـ grid) بس الزراير لأ (كل زرار بعد الكلام بتاعه على طول)، وجربت وقست [[bottom]] الزراير وطلع مختلف، ولما زوّدت [[margin-block-start: auto]] اتساووا.` },
            { lvl: 'تطبيق', t: R`**ابني من وصف:** «كارت منتج: صورة نسبتها 4:5 فوق، والاسم سطرين بالكتير وبعدهم [[…]]، والسعر، وزرار "أضف للسلة" تحت خالص. ٤ كروت في الصف على الكمبيوتر، و ٢ على الموبايل. وعلى الكارت اللي الماوس عليه (أو الـ focus جواه) الصورة تكبر 5٪ من غير ما تطلع برا الكارت». اكتب جدول «الجملة ← القياس» الأول، وبعدين ابني، وبعدين اكتب فحص.`, done: R`الجدول فيه ٧ جمل على الأقل، والفحص بيقيس نسبة الصورة ([[width / height]] = 0.8)، وإن الاسم مش أكتر من سطرين ([[-webkit-line-clamp: 2]] وارتفاعه ≤ سطرين)، وإن الزراير على خط واحد، وعدد العواميد على 1200 و 360. و [[:focus-within]] بيكبّر الصورة بالكيبورد كمان.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اختيار باقات بـ [[<div class="opt" onclick="select(this)">]] و JavaScript بيحط [[.active]]، والـ radio مستخبي بـ [[display: none]]. حوّله لـ [[<label>]] و [[<input type="radio">]] حقيقي و [[:has()]] بس، وامسح الـ JavaScript كله.`, done: R`مفيش [[<script>]] في الصفحة، والأسهم في الكيبورد بتنقل الاختيار بين الكروت (ده سلوك الـ radio الطبيعي)، والفحص بند ٣ الاتنين PASS، والفورم لما يتبعت [[FormData]] فيه القيمة المختارة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** على الموبايل، اعمل الباقة المميزة الأول مرة بـ [[order: -1]] ومرة بإنك تحطها أول في الـ HTML وتحركها على العريضة بـ [[grid-column: 2; grid-row: 1]]. في الحالتين، اكتب ترتيب Tab على 360 وعلى 1200.`, done: R`عندك جدول فيه ٤ ترتيبات Tab (طريقتين × عرضين)، ومكتوب أنهي طريقة بتخلي ترتيب Tab زي الشكل على الموبايل وأنهي على الكمبيوتر، وقرارك أنهي أحسن للصفحة دي وليه.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** زوّد على الفحص بند لجملة جديدة في الوصف: «لما اليوزر يختار "استلام من الفرع"، يظهر تحت الكروت حقل "اختار الفرع"، ويختفي مع الاختيارين التانيين، من غير JavaScript». ابنيه بـ [[:has()]] على الـ [[fieldset]] أو الـ section، واكتب الـ [[ok(...)]] اللي يختبره بالـ [[click()]].`, done: R`الحقل بيظهر ويختفي بـ [[#picker:has(input[value="pickup"]:checked) .branch { display: block }]]، والفحص بيدوس على التلاتة واحد واحد ويقيس [[display]] بتاع الحقل في كل مرة ويرجّع الاختيار الأصلي، وبيطبع PASS، ولو شيلت القاعدة بيطبع FAIL برسالة فيها الاختيار اللي فشل.` },
          ],
          deep: {
            why: R`الوصف المكتوب هو أكتر شكل للمتطلبات في الشغل، وأكتر مصدر للخلاف: «قلتلك الزراير على خط واحد» و «ما هي على خط واحد عندي». لما كل جملة تبقى سطر في فحص، الخلاف بيتحسم برقم، والتسليم بيبقى «الفحص بيقول ٨ من ٨ على العرضين» مش «بص كده كويس».`,
            how: R`الـ grid بيحسب طول كل صف من أطول خانة فيه، وبيمد الخانات التانية ([[align-items: stretch]])، فالكروت الـ ٣ بنفس الطول. وجوه كل كارت الـ flex column بيوزّع العناصر من فوق لتحت، والـ [[auto]] margin بياكل كل المسافة الفاضية في اتجاهه، فالزرار بينزل لآخر الكارت. و [[order]] بيغيّر مكان الرسم بس، وشجرة الـ DOM (اللي Tab وقارئ الشاشة بيمشوا عليها) زي ما هي. و [[:has(input:checked)]] بيتطابق على الأب لما أي ولد يطابق [[input:checked]]، والمتصفح بيعيد حساب الـ selector ده لما حالة الـ input تتغير، من غير ما انت تعمل حاجة. و [[<input>]] عنصر replaced عرضه الافتراضي من [[size]] (٢٠ حرف تقريبًا)، فـ [[width: 100%]] أو flex column بيخليه ياخد عرض أبوه.`,
            when: R`أي وقت المتطلبات جاية كلام: اعمل جدول «الجملة ← القياس» قبل الكود، وابعته لصاحب الوصف يوافق عليه (كده انت بتلقط الجمل المبهمة بدري). و [[:has()]] لأي حالة الأب بيتغير فيها بسبب ولد (كارت مختار، و فورم فيه خطأ، و قايمة مفتوحة)، وهو Baseline في كل المتصفحات من ديسمبر ٢٠٢٣. و JavaScript لما الحالة محتاجة بيانات (السعر بيتحسب) مش شكل بس.`,
            mistakes: R`تبني الشاشة العريضة الأول وبعدين «تصغّرها». أو تعمل الزراير على خط واحد بـ [[height]] ثابت للكروت فالكلام الطويل يطلع برا. أو [[display: none]] على الـ radio. أو class من JavaScript لحالة الـ CSS يعرفها لوحده. أو [[order]] كبير بيقلب الصفحة كلها والكيبورد ماشي بترتيب تاني خالص. أو [[width: 400px]] على عنصر flex وتستغرب إنه 239. أو [[width: 50%]] وتفتكر إنه نص الشاشة وهو نص المحتوى بعد الـ padding. أو تقيس على عرض واحد.`,
          },
          sol: R`الحل المرجعي الصفحة كاملة تحت، وده اللي طلّع [[8 من 8]] على 1200 و [[7 من 7]] على 360. الـ HTML هو نفسه في الحل الغلط والصح: الفرق كله في الـ CSS. أهم السطور: [[.plan { display: flex; flex-direction: column }]] و [[.plan-btn { margin-block-start: auto }]]، و [[.featured { order: -1 }]] ترجع [[0]] من 720، و [[#login]] grid بيبقى عمودين من 900 والصورة [[display: none]] تحت كده، والفورم [[max-width: 400px; margin-inline: auto]]، و [[.opt:has(input:checked)]].

وحطيت الـ CSS البايظ في تعليق في آخر الـ [[<style>]] عشان تجربه: امسح سطور الحل وحط دول مكانهم.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صفحات</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; }
section { padding: 24px 16px; }
.plan { border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
.plan-btn { background: #4f46e5; color: #fff; text-align: center; padding: 12px; text-decoration: none; border-radius: 8px; }
.login-form input { border: 1px solid #94a3b8; padding: 8px; }
.login-btn { background: #4f46e5; color: #fff; border: 0; }
.art { background: linear-gradient(135deg, #c7d2fe, #fbcfe8); }
.options { border: 0; padding: 0; display: grid; gap: 8px; }
.opt { border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; }
.plans { display: grid; gap: 16px; }
.plan { display: flex; flex-direction: column; gap: 8px; }
.plan-btn { margin-block-start: auto; min-height: 44px; }
.featured { background: #0f172a; color: #fff; order: -1; }
@media (min-width: 720px) { .plans { grid-template-columns: repeat(3, 1fr); } .featured { order: 0; } }
#login { display: grid; min-height: 480px; }
.art { display: none; }
.login-form { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 400px; margin-inline: auto; align-self: center; }
.login-form input, .login-btn { min-height: 44px; font: inherit; }
@media (min-width: 900px) { #login { grid-template-columns: 1fr 1fr; padding: 0; } .art { display: block; } }
.opt:has(input:checked) { border: 2px solid #4f46e5; background: #eef2ff; }
.opt:has(input:focus-visible) { outline: 3px solid #4f46e5; outline-offset: 2px; }
.opt input { accent-color: #4f46e5; }
/* الحل الغلط اللي اتجرّب: امسح السطور من .plans لحد .opt input اللي فوق، وحط دول مكانها:
.plan { display: inline-block; width: 30%; vertical-align: top; }
.plan-btn { display: block; }
#login { display: flex; }
.art { width: 50%; min-height: 480px; }
.login-form { width: 400px; padding: 24px; }
.opt input { display: none; }
.opt.checked { border: 2px solid #4f46e5; background: #eef2ff; }
*/
</style></head>
<body>
<section id="pricing" aria-labelledby="p-title">
  <h2 id="p-title">الباقات</h2>
  <div class="plans">
    <article class="plan"><h3>بداية</h3><p class="price">٩٩ ج.م.</p><ul><li>١٠ طلبات</li></ul><a class="plan-btn" href="#">اختار</a></article>
    <article class="plan featured"><h3>محترف</h3><p class="price">١٩٩ ج.م.</p><ul><li>طلبات من غير حد</li><li>دعم سريع</li><li>تقارير</li></ul><a class="plan-btn" href="#">اختار</a></article>
    <article class="plan"><h3>شركات</h3><p class="price">٤٩٩ ج.م.</p><ul><li>كل حاجة</li><li>مدير حساب</li></ul><a class="plan-btn" href="#">كلّمنا</a></article>
  </div>
</section>
<section id="login">
  <div class="art" aria-hidden="true"></div>
  <form class="login-form">
    <h2>ادخل حسابك</h2>
    <label for="l-email">الإيميل</label><input id="l-email" type="email" autocomplete="email" dir="ltr">
    <label for="l-pass">كلمة السر</label><input id="l-pass" type="password" autocomplete="current-password">
    <button class="login-btn">دخول</button>
  </form>
</section>
<section id="picker">
  <h2>اختار طريقة التوصيل</h2>
  <fieldset class="options"><legend>التوصيل</legend>
    <label class="opt"><input type="radio" name="ship" value="normal" checked> عادي (٣ أيام)</label>
    <label class="opt"><input type="radio" name="ship" value="fast"> سريع (يوم)</label>
    <label class="opt"><input type="radio" name="ship" value="pickup"> استلام من الفرع</label>
  </fieldset>
</section>
</body>
</html>`,
          flag: "script",
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const css = ".opt input { display: none; }\n.opt.checked { border: 2px solid #4f46e5; }\n.opt:has(input:checked) { border: 2px solid #4f46e5; }\n.plan-btn { margin-block-start: auto; }\n";
const problems = [];
css.split("\n").forEach((l, i) => {
  if (/(input|\[type=radio\]|\[type=checkbox\])[^{]*\{[^}]*display:\s*none/.test(l)) problems.push("line " + (i + 1) + ": hidden radio can't get keyboard focus");
  if (/\.(checked|active|selected)\b/.test(l) && !/:has\(/.test(l)) problems.push("line " + (i + 1) + ": state class needs JS; :has(input:checked) doesn't");
});
console.log(problems.length + " problems"); problems.forEach(p => console.log("  " + p));
const equal = (w, gap, n) => ((w - gap * (n - 1)) / n).toFixed(1);
console.log("3 plans in 1168px with gap 16: " + equal(1168, 16, 3) + "px each");`, expect: [R`2 problems`, R`line 1: hidden radio can't get keyboard focus`, R`line 2: state class needs JS; :has(input:checked) doesn't`, R`3 plans in 1168px with gap 16: 378.7px each`] },
          ],
        },
      ]
    }
]);
