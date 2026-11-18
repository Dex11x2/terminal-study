// من الملف للمتصفح: أول مشروع HTML على جهازك (وحدة من منهج syllabus/css.json)
MORE("css", [
    {
      t: R`HTML: من الملف للمتصفح`,
      l: 1,
      n: "الطريق كله على جهازك: فولدر وملف من الترمنال، وكتابة في VS Code، وفتح في Chrome، وفحص قبل ما تقول خلصت",
      pre: [
        { to: "css/مقدمة HTML والـ Tags", why: R`لازم تكون عارف الـ tag والعنصر والـ attribute، لأن الوحدة دي مش بتشرح HTML نفسه: بتشرح بتكتبه فين وبتشوفه إزاي` },
        { to: "css/<!doctype html>", why: R`هيكل الصفحة ([[<head>]] و [[<body>]] و charset و viewport) هو اللي VS Code هيكتبهولك هنا بضغطة، فلازم تكون فاهم كل سطر فيه` },
        { to: "start", why: R`لو عمرك ما فتحت ترمنال قبل كده` },
      ],
      goal: [
        R`تعمل فولدر مشروع وملفاته من الترمنال على ويندوز والماك ولينكس ([[mkdir]] و [[cd]] و [[ni]] أو [[touch]])، بأسامي متكسرش الرابط بعدين، وتعرف تقرا رسالة الخطأ لما الفولدر يكون موجود أو الاسم فيه مسافة.`,
        R`تفتح الفولدر في VS Code بـ [[code .]]، وتكتب هيكل الصفحة بـ Emmet ([[!]] ثم Tab) وتظبط [[lang]] و [[dir]]، وتحفظ وتنسّق الكود، وتشغّل الترمنال من جوه المحرر.`,
        R`تفتح الصفحة في Chrome وتقرا شريط العنوان ([[file:///]] يعني إيه وإيه فرقه عن [[http://]])، وتشتغل باللفة «عدّل، احفظ، Ctrl+R»، وتعرف تمشي بالترتيب لما «غيّرت ومفيش حاجة حصلت».`,
        R`تفحص شغلك قبل ما تسلّمه: View Source (اللي كتبته) قصاد Elements (اللي المتصفح بناه)، وعرض 360 من Device Toolbar، و Console، والـ HTML validator لحد ما يقول مفيش أخطاء.`,
        R`ترتّب مشروع من كذا صفحة: فولدر لكل مشروع، وصور في [[images/]]، وصفحات بتوصل لبعض، وتعيد الطريق كله لوحدك من فولدر فاضي.`,
      ],
      use: {
        prog: R`كل مشروع جاي في الكورس (وفي JavaScript و React بعده) بيبدأ بنفس الخطوات: فولدر، ومحرر، ومتصفح، وفحص. اللي بيتغيّر هو اللي بتكتبه جوه الملفات.`,
        work: R`أول يوم في أي شغل: «اعمل clone للمشروع وافتحه وشغّله». ولما حد يقولك «الصفحة عندي مش بتتغيّر» أو «الصورة مش ظاهرة»، ترتيب الفحص اللي هنا هو اللي بتمشي عليه.`,
        cs: R`الفرق بين الملف (نص على الديسك)، واللي المتصفح بيبنيه منه في الذاكرة (الـ DOM)، والعنوان اللي بيوصلك ليه (URL).`,
      },
      projects: [
        { lvl: 'صغير', dir: "rokn-books", cont: true, t: R`ركن الأطفال: صفحة تالتة لموقع المكتبة`, what: R`كمّل من الفولدر اللي الدروس خلصت بيه: [[rokn-books]] وفيه [[index.html]] و [[about.html]] و [[images/logo.svg]]. صاحب المكتبة عايز صفحة لركن الأطفال. اعمل ملف جديد [[kids.html]] من الترمنال، وفيه: [[<h1>]] باسم الركن، وفقرة تعريف (لأنهي سن، وفيه إيه)، و [[<h2>]] «كتب بنرشّحها» وتحته [[<ul>]] من تلات كتب، و [[<h2>]] «ساعة الحدوتة» وتحته فقرة بالميعاد، ولينك يرجّع للرئيسية. وفي [[index.html]] زوّد لينك للصفحة الجديدة. انت أصلًا جوه الفولدر، فمن الخطوة ١ في «ابدأ إزاي» نفّذ [[ni kids.html]] (أو [[touch kids.html]]) بس: لو كتبت [[mkdir rokn-books]] هيرد بـ [[already exists]]، وده معناه إنك في المكان الصح. من دروس الوحدة الخمسة.`, done: R`[[tree /f]] (أو [[ls -R]]) فيه تلات ملفات HTML وفولدر [[images]]. والتاب مكتوب عليه «ركن الأطفال | مكتبة الركن». ومن الرئيسية بتوصل للصفحة وبترجع بكليك. والـ validator بيقول valid على [[kids.html]] و [[index.html]]. وعلى عرض 360 مفيش scroll أفقي.`, sol: R`**الأوامر** (في الترمنال اللي جوه VS Code، وانت في [[rokn-books]]):

~~~powershell
ni kids.html
~~~

~~~bash
touch kids.html
~~~

وبعدين افتح [[kids.html]] من الـ Explorer، و [[!]] ثم Tab، وغيّر [[lang]] و [[dir]] و [[title]]، واكتب المحتوى ([[h1]] ثم [[p]] ثم [[h2+ul>li*3]] ثم [[h2+p]] ثم [[p>a]]).

~~~live 360 400 kids.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ركن الأطفال | مكتبة الركن</title>
</head>
<body>
    <h1>ركن الأطفال</h1>
    <p>ركن هادي في آخر المكتبة للأطفال من ٤ لـ ١٠ سنين: كتب مصوّرة، وحواديت، وألوان.</p>
    <h2>كتب بنرشّحها</h2>
    <ul>
        <li>القطة اللي بتحب القراية</li>
        <li>رحلة نقطة مية</li>
        <li>أسامي النجوم</li>
    </ul>
    <h2>ساعة الحدوتة</h2>
    <p>كل سبت الساعة ١١ الصبح. الحضور مجاني، والمكان بيكفّي ١٥ طفل.</p>
    <p><a href="index.html">ارجع للرئيسية</a></p>
</body>
</html>
~~~

والسطر اللي بيتزوّد في آخر الـ [[<body>]] بتاع [[index.html]]، تحت لينك «عن المكتبة»:

~~~html السطر الجديد في الرئيسية
    <p><a href="kids.html">ركن الأطفال</a></p>
~~~

**ليه كده:**

- الملف اتعمل جنب [[index.html]]، فاللينك [[href="kids.html"]] من غير أي مسار: «ملف في نفس الفولدر».
- الـ [[<title>]] فيه اسم الصفحة ثم اسم الموقع، زي [[about.html]]: كل تاب بيقول هو أنهي صفحة.
- عنوان واحد [[<h1>]] للصفحة، وتحته [[<h2>]] لكل قسم. نفس ترتيب الرئيسية.
- صفحة جديدة من غير لينك ليها محدش هيوصلها. فالمشروع ملفين اتعدّلوا مش ملف واحد.

**الغلطة الشائعة:** تنسخ [[index.html]] وتسمّي النسخة [[kids.html]] وتغيّر المحتوى، وتنسى الـ [[<title>]]. الصفحتين يبقوا بنفس الاسم على التاب. لو هتنسخ، أول حاجة تغيّرها العنوان.

(اللينك في المعاينة مش هيفتح: المعاينة صفحة واحدة. على جهازك هيفتح.)

~~~text الناتج (PowerShell 7.6 و Chrome 157)
C:.
│   about.html
│   index.html
│   kids.html
│
└───images
        logo.svg

kids.html:   h1: 1   h2: 2   li: 3   لينك: index.html   title = ركن الأطفال | مكتبة الركن
index.html:  اللينكات: tel:+200000000000 ، about.html ، kids.html
الـ validator على الاتنين: The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0
عرض 360: scrollWidth = 360
~~~` },
        { lvl: 'صغير', dir: "rokn-books", cont: true, t: R`اطلب كتاب: فورم وصفحة شكر`, what: R`زي المشروع اللي فات (ملف جديد من الترمنال ولينك ليه من الرئيسية)، وزوّد عليه حاجة واحدة: فورم بيوديك لصفحة تانية. في نفس الفولدر اعمل ملفين. الأول [[contact.html]]: [[<h1>]] «اطلب كتاب»، وفقرة، و [[<form action="thanks.html" method="get">]] فيه تلات حقول كل واحد بـ [[<label>]] مربوط بيه (الاسم، ورقم الموبايل [[type="tel"]] و [[dir="ltr"]]، واسم الكتاب) وكلهم [[required]]، وزرار [[type="submit"]]. التاني [[thanks.html]]: عنوان «طلبك وصل» وفقرة ولينك للرئيسية. وفي [[index.html]] لينك لـ [[contact.html]]. نفّذ [[ni contact.html, thanks.html]] بس من الخطوة ١. من درس «form و label» ودروس الوحدة.`, done: R`الضغط على أي [[label]] بيحط المؤشر في حقله. ولو دوست الزرار والحقول فاضية المتصفح بيوقّفك برسالة. ولما تملا وتبعت بتوصل [[thanks.html]]، وشريط العنوان آخره [[?name=…&phone=…&book=…]] بالقيم اللي كتبتها. والـ validator بيقول valid على الملفين.`, sol: R`~~~powershell
ni contact.html, thanks.html
~~~

~~~bash
touch contact.html thanks.html
~~~

~~~live 310 310 contact.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اطلب كتاب | مكتبة الركن</title>
</head>
<body>
    <h1>اطلب كتاب</h1>
    <p>مش لاقي كتاب عندنا؟ اكتب اسمه وهنكلّمك أول ما يوصل.</p>
    <form action="thanks.html" method="get">
        <p>
            <label for="name">اسمك</label>
            <input id="name" name="name" autocomplete="name" required>
        </p>
        <p>
            <label for="phone">رقم الموبايل</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" required>
        </p>
        <p>
            <label for="book">اسم الكتاب</label>
            <input id="book" name="book" required>
        </p>
        <button type="submit">ابعت الطلب</button>
    </form>
    <p><a href="index.html">ارجع للرئيسية</a></p>
</body>
</html>
~~~

~~~live 160 160 thanks.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلبك وصل | مكتبة الركن</title>
</head>
<body>
    <h1>طلبك وصل</h1>
    <p>شكرًا. هنكلّمك على الرقم اللي كتبته أول ما الكتاب يوصل.</p>
    <p><a href="index.html">ارجع للرئيسية</a></p>
</body>
</html>
~~~

والسطر الجديد في آخر الـ [[<body>]] بتاع [[index.html]]:

~~~html السطر الجديد في الرئيسية
    <p><a href="contact.html">اطلب كتاب</a></p>
~~~

**ليه كده:**

- [[action="thanks.html"]] نفس قاعدة اللينك: «ملف جنب الصفحة دي». لما الفورم يتبعت، المتصفح بيروح للصفحة دي.
- [[method="get"]] بيحط القيم في العنوان نفسه بعد علامة [[?]]، كل حقل [[name=value]] وبينهم [[&]]. الاسم اللي قبل [[=]] هو الـ [[name]] بتاع الحقل. عشان كده حقل من غير [[name]] مبيتبعتش.
- مفيش سيرفر هنا، فالطلب مبيروحش لحد: الفايدة إنك **تشوف** الفورم بيبعت إيه. في موقع حقيقي الـ [[action]] بيبقى عنوان على سيرفر والـ [[method]] يبقى [[post]]، فالبيانات متظهرش في العنوان (درس «form و label»).
- كل حقل جوه [[<p>]] مع الـ [[label]] بتاعه، عشان كل واحد ياخد سطر من غير CSS.
- الموبايل [[dir="ltr"]]: الأرقام بتتكتب من الشمال حتى في صفحة عربي.

**ملحوظة:** زرار الإرسال في المعاينة اللي فوق مش هيوديك لحتة، لأن المعاينة بتعرض صفحة واحدة. جرّب الإرسال على جهازك.

**الغلطة الشائعة:** تنسى تعمل [[thanks.html]] أو تكتب اسمها غلط في الـ [[action]]. ساعتها بعد الإرسال هتشوف «Your file couldn’t be accessed» و [[ERR_FILE_NOT_FOUND]] اللي عرفتهم في درس «start index.html و Ctrl+R».

~~~text الناتج (Chrome 157، كتبت: منى ، 01000000000 ، بيت القمر)
الضغط على label «رقم الموبايل»:  المؤشر راح للحقل phone
إرسال والحقول فاضية:             المتصفح وقّف وكتب: Please fill out this field.
بعد الإرسال، شريط العنوان آخره:
  thanks.html?name=%D9%85%D9%86%D9%89&phone=01000000000&book=%D8%A8%D9%8A%D8%AA+%D8%A7%D9%84%D9%82%D9%85%D8%B1
ولما تفكّه:
  thanks.html?name=منى&phone=01000000000&book=بيت+القمر
الـ validator على contact.html و thanks.html: The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0
~~~

الحروف العربي اتحولت لرموز [[%D9…]] والمسافة بقت [[+]]: نفس اللي حصل لاسم الفولدر العربي في أول درس. Chrome ممكن يعرضها عربي في الشريط، ولما تنسخ العنوان بتطلع بالرموز. (رسالة الحقل الفاضي بلغة المتصفح نفسه: عندي إنجليزي.)` },
        { lvl: 'متوسط', dir: "rokn-books", cont: true, t: R`هيكل واحد لكل الصفحات`, what: R`الموقع بقى خمس صفحات، وكل واحدة فيها لينكات رجوع مختلفة. وحّدهم: في **كل** صفحة حط نفس الـ [[<header>]] وجواه [[<nav aria-label="صفحات الموقع">]] فيه أربع لينكات (الرئيسية، وعن المكتبة، وركن الأطفال، واطلب كتاب)، ولفّ محتوى الصفحة في [[<main>]]، وفي الآخر نفس الـ [[<footer>]] فيه عنوان المكتبة ولينك التليفون. وامسح اللينكات المتبعترة اللي في آخر كل صفحة («ارجع للرئيسية» واللي في آخر [[index.html]]). وبعدين الجديد: افحص الخمس صفحات من الترمنال بأمر واحد بدل ما تلصق كل واحدة. مفيش ملفات جديدة، فمتنفّذش الخطوة ١ من «ابدأ إزاي» خالص: ابدأ من [[code .]]. من درس «semantic HTML» ودرس «View Source و validator» (التمرين الخامس).`, done: R`كل صفحة فيها [[header]] و [[nav]] و [[main]] و [[footer]] مرة واحدة، و ٥ لينكات (أربعة في الـ nav وواحد تليفون). ومن أي صفحة بتوصل لأي صفحة بكليك واحد. والأمر الواحد طلّع valid خمس مرات. و [[grep]] (أو [[Select-String]]) على [[<title>]] طلّع خمس عناوين مختلفين.`, sol: R`**الحتة المشتركة.** دي بتتحط في كل صفحة زي ما هي، أول حاجة جوه الـ [[<body>]]:

~~~html أول الـ body في كل صفحة
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="about.html">عن المكتبة</a>
            <a href="kids.html">ركن الأطفال</a>
            <a href="contact.html">اطلب كتاب</a>
        </nav>
    </header>
~~~

ودي آخر حاجة قبل [[</body>]]:

~~~html آخر الـ body في كل صفحة
    <footer>
        <p>مكتبة الركن، ٧ شارع النخيل. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
~~~

واللي بينهم (محتوى الصفحة نفسه) بيتلف في [[<main>]] … [[</main>]]. وبعدها حدد الملف كله ودوس [[Shift+Alt+F]] عشان المسافات تتظبط.

[[index.html]] بعد التعديل:

~~~html index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="about.html">عن المكتبة</a>
            <a href="kids.html">ركن الأطفال</a>
            <a href="contact.html">اطلب كتاب</a>
        </nav>
    </header>
    <main>
        <img src="images/logo.svg" alt="لوجو مكتبة الركن: كتاب مفتوح" width="120" height="120">
        <h1>مكتبة الركن</h1>
        <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
        <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
        <h2>مواعيد العمل</h2>
        <ul>
            <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
            <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
            <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
        </ul>
        <h2>أقسام المكتبة</h2>
        <ul>
            <li>روايات</li>
            <li>كتب أطفال</li>
            <li>كتب مستعملة</li>
        </ul>
        <h2>عرض الأسبوع</h2>
        <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    </main>
    <footer>
        <p>مكتبة الركن، ٧ شارع النخيل. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

~~~view 670 690 شكل index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="about.html">عن المكتبة</a>
            <a href="kids.html">ركن الأطفال</a>
            <a href="contact.html">اطلب كتاب</a>
        </nav>
    </header>
    <main>
        <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2216%22%20fill%3D%22%231f4e5f%22%2F%3E%3Cpath%20d%3D%22M60%2036%20C48%2028%2032%2028%2022%2032%20V88%20C32%2084%2048%2084%2060%2092%20C72%2084%2088%2084%2098%2088%20V32%20C88%2028%2072%2028%2060%2036%20Z%22%20fill%3D%22%23fdf6e3%22%2F%3E%3Cpath%20d%3D%22M60%2036%20V92%22%20stroke%3D%22%231f4e5f%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E" alt="لوجو مكتبة الركن: كتاب مفتوح" width="120" height="120">
        <h1>مكتبة الركن</h1>
        <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
        <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
        <h2>مواعيد العمل</h2>
        <ul>
            <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
            <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
            <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
        </ul>
        <h2>أقسام المكتبة</h2>
        <ul>
            <li>روايات</li>
            <li>كتب أطفال</li>
            <li>كتب مستعملة</li>
        </ul>
        <h2>عرض الأسبوع</h2>
        <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    </main>
    <footer>
        <p>مكتبة الركن، ٧ شارع النخيل. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

وصفحة تانية كاملة، عشان تقارن. الفرق بينهم اللي جوه الـ [[<main>]] والـ [[<title>]] بس:

~~~live 390 430 kids.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ركن الأطفال | مكتبة الركن</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="about.html">عن المكتبة</a>
            <a href="kids.html">ركن الأطفال</a>
            <a href="contact.html">اطلب كتاب</a>
        </nav>
    </header>
    <main>
        <h1>ركن الأطفال</h1>
        <p>ركن هادي في آخر المكتبة للأطفال من ٤ لـ ١٠ سنين: كتب مصوّرة، وحواديت، وألوان.</p>
        <h2>كتب بنرشّحها</h2>
        <ul>
            <li>القطة اللي بتحب القراية</li>
            <li>رحلة نقطة مية</li>
            <li>أسامي النجوم</li>
        </ul>
        <h2>ساعة الحدوتة</h2>
        <p>كل سبت الساعة ١١ الصبح. الحضور مجاني، والمكان بيكفّي ١٥ طفل.</p>
    </main>
    <footer>
        <p>مكتبة الركن، ٧ شارع النخيل. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

والتلاتة الباقيين ([[about.html]] و [[contact.html]] و [[thanks.html]]) نفس الخطوات بالظبط: الـ header فوق، والمحتوى القديم جوه [[<main>]] من غير سطر «ارجع للرئيسية»، والـ footer تحت.

**الفحص بأمر واحد:**

~~~bash
for f in *.html; do echo "== $f"; curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @"$f" "https://html5.validator.nu/?out=text"; done
~~~

~~~powershell
foreach ($f in ls *.html) { "== $($f.Name)"; curl.exe -s -H "Content-Type: text/html; charset=utf-8" --data-binary "@$($f.Name)" "https://html5.validator.nu/?out=text" }
~~~

- [[for f in *.html]] و [[foreach ($f in ls *.html)]]: «لكل ملف آخره [[.html]] في الفولدر، نفّذ اللي جاي، والملف اسمه [[f]]».
- [[echo "== $f"]]: اطبع اسم الملف، عشان تعرف كل رد بتاع مين.
- والباقي هو أمر [[curl]] بتاع درس «View Source و validator»، واسم الملف متبدّل بالمتغيّر.

**ليه كده:**

- [[<header>]] و [[<nav>]] و [[<main>]] و [[<footer>]] بيقولوا للمتصفح ولقارئ الشاشة كل جزء هو إيه (درس «semantic HTML»). و [[aria-label]] بيدّي الـ nav اسم.
- لما القايمة واحدة في كل صفحة، الزائر مبيتوهش، وانت مبتفكرش «الصفحة دي بترجّع لفين».
- لينك التليفون اتنقل للـ footer فبقى في كل صفحة، مش في الرئيسية بس.

**الغلطة الشائعة:** تغيّر الـ nav في تلات صفحات وتنسى اتنين. عشان كده الفحص بـ [[grep -c]]: كل ملف لازم يطلّع نفس الرقم.

~~~text الناتج (Git Bash و Chrome 157)
== about.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== contact.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== index.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== kids.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== thanks.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).

$ grep -c "<a " *.html
about.html:5
contact.html:5
index.html:5
kids.html:5
thanks.html:5

$ grep -n "<title>" *.html
about.html:6:    <title>عن المكتبة | مكتبة الركن</title>
contact.html:6:    <title>اطلب كتاب | مكتبة الركن</title>
index.html:6:    <title>مكتبة الركن</title>
kids.html:6:    <title>ركن الأطفال | مكتبة الركن</title>
thanks.html:6:    <title>طلبك وصل | مكتبة الركن</title>

كل صفحة: header و nav و main و footer = 4 عناصر   عرض 360: scrollWidth = 360
~~~

[[grep -c "<a "]] بيعدّ السطور اللي فيها لينك في كل ملف، و [[grep -n "<title>"]] بيطبع سطر العنوان من كل ملف برقمه. في PowerShell: [[Select-String -Path *.html -Pattern "<title>"]].` },
        { lvl: 'متوسط', dir: "rokn-books", cont: true, t: R`عروض الشهر، وفحص التسليم`, what: R`زي المشروع اللي فات (صفحة جوه نفس الهيكل، وفحص من الترمنال)، وزوّد عليه: سيرفر محلي، وفحص تسليم كامل. صاحب المكتبة بعتلك عروض ديسمبر: «شنطة الشتا» (تلات روايات مستعملة في شنطة قماش، ١٢٠ جنيه)، و «كتاب وكراسة تلوين» (أي كتاب أطفال ومعاه كراسة هدية، ٨٥ جنيه)، و «بدّل وخد» (كتابين قريتهم بكتاب مستعمل، كل خميس، من غير فلوس). اعمل [[offers.html]] بنفس الهيكل: [[<h1>]]، وفقرة بمدة العروض، وكل عرض [[<article>]] فيه [[<h2>]] وفقرة وصف وفقرة سعر، وفي الآخر فقرة فيها لينك لـ [[contact.html]]. وزوّد لينك «عروض الشهر» في الـ nav بتاع **الست** صفحات. وبعدين شغّل الموقع من سيرفر محلي ([[npx serve]]، أو Live Server) واملا جدول التسليم: لكل صفحة، الـ validator و Console وعرض 360. نفّذ [[ni offers.html]] بس من الخطوة ١. لو معندكش Node ولا الإضافة: اعمل الفحص على [[file:///]] واقرا جزء السيرفر في الحل.`, done: R`[[grep -c "<a "]] بيطلّع 6 لكل صفحة و 7 لـ [[offers.html]]. والجدول فيه ست صفوف كلها سليمة. وعنوان السيرفر من غير اسم ملف بيفتح الرئيسية. وقلت في جملة ليه تعديل الـ nav في ست ملفات كان متعب.`, sol: R`~~~powershell
ni offers.html
~~~

~~~live 580 580 offers.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عروض شهر ديسمبر | مكتبة الركن</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="about.html">عن المكتبة</a>
            <a href="kids.html">ركن الأطفال</a>
            <a href="contact.html">اطلب كتاب</a>
            <a href="offers.html">عروض الشهر</a>
        </nav>
    </header>
    <main>
        <h1>عروض شهر ديسمبر</h1>
        <p>العروض سارية من أول الشهر لآخره، ولحد ما الكمية تخلص.</p>
        <article>
            <h2>شنطة الشتا</h2>
            <p>تلات روايات مستعملة من اختيارك في شنطة قماش.</p>
            <p>السعر: ١٢٠ جنيه</p>
        </article>
        <article>
            <h2>كتاب وكراسة تلوين</h2>
            <p>أي كتاب من ركن الأطفال ومعاه كراسة تلوين هدية.</p>
            <p>السعر: ٨٥ جنيه</p>
        </article>
        <article>
            <h2>بدّل وخد</h2>
            <p>هات كتابين قريتهم وخد كتاب مستعمل ببلاش، كل يوم خميس.</p>
            <p>السعر: من غير فلوس</p>
        </article>
        <p>عايز تحجز عرض؟ <a href="contact.html">اطلبه من هنا</a>.</p>
    </main>
    <footer>
        <p>مكتبة الركن، ٧ شارع النخيل. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

والسطر اللي اتزوّد في الـ [[<nav>]] بتاع كل صفحة (آخر لينك):

~~~html السطر الجديد في الـ nav
            <a href="offers.html">عروض الشهر</a>
~~~

**السيرفر:**

~~~powershell
npx serve -l tcp://127.0.0.1:8793 .
~~~

وافتح [[http://127.0.0.1:8793]] في Chrome. (مع Live Server: زرار Go Live، والعنوان [[http://127.0.0.1:5500]].)

**ليه كده:**

- [[<article>]] لكل عرض: كل واحد حاجة مستقلة بعنوانها، تنفع تتنقل لصفحة تانية زي ما هي (درس «semantic HTML»).
- السعر في فقرة لوحده، عشان يبقى سهل تلاقيه وتغيّره الشهر الجاي.
- آخر فقرة بتودّي على الفورم اللي عملته في المشروع التاني: الصفحات بتشتغل مع بعض.
- السيرفر هنا عشان تجرّب الموقع بالشكل اللي الزائر هيشوفه: عنوان [[http://]]، والرئيسية بتفتح من غير اسم ملف.

**ليه تعديل الـ nav متعب:** نفس السطر اتكتب في ست ملفات، ولو نسيت واحد الموقع يبقى فيه صفحة بقايمة ناقصة. HTML لوحده مفيهوش طريقة يقول «حط القايمة دي في كل الصفحات». ده اللي بتحلّه الأدوات اللي جاية بعدين (القوالب والـ components). دلوقتي الحل: [[grep -c]] بعد كل تعديل.

**حاجتين هتلاحظهم مع [[serve]]:**

- بيشيل [[.html]] من العنوان: لما تدوس «عروض الشهر» العنوان يبقى [[/offers]].
- الفورم بيوصل [[/thanks]] من غير القيم اللي بعد [[?]]: التحويل من [[/thanks.html]] لـ [[/thanks]] بيشيلها. على [[file:///]] القيم بتفضل. ده سلوك الأداة دي، مش غلطة في صفحتك.

**الغلطة الشائعة:** تقفل الترمنال والسيرفر شغال وتستغرب إن الصفحة «مبقتش تفتح». السيرفر برنامج: لما يقف، عنوان الـ [[http://]] بيقف معاه. وملفاتك زي ما هي.

~~~text الناتج (serve على Node 24، و Chrome 157)
 INFO  Accepting connections at http://127.0.0.1:8793
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 GET /
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 Returned 200 in 12 ms
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 GET /about.html
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 Returned 301 in 0 ms
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 GET /about
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 Returned 200 in 1 ms

$ grep -c "<a " *.html
about.html:6
contact.html:6
index.html:6
kids.html:6
offers.html:7
thanks.html:6

جدول التسليم:
الصفحة          validator    Console    عرض 360 (scrollWidth)
index.html      valid        فاضي       360
about.html      valid        فاضي       360
kids.html       valid        فاضي       360
contact.html    valid        فاضي       360
thanks.html     valid        فاضي       360
offers.html     valid        فاضي       360
~~~

[[301]] معناها «العنوان ده اتنقل، روح للعنوان التاني»: ده تحويل [[/about.html]] لـ [[/about]].` },
        { lvl: 'كبير', dir: "yasmin-nursery", t: R`من الصفر لوحدك: موقع مشتل الياسمين`, what: R`عميل جديد، وفولدر جديد، ومن غير خطوات: اعمل الطريق كله لوحدك. «مشتل الياسمين» (اسم متخيل) عايز موقع من أربع صفحات بنفس الهيكل ([[header]] فيه [[nav]]، و [[main]]، و [[footer]]). **[[index.html]]:** لوجو من [[images/logo.svg]]، و [[<h1>]]، وفقرة تعريف، و [[<h2>]] «مواعيد العمل» وتحته قايمة، و [[<h2>]] «بنوصّل لحد البيت» وتحته فقرة، ولينك لصفحة النباتات. **[[plants.html]]:** تلات نباتات، كل واحدة [[<article>]] فيه [[<h2>]] وفقرة عناية وفقرة سعر، ولينك للطلب. **[[contact.html]]:** فورم بيروح [[thanks.html]] بـ [[get]]: الاسم، والموبايل، والنبتة، و checkbox «عايز توصيل للبيت». **[[thanks.html]]:** رسالة شكر ولينك. هتعيد استخدام اللي بنيته: الهيكل المشترك من المشروع التالت، والفورم وصفحة الشكر من التاني، والـ [[<article>]] من الرابع، وطريقة اللوجو من درس «فولدر لكل مشروع». والدروس: الخمسة كلهم. شغّل ساعة الموبايل قبل ما تبدأ.`, done: R`الشجرة: أربع ملفات HTML وفولدر [[images]] فيه [[logo.svg]]، وكله جوه [[projects/yasmin-nursery]] مش جوه [[rokn-books]]. والـ validator بيقول valid أربع مرات من أمر واحد. و Console فاضي في الأربعة (يعني اللوجو اتحمّل). وعلى 360 مفيش scroll أفقي. والفورم بيوصل [[thanks.html]] والعنوان فيه [[delivery=yes]] لما تعلّم على الـ checkbox. وسجّلت الوقت.`, ext: R`زوّد صفحة خامسة (نصايح العناية) وشوف هتعدّل كام ملف. ارسم لوجو بتاعك بدل الجاهز. اعمل [[git init]] في الفولدر وامشي مع أول تلات دروس في كورس Git. وأعد المشروع بعد أسبوع من غير ما تبص على الحل، وقارن الوقت.`, sol: R`**شجرة الملفات:**

~~~text
yasmin-nursery/
├── index.html       الرئيسية: لوجو، وتعريف، ومواعيد، وتوصيل
├── plants.html      تلات نباتات، كل واحدة article
├── contact.html     فورم الطلب
├── thanks.html      بعد الإرسال
└── images/
    └── logo.svg     اللوجو
~~~

**ترتيب البناء:**

1. الفولدر والملفات كلها مرة واحدة من الترمنال، و [[code .]].
2. [[index.html]] الأول، كامل بالهيكل (header و main و footer)، وافتحه وافحصه.
3. انسخ منه الهيكل للتلات صفحات، وغيّر الـ [[<title>]] والـ [[<main>]] في كل واحدة.
4. الفحص على الأربعة بأمر واحد، وبعدين المتصفح: كل لينك، والفورم، وعرض 360، و Console.

**١. الفولدر والملفات:**

~~~powershell
cd ~\projects
mkdir yasmin-nursery
cd yasmin-nursery
mkdir images
ni index.html, plants.html, contact.html, thanks.html, images\logo.svg
code .
~~~

~~~bash
mkdir -p ~/projects/yasmin-nursery/images && cd ~/projects/yasmin-nursery
touch index.html plants.html contact.html thanks.html images/logo.svg
code .
~~~

أول سطر [[cd ~\projects]]: لو كنت لسه واقف في [[rokn-books]]، المشروع الجديد كان هيتعمل جواه.

**٢. اللوجو** ([[images/logo.svg]]، انسخه زي ما هو: دايرة فاتحة وجواها نبتة بورقتين):

~~~xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" rx="60" fill="#e8f3e8"/>
  <path d="M60 100 V56" stroke="#2f6b3a" stroke-width="5" stroke-linecap="round"/>
  <path d="M60 60 C38 58 28 44 28 26 C48 26 60 38 60 60 Z" fill="#3f8f4f"/>
  <path d="M60 72 C82 70 92 56 92 38 C72 38 60 50 60 72 Z" fill="#5fae6a"/>
</svg>
~~~

**٣. الصفحات:**

~~~html index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مشتل الياسمين</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="plants.html">النباتات</a>
            <a href="contact.html">اطلب نبتة</a>
        </nav>
    </header>
    <main>
        <img src="images/logo.svg" alt="لوجو مشتل الياسمين: نبتة بورقتين" width="120" height="120">
        <h1>مشتل الياسمين</h1>
        <p>نباتات للبيت والبلكونة، وتربة وأصص، ونصيحة ببلاش لكل نبتة تشتريها.</p>
        <h2>مواعيد العمل</h2>
        <ul>
            <li>كل يوم: من ٩ الصبح لـ ٧ المغرب</li>
            <li>الاتنين: إجازة</li>
        </ul>
        <h2>بنوصّل لحد البيت</h2>
        <p>التوصيل جوه الحي بـ ٢٠ جنيه، وببلاش للطلبات فوق ٣٠٠ جنيه.</p>
        <p><a href="plants.html">شوف النباتات المتاحة</a></p>
    </main>
    <footer>
        <p>مشتل الياسمين، ١٢ شارع الترعة. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

~~~view 530 550 شكل index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مشتل الياسمين</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="plants.html">النباتات</a>
            <a href="contact.html">اطلب نبتة</a>
        </nav>
    </header>
    <main>
        <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%23e8f3e8%22%2F%3E%3Cpath%20d%3D%22M60%20100%20V56%22%20stroke%3D%22%232f6b3a%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M60%2060%20C38%2058%2028%2044%2028%2026%20C48%2026%2060%2038%2060%2060%20Z%22%20fill%3D%22%233f8f4f%22%2F%3E%3Cpath%20d%3D%22M60%2072%20C82%2070%2092%2056%2092%2038%20C72%2038%2060%2050%2060%2072%20Z%22%20fill%3D%22%235fae6a%22%2F%3E%3C%2Fsvg%3E" alt="لوجو مشتل الياسمين: نبتة بورقتين" width="120" height="120">
        <h1>مشتل الياسمين</h1>
        <p>نباتات للبيت والبلكونة، وتربة وأصص، ونصيحة ببلاش لكل نبتة تشتريها.</p>
        <h2>مواعيد العمل</h2>
        <ul>
            <li>كل يوم: من ٩ الصبح لـ ٧ المغرب</li>
            <li>الاتنين: إجازة</li>
        </ul>
        <h2>بنوصّل لحد البيت</h2>
        <p>التوصيل جوه الحي بـ ٢٠ جنيه، وببلاش للطلبات فوق ٣٠٠ جنيه.</p>
        <p><a href="plants.html">شوف النباتات المتاحة</a></p>
    </main>
    <footer>
        <p>مشتل الياسمين، ١٢ شارع الترعة. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

~~~live 580 580 plants.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>النباتات | مشتل الياسمين</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="plants.html">النباتات</a>
            <a href="contact.html">اطلب نبتة</a>
        </nav>
    </header>
    <main>
        <h1>النباتات المتاحة</h1>
        <p>الأسعار للأصيص المتوسط. اسأل عن المقاسات التانية.</p>
        <article>
            <h2>ريحان</h2>
            <p>بيحب الشمس، ويتروي كل يومين.</p>
            <p>السعر: ٢٥ جنيه</p>
        </article>
        <article>
            <h2>صبّار</h2>
            <p>بيستحمل النسيان: مية مرة كل أسبوعين.</p>
            <p>السعر: ٤٠ جنيه</p>
        </article>
        <article>
            <h2>بوتس</h2>
            <p>للأوضة اللي نورها قليل، ويتروي مرة في الأسبوع.</p>
            <p>السعر: ٦٠ جنيه</p>
        </article>
        <p>عجبتك واحدة؟ <a href="contact.html">اطلبها من هنا</a>.</p>
    </main>
    <footer>
        <p>مشتل الياسمين، ١٢ شارع الترعة. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

~~~live 370 370 contact.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اطلب نبتة | مشتل الياسمين</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="plants.html">النباتات</a>
            <a href="contact.html">اطلب نبتة</a>
        </nav>
    </header>
    <main>
        <h1>اطلب نبتة</h1>
        <p>اكتب اسمك ورقمك والنبتة اللي عايزها، وهنكلّمك نأكّد الميعاد.</p>
        <form action="thanks.html" method="get">
            <p>
                <label for="name">اسمك</label>
                <input id="name" name="name" autocomplete="name" required>
            </p>
            <p>
                <label for="phone">رقم الموبايل</label>
                <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" required>
            </p>
            <p>
                <label for="plant">النبتة</label>
                <input id="plant" name="plant" required>
            </p>
            <p>
                <label><input type="checkbox" name="delivery" value="yes"> عايز توصيل للبيت</label>
            </p>
            <button type="submit">ابعت الطلب</button>
        </form>
    </main>
    <footer>
        <p>مشتل الياسمين، ١٢ شارع الترعة. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

~~~live 220 220 thanks.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلبك وصل | مشتل الياسمين</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="plants.html">النباتات</a>
            <a href="contact.html">اطلب نبتة</a>
        </nav>
    </header>
    <main>
        <h1>طلبك وصل</h1>
        <p>شكرًا. هنكلّمك على الرقم اللي كتبته عشان نأكّد الميعاد.</p>
        <p><a href="plants.html">ارجع للنباتات</a></p>
    </main>
    <footer>
        <p>مشتل الياسمين، ١٢ شارع الترعة. <a href="tel:+200000000000">كلّمنا</a></p>
    </footer>
</body>
</html>
~~~

**٤. الفحص:**

~~~bash
for f in *.html; do echo "== $f"; curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @"$f" "https://html5.validator.nu/?out=text"; done
~~~

~~~powershell
foreach ($f in ls *.html) { "== $($f.Name)"; curl.exe -s -H "Content-Type: text/html; charset=utf-8" --data-binary "@$($f.Name)" "https://html5.validator.nu/?out=text" }
~~~

**ليه كده:**

- **[[index.html]] الأول وكامل:** الهيكل المشترك بيتكتب مرة ويتفحص مرة. لو نسخته وفيه غلطة، هتبقى في أربع ملفات.
- **الـ checkbox جوه الـ [[label]] بتاعه:** الضغط على الكلام بيعلّم المربع من غير [[for]] ولا [[id]]. و [[value="yes"]] هي اللي بتظهر في العنوان. ولو المربع مش متعلّم، الحقل مبيتبعتش خالص.
- **[[thanks.html]] بيرجّع للنباتات مش للرئيسية:** اللي لسه طالب نبتة غالبًا عايز يشوف غيرها.
- **الأسعار في فقرة «السعر: …»:** الرقم لوحده من غير كلمة مبيتفهمش لما يتقري بصوت.
- **فين الأخطاء المتعامل معاها؟** في موقع HTML بس، «المتانة» هي الفحص: الـ validator على كل صفحة، و Console فاضي (مفيش ملف ناقص)، و [[required]] على الحقول (المتصفح بيمنع الإرسال الناقص)، و [[alt]] على اللوجو (لو الصورة متحمّلتش الكلام بيظهر مكانها). والمشروع يتعاد من الأول من غير مشاكل: أوامر الخطوة ١ لو اتنفّذت تاني مبتمسحش حاجة ([[mkdir]] و [[ni]] بيقولوا already exists، و [[touch]] مبيلمسش المحتوى).

**الغلطة الشائعة:** تبدأ تكتب قبل ما تعمل [[cd]] للفولدر الجديد، فملفات المشتل تتعمل جوه موقع المكتبة. أول فحص في المشروع ده [[pwd]].

**ولما حاجة تبوظ:** ارجع لترتيب الفحص. الصفحة مش بتتغيّر: درس «start index.html و Ctrl+R» (النقطة، ثم العنوان). اللوجو مش ظاهر: Console فيه اسم الملف اللي المتصفح دوّر عليه. الشكل غريب: الـ validator ثم Elements.

~~~text الناتج (PowerShell 7.6 و Git Bash و Chrome 157)
C:.
│   contact.html
│   index.html
│   plants.html
│   thanks.html
│
└───images
        logo.svg

== contact.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== index.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== plants.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
== thanks.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).

كل صفحة: header و nav و main و footer = 4   عرض 360: scrollWidth = 360   Console: فاضي
index.html:   اللوجو 120×120   h2: 2   li: 2
plants.html:  article: 3   h2: 3
contact.html: الحقول: 4   وكل label مربوط بحقله: 4
بعد الإرسال (سلمى ، 01000000000 ، ريحان ، والتوصيل متعلّم) العنوان لما تفكّه:
  thanks.html?name=سلمى&phone=01000000000&plant=ريحان&delivery=yes
~~~` },
        { lvl: 'فكرة', dir: "my-place", t: R`من الصفر لوحدك: موقع لمكان انت عارفه`, what: R`اختار مكان حقيقي انت عارفه كويس (كشك، ورشة، محل، مركز دروس) واعمله موقع صغير، **باسم متخيل** مش اسمه الحقيقي. انت اللي بتقرر الصفحات والمحتوى. الحد الأدنى: صفحتين بنفس الهيكل ([[header]] فيه [[nav]]، و [[main]]، و [[footer]])، وقايمة واحدة على الأقل، ولينك تليفون، وكل ده في فولدر جديد اسمه [[my-place]] (أو اسم يوصف المكان). قبل ما تكتب أي كود: اكتب على ورقة مين هيفتح الموقع ده وعايز يعرف إيه، ورتّب الصفحة على أساس إجابتك. ومن غير ما تبص على أي خطوات.`, done: R`واحد غيرك فتح الموقع وجاوب في أقل من نص دقيقة: المكان فين؟ وبيفتح إمتى؟ وأكلّمه إزاي؟ والـ validator بيقول valid على كل صفحة. وعلى 360 مفيش scroll أفقي. و [[tree /f]] مفيهوش ولا اسم فيه مسافة أو حرف كبير.`, ext: R`زوّد صورة للمكان في [[images]] (صورة انت اللي مصوّرها) بـ [[alt]] بيوصفها. زوّد صفحة فيها فورم. واعرض الموقع على صاحب المكان واسأله إيه اللي ناقص: إجابته هي المشروع الجاي.`, sol: R`ده مشروع مفتوح، فمفيش حل واحد. دي نسخة نموذجية لـ «عصير عم حسن» (كشك عصير متخيل)، وليه اتعملت كده.

~~~powershell
cd ~\projects
mkdir my-place
cd my-place
ni index.html, menu.html
code .
~~~

~~~live 410 420 index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عصير عم حسن</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="menu.html">المنيو</a>
        </nav>
    </header>
    <main>
        <h1>عصير عم حسن</h1>
        <p>كشك عصير على أول شارع المدرسة من سنة ١٩٩٨. قصب وفواكه الموسم، معصورين قدامك.</p>
        <h2>هتلاقينا فين</h2>
        <p>أول شارع المدرسة، قصاد موقف الميكروباص.</p>
        <h2>المواعيد</h2>
        <ul>
            <li>في الصيف: من ٨ الصبح لـ ١٢ بالليل</li>
            <li>في الشتا: من ٩ الصبح لـ ٩ بالليل</li>
        </ul>
        <p><a href="tel:+200000000000">اطلب بالتليفون</a></p>
    </main>
    <footer>
        <p>عصير عم حسن. الدفع كاش بس.</p>
    </footer>
</body>
</html>
~~~

~~~live 410 410 menu.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>المنيو | عصير عم حسن</title>
</head>
<body>
    <header>
        <nav aria-label="صفحات الموقع">
            <a href="index.html">الرئيسية</a>
            <a href="menu.html">المنيو</a>
        </nav>
    </header>
    <main>
        <h1>المنيو</h1>
        <p>الأسعار للكوباية الكبيرة.</p>
        <h2>طول السنة</h2>
        <ul>
            <li>قصب: ١٥ جنيه</li>
            <li>ليمون بالنعناع: ٢٠ جنيه</li>
            <li>برتقال: ٢٥ جنيه</li>
        </ul>
        <h2>في الموسم بس</h2>
        <ul>
            <li>مانجة (الصيف): ٣٥ جنيه</li>
            <li>فراولة (الشتا): ٣٠ جنيه</li>
        </ul>
    </main>
    <footer>
        <p>عصير عم حسن. الدفع كاش بس.</p>
    </footer>
</body>
</html>
~~~

**ليه التصميم ده:**

- **السؤال الأول:** مين هيفتح موقع كشك عصير؟ واحد معدّي وعايز يعرف «فين، وفاتح دلوقتي ولا لأ، وبكام». فالرئيسية فيها المكان والمواعيد قبل أي حاجة، والأسعار في صفحة لوحدها.
- **صفحتين بس:** المحتوى ميستاهلش أكتر. صفحة «عن الكشك» كانت هتبقى فقرة واحدة، فدخلت في أول فقرة في الرئيسية.
- **المنيو قايمتين بعنوانين** («طول السنة» و «في الموسم بس»): الزبون اللي بيسأل «فيه مانجة؟» بيلاقي الإجابة من العنوان.
- **«الدفع كاش بس» في الـ footer:** معلومة لازم تبان في كل صفحة، فمكانها الحتة المشتركة.
- **مفيش صور:** مفيش صورة حقيقية للمكان، وصورة من النت لمكان تاني كدب على الزائر. الصورة تتزوّد لما تتصوّر.
- **الاسم متخيل:** الموقع تمرين. متنشرش رقم تليفون ولا عنوان حد حقيقي من غير إذنه.

**الغلطة الشائعة:** تبدأ بـ «عايز الموقع يبقى فيه إيه» بدل «الزائر عايز إيه». النتيجة صفحة فيها تاريخ المكان في الأول، والمواعيد في الآخر.

~~~text الناتج (PowerShell 7.6 و Chrome 157)
C:.
    index.html
    menu.html

index.html:  header و nav و main و footer = 4   h2: 2   li: 2   لينك تليفون: 1
menu.html:   header و nav و main و footer = 4   h2: 2   li: 5
الـ validator على الاتنين: The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0
عرض 360: scrollWidth = 360
~~~` },
      ],
      items: [
        {
          cmd: "mkdir و ni و touch",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص على الدرس: اعمل جوه [[projects]] فولدر اسمه [[practice-site]]، وجواه ملفين فاضيين [[index.html]] و [[about.html]]، واعرض اللي جواه. (الفولدر ده هو معملك في تمارين الوحدة كلها، عشان مشروع المكتبة يفضل نضيف.)`, done: R`الأمر اللي بيعرض محتوى الفولدر طلّع الملفين بالاسمين دول بالظبط، وحجم كل واحد 0.`, sol: R`~~~powershell
cd ~\projects
mkdir practice-site
cd practice-site
ni index.html, about.html
ls
~~~

~~~bash
cd ~/projects
mkdir practice-site && cd practice-site
touch index.html about.html
ls -l
~~~

**ليه كده:** [[ni]] بياخد أكتر من اسم بينهم فاصلة [[,]] (في PowerShell الفاصلة معناها «قايمة»). و [[touch]] بياخدهم بمسافة. لو عكست (فاصلة مع [[touch]] أو مسافة مع [[ni]]) مش هيشتغل: [[ni a.html b.html]] بيرد بـ [[A positional parameter cannot be found that accepts argument 'b.html']].

**الغلطة الشائعة:** تنسى [[cd practice-site]] وتعمل الملفين في [[projects]] نفسه. عشان كده آخر سطر [[ls]]: بتتأكد بعينك.

~~~text الناتج (PowerShell 7.6)
    Directory: C:\Users\ali\projects\practice-site

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          11/18/2026  6:25 PM              0 about.html
-a---          11/18/2026  6:25 PM              0 index.html
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** واحد كتب [[mkdir my site]] (من غير علامات تنصيص). هيحصل إيه في PowerShell؟ وهيحصل إيه في bash؟ توقّع الاتنين، وبعدين جرّب جوه [[practice-site]].`, done: R`قلت قبل ما تجرّب: PowerShell بيرفض ومبيعملش حاجة، و bash بيعمل فولدرين. وبعد التجربة مسحت اللي اتعمل.`, sol: R`**PowerShell:** بيرفض، ومفيش أي فولدر بيتعمل:

~~~text PowerShell 7.6 و 5.1
mkdir: A positional parameter cannot be found that accepts argument 'site'.
~~~

المعنى: [[mkdir]] مستني اسم واحد، ولقى كلمة تانية ([[site]]) مش عارف يحطها فين.

**bash:** مبيشتكيش، وبيعمل فولدرين، واحد اسمه [[my]] وواحد اسمه [[site]]:

~~~bash
mkdir my site
ls
~~~

~~~text الناتج (Git Bash)
my
site
~~~

**ليه:** المسافة في الترمنال هي اللي بتفصل بين الكلمات. فالأمر شاف كلمتين. لو مصمم على اسم فيه مسافة لازم تحطه بين علامتين تنصيص: [[mkdir "my site"]]. بس الأسهل والأصح إنك متعملش أسامي فيها مسافات أصلًا: [[my-site]].

**التنضيف في bash:** [[rmdir my site]] (بيمسح الفولدر الفاضي بس، فهو آمن).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صاحبك كتب صفحة في Notepad وحفظها، ولما بيفتحها في المتصفح بيشوف الكود نفسه نص، مش صفحة. جوه [[practice-site]] اعمل الحالة دي بنفسك: ملف اسمه [[Home Page.html.txt]]. وبعدين صلّح الاسم بأمر واحد لـ [[home.html]].`, done: R`[[ls]] بيعرض [[home.html]] ومفيش أي ملف آخره [[.txt]]، وقلت إيه التلات حاجات اللي كانت غلط في الاسم القديم.`, sol: R`~~~powershell
ni "Home Page.html.txt"
ren "Home Page.html.txt" home.html
ls -Name
~~~

~~~bash
touch "Home Page.html.txt"
mv "Home Page.html.txt" home.html
ls
~~~

**ليه كده:** [[ren]] (اختصار [[Rename-Item]]) و [[mv]] بياخدوا الاسم القديم وبعدين الجديد. والاسم القديم فيه مسافة فلازم علامات التنصيص. من غيرها bash بيفهم إنهم تلات كلمات وبيرد:

~~~text Git Bash من غير علامات تنصيص
mv: target 'index.html' is not a directory
~~~

(الرسالة دي طلعت لما جرّبت [[mv Home Page.html.txt index.html]]: شاف ملفين مصدر وهدف، والهدف لازم يبقى فولدر.)

**التلات غلطات في الاسم القديم:**

1. آخره [[.txt]]: ده اللي بيخلي المتصفح يعرضه نص. الامتداد الحقيقي هو اللي بعد **آخر** نقطة.
2. فيه مسافة: هتبقى [[%20]] في الرابط، وكل أمر هيحتاج علامات تنصيص.
3. فيه حروف كبيرة: سيرفرات كتير بتفرّق بين [[Home.html]] و [[home.html]].

**الغلطة الشائعة:** تفتكر إن الملف اسمه [[Home Page.html]] عشان ويندوز مخبّي الامتداد. [[ls]] في الترمنال بيعرض الاسم الحقيقي دايمًا.

~~~text الناتج
home.html
~~~` },
            { lvl: 'تطبيق', t: R`**ابني حاجة:** جهّز هيكل مشروع كامل اسمه [[shop-demo]] جوه [[projects]]: تلات صفحات ([[index.html]] و [[products.html]] و [[contact.html]]) وفولدر [[images]] جواه ملف [[logo.svg]]. واعرض الشجرة. حاول بأقل عدد أوامر.`, done: R`الشجرة فيها أربع ملفات في مكانهم وفولدر واحد، وكل الأسامي حروف صغيرة من غير مسافات.`, sol: R`~~~powershell
mkdir shop-demo
cd shop-demo
mkdir images
ni index.html, products.html, contact.html, images\logo.svg
tree /f
~~~

~~~bash
mkdir -p shop-demo/images && cd shop-demo
touch index.html products.html contact.html images/logo.svg
ls -R
~~~

**ليه كده:**

- الملف اللي جوه فولدر بيتكتب بمساره: [[images\logo.svg]] في PowerShell و [[images/logo.svg]] في bash. والفولدر لازم يكون موجود الأول، عشان كده [[mkdir images]] قبل [[ni]].
- في bash [[mkdir -p shop-demo/images]] بيعمل الفولدرين مرة واحدة. من غير [[-p]] بيرفض لو الفولدر الأب مش موجود: [[mkdir: cannot create directory 'a/b/c': No such file or directory]].
- في PowerShell [[mkdir shop-demo\images]] بيعمل الاتنين من غير أي خيار.

**الغلطة الشائعة:** تعمل الملفات قبل [[cd shop-demo]]، فتتعمل برّه المشروع.

~~~text الناتج (tree /f في PowerShell)
C:.
│   contact.html
│   index.html
│   products.html
│
└───images
        logo.svg
~~~

~~~text الناتج (ls -R في Git Bash)
.:
contact.html
images
index.html
products.html

./images:
logo.svg
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** الدرس قال إن [[ni index.html]] بيرفض لو الملف موجود. فيه خيار اسمه [[-Force]] بيخلّيه «ينجح». من صفحة [[New-Item]] في وثائق مايكروسوفت (مثال رقم ٩): إيه اللي بيحصل للملف الموجود؟ وبعدين جرّبها على ملف تجربة فيه سطر، **مش** على ملف في مشروعك. وإيه المقابل في bash؟`, done: R`كتبت جملة واحدة بتقول ليه [[ni -Force]] خطر على ملف فيه شغل، وشفت الحجم بيتغيّر بعينك، وعرفت إن [[touch]] مفيهوش المشكلة دي.`, sol: R`~~~powershell
Set-Content test.html "<h1>مكتبة الركن</h1>"
(Get-Item test.html).Length
ni test.html -Force
(Get-Item test.html).Length
~~~

**الشرح:** [[Set-Content]] بيكتب السطر في الملف. [[(Get-Item test.html).Length]] بيجيب حجمه بالبايت. وبعد [[ni -Force]] الحجم بقى صفر: الملف **اتمسح محتواه** واتعمل مكانه واحد فاضي بنفس الاسم. الوثائق بتقولها صريحة في المثال ٩: «This overwrites the existing file».

يعني الرفض العادي ([[The file ... already exists]]) كان بيحميك. و [[-Force]] بيشيل الحماية دي.

**في bash:** [[touch index.html]] على ملف موجود مبيلمسش محتواه، بيغيّر تاريخ آخر تعديل بس. جرّبتها على صفحة حجمها 1755 بايت: فضلت 1755.

**الغلطة الشائعة:** تنسخ أمر من النت فيه [[-Force]] «عشان الخطأ يختفي» من غير ما تعرف هو بيعمل إيه.

~~~text الناتج (PowerShell 7.6)
32

    Directory: C:\Users\ali\projects\practice-site

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          11/18/2026  6:37 PM              0 test.html

0
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك سمّى مشروعه [[My Site]] والصفحة [[Home Page.html]] وبيقول «شغالة عندي، إيه المشكلة؟». اكتبله رد من تلات سطور بالظبط، كل سطر فيه مشكلة واحدة حقيقية والدليل عليها.`, done: R`التلات سطور فيهم: شكل الرابط بالـ [[%20]]، وعلامات التنصيص في الترمنال، والحروف الكبيرة على السيرفر. ومفيش سطر بيقول «عشان ده الأصول».`, sol: R`**إجابة نموذجية:**

1. الرابط هيبقى [[my%20site/Home%20Page.html]]: كل مسافة بتتحول [[%20]]، وده اللي هيتبعت لأي حد تشاركه اللينك.
2. كل أمر في الترمنال هيحتاج علامات تنصيص ([[cd "My Site"]])، ولو نسيتها الأمر بيفهمهم كلمتين.
3. جهازك (ويندوز والماك) مبيفرّقش بين [[Home]] و [[home]]، بس أغلب السيرفرات بتفرّق. فلينك مكتوب [[home page.html]] هيشتغل عندك وهيبوظ بعد الرفع.

والحل سطر واحد: [[my-site/index.html]].

**الدليل على السطر الأول:** فتحت صفحة بالاسم ده في Chrome وقريت العنوان:

~~~text الناتج (Chrome 157)
file:///C:/Users/ali/projects/my%20site/Home%20Page.html
~~~

والسطر التالت من صفحة «Dealing with files» في MDN، مش من تجربة: المعمل هنا ويندوز.` },
          ],
          title: "فولدر المشروع وملفاته من الترمنال",
          desc: R`أي صفحة بتبدأ بفولدر وجواه ملف. [[mkdir]] بيعمل الفولدر، و [[cd]] بيدخّلك جواه، و [[ni]] (في PowerShell) أو [[touch]] (في bash على الماك ولينكس) بيعمل الملف فاضي، و [[ls]] بيوريك اللي اتعمل.

المشروع اللي هنبنيه في الوحدة كلها: صفحة لـ «مكتبة الركن»، مكتبة متخيلة على ناصية شارع. في الدرس ده هنجهّز مكانها: فولدر [[rokn-books]] جوه فولدر [[projects]]، وجواه ملف واحد اسمه [[index.html]]. والدرس الجاي بيبدأ من الفولدر ده بالظبط.

الأسامي ليها قواعد: حروف إنجليزي صغيرة، من غير مسافات ولا عربي، والكلمات بينها [[-]]. مش ذوق: اسم الفولدر والملف هيبقوا جزء من رابط الصفحة.`,
          example: R`# Windows (PowerShell):
cd ~
mkdir projects
cd projects
mkdir rokn-books
cd rokn-books
ni index.html
ls
# Linux and Mac:
cd ~
mkdir -p projects/rokn-books
cd projects/rokn-books
touch index.html
ls -l`,
          try: R`نفّذ أوامر نظامك بالترتيب. وبعدين اكتب [[mkdir rokn-books]] مرة تانية وانت جوه [[projects]] واقرا الرسالة: دي أول رسالة خطأ هتقابلها كتير، ومعناها بسيط.`,
          deep: {
            why: R`ممكن تعمل الفولدر والملف بالماوس (كليك يمين ثم New). بس الترمنال بيعمل تلات حاجات الماوس مبيعملهاش: بيوريك الاسم الحقيقي للملف (ويندوز بيخبّي الامتداد، فـ [[index.html.txt]] بيبان [[index.html]])، وبيتكتب في شرح أو رسالة فأي حد ينفّذه زي ما هو، وهو نفس الطريقة اللي هتشغّل بيها Git و npm بعدين. وكل مشروع في الكورس ده بيبدأ بالتلات سطور دول.`,
            how: R`الترمنال دايمًا «واقف» في فولدر، اسمه working directory. كل اسم تكتبه من غير مسار كامل بيتفهم بالنسبة للفولدر ده: [[mkdir rokn-books]] بيعمل الفولدر جوه المكان اللي انت فيه، و [[ni index.html]] بيعمل الملف جوه المكان اللي انت فيه. عشان كده [[cd]] قبل [[ni]] مش تفصيلة: لو نسيتها الملف بيتعمل في حتة تانية.

الملف اللي بيتعمل حجمه صفر بايت: اسم على الديسك من غير محتوى. الامتداد [[.html]] هو اللي بيقول للنظام وللمتصفح «ده صفحة»، ومفيش حاجة جوه الملف بتقول كده.`,
            when: R`في أول كل مشروع، وكل ما تحتاج ملف جديد (صفحة تانية، ملف CSS بعدين). ولما المشروع يكبر هتعمل الملفات من VS Code كمان (الدرس الجاي)، والاتنين بيعملوا نفس الحاجة.`,
            mistakes: R`تشتغل على سطح المكتب نفسه: ملفات كل المشاريع جنب بعض، ومينفعش يبقى فيه [[index.html]] اتنين. تسمّي بمسافات أو عربي. تنسى [[cd]] فالملف يتعمل برّه الفولدر. تحفظ من Notepad فيبقى الاسم [[index.html.txt]]. وتكتب [[touch]] في PowerShell أو [[ni]] في bash: كل واحد ليه أمره.`
          },
          teach: R`## الفكرة في سطرين

الموقع على جهازك فولدر عادي جواه ملفات نص. هنعمل الفولدر والملف بأربع أوامر، ونفهم كل واحد بيعمل إيه وبيرد بإيه.

كل الأوامر هنا اتشغّلت على Windows 11 في PowerShell 7.6 و Windows PowerShell 5.1 و Git Bash (bash 5.3). أوامر الماك ولينكس هي نفس أوامر bash اللي اتشغّلت في Git Bash.

---

## ١. المشاريع بتتحط فين؟

في فولدر واحد ثابت جوه الـ home بتاعك، وكل مشروع جواه في فولدر لوحده:

~~~text الشكل اللي عايزينه
C:\Users\ali\               (الـ home: على الماك /Users/ali وعلى لينكس /home/ali)
└── projects\               (كل مشاريعك هنا)
    └── rokn-books\         (مشروع مكتبة الركن)
        └── index.html      (الصفحة الرئيسية)
~~~

- **الـ home** فولدر المستخدم بتاعك. ليه اختصار في الترمنال: [[~]].
- **[[projects]]** اسم اخترناه (MDN بتسميه [[web-projects]]). المهم يبقى مكان واحد تعرف ترجعله.
- **ليه مش سطح المكتب؟** لأن كل موقع فيه ملف اسمه [[index.html]]، وفولدر واحد مينفعش يشيل اتنين بنفس الاسم. فلازم كل مشروع في فولدره.

---

## ٢. انت واقف فين؟

افتح الترمنال (لو أول مرة: كورس «ابدأ من هنا» بيشرح بتفتحه إزاي). هو دايمًا واقف في فولدر. روح للـ home واسأله انت فين:

~~~powershell
cd ~
pwd
~~~

- [[cd]] اختصار change directory: «انقلني للفولدر ده».
- [[~]] معناها الـ home.
- [[pwd]] اختصار print working directory: «اطبع الفولدر اللي أنا فيه».

~~~text الناتج (PowerShell)
Path
----
C:\Users\ali
~~~

(في bash نفس الأمرين، والناتج سطر واحد: [[/c/Users/ali]] في Git Bash، و [[/Users/ali]] على الماك.)

---

## ٣. [[mkdir]]: اعمل فولدر

~~~powershell
mkdir projects
~~~

[[mkdir]] اختصار make directory. بياخد اسم الفولدر الجديد وبيعمله جوه المكان اللي انت فيه.

~~~text الناتج (PowerShell 7.6)
    Directory: C:\Users\ali

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          11/18/2026  6:25 PM                projects
~~~

إزاي تقرا الجدول ده (هتشوفه مع كل أمر بيعمل أو بيعرض ملفات):

| العمود | معناه |
|---|---|
| [[Directory:]] | الفولدر اللي الحاجة اتعملت جواه |
| [[Mode]] | أول حرف [[d]] يعني فولدر (directory). الملف بيبدأ بـ [[-]] |
| [[LastWriteTime]] | آخر تعديل |
| [[Length]] | الحجم بالبايت. فاضي للفولدرات |
| [[Name]] | الاسم |

في bash نفس الأمر [[mkdir projects]] ومبيطبعش أي حاجة لما ينجح. في الترمنال، السكوت معناه «تمام».

---

## ٤. [[cd]]: ادخل جواه

~~~powershell
cd projects
mkdir rokn-books
cd rokn-books
~~~

دخلنا [[projects]]، وعملنا جواه فولدر المشروع، ودخلناه. [[cd]] مبيطبعش حاجة، فاتأكد بـ [[pwd]]:

~~~text الناتج
C:\Users\ali\projects\rokn-books
~~~

تلات حاجات هتستخدمهم مع [[cd]] كل يوم:

| الأمر | بيعمل إيه |
|---|---|
| [[cd ..]] | ارجع فولدر واحد لفوق (النقطتين معناهم «الفولدر الأب») |
| [[cd ~]] | روح للـ home من أي مكان |
| اكتب أول حرفين ودوس Tab | الترمنال بيكمّل الاسم لوحده، فمبتغلطش في الإملاء |

**على الماك ولينكس** الخطوتين ٣ و ٤ ممكن يبقوا سطر واحد:

~~~bash
mkdir -p ~/projects/rokn-books
cd ~/projects/rokn-books
~~~

[[-p]] (من parents) بتقول لـ [[mkdir]]: اعمل كل الفولدرات اللي في المسار، ولو واحد منهم موجود متشتكيش. من غيرها [[mkdir projects/rokn-books]] بيرفض لو [[projects]] لسه مش موجود.

---

## ٥. [[ni]] و [[touch]]: اعمل الملف

دي الخطوة الوحيدة اللي أمرها مختلف بين النظامين.

**PowerShell:**

~~~powershell
ni index.html
~~~

[[ni]] اختصار [[New-Item]]: «اعمل حاجة جديدة». ولما تديله اسم من غير ما تقول نوعه بيعمل ملف.

~~~text الناتج (PowerShell 7.6)
    Directory: C:\Users\ali\projects\rokn-books

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          11/18/2026  6:25 PM              0 index.html
~~~

[[Mode]] بدأ بـ [[-]] مش [[d]]: ده ملف. و [[Length]] صفر: الملف فاضي.

**bash (الماك ولينكس و Git Bash):**

~~~bash
touch index.html
~~~

[[touch]] معناه الأصلي «المس الملف» (حدّث تاريخ تعديله). ولو الملف مش موجود بيعمله فاضي، وده اللي بنستخدمه هنا. مبيطبعش حاجة.

لو كتبت أمر نظام في التاني، دي الرسايل:

~~~text touch في PowerShell
touch: The term 'touch' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

~~~text ni في bash
bash: ni: command not found
~~~

الاتنين معناهم واحد: «مفيش أمر بالاسم ده هنا». مش غلطة منك في الفولدر ولا في الملف.

---

## ٦. شوف اللي عملته

~~~powershell
ls
~~~

[[ls]] اختصار list: اعرض اللي في الفولدر. في PowerShell بيطلّع نفس الجدول اللي فات. و [[dir]] بيعمل نفس الحاجة بالظبط (الاتنين اسمين لنفس الأمر [[Get-ChildItem]]).

في bash [[ls]] لوحده بيطبع الأسامي بس، و [[ls -l]] (الـ l من long) بيطبع سطر تفاصيل لكل ملف:

~~~text ls -l في Git Bash
total 0
-rw-r--r-- 1 ali 197609 0 Nov 18 18:25 index.html
~~~

اللي يهمك دلوقتي: أول حرف [[-]] يعني ملف ([[d]] يعني فولدر)، والرقم اللي قبل التاريخ ([[0]]) هو الحجم، وآخر حاجة الاسم.

ولو عايز تشوف المشروع كله كشجرة، من جوه [[projects]]:

~~~powershell
cd ..
tree /f
~~~

~~~text الناتج (ويندوز)
Folder PATH listing
C:.
└───rokn-books
        index.html
~~~

[[tree]] بيرسم الفولدرات، و [[/f]] (من files) بتخليه يعرض الملفات كمان. و [[C:.]] في أول الرسمة معناها «الفولدر اللي انت واقف فيه». ده أمر ويندوز. في Git Bash وعلى الماك [[tree]] مش موجود من غير تسطيب، والبديل الجاهز [[ls -R]] (الـ R من recursive: ادخل جوه كل فولدر):

~~~text ls -R في Git Bash
.:
rokn-books

./rokn-books:
index.html
~~~

متنساش ترجع للمشروع: [[cd rokn-books]].

---

## ٧. قواعد الأسامي

| القاعدة | بدل | اكتب |
|---|---|---|
| حروف إنجليزي صغيرة | [[Rokn-Books]] | [[rokn-books]] |
| من غير مسافات، والكلمات بينها [[-]] | [[rokn books]] | [[rokn-books]] |
| من غير عربي | [[مكتبة الركن]] | [[rokn-books]] |
| الامتداد صح وواحد | [[index.html.txt]] | [[index.html]] |

وده السبب، بالقياس مش بالكلام. عملت نفس الصفحة بتلات أسامي وفتحتهم في Chrome وقريت العنوان:

~~~text العنوان في Chrome 157
rokn-books/index.html
    file:///C:/Users/ali/projects/rokn-books/index.html

my site/Home Page.html
    file:///C:/Users/ali/projects/my%20site/Home%20Page.html

مكتبة الركن/الرئيسية.html
    file:///C:/Users/ali/projects/%D9%85%D9%83%D8%AA%D8%A8%D8%A9%20%D8%A7%D9%84%D8%B1%D9%83%D9%86/%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9.html
~~~

- الرابط مينفعش يبقى فيه مسافة، فالمتصفح بيبدّلها بـ [[%20]].
- كل حرف عربي بيتحول لرموز زي [[%D9%85]]. الصفحة بتفتح، بس الرابط ده هو اللي هتنسخه وتبعته، وهو اللي هتكتبه في أي لينك بين صفحاتك.
- **الحروف الكبيرة:** ويندوز والماك مبيفرّقوش بين [[Index.html]] و [[index.html]]، وأغلب السيرفرات بتفرّق. فالصفحة تشتغل عندك وتبوظ بعد الرفع. (دي من صفحة «Dealing with files» في MDN، مجرّبتهاش: المعمل هنا ويندوز.) لو كله حروف صغيرة المشكلة مبتحصلش أصلًا.
- **المسافة في الترمنال** بتفصل بين الكلمات، فأي اسم فيه مسافة هيحتاج علامات تنصيص في كل أمر.

---

## ٨. ليه [[index.html]] بالذات؟

لأن ده الاسم اللي السيرفرات بتدوّر عليه لما حد يطلب فولدر من غير ما يسمّي ملف. لما تكتب عنوان موقع وخلاص، السيرفر بيرجّعلك [[index.html]] اللي في الفولدر الرئيسي.

جرّبتها: شغّلت سيرفر صغير على فولدر المشروع (هتعمله في درس «start index.html و Ctrl+R») وطلبت العنوان من غير اسم ملف:

~~~text طلب الفولدر نفسه
http://127.0.0.1:8793/     ←  رجّع index.html (العنوان في الصفحة: مكتبة الركن)
~~~

فالصفحة الرئيسية لأي موقع اسمها [[index.html]]، والصفحات التانية بأسامي بتوصف اللي فيها: [[about.html]] و [[contact.html]].

---

## ٩. الغلطات اللي هتقابلها، برسايلها

### الفولدر موجود قبل كده

~~~text mkdir rokn-books مرة تانية (PowerShell 7.6)
New-Item: An item with the specified name C:\Users\ali\projects\rokn-books already exists.
~~~

~~~text نفس الحاجة في bash
mkdir: cannot create directory 'rokn-books': File exists
~~~

مفيش حاجة باظت ولا اتمسحت. الأمر بيقولك «موجود»، فادخله بـ [[cd rokn-books]] وكمّل.

### الملف موجود قبل كده

~~~text ni index.html مرة تانية
New-Item: The file 'C:\Users\ali\projects\rokn-books\index.html' already exists.
~~~

برضه حماية: [[ni]] مبيكتبش فوق ملف موجود. (في bash [[touch index.html]] على ملف موجود مبيعملش مشكلة ومبيلمسش محتواه.)

### اسم فولدر غلط في [[cd]]

~~~text cd rokn-book (ناقص s)
Set-Location: Cannot find path 'C:\Users\ali\projects\rokn-book' because it does not exist.
~~~

~~~text نفس الحاجة في bash
bash: cd: rokn-book: No such file or directory
~~~

الرسالة فيها المسار اللي دوّر عليه. اقراه: غالبًا حرف ناقص، أو انت واقف في فولدر غير اللي فاكره ([[pwd]] و [[ls]] يحسموها).

### الملف اتحفظ [[index.html.txt]]

دي بتحصل لما تكتب الصفحة في Notepad وتحفظها: بيزوّد [[.txt]] في الآخر، وويندوز بيخبّي الامتدادات فتشوف الاسم [[index.html]] عادي. والنتيجة: المتصفح بيعرض الكود نص. الترمنال بيكشفها:

~~~text ls -Name
index.html.txt
~~~

والتصليح: [[ren index.html.txt index.html]] (في bash: [[mv index.html.txt index.html]]). ومن الدرس الجاي هتكتب في VS Code، وهو بيحفظ بالاسم اللي انت كاتبه من غير إضافات.

---

## الأنظمة جنب بعض

| عايز | PowerShell (ويندوز) | bash و zsh (الماك ولينكس و Git Bash) |
|---|---|---|
| أنا فين | [[pwd]] | [[pwd]] |
| اعمل فولدر | [[mkdir rokn-books]] | [[mkdir rokn-books]] |
| ادخله | [[cd rokn-books]] | [[cd rokn-books]] |
| اعمل ملف | [[ni index.html]] | [[touch index.html]] |
| كذا ملف | [[ni a.html, b.html]] | [[touch a.html b.html]] |
| اعرض | [[ls]] أو [[dir]] | [[ls -l]] |
| شجرة | [[tree /f]] | [[ls -R]] |
| غيّر اسم | [[ren old.html new.html]] | [[mv old.html new.html]] |

لو عايز تفاصيل أي أمر منهم: كورس PowerShell (درس «New-Item» و «Set-Location») وكورس bash (دروس «mkdir» و «cd» و «touch» و «ls»).

---

## الخلاصة

- المشاريع في [[~/projects]]، وكل مشروع فولدر.
- [[mkdir]] ثم [[cd]] ثم [[ni]] أو [[touch]] ثم [[ls]]: اعمل، ادخل، اعمل الملف، اتأكد.
- الأسامي: إنجليزي صغير، من غير مسافات، بـ [[-]] بين الكلمات. والرئيسية اسمها [[index.html]].
- [[already exists]] و [[does not exist]] مش كوارث: اقرا المسار اللي في الرسالة.

**الفولدر دلوقتي:** [[projects/rokn-books]] وجواه [[index.html]] حجمه صفر. الدرس الجاي بيفتحه في VS Code ويكتب فيه.`,
          lines: [
            R`[[cd ~]]: روح للـ home بتاعك ([[C:\Users\ali]])، عشان تبدأ من مكان معروف مهما كان الترمنال فاتح فين.`,
            R`[[mkdir projects]]: اعمل الفولدر اللي هيشيل كل مشاريعك. بيتعمل مرة واحدة في العمر، ولو موجود هيرد بـ [[already exists]].`,
            R`[[cd projects]]: ادخل جواه، عشان اللي هيتعمل بعد كده يتعمل هنا.`,
            R`[[mkdir rokn-books]]: فولدر المشروع. الاسم حروف صغيرة و [[-]] بدل المسافة.`,
            R`[[cd rokn-books]]: ادخل المشروع. من هنا لآخر الوحدة، ده الفولدر اللي الترمنال واقف فيه.`,
            R`[[ni index.html]]: [[ni]] اختصار [[New-Item]]. بيعمل ملف فاضي (0 بايت) بالاسم ده، وبيرفض لو الملف موجود.`,
            R`[[ls]]: اعرض محتوى الفولدر واتأكد إن الملف اتعمل بالاسم الصح وفي المكان الصح.`,
            R`[[cd ~]]: نفس البداية على الماك ولينكس: الـ home ([[/Users/ali]] أو [[/home/ali]]).`,
            R`[[mkdir -p projects/rokn-books]]: الفولدرين في أمر واحد. [[-p]] بتعمل أي فولدر ناقص في المسار ومبتشتكيش لو موجود.`,
            R`[[cd projects/rokn-books]]: ادخل المشروع مرة واحدة بالمسار كله.`,
            R`[[touch index.html]]: بيعمل الملف فاضي لو مش موجود. ولو موجود مبيلمسش محتواه.`,
            R`[[ls -l]]: القايمة بالتفاصيل: أول حرف [[-]] يعني ملف، والرقم اللي قبل التاريخ هو الحجم (0).`
          ],
          sol: R`الأوامر بترجّع جدول فيه [[index.html]] بحجم 0. والمرة التانية [[mkdir rokn-books]] بيرفض:

~~~text PowerShell 7.6
New-Item: An item with the specified name C:\Users\ali\projects\rokn-books already exists.
~~~

~~~text Windows PowerShell 5.1 (نفس المعنى، بشكل أطول)
mkdir : An item with the specified name C:\Users\ali\projects\rokn-books already exists.
    + CategoryInfo          : ResourceExists: (C:\Users\ali\projects\rokn-books:String) [New-Item], IOException
    + FullyQualifiedErrorId : DirectoryExist,Microsoft.PowerShell.Commands.NewItemCommand
~~~

~~~text bash
mkdir: cannot create directory 'rokn-books': File exists
~~~

**معناها:** فيه حاجة بالاسم ده في المكان ده. الفولدر القديم واللي جواه زي ما هم: [[mkdir]] مبيمسحش ومبيبدّلش. فالتصرف الصح إنك تدخله ([[cd rokn-books]])، مش إنك تدوّر على طريقة «تجبر» الأمر.

لاحظ إن bash بيقول [[File exists]] حتى لو اللي موجود فولدر: عنده كل حاجة على الديسك «file».`,
          ref: [
            { t: "MDN: Dealing with files", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files" },
            { t: "Microsoft Learn: New-Item", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-item" },
          ],
          pre: [{ to: "start", why: R`لو لسه مش عارف تفتح الترمنال على نظامك` }]
        },
        {
          cmd: "code . و Emmet !",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب اختصار Emmet واحد يطلّع الكود ده بالظبط، وجرّبه في [[practice-site/index.html]]:

~~~html
<h2></h2>
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
~~~`, done: R`سطر واحد من ١٠ حروف، ولما دوست Tab طلع عنوان وتحته قايمة فيها أربع عناصر.`, sol: R`~~~text الاختصار
h2+ul>li*4
~~~

**ليه كده:**

- [[+]] معناها «جنبه»: الـ [[ul]] أخ للـ [[h2]] مش جواه.
- [[>]] معناها «جواه»: الـ [[li]] ابن للـ [[ul]].
- [[*4]] معناها «كرّره أربع مرات».

الترتيب بيتقري من الشمال لليمين: عنوان، وجنبه قايمة، وجواها عنصر مكرر أربع مرات.

**الغلطة الشائعة:** [[h2>ul>li*4]]. دي بتحط القايمة **جوه** العنوان، وده HTML غلط (العنوان بياخد كلام بس). الفرق كله في علامة واحدة.

الناتج هو الكود اللي في التمرين. (معنى العلامات من وثائق Emmet، صفحة Abbreviations Syntax.)` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** فتحت ملف جديد [[practice-site/about.html]]، كتبت [[!]] ودوست Tab، وكتبت جوه الـ body فقرة عربي وحفظت. من غير ما تغيّر أي حاجة تانية: الفقرة هتبدأ من يمين الصفحة ولا شمالها؟ والنقطة اللي في آخر الجملة هتظهر فين؟`, done: R`قلت «من الشمال، والنقطة في أول السطر من الشمال» قبل ما تفتح الصفحة، وعرفت أنهي سطر في الهيكل هو السبب.`, sol: R`~~~live 60 80 هيكل Emmet زي ما هو، وجواه عربي
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
</body>
</html>
~~~

**اللي هتشوفه:** الفقرة لازقة في شمال الصفحة واليمين فاضي، والنقطة اللي المفروض تبقى آخر الجملة راحت لأقصى الشمال، قبل الكلام. (على عرض الموبايل الفقرة بتبقى سطرين: التاني بيبدأ من الشمال والنقطة قبله.)

**ليه:** Emmet بيكتب [[<html lang="en">]] ومبيكتبش [[dir]] خالص. فالصفحة اتجاهها [[ltr]] (من الشمال لليمين). الحروف العربي نفسها بتتكتب صح من اليمين، بس «بداية السطر» بقت الشمال، وعلامات الترقيم بتتحط على أساس اتجاه الصفحة.

**التصليح:** [[<html lang="ar" dir="rtl">]]، و [[<title>]] يتغيّر من [[Document]] لاسم الصفحة.

~~~text القياس (Chrome 157، عرض 360)
lang="en" من غير dir:   direction = ltr   مسافة القايمة = padding-left 40px
lang="ar" dir="rtl":    direction = rtl   مسافة القايمة = padding-right 40px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني حاجة:** في [[practice-site/index.html]] اعمل صفحة «كشك الجرايد» (اسم متخيل) بـ Emmet من غير ما تكتب ولا tag بإيدك: الهيكل، وعنوان رئيسي، وفقرة، وعنوان فرعي «بنبيع إيه»، وقايمة من تلات حاجات، ولينك تليفون. اكتب الاختصارات اللي استخدمتها بالترتيب.`, done: R`الصفحة فيها [[h1]] واحد و [[h2]] واحد و ٣ [[li]] ولينك [[tel:]]، و [[lang="ar" dir="rtl"]]، ومكتبتش علامة [[<]] ولا مرة.`, sol: R`**الاختصارات بالترتيب** (كل واحد وبعده Tab):

~~~text
!
h1{كشك الجرايد}
p{جرايد ومجلات وكروت شحن، من ٦ الصبح.}
h2{بنبيع إيه}
ul>li*3
a:tel
~~~

وبعدين: غيّر [[lang="en"]] لـ [[lang="ar" dir="rtl"]]، واكتب العنوان في [[<title>]]، واملا الـ [[li]] التلاتة، وكمّل الرقم في الـ [[href]] واكتب نص اللينك.

~~~live 280 280 index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>كشك الجرايد</title>
</head>
<body>
    <h1>كشك الجرايد</h1>
    <p>جرايد ومجلات وكروت شحن، من ٦ الصبح.</p>
    <h2>بنبيع إيه</h2>
    <ul>
        <li>جرايد ومجلات</li>
        <li>كروت شحن</li>
        <li>مناديل ولبان</li>
    </ul>
    <a href="tel:+200000000000">كلّمنا</a>
</body>
</html>
~~~

**ليه كده:** [[{}]] بتحط النص جوه العنصر، فالعنوان والفقرة بيطلعوا جاهزين. و [[a:tel]] بيكتب [[<a href="tel:+"></a>]] والمؤشر واقف بعد علامة [[+]] مستني الرقم.

**الغلطة الشائعة:** تسيب [[<title>Document</title>]]. الصفحة بتشتغل، بس التاب في المتصفح مكتوب عليه Document، وده أول حاجة اللي بيراجع شغلك بيلاحظها.

~~~text الناتج (Chrome 157)
h1: 1   h2: 1   li: 3   a: 1 (tel:+200000000000)   title = كشك الجرايد
الـ validator: The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة دي شغالة، بس مكتوبة من غير أي ترتيب. الصقها في [[practice-site/about.html]] ورتّبها بأمر واحد من VS Code، من غير ما تلمس المسافات بإيدك:

~~~html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
      <title>عن الكشك</title>
</head>
<body>
<h1>عن الكشك</h1>
        <p>فاتحين من سنة ٢٠٠٥.</p>
  <ul><li>جرايد</li><li>مجلات</li></ul>
</body>
</html>
~~~`, done: R`كل عنصر جوه عنصر تاني مزقوق لجوه بنفس المسافة، وكل [[li]] في سطر لوحده، والصفحة في المتصفح زي ما هي بالظبط.`, sol: R`**الأمر:** [[Shift+Alt+F]] (على الماك [[Shift+Option+F]])، أو كليك يمين جوه الملف ثم Format Document. وبعدين [[Ctrl+S]].

~~~html
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <title>عن الكشك</title>
</head>

<body>
    <h1>عن الكشك</h1>
    <p>فاتحين من سنة ٢٠٠٥.</p>
    <ul>
        <li>جرايد</li>
        <li>مجلات</li>
    </ul>
</body>

</html>
~~~

**ليه كده:** المتصفح مبيهتمش بالمسافات اللي في أول السطر: النسختين بيطلّعوا نفس الصفحة. الترتيب ليك انت: لما كل ابن مزقوق لجوه عن أبوه، بتشوف بعينك مين جوه مين، والـ tag اللي مش مقفول بيبان من أول نظرة.

**الغلطة الشائعة:** ترتّب بالمسطرة وزرار Tab سطر سطر. ده شغل المحرر.

الشكل اللي فوق متكتب من الإعدادات الافتراضية للـ formatter في VS Code 1.147 (المسافة 4، والإعداد [[html.format.extraLiners]] قيمته [[head, body, /html]]، وده اللي بيسيب سطر فاضي قبل التلاتة دول)، مش من تشغيل الأمر في المعمل ده. لو طلعلك فرق في السطور الفاضية فده من إعدادات [[html.format]] عندك.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من غير ما الدرس يقولك: افتح إعدادات VS Code ([[Ctrl+,]]) ودوّر على [[auto save]]. إيه الأربع قيم اللي ينفع تختار منهم؟ وأنهي واحدة هتخلي الملف يتحفظ لما تروح للمتصفح؟ ولو اخترت [[afterDelay]]، بيستنى قد إيه؟`, done: R`كتبت الأربع قيم ومعنى كل واحدة في سطر، واخترت واحدة لنفسك وقلت ليه.`, sol: R`**الإجابة (من صفحة Basic Editing في وثائق VS Code، قسم Save / Auto Save):**

| القيمة | معناها |
|---|---|
| [[off]] | مفيش حفظ تلقائي. ده الافتراضي: لازم [[Ctrl+S]] |
| [[afterDelay]] | بيحفظ بعد ما تبطّل كتابة بمدة. المدة في [[files.autoSaveDelay]]، والافتراضي 1000 ملي ثانية (ثانية واحدة) |
| [[onFocusChange]] | بيحفظ لما المؤشر يسيب الملف (تدوس على ملف تاني أو على الترمنال) |
| [[onWindowChange]] | بيحفظ لما تسيب شباك VS Code نفسه، يعني لما تروح للمتصفح |

فاللي بيحفظ «لما تروح للمتصفح» هو [[onWindowChange]]. وأسهل طريق ليها من غير الإعدادات: قايمة File ثم Auto Save (بتشغّل [[afterDelay]]).

**رأي:** وانت بتتعلم، خليها [[off]] أسبوع. لما تدوس [[Ctrl+S]] بإيدك بتبقى عارف إمتى الملف اتغيّر على الديسك، وده بيفهّمك لفة «احفظ ثم Ctrl+R» اللي في الدرس الجاي. وبعد كده شغّل [[onWindowChange]].

**الغلطة الشائعة:** تشغّل Auto Save وتنسى إنك شغّلته، وبعدين تستغرب إن ملف اتغيّر وانت «مكنتش حفظت».` },
          ],
          title: "VS Code: افتح الفولدر واكتب الصفحة",
          desc: R`[[code .]] بيفتح الفولدر اللي انت فيه في VS Code. وجوه ملف HTML، علامة [[!]] وبعدها Tab بتكتب هيكل الصفحة كله (ده Emmet، مدمج في المحرر). وبعدها: [[Ctrl+S]] للحفظ، و [[Shift+Alt+F]] لترتيب الكود، و [[Ctrl+$__bt]] للترمنال اللي جوه المحرر.

هنبدأ من الفولدر اللي الدرس اللي فات خلص بيه ([[projects/rokn-books]] وجواه [[index.html]] فاضي)، ونخلص والملف فيه صفحة «مكتبة الركن» كاملة ومحفوظة.

الدرس ده بيوريك اللي محتاجه من VS Code لصفحة HTML بس. كل اختصار هنا ليه درس كامل في كورس VS Code، واللينكات في الشرح.`,
          example: R`code .                 Open the current folder in VS Code
! then Tab             The HTML skeleton
h1{text}               <h1>text</h1>
ul>li*3                A list with 3 items
a:tel                  <a href="tel:+"></a>
Ctrl+S                 Save (Mac: Cmd+S)
Shift+Alt+F            Format Document (Mac: Shift+Option+F)
Ctrl+$__bt                 Show or hide the integrated terminal`,
          try: R`افتح [[rokn-books]] بـ [[code .]]، وافتح [[index.html]]، واكتب [[!]] ودوس Tab. قبل ما تغيّر أي حاجة: عدّ السطور اللي اتكتبت، وقول كل سطر منهم اتشرح في أنهي درس من الوحدة اللي فاتت.`,
          flag: "keys",
          deep: {
            why: R`تقدر تكتب HTML في أي محرر نصوص. بس Notepad بيحفظ الملف [[.txt]]، ومبيلوّنش الكود، ومبيقفلش الـ tags. VS Code بيعمل التلاتة، وبيوريك ملفات المشروع كلها جنب الكود، وفيه ترمنال جواه. و Emmet بيشيل عنك كتابة نفس العشر سطور في أول كل صفحة، فمبتنساش [[charset]] ولا [[viewport]].`,
            how: R`[[code]] برنامج صغير بيتسطّب مع VS Code (على ويندوز ولينكس). النقطة معناها «الفولدر الحالي»، فالمحرر بيفتح والفولدر ده هو جذر المشروع: الـ Explorer بيعرض ملفاته، والترمنال المدمج بيبدأ منه.

Emmet بيقرا الاختصار اللي قبل المؤشر ويبدّله بالكود. [[!]] معناها جوه VS Code [[!!!+doc]]: سطر الـ doctype وبعده هيكل المستند. المحرر بيعرضه كاقتراح وانت بتكتب، و Tab أو Enter بيقبلوا الاقتراح.

والملف اللي بتكتب فيه نسخة في ذاكرة المحرر. الديسك مبيتغيّرش غير لما تحفظ. والمتصفح بيقرا من الديسك.`,
            when: R`كل مرة تبدأ مشروع أو ترجع لمشروع: [[cd]] للفولدر ثم [[code .]]. و [[!]] في أول كل ملف HTML جديد. والحفظ قبل كل مرة تبص على المتصفح.`,
            mistakes: R`تفتح الملف لوحده (دبل كليك) بدل الفولدر: مفيش Explorer، والترمنال بيبدأ من مكان تاني. تسيب [[lang="en"]] و [[<title>Document</title>]] زي ما Emmet كتبهم. تكتب [[!]] في ملف مش محفوظ باسم آخره [[.html]]: المحرر مش عارف إنه HTML فـ Emmet مش بيشتغل. وتنسى الحفظ وتقعد تدوّر على المشكلة في الكود.`
          },
          teach: R`## الفكرة في سطرين

هنفتح فولدر المشروع في المحرر، ونخلّي المحرر يكتب الهيكل، ونكتب احنا المحتوى، ونحفظ.

[[code .]] و [[code --version]] اتشغّلوا هنا على VS Code 1.147 على Windows 11. خطوات الواجهة (القوايم، والزراير، والاختصارات) من وثائق VS Code الرسمية. وشكل اللي Emmet بيكتبه من ملف الاختصارات اللي جوه VS Code 1.147 نفسه ومن وثائق Emmet.

---

## ١. افتح الفولدر، مش الملف

وانت واقف في [[rokn-books]] في الترمنال:

~~~powershell
code .
~~~

- [[code]] الأمر اللي بيشغّل VS Code.
- [[.]] معناها «الفولدر اللي أنا فيه».

الأمر مبيطبعش حاجة، وبيفتح شباك VS Code على الفولدر. (نفس الأمر على الماك ولينكس.)

تلات حاجات ممكن تقابلك:

| اللي حصل | معناه | تعمل إيه |
|---|---|---|
| سؤال «Do you trust the authors…» | VS Code بيسأل قبل ما يشغّل أي حاجة من فولدر أول مرة يشوفه | ده فولدرك انت: اختار Yes |
| [[code]] مش متعرّف (ويندوز أو لينكس) | الترمنال اتفتح قبل ما VS Code يتسطّب | اقفل الترمنال وافتحه تاني |
| [[code]] مش متعرّف (الماك) | الأمر محتاج خطوة تسطيب | في VS Code: [[Cmd+Shift+P]] واكتب Shell Command: Install 'code' command in PATH |

ولو مفيش فايدة: افتح VS Code بإيدك، ومن قايمة File اختار Open Folder، واختار [[rokn-books]]. النتيجة واحدة.

**ليه الفولدر مش الملف؟** لأن المشروع هيبقى فيه كذا ملف، ولأن الترمنال اللي جوه المحرر بيبدأ من الفولدر المفتوح. التفاصيل في كورس VS Code، درس «code .».

---

## ٢. الشاشة قدامك فيها إيه

| الجزء | مكانه | بتستخدمه في إيه |
|---|---|---|
| Activity Bar | شريط أيقونات على أقصى الشمال | بتبدّل بين الملفات والبحث وغيرهم |
| Explorer (في الـ Side Bar) | العمود اللي جنبه | ملفات المشروع. هتلاقي فيه [[index.html]] |
| Editor | المساحة الكبيرة | بتكتب هنا. كل ملف مفتوح ليه تاب فوق |
| Panel | تحت (بيظهر لما تفتح الترمنال) | الترمنال والأخطاء |
| Status Bar | الشريط اللي تحت خالص | نوع الملف (HTML)، والترميز (UTF-8)، ورقم السطر |

لو الـ Explorer مش ظاهر: [[Ctrl+B]] بيظهّر العمود ويخبّيه.

دوس على [[index.html]] في الـ Explorer: هيتفتح فاضي في الـ Editor. بصّ على الـ Status Bar: مكتوب HTML. المحرر عرف نوع الملف من الامتداد، وده اللي بيشغّل التلوين و Emmet.

---

## ٣. ملف جديد من المحرر كمان

في الدرس اللي فات عملنا الملف بـ [[ni]]. من المحرر: حرّك الماوس على اسم الفولدر في الـ Explorer، هتظهر أيقونة New File (ورقة عليها علامة +)، أو كليك يمين في العمود ثم New File، واكتب الاسم **بالامتداد**: [[about.html]].

الطريقتين بيعملوا نفس الملف على الديسك. استخدم اللي أقرب لإيدك. (متعملش [[about.html]] دلوقتي، هنحتاجه في آخر درس.)

---

## ٤. [[!]] وبعدها Tab: الهيكل كله

جوه [[index.html]] الفاضي اكتب علامة التعجب:

~~~text
!
~~~

هتظهر قايمة اقتراحات صغيرة أول بند فيها [[!]] ومكتوب جنبه Emmet Abbreviation. دوس Tab (أو Enter). المحرر هيكتب:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
~~~

كل سطر هنا انت عارفه من درس «<!doctype html>»:

| السطر | هو إيه | محتاج تغيّره؟ |
|---|---|---|
| [[<!DOCTYPE html>]] | بيقول للمتصفح «صفحة حديثة». الحروف الكبيرة والصغيرة فيه واحد | لأ |
| [[<html lang="en">]] | لغة الصفحة | **آه**: [[lang="ar" dir="rtl"]] |
| [[<meta charset="UTF-8">]] | الترميز، عشان العربي ميطلعش رموز | لأ |
| [[<meta name="viewport" …>]] | عشان الموبايل يعرض الصفحة بعرضه الحقيقي | لأ |
| [[<title>Document</title>]] | الاسم اللي على التاب | **آه**: اسم صفحتك |
| [[<body>]] | المؤشر واقف جواه، مستني المحتوى | اكتب هنا |

بعد ما Emmet يكتب، روح لسطر الـ [[<title>]] وبدّل كلمة [[Document]] باسم صفحتك، وبعدين انزل للسطر الفاضي اللي جوه الـ [[body]].

> لو دوست Tab ولقيت مسافة اتزوّدت ومفيش هيكل: قايمة الاقتراحات كانت مقفولة (مثلًا دوست Esc قبلها). امسح، واكتب [[!]] تاني، واستنى القايمة تظهر. ولو مبتظهرش خالص: الملف مش محفوظ باسم آخره [[.html]].

### غيّر اللغة والاتجاه

السطر التاني يبقى:

~~~html
<html lang="ar" dir="rtl">
~~~

من غيره الصفحة العربي هتبدأ من الشمال وعلامات الترقيم هتتلخبط (التمرين التاني بيوريك الشكل). التفاصيل في درس «lang و dir».

---

## ٥. اختصارات بتكسب من أول يوم

Emmet مش للهيكل بس. أي اسم عنصر وبعده Tab بيتكتب مفتوح ومقفول. وفيه خمس علامات بتخليك تكتب سطر وتاخد عشرة:

| العلامة | معناها | مثال | بيطلّع |
|---|---|---|---|
| (اسم لوحده) | العنصر | [[h1]] | [[<h1></h1>]] |
| [[{}]] | النص اللي جواه | [[h1{مكتبة الركن}]] | [[<h1>مكتبة الركن</h1>]] |
| [[>]] | جواه | [[ul>li]] | [[li]] جوه [[ul]] |
| [[*]] | كرّره | [[ul>li*3]] | قايمة فيها تلات عناصر |
| [[+]] | جنبه | [[h2+p]] | عنوان وبعده فقرة |
| [[:]] | نسخة جاهزة من العنصر | [[a:tel]] | [[<a href="tel:+"></a>]] |

اللي هنستخدمهم دلوقتي:

~~~text
ul>li*3
~~~

~~~html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
~~~

[[<ul>]] قايمة و [[<li>]] عنصر فيها (شفتهم جوه الـ [[nav]] في درس «semantic HTML»، وليهم وحدة كاملة بعدين: «القوايم والاقتباسات»). المؤشر بيقف جوه أول [[li]]، وبعد ما تكتب، Tab بينقلك للي بعده.

~~~text
a:tel
~~~

~~~html
<a href="tel:+"></a>
~~~

لينك تليفون، والمؤشر بعد علامة [[+]] عشان تكمّل الرقم.

والمحرر بيساعدك حتى من غير Emmet: لما تكتب [[<p>]] بإيدك، أول ما تقفل القوس بيكتبلك [[</p>]] لوحده.

باقي العلامات والتركيبات الأطول في كورس VS Code، درس «Emmet».

---

## ٦. اكتب صفحة المكتبة

جوه الـ [[body]]، بالاختصارات دي بالترتيب (كل واحد وبعده Tab): [[h1{مكتبة الركن}]] ثم [[p]] ثم [[h2{مواعيد العمل}]] ثم [[ul>li*3]] ثم [[p>a:tel]]. واملا الكلام. الملف يبقى:

~~~live 280 300 index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <h1>مكتبة الركن</h1>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
    <h2>مواعيد العمل</h2>
    <ul>
        <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
        <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
        <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
    </ul>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
</body>
</html>
~~~

اللي المفروض تشوفه في المعاينة: عنوان كبير، وتحته فقرة، وعنوان أصغر، وقايمة بتلات نقط على اليمين، ولينك أزرق. كل ده شكل المتصفح الافتراضي: مفيش ولا سطر CSS.

(المعاينة اللي فوق من الموقع ده. على جهازك لسه مشفتش حاجة: الملف مفتوح في المحرر بس. فتحه في المتصفح هو الدرس الجاي.)

---

## ٧. الحفظ: النقطة اللي على التاب

بصّ على تاب [[index.html]] فوق: مكان علامة الإغلاق (×) فيه **نقطة**. دي معناها «في تعديلات مش محفوظة». اللي انت شايفه في المحرر لسه مش على الديسك، والمتصفح بيقرا من الديسك.

~~~text
Ctrl+S        (على الماك: Cmd+S)
~~~

النقطة بترجع ×. دلوقتي الملف على الديسك هو اللي قدامك. اتأكد من الترمنال:

~~~powershell
ls
~~~

~~~text الناتج (PowerShell 7.6)
    Directory: C:\Users\ali\projects\rokn-books

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          11/18/2026  6:27 PM            745 index.html
~~~

[[Length]] بقى 745 بدل 0: الملف اتكتب فيه. (الرقم عندك ممكن يختلف شوية حسب المسافات ونوع نهاية السطر.)

**الحفظ التلقائي:** من قايمة File اختار Auto Save، والمحرر هيحفظ لوحده بعد ثانية من آخر حرف. مريح، بس وانت بتتعلم الأحسن تحفظ بإيدك لحد ما اللفة تثبت في دماغك (التمرين الخامس فيه القيم الأربعة).

---

## ٨. رتّب الكود بضغطة

~~~text
Shift+Alt+F        (على الماك: Shift+Option+F، وعلى لينكس: Ctrl+Shift+I)
~~~

ده أمر Format Document: بيظبط المسافات اللي في أول كل سطر بحيث كل عنصر جوه عنصر تاني يبقى مزقوق لجوه. الصفحة في المتصفح مبتتغيّرش، بس انت بتشوف مين جوه مين، والـ tag اللي نسيت تقفله بيبان. (درسه في كورس VS Code: «Shift+Alt+F».)

---

## ٩. الترمنال اللي جوه المحرر

~~~text
Ctrl+$__bt        (المفتاح اللي تحت Esc. أو من القايمة: Terminal ثم New Terminal)
~~~

بيفتح ترمنال في الـ Panel تحت الكود، وبيبدأ من فولدر المشروع المفتوح. يعني من غير [[cd]]: اكتب [[ls]] وهتلاقي [[index.html]]. من هنا ورايح مش محتاج شباك ترمنال لوحده: المحرر والترمنال في مكان واحد. (درسه في كورس VS Code: «Ctrl+$__bt».)

---

## الخلاصة

| الخطوة | بتعملها إزاي |
|---|---|
| افتح المشروع | [[code .]] من جوه الفولدر |
| الهيكل | [[!]] ثم Tab، وغيّر [[lang]] و [[dir]] و [[title]] |
| المحتوى | اسم العنصر ثم Tab، و [[ul>li*3]] و [[a:tel]] |
| احفظ | [[Ctrl+S]]، والنقطة على التاب تختفي |
| رتّب | [[Shift+Alt+F]] |
| ترمنال | [[Ctrl+$__bt]] |

**الفولدر دلوقتي:** [[rokn-books/index.html]] فيه الصفحة كاملة ومحفوظة (745 بايت)، ومفتوح في VS Code. الدرس الجاي بيفتحه في Chrome.`,
          lines: [
            R`[[code .]]: افتح الفولدر الحالي في VS Code. النقطة هي الفولدر اللي الترمنال واقف فيه، فلازم تكون جوه [[rokn-books]].`,
            R`[[!]] ثم Tab: Emmet بيكتب هيكل الصفحة: doctype و html و head (فيه charset و viewport و title) و body.`,
            R`[[h1{text}]]: اسم العنصر وبين القوسين النص اللي جواه. بيطلع العنصر مفتوح ومقفول والنص في النص.`,
            R`[[ul>li*3]]: [[>]] يعني جواه و [[*3]] يعني تلات مرات: قايمة فيها تلات عناصر فاضيين.`,
            R`[[a:tel]]: نسخة جاهزة من اللينك للتليفون، والمؤشر واقف بعد [[+]] مستني الرقم.`,
            R`[[Ctrl+S]]: اكتب الملف على الديسك. قبلها التعديل في المحرر بس، والنقطة على التاب بتقول كده.`,
            R`[[Shift+Alt+F]]: Format Document. بيرتّب مسافات أول السطر في الملف كله من غير ما يغيّر الصفحة.`,
            R`[[Ctrl+$__bt]]: يظهّر ويخبّي الترمنال اللي جوه المحرر، وبيبدأ من فولدر المشروع.`
          ],
          sol: R`**عشر سطور.** (الحادي عشر السطر الفاضي اللي جوه الـ body.)

| السطر | اتشرح فين |
|---|---|
| [[<!DOCTYPE html>]] | «<!doctype html>» |
| [[<html lang="en">]] | «lang و dir» |
| [[<head>]] و [[</head>]] | «<!doctype html>» |
| [[<meta charset="UTF-8">]] | «<!doctype html>» |
| [[<meta name="viewport" …>]] | «<!doctype html>» |
| [[<title>]] | «<!doctype html>» |
| [[<body>]] و [[</body>]] و [[</html>]] | «<!doctype html>» و «مقدمة HTML والـ Tags» |

فمفيش سطر في اللي Emmet كتبه انت مش فاهمه. هو بس وفّر عليك الكتابة.

الفرق الوحيد عن اللي اتعلمته: Emmet بيكتب [[<!DOCTYPE html>]] بحروف كبيرة و [[UTF-8]] بحروف كبيرة و [[initial-scale=1.0]]. التلاتة زي [[<!doctype html>]] و [[utf-8]] و [[initial-scale=1]] بالظبط عند المتصفح. الدليل: بعتّ الهيكل زي ما Emmet كتبه للـ validator:

~~~text الناتج
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
~~~

(«بعتّه للـ validator» دي هتتعلمها في درس «View Source و validator».)`,
          ref: [
            { t: "VS Code Docs: Emmet in Visual Studio Code", url: "https://code.visualstudio.com/docs/languages/emmet" },
            { t: "VS Code Docs: HTML in Visual Studio Code", url: "https://code.visualstudio.com/docs/languages/html" },
            { t: "VS Code Docs: Basic editing (Save / Auto Save, Formatting)", url: "https://code.visualstudio.com/docs/editing/codebasics" },
            { t: "VS Code Docs: User interface", url: "https://code.visualstudio.com/docs/getstarted/userinterface" },
            { t: "VS Code Docs: Terminal basics", url: "https://code.visualstudio.com/docs/terminal/basics" },
            { t: "VS Code Docs: Command line interface", url: "https://code.visualstudio.com/docs/configure/command-line" },
            { t: "Emmet Docs: Abbreviations syntax", url: "https://docs.emmet.io/abbreviations/syntax/" },
          ],
          pre: [
            "css/mkdir و ni و touch",
            { to: "css/lang و dir", why: R`عشان تعرف ليه بنغيّر [[lang="en"]] اللي Emmet بيكتبها` },
            { to: "vscode/code .", why: R`الدرس الكامل للأمر [[code]] وخياراته` },
            { to: "vscode/Emmet", why: R`باقي علامات Emmet والتركيبات الأطول` },
          ]
        },
        {
          cmd: "start index.html و Ctrl+R",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** افتح [[practice-site/index.html]] في Chrome بتلات طرق مختلفة (من الترمنال، وبالسحب من VS Code، وبـ [[Ctrl+O]] من جوه Chrome). في كل مرة انسخ العنوان من شريط العنوان وقارن.`, done: R`التلات عناوين متطابقين حرف بحرف وبيبدأوا بـ [[file:///]]، وعرفت إن الطريقة مش مهمة: المهم العنوان اللي في الآخر.`, sol: R`~~~powershell
start index.html
~~~

~~~bash
open index.html       # Mac
xdg-open index.html   # Linux
~~~

والطريقتين التانيين بالماوس: اسحب [[index.html]] من الـ Explorer في VS Code وارميه على شباك Chrome. أو في Chrome دوس [[Ctrl+O]] (على الماك [[Cmd+O]]) واختار الملف.

**ليه التلاتة واحد:** في كل الحالات انت بتدّي المتصفح مسار ملف على الديسك، وهو بيحوّله لعنوان [[file:///]]. الملف واحد، فالعنوان واحد.

**الغلطة الشائعة:** تفتح الملف من نسخة تانية ليه (في Downloads مثلًا) وتعدّل في نسخة [[projects]]. العنوان هو اللي بيكشفها.

~~~text الناتج (التلات مرات)
file:///C:/Users/ali/projects/practice-site/index.html
~~~

[[start index.html]] اتشغّل هنا مرة واحدة على ويندوز. [[open]] و [[xdg-open]] من صفحات الـ man بتاعتهم.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ده عنوان من شريط العنوان عند زميلك:

~~~text
file:///C:/Users/ali/Desktop/New%20folder%20(2)/index%20-%20Copy.html
~~~

من غير ما تشوف جهازه: الملف اسمه إيه بالظبط؟ وفي أنهي فولدر؟ والصفحة دي ينفع يبعتلك لينكها تفتحها؟ وإيه اللي تنصحه بيه؟`, done: R`كتبت اسم الملف والفولدر بالمسافات الحقيقية، وقلت «لأ» وليه، واقترحت اسمين جداد.`, sol: R`**القراية:** كل [[%20]] مسافة. يبقى:

~~~text
الفولدر:  C:\Users\ali\Desktop\New folder (2)
الملف:    index - Copy.html
~~~

**ينفع يبعت اللينك؟** لأ. [[file:///]] معناها «ملف على الديسك بتاع الجهاز ده». لو فتحته عندك، متصفحك هيدوّر على [[C:\Users\ali\Desktop\...]] على جهازك انت، ومش هيلاقيه. اللي بيتبعت هو الملف نفسه (أو لينك [[https://]] بعد ما الموقع يترفع).

**النصيحة:**

- الاسم [[New folder (2)]] و [[index - Copy]] معناهم إن فيه نسخ كتير من نفس الشغل، ومحدش عارف أنهي واحدة الأخيرة. فولدر واحد للمشروع باسم واضح: [[projects/my-site]].
- والملف [[index.html]] من غير مسافات.
- وبرّه سطح المكتب.

**الغلطة الشائعة:** تعدّل في [[index.html]] والمتصفح فاتح [[index - Copy.html]]. وده أول سبب لـ «غيّرت ومفيش حاجة حصلت».` },
            { lvl: 'تطبيق', t: R`**صلّح (محقق):** تلات ناس كل واحد بيقول «غيّرت العنوان في الصفحة ومفيش حاجة اتغيّرت في المتصفح». حدد سبب كل واحد من الدليل، وبالترتيب اللي في الدرس:

١. **منى:** تاب الملف في VS Code عليه نقطة مكان الـ ×.
٢. **كريم:** مفيش نقطة. شريط العنوان في Chrome آخره [[rokn-books/index.html]]، والملف اللي في VS Code لما وقف عليه بالماوس طلع مساره [[Downloads\rokn-books\index.html]].
٣. **هدى:** مفيش نقطة، والمسارين واحد. هي غيّرت الكلام اللي جوه [[<title>]].`, done: R`كتبت لكل واحد: السبب، والفحص اللي كشفه، والتصليح في سطر. ومحدش فيهم سببه الكاش.`, sol: R`| مين | السبب | الفحص اللي كشفه | التصليح |
|---|---|---|---|
| منى | الملف مش محفوظ | الفحص ١: النقطة على التاب | [[Ctrl+S]] ثم [[Ctrl+R]] |
| كريم | بيعدّل في نسخة والمتصفح فاتح نسخة تانية | الفحص ٢: قارن شريط العنوان بمسار الملف في المحرر | افتح في المحرر الفولدر اللي في شريط العنوان، وامسح النسخة الزيادة |
| هدى | التعديل اتحفظ واتقرا، بس مكانه مش في الصفحة | الفحص ٤: [[<title>]] بيظهر على التاب فوق، مش جوه الصفحة | بصّي على التاب: الاسم اتغيّر فعلًا. العنوان اللي في الصفحة هو [[<h1>]] |

**ليه الترتيب مهم:** الفحص الأول بياخد ثانية وبيحل أغلب الحالات. لو بدأت بالكاش (آخر فحص) هتضيّع وقت في حاجة تقريبًا مبتحصلش مع ملف HTML على [[file:///]].

**الغلطة الشائعة:** تقفل المتصفح وتفتحه، أو تعيد كتابة الكود، قبل ما تبص على النقطة.

~~~text القياس اللي الترتيب مبني عليه (Chrome 157، ملف على file:///)
الملف اتغيّر على الديسك ومفيش reload:   الصفحة لسه القديمة
بعد Ctrl+R عادي:                          الصفحة الجديدة
~~~

يعني [[Ctrl+R]] العادي بيقرا الملف من الديسك من جديد. لو الملف محفوظ والمسار صح، هتشوف التعديل.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** في شريط العنوان، امسح اسم الملف وسيب الفولدر بس (العنوان يخلص بـ [[practice-site/]]) ودوس Enter. إيه اللي ظهر؟ وبعدين اكتب اسم ملف مش موجود ([[practice-site/nope.html]]). وإيه اللي ظهر؟ ولو عندك Node: شغّل [[npx serve]] في نفس الفولدر واعمل نفس التجربتين على عنوان الـ [[http://]]. اكتب الأربع نتايج في جدول.`, done: R`الجدول فيه أربع خانات، وعرفت منه ليه الصفحة الرئيسية لازم اسمها [[index.html]].`, sol: R`~~~powershell
npx serve -l tcp://127.0.0.1:8793 .
~~~

| | على [[file:///]] | على [[http://127.0.0.1:8793]] |
|---|---|---|
| عنوان الفولدر | صفحة عنوانها [[Index of C:\Users\ali\projects\practice-site\]] فيها قايمة بالملفات | الصفحة نفسها ([[index.html]]) |
| ملف مش موجود | «Your file couldn’t be accessed» و [[ERR_FILE_NOT_FOUND]] | رد [[404]] من السيرفر |

**ليه كده:** على [[file:///]] مفيش سيرفر: المتصفح بيفتح اللي طلبته بالحرف. طلبت فولدر، فعرضلك محتوى الفولدر. السيرفر عنده قاعدة: «لو الطلب فولدر، رجّع [[index.html]] اللي فيه». وعشان كده لما تكتب عنوان موقع من غير اسم ملف بتشوف صفحته الرئيسية، وعشان كده اسمها [[index.html]].

**الغلطة الشائعة:** تسمّي الرئيسية [[home.html]] أو [[main.html]]. على جهازك هتشتغل (انت بتفتح الملف باسمه)، وبعد الرفع اللي يكتب عنوان الموقع هيلاقي قايمة ملفات أو 404.

~~~text اللي السيرفر طبعه في الترمنال (serve، Node 24)
 INFO  Accepting connections at http://127.0.0.1:8793
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 GET /
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 Returned 200 in 12 ms
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 GET /nope
 HTTP  11/18/2026 6:35:29 PM 127.0.0.1 Returned 404 in 1 ms
~~~

[[200]] معناها «تمام، خد الصفحة» و [[404]] «مفيش حاجة بالاسم ده». (كورس «المتصفح و DevTools»، درس «Status codes».) وقّف السيرفر بـ [[Ctrl+C]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة إضافة Live Server في VS Code Marketplace (مش من الدرس): إيه الطرق اللي بتشغّل بيها السيرفر؟ وإيه اختصار الكيبورد اللي بيشغّله واللي بيوقّفه؟ ولو الفولدر مفيهوش ولا ملف HTML، هتشغّله إزاي؟`, done: R`كتبت أربع طرق تشغيل على الأقل، والاختصارين، وإجابة السؤال التالت من نص الصفحة.`, sol: R`**الإجابة (من صفحة الإضافة ritwickdey.LiveServer):**

1. زرار **Go Live** في الـ Status Bar (تحت على اليمين). نفس الزرار بيوقّفه.
2. كليك يمين على ملف HTML في الـ Explorer ثم **Open with Live Server**.
3. كليك يمين جوه الملف المفتوح ونفس الاختيار.
4. اختصار: [[Alt+L]] وبعده [[Alt+O]] للتشغيل، و [[Alt+L]] وبعده [[Alt+C]] للإيقاف (على الماك [[Cmd+L]] ثم [[Cmd+O]] و [[Cmd+L]] ثم [[Cmd+C]]).
5. من الـ Command Palette ([[F1]] أو [[Ctrl+Shift+P]]): **Live Server: Open With Live Server** و **Live Server: Stop Live Server**.

**ولو مفيش ملف HTML في الـ workspace:** الصفحة بتقول إنك لازم تستخدم الطريقة ٤ أو ٥ (الاختصار أو الـ Command Palette)، لأن الطرق التانية بتظهر مع ملفات HTML بس.

**ليه التمرين ده:** أي إضافة أو أداة ليها صفحة بتقول بتشتغل إزاي. قرايتها بتاخد دقيقتين وبتغنيك عن فيديو ربع ساعة.

**الغلطة الشائعة:** تدوّر على زرار Go Live ومتلاقيهوش، عشان فاتح ملف لوحده مش فولدر. الإضافة بتشتغل على الفولدر المفتوح ([[code .]]).

الإجابة دي من صفحة الإضافة. مسطّبتهاش ولا شغّلتها في المعمل.` },
          ],
          title: "شوف الصفحة في Chrome: العنوان، واللفة، ولما مفيش حاجة بتتغيّر",
          desc: R`[[start index.html]] (على الماك [[open]] وعلى لينكس [[xdg-open]]) بيفتح الصفحة في المتصفح. العنوان اللي هيظهر بيبدأ بـ [[file:///]]: يعني المتصفح بيقرا ملف من الديسك بتاعك، مش من سيرفر. وبعد كل تعديل: احفظ في المحرر، ودوس [[Ctrl+R]] في المتصفح.

بنبدأ من اللي الدرس اللي فات خلص بيه: [[rokn-books/index.html]] مكتوب ومحفوظ ومفتوح في VS Code. هنفتحه في Chrome، ونقرا شريط العنوان، ونعدّل سطر ونشوفه بيتغيّر، ونتعلم الترتيب اللي تمشي عليه لما تعدّل ومتشوفش حاجة.

وفي الآخر: السيرفر المحلي (Live Server أو [[npx serve]]) بيضيف إيه، وإمتى تحتاجه.`,
          example: R`# Windows (PowerShell):
start index.html
# Mac:
open index.html
# Linux (Ubuntu):
xdg-open index.html`,
          try: R`افتح الصفحة. في VS Code غيّر كلمة في الـ [[<h1>]] **ومتحفظش**، وارجع للمتصفح ودوس [[Ctrl+R]]. اتغيّرت؟ دلوقتي احفظ ودوس [[Ctrl+R]] تاني. وبعدين رجّع الكلمة زي ما كانت واحفظ.`,
          deep: {
            why: R`الكود اللي في المحرر مش هو الصفحة: الصفحة هي اللي المتصفح بيبنيه لما يقرا الملف. ولحد ما تفتحها متعرفش كتبت إيه فعلًا. واللفة «عدّل، احفظ، Ctrl+R» هتعملها آلاف المرات، فلازم تبقى أوتوماتيك. وجملة «غيّرت ومفيش حاجة حصلت» هتقولها وهتسمعها كتير، وليها ترتيب فحص ثابت بيحلها في دقيقة.`,
            how: R`الأمر [[start]] (واخواته) بيدّي الملف للنظام، والنظام بيفتحه بالبرنامج الافتراضي لنوعه. وملفات [[.html]] برنامجها الافتراضي هو المتصفح الأساسي عندك. المتصفح بيقرا الملف من الديسك مرة واحدة ويبني الصفحة في الذاكرة. بعد كده هو مش مراقب الملف: لو الملف اتغيّر، الصفحة المفتوحة بتفضل زي ما هي لحد ما تطلب منه يقرا تاني ([[Ctrl+R]]).

وعشان كده فيه تلات نسخ من صفحتك في نفس اللحظة: اللي في المحرر (ممكن متكونش محفوظة)، واللي على الديسك، واللي المتصفح قراها آخر مرة. اللفة بتنقل التعديل من الأولى للتانية (الحفظ) ومن التانية للتالتة (الـ reload).`,
            when: R`بعد كل تعديل عايز تشوفه. والسيرفر المحلي لما المشروع يحتاجه: الصفحات اللي في الوحدة دي كلها بتشتغل كاملة من [[file:///]]، والسيرفر بيبقى لازم لما تبدأ JavaScript بيحمّل ملفات.`,
            mistakes: R`تدوس [[Ctrl+R]] من غير ما تحفظ. تعدّل في نسخة والمتصفح فاتح نسخة تانية. تبعت لحد لينك [[file:///]]. تفتكر إن المتصفح «مخزّن القديم» وتمسح الكاش، والمشكلة إن الملف مش محفوظ. وتفتح الملف بدبل كليك فيتفتح في متصفح غير اللي انت فاكره.`
          },
          teach: R`## الفكرة في سطرين

المتصفح بيقرا ملفك من الديسك ويرسمه. هنفتح الملف، ونفهم العنوان اللي فوق، ونتعلم اللفة اللي بتتكرر مع كل تعديل.

[[start index.html]] اتشغّل هنا مرة واحدة على Windows 11. القياسات من Chrome 157. [[open]] و [[xdg-open]] من صفحات الـ man بتاعتهم. Live Server من صفحته في VS Code Marketplace، و [[npx serve]] اتشغّل هنا (Node 24).

---

## ١. افتح الملف من الترمنال

في الترمنال اللي جوه VS Code ([[Ctrl+$__bt]])، وانت في فولدر المشروع:

~~~powershell
start index.html
~~~

| النظام | الأمر | بيعمل إيه |
|---|---|---|
| ويندوز (PowerShell) | [[start index.html]] | [[start]] اختصار [[Start-Process]]: بيفتح الملف بالبرنامج الافتراضي لنوعه |
| الماك | [[open index.html]] | نفس الفكرة: كأنك عملت دبل كليك على الملف |
| لينكس | [[xdg-open index.html]] | بيفتح الملف بالتطبيق الافتراضي لسطح المكتب |

الأمر مبيطبعش حاجة، والصفحة بتفتح في تاب جديد في **المتصفح الأساسي** عندك.

### لو فتحت في متصفح غير Chrome

الكورس بيستخدم Chrome عشان أدوات الفحص اللي في الدرس الجاي. عندك تلات طرق تانية، كلهم بيوصلوا لنفس النتيجة:

- **السحب والرمي:** اسحب [[index.html]] من الـ Explorer في VS Code وارميه على شباك Chrome.
- **من جوه Chrome:** [[Ctrl+O]] (على الماك [[Cmd+O]]) واختار الملف.
- **دبل كليك** على الملف من مدير الملفات (بيفتح في المتصفح الأساسي برضه).

---

## ٢. اقرا شريط العنوان

ده اللي مكتوب فوق:

~~~text
file:///C:/Users/ali/projects/rokn-books/index.html
~~~

فكّه حتة حتة:

| الحتة | اسمها | معناها |
|---|---|---|
| [[file:]] | الـ scheme | الطريقة اللي المتصفح جاب بيها الصفحة: «اقرا ملف من الديسك» |
| [[//]] | | بعدها المفروض اسم الجهاز اللي عليه الملف |
| (فاضي) | الـ host | مفيش جهاز تاني: الملف على جهازك. عشان كده الشرطتين بقوا تلاتة |
| [[/C:/Users/ali/projects/rokn-books/]] | المسار | نفس مسار الفولدر، بس الشرطة مايلة لقدام |
| [[index.html]] | الملف | |

على الماك العنوان بيبقى [[file:///Users/ali/projects/rokn-books/index.html]].

والقياس من المتصفح نفسه:

~~~text Chrome 157
location.protocol = "file:"
location.host     = ""          (فاضي)
~~~

### وإيه الفرق عن [[http://]]؟

المواقع اللي بتفتحها كل يوم عنوانها [[https://example.test/about.html]]. الفرق في أول كلمة:

| | [[file:///]] | [[http://]] و [[https://]] |
|---|---|---|
| مين بيجيب الصفحة | المتصفح بيقرا الملف من الديسك بنفسه | برنامج اسمه سيرفر بيبعتها للمتصفح |
| اللي بعد الشرطتين | فاضي | اسم الجهاز اللي عليه السيرفر ([[example.test]]) |
| مين يقدر يفتح العنوان | انت بس، على الجهاز ده | أي حد يوصل للسيرفر |
| لو طلبت فولدر | قايمة بالملفات اللي فيه | [[index.html]] اللي فيه |

فالعنوان ده مينفعش تبعته لحد: هو مسار على الديسك بتاعك. اللي بيخلي الصفحة توصل للناس هو إنها تتحط على سيرفر، وده موضوع النشر بعدين.

وده شكل اللي بيظهر لما المسار غلط (حرف ناقص، أو الملف اتنقل):

~~~text صفحة الخطأ في Chrome 157
Your file couldn’t be accessed
It may have been moved, edited, or deleted.
ERR_FILE_NOT_FOUND
~~~

---

## ٣. اللفة: عدّل، احفظ، [[Ctrl+R]]

حط VS Code والمتصفح جنب بعض (على ويندوز: مفتاح Windows مع السهم الشمال لواحد واليمين للتاني).

**عدّل:** في VS Code، بعد الفقرة الأولى زوّد سطر:

~~~html
    <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
~~~

**احفظ:** [[Ctrl+S]]. النقطة اللي على التاب تختفي.

**حمّل من جديد:** دوس على شباك Chrome ثم [[Ctrl+R]] (على الماك [[Cmd+R]]. و [[F5]] بيعمل نفس الحاجة). الـ R من reload.

~~~live 310 330 index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <h1>مكتبة الركن</h1>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
    <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
    <h2>مواعيد العمل</h2>
    <ul>
        <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
        <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
        <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
    </ul>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
</body>
</html>
~~~

السطر الجديد ظهر تحت الفقرة الأولى.

**ليه لازم [[Ctrl+R]]؟** لأن المتصفح قرا الملف مرة واحدة ومبيراقبوش. قسته:

~~~text Chrome 157، ملف على file:///
١. أول فتح:                               الصفحة = النسخة القديمة
٢. الملف اتغيّر على الديسك، من غير reload:   الصفحة = النسخة القديمة
٣. بعد Ctrl+R:                            الصفحة = النسخة الجديدة
~~~

---

## ٤. «غيّرت ومفيش حاجة حصلت»

هتحصلك النهارده. امشي على الترتيب ده، من الأسرع والأشيع للأندر، ومتنطّش:

### الفحص ١: الملف محفوظ؟

بصّ على تاب الملف في VS Code. لو فيه نقطة مكان الـ ×: مش محفوظ. [[Ctrl+S]] ثم [[Ctrl+R]]. ده السبب في أغلب المرات.

### الفحص ٢: المتصفح فاتح نفس الملف اللي بتعدّل فيه؟

قارن حاجتين:

- شريط العنوان في المتصفح.
- مسار الملف في المحرر (وقّف الماوس على التاب، أو اكتب [[pwd]] في الترمنال اللي جوه المحرر).

لو مختلفين (نسخة في Downloads ونسخة في projects، أو [[about.html]] و [[index.html]]): انت بتعدّل في ملف والمتصفح بيعرض التاني.

### الفحص ٣: عملت reload للتاب الصح؟

لو فاتح الصفحة في تابين، أو دوست [[Ctrl+R]] والمؤشر لسه في VS Code، الـ reload مرحش للمتصفح. دوس على الصفحة الأول.

### الفحص ٤: التعديل وصل، بس مش في المكان اللي بتبص فيه؟

دوس [[Ctrl+U]] في المتصفح: ده بيعرض الملف زي ما المتصفح قراه (الدرس الجاي). دوّر على تعديلك:

- **موجود:** الملف اتقرا صح. المشكلة في الـ HTML: غيّرت [[<title>]] (بيظهر على التاب مش في الصفحة)، أو كتبت جوه الـ [[<head>]]، أو فيه tag مش مقفول.
- **مش موجود:** ارجع للفحص ١ و ٢.

### الفحص ٥: الكاش

آخر احتمال: [[Ctrl+Shift+R]] (hard reload: حمّل من غير النسخ المخزنة). مع ملف HTML على [[file:///]] ده تقريبًا مبيحصلش، والقياس اللي فوق بيقول إن [[Ctrl+R]] العادي بيقرا من الديسك. هتحتاجه بعدين مع ملفات CSS والصور لما الصفحة تيجي من سيرفر. الدرس الكامل: كورس «المتصفح و DevTools»، درس «Hard Reload».

| الترتيب | السؤال | بتعرف منين |
|---|---|---|
| ١ | محفوظ؟ | النقطة على التاب |
| ٢ | نفس الملف؟ | شريط العنوان قصاد مسار الملف |
| ٣ | reload للتاب الصح؟ | دوس على الصفحة ثم [[Ctrl+R]] |
| ٤ | التعديل في الملف المقري؟ | [[Ctrl+U]] |
| ٥ | كاش؟ | [[Ctrl+Shift+R]] |

---

## ٥. الخطوة الجاية: سيرفر محلي

كل اللي فات شغال من غير أي تسطيب، وكفاية لكل صفحات الوحدة دي. بس فيه طريقة تانية هتقابلها في كل شرح على النت: تشغّل سيرفر صغير على جهازك يبعت ملفاتك للمتصفح، فالعنوان يبقى [[http://]] بدل [[file:///]].

### Live Server (إضافة في VS Code)

إضافة بتتسطّب من جوه VS Code (أيقونة Extensions في الـ Activity Bar، ودوّر على Live Server). بعد التسطيب:

- زرار **Go Live** بيظهر في الـ Status Bar تحت. دوس عليه والفولدر مفتوح.
- أو كليك يمين على [[index.html]] ثم **Open with Live Server**.

المتصفح بيفتح على عنوان شبه ده:

~~~text
http://127.0.0.1:5500/index.html
~~~

- [[127.0.0.1]] رقم معناه «الجهاز ده نفسه» (واسمه التاني [[localhost]]).
- [[5500]] البورت: رقم الباب اللي السيرفر واقف عليه. 5500 هو الافتراضي في إعدادات الإضافة.

**اللي بيضيفه:** الـ live reload. كل ما تحفظ، الصفحة بتتحمّل لوحدها من غير [[Ctrl+R]].

(الكلام عن Live Server من صفحة الإضافة ووثيقة إعداداتها. متسطّبتش هنا. و MDN بترشّح إضافة تانية من مايكروسوفت اسمها Live Preview بتعمل نفس الشغل.)

### [[npx serve]] (لو عندك Node)

~~~powershell
npx serve -l tcp://127.0.0.1:8793 .
~~~

- [[npx]] بييجي مع Node: بيشغّل أداة من غير ما تسطّبها على الجهاز. أول مرة هيسألك يحمّلها ولا لأ.
- [[serve]] سيرفر ملفات بسيط.
- [[-l tcp://127.0.0.1:8793]] اسمع على الجهاز ده بس، على بورت 8793.
- [[.]] الفولدر الحالي.

~~~text الناتج (Node 24)
 INFO  Accepting connections at http://127.0.0.1:8793
~~~

افتح العنوان ده في Chrome: نفس الصفحة، بس من سيرفر. الترمنال بيفضل مشغول طول ما السيرفر شغال، وبتوقّفه بـ [[Ctrl+C]]. و [[serve]] مفيهوش live reload: لسه بتدوس [[Ctrl+R]].

ملحوظة هتشوفها: [[serve]] بيشيل [[.html]] من العنوان. لو فتحت [[/about.html]] هيحوّلك لـ [[/about]]. طبيعي.

### أحتاجه إمتى؟

| | [[file:///]] | سيرفر محلي |
|---|---|---|
| تسطيب | ولا حاجة | إضافة، أو Node |
| صفحات HTML و CSS | شغالة كاملة | شغالة كاملة |
| تحميل تلقائي بعد الحفظ | لأ | مع Live Server |
| JavaScript بيحمّل ملفات تانية | المتصفح بيمنع حاجات | شغال |

فدلوقتي هو راحة مش ضرورة. وهيبقى ضرورة في كورس JavaScript. السبب بالتفصيل في كورس «المتصفح و DevTools»، درس «سيرفر محلي بدل file://».

---

## الخلاصة

- [[start index.html]] (أو [[open]] أو [[xdg-open]]) بيفتح الصفحة. ولو مش Chrome: اسحب الملف عليه.
- [[file:///]] = ملف من الديسك بتاعك. مينفعش يتبعت.
- اللفة: عدّل، [[Ctrl+S]]، [[Ctrl+R]].
- مفيش حاجة اتغيّرت؟ النقطة، ثم العنوان، ثم التاب، ثم [[Ctrl+U]]، وآخر حاجة الكاش.

**الفولدر دلوقتي:** [[rokn-books/index.html]] فيه سطر العنوان الجديد، ومفتوح في VS Code وفي Chrome جنب بعض. الدرس الجاي بيفحصه.`,
          lines: [
            R`[[start index.html]]: [[start]] في PowerShell اختصار [[Start-Process]]. بيدّي الملف لويندوز، وويندوز بيفتحه بالبرنامج الافتراضي لملفات [[.html]]: المتصفح الأساسي.`,
            R`[[open index.html]]: نفس الشغل على الماك: بيفتح الملف بالتطبيق الافتراضي، كأنك عملت عليه دبل كليك.`,
            R`[[xdg-open index.html]]: نفس الشغل على لينكس: بيفتح الملف بالتطبيق اللي سطح المكتب محدده لنوعه.`
          ],
          sol: R`| الخطوة | اللي في المحرر | اللي على الديسك | اللي في المتصفح بعد [[Ctrl+R]] |
|---|---|---|---|
| غيّرت ومحفظتش | الكلمة الجديدة (وعلى التاب نقطة) | القديمة | القديمة |
| حفظت | الجديدة | الجديدة | الجديدة |

**في الأولى مفيش حاجة اتغيّرت،** مع إنك دوست [[Ctrl+R]]. المتصفح عمل اللي عليه: قرا الملف من الديسك. والملف على الديسك لسه القديم، لأن التعديل كان في ذاكرة المحرر بس.

دي أهم حاجة في الدرس: فيه تلات نسخ، والحفظ هو اللي بينقل من الأولى للتانية.

~~~text القياس (Chrome 157)
الملف اتغيّر على الديسك ومفيش reload:   الصفحة القديمة
بعد Ctrl+R:                              الصفحة الجديدة
~~~`,
          ref: [
            { t: "MDN: How do you set up a local testing server?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server" },
            { t: "VS Code Marketplace: Live Server", url: "https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" },
            { t: "Live Server: settings", url: "https://github.com/ritwickdey/vscode-live-server/blob/master/docs/settings.md" },
            { t: "macOS: open (man page)", url: "https://ss64.com/mac/open.html" },
            { t: "freedesktop.org: xdg-open", url: "https://portland.freedesktop.org/doc/xdg-open.html" },
          ],
          pre: [
            "css/code . و Emmet !",
            { to: "web/Hard Reload", why: R`الدرس الكامل للكاش و [[Ctrl+Shift+R]]` },
            { to: "web/سيرفر محلي بدل file://", why: R`ليه [[file:///]] بيمنع حاجات، وطرق تانية لتشغيل سيرفر` },
          ]
        },
        {
          cmd: "View Source و validator",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** الـ validator رد على صفحة بالرسالة دي:

~~~text
Error: End tag “h3” seen, but there were open elements.
From line 9, column 18; to line 9, column 22
~~~

والسطر ٩ في الملف هو [[<h2>بنبيع إيه</h3>]]. اقرا الرسالة حتة حتة: نوعها إيه؟ بتشاور على أنهي حروف بالظبط؟ والتصليح إيه؟ وهل الصفحة كان شكلها بايظ؟`, done: R`قلت إن الحروف من ١٨ لـ ٢٢ هي [[</h3>]] نفسها، وإن التصليح حرف واحد، وإن الشكل كان سليم ومع ذلك دي غلطة.`, sol: R`| الحتة | معناها |
|---|---|
| [[Error]] | غلطة لازم تتصلّح (النوع التاني [[Warning]]: تنبيه) |
| [[End tag “h3” seen]] | لقيت tag قفل لـ h3 |
| [[but there were open elements]] | وكان لسه فيه عنصر مفتوح مش من نوعه |
| [[line 9, column 18]] لحد [[column 22]] | مكانها: السطر ٩، من الحرف ١٨ للحرف ٢٢. دول خمس حروف: [[</h3>]] |

**التصليح:** [[</h3>]] تبقى [[</h2>]]. اللي بيتفتح بـ [[h2]] بيتقفل بـ [[h2]].

**الشكل كان بايظ؟** لأ. المتصفح لما يلاقي قفلة عنوان أي رقم وفيه عنوان مفتوح، بيقفل العنوان المفتوح ويكمّل. القياس:

~~~text Chrome 157
عدد h2 في Elements = 1     عدد h3 = 0     العنوان ظاهر عادي
~~~

**ليه نصلّحها والشكل سليم؟** لأن ده تسامح من المتصفح مش قاعدة تعتمد عليها: الغلطة اللي جنبها ممكن متعديش بنفس السهولة. والـ validator هو الوحيد اللي قالك عليها.

**الغلطة الشائعة:** تعدّ الحروف من أول السطر من غير ما تحسب المسافات اللي في أوله. الأربع مسافات محسوبين.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الصفحة دي ناقصها قفلات كتير: مفيش ولا [[</li>]] ومفيش [[</p>]]. الـ validator هيطلّع كام error؟ توقّع، وبعدين الصقها فيه. وافتحها وبصّ في Elements.

~~~html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تجربة</title>
</head>
<body>
    <ul>
        <li>شاي
        <li>قهوة
        <li>ينسون
    </ul>
    <p>المشاريب السخنة بس.
</body>
</html>
~~~`, done: R`الـ validator قال مفيش أخطاء، و Elements فيه تلات [[li]] وكل واحد مقفول، وعرفت الفرق بين «قفلة اختيارية» و «غلطة».`, sol: R`**صفر.**

~~~text الناتج
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
~~~

**ليه:** مواصفة HTML بتسمح إن [[</li>]] و [[</p>]] يتسابوا في حالات محددة (القفلة «اختيارية»). المتصفح عارف إن [[<li>]] جديد معناه إن اللي قبله خلص. وده اللي بناه:

~~~html
<ul>
    <li>شاي</li>
    <li>قهوة</li>
    <li>ينسون</li>
</ul>
<p>المشاريب السخنة بس.</p>
~~~

~~~text Chrome 157
li: 3   p: 1   كلهم مقفولين في Elements
~~~

**يبقى أسيب القفلات؟** لأ، اكتبها دايمًا. القفلة الاختيارية ليها شروط، وانت مش حافظها. [[<p>]] مثلًا بيتقفل لوحده قبل [[<ul>]] (وده اللي عمل الفقرة الفاضية في الدرس)، بس [[<h2>]] و [[<a>]] و [[<strong>]] مبيتقفلوش لوحدهم خالص. لما تكتب كل قفلة، الكود بيقول اللي انت قاصده، مش اللي المتصفح خمّنه.

**الغلطة الشائعة:** تفتكر إن الـ validator «مش شغال» عشان مطلّعش حاجة. هو شغال: الصفحة دي قانونية فعلًا.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصق الصفحة دي في [[practice-site/index.html]] (فوق اللي فيه) وافتحها. فيها أربع مشاكل. استخدم الأدوات بالترتيب (العين، ثم Elements، ثم الـ validator) وصلّح لحد ما الـ validator يقول مفيش أخطاء ولا تنبيهات.

~~~html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>كشك الجرايد</h1>
    <h2>بنبيع إيه</h3>
    <ul>
        <li>جرايد ومجلات</li>
        <li>كروت شحن</li>
    </ul>
    <p>للطلبات: <a href="tel:+200000000000>كلّمنا</a></p>
    <p>العنوان: ميدان المحطة.</p>
</body>
</html>
~~~`, done: R`الـ validator رجّع «valid» من غير أي [[Error]] ولا [[Warning]]، وآخر فقرتين ظاهرين، واللينك شغال، والتاب مكتوب عليه اسم الصفحة.`, sol: R`**١. بالعين:** الفقرة الأخيرة («العنوان: ميدان المحطة») مش موجودة، وكلمة «كلّمنا» مش موجودة، والكلام بادئ من الشمال، والتاب مكتوب عليه اسم الملف.

**٢. في Elements:** آخر حاجة في الـ body هي [[<p>للطلبات: </p>]]. كل اللي بعدها اختفى.

~~~text Chrome 157، قبل التصليح
title = (فاضي)   lang = (فاضي)   direction = ltr
p: 1 («للطلبات:»)   a: 0
~~~

**٣. الـ validator:**

~~~text الناتج قبل التصليح
Error: Element “head” is missing a required instance of child element “title”.
From line 6, column 1; to line 6, column 7
Error: End tag “h3” seen, but there were open elements.
From line 9, column 18; to line 9, column 22
Error: End of file reached when inside an attribute value. Ignoring tag.
At line 17, column 8
Warning: Consider adding a “lang” attribute to the “html” start tag to declare the language of this document.
From line 1, column 16; to line 2, column 6
There were errors. (Tried in the text/html mode.)
~~~

| الرسالة | الغلطة | التصليح |
|---|---|---|
| [[missing … “title”]] | مفيش [[<title>]] في الـ head | زوّد [[<title>كشك الجرايد</title>]] |
| [[End tag “h3” seen]] | [[<h2>]] مقفول بـ [[</h3>]] | [[</h2>]] |
| [[End of file reached when inside an attribute value]] | علامة التنصيص بتاعة الـ [[href]] مش مقفولة، فالمتصفح اعتبر كل اللي بعدها لحد آخر الملف جزء من قيمة الـ attribute | اقفلها: [[href="tel:+200000000000"]] |
| [[Consider adding a “lang”]] (تنبيه) | [[<html>]] من غير [[lang]] | [[<html lang="ar" dir="rtl">]] |

لاحظ الرسالة التالتة: بتشاور على السطر ١٧ (آخر الملف)، والغلطة الحقيقية في السطر ١٤. الـ validator بيقول فين **اكتشف** المشكلة. لما الرسالة تشاور على آخر الملف، دوّر لفوق على حاجة مفتوحة ومتقفلتش.

**بعد التصليح:**

~~~live 260 260 index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>كشك الجرايد</title>
</head>
<body>
    <h1>كشك الجرايد</h1>
    <h2>بنبيع إيه</h2>
    <ul>
        <li>جرايد ومجلات</li>
        <li>كروت شحن</li>
    </ul>
    <p>للطلبات: <a href="tel:+200000000000">كلّمنا</a></p>
    <p>العنوان: ميدان المحطة.</p>
</body>
</html>
~~~

**الغلطة الشائعة:** تصلّح اللي ظاهر بس (الفقرة المختفية) وتقف. غلطة الـ [[</h3>]] والـ [[title]] مكنوش ظاهرين في الصفحة خالص.

~~~text الناتج بعد التصليح
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
p: 2   a: 1   title = كشك الجرايد   عرض 360: scrollWidth = 360
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** في [[practice-site/index.html]] (النسخة المتصلّحة)، افتح Device Toolbar على عرض 360. وبعدين امسح سطر الـ [[<meta name="viewport" …>]] واحفظ واعمل reload. إيه اللي اتغيّر في الشكل؟ اكتب في Console الأمر [[innerWidth]] في الحالتين وسجّل الرقمين. وبعدين رجّع السطر.`, done: R`الرقمين 360 و 980، وشفت الصفحة «بتبعد» والخط بيصغر، ورجّعت السطر والرقم رجع 360.`, sol: R`**الخطوات:** [[F12]] ثم [[Ctrl+Shift+M]]. من قايمة Dimensions اختار Responsive، واكتب 360 في خانة العرض. ودوس على تاب Console في DevTools واكتب:

~~~text
innerWidth
~~~

[[innerWidth]] بيرجّع عرض المساحة اللي الصفحة بترسم عليها، بالبيكسل.

| | [[innerWidth]] | الشكل |
|---|---|---|
| السطر موجود | 360 | الخط بحجمه الطبيعي، والسطور بتلف جوه الشاشة |
| السطر متشال | 980 | الصفحة كلها متصغّرة كأنك بتبص على شاشة كمبيوتر من بعيد |

**ليه:** الموبايل بيفترض إن أي صفحة معمولة لشاشة عرضها 980. فبيرسمها على 980 وبيصغّرها عشان تدخل في الـ 360. سطر الـ viewport بيقوله «اعرضني على عرضك الحقيقي». (شرحه في درس «<!doctype html>».)

**ليه التمرين ده هنا:** ده سطر Emmet بيكتبه لوحده، فمش هتنساه. بس لو نسخت صفحة قديمة من غيره، ده أول حاجة تفحصها على عرض الموبايل، ومش هتبان خالص على شاشة الكمبيوتر العادية.

**الغلطة الشائعة:** تصغّر شباك المتصفح بالماوس بدل Device Toolbar. الشباك الصغير مبيتصرفش زي الموبايل: بيفضل يرسم على عرضه الحقيقي حتى من غير سطر الـ viewport، فالمشكلة مبتظهرش.

~~~text القياس (Chrome 157، محاكاة موبايل بعرض 360)
مع viewport:      innerWidth = 360   scrollWidth = 360
من غير viewport:  innerWidth = 980   scrollWidth = 980
~~~` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** افحص الصفحة من الترمنال بدل ما تلصقها في الموقع. جوه [[rokn-books]] ابعت [[index.html]] للـ validator بـ [[curl]]، مرة بـ [[out=text]] ومرة بـ [[out=gnu]]. إيه الفرق بين الشكلين؟ وبعدين (على النسخة اللي فيها الغلطتين بتوع الدرس، لو لسه عندك، أو ارجعلها مؤقتًا) طلّع **عدد** الأخطاء برقم واحد.`, done: R`شغّلت الأمر مرتين وشفت الشكلين، وطلّعت الرقم 6 من النسخة البايظة، والنسخة السليمة بترجّع جملة «valid».`, sol: R`~~~bash
curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @index.html "https://html5.validator.nu/?out=gnu"
~~~

~~~powershell
curl.exe -s -H "Content-Type: text/html; charset=utf-8" --data-binary "@index.html" "https://html5.validator.nu/?out=gnu"
~~~

**كل حتة:**

- [[curl]] برنامج بيبعت طلبات للنت من الترمنال. في PowerShell اكتبه [[curl.exe]]: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم مستعار لأمر تاني.
- [[-s]] من silent: متطبعش شريط التحميل.
- [[-H "Content-Type: text/html; charset=utf-8"]] بيقول للخدمة «اللي جايلك HTML، وترميزه UTF-8». من غيره العربي بيتقري غلط.
- [[--data-binary @index.html]] ابعت محتوى الملف ده زي ما هو. علامة [[@]] معناها «اقرا من ملف».
- [[?out=gnu]] شكل الرد. [[text]] للقراية، و [[gnu]] سطر لكل رسالة.

~~~text out=gnu على النسخة البايظة
:24.5-24.8: error: No “p” element in scope but a “p” end tag seen.
:25.20-25.23: error: Heading cannot be a child of another heading.
:26.5-26.7: error: Element “p” not allowed as child of element “h2” in this context. (Suppressing further errors from this subtree.)
:27.5-27.7: error: Element “p” not allowed as child of element “h2” in this context. (Suppressing further errors from this subtree.)
:28.1-28.7: error: End tag for  “body” seen, but there were unclosed elements.
:25.20-25.23: error: Unclosed element “h2”.
~~~

**الفرق:** نفس الرسايل. في [[gnu]] كل رسالة في سطر واحد بيبدأ بالمكان ([[24.5-24.8]] يعني من السطر ٢٤ الحرف ٥ للسطر ٢٤ الحرف ٨)، فسهل تعدّها وتدوّر فيها.

**العدد:**

~~~bash
curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary @index.html "https://html5.validator.nu/?out=gnu" | grep -c ": error:"
~~~

~~~powershell
curl.exe -s -H "Content-Type: text/html; charset=utf-8" --data-binary "@index.html" "https://html5.validator.nu/?out=gnu" | Select-String ": error:" | Measure-Object | ForEach-Object Count
~~~

علامة [[|]] بتاخد ناتج الأمر اللي قبلها وتدّيه للي بعدها. [[grep -c]] بيعدّ السطور اللي فيها النص ده، و [[Select-String]] مع [[Measure-Object]] بيعملوا نفس الحاجة في PowerShell.

~~~text الناتج
6
~~~

**الغلطة الشائعة:** تبعت ملف فيه بيانات حقيقية (أسامي عملا، أرقام) لخدمة عامة. اللي بتبعته هنا صفحة تمرين، وده تمام. أي حاجة خاصة متتبعتش.

الأوامر اتشغّلت في Git Bash و PowerShell 7.6 و 5.1 على الخدمة العامة [[html5.validator.nu]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك بيقول «الصفحة فاتحة قدامي وشكلها تمام، ليه أفحص؟». رد عليه في تلات سطور، كل سطر بدليل من الدرس ده (رقم أو رسالة)، من غير كلمة «المفروض».`, done: R`التلات سطور فيهم: غلطة مبتبانش بالعين، وفرق بين الملف والشجرة، وحاجة مبتبانش غير على عرض الموبايل.`, sol: R`**إجابة نموذجية:**

1. المتصفح مبيقولش: صفحة فيها ٦ أخطاء عند الـ validator فتحت من غير ولا رسالة، و Console كان فاضي.
2. اللي شايفه مش اللي كتبته: كتبت ٥ فقرات والمتصفح بنى ٦، واحدة منهم فاضية. دي بتبان في Elements بس.
3. شكلها تمام **على شاشتك**: من غير سطر الـ viewport الصفحة بتترسم على 980 بدل 360 على الموبايل، وده مبيبانش غير في Device Toolbar.

**ليه التلاتة دول:** كل سطر بيقابل أداة: الـ validator، و Elements، و Device Toolbar. «شكلها تمام» بتغطي اللي العين بتشوفه على شاشة واحدة، والأدوات بتغطي الباقي.` },
          ],
          title: "افحص شغلك: View Source و Elements وعرض 360 و Console والـ validator",
          desc: R`المتصفح مبيقولش إن الـ HTML فيه غلطة: بيصلّحها على طريقته ويعرض الصفحة. فالفحص شغلك انت، وليه أربع أدوات: View Source ([[Ctrl+U]]) بيوريك اللي كتبته، و Elements ([[F12]]) بيوريك اللي المتصفح بناه، و Device Toolbar ([[Ctrl+Shift+M]]) بيوريك الصفحة على عرض موبايل، والـ HTML validator بيقولك كل غلطة بسطرها.

بنبدأ من صفحة المكتبة اللي الدرس اللي فات خلص بيها. هنزوّد عليها قسمين بسرعة ونغلط غلطتين زي ما أي حد بيغلط، ونستخدم الأدوات عشان نلاقيهم ونصلّحهم. والدرس بيخلص والصفحة عدّت من الـ validator.

شرح DevTools الكامل في كورس «المتصفح و DevTools». هنا بناخد منه اللي يخص صفحة HTML.`,
          example: R`Ctrl+U                 View page source (Mac: Cmd+Option+U)
F12                    Open DevTools (Mac: Cmd+Option+I)
Ctrl+Shift+C           Pick an element on the page (Mac: Cmd+Option+C)
Ctrl+Shift+M           Device toolbar, with DevTools open (Mac: Cmd+Shift+M)
Ctrl+Shift+J           Open the Console (Mac: Cmd+Option+J)
validator.w3.org/nu    Check by: text input, paste the page, Check`,
          try: R`على الصفحة بعد ما تصلّحها: افتح Elements، ودوس على سطر الـ [[<h1>]] ودوس Delete. وبعدين دبل كليك على [[rtl]] في أول سطر واكتب [[ltr]] ودوس Enter. الصفحة اتغيّرت؟ دلوقتي دوس [[Ctrl+R]]. إيه اللي حصل؟ وافتح الملف في VS Code: اتغيّر؟`,
          flag: "keys",
          deep: {
            why: R`في لغة برمجة، الغلطة بتوقّف البرنامج وبتطلّع رسالة. HTML مش كده: المتصفح مصمم إنه يعرض أي حاجة مهما كانت بايظة، فبيخمّن قصدك ويكمّل. التخمين ده أحيانًا صح، وأحيانًا بيمسح نص صفحتك، وأحيانًا بيسيب حاجة غلط مبتبانش غير لما تكتب CSS أو لما قارئ شاشة يعدّي عليها. فمفيش حد هيقولك غير الأدوات دي.`,
            how: R`المتصفح بيقرا نص الملف حرف حرف ويبني منه شجرة العناصر (الـ DOM) في الذاكرة، وبيرسم الشجرة مش الملف. ولما النص يخالف القواعد (فقرة جواها قايمة، عنوان مش مقفول) فيه قواعد تصليح مكتوبة في مواصفة HTML بتقول يعمل إيه بالظبط، فكل المتصفحات بتصلّح بنفس الطريقة.

View Source بيعرض النص. Elements بيعرض الشجرة. لو الاتنين مختلفين في صفحة مفيهاش JavaScript، يبقى المتصفح صلّح حاجة، يعني فيه غلطة.

والـ validator برنامج بيقرا النص بنفس قواعد المتصفح، بس بدل ما يصلّح ساكت بيكتب رسالة عن كل مخالفة.`,
            when: R`الـ validator: قبل ما تقول «خلصت» على أي صفحة، وأول حاجة لما الصفحة تتصرف غريب. Elements: لما الشكل مش زي ما متوقع. عرض 360: كل صفحة، لأن أغلب الزوار من الموبايل. Console: كل مرة تفتح DevTools، بصّة.`,
            mistakes: R`تثق في الشكل. تقرا آخر رسالة في الـ validator بدل الأولى. تصلّح في Elements وتنسى إن التعديل هناك مبيتحفظش. تدوّر على غلطة HTML في Console (مش بتظهر هناك). وتفتكر إن «valid» معناها «الصفحة كويسة»: معناها إن الكتابة سليمة بس.`
          },
          teach: R`## الفكرة في سطرين

هنغلط غلطتين حقيقيتين، ونشوف كل أداة بتكشف إيه. وفي الآخر عندك ترتيب فحص تمشي عليه في أي صفحة.

كل النواتج هنا من Chrome 157 على Windows 11، ومن الـ Nu Html Checker (الخدمة العامة). خطوات الواجهة في DevTools من وثائق Chrome DevTools.

---

## ١. اكتب بسرعة واغلط

عايزين نزوّد قسمين للصفحة: «أقسام المكتبة» و «عرض الأسبوع». اكتب ده في [[index.html]] قبل فقرة «كلّمنا»، **بالغلطتين اللي فيه**:

~~~html
    <p>أقسام المكتبة:
        <ul>
            <li>روايات</li>
            <li>كتب أطفال</li>
            <li>كتب مستعملة</li>
        </ul>
    </p>
    <h2>عرض الأسبوع<h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
~~~

احفظ و [[Ctrl+R]]. دي الصفحة:

~~~live 530 550 الصفحة بالغلطتين
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <h1>مكتبة الركن</h1>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
    <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
    <h2>مواعيد العمل</h2>
    <ul>
        <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
        <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
        <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
    </ul>
    <p>أقسام المكتبة:
        <ul>
            <li>روايات</li>
            <li>كتب أطفال</li>
            <li>كتب مستعملة</li>
        </ul>
    </p>
    <h2>عرض الأسبوع<h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
</body>
</html>
~~~

بصّ على آخر الصفحة: جملة العرض ولينك «كلّمنا» بقوا خط كبير وتقيل زي العنوان. دي غلطة باينة. والغلطة التانية مش باينة خالص: قسم «أقسام المكتبة» شكله سليم.

والمتصفح مقالش حاجة: مفيش رسالة، ومفيش علامة حمرا.

---

## ٢. View Source: اللي انت كتبته

~~~text
Ctrl+U        (على الماك: Cmd+Option+U. أو كليك يمين على الصفحة ثم View page source)
~~~

بيفتح تاب جديد عنوانه نفس عنوان الصفحة وقبله [[view-source:]]، وفيه الملف زي ما المتصفح استلمه، بأرقام السطور:

~~~text view-source:file:///C:/Users/ali/projects/rokn-books/index.html
18      <p>أقسام المكتبة:
19          <ul>
20              <li>روايات</li>
21              <li>كتب أطفال</li>
22              <li>كتب مستعملة</li>
23          </ul>
24      </p>
25      <h2>عرض الأسبوع<h2>
26      <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
27      <p><a href="tel:+200000000000">كلّمنا</a></p>
28  </body>
~~~

ده نفس اللي في VS Code، حرف بحرف. فايدته:

- تتأكد إن المتصفح قرا النسخة الجديدة (الفحص ٤ في الدرس اللي فات).
- تشوف كود أي صفحة على النت وتتعلم منه.
- أرقام السطور: الـ validator هيكلّمك بيها.

اللي مبيعملوش: مبيقولش فين الغلط. في Chrome السطر ٢٥ معروض عادي من غير أي علامة. (Firefox بيحط خط أحمر منقّط تحت بعض الأخطاء في صفحة الـ source. دي من منهج MDN، مش من تجربة هنا.)

---

## ٣. Elements: اللي المتصفح بناه

~~~text
F12        (على الماك: Cmd+Option+I. أو كليك يمين على أي حتة في الصفحة ثم Inspect)
~~~

بيفتح DevTools. أول تاب اسمه Elements، وفيه شجرة العناصر. افتح الـ [[<body>]] بالسهم اللي جنبه. ده اللي فيه (نفس الجزء):

~~~html
    <p>أقسام المكتبة:
        </p><ul>
            <li>روايات</li>
            <li>كتب أطفال</li>
            <li>كتب مستعملة</li>
        </ul>
    <p></p>
    <h2>عرض الأسبوع</h2><h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
</h2>
~~~

قارنه باللي كتبته. المتصفح غيّر تلات حاجات:

| اللي كتبته | اللي المتصفح بناه | ليه |
|---|---|---|
| [[<ul>]] جوه الـ [[<p>]] | الـ [[<p>]] اتقفل **قبل** الـ [[<ul>]]، والقايمة بقت برّه | الفقرة مينفعش يبقى جواها قايمة، فأول ما القايمة تبدأ الفقرة بتتقفل لوحدها |
| [[</p>]] بعد القايمة | فقرة جديدة فاضية [[<p></p>]] | القفلة دي ملقتش فقرة مفتوحة تقفلها، فالمتصفح عمل فقرة فاضية عشانها |
| [[<h2>عرض الأسبوع<h2>]] | [[<h2>]] مقفول، وبعده [[<h2>]] تاني مفتوح لآخر الصفحة | الـ [[<h2>]] التاني (اللي كان المفروض [[</h2>]]) فتح عنوان جديد، ومفيش حاجة قفلته، فبلع كل اللي بعده |

وبالأرقام:

~~~text Chrome 157
                كتبت    المتصفح بنى
عدد <p>          5         6        (واحدة فاضية)
عدد <h2>         3         3        (التالت جواه فقرتين)
~~~

- **الغلطة الأولى مبتبانش بالعين** (الفقرة الفاضية ملهاش شكل)، بس لما تكتب CSS يدّي مسافة لكل فقرة هتلاقي فراغ مش عارف جاي منين.
- **الغلطة التانية باينة:** جملة العرض ولينك «كلّمنا» جوه [[<h2>]]، فواخدين شكله. وقارئ الشاشة هيقراهم على إنهم عنوان.

القاعدة: في صفحة مفيهاش JavaScript، أي فرق بين View Source و Elements معناه إن المتصفح صلّح حاجة.

### جرّب التصليح في Elements قبل ما تكتبه

Elements مش للفرجة بس: تقدر تغيّر في الشجرة والصفحة تتغيّر قدامك في نفس اللحظة.

| عايز | تعمل |
|---|---|
| تغيّر نص | دبل كليك على النص، اكتب، Enter |
| تغيّر attribute أو تزوّد واحد | دبل كليك على الاسم أو القيمة. ولإضافة جديد: كليك يمين على العنصر ثم Add attribute |
| تمسح عنصر | دوس عليه ثم Delete |
| تخبّيه من غير مسح | دوس عليه ثم [[H]] |
| تعدّل الكود نفسه | كليك يمين ثم Edit as HTML، وبعد التعديل [[Ctrl+Enter]] |
| تتراجع | [[Ctrl+Z]] |

جرّب دلوقتي: دوس على الفقرة الفاضية [[<p></p>]] ودوس Delete. ودوس على الـ [[<h2>]] الأخير، كليك يمين ثم Edit as HTML، وشيل منه الفقرتين.

**بس خد بالك:** ده تعديل في الشجرة اللي في ذاكرة المتصفح. الملف على الديسك زي ما هو، وأول [[Ctrl+R]] كل التعديلات بتروح. Elements مكان تجرّب فيه، والتصليح الحقيقي بيتكتب في VS Code.

(ولما تتعلم CSS هتستخدم نفس المكان عشان تزوّد وتشيل [[class]] من عنصر وتشوف التنسيق بيتطبق ولا لأ. شرح التاب كله في كورس «المتصفح و DevTools»، درسي «View Page Source و Inspect» و «Elements».)

---

## ٤. الـ HTML validator: كل غلطة بسطرها

Elements وراك إن فيه حاجة اتغيّرت، بس انت اللي قارنت بعينك. الـ validator بيعمل المقارنة دي عنك: برنامج بيقرا الـ HTML ويطلّع قايمة بكل مخالفة لقواعد اللغة، ورقم سطرها.

الأداة اسمها Nu Html Checker، وهي اللي W3C بتشغّلها على العنوان ده:

~~~text
https://validator.w3.org/nu/
~~~

### بتستخدمه إزاي

في الصفحة قايمة اسمها **Check by** فيها تلات اختيارات:

| الاختيار | بتدّيه إيه | ينفعك إمتى |
|---|---|---|
| [[address]] | عنوان صفحة على النت | بعد ما موقعك يترفع. عنوان [[file:///]] مينفعش: الخدمة مش شايفة الديسك بتاعك |
| [[file upload]] | ملف من جهازك | ينفع دلوقتي |
| [[text input]] | الكود نفسه، لصق | ينفع دلوقتي، وهو الأسرع |

1. اختار **text input**.
2. في VS Code: [[Ctrl+A]] (حدد الكل) ثم [[Ctrl+C]] (انسخ).
3. الصق في المربع ([[Ctrl+V]]) ودوس **Check**.

### الرد

ده اللي رجع على صفحتنا:

~~~text الناتج
Error: No “p” element in scope but a “p” end tag seen.
From line 24, column 5; to line 24, column 8
Error: Heading cannot be a child of another heading.
From line 25, column 20; to line 25, column 23
Error: Element “p” not allowed as child of element “h2” in this context. (Suppressing further errors from this subtree.)
From line 26, column 5; to line 26, column 7
Error: Element “p” not allowed as child of element “h2” in this context. (Suppressing further errors from this subtree.)
From line 27, column 5; to line 27, column 7
Error: End tag for  “body” seen, but there were unclosed elements.
From line 28, column 1; to line 28, column 7
Error: Unclosed element “h2”.
From line 25, column 20; to line 25, column 23
There were errors. (Tried in the text/html mode.)
~~~

### إزاي تقرا رسالة

كل رسالة سطرين:

~~~text
Error: No “p” element in scope but a “p” end tag seen.
From line 24, column 5; to line 24, column 8
~~~

- **النوع:** [[Error]] مخالفة للقواعد، لازم تتصلّح. و [[Warning]] تنبيه: الكتابة قانونية بس فيه حاجة الأحسن تتعمل.
- **النص:** «لقيت قفلة [[p]] ومفيش [[p]] مفتوح».
- **المكان:** السطر ٢٤، من الحرف ٥ للحرف ٨. روح للسطر ٢٤ في VS Code (رقم السطر على الشمال، أو [[Ctrl+G]] واكتب الرقم): هتلاقي [[</p>]].

### ست رسايل، غلطتين

| الرسالة | السطر | جاية من |
|---|---|---|
| [[No “p” element in scope but a “p” end tag seen]] | ٢٤ | الغلطة ١: القايمة جوه الفقرة |
| [[Heading cannot be a child of another heading]] | ٢٥ | الغلطة ٢: [[<h2>]] بدل [[</h2>]] |
| [[Element “p” not allowed as child of element “h2”]] | ٢٦ | نتيجة الغلطة ٢: الفقرة بقت جوه العنوان |
| نفس الرسالة | ٢٧ | نتيجة الغلطة ٢ |
| [[End tag for “body” seen, but there were unclosed elements]] | ٢٨ | نتيجة الغلطة ٢: وصل لآخر الصفحة والعنوان مفتوح |
| [[Unclosed element “h2”]] | ٢٥ | الغلطة ٢ نفسها، بالاسم |

فالطريقة: **صلّح أول رسالة، وافحص تاني.** غلطة واحدة بتولّد رسايل كتير بعدها، ولما تتصلّح بيختفوا كلهم. متقعدش تصلّح الست رسايل واحدة واحدة.

(الرسالة التانية بتقول «عنوان جوه عنوان»، و Elements وراك العنوانين جنب بعض. الاتنين بيوصفوا نفس السطر: [[<h2>]] اتفتح و [[<h2>]] تاني اتفتح قبل ما الأول يتقفل.)

### التصليح

في VS Code: الفقرة اللي قبل القايمة تبقى عنوان (هي أصلًا عنوان القسم)، والـ [[<h2>]] التاني يبقى [[</h2>]]:

~~~html
    <h2>أقسام المكتبة</h2>
    <ul>
        <li>روايات</li>
        <li>كتب أطفال</li>
        <li>كتب مستعملة</li>
    </ul>
    <h2>عرض الأسبوع</h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
~~~

احفظ، والصق تاني، و Check:

~~~text الناتج
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
~~~

(ده نص الرد لما الفحص بيتم من الترمنال، زي التمرين الخامس. في صفحة الموقع نفسها الرسالة «Document checking completed. No errors or warnings to show.»، حسب صفحة Debugging HTML في MDN.)

### «valid» معناها إيه بالظبط

إن الكتابة ماشية على قواعد اللغة: كل عنصر في مكان مسموح، وكل حاجة مقفولة، ومفيش attribute ناقص إجباري. **مش** معناها إن الصفحة كويسة: صفحة كلها [[<div>]] ومفيهاش ولا عنوان هتعدّي. وصفحة الأداة نفسها بتقول إنها أداة فحص، مش شهادة نجاح.

واللي بتلصقه بيتبعت لخدمة عامة على النت. لصفحات التمرين مفيش مشكلة. متلصقش صفحة فيها بيانات خاصة.

### ولما تكتب CSS بعدين

الـ validator هيفضل أول فحص، حتى لما المشكلة شكلها مشكلة تنسيق. الـ CSS بيتطبق على الشجرة اللي المتصفح بناها، مش على اللي كتبته. في مثالنا: لو كتبت تنسيق يلوّن كل [[<h2>]]، جملة العرض ولينك «كلّمنا» كانوا هيتلوّنوا معاه، لأنهم جوه [[<h2>]] مش مقفول. ولو كتبت تنسيق للفقرة اللي فيها القايمة، مكنش هيوصل للقايمة، لأنها خرجت برّه الفقرة. فلما تنسيق «مش راضي يتطبق» أو «بيتطبق على حاجة غلط»: افحص الـ HTML الأول، وبعدين دوّر في الـ CSS.

---

## ٥. عرض 360: الصفحة على الموبايل

و DevTools مفتوحة:

~~~text
Ctrl+Shift+M        (على الماك: Cmd+Shift+M. أو أيقونة الموبايل والتابلت في أول شريط DevTools)
~~~

ده الـ Device Toolbar: الصفحة بتتعرض جوه إطار بعرض موبايل. فوق الإطار قايمة Dimensions: سيبها Responsive، واكتب في خانة العرض [[360]]. ده عرض موبايل صغير شائع، فلو الصفحة سليمة عليه هتبقى سليمة على الأكبر.

بتدوّر على حاجتين:

- **scroll أفقي:** لو الصفحة بتتحرك يمين وشمال، فيه حاجة أعرض من الشاشة.
- **كلام متصغّر جدًا:** معناه إن سطر الـ viewport ناقص (التمرين الرابع).

~~~text القياس على صفحة المكتبة (Chrome 157، عرض 360)
innerWidth = 360     scrollWidth = 360     (مفيش scroll أفقي)
~~~

[[scrollWidth]] عرض المحتوى كله. لما يساوي عرض الشاشة يبقى مفيش حاجة خارجة.

صفحة HTML من غير CSS قليل لما تكسر على 360: الكلام بيلف لوحده. المشاكل بتبدأ مع الصور والجداول والـ CSS، وساعتها تكون العادة دي ثبتت. وده تقريب مش موبايل حقيقي (وثائق DevTools بتقولها صريحة)، فلما يبقى الموقع مرفوع افتحه من موبايلك كمان. الدرس الكامل: كورس «المتصفح و DevTools»، درس «Device Toolbar».

---

## ٦. Console: بصّة على الأحمر

~~~text
Ctrl+Shift+J        (على الماك: Cmd+Option+J. أو تاب Console جوه DevTools)
~~~

الـ Console هو المكان اللي المتصفح بيكتب فيه مشاكله: سطور حمرا للأخطاء وصفرا للتنبيهات.

حاجتين لازم تعرفهم دلوقتي:

**أخطاء الـ HTML مش بتظهر هنا.** فتحت الصفحة بالغلطتين والـ Console فاضي تمامًا. الـ Console بيتكلم عن JavaScript وعن الملفات اللي متحمّلتش. أخطاء الكتابة مكانها الـ validator.

**اللي هيظهرلك في صفحة HTML: ملف مش موجود.** لو الصفحة بتطلب صورة والمسار غلط، هتلاقي:

~~~text Console في Chrome 157
Failed to load resource: net::ERR_FILE_NOT_FOUND          logo.svg
~~~

السطر بيقول إيه اللي حصل (التحميل فشل، الملف مش موجود) وعلى اليمين اسم الملف. هتقابلها في الدرس الجاي لما نحط صورة. قراية الأخطاء بالتفصيل: كورس «المتصفح و DevTools»، درس «قراءة الأخطاء».

فالعادة: كل ما تفتح DevTools، بصّة على Console. فاضي؟ كمّل.

---

## ٧. الصفحة بعد الفحص

~~~live 520 540 index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <h1>مكتبة الركن</h1>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
    <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
    <h2>مواعيد العمل</h2>
    <ul>
        <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
        <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
        <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
    </ul>
    <h2>أقسام المكتبة</h2>
    <ul>
        <li>روايات</li>
        <li>كتب أطفال</li>
        <li>كتب مستعملة</li>
    </ul>
    <h2>عرض الأسبوع</h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
</body>
</html>
~~~

كل عنوان خطه كبير لوحده، وكل قسم تحته قايمته أو فقرته، ولينك «كلّمنا» رجع خط عادي.

~~~text الناتج (Chrome 157)
h1: 1   h2: 3   p: 4   li: 6      View Source و Elements متطابقين
الـ validator: The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0
عرض 360: scrollWidth = 360         Console: فاضي
~~~

---

## الخلاصة: الفحص قبل «خلصت»

| الترتيب | الأداة | بتجاوب على | الاختصار |
|---|---|---|---|
| ١ | العين | الشكل زي ما متوقع؟ | |
| ٢ | الـ validator | الكتابة سليمة؟ | الصق في [[validator.w3.org/nu]] |
| ٣ | Elements | المتصفح بنى اللي أنا قاصده؟ | [[F12]] |
| ٤ | Device Toolbar | سليمة على 360؟ | [[Ctrl+Shift+M]] |
| ٥ | Console | فيه ملف متحمّلش؟ | [[Ctrl+Shift+J]] |

- View Source = اللي كتبته. Elements = اللي اتبنى. الفرق بينهم = المتصفح صلّح حاجة.
- الـ validator: صلّح أول رسالة وافحص تاني.
- التعديل في Elements تجربة، مبيتحفظش.

**الفولدر دلوقتي:** [[rokn-books/index.html]] فيه خمس أجزاء (التعريف، والعنوان، والمواعيد، والأقسام، والعرض) وعدّى من الـ validator. الدرس الجاي بيزوّد صورة وصفحة تانية.`,
          lines: [
            R`[[Ctrl+U]]: يفتح الملف زي ما المتصفح استلمه في تاب جديد، بأرقام السطور. ده «اللي انت كتبته».`,
            R`[[F12]]: يفتح DevTools. تاب Elements فيه شجرة العناصر اللي المتصفح بناها من الملف، وبتتعدّل للتجربة.`,
            R`[[Ctrl+Shift+C]]: وضع الاختيار: حرّك الماوس على الصفحة ودوس على أي حاجة، و Elements يوديك لسطرها في الشجرة.`,
            R`[[Ctrl+Shift+M]]: Device Toolbar (و DevTools مفتوحة): الصفحة جوه إطار بعرض موبايل. اكتب 360 في خانة العرض.`,
            R`[[Ctrl+Shift+J]]: يفتح DevTools على تاب Console: السطور الحمرا هنا هي الملفات اللي متحمّلتش وأخطاء JavaScript.`,
            R`[[validator.w3.org/nu]]: الـ Nu Html Checker. اختار text input من قايمة Check by، والصق الصفحة كلها، ودوس Check.`
          ],
          sol: R`**في المتصفح:** العنوان اختفى، والصفحة كلها اتقلبت وبقت بادئة من الشمال. التعديل ظهر في نفس اللحظة.

**بعد [[Ctrl+R]]:** كل حاجة رجعت. العنوان موجود والصفحة من اليمين.

**الملف في VS Code:** متغيّرش ولا حرف.

~~~text القياس (Chrome 157)
                         عدد h1     dir
بعد التعديل في Elements     0       ltr
بعد Ctrl+R                 1       rtl
~~~

**ليه:** Elements بيعدّل في الشجرة اللي في ذاكرة المتصفح، مش في الملف. و [[Ctrl+R]] بيرمي الشجرة ويبني واحدة جديدة من الملف اللي على الديسك.

فهو معمل تجارب: جرّب فيه التصليح، ولما يعجبك اكتبه في VS Code واحفظ.`,
          ref: [
            { t: "MDN Curriculum: Semantic HTML (2.2 و 2.9 Debugging HTML)", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" },
            { t: "MDN: Debugging HTML", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Debugging_HTML" },
            { t: "W3C: Nu Html Checker", url: "https://validator.w3.org/nu/" },
            { t: "Nu Html Checker: About", url: "https://validator.w3.org/nu/about.html" },
            { t: "Chrome DevTools: View and change the DOM", url: "https://developer.chrome.com/docs/devtools/dom" },
            { t: "Chrome DevTools: Device mode", url: "https://developer.chrome.com/docs/devtools/device-mode" },
            { t: "Chrome DevTools: Open DevTools", url: "https://developer.chrome.com/docs/devtools/open" },
          ],
          pre: [
            "css/start index.html و Ctrl+R",
            { to: "web/View Page Source و Inspect", why: R`الفرق بين الاتنين في المواقع اللي فيها JavaScript` },
            { to: "web/Elements", why: R`باقي تاب Elements: Styles و Computed` },
            { to: "web/Device Toolbar", why: R`الدرس الكامل لوضع الموبايل` },
          ]
        },
        {
          cmd: "فولدر لكل مشروع",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الفولدر شكله كده، والسطر في [[index.html]]. أنهي واحد من الأربعة هيعرض الصورة؟ توقّع الأربعة، وبعدين جرّبهم واحد واحد وبصّ على Console في كل مرة.

~~~text
rokn-books/
├── index.html
└── images/
    └── logo.svg
~~~

~~~html
(أ) <img src="logo.svg" alt="لوجو">
(ب) <img src="images/logo.svg" alt="لوجو">
(ج) <img src="image/logo.svg" alt="لوجو">
(د) <img src="Images/Logo.SVG" alt="لوجو">
~~~`, done: R`قلت إن (ب) شغالة، و (أ) و (ج) لأ وليه، و (د) شغالة على جهازك بس متتكتبش وليه.`, sol: R`| | النتيجة | ليه |
|---|---|---|
| (أ) [[logo.svg]] | مش ظاهرة | المتصفح دوّر على الملف جنب [[index.html]]، وهو جوه [[images]] |
| (ب) [[images/logo.svg]] | ظاهرة | ادخل [[images]] وخد [[logo.svg]]: ده مكانه |
| (ج) [[image/logo.svg]] | مش ظاهرة | الفولدر اسمه [[images]] بحرف s. حرف واحد ناقص |
| (د) [[Images/Logo.SVG]] | ظاهرة على ويندوز | ويندوز والماك مبيفرّقوش بين الحروف الكبيرة والصغيرة في أسامي الملفات |

**ليه (د) متتكتبش:** أغلب السيرفرات بتفرّق. فالصورة تظهر عندك وتختفي بعد الرفع، وده من أصعب الأخطاء لأن «عندي شغالة». اكتب الاسم زي ما هو على الديسك بالحرف، وخلّي كل أسامي الملفات حروف صغيرة فالمشكلة متحصلش. (سلوك السيرفر من صفحة «Dealing with files» في MDN، والباقي مقاس هنا.)

**الغلطة الشائعة:** لما الصورة متظهرش، تدوّر في الـ HTML. اسم الملف اللي المتصفح دوّر عليه مكتوب في Console: قارنه باللي في [[ls]].

~~~text القياس (Chrome 157 على Windows 11)
(أ) naturalWidth = 0     Console: Failed to load resource: net::ERR_FILE_NOT_FOUND   logo.svg
(ب) naturalWidth = 120   Console: فاضي
(ج) naturalWidth = 0     Console: Failed to load resource: net::ERR_FILE_NOT_FOUND   logo.svg
(د) naturalWidth = 120   Console: فاضي
~~~

[[naturalWidth]] عرض الصورة الحقيقي بعد ما تتحمّل. صفر معناه «متحمّلتش».` },
            { lvl: 'تطبيق', t: R`**صلّح (رتّب):** واحد كان شغال على سطح المكتب، وعنده في فولدر واحد ملفات مشروعين متلخبطين: [[index.html]] و [[about.html]] بتوع موقع عيادة، و [[menu.html]] و [[prices.html]] و [[logo.svg]] بتوع موقع كافيه. جوه [[practice-site]] اعمل فولدر [[messy]] وجواه الخمس ملفات دول فاضيين، وبعدين افصلهم: كل مشروع في فولدره، وصورة الكافيه في [[images]]. بالترمنال بس.`, done: R`الشجرة فيها فولدرين [[clinic-site]] و [[cafe-site]]، ومفيش ولا ملف برّاهم، و [[logo.svg]] جوه [[cafe-site/images]].`, sol: R`~~~powershell
mkdir clinic-site, cafe-site, cafe-site\images
mv index.html, about.html clinic-site
mv menu.html, prices.html cafe-site
mv logo.svg cafe-site\images
tree /f
~~~

~~~bash
mkdir -p clinic-site cafe-site/images
mv index.html about.html clinic-site/
mv menu.html prices.html cafe-site/
mv logo.svg cafe-site/images/
ls -R
~~~

**ليه كده:** [[mv]] (من move) بياخد الملفات وبعدين الفولدر اللي رايحين له. في PowerShell الملفات بينهم فاصلة، وفي bash مسافة. ([[mv]] في PowerShell اسم تاني لـ [[Move-Item]].)

**ناقص حاجة:** موقع الكافيه دلوقتي مفيهوش [[index.html]]. [[menu.html]] كانت بتتفتح باسمها فمحدش لاحظ. دي أول حاجة هتتعمل له.

**ولو الصفحات كان فيها [[<img src="logo.svg">]]؟** هتبوظ بعد النقل، وتتصلّح لـ [[images/logo.svg]]. نقل ملف معناه إنك تراجع كل مكان بيشاور عليه.

**الغلطة الشائعة:** تعمل النقل بالسحب بالماوس وتسيب نسخة ورا. [[mv]] بينقل، مبينسخش، والشجرة في الآخر بتأكد.

~~~text الناتج (tree /f في PowerShell 7.6)
C:.
├───cafe-site
│   │   menu.html
│   │   prices.html
│   │
│   └───images
│           logo.svg
│
└───clinic-site
        about.html
        index.html
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** الدرس قال إن الخطوة الجاية بعد ترتيب الفولدر هي Git. من درس «git init / clone» في كورس Git (مش من هنا): إيه الأمر اللي بيحوّل فولدر مشروع لـ repo؟ وإيه اللي بيتزوّد في الفولدر بعده؟ جرّبه على فولدر تجربة جديد اسمه [[git-demo]] فيه [[index.html]] فاضي، **مش** على مشروع المكتبة. وليه القاعدة «repo لكل مشروع» هي نفس قاعدة «فولدر لكل مشروع»؟`, done: R`شفت رسالة [[Initialized empty Git repository]]، ولقيت الفولدر المخفي بأمر عرض بيوري المخفي، وجاوبت السؤال الأخير في جملة.`, sol: R`~~~bash
mkdir git-demo && cd git-demo
touch index.html
git init
ls -a
~~~

**الشرح:** [[git init]] بيعمل جوه الفولدر فولدر مخفي اسمه [[.git]]: ده المكان اللي Git بيخزّن فيه تاريخ المشروع. [[ls -a]] (الـ a من all) بيعرض الملفات المخفية كمان (اللي اسمها بيبدأ بنقطة). في PowerShell: [[ls -Force]].

ملفاتك نفسها متلمستش: [[index.html]] زي ما هو.

**ليه نفس القاعدة:** الـ [[.git]] بيتابع كل اللي في الفولدر اللي هو فيه. لو الفولدر فيه مشروعين، تاريخهم هيتلخبط في بعض ومش هتعرف ترفع واحد من غير التاني. فولدر واحد = مشروع واحد = repo واحد.

**الغلطة الشائعة:** تكتب [[git init]] وانت واقف في [[projects]] (أو في الـ home) بدل ما تكون جوه المشروع. ساعتها كل مشاريعك بقت repo واحد. [[pwd]] قبل [[git init]].

~~~text الناتج (Git Bash)
Initialized empty Git repository in C:/Users/ali/projects/git-demo/.git/
.
..
.git
index.html
~~~

ده كل اللي محتاجه من Git هنا. الباقي (تحفظ نسخة، وترفع) في كورس Git من أوله.` },
          ],
          title: "رتّب المشروع: فولدر واحد، وصور في images، وصفحة تانية",
          desc: R`كل اللي الموقع محتاجه بيبقى جوه فولدر واحد: الصفحات في الفولدر نفسه، والصور في فولدر [[images]] جواه. والملفات بتشاور على بعض بمسار بيبدأ من مكان الصفحة ([[images/logo.svg]])، مش من أول الديسك. فلما تنقل الفولدر كله أو ترفعه، كل حاجة بتفضل شغالة.

ده آخر درس في الوحدة. بنبدأ من صفحة المكتبة المفحوصة، ونزوّد عليها لوجو في [[images]] وصفحة تانية [[about.html]] ولينك بين الصفحتين. وفي الآخر: إشارة لـ Git، والطريق كله في جدول واحد.

المسارات هنا في فقرة واحدة على قد اللي محتاجه دلوقتي. شرحها الكامل (الفولدر الأب، والمسار المطلق، وأنواع اللينكات) في الوحدة الجاية عن اللينكات.`,
          example: R`# Windows (PowerShell):
mkdir images
ni images\logo.svg, about.html
tree /f
# Linux and Mac:
mkdir images
touch images/logo.svg about.html
ls -R`,
          try: R`بعد ما تخلّص الدرس: اعمل نسخة من الفولدر كله جنبه باسم [[rokn-copy]] ([[Copy-Item rokn-books rokn-copy -Recurse]] في PowerShell، أو [[cp -r rokn-books rokn-copy]] في bash)، وافتح [[index.html]] اللي في النسخة. الصورة ظاهرة؟ واللينك بيودّي على أنهي [[about.html]]؟ ليه؟ وبعدين امسح النسخة.`,
          deep: {
            why: R`المشروع اللي ملفاته متبعترة (صورة في Downloads، وصفحة على سطح المكتب) بيشتغل على جهازك النهارده بس. أول ما تنقله، أو تبعته لحد، أو ترفعه، الصور بتختفي واللينكات بتبوظ. والمشروع اللي كله في فولدر واحد بتنسخه زي ما هو وبيشتغل في أي مكان.`,
            how: R`لما المتصفح يلاقي [[src="images/logo.svg"]] في صفحة عنوانها [[…/rokn-books/index.html]]، بيشيل اسم الصفحة من العنوان ويحط المسار مكانه: [[…/rokn-books/images/logo.svg]]. يعني المسار «نسبي»: بيتحسب من مكان الصفحة اللي هو مكتوب فيها. وعشان كده مش مهم الفولدر نفسه موجود فين على الديسك.

واللينك [[href="about.html"]] نفس الحكاية: «ملف اسمه about.html جنب الصفحة دي».`,
            when: R`من أول ملف تاني في المشروع. وكل مرة تزوّد صورة: حطها في [[images]] الأول وبعدين اكتب الـ [[<img>]].`,
            mistakes: R`تكتب مسار الصورة من أول الديسك ([[C:\Users\…]]): بيشتغل على جهازك انت بس. تسيب الصورة في Downloads وتشاور عليها. تكتب الاسم بحروف غير اللي على الديسك. تنقل ملف من غير ما تراجع اللي بيشاور عليه. وتعمل مشروع جديد جوه فولدر مشروع قديم.`
          },
          teach: R`## الفكرة في سطرين

الموقع فولدر. كل اللي فيه بيشاور على بعضه من جوه، فيتنقل كله مرة واحدة. هنزوّد صورة وصفحة تانية ونشوف القاعدة دي وهي شغالة.

الأوامر اتشغّلت في PowerShell 7.6 و 5.1 و Git Bash على Windows 11، والقياسات من Chrome 157.

---

## ١. فولدر الصور

في الترمنال اللي جوه VS Code، وانت في [[rokn-books]]:

~~~powershell
mkdir images
ni images\logo.svg, about.html
~~~

~~~bash
mkdir images
touch images/logo.svg about.html
~~~

عملنا تلات حاجات: فولدر [[images]]، وجواه ملف صورة فاضي، وصفحة تانية فاضية جنب [[index.html]]. الملف اللي جوه فولدر بيتكتب بمساره: اسم الفولدر، وشرطة، واسم الملف.

الاسم [[images]] مش كلمة محجوزة، بس ده اللي أغلب المشاريع بتستخدمه (وهو اللي MDN بتقترحه)، فأي حد يفتح مشروعك يعرف يدوّر فين.

### الصورة نفسها

افتح [[images/logo.svg]] في VS Code والصق ده واحفظ:

~~~xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" rx="16" fill="#1f4e5f"/>
  <path d="M60 36 C48 28 32 28 22 32 V88 C32 84 48 84 60 92 C72 84 88 84 98 88 V32 C88 28 72 28 60 36 Z" fill="#fdf6e3"/>
  <path d="M60 36 V92" stroke="#1f4e5f" stroke-width="3"/>
</svg>
~~~

ده ملف SVG: صورة مكتوبة نص (مربع غامق وجواه كتاب مفتوح). مش مطلوب تفهم سطوره دلوقتي، انسخه زي ما هو. اخترناه عشان تعمل الصورة بنفسك من غير ما تنزّل حاجة من النت. (شرحه في درس «SVG» في وحدة الصور.) ولو عندك صورة [[.png]] أو [[.jpg]] بتاعتك، حطها في [[images]] واستخدمها بنفس الطريقة.

---

## ٢. حط الصورة في الصفحة

في [[index.html]]، أول سطر جوه الـ [[<body>]]:

~~~html
    <img src="images/logo.svg" alt="لوجو مكتبة الركن: كتاب مفتوح" width="120" height="120">
~~~

([[alt]] و [[width]] و [[height]] مشروحين في درس «img».)

المهم هنا قيمة [[src]]، وده كل اللي محتاجه عن المسارات دلوقتي:

> [[images/logo.svg]] معناها: **من الفولدر اللي فيه الصفحة دي**، ادخل [[images]]، وخد [[logo.svg]]. المسار بيبدأ من مكان ملف الـ HTML، مش من أول الديسك. والشرطة مايلة لقدام [[/]] دايمًا، حتى على ويندوز.

احفظ و [[Ctrl+R]]. والمتصفح حوّل المسار لإيه؟

~~~text Chrome 157
الصفحة:           file:///C:/Users/ali/projects/rokn-books/index.html
src المكتوب:      images/logo.svg
العنوان اللي اتطلب:  file:///C:/Users/ali/projects/rokn-books/images/logo.svg
naturalWidth = 120     (الصورة اتحمّلت)
~~~

شال [[index.html]] من آخر عنوان الصفحة وحط [[images/logo.svg]] مكانه.

### ولما المسار يبقى غلط

لو كتبت [[image/logo.svg]] (من غير s):

- في الصفحة: أيقونة صورة مكسورة وجنبها كلام الـ [[alt]]. (وده أول سبب لوجود الـ [[alt]].)
- في Console ([[Ctrl+Shift+J]]):

~~~text Console في Chrome 157
Failed to load resource: net::ERR_FILE_NOT_FOUND          logo.svg
~~~

دي الرسالة اللي الدرس اللي فات قال إنك هتقابلها. دوس على اسم الملف في آخر السطر، هتشوف العنوان الكامل اللي المتصفح دوّر عليه: [[…/rokn-books/image/logo.svg]]. قارنه بالشجرة: الفولدر اسمه [[images]].

والـ validator ملوش دعوة بالحكاية دي: هو بيفحص الكتابة، ومبيشوفش ملفاتك. المسار الغلط بيعدّي منه. والعكس: لو نسيت الـ [[alt]]، الصورة بتظهر عادي والـ validator هو اللي بيتكلم:

~~~text الناتج
Error: An “img” element must have an “alt” attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.
From line 9, column 5; to line 9, column 56
~~~

كل أداة بتشوف حاجة.

---

## ٣. صفحة تانية ولينك بينهم

افتح [[about.html]]، و [[!]] ثم Tab، وغيّر [[lang]] و [[dir]] و [[title]]، واكتب:

~~~live 190 230 about.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عن المكتبة | مكتبة الركن</title>
</head>
<body>
    <h1>عن المكتبة</h1>
    <p>مكتبة الركن فتحت سنة ٢٠١٩ في دكان صغير على الناصية. بدأنا برفّين كتب مستعملة، والنهارده عندنا أكتر من ألفين كتاب.</p>
    <p>بنشتري الكتب المستعملة اللي حالتها كويسة، وبنبدّل كتاب بكتاب كل يوم خميس.</p>
    <p><a href="index.html">ارجع للرئيسية</a></p>
</body>
</html>
~~~

لاحظ الـ [[<title>]]: اسم الصفحة، وبعده اسم الموقع. كده كل تاب في المتصفح مكتوب عليه هو أنهي صفحة.

وفي [[index.html]]، آخر حاجة في الـ [[<body>]]:

~~~html
    <p><a href="about.html">عن المكتبة</a></p>
~~~

[[href="about.html"]] نفس قاعدة الصورة: «ملف اسمه [[about.html]] في نفس الفولدر اللي فيه الصفحة دي». و [[href="index.html"]] في الصفحة التانية بيرجّع.

احفظ الملفين، وافتح [[index.html]]، ودوس على اللينك، وبصّ على شريط العنوان: آخره بقى [[about.html]]. ودوس «ارجع للرئيسية»: رجع [[index.html]]. بقى عندك موقع من صفحتين.

(اللينكات اللي في المعاينة هنا مش هتفتح: المعاينة بتعرض صفحة واحدة. على جهازك هتفتح.)

---

## ٤. المشروع بعد الترتيب

~~~powershell
tree /f
~~~

~~~text الناتج (PowerShell 7.6)
C:.
│   about.html
│   index.html
│
└───images
        logo.svg
~~~

و [[index.html]] كامل:

~~~html index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <img src="images/logo.svg" alt="لوجو مكتبة الركن: كتاب مفتوح" width="120" height="120">
    <h1>مكتبة الركن</h1>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
    <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
    <h2>مواعيد العمل</h2>
    <ul>
        <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
        <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
        <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
    </ul>
    <h2>أقسام المكتبة</h2>
    <ul>
        <li>روايات</li>
        <li>كتب أطفال</li>
        <li>كتب مستعملة</li>
    </ul>
    <h2>عرض الأسبوع</h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
    <p><a href="about.html">عن المكتبة</a></p>
</body>
</html>
~~~

~~~view 690 700 شكل index.html في المتصفح
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مكتبة الركن</title>
</head>
<body>
    <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2216%22%20fill%3D%22%231f4e5f%22%2F%3E%3Cpath%20d%3D%22M60%2036%20C48%2028%2032%2028%2022%2032%20V88%20C32%2084%2048%2084%2060%2092%20C72%2084%2088%2084%2098%2088%20V32%20C88%2028%2072%2028%2060%2036%20Z%22%20fill%3D%22%23fdf6e3%22%2F%3E%3Cpath%20d%3D%22M60%2036%20V92%22%20stroke%3D%22%231f4e5f%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E" alt="لوجو مكتبة الركن: كتاب مفتوح" width="120" height="120">
    <h1>مكتبة الركن</h1>
    <p>مكتبة صغيرة على ناصية شارع النخيل: كتب جديدة ومستعملة، وركن للأطفال.</p>
    <p>العنوان: ٧ شارع النخيل، جنب الصيدلية.</p>
    <h2>مواعيد العمل</h2>
    <ul>
        <li>من السبت للخميس: ١٠ الصبح لـ ٩ بالليل</li>
        <li>الجمعة: ٤ العصر لـ ٩ بالليل</li>
        <li>أول يوم في كل شهر: جرد، والمكتبة مقفولة</li>
    </ul>
    <h2>أقسام المكتبة</h2>
    <ul>
        <li>روايات</li>
        <li>كتب أطفال</li>
        <li>كتب مستعملة</li>
    </ul>
    <h2>عرض الأسبوع</h2>
    <p>أي كتابين مستعملين بـ ٥٠ جنيه.</p>
    <p><a href="tel:+200000000000">كلّمنا</a></p>
    <p><a href="about.html">عن المكتبة</a></p>
</body>
</html>
~~~

والفحص زي الدرس اللي فات، على الصفحتين:

~~~text الناتج (Chrome 157)
index.html:  الـ validator: valid     عرض 360: scrollWidth = 360     Console: فاضي     الصورة 120×120
about.html:  الـ validator: valid     عرض 360: scrollWidth = 360     Console: فاضي
~~~

### القاعدة

| | مكانه |
|---|---|
| الصفحة الرئيسية | [[index.html]] في الفولدر نفسه |
| باقي الصفحات | جنبها، باسم بيوصفها: [[about.html]] |
| الصور | جوه [[images]] |
| ملفات CSS و JavaScript (بعدين) | فولدر لكل نوع، بنفس الفكرة |
| مشروع تاني | فولدر تاني جوه [[projects]]، مش جوه ده |

---

## ٥. الخطوة الجاية: Git

دلوقتي عندك فولدر مرتب، وده بالظبط اللي Git بيشتغل عليه. Git بيحفظ نسخة من المشروع كل ما تقوله، فترجع لأي نسخة قديمة، وهو الطريق لرفع الموقع على النت.

البداية أمر واحد بيتكتب **جوه فولدر المشروع**: [[git init]]. مش هنشرحه هنا: كورس Git بيبدأ من الصفر (درس «مقدمة Git و GitHub» ثم «git init / clone»). المهم إنك عارف إن الترتيب اللي عملته هو أول شرط ليه: مشروع واحد في الفولدر.

---

## الطريق كله

دي الست خطوات اللي بتظهر في أول كل مشروع في الكورس، وكل واحدة اتشرحت فين:

| الخطوة | بتعمل إيه | الدرس |
|---|---|---|
| ١. الفولدر والملفات | [[mkdir]] ثم [[cd]] ثم [[ni]] أو [[touch]] | «mkdir و ni و touch» |
| ٢. افتحه في VS Code | [[code .]] | «code . و Emmet !» |
| ٣. اكتب الصفحة | [[!]] ثم Tab، و [[lang="ar" dir="rtl"]]، و [[Ctrl+S]] | «code . و Emmet !» |
| ٤. شوفها في Chrome | [[start index.html]]، وبعد كل تعديل [[Ctrl+R]] | «start index.html و Ctrl+R» |
| ٥. افحصها | الـ validator، و [[F12]]، و [[Ctrl+Shift+M]] على 360، و Console | «View Source و validator» |
| ٦. رتّبها | صور في [[images]]، وصفحات جنب بعض، وفولدر لكل مشروع | الدرس ده |

---

## الخلاصة

- فولدر واحد = مشروع واحد. كل اللي الموقع محتاجه جواه.
- [[src="images/logo.svg"]] و [[href="about.html"]]: المسار من مكان الصفحة.
- صورة مش ظاهرة: Console فيه اسم الملف اللي المتصفح دوّر عليه.
- بعد أي ملف جديد: [[tree /f]] أو [[ls -R]] واتأكد إنه في مكانه.

**الفولدر دلوقتي:** [[rokn-books]] فيه [[index.html]] و [[about.html]] و [[images/logo.svg]]. مشاريع الوحدة بتكمّل من هنا: أول أربعة بيكبّروا موقع المكتبة صفحة صفحة، وآخر اتنين بتعمل فيهم الطريق كله لوحدك من فولدر فاضي.`,
          lines: [
            R`[[mkdir images]]: فولدر الصور جوه المشروع. لازم يتعمل قبل ما تعمل ملف جواه.`,
            R`[[ni images\logo.svg, about.html]]: ملفين بأمر واحد (بينهم فاصلة): ملف الصورة جوه [[images]]، والصفحة التانية جنب [[index.html]].`,
            R`[[tree /f]]: ارسم الفولدر بملفاته واتأكد إن كل حاجة في مكانها.`,
            R`[[mkdir images]]: نفس الأمر على الماك ولينكس.`,
            R`[[touch images/logo.svg about.html]]: الملفين بأمر واحد (بينهم مسافة)، والمسار بشرطة لقدام.`,
            R`[[ls -R]]: اعرض الفولدر وكل اللي جواه. الـ R من recursive.`
          ],
          sol: R`**الصورة ظاهرة، واللينك بيودّي على [[about.html]] اللي في النسخة،** مش اللي في الأصل.

~~~powershell
Copy-Item rokn-books rokn-copy -Recurse
~~~

~~~bash
cp -r rokn-books rokn-copy
~~~

[[-Recurse]] و [[-r]] معناهم «الفولدر وكل اللي جواه». من غيرهم الفولدر بيتنسخ فاضي أو الأمر بيرفض.

~~~text القياس (Chrome 157، الصفحة مفتوحة من النسخة)
الصفحة:     file:///C:/Users/ali/projects/rokn-copy/index.html
الصورة:     naturalWidth = 120
اللينك:      file:///C:/Users/ali/projects/rokn-copy/about.html
~~~

**ليه:** مفيش في الملفات أي مكان مكتوب فيه [[rokn-books]] ولا [[C:\Users]]. الصورة مكتوبة [[images/logo.svg]] واللينك [[about.html]]: الاتنين بيتحسبوا من مكان الصفحة اللي اتفتحت. الصفحة اتنقلت، فهم اتنقلوا معاها.

وده اللي هيحصل بالظبط لما ترفع الفولدر على سيرفر: العنوان هيتغيّر كله، والموقع هيفضل شغال.

**التنضيف:** [[Remove-Item rokn-copy -Recurse]] في PowerShell، أو [[rm -r rokn-copy]] في bash. اقرا اسم الفولدر مرتين قبل Enter: المسح من الترمنال مبيعدّيش على سلة المهملات.`,
          ref: [
            { t: "MDN: Dealing with files", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files" },
            { t: "Microsoft Learn: New-Item", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-item" },
          ],
          pre: [
            "css/View Source و validator",
            { to: "css/img", why: R`الـ [[alt]] و [[width]] و [[height]] اللي على الصورة مشروحين هناك` },
            { to: "git/git init / clone", why: R`الخطوة اللي بعد الوحدة دي، لما تحب تحفظ نسخ من المشروع وترفعه` },
          ]
        },
      ]
    },
]);
