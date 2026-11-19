// CSS: كل الـ selectors والقيم والوحدات (وحدة من منهج syllabus/css.json)
// كل القياسات والمعاينات في الوحدة دي من Chrome 157 headless على Windows 11 (عدد العناصر بـ querySelectorAll، و matches()، و CSS.supports، وقيم getComputedStyle بالبكسل، والفايزة في كل خناقة وزن بين قاعدتين).
// اللي متقاسش هنا ومكتوب جنبه إنه من MDN أو المواصفة: المتصفحات التانية (Safari و Firefox)، و :fullscreen و :picture-in-picture (محتاجين ضغطة من المستخدم)، و ::cue على فيديو حقيقي، و :autofill (محتاج الملء التلقائي بتاع المتصفح)، وقارئ الشاشة مع content.
MORE("css", [
    {
      t: "CSS: كل الـ selectors والقيم والوحدات",
      l: 1,
      n: "كل أشكال الـ attribute selector والـ combinators الأربعة، والاختيار بالترتيب (nth-child و of-type و empty)، و :is و :where و :not ووزنهم، والحالات (target و focus-within و lang و open)، وحالات الفورم كلها، و ::before و ::after و content وباقي الـ pseudo-elements، و inherit و initial و revert وستايل المتصفح الافتراضي، وأنواع القيم، وكل الوحدات محسوبة بالبكسل، والدوال الرياضية، و @import و @charset و @namespace",
      pre: [
        { to: "css/selectors", why: R`الوحدة بتكمّل على أنواع الـ selectors الأساسية اللي اتعرّفت هناك (النوع، والـ class، والمسافة، و [[>]])` },
        { to: "css/specificity", why: R`نص الوحدة عن مين بيكسب لما قاعدتين يمسكوا نفس العنصر، فلازم تبقى عارف الوزن (A,B,C) بيتحسب إزاي` }
      ],
      goal: [
        R`تختار أي عنصر من الـ attributes بتاعته بكل الأشكال ([[=]] و [[~=]] و [[|=]] و [[^=]] و [[$=]] و [[*=]] و [[i]])، ومن مكانه بالـ combinators الأربعة، وتعرف إن غلطة واحدة في selector list بتلغي القاعدة كلها.`,
        R`تختار بالترتيب من غير ما تحط classes: الأول والأخير والوحيد، و [[:nth-child()]] بأي معادلة و [[of S]]، وعيلة [[-of-type]]، و [[:empty]] و [[:root]] و [[:scope]].`,
        R`تستخدم [[:is()]] و [[:where()]] و [[:not()]] وتعرف وزن كل واحد بالقياس، وتكتب أساسيات سهل تتغلب بـ [[:where()]].`,
        R`تنسّق حسب الحالة: [[:target]] و [[:focus-within]] و [[:active]] و [[:lang()]] و [[:dir()]] و [[:defined]] و [[:open]] و [[:modal]] و [[:popover-open]]، وكل حالات الفورم ([[:checked]] و [[:user-invalid]] و [[:in-range]] و [[:placeholder-shown]]…).`,
        R`تضيف حتت مش في الـ HTML بـ [[::before]] و [[::after]] و [[content]] (نص و [[attr()]] وعلامات تنصيص)، وتنسّق [[::placeholder]] و [[::backdrop]] و [[::file-selector-button]] و [[::details-content]] و [[::highlight()]].`,
        R`تعرف ستايل المتصفح الافتراضي بالأرقام، وتكتب reset صغير، وتفرّق بين [[inherit]] و [[initial]] و [[unset]] و [[revert]] و [[revert-layer]] و [[all]].`,
        R`تقرا أي قيمة في MDN: [[<length>]] و [[<percentage>]] (نسبة من إيه؟) و [[<number>]] و [[<angle>]] و [[<time>]] و [[<ratio>]] و [[<string>]] و [[<custom-ident>]]، وتحوّل أي وحدة لبكسل (em و rem و ch و lh و vw و svh و cqi و cm و pt…)، وتستخدم [[round()]] و [[mod()]] و [[sin()]] و [[pow()]] و [[env()]].`,
        R`تفهم [[@import]] بكل أشكاله وليه بيبطّأ الصفحة، و [[@charset]] و [[@namespace]].`
      ],
      projects: [
        { lvl: 'صغير', dir: "hessa-pricing", t: R`جدول باقات «حصّة» بالـ selectors بالترتيب`, what: R`أول صفحة لـ «حصّة» (منصة دروس أونلاين متخيلة): جدول بيقارن الباقات لأولياء الأمور والطلبة. [[index.html]] فيه [[<h1>]] «باقات حصّة»، وفقرة [[<p class="lead">]] بجملة تعريف، و [[<table class="plans">]] فيه [[<thead>]] بصف عناوين (الميزة، تجربة، شهري، سنوي)، و [[<tbody>]] فيه خمس صفوف (عدد المواد، حصص مباشرة، أسئلة للمدرّس، امتحانات تجريبية، السعر)، وأول خانة في كل صف [[<th>]]. وفي [[style.css]]، **من غير ولا class على الصفوف أو الخانات**: الصفوف الزوجية رمادي فاتح، وعمود «شهري» (التالت) كله أصفر وعنوانه بني لأنه الأكتر طلبًا، وصف السعر (الأخير) تقيل ومن غير خط تحته. من دروس «:nth-child و :first-child» و «:is و :where و :not».`, done: R`في Computed: [[.plans tbody tr:nth-child(2)]] خلفيته [[rgb(245, 245, 244)]] والصف الأول شفاف، وأي خانة في العمود التالت [[rgb(254, 243, 199)]] وعنوانه [[rgb(180, 83, 9)]]، وآخر صف [[font-weight: 700]] وخاناته [[border-bottom-width: 0px]]. ولو زوّدت صف جديد قبل السعر، الألوان بتتظبط لوحدها.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
</body>
</html>
~~~

~~~css style.css
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }
~~~

~~~view 380 380 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<style>
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }
</style>
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
</body>
</html>
~~~

**هتشوف إيه:** عنوان أخضر وتحته جملة رمادي، وجدول أبيض: صف العناوين أخضر وعنوان «شهري» بني، والعمود بتاع «شهري» كله أصفر فاتح، والصفين «حصص مباشرة» و «امتحانات تجريبية» رمادي فاتح، وصف «السعر» تقيل وخطه أكبر.

**ليه كده:**
- [[tbody tr:nth-child(even)]]: العد جوه [[tbody]] بس، فصف العناوين مش داخل في الـ zebra.
- [[:is(th, td):nth-child(3)]]: الخانة التالتة في كل صف، سواء [[th]] ولا [[td]]، بسطر واحد بدل اتنين. وبعدها قاعدة أتقل لعنوان العمود في الـ [[thead]].
- [[tr:last-child > *]]: كل خانات آخر صف، مهما كان نوعها.
- ([[border-collapse]] من درس «table»، و [[text-align]] بيوسّط الكلام في الخانة: وحدة الخطوط. و [[font-family]] بسطر واحد عشان الشكل، ليها درس في وحدة الخطوط.)

**الغلطة الشائعة:** [[tr:nth-child(even)]] من غير [[tbody]]: الـ [[thead]] ليه عد لوحده، وممكن الألوان تلخبط لو الجدول اتقسم. و [[td:nth-child(3)]] من غير [[th]]: لو أول خانة في الصف [[th]] العد مبيتأثرش (الـ th أخ برضه)، بس عنوان العمود في الـ thead مش هيتلوّن.

~~~text القياس من Chrome
.plans tbody tr:nth-child(2)                  background-color: rgb(245, 245, 244)
.plans tbody tr:nth-child(1)                  background-color: rgba(0, 0, 0, 0)
.plans tbody tr:nth-child(1) td:nth-child(3)  background-color: rgb(254, 243, 199)
.plans thead th:nth-child(3)                  background-color: rgb(180, 83, 9)
.plans tbody tr:last-child                    font-weight: 700    خاناته border-bottom-width: 0px
~~~` },
        { lvl: 'صغير', dir: "hessa-pricing", cont: true, t: R`أسئلة شائعة بتنوّر بـ :target و :open`, what: R`زي المشروع اللي فات (نفس الفولدر والملفين)، وزوّد تحت الجدول [[<section class="faq" id="faq">]] فيه [[<h2>]] «أسئلة شائعة»، وفقرة [[<p class="jump">]] فيها لينك [[<a href="#q-student">]] «خصم الطلبة»، وتلات [[<details>]] (كل واحد بـ [[id]]: [[q-cancel]] مفتوح من الأول بـ [[open]]، و [[q-pay]]، و [[q-student]])، وكل واحد فيه [[<summary>]] بالسؤال و [[<p>]] بالإجابة. وفي الـ CSS: السؤال المفتوح خلفيته كريمي وعنوانه تقيل بني، والأسئلة لازقة في بعض بخط واحد بينهم ([[details + details]] من غير الحد اللي فوق)، والسؤال اللي الـ URL بيشاور عليه ([[:target]]) حده بني أتخن. من دروس «:target و :focus-within» و «[attr] و combinators».`, done: R`في Computed: [[#q-cancel]] (مفتوح) خلفيته [[rgb(255, 251, 235)]] وعنوانه [[font-weight: 700]]، و [[#q-pay]] أبيض و [[border-top-width: 0px]]. ولما تدوس «خصم الطلبة» في ملف حقيقي، الـ URL بيبقى [[#q-student]] والسؤال ده حده بني 2px.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
</body>
</html>
~~~

~~~css style.css
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }
~~~

~~~view 640 700 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<style>
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }
</style>
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
</body>
</html>
~~~

**هتشوف إيه:** نفس الجدول، وتحته «أسئلة شائعة» بالأخضر، وسطر «طالب؟ اقرا خصم الطلبة»، وتلات أسئلة لازقة في بعض: الأول مفتوح بخلفية كريمي وعنوانه بني تقيل، والاتنين التانيين مقفولين أبيض. دوس على سؤال يفتح وياخد نفس الشكل.

**ليه كده:**
- [[details:is(:open, [open])]]: [[:open]] الجديدة، و [[[open]]] للمتصفحات اللي مبتعرفهاش، و [[:is()]] متسامحة فلو واحدة مش مفهومة التانية بتشتغل.
- [[details + details { border-top: 0 }]]: كل سؤال قبله سؤال بيشيل حده اللي فوق، فبين كل اتنين خط واحد مش اتنين.
- [[details:target]]: بيشتغل لما الـ URL آخره [[#q-student]] (من اللينك اللي فوق، أو من لينك حد بعتهولك). المعاينة هنا مبتغيّرش الـ URL، فجرّبه في ملفك.

**الغلطة اللي وقعت فيها وانا بكتبه:** [[details:target { border-color: ...; border-width: 2px }]] والسؤال اللي قبله بيشيل الحد اللي فوق بـ [[border-top: 0]]. [[border-top: 0]] مختصرة بتخلّي الـ style كمان [[none]]، فالحد فضل 0px رغم الـ 2px (اتقاس). الحل [[border: 2px solid]] كاملة في [[:target]]. **وغلطة تانية شائعة:** [[.faq details:open]] لوحدها: في متصفح قديم القاعدة كلها بتترمي. و [[border-top: 0]] على كل الأسئلة: الأول هيبقى من غير خط فوق.

~~~text القياس من Chrome
#q-cancel            background-color: rgb(255, 251, 235)
#q-cancel > summary  font-weight: 700
#q-pay               background-color: rgb(255, 255, 255)   border-top-width: 0px
(الملف مفتوح بـ index.html#q-student)   #q-student  border-top: 2px rgb(180, 83, 9)
~~~` },
        { lvl: 'متوسط', dir: "hessa-pricing", cont: true, t: R`فورم الاشتراك بكل حالاته`, what: R`زي المشروع اللي فات، وزوّد تحت الأسئلة [[<section class="signup" id="signup">]] فيه [[<h2>]] «اشترك» و [[<form>]] جواه: [[<fieldset class="pick">]] بـ [[<legend>]] «الباقة» واتنين radio («شهري» متعلّم من الأول بـ [[checked]] و «سنوي»)، وكل radio بعده على طول الـ [[<label>]] بتاعه. وبعدها تلات [[<label class="field">]]، كل واحد فيه [[<span>]] بالاسم و [[<input>]]: الاسم ([[required]] و placeholder)، والإيميل ([[type="email" required]])، والسنة الدراسية ([[type="number" min="1" max="12"]]). وفي الآخر [[<button>]] «ابدأ الاشتراك». في الـ CSS: الصندوق كله حده يخضر لما أي خانة فيها focus، والباقة المتعلّمة label بتاعها أصفر وتقيل، والخانة الفاضية اللي ظاهر فيها placeholder حدها متقطّع، والغلط يحمر **بعد** ما الزائر يكتب بس (ومعاه السنة البرّه الحدود)، والصح يخضر. ده بيكمّل على الدرسين اللي فاتوا: دروس «:checked و :invalid» و «:target و :focus-within».`, done: R`في Computed: الـ label بتاع «شهري» [[background-color: rgb(254, 243, 199)]] و «سنوي» شفاف، وخانة الاسم الفاضية [[border-top-style: dashed]] وخانة السنة (من غير placeholder) [[solid]]، ومفيش أي خانة حمرا وانت فاتح الصفحة. ولو كتبت إيميل ناقص وخرجت تحمر، ولو كتبت 15 في السنة تحمر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
<section class="signup" id="signup">
  <h2>اشترك</h2>
  <form>
    <fieldset class="pick">
      <legend>الباقة</legend>
      <input type="radio" name="plan" id="p-month" checked><label for="p-month">شهري ٩٠ جنيه</label>
      <input type="radio" name="plan" id="p-year"><label for="p-year">سنوي ٩٠٠ جنيه</label>
    </fieldset>
    <label class="field"><span class="req">الاسم</span><input required placeholder="زي ما في البطاقة"></label>
    <label class="field"><span class="req">الإيميل</span><input type="email" required placeholder="name@example.test"></label>
    <label class="field"><span>السنة الدراسية (١ لـ ١٢)</span><input type="number" min="1" max="12"></label>
    <button>ابدأ الاشتراك</button>
  </form>
</section>
</body>
</html>
~~~

~~~css style.css
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }

.signup { margin-top: 24px; padding: 16px; background: white; border: 2px solid #e7e5e4; }
.signup:focus-within { border-color: #0f766e; }
.pick { margin: 0 0 12px; border: 0; padding: 0; }
.pick input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
.pick label { display: inline-block; padding: 6px 12px; margin-left: 8px; border: 1px solid #d6d3d1; }
.field { display: block; margin-bottom: 10px; }
.field span { display: block; margin-bottom: 4px; }
.field input { padding: 8px; border: 2px solid #d6d3d1; font: inherit; }
.field input:required { border-color: #a8a29e; }
.field input:placeholder-shown { border-style: dashed; }
.field input:user-invalid, .field input:out-of-range { border-color: #b91c1c; background: #fee2e2; }
.field input:user-valid { border-color: #0f766e; }
.signup button { padding: 10px 20px; border: 0; background: #0f766e; color: white; font: inherit; font-weight: 700; }
~~~

~~~view 1000 1150 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<style>
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }

.signup { margin-top: 24px; padding: 16px; background: white; border: 2px solid #e7e5e4; }
.signup:focus-within { border-color: #0f766e; }
.pick { margin: 0 0 12px; border: 0; padding: 0; }
.pick input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
.pick label { display: inline-block; padding: 6px 12px; margin-left: 8px; border: 1px solid #d6d3d1; }
.field { display: block; margin-bottom: 10px; }
.field span { display: block; margin-bottom: 4px; }
.field input { padding: 8px; border: 2px solid #d6d3d1; font: inherit; }
.field input:required { border-color: #a8a29e; }
.field input:placeholder-shown { border-style: dashed; }
.field input:user-invalid, .field input:out-of-range { border-color: #b91c1c; background: #fee2e2; }
.field input:user-valid { border-color: #0f766e; }
.signup button { padding: 10px 20px; border: 0; background: #0f766e; color: white; font: inherit; font-weight: 700; }
</style>
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
<section class="signup" id="signup">
  <h2>اشترك</h2>
  <form>
    <fieldset class="pick">
      <legend>الباقة</legend>
      <input type="radio" name="plan" id="p-month" checked><label for="p-month">شهري ٩٠ جنيه</label>
      <input type="radio" name="plan" id="p-year"><label for="p-year">سنوي ٩٠٠ جنيه</label>
    </fieldset>
    <label class="field"><span class="req">الاسم</span><input required placeholder="زي ما في البطاقة"></label>
    <label class="field"><span class="req">الإيميل</span><input type="email" required placeholder="name@example.test"></label>
    <label class="field"><span>السنة الدراسية (١ لـ ١٢)</span><input type="number" min="1" max="12"></label>
    <button>ابدأ الاشتراك</button>
  </form>
</section>
</body>
</html>
~~~

**هتشوف إيه:** تحت الأسئلة صندوق أبيض «اشترك»: اختيارين للباقة جنب بعض و «شهري ٩٠ جنيه» أصفر بحد بني، وتحتهم خانة الاسم وخانة الإيميل بحد متقطّع، وخانة السنة بحد متصل، وزرار أخضر. دوس في أي خانة: حد الصندوق يخضر. اكتب «ali» في الإيميل وTab: الخانة تحمر. اكتب 15 في السنة: تحمر.

**ليه كده:**
- [[input:checked + label]]: الـ label بعد الـ radio على طول في الـ HTML، فـ [[+]] بيوصله.
- [[:placeholder-shown]] بيشتغل بس على الخانات اللي ليها placeholder، فخانة السنة فضلت متصلة.
- [[:user-invalid]] مش [[:invalid]]: الفورم ميفتحش أحمر. و [[:out-of-range]] معاها في نفس القاعدة بفاصلة.
- [[.signup:focus-within]] على الصندوق كله، مش على الخانة.
- [[font: inherit]] على الخانات والزرار عشان ياخدوا خط الصفحة (درس «inherit و initial و revert»).

**الغلطة الشائعة:** الـ label قبل الـ radio في الـ HTML: [[+]] مبيرجعش لورا. و [[:invalid]] بدل [[:user-invalid]]: الاسم والإيميل حمر من أول لحظة.

~~~text القياس من Chrome
label[for=p-month]          background-color: rgb(254, 243, 199)
label[for=p-year]           background-color: rgba(0, 0, 0, 0)
.field input[required]      border-top-style: dashed     (فاضية وفيها placeholder)
.field input[type=number]   border-top-style: solid
~~~` },
        { lvl: 'متوسط', dir: "hessa-pricing", cont: true, t: R`علامات وأيقونات بـ ::before و ::after والـ attribute selectors`, what: R`زي المشروع اللي فات، وزوّد علامات من الـ CSS بس من غير ما تكتبها في الـ HTML. في الـ HTML: الـ [[<span>]] بتاع الاسم والإيميل عليه [[class="req"]]، وتحت الفورم [[<blockquote class="review">]] برأي ولي أمر **من غير** علامات تنصيص، وفي الآخر [[<footer class="more">]] فيه تلات لينكات: دليل الأسعار ([[/files/prices.PDF]])، وصفحة على موقع تاني ([[https://example.test/hessa]])، و [[mailto:]]. في الـ CSS: نجمة حمرا بعد الخانات الإجبارية، ونجمة «★» قبل عنوان عمود «شهري»، وعلامات تنصيص «» حوالين الرأي بـ [[quotes]]، وقبل لينك الـ PDF أيقونة 📄 (حتى لو الامتداد كبير)، وبعد اللينك الخارجي سهم ↗ (وقارئ الشاشة يقول «موقع تاني»)، وقبل لينك الإيميل ✉. كل أيقونة زينة ليها نص بديل فاضي. من دروس «::before و ::after» و «[attr] و combinators».`, done: R`في Computed › الـ pseudo-elements: [[.req::after]] ‏[[content: " *" / ""]]، و [[th:nth-child(3)::before]] ‏[["★ " / ""]]، و [[.review::before]] ‏[[open-quote]]، ولينك الـ PDF ‏[["📄 " / ""]] رغم إن الامتداد [[.PDF]]، واللينك الخارجي [[" ↗" / " (موقع تاني)"]]. ولو حددت الصفحة ونسختها، النجوم والأيقونات مش هتتنسخ.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
<section class="signup" id="signup">
  <h2>اشترك</h2>
  <form>
    <fieldset class="pick">
      <legend>الباقة</legend>
      <input type="radio" name="plan" id="p-month" checked><label for="p-month">شهري ٩٠ جنيه</label>
      <input type="radio" name="plan" id="p-year"><label for="p-year">سنوي ٩٠٠ جنيه</label>
    </fieldset>
    <label class="field"><span class="req">الاسم</span><input required placeholder="زي ما في البطاقة"></label>
    <label class="field"><span class="req">الإيميل</span><input type="email" required placeholder="name@example.test"></label>
    <label class="field"><span>السنة الدراسية (١ لـ ١٢)</span><input type="number" min="1" max="12"></label>
    <button>ابدأ الاشتراك</button>
  </form>
</section>
<blockquote class="review">ابني ذاكر الفيزيا معاهم وجاب الدرجة النهائية</blockquote>
<footer class="more">
  <a href="/files/prices.PDF">دليل الأسعار</a>
  <a href="https://example.test/hessa">صفحتنا على example.test</a>
  <a href="mailto:help@example.test">ابعتلنا</a>
</footer>
</body>
</html>
~~~

~~~css style.css
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }

.signup { margin-top: 24px; padding: 16px; background: white; border: 2px solid #e7e5e4; }
.signup:focus-within { border-color: #0f766e; }
.pick { margin: 0 0 12px; border: 0; padding: 0; }
.pick input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
.pick label { display: inline-block; padding: 6px 12px; margin-left: 8px; border: 1px solid #d6d3d1; }
.field { display: block; margin-bottom: 10px; }
.field span { display: block; margin-bottom: 4px; }
.field input { padding: 8px; border: 2px solid #d6d3d1; font: inherit; }
.field input:required { border-color: #a8a29e; }
.field input:placeholder-shown { border-style: dashed; }
.field input:user-invalid, .field input:out-of-range { border-color: #b91c1c; background: #fee2e2; }
.field input:user-valid { border-color: #0f766e; }
.signup button { padding: 10px 20px; border: 0; background: #0f766e; color: white; font: inherit; font-weight: 700; }

.req::after { content: " *" / ""; color: #b91c1c; }
.plans thead th:nth-child(3)::before { content: "★ " / ""; }
.review { margin: 24px 0 0; padding: 12px 16px; background: #f0fdfa; color: #134e4a; quotes: "«" "»"; }
.review::before { content: open-quote; }
.review::after { content: close-quote; }
.more { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e7e5e4; }
.more a { margin-left: 16px; color: #0f766e; }
.more a[href^="https://"]::after { content: " ↗" / " (موقع تاني)"; }
.more a[href$=".pdf" i]::before { content: "📄 " / ""; }
.more a[href^="mailto:"]::before { content: "✉ " / ""; }
~~~

~~~view 1150 1350 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حصّة: الباقات</title>
<style>
body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }

.signup { margin-top: 24px; padding: 16px; background: white; border: 2px solid #e7e5e4; }
.signup:focus-within { border-color: #0f766e; }
.pick { margin: 0 0 12px; border: 0; padding: 0; }
.pick input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
.pick label { display: inline-block; padding: 6px 12px; margin-left: 8px; border: 1px solid #d6d3d1; }
.field { display: block; margin-bottom: 10px; }
.field span { display: block; margin-bottom: 4px; }
.field input { padding: 8px; border: 2px solid #d6d3d1; font: inherit; }
.field input:required { border-color: #a8a29e; }
.field input:placeholder-shown { border-style: dashed; }
.field input:user-invalid, .field input:out-of-range { border-color: #b91c1c; background: #fee2e2; }
.field input:user-valid { border-color: #0f766e; }
.signup button { padding: 10px 20px; border: 0; background: #0f766e; color: white; font: inherit; font-weight: 700; }

.req::after { content: " *" / ""; color: #b91c1c; }
.plans thead th:nth-child(3)::before { content: "★ " / ""; }
.review { margin: 24px 0 0; padding: 12px 16px; background: #f0fdfa; color: #134e4a; quotes: "«" "»"; }
.review::before { content: open-quote; }
.review::after { content: close-quote; }
.more { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e7e5e4; }
.more a { margin-left: 16px; color: #0f766e; }
.more a[href^="https://"]::after { content: " ↗" / " (موقع تاني)"; }
.more a[href$=".pdf" i]::before { content: "📄 " / ""; }
.more a[href^="mailto:"]::before { content: "✉ " / ""; }
</style>
</head>
<body>
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
<section class="signup" id="signup">
  <h2>اشترك</h2>
  <form>
    <fieldset class="pick">
      <legend>الباقة</legend>
      <input type="radio" name="plan" id="p-month" checked><label for="p-month">شهري ٩٠ جنيه</label>
      <input type="radio" name="plan" id="p-year"><label for="p-year">سنوي ٩٠٠ جنيه</label>
    </fieldset>
    <label class="field"><span class="req">الاسم</span><input required placeholder="زي ما في البطاقة"></label>
    <label class="field"><span class="req">الإيميل</span><input type="email" required placeholder="name@example.test"></label>
    <label class="field"><span>السنة الدراسية (١ لـ ١٢)</span><input type="number" min="1" max="12"></label>
    <button>ابدأ الاشتراك</button>
  </form>
</section>
<blockquote class="review">ابني ذاكر الفيزيا معاهم وجاب الدرجة النهائية</blockquote>
<footer class="more">
  <a href="/files/prices.PDF">دليل الأسعار</a>
  <a href="https://example.test/hessa">صفحتنا على example.test</a>
  <a href="mailto:help@example.test">ابعتلنا</a>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** عنوان عمود «شهري» بقى «★ شهري». بعد «الاسم» و «الإيميل» نجمة حمرا. تحت الفورم صندوق أخضر فاتح فيه الرأي بين «». وفي الآخر خط رفيع وتحته تلات لينكات: «📄 دليل الأسعار» و «صفحتنا على example.test ↗» و «✉ ابعتلنا».

**ليه كده:**
- [[a[href$=".pdf" i]]]: [[i]] عشان [[.PDF]] الكبيرة. و [[a[href^="https://"]]] للخارجي، و [[a[href^="mailto:"]]] للإيميل.
- [[content: "📄 " / ""]]: الأيقونة زينة، فالنص البديل فاضي وقارئ الشاشة مبيقولش «صفحة». أما السهم فمعناه مهم (اللينك هيوديك برّه)، فبديله «(موقع تاني)».
- [[quotes]] و [[open-quote]]: لو الرأي اتغيّر أو اتزوّد رأي تاني بنفس الـ class، العلامات بتيجي لوحدها.

**الغلطة الشائعة:** [[input:required::after]]: الـ input مالوش أولاد فالنجمة مش هتظهر، عشان كده حطيناها على الـ [[span]]. والسعر أو أي معلومة مهمة متتحطش في [[content]].

~~~text القياس من Chrome
.req::after                       content: " *" / ""
thead th:nth-child(3)::before     content: "★ " / ""
.review::before                   content: open-quote
a[href$=".PDF"]::before           content: "📄 " / ""
a[href^="https://"]::after        content: " ↗" / " (موقع تاني)"
~~~` },
        { lvl: 'كبير', dir: "hessa-pricing", cont: true, t: R`صفحة «حصّة» كاملة: reset ووحدات ومقاسات محسوبة`, what: R`المشروع اللي بيقفل الوحدة: نفس الصفحة بكل اللي فات (الجدول من المشروع الأول، والأسئلة من التاني، والفورم من التالت، والعلامات من الرابع)، وزوّد عليها تلات حاجات. **(١) reset:** ملف [[reset.css]] (box-sizing و margin صفر و line-height 1.5 و [[font: inherit]] للفورم) بيتجاب في أول [[style.css]] بـ [[@import url("reset.css") layer(reset);]] عشان أي قاعدة منك تغلبه. **(٢) الصفحة في عمود:** الـ HTML كله جوه [[<main class="page">]] أقصى عرضه [[72ch]] وفي النص، والمقدمة أقصاها [[60ch]]. **(٣) مقاسات محسوبة:** العناوين من سلّم [[pow(1.25, n)]]، والمسافة بين الأقسام [[2lh]] بـ [[.page > * + *]]، وخانات الجدول padding نص سطر و [[1ch]]، واختيارات الباقة أقل عرض ليها [[round(up, 12ch, 8px)]]، والمسافة تحت الصفحة [[max(1rem, env(safe-area-inset-bottom))]] مع [[viewport-fit=cover]]. من دروس «inherit و initial و revert» و «الوحدات كلها» و «round() و sin() و pow()» و «@import و @charset».`, done: R`في Computed: [[h1]] ‏31.25px و [[h2]] ‏25px، و [[.page]] ‏[[max-width: 621px]] (72ch بخط الصفحة)، و [[.faq]] ‏[[margin-top: 48px]] (2lh)، وخانات الجدول [[padding-top: 12px]]، والـ label بتاع الباقة [[min-width: 112px]]، و [[body]] ‏[[padding-bottom: 16px]] على الكمبيوتر و [[line-height: 24px]]. وكل شكل المشاريع اللي فاتت لسه زي ما هو.`, ext: R`زوّد [[@media print]] (درس «@media print») يخبّي الفورم ويطبع الجدول بالـ [[pt]]. وجرّب [[@import "print.css" print;]] بدل الـ media جوه الملف، وقارن في Network إمتى اتطلب. وحوّل سلّم الخطوط لمتغيّر [[--ratio]] (درس «CSS variables») وجرّب 1.2 و 1.333.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>حصّة: الباقات</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="page">
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
<section class="signup" id="signup">
  <h2>اشترك</h2>
  <form>
    <fieldset class="pick">
      <legend>الباقة</legend>
      <input type="radio" name="plan" id="p-month" checked><label for="p-month">شهري ٩٠ جنيه</label>
      <input type="radio" name="plan" id="p-year"><label for="p-year">سنوي ٩٠٠ جنيه</label>
    </fieldset>
    <label class="field"><span class="req">الاسم</span><input required placeholder="زي ما في البطاقة"></label>
    <label class="field"><span class="req">الإيميل</span><input type="email" required placeholder="name@example.test"></label>
    <label class="field"><span>السنة الدراسية (١ لـ ١٢)</span><input type="number" min="1" max="12"></label>
    <button>ابدأ الاشتراك</button>
  </form>
</section>
<blockquote class="review">ابني ذاكر الفيزيا معاهم وجاب الدرجة النهائية</blockquote>
<footer class="more">
  <a href="/files/prices.PDF">دليل الأسعار</a>
  <a href="https://example.test/hessa">صفحتنا على example.test</a>
  <a href="mailto:help@example.test">ابعتلنا</a>
</footer>
</main>
</body>
</html>
~~~

~~~css reset.css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; }
input, button { font: inherit; }
~~~

~~~css style.css
@import url("reset.css") layer(reset);

body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }

.signup { margin-top: 24px; padding: 16px; background: white; border: 2px solid #e7e5e4; }
.signup:focus-within { border-color: #0f766e; }
.pick { margin: 0 0 12px; border: 0; padding: 0; }
.pick input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
.pick label { display: inline-block; padding: 6px 12px; margin-left: 8px; border: 1px solid #d6d3d1; }
.field { display: block; margin-bottom: 10px; }
.field span { display: block; margin-bottom: 4px; }
.field input { padding: 8px; border: 2px solid #d6d3d1; font: inherit; }
.field input:required { border-color: #a8a29e; }
.field input:placeholder-shown { border-style: dashed; }
.field input:user-invalid, .field input:out-of-range { border-color: #b91c1c; background: #fee2e2; }
.field input:user-valid { border-color: #0f766e; }
.signup button { padding: 10px 20px; border: 0; background: #0f766e; color: white; font: inherit; font-weight: 700; }

.req::after { content: " *" / ""; color: #b91c1c; }
.plans thead th:nth-child(3)::before { content: "★ " / ""; }
.review { margin: 24px 0 0; padding: 12px 16px; background: #f0fdfa; color: #134e4a; quotes: "«" "»"; }
.review::before { content: open-quote; }
.review::after { content: close-quote; }
.more { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e7e5e4; }
.more a { margin-left: 16px; color: #0f766e; }
.more a[href^="https://"]::after { content: " ↗" / " (موقع تاني)"; }
.more a[href$=".pdf" i]::before { content: "📄 " / ""; }
.more a[href^="mailto:"]::before { content: "✉ " / ""; }

.page { max-width: 72ch; margin-inline: auto; }
body { padding: 1rem; padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
h1 { font-size: calc(1rem * pow(1.25, 3)); }
h2 { font-size: calc(1rem * pow(1.25, 2)); }
.lead { max-width: 60ch; }
.page > * + * { margin-top: 2lh; }
.page > .lead { margin-top: 0.25lh; }
.faq .jump { margin-bottom: 0.5lh; }
.plans th, .plans td { padding: 0.5lh 1ch; }
.pick label { min-width: round(up, 12ch, 8px); }
~~~

ترتيب البناء: (١) اعمل [[reset.css]] وضيف سطر الـ [[@import]] في أول [[style.css]]، وافتح الصفحة: هتلاقي كل حاجة لزقت في بعض (الـ margins اتمسحت). (٢) لفّ الـ HTML في [[<main class="page">]]. (٣) زوّد قواعد المقاسات في آخر [[style.css]] واحدة واحدة، وبص في Computed بعد كل واحدة.

(المعاينة تحت فيها الـ reset جوه [[@layer reset { }]] بدل الـ [[@import]]، لأن المعاينة مبتقراش ملفات من جهازك. النتيجة واحدة: الاتنين بيحطوا القواعد في طبقة اسمها reset.)

~~~view 1250 1500 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>حصّة: الباقات</title>
<style>
@layer reset {
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; }
input, button { font: inherit; }
}

body { margin: 0; padding: 16px; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
h1 { margin: 0 0 4px; color: #0f766e; }
.lead { margin: 0 0 16px; color: #57534e; }

.plans { border-collapse: collapse; width: 100%; background: white; }
.plans th, .plans td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; text-align: center; }
.plans thead th { background: #0f766e; color: white; }
.plans tbody tr:nth-child(even) { background: #f5f5f4; }
.plans tbody th:first-child { text-align: start; }
.plans :is(th, td):nth-child(3) { background: #fef3c7; }
.plans thead th:nth-child(3) { background: #b45309; }
.plans tbody tr:last-child { font-weight: 700; font-size: 18px; }
.plans tbody tr:last-child > * { border-bottom: 0; }

.faq { margin-top: 24px; }
.faq h2, .signup h2 { margin: 0 0 8px; color: #0f766e; }
.faq details { padding: 10px 12px; background: white; border: 1px solid #e7e5e4; }
.faq details + details { border-top: 0; }
.faq details:is(:open, [open]) { background: #fffbeb; }
.faq details:is(:open, [open]) > summary { font-weight: 700; color: #78350f; }
.faq details:target { border: 2px solid #b45309; }
.faq details p { margin: 8px 0 0; }

.signup { margin-top: 24px; padding: 16px; background: white; border: 2px solid #e7e5e4; }
.signup:focus-within { border-color: #0f766e; }
.pick { margin: 0 0 12px; border: 0; padding: 0; }
.pick input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
.pick label { display: inline-block; padding: 6px 12px; margin-left: 8px; border: 1px solid #d6d3d1; }
.field { display: block; margin-bottom: 10px; }
.field span { display: block; margin-bottom: 4px; }
.field input { padding: 8px; border: 2px solid #d6d3d1; font: inherit; }
.field input:required { border-color: #a8a29e; }
.field input:placeholder-shown { border-style: dashed; }
.field input:user-invalid, .field input:out-of-range { border-color: #b91c1c; background: #fee2e2; }
.field input:user-valid { border-color: #0f766e; }
.signup button { padding: 10px 20px; border: 0; background: #0f766e; color: white; font: inherit; font-weight: 700; }

.req::after { content: " *" / ""; color: #b91c1c; }
.plans thead th:nth-child(3)::before { content: "★ " / ""; }
.review { margin: 24px 0 0; padding: 12px 16px; background: #f0fdfa; color: #134e4a; quotes: "«" "»"; }
.review::before { content: open-quote; }
.review::after { content: close-quote; }
.more { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e7e5e4; }
.more a { margin-left: 16px; color: #0f766e; }
.more a[href^="https://"]::after { content: " ↗" / " (موقع تاني)"; }
.more a[href$=".pdf" i]::before { content: "📄 " / ""; }
.more a[href^="mailto:"]::before { content: "✉ " / ""; }

.page { max-width: 72ch; margin-inline: auto; }
body { padding: 1rem; padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
h1 { font-size: calc(1rem * pow(1.25, 3)); }
h2 { font-size: calc(1rem * pow(1.25, 2)); }
.lead { max-width: 60ch; }
.page > * + * { margin-top: 2lh; }
.page > .lead { margin-top: 0.25lh; }
.faq .jump { margin-bottom: 0.5lh; }
.plans th, .plans td { padding: 0.5lh 1ch; }
.pick label { min-width: round(up, 12ch, 8px); }
</style>
</head>
<body>
<main class="page">
<h1>باقات حصّة</h1>
<p class="lead">دروس أونلاين لكل المراحل، مع مدرّسين بيردّوا على أسئلتك.</p>
<table class="plans">
  <thead>
    <tr><th>الميزة</th><th>تجربة</th><th>شهري</th><th>سنوي</th></tr>
  </thead>
  <tbody>
    <tr><th>عدد المواد</th><td>١</td><td>كل المواد</td><td>كل المواد</td></tr>
    <tr><th>حصص مباشرة</th><td>٢</td><td>٨ في الشهر</td><td>١٠ في الشهر</td></tr>
    <tr><th>أسئلة للمدرّس</th><td>لأ</td><td>أيوه</td><td>أيوه</td></tr>
    <tr><th>امتحانات تجريبية</th><td>١</td><td>كل أسبوع</td><td>كل أسبوع</td></tr>
    <tr><th>السعر</th><td>ببلاش</td><td>٩٠ جنيه</td><td>٩٠٠ جنيه</td></tr>
  </tbody>
</table>
<section class="faq" id="faq">
  <h2>أسئلة شائعة</h2>
  <p class="jump">طالب؟ اقرا <a href="#q-student">خصم الطلبة</a>.</p>
  <details id="q-cancel" open><summary>أقدر ألغي في أي وقت؟</summary><p>أيوه، من صفحة حسابك، ومفيش أي رسوم.</p></details>
  <details id="q-pay"><summary>بدفع إزاي؟</summary><p>بالكارت أو المحفظة، والفاتورة بتوصلك على الإيميل.</p></details>
  <details id="q-student"><summary>فيه خصم للطلبة؟</summary><p>أيوه، ٣٠٪ على الشهري بكارنيه الجامعة أو المدرسة.</p></details>
</section>
<section class="signup" id="signup">
  <h2>اشترك</h2>
  <form>
    <fieldset class="pick">
      <legend>الباقة</legend>
      <input type="radio" name="plan" id="p-month" checked><label for="p-month">شهري ٩٠ جنيه</label>
      <input type="radio" name="plan" id="p-year"><label for="p-year">سنوي ٩٠٠ جنيه</label>
    </fieldset>
    <label class="field"><span class="req">الاسم</span><input required placeholder="زي ما في البطاقة"></label>
    <label class="field"><span class="req">الإيميل</span><input type="email" required placeholder="name@example.test"></label>
    <label class="field"><span>السنة الدراسية (١ لـ ١٢)</span><input type="number" min="1" max="12"></label>
    <button>ابدأ الاشتراك</button>
  </form>
</section>
<blockquote class="review">ابني ذاكر الفيزيا معاهم وجاب الدرجة النهائية</blockquote>
<footer class="more">
  <a href="/files/prices.PDF">دليل الأسعار</a>
  <a href="https://example.test/hessa">صفحتنا على example.test</a>
  <a href="mailto:help@example.test">ابعتلنا</a>
</footer>
</main>
</body>
</html>
~~~

**هتشوف إيه:** نفس الصفحة بس «متظبطة»: كلها في عمود في النص بمسافات متساوية بين الأقسام، والعنوان أكبر شوية (31.25px)، وعناوين الأقسام 25px، والجدول خاناته مريحة، والفورم والأسئلة والرأي واللينكات في مكانهم. لو صغّرت المعاينة لموبايل العمود بيملا الشاشة.

**ليه كده:**
- [[@import ... layer(reset)]] في أول سطر: لازم قبل أي قاعدة، والطبقة بتخلّي أي قاعدة منك تكسب الـ reset من غير ما تفكر في الوزن.
- [[72ch]] و [[60ch]]: عرض بيتبع حجم الخط، فلو الزائر كبّر الخط العمود بيكبر معاه.
- [[.page > * + *]] بـ [[2lh]]: مسافة بين كل قسمين بس (مش فوق أولهم)، ومحسوبة بالسطر فالإيقاع واحد.
- [[pow()]] للعناوين: سلّم واحد بنِسبة واحدة. و [[round(up, 12ch, 8px)]]: أقل عرض للاختيار مقفول على شبكة 8.
- [[max(1rem, env(safe-area-inset-bottom))]]: على الكمبيوتر 16px، وعلى موبايل فيه شريط home المسافة بتكبر لوحدها.

**الغلطة الشائعة:** [[@import]] بعد أي قاعدة: الـ reset مش هيتطبق ومش هتعرف ليه. و [[env(safe-area-inset-bottom, 1rem)]]: على الكمبيوتر بتطلع 0.

~~~text القياس من Chrome
h1   font-size: 31.25px        h2   font-size: 25px
.page   max-width: 621px        body   line-height: 24px   padding-bottom: 16px
.faq   margin-top: 48px         .plans td   padding-top: 12px
.pick label   min-width: 112px
~~~` },
        { lvl: 'فكرة', dir: "css-quiz", t: R`سؤال اليوم: كويز من غير JavaScript`, what: R`فولدر جديد: كارت «سؤال اليوم» تحطه «حصّة» في أول الصفحة كل يوم. [[index.html]] فيه [[<section class="quiz">]] فيه عنوان، والسؤال، وتلات اختيارات (كل واحد [[<input type="radio" name="a">]] وبعده [[<label>]] فيه [[<code dir="ltr">]] بالإجابة، والصح عليه [[class="right"]])، وفقرتين: [[<p class="fb ok">]] للصح و [[<p class="fb no">]] للغلط. في الـ CSS: الفقرتين مستخبيين، ولما الزائر يختار الصح فقرة «صح» تظهر بالأخضر والاختيار يخضر، ولما يختار غلط فقرة الغلط تظهر بالأحمر والاختيار يحمر. كله بـ [[:checked]] و [[+]] و [[~]] و [[:not()]]، والصندوق ينوّر بـ [[:focus-within]] لما تتنقل بالكيبورد. فكّر في الشكل بنفسك.`, done: R`لما تختار الإجابة الصح، الاختيار خلفيته خضرا فاتحة و «✓ صح!» ظاهرة، و «مش دي» مستخبية. ولما تختار غلط يحصل العكس. وبالكيبورد (Tab ثم الأسهم) الاختيار اللي واقف عليه ليه حلقة بني.`, ext: R`زوّد سؤال تاني تحته بنفس الـ classes (اسم [[name]] مختلف للـ radios). وجرّب ترقيم الاختيارات بعدّاد [[counter()]] جوه [[label::before]] (درس «list-style و ::marker»).`, sol: R`~~~view 420 الشكل النهائي (اختار إجابة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سؤال اليوم</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.5; }
.quiz { max-width: 46ch; margin-inline: auto; padding: 1lh 1rem; background: white; border: 2px solid #e7e5e4; border-radius: 12px; }
.quiz:focus-within { border-color: #0f766e; }
.quiz h2 { margin: 0; font-size: calc(1rem * pow(1.25, 2)); color: #0f766e; }
.quiz .q { margin: 0.5lh 0 1lh; }
.quiz input { position: absolute; opacity: 0; }
.quiz label { display: block; margin-top: 0.5lh; padding: 0.5lh 1ch; border: 1px solid #d6d3d1; border-radius: 8px; cursor: pointer; }
.quiz input:focus-visible + label { outline: 3px solid #b45309; outline-offset: 2px; }
.quiz input:checked + label { background: #f5f5f4; border-color: #78716c; }
.quiz .right:checked + label { background: #f0fdfa; border-color: #0f766e; color: #134e4a; font-weight: 700; }
.quiz input:not(.right):checked + label { background: #fee2e2; border-color: #b91c1c; }
.quiz .fb { display: none; margin: 1lh 0 0; padding: 0.5lh 1ch; border-radius: 8px; }
.quiz .right:checked ~ .ok { display: block; background: #f0fdfa; color: #134e4a; }
.quiz input:not(.right):checked ~ .no { display: block; background: #fee2e2; color: #7f1d1d; }
.quiz .ok::before { content: "✓ " / ""; }
.quiz .no::before { content: "✗ " / ""; }
</style>
</head>
<body>
<section class="quiz">
  <h2>سؤال اليوم</h2>
  <p class="q">أنهي selector بيمسك <b>أول تلات بنود بس</b> في القايمة؟</p>
  <input type="radio" name="a" id="a1"><label for="a1"><code dir="ltr">li:nth-child(3)</code></label>
  <input type="radio" name="a" id="a2" class="right"><label for="a2"><code dir="ltr">li:nth-child(-n+3)</code></label>
  <input type="radio" name="a" id="a3"><label for="a3"><code dir="ltr">li:nth-child(n+3)</code></label>
  <p class="fb ok">صح! n = 0 و 1 و 2 بيطلّعوا 3 و 2 و 1.</p>
  <p class="fb no">مش دي. جرّب تعوّض عن n بـ 0 و 1 و 2 وشوف بتطلّع إيه.</p>
</section>
</body>
</html>
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سؤال اليوم</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; background: #faf7f2; color: #292524; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.5; }
.quiz { max-width: 46ch; margin-inline: auto; padding: 1lh 1rem; background: white; border: 2px solid #e7e5e4; border-radius: 12px; }
.quiz:focus-within { border-color: #0f766e; }
.quiz h2 { margin: 0; font-size: calc(1rem * pow(1.25, 2)); color: #0f766e; }
.quiz .q { margin: 0.5lh 0 1lh; }
.quiz input { position: absolute; opacity: 0; }
.quiz label { display: block; margin-top: 0.5lh; padding: 0.5lh 1ch; border: 1px solid #d6d3d1; border-radius: 8px; cursor: pointer; }
.quiz input:focus-visible + label { outline: 3px solid #b45309; outline-offset: 2px; }
.quiz input:checked + label { background: #f5f5f4; border-color: #78716c; }
.quiz .right:checked + label { background: #f0fdfa; border-color: #0f766e; color: #134e4a; font-weight: 700; }
.quiz input:not(.right):checked + label { background: #fee2e2; border-color: #b91c1c; }
.quiz .fb { display: none; margin: 1lh 0 0; padding: 0.5lh 1ch; border-radius: 8px; }
.quiz .right:checked ~ .ok { display: block; background: #f0fdfa; color: #134e4a; }
.quiz input:not(.right):checked ~ .no { display: block; background: #fee2e2; color: #7f1d1d; }
.quiz .ok::before { content: "✓ " / ""; }
.quiz .no::before { content: "✗ " / ""; }
</style>
</head>
<body>
<section class="quiz">
  <h2>سؤال اليوم</h2>
  <p class="q">أنهي selector بيمسك <b>أول تلات بنود بس</b> في القايمة؟</p>
  <input type="radio" name="a" id="a1"><label for="a1"><code dir="ltr">li:nth-child(3)</code></label>
  <input type="radio" name="a" id="a2" class="right"><label for="a2"><code dir="ltr">li:nth-child(-n+3)</code></label>
  <input type="radio" name="a" id="a3"><label for="a3"><code dir="ltr">li:nth-child(n+3)</code></label>
  <p class="fb ok">صح! n = 0 و 1 و 2 بيطلّعوا 3 و 2 و 1.</p>
  <p class="fb no">مش دي. جرّب تعوّض عن n بـ 0 و 1 و 2 وشوف بتطلّع إيه.</p>
</section>
</body>
</html>
~~~

**هتشوف إيه:** كارت أبيض في النص فيه «سؤال اليوم» أخضر، والسؤال، وتلات اختيارات في صناديق. دوس على [[li:nth-child(n+3)]]: يحمر وتظهر تحته «✗ مش دي…». دوس على [[li:nth-child(-n+3)]]: يخضر وتظهر «✓ صح!».

**ليه التصميم ده:**
- الـ radio نفسه مستخبي ([[opacity: 0]] و [[position: absolute]] عشان ميحجزش مكان، وحدة الـ layout)، بس لسه موجود وبياخد focus، فالكيبورد وقارئ الشاشة شغالين. وحلقة [[:focus-visible + label]] بتوري مكانك.
- [[.right:checked ~ .ok]]: [[~]] بيوصل للفقرة اللي بعد الاختيارات كلها، لأنهم إخوات في نفس الـ section.
- [[input:not(.right):checked ~ .no]]: أي اختيار مش الصح ومتعلّم.
- [[<code dir="ltr">]] عشان الـ selector الإنجليزي جوه صفحة عربي ميتلخبطش ترتيبه (درس «lang و dir»).
- القيم بالـ [[lh]] و [[ch]] و [[pow()]] من الوحدة دي.

**الغلطة الشائعة:** [[display: none]] على الـ radio: بيختفي من الكيبورد وقارئ الشاشة كمان. وفقرة الرد قبل الاختيارات في الـ HTML: [[~]] مبيرجعش لورا.

~~~text القياس من Chrome (بعد ما الإجابة التالتة اتعلّمت)
label[for=a3]   background-color: rgb(254, 226, 226)
.fb.no          display: block        .fb.ok   display: none
~~~` },
      ],
      items: [
        {
          cmd: "[attr] و combinators",
          title: "تختار عناصر بالـ attribute وبمكانها جنب إخواتها: كل أشكال [attr] والأربع combinators",
          pre: ["css/selectors", "css/specificity"],
          ref: [
            { t: "MDN: Attribute selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors" },
            { t: "MDN: Selector list", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Selector_list" },
            { t: "MDN: Universal selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Universal_selectors" },
            { t: "MDN: Next-sibling combinator", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Next-sibling_combinator" },
            { t: "MDN: Subsequent-sibling combinator", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Subsequent-sibling_combinator" },
            { t: "MDN: Column combinator", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Column_combinator" },
            { t: "MDN: Namespace separator", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Namespace_separator" },
            { t: "Selectors Level 4: attribute selectors", url: "https://www.w3.org/TR/selectors-4/#attribute-selectors" },
            { t: "Selectors Level 4: combinators", url: "https://www.w3.org/TR/selectors-4/#combinators" }
          ],
          desc: R`الـ attribute selector بيختار العنصر من الـ attributes اللي في الـ HTML بتاعه: موجود ولا لأ ([[[href]]])، وقيمته بالظبط ([[[type="email"]]])، أو بتبدأ بحاجة ([[^=]]) أو بتخلص بيها ([[$=]]) أو فيها ([[*=]]) أو فيها كلمة من كلام مفصول بمسافات ([[~=]]) أو كود لغة ([[|=]])، ومن غير فرق بين الحروف الكبيرة والصغيرة بـ [[i]].
والـ combinators بيختاروا بالمكان: المسافة (أي حفيد)، و [[>]] (ابن مباشر)، و [[+]] (الأخ اللي بعده على طول)، و [[~]] (أي أخ بعده). ومعاهم أساسيات اتكلمنا عنها بسرعة قبل كده واتشرحت هنا كاملة: [[*]]، والـ selector list بالفاصلة، وإن غلطة واحدة في اللستة بتلغي القاعدة كلها.`,
          example: R`<style>
  a[href^="https://"] { color: #0f766e; }
  a[href$=".pdf" i] { background: #fef3c7; }
  [data-tags~="sale"] { font-weight: 700; }
  p[lang|="ar"] { padding: 8px; background: #f5f5f4; }
  .steps li + li { border-top: 1px solid #d6d3d1; }
  .steps .done ~ li { color: #78716c; }
  h2, .page-title { margin-top: 0; }
</style>
<h2>مصادر مكتبة الحي</h2>
<p lang="ar-EG"><a href="https://example.test/books">كتالوج الناشر</a> و <a href="/files/guide.PDF">دليل الاستعارة</a></p>
<p data-tags="new sale">رواية عليها خصم</p>
<ol class="steps"><li>اختار الكتاب</li><li class="done">ادفع</li><li>استلم</li><li>قيّم</li></ol>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS جوه الصفحة نفسها (درس «مقدمة CSS وتنسيق العناصر»). كل القواعد اللي جاية لحد [[</style>]] بتتطبق على الصفحة دي.`,
            R`أي لينك الـ [[href]] بتاعه **بيبدأ** بـ [[https://]] (يعني لينك لموقع تاني) لونه أخضر غامق. اللينكات الداخلية زي [[/about]] مش هتتأثر.`,
            R`أي لينك الـ [[href]] بتاعه **بيخلص** بـ [[.pdf]]، و [[i]] قبل القوس معناها «متفرّقش بين [[.pdf]] و [[.PDF]]». خلفيته صفرا فاتحة.`,
            R`أي عنصر عليه [[data-tags]] فيه **كلمة** [[sale]] لوحدها وسط كلام مفصول بمسافات ([[data-tags="new sale"]]). [[sales]] مش هتطابق.`,
            R`أي فقرة الـ [[lang]] بتاعها [[ar]] أو أي لهجة منها ([[ar-EG]] و [[ar-SA]]) بتاخد مسافة جوه وخلفية رمادي فاتحة. [[|=]] معمولة لأكواد اللغات بالظبط.`,
            R`كل [[li]] قبله على طول [[li]] تاني: يعني كل بند ما عدا الأول. الخط بيبقى **بين** البنود، مش فوق أولهم.`,
            R`كل [[li]] جاي **بعد** البند اللي عليه [[.done]] في نفس القايمة، مهما كان بعيد عنه، لونه رمادي.`,
            R`selector list: نفس القاعدة لحاجتين مفصولين بفاصلة. لو واحد منهم مكتوب غلط القاعدة كلها بتتلغي (قسم ٤).`,
            R`قفلة بلوك الـ CSS. اللي بعدها HTML عادي هو اللي القواعد بتتطبق عليه.`,
            R`عنوان [[<h2>]]: القاعدة الأخيرة شالت الـ margin اللي فوقه.`,
            R`فقرة [[lang="ar-EG"]] فيها لينكين: الأول بيبدأ بـ [[https://]] فبيبقى أخضر، والتاني بيخلص بـ [[.PDF]] كبيرة وبرضه بياخد الخلفية الصفرا بسبب [[i]]. والفقرة نفسها اتمسكت بـ [[|=]].`,
            R`فقرة [[data-tags="new sale"]]: فيها كلمة [[sale]] لوحدها، فبقت تقيلة.`,
            R`قايمة خطوات: خط بين كل بندين، و «استلم» و «قيّم» رمادي لأنهم بعد [[.done]]، و «اختار الكتاب» أسود لأنه قبلها.`
          ],
          teach: R`## الفكرة في سطرين

درس «selectors» عرّفك على الحاجات الأساسية (بالنوع، وبالـ class، وبالمكان، و [[input[type="email"]]]). هنا بنكمّل كل اللي فاضل في نفس العيلة: **كل** أشكال الـ attribute selector، والـ combinators الأربعة، وكام حاجة اتقالت في جملة واحدة قبل كده وليها قواعد مهمة (النجمة [[*]]، والفاصلة).

كل الأرقام في الدرس ده من Chrome 157 (headless على Windows 11): الصفحة اتفتحت، و [[document.querySelectorAll(selector).length]] عدّت العناصر اللي كل selector بيختارها، و [[getComputedStyle]] قرت التنسيق اللي اتطبق.

---

## ١. الأساس في جدول: type و class و ID و [[*]]

| الـ selector | اسمه | بيختار | وزنه (درس «specificity») |
|---|---|---|---|
| [[p]] | type selector | كل عنصر من النوع ده | (0,0,1) |
| [[.card]] | class selector | كل عنصر في الـ [[class]] بتاعه كلمة [[card]] | (0,1,0) |
| [[#faq]] | ID selector | العنصر اللي [[id="faq"]] | (1,0,0) |
| [[*]] | universal selector | أي عنصر | (0,0,0) |

### [[*]]: كل العناصر

النجمة لوحدها بتختار كل عنصر في الصفحة، بما فيهم [[html]] و [[head]] و [[style]] و [[script]]:

~~~text القياس من Chrome (صفحة صغيرة فيها ٦ لينكات وفورم وكارت)
*            45      ← كل عنصر في الصفحة، حتى head و meta و style
.card *      7       ← كل اللي جوه الكارت بأي عمق
~~~

- **وزنها صفر**، فأي selector تاني بيغلبها. عشان كده [[* { margin: 0 }]] في أول الملف آمنة: أي قاعدة بعدها هتكسبها.
- **لزقها في حاجة ملهاش لازمة:** [[*.card]] هي هي [[.card]]. والمواصفة بتقول النجمة بتتشال من الـ selector لو فيه حاجة تانية جنبها.
- **مكانها المفيد:** بعد combinator. [[.card > *]] = كل ابن مباشر للكارت مهما كان نوعه. وهتشوفها تاني في [[.stack > * + *]] (درس «box model»).

---

## ٢. الـ attribute selectors كلها

الأقواس المربعة [[[ ]]] جواها اسم attribute، واختياري علامة وقيمة. جرّبت كل شكل على قايمة لينكات لمكتبة متخيلة:

~~~html الصفحة اللي اتقاس عليها
<a href="https://example.test/guide.pdf" lang="ar-EG" data-tags="new sale" title="دليل">دليل PDF</a>
<a href="/docs/price-list.PDF" lang="ar" data-tags="sale">الأسعار</a>
<a href="http://old.example.test/" lang="en" data-tags="new-ish">قديم</a>
<a href="mailto:hi@example.test" lang="en-US">ابعتلنا</a>
<a href="#faq" data-tags="">الأسئلة</a>
<a>من غير href</a>
~~~

| الشكل | معناه | مثال | العدد | مين |
|---|---|---|---|---|
| [[[attr]]] | الـ attribute موجود، بأي قيمة حتى لو فاضية | [[a[href]]] | 5 | كله ما عدا «من غير href» |
| [[[attr="v"]]] | القيمة **بالظبط** كده | [[a[href="#faq"]]] | 1 | الأسئلة |
| [[[attr~="v"]]] | القيمة كلام مفصول بمسافات، وواحدة من الكلمات هي [[v]] | [[a[data-tags~="new"]]] | 1 | دليل PDF بس ([[new-ish]] كلمة تانية) |
| [[[attr\|="v"]]] | القيمة [[v]] بالظبط، أو بتبدأ بـ [[v-]] | [[a[lang\|="ar"]]] | 2 | دليل PDF ([[ar-EG]]) والأسعار ([[ar]]) |
| [[[attr^="v"]]] | بتبدأ بـ [[v]] | [[a[href^="https"]]] | 1 | دليل PDF |
| [[[attr$="v"]]] | بتخلص بـ [[v]] | [[a[href$=".pdf"]]] | 1 | دليل PDF بس (التاني [[.PDF]] كبيرة) |
| [[[attr*="v"]]] | [[v]] موجودة في أي حتة | [[a[href*="example"]]] | 3 | دليل، وقديم، وابعتلنا |
| [[[attr="v" i]]] | زي اللي فوق، بس من غير فرق بين الكبيرة والصغيرة | [[a[href$=".pdf" i]]] | 2 | دليل PDF والأسعار |

### الفرق اللي بيلخبط: [[~=]] ضد [[*=]]

~~~text القياس من Chrome
a[data-tags~="new"]    1    ← "new sale" فيها كلمة new لوحدها
a[data-tags*="new"]    2    ← "new sale" و "new-ish": أي ٣ حروف ورا بعض
~~~

[[~=]] بتشتغل زي الـ class بالظبط (الـ [[class]] كلام مفصول بمسافات، و [[.card]] معناها [[[class~="card"]]]). استخدمها لما الـ attribute فيه «لستة كلمات». و [[*=]] بتدوّر على حروف، فـ [[*="new"]] هتمسك [[renew]] و [[news]] كمان.

### الفرق التاني: [[|=]] ضد [[^=]]

[[|=]] معمولة لأكواد اللغة: [[[lang|="ar"]]] بتمسك [[ar]] و [[ar-EG]]، ومبتمسكش [[arz]] (كود العامية المصرية في بعض الأنظمة). أما [[[lang^="ar"]]] فبتمسك أي حاجة بتبدأ بـ [[ar]]، حتى [[arz]]. ولما تبقى عايز «الصفحة دي عربي؟» فيه طريقة أحسن من الاتنين: [[:lang(ar)]] (درس «:target و :focus-within»)، لأنها بتورث اللغة من الأب.

### القيمة الفاضية

~~~text القياس من Chrome (اللينك اللي data-tags="")
a[data-tags=""]     1    ← القيمة فاضية بالظبط: بيطابق
a[data-tags~=""]    0    ← ~= و ^= و $= و *= بقيمة فاضية مبيطابقوش أي حاجة أبدًا
a[data-tags^=""]    0
~~~

### الحروف الكبيرة والصغيرة: [[i]] و [[s]]

- **القيمة حساسة للحروف** في أغلب الـ attributes: [[[href$=".pdf"]]] مبتمسكش [[.PDF]]. الحل [[i]] (insensitive) قبل القوس.
- **إلا شوية attributes في HTML** المواصفة بتقول قيمتها مش حساسة، زي [[type]]: [[input[type="text"]]] مسكت [[<input type="TEXT">]] من غير [[i]] (اتقاس: 1).
- [[s]] (sensitive) العكس: تجبر المقارنة تبقى حساسة حتى في [[type]]. **Chrome 157 مبيدعمهاش:** [[CSS.supports('selector([a="b" s])')]] رجّعت [[false]]، و [[querySelectorAll]] رمت [[SyntaxError]]. MDN بيقول Firefox بس اللي بيدعمها، فمتستخدمهاش.

### التنصيص

القيمة ممكن تتكتب من غير علامات تنصيص لو كلمة عادية: [[a[href^=http]]] شغالة (2). بس لو فيها [[#]] أو [[.]] أو [[/]] أو مسافة لازم تتنصص: [[a[href=#faq]]] رمت [[SyntaxError]] في Chrome. فخلّيها عادة: **نصّص دايمًا**.

~~~live 120 لينكات بتتلوّن حسب نوعها
<style>
  a[href^="https://"] { color: #0f766e; }
  a[href$=".pdf" i] { background: #fef3c7; }
  a { margin: 0 6px; }
</style>
<p>
  <a href="https://example.test/a">موقع تاني</a>
  <a href="/files/menu.PDF">المنيو PDF</a>
  <a href="/about">عن المكتبة</a>
</p>
~~~

**هتشوف إيه:** «موقع تاني» لونه أخضر غامق. «المنيو PDF» أزرق (لون اللينك العادي) وخلفيته صفرا، رغم إن الامتداد مكتوب كبير. «عن المكتبة» لينك أزرق عادي، مفيش قاعدة مسكته.

~~~text القياس من Chrome
موقع تاني     color: rgb(15, 118, 110)    ← القاعدة الأولى
المنيو PDF    background-color: rgb(254, 243, 199)    color: rgb(0, 0, 238) ← لون اللينك الافتراضي من المتصفح
عن المكتبة    color: rgb(0, 0, 238)    background-color: rgba(0, 0, 0, 0) ← شفاف
~~~

الوزن: أي attribute selector وزنه زي class (0,1,0)، مهما كان شكله. [[[id="faq"]]] وزنها (0,1,0) مش (1,0,0) زي [[#faq]] (درس «specificity»).

---

## ٣. الـ combinators الأربعة

الـ combinator هو الحاجة اللي **بين** اتنين selectors، وبيقول العلاقة بينهم في شجرة الـ HTML. اتنين منهم شفتهم في درس «selectors» (المسافة و [[>]])، واتنين جداد للإخوات:

~~~html الكارت اللي اتقاس عليه
<div class="card">
  <h3>عنوان</h3>
  <p>أ</p>
  <p>ب</p>
  <div><p>ج</p></div>
  <span>س</span>
  <p>د</p>
</div>
~~~

| الـ combinator | اسمه | مثال | العدد | مين |
|---|---|---|---|---|
| مسافة | descendant combinator | [[.card p]] | 4 | أ، ب، ج، د (ج حفيدة جوه div) |
| [[>]] | child combinator | [[.card > p]] | 3 | أ، ب، د (ج مش ابن مباشر) |
| [[+]] | next-sibling combinator | [[.card h3 + p]] | 1 | أ: الأخ اللي **بعد** h3 على طول |
| [[~]] | subsequent-sibling combinator | [[.card h3 ~ p]] | 3 | أ، ب، د: كل p بعد h3 في نفس الأب |

### [[+]]: الأخ اللي بعده على طول

[[A + B]] = عنصر B، **قبله على طول** عنصر A، والاتنين ليهم نفس الأب. «على طول» يعني مفيش أي عنصر بينهم (الكلام والمسافات مش بيتحسبوا، العناصر بس):

~~~text القياس من Chrome
.card p + p        1    ← ب بس: قبلها أ. ود قبلها span مش p
.card span + p     1    ← د: قبلها span على طول
~~~

ده أشهر استخدام ليه: **مسافة بين العناصر مش قبل أولهم**. [[li + li]] = كل بند ما عدا الأول.

### [[~]]: أي أخ بعده

[[A ~ B]] = كل B **بعد** A في نفس الأب، مهما كان بينهم. ومبيرجعش لورا: العنصر اللي قبل A مش بيتمسك. اسمه القديم «general sibling combinator»، واسمه في المواصفة الحالية subsequent-sibling.

~~~text القياس من Chrome
.card p ~ p    2    ← ب ود: كل p قبلها p (أ مفيش p قبلها)
~~~

### الأربعة في صفحة واحدة

~~~live 170 خطوات طلب: + بيحط خط بين البنود، و ~ بيبهّت اللي جاي
<style>
  .steps { padding: 0 24px; }
  .steps li { padding: 8px 0; }
  .steps li + li { border-top: 1px solid #d6d3d1; }
  .steps .done ~ li { color: #78716c; }
  .steps > li > b { color: #0f766e; }
</style>
<ol class="steps">
  <li><b>اختار الكتاب</b></li>
  <li class="done"><b>ادفع</b> (انت هنا)</li>
  <li>استلم</li>
  <li>قيّم</li>
</ol>
~~~

**هتشوف إيه:** خط رمادي رفيع بين كل بندين، ومفيش خط فوق أول بند. «استلم» و «قيّم» لونهم رمادي (جايين بعد البند اللي عليه [[.done]])، و «اختار الكتاب» فضل أسود رغم إنه أخ لـ [[.done]]، لأنه **قبله**. والكلام التقيل أخضر.

~~~text القياس من Chrome
اختار الكتاب   border-top-width: 0px    color: rgb(0, 0, 0)
ادفع           border-top-width: 1px    color: rgb(0, 0, 0)
استلم          border-top-width: 1px    color: rgb(120, 113, 108)
قيّم           border-top-width: 1px    color: rgb(120, 113, 108)
~~~

والـ combinators **ملهمش وزن**: [[.steps li + li]] وزنها (0,1,2) زي [[.steps li li]] بالظبط.

### مفيش combinator بيرجع لورا

مفيش «الأخ اللي قبله» ولا «الأب». الـ CSS بيمشي من فوق لتحت ومن قبل لبعد بس. ولو محتاج «الكارت اللي **جواه** صورة» أو «العنوان اللي **بعده** فقرة» فده [[:has()]]: [[.card:has(img)]] و [[h2:has(+ p)]] (درس «:has()» في وحدة CSS الحديث).

### اتنين نادرين: [[||]] و [[|]]

| العنصر | اسمه | الحالة في Chrome 157 |
|---|---|---|
| [[col.sel \|\| td]] | column combinator: الخانات اللي تحت عمود معيّن في جدول | **مش مدعوم:** [[CSS.supports]] رجّعت [[false]]. MDN بيقول مفيش متصفح بيدعمه، فبدله لوّن الـ [[<col>]] نفسه (درس «colspan و rowspan و colgroup») أو [[td:nth-child(2)]] (الدرس الجاي) |
| [[svg\|circle]] | namespace separator: «عنصر circle من namespace اسمه svg» | مدعوم، بس محتاج [[@namespace]] الأول. بيتشرح في درس «@import و @charset» قسم [[@namespace]] |

---

## ٤. الـ selector list: الفاصلة

[[h1, h2, .page-title { ... }]] = نفس القاعدة مكتوبة لتلات selectors. بتوفّر تكرار، وكل واحد منهم بيتحسب وزنه لوحده (مش أتقلهم).

### الفخ: غلطة واحدة بتلغي الكل

~~~css
h1, h2:fake-thing { color: red; }
~~~

[[:fake-thing]] مش موجودة، فالمتصفح بيعتبر الـ selector list كلها غلط، وبيرمي **القاعدة كلها**، حتى الـ [[h1]] السليم:

~~~text القياس من Chrome
h1, h2:fake-thing { color: red }    →  h1: rgb(0, 0, 0)    ← القاعدة اترمت، والـ h1 فضل أسود
h3, h4 { color: green }             →  h3: rgb(0, 128, 0)
:is(h5, h6:fake-thing) { color: blue }  →  h5: rgb(0, 0, 255)    ← :is() بتسامح وبتتجاهل الغلط بس
~~~

ده بيحصل فعلًا لما تجمع selector جديد مش مدعوم في متصفح قديم مع selectors عادية: الكل بيقع في المتصفح ده. الحل إن الجديد يبقى في قاعدة لوحده، أو جوه [[:is()]] (درس «:is و :where و :not»).

---

## ٥. [[&]]: الـ nesting selector

لما بتكتب قاعدة جوه قاعدة ([[.card { & h3 { } }]])، [[&]] معناها «الـ selector اللي برّه». ده درس كامل لوحده: «CSS nesting» في وحدة CSS الحديث.

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[a[href$=".pdf"]]] والملف [[.PDF]] | مبيتمسكش لأن المقارنة حساسة للحروف. زوّد [[i]] |
| [[[data-tags*="new"]]] عشان «الكلمة new» | بيمسك [[news]] و [[renew]]. استخدم [[~=]] |
| [[a[href=#top]]] من غير تنصيص | [[SyntaxError]] والقاعدة كلها بتتلغي |
| [[li + li]] متوقع يمسك أول بند | مبيمسكوش، وده المقصود: الخط بين البنود |
| [[.done ~ li]] متوقع يمسك اللي قبله | [[~]] بتمشي لقدام بس. للي قبله: [[:has()]] |
| selector جديد في لستة مع القديم | لو المتصفح مش فاهمه، القاعدة كلها بتقع |
| [[[s]]] flag أو [[\|\|]] | مش مدعومين في Chrome |

---

## الخلاصة

- [[[attr]]] موجود، [[=]] بالظبط، [[~=]] كلمة، [[|=]] كود لغة، [[^=]] أول، [[$=]] آخر، [[*=]] أي حتة، و [[i]] من غير فرق في الحروف. وزن أي واحد = class.
- المسافة حفيد، [[>]] ابن، [[+]] الأخ اللي بعده على طول، [[~]] أي أخ بعده. ومفيش رجوع لورا (ده [[:has()]]).
- [[*]] وزنها صفر. والفاصلة بتجمع selectors، بس غلطة واحدة بتلغي القاعدة كلها.`,
          try: R`اعمل [[links.html]] فيه ٦ لينكات: لموقع تاني بـ [[https://]]، و [[.pdf]] و [[.PDF]]، و [[mailto:]]، و [[tel:]]، ولينك داخلي. لوّن كل نوع بقاعدة attribute selector مختلفة. وبعدين افتح DevTools › Console واكتب [[document.querySelectorAll('a[href$=".pdf" i]').length]] وقارن العدد بالقاعدة.`,
          sol: R`~~~live 150 links.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>لينكات</title>
<style>
  a { display: block; margin: 4px 0; }
  a[href^="https://"] { color: #0f766e; }
  a[href$=".pdf" i] { background: #fef3c7; }
  a[href^="mailto:"] { color: #b45309; }
  a[href^="tel:"] { color: #7c3aed; }
</style>
</head>
<body>
<a href="https://example.test">موقع تاني</a>
<a href="/files/guide.pdf">الدليل</a>
<a href="/files/prices.PDF">الأسعار</a>
<a href="mailto:hi@example.test">ابعتلنا</a>
<a href="tel:+201000000000">كلّمنا</a>
<a href="/about">عن المكتبة</a>
</body>
</html>
~~~

**هتشوف إيه:** ست لينكات كل واحد في سطر. الأول أخضر، والتاني والتالت خلفيتهم صفرا (رغم إن التالت امتداده كبير)، والإيميل بني، والتليفون بنفسجي، والأخير أزرق عادي.

~~~text القياس من Chrome (الـ Console)
document.querySelectorAll('a[href$=".pdf" i]').length   →  2
document.querySelectorAll('a[href$=".pdf"]').length     →  1
~~~

**ليه كده:** [[^=]] بتبص على أول الـ [[href]]، فكل نوع لينك ليه بداية مختلفة ([[https://]] و [[mailto:]] و [[tel:]]). والملف نوعه في الآخر، فـ [[$=]]، و [[i]] عشان الامتداد ممكن يتكتب كبير. **الغلطة الشائعة:** [[a[href*="pdf"]]]: هتمسك [[/pdf-tools/]] كمان.`,
          deep: {
            why: R`الـ HTML الحقيقي مليان معلومات في الـ attributes: نوع اللينك، ولغة الكلام، وحالة الحقل، و [[data-*]] اللي انت حاطها. الـ attribute selector بيخلّيك تنسّق على المعلومة دي نفسها من غير ما تزوّد class في كل مكان، فلو حد زوّد لينك PDF جديد بكرة هيتلوّن لوحده. والـ combinators الأربعة بيحلّوا أكتر مشكلة بتتكرر في الـ layout: مسافة أو خط **بين** العناصر مش قبل أولهم.`,
            how: R`المتصفح بيقرا الـ selector من اليمين للشمال: في [[.steps .done ~ li]] بيمسك كل [[li]] الأول، وبعدين يرجع على إخواته اللي قبله يدوّر على [[.done]]، وبعدين يطلع لفوق يدوّر على جد عليه [[.steps]]. عشان كده مفيش combinator «للي قبل» أو «للأب»: المتصفح بيبني الصفحة من فوق لتحت، والعنصر بيتنسّق قبل ما إخواته اللي بعده يتقروا. و [[:has()]] كسرت القاعدة دي بتكلفة محسوبة.

الـ attribute selector بيقارن النص اللي في الـ HTML زي ما هو (مش القيمة بعد ما المتصفح يفهمها): [[a[href^="https"]]] بتبص على [[href]] زي ما انت كاتبه، فلينك [[//example.test]] (من غير https) مش هيتمسك رغم إنه في الآخر بيفتح https. وكل attribute selector وزنه (0,1,0).`,
            when: R`[[^=]] و [[$=]] للينكات (خارجي، وإيميل، وتليفون، وملفات) وللـ [[data-*]] اللي ليها بادئة. [[~=]] لـ [[data-tags]] و [[rel]] ([[a[rel~="noopener"]]]). [[|=]] لـ [[lang]] لو محتاج قيمة الـ attribute نفسه، وإلا [[:lang()]]. [[[attr]]] لوحده لحالات زي [[[disabled]]] و [[[hidden]]] و [[[aria-current]]]. [[+]] للمسافات بين العناصر، و [[~]] لـ «كل اللي بعد العنصر ده».`,
            mistakes: R`نسيان [[i]] مع الامتدادات. [[*=]] مكان [[~=]]. قيمة من غير تنصيص فيها [[#]] أو [[.]]. توقّع إن [[~]] بتمسك اللي قبل. خلط selector مش مدعوم مع selectors سليمة في نفس اللستة. واستخدام [[[s]]] أو [[||]] اللي Chrome مبيدعمهمش.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** في قايمة المصادر دي، اللينكات اللي رايحة لموقع تاني (بتبدأ بـ [[https://]]) لونها أخضر [[#0f766e]]، واللينك الداخلي يفضل زي ما هو. اكتب القاعدة بـ attribute selector من غير ما تزوّد class في الـ HTML. (من قسم ٢ في الشرح)`, done: R`اللينكين الخارجيين أخضر والداخلي أزرق، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  a { display: block; margin: 4px 0; }
</style>
<a href="https://example.test/books">كتالوج الناشر</a>
<a href="https://example.test/map">الخريطة</a>
<a href="/rules">قواعد الاستعارة</a>`, checks: [
              { say: R`اللينكات اللي بتبدأ بـ [[https://]] لونها أخضر`, q: 'a[href^="https://"]', style: ["color", "rgb(15, 118, 110)"] },
              { say: R`اللينك الداخلي لسه أزرق المتصفح`, q: 'a[href="/rules"]', style: ["color", "rgb(0, 0, 238)"] },
              { say: R`مفيش class زيادة في الـ HTML`, q: "a[class]", n: 0 }
            ] }, sol: R`~~~live 110 الحل
<style>
  a { display: block; margin: 4px 0; }
  a[href^="https://"] { color: #0f766e; }
</style>
<a href="https://example.test/books">كتالوج الناشر</a>
<a href="https://example.test/map">الخريطة</a>
<a href="/rules">قواعد الاستعارة</a>
~~~

**هتشوف إيه:** أول لينكين أخضر غامق، والتالت أزرق اللينكات العادي.

**ليه كده:** [[^=]] بتبص على أول القيمة. كل لينك لموقع تاني بيبدأ بـ [[https://]]، والداخلي بيبدأ بـ [[/]]. ولو حد زوّد لينك خارجي بكرة هيتلوّن لوحده.

**الغلطة الشائعة:** [[a[href*="https"]]]: شغالة هنا، بس هتمسك كمان لينك داخلي زي [[/why-https]].

~~~text القياس من Chrome
a[href^="https://"]   color: rgb(15, 118, 110)   (اتنين)
a[href="/rules"]      color: rgb(0, 0, 238)       ← لون اللينك الافتراضي
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** القاعدة دي المفروض تلوّن العناوين التلاتة بني، بس ولا واحد فيهم اتلوّن. لاقي الغلطة وصلّحها من غير ما تمسح أي عنوان من اللستة. (من قسم ٤ في الشرح: «غلطة واحدة بتلغي الكل»)`, done: R`العناوين التلاتة بني، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  h1, h2, .page-title:hovr { color: #b45309; }
</style>
<h1>مكتبة الحي</h1>
<h2>الكتب الجديدة</h2>
<p class="page-title">عن المكتبة</p>`, checks: [
              { say: R`الـ [[h1]] بني`, q: "h1", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`الـ [[h2]] بني`, q: "h2", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`[[.page-title]] بني كمان`, q: ".page-title", style: ["color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 150 بعد التصليح
<style>
  h1, h2, .page-title { color: #b45309; }
</style>
<h1>مكتبة الحي</h1>
<h2>الكتب الجديدة</h2>
<p class="page-title">عن المكتبة</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 150 قبل
<style>
  h1, h2, .page-title:hovr { color: #b45309; }
</style>
<h1>مكتبة الحي</h1>
<h2>الكتب الجديدة</h2>
<p class="page-title">عن المكتبة</p>
~~~

**هتشوف إيه:** في الحل التلاتة بني. في «قبل» التلاتة أسود، حتى الـ [[h1]] والـ [[h2]] اللي مكتوبين صح.

**ليه:** [[:hovr]] (حرف ناقص من [[:hover]]) مش pseudo-class موجودة، فالـ selector list كلها اتعتبرت غلط، والمتصفح رمى القاعدة كلها. ده في DevTools › Styles مش بيبان خالص كقاعدة.

**الغلطة الشائعة:** تصلّح بإنك تكتب [[:hover]]: كده الـ [[h1]] والـ [[h2]] هيبقوا بني، بس [[.page-title]] هيتلوّن **بس** لما الماوس ييجي عليه. المطلوب كان التلاتة على طول. ولو كنت عايز الاتنين: [[:is(h1, h2, .page-title:hovr)]] بتسامح وتلوّن الاتنين السليمين.

~~~text القياس من Chrome
قبل:  h1  color: rgb(0, 0, 0)       بعد:  h1  color: rgb(180, 83, 9)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة خطوات الاشتراك. حط خط [[1px solid #d6d3d1]] **فوق** كل خطوة ما عدا الأولى، واعمل الخطوات اللي **بعد** الخطوة الحالية ([[.now]]) لونها رمادي [[#78716c]]. من غير ما تزوّد ولا class. (من قسم ٣ في الشرح: [[+]] و [[~]])`, done: R`مفيش خط فوق أول خطوة، والخطوات بعد «ادفع» رمادي واللي قبلها أسود، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .steps li { padding: 8px 0; }
</style>
<ol class="steps">
  <li>اعمل حساب</li>
  <li>اختار الباقة</li>
  <li class="now">ادفع</li>
  <li>أكّد الإيميل</li>
  <li>ابدأ</li>
</ol>`, checks: [
              { say: R`أول خطوة مفيش فوقها خط`, q: ".steps li:first-child", style: ["border-top-width", "0px"] },
              { say: R`كل خطوة بعد الأولى فوقها خط 1px`, q: ".steps li:not(:first-child)", style: ["border-top-width", "1px"] },
              { say: R`الخطوات بعد [[.now]] رمادي`, q: ".steps .now ~ li", style: ["color", "rgb(120, 113, 108)"] },
              { say: R`الخطوات قبل [[.now]] لسه أسود`, q: ".steps li:nth-child(-n+2)", style: ["color", "rgb(0, 0, 0)"] }
            ] }, sol: R`~~~live 190 الحل
<style>
  .steps li { padding: 8px 0; }
  .steps li + li { border-top: 1px solid #d6d3d1; }
  .steps .now ~ li { color: #78716c; }
</style>
<ol class="steps">
  <li>اعمل حساب</li>
  <li>اختار الباقة</li>
  <li class="now">ادفع</li>
  <li>أكّد الإيميل</li>
  <li>ابدأ</li>
</ol>
~~~

**هتشوف إيه:** خطوط رمادي رفيعة بين الخطوات، ومفيش خط فوق «اعمل حساب». «أكّد الإيميل» و «ابدأ» باهتين، والتلاتة الأولانيين أسود.

**ليه كده:** [[li + li]] = كل li قبله li على طول، فالأول بس اللي بيفلت. و [[.now ~ li]] = كل li بعد [[.now]]، و [[~]] مبتمشيش لورا فاللي قبلها ميتأثرش.

**الغلطة الشائعة:** [[border-bottom]] على كل الـ li: هيطلع خط تحت آخر خطوة كمان. أو [[.now + li]]: هيبهّت «أكّد الإيميل» بس.

~~~text القياس من Chrome
اعمل حساب     border-top-width: 0px   color: rgb(0, 0, 0)
ادفع          border-top-width: 1px   color: rgb(0, 0, 0)
ابدأ          border-top-width: 1px   color: rgb(120, 113, 108)
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** كروت كتب جاية من قاعدة بيانات، وكل كارت عليه [[data-tags]] فيه كلمات مفصولة بمسافات. الكتب اللي فيها كلمة [[sale]] (لوحدها) خلفيتها صفرا [[#fef3c7]]. خلي بالك من [[sales-report]] و [[presale]]: دول مش «sale». (من قسم ٢ في الشرح: [[~=]] ضد [[*=]])`, done: R`كارتين بس اتلوّنوا («رواية» و «أطلس»)، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .book { padding: 6px 10px; margin: 4px 0; border: 1px solid #e7e5e4; }
</style>
<div class="book" data-tags="new sale">رواية</div>
<div class="book" data-tags="sales-report">تقرير مبيعات</div>
<div class="book" data-tags="sale kids">أطلس</div>
<div class="book" data-tags="presale">كتاب جاي قريب</div>`, checks: [
              { say: R`الكتب اللي فيها كلمة [[sale]] صفرا`, q: '.book[data-tags~="sale"]', style: ["background-color", "rgb(254, 243, 199)"] },
              { say: R`[[sales-report]] فضل شفاف`, q: '.book[data-tags="sales-report"]', style: ["background-color", "rgba(0, 0, 0, 0)"] },
              { say: R`[[presale]] فضل شفاف`, q: '.book[data-tags="presale"]', style: ["background-color", "rgba(0, 0, 0, 0)"] }
            ] }, sol: R`~~~live 170 الحل
<style>
  .book { padding: 6px 10px; margin: 4px 0; border: 1px solid #e7e5e4; }
  .book[data-tags~="sale"] { background: #fef3c7; }
</style>
<div class="book" data-tags="new sale">رواية</div>
<div class="book" data-tags="sales-report">تقرير مبيعات</div>
<div class="book" data-tags="sale kids">أطلس</div>
<div class="book" data-tags="presale">كتاب جاي قريب</div>
~~~

**هتشوف إيه:** «رواية» و «أطلس» خلفيتهم صفرا فاتحة، و «تقرير مبيعات» و «كتاب جاي قريب» أبيض.

**ليه كده:** [[~=]] بتقسم القيمة على المسافات وبتدوّر على كلمة كاملة. [[sales-report]] كلمة واحدة مش [[sale]]، و [[presale]] برضه.

**الغلطة الشائعة:** [[[data-tags*="sale"]]] بتلوّن الأربعة، لأنها بتدوّر على الحروف [[s-a-l-e]] في أي حتة.

~~~text القياس من Chrome
[data-tags~="sale"]  →  2 كروت      [data-tags*="sale"]  →  4 كروت
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها تلات فقرات: [[lang="ar"]] و [[lang="ar-EG"]] و [[lang="arz"]]. كام فقرة هيمسك كل واحد من دول: [[p[lang|="ar"]]] و [[p[lang^="ar"]]] و [[p[lang="ar"]]]؟ اكتب التلات أرقام، وبعدين جرّب في الـ Console. (من قسم ٢: [[|=]] ضد [[^=]])`, done: R`كتبت 2 و 3 و 1 وعرفت ليه.`, sol: R`~~~live 120 الصفحة والقاعدة
<style>
  p[lang|="ar"] { background: #fef3c7; }
</style>
<p lang="ar">عربي</p>
<p lang="ar-EG">مصري</p>
<p lang="arz">arz</p>
~~~

**الإجابة:** [[|=]] ‏2، و [[^=]] ‏3، و [[=]] ‏1.

**هتشوف إيه:** أول فقرتين خلفيتهم صفرا (اللي مسكهم [[|=]])، والتالتة لأ.

**ليه:** [[|=]] بتطابق [[ar]] بالظبط أو [[ar-]] وبعدها أي حاجة، فـ [[arz]] بره (مفيش شرطة). [[^=]] أي حاجة بتبدأ بـ [[ar]]، فالتلاتة. و [[=]] لازم القيمة كلها [[ar]].

~~~text القياس من Chrome
p[lang|="ar"]   2
p[lang^="ar"]   3
p[lang="ar"]    1
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة «Column combinator» على MDN: الـ [[||]] المفروض يعمل إيه؟ وفيه متصفح بيدعمه؟ وبعدين جرّب في Chrome عندك [[CSS.supports('selector(col || td)')]]، واكتب بديل شغال يلوّن الخانات اللي تحت العمود التاني في جدول. (من قسم ٣: «اتنين نادرين»)`, done: R`كتبت إنه مش مدعوم ونتيجة [[CSS.supports]] [[false]]، وبديل شغال.`, sol: R`**الإجابة النموذجية:** [[col.sel || td]] معناها «كل [[td]] تحت العمود اللي الـ [[<col>]] بتاعه عليه [[.sel]]»، حتى لو الخانات فيها [[colspan]]. MDN بيقول مفيش متصفح بيدعمه (Experimental). وفي Chrome 157:

~~~text القياس من Chrome
CSS.supports('selector(col || td)')   →  false
~~~

**بديل شغال:**

~~~live 110 العمود التاني متلوّن
<style>
  td { padding: 6px 12px; border: 1px solid #d6d3d1; }
  td:nth-child(2) { background: #fef3c7; }
</style>
<table>
  <tr><td>رواية</td><td>١٢٠ جنيه</td><td>متاح</td></tr>
  <tr><td>أطلس</td><td>٢٠٠ جنيه</td><td>خلصان</td></tr>
</table>
~~~

**هتشوف إيه:** جدول بخانات ليها حدود، والعمود اللي فيه الأسعار (التاني من اليمين) خلفيته صفرا.

**ليه شغال:** [[:nth-child(2)]] (الدرس الجاي) بيمسك الخانة التانية في كل صف. وفيه بديل تاني: [[<colgroup><col><col style="background:#fef3c7"></colgroup>]] بيلوّن خلفية العمود كله (درس «colspan و rowspan و colgroup»). الفرق: [[nth-child]] بيلخبط لو صف فيه [[colspan]].` }
          ]
        },
        {
          cmd: ":nth-child و :first-child",
          title: "تختار العنصر من ترتيبه بين إخواته: الأول والأخير والوحيد، وكل تالت واحد، والأول من نوعه، والفاضي",
          pre: ["css/[attr] و combinators"],
          ref: [
            { t: "MDN: :nth-child()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child" },
            { t: "MDN: :first-child", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:first-child" },
            { t: "MDN: :only-child", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:only-child" },
            { t: "MDN: :nth-of-type()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-of-type" },
            { t: "MDN: :only-of-type", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:only-of-type" },
            { t: "MDN: :empty", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:empty" },
            { t: "MDN: :root", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:root" },
            { t: "MDN: :scope", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:scope" },
            { t: "Selectors Level 4: tree-structural pseudo-classes", url: "https://www.w3.org/TR/selectors-4/#structural-pseudos" }
          ],
          desc: R`الـ structural pseudo-classes بتختار العنصر من **مكانه** وسط إخواته من غير ما تحط class: [[:first-child]] و [[:last-child]] و [[:only-child]]، و [[:nth-child(2n)]] بمعادلة تمسك كل تاني أو كل تالت أو أول تلاتة، و [[:nth-last-child()]] من الآخر.
وعيلة [[-of-type]] بتعد العناصر اللي من **نفس النوع** بس ([[:first-of-type]] و [[:nth-of-type()]]…)، و [[:empty]] العنصر اللي مفيهوش أي حاجة، و [[:root]] أعلى عنصر في الصفحة، و [[:scope]] العنصر اللي انت بادئ منه.`,
          example: R`<style>
  .plans tr:nth-child(even) { background: #f5f5f4; }
  .plans td:first-child { font-weight: 700; }
  .plans tr:last-child { color: #b45309; }
  .top li:nth-child(-n+3) { background: #fef3c7; }
  .card p:first-of-type { margin-top: 0; }
  .badge:empty { display: none; }
</style>
<table class="plans"><tr><td>مجاني</td><td>٠</td></tr><tr><td>طالب</td><td>٩٠</td></tr><tr><td>عيلة</td><td>٢٠٠</td></tr></table>
<ol class="top"><li>سارة</li><li>عمر</li><li>ليلى</li><li>كريم</li></ol>
<div class="card"><h3>الباقة</h3><p>كل المواد</p><span class="badge"></span></div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`كل صف **زوجي** (التاني والرابع…) في الجدول خلفيته رمادي فاتح: ده الـ zebra اللي بيخلّي العين متتوهش بين الصفوف.`,
            R`أول خانة في كل صف (اسم الباقة) تقيلة. [[:first-child]] = العنصر اللي مفيش أخ قبله.`,
            R`آخر صف في الجدول لونه بني: [[:last-child]] = مفيش أخ بعده.`,
            R`أول تلات بنود في قايمة الأوائل خلفيتهم صفرا. [[-n+3]] معادلة بتطلّع 3 و 2 و 1 (قسم ٢).`,
            R`أول [[<p>]] جوه الكارت، حتى لو قبلها [[<h3>]]. ده الفرق بين [[first-of-type]] و [[first-child]].`,
            R`أي [[.badge]] فاضية خالص (من غير كلام ولا عناصر ولا مسافة) بتختفي.`,
            R`قفلة بلوك الـ CSS.`,
            R`جدول تلات صفوف: «طالب» هو الصف الزوجي الوحيد، والصف الأخير «عيلة» بني.`,
            R`قايمة أربع أسامي: أول تلاتة بس اللي خلفيتهم صفرا.`,
            R`كارت فيه عنوان، وبعده فقرة [[margin-top]] بتاعها صفر، وشارة فاضية مش هتبان.`
          ],
          teach: R`## الفكرة في سطرين

كل عنصر ليه مكان بين إخواته (العناصر اللي ليهم نفس الأب): أول واحد، أو التالت، أو الأخير. الـ structural pseudo-classes بتختار بالمكان ده، فمش محتاج تكتب [[class="first"]] و [[class="even"]] بإيدك، ولو بند اتزوّد أو اتشال الترتيب بيتحسب تاني لوحده.

قواعد العد قبل أي حاجة:

- **العد من 1 مش من 0.**
- **العناصر بس اللي بتتعد:** الكلام والمسافات والـ comments مش إخوات.
- **العد بين الإخوات بس:** ابن الأب، مش الأحفاد.

كل الأرقام في الدرس من Chrome 157 (headless، Windows 11) على قايمة فيها 10 بنود، و [[querySelectorAll]] بيطلّع أنهي بنود اتمسكت.

---

## ١. [[:first-child]] و [[:last-child]] و [[:only-child]]

| الـ pseudo-class | بيمسك | على القايمة (10 بنود) |
|---|---|---|
| [[li:first-child]] | العنصر اللي مفيش أي أخ **قبله** | 1 |
| [[li:last-child]] | العنصر اللي مفيش أي أخ **بعده** | 10 |
| [[p:only-child]] | العنصر اللي ملوش إخوات خالص (أول وآخر في نفس الوقت) | في [[<div><p>وحيد</p></div>]]: «وحيد» |

### الفخ: [[p:first-child]] مش «أول p»

[[p:first-child]] معناها: «عنصر هو أول ابن **و** نوعه p». لو أول ابن h3، يبقى مفيش p هي أول ابن:

~~~html الكارت اللي اتقاس عليه
<div id="mix"><h3>h</h3><p>p1</p><p>p2</p><span>s1</span><p>p3</p><span>s2</span><img alt=""></div>
~~~

~~~text القياس من Chrome
#mix p:first-child     (ولا واحد)   ← أول ابن h3
#mix p:last-child      (ولا واحد)   ← آخر ابن img
#mix :last-child       img
~~~

ده أشهر سبب لـ «القاعدة مش شغالة» (وكان تمرين في درس «selectors»). الحل في قسم ٤: [[p:first-of-type]].

---

## ٢. [[:nth-child()]]: العد بمعادلة

[[:nth-child(An+B)]]: المتصفح بيعوّض عن [[n]] بـ 0 و 1 و 2 و 3… ويمسك كل عنصر رقمه طلع من المعادلة (والأرقام اللي أقل من 1 بتترمي).

| المعادلة | بتطلّع | اتمسك من 10 بنود | الاستخدام |
|---|---|---|---|
| [[:nth-child(3)]] | 3 بس | 3 | عنصر واحد برقمه |
| [[:nth-child(odd)]] | 1، 3، 5… (= [[2n+1]]) | 1،3،5،7،9 | صفوف zebra |
| [[:nth-child(even)]] | 2، 4، 6… (= [[2n]]) | 2،4،6،8،10 | صفوف zebra |
| [[:nth-child(3n)]] | 0، 3، 6، 9 | 3،6،9 | كل تالت واحد |
| [[:nth-child(3n+1)]] | 1، 4، 7، 10 | 1،4،7،10 | أول كل مجموعة من 3 |
| [[:nth-child(-n+3)]] | 3، 2، 1، 0، -1… | 1،2،3 | **أول 3** |
| [[:nth-child(n+8)]] | 8، 9، 10… | 8،9،10 | **من التامن ورايح** |
| [[:nth-child(n+3):nth-child(-n+6)]] | التقاطع | 3،4،5،6 | **من 3 لـ 6** |
| [[:nth-child(-2n+5)]] | 5، 3، 1 | 1،3،5 | الفردي لحد 5 |

إزاي تقرا [[-n+3]]: عوّض n=0 تطلع 3، و n=1 تطلع 2، و n=2 تطلع 1، وبعد كده سالب فيترمي. فالنتيجة «أول تلاتة». وبنفس المنطق [[n+8]] «من 8 لحد الآخر».

~~~live 150 ١٠ بنود بأربع معادلات
<style>
  ol { margin: 4px 0; padding: 0; }
  li { display: inline-block; width: 26px; padding: 4px 0; margin: 2px; text-align: center; background: #f5f5f4; }
  .a li:nth-child(even) { background: #fde68a; }
  .b li:nth-child(3n) { background: #fde68a; }
  .c li:nth-child(-n+3) { background: #fde68a; }
  .d li:nth-child(n+3):nth-child(-n+6) { background: #fde68a; }
</style>
<ol class="a"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>
<ol class="b"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>
<ol class="c"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>
<ol class="d"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>
~~~

**هتشوف إيه:** أربع صفوف أرقام من 1 لـ 10 (من اليمين لأن الصفحة عربي). الأول الزوجي أصفر، والتاني 3 و 6 و 9، والتالت أول تلاتة، والرابع من 3 لـ 6. ([[display: inline-block]] و [[width]] و [[text-align]] هنا عشان الأرقام تبقى مربعات جنب بعض بس: [[display]] من درس «display»، والباقي في وحدات جاية.)

### [[:nth-child(An+B of S)]]: العد بين اللي عليهم شرط بس

من 2023 في كل المتصفحات الأساسية: [[of S]] جوه القوس بتخلّي العد بين الإخوات اللي بيطابقوا S بس. على 10 بنود، [[.x]] على 2 و 4 و 6:

~~~text القياس من Chrome
li:nth-child(2 of .x)      4      ← تاني واحد من اللي عليهم .x
li.x:nth-child(2)          2      ← البند التاني، وبالصدفة عليه .x
li:nth-child(odd of .x)    2، 6   ← الأول والتالت من اللي عليهم .x
~~~

الفرق مهم: [[li.x:nth-child(2)]] بتعد **كل** الإخوات وبعدين تشوف عليه .x ولا لأ. أما [[of .x]] بتعد اللي عليهم .x بس. ده بيحل مشكلة zebra في جدول فيه صفوف مستخبية: [[tr:nth-child(even of :not([hidden]))]] بتعد الصفوف الظاهرة بس.

ووزنها: pseudo-class + وزن S. اتقاس إن [[li:nth-child(2 of .x)]] (0,2,1) غلبت [[.u .x]] (0,2,0) المكتوبة بعدها.

---

## ٣. [[:nth-last-child()]]: نفس العد من الآخر

نفس المعادلات، بس العد بيبدأ من آخر أخ:

~~~text القياس من Chrome
li:nth-last-child(2)       9        ← قبل الأخير
li:nth-last-child(-n+3)    8، 9، 10 ← آخر تلاتة
~~~

استخدام ذكي: [[li:first-child:nth-last-child(4)]] بيمسك أول بند **لو القايمة 4 بنود بالظبط** (هو أول، وهو الرابع من الآخر).

---

## ٤. عيلة [[-of-type]]: العد بين نفس النوع بس

نفس الخمسة، بس العد بين الإخوات اللي **من نفس نوع العنصر** (نفس اسم الـ tag). على [[#mix]] اللي فوق (h3، p، p، span، p، span، img):

| الـ pseudo-class | معناه | اتمسك |
|---|---|---|
| [[p:first-of-type]] | أول p بين إخواته الـ p | p1 |
| [[p:last-of-type]] | آخر p | p3 |
| [[span:last-of-type]] | آخر span | s2 |
| [[p:nth-of-type(2)]] | تاني p | p2 |
| [[p:nth-last-of-type(1)]] | أول p من الآخر | p3 |
| [[*:only-of-type]] | العنصر الوحيد من نوعه بين إخواته | h3 و img |

[[:first-child]] بتسأل «انت أول ابن؟»، و [[:first-of-type]] بتسأل «انت أول واحد من نوعك؟». في كارت أوله عنوان، [[.card p:first-of-type]] هي اللي بتمسك أول فقرة.

~~~live 150 first-child ضد first-of-type
<style>
  .card { border: 1px solid #d6d3d1; padding: 10px; margin-bottom: 8px; }
  .card h3 { margin: 0 0 6px; }
  .one p:first-child { background: #fde68a; }
  .two p:first-of-type { background: #fde68a; }
</style>
<div class="card one"><h3>p:first-child</h3><p>الفقرة الأولى</p><p>التانية</p></div>
<div class="card two"><h3>p:first-of-type</h3><p>الفقرة الأولى</p><p>التانية</p></div>
~~~

**هتشوف إيه:** الكارت الأول مفيش فيه ولا فقرة صفرا (أول ابن عنوان). التاني «الفقرة الأولى» خلفيتها صفرا.

> النوع = اسم الـ tag بس، مش الـ class. [[.note:first-of-type]] معناها «أول عنصر من نوعه، **و** عليه .note»، مش «أول .note». لـ «أول .note» استخدم [[:nth-child(1 of .note)]].

---

## ٥. [[:empty]]: العنصر الفاضي خالص

[[:empty]] بتمسك العنصر اللي مفيهوش **أي** ابن: لا عناصر ولا كلام. الـ comment مش بيتحسب، بس المسافة بتتحسب:

~~~text القياس من Chrome
<div></div>                 :empty  true
<div><!-- c --></div>       :empty  true     ← الـ comment مش ابن
<div> </div>                :empty  false    ← المسافة كلام
<div>⏎</div> (سطر جديد)      :empty  false
~~~

المواصفة الجديدة (Selectors 4) قالت إن المسافات تتجاهل، بس Chrome 157 لسه بيعتبرها كلام (اتقاس فوق). فالقاعدة العملية: [[:empty]] شغالة لما العنصر بيتولّد من كود (JavaScript أو سيرفر) فاضي فعلًا.

~~~live 70 شارة الإشعارات بتختفي لما تبقى فاضية
<style>
  .badge { display: inline-block; padding: 2px 8px; margin: 0 6px; background: #b45309; color: white; border-radius: 999px; }
  .badge:empty { display: none; }
</style>
<p>الرسايل <span class="badge">3</span> التنبيهات <span class="badge"></span> الطلبات <span class="badge">12</span></p>
~~~

**هتشوف إيه:** دايرة بني فيها 3 جنب «الرسايل»، و 12 جنب «الطلبات»، و «التنبيهات» من غير أي شارة (الفاضية اختفت بدل ما تبان نقطة بني صغيرة).

---

## ٦. [[:root]]: أعلى عنصر

في صفحة HTML، [[:root]] هي [[<html>]] (اتقاس: [[document.querySelector(':root') === document.documentElement]] ‏true). الفرق الوحيد الوزن: [[:root]] pseudo-class (0,1,0)، و [[html]] نوع (0,0,1):

~~~text القياس من Chrome
:root { color: rgb(1, 2, 3) }   ثم   html { color: rgb(9, 9, 9) }   →  rgb(1, 2, 3)   ← :root كسبت رغم إنها قبل
~~~

عشان كده المتغيرات بتتكتب على [[:root]] (درس «CSS variables»): أقوى من [[html]] شوية، وبتشتغل كمان في SVG لوحده.

---

## ٧. [[:scope]]: العنصر اللي انت بادئ منه

[[:scope]] معناها بيتغيّر حسب المكان:

| المكان | [[:scope]] هي |
|---|---|
| ملف CSS عادي | زي [[:root]] بالظبط (اتقاس: [[html.matches(':scope')]] ‏true) |
| جوه [[@scope (.card) { }]] | العنصر اللي بدأ الـ scope ([[.card]] نفسه). درس «BEM و CSS Modules» شرح [[@scope]] |
| [[el.querySelectorAll(':scope > p')]] في JavaScript | العنصر [[el]] نفسه اللي انت بادئ منه |

### ليه محتاجها في JavaScript

[[el.querySelectorAll('div p')]] **مش** بتدوّر جوه [[el]] بس. بتدوّر على أي p جوه [[el]] وفي نفس الوقت الـ selector كله بيتطابق على الصفحة كلها، فـ [[el]] نفسه أو جدوده ممكن يبقوا الـ [[div]]:

~~~text القياس من Chrome (el = div فيه 5 p ومفيهوش div)
el.querySelectorAll('div p')          5    ← الـ div هو el نفسه!
el.querySelectorAll(':scope div p')   0    ← دوّر على div جوه el بس
~~~

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[.card p:first-child]] والكارت أوله h3 | مبتمسكش حاجة. استخدم [[:first-of-type]] |
| [[:nth-child(0)]] أو العد من 0 | مفيش عنصر رقمه 0، العد من 1 |
| [[.item:first-of-type]] متوقع «أول .item» | النوع = الـ tag. استخدم [[:nth-child(1 of .item)]] |
| zebra على جدول فيه صفوف [[hidden]] | الألوان بتتلخبط. استخدم [[of :not([hidden])]] |
| [[:empty]] على عنصر فيه مسافة أو سطر جديد | مبتمسكش في Chrome |
| [[nth-child]] على [[tr]] والجدول فيه [[<thead>]] | العد بيبدأ من جديد في كل [[tbody]] (كل tbody أب مختلف) |

---

## الخلاصة

- [[:first-child]] و [[:last-child]] و [[:only-child]]: بالمكان بين كل الإخوات.
- [[:nth-child(An+B)]]: [[even]] و [[odd]] و [[3n]] و [[-n+3]] (أول 3) و [[n+4]] (من الرابع)، و [[of S]] للعد بين اللي عليهم شرط.
- [[-of-type]]: نفس العيلة، بس العد بين نفس الـ tag.
- [[:empty]] فاضي خالص (المسافة بتبوّظها)، و [[:root]] هي html بوزن class، و [[:scope]] نقطة البداية.`,
          try: R`اعمل [[ranks.html]] فيه قايمة أوائل الفصل من 10 أسامي. أول تلاتة خلفيتهم صفرا، والأسامي من التامن لآخر القايمة رمادي، وكل اسمين خط بينهم من غير ما يبقى فيه خط تحت آخر واحد. وبعدين امسح اسم من النص وشوف إن الألوان اتحسبت تاني لوحدها.`,
          sol: R`~~~live 330 ranks.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>أوائل الفصل</title>
<style>
  body { padding: 12px; }
  .ranks { padding: 0 24px; }
  .ranks li { padding: 4px 8px; }
  .ranks li:nth-child(-n+3) { background: #fef3c7; font-weight: 700; }
  .ranks li:nth-child(n+8) { color: #78716c; }
  .ranks li:not(:last-child) { border-bottom: 1px solid #e7e5e4; }
</style>
</head>
<body>
<h2>أوائل الفصل</h2>
<ol class="ranks">
  <li>سارة</li><li>عمر</li><li>ليلى</li><li>كريم</li><li>منى</li>
  <li>يوسف</li><li>هالة</li><li>زياد</li><li>نور</li><li>أدهم</li>
</ol>
</body>
</html>
~~~

**هتشوف إيه:** عشر أسامي مرقّمة. سارة وعمر وليلى خلفيتهم صفرا وتقيلة، وزياد ونور وأدهم رمادي، وبين كل اسمين خط رفيع، ومفيش خط تحت أدهم.

**ليه كده:** [[-n+3]] = أول تلاتة، و [[n+8]] = من التامن للآخر. و [[:not(:last-child)]] = كل بند ما عدا الأخير ([[:not()]] بالتفصيل في الدرس الجاي). ولو مسحت «عمر» من النص، «كريم» هيبقى التالت وياخد الأصفر لوحده.

~~~text القياس من Chrome
li:nth-child(-n+3)   3 بنود: background-color rgb(254, 243, 199)
li:nth-child(n+8)    3 بنود: color rgb(120, 113, 108)
~~~`,
          deep: {
            why: R`أي قايمة أو جدول أو شبكة كروت بيجي من قاعدة بيانات عدده بيتغيّر. لو كتبت [[class="first"]] أو [[class="even"]] بإيدك، أول ما بند يتزوّد أو يتشال الشكل يبوظ. الـ structural pseudo-classes بتحسب المكان وقت العرض، فـ zebra و «أول تلاتة» و «من غير خط في الآخر» بيفضلوا صح لوحدهم.`,
            how: R`المتصفح بيعرف ترتيب كل عنصر بين إخواته من شجرة الـ DOM: بيعد العناصر بس (مش الكلام ولا الـ comments) من 1. [[:nth-child(An+B)]] بتمسك العنصر لو فيه n من 0 لفوق تخلّي A×n+B تساوي رقمه. [[-of-type]] بتعمل نفس العد بس بين اللي ليهم نفس اسم الـ tag، و [[of S]] بين اللي بيطابقوا S. ولأن الترتيب بيتحسب وقت العرض، لو JavaScript زوّد عنصر في الأول، كل اللي بعده بيتحسبوا تاني.

الوزن: كلهم pseudo-classes (0,1,0)، و [[:nth-child(... of S)]] بيزوّد عليها وزن S. و [[:root]] (0,1,0) أقوى من [[html]] (0,0,1).`,
            when: R`[[even]]/[[odd]] لصفوف الجداول والقوايم الطويلة. [[:first-child]] و [[:last-child]] لشيل المسافة أو الخط من الأطراف (وأحسن منهم أحيانًا [[li + li]] من الدرس اللي فات). [[-n+3]] لـ «أول كذا». [[:first-of-type]] لما يكون فيه عناصر تانية قبل اللي عايزه (عنوان قبل الفقرات). [[:empty]] لحاجة بتتولّد فاضية من الكود. [[:root]] للمتغيرات. [[:scope]] في [[querySelectorAll]] و [[@scope]].`,
            mistakes: R`[[p:first-child]] والأب أوله عنصر تاني. العد من 0. [[.class:first-of-type]] متوقع «أول class». zebra بتتلخبط مع صفوف مستخبية من غير [[of]]. [[:empty]] على عنصر فيه مسافة. و [[el.querySelectorAll('div p')]] بتمسك حاجات بسبب [[el]] نفسه.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** جدول أسعار الدروس طويل والعين بتتوه. خلّي الصفوف **الزوجية** خلفيتها [[#f5f5f4]] والفردية تفضل شفافة، من غير ما تزوّد class على أي صف. (من قسم ٢ في الشرح)`, done: R`صف أيوه وصف لأ رمادي، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  table { border-collapse: collapse; }
  td { padding: 6px 14px; }
</style>
<table class="prices">
  <tr><td>رياضيات</td><td>١٥٠</td></tr>
  <tr><td>فيزيا</td><td>١٥٠</td></tr>
  <tr><td>كيميا</td><td>١٤٠</td></tr>
  <tr><td>إنجليزي</td><td>١٢٠</td></tr>
  <tr><td>عربي</td><td>١٠٠</td></tr>
</table>`, checks: [
              { say: R`الصف التاني والرابع رمادي`, q: ".prices tr:nth-child(even)", style: ["background-color", "rgb(245, 245, 244)"] },
              { say: R`الصفوف الفردية لسه شفافة`, q: ".prices tr:nth-child(odd)", style: ["background-color", "rgba(0, 0, 0, 0)"] },
              { say: R`مفيش class على الصفوف`, q: "tr[class]", n: 0 }
            ] }, sol: R`~~~live 200 الحل
<style>
  table { border-collapse: collapse; }
  td { padding: 6px 14px; }
  .prices tr:nth-child(even) { background: #f5f5f4; }
</style>
<table class="prices">
  <tr><td>رياضيات</td><td>١٥٠</td></tr>
  <tr><td>فيزيا</td><td>١٥٠</td></tr>
  <tr><td>كيميا</td><td>١٤٠</td></tr>
  <tr><td>إنجليزي</td><td>١٢٠</td></tr>
  <tr><td>عربي</td><td>١٠٠</td></tr>
</table>
~~~

**هتشوف إيه:** خمس صفوف، و «فيزيا» و «إنجليزي» خلفيتهم رمادي فاتح، والباقي أبيض.

**ليه كده:** [[even]] = 2 و 4 و 6… والمتصفح بيعد الصفوف جوه الـ [[<tbody>]] اللي بيعمله لوحده حوالين الصفوف (اتقاس: أول ابن للـ table [[TBODY]]). ([[border-collapse]] بتلزق حدود الخانات في بعض، من درس «table».)

**الغلطة الشائعة:** [[td:nth-child(even)]]: بتلوّن **العمود** التاني مش الصفوف، لأنها بتعد الخانات جوه كل صف.

~~~text القياس من Chrome
tr 2 و 4   background-color: rgb(245, 245, 244)
tr 1 و 3 و 5   background-color: rgba(0, 0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المفروض أول فقرة في كل كارت مدرّس تبقى تقيلة ([[font-weight: 700]])، بس مفيش ولا فقرة اتقّلت. صلّح الـ selector بس. (من قسم ١: «الفخ» وقسم ٤)`, done: R`أول فقرة في الكارتين تقيلة والتانية عادية، وكل الشروط ✓.`, work: { h: 220, start: R`<style>
  .teacher { border: 1px solid #d6d3d1; padding: 10px; margin-bottom: 8px; }
  .teacher h3 { margin: 0; }
  .teacher p:first-child { font-weight: 700; }
</style>
<div class="teacher"><h3>أ. منى</h3><p class="lead">رياضيات تانية ثانوي</p><p class="more">١٢ سنة خبرة</p></div>
<div class="teacher"><h3>أ. كريم</h3><p class="lead">فيزيا</p><p class="more">٨ سنين خبرة</p></div>`, checks: [
              { say: R`أول فقرة في كل كارت تقيلة`, q: ".teacher .lead", style: ["font-weight", "700"] },
              { say: R`الفقرة التانية لسه عادية`, q: ".teacher .more", style: ["font-weight", "400"] }
            ] }, sol: R`~~~live 220 بعد التصليح
<style>
  .teacher { border: 1px solid #d6d3d1; padding: 10px; margin-bottom: 8px; }
  .teacher h3 { margin: 0; }
  .teacher p:first-of-type { font-weight: 700; }
</style>
<div class="teacher"><h3>أ. منى</h3><p class="lead">رياضيات تانية ثانوي</p><p class="more">١٢ سنة خبرة</p></div>
<div class="teacher"><h3>أ. كريم</h3><p class="lead">فيزيا</p><p class="more">٨ سنين خبرة</p></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 220 قبل
<style>
  .teacher { border: 1px solid #d6d3d1; padding: 10px; margin-bottom: 8px; }
  .teacher h3 { margin: 0; }
  .teacher p:first-child { font-weight: 700; }
</style>
<div class="teacher"><h3>أ. منى</h3><p class="lead">رياضيات تانية ثانوي</p><p class="more">١٢ سنة خبرة</p></div>
<div class="teacher"><h3>أ. كريم</h3><p class="lead">فيزيا</p><p class="more">٨ سنين خبرة</p></div>
~~~

**هتشوف إيه:** في الحل «رياضيات تانية ثانوي» و «فيزيا» تقال، وسطر الخبرة عادي. في «قبل» الفقرات كلها عادية.

**ليه:** أول ابن في الكارت [[<h3>]]، فـ [[p:first-child]] (p **و** أول ابن) مبتطابقش حاجة. [[p:first-of-type]] بتسأل «أول p؟» فبتمسك الصح. وفيه حل تاني: [[h3 + p]].

~~~text القياس من Chrome
.lead  font-weight: 700      .more  font-weight: 400
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** لوحة أوائل المسابقة: أول **تلاتة** بس خلفيتهم [[#fef3c7]]، من غير ما تكتب [[nth-child(1)]] و [[(2)]] و [[(3)]] كل واحدة لوحدها. (من قسم ٢: [[-n+3]])`, done: R`أول تلات أسامي صفرا والباقي أبيض، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  .board li { padding: 4px 8px; }
</style>
<ol class="board">
  <li>سارة: ٩٨</li><li>عمر: ٩٥</li><li>ليلى: ٩٣</li><li>كريم: ٩٠</li><li>منى: ٨٧</li><li>يوسف: ٨٥</li>
</ol>`, checks: [
              { say: R`أول تلاتة صفرا`, q: ".board li:nth-child(-n+3)", style: ["background-color", "rgb(254, 243, 199)"] },
              { say: R`من الرابع لآخر القايمة شفاف`, q: ".board li:nth-child(n+4)", style: ["background-color", "rgba(0, 0, 0, 0)"] },
              { say: R`قاعدة واحدة بمعادلة، مش [[nth-child(2)]]`, nosrc: "nth-child(2)" }
            ] }, sol: R`~~~live 200 الحل
<style>
  .board li { padding: 4px 8px; }
  .board li:nth-child(-n+3) { background: #fef3c7; }
</style>
<ol class="board">
  <li>سارة: ٩٨</li><li>عمر: ٩٥</li><li>ليلى: ٩٣</li><li>كريم: ٩٠</li><li>منى: ٨٧</li><li>يوسف: ٨٥</li>
</ol>
~~~

**هتشوف إيه:** سارة وعمر وليلى خلفيتهم صفرا فاتحة، وكريم ومنى ويوسف أبيض.

**ليه كده:** n = 0 و 1 و 2 بيطلّعوا 3 و 2 و 1، وبعدها الأرقام سالبة فبتترمي. **الغلطة الشائعة:** [[n+3]]: دي «من التالت للآخر»، عكس المطلوب.

~~~text القياس من Chrome
li 1..3   background-color: rgb(254, 243, 199)
li 4..6   background-color: rgba(0, 0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** قايمة دورات، والدورات المتاحة عليها [[class="open"]]. المطلوب: **تاني دورة متاحة** بس تاخد لون بني [[#b45309]] (عشان عليها خصم)، مهما كان مكانها في القايمة. (من قسم ٢: [[of S]])`, done: R`«إنجليزي» بس بني، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .courses li { padding: 3px 0; }
</style>
<ul class="courses">
  <li>رياضيات (مقفولة)</li>
  <li class="open">عربي</li>
  <li>فيزيا (مقفولة)</li>
  <li class="open">إنجليزي</li>
  <li class="open">كيميا</li>
</ul>`, checks: [
              { say: R`«إنجليزي» بني`, q: ".courses li", has: "إنجليزي", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`«عربي» لسه أسود`, q: ".courses li", has: "عربي", style: ["color", "rgb(0, 0, 0)"] },
              { say: R`«فيزيا» (العنصر التاني فعلًا) لسه أسود`, q: ".courses li", has: "فيزيا", style: ["color", "rgb(0, 0, 0)"] }
            ] }, sol: R`~~~live 190 الحل
<style>
  .courses li { padding: 3px 0; }
  .courses li:nth-child(2 of .open) { color: #b45309; }
</style>
<ul class="courses">
  <li>رياضيات (مقفولة)</li>
  <li class="open">عربي</li>
  <li>فيزيا (مقفولة)</li>
  <li class="open">إنجليزي</li>
  <li class="open">كيميا</li>
</ul>
~~~

**هتشوف إيه:** خمس دورات، و «إنجليزي» بس لونها بني.

**ليه كده:** [[of .open]] بتعد الدورات المتاحة بس: عربي الأولى، وإنجليزي التانية. **الغلطة الشائعة:** [[li.open:nth-child(2)]]: بتعد كل البنود، فبتمسك البند التاني «عربي» (عليه .open بالصدفة). ولو القايمة اتغيّرت كانت هتمسك حاجة غلط.

~~~text القياس من Chrome
إنجليزي  color: rgb(180, 83, 9)     عربي و فيزيا  color: rgb(0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شارات عدد الرسايل بتيجي من السيرفر، ولما مفيش رسايل بتيجي **فاضية** وبتبان نقطة بني صغيرة شكلها غلط. خبّي الشارة الفاضية بس. (من قسم ٥: [[:empty]])`, done: R`الشارة الفاضية مش باينة والتانيين باينين، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .badge { display: inline-block; padding: 2px 8px; margin: 0 6px; background: #b45309; color: white; border-radius: 999px; }
</style>
<p>منى <span class="badge">3</span> عمر <span class="badge" id="zero"></span> ليلى <span class="badge">1</span></p>`, checks: [
              { say: R`الشارة الفاضية اختفت ([[display: none]])`, q: "#zero", style: ["display", "none"] },
              { say: R`الشارات اللي فيها رقم لسه باينة`, q: ".badge:not(#zero)", style: ["display", "inline-block"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .badge { display: inline-block; padding: 2px 8px; margin: 0 6px; background: #b45309; color: white; border-radius: 999px; }
  .badge:empty { display: none; }
</style>
<p>منى <span class="badge">3</span> عمر <span class="badge" id="zero"></span> ليلى <span class="badge">1</span></p>
~~~

**هتشوف إيه:** دايرة بني فيها 3 جنب منى، و 1 جنب ليلى، وعمر من غير ولا حاجة.

**ليه كده:** [[:empty]] بتمسك العنصر اللي مفيهوش أي ابن. **الغلطة الشائعة:** السيرفر يطلّع [[<span class="badge"> </span>]] بمسافة: Chrome بيعتبرها كلام، فالشارة مش هتختفي. خلّي الكود يطلّعها فاضية خالص.

~~~text القياس من Chrome
#zero   display: none        باقي الشارات   display: inline-block
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قايمة 10 بنود. أنهي أرقام هتتمسك بـ [[li:nth-child(3n+1)]]؟ وبـ [[li:nth-last-child(-n+2)]]؟ اكتب الأرقام، وبعدين افتح الحل. (من قسم ٢ وقسم ٣)`, done: R`كتبت 1 و 4 و 7 و 10، و 9 و 10.`, sol: R`~~~live 90 الصفحة
<style>
  li { display: inline-block; width: 26px; padding: 4px 0; margin: 2px; text-align: center; background: #f5f5f4; }
  .a li:nth-child(3n+1) { background: #fde68a; }
  .b li:nth-last-child(-n+2) { background: #fde68a; }
</style>
<ol class="a"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>
<ol class="b"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>
~~~

**الإجابة:** [[3n+1]] ‏→ 1 و 4 و 7 و 10 (n = 0 و 1 و 2 و 3). و [[nth-last-child(-n+2)]] ‏→ آخر اتنين: 9 و 10.

**هتشوف إيه:** في الصف الأول أربع مربعات صفرا (1 و 4 و 7 و 10)، وفي التاني آخر اتنين بس.

~~~text القياس من Chrome
li:nth-child(3n+1)          1,4,7,10
li:nth-last-child(-n+2)     9,10
~~~` }
          ]
        },
        {
          cmd: ":is و :where و :not",
          title: "تجمع selectors جوه قوس واحد وتتحكم في وزنها، وتستثني اللي مش عايزه",
          pre: ["css/specificity", "css/[attr] و combinators"],
          ref: [
            { t: "MDN: :is()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is" },
            { t: "MDN: :where()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where" },
            { t: "MDN: :not()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not" },
            { t: "MDN: Selector list (forgiving)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Selector_list" },
            { t: "Selectors Level 4: logical combinations", url: "https://www.w3.org/TR/selectors-4/#logical-combination" }
          ],
          desc: R`[[:is()]] و [[:where()]] بياخدوا لستة selectors وبيطابقوا أي عنصر بيطابق واحد منهم، فبيختصروا [[article h2, article h3, aside h2, aside h3]] لـ [[:is(article, aside) :is(h2, h3)]]. الفرق بينهم في الوزن بس: [[:is()]] وزنها وزن **أتقل** حاجة جواها، و [[:where()]] وزنها **صفر** دايمًا.
و [[:not()]] العكس: بتمسك العنصر اللي **مش** بيطابق اللي جواها، وبتقبل لستة ([[:not(.a, .b)]]). ووزنها برضه وزن أتقل حاجة جواها، حتى لو العنصر معندوش الحاجة دي. و [[:has()]] (الأب اللي جواه حاجة) ليها درس لوحدها.`,
          example: R`<style>
  :where(.btn) { padding: 6px 14px; border: 0; background: #e7e5e4; }
  .primary { background: #b45309; color: white; }
  article :is(h2, h3) { color: #b45309; }
  .menu a:not(.active) { color: #78716c; }
  .tags li:not(:last-child) { margin-left: 10px; }
</style>
<button class="btn primary">اشترك</button> <button class="btn">بعدين</button>
<article><h2>الباقات</h2><h3>طالب</h3><h4>تفاصيل</h4></article>
<nav class="menu"><a href="#" class="active">الرئيسية</a> <a href="#">الأسعار</a></nav>
<ul class="tags"><li>رياضيات</li><li>فيزيا</li></ul>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`شكل الزرار الأساسي جوه [[:where()]]: وزنه (0,0,0)، فأي class تانية بعده أو قبله بتغلبه من غير مجهود.`,
            R`[[.primary]] (0,1,0) بتغيّر الخلفية بني، وبتكسب [[:where(.btn)]] رغم إن الاتنين على نفس الزرار.`,
            R`أي [[<h2>]] أو [[<h3>]] جوه [[<article>]] بني. سطر واحد بدل [[article h2, article h3]].`,
            R`كل لينك في المنيو **ما عدا** اللي عليه [[.active]] رمادي. ووزنها (0,2,1) لأن [[.active]] اللي جوه [[:not()]] بتتحسب.`,
            R`كل بند في القايمة **ما عدا** الأخير بياخد مسافة على شماله (الصفحة عربي، فالشمال هو «بعد»).`,
            R`قفلة بلوك الـ CSS.`,
            R`زرارين: «اشترك» بني (الـ class غلبت الـ where)، و «بعدين» رمادي (شكل [[:where]] لوحده).`,
            R`مقال فيه عنوانين بني ([[h2]] و [[h3]])، و [[h4]] أسود لأنه مش في اللستة.`,
            R`منيو فيه «الرئيسية» (active) بلون اللينك العادي، و «الأسعار» رمادي.`,
            R`قايمة بندين: «رياضيات» ليه مسافة بعده، و «فيزيا» (الأخير) مالوش.`
          ],
          teach: R`## الفكرة في سطرين

التلاتة pseudo-classes بتاخد **selectors** جوه القوس (مش رقم زي [[:nth-child]]): [[:is()]] و [[:where()]] = «أي واحد من دول»، و [[:not()]] = «مش واحد من دول». ومفتاح الدرس كله: **الوزن**. كل اللي تحت متقاس في Chrome 157 (headless على Windows 11): قاعدتين على نفس العنصر، ومين لونه كسب.

---

## ١. [[:is()]]: «أي واحد من دول»

~~~css
article h2, article h3, aside h2, aside h3 { color: #b45309; }
:is(article, aside) :is(h2, h3) { color: #b45309; }
~~~

السطرين بيمسكوا نفس العناصر بالظبط. كل [[:is()]] بتتقري «عنصر بيطابق أي واحد جوايا»، ولما يبقى فيه اتنين بتضرب الاحتمالات في بعض (2 × 2 = 4 selectors).

### وزن [[:is()]] = وزن أتقل واحد جواها

~~~text القياس من Chrome
:is(#main, .x) p.t1   { color: red }     ← الوزن (1,1,1): الـ #main هو الأتقل
.a .b .c p.t1         { color: blue }    ← (0,4,1) ومكتوبة بعدها
النتيجة: rgb(255, 0, 0) أحمر
~~~

العنصر مكانش جوه [[.x]] حتى، كان جوه [[#main]]. بس الوزن مش بيتحسب حسب «مين طابق»، بيتحسب من **أتقل حاجة مكتوبة** في القوس. فلو حطيت id واحد في [[:is()]]، القاعدة كلها بقت تقيلة.

### [[:is()]] بتسامح الغلط

الدرس اللي فات: selector غلط في لستة عادية بيلغي القاعدة كلها. جوه [[:is()]] و [[:where()]] المتصفح بيتجاهل الغلط بس ويكمّل (اسمها forgiving selector list):

~~~text القياس من Chrome
h1, h2:fake-thing { color: red }          →  h1 أسود  (القاعدة اترمت)
:is(h5, h6:fake-thing) { color: blue }    →  h5 أزرق  (الغلط بس اترمى)
~~~

**بس مبتقبلش pseudo-elements:** [[CSS.supports('selector(:is(::before))')]] رجّعت [[false]]. الـ [[::before]] مش عنصر، فمينفعش يتحط جوه [[:is()]]، وفي اللستة المتسامحة اتجاهلته.

---

## ٢. [[:where()]]: نفس الكلام بوزن صفر

~~~text القياس من Chrome
.wrap p.t2                    { color: red }     ← (0,2,1)
:where(#main .wrap) p.t2      { color: blue }    ← (0,1,1): كل اللي جوه :where اتصفّر
النتيجة: rgb(255, 0, 0) أحمر، رغم إن الأزرق بعده وجواه id
~~~

ده بالظبط اللي محتاجه في **الأساسيات والـ reset والمكتبات**: تكتب شكل افتراضي أي حد يقدر يغيّره بـ class واحدة، من غير ما يحتاج [[!important]] أو selector أطول.

~~~live 70 :where(.btn) والـ class بتغلبها
<style>
  :where(.btn) { padding: 6px 14px; border: 0; border-radius: 6px; background: #e7e5e4; }
  .primary { background: #b45309; color: white; }
</style>
<button class="btn primary">اشترك</button>
<button class="btn">بعدين</button>
~~~

**هتشوف إيه:** زرارين بنفس المقاس والأركان المدورة. «اشترك» بني بكلام أبيض، و «بعدين» رمادي فاتح.

~~~text القياس من Chrome
.btn.primary   background-color: rgb(180, 83, 9)       ← (0,1,0) غلبت (0,0,0)
.btn           background-color: rgb(229, 231, 235)   ← قاعدة :where لوحدها
~~~

(لو كانت [[.btn]] من غير [[:where]] ومكتوبة **بعد** [[.primary]]، الاتنين (0,1,0) والأخيرة تكسب، فـ «اشترك» كان هيرجع رمادي. ده اللي [[:where]] بيمنعه.)

### [[:is()]] ولا [[:where()]]؟

| عايز | استخدم |
|---|---|
| تختصر selectors وتفضل بنفس وزنها العادي | [[:is()]] |
| تكتب شكل أساسي سهل أي حد يغيّره (reset، مكتبة، theme) | [[:where()]] |
| تحط id أو selector تقيل في اللستة | [[:where()]]، عشان الـ id ميتقّلش القاعدة كلها |

ودرس «توقّع الـ cascade» في وحدة الاختبارات فيه ألغاز كتير على الوزن ده.

---

## ٣. [[:not()]]: «مش واحد من دول»

| الشكل | بيمسك |
|---|---|
| [[a:not(.active)]] | كل لينك معندوش [[.active]] |
| [[li:not(:last-child)]] | كل بند ما عدا الأخير |
| [[input:not([type="checkbox"])]] | كل input ما عدا الـ checkbox |
| [[li:not(.a, .b)]] | معندوش [[.a]] **ولا** [[.b]] (لستة، من Selectors 4) |
| [[li:not(#main li)]] | selector مركّب جوه [[:not()]]: كل li مش جوه [[#main]] |

~~~text القياس من Chrome (قايمة: li.a و li.b و li و li.a.b)
.list li:not(.a, .b)   →  li التالت بس (اللي معندوش ولا واحدة)
~~~

### الفخ: وزن [[:not()]]

[[:not()]] وزنها وزن أتقل حاجة جواها، **حتى لو العنصر معندوش الحاجة دي**:

~~~text القياس من Chrome
p:not(#nope).t3     { color: red }    ← (1,1,1)، ومفيش عنصر اسمه #nope أصلًا
.a .b .c p.t3       { color: blue }   ← (0,4,1) ومكتوبة بعدها
النتيجة: rgb(255, 0, 0)
~~~

وده بيعمل مشكلة حقيقية:

~~~live 60 القاعدة اللي بعدها مبتغلبش
<style>
  .menu a:not(.active) { color: #78716c; }
  .menu a { color: #0f766e; }
  .menu a { margin: 0 8px; }
</style>
<nav class="menu"><a href="#" class="active">الرئيسية</a><a href="#">الأسعار</a><a href="#">الأسئلة</a></nav>
~~~

**هتشوف إيه:** «الرئيسية» أخضر غامق، و «الأسعار» و «الأسئلة» رمادي. اللي كتب السطر التاني كان عايز **كل** اللينكات خضرا، بس [[.menu a:not(.active)]] (0,2,1) أتقل من [[.menu a]] (0,1,1)، فـ «مكتوبة بعد» مفرقتش.

الحل لو عايز الاستثناء يبقى سهل يتغيّر: [[.menu a:where(:not(.active))]] وزنها (0,1,1).

### غلطات [[:not()]] المشهورة

- [[:not(p)]] لوحدها بتمسك **كل حاجة** مش p، بما فيهم [[html]] و [[body]]: [[body :not(p)]] أو حدد النوع ([[div:not(.x)]]).
- [[:not(.a):not(.b)]] = [[:not(.a, .b)]]: «مش a **و** مش b». مش «مش الاتنين مع بعض».
- [[p:not(*)]] مبتمسكش أي حاجة أبدًا.

---

## ٤. و [[:has()]]؟

العيلة دي فيها رابع: [[:has()]] بتمسك العنصر **اللي جواه** أو **اللي بعده** حاجة ([[.card:has(img)]]، و [[h2:has(+ p)]]). ووزنها برضه وزن أتقل حاجة جواها. ليها درس كامل: «:has()» في وحدة CSS الحديث، لأنها بتعتمد على حاجات زي [[:checked]] و [[:user-invalid]] (درس «:checked و :invalid» في الوحدة دي).

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| id جوه [[:is()]] في قاعدة عامة | القاعدة كلها بقت (1,…) وصعب أي حاجة تغلبها |
| [[:not(.active)]] في قاعدة، وقاعدة أبسط بعدها | الأبسط بتخسر رغم إنها بعدها |
| reset أو شكل أساسي من غير [[:where()]] | كل class بعد كده محتاجة selector أطول |
| [[:is(::before)]] | pseudo-elements مش مسموحة جوه القوس |
| [[:not(p)]] لوحدها | بتمسك html و body وكل حاجة |

---

## الخلاصة

| | معناها | الوزن | بتسامح الغلط؟ |
|---|---|---|---|
| [[:is(A, B)]] | A أو B | أتقل واحد جواها | أيوه |
| [[:where(A, B)]] | A أو B | صفر دايمًا | أيوه |
| [[:not(A, B)]] | مش A ومش B | أتقل واحد جواها | لأ |
| [[:has(A)]] | جواه أو بعده A | أتقل واحد جواها | لأ |`,
          try: R`في DevTools › Elements اختار لينك من منيو الصفحة اللي في الحل، وقف بالماوس على [[.menu a:not(.active)]] في Styles: هتلاقي الوزن (0,2,1). وبعدين غيّرها لـ [[.menu a:where(:not(.active))]] وشوف الوزن بقى كام، واللينكات بقت لونها إيه.`,
          sol: R`~~~live 60 menu.html
<style>
  .menu a { margin: 0 8px; color: #0f766e; }
  .menu a:where(:not(.active)) { color: #78716c; }
  .menu a { color: #0f766e; }
</style>
<nav class="menu"><a href="#" class="active">الرئيسية</a><a href="#">الأسعار</a><a href="#">الأسئلة</a></nav>
~~~

**هتشوف إيه:** التلات لينكات خضرا غامق.

**ليه:** [[.menu a:where(:not(.active))]] وزنها (0,1,1) زي [[.menu a]] بالظبط، فاللي مكتوبة آخر كسبت. وقبل التغيير الوزن كان (0,2,1) فالرمادي كان بيكسب. DevTools بيكتب الوزن لما تقف على الـ selector.

~~~text القياس من Chrome
قبل:  .menu a:not(.active)           (0,2,1)   →  الأسعار rgb(120, 113, 108)
بعد:  .menu a:where(:not(.active))   (0,1,1)   →  الأسعار rgb(15, 118, 110)
~~~`,
          deep: {
            why: R`الملفات الكبيرة فيها selectors متكررة ([[article h2, article h3, aside h2…]]) وحرب أوزان. [[:is()]] بتختصر التكرار، و [[:where()]] بتحل الحرب من أصلها: تكتب الأساس بوزن صفر، وأي تخصيص بعدين بيكسب بـ class واحدة. و [[:not()]] بتشيل حالة واحدة من غير ما تكتب قاعدة تانية «تلغي» الأولى.`,
            how: R`المتصفح بيطابق [[:is(A, B)]] لو العنصر بيطابق A أو B، وبيحسب الوزن من أتقل selector **مكتوب** في اللستة (مش اللي طابق فعلًا)، عشان الوزن لازم يتعرف قبل المطابقة. [[:where()]] نفس المطابقة والوزن صفر. [[:not(A, B)]] بتطابق لو العنصر مش بيطابق ولا واحد، والوزن زي [[:is()]]. و [[:is()]] و [[:where()]] بيستخدموا «forgiving selector list»: الحتة اللي مش مفهومة بتتشال والباقي يشتغل، أما [[:not()]] و [[:has()]] فلأ. والـ pseudo-elements مش مسموحة جوه أي واحد فيهم.`,
            when: R`[[:is()]] لما تكتب نفس القاعدة لأكتر من selector بأجزاء مشتركة. [[:where()]] في الـ reset والمكتبات والأشكال الأساسية اللي المفروض تتغيّر بسهولة، وحوالين أي selector تقيل مش عايز وزنه. [[:not()]] لـ «كله ما عدا»: آخر بند، والـ active، ونوع input معيّن.`,
            mistakes: R`id جوه [[:is()]]. [[:not()]] بتتقّل القاعدة من غير ما تاخد بالك فالقاعدة اللي بعدها تخسر. [[:not(p)]] من غير نوع قبلها. pseudo-element جوه القوس. وتوقّع إن [[:not()]] بتسامح الغلط زي [[:is()]].`
          },
          practice: [
            { lvl: 'سريع', t: R`**refactor:** القاعدة دي مكتوبة أربع مرات. اختصرها لسطر واحد بـ [[:is()]] من غير ما الشكل يتغيّر: كل [[h2]] و [[h3]] جوه [[.plan]] أو [[.faq]] بني. (من قسم ١ في الشرح)`, done: R`العناوين الأربعة بني، والـ [[h4]] أسود، والكود فيه [[:is(]]، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  .plan h2, .plan h3, .faq h2, .faq h3 { color: #b45309; margin: 4px 0; }
</style>
<section class="plan"><h2>الباقات</h2><h3>طالب</h3></section>
<section class="faq"><h2>أسئلة</h2><h3>بدفع إزاي؟</h3><h4>تفاصيل</h4></section>`, checks: [
              { say: R`كل [[h2]] و [[h3]] في القسمين بني`, q: ".plan h2, .plan h3, .faq h2, .faq h3", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`الـ [[h4]] لسه أسود`, q: "h4", style: ["color", "rgb(0, 0, 0)"] },
              { say: R`الكود فيه [[:is(]]`, src: ":is(" },
              { say: R`الـ selector الطويل اتشال`, nosrc: ".faq h3" }
            ] }, sol: R`~~~live 230 الحل
<style>
  :is(.plan, .faq) :is(h2, h3) { color: #b45309; margin: 4px 0; }
</style>
<section class="plan"><h2>الباقات</h2><h3>طالب</h3></section>
<section class="faq"><h2>أسئلة</h2><h3>بدفع إزاي؟</h3><h4>تفاصيل</h4></section>
~~~

**هتشوف إيه:** أربع عناوين بني («الباقات» و «طالب» و «أسئلة» و «بدفع إزاي؟») و «تفاصيل» أسود صغير.

**ليه كده:** أول [[:is()]] = جوه .plan أو .faq، والتانية = h2 أو h3. 2 × 2 = نفس الأربع selectors. والوزن (0,1,1) زي كل واحد من الأربعة الأصليين، فمفيش حاجة تانية في الملف هتتأثر.

~~~text القياس من Chrome
h2 و h3 (4 عناصر)   color: rgb(180, 83, 9)     h4   color: rgb(0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المصمم عايز كل لينكات المنيو خضرا [[#0f766e]]، وكتب [[.menu a { color: #0f766e; }]] في **آخر** الملف، بس لينكين لسه رمادي. متمسحش القاعدة الرمادي: خلّيها سهلة تتغلب. (من قسم ٣: «الفخ: وزن :not()»)`, done: R`التلات لينكات خضرا، وكل الشروط ✓.`, work: { h: 70, start: R`<style>
  .menu a { margin: 0 8px; }
  .menu a:not(.active) { color: #78716c; }
  .menu a { color: #0f766e; }
</style>
<nav class="menu"><a href="#" class="active">الرئيسية</a><a href="#">الأسعار</a><a href="#">الأسئلة</a></nav>`, checks: [
              { say: R`كل اللينكات خضرا`, q: ".menu a", style: ["color", "rgb(15, 118, 110)"] },
              { say: R`القاعدة الرمادي لسه موجودة`, src: "#78716c" }
            ] }, sol: R`~~~live 60 بعد التصليح
<style>
  .menu a { margin: 0 8px; }
  .menu a:where(:not(.active)) { color: #78716c; }
  .menu a { color: #0f766e; }
</style>
<nav class="menu"><a href="#" class="active">الرئيسية</a><a href="#">الأسعار</a><a href="#">الأسئلة</a></nav>
~~~

وده اللي كان باين قبل التصليح:

~~~live 60 قبل
<style>
  .menu a { margin: 0 8px; }
  .menu a:not(.active) { color: #78716c; }
  .menu a { color: #0f766e; }
</style>
<nav class="menu"><a href="#" class="active">الرئيسية</a><a href="#">الأسعار</a><a href="#">الأسئلة</a></nav>
~~~

**هتشوف إيه:** في الحل التلاتة أخضر غامق. في «قبل» «الرئيسية» بس أخضر والاتنين التانيين رمادي.

**ليه:** [[:not(.active)]] بتزوّد وزن [[.active]] (class) حتى على اللينكات اللي معندهاش. لما لفّيناها في [[:where()]] الوزن رجع (0,1,1)، فالقاعدة الأخيرة كسبت بالترتيب.

~~~text القياس من Chrome
قبل:  الأسعار  color: rgb(120, 113, 108)       بعد:  الأسعار  color: rgb(15, 118, 110)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شكل أساسي لكل الأزرار بـ [[.btn]] (padding [[6px 14px]] وخلفية [[#e7e5e4]] ومن غير border)، بس بوزن **صفر**، عشان [[.danger]] اللي **فوقه** في الملف تغلبه وتخلّي زرار الحذف أحمر [[#b91c1c]]. متغيّرش مكان القواعد. (من قسم ٢ في الشرح)`, done: R`«احذف» أحمر و «إلغاء» رمادي وكلهم نفس الـ padding، وكل الشروط ✓.`, work: { h: 70, start: R`<style>
  .danger { background: #b91c1c; color: white; }
  .btn { padding: 6px 14px; border: 0; background: #e7e5e4; }
</style>
<button class="btn danger">احذف</button> <button class="btn">إلغاء</button>`, checks: [
              { say: R`«احذف» خلفيته حمرا`, q: ".danger", style: ["background-color", "rgb(185, 28, 28)"] },
              { say: R`«إلغاء» خلفيته رمادي`, q: ".btn:not(.danger)", style: ["background-color", "rgb(231, 229, 228)"] },
              { say: R`الاتنين ليهم نفس الـ padding`, q: ".btn", style: ["padding-left", "14px"] },
              { say: R`الشكل الأساسي جوه [[:where(]]`, src: ":where(.btn)" }
            ] }, sol: R`~~~live 60 الحل
<style>
  .danger { background: #b91c1c; color: white; }
  :where(.btn) { padding: 6px 14px; border: 0; background: #e7e5e4; }
</style>
<button class="btn danger">احذف</button> <button class="btn">إلغاء</button>
~~~

**هتشوف إيه:** زرار أحمر بكلام أبيض «احذف»، وجنبه زرار رمادي فاتح «إلغاء»، بنفس الحجم.

**ليه كده:** [[.danger]] (0,1,0) و [[:where(.btn)]] (0,0,0)، فالأحمر بيكسب مهما كان الترتيب. **الغلطة الشائعة:** تنقل [[.danger]] تحت: بتشتغل النهارده، وتبوظ أول ما حد يرتّب الملف.

~~~text القياس من Chrome
.danger   background-color: rgb(185, 28, 28)     .btn   background-color: rgb(231, 229, 228)   padding-left: 14px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** حقول فورم التسجيل كلها ليها حد [[1px solid #a8a29e]]، **ما عدا** الـ checkbox والـ radio. اكتب قاعدة واحدة بـ [[:not()]] فيها لستة. (من قسم ٣: [[:not(.a, .b)]])`, done: R`الحقلين النصيين ليهم حد بني فاتح، والـ checkbox والـ radio شكلهم الافتراضي، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  input { margin: 4px; }
</style>
<input type="text" placeholder="الاسم"> <input type="email" placeholder="الإيميل"><br>
<label><input type="checkbox"> موافق</label> <label><input type="radio" name="p"> شهري</label>`, checks: [
              { say: R`الحقول النصية حدها 1px`, q: 'input[type="text"], input[type="email"]', style: ["border-top-width", "1px"] },
              { say: R`ولونه [[#a8a29e]]`, q: 'input[type="text"], input[type="email"]', style: ["border-top-color", "rgb(168, 162, 158)"] },
              { say: R`الـ checkbox والـ radio محدش لمس حدهم`, q: 'input[type="checkbox"], input[type="radio"]', style: ["border-top-color", "rgb(0, 0, 0)"] },
              { say: R`قاعدة واحدة بـ [[:not(]]`, src: ":not(" }
            ] }, sol: R`~~~live 110 الحل
<style>
  input { margin: 4px; }
  input:not([type="checkbox"], [type="radio"]) { border: 1px solid #a8a29e; padding: 6px; }
</style>
<input type="text" placeholder="الاسم"> <input type="email" placeholder="الإيميل"><br>
<label><input type="checkbox"> موافق</label> <label><input type="radio" name="p"> شهري</label>
~~~

**هتشوف إيه:** خانتين للكتابة بحد بني رمادي رفيع، وتحتهم مربع «موافق» ودايرة «شهري» بشكلهم العادي.

**ليه كده:** [[:not(A, B)]] = مش A ومش B. **الغلطة الشائعة:** [[:not([type="checkbox"]), :not([type="radio"])]] بفاصلة برّه: دي «مش checkbox **أو** مش radio»، وكل حاجة بتطابقها (الـ checkbox مش radio!).

~~~text القياس من Chrome
text و email     border-top: 1px rgb(168, 162, 158)
checkbox و radio border-top-color: rgb(0, 0, 0)  (الافتراضي، ومش بيترسم أصلًا)
~~~` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[:is(#page, .x) p { color: red; }]] وبعدها [[.a .b .c .d p { color: blue; }]]، والفقرة جوه [[.x]] (مش جوه [[#page]]) وكمان جوه الأربعة. لونها إيه؟ وليه؟ وبعدين غيّر [[:is]] لـ [[:where]] وتوقّع تاني. (من قسم ١ و ٢)`, done: R`كتبت أحمر مع [[:is]] وأزرق مع [[:where]]، والسبب.`, sol: R`~~~live 70 الصفحة
<style>
  :is(#page, .x) p { color: red; }
  .a .b .c .d p { color: blue; }
</style>
<div class="a"><div class="b"><div class="c"><div class="d x"><p>لوني إيه؟</p></div></div></div></div>
~~~

**الإجابة:** أحمر. [[:is(#page, .x) p]] وزنها (1,0,1) لأن أتقل حاجة في القوس id، حتى لو العنصر طابق [[.x]] بس. و (1,0,1) أكبر من (0,4,1).

**مع [[:where]]:** الوزن (0,0,1)، فالأزرق (0,4,1) يكسب.

**هتشوف إيه:** كلمة «لوني إيه؟» بالأحمر.

~~~text القياس من Chrome
:is(...)     →  rgb(255, 0, 0)
:where(...)  →  rgb(0, 0, 255)
~~~` }
          ]
        },
        {
          cmd: ":target و :focus-within",
          title: "تختار العنصر من حالته ومكانه: اللي الـ URL بيشاور عليه، واللي جواه focus، ولغته واتجاهه، والمفتوح والمعرّف",
          pre: ["css/:is و :where و :not"],
          ref: [
            { t: "MDN: :target", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target" },
            { t: "MDN: :focus-within", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-within" },
            { t: "MDN: :active", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active" },
            { t: "MDN: :lang()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:lang" },
            { t: "MDN: :dir()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:dir" },
            { t: "MDN: :defined", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:defined" },
            { t: "MDN: :open", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:open" },
            { t: "MDN: :modal", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:modal" },
            { t: "MDN: :popover-open", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:popover-open" },
            { t: "MDN: :fullscreen", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:fullscreen" },
            { t: "MDN: :picture-in-picture", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:picture-in-picture" },
            { t: "MDN: :state()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:state" },
            { t: "MDN: :host", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host" },
            { t: "MDN: ::part()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part" },
            { t: "MDN: ::slotted()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::slotted" },
            { t: "MDN: :active-view-transition", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active-view-transition" },
            { t: "Selectors Level 4: location and user action pseudo-classes", url: "https://www.w3.org/TR/selectors-4/#location" }
          ],
          desc: R`[[:target]] بيمسك العنصر اللي الـ [[#id]] بتاعه في آخر الـ URL (السؤال اللي فتحته من لينك)، و [[:focus-within]] بيمسك العنصر لو هو **أو أي حاجة جواه** عليها focus (الفورم كله ينوّر لما تكتب في خانة منه)، و [[:active]] وقت الضغط.
وفيه حالات تانية من المكان والمعنى: [[:lang(en)]] للكلام الإنجليزي (بيورث اللغة من الأب، عكس [[[lang]]])، و [[:dir(ltr)]] للاتجاه، و [[:defined]] للـ custom element اللي اتعرّف، و [[:open]] و [[:modal]] و [[:popover-open]] للحاجات اللي بتتفتح. والنادر (fullscreen، والـ web components، والـ view transitions) في جدول في الآخر.`,
          example: R`<style>
  .faq section { padding: 6px 10px; }
  .faq section:target { background: #fef3c7; }
  .signup { padding: 10px; border: 2px solid #d6d3d1; }
  .signup:focus-within { border-color: #0f766e; }
  .faq :lang(en) { color: #0f766e; }
  details:open > summary { font-weight: 700; }
</style>
<div class="faq">
  <section id="pay"><h3>بدفع إزاي؟</h3><p>بالكارت أو <span lang="en">InstaPay</span>.</p></section>
  <details open><summary>أقدر ألغي؟</summary>أيوه، في أي وقت.</details>
</div>
<form class="signup"><label>الإيميل <input type="email"></label></form>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`كل سؤال جوه [[.faq]] ليه مسافة جوه، عشان الخلفية لما تظهر متبقاش لازقة في الكلام.`,
            R`السؤال اللي الـ URL بيشاور عليه (مثلًا [[faq.html#pay]]) خلفيته صفرا. لو مفيش [[#]] في الـ URL، ولا سؤال بيتلوّن.`,
            R`شكل صندوق التسجيل العادي: حد رمادي 2px.`,
            R`أول ما الـ focus يدخل **أي** خانة جوه الفورم، حد الفورم كله بيبقى أخضر.`,
            R`أي كلام جوه [[.faq]] لغته إنجليزي (عليه [[lang="en"]] أو جوه أب عليه)، لونه أخضر غامق.`,
            R`عنوان أي [[<details>]] مفتوح تقيل. [[:open]] بتمسك الـ details لما يكون مفتوح.`,
            R`قفلة بلوك الـ CSS.`,
            R`بداية قسم الأسئلة اللي عليه [[.faq]]: القواعد اللي بادئة بـ [[.faq]] بتشتغل جواه بس.`,
            R`سؤال ليه [[id="pay"]] (هيبقى [[:target]] لو الـ URL آخره [[#pay]])، وجواه كلمة إنجليزي [[lang="en"]] هتتلوّن.`,
            R`سؤال تاني بيتفتح ويتقفل بـ [[<details open>]]: مفتوح من الأول فعنوانه تقيل.`,
            R`قفلة قسم الأسئلة، واللي بعدها برّه [[.faq]].`,
            R`فورم فيه خانة إيميل: دوس فيها وشوف حد الفورم بيخضر.`
          ],
          teach: R`## الفكرة في سطرين

الدرس اللي فات كان «العنصر ده بيطابق selector؟». هنا السؤال «العنصر ده **حالته** إيه دلوقتي؟»: الـ URL بيشاور عليه، الـ focus جواه، الزائر بيضغط عليه، لغته إيه، مفتوح ولا مقفول. الحالات دي بتتغيّر وانت شغال، والـ CSS بيتطبق ويتشال لوحده.

كل القياسات من Chrome 157 (headless على Windows 11): صفحة فيها كل حالة، وسكربت بيغيّر الحالة ([[focus()]] و [[showModal()]] و [[location.hash]]) ويقرا [[matches()]] و [[getComputedStyle]] قبل وبعد.

---

## ١. [[:target]]: العنصر اللي الـ URL بيشاور عليه

لما الـ URL آخره [[#price]]، العنصر اللي [[id="price"]] بيبقى [[:target]]. ده اللي بيحصل لما تدوس لينك [[<a href="#price">]] (درس «#id و mailto و tel»):

~~~html faq.html
<style>
  :target { background: #fef3c7; }
</style>
<nav><a href="#faq">الأسئلة</a> <a href="#price">الأسعار</a></nav>
<section id="faq">...</section>
<section id="price">...</section>
~~~

~~~text القياس من Chrome (الملف مفتوح بـ faq.html#price)
:target                  →  section#price      background-color: rgb(254, 243, 199)
location.hash = "#faq"   →  :target بقى #faq، و #price رجع rgba(0, 0, 0, 0)
history.pushState(…, "#price")  →  :target فضل #faq   ← تغيير الـ URL من الكود من غير تنقّل مبيغيّرهوش
~~~

**هتشوف إيه في ملف حقيقي:** تدوس «الأسعار» الصفحة تنزل لقسم الأسعار وخلفيته تبقى صفرا، تدوس «الأسئلة» الأصفر ينتقل.

> المعاينة الحية في الموقع ده مبتغيّرش الـ URL (الصفحة جوه iframe معزول)، فـ [[:target]] لازم تجرّبها في ملف على جهازك. ده التمرين الأخير في الدرس.

استخدامات حقيقية: تنوّر السؤال اللي حد بعتلك لينكه ([[faq.html#refund]])، والهامش اللي اتداس عليه، وتعمل تابات أو modal بسيط من غير JavaScript. وفيه [[::target-text]] للكلام اللي اتعلّم بلينك [[#:~:text=]] (درس «::before و ::after»).

---

## ٢. [[:focus-within]]: الـ focus جوه العنصر

[[:focus]] بيمسك العنصر اللي عليه الـ focus نفسه (الخانة). [[:focus-within]] بيمسك العنصر لو هو **أو أي حفيد ليه** عليه focus، فبيخلّي الأب يتفاعل:

~~~live 120 الصندوق كله بينوّر لما تكتب في أي خانة
<style>
  .signup { padding: 10px; border: 2px solid #d6d3d1; border-radius: 8px; }
  .signup:focus-within { border-color: #0f766e; background: #f0fdfa; }
  .signup label { display: block; margin: 4px 0; }
</style>
<form class="signup">
  <label>الاسم <input></label>
  <label>الإيميل <input type="email"></label>
</form>
~~~

**هتشوف إيه:** صندوق بحد رمادي. دوس في أي خانة، الحد يبقى أخضر والخلفية خضرا فاتحة جدًا. دوس برّه، يرجع رمادي.

~~~text القياس من Chrome
قبل input.focus()   form  border-top-color: rgb(214, 211, 209)   :focus-within false
بعد input.focus()   form  border-top-color: rgb(15, 118, 110)    :focus-within true
~~~

وبيشتغل مع الكيبورد والماوس الاتنين، ومع أي حاجة بتاخد focus (لينك، زرار، [[<summary>]]). ومنيو منسدل بيفضل مفتوح وانت ماشي جواه بـ Tab: [[.menu:focus-within .sub { display: block; }]].

---

## ٣. [[:hover]] و [[:active]] و [[:focus]]، وحالات اللينك

دول ليهم دروس، فهنا الجدول اللي بيربطهم:

| الـ pseudo-class | بيمسك | اتشرح فين |
|---|---|---|
| [[:hover]] | الماوس فوق العنصر (أو فوق حاجة جواه) | «:link و :visited و :hover» |
| [[:active]] | وقت ما الزرار أو اللينك **متداس** (بين ما تضغط وتسيب) | تحت |
| [[:focus]] | العنصر اللي عليه الـ focus | «focus-visible» |
| [[:focus-visible]] | عليه focus والمتصفح شايف إنه لازم يبان (الكيبورد) | «focus-visible» |
| [[:link]] و [[:visited]] | لينك متزارش، ولينك اتزار | «:link و :visited و :hover» |
| [[:any-link]] | أي [[<a>]] أو [[<area>]] ليه [[href]]، اتزار ولا لأ | «:link و :visited و :hover» |

### [[:active]]

[[button:active { background: #78350f; }]]: لون الزرار وانت ضاغط عليه، بيدّي إحساس إن الزرار «اتداس». بيتفعّل كمان بزرار المسافة على زرار عليه focus. وعلى الموبايل Safari محتاج الصفحة يكون فيها أي [[touchstart]] listener عشان يشغّلها (من MDN). ومتعتمدش عليها في حاجة مهمة: بتفضل لحظة.

---

## ٤. [[:lang()]]: لغة الكلام

[[:lang(en)]] بيمسك العنصر لو لغته إنجليزي، واللغة **بتتورث** من أقرب أب عليه [[lang]] (درس «lang و dir»). وده الفرق عن [[[lang|="en"]]] اللي بتبص على الـ attribute على العنصر نفسه بس:

~~~html
<div lang="en"><p id="en">hello</p></div>
~~~

~~~text القياس من Chrome
p:lang(en)        →  بيطابق   (color: rgb(1, 1, 1) من القاعدة)
p[lang|="en"]     →  false    ← الـ p نفسه معندوش lang
p:lang(en) على فقرة عربي   →  مبيطابقش
~~~

[[:lang(en)]] بتمسك كمان [[en-US]] و [[en-GB]]، وبتقبل لستة: [[:lang(en, fr)]]. استخدامها: كلمة إنجليزي جوه صفحة عربي تاخد خط تاني (وحدة الخطوط)، أو علامات تنصيص مختلفة لكل لغة ([[quotes]] في درس «::before و ::after»).

---

## ٥. [[:dir()]]: الاتجاه

[[:dir(rtl)]] و [[:dir(ltr)]] بتمسك العنصر حسب اتجاهه **المحسوب** من الـ HTML ([[dir]] عليه أو على أب، أو [[dir="auto"]] من أول حرف):

~~~text القياس من Chrome
<div dir="ltr"><p>ltr text</p></div>   p:dir(ltr)  →  font-weight: 700
<p>عربي</p> في صفحة rtl                  p:dir(ltr)  →  400 (مبيطابقش)
html:dir(rtl)                           →  true
~~~

الفرق عن [[[dir="rtl"]]]: الـ attribute selector بيبص على العنصر نفسه بس، و [[:dir()]] بيعرف الاتجاه الحقيقي بالوراثة. بس الأحسن غالبًا خصائص منطقية ([[margin-inline-start]]) بتتعكس لوحدها، من غير ما تكتب قاعدة لكل اتجاه.

---

## ٦. [[:defined]]: الـ custom element اتعرّف؟

لما تكتب عنصر من عندك (custom element زي [[<rating-stars>]])، المتصفح بيعرضه كأنه span لحد ما الـ JavaScript يعرّفه بـ [[customElements.define]]. [[:defined]] بتمسك كل العناصر العادية، والـ custom element **بعد** ما يتعرّف:

~~~text القياس من Chrome
my-box:not(:defined) { display: none }
قبل customElements.define("my-box", …)   display: none     :defined false
بعد                                       display: inline   ← ظهر
body:defined                              true              ← العناصر العادية دايمًا defined
~~~

ده بيمنع الـ «وميض»: العنصر يبان فاضي أو مكسور ثانية لحد ما السكربت يحمّل. التفاصيل في كورس JavaScript، درس «Declarative Shadow DOM و :defined».

---

## ٧. الحاجات اللي بتتفتح: [[:open]] و [[:modal]] و [[:popover-open]]

| الـ pseudo-class | بيمسك | الـ attribute القديم | Baseline |
|---|---|---|---|
| [[:open]] | [[<details>]] و [[<dialog>]] مفتوحين، و [[<select>]] و [[<input>]] و قايمتهم مفتوحة | [[details[open]]] و [[dialog[open]]] | جديد (MDN بيقول Baseline محدود)، فـ [[[open]]] لسه الأأمن |
| [[:modal]] | الـ dialog اللي اتفتح بـ [[showModal()]] بس، وعنصر في fullscreen | مفيش | من 2022 |
| [[:popover-open]] | العنصر اللي عليه [[popover]] وهو ظاهر | مفيش (الـ attribute مبيتغيّرش لما يفتح) | من 2024 |

~~~text القياس من Chrome
dialog.show()          :modal false    :open true
dialog.showModal()     :modal true     :open true
details open           :open true      details مقفول  :open false
popover بعد showPopover()   :popover-open true    :open false   ← الـ popover مش من عيلة :open
~~~

الـ dialog والـ popover ليهم دروس: «dialog و closedby» و «popover و popovertarget». واللي ورا الـ modal (الطبقة اللي بتغمّق الصفحة) هي [[::backdrop]] (درس «::before و ::after»).

~~~live 120 السؤال المفتوح عنوانه تقيل وخلفيته صفرا
<style>
  details { padding: 6px 10px; border: 1px solid #e7e5e4; margin-bottom: 6px; }
  details:open { background: #fef3c7; }
  details:open > summary { font-weight: 700; }
</style>
<details open><summary>الاشتراك بيتجدد لوحده؟</summary>أيوه، وبنبعتلك إيميل قبلها بأسبوع.</details>
<details><summary>فيه خصم للطلبة؟</summary>أيوه، ٣٠٪ بكارنيه الجامعة.</details>
~~~

**هتشوف إيه:** سؤالين. الأول مفتوح، خلفيته صفرا وعنوانه تقيل. دوس على التاني: يفتح وياخد نفس الشكل.

---

## ٨. الحالات النادرة في جدول

| العنصر | بيمسك | ملاحظة |
|---|---|---|
| [[:fullscreen]] | العنصر اللي واخد الشاشة كلها بـ [[requestFullscreen()]] (فيديو أو لعبة) | Chrome 157 بيفهمه ([[CSS.supports]] ‏true)، بس الـ fullscreen محتاج ضغطة من المستخدم فمتقاسش هنا. Safari على الآيفون بيدعمه بشكل جزئي (MDN)، فمش Baseline |
| [[:picture-in-picture]] | الفيديو اللي في الشباك الصغير العايم | مدعوم في Chrome، مش Baseline (MDN). استخدمه عشان تخبي الفيديو الكبير وتكتب «بيتعرض في الشباك الصغير» |
| [[:state(on)]] | custom element ضاف لنفسه حالة بـ [[this.attachInternals().states.add("on")]] | اتقاس: اللون اتغيّر بعد [[states.add]]. كورس JavaScript |
| [[:host]] | الـ custom element نفسه، من **جوه** الـ CSS بتاع الـ shadow DOM بتاعه | اتقاس: [[:host { display: block }]] اتطبقت على العنصر |
| [[:host(.big)]] | الـ host لو عليه [[.big]] | كورس JavaScript، درس «shadow DOM» |
| [[:host-context(.dark)]] | الـ host لو جوه أب عليه [[.dark]] | Firefox وSafari مبيدعموهوش (مش Baseline)، فاستخدم CSS variables بدله |
| [[::part(title)]] | حتة جوه الـ shadow DOM عليها [[part="title"]]، من **برّه** | اتقاس: [[x-card::part(title)]] لوّنت الـ h3 اللي جوه، و [[querySelectorAll('h3')]] من برّه رجّعت 0 |
| [[::slotted(p)]] | العناصر اللي اتحطت في [[<slot>]]، من جوه الـ shadow DOM | كورس JavaScript، درس «shadow DOM» |
| [[:first]] | الصفحة الأولى وقت الطباعة، جوه [[@page :first { margin-top: 3cm; }]] (مش selector عادي على عناصر) | درس «@media print» |
| [[:active-view-transition]] | الـ [[html]] وقت ما فيه view transition شغالة | درس «View Transitions» |
| [[:active-view-transition-type(slide)]] | نفس اللي فوق لو الـ transition من نوع معيّن | درس «View Transitions» |

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| تجرّب [[:target]] بـ [[history.pushState]] | مبيتغيّرش. لازم تنقّل حقيقي أو [[location.hash]] |
| [[:focus]] على الفورم عشان «ينوّر» | الفورم نفسه مبياخدش focus. ده [[:focus-within]] |
| [[[lang="en"]]] على كلام جوه أب إنجليزي | مبيمسكش، لأنه بيبص على العنصر نفسه. [[:lang(en)]] بتورث |
| [[:open]] على popover | مبتمسكش، لأن الـ popover ليه حالة لوحده. ده [[:popover-open]] |
| [[:open]] من غير بديل | المتصفحات القديمة مبتفهمهاش. [[details[open]]] شغالة في كل حتة |
| [[:host-context()]] | مش شغالة في Firefox و Safari |

---

## الخلاصة

- [[:target]] = الـ [[#id]] اللي في الـ URL. [[:focus-within]] = الـ focus جوايا. [[:active]] = متداس دلوقتي.
- [[:lang()]] و [[:dir()]] بيعرفوا اللغة والاتجاه بالوراثة، عكس [[[lang]]] و [[[dir]]].
- [[:defined]] للـ custom elements. [[:open]] و [[:modal]] و [[:popover-open]] للي بيتفتح.
- [[:host]] و [[::part()]] و [[::slotted()]] للـ web components (كورس JavaScript)، و [[:active-view-transition]] لدرس «View Transitions».`,
          try: R`اعمل [[faq.html]] فيه منيو بتلات لينكات ([[#pay]] و [[#cancel]] و [[#student]]) وتلات أقسام بنفس الـ ids، وكل قسم طوله كبير ([[padding: 200px 0]]) عشان تشوف الصفحة بتنزل. لوّن القسم اللي هو [[:target]]. افتحه في Chrome، ودوس على اللينكات، وبعدين اكتب في الـ URL [[faq.html#student]] واضغط Enter.`,
          sol: R`~~~html faq.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>أسئلة</title>
<style>
  section { padding: 200px 10px; border-top: 1px solid #e7e5e4; }
  section:target { background: #fef3c7; }
</style>
</head>
<body>
<nav><a href="#pay">الدفع</a> <a href="#cancel">الإلغاء</a> <a href="#student">خصم الطلبة</a></nav>
<section id="pay"><h2>بدفع إزاي؟</h2></section>
<section id="cancel"><h2>أقدر ألغي؟</h2></section>
<section id="student"><h2>فيه خصم للطلبة؟</h2></section>
</body>
</html>
~~~

**هتشوف إيه:** تدوس «الإلغاء»: الصفحة بتنزل لحد سؤال الإلغاء، وخلفيته صفرا. تدوس «الدفع»: الأصفر بيتنقل. ولما تكتب [[#student]] في الـ URL، آخر سؤال بيتلوّن.

~~~text القياس من Chrome (الملف مفتوح بـ faq.html#student)
document.querySelector(":target").id    →  "student"
section#student  background-color: rgb(254, 243, 199)
~~~

(الحل مكتوب كود بس من غير معاينة حية، لأن المعاينة جوه الموقع مبتغيّرش الـ URL.)`,
          deep: {
            why: R`الزائر محتاج يعرف هو فين: أنهي سؤال اتفتح من اللينك اللي اتبعتله، وأنهي خانة بيكتب فيها، والزرار اتداس ولا لأ. الحالات دي بتيجي من المتصفح نفسه، فالـ CSS بيتابعها من غير ولا سطر JavaScript. و [[:lang()]] و [[:dir()]] بيخلّوا صفحة عربي فيها إنجليزي (أو العكس) تتنسّق صح من المعنى اللي في الـ HTML.`,
            how: R`المتصفح بيحدّث الحالات دي وهو شغال: [[:target]] بيتغيّر مع كل تنقّل للـ fragment (لينك أو [[location.hash]] أو زرار الرجوع)، بس مش مع [[history.pushState]]. [[:focus-within]] بيبص على العنصر اللي عليه focus وكل جدوده (حتى من جوه shadow DOM). [[:lang()]] بيدوّر على أقرب [[lang]] للعنصر لفوق (وممكن من [[<meta http-equiv="content-language">]])، و [[:dir()]] بيستخدم الاتجاه اللي المتصفح حسبه من [[dir]]. [[:defined]] بيتغيّر لحظة [[customElements.define]]. و [[:open]] و [[:modal]] و [[:popover-open]] بيتغيّروا مع [[open]] و [[showModal()]] و [[showPopover()]]. كلهم pseudo-classes وزنها (0,1,0).`,
            when: R`[[:target]] لصفحات الأسئلة والمراجع والهوامش وتابات بسيطة. [[:focus-within]] للفورم والكروت والمنيو المنسدل. [[:active]] لإحساس الضغط. [[:lang()]] للكلام اللي بلغة تانية. [[:dir()]] نادرًا (الخصائص المنطقية أحسن). [[:defined]] مع أي custom element. [[:open]] و [[:modal]] و [[:popover-open]] لتنسيق الحاجة المفتوحة بدل ما تعمل class بالـ JavaScript.`,
            mistakes: R`تجرّب [[:target]] في معاينة جوه iframe أو بـ [[pushState]]. [[:focus]] على الأب. [[[lang]]] بدل [[:lang()]]. [[:open]] على popover. الاعتماد على [[:open]] أو [[:host-context()]] من غير بديل للمتصفحات اللي مبتدعمهمش.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صفحة الأسئلة عربي وفيها أسامي طرق دفع بالإنجليزي، كل اسم جوه [[<span lang="en">]] أو جوه فقرة كلها [[lang="en"]]. لوّن **كل** الكلام الإنجليزي أخضر [[#0f766e]] بقاعدة واحدة، والكلام العربي يفضل أسود. (من قسم ٤: [[:lang()]])`, done: R`InstaPay و Visa والفقرة الإنجليزي أخضر، والعربي أسود، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  p { margin: 6px 0; color: #1c1917; }
</style>
<p id="ar">ادفع بـ <span lang="en">InstaPay</span> أو <span lang="en">Visa</span>.</p>
<div lang="en"><p id="en">Questions? Write to us.</p></div>`, checks: [
              { say: R`الكلمات اللي عليها [[lang="en"]] خضرا`, q: 'span[lang="en"]', style: ["color", "rgb(15, 118, 110)"] },
              { say: R`الفقرة اللي جوه [[div lang="en"]] خضرا كمان`, q: "#en", style: ["color", "rgb(15, 118, 110)"] },
              { say: R`الفقرة العربي لسه لونها الغامق [[#1c1917]]`, q: "#ar", style: ["color", "rgb(28, 25, 23)"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  p { margin: 6px 0; color: #1c1917; }
  :lang(en) { color: #0f766e; }
</style>
<p id="ar">ادفع بـ <span lang="en">InstaPay</span> أو <span lang="en">Visa</span>.</p>
<div lang="en"><p id="en">Questions? Write to us.</p></div>
~~~

**هتشوف إيه:** سطر عربي أسود فيه كلمتين خضرا (InstaPay و Visa)، وتحته جملة إنجليزي خضرا كلها. والكلام العربي لونه أسود مايل للبني ([[#1c1917]]).

**ليه كده:** [[:lang(en)]] بتعرف لغة العنصر من أقرب أب عليه [[lang]]، فالـ [[<p>]] اللي جوه [[<div lang="en">]] إنجليزي رغم إنها معندهاش [[lang]]. **الغلطة الشائعة:** [[[lang="en"]]]: هتلوّن الـ spans والـ div، بس الـ p اللي جوه الـ div هتفضل غامقة، لأن قاعدة [[p { color }]] مباشرة عليها وبتغلب أي لون جاي بالوراثة من الـ div (درس «cascade»). [[:lang(en)]] بتمسك الـ p نفسها، ووزنها (0,1,0) أكبر من [[p]].

~~~text القياس من Chrome
span[lang="en"] و #en   color: rgb(15, 118, 110)       #ar   color: rgb(28, 25, 23)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة أسئلة بـ [[<details>]]. السؤال المفتوح خلفيته [[#fef3c7]]، والمقفول يفضل شفاف. السؤال الأول مفتوح في الكود من الأول. (من قسم ٧: [[:open]])`, done: R`السؤال المفتوح أصفر والمقفول شفاف، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  details { padding: 6px 10px; border: 1px solid #e7e5e4; margin-bottom: 6px; }
</style>
<details open id="q1"><summary>الاشتراك بيتجدد لوحده؟</summary>أيوه، وبنبعتلك إيميل قبلها.</details>
<details id="q2"><summary>فيه خصم للطلبة؟</summary>أيوه، ٣٠٪.</details>`, checks: [
              { say: R`السؤال المفتوح أصفر`, q: "#q1", style: ["background-color", "rgb(254, 243, 199)"] },
              { say: R`المقفول لسه شفاف`, q: "#q2", style: ["background-color", "rgba(0, 0, 0, 0)"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  details { padding: 6px 10px; border: 1px solid #e7e5e4; margin-bottom: 6px; }
  details:is(:open, [open]) { background: #fef3c7; }
</style>
<details open id="q1"><summary>الاشتراك بيتجدد لوحده؟</summary>أيوه، وبنبعتلك إيميل قبلها.</details>
<details id="q2"><summary>فيه خصم للطلبة؟</summary>أيوه، ٣٠٪.</details>
~~~

**هتشوف إيه:** السؤال الأول مفتوح بخلفية صفرا، والتاني مقفول أبيض. دوس على التاني يصفر هو كمان.

**ليه كده:** [[:open]] الطريقة الجديدة، و [[[open]]] الـ attribute القديم اللي شغال في كل المتصفحات. [[:is()]] بيجمعهم ومتسامح: المتصفح القديم اللي مبيفهمش [[:open]] بيتجاهلها ويكمّل بـ [[[open]]] (الدرس اللي فات). ولو كتبت [[details:open, details[open]]] بفاصلة عادية، المتصفح القديم كان هيرمي القاعدة كلها.

~~~text القياس من Chrome
#q1  background-color: rgb(254, 243, 199)     #q2  background-color: rgba(0, 0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة فيها [[<price-chart>]] (custom element بيرسمه سكربت لسه متحمّلش)، ولحد ما يتعرّف بيبان كلام خام مكسور. خبّيه **طول ما هو مش متعرّف** بس، من غير ما تخبّي الفقرة اللي جنبه. (من قسم ٦: [[:defined]])`, done: R`الـ [[price-chart]] مش باين والفقرة باينة، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  price-chart { color: #b91c1c; }
</style>
<p>أسعار الباقات خلال السنة:</p>
<price-chart>[data: 90,120,150]</price-chart>`, checks: [
              { say: R`الـ [[price-chart]] اللي مش متعرّف مستخبي`, q: "price-chart", style: ["display", "none"] },
              { say: R`الفقرة لسه باينة`, q: "p", style: ["display", "block"] },
              { say: R`القاعدة بتستخدم [[:defined]]`, src: ":defined" }
            ] }, sol: R`~~~live 80 الحل
<style>
  price-chart { color: #b91c1c; }
  price-chart:not(:defined) { display: none; }
</style>
<p>أسعار الباقات خلال السنة:</p>
<price-chart>[data: 90,120,150]</price-chart>
~~~

**هتشوف إيه:** سطر «أسعار الباقات خلال السنة:» بس، من غير الكلام الأحمر المكسور.

**ليه كده:** مفيش سكربت عرّف [[price-chart]]، فهو [[:not(:defined)]]. أول ما السكربت يعمل [[customElements.define("price-chart", …)]] القاعدة بتبطل تطابق والعنصر بيظهر. **الغلطة الشائعة:** [[price-chart { display: none }]] من غير الشرط: هيفضل مستخبي حتى بعد ما يتعرّف.

~~~text القياس من Chrome
price-chart   display: none   (:defined false)     p   display: block
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت «اشترك في النشرة» حده رمادي [[2px solid #d6d3d1]]، وأول ما الزائر يدوس في الخانة أو على الزرار اللي **جواه** الحد يبقى أخضر [[#0f766e]]. (من قسم ٢: [[:focus-within]]. الشرط التاني بيتأكد من القاعدة في الكود، لأن المربع مش بيدوس بداله: جرّب بنفسك تدوس في الخانة)`, done: R`الحد رمادي، ولما تدوس في الخانة بيخضر، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .news { padding: 10px; }
</style>
<form class="news">
  <label>إيميلك <input type="email"></label>
  <button>اشترك</button>
</form>`, checks: [
              { say: R`الحد العادي رمادي 2px`, q: ".news", style: ["border-top-color", "rgb(214, 211, 209)"] },
              { say: R`تُخنه 2px`, q: ".news", style: ["border-top-width", "2px"] },
              { say: R`فيه قاعدة [[.news:focus-within]]`, src: ".news:focus-within" }
            ] }, sol: R`~~~live 100 الحل
<style>
  .news { padding: 10px; border: 2px solid #d6d3d1; border-radius: 8px; }
  .news:focus-within { border-color: #0f766e; }
</style>
<form class="news">
  <label>إيميلك <input type="email"></label>
  <button>اشترك</button>
</form>
~~~

**هتشوف إيه:** صندوق بحد رمادي فيه خانة وزرار. دوس في الخانة: الحد يخضر. اضغط Tab للزرار: يفضل أخضر. دوس برّه: يرجع رمادي.

**ليه كده:** الـ focus على الخانة أو الزرار، وهما جوه الفورم، فالفورم [[:focus-within]]. **الغلطة الشائعة:** [[.news:focus]]: الفورم نفسه مبياخدش focus فمش هتتطبق أبدًا. أو [[input:focus]]: هتلوّن الخانة بس مش الصندوق.

~~~text القياس من Chrome
قبل الـ focus   border-top-color: rgb(214, 211, 209)
بعد input.focus()   border-top-color: rgb(15, 118, 110)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<div dir="ltr"><p>Price list</p></div>]] في صفحة [[dir="rtl"]]. الـ [[p]] بيطابق [[p:dir(ltr)]]؟ و [[p[dir="ltr"]]]؟ و [[:dir(rtl)]] على الـ [[html]]؟ (من قسم ٥)`, done: R`كتبت أيوه، ولأ، وأيوه.`, sol: R`~~~live 70 الصفحة
<style>
  p:dir(ltr) { font-weight: 700; color: #0f766e; }
</style>
<div dir="ltr"><p>Price list</p></div>
<p>قايمة الأسعار</p>
~~~

**الإجابة:** [[p:dir(ltr)]] أيوه (الاتجاه بيتورث من الـ div). [[p[dir="ltr"]]] لأ (الـ p نفسه معندوش [[dir]]). و [[html:dir(rtl)]] أيوه.

**هتشوف إيه:** «Price list» تقيلة وخضرا ومبتدية من الشمال، و «قايمة الأسعار» عادية من اليمين.

~~~text القياس من Chrome
p:dir(ltr)   font-weight: 700       الفقرة العربي   400       html:dir(rtl)   true
~~~` }
          ]
        },
        {
          cmd: ":checked و :invalid",
          title: "تنسّق الفورم حسب حالته: متعلّم، ومتعطّل، وإجباري، وغلط بعد ما الزائر كتب، وبره الحدود، وفاضي",
          pre: ["css/readonly و disabled و checked", "css/Constraint Validation API", "css/:is و :where و :not"],
          ref: [
            { t: "MDN: :checked", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:checked" },
            { t: "MDN: :indeterminate", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:indeterminate" },
            { t: "MDN: :default", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:default" },
            { t: "MDN: :enabled", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:enabled" },
            { t: "MDN: :disabled", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:disabled" },
            { t: "MDN: :required", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:required" },
            { t: "MDN: :optional", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:optional" },
            { t: "MDN: :valid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:valid" },
            { t: "MDN: :invalid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:invalid" },
            { t: "MDN: :user-valid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-valid" },
            { t: "MDN: :user-invalid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid" },
            { t: "MDN: :in-range", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:in-range" },
            { t: "MDN: :out-of-range", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:out-of-range" },
            { t: "MDN: :read-only", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:read-only" },
            { t: "MDN: :read-write", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:read-write" },
            { t: "MDN: :placeholder-shown", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:placeholder-shown" },
            { t: "MDN: :autofill", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:autofill" },
            { t: "Selectors Level 4: input pseudo-classes", url: "https://www.w3.org/TR/selectors-4/#input-pseudos" }
          ],
          desc: R`الفورم ليه حالات كتير، والمتصفح بيعرفها لوحده من الـ HTML وكلام الزائر، والـ CSS بيمسك كل واحدة بـ pseudo-class: [[:checked]] المتعلّم و [[:indeterminate]] اللي «نص نص»، و [[:default]] الاختيار الافتراضي، و [[:enabled]] و [[:disabled]]، و [[:required]] و [[:optional]]، و [[:read-only]] و [[:read-write]]، و [[:placeholder-shown]] الخانة الفاضية اللي ظاهر فيها الـ placeholder.
وللصح والغلط: [[:valid]] و [[:invalid]] (من أول ما الصفحة تفتح)، و [[:user-valid]] و [[:user-invalid]] (بعد ما الزائر يتعامل مع الخانة أو يدوس إرسال، ودول اللي تستخدمهم)، و [[:in-range]] و [[:out-of-range]] للأرقام والتواريخ، و [[:autofill]] للخانة اللي المتصفح ملاها لوحده.`,
          example: R`<style>
  input { margin: 4px 0; padding: 6px; }
  input:required { border-color: #b45309; }
  input:user-invalid { border-color: #b91c1c; background: #fee2e2; }
  input:out-of-range { background: #fee2e2; }
  input:checked + label { font-weight: 700; color: #0f766e; }
  button:disabled { background: #e7e5e4; color: #78716c; }
</style>
<form>
  <input type="email" required placeholder="الإيميل"><br>
  <input type="number" min="16" max="60" value="70" aria-label="السن"><br>
  <input type="radio" name="plan" id="p1" checked><label for="p1">شهري</label>
  <input type="radio" name="plan" id="p2"><label for="p2">سنوي</label><br>
  <button disabled>اشترك</button>
</form>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`كل الخانات بمسافة جوه وبعد عن بعض شوية.`,
            R`الخانات الإجبارية ([[required]] في الـ HTML) حدها بني من الأول، عشان الزائر يعرف هيملا إيه لازم.`,
            R`الخانة اللي الزائر كتب فيها غلط وساب الخانة (أو داس إرسال) حدها أحمر وخلفيتها حمرا فاتحة. قبل ما يلمسها مفيش أحمر.`,
            R`خانة الرقم اللي قيمتها برّه [[min]] و [[max]] خلفيتها حمرا فاتحة.`,
            R`الـ label اللي **بعد** radio متعلّم على طول ([[+]] من درس «[attr] و combinators») تقيل وأخضر.`,
            R`الزرار المتعطّل رمادي باهت، عشان يبان إنه مش بيشتغل.`,
            R`قفلة بلوك الـ CSS.`,
            R`بداية الفورم اللي فيه الخانات والاختيارات.`,
            R`خانة إيميل إجبارية: حدها بني، وتتحمّر لو كتبت إيميل ناقص وخرجت منها.`,
            R`خانة سن من 16 لـ 60 وقيمتها 70: [[:out-of-range]] من أول ما الصفحة تفتح، فخلفيتها حمرا فاتحة.`,
            R`اختيار «شهري» متعلّم في الكود ([[checked]])، فالـ label بتاعه أخضر تقيل.`,
            R`اختيار «سنوي» مش متعلّم: لو دوست عليه، هو اللي هيبقى أخضر و «شهري» يرجع عادي.`,
            R`زرار متعطّل ([[disabled]]) بلونه الرمادي.`,
            R`قفلة الفورم بعد زرار الإرسال.`
          ],
          teach: R`## الفكرة في سطرين

درس «readonly و disabled و checked» في وحدة الفورم عرّفك على أسامي الحالات دي في جدول. هنا بنشرح كل واحدة: بتمسك إيه **بالظبط** (بالقياس، لأن فيه مفاجآت)، وإمتى تستخدمها، وأهم قاعدة في الدرس: **متلوّنش الغلط قبل ما الزائر يلمس الخانة.**

كل القياسات من Chrome 157 (headless على Windows 11): فورم فيه كل نوع خانة، وسكربت بيكتب أنهي pseudo-classes بتطابق كل خانة بـ [[matches()]].

---

## ١. [[:checked]] و [[:indeterminate]] و [[:default]]

| الـ pseudo-class | بيمسك | اتقاس على |
|---|---|---|
| [[:checked]] | checkbox أو radio متعلّم دلوقتي، و [[<option>]] مختار | [[<input type="checkbox" checked>]] و [[<option selected>]] |
| [[:indeterminate]] | checkbox الـ JavaScript خلّاه [[indeterminate = true]]، أو radio في مجموعة **مفيش** فيها ولا واحد متعلّم، أو [[<progress>]] من غير [[value]] | التلاتة طابقوا |
| [[:default]] | الاختيار الافتراضي: checkbox أو radio عليه [[checked]] في الـ HTML، و [[<option selected>]]، و **أول** زرار submit في الفورم | أول [[<button>]] بس، مش التاني |

[[:checked]] بتتغيّر مع كل ضغطة، و [[:default]] بتفضل على اللي كان متعلّم في الـ HTML حتى لو الزائر غيّر رأيه: بتستخدمها تكتب «(الموصى بيه)» جنب الاختيار الافتراضي.

### أشهر استخدام: [[:checked + label]]

الـ CSS مقدرش يختار الأب (من غير [[:has()]])، بس يقدر يختار **الأخ اللي بعده**. فالـ label يتكتب بعد الـ input:

~~~live 110 اختيار باقة: الـ label بتاع المتعلّم بيتلوّن
<style>
  .plan input { margin: 0 8px 0 4px; }
  .plan label { padding: 4px 10px; border: 1px solid #d6d3d1; border-radius: 6px; }
  .plan input:checked + label { background: #fef3c7; border-color: #b45309; font-weight: 700; }
  .plan input:default + label::after { content: " (الأوفر)"; color: #78716c; }
</style>
<p class="plan">
  <input type="radio" name="plan" id="m"><label for="m">شهري</label>
  <input type="radio" name="plan" id="y" checked><label for="y">سنوي</label>
</p>
~~~

**هتشوف إيه:** اختيارين. «سنوي» خلفيته صفرا وحده بني وتقيل، وجنبه «(الأوفر)» رمادي. دوس على «شهري»: الأصفر بيتنقل له، بس «(الأوفر)» بتفضل جنب «سنوي» لأنه الـ [[:default]]. ([[::after]] و [[content]] الكلمة اللي اتزوّدت، درس «::before و ::after».)

---

## ٢. [[:enabled]] و [[:disabled]]

[[:disabled]] أي خانة أو زرار عليه [[disabled]]، **أو جوه [[<fieldset disabled>]]** (اتقاس: الـ input اللي جوه طابق [[:disabled]] رغم إنه معندوش الكلمة). و [[:enabled]] العكس: العنصر اللي ممكن يبقى disabled ومش disabled. والفقرة والـ div مبيطابقوش الاتنين.

~~~text القياس من Chrome (الشكل الافتراضي للمتعطّل)
input:disabled   color: rgb(84, 84, 84)    background-color: rgba(239, 239, 239, 0.3)
~~~

---

## ٣. [[:required]] و [[:optional]]

[[:required]] خانة عليها [[required]]. و [[:optional]] أي خانة **ممكن** تبقى required ومش (الـ text و checkbox و select و textarea و الأزرار). مفيد عشان تعلّم الإجباري:

~~~css
input:required { border-color: #b45309; }
~~~

والنجمة الحمرا جنب الـ label بتتعمل بـ [[::after]] (درس «::before و ::after»).

---

## ٤. [[:valid]] و [[:invalid]]، وليه متستخدمهمش لوحدهم

[[:invalid]] بتمسك أي خانة قيمتها مخالفة للشروط اللي في الـ HTML ([[required]] وفاضية، أو [[type="email"]] والقيمة مش إيميل، أو برّه [[min]]/[[max]]، أو مش مطابقة [[pattern]]). و [[:valid]] العكس. الشروط دي اتشرحت في درس «Constraint Validation API».

~~~text القياس من Chrome (أول ما الصفحة تفتح، محدش كتب حاجة)
<input required>                         :invalid
<input type="email" value="ahmed@">      :invalid
<input type="email" value="a@b.test">    :valid
<input readonly>  و  <input disabled>    ولا valid ولا invalid   ← مستبعدين من الفحص
<form> فيه خانة invalid                  الفورم نفسه :invalid
<fieldset disabled>                      :valid
~~~

**المشكلة:** [[<input required>]] الفاضية [[:invalid]] من **أول ما الصفحة تفتح**. لو لوّنت [[:invalid]] بالأحمر، الزائر هيفتح الفورم يلاقيه كله أحمر قبل ما يكتب حرف. ده شكل وحش ومخيف.

### الحل: [[:user-invalid]] و [[:user-valid]]

بيطابقوا نفس الحالة، بس **بعد** ما الزائر يتعامل مع الخانة: يكتب فيها ويسيبها، أو يدوس إرسال:

~~~text القياس من Chrome (input required فاضية، والقاعدة input:user-invalid { border-color: #b91c1c })
قبل أي حاجة          :invalid true    :user-invalid false   border-top-color: rgb(118, 118, 118)
بعد form.requestSubmit()                :user-invalid true    border-top-color: rgb(185, 28, 28)
~~~

~~~live 150 الغلط بيظهر بس بعد ما تكتب وتخرج
<style>
  form { padding: 4px; }
  input { padding: 6px; margin: 4px 0; border: 2px solid #d6d3d1; border-radius: 6px; }
  input:user-invalid { border-color: #b91c1c; background: #fee2e2; }
  input:user-valid { border-color: #0f766e; }
</style>
<form>
  <label>الإيميل <input type="email" required></label><br>
  <label>كود الخصم (اختياري) <input pattern="[A-Z]{4}"></label>
</form>
~~~

**هتشوف إيه:** خانتين بحد رمادي، مفيش ولا أحمر. اكتب «ahmed» في الإيميل واضغط Tab: الخانة تحمر. صلّحها لـ [[ahmed@example.test]] واضغط Tab: الحد يخضر. اكتب «abc» في الكود: يحمر لأنه لازم ٤ حروف كبيرة.

Baseline: [[:user-invalid]] و [[:user-valid]] في كل المتصفحات الأساسية من 2023 (MDN). ودرس «:has()» بيوريك إزاي الـ label كمان يحمر: [[.field:has(input:user-invalid) label]].

---

## ٥. [[:in-range]] و [[:out-of-range]]

للخانات اللي ليها [[min]] أو [[max]] (number و range و date و time…):

~~~text القياس من Chrome (min="16" max="60")
value="70"     :out-of-range   :invalid
value="20"     :in-range       :valid
فاضية          :in-range       ← الفاضي مش برّه الحدود
type="text" min="1"   ولا واحدة فيهم   ← الـ text مالوش حدود
~~~

[[:out-of-range]] زي [[:invalid]]: بتطابق من أول ما الصفحة تفتح لو القيمة جاية غلط من السيرفر، فممكن تجمعها مع [[:user-invalid]] لو الخانة فاضية في الأول.

---

## ٦. [[:read-only]] و [[:read-write]]

الدرس اللي في وحدة الفورم قاس الفخ ده: [[:read-only]] معناها «الزائر ميقدرش يكتب فيه»، فبتمسك أي حاجة مش خانة كتابة:

~~~text القياس من Chrome
<input> عادي و <textarea>          :read-write
<div contenteditable>              :read-write   ← حتى لو مش فورم
<input readonly> و <input disabled> :read-only
checkbox و radio و select و button   :read-only
<form> و <progress>                :read-only
~~~

لو عايز اللي عليهم كلمة [[readonly]] بس: [[input[readonly]]]. و [[:read-write]] مفيدة لتنسيق أي حاجة الزائر بيكتب فيها مرة واحدة: [[:read-write:focus { outline: ... }]].

---

## ٧. [[:placeholder-shown]]

بتمسك الخانة **لما الـ placeholder ظاهر**، يعني الخانة فاضية وعليها [[placeholder]]:

~~~text القياس من Chrome
<input placeholder="اكتب اسمك">              :placeholder-shown
<input placeholder="x" value="y">           لأ   ← فيها كلام
<input> من غير placeholder وفاضية           لأ
~~~

ده أساس الـ «floating label»: الـ label جوه الخانة طول ما هي فاضية، ويطلع فوق أول ما تكتب. و [[::placeholder]] (الكلام الرمادي نفسه) بيتنسّق في الدرس الجاي.

---

## ٨. [[:autofill]]

بتمسك الخانة اللي المتصفح ملاها **لوحده** (الاسم والإيميل والعنوان المحفوظين). Chrome بيلوّنها بخلفية زرقا أو صفرا فاتحة ومينفعش تتغيّر بـ [[background]] عادي (الـ UA بيستخدم [[!important]]). Chrome 157 بيفهمها ([[CSS.supports]] ‏true) و [[:-webkit-autofill]] الاسم القديم. محتاجة ملء تلقائي حقيقي من المتصفح فمتقاستش هنا، والكلام ده من MDN. والسيلابس بتاع الكورس معتبرها مش Baseline لسه.

---

## ٩. جدول الحالات كلها

| الـ pseudo-class | بيمسك | بيتغيّر مع الزائر؟ |
|---|---|---|
| [[:checked]] | المتعلّم أو المختار دلوقتي | أيوه |
| [[:indeterminate]] | «مش محدد»: checkbox نص، أو radios مفيش منهم حاجة، أو progress من غير value | أيوه |
| [[:default]] | الافتراضي من الـ HTML، وأول submit | لأ |
| [[:enabled]] و [[:disabled]] | شغال ومتعطّل (والـ fieldset بيعطّل اللي جواه) | لو الكود غيّره |
| [[:required]] و [[:optional]] | إجباري، واللي ممكن يبقى إجباري ومش | لأ |
| [[:valid]] و [[:invalid]] | القيمة صح أو غلط، من أول لحظة | أيوه |
| [[:user-valid]] و [[:user-invalid]] | زي اللي فوق، بس بعد ما الزائر يلمس الخانة | أيوه |
| [[:in-range]] و [[:out-of-range]] | جوه أو برّه [[min]]/[[max]] | أيوه |
| [[:read-only]] و [[:read-write]] | مبيتكتبش فيه، وبيتكتب فيه | لأ |
| [[:placeholder-shown]] | فاضية والـ placeholder ظاهر | أيوه |
| [[:autofill]] | المتصفح ملاها لوحده | أيوه |

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[input:invalid { border-color: red }]] | الفورم أحمر من أول ما يفتح. استخدم [[:user-invalid]] |
| [[label + input:checked]] | الـ CSS مبيرجعش لورا. الـ input قبل الـ label، أو [[:has()]] |
| [[:read-only]] عشان «الخانات اللي عليها readonly» | بتمسك الـ checkbox والزراير والفقرات كمان |
| [[:disabled]] على [[<div>]] | الـ div ملوش disabled |
| [[:checked]] على [[<option>]] عشان تلوّن القايمة المقفولة | الـ select المقفول مبيتنسّقش من جوه في أغلب المتصفحات |
| [[:placeholder-shown]] على خانة من غير placeholder | مبتطابقش أبدًا، لأن مفيش placeholder يظهر |

---

## الخلاصة

- [[:checked]] للمتعلّم، ومعاه [[+ label]]. [[:default]] للافتراضي. [[:indeterminate]] للنص نص.
- [[:disabled]] (والـ fieldset)، و [[:required]] للإجباري، و [[:placeholder-shown]] للفاضي.
- للغلط: [[:user-invalid]] مش [[:invalid]]. وللأرقام [[:out-of-range]].
- [[:read-only]] واسعة جدًا: لـ readonly بالظبط استخدم [[[readonly]]].`,
          try: R`افتح الـ live بتاع قسم ٤ ودوس «عدّل وجرّب». غيّر [[:user-invalid]] لـ [[:invalid]]، وشوف الإيميل بقى أحمر من غير ما تكتب. رجّعها، وجرّب تدوس على خانة الإيميل وتطلع من غير ما تكتب حاجة: تحمر ولا لأ؟`,
          sol: R`مع [[:invalid]] خانة الإيميل الإجبارية بتبقى حمرا من أول لحظة، لأنها فاضية و [[required]]. ومع [[:user-invalid]] بتفضل رمادي.

ولما تدوس فيها وتطلع من غير ما تكتب: المواصفة بتقول [[:user-invalid]] بتستنى الزائر «يتعامل معاها بشكل ملحوظ»، والمتصفحات بتفسّرها بإنه **يغيّر القيمة** ويخرج، أو **يدوس إرسال**، فجرّبها بإيدك وشوف. اللي اتقاس هنا هو الإرسال: لو دوسته، كل الخانات الفاضية الإجبارية بتحمر مرة واحدة. عشان كده سيب زرار الإرسال شغال.

~~~live 130 جرّب تدوس «اشترك» والخانة فاضية
<style>
  input { padding: 6px; margin: 4px; border: 2px solid #d6d3d1; border-radius: 6px; }
  input:user-invalid { border-color: #b91c1c; background: #fee2e2; }
</style>
<form onsubmit="event.preventDefault()">
  <label>الإيميل <input type="email" required></label>
  <button>اشترك</button>
</form>
~~~

**هتشوف إيه:** خانة رمادي وزرار. دوس «اشترك» والخانة فاضية: الخانة تحمر، والمتصفح بيطلّع فقاعة صغيرة بيقول فيها إن الخانة لازم تتملي. ([[onsubmit]] هنا عشان الصفحة متتبعتش بس.)

~~~text القياس من Chrome
قبل الإرسال   :user-invalid false   border-top-color: rgb(118, 118, 118)
بعد requestSubmit()   :user-invalid true   border-top-color: rgb(185, 28, 28)
~~~`,
          deep: {
            why: R`الفورم أكتر حتة الزائر بيتعامل معاها، وكل حالة لازم تبان: اختار إيه، والزرار شغال ولا لأ، والخانة دي إجبارية، وكتب غلط فين. المتصفح عارف الحالات دي كلها من الـ HTML ومن الكتابة، فالـ CSS يقدر يرسمها من غير ولا سطر JavaScript، وده أسرع وأقل باجات.`,
            how: R`المتصفح بيحسب حالة كل خانة من الـ attributes ([[checked]] و [[disabled]] و [[required]] و [[min]] و [[placeholder]]) ومن قيمتها الحالية، وبيعيد الحساب مع كل حرف وكل ضغطة. [[:invalid]] بتستخدم نفس الفحص بتاع [[checkValidity()]] (درس «Constraint Validation API»)، والخانات المستبعدة من الفحص ([[readonly]] و [[disabled]] والأزرار العادية) مبتبقاش valid ولا invalid. [[:user-invalid]] بتضيف شرط: الزائر غيّر القيمة وخرج، أو حاول يبعت الفورم. و [[:default]] بيتحسب من الـ HTML الأصلي مش من الحالة الحالية. كلهم وزنهم (0,1,0).`,
            when: R`[[:checked + label]] لكروت الاختيار والـ toggles. [[:disabled]] لزراير مستنية حاجة. [[:required]] (أو [[::after]] عليه) لتعليم الإجباري. [[:user-invalid]] و [[:user-valid]] لرسايل الغلط والصح. [[:out-of-range]] للأرقام. [[:placeholder-shown]] للـ floating labels. [[:indeterminate]] لـ «اختار الكل» لما بعض البنود متعلّمة.`,
            mistakes: R`[[:invalid]] بدل [[:user-invalid]] فالفورم يفتح أحمر. الـ label قبل الـ input مع [[+]]. [[:read-only]] فاكرها «عليه readonly». تعطيل زرار الإرسال لحد ما الفورم يبقى صح (الزائر مش هيعرف ليه، و [[:user-invalid]] مش هتظهر). ونسيان إن [[<fieldset disabled>]] بيعطّل كل اللي جواه.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** في فورم التسجيل، الخانات **الإجبارية** بس حدها بني [[#b45309]]، والاختيارية تفضل بحدها الافتراضي. من غير ما تزوّد class. (من قسم ٣ في الشرح)`, done: R`خانة الاسم والإيميل حدهم بني، والتليفون رمادي، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  input { display: block; margin: 6px 0; padding: 6px; }
</style>
<input id="n" required placeholder="الاسم (إجباري)">
<input id="e" type="email" required placeholder="الإيميل (إجباري)">
<input id="t" type="tel" placeholder="التليفون (اختياري)">`, checks: [
              { say: R`الخانات الإجبارية حدها بني`, q: "input:required", style: ["border-top-color", "rgb(180, 83, 9)"] },
              { say: R`خانة التليفون لسه بحدها الرمادي`, q: "#t", style: ["border-top-color", "rgb(118, 118, 118)"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  input { display: block; margin: 6px 0; padding: 6px; }
  input:required { border-color: #b45309; }
</style>
<input id="n" required placeholder="الاسم (إجباري)">
<input id="e" type="email" required placeholder="الإيميل (إجباري)">
<input id="t" type="tel" placeholder="التليفون (اختياري)">
~~~

**هتشوف إيه:** تلات خانات تحت بعض: أول اتنين حدهم بني، والتليفون حده رمادي عادي.

**ليه كده:** [[:required]] بتمسك أي خانة عليها [[required]]. و [[border-color]] لوحدها بتغيّر لون الحد الموجود (الحد الافتراضي 2px inset). **الغلطة الشائعة:** [[input[required]]] شغالة برضه بس [[:required]] أوضح، وبتفضل صح لو الـ JavaScript غيّر [[required]].

~~~text القياس من Chrome
input:required   border-top-color: rgb(180, 83, 9)
#t               border-top-color: rgb(118, 118, 118)   ← لون حد الخانة الافتراضي
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كروت اختيار الباقة. الـ label بتاع الباقة المتعلّمة خلفيته [[#fef3c7]] وتقيل. الـ radio بتاع «سنوي» متعلّم في الكود. (من قسم ١: [[:checked + label]])`, done: R`«سنوي» صفرا وتقيلة و «شهري» عادية، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  label { padding: 4px 10px; border: 1px solid #d6d3d1; }
</style>
<input type="radio" name="plan" id="m"><label for="m" id="lm">شهري ٩٠ جنيه</label>
<input type="radio" name="plan" id="y" checked><label for="y" id="ly">سنوي ٩٠٠ جنيه</label>`, checks: [
              { say: R`label الباقة المتعلّمة أصفر`, q: "#ly", style: ["background-color", "rgb(254, 243, 199)"] },
              { say: R`وتقيل`, q: "#ly", style: ["font-weight", "700"] },
              { say: R`الباقة التانية لسه شفافة`, q: "#lm", style: ["background-color", "rgba(0, 0, 0, 0)"] }
            ] }, sol: R`~~~live 80 الحل
<style>
  label { padding: 4px 10px; border: 1px solid #d6d3d1; }
  input:checked + label { background: #fef3c7; font-weight: 700; }
</style>
<input type="radio" name="plan" id="m"><label for="m" id="lm">شهري ٩٠ جنيه</label>
<input type="radio" name="plan" id="y" checked><label for="y" id="ly">سنوي ٩٠٠ جنيه</label>
~~~

**هتشوف إيه:** اختيارين بحد رمادي. «سنوي ٩٠٠ جنيه» خلفيته صفرا وتقيل. دوس على «شهري»: الأصفر يتنقل له.

**ليه كده:** [[+]] بيمسك الـ label اللي بعد الـ radio المتعلّم على طول. **الغلطة الشائعة:** الـ label قبل الـ input في الـ HTML: [[+]] مبيرجعش لورا، فمفيش حاجة هتتلوّن.

~~~text القياس من Chrome
#ly   background-color: rgb(254, 243, 199)   font-weight: 700
#lm   background-color: rgba(0, 0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الزباين بيشتكوا إن فورم الاشتراك «أحمر وزعلان» أول ما يفتح، قبل ما يكتبوا أي حاجة. خلّي الأحمر يظهر بس **بعد** ما الزائر يكتب غلط أو يدوس إرسال. (من قسم ٤: «الحل»)`, done: R`الخانة الفاضية مش حمرا وانت فاتح الصفحة، وبتحمر لو كتبت غلط، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  input { padding: 6px; border: 2px solid #d6d3d1; }
  input:invalid { border-color: #b91c1c; background: #fee2e2; }
</style>
<label>الإيميل <input id="em" type="email" required></label>`, checks: [
              { say: R`الخانة الفاضية مش حمرا أول ما الصفحة تفتح`, q: "#em", style: ["border-top-color", "rgb(214, 211, 209)"] },
              { say: R`وخلفيتها مش حمرا`, q: "#em", style: ["background-color", "rgb(255, 255, 255)"] },
              { say: R`الأحمر لسه موجود بعد ما الزائر يكتب: [[:user-invalid]]`, src: ":user-invalid" }
            ] }, sol: R`~~~live 70 بعد التصليح
<style>
  input { padding: 6px; border: 2px solid #d6d3d1; }
  input:user-invalid { border-color: #b91c1c; background: #fee2e2; }
</style>
<label>الإيميل <input id="em" type="email" required></label>
~~~

وده اللي كان باين قبل التصليح:

~~~live 70 قبل
<style>
  input { padding: 6px; border: 2px solid #d6d3d1; }
  input:invalid { border-color: #b91c1c; background: #fee2e2; }
</style>
<label>الإيميل <input id="em" type="email" required></label>
~~~

**هتشوف إيه:** في الحل خانة بيضا بحد رمادي (اكتب «ali» واضغط Tab تحمر). في «قبل» الخانة حمرا من الأول.

**ليه:** الخانة الفاضية الإجبارية [[:invalid]] من أول لحظة. [[:user-invalid]] بتستنى الزائر. **الغلطة الشائعة:** تشيل [[required]] عشان الأحمر يمشي: كده الفورم يتبعت فاضي.

~~~text القياس من Chrome
قبل: border-top-color rgb(185, 28, 28)    بعد: rgb(214, 211, 209)   background-color rgb(255, 255, 255)
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** بيانات الحجز جاية من السيرفر، والسن لازم بين 16 و 60. الخانة اللي قيمتها **برّه** الحدود خلفيتها حمرا فاتحة [[#fee2e2]]، واللي جوه الحدود تفضل بيضا. (من قسم ٥ في الشرح)`, done: R`السن 70 أحمر فاتح و 25 أبيض، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  input { display: block; margin: 6px 0; padding: 6px; }
</style>
<label>سن أحمد <input id="a" type="number" min="16" max="60" value="70"></label>
<label>سن منى <input id="b" type="number" min="16" max="60" value="25"></label>`, checks: [
              { say: R`السن البرّه الحدود أحمر فاتح`, q: "#a", style: ["background-color", "rgb(254, 226, 226)"] },
              { say: R`السن الصح أبيض`, q: "#b", style: ["background-color", "rgb(255, 255, 255)"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  input { display: block; margin: 6px 0; padding: 6px; }
  input:out-of-range { background: #fee2e2; }
</style>
<label>سن أحمد <input id="a" type="number" min="16" max="60" value="70"></label>
<label>سن منى <input id="b" type="number" min="16" max="60" value="25"></label>
~~~

**هتشوف إيه:** خانة «سن أحمد» فيها 70 وخلفيتها وردي فاتح، و «سن منى» 25 بيضا. غيّر 70 لـ 40: تبيض.

**ليه كده:** [[:out-of-range]] بتقارن القيمة بـ [[min]] و [[max]]. **الغلطة الشائعة:** [[input:invalid]]: هتشتغل هنا، بس هتلوّن كمان أي خانة فاضية إجبارية أو إيميل غلط في نفس الفورم، مش بس الأرقام.

~~~text القياس من Chrome
#a   background-color: rgb(254, 226, 226)     #b   background-color: rgb(255, 255, 255)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة البحث وهي **فاضية** (الـ placeholder ظاهر) حدها متقطّع [[dashed]]، وأول ما يبقى فيها كلام يرجع متصل [[solid]]. التانية فيها كلام من الأول. (من قسم ٧: [[:placeholder-shown]])`, done: R`الفاضية متقطّعة والمليانة متصلة، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  input { display: block; margin: 6px 0; padding: 6px; border: 2px solid #a8a29e; }
</style>
<input id="s1" placeholder="دوّر على مدرّس">
<input id="s2" placeholder="دوّر على مادة" value="فيزيا">`, checks: [
              { say: R`الفاضية حدها متقطّع`, q: "#s1", style: ["border-top-style", "dashed"] },
              { say: R`المليانة حدها متصل`, q: "#s2", style: ["border-top-style", "solid"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  input { display: block; margin: 6px 0; padding: 6px; border: 2px solid #a8a29e; }
  input:placeholder-shown { border-style: dashed; }
</style>
<input id="s1" placeholder="دوّر على مدرّس">
<input id="s2" placeholder="دوّر على مادة" value="فيزيا">
~~~

**هتشوف إيه:** الخانة الأولى حدها نقط متقطّعة وجواها «دوّر على مدرّس» رمادي. التانية حدها متصل وجواها «فيزيا». اكتب في الأولى: الحد يبقى متصل.

**ليه كده:** [[:placeholder-shown]] = فاضية وعليها placeholder. **الغلطة الشائعة:** [[input:empty]]: الـ input مالوش أولاد أبدًا، فـ [[:empty]] بتطابقه دايمًا حتى وهو مليان.

~~~text القياس من Chrome
#s1   border-top-style: dashed     #s2   border-top-style: solid
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي من دول بيطابق [[:read-only]]: [[<input readonly>]]، و [[<input type="checkbox">]]، و [[<p>]]، و [[<textarea>]]، و [[<div contenteditable>]]؟ وأنهي بيطابق [[:default]]: أول [[<button>]] في الفورم ولا التاني؟ (من قسم ١ وقسم ٦)`, done: R`كتبت التلاتة الأولانيين read-only، وأول زرار بس default.`, sol: R`**الإجابة:** [[:read-only]]: الـ readonly، والـ checkbox، والـ p. الـ textarea والـ div اللي عليه [[contenteditable]] [[:read-write]]. و [[:default]] بيطابق **أول** زرار submit في الفورم بس (هو اللي بيتداس لو ضغطت Enter في خانة).

~~~live 120 الصفحة
<style>
  :read-only { outline: 2px dashed #b45309; }
  button:default { font-weight: 700; }
</style>
<form>
  <input readonly value="1042"> <input type="checkbox"> <textarea rows="1"></textarea>
  <div contenteditable>اكتب هنا</div>
  <button>احفظ</button> <button>احفظ كمسودة</button>
</form>
~~~

**هتشوف إيه:** خط بني متقطّع حوالين خانة 1042 والـ checkbox والزرارين، وحوالين الصفحة كلها والفورم (لأنهم كمان مبيتكتبش فيهم!). الـ textarea و «اكتب هنا» من غير خط. و «احفظ» تقيل و «احفظ كمسودة» عادي.

~~~text القياس من Chrome
input[readonly] و checkbox و button و form   :read-only
textarea و div[contenteditable]              :read-write
أول button   :default      التاني   لأ
~~~` }
          ]
        },
        {
          cmd: "::before و ::after",
          title: "تزوّد كلام أو شكل مش موجود في الـ HTML بـ ::before و ::after و content، وتنسّق باقي الحتت اللي المتصفح بيرسمها",
          pre: ["css/:checked و :invalid"],
          ref: [
            { t: "MDN: ::before", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::before" },
            { t: "MDN: ::after", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::after" },
            { t: "MDN: content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content" },
            { t: "MDN: quotes", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/quotes" },
            { t: "MDN: attr()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr" },
            { t: "MDN: ::placeholder", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::placeholder" },
            { t: "MDN: ::backdrop", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::backdrop" },
            { t: "MDN: ::file-selector-button", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::file-selector-button" },
            { t: "MDN: ::details-content", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content" },
            { t: "MDN: ::target-text", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::target-text" },
            { t: "MDN: ::highlight()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::highlight" },
            { t: "MDN: ::cue", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::cue" },
            { t: "MDN: ::view-transition", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition" },
            { t: "CSS Pseudo-Elements Level 4", url: "https://www.w3.org/TR/css-pseudo-4/" }
          ],
          desc: R`[[::before]] و [[::after]] بيعملوا حتة جديدة كأنها **أول** و**آخر** ابن جوه العنصر، والحتة دي مش موجودة في الـ HTML. بتظهر بس لو ليها [[content]]: كلام ([[content: "★ "]])، أو قيمة attribute ([[attr(data-price)]])، أو عدّاد، أو علامات تنصيص ([[open-quote]] و [[quotes]])، أو فاضية ([[""]]) عشان ترسم شكل.
وفيه pseudo-elements تانية لحتت المتصفح بيرسمها لوحده: [[::placeholder]] (الكلام الرمادي في الخانة)، و [[::file-selector-button]] (زرار «اختار ملف»)، و [[::backdrop]] (الطبقة ورا الـ modal)، و [[::details-content]] (جسم الـ details)، و [[::target-text]] و [[::highlight()]] (كلام متعلّم)، و [[::cue]] (ترجمة الفيديو).`,
          example: R`<style>
  .plan.best::before { content: "★ "; color: #b45309; }
  .plan::after { content: " (" attr(data-price) " جنيه)"; color: #78716c; }
  .req::after { content: " *"; color: #b91c1c; }
  .note { quotes: "«" "»"; }
  .note::before { content: open-quote; }
  .note::after { content: close-quote; }
  input::placeholder { color: #a8a29e; }
</style>
<p class="plan best" data-price="900">سنوي</p>
<p class="plan" data-price="90">شهري</p>
<label class="req">الاسم <input placeholder="زي ما في البطاقة"></label>
<p class="note">ألغي في أي وقت</p>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`قبل كلام الباقة الأفضل نجمة بني ومسافة. النجمة مش في الـ HTML، الـ CSS هو اللي حاططها.`,
            R`بعد اسم كل باقة السعر بين قوسين، والرقم جاي من [[data-price]] اللي في الـ HTML بـ [[attr()]]. الكلام اللي بين علامات التنصيص بيتلزق في بعض بالترتيب.`,
            R`نجمة حمرا بعد الـ label بتاع الخانة الإجبارية.`,
            R`علامات التنصيص اللي هتستخدمها [[.note]]: فتح [[«]] وقفل [[»]].`,
            R`قبل الكلام علامة الفتح من [[quotes]].`,
            R`وبعد الكلام علامة القفل [[»]].`,
            R`الكلام الرمادي اللي جوه الخانة الفاضية أفتح من الافتراضي.`,
            R`قفلة بلوك الـ CSS.`,
            R`فقرة الباقة الأفضل: هتبان «★ سنوي (900 جنيه)».`,
            R`فقرة الباقة التانية: «شهري (90 جنيه)» من غير نجمة.`,
            R`label عليه [[.req]] فيه خانة ليها placeholder: النجمة الحمرا بتيجي في آخر الـ label، يعني بعد الخانة.`,
            R`ملاحظة بتتحط بين «» لوحدها.`
          ],
          teach: R`## الفكرة في سطرين

الـ pseudo-element (بـ [[::]] اتنين) **حتة** من الصفحة مش عنصر في الـ HTML: إما حاجة انت بتضيفها ([[::before]] و [[::after]])، أو جزء المتصفح بيرسمه لوحده وانت عايز تنسّقه (الـ placeholder، وزرار الملف، والطبقة ورا الـ modal). درس «selectors» عرّفك على [[::after]] بسطر واحد، ووحدة الخطوط شرحت [[::first-letter]] و [[::first-line]] و [[::selection]] (درس «::first-letter و ::selection») و [[::marker]] (درس «list-style و ::marker»). هنا الباقي كله.

كل القياسات من Chrome 157 (headless على Windows 11) بـ [[getComputedStyle(el, "::before")]]، اللي بيقرا تنسيق الـ pseudo-element.

---

## ١. [[::before]] و [[::after]]: حتة جديدة جوه العنصر

~~~text مكان الحتت
<p class="plan">  ::before   سنوي   ::after  </p>
                  ↑ أول ابن          ↑ آخر ابن
~~~

- **جوه** العنصر، مش قبله وبعده برّه. فبتاخد لونه وخطه بالوراثة، وبتبقى جوه الـ border والخلفية بتاعته.
- **محتاجة [[content]]:** من غيرها مفيش حتة خالص. اتقاس: [[.c::before { color: red }]] من غير content ← [[content]] المحسوبة [[none]].
- **inline من الأول:** [[display]] المحسوبة [[inline]]، فلو عايز تديها عرض وطول اكتب [[display: block]] أو [[inline-block]].
- **مش في الـ DOM:** [[querySelectorAll(".a::before")]] رجّعت 0، و [[textContent]] للفقرة «مميز» من غير النجمة. JavaScript مبيشوفهاش، والزائر **مبيقدرش يحددها وينسخها**.
- **مش بتشتغل على العناصر اللي ملهاش أولاد:** [[<img>]] و [[<input>]] و [[<br>]] (من MDN، واتقال في درس «selectors»).

---

## ٢. [[content]]: إيه اللي ممكن يتكتب فيه

| القيمة | بتعرض | المحسوب في Chrome |
|---|---|---|
| [[content: "★ "]] | نص زي ما هو | [[content="★ "]] |
| [[content: ""]] | حتة فاضية، عشان ترسم شكل بالخلفية والحدود | [[""]] |
| [[content: attr(data-price)]] | قيمة attribute من العنصر نفسه كنص | [[" (90 جنيه)"]] بعد ما اتلزقت |
| [[content: counter(item)]] | رقم عدّاد | درس «list-style و ::marker» قسم العدّادات |
| [[content: open-quote]] و [[close-quote]] | علامة تنصيص من [[quotes]] | قسم ٣ |
| [[content: url(icon.svg)]] | صورة صغيرة بمقاسها الطبيعي | [[url("…")]] |
| [[content: "✔" / "تم"]] | النص اللي بيتعرض، وبعد [[/]] النص اللي **قارئ الشاشة** بيقوله | [[content="✔" / "تم"]] |
| [[content: none]] | مفيش حتة (الافتراضي) | [[none]] |

### ركّب أكتر من حاجة

القيم بتتكتب جنب بعض بمسافة وبتتلزق: [[content: " (" attr(data-price) " جنيه)"]] على [[<p data-price="90">]] طلّعت « (90 جنيه)». والـ [[attr()]] هنا الشكل القديم اللي شغال في كل المتصفحات: بيرجّع نص بس، وبيشتغل جوه [[content]] بس. الشكل الجديد اللي بيرجّع رقم أو طول في أي خاصية في درس «round() و sin() و pow()».

### قارئ الشاشة بيقرا الـ content

النص اللي في [[content]] بيتقري لقارئ الشاشة في أغلب المتصفحات (MDN)، فـ «★» ممكن يتقري «نجمة سوداء». لو الرمز للزينة بس، اكتب نص بديل فاضي: [[content: "★" / ""]]. ولو المعنى مهم (السعر، أو «جديد»)، **حطه في الـ HTML** مش في الـ CSS، لأن اللي في الـ CSS مبيتنسخش، ومبيتلاقيش في بحث Ctrl+F في بعض المتصفحات، ومبيوصلش لمحركات البحث بشكل مضمون.

---

## ٣. [[quotes]] و [[open-quote]]

[[quotes]] خاصية بتحدد علامات التنصيص: زوج للمستوى الأول وزوج للاقتباس جوه الاقتباس. و [[open-quote]] و [[close-quote]] في [[content]] بيحطوها.

~~~live 70 علامات تنصيص عربي بمستويين
<style>
  .say { quotes: "«" "»" "‹" "›"; }
  .say::before { content: open-quote; }
  .say::after { content: close-quote; }
</style>
<p class="say">المدرّس قال: <q>ذاكر كل يوم شوية</q> وكمّل</p>
~~~

**هتشوف إيه:** الجملة كلها بين «»، وجواها «ذاكر كل يوم شوية» بين ‹›، لأنها اقتباس جوه اقتباس. ([[<q>]] عنده [[::before]] و [[::after]] بـ [[open-quote]] من المتصفح، درس «blockquote و q و cite».)

~~~text القياس من Chrome
.say  quotes: "«" "»" "‹" "›"
q::before (من غير CSS)  content: open-quote    و  quotes: auto  ← auto = حسب لغة العنصر
~~~

---

## ٤. [[content: ""]]: شكل من غير صورة

حتة فاضية بـ [[display: block]] وعرض وطول وخلفية = خط أو شريط أو دايرة زينة، من غير ما تزوّد [[<div>]] فاضي في الـ HTML:

~~~live 110 خط زينة تحت العنوان ونجمة على الباقة الأفضل
<style>
  .title::after { content: ""; display: block; width: 40px; height: 4px; margin-top: 6px; background: #b45309; }
  .plan { padding: 10px; border: 1px solid #d6d3d1; margin: 6px 0; }
  .plan.best::before { content: "★ الأفضل"; display: block; font-size: 12px; font-weight: 700; color: #b45309; }
</style>
<h3 class="title">باقات حصّة</h3>
<div class="plan best">سنوي: ٩٠٠ جنيه</div>
~~~

**هتشوف إيه:** عنوان «باقات حصّة» وتحته شَرطة بني قصيرة تخينة. وتحته كارت، فوق كلامه سطر صغير بني «★ الأفضل».

~~~text القياس من Chrome
.title::after   content: ""   display: block   width: 40px   background-color: rgb(180, 83, 9)
~~~

---

## ٥. [[::placeholder]]: الكلام الرمادي في الخانة

بيمسك الكلام اللي في [[placeholder]] وهو ظاهر (والخانة نفسها في الحالة دي [[:placeholder-shown]]، الدرس اللي فات). خصائص الكلام بس اللي بتشتغل عليه (اللون، والخط، والشفافية).

~~~text القياس من Chrome
::placeholder الافتراضي          color: rgb(117, 117, 117)
input::placeholder { color: #78716c }   →  rgb(120, 113, 108)
~~~

> متخليش الـ placeholder فاتح أوي: لازم يبقى مقروء. ومتستخدموش بدل الـ [[<label>]]: بيختفي أول ما الزائر يكتب (درس «form و label»).

---

## ٦. [[::file-selector-button]]: زرار «اختار ملف»

[[<input type="file">]] فيه زرار المتصفح بيرسمه. ده الـ pseudo-element بتاعه:

~~~live 70 زرار الملف بشكل الموقع
<style>
  input[type="file"]::file-selector-button { padding: 6px 12px; margin-left: 10px; border: 0; border-radius: 6px; background: #fef3c7; color: #78350f; font-weight: 700; }
</style>
<label>صورة البطاقة <input type="file" accept="image/*"></label>
~~~

**هتشوف إيه:** زرار أصفر فاتح أركانه مدورة وكلامه بني تقيل، وجنبه «No file chosen» (أو بلغة متصفحك). الكلام ده مش بيتنسّق، المتصفح بيكتبه.

~~~text القياس من Chrome
الافتراضي   background-color: rgb(240, 240, 240)   border-top: 2px rgb(0, 0, 0)
بعد القاعدة background-color: rgb(254, 243, 199)
~~~

---

## ٧. [[::backdrop]]: الطبقة ورا الـ modal

لما [[<dialog>]] يتفتح بـ [[showModal()]] (أو عنصر يبقى fullscreen أو popover)، المتصفح بيحط وراه طبقة بتغطّي الصفحة. دي [[::backdrop]]:

~~~text القياس من Chrome (بعد showModal())
الافتراضي                                    background-color: rgba(0, 0, 0, 0.1)   position: fixed
dialog::backdrop { background: rgb(0 0 0 / 0.5) }   →  rgba(0, 0, 0, 0.5)
~~~

~~~live 160 دوس الزرار: الصفحة بتغمق ورا المودال
<style>
  dialog::backdrop { background: rgb(0 0 0 / 0.5); }
  dialog { border: 0; border-radius: 10px; padding: 16px; }
</style>
<p>صفحة الباقات</p>
<button onclick="document.querySelector('dialog').showModal()">اشترك</button>
<dialog><p>تم الاشتراك ✓</p><button onclick="this.closest('dialog').close()">تمام</button></dialog>
~~~

**هتشوف إيه:** زرار «اشترك». دوسه: صندوق أبيض في النص، والصفحة اللي وراه بقت رمادي غامق. دوس «تمام» يقفل. (الـ [[onclick]] هنا بس عشان تشوفه، والطريقة الصح بالـ JavaScript أو [[command]] في درس «dialog و closedby».)

---

## ٨. [[::details-content]]: جسم الـ details

كل اللي جوه [[<details>]] غير الـ [[<summary>]]. قبله كان مينفعش تنسّق الجسم ده لوحده من غير ما تلفّه في div. وبيستخدم لعمل حركة فتح وقفل (وحدة الحركة).

~~~text القياس من Chrome
details مقفول   ::details-content   display: block   content-visibility: hidden   ← مستخبي بالـ content-visibility مش بالـ display
details::details-content { background: #fef3c7 }   →  rgb(254, 243, 199)
~~~

جديد: Chrome من أواخر 2024، ومش Baseline (MDN بيقول Baseline محدود)، فخلّي الشكل يفضل كويس من غيره.

---

## ٩. الكلام المتعلّم: [[::target-text]] و [[::highlight()]]

| العنصر | بيمسك | ملاحظة |
|---|---|---|
| [[::target-text]] | الكلام اللي اتعلّم لما حد فتح لينك فيه [[#:~:text=كلمة]] (لينك بيوديك لكلمة معيّنة في الصفحة) | Chrome بيعلّمه أصفر لوحده. مش Baseline لسه (MDN) |
| [[::highlight(found)]] | حتة كلام انت حددتها بالـ JavaScript بـ [[CSS.highlights.set("found", new Highlight(range))]]، من غير ما تغيّر الـ HTML | اتقاس: [[CSS.highlights.has("found")]] ‏true. مفيد لـ «دوّر في الصفحة» وتلوين الكود |
| [[::cue]] | كلام الترجمة (WebVTT) على [[<video>]] | من MDN: خصائص الكلام والخلفية بس. الترجمة نفسها في درس «track و WebVTT». متقاستش هنا (محتاجة فيديو بترجمة شغالة) |
| [[::view-transition]] وعيلته ([[::view-transition-group()]] و [[::view-transition-old()]] و [[::view-transition-new()]] و [[::view-transition-image-pair()]]) | الصورتين القديمة والجديدة وقت الـ view transition | درس «View Transitions» |
| [[::first-letter]] و [[::first-line]] و [[::selection]] | أول حرف، وأول سطر، والكلام اللي الزائر حدده | درس «::first-letter و ::selection» |
| [[::marker]] | الرقم أو النقطة بتاعة الـ [[<li>]] | درس «list-style و ::marker» |
| [[::part()]] و [[::slotted()]] | حتت جوه الـ web components | الدرس اللي فات قسم ٨، وكورس JavaScript |

~~~live 70 كلمة متعلّمة بالـ JavaScript من غير ما الـ HTML يتغيّر
<style>
  ::highlight(found) { background-color: #fde68a; color: #78350f; }
</style>
<p id="t">دوّر على كلمة فيزيا في الجملة دي</p>
<script>
  const node = document.getElementById("t").firstChild;
  const start = node.textContent.indexOf("فيزيا");
  const r = new Range(); r.setStart(node, start); r.setEnd(node, start + 5);
  CSS.highlights.set("found", new Highlight(r));
</script>
~~~

**هتشوف إيه:** الجملة عادية، وكلمة «فيزيا» بس خلفيتها صفرا وكلامها بني. ولو فتحت DevTools هتلاقي الـ [[<p>]] زي ما هو، مفيش [[<mark>]] ولا [[<span>]].

---

## ١٠. الـ pseudo-element بيتكتب فين في الـ selector

- **في الآخر:** [[.plan:hover::before]] صح، و [[.plan::before:hover]] مش هتشتغل في أغلب الحالات.
- **واحد بس** في الأغلب ([[::before::marker]] مسموحة بس دي حالات نادرة).
- **وزنه:** (0,0,1) زي نوع العنصر.
- **[[::]] اتنين:** [[:before]] بنقطة واحدة شكل قديم المتصفحات لسه بتفهمه عشان المواقع القديمة، بس اكتب [[::]] دايمًا عشان تفرّقها عن الـ pseudo-classes.

---

## ١١. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[::before]] من غير [[content]] | مفيش حاجة بتظهر |
| [[width]] على [[::before]] من غير [[display]] | مبيتطبقش، لأنه inline |
| [[img::after]] أو [[input::before]] | مبيظهرش: ملهمش أولاد |
| سعر أو معلومة مهمة في [[content]] | مبتتنسخش، وممكن قارئ الشاشة يقراها غلط أو محركات البحث متشوفهاش |
| أيقونة زينة من غير بديل [[/ ""]] | قارئ الشاشة بيقول اسم الرمز |
| [[.a::before:hover]] | الترتيب غلط، والـ pseudo-element لازم في الآخر: [[.a:hover::before]] |
| placeholder فاتح جدًا | مش مقروء |

---

## الخلاصة

- [[::before]] و [[::after]] = أول وآخر ابن جوه العنصر، محتاجين [[content]]، و inline من الأول.
- [[content]]: نص، و [[attr()]]، و [[counter()]]، و [[open-quote]] مع [[quotes]]، و [[url()]]، و [[""]] للشكل، و [[/ "نص بديل"]].
- [[::placeholder]] و [[::file-selector-button]] و [[::backdrop]] و [[::details-content]] لحتت المتصفح، و [[::highlight()]] و [[::target-text]] للكلام المتعلّم.
- المعلومة المهمة في الـ HTML، والزينة في الـ CSS.`,
          try: R`اعمل [[plans.html]] فيه تلات باقات كل واحدة [[<p class="plan" data-price="...">]]. حط السعر بعد كل اسم بـ [[attr()]]، ونجمة قبل الباقة اللي عليها [[.best]]، وخط زينة تحت العنوان بـ [[content: ""]]. وبعدين حدد الصفحة كلها بالماوس وانسخها في Notepad: السعر اتنسخ؟`,
          sol: R`~~~live 210 plans.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>الباقات</title>
<style>
  body { padding: 12px; }
  h2::after { content: ""; display: block; width: 40px; height: 4px; margin-top: 6px; background: #b45309; }
  .plan { padding: 8px 12px; margin: 6px 0; border: 1px solid #d6d3d1; }
  .plan::after { content: " (" attr(data-price) " جنيه)"; color: #78716c; }
  .plan.best { border-color: #b45309; background: #fffbeb; }
  .plan.best::before { content: "★ " / ""; color: #b45309; }
</style>
</head>
<body>
<h2>باقات حصّة</h2>
<p class="plan" data-price="90">شهري</p>
<p class="plan best" data-price="900">سنوي</p>
<p class="plan" data-price="0">تجربة أسبوع</p>
</body>
</html>
~~~

**هتشوف إيه:** عنوان وتحته شَرطة بني. تلات صناديق: «شهري (90 جنيه)»، و «★ سنوي (900 جنيه)» بإطار بني وخلفية كريمي، و «تجربة أسبوع (0 جنيه)».

ولما تنسخ الصفحة في Notepad: هتلاقي «شهري» و «سنوي» و «تجربة أسبوع» **من غير** الأسعار ولا النجمة. اللي في [[content]] مش جزء من كلام الصفحة. عشان كده في موقع حقيقي السعر يتكتب في الـ HTML.

~~~text القياس من Chrome
.plan::after        content: " (90 جنيه)"   ← Chrome بيحسب attr() ويكتب النتيجة
.plan.best::before  content: "★ " / ""
document.querySelector(".best").textContent   →  "سنوي"
~~~`,
          deep: {
            why: R`فيه حاجات شكلها جزء من الصفحة بس معناها مش جزء من المحتوى: نجمة زينة، وخط تحت العنوان، وعلامات تنصيص، ونجمة الخانة الإجبارية، وأيقونة جنب اللينك. لو اتكتبت في الـ HTML بقت «كلام» قارئ الشاشة بيقراه ومحرك البحث بيشوفه، ولو اتعملت صور زوّدت طلبات. [[::before]] و [[::after]] بيحطوها من الـ CSS. والـ pseudo-elements التانية بتديك تحكّم في حتت المتصفح بيرسمها (زرار الملف، والـ placeholder، وخلفية المودال) من غير ما تبني بديل بالـ JavaScript.`,
            how: R`لما المتصفح يبني شجرة الرسم (مش الـ DOM)، بيبص على كل عنصر: لو ليه [[::before]] بـ [[content]] غير [[none]] و [[normal]]، بيعمل box جديد في أول أولاده، و [[::after]] في آخرهم. الـ box ده بيورث من العنصر، و [[display]] بتاعه [[inline]] إلا لو غيّرته. [[attr()]] بيتقري وقت حساب الستايل، فلو الـ attribute اتغيّر بالـ JavaScript الكلام بيتغيّر. [[open-quote]] بيزوّد مستوى التنصيص و [[close-quote]] بينقّصه، والعلامة بتتاخد من [[quotes]] حسب المستوى. الحتت دي مش في الـ DOM، فـ JavaScript بيقرا تنسيقها بس بـ [[getComputedStyle(el, "::before")]]، ومش بيقدر يمسكها.`,
            when: R`[[::before]] و [[::after]]: أيقونات وزينة، وعلامات (إجباري، ولينك خارجي، ونوع ملف، الدرس ده والمشاريع)، وأشكال من غير عناصر زيادة، وعدّادات. [[::placeholder]] لما لونه مش مناسب للموقع. [[::file-selector-button]] في أي فورم رفع ملفات. [[::backdrop]] مع كل modal. [[::highlight()]] للبحث جوه الصفحة وتلوين الكود. [[::details-content]] لحركة فتح الـ details.`,
            mistakes: R`نسيان [[content]]. [[width]] من غير [[display]]. [[::before]] على [[img]] أو [[input]]. معلومة مهمة في [[content]]. رمز زينة من غير [[/ ""]] فقارئ الشاشة يقرا «نجمة سوداء». ترتيب [[::before:hover]] الغلط. placeholder فاتح جدًا أو بدل label.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** الخانات الإجبارية في فورم التسجيل الـ label بتاعها عليه [[class="req"]]. حط بعد كلام كل label منهم نجمة [[" *"]] لونها أحمر [[#b91c1c]] من غير ما تكتبها في الـ HTML. (من قسم ١ و ٢ في الشرح)`, done: R`بعد «الاسم» و «الإيميل» نجمة حمرا، و «التليفون» من غير، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  label { display: block; margin: 6px 0; }
</style>
<label class="req">الاسم <input></label>
<label class="req">الإيميل <input type="email"></label>
<label id="tel">التليفون <input type="tel"></label>`, checks: [
              { say: R`فيه حتة بعد كل [[.req]] كلامها [[" *"]]`, q: ".req", pseudo: "::after", style: ["content", "\" *\""] },
              { say: R`لونها أحمر`, q: ".req", pseudo: "::after", style: ["color", "rgb(185, 28, 28)"] },
              { say: R`التليفون من غير نجمة`, q: "#tel", pseudo: "::after", style: ["content", "none"] },
              { say: R`النجمة مش مكتوبة في الـ HTML`, q: "label", has: "*", n: 0 }
            ] }, sol: R`~~~live 130 الحل
<style>
  label { display: block; margin: 6px 0; }
  .req::after { content: " *"; color: #b91c1c; }
</style>
<label class="req">الاسم <input></label>
<label class="req">الإيميل <input type="email"></label>
<label id="tel">التليفون <input type="tel"></label>
~~~

**هتشوف إيه:** تلات سطور. بعد خانة «الاسم» وخانة «الإيميل» نجمة حمرا، و «التليفون» من غير.

**ليه كده:** [[::after]] آخر ابن جوه الـ label، يعني بعد الخانة. لو عايزها بعد الكلمة وقبل الخانة، لفّ الكلمة في [[<span>]] وحط النجمة عليه. **الغلطة الشائعة:** [[.req input::after]]: الـ input مالوش أولاد، فالنجمة مش هتظهر.

~~~text القياس من Chrome
.req::after   content: " *"   color: rgb(185, 28, 28)
#tel::after   content: none
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كروت الباقات فيها [[data-price]]. اكتب بعد اسم كل باقة السعر بالشكل ده بالظبط: [[" ← 90 جنيه"]] (مسافة وسهم ومسافة والرقم ومسافة وجنيه)، والرقم جاي من الـ attribute، ولونه رمادي [[#78716c]]. (من قسم ٢: «ركّب أكتر من حاجة»)`, done: R`«شهري ← 90 جنيه» و «سنوي ← 900 جنيه»، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .plan { margin: 6px 0; }
</style>
<p class="plan" data-price="90">شهري</p>
<p class="plan" data-price="900">سنوي</p>`, checks: [
              { say: R`بعد «شهري» مكتوب « ← 90 جنيه»`, q: ".plan", has: "شهري", pseudo: "::after", style: ["content", "\" ← 90 جنيه\""] },
              { say: R`وبعد «سنوي» « ← 900 جنيه»`, q: ".plan", has: "سنوي", pseudo: "::after", style: ["content", "\" ← 900 جنيه\""] },
              { say: R`الرقم جاي من [[attr(data-price)]] مش مكتوب في الـ CSS`, src: "attr(data-price)" },
              { say: R`لونها رمادي`, q: ".plan", pseudo: "::after", style: ["color", "rgb(120, 113, 108)"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .plan { margin: 6px 0; }
  .plan::after { content: " ← " attr(data-price) " جنيه"; color: #78716c; }
</style>
<p class="plan" data-price="90">شهري</p>
<p class="plan" data-price="900">سنوي</p>
~~~

**هتشوف إيه:** «شهري ← 90 جنيه» و «سنوي ← 900 جنيه»، والجزء اللي بعد الاسم رمادي.

**ليه كده:** النصوص والـ [[attr()]] جنب بعض بمسافة بيتلزقوا. والسعر مكتوب مرة واحدة في الـ HTML، فلو اتغيّر من السيستم الكارت بيتحدّث لوحده. **الغلطة الشائعة:** [[content: " ← attr(data-price) جنيه"]] كله جوه علامات تنصيص: هيتكتب «attr(data-price)» حرفيًا.

~~~text القياس من Chrome
.plan::after   content: " ← 90 جنيه"  (وعلى سنوي " ← 900 جنيه")   color: rgb(120, 113, 108)   ← Chrome بيكتب القيمة بعد ما يقرا الـ attribute
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المفروض يبان تحت العنوان خط بني عرضه 40px وتُخنه 4px، بس مفيش أي حاجة ظاهرة. فيه **غلطتين**. (من قسم ١ وقسم ٤)`, done: R`الخط البني ظاهر تحت العنوان، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .title::after { width: 40px; height: 4px; background: #b45309; }
</style>
<h2 class="title">الأسئلة الشائعة</h2>`, checks: [
              { say: R`الحتة ليها [[content]] (حتى لو فاضية)`, q: ".title", pseudo: "::after", style: ["content", "\"\""] },
              { say: R`بقت [[block]] عشان العرض والطول يشتغلوا`, q: ".title", pseudo: "::after", style: ["display", "block"] },
              { say: R`عرضها 40px`, q: ".title", pseudo: "::after", style: ["width", "40px"] }
            ] }, sol: R`~~~live 90 بعد التصليح
<style>
  .title::after { content: ""; display: block; width: 40px; height: 4px; margin-top: 6px; background: #b45309; }
</style>
<h2 class="title">الأسئلة الشائعة</h2>
~~~

وده اللي كان باين قبل التصليح:

~~~live 70 قبل
<style>
  .title::after { width: 40px; height: 4px; background: #b45309; }
</style>
<h2 class="title">الأسئلة الشائعة</h2>
~~~

**هتشوف إيه:** في الحل عنوان وتحته شَرطة بني قصيرة. في «قبل» العنوان لوحده.

**الغلطتين:** (١) مفيش [[content]]، فالحتة مش موجودة أصلًا. (٢) حتى لو اتعملت، هي [[inline]] فـ [[width]] و [[height]] مبيشتغلوش عليها. [[display: block]] بتخليها سطر لوحده تحت الكلام.

~~~text القياس من Chrome
قبل:  content: none
بعد:  content: ""   display: block   width: 40px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة رفع صورة البطاقة. خلّي زرار «اختار ملف» خلفيته [[#fef3c7]] ومن غير border ([[border: 0]])، والكلام اللي جوه الخانة الفاضية التانية (الـ placeholder) لونه [[#78716c]]. (من قسم ٥ و ٦)`, done: R`الزرار أصفر من غير حد، والـ placeholder رمادي، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  label { display: block; margin: 6px 0; }
</style>
<label>صورة البطاقة <input type="file"></label>
<label>رقم البطاقة <input placeholder="١٤ رقم"></label>`, checks: [
              { say: R`زرار الملف أصفر`, q: 'input[type="file"]', pseudo: "::file-selector-button", style: ["background-color", "rgb(254, 243, 199)"] },
              { say: R`ومن غير حد`, q: 'input[type="file"]', pseudo: "::file-selector-button", style: ["border-top-width", "0px"] },
              { say: R`الـ placeholder رمادي [[#78716c]]`, q: "input[placeholder]", pseudo: "::placeholder", style: ["color", "rgb(120, 113, 108)"] }
            ] }, sol: R`~~~live 100 الحل
<style>
  label { display: block; margin: 6px 0; }
  input::file-selector-button { padding: 6px 12px; border: 0; border-radius: 6px; background: #fef3c7; }
  input::placeholder { color: #78716c; }
</style>
<label>صورة البطاقة <input type="file"></label>
<label>رقم البطاقة <input placeholder="١٤ رقم"></label>
~~~

**هتشوف إيه:** زرار أصفر فاتح أركانه مدورة من غير حد، وجنبه كلام المتصفح عن الملف. وتحته خانة فيها «١٤ رقم» رمادي.

**ليه كده:** الحتتين بيرسمهم المتصفح، والـ pseudo-element بيوصّلك ليهم. **الغلطة الشائعة:** [[input[type="file"] { background: #fef3c7 }]]: بتلوّن الخانة كلها مش الزرار.

~~~text القياس من Chrome
::file-selector-button   background-color: rgb(254, 243, 199)   border-top-width: 0px
::placeholder            color: rgb(120, 113, 108)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** اقتباسات آراء الطلبة تتحط بين علامات تنصيص عربي [[«]] و [[»]] من الـ CSS، والكلام نفسه في الـ HTML من غير علامات. استخدم [[quotes]] و [[open-quote]] و [[close-quote]]. (من قسم ٣)`, done: R`كل رأي بين «»، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .review { margin: 6px 0; color: #44403c; }
</style>
<p class="review">الشرح سهل والمدرّس صبور</p>
<p class="review">أحسن حاجة إن الحصص متسجلة</p>`, checks: [
              { say: R`علامات التنصيص [[«]] و [[»]]`, q: ".review", style: ["quotes", "\"«\" \"»\""] },
              { say: R`قبل الكلام [[open-quote]]`, q: ".review", pseudo: "::before", style: ["content", "open-quote"] },
              { say: R`بعده [[close-quote]]`, q: ".review", pseudo: "::after", style: ["content", "close-quote"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .review { margin: 6px 0; color: #44403c; quotes: "«" "»"; }
  .review::before { content: open-quote; }
  .review::after { content: close-quote; }
</style>
<p class="review">الشرح سهل والمدرّس صبور</p>
<p class="review">أحسن حاجة إن الحصص متسجلة</p>
~~~

**هتشوف إيه:** «الشرح سهل والمدرّس صبور» و «أحسن حاجة إن الحصص متسجلة»، كل واحدة بين علامتين عربي.

**ليه مش [[content: "«"]] على طول:** شغالة، بس [[open-quote]] بتعرف المستويات (اقتباس جوه اقتباس بياخد الزوج التاني)، ولو غيّرت [[quotes]] في مكان واحد كل الاقتباسات بتتغيّر.

~~~text القياس من Chrome
.review   quotes: "«" "»"     ::before content: open-quote     ::after content: close-quote
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.badge::before { content: "جديد"; }]] على [[<span class="badge"></span>]]. بعد كده في الـ Console: [[document.querySelector(".badge").textContent]] هيرجّع إيه؟ و [[:empty]] على الـ span هيبقى true ولا false؟ (من قسم ١)`, done: R`كتبت نص فاضي و true.`, sol: R`**الإجابة:** [[textContent]] بيرجّع [[""]] (نص فاضي)، و [[.badge:empty]] ‏true. الحتة اللي [[::before]] عملها بتترسم بس، مش ابن في الـ DOM.

~~~live 60 الصفحة
<style>
  .badge::before { content: "جديد"; padding: 2px 8px; background: #b45309; color: white; border-radius: 999px; }
  .badge:empty { outline: 2px dashed #0f766e; }
</style>
<p>باقة الطلبة <span class="badge"></span></p>
~~~

**هتشوف إيه:** جنب «باقة الطلبة» شارة بني فيها «جديد»، وحواليها خط أخضر متقطّع: يعني [[:empty]] لسه بتطابق رغم إن فيه كلام ظاهر.

~~~text القياس من Chrome
textContent   ""        .badge:empty   true
~~~` }
          ]
        },
        {
          cmd: "inherit و initial و revert",
          title: "ستايل المتصفح الافتراضي بالأرقام، والـ reset، والكلمات اللي بتشتغل مع أي خاصية: inherit و initial و unset و revert و revert-layer و all",
          pre: ["css/cascade", "css/:is و :where و :not"],
          ref: [
            { t: "MDN: inherit", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/inherit" },
            { t: "MDN: initial", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/initial" },
            { t: "MDN: unset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/unset" },
            { t: "MDN: revert", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/revert" },
            { t: "MDN: revert-layer", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/revert-layer" },
            { t: "MDN: all", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/all" },
            { t: "MDN: Inheritance", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance" },
            { t: "MDN Curriculum: CSS fundamentals (default browser styles)", url: "https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/" },
            { t: "HTML Standard: Rendering (the user-agent stylesheet)", url: "https://html.spec.whatwg.org/multipage/rendering.html" },
            { t: "CSS Cascading and Inheritance Level 5: explicit defaulting", url: "https://www.w3.org/TR/css-cascade-5/#defaulting-keywords" }
          ],
          desc: R`المتصفح عنده ملف CSS خاص بيه (اسمه user-agent stylesheet) بيتطبق على أي صفحة قبل الـ CSS بتاعك: هو اللي بيخلّي الـ [[<h1>]] 32px وتقيل، والـ [[<body>]] حواليه 8px، والقايمة بعيدة 40px. الـ HTML نفسه مالوش شكل، والشكل ده كله CSS، وتقدر تمسحه بـ reset.
وفيه خمس كلمات بتشتغل مع **أي** خاصية: [[inherit]] (خد قيمة الأب)، و [[initial]] (القيمة الابتدائية من المواصفة، مش بتاعة المتصفح)، و [[unset]] (inherit لو الخاصية بتتورث، و initial لو لأ)، و [[revert]] (ارجع لستايل المتصفح)، و [[revert-layer]] (ارجع للطبقة اللي قبل). و [[all]] بتطبق واحدة منهم على كل الخصائص مرة واحدة.`,
          example: R`<style>
  .note { color: #b45309; border: 2px solid #0f766e; padding: 8px; }
  .note .a { border: inherit; }
  .note .b { display: initial; }
  .note .c { display: revert; }
  .note a { color: inherit; }
  .plain { all: unset; }
</style>
<div class="note">
  <div class="a">inherit: نفس حد الأب</div>
  <div class="b">initial: بقيت inline</div>
  <div class="c">revert: رجعت block</div>
  <a href="#">لينك بلون الأب</a>
</div>
<button class="plain">زرار من غير أي شكل</button>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`صندوق ملاحظة: كلامه بني، وحده أخضر 2px، وجواه مسافة.`,
            R`أول div جواه: [[border]] مش بيتورث لوحده، و [[inherit]] بتجبره ياخد نفس حد الأب (أخضر 2px).`,
            R`تاني div: [[initial]] بترجّع [[display]] لقيمته الابتدائية في المواصفة، وهي [[inline]] مش [[block]]، فالـ div بقى زي span.`,
            R`تالت div: [[revert]] بترجّع [[display]] للي المتصفح بيحطه للـ div، وهو [[block]].`,
            R`اللينك ياخد لون الأب البني بدل الأزرق اللي المتصفح بيدّيه للينكات.`,
            R`[[all: unset]] بيمسح **كل** الخصائص من الزرار: مفيش حد ولا خلفية ولا padding، والخط بيتورث من الصفحة.`,
            R`قفلة بلوك الـ CSS.`,
            R`بداية صندوق الملاحظة اللي عليه الحد الأخضر والكلام البني.`,
            R`div هياخد حد أخضر زي أبوه.`,
            R`div بقى inline فهيبقى على نفس السطر مع اللي بعده.`,
            R`div رجع block فهيبدأ في سطر جديد.`,
            R`لينك بني من غير الأزرق.`,
            R`قفلة صندوق الملاحظة، والزرار اللي بعده برّه.`,
            R`زرار شكله كلام عادي: [[all: unset]] شالت شكل المتصفح كله.`
          ],
          teach: R`## الفكرة في سطرين

لو فتحت صفحة HTML من غير ولا سطر CSS هتلاقيها «متنسّقة» شوية: عناوين كبيرة وتقيلة، ولينكات زرقا عليها خط، وقوايم بنقط. ده مش الـ HTML. ده **CSS المتصفح** نفسه. الدرس ده بيوريك الأرقام دي بالقياس، وإزاي تمسحها (reset)، والكلمات الخمسة اللي بترجّع أي خاصية لمصدر معيّن.

كل الأرقام من Chrome 157 (headless على Windows 11) بـ [[getComputedStyle]] على صفحة من غير أي CSS.

---

## ١. ستايل المتصفح الافتراضي (user-agent stylesheet)

كل متصفح فيه ملف CSS بيتطبق **قبل** أي حاجة انت كاتبها، ومواصفة HTML نفسها بتقترح أغلبه (قسم «Rendering»). درس «cascade» قال إنه أضعف مصدر: أي قاعدة منك بتغلبه. دي القيم اللي Chrome بيحطها:

| العنصر | اللي المتصفح حاطه (اتقاس) |
|---|---|
| [[<body>]] | [[margin: 8px]] من كل ناحية، و [[font-size: 16px]]، و [[font-family: "Times New Roman"]] |
| [[<h1>]] | [[font-size: 32px]] (= 2em)، و [[margin: 21.44px 0]] (= 0.67em)، و [[font-weight: 700]] |
| [[<h2>]] | 24px، و margin 19.92px |
| [[<h3>]] | 18.72px، و margin 18.72px |
| [[<p>]] | [[margin: 16px 0]] (= 1em فوق وتحت) |
| [[<ul>]] و [[<ol>]] | [[margin: 16px 0]] و [[padding-inline-start: 40px]] (مكان النقط) |
| [[<blockquote>]] و [[<figure>]] | [[margin: 16px 40px]]: مسافة فوق وتحت وكمان من الجنبين |
| [[<dd>]] | [[margin-inline-start: 40px]] (على اليمين في صفحة عربي) |
| [[<pre>]] | [[font-family: monospace]] و 13px، و margin 13px (= 1em من الخط الصغير) |
| [[<a>]] | لون [[rgb(0, 0, 238)]] وخط تحت |
| [[<button>]] | [[display: inline-block]]، وخلفية [[rgb(240, 240, 240)]]، و [[padding: 1px 6px]]، وحد 2px، و [[font-size: 13.3333px]] و [[Arial]] |
| [[<input>]] | 13.3333px و Arial، وحد [[2px inset]]، و [[padding: 1px 2px]] |
| [[<hr>]] | [[margin: 8px]] وحد [[1px inset]] بيرسم الخط الرمادي |
| [[<fieldset>]] | حد [[2px groove]]، و padding حوالي 5.6px و 12px |
| [[<td>]] | [[padding: 1px]] جوه الخانة، والجدول [[border-spacing: 2px]] بين الخانات |

### تلات حاجات تاخد بالك منها

1. **الأزرار والخانات مش بتورث الخط:** الصفحة 16px Times New Roman، والزرار 13.3333px Arial. عشان كده كل reset فيه [[font: inherit]] للفورم.
2. **[[<h1>]] جوه [[<section>]] بقى زي برّه:** اتقاس 32px في الحالتين. Chrome كان بيصغّره جوه section/article (قاعدة قديمة اتشالت من المواصفة في 2025). فمتعتمدش على الحجم ده، اكتب حجم العنوان بنفسك.
3. **الـ margin بتاع الـ h1 والـ p بالـ em:** لو كبّرت خط الـ h1، الـ margin بيكبر معاه.

### الـ HTML مالوش شكل

الـ [[<h1>]] معناه «أهم عنوان في الصفحة»، مش «كلام كبير». المتصفح بيدّيله شكل كبير عشان الصفحة تبقى مقروءة لو مفيش CSS، بس انت حر تخلّيه أي حجم. **متختارش عنصر عشان شكله** (درس «semantic HTML»): لو عايز كلام كبير مش عنوان، اختار [[<p>]] وكبّره بالـ CSS. ولو عايز عنوان صغير، [[<h2>]] بخط صغير، مش [[<h5>]].

---

## ٢. الـ reset: امسح شكل المتصفح

الـ reset ملف CSS صغير في أول المشروع بيصفّر الفروق دي، فتبدأ من «لوح أبيض» وكل حاجة على الصفحة انت اللي كاتبها:

~~~css reset.css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; }
img, svg, video { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
h1, h2, h3, p { overflow-wrap: break-word; }
~~~

| السطر | بيعمل إيه |
|---|---|
| [[box-sizing: border-box]] | العرض بيشمل الـ padding والحد (درس «box model») |
| [[* { margin: 0 }]] | يمسح الـ 8px بتاعة body و 21.44px بتاعة h1 و 16px بتاعة p… وانت تحط المسافات بنفسك |
| [[line-height: 1.5]] | سطور أبعد شوية ومقروءة (وحدة الخطوط) |
| [[img { display: block; max-width: 100% }]] | الصورة متطلعش برّه الصفحة ومتسيبش مسافة تحتها |
| [[font: inherit]] | الأزرار والخانات ياخدوا خط الصفحة بدل 13.33px Arial |
| [[overflow-wrap: break-word]] | الكلمة الطويلة جدًا تتكسر بدل ما تطلع برّه (درس «white-space و overflow-wrap») |

~~~live 210 نفس الصفحة: بشكل المتصفح، وبعد الـ reset
<style>
  .r *, .r *::before, .r *::after { box-sizing: border-box; }
  .r * { margin: 0; }
  .r { line-height: 1.5; }
  .r :is(input, button) { font: inherit; }
  .side { display: inline-block; vertical-align: top; width: 46%; margin: 0 1%; border: 1px dashed #a8a29e; }
</style>
<div class="side"><h1>حصّة</h1><p>دروس أونلاين</p><ul><li>رياضيات</li></ul><button>اشترك</button></div>
<div class="side r"><h1>حصّة</h1><p>دروس أونلاين</p><ul><li>رياضيات</li></ul><button>اشترك</button></div>
~~~

**هتشوف إيه:** صندوقين بنفس الكلام. اليمين (شكل المتصفح): مسافات كبيرة فوق العنوان وبين السطور، والزرار خطه صغير. الشمال (بعد الـ reset): كل حاجة لازقة في بعض، والزرار بنفس حجم الكلام. ده «اللوح الأبيض» اللي هتبني عليه.

### reset ولا normalize؟

| الطريقة | الفكرة |
|---|---|
| reset (زي اللي فوق) | يمسح الشكل الافتراضي وانت تكتب كل حاجة |
| normalize.css | يسيب الشكل الافتراضي المفيد (العناوين كبيرة)، ويصلّح بس الفروق **بين المتصفحات** عشان كلهم يبانوا زي بعض |

النهارده الفروق بين المتصفحات قليلة، فأغلب المشاريع بتستخدم reset صغير زي اللي فوق. وفي Tailwind فيه واحد جاهز اسمه Preflight. وحط الـ reset في [[@layer reset]] أو جوه [[:where()]] عشان أي قاعدة منك تغلبه بسهولة (درس «cascade»).

---

## ٣. الكلمات الخمسة اللي بتشتغل مع أي خاصية

اسمها CSS-wide keywords: أي خاصية (color أو display أو padding…) تقبلها:

| الكلمة | بتاخد القيمة من | مثال اتقاس |
|---|---|---|
| [[inherit]] | **الأب**، حتى لو الخاصية مش بتتورث | [[border: inherit]] ‏→ 3px زي الأب |
| [[initial]] | القيمة **الابتدائية في المواصفة** (مش بتاعة المتصفح) | [[display: initial]] على div ‏→ [[inline]] |
| [[unset]] | [[inherit]] لو الخاصية بتتورث، و [[initial]] لو لأ | [[color: unset]] ‏→ لون الأب، و [[display: unset]] ‏→ [[inline]] |
| [[revert]] | ستايل **المتصفح** (كأن CSS بتاعك مش موجود للخاصية دي) | [[display: revert]] على div ‏→ [[block]] |
| [[revert-layer]] | الطبقة اللي **قبل** الطبقة دي في [[@layer]] | قسم ٥ |

### الفخ الكبير: [[initial]] مش «الافتراضي»

~~~text القياس من Chrome (div جوه صندوق كلامه بني وحده أخضر 3px)
display: initial    →  inline           ← الـ initial بتاع display في المواصفة inline، والـ block جاي من المتصفح
display: revert     →  block            ← رجع لستايل المتصفح
color: initial      →  rgb(0, 0, 0)     ← مش لون الأب البني
color: unset        →  rgb(180, 83, 9)  ← color بتتورث، فـ unset = inherit
a { color: initial }   →  rgb(0, 0, 0)
a { color: revert }    →  rgb(0, 0, 238)   ← أزرق اللينكات بتاع المتصفح
a { color: unset }     →  rgb(180, 83, 9)  ← لون الأب
~~~

كتير من الناس بيكتبوا [[display: initial]] عايزين «ارجع زي ما كنت»، والـ div يبقى inline والصفحة تبوظ. اللي عايزه في الحالة دي هو [[revert]].

### [[inherit]] على حاجة مش بتتورث

[[.note a { color: inherit; }]] أشهر استخدام: لينك جوه كارت ملوّن ياخد لون الكارت بدل الأزرق. و [[border: inherit]] أو [[padding: inherit]] نادرين بس شغالين.

---

## ٤. بتتورث ولا لأ؟

كل خاصية في المواصفة مكتوب جنبها «Inherited: yes/no»، وMDN بيكتبها في جدول «Formal definition» تحت كل خاصية:

| الخصائص | بتتورث؟ | ليه |
|---|---|---|
| [[color]] و [[font-family]] و [[font-size]] و [[font-weight]] | أيوه | الكلام جوه الكارت عادةً بنفس لون وخط الكارت |
| [[line-height]] و [[text-align]] و [[letter-spacing]] | أيوه | شكل السطور واحد في الفقرة كلها |
| [[visibility]] و [[cursor]] و [[list-style]] و [[quotes]] و [[direction]] | أيوه | حاجات بتخص الكلام اللي جوه |
| [[margin]] و [[padding]] و [[border]] | لأ | كل صندوق ليه مسافاته وحدوده |
| [[background]] و [[width]] و [[height]] | لأ | الابن بياخد مكانه جوه خلفية أبوه أصلًا |
| [[display]] و [[position]] و [[opacity]] و [[box-shadow]] و [[overflow]] | لأ | دي حاجات الصندوق نفسه |

القاعدة: حاجات **الكلام** بتتورث، وحاجات **الصندوق** لأ. لو الـ padding كان بيتورث، كل عنصر جوه كارت كان هياخد نفس الـ padding وتبوظ. واتقاس فوق: [[#pin]] (فقرة جوه الصندوق) أخدت اللون البني، والحد بتاعها 0px.

---

## ٥. [[revert-layer]]

جوه [[@layer]]، [[revert-layer]] بتقول «سيب القيمة دي للطبقة اللي قبلي»:

~~~text القياس من Chrome
@layer base  { .lay { color: green } }
@layer theme { .lay { color: red }   .lay.r { color: revert-layer } }
.lay      →  rgb(255, 0, 0)   ← theme كسبت
.lay.r    →  rgb(0, 128, 0)   ← رجعت لـ base
~~~

لو مفيش طبقة قبلها بتتصرف زي [[revert]]. مفيدة في theme عايز «يستثني» عنصر ويسيبه بشكل الأساس.

---

## ٦. [[all]]: كل الخصائص مرة واحدة

[[all]] بتاخد كلمة من الخمسة بس، وبتطبقها على **كل** خاصية (ما عدا [[direction]] و [[unicode-bidi]] والمتغيرات):

~~~text القياس من Chrome (button)
من غير حاجة    display: inline-block   background: rgb(240, 240, 240)   padding: 1px 6px   border: 2px   13.3333px Arial   cursor: default
all: unset     display: inline         background: شفاف                 padding: 0         border: 0     16px "Times New Roman" (اتورث)   cursor: auto
all: initial   زي unset هنا، بس الخط جه من initial مش من الأب
all: revert    رجع لشكل المتصفح بالظبط
~~~

~~~live 70 زرار بشكل المتصفح وزرار [[all: unset]]
<style>
  .plain { all: unset; color: #0f766e; text-decoration: underline; cursor: pointer; }
</style>
<button>زرار عادي</button> <button class="plain">زرار شكله لينك</button>
~~~

**هتشوف إيه:** زرار رمادي بحد، وجنبه كلمة خضرا عليها خط تحت كأنها لينك، وهي في الحقيقة [[<button>]] (بيتداس بالكيبورد وقارئ الشاشة بيقول «زرار»).

> [[all: unset]] بتشيل كمان حلقة الـ focus. لو عملتها على زرار، رجّع [[:focus-visible { outline: ... }]] (درس «focus-visible»).

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[display: initial]] عشان «يرجع زي الأول» | الـ div يبقى inline. استخدم [[revert]] |
| [[color: initial]] عشان «لون الأب» | بيبقى أسود (الـ initial بتاع color). استخدم [[inherit]] |
| تعتمد على حجم [[h1]] الافتراضي | 32px النهارده، واتغيّر جوه section قبل كده |
| الأزرار والخانات بخط صغير غريب | ناقص [[font: inherit]] |
| [[all: unset]] على زرار ومفيش focus | لازم ترجّع الـ outline |
| reset تقيل بـ classes أو ids | كل قاعدة بعده محتاجة selector أطول. حطه في [[@layer]] أو [[:where()]] |
| [[<h4>]] عشان «عايز عنوان صغير» | المعنى غلط. [[<h2>]] وصغّره بالـ CSS |

---

## الخلاصة

- المتصفح بيحط CSS خاص بيه (body ‏8px، h1 ‏32px و 21.44px، القوايم 40px، الأزرار 13.33px Arial). الـ HTML مالوش شكل.
- reset صغير: border-box، و margin صفر، و [[font: inherit]] للفورم، والصور مبتطلعش برّه.
- [[inherit]] من الأب، [[initial]] من المواصفة، [[unset]] واحدة منهم حسب الوراثة، [[revert]] من المتصفح، [[revert-layer]] من الطبقة اللي قبل. و [[all]] على كل الخصائص.
- حاجات الكلام بتتورث، وحاجات الصندوق لأ.`,
          try: R`افتح أي صفحة HTML عملتها قبل كده من غير CSS، وفي DevTools › Elements اختار الـ [[<h1>]] وبص في Styles: هتلاقي تحت قاعدة اسمها [[user agent stylesheet]]. اقرا الـ [[margin-block-start]] و [[font-size]] اللي فيها، وقارنهم بالجدول اللي في قسم ١.`,
          sol: R`في Styles، تحت أي قاعدة منك، هتلاقي بلوك مكتوب جنبه [[user agent stylesheet]] وفيه حاجة زي:

~~~text DevTools › Styles (Chrome 157)
h1 {                      user agent stylesheet
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}
~~~

وفي Computed:

~~~text القياس من Chrome
font-size     32px       ← 2 × 16px
margin-top    21.44px    ← 0.67 × 32px
font-weight   700        ← bold
~~~

**ليه 21.44 مش 10.72؟** الـ [[em]] في الـ margin بيتحسب من خط العنصر نفسه (32px)، مش من الأب. التفاصيل في درس «الوحدات كلها». والقاعدة الرمادي دي متتعدّلش من DevTools، بس أي قاعدة منك بتغلبها.`,
          deep: {
            why: R`لما الصفحة تطلع بمسافة غريبة فوقها، أو زرار خطه أصغر من الكلام، أو قايمة مزقوقة لجوه، السبب غالبًا CSS المتصفح مش CSS بتاعك. لو عارف الأرقام دي هتعرف تصلّح في ثانية، وهتعرف ليه كل مشروع بيبدأ بـ reset. والكلمات الخمسة بتحل مشكلة «عايز أرجّع الخاصية دي» من غير ما تخمّن قيمة.`,
            how: R`الـ cascade بيجمع القواعد من تلات مصادر: المتصفح (user-agent)، والمستخدم (إعدادات زي حجم الخط)، والمؤلف (انت). المؤلف بيغلب المتصفح. لو مفيش قاعدة لخاصية على عنصر، القيمة بتيجي بالوراثة لو الخاصية بتتورث، وإلا من القيمة الابتدائية (initial) في المواصفة. الكلمات الخمسة بتقول للـ cascade «خد القيمة من المصدر الفلاني»: [[inherit]] من الأب، [[initial]] من المواصفة، [[unset]] زي لو مفيش قاعدة، [[revert]] كأن المؤلف مكتبش حاجة للخاصية دي (فبترجع لستايل المتصفح)، و [[revert-layer]] كأن الطبقة دي مكتبتش حاجة. و [[all]] اختصار بيطبق الكلمة على كل الخصائص.`,
            when: R`reset في أول كل مشروع (أو Preflight مع Tailwind). [[inherit]] للينكات والأزرار اللي لازم تاخد لون وخط أبوها. [[revert]] لما قاعدة عامة بوّظت عنصر وعايز ترجّعه لطبيعته. [[all: unset]] لزرار عايزه شكله كلام أو أيقونة. [[revert-layer]] جوه themes بالطبقات.`,
            mistakes: R`[[initial]] بدل [[revert]] أو [[inherit]]. الاعتماد على حجم العناوين الافتراضي. نسيان [[font: inherit]] للفورم. [[all: unset]] من غير focus. اختيار عنصر HTML عشان شكله. reset بوزن عالي بيتعب كل اللي بعده.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صفحة «حصّة» لازقة في حافة الشاشة من غير ما تعرف ليه، وعايز تمسح **الـ 8px** بتاعة المتصفح حوالين الـ body، وتشيل الـ margin بتاع العنوان اللي فوق. (من قسم ١ و ٢ في الشرح)`, done: R`الـ body والعنوان margin صفر، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .bar { background: #0f766e; color: white; padding: 10px; }
</style>
<div class="bar"><h1>حصّة</h1></div>
<p>دروس أونلاين لكل المراحل.</p>`, checks: [
              { say: R`الـ body من غير margin`, q: "body", style: ["margin-top", "0px"] },
              { say: R`الـ h1 من غير margin`, q: "h1", style: ["margin-top", "0px"] },
              { say: R`الفقرة لسه ليها مسافة 16px`, q: "p", style: ["margin-top", "16px"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  body { margin: 0; }
  h1 { margin: 0; }
  .bar { background: #0f766e; color: white; padding: 10px; }
</style>
<div class="bar"><h1>حصّة</h1></div>
<p>دروس أونلاين لكل المراحل.</p>
~~~

**هتشوف إيه:** شريط أخضر لازق في أول الصفحة من فوق ومن الجنبين، جواه «حصّة» أبيض كبير، وتحته الفقرة بمسافة.

**ليه كده:** الـ 8px دي [[margin]] من CSS المتصفح على [[<body>]]، و 21.44px على الـ h1. **الغلطة الشائعة:** [[* { margin: 0 }]] شغالة برضه، بس هتشيل مسافة الفقرة كمان (الشرط التالت)، وساعتها لازم تحط المسافات بنفسك.

~~~text القياس من Chrome
قبل: body margin-top 8px   h1 margin-top 21.44px
بعد: 0px و 0px          p margin-top 16px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المبرمج عايز الـ [[.card]] يرجع **block** زي أي div بعد ما قاعدة عامة خلّته [[flex]]، فكتب [[display: initial]]، بس الكارت بقى inline والكروت بقت جنب بعض في سطر واحد. صلّحها بالكلمة الصح من غير ما تكتب [[block]]. (من قسم ٣: «الفخ الكبير»)`, done: R`الكروت تحت بعض، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .box > div { display: flex; }
  .box > .card { display: initial; padding: 6px; margin: 4px 0; border: 1px solid #d6d3d1; }
</style>
<div class="box"><div class="card">رياضيات</div><div class="card">فيزيا</div></div>`, checks: [
              { say: R`الكارت رجع block`, q: ".card", style: ["display", "block"] },
              { say: R`من غير كلمة [[block]] في الكود`, nosrc: "display: block" }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  .box > div { display: flex; }
  .box > .card { display: revert; padding: 6px; margin: 4px 0; border: 1px solid #d6d3d1; }
</style>
<div class="box"><div class="card">رياضيات</div><div class="card">فيزيا</div></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 70 قبل
<style>
  .box > div { display: flex; }
  .box > .card { display: initial; padding: 6px; margin: 4px 0; border: 1px solid #d6d3d1; }
</style>
<div class="box"><div class="card">رياضيات</div><div class="card">فيزيا</div></div>
~~~

**هتشوف إيه:** في الحل كارتين بعرض الصفحة تحت بعض. في «قبل» الاتنين جنب بعض في سطر واحد زي كلمتين.

**ليه:** [[initial]] بتاع [[display]] في المواصفة [[inline]]. الـ [[block]] بتاع الـ div جاي من CSS المتصفح، و [[revert]] هي اللي بترجّع له.

~~~text القياس من Chrome
initial → inline       revert → block
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت ملاحظة كلامه بني [[#b45309]] وفيه لينك. خلّي اللينك ياخد **لون الكارت** بدل الأزرق، من غير ما تكتب اللون تاني. (من قسم ٣: [[inherit]])`, done: R`اللينك بني زي الكارت، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .note { color: #b45309; padding: 8px; border: 1px solid #fde68a; }
</style>
<p class="note">لو عندك سؤال <a href="#">ابعتلنا</a> قبل الحصة.</p>`, checks: [
              { say: R`اللينك بني زي الكارت`, q: ".note a", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`اللون مكتوب مرة واحدة بس`, nosrc: "a { color: #b45309" }
            ] }, sol: R`~~~live 70 الحل
<style>
  .note { color: #b45309; padding: 8px; border: 1px solid #fde68a; }
  .note a { color: inherit; }
</style>
<p class="note">لو عندك سؤال <a href="#">ابعتلنا</a> قبل الحصة.</p>
~~~

**هتشوف إيه:** جملة بني فيها «ابعتلنا» بني برضه وتحتها خط (الخط من المتصفح لسه موجود، فبتعرف إنه لينك).

**ليه كده:** [[color]] بتتورث، بس المتصفح حاطط قاعدة مباشرة على [[a]] (الأزرق)، والقاعدة المباشرة بتغلب الوراثة. [[inherit]] بتقول «خد قيمة الأب» صراحة. ولو غيّرت لون الكارت، اللينك هيتغيّر معاه.

~~~text القياس من Chrome
قبل: rgb(0, 0, 238)      بعد: rgb(180, 83, 9)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زرار «نسيت كلمة السر؟» لازم يبقى [[<button>]] بس شكله كلام عادي لونه أخضر [[#0f766e]] من غير خلفية ولا حد. امسح شكل المتصفح بسطر واحد، ورجّع حلقة الـ focus. (من قسم ٦: [[all]])`, done: R`الزرار من غير خلفية ولا حد ولونه أخضر، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .linkish { }
</style>
<p>كلمة السر <button class="linkish">نسيت كلمة السر؟</button></p>`, checks: [
              { say: R`مفيش خلفية`, q: ".linkish", style: ["background-color", "rgba(0, 0, 0, 0)"] },
              { say: R`مفيش حد`, q: ".linkish", style: ["border-top-width", "0px"] },
              { say: R`لونه أخضر`, q: ".linkish", style: ["color", "rgb(15, 118, 110)"] },
              { say: R`فيه قاعدة [[:focus-visible]] ترجّع الحلقة`, src: ":focus-visible" }
            ] }, sol: R`~~~live 70 الحل
<style>
  .linkish { all: unset; color: #0f766e; text-decoration: underline; cursor: pointer; }
  .linkish:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
</style>
<p>كلمة السر <button class="linkish">نسيت كلمة السر؟</button></p>
~~~

**هتشوف إيه:** جملة عادية وجواها «نسيت كلمة السر؟» أخضر عليه خط تحت. اضغط في المعاينة وبعدين Tab: حلقة خضرا بتظهر حواليه.

**ليه كده:** [[all: unset]] شالت الخلفية الرمادي والحد والـ padding والـ cursor. ولأنها شالت الـ outline كمان، رجّعناه بـ [[:focus-visible]]. **الغلطة الشائعة:** تخليه [[<a href="#">]] عشان شكله: الزرار هو الصح لحاجة بتعمل action مش بتنقل لصفحة (درس «a و button»).

~~~text القياس من Chrome
background-color: rgba(0, 0, 0, 0)   border-top-width: 0px   color: rgb(15, 118, 110)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صندوق كلامه بني [[#b45309]] وحده 3px. جواه span عليه [[color: unset; border: unset;]] وspan تاني [[color: initial; border: inherit;]]. لون وحد كل واحد إيه؟ (من قسم ٣ و ٤)`, done: R`كتبت: الأول بني من غير حد، والتاني أسود بحد 3px.`, sol: R`~~~live 70 الصفحة
<style>
  .box { color: #b45309; border: 3px solid #0f766e; padding: 8px; }
  .u { color: unset; border: unset; }
  .i { color: initial; border: inherit; }
</style>
<div class="box"><span class="u">unset</span> <span class="i">initial و inherit</span></div>
~~~

**الإجابة:** [[.u]] بني ومن غير حد: [[color]] بتتورث فـ [[unset]] = [[inherit]]، و [[border]] مبيتورثش فـ [[unset]] = [[initial]] (مفيش حد). [[.i]] أسود (initial بتاع color) وحواليه حد أخضر 3px (inherit).

**هتشوف إيه:** صندوق بحد أخضر، جواه «unset» بني، و «initial و inherit» أسود وحواليه حد أخضر صغير.

~~~text القياس من Chrome
.u   color: rgb(180, 83, 9)   border-top-width: 0px
.i   color: rgb(0, 0, 0)      border-top-width: 3px
~~~` }
          ]
        },
        {
          cmd: "أنواع القيم: length و percentage",
          title: "كل قيمة في CSS ليها نوع: طول ونسبة ورقم وصحيح ونِسبة أبعاد، والنسبة المئوية بتتحسب من إيه في كل خاصية",
          pre: ["css/inherit و initial و revert", "css/box model"],
          ref: [
            { t: "MDN: CSS data types", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Data_types" },
            { t: "MDN: <length>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length" },
            { t: "MDN: <percentage>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/percentage" },
            { t: "MDN: <length-percentage>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length-percentage" },
            { t: "MDN: <number>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/number" },
            { t: "MDN: <integer>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/integer" },
            { t: "MDN: <ratio>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/ratio" },
            { t: "MDN Curriculum: Values and units", url: "https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/" },
            { t: "CSS Values and Units Level 4", url: "https://www.w3.org/TR/css-values-4/" }
          ],
          desc: R`صفحة أي خاصية في MDN مكتوب فيها القيم اللي بتقبلها بأنواع بين [[< >]]: [[width]] بتقبل [[<length-percentage>]]، و [[opacity]] بتقبل [[<number>]]، و [[z-index]] [[<integer>]]. لو فهمت الأنواع دي هتقرا أي صفحة وتعرف تكتب إيه ومينفعش تكتب إيه.
الدرس ده للأنواع اللي فيها أرقام: [[<length>]] (رقم ووحدة: [[16px]] و [[2em]])، و [[<percentage>]] (نسبة: والمهم **من إيه**؟ عرض الأب؟ طوله؟ خط الأب؟ العنصر نفسه؟)، و [[<number>]] (رقم من غير وحدة)، و [[<integer>]] (صحيح)، و [[<ratio>]] ([[16 / 9]]). والدرس الجاي للزوايا والوقت والكلام.`,
          example: R`<style>
  .page { width: 400px; font-size: 20px; border: 1px dashed #a8a29e; }
  .side { width: 50%; padding-top: 5%; font-size: 75%; line-height: 1.5; background: #fef3c7; }
  .thumb { aspect-ratio: 16 / 9; width: 50%; background: #0f766e; }
  .top { position: relative; z-index: 2; opacity: 0.9; }
</style>
<div class="page">
  <div class="side">العمود الجانبي</div>
  <div class="thumb top"></div>
</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`صندوق عرضه [[400px]] (طول: رقم ووحدة) وخطه 20px، بحد متقطّع عشان تشوف حدوده.`,
            R`العمود جواه: عرضه [[50%]] من عرض الأب (200px)، و [[padding-top: 5%]] من **عرض** الأب برضه (20px مش 5% من الطول)، وخطه [[75%]] من خط الأب (15px)، و [[line-height: 1.5]] رقم من غير وحدة (1.5 × الخط).`,
            R`صورة مصغّرة عرضها نص الأب، و [[aspect-ratio: 16 / 9]] بيحسب طولها لوحده (200 × 9 ÷ 16 = 112.5px).`,
            R`[[z-index: 2]] لازم رقم صحيح، و [[opacity: 0.9]] رقم عشري من 0 لـ 1.`,
            R`قفلة بلوك الـ CSS.`,
            R`الصندوق اللي النِسب هتتحسب منه.`,
            R`العمود الجانبي: نص العرض وخلفيته صفرا.`,
            R`المستطيل الأخضر بنِسبة 16 على 9.`,
            R`قفلة الصندوق اللي النسب اتحسبت منه.`
          ],
          teach: R`## الفكرة في سطرين

القيم في CSS مش كلام حر: كل خاصية بتقبل **أنواع** معيّنة، ولو كتبت نوع غلط المتصفح بيرمي السطر كله (درس «مقدمة CSS وتنسيق العناصر»). MDN بيكتب الأنواع بين [[< >]] في جدول «Formal syntax» تحت كل خاصية. الدرس ده بيعرّفك على الأنواع اللي فيها أرقام، وبيقيس أهم سؤال في الـ CSS: **النسبة المئوية دي من إيه؟**

كل الأرقام من Chrome 157 (headless على Windows 11) بـ [[getComputedStyle]]، و [[CSS.supports("خاصية", "قيمة")]] اللي بترجّع true لو القيمة مقبولة.

---

## ١. الصورة الكبيرة: أنواع القيم

| النوع | شكله | أمثلة | اتشرح فين |
|---|---|---|---|
| [[<number>]] | رقم من غير وحدة | [[1.5]] و [[0.9]] و [[-2]] | هنا، قسم ٤ |
| [[<integer>]] | رقم صحيح | [[2]] و [[-1]] | هنا، قسم ٤ |
| [[<length>]] | رقم ووحدة طول | [[16px]] و [[2em]] و [[50vw]] | هنا، والوحدات كلها في درس «الوحدات كلها» |
| [[<percentage>]] | رقم و [[%]] | [[50%]] | هنا، قسم ٣ |
| [[<ratio>]] | رقم [[/]] رقم | [[16 / 9]] | هنا، قسم ٥ |
| [[<color>]] | لون | [[#b45309]] و [[rgb()]] | درس «rgb و hsl و oklch» |
| [[<image>]] | صورة أو تدرّج | [[url(a.png)]] و [[linear-gradient()]] | درس «background-color و background-image» |
| [[<position>]] | مكان في صندوق | [[center]] و [[50% 100%]] و [[right 10px top]] | درس «background-size و background-position» |
| [[<angle>]] و [[<time>]] | زاوية ووقت | [[90deg]] و [[200ms]] | الدرس الجاي |
| [[<string>]] و [[<ident>]] | كلام بين علامات تنصيص، وكلمة من غير | [["جديد"]] و [[bold]] | الدرس الجاي |
| دوال | اسم وقوسين | [[calc()]] و [[var()]] و [[round()]] | درس «round() و sin() و pow()» |

---

## ٢. [[<length>]]: رقم لازق في وحدة

- **من غير مسافة:** [[10px]] صح، و [[10 px]] غلط (اتقاس: [[CSS.supports("width", "10 px")]] ‏false).
- **الصفر بس هو اللي ينفع من غير وحدة:** [[width: 0]] صح، [[width: 10]] غلط.
- **ممكن سالب** في خصائص زي [[margin]] ([[-10px]] اتقبل)، ومش ممكن في [[padding]] و [[width]] ([[padding: -10px]] اترفض).

نوعين وحدات:

| النوع | الأمثلة | بيتحسب من |
|---|---|---|
| مطلقة | [[px]] و [[cm]] و [[pt]] | ثابتة (والـ [[1cm]] على الشاشة مش سنتي حقيقي) |
| نسبية | [[em]] و [[rem]] و [[vw]] و [[cqi]] | خط العنصر، أو خط الصفحة، أو الشاشة، أو الحاوية |

الكل في درس «الوحدات كلها» بالبكسل.

---

## ٣. [[<percentage>]]: النسبة من إيه؟

ده أهم جدول في الدرس. نفس [[50%]] معناها حاجة مختلفة حسب الخاصية. اتقاس على عنصر جوه أب عرضه [[400px]] وطوله [[200px]] وخطه [[20px]]:

| الخاصية | النسبة من | القيمة | المحسوب |
|---|---|---|---|
| [[width: 50%]] | عرض الأب (containing block) | 50% من 400 | [[200px]] |
| [[height: 50%]] | طول الأب، **لو الأب طوله محدد** | 50% من 200 | [[100px]] |
| [[padding-top: 10%]] | **عرض** الأب (حتى فوق وتحت!) | 10% من 400 | [[40px]] |
| [[margin-top: 5%]] | **عرض** الأب برضه | 5% من 400 | [[20px]] |
| [[font-size: 150%]] | خط الأب | 150% من 20 | [[30px]] |
| [[line-height: 120%]] | خط العنصر **نفسه** | 120% من 30 | [[36px]] |
| [[border-radius: 50%]] | العنصر نفسه (العرض للأفقي والطول للرأسي) | | بيفضل [[50%]] في الـ Computed |
| [[top: 10%]] (مع [[position]]) | طول الأب | 10% من 200 | [[20px]] |
| [[left: 25%]] | عرض الأب | 25% من 400 | [[100px]] |
| [[translate: 10%]] | العنصر **نفسه** | 10% من عرضه 200 | الصندوق اتحرك 20px زيادة |
| [[background-position: 50% 100%]] | (الصندوق − الصورة): 50% = النص بالظبط | | [[50% 100%]] |
| [[border-width: 10%]] | **مش مسموحة** | | اترفضت، فالحد 0px |

### الفخ الأول: [[height: %]] والأب طوله [[auto]]

لو الأب ملوش طول محدد (طوله على قد محتواه)، [[height: 50%]] بتتجاهل وتبقى زي [[auto]]:

~~~text القياس من Chrome
أب width: 300px (من غير height)  →  الابن height: 50% بقى 18px (طول سطر كلام واحد)
~~~

عشان كده [[height: 100%]] مبتشتغلش كتير. الحل غالبًا [[min-height]] بوحدة الشاشة ([[100dvh]]، درس «dvh») أو grid/flex.

### الفخ التاني: [[padding]] و [[margin]] من العرض

[[padding-top: 10%]] بتتحسب من **عرض** الأب، مش طوله. ده شكله غريب بس مقصود: كده الـ padding بيبقى بنفس المقاس من الأربع نواحي. وكان بيتعمل بيه trick قديم للصور اللي بنِسبة ثابتة ([[padding-top: 56.25%]] = 16:9)، والنهارده بدله [[aspect-ratio]] (قسم ٥).

~~~live 160 نفس الـ 10%، بس من العرض
<style>
  .box { width: 300px; height: 120px; border: 1px dashed #a8a29e; }
  .in { padding-top: 10%; background: #fef3c7; }
</style>
<div class="box"><div class="in">الـ padding فوقي 10% من عرض الأب (30px)، مش من طوله (12px)</div></div>
~~~

**هتشوف إيه:** صندوق متقطّع، وجواه شريط أصفر: فيه مسافة فاضية صفرا فوق الكلام قدها 30px تقريبًا (عشر عرض الأب)، أكبر بكتير من عشر طوله.

### [[<length-percentage>]]

نوع معناه «[[<length>]] أو [[<percentage>]] أو الاتنين متجمّعين في [[calc()]]». [[width]] و [[padding]] و [[margin]] كلهم بيقبلوه:

~~~text القياس من Chrome (أب 400px)
width: calc(100% - 2 * 20px)   →  360px
CSS.supports("width", "calc(10% + 5px)")   →  true
~~~

---

## ٤. [[<number>]] و [[<integer>]]

[[<number>]] رقم من غير وحدة، ممكن عشري وسالب. [[<integer>]] صحيح بس.

| الخاصية | النوع | اتقاس |
|---|---|---|
| [[opacity: 0.5]] | [[<number>]] (أو نسبة) من 0 لـ 1 | [[opacity: 150%]] اتقبلت واتقصّت لـ [[1]] |
| [[line-height: 1.5]] | [[<number>]] (أو طول أو نسبة) | [[-1]] اترفضت |
| [[z-index: 2]] | [[<integer>]] | [[z-index: 1.5]] اترفضت، فالقيمة فضلت [[auto]] |
| [[font-weight: 700]] | [[<number>]] من 1 لـ 1000 | وحدة الخطوط |
| [[order: -1]] و [[grid-column: 2]] | [[<integer>]] | وحدة الـ layout |

### [[line-height: 1.5]] ولا [[150%]]؟ فرق حقيقي

الاتنين شكلهم واحد على العنصر نفسه، بس **بيتورّثوا بشكل مختلف**:

~~~text القياس من Chrome (أب خطه 10px، وجواه p خطها 30px)
أب line-height: 1.5    →  الـ p ‏line-height: 45px   ← الرقم اتورّث، فاتحسب تاني: 1.5 × 30
أب line-height: 150%   →  الـ p ‏line-height: 15px   ← اتحسب على الأب (15px) واتورّث بكسلات: السطور فوق بعض!
~~~

~~~live 250 نفس العنوان الكبير، والفرق في وحدة الـ line-height بتاعة الأب
<style>
  .n { font-size: 12px; line-height: 1.5; }
  .p { font-size: 12px; line-height: 150%; }
  .n, .p { width: 230px; margin-bottom: 12px; border: 1px dashed #a8a29e; }
  .n h3, .p h3 { font-size: 26px; margin: 0; }
</style>
<div class="n"><h3>line-height: 1.5 على الأب، والسطور مرتاحة</h3></div>
<div class="p"><h3>line-height: 150% على الأب، والسطور راكبة فوق بعض</h3></div>
~~~

**هتشوف إيه:** صندوقين ضيقين، وكل عنوان بيتكسر على كذا سطر. في الأول السطور بينها مسافة طبيعية. التاني السطرين لازقين وممكن يركبوا على بعض، لأن الـ line-height بتاعه 18px بس وخطه 26px. **القاعدة:** [[line-height]] دايمًا رقم من غير وحدة.

---

## ٥. [[<ratio>]]: [[aspect-ratio: 16 / 9]]

[[<ratio>]] رقمين بينهم [[/]] (العرض على الطول)، أو رقم واحد (يعني [[رقم / 1]]). أشهر استخدام [[aspect-ratio]]: تدّي العنصر عرض، والطول بيتحسب لوحده:

~~~text القياس من Chrome
aspect-ratio: 16 / 9; width: 320px    →  height: 180px     aspect-ratio المحسوب: 16 / 9
aspect-ratio: 1.5; width: 300px       →  height: 200px     المحسوب: 1.5 / 1
aspect-ratio: 16/9; width: 160px; height: 200px  →  height: 200px   ← الطول المكتوب كسب
~~~

~~~live 130 مكان الفيديو محجوز قبل ما يتحمّل
<style>
  .video { width: 60%; aspect-ratio: 16 / 9; background: #0f766e; color: white; padding: 8px; }
  .sq { width: 80px; aspect-ratio: 1; background: #fde68a; margin-top: 8px; }
</style>
<div class="video">مكان الفيديو 16:9</div>
<div class="sq"></div>
~~~

**هتشوف إيه:** مستطيل أخضر عريض بنِسبة شاشة السينما، ولو صغّرت المعاينة لموبايل المستطيل بيصغر ونِسبته بتفضل زي ما هي. وتحته مربع أصفر ([[aspect-ratio: 1]]).

استخدامه: صور ومصغّرات بمقاس ثابت قبل ما تتحمّل (الصفحة متتنططش)، ومربعات أفاتار، ومكان الـ iframe بتاع الفيديو.

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[width: 300]] من غير وحدة | السطر بيترمي. الصفر بس اللي من غير وحدة |
| [[10 px]] بمسافة | مرفوضة، الرقم والوحدة لازم لازقين |
| [[padding-top: 10%]] متوقع من الطول | بتتحسب من عرض الأب مش طوله |
| [[height: 100%]] والأب [[auto]] | مبتشتغلش وبتبقى زي auto |
| [[line-height: 150%]] أو [[24px]] على الأب | الأبناء بخط أكبر سطورهم بتركب |
| [[z-index: 1.5]] | مرفوضة، القيمة فضلت auto |
| [[padding: -10px]] | مرفوضة (الـ margin بس اللي يقبل سالب) |
| [[border-width: 10%]] | مرفوضة، والحد بيرجع للافتراضي |

---

## الخلاصة

- اقرا الأنواع في «Formal syntax» على MDN: [[<length>]] رقم ووحدة لازقين، [[<percentage>]] نسبة، [[<length-percentage>]] أي واحد منهم أو [[calc()]].
- النسبة من: العرض لـ width و padding و margin (حتى فوق وتحت)، والطول لـ height و top (لو الأب محدد)، وخط الأب لـ font-size، وخط العنصر لـ line-height، والعنصر نفسه لـ translate و border-radius.
- [[<number>]] و [[<integer>]]: [[line-height: 1.5]] من غير وحدة، و [[z-index]] صحيح.
- [[<ratio>]] مع [[aspect-ratio]] بدل trick الـ padding.`,
          try: R`افتح أي خاصية على MDN (مثلًا [[padding]] و [[opacity]] و [[aspect-ratio]])، وانزل لجدول «Formal syntax». اكتب الأنواع اللي كل واحدة بتقبلها، وبعدين جرّب في Console: [[CSS.supports("padding", "-5px")]] و [[CSS.supports("opacity", "50%")]] و [[CSS.supports("aspect-ratio", "4/3")]].`,
          sol: R`**الأنواع من MDN:**

~~~text Formal syntax (مختصر)
padding        = <'padding-top'>{1,4}       و  padding-top = <length-percentage [0,∞]>
opacity        = <opacity-value>            و  <opacity-value> = <number> | <percentage>
aspect-ratio   = auto || <ratio>
~~~

[[[0,∞]]] جنب النوع معناها «من صفر لفوق»، عشان كده الـ padding مبيقبلش سالب.

~~~text القياس من Chrome (Console)
CSS.supports("padding", "-5px")       →  false
CSS.supports("opacity", "50%")        →  true
CSS.supports("aspect-ratio", "4/3")   →  true
~~~

**ليه مفيد:** بدل ما تخمّن «الخاصية دي بتقبل نسبة؟»، الجدول بيقولك، و [[CSS.supports]] بيأكدلك في ثانية. وده نفس اللي [[@supports]] بيعمله جوه الـ CSS (درس «Baseline و @supports»).`,
          deep: {
            why: R`نص مشاكل «القيمة مش بتشتغل» سببها النوع: وحدة ناقصة، أو مسافة، أو نسبة متحسبة من حاجة غير اللي في دماغك، أو رقم عشري في مكان صحيح. لما تعرف الأنواع، صفحة MDN بتبقى خريطة واضحة، وجدول «النسبة من إيه» بيوفّر عليك ساعات تجريب.`,
            how: R`المتصفح بيقرا كل قيمة ويطابقها على الـ grammar بتاع الخاصية في المواصفة (الأنواع بين [[< >]]). لو مطابقتش، الـ declaration كلها بترمى ويفضل اللي قبلها أو الافتراضي. بعد كده بيحسب «القيمة المحسوبة» (computed): الأطوال النسبية بتتحول لبكسل، والنسب اللي بتعتمد على الـ layout (زي width: 50%) بتتحسب وقت الـ layout من الـ containing block (الأب في الغالب). والرقم من غير وحدة في [[line-height]] بيفضل رقم ويتورث كرقم، أما النسبة فبتتحول لبكسل قبل ما تتورث. وأي رقم بتعرضه getComputedStyle بيتقرّب لـ 1/64 بكسل.`,
            when: R`[[%]] للأعمدة اللي بتتبع عرض الأب. [[<number>]] لـ [[line-height]] دايمًا. [[aspect-ratio]] لأي صورة أو فيديو أو كارت بنِسبة ثابتة. [[<integer>]] لـ [[z-index]] و [[order]] وأرقام الـ grid. وجدول Formal syntax في MDN كل ما تقابل خاصية جديدة.`,
            mistakes: R`رقم من غير وحدة. مسافة بين الرقم والوحدة. padding بالنسبة متوقعها من الطول. height بالنسبة جوه أب auto. line-height بنسبة أو بكسل على أب. z-index عشري. padding سالب.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صفحة عرضها 800px فيها عمود جانبي. خلّي عرضه **ربع** الصفحة بنسبة مئوية (مش px)، وخلفيته [[#fef3c7]]. (من قسم ٣ في الشرح)`, done: R`العمود عرضه 200px محسوب من النسبة، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .page { width: 800px; border: 1px dashed #a8a29e; }
  .side { padding: 8px; }
</style>
<div class="page"><div class="side">المواد</div></div>`, checks: [
              { say: R`العمود عرضه 200px`, q: ".side", style: ["width", "200px"] },
              { say: R`مكتوب كنسبة مش [[200px]]`, nosrc: "200px" },
              { say: R`خلفيته صفرا`, q: ".side", style: ["background-color", "rgb(254, 243, 199)"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .page { width: 800px; border: 1px dashed #a8a29e; }
  .side { width: 25%; padding: 8px; background: #fef3c7; box-sizing: border-box; }
</style>
<div class="page"><div class="side">المواد</div></div>
~~~

**هتشوف إيه:** صندوق متقطّع عريض، وعلى يمينه شريط أصفر فيه «المواد» عرضه ربع الصندوق.

**ليه [[box-sizing: border-box]]:** من غيرها العرض 200px **زائد** الـ padding (الشريط يبقى 216px). مع [[border-box]] الـ 200 بتشمل الـ padding (درس «box model»).

~~~text القياس من Chrome
.side   width: 200px   (25% من 800)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** العنوان الكبير جوه الكارت سطوره راكبة فوق بعض. السبب في سطر الـ [[line-height]] بتاع الكارت. صلّحه من غير ما تكتب [[line-height]] على العنوان. (من قسم ٤: «1.5 ولا 150%»)`, done: R`سطور العنوان مرتاحة، والـ line-height بتاعه 45px، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .card { font-size: 10px; line-height: 150%; width: 220px; padding: 8px; border: 1px solid #d6d3d1; }
  .card h3 { font-size: 30px; margin: 0; }
</style>
<div class="card"><h3>باقة الطلبة الشهرية</h3><p>كل المواد بـ ٩٠ جنيه</p></div>`, checks: [
              { say: R`سطر العنوان 45px (1.5 × 30)`, q: ".card h3", style: ["line-height", "45px"] },
              { say: R`سطر الفقرة الصغيرة 15px`, q: ".card p", style: ["line-height", "15px"] }
            ] }, sol: R`~~~live 170 بعد التصليح
<style>
  .card { font-size: 10px; line-height: 1.5; width: 220px; padding: 8px; border: 1px solid #d6d3d1; }
  .card h3 { font-size: 30px; margin: 0; }
</style>
<div class="card"><h3>باقة الطلبة الشهرية</h3><p>كل المواد بـ ٩٠ جنيه</p></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 140 قبل
<style>
  .card { font-size: 10px; line-height: 150%; width: 220px; padding: 8px; border: 1px solid #d6d3d1; }
  .card h3 { font-size: 30px; margin: 0; }
</style>
<div class="card"><h3>باقة الطلبة الشهرية</h3><p>كل المواد بـ ٩٠ جنيه</p></div>
~~~

**هتشوف إيه:** في الحل العنوان على سطرين بينهم مسافة مريحة. في «قبل» السطرين لازقين وراكبين على بعض.

**ليه:** [[150%]] بتتحول 15px على الكارت، وتتورث **15px** للعنوان اللي خطه 30px. الرقم [[1.5]] بيتورث كرقم ويتحسب على خط كل عنصر.

~~~text القياس من Chrome
قبل: h3 line-height 15px      بعد: h3 45px    p 15px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صور الدروس المصغّرة عرضها 320px، ولازم طولها يبقى بنِسبة 16 على 9 **من غير ما تكتب الطول**. (من قسم ٥: [[<ratio>]])`, done: R`الطول 180px، وكل الشروط ✓.`, work: { h: 220, start: R`<style>
  .thumb { width: 320px; background: #0f766e; color: white; padding: 0; }
</style>
<div class="thumb">درس ١: الكسور</div>`, checks: [
              { say: R`الطول 180px`, q: ".thumb", style: ["height", "180px"] },
              { say: R`النِسبة [[16 / 9]]`, q: ".thumb", style: ["aspect-ratio", "16 / 9"] },
              { say: R`مفيش [[height]] مكتوب`, nosrc: "height" }
            ] }, sol: R`~~~live 200 الحل
<style>
  .thumb { width: 320px; aspect-ratio: 16 / 9; background: #0f766e; color: white; padding: 0; }
</style>
<div class="thumb">درس ١: الكسور</div>
~~~

**هتشوف إيه:** مستطيل أخضر عرضه 320 وطوله 180، وفي ركنه «درس ١: الكسور».

**ليه كده:** 320 × 9 ÷ 16 = 180. ولو غيّرت العرض لـ 160px الطول هيبقى 90 لوحده. **الغلطة الشائعة:** [[aspect-ratio: 16:9]] بنقطتين: مرفوضة، الفاصل [[/]].

~~~text القياس من Chrome
.thumb   height: 180px   aspect-ratio: 16 / 9
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** القايمة المنسدلة لازم تبقى فوق الكارت، فالمبرمج حط [[z-index: 1.5]]، بس مفيش حاجة اتغيّرت. صلّحها. (من قسم ٤: [[<integer>]])`, done: R`الـ z-index المحسوب 2، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .card { position: relative; z-index: 1; padding: 20px; background: #f5f5f4; }
  .menu { position: relative; z-index: 1.5; margin-top: -10px; margin-right: 20px; width: 140px; padding: 8px; background: #fef3c7; border: 1px solid #b45309; }
</style>
<div class="card">كارت الباقة</div>
<div class="menu">قايمة الاختيارات</div>`, checks: [
              { say: R`الـ z-index بتاع القايمة رقم صحيح أكبر من الكارت`, q: ".menu", style: ["z-index", "2"] }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  .card { position: relative; z-index: 1; padding: 20px; background: #f5f5f4; }
  .menu { position: relative; z-index: 2; margin-top: -10px; margin-right: 20px; width: 140px; padding: 8px; background: #fef3c7; border: 1px solid #b45309; }
</style>
<div class="card">كارت الباقة</div>
<div class="menu">قايمة الاختيارات</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 110 قبل
<style>
  .card { position: relative; z-index: 1; padding: 20px; background: #f5f5f4; }
  .menu { position: relative; z-index: 1.5; margin-top: -10px; margin-right: 20px; width: 140px; padding: 8px; background: #fef3c7; border: 1px solid #b45309; }
</style>
<div class="card">كارت الباقة</div>
<div class="menu">قايمة الاختيارات</div>
~~~

**هتشوف إيه:** في الحل الصندوق الأصفر راكب **فوق** حافة الكارت الرمادي من تحت. في «قبل» الكارت الرمادي مغطي حتة من الأصفر.

**ليه:** [[z-index]] نوعه [[<integer>]]، فـ [[1.5]] اترمت والقيمة رجعت [[auto]] (أقل من 1). ([[position]] و [[z-index]] بالتفصيل في وحدة الـ layout.)

~~~text القياس من Chrome
قبل: z-index: auto      بعد: z-index: 2
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أب عرضه 500px وطوله 100px. ابن عليه [[padding-top: 10%; margin-left: 4%; height: 50%]]. احسب التلات قيم بالبكسل قبل ما تفتح الحل. (من قسم ٣)`, done: R`كتبت 50px و 20px و 50px.`, sol: R`~~~live 130 الصفحة
<style>
  .p { width: 500px; height: 100px; border: 1px dashed #a8a29e; }
  .c { padding-top: 10%; margin-left: 4%; height: 50%; background: #fde68a; }
</style>
<div class="p"><div class="c">الابن</div></div>
~~~

**الإجابة:** [[padding-top]] ‏10% من **العرض** = 50px (مش 10px). [[margin-left]] ‏4% من العرض = 20px. [[height]] ‏50% من الطول = 50px (الأب طوله محدد).

**هتشوف إيه:** الشريط الأصفر مالي الصندوق المتقطّع من فوق لتحت بالظبط، وكلمة «الابن» في نصه التحتاني: الـ padding ‏50 فوق، وبعده الـ height ‏50، والمجموع 100 = طول الأب. والـ padding بيتزوّد على الـ height (درس «box model»).

~~~text القياس من Chrome
padding-top: 50px   margin-left: 20px   height: 50px
~~~` }
          ]
        },
        {
          cmd: "angle و time و ident",
          title: "باقي أنواع القيم: الزوايا والوقت والتردد والدقة، والكلام بين علامات تنصيص، والكلمات والأسامي اللي انت بتختارها، وقيم display و overflow",
          pre: ["css/أنواع القيم: length و percentage"],
          ref: [
            { t: "MDN: <angle>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/angle" },
            { t: "MDN: <time>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/time" },
            { t: "MDN: <frequency>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/frequency" },
            { t: "MDN: <resolution>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/resolution" },
            { t: "MDN: <string>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/string" },
            { t: "MDN: <ident>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/ident" },
            { t: "MDN: <custom-ident>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/custom-ident" },
            { t: "MDN: <dashed-ident>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/dashed-ident" },
            { t: "MDN: display (multi-keyword values)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display" },
            { t: "MDN: <overflow>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/overflow_value" },
            { t: "CSS Values and Units Level 4: other quantities", url: "https://www.w3.org/TR/css-values-4/#other-units" }
          ],
          desc: R`كمّلة الدرس اللي فات: [[<angle>]] زاوية بأربع وحدات ([[90deg]] و [[100grad]] و [[1.5708rad]] و [[0.25turn]] كلهم نفس الربع لفة)، و [[<time>]] وقت بـ [[s]] أو [[ms]]، و [[<frequency>]] و [[<resolution>]] (الأخيرة في الـ media queries: [[2x]] شاشة كثيفة).
وأنواع الكلام: [[<string>]] بين علامات تنصيص ([[content: "جديد"]])، و [[<ident>]] كلمة من غير تنصيص (الكلمات المحجوزة زي [[bold]] و [[auto]])، و [[<custom-ident>]] اسم انت بتختاره (اسم عدّاد أو animation)، و [[<dashed-ident>]] اسم بيبدأ بـ [[--]] (متغيّر CSS). وفي الآخر قيم [[display]] بالكلمتين ([[inline flow-root]]) وقيم [[overflow]].`,
          example: R`<style>
  .badge { display: inline flow-root; padding: 4px 10px; background: #b45309; color: white; rotate: -0.02turn; }
  .badge::after { content: " جديد"; }
  .list { counter-reset: step; --brand: #0f766e; }
  .list li { color: var(--brand); transition-duration: 200ms; }
  .scroll { overflow: auto hidden; height: 40px; border: 1px solid #d6d3d1; }
</style>
<span class="badge">باقة الصيف</span>
<ol class="list"><li>سجّل</li><li>ادفع</li></ol>
<div class="scroll">صندوق صغير بيسكرول في اتجاه واحد بس لو الكلام كتير وطويل وطويل وطويل وطويل وطويل وطويل</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`شارة: [[display: inline flow-root]] بكلمتين (نفس [[inline-block]])، ولافّة شوية بزاوية [[-0.02turn]] (جزء من لفة). [[rotate]] خاصية بتلف العنصر، ليها درس في وحدة الحركة.`,
            R`بعد كلام الشارة [[<string>]] بين علامات تنصيص: « جديد».`,
            R`[[step]] اسم عدّاد انت اخترته ([[<custom-ident>]])، و [[--brand]] اسم متغيّر بيبدأ بشرطتين ([[<dashed-ident>]]).`,
            R`لون البنود من المتغيّر، و [[200ms]] وقت ([[<time>]]): لو اللون اتغيّر هيتغيّر بالراحة في خُمس ثانية.`,
            R`[[overflow: auto hidden]] كلمتين: الأولى للأفقي والتانية للرأسي.`,
            R`قفلة بلوك الـ CSS.`,
            R`الشارة: بنية مايلة شوية ومكتوب فيها «باقة الصيف جديد».`,
            R`قايمة خطوتين لونهم أخضر من المتغيّر.`,
            R`صندوق صغير الكلام الطويل فيه ممكن يتسكرل بالعرض، والطول مقصوص.`
          ],
          teach: R`## الفكرة في سطرين

الدرس اللي فات كان الأنواع اللي بتقيس **مسافة** (طول ونسبة). هنا باقي الأنواع اللي هتقابلها في MDN: زوايا، ووقت، وتردد، ودقة الشاشة، وأنواع **الكلام** (string و ident وإخواتهم)، والقيم اللي بكلمتين في [[display]] و [[overflow]].

كل الأرقام من Chrome 157 (headless على Windows 11) بـ [[getComputedStyle]] و [[CSS.supports]] و [[matchMedia]].

---

## ١. [[<angle>]]: الزاوية بأربع وحدات

| الوحدة | معناها | ربع لفة | المحسوب في Chrome |
|---|---|---|---|
| [[90deg]] | degree: درجة، اللفة 360 | [[90deg]] | [[90deg]] |
| [[100grad]] | gradian: اللفة 400 | [[100grad]] | [[90deg]] |
| [[1.5708rad]] | radian: اللفة 2π (حوالي 6.2832) | [[1.5708rad]] | [[90.0002deg]] (عشان 1.5708 تقريب لـ π/2) |
| [[0.25turn]] | لفة كاملة = 1 | [[0.25turn]] | [[90deg]] |

Chrome بيحوّل كله لـ [[deg]] في المحسوب. واستخدم اللي يقرا أسهل: [[0.5turn]] أوضح من [[180deg]] لما تفكّر في «نص لفة»، و [[deg]] للزوايا الصغيرة.

- لازم وحدة: [[CSS.supports("rotate", "90")]] ‏false.
- بيستخدمه [[rotate]] و [[linear-gradient(45deg, ...)]] (وحدة الخلفيات) و [[hsl()]] و [[oklch()]] (الـ hue زاوية، وحدة الألوان) و [[sin()]] و [[cos()]] (درس «round() و sin() و pow()»).
- [[linear-gradient(0.5turn, red, blue)]] المحسوب بقى [[linear-gradient(rgb(255, 0, 0), rgb(0, 0, 255))]]: Chrome شال الزاوية لأن [[180deg]] (لتحت) هو الاتجاه الافتراضي.

~~~live 110 نفس الزاوية بأربع وحدات
<style>
  .t { display: inline-block; width: 60px; height: 30px; margin: 20px; background: #0f766e; color: white; font-size: 12px; text-align: center; line-height: 30px; }
</style>
<span class="t" style="rotate: 45deg">45deg</span>
<span class="t" style="rotate: 50grad">50grad</span>
<span class="t" style="rotate: 0.7854rad">0.785rad</span>
<span class="t" style="rotate: 0.125turn">0.125turn</span>
~~~

**هتشوف إيه:** أربع مستطيلات خضرا، كلهم مايلين **نفس الميل** بالظبط (تُمن لفة، 45 درجة)، رغم إن كل واحد مكتوب بوحدة.

### [[<angle-percentage>]]

نوع معناه «زاوية أو نسبة». قليل جدًا: بيظهر في [[conic-gradient()]] (وحدة الخلفيات).

---

## ٢. [[<time>]]: الوقت بـ [[s]] و [[ms]]

| القيمة | معناها | المحسوب |
|---|---|---|
| [[200ms]] | 200 ملّي ثانية | [[0.2s]] |
| [[1.5s]] | ثانية ونص | [[1.5s]] |
| [[-1s]] في [[transition-duration]] | مرفوضة (المدة مينفعش تبقى سالب) | [[0s]] (الافتراضي) |
| [[200]] من غير وحدة | مرفوضة | |

- Chrome بيكتب المحسوب بالثواني دايمًا.
- بيستخدمه [[transition-duration]] و [[transition-delay]] و [[animation-duration]] (وحدة الحركة). والـ delay **ممكن** يبقى سالب: الحركة تبدأ من النص.

### [[<time-percentage>]]

نوع معناه «وقت أو نسبة». نادر: المواصفة بتستخدمه في حاجات زي مدة الـ animation بالنسبة لطولها في الـ scroll-driven animations (وحدة الحركة). لو قابلته في MDN اعرف إن الخاصية بتقبل [[200ms]] أو [[50%]].

---

## ٣. [[<frequency>]] و [[<resolution>]]

| العنصر | الوحدات | فين بيتستخدم |
|---|---|---|
| [[<frequency>]] | [[200Hz]] و [[1kHz]] (هرتز، و 1kHz = 1000Hz) | مفيش خاصية في أي متصفح بتستخدمه النهارده (كان معمول للصوت في CSS Speech). اتقاس: [[CSS.supports("width", "10Hz")]] و [[pitch]] ‏false |
| [[<frequency-percentage>]] | تردد أو نسبة | نفس اللي فوق: مش مستخدم |
| [[<resolution>]] | [[96dpi]] و [[37.8dpcm]] و [[1dppx]] و [[2x]] | الـ media queries ([[min-resolution]]) و [[image-set()]] |

الوحدات واحدة واحدة:

| العنصر | النوع | يعني |
|---|---|---|
| [[200Hz]] | [[<frequency>]] | هرتز: مرة في الثانية |
| [[1kHz]] | [[<frequency>]] | كيلو هرتز = 1000Hz |
| [[96dpi]] | [[<resolution>]] | نقطة في البوصة (dots per inch): 96dpi = شاشة عادية |
| [[37.8dpcm]] | [[<resolution>]] | نقطة في السنتي (dots per centimeter): تقريبًا نفس 96dpi |
| [[1dppx]] | [[<resolution>]] | نقطة في كل بكسل CSS (dots per px) |
| [[2x]] | [[<resolution>]] | اسم تاني لـ [[2dppx]]: شاشة كثيفة |

**الـ resolution** = كام نقطة شاشة حقيقية في كل بكسل CSS:

- [[1dppx]] = [[1x]] = [[96dpi]] = [[37.8dpcm]] تقريبًا: شاشة عادية.
- [[2x]]: شاشة كثيفة (موبايل حديث أو لابتوب Retina)، كل بكسل CSS = 4 نقط حقيقية.

~~~text القياس من Chrome (الـ headless شاشته 1x)
matchMedia("(resolution: 1dppx)")     true
matchMedia("(resolution: 1x)")        true
matchMedia("(min-resolution: 96dpi)") true
matchMedia("(min-resolution: 2dppx)") false
~~~

~~~css
@media (min-resolution: 2x) {
  .logo { background-image: url("logo@2x.png"); }
}
~~~

(السطرين دول: على الشاشات الكثيفة بس، حمّل اللوجو بالمقاس المضاعف عشان يبان حاد. الـ media queries في وحدة الـ responsive.)

---

## ٤. [[<string>]]: كلام بين علامات تنصيص

[[<string>]] = أي كلام بين [[""]] أو [['']]. بيظهر في:

| الخاصية | مثال |
|---|---|
| [[content]] | [[content: "جديد"]] (درس «::before و ::after») |
| [[quotes]] | [[quotes: "«" "»"]]: كل علامة string لوحدها |
| [[font-family]] | [[font-family: "Segoe UI", system-ui]] (اسم الخط ممكن string) |
| [[url()]] | [[url("a.png")]] (التنصيص اختياري جوه url بس الأحسن تكتبه) |
| [[grid-template-areas]] | كل صف string (وحدة الـ grid) |

- **من غير تنصيص في [[content]] مرفوض:** [[content: جديد]] بيترمي.
- **علامة تنصيص جوه الكلام:** [[content: "قال \"أهلًا\""]] بـ [[\]] قبلها، أو استخدم النوع التاني بره: [['قال "أهلًا"']].
- **سطر جديد:** [[\A]] جوه string (ومعاها [[white-space: pre]]).

---

## ٥. [[<ident>]] و [[<custom-ident>]] و [[<dashed-ident>]]: الكلمات

الكلمة من غير تنصيص في CSS اسمها identifier. فيه تلات أنواع:

| النوع | مين بيختار الاسم | أمثلة |
|---|---|---|
| [[<ident>]] | المواصفة: كلمات محجوزة ليها معنى | [[auto]] و [[bold]] و [[center]] و [[block]] و [[none]] و [[inherit]] |
| [[<custom-ident>]] | **انت**: اسم بتديه لحاجة | اسم عدّاد في [[counter-reset: step]]، واسم animation في [[animation-name: slide]]، واسم مساحة في الـ grid |
| [[<dashed-ident>]] | **انت**، بس بيبدأ بـ [[--]] | [[--brand]] (متغيّر CSS، درس «CSS variables») و [[--fade]] في [[@property]] |

### قواعد الاسم اللي بتختاره

- حروف وأرقام و [[-]] و [[_]]، و **ميبدأش برقم**: [[font-family: 1Segoe]] اترفضت (اتقاس).
- **حساس للحروف:** [[step]] غير [[Step]].
- [[<custom-ident>]] مينفعش يبقى كلمة من الكلمات العامة ([[inherit]] و [[initial]] و [[unset]] و [[default]]…)، لأن المتصفح هيفهمها كـ keyword مش اسم. اتقاس: [[animation-name: initial]] اتقبلت بس كـ «initial» (القيمة الابتدائية [[none]]) مش animation اسمها initial.
- [[animation-name: "slide"]] بـ string برضه اتقبلت (string بدل ident مسموح في دي).

~~~text القياس من Chrome
animation-name: slide       →  slide
counter-reset: items 3      →  items 3
--brand: #b45309  ثم  color: var(--brand)  →  rgb(180, 83, 9)
font-family: "Segoe UI", system-ui   →  "Segoe UI", system-ui
~~~

---

## ٦. [[display]] بكلمتين: [[<display-outside>]] و [[<display-inside>]]

درس «display» شرح [[block]] و [[inline]] و [[inline-block]] و [[none]]. المواصفة الحديثة بتقول إن [[display]] في الحقيقة **سؤالين**:

1. العنصر نفسه بيتصرف إزاي مع اللي حواليه؟ (برّه: [[block]] سطر لوحده، ولا [[inline]] جوه السطر)
2. أولاده بيترصّوا إزاي جواه؟ (جوه: [[flow]] عادي، و [[flow-root]]، و [[flex]]، و [[grid]]، و [[table]])

فالقيم القديمة اختصارات لكلمتين، و Chrome بيكتب المحسوب بالاختصار:

| الكلمتين | الاختصار القديم (المحسوب في Chrome) | يعني |
|---|---|---|
| [[display: block flow]] | [[block]] | سطر لوحده، وأولاده عادي |
| [[display: inline flow]] | [[inline]] | جوه السطر، وأولاده عادي |
| [[display: inline flow-root]] | [[inline-block]] | جوه السطر، وصندوق مستقل جواه |
| [[display: block flex]] | [[flex]] | سطر لوحده، وأولاده flex |
| [[display: inline flex]] | [[inline-flex]] | جوه السطر، وأولاده flex |
| [[display: inline grid]] | [[inline-grid]] | جوه السطر، وأولاده grid |
| [[display: block flow list-item]] | [[list-item]] | زي الـ li: سطر لوحده وليه علامة |
| [[display: inline list-item]] | [[inline list-item]] | جوه السطر وليه علامة، ومالهاش اختصار |

وأنواع القيم في المواصفة:

| النوع | الكلمات | بيحدد |
|---|---|---|
| [[<display-outside>]] | [[block]] و [[inline]] و [[run-in]] | العنصر برّه |
| [[<display-inside>]] | [[flow]] و [[flow-root]] و [[table]] و [[flex]] و [[grid]] و [[ruby]] | أولاده جوه |
| [[<display-listitem>]] | [[list-item]] (مع واحد من اللي فوق) | يعمل [[::marker]] زي الـ li |
| [[<display-internal>]] | [[table-row]] و [[table-cell]] و [[table-column]]… | حتة جوه جدول (اتقاس: [[table-row]] اتقبلت) |
| [[<display-box>]] | [[contents]] و [[none]] | [[none]] يخفي العنصر، و [[contents]] يشيل صندوقه ويسيب أولاده |
| [[<display-legacy>]] | [[inline-block]] و [[inline-flex]] و [[inline-grid]] و [[inline-table]] | الأسامي القديمة بكلمة واحدة |

اكتب بالشكل اللي يعجبك: الاختصار مفهوم في كل المتصفحات، والكلمتين (مدعومين في كل المتصفحات من 2023 حسب MDN) بيوضحوا الفكرة.

---

## ٧. [[<overflow>]]: قيم [[overflow]]

| القيمة | الكلام اللي زيادة عن الصندوق |
|---|---|
| [[visible]] | بيطلع برّه (الافتراضي) |
| [[hidden]] | بيتقص، وممكن يتسكرل بالكود بس |
| [[clip]] | بيتقص، ومفيش سكرول خالص |
| [[scroll]] | بيتقص، وشريط سكرول ظاهر دايمًا |
| [[auto]] | شريط سكرول لو احتاج بس |

و [[overflow]] بتقبل كلمتين: الأولى للأفقي ([[overflow-x]]) والتانية للرأسي ([[overflow-y]]):

~~~text القياس من Chrome
overflow: hidden          →  x: hidden   y: hidden
overflow: clip auto       →  x: clip     y: auto
overflow: visible scroll  →  x: auto     y: scroll   ← visible مع scroll بيتحوّل auto
~~~

التفاصيل والاستخدامات في درس «جدول responsive» ووحدة الـ layout.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[rotate: 90]] أو [[transition: 200]] من غير وحدة | السطر بيترمي، لأن الوقت والزاوية لازم وحدة |
| [[content: جديد]] من غير تنصيص | بيترمي، و content بتقبل string مش كلمة |
| اسم عدّاد بيبدأ برقم ([[1step]]) | مرفوض، الاسم ميبدأش برقم |
| [[--Brand]] و [[var(--brand)]] | اسمين مختلفين: الحروف بتفرق |
| [[transition-duration: -1s]] | مرفوضة، والمدة رجعت 0s |
| [[overflow: visible scroll]] متوقع الأفقي visible | بقى auto، لأن visible مع scroll مينفعوش مع بعض |

---

## الخلاصة

- [[<angle>]]: deg و grad و rad و turn، والمحسوب deg. [[<time>]]: s و ms، والمحسوب s. [[<resolution>]]: dppx و x و dpi و dpcm في الـ media. [[<frequency>]]: Hz و kHz، ومفيش حاجة بتستخدمه.
- [[<string>]] بين تنصيص، [[<ident>]] كلمة محجوزة، [[<custom-ident>]] اسمك (ميبدأش برقم ومش keyword)، [[<dashed-ident>]] اسم بـ [[--]].
- [[display]] = برّه + جوه ([[inline flow-root]] = [[inline-block]])، و [[overflow]] كلمتين: أفقي ثم رأسي.`,
          try: R`في Console على أي صفحة جرّب: [[CSS.supports("rotate", "0.5turn")]] و [[CSS.supports("transition-duration", "300")]] و [[CSS.supports("display", "inline flow-root")]] و [[matchMedia("(min-resolution: 2x)").matches]]. وبعدين افتح DevTools › Rendering وجرّب تحاكي شاشة موبايل (Ctrl+Shift+M) وشغّل السطر الأخير تاني.`,
          sol: R`~~~text القياس من Chrome 157 (على شاشة كمبيوتر عادية)
CSS.supports("rotate", "0.5turn")              →  true
CSS.supports("transition-duration", "300")     →  false   ← الوقت لازم وحدة
CSS.supports("display", "inline flow-root")    →  true
matchMedia("(min-resolution: 2x)").matches     →  false   ← شاشة 1x
~~~

ولما تفعّل محاكاة الموبايل في DevTools (Device Toolbar) وتختار جهاز زي Pixel أو iPhone، الـ DPR بيبقى 2 أو 3، و [[matchMedia("(min-resolution: 2x)").matches]] بترجّع [[true]]. (ده من تجربة DevTools، والرقم بيختلف حسب الجهاز اللي تختاره من القايمة.)

**ليه مفيد:** [[CSS.supports]] بيأكدلك النوع قبل ما تكتب CSS كتير، و [[resolution]] هو اللي بيقرر الصورة الأتقل تتحمّل ولا لأ.`,
          deep: {
            why: R`الأنواع دي بتظهر في كل حتة متقدمة: الحركة (وقت وزاوية)، والألوان (زاوية الـ hue)، والصور الحادة (resolution)، والعدّادات والمتغيرات (أسامي). ولو عارف إن [[custom-ident]] ميبدأش برقم، وإن الوقت لازم وحدة، وإن [[inline-block]] هو نفسه [[inline flow-root]]، هتقرا CSS أي حد وتفهمه.`,
            how: R`المتصفح بيقرا الأرقام اللي بعدها وحدة كـ «dimension»، والوحدة بتحدد النوع: [[deg]]/[[grad]]/[[rad]]/[[turn]] زاوية، و [[s]]/[[ms]] وقت، و [[Hz]]/[[kHz]] تردد، و [[dpi]]/[[dpcm]]/[[dppx]]/[[x]] دقة. القيمة المحسوبة بتتحوّل لوحدة أساسية (deg و s). الكلمات من غير تنصيص بتتقري identifiers، والخاصية بتقرر: كلمة من لستتها المحجوزة ([[<ident>]])، ولا اسم من عندك ([[<custom-ident>]])، ولا متغيّر ([[<dashed-ident>]]). و [[display]] بقت في المواصفة مجموعة كلمات (برّه وجوه وlist-item)، والأسامي القديمة اختصارات ليها.`,
            when: R`[[turn]] للفّات الكاملة والأنصاص، و [[deg]] للباقي. [[ms]] للحركات القصيرة (150–300ms) و [[s]] للأطول. [[resolution]] في media queries للصور. [[<string>]] في [[content]] و [[quotes]] وأسامي الخطوط اللي فيها مسافات. أسامي واضحة لعدّاداتك ومتغيراتك ([[--color-brand]] مش [[--c1]]).`,
            mistakes: R`نسيان الوحدة في الزاوية أو الوقت. [[content]] من غير تنصيص. اسم يبدأ برقم أو اسمه [[initial]]. خلط حروف كبيرة وصغيرة في اسم متغيّر. توقّع إن [[<frequency>]] بيعمل حاجة في المتصفح.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** شارة «خصم» عايزها واقفة على جنبها: لفّها **ربع لفة** بـ [[rotate]]، واكتب الزاوية بوحدة [[turn]] مش [[deg]]. (من قسم ١ في الشرح)`, done: R`الشارة واقفة على جنبها، والمحسوب [[90deg]]، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .badge { display: inline-block; margin: 40px; padding: 4px 12px; background: #b45309; color: white; }
</style>
<span class="badge">خصم ٣٠٪</span>`, checks: [
              { say: R`مايلة 90 درجة (المحسوب)`, q: ".badge", style: ["rotate", "90deg"] },
              { say: R`مكتوبة بوحدة [[turn]]`, src: "turn" }
            ] }, sol: R`~~~live 140 الحل
<style>
  .badge { display: inline-block; margin: 40px; padding: 4px 12px; background: #b45309; color: white; rotate: 0.25turn; }
</style>
<span class="badge">خصم ٣٠٪</span>
~~~

**هتشوف إيه:** شارة بني واقفة على جنبها والكلام من فوق لتحت.

**ليه كده:** اللفة الكاملة [[1turn]] = 360deg، فالربع [[0.25turn]] = 90deg، و Chrome بيكتب المحسوب بالدرجات. **الغلطة الشائعة:** [[rotate: 0.25]] من غير وحدة: مرفوضة.

~~~text القياس من Chrome
.badge   rotate: 90deg
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الزرار المفروض لونه يتغيّر بالراحة في 300 ملّي ثانية، بس بيتغيّر فجأة. لاقي الغلطة في سطر الوقت. (من قسم ٢: [[<time>]])`, done: R`المدة المحسوبة [[0.3s]]، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .btn { padding: 8px 16px; border: 0; background: #0f766e; color: white; transition-property: background-color; transition-duration: 300; }
  .btn:hover { background: #134e4a; }
</style>
<button class="btn">احجز حصة</button>`, checks: [
              { say: R`مدة الحركة 0.3 ثانية`, q: ".btn", style: ["transition-duration", "0.3s"] }
            ] }, sol: R`~~~live 70 بعد التصليح
<style>
  .btn { padding: 8px 16px; border: 0; background: #0f766e; color: white; transition-property: background-color; transition-duration: 300ms; }
  .btn:hover { background: #134e4a; }
</style>
<button class="btn">احجز حصة</button>
~~~

**هتشوف إيه:** زرار أخضر. وقّف الماوس عليه: بيغمق **بالراحة**. في الكود القديم كان بيغمق فجأة.

**ليه:** [[300]] من غير وحدة مش [[<time>]]، فالسطر اترمى والمدة رجعت [[0s]]. [[300ms]] (أو [[0.3s]]) صح، و Chrome بيكتبها [[0.3s]]. ([[transition]] بالتفصيل في وحدة الحركة.)

~~~text القياس من Chrome
قبل: transition-duration: 0s      بعد: 0.3s
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المفروض يبان «جديد» قبل اسم الدرس، بس مفيش حاجة ظاهرة. (من قسم ٤: [[<string>]])`, done: R`«جديد» ظاهرة، وكل الشروط ✓.`, work: { h: 70, start: R`<style>
  .lesson::before { content: جديد; margin-left: 6px; color: #b45309; font-weight: 700; }
</style>
<p class="lesson">الكسور العشرية</p>`, checks: [
              { say: R`قبل الكلام string «جديد»`, q: ".lesson", pseudo: "::before", style: ["content", "\"جديد\""] },
              { say: R`ولونها بني`, q: ".lesson", pseudo: "::before", style: ["color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 60 بعد التصليح
<style>
  .lesson::before { content: "جديد"; margin-left: 6px; color: #b45309; font-weight: 700; }
</style>
<p class="lesson">الكسور العشرية</p>
~~~

**هتشوف إيه:** «جديد» بني تقيلة، وبعدها بمسافة «الكسور العشرية».

**ليه:** [[content]] بيقبل [[<string>]]، والكلمة من غير تنصيص كانت هتتقري [[<ident>]] مش معروف، فالـ declaration كلها اترمت. لاحظ إن اللون والـ margin فضلوا شغالين بس مفيش حتة يترسموا عليها.

~~~text القياس من Chrome
قبل: content: none      بعد: content: "جديد"
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خطوات التسجيل عايز ترقّمها بعدّاد اسمه [[step]] يبدأ من صفر على القايمة. اكتب [[counter-reset]] باسم من عندك. (من قسم ٥: [[<custom-ident>]])`, done: R`[[counter-reset]] المحسوب [[step 0]]، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .steps { list-style: none; padding: 0; }
  .steps li::before { content: counter(step) ". "; color: #b45309; }
  .steps li { counter-increment: step; }
</style>
<ol class="steps"><li>سجّل</li><li>اختار الباقة</li><li>ادفع</li></ol>`, checks: [
              { say: R`القايمة عليها عدّاد اسمه [[step]] بيبدأ من 0`, q: ".steps", style: ["counter-reset", "step 0"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .steps { list-style: none; padding: 0; counter-reset: step; }
  .steps li::before { content: counter(step) ". "; color: #b45309; }
  .steps li { counter-increment: step; }
</style>
<ol class="steps"><li>سجّل</li><li>اختار الباقة</li><li>ادفع</li></ol>
~~~

**هتشوف إيه:** «1. سجّل» و «2. اختار الباقة» و «3. ادفع»، والأرقام بني.

**ليه كده:** [[step]] اسم [[<custom-ident>]] انت اخترته، و [[counter-reset: step]] من غير رقم معناها يبدأ من صفر (Chrome كتبه [[step 0]]). العدّادات بالتفصيل في درس «list-style و ::marker». **الغلطة الشائعة:** اسم زي [[1step]] (بيبدأ برقم) أو [[Step]] في سطر و [[step]] في التاني.

~~~text القياس من Chrome
.steps   counter-reset: step 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الشارة لازم تبقى جوه السطر وفي نفس الوقت تاخد padding وطول زي الصندوق، يعني [[inline-block]]، بس اكتبها **بالكلمتين** (برّه وجوه). (من قسم ٦)`, done: R`المحسوب [[inline-block]] والكود فيه [[flow-root]]، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .tag { padding: 4px 10px; background: #fef3c7; border: 1px solid #b45309; }
</style>
<p>الباقة دي <span class="tag">الأكتر طلبًا</span> عند الطلبة.</p>`, checks: [
              { say: R`الشارة [[inline-block]]`, q: ".tag", style: ["display", "inline-block"] },
              { say: R`مكتوبة بالكلمتين`, src: "inline flow-root" }
            ] }, sol: R`~~~live 70 الحل
<style>
  .tag { display: inline flow-root; padding: 4px 10px; background: #fef3c7; border: 1px solid #b45309; }
</style>
<p>الباقة دي <span class="tag">الأكتر طلبًا</span> عند الطلبة.</p>
~~~

**هتشوف إيه:** جملة واحدة في سطر، وجواها «الأكتر طلبًا» في صندوق أصفر بحد بني.

**ليه كده:** [[inline]] = برّه جوه السطر، و [[flow-root]] = جوه بيعمل «صندوق مستقل» زي الـ block. ده تعريف [[inline-block]] بالظبط، و Chrome بيكتب المحسوب بالاسم القديم.

~~~text القياس من Chrome
.tag   display: inline-block
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في Chrome، المحسوب بتاع [[rotate: 200grad]] هيبقى إيه؟ و [[transition-duration: 1500ms]]؟ و [[overflow: hidden auto]] (الـ [[overflow-x]] والـ [[overflow-y]])؟ (من قسم ١ و ٢ و ٧)`, done: R`كتبت 180deg و 1.5s و hidden و auto.`, sol: R`**الإجابة:** [[200grad]] نص لفة (اللفة 400) = [[180deg]]. [[1500ms]] = [[1.5s]]. و [[overflow: hidden auto]]: الأفقي [[hidden]] والرأسي [[auto]].

~~~live 120 الصفحة
<style>
  .b { display: inline-block; margin: 30px; padding: 4px 10px; background: #0f766e; color: white; rotate: 200grad; }
  .o { overflow: hidden auto; height: 50px; width: 200px; border: 1px solid #d6d3d1; }
</style>
<span class="b">مقلوبة</span>
<div class="o">كلام كتير بيعدّي الطول فبيظهر شريط سكرول رأسي بس، وأي حاجة عريضة بتتقص من غير شريط أفقي خالص.</div>
~~~

**هتشوف إيه:** شارة خضرا مقلوبة (الكلام بالمقلوب)، وصندوق صغير فيه شريط سكرول على الجنب بس.

~~~text القياس من Chrome
rotate: 180deg    transition-duration: 1.5s    overflow-x: hidden    overflow-y: auto
~~~` }
          ]
        },
        {
          cmd: "الوحدات كلها",
          title: "كل وحدة طول في CSS محسوبة بالبكسل: وحدات الخط، والشاشة بعيلتها s و l و d، والحاوية، والمطلقة، والـ px نفسه يعني إيه",
          pre: ["css/أنواع القيم: length و percentage"],
          ref: [
            { t: "MDN: <length> (all units)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length" },
            { t: "MDN: CSS values and units (guide)", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units" },
            { t: "MDN: Container query length units", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries#container_query_length_units" },
            { t: "CSS Values and Units Level 4: lengths", url: "https://www.w3.org/TR/css-values-4/#lengths" },
            { t: "CSS Values and Units Level 4: the reference pixel", url: "https://www.w3.org/TR/css-values-4/#reference-pixel" }
          ],
          desc: R`CSS فيه أكتر من ٤٠ وحدة طول، في أربع عيلات: **وحدات الخط** ([[em]] و [[rem]] و [[ch]] و [[lh]] وإخواتهم: بتتحسب من حجم الخط أو شكل حروفه)، و**وحدات الشاشة** ([[vw]] و [[vh]] و [[vmin]]، وكل واحدة منهم ليها نسخة [[s]] و [[l]] و [[d]] للموبايل)، و**وحدات الحاوية** ([[cqi]] و [[cqw]]… من عرض الأب اللي عليه container)، و**المطلقة** ([[px]] و [[cm]] و [[pt]]… ثابتة).
الدرس ده بيحسب **كل واحدة** بالبكسل في Chrome على مقاس معروف، وبيقولك إمتى تستخدم أنهي واحدة. ودرس «rem و em» و «dvh» و «container queries» شرحوا الأشهر بالتفصيل، هنا الجدول الكامل.`,
          example: R`<style>
  .article { max-width: 60ch; font-size: 1rem; line-height: 1.5; }
  .article h2 { font-size: 1.5em; margin-bottom: 0.5lh; }
  .article p + p { margin-top: 1lh; }
  .hero { min-height: 30svh; padding: 2vmin; background: #fef3c7; }
  .card { container-type: inline-size; width: 300px; border: 1px solid #d6d3d1; }
  .card h3 { font-size: 7cqi; margin: 0; }
</style>
<div class="hero">هيرو طوله تلت الشاشة الصغيرة</div>
<div class="article"><h2>عنوان المقال</h2><p>سطر المقال مبيعديش ٦٠ حرف عشان يتقري بسهولة.</p><p>والفقرة التانية بعيدة سطر.</p></div>
<div class="card"><h3>عنوان على قد الكارت</h3></div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`المقال أقصى عرض له 60 [[ch]] (حوالي 60 حرف)، وخطه [[1rem]] (خط الصفحة)، وسطوره 1.5 من الخط.`,
            R`العنوان [[1.5em]] من خط المقال، وتحته نص سطر ([[0.5lh]]: نص الـ line-height بتاع العنوان نفسه).`,
            R`بين كل فقرتين مسافة **سطر كامل** بالظبط ([[1lh]]).`,
            R`الهيرو طوله على الأقل [[30svh]] (30% من طول الشاشة لما شريط المتصفح ظاهر)، وجواه مسافة [[2vmin]] (2% من البُعد الأصغر في الشاشة).`,
            R`الكارت حاوية ([[container-type]]) عرضها 300px، فاللي جواه يقدر يستخدم وحدات [[cq]].`,
            R`عنوان الكارت خطه [[7cqi]] = 7% من عرض الكارت = 21px، فلو الكارت كبر الخط يكبر معاه.`,
            R`قفلة بلوك الـ CSS.`,
            R`الهيرو: شريط أصفر طوله تلت الشاشة تقريبًا.`,
            R`المقال: عنوان وفقرتين بينهم سطر فاضي.`,
            R`الكارت وعنوانه بخط محسوب من عرضه.`
          ],
          teach: R`## الفكرة في سطرين

[[<length>]] (الدرس اللي فات) = رقم + وحدة. الوحدة بتقول الرقم ده **من إيه**: من حجم الخط؟ من الشاشة؟ من الأب؟ ولا ثابت؟ كل الأرقام هنا اتحسبت في Chrome 157 (headless على Windows 11) بإني حطيت [[width: 1وحدة]] على عنصر وقريت [[getComputedStyle(el).width]].

**المقاسات اللي اتقاس عليها** (عشان تحسب نفس الأرقام):

~~~text الإعداد
html          font-size: 16px   line-height: 1.5 (= 24px)   font-family: Arial
العنصر        font-size: 20px   line-height: 30px          font-family: Arial
الشاشة        782 × 504 بكسل (الجزء اللي الصفحة بتترسم فيه في نافذة 800×600)
الحاوية       container-type: size   500 × 300 بكسل
~~~

> Chrome بيقرّب أي طول لأقرب **1/64 بكسل**: عشان كده [[1vw]] من 782 طلعت [[7.8125px]] مش [[7.82px]].

---

## ١. وحدات الخط

| الوحدة | يعني | بتتحسب من | اتقاس |
|---|---|---|---|
| [[1em]] | حجم خط العنصر نفسه (وفي [[font-size]] خط الأب) | [[font-size]] | [[20px]] |
| [[1rem]] | حجم خط الـ [[html]] (r = root) | خط الصفحة | [[16px]] |
| [[1ex]] | طول حرف [[x]] الصغير في الخط ده | شكل الخط | [[10.3594px]] (Arial: حوالي 0.52em) |
| [[1rex]] | نفس الكلام بخط الـ html | | [[8.29688px]] |
| [[1cap]] | طول الحروف الكبيرة (Capital) | شكل الخط | [[14.3125px]] (حوالي 0.72em) |
| [[1rcap]] | بخط الـ html | | [[11.4531px]] |
| [[1ch]] | عرض الرقم [[0]] في الخط ده | شكل الخط | [[11.1094px]] (Arial: حوالي 0.55em) |
| [[1rch]] | بخط الـ html | | [[8.89062px]] |
| [[1ic]] | عرض حرف صيني «水» (للغات الصينية واليابانية) | شكل الخط | [[20px]] (Arial مفيهوش، فبيرجع لـ 1em) |
| [[1ric]] | بخط الـ html | | [[16px]] |
| [[1lh]] | الـ [[line-height]] بتاع العنصر: طول سطر كامل | [[line-height]] | [[30px]] |
| [[1rlh]] | الـ line-height بتاع الـ html | | [[24px]] (1.5 × 16) |

### إمتى أستخدم إيه

- **[[rem]]** لأحجام الخطوط والمسافات العامة: بتحترم إعداد حجم الخط بتاع الزائر (درس «rem و em»).
- **[[em]]** للحاجات اللي لازم تكبر مع خط العنصر: padding الزرار، وأيقونة جنب كلام. وخلي بالك: بتتراكم لو متداخلة.
- **[[ch]]** لعرض الكلام: [[max-width: 60ch]] = سطر حوالي 60 حرف، وده أريح للعين. وفي العربي الحروف أعرض وأضيق، فالرقم تقريبي.
- **[[lh]]** للمسافات العمودية «بالسطر»: [[margin-top: 1lh]] = سطر فاضي بالظبط، فالكلام يفضل ماشي على نفس الإيقاع.
- [[ex]] و [[cap]] و [[ic]] نادرين: محاذاة أيقونة على طول الحروف، واللغات الآسيوية.

~~~live 160 سطر بالـ ch ومسافة بالـ lh
<style>
  .art { max-width: 30ch; line-height: 1.6; border-inline-start: 3px solid #b45309; padding-inline-start: 10px; }
  .art p { margin: 0; }
  .art p + p { margin-top: 1lh; }
</style>
<div class="art"><p>السطر هنا مبيعديش ٣٠ حرف تقريبًا، فالعين مبتتوهش وهي بترجع لأول السطر.</p><p>وبين الفقرتين سطر فاضي بالظبط.</p></div>
~~~

**هتشوف إيه:** عمود كلام ضيق بخط بني على يمينه، والسطور قصيرة. وبين الفقرتين فراغ قد سطر بالظبط.

---

## ٢. وحدات الشاشة (viewport)

| الوحدة | يعني | اتقاس (شاشة 782×504) |
|---|---|---|
| [[1vw]] | 1% من **عرض** الشاشة | [[7.8125px]] |
| [[1vh]] | 1% من **طول** الشاشة | [[5.03125px]] |
| [[1vi]] | 1% في اتجاه السطر (inline): العرض في العربي والإنجليزي | [[7.8125px]] |
| [[1vb]] | 1% في اتجاه الفقرات (block): الطول | [[5.03125px]] |
| [[1vmin]] | 1% من **الأصغر** بين العرض والطول | [[5.03125px]] |
| [[1vmax]] | 1% من **الأكبر** | [[7.8125px]] |
| [[100vw]] | الشاشة كلها عرض | [[782px]] |

[[vi]] و [[vb]] بيفرقوا عن [[vw]] و [[vh]] بس في الكتابة الرأسية ([[writing-mode: vertical-rl]]، درس «::first-letter و ::selection»).

### نسخ [[s]] و [[l]] و [[d]]

على الموبايل شريط العنوان بيظهر ويختفي مع السكرول، فطول الشاشة بيتغيّر. درس «dvh» شرح الفكرة بالتفصيل. كل وحدة من الست فوق ليها تلات نسخ:

| البادئة | يعني |
|---|---|
| [[s]] (small) | الشاشة **وهي أصغر حاجة**: شريط المتصفح ظاهر |
| [[l]] (large) | الشاشة **وهي أكبر حاجة**: الشريط مستخبي |
| [[d]] (dynamic) | الشاشة **دلوقتي**، وبتتغيّر وانت بتسكرل |

والـ 18 وحدة واحدة واحدة (اتقاست على الكمبيوتر):

| الوحدة | يعني | اتقاس |
|---|---|---|
| [[1svw]] | 1% من عرض الشاشة (small: الشريط ظاهر، فالشاشة أصغر حاجة) | [[7.8125px]] |
| [[1svh]] | 1% من طول الشاشة (small: الشريط ظاهر، فالشاشة أصغر حاجة) | [[5.03125px]] |
| [[1svi]] | 1% من اتجاه السطر (العرض) (small: الشريط ظاهر، فالشاشة أصغر حاجة) | [[7.8125px]] |
| [[1svb]] | 1% من اتجاه الفقرات (الطول) (small: الشريط ظاهر، فالشاشة أصغر حاجة) | [[5.03125px]] |
| [[1svmin]] | 1% من الأصغر بين العرض والطول (small: الشريط ظاهر، فالشاشة أصغر حاجة) | [[5.03125px]] |
| [[1svmax]] | 1% من الأكبر بين العرض والطول (small: الشريط ظاهر، فالشاشة أصغر حاجة) | [[7.8125px]] |
| [[1lvw]] | 1% من عرض الشاشة (large: الشريط مستخبي، فالشاشة أكبر حاجة) | [[7.8125px]] |
| [[1lvh]] | 1% من طول الشاشة (large: الشريط مستخبي، فالشاشة أكبر حاجة) | [[5.03125px]] |
| [[1lvi]] | 1% من اتجاه السطر (العرض) (large: الشريط مستخبي، فالشاشة أكبر حاجة) | [[7.8125px]] |
| [[1lvb]] | 1% من اتجاه الفقرات (الطول) (large: الشريط مستخبي، فالشاشة أكبر حاجة) | [[5.03125px]] |
| [[1lvmin]] | 1% من الأصغر بين العرض والطول (large: الشريط مستخبي، فالشاشة أكبر حاجة) | [[5.03125px]] |
| [[1lvmax]] | 1% من الأكبر بين العرض والطول (large: الشريط مستخبي، فالشاشة أكبر حاجة) | [[7.8125px]] |
| [[1dvw]] | 1% من عرض الشاشة (dynamic: الشاشة دلوقتي، وبتتغيّر مع الشريط) | [[7.8125px]] |
| [[1dvh]] | 1% من طول الشاشة (dynamic: الشاشة دلوقتي، وبتتغيّر مع الشريط) | [[5.03125px]] |
| [[1dvi]] | 1% من اتجاه السطر (العرض) (dynamic: الشاشة دلوقتي، وبتتغيّر مع الشريط) | [[7.8125px]] |
| [[1dvb]] | 1% من اتجاه الفقرات (الطول) (dynamic: الشاشة دلوقتي، وبتتغيّر مع الشريط) | [[5.03125px]] |
| [[1dvmin]] | 1% من الأصغر بين العرض والطول (dynamic: الشاشة دلوقتي، وبتتغيّر مع الشريط) | [[5.03125px]] |
| [[1dvmax]] | 1% من الأكبر بين العرض والطول (dynamic: الشاشة دلوقتي، وبتتغيّر مع الشريط) | [[7.8125px]] |

~~~text القياس من Chrome (كمبيوتر: مفيش شريط بيختفي)
1svh = 1lvh = 1dvh = 1vh = 5.03125px      1svw = 1lvw = 1dvw = 1vw = 7.8125px
100dvh = 504px
~~~

على الكمبيوتر التلاتة زي بعض. على الموبايل [[svh]] أصغر و [[lvh]] أكبر، و [[vh]] القديمة = [[lvh]] (عشان كده [[100vh]] بتطلع أطول من الشاشة وزرار تحت بيستخبى، ده تمرين في درس «dvh»).

| عايز | استخدم |
|---|---|
| هيرو مالي الشاشة ومفيش حاجة تستخبى تحت الشريط | [[min-height: 100svh]] |
| حاجة لازم تتبع الشاشة لحظة بلحظة (شات، تطبيق) | [[100dvh]] (بتعيد الحساب وانت بتسكرل، فاستخدمها بحساب) |
| خلفية تملا أكبر مساحة ممكنة | [[100lvh]] |
| خط بيكبر مع الشاشة | [[clamp(1rem, 0.8rem + 1vw, 1.5rem)]] (درس «clamp()»)، مش [[vw]] لوحده (الـ zoom مبيأثرش فيه) |

### [[100vw]] فخ

[[100vw]] بتشمل مكان شريط السكرول في الكمبيوتر، فعنصر [[width: 100vw]] بيطلع أعرض من الصفحة بحوالي 15px ويعمل سكرول أفقي (درس «dvh» قسم ٣). للعرض الكامل استخدم [[100%]].

---

## ٣. وحدات الحاوية (container)

بتتحسب من أقرب أب عليه [[container-type]] (درس «container queries»):

| الوحدة | يعني | اتقاس (حاوية 500×300) |
|---|---|---|
| [[1cqw]] | 1% من عرض الحاوية | [[5px]] |
| [[1cqh]] | 1% من طولها (محتاجة [[container-type: size]]) | [[3px]] |
| [[1cqi]] | 1% في اتجاه السطر (العرض) | [[5px]] |
| [[1cqb]] | 1% في اتجاه الفقرات (الطول) | [[3px]] |
| [[1cqmin]] | 1% من الأصغر | [[3px]] |
| [[1cqmax]] | 1% من الأكبر | [[5px]] |

~~~text القياس من Chrome
100cqi جوه الحاوية             →  500px
1cqw برّه أي حاوية              →  7.8125px   ← لو مفيش حاوية بتتحسب من الشاشة (زي svw)
~~~

[[cqi]] أشهرهم: خط أو مسافة بتكبر مع **مكان** الكارت مش مع الشاشة، فنفس الكارت يبان صح في عمود ضيق وفي صفحة عريضة.

~~~live 180 نفس الكارت في حاويتين: العنوان بيتبع عرض الكارت
<style>
  .wrap { container-type: inline-size; border: 1px dashed #a8a29e; margin-bottom: 8px; }
  .wrap h3 { font-size: 8cqi; margin: 6px; color: #0f766e; }
</style>
<div class="wrap" style="width: 320px"><h3>باقة الطلبة</h3></div>
<div class="wrap" style="width: 180px"><h3>باقة الطلبة</h3></div>
~~~

**هتشوف إيه:** نفس العنوان مرتين: في الصندوق العريض كبير (8% من 320 = 25.6px)، وفي الضيق صغير (8% من 180 = 14.4px)، والاتنين مالين صندوقهم بنفس الشكل.

---

## ٤. الوحدات المطلقة، والـ [[px]] يعني إيه

| الوحدة | يعني | بالبكسل (اتقاس) |
|---|---|---|
| [[1px]] | بكسل CSS | [[1px]] |
| [[1in]] | بوصة | [[96px]] |
| [[1cm]] | سنتيمتر (= 96 ÷ 2.54) | [[37.7812px]] |
| [[1mm]] | ملّي | [[3.76562px]] |
| [[4Q]] | ربع ملّي (Q = quarter-millimeter)، فـ 4Q = 1mm | [[3.76562px]] (و [[1Q]] = 0.9375px) |
| [[1pt]] | point: 1/72 بوصة (وحدة الطباعة) | [[1.32812px]]، و [[12pt]] = [[16px]] |
| [[1pc]] | pica: 12pt | [[16px]] |

~~~text القياس من Chrome: كلهم بوصة واحدة
96px = 2.54cm = 72pt = 6pc = 1in = 96px
~~~

### بكسل الـ CSS مش بكسل الشاشة

[[1px]] في CSS **وحدة ثابتة متفق عليها**، مش نقطة الشاشة الحقيقية. المواصفة بتعرّفه بإنه يبان قد زاوية معيّنة من مسافة قراية عادية (حوالي ربع ملّي على شاشة على بُعد دراع). على شاشة كثيفة (2x)، الـ [[1px]] = 2×2 نقط حقيقية. الرقم ده اسمه [[devicePixelRatio]] (اتقاس في الـ headless: 1).

فـ [[1cm]] على الشاشة **مش سنتي حقيقي بالمسطرة**: هو 37.78 بكسل CSS، وطوله الفعلي بيختلف من شاشة لشاشة. الوحدات دي مفيدة **في الطباعة بس** ([[@media print]]، درس «@media print»)، هناك الورقة بتتطبع بالمقاس الصح.

---

## ٥. [[1fr]]: مش طول

[[fr]] (fraction) وحدة **جزء من المساحة الفاضية** في الـ grid: [[grid-template-columns: 1fr 2fr]] = عمودين، التاني ضعف الأول. هي نوع [[<flex>]] مش [[<length>]]، فمتنفعش في [[width]]. درس «grid».

---

## ٦. الجدول اللي هترجعله

| عايز | الوحدة |
|---|---|
| حجم خط ومسافات عامة | [[rem]] |
| حاجة تكبر مع خط العنصر | [[em]] |
| عرض عمود كلام | [[ch]] (حوالي 45 لـ 75) |
| مسافة رأسية بالسطر | [[lh]] |
| طول شاشة كاملة على الموبايل | [[svh]] أو [[dvh]] |
| حجم بيتبع مكان الكارت | [[cqi]] |
| حد رفيع (1px) أو ضل | [[px]] |
| ورقة مطبوعة | [[cm]] و [[mm]] و [[pt]] |

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[em]] في عناصر متداخلة | الحجم بيتضاعف مع كل مستوى (درس «rem و em») |
| [[width: 100vw]] | سكرول أفقي قد شريط السكرول |
| [[height: 100vh]] على الموبايل | أطول من الشاشة، والحاجة اللي تحت بتستخبى |
| [[font-size: 4vw]] لوحده | الـ zoom مبيكبّرهوش، ومشكلة لضعاف النظر |
| [[cqh]] و [[container-type: inline-size]] | محتاج [[size]]، وإلا بيرجع لطول الشاشة |
| [[1cm]] متوقعها سنتي على الشاشة | مش حقيقية غير في الطباعة |
| [[ch]] متوقعها «حرف عربي» | هي عرض الرقم 0، والعربي بيختلف |

---

## الخلاصة

- الخط: [[em]] و [[rem]] (الحجم)، و [[ex]] و [[cap]] و [[ch]] و [[ic]] (شكل الحروف)، و [[lh]] (السطر)، وكل واحدة ليها نسخة [[r]] من الـ html.
- الشاشة: [[vw]] و [[vh]] و [[vi]] و [[vb]] و [[vmin]] و [[vmax]]، وكل واحدة بـ [[s]] و [[l]] و [[d]].
- الحاوية: [[cqw]] و [[cqh]] و [[cqi]] و [[cqb]] و [[cqmin]] و [[cqmax]].
- المطلقة: [[px]] (بكسل CSS مش بكسل الشاشة)، و [[in]] و [[cm]] و [[mm]] و [[Q]] و [[pt]] و [[pc]] للطباعة.`,
          try: R`اعمل صفحة فيها عنصر واحد، وفي DevTools › Elements غيّر [[width]] بتاعه لـ [[10ch]] ثم [[10ex]] ثم [[10lh]] ثم [[10vmin]]، وبص في Computed على العرض بالبكسل كل مرة. وبعدين غيّر [[font-family]] لخط تاني (مثلًا [[monospace]]) وشوف أنهي وحدة اتغيّرت.`,
          sol: R`~~~live 120 units.html
<style>
  .u { font-size: 20px; font-family: Arial; line-height: 30px; height: 20px; margin: 6px 0; background: #fde68a; }
</style>
<div class="u" style="width: 10ch">10ch</div>
<div class="u" style="width: 10ex">10ex</div>
<div class="u" style="width: 10lh">10lh</div>
~~~

**هتشوف إيه:** تلات شرايط صفرا بأطوال مختلفة: الأطول [[10lh]] (300px)، وبعده [[10ch]] (حوالي 111px)، والأقصر [[10ex]] (حوالي 104px).

~~~text القياس من Chrome (خط Arial حجمه 20px)
10ch   111.094px     10ex   103.594px     10lh   300px     10vmin   50.3125px (شاشة طولها 504)
~~~

ولما تغيّر الخط لـ [[monospace]]: [[ch]] و [[ex]] بيتغيّروا (بيتحسبوا من شكل الحروف)، و [[lh]] و [[vmin]] لأ (الـ line-height مكتوب بكسل، والشاشة زي ما هي). ده الفرق بين وحدات «حجم الخط» ووحدات «شكل الخط».`,
          deep: {
            why: R`الوحدة هي اللي بتقرر الحاجة دي هتتصرف إزاي لما حاجة تتغيّر: الزائر كبّر الخط، أو الشاشة لفّت، أو الكارت اتحط في عمود ضيق، أو الصفحة اتطبعت. لو اخترت الوحدة الغلط، التصميم يبان تمام عندك ويبوظ عند غيرك. والجدول الكامل بيخلّيك تقرا أي CSS وتفهم كل رقم.`,
            how: R`المتصفح بيحوّل كل الأطوال لبكسل CSS في القيمة المحسوبة: وحدات الخط من [[font-size]] (أو من مقاسات الخط الحقيقي زي ارتفاع x وعرض 0)، ووحدات الشاشة من الـ viewport (والـ s/l/d من الحالة الصغيرة/الكبيرة/الحالية لشريط المتصفح)، ووحدات الحاوية من أقرب container (ولو مفيش، من الشاشة الصغيرة)، والمطلقة بنِسب ثابتة (1in = 96px). وبعدها الـ device pixel ratio بيحوّل بكسل CSS لنقط الشاشة الحقيقية، وكل ده بيتقرّب لأقرب 1/64 بكسل.`,
            when: R`rem للأحجام، و em للي جوه المكوّن، و ch لعرض النص، و lh للإيقاع الرأسي، و svh/dvh لطول الشاشة على الموبايل، و cqi للمكونات اللي بتتحط في أماكن مختلفة، و px للحدود والضلال الرفيعة، و cm/pt للطباعة بس.`,
            mistakes: R`em متراكمة. 100vw مع سكرول. 100vh على الموبايل. vw لوحده في الخط. cqh من غير container-type: size. توقّع إن cm سنتي حقيقي على الشاشة. ونسيان إن ch وex بيتغيّروا مع الخط.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** فقرة شرح الدرس سطرها طويل جدًا على الشاشات العريضة. خلّي أقصى عرض ليها [[60ch]]. (من قسم ١ في الشرح)`, done: R`أقصى عرض للفقرة محسوب من الـ ch، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .lesson { line-height: 1.7; }
</style>
<p class="lesson">الكسور العشرية بتتكتب بعلامة عشرية بتفصل الجزء الصحيح عن الكسر، وكل خانة بعد العلامة بتبقى أصغر عشر مرات من اللي قبلها، فالرقم ٢٫٥ معناه اتنين ونص، والرقم ٠٫٢٥ معناه ربع.</p>`, checks: [
              { say: R`أقصى عرض 60ch (480px بالخط الافتراضي)`, q: ".lesson", style: ["max-width", "480px"] },
              { say: R`مكتوب بالـ [[ch]] مش بالبكسل`, src: "60ch" }
            ] }, sol: R`~~~live 160 الحل
<style>
  .lesson { line-height: 1.7; max-width: 60ch; }
</style>
<p class="lesson">الكسور العشرية بتتكتب بعلامة عشرية بتفصل الجزء الصحيح عن الكسر، وكل خانة بعد العلامة بتبقى أصغر عشر مرات من اللي قبلها، فالرقم ٢٫٥ معناه اتنين ونص، والرقم ٠٫٢٥ معناه ربع.</p>
~~~

**هتشوف إيه:** فقرة عمودها أضيق من الصفحة، والسطور أقصر وأريح.

**ليه 480px:** المعاينة من غير CSS خطها Times New Roman ‏16px، وعرض الرقم 0 فيه 8px، فـ 60 × 8 = 480. لو غيّرت الخط الرقم يتغيّر، وده المقصود: العرض بيتبع حجم الحروف. وفي العربي الرقم تقريبي لأن الحروف العربي عرضها مختلف عن «0».

~~~text القياس من Chrome
.lesson   max-width: 480px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** بين فقرات المقال مسافة قد **سطر كامل** بالظبط، مهما اتغيّر الـ [[line-height]]. استخدم [[lh]]. (من قسم ١: [[1lh]])`, done: R`المسافة بين الفقرتين 24px (سطر واحد)، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .post { font-size: 16px; line-height: 1.5; }
  .post p { margin: 0; }
</style>
<div class="post"><p>أول فقرة في المقال.</p><p id="second">التانية بعدها بسطر فاضي.</p></div>`, checks: [
              { say: R`الفقرة التانية بعيدة سطر كامل (24px)`, q: "#second", style: ["margin-top", "24px"] },
              { say: R`مكتوبة بالـ [[lh]]`, src: "lh" }
            ] }, sol: R`~~~live 110 الحل
<style>
  .post { font-size: 16px; line-height: 1.5; }
  .post p { margin: 0; }
  .post p + p { margin-top: 1lh; }
</style>
<div class="post"><p>أول فقرة في المقال.</p><p id="second">التانية بعدها بسطر فاضي.</p></div>
~~~

**هتشوف إيه:** سطرين بينهم فراغ قد سطر بالظبط.

**ليه كده:** [[1lh]] = الـ line-height المحسوب (1.5 × 16 = 24px). ولو غيّرت الـ line-height لـ 2 المسافة هتبقى 32px لوحدها. و [[p + p]] عشان المسافة تبقى **بين** الفقرات (درس «[attr] و combinators»).

~~~text القياس من Chrome
#second   margin-top: 24px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الشريط اللي فوق عرضه أكبر من الصفحة وبيعمل سكرول أفقي. خلّيه بعرض الصفحة بالظبط. (من قسم ٢: «[[100vw]] فخ»)`, done: R`عرض الشريط 784px (عرض الـ body)، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .bar { width: 100vw; padding: 8px 0; background: #0f766e; color: white; text-align: center; }
</style>
<div class="bar">خصم ٣٠٪ على باقة الطلبة</div>`, checks: [
              { say: R`الشريط بعرض الـ body بالظبط`, q: ".bar", style: ["width", "784px"] },
              { say: R`مفيش [[vw]]`, nosrc: "vw" }
            ] }, sol: R`~~~live 60 بعد التصليح
<style>
  .bar { width: 100%; padding: 8px 0; background: #0f766e; color: white; text-align: center; }
</style>
<div class="bar">خصم ٣٠٪ على باقة الطلبة</div>
~~~

**هتشوف إيه:** شريط أخضر بعرض الصفحة جواه الكلام في النص، ومفيش سكرول للجنب.

**ليه:** [[100vw]] = عرض الشاشة كله (800px في المربع)، بس الـ body ليه [[margin: 8px]] من المتصفح، فالمساحة 784. [[100%]] من عرض الأب بالظبط. وعلى الكمبيوتر كمان [[vw]] بتشمل شريط السكرول.

~~~text القياس من Chrome (مربع التمرين 800px)
قبل: width 800px      بعد: width 784px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت باقة عرضه 400px وعليه [[container-type: inline-size]]. خلّي خط العنوان **6% من عرض الكارت** بوحدة حاوية. (من قسم ٣)`, done: R`خط العنوان 24px، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .plan { container-type: inline-size; width: 400px; border: 1px solid #d6d3d1; padding: 0 10px; }
  .plan h3 { margin: 8px 0; }
</style>
<div class="plan"><h3>باقة الثانوية العامة</h3></div>`, checks: [
              { say: R`خط العنوان 24px (6% من 400)`, q: ".plan h3", style: ["font-size", "24px"] },
              { say: R`مكتوب بـ [[cqi]] أو [[cqw]]`, src: "cq" }
            ] }, sol: R`~~~live 90 الحل
<style>
  .plan { container-type: inline-size; width: 400px; border: 1px solid #d6d3d1; padding: 0 10px; }
  .plan h3 { margin: 8px 0; font-size: 6cqi; }
</style>
<div class="plan"><h3>باقة الثانوية العامة</h3></div>
~~~

**هتشوف إيه:** كارت بحد رمادي جواه عنوان متوسط الحجم.

**ليه 24 مش 26.4:** الـ [[cqi]] بيتحسب من **مساحة المحتوى** في الحاوية. الكارت [[width: 400px]] و [[box-sizing]] الافتراضي [[content-box]]، فمساحة المحتوى 400 بالظبط، والـ padding برّاها. 6% × 400 = 24px. ولو الكارت اتحط في مكان أضيق، العنوان يصغر معاه.

~~~text القياس من Chrome
.plan h3   font-size: 24px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** تذكرة حجز حصة هتتطبع، وعرضها لازم **8 سنتي** على الورق. اكتب العرض بوحدة طباعة. (من قسم ٤)`, done: R`العرض المحسوب 302.359px (8 × 37.8)، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .ticket { padding: 10px; border: 2px dashed #b45309; }
</style>
<div class="ticket">حصة فيزيا: السبت ٥ مساءً<br>رقم الحجز: ٤٨٢</div>`, checks: [
              { say: R`العرض 8cm`, q: ".ticket", style: ["width", "302.359px"] },
              { say: R`مكتوب بالسنتي`, src: "8cm" }
            ] }, sol: R`~~~live 100 الحل
<style>
  .ticket { width: 8cm; padding: 10px; border: 2px dashed #b45309; }
</style>
<div class="ticket">حصة فيزيا: السبت ٥ مساءً<br>رقم الحجز: ٤٨٢</div>
~~~

**هتشوف إيه:** تذكرة بحد بني متقطّع، عرضها حوالي 300 بكسل على الشاشة.

**ليه كده:** 1cm = 96 ÷ 2.54 = 37.795 بكسل CSS، و Chrome قرّب 8cm لـ 302.359px. على الشاشة ده مش 8 سنتي بالمسطرة، بس لما الصفحة تتطبع على ورق التذكرة هتطلع 8 سنتي (الطباعة بتعرف المقاس الحقيقي). المكان الطبيعي للسطر ده جوه [[@media print]].

~~~text القياس من Chrome
.ticket   width: 302.359px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** شاشة 1000×600. احسب بالبكسل: [[50vw]] و [[50vh]] و [[10vmin]] و [[10vmax]]. ولو لفّيت الموبايل وبقت 600×1000؟ (من قسم ٢)`, done: R`كتبت 500 و 300 و 60 و 100، وبعد اللف 300 و 500 و 60 و 100.`, sol: R`**الإجابة:**

~~~text الحساب
شاشة 1000×600:  50vw = 500px   50vh = 300px   10vmin = 60px (من 600)   10vmax = 100px (من 1000)
شاشة 600×1000:  50vw = 300px   50vh = 500px   10vmin = 60px            10vmax = 100px
~~~

**الفكرة:** [[vmin]] و [[vmax]] مبيفرقش معاهم الشاشة نايمة ولا واقفة، بيبصوا على الأصغر والأكبر بس. عشان كده [[vmin]] مفيد لحاجة لازم تفضل جوه الشاشة في الوضعين (مربع لعبة، أو لوجو كبير).

~~~live 120 مربع بـ vmin بيفضل جوه الشاشة
<style>
  .sq { width: 30vmin; aspect-ratio: 1; background: #fde68a; border: 2px solid #b45309; }
</style>
<div class="sq"></div>
~~~

**هتشوف إيه:** مربع أصفر. جرّب زراير الموبايل والتابلت فوق المعاينة: المربع بيصغر ويكبر على قد الضلع الأصغر، ومبيطلعش برّه أبدًا.` }
          ]
        },
        {
          cmd: "round() و sin() و pow()",
          title: "الدوال الرياضية في CSS: التقريب والباقي والإشارة، والمثلثات، والأُس والجذر واللوغاريتم، و env() و attr() بالنوع",
          pre: ["css/الوحدات كلها"],
          ref: [
            { t: "MDN: round()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/round" },
            { t: "MDN: mod()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/mod" },
            { t: "MDN: rem()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/rem" },
            { t: "MDN: abs()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/abs" },
            { t: "MDN: sign()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sign" },
            { t: "MDN: sin()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sin" },
            { t: "MDN: atan2()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/atan2" },
            { t: "MDN: pow()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/pow" },
            { t: "MDN: hypot()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/hypot" },
            { t: "MDN: log()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/log" },
            { t: "MDN: exp()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/exp" },
            { t: "MDN: calc-size()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc-size" },
            { t: "MDN: env()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env" },
            { t: "MDN: attr()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr" },
            { t: "CSS Values and Units Level 4: mathematical expressions", url: "https://www.w3.org/TR/css-values-4/#math" }
          ],
          desc: R`غير [[calc()]] و [[min()]] و [[max()]] و [[clamp()]] (درس «clamp()»)، CSS فيه آلة حاسبة كاملة: [[round()]] بيقرّب لأقرب خطوة ([[round(up, 117px, 10px)]] = 120px)، و [[mod()]] و [[rem()]] الباقي، و [[abs()]] و [[sign()]]، والمثلثات [[sin()]] و [[cos()]] و [[tan()]] وعكسهم [[asin()]] و [[acos()]] و [[atan()]] و [[atan2()]]، و [[pow()]] و [[sqrt()]] و [[hypot()]] و [[log()]] و [[exp()]].
ومعاهم دالتين بيجيبوا قيم من برّه الـ CSS: [[env()]] (من الجهاز: مساحة النوتش في الموبايل)، و [[attr()]] بالنوع الجديد (رقم أو طول أو لون من attribute في الـ HTML). وكلمة عن [[calc-size()]] اللي لسه مش في كل المتصفحات.`,
          example: R`<style>
  .scale { --step: 1.25; }
  .scale .h1 { font-size: calc(1rem * pow(var(--step), 3)); }
  .scale .h2 { font-size: calc(1rem * pow(var(--step), 2)); }
  .cols { width: round(down, 100% / 3, 8px); background: #fef3c7; }
  .dot { margin-inline-start: calc(cos(60deg) * 100px); width: 12px; height: 12px; background: #b45309; }
  .bar { padding-bottom: max(12px, env(safe-area-inset-bottom)); background: #0f766e; color: white; }
</style>
<div class="scale"><p class="h1">عنوان كبير</p><p class="h2">عنوان أصغر</p></div>
<div class="cols">تلت العرض مقرّب لمضاعف 8</div>
<div class="dot"></div>
<div class="bar">شريط تحت ومسافته محسوبة للنوتش</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`متغيّر فيه النِسبة اللي الخطوط هتكبر بيها كل درجة (1.25).`,
            R`أكبر عنوان: 1rem × 1.25 أُس 3 = 16 × 1.953 = 31.25px. [[pow(أ, ب)]] = أ مضروب في نفسه ب مرة.`,
            R`العنوان التاني: 1rem × 1.25² = 25px. نفس النِسبة، درجة أقل.`,
            R`العمود عرضه تلت الأب، **متقرّب لتحت** لأقرب مضاعف لـ 8px، عشان يفضل على شبكة الـ 8.`,
            R`نقطة بعيدة عن البداية [[cos(60deg) × 100px]] = 50px. زاوية بتتحول لمسافة.`,
            R`شريط تحت: المسافة اللي تحته الأكبر بين 12px ومساحة النوتش اللي الموبايل بيبلّغ عنها (على الكمبيوتر صفر، فـ 12px).`,
            R`قفلة بلوك الـ CSS.`,
            R`عنوانين: واحد 31.25px وواحد 25px.`,
            R`صندوق أصفر عرضه تلت الصفحة تقريبًا.`,
            R`نقطة بني صغيرة بعيدة 50px عن أول السطر.`,
            R`شريط أخضر وتحت كلامه 12px.`
          ],
          teach: R`## الفكرة في سطرين

[[calc()]] بيعمل جمع وطرح وضرب وقسمة. باقي الآلة الحاسبة دخل كل المتصفحات الأساسية بين 2023 و 2024 (المثلثات و pow و sqrt في 2023، و round و mod و rem في 2024، حسب MDN). الدوال دي ممكن تتكتب لوحدها مكان أي قيمة، أو جوه [[calc()]]، أو جوه بعض.

كل الأرقام من Chrome 157 (headless على Windows 11): حطيت كل دالة في [[width]] أو [[margin-top]] (عشان القيم السالبة) على عنصر جوه أب عرضه 400px، وقريت المحسوب.

> **قاعدة الوحدات:** الدوال اللي بتطلّع «رقم من غير وحدة» ([[sin()]] و [[pow()]] و [[log()]]…) لازم تضربها في وحدة: [[calc(sin(30deg) * 100px)]]. و [[pow(2px, 2)]] و [[sqrt(16px)]] اترفضوا (مينفعش px تربيع في CSS).

---

## ١. [[round()]]: التقريب لأقرب خطوة

[[round(<strategy>, القيمة, الخطوة)]]:

| الكود | المحسوب | ليه |
|---|---|---|
| [[round(117px, 10px)]] | [[120px]] | الأقرب (nearest هو الافتراضي) |
| [[round(nearest, 115px, 10px)]] | [[120px]] | في النص بالظبط: لفوق |
| [[round(up, 117px, 10px)]] | [[120px]] | لفوق دايمًا |
| [[round(down, 117px, 10px)]] | [[110px]] | لتحت دايمًا |
| [[round(down, -117px, 10px)]] | [[-120px]] | تحت = ناحية السالب |
| [[round(to-zero, -117px, 10px)]] | [[-110px]] | ناحية الصفر |
| [[round(-15px, 10px)]] | [[-10px]] | النص بالظبط بيروح لفوق (ناحية الموجب) |
| [[round(up, 100px / 3, 1px)]] | [[34px]] | 33.33 لفوق |
| [[round(15.5px)]] | **مرفوضة** | Chrome محتاج الخطوة لما فيه وحدة. اكتبها دايمًا |

**استخدامه:** تقفل الأرقام على شبكة (مضاعفات 4 أو 8 بكسل)، فالعناصر تبقى حادة ومظبوطة مع بعض: [[width: round(down, 100% / 3, 8px)]].

---

## ٢. [[mod()]] و [[rem()]]: الباقي

الاتنين بيرجّعوا باقي القسمة، والفرق في **الإشارة** لما فيه سالب:

| الكود | المحسوب | الإشارة من |
|---|---|---|
| [[mod(17px, 5px)]] | [[2px]] | |
| [[rem(17px, 5px)]] | [[2px]] | |
| [[mod(-17px, 5px)]] | [[3px]] | التاني (المقسوم عليه) |
| [[rem(-17px, 5px)]] | [[-2px]] | الأول (المقسوم) |
| [[mod(17px, -5px)]] | [[-3px]] | التاني |
| [[rem(17px, -5px)]] | [[2px]] | الأول |

[[mod()]] زي الساعة: بيلف ويرجع من الأول، فبيفضل موجب لو الخطوة موجبة. مفيد لحاجة بتتكرر (زاوية بتلف، أو نقشة كل كام بكسل). و [[rem()]] اسمه من remainder، **مالوش علاقة بوحدة [[rem]]**.

---

## ٣. [[abs()]] و [[sign()]]

| الكود | المحسوب |
|---|---|
| [[abs(-30px)]] | [[30px]]: القيمة من غير إشارة |
| [[calc(sign(-5px) * 10px)]] | [[-10px]]: sign بيرجّع -1 |
| [[calc(sign(0px) * 10px)]] | [[0px]]: sign بيرجّع 0 |
| [[calc(sign(20px) * 10px)]] | [[10px]]: sign بيرجّع 1 |

[[sign()]] مفيد مع المتغيرات: «لو القيمة دي سالب، اقلب الاتجاه». ولاحظ إن الـ [[width]] مبتقبلش سالب: لما جرّبت [[sign(-5px)]] في [[width]] المحسوب طلع [[0px]] (اتقص)، فالقياس الصح كان على [[margin-top]].

---

## ٤. المثلثات: [[sin()]] و [[cos()]] و [[tan()]]

بياخدوا **زاوية** ([[<angle>]] من درس «angle و time و ident»، أو رقم = radians) وبيرجّعوا رقم من -1 لـ 1 (tan أي رقم):

| الكود | المحسوب |
|---|---|
| [[calc(sin(30deg) * 100px)]] | [[50px]] (sin 30 = 0.5) |
| [[calc(cos(60deg) * 100px)]] | [[50px]] (cos 60 = 0.5) |
| [[calc(tan(45deg) * 100px)]] | [[100px]] (tan 45 = 1) |
| [[calc(sin(0.25turn) * 100px)]] | [[100px]] (ربع لفة = 90 درجة) |
| [[calc(sin(pi / 6) * 100px)]] | [[50px]] (π/6 radian = 30 درجة) |

### وعكسهم: [[asin()]] و [[acos()]] و [[atan()]] و [[atan2()]]

بياخدوا رقم وبيرجّعوا **زاوية**:

| الكود | الزاوية |
|---|---|
| [[asin(0.5)]] | 30deg: الزاوية اللي الـ sin بتاعها نص |
| [[acos(0.5)]] | 60deg: الزاوية اللي الـ cos بتاعها نص |
| [[atan(1)]] | 45deg: الزاوية اللي الـ tan بتاعها واحد |
| [[atan2(1px, -1px)]] | 135deg: زاوية النقطة (x = -1، y = 1) |
| [[rotate: atan2(3px, 4px)]] | المحسوب [[36.8699deg]]: زاوية مثلث ضلعيه 3 و 4 |

[[atan2(y, x)]] بتاخد قيمتين بنفس الوحدة وبتعرف الربع الصح من الإشارتين، عكس [[atan(y / x)]].

### ليه أصلًا؟ ترتيب حاجات على دايرة

~~~live 210 خمس نقط على دايرة، كل واحدة زاويتها من متغيّر
<style>
  .ring { position: relative; width: 180px; height: 180px; margin: 10px auto; border: 1px dashed #a8a29e; border-radius: 50%; }
  .ring span { --r: 80px; position: absolute; top: 50%; left: 50%; width: 24px; height: 24px; margin: -12px; border-radius: 50%; background: #b45309; color: white; font-size: 12px; text-align: center; line-height: 24px;
    translate: calc(cos(var(--a)) * var(--r)) calc(sin(var(--a)) * var(--r)); }
</style>
<div class="ring">
  <span style="--a: 0deg">1</span><span style="--a: 72deg">2</span><span style="--a: 144deg">3</span><span style="--a: 216deg">4</span><span style="--a: 288deg">5</span>
</div>
~~~

**هتشوف إيه:** دايرة متقطّعة، وعليها خمس دواير بني صغيرة متوزعة بالتساوي ومرقّمة من 1 لـ 5. كل واحدة [[x = cos(الزاوية) × نص القطر]] و [[y = sin(الزاوية) × نص القطر]]. ([[position]] و [[translate]] في وحدات جاية: هنا بس بيحطوا كل نقطة في نص الدايرة وبعدين يزقّوها بالمسافة اللي اتحسبت.)

---

## ٥. [[pow()]] و [[sqrt()]] و [[hypot()]] و [[log()]] و [[exp()]]

| الكود | المحسوب | يعني |
|---|---|---|
| [[calc(pow(2, 3) * 1px)]] | [[8px]] | 2 × 2 × 2 |
| [[calc(pow(1.25, 2) * 16px)]] | [[25px]] | درجة في سلّم خطوط |
| [[calc(sqrt(16) * 1px)]] | [[4px]] | الجذر التربيعي |
| [[hypot(30px, 40px)]] | [[50px]] | الوتر: √(30² + 40²). ده الوحيد فيهم اللي بيقبل وحدات |
| [[calc(log(100, 10) * 1px)]] | [[2px]] | لوغاريتم 100 للأساس 10 |
| [[calc(log(e) * 1px)]] | [[1px]] | من غير أساس = اللوغاريتم الطبيعي (أساس e) |
| [[calc(exp(1) * 10px)]] | [[27.1719px]] | e¹ × 10 (e حوالي 2.718) |

### سلّم الخطوط بـ [[pow()]]

أشهر استخدام: «type scale»، كل عنوان أكبر من اللي تحته بنفس النِسبة:

~~~live 170 سلّم خطوط بنِسبة 1.25
<style>
  .s { --r: 1.25; margin: 0; }
  .s.h1 { font-size: calc(1rem * pow(var(--r), 3)); }
  .s.h2 { font-size: calc(1rem * pow(var(--r), 2)); }
  .s.h3 { font-size: calc(1rem * pow(var(--r), 1)); }
  .s.p  { font-size: 1rem; }
</style>
<p class="s h1">31.25px: عنوان الصفحة</p>
<p class="s h2">25px: عنوان قسم</p>
<p class="s h3">20px: عنوان صغير</p>
<p class="s p">16px: الكلام العادي</p>
~~~

**هتشوف إيه:** أربع سطور كل واحد أصغر من اللي فوقه بنفس النِسبة. غيّر [[--r]] لـ 1.5 (في «عدّل وجرّب") والسلّم كله بيتغيّر من سطر واحد.

---

## ٦. الثوابت: [[pi]] و [[e]] و [[infinity]] و [[NaN]]

جوه أي دالة رياضية تقدر تكتب:

~~~text القياس من Chrome
calc(pi * 1px)          3.14062px      (π مقرّب لـ 1/64)
calc(e * 1px)           2.70312px
calc(infinity * 1px)    3.35544e+07px  ← أكبر رقم Chrome بيقبله (مفيد لـ border-radius: calc(infinity * 1px))
calc(100px / 0)         3.35544e+07px  ← القسمة على صفر = infinity
calc(NaN * 1px)         0px
~~~

---

## ٧. [[calc-size()]]: لسه مش في كل حتة

[[calc-size(auto, size + 20px)]] بتخليك تحسب على كلمات زي [[auto]] و [[fit-content]] (مثلًا حركة من [[height: 0]] لـ [[auto]]). Chrome 157 بيدعمها ([[CSS.supports("height", "calc-size(auto, size)")]] ‏true) ومعاها [[interpolate-size: allow-keywords]]، بس Firefox و Safari لأ (MDN)، فمنهج الكورس معتبرها مش Baseline. استخدمها كتحسين بس.

---

## ٨. [[env()]]: قيم من الجهاز

[[env(اسم, احتياطي)]] بيجيب قيمة الجهاز بيبلّغ عنها. أشهرهم مساحات «النوتش» والأركان المدورة في الموبايل:

| الاسم | يعني |
|---|---|
| [[safe-area-inset-top]] و [[-bottom]] و [[-left]] و [[-right]] | المسافة اللي لازم تسيبها عشان الكلام ميستخباش ورا النوتش أو شريط الـ home |
| [[titlebar-area-height]] وإخواته | في تطبيق ويب متسطّب بشكل معيّن (Window Controls Overlay) |
| [[keyboard-inset-height]] | طول الكيبورد اللي على الشاشة (لما يتفعّل من JavaScript) |

~~~text القياس من Chrome على الكمبيوتر
padding-top: env(safe-area-inset-top)              0px
padding-top: env(safe-area-inset-top, 20px)        0px    ← الاسم معروف وقيمته 0، فالاحتياطي مبيتستخدمش
padding-top: env(nope, 20px)                       20px   ← اسم مش معروف: الاحتياطي
padding-top: env(titlebar-area-height, 33px)       33px   ← مش تطبيق متسطّب: الاحتياطي
~~~

الفخ: الاحتياطي **مش** «أقل قيمة». على الكمبيوتر [[env(safe-area-inset-bottom, 12px)]] = 0. لو عايز «على الأقل 12px»: [[max(12px, env(safe-area-inset-bottom))]]. وعلى الآيفون لازم [[<meta name="viewport" content="..., viewport-fit=cover">]] عشان القيم تتبعت أصلًا (MDN).

---

## ٩. [[attr()]] بالنوع: أرقام من الـ HTML

درس «::before و ::after» استخدم [[attr()]] القديمة: نص بس، جوه [[content]] بس. الشكل الجديد بيقرا الـ attribute كـ **نوع** وبيشتغل في أي خاصية:

~~~text القياس من Chrome (على <div data-size="24" data-w="120px" data-c="#b45309">)
width: attr(data-w type(<length>))              →  120px
width: attr(data-size px)                       →  24px     ← الرقم + الوحدة
color: attr(data-c type(<color>))               →  rgb(180, 83, 9)
width: attr(data-missing type(<length>), 50px)  →  50px     ← مش موجود: الاحتياطي
~~~

~~~live 110 عرض كل شريط جاي من الـ HTML
<style>
  .bar { height: 18px; margin: 6px 0; background: #0f766e; color: white; font-size: 12px; padding: 0 6px; width: attr(data-pct %, 10%); }
</style>
<div class="bar" data-pct="80">رياضيات ٨٠٪</div>
<div class="bar" data-pct="45">فيزيا ٤٥٪</div>
~~~

**هتشوف إيه:** في Chrome: شريطين أخضر، الأول 80% من العرض والتاني 45%. في متصفح مبيدعمهاش الاتنين هيبقوا بعرض الصفحة كله، لأن السطر هيترمي.

**الحالة:** Chrome من أوائل 2025 بس، و Firefox و Safari لسه (MDN). فهي تحسين: اكتب قبلها سطر عادي للمتصفحات التانية، أو استخدم [[style="--pct: 80%"]] مع [[var()]] (درس «CSS variables») وده شغال في كل حتة.

---

## ١٠. باقي العيلة

| الدالة | اتشرحت فين |
|---|---|
| [[calc()]] | درس «clamp()» قسم ٥، ودرس «box model» |
| [[min()]] و [[max()]] و [[clamp()]] | درس «clamp()» من أوله لآخره |
| [[var()]] | درس «CSS variables» |

اتقاس للتأكيد: [[calc(100% - 2 * 20px)]] = 360px، و [[min(100%, 300px)]] = 300px، و [[max(50%, 250px)]] = 250px، و [[clamp(100px, 50%, 300px)]] = 200px (كلهم في أب 400px).

---

## ١١. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[sin(30deg) * 100px]] من غير [[calc()]] برّه | لازم تبقى جوه دالة رياضية عشان الضرب |
| [[pow(2px, 2)]] أو [[sqrt(16px)]] | مرفوضة: الوحدة برّه، اضرب بعدين |
| [[round(15.5px)]] من غير خطوة | مرفوضة في Chrome |
| [[rem()]] فاكرها وحدة rem | دي «باقي القسمة» |
| [[env(safe-area-inset-bottom, 12px)]] عشان «على الأقل 12» | بتطلع 0 على الكمبيوتر. استخدم [[max()]] |
| [[attr(data-x type(<length>))]] من غير بديل | في Firefox و Safari السطر بيترمي |
| قيمة سالب في [[width]] | بتتقص لـ 0 |

---

## الخلاصة

- [[round()]] بأربع طرق (nearest و up و down و to-zero)، و [[mod()]] الإشارة من التاني، و [[rem()]] من الأول، و [[abs()]] و [[sign()]].
- المثلثات بتاخد زاوية وترجّع رقم ([[sin()]] و [[cos()]] و [[tan()]])، والعكسية بترجّع زاوية ([[asin()]] و [[acos()]] و [[atan()]] و [[atan2()]]).
- [[pow()]] و [[sqrt()]] و [[log()]] و [[exp()]] أرقام من غير وحدة، و [[hypot()]] بالوحدة.
- [[env()]] من الجهاز (والاحتياطي مش حد أدنى)، و [[attr()]] بالنوع في Chrome بس، و [[calc-size()]] لسه مش Baseline.`,
          try: R`في «عدّل وجرّب» بتاع دايرة النقط، زوّد نقطة سادسة وغيّر الزوايا لـ 0 و 60 و 120 و 180 و 240 و 300. وبعدين غيّر [[--r]] لـ [[60px]]. وبعدين جرّب تكتب الزاوية من رقم النقطة: [[--a: calc(var(--i) * 60deg)]] مع [[style="--i: 2"]].`,
          sol: R`~~~live 210 ست نقط والزاوية من رقم كل نقطة
<style>
  .ring { position: relative; width: 180px; height: 180px; margin: 10px auto; border: 1px dashed #a8a29e; border-radius: 50%; }
  .ring span { --r: 60px; --a: calc(var(--i) * 60deg); position: absolute; top: 50%; left: 50%; width: 24px; height: 24px; margin: -12px; border-radius: 50%; background: #0f766e; color: white; font-size: 12px; text-align: center; line-height: 24px;
    translate: calc(cos(var(--a)) * var(--r)) calc(sin(var(--a)) * var(--r)); }
</style>
<div class="ring">
  <span style="--i: 0">0</span><span style="--i: 1">1</span><span style="--i: 2">2</span><span style="--i: 3">3</span><span style="--i: 4">4</span><span style="--i: 5">5</span>
</div>
~~~

**هتشوف إيه:** ست نقط خضرا على دايرة أصغر من الدايرة المتقطّعة (نص قطرها 60 بدل 80)، متوزعين زي أرقام ساعة بستة أرقام. النقطة 0 على اليمين، والعد ماشي مع عقارب الساعة (لأن y لتحت موجب في الشاشة).

**ليه كده:** كل نقطة بتحسب زاويتها من رقمها ([[var(--i) * 60deg]])، فلو زوّدت نقطة سابعة بـ [[--i: 6]] هتقع فوق النقطة 0 (360 = 0). عشان 7 نقط محتاج [[calc(var(--i) * 1turn / 7)]].

~~~text القياس من Chrome (النقطة رقم 1)
translate: calc(cos(60deg) * 60px) = 30px    و    calc(sin(60deg) * 60px) ≈ 51.96px
~~~`,
          deep: {
            why: R`كتير من الحسابات كانت بتتعمل بالـ JavaScript أو بأرقام مكتوبة بإيدك: توزيع حاجات على دايرة، وسلّم خطوط متناسق، وتقريب المقاسات على شبكة، ومسافات النوتش. الدوال دي بتخليها جوه الـ CSS، فبتتحسب لوحدها مع كل تغيير في الشاشة أو المتغيرات، من غير سكربت ولا تأخير.`,
            how: R`المتصفح بيقرا الدالة كـ «math function» زي [[calc()]] بالظبط: بيتأكد إن الوحدات متوافقة (طول مع طول، والأُس والجذر واللوغاريتم أرقام من غير وحدة)، وبيأجّل الحساب لحد ما يعرف قيم زي [[%]] و [[em]] و [[var()]]، وبعدين بيحسب الرقم ويقرّبه لـ 1/64 بكسل في الأطوال. المثلثات بتقبل [[<angle>]] أو رقم بالـ radian. و [[env()]] بتتقري من قيم المتصفح والجهاز (مش متغيرات بتكتبها)، والاحتياطي بيتستخدم بس لو الاسم مش معروف. و [[attr()]] الجديدة بتقرا الـ attribute وتفسّره بالنوع اللي في [[type()]]، ولو فشل بتاخد الاحتياطي.`,
            when: R`[[round()]] لقفل المقاسات على شبكة 4 أو 8. [[mod()]] لحاجة بتلف. [[sin()]] و [[cos()]] لتوزيع على دايرة أو حركة موجة. [[pow()]] لسلّم الخطوط والمسافات. [[hypot()]] لقطر مستطيل. [[env(safe-area-inset-*)]] لأي حاجة لازقة في حافة الشاشة على الموبايل. [[attr()]] بالنوع كتحسين بس لحد ما تبقى Baseline.`,
            mistakes: R`وحدة جوه pow أو sqrt. ضرب من غير calc. round من غير خطوة. الخلط بين rem() ووحدة rem. env مع احتياطي متوقعه حد أدنى. attr بالنوع من غير بديل. ونسيان إن width مبتقبلش سالب فالنتيجة تتقص.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** سلّم خطوط بنِسبة 1.25: عنوان [[.h1]] = [[1rem]] × 1.25 أُس 3، و [[.h2]] أُس 2. استخدم [[pow()]] جوه [[calc()]]. (من قسم ٥: «سلّم الخطوط»)`, done: R`[[.h1]] ‏31.25px و [[.h2]] ‏25px، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  p { margin: 4px 0; }
</style>
<p class="h1">باقات حصّة</p>
<p class="h2">اختار اللي يناسبك</p>
<p>كل الباقات فيها حصة تجربة ببلاش.</p>`, checks: [
              { say: R`[[.h1]] خطه 31.25px`, q: ".h1", style: ["font-size", "31.25px"] },
              { say: R`[[.h2]] خطه 25px`, q: ".h2", style: ["font-size", "25px"] },
              { say: R`محسوبين بـ [[pow(]]`, src: "pow(" }
            ] }, sol: R`~~~live 150 الحل
<style>
  p { margin: 4px 0; }
  .h1 { font-size: calc(1rem * pow(1.25, 3)); }
  .h2 { font-size: calc(1rem * pow(1.25, 2)); }
</style>
<p class="h1">باقات حصّة</p>
<p class="h2">اختار اللي يناسبك</p>
<p>كل الباقات فيها حصة تجربة ببلاش.</p>
~~~

**هتشوف إيه:** تلات سطور متدرّجة: «باقات حصّة» كبير، و «اختار اللي يناسبك» أصغر، والجملة العادية 16px.

**ليه كده:** 1.25³ = 1.953، × 16 = 31.25. و 1.25² = 1.5625، × 16 = 25. **الغلطة الشائعة:** [[pow(1.25rem, 3)]]: مرفوضة، الوحدة لازم برّه.

~~~text القياس من Chrome
.h1  font-size: 31.25px     .h2  font-size: 25px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** تلات كروت باقات، كل كارت عرضه **تلت** الصفحة اللي عرضها 400px، بس مقرّب **لتحت** لأقرب مضاعف لـ 8px عشان الشبكة. (من قسم ١: [[round()]])`, done: R`عرض الكارت 128px (133.33 لتحت)، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .row { width: 400px; }
  .plan { display: inline-block; padding: 10px 0; background: #fef3c7; text-align: center; box-sizing: border-box; }
</style>
<div class="row"><div class="plan">شهري</div><div class="plan">ترم</div><div class="plan">سنوي</div></div>`, checks: [
              { say: R`كل كارت عرضه 128px`, q: ".plan", style: ["width", "128px"] },
              { say: R`محسوب بـ [[round(]]`, src: "round(" }
            ] }, sol: R`~~~live 80 الحل
<style>
  .row { width: 400px; }
  .plan { display: inline-block; width: round(down, 100% / 3, 8px); padding: 10px 0; background: #fef3c7; text-align: center; box-sizing: border-box; }
</style>
<div class="row"><div class="plan">شهري</div><div class="plan">ترم</div><div class="plan">سنوي</div></div>
~~~

**هتشوف إيه:** تلات صناديق صفرا جنب بعض، وفيه مسافة صغيرة بينهم (المسافة اللي بين الـ inline-block، وكمان 400 − 3 × 128 = 16px فاضيين).

**ليه كده:** 400 ÷ 3 = 133.33، و [[down]] بتقرّب لتحت لأقرب 8: 128. **الغلطة الشائعة:** [[round(100% / 3, 8px)]] (nearest): هتطلع 136، و 3 × 136 = 408 أكبر من الصف، فالكارت التالت هينزل سطر.

~~~text القياس من Chrome
.plan   width: 128px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط الحجز اللازق تحت الشاشة: المسافة تحت كلامه **على الأقل 12px**، وعلى الموبايل اللي فيه شريط home تبقى قد مساحته لو أكبر. (من قسم ٨: الفخ)`, done: R`الـ padding-bottom على الكمبيوتر 12px، والكود فيه [[env(]]، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .book { padding: 12px 16px 0; background: #0f766e; color: white; }
</style>
<div class="book">احجز حصتك الجاية ←</div>`, checks: [
              { say: R`المسافة تحت 12px على الكمبيوتر`, q: ".book", style: ["padding-bottom", "12px"] },
              { say: R`بتقرا [[safe-area-inset-bottom]]`, src: "env(safe-area-inset-bottom" },
              { say: R`مش احتياطي جوه [[env]]، لأنه هيطلع 0`, nosrc: "env(safe-area-inset-bottom, 12px)" }
            ] }, sol: R`~~~live 60 الحل
<style>
  .book { padding: 12px 16px 0; padding-bottom: max(12px, env(safe-area-inset-bottom)); background: #0f766e; color: white; }
</style>
<div class="book">احجز حصتك الجاية ←</div>
~~~

**هتشوف إيه:** شريط أخضر فيه «احجز حصتك الجاية ←» بمسافة متساوية فوق وتحت.

**ليه كده:** على الكمبيوتر [[env(safe-area-inset-bottom)]] = 0، فـ [[max(12px, 0)]] = 12. على آيفون فيه شريط home ‏(حوالي 34px حسب الجهاز)، [[max]] هياخد الأكبر. **الغلطة الشائعة:** [[env(safe-area-inset-bottom, 12px)]]: الاحتياطي بيتستخدم لو الاسم مش معروف بس، والاسم معروف وقيمته 0، فالشريط هيبقى لازق.

~~~text القياس من Chrome (كمبيوتر)
padding-bottom: env(safe-area-inset-bottom, 12px)        →  0px
padding-bottom: max(12px, env(safe-area-inset-bottom))   →  12px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** نقطة الإشعار بعيدة عن أول السطر مسافة = [[sin(30deg) × 100px]]. اكتبها بـ [[sin()]] في [[margin-inline-start]]. (من قسم ٤)`, done: R`المسافة 50px، وكل الشروط ✓.`, work: { h: 70, start: R`<style>
  .dot { width: 14px; height: 14px; border-radius: 50%; background: #b45309; }
</style>
<div class="dot"></div>`, checks: [
              { say: R`المسافة 50px`, q: ".dot", style: ["margin-right", "50px"] },
              { say: R`محسوبة بـ [[sin(]]`, src: "sin(" }
            ] }, sol: R`~~~live 50 الحل
<style>
  .dot { width: 14px; height: 14px; border-radius: 50%; background: #b45309; margin-inline-start: calc(sin(30deg) * 100px); }
</style>
<div class="dot"></div>
~~~

**هتشوف إيه:** دايرة بني صغيرة بعيدة عن الحافة اليمين 50px.

**ليه [[margin-right]] في الشرط:** [[margin-inline-start]] = «أول السطر»، وفي صفحة عربي أول السطر يمين، فالمتصفح بيحطها في [[margin-right]]. و [[sin(30deg)]] = 0.5. **الغلطة الشائعة:** [[sin(30)]] من غير [[deg]]: الرقم بيتقري radian (30 radian)، والنتيجة -98.8px تقريبًا.

~~~text القياس من Chrome
.dot   margin-right: 50px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** احسب: [[mod(-7px, 3px)]] و [[rem(-7px, 3px)]] و [[round(up, -7px, 3px)]] و [[hypot(6px, 8px)]]. (من قسم ١ و ٢ و ٥)`, done: R`كتبت 2px و -1px و -6px و 10px.`, sol: R`**الإجابة:**

~~~text الحساب
mod(-7px, 3px)        →  2px     ← الإشارة من التاني (موجب): -7 = 3 × (-3) + 2
rem(-7px, 3px)        →  -1px    ← الإشارة من الأول (سالب): -7 = 3 × (-2) - 1
round(up, -7px, 3px)  →  -6px    ← لفوق = ناحية الموجب: -6 أكبر من -7
hypot(6px, 8px)       →  10px    ← √(36 + 64)
~~~

~~~live 110 الأربعة كـ margin على مربعات
<style>
  .b { width: 40px; height: 14px; background: #fde68a; border: 1px solid #b45309; }
</style>
<div class="b" style="margin-inline-start: calc(10 * mod(-7px, 3px))"></div>
<div class="b" style="margin-inline-start: calc(-10 * rem(-7px, 3px))"></div>
<div class="b" style="margin-inline-start: calc(-10 * round(up, -7px, 3px))"></div>
<div class="b" style="margin-inline-start: calc(10 * hypot(6px, 8px))"></div>
~~~

**هتشوف إيه:** أربع مستطيلات صغيرة، كل واحد مزقوق عن اليمين بـ 10 أضعاف الإجابة (20 و 10 و 60 و 100 بكسل)، فتشوف الأرقام بعينك.` }
          ]
        },
        {
          cmd: "@import و @charset",
          title: "ملف CSS بيجيب ملف تاني بـ @import (في layer أو بشرط)، وليه ده بيبطّأ الصفحة، و @charset و @namespace",
          pre: ["css/cascade", "css/[attr] و combinators"],
          ref: [
            { t: "MDN: @import", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import" },
            { t: "MDN: @charset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@charset" },
            { t: "MDN: @namespace", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@namespace" },
            { t: "MDN: Namespace separator", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Namespace_separator" },
            { t: "CSS Cascading and Inheritance Level 5: @import", url: "https://www.w3.org/TR/css-cascade-5/#at-import" },
            { t: "CSS Syntax Level 3: @charset", url: "https://www.w3.org/TR/css-syntax-3/#charset-rule" },
            { t: "CSS Namespaces Level 3", url: "https://www.w3.org/TR/css-namespaces-3/" }
          ],
          desc: R`[[@import url("base.css");]] في أول ملف CSS بيجيب ملف CSS تاني ويحطه مكانه. وممكن يحط الملف في طبقة ([[layer(base)]])، أو يجيبه بشرط: لو المتصفح بيدعم حاجة ([[supports(display: grid)]])، أو لشاشة معيّنة ([[screen and (min-width: 900px)]]). لازم يبقى **قبل** أي قاعدة، وإلا بيتجاهل.
بس كل [[@import]] طلب جديد مبيبدأش غير لما الملف اللي فيه يخلص، فالصفحة بتستنى أكتر (درس «critical CSS»)، والأسرع [[<link>]] لكل ملف. ومعاه [[@charset]] (الترميز، ونادرًا ما تحتاجه)، و [[@namespace]] للـ selectors على SVG أو XML.`,
          example: R`<style>
  @import url("data:text/css,.card%7Bborder:2px solid %23d6d3d1;padding:10px%7D") layer(base);
  @import url("data:text/css,.card%7Bbackground:%23fef3c7%7D") supports(display: grid);
  @import url("data:text/css,.card%7Bcolor:red%7D") print;
  .card { color: #0f766e; }
</style>
<div class="card">الكارت أخد الحد من ملف، والخلفية من ملف بشرط، واللون من القاعدة دي</div>`,
          flag: "script",
          lines: [
            R`بداية بلوك الـ CSS.`,
            R`أول [[@import]]: ملف (مكتوب هنا كـ [[data:]] URL عشان المعاينة تشتغل من غير ملفات) فيه حد و padding للكارت، وبيدخل في طبقة اسمها [[base]]. [[%7B]] و [[%7D]] هم [[{]] و [[}]] مكتوبين بشكل ينفع في الـ URL، و [[%23]] هي [[#]].`,
            R`تاني [[@import]]: ملف الخلفية الصفرا، بيتحمّل **بس** لو المتصفح بيفهم [[display: grid]] (كل المتصفحات النهارده).`,
            R`تالت [[@import]]: ملف بيلوّن الكلام أحمر، بس للطباعة ([[print]])، فعلى الشاشة مش بيتطبق.`,
            R`قاعدة عادية **بعد** كل الـ imports: لون الكلام أخضر. لو كانت قبلهم، الـ imports كلها كانت هتتجاهل.`,
            R`قفلة بلوك الـ CSS.`,
            R`الكارت: حد رمادي، وخلفية صفرا، وكلام أخضر.`
          ],
          teach: R`## الفكرة في سطرين

[[@import]] = «حط ملف CSS تاني هنا». بيخلّيك تقسم الـ CSS لملفات (reset، وأساسيات، ومكونات) وتجيبهم من ملف واحد. عنده قواعد صارمة في مكانه، وتكلفة في السرعة لازم تعرفها. ومعاه اتنين at-rules نادرين: [[@charset]] و [[@namespace]].

كل اللي هنا اتقاس في Chrome 157 (headless على Windows 11) على ملفات حقيقية في فولدر: [[p.html]] بيربط [[main.css]]، و [[main.css]] فيه [[@import]] لملفات تانية.

---

## ١. [[@import url("base.css");]]

~~~css main.css
@import url("base.css") layer(base);
@import "wide.css" screen and (min-width: 2000px);
@import "grid.css" supports(display: grid);
@import "nosup.css" supports(display: nonsense);
.card { padding: 4px; }
@import "late.css";
~~~

| السطر | جواه | اتطبق؟ (اتقاس على [[.card]]) |
|---|---|---|
| [[@import url("base.css") layer(base)]] | [[border: 3px]] ولون أحمر | الحد اتطبق ([[3px]])، واللون **خسر** (قسم ٢) |
| [[@import "wide.css" screen and (min-width: 2000px)]] | خلفية زرقا | لأ: الشاشة أصغر من 2000px |
| [[@import "grid.css" supports(display: grid)]] | [[margin-top: 7px]] | أيوه ([[7px]]) |
| [[@import "nosup.css" supports(display: nonsense)]] | [[margin-left: 9px]] | لأ ([[0px]]): المتصفح مبيدعمش القيمة دي |
| [[@import "late.css"]] بعد قاعدة | [[font-weight: 700]] | **لأ** ([[400]]): اتجاهل |

### القواعد

1. **مكانه أول الملف:** قبل أي قاعدة عادية. مسموح قبله بس [[@charset]] و [[@layer base, components;]] (السطر اللي بيعلن ترتيب الطبقات). أي [[@import]] بعد قاعدة **بيتجاهل من غير ولا رسالة** (اتقاس: [[late.css]] متطبقش).
2. **العنوان:** [[url("base.css")]] أو [["base.css"]] على طول، والاتنين زي بعض. والمسار نسبي **لملف الـ CSS** مش للصفحة (درس «المسارات: مطلق ونسبي»).
3. **الترتيب:** محتوى الملف بيتحط مكان السطر، فقواعده كأنها مكتوبة **قبل** قواعد الملف اللي استورده.

### بالترتيب: [[layer()]] ثم [[supports()]] ثم الـ media

~~~css
@import url("theme.css") layer(theme) supports(color: oklch(0 0 0)) screen and (min-width: 600px);
~~~

السطر ده: هات [[theme.css]]، حطه في طبقة [[theme]]، بس لو المتصفح بيفهم [[oklch]] والشاشة 600px أو أعرض. لازم الترتيب ده بالظبط. و [[layer]] لوحدها من غير اسم ([[@import "x.css" layer;]]) بتعمل طبقة من غير اسم.

---

## ٢. [[layer()]]: الملف المستورد في طبقة

درس «cascade» قال: أي قاعدة **برّه** الطبقات بتغلب أي قاعدة جوه طبقة، مهما كان الترتيب أو الوزن. فلو استوردت مكتبة أو reset جوه [[layer()]]، أي CSS منك بيغلبها:

~~~text القياس من Chrome
<style>.card { color: green }</style>   ← قاعدة برّه الطبقات، مكتوبة **قبل** الـ link
<link href="main.css">  ←  @import url("base.css") layer(base)  ←  .card { color: red }
النتيجة: rgb(0, 128, 0) أخضر         ← رغم إن الأحمر بعده، لأنه جوه طبقة
~~~

ده أنضف طريقة تجيب بيها CSS من برّه (مكتبة كروت أو reset) من غير ما تحارب الـ specificity بتاعته.

---

## ٣. ليه [[@import]] بيبطّأ الصفحة

المتصفح مبيعرفش إن [[main.css]] فيه [[@import "base.css"]] غير لما **ينزّل** [[main.css]] ويقراه. يعني:

~~~text ترتيب التحميل
بـ @import:   الصفحة ──► main.css (يستنى ينزل) ──► base.css ──► components.css     ← طلبات ورا بعض
بـ <link>:    الصفحة ──► main.css
                     ──► base.css          ← كلهم في نفس الوقت
                     ──► components.css
~~~

والصفحة **مبتترسمش** لحد ما كل الـ CSS اللي في [[<head>]] ينزل (الـ CSS «render-blocking»). فكل [[@import]] بيزوّد رحلة كاملة للسيرفر قبل أول رسمة. على نت بطيء، كل رحلة ممكن تبقى مئات الملّي ثانية.

> المقارنة دي من شرح MDN ومواصفة الـ cascade، مش متقاسة هنا: الملفات المحلية ([[file://]]) بتتقري في لحظة فمبيبانش فرق. القياس الحقيقي على الشبكة في درس «critical CSS» بـ DevTools › Network.

**الحل:**

- [[<link rel="stylesheet">]] لكل ملف في الـ HTML، فكلهم يتطلبوا مع بعض.
- أو أداة build (Vite وغيرها) بتجمع الـ imports في ملف واحد قبل النشر. ساعتها [[@import]] في الكود بتاعك مريح ومبيكلّفش حاجة.
- لو لازم [[@import]] من غير build: خليه مستوى واحد بس، مش ملف بيستورد ملف بيستورد ملف.

---

## ٤. [[@charset "utf-8";]]

بيقول للمتصفح الملف ده متكتب بأنهي ترميز (encoding). المتصفح بيدوّر على الترميز بالترتيب ده: علامة BOM في أول الملف، وبعدين الـ HTTP header ([[Content-Type: text/css; charset=utf-8]])، وبعدين [[@charset]]، وبعدين ترميز الصفحة اللي ربطته.

~~~text القياس من Chrome (ملف متكتب UTF-8 فيه content: "حصّة")
من غير @charset، والصفحة utf-8        →  "حصّة"            ← خد ترميز الصفحة
@charset "windows-1252"; (غلط)        →  "Ø­ØµÙ‘Ø©"         ← الحروف اتقرت بترميز غلط
~~~

القواعد:

- **أول حاجة في الملف بالظبط:** [[@charset "utf-8";]] بعلامة تنصيص مزدوجة ومسافة واحدة. قبله ولا مسافة ولا سطر فاضي، وإلا بيتجاهل.
- **مش بيتشاف في JavaScript:** مش بيظهر في [[cssRules]].
- **في الغالب مش محتاجه:** لو ملفاتك UTF-8 والسيرفر بيبعت الترميز والصفحة فيها [[<meta charset="utf-8">]] (درس «<!doctype html>»)، كله تمام. حطه بس لو الـ CSS فيه حروف مش إنجليزي (عربي في [[content]]) والملف ممكن يتفتح من مكان مالوش ترميز.
- **الترميز الغلط أسوأ من مفيش:** زي ما اتقاس فوق.

---

## ٥. [[@namespace]] و [[|]]

الـ namespace = «العنصر ده من لغة إيه؟». عنصر [[<a>]] ممكن يبقى HTML أو SVG (رسمة فيها لينك)، والاتنين ليهم نفس الاسم. [[@namespace]] بيدّي اسم قصير للغة، و [[|]] (الـ namespace separator) بيستخدمه في الـ selector:

~~~css
@namespace svg url(http://www.w3.org/2000/svg);
a { color: #0f766e; }
svg|a { fill: #b45309; }
~~~

| الـ selector | بيمسك |
|---|---|
| [[a]] (من غير default namespace) | أي [[<a>]]: HTML و SVG (اتقاس: الاتنين لونهم اتغيّر) |
| [[svg\|a]] | الـ [[<a>]] اللي جوه SVG بس |
| [[*\|a]] | [[<a>]] من أي namespace (زي [[a]] لما مفيش default) |
| [[\|a]] | [[<a>]] **من غير** namespace خالص. في صفحة HTML ولا عنصر (اتقاس: [[\|p]] رجّعت 0، لأن عناصر HTML ليها namespace XHTML) |

~~~text القياس من Chrome
CSS.supports("selector(svg|circle)")   →  false   ← من غير @namespace الاسم svg مش معروف
بعد @namespace svg url(...)           →  svg|a بيمسك الـ <a> اللي جوه <svg> بس
~~~

- **لازم في أول الملف:** بعد [[@charset]] و [[@import]]، وقبل القواعد.
- **default namespace:** [[@namespace url(http://www.w3.org/1999/xhtml);]] من غير اسم: كل selector من غير [[|]] يبقى HTML بس.
- **إمتى تحتاجه:** نادر جدًا في صفحات HTML. مفيد لما تنسّق ملف XML أو SVG لوحده، أو تفرّق بين [[a]] في HTML و [[a]] في SVG جوه نفس الصفحة.

---

## ٦. الـ at-rules بالترتيب في أول الملف

~~~css style.css
@charset "utf-8";
@layer reset, base, components;
@import url("reset.css") layer(reset);
@import url("base.css") layer(base);
@namespace svg url(http://www.w3.org/2000/svg);
.card { padding: 1rem; }
~~~

1. [[@charset]] (لو موجود) أول حاجة.
2. [[@layer]] اللي بيعلن الترتيب (درس «cascade»).
3. [[@import]] كلهم.
4. [[@namespace]].
5. القواعد العادية، و [[@media]] و [[@supports]] و [[@layer { }]] بقواعدها.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[@import]] بعد قاعدة | بيتجاهل من غير رسالة |
| سلسلة imports (ملف بيستورد ملف بيستورد ملف) | كل مستوى رحلة زيادة قبل ما الصفحة تترسم |
| مسار [[@import]] نسبي للصفحة | المسار نسبي لملف الـ CSS اللي فيه السطر |
| مكتبة مستوردة من غير [[layer()]] | بتحارب CSS بتاعك بالـ specificity |
| [[@charset]] بعد سطر فاضي أو بترميز غلط | بيتجاهل، أو الحروف العربي بتبوظ |
| [[svg\|a]] من غير [[@namespace]] | الـ selector غلط والقاعدة بتترمي |
| [[layer()]] بعد [[supports()]] | الترتيب غلط: layer الأول |

---

## الخلاصة

- [[@import url("x.css") layer(اسم) supports(شرط) media;]] بالترتيب ده، وفي أول الملف قبل أي قاعدة.
- [[layer()]] بيخلّي الملف المستورد سهل يتغلب. و [[supports()]] والـ media شروط.
- كل [[@import]] رحلة زيادة قبل الرسم: [[<link>]] لكل ملف أو build بيجمعهم.
- [[@charset "utf-8";]] أول سطر بالظبط ونادرًا ما تحتاجه. [[@namespace]] و [[|]] لـ SVG و XML.`,
          try: R`اعمل فولدر فيه [[index.html]] و [[main.css]] و [[base.css]]. في [[main.css]] اكتب [[.box { color: green; }]] وبعدها [[@import "base.css";]]، وفي [[base.css]] اكتب [[.box { border: 3px solid red; }]]. افتح الصفحة: الحد ظهر؟ وبعدين انقل الـ [[@import]] لأول سطر وشوف تاني. وافتح DevTools › Network وشوف [[base.css]] اتطلب إمتى.`,
          sol: R`~~~css main.css
@import "base.css";
.box { color: green; }
~~~

~~~css base.css
.box { border: 3px solid red; }
~~~

~~~view 70 الصفحة بعد ما الـ @import بقى أول سطر
<style>
  .box { border: 3px solid red; }
  .box { color: green; padding: 8px; }
</style>
<div class="box">صندوق بحد من base.css ولون من main.css</div>
~~~

**هتشوف إيه:** في الأول (الـ import بعد القاعدة): الكلام أخضر **ومفيش حد**، و [[base.css]] مش ظاهر في Network خالص لأن المتصفح اتجاهل السطر. بعد ما نقلته لأول سطر: حد أحمر 3px والكلام أخضر، و [[base.css]] ظهر في Network تحت [[main.css]]، وعمود «Initiator» جنبه مكتوب [[main.css]]: يعني اتطلب **من جوه** ملف تاني، بعد ما ده نزل.

~~~text القياس من Chrome
@import بعد القاعدة    border-top-width: 0px
@import في الأول       border-top-width: 3px    color: rgb(0, 128, 0)
~~~

(المعاينة فوق [[view]] من غير ملفات: الموقع مبيقدرش يقرا ملفات من جهازك، فالتلات سطور متجمعين في [[<style>]] واحد بنفس الترتيب.)`,
          deep: {
            why: R`في أي مشروع حقيقي الـ CSS بيبقى كذا ملف: reset، ومتغيرات، ومكونات، ومكتبة من برّه. [[@import]] بيجمعهم من ملف واحد، و [[layer()]] بيحل مشكلة المكتبة اللي بتغلب CSS بتاعك. بس لو استخدمته من غير ما تعرف تكلفته، الصفحة بتبقى بيضا ثانية أو اتنين زيادة على النت البطيء. و [[@charset]] و [[@namespace]] بيظهروا في ملفات قديمة أو SVG، فلازم تعرف تقراهم.`,
            how: R`المتصفح بيقرا [[main.css]] من الأول، ولما يلاقي [[@import]] في المكان المسموح بيبعت طلب للملف التاني (لو الشرط اتحقق: الـ media والـ supports بيتشافوا الأول، فلو مش متحققين الملف مش بيتطلب أو مبيتطبقش)، وبيحط قواعده مكان السطر في الترتيب، جوه الطبقة لو فيه [[layer()]]. أي [[@import]] بعد قاعدة عادية بيعتبره غلط ويتجاهله. الصفحة مبتترسمش لحد ما كل الـ CSS اللي بيمنع الرسم ينزل، والملفات المستوردة بتدخل في الحساب ده. [[@charset]] بيتقري كـ bytes قبل أي حاجة عشان المتصفح يعرف يفك الملف، و [[@namespace]] بيعرّف بادئة بتربط اسم بـ URL الـ namespace، وبعدها [[prefix|element]] بيطابق العناصر اللي من الـ namespace ده.`,
            when: R`[[@import]] مع أداة build (بتجمعه)، أو في مشروع صغير مستوى واحد. [[layer()]] لأي مكتبة أو reset من برّه. [[supports()]] لملف كامل بيعتمد على ميزة جديدة. الـ media لملف طباعة أو شاشات كبيرة. [[@charset]] بس لو الملف فيه حروف مش ASCII وممكن يتخدم من غير ترميز. [[@namespace]] لتنسيق SVG أو XML.`,
            mistakes: R`[[@import]] بعد قاعدة. سلسلة imports من غير build. مسار نسبي للصفحة بدل ملف الـ CSS. مكتبة من غير layer. [[@charset]] مش في أول byte أو بترميز غلط. [[svg|a]] من غير [[@namespace]]. ترتيب layer و supports و media غلط.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** الملف المستورد فيه حد الكارت، بس الحد مش ظاهر. لاقي ليه وصلّحها من غير ما تمسح أي سطر. (من قسم ١: «القواعد»)`, done: R`الحد الرمادي ظاهر واللون الأخضر لسه شغال، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .card { color: #0f766e; }
  @import url("data:text/css,.card%7Bborder:2px solid %23a8a29e;padding:10px%7D");
</style>
<div class="card">باقة الطلبة: ٩٠ جنيه في الشهر</div>`, checks: [
              { say: R`الحد اللي في الملف المستورد ظهر (2px)`, q: ".card", style: ["border-top-width", "2px"] },
              { say: R`اللون الأخضر لسه شغال`, q: ".card", style: ["color", "rgb(15, 118, 110)"] }
            ] }, sol: R`~~~live 80 بعد التصليح
<style>
  @import url("data:text/css,.card%7Bborder:2px solid %23a8a29e;padding:10px%7D");
  .card { color: #0f766e; }
</style>
<div class="card">باقة الطلبة: ٩٠ جنيه في الشهر</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 60 قبل
<style>
  .card { color: #0f766e; }
  @import url("data:text/css,.card%7Bborder:2px solid %23a8a29e;padding:10px%7D");
</style>
<div class="card">باقة الطلبة: ٩٠ جنيه في الشهر</div>
~~~

**هتشوف إيه:** في الحل كارت بحد رمادي ومسافة جوه، وكلامه أخضر. في «قبل» الكلام أخضر لوحده من غير حد ولا مسافة.

**ليه:** [[@import]] لازم قبل أي قاعدة عادية. بعدها المتصفح بيتجاهله من غير أي رسالة في الـ Console. (الملف مكتوب [[data:]] URL عشان التمرين يشتغل جوه الصفحة، وفي مشروعك هيبقى [[url("card.css")]].)

~~~text القياس من Chrome
قبل: border-top-width 0px      بعد: 2px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** بتستورد ملف «مكتبة كروت» بيلوّن الكلام أحمر، وانت عايز لونك الأخضر يكسب **حتى لو قاعدتك مكتوبة قبل الـ link** في صفحة تانية. استورد المكتبة جوه طبقة اسمها [[lib]]. (من قسم ٢: [[layer()]])`, done: R`الكلام أخضر والحد بتاع المكتبة لسه ظاهر، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  @import url("data:text/css,.card%7Bcolor:red;border:2px solid %23b45309;padding:10px%7D");
</style>
<style>
  .card { color: #0f766e; }
</style>
<style>
  @import url("data:text/css,.card%7Bcolor:red%7D");
</style>
<div class="card">الكارت بلون الموقع</div>`, checks: [
              { say: R`الكلام أخضر`, q: ".card", style: ["color", "rgb(15, 118, 110)"] },
              { say: R`حد المكتبة لسه ظاهر`, q: ".card", style: ["border-top-width", "2px"] },
              { say: R`المكتبة جوه [[layer(lib)]]`, src: "layer(lib)" }
            ] }, sol: R`~~~live 80 الحل
<style>
  @import url("data:text/css,.card%7Bcolor:red;border:2px solid %23b45309;padding:10px%7D") layer(lib);
</style>
<style>
  .card { color: #0f766e; }
</style>
<style>
  @import url("data:text/css,.card%7Bcolor:red%7D") layer(lib);
</style>
<div class="card">الكارت بلون الموقع</div>
~~~

**هتشوف إيه:** كارت بحد بني وكلامه أخضر.

**ليه كده:** فيه ملفين مستوردين بيلوّنوا أحمر، والتاني **بعد** قاعدتك. من غير طبقة، الأحمر كان هيكسب لأنه الأخير بنفس الوزن. جوه [[layer(lib)]]، أي قاعدة برّه الطبقات (قاعدتك) بتغلبه مهما كان مكانها. والحد فضل لأن قاعدتك مبتقولش حاجة عن الحد.

~~~text القياس من Chrome
.card   color: rgb(15, 118, 110)   border-top-width: 2px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** في الصفحة لينك عادي ولينك جوه رسمة SVG. لوّن **اللي جوه SVG بس** بـ [[fill: #b45309]] باستخدام [[@namespace]] و [[|]]، من غير class. (من قسم ٥)`, done: R`كلام الرسمة بني واللينك العادي زي ما هو، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
</style>
<p><a href="#plans">شوف الباقات</a></p>
<svg width="200" height="30"><a href="#plans"><text x="10" y="20">الباقات في رسمة</text></a></svg>`, checks: [
              { say: R`كلام الرسمة بني`, q: "svg text", style: ["fill", "rgb(180, 83, 9)"] },
              { say: R`فيه [[@namespace]]`, src: "@namespace" },
              { say: R`ومفيش class`, q: "[class]", n: 0 }
            ] }, sol: R`~~~live 80 الحل
<style>
  @namespace svg url(http://www.w3.org/2000/svg);
  svg|a { fill: #b45309; }
</style>
<p><a href="#plans">شوف الباقات</a></p>
<svg width="200" height="30"><a href="#plans"><text x="10" y="20">الباقات في رسمة</text></a></svg>
~~~

**هتشوف إيه:** «شوف الباقات» لينك أزرق عادي، وتحته «الباقات في رسمة» بني.

**ليه كده:** [[svg|a]] بيمسك [[<a>]] من namespace الـ SVG بس، و [[fill]] (لون الرسم في SVG) بيتورث للـ [[<text>]] اللي جواه. **الغلطة الشائعة:** [[svg|a]] من غير سطر [[@namespace]]: الـ selector غلط والقاعدة بتترمي. أو [[a { fill }]]: هتمسك الاتنين (بس [[fill]] مبتأثرش على كلام HTML، فالفرق مش هيبان هنا، وهيبان لو استخدمت [[color]]).

~~~text القياس من Chrome
svg text   fill: rgb(180, 83, 9)
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك عامل [[style.css]] فيه تلات سطور [[@import]] لملفات، وكل ملف منهم فيه [[@import]] لملف تاني. اشرحله في ٣ سطور ليه الصفحة بطيئة، وإيه الحل. (من قسم ٣)`, done: R`كتبت إن الطلبات بقت ورا بعض في مستويين، والصفحة مبتترسمش قبلهم، والحل link لكل ملف أو build.`, sol: R`**إجابة نموذجية:**

1. المتصفح مبيعرفش الملفات المستوردة غير بعد ما ينزّل [[style.css]] ويقراه، وبعدين مبيعرفش المستوى التاني غير بعد ما ينزّل الملفات دي. يعني تلات رحلات للسيرفر **ورا بعض** بدل رحلة واحدة.
2. والصفحة مبتترسمش لحد ما الـ CSS كله ينزل، فكل رحلة زيادة = وقت الزائر شايف فيه صفحة بيضا.
3. الحل: [[<link rel="stylesheet">]] لكل ملف في الـ [[<head>]] (كلهم بيتطلبوا مع بعض)، أو أداة build زي Vite تجمعهم في ملف واحد قبل النشر. ولو لازم [[@import]]، يبقى مستوى واحد.

~~~text ترتيب التحميل
@import متداخل:   HTML → style.css → a.css → a-1.css     (٣ رحلات ورا بعض قبل الرسم)
<link> لكل ملف:   HTML → style.css + a.css + a-1.css    (رحلة واحدة بالتوازي)
~~~

(من MDN ودرس «critical CSS»، اللي بيقيس ده في DevTools › Network.)` }
          ]
        },
      ]
    }
]);
