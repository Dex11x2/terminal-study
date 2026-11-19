// CSS: الخطوط والنص (وحدة من منهج syllabus/css.json)
// كل القياسات والمعاينات في الوحدة دي من Chrome 157 headless على Windows 11 (قيم getComputedStyle، وعرض وارتفاع العناصر، وصور للصفحة لما الشكل هو المهم).
// تحميل خطوط الويب (font-display و unicode-range و preload و CORS) اتقاس على سيرفر Node محلي (127.0.0.1) بيأخّر ملف الخط وبيكتب كل طلب وصله.
// اللي متقاسش هنا ومكتوب جنبه إنه من MDN: المتصفحات التانية، وشكل لينك «اتزار» (الـ headless مبيحفظش history)، والنص المخفي في أول font-display، و hyphens: auto (قاموس التقطيع مش محمّل في الـ headless).
MORE("css", [
    {
      t: "CSS: الخطوط والنص",
      l: 1,
      n: "الخط وحجمه ووزنه ومسافة السطور، وخطوط الويب، ومحاذاة النص وتكسير السطور، والخط اللي تحت الكلام والضل، والقوايم والعدّادات، وحالات اللينكات، وأول حرف والنص المتحدد، وخصائص الخط المتقدمة",
      pre: [
        { to: "css/مقدمة CSS وتنسيق العناصر", why: R`لازم تبقى عارف القاعدة بتتكتب إزاي ([[selector { property: value; }]]) وبتتربط بالصفحة إزاي` },
        { to: "css/selectors", why: R`الوحدة دي بتستخدم الـ class والـ pseudo-classes ([[:hover]]) والـ pseudo-elements ([[::before]]) اللي اتشرحوا هناك، وبتزوّد عليهم` }
      ],
      goal: [
        R`تختار خط لصفحة عربي من خطوط الجهاز بـ [[font-family]] وبدايل مترتبة، وتظبط الحجم ومسافة السطور ولون الكلام عشان الفقرة تتقري براحة.`,
        R`تتحكم في الوزن والميل بـ [[font-weight]] و [[font-style]]، وتعرف إمتى المتصفح «بيفبرك» التقيل والمايل وإزاي توقفه، وتكتب [[font]] المختصرة من غير ما تمسح حاجة بالغلط.`,
        R`تحمّل خط ويب من موقعك بـ [[@font-face]]، وتختار [[font-display]]، وتقسّم الخط بـ [[unicode-range]]، وتقرا أخطاء تحميل الخط في الـ Console.`,
        R`تحاذي النص بـ [[text-align: start]] اللي بتشتغل في العربي والإنجليزي، وتمنع أي كلمة أو لينك طويل يكسر الصفحة على الموبايل بـ [[overflow-wrap]]، وتقص العنوان الطويل بـ [[text-overflow]].`,
        R`تشكّل الخط اللي تحت الكلام بـ [[text-decoration]] وإخواتها، وتزوّد ضل بـ [[text-shadow]] من غير ما القراية تبوظ.`,
        R`تغيّر شكل علامة القايمة بـ [[list-style]] و [[::marker]]، وترقّم أي حاجة بـ [[counter()]] و [[counters()]] و [[@counter-style]]، بأرقام عربي لو عايز.`,
        R`تنسّق حالات اللينك الخمسة بالترتيب الصح ([[:link]] و [[:visited]] و [[:hover]] و [[:focus-visible]] و [[:active]]) من غير ما اللينك يبطّل يبان إنه لينك.`,
        R`تستخدم [[::first-letter]] و [[::first-line]] و [[::selection]] و [[writing-mode]]، وتشغّل خصائص الخط المتقدمة ([[font-variant-numeric: tabular-nums]]) لما الجدول يحتاجها.`
      ],
      projects: [
        { lvl: 'صغير', dir: "hebr-blog", t: R`صفحة مقال تتقري`, what: R`أول صفحة في «مدوّنة حبر» (مدوّنة متخيلة عن التعلّم)، للي هيقرا مقال من أوله لآخره على موبايل أو لابتوب. [[index.html]] فيها [[<main>]] جواه [[<article>]]: عنوان المقال [[<h1>]]، وسطر باسم الكاتبة، وتلات فقرات. و [[style.css]] فيه قاعدة واحدة على [[body]] (خطوط النظام وآخرها [[sans-serif]]، وحجم 18px، وسطور 1.8، ولون [[#1f2937]])، وعمود عرضه بحد أقصى 640px في نص الصفحة، وسطر للعنوان أضيق (1.3). من درس «font-family و font-size».`, done: R`في Computed: الفقرة 18px وسطرها 32.4px ولونها [[rgb(31, 41, 55)]]، والعنوان سطره 1.3 من حجمه. والعمود مبيزيدش عن 640px، وعلى عرض 360px مفيش سكرول بالعرض. ومفيش أي CSS جوه الـ HTML.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <article>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p>كتبت: سلمى فؤاد</p>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها أبدًا. وبعد شهرين قابلتها تاني، ومكنتش فاكرة غير إني «حلّيتها قبل كده».</p>
    <p>من يومها بقيت أكتب. سطرين في ملف، وبعدين فقرة، وبعدين مقال. الكتابة مش للناس بس، هي لنفسك اللي هتيجي بعد شهرين.</p>
    <p>والغريب إن أكتر حاجة بتتعلمها وإنت بتكتب هي إنك مكنتش فاهم قد ما إنت فاكر.</p>
  </article>
</main>
</body>
</html>
~~~

~~~css style.css
body {
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #1f2937;
  margin: 0;
  padding: 16px;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

h1 {
  line-height: 1.3;
}
~~~

~~~view 393 602 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<style>
body {
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #1f2937;
  margin: 0;
  padding: 16px;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

h1 {
  line-height: 1.3;
}
</style>
</head>
<body>
<main>
  <article>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p>كتبت: سلمى فؤاد</p>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها أبدًا. وبعد شهرين قابلتها تاني، ومكنتش فاكرة غير إني «حلّيتها قبل كده».</p>
    <p>من يومها بقيت أكتب. سطرين في ملف، وبعدين فقرة، وبعدين مقال. الكتابة مش للناس بس، هي لنفسك اللي هتيجي بعد شهرين.</p>
    <p>والغريب إن أكتر حاجة بتتعلمها وإنت بتكتب هي إنك مكنتش فاهم قد ما إنت فاكر.</p>
  </article>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- عمود كلام في نص الصفحة، مش ممدود على عرض الشاشة كله.
- الخط بقى خط واجهة النظام بدل Times New Roman، وأكبر شوية، والسطور واخدة راحتها.
- الكلام رمادي غامق، والعنوان سطوره أضيق من سطور الفقرات.

**ليه كده:**

- القاعدة كلها على [[body]] لأن الأربع خصائص بيتورّثوا (درس «font-family و font-size»).
- [[line-height: 1.8]] من غير وحدة عشان العنوان يحسبها من حجمه، وبعدها [[h1]] خد [[1.3]] لوحده لأن 1.8 كتير على خط كبير.
- [[max-width: 640px]] مع [[margin: 0 auto]]: السطر الطويل قوي متعب للعين زي السطور اللازقة. العمود ده بيطلع حوالي 12 لـ 15 كلمة عربي في السطر. (الاتنين من درس «box model».)

**الغلطة الشائعة:** تحط [[font-size]] و [[line-height]] على [[p]]. القوايم والجداول اللي هتيجي في المشاريع الجاية هيطلعوا بالخط الافتراضي.

~~~text القياس من Chrome
p      font-size: 18px     line-height: 32.4px     color: rgb(31, 41, 55)
h1     font-size: 36px     line-height: 46.8px
main   العرض 640px على شاشة واسعة، وعلى موبايل 360px: 328px (الشاشة ناقص 16px من كل ناحية)
~~~` },
        { lvl: 'صغير', dir: "hebr-blog", cont: true, t: R`العناوين وسلّم الأحجام`, what: R`زي المشروع اللي فات (نفس الملفين)، وزوّد عليه ترتيب بصري. في الـ HTML: سطر تصنيف [[.kicker]] فوق العنوان، وسطر بيانات [[.meta]] تحته (الكاتبة والتاريخ ومدة القراية)، وفقرة مقدمة [[.lead]]، وعنوانين [[<h2>]] وعنوان [[<h3>]]، وكلمة جوه [[<em>]] وجملة جوه [[<strong>]]. في الـ CSS: [[font]] المختصرة على [[body]]، وسلّم أحجام بنسبة 1.25 بين كل درجة ([[h3]] 1.25em و [[h2]] 1.56em و [[h1]] 1.95em)، وارتفاع سطر بيقل كل ما الخط يكبر، وأوزان 300 للمقدمة و 600 لـ [[h3]] و [[.kicker]]، و [[.meta]] أصغر ورمادي. وامنع الميل المفبرك على العربي وادّي [[em]] لون. من درس «font-weight و font-style».`, done: R`المحسوب: [[h1]] 35.1px و [[h2]] 28.08px و [[h3]] 22.5px. و [[.lead]] سطرها 36px. و [[em]] عليه [[font-synthesis-style: none]] ولونه بني، والكلمة العربي اللي جواه معدولة. ولو غيّرت [[18px]] على [[body]] لـ [[20px]] كل الأحجام تكبر معاها.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <article>
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها <em>أبدًا</em>. وبعد شهرين قابلتها تاني، ومكنتش فاكرة غير إني «حلّيتها قبل كده».</p>
    <h2>الحل</h2>
    <p>من يومها بقيت أكتب. سطرين في ملف، وبعدين فقرة، وبعدين مقال. <strong>مش لازم تبقى حاجة كبيرة.</strong></p>
    <h3>ملحوظة</h3>
    <p>أكتر حاجة بتتعلمها وإنت بتكتب هي إنك مكنتش فاهم قد ما إنت فاكر.</p>
  </article>
</main>
</body>
</html>
~~~

~~~css style.css
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis-style: none;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

/* سلّم الأحجام: كل درجة 1.25 من اللي تحتها */
h1 { font-size: 1.95em; line-height: 1.25; font-weight: 700; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; font-weight: 700; margin: 32px 0 8px; }
h3 { font-size: 1.25em; line-height: 1.4; font-weight: 600; margin: 24px 0 4px; }

.kicker { font-size: 0.8em; font-weight: 600; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; font-weight: 300; }

em { color: #b45309; }
~~~

~~~view 658 868 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<style>
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis-style: none;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

/* سلّم الأحجام: كل درجة 1.25 من اللي تحتها */
h1 { font-size: 1.95em; line-height: 1.25; font-weight: 700; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; font-weight: 700; margin: 32px 0 8px; }
h3 { font-size: 1.25em; line-height: 1.4; font-weight: 600; margin: 24px 0 4px; }

.kicker { font-size: 0.8em; font-weight: 600; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; font-weight: 300; }

em { color: #b45309; }
</style>
</head>
<body>
<main>
  <article>
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها <em>أبدًا</em>. وبعد شهرين قابلتها تاني، ومكنتش فاكرة غير إني «حلّيتها قبل كده».</p>
    <h2>الحل</h2>
    <p>من يومها بقيت أكتب. سطرين في ملف، وبعدين فقرة، وبعدين مقال. <strong>مش لازم تبقى حاجة كبيرة.</strong></p>
    <h3>ملحوظة</h3>
    <p>أكتر حاجة بتتعلمها وإنت بتكتب هي إنك مكنتش فاهم قد ما إنت فاكر.</p>
  </article>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- «تجارب» صغيرة وبنية فوق العنوان، وتحت العنوان سطر رمادي صغير فيه الكاتب والتاريخ.
- فقرة المقدمة أكبر وأرفع من باقي الفقرات.
- تلات مستويات عناوين واضحين من حجمهم: [[h1]] ثم [[h2]] ثم [[h3]].
- «أبدًا» بنية ومعدولة (مش مايلة)، و «مش لازم تبقى حاجة كبيرة» تقيلة.

**ليه كده:**

- **السلّم.** الأحجام مش أرقام عشوائية: كل درجة 1.25 مرة من اللي قبلها (1 ثم 1.25 ثم 1.56 ثم 1.95). النسبة الثابتة هي اللي بتخلّي العناوين تبان «عيلة واحدة». وكلها [[em]] عشان لو غيّرت [[18px]] على [[body]] السلّم كله يتحرك معاه.
- **ارتفاع السطر بيقل لما الخط يكبر:** 1.8 للفقرة، و 1.6 للمقدمة، و 1.4 و 1.3 و 1.25 للعناوين.
- **[[font]] المختصرة** على [[body]] شالت تلات سطور، و [[line-height]] جواها بعد الشرطة (درس «font-weight و font-style»).
- **[[font-synthesis-style: none]]:** [[<em>]] مايل افتراضيًا، والميل على العربي مفبرك. منعناه وادّينا [[em]] لون.
- **[[font-weight: 300]]** للمقدمة و [[600]] لـ [[h3]] بيبانوا لو خط النظام فيه الأوزان دي (Segoe UI فيه). على خط بوزنين هيتعرضوا عادي وتقيل، والصفحة تفضل سليمة.

**الغلطة الشائعة:** [[font-synthesis-style]] قبل سطر [[font]]. المختصرة مبتمسحهاش (مش من خصائصها)، بس [[line-height]] لو اتكتبت قبلها هتتمسح. خلّي [[font]] أول سطر دايمًا.

~~~text القياس من Chrome
h1      35.1px  / سطر 43.875px   وزن 700
h2      28.08px / سطر 36.504px
h3      22.5px  / سطر 31.5px     وزن 600
.lead   22.5px  / سطر 36px       وزن 300
.meta   14.4px                   color: rgb(107, 114, 128)
em      font-style: italic       font-synthesis-style: none       color: rgb(180, 83, 9)
~~~` },
        { lvl: 'متوسط', dir: "hebr-blog", cont: true, t: R`القوايم والخطوات المرقّمة`, what: R`كمّل على نفس المقال: بدّل جزء من الكلام بقايمتين. قايمة «اللي هتحتاجه» [[<ul class="needs">]] من تلات بنود، علامتها [["✓ "]] خضرا. وقايمة «الطريقة» [[<ol class="steps">]] من تلات خطوات بأرقام عربي ([[arabic-indic]]) بنية وتقيلة. وحط على [[<article>]] الـ class [[post]]، ورقّم عناوين [[<h2>]] بعدّاد CSS اسمه [[sec]] يطلّع «١. » قبل كل عنوان من غير ما تكتب الرقم. وظبّط المسافات: القوايم [[padding-inline-start: 1.5em]]، وبين كل بند والتاني نص حجم الخط. من درس «list-style و ::marker».`, done: R`العناوين مرقّمة ١ و ٢ و ٣، ولو نقلت عنوان مكان التاني في الـ HTML الأرقام بتتظبط لوحدها. والـ [[::marker]] في القايمتين ملوّن والكلام بلون الصفحة. والخطوات [[<ol>]] حقيقي (حدد الصفحة وانسخها: أرقام الخطوات بتتنسخ، وأرقام العناوين لأ).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <article class="post">
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها <em>أبدًا</em>. وبعد شهرين قابلتها تاني.</p>
    <h2>اللي هتحتاجه</h2>
    <ul class="needs">
      <li>ملف نصي واحد، في مكان إنت عارفه</li>
      <li>خمس دقايق بعد كل مشكلة تتحل</li>
      <li>عنوان يتدوّر عليه بعدين</li>
    </ul>
    <h2>الطريقة</h2>
    <ol class="steps">
      <li>اكتب المشكلة زي ما ظهرتلك، برسالة الخطأ بنصها.</li>
      <li>اكتب اللي جرّبته ومنفعش. ده بيوفّر عليك تجربه تاني.</li>
      <li>اكتب الحل، وليه اشتغل.</li>
    </ol>
  </article>
</main>
</body>
</html>
~~~

~~~css style.css
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis-style: none;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

/* سلّم الأحجام: كل درجة 1.25 من اللي تحتها */
h1 { font-size: 1.95em; line-height: 1.25; font-weight: 700; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; font-weight: 700; margin: 32px 0 8px; }
h3 { font-size: 1.25em; line-height: 1.4; font-weight: 600; margin: 24px 0 4px; }

.kicker { font-size: 0.8em; font-weight: 600; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; font-weight: 300; }

em { color: #b45309; }

/* القوايم */
ul, ol { padding-inline-start: 1.5em; margin: 8px 0 24px; }
li + li { margin-block-start: 0.5em; }

.needs { list-style-type: "✓ "; }
.needs li::marker { color: #059669; }

.steps { list-style-type: arabic-indic; }
.steps li::marker { color: #b45309; font-weight: 700; }

/* ترقيم عناوين المقال */
.post { counter-reset: sec; }
.post h2 { counter-increment: sec; }
.post h2::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }
~~~

~~~view 790 967 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<style>
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis-style: none;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

/* سلّم الأحجام: كل درجة 1.25 من اللي تحتها */
h1 { font-size: 1.95em; line-height: 1.25; font-weight: 700; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; font-weight: 700; margin: 32px 0 8px; }
h3 { font-size: 1.25em; line-height: 1.4; font-weight: 600; margin: 24px 0 4px; }

.kicker { font-size: 0.8em; font-weight: 600; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; font-weight: 300; }

em { color: #b45309; }

/* القوايم */
ul, ol { padding-inline-start: 1.5em; margin: 8px 0 24px; }
li + li { margin-block-start: 0.5em; }

.needs { list-style-type: "✓ "; }
.needs li::marker { color: #059669; }

.steps { list-style-type: arabic-indic; }
.steps li::marker { color: #b45309; font-weight: 700; }

/* ترقيم عناوين المقال */
.post { counter-reset: sec; }
.post h2 { counter-increment: sec; }
.post h2::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }
</style>
</head>
<body>
<main>
  <article class="post">
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها <em>أبدًا</em>. وبعد شهرين قابلتها تاني.</p>
    <h2>اللي هتحتاجه</h2>
    <ul class="needs">
      <li>ملف نصي واحد، في مكان إنت عارفه</li>
      <li>خمس دقايق بعد كل مشكلة تتحل</li>
      <li>عنوان يتدوّر عليه بعدين</li>
    </ul>
    <h2>الطريقة</h2>
    <ol class="steps">
      <li>اكتب المشكلة زي ما ظهرتلك، برسالة الخطأ بنصها.</li>
      <li>اكتب اللي جرّبته ومنفعش. ده بيوفّر عليك تجربه تاني.</li>
      <li>اكتب الحل، وليه اشتغل.</li>
    </ol>
  </article>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- العناوين التلاتة قدامهم «١.» و «٢.» و «٣.» بلون بني، من غير ما الأرقام تتكتب في الـ HTML.
- «اللي هتحتاجه»: تلات بنود قدام كل واحد علامة صح خضرا.
- «الطريقة»: خطوات مرقّمة ١ و ٢ و ٣ بأرقام بنية تقيلة، والكلام نفسه بلون الصفحة.
- بين كل بند والتاني فراغ أوضح من الفراغ بين سطور البند الواحد.

**ليه كده:**

- **الخطوات [[<ol>]] حقيقي** ورقمه متنسّق بـ [[::marker]]: الترتيب جزء من المعنى، فلازم يوصل لقارئ الشاشة ويتنسخ مع النص.
- **العناوين بعدّاد:** دي عناصر متفرقة في الصفحة مش قايمة، فالعدّاد هو الأداة الصح. [[counter-reset]] على [[.post]] (الأب)، و [[counter-increment]] على كل [[h2]]، و [[counter()]] جوه [[::before]] (درس «list-style و ::marker»).
- **[[arabic-indic]] في المكانين** عشان القايمة والعناوين وكلام المقال («١٢ نوفمبر») يبقوا نظام أرقام واحد.
- **[[padding-inline-start: 1.5em]]** بدل الـ 40px الافتراضية، والعلامات لسه ليها مكان تترسم فيه.
- **[[li + li]]** بتدّي المسافة للبنود اللي قبلها بند، فالقايمة متبعدش عن اللي فوقها.

**الغلطة الشائعة:** [[counter-reset: sec]] على [[h2]] نفسه. كل عنوان هيصفّر العدّاد، والتلاتة هيطلعوا «١».

~~~text القياس من Chrome
ul و ol              padding-inline-start: 27px     (1.5em من 18px)
.needs               list-style-type: "✓ "         li::marker  color: rgb(5, 150, 105)
.steps               list-style-type: arabic-indic  li::marker  font-weight: 700
.post                counter-reset: sec 0
.post h2::before     content: counter(sec, arabic-indic) ". "
~~~` },
        { lvl: 'متوسط', dir: "hebr-blog", cont: true, t: R`اللينكات والهيدر والفوتر`, what: R`كمّل على نفس الصفحة عشان تبقى صفحة في موقع. في الـ HTML: [[<header class="site">]] فيه اسم المدوّنة لينك [[.brand]] و [[<nav>]] جواه [[<ul role="list">]] بتلات لينكات، و [[<footer class="site">]] فيه سطر حقوق وإيميل [[mailto:]]، ولينكين جوه فقرة في المقال (واحد داخلي وواحد بيبدأ بـ [[https://]]). في الـ CSS: لينكات المقال بالحالات الأربعة بترتيب L-V-H-A وخط رفيع نازل [[0.3em]] بيتخن في الـ hover، وسهم بعد اللينك الخارجي، و [[:focus-visible]] بإطار لكل اللينكات. ولينكات التنقل من غير خط ولا علامات قايمة وجنب بعض، والخط بيرجع في الـ hover. والفوتر صغير ورمادي ومتوسّط. و [[overflow-wrap: break-word]] على [[body]]. من دروس «:link و :visited و :hover» و «text-decoration و text-shadow» و «white-space و overflow-wrap».`, done: R`بـ Tab بتعدّي على كل اللينكات بإطار واضح. ولينكات المقال زرقا بخط تحتها، ولينكات القايمة من غير خط لحد ما تقف عليها. وفي DevTools مع [[:visited]] و [[:hover]] مع بعض لون الـ hover هو اللي بيكسب. ولو حطيت عنوان طويل من غير مسافات كنص لينك، الصفحة على 360px مبتسكرولش بالعرض.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="site">
  <a class="brand" href="index.html">مدوّنة حبر</a>
  <nav aria-label="الرئيسية">
    <ul role="list">
      <li><a href="index.html">المقالات</a></li>
      <li><a href="about.html">عن المدوّنة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="post">
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها <em>أبدًا</em>. الفكرة دي يجب أن تبدأ من <a href="notes.html">ملف ملاحظات بسيط</a>، وفيه شرح أطول في <a href="https://example.test/guides/learning_in_public_a_practical_guide">الدليل ده</a>.</p>
    <h2>الطريقة</h2>
    <ol class="steps">
      <li>اكتب المشكلة زي ما ظهرتلك، برسالة الخطأ بنصها.</li>
      <li>اكتب اللي جرّبته ومنفعش.</li>
      <li>اكتب الحل، وليه اشتغل.</li>
    </ol>
  </article>
</main>
<footer class="site">
  <p>مدوّنة حبر · كل الحقوق محفوظة · <a href="mailto:hello@example.test">hello@example.test</a></p>
</footer>
</body>
</html>
~~~

~~~css style.css
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis-style: none;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

/* سلّم الأحجام: كل درجة 1.25 من اللي تحتها */
h1 { font-size: 1.95em; line-height: 1.25; font-weight: 700; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; font-weight: 700; margin: 32px 0 8px; }
h3 { font-size: 1.25em; line-height: 1.4; font-weight: 600; margin: 24px 0 4px; }

.kicker { font-size: 0.8em; font-weight: 600; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; font-weight: 300; }

em { color: #b45309; }

/* القوايم */
ul, ol { padding-inline-start: 1.5em; margin: 8px 0 24px; }
li + li { margin-block-start: 0.5em; }

.needs { list-style-type: "✓ "; }
.needs li::marker { color: #059669; }

.steps { list-style-type: arabic-indic; }
.steps li::marker { color: #b45309; font-weight: 700; }

/* ترقيم عناوين المقال */
.post { counter-reset: sec; }
.post h2 { counter-increment: sec; }
.post h2::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }

/* شبكة أمان: أي كلمة طويلة تتكسر بدل ما تطلع برّه */
body { overflow-wrap: break-word; }

/* لينكات المقال */
.post a { text-decoration-thickness: 1px; text-underline-offset: 0.3em; }
.post a:link { color: #0b57d0; }
.post a:visited { color: #6d28d9; }
.post a:hover { color: #1e40af; text-decoration-thickness: 3px; }
.post a:active { color: #b91c1c; }
.post a[href^="https://"]::after { content: " ↗"; }

a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }

/* الهيدر وقايمة التنقل */
header.site, footer.site { max-width: 640px; margin: 0 auto; }
header.site { border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 24px; }
.brand { font-size: 1.25em; font-weight: 700; color: #1f2937; text-decoration: none; }
header.site ul { list-style: none; padding: 0; margin: 4px 0 0; }
header.site li { display: inline-block; margin: 0; margin-inline-end: 16px; }
header.site nav a:any-link { color: #374151; text-decoration: none; }
header.site nav a:hover, header.site nav a:focus-visible { text-decoration: underline; text-underline-offset: 0.3em; }

/* الفوتر */
footer.site { border-top: 1px solid #e5e7eb; margin-top: 48px; padding-top: 8px; font-size: 0.8em; color: #6b7280; text-align: center; }
footer.site a { color: inherit; }
~~~

~~~view 796 999 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<style>
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis-style: none;
}

main {
  max-width: 640px;
  margin: 0 auto;
}

/* سلّم الأحجام: كل درجة 1.25 من اللي تحتها */
h1 { font-size: 1.95em; line-height: 1.25; font-weight: 700; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; font-weight: 700; margin: 32px 0 8px; }
h3 { font-size: 1.25em; line-height: 1.4; font-weight: 600; margin: 24px 0 4px; }

.kicker { font-size: 0.8em; font-weight: 600; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; font-weight: 300; }

em { color: #b45309; }

/* القوايم */
ul, ol { padding-inline-start: 1.5em; margin: 8px 0 24px; }
li + li { margin-block-start: 0.5em; }

.needs { list-style-type: "✓ "; }
.needs li::marker { color: #059669; }

.steps { list-style-type: arabic-indic; }
.steps li::marker { color: #b45309; font-weight: 700; }

/* ترقيم عناوين المقال */
.post { counter-reset: sec; }
.post h2 { counter-increment: sec; }
.post h2::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }

/* شبكة أمان: أي كلمة طويلة تتكسر بدل ما تطلع برّه */
body { overflow-wrap: break-word; }

/* لينكات المقال */
.post a { text-decoration-thickness: 1px; text-underline-offset: 0.3em; }
.post a:link { color: #0b57d0; }
.post a:visited { color: #6d28d9; }
.post a:hover { color: #1e40af; text-decoration-thickness: 3px; }
.post a:active { color: #b91c1c; }
.post a[href^="https://"]::after { content: " ↗"; }

a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }

/* الهيدر وقايمة التنقل */
header.site, footer.site { max-width: 640px; margin: 0 auto; }
header.site { border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 24px; }
.brand { font-size: 1.25em; font-weight: 700; color: #1f2937; text-decoration: none; }
header.site ul { list-style: none; padding: 0; margin: 4px 0 0; }
header.site li { display: inline-block; margin: 0; margin-inline-end: 16px; }
header.site nav a:any-link { color: #374151; text-decoration: none; }
header.site nav a:hover, header.site nav a:focus-visible { text-decoration: underline; text-underline-offset: 0.3em; }

/* الفوتر */
footer.site { border-top: 1px solid #e5e7eb; margin-top: 48px; padding-top: 8px; font-size: 0.8em; color: #6b7280; text-align: center; }
footer.site a { color: inherit; }
</style>
</head>
<body>
<header class="site">
  <a class="brand" href="index.html">مدوّنة حبر</a>
  <nav aria-label="الرئيسية">
    <ul role="list">
      <li><a href="index.html">المقالات</a></li>
      <li><a href="about.html">عن المدوّنة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="post">
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p>أول مرة حلّيت مشكلة قعدت فيها يوم كامل، قلت لنفسي: مش هنساها <em>أبدًا</em>. الفكرة دي يجب أن تبدأ من <a href="notes.html">ملف ملاحظات بسيط</a>، وفيه شرح أطول في <a href="https://example.test/guides/learning_in_public_a_practical_guide">الدليل ده</a>.</p>
    <h2>الطريقة</h2>
    <ol class="steps">
      <li>اكتب المشكلة زي ما ظهرتلك، برسالة الخطأ بنصها.</li>
      <li>اكتب اللي جرّبته ومنفعش.</li>
      <li>اكتب الحل، وليه اشتغل.</li>
    </ol>
  </article>
</main>
<footer class="site">
  <p>مدوّنة حبر · كل الحقوق محفوظة · <a href="mailto:hello@example.test">hello@example.test</a></p>
</footer>
</body>
</html>
~~~

**هتشوف إيه:**

- فوق: اسم المدوّنة تقيل، وتحته تلات لينكات جنب بعض من غير نقط ومن غير خط. قف على واحد: بيظهر تحته خط.
- في المقال: لينكين أزرق تحتهم خط رفيع نازل عن نقط الحروف (بص على «يجب» قبل اللينك وقارن). الخط بيتخن لما تقف. واللينك الخارجي بعده سهم.
- العنوان الطويل بتاع «الدليل ده» مش ظاهر، بس جرّب تحطه كنص لينك: هيتكسر جوه العمود بدل ما يعمل سكرول.
- تحت: سطر صغير رمادي في النص، والإيميل بنفس لون الكلام وتحته خط.
- دوس Tab: إطار أزرق بيتنقل بين اللينكات كلها بالترتيب.

**ليه كده:**

- **نوعين لينكات، بقاعدتين.** لينكات المقال ([[.post a]]) وسط كلام، فلازم خط ولون. لينكات التنقل مكانها بيقول إنها لينكات، فشيلنا الخط ورجّعناه في الـ hover والـ focus (درس «:link و :visited و :hover»).
- **الترتيب L-V-H-A** في لينكات المقال، و [[:focus-visible]] قاعدة عامة لوحدها لأنها بتغيّر [[outline]] مش اللون.
- **[[header.site nav a:any-link]]:** اللي اتزار واللي متزارش بنفس اللون في القايمة، وده مقصود هنا.
- **قايمة التنقل [[<ul>]]** من غير علامات و padding، ومعاها [[role="list"]]. البنود [[inline-block]] فمبقاش ليهم marker أصلًا.
- **[[overflow-wrap: break-word]] على [[body]]:** المدوّنة هيبقى فيها لينكات وأكواد، وسطر واحد بيحمي كل الصفحات (درس «white-space و overflow-wrap»).
- **الفوتر [[text-align: center]]:** سطر قصير واحد. فقرات المقال فضلت [[start]].

**الغلطة الشائعة:** [[a { text-decoration: none; }]] مرة واحدة للموقع كله «وبعدين نرجّعها». لينكات المقال بتتنسى، والقارئ مبيشوفهاش.

~~~text القياس من Chrome
.post a                 color: rgb(11, 87, 208)    underline    text-underline-offset: 5.4px
.post a[href^="https://"]::after     content: " ↗"
header.site nav a       color: rgb(55, 65, 81)     text-decoration-line: none
header.site ul          list-style-type: none      padding-inline-start: 0px
footer.site             font-size: 14.4px          text-align: center
صفحة 360px:             عرض الصفحة 360px (مفيش سكرول بالعرض)
~~~` },
        { lvl: 'كبير', dir: "hebr-blog", cont: true, t: R`قالب المقال الكامل وخطة خط من موقعك`, what: R`آخر محطة: القالب اللي كل مقالات «مدوّنة حبر» هتتكتب عليه. خد الهيدر والفوتر واللينكات من المشروع الرابع، والقوايم والعدّاد من التالت، وسلّم الأحجام من التاني، وزوّد: (١) خطة خط من موقعك: تعريفين [[@font-face]] لعيلة [["Hebr"]] (ملف 400 وملف 700 في فولدر [[fonts/]]، و [[font-display: swap]])، و [[<link rel="preload">]] للملف الأساسي في الـ [[<head>]]، و «Hebr» أول قايمة [[font-family]] وبعده خطوط النظام، و [[font-synthesis: none]]. (٢) اقتباس [[<blockquote>]] بخط أكبر وشريط على ناحية البداية. (٣) سطر كود طويل جوه [[<pre><code>]] بيلف وميطلعش برّه. (٤) جدول صغير بأرقام محاذية للنهاية وبعرض موحّد. (٥) أول سطر من المقدمة تقيل، وأول حرف من أول فقرة ملوّن من غير ما الكلمة العربي تتفك. (٦) لون [[::selection]] للموقع. ملفات الخط نفسها مش مطلوبة عشان تخلّص: من غيرها لازم الصفحة تفضل سليمة بالبدايل. من كل دروس الوحدة.`, done: R`الصفحة من غير فولدر [[fonts]] بتتعرض كاملة بخط النظام، و Console مفيهوش غير خطأ ملفين الخط. وعلى 360px مفيش سكرول بالعرض مع الأمر الطويل والجدول. وأرقام الجدول متراصة. وأول كلمة في الفقرة الأولى متصلة وأول حرف فيها ملوّن. وبالكيبورد كل لينك ليه إطار. وفي ملف الـ CSS مفيش [[letter-spacing]] ولا [[text-align: right]] ولا [[left]].`, ext: R`حط ملفين woff2 حقيقيين لخط رخصته OFL وجرّب: Network ثم Font لازم يوريك طلبين بس. وبعدين عرّف بديل متظبّط ([[@font-face]] بـ [[local()]] و [[size-adjust]]) لحد ما التبديل ميحرّكش السطور. واعمل صفحة تانية [[about.html]] بنفس [[style.css]] وتأكد إن مفيش قاعدة محتاجة تتعدّل.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<link rel="preload" href="fonts/hebr-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="site">
  <a class="brand" href="index.html">مدوّنة حبر</a>
  <nav aria-label="الرئيسية">
    <ul role="list">
      <li><a href="index.html">المقالات</a></li>
      <li><a href="about.html">عن المدوّنة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="post">
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p class="first">كل مرة بحل مشكلة بقول لنفسي: مش هنساها <em>أبدًا</em>. وبعد شهرين بقابلها تاني. الفكرة يجب أن تبدأ من <a href="notes.html">ملف ملاحظات بسيط</a>، وفيه شرح أطول في <a href="https://example.test/guides/learning_in_public">الدليل ده</a>.</p>
    <blockquote>
      <p>اللي متكتبش، محصلش.</p>
    </blockquote>
    <h2>الطريقة</h2>
    <ol class="steps">
      <li>اكتب المشكلة زي ما ظهرتلك، برسالة الخطأ بنصها.</li>
      <li>اكتب اللي جرّبته ومنفعش.</li>
      <li>اكتب الحل، وليه اشتغل.</li>
    </ol>
    <p>وأول ملاحظة ممكن تبقى أمر واحد:</p>
<pre><code>git log --oneline --since="2 weeks ago" --author="salma" -- notes/</code></pre>
    <h2>بعد شهر</h2>
    <table>
      <caption>عدد الملاحظات والوقت اللي اتوفّر</caption>
      <tr><th>الأسبوع</th><th>ملاحظات</th><th>دقايق اتوفّرت</th></tr>
      <tr><td>الأول</td><td class="num">4</td><td class="num">35</td></tr>
      <tr><td>التاني</td><td class="num">11</td><td class="num">110</td></tr>
      <tr><td>التالت</td><td class="num">18</td><td class="num">1,015</td></tr>
    </table>
  </article>
</main>
<footer class="site">
  <p>مدوّنة حبر · كل الحقوق محفوظة · <a href="mailto:hello@example.test">hello@example.test</a></p>
</footer>
</body>
</html>
~~~

~~~css style.css
/* ١. خط المدوّنة: ملفين woff2 في فولدر fonts/ جنب الملف ده */
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

/* ٢. الأساس */
body {
  font: 18px/1.8 "Hebr", system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis: none;
  overflow-wrap: break-word;
}
::selection { background: #fde68a; color: #111; }
main, header.site, footer.site { max-width: 640px; margin: 0 auto; }

/* ٣. سلّم الأحجام */
h1 { font-size: 1.95em; line-height: 1.25; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; margin: 32px 0 8px; }
.kicker { font-size: 0.8em; font-weight: 700; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; }
.lead::first-line { font-weight: 700; }
.first::first-letter { color: #b45309; font-weight: 700; }
em { color: #b45309; }

/* ٤. القوايم والعدّاد */
ul, ol { padding-inline-start: 1.5em; margin: 8px 0 24px; }
li + li { margin-block-start: 0.5em; }
.steps { list-style-type: arabic-indic; }
.steps li::marker { color: #b45309; font-weight: 700; }
.post { counter-reset: sec; }
.post h2 { counter-increment: sec; }
.post h2::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }

/* ٥. اللينكات */
.post a { text-decoration-thickness: 1px; text-underline-offset: 0.3em; }
.post a:link { color: #0b57d0; }
.post a:visited { color: #6d28d9; }
.post a:hover { color: #1e40af; text-decoration-thickness: 3px; }
.post a:active { color: #b91c1c; }
.post a[href^="https://"]::after { content: " ↗"; }
a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }

/* ٦. الاقتباس والكود والجدول */
blockquote { margin: 24px 0; padding-inline-start: 16px; border-inline-start: 4px solid #b45309; font-size: 1.25em; line-height: 1.6; }
blockquote p { margin: 0; }
pre { background: #f3f4f6; padding: 12px; direction: ltr; text-align: left; white-space: pre-wrap; tab-size: 2; }
code { font-family: Consolas, "Courier New", monospace; font-size: 0.85em; font-variant-ligatures: none; }
table { border-collapse: collapse; width: 100%; }
caption { text-align: start; font-size: 0.8em; color: #6b7280; padding-bottom: 4px; }
th, td { border-bottom: 1px solid #e5e7eb; padding: 6px 8px; text-align: start; }
td.num { text-align: end; font-variant-numeric: tabular-nums; }

/* ٧. الهيدر والفوتر */
header.site { border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 24px; }
.brand { font-size: 1.25em; font-weight: 700; color: #1f2937; text-decoration: none; }
header.site ul { list-style: none; padding: 0; margin: 4px 0 0; }
header.site li { display: inline-block; margin: 0; margin-inline-end: 16px; }
header.site nav a:any-link { color: #374151; text-decoration: none; }
header.site nav a:hover, header.site nav a:focus-visible { text-decoration: underline; text-underline-offset: 0.3em; }
footer.site { border-top: 1px solid #e5e7eb; margin-top: 48px; padding-top: 8px; font-size: 0.8em; color: #6b7280; text-align: center; }
footer.site a { color: inherit; }
~~~

~~~view 1275 1510 شكل القالب (بخط النظام: المعاينة مفيهاش ملفات خطوط)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ليه بنكتب اللي اتعلمناه؟ | مدوّنة حبر</title>
<style>
/* ١. خط المدوّنة: ملفين woff2 في فولدر fonts/ جنب الملف ده */
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

/* ٢. الأساس */
body {
  font: 18px/1.8 "Hebr", system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 16px;
  font-synthesis: none;
  overflow-wrap: break-word;
}
::selection { background: #fde68a; color: #111; }
main, header.site, footer.site { max-width: 640px; margin: 0 auto; }

/* ٣. سلّم الأحجام */
h1 { font-size: 1.95em; line-height: 1.25; margin: 0 0 8px; }
h2 { font-size: 1.56em; line-height: 1.3; margin: 32px 0 8px; }
.kicker { font-size: 0.8em; font-weight: 700; color: #b45309; margin: 0; }
.meta { font-size: 0.8em; color: #6b7280; margin: 0 0 24px; }
.lead { font-size: 1.25em; line-height: 1.6; }
.lead::first-line { font-weight: 700; }
.first::first-letter { color: #b45309; font-weight: 700; }
em { color: #b45309; }

/* ٤. القوايم والعدّاد */
ul, ol { padding-inline-start: 1.5em; margin: 8px 0 24px; }
li + li { margin-block-start: 0.5em; }
.steps { list-style-type: arabic-indic; }
.steps li::marker { color: #b45309; font-weight: 700; }
.post { counter-reset: sec; }
.post h2 { counter-increment: sec; }
.post h2::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }

/* ٥. اللينكات */
.post a { text-decoration-thickness: 1px; text-underline-offset: 0.3em; }
.post a:link { color: #0b57d0; }
.post a:visited { color: #6d28d9; }
.post a:hover { color: #1e40af; text-decoration-thickness: 3px; }
.post a:active { color: #b91c1c; }
.post a[href^="https://"]::after { content: " ↗"; }
a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }

/* ٦. الاقتباس والكود والجدول */
blockquote { margin: 24px 0; padding-inline-start: 16px; border-inline-start: 4px solid #b45309; font-size: 1.25em; line-height: 1.6; }
blockquote p { margin: 0; }
pre { background: #f3f4f6; padding: 12px; direction: ltr; text-align: left; white-space: pre-wrap; tab-size: 2; }
code { font-family: Consolas, "Courier New", monospace; font-size: 0.85em; font-variant-ligatures: none; }
table { border-collapse: collapse; width: 100%; }
caption { text-align: start; font-size: 0.8em; color: #6b7280; padding-bottom: 4px; }
th, td { border-bottom: 1px solid #e5e7eb; padding: 6px 8px; text-align: start; }
td.num { text-align: end; font-variant-numeric: tabular-nums; }

/* ٧. الهيدر والفوتر */
header.site { border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 24px; }
.brand { font-size: 1.25em; font-weight: 700; color: #1f2937; text-decoration: none; }
header.site ul { list-style: none; padding: 0; margin: 4px 0 0; }
header.site li { display: inline-block; margin: 0; margin-inline-end: 16px; }
header.site nav a:any-link { color: #374151; text-decoration: none; }
header.site nav a:hover, header.site nav a:focus-visible { text-decoration: underline; text-underline-offset: 0.3em; }
footer.site { border-top: 1px solid #e5e7eb; margin-top: 48px; padding-top: 8px; font-size: 0.8em; color: #6b7280; text-align: center; }
footer.site a { color: inherit; }
</style>
</head>
<body>
<header class="site">
  <a class="brand" href="index.html">مدوّنة حبر</a>
  <nav aria-label="الرئيسية">
    <ul role="list">
      <li><a href="index.html">المقالات</a></li>
      <li><a href="about.html">عن المدوّنة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="post">
    <p class="kicker">تجارب</p>
    <h1>ليه بنكتب اللي اتعلمناه؟</h1>
    <p class="meta">كتبت: سلمى فؤاد · ١٢ نوفمبر · ٤ دقايق قراية</p>
    <p class="lead">الكتابة مش للناس بس. هي لنفسك اللي هتيجي بعد شهرين ومش فاكرة حاجة.</p>
    <h2>المشكلة</h2>
    <p class="first">كل مرة بحل مشكلة بقول لنفسي: مش هنساها <em>أبدًا</em>. وبعد شهرين بقابلها تاني. الفكرة يجب أن تبدأ من <a href="notes.html">ملف ملاحظات بسيط</a>، وفيه شرح أطول في <a href="https://example.test/guides/learning_in_public">الدليل ده</a>.</p>
    <blockquote>
      <p>اللي متكتبش، محصلش.</p>
    </blockquote>
    <h2>الطريقة</h2>
    <ol class="steps">
      <li>اكتب المشكلة زي ما ظهرتلك، برسالة الخطأ بنصها.</li>
      <li>اكتب اللي جرّبته ومنفعش.</li>
      <li>اكتب الحل، وليه اشتغل.</li>
    </ol>
    <p>وأول ملاحظة ممكن تبقى أمر واحد:</p>
<pre><code>git log --oneline --since="2 weeks ago" --author="salma" -- notes/</code></pre>
    <h2>بعد شهر</h2>
    <table>
      <caption>عدد الملاحظات والوقت اللي اتوفّر</caption>
      <tr><th>الأسبوع</th><th>ملاحظات</th><th>دقايق اتوفّرت</th></tr>
      <tr><td>الأول</td><td class="num">4</td><td class="num">35</td></tr>
      <tr><td>التاني</td><td class="num">11</td><td class="num">110</td></tr>
      <tr><td>التالت</td><td class="num">18</td><td class="num">1,015</td></tr>
    </table>
  </article>
</main>
<footer class="site">
  <p>مدوّنة حبر · كل الحقوق محفوظة · <a href="mailto:hello@example.test">hello@example.test</a></p>
</footer>
</body>
</html>
~~~

**شجرة الملفات:**

~~~text hebr-blog/
hebr-blog/
├── index.html
├── style.css
└── fonts/
    ├── hebr-regular.woff2      (الوزن 400)
    ├── hebr-bold.woff2         (الوزن 700)
    └── OFL.txt                 (رخصة الخط)
~~~

**هتشوف إيه (في المعاينة هنا، ومن غير ملفات الخط):**

- الصفحة كاملة: هيدر، ومقال، وفوتر، بخط النظام. «Hebr» مش موجود في المعاينة، فالبدايل اللي في القايمة هي اللي اتعرضت. ده بالظبط اللي الزائر هيشوفه في أول لحظة قبل ما الخط ينزل، أو لو الخط فشل.
- أول سطر من المقدمة تقيل، وأول حرف في الفقرة الأولى (الكاف) بني والكلمة لسه متصلة.
- اقتباس بخط أكبر وعلى يمينه شريط بني.
- أمر [[git]] الطويل لف جوه الصندوق الرمادي ومخرجش برّه.
- في الجدول الأرقام محاذية للشمال ومتراصة: آحاد تحت آحاد.
- حدد أي كلام: خلفية صفرا.

**ترتيب البناء:**

1. انسخ [[index.html]] و [[style.css]] من المشروع اللي فات.
2. زوّد في الـ HTML: الاقتباس، والـ [[<pre>]]، والجدول، و class [[first]] على أول فقرة، وسطر الـ preload في الـ [[<head>]].
3. في الـ CSS: القسم ١ (الخط) فوق كل حاجة، وغيّر أول اسم في [[font]] بتاعة [[body]].
4. زوّد القسم ٦ (الاقتباس والكود والجدول) و [[::selection]] و [[::first-line]] و [[::first-letter]].
5. اعمل فولدر [[fonts]] وحط فيه ملفين woff2 لخط رخصته بتسمح (وغيّر أساميهم لنفس الأسامي). من غيرهم الصفحة شغالة بخط النظام.

**خطة الخط، وليه كل قرار:**

| القرار | السبب | الدرس |
|---|---|---|
| ملفين بس (400 و 700) | كل ملف بيتحمّل. العناوين و [[<strong>]] ياخدوا 700، والباقي 400 | «@font-face و font-display» |
| [[font-weight]] على كل تعريف | من غيره الملفين يبقوا «400» والأخير يغلب | نفس الدرس |
| [[font-display: swap]] | الكلام يتقري فورًا بخط النظام | نفس الدرس |
| preload للـ regular ومعاه [[crossorigin]] | الخط الأساسي يبدأ ينزل بدري. من غير [[crossorigin]] ينزل مرتين | نفس الدرس |
| البدايل بعد «Hebr» | أول ثانية، ولو الخط فشل | «font-family و font-size» |
| [[font-synthesis: none]] | مفيش ملف مايل ولا 300 ولا 600، فمنعنا أي فبركة. عشان كده [[.kicker]] بقى 700 والمقدمة 400 | «font-weight و font-style» |
| مفيش [[letter-spacing]] ولا drop cap بـ [[float]] | بيبوّظوا العربي | «text-align و text-transform» و «::first-letter و ::selection» |

**الفرق عن المشروع اللي فات في الأوزان:** هناك استخدمنا 300 و 600 لأن خط النظام فيه الأوزان دي. هنا الخط ملفين بس، فالتصميم اتظبط على وزنين. ده قرار بيتاخد مع الخط، مش بعده.

**الغلطة الشائعة:** تجرّب الصفحة على جهازك والخط متسطّب عندك، فتفتكر إن [[@font-face]] شغالة والمسار غلط. افتح Network، ثم Font: لازم تشوف الطلبين بحالة 200.

~~~text القياس من Chrome (من غير ملفات الخط)
body          font-family: Hebr, system-ui, "Segoe UI", Tahoma, sans-serif      font-synthesis: none
.lead::first-line     font-weight: 700
.first::first-letter  color: rgb(180, 83, 9)     float: none
pre           white-space: pre-wrap      tab-size: 2
td.num        text-align: end            font-variant-numeric: tabular-nums
document.fonts:  "Hebr" 400 error ،  "Hebr" 700 error     ← متوقّع هنا: مفيش ملفات. والصفحة سليمة بالبدايل
صفحة 360px:   عرض الصفحة 360px (مفيش سكرول بالعرض)
~~~

~~~text ترتيب الطلبات المتوقّع بملفين حقيقيين (من قياسات درس «@font-face و font-display» على السيرفر المحلي)
GET /index.html
GET /fonts/hebr-regular      ← بالـ preload، قبل أي حاجة تانية
GET /fonts/hebr-bold         ← لما المتصفح لقى العناوين
~~~` },
        { lvl: 'فكرة', dir: "poem-card", t: R`دعوة لأمسية شعرية`, what: R`صفحة واحدة بتتبعت لينك في رسالة: دعوة لأمسية شعرية في مكتبة (متخيلة). كارت في نص الصفحة فيه: كلمة «دعوة» صغيرة، وعنوان الأمسية، وأربع أبيات (مكتوبين في الـ HTML كل بيت في سطر **من غير** [[<br>]])، وتلات معلومات (اليوم والساعة والمكان) في قايمة، ولينك «أكّد حضورك» بيفتح إيميل. القرار قرارك في الشكل، بشرط: كل تنسيق نص من الوحدة دي، ومفيش حاجة بتبوّظ العربي ([[letter-spacing]]، drop cap بـ [[float]]، ميل مفبرك). الحل نسخة واحدة ممكنة وليه اتعملت كده.`, done: R`الأبيات على أربع سطور ومفيش [[<br>]] في الكود. والمعلومات التلاتة بادئين من نفس الحافة. واللينك باين إنه بيتداس من غير ما تقف عليه، وليه شكل في الـ hover والـ focus. وعلى 360px الكارت جوه الشاشة.`, ext: R`اعمل نسخة إنجليزي من نفس الدعوة بـ [[dir="ltr"]] و [[lang="en"]] على [[<html>]] ومن غير ما تغيّر ولا سطر في [[style.css]]: لو فيه حاجة راحت للناحية الغلط، يبقى فيه [[left]] أو [[right]] لازم تتبدّل بـ [[start]] أو [[end]]. وبعدين زوّد للنسخة الإنجليزي بس عنوان بحروف كبيرة ومسافة بين الحروف بـ [[:lang(en)]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دعوة: أمسية شعرية</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="card">
  <p class="kind">دعوة</p>
  <h1>أمسية شعرية</h1>
  <p class="poem">على قدّ الورق بنكتب
وعلى قدّ الحلم بنطير
والكلمة لو طلعت من القلب
تعدّي البحر من غير جسور</p>
  <ul class="info" role="list">
    <li><span>اليوم</span> الخميس ٢٠ نوفمبر</li>
    <li><span>الساعة</span> ٧ مساءً</li>
    <li><span>المكان</span> مكتبة الورّاق، ٧ شارع المحطة</li>
  </ul>
  <p class="rsvp"><a href="mailto:evening@example.test">أكّد حضورك</a></p>
</main>
</body>
</html>
~~~

~~~css style.css
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  background: #fffbeb;
  margin: 0;
  padding: 16px;
  overflow-wrap: break-word;
}

.card {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #b45309;
  background: white;
  text-align: center;
}

.kind { margin: 0; font-size: 0.8em; font-weight: 700; color: #b45309; word-spacing: 0.3em; }

h1 { margin: 0 0 16px; font-size: 2em; line-height: 1.3; text-shadow: 0 2px 0 #fde68a; }

.poem {
  white-space: pre-line;
  font-size: 1.1em;
  line-height: 2.1;
  margin: 0 0 16px;
}
.poem::first-line { font-weight: 700; }

.info {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  text-align: start;
  border-block: 1px solid #e5e7eb;
  padding-block: 8px;
}
.info li + li { margin-block-start: 4px; }
.info span { display: inline-block; min-width: 4em; font-size: 0.8em; color: #6b7280; }

.rsvp { margin: 0; }
.rsvp a:link, .rsvp a:visited { color: #b45309; }
.rsvp a { font-weight: 700; text-decoration: underline 2px; text-underline-offset: 0.35em; }
.rsvp a:hover { text-decoration-thickness: 4px; }
.rsvp a:focus-visible { outline: 2px solid #b45309; outline-offset: 4px; }
~~~

~~~view 525 557 شكل الدعوة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دعوة: أمسية شعرية</title>
<style>
body {
  font: 18px/1.8 system-ui, "Segoe UI", Tahoma, sans-serif;
  color: #1f2937;
  background: #fffbeb;
  margin: 0;
  padding: 16px;
  overflow-wrap: break-word;
}

.card {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #b45309;
  background: white;
  text-align: center;
}

.kind { margin: 0; font-size: 0.8em; font-weight: 700; color: #b45309; word-spacing: 0.3em; }

h1 { margin: 0 0 16px; font-size: 2em; line-height: 1.3; text-shadow: 0 2px 0 #fde68a; }

.poem {
  white-space: pre-line;
  font-size: 1.1em;
  line-height: 2.1;
  margin: 0 0 16px;
}
.poem::first-line { font-weight: 700; }

.info {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  text-align: start;
  border-block: 1px solid #e5e7eb;
  padding-block: 8px;
}
.info li + li { margin-block-start: 4px; }
.info span { display: inline-block; min-width: 4em; font-size: 0.8em; color: #6b7280; }

.rsvp { margin: 0; }
.rsvp a:link, .rsvp a:visited { color: #b45309; }
.rsvp a { font-weight: 700; text-decoration: underline 2px; text-underline-offset: 0.35em; }
.rsvp a:hover { text-decoration-thickness: 4px; }
.rsvp a:focus-visible { outline: 2px solid #b45309; outline-offset: 4px; }
</style>
</head>
<body>
<main class="card">
  <p class="kind">دعوة</p>
  <h1>أمسية شعرية</h1>
  <p class="poem">على قدّ الورق بنكتب
وعلى قدّ الحلم بنطير
والكلمة لو طلعت من القلب
تعدّي البحر من غير جسور</p>
  <ul class="info" role="list">
    <li><span>اليوم</span> الخميس ٢٠ نوفمبر</li>
    <li><span>الساعة</span> ٧ مساءً</li>
    <li><span>المكان</span> مكتبة الورّاق، ٧ شارع المحطة</li>
  </ul>
  <p class="rsvp"><a href="mailto:evening@example.test">أكّد حضورك</a></p>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- كارت أبيض بإطار بني في نص الصفحة على خلفية كريمي، وكل اللي فيه متوسّط.
- «دعوة» صغيرة وبنية، وتحتها العنوان كبير وتحته ضل أصفر حاد.
- القصيدة أربع سطور تحت بعض، والسطر الأول تقيل.
- تلات سطور معلومات محاذية لليمين بين خطّين، وأول كلمة في كل سطر رمادي صغيرة والتلاتة بنفس العرض.
- «أكّد حضورك» بني وتحته خط تخين نازل، وبيتخن أكتر لما تقف عليه.

**ليه التصميم ده (نسخة واحدة من نسخ كتير ممكنة):**

- **[[white-space: pre-line]] للقصيدة:** السطور مكتوبة في الـ HTML كل واحد في سطر، من غير [[<br>]]. تغيير بيت أسهل، والـ HTML يتقري.
- **[[::first-line]] بدل class على أول بيت:** أول سطر هيفضل هو التقيل حتى لو القصيدة اتغيّرت.
- **التوسيط على الكارت، و [[text-align: start]] على المعلومات:** سطور قصيرة (عنوان، أبيات) بتتوسّط حلو. معلومات بتتقارن ببعض (يوم، ساعة، مكان) لازم ليها حافة مستقيمة.
- **[[word-spacing]] مش [[letter-spacing]]** على «دعوة» ولو كانت كلمتين: الأولى آمنة على العربي والتانية لأ. ومفيش [[text-transform]] لأنها ملهاش أثر.
- **ضل حاد بإزاحة صغيرة** (2px ومن غير تمويه): زينة للعنوان من غير ما النقط تتكرر وتلخبط.
- **اللينك زرار من غير ما يبقى زرار:** لون ووزن وخط تخين. هو لينك [[mailto:]] فمعناه لينك، وشكله بيقول «دوس هنا».
- **[[:link]] و [[:visited]] بنفس اللون:** ده لينك فعل (ابعت إيميل) مش لينك صفحة، فـ «اتزار» ملهاش معنى مفيد هنا.
- **ارتفاع سطر 2.1 للقصيدة:** أوسع من المقال، لأن كل سطر بيت مستقل والعين محتاجة تقف بعده.

**الغلطة الشائعة:** توسيط سطور المعلومات مع باقي الكارت. «اليوم» و «الساعة» و «المكان» هيبدأوا من تلات أماكن مختلفة، والعين مش هتلاقيهم.

~~~text القياس من Chrome
.poem              white-space: pre-line     line-height: 41.58px    (19.8px × 2.1)
.poem::first-line  font-weight: 700
h1                 text-shadow: rgb(253, 230, 138) 0px 2px 0px
.info              list-style-type: none     text-align: start
.rsvp a            color: rgb(180, 83, 9)    text-decoration-thickness: 2px    text-underline-offset: 6.3px
صفحة 360px:        عرض الصفحة 360px
~~~` }
      ],
      items: [
        {
          cmd: "font-family و font-size",
          title: "الخط نفسه وحجمه ومسافة السطور ولون الكلام",
          ref: [
            { t: "MDN: font-family", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-family" },
            { t: "MDN: font-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size" },
            { t: "MDN: line-height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height" },
            { t: "MDN: color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color" },
            { t: "MDN Curriculum: CSS text styling", url: "https://developer.mozilla.org/en-US/curriculum/core/css-text-styling/" }
          ],
          desc: R`أربع خصائص بتحدد الفقرة هتتقري براحة ولا لأ: [[font-family]] (أنهي خط)، و [[font-size]] (حجمه)، و [[line-height]] (المسافة بين السطور)، و [[color]] (لون الكلام). والأربعة بيتورّثوا: تكتبهم مرة على [[body]] والصفحة كلها تاخدهم.
من غيرهم المتصفح بيعرض بخط Times New Roman حجمه 16px وسطوره لازقة في بعض، وده مش مريح للعربي.`,
          example: R`body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
body { font-size: 18px; }
body { line-height: 1.8; }
body { color: #1f2937; }
h1 { font-size: 2em; line-height: 1.3; }
code { font-family: Consolas, "Courier New", monospace; }
button, input { font: inherit; }`,
          flag: "script",
          lines: [
            R`قايمة خطوط بالترتيب: [[system-ui]] (خط واجهة النظام نفسه)، ولو مش موجود [[Segoe UI]]، وبعده [[Tahoma]]، وآخر حاجة [[sans-serif]]: أي خط من غير زوايد يختاره المتصفح. الاسم اللي فيه مسافة بيتحط بين علامتين تنصيص.`,
            R`حجم الخط الأساسي للصفحة كلها 18px بدل 16px الافتراضي. الحرف العربي بيبان أصغر من اللاتيني في نفس الحجم، فالفقرة العربي بتستريح عند 17 لـ 19.`,
            R`مسافة السطر 1.8 من حجم الخط، يعني [[18 × 1.8 = 32.4px]]. الرقم من غير وحدة عشان كل عنصر يحسبها من حجم خطه هو.`,
            R`لون الكلام رمادي غامق قوي بدل الأسود الصريح. بيتورّث لكل اللي جوه [[body]] إلا اللينكات والأزرار (ليهم ألوانهم).`,
            R`العنوان ضعف حجم خط أبوه ([[2em]] = 36px هنا)، وسطوره أضيق (1.3) لأن الخط الكبير مش محتاج مسافة كبيرة.`,
            R`الكود بخط كل حروفه نفس العرض: [[Consolas]]، وبديله [[Courier New]]، وآخر حاجة العيلة العامة [[monospace]].`,
            R`الأزرار والحقول مبياخدوش خط الصفحة لوحدهم (بيفضلوا Arial 13.33px). [[font: inherit]] بتخليهم ياخدوا خط وحجم أبوهم.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح بيعرض أي كلام بخط وحجم ومسافة سطور ولون، حتى لو مكتبتش ولا سطر CSS. الدرس ده بيغيّر الأربعة دول، ويشرح كل واحد بيتحسب إزاي.

كل الأرقام من Chrome 157 على Windows 11، والصفحة [[lang="ar"]].

~~~text القياس من Chrome (من غير أي CSS)
<p>     font-family: "Times New Roman"   font-size: 16px      line-height: normal   color: rgb(0, 0, 0)
<h1>    font-family: "Times New Roman"   font-size: 32px      font-weight: 700
<code>  font-family: monospace           font-size: 13px
<button> و <input>   font-family: Arial  font-size: 13.3333px
<a>     color: rgb(0, 0, 238)
~~~

الأرقام دي نقطة البداية: الفقرة 16px، والعنوان الكبير ضعفها، والكود والأزرار ليهم خط وحجم لوحدهم.

---

## ١. [[font-family: system-ui, "Segoe UI", Tahoma, sans-serif]]

[[font-family]] مش اسم خط واحد. دي **قايمة مترتبة**، بيفصل بين كل اسم والتاني فاصلة. المتصفح بيجرّب الأول، ولو مش موجود على الجهاز بيروح للتاني، وهكذا.

~~~live 131 205 نفس الجملة بأربع خطوط من الجهاز
<style>
  .a { font-family: "Times New Roman", serif; }
  .b { font-family: "Segoe UI", sans-serif; }
  .c { font-family: Tahoma, sans-serif; }
  .d { font-family: "Courier New", monospace; }
  p { font-size: 20px; margin: 6px 0; }
</style>
<p class="a">الخط بيغيّر إحساس الصفحة كلها Hello 123</p>
<p class="b">الخط بيغيّر إحساس الصفحة كلها Hello 123</p>
<p class="c">الخط بيغيّر إحساس الصفحة كلها Hello 123</p>
<p class="d">الخط بيغيّر إحساس الصفحة كلها Hello 123</p>
~~~

**هتشوف إيه:** أربع سطور بنفس الكلام ونفس الحجم. الأول حروفه ليها زوايد صغيرة في أطرافها (Times New Roman)، والتاني والتالت أنضف وأوضح على الشاشة (Segoe UI و Tahoma)، والرابع كل حروفه نفس العرض (Courier New). لو على موبايل أو ماك، بعض الخطوط دي مش موجودة عندك وهيتعرض البديل اللي بعد الفاصلة.

قواعد الكتابة:

- الاسم اللي فيه مسافة أو أرقام بيتحط بين علامتين تنصيص: [["Segoe UI"]] و [["Times New Roman"]].
- الكلمات العامة ([[serif]] و [[sans-serif]] و [[monospace]] و [[system-ui]]) **من غير** تنصيص. لو كتبت [["sans-serif"]] بالتنصيص، المتصفح هيدوّر على خط اسمه كده ومش هيلاقيه.
- **آخر اسم في القايمة دايمًا عيلة عامة.** هي اللي بتضمن إن فيه خط هيتعرض مهما كان الجهاز.

### العيلات العامة (generic families)

دي مش خطوط. دي «أنواع»، والمتصفح بيختار خط من النوع ده موجود على الجهاز.

| العيلة | معناها | Chrome على Windows اختار إيه (صفحة عربي) |
|---|---|---|
| [[serif]] | حروف ليها زوايد في أطرافها، شكل الكتب والجرايد | Times New Roman |
| [[sans-serif]] | من غير زوايد، أوضح على الشاشة | Segoe UI |
| [[monospace]] | كل الحروف نفس العرض، للكود | Courier New |
| [[system-ui]] | خط واجهة النظام نفسه (القوايم والإعدادات) | Segoe UI |
| [[cursive]] | شكل خط الإيد | خط زخرفي للاتيني، والعربي بخط تاني |
| [[fantasy]] | خطوط زينة للعناوين | خط زينة للاتيني، والعربي بخط تاني |
| [[math]] | لرموز الرياضيات | Cambria Math |
| [[ui-serif]] و [[ui-sans-serif]] و [[ui-monospace]] و [[ui-rounded]] | خطوط واجهة النظام بأنواعها | **ولا حاجة**: اتعاملوا كخط مش موجود، والمتصفح كمّل للاسم اللي بعدهم |

السطر الأخير اتقاس كده: [[font-family: ui-rounded, monospace]] اتعرض بخط الـ monospace، يعني [[ui-rounded]] متعرّفش عليه. MDN بيقول إن الأربعة دول شغالين في Safari بس، فمتعتمدش عليهم لوحدهم.

والاختيار ده بيتغيّر مع لغة الصفحة: [[sans-serif]] في صفحة [[lang="ar"]] على Windows بيطلع Segoe UI، وفي صفحة إنجليزي بيطلع Arial. عشان كده [[lang]] مهم (درس «lang و dir»).

---

## ٢. المتصفح بيختار الخط **لكل حرف**

دي أهم حتة في الدرس للي بيكتب عربي. القايمة مش «أول خط موجود وخلاص». المتصفح بيمشي على القايمة **لكل حرف لوحده**: لو الخط الأول مفيهوش الحرف ده، بياخده من اللي بعده.

~~~live 122 Georgia مفيهوش حروف عربي
<style>
  .g { font-family: Georgia, serif; font-size: 22px; }
  .s { font-family: Georgia, "Segoe UI", sans-serif; font-size: 22px; }
</style>
<p class="g">أهلًا Hello بكم Welcome</p>
<p class="s">أهلًا Hello بكم Welcome</p>
~~~

**هتشوف إيه:** في السطرين الكلام الإنجليزي بنفس الخط (Georgia). الكلام العربي مختلف: في السطر الأول بخط Times New Roman (جاي من [[serif]])، وفي التاني بخط Segoe UI. خط واحد في الـ CSS، وخطين على الشاشة.

~~~text القياس من Chrome (عرض الجملة «السلام Hamburg» بحجم 100px)
font-family: Georgia                 637.8px
font-family: Georgia, serif          637.8px     (العربي جاي من serif في الحالتين)
font-family: Georgia, monospace      749.6px     (العربي بقى من monospace فالعرض اتغيّر)
getComputedStyle(p).fontFamily   →   Georgia, serif      (القايمة زي ما كتبتها، مش الخط اللي اترسم)
~~~

الرقم الأخير فخ: [[getComputedStyle]] بيرجّع **القايمة اللي كتبتها**، مش الخط اللي اتعرض فعلًا. عشان تعرف الخط الحقيقي: DevTools، ثم Elements، ثم تبويب Computed، وانزل لآخره عند **Rendered Fonts**: هتلاقي اسم كل خط اترسم بيه وعدد الحروف.

النتيجة العملية: لما تختار خط إنجليزي حلو وتحطه أول القايمة، الكلام العربي هيروح للخط اللي بعده. فلازم يبقى في القايمة خط **فيه عربي** إنت اللي اخترته، مش تسيبها للصدفة.

---

## ٣. خطوط النظام للعربي

مفيش خط عربي واحد موجود على كل الأجهزة. اللي بيتعمل: قايمة فيها خط لكل نظام.

| النظام | خطوط فيها عربي (موجودة من غير تحميل) |
|---|---|
| Windows | Segoe UI و Tahoma و Arial و Times New Roman (اتأكدنا إنهم موجودين وبيرسموا عربي على Windows 11) |
| macOS و iOS | خط النظام [[system-ui]] فيه عربي (SF Arabic)، وقبله Geeza Pro (من وثائق Apple، متقاسش هنا) |
| Android | Noto Naskh Arabic أو Noto Sans Arabic حسب الجهاز (من وثائق Android، متقاسش هنا) |

والقايمة اللي بتشتغل على الكل:

~~~css
body {
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
}
~~~

- [[system-ui]]: على كل نظام بيدّيك خط الواجهة بتاعه، وده دايمًا فيه عربي كويس لأن النظام نفسه بيتعرض بيه.
- [["Segoe UI"]] و [[Tahoma]]: للمتصفح القديم على Windows اللي ميعرفش [[system-ui]].
- [[sans-serif]]: شبكة الأمان.

دي «خطوط الجهاز»: صفر تحميل، وبتظهر فورًا. لو عايز خط معين شكله واحد عند كل الناس (Cairo مثلًا)، لازم تحمّله مع الصفحة: درس «@font-face و font-display» في نفس الوحدة.

**اسم خط مش موجود مبيعملش خطأ.** المتصفح بيعدّيه في صمت:

~~~text القياس من Chrome
font-family: Cairo, sans-serif     →  اتعرض بـ Segoe UI   (Cairo مش متسطّب على الجهاز)
font-family: Cairo                 →  اتعرض بـ Times New Roman   (مفيش بديل، فرجع للافتراضي)
~~~

يعني لو كتبت [[font-family: Cairo]] على جهازك والخط متسطّب عندك، هتشوفه. والزائر اللي معندوش الخط هيشوف Times New Roman. ده أشهر سبب لـ «الموقع شكله مختلف عند العميل».

---

## ٤. [[font-size: 18px]]

حجم الخط. القيمة بتتكتب بكذا شكل:

| القيمة | معناها | اتحسبت كام (والأب 16px) |
|---|---|---|
| [[font-size: 18px]] | بيكسل ثابت | 18px |
| [[font-size: 1.5em]] | مرة ونص حجم خط **الأب** | 24px |
| [[font-size: 120%]] | نسبة من حجم خط الأب (زي [[em]] بالظبط) | 19.2px |
| [[font-size: 2rem]] | ضعف حجم خط [[<html>]] | 32px |
| [[font-size: large]] | كلمة من سلّم جاهز | 18px |
| [[font-size: larger]] | درجة أكبر من الأب | 19.2px |

والسلّم الجاهز بالترتيب:

~~~text القياس من Chrome (والحجم الأساسي 16px)
xx-small 9px     x-small 10px    small 13px     medium 16px
large 18px       x-large 24px    xx-large 32px  xxx-large 48px
smaller 13.3333px                larger 19.2px
~~~

[[em]] و [[rem]] ليهم درس كامل («rem و em» في الوحدة الجاية). اللي محتاجه دلوقتي حاجتين:

**الأولى: [[em]] بتتضرب في بعضها.** [[em]] نسبة من الأب، فلو عنصر جوه عنصر جوه عنصر وكلهم [[1.2em]]:

~~~live 97 تلات مرات 1.2em جوه بعض
<style>
  .box { font-size: 1.2em; border-inline-start: 3px solid silver; padding-inline-start: 8px; }
</style>
<div class="box">المستوى الأول
  <div class="box">المستوى التاني
    <div class="box">المستوى التالت</div>
  </div>
</div>
~~~

**هتشوف إيه:** كل مستوى خطه أكبر من اللي فوقه، مع إن القاعدة واحدة. الخط الرمادي على الجنب بيبيّن إن كل صندوق جوه اللي قبله.

~~~text القياس من Chrome
المستوى الأول   19.2px      (16 × 1.2)
المستوى التاني  23.04px     (19.2 × 1.2)
المستوى التالت  27.648px    (23.04 × 1.2)
~~~

**التانية: الحجم بالبيكسل على [[body]] بيتجاهل إعداد المستخدم.** اللي مكبّر خط المتصفح من الإعدادات (ضعاف النظر كتير) مش هيتأثر بيه موقعك لو كاتب [[font-size: 18px]]. البديل [[font-size: 1.125rem]] أو [[112.5%]]، وشرحه في درس «rem و em». في الوحدة دي بنكتب px عشان الأرقام تبقى واضحة.

**الحرف العربي والحجم:** في نفس الـ [[font-size]]، الحروف العربي بتبان أصغر من اللاتيني في أغلب الخطوط، لأن جزء كبير من ارتفاع الحرف رايح للنقط والتشكيل. 16px مقبولة للإنجليزي وصغيرة شوية على العربي. فقرة المقال العربي بتستريح من 17 لـ 20.

---

## ٥. [[line-height: 1.8]]

ارتفاع السطر: المسافة من أول السطر لأول السطر اللي بعده. القيمة الافتراضية [[normal]]، ومعناها «اللي مصمم الخط حاطه جوه ملف الخط»، فبتختلف من خط لخط:

~~~text القياس من Chrome (ارتفاع سطر واحد ÷ حجم الخط)
Times New Roman   1.15        Arial              1.15
Tahoma            1.21        Segoe UI           1.33
Sakkal Majalla    1.39        Traditional Arabic 1.49
Simplified Arabic 1.66        Dubai              1.69
~~~

يعني لو غيّرت الخط بس، ارتفاع الصفحة كلها بيتغيّر. لما تكتب [[line-height]] بنفسك الرقم بيثبت مهما كان الخط.

~~~live 206 257 نفس الفقرة: normal ثم 1.8
<style>
  p { font-family: Tahoma, sans-serif; font-size: 17px; max-width: 420px; }
  .tight { line-height: normal; }
  .open { line-height: 1.8; }
</style>
<p class="tight">الفقرة دي سطورها لازقة في بعض. النقط اللي تحت الحروف في سطر بتقرّب من التشكيل اللي فوق الحروف في السطر اللي تحته، والعين بتتوه وهي بترجع لأول السطر الجديد.</p>
<p class="open">الفقرة دي سطورها واخدة راحتها. النقط اللي تحت الحروف في سطر بعيدة عن التشكيل اللي فوق الحروف في السطر اللي تحته، والعين بتلاقي أول السطر الجديد بسهولة.</p>
~~~

**هتشوف إيه:** فقرتين بنفس الخط والحجم. الأولى مزحومة، والتانية بين سطورها فراغ واضح وأسهل في القراية. الفرق كله في [[line-height]].

العربي محتاج مسافة أكبر من الإنجليزي: فيه نقط تحت السطر وتشكيل فوقه. الإنجليزي بيستريح عند 1.5، والعربي من 1.7 لـ 1.9. والعناوين الكبيرة أقل (1.2 لـ 1.4).

### الرقم من غير وحدة

[[line-height]] بتتكتب بتلات طرق، وواحدة بس فيهم آمنة:

~~~text القياس من Chrome (الأب 16px، وجواه عنوان 32px)
line-height على الأب    المحسوبة للأب    المحسوبة للعنوان    ارتفاع سطر العنوان
1.5                     24px             48px                48px     ← صح: 32 × 1.5
150%                    24px             24px                24px     ← العنوان 32px في سطر 24px
1.5em                   24px             24px                24px
24px                    24px             24px                24px
~~~

- **رقم من غير وحدة** ([[1.5]]): بيتورّث **الرقم**، وكل عنصر بيضربه في حجم خطه هو.
- **بوحدة أو نسبة** ([[150%]] أو [[1.5em]] أو [[24px]]): بتتحسب مرة عند الأب، وبيتورّث **الناتج** (24px) ثابت. العنوان اللي خطه 32px هياخد سطر 24px، ولو لفّ على سطرين هيركبوا على بعض.

~~~live 176 عنوان على سطرين: الأب line-height: 24px ثم 1.5
<style>
  .bad { line-height: 24px; }
  .good { line-height: 1.5; }
  h2 { font-size: 32px; margin: 0 0 12px; max-width: 300px; background: #fef3c7; }
</style>
<div class="bad"><h2>عنوان طويل بيلف على سطرين</h2></div>
<div class="good"><h2>عنوان طويل بيلف على سطرين</h2></div>
~~~

**هتشوف إيه:** العنوان الأول سطرينه داخلين في بعض والحروف طالعة برّه الخلفية الصفرا. التاني كل سطر واخد مكانه. الفرق: [[24px]] اتورّثت زي ما هي، و [[1.5]] اتحسبت من حجم خط العنوان.

---

## ٦. [[color: #1f2937]]

[[color]] هي **لون الكلام**. (اسمها مش text-color.) وبتلوّن معاه كل حاجة «تبع الكلام»: الخط اللي تحته، وعلامة القايمة، والـ border اللي ملوش لون مكتوب.

~~~live 120 color بتلوّن الكلام واللي تبعه
<style>
  .note { color: #b45309; border: 2px solid; padding: 8px; }
  .note u { font-weight: 700; }
</style>
<div class="note">
  <p>تنبيه: <u>الحجز بيقفل</u> يوم الخميس.</p>
  <ul><li>بند في قايمة</li></ul>
</div>
~~~

**هتشوف إيه:** الكلام بني، والخط اللي تحت «الحجز بيقفل» بني، ونقطة القايمة بنية، والإطار بني. مكتوب لون واحد بس: [[color]] على الصندوق.

~~~text القياس من Chrome
div   { color: #1f2937; border: 2px solid; }
  div      color: rgb(31, 41, 55)      border-color: rgb(31, 41, 55)
  p جواه   color: rgb(31, 41, 55)      (اتورّث)
  a جواه   color: rgb(0, 0, 238)       (اللينك ليه لونه، مبيورثش)
  button   color: rgb(0, 0, 0)         (الزرار كمان)
~~~

القيمة بتتكتب بأشكال كتير، وكلها بتتحسب لـ [[rgb()]]:

| المكتوب | المحسوب |
|---|---|
| [[color: red]] | بتتحسب [[rgb(255, 0, 0)]]: أحمر صريح |
| [[color: #c00]] و [[color: #cc0000]] | الاتنين بيتحسبوا [[rgb(204, 0, 0)]]: التلات حروف اختصار للستة |
| [[color: rgb(204 0 0)]] | نفس اللون [[rgb(204, 0, 0)]] مكتوب بالدالة |
| [[color: #1f293780]] (آخر رقمين شفافية) | بتتحسب [[rgba(31, 41, 55, 0.5)]]: نص شفاف |

دوال الألوان التانية ([[hsl()]] و [[oklch()]]) ليها وحدة لوحدها. هنا يكفي الاسم والـ hex (اتشرح في «مقدمة CSS وتنسيق العناصر»).

والكلمة [[currentColor]] معناها «نفس قيمة [[color]] بتاعة العنصر»: [[border: 2px solid currentColor]]. وهي الافتراضي للـ border وللخط اللي تحت الكلام، وعشان كده اتلوّنوا فوق من غير ما نكتبها.

**اللون والقراية:** رمادي فاتح على أبيض شكله «شيك» ومحدش بيعرف يقراه في الشمس. الفرق بين لون الكلام ولون الخلفية ليه رقم بيتقاس وحد أدنى (4.5 للنص العادي)، وده درس «contrast ratio». قاعدة سريعة: كلام الفقرة يبقى غامق قوي ([[#1f2937]] أو [[#222]])، مش [[#999]].

---

## ٧. الأزرار والحقول: [[font: inherit]]

~~~live 146 الزرار مبياخدش خط الصفحة
<style>
  body { font-family: Tahoma, sans-serif; font-size: 18px; }
  .fixed { font: inherit; }
</style>
<p>كلام الصفحة 18px</p>
<p><button>زرار عادي</button> <input value="حقل عادي" size="8"></p>
<p><button class="fixed">زرار بـ inherit</button> <input class="fixed" value="حقل بـ inherit" size="12"></p>
~~~

**هتشوف إيه:** الزرار والحقل في الصف الأول خطهم أصغر وشكله مختلف عن كلام الصفحة. في الصف التاني بقوا بنفس الخط والحجم.

~~~text القياس من Chrome (الأب 18px Tahoma)
<button>                    font-size: 13.3333px     font-family: Arial
<input>                     font-size: 13.3333px     font-family: Arial
<textarea>                  font-size: 13.3333px     font-family: monospace
<button style="font: inherit">   font-size: 18px     font-family: Tahoma
~~~

المتصفح حاطط للأزرار والحقول خط وحجم في الـ stylesheet بتاعه، فبيغلبوا الوراثة. [[font: inherit]] بتقول «خد كل خصائص الخط من أبوك». ([[font]] خاصية مختصرة بتجمع الخط والحجم والوزن، وشرحها في الدرس الجاي.)

وحقل أصغر من 16px ليه مشكلة تانية على iPhone: Safari بيعمل zoom للصفحة لما تدوس على حقل خطه أقل من 16px (من وثائق Apple، متقاسش هنا). [[font: inherit]] مع خط صفحة 16px أو أكتر بيحلها.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[font-family: Cairo]] من غير بدايل والخط مش محمّل | عندك شغال (الخط متسطّب)، وعند الزائر Times New Roman |
| [[font-family: "sans-serif"]] بالتنصيص | المتصفح بيدوّر على خط اسمه كده، ومش بيلاقيه |
| [[font-family: Segoe UI, Tahoma]] من غير تنصيص | بيشتغل غالبًا، بس اسم فيه رقم أو رمز هيبوّظ السطر كله. التنصيص أضمن |
| خط إنجليزي أول القايمة ومفيش خط عربي بعده | العربي بياخد خط عشوائي من الجهاز |
| [[line-height: 24px]] على [[body]] | العناوين الكبيرة سطورها بتركب على بعض |
| [[font-size: 12px]] لكلام الفقرة | صغير على العربي، ومتعب على الموبايل |
| [[em]] على عناصر جوه بعض | الحجم بيتضرب في نفسه مع كل مستوى |
| نسيان الأزرار والحقول | الصفحة بخط والفورم بخط تاني أصغر |
| [[color: #aaa]] للفقرة | مش مقروء، وبيقع في فحص الـ contrast |

---

## الخلاصة

- [[font-family]] قايمة، والمتصفح بيختار منها **لكل حرف**. آخرها عيلة عامة، وفيها خط عربي إنت اللي اخترته.
- للعربي من غير تحميل: [[system-ui, "Segoe UI", Tahoma, sans-serif]].
- [[font-size]]: الفقرة العربي من 17 لـ 20px. و [[em]] نسبة من الأب وبتتضرب.
- [[line-height]] رقم من غير وحدة: 1.7 لـ 1.9 للفقرة العربي، و 1.2 لـ 1.4 للعناوين.
- [[color]] لون الكلام واللي تبعه، وبتتورّث إلا للينكات والأزرار.
- الأزرار والحقول: [[font: inherit]].`,
          try: R`اعمل ملف [[type.html]] فيه عنوان [[<h1>]] وفقرتين عربي طوال شوية وزرار. من غير CSS افتحه وشوف شكله. وبعدين زوّد [[<style>]] فيه قاعدة واحدة على [[body]]: خطوط النظام، وحجم 18px، و [[line-height: 1.8]]، ولون [[#1f2937]]، وقاعدة تخلّي الزرار ياخد خط الصفحة. افتح DevTools وشوف في Computed حجم خط الفقرة وارتفاع السطر.`,
          sol: R`~~~live 325 487 type.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة الخط</title>
<style>
  body {
    font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
    font-size: 18px;
    line-height: 1.8;
    color: #1f2937;
  }
  button { font: inherit; }
</style>
</head>
<body>
<h1>ليه بنحب القهوة الصبح؟</h1>
<p>أول كوباية في اليوم ليها طعم مختلف. الريحة بتملا المطبخ قبل ما المية تغلي، والدنيا لسه هادية والشارع فاضي.</p>
<p>ناس كتير بتقول إنها مبتعرفش تبدأ شغل من غيرها، والحقيقة إن نص الموضوع عادة والنص التاني طقس صغير بيقول للدماغ إن اليوم بدأ.</p>
<button>اقرا المقال اللي بعده</button>
</body>
</html>
~~~

**هتشوف إيه:**

- الكلام كله بقى بخط واجهة النظام (على Windows: Segoe UI) بدل Times New Roman.
- الفقرتين سطورهم بعيدة عن بعض ومريحة.
- الزرار خطه بنفس حجم وشكل الفقرة.

~~~text القياس من Chrome
p        font-size: 18px     line-height: 32.4px     color: rgb(31, 41, 55)
h1       font-size: 36px     line-height: 64.8px     (2em من 18، والسطر 36 × 1.8)
button   font-size: 18px     font-family: system-ui, "Segoe UI", Tahoma, sans-serif
~~~

- [[32.4px]] هي [[18 × 1.8]]. الـ Computed بيعرض الناتج بالبيكسل، مش الرقم اللي كتبته.
- العنوان خد [[line-height]] 64.8px لأن الرقم 1.8 اتورّث واتضرب في 36. ده كتير على عنوان، وعشان كده بنكتب للعناوين [[line-height: 1.3]] لوحدهم.

**الغلطة الشائعة:** تكتب القاعدة على [[p]] بدل [[body]]. الفقرات هتتظبط، والقوايم والجداول والعناوين هيفضلوا بالخط الافتراضي.`,
          deep: {
            why: R`الناس بتيجي الصفحة عشان تقرا. لو الخط صغير أو السطور لازقة أو اللون باهت، الزائر بيمشي قبل ما يوصل لتاني فقرة، مهما كان التصميم حلو. والأربع خصائص دول هم اللي بيحددوا القراية، وكلهم بيتورّثوا، فقاعدة واحدة على [[body]] بتظبط الصفحة كلها. وفي العربي الموضوع أهم: الخط الافتراضي (Times New Roman) حروفه العربي رفيعة وصغيرة على الشاشة، ومسافة سطوره مبتكفيش النقط والتشكيل.`,
            how: R`المتصفح بيحسب [[font-family]] كقايمة، ولكل حرف في النص بيدوّر على أول خط في القايمة **موجود على الجهاز وفيه الحرف ده**. لو مفيش، بيسأل النظام عن أي خط فيه الحرف (system fallback)، ولو مفيش خالص بيرسم مربع فاضي. العيلة العامة بتتحوّل لخط حقيقي حسب إعدادات المتصفح ولغة العنصر ([[lang]]).

[[font-size]] بتتحسب دايمًا لبيكسل: [[em]] و [[%]] بيتضربوا في حجم خط الأب المحسوب، و [[rem]] في حجم خط [[<html>]]. وبعدها [[line-height]]: لو رقم، بيتضرب في حجم خط العنصر نفسه. لو [[normal]]، المتصفح بيقرا من ملف الخط ارتفاع الحروف ونزولها والمسافة اللي المصمم حاططها (ascent و descent و line gap).

[[color]] بتتورّث كقيمة محسوبة، و [[currentColor]] بيرجع لها وقت الرسم.`,
            when: R`قاعدة [[body]] دي أول حاجة بتتكتب في أي ملف CSS. خطوط النظام مناسبة للوحات التحكم والمواقع اللي السرعة فيها أهم من الهوية، ولأي مشروع لسه في أوله. لما الهوية البصرية تبقى مهمة (مجلة، براند) بتحمّل خط ويب وتسيب خطوط النظام بدايل بعده. والكود والأرقام اللي لازم تتراص تحت بعض بياخدوا [[monospace]].`,
            mistakes: R`خط من غير بدايل. خط إنجليزي أول القايمة ومفيش خط عربي مختار بعده. [[line-height]] بوحدة على [[body]] فالعناوين تركب على بعض. خط صغير (12 أو 14px) لفقرة عربي. نسيان إن الأزرار والحقول مبيورثوش الخط. والاعتماد على [[getComputedStyle]] عشان تعرف الخط المعروض: بيرجّع القايمة مش الخط.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** مقال «مدوّنة حبر» مكتوب من غير أي تنسيق. اكتب قاعدة واحدة على [[body]] تخلّيه يتقري: خطوط النظام وآخرها [[sans-serif]]، وحجم 18px، وسطور 1.8، ولون [[#1f2937]]. (من قسم ١ و ٤ و ٥ و ٦ في الشرح)`, done: R`الفقرة بقت 18px وسطرها 32.4px ولونها رمادي غامق، والقايمة آخرها [[sans-serif]]، وكل الشروط ✓.`, work: { h: 230, start: R`<style>
  body {

  }
</style>
<h1>أول يوم في المدوّنة</h1>
<p>قررت أكتب كل أسبوع عن حاجة اتعلمتها. مش لازم تبقى حاجة كبيرة: أمر جديد في الترمنال، أو غلطة قعدت فيها يوم كامل.</p>
<p>الكتابة بتثبّت المعلومة، واللي بيقرا بيوفّر على نفسه نفس اليوم ده.</p>`, checks: [
              { say: R`حجم خط الفقرة 18px`, q: "p", style: ["font-size", "18px"] },
              { say: R`ارتفاع سطر الفقرة 1.8 من الخط (32.4px)`, q: "p", style: ["line-height", "32.4px"] },
              { say: R`لون الكلام [[#1f2937]]`, q: "p", style: ["color", "rgb(31, 41, 55)"] },
              { say: R`قايمة الخطوط آخرها العيلة العامة [[sans-serif]]`, src: "sans-serif" },
              { say: R`القاعدة على [[body]] مش على [[p]]: العنوان كمان خد اللون`, q: "h1", style: ["color", "rgb(31, 41, 55)"] }
            ] }, sol: R`~~~live 246 311 الحل
<style>
  body {
    font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
    font-size: 18px;
    line-height: 1.8;
    color: #1f2937;
  }
</style>
<h1>أول يوم في المدوّنة</h1>
<p>قررت أكتب كل أسبوع عن حاجة اتعلمتها. مش لازم تبقى حاجة كبيرة: أمر جديد في الترمنال، أو غلطة قعدت فيها يوم كامل.</p>
<p>الكتابة بتثبّت المعلومة، واللي بيقرا بيوفّر على نفسه نفس اليوم ده.</p>
~~~

**هتشوف إيه:**

- الخط اتغيّر من Times New Roman لخط الواجهة.
- الفقرتين أكبر شوية وسطورهم أبعد.
- الكلام رمادي غامق بدل الأسود.

**ليه كده:** الأربع خصائص بيتورّثوا، فقاعدة واحدة على [[body]] كفاية. و [[1.8]] من غير وحدة عشان العنوان يحسبها من حجمه.

**الغلطة الشائعة:** [[line-height: 1.8px]]. ده سطر ارتفاعه أقل من بيكسلين، والسطور كلها هتتكوّم فوق بعض. الرقم لازم يبقى من غير وحدة.

~~~text القياس من Chrome
p     font-size: 18px    line-height: 32.4px    color: rgb(31, 41, 55)
h1    font-size: 36px    line-height: 64.8px    color: rgb(31, 41, 55)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عنوان المقال الطويل بيلف على سطرين والسطرين راكبين على بعض. السبب في قاعدة [[body]]. صلّحها من غير ما تلمس قاعدة [[h1]]. (من قسم ٥ في الشرح: «الرقم من غير وحدة»)`, done: R`سطر العنوان بقى 60px (40 × 1.5) وسطر الفقرة فضل 24px، وكل الشروط ✓.`, work: { h: 250, start: R`<style>
  body { font-family: Tahoma, sans-serif; font-size: 16px; line-height: 24px; }
  h1 { font-size: 40px; max-width: 320px; background: #fef3c7; }
</style>
<h1>سبع حاجات اتعلمتها من أول مشروع</h1>
<p>الفقرة دي سطورها مظبوطة، والمشكلة في العنوان اللي فوقها بس.</p>`, checks: [
              { say: R`سطر العنوان بقى 60px (مرة ونص حجم خطه)`, q: "h1", style: ["line-height", "60px"] },
              { say: R`سطر الفقرة لسه 24px`, q: "p", style: ["line-height", "24px"] },
              { say: R`حجم العنوان لسه 40px`, q: "h1", style: ["font-size", "40px"] }
            ] }, sol: R`~~~live 274 298 بعد التصليح
<style>
  body { font-family: Tahoma, sans-serif; font-size: 16px; line-height: 1.5; }
  h1 { font-size: 40px; max-width: 320px; background: #fef3c7; }
</style>
<h1>سبع حاجات اتعلمتها من أول مشروع</h1>
<p>الفقرة دي سطورها مظبوطة، والمشكلة في العنوان اللي فوقها بس.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 166 190 قبل
<style>
  body { font-family: Tahoma, sans-serif; font-size: 16px; line-height: 24px; }
  h1 { font-size: 40px; max-width: 320px; background: #fef3c7; }
</style>
<h1>سبع حاجات اتعلمتها من أول مشروع</h1>
<p>الفقرة دي سطورها مظبوطة، والمشكلة في العنوان اللي فوقها بس.</p>
~~~

**هتشوف إيه:**

- قبل: سطور العنوان داخلة في بعض، والحروف طالعة برّه الخلفية الصفرا.
- بعد: كل سطر في العنوان واخد مكانه، والخلفية الصفرا مغطية الكلام كله. والفقرة متغيّرتش.

**ليه:** [[24px]] قيمة ثابتة بتتورّث زي ما هي، فالعنوان اللي خطه 40px خد سطر 24px. [[1.5]] بيتورّث كرقم، والعنوان بيضربه في 40.

**الغلطة الشائعة:** تصلّحها بـ [[line-height: 150%]]. الفقرة هتفضل 24px، والعنوان كمان هيفضل 24px: النسبة بتتحسب عند [[body]] وبيتورّث الناتج.

~~~text القياس من Chrome
              قبل (24px)     بعد (1.5)
h1 line-height   24px          60px
p  line-height   24px          24px
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع، وبعدين صلّح:** تعليق جواه رد جواه رد، والتلاتة عليهم [[.reply { font-size: 0.85em; }]]. اكتب على ورقة حجم خط كل مستوى (والأب 20px)، وقارن. وبعدين خلّي الردود كلها بنفس الحجم (17px) مهما كانت جوه بعض. (من قسم ٤ في الشرح: «em بتتضرب في بعضها»)`, done: R`توقّعت 17 ثم 14.45 ثم 12.28 تقريبًا، وبعد التصليح التلات ردود 17px، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  body { font-family: Tahoma, sans-serif; font-size: 20px; }
  .reply { font-size: 0.85em; border-inline-start: 3px solid silver; padding-inline-start: 10px; }
</style>
<p>التعليق الأصلي</p>
<div class="reply">رد أول
  <div class="reply">رد على الرد
    <div class="reply">رد تالت</div>
  </div>
</div>`, checks: [
              { say: R`التلات ردود بنفس الحجم: 17px`, q: ".reply", style: ["font-size", "17px"] },
              { say: R`التعليق الأصلي لسه 20px`, q: "p", style: ["font-size", "20px"] },
              { say: R`الردود لسه جوه بعض (تلات [[.reply]])`, q: ".reply .reply .reply" }
            ] }, sol: R`~~~live 135 بعد التصليح
<style>
  body { font-family: Tahoma, sans-serif; font-size: 20px; }
  .reply { font-size: 17px; border-inline-start: 3px solid silver; padding-inline-start: 10px; }
</style>
<p>التعليق الأصلي</p>
<div class="reply">رد أول
  <div class="reply">رد على الرد
    <div class="reply">رد تالت</div>
  </div>
</div>
~~~

**هتشوف إيه:** قبل التصليح كل رد خطه أصغر من اللي قبله لحد ما التالت بقى صعب يتقري. بعده التلاتة بنفس الحجم، والخط الرمادي على الجنب هو اللي بيبيّن إن ده رد على ده.

**ليه:** [[em]] نسبة من الأب، وأب كل رد هو الرد اللي قبله.

~~~text القياس من Chrome
              قبل (0.85em)     بعد (17px)
رد أول        17px             17px
رد على الرد   14.45px          17px
رد تالت       12.2825px        17px
~~~

**حل تاني صح:** [[.reply .reply { font-size: 1em; }]]: الرد اللي جوه رد ياخد حجم أبوه زي ما هو. والحل اللي هتستخدمه بعد الوحدة الجاية: [[font-size: 0.85rem]]، لأن [[rem]] دايمًا من [[<html>]] ومبتتضربش.

**الغلطة الشائعة:** تحط [[font-size: 17px]] على [[body]]. التعليق الأصلي هيصغر معاهم، والردود هتفضل تصغر.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم الاشتراك في النشرة: الصفحة بخط Tahoma 18px، والحقل والزرار طالعين بخط تاني وأصغر. خليهم ياخدوا خط الصفحة بقاعدة واحدة. (من قسم ٧ في الشرح)`, done: R`الحقل والزرار 18px، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  body { font-family: Tahoma, sans-serif; font-size: 18px; }
</style>
<p>اشترك في نشرة «حبر» الأسبوعية:</p>
<p><input type="email" placeholder="بريدك"> <button>اشترك</button></p>`, checks: [
              { say: R`الحقل خطه 18px`, q: "input", style: ["font-size", "18px"] },
              { say: R`الزرار خطه 18px`, q: "button", style: ["font-size", "18px"] },
              { say: R`الزرار بنفس خط الصفحة (Tahoma)`, q: "button", style: ["font-family", "Tahoma, sans-serif"] }
            ] }, sol: R`~~~live 104 بعد التصليح
<style>
  body { font-family: Tahoma, sans-serif; font-size: 18px; }
  input, button { font: inherit; }
</style>
<p>اشترك في نشرة «حبر» الأسبوعية:</p>
<p><input type="email" placeholder="بريدك"> <button>اشترك</button></p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 100 قبل
<style>
  body { font-family: Tahoma, sans-serif; font-size: 18px; }
</style>
<p>اشترك في نشرة «حبر» الأسبوعية:</p>
<p><input type="email" placeholder="بريدك"> <button>اشترك</button></p>
~~~

**هتشوف إيه:** قبل: الحقل والزرار صغيرين جنب الكلام. بعد: نفس حجم وشكل خط الجملة اللي فوقهم، والحقل نفسه كبر لأن حجمه بيتبع خطه.

**ليه:** المتصفح مدّي الحقول والأزرار خط وحجم لوحدهم (Arial 13.33px). [[font: inherit]] بترجّعهم للوراثة.

**الغلطة الشائعة:** [[font-size: inherit]] بس. الحجم هيتظبط والخط هيفضل Arial.

~~~text القياس من Chrome
           قبل                      بعد
input      13.3333px  Arial         18px  Tahoma, sans-serif
button     13.3333px  Arial         18px  Tahoma, sans-serif
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل صفحة فيها فقرة «مرحبًا Hello ١٢٣ 123» وعليها [[font-family: Georgia, serif]]. افتح DevTools، ثم Elements، ثم Computed، وانزل لـ Rendered Fonts. كام خط اترسم بيهم السطر ده؟ ومين خد إيه؟ وبعدين غيّر القايمة لـ [[Georgia, Tahoma, serif]] وبص تاني. (من قسم ٢ في الشرح: «المتصفح بيختار الخط لكل حرف»)`, done: R`كتبت اسم الخطين اللي اترسموا في كل حالة، وعرفت مين رسم العربي ومين رسم اللاتيني، وإن خانة [[font-family]] في Computed مبتقولش ده.`, sol: R`~~~live 129 الصفحة
<style>
  .a { font-family: Georgia, serif; font-size: 24px; }
  .b { font-family: Georgia, Tahoma, serif; font-size: 24px; }
</style>
<p class="a">مرحبًا Hello ١٢٣ 123</p>
<p class="b">مرحبًا Hello ١٢٣ 123</p>
~~~

**إجابة نموذجية (Chrome على Windows 11):**

| القايمة | اللاتيني والأرقام 123 | العربي والأرقام ١٢٣ |
|---|---|---|
| [[Georgia, serif]] | Georgia | Times New Roman (جاي من [[serif]]) |
| [[Georgia, Tahoma, serif]] | Georgia | Tahoma |

يعني السطر الواحد اترسم بخطين. Georgia مفيهوش ولا حرف عربي، فالمتصفح كمّل في القايمة للحروف دي بس.

**هتشوف إيه:** في السطرين «Hello 123» بنفس الشكل. «مرحبًا ١٢٣» في الأول رفيعة وبزوايد، وفي التاني أتخن وأوضح.

**اللي تتعلمه:**

- خانة [[font-family]] في Computed بتعرض القايمة اللي كتبتها. الخط الحقيقي في Rendered Fonts بس.
- على جهاز تاني (ماك أو موبايل) النتيجة هتختلف، لأن الخطوط المتسطّبة مختلفة. جرّبها على موبايلك من Remote Debugging لو عايز تتأكد.

~~~text القياس من Chrome (عرض «السلام Hamburg» بحجم 100px)
Georgia, serif         637.8px
Georgia, monospace     749.6px      ← غيّرنا البديل بس، والعرض اتغيّر: يبقى العربي مش من Georgia
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب [[body { font-family: Cairo; }]] وبيقول «شغال عندي تمام»، والعميل بعتله صورة والموقع بخط تاني خالص. اشرحله في ٣ سطور إيه اللي حصل وإيه التصليح. (من قسم ٣ في الشرح)`, done: R`قلت إن الخط متسطّب على جهازه هو بس، وإن اسم خط مش موجود بيتعدّى في صمت، وكتبت القايمة المتصلّحة ببدايل.`, sol: R`**إجابة نموذجية:**

1. [[font-family]] بتدوّر على الخط **على جهاز الزائر**. Cairo متسطّب على جهازك (غالبًا من برنامج تصميم)، ومش موجود عند العميل.
2. اسم خط مش موجود مبيعملش خطأ ولا رسالة في الـ Console. المتصفح بيعدّيه للي بعده، ومفيش بعده حاجة، فرجع للخط الافتراضي (Times New Roman).
3. التصليح على مرحلتين: دلوقتي زوّد بدايل: [[font-family: Cairo, system-ui, "Segoe UI", Tahoma, sans-serif]]. ولو لازم الكل يشوف Cairo، حمّل ملف الخط مع الموقع بـ [[@font-face]] (درس «@font-face و font-display»).

~~~text القياس من Chrome (Cairo مش متسطّب)
font-family: Cairo                →  Times New Roman
font-family: Cairo, sans-serif    →  Segoe UI
~~~

**إزاي تمسكها قبل العميل:** افتح الموقع على جهاز تاني أو موبايل، أو بص على Rendered Fonts في DevTools وشوف مكتوب «Local file» جنب اسم الخط: معناها إنه جاي من جهازك مش من الموقع.` }
          ]
        },
        {
          cmd: "font-weight و font-style",
          title: "التقيل والمايل، وخاصية font المختصرة، والخطوط المتغيّرة",
          pre: [{ to: "css/font-family و font-size", why: R`الدرس ده بيكمّل عليه: هناك اخترت الخط وحجمه، وهنا وزنه وميله وكتابة الكل في سطر واحد` }],
          ref: [
            { t: "MDN: font-weight", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-weight" },
            { t: "MDN: font-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-style" },
            { t: "MDN: font", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font" },
            { t: "MDN: font-synthesis", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-synthesis" },
            { t: "MDN: font-stretch", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-stretch" },
            { t: "MDN: font-variation-settings", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings" },
            { t: "MDN: font-optical-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-optical-sizing" }
          ],
          desc: R`[[font-weight]] بتحدد الخط تقيل قد إيه (رقم من 1 لـ 1000، و [[400]] العادي و [[700]] التقيل)، و [[font-style]] بتحدده مايل ولا لأ. الاتنين بيشتغلوا بس لو ملف الخط **فيه** الوزن أو الميل ده. لو مفيهوش، المتصفح بيفبرك واحد: بيتخّن الحروف أو يميّلها بالحساب.
والخط العربي ملوش مايل أصلًا، فـ [[font-style: italic]] على كلام عربي دايمًا مفبركة. الدرس بيوريك تتحكم في ده بـ [[font-synthesis]]، وتكتب خصائص الخط كلها في سطر بـ [[font]].`,
          example: R`h1 { font-weight: 800; }
.lead { font-weight: 300; }
strong { font-weight: bolder; }
em { font-style: italic; }
body { font-synthesis-style: none; }
.title { font: 700 1.5rem/1.3 system-ui, sans-serif; }
.narrow { font-stretch: condensed; }
.fine { font-variation-settings: "wght" 650; }`,
          flag: "script",
          lines: [
            R`العنوان بوزن 800 (Extra Bold). لو الخط مفيهوش 800، المتصفح بياخد أقرب وزن أتقل موجود، ولو مفيش بياخد أتقل حاجة عنده.`,
            R`فقرة المقدمة بوزن 300 (Light): أرفع من العادي. بتشتغل بس لو الخط فيه نسخة Light.`,
            R`[[bolder]] معناها «درجة أتقل من أبوك»: جوه فقرة عادية (400) بتبقى 700، وجوه عنوان تقيل (700) بتبقى 900.`,
            R`الكلام المايل. ده الافتراضي لـ [[<em>]] أصلًا، ومكتوب هنا عشان نشوف اللي بعده بيأثر عليه إزاي.`,
            R`بتمنع المتصفح يفبرك مايل لما الخط مفيهوش مايل حقيقي. النتيجة: الإنجليزي جوه [[<em>]] بيفضل مايل (ليه نسخة مايلة حقيقية)، والعربي بيفضل معدول.`,
            R`[[font]] المختصرة: الوزن 700، والحجم [[1.5rem]]، وبعد الشرطة المايلة ارتفاع السطر 1.3، وبعدهم قايمة الخطوط. الحجم والخط إجباريين وبالترتيب ده.`,
            R`نسخة أضيق من الخط (75٪ من العرض العادي). بتشتغل لو الخط ليه نسخة Condensed.`,
            R`تحكم مباشر في «محاور» الخط المتغيّر: [[wght]] هو محور الوزن، و 650 رقم بين Semibold و Bold مش موجود كملف لوحده.`
          ],
          teach: R`## الفكرة في سطرين

الخط مش ملف واحد. «Segoe UI» على Windows ست ملفات: Light و Semilight و Regular و Semibold و Bold و Black، ومعاهم نسخ مايلة. [[font-weight]] و [[font-style]] بيختاروا **أنهي ملف** من العيلة. ولو الملف المطلوب مش موجود، المتصفح يا بياخد أقرب واحد، يا بيفبرك.

كل القياسات من Chrome 157 على Windows 11.

---

## ١. [[font-weight: 700]]

الوزن رقم من 1 لـ 1000. والأرقام المتعارف عليها ليها أسامي:

| الرقم | الاسم في ملفات الخطوط | الكلمة في CSS |
|---|---|---|
| 100 | Thin | |
| 200 | Extra Light | |
| 300 | Light | |
| 400 | Regular | [[font-weight: normal]] |
| 500 | Medium | |
| 600 | Semibold | |
| 700 | Bold | [[font-weight: bold]] |
| 800 | Extra Bold | |
| 900 | Black | |

~~~live 174 Segoe UI بست أوزان (على Windows)
<style>
  p { font-family: "Segoe UI", sans-serif; font-size: 22px; margin: 2px 0; }
</style>
<p style="font-weight: 300">300: الخط العربي Light</p>
<p style="font-weight: 400">400: الخط العربي Regular</p>
<p style="font-weight: 600">600: الخط العربي Semibold</p>
<p style="font-weight: 700">700: الخط العربي Bold</p>
<p style="font-weight: 900">900: الخط العربي Black</p>
~~~

**هتشوف إيه (على Windows):** السطور بتتقل بالتدريج من فوق لتحت. وبص على السطر الأخير: الإنجليزي «Black» تقيل جدًا، والعربي جنبه **بخط تاني خالص** شكله مختلف. لو على نظام تاني هتشوف أوزان خط نظامك، وممكن يبقوا أقل من ستة.

السطر الأخير ده مش غلط في الكود. ملف «Segoe UI Black» مفيهوش حروف عربي، فالمتصفح راح للخط اللي بعده في القايمة عشان يرسم العربي (نفس قاعدة «لكل حرف» من الدرس اللي فات).

~~~text القياس من Chrome (عرض الكلمة بحجم 100px: لما العرض يتغيّر يبقى الملف اتغيّر)
font-weight    «Hamburg» بـ Segoe UI        «السلام عليكم» بـ Segoe UI
100 و 200 و 300    395.8  (Light)            481.9  (Light)
350                406.0  (Semilight)        507.4  (Semilight)
400                417.0  (Regular)          520.1
500 و 600          429.3  (Semibold)         520.1  (أتقل في الشكل، ونفس العرض)
700                445.9  (Bold)             520.3
800 و 900          466.0  (Black)            400.6  ← خط تاني: Black مفيهوش عربي
~~~

اللي الجدول بيقوله:

- **الرقم اللي ملوش ملف بياخد أقرب ملف.** 100 و 200 خدوا Light، و 500 خد Semibold، و 800 خد Black. مفيش خطأ ولا تحذير.
- **مش كل وزن فيه كل اللغات.** قبل ما تستخدم وزن في عنوان عربي، جرّبه بكلام عربي.

وخط زي Tahoma عنده ملفين بس:

~~~text القياس من Chrome («Hamburg» بـ Tahoma، 100px)
من 100 لـ 500     405.9    (Regular)
من 600 لـ 900     465.1    (Bold)
~~~

يعني [[font-weight: 500]] و [[font-weight: 300]] على Tahoma **مبيعملوش أي حاجة**، و [[600]] و [[900]] الاتنين نفس الـ Bold.

### [[font-weight: bolder]] و [[font-weight: lighter]]

دول نسبيين: «أتقل من أبويا» و «أخف من أبويا». ومبيزوّدوش 100، بيقفزوا على سلّم من أربع درجات:

~~~text القياس من Chrome (المحسوب)
وزن الأب      bolder      lighter
100           400         100
300           400         100
400           700         100
500           700         100
600           900         400
700           900         400
900           900         700
~~~

[[<strong>]] و [[<b>]] الافتراضي بتاعهم [[bolder]] مش [[700]]. عشان كده [[<strong>]] جوه عنوان (وزنه 700) بيبقى 900، ولو الخط مفيهوش 900 مش هتشوف فرق بينه وبين باقي العنوان.

~~~text القياس من Chrome (الافتراضي، جوه body وزنه 400)
<b> و <strong> و <h1>...<h6>     font-weight: 700
<em> و <i> و <cite> و <var> و <address> و <dfn>     font-style: italic
~~~

---

## ٢. التقيل المفبرك و [[font-synthesis-weight: none]]

لو الخط ملف واحد بس وطلبت [[700]]، المتصفح بيرسم الحروف نفسها أتخن بالحساب. ده اسمه faux bold أو synthesized bold.

~~~live 133 Arabic Typesetting: خط بوزن واحد
<style>
  p { font-family: "Arabic Typesetting", serif; font-size: 34px; margin: 0; }
  .b { font-weight: 700; }
  .n { font-weight: 700; font-synthesis-weight: none; }
</style>
<p>عادي: الخط العربي جميل</p>
<p class="b">700: الخط العربي جميل</p>
<p class="n">700 من غير فبركة: الخط العربي جميل</p>
~~~

**هتشوف إيه (على Windows، الخط ده بيجي مع النظام):** السطر التاني حروفه أتخن بس «ملطّخة»: الفتحات الصغيرة جوه الحروف (زي عين الميم والعين) قرّبت تتقفل. السطر التالت مطلوب منه 700 برضه وشكله زي الأول بالظبط، لأننا منعنا الفبركة.

التقيل الحقيقي مصمم الخط رسمه حرف حرف. المفبرك تتخين آلي، وشكله أضعف، وفي الخط العربي النسخ والرقعة بيبوّظ تفاصيل الحرف.

[[font-synthesis-weight: none]] بتقول للمتصفح: لو مفيش تقيل حقيقي، سيبه عادي. بتستخدمها لما تبقى محمّل وزن واحد من خط ويب ومش عايز تقيل مشوّه يظهر بالغلط.

---

## ٣. [[font-style: italic]] والعربي

المايل (italic) في اللاتيني مش مجرد حروف مايلة: نسخة مرسومة لوحدها بشكل حروف مختلف شوية. والخط العربي **ملوش مايل** في تقاليده، وأغلب الخطوط العربي مفيهاش نسخة مايلة.

~~~live 114 144 مايل حقيقي ومايل مفبرك
<style>
  p { font-family: "Segoe UI", Tahoma, sans-serif; font-size: 22px; margin: 4px 0; }
  .i { font-style: italic; }
  .no { font-style: italic; font-synthesis-style: none; }
</style>
<p>عادي: الخط العربي جميل Hamburg</p>
<p class="i">italic: الخط العربي جميل Hamburg</p>
<p class="no">italic من غير فبركة: الخط العربي جميل Hamburg</p>
~~~

**هتشوف إيه:**

- السطر التاني: الإنجليزي مايل، والعربي كمان مايل.
- السطر التالت: الإنجليزي لسه مايل، والعربي **رجع معدول**.

~~~text القياس من Chrome (صورة للصفحة + عرض الكلمة)
Segoe UI، «Hamburg»:   عادي 417.0    italic 409.8     ← العرض اتغيّر: ده ملف تاني (Segoe UI Italic) حقيقي
Segoe UI، العربي:      عادي 520.1    italic 520.2     ← نفس الملف، والحروف اتميّلت بالحساب
Tahoma (ملوش ملف مايل خالص):  الإنجليزي والعربي الاتنين مفبركين، ومع font-synthesis-style: none الاتنين معدولين
~~~

الميل المفبرك على العربي شكله غريب على القارئ: الحروف المتصلة بتتمط، والنقط بتبعد عن مكانها. وده بيحصل من غير ما تطلبه، لأن [[<em>]] و [[<i>]] و [[<cite>]] و [[<address>]] مايلين افتراضيًا (درس «strong و em»).

قدامك حلّين لصفحة عربي:

~~~css
/* الحل الأول: امنع الفبركة. الإنجليزي يفضل مايل والعربي معدول */
body { font-synthesis-style: none; }

/* الحل التاني: الغي الميل خالص من العناصر دي */
em, i, cite, address, dfn { font-style: normal; }
~~~

في الحالتين [[<em>]] العربي بقى شكله زي الكلام اللي حواليه، فلازم تدّيله تمييز تاني يتشاف: لون، أو وزن، أو خط تحته. المعنى (التشديد) لسه واصل لقارئ الشاشة من العنصر نفسه، والشكل شغلك إنت.

### [[font-style: oblique]]

[[oblique]] معناها «مايل بالحساب» صريحة، وممكن تحدد الزاوية:

~~~text القياس من Chrome (المحسوب)
font-style: italic            →  italic
font-style: oblique           →  oblique
font-style: oblique 20deg     →  oblique 20deg
font-style: oblique -10deg    →  oblique -10deg
~~~

المتصفح بيدوّر على نسخة oblique في الخط، ولو مفيش بيميّل النسخة العادية. في الشغل اليومي [[italic]] كفاية، و [[oblique]] بزاوية بتفيد مع الخطوط المتغيّرة اللي فيها محور ميل ([[slnt]]).

---

## ٤. [[font-synthesis: none]]

[[font-synthesis]] خاصية مختصرة بتجمع التلاتة اللي بيتفبركوا:

| الخاصية | بتتحكم في | القيم |
|---|---|---|
| [[font-synthesis-weight]] | التقيل المفبرك | [[auto]] (الافتراضي: مسموح) أو [[none]] |
| [[font-synthesis-style]] | المايل المفبرك | [[auto]] أو [[none]] |
| [[font-synthesis-small-caps]] | الـ small caps المفبركة (درس «font-variant و font-feature-settings») | [[auto]] أو [[none]] |

والمختصرة بتاخد أسامي **المسموح بيه**:

~~~text القياس من Chrome (المحسوب)
الافتراضي                       font-synthesis: weight style small-caps     (التلاتة مسموحين)
font-synthesis: none            →  none                                     (مفيش أي فبركة)
font-synthesis: weight          →  weight                                   (التقيل بس مسموح)
font-synthesis: style           →  weight = none     style = auto     small-caps = none
~~~

السطر الأخير فخ: [[font-synthesis: style]] مش معناها «اقفل المايل». معناها «المايل **بس** مسموح»، فبتقفل التقيل معاه. عشان تقفل حاجة واحدة استخدم الخاصية الطويلة بتاعتها.

بتتورّث، فبتتكتب مرة على [[body]]. وفيه خاصية رابعة [[font-synthesis-position]] للحروف العلوية والسفلية، ولسه مش في كل المتصفحات ([[CSS.supports]] رجّع false في Chrome 157).

---

## ٥. [[font: 700 1.5rem/1.3 system-ui, sans-serif]]

[[font]] بتكتب خصائص الخط كلها في سطر. الترتيب مش اختياري:

~~~text ترتيب font
font:  [style] [variant] [weight] [stretch]   size[/line-height]   family
       └──── اختياريين، بأي ترتيب ────┘       └─── إجباري ───┘     └ إجباري، وآخر حاجة ┘
~~~

~~~text القياس من Chrome (المحسوب)
font: italic 700 20px/1.6 Tahoma, sans-serif
  → font-style: italic   font-weight: 700   font-size: 20px   line-height: 32px   font-family: Tahoma, sans-serif

font: 20px                 (من غير خط)       → السطر كله اترمى: الحجم فضل 16px
font: Tahoma 20px          (الترتيب مقلوب)   → اترمى
font: bold Tahoma          (من غير حجم)      → اترمى
~~~

لو نسيت الحجم أو الخط أو قلبت الترتيب، المتصفح بيرمي السطر كله في صمت (زي أي قيمة غلط، درس «مقدمة CSS وتنسيق العناصر»).

### الفخ: [[font]] بتمسح اللي مكتبتوش

المختصرة بتظبط **كل** خصائص الخط. اللي مكتبتوش بيرجع لقيمته الأولى، حتى لو كنت كاتبه قبلها:

~~~live 170 192 font مسحت line-height
<style>
  body { font-family: Tahoma, sans-serif; line-height: 2; }
  .a { font-size: 18px; }
  .b { font: 18px Tahoma, sans-serif; }
  p { max-width: 360px; background: #f3f4f6; }
</style>
<p class="a">الفقرة دي عليها font-size بس، فسطورها لسه واخدة line-height: 2 من body.</p>
<p class="b">الفقرة دي عليها font المختصرة، فسطورها رجعت لازقة في بعض مع إن body لسه بيقول 2.</p>
~~~

**هتشوف إيه:** فقرتين بنفس الخط والحجم. الأولى سطورها واسعة، والتانية سطورها ضيقة. الفرق إن التانية مكتوبة بـ [[font]].

~~~text القياس من Chrome
قبلها: line-height: 2;  font-weight: 700;  font-variant-caps: small-caps;
font: 20px Tahoma;
  → line-height: normal    font-weight: 400    font-variant-caps: normal     (التلاتة اتمسحوا)
  → letter-spacing فضلت زي ما هي          (مش من خصائص font)
~~~

القاعدة: يا تكتب [[font]] وتحط فيها [[/1.8]]، يا تكتب الخصائص الطويلة. ومتكتبش [[font]] **بعد** [[line-height]] على نفس العنصر.

### [[font: inherit]] وكلمات النظام

- [[font: inherit]]: خد كل خصائص الخط من الأب. دي اللي بتتكتب للأزرار والحقول (الدرس اللي فات).
- [[font: menu]] و [[font: caption]] و [[font: status-bar]] وإخواتهم: خط حتة من واجهة النظام. اتقاس: [[font: menu]] رجّع [[12px "Segoe UI"]]. استخدامها نادر.

---

## ٦. [[font-stretch: condensed]]

بتختار نسخة أضيق أو أعرض من الخط، لو العيلة فيها نسخ بعرض مختلف (Condensed أو Expanded).

~~~text الكلمات والنسب (من MDN)
ultra-condensed  50%       extra-condensed  62.5%     condensed  75%      semi-condensed  87.5%
normal           100%
semi-expanded    112.5%    expanded         125%      extra-expanded  150%     ultra-expanded  200%
~~~

القيمة ممكن تبقى كلمة من دول، أو أي نسبة من 50% لـ 200%.

~~~text القياس من Chrome («Hamburg 123» بحجم 100px)
                          font-stretch: 100%     font-stretch: condensed
Arial                     605.9                  496.8     ← اتعرض بـ Arial Narrow (نسخة Condensed من نفس العيلة)
Segoe UI                  606.2                  606.2     ← مفيش نسخة ضيقة: مفيش تغيير
Tahoma                    600.9                  600.9

المحسوب: font-stretch: condensed  →  75%
~~~

العرض **مبيتفبركش**: لو الخط مفيهوش نسخة ضيقة، الخاصية مبتعملش حاجة (عكس التقيل والمايل).

**الاسم:** المواصفة غيّرت اسم الخاصية لـ [[font-width]] وسابت [[font-stretch]] اسم قديم شغال (MDN). في Chrome 157 الجديد لسه مش مدعوم ([[CSS.supports("font-width", "condensed")]] رجّع false)، والمنهج مستبعده لنفس السبب. اكتب [[font-stretch]].

---

## ٧. الخطوط المتغيّرة: [[font-variation-settings: "wght" 650]]

الخط العادي (static) ملف لكل وزن: Regular ملف، و Bold ملف. الخط **المتغيّر** (variable font) ملف واحد فيه «محاور»، وكل محور مدى متصل تختار منه أي رقم.

| المحور | بيتحكم في | الخاصية العادية اللي بتحركه |
|---|---|---|
| [[wght]] | الوزن | [[font-weight]] |
| [[wdth]] | العرض | [[font-stretch]] |
| [[slnt]] | زاوية الميل | [[font-style: oblique 10deg]] |
| [[ital]] | مايل ولا لأ | [[font-style: italic]] |
| [[opsz]] | الحجم البصري | [[font-optical-sizing]] |

على Windows فيه خط متغيّر جاي مع النظام اسمه Bahnschrift (لاتيني بس)، محور وزنه من 300 لـ 700 ومحور عرضه من 75 لـ 100. حمّلنا ملفه بـ [[@font-face]] وقسنا:

~~~text القياس من Chrome (كمية الحبر: عدد البيكسلات المرسومة لكلمة «Hamburg» بحجم 100px)
font-weight     الملف المتغيّر (محمّل بـ @font-face)     Tahoma (ملفين ثابتين)
300             7305                                    9959
400             9805                                    9959
500             10244                                   9959
550             10712                                   16934
600             11240                                   16934
700             12507                                   16934
~~~

في المتغيّر كل رقم ليه شكله: 550 موجود فعلًا بين 500 و 600. في Tahoma مفيش غير درجتين.

والعرض:

~~~text القياس من Chrome («Hamburg 123» بحجم 100px، الملف المتغيّر)
font-stretch: 100%                      575.8
font-stretch: 87.5%                     499.4
font-stretch: 75%                       423.0
font-variation-settings: "wdth" 80      453.6
~~~

### اكتب الخاصية العادية الأول

[[font-variation-settings]] هي الطريقة «الواطية»: بتكتب اسم المحور (أربع حروف بين تنصيص) والرقم. القاعدة في MDN: لو المحور ليه خاصية عادية، استخدمها هي. [[font-weight: 650]] أحسن من [[font-variation-settings: "wght" 650]] لتلات أسباب:

1. الخاصية العادية بتشتغل مع الخط الثابت كمان (بتاخد أقرب وزن). التانية مبتعملش حاجة من غير خط متغيّر.
2. [[font-variation-settings]] **قيمة واحدة**: لو كتبتها تاني في قاعدة تانية عشان تغيّر محور، المحاور اللي في الأولى بتتمسح.
3. الوراثة و [[bolder]] و [[<strong>]] كلهم بيفهموا [[font-weight]].

~~~text القياس من Chrome (فخ المسح)
.a { font-variation-settings: "wdth" 75; }
.a { font-variation-settings: "wght" 700; }      ← القاعدة التانية كسبت كلها
  → العرض رجع 575.8 (المحور wdth اتمسح)

الصح:  font-variation-settings: "wght" 700, "wdth" 75;     → 423.0
~~~

سيب [[font-variation-settings]] للمحاور الخاصة اللي ملهاش خاصية (محاور بيعملها مصمم الخط واسمها بحروف كبيرة زي [["GRAD"]]).

**ملحوظة متقاسة عن الخط المتسطّب:** لما استخدمنا Bahnschrift باسمه من الجهاز (من غير [[@font-face]])، المتصفح خد «النسخ المسمّاة» بس: [[font-weight: 500]] و [[550]] طلعوا زي 600، و [[font-variation-settings: "wdth" 75]] مغيّرتش العرض. المحاور المتصلة اشتغلت بس مع الملف المحمّل. يعني الخط المتغيّر بيبان على حقيقته لما تحمّله إنت (الدرس الجاي).

للعربي: خطوط ويب عربي كتير بتيجي متغيّرة بمحور وزن (وده اللي مشروع «next/font» بيحمّله في وحدة «الثيم والعربي والخطوط والأيقونات»). ملف واحد بدل خمسة.

### [[font-optical-sizing: auto]]

بعض الخطوط المتغيّرة فيها محور [[opsz]]: الحروف نفسها بتتغيّر مع الحجم. في الحجم الصغير بتبقى أعرض ومسافاتها أوسع عشان تتقري، وفي الكبير أدق وأرشق.

~~~text القياس من Chrome (Segoe UI Variable محمّل من ملفه: عرض الكلمة ÷ حجم الخط)
الحجم     font-optical-sizing: auto     font-optical-sizing: none
10px      7.7078                        7.6437
16px      7.6416                        7.6426
48px      7.6344                        7.6426
96px      7.6343                        7.6426
~~~

مع [[auto]] (الافتراضي) النسبة بتتغيّر مع الحجم: الحروف في 10px أعرض نسبيًا من 96px. مع [[none]] النسبة ثابتة: نفس الرسمة بتتكبّر وتتصغّر. سيبها [[auto]]، واقفلها بس لو المصمم طالب شكل واحد في كل الأحجام.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[font-weight: 500]] على خط فيه 400 و 700 بس | مفيش أي تغيير، أو قفزة للـ Bold |
| وزن 900 لعنوان عربي من غير تجربة | النسخة دي ممكن متبقاش فيها عربي، فالعنوان يطلع بخط تاني |
| تحميل وزن واحد من خط ويب واستخدام [[<strong>]] | تقيل مفبرك شكله ملطّخ |
| [[<em>]] في صفحة عربي من غير أي تعديل | ميل مفبرك على الحروف المتصلة |
| [[font-synthesis: style]] عشان «تقفل» المايل | قفلت التقيل والـ small caps وسابت المايل |
| [[font: 18px Tahoma]] بعد [[line-height: 1.8]] | [[line-height]] رجعت [[normal]] والسطور لزقت في بعض |
| [[font: bold 18px]] من غير خط | السطر كله اترمى |
| [[font-variation-settings]] في قاعدتين | التانية مسحت محاور الأولى |
| [[font-stretch: condensed]] على خط ملوش نسخة ضيقة | ولا حاجة: العرض مبيتفبركش |

---

## الخلاصة

- [[font-weight]] رقم من 1 لـ 1000. اللي ملوش ملف بياخد أقرب ملف، فاعرف خطك فيه أنهي أوزان.
- [[bolder]] و [[lighter]] بيقفزوا على سلّم (100 و 400 و 700 و 900) حسب وزن الأب.
- العربي ملوش مايل: [[font-synthesis-style: none]] أو [[font-style: normal]]، وادّي [[<em>]] تمييز تاني.
- [[font]] المختصرة: الحجم والخط إجباريين وبالترتيب، وبتمسح [[line-height]] لو مكتبتهاش جواها.
- [[font-stretch]] محتاجة نسخة ضيقة في الخط، ومبتتفبركش.
- الخط المتغيّر ملف واحد بمحاور. حرّكه بالخصائص العادية، و [[font-variation-settings]] للمحاور الخاصة بس.`,
          try: R`في ملف [[weights.html]] اكتب نفس الجملة العربي تسع مرات، كل مرة بوزن من 100 لـ 900، بخط [[Tahoma]]. كام شكل مختلف طلع؟ غيّر الخط لـ [["Segoe UI"]] (لو على Windows) أو [[system-ui]] وعدّ تاني. وبعدين زوّد سطر عاشر فيه [[<em>]] جواه كلمة عربي وكلمة إنجليزي، وجرّب عليه [[font-synthesis-style: none]].`,
          sol: R`~~~live 278 300 weights.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أوزان الخط</title>
<style>
  body { font-family: Tahoma, sans-serif; font-size: 18px; }
  p { margin: 2px 0; }
  .keep { font-synthesis-style: none; }
</style>
</head>
<body>
<p style="font-weight: 100">100 الخط العربي</p>
<p style="font-weight: 200">200 الخط العربي</p>
<p style="font-weight: 300">300 الخط العربي</p>
<p style="font-weight: 400">400 الخط العربي</p>
<p style="font-weight: 500">500 الخط العربي</p>
<p style="font-weight: 600">600 الخط العربي</p>
<p style="font-weight: 700">700 الخط العربي</p>
<p style="font-weight: 800">800 الخط العربي</p>
<p style="font-weight: 900">900 الخط العربي</p>
<p>من غير تعديل: <em>مهم جدًا very important</em></p>
<p class="keep">بـ font-synthesis-style: none: <em>مهم جدًا very important</em></p>
</body>
</html>
~~~

**هتشوف إيه:**

- بـ Tahoma: **شكلين بس**. من 100 لـ 500 عادي، ومن 600 لـ 900 تقيل.
- بـ Segoe UI على Windows: خمس أشكال للعربي (Light و Semilight و Regular و Semibold و Bold)، وعند 800 و 900 العربي بيتحوّل لخط تاني.
- السطر العاشر: العربي والإنجليزي مايلين. السطر الأخير: الاتنين معدولين، لأن Tahoma ملوش ملف مايل خالص، فكل الميل كان مفبرك.

~~~text القياس من Chrome (Tahoma، عرض «السلام عليكم» بحجم 100px)
من 100 لـ 500     571.0
من 600 لـ 900     627.7
~~~

**اللي تتعلمه:** قبل ما تكتب [[font-weight: 500]] أو [[300]] في التصميم، اتأكد إن الخط فيه الوزن ده. لو مفيهوش، الرقم بيتكتب وميحصلش حاجة، ومفيش أي رسالة تقولك.`,
          deep: {
            why: R`الوزن هو أقوى أداة ترتيب في الصفحة بعد الحجم: العنوان تقيل، والمقدمة خفيفة، والكلمة المهمة تقيلة وسط الفقرة. بس الأداة دي بتعتمد على ملفات الخط الموجودة فعلًا، ومفيش أي رسالة لما الوزن المطلوب مش موجود. فاللي ميعرفش القاعدة بيكتب [[500]] و [[600]] ويفتكر إن المتصفح «مش شغال». وفي العربي فيه مشكلة زيادة: الميل الافتراضي لـ [[<em>]] و [[<cite>]] بيتفبرك على خط ملوش مايل، فالصفحة العربي من غير سطر CSS واحد بتطلع فيها حروف ممطوطة.`,
            how: R`المتصفح بيجمع كل ملفات العيلة (faces)، كل ملف ليه وزن وميل وعرض. وبعدين بيطابق بالترتيب: العرض الأول، ثم الميل، ثم الوزن. للوزن بيدوّر على المطلوب بالظبط، ولو مش موجود بياخد أقرب واحد حسب قواعد المواصفة (واللي اتقاس على Windows فوق هو نتيجة التطبيق ده مع ملفات النظام). ولو الملف المختار أخف من المطلوب بفرق كبير والفبركة مسموحة، بيتخّن الرسم. ونفس الفكرة للميل: لو مفيش ملف italic أو oblique، بيميّل الحروف بزاوية ثابتة.

في الخط المتغيّر، الملف فيه «أساتذة» (masters) للطرفين والمتصفح بيحسب الشكل اللي بينهم لأي رقم على المحور. [[font-weight]] و [[font-stretch]] و [[font-style]] بيتحولوا لقيم على المحاور [[wght]] و [[wdth]] و [[slnt]]/[[ital]]، و [[font-variation-settings]] بتتكتب فوقهم.`,
            when: R`[[font-weight]]: في كل صفحة، للعناوين والتأكيد. [[font-synthesis]]: أول ما تحمّل خط ويب بأوزان محدودة، وفي أي صفحة عربي عشان الميل المفبرك. [[font]] المختصرة: في القاعدة الأساسية بتاعة [[body]]، و [[font: inherit]] للفورم. [[font-stretch]]: عناوين ضيقة أو جداول مزحومة، لو الخط ليه نسخة ضيقة. الخطوط المتغيّرة: لما تحتاج أكتر من وزنين أو تلاتة من نفس الخط.`,
            mistakes: R`وزن مش موجود في الخط. وزن موجود للاتيني ومش موجود للعربي. تقيل مفبرك من خط ويب بوزن واحد. ميل مفبرك على العربي. [[font]] المختصرة بتمسح [[line-height]]. [[font]] من غير حجم أو من غير خط. [[font-synthesis: style]] مفهومة بالعكس. و [[font-variation-settings]] متكررة في قاعدتين.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** رأس مقال في «مدوّنة حبر»: العنوان الفرعي [[.kicker]] خفيف (300)، والعنوان [[h1]] تقيل جدًا (800)، واسم الكاتب [[.by]] نص تقيل (600). الخط Segoe UI أو خط النظام. (من قسم ١ في الشرح)`, done: R`التلات أوزان المحسوبة 300 و 800 و 600، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  body { font-family: "Segoe UI", system-ui, sans-serif; }
  .kicker { }
  h1 { }
  .by { }
</style>
<p class="kicker">تجارب</p>
<h1>شهر كامل من غير سوشيال ميديا</h1>
<p class="by">كتبت: سلمى فؤاد</p>`, checks: [
              { say: R`[[.kicker]] وزنه 300`, q: ".kicker", style: ["font-weight", "300"] },
              { say: R`العنوان وزنه 800`, q: "h1", style: ["font-weight", "800"] },
              { say: R`اسم الكاتب وزنه 600`, q: ".by", style: ["font-weight", "600"] }
            ] }, sol: R`~~~live 160 203 الحل
<style>
  body { font-family: "Segoe UI", system-ui, sans-serif; }
  .kicker { font-weight: 300; }
  h1 { font-weight: 800; }
  .by { font-weight: 600; }
</style>
<p class="kicker">تجارب</p>
<h1>شهر كامل من غير سوشيال ميديا</h1>
<p class="by">كتبت: سلمى فؤاد</p>
~~~

**هتشوف إيه (على Windows):** «تجارب» رفيعة، والعنوان تقيل، واسم الكاتب بين الاتنين. وبص على العنوان كويس: طلبنا 800 والخط مفيهوش 800، فالمتصفح راح لـ Black، و Black مفيهوش عربي، فالعنوان العربي اتعرض بخط تاني.

**ليه مهم:** الشروط كلها ✓ (المحسوب 800)، والشكل مش اللي إنت عايزه. [[getComputedStyle]] بيقول اللي طلبته، مش اللي اترسم. في الشغل الحقيقي كنت هتنزّل العنوان لـ [[700]] لحد ما تحمّل خط ويب فيه 800 عربي.

**الغلطة الشائعة:** [[font-weight: 800px]] أو [[font-weight: "bold"]]. الوزن رقم من غير وحدة، أو كلمة من غير تنصيص.

~~~text القياس من Chrome
.kicker   font-weight: 300
h1        font-weight: 800
.by       font-weight: 600
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فقرة المقدمة [[.lead]] المفروض سطورها واسعة زي باقي الصفحة ([[line-height: 1.8]])، وطلعت لازقة. السبب سطر واحد في قاعدة [[.lead]]. صلّحه وخلّي القاعدة لسه بتستخدم [[font]] المختصرة. (من قسم ٥ في الشرح: «font بتمسح اللي مكتبتوش»)`, done: R`سطر [[.lead]] بقى 36px (20 × 1.8) ولسه حجمها 20px، وكل الشروط ✓.`, work: { h: 220, start: R`<style>
  body { font-family: Tahoma, sans-serif; font-size: 16px; line-height: 1.8; }
  .lead { font: 20px Tahoma, sans-serif; }
  p { max-width: 380px; }
</style>
<p class="lead">المقدمة دي المفروض تبقى أكبر من باقي المقال وسطورها مريحة زيه بالظبط.</p>
<p>ودي فقرة عادية من المقال، سطورها واخدة المسافة من body ومفيهاش مشكلة.</p>`, checks: [
              { say: R`سطر المقدمة 36px (1.8 من حجمها)`, q: ".lead", style: ["line-height", "36px"] },
              { say: R`حجم المقدمة لسه 20px`, q: ".lead", style: ["font-size", "20px"] },
              { say: R`القاعدة لسه بتستخدم [[font]] المختصرة`, src: "font: " },
              { say: R`الفقرة العادية متغيّرتش (28.8px)`, q: "p:not(.lead)", style: ["line-height", "28.8px"] }
            ] }, sol: R`~~~live 186 222 بعد التصليح
<style>
  body { font-family: Tahoma, sans-serif; font-size: 16px; line-height: 1.8; }
  .lead { font: 20px/1.8 Tahoma, sans-serif; }
  p { max-width: 380px; }
</style>
<p class="lead">المقدمة دي المفروض تبقى أكبر من باقي المقال وسطورها مريحة زيه بالظبط.</p>
<p>ودي فقرة عادية من المقال، سطورها واخدة المسافة من body ومفيهاش مشكلة.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 162 186 قبل
<style>
  body { font-family: Tahoma, sans-serif; font-size: 16px; line-height: 1.8; }
  .lead { font: 20px Tahoma, sans-serif; }
  p { max-width: 380px; }
</style>
<p class="lead">المقدمة دي المفروض تبقى أكبر من باقي المقال وسطورها مريحة زيه بالظبط.</p>
<p>ودي فقرة عادية من المقال، سطورها واخدة المسافة من body ومفيهاش مشكلة.</p>
~~~

**هتشوف إيه:** قبل: المقدمة خطها كبير وسطورها لازقة، والفقرة اللي تحتها سطورها واسعة. بعد: الاتنين سطورهم مريحة.

**ليه:** [[font]] بتظبط [[line-height]] كمان، ولما مبتكتبهاش بترجع [[normal]] وتغلب الوراثة من [[body]]. الحل إنها تتكتب جوه المختصرة بعد الحجم وشرطة مايلة: [[20px/1.8]].

**حل تاني صح:** تسيب المختصرة وتكتب [[font-size: 20px]] بس. بس التمرين طالب المختصرة.

**الغلطة الشائعة:** تزوّد [[line-height: 1.8]] **قبل** سطر [[font]] في نفس القاعدة. المختصرة هتمسحها تاني. لازم تبقى بعدها أو جواها.

~~~text القياس من Chrome
                قبل          بعد
.lead line-height   normal       36px
p     line-height   28.8px       28.8px
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع، وبعدين صلّح:** [[strong]] مكتوب له [[font-weight: 700]]. فيه واحد جوه فقرة وواحد جوه [[h2]]. اللي في العنوان هيبان مختلف عن باقي العنوان؟ توقّع، وبعدين غيّر القيمة لكلمة واحدة تخلّي [[strong]] دايمًا أتقل من اللي حواليه. (من قسم ١ في الشرح: «bolder و lighter»)`, done: R`توقّعت إن اللي في العنوان مش هيبان (700 جوه 700)، وبعد التصليح بقى 900 في العنوان و 700 في الفقرة، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  body { font-family: "Segoe UI", system-ui, sans-serif; }
  strong { font-weight: 700; }
</style>
<h2>النسخة الجديدة <strong>مجانية</strong> للكل</h2>
<p>النسخة الجديدة <strong>مجانية</strong> للكل.</p>`, checks: [
              { say: R`[[strong]] اللي في العنوان بقى 900`, q: "h2 strong", style: ["font-weight", "900"] },
              { say: R`[[strong]] اللي في الفقرة 700`, q: "p strong", style: ["font-weight", "700"] },
              { say: R`القيمة كلمة نسبية مش رقم`, src: "bolder" }
            ] }, sol: R`~~~live 109 بعد التصليح
<style>
  body { font-family: "Segoe UI", system-ui, sans-serif; }
  strong { font-weight: bolder; }
</style>
<h2>النسخة الجديدة <strong>مجانية</strong> للكل</h2>
<p>النسخة الجديدة <strong>مجانية</strong> للكل.</p>
~~~

**هتشوف إيه:** في الفقرة «مجانية» تقيلة وسط كلام عادي. في العنوان «مجانية» بقت مختلفة عن باقي العنوان. على Windows بـ Segoe UI الاختلاف إنها بخط تاني (نسخة Black مفيهاش عربي، قسم ١). في خط فيه 900 عربي كانت هتبان أتقل وبس.

**ليه:** [[700]] رقم مطلق: جوه عنوان وزنه 700 مفيش فرق. [[bolder]] بتحسب من الأب: 400 ← 700، و 700 ← 900.

| | [[font-weight: 700]] | [[font-weight: bolder]] |
|---|---|---|
| [[strong]] جوه [[p]] (400) | 700 | 700 |
| [[strong]] جوه [[h2]] (700) | 700: مش باين | 900 |

**اللي تاخد بالك منه:** [[bolder]] هي الافتراضي بتاع المتصفح لـ [[strong]] أصلًا. اللي كتب [[700]] هو اللي بوّظها. و [[900]] محتاجة خط فيه الوزن ده بالعربي، وإلا ميّز الكلمة في العنوان بلون.

~~~text القياس من Chrome
h2 strong   قبل 700     بعد 900
p strong    قبل 700     بعد 700
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في مقال عربي، الكلمة اللي جوه [[<em>]] واسم الكتاب اللي جوه [[<cite>]] طالعين مايلين بميل مفبرك. امنع الفبركة من [[body]] بسطر واحد (عشان الإنجليزي يفضل مايل حقيقي)، وادّي [[em]] لون [[#b45309]] عشان التشديد يفضل باين. (من قسم ٣ و ٤ في الشرح)`, done: R`[[font-synthesis-style]] بقت [[none]] على الكل، و [[em]] لسه [[italic]] ولونه بني، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  body { font-family: "Segoe UI", Tahoma, sans-serif; font-size: 18px; line-height: 1.8; }
  em { }
</style>
<p>الكتاب ده <em>لازم</em> يتقري مرتين: <cite>فن الكتابة الواضحة</cite> (Clear Writing).</p>
<p>وبالإنجليزي: this is <em>really</em> important.</p>`, checks: [
              { say: R`الفبركة ممنوعة على [[em]] (ورثها من [[body]])`, q: "em", style: ["font-synthesis-style", "none"] },
              { say: R`وعلى [[cite]] كمان`, q: "cite", style: ["font-synthesis-style", "none"] },
              { say: R`[[em]] لسه [[italic]] (عشان الإنجليزي)`, q: "em", style: ["font-style", "italic"] },
              { say: R`[[em]] لونه [[#b45309]]`, q: "em", style: ["color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 119 151 بعد التصليح
<style>
  body { font-family: "Segoe UI", Tahoma, sans-serif; font-size: 18px; line-height: 1.8; font-synthesis-style: none; }
  em { color: #b45309; }
</style>
<p>الكتاب ده <em>لازم</em> يتقري مرتين: <cite>فن الكتابة الواضحة</cite> (Clear Writing).</p>
<p>وبالإنجليزي: this is <em>really</em> important.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 119 151 قبل
<style>
  body { font-family: "Segoe UI", Tahoma, sans-serif; font-size: 18px; line-height: 1.8; }
</style>
<p>الكتاب ده <em>لازم</em> يتقري مرتين: <cite>فن الكتابة الواضحة</cite> (Clear Writing).</p>
<p>وبالإنجليزي: this is <em>really</em> important.</p>
~~~

**هتشوف إيه:**

- قبل: «لازم» واسم الكتاب العربي مايلين وممطوطين.
- بعد: الاتنين معدولين، و «لازم» بنية. و «really» في السطر التاني **لسه مايلة**: Segoe UI ليه ملف مايل حقيقي للاتيني، فمفيش فبركة تتمنع.

**ليه [[font-synthesis-style: none]] ومش [[font-style: normal]]؟** التانية كانت هتشيل الميل من الإنجليزي كمان. الأولى بتشيل المفبرك بس.

**الغلطة الشائعة:** [[font-synthesis: style]]. دي معناها «المايل بس مسموح»، يعني عكس المطلوب، وبتقفل التقيل المفبرك كمان.

**ملحوظة:** اسم الكتاب في [[<cite>]] بقى شكله زي باقي الكلام. لو عايزه يتميّز، ادّيله لون أو حطه بين «» في النص.

~~~text القياس من Chrome
em     font-style: italic    font-synthesis-style: none    color: rgb(180, 83, 9)
cite   font-style: italic    font-synthesis-style: none
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** المصمم بعتلك ملف التصميم وكاتب: العناوين «Cairo ExtraBold»، والفقرات «Cairo Regular»، والملاحظات «Cairo Light». وبعتلك ملف خط واحد اسمه [[Cairo-Regular.woff2]]. اكتبله في ٣ سطور إيه اللي هيحصل لو اشتغلت بالملف ده بس، وإيه اللي محتاجه منه. (من قسم ١ و ٢ و ٧ في الشرح)`, done: R`قلت إن 800 هيتفبرك من الـ Regular وإن 300 مش هيبان خالص، وطلبت يا ملف لكل وزن يا النسخة المتغيّرة.`, sol: R`**إجابة نموذجية:**

1. بملف Regular بس: العناوين ([[font-weight: 800]]) هتتعرض بتقيل **مفبرك** (المتصفح هيتخّن الـ Regular بالحساب)، وشكله ملطّخ وأضعف من ExtraBold الحقيقي.
2. الملاحظات ([[font-weight: 300]]) هتتعرض **Regular زي ما هي**: المتصفح بيعرف يتخّن بالحساب، ومبيعرفش يرفّع.
3. محتاج واحدة من اتنين: تلات ملفات (Light و Regular و ExtraBold)، أو ملف واحد **متغيّر** فيه محور الوزن ([[wght]]) من 300 لـ 800. المتغيّر أحسن لو هنستخدم أكتر من وزنين.

**وللأمان** أكتب [[font-synthesis-weight: none]] على [[body]]: لو ملف وزن اتأخر أو فشل تحميله، يظهر الكلام عادي بدل تقيل مشوّه.

| المطلوب | بملف Regular بس | اللي بيتشاف |
|---|---|---|
| 800 | مفبرك | تقيل ملطّخ |
| 400 | حقيقي | صح |
| 300 | مفيش | زي الـ 400 بالظبط |` }
          ]
        },
        {
          cmd: "@font-face و font-display",
          title: "خط من موقعك: تحمّله إزاي، وبيظهر إمتى، وتمنع القفزة إزاي",
          pre: [
            { to: "css/font-family و font-size", why: R`خط الويب بيتحط أول قايمة [[font-family]]، وباقي القايمة هي اللي بتتعرض لحد ما يوصل` },
            { to: "css/المسارات: مطلق ونسبي", why: R`[[url()]] جوه [[@font-face]] مسار لملف، بنفس قواعد المسارات` }
          ],
          ref: [
            { t: "MDN: @font-face", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face" },
            { t: "MDN: font-display", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display" },
            { t: "MDN: unicode-range", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/unicode-range" },
            { t: "MDN: src", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/src" },
            { t: "MDN: size-adjust", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/size-adjust" },
            { t: "MDN: font-size-adjust", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size-adjust" },
            { t: "MDN: rel=preload", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload" }
          ],
          desc: R`[[@font-face]] بتعرّف المتصفح على خط مش موجود على جهاز الزائر: بتدّيله اسم من عندك، ومسار ملف الخط على موقعك. بعدها الاسم ده بيتكتب في [[font-family]] زي أي خط.
والملف بياخد وقت لحد ما ينزل. [[font-display]] بتحدد الكلام يتعرض إزاي في الوقت ده: يستخبى، ولا يظهر بخط الجهاز ويتبدّل بعدين.`,
          example: R`@font-face { font-family: "Hebr"; src: url("fonts/hebr-regular.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Hebr"; src: url("fonts/hebr-bold.woff2") format("woff2"); font-weight: 700; font-display: swap; }
@font-face { font-family: "Hebr"; src: url("fonts/hebr-latin.woff2") format("woff2"); unicode-range: U+0000-00FF; }
body { font-family: "Hebr", system-ui, "Segoe UI", Tahoma, sans-serif; }`,
          flag: "script",
          lines: [
            R`تعريف خط اسمه «Hebr» (اسم من عندنا): ملفه [[fonts/hebr-regular.woff2]]، وصيغته woff2، وده ملف الوزن العادي 400، ولحد ما ينزل اعرض الكلام بخط بديل ([[swap]]).`,
            R`نفس الاسم «Hebr» بملف تاني للوزن 700. المتصفح بيجمع التعريفين في عيلة واحدة، وبياخد الملف ده لما يلاقي كلام تقيل.`,
            R`ملف تالت لنفس العيلة، ليه [[unicode-range]]: بيتستخدم بس للحروف من [[U+0000]] لـ [[U+00FF]] (اللاتيني والأرقام والمسافة). لو الصفحة مفيهاش ولا حرف منهم، الملف مبينزلش.`,
            R`استخدام الخط: «Hebr» أول القايمة، وبعده خطوط الجهاز. دول اللي بيتعرضوا لحد ما الملف ينزل، ولو فشل تحميله.`
          ],
          teach: R`## الفكرة في سطرين

في درس «font-family و font-size» الخط كان لازم يبقى على جهاز الزائر. [[@font-face]] بتخلّي الخط ينزل **مع الصفحة**، فكل الزوار يشوفوا نفس الخط. التمن: ملف زيادة بينزل، ولحظة في أول التحميل الخط لسه موصلش فيها.

المعاينة الحية في الموقع ده معزولة عن الشبكة، فمفيهاش تحميل خطوط. كل أرقام التحميل في الدرس متقاسة بـ Chrome 157 على سيرفر Node محلي بيأخّر ملف الخط بمدة إحنا محددينها وبيكتب كل طلب بيوصله.

---

## ١. القاعدة: [[@font-face { font-family: ...; src: ...; }]]

~~~css style.css
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Hebr", system-ui, "Segoe UI", Tahoma, sans-serif;
}
~~~

اللي جوه [[@font-face]] اسمهم **descriptors** مش خصائص: بيوصفوا الملف، مبينسّقوش عنصر.

| الـ descriptor | معناه |
|---|---|
| [[font-family: "Hebr"]] | الاسم اللي هتنادي بيه الخط. **إنت اللي بتختاره**، ومش لازم يبقى اسم الخط الحقيقي |
| [[src: url("fonts/hebr-regular.woff2") format("woff2")]] | مكان الملف وصيغته |
| [[font-weight: 400]] | الملف ده هو الوزن 400 من العيلة |
| [[font-style: normal]] | الملف ده النسخة المعدولة (مش المايلة) |
| [[font-display: swap]] | الكلام يتعرض إزاي لحد ما الملف ينزل (القسم ٤) |

حاجتين بيتلخبط فيهم المبتدئ:

**[[font-weight]] هنا مش أمر.** جوه [[@font-face]] هي بتقول «الملف ده وزنه كام»، مش «خلّي الخط تقيل». لو كتبت [[font-weight: 700]] على ملف Regular، المتصفح هيصدّقك ويعرضه لما حد يطلب التقيل.

**[[@font-face]] لوحدها مبتنزّلش حاجة.** هي تعريف بس. الملف بينزل لما عنصر في الصفحة **فيه كلام** يستخدم الاسم ده في [[font-family]].

~~~text القياس من Chrome (لوج السيرفر: الطلبات اللي وصلت)
@font-face "Hebr" متعرّف، و body بيستخدمه، وفي الصفحة كلام      →  GET /fonts/hebr-regular  ✓
@font-face "Unused" متعرّف، ومفيش عنصر بيستخدمه                 →  مفيش أي طلب
~~~

يعني تعريف عشر خطوط مش بيتقّل الصفحة. استخدامهم هو اللي بيتقّلها.

**المسار نسبي لملف الـ CSS.** [[url("fonts/hebr-regular.woff2")]] جوه [[css/style.css]] معناها [[css/fonts/hebr-regular.woff2]]، مش فولدر [[fonts]] اللي جنب الصفحة (MDN). لو الـ CSS في فولدر والخطوط في فولدر جنبه: [[url("../fonts/...")]].

---

## ٢. صيغ الملفات

| الصيغة | الامتداد | تستخدمها؟ |
|---|---|---|
| WOFF2 | [[.woff2]] | **أيوه، وهي بس.** مضغوطة أحسن ضغط، وكل المتصفحات الحالية بتفتحها |
| WOFF | [[.woff]] | للمتصفحات القديمة جدًا. مبقتش محتاجها |
| TrueType و OpenType | [[.ttf]] و [[.otf]] | دي صيغة التسطيب على الجهاز. بتشتغل في المتصفح بس حجمها أكبر بكتير |

[[format("woff2")]] تلميح للمتصفح: «الملف ده woff2». لو المتصفح ميعرفش الصيغة، بيعدّي الملف **من غير ما ينزّله** ويروح للي بعده في [[src]]:

~~~text القياس من Chrome (لوج السيرفر)
src: url("a.ttf") format("made-up"),
     url("b.ttf") format("truetype");

→  GET /b.ttf        (a.ttf متطلبش خالص: صيغته مش معروفة)
~~~

عشان كده التلميح مهم: من غيره المتصفح بينزّل الملف الأول عشان يعرف هو إيه.

### [[src]] قايمة بالترتيب، وفيها [[local()]]

~~~css
@font-face {
  font-family: "Hebr";
  src: local("Hebr Naskh"),
       url("fonts/hebr-regular.woff2") format("woff2");
}
~~~

[[local("اسم")]] معناها «لو الخط ده متسطّب على جهاز الزائر، استخدمه ومتنزّلش حاجة».

~~~text القياس من Chrome (لوج السيرفر)
src: local("Tahoma"), url("x.ttf")             →  مفيش طلب (Tahoma موجود على الجهاز)
src: local("No Such Font Here"), url("x.ttf")  →  GET /x.ttf
~~~

بتوفّر تحميل، بس فيها مخاطرة: النسخة اللي على جهاز الزائر ممكن تبقى قديمة أو ناقصة حروف. في المواقع الحقيقية أغلب الناس بتكتب [[url()]] بس.

و [[local()]] ليها استخدام تاني حلو: تعمل اسم واحد لخطوط الجهاز، من غير أي تحميل. ده بيشتغل في المعاينة:

~~~live 122 اسم من عندنا لخط موجود على الجهاز
<style>
  @font-face {
    font-family: "Site Sans";
    src: local("Segoe UI"), local("Tahoma"), local("Arial");
  }
  .a { font-family: "Site Sans", serif; font-size: 22px; }
  .b { font-family: serif; font-size: 22px; }
</style>
<p class="a">الفقرة دي بخط اسمه Site Sans</p>
<p class="b">ودي بالـ serif الافتراضي للمقارنة</p>
~~~

**هتشوف إيه (على Windows):** السطر الأول بخط Segoe UI مع إن مفيش خط اسمه «Site Sans» في الدنيا. الاسم من عندنا، والملف من الجهاز. لو مفيش ولا خط من التلاتة عندك، السطرين هيبقوا زي بعض.

---

## ٣. عيلة واحدة بكذا ملف

كل وزن أو ميل ملف، وكلهم بنفس [[font-family]]:

~~~css
@font-face { font-family: "Hebr"; src: url("fonts/hebr-regular.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "Hebr"; src: url("fonts/hebr-bold.woff2") format("woff2"); font-weight: 700; }
~~~

والمتصفح بينزّل **اللي الصفحة محتاجاه بس**:

~~~text القياس من Chrome (لوج السيرفر)
الصفحة فيها <p>كلام</p> بس               →  GET hebr-regular      (ملف الـ bold متطلبش)
الصفحة فيها <p><b>تقيل</b></p> بس        →  GET hebr-bold         (ملف الـ regular متطلبش)
~~~

لو عرّفت ملف واحد (400) والصفحة فيها [[<strong>]]، المتصفح هيفبرك التقيل من الملف العادي (درس «font-weight و font-style»). يا تزوّد ملف الـ 700، يا تكتب [[font-synthesis-weight: none]].

### الخط المتغيّر: [[font-weight: 300 700]]

لو الملف خط متغيّر (variable)، بتكتب **مدى** بدل رقم:

~~~css
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-variable.woff2") format("woff2");
  font-weight: 300 700;
}
~~~

معناها «الملف ده بيغطي كل الأوزان من 300 لـ 700». ملف واحد وطلب واحد لكل الأوزان. من غير المدى، المتصفح هيعتبر الملف وزن 400 بس ويفبرك الباقي.

---

## ٤. [[font-display: swap]]

من لحظة ما المتصفح يحتاج الخط لحد ما الملف يوصل، فيه كلام لازم يتعرض. المواصفة بتقسّم الوقت ده تلات فترات:

| الفترة | الكلام بيتعرض إزاي | لو الخط وصل فيها |
|---|---|---|
| **block** | **مخفي** (مكانه محجوز والحروف مش باينة) | بيتعرض بيه |
| **swap** | بالخط البديل (اللي بعده في القايمة) | بيتبدّل للخط الجديد |
| **failure** | بالخط البديل | **مبيتبدّلش**: اتعامل كإنه فشل |

و [[font-display]] بتحدد طول كل فترة:

| القيمة | فترة الإخفاء | فترة التبديل | اللي بيحصل |
|---|---|---|---|
| [[font-display: auto]] | المتصفح يقرر | المتصفح يقرر | في Chrome بتتصرف زي [[block]] |
| [[font-display: block]] | قصيرة | مفتوحة | الكلام مخفي في الأول (لحد 3 ثواني في Chrome حسب وثائق web.dev)، وبعدها بديل |
| [[font-display: swap]] | شبه صفر | مفتوحة | البديل فورًا، والتبديل وقت ما الخط يوصل |
| [[font-display: fallback]] | شبه صفر | قصيرة | البديل فورًا، والتبديل لو الخط وصل بسرعة بس |
| [[font-display: optional]] | شبه صفر | مفيش | الخط بيتستخدم بس لو جاهز فورًا |

وده اللي اتقاس. خمس جمل، كل واحدة بخط ويب بقيمة مختلفة، والبديل Tahoma. الرقم هو عرض الجملة: لما يتغيّر يبقى الخط اتبدّل.

~~~text القياس من Chrome (الخط اتأخر 1.5 ثانية)
الوقت      auto     block    swap     fallback   optional
200ms      224      231      231      254        258       ← كله بمقاس البديل
1000ms     224      231      231      254        258
2000ms     120      126      123      140        258       ← الأربعة اتبدّلوا. optional لأ
6000ms     120      126      123      140        258
~~~

~~~text القياس من Chrome (الخط اتأخر 4.5 ثانية)
4000ms     224      231      231      254        258
5000ms     120      126      123      254        258       ← fallback مبقاش بيتبدّل: فترته خلصت
~~~

~~~text القياس من Chrome (الخط وصل في أقل من 50ms)
50ms       120      126      123      140        120       ← optional استخدمه لأنه كان جاهز
~~~

اللي الأرقام بتقوله:

- [[swap]] و [[block]] و [[auto]]: بيتبدّلوا للخط الجديد مهما اتأخر.
- [[fallback]]: اتبدّل لما الخط وصل بعد ثانية ونص، وماتبدّلش لما وصل بعد أربع ثواني ونص.
- [[optional]]: ماتبدّلش ولا مرة لما الخط اتأخر، حتى 300ms. استخدمه بس لما كان جاهز فورًا.

اللي الأرقام **مبتقولوش**: الكلام كان باين ولا مخفي. العرض بيتقاس حتى لو الحروف مخفية. إن [[block]] و [[auto]] بيخفوا الكلام في الأول ده من MDN (تعريف فترة block)، ومتقاسش هنا.

المشكلتين ليهم أسامي:

- **FOIT** (Flash Of Invisible Text): الكلام مخفي لحد ما الخط يوصل. ده [[block]]. على نت ضعيف الزائر بيشوف صفحة فيها صور وألوان ومفيهاش كلام.
- **FOUT** (Flash Of Unstyled Text): الكلام باين بالبديل وبعدين بيتبدّل قدام عين الزائر. ده [[swap]].

FOUT أهون: الزائر بيقرا من أول لحظة. عشان كده [[swap]] هي الاختيار المعتاد.

| الموقف | القيمة | ليه |
|---|---|---|
| خط الفقرات والعناوين | [[swap]] | الكلام يتقري فورًا، والخط ييجي لما ييجي |
| خط لو اتأخر مش فارق (والقفزة المتأخرة مضايقة) | [[fallback]] | لو مجاش بسرعة، كمّل بالبديل |
| خط تحسين مش أساسي، والنت ضعيف عند جمهورك | [[optional]] | مفيش قفزة خالص. في الزيارة التانية الخط بيبقى في الـ cache فبيظهر |
| خط أيقونات (الحرف البديل ملوش معنى) | [[block]] | حرف غلط أسوأ من فراغ |

---

## ٥. القفزة وقت التبديل، وتظبيط البديل

[[swap]] ليها تمن: الخط الجديد مقاساته غير البديل، فالفقرة بتاخد عدد سطور مختلف، وكل اللي تحتها بيتحرك.

~~~text القياس من Chrome (نفس الفقرة، عرضها 300px، والخط 18px/1.7)
بالبديل (Tahoma)            ارتفاعها 122.38px     (4 سطور)
بخط الويب بعد ما وصل        ارتفاعها 61.19px      (سطرين)
~~~

الفقرة نزلت من 4 سطور لسطرين قدام عين القارئ، وكل اللي تحتها طلع 61px. ده اسمه layout shift، وبيتحسب ضدك في مقاييس الأداء (وحدة «الأداء»).

الحل: **تظبّط البديل** عشان مقاساته تقرّب من خط الويب. بتعرّف البديل نفسه بـ [[@font-face]] و [[local()]] وتعدّل مقاسه:

~~~css
@font-face {
  font-family: "Hebr Fallback";
  src: local("Tahoma");
  size-adjust: 58%;
}

body {
  font-family: "Hebr", "Hebr Fallback", sans-serif;
}
~~~

~~~text القياس من Chrome (نفس الفقرة)
Tahoma عادي                         122.38px
Tahoma بـ size-adjust: 58%          61.19px       ← نفس ارتفاع خط الويب: مفيش قفزة
~~~

[[size-adjust]] بتكبّر أو تصغّر حروف الملف ده بنسبة، من غير ما تغيّر [[font-size]] بتاع العنصر. الرقم (58٪ هنا) بييجي بالتجربة: تغيّره لحد ما الفقرة بالبديل تاخد نفس عدد السطور. ومعاها تلاتة للتظبيط الأدق: [[ascent-override]] و [[descent-override]] و [[line-gap-override]] (بيغيّروا ارتفاع السطر اللي الخط بيطلبه). أدوات زي next/font بتحسب الأربعة لوحدها (درس «next/font»).

~~~live 207 نفس الفقرة بـ Tahoma وبـ Tahoma متصغّر 58%
<style>
  @font-face { font-family: "Tahoma Small"; src: local("Tahoma"); size-adjust: 58%; }
  p { font-size: 18px; line-height: 1.7; max-width: 300px; background: #f3f4f6; }
  .a { font-family: Tahoma, sans-serif; }
  .b { font-family: "Tahoma Small", sans-serif; }
</style>
<p class="a">الكتابة العربية بتتوصل حروفها ببعض، والسطر الطويل بيتكسر لوحده لما العرض يخلص.</p>
<p class="b">الكتابة العربية بتتوصل حروفها ببعض، والسطر الطويل بيتكسر لوحده لما العرض يخلص.</p>
~~~

**هتشوف إيه (على Windows):** نفس الكلام ونفس الـ [[font-size]]. الفقرة التانية حروفها أصغر بوضوح وواخدة سطور أقل، من غير ما نلمس حجم الخط. (58٪ رقم مبالغ فيه عشان الخط التجريبي عندنا كان صغير جدًا. في الحقيقة الأرقام بتبقى بين 90٪ و 110٪.)

### [[font-size-adjust: 0.5]]

خاصية (مش descriptor) بتحل نفس المشكلة من ناحية تانية: بتخلّي **ارتفاع الحروف الصغيرة** (x-height) ثابت مهما كان الخط اللي اتعرض من القايمة.

~~~text القياس من Chrome (ارتفاع الحرف الصغير ÷ حجم الخط، من font-size-adjust: from-font)
Verdana 0.545     Tahoma 0.545     Arial 0.519     Segoe UI 0.500     Georgia 0.481     Times New Roman 0.447

font-size: 100px ومعاها font-size-adjust: 0.5، عرض «Hamburg»:
Verdana           463.0  →  424.5     (اتصغّر: حروفه الصغيرة كانت عالية)
Times New Roman   375.9  →  420.2     (اتكبّر: حروفه الصغيرة كانت واطية)
~~~

الرقم 0.5 معناه «عايز الحرف الصغير نص حجم الخط». المتصفح بيكبّر أو يصغّر كل خط في القايمة لحد ما يوصل لكده، فالخطين بقوا قريبين من بعض (424 و 420 بدل 463 و 376). بتتكتب على العنصر: [[body { font-size-adjust: 0.5; }]]. المنهج بيقول إنها Baseline حديثة (كل المتصفحات الأساسية، من وقت قريب).

---

## ٦. [[unicode-range: U+0600-06FF]]

بتقول «الملف ده للحروف دي بس». المتصفح بينزّل الملف لو الصفحة فيها حرف واحد على الأقل من المدى.

~~~css
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-arabic.woff2") format("woff2");
  unicode-range: U+0600-06FF;
}
@font-face {
  font-family: "Hebr";
  src: url("fonts/hebr-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF;
}
~~~

| المدى | الحروف |
|---|---|
| [[U+0600-06FF]] | العربي الأساسي: الحروف والتشكيل والأرقام ٠ لـ ٩ |
| [[U+0750-077F]] | حروف عربي إضافية (لغات تانية بالحرف العربي) |
| [[U+FB50-FDFF]] و [[U+FE70-FEFF]] | أشكال العرض العربي (حروف جاهزة متصلة، في نصوص قديمة) |
| [[U+0000-00FF]] | اللاتيني الأساسي، والأرقام 0 لـ 9، وعلامات الترقيم، **والمسافة** |

~~~text القياس من Chrome (لوج السيرفر، نص الصفحة ← الملفات اللي اتطلبت)
«كلام»           →  hebr-arabic
«Hello»          →  hebr-latin
«سعر 25»         →  hebr-arabic + hebr-latin        (الرقم 25 لاتيني)
«كلام عربي»      →  hebr-arabic + hebr-latin        ← !
~~~

السطر الأخير مفاجأة: كلام عربي بس، وملف اللاتيني نزل. السبب **المسافة** بين الكلمتين: كودها [[U+0020]]، وده جوه المدى اللاتيني. فالتقسيم ده بيوفّر فعلًا في صفحة لغة واحدة لو المسافة والترقيم موجودين في ملف العربي ومداه متزوّد بيهم: [[unicode-range: U+0600-06FF, U+0020-002F]].

خدمات الخطوط (وأدوات زي next/font) بتقسّم الخط لملفات صغيرة بالطريقة دي: الزائر العربي بينزّل حتة العربي بس.

**تصغير الملف نفسه (subsetting):** خط عربي كامل فيه آلاف الأشكال. أداة [[pyftsubset]] من مكتبة fonttools بتطلّع ملف فيه المدى اللي إنت عايزه بس. الأمر والخيارات من وثائق fonttools، ومتشغّلش هنا.

---

## ٧. [[<link rel="preload" as="font">]]

المتصفح بيعرف إنه محتاج الخط **متأخر**: لازم ينزّل الـ HTML، وبعدين الـ CSS، وبعدين يلاقي عنصر فيه كلام بيستخدم الخط. [[preload]] في الـ [[<head>]] بتخلّيه يبدأ ينزّل الخط من أول لحظة:

~~~html
<link rel="preload" href="fonts/hebr-regular.woff2" as="font" type="font/woff2" crossorigin>
~~~

- [[as="font"]]: نوع الملف، عشان المتصفح يدّيه الأولوية الصح.
- [[type="font/woff2"]]: المتصفح اللي ميعرفش الصيغة ميحمّلش.
- [[crossorigin]]: **إجبارية للخطوط حتى لو الملف من نفس موقعك.** الخطوط بتتطلب دايمًا بطريقة CORS، والـ preload لازم يطلب بنفس الطريقة عشان الطلبين يتطابقوا.

~~~text القياس من Chrome (لوج السيرفر، بالترتيب)
من غير preload:
  GET /page.html
  GET /image
  GET /fonts/hebr.ttf                 ← بعد ما المتصفح رسم ولقى كلام محتاج الخط

preload ومعاه crossorigin:
  GET /page.html
  GET /fonts/hebr.ttf                 ← قبل الصورة
  GET /image

preload من غير crossorigin:
  GET /page.html
  GET /fonts/hebr.ttf   origin=-      ← طلب الـ preload
  GET /image
  GET /fonts/hebr.ttf   origin=http://127.0.0.1:8731     ← الخط اتطلب تاني!
~~~

ومن غير [[crossorigin]] الملف نزل **مرتين**، وظهر التحذير ده في الـ Console (النص الحقيقي):

~~~text Console
A preload for 'http://127.0.0.1:8731/arabtype.ttf?n=x' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.
~~~

اعمل preload لملف واحد أو اتنين بالكتير (الخط الأساسي بوزنه العادي). كل preload بياخد من سرعة تحميل باقي الصفحة.

---

## ٨. أخطاء تحميل الخط بنصها

الخط لما يفشل **الصفحة مبتبوظش**: الكلام بيتعرض بالبديل. الخطأ بيتكتب في الـ Console بس.

~~~live 64 88 ملف خط مش موجود
<style>
  @font-face {
    font-family: "Ghost";
    src: url("fonts/ghost.woff2") format("woff2");
  }
  p { font-family: "Ghost", Tahoma, sans-serif; font-size: 20px; }
</style>
<p>الكلام ده ظاهر عادي مع إن ملف الخط مش موجود.</p>
~~~

**هتشوف إيه:** الجملة ظاهرة بخط Tahoma (أو خط النظام). مفيش أي علامة في الصفحة إن فيه خط فشل. عشان كده لازم تبص في DevTools.

التلات أخطاء اللي بتقابلها، بنصها من Chrome:

**١. الخط من موقع تاني والسيرفر مبيسمحش (CORS):**

~~~text Console
Access to font at 'http://127.0.0.1:8732/arabtype.ttf' from origin 'http://127.0.0.1:8731' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
~~~

الصور بتتحمّل من أي موقع، والخطوط لأ: لازم السيرفر اللي عليه الخط يبعت الـ header ده. الحل الأسهل: حط ملف الخط على **نفس موقعك** (self-hosting)، وده اللي الدرس بيعمله.

**٢. الملف مش خط (اتحفظ غلط، أو السيرفر رجّع صفحة HTML مكانه):**

~~~text Console
Failed to decode downloaded font: http://127.0.0.1:8731/bad.woff2
OTS parsing error: invalid sfntVersion: 1952999795
~~~

بيحصل كتير لما المسار غلط والسيرفر بيرجّع صفحة «مش موجود» بكود 200 بدل 404، فالمتصفح بيحاول يقراها كخط.

**٣. المسار غلط (404):** الطلب بيظهر أحمر في تبويب Network بحالة 404، وفي حالة الخطوط بالذات مفيش سطر CORS ولا decode. افتح Network، واختار الفلتر Font، وشوف مسار الطلب: غالبًا المسار نسبي لملف الـ CSS وإنت حاسبه من الصفحة.

~~~text القياس من Chrome (document.fonts بعد التلات حالات)
"Lab"  error      "Bad"  error      "Gone"  error
عرض الفقرات التلاتة: 28.5 و 28.5 و 28.5        (التلاتة اتعرضوا بالبديل)
~~~

---

## ٩. خطة خط من موقعك (self-hosting)

1. **الرخصة.** اتأكد إن رخصة الخط بتسمح تحطه على موقعك. خطوط SIL Open Font License بتسمح، وملف الرخصة ([[OFL.txt]]) بيتحط جنب الخط.
2. **الملفات.** woff2 بس، في فولدر [[fonts/]]. وزنين بالكتير (400 و 700)، أو ملف متغيّر واحد.
3. **التعريف.** [[@font-face]] لكل ملف، بنفس [[font-family]]، وكل واحد بوزنه الحقيقي، و [[font-display: swap]].
4. **البدايل.** خطوط الجهاز بعد اسم الخط في القايمة. دي اللي الزائر هيشوفها أول ثانية.
5. **preload** للملف الأساسي، ومعاه [[crossorigin]].
6. **الفبركة.** [[font-synthesis: none]] لو معرّفتش ملف للتقيل أو المايل.
7. **الفحص.** DevTools، ثم Network، ثم Font: كام ملف نزل وحجمهم كام. و Console فاضي من أخطاء الخطوط.

ليه من موقعك مش من خدمة خطوط؟ طلب أقل لموقع تاني (اتصال جديد بياخد وقت)، ومفيش CORS، وبيانات زوارك مبتروحش لطرف تالت. والخدمة ميزتها إنها بتقسّم وتضغط الخط لوحدها.

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| الاسم في [[@font-face]] غير الاسم في [[font-family]] (حرف أو مسافة) | الخط مبيتحمّلش خالص، ومفيش خطأ |
| ملف Bold متعرّف من غير [[font-weight: 700]] | الملفين بقوا وزن 400، والأخير غلب: الصفحة كلها تقيلة |
| ملف واحد و [[<strong>]] في الصفحة | تقيل مفبرك |
| من غير [[font-display]] | Chrome بيخفي الكلام لحد 3 ثواني لو الخط اتأخر (وثائق web.dev) |
| [[format("woff")]] على ملف [[.woff2]] | التلميح غلط، والنتيجة حسب المتصفح. اكتب الصيغة الحقيقية |
| preload من غير [[crossorigin]] | الخط بينزل مرتين |
| خمس أوزان وخطين مختلفين | نص ميجا خطوط قبل ما الزائر يقرا كلمة |
| مسار الخط محسوب من الصفحة والـ CSS في فولدر تاني | 404 |
| خط من موقع تاني من غير CORS | الخط بيتمنع، والبديل بيتعرض |

---

## الخلاصة

- [[@font-face]] تعريف: اسم من عندك + [[src]]. مبينزّلش حاجة لحد ما كلام في الصفحة يستخدم الاسم.
- ملف لكل وزن بنفس الاسم، وكل ملف بـ [[font-weight]] الحقيقي بتاعه. المتغيّر: [[font-weight: 300 700]].
- woff2 بس، ومعاه [[format("woff2")]].
- [[font-display: swap]] للكلام: يظهر فورًا بالبديل ويتبدّل. [[optional]] لو مش عايز أي قفزة.
- القفزة بتتعالج بتظبيط البديل: [[size-adjust]]، أو [[font-size-adjust]] على العنصر.
- [[unicode-range]] بينزّل الملف للحروف الموجودة بس. المسافة لاتيني.
- preload للملف الأساسي، و [[crossorigin]] إجبارية.
- فشل الخط صامت في الصفحة. الحقيقة في Console و Network.`,
          try: R`مش محتاج ملف خط للتجربة دي. اعمل [[alias.html]]: عرّف بـ [[@font-face]] خط اسمه [["My Sans"]] مصدره [[local()]] لتلات خطوط من جهازك بالترتيب، واستخدمه على [[body]] وبعده [[serif]]. وبعدين عرّف خط تاني اسمه [["Missing"]] بمسار ملف مش موجود، واستخدمه على عنوان وبعده [[sans-serif]]. افتح الصفحة، وبعدين افتح DevTools وبص في Console و Network.`,
          sol: R`~~~live 163 261 alias.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة @font-face</title>
<style>
  @font-face {
    font-family: "My Sans";
    src: local("Segoe UI"), local("Tahoma"), local("Arial");
  }
  @font-face {
    font-family: "Missing";
    src: url("fonts/missing.woff2") format("woff2");
    font-display: swap;
  }
  body { font-family: "My Sans", serif; font-size: 18px; line-height: 1.8; }
  h1 { font-family: "Missing", sans-serif; }
</style>
</head>
<body>
<h1>العنوان بخط مش موجود</h1>
<p>والفقرة بخط اسمه My Sans، وهو في الحقيقة خط من الجهاز.</p>
</body>
</html>
~~~

**هتشوف إيه:**

- الفقرة بخط Segoe UI (أو أول خط موجود عندك من التلاتة)، مش بالـ serif.
- العنوان ظاهر عادي بخط الـ sans-serif. مفيش أي أثر في الصفحة للخط اللي فشل.
- في Network (فلتر Font): طلب واحد لـ [[missing.woff2]] بحالة فشل. ومفيش أي طلب لـ «My Sans»: [[local()]] مبتنزّلش.

~~~text القياس من Chrome (document.fonts)
"My Sans"   loaded       (من الجهاز، من غير طلب)
"Missing"   error        (والعنوان اتعرض بالبديل)
~~~

**اللي تتعلمه:** [[@font-face]] ليها طرفين: الاسم (من عندك) والمصدر (ملف أو خط من الجهاز). ولو المصدر فشل، القايمة اللي في [[font-family]] هي اللي بتنقذ الصفحة. خط من غير بدايل + ملف فشل = Times New Roman.`,
          deep: {
            why: R`خطوط الجهاز بتختلف من نظام لنظام، فنفس الصفحة ليها شكل على Windows وشكل على الموبايل. خط الويب بيوحّد الشكل وبيدّي الموقع هويته، وده مهم في العربي بالذات لأن خطوط النظام العربي قليلة ومش كلها مريحة في القراية. بس الخط ملف بيتحمّل، فلو اتعمل غلط بيبوّظ أهم حاجتين في الصفحة: إن الكلام يظهر بسرعة، وإن الصفحة متتنططش وهي بتحمّل. الدرس كله عن إنك تاخد الميزة من غير ما تدفع التمن ده.`,
            how: R`المتصفح بيقرا كل [[@font-face]] ويبني لكل [[font-family]] قايمة «وشوش» (faces)، كل وش ليه وزن وميل ومدى حروف ومصدر. وقت الرسم، لكل حتة نص: بيطابق العيلة، ثم الوش المناسب للوزن والميل، ثم بيشوف هل الحروف المطلوبة جوه [[unicode-range]] بتاع الوش. لو أيوه والملف لسه منزلش، بيبدأ التحميل ويشغّل ساعة [[font-display]]: في فترة block بيرسم بخط مخفي، وفي فترة swap بيرسم بالبديل، ولما الملف يوصل ويتفك بيعيد حساب الـ layout بالخط الجديد (ودي القفزة). ملف الخط بيتطلب دايمًا بنظام CORS، حتى من نفس الموقع، وعشان كده الـ preload لازم يبقى [[crossorigin]] عشان يطابقه. والملف بعد أول مرة بيتحفظ في الـ cache، فالزيارة التانية الخط جاهز فورًا.`,
            when: R`لما الهوية البصرية مهمة (مدوّنة، مجلة، براند)، أو لما خطوط النظام مش كفاية للغة بتاعتك. ولو الموقع لوحة تحكم أو أداة داخلية، خطوط الجهاز (درس «font-family و font-size») أسرع وأبسط. ومع Next.js متكتبش [[@font-face]] بإيدك: [[next/font]] بتعمل التحميل والـ preload وتظبيط البديل لوحدها.`,
            mistakes: R`اسم مختلف بين التعريف والاستخدام. وزن غلط على الملف. ملف واحد وتقيل مفبرك. نسيان [[font-display]]. preload من غير [[crossorigin]]. أوزان وخطوط كتير. خط من دومين تاني من غير CORS. المسار نسبي للـ CSS مش للصفحة. وافتراض إن «الخط شغال» عشان الصفحة باينة: البديل هو اللي باين.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** «مدوّنة حبر» عندها ملفين خط: [[fonts/hebr-regular.woff2]] و [[fonts/hebr-bold.woff2]]. اكتب تعريفين [[@font-face]] لعيلة اسمها [["Hebr"]] (كل ملف بوزنه، والكلام يظهر فورًا بالبديل)، واستخدمها على [[body]] بالقايمة دي بالظبط: [["Hebr", system-ui, sans-serif]]. (من قسم ١ و ٣ و ٤ في الشرح)`, done: R`فيه تعريفين بنفس الاسم، واحد 400 وواحد 700، والاتنين [[swap]] و woff2، و [[body]] بيستخدم العيلة، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  /* اكتب التعريفين هنا */

  body { font-size: 18px; }
</style>
<p>فقرة عادية، وفيها <strong>كلمة تقيلة</strong> محتاجة ملف الـ bold.</p>`, checks: [
              { say: R`فيه [[@font-face]] مصدره [[fonts/hebr-regular.woff2]]`, src: "fonts/hebr-regular.woff2" },
              { say: R`وتعريف تاني مصدره [[fonts/hebr-bold.woff2]]`, src: "fonts/hebr-bold.woff2" },
              { say: R`الصيغة مكتوبة: [[format("woff2")]]`, src: "format(\"woff2\")" },
              { say: R`ملف الـ bold متعرّف بوزنه: [[font-weight: 700]]`, src: "font-weight: 700" },
              { say: R`[[font-display: swap]] مكتوبة`, src: "font-display: swap" },
              { say: R`[[body]] بيستخدم العيلة وبعدها البدايل`, q: "p", style: ["font-family", "Hebr, system-ui, sans-serif"] }
            ] }, sol: R`~~~live 60 84 الحل
<style>
  @font-face {
    font-family: "Hebr";
    src: url("fonts/hebr-regular.woff2") format("woff2");
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: "Hebr";
    src: url("fonts/hebr-bold.woff2") format("woff2");
    font-weight: 700;
    font-display: swap;
  }
  body { font-family: "Hebr", system-ui, sans-serif; font-size: 18px; }
</style>
<p>فقرة عادية، وفيها <strong>كلمة تقيلة</strong> محتاجة ملف الـ bold.</p>
~~~

**هتشوف إيه:** الفقرة بخط النظام. ده طبيعي هنا: المعاينة معزولة ومفيهاش ملفات خطوط، فالتعريفين فشلوا والبديل ([[system-ui]]) هو اللي اتعرض. على موقع حقيقي فيه الملفين، الفقرة هتتعرض بـ Hebr والكلمة التقيلة بملف الـ bold.

**ليه كده:**

- نفس [[font-family]] في التعريفين: عيلة واحدة بوزنين.
- [[font-weight]] على كل ملف بتقول للمتصفح مين ياخده: الكلام العادي ياخد الأول، و [[<strong>]] ياخد التاني.
- [[swap]]: الزائر يقرا من أول لحظة بخط النظام.

**الغلطة الشائعة:** تنسى [[font-weight: 700]] على التعريف التاني. الملفين يبقوا «وزن 400»، والتعريف الأخير يغلب، فالصفحة **كلها** تتعرض بملف الـ bold.

~~~text القياس من Chrome (على السيرفر المحلي، بملفين حقيقيين)
<p>كلام</p>                →  GET hebr-regular
<p><b>تقيل</b></p>         →  GET hebr-bold
المحسوب: font-family: Hebr, system-ui, sans-serif
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الخط مبيظهرش على الموقع والصفحة بخط النظام. في الـ CSS تلات غلطات: الاسم في التعريف غير الاسم في [[body]]، والتلميح بيقول [[woff]] والملف [[woff2]]، ومفيش [[font-display]]. صلّح التلاتة. (من قسم ١ و ٢ و ٤ و ١٠ في الشرح)`, done: R`الاسم واحد في المكانين، والصيغة [[woff2]]، و [[font-display: swap]] موجودة، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  @font-face {
    font-family: "Hebr Naskh";
    src: url("fonts/hebr-naskh.woff2") format("woff");
  }
  body { font-family: "HebrNaskh", system-ui, sans-serif; font-size: 18px; }
</style>
<p>المفروض الفقرة دي تتعرض بخط Hebr Naskh.</p>`, checks: [
              { say: R`[[body]] بيستخدم نفس الاسم اللي في التعريف`, q: "p", style: ["font-family", "\"Hebr Naskh\", system-ui, sans-serif"] },
              { say: R`التلميح بقى [[format("woff2")]]`, src: "format(\"woff2\")" },
              { say: R`مفيش [[format("woff")]]`, nosrc: "format(\"woff\")" },
              { say: R`[[font-display: swap]] اتزوّدت`, src: "font-display: swap" }
            ] }, sol: R`~~~live 60 84 بعد التصليح
<style>
  @font-face {
    font-family: "Hebr Naskh";
    src: url("fonts/hebr-naskh.woff2") format("woff2");
    font-display: swap;
  }
  body { font-family: "Hebr Naskh", system-ui, sans-serif; font-size: 18px; }
</style>
<p>المفروض الفقرة دي تتعرض بخط Hebr Naskh.</p>
~~~

**هتشوف إيه:** الشكل هنا قبل وبعد واحد (خط النظام)، لأن المعاينة مفيهاش ملف الخط. الفرق هيبان على الموقع الحقيقي: قبل التصليح المتصفح **مبيطلبش الملف أصلًا**، وبعده بيطلبه ويعرض الخط.

| الغلطة | ليه بتبوّظ | التصليح |
|---|---|---|
| [["HebrNaskh"]] في [[body]] و [["Hebr Naskh"]] في التعريف | اسمين مختلفين: المتصفح بيدوّر على خط اسمه «HebrNaskh» ومبيلاقيش، فبيروح للبديل. مفيش خطأ | نفس الاسم بالحرف |
| [[format("woff")]] | تلميح غلط عن الصيغة | [[format("woff2")]] |
| مفيش [[font-display]] | الافتراضي [[auto]]، وفي Chrome ده بيخفي الكلام لحد ما الخط ييجي (لحد 3 ثواني، وثائق web.dev) | [[font-display: swap]] |

**إزاي تلاقي الغلطة الأولى في الحقيقة:** Network، ثم فلتر Font: **مفيش أي طلب**. خط متعرّف ومحدش طلبه معناه إن الاسم مش متطابق، أو مفيش عنصر بيستخدمه.

**الغلطة الشائعة:** تدوّر في الـ Console. الاسم الغلط مبيطلّعش أي خطأ.

~~~text القياس من Chrome (المحسوب بعد التصليح)
p   font-family: "Hebr Naskh", system-ui, sans-serif
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** الـ CSS ده فيه أربع تعريفات، والصفحة فيها [[<p>أهلًا بيك</p>]] بس (كلمتين عربي بينهم مسافة، ومفيش تقيل). أنهي ملفات هتتطلب من السيرفر؟ اكتب توقعك وبعدين افتح الحل. (من قسم ١ و ٣ و ٦ في الشرح)

~~~css
@font-face { font-family: "Hebr"; src: url("ar.woff2"); unicode-range: U+0600-06FF; }
@font-face { font-family: "Hebr"; src: url("latin.woff2"); unicode-range: U+0000-00FF; }
@font-face { font-family: "Hebr"; src: url("bold.woff2"); font-weight: 700; }
@font-face { font-family: "Titles"; src: url("titles.woff2"); }
body { font-family: "Hebr", sans-serif; }
~~~`, done: R`قلت إن اللي هيتطلب [[ar.woff2]] و [[latin.woff2]] بس، وعرفت ليه اللاتيني نزل مع إن مفيش ولا حرف إنجليزي.`, sol: R`**الإجابة:** ملفين: [[ar.woff2]] و [[latin.woff2]].

| الملف | اتطلب؟ | ليه |
|---|---|---|
| [[ar.woff2]] | أيوه | الصفحة فيها حروف عربي من المدى [[U+0600-06FF]] |
| [[latin.woff2]] | **أيوه** | المسافة بين «أهلًا» و «بيك» كودها [[U+0020]]، وده جوه [[U+0000-00FF]] |
| [[bold.woff2]] | لأ | مفيش كلام وزنه 700 في الصفحة |
| [[titles.woff2]] | لأ | مفيش عنصر بيستخدم العيلة «Titles» |

~~~text القياس من Chrome (لوج السيرفر المحلي بنفس التقسيمة)
«كلام»          →  ar
«كلام عربي»     →  ar + latin
«Hello»         →  latin
<b>تقيل</b>     →  bold
عيلة متعرّفة ومش مستخدمة   →  مفيش طلب
~~~

**اللي تتعلمه:**

- المتصفح كسلان بالمعنى الكويس: مبينزّلش غير اللي النص محتاجه فعلًا.
- المسافة وعلامات الترقيم حروف زي أي حروف. لو عايز صفحة عربي تنزّل ملف واحد، زوّد المسافة والترقيم لمدى ملف العربي: [[unicode-range: U+0600-06FF, U+0020-002F]] (وده معناه إن الملف نفسه لازم يبقى فيه الحروف دي).

**الغلطة الشائعة:** تفتكر إن [[bold.woff2]] هينزل «احتياطي». لأ، هينزل أول ما يظهر [[<strong>]] أو عنوان في الصفحة، وده ممكن يبقى بعد ما الصفحة اترسمت، فتشوف تبديل تاني.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** ده لوج سيرفر لصفحة واحدة، وتحته اللي ظهر في الـ Console. إيه المشكلتين؟ وإيه سطر الـ HTML المتصلّح؟ (من قسم ٧ و ٨ في الشرح)

~~~text لوج السيرفر
GET /index.html
GET /fonts/hebr.woff2      origin=-
GET /logo.png
GET /fonts/hebr.woff2      origin=http://127.0.0.1:8731
~~~

~~~text Console
A preload for 'http://127.0.0.1:8731/fonts/hebr.woff2' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.
~~~`, done: R`قلت إن الخط نزل مرتين، وإن السبب [[preload]] من غير [[crossorigin]]، وكتبت السطر المتصلّح.`, sol: R`**المشكلة:** ملف الخط اتطلب **مرتين** (السطر التاني والرابع). الزائر دفع حجم الخط مرتين، والـ preload موفّرش أي وقت.

**السبب:** في الـ [[<head>]] مكتوب:

~~~html
<link rel="preload" href="fonts/hebr.woff2" as="font" type="font/woff2">
~~~

الطلب الأول ده طلب الـ preload، وبص على [[origin=-]]: اتبعت كطلب عادي. الطلب الرابع طلب الخط الحقيقي من [[@font-face]]، وفيه [[origin=...]]: الخطوط بتتطلب دايمًا بنظام CORS. المتصفح شاف الطلبين مختلفين في النوع، فمقدرش يستخدم اللي نزل بالـ preload، ونزّل تاني. وده بالظبط اللي التحذير بيقوله: «credentials mode does not match».

**التصليح:** كلمة واحدة.

~~~html
<link rel="preload" href="fonts/hebr.woff2" as="font" type="font/woff2" crossorigin>
~~~

~~~text القياس من Chrome (لوج السيرفر بعد التصليح)
GET /index.html
GET /fonts/hebr.woff2      origin=http://127.0.0.1:8731       ← مرة واحدة، وقبل الصورة
GET /logo.png
~~~

**اللي تتعلمه:**

- [[crossorigin]] على preload الخطوط إجبارية **حتى لو الخط على نفس موقعك**. ده مش منطقي من أول نظرة، وعشان كده غلطة منتشرة.
- اللوج بيتقري بالترتيب وبالتكرار: نفس المسار مرتين في تحميل واحد دايمًا علامة مشكلة.
- في DevTools هتشوف نفس الحاجة في Network: سطرين لنفس الملف.` },
            { lvl: 'سريع', t: R`**اشرحها:** اختار [[font-display]] لكل حالة واكتب السبب في جملة: (١) خط فقرات مدوّنة، وجمهورها على موبايلات ونت ضعيف. (٢) خط أيقونات: كل حرف فيه رسمة. (٣) خط زينة لعنوان الصفحة الرئيسية بس، ولو مجاش مفيش مشكلة، والمهم إن الصفحة متتنططش. (من قسم ٤ في الشرح)`, done: R`اخترت [[swap]] ثم [[block]] ثم [[optional]]، وكل واحدة بسببها.`, sol: R`**إجابة نموذجية:**

| الحالة | القيمة | السبب |
|---|---|---|
| خط الفقرات، نت ضعيف | [[font-display: swap]] | الكلام لازم يتقري من أول لحظة بالبديل. الخط ييجي بعدين |
| خط أيقونات | [[font-display: block]] | الحرف البديل هيبقى حرف عادي ملوش علاقة بالرسمة («e» مكان سلة مشتريات). فراغ لحظي أحسن |
| خط زينة مش أساسي | [[font-display: optional]] | مفيش تبديل متأخر خالص: يا جاهز فورًا يا البديل لآخر الزيارة |

~~~text القياس من Chrome (الخط اتأخر 1.5 ثانية: اتبدّل ولا لأ؟)
swap       اتبدّل
block      اتبدّل
fallback   اتبدّل      (ولو اتأخر 4.5 ثانية: لأ)
optional   لأ
~~~

**ملحوظة عن (١):** مع [[swap]] على نت ضعيف التبديل ممكن ييجي بعد 5 ثواني والقارئ في نص الفقرة، فالسطور تتحرك تحت عينه. الحل مش تغيير القيمة، الحل تظبيط البديل بـ [[size-adjust]] عشان التبديل ميحرّكش حاجة (قسم ٥). ولو مش هتظبّط، [[fallback]] حل وسط.

**الغلطة الشائعة:** [[block]] لخط الفقرات «عشان محدش يشوف الخط الغلط». اللي بيحصل إن محدش بيشوف **أي كلام** لحد 3 ثواني.` }
          ]
        },
        {
          cmd: "text-align و text-transform",
          title: "محاذاة السطور، وأول السطر، وحالة الحروف، والمسافات بين الحروف والكلمات",
          pre: [{ to: "css/lang و dir", why: R`[[text-align: start]] بتعتمد على اتجاه الصفحة ([[dir]])، واتشرح هناك` }],
          ref: [
            { t: "MDN: text-align", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-align" },
            { t: "MDN: text-align-last", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-align-last" },
            { t: "MDN: text-indent", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-indent" },
            { t: "MDN: text-transform", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-transform" },
            { t: "MDN: letter-spacing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/letter-spacing" },
            { t: "MDN: word-spacing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/word-spacing" },
            { t: "MDN: vertical-align", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/vertical-align" },
            { t: "MDN: text-autospace", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-autospace" }
          ],
          desc: R`[[text-align]] بتحدد السطور تلزق في أنهي ناحية جوه العنصر: البداية، ولا النهاية، ولا النص، ولا تتمط تملا العرض. و [[text-transform]] بتغيّر شكل الحروف اللاتيني (كبيرة وصغيرة) من غير ما تغيّر النص نفسه.
ومعاهم في الدرس: [[text-indent]] لأول سطر، و [[letter-spacing]] و [[word-spacing]] للمسافات، و [[vertical-align]] لمكان أيقونة أو صورة وسط السطر. وكل واحدة فيهم ليها تصرف مختلف مع العربي.`,
          example: R`h1 { text-align: center; }
.price { text-align: end; }
.story p { text-align: justify; text-indent: 2em; }
.tag { text-transform: uppercase; letter-spacing: 0.08em; }
.wide { word-spacing: 0.3em; }
.icon { vertical-align: middle; }`,
          flag: "script",
          lines: [
            R`العنوان في نص العرض. المحاذاة بتتحط على العنصر اللي **فيه** الكلام، وبتتورّث للي جواه.`,
            R`السعر عند «نهاية» السطر: الشمال في صفحة عربي، واليمين في صفحة إنجليزي. كلمة واحدة بتشتغل في الاتجاهين.`,
            R`فقرات القصة سطورها ممطوطة تملا العرض من الناحيتين ([[justify]])، وأول سطر في كل فقرة داخل لجوه بمقدار حرفين ([[2em]]).`,
            R`الوسم الإنجليزي بيتعرض بحروف كبيرة مع مسافة صغيرة بين الحروف. النص في الـ HTML فاضل زي ما اتكتب. الاتنين ملهمش أثر على كلام عربي.`,
            R`مسافة زيادة بين كل كلمة والتانية بمقدار 0.3 من حجم الخط. بتشتغل على العربي عادي لأنها بتزوّد عند المسافات بس.`,
            R`الأيقونة (صورة أو [[inline-block]]) تتوسّط ارتفاع الكلام اللي جنبها بدل ما تقعد على خط الكتابة.`
          ],
          teach: R`## الفكرة في سطرين

الخصائص دي مبتغيّرش الخط. بتغيّر **مكان** الكلام جوه السطر وشكل حروفه. وكل الأرقام من Chrome 157 على Windows 11.

---

## ١. [[text-align: start]]

~~~live 162 خمس قيم على نفس الجملة
<style>
  p { margin: 4px 0; padding: 4px 8px; background: #f3f4f6; }
</style>
<p style="text-align: start">start: بداية السطر</p>
<p style="text-align: end">end: نهاية السطر</p>
<p style="text-align: center">center: في النص</p>
<p style="text-align: left">left: الشمال دايمًا</p>
<p style="text-align: right">right: اليمين دايمًا</p>
~~~

**هتشوف إيه:** الصفحة عربي (من اليمين للشمال)، فـ [[start]] لزقت يمين و [[end]] لزقت شمال. و [[left]] و [[right]] راحوا لناحيتهم الثابتة.

| القيمة | معناها |
|---|---|
| [[text-align: start]] | بداية السطر حسب اتجاه الكتابة. **دي الافتراضي** |
| [[text-align: end]] | نهاية السطر حسب اتجاه الكتابة |
| [[text-align: left]] و [[text-align: right]] | ناحية ثابتة مهما كان الاتجاه |
| [[text-align: center]] | في النص |
| [[text-align: justify]] | السطور تتمط عشان تلمس الحافتين (القسم ٢) |

### [[start]] ولا [[right]]؟

في صفحة عربي الاتنين بيدّوا نفس الشكل. الفرق بيبان أول ما الاتجاه يتغيّر:

~~~text القياس من Chrome (عنصر عرضه 300px وجواه كلمة: الفراغ على شمالها ويمينها)
                  dir="rtl"                     dir="ltr"
text-align        فراغ شمال    فراغ يمين        فراغ شمال    فراغ يمين
start             241          0                0            241       ← اتبعت الاتجاه
end               0            241              241          0
right             241          0                241          0         ← يمين في الحالتين
left              0            241              0            241
~~~

~~~live 162 تعليق إنجليزي وسط صفحة عربي
<style>
  .c { border: 1px solid silver; padding: 6px 10px; margin: 6px 0; }
  .fixed { text-align: right; }
  .logical { text-align: start; }
</style>
<p class="c fixed">تعليق عربي: text-align: right</p>
<p class="c fixed" dir="ltr">English comment: text-align: right</p>
<p class="c logical">تعليق عربي: text-align: start</p>
<p class="c logical" dir="ltr">English comment: text-align: start</p>
~~~

**هتشوف إيه:** التعليق الإنجليزي التاني لازق في اليمين، وده غلط: الإنجليزي بيتقري من الشمال، فبداية السطر المفروض تبقى شمال. التعليق الرابع بدأ من الشمال لوحده، بنفس القاعدة اللي خلّت العربي يبدأ من اليمين.

القاعدة: **اكتب [[start]] و [[end]] دايمًا.** [[left]] و [[right]] بس لما الناحية نفسها هي المقصودة مهما كانت اللغة (نادر). والافتراضي أصلًا [[start]]، فالفقرة العربي في صفحة [[dir="rtl"]] بتلزق يمين من غير ما تكتب حاجة.

### المحاذاة على مين؟

[[text-align]] بتتحط على **الصندوق** اللي السطور جواه (فقرة، عنوان، div، خانة جدول)، وبتحرّك اللي جوه السطر: الكلام والصور واللينكات والـ inline-block. مبتحرّكش الصندوق نفسه.

~~~live 86 text-align على span مبتعملش حاجة
<style>
  .box { border: 1px solid silver; margin: 6px 0; padding: 6px; }
  .box span { background: #fde68a; }
</style>
<div class="box"><span style="text-align: center">text-align على الـ span نفسه</span></div>
<div class="box" style="text-align: center"><span>text-align على الأب</span></div>
~~~

**هتشوف إيه:** الجملة الأولى لسه في مكانها يمين: [[<span>]] عرضه قد كلامه بالظبط، فمفيش فراغ يتحرك جواه. التانية اتوسّطت لأن المحاذاة على الصندوق اللي حواليها.

وبتتورّث: [[text-align: center]] على [[<body>]] بتوسّط كل الصفحة. ولو عايز توسّط **صندوق** (مش الكلام اللي جواه) دي شغلة [[margin: auto]] (درس «box model») أو flexbox.

~~~text القياس من Chrome (الافتراضي)
<p> و <h1> و <td> و <input>     text-align: start
<th>                            text-align: center
<button>                        text-align: center
~~~

قيمة [[match-parent]] موجودة في المواصفة ومش مدعومة في Chrome 157 ([[CSS.supports]] رجّع false).

---

## ٢. [[text-align: justify]] و [[text-align-last]]

[[justify]] بتمط كل سطر عشان أوله وآخره يلمسوا الحافتين، زي أعمدة الجرايد.

~~~live 167 start ثم justify
<style>
  p { max-width: 300px; font-size: 17px; line-height: 1.7; background: #f3f4f6; padding: 0 6px; }
</style>
<p style="text-align: start">الكتابة العربية بتتوصل حروفها ببعض، والسطر الطويل بيتكسر لوحده لما العرض يخلص، وده اللي بنقيسه هنا.</p>
<p style="text-align: justify">الكتابة العربية بتتوصل حروفها ببعض، والسطر الطويل بيتكسر لوحده لما العرض يخلص، وده اللي بنقيسه هنا.</p>
~~~

**هتشوف إيه:** في الفقرة الأولى الحافة الشمال مشرشرة (كل سطر بطول). في التانية الحافتين مستقيمتين، والمسافات بين الكلمات مختلفة من سطر لسطر. والسطر الأخير في الاتنين عادي.

~~~text القياس من Chrome (فقرة عرضها 300px: عرض الكلام في كل سطر)
text-align: start        265px | 297px | 281px | 90px
text-align: justify      300px | 300px | 300px | 90px       ← السطر الأخير مبيتمطش

مجموع عرض الكلمات نفسها:   start 687.8px      justify 687.8px     ← الكلمات متمطتش
~~~

السطر الأخير من الجدول مهم للعربي: Chrome بيمط السطر بإنه **يوسّع المسافات بين الكلمات** بس. الكلمات نفسها عرضها متغيّرش، يعني مفيش «كشيدة» (تطويل الحرف زي «ســلام») زي ما الخطاطين بيعملوا. فلو السطر فيه كلمات قليلة وطويلة، بتطلع فيه فجوات كبيرة.

عشان كده [[justify]] على عمود ضيق (موبايل) بتبوّظ القراية: «أنهار» بيضا بتمشي وسط الفقرة. استخدمها في عمود عريض بس، أو سيب [[start]].

### [[text-align-last: center]]

بتتحكم في **السطر الأخير** لوحده (وأي سطر قبل [[<br>]]):

~~~text القياس من Chrome (نفس الفقرة: السطر الأخير)
text-align: justify                                    90px، فراغ شمال 210
text-align: justify; text-align-last: justify          300px        ← اتمط هو كمان
text-align: justify; text-align-last: center           90px، فراغ 105 من كل ناحية
text-align: justify; text-align-last: end              90px، فراغ يمين 210
~~~

القيم: [[auto]] (الافتراضي: يتبع [[text-align]]، ولو [[justify]] يبقى [[start]]) و [[start]] و [[end]] و [[left]] و [[right]] و [[center]] و [[justify]]. استخدامها نادر: قصيدة، أو فقرة ختام في النص.

---

## ٣. [[text-indent: 2em]]

بتزق **أول سطر** في الصندوق لجوه. دي طريقة الكتب في تمييز بداية الفقرة.

~~~live 152 أول سطر داخل لجوه
<style>
  p { max-width: 320px; margin: 0; line-height: 1.7; background: #f3f4f6; }
  .in { text-indent: 2em; }
  .hang { text-indent: -1.5em; padding-inline-start: 1.5em; }
</style>
<p class="in">أول سطر في الفقرة دي بادئ بعد فراغ، وباقي السطور بادئة من الحافة عادي.</p>
<p class="in">ودي فقرة تانية ملزوقة في اللي قبلها، والفراغ في أولها هو اللي بيفصلهم.</p>
<p class="hang">ودي بالعكس: أول سطر طالع لبرّه وباقي السطور هي اللي داخلة.</p>
~~~

**هتشوف إيه:** في أول فقرتين السطر الأول بادئ جوه شوية من اليمين. في التالتة السطر الأول عند الحافة والباقي داخل: ده «hanging indent»، وبيتعمل بقيمة سالبة ومعاها [[padding]] بنفس المقدار.

~~~text القياس من Chrome (خط 18px: الفراغ قبل بداية كل سطر)
                                     السطر 1    السطر 2    السطر 3
text-indent: 2em                     36px       0          0
text-indent: 10%                     30px       0          0        (10% من عرض الصندوق 300px)
text-indent: -1em + padding 1em      0          18px       18px
text-indent: 2em hanging             0          36px       36px
~~~

- الفراغ بيتحسب من **بداية** السطر: يمين في العربي وشمال في الإنجليزي، من غير ما تغيّر حاجة.
- الكلمة [[hanging]] بتعكس التأثير (الكل يدخل إلا الأول)، و [[each-line]] بتطبّقه بعد كل [[<br>]] كمان. الاتنين اشتغلوا في Chrome 157. MDN بينبّه إن مش كل المتصفحات نفّذت كل أجزاء الخاصية، فالطريقة السالبة أضمن.
- بتتورّث. لو حطيتها على [[<div>]] كل فقرة جواه هتاخدها.

---

## ٤. [[text-transform: uppercase]]

بتغيّر حالة الحروف **في العرض بس**. النص في الـ HTML وفي الـ DOM فاضل زي ما اتكتب.

~~~live 78 text-transform على إنجليزي وعلى عربي
<style>
  p { margin: 4px 0; }
</style>
<p style="text-transform: uppercase">uppercase: new arrivals وصل حديثًا</p>
<p style="text-transform: lowercase">lowercase: NEW ARRIVALS وصل حديثًا</p>
<p style="text-transform: capitalize">capitalize: new arrivals وصل حديثًا</p>
~~~

**هتشوف إيه:** الإنجليزي اتغيّر في التلات سطور: كله كبير، ثم كله صغير، ثم أول حرف من كل كلمة كبير. «وصل حديثًا» زي ما هي في التلاتة.

**العربي ملوش حروف كبيرة وصغيرة**، فالخاصية دي مبتعملش فيه أي حاجة. لو التصميم الإنجليزي فيه عناوين [[uppercase]]، النسخة العربي محتاجة طريقة تمييز تانية (وزن أو لون أو حجم).

~~~text القياس من Chrome (المعروض، والنص في textContent)
text-transform: uppercase     HELLO WORLD من مصر STRASSE E-MAIL 2ND
text-transform: lowercase     hello world من مصر straße e-mail 2nd
text-transform: capitalize    Hello World من مصر Straße E-Mail 2nd
textContent في التلاتة        hello world من مصر straße e-mail 2nd          ← النص الأصلي متغيّرش

عرض «hello world» بـ Arial 100px:    478.0px  →  بعد uppercase 727.9px
~~~

حاجات تاخد بالك منها:

- **العرض بيزيد.** الحروف الكبيرة أعرض (478 بقت 728). زرار كان كفاية للكلمة ممكن يتكسر.
- **اللغة بتفرق.** الحرف الألماني [[ß]] بقى [[SS]]. وفي التركي [[i]] الكبيرة بتاعتها [[İ]] بنقطة: مع [[lang="tr"]] «istanbul» طلعت «İSTANBUL»، ومع [[lang="en"]] طلعت «ISTANBUL» (اتقاس). سبب تاني إن [[lang]] يتكتب صح.
- **[[capitalize]] مش ذكية.** بتكبّر أول حرف بعد أي فاصل: «e-mail» بقت «E-Mail»، وحروف الجر بتتكبّر. عناوين الإنجليزي الصح بتتكتب بإيدك.
- **القراية.** MDN بينبّه إن فقرات طويلة كلها حروف كبيرة صعبة في القراية، خصوصًا لمرضى عسر القراية. خليها لكلمة أو اتنين.

القيم التانية: [[none]] (الافتراضي، وبتلغي اللي اتورّث)، و [[full-width]] و [[full-size-kana]] للنصوص اليابانية والصينية ([[CSS.supports]] رجّع false للاتنين في Chrome 157)، و [[math-auto]] للمعادلات.

**ليه CSS ومش تكتبها كبيرة في الـ HTML؟** النص المكتوب «NEW ARRIVALS» قارئ الشاشة ممكن يتهجّاه حرف حرف كأنه اختصار، ولو التصميم اتغيّر هتعدّل كل صفحة. النص يتكتب طبيعي، والشكل في الـ CSS.

---

## ٥. [[letter-spacing: 0.08em]]

مسافة زيادة بين كل حرف واللي بعده. بتفيد في الحروف اللاتيني الكبيرة والعناوين الصغيرة.

~~~live 80 letter-spacing على إنجليزي وعلى عربي
<style>
  p { font-size: 26px; margin: 4px 0; }
  .sp { letter-spacing: 8px; }
</style>
<p>من غير: محمد علي Type</p>
<p class="sp">8px: محمد علي Type</p>
~~~

**هتشوف إيه:** في السطر التاني حروف «Type» بعدت عن بعض بوضوح. الكلمتين العربي حروفهم **لسه متصلة زي ما هي**، واللي زاد المسافة بين الكلمتين بس.

~~~text القياس من Chrome (Tahoma 100px)
                          «الخط العربي جميل» (16 حرف)     «Arabic type» (11 حرف)
من غير                    757.0                          492.5
letter-spacing: 10px      777.0   (+20)                  602.5   (+110)
letter-spacing: -5px      747.0   (−10)                  437.5   (−55)
~~~

الإنجليزي زاد 10 لكل حرف (11 × 10). العربي زاد 20 بس: 10 عند كل **مسافة** من الاتنين، وصفر جوه الكلمات. Chrome 157 بيرفض يفصل الحروف العربي المتصلة.

ده تصرف Chrome الحالي. MDN بيحذّر إن الخاصية دي على لغة حروفها متصلة زي العربي ممكن تخلّي النص «يبان مكسور» (حروف مفصولة عن بعض)، وده اللي بيحصل في متصفحات ونسخ تانية. فالقاعدة واحدة في الحالتين: **متحطش [[letter-spacing]] على كلام عربي.** في أحسن الأحوال مش هتعمل حاجة، وفي أسوأها هتفك الكلمة.

وليها أثر جانبي حتى لما «مبتعملش حاجة»: أي قيمة غير الصفر بتقفل الـ ligatures الاختيارية (الأشكال المدمجة زي لفظ الجلالة في بعض الخطوط).

~~~text القياس من Chrome (جملة فيها «الله» و «لا» و «محمد»، بخط Traditional Arabic، 100px)
من غير                           739.2
letter-spacing: 0.01px           834.3      ← نفس عرض font-variant-ligatures: none (834.2)
~~~

واحد على مية من البيكسل غيّر شكل الكلمات. (الـ ligatures في درس «font-variant و font-feature-settings».)

القيمة: طول ([[2px]] أو [[0.08em]]، و [[em]] أحسن لأنها بتكبر مع الخط)، أو [[normal]]. والسالب بيقرّب الحروف، وبيتستخدم في العناوين اللاتيني الكبيرة جدًا. لو الصفحة لغتين، حطها على الإنجليزي بس: [[:lang(en) { letter-spacing: ... }]] أو class.

---

## ٦. [[word-spacing: 0.3em]]

مسافة زيادة بين **الكلمات** (بتتزوّد على المسافة العادية).

~~~text القياس من Chrome (Tahoma 100px، جملة من 3 كلمات)
من غير                    757.0
word-spacing: 20px        797.0      (+20 عند كل مسافة من الاتنين)
word-spacing: 0.5em       857.0      (+50 عند كل مسافة)
~~~

~~~live 72 word-spacing على العربي
<style>
  p { font-size: 22px; margin: 4px 0; }
</style>
<p>من غير: الخط العربي جميل</p>
<p style="word-spacing: 0.4em">0.4em: الخط العربي جميل</p>
~~~

**هتشوف إيه:** الكلمات في السطر التاني بعدت عن بعض، وكل كلمة حروفها زي ما هي.

دي آمنة على العربي لأنها بتشتغل عند المسافات بس. بتفيد في عنوان كبير كلماته لازقة، أو مع خط مسافاته ضيقة. متزوّدهاش في الفقرات: العين بتقرا «كتل» كلمات، والمسافات الواسعة بتفككها.

---

## ٧. [[vertical-align: middle]]

المحاذاة **الرأسية** لحاجة جوه السطر: أيقونة، صورة، [[inline-block]]، أو حتة نص. (وليها معنى تاني جوه خانات الجدول.) مبتشتغلش على الصناديق العادية ([[div]] و [[p]]).

~~~live 221 مربع 16px جنب كلام، بخمس قيم
<style>
  p { font-size: 20px; line-height: 2; margin: 0; border-bottom: 1px solid silver; }
  i { display: inline-block; width: 16px; height: 16px; background: #dc2626; }
</style>
<p>baseline <i style="vertical-align: baseline"></i> النص</p>
<p>middle <i style="vertical-align: middle"></i> النص</p>
<p>top <i style="vertical-align: top"></i> النص</p>
<p>bottom <i style="vertical-align: bottom"></i> النص</p>
<p>text-top <i style="vertical-align: text-top"></i> النص</p>
~~~

**هتشوف إيه:** المربع الأحمر في مكان مختلف في كل سطر: قاعد على خط الكتابة، ثم في نص ارتفاع الحروف، ثم لازق في أعلى السطر، ثم في أسفله، ثم عند أعلى الحروف.

~~~text القياس من Chrome (سطر ارتفاعه 40px وخطه 20px: بُعد أعلى المربع عن أعلى السطر)
baseline      12.0       المربع قاعد على خط الكتابة (الافتراضي)
middle        14.5       نص المربع عند نص الحروف الصغيرة
top           0.0        أعلى السطر
bottom        24.0       أسفل السطر
text-top      8.0        أعلى الحروف
text-bottom   16.0       أسفل الحروف
sub           17.0       نازل شوية (اللي <sub> بيستخدمه)
super         4.3        طالع شوية (اللي <sup> بيستخدمه)
4px           8.0        طالع 4px عن baseline
-0.2em        16.0       نازل 4px
~~~

| القيمة | بتتحسب من |
|---|---|
| [[baseline]] و [[sub]] و [[super]] و [[middle]] و [[text-top]] و [[text-bottom]] | خط كتابة **الأب** وحروفه |
| [[top]] و [[bottom]] | **السطر كله** (أعلى وأوطى حاجة فيه) |
| طول أو نسبة ([[4px]] أو [[-0.2em]] أو [[20%]]) | إزاحة عن الـ baseline: الموجب لفوق |

### الفراغ اللي تحت الصورة

أشهر استخدام ليها مش أيقونة. صورة جوه [[div]] بيظهر تحتها فراغ صغير محدش عارف جاي منين:

~~~text القياس من Chrome (div جواه عنصر inline-block ارتفاعه 50px، والخط 16px)
الافتراضي (baseline)        ارتفاع الـ div = 53px      ← 3px زيادة تحت العنصر
vertical-align: middle      50px
vertical-align: top         50px
display: block              50px
~~~

الصورة عنصر جوه سطر، فبتقعد على خط الكتابة، وتحت خط الكتابة فيه مكان محجوز لنزلات الحروف (زي ذيل الـ «ج»). التلات بيكسلات دول هم المكان ده. الحل: [[vertical-align: middle]] (أو [[top]])، أو [[display: block]] على الصورة.

---

## ٨. [[text-autospace: normal]]

خاصية جديدة بتزوّد مسافة صغيرة لوحدها بين الحروف الصينية أو اليابانية واللاتيني أو الأرقام اللي جنبها («日本語text» بتبقى «日本語 text» في العرض). ملهاش أي أثر على العربي.

~~~text القياس من Chrome 157
CSS.supports("text-autospace", "normal")           true
CSS.supports("text-autospace", "no-autospace")     true
CSS.supports("text-autospace", "ideograph-alpha")  false
~~~

المنهج شايفها Baseline حديثة. ذكرناها عشان تعرف إنها مش ليك لو صفحتك عربي أو إنجليزي.

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[text-align: right]] في موقع بلغتين | الإنجليزي بيلزق يمين. اكتب [[start]] |
| [[text-align: center]] على [[<span>]] أو [[<a>]] | ولا حاجة: حطها على الصندوق اللي حواليه |
| [[text-align: center]] عشان توسّط [[div]] | الكلام اللي جواه هو اللي بيتوسّط، مش الصندوق |
| [[justify]] على عمود ضيق | فجوات واسعة بين الكلمات |
| فقرات طويلة متوسّطة ([[center]]) | العين مش لاقية بداية السطر. التوسيط للعناوين والسطور القصيرة |
| [[letter-spacing]] على عربي | مفيش أثر في Chrome، وحروف مفكوكة في متصفحات تانية، والـ ligatures بتتقفل |
| [[text-transform: uppercase]] في تصميم هيتترجم عربي | العنوان العربي مفيهوش أي تمييز |
| كتابة النص كبير في الـ HTML بدل CSS | قارئ الشاشة ممكن يتهجّاه |
| [[vertical-align]] على [[div]] | مبتشتغلش: هي للي جوه السطر ولخانات الجدول |
| فراغ تحت صورة | [[vertical-align: middle]] أو [[display: block]] |

---

## الخلاصة

- [[text-align: start]] و [[end]] بيتبعوا اتجاه الكتابة. [[left]] و [[right]] ثابتين. الافتراضي [[start]].
- المحاذاة على الصندوق، وبتحرّك اللي جوه سطوره.
- [[justify]] في Chrome بتوسّع المسافات بس (مفيش كشيدة). للعمود العريض.
- [[text-indent]] لأول سطر، ومن ناحية البداية.
- [[text-transform]] و [[letter-spacing]] للاتيني. على العربي: الأولى ملهاش أثر، والتانية متتحطش.
- [[word-spacing]] آمنة على العربي.
- [[vertical-align]] للي جوه السطر: [[middle]] للأيقونات وللفراغ اللي تحت الصور.`,
          try: R`اعمل [[align.html]] فيه كارت منتج: عنوان متوسّط، وفقرة وصف عادية، وسطر فيه السعر عند نهاية السطر، ووسم إنجليزي صغير [[new]] يتعرض [[NEW]] بمسافة بين الحروف. وبعدين زوّد [[dir="ltr"]] على الكارت كله وشوف مين اتحرك لوحده ومين فضل مكانه.`,
          sol: R`~~~live 224 align.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت منتج</title>
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
  .card { max-width: 320px; border: 1px solid silver; padding: 12px; }
  h2 { text-align: center; margin: 0 0 6px; }
  .tag { text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; color: #b45309; }
  .price { text-align: end; font-weight: 700; margin: 0; }
</style>
</head>
<body>
<div class="card">
  <span class="tag" lang="en">new</span>
  <h2>شنطة ضهر</h2>
  <p>خامة قماش تقيل، وجيب للابتوب 15 بوصة، وتلات ألوان.</p>
  <p class="price">٤٥٠ جنيه</p>
</div>
</body>
</html>
~~~

**هتشوف إيه:**

- «NEW» فوق يمين بحروف كبيرة ومتباعدة، مع إن المكتوب في الـ HTML [[new]].
- العنوان في النص، والوصف من اليمين، والسعر لازق شمال.
- لما تزوّد [[dir="ltr"]] على [[.card]]: «NEW» والوصف راحوا شمال، والسعر راح **يمين**، والعنوان فضل في النص. مغيّرتش ولا سطر CSS.

~~~text القياس من Chrome
.tag      text-transform: uppercase     letter-spacing: 1.2px      (0.1em من 12px)
h2        text-align: center
.price    text-align: end
p         text-align: start             (الافتراضي)
~~~

لو كنت كتبت [[text-align: left]] للسعر، كان هيفضل شمال في النسخة الإنجليزي، فوق الوصف بالظبط، والكارت كله هيبقى ناحية واحدة.`,
          deep: {
            why: R`المحاذاة هي اللي بتدّي الصفحة «خطوط» العين بتمشي عليها: حافة مستقيمة بتبدأ منها كل السطور. لما الحافة دي تبقى في الناحية الغلط (إنجليزي لازق يمين) أو متبقاش موجودة (فقرة طويلة متوسّطة)، القراية بتتعب. والخصائص دي اتصممت للاتيني الأول: الحروف الكبيرة والمسافة بين الحروف مفاهيم ملهاش مقابل في العربي، فاللي بينقل تصميم إنجليزي زي ما هو بيلاقي نص تأثيراته مختفية والنص التاني بيبوّظ الحروف.`,
            how: R`المتصفح بيكسّر الكلام لسطور الأول (بعرض الصندوق)، وبعدين لكل سطر بيحسب الفراغ الفاضل ويوزّعه حسب [[text-align]]: كله في الآخر ([[start]])، أو كله في الأول ([[end]])، أو نصين ([[center]])، أو على المسافات بين الكلمات ([[justify]]). [[start]] و [[end]] بيتحولوا ليمين وشمال من [[direction]] بتاع العنصر. [[text-indent]] بيتخصم من عرض السطر الأول قبل التكسير. [[text-transform]] بيتطبق على النص قبل الرسم بقواعد Unicode للغة العنصر، والـ DOM مبيتغيّرش. [[letter-spacing]] بيتزوّد بعد كل «وحدة» حروف، والمتصفح بيستثني الحروف المتصلة. و [[vertical-align]] بيحرّك صندوق العنصر جوه «صندوق السطر»، وده ممكن يطوّل السطر نفسه لو العنصر طلع برّه.`,
            when: R`[[center]] للعناوين والأزرار والسطور القصيرة. [[end]] للأرقام والأسعار والتواريخ في آخر الصف. [[justify]] لعمود عريض في مقال أو كتاب. [[text-indent]] لفقرات قصة ملزوقة في بعض. [[uppercase]] مع [[letter-spacing]] للوسوم والعناوين الصغيرة الإنجليزي. [[vertical-align: middle]] لأيقونة جنب كلام، وللصور.`,
            mistakes: R`[[left]] و [[right]] بدل [[start]] و [[end]]. المحاذاة على عنصر inline. توسيط فقرات طويلة. [[justify]] على موبايل. [[letter-spacing]] على عربي. الاعتماد على [[uppercase]] كتمييز وحيد في موقع هيتترجم. و [[vertical-align]] على صندوق block.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** كارت مقال في «مدوّنة حبر»: العنوان في النص، وتاريخ النشر [[.date]] عند نهاية السطر، والوسم الإنجليزي [[.tag]] بحروف كبيرة ومسافة [[2px]] بين الحروف. استخدم القيم اللي بتشتغل في الاتجاهين. (من قسم ١ و ٤ و ٥ في الشرح)`, done: R`العنوان [[center]]، والتاريخ [[end]]، والوسم [[uppercase]] بمسافة 2px، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .card { max-width: 340px; border: 1px solid silver; padding: 10px; }
  h2 { }
  .date { }
  .tag { font-size: 13px; }
</style>
<div class="card">
  <span class="tag" lang="en">tutorial</span>
  <h2>أول صفحة ليك بالـ CSS</h2>
  <p>هنبدأ من ملف فاضي ونوصل لصفحة مرتبة في نص ساعة.</p>
  <p class="date">١٢ نوفمبر</p>
</div>`, checks: [
              { say: R`العنوان في النص`, q: "h2", style: ["text-align", "center"] },
              { say: R`التاريخ عند نهاية السطر ([[end]] مش [[left]])`, q: ".date", style: ["text-align", "end"] },
              { say: R`الوسم بحروف كبيرة`, q: ".tag", style: ["text-transform", "uppercase"] },
              { say: R`الوسم بين حروفه 2px`, q: ".tag", style: ["letter-spacing", "2px"] },
              { say: R`النص في الـ HTML لسه [[tutorial]] بحروف صغيرة`, q: ".tag", has: "tutorial" }
            ] }, sol: R`~~~live 191 الحل
<style>
  .card { max-width: 340px; border: 1px solid silver; padding: 10px; }
  h2 { text-align: center; }
  .date { text-align: end; }
  .tag { font-size: 13px; text-transform: uppercase; letter-spacing: 2px; }
</style>
<div class="card">
  <span class="tag" lang="en">tutorial</span>
  <h2>أول صفحة ليك بالـ CSS</h2>
  <p>هنبدأ من ملف فاضي ونوصل لصفحة مرتبة في نص ساعة.</p>
  <p class="date">١٢ نوفمبر</p>
</div>
~~~

**هتشوف إيه:**

- «TUTORIAL» فوق بحروف كبيرة ومتباعدة.
- العنوان متوسّط، والوصف من اليمين.
- التاريخ لازق في الشمال (نهاية السطر العربي).

**ليه كده:** [[end]] بتدّي الشمال هنا واليمين في نسخة إنجليزي، من غير تعديل. و [[uppercase]] في الـ CSS عشان النص في الصفحة يفضل طبيعي.

**الغلطة الشائعة:** [[text-align: end]] على الـ [[.tag]] عشان تحركه. [[.tag]] عنصر [[<span>]] (inline) فمش هيتحرك: المحاذاة بتتحط على الصندوق اللي حواليه.

~~~text القياس من Chrome
h2      text-align: center
.date   text-align: end
.tag    text-transform: uppercase     letter-spacing: 2px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة تعليقات فيها عربي وإنجليزي. المبرمج كتب [[text-align: right]] «عشان الموقع عربي»، فالتعليق الإنجليزي ([[dir="ltr"]]) لازق يمين وبيتقري بالعكس. صلّح قاعدة واحدة تخلّي كل تعليق يبدأ من ناحية لغته. (من قسم ١ في الشرح: «start ولا right؟»)`, done: R`التعليقين [[text-align: start]]، ومفيش [[right]] في الكود، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .comment { text-align: right; border: 1px solid silver; padding: 6px 10px; margin: 6px 0; }
</style>
<p class="comment">مقال مفيد جدًا، شكرًا.</p>
<p class="comment" dir="ltr" lang="en">Great article, thanks for sharing.</p>`, checks: [
              { say: R`التعليقات محاذاتها [[start]]`, q: ".comment", style: ["text-align", "start"] },
              { say: R`مفيش [[text-align: right]] في الكود`, nosrc: "text-align: right" },
              { say: R`التعليق الإنجليزي لسه [[dir="ltr"]]`, q: ".comment[dir=\"ltr\"]" }
            ] }, sol: R`~~~live 86 بعد التصليح
<style>
  .comment { text-align: start; border: 1px solid silver; padding: 6px 10px; margin: 6px 0; }
</style>
<p class="comment">مقال مفيد جدًا، شكرًا.</p>
<p class="comment" dir="ltr" lang="en">Great article, thanks for sharing.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 86 قبل
<style>
  .comment { text-align: right; border: 1px solid silver; padding: 6px 10px; margin: 6px 0; }
</style>
<p class="comment">مقال مفيد جدًا، شكرًا.</p>
<p class="comment" dir="ltr" lang="en">Great article, thanks for sharing.</p>
~~~

**هتشوف إيه:** قبل: التعليقين لازقين يمين. بعد: العربي يمين والإنجليزي **شمال**، كل واحد من بداية سطره.

**ليه:** [[right]] ناحية ثابتة. [[start]] بتسأل العنصر عن اتجاهه: [[rtl]] يبقى يمين، و [[ltr]] يبقى شمال.

**حل تاني صح:** تمسح السطر خالص. [[start]] هي الافتراضي. بس لو فيه قاعدة أعم بتوسّط أو بتلزق، لازم تكتبها صريحة.

**الغلطة الشائعة:** تزوّد قاعدة تانية [[.comment[dir="ltr"] { text-align: left; }]]. هتشتغل، بس كل حتة في الموقع هتحتاج قاعدتين بدل واحدة.

~~~text القياس من Chrome (الفراغ على يمين الكلام في صندوق 300px)
                     العربي     الإنجليزي
text-align: right    0          0           ← الاتنين يمين
text-align: start    0          241         ← الإنجليزي راح شمال
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** التصميم الإنجليزي للموقع فيه عناوين [[uppercase]] بمسافة 4px بين الحروف، واتنقل زي ما هو للنسخة العربي. شيل الاتنين من العنوان العربي، وسيبهم على السطر الإنجليزي [[.en]] بس، وادّي العنوان العربي تمييز بديل: وزن 800. (من قسم ٤ و ٥ في الشرح)`, done: R`العنوان العربي [[letter-spacing]] بتاعته [[normal]] ووزنه 800، و [[.en]] لسه 4px و [[uppercase]]، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  h2, .en { text-transform: uppercase; letter-spacing: 4px; }
</style>
<h2>وصل حديثًا</h2>
<p class="en" lang="en" dir="ltr">new arrivals</p>`, checks: [
              { say: R`العنوان العربي من غير [[letter-spacing]]`, q: "h2", style: ["letter-spacing", "normal"] },
              { say: R`العنوان العربي من غير [[text-transform]]`, q: "h2", style: ["text-transform", "none"] },
              { say: R`العنوان العربي وزنه 800`, q: "h2", style: ["font-weight", "800"] },
              { say: R`السطر الإنجليزي لسه 4px`, q: ".en", style: ["letter-spacing", "4px"] },
              { say: R`والسطر الإنجليزي لسه [[uppercase]]`, q: ".en", style: ["text-transform", "uppercase"] }
            ] }, sol: R`~~~live 101 بعد التصليح
<style>
  .en { text-transform: uppercase; letter-spacing: 4px; }
  h2 { font-weight: 800; }
</style>
<h2>وصل حديثًا</h2>
<p class="en" lang="en" dir="ltr">new arrivals</p>
~~~

**هتشوف إيه:** الشكل قبل وبعد قريب جدًا في Chrome، وده المقصود من التمرين: القاعدتين مكانوش بيعملوا حاجة للعربي هنا، فشيلهم تنضيف مش تغيير شكل. اللي اتغيّر إن العنوان بقى أتقل، و «NEW ARRIVALS» زي ما هي.

**ليه نشيلهم لو مش بيأثروا؟**

- في متصفحات تانية [[letter-spacing]] بتفك الحروف العربي عن بعض (تحذير MDN).
- حتى في Chrome بتقفل الـ ligatures في الخط.
- واللي هييجي بعدك هيفتكر إن العنوان العربي «متميّز» بيهم، وهو مش متميّز بحاجة.

**الغلطة الشائعة:** [[letter-spacing: 0]] بدل ما تشيل القاعدة. بتشتغل، بس المحسوب هيبقى [[0px]] مش [[normal]]، و [[normal]] هي اللي بتسيب المتصفح حر في توزيع المسافات مع [[justify]].

~~~text القياس من Chrome
               قبل                           بعد
h2             letter-spacing: 4px           normal        font-weight: 800
.en            letter-spacing: 4px           4px
عرض «الخط العربي جميل» بـ 10px: +20 بس (عند المسافتين)، وعرض «Arabic type»: +110
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة قصة قصيرة: الفقرات [[justify]] وأول سطر في كل واحدة داخل [[2em]]، ومفيش مسافة بين الفقرات (الفراغ هو الفاصل)، وسطر الختام [[.end]] في النص. الخط 18px. (من قسم ٢ و ٣ في الشرح)`, done: R`الفقرات [[justify]] وأول سطرها 36px، والختام [[center]] من غير فراغ في أوله، وكل الشروط ✓.`, work: { h: 270, start: R`<style>
  .story { max-width: 380px; font-size: 18px; line-height: 1.8; }
  .story p { margin: 0; }
  .end { }
</style>
<div class="story">
  <p>كان البحر هادي في الصبحية دي، والمراكب راجعة واحدة ورا التانية من غير صوت.</p>
  <p>وقف عم صابر على الرصيف يعدّ الشباك زي كل يوم، وهو عارف إن العدد مش هيتغيّر.</p>
  <p class="end">تمّت</p>
</div>`, checks: [
              { say: R`الفقرات [[justify]]`, q: ".story p:not(.end)", style: ["text-align", "justify"] },
              { say: R`أول سطر داخل 2em (36px)`, q: ".story p:not(.end)", style: ["text-indent", "36px"] },
              { say: R`سطر الختام في النص`, q: ".end", style: ["text-align", "center"] },
              { say: R`سطر الختام من غير فراغ في أوله`, q: ".end", style: ["text-indent", "0px"] }
            ] }, sol: R`~~~live 178 الحل
<style>
  .story { max-width: 380px; font-size: 18px; line-height: 1.8; }
  .story p { margin: 0; text-align: justify; text-indent: 2em; }
  .story .end { text-align: center; text-indent: 0; }
</style>
<div class="story">
  <p>كان البحر هادي في الصبحية دي، والمراكب راجعة واحدة ورا التانية من غير صوت.</p>
  <p>وقف عم صابر على الرصيف يعدّ الشباك زي كل يوم، وهو عارف إن العدد مش هيتغيّر.</p>
  <p class="end">تمّت</p>
</div>
~~~

**هتشوف إيه:**

- فقرتين ملزوقين في بعض، وكل واحدة أول سطر فيها بادئ جوه شوية من اليمين.
- حافة الشمال مستقيمة (السطور ممطوطة)، إلا آخر سطر في كل فقرة.
- «تمّت» في نص العرض بالظبط.

**ليه [[text-indent: 0]] على الختام؟** [[.end]] هي كمان [[p]] جوه [[.story]]، فخدت الـ 36px. من غير تصفيرها «تمّت» هتتوسّط في العرض **الباقي بعد الفراغ**، فتطلع مزاحة 18px عن النص.

**ليه [[.story .end]] مش [[.end]]؟** عشان تغلب [[.story p]]: الاتنين class، بس الأولى فيها عنصر كمان (درس «specificity»).

**الغلطة الشائعة:** [[text-indent: 2em]] ومعاها مسافة بين الفقرات. الاتنين علامتين لنفس الحاجة (بداية فقرة)، والكتب بتستخدم واحدة بس.

~~~text القياس من Chrome
.story p     text-align: justify     text-indent: 36px
.end         text-align: center      text-indent: 0px
~~~` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** في شريط الكاتب، الدايرة الملوّنة (مكان صورته) قاعدة على خط الكتابة فشكلها واطي عن الاسم، وتحتها فراغ زيادة. وسّطها رأسيًا مع الكلام بخاصية واحدة. (من قسم ٧ في الشرح)`, done: R`الدايرة [[vertical-align: middle]]، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .by { font-size: 18px; background: #f3f4f6; }
  .avatar { display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #0f766e; }
</style>
<div class="by"><span class="avatar"></span> كتبت: سلمى فؤاد</div>`, checks: [
              { say: R`الدايرة متوسّطة رأسيًا مع الكلام`, q: ".avatar", style: ["vertical-align", "middle"] },
              { say: R`الدايرة لسه [[inline-block]] 40px`, q: ".avatar", style: ["height", "40px"] }
            ] }, sol: R`~~~live 56 بعد التصليح
<style>
  .by { font-size: 18px; background: #f3f4f6; }
  .avatar { display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #0f766e; vertical-align: middle; }
</style>
<div class="by"><span class="avatar"></span> كتبت: سلمى فؤاد</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 61 قبل
<style>
  .by { font-size: 18px; background: #f3f4f6; }
  .avatar { display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: #0f766e; }
</style>
<div class="by"><span class="avatar"></span> كتبت: سلمى فؤاد</div>
~~~

**هتشوف إيه:** قبل: الاسم نازل عند أسفل الدايرة، وتحت الدايرة شريط رمادي رفيع زيادة. بعد: الاسم قصاد نص الدايرة، والشريط الرمادي قد الدايرة بالظبط.

**ليه:** الافتراضي [[baseline]]: أسفل الدايرة بيقعد على خط كتابة الاسم، وتحت خط الكتابة مكان محجوز لنزلات الحروف. [[middle]] بتحط نص الدايرة عند نص الحروف.

**الغلطة الشائعة:** [[vertical-align: middle]] على [[.by]] (الـ div). مبتعملش حاجة: الخاصية بتتحط على العنصر اللي جوه السطر نفسه.

~~~text القياس من Chrome (div جواه inline-block 50px، خط 16px)
baseline    ارتفاع الـ div 53px
middle      ارتفاع الـ div 50px
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلتك كتبت في الـ HTML [[<h3>SALE ENDS FRIDAY</h3>]] بحروف كبيرة. اشرحلها في ٣ سطور ليه تكتبها [[Sale ends Friday]] وتكبّرها بالـ CSS، وإيه اللي هيحصل للعنوان ده في النسخة العربي. (من قسم ٤ في الشرح)`, done: R`ذكرت قارئ الشاشة، وسهولة تغيير التصميم، وإن العربي ملوش حروف كبيرة فلازم تمييز تاني.`, sol: R`**إجابة نموذجية:**

1. النص المكتوب كله حروف كبيرة، قارئ الشاشة ممكن يعتبره اختصار ويتهجّاه حرف حرف. المكتوب طبيعي بيتقري ككلام عادي، و [[text-transform: uppercase]] بتغيّر الشكل بس.
2. لو التصميم اتغيّر بعدين (عناوين عادية)، بتمسحي سطر CSS واحد بدل ما تعيدي كتابة كل عنوان في كل صفحة.
3. في النسخة العربي «العرض ينتهي الجمعة» مفيهاش حروف كبيرة، فـ [[uppercase]] مش هتعمل حاجة. العنوان العربي محتاج تمييز تاني مكتوب في نفس القاعدة: وزن أتقل أو لون.

~~~text القياس من Chrome
<h3 style="text-transform: uppercase">Sale ends Friday</h3>
المعروض:        SALE ENDS FRIDAY
textContent:    Sale ends Friday          ← النص في الصفحة طبيعي
~~~

**نقطة زيادة:** الحروف الكبيرة أعرض («hello world» من 478px لـ 728px بنفس الخط)، فجرّبي العنوان في أضيق عرض.` }
          ]
        },
        {
          cmd: "white-space و overflow-wrap",
          title: "المسافات والسطور الجديدة، والكلمة الطويلة اللي بتكسر الصفحة، والنقط التلاتة",
          pre: [{ to: "css/code و pre و kbd", why: R`[[<pre>]] هو العنصر اللي بيحافظ على المسافات والسطور، والدرس ده بيشرح الخاصية اللي وراه` }],
          ref: [
            { t: "MDN: white-space", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/white-space" },
            { t: "MDN: white-space-collapse", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/white-space-collapse" },
            { t: "MDN: overflow-wrap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-wrap" },
            { t: "MDN: word-break", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/word-break" },
            { t: "MDN: hyphens", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/hyphens" },
            { t: "MDN: text-overflow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-overflow" },
            { t: "MDN: tab-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/tab-size" },
            { t: "MDN: line-break", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-break" },
            { t: "MDN: -webkit-line-clamp", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/-webkit-line-clamp" }
          ],
          desc: R`المتصفح بيكسّر السطر عند المسافات بس. فكلمة طويلة من غير مسافات (لينك، اسم ملف، «هههههه») مبتتكسرش، وبتطلع برّه الصندوق وتعمل للصفحة سكرول بالعرض على الموبايل. [[overflow-wrap: break-word]] بتسمحله يكسرها لما مفيش حل تاني.
و [[white-space]] بتتحكم في المسافات والسطور الجديدة اللي في الكود: تتلمّ في مسافة واحدة ولا تفضل زي ما هي. و [[text-overflow: ellipsis]] بتقص العنوان الطويل وتحط «…».`,
          example: R`p { overflow-wrap: break-word; }
td { overflow-wrap: anywhere; }
.title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.summary { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
.address { white-space: pre-line; }
pre { white-space: pre-wrap; tab-size: 2; }
.en { hyphens: auto; }`,
          flag: "script",
          lines: [
            R`لو فيه كلمة أطول من السطر ومفيش مكان تتكسر فيه، اكسرها عند أي حرف بدل ما تطلع برّه الفقرة. الكلمات العادية مبتتأثرش.`,
            R`[[anywhere]] زي [[break-word]]، وزيادة عليها إن الخانة «تعرف» إنها ممكن تضيق: الجدول مبيتمطش عشان يشيل الكلمة الطويلة.`,
            R`تلات خصائص مع بعض لعنوان في سطر واحد: امنع التكسير، واخفي اللي طالع برّه، وحط «…» مكان القص. من غير أي واحدة فيهم النقط مبتظهرش.`,
            R`قص بعد 3 سطور ونقط في آخر التالت. الأربع سطور دول لازم ييجوا مع بعض، وأساميهم القديمة ([[-webkit-]]) هي اللي شغالة في كل المتصفحات.`,
            R`العنوان البريدي اللي اتكتب على كذا سطر يتعرض على كذا سطر: السطر الجديد في النص بيفضل، والمسافات الكتير بتتلمّ.`,
            R`الكود جوه [[<pre>]] يحافظ على مسافاته وسطوره، بس يلف لما يوصل لآخر العرض بدل ما يعمل سكرول. والـ tab عرضه مسافتين بدل 8.`,
            R`الكلمة الإنجليزي الطويلة تتقسم على سطرين بشرطة عند مقطع صح. محتاجة [[lang="en"]] على العنصر، وملهاش أثر على العربي.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح بيعمل حاجتين في أي نص قبل ما يرسمه: **بيلمّ** المسافات والسطور الجديدة في مسافة واحدة، و**بيكسّر** السطر عند المسافات لما العرض يخلص. الدرس ده عن الخصائص اللي بتغيّر الاتنين.

الأرقام من Chrome 157 على Windows 11. و «على الموبايل» معناها صفحة عرضها 360px جوه iframe.

---

## ١. المشكلة: كلمة طويلة بتكسر الصفحة

~~~live 150 لينك طويل وضحكة طويلة في صندوق ضيق
<style>
  .phone { width: 260px; border: 2px solid #111; padding: 8px; overflow: visible; }
  .phone p { background: #fde68a; margin: 6px 0; }
</style>
<div class="phone">
  <p>حمّل التقرير: https://example.test/downloads/annual_sales_report_final_version_2026.pdf</p>
  <p>ههههههههههههههههههههههههههههههههههههههههههههههههههه</p>
  <p>ودي فقرة عادية بتتكسر عند المسافات زي ما المفروض.</p>
</div>
~~~

**هتشوف إيه:** الإطار الأسود هو «الموبايل». اللينك والضحكة طالعين برّه الإطار من الشمال، والخلفية الصفرا واقفة عند حد الإطار. الفقرة التالتة جوه الإطار عادي.

المتصفح بيدوّر على **مكان مسموح** يكسر فيه السطر: مسافة، أو بعد شرطة [[-]]، أو بعد [[/]] و [[?]] في اللينكات. اللينك ده فيه [[_]] مش [[-]]، والضحكة حرف واحد متكرر، فمفيش ولا مكان. الكلمة بتفضل حتة واحدة وتطلع برّه.

~~~text القياس من Chrome (صفحة عرضها 360px فيها اللينك ده والضحكة دي)
عرض الشاشة:          360px
عرض الصفحة الفعلي:   759px        ← الصفحة بقت أعرض من الشاشة: سكرول بالعرض
~~~

سكرول بالعرض على الموبايل معناه إن الصفحة كلها بتتزق، والقايمة والزراير بيبقوا برّه الشاشة. والسبب كلمة واحدة في تعليق كتبه زائر.

---

## ٢. [[overflow-wrap: break-word]]

~~~live 186 نفس الصندوق بعد overflow-wrap: break-word
<style>
  .phone { width: 260px; border: 2px solid #111; padding: 8px; }
  .phone p { background: #fde68a; margin: 6px 0; overflow-wrap: break-word; }
</style>
<div class="phone">
  <p>حمّل التقرير: https://example.test/downloads/annual_sales_report_final_version_2026.pdf</p>
  <p>ههههههههههههههههههههههههههههههههههههههههههههههههههه</p>
  <p>ودي فقرة عادية بتتكسر عند المسافات زي ما المفروض.</p>
</div>
~~~

**هتشوف إيه:** اللينك والضحكة اتكسروا على كذا سطر وفضلوا جوه الإطار. والفقرة التالتة زي ما هي: كلماتها متكسرتش من نصها.

[[break-word]] معناها: **جرّب الأماكن العادية الأول. لو الكلمة لسه مش داخلة في سطر لوحدها، اكسرها عند أي حرف.** الكلام العادي مبيتأثرش خالص.

~~~text القياس من Chrome (نفس الصفحة 360px)
من غير حاجة                         عرض الصفحة 759px
p { overflow-wrap: break-word; }    عرض الصفحة 360px     ✓
p { overflow-wrap: anywhere; }      360px                ✓
body { overflow-wrap: break-word; } 360px                ✓  (بتتورّث: مرة على body تكفي الصفحة)
body { overflow-x: hidden; }        759px                ✗  (السكرول اتخبّى، والكلام اللي برّه اتقص ومحدش هيقراه)
~~~

السطر الأخير حل منتشر وغلط: [[overflow-x: hidden]] بيخفي المشكلة مش بيحلها. آخر اللينك مبقاش يتشاف.

القيم:

| القيمة | معناها |
|---|---|
| [[overflow-wrap: normal]] | الافتراضي: الكسر في الأماكن العادية بس |
| [[overflow-wrap: break-word]] | اكسر الكلمة لو مفيش حل تاني |
| [[overflow-wrap: anywhere]] | زيها، وكمان الصندوق بيتحسب إنه «ممكن يضيق» لحد حرف (القسم ٣) |

### [[word-wrap: break-word]]

[[word-wrap]] الاسم القديم لنفس الخاصية (كان من Internet Explorer). المتصفحات بتعامله كاسم تاني:

~~~text القياس من Chrome
word-wrap: break-word       →  المحسوب  overflow-wrap: break-word
overflow-wrap: anywhere     →  المحسوب  word-wrap: anywhere
~~~

لو قابلته في كود قديم، هو [[overflow-wrap]]. في الجديد اكتب [[overflow-wrap]].

---

## ٣. [[break-word]] ولا [[anywhere]]؟

في فقرة عادية الاتنين نفس النتيجة. الفرق بيبان لما الصندوق عرضه **بيتحسب من محتواه**: خانة جدول، أو عنصر جوه flex.

~~~live 142 جدول فيه لينك طويل: break-word ثم anywhere
<style>
  .phone { width: 280px; border: 2px solid #111; padding: 8px; margin-bottom: 10px; }
  table { border-collapse: collapse; }
  td { border: 1px solid silver; padding: 4px; }
  .a td { overflow-wrap: break-word; }
  .b td { overflow-wrap: anywhere; }
</style>
<div class="phone"><table class="a"><tr><td>الملف</td><td>https://example.test/downloads/annual_sales_report_final.pdf</td></tr></table></div>
<div class="phone"><table class="b"><tr><td>الملف</td><td>https://example.test/downloads/annual_sales_report_final.pdf</td></tr></table></div>
~~~

**هتشوف إيه:** الجدول الأول طالع برّه الإطار مع إن عليه [[break-word]]. التاني اتكسر جوه الإطار.

~~~text القياس من Chrome (مكان عرضه 328px)
                              جدول          عنصر جوه flex
من غير حاجة                   785px         823px
overflow-wrap: break-word     785px  ✗      823px  ✗
overflow-wrap: anywhere       328px  ✓      328px  ✓

«أقل عرض ممكن» للصندوق (min-content):
normal و break-word     743px      (طول الكلمة كلها)
anywhere                13px       (حرف واحد)
~~~

الجدول بيسأل كل خانة: «أقل عرض تقدري تعيشي فيه كام؟». مع [[break-word]] الخانة بترد «طول الكلمة»، فالجدول بيتمط. مع [[anywhere]] بترد «حرف»، فالجدول بيفضل في مكانه والكلمة تتكسر.

القاعدة:

- فقرات ونصوص عادية: [[overflow-wrap: break-word]] على [[body]].
- خانات جداول، وعناصر جوه flex أو grid: [[overflow-wrap: anywhere]] على الخانة نفسها. (في flex فيه حل تاني: [[min-width: 0]] على العنصر، وده في درس «flexbox».)

---

## ٤. [[word-break: break-all]]

[[word-break]] خاصية تانية بتغيّر قواعد الكسر **العادية** نفسها، مش بس وقت الزنقة.

~~~live 112 break-word ثم break-all على نفس الفقرة
<style>
  p { width: 250px; background: #f3f4f6; margin: 6px 0; }
</style>
<p style="overflow-wrap: break-word">الملف: https://example.test/annual_sales_report_final.pdf وخلاص.</p>
<p style="word-break: break-all">الملف: https://example.test/annual_sales_report_final.pdf وخلاص.</p>
~~~

**هتشوف إيه:** في الأولى اللينك نزل سطر جديد لوحده، وبعدين اتكسر لما مكفّاش. في التانية اللينك بدأ على طول بعد «الملف:» في نفس السطر، واتكسر من أي حتة عشان يملا كل سطر لآخره.

| القيمة | معناها |
|---|---|
| [[word-break: normal]] | الافتراضي |
| [[word-break: break-all]] | الكسر مسموح بين **أي حرفين** في أي كلمة، حتى لو الكلمة كانت هتدخل في السطر اللي بعده |
| [[word-break: keep-all]] | للصيني والياباني والكوري: متكسرش بين حروفهم (هم بيتكسروا بين أي حرفين في العادي) |
| [[word-break: break-word]] | قيمة قديمة، MDN بيقول إنها مهجورة. بدلها [[overflow-wrap: anywhere]] |

~~~text القياس من Chrome (فقرة 328px فيها اللينك: ارتفاعها)
overflow-wrap: break-word     109px     (اللينك بدأ سطر جديد: 4 سطور)
word-break: break-all         82px      (اللينك كمّل نفس السطر: 3 سطور)

كلمة عربي طويلة «الاستراتيجيات» في صندوق 60px:  normal حتة واحدة طالعة برّه (90px)     break-all اتكسرت على سطرين
~~~

[[break-all]] بتوفّر سطور، وبتكسر الكلمات العادية من نصها («impor» في سطر و «tant» في اللي بعده، والكلمة العربي كمان بتتكسر من نصها). مناسبة لخانة كلها أكواد وأرقام طويلة. للكلام العادي [[overflow-wrap]] أحسن.

### [[line-break: anywhere]]

[[line-break]] بتحدد «صرامة» الكسر حوالين علامات الترقيم في الصيني والياباني: [[auto]] و [[loose]] و [[normal]] و [[strict]]. ملهاش أثر على العربي. والقيمة [[anywhere]] بتسمح بالكسر عند أي حرف زي [[break-all]] (اتقاس: نفس نتيجتها على اللينك). استخدامها نادر جدًا برّه النصوص الآسيوية.

---

## ٥. [[hyphens: auto]]

الإنجليزي ولغات كتير بتكسر الكلمة الطويلة عند **مقطع** وتحط شرطة: «inter-» في سطر و «national» في اللي بعده. ده اسمه hyphenation.

| القيمة | معناها |
|---|---|
| [[hyphens: manual]] | الافتراضي: اكسر بس عند الأماكن اللي الكاتب حددها بـ [[&shy;]] |
| [[hyphens: auto]] | المتصفح بيقرر أماكن المقاطع من قاموس اللغة |
| [[hyphens: none]] | متكسرش حتى عند [[&shy;]] |

[[&shy;]] (soft hyphen) حرف مخفي بتحطه جوه الكلمة: «لو احتجت تكسر، اكسر هنا». مبيظهرش إلا لو الكسر حصل فعلًا:

~~~live 112 كلمة طويلة فيها &shy;
<style>
  p { width: 110px; background: #f3f4f6; direction: ltr; margin: 6px 0; }
</style>
<p lang="en">An internationalization demo.</p>
<p lang="en">An inter&shy;nation&shy;ali&shy;zation demo.</p>
~~~

**هتشوف إيه:** في الأولى الكلمة الطويلة نزلت سطر لوحدها وطالعة برّه الصندوق الرمادي. في التانية اتقسمت على سطرين وفي آخر السطر الأول شرطة.

~~~text القياس من Chrome (صندوق ضيق)
من غير &shy;                       مفيش كلمة اتقسمت
inter&shy;nation&shy;ali&shy;zation      اتقسمت عند واحدة من العلامات
نفس الكلمة ومعاها hyphens: none          متقسمتش
~~~

[[hyphens: auto]] ليها شرطين: العنصر عليه [[lang]] صح ([[lang="en"]])، والمتصفح عنده قاموس للغة دي. في التجربة هنا (Chrome headless) القاموس مكانش محمّل، فمفيش كلمة اتقسمت، وده مش دليل على Chrome العادي. MDN بيقول إن القيمة مدعومة في كل المتصفحات الحالية للغات اللي ليها قواميس.

**والعربي؟** العربي مبيتقطّعش بشرطة: الحروف متصلة، وكسر الكلمة في نصها بيغيّر شكل الحروف. [[hyphens: auto]] على فقرة عربي مغيّرتش حاجة في القياس. ومتحطش [[&shy;]] جوه كلمة عربي. السطر العربي بيتظبط بالمسافات.

لو الصفحة عربي وفيها فقرات إنجليزي: [[:lang(en) { hyphens: auto; }]].

### [[hyphenate-character: "="]]

بتغيّر الحرف اللي بيتحط عند الكسر (الافتراضي شرطة اللغة):

~~~css
p { hyphens: auto; hyphenate-character: "="; }
~~~

القيمة نص بين تنصيص، أو [[auto]]. استخدامها نادر: لغات بتستخدم علامة غير الشرطة. ([[CSS.supports]] رجّع true في Chrome 157.)

---

## ٦. [[white-space: nowrap]] وإخواتها

دي الخاصية اللي بتتحكم في الحاجتين اللي المتصفح بيعملهم في النص: لمّ المسافات، وتكسير السطور.

النص ده في الكود (فيه مسافات كتير، وسطر جديد، وكلام طويل):

~~~text الكود
أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف
~~~

~~~live 170 460 نفس النص بست قيم
<style>
  div { width: 190px; margin: 4px; padding: 4px; background: #f3f4f6; display: inline-block; vertical-align: top; overflow: hidden; }
  b { display: block; color: #b45309; font-size: 13px; white-space: normal; }
</style>
<div style="white-space: normal"><b>normal</b>أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف</div>
<div style="white-space: nowrap"><b>nowrap</b>أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف</div>
<div style="white-space: pre"><b>pre</b>أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف</div>
<div style="white-space: pre-wrap"><b>pre-wrap</b>أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف</div>
<div style="white-space: pre-line"><b>pre-line</b>أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف</div>
<div style="white-space: break-spaces"><b>break-spaces</b>أول     كلام
سطر تاني وبعده كلام طويل شوية عشان يلف</div>
~~~

**هتشوف إيه:** ست صناديق بنفس النص. بص على تلات حاجات في كل واحد: المسافة بين «أول» و «كلام» (واسعة ولا مسافة واحدة)، و «سطر تاني» (بدأت سطر جديد ولا كمّلت)، والكلام الطويل (لفّ ولا اتقص عند حد الصندوق).

| القيمة | المسافات الكتير | السطر الجديد في الكود | بيلف عند آخر العرض |
|---|---|---|---|
| [[white-space: normal]] | بتتلمّ في واحدة | بيتلمّ (مسافة) | أيوه |
| [[white-space: nowrap]] | بتتلمّ | بيتلمّ | **لأ** |
| [[white-space: pre]] | **بتفضل** | **بيفضل** | **لأ** |
| [[white-space: pre-wrap]] | بتفضل | بيفضل | أيوه |
| [[white-space: pre-line]] | بتتلمّ | **بيفضل** | أيوه |
| [[white-space: break-spaces]] | بتفضل | بيفضل | أيوه، والمسافات اللي في آخر السطر بتاخد مكان وبتنزل للسطر اللي بعده |

~~~text القياس من Chrome (الافتراضي)
<p>          white-space: normal
<pre>        white-space: pre
<textarea>   white-space: pre-wrap
~~~

أشهر استخدام لكل واحدة:

- [[nowrap]]: زرار أو وسم أو رقم تليفون لازم يفضل في سطر واحد.
- [[pre-wrap]]: كود أو رسالة كتبها المستخدم، وعايز مسافاتها وسطورها ومتطلعش برّه.
- [[pre-line]]: عنوان بريدي أو قصيدة أو رسالة فيها سطور، من غير ما تحط [[<br>]] في كل سطر.

**فخ [[nowrap]]:** السطر مبيلفش، فلو الكلام أطول من الصندوق بيطلع برّه. اتقاس: صندوق 120px بقى عرض محتواه 341px. استخدمها على حاجة قصيرة، أو مع [[overflow: hidden]] (القسم ٨).

### [[white-space-collapse]] و [[text-wrap-mode]]

المواصفة الجديدة قسمت [[white-space]] لخاصيتين، كل واحدة مسؤولة عن شغلانة:

| الخاصية | مسؤولة عن | القيم |
|---|---|---|
| [[white-space-collapse]] | لمّ المسافات والسطور | [[collapse]] و [[preserve]] و [[preserve-breaks]] و [[break-spaces]] |
| [[text-wrap-mode]] | اللف عند آخر العرض | [[wrap]] و [[nowrap]] |

و [[white-space]] بقت مختصرة ليهم:

~~~text القياس من Chrome (المحسوب)
white-space      white-space-collapse     text-wrap-mode
normal           collapse                 wrap
nowrap           collapse                 nowrap
pre              preserve                 nowrap
pre-wrap         preserve                 wrap
pre-line         preserve-breaks          wrap
break-spaces     break-spaces             wrap

white-space: preserve nowrap     ← الشكل الجديد (قيمتين) مقبول في Chrome 157
white-space-collapse: preserve-spaces و discard     ← لسه مش مدعومين (CSS.supports رجّع false)
~~~

الفايدة: تغيّر حاجة واحدة من غير ما تلمس التانية. [[text-wrap-mode: nowrap]] بتمنع اللف وتسيب المسافات على حالها. المنهج شايف [[text-wrap-mode]] Baseline حديثة، فالقيم الستة القديمة لسه هي الأضمن. (واللف «الشيك» بـ [[text-wrap: balance]] ليه درس: «text-wrap».)

### [[tab-size: 2]]

عرض حرف الـ tab لما المسافات محفوظة ([[pre]] و [[pre-wrap]]). الافتراضي 8 حروف، وده واسع على الكود:

~~~text القياس من Chrome (النص «a ثم tab ثم b» بخط عرض حرفه 9.6px)
tab-size: 8      عرضه 86.4px     (9 حروف: الـ tab وصّل للعمود 8)
tab-size: 4      48.0px          (5 حروف)
tab-size: 2      28.8px          (3 حروف)
tab-size: 20px   29.6px          (القيمة ممكن تبقى طول)
~~~

الـ tab مش «8 مسافات». هو «روح للعمود اللي بعده اللي رقمه من مضاعفات 8». بتتكتب مرة: [[pre { tab-size: 2; }]].

---

## ٧. الكود الطويل جوه [[<pre>]]

[[<pre>]] افتراضيًا [[white-space: pre]]: مبيلفش. سطر كود طويل بيكسر الصفحة زي اللينك بالظبط. قدامك حلّين:

~~~live 153 سطر كود طويل: سكرول جوه الصندوق، أو لف
<style>
  .phone { width: 260px; border: 2px solid #111; padding: 8px; }
  pre { background: #f3f4f6; padding: 6px; margin: 6px 0; direction: ltr; text-align: left; }
  .scroll { overflow-x: auto; }
  .wrap { white-space: pre-wrap; overflow-wrap: break-word; }
</style>
<div class="phone">
<pre class="scroll">git log --oneline --graph --decorate --all --since="2 weeks ago"</pre>
<pre class="wrap">git log --oneline --graph --decorate --all --since="2 weeks ago"</pre>
</div>
~~~

**هتشوف إيه:** الصندوق الأول فيه سكرول بالعرض **جواه هو بس** (اسحبه)، والصفحة نفسها ثابتة. التاني السطر لف على كذا سطر.

- [[overflow-x: auto]]: السطور بتفضل زي ما اتكتبت، ومناسبة للكود اللي شكل السطر فيه مهم (Python، جداول ASCII). السكرول جوه الصندوق مش مشكلة. المشكلة لما **الصفحة** هي اللي تسكرول.
- [[white-space: pre-wrap]]: مفيش سكرول، بس السطر الملفوف ممكن يتلخبط مع سطر جديد. مناسبة لأوامر ترمنال ورسايل.

---

## ٨. [[text-overflow: ellipsis]]

لما الكلام يتقص عند حد الصندوق، بتحط «…» مكان القص.

~~~live 118 عنوان طويل في كارت ضيق
<style>
  .card { width: 230px; border: 1px solid silver; padding: 8px; margin: 6px 0; }
  .card h3 { margin: 0; font-size: 17px; }
  .cut h3 { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
<div class="card"><h3>سبع حاجات اتعلمتها من أول مشروع حقيقي اشتغلت عليه</h3></div>
<div class="card cut"><h3>سبع حاجات اتعلمتها من أول مشروع حقيقي اشتغلت عليه</h3></div>
~~~

**هتشوف إيه:** الكارت الأول عنوانه واخد تلات سطور. التاني عنوانه سطر واحد وآخره «…» من ناحية الشمال (نهاية السطر العربي).

بتشتغل بس لما **التلاتة مع بعض**:

~~~text القياس من Chrome (صندوق 200px وكلام عرضه 457px)
text-overflow: ellipsis لوحدها                         الكلام لف على 3 سطور، مفيش قص ولا نقط
+ overflow: hidden                                     لسه 3 سطور
+ white-space: nowrap (من غير overflow)                سطر واحد طالع برّه الصندوق، مفيش نقط
white-space: nowrap + overflow: hidden + ellipsis      سطر واحد، مقصوص، وفي آخره …    ✓
نفس التلاتة على عنصر inline (span)                     مبتشتغلش: لازم صندوق ليه عرض
~~~

1. [[white-space: nowrap]]: عشان الكلام يفضل سطر واحد ويزيد عن العرض.
2. [[overflow: hidden]]: عشان الزيادة تتقص. (أي قيمة غير [[visible]]. شرح [[overflow]] كله في وحدة جاية.)
3. [[text-overflow: ellipsis]]: عشان مكان القص يبان.

والعنصر لازم يبقى صندوق ليه عرض محدود (block أو inline-block)، مش [[<span>]] عادي.

القيم: [[clip]] (الافتراضي: قص من غير علامة)، و [[ellipsis]]، ونص من عندك [[text-overflow: "…المزيد"]] ([[CSS.supports]] رجّع true في Chrome 157، و MDN بيقول إن دعمه في المتصفحات التانية مش كامل).

**النص المقصوص لسه موجود.** في الـ DOM، ولقارئ الشاشة، ولمحرك البحث. اللي اتقص الرسم بس. والزائر اللي شايف مش هيعرف يقرا الباقي، فحط العنوان الكامل في [[title]] أو خلّي الكارت يودّي لصفحة فيها العنوان كله.

### [[-webkit-line-clamp: 3]]: القص بعد كذا سطر

[[text-overflow]] لسطر واحد بس. لملخّص من تلات سطور وبعدهم «…»:

~~~live 114 ملخّص مقصوص بعد 3 سطور
<style>
  .sum { width: 250px; background: #f3f4f6; line-height: 1.7;
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
</style>
<p class="sum">في المقال ده هنمشي خطوة خطوة من ملف فاضي لحد صفحة مرتبة، وهنشرح كل سطر بنكتبه وليه كتبناه، وفي الآخر هتلاقي تمارين بحلولها ومشروع صغير تبنيه بنفسك.</p>
~~~

**هتشوف إيه:** تلات سطور بالظبط، والتالت آخره «…»، وباقي الفقرة مش ظاهر.

~~~text القياس من Chrome (سطر ارتفاعه 19px)
display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden     ارتفاع 38px (سطرين)  ✓
line-clamp: 2 (الاسم الجديد من غير prefix)                                                    ارتفاع 57px: مشتغلش
~~~

الأربع سطور دول «وصفة» بتتحفظ زي ما هي. أساميهم بـ [[-webkit-]] من أيام متصفح واحد، وكل المتصفحات بقت تفهمهم بالاسم ده. الاسم النضيف [[line-clamp]] لسه مش في Chrome 157 ([[CSS.supports]] رجّع false).

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| مفيش [[overflow-wrap]] في موقع فيه كلام من المستخدمين | أول لينك طويل بيعمل سكرول بالعرض على الموبايل |
| [[overflow-x: hidden]] على [[body]] كحل | المشكلة اتخبّت، والكلام اللي برّه اتقص |
| [[break-word]] على خانة جدول | الجدول لسه بيتمط. الخانة عايزة [[anywhere]] |
| [[word-break: break-all]] على الفقرات | الكلمات اللاتيني العادية بتتكسر من نصها |
| [[text-overflow: ellipsis]] لوحدها | مفيش نقط: ناقص [[nowrap]] و [[overflow: hidden]] |
| [[ellipsis]] على [[<span>]] | مبتشتغلش: عايزة صندوق ليه عرض |
| [[white-space: nowrap]] على كلام طويل | بيطلع برّه الصندوق |
| [[<br>]] في كل سطر من عنوان أو قصيدة | [[white-space: pre-line]] بتعملها من غير ما تلمس النص |
| [[hyphens: auto]] من غير [[lang]] | المتصفح ميعرفش يقطّع بأنهي قاموس |
| [[&shy;]] في كلمة عربي | الكلمة ممكن تتفك في نصها |

---

## الخلاصة

- المتصفح بيكسر عند المسافات (وبعد [[-]] و [[/]]). كلمة من غيرهم بتطلع برّه.
- [[overflow-wrap: break-word]] على [[body]]: شبكة أمان لكل الصفحة، ومبتأثرش على الكلام العادي.
- خانات الجداول وعناصر flex: [[overflow-wrap: anywhere]].
- [[white-space]]: [[nowrap]] لسطر واحد، و [[pre-wrap]] للكود، و [[pre-line]] للسطور المكتوبة.
- النقط: [[white-space: nowrap]] + [[overflow: hidden]] + [[text-overflow: ellipsis]]. ولكذا سطر: وصفة [[-webkit-line-clamp]].
- [[hyphens]] للاتيني ومعاها [[lang]]. العربي مبيتقطّعش.`,
          try: R`اعمل [[wrap.html]] فيه صندوق عرضه 280px بإطار، وجواه: فقرة فيها اسم ملف طويل من غير مسافات، وعنوان [[<h3>]] طويل، وعنوان بريدي من تلات سطور مكتوبين في الكود كل واحد في سطر (من غير [[<br>]]). من غير CSS شوف مين طلع برّه ومين سطوره اتلمّت. وبعدين صلّح التلاتة: الفقرة بـ [[overflow-wrap]]، والعنوان بنقط في سطر واحد، والعنوان البريدي بـ [[white-space: pre-line]].`,
          sol: R`~~~live 263 wrap.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تكسير السطور</title>
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
  .box { width: 280px; border: 2px solid #111; padding: 8px; }
  .box p { overflow-wrap: break-word; }
  .box h3 { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
  .box address { white-space: pre-line; font-style: normal; }
</style>
</head>
<body>
<div class="box">
  <h3>محضر اجتماع مجلس الإدارة الربع سنوي الأخير</h3>
  <p>الملف: board_meeting_minutes_q4_2026_final_signed_copy.pdf</p>
  <address>شركة النخيل للتوريدات
    ١٢ شارع البحر
    الإسكندرية</address>
</div>
</body>
</html>
~~~

**هتشوف إيه:**

- العنوان في سطر واحد وآخره «…».
- اسم الملف مكسور على سطرين وجوه الإطار.
- العنوان البريدي على تلات سطور زي ما اتكتب في الكود، من غير [[<br>]]، والمسافات اللي في أول السطرين الأخيرين (بتاعة تنسيق الكود) اختفت.

~~~text القياس من Chrome
p        overflow-wrap: break-word
h3       white-space: nowrap     overflow-x: hidden     text-overflow: ellipsis
address  white-space: pre-line   (white-space-collapse: preserve-breaks)
~~~

**ليه [[pre-line]] مش [[pre]]؟** [[pre]] كانت هتحافظ على مسافات أول السطر كمان، فالسطرين الأخيرين يدخلوا لجوه. [[pre-line]] بتحافظ على السطور وبتلمّ المسافات.

**ليه [[font-style: normal]]؟** [[<address>]] مايل افتراضيًا، والميل على العربي مفبرك (درس «font-weight و font-style»).`,
          deep: {
            why: R`الصفحة اللي كلامها كله إنت اللي كاتبه ممكن تعيش من غير الدرس ده. أول ما يدخل كلام من برّه (تعليق، اسم ملف مرفوع، لينك، إيميل طويل، كود) هتلاقي كلمة مبتتكسرش، وكلمة واحدة كفاية تعمل سكرول بالعرض للصفحة كلها على الموبايل. دي من أكتر مشاكل الـ responsive انتشارًا، وحلها سطر واحد على [[body]]. والنص التاني من الدرس عكسه: حاجات عايزها **متتكسرش** (زرار، عنوان كارت) وتتقص بشكل نضيف.`,
            how: R`المتصفح بيمشي على النص بمرحلتين. الأولى معالجة المسافات حسب [[white-space-collapse]]: يلمّ المسافات والـ tabs والسطور الجديدة في مسافة واحدة، أو يسيبهم. التانية تكسير السطور: بيحدد «فرص الكسر» حسب قواعد Unicode للغة ([[word-break]] و [[line-break]] و [[hyphens]] بيغيّروا الفرص دي)، وبيملا السطر لحد آخر فرصة قبل ما العرض يخلص. لو حتة ملهاش ولا فرصة وأطول من السطر، بتطلع برّه (overflow)، إلا لو [[overflow-wrap]] سامحة بكسر طوارئ. والفرق بين [[break-word]] و [[anywhere]] في مرحلة تالتة: حساب الـ min-content (أقل عرض للصندوق)، اللي الجداول و flex بيعتمدوا عليه: [[anywhere]] بتحسب فرص الطوارئ فيه، و [[break-word]] لأ. و [[text-overflow]] مبتغيّرش الـ layout خالص: بتغيّر رسم آخر السطر المقصوص بس.`,
            when: R`[[overflow-wrap: break-word]] على [[body]] في كل مشروع من أول يوم. [[anywhere]] على خانات الجداول وكروت flex اللي فيها بيانات من المستخدم. [[nowrap]] للأزرار والوسوم والأرقام. [[pre-wrap]] لعرض رسايل وكود. [[pre-line]] للعناوين والقصايد. [[ellipsis]] لعناوين الكروت والقوايم، و [[-webkit-line-clamp]] للملخصات. [[hyphens: auto]] لفقرات إنجليزي في عمود ضيق.`,
            mistakes: R`الاعتماد على إن «محدش هيكتب كلمة طويلة». [[overflow-x: hidden]] بدل الحل. [[break-all]] على كلام عادي. [[break-word]] في جدول. [[ellipsis]] ناقصها خاصية من التلاتة أو على عنصر inline. [[nowrap]] من غير حد للعرض. ونسيان إن النص المقصوص لازم يبقى له مكان يتقري فيه كامل.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** تعليق زائر في «مدوّنة حبر» فيه لينك طويل وضحكة طويلة، والاتنين طالعين برّه صندوق التعليق (والصفحة بتسكرول بالعرض على الموبايل). صلّحها بخاصية واحدة على [[.comment]] من غير ما تخفي أي كلام. (من قسم ١ و ٢ في الشرح)`, done: R`[[.comment]] عليها [[overflow-wrap: break-word]] ومفيش [[overflow: hidden]]، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  .comment { width: 260px; border: 2px solid #111; padding: 8px; background: #fef9c3; }
</style>
<div class="comment">
  <p>شوف ده: https://example.test/files/very_long_file_name_without_any_spaces_2026.zip</p>
  <p>هههههههههههههههههههههههههههههههههههههههههههههه</p>
</div>`, checks: [
              { say: R`الكلمة الطويلة بتتكسر: [[overflow-wrap: break-word]]`, q: ".comment p", style: ["overflow-wrap", "break-word"] },
              { say: R`مفيش كلام مخفي: [[overflow]] لسه [[visible]]`, q: ".comment", style: ["overflow-x", "visible"] },
              { say: R`الكلمات العادية مبتتكسرش من نصها: [[word-break]] لسه [[normal]]`, q: ".comment p", style: ["word-break", "normal"] }
            ] }, sol: R`~~~live 174 بعد التصليح
<style>
  .comment { width: 260px; border: 2px solid #111; padding: 8px; background: #fef9c3; overflow-wrap: break-word; }
</style>
<div class="comment">
  <p>شوف ده: https://example.test/files/very_long_file_name_without_any_spaces_2026.zip</p>
  <p>هههههههههههههههههههههههههههههههههههههههههههههه</p>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 138 قبل
<style>
  .comment { width: 260px; border: 2px solid #111; padding: 8px; background: #fef9c3; }
</style>
<div class="comment">
  <p>شوف ده: https://example.test/files/very_long_file_name_without_any_spaces_2026.zip</p>
  <p>هههههههههههههههههههههههههههههههههههههههههههههه</p>
</div>
~~~

**هتشوف إيه:** قبل: اللينك والضحكة خارجين من شمال الإطار. بعد: الاتنين مكسورين على كذا سطر جوه الإطار، وكل الحروف باينة.

**ليه كده:** الخاصية بتتورّث، فكتبناها على [[.comment]] والفقرتين خدوها. وبتشتغل وقت الزنقة بس: «شوف ده:» متكسرتش.

**الغلطة الشائعة:** [[overflow: hidden]]. الإطار هيبان نضيف، وآخر اللينك هيتقص، والزائر مش هيعرف ينسخه.

~~~text القياس من Chrome (صفحة 360px فيها نفس النوع من الكلام)
قبل      عرض الصفحة 759px
بعد      عرض الصفحة 360px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت مقال: العنوان [[h3]] لازم يفضل **سطر واحد** وآخره «…» لو طويل، والملخّص [[.sum]] يتقص بعد **سطرين** بنقط. (من قسم ٨ في الشرح)`, done: R`العنوان عليه التلات خصائص، والملخّص عليه [[-webkit-line-clamp: 2]] و [[overflow: hidden]]، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .card { width: 260px; border: 1px solid silver; padding: 10px; line-height: 1.7; }
  .card h3 { margin: 0; font-size: 17px; }
  .sum { margin: 4px 0 0; }
</style>
<div class="card">
  <h3>دليلك الكامل لاختيار أول لابتوب للبرمجة بميزانية محدودة</h3>
  <p class="sum">مش محتاج أغلى جهاز في السوق. هنشوف مع بعض المواصفات اللي بتفرق فعلًا، والحاجات اللي ممكن توفّر فيها، وإمتى المستعمل يبقى اختيار أحسن.</p>
</div>`, checks: [
              { say: R`العنوان مبيلفش: [[white-space: nowrap]]`, q: ".card h3", style: ["white-space", "nowrap"] },
              { say: R`الزيادة بتتقص: [[overflow: hidden]]`, q: ".card h3", style: ["overflow-x", "hidden"] },
              { say: R`مكان القص عليه نقط: [[text-overflow: ellipsis]]`, q: ".card h3", style: ["text-overflow", "ellipsis"] },
              { say: R`الملخّص مقصوص عند سطرين`, q: ".sum", style: ["-webkit-line-clamp", "2"] },
              { say: R`والملخّص [[overflow: hidden]]`, q: ".sum", style: ["overflow-y", "hidden"] }
            ] }, sol: R`~~~live 125 الحل
<style>
  .card { width: 260px; border: 1px solid silver; padding: 10px; line-height: 1.7; }
  .card h3 { margin: 0; font-size: 17px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sum { margin: 4px 0 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
</style>
<div class="card">
  <h3>دليلك الكامل لاختيار أول لابتوب للبرمجة بميزانية محدودة</h3>
  <p class="sum">مش محتاج أغلى جهاز في السوق. هنشوف مع بعض المواصفات اللي بتفرق فعلًا، والحاجات اللي ممكن توفّر فيها، وإمتى المستعمل يبقى اختيار أحسن.</p>
</div>
~~~

**هتشوف إيه:**

- العنوان سطر واحد وآخره «…» من ناحية الشمال.
- الملخّص سطرين بالظبط، والتاني آخره «…».
- الكارت بقى قصير وثابت الارتفاع مهما كان طول الكلام، وده اللي بيخلّي شبكة كروت تبان مرتبة.

**ليه كده:** سطر واحد: التلاتة ([[nowrap]] و [[hidden]] و [[ellipsis]]). كذا سطر: الوصفة الرباعية بتاعة [[-webkit-line-clamp]].

**الغلطة الشائعة:** تكتب [[text-overflow: ellipsis]] على الملخّص وتستنى نقط بعد سطرين. [[text-overflow]] لسطر واحد بس.

~~~text القياس من Chrome
h3     white-space: nowrap    overflow-x: hidden    text-overflow: ellipsis
.sum   -webkit-line-clamp: 2  overflow-y: hidden
~~~` },
            { lvl: 'تطبيق', t: R`**ابني (refactor):** عنوان المحل مكتوب بـ [[<br>]] في آخر كل سطر. شيل كل الـ [[<br>]] وخلّي السطور تفضل زي ما هي بخاصية واحدة على [[.addr]]، من غير ما المسافات اللي في أول السطور (بتاعة تنسيق الكود) تبان. (من قسم ٦ في الشرح)`, done: R`مفيش [[<br>]] في الكود، و [[.addr]] عليها [[white-space: pre-line]]، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .addr { background: #f3f4f6; padding: 8px; }
</style>
<p class="addr">مكتبة الورّاق<br>
  ٧ شارع المحطة<br>
  طنطا</p>`, checks: [
              { say: R`مفيش [[<br>]] في الكود`, q: "br", n: 0 },
              { say: R`السطور محفوظة والمسافات ملمومة: [[white-space: pre-line]]`, q: ".addr", style: ["white-space", "pre-line"] },
              { say: R`الكلام لسه موجود كله`, q: ".addr", has: "طنطا" }
            ] }, sol: R`~~~live 102 الحل
<style>
  .addr { background: #f3f4f6; padding: 8px; white-space: pre-line; }
</style>
<p class="addr">مكتبة الورّاق
  ٧ شارع المحطة
  طنطا</p>
~~~

**هتشوف إيه:** تلات سطور تحت بعض، كلهم بادئين من نفس الحافة اليمين. نفس الشكل اللي كان بالـ [[<br>]].

**ليه [[pre-line]]:** بتحافظ على السطر الجديد اللي في الكود، وبتلمّ المسافات. فالمسافتين اللي في أول «٧ شارع المحطة» و «طنطا» اختفوا.

| القيمة | السطور | المسافات اللي في أول السطر |
|---|---|---|
| [[normal]] | بتتلمّ: سطر واحد | بتتلمّ |
| [[pre-line]] | محفوظة ✓ | بتتلمّ ✓ |
| [[pre-wrap]] أو [[pre]] | محفوظة | **محفوظة**: السطرين الأخيرين داخلين لجوه |

**إمتى [[<br>]] أحسن؟** لما السطر الجديد جزء من **المعنى** والمحتوى ثابت في الـ HTML (درس «sub و sup و br»). [[pre-line]] بتكسب لما النص جاي من حقل كتب فيه المستخدم (textarea): السطور اللي كتبها بتظهر من غير ما حد يحوّلها لـ [[<br>]].

**الغلطة الشائعة:** [[white-space: pre]]. السطور هتفضل، والمسافات كمان، وسطر طويل مش هيلف.

~~~text القياس من Chrome
.addr   white-space: pre-line     white-space-collapse: preserve-breaks     text-wrap-mode: wrap
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** أمر ترمنال طويل جوه [[<pre>]] طالع برّه عمود المقال على الموبايل. خلّي السطر يلف جوه الصندوق مع الحفاظ على المسافات، وصغّر الـ tab لمسافتين. (من قسم ٦ و ٧ في الشرح)`, done: R`[[<pre>]] بقى [[pre-wrap]] و [[tab-size: 2]] وبيكسر الكلمة الطويلة، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .post { width: 270px; border: 2px solid #111; padding: 8px; }
  pre { background: #f3f4f6; padding: 6px; direction: ltr; text-align: left; }
</style>
<div class="post">
  <p>شغّل الأمر ده:</p>
<pre>docker run --rm --name blog-test -p 8080:80 -v /srv/blog/public:/usr/share/nginx/html:ro nginx:alpine</pre>
</div>`, checks: [
              { say: R`السطر بيلف والمسافات محفوظة: [[white-space: pre-wrap]]`, q: "pre", style: ["white-space", "pre-wrap"] },
              { say: R`الحتة الطويلة اللي من غير مسافات بتتكسر`, q: "pre", style: ["overflow-wrap", "break-word"] },
              { say: R`الـ tab عرضه 2`, q: "pre", style: ["tab-size", "2"] }
            ] }, sol: R`~~~live 171 بعد التصليح
<style>
  .post { width: 270px; border: 2px solid #111; padding: 8px; }
  pre { background: #f3f4f6; padding: 6px; direction: ltr; text-align: left; white-space: pre-wrap; overflow-wrap: break-word; tab-size: 2; }
</style>
<div class="post">
  <p>شغّل الأمر ده:</p>
<pre>docker run --rm --name blog-test -p 8080:80 -v /srv/blog/public:/usr/share/nginx/html:ro nginx:alpine</pre>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 126 قبل
<style>
  .post { width: 270px; border: 2px solid #111; padding: 8px; }
  pre { background: #f3f4f6; padding: 6px; direction: ltr; text-align: left; }
</style>
<div class="post">
  <p>شغّل الأمر ده:</p>
<pre>docker run --rm --name blog-test -p 8080:80 -v /srv/blog/public:/usr/share/nginx/html:ro nginx:alpine</pre>
</div>
~~~

**هتشوف إيه:** قبل: الأمر سطر واحد خارج من يمين الإطار. بعد: الأمر لف على كذا سطر جوه الصندوق الرمادي، والحتة الطويلة بتاعة المسار اتكسرت.

**ليه الاتنين مع بعض:** [[pre-wrap]] بتلف عند المسافات. المسار [[/srv/blog/public:/usr/share/nginx/html:ro]] حتة واحدة طويلة، فمن غير [[overflow-wrap: break-word]] كانت هتفضل طالعة برّه لو الصندوق أضيق منها.

**حل تاني صح:** [[overflow-x: auto]] على [[<pre>]] وتسيبه [[pre]]: سكرول جوه الصندوق. أحسن لكود شكل السطر فيه مهم. للأوامر اللي بتتنسخ، اللف أريح على الموبايل.

**الغلطة الشائعة:** [[white-space: normal]]. هيلف، بس كل المسافات والسطور في الكود هتتلمّ، وكود متنسّق هيبقى فقرة.

~~~text القياس من Chrome
pre   white-space: pre-wrap     overflow-wrap: break-word     tab-size: 2
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** جدول «الملفات المرفوعة» طالع برّه الصفحة بسبب اسم ملف طويل. المبرمج حط [[overflow-wrap: break-word]] على الخانات وماتغيّرش حاجة. غيّر القيمة للي بتشتغل جوه جدول. (من قسم ٣ في الشرح: «break-word ولا anywhere؟»)`, done: R`الخانات [[overflow-wrap: anywhere]] والجدول بقى جوه الإطار، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .phone { width: 280px; border: 2px solid #111; padding: 8px; }
  table { border-collapse: collapse; }
  td, th { border: 1px solid silver; padding: 4px; overflow-wrap: break-word; }
</style>
<div class="phone">
  <table>
    <tr><th>الملف</th><th>الحجم</th></tr>
    <tr><td>invoice_2026_11_customer_0045_final_revised_copy.pdf</td><td>٢ ميجا</td></tr>
  </table>
</div>`, checks: [
              { say: R`الخانات [[overflow-wrap: anywhere]]`, q: "td", style: ["overflow-wrap", "anywhere"] },
              { say: R`مفيش [[word-break: break-all]]`, q: "td", style: ["word-break", "normal"] },
              { say: R`الجدول لسه فيه الخانتين`, q: "td", n: 2 }
            ] }, sol: R`~~~live 127 بعد التصليح
<style>
  .phone { width: 280px; border: 2px solid #111; padding: 8px; }
  table { border-collapse: collapse; }
  td, th { border: 1px solid silver; padding: 4px; overflow-wrap: anywhere; }
</style>
<div class="phone">
  <table>
    <tr><th>الملف</th><th>الحجم</th></tr>
    <tr><td>invoice_2026_11_customer_0045_final_revised_copy.pdf</td><td>٢ ميجا</td></tr>
  </table>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 109 قبل
<style>
  .phone { width: 280px; border: 2px solid #111; padding: 8px; }
  table { border-collapse: collapse; }
  td, th { border: 1px solid silver; padding: 4px; overflow-wrap: break-word; }
</style>
<div class="phone">
  <table>
    <tr><th>الملف</th><th>الحجم</th></tr>
    <tr><td>invoice_2026_11_customer_0045_final_revised_copy.pdf</td><td>٢ ميجا</td></tr>
  </table>
</div>
~~~

**هتشوف إيه:** قبل: الجدول أعرض من الإطار واسم الملف سطر واحد. بعد: الجدول جوه الإطار واسم الملف مكسور على كذا سطر.

**ليه [[break-word]] مشتغلتش:** الجدول بيحدد عرض أعمدته من «أقل عرض» كل خانة تقدر تعيش فيه. [[break-word]] مبتدخلش في الحساب ده، فالخانة قالت «طول الاسم كله»، والجدول اتمط، وبعد ما اتمط مبقاش فيه زنقة تستدعي الكسر. [[anywhere]] بتدخل في الحساب: الخانة بتقول «حرف واحد يكفيني».

**الغلطة الشائعة:** [[word-break: break-all]]. هتحل الجدول، وهتكسر «٢ ميجا» وأي كلمة عادية من نصها عشان تملا السطر.

~~~text القياس من Chrome (مكان عرضه 328px)
td { overflow-wrap: break-word; }     عرض الجدول 785px
td { overflow-wrap: anywhere; }       عرض الجدول 328px
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** املا الجدول ده من دماغك وبعدين قارن بالحل: لكل قيمة من [[normal]] و [[nowrap]] و [[pre]] و [[pre-wrap]] و [[pre-line]]: المسافات الكتير بتتلمّ؟ السطر الجديد في الكود بيفضل؟ الكلام بيلف؟ واكتب استخدام واحد حقيقي لكل قيمة. (من قسم ٦ في الشرح)`, done: R`مليت الخمس صفوف صح وكتبت استخدام لكل قيمة.`, sol: R`**إجابة نموذجية:**

| القيمة | المسافات بتتلمّ؟ | السطر الجديد بيفضل؟ | بيلف؟ | استخدام |
|---|---|---|---|---|
| [[normal]] | أيوه | لأ | أيوه | كل الكلام العادي |
| [[nowrap]] | أيوه | لأ | لأ | زرار، وسم، رقم تليفون، عنوان بنقط |
| [[pre]] | لأ | أيوه | لأ | كود شكل سطوره مهم (مع [[overflow-x: auto]]) |
| [[pre-wrap]] | لأ | أيوه | أيوه | رسالة أو كود على موبايل، ناتج ترمنال |
| [[pre-line]] | أيوه | أيوه | أيوه | عنوان بريدي، قصيدة، تعليق كتبه مستخدم بسطور |

**طريقة تفتكرها:** الاسم بيقول.

- [[pre]] = «زي ما هو» (preformatted): كل حاجة محفوظة ومفيش لف.
- [[-wrap]] = زوّد عليها اللف.
- [[-line]] = احفظ **السطور** بس.
- [[nowrap]] = عكس اللف، والباقي عادي.

~~~text القياس من Chrome (المحسوب: الشغلتين منفصلتين)
normal     collapse          wrap
nowrap     collapse          nowrap
pre        preserve          nowrap
pre-wrap   preserve          wrap
pre-line   preserve-breaks   wrap
~~~

**الغلطة الشائعة:** تفتكر إن [[pre-line]] بتحافظ على المسافات. هي بتحافظ على السطور بس. اللي عايز الاتنين ياخد [[pre-wrap]].` }
          ]
        },
        {
          cmd: "text-decoration و text-shadow",
          title: "الخط اللي تحت الكلام وشكله ومكانه، والضل، وحدود الحروف",
          pre: [{ to: "css/font-family و font-size", why: R`لون الخط اللي تحت الكلام بييجي من [[color]] اللي اتشرحت هناك` }],
          ref: [
            { t: "MDN: text-decoration", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration" },
            { t: "MDN: text-decoration-thickness", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration-thickness" },
            { t: "MDN: text-underline-offset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-underline-offset" },
            { t: "MDN: text-decoration-skip-ink", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink" },
            { t: "MDN: text-shadow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-shadow" },
            { t: "MDN: text-emphasis", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-emphasis" },
            { t: "MDN: -webkit-text-stroke", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/-webkit-text-stroke" },
            { t: "Compatibility Standard: -webkit-text-fill-color و -webkit-text-stroke", url: "https://compat.spec.whatwg.org/#the-webkit-text-fill-color" }
          ],
          desc: R`[[text-decoration]] بترسم خط على الكلام: تحته ([[underline]])، أو فوقه ([[overline]])، أو في نصه ([[line-through]]). وهي مختصرة لأربع خصائص بتتحكم في مكان الخط وشكله ولونه وتُخنه.
و [[text-shadow]] بتحط ضل ورا الحروف. والاتنين مبيغيّروش مكان أي حاجة في الصفحة: رسم بس.`,
          example: R`a { text-decoration: underline 2px #b45309; }
a { text-underline-offset: 0.25em; }
.old { text-decoration: line-through; }
.typo { text-decoration: underline wavy red; }
.plain { text-decoration: none; }
.hero h1 { text-shadow: 0 2px 4px rgb(0 0 0 / 0.6); }
.outline { -webkit-text-stroke: 1px #111; }`,
          flag: "script",
          lines: [
            R`خط تحت اللينك تُخنه 2px ولونه بني. المختصرة بتاخد المكان والتُخن واللون (والشكل لو عايز) بأي ترتيب.`,
            R`الخط ينزل عن الحروف ربع حجم الخط. في العربي ده بيبعده عن النقط اللي تحت الحروف.`,
            R`خط في نص الكلمة: السعر القديم. (ده شكل بس. المعنى «اتشال» بييجي من [[<del>]] أو [[<s>]].)`,
            R`خط متموّج أحمر تحت الكلمة، زي علامة الغلطة الإملائية في برامج الكتابة.`,
            R`بتشيل أي خط عن العنصر. أشهر استخدام: لينكات القايمة الرئيسية والأزرار.`,
            R`ضل ورا عنوان مكتوب فوق صورة: مفيش إزاحة أفقية، ونازل 2px، ومموّه 4px، ولونه أسود بشفافية 60٪. بيفصل الحروف عن الخلفية.`,
            R`حد حوالين كل حرف تُخنه 1px. الاسم فيه [[-webkit-]] بس هو شغال في كل المتصفحات ومكتوب في مواصفة.`
          ],
          teach: R`## الفكرة في سطرين

الخصائص دي كلها «رسم فوق الكلام»: مبتغيّرش عرض ولا ارتفاع ولا مكان. اتقاس: كلمة عليها ضل إزاحته 30px عرضها وارتفاعها زي ما هم بالظبط.

الأرقام من Chrome 157 على Windows 11، والشكل اتشاف في صور للصفحة.

---

## ١. [[text-decoration: underline]] والأربع خصائص اللي جواها

| الخاصية الطويلة | بتحدد | القيم |
|---|---|---|
| [[text-decoration-line]] | مكان الخط | [[none]] و [[underline]] و [[overline]] و [[line-through]]، وممكن أكتر من واحدة |
| [[text-decoration-style]] | شكله | [[solid]] و [[double]] و [[dotted]] و [[dashed]] و [[wavy]] |
| [[text-decoration-color]] | لونه | أي لون. الافتراضي لون الكلام نفسه |
| [[text-decoration-thickness]] | تُخنه | [[auto]] أو [[from-font]] أو طول أو نسبة |

~~~live 68 الأماكن والأشكال
<style>
  p { font-size: 20px; margin: 6px 0; }
  span { margin-inline-end: 12px; }
</style>
<p>
  <span style="text-decoration: underline">تحت</span>
  <span style="text-decoration: overline">فوق</span>
  <span style="text-decoration: line-through">في النص</span>
  <span style="text-decoration: underline overline">الاتنين</span>
</p>
<p>
  <span style="text-decoration: underline solid">solid</span>
  <span style="text-decoration: underline double">double</span>
  <span style="text-decoration: underline dotted">dotted</span>
  <span style="text-decoration: underline dashed">dashed</span>
  <span style="text-decoration: underline wavy red">wavy</span>
</p>
~~~

**هتشوف إيه:** السطر الأول: خط تحت، ثم فوق، ثم في النص، ثم تحت وفوق مع بعض. السطر التاني: نفس الخط بخمس أشكال: عادي، ومزدوج، ومنقّط، ومتقطّع، ومتموّج أحمر.

~~~text القياس من Chrome (المحسوب)
text-decoration: underline wavy red
  → line: underline    style: wavy    color: rgb(255, 0, 0)    thickness: auto

text-decoration: underline dotted #c00 2px
  → line: underline    style: dotted  color: rgb(204, 0, 0)    thickness: 2px

الافتراضي على أي عنصر:  line: none   style: solid   color: لون الكلام   thickness: auto
~~~

وعناصر HTML اللي ليها خط من غير CSS:

~~~text القياس من Chrome (الافتراضي)
<a href>          underline
<u> و <ins>       underline
<s> و <del>       line-through
<abbr title>      underline dotted
~~~

### المختصرة بتمسح

زي [[font]]: اللي مكتبتوش في [[text-decoration]] بيرجع لقيمته الأولى.

~~~text القياس من Chrome
color: red;  text-decoration: underline blue;  text-decoration: underline;
  → text-decoration-color: rgb(255, 0, 0)        (الأزرق اتمسح بالسطر التاني، ورجع لون الكلام)
~~~

فلو عايز تغيّر اللون بس في قاعدة تانية (مثلًا وقت الـ hover)، اكتب [[text-decoration-color]] الطويلة.

### [[text-decoration-thickness: 2px]]

- [[auto]]: المتصفح يختار.
- [[from-font]]: التُخن اللي مصمم الخط حاطه في ملف الخط (لو موجود).
- طول: [[2px]] أو [[0.1em]] (اتحسبت 1.6px مع خط 16px). [[em]] أحسن: الخط بيتخن مع العنوان الكبير.

---

## ٢. الخط والحروف العربي: [[text-underline-offset]] و [[text-decoration-skip-ink]]

الخط اللي تحت الكلام اتصمم للاتيني: الحروف قاعدة على السطر وقليل منها بينزل. العربي نص حروفه ليها نقط أو ذيل تحت السطر (ب ي ج ر و م ع)، فالخط بيعدّي فيها.

~~~live 148 نفس الجملة بأربع إعدادات
<style>
  p { font-size: 24px; margin: 8px 0; }
  .a { text-decoration: underline; }
  .b { text-decoration: underline; text-decoration-skip-ink: none; }
  .c { text-decoration: underline; text-underline-offset: 0.35em; }
  .d { text-decoration: underline; text-underline-position: under; }
</style>
<p><span class="a">يجب أن يبقى جميلًا</span> الافتراضي</p>
<p><span class="b">يجب أن يبقى جميلًا</span> skip-ink: none</p>
<p><span class="c">يجب أن يبقى جميلًا</span> offset: 0.35em</p>
<p><span class="d">يجب أن يبقى جميلًا</span> position: under</p>
~~~

**هتشوف إيه:**

- الأول: الخط **متقطّع** عند كل نقطة وكل ذيل حرف. المتصفح بيسيب فراغ حوالين أي حتة من الحرف بتلمس الخط.
- التاني: خط واحد مستقيم داخل في النقط والذيول.
- التالت والرابع: الخط نزل تحت النقط كلها، فبقى مستقيم ومبيلمسش حاجة.

| الخاصية | بتعمل إيه | القيم |
|---|---|---|
| [[text-decoration-skip-ink]] | الخط يتقطّع عند الحروف اللي نازلة ولا يعدّي فيها | [[auto]] (الافتراضي: يتقطّع) و [[none]] و [[all]] |
| [[text-underline-offset]] | بُعد الخط عن مكانه العادي | [[auto]] أو طول ([[0.25em]]) أو نسبة |
| [[text-underline-position]] | مكان الخط الأساسي | [[auto]] و [[from-font]] و [[under]] (تحت كل نزلات الحروف)، و [[left]] و [[right]] للكتابة الرأسية |

للعربي الخط المتقطّع (الافتراضي) شكله مهلهل لأن النقط كتير. الأنضف: **نزّل الخط** بـ [[text-underline-offset: 0.3em]] أو [[text-underline-position: under]]، فيعدّي تحت النقط.

~~~text القياس من Chrome (المحسوب، خط 16px)
text-underline-offset: 0.25em     →  4px
text-underline-position: under    →  under
text-decoration-skip-ink          →  auto (الافتراضي)
~~~

فيه كمان [[text-decoration-inset]]: خاصية جديدة بتقصّر الخط من طرفيه ([[CSS.supports]] رجّع true في Chrome 157، والمنهج مش حاططها Baseline لسه). والخاصية القديمة [[text-decoration-skip]] مستبعدة من المنهج ومبتشتغلش ([[CSS.supports]] رجّع false).

---

## ٣. الخط مبيتورّثش، بس بيعدّي على الأبناء

دي أغرب حاجة في [[text-decoration]]. الخاصية **مش** بتتورّث (المحسوب عند الابن [[none]])، بس الخط اللي الأب رسمه بيتمد تحت كل الكلام اللي جواه، والابن ميقدرش يشيله.

~~~live 63 86 الابن بيقول none والخط لسه تحته
<style>
  p { font-size: 20px; text-decoration: underline 2px #dc2626; }
  .no { text-decoration: none; background: #fef9c3; }
  .ib { display: inline-block; background: #d1fae5; }
  .blue { color: #1d4ed8; }
</style>
<p>أب عليه خط <b class="no">ابن none</b> <b class="ib">ابن inline-block</b> <b class="blue">ابن أزرق</b> آخر الجملة</p>
~~~

**هتشوف إيه:**

- «ابن none» (الأصفر): الخط الأحمر **لسه تحته** مع إن عليه [[text-decoration: none]].
- «ابن inline-block» (الأخضر): مفيش خط تحته.
- «ابن أزرق»: كلامه أزرق والخط اللي تحته **أحمر**: الخط بتاع الأب وبلون الأب.

~~~text القياس من Chrome
p { text-decoration: underline; }
  span جواه:   المحسوب text-decoration-line: none      ← مورثش حاجة، والخط مرسوم تحته برضه
~~~

المواصفة بتقول إن الخط «بيتنشر» (propagates) على كل اللي جوه السطر، وبيقف عند: [[inline-block]]، والعناصر الـ floated، والـ absolutely positioned. فعشان تشيل الخط عن حتة:

1. شيله من الأب، وحطه على الحتت اللي عايزاه بس. (الأحسن.)
2. أو خلّي الحتة [[display: inline-block]].

---

## ٤. [[text-shadow: 0 2px 4px rgb(0 0 0 / 0.6)]]

~~~text تشريح القيمة
text-shadow:   0          2px         4px        rgb(0 0 0 / 0.6)
               │          │           │          └ اللون
               │          │           └ التمويه (blur): صفر = ضل حاد
               │          └ الإزاحة الرأسية: الموجب لتحت
               └ الإزاحة الأفقية: الموجب لليمين (مبتتعكسش في العربي)
~~~

~~~live 178 تلات ضلال
<style>
  p { font-size: 26px; font-weight: 700; margin: 6px 0; }
  .hard { text-shadow: 2px 2px 0 #f59e0b; }
  .soft { text-shadow: 0 2px 6px rgb(0 0 0 / 0.5); }
  .img { color: white; background: linear-gradient(135deg, #94a3b8, #e2e8f0); padding: 6px 10px; }
  .img.sh { text-shadow: 0 1px 3px rgb(0 0 0 / 0.8); }
</style>
<p class="hard">ضل حاد بلون تاني</p>
<p class="soft">ضل ناعم تحت الحروف</p>
<p class="img">أبيض على خلفية فاتحة من غير ضل</p>
<p class="img sh">أبيض على خلفية فاتحة بضل</p>
~~~

**هتشوف إيه:** الأول ليه نسخة برتقالي مزاحة تحته (ستايل ملصقات). التاني تحته غباشة رمادي خفيفة. التالت أبيض على رمادي فاتح وصعب يتقري، والرابع نفس الألوان ومقروء أحسن عشان الضل الغامق بيرسم حدود الحروف.

~~~text القياس من Chrome (المحسوب)
text-shadow: 2px 2px                      →  rgb(0, 0, 0) 2px 2px 0px       (اللون من color، والتمويه صفر)
text-shadow: 0 0 4px #000, 0 0 12px blue  →  ضلّين: القيمة قايمة بفواصل، والأول فوق
text-shadow: 1px 1px 2px 3px red          →  مرفوضة: مفيش قيمة رابعة (spread) زي box-shadow
text-shadow: inset 1px 1px red            →  مرفوضة: مفيش inset

كلمة بضل 30px 30px:  عرضها وارتفاعها زي من غير ضل بالظبط
~~~

قواعد الاستخدام:

- **الضل مش بديل عن التباين.** لو الكلام فوق صورة، الضل بيساعد. بس لو الصورة فيها حتة فاتحة قوي ورا كلام أبيض، الحل طبقة غامقة فوق الصورة، مش ضل أكبر.
- **على الفقرات لأ.** ضل على كلام صغير بيخلّيه مغبّش. الضل للعناوين.
- **العربي:** الضل الحاد بإزاحة كبيرة بيخلّي النقط والتشكيل «يتكرروا» ويلخبطوا. خليه إزاحة صغيرة وتمويه.
- الإزاحة الأفقية الموجبة دايمًا ناحية اليمين، حتى في [[dir="rtl"]]. لو التصميم ضل «ناحية نهاية السطر»، اعكس الإشارة بإيدك للعربي.

---

## ٥. [[text-emphasis: filled dot]]

علامات صغيرة فوق **كل حرف**. دي طريقة التشديد في الصيني والياباني (مكان الخط المايل عندنا).

~~~live 69 علامات التشديد
<style>
  p { font-size: 22px; line-height: 2.4; margin: 0; }
</style>
<p>
  <span style="text-emphasis: filled dot #dc2626">تشديد</span> ·
  <span style="text-emphasis: open circle">دواير</span> ·
  <span style="text-emphasis: '★' #1d4ed8; text-emphasis-position: under right" lang="en">Stars</span>
</p>
~~~

**هتشوف إيه:** نقطة حمرا فوق كل حرف من «تشديد»، ودايرة مفرّغة فوق كل حرف من «دواير»، ونجمة زرقا **تحت** كل حرف من «Stars».

| الخاصية | القيم |
|---|---|
| [[text-emphasis-style]] | [[filled]] أو [[open]] مع شكل: [[dot]] و [[circle]] و [[double-circle]] و [[triangle]] و [[sesame]]، أو حرف من عندك بين تنصيص |
| [[text-emphasis-color]] | لون العلامة. الافتراضي لون الكلام |
| [[text-emphasis-position]] | [[over]] أو [[under]]، ومعاها [[right]] أو [[left]] للكتابة الرأسية |
| [[text-emphasis]] | مختصرة للشكل واللون (المكان لوحده) |

~~~text القياس من Chrome
text-emphasis: open sesame red     →  style: open sesame    color: rgb(255, 0, 0)    position: over
ارتفاع سطر خطه 20px:   من غير 24px      بالعلامات 30px      ← العلامات بتعلّي السطر لو line-height مش مكفّي
~~~

على العربي بتشتغل تقنيًا (زي ما شفت)، بس النقط الزيادة فوق الحروف بتتلخبط مع نقط الحروف والتشكيل. دي خاصية للنصوص الآسيوية، وبتتورّث.

---

## ٦. [[-webkit-text-stroke]] و [[-webkit-text-fill-color]]

| الخاصية | بتعمل إيه |
|---|---|
| [[-webkit-text-stroke: 1px #111]] | حد حوالين كل حرف. مختصرة لـ [[-webkit-text-stroke-width]] و [[-webkit-text-stroke-color]] |
| [[-webkit-text-fill-color: transparent]] | لون **حشو** الحروف. لو اتكتبت بتغلب [[color]] |

~~~live 138 حد حوالين الحروف
<style>
  p { font-size: 34px; font-weight: 700; margin: 4px 0; }
  .a { -webkit-text-stroke: 1px #dc2626; }
  .b { -webkit-text-stroke: 1.5px #111; -webkit-text-fill-color: transparent; }
  .c { color: #dc2626; -webkit-text-fill-color: #1d4ed8; }
</style>
<p class="a">عنوان بحد أحمر</p>
<p class="b">عنوان مفرّغ Outline</p>
<p class="c">color أحمر و fill أزرق</p>
~~~

**هتشوف إيه:** الأول حروف سودا حواليها حد أحمر. التاني حروف شفافة مش باين منها غير الحد. التالت أزرق: [[-webkit-text-fill-color]] غلبت [[color]].

بص كويس على «مفرّغ» في السطر التاني: في أماكن اتصال الحروف العربي ببعض الحدود **بتتقاطع جوه الكلمة**. كل حرف عربي رسمة لوحدها بتركب على اللي جنبها، والحشو كان مغطّي التقاطع ده. لما الحشو بقى شفاف، بان. الحروف اللاتيني («Outline») منفصلة فمفيهاش المشكلة دي. فالعنوان المفرّغ بالعربي بيطلع فيه خطوط زيادة: يا تسيب الحشو ملوّن، يا تستخدمه للاتيني بس.

~~~text القياس من Chrome (المحسوب)
-webkit-text-stroke: 2px red            →  width: 2px     color: rgb(255, 0, 0)
color: red; -webkit-text-fill-color: blue   →  الحشو rgb(0, 0, 255)، و color لسه rgb(255, 0, 0) (بيلوّن الخط اللي تحت الكلام والـ border)
CSS.supports("text-stroke", "1px red")           false     ← مفيش اسم من غير prefix
CSS.supports("-webkit-text-stroke", "1px red")   true
~~~

**ليه الاسم فيه [[-webkit-]]؟** الخاصيتين بدأوا في متصفح واحد، ومواقع كتير اعتمدت عليهم، فباقي المتصفحات اضطرت تدعمهم **بنفس الاسم**. بعدها اتكتبوا في مواصفة اسمها Compatibility Standard بتوثّق الحاجات اللي بقت «معيار بالأمر الواقع». فدول مش تجريبيين، ومفيش ليهم اسم نضيف: [[-webkit-text-stroke]] هو الاسم. والمنهج حاططهم Baseline. (أغلب خصائص [[-webkit-]] التانية مستبعدة عشان مش قياسية.)

الحد بيترسم نصه جوه الحرف ونصه برّه، فحد تخين بياكل من الحرف نفسه. [[paint-order: stroke fill]] بتخلّي الحشو يترسم فوق الحد، فالحرف يفضل بتُخنه.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[text-decoration: none]] على ابن عشان تشيل خط الأب | الخط لسه موجود. شيله من الأب أو خلّي الابن [[inline-block]] |
| [[text-decoration: underline]] بعد [[text-decoration-color]] | اللون اتمسح: المختصرة بتصفّر الباقي |
| خط تحت كلام مش لينك | الناس هتدوس عليه. الخط تحت الكلام علامة اللينك (درس «:link و :visited و :hover») |
| [[border-bottom]] بدل [[underline]] | بيمتد تحت الصندوق كله مش الكلام، وبيتكسر غلط لما اللينك يلف على سطرين |
| [[line-through]] على [[<span>]] لسعر قديم | الشكل وصل، والمعنى لأ. استخدم [[<del>]] أو [[<s>]] (درس «mark و small و del و ins») |
| ضل تخين على فقرة | كلام مغبّش |
| عنوان عربي مفرّغ بـ [[transparent]] | خطوط متقاطعة عند اتصال الحروف |
| [[text-shadow]] بأربع أرقام | السطر اترمى: مفيش spread |

---

## الخلاصة

- [[text-decoration]] مختصرة: المكان ([[-line]]) والشكل ([[-style]]) واللون ([[-color]]) والتُخن ([[-thickness]]). وبتمسح اللي مكتبتوش.
- للعربي: نزّل الخط بـ [[text-underline-offset]] أو [[text-underline-position: under]] عشان يعدّي تحت النقط.
- الخط بيعدّي على الأبناء ومبيتشالش منهم إلا بـ [[inline-block]].
- [[text-shadow: x y blur color]]: للعناوين وفوق الصور. مفيش spread ولا inset.
- [[text-emphasis]] للنصوص الآسيوية.
- [[-webkit-text-stroke]] و [[-webkit-text-fill-color]]: الاسم بالـ prefix هو الاسم الرسمي.`,
          try: R`اعمل [[deco.html]] فيه فقرة عربي فيها لينك، وسعر قديم جوه [[<del>]] وجنبه السعر الجديد، وعنوان [[<h1>]]. خلّي خط اللينك تُخنه 2px ونازل تحت النقط، وخلّي خط السعر القديم أحمر، وادّي العنوان ضل ناعم. وبعدين جرّب تشيل [[text-underline-offset]] وشوف الخط بيعمل إيه في الحروف اللي ليها نقط تحت.`,
          sol: R`~~~live 163 196 deco.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخطوط والضل</title>
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; font-size: 18px; line-height: 1.8; }
  h1 { text-shadow: 0 2px 4px rgb(0 0 0 / 0.25); }
  a { text-decoration: underline 2px; text-underline-offset: 0.3em; }
  del { text-decoration-color: #dc2626; }
</style>
</head>
<body>
<h1>عرض نهاية الأسبوع</h1>
<p>الشنطة بقت بـ <del>٦٠٠</del> ٤٥٠ جنيه. <a href="#terms">يجب قراءة شروط العرض</a> قبل الطلب.</p>
</body>
</html>
~~~

**هتشوف إيه:**

- العنوان تحته غباشة رمادي خفيفة.
- «٦٠٠» عليها خط أحمر في نصها، والرقم نفسه لسه أسود.
- خط اللينك تخين ومستقيم ونازل تحت نقط «يجب» و «شروط».
- لو شيلت [[text-underline-offset]]: الخط بيطلع لمكانه العادي ويتقطّع عند كل نقطة وذيل.

~~~text القياس من Chrome
a     text-decoration-line: underline    thickness: 2px    text-underline-offset: 5.4px   (0.3em من 18px)
del   text-decoration-line: line-through   text-decoration-color: rgb(220, 38, 38)
h1    text-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px
~~~

لاحظ إننا كتبنا [[text-decoration-color]] الطويلة على [[<del>]]: الخط نفسه ([[line-through]]) جاي من المتصفح، وإحنا غيّرنا لونه بس. لو كتبنا [[text-decoration: #dc2626]] المختصرة، كانت هتمسح الـ [[line-through]] نفسه.`,
          deep: {
            why: R`الخط اللي تحت الكلام أقدم علامة في الويب: «ده لينك». وشكله الافتراضي مش مريح مع العربي لأنه بيعدّي في النقط، فناس كتير بتشيله خالص وتخسر العلامة. الخصائص الجديدة ([[offset]] و [[thickness]] و [[skip-ink]]) بتخلّيك تحتفظ بالعلامة وتظبط شكلها. والضل وحد الحروف أدوات للعناوين، قيمتهم الحقيقية إنهم بيخلّوا كلام فوق صورة يتقري.`,
            how: R`بعد ما المتصفح يرتّب السطور، بيرسم بالترتيب: الضلال، ثم خطوط التزيين اللي تحت الكلام، ثم الحروف، ثم خط النص ([[line-through]]) فوقها. مكان وتُخن الخط بييجوا من مقاييس جوه ملف الخط (underline position و thickness) لما القيمة [[auto]] أو [[from-font]]، ومع [[skip-ink: auto]] المتصفح بيحسب تقاطع الخط مع رسمة كل حرف ويسيب فراغ. والخط بيتحسب من العنصر اللي أعلنه (لونه وتُخنه)، وبيتمد على كل الصناديق اللي جوه السطر، وعشان كده الابن مبيقدرش يغيّره. [[text-shadow]] نسخة من الحروف مزاحة ومموّهة ومرسومة تحتها. و [[-webkit-text-stroke]] بيرسم محيط كل glyph لوحده، فالحروف المتراكبة (زي العربي) محيطاتها بتتقاطع.`,
            when: R`[[text-decoration]] وإخواتها: اللينكات أولًا، وبعدها الأسعار القديمة والكلام المشطوب وعلامات الأخطاء. [[text-underline-offset]]: في أي موقع عربي فيه لينكات جوه الفقرات. [[text-shadow]]: عنوان فوق صورة أو خلفية ملوّنة. [[-webkit-text-stroke]]: عناوين زينة كبيرة. [[text-emphasis]]: محتوى صيني أو ياباني.`,
            mistakes: R`محاولة شيل خط الأب من الابن. المختصرة بتمسح اللون والتُخن. خط تحت كلام مش لينك. [[border-bottom]] كبديل. ضل على نص صغير. الاعتماد على الضل بدل التباين. وعنوان عربي مفرّغ.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** لينكات مقال عربي. خلّي الخط اللي تحتها: تُخنه 2px، ولونه [[#b45309]]، ونازل 5px عن مكانه عشان يعدّي تحت النقط. ولون الكلام نفسه يفضل زي ما هو. (من قسم ١ و ٢ في الشرح)`, done: R`الخط 2px وبني ونازل 5px، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  p { font-size: 20px; line-height: 1.9; }
  a { }
</style>
<p>قبل ما تبدأ، <a href="#req">يجب تجهيز البيئة</a> وقراية <a href="#faq">الأسئلة الشائعة</a>.</p>`, checks: [
              { say: R`اللينك لسه تحته خط`, q: "a", style: ["text-decoration-line", "underline"] },
              { say: R`تُخن الخط 2px`, q: "a", style: ["text-decoration-thickness", "2px"] },
              { say: R`لون الخط [[#b45309]]`, q: "a", style: ["text-decoration-color", "rgb(180, 83, 9)"] },
              { say: R`الخط نازل 5px`, q: "a", style: ["text-underline-offset", "5px"] },
              { say: R`لون كلام اللينك متغيّرش`, q: "a", style: ["color", "rgb(0, 0, 238)"] }
            ] }, sol: R`~~~live 78 116 الحل
<style>
  p { font-size: 20px; line-height: 1.9; }
  a { text-decoration: underline 2px #b45309; text-underline-offset: 5px; }
</style>
<p>قبل ما تبدأ، <a href="#req">يجب تجهيز البيئة</a> وقراية <a href="#faq">الأسئلة الشائعة</a>.</p>
~~~

**هتشوف إيه:** اللينكين كلامهم أزرق، وتحتهم خط بني تخين ومستقيم، بعيد عن نقط «يجب» و «تجهيز» و «البيئة».

**ليه كده:** المختصرة شالت التُخن واللون مع المكان في سطر. والـ offset خاصية لوحدها (مش جزء من المختصرة).

**الغلطة الشائعة:** [[color: #b45309]] عشان تلوّن الخط. الكلام نفسه هيتلوّن. لون الخط لوحده اسمه [[text-decoration-color]].

~~~text القياس من Chrome
a   text-decoration-line: underline   thickness: 2px   color: rgb(180, 83, 9)   text-underline-offset: 5px
a   color: rgb(0, 0, 238)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عنوان القسم عليه خط، وجواه شارة «جديد» المفروض متبقاش تحتها خط. المبرمج كتب [[text-decoration: none]] على الشارة ومحصلش حاجة. صلّحها من غير ما تشيل خط العنوان. (من قسم ٣ في الشرح)`, done: R`الشارة بقت [[inline-block]] ومفيش خط تحتها، والعنوان لسه [[underline]]، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  h2 { text-decoration: underline 3px #0f766e; text-underline-offset: 6px; }
  .badge { text-decoration: none; font-size: 14px; background: #fde68a; padding: 0 8px; border-radius: 999px; }
</style>
<h2>دروس الأسبوع <span class="badge">جديد</span></h2>`, checks: [
              { say: R`الشارة [[inline-block]]: الخط بيقف عندها`, q: ".badge", style: ["display", "inline-block"] },
              { say: R`العنوان لسه عليه خط`, q: "h2", style: ["text-decoration-line", "underline"] }
            ] }, sol: R`~~~live 67 بعد التصليح
<style>
  h2 { text-decoration: underline 3px #0f766e; text-underline-offset: 6px; }
  .badge { display: inline-block; font-size: 14px; background: #fde68a; padding: 0 8px; border-radius: 999px; }
</style>
<h2>دروس الأسبوع <span class="badge">جديد</span></h2>
~~~

وده اللي كان باين قبل التصليح:

~~~live 67 قبل
<style>
  h2 { text-decoration: underline 3px #0f766e; text-underline-offset: 6px; }
  .badge { text-decoration: none; font-size: 14px; background: #fde68a; padding: 0 8px; border-radius: 999px; }
</style>
<h2>دروس الأسبوع <span class="badge">جديد</span></h2>
~~~

**هتشوف إيه:** قبل: الخط الأخضر ممدود تحت «دروس الأسبوع» وتحت الشارة الصفرا كمان. بعد: الخط تحت الكلام بس، والشارة نضيفة.

**ليه [[none]] مشتغلتش:** الشارة معندهاش خط أصلًا عشان تشيله. الخط بتاع [[h2]]، وهو اللي راسمه تحت كل اللي جواه. [[inline-block]] بتطلّع الشارة من «سطر» الأب، فالخط بيقف عندها.

**حل تاني صح:** تحط الكلام في [[<span>]] وتحط الخط عليه هو بدل [[h2]].

**الغلطة الشائعة:** [[text-decoration: none !important]]. نفس النتيجة: المشكلة مش أولوية، المشكلة إن مفيش حاجة تتشال.

~~~text القياس من Chrome
.badge   قبل: display: inline    text-decoration-line: none   (والخط مرسوم تحتها)
.badge   بعد: display: inline-block                             (مفيش خط)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المفروض الكلمة الغلط [[.typo]] تحتها خط متموّج **أحمر**. الخط طالع متموّج بس بلون الكلام. السبب ترتيب سطرين في القاعدة. صلّحها. (من قسم ١ في الشرح: «المختصرة بتمسح»)`, done: R`الخط متموّج ولونه [[rgb(220, 38, 38)]]، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  p { font-size: 20px; }
  .typo {
    text-decoration-color: #dc2626;
    text-decoration: underline wavy;
  }
</style>
<p>الاجتماع يوم <span class="typo">الثلثاء</span> الساعة عشرة.</p>`, checks: [
              { say: R`الخط لونه أحمر [[#dc2626]]`, q: ".typo", style: ["text-decoration-color", "rgb(220, 38, 38)"] },
              { say: R`الخط متموّج`, q: ".typo", style: ["text-decoration-style", "wavy"] },
              { say: R`كلام الكلمة لسه أسود`, q: ".typo", style: ["color", "rgb(0, 0, 0)"] }
            ] }, sol: R`~~~live 63 بعد التصليح
<style>
  p { font-size: 20px; }
  .typo {
    text-decoration: underline wavy #dc2626;
  }
</style>
<p>الاجتماع يوم <span class="typo">الثلثاء</span> الساعة عشرة.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 63 قبل
<style>
  p { font-size: 20px; }
  .typo {
    text-decoration-color: #dc2626;
    text-decoration: underline wavy;
  }
</style>
<p>الاجتماع يوم <span class="typo">الثلثاء</span> الساعة عشرة.</p>
~~~

**هتشوف إيه:** قبل: خط متموّج أسود تحت «الثلثاء». بعد: نفس الخط أحمر.

**ليه:** [[text-decoration]] المختصرة بتظبط الأربعة. مفيهاش لون، فرجّعت اللون لقيمته الأولى (لون الكلام) ومسحت السطر اللي فوقها.

**حل تاني صح:** تبدّل ترتيب السطرين (المختصرة الأول، وبعدها [[text-decoration-color]]).

**الغلطة الشائعة:** [[color: #dc2626]]. الخط هيحمرّ، والكلمة نفسها كمان.

~~~text القياس من Chrome
قبل   text-decoration-color: rgb(0, 0, 0)        style: wavy
بعد   text-decoration-color: rgb(220, 38, 38)    style: wavy
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** عنوان أبيض فوق خلفية فاتحة ومش مقروء. ادّيله ضل: من غير إزاحة أفقية، ونازل 2px، وتمويه 4px، ولونه أسود بشفافية 0.6. (من قسم ٤ في الشرح)`, done: R`المحسوب [[rgba(0, 0, 0, 0.6) 0px 2px 4px]] والعنوان لسه أبيض، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .hero { background: linear-gradient(135deg, #93c5fd, #e0f2fe); padding: 24px 16px; }
  .hero h1 { color: white; margin: 0; font-size: 30px; }
</style>
<div class="hero"><h1>رحلة لشاطئ هادي</h1></div>`, checks: [
              { say: R`الضل: نازل 2px، وتمويه 4px، وأسود بشفافية 0.6`, q: ".hero h1", style: ["text-shadow", "rgba(0, 0, 0, 0.6) 0px 2px 4px"] },
              { say: R`العنوان لسه أبيض`, q: ".hero h1", style: ["color", "rgb(255, 255, 255)"] }
            ] }, sol: R`~~~live 98 الحل
<style>
  .hero { background: linear-gradient(135deg, #93c5fd, #e0f2fe); padding: 24px 16px; }
  .hero h1 { color: white; margin: 0; font-size: 30px; text-shadow: 0 2px 4px rgb(0 0 0 / 0.6); }
</style>
<div class="hero"><h1>رحلة لشاطئ هادي</h1></div>
~~~

وده اللي كان باين قبل الضل:

~~~live 98 قبل
<style>
  .hero { background: linear-gradient(135deg, #93c5fd, #e0f2fe); padding: 24px 16px; }
  .hero h1 { color: white; margin: 0; font-size: 30px; }
</style>
<div class="hero"><h1>رحلة لشاطئ هادي</h1></div>
~~~

**هتشوف إيه:** قبل: حروف بيضا بتدوب في الأزرق الفاتح، خصوصًا ناحية الشمال. بعد: كل حرف ليه حافة غامقة ناعمة تحته، والعنوان بيتقري.

**ليه القيم دي:** إزاحة صغيرة وتمويه = «هالة» حوالين الحرف مش نسخة تانية منه. والشفافية بتخلّي الضل ياخد من لون الخلفية.

**الغلطة الشائعة:** [[text-shadow: 0 2px 4px 0.6]] أو أربع أطوال. اللون لازم يبقى لون كامل، ومفيش قيمة رابعة.

**خليك فاكر:** الضل تحسين. لو التباين الأصلي ضعيف (أبيض على أزرق فاتح)، الحل الحقيقي خلفية أغمق أو كلام غامق.

~~~text القياس من Chrome
.hero h1   text-shadow: rgba(0, 0, 0, 0.6) 0px 2px 4px      color: rgb(255, 255, 255)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الفقرة لونها أحمر وعليها [[underline]]، وجواها [[<strong>]] لونه أزرق. الخط اللي تحت الكلمة الزرقا هيبقى لونه إيه؟ اكتب توقعك والسبب في جملة، وبعدين افتح الحل. (من قسم ٣ في الشرح)`, done: R`توقّعت إن الخط أحمر تحت الكلمة الزرقا، وعرفت إن الخط بتاع الأب وبلونه.`, sol: R`~~~live 70 الصفحة
<style>
  p { font-size: 22px; color: #dc2626; text-decoration: underline 2px; }
  strong { color: #1d4ed8; }
</style>
<p>العرض ده <strong>لمدة يومين</strong> بس.</p>
~~~

**الإجابة:** الخط **أحمر** تحت الجملة كلها، وتحت «لمدة يومين» الزرقا كمان.

**هتشوف إيه:** كلام أحمر، وكلمتين زرقا في النص، وخط أحمر واحد متصل تحت الكل.

**السبب:** الخط مش بتاع [[<strong>]]. اللي أعلنه هو [[<p>]]، فبيترسم بلون [[<p>]] وتُخنه، وبيتمد تحت كل اللي جواه. [[<strong>]] غيّر لون **كلامه** بس.

~~~text القياس من Chrome
p        text-decoration-line: underline     text-decoration-color: rgb(220, 38, 38)
strong   text-decoration-line: none          ← معندوش خط خاص بيه
~~~

**لو عايز الخط أزرق تحت الكلمة الزرقا:** ادّي [[<strong>]] خط خاص بيه: [[strong { text-decoration: underline 2px; }]]. ساعتها هيترسم خطّين تحت بعض في نفس المكان، والأزرق (بتاع الابن) فوق.` }
          ]
        },
        {
          cmd: "list-style و ::marker",
          title: "علامة القايمة وشكلها ومكانها، والمسافات بين البنود، والعدّادات",
          pre: [
            { to: "css/ul و ol", why: R`القايمة نفسها ([[<ul>]] و [[<ol>]] و [[start]] و [[reversed]]) اتشرحت هناك، وهنا بننسّقها` },
            { to: "css/selectors", why: R`[[::marker]] و [[::before]] pseudo-elements، و [[content]] اتشرحت هناك` }
          ],
          ref: [
            { t: "MDN: list-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/list-style" },
            { t: "MDN: list-style-type", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/list-style-type" },
            { t: "MDN: ::marker", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::marker" },
            { t: "MDN: Using CSS counters", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters" },
            { t: "MDN: counter()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/counter" },
            { t: "MDN: counters()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/counters" },
            { t: "MDN: @counter-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@counter-style" },
            { t: "MDN: symbols()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/symbols" }
          ],
          desc: R`كل بند في قايمة قدامه علامة: نقطة أو رقم. [[list-style]] بتغيّر شكل العلامة ومكانها، و [[::marker]] بتنسّق العلامة نفسها (لونها وخطها ونصها).
والأرقام مش للقوايم بس: العدّادات ([[counter-reset]] و [[counter-increment]] و [[counter()]]) بترقّم أي حاجة في الصفحة، عناوين أو خطوات أو صور، بالأرقام العربي لو عايز.`,
          example: R`ol { list-style-type: arabic-indic; }
ul.done { list-style-type: "✓ "; }
li::marker { color: #b45309; font-weight: 700; }
ul { padding-inline-start: 1.5em; }
li + li { margin-block-start: 0.5em; }
nav ul { list-style: none; padding: 0; }
.doc { counter-reset: sec; }
.doc h2 { counter-increment: sec; }
.doc h2::before { content: counter(sec, arabic-indic) ". "; }`,
          flag: "script",
          lines: [
            R`أرقام القايمة المرقّمة تبقى ١ و ٢ و ٣ بدل 1 و 2 و 3. [[arabic-indic]] اسم نظام الأرقام المستخدم في مصر والمشرق.`,
            R`علامة كل بند نص من عندك بدل النقطة: علامة صح وبعدها مسافة. النص بيتكتب بين تنصيص.`,
            R`تنسيق العلامة نفسها (النقطة أو الرقم) من غير ما كلام البند يتأثر: لون بني وخط تقيل.`,
            R`المسافة اللي العلامات بتقعد فيها قبل البنود: مرة ونص حجم الخط بدل 40px الافتراضية. [[inline-start]] يعني اليمين في العربي.`,
            R`مسافة نص حجم الخط فوق كل بند **قبله بند**. الأول ملوش مسافة فوقه، فالقايمة متبعدش عن اللي قبلها.`,
            R`قايمة التنقل: من غير علامات ومن غير المسافة بتاعتهم. [[list-style: none]] المختصرة بتشيل العلامة.`,
            R`بتعمل عدّاد اسمه [[sec]] وتبدأه من صفر عند أول الصندوق [[.doc]].`,
            R`كل عنوان [[h2]] جوه [[.doc]] بيزوّد العدّاد واحد.`,
            R`قبل كل عنوان بيتكتب رقمه بالأرقام العربي وبعده نقطة ومسافة. [[counter()]] بتطلّع قيمة العدّاد كنص.`
          ],
          teach: R`## الفكرة في سطرين

[[<li>]] ليه [[display: list-item]]، وده اللي بيخلّي المتصفح يعمل قدامه صندوق صغير للعلامة اسمه **marker**. الدرس عن الصندوق ده: فيه إيه، ومكانه فين، وشكله إيه. والنص التاني عن العدّادات اللي الأرقام دي بتطلع منها.

الأرقام من Chrome 157 على Windows 11.

~~~text القياس من Chrome (من غير CSS)
<ul>   list-style-type: disc      list-style-position: outside     padding-inline-start: 40px     margin: 16px فوق وتحت
<ol>   list-style-type: decimal
<li>   display: list-item         margin: 0
<ul> جوه <ul>:  circle      والمستوى التالت:  square
~~~

---

## ١. [[list-style-type: arabic-indic]]

شكل العلامة. بتتحط على القايمة (وبتتورّث للبنود) أو على بند لوحده.

~~~live 110 154 نفس القايمة بست أشكال
<style>
  ul, ol { display: inline-block; vertical-align: top; margin: 4px 0; padding-inline-start: 34px; width: 105px; }
</style>
<ul style="list-style-type: disc"><li>disc</li><li>بند</li></ul>
<ul style="list-style-type: square"><li>square</li><li>بند</li></ul>
<ul style="list-style-type: '✓ '"><li>نص</li><li>بند</li></ul>
<ol style="list-style-type: decimal"><li>decimal</li><li>بند</li></ol>
<ol style="list-style-type: arabic-indic"><li>arabic-indic</li><li>بند</li></ol>
<ol style="list-style-type: lower-alpha"><li>lower-alpha</li><li>بند</li></ol>
~~~

**هتشوف إيه:** ست قوايم صغيرة: نقطة مليانة، ومربع، وعلامة صح، وأرقام 1 و 2، وأرقام ١ و ٢، وحروف a و b.

| القيمة | العلامة |
|---|---|
| [[disc]] و [[circle]] و [[square]] | نقطة مليانة، ودايرة مفرّغة، ومربع |
| [[decimal]] | 1، 2، 3 |
| [[decimal-leading-zero]] | 01، 02، 03 |
| [[arabic-indic]] | ١، ٢، ٣ |
| [[persian]] | ۱، ۲، ۳ (الأرقام الفارسي: الأربعة والخمسة والستة شكلهم مختلف) |
| [[lower-alpha]] و [[upper-alpha]] | a، b، c و A، B، C |
| [[lower-roman]] و [[upper-roman]] | i، ii، iii و I، II، III |
| [[list-style-type: "✓ "]] | نص من عندك لكل البنود |
| [[none]] | من غير علامة |

كل القيم دي اتأكدنا إن Chrome 157 بيقبلها ([[CSS.supports]])، ومعاها أنظمة لغات كتير ([[hebrew]] و [[georgian]] و [[thai]] و [[devanagari]]...).

**الأرقام في صفحة عربي:** [[<ol>]] في صفحة [[lang="ar"]] بيطلّع 1 و 2 و 3 برضه. المتصفح مبيغيّرش شكل الأرقام حسب اللغة. لو كلام الصفحة مكتوب بأرقام ١٢٣، خلّي القايمة زيه: [[ol { list-style-type: arabic-indic; }]]. ولو الصفحة بتكتب 123 (وده منتشر في المغرب العربي وفي المواقع التقنية)، سيبها [[decimal]]. المهم يبقوا نظام واحد.

[[<ol>]] ولا [[<ul>]] ده قرار **معنى** (الترتيب مهم ولا لأ) مش شكل. متغيّرش [[<ul>]] لأرقام بالـ CSS عشان «شكلها أحلى»: قارئ الشاشة هيفضل يقول «قايمة نقط».

---

## ٢. [[list-style-position: inside]]

العلامة مكانها فين من صندوق البند: برّاه (الافتراضي) ولا جوّاه.

~~~live 94 outside ثم inside
<style>
  ul { width: 250px; margin: 6px 0; }
  li { background: #fef9c3; }
</style>
<ul style="list-style-position: outside"><li>بند طويل شوية عشان نشوف السطر التاني بيبدأ منين لما الكلام يلف</li></ul>
<ul style="list-style-position: inside"><li>بند طويل شوية عشان نشوف السطر التاني بيبدأ منين لما الكلام يلف</li></ul>
~~~

**هتشوف إيه:** الخلفية الصفرا هي صندوق [[<li>]]. في الأولى النقطة **برّه** الأصفر، والسطرين بادئين من نفس الحافة. في التانية النقطة **جوّه** الأصفر، والسطر التاني راجع تحت النقطة نفسها.

~~~text القياس من Chrome (قايمة عرضها 300px: بُعد بداية الكلام عن حافة القايمة)
                          السطر الأول     السطر التاني
outside (الافتراضي)       40px            40px        ← العلامة قاعدة في الـ padding بتاع القايمة
inside                    62px            40px        ← العلامة (22px) بقت أول حاجة في السطر الأول
~~~

[[outside]] أحسن للقراية (الكلام متراص). و [[inside]] بتفيد لما تدّي البند خلفية أو border وعايز العلامة جواه.

### الـ 40px والعلامة اللي بتختفي

مع [[outside]] العلامة بتترسم في الـ [[padding]] اللي المتصفح حاطه للقايمة (40px ناحية البداية). فلو صفّرت الـ padding:

~~~live 64 padding: 0 والعلامة برّه
<style>
  .wrap { border: 2px solid #111; width: 240px; margin-inline-start: 40px; }
  ul { padding: 0; margin: 4px 0; }
</style>
<div class="wrap"><ul><li>بند أول</li><li>بند تاني</li></ul></div>
~~~

**هتشوف إيه:** النقطتين **برّه** الإطار الأسود من ناحية اليمين. لو مكانش فيه مسافة هناك (القايمة لازقة في حافة الصفحة، أو الأب [[overflow: hidden]]) كانوا هيختفوا خالص. دي أشهر «العلامات راحت فين؟».

الحلول: [[padding-inline-start: 1.5em]] بدل الصفر (المسافة اللي إنت عايزها مش الـ 40)، أو [[list-style-position: inside]].

---

## ٣. [[list-style-image]] والمختصرة [[list-style]]

[[list-style-image]] بتحط صورة مكان العلامة:

~~~live 68 صورة مكان النقطة
<style>
  ul { list-style-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Cpath d='M2 7l4 4 6-8' fill='none' stroke='%23059669' stroke-width='2.5'/%3E%3C/svg%3E"); }
</style>
<ul><li>الدفع عند الاستلام</li><li>استرجاع خلال ١٤ يوم</li></ul>
~~~

**هتشوف إيه:** علامة صح خضرا صغيرة قدام كل بند، مرسومة بـ SVG مكتوب جوه الـ CSS نفسه (data URI، درس «img»).

عيبها إنك **متقدرش تتحكم في حجم الصورة ولا مكانها** من الـ CSS: بتترسم بحجمها الأصلي. عشان كده أغلب الناس دلوقتي بتستخدم [[list-style-type: "✓ "]] أو [[::marker]] بدلها. ولو الصورة مش موجودة، المتصفح بيرجع لـ [[list-style-type]].

والمختصرة [[list-style]] بتجمع التلاتة بأي ترتيب:

~~~text القياس من Chrome (المحسوب)
list-style: square inside     →  type: square    position: inside     image: none
list-style: none              →  type: none      (ومفيش علامة)
الافتراضي على <ul>             →  list-style: outside none disc
~~~

### [[list-style: none]] وقارئ الشاشة

قايمة التنقل وقايمة الكروت بيتشال منهم العلامات. MDN بينبّه إن Safari مع VoiceOver **بيبطّل يعتبرها قايمة** لما [[list-style: none]] تتحط عليها (مبيقولش «قايمة من ٥ بنود»). الحل اللي MDN كاتبه: زوّد [[role="list"]] على [[<ul>]] في الـ HTML. (من MDN، متقاسش هنا.) جوه [[<nav>]] المشكلة دي مبتحصلش حسب نفس المرجع.

---

## ٤. المسافات: بين البنود، وقبل القايمة

مفيش خاصية «مسافة البنود». هي نفس [[margin]] و [[padding]] و [[line-height]] على [[<li>]] و [[<ul>]].

~~~live 232 قايمة لازقة وقايمة واخدة راحتها
<style>
  ul { width: 260px; }
  .roomy { padding-inline-start: 1.25em; line-height: 1.4; }
  .roomy li + li { margin-block-start: 0.7em; }
</style>
<ul><li>بند أول طويل شوية بيلف على سطرين عشان نشوف</li><li>بند تاني</li><li>بند تالت</li></ul>
<ul class="roomy"><li>بند أول طويل شوية بيلف على سطرين عشان نشوف</li><li>بند تاني</li><li>بند تالت</li></ul>
~~~

**هتشوف إيه:** في الأولى مفيش فرق بين المسافة بين سطرين في نفس البند والمسافة بين بندين، فمش باين البند بيخلص فين. في التانية السطور جوه البند قريبة من بعض، وبين كل بند والتاني فراغ أوضح، والقايمة أقرب للحافة.

| عايز | الخاصية | على مين |
|---|---|---|
| مسافة بين البنود | [[margin-block-start]] على [[li + li]] (كل بند قبله بند) | [[<li>]] |
| مسافة بين سطور البند الواحد | [[line-height]] | القايمة أو [[body]] |
| بُعد القايمة عن الحافة | [[padding-inline-start]] | [[<ul>]] أو [[<ol>]] |
| مسافة بين العلامة والكلام | [[padding-inline-start]] على [[<li>]]، أو مسافة جوه نص العلامة ([["✓ "]]) | [[<li>]] |
| مسافة فوق وتحت القايمة كلها | [[margin-block]] | [[<ul>]] |

القاعدة البصرية: المسافة **بين** البنود لازم تبقى أكبر من المسافة بين سطور البند الواحد. و [[margin-block-start]] و [[padding-inline-start]] هم الأسامي «المنطقية» لـ [[margin-top]] و [[padding-right]]/[[left]]: بيتبعوا اتجاه الكتابة (شرحهم كامل في درس «logical properties»).

---

## ٥. [[li::marker { color: ... }]]

[[::marker]] هو صندوق العلامة نفسه. بيخلّيك تنسّق النقطة أو الرقم من غير ما تلمس كلام البند.

~~~live 126 علامات ملوّنة ورقم تقيل
<style>
  ol { list-style-type: arabic-indic; }
  ol li::marker { color: #b45309; font-weight: 700; font-size: 1.2em; }
  ul li::marker { content: "← "; color: #0f766e; }
</style>
<ol><li>سخّن الفرن</li><li>اخلط المقادير</li></ol>
<ul><li>بند بسهم</li><li>بند تاني</li></ul>
~~~

**هتشوف إيه:** الأرقام ١ و ٢ بنية وتقيلة وأكبر من الكلام، والكلام نفسه أسود عادي. والقايمة التانية علامتها سهم أخضر.

مش كل الخصائص بتشتغل على [[::marker]]:

~~~text القياس من Chrome (كتبنا 17 خاصية على li::marker)
اشتغلت:      color   font-size   font-weight   font-family   content   letter-spacing
             direction   unicode-bidi   white-space   text-shadow   text-transform
اتجاهلت:     background   padding   margin   border   text-decoration   opacity
~~~

يعني: الخط واللون والنص آه. الصندوق (خلفية وحدود ومسافات) لأ. لو عايز رقم جوه دايرة ملوّنة، [[::marker]] مش هينفع: شيل العلامة ([[list-style: none]]) وارسم رقمك بـ [[::before]] وعدّاد (القسم ٦).

[[content]] على [[::marker]] بتبدّل نص العلامة كله. وممكن تحط فيها رقم البند: كل [[<li>]] بيزوّد عدّاد جاهز اسمه [[list-item]]:

~~~css
ol li::marker { content: "الخطوة " counter(list-item, arabic-indic) ": "; }
~~~

والـ marker الافتراضي عليه [[font-variant-numeric: tabular-nums]] (اتقاس)، عشان الأرقام تتراص تحت بعض.

**فخ [[display]]:** العلامة موجودة عشان [[<li>]] ليه [[display: list-item]]. أول ما تكتب على [[<li>]] حاجة زي [[display: block]] أو [[display: flex]]، العلامة بتختفي ومفيش [[::marker]]. والعكس: أي عنصر تدّيله [[display: list-item]] بيطلعله علامة.

---

## ٦. العدّادات: [[counter-reset]] و [[counter-increment]] و [[counter()]]

أرقام [[<ol>]] مش سحر. وراها **عدّاد**، وتقدر تعمل عدّادات بتاعتك لأي حاجة.

~~~live 94 عناوين بترقّم نفسها
<style>
  .doc { counter-reset: sec; }
  .doc h3 { counter-increment: sec; margin: 6px 0; }
  .doc h3::before { content: counter(sec, arabic-indic) ". "; color: #b45309; }
</style>
<div class="doc">
  <h3>التجهيز</h3>
  <h3>التسطيب</h3>
  <h3>أول تشغيل</h3>
</div>
~~~

**هتشوف إيه:** تلات عناوين قدامهم «١.» و «٢.» و «٣.» بلون بني. الأرقام مش مكتوبة في الـ HTML. لو زوّدت عنوان في النص، كل اللي بعده هيترقّم من جديد لوحده.

تلات خطوات، كل واحدة بخاصية:

| الخطوة | الخاصية | معناها |
|---|---|---|
| ١. اعمل العدّاد | [[counter-reset: sec]] | عدّاد جديد اسمه [[sec]] قيمته 0. ممكن تبدأ من رقم: [[counter-reset: sec 4]] |
| ٢. زوّده | [[counter-increment: sec]] | كل عنصر بيطابق القاعدة بيزوّد 1. ممكن [[counter-increment: sec 2]] أو [[-1]] |
| ٣. اعرضه | [[content: counter(sec)]] | بتتكتب جوه [[content]] بتاعة [[::before]] أو [[::after]] أو [[::marker]] |

و [[counter()]] بتاخد شكل الأرقام كقيمة تانية، بنفس أسامي [[list-style-type]]: [[counter(sec, arabic-indic)]] أو [[counter(sec, upper-roman)]].

### [[counter-set]]

بتحط العدّاد على رقم معين في النص، من غير ما تعمل عدّاد جديد:

~~~text القياس من Chrome (ثماني عناوين ورا بعض، والقيمة اللي اتعرضت لكل واحد)
h2                                  1
h2                                  2
h2 { counter-set: sec 10; }         10     ← اتحط على 10
h2                                  11
h2 { counter-increment: sec 5; }    16     ← زاد 5
h2 { counter-increment: none; }     16     ← مزوّدش
h2 { display: none; }               —      ← العنصر المخفي مبيعدّش
h2                                  17
~~~

الفرق: [[counter-reset]] بتعمل عدّاد **جديد** (ليه نطاق: العنصر وولاده واخواته اللي بعده). [[counter-set]] بتغيّر قيمة عدّاد **موجود**.

سطر [[display: none]] مهم: العنصر المخفي مبيزوّدش العدّاد، فالترقيم بيفضل متصل. ([[visibility: hidden]] بيعدّ.)

### [[counters()]]: ترقيم متفرّع ١.٢.٣

[[counter()]] بتعرض قيمة عدّاد واحد. [[counters()]] (بحرف s) بتعرض **كل المستويات** اللي فوق بعض، وبينهم فاصل:

~~~live 158 قايمة جوه قايمة بترقيم متفرّع
<style>
  .toc, .toc ol { counter-reset: item; list-style: none; padding-inline-start: 1.5em; }
  .toc li { counter-increment: item; }
  .toc li::before { content: counters(item, ".", arabic-indic) " "; color: #b45309; }
</style>
<ol class="toc" role="list">
  <li>المقدمة</li>
  <li>التسطيب
    <ol role="list">
      <li>على Windows</li>
      <li>على Linux
        <ol role="list"><li>Ubuntu</li><li>Fedora</li></ol>
      </li>
    </ol>
  </li>
  <li>الخلاصة</li>
</ol>
~~~

**هتشوف إيه:** «١» و «٢» و «٣» للمستوى الأول، و «٢.١» و «٢.٢» للي جوه التاني، و «٢.٢.١» و «٢.٢.٢» للمستوى التالت. زي فهرس كتاب.

السر إن كل [[<ol>]] بيعمل [[counter-reset: item]]، فبيتعمل عدّاد **بنفس الاسم** جوه العدّاد اللي فوقه. [[counters(item, ".")]] بتمشي على كل العدّادات اللي اسمها [[item]] من برّه لجوّه وتلزقهم بالنقطة.

### عدّاد [[<ol>]] نفسه

[[<ol>]] بيستخدم عدّاد جاهز اسمه [[list-item]]، و attributes الـ HTML بتتحكم فيه: [[start]] بتبدأه من رقم، و [[reversed]] بتعدّ بالعكس، و [[value]] على [[<li>]] بتحطه على رقم (درس «ul و ol»). لو الترقيم جزء من المحتوى (خطوات لازم تتعمل بالترتيب)، استخدم [[<ol>]] الحقيقي: الأرقام بتوصل لقارئ الشاشة وبتتنسخ مع النص. أرقام [[::before]] زينة: مبتتحددش بالماوس ومبتتنسخش.

---

## ٧. [[@counter-style]]: نظام ترقيم من عندك

لو الأشكال الجاهزة مش كفاية، [[@counter-style]] بتعرّف نظام جديد باسم، وتستخدمه في [[list-style-type]] أو [[counter()]].

~~~live 156 تلات أنظمة من عندنا
<style>
  @counter-style abjad {
    system: alphabetic;
    symbols: "أ" "ب" "ج" "د" "هـ" "و" "ز" "ح" "ط" "ي";
    suffix: "- ";
  }
  @counter-style step {
    system: extends arabic-indic;
    prefix: "الخطوة ";
    suffix: ": ";
  }
  @counter-style done {
    system: cyclic;
    symbols: "✓";
    suffix: " ";
  }
  ol, ul { margin: 4px 0; }
  .wide { padding-inline-start: 5.5em; }
</style>
<ol style="list-style-type: abjad"><li>بند</li><li>بند</li><li>بند</li></ol>
<ol class="wide" style="list-style-type: step"><li>افتح الملف</li><li>احفظ</li></ol>
<ul style="list-style-type: done"><li>اتعمل</li><li>اتعمل</li></ul>
~~~

**هتشوف إيه:** الأولى مرقّمة «أ-» و «ب-» و «ج-» (ترقيم أبجد). التانية «الخطوة ١:» و «الخطوة ٢:». التالتة علامة صح قدام كل بند.

| الـ descriptor | معناه |
|---|---|
| [[system]] | طريقة العدّ (الجدول اللي تحت) |
| [[symbols]] | الرموز المستخدمة، بالترتيب |
| [[additive-symbols]] | رموز ليها قيمة (للنظام [[additive]]): [[10 "X", 5 "V", 1 "I"]] |
| [[prefix]] و [[suffix]] | نص قبل وبعد كل علامة. الـ suffix الافتراضي نقطة ومسافة |
| [[pad]] | أقل عدد خانات والحشو: [[pad: 3 "0"]] بتطلّع 001 |
| [[range]] | الأرقام اللي النظام بيغطيها. برّاها بيروح للـ [[fallback]] |
| [[fallback]] | النظام البديل (الافتراضي [[decimal]]) |
| [[negative]] | علامة الأرقام السالبة |
| [[speak-as]] | قارئ الشاشة ينطق العلامة إزاي (مثلًا [[bullets]] أو [[numbers]]) |

| [[system]] | بيعدّ إزاي | مثال |
|---|---|---|
| [[cyclic]] | بيلف على الرموز ويرجع للأول | علامة واحدة لكل البنود، أو نقطة وشرطة بالتبادل |
| [[fixed]] | الرموز مرة واحدة، وبعدها الـ fallback | ①②③ وبعدها 4 |
| [[symbolic]] | بيكرر الرمز: * ثم ** ثم *** | هوامش |
| [[alphabetic]] | زي الحروف: أ، ب... ي، أأ، أب | أبجد |
| [[numeric]] | الرموز هي «أرقام» نظام عدّ | أرقام بلغة جديدة |
| [[additive]] | بيجمع رموز ليها قيم | روماني |
| [[extends]] | خد نظام موجود وغيّر فيه حاجة | [[extends arabic-indic]] مع prefix |

### [[symbols()]]

نسخة سريعة من غير اسم، تتكتب مكان القيمة مباشرة:

~~~css
ul { list-style-type: symbols(cyclic "◆" "◇"); }
~~~

معناها: معيّن مليان، ثم مفرّغ، وهكذا بالتبادل. اتأكدنا إن Chrome 157 بيقبلها ([[CSS.supports]] رجّع true). المنهج مش حاططها Baseline، يعني مش كل المتصفحات، ف [[@counter-style]] باسم أضمن.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[padding: 0]] على القايمة وسايب العلامات | العلامات برّه الصندوق، وبتختفي عند حافة الصفحة |
| [[display: flex]] أو [[block]] على [[<li>]] | العلامة اختفت |
| [[background]] أو [[padding]] على [[::marker]] | اتجاهلوا |
| [[<ul>]] بـ [[list-style-type: decimal]] عشان الشكل | المعنى لسه «قايمة نقط». استخدم [[<ol>]] |
| [[counter-increment]] من غير [[counter-reset]] على أب | كل عنصر بيعمل عدّاد لنفسه: الكل «1» |
| [[counter-reset]] على نفس العنصر اللي بيزوّد | العدّاد بيتصفّر كل مرة: الكل «1» |
| [[counter(sec)]] برّه [[content]] | مبتشتغلش: مكانها [[content]] بس |
| أرقام مهمة معمولة بـ [[::before]] | مبتتنسخش، وممكن متتقريش. الخطوات الحقيقية [[<ol>]] |
| [[list-style: none]] من غير [[role="list"]] | Safari مع VoiceOver مبيقولش إنها قايمة (MDN) |
| أرقام القايمة 1 2 3 وكلام الصفحة ١ ٢ ٣ | نظامين في صفحة واحدة |

---

## الخلاصة

- [[list-style-type]] شكل العلامة: [[arabic-indic]] للأرقام العربي، ونص بين تنصيص لعلامة من عندك، و [[none]] لشيلها.
- [[list-style-position]]: [[outside]] (في الـ padding بتاع القايمة) أو [[inside]].
- العلامة عايشة في [[padding-inline-start]] بتاع القايمة. متصفّروش وإنت سايبها.
- [[::marker]] بينسّق العلامة: خط ولون ونص. مش صندوق.
- المسافات: [[li + li { margin-block-start }]] بين البنود.
- العدّاد: [[counter-reset]] على الأب، و [[counter-increment]] على العنصر، و [[counter()]] جوه [[content]]. و [[counters()]] للترقيم المتفرّع.
- [[@counter-style]] لنظام من عندك: [[system]] و [[symbols]] و [[prefix]] و [[suffix]].`,
          try: R`اعمل [[lists.html]] فيه: قايمة مقادير [[<ul>]] بعلامة «•» ملوّنة، وقايمة خطوات [[<ol>]] بأرقام عربي تقيلة، وقايمة تنقل من غير علامات. ظبّط المسافات: القوايم أقرب للحافة من الـ 40px، وبين كل بند والتاني مسافة أوضح من بين السطور. وبعدين اكتب [[display: flex]] على بنود قايمة المقادير وشوف العلامات.`,
          sol: R`~~~live 443 lists.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قوايم</title>
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; }
  ul, ol { padding-inline-start: 1.5em; }
  li + li { margin-block-start: 0.4em; }
  .items li::marker { color: #b45309; }
  .steps { list-style-type: arabic-indic; }
  .steps li::marker { font-weight: 700; }
  nav ul { list-style: none; padding: 0; }
</style>
</head>
<body>
<nav><ul role="list"><li><a href="#items">المقادير</a></li><li><a href="#steps">الطريقة</a></li></ul></nav>
<h2 id="items">المقادير</h2>
<ul class="items"><li>كوبين دقيق</li><li>كوب لبن</li><li>بيضتين</li></ul>
<h2 id="steps">الطريقة</h2>
<ol class="steps"><li>اخلط الدقيق واللبن لحد ما الخليط ينعم.</li><li>زوّد البيض وقلّب.</li><li>سيبه يرتاح ربع ساعة.</li></ol>
</body>
</html>
~~~

**هتشوف إيه:**

- قايمة التنقل فوق: لينكين تحت بعض من غير نقط ولازقين في الحافة.
- المقادير: نقط بنية والكلام أسود.
- الطريقة: «١.» و «٢.» و «٣.» تقيلة.
- بعد [[.items li { display: flex; }]]: النقط البنية **اختفت**. [[<li>]] مبقاش [[list-item]] فمبقاش ليه marker.

~~~text القياس من Chrome
ul و ol           padding-inline-start: 24px      (1.5em من 16px، بدل 40px)
.steps            list-style-type: arabic-indic
.steps li::marker font-weight: 700
nav ul            list-style-type: none           padding: 0px
~~~`,
          deep: {
            why: R`القوايم في كل صفحة: تنقل، مميزات، خطوات، فهرس، كروت. وشكلها الافتراضي (40px فراغ ونقطة سودا) قليل لما بيناسب التصميم، فأول حاجة أي حد بيعملها إنه «يصفّر» القايمة، ومن هنا بتيجي المشاكل: علامات مختفية، وقوايم فقدت معناها عند قارئ الشاشة. ولصفحة عربي فيه سبب زيادة: الأرقام. القايمة بتطلّع 1 2 3 وكلامك ١ ٢ ٣، وسطر واحد بيوحّدهم. والعدّادات بتشيل عنك ترقيم العناوين والخطوات بإيدك، اللي بيبوظ أول ما تزوّد بند في النص.`,
            how: R`أي عنصر [[display: list-item]] بيتعمله صندوقين: الصندوق الأساسي، وصندوق marker. نص الـ marker بييجي من [[list-style-image]]، ولو مفيش فمن [[list-style-type]] مطبّق على قيمة العدّاد [[list-item]] بتاع العنصر، إلا لو [[::marker]] عليه [[content]]. مع [[outside]] الـ marker بيتحط برّه صندوق المحتوى ناحية البداية (ومبياخدش مكان في الـ layout، فلازم padding يشيله)، ومع [[inside]] بيبقى أول صندوق inline في السطر الأول.

العدّادات بتتحسب والمتصفح ماشي على العناصر بترتيب الـ HTML: عند كل عنصر بينفّذ [[counter-reset]] (عدّاد جديد في نطاق العنصر)، ثم [[counter-increment]]، ثم [[counter-set]]، وبعدها [[counter()]] تقرا القيمة. العدّاد اللي اتعمل على عنصر بيشوفه ولاده واخواته اللي بعده. عشان كده الـ reset بيتحط على الأب.`,
            when: R`[[list-style-type]] و [[::marker]]: أي قايمة محتوى. [[list-style: none]] مع [[role="list"]]: قوايم التنقل والكروت. [[padding-inline-start]]: دايمًا، عشان تتحكم في الـ 40px. العدّادات: ترقيم عناوين مستند، أرقام خطوات ليها تصميم خاص (رقم في دايرة)، ترقيم صور وجداول («شكل ٣»)، فهرس متفرّع. [[@counter-style]]: ترقيم بحروف عربي، أو بادئة ثابتة قبل الرقم.`,
            mistakes: R`تصفير الـ padding والعلامات لسه موجودة. [[display: flex]] على [[<li>]]. خصائص صندوق على [[::marker]]. تغيير نوع القايمة بالـ CSS بدل الـ HTML. [[counter-reset]] في المكان الغلط. والاعتماد على أرقام [[::before]] لمحتوى لازم يتقري ويتنسخ.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** قايمة «اللي اتعمل» في «مدوّنة حبر»: علامة كل بند [["✓ "]] بدل النقطة، ولون العلامة أخضر [[#059669]]، والكلام يفضل أسود. (من قسم ١ و ٥ في الشرح)`, done: R`العلامة «✓» خضرا والكلام أسود، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  ul { }
  li::marker { }
</style>
<ul>
  <li>اخترنا خط المدوّنة</li>
  <li>ظبطنا مسافة السطور</li>
  <li>كتبنا أول مقال</li>
</ul>`, checks: [
              { say: R`علامة القايمة [["✓ "]]`, q: "ul", style: ["list-style-type", "\"✓ \""] },
              { say: R`لون العلامة أخضر [[#059669]]`, q: "li", pseudo: "::marker", style: ["color", "rgb(5, 150, 105)"] },
              { say: R`كلام البنود لسه أسود`, q: "li", style: ["color", "rgb(0, 0, 0)"] }
            ] }, sol: R`~~~live 95 الحل
<style>
  ul { list-style-type: "✓ "; }
  li::marker { color: #059669; }
</style>
<ul>
  <li>اخترنا خط المدوّنة</li>
  <li>ظبطنا مسافة السطور</li>
  <li>كتبنا أول مقال</li>
</ul>
~~~

**هتشوف إيه:** تلات بنود، قدام كل واحد علامة صح خضرا، والكلام أسود.

**ليه كده:** [[list-style-type]] بتاخد نص بين تنصيص (والمسافة اللي جواه هي الفراغ بين العلامة والكلام). و [[::marker]] بيلوّن العلامة لوحدها.

**الغلطة الشائعة:** [[li { color: #059669; }]]. العلامة هتخضرّ، والكلام كله معاها.

~~~text القياس من Chrome
ul           list-style-type: "✓ "
li::marker   color: rgb(5, 150, 105)
li           color: rgb(0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المبرمج كتب [[padding: 0]] على القايمة عشان «يشيل الفراغ الكبير»، فالأرقام بقت برّه الكارت. رجّع للقايمة مسافة [[1.5em]] ناحية البداية بس (مش الـ 40px الافتراضية)، وخلّي الأرقام عربي. (من قسم ١ و ٢ في الشرح)`, done: R`[[padding-inline-start]] بقت 24px والأرقام [[arabic-indic]]، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .card { border: 2px solid #111; width: 250px; margin-inline-start: 36px; padding: 6px; }
  ol { padding: 0; margin: 0; }
</style>
<div class="card">
  <ol>
    <li>افتح الترمنال</li>
    <li>ادخل فولدر المشروع</li>
    <li>شغّل الأمر</li>
  </ol>
</div>`, checks: [
              { say: R`القايمة ليها مسافة 1.5em (24px) ناحية البداية`, q: "ol", style: ["padding-inline-start", "24px"] },
              { say: R`الأرقام عربي: [[arabic-indic]]`, q: "ol", style: ["list-style-type", "arabic-indic"] },
              { say: R`العلامات لسه برّه صندوق البند ([[outside]])`, q: "ol", style: ["list-style-position", "outside"] }
            ] }, sol: R`~~~live 86 بعد التصليح
<style>
  .card { border: 2px solid #111; width: 250px; margin-inline-start: 36px; padding: 6px; }
  ol { padding: 0; padding-inline-start: 1.5em; margin: 0; list-style-type: arabic-indic; }
</style>
<div class="card">
  <ol>
    <li>افتح الترمنال</li>
    <li>ادخل فولدر المشروع</li>
    <li>شغّل الأمر</li>
  </ol>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 86 قبل
<style>
  .card { border: 2px solid #111; width: 250px; margin-inline-start: 36px; padding: 6px; }
  ol { padding: 0; margin: 0; }
</style>
<div class="card">
  <ol>
    <li>افتح الترمنال</li>
    <li>ادخل فولدر المشروع</li>
    <li>شغّل الأمر</li>
  </ol>
</div>
~~~

**هتشوف إيه:** قبل: الأرقام 1 و 2 و 3 راكبة على الإطار الأسود وطالعة برّاه. بعد: «١.» و «٢.» و «٣.» جوه الكارت، والكلام متراص بعدهم.

**ليه:** العلامة مع [[outside]] ملهاش مكان في الـ layout. بتترسم في الـ padding اللي ناحية البداية. صفّرته، فاترسمت برّه.

**حل تاني صح:** [[list-style-position: inside]] وتسيب الـ padding صفر. بس السطر التاني من أي بند طويل هيرجع تحت الرقم.

**الغلطة الشائعة:** [[padding-right: 1.5em]]. هتشتغل في العربي، وفي نسخة إنجليزي الأرقام هتطلع برّه من الشمال. [[padding-inline-start]] بتتبع الاتجاه.

~~~text القياس من Chrome
ol   قبل: padding-inline-start: 0px      list-style-type: decimal
ol   بعد: padding-inline-start: 24px     list-style-type: arabic-indic
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة تنقل الموقع: شيل العلامات والـ padding، وحط مسافة [[8px]] فوق كل بند قبله بند، وزوّد على [[<ul>]] الـ attribute اللي بيخلّي قارئ الشاشة يفضل يعتبرها قايمة. (من قسم ٣ و ٤ في الشرح)`, done: R`القايمة من غير علامات ولا padding، والبند التاني والتالت فوقهم 8px، وعلى [[<ul>]] [[role="list"]]، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  nav ul { }
</style>
<nav aria-label="الرئيسية">
  <ul>
    <li><a href="#home">الرئيسية</a></li>
    <li><a href="#posts">المقالات</a></li>
    <li><a href="#about">عن المدوّنة</a></li>
  </ul>
</nav>`, checks: [
              { say: R`مفيش علامات`, q: "nav ul", style: ["list-style-type", "none"] },
              { say: R`مفيش padding ناحية البداية`, q: "nav ul", style: ["padding-inline-start", "0px"] },
              { say: R`كل بند قبله بند فوقه 8px`, q: "nav li + li", style: ["margin-top", "8px"] },
              { say: R`أول بند من غير مسافة فوقه`, q: "nav li:first-child", style: ["margin-top", "0px"] },
              { say: R`[[<ul>]] عليه [[role="list"]]`, q: "nav ul", attr: ["role", "list"] }
            ] }, sol: R`~~~live 102 الحل
<style>
  nav ul { list-style: none; padding: 0; }
  nav li + li { margin-block-start: 8px; }
</style>
<nav aria-label="الرئيسية">
  <ul role="list">
    <li><a href="#home">الرئيسية</a></li>
    <li><a href="#posts">المقالات</a></li>
    <li><a href="#about">عن المدوّنة</a></li>
  </ul>
</nav>
~~~

**هتشوف إيه:** تلات لينكات تحت بعض، من غير نقط، وبادئين من الحافة، وبينهم فراغ بسيط.

**ليه كده:**

- [[list-style: none]] و [[padding: 0]] مع بعض: شيلنا العلامة **و** مكانها.
- [[li + li]] بتدّي المسافة للبنود اللي ليها أخ قبلها، فالأول مياخدش فراغ فوقه.
- [[role="list"]]: احتياط لـ Safari مع VoiceOver (MDN). جوه [[<nav>]] مش ضروري، وموجوده مبيضرّش.

**الغلطة الشائعة:** [[margin-bottom]] على كل البنود. البند الأخير هيسيب فراغ زيادة تحت القايمة.

~~~text القياس من Chrome
nav ul              list-style-type: none     padding-inline-start: 0px
nav li + li         margin-top: 8px
nav li:first-child  margin-top: 0px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خطوات شرح معمولة عناوين [[<h3>]] جوه [[.guide]]. رقّمهم بعدّاد اسمه [[step]] من غير ما تكتب رقم في الـ HTML: قبل كل عنوان رقمه بالأرقام العربي وبعده [[". "]]. (من قسم ٦ في الشرح)`, done: R`العدّاد متعمل على [[.guide]]، وكل [[h3]] بيزوّده وبيعرضه بـ [[arabic-indic]]، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .guide { }
  .guide h3 { margin: 6px 0; }
  .guide h3::before { }
</style>
<div class="guide">
  <h3>نزّل الملفات</h3>
  <h3>فك الضغط</h3>
  <h3>شغّل البرنامج</h3>
</div>`, checks: [
              { say: R`العدّاد [[step]] متعمل على [[.guide]]`, q: ".guide", style: ["counter-reset", "step 0"] },
              { say: R`كل عنوان بيزوّد [[step]] واحد`, q: ".guide h3", style: ["counter-increment", "step 1"] },
              { say: R`قبل العنوان: الرقم بالعربي وبعده نقطة ومسافة`, q: ".guide h3", pseudo: "::before", style: ["content", "counter(step, arabic-indic) \". \""] },
              { say: R`مفيش أرقام مكتوبة بإيدك في العناوين`, q: ".guide h3", has: "نزّل الملفات" }
            ] }, sol: R`~~~live 94 الحل
<style>
  .guide { counter-reset: step; }
  .guide h3 { margin: 6px 0; counter-increment: step; }
  .guide h3::before { content: counter(step, arabic-indic) ". "; }
</style>
<div class="guide">
  <h3>نزّل الملفات</h3>
  <h3>فك الضغط</h3>
  <h3>شغّل البرنامج</h3>
</div>
~~~

**هتشوف إيه:** «١. نزّل الملفات» و «٢. فك الضغط» و «٣. شغّل البرنامج». انقل عنوان مكان التاني في الكود: الأرقام بتتظبط لوحدها.

**ليه كل سطر في مكانه:**

- [[counter-reset]] على **الأب**: العدّاد بيتعمل مرة عند أول [[.guide]].
- [[counter-increment]] على **العنوان نفسه**: كل عنوان بيزوّد.
- [[counter()]] جوه [[content]] بتاعة [[::before]]: المكان الوحيد اللي بتشتغل فيه.

**الغلطة الشائعة:** [[counter-reset: step]] على [[h3]] نفسه. كل عنوان هيصفّر العدّاد ويزوّده واحد، فالتلاتة هيطلعوا «١».

~~~text القياس من Chrome
.guide              counter-reset: step 0
.guide h3           counter-increment: step 1
.guide h3::before   content: counter(step, arabic-indic) ". "
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** عرّف نظام ترقيم اسمه [[abjad]] بـ [[@counter-style]]: النظام [[alphabetic]]، والرموز «أ» «ب» «ج» «د»، وبعد كل علامة [[") "]]. واستخدمه على قايمة اختيارات سؤال. (من قسم ٧ في الشرح)`, done: R`القايمة [[list-style-type: abjad]] والتعريف فيه [[system]] و [[symbols]] و [[suffix]]، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  /* عرّف abjad هنا */

  ol { }
</style>
<p>أنهي خاصية بتغيّر شكل علامة القايمة؟</p>
<ol>
  <li>list-style-position</li>
  <li>list-style-type</li>
  <li>text-indent</li>
</ol>`, checks: [
              { say: R`القايمة بتستخدم النظام [[abjad]]`, q: "ol", style: ["list-style-type", "abjad"] },
              { say: R`فيه تعريف [[@counter-style abjad]]`, src: "@counter-style abjad" },
              { say: R`النظام [[alphabetic]]`, src: "system: alphabetic" },
              { say: R`الـ suffix قوس ومسافة`, src: "suffix: \") \"" }
            ] }, sol: R`~~~live 120 الحل
<style>
  @counter-style abjad {
    system: alphabetic;
    symbols: "أ" "ب" "ج" "د";
    suffix: ") ";
  }
  ol { list-style-type: abjad; }
</style>
<p>أنهي خاصية بتغيّر شكل علامة القايمة؟</p>
<ol>
  <li>list-style-position</li>
  <li>list-style-type</li>
  <li>text-indent</li>
</ol>
~~~

**هتشوف إيه:** الاختيارات قدامها «أ)» و «ب)» و «ج)» بدل 1 و 2 و 3.

**ليه كده:**

- [[alphabetic]]: بيعدّ بالرموز زي الحروف. بعد «د» (البند الخامس) هيكتب «أأ» ثم «أب».
- [[suffix]]: بدّلنا النقطة الافتراضية بقوس.
- الاسم [[abjad]] من غير تنصيص في المكانين، زي أي اسم في CSS.

**الغلطة الشائعة:** [[system: cyclic]]. البند الخامس هيرجع «أ» تاني بدل «أأ»، فاختيارين بنفس الحرف.

**وليه [[<ol>]]؟** الاختيارات ليها ترتيب وأسامي («الإجابة ب»). قارئ الشاشة هيقول إنها قايمة مرقّمة من ٣ بنود.

~~~text القياس من Chrome
ol   list-style-type: abjad
CSS.supports("list-style-type", "abjad")   true
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك عمل خطوات تسطيب برنامج بـ [[<div>]] لكل خطوة، ورقّمهم بعدّاد CSS و [[::before]]. الشكل تمام. اكتبله ٣ أسباب إن [[<ol>]] أحسن هنا، وحالة واحدة العدّاد فيها هو الاختيار الصح. (من قسم ٦ في الشرح: «عدّاد ol نفسه»)`, done: R`ذكرت قارئ الشاشة، والنسخ، وإن الأرقام محتوى مش زينة، وحالة للعدّاد زي ترقيم العناوين.`, sol: R`**إجابة نموذجية:**

**ليه [[<ol>]]:**

1. **المعنى.** قارئ الشاشة بيقول «قايمة مرقّمة من ٥ بنود» وبيعلن رقم كل بند. الـ [[<div>]] بيتقري كفقرات ورا بعض.
2. **النسخ.** لما المستخدم ينسخ الخطوات، أرقام [[<ol>]] بتتنسخ معاها. أرقام [[::before]] مبتتحددش ومبتتنسخش.
3. **من غير CSS.** لو ملف الـ CSS منزلش، [[<ol>]] لسه مرقّمة. والـ [[<div>]] بقوا فقرات من غير أي ترتيب باين.

وكمان [[start]] و [[reversed]] و [[value]] جاهزين في الـ HTML.

**وتقدر تاخد الاتنين:** [[<ol>]] حقيقي، وتنسّق رقمه بـ [[::marker]]، أو تشيل العلامة وترسم رقمك بـ [[counter(list-item)]] جوه [[::before]] لو عايز رقم في دايرة.

**إمتى العدّاد هو الصح:** لما الحاجة اللي بتترقّم **مش قايمة**: عناوين أقسام مستند («١. المقدمة» و «٢. التسطيب»)، أو «شكل ٣» تحت كل صورة، أو أرقام سطور كود. دول عناصر متفرقة في الصفحة مينفعش يتلمّوا في [[<ol>]].

| | [[<ol>]] | عدّاد + [[::before]] |
|---|---|---|
| قارئ الشاشة | بيعلن القايمة والأرقام | حسب المتصفح والقارئ |
| النسخ | الأرقام بتتنسخ | لأ |
| من غير CSS | مرقّمة | مش مرقّمة |
| أي عنصر في أي مكان | لأ | أيوه |` }
          ]
        },
        {
          cmd: ":link و :visited و :hover",
          title: "تنسيق اللينك في حالاته الخمسة من غير ما يبطّل يبان إنه لينك",
          pre: [
            { to: "css/selectors", why: R`الـ pseudo-classes ([[a:hover]] و [[button:focus-visible]]) بدأت هناك، وهنا بنكمّل حالات اللينك كلها` },
            { to: "css/text-decoration و text-shadow", why: R`الخط اللي تحت اللينك بيتظبط بالخصائص اللي اتشرحت هناك` }
          ],
          ref: [
            { t: "MDN: :link", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:link" },
            { t: "MDN: :visited", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:visited" },
            { t: "MDN: Privacy and the :visited selector", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Privacy_and_:visited" },
            { t: "MDN: :hover", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:hover" },
            { t: "MDN: :active", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active" },
            { t: "MDN: :any-link", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:any-link" },
            { t: "WHATWG: Rendering, phrasing content (ألوان اللينك الافتراضية)", url: "https://html.spec.whatwg.org/multipage/rendering.html#phrasing-content-3" },
            { t: "MDN Curriculum: Styling lists and links", url: "https://developer.mozilla.org/en-US/curriculum/core/css-text-styling/" }
          ],
          desc: R`اللينك ليه خمس حالات، وكل واحدة ليها pseudo-class: [[:link]] (لسه متزارش)، و [[:visited]] (اتزار)، و [[:hover]] (الماوس عليه)، و [[:focus]] (عليه التركيز بالكيبورد)، و [[:active]] (بيتداس دلوقتي).
والتنسيق الافتراضي (أزرق وتحته خط، وبنفسجي لما يتزار) شكله قديم، بس كل الناس عارفاه. الدرس بيوريك تغيّره من غير ما الزائر يحتار «هو ده لينك ولا لأ؟».`,
          example: R`a:link { color: #0b57d0; }
a:visited { color: #6d28d9; }
a:hover { text-decoration-thickness: 3px; }
a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }
a:active { color: #b91c1c; }
nav a:any-link { text-decoration: none; }
a[href^="https://"]::after { content: " ↗"; }`,
          flag: "script",
          lines: [
            R`اللينك اللي الزائر لسه مفتحوش: أزرق من اختيارنا. [[:link]] بتمسك [[<a>]] اللي ليه [[href]] ومتزارش.`,
            R`اللينك اللي اتزار قبل كده: بنفسجي. المتصفح بيسمح بتغيير الألوان بس في الحالة دي.`,
            R`لما الماوس يقف على اللينك، الخط اللي تحته يتخن. تغيير واضح من غير ما حاجة تتحرك من مكانها.`,
            R`لما اللينك ياخد التركيز بالكيبورد (Tab): إطار أزرق حواليه وبعيد عنه 2px. [[:focus-visible]] مبتظهرش مع ضغطة الماوس.`,
            R`في اللحظة اللي اللينك بيتداس فيها: أحمر. بتبان ثانية وتختفي، وبتأكد للزائر إن ضغطته اتحسبت.`,
            R`لينكات قايمة التنقل من غير خط، سواء اتزاروا أو لأ. [[:any-link]] معناها [[:link]] أو [[:visited]].`,
            R`أي لينك عنوانه بيبدأ بـ [[https://]] (يعني رايح لموقع تاني) بيتحط بعده سهم صغير. ده attribute selector من درس «selectors».`
          ],
          teach: R`## الفكرة في سطرين

[[<a href>]] هو العنصر الوحيد اللي المتصفح بيغيّر شكله حسب **تاريخ الزائر** (زاره ولا لأ) وحسب **اللي بيعمله دلوقتي** (واقف عليه، بيدوس). كل حالة ليها اسم، وتقدر تنسّقها.

الأرقام من Chrome 157 على Windows 11. شكل اللينك «اللي اتزار» متقاسش هنا (المتصفح الـ headless مبيحفظش تاريخ زيارات)، وكل اللي عنه من MDN ومواصفة HTML.

---

## ١. الشكل الافتراضي، وليه مهم

~~~live 50 68 لينك من غير أي CSS
<p>اقرا <a href="#guide">دليل البداية</a> قبل ما تسطّب، أو شوف <a>كلمة جوه a من غير href</a>.</p>
~~~

**هتشوف إيه:** «دليل البداية» أزرق وتحته خط، والماوس بيبقى إيد لما تقف عليه. «كلمة جوه a من غير href» شكلها زي باقي الكلام بالظبط.

~~~text القياس من Chrome (من غير CSS)
<a href="...">    color: rgb(0, 0, 238)    text-decoration: underline    cursor: pointer     :link ✓
<a> من غير href   color: rgb(0, 0, 0)      text-decoration: none         cursor: auto        :link ✗
لينك عليه focus    outline: auto 1px        outline-offset: 1px
~~~

ومن مواصفة HTML (قسم Rendering): اللينك اللي اتزار [[#551A8B]] (بنفسجي)، واللي بيتداس [[#FF0000]] (أحمر).

الألوان دي عمرها من عمر الويب. والنتيجة إن **كل مستخدم إنترنت في الدنيا** اتعلم قاعدة واحدة من غير ما حد يشرحها له: **كلام أزرق تحته خط = بيتداس**. وبنفسجي = «أنا كنت هنا».

ده اللي MDN Curriculum بيسميه أهمية التنسيق الافتراضي: المألوف بيخلّي الناس تتعرّف على اللينك من غير تفكير. وده معناه:

- لو شيلت الخط **واللون**، الزائر مش هيعرف إن فيه لينك.
- لو حطيت خط تحت كلام **مش لينك**، الزائر هيدوس عليه ويفتكر الموقع بايظ.
- لو خلّيت اللينك اللي اتزار زي اللي متزارش، الزائر في صفحة فيها 30 لينك هيفتح نفس الصفحات مرتين.

غيّر الدرجة والتُخن والشكل زي ما تحب. متغيّرش **اللغة**: حاجة تميّزه عن الكلام (ومش اللون لوحده)، وحاجة تتغيّر لما تقف عليه.

---

## ٢. الحالات الخمسة

| الحالة | الـ selector | بتحصل إمتى |
|---|---|---|
| متزارش | [[a:link]] | [[<a>]] ليه [[href]] والعنوان مش في تاريخ المتصفح |
| اتزار | [[a:visited]] | [[<a>]] ليه [[href]] والعنوان اتفتح قبل كده |
| الماوس عليه | [[a:hover]] | المؤشر واقف فوق العنصر |
| عليه التركيز | [[a:focus]] و [[a:focus-visible]] | وصلتله بـ Tab أو دوست عليه |
| بيتداس | [[a:active]] | من لحظة الضغط لحد ما تسيب |

أول اتنين بيلغوا بعض: اللينك يا [[:link]] يا [[:visited]]. التلاتة التانيين «حالات لحظية» ممكن ييجوا فوق أي واحدة منهم، ومع بعض (لينك اتزار، والماوس عليه، وبيتداس).

~~~live 63 جرّب: قف بالماوس، ودوس Tab، ودوس واستنى
<style>
  a:link { color: #0b57d0; }
  a:visited { color: #6d28d9; }
  a:hover { background: #dbeafe; }
  a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
  a:active { color: #b91c1c; }
  p { font-size: 20px; }
</style>
<p><a href="#one">لينك أول</a> · <a href="#two">لينك تاني</a> · <a href="#three">لينك تالت</a></p>
~~~

**هتشوف إيه:**

- واقف بالماوس على لينك: خلفية أزرق فاتح وراه.
- دوس جوه المعاينة وبعدين Tab: إطار برتقالي بيتنقل من لينك للتاني.
- دوس على لينك وخلّي صباعك دايس: الكلام أحمر لحد ما تسيب.
- بعد ما تدوس على لينك مرة، ممكن يبقى بنفسجي (اتزار). ده بيعتمد على المتصفح وتاريخه.

---

## ٣. [[a:link]] ولا [[a]] ولا [[a:any-link]]؟

| الـ selector | بيمسك |
|---|---|
| [[a]] | كل [[<a>]]، حتى اللي من غير [[href]] (اللي مش لينك أصلًا) |
| [[a:link]] | اللي ليه [[href]] ومتزارش بس |
| [[a:visited]] | اللي ليه [[href]] واتزار |
| [[a:any-link]] | اللي ليه [[href]]، اتزار أو لأ. يعني [[:link]] و [[:visited]] مع بعض |

~~~text القياس من Chrome (element.matches)
                         :link     :any-link
<a href="https://...">   true      true
<a href="#x">            true      true
<a> من غير href          false     false
~~~

في الشغل:

- خصائص مشتركة لكل اللينكات (الخط، التُخن): على [[a]] أو [[a:any-link]].
- لون مختلف للي اتزار: [[a:link]] و [[a:visited]].
- [[a]] من غير [[href]] بيتستخدم كـ «مكان لينك مقفول» (مثلًا الصفحة الحالية في القايمة). لو نسّقت [[a]] بلون أزرق، هيبان لينك وهو مبيتداسش. [[a:any-link]] بتتجنب ده.

والـ specificity: [[a:link]] فيها عنصر و pseudo-class، يعني (0,1,1)، أعلى من [[a]] لوحدها (0,0,1). فلو كتبت [[a { color: red }]] ولقيت اللون مبيتغيّرش، غالبًا فيه [[a:link]] في حتة تانية كسبانة (درس «specificity»).

---

## ٤. [[a:visited]] وحدود الخصوصية

[[:visited]] الحالة الوحيدة اللي المتصفح بيقيّدها. السبب: لو صفحة تقدر تعرف أنهي لينكات إنت زرتها، تقدر تعرف **تاريخ تصفّحك**: بتحط ألف لينك مخفي لمواقع بنوك ومستشفيات وتشوف مين فيهم بنفسجي.

عشان كده (من MDN):

**الخصائص المسموحة جوه [[:visited]] ألوان بس:**

| مسموح | ممنوع (بيتجاهل) |
|---|---|
| [[color]] و [[background-color]] | [[font-size]] و [[font-weight]] وأي خاصية خط |
| [[border-color]] وأطرافها الأربعة و [[outline-color]] | [[background-image]] و [[display]] وأي خاصية بتغيّر الـ layout |
| [[text-decoration-color]] و [[text-emphasis-color]] | [[text-decoration-line]] (تشيل أو تحط خط) |
| [[column-rule-color]]، و [[fill]] و [[stroke]] في SVG | [[content]] بتاعة [[::after]]، وأي حاجة بتغيّر مقاس |

يعني مينفعش تحط علامة «✓» بعد اللينك اللي اتزار، ولا تخلّيه أصغر. لون وبس.

**وكمان:**

- **الشفافية بتتجاهل.** لو لون [[:link]] من غير شفافية، مينفعش [[:visited]] يبقى شفاف. فمتقدرش «تخفي» اللينك اللي اتزار.
- **JavaScript بيتكدّب عليه.** [[getComputedStyle]] بيرجّع دايمًا لون الحالة **اللي متزارتش**، حتى لو اللينك قدامك بنفسجي. و [[querySelector(":visited")]] بيرجّع فاضي دايمًا.
- عشان لون يتغيّر في [[:visited]] لازم يبقى له قيمة في الحالة العادية. [[background-color]] اللي مش متحددة أصلًا (شفافة) مش هتتلوّن في [[:visited]].

~~~text القياس من Chrome (صفحة فيها a:visited { color: red; font-size: 40px; })
getComputedStyle(a).color        →  لون a:link          (مش الأحمر)
getComputedStyle(a).fontSize     →  الحجم العادي        (font-size جوه :visited اتجاهلت)
document.querySelectorAll(":visited").length   →  0
~~~

(القياس ده على لينكات متزارتش، لأن الـ headless ملوش تاريخ. اللي MDN بيقوله إن الأرقام دي بتفضل زي ما هي حتى لو اللينك اتزار.)

ووثائق Chrome بتقول إن المتصفح بقى «بيقسّم» تاريخ الزيارات: اللينك بيتلوّن إنه اتزار بس لو اتداس عليه **من نفس الموقع** قبل كده، مش لمجرد إن العنوان اتفتح من أي مكان. (من وثائق Chrome، متقاسش هنا.)

**العملي:** ادّي [[:visited]] لون مختلف واضح عن [[:link]]، ومن نفس «عيلة» اللون (أزرق ← بنفسجي) عشان الاتنين يفضلوا باينين إنهم لينكات. ده كل اللي تقدر عليه، وكفاية.

---

## ٥. [[a:hover]]

بتتفعّل طول ما المؤشر فوق العنصر. بتشتغل على **أي عنصر**، مش اللينكات بس ([[tr:hover]] و [[.card:hover]]).

اللي يتغيّر في الـ hover لازم يبقى:

- **واضح** من غير ما يعتمد على لون بس: خط يتخن أو يظهر، خلفية، مش درجة أزرق أغمق شوية.
- **مبيحرّكش حاجة.** لو الـ hover بيغيّر [[font-weight]] أو [[font-size]] أو بيزوّد border، عرض اللينك بيتغيّر والكلام اللي حواليه بيتزق، والصفحة «بترعش» تحت الماوس.

~~~live 96 138 hover بيزق الكلام وhover ثابت
<style>
  p { font-size: 18px; }
  .bad a:hover { font-weight: 700; }
  .good a:hover { text-decoration-thickness: 3px; background: #fef9c3; }
</style>
<p class="bad">جرّب تقف على <a href="#x">اللينك ده اللي بيتقل</a> وبص على الكلام اللي بعده.</p>
<p class="good">وبعدين على <a href="#y">اللينك ده اللي خطه بيتخن</a> وبص على الكلام اللي بعده.</p>
~~~

**هتشوف إيه:** في السطر الأول الكلام اللي بعد اللينك بيتحرك شمال لما تقف، ويرجع لما تمشي. في التاني مفيش حاجة بتتحرك: الخط والخلفية رسم بس.

**الموبايل ملوش hover.** مفيش مؤشر. المتصفحات بتقلّد: بعد ما تلمس عنصر، [[:hover]] بتفضل «لازقة» عليه لحد ما تلمس حاجة تانية. فأي معلومة أو زرار بيظهروا في الـ hover **بس** مش موجودين لمستخدم الموبايل ولا لمستخدم الكيبورد. القاعدة: [[:hover]] تحسين للشكل، مش مكان لمحتوى. ولو عايز تنسيق hover للأجهزة اللي ليها ماوس بس: [[@media (hover: hover)]] (درس «media queries»).

وأي حاجة بتتكتب لـ [[:hover]] اكتبها لـ [[:focus-visible]] كمان، عشان مستخدم الكيبورد ياخد نفس الإشارة.

---

## ٦. [[a:focus]] و [[a:focus-visible]]

التركيز (focus) هو «العنصر اللي الكيبورد هيتعامل معاه لو دوست Enter». بيتنقل بـ Tab.

- [[:focus]]: العنصر عليه التركيز بأي طريقة (كيبورد أو ضغطة ماوس).
- [[:focus-visible]]: عليه التركيز **والمتصفح شايف إن المستخدم محتاج يشوفه** (يعني وصله بالكيبورد). مع ضغطة الماوس على لينك مبتتفعّلش.

~~~text القياس من Chrome (لينك عليه focus من غير CSS)
outline: rgb(16, 16, 16) auto 1px      outline-offset: 1px      :focus ✓    :focus-visible ✓
~~~

الإطار ده هو الطريقة الوحيدة اللي مستخدم الكيبورد بيعرف بيها هو فين في الصفحة. **متكتبش [[outline: none]] من غير بديل.** لو شكل الإطار الافتراضي مش عاجبك، بدّله بواحد أوضح:

~~~css
a:focus-visible {
  outline: 2px solid #0b57d0;
  outline-offset: 2px;
}
~~~

الدرس الكامل («focus-visible» في وحدة «Accessibility») فيه الأرقام المطلوبة للتباين والتُخن ولينك التخطي. هنا يكفي إنك متشيلوش.

---

## ٧. [[a:active]]

من لحظة ما زرار الماوس ينزل (أو الصباع يلمس) لحد ما يتساب. عمرها جزء من ثانية، وبتدّي الزائر تأكيد: «ضغطتك وصلت».

الافتراضي أحمر. ممكن تسيبه، أو تخلّيه درجة أغمق من لون اللينك. وزي [[:hover]] بتشتغل على أي عنصر ([[button:active]]).

---

## ٨. الترتيب: L-V-H-A

الحالات الخمسة كلهم نفس الـ specificity (عنصر + pseudo-class). ولما قاعدتين بنفس القوة ينطبقوا مع بعض، **اللي مكتوبة بعد التانية بتكسب** (درس «cascade»). ولينك واحد ممكن يبقى [[:visited]] و [[:hover]] و [[:active]] في نفس اللحظة.

~~~css
a:link    { color: #0b57d0; }    /* L */
a:visited { color: #6d28d9; }    /* V */
a:hover   { color: #1e40af; }    /* H */
a:active  { color: #b91c1c; }    /* A */
~~~

- [[:hover]] بعد [[:visited]]: عشان لون الـ hover يبان على اللينك اللي اتزار كمان.
- [[:active]] بعد [[:hover]]: وإنت بتدوس، الماوس لسه فوق اللينك، فالاتنين شغالين. الأخير يكسب.

لو قلبتهم:

~~~text اللي بيحصل لو a:hover اتكتبت قبل a:visited (من قواعد الـ cascade)
لينك متزارش + الماوس عليه:    hover كسبانة ✓     (visited مش منطبقة أصلًا)
لينك اتزار  + الماوس عليه:    visited كسبانة ✗   (مكتوبة بعدها): لون الـ hover مبيظهرش
~~~

الغلطة دي مبتبانش وإنت بتجرّب، لأن لينكاتك لسه متزارتش. بتبان عند المستخدم اللي زار.

طريقة الحفظ المشهورة: **L**o**V**e **HA**te. و [[:focus-visible]] بتتحط بين الـ hover والـ active، أو بعدهم لو بتغيّر خصائص مختلفة (outline) مبتتعارضش مع الألوان.

---

## ٩. لينك جوه فقرة غير لينك في قايمة

**جوه الفقرة:** اللينك وسط كلام عادي، فلازم يتميّز عنه. اللون لوحده مش كفاية: ناس كتير مبتفرّقش بين الأزرق والأسود (عمى الألوان، شاشة في الشمس). قاعدة WCAG إن المعلومة متوصلش باللون بس. فلينك الفقرة **يفضل تحته خط**. جمّل الخط (درس «text-decoration و text-shadow»)، متشيلوش.

**في قايمة التنقل والأزرار والكروت:** المكان نفسه بيقول إنها لينكات (شريط فوق، قايمة في الجنب). هنا الخط ممكن يتشال، ويرجع أو يتبدّل بخلفية في الـ hover والـ focus.

~~~live 98 126 قايمة تنقل من غير خط، وفقرة لينكاتها بخط
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.8; }
  nav a:any-link { text-decoration: none; color: #111; padding: 4px 8px; }
  nav a:hover, nav a:focus-visible { background: #e5e7eb; }
  main a:link { color: #0b57d0; }
  main a:visited { color: #6d28d9; }
  main a { text-decoration-thickness: 1px; text-underline-offset: 0.3em; }
  main a:hover { text-decoration-thickness: 3px; }
</style>
<nav><a href="#home">الرئيسية</a> <a href="#posts">المقالات</a> <a href="#about">عن المدوّنة</a></nav>
<main><p>المقال ده تكملة لـ <a href="#part1">الجزء الأول</a>، وفيه إشارة لـ <a href="#tools">صفحة الأدوات</a>.</p></main>
~~~

**هتشوف إيه:** فوق: تلات لينكات سودا من غير خط، وكل واحد بياخد خلفية رمادي لما تقف عليه. تحت: لينكين أزرق تحتهم خط رفيع نازل عن الحروف، والخط بيتخن لما تقف.

---

## ١٠. علامة لنوع اللينك بالـ attribute selector

الـ attribute selectors (درس «selectors») بتخلّيك تميّز أنواع اللينكات من عنوانها، من غير class:

| الـ selector | بيمسك |
|---|---|
| [[a[href^="https://"]]] | العنوان **بيبدأ** بـ https: لينك لموقع تاني (لو لينكاتك الداخلية نسبية) |
| [[a[href$=".pdf"]]] | العنوان **بينتهي** بـ .pdf: ملف |
| [[a[href^="mailto:"]]] | لينك بيفتح برنامج الإيميل |
| [[a[target="_blank"]]] | بيفتح في تبويب جديد |
| [[a[download]]] | لينك بينزّل ملف على الجهاز |

~~~live 60 سهم بعد اللينك الخارجي وكلمة بعد الـ PDF
<style>
  a[href^="https://"]::after { content: " ↗"; }
  a[href$=".pdf"]::after { content: " (PDF)"; font-size: 0.8em; }
  p { font-size: 18px; }
</style>
<p><a href="about.html">عن المدوّنة</a> · <a href="https://example.test/docs">الوثائق الرسمية</a> · <a href="files/guide.pdf">دليل الاستخدام</a></p>
~~~

**هتشوف إيه:** اللينك الأول عادي. التاني بعده سهم مايل. التالت بعده «(PDF)» بخط أصغر. مكتبناش class على ولا واحد.

الزائر بيعرف قبل ما يدوس إنه هيخرج من الموقع أو هينزّل ملف (درس «target و rel» و «download و نص اللينك» بيشرحوا ليه ده مهم). خلّي بالك إن نص [[::after]] زينة: ممكن ميتقريش لقارئ الشاشة. المعلومة المهمة فعلًا («يفتح في تبويب جديد») تتكتب في نص اللينك.

---

## ١١. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[a { text-decoration: none; color: inherit; }]] على الموقع كله | لينكات الفقرات اختفت وسط الكلام |
| [[:visited]] بنفس لون [[:link]] | الزائر مبيعرفش هو فتح إيه |
| [[font-weight]] أو [[content]] جوه [[:visited]] | بيتجاهلوا: ألوان بس |
| [[a:hover]] قبل [[a:visited]] | الـ hover مبيشتغلش على اللي اتزار |
| [[a:hover { font-weight: bold }]] | الكلام بيتزق تحت الماوس |
| [[outline: none]] على [[:focus]] | مستخدم الكيبورد تايه |
| معلومة أو زرار في [[:hover]] بس | مش موجودين على الموبايل ولا بالكيبورد |
| تنسيق [[a]] بدل [[a:any-link]] | [[<a>]] من غير [[href]] بيبان لينك |
| خط تحت كلام مش لينك | الناس بتدوس عليه |
| اللون لوحده هو الفرق بين اللينك والكلام | اللي مبيفرّقش الألوان مش شايف اللينك |

---

## الخلاصة

- خمس حالات: [[:link]] و [[:visited]] و [[:hover]] و [[:focus-visible]] و [[:active]]. والترتيب في الملف L-V-H-A.
- الشكل الافتراضي لغة الكل عارفها: غيّر الدرجة، ومتشيلش التمييز.
- [[:visited]] ألوان بس، و JavaScript ميعرفش يقراها. ده لحماية تاريخ التصفّح.
- [[:hover]] تحسين: واضح، ومبيحرّكش حاجة، ومعاه [[:focus-visible]].
- لينك الفقرة تحته خط. لينك القايمة ممكن من غيره.
- [[a:any-link]] للينكات الحقيقية، و attribute selectors لتمييز نوع اللينك.`,
          try: R`اعمل [[links.html]] فيه قايمة تنقل من تلات لينكات، وفقرة فيها لينكين (واحد داخلي وواحد لموقع تاني). اكتب الحالات الخمسة بالترتيب الصح للينكات الفقرة، وشيل الخط من لينكات القايمة وادّيهم خلفية في الـ hover. وبعدين افتح DevTools، واختار لينك في Elements، ودوس على [[:hov]] في تبويب Styles وعلّم على [[:visited]] و [[:hover]] مع بعض: أنهي لون كسب؟`,
          sol: R`~~~live 109 141 links.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اللينكات</title>
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; font-size: 18px; line-height: 1.8; }
  nav a:any-link { text-decoration: none; color: #111; padding: 4px 8px; }
  nav a:hover, nav a:focus-visible { background: #e5e7eb; }
  p a { text-underline-offset: 0.3em; }
  p a:link { color: #0b57d0; }
  p a:visited { color: #6d28d9; }
  p a:hover { color: #1e40af; text-decoration-thickness: 3px; }
  p a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }
  p a:active { color: #b91c1c; }
  a[href^="https://"]::after { content: " ↗"; }
</style>
</head>
<body>
<nav><a href="#home">الرئيسية</a> <a href="#posts">المقالات</a> <a href="#about">عن المدوّنة</a></nav>
<p>ابدأ من <a href="#first">أول مقال</a>، ولو عايز المرجع الرسمي ده <a href="https://example.test/css">دليل CSS</a>.</p>
</body>
</html>
~~~

**هتشوف إيه:**

- القايمة: تلات لينكات سودا من غير خط، وخلفية رمادي تحت الماوس.
- الفقرة: لينكين أزرق بخط نازل، والتاني بعده سهم.
- في DevTools مع [[:visited]] و [[:hover]] مع بعض: اللون [[#1e40af]] (بتاع الـ hover) هو اللي كسب، وفي Styles قاعدة [[:visited]] لونها متشطّب عليه.

~~~text القياس من Chrome (الحالة العادية)
nav a       color: rgb(17, 17, 17)       text-decoration-line: none
p a         color: rgb(11, 87, 208)      text-decoration-line: underline     text-underline-offset: 5.4px
p a[href^="https://"]::after   content: " ↗"
~~~

الـ hover كسب عشان مكتوب **بعد** الـ visited، والاتنين بنفس القوة. انقل سطر [[p a:hover]] فوق [[p a:visited]] وجرّب تاني: البنفسجي هيكسب، ولون الـ hover مش هيظهر على اللينك اللي اتزار.`,
          deep: {
            why: R`اللينك هو اللي بيخلّي الويب «ويب». وكل زائر بيدوّر عليه بعينه قبل ما يقرا. لما مصمم يشيل الخط ويخلّي اللينك «درجة رمادي أغمق» عشان الصفحة تبقى هادية، الزائر بيبطّل يلاقي اللي يدوس عليه، واللي مبيفرّقش الألوان مبيلاقيش حاجة خالص. والحالات الخمسة مش زينة: كل واحدة بتجاوب سؤال عند الزائر. أروح فين؟ ([[:link]]) كنت فين؟ ([[:visited]]) ده بيتداس؟ ([[:hover]]) أنا فين دلوقتي؟ ([[:focus]]) ضغطتي وصلت؟ ([[:active]]).`,
            how: R`المتصفح بيعتبر [[<a>]] و [[<area>]] اللي ليهم [[href]] «لينكات»، وكل لينك بياخد واحدة من [[:link]] أو [[:visited]] بعد ما يسأل تاريخ الزيارات عن العنوان. الحالات اللحظية بتتحدّث مع أحداث الماوس والكيبورد: [[:hover]] على العنصر اللي تحت المؤشر وكل آبائه، و [[:active]] من الضغط للإفلات، و [[:focus]] على العنصر اللي معاه التركيز.

لحماية الخصوصية المتصفح بيحسب ستايلين لكل لينك: واحد «كأنه متزارش» وده اللي بيتحسب منه الـ layout واللي JavaScript بيشوفه، وواحد للحالة الحقيقية بياخد منه **الألوان بس** وقت الرسم. عشان كده أي خاصية غير لون في [[:visited]] ملهاش أثر، وعشان كده مفيش توقيت ولا مقاس يفضح الحالة.

والخمس selectors كلهم (0,1,1)، فاللي بيحسم بينهم ترتيب الكتابة.`,
            when: R`في كل موقع: قاعدة أساسية للينكات المحتوى بالحالات الخمسة، وقاعدة للينكات التنقل. [[:visited]] مهمة في صفحات فيها لينكات كتير (نتايج بحث، فهرس، مدوّنة). attribute selectors لتمييز الخارجي والملفات. و [[:hover]] و [[:active]] و [[:focus-visible]] بنفس الفكرة على الأزرار والكروت.`,
            mistakes: R`شيل الخط واللون مع بعض. [[:visited]] زي [[:link]]. خصائص غير الألوان في [[:visited]]. ترتيب غلط. hover بيحرّك الـ layout. [[outline: none]]. محتوى في الـ hover بس. والاعتماد على اللون لوحده.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** لينكات مقال «مدوّنة حبر»: اللي متزارش [[#0b57d0]]، والخط نازل [[0.3em]] (الخط 20px). واكتب كمان قاعدة للي اتزار بلون [[#6d28d9]]. (من قسم ٢ و ٤ في الشرح)

لون اللينك اللي اتزار مبيتقاسش من الصفحة (المتصفح بيخبّيه عمدًا)، فالشرط بتاعه بيتأكد إن القاعدة مكتوبة بس.`, done: R`اللينك أزرق [[rgb(11, 87, 208)]] وخطه نازل 6px، وقاعدة [[a:visited]] مكتوبة باللون البنفسجي، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  p { font-size: 20px; line-height: 1.9; }

</style>
<p>لو فاتك، اقرا <a href="#part1">الجزء الأول</a> و <a href="#part2">الجزء التاني</a> بالترتيب.</p>`, checks: [
              { say: R`اللينك اللي متزارش لونه [[#0b57d0]]`, q: "a", style: ["color", "rgb(11, 87, 208)"] },
              { say: R`الخط نازل 0.3em (6px)`, q: "a", style: ["text-underline-offset", "6px"] },
              { say: R`اللينك لسه تحته خط`, q: "a", style: ["text-decoration-line", "underline"] },
              { say: R`فيه قاعدة [[a:visited]] مكتوبة`, src: "a:visited" },
              { say: R`ولونها [[#6d28d9]]`, src: "#6d28d9" }
            ] }, sol: R`~~~live 78 الحل
<style>
  p { font-size: 20px; line-height: 1.9; }
  a { text-underline-offset: 0.3em; }
  a:link { color: #0b57d0; }
  a:visited { color: #6d28d9; }
</style>
<p>لو فاتك، اقرا <a href="#part1">الجزء الأول</a> و <a href="#part2">الجزء التاني</a> بالترتيب.</p>
~~~

**هتشوف إيه:** لينكين بأزرق أهدى من الافتراضي، وخطهم نازل تحت الحروف. دوس على واحد: ممكن يتحوّل بنفسجي (حسب المتصفح)، والتاني يفضل أزرق.

**ليه كده:** الـ offset مشترك فاتكتب على [[a]]. اللون بيختلف حسب الحالة فاتكتب مرتين، و [[:visited]] بعد [[:link]].

**الغلطة الشائعة:** [[a { color: #0b57d0; }]] بس. قاعدتك بتغلب قاعدة المتصفح في الحالتين، فاللي اتزار واللي متزارش هيبقوا **نفس الأزرق**، والزائر مش هيعرف هو فتح إيه.

~~~text القياس من Chrome
a   color: rgb(11, 87, 208)     text-underline-offset: 6px     text-decoration-line: underline
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مستخدم بعت إن لينكات المقالات اللي قراها «مبتنوّرش» لما يقف عليها. القواعد الأربعة مكتوبة صح، وترتيبهم غلط. رتّبهم L-V-H-A (انقل السطور زي ما هي من غير ما تغيّر فيها). (من قسم ٨ في الشرح)

حالة الـ hover والـ visited مبيتقاسوش من الصفحة، فالشروط هنا بتقرا **ترتيب السطور** في الكود.`, done: R`السطور بالترتيب: [[:link]] ثم [[:visited]] ثم [[:hover]] ثم [[:active]]، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  p { font-size: 20px; }
  a:hover { color: #1e40af; }
  a:active { color: #b91c1c; }
  a:link { color: #0b57d0; }
  a:visited { color: #6d28d9; }
</style>
<p>مقالات الأسبوع: <a href="#a">الخطوط</a> · <a href="#b">القوايم</a> · <a href="#c">اللينكات</a></p>`, checks: [
              { say: R`[[:visited]] بعد [[:link]] على طول`, src: "a:link { color: #0b57d0; }\n  a:visited" },
              { say: R`[[:hover]] بعد [[:visited]] على طول`, src: "a:visited { color: #6d28d9; }\n  a:hover" },
              { say: R`[[:active]] بعد [[:hover]] على طول`, src: "a:hover { color: #1e40af; }\n  a:active" },
              { say: R`اللينك العادي لسه [[#0b57d0]]`, q: "a", style: ["color", "rgb(11, 87, 208)"] }
            ] }, sol: R`~~~live 63 بعد التصليح
<style>
  p { font-size: 20px; }
  a:link { color: #0b57d0; }
  a:visited { color: #6d28d9; }
  a:hover { color: #1e40af; }
  a:active { color: #b91c1c; }
</style>
<p>مقالات الأسبوع: <a href="#a">الخطوط</a> · <a href="#b">القوايم</a> · <a href="#c">اللينكات</a></p>
~~~

**هتشوف إيه:** الشكل وهو واقف زي ما كان. الفرق بيبان بالتجربة: دوس على لينك عشان يبقى «اتزار»، وبعدين قف عليه: لونه بيغمق. قبل التصليح كان بيفضل بنفسجي.

**ليه:** الأربعة بنفس القوة، فالأخير في الملف بيكسب.

| الحالة الفعلية | الترتيب الغلط (H A L V) | الترتيب الصح (L V H A) |
|---|---|---|
| متزارش + hover | [[:link]] كسبت (بعد hover): **مفيش hover** | hover ✓ |
| اتزار + hover | [[:visited]] كسبت: **مفيش hover** | hover ✓ |
| بيتداس | [[:link]] أو [[:visited]] كسبت: **مفيش active** | active ✓ |

يعني في الترتيب الأصلي الـ hover مكانش شغال على **أي** لينك، مش اللي اتزار بس.

**الغلطة الشائعة:** تزوّد [[!important]] على الـ hover. هتشتغل، وهتكسر الـ active، وهتحتاج [[!important]] تانية.

~~~text القياس من Chrome (الحالة العادية)
a   color: rgb(11, 87, 208)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف «reset» منقول من النت فيه [[a { color: inherit; text-decoration: none; }]]. قايمة التنقل بقت حلوة، ولينكات المقال **اختفت** وسط الكلام. سيب القايمة زي ما هي، ورجّع للينكات اللي جوه [[.post]] لون [[#0b57d0]] وخط تحتها. (من قسم ١ و ٩ في الشرح)`, done: R`لينكات [[.post]] زرقا وتحتها خط، ولينكات [[nav]] لسه من غير خط، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  body { font-size: 18px; line-height: 1.8; }
  a { color: inherit; text-decoration: none; }
</style>
<nav><a href="#home">الرئيسية</a> · <a href="#posts">المقالات</a></nav>
<div class="post">
  <p>الشرح الكامل في صفحة الأدوات، والتحميل من صفحة <a href="#dl">الإصدارات</a>. وقبل ده راجع <a href="#req">المتطلبات</a>.</p>
</div>`, checks: [
              { say: R`لينكات المقال تحتها خط`, q: ".post a", style: ["text-decoration-line", "underline"] },
              { say: R`ولونها [[#0b57d0]]`, q: ".post a", style: ["color", "rgb(11, 87, 208)"] },
              { say: R`لينكات القايمة لسه من غير خط`, q: "nav a", style: ["text-decoration-line", "none"] },
              { say: R`ولسه بلون الكلام`, q: "nav a", style: ["color", "rgb(0, 0, 0)"] }
            ] }, sol: R`~~~live 109 141 بعد التصليح
<style>
  body { font-size: 18px; line-height: 1.8; }
  a { color: inherit; text-decoration: none; }
  .post a { color: #0b57d0; text-decoration: underline; text-underline-offset: 0.3em; }
</style>
<nav><a href="#home">الرئيسية</a> · <a href="#posts">المقالات</a></nav>
<div class="post">
  <p>الشرح الكامل في صفحة الأدوات، والتحميل من صفحة <a href="#dl">الإصدارات</a>. وقبل ده راجع <a href="#req">المتطلبات</a>.</p>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 109 141 قبل
<style>
  body { font-size: 18px; line-height: 1.8; }
  a { color: inherit; text-decoration: none; }
</style>
<nav><a href="#home">الرئيسية</a> · <a href="#posts">المقالات</a></nav>
<div class="post">
  <p>الشرح الكامل في صفحة الأدوات، والتحميل من صفحة <a href="#dl">الإصدارات</a>. وقبل ده راجع <a href="#req">المتطلبات</a>.</p>
</div>
~~~

**هتشوف إيه:** قبل: حاول تلاقي اللينكين في الفقرة من غير ما تحرّك الماوس. مش هتعرف: «الإصدارات» و «المتطلبات» زي باقي الكلام. بعد: الاتنين أزرق وتحتهم خط، والقايمة فوق زي ما هي.

**ليه:** في القايمة المكان بيقول «دي لينكات». جوه الفقرة مفيش غير شكل اللينك نفسه. والخط مع اللون، مش اللون لوحده، عشان اللي مبيفرّقش الأزرق من الأسود.

**الغلطة الشائعة:** ترجّع اللون بس. اللينك هيبان لأغلب الناس، وهيفضل مختفي على شاشة ضعيفة ولمن عنده عمى ألوان.

**الدرس الأكبر:** أي «reset» بتنقله اقرا هو بيشيل إيه. اللي بيشيل تنسيق اللينك لازم ترجّعه إنت في كل مكان فيه كلام.

~~~text القياس من Chrome
.post a   قبل: color: rgb(0, 0, 0)  none          بعد: color: rgb(11, 87, 208)  underline
nav a     قبل وبعد: color: rgb(0, 0, 0)  none
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** من غير ما تزوّد class في الـ HTML، حط سهم [[" ↗"]] بعد أي لينك عنوانه بيبدأ بـ [[https://]]. اللينكات الداخلية (النسبية) متتأثرش. (من قسم ١٠ في الشرح)`, done: R`اللينك الخارجي بعده سهم، والداخلي من غير حاجة، ومفيش class جديد، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  p { font-size: 18px; }

</style>
<p>اقرا <a href="about.html">عن المدوّنة</a>، والمرجع في <a href="https://example.test/spec">المواصفة الرسمية</a>.</p>`, checks: [
              { say: R`اللينك الخارجي بعده [[" ↗"]]`, q: "a[href^=\"https://\"]", pseudo: "::after", style: ["content", "\" ↗\""] },
              { say: R`اللينك الداخلي من غير علامة`, q: "a[href=\"about.html\"]", pseudo: "::after", style: ["content", "none"] },
              { say: R`مفيش class متزوّد على اللينكات`, q: "a[class]", n: 0 }
            ] }, sol: R`~~~live 60 الحل
<style>
  p { font-size: 18px; }
  a[href^="https://"]::after { content: " ↗"; }
</style>
<p>اقرا <a href="about.html">عن المدوّنة</a>، والمرجع في <a href="https://example.test/spec">المواصفة الرسمية</a>.</p>
~~~

**هتشوف إيه:** «عن المدوّنة» لينك عادي. «المواصفة الرسمية» بعدها سهم مايل لفوق، وهو جزء من اللينك (بيتلوّن وبيتداس معاه).

**ليه كده:** [[^=]] معناها «القيمة بتبدأ بـ». اللينك الداخلي عنوانه [[about.html]] فمبيتطابقش. والقاعدة هتشتغل على أي لينك خارجي يتزوّد بعدين، من غير ما حد يفتكر يحط class.

**الغلطة الشائعة:** [[a[href*="http"]]] ([[*=]] يعني «فيها في أي حتة»). هتمسك لينك داخلي اسمه [[how-http-works.html]] بالغلط.

**حدود الطريقة:** لو لينكاتك الداخلية مكتوبة بعنوان كامل ([[https://myblog.test/about]]) هتاخد سهم هي كمان. ساعتها استثنيها: [[a[href^="https://"]:not([href^="https://myblog.test"])]].

~~~text القياس من Chrome
a[href^="https://"]::after    content: " ↗"
a[href="about.html"]::after   content: none
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المصمم طلب «شيل الإطار الوحش اللي بيظهر حوالين اللينك»، فاتكتب [[a:focus { outline: none; }]]. دلوقتي اللي بيتنقل بـ Tab مش شايف هو فين. شيل السطر ده، وحط مكانه إطار [[2px solid #0b57d0]] بعيد عن اللينك 2px، يظهر مع الكيبورد بس. (من قسم ٦ في الشرح)

التركيز مبيتقاسش من الصفحة وهي واقفة، فالشروط بتقرا الكود.`, done: R`مفيش [[outline: none]]، وفيه قاعدة [[a:focus-visible]] بالإطار المطلوب، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  p { font-size: 18px; }
  a:focus { outline: none; }
</style>
<p><a href="#a">الرئيسية</a> · <a href="#b">المقالات</a> · <a href="#c">تواصل</a></p>`, checks: [
              { say: R`مفيش [[outline: none]]`, nosrc: "outline: none" },
              { say: R`فيه قاعدة [[a:focus-visible]]`, src: "a:focus-visible" },
              { say: R`الإطار [[2px solid #0b57d0]]`, src: "outline: 2px solid #0b57d0" },
              { say: R`وبعيد عن اللينك: [[outline-offset: 2px]]`, src: "outline-offset: 2px" }
            ] }, sol: R`~~~live 57 بعد التصليح
<style>
  p { font-size: 18px; }
  a:focus-visible { outline: 2px solid #0b57d0; outline-offset: 2px; }
</style>
<p><a href="#a">الرئيسية</a> · <a href="#b">المقالات</a> · <a href="#c">تواصل</a></p>
~~~

**هتشوف إيه:** وهي واقفة: تلات لينكات عادية. دوس جوه المعاينة ثم Tab: إطار أزرق واضح حوالين اللينك الأول، ومع كل Tab بيتنقل. دوس على لينك بالماوس: مفيش إطار.

**ليه [[:focus-visible]]:** المصمم كان متضايق من الإطار اللي بيظهر **بعد ضغطة الماوس**. [[:focus-visible]] بتحل ده من غير ما تحرم مستخدم الكيبورد: بتظهر لما المتصفح يشوف إن التركيز جه من الكيبورد.

**الغلطة الشائعة:** [[a:focus { outline: 0; }]] ومعاها تغيير لون خفيف «كبديل». تغيير اللون لوحده مش إطار، ومش بيتشاف كفاية.

~~~text القياس من Chrome (لينك عليه focus بالكيبورد)
الافتراضي:     outline: auto 1px      outline-offset: 1px
بعد التصليح:   outline: rgb(11, 87, 208) solid 2px      outline-offset: 2px
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك عايز يحط علامة «✓ قريته» بعد كل مقال اتزار في فهرس المدوّنة، وكتب [[a:visited::after { content: " ✓"; }]] ومشتغلتش. اشرحله في ٣ سطور ليه، وإيه اللي مسموح، وإزاي يعمل الفكرة بطريقة تانية. (من قسم ٤ في الشرح)`, done: R`قلت إن [[:visited]] ألوان بس وليه (الخصوصية)، وإن JavaScript كمان ميعرفش، واقترحت اللون أو حفظ القراية في الموقع نفسه.`, sol: R`**إجابة نموذجية:**

1. المتصفح بيسمح جوه [[:visited]] بتغيير **ألوان بس** ([[color]] و [[background-color]] و [[border-color]] و [[outline-color]] و [[text-decoration-color]]...). [[content]] بتغيّر مقاس اللينك، وأي حاجة بتغيّر مقاس أو بتتقري بـ JavaScript كانت هتخلّي أي موقع يعرف إنت زرت إيه. فاتمنعت.
2. ومتحاولش بـ JavaScript: [[getComputedStyle]] بيرجّع لون اللينك «كأنه متزارش» دايمًا، و [[querySelectorAll(":visited")]] بيرجّع فاضي. المتصفح بيكدب عمدًا.
3. اللي ينفع: **لون مختلف واضح** للي اتزار (ده شغل [[:visited]] الأصلي، وكفاية للفهرس). ولو لازم علامة «✓»، الموقع نفسه يسجّل إن المستخدم فتح المقال (في [[localStorage]] أو في حسابه) ويزوّد class من عنده. ساعتها الموقع عارف اللي حصل **عنده هو** بس، مش تاريخ المتصفح.

~~~css
/* اللي ينفع */
.index a:link    { color: #0b57d0; }
.index a:visited { color: #6b7280; text-decoration-color: #9ca3af; }
~~~

**الغلطة الشائعة:** تجرّب [[a:visited { opacity: 0.5; }]] أو لون شفاف. الاتنين بيتجاهلوا: [[opacity]] مش لون، والشفافية جوه لون [[:visited]] بتتاخد من حالة [[:link]].` }
          ]
        },
        {
          cmd: "::first-letter و ::selection",
          title: "أول حرف، وأول سطر، والنص المتحدد، والكتابة الرأسية",
          pre: [
            { to: "css/selectors", why: R`الـ pseudo-elements ([[::before]] و [[::after]]) اتشرحت هناك: حتة من العنصر بتتنسّق من غير ما يبقى ليها tag` },
            { to: "css/lang و dir", why: R`اتجاه الكتابة بيتحدد بـ [[dir]] في الـ HTML، والدرس ده بيقول ليه مش بالـ CSS` }
          ],
          ref: [
            { t: "MDN: ::first-letter", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-letter" },
            { t: "MDN: ::first-line", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-line" },
            { t: "MDN: ::selection", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::selection" },
            { t: "MDN: writing-mode", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/writing-mode" },
            { t: "MDN: text-orientation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-orientation" },
            { t: "MDN: text-combine-upright", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-combine-upright" },
            { t: "MDN: direction", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/direction" },
            { t: "MDN: unicode-bidi", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/unicode-bidi" }
          ],
          desc: R`تلات pseudo-elements بتمسك **حتة من النص** من غير ما تحط حواليها tag: [[::first-letter]] (أول حرف في الفقرة)، و [[::first-line]] (أول سطر، مهما كان عرض الشاشة)، و [[::selection]] (الكلام اللي المستخدم محدده بالماوس).
ومعاهم في الدرس [[writing-mode]] اللي بتخلّي السطور تتكتب رأسي، وليه اتجاه الكتابة العربي بيتحدد بـ [[dir]] في الـ HTML مش بـ [[direction]] في الـ CSS.`,
          example: R`.story p:first-of-type::first-letter { color: #b45309; font-weight: 700; }
.en::first-letter { font-size: 3em; float: left; line-height: 1; }
.lead::first-line { font-weight: 700; }
::selection { background: #fde68a; color: #111; }
th.side { writing-mode: vertical-rl; }
.year { text-combine-upright: all; }`,
          flag: "script",
          lines: [
            R`أول حرف من أول فقرة في القصة: بني وتقيل. اللون والوزن بس، عشان الحرف العربي يفضل متصل باللي بعده.`,
            R`drop cap للفقرة الإنجليزي: أول حرف تلات أضعاف الحجم، وعايم على الشمال ([[float]]) فباقي السطور بتلف حواليه.`,
            R`أول سطر من فقرة المقدمة تقيل. «السطر» هنا اللي المتصفح كسّره فعلًا: لو الشاشة ضاقت، كلمات أقل هتبقى تقيلة.`,
            R`لون تحديد النص في الصفحة كلها: خلفية صفرا وكلام غامق، بدل أزرق النظام.`,
            R`خانة عنوان في جدول كلامها مكتوب رأسي (من فوق لتحت) عشان العمود يبقى ضيق.`,
            R`جوه نص رأسي: الرقم يتكتب أفقي في مكان حرف واحد بدل ما كل رقم ينزل تحت التاني.`
          ],
          teach: R`## الفكرة في سطرين

[[::before]] و [[::after]] بيزوّدوا حتة مش موجودة. التلاتة بتوع الدرس ده بيمسكوا حتة **موجودة** من النص، المتصفح هو اللي بيحدد حدودها: أول حرف، أول سطر، اللي اتحدد.

الأرقام من Chrome 157 على Windows 11، والشكل من صور للصفحة.

---

## ١. [[p::first-letter]]

بتمسك أول حرف في أول سطر من صندوق (فقرة، عنوان، بند قايمة). أشهر استخدام ليها الـ drop cap: حرف كبير في أول المقال زي الكتب والمجلات.

~~~live 125 drop cap على فقرة إنجليزي
<style>
  .en { direction: ltr; text-align: left; font-family: Georgia, serif; font-size: 17px; line-height: 1.6; max-width: 380px; margin: 0; }
  .en::first-letter { font-size: 3.2em; float: left; line-height: 0.9; margin-right: 6px; color: #b45309; }
</style>
<p class="en" lang="en">Once upon a time there was a small town by the sea, where everyone woke up before sunrise and opened their shops while the streets were still quiet.</p>
~~~

**هتشوف إيه:** حرف «O» بني كبير واخد ارتفاع سطرين تقريبًا، وباقي الكلام بيلف على يمينه وتحته.

- [[font-size: 3.2em]]: الحرف أكبر من النص.
- [[float: left]]: بيطلّع الحرف من السطر ويحطه على الشمال، والسطور اللي بعده بتلف حواليه. ([[float]] ليها درس في وحدة الـ layout. هنا يكفي إنها «عوّم الحتة دي على جنب».)
- [[line-height: 0.9]]: عشان صندوق الحرف ميبقاش أطول من الحرف نفسه.

مش كل الخصائص مسموحة:

~~~text القياس من Chrome (كتبنا 15 خاصية على p::first-letter)
اشتغلت:    font-size   color   font-weight   float   margin   background   border
           line-height   letter-spacing   text-transform   text-shadow   vertical-align
اتجاهلت:   position (فضلت static)     display (الحرف بيفضل جزء من السطر أو float بس)     width
~~~

قواعد صغيرة:

- علامة ترقيم قبل الحرف (قوس، علامة تنصيص «) بتتحسب معاه: [[::first-letter]] بتمسك الاتنين.
- بتشتغل على الصناديق (block)، مش على [[<span>]] و [[<a>]].
- لو أول حاجة في الفقرة صورة أو عنصر [[inline-block]]، مفيش first-letter.

### الحرف العربي بيتفك

دي الحتة اللي تهمّنا. الحروف العربي بتتوصل ببعض وشكل كل حرف بيتحدد من اللي جنبه. لما [[::first-letter]] تطلّع أول حرف في صندوق لوحده وتغيّر حجمه أو تعوّمه، الوصلة بتتقطع:

~~~live 168 أول حرف عربي: بـ float وحجم، ثم بلون ووزن بس
<style>
  p { font-size: 20px; line-height: 1.7; max-width: 380px; margin: 0 0 12px; }
  .cap::first-letter { font-size: 3em; float: right; line-height: 1; margin-inline-end: 8px; color: #b45309; font-weight: 700; }
  .tint::first-letter { color: #b45309; font-weight: 700; }
</style>
<p class="cap">كان يا ما كان في قديم الزمان مدينة صغيرة على البحر، أهلها بيصحوا مع الفجر.</p>
<p class="tint">كان يا ما كان في قديم الزمان مدينة صغيرة على البحر، أهلها بيصحوا مع الفجر.</p>
~~~

**هتشوف إيه:**

- الفقرة الأولى: حرف «ك» كبير لوحده على اليمين **بشكله المنفصل**، والكلمة بقت «ك» ثم «ان» بعيد عنها. كلمة «كان» اتفكّت.
- الفقرة التانية: «كان» كلمة واحدة متصلة عادي، والكاف بس لونها بني.

ده اتشاف في صورة للصفحة من Chrome 157: مع [[float]] وتغيير الحجم الحرف اتعرض بشكله المعزول، ومع اللون والوزن بس فضل متصل.

فالـ drop cap الكلاسيكي **مبينفعش مع العربي**. البدايل:

- لوّن أول حرف أو تقّله بس (من غير [[float]] ولا [[font-size]]).
- أو كبّر **أول كلمة** كلها: حطها في [[<span>]] ونسّقها. الكلمة بتفضل سليمة.
- أو استخدم [[::first-line]] (القسم الجاي) لتمييز بداية المقال.

فيه خاصية أحدث للـ drop cap اسمها [[initial-letter]] (بتحدد الحرف ياخد كام سطر). المنهج مستبعدها لأنها مش في كل المتصفحات لسه، ونفس مشكلة العربي فيها.

---

## ٢. [[p::first-line]]

بتمسك أول سطر **زي ما اتكسّر فعلًا**. مش أول جملة، ومش عدد كلمات ثابت.

~~~live 133 166 أول سطر تقيل: غيّر العرض وشوف
<style>
  p { font-size: 18px; line-height: 1.8; max-width: 420px; }
  p::first-line { font-weight: 700; color: #0f766e; }
</style>
<p>أول سطر من الفقرة دي لونه مختلف وتقيل، مهما كان عدد الكلمات اللي دخلت فيه. جرّب تدوس على زرار «موبايل» فوق المعاينة وشوف السطر الأول بقى فيه كام كلمة.</p>
~~~

**هتشوف إيه:** السطر الأول أخضر وتقيل، والباقي عادي. لما العرض يضيق، كلمات أقل بتبقى في السطر الأول، والتنسيق بيمشي مع السطر مش مع الكلمات.

ده اللي ميتعملش بـ [[<span>]]: إنت متعرفش السطر هيتكسر فين على كل شاشة.

~~~text القياس من Chrome (كتبنا 13 خاصية على p::first-line)
اشتغلت:    font-size   color   font-weight   background   text-transform   letter-spacing
           text-decoration   line-height   vertical-align
اتجاهلت:   margin   padding   border   display
~~~

يعني خصائص الخط واللون والخلفية آه. خصائص الصندوق لأ: السطر مش صندوق.

ولو كبّرت الخط في [[::first-line]]، كلمات أقل هتدخل في السطر، والمتصفح بيعيد الحساب. آمنة تمامًا على العربي: مفيش حرف بيتفصل.

---

## ٣. [[::selection]]

الكلام اللي المستخدم سحب عليه بالماوس (أو حدده بـ Ctrl+A). الافتراضي لون النظام: أبيض على أزرق في أغلب الأنظمة.

~~~live 96 حدد الكلام بالماوس
<style>
  .brand::selection { background: #fde68a; color: #111; }
  p { font-size: 18px; }
</style>
<p>حدد الجملة دي بالماوس: لون التحديد هو لون النظام.</p>
<p class="brand">وحدد الجملة دي: خلفية صفرا وكلام غامق.</p>
~~~

**هتشوف إيه:** اسحب بالماوس على السطرين. الأول بيتحدد بالأزرق المعتاد، والتاني بالأصفر.

- [[::selection]] لوحدها (من غير عنصر قبلها) بتنطبق على الصفحة كلها.
- الخصائص المسموحة قليلة (MDN): [[color]] و [[background-color]] و [[text-decoration]] وإخواتها و [[text-shadow]] و [[-webkit-text-stroke]] و [[-webkit-text-fill-color]]. مفيش خط ولا حجم ولا مسافات: التحديد مبيغيّرش مكان حاجة.
- [[background-image]] بتتجاهل: لون بس.

قاعدتين:

1. **التباين.** الكلام المتحدد لازم يتقري. خلفية صفرا فاتحة مع كلام أبيض = الزائر مش شايف هو حدد إيه.
2. **متخفيش التحديد.** [[::selection { background: transparent; }]] بتخلّي المستخدم مش عارف هو حدد حاجة ولا لأ. التحديد أداة بيستخدمها الناس عشان تنسخ، وناس بتستخدمه عشان تتابع القراية.

المنهج مش حاطط [[::selection]] في Baseline. MDN بيقول إنها شغالة في المتصفحات الحالية، والتفاصيل اللي بتختلف هي الوراثة جوه العناصر. قرارها عند صاحب المنهج.

---

## ٤. [[writing-mode: vertical-rl]]

بتغيّر اتجاه **السطور نفسها**: بدل ما السطر أفقي والسطور بتتراص تحت بعض، السطر بيبقى رأسي والسطور بتتراص جنب بعض. اتعملت للصيني والياباني اللي بيتكتبوا كده أصلًا.

| القيمة | السطر ماشي | السطور بتتراص |
|---|---|---|
| [[writing-mode: horizontal-tb]] | أفقي (الافتراضي) | من فوق لتحت |
| [[writing-mode: vertical-rl]] | رأسي، من فوق لتحت | من اليمين للشمال |
| [[writing-mode: vertical-lr]] | رأسي، من فوق لتحت | من الشمال لليمين |
| [[writing-mode: sideways-rl]] | رأسي، وكل الحروف مقلوبة على جنبها | من اليمين للشمال |
| [[writing-mode: sideways-lr]] | رأسي **من تحت لفوق**، وكل الحروف على جنبها | من الشمال لليمين |

~~~text القياس من Chrome (صندوق فيه «عنوان العمود Title»، خط 16px وسطر 20px)
horizontal-tb     118 × 20 px
vertical-rl       20 × 118 px      ← العرض والارتفاع اتبدّلوا
sideways-lr       20 × 118 px
~~~

استخدامها في صفحة عربي أو إنجليزي: **عنوان عمود ضيق في جدول**، أو كلمة على جنب كارت.

~~~live 130 جدول عناوين أعمدته رأسية
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid silver; padding: 4px 8px; text-align: center; }
  thead th { writing-mode: vertical-rl; padding: 8px 4px; }
</style>
<table>
  <thead><tr><td></td><th>السبت</th><th>الأحد</th><th>الاثنين</th><th>الثلاثاء</th></tr></thead>
  <tbody>
    <tr><th>سباحة</th><td>✓</td><td></td><td>✓</td><td></td></tr>
    <tr><th>جري</th><td></td><td>✓</td><td></td><td>✓</td></tr>
  </tbody>
</table>
~~~

**هتشوف إيه:** أسامي الأيام مكتوبة رأسي: كل كلمة مقلوبة على جنبها وبتتقري من فوق لتحت، والحروف لسه متصلة. الأعمدة بقت ضيقة قد علامة الصح.

الحروف العربي (واللاتيني) في [[vertical-rl]] **بتتقلب ربع لفة**: الكلمة بتفضل سليمة ومتصلة، بس نايمة على جنبها. ده مقبول لكلمة أو اتنين في عنوان عمود. متكتبش فقرة كده.

### [[text-orientation: upright]]

جوه نص رأسي، بتحدد الحروف «اللي أصلها أفقي» تتقلب ولا تفضل واقفة:

| القيمة | معناها |
|---|---|
| [[text-orientation: mixed]] | الافتراضي: الصيني والياباني واقف، واللاتيني والعربي مقلوب على جنبه |
| [[text-orientation: upright]] | كل الحروف واقفة، كل حرف تحت التاني |
| [[text-orientation: sideways]] | كل الحروف مقلوبة على جنبها |

~~~live 140 upright على إنجليزي وعلى عربي
<style>
  div { writing-mode: vertical-rl; text-orientation: upright; display: inline-block; height: 110px; margin: 0 14px; font-size: 18px; border: 1px solid silver; padding: 4px; }
</style>
<div lang="en">MENU</div>
<div>قائمة</div>
~~~

**هتشوف إيه:** «MENU» حروفها واقفة تحت بعض، وده شكل لافتات مألوف. «قائمة» حروفها **اتفكّت**: كل حرف لوحده بشكله المنفصل تحت التاني، والكلمة مبقتش تتقري.

[[upright]] بتعامل كل حرف كصندوق مستقل، والعربي ميعيش كده. **متستخدمش [[text-orientation: upright]] مع عربي.** سيبها [[mixed]].

### [[text-combine-upright: all]]

في نص رأسي، الأرقام بتتقلب على جنبها زي اللاتيني. الخاصية دي بتاخد مجموعة حروف قصيرة (سنة، يوم) وتكتبها **أفقي جنب بعض** في مكان حرف واحد:

~~~live 140 رقم جوه نص رأسي
<style>
  div { writing-mode: vertical-rl; display: inline-block; height: 110px; margin: 0 14px; font-size: 18px; border: 1px solid silver; padding: 4px; }
  .tcy { text-combine-upright: all; }
</style>
<div lang="ja">平成31年</div>
<div lang="ja">平成<span class="tcy">31</span>年</div>
~~~

**هتشوف إيه:** في الأول «31» مقلوبة على جنبها وسط الحروف اليابانية. في التاني الرقمين واقفين جنب بعض في خانة واحدة، وده الشكل الصح في الطباعة اليابانية.

القيم: [[none]] و [[all]]. (القيمة [[digits 2]] من المواصفة مش مدعومة في Chrome 157: [[CSS.supports]] رجّع false.) خاصية للنصوص الآسيوية، وذكرناها عشان هي في المنهج.

---

## ٥. [[direction: rtl]] و [[unicode-bidi]]: سيبهم للـ HTML

فيه خاصيتين CSS بيتحكموا في اتجاه النص:

| الخاصية | القيم |
|---|---|
| [[direction]] | [[ltr]] و [[rtl]] |
| [[unicode-bidi]] | [[normal]] و [[embed]] و [[isolate]] و [[bidi-override]] و [[isolate-override]] و [[plaintext]] |

و MDN بيقول صريح: **متستخدمهمش في صفحات الويب.** الاتجاه جزء من **معنى** المحتوى مش من شكله، فمكانه [[dir]] في الـ HTML:

- لو ملف الـ CSS منزلش، [[dir="rtl"]] لسه شغال. [[direction: rtl]] لأ.
- [[dir]] بيوصل لقارئ الشاشة ولأي برنامج بيقرا الصفحة.
- [[dir="auto"]] بيقرر الاتجاه من أول حرف في النص (لكلام المستخدمين). ده في CSS اسمه [[unicode-bidi: plaintext]]، والـ attribute أوضح.
- عزل حتة اتجاهها مختلف (رقم تليفون، اسم إنجليزي) بيتعمل بـ [[<bdi>]] أو [[dir]] على [[<span>]].

المتصفح نفسه بيترجم [[dir="rtl"]] لـ [[direction: rtl]] و [[unicode-bidi: isolate]] في الـ stylesheet بتاعه. فالخاصيتين موجودين وشغالين، بس إنت بتتحكم فيهم من الـ HTML. الشرح الكامل في درس «lang و dir».

الحالة الوحيدة اللي هتكتب فيها [[direction]] بإيدك: خدعة layout (زي عكس ترتيب أعمدة)، وحتى دي ليها طرق أحسن في flexbox و grid.

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| drop cap بـ [[float]] وحجم على فقرة عربي | أول حرف بيتفصل عن كلمته |
| [[::first-letter]] على [[<span>]] | مبتشتغلش: عايزة صندوق block |
| [[margin]] أو [[padding]] على [[::first-line]] | بيتجاهلوا |
| [[<span>]] حوالين «أول سطر» | على شاشة تانية السطر بيتكسر في حتة تانية |
| [[::selection]] بتباين ضعيف أو شفافة | المستخدم مش شايف هو حدد إيه |
| [[font-size]] جوه [[::selection]] | بيتجاهل: ألوان وزينة بس |
| [[text-orientation: upright]] على عربي | الحروف بتتفك وتتراص تحت بعض |
| فقرة كاملة [[writing-mode: vertical-rl]] بالعربي | الكلام نايم على جنبه ومتعب |
| [[direction: rtl]] في الـ CSS بدل [[dir]] | من غير CSS الصفحة بتتقلب، وقارئ الشاشة ميعرفش |

---

## الخلاصة

- [[::first-letter]]: أول حرف. للعربي لون ووزن بس، من غير [[float]] ولا حجم.
- [[::first-line]]: أول سطر زي ما اتكسّر. خصائص خط ولون، وآمنة على العربي.
- [[::selection]]: لون التحديد. ألوان بس، وبتباين واضح.
- [[writing-mode: vertical-rl]]: لعناوين أعمدة ضيقة. الكلمة العربي بتتقلب على جنبها وتفضل متصلة.
- [[text-orientation: upright]] بتفك العربي. [[text-combine-upright]] للأرقام في نص آسيوي.
- الاتجاه بـ [[dir]] في الـ HTML، مش [[direction]] في الـ CSS.`,
          try: R`اعمل [[first.html]] فيه فقرتين: واحدة عربي وواحدة إنجليزي ([[lang="en" dir="ltr"]]). اعمل للإنجليزي drop cap بـ [[float]]، وجرّب نفس القاعدة على العربي وشوف الحرف الأول. وبعدين بدّل قاعدة العربي للون ووزن بس. وزوّد [[::selection]] بألوان من عندك وحدد الكلام.`,
          sol: R`~~~live 184 216 first.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أول حرف</title>
<style>
  body { font-family: system-ui, "Segoe UI", Tahoma, sans-serif; font-size: 18px; line-height: 1.8; }
  p { max-width: 420px; }
  .ar::first-letter { color: #b45309; font-weight: 700; }
  .en::first-letter { font-size: 3em; float: left; line-height: 1; margin-right: 6px; color: #b45309; }
  ::selection { background: #fde68a; color: #111; }
</style>
</head>
<body>
<p class="ar">كان البحر هادي في الصبحية دي، والمراكب راجعة واحدة ورا التانية من غير صوت.</p>
<p class="en" lang="en" dir="ltr">The sea was calm that morning, and the boats came back one after another without a sound.</p>
</body>
</html>
~~~

**هتشوف إيه:**

- العربي: الكاف في «كان» بنية وتقيلة، والكلمة متصلة.
- الإنجليزي: «T» كبيرة على الشمال والسطور بتلف حواليها.
- حدد أي كلام: خلفية صفرا.
- لو جرّبت قاعدة الإنجليزي على [[.ar]] (مع [[float: right]]): الكاف هتتفصل عن «ان» وتتعرض بشكلها المنفصل.

~~~text القياس من Chrome
.ar::first-letter   color: rgb(180, 83, 9)    font-weight: 700    float: none
.en::first-letter   font-size: 54px           float: left
::selection         background-color: rgb(253, 230, 138)
~~~`,
          deep: {
            why: R`فيه تنسيقات مينفعش تتعمل بـ tag: «أول سطر» بيتغيّر مع عرض الشاشة، و «اللي المستخدم حدده» بيتغيّر مع كل حركة ماوس. الـ pseudo-elements دي بتخلّي المتصفح هو اللي يحدد الحتة. وهي كمان أوضح مثال على إن CSS اتصمم حوالين اللاتيني: الـ drop cap والكتابة الواقفة بيفترضوا حروف منفصلة، والحرف العربي المتصل بيتكسر معاهم. فاللي بيكتب عربي لازم يعرف أنهي تأثير آمن وأنهي لأ قبل ما ينقله من تصميم إنجليزي.`,
            how: R`[[::first-letter]] بتعمل صندوق inline وهمي حوالين أول حرف (ومعاه الترقيم اللي قبله)، كأنك حطيته في [[<span>]]. ولما الصندوق ده ياخد خط بحجم مختلف أو [[float]]، المتصفح بيشكّل الحروف (shaping) على حتتين منفصلتين، فالحرف العربي بيفقد وصلته. مع اللون بس، التشكيل بيحصل على الكلمة كلها والتلوين بيتطبق بعده. [[::first-line]] بتتطبق بعد تكسير السطور، وعشان كده ممنوع فيها أي خاصية بتغيّر مقاس الصندوق. [[::selection]] طبقة رسم بتتحط فوق النص المتحدد، ومسموح فيها ألوان بس عشان التحديد ميغيّرش الـ layout. و [[writing-mode]] بتبدّل المحورين: «inline» بيبقى رأسي و «block» أفقي، وكل الخصائص المنطقية ([[inline-start]] و [[block-start]]) بتلف معاه.`,
            when: R`[[::first-letter]]: مقالات وقصص بالإنجليزي، ولمسة لون في العربي. [[::first-line]]: مقدمة مقال. [[::selection]]: هوية الموقع، مرة واحدة في الملف. [[writing-mode]]: عناوين أعمدة جداول مزحومة، ووسم على جنب كارت. [[direction]] و [[unicode-bidi]]: تقريبًا أبدًا.`,
            mistakes: R`drop cap على عربي. [[::first-letter]] على عنصر inline. خصائص صندوق على [[::first-line]]. تحديد من غير تباين. [[upright]] على عربي. و [[direction]] في الـ CSS بدل [[dir]].`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** فقرتين في أول قصة. الإنجليزي [[.en]]: drop cap حجمه [[48px]] وعايم على الشمال. العربي [[.ar]]: أول حرف لونه [[#b45309]] وتقيل (700) **من غير** تغيير حجم ولا [[float]]. (من قسم ١ في الشرح)`, done: R`الحرف الإنجليزي 48px و [[float: left]]، والعربي بني وتقيل و [[float: none]]، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  p { font-size: 18px; line-height: 1.7; max-width: 400px; }
  .en::first-letter { }
  .ar::first-letter { }
</style>
<p class="en" lang="en" dir="ltr">Every morning the fishermen counted their nets, knowing the number would not change.</p>
<p class="ar">كل يوم الصبح الصيادين بيعدّوا الشباك، وهم عارفين إن العدد مش هيتغيّر.</p>`, checks: [
              { say: R`الحرف الإنجليزي الأول 48px`, q: ".en", pseudo: "::first-letter", style: ["font-size", "48px"] },
              { say: R`وعايم على الشمال`, q: ".en", pseudo: "::first-letter", style: ["float", "left"] },
              { say: R`الحرف العربي الأول بني`, q: ".ar", pseudo: "::first-letter", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`وتقيل`, q: ".ar", pseudo: "::first-letter", style: ["font-weight", "700"] },
              { say: R`ومن غير [[float]] (عشان الكلمة تفضل متصلة)`, q: ".ar", pseudo: "::first-letter", style: ["float", "none"] },
              { say: R`وبنفس حجم باقي الفقرة`, q: ".ar", pseudo: "::first-letter", style: ["font-size", "18px"] }
            ] }, sol: R`~~~live 176 207 الحل
<style>
  p { font-size: 18px; line-height: 1.7; max-width: 400px; }
  .en::first-letter { font-size: 48px; float: left; line-height: 1; margin-right: 6px; }
  .ar::first-letter { color: #b45309; font-weight: 700; }
</style>
<p class="en" lang="en" dir="ltr">Every morning the fishermen counted their nets, knowing the number would not change.</p>
<p class="ar">كل يوم الصبح الصيادين بيعدّوا الشباك، وهم عارفين إن العدد مش هيتغيّر.</p>
~~~

**هتشوف إيه:** «E» كبيرة على شمال الفقرة الإنجليزي والسطرين بيلفوا حواليها. وفي العربي الكاف في «كل» بنية وتقيلة، و «كل» كلمة واحدة متصلة.

**ليه مختلفين:** الحرف اللاتيني مستقل، فينفع يتكبّر ويتعوّم. الحرف العربي جزء من كلمة متصلة، وأي حاجة بتطلّعه في صندوق بمقاس تاني بتقطع الوصلة.

**الغلطة الشائعة:** نفس قاعدة الـ drop cap على الاتنين «عشان التصميم يبقى موحّد». الفقرة العربي هتبدأ بـ «ك» منفصلة وبعدها «ل» لوحدها.

~~~text القياس من Chrome
.en::first-letter   font-size: 48px    float: left
.ar::first-letter   color: rgb(180, 83, 9)    font-weight: 700    float: none    font-size: 18px
~~~` },
            { lvl: 'سريع', t: R`**ابني:** خلّي أول سطر من مقدمة المقال [[.lead]] تقيل (700) ولونه [[#0f766e]]، من غير أي tag جديد في الـ HTML. وبعدين دوس «موبايل» فوق المعاينة وشوف التنسيق بيمشي مع السطر. (من قسم ٢ في الشرح)`, done: R`أول سطر تقيل وأخضر، ومفيش [[<span>]] ولا [[<strong>]] في الفقرة، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .lead { font-size: 18px; line-height: 1.8; max-width: 440px; }

</style>
<p class="lead">الخط الكويس مش اللي بيلفت النظر. الخط الكويس اللي بتنساه وإنت بتقرا، وبتفتكر الكلام نفسه. وده اللي هنحاول نوصله في المقال ده.</p>`, checks: [
              { say: R`أول سطر تقيل`, q: ".lead", pseudo: "::first-line", style: ["font-weight", "700"] },
              { say: R`ولونه [[#0f766e]]`, q: ".lead", pseudo: "::first-line", style: ["color", "rgb(15, 118, 110)"] },
              { say: R`باقي الفقرة وزنها عادي`, q: ".lead", style: ["font-weight", "400"] },
              { say: R`مفيش tag جديد جوه الفقرة`, q: ".lead *", n: 0 }
            ] }, sol: R`~~~live 101 133 الحل
<style>
  .lead { font-size: 18px; line-height: 1.8; max-width: 440px; }
  .lead::first-line { font-weight: 700; color: #0f766e; }
</style>
<p class="lead">الخط الكويس مش اللي بيلفت النظر. الخط الكويس اللي بتنساه وإنت بتقرا، وبتفتكر الكلام نفسه. وده اللي هنحاول نوصله في المقال ده.</p>
~~~

**هتشوف إيه:** السطر الأول أخضر وتقيل. على عرض الموبايل السطر بيقصر، والكلمات اللي نزلت للسطر التاني رجعت عادية لوحدها.

**ليه [[::first-line]] مش [[<strong>]]:** [[<strong>]] حوالين أول جملة هيخلّي الجملة تقيلة حتى لو لفّت على تلات سطور في الموبايل. إنت عايز «السطر» مش «الجملة».

**الغلطة الشائعة:** [[.lead:first-line]] بنقطتين واحدة. بتشتغل (المتصفحات بتقبلها للتوافق مع الكود القديم)، بس الكتابة الصح للـ pseudo-elements بنقطتين اتنين [[::]]، عشان تتفرّق عن الـ pseudo-classes.

~~~text القياس من Chrome
.lead::first-line   font-weight: 700    color: rgb(15, 118, 110)
.lead               font-weight: 400
~~~` },
            { lvl: 'سريع', t: R`**ابني:** لون تحديد النص في «مدوّنة حبر» كلها: خلفية [[#fde68a]] وكلام [[#111]]. قاعدة واحدة من غير اسم عنصر. (من قسم ٣ في الشرح)`, done: R`[[::selection]] على الفقرة والعنوان الاتنين بالخلفية الصفرا، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  body { font-size: 18px; }

</style>
<h2>حدد الكلام ده</h2>
<p>وحدد الفقرة دي كمان، وشوف اللون.</p>`, checks: [
              { say: R`خلفية التحديد في الفقرة [[#fde68a]]`, q: "p", pseudo: "::selection", style: ["background-color", "rgb(253, 230, 138)"] },
              { say: R`وفي العنوان كمان (القاعدة عامة)`, q: "h2", pseudo: "::selection", style: ["background-color", "rgb(253, 230, 138)"] },
              { say: R`كلام التحديد [[#111]]`, q: "p", pseudo: "::selection", style: ["color", "rgb(17, 17, 17)"] }
            ] }, sol: R`~~~live 115 الحل
<style>
  body { font-size: 18px; }
  ::selection { background: #fde68a; color: #111; }
</style>
<h2>حدد الكلام ده</h2>
<p>وحدد الفقرة دي كمان، وشوف اللون.</p>
~~~

**هتشوف إيه:** اسحب بالماوس على أي كلام: خلفية صفرا وحروف غامقة، في العنوان والفقرة.

**ليه كده:** [[::selection]] من غير عنصر قبلها معناها [[*::selection]]: كل العناصر.

**الغلطة الشائعة:** [[body::selection]]. دي بتنطبق على النص اللي **جوه body مباشرة** بس، وسلوكها مع العناصر اللي جواه بيختلف بين المتصفحات. القاعدة العامة أضمن.

**اختبر التباين:** أصفر فاتح مع [[#111]] واضح. لو كنت سبت [[color]] من غير تحديد وخلفيتك غامقة، الكلام المتحدد ممكن يختفي.

~~~text القياس من Chrome
p::selection    background-color: rgb(253, 230, 138)    color: rgb(17, 17, 17)
h2::selection   background-color: rgb(253, 230, 138)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** جدول حضور عناوين أعمدته رأسية عشان يضيق. المبرمج نقل القاعدة من موقع إنجليزي وفيها [[text-orientation: upright]]، فأسامي الأيام العربي حروفها اتفكّت. صلّحها وسيب العناوين رأسية. (من قسم ٤ في الشرح)`, done: R`العناوين لسه [[vertical-rl]] و [[text-orientation]] رجعت [[mixed]]، وكل الشروط ✓.`, work: { h: 190, start: R`<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid silver; padding: 4px 8px; text-align: center; }
  thead th { writing-mode: vertical-rl; text-orientation: upright; }
</style>
<table>
  <thead><tr><td></td><th>السبت</th><th>الأحد</th><th>الاثنين</th></tr></thead>
  <tbody><tr><th>منى</th><td>✓</td><td>✓</td><td></td></tr></tbody>
</table>`, checks: [
              { say: R`العناوين لسه رأسية`, q: "thead th", style: ["writing-mode", "vertical-rl"] },
              { say: R`الحروف مبقتش «واقفة»: [[text-orientation: mixed]]`, q: "thead th", style: ["text-orientation", "mixed"] }
            ] }, sol: R`~~~live 89 بعد التصليح
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid silver; padding: 4px 8px; text-align: center; }
  thead th { writing-mode: vertical-rl; }
</style>
<table>
  <thead><tr><td></td><th>السبت</th><th>الأحد</th><th>الاثنين</th></tr></thead>
  <tbody><tr><th>منى</th><td>✓</td><td>✓</td><td></td></tr></tbody>
</table>
~~~

وده اللي كان باين قبل التصليح:

~~~live 175 قبل
<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid silver; padding: 4px 8px; text-align: center; }
  thead th { writing-mode: vertical-rl; text-orientation: upright; }
</style>
<table>
  <thead><tr><td></td><th>السبت</th><th>الأحد</th><th>الاثنين</th></tr></thead>
  <tbody><tr><th>منى</th><td>✓</td><td>✓</td><td></td></tr></tbody>
</table>
~~~

**هتشوف إيه:** قبل: كل يوم حروفه منفصلة ومتراصة تحت بعض (ا ل س ب ت)، والعمود طويل ومبيتقريش. بعد: كل يوم كلمة واحدة متصلة نايمة على جنبها، والعمود أقصر.

**ليه:** [[upright]] بتوقّف كل حرف لوحده. ده بيشتغل مع «MENU» ومبيشتغلش مع حروف شكلها بيعتمد على اتصالها.

**الغلطة الشائعة:** تشيل [[writing-mode]] كمان. المشكلة مش في الكتابة الرأسية، المشكلة في [[upright]].

~~~text القياس من Chrome
thead th   قبل: text-orientation: upright      بعد: text-orientation: mixed     writing-mode: vertical-rl
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** في مراجعة كود لقيت [[body { direction: rtl; }]] في ملف الـ CSS، و [[<html lang="ar">]] من غير [[dir]]. اكتب تعليق المراجعة في ٣ سطور: إيه الغلط، وإيه اللي ممكن يحصل، وإيه التصليح. (من قسم ٥ في الشرح)`, done: R`قلت إن الاتجاه معنى مش شكل، وذكرت حالة فشل الـ CSS وقارئ الشاشة، وكتبت السطر المتصلّح.`, sol: R`**تعليق نموذجي:**

1. الاتجاه جزء من معنى المحتوى، فمكانه الـ HTML. MDN بيقول صريح إن [[direction]] و [[unicode-bidi]] مش للاستخدام في صفحات الويب، وإن البديل [[dir]].
2. بالوضع الحالي: لو ملف الـ CSS اتأخر أو فشل، الصفحة العربي هتتعرض من الشمال لليمين وعلامات الترقيم هتروح في الناحية الغلط. وأي أداة بتقرا الـ HTML (قارئ شاشة، وضع القراية في المتصفح، ترجمة) مش هتعرف إن الصفحة RTL.
3. التصليح: امسح السطر من الـ CSS، واكتب:

~~~html
<html lang="ar" dir="rtl">
~~~

**وللمحتوى المختلط** (اسم إنجليزي وسط عربي، أو تعليقات مستخدمين): [[dir="ltr"]] أو [[dir="auto"]] على العنصر نفسه، أو [[<bdi>]]. مش [[unicode-bidi]].

~~~text اللي المتصفح بيعمله لوحده
<p dir="rtl">   →   direction: rtl      unicode-bidi: isolate      (من الـ stylesheet بتاع المتصفح)
~~~

يعني الخاصيتين شغالين في الخلفية، وإنت بتتحكم فيهم من الـ HTML.` }
          ]
        },
        {
          cmd: "font-variant و font-feature-settings",
          title: "الأشكال البديلة جوه الخط: أرقام الجداول، والـ small caps، والـ ligatures، والـ kerning",
          pre: [
            { to: "css/font-weight و font-style", why: R`[[font-synthesis-small-caps]] و [[font]] المختصرة اتشرحوا هناك، والدرس ده بيبني عليهم` },
            { to: "css/@font-face و font-display", why: R`جزء من خصائص الدرس ده بيشتغل بس مع خط محمّل بـ [[@font-face]]` }
          ],
          ref: [
            { t: "MDN: font-variant", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant" },
            { t: "MDN: font-variant-numeric", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-numeric" },
            { t: "MDN: font-variant-ligatures", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-ligatures" },
            { t: "MDN: font-feature-settings", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-feature-settings" },
            { t: "MDN: font-kerning", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-kerning" },
            { t: "MDN: @font-feature-values", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-feature-values" },
            { t: "MDN: font-palette", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-palette" },
            { t: "MDN: @font-palette-values", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-palette-values" },
            { t: "MDN: text-box-trim", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-trim" }
          ],
          desc: R`ملف الخط الواحد فيه أكتر من شكل لنفس الحرف: أرقام كلها بعرض واحد للجداول، وحروف كبيرة صغيّرة، وحرفين مدموجين في رسمة واحدة. دي اسمها OpenType features، و [[font-variant]] وإخواتها بيشغّلوها ويقفلوها بأسامي مفهومة. و [[font-feature-settings]] هي الطريقة الواطية لنفس الحاجة.
أكتر واحدة هتستخدمها فعلًا: [[font-variant-numeric: tabular-nums]] عشان أرقام الجدول تتراص تحت بعض. وفي آخر الدرس جدول مرجعي بخصائص النص النادرة اللي في المنهج.`,
          example: R`td.num { font-variant-numeric: tabular-nums; }
.price { font-variant-numeric: proportional-nums; }
abbr { font-variant-caps: all-small-caps; }
code { font-variant-ligatures: none; }
h1 { font-kerning: normal; }
.fancy { font-feature-settings: "ss01" 1; }`,
          flag: "script",
          lines: [
            R`خانات الأرقام في الجدول: كل رقم ياخد نفس العرض، فالآحاد تيجي تحت الآحاد والعشرات تحت العشرات.`,
            R`السعر وسط جملة: كل رقم بعرضه الطبيعي (الواحد أضيق من الصفر)، فالرقم يبان متماسك جوه الكلام.`,
            R`الاختصارات اللاتيني بحروف كبيرة مصغّرة (small caps) بدل حروف كبيرة عالية بتزعّق وسط السطر.`,
            R`الكود من غير دمج حروف: كل حرف يتعرض لوحده زي ما اتكتب، عشان [[!=]] متتحوّلش لرمز واحد.`,
            R`شغّل تظبيط المسافات بين أزواج الحروف (kerning) حتى لو المتصفح كان هيقفله للسرعة.`,
            R`تشغيل ميزة باسمها الخام من أربع حروف: [[ss01]] هي «الطقم الشكلي الأول» في الخط، لو موجود.`
          ],
          teach: R`## الفكرة في سطرين

مصمم الخط بيرسم لبعض الحروف أكتر من شكل، وبيحطهم في الملف تحت «ميزات» ليها أسامي من أربع حروف ([[tnum]] و [[smcp]] و [[liga]]). الـ CSS بيشغّلها بطريقتين: خصائص [[font-variant-*]] بأسامي مقروءة، أو [[font-feature-settings]] بالاسم الخام.

كل ده بيشتغل **لو الخط فيه الميزة**. لو مفيهوش، مفيش خطأ ومفيش تغيير. القياسات من Chrome 157 على Windows 11 بخطوط النظام، وعرض الكلمة هو الدليل: لما يتغيّر يبقى الشكل اتبدّل.

---

## ١. [[font-variant-numeric: tabular-nums]]

الأرقام في أغلب الخطوط ليها عرضين:

- **proportional**: كل رقم بعرضه الطبيعي. الـ 1 رفيع والـ 0 عريض. أحلى وسط الكلام.
- **tabular**: كل الأرقام بعرض واحد. أحسن في الجداول والعدّادات.

~~~live 146 نفس الأرقام: proportional ثم tabular (Segoe UI على Windows)
<style>
  table { font-family: "Segoe UI", system-ui, sans-serif; font-size: 20px; border-collapse: collapse; display: inline-table; margin: 0 12px; direction: ltr; }
  td { border-bottom: 1px solid silver; padding: 2px 6px; text-align: right; }
  .p td { font-variant-numeric: proportional-nums; }
  .t td { font-variant-numeric: tabular-nums; }
  caption { font-size: 13px; color: #b45309; }
</style>
<table class="p"><caption>proportional-nums</caption><tr><td>1,111.10</td></tr><tr><td>8,080.80</td></tr><tr><td>21.15</td></tr></table>
<table class="t"><caption>tabular-nums</caption><tr><td>1,111.10</td></tr><tr><td>8,080.80</td></tr><tr><td>21.15</td></tr></table>
~~~

**هتشوف إيه (على Windows):** في الجدول الأول السطر «1,111.10» أقصر بوضوح من «8,080.80»، والفاصلة والنقطة مش تحت بعض. في التاني الصفّين بنفس العرض بالظبط، وكل خانة رقم تحت اللي فوقها.

~~~text القياس من Chrome (عرض «1111» وعرض «0000» بحجم 100px)
                    الافتراضي          tabular-nums        proportional-nums
Segoe UI            215.6 / 215.6      215.6 / 215.6       155.9 / 215.6
Arial               200.2 / 222.5      222.5 / 222.5       154.9 / 222.5
Calibri             202.7 / 202.7      202.7 / 202.7       139.7 / 233.9
Candara             139.8 / 219.7      201.8 / 201.8       139.8 / 219.7
Tahoma              218.4 / 218.4      218.4 / 218.4       218.4 / 218.4       ← ملوش غير شكل واحد
~~~

اللي الجدول بيقوله: **الافتراضي بيختلف من خط لخط.** Segoe UI أرقامه tabular من الأول، و Candara proportional من الأول. فلو مكتبتش حاجة، جدولك هيتراص مع خط ويتلخبط مع خط تاني. اكتب [[tabular-nums]] على أي أرقام تحت بعض.

باقي القيم، وممكن تتجمع في نفس السطر:

| القيمة | معناها | الميزة |
|---|---|---|
| [[lining-nums]] | أرقام بارتفاع الحروف الكبيرة (المعتاد) | [[lnum]] |
| [[oldstyle-nums]] | أرقام «نازلة وطالعة» زي الحروف الصغيرة، لنص كتاب | [[onum]] |
| [[proportional-nums]] و [[tabular-nums]] | عرض طبيعي، أو عرض موحّد | [[pnum]] و [[tnum]] |
| [[diagonal-fractions]] و [[stacked-fractions]] | «1/2» تتعرض كسر حقيقي | [[frac]] و [[afrc]] |
| [[ordinal]] | «1st» تتعرض والـ st مرفوعة | [[ordn]] |
| [[slashed-zero]] | صفر جواه شرطة، عشان يتفرّق عن حرف O | [[zero]] |

~~~text القياس من Chrome (100px)
«1/2 3/4» بـ Segoe UI:    321.0  →  diagonal-fractions 207.0      (اتحوّلت لكسور)
«1st 2nd» بـ Calibri:     300.5  →  ordinal 247.3
«1st 2nd» بـ Segoe UI:    327.0  →  ordinal 327.0                 (الخط مفيهوش الميزة: مفيش تغيير)
~~~

### الأرقام العربي ١٢٣

حاجتين لازم تتعرفوا:

**الأولى: CSS مبيحوّلش 123 لـ ١٢٣.** دول حروف مختلفة في Unicode (الـ 1 كوده [[U+0031]] والـ ١ كوده [[U+0661]])، مش شكلين لنفس الحرف. مفيش قيمة في [[font-variant-numeric]] بتبدّل بينهم. الرقم بيتعرض بالنظام اللي **اتكتب** بيه. الاستثناء الوحيد أرقام بيولّدها الـ CSS نفسه: [[list-style-type: arabic-indic]] و [[counter(x, arabic-indic)]] (درس «list-style و ::marker»). تحويل أرقام المحتوى شغل اللي بيكتب أو شغل JavaScript.

**التانية: [[tabular-nums]] مش مضمونة على الأرقام العربي.**

~~~text القياس من Chrome (عرض «١١١١» وعرض «٠٠٠٠» بحجم 100px)
                 الافتراضي           tabular-nums
Segoe UI         100.2 / 166.8       100.2 / 166.8      ← الواحد أضيق من الصفر، والخاصية مغيّرتش حاجة
Tahoma           228.7 / 228.7       228.7 / 228.7      ← عرض موحّد من الأول
Calibri          203.1 / 203.1       203.1 / 203.1
~~~

في Segoe UI الأرقام العربي proportional ومفيش ليها نسخة tabular، فعمود أرقام ١٢٣ مش هيتراص مهما كتبت. في Tahoma و Calibri موحّدة أصلًا. يعني جدول بأرقام عربي محتاج تجرّبه بالخط اللي هتستخدمه، مش تفترض.

---

## ٢. [[font-variant-caps: small-caps]]

Small caps: حروف شكلها كبير (A B C) وارتفاعها قد الحروف الصغيرة. بتتستخدم للاختصارات وأول كلمات الفصل في الكتب.

| القيمة | معناها |
|---|---|
| [[small-caps]] | الحروف الصغيرة تبقى small caps، والكبيرة تفضل كبيرة |
| [[all-small-caps]] | الكل small caps، حتى اللي اتكتب كبير |
| [[petite-caps]] و [[all-petite-caps]] | نسخة أصغر شوية (قليل من الخطوط فيها) |
| [[unicase]] | خليط: الكبيرة تبقى small caps والصغيرة تفضل |
| [[titling-caps]] | حروف كبيرة مرسومة للعناوين الكبيرة |

~~~live 77 small-caps على إنجليزي وعلى عربي
<style>
  p { font-size: 22px; margin: 4px 0; font-variant-caps: small-caps; }
</style>
<p lang="en" style="font-family: 'Segoe UI', sans-serif">Hello World من مصر</p>
<p lang="en" style="font-family: Tahoma, sans-serif">Hello World من مصر</p>
~~~

**هتشوف إيه:** «ello» و «orld» بقوا حروف كبيرة قصيّرة جنب الـ H والـ W العاليين. و «من مصر» زي ما هي: العربي ملوش حروف كبيرة، فمفيش small caps.

~~~text القياس من Chrome («Hello World» بحجم 100px)
              عادي      small-caps     small-caps + font-synthesis-small-caps: none
Segoe UI      523.7     589.6          589.6      ← الخط فيه small caps حقيقية
Tahoma        506.6     522.1          506.6      ← مفبركة (حروف كبيرة متصغّرة)، ولما منعنا الفبركة رجعت عادي
~~~

لو الخط مفيهوش small caps، المتصفح بيفبركها بإنه يصغّر الحروف الكبيرة، فبتطلع أرفع من اللي جنبها. [[font-synthesis-small-caps: none]] بتمنع ده (درس «font-weight و font-style»).

---

## ٣. [[font-variant-ligatures: none]]

الـ ligature: حرفين أو أكتر بيتدمجوا في رسمة واحدة. في اللاتيني أشهرهم «fi» (نقطة الـ i بتدخل في رأس الـ f).

| القيمة | بتتحكم في |
|---|---|
| [[normal]] | الافتراضي: الشائع شغال والباقي مقفول |
| [[none]] | اقفل كل الاختياري |
| [[common-ligatures]] و [[no-common-ligatures]] | الشائع ([[liga]]): fi و fl |
| [[discretionary-ligatures]] و [[no-discretionary-ligatures]] | الزخرفي ([[dlig]]): ct و st |
| [[historical-ligatures]] و [[no-historical-ligatures]] | أشكال قديمة ([[hlig]]) |
| [[contextual]] و [[no-contextual]] | أشكال بتتغيّر حسب اللي جنبها ([[calt]])، ومنها دمج [[!=]] في خطوط الكود |

**في العربي الموضوع أكبر.** الخط العربي فيه نوعين:

- **إجباري** ([[rlig]]): زي «لا» (اللام والألف). من غيره الكتابة غلط. [[font-variant-ligatures]] مبتلمسوش.
- **اختياري** ([[liga]]): زي لفظ الجلالة «الله» في رسمة واحدة، و «لم» و «لج» في خطوط النسخ. ده اللي [[none]] بتقفله.

~~~live 118 Traditional Arabic: عادي ثم ligatures: none (على Windows)
<style>
  p { font-family: "Traditional Arabic", serif; font-size: 34px; margin: 0; }
</style>
<p>الله لا إله إلا هو · محمد</p>
<p style="font-variant-ligatures: none">الله لا إله إلا هو · محمد</p>
~~~

**هتشوف إيه (على Windows):** في السطر الأول «الله» مرسومة بالشكل المدموج المعروف بالشدّة فوقها، و «محمد» الميم راكبة على الحاء. في التاني «الله» حروف عادية جنب بعض، و «محمد» ممدودة على السطر. و «لا» سليمة في الاتنين.

~~~text القياس من Chrome (جملة فيها «الله» و «لا» و «محمد»، 100px)
                      عادي       ligatures: none     "rlig" 0 (بالقوة)
Traditional Arabic    739.2      834.2               721.2
Arabic Typesetting    583.2      661.6               569.6
Segoe UI              1166.4     1183.1              1166.4
~~~

العمود الأخير تجربة بس: قفلنا الإجباري بـ [[font-feature-settings: "rlig" 0]] والعرض اتغيّر، يعني «لا» اتفكّت. متعملهاش.

متى تقفل: الكود ([[code { font-variant-ligatures: none; }]]) عشان كل حرف يبان زي ما اتكتب. وافتكر إن أي [[letter-spacing]] غير الصفر بتقفلهم لوحدها (درس «text-align و text-transform»: اتقاس نفس الرقم 834.3).

---

## ٤. [[font-variant-position: sub]]

بتستخدم حروف **مرسومة أصلًا** صغيرة ومرفوعة أو نازلة (للـ H₂O والـ x²)، بدل ما المتصفح يصغّر حرف عادي ويحرّكه زي [[<sub>]] و [[<sup>]].

~~~text القياس من Chrome («H2O x2» بحجم 100px)
              عادي      font-variant-position: sub      super
Calibri       295.8     261.6                           206.1      ← الخط فيه الأشكال دي
Arial         339.0     339.0                           339.0      ← مفيهوش: مفيش أي تغيير
~~~

القيم: [[normal]] و [[sub]] و [[super]]. المواصفة بتقول إن المتصفح المفروض يفبركها لو الخط مفيهوش. Chrome 157 مفبركش (Arial فضل زي ما هو). فالطريق المضمون لسه [[<sub>]] و [[<sup>]] (درس «sub و sup و br»)، والخاصية دي تحسين لو خطك فيه الأشكال.

---

## ٥. [[font-variant-alternates]] و [[@font-feature-values]]

بعض الخطوط فيها «أطقم شكلية» (stylistic sets): نفس الحروف برسمة تانية خالص، مرقّمة من [[ss01]] لـ [[ss20]]. المشكلة إن الرقم ملوش معنى: [[ss06]] في خط زخرفة، وفي خط تاني صفر بشرطة.

[[@font-feature-values]] بتدّي الرقم **اسم** خاص بخط معين، و [[font-variant-alternates]] بتستخدم الاسم:

~~~css
@font-feature-values "Hebr Display" {
  @styleset { flourish: 6; }
}

h1 {
  font-family: "Hebr Display", serif;
  font-variant-alternates: styleset(flourish);
}
~~~

| القيمة | الميزة |
|---|---|
| [[styleset(اسم)]] | طقم شكلي ([[ss01]] لـ [[ss20]]) |
| [[character-variant(اسم)]] | شكل بديل لحرف واحد ([[cv01]] لـ [[cv99]]) |
| [[stylistic(اسم)]] | أشكال بديلة ([[salt]]) |
| [[swash(اسم)]] | ذيول زخرفية ([[swsh]]) |
| [[ornaments(اسم)]] و [[annotation(اسم)]] | زخارف، وأرقام في دواير |
| [[historical-forms]] | أشكال تاريخية ([[hist]])، ودي من غير اسم |

~~~text القياس من Chrome (خط Gabriola: فيه 7 أطقم. اتشاف في صورة للصفحة)
الخط محمّل بـ @font-face، و @font-feature-values بنفس الاسم:
   font-variant-alternates: styleset(flourish)      →  الحروف طلعلها ذيول زخرفية، زي font-feature-settings: "ss06"

نفس الخط باسمه من الجهاز (من غير @font-face):
   font-variant-alternates: styleset(flourish)      →  مفيش تغيير
   font-feature-settings: "ss06"                    →  اشتغلت
~~~

يعني في Chrome 157 الأسامي دي اشتغلت مع الخط **المحمّل** بس. الفايدة منها تنظيم: لو غيّرت الخط، بتغيّر رقم الطقم في مكان واحد.

---

## ٦. [[font-variant-east-asian]] والمختصرة [[font-variant]]

[[font-variant-east-asian]] بتختار أشكال الحروف الصينية واليابانية: [[jis78]] و [[jis83]] و [[jis90]] و [[jis04]] (معايير يابانية بسنين مختلفة)، و [[simplified]] و [[traditional]]، و [[full-width]] و [[proportional-width]]، و [[ruby]]. ملهاش أي أثر على عربي أو لاتيني.

و [[font-variant]] المختصرة بتجمع كل اللي فات:

~~~text القياس من Chrome (المحسوب)
font-variant: small-caps tabular-nums slashed-zero no-common-ligatures
  → font-variant-caps: small-caps
    font-variant-numeric: tabular-nums slashed-zero
    font-variant-ligatures: no-common-ligatures
    font-variant-east-asian / alternates / position: normal

font-variant-numeric: tabular-nums;  وبعدها  font: 16px Arial;
  → font-variant-numeric: normal          ← font المختصرة مسحتها
~~~

السطر الأخير نفس فخ [[line-height]]: [[font]] بتصفّر كل [[font-variant-*]]. اكتبهم **بعدها**.

---

## ٧. [[font-feature-settings: "tnum" 1]]

الطريقة الواطية: اسم الميزة بين تنصيص، وبعده [[1]] (شغّل) أو [[0]] (اقفل). الرقم لو مكتبتوش يبقى 1.

~~~css
.table { font-feature-settings: "tnum" 1, "zero" 1; }
~~~

MDN بيقول: استخدم [[font-variant-*]] لما يبقى فيه خاصية للميزة، وسيب دي لآخر حل. والسبب الأكبر إنها **قيمة واحدة مبتتجمعش**:

~~~text القياس من Chrome
.parent { font-feature-settings: "tnum"; }
.child  { font-feature-settings: "smcp"; }
  → المحسوب عند الابن: "smcp"          ← "tnum" ضاعت: قيمة الابن بدّلت قيمة الأب كلها

.parent { font-variant-numeric: tabular-nums; }
.child  { font-variant-caps: small-caps; }
  → الابن: tabular-nums + small-caps   ← خاصيتين منفصلتين، كل واحدة ورثت لوحدها
~~~

وكمان [[font-feature-settings]] بتغلب [[font-variant-*]] لو الاتنين على نفس الميزة، وبتغلب القفل التلقائي (زي قفل الـ ligatures مع [[letter-spacing]]).

إمتى تحتاجها: ميزة ملهاش خاصية، زي طقم شكلي في خط من الجهاز ([["ss01"]])، أو ميزة خاصة بخط معين.

---

## ٨. [[font-kerning: normal]]

الـ kerning: تظبيط المسافة بين **زوج حروف معين**. «AV» من غيره بينهم فجوة، فالخط بيقرّبهم.

~~~text القياس من Chrome («AVATAR To We.» بحجم 100px)
              font-kerning: auto     font-kerning: none
Segoe UI      660.6                  701.0
Arial         705.8                  750.2
Georgia       736.8                  736.8        ← الخط مفيهوش جدول kerning
~~~

| القيمة | معناها |
|---|---|
| [[auto]] | الافتراضي: المتصفح يقرر (وفي Chrome شغال) |
| [[normal]] | شغّله دايمًا حتى لو المتصفح كان هيقفله |
| [[none]] | اقفله خالص: كل حرف بعرضه الأصلي |

في العربي الـ kerning بيظبط حالات زي الراء والواو لما ينزلوا تحت الحرف اللي بعدهم. سيبه شغال. [[none]] بتفيد بس لما تبقى عايز عرض ثابت متوقّع لكل حرف (عدّاد بيتحرك).

---

## ٩. [[font-palette]] و [[@font-palette-values]]

**الخطوط الملوّنة** (color fonts) كل حرف فيها مرسوم بأكتر من لون (إيموجي، خطوط زينة). الملف بيبقى فيه «لوحات ألوان» (palettes) جاهزة.

~~~css
@font-palette-values --warm {
  font-family: "Hebr Color";
  base-palette: 1;
  override-colors: 0 #b45309, 2 #fde68a;
}

h1 {
  font-family: "Hebr Color";
  font-palette: --warm;
}
~~~

- [[font-palette]]: [[normal]] (اللوحة الأساسية)، أو [[light]] أو [[dark]] (لوحة المصمم للخلفية الفاتحة أو الغامقة)، أو اسم لوحة من عندك.
- [[@font-palette-values --اسم]]: بتعرّف لوحة لخط معين: [[base-palette]] (ابدأ من اللوحة رقم كام) و [[override-colors]] (بدّل اللون رقم كذا).

### [[palette-mix()]]

دالة بتتكتب قيمة لـ [[font-palette]] وبتخلط لوحتين، بنفس فكرة [[color-mix()]]: [[font-palette: palette-mix(in srgb, light, dark)]]. بتفيد في الحركة من لوحة للتانية (من الفاتح للغامق مثلًا). المنهج مش حاططها Baseline.

~~~text القياس من Chrome 157
CSS.supports("font-palette", "dark")                                    true
CSS.supports("font-palette", "palette-mix(in srgb, normal, dark)")      true
المحسوب: font-palette: --warm       (الاسم اتقبل)
~~~

المتصفح قبل الصيغة. الشكل نفسه **متشافش هنا**: جرّبنا على خط الإيموجي بتاع Windows ومفيش لون اتغيّر (الخط ده مش معمول بلوحات تتبدّل). فشرح النتيجة من MDN، ومحتاج خط ملوّن فيه لوحات عشان تجرّبه. استخدامها قليل جدًا في مواقع النصوص.

---

## ١٠. جدول مرجعي: خصائص نص نادرة في المنهج

دي خصائص المنهج ذاكرها، وصعب تحتاجها في صفحة مقالات. اعرف إنها موجودة وبتعمل إيه. عمود الدعم: نتيجة [[CSS.supports]] في Chrome 157، وتصنيف Baseline من المنهج.

| الخاصية | بتعمل إيه | الدعم |
|---|---|---|
| [[text-box-trim: trim-both]] | بتقص الفراغ اللي فوق وتحت الحروف جوه صندوق النص، عشان الكلام يتوسّط بالظبط في زرار أو يلزق في حافة | Chrome ✓، Baseline حديثة |
| [[text-box-edge: cap alphabetic]] | بتحدد القص لحد فين: أعلى الحروف الكبيرة ([[cap]]) وخط الكتابة ([[alphabetic]]) | Chrome ✓، Baseline حديثة |
| [[text-box: trim-both cap alphabetic]] | مختصرة الاتنين اللي فوق | Chrome ✓، Baseline حديثة |
| [[dominant-baseline: central]] | في نص SVG: أنهي خط من الحرف يقعد على الإحداثي. [[central]] بتوسّط النص رأسيًا | Chrome ✓، Baseline |
| [[alignment-baseline: middle]] | لعنصر جوه سطر (وأساسًا في SVG): أنهي خط منه يتحاذى مع خط الأب | Chrome ✓، Baseline حديثة |
| [[baseline-shift: sub]] | بترفع أو تنزّل خط الكتابة لحتة من النص. في SVG، وهي الجزء «الإزاحة» من [[vertical-align]] | Chrome ✓، Baseline حديثة |
| [[ruby-position: under]] | مكان شرح النطق في [[<ruby>]] (ياباني وصيني): فوق النص أو تحته | Chrome ✓ ([[alternate]] لأ)، Baseline حديثة |
| [[ruby-align: center]] | توزيع حروف شرح النطق فوق النص الأساسي | Chrome ✓، Baseline حديثة |
| [[math-style: compact]] | في MathML: المعادلة بالشكل المضغوط (جوه سطر) ولا العادي | Chrome ✓، Baseline |
| [[math-depth: add(1)]] | في MathML: مستوى التداخل (الأس جوه الأس)، وبيصغّر الخط معاه | Chrome ✓، Baseline حديثة |
| [[text-decoration-inset: 2px]] | بتقصّر الخط اللي تحت الكلام من طرفيه | Chrome ✓، مش Baseline |
| [[font-variant-emoji: text]] | الرمز يتعرض كحرف عادي ولا كإيموجي ملوّن | Chrome ✓، مستبعدة من المنهج |

الوحيدة اللي ليها مستقبل في الشغل اليومي [[text-box-trim]]: بتحل مشكلة «الكلام مش في نص الزرار بالظبط». الباقي تخصصات: SVG، و [[<ruby>]]، و MathML.

---

## ١١. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| جدول أرقام من غير [[tabular-nums]] | بيتراص مع خط ويتلخبط مع خط تاني |
| افتراض إن [[tabular-nums]] شغالة على ١٢٣ | في خطوط (Segoe UI) الأرقام العربي مش موحّدة العرض |
| انتظار إن CSS يحوّل 123 لـ ١٢٣ | مبيحصلش: حروف مختلفة |
| [[font-feature-settings]] على أب وابن | قيمة الابن مسحت قيمة الأب |
| [[font-variant-*]] قبل [[font]] المختصرة | اتصفّرت كلها ورجعت [[normal]] |
| [[font-variant-ligatures: none]] على نص عربي | «الله» و «محمد» اتفكّوا |
| [[small-caps]] على خط مفيهوش | حروف كبيرة متصغّرة وأرفع من اللي حواليها |
| ميزة مش في الخط | ولا حاجة، ومفيش رسالة |

---

## الخلاصة

- الميزات جوه ملف الخط. الخاصية بتشغّلها لو موجودة، وبتسكت لو مش موجودة.
- [[font-variant-numeric: tabular-nums]] لأي أرقام تحت بعض. وجرّبها لو الأرقام ١٢٣.
- CSS مبيغيّرش نظام الأرقام في المحتوى.
- [[font-variant-ligatures: none]] للكود بس. في العربي بتفك «الله».
- [[font-variant-*]] الأول، و [[font-feature-settings]] لما مفيش خاصية. والتانية مبتتجمعش بين الأب والابن.
- كل [[font-variant-*]] تتكتب بعد [[font]].`,
          try: R`اعمل [[nums.html]] فيه جدول من عمودين: اسم المنتج وسعره، وخمس أسعار بأطوال مختلفة فيها أرقام 1 كتير وأرقام 0 و 8 (زي 1,110.10 و 8,080.80). حاذي عمود السعر لنهاية الخانة. جرّب الجدول بخط [[Candara]] أو [[Arial]] من غير حاجة، وبعدين زوّد [[font-variant-numeric: tabular-nums]] على خانات السعر. وبعدين اكتب نفس الأسعار بأرقام ١٢٣ وغيّر الخط بين Segoe UI و Tahoma.`,
          sol: R`~~~live 202 nums.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أرقام الجدول</title>
<style>
  body { font-family: Candara, Arial, sans-serif; font-size: 18px; }
  table { border-collapse: collapse; }
  th, td { border-bottom: 1px solid silver; padding: 4px 12px; text-align: start; }
  td.num { text-align: end; font-variant-numeric: tabular-nums; }
</style>
</head>
<body>
<table>
  <tr><th>المنتج</th><th>السعر</th></tr>
  <tr><td>لابتوب</td><td class="num">21,110.10</td></tr>
  <tr><td>شاشة</td><td class="num">8,080.80</td></tr>
  <tr><td>كيبورد</td><td class="num">1,111.00</td></tr>
  <tr><td>ماوس</td><td class="num">411.50</td></tr>
  <tr><td>كابل</td><td class="num">71.15</td></tr>
</table>
</body>
</html>
~~~

**هتشوف إيه:**

- بـ [[tabular-nums]]: الفواصل تحت بعض، والنقط العشرية تحت بعض، وكل خانة رقم في عمودها.
- من غيرها (بـ Candara أو Arial): السطر اللي فيه أرقام 1 كتير أقصر، والفواصل متزحزحة عن اللي تحتها.
- بأرقام ١٢٣: مع Tahoma متراصة، ومع Segoe UI الواحدات أضيق والعمود متعرّج، و [[tabular-nums]] مبتصلّحوش.

~~~text القياس من Chrome (عرض «1111» وعرض «0000»، 100px)
Candara   الافتراضي 139.8 / 219.7      tabular-nums 201.8 / 201.8
Arial     الافتراضي 200.2 / 222.5      tabular-nums 222.5 / 222.5
~~~

**ليه [[text-align: end]]؟** الأرقام بتتقارن من آخرها (الآحاد والكسور)، فلازم آخر كل رقم يبقى عند نفس الحافة. و [[end]] في جدول عربي هي الشمال، وفي نسخة إنجليزي هتبقى اليمين من غير تعديل.`,
          deep: {
            why: R`أغلب خصائص الدرس ده تحسينات صغيرة للشكل، بس واحدة منهم بتفرق في الشغل اليومي: عمود أرقام مش متراص بيخلّي قراية الجدول المالي صعبة ومقارنة رقمين محتاجة تركيز. والدرس كمان بيجاوب سؤالين بيتسألوا كتير من اللي بيعمل مواقع عربي: «أحوّل الأرقام لعربي بالـ CSS إزاي؟» (مينفعش)، و «ليه لفظ الجلالة شكله اتغيّر؟» (حاجة قفلت الـ ligatures).`,
            how: R`ملف الخط OpenType فيه جداول «استبدال» (GSUB) و «تموضع» (GPOS). كل ميزة مجموعة قواعد: «لو f وبعدها i، حط الرسمة fi»، أو «لو الرقم 1، حط النسخة العريضة». محرك تشكيل النص (shaper) بيمشي على النص بعد ما يتقسّم لحتت بنفس الخط واللغة والاتجاه، ويطبّق الميزات المفعّلة بالترتيب. فيه ميزات مفعّلة افتراضيًا ([[liga]] و [[kern]] و [[calt]]، و [[rlig]] وأشكال الاتصال في العربي)، والباقي مقفول لحد ما CSS يطلبه. [[font-variant-*]] بتتحوّل لقايمة ميزات، وفوقها [[font-feature-settings]]. واللغة ([[lang]]) بتدخل في الاختيار: بعض الخطوط فيها قواعد خاصة بلغة (ميزة [[locl]])، وده سبب تاني إن [[lang]] يتكتب صح.`,
            when: R`[[tabular-nums]]: جداول، أسعار تحت بعض، عدّادات ومؤقتات بتتغيّر (عشان الرقم ميترعش). [[slashed-zero]]: أكواد وأرقام مسلسلة. [[small-caps]]: اختصارات لاتيني وسط نص. [[font-variant-ligatures: none]]: كود. [[font-feature-settings]]: طقم شكلي في خط معين. والباقي لما مصمم يطلبه بالاسم.`,
            mistakes: R`نسيان [[tabular-nums]]. افتراضها على الأرقام العربي. [[font-feature-settings]] متكررة في الوراثة. كتابة [[font-variant-*]] قبل [[font]]. قفل الـ ligatures على نص عربي. وافتراض إن ميزة موجودة في خط من غير تجربة.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** جدول مصاريف الشهر. خلّي خانات المبلغ [[td.num]] أرقامها بعرض موحّد ومحاذية لنهاية الخانة، عشان الأرقام تتراص. (من قسم ١ في الشرح)`, done: R`خانات المبلغ [[tabular-nums]] و [[text-align: end]]، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  table { font-family: Arial, sans-serif; font-size: 18px; border-collapse: collapse; }
  td { border-bottom: 1px solid silver; padding: 4px 12px; }
  td.num { }
</style>
<table>
  <tr><td>إيجار</td><td class="num">4,111.00</td></tr>
  <tr><td>كهربا</td><td class="num">880.50</td></tr>
  <tr><td>نت</td><td class="num">411.10</td></tr>
</table>`, checks: [
              { say: R`أرقام المبلغ بعرض موحّد`, q: "td.num", style: ["font-variant-numeric", "tabular-nums"] },
              { say: R`ومحاذية لنهاية الخانة`, q: "td.num", style: ["text-align", "end"] },
              { say: R`خانات الاسم متغيّرتش`, q: "td:not(.num)", style: ["font-variant-numeric", "normal"] }
            ] }, sol: R`~~~live 106 الحل
<style>
  table { font-family: Arial, sans-serif; font-size: 18px; border-collapse: collapse; }
  td { border-bottom: 1px solid silver; padding: 4px 12px; }
  td.num { font-variant-numeric: tabular-nums; text-align: end; }
</style>
<table>
  <tr><td>إيجار</td><td class="num">4,111.00</td></tr>
  <tr><td>كهربا</td><td class="num">880.50</td></tr>
  <tr><td>نت</td><td class="num">411.10</td></tr>
</table>
~~~

**هتشوف إيه:** الأرقام لازقة في حافة العمود الشمال، والنقطة العشرية في التلات صفوف على خط رأسي واحد.

**ليه الاتنين مع بعض:** المحاذاة بتخلّي آخر الرقم عند نفس الحافة. والعرض الموحّد بيخلّي كل خانة قبله تيجي تحت أختها. واحدة من غير التانية متكفيش.

**الغلطة الشائعة:** [[font-family: monospace]] للأرقام. هتتراص، بس بخط تاني شكله غريب وسط الجدول. [[tabular-nums]] بتدّيك التراص بنفس الخط.

~~~text القياس من Chrome (Arial: عرض «1111» وعرض «0000» بحجم 100px)
الافتراضي       200.2 / 222.5
tabular-nums    222.5 / 222.5
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الجدول عليه [[font-feature-settings: "tnum"]] عشان الأرقام تتراص، وخانة الرمز [[.code]] عليها [[font-feature-settings: "smcp"]] عشان small caps. النتيجة إن خانة الرمز أرقامها مبقتش موحّدة. حوّل الاتنين لخصائص [[font-variant-*]] عشان يتجمعوا. (من قسم ٧ في الشرح)`, done: R`[[.code]] عليها [[tabular-nums]] (ورثتها) و [[small-caps]] مع بعض، ومفيش [[font-feature-settings]] في الكود، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  table { font-family: "Segoe UI", Arial, sans-serif; font-size: 18px; border-collapse: collapse; font-feature-settings: "tnum"; }
  td { border-bottom: 1px solid silver; padding: 4px 12px; }
  .code { font-feature-settings: "smcp"; }
</style>
<table>
  <tr><td class="code" lang="en">ab-1101</td><td>شنطة ضهر</td></tr>
  <tr><td class="code" lang="en">cd-8080</td><td>محفظة</td></tr>
</table>`, checks: [
              { say: R`خانة الرمز small caps`, q: ".code", style: ["font-variant-caps", "small-caps"] },
              { say: R`وأرقامها لسه موحّدة العرض (ورثتها من الجدول)`, q: ".code", style: ["font-variant-numeric", "tabular-nums"] },
              { say: R`مفيش [[font-feature-settings]] في الكود`, nosrc: "font-feature-settings" }
            ] }, sol: R`~~~live 82 بعد التصليح
<style>
  table { font-family: "Segoe UI", Arial, sans-serif; font-size: 18px; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  td { border-bottom: 1px solid silver; padding: 4px 12px; }
  .code { font-variant-caps: small-caps; }
</style>
<table>
  <tr><td class="code" lang="en">ab-1101</td><td>شنطة ضهر</td></tr>
  <tr><td class="code" lang="en">cd-8080</td><td>محفظة</td></tr>
</table>
~~~

**هتشوف إيه:** الرموز «AB-1101» و «CD-8080» بحروف كبيرة قصيّرة، وأرقامهم تحت بعض بالظبط.

**ليه:** [[font-feature-settings]] خاصية واحدة بقيمة واحدة. [[.code]] كتبت قيمتها، فغلبت القيمة اللي كانت هتتورّث من الجدول كلها، و [["tnum"]] ضاعت. [[font-variant-numeric]] و [[font-variant-caps]] خاصيتين مختلفتين، فكل واحدة بتتورّث وتتحسب لوحدها.

**حل تاني (أضعف):** [[.code { font-feature-settings: "tnum", "smcp"; }]]. هيشتغل، ولازم تفتكر تكرر كل ميزات الأب في كل ابن.

**الغلطة الشائعة:** تفتكر إن القيمتين «بيتجمعوا» زي الـ classes.

~~~text القياس من Chrome
              قبل: font-feature-settings        بعد
.code         "smcp"   (tnum ضاعت)             font-variant-numeric: tabular-nums   font-variant-caps: small-caps
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مدوّنة تقنية كتبت [[body { font-variant-ligatures: none; }]] عشان الكود. النتيجة إن الاقتباس العربي اللي فيه لفظ الجلالة اتعرض بحروف مفكوكة. رجّع الـ ligatures للنص، واقفلها للكود بس. (من قسم ٣ في الشرح)`, done: R`الفقرة [[font-variant-ligatures: normal]] و [[code]] لسه [[none]]، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  body { font-variant-ligatures: none; }
  blockquote { font-family: "Traditional Arabic", serif; font-size: 30px; margin: 6px 0; }
  code { font-size: 18px; }
</style>
<blockquote>إن شاء الله خير</blockquote>
<p>والشرط في الكود: <code>if (a != b)</code></p>`, checks: [
              { say: R`الاقتباس رجعتله الـ ligatures`, q: "blockquote", style: ["font-variant-ligatures", "normal"] },
              { say: R`الكود لسه من غير ligatures`, q: "code", style: ["font-variant-ligatures", "none"] }
            ] }, sol: R`~~~live 105 بعد التصليح
<style>
  code { font-variant-ligatures: none; }
  blockquote { font-family: "Traditional Arabic", serif; font-size: 30px; margin: 6px 0; }
  code { font-size: 18px; }
</style>
<blockquote>إن شاء الله خير</blockquote>
<p>والشرط في الكود: <code>if (a != b)</code></p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 105 قبل
<style>
  body { font-variant-ligatures: none; }
  blockquote { font-family: "Traditional Arabic", serif; font-size: 30px; margin: 6px 0; }
  code { font-size: 18px; }
</style>
<blockquote>إن شاء الله خير</blockquote>
<p>والشرط في الكود: <code>if (a != b)</code></p>
~~~

**هتشوف إيه (على Windows، بخط Traditional Arabic):** قبل: «الله» ألف ولامين وهاء جنب بعض. بعد: «الله» بالرسمة المدموجة المعروفة. والكود زي ما هو في الحالتين.

**ليه:** الخاصية بتتورّث، فلما اتحطت على [[body]] قفلت الدمج الاختياري في كل نص الصفحة. الكود هو اللي محتاج القفل، فالقاعدة مكانها [[code]].

**الغلطة الشائعة:** تسيب قاعدة [[body]] وتزوّد [[blockquote { font-variant-ligatures: normal; }]]. هيتصلّح الاقتباس، وكل عنوان وفقرة عربي تانية هيفضلوا مفكوكين.

~~~text القياس من Chrome (جملة فيها «الله» و «محمد» بـ Traditional Arabic، 100px)
normal    739.2
none      834.2
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** العميل قال: «عايز كل الأرقام في الموقع تبقى عربي ١٢٣، اعملها من الـ CSS عشان منغيّرش المحتوى». اكتب ردّك في ٣ سطور: ليه مينفعش، وإيه اللي الـ CSS يقدر عليه، وإيه الحلول. (من قسم ١ في الشرح: «الأرقام العربي ١٢٣»)`, done: R`قلت إنهم حروف مختلفة في Unicode، وذكرت القوايم والعدّادات كاستثناء، واقترحت حل من المحتوى أو من الكود.`, sol: R`**ردّ نموذجي:**

1. مينفعش من الـ CSS: الـ 1 والـ ١ **حرفين مختلفين** (زي الفرق بين A و أ)، مش شكلين لنفس الحرف. الـ CSS بيغيّر شكل الحرف، مبيبدّلش حرف بحرف. ومفيش قيمة في [[font-variant-numeric]] للموضوع ده.
2. اللي الـ CSS يقدر عليه: الأرقام اللي **هو** بيولّدها. ترقيم القوايم ([[list-style-type: arabic-indic]]) والعدّادات ([[counter(x, arabic-indic)]]). دول هيبقوا ١ ٢ ٣ بسطر واحد.
3. لأرقام المحتوى فيه طريقين: تتكتب عربي من الأول في المحتوى (الأنضف، وبيتنسخ ويتبحث عنه صح)، أو الكود اللي بيعرض الأرقام (أسعار، تواريخ، عدّادات) يحوّلها وهو بيطبعها: في JavaScript [[new Intl.NumberFormat("ar-EG").format(1234)]] بترجّع [[١٬٢٣٤]].

**وسؤال لازم يتسأل قبل الشغل:** الأرقام اللي المستخدم هيكتبها (تليفون، كمية) هتتقبل بالنظامين؟ والـ [[<input type="number">]] بيعرض إيه؟ توحيد العرض سهل، وتوحيد الإدخال قرار تاني.

~~~text القياس من Chrome
عرض «1111» بـ Segoe UI: 215.6       عرض «١١١١»: 100.2        ← رسمتين مختلفتين خالص لحرفين مختلفين
~~~

**ملحوظة للجداول:** لو الأرقام بقت ١٢٣، جرّب تراصّها بالخط المختار. في Segoe UI مش موحّدة العرض.` }
          ]
        },
      ]
    }
]);
