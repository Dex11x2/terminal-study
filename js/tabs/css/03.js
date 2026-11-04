// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الجداول",
      projects: [
        { lvl: 'صغير', t: R`جدول باقات جيم متخيل`, what: R`جدول بيقارن ٣ باقات لـ «جيم الأبطال» (شهري، ٣ شهور، سنوي): caption، و th بـ [[scope="col"]] لأسامي الباقات، و th بـ [[scope="row"]] لكل ميزة (السعر، الحصص، الساونا)، وعلامة ✓ أو ✗ في الخلايا ومعاها كلام مخفي بالشكل للقارئ («موجود» أو «مش موجود»)، و tfoot فيه زرار «اشترك» لكل باقة. من درس «table».`, done: R`تاب Accessibility بيقول [[columnheader]] لأسامي الباقات و [[rowheader]] للمميزات، واسم الجدول من الـ caption، وقارئ الشاشة (أو ARIA snapshot) بيقرا «الساونا، سنوي، موجود» مش «✓» بس.` },
        { lvl: 'صغير', t: R`مواعيد عيادة على الموبايل`, what: R`جدول مواعيد أطبا لـ «عيادة الشفاء» فيه ٧ أعمدة (أيام الأسبوع) جوه wrapper بـ [[overflow-x: auto]] و [[tabindex="0"]] و [[role="region"]]، وأول عمود (اسم الدكتور) [[position: sticky]] على [[inset-inline-start: 0]] عشان يفضل ظاهر وانت بتعمل scroll. من درس «جدول responsive».`, done: R`على 360px الصفحة مفيهاش scroll أفقي ([[document.documentElement.scrollWidth]] = 360) والجدول بس اللي بيتحرك، واسم الدكتور فاضل مكانه وانت بتتحرك، والـ wrapper بياخد focus بـ Tab والأسهم بتحرّكه.` },
        { lvl: 'متوسط', t: R`لوحة طلبات لمتجر متخيل`, what: R`جدول طلبات فيه ٣٠ طلب من JSON: عناوين لازقة فوق، وصفوف مخططة، وحالة كل طلب شارة ملوّنة (مدفوع، مستني، ملغي) بلون خلفية فاتح ولون كلام غامق من نفس العيلة، وعمود أرقام [[tabular-nums]]، وترتيب بأزرار جوه الـ th و [[aria-sort]]، والحالة كلها في الـ URL. من دروس الوحدة كلها.`, done: R`الضغط على «الإجمالي» بيرتب تصاعدي وتاني ضغطة تنازلي، والـ URL بيتغيّر و Back بيرجّع الترتيب اللي قبله، والـ refresh بيفتح على نفس الترتيب، وكل شارة تباينها 4.5:1 أو أكتر في DevTools، و axe صفر violations.` },
        { lvl: 'متوسط', t: R`كتالوج كتب بالبحث والصفحات`, what: R`جدول ١٠٠ كتاب لـ «مكتبة الحروف» (اسم متخيل): حقل بحث بيفلتر بالعنوان أو الكاتب ويكتب [[?q=]] بـ [[replaceState]] (مش مع كل حرف خطوة history)، وصفحات ٢٠ كتاب بأزرار «اللي قبله» و «اللي بعده» وأرقام، وعداد «لقينا ١٢ كتاب» عليه [[aria-live="polite"]]. من درس «ترتيب وصفحات في الـ URL».`, done: R`كتابة «نجيب» بتفلتر من غير reload وزرار Back بيرجّعك للصفحة اللي قبل البحث بضغطة واحدة، و [[?page=99]] بيفتح آخر صفحة مش صفحة فاضية، و [[?q=]] بكلمة عربي بيشتغل لو اتبعت لحد تاني.` },
        { lvl: 'كبير', t: R`فاتورة ومخزن لمحل متخيل`, what: R`أداة لمحل أدوات منزلية متخيل: فورم بيزوّد صنف (الاسم، والكمية، والسعر) لجدول الفاتورة، والإجمالي والضريبة بيتحسبوا في الـ tfoot، وحذف صنف بزرار ليه [[aria-label]] باسم الصنف، والفاتورة بتتحفظ في localStorage وترجع بعد الـ refresh، ورقم الفاتورة بيزيد لوحده. وصفحة الطباعة: A4 بهامش 12mm، ورقم «صفحة ١ من ٢» تحت، والـ thead والـ tfoot بيتكرروا، والصف مبيتقطعش، والأزرار والفورم مخفيين، وشعار المحل ولون عنوان الجدول بيتطبعوا. يجمع الوحدة دي مع وحدة الفورم.`, done: R`بـ ٤٠ صنف الـ Save as PDF بيطلع أكتر من ورقة وكل ورقة فيها العناوين فوق والإجمالي تحت ورقمها، ومفيش زرار ولا حقل في الورق، والرقم الغلط (كمية 0 أو سعر سالب) بيترفض برسالة جنب الحقل، والـ refresh مبيضيّعش الفاتورة، والطباعة مرتين ورا بعض بتطلع نفس الـ PDF، و axe صفر violations على الشاشة.`, ext: R`زوّد تصدير CSV بزرار، وفلتر بالتاريخ، ونسخة «إيصال كاشير» بـ [[size: 80mm 200mm]]، وخلي الـ PDF يتعمل في السيرفر بـ Playwright ([[page.pdf]]) لما تتعلم Node.` },
        { lvl: 'فكرة', t: R`جدول لحاجة بتتابعها انت`, what: R`مصاريفك، أو ماتشات فريقك، أو مذاكرتك: جدول بياناته حقيقية من عندك، بترتيب وبحث وصفحة طباعة. انت اللي تحدد الأعمدة.`, done: R`فيه ٣٠ صف حقيقي على الأقل، والترتيب والبحث في الـ URL، والطباعة نضيفة، وواحد صاحبك فتح اللينك وشاف نفس الترتيب.`, ext: R`زوّد رسم بياني بسيط بـ SVG أو CSS (أعمدة بـ [[height]] من متغير) جنب الجدول.` },
      ],
      l: 1,
      n: "جدول بيانات حقيقي: عناوين مربوطة بالخلايا، وبيتعرض على الموبايل، وبيترتب ويتقسم صفحات",
      items: [
        {
          cmd: "table",
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** جدول حصص أسبوعي لـ «جيم الأبطال»: الأيام في الـ thead (th بـ [[scope="col"]])، والأوقات أول عمود (th بـ [[scope="row"]])، وحصة طولها ساعتين بـ [[rowspan="2"]]، و caption «جدول الحصص».`, done: R`الجدول مفيهوش خلية زيادة ولا ناقصة (كل صف عدد خلاياه صح بعد حساب الـ rowspan)، والخلية الطويلة ارتفاعها قد صفين ([[getBoundingClientRect]])، وتاب Accessibility بيقول columnheader للأيام و rowheader للأوقات.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جدول الحصص</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  table { border-collapse: collapse; width: 100%; max-width: 640px; }
  caption { font-weight: 700; padding-block-end: 8px; }
  th, td { border: 1px solid #a1a1aa; padding: 8px; text-align: center; }
  thead th { background: #f4f4f5; }
</style>
</head>
<body>
<main>
<h1>جيم الأبطال</h1>
<table>
  <caption>جدول الحصص</caption>
  <thead>
    <tr>
      <th scope="col">الوقت</th>
      <th scope="col">السبت</th>
      <th scope="col">الأحد</th>
      <th scope="col">الاتنين</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">6 م</th>
      <td id="long" rowspan="2">كروس فت (ساعتين)</td>
      <td>يوجا</td>
      <td>ملاكمة</td>
    </tr>
    <tr>
      <th scope="row">7 م</th>
      <td>سباحة</td>
      <td>يوجا</td>
    </tr>
    <tr>
      <th scope="row">8 م</th>
      <td>ملاكمة</td>
      <td>—</td>
      <td>كارديو</td>
    </tr>
  </tbody>
</table>
</main>
</body>
</html>
~~~

**السطر اللي بيلخبط:** الخلية اللي عليها [[rowspan="2"]] واخدة مكان في الصف اللي تحتها. فالصف بتاع «7 م» فيه عنوان وخليتين بس، مش ٣. لو كتبت خلية زيادة الصف هيطلع عمود خامس.

- [[scope="col"]] يعني العنوان ده لكل العمود اللي تحته، و [[scope="row"]] لكل الصف اللي جنبه. قارئ الشاشة بيستخدمهم عشان يقول «الأحد، 6 م، يوجا» مش «يوجا» بس.
- [[caption]] لازم أول ابن في [[table]]، وهو اسم الجدول.
- [[border-collapse: collapse]] بيخلي الحدود خط واحد.

**الغلطة الشائعة:** تحسب عدد الخلايا في كل صف من غير ما تنقص الـ rowspan. جرّب [[table.rows[1].cells.length]] تلاقيها ٣ وباقي الصفوف ٤، وده صح مش غلط.

~~~text الناتج
عدد الخلايا في كل صف: 4 , 4 , 3 , 4  (التاني ٣ بسبب الـ rowspan)
ارتفاع الصف الواحد 38px، والخلية الطويلة 76px
أدوار Chrome: rowheader = 3 , columnheader = 4
validator: 0 error
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** حد كتب ملاحظة جوه الجدول نفسه: [[<table><tr><td>1</td></tr><p>ملاحظة</p></table>]]. الملاحظة هتظهر فين؟ تحت الجدول، ولا فوقه، ولا جوه خلية؟`, done: R`ظهرت **فوق** الجدول: [[document.body.innerHTML]] رجّع [[<p>ملاحظة</p><table>...]]. المتصفح بيطلّع أي حاجة مش خلية برّه الجدول وبيحطها قبله. ونفس الحاجة بتحصل لو نسيت [[</table>]]: الكلام اللي بعده بيطلع فوقه.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الملاحظة</title>
</head>
<body>
<table><tr><td>1</td></tr><p>ملاحظة</p></table>
</body>
</html>
~~~

**الإجابة:** فوق الجدول. جوه [[table]] المسموح صفوف وخلايا بس. ولما المتصفح يلاقي حاجة تانية زي [[p]]، بيطبّق قاعدة اسمها foster parenting: بيطلّعها برّه الجدول ويحطها **قبله**.

والمفاجأة إن المتصفح زوّد كمان [[tbody]] لوحده، رغم إنك مكتبتهوش.

**التصليح:** حط الملاحظة في المكان اللي ينفع. لو عايزها تتقري مع الجدول، خليها [[caption]] أو خلية. ولو برّه، حطها بعد [[</table>]]:

~~~html
<table>
  <caption>ملاحظة</caption>
  <tr><td>1</td></tr>
</table>
~~~

**الغلطة الشائعة:** تحط [[<div>]] أو [[<form>]] بين الصفوف عشان تلف صف. ده بيطلع برّه الجدول برضه، والصف بيفضل في مكانه. لو عايز صف قابل للإرسال، حط الفورم جوه خلية.

~~~text الناتج
document.body.innerHTML:
<p>ملاحظة</p><table><tbody><tr><td>1</td></tr></tbody></table>
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** جدول طلبات العناوين فيه مكتوبة [[<td><b>العميل</b></td>]]، فشكلها عنوان. افتح تاب Accessibility على خلية عادية وبص اسم العمود، وبعدين صلّحه.`, done: R`قبل: كل الخلايا دورها [[LayoutTableCell]] (Chrome اعتبره جدول تنسيق) ومفيش [[columnheader]] خالص، فقارئ الشاشة بيقرا الأرقام من غير أسامي أعمدتها. بعد [[<th scope="col">]]: العناوين بقت columnheader والخط التقيل جه لوحده من غير [[<b>]].`, sol: R`قبل:

~~~html
<table>
  <tr><td><b>العميل</b></td><td><b>الإجمالي</b></td></tr>
  <tr><td>منى علي</td><td>1250</td></tr>
</table>
~~~

بعد:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>th { text-align: start; }</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<table>
  <caption>آخر الطلبات</caption>
  <thead>
    <tr><th scope="col">العميل</th><th scope="col">الإجمالي</th></tr>
  </thead>
  <tbody>
    <tr><td>منى علي</td><td>1250</td></tr>
  </tbody>
</table>
</main>
</body>
</html>
~~~

**ليه التصليح ده مهم:** [[<b>]] تقيل في الشكل بس. Chrome شاف جدول مفيهوش أي عنوان فاعتبره جدول تنسيق، ودور خلاياه [[LayoutTableCell]]، يعني قارئ الشاشة ممكن يقراه كلام عادي من غير ما يقول إنه جدول. ولما المستخدم يوصل لـ 1250 يسمع الرقم من غير ما يعرف ده إيه. مع [[th]] بيسمع «الإجمالي، 1250».

و [[th]] تقيل وفي النص افتراضيًا، فالـ [[<b>]] مبقتش لازمة. و [[text-align: start]] بترجّعه لبداية الخلية لو عايز.

**الغلطة الشائعة:** تستخدم [[<td class="header">]] وتعمله تقيل بالـ CSS. نفس المشكلة: الشكل عنوان، والمعنى خلية.

~~~text الناتج
الأدوار في شجرة Chrome:
قبل: LayoutTableCell = 4
بعد: cell = 2 , columnheader = 2
وزن الخط في th من غير b: 700
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** حوّل الـ CSV ده لجدول: [[id,customer,total,status]] وتحته ٥ سطور زي [[1042,منى علي,1250,paid]] و [[1043,كريم,90,pending]]. الحالة تبقى كلمة عربي (مدفوع، مستني) مش الكلمة الإنجليزي.`, done: R`الجدول فيه caption و thead و ٥ صفوف، والإجمالي متنسّق [[1,250 ج]] (بـ [[toLocaleString]] أو بإيدك)، وعمود الأرقام محاذي للآخر، والـ id عنوان كل صف ([[scope="row"]]).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  table { border-collapse: collapse; width: 100%; max-width: 560px; }
  th, td { padding: 8px; border-block-end: 1px solid #d4d4d8; text-align: start; }
  .num { text-align: end; font-variant-numeric: tabular-nums; }
</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<table>
  <caption>طلبات الأسبوع</caption>
  <thead>
    <tr>
      <th scope="col">الرقم</th>
      <th scope="col">العميل</th>
      <th scope="col" class="num">الإجمالي</th>
      <th scope="col">الحالة</th>
    </tr>
  </thead>
  <tbody id="rows"></tbody>
</table>
</main>
<script>
  const CSV = $__btid,customer,total,status
1042,منى علي,1250,paid
1043,كريم,90,pending
1044,سلمى فؤاد,4300,paid
1045,عادل,760,cancelled
1046,هدى سامي,12500,pending$__bt;

  const STATUS = { paid: 'مدفوع', pending: 'مستني', cancelled: 'ملغي' };

  const [head, ...lines] = CSV.trim().split('\n');
  const keys = head.split(',');
  const orders = lines.map((line) => {
    const values = line.split(',');
    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
  });

  document.querySelector('#rows').innerHTML = orders.map((o) => $__bt
    <tr>
      <th scope="row">$__{o.id}</th>
      <td>$__{o.customer}</td>
      <td class="num">$__{Number(o.total).toLocaleString('en-US')} ج</td>
      <td>$__{STATUS[o.status] ?? o.status}</td>
    </tr>$__bt).join('');
$__lt/script>
</body>
</html>
~~~

**خطوات التحويل:**

- [[const [head, ...lines] = ...]]: أول سطر العناوين، والباقي بيانات.
- [[Object.fromEntries]]: بيحوّل أزواج [[[مفتاح, قيمة]]] لـ object، فنكتب [[o.total]] بدل [[values[2]]].
- [[STATUS[o.status] ?? o.status]]: لو حالة جديدة مش في القاموس، اعرضها زي ما هي بدل [[undefined]].
- [[toLocaleString('en-US')]] بيضيف الفصلة كل ٣ أرقام.
- [[text-align: end]]: الأرقام تتحاذى من آخرها، فالآحاد تحت الآحاد.
- [[tabular-nums]]: كل رقم بنفس العرض، فالأعمدة متتهزش.

**الغلطة الشائعة:** تسيب [[1250]] زي ما هي وتحاذيها للبداية، فالعين متقدرش تقارن الأرقام. وفي CSV حقيقي، لو القيمة فيها فصلة [[split(',')]] هيبوظها، ووقتها استخدم مكتبة زي Papa Parse.

و [[innerHTML]] هنا آمن لأن البيانات مكتوبة في الملف. لو جاية من مستخدم، [[textContent]] أو escape.

~~~text الناتج
1042  |  منى علي  |  1,250 ج  |  مدفوع
1043  |  كريم  |  90 ج  |  مستني
1044  |  سلمى فؤاد  |  4,300 ج  |  مدفوع
1045  |  عادل  |  760 ج  |  ملغي
1046  |  هدى سامي  |  12,500 ج  |  مستني

عدد الصفوف = 5   caption = طلبات الأسبوع
الحافة الشمال لكل رقم في عمود الإجمالي: 836 , 836 , 836 , 836 , 836  (كلهم نفس الخط، لأن end في rtl شمال)
السطر بتاع 1042 عنوان صف: row
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** شارات حالة (pills) لعمود الحالة: [[border-radius: 999px]] و [[padding: 2px 10px]] وخط صغير، وكل حالة ليها متغيرين: لون خلفية فاتح ([[--ok-soft]]) ولون كلام غامق من نفس اللون ([[--ok-text]]). ٤ حالات: مدفوع، ومستني، وملغي، ومرتجع.`, done: R`الأربع شارات بنفس الارتفاع ومدورين من الجنبين، وتباين كل واحدة 4.5:1 أو أكتر في الـ color picker بتاع DevTools، والحالة مكتوبة كلام مش لون بس (اللي مبيفرّقش الألوان يقدر يقراها).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحالات</title>
<style>
  :root {
    --ok-soft: #dcfce7;     --ok-text: #166534;
    --wait-soft: #fef3c7;   --wait-text: #854d0e;
    --bad-soft: #fee2e2;    --bad-text: #991b1b;
    --back-soft: #e0e7ff;   --back-text: #3730a3;
  }
  body { font-family: system-ui; margin: 16px; }
  .pill {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: .8125rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .pill--ok { background: var(--ok-soft); color: var(--ok-text); }
  .pill--wait { background: var(--wait-soft); color: var(--wait-text); }
  .pill--bad { background: var(--bad-soft); color: var(--bad-text); }
  .pill--back { background: var(--back-soft); color: var(--back-text); }
</style>
</head>
<body>
<main>
<h1>حالات الطلب</h1>
<span class="pill pill--ok">مدفوع</span>
<span class="pill pill--wait">مستني</span>
<span class="pill pill--bad">ملغي</span>
<span class="pill pill--back">مرتجع</span>
</main>
</body>
</html>
~~~

**اللي بيعمل الشكل:**

- [[border-radius: 999px]] رقم أكبر من نص الارتفاع، فالجنبين يبقوا نص دايرة مهما كان طول الكلمة.
- [[display: inline-block]]: عشان الـ [[padding]] يتحسب في ارتفاع السطر صح.
- كل حالة ليها متغيرين من نفس اللون: فاتح للخلفية وغامق للكلام، فالعين تربطهم، والتباين يفضل عالي.
- [[white-space: nowrap]]: الكلمة متتكسرش لو العمود ضاق.

**ليه الكلمة لازم تفضل مكتوبة:** واحد من كل ١٢ راجل تقريبًا عنده مشكلة في تمييز الأحمر والأخضر. لو الحالة نقطة ملونة بس، مش هيعرف الطلب اتدفع ولا اتلغى.

**الغلطة الشائعة:** تختار [[--ok-text]] أخضر متوسط عشان «يبان أخضر». على خلفية فاتحة بيطلع تباين أقل من 3. لازم غامق.

~~~text الناتج
الشارة     الارتفاع   الكلام            الخلفية            التباين
مدفوع     21.0   rgb(22, 101, 52)   rgb(220, 252, 231)   6.49:1
مستني     21.0   rgb(133, 77, 14)   rgb(254, 243, 199)   6.15:1
ملغي      21.0   rgb(153, 27, 27)   rgb(254, 226, 226)   6.8:1
مرتجع     21.0   rgb(55, 48, 163)   rgb(224, 231, 255)   8.06:1

أقل تباين مطلوب: 4.5:1
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** جدول بعناوين على مستويين (مثلًا «الربع الأول» فوق يناير وفبراير ومارس). من MDN اعرف [[scope="colgroup"]] و [[<colgroup>]] و attribute [[headers]]، واعمله.`, done: R`العنوان اللي فوق واخد ٣ أعمدة بـ [[colspan="3"]] و [[scope="colgroup"]]، وفهمت إمتى تحتاج [[headers="id1 id2"]] على الخلية (الجداول اللي العناوين فيها مش في صف وعمود واضحين).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المبيعات</title>
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #a1a1aa; padding: 6px 10px; text-align: center; }
  .q2 { background: #f4f4f5; }
</style>
</head>
<body>
<main>
<h1>المبيعات</h1>
<table>
  <caption>مبيعات النص الأول من السنة</caption>
  <colgroup>
    <col>
    <col span="3">
    <col span="3" class="q2">
  </colgroup>
  <thead>
    <tr>
      <td rowspan="2"></td>
      <th scope="colgroup" colspan="3" id="q1">الربع الأول</th>
      <th scope="colgroup" colspan="3" id="q2">الربع التاني</th>
    </tr>
    <tr>
      <th scope="col" id="jan">يناير</th>
      <th scope="col">فبراير</th>
      <th scope="col">مارس</th>
      <th scope="col">أبريل</th>
      <th scope="col">مايو</th>
      <th scope="col">يونيو</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" id="north">الفرع الشمالي</th>
      <td headers="q1 jan north">120</td>
      <td>98</td>
      <td>143</td>
      <td>160</td>
      <td>171</td>
      <td>155</td>
    </tr>
  </tbody>
</table>
</main>
</body>
</html>
~~~

**الإجابات:**

- [[scope="colgroup"]]: العنوان ده لمجموعة أعمدة كاملة، مش عمود واحد. فـ «الربع الأول» بيتقال مع يناير وفبراير ومارس.
- [[colspan="3"]]: الخلية واخدة ٣ أعمدة في الرسم.
- [[<colgroup>]] و [[<col>]]: بيعرّفوا الأعمدة في مكان واحد، فتقدر تلوّن عمود كامل زي [[.q2]] من غير ما تحط class على كل خلية. لازم ييجوا بعد [[caption]] وقبل [[thead]].
- [[headers="q1 jan north"]]: ربط يدوي بين الخلية و id العناوين بتاعتها.

**إمتى تحتاج** [[headers]]**:** لما العناوين مش في صف وعمود واضحين. زي جدول فيه عناوين في نص الجدول، أو خلية تابعة لعنوان مش فوقها مباشرة. في الجداول العادية [[scope]] كفاية، و [[headers]] مكتوبة هنا على خلية واحدة للتوضيح.

**الغلطة الشائعة:** تحط [[colgroup]] قبل [[caption]]، فالـ validator يرفضه. أو تحاول تحط [[padding]] على [[col]]. [[col]] بيقبل خصايص قليلة جدًا زي [[background]] و [[width]].

~~~text الناتج
عرض «الربع الأول» 149.58px = عرض الأشهر التلاتة 149.58px
خلفية خلية في الربع التاني: لون col من الـ colgroup = rgb(244, 244, 245)
validator: 0 error
overflow على 1280: 0px   axe: 0 violations
~~~` },
          ],
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
            R`بداية الجدول: كل اللي جواه صفوف وأعمدة. المتصفح بيدّيه role [[table]] فقارئ الشاشة بيقول عدد الصفوف والأعمدة أول ما يدخله.`,
            "عنوان الجدول، واسمه عند قارئ الشاشة.",
            R`[[<thead>]] جزء العناوين: الصفوف اللي جواه بتتكرر فوق كل صفحة لو الجدول اتطبع على كذا ورقة.`,
            R`[[<tr>]] من table row: صف واحد. كل الخلايا اللي جواه بتتحط جنب بعض في سطر.`,
            R`عنوان عمود: [[<th>]] بدل [[<td>]] عشان دي خلية عنوان، و [[scope="col"]] بيقول إنه عنوان الخلايا اللي تحته في نفس العمود.`,
            R`عنوان العمود التاني «العميل» بنفس الطريقة: [[scope="col"]] فأي td تحته بيتقري «العميل، منى علي».`,
            R`عنوان العمود التالت «الإجمالي». الخط بيبقى تقيل ومتوسّط لوحده لأن المتصفح بيدّي الـ th تنسيق جاهز.`,
            R`نهاية صف العناوين: التلات th دول هما كل أعمدة الجدول، وأي صف تحت لازم يبقى فيه ٣ خلايا (أو colspan بيكمّلها).`,
            R`نهاية الـ thead. من غيره الجدول بيشتغل، بس المتصفح مش هيعرف يكرر العناوين في الطباعة.`,
            R`[[<tbody>]] جسم الجدول: صفوف البيانات. لو مكتبتهوش المتصفح بيضيفه لوحده حوالين الصفوف (هتلاقيه في Elements).`,
            R`صف طلب واحد. كل طلب جديد يبقى [[<tr>]] جديد جوه نفس الـ tbody.`,
            R`رقم الطلب عنوان الصف ده: [[scope="row"]].`,
            R`خلية بيانات: [[<td>]] من table data. قارئ الشاشة بيقراها «العميل، منى علي» لأنها تحت th العميل.`,
            R`خلية الإجمالي: رقم عادي، بس هيتقري ومعاه اسم العمود والصف («1042، الإجمالي، 1,250 ج»).`,
            R`نهاية صف الطلب: فيه ٣ خلايا زي عدد الأعمدة بالظبط.`,
            R`نهاية الـ tbody: الطلبات خلصت، واللي بعده المجموع.`,
            R`[[<tfoot>]] جزء المجموع تحت. بيتكتب بعد الـ tbody، وبيتكرر تحت كل صفحة في الطباعة زي الـ thead فوق.`,
            R`صف المجموع: [[<tr>]] عادي بس جوه الـ tfoot.`,
            R`عنوان صف واخد عمودين بـ [[colspan="2"]].`,
            R`قيمة المجموع في عمود الإجمالي بالظبط، لأن الـ th اللي قبلها واخد العمودين الأولانيين.`,
            R`نهاية صف المجموع: عموديين (colspan) + خلية = ٣ زي باقي الصفوف.`,
            R`نهاية الـ tfoot: صف المجموع خلص، ومفيش صفوف بعده جوه الجدول.`,
            R`نهاية الجدول: أي كلام بعدها برّه الجدول. لو نسيتها الكلام اللي بعده ممكن يتحط فوق الجدول بدل تحته (المتصفح بيطلّع أي حاجة مش خلية برّه الجدول).`
          ],
          sol: R`مع [[<th scope="col">]]، تاب Accessibility بيعرض الـ role بتاع العناوين [[columnheader]]، والخلية [[cell]]، وعنوان الصف [[rowheader]]، والجدول اسمه «طلبات الأسبوع ده» من الـ caption.

لما تحوّل الـ th لـ td: العناوين بقت [[cell]] عادية، ولو قارئ الشاشة شغال هتلاحظ إنه بيقول الرقم لوحده من غير اسم العمود. ودا بالظبط الفرق اللي المستخدم الكفيف بيحس بيه.

لو الجدول ملوش اسم في تاب Accessibility، اتأكد إن الـ [[<caption>]] أول حاجة جوه [[<table>]] مش قبله.`
        },
        {
          cmd: "جدول responsive",
          practice: [
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس جدول الطلبات بـ ٣ طرق على الموبايل: (١) wrapper بـ scroll زي الدرس، (٢) كروت: كل [[tr]] بقى كارت و [[td::before { content: attr(data-label) }]] بيكتب اسم العمود، (٣) إخفاء الأعمدة المش مهمة تحت عرض معيّن.`, done: R`في التلاتة على 360px [[document.documentElement.scrollWidth]] بيساوي 360 (مفيش scroll أفقي للصفحة)، وكتبت لكل طريقة عيب: الأولى محتاجة scroll، والتانية طويلة، والتالتة بتخبّي بيانات.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>٣ طرق</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 8px; border-block-end: 1px solid #ccc; text-align: start; white-space: nowrap; }

  /* ١: scroll جوه الصندوق */
  .scroll { overflow-x: auto; }
  .scroll table { min-width: 520px; }

  @media (max-width: 40rem) {
    /* ٢: كل صف كارت */
    .cards thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
    .cards tr { display: block; border: 1px solid #ccc; border-radius: 8px; margin-block-end: 8px; padding: 8px; }
    .cards td { display: flex; justify-content: space-between; border: 0; padding: 4px 0; white-space: normal; }
    .cards td::before { content: attr(data-label); font-weight: 600; }

    /* ٣: إخفاء الأعمدة غير المهمة */
    .hide .opt { display: none; }
  }
</style>
</head>
<body>
<main>
<h1>نفس الجدول ٣ طرق</h1>

<h2>١: scroll</h2>
<div class="scroll" role="region" aria-label="الطلبات، scroll" tabindex="0">
<table>
  <thead><tr><th scope="col">الرقم</th><th scope="col">العميل</th><th scope="col">التاريخ</th><th scope="col">الفرع</th><th scope="col">الإجمالي</th></tr></thead>
  <tbody><tr><td>1042</td><td>منى علي</td><td>2026-03-01</td><td>الشمالي</td><td>1,250 ج</td></tr></tbody>
</table>
</div>

<h2>٢: كروت</h2>
<table class="cards">
  <thead><tr><th scope="col">الرقم</th><th scope="col">العميل</th><th scope="col">التاريخ</th><th scope="col">الفرع</th><th scope="col">الإجمالي</th></tr></thead>
  <tbody><tr>
    <td data-label="الرقم">1042</td><td data-label="العميل">منى علي</td>
    <td data-label="التاريخ">2026-03-01</td><td data-label="الفرع">الشمالي</td>
    <td data-label="الإجمالي">1,250 ج</td>
  </tr></tbody>
</table>

<h2>٣: إخفاء</h2>
<table class="hide">
  <thead><tr><th scope="col">الرقم</th><th scope="col">العميل</th><th scope="col" class="opt">التاريخ</th><th scope="col" class="opt">الفرع</th><th scope="col">الإجمالي</th></tr></thead>
  <tbody><tr><td>1042</td><td>منى علي</td><td class="opt">2026-03-01</td><td class="opt">الشمالي</td><td>1,250 ج</td></tr></tbody>
</table>
</main>
</body>
</html>
~~~

| الطريقة | العيب | تناسب |
|---|---|---|
| scroll | البيانات مخفية لحد ما تسحب، والمقارنة بين الأعمدة صعبة | جداول كبيرة بتتقارن |
| كروت | الصفحة بتطول، والمقارنة بين الصفوف صعبة | لستة طلبات بتتقري واحد واحد |
| إخفاء | بيانات مش متاحة خالص على الموبايل | عمود مش ضروري فعلًا |

**تفاصيل مهمة:**

- [[tabindex="0"]] و [[role="region"]] على صندوق الـ scroll: عشان اللي بالكيبورد يقدر يقف عليه ويحرّكه بالأسهم.
- [[content: attr(data-label)]]: الـ CSS بيقرا اسم العمود من الـ HTML. كده الاسم في الـ HTML مرة واحدة لكل خلية.
- [[thead]] مخفي بالشكل بس في الكروت، عشان قارئ الشاشة يفضل شايفه.

**الغلطة الشائعة:** تعالج overflow الجدول بـ [[body { overflow-x: hidden }]]. الجدول مقصوص، والبيانات راحت من غير ما حد يعرف.

~~~text الناتج
على 360:
scrollWidth للصفحة = 360   (= عرض الشاشة)
الطريقة ١: الجدول 520px جوه صندوق 328px
الطريقة ٢: ارتفاع الجدول 171px
الطريقة ٣: ظاهر 3 أعمدة من 5
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة فيها عنصر عريض عامل scroll أفقي، فحد حط [[html, body { overflow-x: hidden; }]]. الـ scroll راح، بس الهيدر اللي عليه [[position: sticky; top: 0]] مبقاش بيلزق.`, done: R`في Chrome بعد النزول الهيدر بقى برّه الشاشة (الـ top بالسالب) مع [[hidden]]، ورجع يلزق (top = 0) لما غيّرتها لـ [[overflow-x: clip]]، لأن hidden بيخلي الـ body منطقة scroll لوحده والـ sticky بيلزق فيها هي. والأحسن من الاتنين تلاقي العنصر العريض وتصلّحه.`, sol: R`الصفحة وفيها الغلط، على 360:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الهيدر</title>
<style>
  html, body { overflow-x: hidden; }
  body { margin: 0; }
  header { position: sticky; top: 0; background: #124; color: #fff; padding: 12px; }
  .wide { width: 600px; height: 40px; background: #fca5a5; }
  main { height: 2000px; }
</style>
</head>
<body>
<header>الهيدر</header>
<main>
  <h1>المحتوى</h1>
  <div class="wide">عنصر عريض</div>
</main>
</body>
</html>
~~~

**التصليح الأحسن:** تلاقي العنصر العريض وتصلّحه:

~~~css
.wide { width: 600px; max-width: 100%; }
~~~

ولو لازم تقص، [[clip]] مش [[hidden]]:

~~~css
html, body { overflow-x: clip; }
~~~

**ليه** [[hidden]] **كسر الـ sticky:** [[overflow: hidden]] بيخلي العنصر منطقة scroll لوحده، حتى لو مبيتحركش. والـ sticky بيلزق في أقرب منطقة scroll فوقه. فالهيدر بقى لازق في الـ body مش في الشاشة، والـ body نفسه مش بيتحرك، فالهيدر بيطلع مع الصفحة.

أما [[clip]] فبيقص بس، ومبيعملش منطقة scroll، فالـ sticky بيشتغل عادي.

**الغلطة الشائعة:** تشوف الـ scroll الأفقي راح وتعتبر المشكلة اتحلّت. العنصر العريض لسه طالع برّه ومقصوص، ومستخدم الموبايل مش هيشوف آخره.

~~~text الناتج
نزلنا 500px على عرض 360:
                         top الهيدر     scroll أفقي
overflow-x: hidden       -500          0px
overflow-x: clip         0          0px
max-width: 100%          0          0px
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** سطر تلزقه في الـ Console يطلّع كل عنصر طالع برّه عرض الشاشة: [[ [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1; }) ]]. لاحظ إن في صفحة RTL العنصر العريض بيطلع من الشمال، فالـ left بيبقى بالسالب.`, done: R`على صفحة فيها جدول من غير wrapper على 360px بيطلّع الجدول وكل اللي جواه. وبعد الـ wrapper السطر لسه بيطلّعهم (هم فعلًا برّه الشاشة بس جوه صندوق scroll)، فزوّدت شرط يعدّي أي عنصر جوه أب [[overflow-x]] بتاعه مش [[visible]] فرجعت لستة فاضية، و [[document.documentElement.scrollWidth]] بقى 360. وجربته على صفحة عربي واتأكدت إن شرط [[r.left < -1]] هو اللي مسكه.`, sol: R`~~~js
[...document.querySelectorAll('body *')].filter((el) => {
  const r = el.getBoundingClientRect();
  return r.right > innerWidth + 1 || r.left < -1;
});
~~~

وصفحة تجرب عليها:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>td { padding: 8px 40px; white-space: nowrap; }</style>
</head>
<body>
<main id="box">
  <h1>الطلبات</h1>
  <table>
    <tr><td>1042</td><td>منى علي</td><td>2026-03-01</td><td>1,250 ج</td></tr>
  </table>
</main>
</body>
</html>
~~~

والتصليح:

~~~css
#box { overflow-x: auto; }
~~~

بعد التصليح السطر الأول لسه هيطلّع نفس العناصر، لأنها فعلًا برّه الشاشة بس جوه صندوق scroll. النسخة دي بتعدّي أي عنصر جوه صندوق بيتعامل مع الزيادة:

~~~js
[...document.querySelectorAll('body *')].filter((el) => {
  const r = el.getBoundingClientRect();
  if (r.right <= innerWidth + 1 && r.left >= -1) return false;
  for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
    if (getComputedStyle(p).overflowX !== 'visible') return false;
  }
  return true;
});
~~~

**ليه الشرطين:** في صفحة [[ltr]] العنصر العريض بيطلع من اليمين، فـ [[r.right]] يبقى أكبر من [[innerWidth]]. في [[rtl]] بيبدأ من اليمين ويتمد ناحية الشمال، فبيطلع من الشمال، و [[r.left]] يبقى سالب. لو فحصت [[right]] بس، الأداة مش هتشوف حاجة في صفحة عربي.

- الـ [[+ 1]] و [[-1]]: سماح لكسور البكسل.
- [[getBoundingClientRect]]: موقع العنصر فعليًا على الشاشة.

**الفحص النهائي للصفحة كلها:** [[document.documentElement.scrollWidth]] لازم يساوي عرض الشاشة. السطر بيقولك مين طالع، والرقم ده بيقولك الصفحة نفسها فيها scroll ولا لأ.

**الغلطة الشائعة:** تستنى لما تلاقي الـ scroll بعينك. الأداة دي بتديك أسامي العناصر، فتعرف السبب بدل ما تخمّن.

~~~text الناتج
الصفحة على 360، قبل الـ wrapper:
عدد العناصر: 5   أول عناصر: table , tbody , tr , td , td
أول عنصر: left = -178   right = 352
الشرط اللي مسكه: r.left < -1

بعد overflow-x: auto على الأب:
السطر الأول لسه بيطلّع 5 عناصر (جوه الـ wrapper، ومش مشكلة)
النسخة اللي بتعدّي صناديق الـ scroll: 0 عنصر
scrollWidth للصفحة = 360  على عرض 360
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول طلبات لوحة تحكم: wrapper بـ [[max-height: 70dvh]] وعناوين لازقة، وصفوف مخططة، وعمود «إجراءات» فيه زرارين أيقونة (تعديل وحذف) كل واحد [[aria-label]] فيه رقم الطلب ([[aria-label="احذف الطلب 1042"]]).`, done: R`العناوين فاضلة فوق وانت نازل جوه الجدول، و ARIA snapshot بيقول «احذف الطلب 1042» مش «زرار» بس، وكل زرار 44×44 على الأقل، والصفحة على 360px مفيهاش scroll أفقي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  .wrap { max-height: 70dvh; overflow: auto; border: 1px solid #d4d4d8; border-radius: 8px; }
  table { border-collapse: separate; border-spacing: 0; width: 100%; min-width: 420px; }
  th, td { padding: 8px 12px; text-align: start; }
  thead th { position: sticky; top: 0; background: #f4f4f5; z-index: 1; }
  tbody tr:nth-child(even) { background: #fafafa; }
  .icon { width: 44px; height: 44px; padding: 0; font: inherit; cursor: pointer; }
</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<div class="wrap" role="region" aria-label="جدول الطلبات" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">الرقم</th><th scope="col">العميل</th><th scope="col">الإجمالي</th><th scope="col">إجراءات</th></tr>
    </thead>
    <tbody id="rows"></tbody>
  </table>
</div>
</main>
<script>
  const rows = [];
  for (let id = 1042; id < 1072; id++) {
    rows.push($__bt<tr>
      <td>$__{id}</td><td>عميل $__{id}</td><td>$__{id * 3} ج</td>
      <td>
        <button class="icon" type="button" aria-label="عدّل الطلب $__{id}">✎</button>
        <button class="icon" type="button" aria-label="احذف الطلب $__{id}">✕</button>
      </td></tr>$__bt);
  }
  document.querySelector('#rows').innerHTML = rows.join('');
$__lt/script>
</body>
</html>
~~~

**السطور المهمة:**

- [[max-height: 70dvh]] مع [[overflow: auto]]: الصندوق نفسه بيعمل scroll، مش الصفحة. وده اللي بيخلي العناوين تلزق جواه.
- [[position: sticky; top: 0]] على الـ [[th]] مش الـ [[thead]] ولا الـ [[tr]]: على الخلية بيشتغل في كل المتصفحات.
- [[background]] على الـ [[th]] لازم، وإلا الصفوف هتظهر من تحته.
- [[border-collapse: separate]]: مع [[collapse]] الحدود بتسيب العنوان وهو لازق، فبنستخدم separate و [[border-spacing: 0]].
- [[aria-label="احذف الطلب 1042"]]: لو كل الأزرار اسمها «احذف»، قارئ الشاشة بيقراهم زي بعض، ومش هتعرف بتحذف أنهي طلب.

**الغلطة الشائعة:** تحط [[overflow-x: auto]] من غير [[max-height]] وتستنى العناوين تلزق. الصندوق ارتفاعه قد المحتوى، فمفيش scroll جواه، والـ sticky ملوش حاجة يلزق فيها. وتجنّب [[overflow: hidden]] على أب فوقه لنفس السبب.

~~~text الناتج
الصفوف = 30
قبل النزول: top العنوان = 86.88، وبعد النزول 400px جوه الجدول: 86.88  (أعلى الصندوق = 85.88)
اسم أول زرارين: عدّل الطلب 1042 , احذف الطلب 1042
مقاس الزرار: 44×44
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** نسخة الكروت للموبايل: تحت 40rem كل صف بقى كارت بحدود و [[border-radius]]، وجوه الكارت كل خلية سطر فيه [[grid-template-columns: 8rem 1fr]]: اسم العمود من [[data-label]] على اليمين والقيمة جنبه، والـ thead مخفي بالشكل بس.`, done: R`على 360px كل طلب كارت لوحده واسم العمود قدام كل قيمة، وعلى 800px رجع جدول عادي، وتاب Accessibility لسه شايف [[table]] و [[columnheader]] في الحالتين (لأنك خبّيت الـ thead بالشكل مش بـ [[display: none]]).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 8px; text-align: start; border-block-end: 1px solid #d4d4d8; }

  @media (max-width: 40rem) {
    table, tbody { display: block; }
    thead {
      position: absolute;
      width: 1px; height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }
    tr {
      display: block;
      border: 1px solid #d4d4d8;
      border-radius: 12px;
      padding: 8px;
      margin-block-end: 12px;
    }
    td {
      display: grid;
      grid-template-columns: 8rem 1fr;
      border: 0;
      padding: 4px 0;
    }
    td::before {
      content: attr(data-label);
      font-weight: 600;
    }
  }
</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<table>
  <caption>طلبات اليوم</caption>
  <thead>
    <tr>
      <th scope="col">الرقم</th>
      <th scope="col">العميل</th>
      <th scope="col">الإجمالي</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="الرقم">1042</td>
      <td data-label="العميل">منى علي</td>
      <td data-label="الإجمالي">1,250 ج</td>
    </tr>
    <tr>
      <td data-label="الرقم">1043</td>
      <td data-label="العميل">كريم عادل</td>
      <td data-label="الإجمالي">90 ج</td>
    </tr>
  </tbody>
</table>
</main>
</body>
</html>
~~~

**سؤال الـ accessibility:** تغيير [[display]] على [[table]] و [[tr]] و [[td]] كان بيخلي بعض المتصفحات تعتبره مش جدول. في Chrome 156 قسناها: الأدوار فضلت كاملة من غير ولا [[role]] مكتوبة. لو لازم تدعم Safari القديم، زوّد [[role="table"]] و [[role="row"]] و [[role="cell"]] و [[role="columnheader"]]. الجزء ده عن Safari من مقالات الـ accessibility، مش من تجربة هنا.

**باقي الحل:**

- [[thead]] مخفي بالشكل بس، مش [[display: none]]، عشان العناوين تفضل في شجرة الـ accessibility.
- [[grid-template-columns: 8rem 1fr]]: عمود ثابت لاسم الحقل، والباقي للقيمة، فكل القيم تبدأ من نفس الخط.
- [[td::before]] هو أول عنصر في الشبكة، والقيمة التاني. ده لأن النص بيبقى grid item تلقائي.
- كل القواعد جوه [[@media]]: فوق 40rem الجدول عادي.

**الغلطة الشائعة:** تكتب الكروت برّه الـ media query أو تستخدم [[thead { display: none }]]. قارئ الشاشة هيخسر أسامي الأعمدة.

~~~text الناتج
                        360                  800
الـ display بتاع tr      block               table-row
أعمدة td                128px 182px          none
overflow                0px                 0px

الأدوار في شجرة Chrome:
على 360:  table=1 , row=3 , cell=6 , columnheader=3
على 800:  table=1 , row=3 , cell=6 , columnheader=3
axe: 0 violations
~~~` },
          ],
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
            R`الجدول نفسه جوه الـ wrapper: هو اللي عرضه كبير، والـ wrapper عرضه عرض الشاشة، فالفرق بيبقى scroll جوه الـ wrapper بس.`,
            R`الـ caption ليه id عشان الـ wrapper ياخد اسمه منه.`,
            "الصفوف (زي الدرس اللي فات).",
            R`نهاية الجدول: لازم تبقى جوه الـ div، عشان لو الجدول برّه الـ wrapper الصفحة كلها هتعمل scroll أفقي تاني.`,
            R`نهاية الـ wrapper: الـ scroll والـ focus والاسم كلهم على العنصر ده، مش على الجدول.`,
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
          practice: [
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[pageList(current, total)]] بترجّع أرقام أزرار الصفحات بالشكل ده: [[pageList(5, 20)]] → [[ [1, '…', 4, 5, 6, '…', 20] ]]. أول صفحة وآخر صفحة دايمًا ظاهرين، وجنب الحالية صفحة من كل ناحية.`, done: R`[[pageList(1, 1)]] → [[ [1] ]]، و [[pageList(1, 5)]] → [[ [1, 2, '…', 5] ]]، و [[pageList(2, 3)]] → [[ [1, 2, 3] ]] (من غير نقط لما مفيش فجوة)، و [[pageList(20, 20)]] → [[ [1, '…', 19, 20] ]]، و [[pageList(99, 20)]] بتتعامل مع 99 كأنها 20.`, sol: R`~~~js
function pageList(current, total) {
  const cur = Math.min(Math.max(current, 1), total);
  const wanted = [...new Set([1, cur - 1, cur, cur + 1, total])]
    .filter((n) => n >= 1 && n <= total);

  const out = [];
  wanted.forEach((n, i) => {
    if (i > 0 && n - wanted[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}
~~~

**الفكرة في ٣ خطوات:**

1. اظبط الصفحة الحالية: [[Math.min]] و [[Math.max]] بيخلوا 99 تبقى 20 و 0 تبقى 1. ده اسمه clamp.
2. لستة الصفحات اللي عايزين نعرضها: الأولى، واللي قبل الحالية، والحالية، واللي بعدها، والأخيرة. [[Set]] بتشيل المكرر، زي صفحة 1 لما تبقى هي الحالية. و [[filter]] بتشيل 0 و 21.
3. لف عليهم، ولو الفرق بين رقمين أكبر من 1 يبقى فيه فجوة، فحط [[…]] بينهم.

**ليه مفيش sort:** الأرقام مكتوبة أصلًا من الصغير للكبير، و [[Set]] بتحافظ على ترتيب الإضافة.

**الغلطة الشائعة:** تكتب شروط [[if]] لكل حالة طرفية. مع الطريقة دي الحالات كلها بتتحل بنفس السطور.

~~~text الناتج
pageList(5, 20)    → [1,"…",4,5,6,"…",20]
pageList(1, 1)     → [1]
pageList(1, 5)     → [1,2,"…",5]
pageList(2, 3)     → [1,2,3]
pageList(20, 20)   → [1,"…",19,20]
pageList(99, 20)   → [1,"…",19,20]
pageList(0, 4)     → [1,2,"…",4]
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حقل بحث بيعمل [[history.pushState(null, '', '?q=' + input.value)]] مع كل حرف. المستخدم كتب «قهوة» وعايز يرجع للصفحة اللي قبل البحث.`, done: R`قبل: كتابة ٤ حروف زوّدت [[history.length]] بـ 4 (اتقاس في Chrome)، فكان محتاج يدوس Back ٤ مرات. بعد [[pushState]] مرة واحدة عند أول حرف و [[replaceState]] لباقي الحروف: بقت Back واحدة بترجّع الصفحة من غير بحث.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث</title>
</head>
<body>
<main>
<h1>المنتجات</h1>
<label for="q">دوّر</label>
<input id="q" type="search">
</main>
<script>
  const input = document.querySelector('#q');
  const urlFor = (q) => '?q=' + encodeURIComponent(q);

  let typing = false;

  input.addEventListener('input', () => {
    if (!typing) {
      // أول حرف: سطر جديد، فالسطر اللي قبله يفضل الصفحة من غير بحث
      history.pushState(null, '', urlFor(input.value));
      typing = true;
    } else {
      // باقي الحروف: عدّل نفس السطر
      history.replaceState(null, '', urlFor(input.value));
    }
  });

  // لما يخلص: البحث الجاي يبدأ سطر جديد
  input.addEventListener('change', () => {
    typing = false;
  });
$__lt/script>
</body>
</html>
~~~

**الفرق بين الاتنين:**

- [[pushState]] بيزوّد سطر جديد في تاريخ التاب، فكل حرف بقى «صفحة» لازم تدوس Back عشان تعدّيها.
- [[replaceState]] بيعدّل السطر الحالي، فالـ URL بيتغيّر والتاريخ مبيزيدش.

**ليه** [[pushState]] **عند أول حرف مش عند Enter:** لو سبت [[replaceState]] يشتغل من أول حرف، هيكتب فوق سطر الصفحة اللي من غير بحث، فالـ Back مش هيلاقي حاجة يرجعلها. و [[pushState]] مرة واحدة في الأول بتسيب السطر ده سليم.

و [[change]] بيتنادي لما المستخدم يدوس Enter أو يسيب الحقل، فده اللي بيعتبر «البحث خلص».

و [[encodeURIComponent]] عشان العربي والرموز زي [[&]] يتكتبوا صح في الـ URL.

**الغلطة الشائعة:** تعمل [[pushState]] عند Enter بعد ما [[replaceState]] كتبت نفس الـ URL. هيبقى عندك سطرين بنفس البحث، و Back مش هيغيّر حاجة في الشاشة.

~~~text الناتج
فتحنا الصفحة من غير بحث، وكتبنا «قهوة» ٤ حروف، ودسنا Enter.

قبل (pushState مع كل حرف):
history.length زاد 4
عدد مرات Back عشان ترجع للصفحة من غير بحث: 4

بعد (pushState لأول حرف، و replaceState للباقي):
history.length زاد 1
عدد مرات Back: 1
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const u = new URLSearchParams('?q=قهوة+سادة&tag=a&tag=b')]]. إيه ناتج [[u.get('q')]] و [[u.get('tag')]] و [[u.getAll('tag')]] و [[u.toString()]]؟`, done: R`طلعوا [[قهوة سادة]] (الـ + بقت مسافة)، و [[a]] بس (أول واحدة)، و [[ ['a', 'b'] ]]، و [[toString()]] رجّع العربي متشفّر [[%D9%82...]] والمسافة [[+]]. فالفلاتر اللي ليها أكتر من قيمة تتقري بـ getAll.`, sol: R`~~~js
const u = new URLSearchParams('?q=قهوة+سادة&tag=a&tag=b');
console.log(u.get('q'));
console.log(u.get('tag'));
console.log(u.getAll('tag'));
console.log(u.toString());
~~~

**ليه كده:**

- الـ [[?]] في أول النص بيتشال لوحده.
- [[+]] في الـ query معناها مسافة، من أيام الفورمات القديمة. فـ [[get('q')]] رجّعت مسافة.
- [[get]] بترجّع أول قيمة بس، فـ [[tag]] طلعت [[a]]. لو القيم كتير استخدم [[getAll]].
- [[toString()]] بتكتب النص جاهز للـ URL: العربي متشفّر، والمسافة [[+]].

**الغلطة الشائعة:** تعمل [[location.search.split('&')]] بإيدك. هتتعب مع الـ + والتشفير والقيم المكررة، و [[URLSearchParams]] بتعمل ده كله.

وفيه فخ تاني: لو عايز [[+]] حقيقية في القيمة، زي [[c++]]، استخدم [[u.set('q', 'c++')]]، وهي هتشفّرها [[%2B]]. لو كتبتها في النص بإيدك هتتقري مسافات.

~~~text الناتج
u.get('q')     → قهوة سادة
u.get('tag')   → a
u.getAll('tag') → ["a","b"]
u.toString()   → q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=a&tag=b

new URLSearchParams('q=c++').get('q') → "c  "
بعد u.set('q','c++'): q=c%2B%2B
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** بحث فوق جدول المنتجات بيكتب [[?q=]] في الـ URL، بيستنى 300ms بعد آخر حرف قبل ما يفلتر (debounce)، وتحت الحقل [[<p aria-live="polite">]] بيقول «لقينا ٣ منتجات».`, done: R`كتابة كلمة بسرعة بتفلتر مرة واحدة بعد ما تقف (حط [[console.count]] في الفلتر)، والـ refresh على [[?q=ماوس]] بيفتح والبحث متملي والجدول متفلتر، والعدد بيتقري لقارئ الشاشة من غير ما الـ focus يتحرك.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المنتجات</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  table { border-collapse: collapse; width: 100%; max-width: 480px; margin-block-start: 8px; }
  th, td { padding: 8px; border-block-end: 1px solid #d4d4d8; text-align: start; }
</style>
</head>
<body>
<main>
<h1>المنتجات</h1>
<label for="q">دوّر</label>
<input id="q" type="search">
<p id="status" aria-live="polite"></p>
<table>
  <thead><tr><th scope="col">المنتج</th><th scope="col">السعر</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
</main>
<script>
  const PRODUCTS = [
    { name: 'ماوس لاسلكي', price: 350 },
    { name: 'ماوس ألعاب', price: 900 },
    { name: 'ماوس مكتب', price: 200 },
    { name: 'كيبورد ميكانيكال', price: 1500 },
    { name: 'سماعة', price: 600 },
  ];
  const input = document.querySelector('#q');
  const rows = document.querySelector('#rows');
  const status = document.querySelector('#status');

  function countText(n) {
    if (n === 0) return 'مفيش نتايج';
    if (n === 1) return 'لقينا منتج واحد';
    return 'لقينا ' + n.toLocaleString('ar-EG') + ' منتجات';
  }

  function apply() {
    console.count('filter');
    const q = input.value.trim();
    const found = PRODUCTS.filter((p) => p.name.includes(q));
    rows.innerHTML = '';
    for (const p of found) {
      const tr = rows.insertRow();
      tr.insertCell().textContent = p.name;
      tr.insertCell().textContent = p.price + ' ج';
    }
    status.textContent = countText(found.length);
    history.replaceState(null, '', q ? '?q=' + encodeURIComponent(q) : location.pathname);
  }

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(apply, 300);
  });

  input.value = new URLSearchParams(location.search).get('q') ?? '';
  apply();
$__lt/script>
</body>
</html>
~~~

**الـ debounce في ٣ سطور:** مع كل حرف بنلغي العداد القديم بـ [[clearTimeout]] ونبدأ واحد جديد. فالفلتر بيشتغل بس لما يعدّي 300ms من غير كتابة.

- آخر سطرين في السكربت: أول ما الصفحة تفتح بنقرا الـ URL ونحط القيمة في الحقل، وده اللي بيخلي الـ refresh فاكر البحث.
- [[textContent]] مش [[innerHTML]] للبيانات، عشان اسم منتج فيه [[<]] ميبقاش كود.
- [[aria-live="polite"]]: قارئ الشاشة بيقرا النتيجة لما يخلص كلامه، والـ focus فاضل في الحقل.
- [[replaceState]] عشان الكتابة متملاش الـ history.

**الغلطة الشائعة:** تعمل [[setTimeout]] من غير [[clearTimeout]]. ده تأخير بس مش debounce، والفلتر هيتنفّذ مرة لكل حرف، بس متأخر.

~~~text الناتج
كتابة «ماوس» بسرعة: الفلتر اشتغل 1 مرة
الـ URL: ?q=ماوس
الكلام اللي تحت الحقل: لقينا ٣ منتجات
الـ focus بعد الفلترة: #q

refresh على ?q=ماوس:
قيمة الحقل = ماوس   عدد الصفوف = 3
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** ليه [[readState]] بترفض أي [[sort]] مش في [[COLS]] بدل ما تاخد اللي في الـ URL زي ما هو؟ اكتب ٣ سطور لزميل بيقول «ده جدول في المتصفح، إيه الخطر؟».`, done: R`الشرح فيه: الـ URL أي حد بيكتبه (يعني input مش مضمون)، ولو نفس القيمة اتبعتت للسيرفر وحطها في [[ORDER BY]] من غير allowlist يبقى فيه SQL injection، وحتى في المتصفح [[?sort=hack]] من غير الفحص كان هيرتب بعمود مش موجود ويبوّظ الصفحة.`, sol: R`**الرد النموذجي على زميلك:**

~~~text الشرح
الـ URL أي حد بيكتبه أو بيغيّره، يعني ده input زيه زي أي فورم، ومينفعش تثق فيه.
في المتصفح: من غير الفحص ?sort=hack كان هيرتب بعمود مش موجود، فكل القيم undefined والجدول يطلع ملخبط أو يقع.
والأهم: نفس القيمة غالبًا هتتبعت للسيرفر، ولو اتحطت في ORDER BY من غير allowlist يبقى فيه SQL injection.
~~~

~~~js
const COLS = ['name', 'price', 'stock'];
const p = new URLSearchParams(location.search);
const sort = COLS.includes(p.get('sort')) ? p.get('sort') : 'name';
~~~

**ليه allowlist مش blocklist:** [[COLS.includes]] بتقول «اللي في اللستة دي بس هو المسموح». أما رفض كلمات معينة فدايمًا هتنسى كلمة.

**ليه الفلاتر الـ parameters العادية مش بتكفي هنا:** في SQL الـ prepared statement بيحمي **القيم**، زي [[WHERE id = $1]]. لكن اسم عمود في [[ORDER BY]] مش قيمة، ومينفعش يتبعت parameter. عشان كده الفحص باللستة هو الحل الوحيد. وده الجزء اللي ناس كتير مش بتعرفه.

**الغلطة الشائعة:** تفحص في المتصفح بس. أي حد يقدر يبعت الطلب للسيرفر مباشرة من غير صفحتك، فالفحص لازم يتكرر في السيرفر.

~~~text الناتج
?sort=price             → sort = price
?sort=hack              → sort = name
?sort=name;DROP TABLE x → sort = name
من غير sort             → sort = name
~~~` },
          ],
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
| [[?sort=price&dir=desc&page=2]] | [[{ sort: 'price', dir: 'desc', page: 2 }]]: كله مسموح فاتقري زي ما هو |
| [[?sort=hack&page=-3]] | [[{ sort: 'name', dir: 'asc', page: 1 }]]: عمود مش في اللستة وصفحة سالبة، فرجعوا للافتراضي |
| [[?page=abc&dir=DESC]] | [[{ sort: 'name', dir: 'asc', page: 1 }]]: [[abc]] مش رقم، و [[DESC]] كابيتال مش [[desc]] |
| [[?page=2.7]] | [[page: 2]]: [[parseInt]] بيقطع الكسر |
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
            R`[[URLSearchParams]] بتفك الـ query لأجزاء: [[p.get('sort')]] بيرجّع القيمة أو [[null]] لو مش موجودة، وبيفك [[%20]] وأي ترميز لوحده.`,
            R`عمود الترتيب لو مسموح، غير كده [[name]].`,
            R`الاتجاه: لو القيمة [[desc]] بالظبط يبقى تنازلي، وأي حاجة تانية (حتى [[DESC]] أو فاضي) تبقى [[asc]]، فمفيش قيمة غريبة تعدّي.`,
            "رقم الصفحة، ولو مش رقم أو أقل من 1 يبقى 1.",
            R`ترجع object فيه التلاتة، وكل اللي بعد كده (الرسم والترتيب) بيقرا منه، مش من الـ URL على طول.`,
            "قفلة.",
            "ضغطة على أي حاجة في العناوين...",
            R`...لو كانت على زرار جوه th عليه [[data-col]]، خد اسم العمود.`,
            "مش زرار ترتيب؟ اخرج.",
            R`الحالة اللي قبل الضغطة، عشان نعرف العمود ده كان مترتب بيه قبل كده ولا لأ.`,
            "نسخة من الـ query عشان نعدّلها ونسيب الباقي (زي البحث).",
            R`حط العمود اللي اتضغط في [[sort]]، وأي مفتاح تاني في الـ query (زي [[q]] بتاع البحث) بيفضل زي ما هو.`,
            "نفس العمود وكان تصاعدي؟ يبقى تنازلي. غير كده تصاعدي.",
            "الترتيب اتغير، فارجع للصفحة الأولى.",
            "غيّر الـ URL من غير reload، وضيف خطوة في الـ history.",
            R`ارسم الجدول تاني من الـ URL الجديد: [[pushState]] مش بيعمل reload، فلازم نرسم بنفسنا.`,
            "قفلة.",
            "Back و Forward: ارسم من الـ URL تاني.",
            R`[[render]] بتحدّث الصفحة من الـ URL بس: مفيش state محفوظ في متغير، فالـ refresh والـ Back بيدّوا نفس النتيجة.`,
            "الحالة من الـ URL.",
            R`لف على كل th عليه [[data-col]] (العناوين اللي بتترتب)، عشان عمود زي «صورة» مالوش ترتيب يتساب.`,
            R`العمود المترتب بيه ياخد [[aria-sort]]...`,
            R`...والباقي نشيل منهم [[aria-sort]] خالص، عشان قارئ الشاشة يقول «مترتب» على عمود واحد بس.`,
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
        },
        {
          cmd: "@media print",
          title: "فاتورة بتتطبع A4 صح: @media print و @page",
          desc: R`لما حد يدوس Ctrl+P، المتصفح بيرسم الصفحة تاني على ورق: [[@media print]] بيدّيك CSS بيشتغل في الطباعة بس، فتخبّي الـ navbar والأزرار، وتخلي الخلفية بيضا والكلام أسود، وتكبّر الخط بالـ [[pt]]. و [[@page]] بيحدد الورقة نفسها: [[size: A4]] والهوامش بـ [[margin]]، وفي Chrome الحديث كمان رقم الصفحة تحت بـ [[@bottom-center]] و [[counter(page)]].

والجدول الطويل بيتقسم على كذا ورقة: الـ [[thead]] بيتكرر فوق كل ورقة والـ [[tfoot]] تحت كل ورقة لوحدهم، و [[break-inside: avoid]] على الـ [[tr]] بيمنع إن صف يتقطع نصين بين ورقتين. والخلفيات الملوّنة مبتتطبعش من الأول (عشان الحبر)، إلا لو كتبت [[print-color-adjust: exact]] على العنصر ده.

الدرس ده بيكمّل دروس الجداول (الفاتورة جدول فيه thead و tbody و tfoot)، وبيستخدم [[@media]] اللي هتتشرح بالتفصيل في «media queries».`,
          example: R`<header class="site-header no-print">بُن الصباح</header>
<main class="invoice">
  <h1>فاتورة رقم <bdi>INV-1042</bdi></h1>
  <table class="items">
    <thead><tr><th scope="col">الصنف</th><th scope="col">الكمية</th><th scope="col">السعر</th></tr></thead>
    <tbody>...</tbody>
    <tfoot><tr><th scope="row" colspan="2">الإجمالي</th><td>1,250 ج</td></tr></tfoot>
  </table>
  <p class="note">الدفع خلال 14 يوم. <a href="https://example.com/pay">ادفع أونلاين</a></p>
</main>
<button type="button" class="no-print" onclick="print()">اطبع الفاتورة</button>
// print.css
@page { size: A4; margin: 12mm; }
@page { @bottom-center { content: "صفحة " counter(page) " من " counter(pages); } }
@media print {
  .no-print { display: none; }
  body { margin: 0; font-size: 11pt; color: black; background: white; }
  .items tr { break-inside: avoid; }
  .items thead th { background: #e8eef8; print-color-adjust: exact; }
  .note a::after { content: " (" attr(href) ")"; }
}`,
          try: R`اعمل الفاتورة دي وحط في الـ tbody ٦٠ صف (بـ JavaScript أو انسخ صف واحد كتير)، ودوس Ctrl+P وبص على الـ preview: كام ورقة؟ العناوين والإجمالي ظاهرين فين؟ وبعدين اقفل «Background graphics» من «More settings» وبص على لون العناوين. وأخيرًا امسح سطر [[print-color-adjust]] وبص تاني.`,
          flag: "script",
          deep: {
            why: R`الفواتير والإيصالات وتذاكر الحجز والشهادات وأي صفحة «اطبعها وامشي» بتتطبع فعلًا، أو بتتحفظ PDF من نفس نافذة الطباعة (Save as PDF). من غير CSS للطباعة الورقة بيطلع عليها الـ navbar والأزرار والخلفية الغامقة، والجدول بيتقطع في نص صف، ومحدش يعرف دي ورقة كام من كام. والحل مش مكتبة PDF: سطور CSS قليلة على نفس الصفحة.`,
            how: R`لما تطبع، المتصفح بيعمل layout جديد للصفحة بعرض الورقة (A4 = 210×297mm، يعني 595×842 نقطة في الـ PDF) ناقص الهوامش، وبيطبّق القواعد اللي جوه [[@media print]] فوق العادية (نفس الـ cascade، بس شرط الـ media بقى صح). وبعدين بيقسم المحتوى على صفحات (fragmentation): كل عنصر ممكن يتقطع إلا لو قلتله [[break-inside: avoid]]، وتقدر تجبر ورقة جديدة بـ [[break-before: page]].

الـ [[thead]] و [[tfoot]] ليهم [[display: table-header-group]] و [[table-footer-group]] من المتصفح نفسه، وده اللي بيخليهم يتكرروا في كل ورقة. لو غيّرتهم لـ [[display: block]] (زي ما بيحصل لما الجدول يتحول لكروت على الموبايل) التكرار بيقف.

وفي الـ PDF اللي Chrome عمله، لون [[#e8eef8]] اتلاقى مرسوم في الـ content stream لما [[print-color-adjust: exact]] موجود، ومش موجود خالص لما شلته والـ Background graphics مقفولة. يعني الخاصية دي بتقول للمتصفح «ده لون مهم مش زينة، اطبعه».`,
            when: R`أي صفحة الناس هتطبعها أو تحفظها PDF: فاتورة، وإيصال، وتذكرة، وشهادة، ومقال طويل، ووصفة أكل. ولو عايز PDF بيتعمل في السيرفر من غير ما حد يدوس Ctrl+P، نفس الـ CSS ده بيشتغل مع Playwright أو Puppeteer ([[page.pdf()]] و [[preferCSSPageSize: true]])، ودي الطريقة اللي اتعملت بيها كل الأرقام اللي في الدرس.`,
            mistakes: R`تحط [[display: none]] للطباعة على عنصر برّه [[@media print]] فيختفي من الشاشة كمان. أو تكتب الأحجام بـ [[px]] وتستغرب إن الورق بيطلع مختلف (استخدم [[pt]] أو [[mm]] في الطباعة). أو تخلي الخلفية غامقة والكلام أبيض فالطابعة تطبع أبيض على أبيض لأن الخلفية مبتتطبعش. أو تحول الجدول لكروت على الموبايل بـ [[thead { display: none }]] من غير ما ترجّعه في الطباعة. أو تحط [[print-color-adjust: exact]] على [[*]] فتطبع كل خلفية في الصفحة وتصرف حبر على الفاضي. أو تنسى إن [[min-width]] وقت الطباعة بيتحسب بعرض الورقة مش الشاشة: على A4 في Chrome 156 الصفحة طابقت [[min-width: 718px]] بهامش 12mm و [[790px]] من غير هامش، فأي layout مكتوب لـ [[min-width: 1024px]] مش هيشتغل على الورق.`
          },
          teach: R`## الفكرة في سطرين

نفس الصفحة بتترسم مرتين: مرة على الشاشة ومرة على الورق. [[@media print]] هو الـ CSS اللي بيشتغل في المرة التانية بس، و [[@page]] بيوصف الورقة نفسها. كل الأرقام هنا من Chrome 156: الفاتورة اتعملت PDF بـ Playwright ([[page.pdf]] مع [[preferCSSPageSize: true]] والخلفيات مقفولة زي الإعداد الافتراضي)، والصفحات اتقرت بـ pdf.js.

---

## ١. الـ HTML: فاتورة عادية

~~~html invoice.html
<header class="site-header no-print">بُن الصباح</header>
<main class="invoice">
  <h1>فاتورة رقم <bdi>INV-1042</bdi></h1>
  <table class="items">...</table>
  <p class="note">الدفع خلال 14 يوم. <a href="https://example.com/pay">ادفع أونلاين</a></p>
</main>
<button type="button" class="no-print" onclick="print()">اطبع الفاتورة</button>
~~~

- [[class="no-print"]]: اسم اخترناه بنفسنا، علامة على أي حاجة ملهاش لازمة على الورق (الهيدر وزرار الطباعة).
- [[<bdi>INV-1042</bdi>]]: رقم الفاتورة إنجليزي جوه جملة عربي، فبنعزله عشان يتطبع بنفس ترتيبه (درس «lang و dir»).
- [[onclick="print()"]]: [[print()]] هي [[window.print()]]، بتفتح نافذة الطباعة نفسها اللي Ctrl+P بيفتحها.
- الجدول نفس جدول درس «table»: thead للعناوين، و tbody للأصناف، و tfoot للإجمالي.

---

## ٢. [[@page]]: الورقة نفسها

~~~css الورقة
@page { size: A4; margin: 12mm; }
@page { @bottom-center { content: "صفحة " counter(page) " من " counter(pages); } }
~~~

- [[size: A4]]: الـ PDF طلع كل صفحة فيه 595×842 نقطة، وده مقاس A4 بالظبط. ولما جربت [[size: A5 landscape]] طلع 595×420. وفيه كمان [[letter]] و [[A3]]، أو مقاس بإيدك [[size: 80mm 200mm]] لإيصال طابعة كاشير.
- [[margin: 12mm]]: الهامش الأبيض حوالين كل ورقة. الطابعات مبتطبعش لحد الحرف أصلًا، فمتنزلش أقل من حوالي 10mm.
- [[@bottom-center]]: «صندوق» في الهامش اللي تحت في النص، و [[counter(page)]] رقم الصفحة دي و [[counter(pages)]] عدد الصفحات كله. في الـ PDF أول كلام في كل صفحة كان «1 من 3» و «2 من 3» و «3 من 3». ده جديد (Chrome 131 وطالع)؛ المتصفح اللي مش بيدعمه بيتجاهله والفاتورة بتتطبع عادي من غير رقم.

---

## ٣. [[@media print]]: سطر سطر

~~~css الطباعة
@media print {
  .no-print { display: none; }
  body { margin: 0; font-size: 11pt; color: black; background: white; }
  .items tr { break-inside: avoid; }
  .items thead th { background: #e8eef8; print-color-adjust: exact; }
  .note a::after { content: " (" attr(href) ")"; }
}
~~~

| السطر | بيعمل إيه في الورق |
|---|---|
| [[.no-print { display: none; }]] | الهيدر والزرار اختفوا: كلمة «بُن الصباح» مش موجودة في نص أي صفحة في الـ PDF |
| [[font-size: 11pt]] | [[pt]] وحدة الطباعة (1pt = 1/72 بوصة). 11pt حجم مريح على الورق |
| [[color: black; background: white]] | مفيش ثيم غامق على الورق: الحبر للكلام بس |
| [[break-inside: avoid]] على [[tr]] | الصف مبيتقطعش بين ورقتين (التجربة تحت) |
| [[print-color-adjust: exact]] | لون العناوين اتطبع رغم إن الخلفيات مقفولة |
| [[a::after]] و [[attr(href)]] | الورق ملوش لينكات بتتضغط، فالرابط نفسه اتكتب جنب الكلمة: [[example.com/pay]] ظهر في نص آخر صفحة |

---

## ٤. الجدول الطويل على كذا ورقة

حطيت في الـ tbody أصناف بأعداد مختلفة:

| عدد الأصناف | عدد الورق |
|---|---|
| 26 | 1 |
| 28 | 2 |
| 60 | 3 |

وفي الـ ٦٠: كلمة «الصنف» (عنوان أول عمود) موجودة في نص التلات صفحات، و «1,250 ج الإجمالي» هو آخر كلام في كل صفحة. يعني الـ thead اتكرر فوق والـ tfoot اتكرر تحت **من غير ولا سطر CSS** ليهم.

### الصف اللي بيتقطع

عملت ١٢ صف كل واحد فيه ٨ سطور ([[R5L0]] لحد [[R5L7]])، وعدّيت كل صف ظهر في كام صفحة:

| | صفوف اتقطعت بين ورقتين |
|---|---|
| من غير [[break-inside: avoid]] | الصف 5 والصف 11 |
| بيه | ولا صف |

Chrome بيقطع الصف العالي من نصه لو مكانش فيه مكان. مع [[avoid]] الصف كله بينزل الورقة اللي بعدها.

### لو غيّرت [[display]] بتاع الـ thead

لما خليت [[.items thead { display: block; }]] (اللي بيحصل في جدول الموبايل اللي بيتحول لكروت)، «الصنف» ظهرت في أول صفحة بس. فلو عندك CSS كده للموبايل، رجّعه في الطباعة: [[@media print { .items thead { display: table-header-group; } }]].

---

## ٥. الخلفيات: مقفولة من الأول

| | الخلفيات مقفولة (الافتراضي) |
|---|---|
| [[background: #e8eef8]] لوحده | اللون مش موجود في الـ PDF خالص |
| ومعاه [[print-color-adjust: exact]] | اللون موجود ([[.9098 .9333 .9725 rg]] في الـ content stream، ودي #e8eef8 بالأرقام من 0 لـ 1) |

المستخدم يقدر يفتح الخلفيات من «More settings › Background graphics» في نافذة الطباعة، بس متعتمدش على ده. حط [[exact]] على الحاجات اللي معناها في لونها بس (عنوان الجدول، وشارة «مدفوع» الخضرا)، مش على الصفحة كلها. والمواقع القديمة بتكتب معاه [[-webkit-print-color-adjust: exact]] للنسخ القديمة من المتصفحات.

---

## ٦. تجرّب من غير ما تطبع

- DevTools › Ctrl+Shift+P › اكتب «Rendering» › «Emulate CSS media type» › print: الصفحة بتتعرض بـ CSS الطباعة على الشاشة (من غير تقسيم صفحات).
- Ctrl+P › الوجهة «Save as PDF»: بيوريك التقسيم الحقيقي وعدد الورق.

---

## الخلاصة

- [[@media print { ... }]] للشكل على الورق، و [[@page { size; margin }]] للورقة نفسها.
- thead و tfoot بيتكرروا لوحدهم طول ما الـ [[display]] بتاعهم الافتراضي.
- [[break-inside: avoid]] على الصف أو الكارت عشان ميتقطعش.
- الخلفيات مبتتطبعش إلا بـ [[print-color-adjust: exact]].
- اطبع الروابط بـ [[attr(href)]]، وخبّي كل اللي ملوش لازمة على الورق.`,
          lines: [
            R`هيدر الموقع، وعليه class تاني [[no-print]] (اسم من عندنا) عشان يختفي من الورق بس ويفضل على الشاشة.`,
            R`الفاتورة نفسها جوه [[<main>]]: ده المحتوى اللي هيتطبع.`,
            R`عنوان الفاتورة، والرقم الإنجليزي جوه [[<bdi>]] عشان يتطبع بنفس ترتيب حروفه وسط الكلام العربي.`,
            R`جدول الأصناف بالـ class اللي الـ CSS هيستخدمه.`,
            R`صف العناوين جوه [[<thead>]]: ده اللي بيتكرر فوق كل ورقة لوحده.`,
            R`صفوف الأصناف (هنا [[...]] مكان الصفوف الحقيقية): كل صنف [[<tr>]].`,
            R`صف الإجمالي جوه [[<tfoot>]]: بيتكرر تحت كل ورقة، و [[colspan="2"]] بيخلي «الإجمالي» ياخد مكان عمودين.`,
            R`نهاية الجدول: الملاحظة اللي بعده برّه الجدول فبتتطبع مرة واحدة في آخر ورقة، مش مع كل ورقة زي الـ tfoot.`,
            R`ملاحظة الدفع وفيها لينك. على الورق اللينك مبيتضغطش، فالـ CSS هيكتب الرابط جنبه.`,
            R`نهاية الـ main: الفاتورة خلصت، والزرار اللي بعدها برّه المحتوى اللي بيتطبع.`,
            R`زرار بيفتح نافذة الطباعة: [[print()]] هي [[window.print()]]. وعليه [[no-print]] لأن الزرار ملوش معنى على الورق.`,
            R`الورقة: [[size: A4]] (في الـ PDF طلعت 595×842 نقطة) وهامش [[12mm]] من كل ناحية.`,
            R`رقم الصفحة في الهامش اللي تحت في النص: [[counter(page)]] الصفحة دي و [[counter(pages)]] العدد كله. اتجرّب في Chrome 156، والمتصفح اللي مش بيدعمه بيتجاهله.`,
            R`كل اللي جوه القوسين ده بيشتغل وقت الطباعة بس (أو Save as PDF أو محاكاة print في DevTools).`,
            R`أي عنصر عليه [[no-print]] بيختفي من الورق: الهيدر والزرار.`,
            R`من غير هامش زيادة (الـ [[@page]] عامل الهامش)، وخط [[11pt]] (وحدة الطباعة)، وكلام أسود على أبيض.`,
            R`الصف مبيتقطعش نصين بين ورقتين: لو مش هيكفي، بينزل كله في الورقة اللي بعدها.`,
            R`لون خلفية العناوين، و [[print-color-adjust: exact]] بيخليه يتطبع حتى لو «Background graphics» مقفولة (وهي مقفولة من الأول).`,
            R`بعد اللينك اكتب الرابط بين قوسين: [[attr(href)]] بيجيب قيمة الـ [[href]] نفسها.`,
            R`نهاية الـ [[@media print]].`
          ],
          sol: R`بـ ٦٠ صنف الـ preview بيقول ٣ ورقات A4 (في Chrome 156 بالخط ده؛ لو خطك أكبر ممكن تطلع ٤). كل ورقة فوقها صف العناوين (الصنف، الكمية، السعر) وتحتها صف «الإجمالي 1,250 ج»، وتحت خالص «صفحة 1 من 3» وهكذا. الهيدر «بُن الصباح» وزرار «اطبع الفاتورة» مش موجودين، والرابط [[https://example.com/pay]] مكتوب جنب «ادفع أونلاين» في آخر ورقة.

لما «Background graphics» مقفولة: خلفية العناوين اللبني لسه ظاهرة (بسبب [[print-color-adjust: exact]])، وخلفية الصفحة الرمادي اللي على الشاشة مش ظاهرة. ولما تمسح سطر [[print-color-adjust]]: العناوين بقت بيضا من غير لون. ولو فتحت Background graphics اللون بيرجع، بس ده قرار المستخدم مش قرارك.`,
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** إيصال حجز لـ «عيادة الشفاء» (اسم متخيل) بيتطبع على [[size: A5]]: اسم المريض، والميعاد، ورقم الحجز جوه [[<bdi>]]، وجدول صغير بالخدمات، وشارة «مدفوع» خضرا بـ [[print-color-adjust: exact]]، وزرار «اطبع» مبيظهرش على الورق.`, done: R`في Save as PDF الإيصال ورقة A5 واحدة، والشارة الخضرا ظاهرة والخلفيات مقفولة، والزرار مش موجود، والإيصال على الشاشة لسه شكله زي ما هو.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>إيصال حجز</title>
<style>
  body { font-family: system-ui; margin: 16px; color: #111; }
  .receipt { max-width: 420px; margin-inline: auto; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 6px; border-block-end: 1px solid #ccc; text-align: start; }
  .paid {
    display: inline-block;
    padding: 2px 12px;
    border-radius: 999px;
    background: #15803d;
    color: #fff;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @page { size: A5; margin: 12mm; }
  @media print {
    .no-print { display: none; }
    body { margin: 0; }
  }
</style>
</head>
<body>
<main class="receipt">
  <h1>عيادة الشفاء</h1>
  <p>المريض: منى علي</p>
  <p>الميعاد: ١ مارس، ١٠:٣٠ صباحًا</p>
  <p>رقم الحجز: <bdi>BK-2026-17</bdi></p>
  <table>
    <caption>الخدمات</caption>
    <thead><tr><th scope="col">الخدمة</th><th scope="col">السعر</th></tr></thead>
    <tbody>
      <tr><td>كشف</td><td>300 ج</td></tr>
      <tr><td>أشعة</td><td>450 ج</td></tr>
    </tbody>
  </table>
  <p><span class="paid">مدفوع</span></p>
  <button type="button" class="no-print" onclick="window.print()">اطبع</button>
</main>
</body>
</html>
~~~

**السطور المهمة:**

- [[@page { size: A5; }]]: مقاس الورقة نفسها. وفي نافذة الطباعة Chrome بياخد المقاس ده، ومبيبقاش فيه اختيار تاني.
- المتصفحات مبتطبعش الخلفيات افتراضيًا عشان توفر الحبر. [[print-color-adjust: exact]] بتقول «اللون ده معلومة، اطبعه». والسطر اللي بـ [[-webkit-]] للمتصفحات الأقدم.
- [[.no-print]]: مش عايزين زرار على ورقة.
- [[bdi]]: عشان رقم الحجز الإنجليزي ميتلخبطش جوه السطر العربي.

**الغلطة الشائعة:** تعتقد إن الشارة الخضرا هتطلع لوحدها، فتطبع الكلام الأبيض على ورقة بيضا: كلمة «مدفوع» تختفي. جرّب Save as PDF والخلفيات مقفولة، زي أغلب الناس.

~~~text الناتج
Save as PDF والخلفيات مقفولة (printBackground: false):
عدد الورق = 1   المقاس = 420x595 نقطة (A5 = 420×595)
اللون الأخضر موجود في الـ PDF: true
من غير print-color-adjust: false

display بتاع الزرار في الطباعة: none   وعلى الشاشة: inline-block
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مقالة في مدونة متخيلة بثيم غامق ([[background: #111; color: #eee]]) وفيها navbar و sidebar وزرار مشاركة. لما حد طبعها طلعت ٧ ورقات فيهم القايمة، والكلام باهت جدًا، واللينكات مش معروف رايحة فين.`, done: R`بعد [[@media print]]: الـ nav والـ aside والأزرار مخفيين، والكلام أسود على أبيض، وكل لينك جنبه الرابط بين قوسين، وعدد الورق قلّ (اكتب الرقم قبل وبعد).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقالة</title>
<style>
  body { background: #111; color: #eee; font-family: system-ui; margin: 0; }
  nav, aside { background: #222; padding: 16px; }
  main { padding: 16px; line-height: 1.8; font-size: 1.125rem; }
  a { color: #93c5fd; }

  @media print {
    nav, aside, .share { display: none; }
    body { background: #fff; color: #000; }
    main { padding: 0; font-size: 12pt; line-height: 1.5; }
    a { color: #000; }
    main a[href^="http"]::after { content: " (" attr(href) ")"; font-size: .85em; }
    h1, h2 { break-after: avoid; }
    p { orphans: 3; widows: 3; }
  }
</style>
</head>
<body>
<nav aria-label="الرئيسية"><a href="/">الرئيسية</a></nav>
<aside aria-label="مقالات تانية"><p>مقالات شبهها</p><p>الأكثر قراءة</p></aside>
<main id="m">
  <h1>إزاي تخزن القهوة</h1>
  <button class="share" type="button">شارك</button>
  <p>القهوة بتفقد ريحتها بسرعة، واقرا <a href="https://example.com/coffee">الدليل الكامل</a> لتفاصيل أكتر.</p>
</main>
<script>
  // بيكرر فقرة عشان المقالة تبقى طويلة زي مقالة حقيقية
  const main = document.querySelector('#m');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('p');
    p.textContent = 'خلي البن في علبة مقفولة بعيد عن الضوء والحرارة، واشتري كميات صغيرة، وماتطحنش غير اللي هتستخدمه. '.repeat(4);
    main.append(p);
  }
$__lt/script>
</body>
</html>
~~~

**القرارات:**

- [[display: none]] على القايمة والجانب والأزرار: لا ليهم معنى على ورق.
- أسود على أبيض: المتصفح بيشيل الخلفية الغامقة، بس لون الكلام [[#eee]] بيفضل، فبيطبع رمادي فاتح على ورقة بيضا. ده اللي كان «باهت».
- [[attr(href)]]: الورقة مفيهاش ضغط، فلازم الرابط نفسه يتكتب. و [[^="http"]] بيخليه للروابط الكاملة بس.
- [[break-after: avoid]]: العنوان ميفضلش لوحده في آخر ورقة.
- [[orphans]] و [[widows]]: أقل عدد سطور يفضل في أول أو آخر ورقة من الفقرة.

**الغلطة الشائعة:** تكتب ملف CSS منفصل للطباعة وتنساه لما التصميم يتغيّر. [[@media print]] في نفس الملف بيبقى قدامك.

~~~text الناتج
                 قبل           بعد
عدد الورق         6            4
لون الكلام        rgb(238, 238, 238)   rgb(0, 0, 0)
nav ظاهر          block            none

آخر اللينك في الطباعة: " (https://example.com/coffee)"
تباين الكلام على ورقة بيضا: قبل 1.16:1  بعد 21:1
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** جدول ١٢ صف كل صف فيه ملاحظة طويلة (٨ سطور). اعمله PDF مرة من غير [[tr { break-inside: avoid; }]] ومرة بيه، وفي كل مرة عدّ الصفوف اللي اتقطعت بين ورقتين.`, done: R`من غير avoid فيه صفوف اتقطعت (في Chrome 156 بالـ A4 وخط 14pt اتقطع صف واحد في صفحة الحل، والعدد بيتغيّر مع طول المحتوى)، وبيه صفر، وعدد الورق ممكن يزيد ورقة عشان الصف بينزل كله. وكتبت ليه ده أحسن في فاتورة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الملاحظات</title>
<style>
  @page { size: A4; margin: 15mm; }
  body { font: 14pt system-ui; margin: 0; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #999; padding: 6px; text-align: start; vertical-align: top; }
  tr { break-inside: avoid; }
</style>
</head>
<body>
<main>
<h1>تقرير الصيانة</h1>
<table>
  <thead><tr><th scope="col">رقم</th><th scope="col">الملاحظة</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
</main>
<script>
  const rows = [];
  for (let i = 1; i <= 12; i++) {
    const lines = Array.from({ length: 8 }, (_, n) => 'R' + i + 'L' + (n + 1) + ' ملاحظة الزيارة');
    rows.push('<tr><td>' + i + '</td><td>' + lines.join('<br>') + '</td></tr>');
  }
  document.querySelector('#rows').innerHTML = rows.join('');
$__lt/script>
</body>
</html>
~~~

**السطر محل التجربة:** [[tr { break-inside: avoid; }]]. من غيره الصف بيتقسم عند أي سطر، فنص الملاحظة في ورقة ونصها في التانية. وبيه، لو الصف مش هيكفي في الورقة، بينزل كله للي بعدها.

**إزاي عدّينا:** كل سطر جواه علامة زي [[R3L1]] لأول سطر و [[R3L8]] لآخر سطر. قرينا نص كل ورقة في الـ PDF: الصف مقطوع لو علامته الأولى في ورقة والأخيرة في ورقة تانية. ولو عايز تعد بعينك، افتح الـ PDF ودوّر على الصف اللي نصه في آخر الورقة.

**ليه ده أحسن في فاتورة:** بند مقسوم بين ورقتين بيخلي الاسم في ورقة والسعر في ورقة، والقارئ يغلط في الجمع، وورقة زيادة أرخص من غلطة.

**الغلطة الشائعة:** تحط [[break-inside: avoid]] على [[table]] كلها. لو الجدول أطول من ورقة، المتصفح مش هيقدر، وممكن يبدأ الجدول في ورقة جديدة ويسيب اللي قبلها فاضية.

~~~text الناتج
Chrome، A4، خط 14pt، ١٢ صف كل صف ٨ سطور:

                   عدد الورق     صفوف مقطوعة
من غير avoid       3             1  (الصفوف 9)
بـ avoid           3             0
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جدول الطلبات اتحوّل لكروت على الموبايل بـ [[.items thead { display: block; }]] (أو none) برّه أي media query. لما الجدول الطويل يتطبع، العناوين هتتكرر فوق كل ورقة؟`, done: R`لأ: في التجربة كلمة العنوان ظهرت في أول ورقة بس، لأن التكرار جاي من [[display: table-header-group]] الافتراضي. الحل [[@media print { .items thead { display: table-header-group; } }]] أو تحط CSS الكروت جوه media query للشاشات الصغيرة بس.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات</title>
<style>
  /* الغلط: برّه أي media query */
  .items thead { display: block; }
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #999; padding: 40px 8px; }
</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<table class="items">
  <thead><tr><th scope="col">HEADWORD</th><th scope="col">الإجمالي</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
</main>
<script>
  let html = '';
  for (let i = 1; i <= 40; i++) html += '<tr><td>' + i + '</td><td>100 ج</td></tr>';
  document.querySelector('#rows').innerHTML = html;
$__lt/script>
</body>
</html>
~~~

**التوقّع الصح:** لأ، هتظهر في أول ورقة بس.

**ليه:** [[thead]] افتراضيًا [[display: table-header-group]]، والقيمة دي هي اللي بتقول للمتصفح «كرر الصف ده فوق كل ورقة». أول ما كتبت [[display: block]] أو [[none]]، الميزة دي راحت. و [[display: none]] أسوأ: مفيش عنوان خالص.

**التصليح الأحسن:** خلي CSS الكروت للشاشات الصغيرة بس، فالطباعة متتأثرش:

~~~css
@media screen and (max-width: 40rem) {
  .items thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
}
~~~

ولو الكود مش في إيدك، رجّعها في الطباعة:

~~~css
@media print {
  .items thead { display: table-header-group; }
}
~~~

و [[@media screen]] مهمة: [[max-width]] لوحدها ممكن تتطبق على عرض ورقة A4 لو كان أقل من الرقم.

**الغلطة الشائعة:** تعالج الموبايل وتنسى الطباعة، والمشكلة مبتبانش غير لما عميل يطبع فاتورة طويلة.

~~~text الناتج
                                   عدد الورق     الورق اللي فيه العنوان
thead { display: block } (الغلط)    4             1
بعد @media print                    5             5
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN اعرف [[@page :first]] و [[break-before: page]] و [[orphans]] و [[widows]]، واعمل تقرير بيتطبع: صفحة غلاف من غير رقم صفحة، وكل قسم يبدأ في ورقة جديدة، ومفيش سطر لوحده في آخر ورقة أو أولها.`, done: R`الغلاف ورقة لوحده ومفيش عليه «صفحة 1» (حطيت [[@page :first { @bottom-center { content: none; } }]])، وكل h2 بيبدأ ورقة جديدة، وفهمت إن orphans و widows بيشتغلوا على السطور جوه الفقرة الواحدة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تقرير المبيعات</title>
<style>
  @page {
    size: A4;
    margin: 20mm;
    @bottom-center { content: "Page " counter(page); }
  }
  @page :first {
    @bottom-center { content: none; }
  }
  body { font: 12pt/1.6 system-ui; margin: 0; }
  .cover { text-align: center; padding-block-start: 30vh; }
  h2 { break-before: page; }
  p { orphans: 3; widows: 3; }
</style>
</head>
<body>
<main>
  <section class="cover">
    <h1>تقرير المبيعات</h1>
    <p>الربع الأول</p>
  </section>
  <section><h2>الملخص</h2><p>Section-one المبيعات زادت في كل الفروع.</p></section>
  <section><h2>الفروع</h2><p>Section-two الفرع الشمالي الأعلى.</p></section>
  <section><h2>التوصيات</h2><p>Section-three زوّدوا المخزون.</p></section>
</main>
</body>
</html>
~~~

**اللي طلع من الوثائق:**

- [[@page :first]]: قواعد لأول ورقة بس. فالغلاف مفيهوش رقم، و [[content: none]] بتلغي اللي اتكتب في [[@page]] العام.
- [[@bottom-center]]: مكان في هامش الورقة (margin box)، و [[counter(page)]] رقم الورقة.
- [[break-before: page]]: ابدأ ورقة جديدة قبل العنصر ده.
- [[orphans]]: أقل عدد سطور يفضل في **آخر** الورقة لو الفقرة هتتقسم. و [[widows]]: أقل عدد ينزل في **أول** الورقة الجاية. الاتنين بيشتغلوا جوه الفقرة الواحدة، مش بين فقرتين.

استخدمنا كلمة [[Page]] بالإنجليزي عشان القراءة الآلية للـ PDF تعدّها بسهولة. في تقرير عربي اكتب [[content: "صفحة " counter(page)]].

**الغلطة الشائعة:** تحط [[break-before: page]] على [[section]] الأول كمان، فتبقى فيه ورقة فاضية بعد الغلاف. هنا العنوان بس هو اللي بيكسر، والغلاف مفيهوش h2.

~~~text الناتج
عدد الورق = 4

ورقة 1: الغلاف   رقم الصفحة: مفيش
ورقة 2: Section-one   رقم الصفحة: Page 2
ورقة 3: Section-two   رقم الصفحة: Page 3
ورقة 4: Section-three   رقم الصفحة: Page 4
axe: 0 violations
~~~` },
          ]
        }
      ]
    }
]);
