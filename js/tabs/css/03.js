// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الجداول",
      pre: [
        { to: "css/semantic HTML", why: R`الجدول للبيانات بس، والاختيار ده بنفس منطق الـ semantic HTML` },
      ],
      projects: [
        { lvl: 'صغير', dir: "gym-compare", t: R`جدول باقات جيم متخيل`, what: R`جدول بيقارن ٣ باقات لـ «جيم الأبطال» (شهري، ٣ شهور، سنوي): caption، و th بـ [[scope="col"]] لأسامي الباقات، و th بـ [[scope="row"]] لكل ميزة (السعر، الحصص، الساونا)، وعلامة ✓ أو ✗ في الخلايا ومعاها كلام مخفي بالشكل للقارئ («موجود» أو «مش موجود»)، و tfoot فيه زرار «اشترك» لكل باقة. من درس «table».`, done: R`تاب Accessibility بيقول [[columnheader]] لأسامي الباقات و [[rowheader]] للمميزات، واسم الجدول من الـ caption، وقارئ الشاشة (أو ARIA snapshot) بيقرا «الساونا، سنوي، موجود» مش «✓» بس.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قارن الباقات: جيم الأبطال</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  table { width: 100%; max-width: 640px; margin-inline: auto; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; }
  h1 { max-width: 640px; margin: 0 auto 12px; font-size: 24px; }
  caption { font-size: 18px; font-weight: 700; padding-block: 0 12px; }
  th, td { padding: 12px 10px; border-block-end: 1px solid #e2e8f0; text-align: center; }
  thead th { background: #0f766e; color: white; }
  tbody th { text-align: start; font-weight: 600; }
  .yes { color: #15803d; font-size: 20px; }
  .no { color: #b91c1c; font-size: 20px; }
  tfoot td { border: 0; }
  tfoot a { display: inline-block; padding: 8px 14px; border-radius: 8px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
</head>
<body>
<main>
<h1>باقات جيم الأبطال</h1>
<table>
  <caption>قارن باقات جيم الأبطال</caption>
  <thead>
    <tr>
      <td></td>
      <th scope="col">شهري</th>
      <th scope="col">٣ شهور</th>
      <th scope="col">سنوي</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">السعر</th>
      <td>٥٠٠ ج</td><td>١٣٠٠ ج</td><td>٤٥٠٠ ج</td>
    </tr>
    <tr>
      <th scope="row">حصص مع مدرب</th>
      <td>٢</td><td>٨</td><td>٤٠</td>
    </tr>
    <tr>
      <th scope="row">الساونا</th>
      <td><span class="no" aria-hidden="true">✗</span><span class="visually-hidden">مش موجود</span></td>
      <td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">موجود</span></td>
      <td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">موجود</span></td>
    </tr>
    <tr>
      <th scope="row">تجميد الاشتراك</th>
      <td><span class="no" aria-hidden="true">✗</span><span class="visually-hidden">مش موجود</span></td>
      <td><span class="no" aria-hidden="true">✗</span><span class="visually-hidden">مش موجود</span></td>
      <td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">موجود</span></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td><a href="signup.html?plan=month" aria-label="اشترك في الباقة الشهري">اشترك</a></td>
      <td><a href="signup.html?plan=quarter" aria-label="اشترك في باقة ٣ شهور">اشترك</a></td>
      <td><a href="signup.html?plan=year" aria-label="اشترك في الباقة السنوي">اشترك</a></td>
    </tr>
  </tfoot>
</table>
</main>
</body>
</html>
~~~

~~~view 420 460 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قارن الباقات: جيم الأبطال</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }
  table { width: 100%; max-width: 640px; margin-inline: auto; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; }
  h1 { max-width: 640px; margin: 0 auto 12px; font-size: 24px; }
  caption { font-size: 18px; font-weight: 700; padding-block: 0 12px; }
  th, td { padding: 12px 10px; border-block-end: 1px solid #e2e8f0; text-align: center; }
  thead th { background: #0f766e; color: white; }
  tbody th { text-align: start; font-weight: 600; }
  .yes { color: #15803d; font-size: 20px; }
  .no { color: #b91c1c; font-size: 20px; }
  tfoot td { border: 0; }
  tfoot a { display: inline-block; padding: 8px 14px; border-radius: 8px; background: #0f766e; color: white; text-decoration: none; font-weight: 700; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
</head>
<body>
<main>
<h1>باقات جيم الأبطال</h1>
<table>
  <caption>قارن باقات جيم الأبطال</caption>
  <thead>
    <tr>
      <td></td>
      <th scope="col">شهري</th>
      <th scope="col">٣ شهور</th>
      <th scope="col">سنوي</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">السعر</th>
      <td>٥٠٠ ج</td><td>١٣٠٠ ج</td><td>٤٥٠٠ ج</td>
    </tr>
    <tr>
      <th scope="row">حصص مع مدرب</th>
      <td>٢</td><td>٨</td><td>٤٠</td>
    </tr>
    <tr>
      <th scope="row">الساونا</th>
      <td><span class="no" aria-hidden="true">✗</span><span class="visually-hidden">مش موجود</span></td>
      <td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">موجود</span></td>
      <td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">موجود</span></td>
    </tr>
    <tr>
      <th scope="row">تجميد الاشتراك</th>
      <td><span class="no" aria-hidden="true">✗</span><span class="visually-hidden">مش موجود</span></td>
      <td><span class="no" aria-hidden="true">✗</span><span class="visually-hidden">مش موجود</span></td>
      <td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">موجود</span></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td><a href="signup.html?plan=month" aria-label="اشترك في الباقة الشهري">اشترك</a></td>
      <td><a href="signup.html?plan=quarter" aria-label="اشترك في باقة ٣ شهور">اشترك</a></td>
      <td><a href="signup.html?plan=year" aria-label="اشترك في الباقة السنوي">اشترك</a></td>
    </tr>
  </tfoot>
</table>
</main>
</body>
</html>
~~~

**هتشوف إيه:** عنوان، وتحته جدول أبيض بحواف مدوّرة: صف أخضر غامق فوق فيه أسامي الباقات، وكل صف تحته ميزة (السعر، والحصص، والساونا، وتجميد الاشتراك)، والعلامات ✓ خضرا و ✗ حمرا، وفي الآخر زرار «اشترك» أخضر تحت كل باقة.

**ليه كل حتة:**
- [[<caption>]]: اسم الجدول. قارئ الشاشة بيقوله أول ما يدخل الجدول، وهو اللي بيبقى اسم الـ table في شجرة الـ accessibility.
- [[<th scope="col">]] لأسامي الباقات و [[<th scope="row">]] لأسامي المميزات: كده كل خلية ليها عنوانين. قارئ الشاشة وانت ماشي في الجدول بيقول «سنوي، الساونا، موجود».
- الخانة الفاضية فوق على اليمين [[<td>]] مش [[<th>]]: هي مش عنوان لحاجة.
- ✓ و ✗ عليهم [[aria-hidden="true"]]، وجنبهم كلام مخفي بالشكل بس («موجود» أو «مش موجود»). من غيره قارئ الشاشة بيقول «check mark» أو «multiplication x»، أو مبيقولش حاجة خالص.
- [[<tfoot>]] للأزرار: صف تحت كل الأعمدة. واللينك عليه [[aria-label]] بالباقة، عشان لو حد عرض لستة اللينكات في الصفحة ميلاقيش «اشترك» تلات مرات من غير ما يعرف أنهي.

**الغلطة اللي axe مسكها:** النسخة الأولى مكانش فيها [[<h1>]] ([[page-has-heading-one]]). الـ caption اسم الجدول، مش عنوان الصفحة.

~~~text الناتج (Chrome، شجرة الـ accessibility)
table "قارن باقات جيم الأبطال"
  cell (فاضية)   columnheader "شهري"   columnheader "٣ شهور"   columnheader "سنوي"
  rowheader "السعر"           cell "٥٠٠ ج"     cell "١٣٠٠ ج"    cell "٤٥٠٠ ج"
  rowheader "الساونا"         cell "مش موجود"  cell "موجود"     cell "موجود"
  rowheader "تجميد الاشتراك"  cell "مش موجود"  cell "مش موجود"  cell "موجود"
  cell "اشترك في الباقة الشهري"   cell "اشترك في باقة ٣ شهور"   cell "اشترك في الباقة السنوي"
axe: 0 violations (كانت page-has-heading-one قبل الـ h1)   الـ validator: مفيش رسايل   overflow على 360: 0
~~~` },
        { lvl: 'صغير', dir: "clinic-hours", t: R`مواعيد عيادة على الموبايل`, what: R`جدول مواعيد أطبا لـ «عيادة الشفاء» فيه ٧ أعمدة (أيام الأسبوع) جوه wrapper بـ [[overflow-x: auto]] و [[tabindex="0"]] و [[role="region"]]، وأول عمود (اسم الدكتور) [[position: sticky]] على [[inset-inline-start: 0]] عشان يفضل ظاهر وانت بتعمل scroll. من درس «جدول responsive».`, done: R`على 360px الصفحة مفيهاش scroll أفقي ([[document.documentElement.scrollWidth]] = 360) والجدول بس اللي بيتحرك، واسم الدكتور فاضل مكانه وانت بتتحرك، والـ wrapper بياخد focus بـ Tab والأسهم بتحرّكه.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مواعيد الأطبا: عيادة الشفاء</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; margin: 0; padding: 16px; background: #f0f9ff; color: #0c4a6e; }
  h1 { font-size: 22px; margin: 0 0 12px; }
  /* only this box scrolls sideways, never the page */
  .scroll { overflow-x: auto; border-radius: 12px; background: white; }
  .scroll:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
  table { border-collapse: separate; border-spacing: 0; min-width: 760px; }
  caption { text-align: start; padding: 12px; font-weight: 700; }
  th, td { padding: 10px 12px; border-block-end: 1px solid #e0f2fe; white-space: nowrap; text-align: center; }
  thead th { background: #e0f2fe; }
  /* the doctor's name stays on the start side while the days move under it */
  tbody th, thead th:first-child { position: sticky; inset-inline-start: 0; background: white; text-align: start; box-shadow: -1px 0 0 #bae6fd inset; }
  thead th:first-child { background: #e0f2fe; z-index: 1; }
  .off { color: #94a3b8; }
</style>
</head>
<body>
<main>
<h1>مواعيد الأطبا</h1>
<div class="scroll" role="region" aria-labelledby="cap" tabindex="0">
  <table>
    <caption id="cap">مواعيد الأسبوع (حرّك الجدول بالعرض)</caption>
    <thead>
      <tr><th scope="col">الدكتور</th><th scope="col">السبت</th><th scope="col">الحد</th><th scope="col">الاتنين</th><th scope="col">التلات</th><th scope="col">الأربع</th><th scope="col">الخميس</th><th scope="col">الجمعة</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">د. سلمى فؤاد (قلب)</th><td>٥–٩</td><td class="off">إجازة</td><td>٥–٩</td><td class="off">إجازة</td><td>٥–٩</td><td>١٠–٢</td><td class="off">إجازة</td></tr>
      <tr><th scope="row">د. كريم ناجي (عظام)</th><td class="off">إجازة</td><td>٤–٨</td><td class="off">إجازة</td><td>٤–٨</td><td class="off">إجازة</td><td>٤–٨</td><td class="off">إجازة</td></tr>
      <tr><th scope="row">د. هالة سمير (جلدية)</th><td>١٠–٢</td><td>١٠–٢</td><td>١٠–٢</td><td class="off">إجازة</td><td>٦–١٠</td><td class="off">إجازة</td><td class="off">إجازة</td></tr>
    </tbody>
  </table>
</div>
</main>
</body>
</html>
~~~

~~~view 300 300 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مواعيد الأطبا: عيادة الشفاء</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; margin: 0; padding: 16px; background: #f0f9ff; color: #0c4a6e; }
  h1 { font-size: 22px; margin: 0 0 12px; }
  /* only this box scrolls sideways, never the page */
  .scroll { overflow-x: auto; border-radius: 12px; background: white; }
  .scroll:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
  table { border-collapse: separate; border-spacing: 0; min-width: 760px; }
  caption { text-align: start; padding: 12px; font-weight: 700; }
  th, td { padding: 10px 12px; border-block-end: 1px solid #e0f2fe; white-space: nowrap; text-align: center; }
  thead th { background: #e0f2fe; }
  /* the doctor's name stays on the start side while the days move under it */
  tbody th, thead th:first-child { position: sticky; inset-inline-start: 0; background: white; text-align: start; box-shadow: -1px 0 0 #bae6fd inset; }
  thead th:first-child { background: #e0f2fe; z-index: 1; }
  .off { color: #94a3b8; }
</style>
</head>
<body>
<main>
<h1>مواعيد الأطبا</h1>
<div class="scroll" role="region" aria-labelledby="cap" tabindex="0">
  <table>
    <caption id="cap">مواعيد الأسبوع (حرّك الجدول بالعرض)</caption>
    <thead>
      <tr><th scope="col">الدكتور</th><th scope="col">السبت</th><th scope="col">الحد</th><th scope="col">الاتنين</th><th scope="col">التلات</th><th scope="col">الأربع</th><th scope="col">الخميس</th><th scope="col">الجمعة</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">د. سلمى فؤاد (قلب)</th><td>٥–٩</td><td class="off">إجازة</td><td>٥–٩</td><td class="off">إجازة</td><td>٥–٩</td><td>١٠–٢</td><td class="off">إجازة</td></tr>
      <tr><th scope="row">د. كريم ناجي (عظام)</th><td class="off">إجازة</td><td>٤–٨</td><td class="off">إجازة</td><td>٤–٨</td><td class="off">إجازة</td><td>٤–٨</td><td class="off">إجازة</td></tr>
      <tr><th scope="row">د. هالة سمير (جلدية)</th><td>١٠–٢</td><td>١٠–٢</td><td>١٠–٢</td><td class="off">إجازة</td><td>٦–١٠</td><td class="off">إجازة</td><td class="off">إجازة</td></tr>
    </tbody>
  </table>
</div>
</main>
</body>
</html>
~~~

**هتشوف إيه:** على الكمبيوتر الجدول كله ظاهر. على «موبايل» بتشوف عمود الدكتور وجنبه يومين تلاتة بس، والصندوق الأبيض بيتحرك بالعرض (بالصباع أو بالأسهم) والصفحة نفسها ثابتة. وانت بتحرّكه اسم الدكتور فاضل مكانه والأيام بتعدّي تحته.

**ليه كده:**
- **[[overflow-x: auto]] على الـ div، مش على الجدول ولا الصفحة:** الجدول نفسه عرضه 760px ([[min-width]])، والصندوق بس اللي بيعمل scroll. الصفحة عرضها 360 زي ما هي.
- **[[tabindex="0"]]:** من غيره الصندوق مبياخدش focus، واللي معهوش ماوس ولا صباع (كيبورد بس) ميقدرش يحرّكه. و [[role="region"]] و [[aria-labelledby]] بيدّوه اسم، عشان قارئ الشاشة يقول إيه اللي واقف عليه.
- **[[position: sticky]] و [[inset-inline-start: 0]] على أول عمود:** [[inset-inline-start]] معناها «أول السطر»، يعني اليمين في صفحة عربي والشمال في صفحة إنجليزي. ولازم الخلية يبقى ليها [[background]]، وإلا الأيام اللي بتعدّي تحتها هتبان من وراها.
- **[[border-collapse: separate]]:** مع [[collapse]] الحدود ممكن تختفي من الخلية اللازقة وانت بتعمل scroll، فبنستخدم [[box-shadow]] كخط فاصل.
- **[[white-space: nowrap]]:** «د. سلمى فؤاد (قلب)» تفضل سطر واحد.

**فخ اتقاس:** في صفحة [[dir="rtl"]] الـ [[scrollLeft]] بيبدأ من [[0]] ويروح **بالسالب** وانت بتتحرك (اتقاس: [[-120]] بعد ٣ أسهم). لو كتبت JavaScript بيقول «لو [[scrollLeft > 0]] يبقى المستخدم اتحرك»، مش هيشتغل في العربي أبدًا. استخدم [[Math.abs(box.scrollLeft)]].

~~~text الناتج (Chrome، موبايل 360)
الصفحة                scrollWidth = 360 من 360 (مفيش scroll أفقي)
الصندوق               scrollWidth = 760 جوه 328
Tab                   الـ focus على .scroll
٣ ضغطات سهم شمال      scrollLeft = -120
اسم الدكتور           حافته فضلت عند 344 قبل وبعد
أول يوم (السبت)        حافته اتحركت من 145 لـ 265 (دخل تحت عمود الاسم)
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'صغير', dir: "progress-report", t: R`تقرير تقدّم مشروع: كروت أرقام وجدول بأشرطة`, what: R`صفحة واحدة غامقة بـ HTML و CSS بس (من غير JavaScript) لتقرير أسبوعي عن تطبيق متخيل اسمه «رسمة»: فوق ٤ كروت أرقام كبيرة ([[<ul>]]، و grid بـ [[auto-fit]] و [[minmax(min(160px, 100%), 1fr)]])، وتحت جدول الأجزاء: اسم الجزء [[<th scope="row">]]، وشريط تقدّم عرضه جاي من رقم مكتوب في الـ HTML نفسه ([[style="--p: 85"]] و [[width: calc(var(--p) * 1%)]])، والرقم جنبه مكتوب كلام، وعمود اختبارات بـ [[tabular-nums]]، وشارة حالة ملوّنة. نمط تقارير التقدّم اللي أي فريق بيبعتها كل أسبوع. من دروس «table» و «جدول responsive».`, done: R`تغيير [[--p]] في سطر واحد في الـ HTML بيغيّر طول الشريط بس (من غير ما تلمس الـ CSS)، والشرايط بتطلع 100% و 85% و 70% و 40% و 0% من عرض مكانها، والكروت ٤ جنب بعض على 800 وواحد في السطر على 360 من غير scroll أفقي، و axe صفر violations (التباين كمان على الخلفية الغامقة).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تقرير تقدّم: تطبيق «رسمة»</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #0f172a; color: #e2e8f0; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
  main { max-width: 820px; margin-inline: auto; }
  h1 { margin: 0 0 4px; font-size: 24px; }
  .sub { margin: 0 0 16px; color: #94a3b8; }

  /* the KPI cards: as many as fit, never narrower than 160px */
  .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr)); gap: 12px; margin: 0 0 20px; padding: 0; list-style: none; }
  .kpis li { padding: 14px; border-radius: 14px; background: #1e293b; }
  .kpis b { display: block; font-size: 30px; font-variant-numeric: tabular-nums; color: white; }
  .kpis span { color: #94a3b8; font-size: 14px; }

  table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 14px; overflow: hidden; }
  caption { text-align: start; font-weight: 700; padding-block-end: 8px; }
  th, td { padding: 10px 12px; text-align: start; border-block-end: 1px solid #334155; }
  thead th { color: #94a3b8; font-weight: 600; font-size: 13px; }
  .num { text-align: end; font-variant-numeric: tabular-nums; }

  /* the bar's width comes from the number in the HTML: style="--p: 72" */
  .meter { display: flex; align-items: center; gap: 8px; }
  .meter i { flex: 1; height: 8px; border-radius: 99px; background: #334155; overflow: hidden; }
  .meter i::before { content: ""; display: block; height: 100%; width: calc(var(--p) * 1%); background: #38bdf8; border-radius: inherit; }

  .badge { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 13px; font-weight: 700; }
  .done { background: #14532d; color: #bbf7d0; }
  .doing { background: #713f12; color: #fde68a; }
  .todo { background: #334155; color: #e2e8f0; }
</style>
</head>
<body>
<main>
  <h1>تقرير تقدّم: تطبيق «رسمة»</h1>
  <p class="sub">الأسبوع ٤٧ · مقارنة بالأداة المرجعية</p>

  <ul class="kpis">
    <li><b>٧٢٪</b><span>الميزات اللي خلصت</span></li>
    <li><b>٤٧٨/٤٨٠</b><span>فريم مطابق للمرجع</span></li>
    <li><b>١٢</b><span>باج اتقفل الأسبوع ده</span></li>
    <li><b>٣</b><span>مفتوح لسه</span></li>
  </ul>

  <table>
    <caption>الأجزاء</caption>
    <thead><tr><th scope="col">الجزء</th><th scope="col">التقدّم</th><th scope="col" class="num">الاختبارات</th><th scope="col">الحالة</th></tr></thead>
    <tbody>
      <tr><th scope="row">التايم لاين</th><td><div class="meter"><i style="--p: 100" aria-hidden="true"></i><span>١٠٠٪</span></div></td><td class="num">٤٢</td><td><span class="badge done">خلص</span></td></tr>
      <tr><th scope="row">أدوات الرسم</th><td><div class="meter"><i style="--p: 85" aria-hidden="true"></i><span>٨٥٪</span></div></td><td class="num">٣١</td><td><span class="badge doing">شغالين</span></td></tr>
      <tr><th scope="row">الطبقات</th><td><div class="meter"><i style="--p: 70" aria-hidden="true"></i><span>٧٠٪</span></div></td><td class="num">١٨</td><td><span class="badge doing">شغالين</span></td></tr>
      <tr><th scope="row">التصدير</th><td><div class="meter"><i style="--p: 40" aria-hidden="true"></i><span>٤٠٪</span></div></td><td class="num">٦</td><td><span class="badge doing">شغالين</span></td></tr>
      <tr><th scope="row">الصوت</th><td><div class="meter"><i style="--p: 0" aria-hidden="true"></i><span>٠٪</span></div></td><td class="num">٠</td><td><span class="badge todo">لسه</span></td></tr>
    </tbody>
  </table>
</main>
</body>
</html>
~~~

~~~view 560 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تقرير تقدّم: تطبيق «رسمة»</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #0f172a; color: #e2e8f0; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
  main { max-width: 820px; margin-inline: auto; }
  h1 { margin: 0 0 4px; font-size: 24px; }
  .sub { margin: 0 0 16px; color: #94a3b8; }

  /* the KPI cards: as many as fit, never narrower than 160px */
  .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr)); gap: 12px; margin: 0 0 20px; padding: 0; list-style: none; }
  .kpis li { padding: 14px; border-radius: 14px; background: #1e293b; }
  .kpis b { display: block; font-size: 30px; font-variant-numeric: tabular-nums; color: white; }
  .kpis span { color: #94a3b8; font-size: 14px; }

  table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 14px; overflow: hidden; }
  caption { text-align: start; font-weight: 700; padding-block-end: 8px; }
  th, td { padding: 10px 12px; text-align: start; border-block-end: 1px solid #334155; }
  thead th { color: #94a3b8; font-weight: 600; font-size: 13px; }
  .num { text-align: end; font-variant-numeric: tabular-nums; }

  /* the bar's width comes from the number in the HTML: style="--p: 72" */
  .meter { display: flex; align-items: center; gap: 8px; }
  .meter i { flex: 1; height: 8px; border-radius: 99px; background: #334155; overflow: hidden; }
  .meter i::before { content: ""; display: block; height: 100%; width: calc(var(--p) * 1%); background: #38bdf8; border-radius: inherit; }

  .badge { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 13px; font-weight: 700; }
  .done { background: #14532d; color: #bbf7d0; }
  .doing { background: #713f12; color: #fde68a; }
  .todo { background: #334155; color: #e2e8f0; }
</style>
</head>
<body>
<main>
  <h1>تقرير تقدّم: تطبيق «رسمة»</h1>
  <p class="sub">الأسبوع ٤٧ · مقارنة بالأداة المرجعية</p>

  <ul class="kpis">
    <li><b>٧٢٪</b><span>الميزات اللي خلصت</span></li>
    <li><b>٤٧٨/٤٨٠</b><span>فريم مطابق للمرجع</span></li>
    <li><b>١٢</b><span>باج اتقفل الأسبوع ده</span></li>
    <li><b>٣</b><span>مفتوح لسه</span></li>
  </ul>

  <table>
    <caption>الأجزاء</caption>
    <thead><tr><th scope="col">الجزء</th><th scope="col">التقدّم</th><th scope="col" class="num">الاختبارات</th><th scope="col">الحالة</th></tr></thead>
    <tbody>
      <tr><th scope="row">التايم لاين</th><td><div class="meter"><i style="--p: 100" aria-hidden="true"></i><span>١٠٠٪</span></div></td><td class="num">٤٢</td><td><span class="badge done">خلص</span></td></tr>
      <tr><th scope="row">أدوات الرسم</th><td><div class="meter"><i style="--p: 85" aria-hidden="true"></i><span>٨٥٪</span></div></td><td class="num">٣١</td><td><span class="badge doing">شغالين</span></td></tr>
      <tr><th scope="row">الطبقات</th><td><div class="meter"><i style="--p: 70" aria-hidden="true"></i><span>٧٠٪</span></div></td><td class="num">١٨</td><td><span class="badge doing">شغالين</span></td></tr>
      <tr><th scope="row">التصدير</th><td><div class="meter"><i style="--p: 40" aria-hidden="true"></i><span>٤٠٪</span></div></td><td class="num">٦</td><td><span class="badge doing">شغالين</span></td></tr>
      <tr><th scope="row">الصوت</th><td><div class="meter"><i style="--p: 0" aria-hidden="true"></i><span>٠٪</span></div></td><td class="num">٠</td><td><span class="badge todo">لسه</span></td></tr>
    </tbody>
  </table>
</main>
</body>
</html>
~~~

**هتشوف إيه:** خلفية كحلي غامق جدًا، وعنوان أبيض، وتحته ٤ كروت أغمق شوية كل واحد فيه رقم كبير أبيض وكلمة رمادي تحته. وبعدهم جدول كل صف فيه اسم الجزء، وشريط رمادي جواه لون لبني على قد النسبة، والرقم جنبه، وشارة: أخضر «خلص»، وبني «شغالين»، ورمادي «لسه».

**ليه كده:**
- **الشريط من متغيّر:** [[style="--p: 85"]] على العنصر، والـ CSS بيقول [[width: calc(var(--p) * 1%)]]. الرقم في مكان واحد، ولما التقرير يتعمل من بيانات (في كورس JavaScript) السكربت هيغيّر [[--p]] بس.
- **الشريط [[aria-hidden="true"]] والرقم مكتوب جنبه:** الشريط شكل بس، والرقم هو المعلومة. كده قارئ الشاشة بيقرا «٨٥٪» مرة واحدة. (البديل [[<progress>]] أو [[<meter>]]، بس تلوينهم في كل المتصفحات أصعب بكتير.)
- **الكروت [[<ul>]]:** ٤ حاجات من نفس النوع، فهي لستة. وقارئ الشاشة بيقول «list, 4 items».
- **[[minmax(min(160px, 100%), 1fr)]]:** الكارت ميصغرش عن 160px، و [[min(..., 100%)]] بتمنعه يطلع برّه الشاشة لو هي أضيق من 160.
- **الألوان على خلفية غامقة:** الكلام الرمادي [[#94a3b8]] على [[#1e293b]]، والشارات كلامها فاتح على خلفية غامقة من نفس اللون. axe بيقيس التباين فعلًا، وطلع صفر مشاكل.

~~~text الناتج (Chrome)
عرض الشرايط من مكانها     100% 85% 70% 40% 0%
الكروت على 800            4 أعمدة كل واحد 182.2px
الكروت على 360            عمود واحد، و overflow = 0
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'متوسط', dir: "orders-board", t: R`لوحة طلبات لمتجر متخيل`, what: R`جدول طلبات فيه ٣٠ طلب من JSON: عناوين لازقة فوق، وصفوف مخططة، وحالة كل طلب شارة ملوّنة (مدفوع، مستني، ملغي) بلون خلفية فاتح ولون كلام غامق من نفس العيلة، وعمود أرقام [[tabular-nums]]، وترتيب بأزرار جوه الـ th و [[aria-sort]]، والحالة كلها في الـ URL. من دروس الوحدة كلها.`, done: R`الضغط على «الإجمالي» بيرتب تصاعدي وتاني ضغطة تنازلي، والـ URL بيتغيّر و Back بيرجّع الترتيب اللي قبله، والـ refresh بيفتح على نفس الترتيب، وكل شارة تباينها 4.5:1 أو أكتر في DevTools، و axe صفر violations.`, sol: R`~~~text
orders-board/
├── index.html   الجدول فاضي (العناوين بس)
├── style.css    الصندوق والعناوين اللازقة والشارات
├── orders.js    بيانات ٣٠ طلب
└── app.js       الرسم والترتيب والـ URL
~~~

**ليه البيانات في [[orders.js]] مش [[orders.json]]:** [[fetch('orders.json')]] مبيشتغلش لو فتحت الصفحة كملف ([[file://]]). [[orders.js]] فيه نفس شكل الـ JSON بالظبط، وبيشتغل من غير سيرفر. ولما الطلبات تيجي من API حقيقي، السطر ده بس اللي بيتغيّر.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات: متجر نسمة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<h1>الطلبات</h1>
<div class="scroll" role="region" aria-labelledby="cap" tabindex="0">
  <table>
    <caption id="cap">آخر ٣٠ طلب في متجر نسمة</caption>
    <thead>
      <tr>
        <th scope="col" data-key="id"><button type="button">رقم الطلب</button></th>
        <th scope="col" data-key="name"><button type="button">العميل</button></th>
        <th scope="col" data-key="date"><button type="button">التاريخ</button></th>
        <th scope="col" data-key="items" class="num"><button type="button">القطع</button></th>
        <th scope="col" data-key="total" class="num"><button type="button">الإجمالي</button></th>
        <th scope="col">الحالة</th>
      </tr>
    </thead>
    <tbody id="rows"></tbody>
  </table>
</div>
</main>
<script src="orders.js"></script>
<script src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
main { max-width: 900px; margin-inline: auto; }
h1 { margin: 0 0 12px; }

/* the box scrolls both ways, so the sticky header sticks to the box, not the page */
.scroll { max-height: 70vh; overflow: auto; border-radius: 12px; background: white; }
.scroll:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
table { width: 100%; min-width: 620px; border-collapse: separate; border-spacing: 0; }
caption { padding: 12px; text-align: start; font-weight: 700; }
th, td { padding: 8px 12px; text-align: start; border-block-end: 1px solid #e2e8f0; }

thead th { position: sticky; top: 0; z-index: 1; background: #1e293b; color: white; }
thead button { all: unset; cursor: pointer; font-weight: 700; }
thead button:focus-visible { outline: 2px solid #fbbf24; outline-offset: 3px; }
/* the arrow comes from aria-sort itself, so the look and what a screen reader hears can't disagree */
th[aria-sort="ascending"] button::after { content: " ▲"; }
th[aria-sort="descending"] button::after { content: " ▼"; }

tbody tr:nth-child(even) { background: #f8fafc; }
tbody tr:hover { background: #eef2ff; }
.num { text-align: end; font-variant-numeric: tabular-nums; }

.badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 13px; font-weight: 700; }
.paid { background: #dcfce7; color: #166534; }
.pending { background: #fef3c7; color: #92400e; }
.cancelled { background: #fee2e2; color: #991b1b; }
~~~

~~~js orders.js
// 30 orders of an invented shop (the same shape an API would send as JSON)
const ORDERS = [
  { id: 1001, name: "منى سامي", date: "2026-11-01", items: 1, total: 120, status: "paid" },
  { id: 1002, name: "ياسين طارق", date: "2026-11-01", items: 2, total: 257, status: "pending" },
  { id: 1003, name: "ليلى فؤاد", date: "2026-11-02", items: 3, total: 394, status: "paid" },
  { id: 1004, name: "كريم ناجي", date: "2026-11-02", items: 4, total: 531, status: "cancelled" },
  { id: 1005, name: "هدى رمزي", date: "2026-11-03", items: 1, total: 668, status: "paid" },
  { id: 1006, name: "عمر خالد", date: "2026-11-04", items: 2, total: 805, status: "pending" },
  { id: 1007, name: "سارة علي", date: "2026-11-04", items: 3, total: 942, status: "paid" },
  { id: 1008, name: "آدم شريف", date: "2026-11-05", items: 4, total: 199, status: "pending" },
  { id: 1009, name: "نور حسام", date: "2026-11-05", items: 1, total: 336, status: "paid" },
  { id: 1010, name: "حسن عادل", date: "2026-11-06", items: 2, total: 473, status: "cancelled" },
  { id: 1011, name: "منى سامي", date: "2026-11-07", items: 3, total: 610, status: "paid" },
  { id: 1012, name: "ياسين طارق", date: "2026-11-07", items: 4, total: 747, status: "pending" },
  { id: 1013, name: "ليلى فؤاد", date: "2026-11-08", items: 1, total: 884, status: "paid" },
  { id: 1014, name: "كريم ناجي", date: "2026-11-08", items: 2, total: 141, status: "pending" },
  { id: 1015, name: "هدى رمزي", date: "2026-11-09", items: 3, total: 278, status: "paid" },
  { id: 1016, name: "عمر خالد", date: "2026-11-10", items: 4, total: 415, status: "cancelled" },
  { id: 1017, name: "سارة علي", date: "2026-11-10", items: 1, total: 552, status: "paid" },
  { id: 1018, name: "آدم شريف", date: "2026-11-11", items: 2, total: 689, status: "pending" },
  { id: 1019, name: "نور حسام", date: "2026-11-11", items: 3, total: 826, status: "paid" },
  { id: 1020, name: "حسن عادل", date: "2026-11-12", items: 4, total: 963, status: "pending" },
  { id: 1021, name: "منى سامي", date: "2026-11-13", items: 1, total: 220, status: "paid" },
  { id: 1022, name: "ياسين طارق", date: "2026-11-13", items: 2, total: 357, status: "cancelled" },
  { id: 1023, name: "ليلى فؤاد", date: "2026-11-14", items: 3, total: 494, status: "paid" },
  { id: 1024, name: "كريم ناجي", date: "2026-11-14", items: 4, total: 631, status: "pending" },
  { id: 1025, name: "هدى رمزي", date: "2026-11-15", items: 1, total: 768, status: "paid" },
  { id: 1026, name: "عمر خالد", date: "2026-11-16", items: 2, total: 905, status: "pending" },
  { id: 1027, name: "سارة علي", date: "2026-11-16", items: 3, total: 162, status: "paid" },
  { id: 1028, name: "آدم شريف", date: "2026-11-17", items: 4, total: 299, status: "cancelled" },
  { id: 1029, name: "نور حسام", date: "2026-11-17", items: 1, total: 436, status: "paid" },
  { id: 1030, name: "حسن عادل", date: "2026-11-18", items: 2, total: 573, status: "pending" }
];
~~~

~~~js app.js
const rows = document.getElementById('rows');
const heads = [...document.querySelectorAll('th[data-key]')];
const LABEL = { paid: 'مدفوع', pending: 'مستني', cancelled: 'ملغي' };
const money = n => n.toLocaleString('ar-EG') + ' ج';

// the sort lives in the URL: ?sort=total&dir=desc
function readState() {
  const p = new URLSearchParams(location.search);
  const sort = heads.some(h => h.dataset.key === p.get('sort')) ? p.get('sort') : 'id';
  const dir = p.get('dir') === 'desc' ? 'desc' : 'asc';
  return { sort, dir };
}

function render() {
  const { sort, dir } = readState();
  const list = [...ORDERS].sort((a, b) => {
    const x = a[sort], y = b[sort];
    const c = typeof x === 'number' ? x - y : x.localeCompare(y, 'ar');
    return dir === 'asc' ? c : -c;
  });
  rows.innerHTML = '';
  for (const o of list) {
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + o.id + '</td><td></td><td>' + o.date + '</td>' +
      '<td class="num">' + o.items + '</td><td class="num">' + money(o.total) + '</td>' +
      '<td><span class="badge ' + o.status + '">' + LABEL[o.status] + '</span></td>';
    tr.children[1].textContent = o.name; // a name typed by a customer is text, never HTML
    rows.append(tr);
  }
  for (const h of heads) {
    if (h.dataset.key === sort) h.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    else h.removeAttribute('aria-sort');
  }
}

for (const h of heads) {
  h.querySelector('button').addEventListener('click', () => {
    const { sort, dir } = readState();
    const next = sort === h.dataset.key && dir === 'asc' ? 'desc' : 'asc';
    // pushState: every sort is a step in history, so Back returns to the one before
    history.pushState(null, '', '?sort=' + h.dataset.key + '&dir=' + next);
    render();
  });
}
window.addEventListener('popstate', render);
render();
~~~

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الطلبات: متجر نسمة</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
main { max-width: 900px; margin-inline: auto; }
h1 { margin: 0 0 12px; }

/* the box scrolls both ways, so the sticky header sticks to the box, not the page */
.scroll { max-height: 70vh; overflow: auto; border-radius: 12px; background: white; }
.scroll:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
table { width: 100%; min-width: 620px; border-collapse: separate; border-spacing: 0; }
caption { padding: 12px; text-align: start; font-weight: 700; }
th, td { padding: 8px 12px; text-align: start; border-block-end: 1px solid #e2e8f0; }

thead th { position: sticky; top: 0; z-index: 1; background: #1e293b; color: white; }
thead button { all: unset; cursor: pointer; font-weight: 700; }
thead button:focus-visible { outline: 2px solid #fbbf24; outline-offset: 3px; }
/* the arrow comes from aria-sort itself, so the look and what a screen reader hears can't disagree */
th[aria-sort="ascending"] button::after { content: " ▲"; }
th[aria-sort="descending"] button::after { content: " ▼"; }

tbody tr:nth-child(even) { background: #f8fafc; }
tbody tr:hover { background: #eef2ff; }
.num { text-align: end; font-variant-numeric: tabular-nums; }

.badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 13px; font-weight: 700; }
.paid { background: #dcfce7; color: #166534; }
.pending { background: #fef3c7; color: #92400e; }
.cancelled { background: #fee2e2; color: #991b1b; }
</style>
</head>
<body>
<main>
<h1>الطلبات</h1>
<div class="scroll" role="region" aria-labelledby="cap" tabindex="0">
  <table>
    <caption id="cap">آخر ٣٠ طلب في متجر نسمة</caption>
    <thead>
      <tr>
        <th scope="col" data-key="id"><button type="button">رقم الطلب</button></th>
        <th scope="col" data-key="name"><button type="button">العميل</button></th>
        <th scope="col" data-key="date"><button type="button">التاريخ</button></th>
        <th scope="col" data-key="items" class="num"><button type="button">القطع</button></th>
        <th scope="col" data-key="total" class="num"><button type="button">الإجمالي</button></th>
        <th scope="col">الحالة</th>
      </tr>
    </thead>
    <tbody id="rows"></tbody>
  </table>
</div>
</main>
<script>
// 30 orders of an invented shop (the same shape an API would send as JSON)
const ORDERS = [
  { id: 1001, name: "منى سامي", date: "2026-11-01", items: 1, total: 120, status: "paid" },
  { id: 1002, name: "ياسين طارق", date: "2026-11-01", items: 2, total: 257, status: "pending" },
  { id: 1003, name: "ليلى فؤاد", date: "2026-11-02", items: 3, total: 394, status: "paid" },
  { id: 1004, name: "كريم ناجي", date: "2026-11-02", items: 4, total: 531, status: "cancelled" },
  { id: 1005, name: "هدى رمزي", date: "2026-11-03", items: 1, total: 668, status: "paid" },
  { id: 1006, name: "عمر خالد", date: "2026-11-04", items: 2, total: 805, status: "pending" },
  { id: 1007, name: "سارة علي", date: "2026-11-04", items: 3, total: 942, status: "paid" },
  { id: 1008, name: "آدم شريف", date: "2026-11-05", items: 4, total: 199, status: "pending" },
  { id: 1009, name: "نور حسام", date: "2026-11-05", items: 1, total: 336, status: "paid" },
  { id: 1010, name: "حسن عادل", date: "2026-11-06", items: 2, total: 473, status: "cancelled" },
  { id: 1011, name: "منى سامي", date: "2026-11-07", items: 3, total: 610, status: "paid" },
  { id: 1012, name: "ياسين طارق", date: "2026-11-07", items: 4, total: 747, status: "pending" },
  { id: 1013, name: "ليلى فؤاد", date: "2026-11-08", items: 1, total: 884, status: "paid" },
  { id: 1014, name: "كريم ناجي", date: "2026-11-08", items: 2, total: 141, status: "pending" },
  { id: 1015, name: "هدى رمزي", date: "2026-11-09", items: 3, total: 278, status: "paid" },
  { id: 1016, name: "عمر خالد", date: "2026-11-10", items: 4, total: 415, status: "cancelled" },
  { id: 1017, name: "سارة علي", date: "2026-11-10", items: 1, total: 552, status: "paid" },
  { id: 1018, name: "آدم شريف", date: "2026-11-11", items: 2, total: 689, status: "pending" },
  { id: 1019, name: "نور حسام", date: "2026-11-11", items: 3, total: 826, status: "paid" },
  { id: 1020, name: "حسن عادل", date: "2026-11-12", items: 4, total: 963, status: "pending" },
  { id: 1021, name: "منى سامي", date: "2026-11-13", items: 1, total: 220, status: "paid" },
  { id: 1022, name: "ياسين طارق", date: "2026-11-13", items: 2, total: 357, status: "cancelled" },
  { id: 1023, name: "ليلى فؤاد", date: "2026-11-14", items: 3, total: 494, status: "paid" },
  { id: 1024, name: "كريم ناجي", date: "2026-11-14", items: 4, total: 631, status: "pending" },
  { id: 1025, name: "هدى رمزي", date: "2026-11-15", items: 1, total: 768, status: "paid" },
  { id: 1026, name: "عمر خالد", date: "2026-11-16", items: 2, total: 905, status: "pending" },
  { id: 1027, name: "سارة علي", date: "2026-11-16", items: 3, total: 162, status: "paid" },
  { id: 1028, name: "آدم شريف", date: "2026-11-17", items: 4, total: 299, status: "cancelled" },
  { id: 1029, name: "نور حسام", date: "2026-11-17", items: 1, total: 436, status: "paid" },
  { id: 1030, name: "حسن عادل", date: "2026-11-18", items: 2, total: 573, status: "pending" }
];
</script>
<script>
const rows = document.getElementById('rows');
const heads = [...document.querySelectorAll('th[data-key]')];
const LABEL = { paid: 'مدفوع', pending: 'مستني', cancelled: 'ملغي' };
const money = n => n.toLocaleString('ar-EG') + ' ج';

// the sort lives in the URL: ?sort=total&dir=desc
function readState() {
  const p = new URLSearchParams(location.search);
  const sort = heads.some(h => h.dataset.key === p.get('sort')) ? p.get('sort') : 'id';
  const dir = p.get('dir') === 'desc' ? 'desc' : 'asc';
  return { sort, dir };
}

function render() {
  const { sort, dir } = readState();
  const list = [...ORDERS].sort((a, b) => {
    const x = a[sort], y = b[sort];
    const c = typeof x === 'number' ? x - y : x.localeCompare(y, 'ar');
    return dir === 'asc' ? c : -c;
  });
  rows.innerHTML = '';
  for (const o of list) {
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + o.id + '</td><td></td><td>' + o.date + '</td>' +
      '<td class="num">' + o.items + '</td><td class="num">' + money(o.total) + '</td>' +
      '<td><span class="badge ' + o.status + '">' + LABEL[o.status] + '</span></td>';
    tr.children[1].textContent = o.name; // a name typed by a customer is text, never HTML
    rows.append(tr);
  }
  for (const h of heads) {
    if (h.dataset.key === sort) h.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    else h.removeAttribute('aria-sort');
  }
}

for (const h of heads) {
  h.querySelector('button').addEventListener('click', () => {
    const { sort, dir } = readState();
    const next = sort === h.dataset.key && dir === 'asc' ? 'desc' : 'asc';
    // pushState: every sort is a step in history, so Back returns to the one before
    history.pushState(null, '', '?sort=' + h.dataset.key + '&dir=' + next);
    render();
  });
}
window.addEventListener('popstate', render);
render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** صندوق أبيض فيه صف عناوين كحلي غامق، والصفوف مخططة أبيض ورمادي فاتح، وكل طلب جنبه شارة مدوّرة: خضرا «مدفوع»، وصفرا «مستني»، وحمرا «ملغي». دوس «الإجمالي» وجنبه يظهر ▲ والطلبات تترتب من الأرخص، ودوسة تانية ▼ من الأغلى. انزل جوه الصندوق وصف العناوين يفضل فوق.

**ليه كده:**
- **العناوين لازقة جوه الصندوق:** [[position: sticky]] و [[top: 0]] على الـ [[th]]. الصندوق عليه [[overflow: auto]]، فالعناوين بتلزق في أوله هو مش في أول الصفحة. وده سبب [[max-height: 70vh]]: من غيره الصندوق بيطول على قد الجدول ومفيش scroll جواه يلزق فيه.
- **زرار جوه الـ [[th]]:** العنوان نفسه مش بيتداس بالكيبورد. الزرار بيتوصله بـ Tab وبيشتغل بـ Enter والمسافة.
- **السهم من [[aria-sort]]:** [[th[aria-sort="ascending"] button::after]]. حالة واحدة بيقراها قارئ الشاشة («sorted ascending») وبيشوفها اللي بيبص، فمستحيل الاتنين يختلفوا.
- **الترتيب في الـ URL بـ [[pushState]]:** كل ترتيب خطوة في الـ history، فـ Back بيرجّع اللي قبله، و [[popstate]] بيعيد الرسم. والـ refresh بيقرا الـ URL فبيفتح على نفس الترتيب، واللينك اللي تبعته لحد بيفتح عنده بنفس الترتيب.
- **اسم العميل [[textContent]] مش [[innerHTML]]:** الاسم كتبه عميل. لو كتب [[<img src=x onerror=...>]] وحطيناه بـ [[innerHTML]] السكربت بتاعه هيشتغل عندك في لوحة الأدمن.
- **[[tabular-nums]]:** كل الأرقام نفس العرض، فالإجماليات تحت بعض بالظبط.
- **الشارات:** خلفية فاتحة وكلام غامق من نفس اللون. قست التباين: كلهم فوق 6:1 (المطلوب 4.5:1).

~~~text الناتج (Chrome)
أول فتح                      أول ٣ إجماليات: ١٢٠ ج | ٢٥٧ ج | ٣٩٤ ج   (بالترتيب الأصلي)
ضغطة على «الإجمالي»           ?sort=total&dir=asc    ١٢٠ ج | ١٤١ ج | ١٦٢ ج   aria-sort=ascending
ضغطة تانية                   ?sort=total&dir=desc   ٩٦٣ ج | ٩٤٢ ج | ٩٠٥ ج   aria-sort=descending
Back                         ?sort=total&dir=asc    ١٢٠ ج | ١٤١ ج | ١٦٢ ج
Refresh                      ?sort=total&dir=asc    نفس الترتيب
scroll 400 جوه الصندوق        مكان صف العناوين: 47px من فوق قبل، و 0px بعد (لزق)
تباين الشارات                 مدفوع 6.49:1   مستني 6.37:1   ملغي 6.80:1
axe: 0 violations   الـ validator: مفيش رسايل   overflow على 360: 0
~~~` },
        { lvl: 'متوسط', dir: "books-catalog", t: R`كتالوج كتب بالبحث والصفحات`, what: R`جدول ١٠٠ كتاب لـ «مكتبة الحروف» (اسم متخيل): حقل بحث بيفلتر بالعنوان أو الكاتب ويكتب [[?q=]] بـ [[replaceState]] (مش مع كل حرف خطوة history)، وصفحات ٢٠ كتاب بأزرار «اللي قبله» و «اللي بعده» وأرقام، وعداد «لقينا ١٢ كتاب» عليه [[aria-live="polite"]]. من درس «ترتيب وصفحات في الـ URL».`, done: R`كتابة «نجيب» بتفلتر من غير reload وزرار Back بيرجّعك للصفحة اللي قبل البحث بضغطة واحدة، و [[?page=99]] بيفتح آخر صفحة مش صفحة فاضية، و [[?q=]] بكلمة عربي بيشتغل لو اتبعت لحد تاني.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كتالوج مكتبة الحروف</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #fffbeb; color: #292524; font: 15px/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
  main { max-width: 760px; margin-inline: auto; }
  h1 { margin: 0 0 12px; }
  .search { display: grid; gap: 4px; margin-block-end: 8px; font-weight: 600; }
  .search input { font: inherit; padding: 10px 12px; border: 1px solid #a8a29e; border-radius: 10px; }
  #count { margin: 0 0 8px; color: #57534e; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; }
  th, td { padding: 8px 12px; text-align: start; border-block-end: 1px solid #f5f5f4; }
  thead th { background: #78350f; color: #fffbeb; }
  .num { font-variant-numeric: tabular-nums; }
  nav ul { display: flex; flex-wrap: wrap; gap: 6px; padding: 0; margin: 12px 0 0; list-style: none; }
  nav a { display: inline-block; min-width: 40px; padding: 6px 10px; border: 1px solid #d6d3d1; border-radius: 8px; text-align: center; color: inherit; text-decoration: none; background: white; }
  nav a[aria-current="page"] { background: #78350f; border-color: #78350f; color: white; }
  nav a[aria-disabled="true"] { opacity: .4; pointer-events: none; }
</style>
</head>
<body>
<main>
  <h1>كتالوج مكتبة الحروف</h1>
  <label class="search">دوّر بالعنوان أو الكاتب
    <input id="q" type="search" autocomplete="off">
  </label>
  <p id="count" aria-live="polite"></p>
  <table>
    <thead><tr><th scope="col">العنوان</th><th scope="col">الكاتب</th><th scope="col" class="num">السنة</th></tr></thead>
    <tbody id="rows"></tbody>
  </table>
  <nav aria-label="صفحات النتايج"><ul id="pages"></ul></nav>
</main>
<script src="books.js"></script>
<script>
  const PER = 20;
  const q = document.getElementById('q');
  // أ إ آ → ا، ة → ه، ى → ي، ومن غير تشكيل: «أحمد» و «احمد» يلاقوا نفس الكتب
  const norm = s => s.normalize('NFKD').replace(/[ً-ٟ]/g, '')
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase().trim();

  function state() {
    const p = new URLSearchParams(location.search);
    return { q: p.get('q') || '', page: parseInt(p.get('page'), 10) || 1 };
  }
  function url(s) {
    const p = new URLSearchParams();
    if (s.q) p.set('q', s.q);
    if (s.page > 1) p.set('page', s.page);
    return '?' + p.toString();
  }

  function render() {
    const s = state();
    const found = BOOKS.filter(b => norm(b.title + ' ' + b.author).includes(norm(s.q)));
    const last = Math.max(1, Math.ceil(found.length / PER));
    // ?page=99 → the last page, never an empty one
    const page = Math.min(Math.max(1, s.page), last);
    if (page !== s.page) history.replaceState(null, '', url({ q: s.q, page }));

    document.getElementById('count').textContent = 'لقينا ' + found.length + ' كتاب' + (last > 1 ? '، صفحة ' + page + ' من ' + last : '');
    const tbody = document.getElementById('rows');
    tbody.innerHTML = '';
    for (const b of found.slice((page - 1) * PER, page * PER)) {
      const tr = tbody.insertRow();
      tr.insertCell().textContent = b.title;
      tr.insertCell().textContent = b.author;
      const y = tr.insertCell(); y.textContent = b.year; y.className = 'num';
    }

    const ul = document.getElementById('pages');
    ul.innerHTML = '';
    const link = (text, n, label) => {
      const a = document.createElement('a');
      a.textContent = text;
      a.href = url({ q: s.q, page: n });
      if (label) a.setAttribute('aria-label', label);
      if (n === page && !label) a.setAttribute('aria-current', 'page');
      if (n < 1 || n > last) a.setAttribute('aria-disabled', 'true');
      const li = document.createElement('li'); li.append(a); ul.append(li);
    };
    link('‹', page - 1, 'الصفحة اللي قبلها');
    for (let n = 1; n <= last; n++) link(String(n), n);
    link('›', page + 1, 'الصفحة اللي بعدها');
    if (document.activeElement !== q) q.value = s.q;
  }

  // typing replaces the current URL (no history step per letter); Back leaves the search in one press
  q.addEventListener('input', () => {
    history.replaceState(null, '', url({ q: q.value.trim(), page: 1 }));
    render();
  });
  // page links: a real step in history, without reloading
  document.getElementById('pages').addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || a.getAttribute('aria-disabled') === 'true') return;
    e.preventDefault();
    history.pushState(null, '', a.getAttribute('href'));
    render();
  });
  window.addEventListener('popstate', render);
  render();
</script>
</body>
</html>
~~~

~~~js books.js
// 100 invented books of an invented library
const BOOKS = [
  { id: 1, title: "ليالي البحر", author: "نجيب سالم", year: 1990 },
  { id: 2, title: "بيت البحر", author: "منى فهمي", year: 1997 },
  { id: 3, title: "رسايل البحر", author: "طارق شاكر", year: 2004 },
  { id: 4, title: "حكايات البحر", author: "ليلى عادل", year: 2011 },
  { id: 5, title: "أسرار البحر", author: "نجيب حمدي", year: 2018 },
  { id: 6, title: "طريق البحر", author: "هالة نصر", year: 1990 },
  { id: 7, title: "مدينة البحر", author: "يوسف عادل", year: 1997 },
  { id: 8, title: "نجوم البحر", author: "سلوى رأفت", year: 2004 },
  { id: 9, title: "بحر البحر", author: "نجيب سالم", year: 2011 },
  { id: 10, title: "شتا البحر", author: "منى فهمي", year: 2018 },
  { id: 11, title: "ليالي الجدة", author: "طارق شاكر", year: 1990 },
  { id: 12, title: "بيت الجدة", author: "ليلى عادل", year: 1997 },
  { id: 13, title: "رسايل الجدة", author: "نجيب حمدي", year: 2004 },
  { id: 14, title: "حكايات الجدة", author: "هالة نصر", year: 2011 },
  { id: 15, title: "أسرار الجدة", author: "يوسف عادل", year: 2018 },
  { id: 16, title: "طريق الجدة", author: "سلوى رأفت", year: 1990 },
  { id: 17, title: "مدينة الجدة", author: "نجيب سالم", year: 1997 },
  { id: 18, title: "نجوم الجدة", author: "منى فهمي", year: 2004 },
  { id: 19, title: "بحر الجدة", author: "طارق شاكر", year: 2011 },
  { id: 20, title: "شتا الجدة", author: "ليلى عادل", year: 2018 },
  { id: 21, title: "ليالي الصحرا", author: "نجيب حمدي", year: 1990 },
  { id: 22, title: "بيت الصحرا", author: "هالة نصر", year: 1997 },
  { id: 23, title: "رسايل الصحرا", author: "يوسف عادل", year: 2004 },
  { id: 24, title: "حكايات الصحرا", author: "سلوى رأفت", year: 2011 },
  { id: 25, title: "أسرار الصحرا", author: "نجيب سالم", year: 2018 },
  { id: 26, title: "طريق الصحرا", author: "منى فهمي", year: 1990 },
  { id: 27, title: "مدينة الصحرا", author: "طارق شاكر", year: 1997 },
  { id: 28, title: "نجوم الصحرا", author: "ليلى عادل", year: 2004 },
  { id: 29, title: "بحر الصحرا", author: "نجيب حمدي", year: 2011 },
  { id: 30, title: "شتا الصحرا", author: "هالة نصر", year: 2018 },
  { id: 31, title: "ليالي القمر", author: "يوسف عادل", year: 1990 },
  { id: 32, title: "بيت القمر", author: "سلوى رأفت", year: 1997 },
  { id: 33, title: "رسايل القمر", author: "نجيب سالم", year: 2004 },
  { id: 34, title: "حكايات القمر", author: "منى فهمي", year: 2011 },
  { id: 35, title: "أسرار القمر", author: "طارق شاكر", year: 2018 },
  { id: 36, title: "طريق القمر", author: "ليلى عادل", year: 1990 },
  { id: 37, title: "مدينة القمر", author: "نجيب حمدي", year: 1997 },
  { id: 38, title: "نجوم القمر", author: "هالة نصر", year: 2004 },
  { id: 39, title: "بحر القمر", author: "يوسف عادل", year: 2011 },
  { id: 40, title: "شتا القمر", author: "سلوى رأفت", year: 2018 },
  { id: 41, title: "ليالي الغريب", author: "نجيب سالم", year: 1990 },
  { id: 42, title: "بيت الغريب", author: "منى فهمي", year: 1997 },
  { id: 43, title: "رسايل الغريب", author: "طارق شاكر", year: 2004 },
  { id: 44, title: "حكايات الغريب", author: "ليلى عادل", year: 2011 },
  { id: 45, title: "أسرار الغريب", author: "نجيب حمدي", year: 2018 },
  { id: 46, title: "طريق الغريب", author: "هالة نصر", year: 1990 },
  { id: 47, title: "مدينة الغريب", author: "يوسف عادل", year: 1997 },
  { id: 48, title: "نجوم الغريب", author: "سلوى رأفت", year: 2004 },
  { id: 49, title: "بحر الغريب", author: "نجيب سالم", year: 2011 },
  { id: 50, title: "شتا الغريب", author: "منى فهمي", year: 2018 },
  { id: 51, title: "ليالي النيل", author: "طارق شاكر", year: 1990 },
  { id: 52, title: "بيت النيل", author: "ليلى عادل", year: 1997 },
  { id: 53, title: "رسايل النيل", author: "نجيب حمدي", year: 2004 },
  { id: 54, title: "حكايات النيل", author: "هالة نصر", year: 2011 },
  { id: 55, title: "أسرار النيل", author: "يوسف عادل", year: 2018 },
  { id: 56, title: "طريق النيل", author: "سلوى رأفت", year: 1990 },
  { id: 57, title: "مدينة النيل", author: "نجيب سالم", year: 1997 },
  { id: 58, title: "نجوم النيل", author: "منى فهمي", year: 2004 },
  { id: 59, title: "بحر النيل", author: "طارق شاكر", year: 2011 },
  { id: 60, title: "شتا النيل", author: "ليلى عادل", year: 2018 },
  { id: 61, title: "ليالي الحارة", author: "نجيب حمدي", year: 1990 },
  { id: 62, title: "بيت الحارة", author: "هالة نصر", year: 1997 },
  { id: 63, title: "رسايل الحارة", author: "يوسف عادل", year: 2004 },
  { id: 64, title: "حكايات الحارة", author: "سلوى رأفت", year: 2011 },
  { id: 65, title: "أسرار الحارة", author: "نجيب سالم", year: 2018 },
  { id: 66, title: "طريق الحارة", author: "منى فهمي", year: 1990 },
  { id: 67, title: "مدينة الحارة", author: "طارق شاكر", year: 1997 },
  { id: 68, title: "نجوم الحارة", author: "ليلى عادل", year: 2004 },
  { id: 69, title: "بحر الحارة", author: "نجيب حمدي", year: 2011 },
  { id: 70, title: "شتا الحارة", author: "هالة نصر", year: 2018 },
  { id: 71, title: "ليالي الشمال", author: "يوسف عادل", year: 1990 },
  { id: 72, title: "بيت الشمال", author: "سلوى رأفت", year: 1997 },
  { id: 73, title: "رسايل الشمال", author: "نجيب سالم", year: 2004 },
  { id: 74, title: "حكايات الشمال", author: "منى فهمي", year: 2011 },
  { id: 75, title: "أسرار الشمال", author: "طارق شاكر", year: 2018 },
  { id: 76, title: "طريق الشمال", author: "ليلى عادل", year: 1990 },
  { id: 77, title: "مدينة الشمال", author: "نجيب حمدي", year: 1997 },
  { id: 78, title: "نجوم الشمال", author: "هالة نصر", year: 2004 },
  { id: 79, title: "بحر الشمال", author: "يوسف عادل", year: 2011 },
  { id: 80, title: "شتا الشمال", author: "سلوى رأفت", year: 2018 },
  { id: 81, title: "ليالي المطر", author: "نجيب سالم", year: 1990 },
  { id: 82, title: "بيت المطر", author: "منى فهمي", year: 1997 },
  { id: 83, title: "رسايل المطر", author: "طارق شاكر", year: 2004 },
  { id: 84, title: "حكايات المطر", author: "ليلى عادل", year: 2011 },
  { id: 85, title: "أسرار المطر", author: "نجيب حمدي", year: 2018 },
  { id: 86, title: "طريق المطر", author: "هالة نصر", year: 1990 },
  { id: 87, title: "مدينة المطر", author: "يوسف عادل", year: 1997 },
  { id: 88, title: "نجوم المطر", author: "سلوى رأفت", year: 2004 },
  { id: 89, title: "بحر المطر", author: "نجيب سالم", year: 2011 },
  { id: 90, title: "شتا المطر", author: "منى فهمي", year: 2018 },
  { id: 91, title: "ليالي الحديقة", author: "طارق شاكر", year: 1990 },
  { id: 92, title: "بيت الحديقة", author: "ليلى عادل", year: 1997 },
  { id: 93, title: "رسايل الحديقة", author: "نجيب حمدي", year: 2004 },
  { id: 94, title: "حكايات الحديقة", author: "هالة نصر", year: 2011 },
  { id: 95, title: "أسرار الحديقة", author: "يوسف عادل", year: 2018 },
  { id: 96, title: "طريق الحديقة", author: "سلوى رأفت", year: 1990 },
  { id: 97, title: "مدينة الحديقة", author: "نجيب سالم", year: 1997 },
  { id: 98, title: "نجوم الحديقة", author: "منى فهمي", year: 2004 },
  { id: 99, title: "بحر الحديقة", author: "طارق شاكر", year: 2011 },
  { id: 100, title: "شتا الحديقة", author: "ليلى عادل", year: 2018 }
];
~~~

~~~view 620 760 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كتالوج مكتبة الحروف</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #fffbeb; color: #292524; font: 15px/1.6 system-ui, "Segoe UI", Tahoma, sans-serif; }
  main { max-width: 760px; margin-inline: auto; }
  h1 { margin: 0 0 12px; }
  .search { display: grid; gap: 4px; margin-block-end: 8px; font-weight: 600; }
  .search input { font: inherit; padding: 10px 12px; border: 1px solid #a8a29e; border-radius: 10px; }
  #count { margin: 0 0 8px; color: #57534e; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; }
  th, td { padding: 8px 12px; text-align: start; border-block-end: 1px solid #f5f5f4; }
  thead th { background: #78350f; color: #fffbeb; }
  .num { font-variant-numeric: tabular-nums; }
  nav ul { display: flex; flex-wrap: wrap; gap: 6px; padding: 0; margin: 12px 0 0; list-style: none; }
  nav a { display: inline-block; min-width: 40px; padding: 6px 10px; border: 1px solid #d6d3d1; border-radius: 8px; text-align: center; color: inherit; text-decoration: none; background: white; }
  nav a[aria-current="page"] { background: #78350f; border-color: #78350f; color: white; }
  nav a[aria-disabled="true"] { opacity: .4; pointer-events: none; }
</style>
</head>
<body>
<main>
  <h1>كتالوج مكتبة الحروف</h1>
  <label class="search">دوّر بالعنوان أو الكاتب
    <input id="q" type="search" autocomplete="off">
  </label>
  <p id="count" aria-live="polite"></p>
  <table>
    <thead><tr><th scope="col">العنوان</th><th scope="col">الكاتب</th><th scope="col" class="num">السنة</th></tr></thead>
    <tbody id="rows"></tbody>
  </table>
  <nav aria-label="صفحات النتايج"><ul id="pages"></ul></nav>
</main>
<script>
// 100 invented books of an invented library
const BOOKS = [
  { id: 1, title: "ليالي البحر", author: "نجيب سالم", year: 1990 },
  { id: 2, title: "بيت البحر", author: "منى فهمي", year: 1997 },
  { id: 3, title: "رسايل البحر", author: "طارق شاكر", year: 2004 },
  { id: 4, title: "حكايات البحر", author: "ليلى عادل", year: 2011 },
  { id: 5, title: "أسرار البحر", author: "نجيب حمدي", year: 2018 },
  { id: 6, title: "طريق البحر", author: "هالة نصر", year: 1990 },
  { id: 7, title: "مدينة البحر", author: "يوسف عادل", year: 1997 },
  { id: 8, title: "نجوم البحر", author: "سلوى رأفت", year: 2004 },
  { id: 9, title: "بحر البحر", author: "نجيب سالم", year: 2011 },
  { id: 10, title: "شتا البحر", author: "منى فهمي", year: 2018 },
  { id: 11, title: "ليالي الجدة", author: "طارق شاكر", year: 1990 },
  { id: 12, title: "بيت الجدة", author: "ليلى عادل", year: 1997 },
  { id: 13, title: "رسايل الجدة", author: "نجيب حمدي", year: 2004 },
  { id: 14, title: "حكايات الجدة", author: "هالة نصر", year: 2011 },
  { id: 15, title: "أسرار الجدة", author: "يوسف عادل", year: 2018 },
  { id: 16, title: "طريق الجدة", author: "سلوى رأفت", year: 1990 },
  { id: 17, title: "مدينة الجدة", author: "نجيب سالم", year: 1997 },
  { id: 18, title: "نجوم الجدة", author: "منى فهمي", year: 2004 },
  { id: 19, title: "بحر الجدة", author: "طارق شاكر", year: 2011 },
  { id: 20, title: "شتا الجدة", author: "ليلى عادل", year: 2018 },
  { id: 21, title: "ليالي الصحرا", author: "نجيب حمدي", year: 1990 },
  { id: 22, title: "بيت الصحرا", author: "هالة نصر", year: 1997 },
  { id: 23, title: "رسايل الصحرا", author: "يوسف عادل", year: 2004 },
  { id: 24, title: "حكايات الصحرا", author: "سلوى رأفت", year: 2011 },
  { id: 25, title: "أسرار الصحرا", author: "نجيب سالم", year: 2018 },
  { id: 26, title: "طريق الصحرا", author: "منى فهمي", year: 1990 },
  { id: 27, title: "مدينة الصحرا", author: "طارق شاكر", year: 1997 },
  { id: 28, title: "نجوم الصحرا", author: "ليلى عادل", year: 2004 },
  { id: 29, title: "بحر الصحرا", author: "نجيب حمدي", year: 2011 },
  { id: 30, title: "شتا الصحرا", author: "هالة نصر", year: 2018 },
  { id: 31, title: "ليالي القمر", author: "يوسف عادل", year: 1990 },
  { id: 32, title: "بيت القمر", author: "سلوى رأفت", year: 1997 },
  { id: 33, title: "رسايل القمر", author: "نجيب سالم", year: 2004 },
  { id: 34, title: "حكايات القمر", author: "منى فهمي", year: 2011 },
  { id: 35, title: "أسرار القمر", author: "طارق شاكر", year: 2018 },
  { id: 36, title: "طريق القمر", author: "ليلى عادل", year: 1990 },
  { id: 37, title: "مدينة القمر", author: "نجيب حمدي", year: 1997 },
  { id: 38, title: "نجوم القمر", author: "هالة نصر", year: 2004 },
  { id: 39, title: "بحر القمر", author: "يوسف عادل", year: 2011 },
  { id: 40, title: "شتا القمر", author: "سلوى رأفت", year: 2018 },
  { id: 41, title: "ليالي الغريب", author: "نجيب سالم", year: 1990 },
  { id: 42, title: "بيت الغريب", author: "منى فهمي", year: 1997 },
  { id: 43, title: "رسايل الغريب", author: "طارق شاكر", year: 2004 },
  { id: 44, title: "حكايات الغريب", author: "ليلى عادل", year: 2011 },
  { id: 45, title: "أسرار الغريب", author: "نجيب حمدي", year: 2018 },
  { id: 46, title: "طريق الغريب", author: "هالة نصر", year: 1990 },
  { id: 47, title: "مدينة الغريب", author: "يوسف عادل", year: 1997 },
  { id: 48, title: "نجوم الغريب", author: "سلوى رأفت", year: 2004 },
  { id: 49, title: "بحر الغريب", author: "نجيب سالم", year: 2011 },
  { id: 50, title: "شتا الغريب", author: "منى فهمي", year: 2018 },
  { id: 51, title: "ليالي النيل", author: "طارق شاكر", year: 1990 },
  { id: 52, title: "بيت النيل", author: "ليلى عادل", year: 1997 },
  { id: 53, title: "رسايل النيل", author: "نجيب حمدي", year: 2004 },
  { id: 54, title: "حكايات النيل", author: "هالة نصر", year: 2011 },
  { id: 55, title: "أسرار النيل", author: "يوسف عادل", year: 2018 },
  { id: 56, title: "طريق النيل", author: "سلوى رأفت", year: 1990 },
  { id: 57, title: "مدينة النيل", author: "نجيب سالم", year: 1997 },
  { id: 58, title: "نجوم النيل", author: "منى فهمي", year: 2004 },
  { id: 59, title: "بحر النيل", author: "طارق شاكر", year: 2011 },
  { id: 60, title: "شتا النيل", author: "ليلى عادل", year: 2018 },
  { id: 61, title: "ليالي الحارة", author: "نجيب حمدي", year: 1990 },
  { id: 62, title: "بيت الحارة", author: "هالة نصر", year: 1997 },
  { id: 63, title: "رسايل الحارة", author: "يوسف عادل", year: 2004 },
  { id: 64, title: "حكايات الحارة", author: "سلوى رأفت", year: 2011 },
  { id: 65, title: "أسرار الحارة", author: "نجيب سالم", year: 2018 },
  { id: 66, title: "طريق الحارة", author: "منى فهمي", year: 1990 },
  { id: 67, title: "مدينة الحارة", author: "طارق شاكر", year: 1997 },
  { id: 68, title: "نجوم الحارة", author: "ليلى عادل", year: 2004 },
  { id: 69, title: "بحر الحارة", author: "نجيب حمدي", year: 2011 },
  { id: 70, title: "شتا الحارة", author: "هالة نصر", year: 2018 },
  { id: 71, title: "ليالي الشمال", author: "يوسف عادل", year: 1990 },
  { id: 72, title: "بيت الشمال", author: "سلوى رأفت", year: 1997 },
  { id: 73, title: "رسايل الشمال", author: "نجيب سالم", year: 2004 },
  { id: 74, title: "حكايات الشمال", author: "منى فهمي", year: 2011 },
  { id: 75, title: "أسرار الشمال", author: "طارق شاكر", year: 2018 },
  { id: 76, title: "طريق الشمال", author: "ليلى عادل", year: 1990 },
  { id: 77, title: "مدينة الشمال", author: "نجيب حمدي", year: 1997 },
  { id: 78, title: "نجوم الشمال", author: "هالة نصر", year: 2004 },
  { id: 79, title: "بحر الشمال", author: "يوسف عادل", year: 2011 },
  { id: 80, title: "شتا الشمال", author: "سلوى رأفت", year: 2018 },
  { id: 81, title: "ليالي المطر", author: "نجيب سالم", year: 1990 },
  { id: 82, title: "بيت المطر", author: "منى فهمي", year: 1997 },
  { id: 83, title: "رسايل المطر", author: "طارق شاكر", year: 2004 },
  { id: 84, title: "حكايات المطر", author: "ليلى عادل", year: 2011 },
  { id: 85, title: "أسرار المطر", author: "نجيب حمدي", year: 2018 },
  { id: 86, title: "طريق المطر", author: "هالة نصر", year: 1990 },
  { id: 87, title: "مدينة المطر", author: "يوسف عادل", year: 1997 },
  { id: 88, title: "نجوم المطر", author: "سلوى رأفت", year: 2004 },
  { id: 89, title: "بحر المطر", author: "نجيب سالم", year: 2011 },
  { id: 90, title: "شتا المطر", author: "منى فهمي", year: 2018 },
  { id: 91, title: "ليالي الحديقة", author: "طارق شاكر", year: 1990 },
  { id: 92, title: "بيت الحديقة", author: "ليلى عادل", year: 1997 },
  { id: 93, title: "رسايل الحديقة", author: "نجيب حمدي", year: 2004 },
  { id: 94, title: "حكايات الحديقة", author: "هالة نصر", year: 2011 },
  { id: 95, title: "أسرار الحديقة", author: "يوسف عادل", year: 2018 },
  { id: 96, title: "طريق الحديقة", author: "سلوى رأفت", year: 1990 },
  { id: 97, title: "مدينة الحديقة", author: "نجيب سالم", year: 1997 },
  { id: 98, title: "نجوم الحديقة", author: "منى فهمي", year: 2004 },
  { id: 99, title: "بحر الحديقة", author: "طارق شاكر", year: 2011 },
  { id: 100, title: "شتا الحديقة", author: "ليلى عادل", year: 2018 }
];
</script>
<script>
  const PER = 20;
  const q = document.getElementById('q');
  // أ إ آ → ا، ة → ه، ى → ي، ومن غير تشكيل: «أحمد» و «احمد» يلاقوا نفس الكتب
  const norm = s => s.normalize('NFKD').replace(/[ً-ٟ]/g, '')
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase().trim();

  function state() {
    const p = new URLSearchParams(location.search);
    return { q: p.get('q') || '', page: parseInt(p.get('page'), 10) || 1 };
  }
  function url(s) {
    const p = new URLSearchParams();
    if (s.q) p.set('q', s.q);
    if (s.page > 1) p.set('page', s.page);
    return '?' + p.toString();
  }

  function render() {
    const s = state();
    const found = BOOKS.filter(b => norm(b.title + ' ' + b.author).includes(norm(s.q)));
    const last = Math.max(1, Math.ceil(found.length / PER));
    // ?page=99 → the last page, never an empty one
    const page = Math.min(Math.max(1, s.page), last);
    if (page !== s.page) history.replaceState(null, '', url({ q: s.q, page }));

    document.getElementById('count').textContent = 'لقينا ' + found.length + ' كتاب' + (last > 1 ? '، صفحة ' + page + ' من ' + last : '');
    const tbody = document.getElementById('rows');
    tbody.innerHTML = '';
    for (const b of found.slice((page - 1) * PER, page * PER)) {
      const tr = tbody.insertRow();
      tr.insertCell().textContent = b.title;
      tr.insertCell().textContent = b.author;
      const y = tr.insertCell(); y.textContent = b.year; y.className = 'num';
    }

    const ul = document.getElementById('pages');
    ul.innerHTML = '';
    const link = (text, n, label) => {
      const a = document.createElement('a');
      a.textContent = text;
      a.href = url({ q: s.q, page: n });
      if (label) a.setAttribute('aria-label', label);
      if (n === page && !label) a.setAttribute('aria-current', 'page');
      if (n < 1 || n > last) a.setAttribute('aria-disabled', 'true');
      const li = document.createElement('li'); li.append(a); ul.append(li);
    };
    link('‹', page - 1, 'الصفحة اللي قبلها');
    for (let n = 1; n <= last; n++) link(String(n), n);
    link('›', page + 1, 'الصفحة اللي بعدها');
    if (document.activeElement !== q) q.value = s.q;
  }

  // typing replaces the current URL (no history step per letter); Back leaves the search in one press
  q.addEventListener('input', () => {
    history.replaceState(null, '', url({ q: q.value.trim(), page: 1 }));
    render();
  });
  // page links: a real step in history, without reloading
  document.getElementById('pages').addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || a.getAttribute('aria-disabled') === 'true') return;
    e.preventDefault();
    history.pushState(null, '', a.getAttribute('href'));
    render();
  });
  window.addEventListener('popstate', render);
  render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** خلفية كريمي، وحقل بحث، وتحته «لقينا 100 كتاب، صفحة 1 من 5»، وجدول بصف عناوين بني غامق، وتحت الجدول أزرار صفحات صغيرة (‹ 1 2 3 4 5 ›) والصفحة اللي انت فيها بني. اكتب «نجيب» والجدول بيتفلتر وانت بتكتب.

**ليه كده:**
- **البحث بـ [[replaceState]]:** كل حرف بيغيّر الـ URL من غير ما يزوّد خطوة في الـ history. لو استخدمت [[pushState]]، «نجيب» = ٤ خطوات، والمستخدم هيدوس Back ٤ مرات عشان يخرج.
- **الصفحات بـ [[pushState]]:** تقليب الصفحات خطوة حقيقية، فـ Back بيرجّع الصفحة اللي قبلها. والأزرار لينكات [[<a href="?page=2">]] حقيقية (تتفتح في تاب جديد بالضغط الوسطاني)، والـ JavaScript بيمنع الـ reload بس.
- **[[?page=99]]:** بنحسب آخر صفحة ونرجع لها، وبنصلّح الـ URL بـ [[replaceState]] عشان ميفضلش 99.
- **بحث عربي سليم:** [[norm()]] بتشيل التشكيل وبتخلي [[أ إ آ]] = [[ا]] و [[ة]] = [[ه]] و [[ى]] = [[ي]]. الناس بتكتب «اسرار» من غير همزة، والكتاب اسمه «أسرار».
- **[[URLSearchParams]]:** بيعمل encode للعربي لوحده ([[?q=%D9%86%D8%AC...]]) وبيرجّعه نص لما تقراه، فاللينك العربي بيشتغل لو اتبعت.
- **العداد [[aria-live="polite"]]:** قارئ الشاشة بيقول «لقينا 25 كتاب» بعد ما تخلص كتابة.
- **[[aria-current="page"]]** على رقم الصفحة الحالية، و [[aria-label]] على ‹ و › لأن السهم لوحده ملوش اسم.

~~~text الناتج (Chrome)
أول فتح                     لقينا 100 كتاب، صفحة 1 من 5   (7 لينكات: ‹ 1 2 3 4 5 ›)
كتبت «نجيب» بالكيبورد        ?q=نجيب   لقينا 25 كتاب، صفحة 1 من 2   أول كتاب: ليالي البحر · نجيب سالم · 1990
history.length              14 قبل الكتابة و 14 بعدها (مفيش خطوة لكل حرف)
Back                        رجّعني للصفحة اللي قبل الكتالوج على طول
?page=99                    الـ URL بقى ?page=5   لقينا 100 كتاب، صفحة 5 من 5   20 صف
?q=اسرار (رابط متبعت)        لقينا 10 كتاب، أولهم «أسرار البحر»
axe: 0 violations   الـ validator: مفيش رسايل   overflow على 360: 0
~~~` },
        { lvl: 'كبير', dir: "shop-invoice", t: R`فاتورة ومخزن لمحل متخيل`, what: R`أداة لمحل أدوات منزلية متخيل: فورم بيزوّد صنف (الاسم، والكمية، والسعر) لجدول الفاتورة، والإجمالي والضريبة بيتحسبوا في الـ tfoot، وحذف صنف بزرار ليه [[aria-label]] باسم الصنف، والفاتورة بتتحفظ في localStorage وترجع بعد الـ refresh، ورقم الفاتورة بيزيد لوحده. وصفحة الطباعة: A4 بهامش 12mm، ورقم «صفحة ١ من ٢» تحت، والـ thead والـ tfoot بيتكرروا، والصف مبيتقطعش، والأزرار والفورم مخفيين، وشعار المحل ولون عنوان الجدول بيتطبعوا. يجمع الوحدة دي مع وحدة الفورم.`, done: R`بـ ٤٠ صنف الـ Save as PDF بيطلع أكتر من ورقة وكل ورقة فيها العناوين فوق والإجمالي تحت ورقمها، ومفيش زرار ولا حقل في الورق، والرقم الغلط (كمية 0 أو سعر سالب) بيترفض برسالة جنب الحقل، والـ refresh مبيضيّعش الفاتورة، والطباعة مرتين ورا بعض بتطلع نفس الـ PDF، و axe صفر violations على الشاشة.`, ext: R`زوّد تصدير CSV بزرار، وفلتر بالتاريخ، ونسخة «إيصال كاشير» بـ [[size: 80mm 200mm]]، وخلي الـ PDF يتعمل في السيرفر بـ Playwright ([[page.pdf]]) لما تتعلم Node.`, sol: R`~~~text
shop-invoice/
├── index.html   الهيدر والفورم والجدول
├── style.css    الشاشة، والورق (@page و @media print)
└── app.js       الحساب والحفظ والإضافة والحذف
~~~

**ترتيب البناء:** (١) الجدول بـ [[thead]] و [[tbody]] و [[tfoot]] وصفين مكتوبين بإيدك عشان تظبط الشكل. (٢) الـ CSS للشاشة. (٣) [[app.js]]: [[render()]] من مصفوفة، وبعدين الإضافة، وبعدين الحذف، وبعدين [[localStorage]]. (٤) آخر حاجة الطباعة: اضغط Ctrl+P وانت شغال، أو DevTools › Rendering › Emulate CSS media type › print.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فاتورة: أدوات البيت</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <header class="shop">
    <svg class="logo" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#b45309"/><path d="M10 28V16l10-7 10 7v12H24v-7h-8v7z" fill="white"/></svg>
    <div>
      <h1>أدوات البيت</h1>
      <p>فاتورة رقم <b id="number"></b> · <span id="today"></span></p>
    </div>
  </header>

  <form id="add" class="no-print" novalidate>
    <div class="field name">
      <label for="item">الصنف</label>
      <input id="item" name="item" required maxlength="60" aria-describedby="item-err">
      <span class="err" id="item-err"></span>
    </div>
    <div class="field">
      <label for="qty">الكمية</label>
      <input id="qty" name="qty" type="number" min="1" step="1" value="1" required aria-describedby="qty-err">
      <span class="err" id="qty-err"></span>
    </div>
    <div class="field">
      <label for="price">سعر الوحدة</label>
      <input id="price" name="price" type="number" min="0.01" step="0.01" required aria-describedby="price-err">
      <span class="err" id="price-err"></span>
    </div>
    <button>زوّد</button>
  </form>

  <table>
    <caption>الأصناف</caption>
    <thead>
      <tr><th scope="col">#</th><th scope="col">الصنف</th><th scope="col" class="num">الكمية</th><th scope="col" class="num">السعر</th><th scope="col" class="num">المجموع</th><th scope="col" class="no-print"><span class="visually-hidden">حذف</span></th></tr>
    </thead>
    <tbody id="rows"></tbody>
    <tfoot>
      <tr><th scope="row" colspan="4">قبل الضريبة</th><td class="num" id="sub"></td><td class="no-print"></td></tr>
      <tr><th scope="row" colspan="4">ضريبة ١٤٪</th><td class="num" id="vat"></td><td class="no-print"></td></tr>
      <tr class="grand"><th scope="row" colspan="4">الإجمالي</th><td class="num" id="total"></td><td class="no-print"></td></tr>
    </tfoot>
  </table>
  <p id="empty" class="empty">الفاتورة لسه فاضية. زوّد أول صنف من فوق.</p>

  <div class="actions no-print">
    <button type="button" id="print">اطبع</button>
    <button type="button" id="fresh">فاتورة جديدة</button>
  </div>
</main>
<script src="app.js"></script>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #f5f5f4; color: #1c1917; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
main { max-width: 820px; margin-inline: auto; padding: 20px; background: white; border-radius: 14px; }

.shop { display: flex; gap: 12px; align-items: center; margin-block-end: 16px; }
.shop h1 { margin: 0; font-size: 22px; }
.shop p { margin: 0; color: #57534e; }

form { display: grid; grid-template-columns: 1fr; gap: 10px; align-items: start; margin-block-end: 16px; padding: 12px; border-radius: 12px; background: #fafaf9; }
@media (min-width: 640px) { form { grid-template-columns: 2fr 1fr 1fr auto; } form button { margin-block-start: 26px; } }
.field { display: grid; gap: 4px; min-width: 0; }
label { font-weight: 600; }
input { font: inherit; width: 100%; padding: 8px 10px; border: 1px solid #a8a29e; border-radius: 8px; }
[aria-invalid="true"] { border-color: #b91c1c; background: #fef2f2; }
.err { min-height: 1.2em; color: #b91c1c; font-size: 13px; }
button { font: inherit; font-weight: 700; padding: 8px 16px; border: 0; border-radius: 8px; background: #b45309; color: white; cursor: pointer; }

table { width: 100%; border-collapse: collapse; }
caption { text-align: start; font-weight: 700; padding-block-end: 6px; }
th, td { padding: 8px 10px; text-align: start; border-block-end: 1px solid #e7e5e4; }
thead th { background: #b45309; color: white; }
.num { text-align: end; font-variant-numeric: tabular-nums; }
tfoot th { text-align: end; font-weight: 600; }
.grand th, .grand td { font-size: 18px; font-weight: 800; border-block-start: 2px solid #1c1917; }
.del { padding: 4px 10px; background: transparent; color: #b91c1c; border: 1px solid #fca5a5; }
.empty { color: #78716c; }
.actions { display: flex; gap: 8px; margin-block-start: 16px; }
.actions #fresh { background: white; color: #b45309; border: 1px solid #b45309; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ---------- the paper ---------- */
@page {
  size: A4;
  margin: 12mm;
  @bottom-center { content: "صفحة " counter(page) " من " counter(pages); font: 10px system-ui, sans-serif; color: #57534e; }
}
@media print {
  body { padding: 0; background: white; }
  main { max-width: none; padding: 0; border-radius: 0; }
  .no-print, .empty { display: none !important; }
  /* thead and tfoot repeat on every page by default (table-header-group / table-footer-group); a row never splits */
  tr { break-inside: avoid; }
  /* without this the browser drops background colors to save ink: the header row and the logo would print white */
  thead th, .logo { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}
~~~

~~~js app.js
const KEY = 'home-tools-invoice';
const VAT = 0.14;
const form = document.getElementById('add');
const rows = document.getElementById('rows');
const money = n => n.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------- saved state: { number, items: [{ name, qty, price }] } ----------
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.items) && Number.isInteger(s.number)) return s;
  } catch {}
  return { number: 1, items: [] };
}
let invoice = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(invoice)); } catch {} }

// ---------- the table ----------
function render() {
  document.getElementById('number').textContent = String(invoice.number).padStart(4, '0');
  document.getElementById('today').textContent = new Date().toLocaleDateString('ar-EG', { dateStyle: 'long' });
  rows.innerHTML = '';
  // money in piasters (whole numbers) so 0.1 + 0.2 never becomes 0.30000000000000004
  let sub = 0;
  invoice.items.forEach((it, i) => {
    const line = Math.round(it.price * 100) * it.qty;
    sub += line;
    const tr = rows.insertRow();
    tr.insertCell().textContent = i + 1;
    tr.insertCell().textContent = it.name;
    const q = tr.insertCell(); q.textContent = it.qty; q.className = 'num';
    const p = tr.insertCell(); p.textContent = money(it.price); p.className = 'num';
    const l = tr.insertCell(); l.textContent = money(line / 100); l.className = 'num';
    const d = tr.insertCell(); d.className = 'no-print';
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'del'; b.textContent = 'احذف';
    b.setAttribute('aria-label', 'احذف ' + it.name);
    b.addEventListener('click', () => { invoice.items.splice(i, 1); save(); render(); });
    d.append(b);
  });
  const vat = Math.round(sub * VAT);
  document.getElementById('sub').textContent = money(sub / 100);
  document.getElementById('vat').textContent = money(vat / 100);
  document.getElementById('total').textContent = money((sub + vat) / 100);
  document.getElementById('empty').hidden = invoice.items.length > 0;
}

// ---------- add an item, the error next to its field ----------
form.addEventListener('submit', e => {
  e.preventDefault();
  let first = null;
  for (const f of form.elements) {
    // the submit button is in form.elements too, and willValidate is true for it: only fields that have an error line
    const err = document.getElementById(f.id + '-err');
    if (!f.willValidate || !err) continue;
    const ok = f.checkValidity();
    f.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : f.validationMessage;
    if (!ok && !first) first = f;
  }
  if (first) { first.focus(); return; }
  invoice.items.push({ name: form.item.value.trim(), qty: form.qty.valueAsNumber, price: form.price.valueAsNumber });
  save();
  render();
  form.reset();
  form.item.focus();
});

document.getElementById('print').addEventListener('click', () => print());
document.getElementById('fresh').addEventListener('click', () => {
  if (invoice.items.length && !confirm('تبدأ فاتورة جديدة؟ الحالية هتتمسح من الشاشة.')) return;
  invoice = { number: invoice.number + 1, items: [] };
  save();
  render();
});
render();
~~~

~~~view 640 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فاتورة: أدوات البيت</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 16px; background: #f5f5f4; color: #1c1917; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
main { max-width: 820px; margin-inline: auto; padding: 20px; background: white; border-radius: 14px; }

.shop { display: flex; gap: 12px; align-items: center; margin-block-end: 16px; }
.shop h1 { margin: 0; font-size: 22px; }
.shop p { margin: 0; color: #57534e; }

form { display: grid; grid-template-columns: 1fr; gap: 10px; align-items: start; margin-block-end: 16px; padding: 12px; border-radius: 12px; background: #fafaf9; }
@media (min-width: 640px) { form { grid-template-columns: 2fr 1fr 1fr auto; } form button { margin-block-start: 26px; } }
.field { display: grid; gap: 4px; min-width: 0; }
label { font-weight: 600; }
input { font: inherit; width: 100%; padding: 8px 10px; border: 1px solid #a8a29e; border-radius: 8px; }
[aria-invalid="true"] { border-color: #b91c1c; background: #fef2f2; }
.err { min-height: 1.2em; color: #b91c1c; font-size: 13px; }
button { font: inherit; font-weight: 700; padding: 8px 16px; border: 0; border-radius: 8px; background: #b45309; color: white; cursor: pointer; }

table { width: 100%; border-collapse: collapse; }
caption { text-align: start; font-weight: 700; padding-block-end: 6px; }
th, td { padding: 8px 10px; text-align: start; border-block-end: 1px solid #e7e5e4; }
thead th { background: #b45309; color: white; }
.num { text-align: end; font-variant-numeric: tabular-nums; }
tfoot th { text-align: end; font-weight: 600; }
.grand th, .grand td { font-size: 18px; font-weight: 800; border-block-start: 2px solid #1c1917; }
.del { padding: 4px 10px; background: transparent; color: #b91c1c; border: 1px solid #fca5a5; }
.empty { color: #78716c; }
.actions { display: flex; gap: 8px; margin-block-start: 16px; }
.actions #fresh { background: white; color: #b45309; border: 1px solid #b45309; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ---------- the paper ---------- */
@page {
  size: A4;
  margin: 12mm;
  @bottom-center { content: "صفحة " counter(page) " من " counter(pages); font: 10px system-ui, sans-serif; color: #57534e; }
}
@media print {
  body { padding: 0; background: white; }
  main { max-width: none; padding: 0; border-radius: 0; }
  .no-print, .empty { display: none !important; }
  /* thead and tfoot repeat on every page by default (table-header-group / table-footer-group); a row never splits */
  tr { break-inside: avoid; }
  /* without this the browser drops background colors to save ink: the header row and the logo would print white */
  thead th, .logo { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}
</style>
</head>
<body>
<main>
  <header class="shop">
    <svg class="logo" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#b45309"/><path d="M10 28V16l10-7 10 7v12H24v-7h-8v7z" fill="white"/></svg>
    <div>
      <h1>أدوات البيت</h1>
      <p>فاتورة رقم <b id="number"></b> · <span id="today"></span></p>
    </div>
  </header>

  <form id="add" class="no-print" novalidate>
    <div class="field name">
      <label for="item">الصنف</label>
      <input id="item" name="item" required maxlength="60" aria-describedby="item-err">
      <span class="err" id="item-err"></span>
    </div>
    <div class="field">
      <label for="qty">الكمية</label>
      <input id="qty" name="qty" type="number" min="1" step="1" value="1" required aria-describedby="qty-err">
      <span class="err" id="qty-err"></span>
    </div>
    <div class="field">
      <label for="price">سعر الوحدة</label>
      <input id="price" name="price" type="number" min="0.01" step="0.01" required aria-describedby="price-err">
      <span class="err" id="price-err"></span>
    </div>
    <button>زوّد</button>
  </form>

  <table>
    <caption>الأصناف</caption>
    <thead>
      <tr><th scope="col">#</th><th scope="col">الصنف</th><th scope="col" class="num">الكمية</th><th scope="col" class="num">السعر</th><th scope="col" class="num">المجموع</th><th scope="col" class="no-print"><span class="visually-hidden">حذف</span></th></tr>
    </thead>
    <tbody id="rows"></tbody>
    <tfoot>
      <tr><th scope="row" colspan="4">قبل الضريبة</th><td class="num" id="sub"></td><td class="no-print"></td></tr>
      <tr><th scope="row" colspan="4">ضريبة ١٤٪</th><td class="num" id="vat"></td><td class="no-print"></td></tr>
      <tr class="grand"><th scope="row" colspan="4">الإجمالي</th><td class="num" id="total"></td><td class="no-print"></td></tr>
    </tfoot>
  </table>
  <p id="empty" class="empty">الفاتورة لسه فاضية. زوّد أول صنف من فوق.</p>

  <div class="actions no-print">
    <button type="button" id="print">اطبع</button>
    <button type="button" id="fresh">فاتورة جديدة</button>
  </div>
</main>
<script>
const KEY = 'home-tools-invoice';
const VAT = 0.14;
const form = document.getElementById('add');
const rows = document.getElementById('rows');
const money = n => n.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------- saved state: { number, items: [{ name, qty, price }] } ----------
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.items) && Number.isInteger(s.number)) return s;
  } catch {}
  return { number: 7, items: [{ name: "مقشة", qty: 2, price: 45 }, { name: "جردل", qty: 1, price: 60 }, { name: "ممسحة", qty: 1, price: 85.5 }, { name: "صابون سايل", qty: 3, price: 32.75 }] };
}
let invoice = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(invoice)); } catch {} }

// ---------- the table ----------
function render() {
  document.getElementById('number').textContent = String(invoice.number).padStart(4, '0');
  document.getElementById('today').textContent = new Date().toLocaleDateString('ar-EG', { dateStyle: 'long' });
  rows.innerHTML = '';
  // money in piasters (whole numbers) so 0.1 + 0.2 never becomes 0.30000000000000004
  let sub = 0;
  invoice.items.forEach((it, i) => {
    const line = Math.round(it.price * 100) * it.qty;
    sub += line;
    const tr = rows.insertRow();
    tr.insertCell().textContent = i + 1;
    tr.insertCell().textContent = it.name;
    const q = tr.insertCell(); q.textContent = it.qty; q.className = 'num';
    const p = tr.insertCell(); p.textContent = money(it.price); p.className = 'num';
    const l = tr.insertCell(); l.textContent = money(line / 100); l.className = 'num';
    const d = tr.insertCell(); d.className = 'no-print';
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'del'; b.textContent = 'احذف';
    b.setAttribute('aria-label', 'احذف ' + it.name);
    b.addEventListener('click', () => { invoice.items.splice(i, 1); save(); render(); });
    d.append(b);
  });
  const vat = Math.round(sub * VAT);
  document.getElementById('sub').textContent = money(sub / 100);
  document.getElementById('vat').textContent = money(vat / 100);
  document.getElementById('total').textContent = money((sub + vat) / 100);
  document.getElementById('empty').hidden = invoice.items.length > 0;
}

// ---------- add an item, the error next to its field ----------
form.addEventListener('submit', e => {
  e.preventDefault();
  let first = null;
  for (const f of form.elements) {
    // the submit button is in form.elements too, and willValidate is true for it: only fields that have an error line
    const err = document.getElementById(f.id + '-err');
    if (!f.willValidate || !err) continue;
    const ok = f.checkValidity();
    f.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : f.validationMessage;
    if (!ok && !first) first = f;
  }
  if (first) { first.focus(); return; }
  invoice.items.push({ name: form.item.value.trim(), qty: form.qty.valueAsNumber, price: form.price.valueAsNumber });
  save();
  render();
  form.reset();
  form.item.focus();
});

document.getElementById('print').addEventListener('click', () => print());
document.getElementById('fresh').addEventListener('click', () => {
  if (invoice.items.length && !confirm('تبدأ فاتورة جديدة؟ الحالية هتتمسح من الشاشة.')) return;
  invoice = { number: invoice.number + 1, items: [] };
  save();
  render();
});
render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** ورقة بيضا فيها لوجو بني صغير (بيت) واسم المحل ورقم الفاتورة والتاريخ، وتحتها فورم من ٣ حقول وزرار «زوّد»، وبعدين الجدول بصف عناوين بني والأصناف، وتحت: قبل الضريبة، والضريبة ١٤٪، والإجمالي بخط تقيل. (المعاينة فيها ٤ أصناف مثال. عندك هتبدأ فاضية.)

**الحساب:**
- **الفلوس بالقروش:** [[Math.round(price * 100) * qty]] وبنقسم على 100 في الآخر بس. لأن الكسور في JavaScript مش مظبوطة: [[0.1 + 0.2]] = [[0.30000000000000004]]، ومع فاتورة طويلة الفرق بيبان في آخر رقم.
- **[[toLocaleString('ar-EG', { minimumFractionDigits: 2 })]]:** أرقام عربي و رقمين بعد العلامة دايمًا ([[٠٫٤٠]] مش [[٠٫٤]]).

**الأخطاء جنب الحقل:** [[min="1"]] و [[step="1"]] للكمية، و [[min="0.01"]] للسعر، و [[novalidate]] على الفورم عشان رسالة كل حقل تظهر في السطر اللي تحته ([[aria-describedby]] بيربطهم) بدل فقاعة واحدة.

**باج لقيته في حلي وانا بجرّب:** النسخة الأولى كانت بتلف على كل [[form.elements]] وتكتب الرسالة في [[document.getElementById(f.id + '-err')]]. زرار «زوّد» نفسه جوه [[form.elements]] و [[willValidate]] بتاعه [[true]]، وملوش id، فـ [[getElementById('-err')]] رجّع [[null]] والـ handler وقع بـ [[Cannot set properties of null]]. ولأن [[preventDefault()]] كان أول سطر، الصفحة مكانتش بتعمل أي حاجة ومفيش رسالة للمستخدم. الحل: اتأكد إن العنصر ليه سطر خطأ قبل ما تكتب فيه.

**الحفظ:** الفاتورة كلها ([[{ number, items }]]) بتتحفظ بعد كل تغيير، وبترجع مع الـ refresh. و [[load()]] بتتأكد من الشكل ([[Array.isArray]] و [[Number.isInteger]]) قبل ما تصدّق البيانات، عشان لو حد عدّلها من DevTools بإيده الصفحة متقعش. و «فاتورة جديدة» بتزوّد الرقم.

**الحذف:** كل زرار [[aria-label="احذف مقشة"]]، لأن «احذف» عشرين مرة في لستة الأزرار ملهاش معنى.

**الورق:**
- [[@page { size: A4; margin: 12mm; }]]، وجواها [[@bottom-center]] فيه [[counter(page)]] و [[counter(pages)]]: رقم الصفحة من عدد الصفحات تحت كل ورقة. (Chrome بيدعم مربعات هامش الصفحة دي من نسخة 131.)
- [[thead]] و [[tfoot]] بيتكرروا في كل ورقة لوحدهم: ده سلوكهم الافتراضي في الطباعة ([[table-header-group]] و [[table-footer-group]]). يعني متكتبش [[display: block]] عليهم.
- [[tr { break-inside: avoid; }]]: الصف ميتقسمش نصه في ورقة ونصه في اللي بعدها.
- [[.no-print]]: الفورم والأزرار وعمود الحذف مالهمش لازمة في الورق.
- [[print-color-adjust: exact]] على صف العناوين واللوجو: نافذة الطباعة في Chrome فيها خيار «Background graphics» مقفول من الأول، والمتصفح بيشيل الخلفيات عشان الحبر. الـ property دي بتقول للمتصفح إن اللون ده جزء من المعنى (من وثائق MDN). ملحوظة: في اختباري بـ [[--print-to-pdf]] (Chrome من غير شاشة) الخلفية اتطبعت في الحالتين، فجرّب انت من نافذة الطباعة الحقيقية.

~~~text الناتج (Chrome)
كمية 0 وسعر -5          Value must be greater than or equal to 1.   /   Value must be greater than or equal to 0.01.
                        الـ focus راح لـ #qty، ومفيش صف اتزوّد
الصنف فاضي              Please fill out this field.
مقشة 2 × 0.1 + جردل 1 × 0.2
                        قبل الضريبة ٠٫٤٠   الضريبة ٠٫٠٦   الإجمالي ٠٫٤٦
زرار الحذف               aria-label="احذف مقشة"
localStorage            {"number":1,"items":[{"name":"مقشة","qty":2,"price":0.1},{"name":"جردل","qty":1,"price":0.2}]}

الطباعة بـ 40 صنف (--print-to-pdf مرتين):
  ورقتين A4 (595 × 842 نقطة)
  ورقة 1: «صفحة 1 من 2»، وفيها صف العناوين، وتحت: قبل الضريبة والضريبة والإجمالي
  ورقة 2: «صفحة 2 من 2»، وأولها صف العناوين تاني، وفي الآخر الإجمالي تاني
  الـ 40 صنف موجودين، و «احذف» و «زوّد» و «اطبع» و «فاتورة جديدة»: 0 مرة في الورق
  الطبعتين: نفس النص بالظبط (الملفين بيختلفوا في CreationDate بس)
axe: 0 violations   الـ validator: مفيش رسايل   overflow على 360: 0
~~~` },
        { lvl: 'فكرة', dir: "my-tracker", t: R`جدول لحاجة بتتابعها انت`, what: R`مصاريفك، أو ماتشات فريقك، أو مذاكرتك: جدول بياناته حقيقية من عندك، بترتيب وبحث وصفحة طباعة. انت اللي تحدد الأعمدة.`, done: R`فيه ٣٠ صف حقيقي على الأقل، والترتيب والبحث في الـ URL، والطباعة نضيفة، وواحد صاحبك فتح اللينك وشاف نفس الترتيب.`, ext: R`زوّد رسم بياني بسيط بـ SVG أو CSS (أعمدة بـ [[height]] من متغير) جنب الجدول.`, sol: R`نسخة نموذجية: مصاريف شهر واحد (٣٠ بند، والأرقام متخيلة). انت هتحط بياناتك الحقيقية مكان [[DATA]].

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريفي في نوفمبر</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #f0fdf4; color: #14532d; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
  main { max-width: 720px; margin-inline: auto; }
  h1 { margin: 0 0 4px; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: end; margin-block: 12px; }
  .bar label { display: grid; gap: 2px; font-weight: 600; flex: 1 1 200px; }
  input { font: inherit; padding: 8px 10px; border: 1px solid #86efac; border-radius: 8px; }
  button { font: inherit; font-weight: 700; padding: 8px 14px; border: 1px solid #15803d; border-radius: 8px; background: white; color: #15803d; }
  table { width: 100%; border-collapse: collapse; background: white; }
  th, td { padding: 6px 10px; text-align: start; border-block-end: 1px solid #dcfce7; }
  thead th { background: #15803d; color: white; }
  thead button { all: unset; cursor: pointer; }
  th[aria-sort="ascending"] button::after { content: " ▲"; }
  th[aria-sort="descending"] button::after { content: " ▼"; }
  .num { text-align: end; font-variant-numeric: tabular-nums; }
  tfoot td, tfoot th { font-weight: 800; border-block-start: 2px solid #14532d; }
  @page { size: A4; margin: 12mm; }
  @media print {
    body { background: white; padding: 0; }
    .bar { display: none; }
    thead th { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    tr { break-inside: avoid; }
  }
</style>
</head>
<body>
<main>
  <h1>مصاريفي في نوفمبر</h1>
  <div class="bar">
    <label>دوّر في البند أو القسم <input id="q" type="search" autocomplete="off"></label>
    <button type="button" id="print">اطبع</button>
  </div>
  <table>
    <thead><tr>
      <th scope="col" data-key="day"><button type="button">اليوم</button></th>
      <th scope="col" data-key="what"><button type="button">البند</button></th>
      <th scope="col" data-key="kind"><button type="button">القسم</button></th>
      <th scope="col" data-key="amount" class="num"><button type="button">المبلغ</button></th>
    </tr></thead>
    <tbody id="rows"></tbody>
    <tfoot><tr><th scope="row" colspan="3" id="label">المجموع</th><td class="num" id="sum"></td></tr></tfoot>
  </table>
</main>
<script>
  // my real month, 30 lines (the amounts are made up for the example)
  const DATA = [
    [1,'مواصلات الشغل','مواصلات',45],[1,'فطار','أكل',35],[2,'شحن موبايل','فواتير',100],[3,'خضار وفاكهة','بيت',180],
    [4,'مواصلات الشغل','مواصلات',45],[5,'غدا مع أصحابي','أكل',150],[6,'كتاب برمجة','تعليم',320],[7,'مواصلات الشغل','مواصلات',45],
    [8,'فاتورة النت','فواتير',350],[9,'قهوة','أكل',40],[10,'جيم (شهر)','صحة',500],[11,'مواصلات الشغل','مواصلات',45],
    [12,'هدية عيد ميلاد','هدايا',250],[13,'فطار','أكل',35],[14,'سوبر ماركت','بيت',420],[15,'كورس أونلاين','تعليم',600],
    [16,'مواصلات الشغل','مواصلات',45],[17,'أدوية','صحة',210],[18,'عشا برّه','أكل',260],[19,'فاتورة الكهربا','فواتير',280],
    [20,'مواصلات الشغل','مواصلات',45],[21,'قهوة','أكل',40],[22,'تصليح جزمة','بيت',60],[23,'سينما','خروج',180],
    [24,'مواصلات الشغل','مواصلات',45],[25,'سوبر ماركت','بيت',390],[26,'فطار','أكل',35],[27,'تاكسي متأخر','مواصلات',120],
    [28,'شحن موبايل','فواتير',100],[30,'خروجة آخر الشهر','خروج',300],
  ].map(([day, what, kind, amount]) => ({ day, what, kind, amount }));
  const heads = [...document.querySelectorAll('th[data-key]')];
  const q = document.getElementById('q');

  function state() {
    const p = new URLSearchParams(location.search);
    return { q: p.get('q') || '', sort: p.get('sort') || 'day', dir: p.get('dir') === 'desc' ? 'desc' : 'asc' };
  }
  function go(s, push) {
    const p = new URLSearchParams();
    if (s.q) p.set('q', s.q);
    p.set('sort', s.sort); p.set('dir', s.dir);
    history[push ? 'pushState' : 'replaceState'](null, '', '?' + p);
    render();
  }
  function render() {
    const s = state();
    const list = DATA.filter(r => (r.what + ' ' + r.kind).includes(s.q))
      .sort((a, b) => { const x = a[s.sort], y = b[s.sort]; const c = typeof x === 'number' ? x - y : x.localeCompare(y, 'ar'); return s.dir === 'asc' ? c : -c; });
    const tb = document.getElementById('rows'); tb.innerHTML = '';
    for (const r of list) {
      const tr = tb.insertRow();
      tr.insertCell().textContent = r.day + ' نوفمبر';
      tr.insertCell().textContent = r.what;
      tr.insertCell().textContent = r.kind;
      const a = tr.insertCell(); a.textContent = r.amount.toLocaleString('ar-EG') + ' ج'; a.className = 'num';
    }
    document.getElementById('label').textContent = 'المجموع (' + list.length + ' بند)';
    document.getElementById('sum').textContent = list.reduce((n, r) => n + r.amount, 0).toLocaleString('ar-EG') + ' ج';
    for (const h of heads) h.dataset.key === s.sort ? h.setAttribute('aria-sort', s.dir === 'asc' ? 'ascending' : 'descending') : h.removeAttribute('aria-sort');
    if (document.activeElement !== q) q.value = s.q;
  }
  for (const h of heads) h.querySelector('button').addEventListener('click', () => {
    const s = state();
    go({ ...s, sort: h.dataset.key, dir: s.sort === h.dataset.key && s.dir === 'asc' ? 'desc' : 'asc' }, true);
  });
  q.addEventListener('input', () => go({ ...state(), q: q.value.trim() }, false));
  document.getElementById('print').addEventListener('click', () => print());
  window.addEventListener('popstate', render);
  render();
</script>
</body>
</html>
~~~

~~~view 640 760 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصاريفي في نوفمبر</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: #f0fdf4; color: #14532d; font: 15px/1.5 system-ui, "Segoe UI", Tahoma, sans-serif; }
  main { max-width: 720px; margin-inline: auto; }
  h1 { margin: 0 0 4px; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: end; margin-block: 12px; }
  .bar label { display: grid; gap: 2px; font-weight: 600; flex: 1 1 200px; }
  input { font: inherit; padding: 8px 10px; border: 1px solid #86efac; border-radius: 8px; }
  button { font: inherit; font-weight: 700; padding: 8px 14px; border: 1px solid #15803d; border-radius: 8px; background: white; color: #15803d; }
  table { width: 100%; border-collapse: collapse; background: white; }
  th, td { padding: 6px 10px; text-align: start; border-block-end: 1px solid #dcfce7; }
  thead th { background: #15803d; color: white; }
  thead button { all: unset; cursor: pointer; }
  th[aria-sort="ascending"] button::after { content: " ▲"; }
  th[aria-sort="descending"] button::after { content: " ▼"; }
  .num { text-align: end; font-variant-numeric: tabular-nums; }
  tfoot td, tfoot th { font-weight: 800; border-block-start: 2px solid #14532d; }
  @page { size: A4; margin: 12mm; }
  @media print {
    body { background: white; padding: 0; }
    .bar { display: none; }
    thead th { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    tr { break-inside: avoid; }
  }
</style>
</head>
<body>
<main>
  <h1>مصاريفي في نوفمبر</h1>
  <div class="bar">
    <label>دوّر في البند أو القسم <input id="q" type="search" autocomplete="off"></label>
    <button type="button" id="print">اطبع</button>
  </div>
  <table>
    <thead><tr>
      <th scope="col" data-key="day"><button type="button">اليوم</button></th>
      <th scope="col" data-key="what"><button type="button">البند</button></th>
      <th scope="col" data-key="kind"><button type="button">القسم</button></th>
      <th scope="col" data-key="amount" class="num"><button type="button">المبلغ</button></th>
    </tr></thead>
    <tbody id="rows"></tbody>
    <tfoot><tr><th scope="row" colspan="3" id="label">المجموع</th><td class="num" id="sum"></td></tr></tfoot>
  </table>
</main>
<script>
  // my real month, 30 lines (the amounts are made up for the example)
  const DATA = [
    [1,'مواصلات الشغل','مواصلات',45],[1,'فطار','أكل',35],[2,'شحن موبايل','فواتير',100],[3,'خضار وفاكهة','بيت',180],
    [4,'مواصلات الشغل','مواصلات',45],[5,'غدا مع أصحابي','أكل',150],[6,'كتاب برمجة','تعليم',320],[7,'مواصلات الشغل','مواصلات',45],
    [8,'فاتورة النت','فواتير',350],[9,'قهوة','أكل',40],[10,'جيم (شهر)','صحة',500],[11,'مواصلات الشغل','مواصلات',45],
    [12,'هدية عيد ميلاد','هدايا',250],[13,'فطار','أكل',35],[14,'سوبر ماركت','بيت',420],[15,'كورس أونلاين','تعليم',600],
    [16,'مواصلات الشغل','مواصلات',45],[17,'أدوية','صحة',210],[18,'عشا برّه','أكل',260],[19,'فاتورة الكهربا','فواتير',280],
    [20,'مواصلات الشغل','مواصلات',45],[21,'قهوة','أكل',40],[22,'تصليح جزمة','بيت',60],[23,'سينما','خروج',180],
    [24,'مواصلات الشغل','مواصلات',45],[25,'سوبر ماركت','بيت',390],[26,'فطار','أكل',35],[27,'تاكسي متأخر','مواصلات',120],
    [28,'شحن موبايل','فواتير',100],[30,'خروجة آخر الشهر','خروج',300],
  ].map(([day, what, kind, amount]) => ({ day, what, kind, amount }));
  const heads = [...document.querySelectorAll('th[data-key]')];
  const q = document.getElementById('q');

  function state() {
    const p = new URLSearchParams(location.search);
    return { q: p.get('q') || '', sort: p.get('sort') || 'day', dir: p.get('dir') === 'desc' ? 'desc' : 'asc' };
  }
  function go(s, push) {
    const p = new URLSearchParams();
    if (s.q) p.set('q', s.q);
    p.set('sort', s.sort); p.set('dir', s.dir);
    history[push ? 'pushState' : 'replaceState'](null, '', '?' + p);
    render();
  }
  function render() {
    const s = state();
    const list = DATA.filter(r => (r.what + ' ' + r.kind).includes(s.q))
      .sort((a, b) => { const x = a[s.sort], y = b[s.sort]; const c = typeof x === 'number' ? x - y : x.localeCompare(y, 'ar'); return s.dir === 'asc' ? c : -c; });
    const tb = document.getElementById('rows'); tb.innerHTML = '';
    for (const r of list) {
      const tr = tb.insertRow();
      tr.insertCell().textContent = r.day + ' نوفمبر';
      tr.insertCell().textContent = r.what;
      tr.insertCell().textContent = r.kind;
      const a = tr.insertCell(); a.textContent = r.amount.toLocaleString('ar-EG') + ' ج'; a.className = 'num';
    }
    document.getElementById('label').textContent = 'المجموع (' + list.length + ' بند)';
    document.getElementById('sum').textContent = list.reduce((n, r) => n + r.amount, 0).toLocaleString('ar-EG') + ' ج';
    for (const h of heads) h.dataset.key === s.sort ? h.setAttribute('aria-sort', s.dir === 'asc' ? 'ascending' : 'descending') : h.removeAttribute('aria-sort');
    if (document.activeElement !== q) q.value = s.q;
  }
  for (const h of heads) h.querySelector('button').addEventListener('click', () => {
    const s = state();
    go({ ...s, sort: h.dataset.key, dir: s.sort === h.dataset.key && s.dir === 'asc' ? 'desc' : 'asc' }, true);
  });
  q.addEventListener('input', () => go({ ...state(), q: q.value.trim() }, false));
  document.getElementById('print').addEventListener('click', () => print());
  window.addEventListener('popstate', render);
  render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** خلفية خضرا فاتحة، وحقل بحث وزرار «اطبع»، وجدول بصف عناوين أخضر، وفي آخره سطر «المجموع (30 بند)» والرقم. دوس «المبلغ» مرتين والأغلى بيطلع فوق. اكتب «مواصلات» والمجموع بيتحسب للمواصلات بس.

**ليه كده:**
- **كل حاجة بتتغيّر بتتكتب في الـ URL:** البحث بـ [[replaceState]] والترتيب بـ [[pushState]]، والقراية من الـ URL بس ([[state()]]). فاللينك اللي تبعته لصاحبك بيفتح عنده بنفس البحث والترتيب.
- **المجموع للي ظاهر بس:** بيتحسب من [[list]] بعد الفلتر، مش من كل البيانات. ده اللي بيخلي الجدول يجاوب على سؤال حقيقي: «صرفت كام على المواصلات؟».
- **الطباعة:** البحث والزرار مخفيين، والعناوين بلونها، والصف ميتقسمش.
- **ليه الشكل ده:** جدول واحد بيعمل حاجة واحدة كويس أحسن من dashboard كبير مش بتستخدمه. لو حسيت إنك محتاج رسم، ده الـ «خليه بتاعك».

~~~text الناتج (Chrome)
أول فتح                  30 صف، المجموع ٥٬٢٧٠ ج
«المبلغ» مرتين            ?sort=amount&dir=desc   أول صف: 15 نوفمبر · كورس أونلاين · تعليم · ٦٠٠ ج
كتبت «مواصلات»           ?q=مواصلات&sort=amount&dir=desc   المجموع (8 بند) = ٤٣٥ ج
نفس اللينك في صفحة تانية   المجموع (8 بند)، وأول صف: 27 نوفمبر · تاكسي متأخر · مواصلات · ١٢٠ ج
axe: 0 violations   الـ validator: مفيش رسايل   overflow على 360: 0
~~~` },
      ],
      l: 1,
      n: "جدول بيانات حقيقي: عناوين مربوطة بالخلايا، وبيتعرض على الموبايل، وبيترتب ويتقسم صفحات",
      items: [
        {
          cmd: "table",
          ref: [
            { t: "WHATWG: the table element", url: "https://html.spec.whatwg.org/multipage/tables.html#the-table-element" },
            { t: "MDN: <table>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table" },
            { t: "WHATWG: the caption element", url: "https://html.spec.whatwg.org/multipage/tables.html#the-caption-element" },
            { t: "MDN: <caption>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption" },
            { t: "WHATWG: the tbody element", url: "https://html.spec.whatwg.org/multipage/tables.html#the-tbody-element" },
            { t: "MDN: <tbody>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tbody" },
            { t: "WHATWG: the tfoot element", url: "https://html.spec.whatwg.org/multipage/tables.html#the-tfoot-element" },
            { t: "MDN: <tfoot>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tfoot" },
            { t: "WHATWG: the thead element", url: "https://html.spec.whatwg.org/multipage/tables.html#the-thead-element" },
            { t: "MDN: <thead>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/thead" },
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** جدول حصص أسبوعي لـ «جيم الأبطال»: الأيام في الـ thead (th بـ [[scope="col"]])، والأوقات أول عمود (th بـ [[scope="row"]])، وحصة طولها ساعتين بـ [[rowspan="2"]]، و caption «جدول الحصص».`, done: R`الجدول مفيهوش خلية زيادة ولا ناقصة (كل صف عدد خلاياه صح بعد حساب الـ rowspan)، والخلية الطويلة ارتفاعها قد صفين ([[getBoundingClientRect]])، وتاب Accessibility بيقول columnheader للأيام و rowheader للأوقات.`, sol: R`~~~live 290 290
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** حد كتب ملاحظة جوه الجدول نفسه: [[<table><tr><td>1</td></tr><p>ملاحظة</p></table>]]. الملاحظة هتظهر فين؟ تحت الجدول، ولا فوقه، ولا جوه خلية؟`, done: R`ظهرت **فوق** الجدول: [[document.body.innerHTML]] رجّع [[<p>ملاحظة</p><table>...]]. المتصفح بيطلّع أي حاجة مش خلية برّه الجدول وبيحطها قبله. ونفس الحاجة بتحصل لو نسيت [[</table>]]: الكلام اللي بعده بيطلع فوقه.`, sol: R`~~~live 120 120
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

~~~live 160 160
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
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** حوّل الـ CSV ده لجدول: [[id,customer,total,status]] وتحته ٥ سطور زي [[1042,منى علي,1250,paid]] و [[1043,كريم,90,pending]]. الحالة تبقى كلمة عربي (مدفوع، مستني) مش الكلمة الإنجليزي.`, done: R`الجدول فيه caption و thead و ٥ صفوف، والإجمالي متنسّق [[1,250 ج]] (بـ [[toLocaleString]] أو بإيدك)، وعمود الأرقام محاذي للآخر، والـ id عنوان كل صف ([[scope="row"]]).`, sol: R`~~~live 360 360
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
            { lvl: 'تطبيق', t: R`**أشكال:** شارات حالة (pills) لعمود الحالة: [[border-radius: 999px]] و [[padding: 2px 10px]] وخط صغير، وكل حالة ليها متغيرين: لون خلفية فاتح ([[--ok-soft]]) ولون كلام غامق من نفس اللون ([[--ok-text]]). ٤ حالات: مدفوع، ومستني، وملغي، ومرتجع.`, done: R`الأربع شارات بنفس الارتفاع ومدورين من الجنبين، وتباين كل واحدة 4.5:1 أو أكتر في الـ color picker بتاع DevTools، والحالة مكتوبة كلام مش لون بس (اللي مبيفرّقش الألوان يقدر يقراها).`, sol: R`~~~live 130 130
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
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** جدول بعناوين على مستويين (مثلًا «الربع الأول» فوق يناير وفبراير ومارس). من MDN اعرف [[scope="colgroup"]] و [[<colgroup>]] و attribute [[headers]]، واعمله.`, done: R`العنوان اللي فوق واخد ٣ أعمدة بـ [[colspan="3"]] و [[scope="colgroup"]]، وفهمت إمتى تحتاج [[headers="id1 id2"]] على الخلية (الجداول اللي العناوين فيها مش في صف وعمود واضحين).`, sol: R`~~~live 200 220
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
          ref: [
            { t: "MDN: border-collapse", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-collapse" },
            { t: "MDN: border-spacing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-spacing" },
            { t: "MDN: max-height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-height" },
            { t: "MDN: width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width" },
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس جدول الطلبات بـ ٣ طرق على الموبايل: (١) wrapper بـ scroll زي الدرس، (٢) كروت: كل [[tr]] بقى كارت و [[td::before { content: attr(data-label) }]] بيكتب اسم العمود، (٣) إخفاء الأعمدة المش مهمة تحت عرض معيّن.`, done: R`في التلاتة على 360px [[document.documentElement.scrollWidth]] بيساوي 360 (مفيش scroll أفقي للصفحة)، وكتبت لكل طريقة عيب: الأولى محتاجة scroll، والتانية طويلة، والتالتة بتخبّي بيانات.`, sol: R`~~~live 530 620
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

~~~live 600 720
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

~~~live 130 130
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
            { lvl: 'تطبيق', t: R`**ابني:** جدول طلبات لوحة تحكم: wrapper بـ [[max-height: 70dvh]] وعناوين لازقة، وصفوف مخططة، وعمود «إجراءات» فيه زرارين أيقونة (تعديل وحذف) كل واحد [[aria-label]] فيه رقم الطلب ([[aria-label="احذف الطلب 1042"]]).`, done: R`العناوين فاضلة فوق وانت نازل جوه الجدول، و ARIA snapshot بيقول «احذف الطلب 1042» مش «زرار» بس، وكل زرار 44×44 على الأقل، والصفحة على 360px مفيهاش scroll أفقي.`, sol: R`~~~live 180 180
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
            { lvl: 'تحدي', t: R`**أشكال:** نسخة الكروت للموبايل: تحت 40rem كل صف بقى كارت بحدود و [[border-radius]]، وجوه الكارت كل خلية سطر فيه [[grid-template-columns: 8rem 1fr]]: اسم العمود من [[data-label]] على اليمين والقيمة جنبه، والـ thead مخفي بالشكل بس.`, done: R`على 360px كل طلب كارت لوحده واسم العمود قدام كل قيمة، وعلى 800px رجع جدول عادي، وتاب Accessibility لسه شايف [[table]] و [[columnheader]] في الحالتين (لأنك خبّيت الـ thead بالشكل مش بـ [[display: none]]).`, sol: R`~~~live 240 370
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
          ref: [
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
            { t: "MDN: History.pushState()", url: "https://developer.mozilla.org/en-US/docs/Web/API/History/pushState" },
            { t: "MDN: History.replaceState()", url: "https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState" },
            { t: "MDN: popstate event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event" },
            { t: "MDN: aria-sort", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort" },
          ],
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
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حقل بحث بيعمل [[history.pushState(null, '', '?q=' + input.value)]] مع كل حرف. المستخدم كتب «قهوة» وعايز يرجع للصفحة اللي قبل البحث.`, done: R`قبل: كتابة ٤ حروف زوّدت [[history.length]] بـ 4 (اتقاس في Chrome)، فكان محتاج يدوس Back ٤ مرات. بعد [[pushState]] مرة واحدة عند أول حرف و [[replaceState]] لباقي الحروف: بقت Back واحدة بترجّع الصفحة من غير بحث.`, sol: R`~~~live 120 120
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
~~~

~~~view 410 410 الشكل في المتصفح (الحل نفسه، وسطور للـ preview بس)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<script>/* للـ preview بس: الصفحة جوه srcdoc مالهاش رابط، فـ replaceState بيرمي error. السطر ده بيخليه يتجاهل، والبحث يشتغل */
for (const k of ["replaceState", "pushState"]) { const f = history[k].bind(history); history[k] = (...a) => { try { f(...a); } catch {} }; }
</script>
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
</script>
</body>
</html>
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
          ref: [
            { t: "MDN: @media", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media" },
            { t: "MDN: @page", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page" },
            { t: "MDN: print-color-adjust", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/print-color-adjust" },
            { t: "MDN: pt", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Numeric_data_types" },
          ],
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
            { lvl: 'تطبيق', t: R`**ابني:** إيصال حجز لـ «عيادة الشفاء» (اسم متخيل) بيتطبع على [[size: A5]]: اسم المريض، والميعاد، ورقم الحجز جوه [[<bdi>]]، وجدول صغير بالخدمات، وشارة «مدفوع» خضرا بـ [[print-color-adjust: exact]]، وزرار «اطبع» مبيظهرش على الورق.`, done: R`في Save as PDF الإيصال ورقة A5 واحدة، والشارة الخضرا ظاهرة والخلفيات مقفولة، والزرار مش موجود، والإيصال على الشاشة لسه شكله زي ما هو.`, sol: R`~~~live 420 420
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
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مقالة في مدونة متخيلة بثيم غامق ([[background: #111; color: #eee]]) وفيها navbar و sidebar وزرار مشاركة. لما حد طبعها طلعت ٧ ورقات فيهم القايمة، والكلام باهت جدًا، واللينكات مش معروف رايحة فين.`, done: R`بعد [[@media print]]: الـ nav والـ aside والأزرار مخفيين، والكلام أسود على أبيض، وكل لينك جنبه الرابط بين قوسين، وعدد الورق قلّ (اكتب الرقم قبل وبعد).`, sol: R`~~~live 600 720
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
            { lvl: 'تطبيق', t: R`**قارن وقيس:** جدول ١٢ صف كل صف فيه ملاحظة طويلة (٨ سطور). اعمله PDF مرة من غير [[tr { break-inside: avoid; }]] ومرة بيه، وفي كل مرة عدّ الصفوف اللي اتقطعت بين ورقتين.`, done: R`من غير avoid فيه صفوف اتقطعت (في Chrome 156 بالـ A4 وخط 14pt اتقطع صف واحد في صفحة الحل، والعدد بيتغيّر مع طول المحتوى)، وبيه صفر، وعدد الورق ممكن يزيد ورقة عشان الصف بينزل كله. وكتبت ليه ده أحسن في فاتورة.`, sol: R`~~~live 600 720
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جدول الطلبات اتحوّل لكروت على الموبايل بـ [[.items thead { display: block; }]] (أو none) برّه أي media query. لما الجدول الطويل يتطبع، العناوين هتتكرر فوق كل ورقة؟`, done: R`لأ: في التجربة كلمة العنوان ظهرت في أول ورقة بس، لأن التكرار جاي من [[display: table-header-group]] الافتراضي. الحل [[@media print { .items thead { display: table-header-group; } }]] أو تحط CSS الكروت جوه media query للشاشات الصغيرة بس.`, sol: R`~~~live 600 720
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
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN اعرف [[@page :first]] و [[break-before: page]] و [[orphans]] و [[widows]]، واعمل تقرير بيتطبع: صفحة غلاف من غير رقم صفحة، وكل قسم يبدأ في ورقة جديدة، ومفيش سطر لوحده في آخر ورقة أو أولها.`, done: R`الغلاف ورقة لوحده ومفيش عليه «صفحة 1» (حطيت [[@page :first { @bottom-center { content: none; } }]])، وكل h2 بيبدأ ورقة جديدة، وفهمت إن orphans و widows بيشتغلوا على السطور جوه الفقرة الواحدة.`, sol: R`~~~live 480 480
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
