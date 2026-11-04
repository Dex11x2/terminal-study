// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "CSS: مين بيكسب ومساحة كل عنصر",
      projects: [
        { lvl: 'صغير', t: R`كارت منيو بملف CSS خارجي`, what: R`خد كارت المطعم من مشروع الوحدة الأولى وزوّدله [[style.css]] واحد: خط ومسافة سطور للفقرات، وعنوان ملوّن، وزرار [[.btn]] بخلفية وزوايا مدورة، و [[box-sizing: border-box]] على كل حاجة. من دروس «مقدمة CSS» و «selectors» و «box model».`, done: R`الـ HTML متغيّرش ولا حرف (غير سطر الـ link)، والكارت عرضه 320px بالظبط شامل الـ padding والحدود (Computed)، ومفيش ولا [[style=""]] ولا id في الـ CSS.` },
        { lvl: 'صغير', t: R`٦ أشكال بالـ CSS بس`, what: R`صفحة فيها ٦ أشكال من div فاضي من غير صور: دايرة، وكبسولة، ومثلث بالحدود، وفقاعة كلام (مستطيل مدور ومثلث صغير بـ [[::after]])، وتذكرة بخط متقطع ونص دايرتين على الجنبين، وشارة «جديد» مايلة على ركن كارت. من دروس «selectors» و «box model» و «display».`, done: R`كل شكل مقاسه زي ما قلت بالظبط ([[getBoundingClientRect]]: المثلث مثلًا 40×30 وعرضه وطوله صفر في الـ CSS)، والأشكال جنب بعض بتلف لسطر جديد على 360px من غير scroll أفقي، ومفيش ولا صورة في Network.` },
        { lvl: 'متوسط', t: R`صفحة أسعار جيم بالـ BEM`, what: R`٣ كروت باقات لـ «جيم الأبطال» بـ [[.plan]] و [[.plan__price]] و [[.plan__features]] و [[.plan--featured]]: كل كارت فوقه شريط 4px بلون الباقة بـ [[::before]]، ولما الماوس ييجي عليه بيطلع لفوق 4px وظله بيكبر، والمميز حدوده ملونة وعليه شارة «الأشهر». الـ CSS مترتب في [[@layer reset, components, utilities]]. من دروس الوحدة كلها.`, done: R`مفيش ولا [[!important]] ولا id في الـ CSS، وكل selector وزنه (0,1,0) أو (0,2,0) (شوفه بالماوس في DevTools)، والـ hover مش بيزق الكروت اللي جنبه (الحركة بـ transform مش margin)، و utility زي [[.mt-0]] في طبقة utilities بتغلب margin الكارت من غير ما تكون أقوى في الـ specificity.` },
        { lvl: 'متوسط', t: R`مكتبة خلفيات من غير صور`, what: R`صفحة فيها ٨ مربعات، كل واحد خلفية مختلفة بالـ gradients بس: نقط ([[radial-gradient]] و [[background-size]])، وشبكة خطوط (اتنين [[linear-gradient]])، وخطوط مايلة ([[repeating-linear-gradient]])، ومربعات شطرنج ([[conic-gradient]])، وهالة ناعمة (٣ [[radial-gradient]] فوق بعض بألوان شفافة)، وتدرّج لونين، وأمواج، وواحدة من اختيارك. وجنب كل مربع زرار «انسخ الـ CSS».`, done: R`كل خلفية بتتكرر صح لما تكبّر المربع (مفيش قطع في الحواف)، والصفحة كلها من غير ولا request صورة في Network، و ٨ قواعد CSS كل واحدة ٣ سطور أو أقل، والزرار بينسخ القاعدة بالظبط.` },
        { lvl: 'كبير', t: R`صفحة العيادة بالتصميم الكامل`, what: R`خد صفحة هبوط العيادة المتخيلة من الوحدة الأولى (نفس الـ HTML) واكتبلها CSS كامل: ملف واحد مقسوم [[@layer reset, base, components, utilities]]، وأسامي BEM لكل جزء ([[.hero]] و [[.service-card]] و [[.doctor]] و [[.faq]])، وهيرو خلفيته هالة gradients، وكروت الخدمات بشريط لون وظل وحركة hover، وكارت «احجز ميعادك» شكله تذكرة بخط متقطع، والأجزاء ورا بعض بخلفيات فاتحة متبادلة، وشريط مايل بين جزئين من غير ما يعمل scroll أفقي. يجمع الوحدة دي مع وحدة HTML.`, done: R`على 360 و 800 و 1280 مفيش scroll أفقي ([[document.documentElement.scrollWidth]] = عرض الشاشة)، ومفيش [[!important]] ولا id ولا [[style=""]]، و Lighthouse Accessibility ٩٥+ (التباين سليم)، والـ HTML زي ما هو من الوحدة الأولى، ولو شلت ملف الـ CSS الصفحة لسه مقروءة ومرتبة.`, ext: R`لما توصل لوحدة «الوحدات والمتغيرات» حوّل كل الألوان والمسافات لـ tokens، ولوحدة Flexbox و Grid رتّب الكروت جنب بعض.` },
        { lvl: 'فكرة', t: R`نفس الـ HTML بشكلين`, what: R`زي مسابقة CSS Zen Garden: صفحة HTML واحدة لمقال أو منيو، وملفين CSS مختلفين خالص (مثلًا «كلاسيك» و «مودرن»). انت اللي تختار الموضوع والشكلين.`, done: R`تبدّل بين الشكلين بتغيير سطر الـ link بس، والاتنين مقروءين ومفيش scroll أفقي، وواحد صاحبك قال الشكلين مختلفين فعلًا.`, ext: R`زوّد زرار بيبدّل بينهم من غير reload (يغيّر [[href]] بتاع الـ link) ويفتكر الاختيار.` },
      ],
      l: 1,
      n: "الـ selector بيختار، والـ cascade بيقرر مين يكسب، والـ box model بيحسب المساحة",
      items: [
        {
          cmd: "مقدمة CSS وتنسيق العناصر",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في الـ CSS سطرين: [[colr: red;]] (حرف ناقص) و [[font-size: big;]] (قيمة مش موجودة). العنوان هيتغيّر؟ والسطور التانية اللي في نفس القاعدة هتشتغل؟`, done: R`السطرين اتجاهلوا والعنوان فضل بلونه وحجمه، والسطور التانية في نفس القاعدة اشتغلت عادي. في DevTools › Styles هتلاقي السطرين متشطّب عليهم وجنبهم علامة تحذير. المتصفح بيرمي السطر الغلط بس، مش القاعدة كلها.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>توقّع</title>
<style>
  h1 {
    colr: red;
    font-size: big;
    background: lightyellow;
    letter-spacing: 2px;
  }
</style>
</head>
<body>
<h1>العنوان</h1>
</body>
</html>
~~~

**الإجابة:** العنوان لونه وحجمه مش هيتغيّروا، والسطرين التانيين هيشتغلوا.

CSS مبيقفش عند الغلط زي JavaScript. لما يلاقي خاصية مش معروفة زي [[colr]] أو قيمة مش معروفة زي [[big]]، بيرمي السطر ده بس ويكمّل. وده مقصود: الموقع القديم ميقعش لما الـ CSS يكبر، والمتصفح القديم يتجاهل الخاصية الجديدة بس.

**إزاي تلاقي الغلط:** مفيش أي رسالة في الـ Console. افتح DevTools، ثم Styles: السطر الغلط متشطّب عليه وجنبه علامة تحذير.

**الغلطة الشائعة:** تدوّر على الغلط في الـ Console وتلاقيه نضيف، فتقول «الكود سليم». أخطاء CSS مبتظهرش هناك خالص.

~~~text الناتج
color = rgb(0, 0, 0)      (أسود الافتراضي، colr اتجاهلت)
font-size = 32px  (حجم h1 الافتراضي، big اتجاهلت)
background-color = rgb(255, 255, 224)   اشتغل
letter-spacing = 2px     اشتغل
رسايل في الـ Console: 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت «بُن الصباح» (متجر قهوة متخيل): عنوان h2 لونه بني غامق، وفقرة رمادي بمسافة سطور 1.6، وسعر تقيل، وزرار [[.btn]] بخلفية وكلام أبيض وزوايا 8px. كل ده في [[style.css]] لوحده.`, done: R`الصفحة من غير الـ CSS لسه مفهومة، ومعاه شكلها كارت، والـ Computed بتاع الزرار بيقول [[border-radius: 8px]]، ومفيش أي CSS جوه الـ HTML.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بُن الصباح</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <h1>منتجاتنا</h1>
  <article class="card">
    <h2>بن يمني</h2>
    <p>تحميص وسط وطعم فواكه خفيف، مناسب للفلتر والإسبريسو.</p>
    <p class="price">٣٢٠ جنيه</p>
    <a class="btn" href="#buy">اشتري</a>
  </article>
</main>
</body>
</html>
~~~

~~~css style.css
body {
  font-family: system-ui;
  background: #faf7f2;
  margin: 16px;
}
.card {
  max-width: 320px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
}
.card h2 { color: #4a2c17; margin-block-start: 0; }
.card p { color: #52525b; line-height: 1.6; }
.card .price { color: #18181b; font-weight: 700; }
.btn {
  display: inline-block;
  padding: 10px 16px;
  background: #4a2c17;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
}
~~~

**ليه ملف منفصل:** الملف بيتحمّل مرة ويتخزّن، وكل الصفحات تستخدمه، وتعديل واحد يغيّر الكل. و [[style=""]] جوه الـ HTML بيتكرر في كل عنصر، وبيبقى صعب تغطيه.

- [[line-height: 1.6]] من غير وحدة: المسافة بتتحسب من حجم خط العنصر نفسه.
- [[.card .price]] وزنها (0,2,0) أكبر من [[.card p]] (0,1,1)، فالسعر بياخد اللون الغامق رغم إنه فقرة.
- [[display: inline-block]] على اللينك عشان الـ padding يزق اللي حواليه.

**الغلطة الشائعة:** تكتب الألوان في [[style=""]] جوه الـ HTML. تغيير لون واحد هيبقى في كل صفحة، بدل سطر واحد في [[style.css]].

~~~text الناتج
border-radius الزرار = 8px
لون h2 = rgb(74, 44, 23)   line-height الفقرة = 25.6px   وزن السعر = 700
تباين كلام الزرار على خلفيته = 12.62:1
عدد style="" و <style> في الـ HTML = 0
من غير الـ CSS: ترتيب القراءة: h2 ثم p ثم p ثم a
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** ٣ أشكال من div فاضي: دايرة 80px، وكبسولة 160×40، ومثلث بالحدود بس: [[width: 0; height: 0; border-inline: 20px solid transparent; border-bottom: 30px solid black;]].`, done: R`الدايرة مدورة بالظبط ([[border-radius: 50%]])، والكبسولة جنابها نص دايرة ([[999px]])، والمثلث [[getBoundingClientRect]] بتاعه 40×30 رغم إن width و height صفر: الحدود هي اللي رسمته، والشفافين قصّوا الجنبين.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أشكال</title>
<style>
  .circle { width: 80px; height: 80px; border-radius: 50%; background: #0f766e; }
  .pill { width: 160px; height: 40px; border-radius: 999px; background: #1d4ed8; margin-block: 16px; }
  .triangle {
    width: 0;
    height: 0;
    border-inline: 20px solid transparent;
    border-bottom: 30px solid black;
  }
</style>
</head>
<body>
<div class="circle"></div>
<div class="pill"></div>
<div class="triangle"></div>
</body>
</html>
~~~

**إزاي المثلث بيتكوّن:** الحدود الأربعة بتتقابل عند الزوايا بخط مايل. لما العنصر مقاسه صفر، الحدود بتبقى هي الشكل كله. عندك ٣ حدود: اليمين والشمال 20px شفافين، والتحتاني 30px أسود. فالمساحة السودا هي مثلث قاعدته 40 وطوله 30.

- [[border-inline]] اختصار لحدود الجنبين، و [[transparent]] بيخليهم يقصّوا الجنبين.
- [[border-radius: 50%]]: نص العرض ونص الطول، فمع مربع بتبقى دايرة.
- [[999px]]: رقم كبير، والمتصفح بيصغّره لنص الارتفاع، فالجنبين نص دايرة. لو كتبت [[50%]] على الكبسولة هتطلع بيضاوي.

**الغلطة الشائعة:** تكتب [[height: auto]] أو تسيب نص جوه المثلث، فالقاعدة تعرض وتبوّظ الشكل.

~~~text الناتج
الدايرة 80×80   border-radius = 50%
الكبسولة 160×40
المثلث 40×30   رغم إن width = 0px و height = 0px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** زرار [[class="o1"]] عليه ٣ قواعد: في [[ext.css]] (مربوط الأول) [[.o1 { color: blue; }]]، وفي [[<style>]] بعده [[.o1 { color: green; }]]، وعلى زرار تاني نفس الـ class ومعاه [[style="color: red"]]. لون كل زرار إيه؟`, done: R`الأول أخضر ([[rgb(0, 128, 0)]]): نفس الوزن فاللي بعد يكسب، والملف الخارجي مش أقوى ولا أضعف من [[<style>]]. والتاني أحمر: الـ [[style=""]] أقوى من الاتنين. اتقاس في Chrome.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الألوان</title>
<link rel="stylesheet" href="ext.css">
<style>
  .o1 { color: green; }
</style>
</head>
<body>
<button id="a" class="o1">الأول</button>
<button id="b" class="o1" style="color: red">التاني</button>
</body>
</html>
~~~

~~~css ext.css
.o1 { color: blue; }
~~~

**الإجابة:**

- الزرار الأول: الملف الخارجي و [[<style>]] ليهم نفس المكانة. الاتنين author CSS. نفس الوزن، فاللي **بعد** في الصفحة يكسب، و [[<style>]] مكتوب بعد الـ link.
- الزرار التاني: [[style=""]] على العنصر أقوى من أي selector عادي.

**جرّب تبدّل:** لو حطيت [[<style>]] قبل [[<link>]] الأزرق هو اللي هيكسب. فالمسألة ترتيب مش مكان.

**الغلطة الشائعة:** تفتكر إن الملف الخارجي أضعف أو أقوى من [[<style>]]. مفيش فرق خالص بينهم.

~~~text الناتج
الأول  = rgb(0, 128, 0)  (أخضر)
التاني = rgb(255, 0, 0)  (أحمر)
لو <style> قبل <link>: الأول = rgb(0, 0, 255)  (أزرق)
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من صفحة [[<color>]] على MDN اكتب نفس الأزرق بـ ٣ طرق: [[#2563eb]] و [[hsl(221 83% 53%)]] و [[oklch(0.55 0.2 260)]]، واقرا [[getComputedStyle(el).color]] لكل واحد.`, done: R`الـ hex رجع [[rgb(37, 99, 235)]] والـ hsl رجع [[rgb(36, 99, 235)]] (قريب جدًا بس مش نفسه: التقريب بيفرق)، والـ oklch رجع زي ما هو [[oklch(0.55 0.2 260)]] من غير ما يتحول لـ rgb في Chrome 156.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أزرق</title>
<style>
  .a { color: #2563eb; }
  .b { color: hsl(221 83% 53%); }
  .c { color: oklch(0.55 0.2 260); }
</style>
</head>
<body>
<p class="a">hex</p>
<p class="b">hsl</p>
<p class="c">oklch</p>
</body>
</html>
~~~

| الصيغة | معناها |
|---|---|
| [[#2563eb]] | أحمر وأخضر وأزرق بالـ hex، كل لون رقمين |
| [[hsl(221 83% 53%)]] | درجة اللون ثم التشبع ثم الإضاءة |
| [[oklch(0.55 0.2 260)]] | إضاءة ثم قوة اللون ثم درجته، بطريقة أقرب لعين الإنسان |

**ليه الـ hsl طلع مختلف بدرجة:** الـ hex القيمة بالظبط، أما hsl مكتوب بأرقام صحيحة، فالتقريب غيّر رقم الأحمر من 37 لـ 36. الفرق مبيتشافش، بس لو بتقارن ألوان في اختبار، خد بالك.

**ليه oklch فضلت زي ما هي:** ده لون ممكن يكون أوسع من sRGB، فالمتصفح مبيحوّلهوش عشان ميخسرش.

**الغلطة الشائعة:** تكتب اختبار بيقارن [[getComputedStyle]] بـ [[rgb(...)]] على لون oklch. هيفشل، لأن القيمة راجعة بنفس الصيغة.

~~~text الناتج
hex    → rgb(37, 99, 235)
hsl    → rgb(36, 99, 235)
oklch  → oklch(0.55 0.2 260)
~~~` },
          ],
          title: "CSS بيتربط بالصفحة إزاي، والقاعدة بتتكتب إزاي؟",
          desc: R`[[CSS]] اختصار Cascading Style Sheets. الـ HTML بيقول «ده عنوان»، والـ CSS بيقول «العنوان ده لونه أزرق وحجمه كذا ومكانه فين». الألوان والخطوط والمسافات وترتيب العناصر على الشاشة كلها CSS. من غيره المتصفح بيعرض الصفحة بتنسيقه الافتراضي: خط أسود على خلفية بيضا ولينكات زرقا.

فيه ٣ طرق تحط بيها CSS على صفحة:
• ملف لوحده (الأحسن): تعمل [[style.css]] وتربطه من الـ HTML بـ [[<link rel="stylesheet" href="style.css">]]. نفس الملف ينفع لكل صفحات الموقع، والمتصفح بيحفظه (cache) فمش بيحمّله تاني مع كل صفحة.
• جوه الصفحة: بين [[<style>]] و [[</style>]]. مناسب لتجربة سريعة أو صفحة واحدة.
• على العنصر نفسه: [[style="color: red"]]. اتجنبه غير لو مضطر، لأنه بيغلب أغلب القواعد التانية وصعب تلاقيه بعدين.

القاعدة (rule) شكلها كده: [[h1 { color: blue; }]]
• الـ selector: الجزء اللي قبل القوس، وبيقول القاعدة دي على مين. [[h1]] معناها كل عناصر h1، و [[.btn]] (بنقطة في الأول) معناها أي عنصر عليه [[class="btn"]].
• القوسين [[{ }]]: جواهم التنسيق كله.
• كل سطر جوه اسمه declaration: اسم الخاصية، وبعده [[:]]، وبعده القيمة، وبعده [[;]] تقفل السطر.

الدروس الجاية في القسم ده بتكمّل: «selectors» (كل طرق الاختيار)، و «specificity» و «cascade» (لو قاعدتين على نفس العنصر مين يكسب)، و «box model» (المسافات بتتحسب إزاي).`,
          example: R`h1 {
  color: #2563eb;
  font-size: 28px;
  text-align: center;
}
p {
  color: #374151;
  font-size: 16px;
  line-height: 1.6;
}
.btn {
  background-color: #10b981;
  color: white;
  border-radius: 6px;
}`,
          try: R`في نفس الفولدر بتاع [[index.html]] (من درس «مقدمة HTML والـ Tags») اعمل ملف [[style.css]] وحط فيه القواعد دي. في [[index.html]] ضيف السطر ده تحت سطر الـ meta: [[<link rel="stylesheet" href="style.css">]]، وغيّر الزرار لـ [[<button type="button" class="btn">بحث</button>]]. احفظ الاتنين واعمل refresh. بعدين امسح الـ [[;]] من آخر سطر [[color: #2563eb;]] واعمل refresh تاني، وشوف إيه اللي اتغير في العنوان.`,
          flag: "script",
          deep: {
            why: R`فصل الهيكل (HTML) عن الشكل (CSS) معناه إنك تقدر تغيّر شكل الموقع كله من ملف واحد من غير ما تلمس ولا صفحة HTML. وأي أداة هتشتغل بيها بعد كده (Tailwind أو CSS Modules أو shadcn) في الآخر بتطلّع قواعد CSS بنفس الشكل ده.`,
            how: R`المتصفح بيبني شجرة الـ DOM من الـ HTML، ويقرا الـ CSS، ويشوف كل قاعدة بتنطبق على أنهي عناصر. بعدين يحسب مكان ومقاس كل عنصر (layout)، وبعدين يرسم الألوان والخطوط (paint).

الألوان هنا مكتوبة hex: [[#]] وبعدها ٦ حروف/أرقام، كل اتنين منهم كمية أحمر وأخضر وأزرق. تقدر تكتب أسامي ألوان زي [[white]] كمان. و [[px]] وحدة بيكسل، و [[line-height: 1.6]] من غير وحدة معناها «١.٦ ضعف حجم الخط».

كلمة Cascading معناها إن فيه قواعد كتير ممكن تنطبق على نفس العنصر (منك، ومن مكتبة، ومن تنسيق المتصفح الافتراضي)، والمتصفح عنده ترتيب ثابت يحدد مين يكسب. ده موضوع درسي «specificity» و «cascade».`,
            when: "أي صفحة محتاجة شكل. ابدأ بملف CSS منفصل، ولما تدخل React هتقابل Tailwind (المستوى التاني)، بس فهم القاعدة دي هو اللي هيخليك تعرف Tailwind بيعمل إيه.",
            mistakes: R`تنسى [[;]] في آخر السطر: المتصفح بيقرا السطر ده واللي بعده كأنهم قيمة واحدة غلط، فبيتجاهل الاتنين ويكمل عادي بعدهم. وتنسى النقطة قبل اسم الـ class ([[btn]] بدل [[.btn]]) فالقاعدة تدوّر على عنصر اسمه btn مش موجود. وتحط كل التنسيق في [[style=""]] جوه الـ HTML فيبقى صعب تعدّله.`
          },
          teach: R`## الفكرة في سطرين

3 قواعد: واحدة للعناوين، وواحدة للفقرات، وواحدة لأي عنصر عليه [[class="btn"]]. ربطتهم بصفحة درس «مقدمة HTML والـ Tags» (بعد ما زوّدت [[class="btn"]] على الزرار) وفتحتها في Chrome (headless)، وقريت التنسيق النهائي لكل عنصر بـ [[getComputedStyle()]]:

~~~text index.html
<meta charset="utf-8">
<link rel="stylesheet" href="style.css">
<h1>متجري</h1>
...
<button type="button" class="btn">بحث</button>
~~~

---

## ١. تشريح قاعدة

~~~text style.css
h1 {
  color: #2563eb;
}
~~~

~~~text الأجزاء
h1        { color  :  #2563eb  ;  }
│         │ │      │  │        │  │
│         │ │      │  │        │  └─ قفلة القاعدة
│         │ │      │  │        └──── آخر الـ declaration
│         │ │      │  └───────────── القيمة
│         │ │      └──────────────── بين الخاصية والقيمة
│         │ └─────────────────────── الخاصية (property)
│         └───────────────────────── بداية التنسيق
└─────────────────────────────────── الـ selector: على مين
~~~

السطر [[color: #2563eb;]] كله اسمه declaration (خاصية وقيمة).

---

## ٢. قاعدة الـ [[h1]]

| السطر | معناه | اتقاس |
|---|---|---|
| [[color: #2563eb;]] | لون الكلام | [[rgb(37, 99, 235)]] |
| [[font-size: 28px;]] | حجم الخط | [[28px]] (كان 32 من غيرها) |
| [[text-align: center;]] | الكلام في نص السطر | [[center]] |

### الـ hex بيتقري إزاي؟

[[#2563eb]] بعد الـ [[#]] 6 خانات، كل اتنين منهم رقم بالنظام الست عشري (hexadecimal: أرقام من 0 لـ 9 وبعدها a لـ f، يعني 16 رمز):

| الخانتين | اللون | بالعشري |
|---|---|---|
| [[25]] | أحمر | 2×16 + 5 = 37 |
| [[63]] | أخضر | 6×16 + 3 = 99 |
| [[eb]] | أزرق | 14×16 + 11 = 235 |

وده بالظبط اللي المتصفح رجّعه: [[rgb(37, 99, 235)]]. كل لون من 0 لـ 255، والأزرق هنا أكترهم فاللون أزرق.

---

## ٣. قاعدة الـ [[p]]

| السطر | اتقاس |
|---|---|
| [[color: #374151;]] | [[rgb(55, 65, 81)]]: رمادي غامق (الـ 3 قريبين من بعض وصغيرين) |
| [[font-size: 16px;]] | [[16px]] |
| [[line-height: 1.6;]] | [[25.6px]] |

[[line-height]] هو ارتفاع السطر. الرقم من غير وحدة معناه «مضروب في حجم الخط»: 16 × 1.6 = 25.6.

---

## ٤. قاعدة الـ [[.btn]]

النقطة قبل الاسم = class. فدي بتمسك أي عنصر عليه [[class="btn"]]، مهما كان نوعه.

| السطر | اتقاس | من غير القاعدة |
|---|---|---|
| [[background-color: #10b981;]] | [[rgb(16, 185, 129)]] أخضر | [[rgb(240, 240, 240)]] رمادي فاتح |
| [[color: white;]] | [[rgb(255, 255, 255)]] | أسود |
| [[border-radius: 6px;]] | [[6px]] | [[0px]] |

[[white]] اسم لون جاهز. و [[border-radius]] نص قطر الزوايا المدورة.

اللينك محدش لمسه: لونه فضل [[rgb(0, 0, 238)]] الأزرق الافتراضي.

---

## ٥. لو نسيت [[;]]

مسحت الـ [[;]] بعد [[#2563eb]]. المتصفح بيعرض القاعدة اللي فهمها في [[document.styleSheets]]:

~~~text القاعدة زي ما المتصفح فهمها
قبل:  h1 { color: rgb(37, 99, 235); font-size: 28px; text-align: center; }
بعد:  h1 { text-align: center; }
~~~

اللون والحجم الاتنين اختفوا. المتصفح قرا [[color: #2563eb font-size: 28px]] كقيمة واحدة للـ color، ودي قيمة مش مفهومة، فرماها كلها لحد الـ [[;]] اللي بعدها. والنتيجة: الـ h1 بقى أسود و 32px، والـ [[text-align]] اشتغل عادي. يعني الغلطة بتبوّظ سطرين مش واحد، والباقي بيكمّل.

---

## ٦. لو اسم الملف غلط

كتبت [[href="styles.css"]] (بـ s زيادة): السيرفر رد 404، والـ Console فيه «Failed to load resource: the server responded with a status of 404»، وكل العناصر رجعت لتنسيق المتصفح: الـ h1 أسود و 32 ومش في النص، والـ p [[line-height: normal]]، والزرار رمادي.

---

## الخلاصة

| الحتة | مثال |
|---|---|
| selector بالنوع | [[h1]] |
| selector بالـ class | [[.btn]] |
| declaration | [[color: #2563eb;]] |
| hex | [[#RRGGBB]]، كل خانتين لون من 0 لـ 255 |
| رقم من غير وحدة في [[line-height]] | مضروب في حجم الخط |

- الملف بيتربط بـ [[<link rel="stylesheet" href="style.css">]].
- [[;]] ناقصة = السطر ده واللي بعده بيضيعوا.`,
          lines: [
            R`القاعدة دي على كل عناصر [[h1]]، وبعدها [[{]] بداية التنسيق.`,
            R`لون الكلام: أزرق، مكتوب hex.`,
            R`حجم الخط ٢٨ بيكسل.`,
            R`الكلام في نص السطر.`,
            R`[[}]] قفلة قاعدة الـ h1.`,
            R`قاعدة لكل الفقرات [[p]].`,
            R`رمادي غامق بدل الأسود.`,
            R`حجم الخط ١٦ بيكسل (ده حجم المتصفح الافتراضي أصلًا).`,
            R`المسافة بين السطور ١.٦ ضعف حجم الخط، فالكلام أريح في القراية.`,
            R`قفلة قاعدة الـ p.`,
            R`النقطة معناها class: أي عنصر عليه [[class="btn"]].`,
            R`لون خلفية الزرار: [[#10b981]] أخضر. [[background-color]] بيلوّن مساحة الصندوق كله (المحتوى والـ padding)، مش الكلام بس.`,
            R`لون الكلام جوه الزرار أبيض عشان يتقري على الأخضر. أي لون خلفية لازم يتكتب معاه لون الكلام، عشان التباين يفضل مضمون.`,
            R`زوايا مدورة بنص قطر ٦ بيكسل.`,
            R`قفلة قاعدة الـ btn.`
          ],
          sol: R`بعد الـ refresh: «متجري» بقى أزرق وفي نص الصفحة وحجمه 28px (أصغر شوية من حجم h1 الافتراضي اللي هو 32px). الفقرة بقت رمادي غامق والسطور فيها مسافة أوسع. الزرار بقى خلفيته خضرا وكلامه أبيض وزواياه مدورة. اللينك والحقل محدش لمسهم فهيفضلوا زي ما هم.

لو مفيش أي حاجة اتغيرت: غالبًا اسم الملف في [[href]] مش مطابق لاسمه الحقيقي، أو الملفين مش في نفس الفولدر. افتح DevTools › Console هتلاقي غلطة 404 أو [[ERR_FILE_NOT_FOUND]].

ولما تمسح [[;]] بعد اللون: العنوان بيرجع أسود وبحجم الـ h1 الافتراضي، بس لسه في النص. السبب إن المتصفح قرا [[color: #2563eb font-size: 28px]] كقيمة واحدة للـ color، ودي قيمة غلط فاتجاهلها، فضاع اللون والحجم مع بعض، و [[text-align]] اللي بعدهم اشتغل عادي. في DevTools › Styles هتلاقي السطر متشطّب وجنبه علامة تحذير.`
        },
        {
          cmd: "selectors",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<ul class="menu">]] فيه ٣ [[li]]، وأول li جواه [[ul]] تاني فيه ٢ [[li]]. كام عنصر بيرجع من [[.menu > li]]؟ ومن [[.menu li]]؟ ومن [[.menu li:nth-child(odd)]]؟ وبعدين اسأل [[querySelectorAll]].`, done: R`٣ و ٥ و ٣: الـ [[>]] الأولاد المباشرين بس، والمسافة كل الأحفاد، والـ odd اختار الأول والتالت في القايمة الكبيرة والأول في الصغيرة (كل li بيتعدّ وسط إخواته هو بس).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>selectors</title>
</head>
<body>
<ul class="menu">
  <li>أول
    <ul>
      <li>فرعي ١</li>
      <li>فرعي ٢</li>
    </ul>
  </li>
  <li>تاني</li>
  <li>تالت</li>
</ul>
</body>
</html>
~~~

| الـ selector | العدد | ليه |
|---|---|---|
| [[.menu > li]] | ٣ | الأولاد المباشرين بس |
| [[.menu li]] | ٥ | أي li تحت [[.menu]] في أي عمق |
| [[.menu li:nth-child(odd)]] | ٣ | الأول والتالت في الكبيرة، والأول في الصغيرة |

**الفكرة في** [[nth-child]]**:** العد بيتحسب وسط إخوات العنصر نفسه، مش في الصفحة كلها. فـ «فرعي ١» رقم 1 في قايمته الصغيرة، مش رقم 2.

**الغلطة الشائعة:** تكتب [[.menu li]] وانت عايز القايمة الأولى بس، فالتنسيق ينزل على القايمة الفرعية. لو عايز المستوى الأول استخدم [[>]].

~~~text الناتج
.menu > li                  → 3
.menu li                    → 5
.menu li:nth-child(odd)     → 3   (أول ، فرعي ١ ، تالت)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكارت فيه h3 وبعده p، والـ CSS [[.card p:first-child { color: red; }]] مش شغال على الفقرة.`, done: R`عرفت إن [[:first-child]] معناها «أول ابن خالص» والـ h3 هو الأول، فالـ p مش first-child. بعد [[:first-of-type]] (أول p وسط إخواته) القاعدة اشتغلت.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكارت</title>
<style>
  .card p:first-of-type { color: red; }
</style>
</head>
<body>
<article class="card">
  <h3>العنوان</h3>
  <p>الفقرة الأولى</p>
  <p>الفقرة التانية</p>
</article>
</body>
</html>
~~~

**السبب:** [[p:first-child]] معناها «عنصر هو p **و** هو أول ابن في أبوه». وأول ابن هنا [[h3]]، فمفيش p يحقق الشرطين.

أما [[p:first-of-type]] فمعناها «أول p وسط إخواته»، ومش مهم فيه إيه قبله.

| الـ selector | بيعدّ إيه |
|---|---|
| [[:first-child]] | كل الإخوات من أي نوع |
| [[:first-of-type]] | الإخوات من نفس النوع بس |

**الغلطة الشائعة:** تقرا [[.card p:first-child]] كأنها «أول p في الكارت». الـ selector مش بيعمل فلتر بالترتيب ده. وتذكّر إن [[type]] هنا نوع العنصر، مش الـ class: [[.x:first-of-type]] مش معناها «أول عنصر عليه x».

~~~text الناتج
قبل (first-child): لون الفقرة الأولى = rgb(0, 0, 0)
بعد (first-of-type): لون الفقرة الأولى = rgb(255, 0, 0)
                     لون الفقرة التانية = rgb(0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** تذكرة حفلة متخيلة: كارت فيه خط متقطع ([[border-top: 2px dashed]]) بيفصل الجزء اللي بيتقطع، ونص دايرة على كل جنب عند الخط ده ([[::before]] و [[::after]] دواير بلون خلفية الصفحة)، ورقم المقعد بخط كبير.`, done: R`التذكرة شكلها مقطوعة من الجنبين عند الخط المتقطع بالظبط، والدايرتين من غير أي عنصر زيادة في الـ HTML (اتنين pseudo-elements بس)، والتذكرة على 360px مش طالعة برّه الشاشة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تذكرة</title>
<style>
  :root { --page: #e7e5e4; }
  body { background: var(--page); font-family: system-ui; margin: 16px; }
  .ticket { max-width: 320px; margin-inline: auto; background: #fff; border-radius: 12px; }
  .ticket__main { padding: 20px; }
  .ticket__stub {
    position: relative;
    padding: 20px;
    border-top: 2px dashed #a1a1aa;
    text-align: center;
  }
  .ticket__stub::before,
  .ticket__stub::after {
    content: "";
    position: absolute;
    top: -13px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--page);
  }
  .ticket__stub::before { inset-inline-start: -12px; }
  .ticket__stub::after { inset-inline-end: -12px; }
  .seat { font-size: 2.5rem; font-weight: 700; }
</style>
</head>
<body>
<main>
<article class="ticket">
  <div class="ticket__main">
    <h1>حفلة الربيع</h1>
    <p>١٥ أبريل، الساعة ٨ مساءً</p>
  </div>
  <div class="ticket__stub">
    <p>المقعد</p>
    <p class="seat">B12</p>
  </div>
</article>
</main>
</body>
</html>
~~~

**الخدعة:** الدايرتين مش مقصوصين من التذكرة فعلًا. هما دايرتين بنفس لون خلفية الصفحة، قاعدين فوق حافة الكارت، فالعين بتشوفها قطعة ناقصة.

- [[content: ""]] لازم موجود، وإلا الـ pseudo-element مش هيترسم.
- [[position: relative]] على الأب، عشان [[absolute]] يتحسب منه.
- [[top: -13px]]: نص الدايرة 12 + نص الخط 1، فمركزها بالظبط على الخط.
- [[inset-inline-start]] بدل [[left]]: الشكل يشتغل في RTL و LTR.
- [[--page]] متغير: لو غيّرت لون الصفحة الدايرتين يمشوا معاها.

**الغلطة الشائعة:** تكتب لون الصفحة بإيدك في الدايرتين، وبعدين تغيّر خلفية الصفحة فالدواير تبان. والخدعة دي مش هتنفع لو الخلفية صورة، ووقتها استخدم [[mask]].

~~~text الناتج
مركز الدايرة y = 179.875   ومركز الخط y = 179.875
الدايرة اليمين مركزها على حافة التذكرة: يمين التذكرة 340، وأقصى يمين الدايرة 352 جوه الشاشة
عناصر زيادة في الـ HTML للدواير: 0 (اتنين pseudo-elements)
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة تنقل لموقع مكتبة متخيلة: اللينك الحالي عليه [[aria-current="page"]] وبيتلوّن بـ [[a[aria-current="page"] ]] (مش class)، و [[a:hover]] بيعمل خط تحت، و [[a:focus-visible]] حلقة 3px.`, done: R`لما تغيّر الصفحة الحالية بتغيّر الـ attribute بس والتنسيق بيمشي وراه، والحلقة بتظهر بالكيبورد بس مش بالماوس، وقارئ الشاشة بيعرف إنه الصفحة الحالية من الـ attribute نفسه مش من اللون.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكتب</title>
<style>
  nav { display: flex; gap: 8px; font-family: system-ui; }
  nav a { padding: 8px 12px; color: #1e3a8a; text-decoration: none; border-radius: 6px; }
  a[aria-current="page"] { background: #1e3a8a; color: #fff; }
  a:hover { text-decoration: underline; }
  a:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
</style>
</head>
<body>
<header>
  <nav aria-label="الرئيسية">
    <a href="#home">الرئيسية</a>
    <a href="#books" aria-current="page">الكتب</a>
    <a href="#contact">تواصل</a>
  </nav>
</header>
<main><h1>الكتب</h1></main>
</body>
</html>
~~~

**ليه attribute مش class:** [[aria-current="page"]] بتعمل حاجتين في سطر واحد: قارئ الشاشة بيقول «الصفحة الحالية»، والـ CSS بيلوّنها. لو استخدمت [[.active]] لازم تكتب الاتنين وتفتكر تحافظ عليهم. كده مصدر واحد مستحيل يختلف.

- [[a[aria-current="page"]]]: selector بيختار بالـ attribute، ومش محتاج أي class.
- [[:focus-visible]]: المتصفح بيقرر، الحلقة تظهر للكيبورد، ومبتظهرش لضغطة الماوس على اللينك.
- [[outline-offset]]: مسافة بين الحلقة والعنصر.

**الغلطة الشائعة:** تكتب [[a:focus { outline: none; }]] عشان الحلقة «وحشة». كده اللي بيستخدم الكيبورد ضاع.

~~~text الناتج
الصفحة الحالية: الخلفية = rgb(30, 58, 138)
بعد نقل aria-current للرئيسية: الرئيسية = rgb(30, 58, 138)   والكتب = rgba(0, 0, 0, 0)
hover: text-decoration = underline
بالكيبورد: outline = 3px solid rgb(180, 83, 9)
بالماوس:   outline-style = none
اسم اللينك: - link "الكتب":
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** على لستة ١٠ كروت اكتب selector لكل واحدة: كل تالت كارت من التاني (٢ و ٥ و ٨)، وآخر كارتين، وكل الكروت ما عدا الأخير، والكارت الوحيد لو اللستة فيها كارت واحد بس.`, done: R`[[:nth-child(3n+2)]] رجّع ٣، و [[:nth-last-child(-n+2)]] رجّع ٢، و [[:not(:last-child)]] رجّع ٩، و [[:only-child]] رجّع صفر على العشرة وواحد لما سبت كارت واحد. واتأكدت من كل رقم بـ [[querySelectorAll().length]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
</head>
<body>
<section id="list"></section>
<script>
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement('article');
    card.textContent = 'كارت ' + i;
    document.querySelector('#list').append(card);
  }
$__lt/script>
</body>
</html>
~~~

~~~js
const c = (s) => document.querySelectorAll('#list > ' + s).length;
c(':nth-child(3n+2)');
c(':nth-last-child(-n+2)');
c(':not(:last-child)');
c(':only-child');
~~~

**قراءة كل واحد:**

- [[:nth-child(3n+2)]]: n بتبدأ من صفر: 2 ثم 5 ثم 8. الـ 3 هي الخطوة، والـ 2 نقطة البداية.
- [[:nth-last-child(-n+2)]]: العد من الآخر. [[-n+2]] بتدّي 2 و 1 و 0، فآخر اتنين بس.
- [[:not(:last-child)]]: مفيدة جدًا لحط فاصل بين العناصر من غير ما يبقى بعد الأخير.
- [[:only-child]]: الأول والأخير في نفس الوقت.

**الغلطة الشائعة:** تكتب [[:nth-child(2 + 3n)]] أو تتوقع إن n بتبدأ من 1. والصيغة الصحيحة [[an+b]] بالترتيب ده، ومن غير مسافات حوالين n.

~~~text الناتج
:nth-child(3n+2)        → 3 كروت: 2 و 5 و 8
:nth-last-child(-n+2)   → 2: 9 و 10
:not(:last-child)       → 9
:only-child             → 0 على العشرة
بعد ما سبت كارت واحد   → 1
~~~` },
          ],
          title: "تختار العناصر اللي عايز تنسّقها",
          desc: R`الـ selector هو الجزء اللي قبل [[{]]: بيقول القاعدة دي على مين. بالنوع [[p]]، أو بالـ class [[.card]]، أو بالـ attribute [[[type="email"]]]، أو بالمكان: [[.card p]] (أي p جوه card) و [[.menu > li]] (الأولاد المباشرين بس).

وفيه pseudo-classes لحالة العنصر: [[:hover]] و [[:focus-visible]] و [[:first-child]] و [[:nth-child(odd)]]، و pseudo-elements بتعمل حتة مش موجودة في الـ HTML: [[::before]] و [[::after]] و [[::placeholder]].`,
          example: R`p { line-height: 1.7; }
.card { padding: 1rem; }
.card p { color: gray; }
.menu > li { display: inline-block; }
input[type="email"] { direction: ltr; }
a:hover { text-decoration: underline; }
button:focus-visible { outline: 2px solid blue; }
li:nth-child(odd) { background: whitesmoke; }
.required::after { content: " *"; color: red; }`,
          try: R`في DevTools › Console جرّب [[document.querySelectorAll(".card p")]] بنفس الـ selectors، وشوف رجّعلك كام عنصر. نفس اللغة بالظبط بتاعة الـ CSS.`,
          flag: "script",
          deep: {
            why: R`كل CSS بيبدأ بسؤال: القاعدة دي على مين؟ لو الـ selector واسع قوي هتبوّظ حاجات مش قصدك، ولو ضيق قوي هتكتب نفس القاعدة عشر مرات. ونفس اللغة دي بتستخدمها في JavaScript ([[querySelector]]) وفي اختبارات المتصفح (Playwright).`,
            how: R`المتصفح بيقرا الـ selector من اليمين للشمال. [[.card p]] معناها: هات كل p، وبعدين شوف مين فيهم ليه جد عليه card. عشان كده الجزء اللي على اليمين هو اللي بيحدد التكلفة. في الواقع المتصفحات سريعة جدًا والفرق مش محسوس غير في صفحات ضخمة.

الـ combinators: المسافة (أي حفيد)، و [[>]] (ابن مباشر)، و [[+]] (الأخ اللي بعده على طول)، و [[~]] (أي أخ بعده).

[[:hover]] و [[:focus]] حالات. [[:focus-visible]] ذكية: بتظهر لما المستخدم بيستخدم الكيبورد، ومش بتظهر لما يضغط بالماوس، فتقدر تحط outline واضح من غير ما يضايق حد.

[[::before]] و [[::after]] محتاجين [[content]] (حتى لو فاضي [[""]]) وإلا مش بيظهروا. وبيتحطوا كأنهم أول وآخر ابن جوه العنصر، عشان كده مش بيشتغلوا على [[<img>]] و [[<input>]] (ملهمش أولاد).`,
            when: R`class لكل حاجة بتنسّقها (أسهل في الـ specificity). والـ attributes والـ pseudo-classes للحالات. ومع Tailwind أغلب الكلام ده بيبقى variants زي [[hover:]] و [[focus-visible:]] (المستوى التاني).`,
            mistakes: R`selectors طويلة زي [[.page .main .content .card .title]] بتربط التنسيق بشكل الـ HTML، وأول ما الهيكل يتغير يبوظ. و id في الـ CSS بيعمل specificity عالية صعب تغلبها (الدرس الجاي). و [[::after]] من غير [[content]].`
          },
          teach: R`## الفكرة في سطرين

9 قواعد، كل واحدة بتختار عناصر بطريقة مختلفة: بالنوع، بالـ class، بالمكان، بالـ attribute، بالحالة، أو حتة مش موجودة في الـ HTML. حطيتهم على صفحة الحل (كارتين، وفقرة برا، ومنيو جواها منيو، وحقلين) وزوّدت لينك وزرار، وفتحتها في Chrome (headless). عدّيت كل selector بـ [[querySelectorAll]] وقريت التنسيق اللي اتطبق:

~~~text index.html
<div class="card"><p>وصف</p><p class="required">الاسم</p></div>
<div class="card"><h3>عنوان</h3><div><p>جوه div جوه الكارت</p></div></div>
<p>برا أي كارت</p>
<ul class="menu"><li>أ</li><li>ب<ul><li>ج</li></ul></li><li>د</li></ul>
<input type="email"><input type="text">
~~~

---

## ١. بالنوع وبالـ class

| السطر | بيختار | عدد | اتقاس |
|---|---|---|---|
| [[p { line-height: 1.7; }]] | كل [[<p>]] | 4 | [[line-height]] = 27.2px (16 × 1.7) |
| [[.card { padding: 1rem; }]] | كل عنصر عليه [[class="card"]] | 2 | [[padding]] = 16px |

[[1rem]] = حجم خط الصفحة، 16px افتراضيًا.

---

## ٢. بالمكان: المسافة و [[>]]

الرموز اللي بين الـ selectors اسمها combinators:

| الـ selector | معناه | عدد | مين |
|---|---|---|---|
| [[.card p]] | أي p **جوه** card مهما كان عميق | 3 | وصف، الاسم، جوه div جوه الكارت |
| [[.card > p]] | p ابن **مباشر** لـ card | 2 | وصف، الاسم |
| [[.menu > li]] | li ابن مباشر لـ menu | 3 | أ، ب، د |
| [[.menu li]] | أي li جوه menu | 4 | أ، ب، ج، د |

- المسافة = descendant (أي حفيد). الفقرة «جوه div جوه الكارت» حفيدة، فـ [[.card p]] مسكها و [[.card > p]] لأ.
- [[>]] = child (ابن مباشر بس). الـ «ج» جوه [[ul]] تاني، فهي حفيدة لـ menu مش ابنها.

واتقاس أثرهم: [[.card p]] لونها [[rgb(128, 128, 128)]] (ده [[gray]])، والفقرة اللي برا [[rgb(0, 0, 0)]]. و [[.menu > li { display: inline-block; }]]: أ و ب و د بقوا [[inline-block]]، و «ج» فضلت [[list-item]] (عرض الـ li الافتراضي).

---

## ٣. بالـ attribute: [[input[type="email"]]]

الأقواس المربعة [[[ ]]] = attribute بقيمة معيّنة. ولزقها في [[input]] من غير مسافة يعني «input **و** عليه الـ attribute ده». عدد: 1. واتقاس: حقل الإيميل [[direction: ltr]]، وحقل الـ text فضل [[rtl]] زي الصفحة.

---

## ٤. بالحالة: pseudo-classes

بتبدأ بـ [[:]] واحدة، وبتوصف حالة العنصر دلوقتي.

### [[a:hover]]

الماوس فوق اللينك. في الـ Console طلعت 0 (مفيش ماوس فوق حاجة). حرّكت الماوس المتقلّد فوق اللينك فبقت 1. واللينك أصلًا عليه خط من المتصفح، فالقاعدة دي بتفرق لو انت شايل الخط في مكان تاني.

### [[button:focus-visible]]

الزرار واخد focus والمتصفح شايف إن المستخدم محتاج يشوفه:

| إزاي الزرار اخد الـ focus | [[:focus]] | [[:focus-visible]] | الـ outline |
|---|---|---|---|
| ضغطة ماوس | أيوه | لأ | [[none]] |
| Tab من الكيبورد | أيوه | أيوه | [[rgb(0, 0, 255) solid 2px]] |

ده بالظبط الفرق بينها وبين [[:focus]]: الحلقة الزرقا بتظهر للي بيستخدم الكيبورد بس.

### [[li:nth-child(odd)]]

[[nth-child]] = العنصر رقم كذا بين إخواته، و [[odd]] = الفردي (1، 3، 5...). عدد: 3، وهم أ و ج و د. ليه «ج»؟ لأنها الابن **الأول** في الـ ul بتاعها، فهي فردية بين إخواتها. والـ «ب» التاني فخلفيتها فضلت شفافة، والباقي [[rgb(245, 245, 245)]] ([[whitesmoke]]).

---

## ٥. حتة مش موجودة: [[::before]] و [[::after]]

بتبدأ بـ [[::]] اتنين، واسمها pseudo-elements.

~~~text style.css
.required::after { content: " *"; color: red; }
~~~

- [[::after]]: حتة جديدة كأنها آخر ابن جوه العنصر.
- [[content: " *"]]: الكلام اللي فيها. من غير [[content]] مش بتظهر خالص.

[[querySelectorAll(".required::after")]] رجعت 0، لأن الحتة دي مش عنصر في الـ DOM. بس [[getComputedStyle(el, "::after")]] بيقراها: [[content]] = [[" *"]] واللون [[rgb(255, 0, 0)]].

---

## الخلاصة

| النوع | مثال | معناه |
|---|---|---|
| type | [[p]] | كل p |
| class | [[.card]] | عليه [[class="card"]] |
| descendant | [[.card p]] | أي حفيد |
| child | [[.menu > li]] | ابن مباشر |
| attribute | [[[type="email"]]] | attribute بقيمة |
| pseudo-class | [[:hover]] و [[:focus-visible]] و [[:nth-child(odd)]] | حالة |
| pseudo-element | [[::after]] | حتة جديدة، محتاجة [[content]] |`,
          lines: [
            R`بالنوع: كل [[<p>]] في الصفحة من غير استثنا، فالمسافة بين السطور بقت 1.7 في كل الفقرات.`,
            R`أي عنصر عليه [[class="card"]].`,
            "أي p جوه card مهما كان عميق (المسافة = أي حفيد).",
            "الـ li اللي أولاد مباشرين لـ menu بس، مش الأحفاد.",
            "بالـ attribute: حقول الإيميل بس.",
            "لما الماوس ييجي على اللينك.",
            "لما الزرار ياخد focus من الكيبورد (مش من ضغطة ماوس).",
            "الصفوف الفردية: 1 و 3 و 5...",
            "حتة مش موجودة في الـ HTML بتتضاف بعد الكلام: نجمة الحقل المطلوب."
          ],
          sol: R`على الصفحة اللي في الحل تحت (كارتين وفقرة برا ومنيو فيها منيو جوه منيو)، الـ Console بيرجع: [[querySelectorAll("p")]] ‏4، و [[".card p"]] ‏3 (بما فيهم الـ p اللي جوه div جوه الكارت، لأن المسافة معناها «أي حفيد»)، و [[".card > p"]] ‏2 بس (أولاد مباشرين). و [[".menu > li"]] ‏3 بينما [[".menu li"]] ‏4 لأن الـ li اللي في المنيو الداخلية حفيد مش ابن. و [[li:nth-child(odd)]] ‏3، و [[input[type="email"]]] ‏1.

فيه اتنين هيطلعولك 0 وده صح: [[a:hover]] لأن مفيش حاجة الماوس واقف عليها وانت بتكتب في الـ Console، و [[.required::after]] لأن الـ pseudo-element مش عنصر في الـ DOM أصلًا، بيتشاف بس في Styles. لو رقم طلع أكبر من المتوقع، غالبًا نسيت الفرق بين المسافة و [[>]].`,
          solCode: R`<div class="card"><p>وصف</p><p class="required">الاسم</p></div>
<div class="card"><h3>عنوان</h3><div><p>جوه div جوه الكارت</p></div></div>
<p>برا أي كارت</p>
<ul class="menu"><li>أ</li><li>ب<ul><li>ج</li></ul></li><li>د</li></ul>
<input type="email"><input type="text">
<!-- في الـ Console -->
document.querySelectorAll(".card p").length   // 3
document.querySelectorAll(".card > p").length // 2
document.querySelectorAll(".menu > li").length // 3
document.querySelectorAll(".menu li").length   // 4`
        },
        {
          cmd: "specificity",
          practice: [
            { lvl: 'تطبيق', t: R`**مسألة:** رتّب الـ selectors دي من الأضعف للأقوى، واكتب وزن كل واحد: [[ul li a]] و [[.nav a:hover]] و [[#main .btn]] و [[a[href^="http"] ]] و [[:is(#a, .b) p]] و [[:where(#a) p]]. وبعدين اتأكد بالماوس في DevTools.`, done: R`[[:where(#a) p]] (0,0,1)، و [[ul li a]] (0,0,3)، و [[a[href^="http"] ]] (0,1,1)، و [[.nav a:hover]] (0,2,1)، و [[:is(#a, .b) p]] (1,0,1) لأن is بتاخد وزن أقوى حاجة جواها، و [[#main .btn]] (1,1,0). والـ tooltip في DevTools قال نفس الأرقام.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الوزن</title>
<style>
  ul li a { color: black; }
  .nav a:hover { color: red; }
  #main .btn { color: blue; }
  a[href^="http"] { color: green; }
  :is(#a, .b) p { color: teal; }
  :where(#a) p { color: orange; }
</style>
</head>
<body>
<div id="main">
  <nav class="nav"><ul><li><a class="btn" href="https://example.com">لينك</a></li></ul></nav>
</div>
<div id="a"><p>فقرة</p></div>
</body>
</html>
~~~

**العد:** ٣ خانات (ids, classes, elements). الـ class والـ attribute والـ pseudo-class خانة الوسط، والعنصر الخانة الأخيرة. والمقارنة خانة خانة من الشمال، مش جمع.

**الاستثناءين هنا:**

- [[:is(#a, .b)]] بتاخد وزن **أقوى** حاجة جواها، فـ id كامل حتى لو العنصر اختير بالـ class.
- [[:where()]] وزنها صفر دايمًا، مهما كان جواها.

**الغلطة الشائعة:** تحسب [[:is(#a, .b) p]] على أساس [[.b]] لو ده اللي طابق. الوزن ثابت، مش بيعتمد على اللي طابق فعلًا.

~~~text الناتج
الترتيب من الأضعف للأقوى، والأرقام من Chrome نفسه:
(0,0,1)  :where(#a) p
(0,0,3)  ul li a
(0,1,1)  a[href^="http"]
(0,2,1)  .nav a:hover
(1,0,1)  :is(#a, .b) p
(1,1,0)  #main .btn
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف فيه ٣ قواعد للزرار كلهم [[!important]] (واحدة للون، وواحدة في الـ hover، وواحدة جوه الـ footer)، وكل واحد زوّد [[!important]] عشان يغلب اللي قبله. شيلهم كلهم من غير ما الشكل يتغيّر.`, done: R`[[grep -c "!important"]] على الملف بقى صفر، والزرار في التلات حالات نفس الشكل (screenshot قبل وبعد)، والحل كان ترتيب القواعد أو modifier واحد زي [[.btn--footer]] بدل selector أطول.`, sol: R`قبل:

~~~css before.css
.btn { background: #1d4ed8 !important; color: #fff !important; padding: 8px 16px; }
.btn:hover { background: #1e3a8a !important; }
footer .btn { background: #166534 !important; }
~~~

بعد:

~~~css after.css
.btn { background: #1d4ed8; color: #fff; padding: 8px 16px; }
.btn:hover { background: #1e3a8a; }
.btn--footer { background: #166534; }
~~~

والصفحة، ومعاها التغيير الوحيد في الـ HTML:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأزرار</title>
<link rel="stylesheet" href="after.css">
</head>
<body>
<main><button id="m" class="btn">عادي</button></main>
<footer><button id="f" class="btn btn--footer">في الفوتر</button></footer>
</body>
</html>
~~~

**إزاي شلناهم:**

- مفيش خناقة أصلًا بين [[.btn]] و [[.btn:hover]]: الـ hover أقوى بطبيعته (0,2,0) ضد (0,1,0).
- [[footer .btn]] كانت بتعتمد على مكان الزرار. [[.btn--footer]] بتقول المعنى صراحة، وبنفس وزن [[.btn]]، وهي مكتوبة بعدها فتكسب بالترتيب.
- في الفوتر الـ hover لسه كسبان (0,2,0) ضد (0,1,0)، زي ما كان قبل.

**الغلطة الشائعة:** تستبدل [[!important]] بـ selector أطول زي [[footer .wrapper .btn.btn]]. دي نفس المشكلة بشكل تاني، والقاعدة الجاية هتحتاج أطول.

~~~text الناتج
grep -c "!important" before.css → 3
grep -c "!important" after.css  → 0

مقارنة الـ screenshot قبل وبعد، بايت ببايت:
من غير hover (الزرارين ظاهرين)  متطابق
hover على الزرار العادي          متطابق
hover على زرار الفوتر            متطابق
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<p style="color: red">]] وفي الـ CSS [[p.imp { color: blue !important; }]]. مين بيكسب: الـ inline ولا الـ important؟`, done: R`الأزرق ([[rgb(0, 0, 255)]] في Chrome): [[!important]] أقوى من الـ [[style=""]] العادي. ده سبب إن الـ important مشكلة: حتى الـ inline اللي JavaScript بيحطه مبقاش يقدر يغيّر اللون.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مين يكسب</title>
<style>
  p.imp { color: blue !important; }
</style>
</head>
<body>
<p class="imp" style="color: red">كلام</p>
</body>
</html>
~~~

**الإجابة:** الأزرق. [[!important]] بيقلب الترتيب: بيتحسب في طبقة فوق كل حاجة عادية، بما فيها [[style=""]].

وعشان كده هو مشكلة: JavaScript بيغيّر الألوان بـ [[el.style.color = ...]]، وده مش هيأثر:

~~~js
const p = document.querySelector('p');
p.style.color = 'green';
getComputedStyle(p).color;
~~~

والوحيد اللي يغلبه من الـ inline: [[el.style.setProperty('color', 'green', 'important')]]، يعني important تانية.

**الغلطة الشائعة:** تشغّل كود بيغيّر اللون وتلاقيه ماتغيّرش، وتدوّر على باج في الـ JavaScript، والسبب سطر CSS بعيد. افتح Computed وشوف مين كسب.

~~~text الناتج
اللون = rgb(0, 0, 255)  (أزرق)
بعد p.style.color = 'green': rgb(0, 0, 255)  (لسه أزرق)
بعد setProperty(..., 'important'): rgb(0, 128, 0)
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** نفس العنصر عليه [[id="main"]]. قارن وزن [[#main]] بوزن [[ [id="main"] ]]. وبعدين جرّب الاتنين ضد [[.nav .btn.primary]].`, done: R`[[#main]] (1,0,0) و [[ [id="main"] ]] (0,1,0) مع إنهم بيختاروا نفس العنصر: الـ attribute وزنه زي class. فـ [[.nav .btn.primary]] (0,3,0) غلب [[ [id="main"] ]] وخسر قدام [[#main]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>id</title>
<style>
  .nav .btn.primary { color: green; }
</style>
</head>
<body>
<nav class="nav"><button id="main" class="btn primary">اضغط</button></nav>
</body>
</html>
~~~

جرّب تضيف كل مرة سطر واحد من دول، **قبل** [[.nav .btn.primary]]:

~~~css
#main { color: red; }
[id="main"] { color: red; }
~~~

| الـ selector | الوزن | بيختار نفس العنصر؟ |
|---|---|---|
| [[#main]] | (1,0,0) | أيوه |
| [[[id="main"]]] | (0,1,0) | أيوه |
| [[.nav .btn.primary]] | (0,3,0) | أيوه |

**الفكرة:** الوزن من شكل الـ selector، مش من العنصر اللي بيختاره. ووزن id واحد بيغلب أي عدد من الـ classes، لأن المقارنة خانة خانة.

**إمتى ده مفيد:** لو مضطر تختار عنصر بالـ id، بس عايز وزن قليل (مثلًا عنصر من مكتبة)، اكتبه [[[id="main"]]].

**الغلطة الشائعة:** تعتقد إن كتير من الـ classes ممكن يغلبوا id. المقارنة خانة خانة، ومفيش جمع.

~~~text الناتج
#main ضد .nav .btn.primary          → rgb(255, 0, 0)  (أحمر، id كسب)
[id="main"] ضد .nav .btn.primary    → rgb(0, 128, 0)  (أخضر، attribute خسر)
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** ليه ملفات الـ reset والمكتبات الحديثة بتكتب قواعدها جوه [[:where()]]؟ ٣ سطور لزميل.`, done: R`الشرح فيه: [[:where()]] وزنها صفر، فأي قاعدة يكتبها صاحب الموقع (حتى [[p]] لوحدها) بتغلبها من غير ما يكبّر الـ selector أو يستخدم important، والمكتبة كده بتدّي شكل افتراضي بس.`, sol: R`**الرد النموذجي لزميلك:**

~~~text الشرح
:where() وزنها صفر مهما كان جواها، فأي قاعدة صاحب الموقع يكتبها، حتى p لوحدها، بتغلب قاعدة المكتبة.
كده المكتبة بتدّي شكل افتراضي بس، ومش بتتخانق مع اللي بيستخدمها.
ومن غيرها كان هيضطر يكبّر الـ selector أو يستخدم !important عشان يغيّر حاجة بسيطة.
~~~

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>where</title>
<style>
  /* المكتبة */
  :where(.prose) p { color: gray; }
  .prose2 p { color: gray; }
  /* صاحب الموقع */
  p { color: black; }
</style>
</head>
<body>
<div class="prose"><p id="a">بـ where</p></div>
<div class="prose2"><p id="b">من غير where</p></div>
</body>
</html>
~~~

**الغلطة الشائعة:** تستخدم [[:where()]] في كود الموقع نفسه لأي حاجة. دي مناسبة للي **المفروض** يتكسر بسهولة زي reset أو مكتبة، مش لقواعد عايزها تثبت.

~~~text الناتج
:where(.prose) p  ضد  p  → rgb(0, 0, 0)  (p كسبت)
.prose2 p         ضد  p  → rgb(128, 128, 128)  (المكتبة كسبت)
~~~` },
          ],
          title: "ليه القاعدة بتاعتي مش بتتطبق؟",
          desc: R`لما قاعدتين بيختاروا نفس العنصر ويغيّروا نفس الخاصية، المتصفح بيدّي كل selector وزن من 3 خانات: (id، class، نوع). الأعلى يكسب، ولو اتساووا اللي مكتوب آخر يكسب.

id واحد أقوى من أي عدد classes. و [[style=""]] في الـ HTML أقوى منهم كلهم، و [[!important]] بيقلب اللعبة كلها (ودا سبب إنه مشكلة).`,
          example: R`button { color: black; }
.btn { color: blue; }
.nav .btn { color: green; }
nav .btn:hover { color: orange; }
.btn.primary { color: white; }
:where(.nav) .btn { color: purple; }
nav#main .btn { color: red; }`,
          try: R`اعمل زرار عليه [[class="btn primary"]] جوه [[<nav class="nav" id="main">]] وحط القواعد دي. افتح DevTools › Elements › Styles: هتلاقي القواعد اللي خسرت متشطّب عليها. وقف بالماوس على أي selector وهيقولك الـ specificity بتاعته.`,
          flag: "script",
          deep: {
            why: R`أشهر مشكلة CSS: كتبت قاعدة ومش بتتطبق، فتحط [[!important]]، وبعدين قاعدة تانية محتاجة تغلبها فتحط [[!important]] تاني، لحد ما الملف يبقى حرب. لو فهمت الوزن هتعرف ليه قاعدة خسرت وتصلّحها صح.`,
            how: R`الوزن بيتحسب كده: A = عدد الـ ids. B = عدد الـ classes والـ attributes ([[[type]]]) والـ pseudo-classes ([[:hover]]). C = عدد أنواع العناصر ([[div]]) والـ pseudo-elements ([[::before]]). المقارنة خانة خانة من الشمال: A الأول، ولو اتساوت B، ولو اتساوت C. عشان كده 11 class مش بيغلبوا id واحد، مفيش «تحويل» بين الخانات.

حاجات ملهاش وزن: [[*]]، والـ combinators ([[>]] و [[+]] والمسافة)، و [[:where()]]. و [[:is()]] و [[:not()]] و [[:has()]] وزنهم = وزن أتقل حاجة جواهم.

الـ specificity بتتقارن بس بين قواعد في نفس المستوى من الـ cascade. قبلها فيه حاجات أهم: [[!important]] والـ cascade layers (الدرس الجاي). والوراثة ملهاش specificity خالص: أي قاعدة مباشرة على العنصر، حتى [[*]]، بتغلب قيمة جاية بالوراثة من الأب.

[[style="..."]] في الـ HTML بيكسب أي selector، و [[!important]] في ملف CSS بيكسب الـ inline.`,
            when: "كل مرة قاعدة مش بتتطبق: افتح Styles في DevTools وشوف مين كسب وليه، قبل ما تلمس !important.",
            mistakes: R`تحل كل حاجة بـ [[!important]]. تستخدم id في التنسيق. وفي مشروع حقيقي كان فيه قواعد للعربي مكتوبة [[html[lang="ar"] .hero-title { font-size: ... !important }]] عشان تغلب utility بتاعة Tailwind: الأنضف إنها تبقى variant زي [[rtl:]]، أو CSS variable قيمته بتتغير حسب اللغة.`
          },
          teach: R`## الفكرة في سطرين

7 قواعد كلهم بيمسكوا نفس الزرار وكلهم بيغيّروا [[color]]. واحدة بس هتكسب، والمتصفح بيقرر بالـ specificity (وزن الـ selector). جرّبتهم في Chrome (headless) على [[<nav class="nav" id="main"><button class="btn primary">]]، وخدت الوزن اللي Chrome نفسه حسبه لكل selector (من [[CSS.getMatchedStylesForNode]] في DevTools Protocol، نفس الرقم اللي بيظهر لما تقف على الـ selector في Styles).

---

## ١. الوزن 3 خانات (A, B, C)

| الخانة | بتعد إيه |
|---|---|
| A | الـ ids: [[#main]] |
| B | الـ classes [[.btn]]، والـ attributes [[[type]]]، والـ pseudo-classes [[:hover]] |
| C | أنواع العناصر [[button]]، والـ pseudo-elements [[::after]] |

المقارنة خانة خانة من الشمال، زي ما بتقارن أرقام تليفون: اللي A بتاعه أكبر كسب على طول، ولو اتساووا بص على B، وبعدين C.

---

## ٢. السطور واحد واحد

ده اللي Chrome حسبه (كل الـ 7 بيمسكوا الزرار، و [[:hover]] بس لما الماوس عليه):

| السطر | الحسبة | الوزن |
|---|---|---|
| [[button]] | نوع واحد | (0,0,1) |
| [[.btn]] | class واحدة | (0,1,0) |
| [[.nav .btn]] | 2 class، والمسافة ملهاش وزن | (0,2,0) |
| [[nav .btn:hover]] | نوع + class + pseudo-class | (0,2,1) |
| [[.btn.primary]] | 2 class لازقين = عنصر عليه الاتنين | (0,2,0) |
| [[:where(.nav) .btn]] | [[:where()]] وزنها صفر مهما كان جواها، فاللي فاضل [[.btn]] | (0,1,0) |
| [[nav#main .btn]] | نوع + id + class | (1,1,1) |

Chrome فك [[:where(.nav) .btn]] وحسب حتة واحدة بس: [[.btn]].

---

## ٣. مين كسب؟

| الحالة | اللون اللي اتقاس | الكسبان |
|---|---|---|
| الكود زي ما هو | [[rgb(255, 0, 0)]] أحمر | [[nav#main .btn]] (1,1,1) |
| نفس الكلام والماوس عليه | [[rgb(255, 0, 0)]] أحمر | لسه هو: (0,2,1) أقل من (1,1,1) |
| شلت سطر الـ id | [[rgb(255, 255, 255)]] أبيض | [[.btn.primary]] |
| من غير الـ id والماوس عليه | [[rgb(255, 165, 0)]] برتقاني | [[nav .btn:hover]] (0,2,1) |

### ليه الأبيض كسب الأخضر؟

[[.nav .btn]] و [[.btn.primary]] الاتنين (0,2,0). لما الوزن يتساوى، اللي **مكتوب آخر** في الملف يكسب، و [[.btn.primary]] بعدها.

---

## ٤. تجارب زيادة

| التجربة | اللون | ليه |
|---|---|---|
| [[.a.a.a.a.a.a.a.a.a.a.a]] (11 class) ضد [[#x]] | أحمر بتاع الـ id | (0,11,0) ضد (1,0,0): A الأول، ومفيش «تحويل» بين الخانات |
| [[style="color:green"]] ضد [[#x]] | أخضر | الـ inline style أقوى من أي selector |
| [[p { color: blue !important }]] ضد inline و id | أزرق | [[!important]] بيقلب الترتيب كله |

---

## الخلاصة

- الوزن (ids، classes، types) والمقارنة من الشمال.
- id واحد أقوى من أي عدد classes.
- [[:where()]] وزنها صفر، والمسافة و [[>]] ملهمش وزن.
- لو اتساووا: الأخير في الملف يكسب.
- [[style=""]] أقوى من الـ selectors، و [[!important]] أقوى من الكل. استخدم classes بس، وارجع لـ DevTools › Styles تشوف مين كسب قبل ما تفكر في [[!important]].`,
          lines: [
            "(0,0,1): نوع عنصر بس. أضعف حاجة.",
            "(0,1,0): class واحدة تغلب أي عدد أنواع.",
            R`(0,2,0): اتنين class ([[.nav]] و [[.btn]])، فبتغلب [[.btn]] لوحدها اللي (0,1,0)، والزرار بقى أخضر.`,
            R`(0,2,1): class و pseudo-class ([[:hover]] وزنها زي class) ونوع.`,
            R`(0,2,0): زي [[.nav .btn]] بالظبط، فاللي مكتوبة آخر تكسب، ودي هي.`,
            R`(0,1,0): [[:where()]] وزنها صفر مهما كان جواها، فدي وزنها وزن [[.btn]] بس.`,
            "(1,1,1): فيها id، فتغلب كل اللي فوق حتى لو فيهم عشر classes."
          ],
          sol: R`الزرار هيطلع أحمر، وهيفضل أحمر حتى لما تقف عليه بالماوس. في Styles هتلاقي [[nav#main .btn]] فوق ومش متشطّب، وكل اللي تحته ([[.btn.primary]] و [[.nav .btn]] و [[:where(.nav) .btn]] و [[.btn]] و [[button]]) الـ color بتاعهم متشطّب.

الأرقام اللي هتظهر لما تقف على كل selector: [[nav#main .btn]] ‏(1,1,1)، و [[nav .btn:hover]] ‏(0,2,1)، و [[.nav .btn]] و [[.btn.primary]] ‏(0,2,0) (متعادلين، والأخير في الملف كسب بينهم)، و [[:where(.nav) .btn]] ‏(0,1,0) لأن [[:where]] بيصفّر اللي جواه، و [[.btn]] ‏(0,1,0)، و [[button]] ‏(0,0,1). الـ id لوحده بيغلب أي عدد من الكلاسات.

الغلط الشائع: تتوقع الـ hover يطلّع برتقاني لأنه «أحدث». (0,2,1) أقل من (1,1,1) فبيخسر. ولو امسحت سطر [[nav#main .btn]] هيبقى أبيض، ومع الـ hover برتقاني لأن (0,2,1) أكبر من (0,2,0).`
        },
        {
          cmd: "cascade",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الـ body عليه [[font-family: "Times New Roman"]]. زرار [[<button>]] جوه الصفحة خطه هيبقى إيه؟ ورث من الـ body؟`, done: R`لأ: في Chrome على ويندوز الزرار طلع [[Arial]] وحجمه [[13.3333px]]، لأن المتصفح بيدّي الأزرار والحقول خط من عنده بيغلب الوراثة. الحل اللي في كل reset: [[button, input, select, textarea { font: inherit; }]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخط</title>
<style>
  body { font-family: "Times New Roman"; }
</style>
</head>
<body>
<p>فقرة</p>
<button>زرار</button>
<input value="حقل">
</body>
</html>
~~~

**الإجابة:** لأ، الزرار مش بيورث. [[font-family]] خاصية بتتورّث فعلًا، بس الوراثة أضعف حاجة في الـ cascade: أي قاعدة على العنصر نفسه تغلبها. والمتصفح عنده ملف CSS داخلي بيدّي الأزرار والحقول خط وحجم من عنده، وده بيغلب الوراثة.

**الحل اللي في كل reset:**

~~~css
button, input, select, textarea {
  font: inherit;
}
~~~

[[inherit]] بتقول «خد قيمة أبوك» صراحة، فبقت قاعدة على العنصر نفسه.

**الغلطة الشائعة:** تعمل خط عربي جميل على الـ body، والأزرار تفضل Arial، وتزوّد الخط على كل زرار لوحده.

~~~text الناتج
                   font-family            font-size
الفقرة             "Times New Roman"        16px
الزرار قبل         Arial                  13.3333px
الزرار بعد inherit "Times New Roman"        16px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقعك فيه [[.btn { padding: 4px; }]] ومكتبة جاهزة (مربوطة بعدك) فيها [[.btn { padding: 20px; }]]، فأزرارك كلها اتغيّرت. حطها في طبقة: [[@import url("lib.css") layer(vendor);]] في أول ملفك.`, done: R`الـ padding رجع [[4px]] في Computed مع إن المكتبة لسه موجودة: قواعدك اللي برّه أي طبقة بتغلب أي طبقة، مهما كان ترتيب الملفات أو الـ specificity جوه المكتبة.`, sol: R`~~~css style.css
@import url("lib.css") layer(vendor);

.btn { padding: 4px; }
~~~

~~~css lib.css
.btn { padding: 20px; }
~~~

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأزرار</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<button class="btn">زرار</button>
</body>
</html>
~~~

**ليه ده بيحل المشكلة:** قبل كده الاتنين في نفس المكانة، ونفس الوزن، فاللي آخر كسب. الـ [[layer(vendor)]] بيحط كل المكتبة في طبقة. والقاعدة: **أي CSS برّه الطبقات بيغلب أي CSS جوه طبقة**، مهما كان الوزن ومهما كان الترتيب.

[[@import]] لازم يبقى أول سطر في الملف، قبل أي قاعدة، وإلا المتصفح بيتجاهله.

**الغلطة الشائعة:** تظن إن الحل تحويل قواعدك لـ [[#id]] أو [[!important]]. وفي الـ layers الـ [[!important]] بيتقلب: important في طبقة بيغلب important برّه الطبقات، فمتستخدمهوش كحل هنا.

~~~text الناتج
قبل (lib.css مربوط بعد ملفك): padding = 20px
بعد (layer):                  padding = 4px
حتى لو المكتبة فيها #x .btn { padding: 20px }: 4px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** ملف CSS واحد بـ [[@layer reset, components, utilities;]]: reset فيه box-sizing و [[font: inherit]] و margin صفر، و components فيه [[.card]] بـ [[display: grid]] و [[margin-block-end: 24px]]، و utilities فيه [[.mt-0 { margin-block-start: 0; }]] و [[.hidden { display: none; }]].`, done: R`[[<div class="card hidden">]] مختفي رغم إن الاتنين class واحدة، لأن utilities آخر طبقة. ولو بدّلت ترتيب الطبقات في أول سطر بس (من غير ما تحرّك القواعد) الكارت بيرجع يظهر.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطبقات</title>
<style>
  @layer reset, components, utilities;

  @layer reset {
    *, *::before, *::after { box-sizing: border-box; }
    body, h1, p { margin: 0; }
    button, input { font: inherit; }
  }

  @layer components {
    .card {
      display: grid;
      gap: 8px;
      padding: 16px;
      margin-block-end: 24px;
      border: 1px solid #d4d4d8;
    }
  }

  @layer utilities {
    .mt-0 { margin-block-start: 0; }
    .hidden { display: none; }
  }
</style>
</head>
<body>
<main>
  <h1>الكروت</h1>
  <div id="a" class="card">كارت عادي</div>
  <div id="b" class="card hidden">كارت مخفي</div>
</main>
</body>
</html>
~~~

**السطر الأول هو كل الحكاية:** [[@layer reset, components, utilities;]] بيحدد الترتيب من الأضعف للأقوى، مهما كان مكان القواعد نفسها في الملف.

[[.card]] و [[.hidden]] نفس الوزن (0,1,0). لكن الطبقات بتتقارن **قبل** الوزن، و [[utilities]] آخر طبقة فتكسب. فتقدر تطمن إن [[.hidden]] هتشتغل دايمًا، من غير [[!important]].

**الغلطة الشائعة:** تسيب قواعد برّه أي طبقة وهي المفروض تبقى جوه. أي قاعدة برّه بتغلب كل الطبقات، حتى [[utilities]]، فـ [[.hidden]] هتخسر قدامها.

~~~text الناتج
.card hidden: display = none  (مخفي)
بعد تبديل أول سطر لـ utilities, reset, components:
.card hidden: display = grid  (ظهر، من غير ما نحرّك ولا قاعدة)
box-sizing للكارت = border-box
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف الفرق بين [[inherit]] و [[initial]] و [[unset]] و [[revert]]، وجرّب الأربعة على [[color]] لـ p جوه div أحمر، وعلى [[display]] لـ div.`, done: R`على color: inherit و unset أحمر (color بيتورّث)، و initial أسود، و revert كمان أحمر (المتصفح مالوش لون خاص بالـ p، فرجع للوراثة). وعلى display: initial و unset بقوا [[inline]] (مش block!)، و revert رجّع [[block]]. فعرفت إن initial مش «بتاع المتصفح».`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>القيم</title>
<style>
  .red { color: red; }
  .i1 { color: inherit; }
  .i2 { color: initial; }
  .i3 { color: unset; }
  .i4 { color: revert; }
  .d1 { display: initial; }
  .d2 { display: unset; }
  .d3 { display: revert; }
</style>
</head>
<body>
<div class="red">
  <p class="i1">inherit</p>
  <p class="i2">initial</p>
  <p class="i3">unset</p>
  <p class="i4">revert</p>
</div>
<div class="d1">a</div>
<div class="d2">b</div>
<div class="d3">c</div>
</body>
</html>
~~~

| الكلمة | معناها |
|---|---|
| [[inherit]] | خد قيمة الأب، حتى لو الخاصية مبتتورّثش |
| [[initial]] | القيمة الأولية من مواصفة CSS، مش بتاعة المتصفح |
| [[unset]] | لو الخاصية بتتورّث يبقى inherit، ولو لأ يبقى initial |
| [[revert]] | ارجع لشكل المتصفح الافتراضي لو فيه، وبعدها الوراثة |

**ليه** [[display: initial]] **طلع inline:** القيمة الأولية لـ [[display]] في المواصفة هي [[inline]] لكل العناصر. إن div يبقى block ده قاعدة في ملف المتصفح، مش في المواصفة. عشان كده [[revert]] رجّعته block.

**الغلطة الشائعة:** تكتب [[display: initial]] عشان «ترجّع» عنصر مخفي. الـ div هيرجع inline وشكله هيتكسر. اكتب [[revert]].

~~~text الناتج
color لـ p جوه div أحمر:
inherit  rgb(255, 0, 0)
initial  rgb(0, 0, 0)
unset    rgb(255, 0, 0)
revert   rgb(255, 0, 0)

display لـ div:
initial  inline
unset    inline
revert   block
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** افتح أي صفحة كبيرة (موقع أخبار أو متجر)، واختار زرار، وفي DevTools › Styles عدّ: كام قاعدة بتطبّق عليه؟ كام واحدة متشطّب عليها؟ وكام [[!important]]؟ وفي Computed اضغط السهم جنب [[color]] تعرف مين كسب.`, done: R`كتبت الأرقام التلاتة لزرار واحد، وعرفت القاعدة اللي كسبت في color و padding واسم الملف بتاعها، وكتبت جملة: الكسب كان بسبب الطبقة ولا الـ specificity ولا الترتيب.`, sol: R`التمرين على موقع حقيقي من اختيارك، فالأرقام هتختلف. عشان تشوف شكل الإجابة، ده معمل بيقلّد موقع متجر متخيل، بنفس طريقة القراءة:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر</title>
<link rel="stylesheet" href="vendor.css">
<style>
  .btn { padding: 12px 24px; }
  .product .btn { color: white; }
  .btn-buy { background: green !important; }
</style>
</head>
<body>
<main class="product">
  <h1>المنتج</h1>
  <button class="btn btn-buy">اشتري</button>
</main>
</body>
</html>
~~~

~~~css vendor.css
.btn { padding: 8px; color: black; background: gray; border: 0; }
.btn:hover { background: darkgray; }
~~~

**الخطوات في DevTools:** كليك يمين على الزرار، ثم Inspect. في Styles عدّ القواعد واللي متشطّب عليه. وفي Computed دوّر على [[color]] واضغط السهم: هيوديك للقاعدة الكسبانة والملف بتاعها.

**الغلطة الشائعة:** تعد القواعد من غير ما تفرق بين اللي جاي من «user agent stylesheet» وقواعد الموقع. والموقع الكبير غالبًا CSS بتاعه متجمّع في ملف واحد، فاسم الملف مش هيوضّح المصدر.

**إجابة نموذجية على المعمل:**

~~~text الناتج
القواعد اللي بتطبّق (من غير بتاعة المتصفح): 4
  .btn
  .btn
  .btn-buy
  .product .btn

السطور المتشطّب عليها: 3  (.btn → padding ، .btn → color ، .btn → background)
عدد !important: 1

color = rgb(255, 255, 255): كسبت .product .btn من ملف <style>
       السبب: الـ specificity (0,2,0) أكبر من .btn في vendor.css (0,1,0)
padding = 12px 24px: كسبت .btn من ملف <style>
       السبب: الترتيب، نفس الوزن واللي بعد يكسب
background = rgb(0, 128, 0): كسبت .btn-buy
       السبب: !important
~~~` },
          ],
          title: "قاعدتين بيتخانقوا: الترتيب الكامل للي بيكسب",
          desc: R`الـ cascade هو الخوارزمية اللي بتقرر القيمة النهائية لكل خاصية. بالترتيب: [[!important]] الأول، وبعدين الـ inline style، وبعدين الـ layer ([[@layer]])، وبعدين الـ specificity، وآخر حاجة الترتيب في الملف (الآخر يكسب).

ولو مفيش ولا قاعدة على العنصر، بعض الخصائص بتتورث من الأب (زي [[color]] و [[font-family]] و [[line-height]])، وبعضها لأ (زي [[padding]] و [[border]] و [[background]]).`,
          example: R`@layer base, components;
@layer base {
  a { color: blue; }
}
@layer components {
  .link { color: green; }
}
a { color: red; }
body { color: black; font-family: system-ui; }
.card { border: inherit; }`,
          try: R`حط الكود ده في صفحة فيها [[<a class="link">]] وشوف لونه أحمر. امسح سطر [[a { color: red; }]] يبقى أخضر. وبعدين في DevTools › Elements › Computed دوّر على color واضغط على السهم يوديك للقاعدة اللي كسبت.`,
          flag: "script",
          deep: {
            why: "الـ CSS اسمه Cascading Style Sheets، والـ cascade هو قلبه. أي تنسيق فيه أكتر من مصدر (ملفك، ومكتبة، و Tailwind، والمتصفح نفسه) هيبقى فيه تعارض، ولازم قاعدة واضحة تحسمه.",
            how: R`الترتيب الكامل من الأقوى: 1) الـ origin والـ importance: [[!important]] بتاعة المستخدم والمتصفح، وبعدين [[!important]] بتاعتك، وبعدين العادي بتاعك، وبعدين تنسيق المتصفح الافتراضي. 2) الـ inline style. 3) الـ layers: في الكلام العادي اللي برا أي layer أقوى، وبين الـ layers اللي اتعلنت آخر أقوى (وفي [[!important]] الترتيب بيتعكس). 4) الـ specificity. 5) الترتيب في الكود.

ودا مهم جدًا مع Tailwind v4: هو بيحط كل حاجة في layers حقيقية ([[theme]] و [[base]] و [[components]] و [[utilities]]). فأي CSS تكتبه في globals.css برا layer بيغلب كل الـ utilities، حتى لو الـ specificity بتاعته أقل. عايز قاعدة تتغلب بـ utility؟ حطها في [[@layer base]] أو [[@layer components]].

الوراثة: خصائص الكلام (color و font و line-height و direction و visibility) بتتورث، لأن منطقي إن الكلام جوه كارت ياخد خط الكارت. خصائص الصندوق (margin و padding و border و background و width) مش بتتورث. وعندك كلمات خاصة لأي خاصية: [[inherit]] (خد من الأب)، و [[initial]] (القيمة الافتراضية للخاصية)، و [[unset]] (inherit لو بتتورث و initial لو لأ).`,
            when: "لما تكتب CSS جنب مكتبة (Tailwind أو Bootstrap)، وعايز تتحكم مين يغلب مين من غير !important.",
            mistakes: R`تكتب CSS عادي في globals.css جنب Tailwind v4 وتستغرب إن [[p-4]] مش شغال على العنصر: قاعدتك برا layer فبتكسب. وتفتكر إن [[!important]] حل: بيحل مرة ويعمل مشكلة كل مرة بعدها. وتستنى إن [[padding]] يتورث من الأب.`
          },
          teach: R`## الفكرة في سطرين

3 قواعد بيلوّنوا اللينك بـ 3 ألوان، والـ cascade هو اللي بيقرر مين يكسب. والفكرة الجديدة هنا الـ layers ([[@layer]]): طبقات بتحدد الأولوية **قبل** ما الـ specificity تتحسب أصلًا. وآخر سطرين عن الوراثة. جرّبت الكود في Chrome (headless) على الصفحة دي، وقريت [[getComputedStyle]]:

~~~text index.html
<a class="link" href="#">لينك</a>
<a href="#">لينك عادي</a>
<section style="border: 3px dashed green; padding: 4px">
  <div class="card">كارت</div>
  <div class="plain">عادي</div>
</section>
~~~

---

## ١. [[@layer base, components;]]

[[@]] في CSS معناها at-rule: أمر للمتصفح مش قاعدة تنسيق. السطر ده بيعلن أسامي الطبقات **وترتيبها**: اللي مكتوبة آخر أقوى. فـ [[components]] أقوى من [[base]].

---

## ٢. القواعد جوه الطبقات

~~~text style.css
@layer base {
  a { color: blue; }
}
@layer components {
  .link { color: green; }
}
~~~

[[@layer base { ... }]] = القواعد اللي جوه القوسين دول تبع طبقة base. لاحظ إن [[a]] وزنه (0,0,1) و [[.link]] وزنه (0,1,0)، بس ده مش هيفرق، الطبقة هي اللي بتحسم.

---

## ٣. قاعدة برا أي طبقة

~~~text style.css
a { color: red; }
~~~

القواعد اللي برا الطبقات أقوى من أي طبقة. والنتايج:

| الكود | [[.link]] | اللينك العادي |
|---|---|---|
| زي ما هو | [[rgb(255, 0, 0)]] أحمر | أحمر |
| من غير [[a { color: red; }]] | [[rgb(0, 128, 0)]] أخضر | [[rgb(0, 0, 255)]] أزرق |
| ومعاه قلبت الترتيب لـ [[@layer components, base;]] | [[rgb(0, 0, 255)]] أزرق | أزرق |
| من غير أي CSS | [[rgb(0, 0, 238)]] | [[rgb(0, 0, 238)]] |

اقرا الجدول:

1. السطر الأول: [[a]] (أضعف selector) غلب [[.link]] لأنه برا الطبقات.
2. التاني: [[.link]] أخضر لأن components بعد base. واللينك العادي أزرق لأن [[.link]] مش بتمسكه.
3. التالت: لما base بقت الأخيرة، [[a]] كسب [[.link]] رغم إن وزنه أقل. ده الدليل إن الطبقة بتتحسب قبل الـ specificity.
4. الرابع: [[rgb(0, 0, 238)]] لون اللينك من تنسيق المتصفح نفسه.

### و [[!important]]؟

جرّبت نفس الـ 3 قواعد بس كلهم [[!important]]: اللون بقى **أزرق** (بتاع base). مع [[!important]] الترتيب بيتعكس: الطبقة الأولى أقوى، والقواعد اللي برا الطبقات أضعف.

---

## ٤. الوراثة: [[body { color: black; font-family: system-ui; }]]

- [[font-family]]: الخط. [[system-ui]] = خط نظام التشغيل.
- لو عنصر ملوش قاعدة لخاصية بتتورث، بياخد قيمة أبوه.

اللي اتقاس على اللينك:

| الخاصية | قيمتها على اللينك | ليه |
|---|---|---|
| [[font-family]] | [[system-ui]] | بتتورث، واللينك ملوش قاعدة font. (من غير CSS كانت [[Times New Roman]]) |
| [[color]] | أحمر مش أسود | الـ color بيتورث، بس اللينك عليه قاعدة مباشرة (منك أو من المتصفح نفسه) والوراثة بتخسر قدام أي قاعدة مباشرة |
| [[padding]] | [[0px]] | مش بيتورث أصلًا |

حتى في حالة «من غير أي CSS» الـ body أسود واللينك فضل [[rgb(0, 0, 238)]]: قاعدة المتصفح للينكات مباشرة على الـ a، فغلبت الوراثة.

---

## ٥. [[.card { border: inherit; }]]

[[border]] مش بيتورث لوحده. [[inherit]] كلمة بتجبر الخاصية تاخد قيمة الأب:

| العنصر | [[border]] |
|---|---|
| [[.card]] | [[3px dashed rgb(0, 128, 0)]] (نفس الـ section) |
| [[.plain]] | [[0px none]] |

[[dashed]] = خط متقطّع.

---

## الخلاصة

الترتيب من الأقوى للأضعف (للقواعد العادية من غير [[!important]]):

| الخطوة | السؤال |
|---|---|
| ١ | inline style؟ |
| ٢ | برا الطبقات ولا جوه؟ (برا أقوى، وبين الطبقات الأخيرة أقوى) |
| ٣ | الـ specificity |
| ٤ | الأخير في الملف |
| ٥ | مفيش ولا قاعدة؟ وراثة من الأب (لو الخاصية بتتورث) |

- Tailwind v4 بيحط الـ utilities في طبقة، فأي CSS برا الطبقات بيغلبها.
- خصائص الكلام بتتورث (color و font)، وخصائص الصندوق لأ (padding و border و background).`,
          lines: [
            "بنعلن ترتيب الـ layers: اللي بعد أقوى. components تغلب base مهما كانت الـ specificity.",
            "بداية layer اسمها base.",
            R`كل اللينكات أزرق، بس جوه أضعف طبقة: أي قاعدة في components أو برا الطبقات هتغلبها.`,
            "قفلة الـ layer.",
            R`بداية طبقة components: أقوى من base عشان اتكتبت بعدها في سطر [[@layer base, components;]]، مش عشان مكانها في الملف.`,
            R`[[.link]] أخضر، وبتغلب اللي في base.`,
            "قفلة.",
            R`قاعدة برا أي layer: بتغلب كل الـ layers، فكل اللينكات هتبقى حمرا حتى [[.link]].`,
            R`[[color]] و [[font-family]] بيتورّثوا: كل اللي جوه body هياخدهم لو ملوش قاعدة.`,
            R`[[border]] مش بيتورّث، بس [[inherit]] بيجبره ياخد قيمة الأب.`
          ],
          sol: R`بالكود زي ما هو: اللينك أحمر. الـ [[a { color: red; }]] برا أي layer، والقواعد اللي برا الـ layers بتكسب أي قاعدة جوه layer مهما كانت الـ specificity، فحتى [[.link]] (كلاس) خسر قدام [[a]] (عنصر).

بعد ما تمسح السطر: أخضر، لأن [[components]] متعرّف بعد [[base]] في أول سطر، فهو الأقوى بين الطبقتين، مش عشان [[.link]] specificity أعلى. (لو قلبت الترتيب لـ [[@layer components, base;]] هيبقى أزرق رغم إن [[a]] أضعف.) في Computed › color السهم بيوديك لـ [[.link]] جوه [[@layer components]]، وتحتها القواعد اللي خسرت.

والـ [[font-family]] اللي على body هتلاقيها في Computed على اللينك كمان لأنها بتتورث، لكن [[border]] مش بيتورث لوحده، عشان كده محتاج [[inherit]] صريح. لو اللينك طلع أزرق من الأول يبقى غالبًا الـ CSS متحطّش خالص وده لون المتصفح الافتراضي للينكات.`
        },
        {
          cmd: "box model",
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[width: 300px; padding: 20px; border: 5px solid; margin: 10px]]. احسب العرض اللي العنصر بياخده على الشاشة (من الحد للحد) والمساحة اللي بيحجزها شامل الـ margin، مرة بـ [[content-box]] ومرة بـ [[border-box]].`, done: R`content-box: الصندوق 350 (300 + 40 + 10) والمحجوز 370، والمحتوى 300. border-box: الصندوق 300 والمحجوز 320 والمحتوى 250. والرسمة في Computed قالت نفس الأرقام.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصندوق</title>
<style>
  .box { width: 300px; padding: 20px; border: 5px solid; margin: 10px; }
  .a { box-sizing: content-box; }
  .b { box-sizing: border-box; }
</style>
</head>
<body>
<div class="box a">content-box</div>
<div class="box b">border-box</div>
</body>
</html>
~~~

**الحساب بالأرقام:**

| | content-box | border-box |
|---|---|---|
| المحتوى | 300 | 300 − 40 − 10 = 250 |
| الصندوق من الحد للحد | 300 + 40 + 10 = 350 | 300 |
| المساحة المحجوزة بالـ margin | 350 + 20 = 370 | 300 + 20 = 320 |

**الفكرة:** [[width]] في [[content-box]] معناها عرض المحتوى، فالـ padding والـ border بيزيدوا عليه. وفي [[border-box]] معناها الصندوق كله، فهم بياكلوا من المحتوى.

والـ margin برّه الصندوق في الحالتين، و [[getBoundingClientRect]] مبيحسبهوش.

**الغلطة الشائعة:** تعتبر [[width: 300px]] معناها إن العنصر 300 على الشاشة، فتتفاجئ بـ 350. عشان كده كل reset حديث بيحط [[box-sizing: border-box]].

~~~text الناتج
                       الصندوق    المحتوى    بالـ margin
content-box            350      300      370
border-box             300      250      320
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عنصرين ورا بعض: الأول [[margin-bottom: 24px]] والتاني [[margin-top: 16px]]. المسافة بينهم كام؟ وبعدين حطهم جوه أب عليه [[display: flex; flex-direction: column]] وقيس تاني.`, done: R`عادي المسافة 24 (الـ margins بيتداخلوا وياخد الأكبر)، وجوه flex بقت 40 (الـ flex مفيهوش margin collapse). ودا سبب إن [[gap]] أريح من الـ margins في الـ layouts.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>margin</title>
<style>
  .a { margin-bottom: 24px; height: 40px; background: #bfdbfe; }
  .b { margin-top: 16px; height: 40px; background: #bbf7d0; }
  .flex { display: flex; flex-direction: column; }
</style>
</head>
<body>
<section id="n">
  <div class="a"></div>
  <div class="b"></div>
</section>
<section id="f" class="flex">
  <div class="a"></div>
  <div class="b"></div>
</section>
</body>
</html>
~~~

**الإجابة:** في الوضع العادي 24، وجوه flex بقت 40.

في الـ block العادي الـ margins الرأسية اللي بتتقابل بتتداخل، ده اسمه margin collapse، والمسافة بتبقى **أكبر** الاتنين مش مجموعهم. دي كانت فكرة قديمة للنصوص: مسافة بعد العنوان ومسافة قبل الفقرة ميتجمعوش.

جوه flex و grid مفيش collapse، فالاتنين بيتجمعوا.

**ليه** [[gap]] **أريح:** بتحط المسافة في الأب مرة واحدة، فمفيش حساب، ومفيش margin زيادة بعد آخر عنصر.

**الغلطة الشائعة:** تزوّد margin على عنصر ومتلاقيش المسافة زادت، لأن العنصر اللي جنبه margin بتاعه أكبر. وفيه حالات تانية للـ collapse، زي margin أول ابن مع أبوه.

~~~text الناتج
عادي: المسافة = 24px  (الأكبر)
flex: المسافة = 40px  (المجموع)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كارت باقة عليه [[width: 100%; padding: 24px; border: 2px solid]] جوه صندوق على موبايل 360، وطالع برّه الشاشة من الشمال وعامل scroll أفقي.`, done: R`قبل: الكارت 364 جوه صندوق 312 (اتقاس في Chrome)، يعني طالع 52px. بعد [[box-sizing: border-box]] الكارت بقى 312 بالظبط ومفيش scroll أفقي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الباقة</title>
<style>
  body { margin: 0; font-family: system-ui; }
  .box { padding: 24px; }
  .plan {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
    border: 2px solid #0f766e;
  }
</style>
</head>
<body>
<main class="box">
  <h1>الباقة</h1>
  <article class="plan">٣ شهور، ١٣٠٠ جنيه</article>
</main>
</body>
</html>
~~~

**السبب:** [[width: 100%]] يعني عرض الصندوق الأب، 312 هنا. ومن غير [[border-box]] الـ padding والـ border بيتزوّدوا فوقها: 312 + 48 + 4 = 364.

ولأن الصفحة RTL، العنصر بيبدأ من اليمين، فالزيادة بتطلع من **الشمال**.

**الحل على الموقع كله:** مش كارت كارت، سطر واحد في الـ reset:

~~~css
*, *::before, *::after { box-sizing: border-box; }
~~~

**الغلطة الشائعة:** تعالجها بـ [[width: calc(100% - 52px)]]. هتشتغل، بس كل ما الـ padding يتغيّر الرقم هيتغيّر.

~~~text الناتج
على 360:
             الأب    الكارت    طالع     overflow الصفحة
قبل          312     364     52px     28px
بعد          312     312     0px      0px
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شريط مايل بين جزئين في الصفحة: [[width: 106%; transform: rotate(-1.4deg)]]، وعامل scroll أفقي على الموبايل. حد اقترح [[html, body { overflow-x: hidden }]].`, done: R`قبل: [[scrollWidth]] كان 382 على شاشة 360. بعد [[overflow-x: clip]] على الـ section اللي فيه الشريط بس بقى 360، من غير ما تلمس الـ body (عشان الـ sticky يفضل شغال، شوف تمرين «جدول responsive»).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشريط</title>
<style>
  body { margin: 0; font-family: system-ui; }
  .band { overflow-x: clip; padding-block: 24px; }
  .strip {
    box-sizing: border-box;
    width: 106%;
    margin-inline-start: -3%;
    padding: 12px;
    background: #0f766e;
    color: #fff;
    text-align: center;
    transform: rotate(-1.4deg);
  }
</style>
</head>
<body>
<main>
  <h1>العروض</h1>
  <section class="band">
    <div class="strip">خصم ٢٠٪ النهارده بس</div>
  </section>
</main>
</body>
</html>
~~~

**ليه مش** [[html, body]]**:** [[overflow-x: hidden]] على الصفحة بيحل الشكل، بس بيكسر أي [[position: sticky]] فيها، زي تمرين «جدول responsive». وهو كمان حل واسع لمشكلة في مكان واحد.

**الحل المحدود:** [[overflow-x: clip]] على الـ section اللي فيه الشريط بس. [[clip]] بيقص من غير ما يعمل منطقة scroll.

و [[padding-block]] عشان الشريط المايل ميتقصّش من فوق وتحت، لأن [[overflow-x: clip]] بيقص أفقي بس، بس لو كتبت [[overflow: clip]] هيقص الاتنين.

و [[margin-inline-start: -3%]] زيادة صغيرة: بتوسّط الشريط، فالـ 6% الزيادة تطلع من الناحيتين بالتساوي.

**الغلطة الشائعة:** تخلي الشريط [[width: 100%]] عشان تتجنب المشكلة. الزوايا المايلة هتبان فاضية في الجناب، وده سبب الـ 106%.

~~~text الناتج
على 360:
scrollWidth قبل (من غير clip): 382
scrollWidth بعد:               360
sticky في نفس الصفحة بيشتغل: top = 0 بعد النزول
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** ٤ كروت حالة لجدول تمارين متخيل (مكتمل، ناقص، تحذير، راحة): فوق كل كارت شريط 4px بلون الحالة بـ [[::before]]، وخلفية الكارت نفس اللون فاتح جدًا، ولما الماوس ييجي عليه [[transform: translateY(-4px)]] وظل أكبر.`, done: R`الشريط جوه الكارت مش زايد عليه (الكارت ارتفاعه ثابت قبل وبعد الشريط، أو محسوب)، والـ hover مش بيحرّك الكروت اللي جنبه (اتأكد إن مكانهم ثابت)، والحالة مكتوبة كلام كمان مش لون بس.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جدول التمارين</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; max-width: 760px; margin-inline: auto; }
  .status {
    --c: #15803d;
    --soft: #f0fdf4;
    position: relative;
    overflow: hidden;
    padding: 20px 16px 16px;
    background: var(--soft);
    border-radius: 8px;
    transition: transform .15s, box-shadow .15s;
  }
  .status::before {
    content: "";
    position: absolute;
    inset-block-start: 0;
    inset-inline: 0;
    height: 4px;
    background: var(--c);
  }
  .status:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgb(0 0 0 / .15);
  }
  .status--miss { --c: #b91c1c; --soft: #fef2f2; }
  .status--warn { --c: #a16207; --soft: #fefce8; }
  .status--rest { --c: #1d4ed8; --soft: #eff6ff; }
</style>
</head>
<body>
<main>
<h1>تمارين الأسبوع</h1>
<div class="grid">
  <article class="status"><h2>السبت</h2><p>مكتمل</p></article>
  <article class="status status--miss"><h2>الأحد</h2><p>ناقص</p></article>
  <article class="status status--warn"><h2>الاتنين</h2><p>تحذير</p></article>
  <article class="status status--rest"><h2>التلات</h2><p>راحة</p></article>
</div>
</main>
</body>
</html>
~~~

**اللي يفرق هنا:**

- [[position: absolute]] على الشريط: مش بياخد مكان، فالكارت ارتفاعه مبيتغيّرش.
- [[overflow: hidden]]: عشان الشريط ياخد انحناء الزوايا بتاع الكارت.
- [[--c]] و [[--soft]]: كل modifier بيغيّر متغيرين بس.
- [[transform]]: بيحرّك العنصر في الرسم، من غير ما يغيّر الـ layout، فالجيران مبيتحركوش. لو استخدمت [[margin-top: -4px]] الصف كله هيتهز.

**الغلطة الشائعة:** الشريط بـ [[border-top: 4px solid]]. الحدود بتزوّد ارتفاع الكارت، والزوايا المدورة بتخلي طرفها رفيع.

~~~text الناتج
ارتفاع الكارت بالشريط 144.81px، ومن غير الشريط 144.81px
مكان الكارت اللي جنبه قبل hover x=646 y=85.88، وبعده x=646 y=85.88
الكارت نفسه طلع 4px
أقل تباين لكلام الحالة: 19.2:1
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** لينك عليه [[:hover { border: 4px solid }]] ولينك تاني [[:hover { outline: 4px solid }]]، وبعد كل واحد كلمة. حط الماوس على كل واحد وقيس الكلمة اللي بعده اتحركت كام.`, done: R`مع border الكلمة اتحركت 8px (4 من كل ناحية) فالسطر بيترعش، ومع outline اتحركت صفر لأن الـ outline مش جزء من الـ box model. فالـ focus ring والـ hover اللي بيرسم حدود يبقوا outline أو [[box-shadow]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحدود</title>
<style>
  a { color: #1d4ed8; }
  #a:hover { border: 4px solid; }
  #b:hover { outline: 4px solid; }
  .x { display: inline-block; }
</style>
</head>
<body>
<main>
<h1>الفرق</h1>
<p><a id="a" href="#one">لينك بحدود</a> <span class="x" id="ax">كلمة</span></p>
<p><a id="b" href="#two">لينك بـ outline</a> <span class="x" id="bx">كلمة</span></p>
</main>
</body>
</html>
~~~

**ليه الفرق:** الـ [[border]] جزء من الـ box model، فظهوره بيزوّد العرض 4 من كل ناحية، و الكلمة اللي بعده بتتزق. والـ [[outline]] بيترسم فوق الصفحة، برّه الحسابات خالص، فمحدش بيتحرك.

**لو عايز حدود حقيقية من غير رعشة:** حط [[border: 4px solid transparent]] من الأول، وغيّر اللون بس في الـ hover. أو استخدم [[box-shadow: 0 0 0 4px]].

**الغلطة الشائعة:** حلقة الـ focus بـ [[border]]. كل ما المستخدم يتنقل بـ Tab، الصفحة تتهز.

~~~text الناتج
الكلمة بعد اللينك بـ border: اتحركت 8px
الكلمة بعد اللينك بـ outline: اتحركت 0px
ارتفاع الفقرة قبل وبعد: 18 و 18 (اللينك inline فالحدود الرأسية مبتزقّش)
~~~` },
          ],
          title: "كل عنصر صندوق: المساحة بتتحسب إزاي",
          desc: R`كل عنصر في الصفحة صندوق من 4 طبقات من جوه لبرا: [[content]] (المحتوى)، و [[padding]] (مسافة جوه الحدود)، و [[border]] (الحدود)، و [[margin]] (مسافة برا بينه وبين اللي جنبه).

الافتراضي [[box-sizing: content-box]]: الـ [[width]] للمحتوى بس، والـ padding والـ border بيتزودوا عليه. عشان كده كل مشروع بيبدأ بـ [[box-sizing: border-box]]، فالـ width يبقى العرض الكامل شامل الـ padding والـ border.`,
          example: R`*, *::before, *::after {
  box-sizing: border-box;
}
.card {
  width: 300px;
  padding: 16px;
  border: 1px solid lightgray;
  margin: 0 auto 24px;
}
.stack > * + * {
  margin-top: 16px;
}`,
          try: R`اعمل div بـ [[width: 300px; padding: 20px; border: 5px solid]] وافتح DevTools › Computed: هتلاقي رسمة الصندوق بالأرقام، والعرض 350. ضيف [[box-sizing: border-box]] وشوفه بقى 300 والمحتوى صغر لـ 250.`,
          flag: "script",
          deep: {
            why: "لو مش فاهم الصندوق، كل تصميم هيطلع بكسلات زيادة: عمودين كل واحد 50% ومعاهم padding مش هيقفوا جنب بعض. و border-box بيخلي الحساب زي ما دماغك بتفكر: العرض اللي كتبته هو العرض اللي هتشوفه.",
            how: R`مع [[content-box]]: العرض الظاهر = width + الـ padding يمين وشمال + الـ border يمين وشمال. مع [[border-box]]: العرض الظاهر = width، والمحتوى هو اللي بيصغر. والـ margin برا الحساب في الحالتين.

Margin collapse: الـ margin الرأسي بين عنصرين block فوق بعض مش بيتجمع، الأكبر بس اللي بيفضل. فقرة تحتها 24 واللي بعدها فوقها 16، المسافة 24 مش 40. وكمان الـ margin-top بتاع أول ابن ممكن «يخرج» من الأب لو الأب ملوش padding ولا border. ده مش بيحصل جوه flex أو grid، ولا في الـ margin الأفقي.

[[margin: auto]] الأفقي على عنصر block ليه عرض بيقسّم المساحة الفاضية بالتساوي، فيتوسّط. و [[padding]] بالنسبة المئوية بيتحسب من عرض الأب، حتى الـ padding الرأسي.

Tailwind بيحط [[box-sizing: border-box]] على كل حاجة في الـ Preflight بتاعه، عشان كده مش بتفكر فيه. و [[space-y-4]] في Tailwind نفس فكرة [[.stack]]، و [[gap]] في flex و grid أحسن من الاتنين.`,
            when: "أول سطر في أي CSS بتكتبه من الصفر. وكل ما تلاقي حاجة أعرض من المتوقع أو مسافة غريبة، افتح رسمة الصندوق في DevTools.",
            mistakes: R`تنسى إن الـ margin الرأسي بيعمل collapse فتفضل تزوّده وهو مش بيتغير. تحط [[width: 100%]] مع padding من غير border-box فيظهر scroll أفقي. وتستخدم margin للمسافات بين عناصر flex أو grid بدل [[gap]].`
          },
          teach: R`## الفكرة في سطرين

كل عنصر صندوق من 4 طبقات، والـ CSS ده بيقول 3 حاجات: احسب العرض شامل الحشو والحدود، واعمل كارت عرضه 300 في النص، وحط مسافة 16 بين العناصر اللي جوه [[.stack]]. جرّبته في Chrome (headless) في نافذة عرضها 800 (والـ body من غير margin عشان الأرقام تبقى سهلة) على كارتين و 3 عناصر جوه stack.

---

## ١. الطبقات الأربعة

~~~text الصندوق من برا لجوه
┌──────────── margin ────────────┐
│ ┌────────── border ──────────┐ │
│ │ ┌──────── padding ───────┐ │ │
│ │ │        content         │ │ │
│ │ └────────────────────────┘ │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
~~~

| الطبقة | معناها | بتاخد لون الخلفية؟ |
|---|---|---|
| content | الكلام أو الأولاد | أيوه |
| padding | مسافة جوه الحدود | أيوه |
| border | الحدود نفسها | لونها هي |
| margin | مسافة برا، بينه وبين اللي جنبه | لأ، شفافة دايمًا |

---

## ٢. [[*, *::before, *::after { box-sizing: border-box; }]]

- [[*]]: كل العناصر. والفاصلة: «و». فالقاعدة على كل عنصر وكل [[::before]] و [[::after]].
- [[box-sizing]]: الـ [[width]] بيقيس إيه بالظبط.

قست الكارت (عرضه 300 و padding 16 و border 1):

| | [[box-sizing]] | العرض على الشاشة | عرض المحتوى |
|---|---|---|---|
| مع السطر ده | [[border-box]] | 300 | 266 |
| من غيره | [[content-box]] (الافتراضي) | 334 | 300 |

- [[content-box]]: الـ 300 للمحتوى بس، والباقي بيتزوّد: 300 + 16×2 + 1×2 = 334.
- [[border-box]]: الـ 300 هي العرض كله، والمحتوى بيصغر: 300 − 32 − 2 = 266.

---

## ٣. الكارت

~~~text style.css
.card {
  width: 300px;
  padding: 16px;
  border: 1px solid lightgray;
  margin: 0 auto 24px;
}
~~~

### [[border: 1px solid lightgray]]

اختصار لـ 3 قيم: التخانة، والشكل ([[solid]] خط متصل)، واللون.

### [[margin: 0 auto 24px]]

3 قيم معناها: فوق، والجنبين، وتحت.

| الجزء | القيمة | اتقاس |
|---|---|---|
| فوق | 0 | الكارت الأول عند y = 0 |
| يمين وشمال | [[auto]] | [[250px]] من كل ناحية |
| تحت | 24px | المسافة بين الكارتين 24 |

[[auto]] في الـ margin الأفقي بيقسم الفاضي بالتساوي: (800 − 300) ÷ 2 = 250، فالكارت بقى في النص. ومن غير border-box الكارت 334، فالـ margin بقى 233 من كل ناحية.

---

## ٤. [[.stack > * + *]]

اقراه من اليمين للشمال:

1. [[*]] الأخيرة: أي عنصر...
2. [[+ *]]: ...قبله على طول أخ (عنصر تاني على نفس المستوى)...
3. [[.stack >]]: ...وهو ابن مباشر لـ stack.

يعني كل الأولاد **ما عدا الأول**. حطيت 3 divs جوه stack:

| | margin-top للأولاد | المسافات بينهم |
|---|---|---|
| مع القاعدة | 0، 16، 16 | 16، 16 |
| من غيرها | 0، 0، 0 | 0، 0 |

الأول مخدش margin، فمفيش مسافة زيادة فوق الـ stack.

---

## ٥. الـ margin الرأسي بيتداخل (margin collapse)

جرّبت عنصرين فوق بعض: الأول [[margin-bottom: 24px]] والتاني [[margin-top: 16px]]:

| المكان | المسافة اللي اتقاست |
|---|---|
| جوه block عادي | 24 (الأكبر بس، مش 40) |
| جوه [[display: flex]] | 40 (اتجمعوا) |

وجرّبت [[<p style="margin-top: 30px">]] أول ابن جوه div ملوش padding ولا border: الـ p طلع لازق في أول الـ div (المسافة 0)، والـ 30 «خرجت» وبقت فوق الـ div نفسه. ده برضه margin collapse.

---

## ٦. التجربة اللي في «جرّب»

[[width: 300px; padding: 20px; border: 5px solid]]:

| [[box-sizing]] | [[offsetWidth]] | المحتوى |
|---|---|---|
| [[content-box]] | 350 | 300 |
| [[border-box]] | 300 | 250 |

[[offsetWidth]] = العرض شامل الـ padding والـ border (من غير الـ margin).

---

## الخلاصة

| | العرض الظاهر |
|---|---|
| [[content-box]] | width + padding × 2 + border × 2 |
| [[border-box]] | width بالظبط |

- الـ margin برا الحساب دايمًا.
- [[margin: 0 auto]] بيوسّط عنصر block ليه عرض.
- الـ margin الرأسي بين عنصرين block بياخد الأكبر، وجوه flex أو grid بيتجمع. وفي flex و grid استخدم [[gap]].`,
          lines: [
            "على كل العناصر وكل before و after.",
            "الـ width والـ height يشملوا الـ padding والـ border.",
            "قفلة.",
            R`قاعدة الكارت: أي عنصر عليه [[class="card"]].`,
            "العرض الكلي 300 بالظبط (بسبب border-box). من غيرها كان هيبقى 334.",
            "مسافة جوه الكارت من الـ 4 نواحي.",
            R`حدود من كل ناحية: سُمكها [[1px]] وشكلها [[solid]] (خط متصل) ولونها رمادي فاتح، وبتتحسب جوه الـ 300 بسبب border-box.`,
            R`فوق صفر، والجنبين [[auto]] (يتوسّط أفقي)، وتحت 24.`,
            "قفلة.",
            "أي عنصر جوه stack وقبله أخ: المسافة بين العناصر بس، مش قبل الأول.",
            "16 بكسل فوق كل عنصر من التاني ورايح.",
            "قفلة."
          ],
          sol: R`في Computed هتلاقي رسمة الصندوق: المحتوى 300 × (ارتفاع السطر)، والـ padding 20 من كل ناحية، والـ border 5، والـ margin 0. العرض اللي بيتشاف على الشاشة ([[offsetWidth]]) = 300 + 20×2 + 5×2 = [[350]].

بعد [[box-sizing: border-box]]: [[offsetWidth]] بقى [[300]]، والمحتوى جوه الرسمة بقى 250 (300 − 40 − 10). يعني الـ width بقت تحسب الـ padding والـ border جواها بدل ما تزودهم.

لو مشفتش فرق، اتأكد إن مفيش reset عندك (زي Tailwind أو الكود اللي في المثال) عامل border-box على كل حاجة أصلًا، فانت كده شايف 300 من الأول. ولو العرض طلع أكبر من 350، يبقى فيه scrollbar أو margin داخل في حسابك؛ الـ margin برا الصندوق ومش بيتحسب في العرض.`
        },
        {
          cmd: "display",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لينك جوه فقرة عليه [[padding: 10px; margin-top: 20px; margin-bottom: 20px]]. الفقرة هتطول؟ والفقرة اللي تحتها هتنزل؟`, done: R`لأ: ارتفاع الفقرة فضل 18 ومكان الفقرة اللي تحتها فضل زي ما هو، رغم إن Computed بيقول [[margin-top: 20px]]. الـ inline بيتجاهل الـ margin الرأسي، والـ padding بيترسم (خلفية اللينك كبرت) بس مش بيزق السطور فممكن يغطي على السطر اللي فوقه.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>inline</title>
<style>
  a { padding: 10px; margin-top: 20px; margin-bottom: 20px; background: #fde68a; }
</style>
</head>
<body>
<p id="p1">فقرة فيها <a href="#x">لينك</a> عادي.</p>
<p id="p2">الفقرة اللي تحتها.</p>
</body>
</html>
~~~

**الإجابة:** لأ، الفقرة مش هتطول، واللي تحتها مش هتنزل.

عناصر الـ inline بتتحط جوه خط الكلام. ارتفاع السطر بييجي من [[line-height]]، مش من مقاس العنصر. فـ:

- الـ margin الرأسي: محسوب في Computed بس مالوش أي تأثير.
- الـ padding الرأسي: بيترسم، والخلفية بتكبر، بس مبيزقّش حاجة. ولو كبر كفاية بيغطي السطر اللي فوقه.
- الـ padding والـ margin **الأفقيين** بيشتغلوا عادي.

**الحل:** [[display: inline-block]]: العنصر يفضل في السطر، بس يتعامل كصندوق كامل.

**الغلطة الشائعة:** تزوّد margin-top للينك عشان ينزل، وتتحيّر ليه مبيتحركش.

~~~text الناتج
                       ارتفاع الفقرة     مكان الفقرة التانية
inline (الافتراضي)      18             50
من غير padding/margin   18             50
inline-block            78             110

margin-top في Computed: 20px   ومع كده مالوش أثر
ارتفاع خلفية اللينك: 37px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شيل سطر [[.modal[hidden] { display: none; }]] من المثال وخلي [[.modal { display: flex; }]]. المودال عليه [[hidden]] ولسه ظاهر!`, done: R`[[getComputedStyle(modal).display]] رجّع [[flex]]: الـ [[hidden]] شغله [[display: none]] من المتصفح نفسه بأضعف وزن، فأي [[display]] منك بيغلبه. رجّعت السطر (أو [[ [hidden] { display: none !important; }]] في الـ reset زي مكتبات كتير) والمودال اختفى.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المودال</title>
<style>
  .modal { display: flex; position: fixed; inset: 0; background: rgb(0 0 0 / .5); }
  .modal[hidden] { display: none; }
</style>
</head>
<body>
<main><h1>الصفحة</h1></main>
<div class="modal" hidden><p>أهلًا</p></div>
</body>
</html>
~~~

**السبب:** [[hidden]] مش سحر. المتصفح بيترجمه لقاعدة في ملفه الداخلي: [[[hidden] { display: none }]]. وملف المتصفح أضعف مكان في الـ cascade، فأي [[display]] تكتبه انت، حتى class واحدة، بيغلبها.

**الحلين:**

- [[.modal[hidden] { display: none; }]]: وزنها (0,2,0)، أكبر من [[.modal]].
- سطر عام في الـ reset، وده بيغطي كل العناصر:

~~~css
[hidden] { display: none !important; }
~~~

ده من الأماكن القليلة اللي [[!important]] فيها معقولة، لأن [[hidden]] معناه واضح ومفيش سبب تغلبه.

**الغلطة الشائعة:** تعمل [[modal.hidden = true]] من JavaScript، والمودال يفضل ظاهر، فتفتكر إن فيه باج في الكود. افتح Computed وشوف الـ [[display]].

~~~text الناتج
من غير السطر: display = flex   (ظاهر رغم hidden)
مع .modal[hidden]: display = none
بديل reset [hidden]: display = none
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صندوق عرضه 300px جواه ٣ [[span]] عليهم [[display: inline-block; width: 100px]] ومكتوبين في الـ HTML بمسافة بينهم. هيقفوا جنب بعض في سطر واحد؟`, done: R`لأ: التالت نزل سطر جديد (اتقاس: أول اتنين top واحد والتالت تحتهم)، لأن المسافات اللي بين الـ spans في الـ HTML بقت مسافات كلام حقيقية جنب الـ inline-block فالمجموع زاد عن 300. وده من أسباب إن الـ layouts بقت flex و grid.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصف</title>
<style>
  .row { width: 300px; background: #f4f4f5; }
  .row span { display: inline-block; width: 100px; background: #bfdbfe; }
</style>
</head>
<body>
<div class="row" id="a">
  <span>١</span>
  <span>٢</span>
  <span>٣</span>
</div>
</body>
</html>
~~~

**الإجابة:** لأ، التالت هينزل. السطر الجديد والمسافات بين الـ spans في الـ HTML بقت مسافة كلام واحدة. والـ inline-block بيقف في السطر زي الحروف، فالمسافة بتتحسب. والمجموع: 100 + مسافة + 100 + مسافة + 100، وده أكبر من 300.

**الحلول القديمة** كانت [[font-size: 0]] على الأب، أو تلزق الـ tags. كلها ترقيعات.

**الحل الحديث:**

~~~css
.row { display: flex; }
.row span { width: 100px; }
~~~

**الغلطة الشائعة:** تعمل [[width: 33%]] فوق بعض وتتفاجئ بنفس المشكلة. وعرض المسافة نفسه بيعتمد على الخط، فالرقم هيتغيّر من صفحة للتانية.

~~~text الناتج
inline-block:
top للتلاتة: 8 , 8 , 26   التالت نزل سطر
عرض المسافة: 4px

flex:
top للتلاتة: 8 , 8 , 8   في سطر واحد
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** شريط خطوات طلب (١ اتطلب، ٢ بيتحضّر، ٣ في الطريق، ٤ وصل): كل خطوة دايرة 32px فيها الرقم ([[display: inline-grid; place-items: center]])، وبينهم خط 40×2px [[inline-block]]، والخطوات اللي خلصت لونها مختلف.`, done: R`الدواير والخطوط على نفس الخط بالظبط (الـ top واحد أو [[vertical-align: middle]])، والرقم في نص الدايرة، والشريط كله في سطر واحد على 360px (لو مش كفاية: الخطوط تقصر)، والخطوة الحالية عليها [[aria-current="step"]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متابعة الطلب</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  ol { list-style: none; padding: 0; margin: 0; white-space: nowrap; text-align: center; }
  li { display: inline; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .step {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #e4e4e7;
    color: #18181b;
    vertical-align: middle;
    font-weight: 700;
  }
  .line {
    display: inline-block;
    width: clamp(12px, 8vw, 40px);
    height: 2px;
    background: #d4d4d8;
    vertical-align: middle;
  }
  .done .step { background: #0f766e; color: #fff; }
  .done .line { background: #0f766e; }
  [aria-current="step"] .step { outline: 3px solid #0f766e; outline-offset: 2px; }
</style>
</head>
<body>
<main>
<h1>طلبك</h1>
<ol aria-label="حالة الطلب">
  <li class="done"><span class="step">١</span><span class="sr">اتطلب</span><span class="line"></span></li>
  <li class="done"><span class="step">٢</span><span class="sr">بيتحضّر</span><span class="line"></span></li>
  <li aria-current="step"><span class="step">٣</span><span class="sr">في الطريق</span><span class="line"></span></li>
  <li><span class="step">٤</span><span class="sr">وصل</span></li>
</ol>
</main>
</body>
</html>
~~~

**اللي بيخلّيه يقف على خط واحد:**

- [[display: inline-grid]]: الدايرة بتقف في السطر، وجواها grid يوسّط الرقم.
- [[vertical-align: middle]] على الاتنين: بدونها الخط 2px يقف على خط الكلام تحت، مش في نص الدايرة.
- [[clamp(12px, 8vw, 40px)]]: على الموبايل الخطوط بتقصر، والشريط يفضل في سطر واحد.
- [[white-space: nowrap]]: ممنوع النزول سطر.
- [[aria-current="step"]]: قارئ الشاشة يعرف الخطوة الحالية، وبرضه بنستخدمها في الـ CSS.
- [[.sr]]: اسم الخطوة نص حقيقي مخفي بالشكل بس، فقارئ الشاشة يقراه.

**الغلطة الشائعة:** تعتمد على اللون بس في «الخطوات اللي خلصت». الحلقة حوالين الحالية والأرقام نفسها بيخلوا المعنى واضح من غير لون.

~~~text الناتج
مركز الدواير y: 102
مركز الخطوط y: 102
مركز الرقم في الدايرة الأولى: دايرة (278, 102) ورقم (278, 102)
عرض الشريط على 360: 228px من 328px  وفي سطر واحد: true
عرض الخط على 360: 28.8px  وعلى 1280: 40px
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف [[display: contents]] و [[display: flow-root]]. جرّب [[flow-root]] على أب فيه ابن عليه [[margin-top: 30px]].`, done: R`من غير flow-root الـ margin بتاع الابن طلع برّه الأب (الأب نزل 30 كله)، ومعاه الـ margin بقى جوه الأب. وعرفت إن [[contents]] بيشيل صندوق العنصر نفسه وبيسيب أولاده، وإنه زمان كان بيضيّع الـ role بتاع العنصر في بعض المتصفحات.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>flow-root</title>
<style>
  body { margin: 0; }
  .parent { background: #bfdbfe; }
  .child { margin-top: 30px; background: #fde68a; height: 40px; }
  .fix { display: flow-root; }
  .list { display: flex; gap: 8px; }
  .group { display: contents; }
</style>
</head>
<body>
<div class="parent" id="a"><div class="child"></div></div>
<div class="parent fix" id="b"><div class="child"></div></div>
<div class="list"><div class="group"><span id="s1">١</span><span id="s2">٢</span></div></div>
</body>
</html>
~~~

**[[flow-root]]:** بيعمل block formatting context، يعني عالم مقفول: الـ margin بتاع الابن ميخرجش من الأب، والـ float مبيطلعش برّه. من غيره، الـ margin العلوي للابن بيتداخل مع أبوه، والأب كله بينزل 30 بدل ما الابن ينزل جواه.

**[[contents]]:** العنصر نفسه بيختفي من الـ layout، وأولاده بيبقوا كأنهم أولاد جدهم. فـ [[.group]] مبقاش ليه صندوق، و [[١]] و [[٢]] بقوا flex items في [[.list]] مباشرة. والـ [[gap]] بيشتغل بينهم.

**الفخ التاريخي:** [[display: contents]] كان بيضيّع الـ role بتاع العنصر في بعض المتصفحات، زي [[button]] أو [[table]]. متستخدمهوش على عناصر ليها معنى من غير ما تختبر. الجزء ده من MDN.

**الغلطة الشائعة:** تحط [[padding-top: 1px]] أو [[overflow: hidden]] على الأب عشان توقف الـ collapse. [[flow-root]] معمول لكده، ومن غير آثار جانبية.

~~~text الناتج
من غير flow-root:
top الأب = 30   ارتفاعه = 40   (الـ margin طلع برّه، فالأب نزل كله)

بـ flow-root:
top الأب = 0   ارتفاعه = 70   (الـ margin بقى جوه)

display: contents: المسافة بين ١ و ٢ = 8px   (الـ gap شغال عليهم)
~~~` },
          ],
          title: "بلوك ولا جوه السطر؟ وإخفاء العناصر",
          desc: R`[[block]] بياخد سطر كامل وتقدر تحدد عرضه وطوله ([[div]] و [[p]] و [[h1]]). [[inline]] بيمشي جوه السطر مع الكلام وبيتجاهل [[width]] و [[height]] والـ margin الرأسي ([[span]] و [[a]] و [[strong]]). [[inline-block]] في النص: جوه السطر بس بيقبل مقاسات.

و [[display: none]] بيشيل العنصر خالص من الصفحة، و [[visibility: hidden]] بيخفيه ومكانه يفضل فاضي، و [[opacity: 0]] بيخفيه وهو لسه بيتضغط.`,
          example: R`.badge { display: inline-block; padding: 2px 8px; }
.menu a { display: block; }
.modal[hidden] { display: none; }
.ghost { visibility: hidden; }
.fade { opacity: 0; pointer-events: none; }
.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip-path: inset(50%); white-space: nowrap;
}`,
          try: R`اعمل 3 [[<span>]] وادّيهم width و height: مش هيتأثروا. غيّر لـ [[inline-block]] وبعدين [[block]] وشوف الفرق. وجرّب none و visibility و opacity على زرار، وحاول توصله بـ Tab في كل حالة.`,
          flag: "script",
          deep: {
            why: R`نص مشاكل التنسيق للمبتدئ من هنا: «ليه الـ width مش شغال على الـ span؟» و «ليه اللينك مش واخد السطر؟». وكمان الإخفاء: فيه فرق كبير بين إنك تخفي حاجة عن العين بس، أو عن الكل، أو تسيبها بتتضغط وهي مش باينة.`,
            how: R`[[display]] ليه وشّين: برّاني بيحدد العنصر نفسه بيتصرف إزاي مع اللي جنبه (block أو inline)، وجوّاني بيحدد أولاده بيترصّوا إزاي (عادي، أو flex، أو grid). [[display: flex]] = block من برا و flex من جوه، و [[inline-flex]] = inline من برا و flex من جوه.

العناصر الـ inline بتتحط على سطر كلام، وارتفاعها من [[line-height]] والخط، مش من [[height]]. عشان كده الـ padding الرأسي على [[<a>]] بيترسم بس مش بيزق السطور اللي فوق وتحت. و [[<img>]] أصلًا inline، ودا سبب المسافة الصغيرة الغريبة تحت الصور (مكان ديل حروف زي g و y). الحل [[display: block]] للصورة، و Preflight بتاع Tailwind بيعملها لوحده.

الإخفاء: [[display: none]] بيشيله من الـ layout ومن شجرة الـ accessibility. [[visibility: hidden]] بيسيب المكان ويشيله من الـ accessibility. [[opacity: 0]] بيسيبه في كل حاجة: مكانه، وبيتضغط، وبياخد focus، وقارئ الشاشة بيقراه. و [[.sr-only]] (موجودة في Tailwind بنفس الاسم) العكس: مخفي عن العين ومقروء لقارئ الشاشة، مثالية لـ label حقل بحث أو اسم زرار أيقونة.`,
            when: R`[[hidden]] أو display none للحاجات المقفولة (مودال، منيو). visibility لو عايز المكان يفضل ثابت. opacity للحركة (بتتعمل لها transition، و display لأ). و sr-only للكلام اللي لازم يتقري ومش لازم يظهر.`,
            mistakes: R`تخفي منيو بـ [[opacity: 0]] بس، فاللينكات اللي جواها لسه بتاخد focus بـ Tab وبتتضغط وهي مش باينة. مسافة تحت الصورة ومش عارف منين (هي inline). وتحط width على span وتستغرب.`
          },
          teach: R`## الفكرة في سطرين

[[display]] بيقول العنصر بيقف لوحده في سطر ولا جوه السطر مع الكلام، والسطور الباقية 4 طرق مختلفة لإخفاء حاجة. جرّبت كل سطر في Chrome (headless): قست المقاسات بـ [[getBoundingClientRect()]]، ودوست Tab و Enter، وطلّعت شجرة الـ accessibility.

---

## ١. block و inline و inline-block

حطيت 3 [[<span>]] عليهم [[width: 100px; height: 50px]] وغيّرت الـ display:

| [[display]] | مقاس كل span | مكانهم |
|---|---|---|
| [[inline]] (الافتراضي للـ span) | على قد الحرف: عرض 3 لـ 11، وارتفاع 17 | جنب بعض |
| [[inline-block]] | 100 × 50 | جنب بعض، وبين كل واحد والتاني 4px |
| [[block]] | 100 × 50 | تحت بعض: y = 0 ثم 50 ثم 100 |

- [[inline]] تجاهل الـ width والـ height خالص، وارتفاعه جه من الخط.
- [[inline-block]] قبل المقاسات وفضل في السطر. والـ 4px دي مش margin: دي المسافة (الـ Enter بين الـ tags في الـ HTML) اللي بتتعرض كمسافة كلام.
- [[block]] قبل المقاسات وكل واحد خد سطر.

---

## ٢. السطور الأولى في المثال

| السطر | اتقاس |
|---|---|
| [[.badge { display: inline-block; padding: 2px 8px; }]] | الشارة جوه الفقرة في نفس السطر، و 39 × 22 بالـ padding |
| [[.menu a { display: block; }]] | اللينك عرضه 784 (السطر كله)، فالضغط شغال على العرض كله مش على الكلمة بس |

و [[padding: 2px 8px]] قيمتين: فوق وتحت 2، والجنبين 8.

---

## ٣. 4 طرق إخفاء

حطيت 5 أزرار: «قبل»، وبعده واحد بكل طريقة، وبعدهم «بعد».

### [[.modal[hidden] { display: none; }]]

[[.modal[hidden]]]: عنصر عليه class [[modal]] **و** عليه attribute [[hidden]]. و [[display: none]] بيشيله من الصفحة خالص: المقاس اتقاس 0 × 0.

### [[.ghost { visibility: hidden; }]]

مستخبي بس مكانه محجوز: اتقاس 62 × 21 في مكانه.

### [[.fade { opacity: 0; pointer-events: none; }]]

[[opacity]] الشفافية من 0 (مش باين) لـ 1. و [[pointer-events: none]] يعني الماوس بيعدّي من خلاله. اتقاس 58 × 21 في مكانه، ولما ضغطت بالماوس على مكانه الضغطة راحت للي وراه.

### اللي حصل بالكيبورد وقارئ الشاشة

~~~text Tab من زرار «قبل»
قبل  →  opacity  →  بعد
~~~

| الطريقة | مكانه | Tab بيوصله | في شجرة الـ accessibility | الماوس |
|---|---|---|---|---|
| [[display: none]] | لأ | لأ | لأ | لأ |
| [[visibility: hidden]] | أيوه | لأ | لأ | لأ |
| [[opacity: 0]] + [[pointer-events: none]] | أيوه | **أيوه** | **أيوه** ([[button "opacity"]]) | لأ |

والأخطر: وقفت على زرار الـ opacity (مش باين) ودوست Enter، والـ [[onclick]] بتاعه اشتغل. [[pointer-events]] بيمنع الماوس بس، مش الكيبورد.

---

## ٤. [[.sr-only]]: مخفي عن العين بس

~~~text style.css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip-path: inset(50%); white-space: nowrap;
}
~~~

[[sr]] اختصار screen reader. كل سطر:

| الخاصية | بتعمل إيه |
|---|---|
| [[position: absolute]] | تطلّعه من ترتيب الصفحة فميزقّش حاجة |
| [[width: 1px; height: 1px]] | يصغر لبكسل (مش 0، عشان بعض قارئات الشاشة بتتجاهل الصفر) |
| [[overflow: hidden]] | أي حاجة أكبر من البكسل متتعرضش |
| [[clip-path: inset(50%)]] | يقص من كل ناحية 50%، فمفيش ولا بكسل باين |
| [[white-space: nowrap]] | الكلام ميتكسرش لسطور (قارئ الشاشة كان ممكن يقرا الكلمات لازقة) |

جرّبته على زرار فيه أيقونة SVG بس و [[<span class="sr-only">بحث</span>]]: الـ span اتقاس 1 × 1، والزرار في شجرة الـ accessibility اسمه [[button "بحث"]].

---

## ٥. المسافة اللي تحت الصورة

[[<img>]] أصلًا inline، فبيقف على خط الكلام، وتحته مكان لديل الحروف (زي g و y). صورة 100 × 100 جوه div:

| | ارتفاع الـ div |
|---|---|
| الصورة inline (الافتراضي) | 104 |
| [[img { display: block; }]] | 100 |

---

## الخلاصة

| | سطر لوحده | بيقبل width و height |
|---|---|---|
| [[block]] | أيوه | أيوه |
| [[inline]] | لأ | لأ |
| [[inline-block]] | لأ | أيوه |

| الإخفاء | المكان | الكيبورد وقارئ الشاشة |
|---|---|---|
| [[display: none]] / [[hidden]] | بيتشال | مش شايفينه |
| [[visibility: hidden]] | محجوز | مش شايفينه |
| [[opacity: 0]] | محجوز | **لسه شايفينه** |
| [[.sr-only]] | بكسل | شايفينه، والعين لأ |`,
          lines: [
            "شارة جوه السطر، بس الـ padding بتاعها بيحجز مكان.",
            "لينكات المنيو تاخد السطر كله، فالضغط يشتغل على العرض كله.",
            R`العنصر اللي عليه [[hidden]]: شيله خالص، مش بياخد مكان ولا بيتقري.`,
            "مستخبي بس مكانه محجوز، ومش بيتضغط ولا بيتقري.",
            R`شفاف: مكانه محجوز وهيفضل بيتضغط، عشان كده [[pointer-events: none]] معاه.`,
            "كلاس لإخفاء حاجة عن العين بس، وقارئ الشاشة لسه بيقراها.",
            "بيطلّعه من الترتيب العادي ويصغّره لبكسل.",
            "بيقصّ أي حاجة ظاهرة وميكسرش السطر.",
            "قفلة."
          ],
          sol: R`الـ [[<span>]] العادي ([[inline]]): الـ width و الـ height ملهمش أي تأثير، والصندوق على قد الكلام بس. [[inline-block]]: بياخدوا 100×50 وبيفضلوا جنب بعض في نفس السطر (وهتلاقي فراغ صغير بينهم حوالي 4px سببه الـ enter أو المسافة اللي بينهم في الـ HTML). [[block]]: نفس المقاس بس كل واحد في سطر لوحده تحت اللي قبله.

مع Tab على الزرار: [[display: none]] و [[visibility: hidden]] الـ focus بيعدّي من فوقهم للعنصر اللي بعدهم، لأنهم مش موجودين بالنسبة للكيبورد وقارئ الشاشة. أما [[opacity: 0]] مع [[pointer-events: none]]: الـ focus بيقف على زرار مش باين، ولو دوست Enter هيشتغل. الـ [[pointer-events]] بيمنع الماوس بس.

دي أخطر نتيجة في التجربة: مودال أو منيو مخفي بـ opacity بيفضل ياخد Tab ويتقري لقارئ الشاشة. لو عايز تخفيه بحركة fade، ضيف [[visibility: hidden]] أو [[inert]] بعد ما الحركة تخلص.`
        },
        {
          cmd: "BEM و CSS Modules",
          title: "تنظيم الـ CSS: أسماء classes مبتتخانقش (BEM و CSS Modules و @scope)",
          desc: R`كل الـ CSS في الصفحة عالمي: أي [[.title]] في أي ملف بيطبّق على أي عنصر عليه [[class="title"]] في الموقع كله. فلما ملف الهيدر وملف الكارت الاتنين فيهم [[.title]]، اللي اتحمّل آخر بيكسب والتاني بيبوظ. ده سبب أغلب «قاعدتي مش شغالة» و [[!important]] اللي بيتكتب في كل حتة.

فيه ٣ حلول بيستخدمهم الشغل الحقيقي:
• **BEM** (Block, Element, Modifier): اتفاق على الأسماء بس. الكارت [[.card]]، وأي حتة جواه [[.card__title]]، وأي نسخة مختلفة منه [[.card--featured]]. الأسماء مستحيل تتكرر، وكل selector وزنه class واحدة.
• **CSS Modules**: ملف اسمه [[card.module.css]] بتكتب فيه [[.title]] عادي، والأداة (Vite أو Next.js) بتغيّر الاسم لاسم فريد زي [[_title_1wc96_1]]، وانت بتستخدمه من JavaScript بـ [[styles.title]].
• **[[@scope]]**: من المتصفح نفسه، بيحدد إن القواعد دي جوه [[.card]] بس.

وتقدر تجمعهم مع [[@layer]] من درس «cascade» عشان ترتّب الملفات نفسها: reset، وبعدين components، وبعدين utilities.`,
          example: R`<article class="card card--featured">
  <h3 class="card__title">باقة سنوية</h3>
  <p class="card__price">3,600 ج</p>
  <a class="card__cta" href="/join">اشترك</a>
</article>
// card.css (BEM: block__element--modifier)
.card { padding: 16px; border: 1px solid #ddd; border-radius: 12px; }
.card__title { font-size: 1.25rem; margin: 0; }
.card__price { font-weight: 700; }
.card--featured { border-color: #2563eb; }
.card--featured .card__cta { background: #2563eb; color: white; }
// card.module.css (CSS Modules: Vite و Next.js بيدعموها من غير إعداد)
.title { font-size: 1.25rem; color: #2563eb; }
// main.js
import styles from './card.module.css';
document.querySelector('#plan-title').className = styles.title;`,
          try: R`اعمل صفحة فيها [[<h1 class="title">]] في الهيدر، وملفين CSS: [[header.css]] فيه [[.title { font-size: 2rem; }]] و [[card.css]] فيه [[.title { font-size: 1.25rem; }]]، واربط الاتنين بالترتيب ده. قيس حجم الـ h1 من Computed. بعدين سمّي قاعدة الكارت [[.card__title]] بالـ BEM وقيس تاني. ولو معاك Vite: سمّي ملف الكارت [[card.module.css]] واستورده في [[main.js]]، واطبع [[styles]] في الـ Console.`,
          flag: "script",
          deep: {
            why: R`الموقع الصغير بملف CSS واحد بيمشي. أول ما الملفات تبقى ١٠ والصفحات ٢٠ واتنين بيكتبوا CSS، الأسماء بتتكرر من غير ما حد ياخد باله: [[.card]] في صفحة المنتجات و [[.card]] في صفحة المدونة، و [[.title]] في كل حتة. والحل اللي الناس بتلجأ له ([[!important]] أو selector أطول) بيعمل حرب: القاعدة الجاية لازم تبقى أقوى من اللي قبلها. التنظيم بيمنع الحرب من الأول.`,
            how: R`**BEM** مالوش أي سحر: المتصفح شايف classes عادية. الفايدة إن كل selector بقى class واحدة، فالـ specificity كلها (0,1,0) والترتيب في الملف بس هو اللي بيفرق، ومفيش اسم بيتكرر لأن اسم الـ block جزء من كل اسم. الاستثنا الوحيد المقبول [[.card--featured .card__cta]] (0,2,0): modifier على الـ block بيغيّر element جواه.

**CSS Modules**: وقت الـ build، Vite بيقرا أي ملف اسمه [[*.module.css]]، ويغيّر كل class فيه لاسم فريد (في Vite 8.3 [[.title]] بقت [[._title_1wc96_1]] في ملف الـ CSS النهائي)، ويرجّع لـ JavaScript object فيه الاسم القديم والجديد: [[{"title":"_title_1wc96_1"}]]. فـ [[.title]] بتاع الهيدر (ملف عادي) فضل [[.title]] ومحدش لمسه، والاتنين عايشين في نفس الصفحة.

**[[@scope (.promo) to (.promo__content)]]**: المتصفح بيطبّق القواعد على العناصر اللي جوه [[.promo]] بس، ويقف عند [[.promo__content]] (حدود من تحت). اتجرّب في Chrome 156: صورة جوه promo بقت مدورة، وصورة جوه promo__content فضلت زي ما هي. Chrome بيدعمه من 118؛ شوف درس «Baseline و @supports» قبل ما تعتمد عليه في كل المتصفحات.`,
            when: R`موقع HTML و CSS عادي (landing page، أو موقع شركة): BEM أو prefix لكل صفحة ([[.pricing-]] و [[.blog-]]). مشروع React أو Vue بـ Vite أو Next.js: CSS Modules لكل component، أو Tailwind (وحدة Tailwind قدام) اللي بيحل نفس المشكلة بطريقة تانية. و [[@scope]] لما تحط CSS لحتة جوه صفحة مش بتاعتك (widget جوه موقع حد تاني) أو عايز تحدد «لحد هنا».`,
            mistakes: R`تكتب الـ modifier لوحده: [[<article class="card--featured">]] من غير [[card]]، فالكارت بيخسر كل تنسيقه الأساسي (اتقاس: الـ padding بقى 0 والحدود اختفت). أو تعمل element جوه element: [[.card__title__icon]] (الصح [[.card__icon]]، الـ BEM مسطّح). أو تكتب اسم غلط في CSS Modules: [[styles.titel]] بترجّع [[undefined]] والـ class بيبقى حرفيًا [[class="undefined"]] من غير أي error. أو تسمّي الملف [[card.css]] وتستغرب إن الأسماء متغيّرتش (لازم [[.module.css]]). أو تخلط BEM مع selectors زي [[.card h3]]، فترجع الأسماء تتخانق تاني.`
          },
          teach: R`## الفكرة في سطرين

الـ CSS مفيهوش «ملف خاص»: كل class بتشتغل على الصفحة كلها. فلازم يا إما أسماء مستحيل تتكرر (BEM)، يا إما أداة تغيّر الأسماء لوحدها (CSS Modules)، يا إما حدود من المتصفح ([[@scope]]). الأرقام هنا من Chrome 156 و Vite 8.3.5.

---

## ١. المشكلة بالأرقام

صفحة فيها هيدر بـ [[<h1 class="title">]] وكارت، وملفين اتربطوا بالترتيب ده:

~~~css الملفين
/* header.css */ .title { font-size: 2rem; }
/* card.css */   .title { font-size: 1.25rem; }
~~~

الـ h1 بتاع الهيدر طلع [[20px]] بدل [[32px]]: الاتنين نفس الوزن (0,1,0)، فاللي اتكتب آخر كسب (درس «cascade»). صاحب ملف الكارت مكانش يعرف إن فيه [[.title]] تانية أصلًا.

---

## ٢. BEM: اسم الـ block في كل اسم

~~~text شكل الاسم
card            ← block: الحاجة اللي لوحدها ليها معنى
card__title     ← element: حتة جوه الـ block (شرطتين تحت)
card--featured  ← modifier: نسخة مختلفة من الـ block (شرطتين)
~~~

### الـ HTML

- [[class="card card--featured"]]: الـ block **والـ** modifier مع بعض. الـ modifier بيزوّد على الأساسي مش بيحل محله.
- [[card__title]] و [[card__price]] و [[card__cta]]: كل حتة جوه الكارت ليها اسم بيبدأ بـ [[card__]]. ومفيش [[card__title__text]]: لو فيه حتة جوه العنوان تبقى [[card__text]] على طول.

### الـ CSS

| القاعدة | الوزن | ليه |
|---|---|---|
| [[.card]] | (0,1,0) | الشكل الأساسي لأي كارت |
| [[.card__title]] | (0,1,0) | العنوان بس، ومستحيل يلمس [[.title]] بتاع الهيدر |
| [[.card--featured]] | (0,1,0) | لون الحدود بس اتغيّر، والباقي من [[.card]] |
| [[.card--featured .card__cta]] | (0,2,0) | الـ modifier بيغيّر element جواه: الزرار بقى أزرق في الكارت المميز بس |

اتقاس: الكارت المميز حدوده [[rgb(37, 99, 235)]] و padding بتاعه 16px، والزرار خلفيته نفس الأزرق.

### الفخ: الـ modifier لوحده

[[<article class="card--featured">]] من غير [[card]]: الـ padding طلع [[0px]] والحدود [[none 0px]]. الـ modifier مكتوب فيه لون الحدود بس، والحدود نفسها في [[.card]] اللي مش موجودة.

---

## ٣. CSS Modules: الأداة بتغيّر الأسماء

~~~css card.module.css
.title { font-size: 1.25rem; color: #2563eb; }
~~~

~~~js main.js
import styles from './card.module.css';
document.querySelector('#plan-title').className = styles.title;
~~~

- [[.module.css]] في آخر الاسم هي اللي بتقول لـ Vite «غيّر الأسماء في الملف ده». ملف [[header.css]] العادي محدش بيلمسه.
- [[import styles]]: [[styles]] object، و [[console.log]] طبعه [[{"title":"_title_1wc96_1"}]].
- [[styles.title]]: الاسم الجديد. الـ h3 بقى [[class="_title_1wc96_1"]] وحجمه 20px، والـ h1 بتاع الهيدر فضل 32px.

ده ملف الـ CSS اللي [[vite build]] طلّعه (الاتنين مع بعض):

~~~css dist/assets/index.css
.title{font-size:2rem}._title_1wc96_1{color:#2563eb;font-size:1.25rem}
~~~

### الفخ: اسم غلط

[[bad.className = styles.titel]] (حرفين متبدلين): مفيش error في الـ build ولا في الـ Console، والعنصر بقى [[class="undefined"]]. لو شغال TypeScript بيقولك، من غيره لازم تبص بعينك.

وفي React بتكتبها [[className={styles.title}]]، وفي Next.js نفس الفكرة بالظبط.

---

## ٤. [[@scope]]: حدود من المتصفح

~~~css @scope
@scope (.promo) to (.promo__content) {
  img { border-radius: 50%; }
}
~~~

صورة جوه [[.promo]] طلعت [[50%]]، وصورة جوه [[.promo__content]] (اللي جوه promo) طلعت [[0px]]. يعني القاعدة شغالة من [[.promo]] لحد ما توصل لـ [[.promo__content]] وتقف.

---

## ٥. تختار إيه؟

| المشروع | الأنسب |
|---|---|
| موقع HTML و CSS من غير build | BEM، أو prefix لكل صفحة زي [[.pricing-card]] |
| React أو Vue أو Next.js | CSS Modules لكل component، أو Tailwind (وحدة قدام) |
| CSS لحتة جوه صفحة حد تاني | [[@scope]]، أو prefix طويل مستحيل يتكرر |
| ترتيب الملفات نفسها | [[@layer reset, components, utilities;]] فوق أي طريقة منهم |

---

## الخلاصة

- كل class عالمية، والتكرار بيبوّظ صفحات تانية من غير ما تحس.
- BEM: [[block__element--modifier]]، وزن واحد لكل حاجة، والـ modifier دايمًا مع الـ block.
- CSS Modules: [[*.module.css]] و [[styles.name]]، والاسم الغلط بيبقى [[undefined]] ساكت.
- [[@scope]] بيحدد مكان القواعد من المتصفح نفسه.`,
          lines: [
            R`الـ block: [[card]] الكارت الأساسي، و [[card--featured]] modifier بيقول «النسخة المميزة». الاتنين لازم مع بعض.`,
            R`element جوه الـ block: [[card__title]] (شرطتين تحت) يعني «العنوان بتاع الكارت»، فمستحيل يتخانق مع [[.title]] تانية.`,
            R`element تاني: السعر. كل حتة جوه الكارت اسمها بيبدأ بـ [[card__]].`,
            R`element تالت: زرار «اشترك» (لينك لأنه بيودّي صفحة تانية)، واسمه [[card__cta]] (CTA = call to action).`,
            R`نهاية الـ block: كل اللي جواه اسمه بيبدأ بـ [[card__]]، وأي كارت تاني في الصفحة بنفس الأسامي مش هيتأثر غير بالـ modifier بتاعه.`,
            R`الشكل الأساسي لأي كارت: مسافة جوه، وحدود رمادي، وزوايا مدورة. وزنها class واحدة (0,1,0).`,
            R`العنوان جوه الكارت بس: حجم 1.25rem ومن غير margin. ميأثرش على أي عنوان تاني في الموقع.`,
            R`السعر تقيل (700 = bold).`,
            R`الـ modifier بيغيّر لون الحدود بس. باقي الشكل جاي من [[.card]]، وعشان كده الاتنين لازم على نفس العنصر.`,
            R`الاستثنا الوحيد: الـ modifier بيغيّر element جواه، فالزرار أزرق في الكارت المميز بس. وزنها (0,2,0).`,
            R`في CSS Modules بتكتب اسم قصير عادي [[.title]]، والأداة هي اللي هتغيّره لاسم فريد وقت الـ build.`,
            R`[[import]] بيرجّع object: المفتاح الاسم اللي كتبته ([[title]])، والقيمة الاسم الجديد ([[_title_1wc96_1]] في Vite 8.3).`,
            R`حط الاسم الجديد على العنصر. لو كتبت [[styles.titel]] غلط هيتحط [[undefined]] كاسم class من غير أي error.`
          ],
          sol: R`مع الملفين العاديين: الـ h1 بتاع الهيدر حجمه [[20px]] (من [[card.css]] لأنه اتربط آخر) بدل [[32px]]. بعد ما قاعدة الكارت بقت [[.card__title]]: الـ h1 رجع [[32px]] وعنوان الكارت [[20px]]، ومفيش ولا [[!important]].

بالـ CSS Modules: الـ Console طبع [[{"title":"_title_1wc96_1"}]] (الحروف اللي في النص hash وممكن تختلف عندك، والرقم اللي في الآخر رقم السطر في الملف: class في السطر التاني بقت [[_2]])، وعنوان الكارت عليه الاسم ده، و [[.title]] بتاع الهيدر شغال زي ما هو.`,
          practice: [
            { lvl: 'تطبيق', t: R`**refactor:** صفحة فيها CSS بالشكل ده: [[.card h3]] و [[.card .btn]] و [[#sidebar .card p]] و [[.card.big]]. حوّلها لـ BEM: كل حاجة class واحدة، والكبير modifier.`, done: R`كل الـ selectors بقت (0,1,0) ما عدا modifier بيغيّر element (0,2,0)، ومفيش id في الـ CSS، والصفحة شكلها نفس الشكل بالظبط (screenshot قبل وبعد)، وتقدر تحط الكارت في الـ sidebar من غير ما شكله يتغيّر.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  .card { padding: 16px; border: 1px solid #ccc; }
  .card h3 { margin: 0; color: #124; }
  .card .btn { background: #124; color: #fff; }
  #sidebar .card p { font-size: 14px; }
  .card.big { padding: 32px; }
  .card.big h3 { font-size: 28px; }
</style>
</head>
<body>
<main>
  <h1>الكروت</h1>
  <h2>العروض</h2>
  <article class="card big"><h3>كبير</h3><p>نص</p><button class="btn">شوف</button></article>
  <aside id="sidebar">
    <article class="card"><h3>جانبي</h3><p>نص</p><button class="btn">شوف</button></article>
  </aside>
</main>
</body>
</html>
~~~

بعد:

~~~html after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  .card { padding: 16px; border: 1px solid #ccc; }
  .card__title { margin: 0; color: #124; }
  .card__text { margin-block: 1em; }
  .card__btn { background: #124; color: #fff; }
  .card--big { padding: 32px; }
  .card--big .card__title { font-size: 28px; }
  .card--compact .card__text { font-size: 14px; }
</style>
</head>
<body>
<main>
  <h1>الكروت</h1>
  <h2>العروض</h2>
  <article class="card card--big"><h3 class="card__title">كبير</h3><p class="card__text">نص</p><button class="card__btn">شوف</button></article>
  <aside id="sidebar">
    <article class="card card--compact"><h3 class="card__title">جانبي</h3><p class="card__text">نص</p><button class="card__btn">شوف</button></article>
  </aside>
</main>
</body>
</html>
~~~

**الأسماء:** [[block__element--modifier]]. الـ block هو [[card]]، والعنصر جواه [[card__title]]، والحالة أو النوع [[card--big]].

**إيه اللي اتغيّر فعليًا:**

- [[.card h3]] كانت بتعتمد على شكل الـ HTML. لو غيّرتها لـ h2 الشكل يبوظ. [[.card__title]] مش بتهتم بالـ tag.
- [[#sidebar .card p]] كانت بتربط الشكل بالمكان. الكارت لو اتنقل برّه الـ sidebar بيتغيّر. [[.card--compact]] بتروح مع الكارت أينما كان.
- كل selector وزنه (0,1,0)، ماعدا modifier بيغيّر element فهو (0,2,0)، فمفيش خناقات.

**الغلطة الشائعة:** تعمل [[.card__body__title]]. الـ BEM مفيهوش عناصر متداخلة: كل element تابع للـ block مباشرة، مهما كان عمقه في الـ HTML.

~~~text الناتج
الـ screenshot قبل وبعد: متطابق بايت ببايت
عدد selectors فيها id في الـ CSS بعد: 0
أوزان الـ selectors بعد:
(0,1,0)  .card__title
(0,2,0)  .card--big .card__title
(0,1,0)  .card__text
(0,2,0)  .card--compact .card__text
(0,1,0)  .card
(0,1,0)  .card--big
(0,1,0)  .card__btn
نقلنا الكارت الجانبي برّه الـ aside: حجم النص = 14px  (لسه نفس الشكل)
axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** زميلك كتب [[<article class="card--featured">]] والكارت المميز طالع من غير حدود ولا مسافات، مع إن [[.card--featured { border-color: blue; }]] موجودة.`, done: R`عرفت إن الـ modifier بيغيّر لون الحدود بس والحدود نفسها في [[.card]]، فحطيت الاتنين [[class="card card--featured"]]، و Computed بقى بيقول [[border-top-style: solid]] و padding 16px.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكروت</title>
<style>
  .card { border: 1px solid #ccc; padding: 16px; margin-block-end: 8px; }
  .card--featured { border-color: blue; }
</style>
</head>
<body>
<main>
<h1>الكروت</h1>
<article class="card card--featured">مميز</article>
</main>
</body>
</html>
~~~

**السبب:** الـ modifier مش بديل للـ block، ده إضافة عليه. [[.card--featured]] فيها سطر واحد للون الحدود بس. أما الحدود نفسها والمسافات ففي [[.card]]. فلو كتبت الـ modifier لوحده، مفيش حدود أصلًا عشان تتلوّن.

**القاعدة:** الاتنين مع بعض دايمًا: [[class="card card--featured"]].

**الغلطة الشائعة:** تنسخ كل قواعد [[.card]] جوه [[.card--featured]] عشان تشتغل لوحدها. كده لما تغيّر [[.card]] المميز مش هيتغيّر معاها.

~~~text الناتج
قبل (class="card--featured"):
border-top-style = none   padding = 0px

بعد (class="card card--featured"):
border-top-style = solid   padding = 16px   لون الحدود = rgb(0, 0, 255)
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ملفين CSS فيهم [[.title]] بحجمين مختلفين. اعكس ترتيب الـ [[<link>]] بتاعهم وقيس حجم الـ h1 في كل مرة. وبعدين حوّل واحد منهم لـ [[.module.css]] في Vite وقيس تاني.`, done: R`الحجم بيتغيّر مع ترتيب الـ link (اللي آخر يكسب: 20px أو 32px)، وبعد الـ module الحجم ثابت مهما كان الترتيب، وفي [[dist/assets]] لقيت الاسم الجديد زي [[._title_xxxxx_1]].`, sol: R`~~~css a.css
.title { font-size: 20px; }
~~~

~~~css b.module.css
.title { font-size: 32px; }
~~~

~~~js main.js
import './a.css';
import styles from './b.module.css';

document.querySelector('h1').className = styles.title;
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>العنوان</title>
</head>
<body>
<main><h1>العنوان</h1></main>
<script type="module" src="/main.js">$__lt/script>
</body>
</html>
~~~

وعشان تجربة الترتيب من غير modules: ملفين [[a.css]] و [[b.css]] فيهم نفس الـ class، و [[<h1 class="title">]]، وبدّل سطور [[<link>]].

بعد كده [[npm create vite@latest]] ثم [[npx vite build]].

**ليه الترتيب بطّل يفرق:** CSS Modules بتغيّر اسم الـ class وقت البناء لاسم فريد. فـ [[.title]] في الموديول مبقاش [[.title]] أصلًا. ومفيش خناقة، لأن الاسمين مختلفين.

**الغلطة الشائعة:** تكتب [[class="title"]] في الـ HTML وتستنى الموديول يشتغل. الاسم الجديد موجود في [[styles.title]] بس.

~~~text الناتج
ملفين عاديين:
a ثم b  → 32px
b ثم a  → 20px

b.module.css:
a ثم الموديول  → 32px
الموديول ثم a  → 32px

الاسم في dist/assets: ._title_1tx54_1
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** component بيعمل [[el.className = styles.titel]] وشكله مش متنسّق، والـ Console نضيف خالص.`, done: R`في Elements لقيت [[class="undefined"]]، وطبعت [[styles]] ولقيت المفتاح اسمه [[title]]، وصلّحته. وزوّدت سطر بيتأكد: [[if (!styles.title) throw new Error('class ناقصة')]] أو استخدمت TypeScript.`, sol: R`~~~js
import styles from './card.module.css';

if (!styles.title) throw new Error('class ناقصة: title');

const el = document.querySelector('h2');
el.className = styles.title;
~~~

**ليه الـ Console نضيف:** في JavaScript، قراية مفتاح مش موجود في object مش خطأ، بترجّع [[undefined]]. و [[el.className = undefined]] بيحوّلها لنص، فالـ class بيبقى كلمة [[undefined]] حرفيًا. مفيش ولا error، بس مفيش تنسيق.

**خطوات الوصول للسبب:**

1. Elements: لقيت [[class="undefined"]].
2. [[console.log(styles)]]: لقيت المفتاح [[title]] مش [[titel]].
3. صلّحت الاسم، وزوّدت سطر فحص، فالغلطة الجاية تصرخ بدل ما تسكت.

**الوقاية:** TypeScript مع [[typescript-plugin-css-modules]] بيطلّع خطأ في المحرر قبل ما تشغّل.

**الغلطة الشائعة:** تدوّر في ملف الـ CSS وتعيد كتابة القاعدة. القاعدة سليمة، المشكلة في السطر اللي بيقراها.

~~~text الناتج
قبل (styles.titel):
class في Elements = undefined
Console: 0 رسالة خطأ
console.log(styles) = {"title":"_title_1s69e_1"}

بعد (styles.title):
class في Elements = _title_1s69e_1
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** مكتبة كروت صغيرة بالـ BEM لموقع جيم متخيل: [[.plan]] و [[.plan__name]] و [[.plan__price]] و [[.plan__features]] و [[.plan__cta]]، و ٣ modifiers: [[--featured]] (حدود ملونة وشارة «الأشهر» بـ [[::before]])، و [[--muted]] (رمادي)، و [[--compact]] (padding أقل).`, done: R`٣ كروت جنب بعض كل واحد بـ modifier مختلف، وكل modifier أقل من ٤ سطور CSS لأنه بيغيّر بس، وتقدر تجمع اتنين ([[plan plan--featured plan--compact]]) والاتنين يشتغلوا، ومفيش [[!important]] في الملف.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الباقات</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; max-width: 800px; margin-inline: auto; }
  .plan { position: relative; padding: 24px; border: 2px solid #d4d4d8; border-radius: 12px; }
  .plan__name { margin: 0; font-size: 1.25rem; }
  .plan__price { font-size: 1.75rem; font-weight: 700; }
  .plan__features { padding-inline-start: 20px; }
  .plan__cta { display: inline-block; padding: 10px 16px; background: #0f766e; color: #fff; border-radius: 8px; text-decoration: none; }

  .plan::before {
    position: absolute; top: -12px; inset-inline-start: 16px;
    padding: 0 8px; background: #0f766e; color: #fff; border-radius: 999px; font-size: .75rem;
  }

  .plan--featured { border-color: #0f766e; }
  .plan--featured::before { content: "الأشهر"; }

  .plan--muted { color: #52525b; background: #f4f4f5; }
  .plan--muted .plan__cta { background: #52525b; }

  .plan--compact { padding: 12px; }
</style>
</head>
<body>
<main>
<h1>الباقات</h1>
<div class="plans">
  <article class="plan plan--muted">
    <h2 class="plan__name">أساسي</h2>
    <p class="plan__price">٥٠٠ ج</p>
    <ul class="plan__features"><li>صالة</li></ul>
    <a class="plan__cta" href="#basic">اشترك في الأساسي</a>
  </article>
  <article class="plan plan--featured">
    <h2 class="plan__name">ذهبي</h2>
    <p class="plan__price">٩٠٠ ج</p>
    <ul class="plan__features"><li>صالة</li><li>حصص</li></ul>
    <a class="plan__cta" href="#gold">اشترك في الذهبي</a>
  </article>
  <article class="plan plan--featured plan--compact">
    <h2 class="plan__name">سريع</h2>
    <p class="plan__price">٣٠٠ ج</p>
    <ul class="plan__features"><li>أسبوع</li></ul>
    <a class="plan__cta" href="#quick">اشترك في السريع</a>
  </article>
</div>
</main>
</body>
</html>
~~~

**ليه الـ modifiers قصيرة:** كل واحد بيقول الفرق بس. كل حاجة مشتركة في [[.plan]]. وعشان كده تقدر تجمع اتنين: كل واحد بيلمس خصايص مختلفة، فمفيش تعارض.

- [[position: relative]] على [[.plan]] عشان الشارة [[::before]] تتحسب منه.
- [[.plan--muted .plan__cta]]: modifier بيغيّر element، وزنها (0,2,0). دي الحالة الوحيدة اللي بنستخدم فيها selector مركّب.
- شكل الشارة في [[.plan::before]]، وده مش بيترسم لوحده لأن مفيهوش [[content]]. فالـ modifier بيكتب [[content]] بس، وبيفضل سطر واحد.
- [[content: "الأشهر"]] زينة، وقارئ الشاشة ممكن يقراها. لو المعلومة مهمة خليها نص حقيقي.

**الغلطة الشائعة:** تعمل [[.plan--featured-compact]] لكل تركيبة. كده الأسماء هتتضاعف مع كل modifier جديد.

~~~text الناتج
padding: عادي 24px   compact 12px
الاتنين مع بعض: حدود rgb(15, 118, 110) و padding 12px و شارة: "الأشهر"
عدد سطور CSS في كل modifier: featured 2، muted 2، compact 1
!important في الملف: 0
مواضع الكروت على 1280: 86 , 86 , 86 (نفس السطر)
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** في وثائق Vite (صفحة Features › CSS Modules) اعرف إزاي تخلي الأسماء في الـ JavaScript camelCase (يعني [[.plan-card]] تتقري [[styles.planCard]])، وإيه [[:global()]].`, done: R`لقيت [[css.modules.localsConvention]] في [[vite.config]] وجرّبتها، وفهمت إن [[:global(.x)]] بتسيب الاسم زي ما هو جوه ملف module (مثلًا عشان class جاي من مكتبة).`, sol: R`~~~js vite.config.js
export default {
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
};
~~~

~~~css plan.module.css
.plan-card { padding: 16px; }
:global(.lib-tooltip) { color: teal; }
~~~

~~~js main.js
import styles from './plan.module.css';

console.log(JSON.stringify(styles));
document.querySelector('h1').className = styles.planCard;
~~~

**الإجابات:**

- [[css.modules.localsConvention]]: بتتحكم في شكل المفاتيح في الـ JavaScript. [[camelCase]] بتسيب الاسم الأصلي وتضيف نسخة camelCase، و [[camelCaseOnly]] بتسيب الـ camelCase بس.
- [[:global(.x)]]: جوه ملف موديول، اسم الـ class بيتسيب زي ما هو من غير hash. بتحتاجه لما class جاي من مكتبة، أو لما تكتب على عنصر برّه الموديول.

**الغلطة الشائعة:** تكتب [[styles['plan-card']]] في كل مكان وتتعب، أو تنسى تعيد تشغيل Vite بعد تعديل الـ config.

~~~text الناتج
camelCaseOnly: مفاتيح styles = planCard
camelCase:     مفاتيح styles = plan-card , planCard
من غير config: مفاتيح styles = plan-card

:global في الملف الناتج: .lib-tooltip{color:teal}
~~~` },
          ]
        }
      ]
    }
]);
