// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("css", {
  label: "HTML و CSS",
  prompt: "$ ",
  lab: R`npm create vite@latest ui-lab -- --template react
cd ui-lab && npm i
npm run dev`,
  labText: "اعمل مشروع Vite تجربة، وافتح DevTools (تاب المتصفح) جنبه عشان تشوف أي CSS بيتطبق فين.",
  levels: {"1":["الأساس","HTML سليم، و box model، و flex و grid، و responsive"],"2":["Tailwind والمكونات","Tailwind، و cn و cva، و shadcn و Radix، والـ dark mode، و RTL"],"3":["الاحتراف","accessibility، والحركة، والأداء، و SEO في الـ HTML، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "HTML: هيكل الصفحة ومعناها",
      pre: [

      ],
      projects: [
        { lvl: 'صغير', dir: "zaytouna-menu", t: R`كارت منيو لمطعم متخيل`, what: R`صفحة واحدة لـ «مطعم الزيتونة» (اسم متخيل) بـ HTML بس من غير CSS: هيكل كامل ([[<!doctype html>]] و [[lang="ar" dir="rtl"]] و charset و viewport)، و h1 باسم المطعم، وفقرة، ولينك اتصال [[tel:]]، وصورة ليها [[alt]] بيوصفها، وزرار «اطلب». من دروس «مقدمة HTML» و «<!doctype html>» و «a و button».`, done: R`[[document.compatMode]] بيرجّع [[CSS1Compat]]، و [[document.characterSet]] بيرجّع [[UTF-8]]، والـ validator على validator.w3.org/nu مبيطلّعش ولا error، ولو غيّرت اسم ملف الصورة غلط الـ alt بيظهر مكانها.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مطعم الزيتونة: المنيو</title>
</head>
<body>
<main>
  <h1>مطعم الزيتونة</h1>
  <img src="logo.svg" alt="لوجو المطعم: زيتونة خضرا جوه دايرة" width="120" height="120">
  <p>أكل بيتي كل يوم من ١٢ الضهر لـ ١٢ بالليل: فول وطعمية الصبح، ومحشي وملوخية على الغدا.</p>
  <p>للطلب كلمنا على <a href="tel:+20225550147">0225550147</a></p>
  <button type="button">اطلب</button>
</main>
</body>
</html>
~~~

واعمل جنب [[index.html]] ملف اسمه [[logo.svg]] (ملف SVG ده كود صورة، بيتفتح في VS Code زي أي ملف نص) وحط فيه:

~~~xml logo.svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#557a2b"/><ellipse cx="60" cy="60" rx="22" ry="34" fill="#a3c45a"/></svg>
~~~

~~~view 330 400 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مطعم الزيتونة: المنيو</title>
</head>
<body>
<main>
  <h1>مطعم الزيتونة</h1>
  <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22%23557a2b%22%2F%3E%3Cellipse%20cx%3D%2260%22%20cy%3D%2260%22%20rx%3D%2222%22%20ry%3D%2234%22%20fill%3D%22%23a3c45a%22%2F%3E%3C%2Fsvg%3E" alt="لوجو المطعم: زيتونة خضرا جوه دايرة" width="120" height="120">
  <p>أكل بيتي كل يوم من ١٢ الضهر لـ ١٢ بالليل: فول وطعمية الصبح، ومحشي وملوخية على الغدا.</p>
  <p>للطلب كلمنا على <a href="tel:+20225550147">0225550147</a></p>
  <button type="button">اطلب</button>
</main>
</body>
</html>
~~~

**هتشوف إيه:** صفحة بيضا من غير أي تنسيق: العنوان كبير وتقيل، وتحته دايرة خضرا جواها زيتونة فاتحة، وبعدها فقرتين، والرقم لينك أزرق عليه خط، وتحته زرار رمادي «اطلب». كله على اليمين لأن [[dir="rtl"]].

**ليه كل سطر:**
- [[<!doctype html>]] أول سطر: من غيره المتصفح بيشتغل في «quirks mode» (طريقة قديمة لصفحات التسعينات)، و [[document.compatMode]] بيبقى [[BackCompat]] بدل [[CSS1Compat]].
- [[lang="ar"]] بيقول لقارئ الشاشة يقرا بصوت عربي، و [[dir="rtl"]] بيقلب اتجاه الصفحة كلها.
- [[<meta charset="utf-8">]] لازم ييجي في أول الـ head: من غيره ممكن العربي يطلع رموز غريبة.
- [[<meta name="viewport">]] عشان الموبايل يعرض الصفحة بعرضه الحقيقي بدل ما يصغّر صفحة عرضها 980px.
- [[<main>]] حوالين المحتوى: ده المكان اللي قارئ الشاشة بينط له على طول.
- [[width="120" height="120"]] على الصورة: المتصفح بيحجز مكانها قبل ما تحمّل، فالكلام اللي تحتها مبيتنططش.
- [[href="tel:+20225550147"]]: على الموبايل بيفتح الاتصال بالرقم. الرقم في الـ href بالصيغة الدولية من غير مسافات، والمكتوب للناس زي ما تحب.
- [[type="button"]]: زرار مش جوه فورم، فبنقول صراحة إنه مبيبعتش حاجة.

**الغلطات اللي الـ validator و axe مسكوها وأنا بكتب الحل (اتشغّلوا فعلًا):**
- النسخة الأولى كانت الصورة فيها كود الـ SVG مكتوب جوه الـ [[src]] على طول ([[data:image/svg+xml,<svg ...>]]). الـ validator قال: [[Illegal character after "ta:". "<" is not allowed.]] يعني علامة [[<]] ممنوعة جوه الرابط من غير ما تتحوّل لـ [[%3C]]. الحل الأبسط: الصورة في ملف لوحدها.
- ومن غير [[<main>]]، axe طلّع [[landmark-one-main]] (الصفحة مفيهاش main) و [[region]] على ٤ عناصر (كلام برّه أي landmark). الـ validator ساكت عن ده لأنه مش غلط في الكتابة، ده غلط في المعنى.

**جرّب الـ alt:** غيّر [[src="logo.svg"]] لـ [[src="logoo.svg"]] واعمل Refresh: مكان الدايرة هيظهر الكلام اللي في الـ alt. وده نفس اللي قارئ الشاشة بيقوله للي مش شايف الصورة.

~~~text الناتج (Chrome، Console)
document.compatMode       "CSS1Compat"
document.characterSet     "UTF-8"
أولاد الـ body             MAIN   وجواه: H1 IMG P P BUTTON
logo.svg موجود             naturalWidth = 120
logoo.svg (اسم غلط)         naturalWidth = 0، ومكانها اتكتب: لوجو المطعم: زيتونة خضرا جوه دايرة
الـ validator               مفيش رسايل
axe                        0 violations (كانوا 2 قبل <main>)
~~~` },
        { lvl: 'صغير', dir: "coffee-404", t: R`صفحة 404 لمتجر قهوة`, what: R`صفحة «الصفحة دي مش موجودة» لمتجر قهوة متخيل: عنوان، وجملة فيها كود الطلب بالإنجليزي جوه [[<bdi>]]، ولينك للرئيسية، ولينك للمنيو، وزرار [[type="button"]] «ارجع لورا» بيعمل [[history.back()]]. من دروس «lang و dir» و «a و button».`, done: R`بالكيبورد بس (Tab و Enter) توصل للتلاتة وتشغّلهم، والكود الإنجليزي بيتعرض بنفس ترتيب الحروف اللي كتبتها، وتاب Accessibility بيقول إن الزرار role [[button]] واللينكات role [[link]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة مش موجودة: بُن الصباح</title>
</head>
<body>
<main>
  <h1>الصفحة دي مش موجودة</h1>
  <p>دوّرنا على الطلب رقم <bdi>2048-B</bdi> ومالقيناهوش. يمكن الرابط اتكتب غلط، أو الطلب اتمسح.</p>
  <p><a href="index.html">الرئيسية</a> · <a href="menu.html">المنيو</a></p>
  <button type="button" id="back">ارجع لورا</button>
</main>
<script>
  document.getElementById('back').addEventListener('click', () => history.back());
</script>
</body>
</html>
~~~

~~~view 260 320 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة مش موجودة: بُن الصباح</title>
</head>
<body>
<main>
  <h1>الصفحة دي مش موجودة</h1>
  <p>دوّرنا على الطلب رقم <bdi>2048-B</bdi> ومالقيناهوش. يمكن الرابط اتكتب غلط، أو الطلب اتمسح.</p>
  <p><a href="index.html">الرئيسية</a> · <a href="menu.html">المنيو</a></p>
  <button type="button" id="back">ارجع لورا</button>
</main>
<script>
  document.getElementById('back').addEventListener('click', () => history.back());
</script>
</body>
</html>
~~~

**هتشوف إيه:** عنوان «الصفحة دي مش موجودة»، وتحته جملة فيها رقم الطلب [[2048-B]] مكتوب صح من الشمال لليمين، وسطر فيه لينكين بينهم نقطة، وزرار «ارجع لورا».

**ليه** [[<bdi>]] **هنا بالذات:** الكلام العربي اتجاهه يمين لشمال، والكود الإنجليزي جواه شمال ليمين. المتصفح بيرتّب الحروف بقواعد اسمها bidi، والأرقام والشَرطة ملهمش اتجاه لوحدهم، فبياخدوا اتجاه اللي حواليهم. قسته في Chrome: نفس الجملة من غير [[<bdi>]] الكود بيظهر [[B-2048]]، ومعاه [[2048-B]]. وجرّبت أكواد تانية:

| الكود | من غير bdi بيظهر | مع bdi |
|---|---|---|
| [[2048-B]] | [[B-2048]] | [[2048-B]] |
| [[#2048]] | [[2048#]] | [[#2048]] |
| [[ORD-2048!]] | [[!ORD-2048]] | [[ORD-2048!]] |
| [[B-2048]] | [[B-2048]] | [[B-2048]] |

يعني المشكلة بتظهر لما الكلام الإنجليزي يبدأ برقم أو يخلص بعلامة. ومش هتعرف الكود اللي جاي من قاعدة البيانات شكله إيه، فأي كلام جاي من برّه (اسم مستخدم، كود طلب، اسم ملف) حطه في [[<bdi>]].

**الزرار:** [[history.back()]] بترجّعك للصفحة اللي كنت فيها، زي زرار الرجوع في المتصفح. والسكربت بيستخدم [[addEventListener]] مش [[onclick="..."]] جوه الـ HTML، عشان الكود يفضل في مكان واحد (ده هيتشرح في كورس JavaScript). و [[type="button"]] عشان ده زرار بيعمل حاجة، مش لينك بيودّي لصفحة.

**الغلطة الشائعة:** تعمل «ارجع لورا» كـ [[<a href="#">]]. ده بيبان لقارئ الشاشة «link» وهو مش بيودّي لأي مكان، و Enter بس اللي بتشغّله (المسافة لأ).

~~~text الناتج (Chrome)
Tab 1   <a href="index.html">الرئيسية</a>
Tab 2   <a href="menu.html">المنيو</a>
Tab 3   <button type="button" id="back">ارجع لورا</button>
ضغطة الزرار بعد ما جيت من صفحة المنيو    رجّعني لـ zaytouna-menu/index.html

شجرة الـ accessibility:
  main
    heading "الصفحة دي مش موجودة" level=1
    link "الرئيسية"   link "المنيو"
    button "ارجع لورا"
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'متوسط', dir: "smile-clinic", t: R`صفحة هبوط لعيادة أسنان متخيلة`, what: R`صفحة طويلة من ٧ أجزاء (الهيرو، والخدمات، والخطوات، والأطبا، والأسعار، والأسئلة، والتواصل)، كل جزء [[<section id="...">]] وجواه h2، و nav في الـ header فيه لينك لكل جزء بـ [[href="#prices"]]، وآراء العملا بـ [[<figure>]] و [[<blockquote>]] و [[<figcaption>]]، وصور بـ width و height و lazy للي تحت. ده نفس هيكل أي landing page حقيقية. من دروس الوحدة كلها.`, done: R`شجرة الـ accessibility فيها banner و navigation و main و contentinfo، و h1 واحد في الهيرو و h2 لكل جزء من الـ ٦ التانيين من غير ما تنط مستوى، وكل لينك في الـ nav بيودّي للجزء بتاعه، و axe DevTools بيطلّع صفر violations. وفي Network (و Disable cache متعلّم): صورة الهيرو بتتحمّل على طول، ولو حطيت مؤقتًا [[<div style="height: 3000px"></div>]] قبل قسم الأطبا صورهم مش بتتحمّل لحد ما تنزل لها.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة لطب الأسنان</title>
</head>
<body>
<header>
  <p><a href="#top">عيادة ابتسامة</a></p>
  <nav aria-label="أجزاء الصفحة">
    <ul>
      <li><a href="#services">الخدمات</a></li>
      <li><a href="#steps">الخطوات</a></li>
      <li><a href="#doctors">الأطبا</a></li>
      <li><a href="#prices">الأسعار</a></li>
      <li><a href="#faq">الأسئلة</a></li>
      <li><a href="#contact">التواصل</a></li>
    </ul>
  </nav>
</header>

<main>
  <section id="top">
    <h1>سنانك في إيد أمينة</h1>
    <p>كشف وتنضيف وتقويم في مكان واحد، ومن غير ما تستنى بالساعات.</p>
    <img src="img/hero.svg" alt="رسم لسنة بيضا مبتسمة" width="800" height="400">
    <p><a href="#contact">احجز كشف</a></p>
  </section>

  <section id="services">
    <h2>الخدمات</h2>
    <ul>
      <li>كشف وأشعة بانوراما</li>
      <li>تنضيف وتلميع</li>
      <li>حشو وعلاج عصب</li>
      <li>تقويم شفاف</li>
    </ul>
  </section>

  <section id="steps">
    <h2>الخطوات</h2>
    <ol>
      <li>احجز من الفورم أو بالتليفون.</li>
      <li>الكشف والأشعة في نفس الزيارة.</li>
      <li>خطة علاج مكتوبة بالسعر قبل ما نبدأ.</li>
    </ol>
  </section>

  <section id="doctors">
    <h2>الأطبا</h2>
    <article>
      <h3>د. سلمى فؤاد</h3>
      <img src="img/doctor.svg" alt="صورة د. سلمى فؤاد" width="200" height="200" loading="lazy">
      <p>تقويم الأسنان، ١٢ سنة خبرة.</p>
    </article>
    <article>
      <h3>د. كريم ناجي</h3>
      <img src="img/doctor.svg" alt="صورة د. كريم ناجي" width="200" height="200" loading="lazy">
      <p>علاج العصب والحشو التجميلي.</p>
    </article>
    <figure>
      <blockquote>
        <p>أول مرة أروح لدكتور سنان ومخافش. شرحولي كل خطوة قبل ما يعملوها.</p>
      </blockquote>
      <figcaption>منى، من المرضى</figcaption>
    </figure>
  </section>

  <section id="prices">
    <h2>الأسعار</h2>
    <ul>
      <li>الكشف والأشعة: ٣٠٠ جنيه</li>
      <li>التنضيف: ٥٠٠ جنيه</li>
      <li>الحشو: من ٦٠٠ جنيه</li>
    </ul>
  </section>

  <section id="faq">
    <h2>الأسئلة</h2>
    <details>
      <summary>الكشف بياخد قد إيه؟</summary>
      <p>حوالي نص ساعة، بالأشعة.</p>
    </details>
    <details>
      <summary>بتقبلوا التأمين؟</summary>
      <p>أيوه، مع أغلب شركات التأمين الطبي.</p>
    </details>
  </section>

  <section id="contact">
    <h2>التواصل</h2>
    <p>التليفون: <a href="tel:+20225550199">0225550199</a></p>
    <address>١٤ شارع النخيل، الدور التاني</address>
  </section>
</main>

<footer>
  <p><small>© ٢٠٢٦ عيادة ابتسامة (اسم متخيل)</small></p>
</footer>
</body>
</html>
~~~

واعمل فولدر [[img]] جنب [[index.html]] وجواه ملفين SVG:

~~~xml img/hero.svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="800" height="400" fill="#e0f2fe"/><path d="M340 120c-40 0-60 30-60 70 0 60 30 130 50 130s20-60 40-60 20 60 40 60 50-70 50-130c0-40-20-70-60-70-20 0-30 10-30 10s-10-10-30-10z" fill="#fff" stroke="#0369a1" stroke-width="8"/></svg>
~~~

~~~xml img/doctor.svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0fdfa"/><circle cx="100" cy="80" r="40" fill="#99f6e4"/><path d="M30 200c0-50 30-75 70-75s70 25 70 75z" fill="#14b8a6"/></svg>
~~~

~~~view 600 700 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة لطب الأسنان</title>
</head>
<body>
<header>
  <p><a href="#top">عيادة ابتسامة</a></p>
  <nav aria-label="أجزاء الصفحة">
    <ul>
      <li><a href="#services">الخدمات</a></li>
      <li><a href="#steps">الخطوات</a></li>
      <li><a href="#doctors">الأطبا</a></li>
      <li><a href="#prices">الأسعار</a></li>
      <li><a href="#faq">الأسئلة</a></li>
      <li><a href="#contact">التواصل</a></li>
    </ul>
  </nav>
</header>

<main>
  <section id="top">
    <h1>سنانك في إيد أمينة</h1>
    <p>كشف وتنضيف وتقويم في مكان واحد، ومن غير ما تستنى بالساعات.</p>
    <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22400%22%20viewBox%3D%220%200%20800%20400%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23e0f2fe%22%2F%3E%3Cpath%20d%3D%22M340%20120c-40%200-60%2030-60%2070%200%2060%2030%20130%2050%20130s20-60%2040-60%2020%2060%2040%2060%2050-70%2050-130c0-40-20-70-60-70-20%200-30%2010-30%2010s-10-10-30-10z%22%20fill%3D%22%23fff%22%20stroke%3D%22%230369a1%22%20stroke-width%3D%228%22%2F%3E%3C%2Fsvg%3E" alt="رسم لسنة بيضا مبتسمة" width="800" height="400">
    <p><a href="#contact">احجز كشف</a></p>
  </section>

  <section id="services">
    <h2>الخدمات</h2>
    <ul>
      <li>كشف وأشعة بانوراما</li>
      <li>تنضيف وتلميع</li>
      <li>حشو وعلاج عصب</li>
      <li>تقويم شفاف</li>
    </ul>
  </section>

  <section id="steps">
    <h2>الخطوات</h2>
    <ol>
      <li>احجز من الفورم أو بالتليفون.</li>
      <li>الكشف والأشعة في نفس الزيارة.</li>
      <li>خطة علاج مكتوبة بالسعر قبل ما نبدأ.</li>
    </ol>
  </section>

  <section id="doctors">
    <h2>الأطبا</h2>
    <article>
      <h3>د. سلمى فؤاد</h3>
      <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0fdfa%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2280%22%20r%3D%2240%22%20fill%3D%22%2399f6e4%22%2F%3E%3Cpath%20d%3D%22M30%20200c0-50%2030-75%2070-75s70%2025%2070%2075z%22%20fill%3D%22%2314b8a6%22%2F%3E%3C%2Fsvg%3E" alt="صورة د. سلمى فؤاد" width="200" height="200" loading="lazy">
      <p>تقويم الأسنان، ١٢ سنة خبرة.</p>
    </article>
    <article>
      <h3>د. كريم ناجي</h3>
      <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0fdfa%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2280%22%20r%3D%2240%22%20fill%3D%22%2399f6e4%22%2F%3E%3Cpath%20d%3D%22M30%20200c0-50%2030-75%2070-75s70%2025%2070%2075z%22%20fill%3D%22%2314b8a6%22%2F%3E%3C%2Fsvg%3E" alt="صورة د. كريم ناجي" width="200" height="200" loading="lazy">
      <p>علاج العصب والحشو التجميلي.</p>
    </article>
    <figure>
      <blockquote>
        <p>أول مرة أروح لدكتور سنان ومخافش. شرحولي كل خطوة قبل ما يعملوها.</p>
      </blockquote>
      <figcaption>منى، من المرضى</figcaption>
    </figure>
  </section>

  <section id="prices">
    <h2>الأسعار</h2>
    <ul>
      <li>الكشف والأشعة: ٣٠٠ جنيه</li>
      <li>التنضيف: ٥٠٠ جنيه</li>
      <li>الحشو: من ٦٠٠ جنيه</li>
    </ul>
  </section>

  <section id="faq">
    <h2>الأسئلة</h2>
    <details>
      <summary>الكشف بياخد قد إيه؟</summary>
      <p>حوالي نص ساعة، بالأشعة.</p>
    </details>
    <details>
      <summary>بتقبلوا التأمين؟</summary>
      <p>أيوه، مع أغلب شركات التأمين الطبي.</p>
    </details>
  </section>

  <section id="contact">
    <h2>التواصل</h2>
    <p>التليفون: <a href="tel:+20225550199">0225550199</a></p>
    <address>١٤ شارع النخيل، الدور التاني</address>
  </section>
</main>

<footer>
  <p><small>© ٢٠٢٦ عيادة ابتسامة (اسم متخيل)</small></p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** فوق اسم العيادة لينك، وتحته قايمة فيها ٦ لينكات. بعدها العنوان الكبير «سنانك في إيد أمينة» ورسمة سنة بيضا على خلفية لبني، وبعدين الأجزاء ورا بعض كل واحد بعنوان: الخدمات (نقط)، والخطوات (أرقام)، والأطبا بصورهم، والاقتباس مزحوح لجوه، والأسعار، والأسئلة بتتفتح بالضغط، والعنوان مايل. دوس على «الأسعار» فوق والصفحة هتنزل للجزء ده.

**الهيكل:** [[<header>]] فيه الاسم والـ [[<nav>]]، وبعده [[<main>]] فيه ٧ [[<section>]] كل واحد ليه [[id]]، وفي الآخر [[<footer>]]. الهيرو فيه [[<h1>]] الوحيد، والـ ٦ التانيين كل واحد [[<h2>]]، وكل دكتور [[<article>]] بـ [[<h3>]]: المستويات ورا بعض من غير ما ننط. والـ nav عليه [[aria-label]] عشان لو الصفحة فيها أكتر من nav قارئ الشاشة يفرّق بينهم.

**اللينك للجزء:** [[href="#prices"]] بيدوّر على العنصر اللي [[id="prices"]] وينزل له. والـ [[id]] لازم يبقى فريد في الصفحة.

**الصور:** صورة الهيرو من غير [[loading="lazy"]] لأنها أول حاجة بتبان، ولو أجّلتها الصفحة هتظهر من غيرها. صور الأطبا عليها [[loading="lazy"]].

**فخ قسته وانا بحل:** في Network هتلاقي [[doctor.svg]] اتحمّل على طول مع الصفحة، مش لما تنزل له. ده مش غلط: Chrome بيحمّل الصورة الـ lazy قبل ما توصلها بمسافة عشان تكون جاهزة. قست المسافة دي: صورة على بعد 1200px تحت الشاشة اتحمّلت على طول، و 1300px لأ (وثايق Chrome بتقول 1250px على النت السريع وأكتر على البطيء). صور الأطبا هنا على بعد 284px بس تحت الشاشة. عشان تشوف lazy شغال، حط مؤقتًا [[<div style="height: 3000px"></div>]] قبل قسم الأطبا: الصورة مش هتتحمّل لحد ما تنزل.

**وفخ تاني:** لو فتحت الصفحة وبعدين عملت Refresh عادي، الصورة بتيجي من الذاكرة فهتبان «اتحمّلت» حتى مع الـ div الطويل. علّم على **Disable cache** في Network، أو افتح الصفحة في تاب جديد.

~~~text الناتج (Chrome على 1280×800)
h1: 1   h2: الخدمات، الخطوات، الأطبا، الأسعار، الأسئلة، التواصل (6)
sections: top services steps doctors prices faq contact
كل لينكات الـ nav ليها id موجود: 6 من 6
landmarks: header nav main footer   axe: 0 violations   الـ validator: مفيش رسايل

الصفحة زي ما هي:       hero.svg اتحمّل، doctor.svg اتحمّل (الصورة top = 1084، والشاشة 800)
مع div طوله 3000px:    قبل النزول: hero.svg بس   بعد النزول للأطبا: الصورتين اتحمّلوا
~~~` },
        { lvl: 'متوسط', dir: "abtal-gym", t: R`صفحة تسجيل في جيم متخيل`, what: R`فورم اشتراك لـ «جيم الأبطال»: الاسم، والموبايل ([[type="tel"]] و [[autocomplete="tel"]] و [[dir="ltr"]])، والإيميل، وكلمة السر ([[new-password]] و minlength)، و checkbox الشروط، وزرار إرسال، وتحته لينك «عندك حساب؟ ادخل». كل حقل ليه label مربوط. من دروس «form و label» و «a و button».`, done: R`الضغط على أي label بيركّز في الحقل بتاعه، وإرسال الفورم فاضي بيوقف عند أول حقل برسالة المتصفح، ولما تملاه كله و [[method="get"]] الـ URL بيبان فيه كل [[name]] بقيمته ومفيهوش حقل من غير name، و Chrome بيعرض يملا الاسم والإيميل لوحده.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشترك في جيم الأبطال</title>
</head>
<body>
<main>
  <h1>اشترك في جيم الأبطال</h1>
  <form method="get">
    <p>
      <label for="name">الاسم بالكامل</label><br>
      <input id="name" name="name" autocomplete="name" required>
    </p>
    <p>
      <label for="phone">الموبايل</label><br>
      <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" required>
    </p>
    <p>
      <label for="email">الإيميل</label><br>
      <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required>
    </p>
    <p>
      <label for="password">كلمة السر (٨ حروف على الأقل)</label><br>
      <input id="password" name="password" type="password" autocomplete="new-password" minlength="8" required>
    </p>
    <p>
      <input id="terms" name="terms" type="checkbox" value="yes" required>
      <label for="terms">موافق على شروط الاشتراك</label>
    </p>
    <button type="submit">اشترك</button>
  </form>
  <p>عندك حساب؟ <a href="login.html">ادخل</a></p>
</main>
</body>
</html>
~~~

~~~view 470 520 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشترك في جيم الأبطال</title>
</head>
<body>
<main>
  <h1>اشترك في جيم الأبطال</h1>
  <form method="get">
    <p>
      <label for="name">الاسم بالكامل</label><br>
      <input id="name" name="name" autocomplete="name" required>
    </p>
    <p>
      <label for="phone">الموبايل</label><br>
      <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" required>
    </p>
    <p>
      <label for="email">الإيميل</label><br>
      <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required>
    </p>
    <p>
      <label for="password">كلمة السر (٨ حروف على الأقل)</label><br>
      <input id="password" name="password" type="password" autocomplete="new-password" minlength="8" required>
    </p>
    <p>
      <input id="terms" name="terms" type="checkbox" value="yes" required>
      <label for="terms">موافق على شروط الاشتراك</label>
    </p>
    <button type="submit">اشترك</button>
  </form>
  <p>عندك حساب؟ <a href="login.html">ادخل</a></p>
</main>
</body>
</html>
~~~

**هتشوف إيه:** عنوان «اشترك في جيم الأبطال» وتحته الحقول ورا بعض، كل واحد فوقه اسمه. حقل الموبايل والإيميل الكلام فيهم بيبدأ من الشمال. وبعدين مربع «موافق على شروط الاشتراك» وزرار «اشترك»، وتحتهم «عندك حساب؟ ادخل».

**ليه كده:**
- كل [[<label for="x">]] مربوط بـ [[<input id="x">]]: الضغط على الكلمة بيركّز في الحقل، وقارئ الشاشة بيقرا الكلمة لما الحقل ياخد focus.
- [[name]] على كل حقل: ده الاسم اللي بيتبعت. الحقل اللي ملوش name مبيتبعتش خالص، حتى لو مليان.
- [[type="tel"]] بيفتح كيبورد أرقام على الموبايل، و [[type="email"]] بيفتح كيبورد فيه [[@]] وكمان بيرفض الإيميل اللي من غير [[@]].
- [[autocomplete]] بيقول للمتصفح الحقل ده إيه، فيقدر يملاه لوحده. و [[new-password]] بيخلي المتصفح يقترح كلمة سر جديدة قوية بدل ما يملا القديمة.
- [[dir="ltr"]] على الموبايل والإيميل لأنهم أرقام وحروف إنجليزي.
- [[required]] على الـ checkbox: مش هيبعت الفورم لو مش متعلّم.
- مفيش [[action]]، فالفورم بيتبعت لنفس الصفحة. كنت كاتب [[action=""]] والـ validator قال: [[Bad value "" for attribute "action" on element "form": Must be non-empty.]]. لو عاوز نفس الصفحة امسح الـ attribute خالص.

**فخ قسته وانا بحل:** [[minlength="8"]] بيمسك اللي **المستخدم كتبه بإيده** بس. لما حطيت [[abc]] في الحقل من الـ Console بـ [[.value = 'abc']] الفورم كان شايفه سليم ورسالة الخطأ فاضية. ولما كتبت [[abc]] بالكيبورد ظهرت الرسالة. فجرّب [[minlength]] بالكتابة، مش من الكود.

**وخلي بالك:** مع [[method="get"]] كلمة السر بتظهر في شريط العنوان. احنا عاملينها كده هنا عشان تشوف الـ names بعينك بس. في موقع حقيقي الفورم ده بيتبعت بـ [[method="post"]] لسيرفر على [[https]].

~~~text الناتج (Chrome)
الضغط على كلمة «الموبايل»                    focus راح لـ #phone
الإرسال والفورم فاضي                         وقف عند #name: "Please fill out this field."
الـ checkbox مش متعلّم                         "Please check this box if you want to proceed."
كتبت abc بالكيبورد في كلمة السر               "Please lengthen this text to 8 characters or more (you are currently using 3 characters)."
حطيت abc من الـ Console                       validationMessage = ""   (minlength مبيشتغلش هنا)
حقول من غير name: 0      كل input ليه label: 5 من 5

بعد الإرسال والفورم مليان:
?name=سارة+علي&phone=01000000000&email=sara@example.com&password=abcd1234&terms=yes
~~~` },
        { lvl: 'كبير', dir: "huroof-library", t: R`موقع مكتبة متخيلة بـ HTML بس (٣ صفحات)`, what: R`موقع «مكتبة الحروف» (اسم متخيل): رئيسية (هيرو، وكتب مختارة كل كتاب [[<article>]]، وآراء القرّاء بـ figure و blockquote)، وصفحة كتاب (صورة الغلاف بـ srcset و sizes، وعنوان إنجليزي جوه [[<bdi>]]، وزرار «احجز نسخة»)، وصفحة تواصل (فورم بـ labels و autocomplete). نفس الـ header والـ nav والـ footer في التلاتة، والـ nav فيه [[aria-current="page"]] على الصفحة الحالية. يجمع الوحدة كلها، ومن غير ولا سطر CSS، عشان تشوف إن الهيكل لوحده بيشتغل.`, done: R`التلات صفحات صفر errors في الـ validator، و axe صفر violations، وتقدر تتنقل في الموقع كله وتبعت الفورم بالكيبورد بس، و [[aria-current]] على لينك الصفحة اللي انت فيها بس، وعلى عرض 360 مفيش scroll أفقي، وفي Network (Disable cache) الغلاف بيتحمّل [[cover-300.svg]] على كمبيوتر كثافته 1 و [[cover-600.svg]] على موبايل كثافته 3 من Device toolbar.`, ext: R`لما توصل لوحدة CSS زوّد تصميم من غير ما تغيّر ولا عنصر في الـ HTML: لو احتجت تغيّر الهيكل عشان التصميم، يبقى الهيكل كان غلط.`, sol: R`**شجرة الملفات:**

~~~text
huroof-library/
├── index.html      الرئيسية
├── book.html       صفحة الكتاب
├── contact.html    التواصل
└── img/
    ├── cover-300.svg
    └── cover-600.svg
~~~

**ترتيب البناء:** اكتب [[index.html]] الأول بالـ header والـ nav والـ footer، وبعدين انسخه لـ [[book.html]] و [[contact.html]] وغيّر الـ [[<title>]] ومكان [[aria-current]] واللي جوه [[<main>]] بس. كده الأجزاء المشتركة متطابقة في التلاتة.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة الحروف</title>
</head>
<body>
<header>
  <p><a href="index.html">مكتبة الحروف</a></p>
  <nav aria-label="الموقع">
    <ul>
      <li><a href="index.html" aria-current="page">الرئيسية</a></li>
      <li><a href="book.html">كتاب الشهر</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>كتب تتقري، مش تتحط على الرف</h1>
  <p>مكتبة صغيرة في الحي، فيها ألفين كتاب وركن للأطفال، والاستعارة ببلاش.</p>

  <section>
    <h2>اخترنالك الشهر ده</h2>
    <article>
      <h3>ليالي البحر</h3>
      <p>رواية عن صياد بيرجع لقريته بعد عشرين سنة.</p>
      <p><a href="book.html">تفاصيل الكتاب</a></p>
    </article>
    <article>
      <h3>مطبخ ستي</h3>
      <p>٨٠ وصفة بيتي مكتوبة زي ما الجدات بيحكوها.</p>
    </article>
    <article>
      <h3>نجوم فوق السطوح</h3>
      <p>كتاب فلك للصغيرين، بالرسومات.</p>
    </article>
  </section>

  <section>
    <h2>القرّاء بيقولوا</h2>
    <figure>
      <blockquote><p>بقيت أعدّي على المكتبة كل يوم بعد الشغل، الكتب نضيفة والمكان هادي.</p></blockquote>
      <figcaption>حسن، عضو من سنة</figcaption>
    </figure>
  </section>
</main>
<footer>
  <p><small>مكتبة الحروف (اسم متخيل) · مفتوحين كل يوم من ١٠ لـ ١٠</small></p>
</footer>
</body>
</html>
~~~

~~~html book.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليالي البحر: مكتبة الحروف</title>
</head>
<body>
<header>
  <p><a href="index.html">مكتبة الحروف</a></p>
  <nav aria-label="الموقع">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="book.html" aria-current="page">كتاب الشهر</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>ليالي البحر</h1>
    <img src="img/cover-300.svg"
         srcset="img/cover-300.svg 300w, img/cover-600.svg 600w"
         sizes="300px"
         width="300" height="450"
         alt="غلاف رواية ليالي البحر: إطار دهبي على خلفية بني">
    <p>الكاتب: يوسف عادل · ٢٤٠ صفحة</p>
    <p>الرواية اتترجمت للإنجليزي باسم <bdi>Nights of the Sea</bdi> سنة ٢٠٢٤.</p>
    <p>صياد بيرجع لقريته بعد عشرين سنة، ويلاقي البحر زي ما هو والناس اتغيرت.</p>
    <button type="button">احجز نسخة</button>
  </article>
</main>
<footer>
  <p><small>مكتبة الحروف (اسم متخيل) · مفتوحين كل يوم من ١٠ لـ ١٠</small></p>
</footer>
</body>
</html>
~~~

~~~html contact.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تواصل: مكتبة الحروف</title>
</head>
<body>
<header>
  <p><a href="index.html">مكتبة الحروف</a></p>
  <nav aria-label="الموقع">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="book.html">كتاب الشهر</a></li>
      <li><a href="contact.html" aria-current="page">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>تواصل معانا</h1>
  <form method="get">
    <p>
      <label for="name">اسمك</label><br>
      <input id="name" name="name" autocomplete="name" required>
    </p>
    <p>
      <label for="email">الإيميل</label><br>
      <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required>
    </p>
    <p>
      <label for="msg">رسالتك</label><br>
      <textarea id="msg" name="msg" rows="4" required></textarea>
    </p>
    <button type="submit">ابعت</button>
  </form>
</main>
<footer>
  <p><small>مكتبة الحروف (اسم متخيل) · مفتوحين كل يوم من ١٠ لـ ١٠</small></p>
</footer>
</body>
</html>
~~~

وفي فولدر [[img]] الغلافين (نفس الرسمة بمقاسين، ومكتوب على كل واحد عرضه عشان تعرف المتصفح اختار أنهي واحد):

~~~xml img/cover-300.svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="#7c2d12"/><rect x="24" y="24" width="252" height="402" fill="none" stroke="#fcd34d" stroke-width="4"/><text x="150" y="225" font-size="28" fill="#fcd34d" text-anchor="middle" font-family="serif">300w</text></svg>
~~~

~~~xml img/cover-600.svg
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><rect width="600" height="900" fill="#7c2d12"/><rect x="48" y="48" width="504" height="804" fill="none" stroke="#fcd34d" stroke-width="8"/><text x="300" y="450" font-size="56" fill="#fcd34d" text-anchor="middle" font-family="serif">600w</text></svg>
~~~

~~~view 560 640 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة الحروف</title>
</head>
<body>
<header>
  <p><a href="index.html">مكتبة الحروف</a></p>
  <nav aria-label="الموقع">
    <ul>
      <li><a href="index.html" aria-current="page">الرئيسية</a></li>
      <li><a href="book.html">كتاب الشهر</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>كتب تتقري، مش تتحط على الرف</h1>
  <p>مكتبة صغيرة في الحي، فيها ألفين كتاب وركن للأطفال، والاستعارة ببلاش.</p>

  <section>
    <h2>اخترنالك الشهر ده</h2>
    <article>
      <h3>ليالي البحر</h3>
      <p>رواية عن صياد بيرجع لقريته بعد عشرين سنة.</p>
      <p><a href="book.html">تفاصيل الكتاب</a></p>
    </article>
    <article>
      <h3>مطبخ ستي</h3>
      <p>٨٠ وصفة بيتي مكتوبة زي ما الجدات بيحكوها.</p>
    </article>
    <article>
      <h3>نجوم فوق السطوح</h3>
      <p>كتاب فلك للصغيرين، بالرسومات.</p>
    </article>
  </section>

  <section>
    <h2>القرّاء بيقولوا</h2>
    <figure>
      <blockquote><p>بقيت أعدّي على المكتبة كل يوم بعد الشغل، الكتب نضيفة والمكان هادي.</p></blockquote>
      <figcaption>حسن، عضو من سنة</figcaption>
    </figure>
  </section>
</main>
<footer>
  <p><small>مكتبة الحروف (اسم متخيل) · مفتوحين كل يوم من ١٠ لـ ١٠</small></p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** في التلات صفحات نفس الحتة اللي فوق (اسم المكتبة وتحته ٣ لينكات) ونفس السطر الصغير تحت. الرئيسية فيها عنوان وفقرة وتلات كتب كل واحد بعنوان صغير، واقتباس من قارئ. صفحة الكتاب فيها الغلاف البني بالإطار الدهبي، والاسم الإنجليزي [[Nights of the Sea]] مكتوب صح جوه الجملة العربي، وزرار «احجز نسخة». والتواصل فورم من ٣ حقول.

**ليه كده:**
- [[aria-current="page"]] على لينك الصفحة الحالية: قارئ الشاشة بيقول «current page»، وبعدين في CSS تقدر تلوّنه بـ selector بيدوّر على الـ attribute ده نفسه، من غير class زيادة (هتشوفه في وحدة الـ selectors).
- كل كتاب [[<article>]] لأنه حتة كاملة لوحدها (تتنقل لصفحة تانية وتفضل مفهومة).
- [[srcset="img/cover-300.svg 300w, img/cover-600.svg 600w"]] بيقول للمتصفح عندي نسختين وعرض كل واحدة، و [[sizes="300px"]] بيقول الصورة هتتعرض بعرض 300px. المتصفح بيضرب 300 في كثافة الشاشة ويختار أصغر ملف يكفي.
- [[<bdi>]] حوالين الاسم الإنجليزي، زي مشروع صفحة 404.

**فخ قسته وانا بحل (وصلّحت بيه المطلوب):** كنت متوقع إن الموبايل هياخد الملف الأصغر. اللي حصل في Chrome: موبايل عرضه 360 وكثافته 3 (زي أغلب الموبايلات) خد [[cover-600.svg]]، وكمبيوتر عرضه 1280 وكثافته 1 خد [[cover-300.svg]]. لأن الصورة بتتعرض 300px على الاتنين، والموبايل محتاج 900 بكسل حقيقي عشان تبان حادة. وكنت كاتب الأول [[sizes="(max-width: 600px) 50vw, 300px"]]، وده كان غلط: من غير CSS الصورة بتتعرض 300px دايمًا بسبب [[width="300"]]. خلّي [[sizes]] يقول الحقيقة، ولما تزوّد CSS يخلي الصورة أصغر على الموبايل غيّر [[sizes]] معاه.

**جرّب Network صح:** في DevTools افتح Device toolbar واختار موبايل (DPR 3)، وعلّم Disable cache، واعمل Refresh: هتلاقي [[cover-600.svg]]. ارجع لعرض الكمبيوتر و Refresh: [[cover-300.svg]].

~~~text الناتج (Chrome)
                     aria-current    scroll أفقي على 360    axe     الـ validator
index.html           الرئيسية         لأ                     0       مفيش رسايل
book.html            كتاب الشهر       لأ                     0       مفيش رسايل
contact.html         تواصل            لأ                     0       مفيش رسايل
(contact.html كان فيها action="" والـ validator رفضها، واتشالت)

غلاف book.html:
  360 × DPR 3 (موبايل)     cover-600.svg   معروض 300px
  1280 × DPR 1 (كمبيوتر)   cover-300.svg   معروض 300px
landmarks في التلاتة: header nav main footer
~~~` },
        { lvl: 'فكرة', dir: "my-portfolio", t: R`صفحتك انت: بورتفوليو HTML`, what: R`صفحة عنك: مين انت، وشغلك (كل مشروع article بعنوان ولينك)، والمهارات في قايمة، وتواصل (إيميل بـ mailto وفورم صغير). انت اللي بتختار الأجزاء وترتيبها.`, done: R`الـ validator و axe نضاف، وفيه h1 واحد، وكل لينك خارجي عليه [[rel="noopener noreferrer"]]، وواحد صاحبك فتحها من الموبايل وقدر يبعتلك رسالة.`, ext: R`زوّد نسخة إنجليزي بـ [[lang="en" dir="ltr"]] ولينك بين النسختين بـ [[hreflang]]، وارفعها على GitHub Pages برابط حقيقي.`, sol: R`ده نسخة نموذجية لواحدة متخيلة اسمها «نور حسام» عشان تشوف شكل الحل. صفحتك انت هتبقى بكلامك وشغلك ولينكاتك.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نور حسام: مطوّرة واجهات</title>
</head>
<body>
<header>
  <nav aria-label="الصفحة">
    <ul>
      <li><a href="#work">شغلي</a></li>
      <li><a href="#skills">المهارات</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h1>نور حسام</h1>
    <p>بعمل صفحات ويب سريعة وسهلة لأي حد، حتى اللي بيستخدم قارئ شاشة. بتعلّم HTML و CSS من ٣ شهور.</p>
  </section>

  <section id="work">
    <h2>شغلي</h2>
    <article>
      <h3>منيو مطعم الزيتونة</h3>
      <p>صفحة منيو بـ HTML بس، صفر errors في الـ validator.</p>
      <p><a href="https://example.com/zaytouna" rel="noopener noreferrer" target="_blank">شوف الصفحة</a></p>
    </article>
    <article>
      <h3>عيادة ابتسامة</h3>
      <p>صفحة هبوط من ٧ أجزاء، و nav بيودّي لكل جزء.</p>
      <p><a href="https://example.com/smile" rel="noopener noreferrer" target="_blank">شوف الصفحة</a></p>
    </article>
  </section>

  <section id="skills">
    <h2>المهارات</h2>
    <ul>
      <li>HTML بالمعنى الصح (landmarks و headings)</li>
      <li>فورم بـ labels و validation المتصفح</li>
      <li>الترمنال و Git</li>
    </ul>
  </section>

  <section id="contact">
    <h2>تواصل</h2>
    <p>ابعتلي على <a href="mailto:nour@example.com">nour@example.com</a> أو من الفورم:</p>
    <form action="mailto:nour@example.com" method="post" enctype="text/plain">
      <p>
        <label for="from">إيميلك</label><br>
        <input id="from" name="from" type="email" autocomplete="email" dir="ltr" required>
      </p>
      <p>
        <label for="msg">الرسالة</label><br>
        <textarea id="msg" name="msg" rows="4" required></textarea>
      </p>
      <button type="submit">ابعت</button>
    </form>
  </section>
</main>

<footer>
  <p><small>© ٢٠٢٦ نور حسام (اسم متخيل)</small></p>
</footer>
</body>
</html>
~~~

~~~view 620 760 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نور حسام: مطوّرة واجهات</title>
</head>
<body>
<header>
  <nav aria-label="الصفحة">
    <ul>
      <li><a href="#work">شغلي</a></li>
      <li><a href="#skills">المهارات</a></li>
      <li><a href="#contact">تواصل</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h1>نور حسام</h1>
    <p>بعمل صفحات ويب سريعة وسهلة لأي حد، حتى اللي بيستخدم قارئ شاشة. بتعلّم HTML و CSS من ٣ شهور.</p>
  </section>

  <section id="work">
    <h2>شغلي</h2>
    <article>
      <h3>منيو مطعم الزيتونة</h3>
      <p>صفحة منيو بـ HTML بس، صفر errors في الـ validator.</p>
      <p><a href="https://example.com/zaytouna" rel="noopener noreferrer" target="_blank">شوف الصفحة</a></p>
    </article>
    <article>
      <h3>عيادة ابتسامة</h3>
      <p>صفحة هبوط من ٧ أجزاء، و nav بيودّي لكل جزء.</p>
      <p><a href="https://example.com/smile" rel="noopener noreferrer" target="_blank">شوف الصفحة</a></p>
    </article>
  </section>

  <section id="skills">
    <h2>المهارات</h2>
    <ul>
      <li>HTML بالمعنى الصح (landmarks و headings)</li>
      <li>فورم بـ labels و validation المتصفح</li>
      <li>الترمنال و Git</li>
    </ul>
  </section>

  <section id="contact">
    <h2>تواصل</h2>
    <p>ابعتلي على <a href="mailto:nour@example.com">nour@example.com</a> أو من الفورم:</p>
    <form action="mailto:nour@example.com" method="post" enctype="text/plain">
      <p>
        <label for="from">إيميلك</label><br>
        <input id="from" name="from" type="email" autocomplete="email" dir="ltr" required>
      </p>
      <p>
        <label for="msg">الرسالة</label><br>
        <textarea id="msg" name="msg" rows="4" required></textarea>
      </p>
      <button type="submit">ابعت</button>
    </form>
  </section>
</main>

<footer>
  <p><small>© ٢٠٢٦ نور حسام (اسم متخيل)</small></p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:** ٣ لينكات فوق (شغلي، المهارات، تواصل)، وبعدين الاسم كبير وجملة عنها، وجزء «شغلي» فيه مشروعين كل واحد بعنوان صغير ولينك «شوف الصفحة»، والمهارات نقط، وفي الآخر إيميل لينك وفورم صغير.

**ليه اخترت الترتيب ده:** اللي بيفتح بورتفوليو (حد بيدوّر على مطوّر) عاوز يعرف ٣ حاجات بسرعة: انت مين، وعملت إيه، وإزاي يكلّمك. فدول هما الـ ٣ أجزاء، والمشاريع قبل المهارات لأن الشغل اللي يتشاف بيقنع أكتر من لستة كلمات. و «شغلي» فيه المشاريع اللي عملتها في الوحدة دي فعلًا.

**التفاصيل:**
- كل مشروع [[<article>]] بـ [[<h3>]]، تحت [[<h2>]] «شغلي».
- اللينكات اللي برّه الموقع عليها [[target="_blank"]] (تفتح في تاب جديد) و [[rel="noopener noreferrer"]]: [[noopener]] بيمنع الصفحة التانية تتحكم في التاب بتاعك من [[window.opener]]، و [[noreferrer]] مبيقولهاش انت جاي منين. المتصفحات الجديدة بتعمل noopener لوحدها مع [[_blank]]، بس كتابتها بتضمن ده في أي متصفح.
- [[mailto:]] بيفتح برنامج الإيميل. والفورم [[action="mailto:..."]] أبسط حاجة من غير سيرفر، بس بيعتمد إن الزائر عنده برنامج إيميل متظبط على جهازه. في وحدة الفورم هتشوف إزاي تبعته لخدمة بدل كده.
- الإيميل والدومين [[example.com]]: دومين محجوز للأمثلة. في صفحتك حط بتوعك.

~~~text الناتج (Chrome)
h1: 1   landmarks: header nav main footer
اللينكات الخارجية: 2، الاتنين عليهم rel="noopener noreferrer"
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
      ],
      pre: [{ to: "start", why: R`لو أول مرة تفتح ترمنال أو تعمل فولدر وملف`}],
      l: 1,
      n: "الصفحة شجرة عناصر، وكل عنصر بيقول للمتصفح ولقارئ الشاشة ولجوجل هو إيه",
      items: [
        {
          cmd: "مقدمة HTML والـ Tags",
          ref: [
            { t: "MDN: Basic HTML syntax", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax" },
            { t: "WHATWG: the p element", url: "https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element" },
            { t: "MDN: <p>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p" },
            { t: "WHATWG: alt attribute", url: "https://html.spec.whatwg.org/multipage/image-maps.html#attr-area-alt" },
            { t: "WHATWG: charset attribute", url: "https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-charset" },
            { t: "WHATWG: href attribute", url: "https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href" },
            { t: "WHATWG: placeholder attribute", url: "https://html.spec.whatwg.org/multipage/input.html#attr-input-placeholder" },
            { t: "WHATWG: src attribute", url: "https://html.spec.whatwg.org/multipage/media.html#attr-media-src" },
            { t: "MDN: <input type=\"button\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/button" },
            { t: "MDN: <input type=\"text\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/text" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** السطر ده القفلات فيه متلخبطة: [[<p>أهلًا <b>يا <i>صاحبي</b></i> وبس</p>]]. قبل ما تفتحه اكتب الشجرة اللي تتوقّع المتصفح يبنيها، وبعدين افتحه وقارن بناتج [[document.querySelector('p').innerHTML]] في الـ Console.`, done: R`Chrome رجّع [[أهلًا <b>يا <i>صاحبي</i></b> وبس]]: صلّحها لوحده وقفل الـ i جوه الـ b من غير أي error. وفهمت إن «شكلها سليم» مش معناه «الكود سليم».`, sol: R`احفظ السطر ده في [[predict.html]] وافتحه:

~~~live 90 اللي المتصفح رسمه
<p>أهلًا <b>يا <i>صاحبي</b></i> وبس</p>
~~~

والتوقّع المكتوب قبل الفتح: العنصر [[b]] جواه الكلمة «يا» والعنصر [[i]]، و [[i]] جواه «صاحبي»، وبعدين «وبس» برّه الاتنين.

~~~text الشجرة اللي المتصفح بيبنيها
p
├── "أهلًا "
├── b
│   ├── "يا "
│   └── i
│       └── "صاحبي"
└── " وبس"
~~~

**ليه كده:** الـ HTML مش بيقف عند الغلط زي JavaScript. المعيار نفسه كاتب خطوات لتصليح القفلات المتلخبطة: لما المتصفح يقابل [[</b>]] والـ [[i]] لسه مفتوحة، بيقفل الـ i الأول وبعدين الـ b. وبعدها لما يوصل لـ [[</i>]] يلاقي مفيش i مفتوحة، فبيتجاهلها.

**الغلطة الشائعة:** تعتبر إن الصفحة طالما ظهرت يبقى الكود سليم. المتصفح صلّح الغلطة في صمت، فالشجرة في Elements مش هي الملف اللي كتبته، و Console مفيهوش ولا سطر. الفحص الحقيقي هو الـ validator.

~~~text الناتج
document.querySelector('p').innerHTML
أهلًا <b>يا <i>صاحبي</i></b> وبس

أخطاء في الـ Console: 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت تعريف لـ «مكتبة النور» (اسم متخيل) بـ ٦ عناصر بس: h1 بالاسم، وفقرة بالمواعيد، ولينك لصفحة الكتب، وصورة لوجو ليها alt، و input للبحث بـ placeholder، وزرار «دوّر». من غير CSS.`, done: R`في Elements الـ body فيه ٦ أولاد بنفس الترتيب، و h1 و p كل واحد في سطر لوحده، والأربعة التانيين جنب بعض في سطر واحد (inline)، ولو غيّرت اسم ملف اللوجو غلط الـ alt بيظهر مكانه.`, sol: R`~~~html
<h1>مكتبة النور</h1>
<p>مفتوحين كل يوم من ١٠ الصبح لـ ١٠ بالليل.</p>
<a href="books.html">شوف الكتب</a>
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><circle cx='24' cy='24' r='24' fill='teal'/></svg>" alt="لوجو مكتبة النور" width="48" height="48">
<input type="search" placeholder="اسم الكتاب" aria-label="اسم الكتاب">
<button type="button">دوّر</button>
~~~

**كل سطر بيعمل إيه:**

- [[h1]] و [[p]] عناصر block: كل واحد بياخد سطر لوحده بعرض الصفحة كله.
- [[a]] و [[img]] و [[input]] و [[button]] عناصر inline: بيقفوا جنب بعض طالما فيه مكان.
- الـ [[alt]] هو الكلام اللي بيظهر لو الصورة ماتحمّلتش، واللي قارئ الشاشة بيقوله.
- الـ [[src]] هنا صورة مكتوبة جوه الملف نفسه (data URL) عشان الصفحة تشتغل من غير ما تجهّز ملف. في مشروعك هتكتب [[logo.png]].
- الـ [[aria-label]] على الحقل عشان مفيهوش label ظاهر، و placeholder لوحده مش اسم للحقل.

**الغلطة الشائعة:** تلف الأربعة في [[<div>]] أو تحط [[<br>]] بينهم عشان «ترتبهم»، والتمرين قايل ٦ عناصر بس. والترتيب هنا جاي من نوع العنصر نفسه من غير أي CSS.

~~~text الناتج
عدد أولاد الـ body: 6  الترتيب: h1 p a img input button
منتصف كل عنصر من فوق (بالـ px): 27 , 75 , 143 , 124 , 144 , 144
h1 و p في سطرين لوحدهم، والأربعة التانيين على نفس السطر (الصورة أطول فمنتصفها أعلى شوية)

بعد ما غيّرت الـ src لاسم ملف مش موجود:
عرض الصورة بقى 48px وارتفاعها 48px، والظاهر مكانها: لوجو مكتبة النور
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده «شغال» بس فيه غلطتين: [[<a href=/products?sort=new&page=2>المنتجات<a>]] وبعده [[<img src=logo.png alt=لوجو المكتبة>]]. افتحه واعرف الغلطتين من Elements قبل ما تصلّح.`, done: R`لقيت إن [[img.alt]] طلع [[لوجو]] بس، والكلمة التانية بقت attribute اسمه [[المكتبة]] (لأن القيمة اللي فيها مسافة لازم تبقى بين علامتين تنصيص)، وإن [[<a>]] التانية (بدل [[</a>]]) فتحت لينك فاضي لفّ كل اللي بعده في الصفحة. بعد التصليح [[alt]] بيرجّع الجملة كاملة، واللي بعد اللينك مبقاش جواه.`, sol: R`الكود بعد التصليح:

~~~html
<a href="/products?sort=new&amp;page=2">المنتجات</a>
<img src="logo.png" alt="لوجو المكتبة">
~~~

**الغلطة الأولى:** القيمة [[لوجو المكتبة]] فيها مسافة ومن غير علامات تنصيص، فالمتصفح بيوقف القيمة عند أول مسافة، والكلمة التانية بتتقري كـ attribute جديد اسمه «المكتبة». عشان كده دايمًا اكتب القيمة بين [[" "]] حتى لو هي كلمة واحدة.

**الغلطة التانية:** [[<a>]] التانية مش قفلة، دي لينك جديد. والمتصفح لما يلاقي a جوه a بيقفل الأولاني ويفتح التاني، وبعدين بيكمّل، فكل اللي بعده في الصفحة بيتلف جوه لينك فاضي.

و [[&amp;]] بدل [[&]] في الـ href مش ضرورية عشان الصفحة تشتغل هنا، بس هي الكتابة السليمة: الـ validator بيطلب كده لو بعد الـ & حروف تتفهم كـ entity.

**الغلطة الشائعة:** تقول «اللينك شغال خلاص» وتقفل. الغلطتين دول مبيبانوش في الشكل، بيبانوا في Elements بس.

~~~text الناتج
قبل التصليح:
img.alt                        = لوجو
الـ attributes بتاعة الصورة       = src , alt , المكتبة
عدد الـ a في الصفحة              = 2
الفقرة اللي بعد الكود جوه لينك؟   = true

بعد التصليح:
img.alt                        = لوجو المكتبة
عدد الـ a في الصفحة              = 1
الفقرة اللي بعد الكود جوه لينك؟   = false
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من صفحة «HTML elements reference» على MDN طلّع ٥ void elements غير [[meta]] و [[img]] و [[input]] (العناصر اللي ملهاش closing tag)، واكتب لكل واحد سطر بيستخدمه.`, done: R`عندك ٥ من [[br]] و [[hr]] و [[link]] و [[source]] و [[wbr]] و [[area]] و [[col]] و [[embed]] و [[track]]، ولما فتحت ملفك في Elements مفيش ولا واحد منهم ليه قفلة ولا جواه حاجة.`, sol: R`دي الخمسة اللي اخترتها، كل واحد في سطر حقيقي:

~~~html
<p>العنوان<br>شارع النصر، الدور التاني</p>
<hr>
<link rel="stylesheet" href="style.css">
<video controls width="320"><source src="intro.mp4" type="video/mp4"></video>
<p>supercalifragilistic<wbr>expialidocious</p>
~~~

| العنصر | بيعمل إيه |
|---|---|
| [[br]] | سطر جديد جوه نفس الفقرة، زي العنوان |
| [[hr]] | فاصل في المعنى بين جزئين |
| [[link]] | بيربط الصفحة بملف، زي ملف CSS |
| [[source]] | بيدّي [[video]] أو [[audio]] أو [[picture]] نسخة من الملف |
| [[wbr]] | مكان مسموح الكلمة الطويلة تتكسر عنده لو السطر ضاق |

**ليه ملهاش closing tag:** العناصر دي مش بتاخد محتوى أصلًا، فمفيش حاجة تتقفل عليها. والباقيين من اللستة: [[area]] و [[col]] و [[embed]] و [[track]].

**الغلطة الشائعة:** تكتب [[</br>]] أو [[<br></br>]]. المتصفح بيحوّل [[</br>]] لـ [[<br>]] تانية، فبيطلعلك سطرين بدل واحد. والـ [[/]] في [[<br/>]] مسموحة ومالهاش أي تأثير.

~~~text الناتج
br        أولاده: 0  outerHTML: <br>
hr        أولاده: 0  outerHTML: <hr>
link      أولاده: 0  outerHTML: <link rel="stylesheet" href="style.css">
source    أولاده: 0  outerHTML: <source src="intro.mp4" type="video/mp4">
wbr       أولاده: 0  outerHTML: <wbr>

والفخ: <p>a</br>b</p> طلّع br عددها 1
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** اكتب لزميل في ٣ سطور الفرق بين tag و element و attribute على المثال ده بالظبط: [[<a href="/menu">المنيو</a>]].`, done: R`الشرح بيقول إن [[<a href="/menu">]] opening tag و [[</a>]] closing tag، والسطر كله element واحد، و [[href="/menu"]] attribute اسمه href وقيمته /menu، وزميلك قدر يطلّع نفس التلاتة من [[<img src="x.png" alt="قطة">]] لوحده.`, sol: R`**إجابة نموذجية بتتبعت لزميلك:**

~~~html
<a href="/menu">المنيو</a>
~~~

~~~text الشرح في ٣ سطور
[<a href="/menu">] ده opening tag، و [</a>] ده closing tag: دول العلامات اللي كتبتها.
السطر كله من أول القفلة لآخرها element واحد: الـ tags والكلام اللي جواهم مع بعض.
[href="/menu"] ده attribute: اسمه href وقيمته /menu، وبيضيف معلومة للعنصر.
~~~

**ليه التفريقة دي مهمة:** الـ tag حاجة بتكتبها في الملف، والـ element حاجة بتعيش في الصفحة (في الـ DOM) وبتقدر تتعامل معاها من JavaScript. والـ attribute بيتكتب في الـ opening tag بس، مش في القفلة.

**تطبيق زميلك على** [[<img src="x.png" alt="قطة">]]: السطر كله opening tag وكمان element كامل، لأن [[img]] مفيهاش closing tag ولا محتوى، وفيها اتنين attributes: [[src]] قيمته [[x.png]] و [[alt]] قيمته [[قطة]].

**الغلطة الشائعة:** تقول «tag» و «element» على نفس الحاجة، فمتعرفش تشرح ليه [[img]] element من غير قفلة.

~~~text الناتج
a.tagName = A
a.getAttribute("href") = /menu
a.textContent = المنيو
img attributes = src=x.png , alt=قطة
img.childNodes.length = 0
~~~` },
          ],
          title: "HTML يعني إيه، وإيه الفرق بين الـ tag والـ element والـ attribute؟",
          desc: R`[[HTML]] اختصار HyperText Markup Language. هي مش لغة برمجة (مفيهاش حسابات ولا if ولا loops)، هي لغة «توصيف»: بتقول للمتصفح كل حتة في الصفحة هي إيه. ده عنوان، ودي فقرة، وده لينك، ودي صورة.

الوحدة الأساسية اسمها element، وأغلب العناصر ليها ٣ أجزاء:
• الـ opening tag: اسم العنصر بين علامتين [[<]] و [[>]]، زي [[<h1>]].
• المحتوى: الكلام (أو العناصر) اللي جواه.
• الـ closing tag: نفس الاسم بس قبله [[/]]، زي [[</h1>]]. الـ [[/]] معناها «هنا العنصر خلص».

يعني [[<h1>أهلًا</h1>]] كله element واحد، و [[<h1>]] لوحده tag. وفيه عناصر ملهاش محتوى ولا closing tag أصلًا (اسمها void elements)، زي [[<img>]] و [[<input>]] و [[<meta>]].

الـ attribute معلومة زيادة بتتكتب جوه الـ opening tag بالشكل ده: [[name="value"]]، الاسم وبعده [[=]] وبعده القيمة بين علامتين تنصيص. مثلًا [[href]] في اللينك هو العنوان اللي هيروحله، و [[src]] في الصورة مسار ملف الصورة، و [[alt]] وصف بيتقري لو الصورة محمّلتش أو لقارئ الشاشة.

الدرس ده الصورة العامة بس. الدرس الجاي ([[<!doctype html>]]) بيبني هيكل الصفحة الكامل، ودروس «a و button» و «img» و «form و label» بيدخلوا في تفاصيل كل عنصر.`,
          example: R`<meta charset="utf-8">
<h1>متجري</h1>
<p>أحسن المنتجات بأسعار كويسة.</p>
<a href="https://example.com/products">شوف المنتجات</a>
<img src="logo.png" alt="لوجو المتجر">
<input type="text" placeholder="دوّر على منتج...">
<button type="button">بحث</button>`,
          try: R`اعمل فولدر جديد وجواه ملف اسمه [[index.html]]، وحط فيه الكود ده واحفظه. افتح الملف في المتصفح (دبل كليك عليه، أو اسحبه جوه نافذة Chrome). بعدين كليك يمين على العنوان واختار Inspect، وشوف العناصر في تاب Elements. آخر حاجة: امسح [[</h1>]] من السطر التاني، واعمل refresh، وشوف إيه اللي حصل للفقرة.`,
          flag: "script",
          deep: {
            why: R`أي صفحة على النت، من مدونة صغيرة لحد فيسبوك، المتصفح بيستلمها HTML في الآخر. الـ CSS بيتطبّق على عناصر HTML، والـ JavaScript بيتعامل مع عناصر HTML. ولو العنصر غلط (div بدل button مثلًا) الصفحة ممكن تبان سليمة بس الكيبورد وقارئ الشاشة وجوجل مش هيفهموها.`,
            how: R`المتصفح بيقرا الملف من فوق لتحت، وكل ما يقابل tag بيعمل عنصر، ويبني منهم شجرة في الذاكرة اسمها DOM (Document Object Model). العنصر اللي جوه عنصر تاني بيبقى «ابنه»: لو حطيت [[<a>]] جوه [[<p>]] يبقى الـ a ابن الـ p. تاب Elements في DevTools بيعرضلك الشجرة دي، مش الملف اللي كتبته بالظبط.

لاحظ إن الملف هنا مفيهوش [[<html>]] ولا [[<head>]] ولا [[<body>]]، ومع ذلك هتلاقيهم في Elements: المتصفح بيضيفهم لوحده. ده تسامح منه، مش معناه إنك تسيبهم (الدرس الجاي). وفيه عناصر بتاخد سطر لوحدها (block) زي [[h1]] و [[p]]، وعناصر بتقف جنب بعض في نفس السطر (inline) زي [[a]] و [[img]] و [[input]] و [[button]]، ودي بتتشرح في درس display.`,
            when: "أول حاجة في أي واجهة. وحتى في React و Next.js انت بتكتب JSX، وده شكله HTML تقريبًا وبيطلع في الآخر نفس العناصر دي.",
            mistakes: R`تنسى الـ closing tag: [[<p>]] من غير [[</p>]] ممكن يعدّي، بس [[<h1>]] من غير قفلة بيخلي كل اللي بعده عنوان كبير. وتنسى علامات التنصيص حوالين قيمة الـ attribute لو فيها مسافة، فالمتصفح ياخد أول كلمة بس. وتنسى [[alt]] في الصور، فقارئ الشاشة ميعرفش الصورة دي إيه.`
          },
          teach: R`## الفكرة في سطرين

الملف ده ٧ سطور، وكل سطر عنصر واحد بيقول للمتصفح «الحتة دي إيه». هنمشي عليهم سطر سطر، وبعدين نشوف المتصفح عمل منهم إيه فعلًا. كل الأرقام اللي تحت جاية من فتح الملف ده في Chrome (headless، نافذة عرضها 800px) وقياس كل عنصر بـ JavaScript.

~~~text index.html
<meta charset="utf-8">
<h1>متجري</h1>
<p>أحسن المنتجات بأسعار كويسة.</p>
<a href="https://example.com/products">شوف المنتجات</a>
<img src="logo.png" alt="لوجو المتجر">
<input type="text" placeholder="دوّر على منتج...">
<button type="button">بحث</button>
~~~

---

## ١. شكل أي element

خد السطر التاني وفكّه:

~~~text تشريح element
<h1>     متجري     </h1>
 │        │          │
 │        │          └─ closing tag: نفس الاسم وقبله /
 │        └──────────── المحتوى
 └───────────────────── opening tag: الاسم بين < و >
~~~

- [[<]] و [[>]]: الحدود اللي بتقول «اللي جوايا اسم عنصر، مش كلام يتعرض».
- [[h1]]: اسم العنصر. h من heading (عنوان)، و 1 يعني أكبر مستوى.
- [[/]] في القفلة: «العنصر خلص هنا».

والـ attribute بيتكتب جوه الـ opening tag بس:

~~~text تشريح attribute
<a   href = "https://example.com/products" >
      │   │   │
      │   │   └─ القيمة بين علامتين تنصيص
      │   └───── = بتربط الاسم بالقيمة
      └───────── اسم الـ attribute
~~~

---

## ٢. السطور واحد واحد

### [[<meta charset="utf-8">]]

[[meta]] يعني معلومة عن الصفحة، مش حاجة بتظهر. و [[charset]] اختصار character set: الطريقة اللي الحروف متخزنة بيها في الملف. [[utf-8]] هي الطريقة اللي بتغطي العربي وكل لغات الدنيا. وده void element: ملوش محتوى ولا [[</meta>]].

### [[<h1>متجري</h1>]]

عنوان رئيسي. المتصفح بيدّيه تنسيق جاهز من عنده: اتقاس [[font-size: 32px]] و [[font-weight: 700]] (تقيل)، مع إن الفقرة [[16px]] و [[400]].

### [[<p>...</p>]]

[[p]] من paragraph، فقرة كلام عادي.

### [[<a href="...">شوف المنتجات</a>]]

[[a]] من anchor (مرساة). [[href]] اختصار hypertext reference: العنوان اللي هيروحله لما تضغط. المتصفح بيلوّنه [[rgb(0, 0, 238)]] (الأزرق الافتراضي للينكات) وبيحط تحته خط.

### [[<img src="logo.png" alt="لوجو المتجر">]]

[[img]] صورة، و [[src]] من source: مسار الملف. و [[alt]] من alternative: الكلام البديل. الملف [[logo.png]] مش موجود، والسيرفر رد بـ 404، فالمتصفح عرض أيقونة صورة مكسورة وجنبها «لوجو المتجر». وده void element برضه.

### [[<input type="text" placeholder="...">]]

[[input]] حقل يكتب فيه المستخدم. [[type="text"]] نوعه (سطر كلام)، و [[placeholder]] الكلام الباهت اللي بيختفي أول ما تكتب. void element.

### [[<button type="button">بحث</button>]]

زرار. [[type="button"]] يعني زرار عادي مش بيبعت فورم (التفاصيل في «a و button»).

---

## ٣. المتصفح عمل إيه بالملف؟

اللي في تاب Elements مش الملف اللي انت كتبته. ده اللي Chrome رجّعه من [[document.documentElement.outerHTML]]:

~~~text الشجرة اللي اتبنت
<html><head><meta charset="utf-8">
</head><body><h1>متجري</h1>
<p>أحسن المنتجات بأسعار كويسة.</p>
<a href="...">شوف المنتجات</a>
...
</body></html>
~~~

ضاف [[<html>]] و [[<head>]] و [[<body>]] لوحده، وحط الـ meta في الـ head والباقي في الـ body. ولأن مفيش [[<!doctype html>]]، [[document.compatMode]] رجع [[BackCompat]] يعني quirks mode (ده موضوع الدرس الجاي).

---

## ٤. مين في سطر لوحده ومين جنب التاني؟

قست كل عنصر بـ [[getBoundingClientRect()]] (بيرجّع مكان العنصر x و y وعرضه وطوله بالبيكسل) و [[getComputedStyle()]] (التنسيق النهائي):

| العنصر | display | x | y | العرض |
|---|---|---|---|---|
| h1 | block | 8 | 8 | 784 |
| p | block | 8 | 66 | 784 |
| a | inline | 8 | 101 | 76 |
| img | inline | 88 | 101 | 79 |
| input | inline-block | 171 | 100 | 177 |
| button | inline-block | 352 | 100 | 36 |

اقرا الجدول كده:

- الـ h1 والـ p **block**: كل واحد عرضه 784 (عرض الصفحة 800 ناقص 8 margin من كل ناحية بتاعة الـ body) وكل واحد تحت التاني.
- الأربعة اللي بعدهم **inline**: كلهم على نفس الـ y تقريبًا (100 أو 101) والـ x بيزيد، يعني واقفين جنب بعض في سطر واحد زي الكلام.

---

## ٥. لو نسيت [[</h1>]]

مسحت القفلة وفتحت الملف تاني. المتصفح مش بيرمي خطأ، بيكمّل: كل اللي بعد [[<h1>]] بقى جواه.

| العنصر | الأب | font-size |
|---|---|---|
| p | **H1** | 32px |
| a | **H1** | 32px |
| img | **H1** | 32px |

وارتفاع الـ h1 بقى 175 بدل 37، وشجرة الـ accessibility بقت عنوان واحد اسمه «متجري أحسن المنتجات بأسعار كويسة. شوف المنتجات لوجو المتجر بحث». يعني قارئ الشاشة بيقرا الصفحة كلها كأنها عنوان.

---

## الخلاصة

- element = opening tag + محتوى + closing tag. والـ void elements ([[meta]] و [[img]] و [[input]]) ملهمش قفلة.
- الـ attribute جوه الـ opening tag: [[name="value"]].
- المتصفح بيصلّح وبيكمّل لوحده (بيضيف html و head و body)، بس تصليحه ممكن يبقى غلط زي حالة الـ h1 اللي ملهاش قفلة.
- block بياخد سطر لوحده، و inline بيقف جنب اللي قبله.`,
          lines: [
            R`بيقول للمتصفح إن الملف مكتوب UTF-8 عشان العربي يظهر صح ومش رموز غريبة (شرحه في الدرس الجاي).`,
            R`عنوان رئيسي: [[h1]] أكبر عنوان، وبعده h2 لحد h6.`,
            R`فقرة عادية: [[p]] من paragraph.`,
            R`لينك: [[a]] من anchor، و [[href]] العنوان اللي هيفتحه لما تضغط.`,
            R`صورة: [[src]] مسار الملف و [[alt]] الوصف البديل. ملهاش closing tag.`,
            R`حقل كتابة: [[type="text"]] نوعه، و [[placeholder]] الكلام الباهت اللي بيختفي لما تكتب.`,
            R`زرار. [[type="button"]] معناها إنه زرار عادي مش زرار إرسال فورم، ولسه مش بيعمل حاجة لحد ما نربطه بـ JavaScript.`
          ],
          sol: R`لما تفتح الملف هتشوف من فوق لتحت: «متجري» بخط كبير وتقيل، وتحته الفقرة بخط عادي. وبعدين في سطر واحد جنب بعض: اللينك «شوف المنتجات» أزرق وتحته خط، وبعده أيقونة صورة مكسورة جنبها «لوجو المتجر» (لأن ملف [[logo.png]] مش موجود، فالمتصفح بيعرض الـ alt مكانه)، وبعده حقل الكتابة، وبعده زرار «بحث». الأربعة في سطر واحد لأنهم inline، أما h1 و p فكل واحد واخد سطر لوحده.

في Elements هتلاقي [[<html>]] و [[<head>]] و [[<body>]] ظاهرين رغم إنك مكتبتهمش، و [[<meta>]] جوه الـ head والباقي جوه الـ body.

ولما تمسح [[</h1>]]: الفقرة واللينك وكل اللي بعدهم بيتحطوا جوه الـ h1، فكله يبقى بخط كبير وتقيل، وفي Elements هتشوفهم أولاد للـ h1. رجّع القفلة.`
        },
        {
          cmd: "<!doctype html>",
          ref: [
            { t: "WHATWG: The DOCTYPE", url: "https://html.spec.whatwg.org/multipage/syntax.html#the-doctype" },
            { t: "MDN: Viewport meta tag", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport" },
            { t: "WHATWG: the html element", url: "https://html.spec.whatwg.org/multipage/semantics.html#the-html-element" },
            { t: "MDN: <html>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/html" },
            { t: "WHATWG: the body element", url: "https://html.spec.whatwg.org/multipage/sections.html#the-body-element" },
            { t: "MDN: <body>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body" },
            { t: "WHATWG: the head element", url: "https://html.spec.whatwg.org/multipage/semantics.html#the-head-element" },
            { t: "MDN: <head>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head" },
            { t: "WHATWG: the title element", url: "https://html.spec.whatwg.org/multipage/semantics.html#the-title-element" },
            { t: "MDN: <title>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها [[<div><img src="x.png" width="100" height="100"></div>]] بس. ارتفاع الـ div هيبقى كام لو الصفحة من غير [[<!doctype html>]]؟ وكام لو بيه؟ قيسه بـ [[getBoundingClientRect().height]].`, done: R`في Chrome من غير doctype ([[BackCompat]]) طلع 100 بالظبط، وبالـ doctype ([[CSS1Compat]]) طلع 104: في الوضع العادي الصورة inline فبتقف على خط الكلام وتحتها مسافة الحروف اللي بتنزل تحت الخط. نفس الكود بمقاس مختلف عشان سطر واحد.`, sol: R`ملفين فرقهم سطر واحد:

~~~html a.html
<div><img src="x.png" width="100" height="100"></div>
~~~

~~~html b.html
<!doctype html>
<div><img src="x.png" width="100" height="100"></div>
~~~

وفي الـ Console لكل واحد:

~~~js
document.compatMode
document.querySelector('div').getBoundingClientRect().height
~~~

**ليه الرقم مختلف:** الصورة عنصر inline، يعني بتقف على خط الكلام (baseline) زي حرف. وتحت خط الكلام بتفضل مسافة لحروف زي ق و ي اللي بتنزل تحته. في الوضع العادي المسافة دي بتتحسب، فالـ div طوله 100 زائد المسافة.

من غير doctype المتصفح بيدخل quirks mode، يعني بيقلّد متصفحات التسعينات عشان المواقع القديمة متبوظش. وفي الوضع ده السطر اللي فيه صورة بس مبيحسبش مسافة الحروف.

**الغلطة الشائعة:** تعالج المسافة دي بـ [[margin-bottom: -4px]]. العلاج السليم [[display: block]] على الصورة، أو [[vertical-align: bottom]].

~~~text الناتج
من غير doctype: compatMode = BackCompat   ارتفاع الـ div = 100
بالـ doctype:   compatMode = CSS1Compat   ارتفاع الـ div = 104
بالـ doctype و display: block على الصورة: ارتفاع الـ div = 100
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة «جيم الأبطال» عنوانها في التاب طالع [[Ø¬ÙŠÙ… Ø§Ù„Ø£Ø¨Ø·Ø§Ù„]]، والـ head فيه [[<meta charset="iso-8859-1">]]. اعرف السبب من [[document.characterSet]] وصلّحه.`, done: R`قبل التصليح [[document.characterSet]] رجّع [[windows-1252]] (المتصفح بيعامل iso-8859-1 كده)، يعني كل حرف عربي (بايتين في UTF-8) اتقري حرفين لاتيني. بعد [[<meta charset="utf-8">]] في أول الـ head بيرجّع [[UTF-8]] والعنوان «جيم الأبطال».`, sol: R`الـ head بعد التصليح:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>جيم الأبطال</title>
</head>
<body><h1>جيم الأبطال</h1></body>
</html>
~~~

**اللي حصل:** الملف محفوظ UTF-8، يعني كل حرف عربي بايتين. والـ meta بيقول للمتصفح «اقراه iso-8859-1»، وفي الترميز ده كل بايت حرف لاتيني لوحده. فـ «ج» بقت [[Ø¬]] و «ي» بقت [[ÙŠ]]. البيانات سليمة في الملف، القراءة هي اللي غلط.

و [[document.characterSet]] رجّع [[windows-1252]] مش iso-8859-1: المعيار نفسه بيقول تعامل الاسمين كأنهم واحد.

**ليه** [[<meta charset>]] **لازم يبقى أول حاجة في الـ head:** المتصفح بيدوّر عليه في أول 1024 بايت من الملف. لو جه بعد [[title]] بالعربي، ممكن المتصفح يكون قرا الاسم بالترميز الغلط.

**الغلطة الشائعة:** تعيد كتابة النص بالعربي في الملف وتحفظه كذا مرة، وهو سليم أصلًا. دوّر على الترميز، مش على النص.

~~~text الناتج
قبل: characterSet = windows-1252
     العنوان في التاب = Ø¬ÙŠÙ… Ø§Ù„Ø£Ø¨Ø·Ø§Ù„

بعد: characterSet = UTF-8
     العنوان في التاب = جيم الأبطال
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** حط في الـ head سكربتين: واحد من غير defer وواحد بـ [[defer]]، والاتنين فيهم [[console.log(document.querySelector('h1'))]]، والـ h1 في الـ body.`, done: R`السكربت العادي طبع [[null]] (اتنفّذ قبل ما المتصفح يوصل للـ h1)، واللي بـ defer طبع العنصر ([[HTMLHeadingElement]]) لأنه استنى لحد ما الصفحة كلها اتقرت. وفهمت ليه السكربت في الدرس عليه defer.`, sol: R`٣ ملفات في نفس الفولدر. والملفين js لازم يبقوا منفصلين:

~~~html page.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>defer</title>
<script src="normal.js">$__lt/script>
<script src="later.js" defer>$__lt/script>
</head>
<body><h1>أهلًا</h1></body>
</html>
~~~

~~~js normal.js
console.log('من غير defer:', document.querySelector('h1'));
~~~

~~~js later.js
console.log('بـ defer:', document.querySelector('h1'));
~~~

**ليه:** المتصفح بيبني الصفحة من فوق لتحت. أول ما يقابل [[<script>]] عادي بيقف، ويحمّله ويشغّله، وبعدين يكمّل. وقت الوقفة دي الـ body لسه مش موجود، فـ [[querySelector]] بيرجّع [[null]]. أما [[defer]] فبيحمّل الملف في الخلفية وبيشغّله بعد ما الصفحة كلها تتقري.

**الغلطة الشائعة (والمهمة هنا):** تكتب [[defer]] على سكربت جوه الصفحة نفسها، زي [[<script defer>console.log(...)$__lt/script>]]. الـ defer شغال مع [[src]] بس، فالسكربت ده بيتنفّذ فورًا كأن الكلمة مش موجودة، وبيطبع [[null]] برضه.

~~~text الناتج
من غير defer: null
بـ defer: HTMLHeadingElement

والفخ: سكربت inline عليه defer طبع: null
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قالب بداية تنسخه لأي مشروع جديد لموقع «جيم الأبطال»: doctype، و lang و dir، و charset أول حاجة، و viewport، و title فيه اسم الصفحة واسم الموقع، و [[<meta name="description">]]، و link لملف CSS، و script بـ defer.`, done: R`الـ validator على validator.w3.org/nu بيقول مفيش errors، و [[document.compatMode]] = [[CSS1Compat]]، وفي وضع الموبايل [[innerWidth]] بيساوي عرض الجهاز اللي اخترته (مثلًا 375)، وعنوان التاب صح.`, sol: R`القالب (الملفين [[style.css]] و [[app.js]] جنبه، ولو فاضيين):

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرئيسية | جيم الأبطال</title>
<meta name="description" content="جيم الأبطال: اشتراكات شهرية وحصص تدريب لكل المستويات.">
<link rel="stylesheet" href="style.css">
<script src="app.js" defer>$__lt/script>
</head>
<body>
<h1>جيم الأبطال</h1>
</body>
</html>
~~~

**كل سطر ليه سبب:**

- [[<!doctype html>]]: يدخّل الصفحة الوضع العادي بدل quirks mode.
- [[lang="ar" dir="rtl"]]: اللغة لقارئ الشاشة، والاتجاه للصفحة كلها.
- [[charset]] أول حاجة: عشان الـ title بالعربي يتقري صح.
- [[viewport]]: من غيره الموبايل بيرسم الصفحة على عرض 980 ويصغّرها.
- [[title]]: اسم الصفحة قبل اسم الموقع، عشان لما التابات تضيق يفضل الجزء المهم ظاهر.
- [[description]]: الجملة اللي ممكن تظهر تحت اللينك في نتايج البحث.
- [[defer]]: السكربت يقدر يكون في الـ head من غير ما يعطّل بناء الصفحة.

**الغلطة الشائعة:** تنسخ قالب فيه [[user-scalable=no]] في الـ viewport. ده بيمنع التكبير، وبيضر اللي نظره ضعيف.

~~~text الناتج
validator.w3.org/nu: عدد الـ errors = 0
document.compatMode = CSS1Compat
عرض 375 في وضع الموبايل: innerWidth = 375
عنوان التاب = الرئيسية | جيم الأبطال
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** سكربت تلزقه في الـ Console على أي صفحة ويطبع ✓ أو ✗ لـ ٦ حاجات: [[document.doctype?.name === 'html']]، و [[compatMode]]، و [[characterSet]]، ووجود meta viewport، و title مش فاضي، و [[document.documentElement.lang]] مش فاضي.`, done: R`على قالبك طلعوا ٦ ✓، وعلى ملف درس «مقدمة HTML» (اللي من غير doctype ولا lang ولا title) طلع ✗ على الـ doctype والـ compatMode والـ viewport والـ title والـ lang، و ✓ على الـ charset بس.`, sol: R`~~~js
const checks = {
  'doctype': document.doctype?.name === 'html',
  'compatMode': document.compatMode === 'CSS1Compat',
  'characterSet': document.characterSet === 'UTF-8',
  'viewport': !!document.querySelector('meta[name="viewport"]'),
  'title': document.title.trim() !== '',
  'lang': document.documentElement.lang !== '',
};
for (const [name, ok] of Object.entries(checks)) {
  console.log((ok ? '✓ ' : '✗ ') + name);
}
~~~

**إزاي بيشتغل:** كل مفتاح في [[checks]] اسم الفحص، وقيمته [[true]] أو [[false]]. و [[Object.entries]] بيحوّل الـ object لأزواج فنلف عليهم ونطبع.

- [[document.doctype?.name]]: علامة [[?.]] مهمة، لأن [[document.doctype]] بيبقى [[null]] لو مفيش doctype، ومن غيرها السكربت يقع بـ TypeError.
- [[!!]] بتحوّل العنصر أو [[null]] لـ true أو false.
- [[.trim()]] عشان [[<title>   </title>]] ميتحسبش عنوان.

**ليه الـ charset عدّى على ملف الدرس:** ملف «مقدمة HTML» فيه [[<meta charset="utf-8">]] فعلًا، هو ناقصه الباقي بس.

**الغلطة الشائعة:** تفحص [[document.querySelector('html').lang]] من غير ما تقارن، فالسطر يرجّع نص فاضي وانت فاكره نتيجة. كل سطر لازم يرجّع [[true]] أو [[false]] صريح.

~~~text الناتج
على القالب:
✓ doctype
✓ compatMode
✓ characterSet
✓ viewport
✓ title
✓ lang

على ملف درس «مقدمة HTML»:
✗ doctype
✗ compatMode
✓ characterSet
✗ viewport
✗ title
✗ lang
~~~` },
          ],
          title: "أقل صفحة HTML سليمة",
          desc: R`كل صفحة بتبدأ بـ [[<!doctype html>]] وبعدها [[<html>]] فيه جزئين: [[<head>]] للمعلومات اللي مش بتظهر (الترميز، والعنوان، والـ viewport، والـ CSS)، و [[<body>]] للي بيظهر فعلًا.

أهم سطرين في الـ head: [[<meta charset="utf-8">]] عشان العربي ميطلعش رموز غريبة، و [[<meta name="viewport">]] عشان الموبايل يعرض الصفحة بعرضه الحقيقي، مش كأنها شاشة كمبيوتر متصغّرة.`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>متجري | الرئيسية</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <h1>أهلًا</h1>
    <script src="/app.js" defer></script>
  </body>
</html>`,
          try: R`اعمل ملف index.html بالهيكل ده وافتحه. وبعدين امسح سطر الـ viewport وافتحه من الموبايل (أو DevTools وضع الموبايل بـ Ctrl+Shift+M): هتلاقي الصفحة متصغّرة وصعب تتقري.`,
          flag: "script",
          deep: {
            why: R`المتصفح متسامح جدًا: هيعرض أي كلام حتى لو الهيكل غلط. بس «بيظهر» مش معناه «سليم». من غير doctype بيدخل quirks mode ويحسب المقاسات بطريقة المتصفحات القديمة. ومن غير charset العربي ممكن يطلع رموز. ومن غير viewport موقعك مش responsive مهما كتبت media queries.`,
            how: R`المتصفح بيقرا الـ HTML من فوق لتحت ويبني منه شجرة اسمها DOM. كل tag عنصر، والعناصر اللي جواه أولاده. الـ CSS بعد كده بيتطبّق على الشجرة دي، والـ JavaScript بيتعامل معاها.

الـ viewport: الموبايلات بتفترض إن أي موقع معمول لشاشة عرضها حوالي 980px، فبتعرضه بالعرض ده وتصغّره. [[width=device-width]] بيقوله «عرض الصفحة = عرض الشاشة الحقيقي بالـ CSS pixels»، وساعتها الـ media queries بتشتغل صح.

[[<link rel="stylesheet">]] في الـ head بيوقف الرسم لحد ما الـ CSS يتحمّل (render-blocking)، ودا مقصود عشان الصفحة متظهرش من غير تنسيق وبعدين تتقلب. أما [[<script>]] العادي فبيوقف قراية الـ HTML نفسها، عشان كده بنحط [[defer]] أو بنحطه في الآخر.

في Next.js انت مش بتكتب الـ head بإيدك: [[layout.tsx]] فيه [[<html>]] و [[<body>]]، والـ title والـ meta بتيجي من [[metadata]]، و Next بيحط الـ charset والـ viewport لوحده.`,
            when: "كل ملف HTML بتكتبه بإيدك: صفحة PHP، أو قالب إيميل، أو index.html بتاع Vite. وفي React و Next الفكرة نفسها بس الفريموورك بيكتب جزء منها.",
            mistakes: R`تكتب [[user-scalable=no]] أو [[maximum-scale=1]] في الـ viewport عشان تمنع الـ zoom: ده بيأذي اللي نظره ضعيف ومخالف للـ accessibility. وتحط الـ script في الـ head من غير defer فالصفحة تفضل بيضا لحد ما يتحمّل. وتنسى الـ title فالتاب يظهر فيه اسم الملف.`
          },
          teach: R`## الفكرة في سطرين

ده الهيكل اللي أي صفحة HTML بتبدأ بيه: سطر بيقول «أنا HTML حديث»، وجوه [[<html>]] جزء معلومات ([[head]]) وجزء محتوى ([[body]]). عشان أتأكد إن كل سطر بيعمل اللي بنقوله، فتحت الملف في Chrome (headless) من سيرفر محلي، ومسحت كل سطر مهم مرة وقست الفرق.

---

## ١. [[<!doctype html>]]

[[doctype]] اختصار document type. السطر ده مش عنصر، ده إشارة للمتصفح: «احسب كل حاجة بالقواعد الحديثة» (اسمها standards mode). من غيره المتصفح بيدخل **quirks mode**: بيقلّد أخطاء متصفحات التسعينات عشان المواقع القديمة متبوظش.

تقدر تسأل المتصفح هو في أنهي وضع:

~~~text Console
document.compatMode
~~~

| الملف | الناتج |
|---|---|
| فيه doctype | [[CSS1Compat]] (الوضع الحديث) |
| من غيره | [[BackCompat]] (quirks mode) |

والفرق مش نظري. نفس الـ div ده [[<div style="height:50%">]] جوه body فاضي، في نافذة ارتفاعها 600:

| الوضع | ارتفاع الـ div |
|---|---|
| standards | 18px (الـ 50% ملهاش أساس لأن الـ body ملوش ارتفاع، فبقى قد سطر الكلام) |
| quirks | 300px (الـ 50% اتحسبت من النافذة) |

يعني نفس الـ CSS بيطلع شكلين مختلفين. عشان كده الـ doctype أول سطر دايمًا.

---

## ٢. [[<html lang="ar" dir="rtl">]]

العنصر الجذر اللي كل حاجة جواه. [[lang]] لغة الصفحة، و [[dir]] من direction: الاتجاه. [[rtl]] يعني right-to-left. اتقاس: [[direction]] على الصفحة طلع [[rtl]]، والـ h1 حافته اليمين عند x = 792 (يعني لازق في اليمين، 800 ناقص 8 margin). تفاصيلهم في الدرس الجاي.

---

## ٣. جوه الـ [[<head>]]

كل اللي هنا مش بيظهر في الصفحة نفسها.

### [[<meta charset="utf-8">]]

بيقول الحروف متخزنة إزاي. جرّبت أشيله وفي نفس الوقت السيرفر ميقولش الترميز في الـ header بتاعه:

| الحالة | [[document.characterSet]] | العنوان في التاب |
|---|---|---|
| السطر موجود | [[UTF-8]] | «متجري» بالعربي سليم |
| السطر مش موجود | [[windows-1252]] | [[Ù…ØªØ¬Ø±ÙŠ...]] |

المتصفح خمّن ترميز غربي قديم، فكل حرف عربي (اللي بياخد 2 بايت في UTF-8) اتقرا كحرفين لاتيني غريبين. وخليه أول حاجة في الـ head، لأن المتصفح بيدوّر عليه في أول 1024 بايت من الملف بس.

### [[<meta name="viewport" content="...">]]

[[viewport]] هي المساحة اللي الصفحة بتترسم فيها. القيمة فيها جزئين مفصولين بفاصلة:

- [[width=device-width]]: خلي عرض الصفحة = عرض الجهاز.
- [[initial-scale=1]]: ابدأ من غير zoom (1 يعني 100%).

قست على موبايل متقلّد (عرض 375، و [[isMobile]]):

| | [[innerWidth]] | [[visualViewport.scale]] |
|---|---|---|
| السطر موجود | 375 | 1 |
| السطر مش موجود | 981 | 0.38 |

من غيره الموبايل افترض إن الصفحة معمولة لشاشة كمبيوتر عرضها حوالي 980، ورسمها بالعرض ده وصغّرها لـ 38% عشان تدخل في 375. فالكلام بيبان قد ثلثه.

### [[<title>متجري | الرئيسية</title>]]

الكلام اللي في التاب ونتيجة جوجل. [[document.title]] رجّع «متجري | الرئيسية». والـ [[|]] هنا مجرد حرف عادي للفصل، مش رمز خاص.

### [[<link rel="stylesheet" href="/styles.css">]]

[[link]] بيربط الصفحة بملف تاني. [[rel]] من relationship: الملف ده بالنسبة للصفحة إيه؟ [[stylesheet]] يعني ملف CSS. و [[href]] مكانه. الـ [[/]] في الأول معناها «من أول الموقع» مش من الفولدر الحالي. في سجل السيرفر ظهر [[GET /styles.css]] بعد الصفحة على طول.

---

## ٤. جوه الـ [[<body>]]

### [[<h1>أهلًا</h1>]]

المحتوى الظاهر. [[font-size]] اتقاس 32px.

### [[<script src="/app.js" defer></script>]]

[[script]] بيحمّل JavaScript من [[src]]. و [[defer]] يعني «أجّل التنفيذ لحد ما الـ HTML كله يتقري». حطيت في [[app.js]] سطر بيسجّل حالة الصفحة وقت ما اتنفّذ:

~~~text اللي سجّله app.js
interactive h1=true
~~~

[[interactive]] يعني الـ HTML اتقرا كله، و [[h1=true]] يعني الـ h1 كان موجود فعلًا لما الكود اشتغل. ولاحظ إن الـ script ليه قفلة [[</script>]] حتى لو فاضي، مش void element.

---

## ٥. القفلات

[[</body>]] و [[</html>]] بيقفلوا اللي اتفتح. والمسافات اللي في أول السطور (indentation) للقراية بس، المتصفح مش بيهتم بيها.

---

## الخلاصة

| السطر | لو نسيته |
|---|---|
| [[<!doctype html>]] | quirks mode والمقاسات بتتحسب غلط |
| [[charset]] | العربي ممكن يطلع رموز |
| [[viewport]] | الموبايل يعرض الصفحة 980 ومتصغّرة |
| [[title]] | التاب فيه اسم الملف |
| [[defer]] | الـ script يوقف قراية الصفحة لحد ما يتحمّل |`,
          lines: [
            "بيقول للمتصفح «دي صفحة HTML حديثة». من غيره بيشتغل في quirks mode.",
            R`العنصر الجذر. [[lang]] لغة الصفحة و [[dir]] اتجاهها (الدرس الجاي).`,
            "بداية الـ head: معلومات عن الصفحة، مش محتوى.",
            "الترميز UTF-8. خليه أول حاجة في الـ head عشان العربي يتقري صح.",
            "على الموبايل: اعرض الصفحة بعرض الشاشة الحقيقي ومن غير zoom.",
            "العنوان اللي في التاب وفي نتيجة جوجل.",
            "ربط ملف CSS خارجي.",
            R`نهاية الـ head: كل اللي فوق ده معلومات ومش بيترسم، واللي بعده هو اللي بيظهر. لو نسيتها المتصفح بيقفلها لوحده أول ما يقابل عنصر بيظهر زي [[<h1>]]، بس اكتبها عشان الكود يتقري.`,
            "بداية المحتوى اللي بيظهر.",
            "عنوان رئيسي. واحد بس في الصفحة غالبًا.",
            R`الـ JavaScript، و [[defer]] بيخليه يتحمّل من غير ما يوقف قراية الصفحة، ويتنفّذ بعد ما تخلص.`,
            R`نهاية الـ body: بعدها مفيش محتوى. أي عنصر تكتبه بعدها المتصفح بيرجّعه جوه الـ body لوحده (تقدر تشوف ده في Elements).`,
            R`نهاية العنصر الجذر [[<html>]]: آخر سطر في الملف، وبيقفل الشجرة كلها اللي بدأت في السطر التاني.`
          ],
          sol: R`بالهيكل الكامل: كلمة «أهلًا» بتظهر بخطها الطبيعي (الـ h1 حوالي 32px) والعربي مقروء مش رموز غريبة، وعنوان التاب «متجري | الرئيسية». لو فتحت الـ Console واكتبت [[innerWidth]] في وضع الموبايل (مثلًا 375) هيرجع [[375]].

بعد ما تمسح سطر الـ viewport: [[innerWidth]] بيرجع حوالي [[980]]، يعني الموبايل بيرسم الصفحة كأنها شاشة كمبيوتر عرضها 980 ويصغّرها عشان تدخل في الشاشة (scale حوالي 0.38)، فالكلام بيبان صغير جدًا ومحتاج تكبّر بصوابعك. ودا بيحصل حتى لو الـ CSS بتاعك responsive، لأن الـ media queries بتشوف 980 مش 375.

لو مشفتش فرق خالص وانت في DevTools: اتأكد إن وضع الموبايل متفعّل ومختار جهاز (مش Responsive بـ DPR 1 وعرض كبير)، واعمل refresh بعد ما تمسح السطر. ولو العربي طلع رموز زي [[Ø£Ù‡Ù„Ù‹Ø§]] يبقى سطر الـ charset ناقص أو الملف متحفظ بترميز غير UTF-8.`
        },
        {
          cmd: "lang و dir",
          ref: [
            { t: "WHATWG: the dir element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dir" },
            { t: "WHATWG: lang attribute", url: "https://html.spec.whatwg.org/multipage/dom.html#attr-lang" },
            { t: "WHATWG: the bdi element", url: "https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-bdi-element" },
            { t: "MDN: <bdi>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi" },
            { t: "WHATWG: the span element", url: "https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element" },
            { t: "MDN: <span>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span" },
            { t: "MDN: <input type=\"email\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email" },
            { t: "MDN Curriculum: Semantic HTML", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في صفحة [[dir="rtl"]] فيه فقرتين عرضهم 300px: واحدة [[text-align: start]] وواحدة [[text-align: left]]. لو غيّرت الصفحة لـ [[dir="ltr"]]، أنهي فقرة هتغيّر مكان الكلام؟`, done: R`اللي [[start]] بس: كانت يمين وبقت شمال لأن «البداية» بتمشي مع الاتجاه، واللي [[left]] فضلت شمال في الحالتين. وده سبب إن الكود اللي بيشتغل عربي وإنجليزي بيكتب start و end مش left و right.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اتجاه</title>
<style>p { width: 300px; background: #eee; }</style>
</head>
<body>
<p id="s" style="text-align: start">start</p>
<p id="l" style="text-align: left">left</p>
</body>
</html>
~~~

بعد ما تفتحها اكتب في الـ Console [[document.documentElement.dir = 'ltr']] وقارن.

**الإجابة:** اللي [[start]] بس هي اللي بتتحرك. [[start]] معناها «بداية السطر»، والبداية بتتحدد من الاتجاه: يمين في [[rtl]] وشمال في [[ltr]]. أما [[left]] فكلمة ثابتة: شمال دايمًا، مهما الاتجاه اتغيّر.

ولاحظ إن الفقرتين نفسهم اتحركوا كمان، لأن الصندوق نفسه بيبدأ من ناحية الاتجاه. عشان كده القياس هنا مكان الكلام **جوه** الصندوق، مش مكان الصندوق.

**الغلطة الشائعة:** تكتب [[text-align: left]] و [[margin-left]] في موقع هيتترجم، وبعدين تعمل ملف CSS كامل يعكس كل ده للعربي. لو كتبت [[start]] و [[margin-inline-start]] من الأول، نفس الملف هيشتغل للغتين.

~~~text الناتج
المسافة بين شمال الصندوق وأول الكلام، بالـ px:

            rtl      ltr
start       272    0     اتحركت
left        0      0       فضلت شمال
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لستة تعليقات في صفحة عربي، والاسم جاي من الداتابيز: [[<li>Mona_7 5 تعليقات</li>]]. افتحها وبص الرقم 5 لازق في مين، وبعدين صلّحها.`, done: R`من غير عزل الرقم 5 اتعرض يمين الاسم ولازق فيه كأنه جزء منه ([[Mona_7 5]] وبعدهم [[تعليقات]] لوحدها)، لأن الرقم بياخد اتجاه الكلام الإنجليزي اللي جنبه. بـ [[<bdi>Mona_7</bdi> 5 تعليقات]] الرقم رجع جنب كلمة تعليقات. اتقاس بمكان كل حرف بـ Range في Chrome.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تعليقات</title>
</head>
<body>
<ul>
  <li id="bad">Mona_7 5 تعليقات</li>
  <li id="good"><bdi>Mona_7</bdi> 5 تعليقات</li>
</ul>
</body>
</html>
~~~

**اللي بيحصل:** الأرقام مالهاش اتجاه قوي، فبتاخد اتجاه الكلام اللي قبلها. وقبل الـ 5 حروف إنجليزي، فالمتصفح بيعتبرها جزء من الجملة الإنجليزية، ويعرضها على يمين [[Mona_7]] ولازقة فيه. والقارئ بيشوفها كأن الاسم [[Mona_7 5]].

و [[<bdi>]] معناها «اعزل اللي جوايا». فالاسم بقى كتلة لوحده، والرقم مبقاش شايف الحروف الإنجليزي، فبياخد اتجاه الفقرة العربي ويرجع جنب كلمة «تعليقات».

**ليه** [[bdi]] **تحديدًا مش** [[span]]**:** الاسم جاي من الداتابيز، يعني ممكن يبقى عربي أو إنجليزي أو أي حاجة. و [[bdi]] بتشتغل مع الاتنين من غير ما تعرف اللغة مقدمًا.

**الغلطة الشائعة:** تصلّحها بإنك تقلب ترتيب الكلام في الـ HTML. ده بيبان سليم مع اسم إنجليزي، ويبوظ مع أول اسم عربي.

~~~text الناتج
مكان كل جزء من شمال السطر، بالـ px (في rtl الجملة بتتقري من اليمين):

قبل   Mona_7: 1167-1220   الرقم 5: 1224-1232   تعليقات: 1126-1163
بعد   Mona_7: 1179-1232   الرقم 5: 1167-1175   تعليقات: 1126-1163

قبل: الرقم على يمين الاسم مباشرة (لازق فيه)
بعد: الرقم بين الاسم وكلمة تعليقات، جنب كلمة تعليقات
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت حجز لـ «عيادة الشفاء» (اسم متخيل) في صفحة عربي فيه: رقم تليفون بـ +، وإيميل، وكود حجز زي [[BK-2026-17]]، وميعاد [[10:30 AM]]، وحقل إيميل يكتب فيه المريض.`, done: R`كل قيمة إنجليزي بتظهر بنفس ترتيب حروفها اللي كتبتها (الـ + في الأول)، و [[getComputedStyle(el).direction]] على كل span منهم بيرجّع [[ltr]]، وحقل الإيميل المؤشر فيه بيبدأ من الشمال.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حجز</title>
<style>
  .card { max-width: 340px; padding: 16px; border: 1px solid #ccc; border-radius: 12px; font-family: system-ui; }
  dt { font-weight: 700; margin-top: 8px; }
  dd { margin: 0; }
  label { display: block; margin-top: 12px; }
  input { width: 100%; box-sizing: border-box; padding: 8px; }
</style>
</head>
<body>
<main class="card">
  <h1>عيادة الشفاء</h1>
  <dl>
    <dt>التليفون</dt><dd><span dir="ltr">+20 100 000 0000</span></dd>
    <dt>الإيميل</dt><dd><span dir="ltr">hello@shifa-clinic.example</span></dd>
    <dt>كود الحجز</dt><dd><span dir="ltr">BK-2026-17</span></dd>
    <dt>الميعاد</dt><dd><span dir="ltr">10:30 AM</span></dd>
  </dl>
  <label for="mail">إيميلك</label>
  <input id="mail" type="email" dir="ltr" autocomplete="email">
</main>
</body>
</html>
~~~

**ليه كل قيمة في** [[span dir="ltr"]]**:** من غيرها الـ + بتتعامل كعلامة ملهاش اتجاه، فبتتنقل لآخر الرقم، و [[BK-2026-17]] بتتقسم وتتعرض قطع. و [[dir="ltr"]] بتعزل القيمة وبتمشّيها من الشمال لليمين، والجملة العربية حواليها زي ما هي.

**ليه** [[dir="ltr"]] **على الـ input مش في الـ CSS:** الإيميل والتليفون إنجليزي دايمًا مهما كانت لغة الصفحة، فالمؤشر لازم يبدأ من الشمال. وده معلومة عن البيانات نفسها، فمكانها الـ HTML.

**الغلطة الشائعة:** تكتب [[dir="ltr"]] على الـ dd كله أو تعمل [[text-align: left]]. القيمة هتتقري صح بس هتروح أقصى الشمال، بعيد عن العنوان بتاعها.

~~~text الناتج
القيم زي ما اتعرضت في الترتيب (من الشمال لليمين):
+20 100 000 0000 , hello@shifa-clinic.example , BK-2026-17 , 10:30 AM
أول حرف من شمال الرقم هو +: true

direction لكل span: ltr , ltr , ltr , ltr
direction الحقل: ltr   text-align المحسوبة: start
المؤشر بيبدأ من شمال الحقل: x الـ input = 25
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** حقل بحث بـ [[dir="auto"]]. اكتب فيه [[hello]] وبعدين امسحه واكتب [[أهلا]]، وفي كل مرة اسأل [[input.matches(':dir(rtl)')]] في الـ Console.`, done: R`مع الإنجليزي الحقل بقى ltr ([[:dir(ltr)]] رجّع [[true]])، ومع العربي بقى rtl، من غير JavaScript. وعرفت إن [[dir="auto"]] بيختار حسب أول حرف «قوي» في الكلام، فهو أنسب لحقل ممكن يتكتب فيه أي لغة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث</title>
</head>
<body>
<label for="q">دوّر</label>
<input id="q" type="search" dir="auto">
</body>
</html>
~~~

وفي الـ Console بعد كل كتابة:

~~~js
const input = document.querySelector('#q');
input.matches(':dir(ltr)');
input.matches(':dir(rtl)');
~~~

**ليه بيشتغل:** [[dir="auto"]] بيخلي المتصفح يبص على أول حرف «قوي» في القيمة. الحرف القوي يعني حرف ليه اتجاه محدد، عربي أو لاتيني. أما الأرقام والعلامات فمش قوية، فبيعدّي عليها ويدوّر على اللي بعدها. فـ [[123 أهلا]] بتطلع rtl.

والتغيير بيحصل وانت بتكتب، من غير JavaScript ولا event.

**الغلطة الشائعة:** تعمل [[oninput]] يفحص الحروف ويغيّر [[dir]] بإيدك. ده سطور كتير لحاجة المتصفح بيعملها بكلمة واحدة، وغالبًا هتنسى حالة الرقم في الأول. وكمان [[dir="auto"]] ينفع على عنصر عرض، زي تعليق جاي من مستخدم.

~~~text الناتج
القيمة      :dir(ltr)   :dir(rtl)
فاضي        true       false     (بياخد اتجاه الصفحة)
hello       true        false
أهلا        false       true
123 أهلا    false       true
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** [[lang]] مش لقارئ الشاشة بس. دوّر في MDN على ٣ حاجات تانية بتتغيّر حسب قيمته (ابدأ بصفحة [[hyphens]] و [[:lang()]]).`, done: R`عندك ٣: تقسيم الكلمات في آخر السطر ([[hyphens: auto]] مش بيشتغل من غير lang)، و selector [[:lang(en)]]، واختيار الخط والترجمة التلقائية في المتصفح. ولكل واحد سطر كود جربته.`, sol: R`**الإجابة النموذجية: ٣ حاجات بتتغيّر بـ** [[lang]] **غير قارئ الشاشة:**

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>lang</title>
<style>
  p { width: 90px; hyphens: auto; }
  :lang(en) { font-style: italic; }
  .up { text-transform: uppercase; }
</style>
</head>
<body>
<p lang="en">internationalization</p>
<span lang="tr" class="up">i</span>
<span lang="en" class="up">i</span>
</body>
</html>
~~~

| الحاجة | بتتغيّر إزاي |
|---|---|
| [[hyphens: auto]] | المتصفح بيقسم الكلمة بقواعد اللغة، ومن غير [[lang]] مبيقسمش خالص |
| [[:lang(en)]] | selector بيختار العناصر حسب لغتها، حتى لو اللغة جاية من عنصر أب |
| [[text-transform]] | حرف [[i]] الصغير في التركي كبيره [[İ]] بنقطة، مش [[I]] |

وكمان: المتصفح بيستخدم [[lang]] في اختيار الخط لو الحروف مشتركة بين لغات، وعشان يقرر يعرض الترجمة ولا لأ. دول من وثائق MDN، مش من تجربة هنا.

**اللي مانفعش في التجربة:** [[hyphens: auto]] محتاج قاموس تقسيم للغة، و Chrome بيحمّله لوحده بعد التثبيت. في المتصفح الآلي اللي اتجرب فيه مكانش موجود، فالفقرة ماتقسمتش لا بـ lang ولا من غيره. فالسطر بتاعه من وثائق MDN، وجرّبه انت في Chrome العادي. ونفس الكلام علامات [[<q>]]: كتير من المراجع بتقول إنها بتتغيّر بالـ lang، بس Chrome هنا عرض [[“ ”]] مع [[fr]] و [[en]] زي بعض.

**الغلطة الشائعة:** تسيب [[lang="en"]] جاية من قالب إنجليزي على صفحة عربي. الشكل مش هيتغيّر، بس قارئ الشاشة هيقرا العربي بنطق إنجليزي، و Chrome هيعرض ترجمة غلط.

~~~text الناتج
:lang(en) على الفقرة  →  font-style = italic
uppercase لحرف i:  tr = İ   en = I
hyphens: auto: ارتفاع الفقرة بـ lang = 18px ومن غيره 18px (مفيش قاموس في الجهاز ده، فمتساويين)
~~~` },
          ],
          title: "صفحة عربي بتتقري من اليمين صح",
          desc: R`[[lang="ar"]] بيقول لغة الصفحة، و [[dir="rtl"]] بيقلب اتجاهها كلها: النص يبدأ من اليمين، والـ flex بيرص من اليمين، والـ grid بيبدأ من اليمين. الاتنين على [[<html>]].

ولو جوه صفحة عربي فيه حاجة لازم تفضل LTR (رقم تليفون، أو كود، أو إيميل)، حط عليها [[dir="ltr"]] لوحدها.`,
          example: R`<html lang="ar" dir="rtl">
  <body>
    <p>كلمنا على <span dir="ltr">+20 100 000 0000</span></p>
    <p>كود الخصم: <bdi>SAVE-20</bdi></p>
    <p lang="en" dir="ltr">This paragraph is English.</p>
    <input type="email" dir="ltr" placeholder="you@example.com">
  </body>
</html>`,
          try: R`اعمل صفحة بـ [[dir="rtl"]] فيها [[display: flex]] على 3 مربعات، وغيّر لـ ltr وشوف الترتيب اتقلب لوحده. وبعدين اكتب رقم تليفون فيه + من غير [[dir="ltr"]] وشوف الـ + راحت فين.`,
          flag: "script",
          deep: {
            why: R`العربي بيتكتب من اليمين، بس الأرقام والإنجليزي جوه الكلام بيتكتبوا من الشمال. المتصفح عنده خوارزمية اسمها Unicode Bidi بتحاول تظبط ده لوحدها، وبتغلط في الحاجات اللي فيها رموز زي + و - والأقواس. و [[lang]] نفسها بتأثر على قارئ الشاشة (بينطق بأنهي لغة)، والخط اللي المتصفح يختاره، وجوجل.`,
            how: R`[[dir]] مش بيقلب النص بس. هو بيحدد الـ inline direction للعنصر وكل اللي جواه: [[text-align: start]] تبقى يمين، والـ flex row بيبدأ من اليمين، وأعمدة الـ grid بتتعد من اليمين، والـ scroll الأفقي بيبدأ من اليمين. عشان كده الـ CSS الحديث بيستخدم start و end بدل left و right (درس logical properties في المستوى التاني).

الـ Bidi algorithm بيقسّم النص لقطع: حروف عربي (اتجاهها RTL قوي)، وحروف إنجليزي (LTR قوي)، ورموز وأرقام (ضعيفة أو محايدة، بتاخد اتجاه اللي جنبها). علامة + في أول رقم تليفون محايدة، فبتاخد اتجاه الجملة العربي وتروح الناحية التانية. [[dir="ltr"]] أو [[<bdi>]] بيعزلوا القطعة دي.

في Next.js مع next-intl: الـ layout بياخد الـ locale ويحط [[lang={locale}]] و [[dir={locale === "ar" ? "rtl" : "ltr"}]] على [[<html>]]، ودا اللي بيخلي نفس المكونات تشتغل في اللغتين.`,
            when: R`أي موقع عربي أو بلغتين. [[dir]] على html مرة واحدة، و [[dir="ltr"]] على الأرقام والأكواد والإيميلات والأوقات.`,
            mistakes: R`تستخدم [[text-align: right]] بدل [[dir="rtl"]]: النص بيتحاذى يمين بس الترتيب والعلامات كلها غلط. وتحط [[dir="rtl"]] على body بس، فالـ scrollbar والحاجات اللي برا الـ body تفضل LTR. وفي مشروع حقيقي زرار تبديل الثيم كان حسابه بـ [[translate-x]] والـ thumb بيتحرك غلط في العربي، فاتحل بـ [[dir="ltr"]] على الزرار نفسه: حل مقبول لعنصر شكله مش مرتبط باللغة.`
          },
          teach: R`## الفكرة في سطرين

[[lang]] بيقول «الكلام ده بأنهي لغة»، و [[dir]] بيقول «بيتكتب من أنهي ناحية». بنحطهم مرة على [[<html>]] للصفحة كلها، وبعدين بنعزل الحتت اللي اتجاهها مختلف (أرقام، أكواد، إيميلات). كل النتايج تحت من Chrome (headless): قست مكان كل حرف على الشاشة بـ [[Range.getBoundingClientRect()]] ورتبتهم من الشمال لليمين، فعرفت المتصفح رسم الكلام بأنهي ترتيب.

---

## ١. [[<html lang="ar" dir="rtl">]]

- [[lang]] من language. القيمة كود اللغة: [[ar]] عربي، [[en]] إنجليزي. ده بيأثر على نطق قارئ الشاشة، والخط اللي المتصفح يختاره، وجوجل.
- [[dir]] من direction، وقيمه: [[rtl]] (right-to-left، من اليمين للشمال)، و [[ltr]] (left-to-right)، و [[auto]] (المتصفح يخمّن من أول حرف قوي).

[[dir]] مش بيأثر على الكلام بس، بيأثر على ترتيب العناصر كمان. حطيت 3 مربعات في [[display: flex]] وقست مكانهم (x) في نافذة عرضها 800:

| [[dir]] على html | المربع 1 | المربع 2 | المربع 3 |
|---|---|---|---|
| [[rtl]] | 784 (أقصى اليمين) | 776 | 768 |
| [[ltr]] | 8 (أقصى الشمال) | 16 | 24 |

نفس الـ CSS بالظبط، والترتيب اتقلب لوحده.

---

## ٢. ليه الأرقام بتتلخبط؟ (الـ Bidi)

المتصفح بيقسّم الحروف لـ 3 أنواع:

| النوع | أمثلة | اتجاهه |
|---|---|---|
| قوي RTL | حروف عربي | يمين لشمال |
| قوي LTR | حروف إنجليزي | شمال ليمين |
| ضعيف أو محايد | أرقام، [[+]]، [[-]]، مسافات، أقواس | بياخد اتجاه اللي حواليه |

الخوارزمية دي اسمها Unicode Bidirectional Algorithm (bidi = اتجاهين). والمشكلة دايمًا في الحروف المحايدة.

---

## ٣. [[<span dir="ltr">+20 100 000 0000</span>]]

[[<span>]] عنصر inline ملوش أي معنى ولا شكل، بنستخدمه عشان نحط attribute على حتة من الكلام. قست الرقم في الحالتين:

~~~text الترتيب على الشاشة من الشمال لليمين
من غير dir="ltr":   0000 000 100 20+  [الكلام العربي]
مع dir="ltr":       +20 100 000 0000  [الكلام العربي]
~~~

من غير العزل، المسافات بين المجموعات محايدة فاخدت اتجاه الفقرة (RTL)، فالمجموعات اترصّت من اليمين: [[20]] الأول على اليمين وبعده [[100]]... والـ [[+]] راحت على أقصى الشمال. مع [[dir="ltr"]] الحتة كلها بقت LTR وطلعت زي ما اتكتبت.

---

## ٤. [[<bdi>SAVE-20</bdi>]]

[[bdi]] اختصار bidirectional isolation: «اعزل الكلام ده عن اللي حواليه، واعرف اتجاهه من محتواه». بنستخدمه للكلام اللي مش عارفين لغته مقدمًا (اسم مستخدم، أو كود من الداتابيز).

في المثال بالظبط ([[كود الخصم: <bdi>SAVE-20</bdi>]]) الشكل طلع زي ما هو بـ span أو bdi، لأن مفيش بعده حاجة تتلخبط. الفرق بيبان لما ييجي بعده رقم:

~~~text اللي اترسم (الترتيب زي ما بتقراه من اليمين)
كتب <span>Ali</span> 3 تعليقات   →   كتب 3 Ali تعليقات   (غلط)
كتب <bdi>Ali</bdi> 3 تعليقات    →   كتب Ali 3 تعليقات   (صح)
~~~

من غير عزل، الرقم [[3]] اتلزق في الـ [[Ali]] كأنهم جملة إنجليزي واحدة واتقلب مكانه. [[<bdi>]] قفل على [[Ali]] لوحدها، فالرقم رجع مكانه في الجملة العربي.

---

## ٥. [[<p lang="en" dir="ltr">]]

فقرة إنجليزي كاملة: [[lang="en"]] عشان قارئ الشاشة ينطقها إنجليزي، و [[dir="ltr"]] عشان تبدأ من الشمال. اتقاس: الفقرة دي بتبدأ عند x = 8 (الشمال)، والفقرات العربي بتخلص عند 792 (اليمين).

---

## ٦. [[<input type="email" dir="ltr">]]

الإيميل دايمًا إنجليزي ورموز، فحقله LTR حتى في صفحة عربي. اتقاس: [[direction]] بتاع الحقل [[ltr]]، و [[text-align]] قيمته [[start]]، و [[start]] في LTR يعني الشمال. فالكتابة بتبدأ من الشمال لوحدها.

---

## الخلاصة

| الحالة | الحل |
|---|---|
| الصفحة كلها عربي | [[<html lang="ar" dir="rtl">]] |
| رقم تليفون أو كود جوه كلام عربي | [[dir="ltr"]] على span حواليه |
| كلام جاي من المستخدم ومش عارف لغته | [[<bdi>]] |
| فقرة بلغة تانية | [[lang]] و [[dir]] على الفقرة نفسها |
| حقول الإيميل والروابط | [[dir="ltr"]] على الـ input |

- [[dir]] بيقلب ترتيب الـ flex والـ grid كمان، مش الكلام بس.
- [[text-align: right]] مش بديل لـ [[dir="rtl"]].`,
          lines: [
            "الصفحة عربي واتجاهها من اليمين للشمال.",
            R`بداية المحتوى اللي بيظهر. الـ body بيورث [[dir="rtl"]] من الـ html، فكل اللي جواه بيبدأ من اليمين من غير ما تكتب dir تاني.`,
            R`رقم تليفون جوه جملة عربي: [[dir="ltr"]] عشان الـ + والمسافات متتلخبطش.`,
            R`[[<bdi>]] بيعزل اتجاه كلام جاي من المستخدم أو الداتابيز ومش عارف لغته.`,
            "فقرة إنجليزي كاملة جوه صفحة عربي: لغتها واتجاهها.",
            "حقل الإيميل دايمًا LTR حتى في صفحة عربي.",
            R`نهاية الـ body: الـ dir اللي على العناصر اللي جواه (الـ span والـ p والـ input) بيأثر عليهم هما بس، وباقي الصفحة لسه rtl.`,
            R`نهاية الـ html: الـ [[lang]] و [[dir]] اللي اتكتبوا عليه في أول سطر شغالين على الصفحة كلها لحد هنا.`
          ],
          sol: R`مع [[dir="rtl"]]: المربع 1 على أقصى اليمين، وبعده 2 على شماله، وبعده 3. غيّر لـ [[ltr]]: 1 بقى على أقصى الشمال والترتيب اتعكس، من غير ما تلمس أي CSS. ده لأن flex بيمشي على اتجاه الكتابة (main-start بيبقى اليمين في rtl).

رقم التليفون [[+20 100 000 0000]] من غير [[dir="ltr"]] جوه فقرة عربي بيتعرض كده: [[0000 000 100 20+]]. الـ + راحت آخر الرقم (على الشمال)، والأدهى إن المجموعات اتعكس ترتيبها لأن المسافات اللي بينها بتاخد اتجاه الفقرة (rtl). مع [[<span dir="ltr">]] بيرجع [[+20 100 000 0000]] زي ما كتبته.

الغلط الشائع إنك تفتكر المشكلة في الـ + بس فتحلها بإنك تشيلها؛ المجموعات برضه هتتعكس طول ما فيه مسافات. الحل دايمًا تعزل الرقم بـ [[dir="ltr"]] أو [[<bdi>]].`
        },
        {
          cmd: "semantic HTML",
          ref: [
            { t: "MDN: HTML, a good basis for accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML" },
            { t: "WHATWG: the section element", url: "https://html.spec.whatwg.org/multipage/sections.html#the-section-element" },
            { t: "MDN: <section>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section" },
            { t: "MDN Curriculum: Semantic HTML", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" },
            { t: "MDN Curriculum: Accessibility", url: "https://developer.mozilla.org/en-US/curriculum/core/accessibility/" },
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** صفحة هبوط لـ «عيادة الابتسامة» (اسم متخيل) من ٧ أجزاء: الهيرو، والخدمات، والخطوات، والأطبا، والأسعار، والأسئلة، والتواصل. كل جزء [[<section id="...">]] وجواه h2، والـ header فيه nav بلينك لكل جزء، والفوتر برّه الـ main.`, done: R`تاب Accessibility (أو ARIA snapshot) بيورّي banner و navigation و main و contentinfo، وفيه h1 واحد وتحته ٧ h2، والضغط على أي لينك في الـ nav بينزل للجزء بتاعه والـ URL بيبقى فيه [[#الاسم]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة الابتسامة</title>
<style>section { min-height: 60vh; scroll-margin-top: 16px; }</style>
</head>
<body>
<header>
  <a href="#hero">عيادة الابتسامة</a>
  <nav aria-label="أجزاء الصفحة">
    <a href="#hero">البداية</a>
    <a href="#services">الخدمات</a>
    <a href="#steps">الخطوات</a>
    <a href="#doctors">الأطبا</a>
    <a href="#prices">الأسعار</a>
    <a href="#faq">الأسئلة</a>
    <a href="#contact">التواصل</a>
  </nav>
</header>
<main>
  <h1>ابتسامة تثق فيها</h1>
  <section id="hero"><h2>ليه عيادتنا؟</h2><p>كشف أول مرة مجانًا.</p></section>
  <section id="services"><h2>الخدمات</h2><p>تنظيف وتبييض وتقويم.</p></section>
  <section id="steps"><h2>الخطوات</h2><p>احجز، واكشف، وابدأ.</p></section>
  <section id="doctors"><h2>الأطبا</h2><p>٥ أطبا متخصصين.</p></section>
  <section id="prices"><h2>الأسعار</h2><p>الكشف من ٢٠٠ جنيه.</p></section>
  <section id="faq"><h2>الأسئلة</h2><p>بنستقبل الأطفال من سن ٣ سنين.</p></section>
  <section id="contact"><h2>التواصل</h2><p>اتصل على <a href="tel:+200000000000">الرقم ده</a>.</p></section>
</main>
<footer><p>عيادة الابتسامة، كل الحقوق محفوظة.</p></footer>
</body>
</html>
~~~

**اللي يفرق هنا:**

- [[header]] مباشرة تحت الـ body بيبقى landmark اسمه banner. و [[footer]] برّه الـ main بيبقى contentinfo. لو حطيت الفوتر جوه [[main]] هيفقد الـ role ده.
- الـ [[aria-label]] على [[nav]] بيسمّيها، فقارئ الشاشة يقول «أجزاء الصفحة navigation».
- [[href="#services"]] بيدوّر على [[id="services"]] وينزل له، والـ URL بيتغيّر ومن غير reload.
- [[scroll-margin-top]] بيسيب مسافة فوق الجزء لما ينزل له.

**الغلطة الشائعة:** تستخدم [[h3]] تحت [[h1]] عشان حجمها عجبك، أو [[h1]] في كل section. الحجم شغل CSS، والرقم معناه الترتيب.

~~~text الناتج
- banner:
  - navigation "أجزاء الصفحة":
- main:
  - heading "ابتسامة تثق فيها" [level=1]
  - heading "ليه عيادتنا؟" [level=2]
  - heading "الخدمات" [level=2]
  - heading "الخطوات" [level=2]
  - heading "الأطبا" [level=2]
  - heading "الأسعار" [level=2]
  - heading "الأسئلة" [level=2]
  - heading "التواصل" [level=2]
- contentinfo:

landmarks: banner , navigation , main , contentinfo
h1 = 1   h2 = 7
بعد الضغط على «الأسعار»: الـ URL فيه #prices   والجزء فوق الشاشة عند y = 16
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** خد الصفحة دي: [[<div class="header">]] فيه اللوجو والقايمة، و [[<div class="content">]] للمحتوى، و [[<div class="footer">]]. حوّلها لعناصر semantic من غير ما الشكل يتغيّر ولا class واحد يتشال.`, done: R`قبل: axe طلّع [[region]] (محتوى برّه أي landmark). بعد: صفر violations، والصفحة شكلها نفس الشكل بالظبط (خد screenshot قبل وبعد وقارن)، والـ landmarks الأربعة ظاهرين في تاب Accessibility.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر النور</title>
<style>
  .header { background: #124; color: #fff; padding: 12px; }
  .header a { color: #fff; margin-inline-start: 12px; }
  .content { padding: 12px; }
  .footer { background: #eee; padding: 12px; }
</style>
</head>
<body>
<div class="header">
  <span class="logo">متجر النور</span>
  <div class="menu"><a href="#a">الرئيسية</a><a href="#b">العروض</a></div>
</div>
<div class="content"><h1>أهلًا</h1><p>أحدث العروض هنا.</p></div>
<div class="footer">كل الحقوق محفوظة</div>
</body>
</html>
~~~

بعد (نفس الـ classes، والـ tags بس اللي اتغيّرت):

~~~html after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر النور</title>
<style>
  .header { background: #124; color: #fff; padding: 12px; }
  .header a { color: #fff; margin-inline-start: 12px; }
  .content { padding: 12px; }
  .footer { background: #eee; padding: 12px; }
</style>
</head>
<body>
<header class="header">
  <span class="logo">متجر النور</span>
  <nav class="menu" aria-label="الرئيسية"><a href="#a">الرئيسية</a><a href="#b">العروض</a></nav>
</header>
<main class="content"><h1>أهلًا</h1><p>أحدث العروض هنا.</p></main>
<footer class="footer">كل الحقوق محفوظة</footer>
</body>
</html>
~~~

**ليه الشكل مبيتغيّرش:** [[div]] و [[header]] و [[main]] و [[footer]] و [[nav]] كلهم [[display: block]] افتراضيًا ومن غير مسافات. والـ CSS مربوط بالـ class مش بالـ tag. فالتغيير في المعنى بس.

**ليه الـ class فضل:** الـ CSS والـ JavaScript ممكن يكونوا معتمدين عليه. الـ refactor معناه إن الناتج ميتغيّرش.

**الغلطة الشائعة:** تكتب [[<section class="header">]]. [[section]] معناها جزء من المحتوى، مش رأس الصفحة، ومن غير اسم ملهاش أي role.

~~~text الناتج
axe قبل: landmark-one-main , region
axe بعد: 0 violations
الـ landmarks بعد: banner , navigation , main , contentinfo
الـ screenshot قبل وبعد متطابقين بايت ببايت على 1280: true
overflow على 360: 0px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها header فوق خالص، و article جواه header و footer، و aside، و section ليه [[aria-labelledby]]، و section تاني من غيره. اكتب الـ role اللي تتوقّعه لكل واحد، وبعدين شوف تاب Accessibility.`, done: R`الـ header اللي فوق banner، بس الـ header والـ footer اللي جوه الـ article ملهمش landmark خالص (بقوا جزء من الـ article)، و aside بقى complementary، والـ section اللي ليه اسم بقى region، واللي من غير اسم ملوش role. اتشاف في ARIA snapshot من Chrome.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأدوار</title>
</head>
<body>
<header>رأس الموقع</header>
<main>
  <article>
    <header><h1>المقال</h1></header>
    <p>نص المقال.</p>
    <footer>كتبته سلمى</footer>
  </article>
  <aside>روابط جانبية</aside>
  <section aria-labelledby="t"><h2 id="t">التعليقات</h2></section>
  <section><h2>جزء من غير اسم</h2></section>
</main>
</body>
</html>
~~~

| العنصر | الـ role | ليه |
|---|---|---|
| [[header]] فوق خالص | banner | تحت الـ body مباشرة، فهو رأس الموقع كله |
| [[header]] جوه article | مفيش landmark | ده رأس المقال بس، مش الموقع |
| [[footer]] جوه article | مفيش landmark | نفس السبب |
| [[aside]] | complementary | محتوى مكمّل للصفحة |
| [[section]] ليه اسم | region | الاسم هو اللي بيخليه landmark |
| [[section]] من غير اسم | ملوش role | بيتعامل معاملة div |

**القاعدة:** [[header]] و [[footer]] بيتحسبوا landmarks بس لو مش جوه [[article]] أو [[aside]] أو [[main]] أو [[nav]] أو [[section]]. نفس الـ tag معناه بيتغيّر حسب مكانه.

**الغلطة الشائعة:** تحط [[section]] على كل حاجة وتفتكر إن الصفحة بقت semantic. من غير اسم هو مجرد div، والعلاج [[aria-labelledby]] على عنوانه.

~~~text الناتج
ARIA snapshot من Chrome:
- banner: رأس الموقع
- main:
  - article:
    - heading "المقال" [level=1]
    - paragraph: نص المقال.
    - text: كتبته سلمى
  - complementary: روابط جانبية
  - region "التعليقات":
    - heading "التعليقات" [level=2]
  - heading "جزء من غير اسم" [level=2]
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة فيها اتنين [[<main>]]، والعنوان اللي بعد h1 هو h4 «عشان الخط أصغر». شغّل axe (إضافة axe DevTools أو Lighthouse) وصلّح كل اللي يطلع.`, done: R`axe قبل التصليح طلّع [[landmark-no-duplicate-main]] و [[heading-order]] (ومعاهم [[landmark-unique]])، وبعد ما بقى main واحد والعنوان h2 (والخط صغّرته بـ CSS) بقوا صفر.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة</title>
</head>
<body>
<main><h1>عيادة النور</h1></main>
<main><h4>المواعيد</h4><p>كل يوم من ١٠ لـ ١٠.</p></main>
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
<title>عيادة</title>
<style>.small-title { font-size: 1rem; }</style>
</head>
<body>
<main>
  <h1>عيادة النور</h1>
  <h2 class="small-title">المواعيد</h2>
  <p>كل يوم من ١٠ لـ ١٠.</p>
</main>
</body>
</html>
~~~

**التلات مشاكل:**

- [[main]] المفروض يبقى واحد بس في الصفحة. هو الـ landmark اللي برنامج قراءة الشاشة بينط عليه مباشرة، واتنين بيخلوا الحركة ملخبطة.
- [[landmark-unique]] طلعت عشان الاتنين ليهم نفس الـ role ونفس الاسم الفاضي، فمفيش طريقة تفرّق بينهم.
- [[heading-order]]: من h1 لـ h4 نطّة، وقارئ الشاشة بيستخدم مستويات العناوين كفهرس، فبيبان إن فيه أجزاء ضايعة.

**التصليح الصح للحجم:** العنوان بيتصغّر بالـ CSS، والمستوى بيتحدد من ترتيب الكلام. القاعدة: h2 تحت h1، ولو عايزه أصغر، class.

**الغلطة الشائعة:** تستبدل h4 بـ [[<p><b>...</b></p>]] عشان axe يسكت. كده العنوان اختفى من فهرس قارئ الشاشة، والمشكلة بقت أسوأ.

~~~text الناتج
axe قبل: heading-order , landmark-no-duplicate-main , landmark-unique
axe بعد: 0 violations
عدد main بعد = 1   العناوين: H1 32px , H2 16px
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** ٣ كروت آراء عملا بـ [[<figure>]] و [[<blockquote>]] و [[<figcaption>]]، وكل كارت فيه دايرة بأول حرف من اسم العميل (من غير صور: [[width]] و [[height]] 48px و [[border-radius: 50%]] ولون خلفية)، وعلامة تنصيص كبيرة باهتة بـ [[::before]].`, done: R`الدواير مدورة بالظبط ([[getBoundingClientRect]] بيقول 48×48)، والحرف في نص الدايرة، والكلام نفسه جوه blockquote واسم العميل جوه figcaption في تاب Elements. وعلامة التنصيص زينة: لو تاب Accessibility بيقراها جزء من الرأي، خليها [[content: "”" / ""]] عشان متتقريش.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>آراء العملا</title>
<style>
  body { font-family: system-ui; margin: 16px; background: #f4f4f5; }
  h1 { text-align: center; }
  .reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); max-width: 900px; margin-inline: auto; }
  figure { position: relative; margin: 0; padding: 20px; background: #fff; border-radius: 12px; }
  figure::before {
    content: "”" / "";
    position: absolute; inset-block-start: 0; inset-inline-end: 12px;
    font-size: 72px; line-height: 1; color: #d4d4d8;
  }
  blockquote { margin: 0 0 12px; }
  figcaption { display: flex; align-items: center; gap: 10px; font-weight: 600; }
  .avatar {
    width: 48px; height: 48px; flex: none;
    border-radius: 50%; background: #0f766e; color: #fff;
    display: grid; place-items: center;
  }
</style>
</head>
<body>
<main>
<h1>آراء العملا</h1>
<section class="reviews" aria-label="آراء العملا">
  <figure>
    <blockquote>الطلب وصل في نفس اليوم والخدمة ممتازة.</blockquote>
    <figcaption><span class="avatar" aria-hidden="true">م</span>منى سامي</figcaption>
  </figure>
  <figure>
    <blockquote>أول مرة أشتري أونلاين ومتعبش.</blockquote>
    <figcaption><span class="avatar" aria-hidden="true">ك</span>كريم عادل</figcaption>
  </figure>
  <figure>
    <blockquote>الأسعار كويسة والتواصل سريع.</blockquote>
    <figcaption><span class="avatar" aria-hidden="true">س</span>سلمى فؤاد</figcaption>
  </figure>
</section>
</main>
</body>
</html>
~~~

**كل جزء بيعمل إيه:**

- [[figure]] وحدة قايمة بذاتها، و [[figcaption]] وصفها. و [[blockquote]] معناها «كلام منقول من حد».
- [[.avatar]]: [[width]] و [[height]] متساويين و [[border-radius: 50%]] يطلعوا دايرة. و [[flex: none]] بتمنع الدايرة تنضغط لو الاسم طويل.
- [[display: grid; place-items: center]] أقصر طريقة لتوسيط حرف في النص.
- [[aria-hidden="true"]] على الدايرة، لأن الحرف زينة والاسم مكتوب جنبها.
- [[position: relative]] على الكارت عشان [[::before]] يتحدد مكانه بالنسبة له.
- [[content: "”" / ""]]: اللي بعد الـ [[/]] هو النص البديل لقارئ الشاشة، وفاضي يعني «متقراش».

**الغلطة الشائعة:** تكتب [[width: 48px]] و [[height: 48px]] جوه flex من غير [[flex: none]]. الدايرة تتحول بيضاوي أول ما الاسم يطول.

~~~text الناتج
مقاس الدايرة: 48×48  border-radius: 50%
مركز الدايرة (1046, 184)  ومركز الحرف (1046, 184)
الأعمدة: 1280 = 289.328px 289.328px 289.344px   360 = 328px
overflow على 360: 0px   axe: 0 violations
اللي بيتقري من أول كارت: - figure "منى سامي": - blockquote: الطلب وصل في نفس اليوم والخدمة ممتازة. - text: منى سامي
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك JSON فيه ٤ مقالات لمدونة طبخ متخيلة: [[{"title":"عيش بلدي في البيت","date":"2026-03-01","author":"شيف سلمى"}]] وزيّه ٣. اكتب لكل مقال [[<article>]] فيه h2 و [[<time datetime="2026-03-01">١ مارس</time>]] واسم الكاتب.`, done: R`كل article ليه عنوان، وكل [[time]] الـ datetime بتاعه بصيغة [[YYYY-MM-DD]] والكلام اللي جواه مكتوب للقارئ، والـ validator مش بيشتكي من أي datetime، والمقالات الأربعة جوه section واحد عنوانه «أحدث الوصفات».`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدونة طبخ</title>
</head>
<body>
<main>
  <section aria-labelledby="latest">
    <h1 id="latest">أحدث الوصفات</h1>
    <article>
      <h2>عيش بلدي في البيت</h2>
      <p><time datetime="2026-03-01">١ مارس</time>، كتبته شيف سلمى</p>
    </article>
    <article>
      <h2>كشري بالعدس الأصفر</h2>
      <p><time datetime="2026-03-08">٨ مارس</time>، كتبته شيف سلمى</p>
    </article>
    <article>
      <h2>مكرونة بشاميل خفيفة</h2>
      <p><time datetime="2026-03-15">١٥ مارس</time>، كتبه شيف عادل</p>
    </article>
    <article>
      <h2>كنافة بالمانجا</h2>
      <p><time datetime="2026-03-22">٢٢ مارس</time>، كتبته شيف هدى</p>
    </article>
  </section>
</main>
</body>
</html>
~~~

**ترتيب العناوين:** «أحدث الوصفات» هو عنوان الصفحة h1، والمقالات h2 تحته. ولو ضفت فوقه h1 تاني زي اسم المدونة، ينزل هو h2 والمقالات h3، عشان الترتيب ميتكسرش.

**الجزء المهم:** [[time]] فيه كلامين: اللي بيتقري للقارئ «١ مارس»، واللي الجهاز بيفهمه [[2026-03-01]]. فجوجل والتقويم يعرفوا التاريخ حتى لو الكلام جواه عربي. الصيغة لازم [[YYYY-MM-DD]] وبأرقام إنجليزي.

**ليه** [[article]]**:** كل وصفة ممكن تتقري لوحدها، حتى لو اتنقلت لصفحة تانية. ده الاختبار: لو الجزء مالوش معنى لوحده، يبقى مش article.

**الغلطة الشائعة:** تكتب [[datetime="١ مارس"]] أو [[datetime="2026-3-1"]]. التانية من غير صفر، والـ validator بيرفضها.

~~~text الناتج
validator: عدد الـ errors = 0
عدد article = 4، وكلهم ليهم عنوان: true
datetime: 2026-03-01 , 2026-03-08 , 2026-03-15 , 2026-03-22
والتجربة العكسية datetime="2026-3-1": الـ validator طلّع 1 error
overflow على 360: 0px   axe: 0 violations
~~~` },
          ],
          title: "استخدم العنصر اللي معناه صح مش div لكل حاجة",
          desc: R`بدل ما الصفحة كلها [[div]]، فيه عناصر ليها معنى: [[header]] لرأس الصفحة، و [[nav]] للروابط الرئيسية، و [[main]] للمحتوى الأساسي (واحد بس)، و [[section]] لجزء ليه عنوان، و [[article]] لحاجة كاملة لوحدها زي بوست أو كارت منتج، و [[aside]] لمحتوى جانبي، و [[footer]] لآخر الصفحة.

شكلهم على الشاشة زي الـ div بالظبط. الفرق إن قارئ الشاشة وجوجل والمتصفح نفسه فاهمين كل جزء إيه.`,
          example: R`<header>
  <a href="/">متجري</a>
  <nav aria-label="الرئيسية">
    <a href="/products">المنتجات</a>
  </nav>
</header>
<main>
  <h1>أحدث المنتجات</h1>
  <section>
    <h2>الأكثر مبيعًا</h2>
    <article>كارت منتج</article>
  </section>
</main>
<footer>© 2026 متجري</footer>`,
          try: R`افتح أي صفحة ليك، ومن DevTools › Elements افتح تاب Accessibility. حوّل الـ div الرئيسي لـ main والقايمة لـ nav، وشوف الـ landmarks ظهرت في شجرة الـ accessibility.`,
          flag: "script",
          deep: {
            why: R`الـ div ملوش معنى. لما الصفحة كلها div، قارئ الشاشة بيقراها كتلة واحدة ومحدش يعرف فين القايمة وفين المحتوى. جوجل كمان بيفهم الصفحة أحسن لما يعرف فين الـ main وفين العناوين. والكود نفسه بيتقري أسهل: [[</nav>]] أوضح من [[</div>]] رقم سبعة.`,
            how: R`المتصفح بيبني من الـ DOM شجرة تانية اسمها accessibility tree، وهي اللي قارئ الشاشة بيقراها. كل عنصر semantic ليه role جاهز: [[nav]] = navigation، و [[main]] = main، و [[header]] على مستوى الصفحة = banner، و [[footer]] = contentinfo. الـ roles دي اسمها landmarks، واللي بيستخدم قارئ شاشة بيقدر ينط بينها بزرار، زي ما انت بتبص على الصفحة وتروح للجزء اللي عايزه.

العناوين h1 لـ h6 بتعمل فهرس للصفحة. قارئ الشاشة بيعرض قايمة بالعناوين، وناس كتير بتتنقل بيها. عشان كده الترتيب يهم: متختارش h4 عشان الخط صغير، اختار الرقم الصح وغيّر الحجم بالـ CSS.

[[section]] من غير عنوان ملهاش لازمة كـ landmark، استخدم div. و [[article]] مش للمقالات بس: أي حاجة مستقلة (كارت منتج، تعليق، بوست).`,
            when: "كل صفحة. ابدأ بالعنصر الـ semantic، وارجع للـ div بس لما تكون محتاج غلاف للتنسيق ملوش معنى.",
            mistakes: R`أكتر من [[main]] ظاهر في الصفحة. عناوين بتتنط (h1 وبعدها h4). [[section]] حوالين كل حاجة كأنها div. وتفتكر إن [[header]] معناه «أول حاجة في الصفحة» بس: أي section أو article ممكن يبقى ليه header بتاعه.`
          },
          teach: R`## الفكرة في سطرين

كل عنصر في المثال شكله على الشاشة زي [[div]] بالظبط، بس كل واحد بيقول **معنى** الجزء ده. والمعنى ده بيروح لشجرة اسمها accessibility tree، وهي اللي قارئ الشاشة بيقراها. فتحت المثال في Chrome (headless) وطلّعت الشجرة دي من Chrome نفسه (عن طريق [[Accessibility.getFullAXTree]] في DevTools Protocol)، وبعدين حوّلت كل العناصر لـ div وقارنت.

---

## ١. الشكل: مفيش فرق

قست [[display]] لكل عنصر:

~~~text الناتج
HEADER:block  NAV:block  MAIN:block  SECTION:block  ARTICLE:block  FOOTER:block
~~~

كلهم [[block]] زي الـ div. يعني العناصر دي مش بتغيّر الشكل، بتغيّر المعنى بس.

---

## ٢. السطور واحد واحد

| العنصر | معناه | الـ role اللي Chrome اداه |
|---|---|---|
| [[<header>]] | رأس الصفحة (لوجو وقايمة) | [[banner]] |
| [[<a href="/">]] | لينك للرئيسية. [[/]] لوحدها = أول الموقع | [[link]] |
| [[<nav aria-label="الرئيسية">]] | nav من navigation: مجموعة روابط التنقل | [[navigation "الرئيسية"]] |
| [[<main>]] | المحتوى الأساسي، واحد بس في الصفحة | [[main]] |
| [[<h1>]] | عنوان الصفحة | [[heading level=1]] |
| [[<section>]] | جزء من الصفحة ليه عنوان | [[generic]] (شرحها تحت) |
| [[<h2>]] | عنوان الجزء، مستوى أقل من h1 | [[heading level=2]] |
| [[<article>]] | حاجة كاملة لوحدها (بوست، كارت منتج) | [[article]] |
| [[<footer>]] | آخر الصفحة | [[contentinfo]] |

الـ **role** هو «نوع» العنصر عند قارئ الشاشة. و [[banner]] و [[navigation]] و [[main]] و [[contentinfo]] اسمهم **landmarks** (علامات): قارئ الشاشة بيعرض قايمة بيهم، والمستخدم بينط لأي واحد بزرار.

### [[aria-label="الرئيسية"]]

[[aria]] اختصار Accessible Rich Internet Applications: attributes بتضيف معلومات لقارئ الشاشة بس. [[aria-label]] بيدّي العنصر اسم. في الشجرة ظهر [[navigation "الرئيسية"]]، فلو فيه nav تانية في الفوتر يتفرّقوا بالاسم.

---

## ٣. الشجرة كلها: semantic مقابل div

~~~text بالعناصر الـ semantic
banner
  link "متجري"
  navigation "الرئيسية"
    link "المنتجات"
main
  heading "أحدث المنتجات" level=1
  generic
    heading "الأكثر مبيعًا" level=2
    article
contentinfo
~~~

~~~text نفس الصفحة بـ div بس
link "متجري"
generic "الرئيسية"
  link "المنتجات"
heading "أحدث المنتجات" level=1
heading "الأكثر مبيعًا" level=2
generic
generic
~~~

في نسخة الـ div مفيش ولا landmark: الـ banner والـ main والـ contentinfo اختفوا، والـ article بقى [[generic]] (يعني «حاجة ملهاش معنى»). العناوين بس اللي فضلت، لأن h1 و h2 لسه موجودين.

---

## ٤. ليه الـ [[<section>]] طلع [[generic]]؟

الـ section بيبقى landmark (role اسمه [[region]]) بس لو ليه اسم. جرّبت أدّيله اسم من عنوانه:

~~~text index.html
<section aria-labelledby="s1">
  <h2 id="s1">الأكثر مبيعًا</h2>
~~~

[[aria-labelledby]] معناها «اسمي هو الكلام اللي جوه العنصر اللي الـ id بتاعه كذا». والنتيجة في الشجرة:

~~~text الناتج
region "الأكثر مبيعًا"
  heading "الأكثر مبيعًا" level=2
~~~

---

## ٥. ليه الـ [[header]] بقى banner؟

لأنه مباشرة جوه الـ body. لو حطيت header جوه article أو section، مش بيبقى banner (هو رأس الجزء ده بس، مش رأس الصفحة). ونفس الكلام للـ footer و [[contentinfo]].

---

## الخلاصة

- العناصر الـ semantic شكلها زي الـ div، والفرق في الـ role اللي قارئ الشاشة بيشوفه.
- [[header]] و [[nav]] و [[main]] و [[footer]] = landmarks يقدر ينط بينهم.
- [[section]] من غير اسم = div. ادّيله [[aria-labelledby]] لو عايزه landmark.
- العناوين بالترتيب (h1 ثم h2)، والحجم يتغيّر بالـ CSS مش برقم العنوان.`,
          lines: [
            "رأس الصفحة: اللوجو والقايمة.",
            R`اللوجو لينك للرئيسية: [[href="/"]] يعني أول الموقع. اللوجو اللي مش لينك بيضايق الناس اللي متعودين يدوسوا عليه عشان يرجعوا.`,
            R`الروابط الرئيسية. [[aria-label]] بيفرّقها لو فيه أكتر من nav (زي nav في الفوتر).`,
            R`لينك لصفحة المنتجات جوه الـ nav. لينكات القايمة بتبقى [[<a>]] مش [[<button>]] لأنها بتوديك صفحة تانية (درس «a و button»).`,
            R`نهاية الـ nav: الـ landmark اسمه «الرئيسية» بيغطّي اللينكات اللي فوق دي بس، وكل اللي بعدها مش جزء من القايمة دي في شجرة الـ accessibility.`,
            R`نهاية الـ header: عشان هو مش جوه main ولا article، المتصفح بيدّيله دور [[banner]] (رأس الصفحة كلها) في شجرة الـ accessibility.`,
            "المحتوى الأساسي، واحد بس في الصفحة. قارئ الشاشة بيقدر ينط له على طول.",
            "عنوان الصفحة. h1 واحد والعناوين نازلة بالترتيب.",
            "جزء من الصفحة ليه عنوان.",
            "عنوان الجزء: h2 تحت h1، ومتنطّش لـ h4 عشان الخط أصغر.",
            "حاجة كاملة لوحدها: لو اتنقلت لصفحة تانية تفضل مفهومة.",
            R`نهاية الـ section: الجزء ده خلص عند عنوانه h2 وكارته. الجزء الجاي يبقى section تاني بعنوان h2 تاني.`,
            R`نهاية الـ main: المحتوى الأساسي خلص هنا، والفوتر برّه عشان مش جزء من موضوع الصفحة.`,
            "آخر الصفحة: حقوق وروابط ثانوية."
          ],
          sol: R`قبل التغيير: شجرة الـ Accessibility فيها [[generic]] جوه [[generic]] ومفيش ولا landmark. بعد ما تحوّل: هتلاقي [[main]] و [[navigation]] (وبالاسم اللي في [[aria-label]]، زي «الرئيسية»)، ولو عندك header و footer مباشرة تحت الـ body هيظهروا [[banner]] و [[contentinfo]]. والـ [[<article>]] بيظهر [[article]]، والعناوين [[heading]] بمستواها.

ممكن تشوفها أسرع من الـ Accessibility tree الكامل (الأيقونة اللي فوق الـ Elements panel): هتلاقي banner › link «متجري» و navigation «الرئيسية» › link، و main › heading level 1 وهكذا. وقارئ الشاشة بيقدر ينط بينهم بمفتاح واحد (D في NVDA مثلًا).

لو الـ [[<section>]] مظهرش كـ [[region]] ده طبيعي: section من غير اسم (aria-label أو aria-labelledby) مش بيبقى landmark. ولو الـ header جوه article أو section مش هيبقى banner. ولو مفيش أي تغيير خالص، غالبًا عندك [[role="presentation"]] أو [[role]] تاني على العنصر بيغطي على معناه.`
        },
        {
          cmd: "a و button",
          ref: [
            { t: "WHATWG: the a element", url: "https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element" },
            { t: "MDN: <a>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a" },
            { t: "WHATWG: the button element", url: "https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element" },
            { t: "MDN: <button>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button" },
            { t: "MDN: <input type=\"submit\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/submit" },
            { t: "WHATWG: noopener", url: "https://html.spec.whatwg.org/multipage/links.html#linkTypes" },
            { t: "MDN Curriculum: Semantic HTML", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" },
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** متجر فيه [[<a href="#" onclick="addToCart()">أضف للسلة</a>]] و [[<div class="btn" onclick="openMenu()">القايمة</div>]]. جرّبهم بالكيبورد بس وصلّحهم.`, done: R`الـ div مكانش بيتوصله بـ Tab، واللينك كان بيزوّد [[#]] في الـ URL ويطلع الصفحة لفوق. بعد ما الاتنين بقوا [[<button type="button">]]: الاتنين بيتوصلهم بـ Tab ويشتغلوا بـ Enter و Space، والـ URL مبيتغيّرش.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متجر</title>
</head>
<body>
<main>
<h1>المتجر</h1>
<button type="button" onclick="addToCart()">أضف للسلة</button>
<button type="button" class="btn" onclick="openMenu()">القايمة</button>
<p id="log">جاهز</p>
</main>
<script>
  function addToCart() { document.querySelector('#log').textContent = 'اتضاف للسلة'; }
  function openMenu() { document.querySelector('#log').textContent = 'القايمة اتفتحت'; }
$__lt/script>
</body>
</html>
~~~

**ليه الاتنين كانوا غلط:**

- [[<a href="#">]] لينك معناه «روح لمكان». الـ [[#]] بيخلي المتصفح يطلع لأول الصفحة ويضيف علامة في الـ URL، وده مش اللي انت عايزه في إضافة للسلة.
- [[<div onclick>]] مبيتوصلش بـ Tab أصلًا، ومبيشتغلش بـ Enter ولا Space، وقارئ الشاشة مبيقولش إنه زرار. كل ده بييجي ببلاش مع [[button]].

**القاعدة:** لو بيودّيك لصفحة أو مكان، يبقى [[a]]. لو بيعمل حاجة في نفس الصفحة، يبقى [[button]].

**الغلطة الشائعة:** تزوّد الـ div بـ [[tabindex="0"]] و [[role="button"]] و [[onkeydown]]. ده تلات حاجات بتعيد بناء زرار موجود جاهز، وغالبًا هتنسى Space. وشكل الزرار بيتغيّر بالـ CSS عادي.

~~~text الناتج
قبل، بـ Tab مرتين: وصل لـ a «أضف للسلة» ثم الـ body (خرج من الصفحة)  (الـ div مش بيتوصله)
قبل، الضغط على اللينك: الـ URL بقى ينتهي بـ /p.html#

بعد:
Tab الأولى: button «أضف للسلة»  Tab التانية: button «القايمة»
Enter على الأول  →  اتضاف للسلة
Space على التاني →  القايمة اتفتحت
الـ URL اتغيّر: false
axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** فورم بحث [[method="get"]] فيه [[<input name="q">]] وزرار «مسح» من غير type، والـ onclick بتاعه بيفضّي الحقل. اكتب في الحقل «قهوة» ودوس «مسح». إيه اللي هيحصل للصفحة؟`, done: R`الصفحة اتبعتت واتحمّلت من الأول والـ URL بقى فيه [[?q=]] فاضي: الزرار من غير type جوه فورم بيبقى submit، فالـ onclick فضّى الحقل وبعدها الفورم اتبعت. الحل [[type="button"]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث</title>
</head>
<body>
<form method="get" action="search.html">
  <label for="q">دوّر</label>
  <input id="q" name="q">
  <button onclick="document.querySelector('#q').value = ''">مسح</button>
</form>
</body>
</html>
~~~

**التوقّع الصح:** الصفحة بتتبعت. أي [[button]] جوه [[form]] من غير [[type]] بيبقى [[submit]] افتراضيًا. فالترتيب كان: الـ onclick فضّى الحقل، وبعدها الزرار عمل شغله العادي وبعت الفورم بقيمة فاضية.

**الحل:** سطر واحد:

~~~html
<button type="button" onclick="document.querySelector('#q').value = ''">مسح</button>
~~~

ولو الفورم مش متغيّر من JavaScript، فيه [[type="reset"]] جاهز بيرجّع كل الحقول لقيمتها الأولى.

**الغلطة الشائعة:** تعالجها بـ [[event.preventDefault()]] في كل زرار. ده بيشتغل، بس [[type="button"]] أوضح وأقصر. وعوّد نفسك تكتب [[type]] على كل [[button]] دايمًا.

~~~text الناتج
قبل (من غير type):
الـ URL بعد الضغط: /search.html?q=
نوع الزرار: submit

بعد (type="button"):
الـ URL بعد الضغط: /p.html
قيمة الحقل: «»
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط تواصل لـ «بُن الصباح» (متجر قهوة متخيل): لينك «المنيو» لصفحة تانية، وزرار «أضف للسلة»، ولينك «اتصل» بـ [[tel:]]، ولينك واتساب خارجي في تاب جديدة، ولينك «حمّل المنيو» لملف PDF بـ [[download]].`, done: R`بـ Tab بتعدّي على الخمسة بالترتيب، وتاب Accessibility بيقول ٤ link وواحد button، واللينك الخارجي عليه [[rel="noopener noreferrer"]]، ولينك الـ PDF بينزّل الملف بدل ما يفتحه.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بُن الصباح</title>
<style>
  .bar { display: flex; flex-wrap: wrap; gap: 8px; padding: 8px; }
  .bar a, .bar button { padding: 10px 14px; font: inherit; }
</style>
</head>
<body>
<main>
<h1>بُن الصباح</h1>
<nav class="bar" aria-label="التواصل">
  <a href="menu.html">المنيو</a>
  <button type="button">أضف للسلة</button>
  <a href="tel:+200000000000">اتصل</a>
  <a href="https://wa.me/200000000000" target="_blank" rel="noopener noreferrer">واتساب</a>
  <a href="menu.pdf" download>حمّل المنيو</a>
</nav>
</main>
</body>
</html>
~~~

**كل عنصر اخترناه ليه:**

- «المنيو» [[a]]: بيودّي لصفحة تانية، فيفتح في تاب جديدة بالكليك الوسط.
- «أضف للسلة» [[button]]: بيعمل حاجة في نفس الصفحة.
- [[tel:]]: على الموبايل بيفتح الاتصال بالرقم، والرقم بالصيغة الدولية من غير مسافات.
- [[target="_blank"]]: تاب جديدة، ومعاها [[rel="noopener noreferrer"]] عشان الموقع التاني ميوصلش لصفحتك.
- [[download]]: المتصفح بينزّل الملف بدل ما يفتحه. وده بيشتغل على ملف من نفس الموقع بس. لو الملف من دومين تاني بيتجاهله.

**الغلطة الشائعة:** تعمل زرار فيه [[onclick="location.href=..."]] بدل لينك. الكليك الوسط يبطل، و «افتح في تاب جديدة» تبطل، وقارئ الشاشة يقول زرار وهو بيودّي لصفحة.

~~~text الناتج
ترتيب Tab: المنيو ← أضف للسلة ← اتصل ← واتساب ← حمّل المنيو
الأدوار: 4 link و 1 button
rel الخارجي: noopener noreferrer
الضغط على «حمّل المنيو»: اتنزّل ملف اسمه menu.pdf، والصفحة فضلت على /p.html
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** لينك [[target="_blank"]] من غير [[rel]] خالص. في الصفحة اللي بتفتح اطبع [[window.opener]]. وبعدين اقرا ليه الدرس لسه بيقولك تكتب [[rel="noopener noreferrer"]].`, done: R`في Chrome الحديث طلع [[null]] حتى من غير rel، لأن المتصفحات بقت بتحط noopener لوحدها مع [[_blank]]. بس [[noreferrer]] لسه بيمنع إن الموقع التاني يعرف انت جاي منين، والمتصفحات القديمة مبتعملش noopener لوحدها، فكتابتها لسه صح.`, sol: R`الصفحة اللي فيها اللينكات:

~~~html from.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>من هنا</title>
</head>
<body>
<a id="plain" href="to.html" target="_blank">من غير rel</a>
<a id="safe" href="to.html" target="_blank" rel="noopener noreferrer">بـ rel كامل</a>
<a id="old" href="to.html" target="_blank" rel="opener">rel="opener"</a>
</body>
</html>
~~~

والصفحة اللي بتفتح:

~~~html to.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هنا</title>
</head>
<body>
<script>
  console.log('opener:', window.opener);
  console.log('referrer:', document.referrer);
$__lt/script>
</body>
</html>
~~~

شغّلهم من سيرفر محلي (مثلًا [[npx serve .]]) عشان الـ referrer يتبعت.

**الفرق بين التلاتة:**

- [[window.opener]] هو باب من الصفحة الجديدة لصفحتك. لو موجود، الموقع التاني يقدر يكتب [[window.opener.location = ...]] ويبدّل صفحتك بصفحة مزيفة وانت في التاب التانية.
- المتصفحات الحديثة بقت بتحط [[noopener]] لوحدها مع [[_blank]]. عشان كده [[window.opener]] طلع [[null]] حتى من غير rel. وعشان نرجّع السلوك القديم لازم نكتب [[rel="opener"]] صراحة.
- [[noreferrer]] موضوع تاني: بيمنع الموقع التاني يعرف انت جاي منين، و [[document.referrer]] بيبقى فاضي.

**الغلطة الشائعة:** تستنتج إن [[rel]] بقت ملهاش لازمة لأن الرقم طلع [[null]]. جرّب اللينك التاني: الـ referrer مختلف، وده اللي لسه محتاجه، زائد المتصفحات القديمة.

~~~text الناتج
                 window.opener     document.referrer
من غير rel       null            عنوان صفحتك: /from.html
noopener noreferrer  null        (فاضي)
rel="opener"     Window            عنوان صفحتك: /from.html
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** ٣ أزرار من غير أي مكتبة: زرار كبسولة ([[border-radius: 999px]])، وزرار دايرة فيه أيقونة × بس، وزرار شفاف بحدود (ghost). خلي ألوانهم من متغيرين [[--bg]] و [[--fg]] والـ ghost يغيّرهم بس.`, done: R`كل زرار مقاسه 44×44 على الأقل ([[getBoundingClientRect]])، وزرار الأيقونة ليه [[aria-label="اقفل"]] فاسمه في تاب Accessibility «اقفل» مش ×، والـ ghost الـ CSS بتاعه سطرين بس بيغيّروا المتغيرات.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أزرار</title>
<style>
  .btn {
    --bg: #0f766e;
    --fg: #fff;
    background: var(--bg);
    color: var(--fg);
    border: 2px solid var(--bg);
    min-width: 44px;
    min-height: 44px;
    padding: 8px 20px;
    font: 600 1rem system-ui;
    cursor: pointer;
    border-radius: 999px;
  }
  .btn--ghost {
    --bg: transparent;
    --fg: #0f766e;
    border-color: currentColor;
  }
  .btn--round {
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 50%;
  }
</style>
</head>
<body>
<main>
<h1>الأزرار</h1>
<button type="button" class="btn">اشترك</button>
<button type="button" class="btn btn--round" aria-label="اقفل">×</button>
<button type="button" class="btn btn--ghost">اعرف أكتر</button>
</main>
</body>
</html>
~~~

**ليه المتغيرات:** كل الشكل في [[.btn]] مكتوب مرة واحدة بـ [[var(--bg)]]. فالـ ghost مبيعيدش كتابة حاجة، بيغيّر قيمتين بس، والـ [[border-color: currentColor]] بتاخد لون الكلام.

و [[min-width]] و [[min-height]] 44px عشان الزرار يتداس بالصباع بسهولة، وده أقل من أي نص جواه هيقدر يكسره.

و [[aria-label="اقفل"]] مهم: من غيره قارئ الشاشة هيقول «multiplication sign». الـ aria-label بيبدّل اسم الزرار.

**الغلطة الشائعة:** تكتب [[border: none]] في الأساس وبعدين تضيف border للـ ghost. الـ ghost يطلع أكبر من الزرار العادي بـ 4px، فالصف يتهز. الـ border موجود في الاتنين، بس شفاف أو بنفس لون الخلفية.

~~~text الناتج
كبسولة  85.4×44.0
دايرة   44.0×44.0   border-radius = 50%
ghost   107.2×44.0   الخلفية = rgba(0, 0, 0, 0)
أسماء الأزرار: button "اشترك" ,   button "اقفل": × ,   button "اعرف أكتر"
axe: 0 violations
~~~` },
          ],
          title: "لينك ولا زرار؟ والـ div اللي بيتضغط",
          desc: R`القاعدة: لو الضغطة بتوديك مكان (صفحة، أو جزء في الصفحة، أو ملف) يبقى [[<a href>]]. لو بتعمل حاجة في نفس المكان (تفتح مودال، تبعت فورم، تضيف للسلة) يبقى [[<button>]].

و [[<div onclick>]] غلط في الحالتين: مش بيتوصله بالكيبورد، ومش بيشتغل بـ Enter، وقارئ الشاشة مش عارف إنه بيتضغط.`,
          example: R`<a href="/products/42">تفاصيل المنتج</a>
<a href="#pricing">الأسعار</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">موقع خارجي</a>
<a href="tel:+201000000000">اتصل بينا</a>
<a href="mailto:you@example.com">ابعت إيميل</a>
<button type="button" onclick="openCart()">السلة</button>
<button type="submit">اشتري</button>
<div onclick="openCart()">السلة</div>`,
          try: R`اعمل [[<div onclick>]] و [[<button>]] جنب بعض، وسيب الماوس واتنقل بـ Tab بس: الزرار هيتوصله ويشتغل بـ Enter و Space، والـ div مش هيتلمس.`,
          flag: "script",
          deep: {
            why: R`ناس كتير بتستخدم الموقع من غير ماوس: كيبورد، أو قارئ شاشة، أو ريموت. العناصر الأصلية جاهزة ليهم من غير ولا سطر كود. لو عملت div وعايزه يشتغل زي الزرار، هتحتاج [[role]] و [[tabindex]] و keydown لـ Enter و Space، وغالبًا هتنسى حاجة.`,
            how: R`[[<button>]] بياخد focus بـ Tab لوحده، وبيطلّع click لما تدوس Enter أو Space، وليه role اسمه button، وبيدعم [[disabled]]. و [[<a href>]] بياخد focus، وبيشتغل بـ Enter، والمتصفح بيديله «افتح في تاب جديدة» ومعاينة الرابط في ركن الشاشة.

الزرار جوه [[<form>]] الافتراضي بتاعه [[type="submit"]]. عشان كده أي زرار جوه فورم ومش مفروض يبعتها (زي «إظهار الباسورد») لازم [[type="button"]]، وإلا هيبعت الفورم ويعمل reload.

[[<a>]] من غير [[href]] مش لينك ومبياخدش focus. ولو لقيت نفسك بتكتب [[<a href="#" onClick>]] يبقى انت محتاج زرار.

في React و Next: التنقل بين صفحات الموقع بـ [[<Link>]] بتاع Next (بيطلّع [[<a>]] في الآخر)، والأفعال بـ [[<button>]]. ومكون Button في shadcn بيدعم [[asChild]] عشان تلبس شكل الزرار على [[<Link>]] من غير ما يبقى زرار جوه لينك.`,
            when: "كل عنصر بيتضغط. اسأل نفسك: بيوديني مكان ولا بيعمل حاجة؟",
            mistakes: R`زرار جوه لينك أو لينك جوه زرار (HTML غلط وسلوكه مش متوقع). زرار في فورم نسيت له [[type="button"]] فبيعمل submit. و [[target="_blank"]] من غير rel (المتصفحات الحديثة بتحط noopener لوحدها، بس خليه صريح). وكروت منتجات معمولة [[<div onClick={() => router.push(...)}>]]: مبتتفتحش في تاب جديدة، ومش بتتوصل بالكيبورد، وجوجل مش شايف الروابط. الحل [[<Link>]] حوالين الكارت.`
          },
          teach: R`## الفكرة في سطرين

[[<a>]] بيوديك مكان، و [[<button>]] بيعمل حاجة مكانك. والاتنين جاهزين للكيبورد ولقارئ الشاشة من غير كود. عشان أثبت ده حطيت المثال في صفحة جوه Chrome (headless)، وعرّفت [[openCart()]] كدالة بتسجّل كل مرة اتنادت، ودوست Tab و Enter و Space بالكيبورد المتقلّد وقست النتيجة.

---

## ١. اللينكات: [[<a href="...">]]

[[href]] هو اللي بيخلي الـ [[<a>]] لينك. قريت [[a.href]] لكل واحد (المتصفح بيحوّل العنوان لعنوان كامل):

| اللي مكتوب | اتحوّل لـ | بيعمل إيه |
|---|---|---|
| [[/products/42]] | [[http://127.0.0.1:PORT/products/42]] | صفحة في نفس الموقع. [[/]] في الأول = من أول الموقع |
| [[#pricing]] | [[.../index.html#pricing]] | نفس الصفحة، وبينزل للعنصر اللي [[id="pricing"]] |
| [[https://example.com]] | [[https://example.com/]] | موقع تاني |
| [[tel:+201000000000]] | زي ما هو | [[tel:]] بيفتح الاتصال على الموبايل |
| [[mailto:you@example.com]] | زي ما هو | [[mailto:]] بيفتح برنامج الإيميل |

لما ضغطت على «الأسعار»: [[location.hash]] بقى [[#pricing]] والصفحة نزلت لوحدها (الـ [[scrollY]] بقى 1494) لحد العنوان، من غير JavaScript.

### [[target="_blank" rel="noopener noreferrer"]]

- [[target]] الصفحة تتفتح فين. [[_blank]] (بالـ underscore) معناها تاب جديدة.
- [[rel]] علاقة الصفحة دي بالصفحة اللي هتتفتح:
  - [[noopener]]: الصفحة الجديدة متقدرش توصل لصفحتك عن طريق [[window.opener]].
  - [[noreferrer]]: متبعتلهاش إنك جاي منين (الـ Referer header).

---

## ٢. الأزرار: [[<button>]]

### [[type="button"]] و [[type="submit"]]

[[type]] بيحدد الزرار هيعمل إيه في فورم. اتقاس [[button.type]]:

| المكتوب | [[button.type]] |
|---|---|
| [[type="button"]] | [[button]]: زرار عادي، الضغط عليه مش بيبعت الفورم |
| [[type="submit"]] | [[submit]]: بيبعت الفورم اللي هو جواها |
| زرار جوه [[<form>]] من غير type | [[submit]] برضه: ده الافتراضي، فأي زرار جوه فورم بيبعتها لو نسيت الـ type |

السطر التالت هو الفخ: زرار من غير type جوه فورم بيبعت الفورم.

### [[onclick="openCart()"]]

[[onclick]] attribute بيشغّل كود JavaScript لما العنصر يتضغط. والضغطة مش لازم تبقى ماوس: الزرار بيطلّع نفس الـ click من الكيبورد.

---

## ٣. التجربة بالكيبورد

دوست Tab 9 مرات وسجّلت مين واخد الـ focus كل مرة:

~~~text ترتيب الـ focus
1 تفاصيل المنتج   2 الأسعار   3 موقع خارجي   4 اتصل بينا   5 ابعت إيميل
6 السلة (button)   7 اشتري   8 body (خرج من الصفحة)   9 تفاصيل المنتج تاني
~~~

الـ [[<div onclick>]] مظهرش خالص. السبب في [[tabIndex]]:

| العنصر | [[tabIndex]] |
|---|---|
| [[<button>]] | 0 (بيدخل في ترتيب Tab) |
| [[<div>]] | -1 (مش بيدخل) |

وبعدين وقفت على زرار «السلة» ودوست:

| الضغطة | عدد مرات [[openCart()]] |
|---|---|
| Enter | 1 |
| Space وهي لسه مدوسة | 1 (لسه) |
| بعد ما سبت Space | 2 |

Enter بيشتغل أول ما تدوس، و Space بيشتغل لما تسيبها.

---

## ٤. قارئ الشاشة شايف إيه؟

من شجرة الـ accessibility بتاعة Chrome:

~~~text الناتج
link "تفاصيل المنتج" focusable=true
...
button "السلة" focusable=true
button "اشتري" focusable=true
generic
  StaticText "السلة"
~~~

الزرار [[button]]، والـ div [[generic]] فيه كلام. يعني قارئ الشاشة بيقول «السلة» بس، من غير ما يقول إنها بتتضغط.

وجرّبت [[<a>]] من غير href: طلع [[generic]] مش [[link]]، ومش [[focusable]]. فالـ [[href]] هو اللي بيعمل اللينك.

---

## الخلاصة

| السؤال | العنصر |
|---|---|
| الضغطة بتوديني صفحة أو جزء أو ملف؟ | [[<a href>]] |
| بتعمل حاجة في نفس المكان؟ | [[<button type="button">]] |
| بتبعت فورم؟ | [[<button type="submit">]] |
| [[<div onclick>]]؟ | لأ: مش بيتوصله بـ Tab ولا قارئ الشاشة عارف إنه بيتضغط |`,
          lines: [
            "لينك لصفحة تانية في الموقع.",
            R`لينك لجزء في نفس الصفحة: بيروح للعنصر اللي عليه [[id="pricing"]].`,
            R`يفتح في تاب جديدة. [[noopener]] بيمنع الصفحة التانية تتحكم في صفحتك عن طريق [[window.opener]].`,
            "على الموبايل بيفتح الاتصال على طول.",
            R`[[mailto:]] بيفتح برنامج الإيميل المربوط بالجهاز والعنوان مكتوب في خانة «إلى». لو مفيش برنامج إيميل متظبط الضغطة مش بتعمل حاجة، فاكتب الإيميل نفسه ظاهر جنبه.`,
            R`زرار بيعمل حاجة. [[type="button"]] عشان لو جوه فورم ميبعتهاش.`,
            "زرار بيبعت الفورم اللي هو جواها.",
            "غلط: شكله زرار بس مش بيتوصله بـ Tab ولا بيشتغل بـ Enter، وقارئ الشاشة بيقراه كلام عادي."
          ],
          sol: R`وانت بتدوس Tab: الـ focus بيروح للـ [[<button>]] على طول ويعدّي من فوق الـ [[<div>]] كأنه مش موجود، والـ Tab اللي بعده بيخرج من الصفحة (لشريط العنوان). وانت واقف على الزرار: Enter بيشغّل [[openCart()]]، و Space كمان بتشغّله (Space بتشتغل لما تسيب الزرار، مش لما تدوس).

الـ div مش هيتوصله بالكيبورد خالص، ومفيش طريقة يشتغل غير بالماوس. وفي شجرة الـ Accessibility الـ div بيبان كـ نص عادي «السلة» والزرار [[button "السلة"]]، فقارئ الشاشة مش هيقول إنه بيتضغط.

لو حد حاول يصلّح الـ div بـ [[tabindex="0"]] بس: هيتوصله بـ Tab، بس Enter و Space مش هيعملوا حاجة لحد ما تكتب keydown handler بنفسك وتضيف [[role="button"]]. ده بالظبط سبب إن الإجابة الصح في الانترفيو «استخدم button».`
        },
        {
          cmd: "form و label",
          ref: [
            { t: "WHATWG: the form element", url: "https://html.spec.whatwg.org/multipage/forms.html#the-form-element" },
            { t: "MDN: <form>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form" },
            { t: "WHATWG: the label element", url: "https://html.spec.whatwg.org/multipage/forms.html#the-label-element" },
            { t: "MDN: <label>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label" },
            { t: "WHATWG: action attribute", url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-action" },
            { t: "WHATWG: for attribute", url: "https://html.spec.whatwg.org/multipage/forms.html#attr-label-for" },
            { t: "WHATWG: method attribute", url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fs-method" },
            { t: "WHATWG: required attribute", url: "https://html.spec.whatwg.org/multipage/input.html#attr-input-required" },
            { t: "MDN: <input type=\"password\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/password" },
            { t: "MDN Curriculum: Semantic HTML", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" },
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** فورم حجز حصة تجريبية في «جيم الأبطال»: الاسم، والموبايل بـ [[pattern="01[0125][0-9]{8}"]] و [[title]] بيشرح الشكل، والإيميل، والفرع ([[<select>]])، و checkbox الموافقة. كل حقل ليه label مربوط و autocomplete مناسب.`, done: R`إرسال فاضي بيقف عند الاسم، و [[0123]] في الموبايل بيطلّع رسالة فيها كلام الـ title، و [[01012345678]] بيعدّي، و [[form.checkValidity()]] بيرجّع [[true]] بس لما كله سليم.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حجز حصة</title>
<style>
  form { display: grid; gap: 10px; max-width: 340px; font-family: system-ui; }
  label { font-weight: 600; }
  input, select { padding: 10px; font: inherit; width: 100%; box-sizing: border-box; }
  .check { display: flex; gap: 8px; align-items: center; }
  .check input { width: auto; }
</style>
</head>
<body>
<main>
<h1>احجز حصة تجريبية</h1>
<form>
  <label for="name">الاسم</label>
  <input id="name" name="name" autocomplete="name" required>

  <label for="phone">الموبايل</label>
  <input id="phone" name="phone" type="tel" dir="ltr" autocomplete="tel"
         pattern="01[0125][0-9]{8}" title="١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015" required>

  <label for="email">الإيميل</label>
  <input id="email" name="email" type="email" dir="ltr" autocomplete="email" required>

  <label for="branch">الفرع</label>
  <select id="branch" name="branch" required>
    <option value="">اختار الفرع</option>
    <option value="north">الفرع الشمالي</option>
    <option value="south">الفرع الجنوبي</option>
  </select>

  <div class="check">
    <input id="ok" name="ok" type="checkbox" required>
    <label for="ok">موافق على الشروط</label>
  </div>

  <button>احجز</button>
</form>
</main>
</body>
</html>
~~~

**اللي بيعمل الشغل:**

- [[for]] و [[id]] متساويين: الضغط على الكلمة بيركّز في الحقل، وقارئ الشاشة بيقول اسم الحقل.
- [[pattern]] لازم القيمة **كلها** تطابقه. [[01]] ثابتين، و [[[0125]]] حرف واحد من الأربعة، و [[[0-9]{8}]] ٨ أرقام.
- [[title]]: بيظهر تحت رسالة المتصفح لما الـ pattern يفشل، فاكتب فيه الشكل المطلوب بالظبط.
- [[required]] على الـ select مع [[option value=""]]: الاختيار الأول قيمته فاضية، فالمتصفح بيعتبره مش مختار.
- [[autocomplete]]: اللي بيخلي الموبايل يملا الحقل من بيانات المستخدم.

**الغلطة الشائعة:** تكتب [[type="number"]] للموبايل. الصفر اللي في الأول هيضيع، والـ pattern مش بيشتغل على number أصلًا.

~~~text الناتج
إرسال فاضي: الفحص وقف عند name  (checkValidity = false)
الموبايل 0123: valid = false  patternMismatch = true
رسالة المتصفح: Please match the requested format.
والـ title اللي بيظهر تحتها: ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015
الموبايل 01012345678: valid = true
كله مظبوط: checkValidity = true
autocomplete: name , tel , email
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم فيه [[<label for="mail">الإيميل</label><input id="email" type="email" placeholder="الإيميل">]] وحقل كلمة سر من غير [[name]]. الإيميل بيوصل للسيرفر وكلمة السر لأ، والضغط على الكلمة مش بيعمل حاجة.`, done: R`[[document.querySelector('#email').labels.length]] بقى 1 بعد ما خليت for = id، و [[new FormData(form)]] بقى فيه [[password]]، وشلت الـ placeholder اللي كان بيكرر الـ label (لأنه بيختفي أول ما تكتب).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دخول</title>
</head>
<body>
<main>
<h1>تسجيل الدخول</h1>
<form id="f">
  <label for="email">الإيميل</label>
  <input id="email" name="email" type="email" autocomplete="email">

  <label for="pass">كلمة السر</label>
  <input id="pass" name="password" type="password" autocomplete="current-password">

  <button>ادخل</button>
</form>
</main>
</body>
</html>
~~~

**التلات مشاكل وحلولها:**

- [[for="mail"]] كان بيشاور على [[id]] مش موجود، والموجود [[email]]. الربط بيطابق حرف بحرف، فحرف واحد كفاية يكسره في صمت. والضغط على الكلمة مكانش بيعمل حاجة.
- حقل من غير [[name]] مش بيتبعت خالص. الـ [[name]] هو المفتاح اللي السيرفر بيقرا بيه القيمة. و [[id]] للصفحة، و [[name]] للسيرفر.
- الـ [[placeholder]] كان نفس كلام الـ label. بيختفي أول ما تكتب، ولونه باهت، ومش بديل للـ label. استخدمه لمثال على الشكل بس.

**الغلطة الشائعة:** تعتقد إن [[id]] بيتبعت. حقل [[id="password"]] من غير [[name]] عمره ما هيوصل للسيرفر.

~~~text الناتج
قبل:
labels.length للإيميل = 0
مفاتيح FormData = email

بعد:
labels.length للإيميل = 1
مفاتيح FormData = email , password
الضغط على «الإيميل» ركّز في: email
axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** فورم GET فيه: [[name="q"]] قيمته قهوة، و input من غير name، و [[name="code"]] عليه [[disabled]]، و checkbox [[news]] مش متعلّم، و checkbox [[terms]] متعلّم. إيه اللي هيظهر في الـ URL؟`, done: R`ظهر [[q=قهوة&terms=on]] بس (في Chrome): الحقل اللي من غير name مش بيتبعت، والـ disabled مش بيتبعت، والـ checkbox اللي مش متعلّم مش بيتبعت خالص (مش [[news=off]])، والمتعلّم من غير value بيتبعت [[on]].`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث</title>
</head>
<body>
<form method="get" action="result.html">
  <input name="q" value="قهوة" aria-label="بحث">
  <input value="مش هيتبعت" aria-label="من غير name">
  <input name="code" value="X1" disabled aria-label="كود">
  <label><input type="checkbox" name="news"> الأخبار</label>
  <label><input type="checkbox" name="terms" checked> الشروط</label>
  <button>ابعت</button>
</form>
</body>
</html>
~~~

**الإجابة:** حقلين بس من الخمسة هيتبعتوا:

| الحقل | اتبعت؟ | ليه |
|---|---|---|
| [[name="q"]] | أيوه | ليه name وقيمة |
| من غير name | لأ | مفيش مفتاح يتبعت تحته |
| [[disabled]] | لأ | الـ disabled مش بيتبعت خالص |
| [[news]] مش متعلّم | لأ | الـ checkbox المش متعلّم بيختفي، مش بيبقى off |
| [[terms]] متعلّم | أيوه | من غير [[value]] قيمته [[on]] |

ولو عايز حقل المستخدم ميعدّلوش بس يتبعت، استخدم [[readonly]] مش [[disabled]].

**الغلطة الشائعة:** تكتب كود سيرفر يقرا [[news == 'off']]. القيمة دي عمرها ما هتيجي. اللي بييجي إن المفتاح مش موجود أصلًا.

والعربي في الـ URL بيتبعت متشفّر، و Chrome بيعرضه مقروء في شريط العنوان.

~~~text الناتج
location.search الخام:
?q=%D9%82%D9%87%D9%88%D8%A9&terms=on

بعد decodeURIComponent:
?q=قهوة&terms=on
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** حقلين فيهم نفس الرقم [[01001234567]]: واحد [[type="number"]] وواحد [[type="tel"]]. اضغط في كل واحد ودوس سهم لفوق.`, done: R`الـ number بقى [[1001234568]]: الصفر اللي في الأول راح والرقم زاد واحد، والـ tel فضل زي ما هو. فالموبايل ورقم البطاقة والكود البريدي [[tel]] أو [[text]] مع [[inputmode="numeric"]]، والـ number للكميات بس.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قارن</title>
</head>
<body>
<label for="n">number</label>
<input id="n" type="number" value="01001234567">
<label for="t">tel</label>
<input id="t" type="tel" value="01001234567">
</body>
</html>
~~~

اضغط في كل حقل ودوس سهم لفوق.

**ليه:** [[type="number"]] معناه «ده مقدار» زي كمية أو سعر. والمقدار مفيهوش صفر في الأول، و 1 و 01 نفس الرقم. والسهم معناه زوّد واحد. فالـ [[number]] بيتعامل مع الموبايل كرقم مليار.

أما [[tel]] فنص عادي مكتوب فيه أرقام، والموبايل بيفتح فيه لوحة الأرقام.

| البيانات | الـ type |
|---|---|
| كمية، سعر، عمر | [[number]] |
| موبايل | [[tel]] |
| رقم بطاقة، كود بريدي، كود تفعيل | [[text]] مع [[inputmode="numeric"]] |

**القاعدة السهلة:** لو هتعمل عليه جمع أو طرح، يبقى number. ولو لأ، يبقى نص.

**الغلطة الشائعة:** تسيب [[number]] عشان الموبايل يفتح لوحة أرقام. [[inputmode="numeric"]] بيعمل نفس الحاجة من غير ما يكسر القيمة.

~~~text الناتج
           قبل السهم        بعد السهم
number     01001234567      1001234568
tel        01001234567      01001234567
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من صفحة [[autocomplete]] على MDN طلّع القيم اللي تخلي المتصفح يملا فورم عنوان شحن كامل: الاسم، والشارع، والمدينة، والكود البريدي، والبلد، والتليفون.`, done: R`فورمك فيه [[name]] و [[street-address]] (أو [[address-line1]]) و [[address-level2]] و [[postal-code]] و [[country]] و [[tel]]، و Chrome عرض يملاهم كلهم مرة واحدة من عنوان محفوظ.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشحن</title>
<style>
  form { display: grid; gap: 8px; max-width: 340px; font-family: system-ui; }
  input { padding: 10px; font: inherit; }
</style>
</head>
<body>
<main>
<h1>عنوان الشحن</h1>
<form>
  <label for="n">الاسم</label>
  <input id="n" name="name" autocomplete="shipping name">

  <label for="s">الشارع</label>
  <input id="s" name="street" autocomplete="shipping address-line1">

  <label for="c">المدينة</label>
  <input id="c" name="city" autocomplete="shipping address-level2">

  <label for="z">الكود البريدي</label>
  <input id="z" name="zip" dir="ltr" autocomplete="shipping postal-code">

  <label for="co">البلد</label>
  <input id="co" name="country" autocomplete="shipping country-name">

  <label for="p">التليفون</label>
  <input id="p" name="phone" type="tel" dir="ltr" autocomplete="shipping tel">

  <button>أكمل</button>
</form>
</main>
</body>
</html>
~~~

| القيمة | معناها |
|---|---|
| [[name]] | الاسم بالكامل |
| [[address-line1]] | سطر العنوان في [[input]] عادي، وبعده [[address-line2]] لو عايز سطر تاني |
| [[street-address]] | العنوان كله في [[textarea]] بس |
| [[address-level2]] | المدينة |
| [[address-level1]] | المحافظة أو الولاية |
| [[postal-code]] | الكود البريدي |
| [[country]] أو [[country-name]] | البلد: الأولى كود زي EG، والتانية الاسم مكتوب |
| [[tel]] | التليفون |

وكلمة [[shipping]] قبل القيمة بتقول «ده عنوان الشحن»، فالمتصفح ميخلطوش بعنوان الفاتورة ([[billing]]) لو الاتنين في نفس الصفحة.

ملء Chrome من عنوان محفوظ مش ممكن يتجرب في متصفح آلي من غير بيانات حقيقية، فجزء «اتملى كله» من الوثائق. جرّبه انت على عنوان محفوظ عندك.

**الفخ اللي ظهر في التجربة:** [[street-address]] على [[input]] عادي الـ validator بيرفضها، لأن القيمة دي معناها عنوان من كذا سطر، فمكانها [[textarea]]. لو الحقل [[input]] استخدم [[address-line1]].

**الغلطة الشائعة:** تكتب [[autocomplete="off"]] على فورم الشحن عشان «الشكل ينضف». المستخدم على الموبايل هيكتب كل ده بإيده من غير داعي.

~~~text الناتج
autocomplete لكل حقل (زي ما المتصفح قراها):
name      shipping name
street    shipping address-line1
city      shipping address-level2
zip       shipping postal-code
country   shipping country-name
phone     shipping tel

validator: عدد الـ errors = 0
validator لو حطيت street-address على input: 1 error
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** label عايم من غير JavaScript: الـ label فوق الحقل كأنه placeholder، ولما تركّز أو تكتب يطلع لفوق ويصغر. الحيلة: [[placeholder=" "]] على الحقل، والـ label بعده، و [[input:focus + label, input:not(:placeholder-shown) + label]] بتحرّكه بـ transform.`, done: R`الـ label بيطلع لفوق لما تدوس على الحقل، وبيفضل فوق لو فيه كلام، وبيرجع مكانه لو مسحت الكلام وطلعت، والربط [[for]] و [[id]] لسه موجود (تاب Accessibility بيقول اسم الحقل)، وفي RTL الـ label بيبدأ من اليمين.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>label عايم</title>
<style>
  .field { position: relative; max-width: 300px; margin: 24px 16px; font-family: system-ui; }
  .field input {
    width: 100%; box-sizing: border-box;
    padding: 20px 12px 6px;
    font: inherit;
    border: 1px solid #71717a; border-radius: 8px;
  }
  .field label {
    position: absolute;
    inset-inline-start: 12px;
    top: 14px;
    color: #52525b;
    pointer-events: none;
    transform-origin: top right;
    transition: transform .15s;
  }
  .field input:focus + label,
  .field input:not(:placeholder-shown) + label {
    transform: translateY(-10px) scale(.75);
  }
</style>
</head>
<body>
<main>
<h1>العنوان</h1>
<div class="field">
  <input id="city" type="text" placeholder=" ">
  <label for="city">المدينة</label>
</div>
</main>
</body>
</html>
~~~

**الحيلة خطوة بخطوة:**

- [[placeholder=" "]] مسافة واحدة، فمش بتظهر حاجة، بس الحقل بقى عنده placeholder.
- [[:placeholder-shown]] بيبقى صحيح طول ما الـ placeholder ظاهر، يعني الحقل فاضي. فـ [[:not(:placeholder-shown)]] معناها «فيه كلام».
- الـ [[+]] بيختار العنصر اللي بعده مباشرة، فالـ label لازم يبقى **بعد** الـ input في الـ HTML. ده السبب الوحيد لكده.
- [[pointer-events: none]]: الضغط يعدّي من الـ label للحقل اللي تحته.
- [[inset-inline-start]] و [[transform-origin: top right]]: عشان يبدأ من اليمين في RTL ويصغر ناحية اليمين. في موقع بلغتين خلي الـ origin في متغير.

**الغلطة الشائعة:** تستخدم [[input:valid + label]] بدل الحيلة دي. ده بيحتاج [[required]]، وبيرجّع الـ label مكانه مع أي قيمة غلط.

~~~text الناتج
                     transform                     color
ساكن فاضي            none
بعد الضغط            matrix(0.75, 0, 0, 0.75, 0, -10)
فيه كلام وطلعت       matrix(0.75, 0, 0, 0.75, 0, -10)
مسحت وطلعت           none

اسم الحقل في تاب Accessibility: textbox "المدينة":
الـ label بيبدأ من يمين الحقل: يمين الحقل 1256 ويمين الـ label 1244
axe: 0 violations
~~~` },
          ],
          title: "فورم بيتملي صح من الموبايل ومن قارئ الشاشة",
          desc: R`كل حقل لازم يبقى ليه [[<label>]] مربوط بيه ([[for]] = [[id]] الحقل). ده بيخلي الضغط على الكلمة يركّز في الحقل، وقارئ الشاشة يقول اسم الحقل.

و [[type]] الصح بيغيّر كيبورد الموبايل ([[email]] فيه @، و [[tel]] أرقام)، و [[autocomplete]] بيخلي المتصفح يملا البيانات لوحده، و [[required]] و [[minlength]] بيعملوا validation من غير JavaScript.`,
          example: R`<form action="/api/signup" method="post">
  <label for="name">الاسم</label>
  <input id="name" name="name" autocomplete="name" required>
  <label for="email">الإيميل</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <label for="phone">الموبايل</label>
  <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr">
  <label for="pass">كلمة السر</label>
  <input id="pass" name="password" type="password" autocomplete="new-password" minlength="8">
  <label><input type="checkbox" name="terms" required> موافق على الشروط</label>
  <button type="submit">سجّل</button>
</form>`,
          try: R`افتح الفورم من الموبايل (أو DevTools وضع الموبايل) واضغط على كل حقل وشوف الكيبورد بيتغير. وبعدين دوس سجّل والحقول فاضية، وشوف رسايل المتصفح من غير ولا سطر JavaScript.`,
          flag: "script",
          deep: {
            why: "الفورم هو المكان اللي الموقع بيكسب فيه أو بيخسر: تسجيل، وشراء، وتواصل. كل حقل صعب يتملي من الموبايل أو ملوش اسم مسموع هو عميل ممكن يمشي. والعناصر الأصلية بتعمل نص الشغل لوحدها.",
            how: R`لما تدوس submit، المتصفح بيعمل validation الأول: [[required]] و [[type]] و [[minlength]] و [[pattern]] و [[min]] و [[max]]. لو فيه حاجة غلط بيوقف ويعرض رسالة جنب الحقل. لو كله تمام بيجمّع كل حقل ليه [[name]] في key=value ويبعتهم. الحقل اللي ملوش [[name]] مش بيتبعت خالص.

في React غالبًا بتعمل [[onSubmit]] وتنادي [[e.preventDefault()]] وتبعت بـ fetch، أو في Next بتستخدم Server Actions مع [[<form action={fn}>]]. في الحالتين الـ label والـ type والـ name لسه مهمين بنفس الدرجة. و [[new FormData(form)]] بيجمّع القيم بالـ name، فمش لازم state لكل حقل.

الـ validation بتاع المتصفح للراحة بس. أي حد يقدر يبعت request للسيرفر من غير الفورم، فالسيرفر لازم يعمل validation تاني (Zod مثلًا، في تاب «Backend بـ Node»).

و [[placeholder]] مش بديل للـ label: بيختفي أول ما تكتب، ولونه فاتح، وقارئات شاشة كتير مش بتعتبره اسم.`,
            when: R`أي input. حتى حقل البحث الواحد محتاج label (ممكن تخفيه بصريًا بـ [[sr-only]] في Tailwind).`,
            mistakes: R`placeholder بدل label. [[type="number"]] لرقم تليفون أو كود (بيشيل الأصفار اللي على الشمال، وفيه أسهم، والسكرول بيغيّر القيمة): استخدم [[tel]] أو [[inputmode="numeric"]]. و [[id]] متكرر في نفس الصفحة فالـ label يتربط بحقل تاني. و [[autocomplete="off"]] على الباسورد: بيضايق المستخدم ومديري كلمات السر بيتجاهلوه أصلًا.`
          },
          teach: R`## الفكرة في سطرين

فورم تسجيل فيه 4 حقول و checkbox وزرار، وكل حقل مربوط بالـ label بتاعه. المتصفح لوحده هيمنع الإرسال لو فيه حاجة ناقصة، وهيجمّع القيم ويبعتها. كل اللي تحت اتجرّب في Chrome (headless، لغته إنجليزي فالرسايل طلعت إنجليزي): ضغطت بالماوس المتقلّد، وكتبت، ودوست سجّل، وقريت رسالة كل حقل والـ request اللي اتبعت.

---

## ١. [[<form action="/api/signup" method="post">]]

- [[form]]: الصندوق اللي بيجمّع الحقول.
- [[action]]: العنوان اللي البيانات هتتبعتله.
- [[method]]: طريقة الإرسال. [[post]] بيبعت البيانات في جسم الـ request، و [[get]] (الافتراضي) بيحطها في الـ URL بعد [[?]].

---

## ٢. الربط: [[<label for="name">]] و [[<input id="name">]]

[[for]] في الـ label لازم يساوي [[id]] الحقل بالحرف. اتنين حاجات اتقاسوا:

- ضغطت على كلمة «الإيميل»، فالـ focus راح للحقل: [[document.activeElement.id]] رجع [[email]].
- في شجرة الـ accessibility كل حقل اسمه جه من الـ label بتاعه:

~~~text الناتج
textbox "الاسم" required=true
textbox "الإيميل" required=true
textbox "الموبايل" required=false
textbox "كلمة السر" required=false
checkbox "موافق على الشروط"
button "سجّل"
~~~

### الـ label اللي حوالين الـ checkbox

~~~text index.html
<label><input type="checkbox" name="terms" required> موافق على الشروط</label>
~~~

هنا مفيش [[for]] ولا [[id]]: الحقل **جوه** الـ label، وده ربط كفاية. ضغطت على الكلام «موافق» فـ [[checked]] بقى [[true]].

---

## ٣. الـ attributes على كل input

| الـ attribute | معناه |
|---|---|
| [[name="email"]] | اسم القيمة لما تتبعت. من غيره الحقل مش بيتبعت خالص |
| [[type="email"]] | النوع: بيغيّر كيبورد الموبايل وبيعمل validation |
| [[autocomplete="email"]] | بيقول للمتصفح «ده إيميل» عشان يملاه من اللي محفوظ |
| [[required]] | مينفعش يفضل فاضي. attribute من غير قيمة: وجوده كفاية |
| [[dir="ltr"]] | الرقم يتكتب من الشمال |
| [[type="password"]] | الحروف تظهر نقط |
| [[autocomplete="new-password"]] | كلمة سر جديدة، فمدير كلمات السر يقترح واحدة |
| [[minlength="8"]] | أقل عدد حروف |

وقيم [[type]] في المثال: [[email]] (كيبورد فيه @)، و [[tel]] (من telephone، كيبورد أرقام)، و [[password]]، و [[checkbox]] (مربع بيتعلّم). ولو مكتبتش type يبقى [[text]]. والكيبورد نفسه بيبان على موبايل حقيقي بس، مش في Chrome الـ headless.

---

## ٤. دوست «سجّل»: المتصفح عمل إيه؟

كل حقل فيه [[validationMessage]]: الرسالة اللي المتصفح هيعرضها (فاضية لو الحقل سليم). دي اللي اتقرت بعد كل محاولة:

| اللي عملته | الـ focus راح فين | الرسالة |
|---|---|---|
| سجّل والكل فاضي | الاسم | Please fill out this field. |
| كتبت الاسم وسجّل | الإيميل | Please fill out this field. |
| كتبت [[ahmed]] في الإيميل | الإيميل | Please include an '@' in the email address. 'ahmed' is missing an '@'. |
| إيميل سليم وكلمة سر [[abc]] | كلمة السر | Please lengthen this text to 8 characters or more (you are currently using 3 characters). |
| مسحت كلمة السر | الـ checkbox | Please check this box if you want to proceed. |

لاحظ:

- المتصفح بيقف عند **أول** حقل غلط بس، وبيحط الـ focus عليه.
- كلمة السر الفاضية عدّت، لأنها مش [[required]]. الـ [[minlength]] بيتحسب بس لو فيه كلام.
- الصفحة مراحتش لأي مكان طول ما فيه غلط ([[page.url()]] فضل [[index.html]]).

---

## ٥. لما كله سليم: إيه اللي اتبعت؟

ملّيت الموبايل وعلّمت الـ checkbox ودوست سجّل، ومسكت الـ request:

~~~text جسم الـ POST
name=Ahmed&email=ahmed%40example.com&phone=01000000000&password=&terms=on
~~~

~~~text Content-Type
application/x-www-form-urlencoded
~~~

اقراه كده:

- كل حقل [[name=value]]، وبينهم [[&]].
- المفتاح هو الـ [[name]] مش الـ [[id]]: لاحظ [[password=]] مع إن الـ id بتاعه [[pass]].
- [[%40]] هي الـ [[@]] بعد الـ encoding (حروف خاصة بتتحوّل لـ [[%]] ورقم).
- [[password=]] اتبعت فاضي، و [[terms=on]]: الـ checkbox اللي ملوش [[value]] بيتبعت [[on]].
- [[urlencoded]] يعني نفس شكل الـ query في الـ URL، بس في الجسم.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[label for]] = [[id]] | الضغط على الكلمة يركّز في الحقل، والحقل ياخد اسم |
| [[name]] | اسم القيمة في الـ request |
| [[type]] | الكيبورد والـ validation |
| [[required]] و [[minlength]] | المتصفح يمنع الإرسال ويقول السبب |
| [[autocomplete]] | المتصفح يملا لوحده |

والـ validation ده للراحة بس: السيرفر لازم يتأكد تاني.`,
          lines: [
            R`الفورم: بيتبعت لـ [[action]] بـ [[method]] POST لما تدوس submit.`,
            R`اسم الحقل. [[for]] لازم يساوي [[id]] الحقل.`,
            R`[[name]] اسم القيمة اللي بتتبعت للسيرفر، و [[autocomplete="name"]] المتصفح يملاه، و [[required]] مينفعش يفضل فاضي.`,
            R`اسم حقل الإيميل: [[for="email"]] بيربطه بالـ input اللي [[id="email"]]، فالضغط على كلمة «الإيميل» بيحط المؤشر في الحقل.`,
            R`[[type="email"]]: كيبورد فيه @، والمتصفح بيرفض أي حاجة مش شكل إيميل.`,
            R`اسم حقل الموبايل: [[for="phone"]] = [[id]] الحقل اللي بعده، وده نفس الاسم اللي بيظهر للحقل في تاب Accessibility (Name: الموبايل)، وهو اللي قارئ الشاشة بيقراه لما توصله.`,
            R`[[type="tel"]]: كيبورد أرقام. و [[dir="ltr"]] عشان الرقم ميتقلبش.`,
            R`اسم حقل كلمة السر بنفس الربط: [[for="pass"]] = [[id="pass"]]. لاحظ إن الـ id ([[pass]]) غير الـ name ([[password]]): الـ id للربط في الصفحة، والـ name للسيرفر.`,
            R`النص بيتخفي، و [[new-password]] بيخلي مدير كلمات السر يقترح واحدة قوية، و [[minlength]] أقل طول.`,
            "label حوالين الـ checkbox: ربط من غير for و id، والضغط على الكلام بيعلّم المربع.",
            R`زرار الإرسال: [[type="submit"]] بيشغّل الـ validation الأول، ولو كله سليم بيبعت الفورم لـ [[/api/signup]]. ودوس Enter في أي حقل بيعمل نفس الحاجة.`,
            R`نهاية الفورم: أي input بعدها مش هيتبعت مع البيانات، إلا لو عليه [[form="id-الفورم"]].`
          ],
          sol: R`الكيبورد: حقل الاسم كيبورد حروف عادي، والإيميل فيه [[@]] و [[.]] ظاهرين، والموبايل ([[type="tel"]]) كيبورد أرقام زي بتاع الاتصال، وكلمة السر بتظهر نقط والموبايل بيعرض يقترح كلمة سر قوية بسبب [[new-password]]. (في DevTools مش هتشوف الكيبورد نفسه؛ ده محتاج موبايل حقيقي أو محاكي Android/iOS.)

لما تدوس «سجّل» والكل فاضي: الفورم مش بيتبعت، والـ focus بيروح لحقل «الاسم» (أول حقل غلط) وفقاعة جنبه بتقول «Please fill out this field.» (أو «يُرجى ملء هذا الحقل» لو المتصفح عربي). المتصفح بيعرض رسالة واحدة بس، لأول حقل. املا الاسم ودوس تاني: الرسالة تنتقل للإيميل. اكتب [[ahmed]] في الإيميل: «Please include an '@' in the email address». ولو الكل تمام والـ checkbox مش متعلّم: «Please check this box if you want to proceed».

كلمة السر مش required، فلو سبتها فاضية مش هتعترض، بس لو كتبت 3 حروف هتقول لازم 8 على الأقل. ولو الفورم اتبعت عادي وهو فاضي، يبقى غالبًا عندك [[novalidate]] على الـ form أو الزرار [[type="button"]].`
        },
        {
          cmd: "img",
          ref: [
            { t: "MDN: Responsive images", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images" },
            { t: "WHATWG: the img element", url: "https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element" },
            { t: "MDN: <img>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" },
            { t: "WHATWG: fetchpriority attribute", url: "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-fetchpriority" },
            { t: "WHATWG: height attribute", url: "https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-height" },
            { t: "WHATWG: loading attribute", url: "https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-loading" },
            { t: "WHATWG: sizes attribute", url: "https://html.spec.whatwg.org/multipage/semantics.html#attr-link-sizes" },
            { t: "WHATWG: srcset attribute", url: "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-srcset" },
            { t: "WHATWG: width attribute", url: "https://html.spec.whatwg.org/multipage/canvas.html#attr-canvas-width" },
            { t: "MDN: px", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Numeric_data_types" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** صورة الهيرو اللي في المثال ([[400w]] و [[800w]] و [[1600w]] و [[sizes="(min-width: 768px) 50vw, 100vw"]]). احسب بإيدك أنهي ملف المتصفح هيختار على: موبايل عرضه 400 و DPR 2، وموبايل 360 و DPR 3، وكمبيوتر 1280 و DPR 1. وبعدين اتأكد من [[img.currentSrc]] في وضع الموبايل.`, done: R`الحساب: 400×2 = 800 → [[800w]]، و 360×3 = 1080 → [[1600w]] (أول ملف أكبر من المطلوب)، و 1280×0.5 = 640 → [[800w]]. و Chrome اختار نفس التلاتة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الهيرو</title>
</head>
<body>
<img src="hero-800.jpg"
     srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
     sizes="(min-width: 768px) 50vw, 100vw"
     width="1600" height="900" alt="سلة خضار طازة على ترابيزة خشب">
</body>
</html>
~~~

**الحساب خطوة بخطوة:** المتصفح بيعمل ٣ حاجات:

1. يقرا [[sizes]]: الصورة هتتعرض بعرض قد إيه على الشاشة دي؟
2. يضرب الرقم في DPR (كام بكسل حقيقي في كل px).
3. يختار أصغر ملف عرضه أكبر من الناتج أو يساويه.

| الجهاز | عرض العرض | × DPR | المطلوب | الملف |
|---|---|---|---|---|
| موبايل 400 و DPR 2 | 100vw = 400 | ×2 | 800 | [[800w]] |
| موبايل 360 و DPR 3 | 100vw = 360 | ×3 | 1080 | [[1600w]] |
| كمبيوتر 1280 و DPR 1 | 50vw = 640 | ×1 | 640 | [[800w]] |

ليه الحالة التانية ياخد [[1600w]]؟ عشان [[800w]] أقل من 1080 فهتطلع مطموسة، وأقرب ملف أكبر منها هو 1600.

**الغلطة الشائعة:** تنسى [[sizes]]. من غيرها المتصفح بيفترض إن الصورة 100vw، فعلى الكمبيوتر بياخد ملف كبير من غير داعي. والحساب بيبقى على عرض **العرض** مش عرض الشاشة.

~~~text الناتج
currentSrc من Chrome:
400 × DPR 2    →  hero-800.jpg
360 × DPR 3    →  hero-1600.jpg
1280 × DPR 1   →  hero-800.jpg
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** صفحة فيها ٢٠ صورة طول كل واحدة 300px. افتحها على عرض 360 وارتفاع 640 مرة من غير [[loading="lazy"]] ومرة بيه، وعدّ الصور اللي اتحمّلت من Network (فلتر Img) من غير ما تنزل.`, done: R`من غير lazy اتحمّلوا الـ ٢٠ كلهم، وبيه ٧ بس في Chrome على localhost: اللي في الشاشة وشوية تحتها (المتصفح بيحمّل قبل ما توصل بمسافة). الصور اللي فوق خالص متحطش عليها lazy.`, sol: R`نفس الصفحة مرتين، والفرق خاصية واحدة. حط أي صورة جنبها باسم [[photo.jpg]]، وافتح الصفحة من سيرفر محلي ([[npx serve .]]):

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>lazy</title>
<style>img { display: block; width: 100%; height: 300px; object-fit: cover; }</style>
</head>
<body>
<main id="list"></main>
<script>
  const lazy = location.search.includes('lazy');
  for (let i = 1; i <= 20; i++) {
    const img = new Image(360, 300);
    img.alt = 'صورة ' + i;
    if (lazy) img.loading = 'lazy';
    img.src = 'photo.jpg?n=' + i;
    document.querySelector('#list').append(img);
  }
$__lt/script>
</body>
</html>
~~~

افتح الصفحة مرة عادي ومرة بـ [[?lazy]]، وفلتر Network على Img.

**ليه لسه فيه صور اتحمّلت تحت الشاشة:** المتصفح بيبدأ تحميل الصورة قبل ما توصلها بمسافة، عشان تلاقيها جاهزة وانت بتنزل. المسافة دي بتتغيّر حسب سرعة النت، فالرقم على نت بطيء ممكن يختلف عن الرقم هنا.

وبالـ [[?n=1]] كل صورة ليها URL مختلف، فالمتصفح بيعدّها طلب لوحدها، زي صفحة حقيقية.

**الغلطة الشائعة:** تحط [[loading="lazy"]] على كل صور الصفحة. الصورة اللي في أول الشاشة هتتأخر من غير سبب، لأن المتصفح بيستنى الـ layout عشان يعرف إنها ظاهرة. وده بيبوّظ LCP.

~~~text الناتج
شاشة 360×640، من غير ما تنزل:
من غير lazy: اتحمّلت 20 صورة
بـ loading="lazy": اتحمّلت 20 صورة
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة منتج فيها [[alt="صورة"]] على صورة المنتج، و [[alt="IMG_2034.jpg"]] على صورة تانية، وأيقونة سلة جنب كلمة «السلة» عليها [[alt="سلة"]]، وصورة الهيرو عليها [[loading="lazy"]].`, done: R`كل alt بقى بيوصف اللي في الصورة ([[alt="سماعة لاسلكي سودا من الجنب"]])، والأيقونة اللي جنب الكلمة بقت [[alt=""]] عشان قارئ الشاشة ميقولش «السلة» مرتين، والهيرو من غير lazy وعليه [[fetchpriority="high"]]، و Lighthouse مبقاش بيقول إن صورة الـ LCP اتحمّلت lazy.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>سماعة لاسلكي</title>
<style>
  img { max-width: 100%; height: auto; }
  .cart { display: inline-flex; align-items: center; gap: 6px; }
</style>
</head>
<body>
<main>
  <img src="hero.svg" width="1200" height="600" fetchpriority="high"
       alt="سماعة لاسلكي سودا على خلفية رمادي">
  <h1>سماعة لاسلكي</h1>
  <img src="side.svg" width="600" height="600" loading="lazy"
       alt="سماعة لاسلكي سودا من الجنب، وظاهر زرار التشغيل">
  <a class="cart" href="cart.html">
    <img src="cart.svg" width="20" height="20" alt="">
    السلة
  </a>
</main>
</body>
</html>
~~~

**لكل صورة قرار:**

- [[alt="صورة"]] مبيقولش حاجة، و [[IMG_2034.jpg]] أوحش. اسأل نفسك: لو الصورة اختفت، إيه الجملة اللي تحل محلها؟
- الأيقونة جنب كلمة «السلة»: [[alt=""]] فاضية عمدًا، يعني زينة. ولو كتبت «سلة» قارئ الشاشة هيقول «سلة السلة». والـ alt الفاضي غير الـ alt الناقص: الناقص قارئ الشاشة ممكن يقرا اسم الملف.
- الهيرو: أول حاجة بتتشاف، فالـ [[loading="lazy"]] بيأخرها. و [[fetchpriority="high"]] بيقول للمتصفح «دي أهم صورة، حمّلها الأول».
- الصورة التانية تحت الشاشة، فالـ lazy عليها صح.

**الغلطة الشائعة:** تكتب [[alt="صورة سماعة"]]. كلمة «صورة» زيادة، قارئ الشاشة بيقول إنها صورة لوحده.

~~~text الناتج
عنصر LCP = hero.svg
loading بتاعه = auto   fetchPriority = high
الـ alt لكل صورة:
hero.svg    «سماعة لاسلكي سودا على خلفية رمادي»
side.svg    «سماعة لاسلكي سودا من الجنب، وظاهر زرار التشغيل»
cart.svg    «»
axe: 0 violations

Lighthouse نفسه ما اتشغّلش هنا: القياس من PerformanceObserver في Chrome،
وهو نفس الرقم اللي Lighthouse بيبني عليه تحذير الـ LCP lazy.
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** ألبوم صور رحلة متخيلة بشكل «بولارويد»: كل صورة جوه [[<figure>]] بإطار أبيض ([[padding]] أكبر من تحت)، ومايلة شوية ([[rotate: -3deg]] للفردي و [[rotate: 2deg]] للزوجي بـ [[:nth-child]])، وظل خفيف، و figcaption تحتها.`, done: R`٦ صور، كل واحدة مايلة عكس اللي جنبها، والكلام تحت كل صورة جوه figcaption، وكل صورة ليها width و height فمفيش حاجة بتتنط وهي بتحمّل (Performance مبيطلّعش layout shift).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلة الصيف</title>
<style>
  body { background: #e7e5e4; margin: 16px; font-family: system-ui; }
  .album { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 24px; max-width: 800px; margin-inline: auto; }
  figure {
    margin: 0;
    background: #fff;
    padding: 10px 10px 32px;
    box-shadow: 0 4px 12px rgb(0 0 0 / .2);
  }
  figure:nth-child(odd) { rotate: -3deg; }
  figure:nth-child(even) { rotate: 2deg; }
  img { display: block; width: 100%; height: auto; background: #a8a29e; }
  figcaption { margin-top: 8px; text-align: center; }
</style>
</head>
<body>
<main>
<h1>رحلة الصيف</h1>
<section class="album" aria-label="صور الرحلة">
  <figure><img src="1.jpg" width="300" height="300" alt="مركب صيد على شاطئ"><figcaption>أول يوم</figcaption></figure>
  <figure><img src="2.jpg" width="300" height="300" alt="جبل وقت الغروب"><figcaption>الغروب</figcaption></figure>
  <figure><img src="3.jpg" width="300" height="300" alt="سوق قديم فيه توابل"><figcaption>السوق</figcaption></figure>
  <figure><img src="4.jpg" width="300" height="300" alt="شاي على سطح بيت"><figcaption>القعدة</figcaption></figure>
  <figure><img src="5.jpg" width="300" height="300" alt="شارع ضيق بألوان"><figcaption>المشي</figcaption></figure>
  <figure><img src="6.jpg" width="300" height="300" alt="موج على صخور"><figcaption>آخر يوم</figcaption></figure>
</section>
</main>
</body>
</html>
~~~

**اللي بيعمل الشكل:**

- [[padding: 10px 10px 32px]]: فوق ويمين وشمال 10، وتحت 32، ومن هنا شكل البولارويد.
- [[:nth-child(odd)]] الفردي و [[:nth-child(even)]] الزوجي، فكل كارت عكس اللي جنبه.
- [[rotate]] خاصية مستقلة، أحسن من [[transform: rotate()]] لأنها مبتتصادمش مع transform تانية على hover.
- [[display: block]] على الصورة عشان مسافة خط الكلام تحتها تختفي.
- [[width]] و [[height]] في الـ HTML بيدّوا النسبة، و [[height: auto]] في الـ CSS بيخليها تتمط. الاتنين مع بعض بيحجزوا مكان الصورة قبل ما تتحمّل.

**الغلطة الشائعة:** تحط الدوران على [[img]] بدل [[figure]]. الصورة هتلف لوحدها وتطلع برّه الإطار.

~~~text الناتج
عدد الصور 6، وكل figure جواه figcaption: true
الدوران: -3deg , 2deg , -3deg , 2deg , -3deg , 2deg
عرض الكارت على 1280: 182px   على 360: 328px
Layout shift وصور بتتحمّل بتأخير 500ms: 0
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب [[width="100%"]] على الـ img عشان تبقى responsive، وشال الـ height. اشرحله في ٣ سطور ليه [[width]] و [[height]] في الـ HTML أرقام المقاس الحقيقي، والـ responsive بيتعمل في الـ CSS.`, done: R`الشرح فيه: الرقمين بيدّوا المتصفح النسبة قبل ما الصورة تتحمّل فيحجز مكانها، و [[width: 100%; height: auto]] في الـ CSS هي اللي بتخليها تتمط، ومن غير الـ height الكلام اللي تحتها بيتنط لما تتحمّل.`, sol: R`**الرد النموذجي لزميلك في ٣ سطور:**

~~~text الشرح
width و height في الـ HTML هما مقاس الملف الحقيقي، والمتصفح بيحسب منهم النسبة قبل ما الصورة تتحمّل، فيحجز مكانها.
الـ responsive شغل CSS: width: 100%; height: auto بيخلي الصورة تتمط مع الصفحة وبنفس النسبة.
لو شلت الـ height المتصفح ميعرفش الطول، فبيبدأ بصفر، والكلام اللي تحت الصورة بيتنط لما تتحمّل.
~~~

والكود الصح:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صورة</title>
<style>img { width: 100%; height: auto; }</style>
</head>
<body>
<img src="slow.svg" width="800" height="600" alt="ترابيزة أكل في مطعم">
<p id="after">الكلام اللي تحت الصورة</p>
</body>
</html>
~~~

**الفرق بالأرقام:** جرّبنا الكود ده على عرض 400، والصورة بتاخد ثانية عشان تتحمّل. قيسنا مكان الفقرة قبل التحميل وبعده.

**الغلطة الشائعة:** [[width="100%"]] مش قيمة سليمة في الـ HTML حاليًا: الـ validator بيرفضها، لأن الـ attribute ده بياخد عدد بكسل بس. والنسب مكانها الـ CSS.

~~~text الناتج
                             الفقرة قبل التحميل   بعد التحميل    النطّة
width و height في الـ HTML    316          316       0px
width="100%" من غير height    42          316       274px

validator على width="100%": 1 error
~~~` },
          ],
          title: "صورة بتتحمّل بسرعة ومتزقّش الصفحة",
          desc: R`[[alt]] وصف الصورة لقارئ الشاشة ولو الصورة محمّلتش، ولو الصورة زينة بس خليه فاضي [[alt=""]]. و [[width]] و [[height]] بيحجزوا مكانها قبل ما تتحمّل، فالكلام اللي تحتها ميتنطش. و [[loading="lazy"]] بيأجّل الصور اللي تحت لحد ما المستخدم يقرّب منها.

و [[srcset]] مع [[sizes]] بيدّوا المتصفح كذا مقاس من نفس الصورة، وهو يختار أصغر واحد يكفي الشاشة.`,
          example: R`<img
  src="/img/hero-800.webp"
  srcset="/img/hero-400.webp 400w, /img/hero-800.webp 800w, /img/hero-1600.webp 1600w"
  sizes="(min-width: 768px) 50vw, 100vw"
  width="1600" height="900"
  alt="فريق العمل في المكتب"
  fetchpriority="high"
>
<img src="/img/product.webp" width="400" height="400" alt="سماعة لاسلكي سودا" loading="lazy">
<img src="/img/divider.svg" alt="">`,
          try: R`افتح DevTools › Network وفلتر على Img، واعمل refresh وانت على عرض موبايل وبعدين عرض كبير: شوف أنهي ملف من الـ srcset اتحمّل. وبعدين امسح width و height من صورة، وبطّأ النت من Network › Slow 4G، وشوف الكلام بيتنط لما تتحمّل.`,
          flag: "script",
          deep: {
            why: R`الصور غالبًا أتقل حاجة في الصفحة. صورة 1600 بكسل على موبايل عرضه 400 تحميل زيادة على الفاضي. وصورة من غير مقاس بتخلي المحتوى يتنط لما تظهر، والمستخدم يدوس على الحاجة الغلط، ودي مشكلة جوجل بيقيسها اسمها CLS (درس في المستوى التالت).`,
            how: R`لما المتصفح يلاقي [[width]] و [[height]] على الصورة، بيحسب منهم [[aspect-ratio]] ويحجز المكان حتى لو الـ CSS مخلّي العرض [[100%]] والارتفاع [[auto]]. فالأرقام مش لازم تبقى الحجم اللي هتظهر بيه، لازم تبقى بنفس النسبة.

مع [[srcset]] بـ [[w]] المتصفح بيعمل حسبة: من [[sizes]] بيعرف الصورة هتاخد كام CSS pixel، ويضرب في كثافة الشاشة (موبايل غالبًا 2 أو 3)، ويختار أصغر ملف يكفي. [[sizes]] لازم تتكتب لأن المتصفح بيختار الملف قبل ما الـ CSS يتحمّل، فمش عارف الصورة هتبقى قد إيه.

[[loading="lazy"]] بيخلي المتصفح ميحمّلش الصورة غير لما تقرّب من الشاشة. بس لو حطيتها على صورة الهيرو اللي فوق، هتتأخر، ودا بيبوّظ LCP (وقت ظهور أكبر عنصر). وصورة الهيرو تاخد [[fetchpriority="high"]] عشان تتحمّل قبل غيرها.

في Next.js، [[<Image>]] من [[next/image]] بيعمل ده كله لوحده: بيطلّع مقاسات بصيغ حديثة، ويكتب srcset، و lazy افتراضيًا، ومحتاج width و height (أو [[fill]]). ولصورة الهيرو [[fetchPriority="high"]] أو [[loading="eager"]]، و [[priority]] القديمة بقت deprecated من Next 16.`,
            when: "أي صورة. الـ srcset للصور الكبيرة اللي حجمها بيتغير مع الشاشة (هيرو، وصور مقالات). الأيقونات الصغيرة والـ SVG مش محتاجينه.",
            mistakes: R`[[alt="image"]] أو اسم الملف: قارئ الشاشة هيقول «image» ومفيش فايدة. [[loading="lazy"]] على صورة الهيرو فتتأخر. صور كروت من غير width و height فالصفحة كلها تتنط. و [[srcset]] بـ [[w]] من غير [[sizes]]: المتصفح بيفترض [[100vw]] ويحمّل ملف أكبر من اللازم.`
          },
          teach: R`## الفكرة في سطرين

3 صور: صورة هيرو كبيرة فوق ليها 3 مقاسات والمتصفح يختار، وصورة منتج بتتأجّل لحد ما توصلها، وصورة زينة قارئ الشاشة يتجاهلها. جرّبتهم في Chrome (headless) من سيرفر محلي بيسجّل كل ملف بيتطلب، بمقاسات شاشة وكثافات مختلفة، ومع CSS عادي للصور:

~~~text style.css
img { max-width: 100%; height: auto; }
~~~

---

## ١. صورة الهيرو سطر سطر

### [[src="/img/hero-800.webp"]]

الملف الافتراضي، للمتصفح اللي مش فاهم [[srcset]]. و [[webp]] صيغة صور أصغر من JPEG و PNG بنفس الجودة تقريبًا.

### [[srcset="... 400w, ... 800w, ... 1600w"]]

قايمة ملفات مفصولة بفاصلة، كل ملف وجنبه عرضه الحقيقي بالبيكسل. الـ [[w]] من width: [[400w]] يعني «الملف ده عرضه 400 بيكسل».

### [[sizes="(min-width: 768px) 50vw, 100vw"]]

بتقول للمتصفح الصورة هتاخد قد إيه على الشاشة، لأنه بيختار الملف قبل ما يقرا الـ CSS:

- [[(min-width: 768px)]]: شرط، يعني «لو الشاشة 768 أو أعرض».
- [[50vw]]: [[vw]] من viewport width، و 1vw = 1% من عرض الشاشة. فـ 50vw = نص الشاشة.
- [[100vw]] الأخيرة من غير شرط: لأي حاجة تانية (الموبايل).

### المتصفح اختار إيه؟

الحسبة: (العرض من sizes) × (كثافة الشاشة DPR)، وبعدين أصغر ملف يكفي. [[DPR]] اختصار device pixel ratio: كام بيكسل حقيقي في كل CSS pixel (موبايلات كتير 2 أو 3). قريت [[currentSrc]] (الملف اللي اتختار) وسجل السيرفر:

| الشاشة | DPR | العرض المطلوب | اتحمّل |
|---|---|---|---|
| 375 | 1 | 375 × 1 = 375 | [[hero-400.webp]] |
| 375 | 2 | 375 × 2 = 750 | [[hero-800.webp]] |
| 375 | 3 | 375 × 3 = 1125 | [[hero-1600.webp]] |
| 1440 | 1 | 720 × 1 = 720 | [[hero-800.webp]] |
| 1920 | 1 | 960 × 1 = 960 | [[hero-1600.webp]] |
| 1440 | 2 | 720 × 2 = 1440 | [[hero-1600.webp]] |

وفي كل حالة السيرفر استلم طلب **واحد** بس للهيرو.

### [[width="1600" height="900"]]

مش لازم الصورة تظهر بالمقاس ده. المتصفح بياخد منهم **النسبة** بس. قست الصورة وهي لسه بتتحمّل (خليت السيرفر ميردّش عليها) على موبايل 375:

| | [[aspect-ratio]] المحسوب | مقاس الصورة | الكلام اللي تحتها عند y |
|---|---|---|---|
| مع width و height | [[auto 1600 / 900]] | 359 × 202 | 230 |
| من غيرهم | [[auto]] | 0 × 0 | 42 |

مع الأرقام، المتصفح حجز 202 بيكسل (359 × 900 ÷ 1600) قبل ما الصورة توصل. من غيرهم الكلام اتحط فوق عند 42، ولما الصورة توصل هيتزق 200 بيكسل لتحت مرة واحدة. النطة دي اسمها layout shift.

### [[alt="فريق العمل في المكتب"]]

وصف الصورة. في شجرة الـ accessibility ظهرت [[image "فريق العمل في المكتب"]].

### [[fetchpriority="high"]]

«حمّل الملف ده قبل غيره». مناسبة للصورة الكبيرة اللي فوق، لأنها أول حاجة المستخدم بيشوفها.

### [[>]] في سطر لوحده

الـ tag كان طويل فاتكسر على كذا سطر. ده عادي: الـ attributes ممكن تتفصل بسطور جديدة، والـ [[>]] بتقفل الـ opening tag.

---

## ٢. [[loading="lazy"]] على صورة المنتج

[[lazy]] يعني «متحمّلهاش لحد ما تقرّب من الشاشة». جرّبت في موبايل ارتفاعه 667:

| مكان الصورة | اتطلبت قبل الـ scroll؟ | بعد الـ scroll؟ |
|---|---|---|
| على طول (ظاهرة) | أيوه، مرة | مرة |
| تحت 3000 بيكسل فاضيين | لأ (0 طلبات) | أيوه، بعد ما نزلت |

يعني lazy مش «متأخرة دايمًا»: لو الصورة ظاهرة من الأول بتتحمّل على طول.

---

## ٣. [[alt=""]] على الفاصل

[[alt]] فاضي = «الصورة دي زينة، اتجاهلها». في شجرة الـ accessibility الصورة دي **مظهرتش خالص**، بينما الاتنين التانيين ظهروا [[image]] بأساميهم. ولو شلت [[alt]] كله (مش فاضي)، قارئ الشاشة ممكن يقرا اسم الملف.

---

## الخلاصة

| الـ attribute | بيعمل إيه |
|---|---|
| [[srcset]] + [[sizes]] | المتصفح يختار أصغر ملف يكفي الشاشة وكثافتها |
| [[width]] + [[height]] | يحجز مكان بنفس النسبة قبل التحميل |
| [[alt]] | الوصف، وفاضي للزينة |
| [[loading="lazy"]] | أجّل الصور اللي تحت. مش على صورة الهيرو |
| [[fetchpriority="high"]] | قدّم صورة الهيرو |`,
          lines: [
            "صورة الهيرو فوق في أول الشاشة.",
            "الصورة الافتراضية لو المتصفح مش فاهم srcset.",
            R`نفس الصورة بـ 3 مقاسات. [[400w]] معناها عرض الملف الحقيقي 400 بكسل.`,
            "حجم الصورة على الشاشة: نص العرض من 768 وطالع، والعرض كله على الموبايل. المتصفح بيحسب منه أنهي ملف يكفي.",
            "المقاس الأصلي. المتصفح بيحسب منه النسبة (16:9) ويحجز المكان قبل التحميل.",
            "وصف الصورة، مش «صورة» ولا اسم الملف.",
            "صورة مهمة في أول الشاشة: حمّلها قبل غيرها. ومتحطش lazy على دي.",
            R`آخر الـ img: [[>]] في سطر لوحده لأن الـ attributes كتير. الـ img void element فمفيش [[</img>]]، والـ [[>]] دي بتقفل الـ opening tag بس.`,
            R`صورة منتج تحت في الصفحة: [[lazy]] بيأجّلها لحد ما تقرّب منها.`,
            R`صورة زينة: [[alt=""]] فاضي عشان قارئ الشاشة يتجاهلها.`
          ],
          sol: R`في Network (فلتر Img)، الملف اللي بيتحمّل بيعتمد على العرض وعلى كثافة الشاشة (DPR)، لأن المتصفح بيحسب [[sizes × DPR]] وياخد أصغر صورة تكفي. قيس ده بنفسك: موبايل 375 بـ DPR 1 بياخد [[hero-400.webp]]، و DPR 2 (زي iPhone SE في DevTools) بياخد [[hero-800.webp]]، و DPR 3 بياخد [[hero-1600.webp]]. على شاشة كمبيوتر 1440 بـ DPR 1 الـ sizes بقى [[50vw]] يعني 720، فبياخد [[hero-800.webp]]؛ ولو 1920 (أو شاشة retina) بياخد [[hero-1600.webp]]. ملف واحد بس بيتحمّل كل مرة.

لو صغّرت الشاشة ولقيت المتصفح لسه مستخدم الصورة الكبيرة: ده مش غلط، Chrome لو عنده نسخة أكبر في الكاش بيستخدمها بدل ما يحمّل أصغر. اعمل refresh بـ Disable cache عشان تشوف الاختيار الحقيقي. ولو لقيت [[hero-800.webp]] دايمًا، اتأكد إن فيه [[srcset]] فعلًا وإن [[w]] مكتوبة مش [[x]].

بعد ما تمسح width و height وتعمل Slow 4G: الصفحة بتظهر والكلام اللي تحت الصورة فوق، ولما الصورة توصل الكلام بيتزق لتحت فجأة (layout shift). مع width و height المتصفح بيحجز مكان بنسبة 1600:900 من الأول والكلام مبيتحركش. والصورة التانية عليها [[loading="lazy"]]، فلو هي تحت أول شاشة مش هتلاقيها في Network لحد ما تقرب منها بالـ scroll (لو ظاهرة من الأول هتتحمّل على طول، وده طبيعي).`
        }
      ]
    }
  ]
});
