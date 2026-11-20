// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "HTML: اللينكات والعناوين",
      l: 1,
      n: "العناوين بتعمل فهرس الصفحة، واللينكات بتربط الصفحات ببعض: من غير الاتنين مفيش موقع",
      pre: [
        { to: "css/a و button", why: R`الوحدة دي بتكمّل عليه: هناك عرفت إن [[<a href>]] بيودّيك مكان، وهنا هتعرف كل الأماكن وكل الـ attributes` },
        { to: "css/semantic HTML", why: R`العناوين والـ [[<nav>]] والـ [[<main>]] وشجرة الـ accessibility اتشرحوا هناك` }
      ],
      goal: [
        R`ترتّب عناوين أي صفحة من [[<h1>]] لـ [[<h6>]] كفهرس: [[<h1>]] واحد ومن غير نطّ مستويات، وتستخدم [[<hgroup>]] لعنوان معاه سطر تعريفي.`,
        R`تكتب المسار الصح لأي ملف من أي ملف: URL كامل، أو من جذر الموقع ([[/]])، أو نسبي للملف ([[./]] و [[../]])، وتعرف مين فيهم بيبوظ إمتى.`,
        R`تعمل تنقل جوه الصفحة بـ [[#id]] (فهرس، ورجوع لفوق، ولينك تخطّي)، ولينكات إيميل وتليفون بـ [[mailto:]] و [[tel:]].`,
        R`تقرر إمتى اللينك يفتح تاب جديدة، وتفهم [[rel]] بكل قيمه: مين بيغيّر سلوك المتصفح ([[noopener]] و [[noreferrer]] و [[opener]]) ومين معلومة للأدوات بس.`,
        R`تكتب نص لينك مفهوم لوحده، ولينك حوالين كارت، ولينك تحميل بـ [[download]]، وتحط البحث جوه [[<search>]].`,
        R`تبني موقع من كذا صفحة في فولدرات، كل لينكاته شغالة بدبل كليك ومن سيرفر وبعد نقل الفولدر.`
      ],
      projects: [
        { lvl: 'صغير', dir: "ride-guide", t: R`دليل العناية بالعجلة (صفحة واحدة بفهرس)`, what: R`صفحة واحدة لـ «نادي العجلة» (نادي متخيل) بـ HTML بس، بيقراها عضو جديد عايز يعرف يعتني بعجلته. فيها: العنوان الرئيسي ومعاه سطر تعريفي جوه [[<hgroup>]]، وفهرس محتويات مرقّم من مستويين جوه [[<nav>]] وكل بند فيه لينك [[#id]]، وتلات أقسام ([[<h2>]]) تحت اتنين منهم أقسام فرعية ([[<h3>]])، ولينك «روح للمحتوى» أول حاجة في الصفحة، ولينك «ارجع لأول الصفحة» في آخرها. من دروس «h1 لحد h6» و «#id و mailto و tel»، وشكل الفهرس من درس «قوايم جوه قوايم».`, done: R`فيها [[<h1>]] واحد، والعناوين نازلة من غير نطّ (h1 ثم h2 ثم h3)، وشكل الفهرس مطابق لترتيب العناوين، وكل لينك في الفهرس بينزّلك لعنوانه، وأول Tab بيقف على «روح للمحتوى»، ومفيش [[id]] متكرر.`, sol: R`~~~live 480 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دليل العناية بالعجلة | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <hgroup>
    <h1>دليل العناية بالعجلة</h1>
    <p>كل اللي عجلتك محتاجاه في ٢٠ دقيقة كل أسبوع</p>
  </hgroup>
  <nav aria-label="في الصفحة دي">
    <ol>
      <li><a href="#clean">التنضيف</a>
        <ol>
          <li><a href="#clean-frame">الجسم</a></li>
          <li><a href="#clean-chain">الجنزير</a></li>
        </ol>
      </li>
      <li><a href="#air">الهوا والكاوتش</a></li>
      <li><a href="#brakes">الفرامل</a>
        <ol>
          <li><a href="#brakes-pads">تيل الفرامل</a></li>
        </ol>
      </li>
    </ol>
  </nav>
</header>
<main id="main">
  <h2 id="clean">التنضيف</h2>
  <p>العجلة النضيفة بتعيش أكتر، والتراب أول عدو للجنزير.</p>
  <h3 id="clean-frame">الجسم</h3>
  <p>امسحه بفوطة مبلولة وصابون خفيف، ومتستخدمش خرطوم ضغطه عالي.</p>
  <h3 id="clean-chain">الجنزير</h3>
  <p>امسحه بفوطة ناشفة، وحط نقطة زيت على كل حلقة، وامسح الزيادة.</p>
  <h2 id="air">الهوا والكاوتش</h2>
  <p>اضغط على الكاوتش بصباعك قبل كل مشوار: لو بيغطس، انفخه.</p>
  <h2 id="brakes">الفرامل</h2>
  <p>اقفش الفرامل وزق العجلة: لو اتحركت، الفرامل محتاجة تتشد.</p>
  <h3 id="brakes-pads">تيل الفرامل</h3>
  <p>لو الخطوط اللي على التيل اختفت، غيّره.</p>
  <p><a href="#top">ارجع لأول الصفحة</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
</footer>
</body>
</html>
~~~

**ترتيب البناء:**

1. اكتب العناوين لوحدها الأول، من غير ولا فقرة: [[<h1>]] ثم [[<h2>]] ثم [[<h3>]]. لو قريتهم ورا بعض وطلعوا فهرس مفهوم، الهيكل صح (درس «h1 لحد h6»).
2. حط [[id]] على كل عنوان: كلمة إنجليزي صغيرة بشرطة ([[clean-chain]])، والقسم الفرعي بياخد اسم أبوه في الأول عشان الأسامي متتكررش.
3. الفهرس: [[<ol>]] جوه [[<nav>]]، والأقسام الفرعية [[<ol>]] تانية **جوه** الـ [[<li>]] بتاع أبوها. كل [[href]] هو [[#]] وبعده نفس الـ [[id]] بالحرف.
4. [[<hgroup>]] حوالين الـ [[<h1>]] والسطر اللي تحته: السطر ده تعريف بالعنوان مش عنوان تاني، فهو [[<p>]] مش [[<h2>]].
5. لينك «روح للمحتوى» أول عنصر في [[<body>]] وبيشاور على [[id="main"]] اللي على [[<main>]]، ولينك [[#top]] في الآخر.

**ليه [[#top]] من غير عنصر عليه [[id="top"]]:** المتصفح بيفهم [[#top]] لوحده إنه أول الصفحة (اتقاس في درس «#id و mailto و tel»).

**الغلطة الشائعة:** تكتب الفهرس الأول وتنسى تحدّثه لما تغيّر عنوان أو [[id]]. اللينك اللي الـ [[id]] بتاعه مش موجود مبيطلّعش أي خطأ: بتدوس ومبيحصلش حاجة. فبعد أي تعديل دوس على كل بند في الفهرس.

~~~text الناتج
index.html
  العناوين: h1 h2 h3 h3 h2 h2 h3   (h1 = 1، من غير نطّ)
  اللينكات: 8 = 0 لصفحات تانية + 8 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "في الصفحة دي" ، main ، contentinfo
لينك بيشاور على id مش موجود: 0      id متكرر: 0      صفحات فيها scroll أفقي على 360: 0
~~~` },
        { lvl: 'صغير', dir: "club-contact", t: R`صفحة التواصل وملف القواعد`, what: R`زي المشروع اللي فات (عناوين مترتبة و [[id]] على كل قسم)، وزوّد عليه اللينكات اللي بتطلّعك برّه الصفحة. ملفين في نفس الفولدر لنفس النادي. [[index.html]] فيها: «كلّمنا» (إيميل بـ [[mailto:]] وعنوان الرسالة جاهز، وتليفون بـ [[tel:]])، و «تابعنا» (لينك خارجي بيفتح تاب جديدة ومكتوب في نصه كده، ولينك لمتجر عليه [[rel="external nofollow"]])، و «ملفات» (لينك يفتح [[rules.html]] ولينك ينزّلها بـ [[download]]). و [[rules.html]] فيها قواعد النادي في تلات أقسام ولينك رجوع. من دروس «#id و mailto و tel» و «target و rel» و «download و نص اللينك».`, done: R`كل لينك نصه بيقول هيوديك فين من غير ما تقرا اللي حواليه، واللينك اللي بيفتح تاب جديدة مكتوب عليه كده وعليه [[rel="noopener noreferrer"]]، ورقم التليفون في الـ [[href]] دولي ومن غير مسافات، وعنوان الإيميل ظاهر في نص اللينك، ولينك التحميل بينزّل ملف اسمه [[club-rules.html]] (جرّبه من سيرفر محلي: من [[file:///]] المتصفح بيفتح الملف بدل ما ينزّله)، ولينك الرجوع في [[rules.html]] بيرجّعك.`, sol: R`~~~text شجرة الملفات
club-contact/
├── index.html
└── rules.html
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تواصل | نادي العجلة</title>
</head>
<body>
<main>
  <h1>تواصل مع نادي العجلة</h1>
  <p>بنرد على الرسايل في نفس اليوم، من ٩ الصبح لـ ٦ بالليل.</p>
  <h2 id="call">كلّمنا</h2>
  <ul>
    <li><a href="mailto:info@example.test?subject=%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%AC%D8%AF%D9%8A%D8%AF">ابعت إيميل اشتراك لـ info@example.test</a></li>
    <li><a href="tel:+201000000000">اتصل على <bdi dir="ltr">+20 100 000 0000</bdi></a></li>
  </ul>
  <h2 id="follow">تابعنا</h2>
  <ul>
    <li><a href="https://example.test/club-videos" target="_blank" rel="noopener noreferrer external">فيديوهات رحلات النادي (بتفتح في تاب جديدة)</a></li>
    <li><a href="https://example.test/bike-shop" rel="external nofollow">متجر العجل اللي بنتعامل معاه</a></li>
  </ul>
  <h2 id="files">ملفات</h2>
  <ul>
    <li><a href="rules.html">اقرا قواعد النادي</a></li>
    <li><a href="rules.html" download="club-rules.html">حمّل قواعد النادي (HTML، أقل من ١ كيلوبايت)</a></li>
  </ul>
</main>
</body>
</html>
~~~

~~~html rules.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قواعد النادي | نادي العجلة</title>
</head>
<body>
<main>
  <h1>قواعد نادي العجلة</h1>
  <h2 id="terms">شروط الاشتراك</h2>
  <ol>
    <li>الخوذة إجبارية في كل الرحلات.</li>
    <li>الاشتراك شهري، وبيتجدد أول كل شهر.</li>
    <li>الرحلة بتتحرك في ميعادها ومبتستناش حد.</li>
  </ol>
  <h2 id="privacy">بياناتك عندنا</h2>
  <p>بنحتفظ باسمك ورقم موبايلك بس، ومبنديهمش لحد.</p>
  <h2 id="license">حقوق المحتوى</h2>
  <p>مقالات الموقع تقدر تنقلها بشرط تذكر اسم النادي.</p>
  <p><a href="index.html">ارجع لصفحة التواصل</a></p>
</main>
</body>
</html>
~~~

~~~view 422 index.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تواصل | نادي العجلة</title>
</head>
<body>
<main>
  <h1>تواصل مع نادي العجلة</h1>
  <p>بنرد على الرسايل في نفس اليوم، من ٩ الصبح لـ ٦ بالليل.</p>
  <h2 id="call">كلّمنا</h2>
  <ul>
    <li><a href="mailto:info@example.test?subject=%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%AC%D8%AF%D9%8A%D8%AF">ابعت إيميل اشتراك لـ info@example.test</a></li>
    <li><a href="tel:+201000000000">اتصل على <bdi dir="ltr">+20 100 000 0000</bdi></a></li>
  </ul>
  <h2 id="follow">تابعنا</h2>
  <ul>
    <li><a href="#" rel="noopener noreferrer external">فيديوهات رحلات النادي (بتفتح في تاب جديدة)</a></li>
    <li><a href="#" rel="external nofollow">متجر العجل اللي بنتعامل معاه</a></li>
  </ul>
  <h2 id="files">ملفات</h2>
  <ul>
    <li><a href="#">اقرا قواعد النادي</a></li>
    <li><a href="#">حمّل قواعد النادي (HTML، أقل من ١ كيلوبايت)</a></li>
  </ul>
</main>
</body>
</html>
~~~

> المعاينة صندوق معزول فيه صفحة واحدة، فاللينكات اللي بتروح لملف تاني أو موقع تاني متعطّلة فيها. الكود اللي فوق هو اللي بيتكتب في الملفات، وفيه المسارات الحقيقية.

**كل لينك اتكتب ليه كده:**

- **الإيميل:** [[mailto:]] وبعده العنوان، وبعد [[?subject=]] عنوان الرسالة «اشتراك جديد» متشفّر (المسافة [[%20]] والحروف العربي بالـ [[%]])، من درس «#id و mailto و tel». ونص اللينك فيه العنوان نفسه، عشان اللي معندوش برنامج إيميل ينسخه.
- **التليفون:** في الـ [[href]] الرقم دولي ومن غير مسافات ([[+201000000000]])، وفي النص مكتوب بمسافات جوه [[<bdi dir="ltr">]] عشان يتقري صح وسط العربي (درس «lang و dir»).
- **الفيديوهات:** [[target="_blank"]] لأن الزائر غالبًا هيرجع يكمّل قراية، والنص بيقول «بتفتح في تاب جديدة»، و [[rel="noopener noreferrer"]] بيقفل [[window.opener]] وميبعتش الـ Referer، و [[external]] بيقول إنه موقع تاني.
- **المتجر:** في نفس التاب (الافتراضي)، و [[nofollow]] معناها «اللينك ده مش تزكية مننا».
- **القواعد:** لينكين لنفس الملف: واحد بيفتحه، وواحد بـ [[download="club-rules.html"]] بينزّله بالاسم ده. ونص التاني فيه النوع والحجم.

**ليه [[rules.html]] مسارها اسم الملف بس:** الملفين في نفس الفولدر، فالمسار النسبي هو الاسم (درس «المسارات: مطلق ونسبي»).

**الغلطة الشائعة:** نص لينك زي «اضغط هنا» أو «من هنا». قارئ الشاشة بيعرض اللينكات كقايمة لوحدها، فلو كلهم «اضغط هنا» محدش هيعرف مين بيودّي فين.

~~~text الناتج
index.html
  العناوين: h1 h2 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 6 = 2 لصفحات تانية + 0 جوه الصفحة + 2 خارجي + 2 mailto و tel
  landmarks: main
rules.html
  العناوين: h1 h2 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 1 = 1 لصفحات تانية + 0 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: main

لينكات لصفحات تانية في الموقع: 3
  اتفتحت من http://127.0.0.1:8125 : 3 من 3
  اتفتحت من file:/// : 3 من 3
  بعد نقل الفولدر كله لمكان تاني (file:///) : 3 من 3
  مسارات بتبدأ بـ / : 0
لينك بيشاور على id مش موجود: 0      id متكرر: 0      صفحات فيها scroll أفقي على 360: 0
لينك التحميل من http://127.0.0.1:8125 : اتنزّل ملف اسمه club-rules.html والصفحة فضلت مكانها
أسامي اللينكات في شجرة الـ accessibility (index.html):
  link "ابعت إيميل اشتراك لـ info@example.test"
  link "اتصل على +20 100 000 0000"
  link "فيديوهات رحلات النادي (بتفتح في تاب جديدة)"
  link "متجر العجل اللي بنتعامل معاه"
  link "اقرا قواعد النادي"
  link "حمّل قواعد النادي (HTML، أقل من ١ كيلوبايت)"
~~~` },
        { lvl: 'متوسط', dir: "club-pages", t: R`موقع من ٤ صفحات في فولدر واحد`, what: R`خد صفحة الدليل (المشروع الأول) وصفحتي التواصل والقواعد (التاني) زي ما هم وحطهم في فولدر واحد، وزوّد عليهم حاجتين: رئيسية [[index.html]]، و [[<header>]] واحد في أول كل صفحة فيه اسم النادي لينك للرئيسية و [[<nav>]] جواه قايمة بالصفحات، والصفحة الحالية عليها [[aria-current="page"]]. الرئيسية فيها: عنوان بسطر تعريفي، و «ابدأ من هنا» (٣ لينكات: للدليل، ولقسم الجنزير جوه الدليل [[guide.html#clean-chain]]، ولقسم «كلّمنا» في التواصل)، و «رحلات الشهر» قايمة مرقّمة. كل المسارات نسبية للملف، من درس «المسارات: مطلق ونسبي». صفحة الدليل اسمها هنا [[guide.html]] وصفحة التواصل [[contact.html]].`, done: R`من أي صفحة توصل لأي صفحة تانية بضغطة واحدة، ولينك [[guide.html#clean-chain]] بيفتح الدليل ونازل على قسم الجنزير، وفي كل صفحة لينك واحد بس عليه [[aria-current="page"]] (وصفحة القواعد مفيهاش لأنها مش في القايمة)، ومفيش ولا مسار بيبدأ بـ [[/]] أو بـ [[C:]]، والموقع بيشتغل لما تفتح [[index.html]] بدبل كليك ولما تنقل الفولدر كله لمكان تاني.`, sol: R`~~~text شجرة الملفات
club-pages/
├── contact.html
├── guide.html
├── index.html
└── rules.html
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html" aria-current="page">الرئيسية</a></li>
      <li><a href="guide.html">دليل العناية</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <hgroup>
    <h1>نادي العجلة</h1>
    <p>رحلة كل جمعة، ومكان لكل المستويات</p>
  </hgroup>
  <h2 id="start">ابدأ من هنا</h2>
  <ul>
    <li><a href="guide.html">اقرا دليل العناية بالعجلة</a></li>
    <li><a href="guide.html#clean-chain">اتعلّم تنضيف الجنزير</a></li>
    <li><a href="contact.html#call">اشترك في النادي بالتليفون أو الإيميل</a></li>
  </ul>
  <h2 id="rides">رحلات الشهر</h2>
  <ol>
    <li>الجمعة ٦ مارس: حوالين البحيرة، ٢٤ كيلو.</li>
    <li>الجمعة ١٣ مارس: الكورنيش بالليل، ١٥ كيلو.</li>
    <li>الجمعة ٢٠ مارس: طريق المزارع، ٤٠ كيلو.</li>
  </ol>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
</footer>
</body>
</html>
~~~

~~~html guide.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دليل العناية بالعجلة | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="guide.html" aria-current="page">دليل العناية</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <hgroup>
    <h1>دليل العناية بالعجلة</h1>
    <p>كل اللي عجلتك محتاجاه في ٢٠ دقيقة كل أسبوع</p>
  </hgroup>
  <nav aria-label="في الصفحة دي">
    <ol>
      <li><a href="#clean">التنضيف</a>
        <ol>
          <li><a href="#clean-frame">الجسم</a></li>
          <li><a href="#clean-chain">الجنزير</a></li>
        </ol>
      </li>
      <li><a href="#air">الهوا والكاوتش</a></li>
      <li><a href="#brakes">الفرامل</a>
        <ol>
          <li><a href="#brakes-pads">تيل الفرامل</a></li>
        </ol>
      </li>
    </ol>
  </nav>
  <h2 id="clean">التنضيف</h2>
  <p>العجلة النضيفة بتعيش أكتر، والتراب أول عدو للجنزير.</p>
  <h3 id="clean-frame">الجسم</h3>
  <p>امسحه بفوطة مبلولة وصابون خفيف، ومتستخدمش خرطوم ضغطه عالي.</p>
  <h3 id="clean-chain">الجنزير</h3>
  <p>امسحه بفوطة ناشفة، وحط نقطة زيت على كل حلقة، وامسح الزيادة.</p>
  <h2 id="air">الهوا والكاوتش</h2>
  <p>اضغط على الكاوتش بصباعك قبل كل مشوار: لو بيغطس، انفخه.</p>
  <h2 id="brakes">الفرامل</h2>
  <p>اقفش الفرامل وزق العجلة: لو اتحركت، الفرامل محتاجة تتشد.</p>
  <h3 id="brakes-pads">تيل الفرامل</h3>
  <p>لو الخطوط اللي على التيل اختفت، غيّره.</p>
  <p><a href="#top">ارجع لأول الصفحة</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
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
<title>تواصل | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="guide.html">دليل العناية</a></li>
      <li><a href="contact.html" aria-current="page">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <h1>تواصل مع نادي العجلة</h1>
  <p>بنرد على الرسايل في نفس اليوم، من ٩ الصبح لـ ٦ بالليل.</p>
  <h2 id="call">كلّمنا</h2>
  <ul>
    <li><a href="mailto:info@example.test?subject=%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%AC%D8%AF%D9%8A%D8%AF">ابعت إيميل اشتراك لـ info@example.test</a></li>
    <li><a href="tel:+201000000000">اتصل على <bdi dir="ltr">+20 100 000 0000</bdi></a></li>
  </ul>
  <h2 id="follow">تابعنا</h2>
  <ul>
    <li><a href="https://example.test/club-videos" target="_blank" rel="noopener noreferrer external">فيديوهات رحلات النادي (بتفتح في تاب جديدة)</a></li>
    <li><a href="https://example.test/bike-shop" rel="external nofollow">متجر العجل اللي بنتعامل معاه</a></li>
  </ul>
  <h2 id="files">ملفات</h2>
  <ul>
    <li><a href="rules.html">اقرا قواعد النادي</a></li>
    <li><a href="rules.html" download="club-rules.html">حمّل قواعد النادي (HTML، أقل من ١ كيلوبايت)</a></li>
  </ul>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
</footer>
</body>
</html>
~~~

~~~html rules.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قواعد النادي | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="guide.html">دليل العناية</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <h1>قواعد نادي العجلة</h1>
  <h2 id="terms">شروط الاشتراك</h2>
  <ol>
    <li>الخوذة إجبارية في كل الرحلات.</li>
    <li>الاشتراك شهري، وبيتجدد أول كل شهر.</li>
    <li>الرحلة بتتحرك في ميعادها ومبتستناش حد.</li>
  </ol>
  <h2 id="privacy">بياناتك عندنا</h2>
  <p>بنحتفظ باسمك ورقم موبايلك بس، ومبنديهمش لحد.</p>
  <h2 id="license">حقوق المحتوى</h2>
  <p>مقالات الموقع تقدر تنقلها بشرط تذكر اسم النادي.</p>
  <p><a href="contact.html">ارجع لصفحة التواصل</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
</footer>
</body>
</html>
~~~

~~~view 480 index.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="#">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="#" aria-current="page">الرئيسية</a></li>
      <li><a href="#">دليل العناية</a></li>
      <li><a href="#">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <hgroup>
    <h1>نادي العجلة</h1>
    <p>رحلة كل جمعة، ومكان لكل المستويات</p>
  </hgroup>
  <h2 id="start">ابدأ من هنا</h2>
  <ul>
    <li><a href="#">اقرا دليل العناية بالعجلة</a></li>
    <li><a href="#">اتعلّم تنضيف الجنزير</a></li>
    <li><a href="#">اشترك في النادي بالتليفون أو الإيميل</a></li>
  </ul>
  <h2 id="rides">رحلات الشهر</h2>
  <ol>
    <li>الجمعة ٦ مارس: حوالين البحيرة، ٢٤ كيلو.</li>
    <li>الجمعة ١٣ مارس: الكورنيش بالليل، ١٥ كيلو.</li>
    <li>الجمعة ٢٠ مارس: طريق المزارع، ٤٠ كيلو.</li>
  </ol>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
</footer>
</body>
</html>
~~~

> في المعاينة اللينكات اللي بتروح لصفحة تانية متعطّلة (صندوق معزول فيه صفحة واحدة). في ملفاتك الحقيقية كل لينك بيفتح صفحته.

**ترتيب البناء:**

1. انسخ [[index.html]] بتاعة المشروع الأول باسم [[guide.html]]، و [[index.html]] بتاعة التاني باسم [[contact.html]]، و [[rules.html]] زي ما هي.
2. اكتب الـ [[<header>]] مرة واحدة والصقه في الأربع صفحات، وغيّر مكان [[aria-current="page"]] بس.
3. في [[guide.html]]: العنوان والفهرس اتنقلوا من الـ [[<header>]] القديم لأول [[<main>]]، لأن الـ [[<header>]] بقى بتاع الموقع كله.
4. اكتب الرئيسية.
5. في [[rules.html]] غيّر لينك الرجوع من [[index.html]] لـ [[contact.html]]: صفحة التواصل اسمها اتغيّر.

**الخطوة ٥ هي درس المشروع:** لما تغيّر اسم ملف أو مكانه، كل لينك بيشاور عليه لازم يتغيّر، ومفيش حاجة هتنبّهك. دوّر في VS Code بـ [[Ctrl+Shift+F]] على الاسم القديم.

**ليه [[aria-current="page"]]:** قارئ الشاشة بيقول «الصفحة الحالية» على اللينك ده، وفي وحدة الـ CSS هتلوّنه بيه. واللينك بيفضل لينك (مبنشيلش الـ [[href]]).

**ليه مفيش [[/]] في أول المسارات:** [[/guide.html]] معناها «من جذر الموقع». لما تفتح الملف بدبل كليك الجذر بيبقى القرص نفسه ([[file:///C:/guide.html]])، ولما الموقع يترفع جوه فولدر الجذر بيبقى فوق فولدرك. [[guide.html]] من غير [[/]] بتتحسب من مكان الصفحة، فبتشتغل في كل الحالات.

**الغلطة الشائعة:** تنسخ الـ [[<header>]] وتسيب [[aria-current]] على «الرئيسية» في كل الصفحات.

~~~text الناتج
index.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 8 = 7 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، contentinfo
guide.html
  العناوين: h1 h2 h3 h3 h2 h2 h3   (h1 = 1، من غير نطّ)
  اللينكات: 12 = 4 لصفحات تانية + 8 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، navigation "في الصفحة دي" ، contentinfo
contact.html
  العناوين: h1 h2 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 11 = 6 لصفحات تانية + 1 جوه الصفحة + 2 خارجي + 2 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، contentinfo
rules.html
  العناوين: h1 h2 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 6 = 5 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، contentinfo

لينكات لصفحات تانية في الموقع: 22
  اتفتحت من http://127.0.0.1:8125 : 22 من 22
  اتفتحت من file:/// : 22 من 22
  بعد نقل الفولدر كله لمكان تاني (file:///) : 22 من 22
  مسارات بتبدأ بـ / : 0
لينك بيشاور على id مش موجود: 0      id متكرر: 0      صفحات فيها scroll أفقي على 360: 0
~~~` },
        { lvl: 'متوسط', dir: "club-blog", t: R`مدونة النادي: فولدر جوه فولدر`, what: R`زي اللي فات (صفحات بتشاور على بعض بمسارات نسبية)، وزوّد عليه إن الصفحات مش في نفس الفولدر، فهتحتاج [[../]]. مدونة «نادي العجلة»: [[index.html]] فيها فورم بحث جوه [[<search>]]، و «أحدث المقالات» قايمة كل عنصر فيها كارت كله لينك ([[<a>]] حوالين [[<h3>]] وفقرة)، وقسم «مين بيكتب». وفولدر [[posts]] فيه مقالين، وكل مقال فيه: مسار الصفحة (breadcrumb) [[<ol>]] جوه [[<nav>]]، و [[<article>]] فيه العنوان واسم الكاتبة ([[rel="author"]]) والتاريخ ([[<time>]]) وقسمين، وفوتر فيه الموضوع ([[rel="tag"]]) والرابط الدايم ([[rel="bookmark"]])، وتحته لينك للمقال التاني ([[rel="next"]] في الأول و [[rel="prev"]] في التاني). من دروس «المسارات: مطلق ونسبي» و «target و rel» و «download و نص اللينك» و «search».`, done: R`من الفهرس بتفتح المقالين، ومن كل مقال بترجع للفهرس بـ [[../index.html]] وبتروح للمقال التاني باسم الملف بس، ولينك الكاتبة بيفتح الفهرس ونازل على «مين بيكتب»، وكل كارت اسمه في شجرة الـ accessibility عنوانه ووصفه مع بعض، وفورم البحث لما تكتب فيه «خوذة» وتبعته الـ URL بيبقى آخره [[?q=]] وبعدها الكلمة، ومفيش مسار بيبدأ بـ [[/]].`, sol: R`~~~text شجرة الملفات
club-blog/
├── posts/
│   ├── first-ride.html
│   └── night-ride.html
└── index.html
~~~

خطوات «ابدأ إزاي» بتعمل [[index.html]] بس. الفولدر [[posts]] وملفاته اعملهم بعدها وانت جوه [[club-blog]]:

~~~powershell
mkdir posts
ni posts/first-ride.html, posts/night-ride.html
~~~

~~~bash
mkdir posts
touch posts/first-ride.html posts/night-ride.html
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدونة نادي العجلة</title>
</head>
<body>
<main>
  <h1>مدونة نادي العجلة</h1>
  <search>
    <form action="index.html">
      <label for="q">دوّر في المقالات</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
  <h2 id="latest">أحدث المقالات</h2>
  <ul>
    <li>
      <a href="posts/night-ride.html">
        <h3>رحلة بالليل على الكورنيش</h3>
        <p>١٥ كيلو بعد المغرب، ولازم كشّاف قدام وورا.</p>
      </a>
    </li>
    <li>
      <a href="posts/first-ride.html">
        <h3>أول رحلة للنادي</h3>
        <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
      </a>
    </li>
  </ul>
  <h2 id="authors">مين بيكتب</h2>
  <p>سلمى فؤاد: مشرفة رحلات المبتدئين في النادي.</p>
</main>
</body>
</html>
~~~

~~~html posts/first-ride.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أول رحلة للنادي | مدونة نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<nav aria-label="مسار الصفحة">
  <ol>
    <li><a href="../index.html">المدونة</a></li>
    <li><a href="first-ride.html" aria-current="page">أول رحلة للنادي</a></li>
  </ol>
</nav>
<main id="main">
  <article>
    <h1>أول رحلة للنادي</h1>
    <p>كتبتها <a href="../index.html#authors" rel="author">سلمى فؤاد</a> يوم <time datetime="2026-03-06">٦ مارس ٢٠٢٦</time>.</p>
    <h2 id="route">المسار</h2>
    <p>اتحركنا ٧ الصبح من بوابة النادي، ولفّينا حوالين البحيرة ٢٤ كيلو في ساعتين.</p>
    <h2 id="lessons">اللي اتعلمناه</h2>
    <ul>
      <li>المية أهم من السرعة: كل واحد معاه إزازتين.</li>
      <li>اللي في الآخر هو اللي بيحدد سرعة المجموعة.</li>
    </ul>
    <footer>
      <p>الموضوع: <a href="../index.html?tag=beginners" rel="tag">للمبتدئين</a></p>
      <p><a href="first-ride.html" rel="bookmark">الرابط الدايم للمقال</a></p>
    </footer>
  </article>
  <nav aria-label="مقالات تانية">
    <ul>
      <li><a href="night-ride.html" rel="next">المقال اللي بعده: رحلة بالليل على الكورنيش</a></li>
    </ul>
  </nav>
</main>
</body>
</html>
~~~

~~~html posts/night-ride.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلة بالليل على الكورنيش | مدونة نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<nav aria-label="مسار الصفحة">
  <ol>
    <li><a href="../index.html">المدونة</a></li>
    <li><a href="night-ride.html" aria-current="page">رحلة بالليل على الكورنيش</a></li>
  </ol>
</nav>
<main id="main">
  <article>
    <h1>رحلة بالليل على الكورنيش</h1>
    <p>كتبتها <a href="../index.html#authors" rel="author">سلمى فؤاد</a> يوم <time datetime="2026-03-13">١٣ مارس ٢٠٢٦</time>.</p>
    <h2 id="route">المسار</h2>
    <p>اتحركنا بعد المغرب ومشينا الكورنيش رايح جاي، ١٥ كيلو على مهلنا.</p>
    <h2 id="lessons">اللي اتعلمناه</h2>
    <ul>
      <li>كشّاف أبيض قدام وأحمر ورا، من غيرهم مفيش رحلة.</li>
      <li>اللبس الفاتح بيتشاف من بعيد.</li>
    </ul>
    <footer>
      <p>الموضوع: <a href="../index.html?tag=night" rel="tag">رحلات الليل</a></p>
      <p><a href="night-ride.html" rel="bookmark">الرابط الدايم للمقال</a></p>
    </footer>
  </article>
  <nav aria-label="مقالات تانية">
    <ul>
      <li><a href="first-ride.html" rel="prev">المقال اللي قبله: أول رحلة للنادي</a></li>
    </ul>
  </nav>
</main>
</body>
</html>
~~~

~~~view 405 index.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدونة نادي العجلة</title>
</head>
<body>
<main>
  <h1>مدونة نادي العجلة</h1>
  <search>
    <form onsubmit="return false" action="index.html">
      <label for="q">دوّر في المقالات</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
  <h2 id="latest">أحدث المقالات</h2>
  <ul>
    <li>
      <a href="#">
        <h3>رحلة بالليل على الكورنيش</h3>
        <p>١٥ كيلو بعد المغرب، ولازم كشّاف قدام وورا.</p>
      </a>
    </li>
    <li>
      <a href="#">
        <h3>أول رحلة للنادي</h3>
        <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
      </a>
    </li>
  </ul>
  <h2 id="authors">مين بيكتب</h2>
  <p>سلمى فؤاد: مشرفة رحلات المبتدئين في النادي.</p>
</main>
</body>
</html>
~~~

~~~view 480 posts/first-ride.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أول رحلة للنادي | مدونة نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<nav aria-label="مسار الصفحة">
  <ol>
    <li><a href="#">المدونة</a></li>
    <li><a href="#" aria-current="page">أول رحلة للنادي</a></li>
  </ol>
</nav>
<main id="main">
  <article>
    <h1>أول رحلة للنادي</h1>
    <p>كتبتها <a href="#" rel="author">سلمى فؤاد</a> يوم <time datetime="2026-03-06">٦ مارس ٢٠٢٦</time>.</p>
    <h2 id="route">المسار</h2>
    <p>اتحركنا ٧ الصبح من بوابة النادي، ولفّينا حوالين البحيرة ٢٤ كيلو في ساعتين.</p>
    <h2 id="lessons">اللي اتعلمناه</h2>
    <ul>
      <li>المية أهم من السرعة: كل واحد معاه إزازتين.</li>
      <li>اللي في الآخر هو اللي بيحدد سرعة المجموعة.</li>
    </ul>
    <footer>
      <p>الموضوع: <a href="#" rel="tag">للمبتدئين</a></p>
      <p><a href="#" rel="bookmark">الرابط الدايم للمقال</a></p>
    </footer>
  </article>
  <nav aria-label="مقالات تانية">
    <ul>
      <li><a href="#" rel="next">المقال اللي بعده: رحلة بالليل على الكورنيش</a></li>
    </ul>
  </nav>
</main>
</body>
</html>
~~~

> في المعاينتين اللينكات اللي بتروح لصفحة تانية والفورم متعطّلين (صندوق معزول). في ملفاتك الحقيقية بيشتغلوا.

**المسارات، وده قلب المشروع:**

| انت في | رايح لـ | المسار | ليه |
|---|---|---|---|
| [[index.html]] | مقال | [[posts/first-ride.html]] | انزل فولدر [[posts]] |
| [[posts/first-ride.html]] | الفهرس | [[../index.html]] | اطلع فولدر واحد |
| [[posts/first-ride.html]] | المقال التاني | [[night-ride.html]] | نفس الفولدر: الاسم بس |
| [[posts/first-ride.html]] | قسم في الفهرس | [[../index.html#authors]] | اطلع، وبعدين الـ [[id]] |
| [[posts/first-ride.html]] | الفهرس ومعاه query | [[../index.html?tag=beginners]] | الصفحة الثابتة بتتجاهل اللي بعد [[?]] وتفتح عادي |

**قيم [[rel]] على المقال:** [[author]] لينك لمعلومات عن كاتبة أقرب [[<article>]]، و [[tag]] موضوع الصفحة دي، و [[bookmark]] الرابط الدايم لأقرب [[<article>]]، و [[next]] و [[prev]] إن المقالين سلسلة. ولا واحدة فيهم بتغيّر شكل اللينك أو سلوكه في المتصفح: دي معلومات لمحركات البحث والأدوات (درس «target و rel»).

**الكارت:** [[<a>]] حوالين [[<h3>]] وفقرة مسموح، بشرط ميبقاش جواه لينك تاني ولا زرار. اسم اللينك بقى العنوان والوصف مع بعض.

**فورم البحث:** [[<search>]] بيعمل landmark اسمه search، والفورم [[action="index.html"]] من غير [[method]] يعني GET، فالكلمة بتروح في الـ URL: [[index.html?q=خوذة]]. الصفحة ثابتة فمش هتفلتر حاجة: الفلترة محتاجة JavaScript أو سيرفر، وده في كورسات جاية. الهيكل هو المطلوب هنا.

**الغلطة الشائعة:** تكتب في المقال [[index.html]] عشان ترجع للفهرس. من جوه [[posts]] ده معناه [[posts/index.html]]، وهو مش موجود.

~~~text الناتج
index.html
  العناوين: h1 h2 h3 h3 h2   (h1 = 1، من غير نطّ)
  اللينكات: 2 = 2 لصفحات تانية + 0 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: main ، search
posts/first-ride.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 7 = 6 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: navigation "مسار الصفحة" ، main ، navigation "مقالات تانية"
posts/night-ride.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 7 = 6 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: navigation "مسار الصفحة" ، main ، navigation "مقالات تانية"

لينكات لصفحات تانية في الموقع: 14
  اتفتحت من http://127.0.0.1:8125 : 14 من 14
  اتفتحت من file:/// : 14 من 14
  بعد نقل الفولدر كله لمكان تاني (file:///) : 14 من 14
  مسارات بتبدأ بـ / : 0
لينك بيشاور على id مش موجود: 0      id متكرر: 0      صفحات فيها scroll أفقي على 360: 0
الكروت في شجرة الـ accessibility (index.html):
  link "رحلة بالليل على الكورنيش ١٥ كيلو بعد المغرب، ولازم كشّاف قدام وورا."
  link "أول رحلة للنادي ٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين."
بعد كتابة «خوذة» في البحث ودوسة «دوّر»: /club-blog/index.html?q=%D8%AE%D9%88%D8%B0%D8%A9
~~~` },
        { lvl: 'كبير', dir: "club-site", t: R`موقع نادي العجلة كامل (٧ صفحات في ٣ مستويات)`, what: R`اجمع المشروعين اللي فاتوا في موقع واحد: صفحات المشروع التالت ([[index.html]] و [[guide.html]] و [[contact.html]] و [[rules.html]]) في الجذر، ومدونة المشروع الرابع كلها جوه فولدر [[blog]] (فالمقالات بقت على عمق مستويين: [[blog/posts]]). وزوّد: (١) [[<header>]] واحد في السبع صفحات فيه لينك «روح للمحتوى»، واسم النادي، و [[<nav>]] بأربع صفحات، وفورم بحث جوه [[<search>]] بيبعت لـ [[blog/index.html]]؛ (٢) [[<footer>]] واحد فيه تلات لينكات لأقسام صفحة القواعد بـ [[rel="terms-of-service"]] و [[rel="privacy-policy"]] و [[rel="license"]]؛ (٣) في الرئيسية قسم «من المدونة» بكروت المقالين؛ (٤) في كل مقال مسار صفحة من تلات مستويات ولينك لقسم الفرامل في الدليل [[../../guide.html#brakes]]. كل المسارات نسبية للملف. بيجمع دروس الوحدة الستة.`, done: R`من أي صفحة توصل لأي صفحة بضغطتين بالكتير، وكل لينك جوه الموقع بيفتح سواء فتحت [[index.html]] بدبل كليك أو من سيرفر محلي أو بعد ما تنقل الفولدر كله، وكل صفحة فيها [[<h1>]] واحد وعناوين من غير نطّ ولينك واحد بالكتير عليه [[aria-current="page"]] في القايمة الرئيسية، ومفيش [[id]] متكرر ولا لينك بيشاور على [[id]] مش موجود، وشجرة الـ accessibility في كل صفحة فيها banner و navigation و search و main و contentinfo، وأسامي الملفات والفولدرات كلها حروف صغيرة من غير مسافات.`, ext: R`زوّد صفحة [[blog/tags/beginners.html]] فيها مقالات الموضوع ده وخلّي لينك [[rel="tag"]] يشاور عليها بدل الـ query (المسار من المقال هيبقى [[../tags/beginners.html]]). وزوّد نسخة إنجليزي من الرئيسية في [[en/index.html]] ولينك ليها عليه [[hreflang="en"]] و [[lang="en"]]. وبعد وحدة الـ CSS: خبّي لينك «روح للمحتوى» لحد ما ياخد focus، ولوّن لينك الصفحة الحالية عن طريق الـ attribute بتاعه [[aria-current]].`, sol: R`~~~text شجرة الملفات
club-site/
├── blog/
│   ├── posts/
│   │   ├── first-ride.html
│   │   └── night-ride.html
│   └── index.html
├── contact.html
├── guide.html
├── index.html
└── rules.html
~~~

خطوات «ابدأ إزاي» بتعمل ملفات الجذر الأربعة. الباقي اعمله بعدها وانت جوه [[club-site]]:

~~~powershell
mkdir blog/posts
ni blog/index.html, blog/posts/first-ride.html, blog/posts/night-ride.html
~~~

~~~bash
mkdir -p blog/posts
touch blog/index.html blog/posts/first-ride.html blog/posts/night-ride.html
~~~

[[mkdir blog/posts]] في PowerShell بيعمل الفولدرين مع بعض. في bash لازم [[-p]] (من parents) عشان يعمل [[blog]] الأول وبعدين [[posts]] جواه.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html" aria-current="page">الرئيسية</a></li>
      <li><a href="guide.html">دليل العناية</a></li>
      <li><a href="blog/index.html">المدونة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main id="main">
  <hgroup>
    <h1>نادي العجلة</h1>
    <p>رحلة كل جمعة، ومكان لكل المستويات</p>
  </hgroup>
  <h2 id="start">ابدأ من هنا</h2>
  <ul>
    <li><a href="guide.html">اقرا دليل العناية بالعجلة</a></li>
    <li><a href="guide.html#clean-chain">اتعلّم تنضيف الجنزير</a></li>
    <li><a href="contact.html#call">اشترك في النادي بالتليفون أو الإيميل</a></li>
  </ul>
  <h2 id="rides">رحلات الشهر</h2>
  <ol>
    <li>الجمعة ٦ مارس: حوالين البحيرة، ٢٤ كيلو.</li>
    <li>الجمعة ١٣ مارس: الكورنيش بالليل، ١٥ كيلو.</li>
    <li>الجمعة ٢٠ مارس: طريق المزارع، ٤٠ كيلو.</li>
  </ol>
  <h2 id="posts">من المدونة</h2>
  <ul>
    <li>
      <a href="blog/posts/first-ride.html">
        <h3>أول رحلة للنادي</h3>
        <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
      </a>
    </li>
    <li>
      <a href="blog/posts/night-ride.html">
        <h3>رحلة بالليل على الكورنيش</h3>
        <p>١٥ كيلو بعد المغرب، ولازم كشّاف قدام وورا.</p>
      </a>
    </li>
  </ul>
  <p><a href="blog/index.html">كل مقالات المدونة</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~html guide.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دليل العناية بالعجلة | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="guide.html" aria-current="page">دليل العناية</a></li>
      <li><a href="blog/index.html">المدونة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main id="main">
  <hgroup>
    <h1>دليل العناية بالعجلة</h1>
    <p>كل اللي عجلتك محتاجاه في ٢٠ دقيقة كل أسبوع</p>
  </hgroup>
  <nav aria-label="في الصفحة دي">
    <ol>
      <li><a href="#clean">التنضيف</a>
        <ol>
          <li><a href="#clean-frame">الجسم</a></li>
          <li><a href="#clean-chain">الجنزير</a></li>
        </ol>
      </li>
      <li><a href="#air">الهوا والكاوتش</a></li>
      <li><a href="#brakes">الفرامل</a>
        <ol>
          <li><a href="#brakes-pads">تيل الفرامل</a></li>
        </ol>
      </li>
    </ol>
  </nav>
  <h2 id="clean">التنضيف</h2>
  <p>العجلة النضيفة بتعيش أكتر، والتراب أول عدو للجنزير.</p>
  <h3 id="clean-frame">الجسم</h3>
  <p>امسحه بفوطة مبلولة وصابون خفيف، ومتستخدمش خرطوم ضغطه عالي.</p>
  <h3 id="clean-chain">الجنزير</h3>
  <p>امسحه بفوطة ناشفة، وحط نقطة زيت على كل حلقة، وامسح الزيادة.</p>
  <h2 id="air">الهوا والكاوتش</h2>
  <p>اضغط على الكاوتش بصباعك قبل كل مشوار: لو بيغطس، انفخه.</p>
  <h2 id="brakes">الفرامل</h2>
  <p>اقفش الفرامل وزق العجلة: لو اتحركت، الفرامل محتاجة تتشد.</p>
  <h3 id="brakes-pads">تيل الفرامل</h3>
  <p>لو الخطوط اللي على التيل اختفت، غيّره.</p>
  <p><a href="#top">ارجع لأول الصفحة</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
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
<title>تواصل | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="guide.html">دليل العناية</a></li>
      <li><a href="blog/index.html">المدونة</a></li>
      <li><a href="contact.html" aria-current="page">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main id="main">
  <h1>تواصل مع نادي العجلة</h1>
  <p>بنرد على الرسايل في نفس اليوم، من ٩ الصبح لـ ٦ بالليل.</p>
  <h2 id="call">كلّمنا</h2>
  <ul>
    <li><a href="mailto:info@example.test?subject=%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%AC%D8%AF%D9%8A%D8%AF">ابعت إيميل اشتراك لـ info@example.test</a></li>
    <li><a href="tel:+201000000000">اتصل على <bdi dir="ltr">+20 100 000 0000</bdi></a></li>
  </ul>
  <h2 id="follow">تابعنا</h2>
  <ul>
    <li><a href="https://example.test/club-videos" target="_blank" rel="noopener noreferrer external">فيديوهات رحلات النادي (بتفتح في تاب جديدة)</a></li>
    <li><a href="https://example.test/bike-shop" rel="external nofollow">متجر العجل اللي بنتعامل معاه</a></li>
  </ul>
  <h2 id="files">ملفات</h2>
  <ul>
    <li><a href="rules.html">اقرا قواعد النادي</a></li>
    <li><a href="rules.html" download="club-rules.html">حمّل قواعد النادي (HTML، أقل من ١ كيلوبايت)</a></li>
  </ul>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~html rules.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قواعد النادي | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html">الرئيسية</a></li>
      <li><a href="guide.html">دليل العناية</a></li>
      <li><a href="blog/index.html">المدونة</a></li>
      <li><a href="contact.html">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main id="main">
  <h1>قواعد نادي العجلة</h1>
  <h2 id="terms">شروط الاشتراك</h2>
  <ol>
    <li>الخوذة إجبارية في كل الرحلات.</li>
    <li>الاشتراك شهري، وبيتجدد أول كل شهر.</li>
    <li>الرحلة بتتحرك في ميعادها ومبتستناش حد.</li>
  </ol>
  <h2 id="privacy">بياناتك عندنا</h2>
  <p>بنحتفظ باسمك ورقم موبايلك بس، ومبنديهمش لحد.</p>
  <h2 id="license">حقوق المحتوى</h2>
  <p>مقالات الموقع تقدر تنقلها بشرط تذكر اسم النادي.</p>
  <p><a href="contact.html">ارجع لصفحة التواصل</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~html blog/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المدونة | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="../index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="../index.html">الرئيسية</a></li>
      <li><a href="../guide.html">دليل العناية</a></li>
      <li><a href="../blog/index.html" aria-current="page">المدونة</a></li>
      <li><a href="../contact.html">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="../blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main id="main">
  <h1>مدونة نادي العجلة</h1>
  <h2 id="latest">أحدث المقالات</h2>
  <ul>
    <li>
      <a href="posts/night-ride.html">
        <h3>رحلة بالليل على الكورنيش</h3>
        <p>١٥ كيلو بعد المغرب، ولازم كشّاف قدام وورا.</p>
      </a>
    </li>
    <li>
      <a href="posts/first-ride.html">
        <h3>أول رحلة للنادي</h3>
        <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
      </a>
    </li>
  </ul>
  <h2 id="authors">مين بيكتب</h2>
  <p>سلمى فؤاد: مشرفة رحلات المبتدئين في النادي.</p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="../rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="../rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="../rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~html blog/posts/first-ride.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أول رحلة للنادي | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="../../index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="../../index.html">الرئيسية</a></li>
      <li><a href="../../guide.html">دليل العناية</a></li>
      <li><a href="../../blog/index.html" aria-current="page">المدونة</a></li>
      <li><a href="../../contact.html">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="../../blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<nav aria-label="مسار الصفحة">
  <ol>
    <li><a href="../../index.html">الرئيسية</a></li>
    <li><a href="../index.html">المدونة</a></li>
    <li><a href="first-ride.html" aria-current="page">أول رحلة للنادي</a></li>
  </ol>
</nav>
<main id="main">
  <article>
    <h1>أول رحلة للنادي</h1>
    <p>كتبتها <a href="../index.html#authors" rel="author">سلمى فؤاد</a> يوم <time datetime="2026-03-06">٦ مارس ٢٠٢٦</time>.</p>
    <h2 id="route">المسار</h2>
    <p>اتحركنا ٧ الصبح من بوابة النادي، ولفّينا حوالين البحيرة ٢٤ كيلو في ساعتين.</p>
    <h2 id="lessons">اللي اتعلمناه</h2>
    <ul>
      <li>المية أهم من السرعة: كل واحد معاه إزازتين.</li>
      <li>اللي في الآخر هو اللي بيحدد سرعة المجموعة.</li>
    </ul>
    <p>قبل أي رحلة راجع <a href="../../guide.html#brakes">فحص الفرامل في دليل العناية</a>.</p>
    <footer>
      <p>الموضوع: <a href="../index.html?tag=beginners" rel="tag">للمبتدئين</a></p>
      <p><a href="first-ride.html" rel="bookmark">الرابط الدايم للمقال</a></p>
    </footer>
  </article>
  <nav aria-label="مقالات تانية">
    <ul>
      <li><a href="night-ride.html" rel="next">المقال اللي بعده: رحلة بالليل على الكورنيش</a></li>
    </ul>
  </nav>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="../../rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="../../rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="../../rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~html blog/posts/night-ride.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلة بالليل على الكورنيش | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="../../index.html">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="../../index.html">الرئيسية</a></li>
      <li><a href="../../guide.html">دليل العناية</a></li>
      <li><a href="../../blog/index.html" aria-current="page">المدونة</a></li>
      <li><a href="../../contact.html">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form action="../../blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<nav aria-label="مسار الصفحة">
  <ol>
    <li><a href="../../index.html">الرئيسية</a></li>
    <li><a href="../index.html">المدونة</a></li>
    <li><a href="night-ride.html" aria-current="page">رحلة بالليل على الكورنيش</a></li>
  </ol>
</nav>
<main id="main">
  <article>
    <h1>رحلة بالليل على الكورنيش</h1>
    <p>كتبتها <a href="../index.html#authors" rel="author">سلمى فؤاد</a> يوم <time datetime="2026-03-13">١٣ مارس ٢٠٢٦</time>.</p>
    <h2 id="route">المسار</h2>
    <p>اتحركنا بعد المغرب ومشينا الكورنيش رايح جاي، ١٥ كيلو على مهلنا.</p>
    <h2 id="lessons">اللي اتعلمناه</h2>
    <ul>
      <li>كشّاف أبيض قدام وأحمر ورا، من غيرهم مفيش رحلة.</li>
      <li>اللبس الفاتح بيتشاف من بعيد.</li>
    </ul>
    <p>قبل أي رحلة راجع <a href="../../guide.html#brakes">فحص الفرامل في دليل العناية</a>.</p>
    <footer>
      <p>الموضوع: <a href="../index.html?tag=night" rel="tag">رحلات الليل</a></p>
      <p><a href="night-ride.html" rel="bookmark">الرابط الدايم للمقال</a></p>
    </footer>
  </article>
  <nav aria-label="مقالات تانية">
    <ul>
      <li><a href="first-ride.html" rel="prev">المقال اللي قبله: أول رحلة للنادي</a></li>
    </ul>
  </nav>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="../../rules.html#terms" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="../../rules.html#privacy" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="../../rules.html#license" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~view 480 index.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="#">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="#" aria-current="page">الرئيسية</a></li>
      <li><a href="#">دليل العناية</a></li>
      <li><a href="#">المدونة</a></li>
      <li><a href="#">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form onsubmit="return false" action="blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main id="main">
  <hgroup>
    <h1>نادي العجلة</h1>
    <p>رحلة كل جمعة، ومكان لكل المستويات</p>
  </hgroup>
  <h2 id="start">ابدأ من هنا</h2>
  <ul>
    <li><a href="#">اقرا دليل العناية بالعجلة</a></li>
    <li><a href="#">اتعلّم تنضيف الجنزير</a></li>
    <li><a href="#">اشترك في النادي بالتليفون أو الإيميل</a></li>
  </ul>
  <h2 id="rides">رحلات الشهر</h2>
  <ol>
    <li>الجمعة ٦ مارس: حوالين البحيرة، ٢٤ كيلو.</li>
    <li>الجمعة ١٣ مارس: الكورنيش بالليل، ١٥ كيلو.</li>
    <li>الجمعة ٢٠ مارس: طريق المزارع، ٤٠ كيلو.</li>
  </ol>
  <h2 id="posts">من المدونة</h2>
  <ul>
    <li>
      <a href="#">
        <h3>أول رحلة للنادي</h3>
        <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
      </a>
    </li>
    <li>
      <a href="#">
        <h3>رحلة بالليل على الكورنيش</h3>
        <p>١٥ كيلو بعد المغرب، ولازم كشّاف قدام وورا.</p>
      </a>
    </li>
  </ul>
  <p><a href="#">كل مقالات المدونة</a></p>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="#" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="#" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="#" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

~~~view 480 blog/posts/first-ride.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أول رحلة للنادي | نادي العجلة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <a href="#">نادي العجلة</a>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="#">الرئيسية</a></li>
      <li><a href="#">دليل العناية</a></li>
      <li><a href="#" aria-current="page">المدونة</a></li>
      <li><a href="#">تواصل</a></li>
    </ul>
  </nav>
  <search>
    <form onsubmit="return false" action="../../blog/index.html">
      <label for="q">دوّر في المدونة</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<nav aria-label="مسار الصفحة">
  <ol>
    <li><a href="#">الرئيسية</a></li>
    <li><a href="#">المدونة</a></li>
    <li><a href="#" aria-current="page">أول رحلة للنادي</a></li>
  </ol>
</nav>
<main id="main">
  <article>
    <h1>أول رحلة للنادي</h1>
    <p>كتبتها <a href="#" rel="author">سلمى فؤاد</a> يوم <time datetime="2026-03-06">٦ مارس ٢٠٢٦</time>.</p>
    <h2 id="route">المسار</h2>
    <p>اتحركنا ٧ الصبح من بوابة النادي، ولفّينا حوالين البحيرة ٢٤ كيلو في ساعتين.</p>
    <h2 id="lessons">اللي اتعلمناه</h2>
    <ul>
      <li>المية أهم من السرعة: كل واحد معاه إزازتين.</li>
      <li>اللي في الآخر هو اللي بيحدد سرعة المجموعة.</li>
    </ul>
    <p>قبل أي رحلة راجع <a href="#">فحص الفرامل في دليل العناية</a>.</p>
    <footer>
      <p>الموضوع: <a href="#" rel="tag">للمبتدئين</a></p>
      <p><a href="#" rel="bookmark">الرابط الدايم للمقال</a></p>
    </footer>
  </article>
  <nav aria-label="مقالات تانية">
    <ul>
      <li><a href="#" rel="next">المقال اللي بعده: رحلة بالليل على الكورنيش</a></li>
    </ul>
  </nav>
</main>
<footer>
  <p>نادي العجلة: رحلة كل جمعة.</p>
  <ul>
    <li><a href="#" rel="terms-of-service">شروط الاشتراك</a></li>
    <li><a href="#" rel="privacy-policy">بياناتك عندنا</a></li>
    <li><a href="#" rel="license">حقوق المحتوى</a></li>
  </ul>
</footer>
</body>
</html>
~~~

> في المعاينتين اللينكات اللي بتروح لصفحة تانية والفورم متعطّلين (صندوق معزول فيه صفحة واحدة). الصفحات الخمسة الباقية شكلها زي ما شفته في المشاريع اللي فاتت، وفوقها نفس الـ header وتحتها نفس الـ footer.

**الصورة الكبيرة:** موقع ثابت (ملفات HTML بس) لنادي: الزائر يعرف النادي من الرئيسية، ويقرا الدليل والمدونة، ويتواصل. مفيش سيرفر بيكتب صفحات ولا قاعدة بيانات، فالموقع يترفع على أي استضافة ملفات زي ما هو.

**ترتيب البناء:**

1. اعمل الفولدرات والملفات فاضية (الأوامر فوق)، وانسخ ملفات المشروع التالت في الجذر، وملفات المشروع الرابع جوه [[blog]].
2. اكتب الـ [[<header>]] والـ [[<footer>]] الجداد مرة واحدة في [[index.html]] وجرّبهم.
3. انسخهم لباقي صفحات الجذر وغيّر [[aria-current]] بس.
4. انسخهم لـ [[blog/index.html]] وحط [[../]] قدام كل مسار فيهم، ولصفحتي [[blog/posts]] وحط [[../../]].
5. زوّد قسم «من المدونة» في الرئيسية، والمستوى التالت في مسار الصفحة ولينك الدليل في كل مقال.
6. افتح كل صفحة ودوس على **كل** لينك فيها.

**الـ header نفسه بتلات بدايات، حسب عمق الصفحة:**

| الصفحة في | البداية | لينك الرئيسية | [[action]] بتاع البحث |
|---|---|---|---|
| الجذر | (فاضية) | [[index.html]] | [[blog/index.html]] |
| [[blog]] | [[../]] | [[../index.html]] | [[../blog/index.html]] |
| [[blog/posts]] | [[../../]] | [[../../index.html]] | [[../../blog/index.html]] |

[[../blog/index.html]] من جوه [[blog]] شكله غريب (اطلع وانزل تاني لنفس الفولدر)، بس هو صح وبيخلّي الـ header يتنسخ زي ما هو والبداية بس اللي تتغيّر. ده تمن إن الموقع من غير أداة بتبني الصفحات: الـ header متكرر ٧ مرات، وأي تعديل فيه لازم يتعمل ٧ مرات. الأدوات اللي بتحل ده (templates و components) في كورسات جاية.

**ليه نسبي للملف ومش [[/]]:** جرّبنا في درس «المسارات: مطلق ونسبي»: [[/guide.html]] بيبوظ من [[file:///]] وبيبوظ لو الموقع اترفع جوه فولدر. المسارات هنا اتجرّبت في التلات حالات (الأرقام تحت).

**قيم [[rel]] في الـ footer:** [[terms-of-service]] و [[privacy-policy]] و [[license]] بيقولوا للأدوات نوع الصفحة اللي اللينك رايح لها. ملهمش أثر ظاهر في Chrome.

**فورم البحث:** في كل الصفحات بيبعت الكلمة لـ [[blog/index.html?q=...]]. الصفحة ثابتة فبتفتح عادي ومبتفلترش: الهيكل جاهز لليوم اللي هتزوّد فيه JavaScript.

**الفحص قبل ما تقول خلصت:** افتح الموقع بدبل كليك ولف عليه، وبعدين انقل الفولدر [[club-site]] كله لمكان تاني ولف تاني. وغيّر حرف في اسم ملف لحرف كبير وشوف: على ويندوز هيفضل شغال، وعلى سيرفر لينكس هيبقى 404 (درس «المسارات: مطلق ونسبي»)، فخليك في الحروف الصغيرة.

**الغلطة الشائعة:** تنسخ الـ header لصفحة جوه [[blog/posts]] وتنسى [[../../]]: اللينكات هتشاور على [[blog/posts/guide.html]] وأخواتها، وكلها مش موجودة.

~~~text الناتج
index.html
  العناوين: h1 h2 h2 h2 h3 h3   (h1 = 1، من غير نطّ)
  اللينكات: 15 = 14 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، main ، contentinfo
guide.html
  العناوين: h1 h2 h3 h3 h2 h2 h3   (h1 = 1، من غير نطّ)
  اللينكات: 16 = 8 لصفحات تانية + 8 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، main ، navigation "في الصفحة دي" ، contentinfo
contact.html
  العناوين: h1 h2 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 15 = 10 لصفحات تانية + 1 جوه الصفحة + 2 خارجي + 2 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، main ، contentinfo
rules.html
  العناوين: h1 h2 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 10 = 9 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، main ، contentinfo
blog/index.html
  العناوين: h1 h2 h3 h3 h2   (h1 = 1، من غير نطّ)
  اللينكات: 11 = 10 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، main ، contentinfo
blog/posts/first-ride.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 17 = 16 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، navigation "مسار الصفحة" ، main ، navigation "مقالات تانية" ، contentinfo
blog/posts/night-ride.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 17 = 16 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، search ، navigation "مسار الصفحة" ، main ، navigation "مقالات تانية" ، contentinfo

لينكات لصفحات تانية في الموقع: 83
  اتفتحت من http://127.0.0.1:8125 : 83 من 83
  اتفتحت من file:/// : 83 من 83
  بعد نقل الفولدر كله لمكان تاني (file:///) : 83 من 83
  مسارات بتبدأ بـ / : 0
لينك بيشاور على id مش موجود: 0      id متكرر: 0      صفحات فيها scroll أفقي على 360: 0
~~~` },
        { lvl: 'فكرة', dir: "my-site", t: R`موقعك انت: ٣ صفحات لحاجة بتحبها`, what: R`موقع صغير من عندك: لفريقك، أو لهوايتك، أو لمحل حد من أهلك، أو لمادة بتذاكرها. انت اللي بتختار الموضوع والصفحات، بشرط يبقى فيه: رئيسية في الجذر وصفحتين على الأقل جوه فولدر، و [[<nav>]] واحد في كل الصفحات، وعنوان بسطر تعريفي، ولينك لقسم جوه صفحة تانية ([[صفحة.html#id]])، وطريقة تواصل بـ [[mailto:]] أو [[tel:]]. زي المشروع الكبير بس على قدّك.`, done: R`كل صفحة فيها [[<h1>]] واحد وعناوين من غير نطّ، وكل لينك نصه مفهوم لوحده، وكل اللينكات بتفتح بدبل كليك على [[index.html]] وبعد نقل الفولدر، ومفيش مسار بيبدأ بـ [[/]]، وواحد صاحبك فتح الموقع ووصل لطريقة التواصل من غير ما يسألك.`, ext: R`ارفعه على استضافة ملفات مجانية (GitHub Pages في كورس Git) وابعت الرابط لحد. ولو فيه حرف كبير في اسم ملف واللينك مكتوب بحرف صغير، هتكتشفها هناك: شغال عندك على ويندوز، و 404 على سيرفر لينكس.`, sol: R`~~~text شجرة الملفات
my-site/
├── pages/
│   ├── join.html
│   └── players.html
└── index.html
~~~

النسخة النموذجية دي لـ «فريق النجمة» (فريق كورة حي متخيل). خطوات «ابدأ إزاي» بتعمل [[index.html]]، والباقي:

~~~powershell
mkdir pages
ni pages/players.html, pages/join.html
~~~

~~~bash
mkdir pages
touch pages/players.html pages/join.html
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فريق النجمة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="index.html" aria-current="page">الرئيسية</a></li>
      <li><a href="pages/players.html">اللعيبة</a></li>
      <li><a href="pages/join.html">انضم لينا</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <hgroup>
    <h1>فريق النجمة</h1>
    <p>كورة الحي كل خميس بعد العشا</p>
  </hgroup>
  <h2 id="next">الماتش الجاي</h2>
  <p>الخميس <time datetime="2026-03-12">١٢ مارس</time> الساعة ٩، ملعب المدرسة.</p>
  <h2 id="more">اعرف أكتر</h2>
  <ul>
    <li><a href="pages/players.html#keepers">مين حرّاس المرمى؟</a></li>
    <li><a href="pages/join.html">إزاي تنضم للفريق</a></li>
  </ul>
</main>
<footer>
  <p>فريق النجمة.</p>
</footer>
</body>
</html>
~~~

~~~html pages/players.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اللعيبة | فريق النجمة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="../index.html">الرئيسية</a></li>
      <li><a href="../pages/players.html" aria-current="page">اللعيبة</a></li>
      <li><a href="../pages/join.html">انضم لينا</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <h1>اللعيبة</h1>
  <h2 id="keepers">حرّاس المرمى</h2>
  <ul>
    <li>عمر</li>
    <li>زياد</li>
  </ul>
  <h2 id="field">لعيبة الملعب</h2>
  <ul>
    <li>كريم</li>
    <li>يوسف</li>
    <li>مازن</li>
  </ul>
  <p><a href="join.html">عايز اسمك هنا؟ انضم لينا</a></p>
</main>
<footer>
  <p><a href="../index.html">فريق النجمة: الرئيسية</a></p>
</footer>
</body>
</html>
~~~

~~~html pages/join.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>انضم لينا | فريق النجمة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="../index.html">الرئيسية</a></li>
      <li><a href="../pages/players.html">اللعيبة</a></li>
      <li><a href="../pages/join.html" aria-current="page">انضم لينا</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <h1>انضم لينا</h1>
  <p>الفريق مفتوح لأي حد من الحي، من ١٦ سنة.</p>
  <h2 id="how">إزاي</h2>
  <ol>
    <li><a href="mailto:team@example.test?subject=%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D9%84%D8%B9%D8%A8">ابعت إيميل للكابتن على team@example.test</a></li>
    <li>أو <a href="tel:+201000000000">اتصل على <bdi dir="ltr">+20 100 000 0000</bdi></a></li>
    <li>وتعالى الخميس قبل الماتش بنص ساعة.</li>
  </ol>
  <p><a href="players.html#field">شوف مين بيلعب دلوقتي</a></p>
</main>
<footer>
  <p><a href="../index.html">فريق النجمة: الرئيسية</a></p>
</footer>
</body>
</html>
~~~

~~~view 432 index.html (المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فريق النجمة</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="#" aria-current="page">الرئيسية</a></li>
      <li><a href="#">اللعيبة</a></li>
      <li><a href="#">انضم لينا</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <hgroup>
    <h1>فريق النجمة</h1>
    <p>كورة الحي كل خميس بعد العشا</p>
  </hgroup>
  <h2 id="next">الماتش الجاي</h2>
  <p>الخميس <time datetime="2026-03-12">١٢ مارس</time> الساعة ٩، ملعب المدرسة.</p>
  <h2 id="more">اعرف أكتر</h2>
  <ul>
    <li><a href="#">مين حرّاس المرمى؟</a></li>
    <li><a href="#">إزاي تنضم للفريق</a></li>
  </ul>
</main>
<footer>
  <p>فريق النجمة.</p>
</footer>
</body>
</html>
~~~

> في المعاينة اللينكات اللي بتروح لصفحة تانية متعطّلة (صندوق معزول).

**ليه التصميم ده:**

- **٣ صفحات بس:** رئيسية بتقول مين وإمتى، وصفحة للمحتوى (اللعيبة)، وصفحة للفعل اللي عايز الزائر يعمله (ينضم). ده أصغر موقع ليه معنى.
- **الصفحتين جوه [[pages]]:** عشان تتمرّن على الاتجاهين: من الرئيسية نازل ([[pages/players.html]])، ومن جوه طالع ([[../index.html]])، وبين الجيران بالاسم بس ([[join.html]]).
- **الـ nav واحد في التلاتة** والبداية بتتغيّر: فاضية في الجذر و [[../]] جوه [[pages]]. فلينك «اللعيبة» من جوه [[pages]] بقى [[../pages/players.html]]: طويل بس صح، وبيخلّيك تنسخ الـ nav زي ما هو.
- **لينك لقسم في صفحة تانية:** «مين حرّاس المرمى؟» بيفتح [[pages/players.html#keepers]] على القسم بتاعه على طول.
- **نص اللينكات جُمل:** «إزاي تنضم للفريق» و «شوف مين بيلعب دلوقتي»، مش «اضغط هنا».
- **التواصل:** إيميل بعنوان جاهز («عايز ألعب» متشفّرة) والعنوان ظاهر في النص، وتليفون دولي.

**الغلطة الشائعة في موقع أول مرة:** تبدأ بالشكل. ابدأ بالعناوين واللينكات بس، ولف على الموقع كله، وبعدين الشكل في وحدة الـ CSS.

~~~text الناتج
index.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 6 = 5 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، contentinfo
pages/players.html
  العناوين: h1 h2 h2   (h1 = 1، من غير نطّ)
  اللينكات: 6 = 5 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 0 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، contentinfo
pages/join.html
  العناوين: h1 h2   (h1 = 1، من غير نطّ)
  اللينكات: 8 = 5 لصفحات تانية + 1 جوه الصفحة + 0 خارجي + 2 mailto و tel
  landmarks: banner ، navigation "الرئيسية" ، main ، contentinfo

لينكات لصفحات تانية في الموقع: 15
  اتفتحت من http://127.0.0.1:8125 : 15 من 15
  اتفتحت من file:/// : 15 من 15
  بعد نقل الفولدر كله لمكان تاني (file:///) : 15 من 15
  مسارات بتبدأ بـ / : 0
لينك بيشاور على id مش موجود: 0      id متكرر: 0      صفحات فيها scroll أفقي على 360: 0
~~~` },
      ],
      items: [
        {
          cmd: "h1 لحد h6",
          title: "العناوين: فهرس الصفحة مش حجم الخط",
          pre: ["css/semantic HTML"],
          ref: [
            { t: "MDN: <h1>–<h6>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements" },
            { t: "MDN: <hgroup>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup" },
            { t: "WHATWG: the h1, h2, h3, h4, h5, and h6 elements", url: "https://html.spec.whatwg.org/multipage/sections.html#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements" },
            { t: "WHATWG: the hgroup element", url: "https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element" },
            { t: "MDN Curriculum: Semantic HTML (2.2 Good document structure)", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`العناوين الستة من [[<h1>]] لـ [[<h6>]] بتقول «هنا بيبدأ جزء، وده اسمه، وده مستواه». الرقم هو **المستوى** في فهرس الصفحة، مش حجم الخط: [[<h1>]] عنوان الصفحة كلها، و [[<h2>]] جزء فيها، و [[<h3>]] جزء جوه الجزء.
في درس «semantic HTML» شفت [[<h1>]] و [[<h2>]] وسط هيكل الصفحة. هنا المستويات الستة كلها، وقواعد الفهرس، و [[<hgroup>]] للعنوان اللي معاه سطر تعريفي.`,
          example: R`<h1>دليل العناية بالعجلة</h1>
<h2>التنضيف</h2>
<h3>تنضيف الجنزير</h3>
<h3>تنضيف الفرامل</h3>
<h2>الصيانة الشهرية</h2>
<hgroup>
  <h2>أسئلة بتتكرر</h2>
  <p>اللي الأعضاء الجداد بيسألوه دايمًا</p>
</hgroup>`,
          flag: "script",
          lines: [
            R`[[<h1>]] عنوان الصفحة كلها: واحد بس، وبيقول الصفحة دي عن إيه.`,
            R`[[<h2>]] أول جزء في الصفحة. المستوى ٢ يعني «جزء مباشر تحت عنوان الصفحة».`,
            R`[[<h3>]] جزء جوه «التنضيف». نزلنا مستوى واحد بس: من ٢ لـ ٣.`,
            R`[[<h3>]] تاني في نفس المستوى: أخو اللي قبله، والاتنين تحت «التنضيف».`,
            R`[[<h2>]] رجعنا لمستوى ٢: ده بيقفل «التنضيف» وكل اللي تحته، ويبدأ جزء جديد. الرجوع لفوق مسموح بأي عدد مستويات.`,
            R`[[<hgroup>]] من heading group: بيلمّ عنوان واحد ومعاه سطر أو أكتر بيكمّلوه (عنوان فرعي، أو شعار).`,
            R`العنوان الوحيد المسموح جوه الـ [[<hgroup>]]. هو اللي بيدخل الفهرس، بمستواه العادي.`,
            R`السطر التعريفي [[<p>]] عادي، مش [[<h3>]]: هو مش جزء جديد في الصفحة، هو تكملة للعنوان.`,
            R`نهاية المجموعة. [[</hgroup>]] لازم تتكتب.`
          ],
          teach: R`## الفكرة في سطرين

العنوان بيعمل حاجتين: بيسمّي الجزء اللي تحته، وبيقول مستواه. والعناوين كلها ورا بعض بتعمل **فهرس** للصفحة، والمواصفة (WHATWG) بتسمّيه outline: «كل العناوين اللي في الصفحة، بترتيبها».

كل القياسات من Chrome 157 (headless على Windows 11).

---

## ١. المستويات الستة

~~~live 322 الستة ومعاهم فقرة
<h1>عنوان مستوى ١</h1>
<h2>عنوان مستوى ٢</h2>
<h3>عنوان مستوى ٣</h3>
<h4>عنوان مستوى ٤</h4>
<h5>عنوان مستوى ٥</h5>
<h6>عنوان مستوى ٦</h6>
<p>فقرة عادية للمقارنة.</p>
~~~

| العنصر | معناه | حجم الخط الافتراضي | في شجرة الـ accessibility |
|---|---|---|---|
| [[<h1>]] | عنوان الصفحة | 32px | [[heading level=1]] |
| [[<h2>]] | جزء في الصفحة | 24px | [[heading level=2]] |
| [[<h3>]] | جزء جوه جزء | 18.72px | [[heading level=3]] |
| [[<h4>]] | مستوى رابع | 16px (زي الفقرة) | [[heading level=4]] |
| [[<h5>]] | مستوى خامس | 13.28px (**أصغر** من الفقرة) | [[heading level=5]] |
| [[<h6>]] | مستوى سادس | 10.72px | [[heading level=6]] |

~~~text القياس الكامل (getComputedStyle)
h1: display=block  font-size=32px     font-weight=700  margin فوق وتحت=21.44px
h2: display=block  font-size=24px     font-weight=700  margin=19.92px
h3: display=block  font-size=18.72px  font-weight=700  margin=18.72px
h4: display=block  font-size=16px     font-weight=700  margin=21.28px
h5: display=block  font-size=13.28px  font-weight=700  margin=22.18px
h6: display=block  font-size=10.72px  font-weight=700  margin=24.98px
p:  display=block  font-size=16px     font-weight=400  margin=16px
~~~

اللي بيطلع من الأرقام:

- الستة [[display: block]] (كل عنوان في سطر لوحده) وكلهم تقيل ([[font-weight]] 700). ده كل اللي المتصفح بيدّيه لهم في الشكل.
- [[<h4>]] حجمه زي الفقرة بالظبط، و [[<h5>]] و [[<h6>]] **أصغر** منها. يعني الحجم الافتراضي مش مقياس للأهمية، وكل موقع حقيقي بيغيّر الأحجام دي بالـ CSS.
- الفرق الحقيقي بينهم هو الرقم اللي في الشجرة: [[level]]. ده اللي قارئ الشاشة والأدوات بيقروه.

المستويات اللي بتتستخدم فعلًا في أغلب الصفحات: من ١ لـ ٣، و ٤ في الوثائق الطويلة. [[<h5>]] و [[<h6>]] نادرين، ولو لقيت نفسك محتاجهم فالصفحة غالبًا محتاجة تتقسم.

> مفيش [[<h7>]]. جرّبته: Chrome بيعامله كعنصر مش معروف ([[HTMLUnknownElement]])، بيتعرض كلام عادي في نفس السطر، ومبيظهرش في الشجرة كعنوان.

---

## ٢. العناوين بتعمل فهرس

المواصفة بتقول: المستوى بيقابل الأقسام المتداخلة: [[<h1>]] للقسم الأعلى، و [[<h2>]] لقسم فرعي، و [[<h3>]] لقسم فرعي جوه الفرعي.

~~~live 402 صفحة قصيرة
<h1>دليل العناية بالعجلة</h1>
<p>كل اللي عجلتك محتاجاه.</p>
<h2>التنضيف</h2>
<h3>تنضيف الجنزير</h3>
<p>فوطة ناشفة ونقطة زيت.</p>
<h3>تنضيف الفرامل</h3>
<p>من غير زيت خالص.</p>
<h2>الصيانة الشهرية</h2>
<p>شدّ المسامير وافحص الكاوتش.</p>
~~~

لو شلت الفقرات وسبت العناوين، ده اللي يفضل:

~~~text الفهرس
1  دليل العناية بالعجلة
2    التنضيف
3      تنضيف الجنزير
3      تنضيف الفرامل
2    الصيانة الشهرية
~~~

كل عنوان بيفضل «مفتوح» لحد ما ييجي عنوان بنفس مستواه أو أعلى. فـ «تنضيف الفرامل» تحت «التنضيف»، و «الصيانة الشهرية» (مستوى ٢) قفلت «التنضيف» بكل اللي تحته.

**اختبار سريع لأي صفحة:** اقرا العناوين لوحدها ورا بعض. لو طلعوا فهرس مفهوم، الهيكل صح. لو طلعوا «أهلًا»، «اعرف أكتر»، «جديد!»، العناوين مش بتوصف الأجزاء.

---

## ٣. القاعدة الأولى: متنطّش مستوى

المواصفة: كل عنوان بييجي بعد عنوان، مستواه يبقى **أقل منه، أو زيه، أو أكبر بواحد بس**. يعني النزول درجة درجة، والطلوع بأي عدد.

~~~live 153 غلط: من ١ لـ ٤
<h1>متجر الخيمة</h1>
<h4>العروض</h4>
<p>خصم ٢٠٪ على الكشّافات.</p>
~~~

~~~live 161 صح: من ١ لـ ٢
<h1>متجر الخيمة</h1>
<h2>العروض</h2>
<p>خصم ٢٠٪ على الكشّافات.</p>
~~~

الأولى شكلها «أشيك» لأن [[<h4>]] خطه صغير، وده بالظبط سبب إن ناس بتكتبها. بس اللي بيتنقل بالعناوين هيلاقي مستوى ١ وبعده مستوى ٤، وهيدوّر على ٢ و ٣ اللي مش موجودين. MDN بيقولها كده: اللي بيتنقل بالطريقة دي «هيفضل يسأل العنوان الناقص فين».

| التسلسل | مسموح؟ | ليه |
|---|---|---|
| [[<h1>]] ثم [[<h2>]] | أيوه | نزل مستوى واحد |
| [[<h2>]] ثم [[<h2>]] | أيوه | نفس المستوى: جزء أخ |
| [[<h3>]] ثم [[<h2>]] | أيوه | طلع: قفل الجزء الفرعي |
| [[<h4>]] ثم [[<h2>]] | أيوه | الطلوع بأي عدد مستويات |
| [[<h1>]] ثم [[<h3>]] | لأ | نطّ مستوى ٢ |
| [[<h2>]] ثم [[<h4>]] | لأ | نطّ مستوى ٣ |

> الـ validator مش هيمسكها: جرّبت صفحة فيها [[<h1>]] وبعده [[<h4>]] ورجع صفر رسايل. اللي بيمسكها أدوات الـ accessibility (قاعدة [[heading-order]] في axe، وشفتها في درس «semantic HTML»). فالمراجعة عليك.

---

## ٤. القاعدة التانية: [[<h1>]] واحد

MDN: الصفحة المفروض يبقى فيها [[<h1>]] واحد بيوصف محتواها، زي ما [[<title>]] بيوصفها في التاب. أكتر من [[<h1>]] مسموح في المواصفة، بس MDN بيقول إنه «مش من الممارسات الكويسة».

والمواصفة نفسها: لو الصفحة فيها عناوين، واحد منهم على الأقل المفروض يبقى مستوى ١.

| | [[<title>]] | [[<h1>]] |
|---|---|---|
| بيظهر فين | التاب، ونتايج البحث، والمفضلة | جوه الصفحة |
| مكانه | [[<head>]] | [[<body>]] |
| مثال | دليل العناية بالعجلة، نادي العجلة | دليل العناية بالعجلة |

الاتنين بيوصفوا نفس الصفحة، فطبيعي يبقوا قريبين. الـ [[<title>]] غالبًا بيزوّد اسم الموقع.

**[[<h1>]] جوه [[<section>]] أو [[<article>]]:** زمان المتصفحات كانت بتصغّر خط [[<h1>]] لما يبقى جوه [[<section>]] أو [[<article>]]، وده خلّى ناس تكتب [[<h1>]] في كل قسم. MDN بيقول إن ده اتشال من مواصفة HTML في مايو ٢٠٢٥. وقسته في Chrome 157:

~~~text الناتج
h1 في الصفحة مباشرة:              font-size=32px   level=1
h1 جوه section:                   font-size=32px   level=1
h1 جوه article جوه section:       font-size=32px   level=1
~~~

نفس الحجم ونفس المستوى في التلاتة. يعني [[<h1>]] جوه قسم هو عنوان صفحة تاني، مش عنوان قسم. استخدم [[<h2>]].

---

## ٥. العنوان مش أداة لتكبير الخط

غلطتين عكس بعض، والاتنين بيبوّظوا الفهرس:

~~~live 84 غلط: كلام تقيل شكله عنوان
<p><b>وصفات الأسبوع</b></p>
<p>كشري، ومحشي، وملوخية.</p>
~~~

~~~live 101 صح: عنوان حقيقي
<h2>وصفات الأسبوع</h2>
<p>كشري، ومحشي، وملوخية.</p>
~~~

~~~text شجرة الـ accessibility
الأولى:   paragraph › "وصفات الأسبوع"          (مفيش heading)
التانية:  heading "وصفات الأسبوع" level=2
~~~

في الأولى العين شايفة عنوان، بس الشجرة فيها فقرة عادية. الجزء ده مش هيظهر في فهرس قارئ الشاشة.

والعكس: تستخدم [[<h4>]] لملاحظة صغيرة عشان خطه صغير، أو [[<h1>]] لجملة عايزها كبيرة. دلوقتي في الفهرس «جزء» مش موجود.

**القاعدة:** المستوى من **مكان** الجزء في الصفحة، والحجم من الـ CSS. وجرّبت أصغّر [[<h2>]] بسطر CSS واحد ([[font-size: 12px]])، والشجرة فضلت [[heading level=2]]: الـ CSS بيغيّر الشكل ومبيلمسش المعنى. (خاصية [[font-size]] في وحدة الخطوط.)

---

## ٦. مين بيستخدم الفهرس ده؟

**قارئ الشاشة.** MDN: من أشهر طرق التنقل عند مستخدمي قارئ الشاشة إنهم ينطّوا من عنوان لعنوان عشان يعرفوا الصفحة فيها إيه، وأغلب قارئات الشاشة بتعرض قايمة مرتبة بكل العناوين. ومنهج MDN بيقول إن صفحة من غير عناوين «صعبة جدًا» عليهم. (ده من وثائق MDN، ومتجرّبش هنا بقارئ شاشة.)

اللي اتقاس هنا هو اللي Chrome بيدّيه لقارئ الشاشة: كل عنوان بيطلع في الشجرة [[heading]] ومعاه [[level]] برقمه، زي الجدول اللي فوق.

**محركات البحث.** منهج MDN بيذكر فايدة SEO: الكلمات اللي في العناوين بتاخد وزن أكبر. فالعنوان اللي بيوصف الجزء بكلماته الحقيقية («تنضيف الجنزير») أحسن من عنوان عام («الخطوة التانية»). ده من منهج MDN، ومحدش بيضمن ترتيب.

**اللي بيقرا بعينه.** كلنا بنعدّي على العناوين الأول عشان نقرر نقرا إيه.

**والمتصفح نفسه.** MDN: المتصفحات والأدوات تقدر تبني فهرس محتويات للصفحة من العناوين لوحدها.

---

## ٧. [[<hgroup>]]: عنوان ومعاه سطر

كتير العنوان بيبقى معاه سطر تاني: عنوان فرعي، أو شعار، أو اسم بديل. لو كتبته [[<h2>]] هيدخل الفهرس كأنه جزء في الصفحة وهو مش جزء.

~~~live 208 غلط: الشعار عامل نفسه جزء
<h1>مطبخ سلمى</h1>
<h2>أكل بيتي كل يوم</h2>
<h2>وصفات الأسبوع</h2>
<p>كشري، ومحشي.</p>
~~~

~~~live 199 صح: hgroup
<hgroup>
  <h1>مطبخ سلمى</h1>
  <p>أكل بيتي كل يوم</p>
</hgroup>
<h2>وصفات الأسبوع</h2>
<p>كشري، ومحشي.</p>
~~~

~~~text الفهرس في الحالتين
الغلط:   1 مطبخ سلمى   2 أكل بيتي كل يوم   2 وصفات الأسبوع
الصح:    1 مطبخ سلمى   2 وصفات الأسبوع
~~~

المواصفة: [[<hgroup>]] «بيمثّل عنوان ومحتوى مرتبط بيه»، وبيلمّ عنوان واحد مع [[<p>]] واحدة أو أكتر فيها عنوان فرعي أو عنوان بديل أو شعار.

قواعده (من المواصفة و MDN):

- جواه **عنوان واحد بالظبط** من [[<h1>]] لـ [[<h6>]].
- وقبله أو بعده [[<p>]] (ولا واحدة، أو أكتر). مفيش حاجة تانية مسموحة جواه.
- هو نفسه مبيأثّرش على الفهرس: العنوان اللي جواه هو اللي بيدخل، بمستواه.

~~~text القياس
hgroup:  display=block  margin=0px  font-size=16px      (ملوش أي شكل افتراضي)
في الشجرة:  group › heading "مطبخ سلمى" level=1 ، paragraph "أكل بيتي كل يوم"
~~~

Chrome بيدّيه role اسمه [[group]]، والعنوان اللي جواه لسه [[heading]] عادي. فهو مبيغيّرش الشكل خالص: فايدته إنه بيقول إن السطرين دول حاجة واحدة، وبيدّيك عنصر واحد تنسّقه بعدين.

**إمتى [[<hgroup>]] وإمتى [[<header>]]:** [[<header>]] مقدمة الصفحة أو القسم كله (ممكن فيه لوجو وقايمة تنقل وبحث). [[<hgroup>]] أضيق: عنوان وسطوره بس. وعادي [[<hgroup>]] يبقى جوه [[<header>]].

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| نطّ مستوى ([[<h1>]] ثم [[<h4>]]) | الشكل عادي، والـ validator ساكت. الفهرس فيه فجوة، واللي بيتنقل بالعناوين بيتلخبط |
| أكتر من [[<h1>]] | الـ validator ساكت (جرّبت صفحة فيها اتنين). الصفحة بقى ليها «عنوانين»، ومبقاش واضح هي عن إيه |
| عنوان فاضي [[<h2></h2>]] | الـ validator: [[warning: Empty heading.]] وفي الشجرة [[heading level=2]] من غير اسم: قارئ الشاشة بيقف على عنوان ملوش كلام |
| عنوان جوه فقرة [[<p>...<h2>]] | الفقرة بتتقفل لوحدها قبل العنوان. [[<p>فقرة <h2>عنوان</h2> باقي</p>]] اتبنى منه فقرة، وبعدها العنوان، وبعدها «باقي» برّه أي فقرة، وفقرة فاضية في الآخر |
| [[<b>]] أو خط كبير بدل العنوان | مفيش [[heading]] في الشجرة، والجزء مش في الفهرس |
| عنوان عشان الخط يكبر أو يصغر | جزء وهمي في الفهرس |
| الشعار [[<h2>]] تحت الـ [[<h1>]] | الشعار بقى جزء في الفهرس. الحل [[<hgroup>]] |
| اتنين عناوين جوه [[<hgroup>]] | ضد المواصفة: عنوان واحد بس |
| فقرة كاملة جوه عنوان | العنوان اسم للجزء، مش محتواه. خليه قصير |

---

## الخلاصة

- الرقم في [[<h1>]] لـ [[<h6>]] هو المستوى في الفهرس، مش الحجم. الحجم بالـ CSS.
- [[<h1>]] واحد لعنوان الصفحة، وبعده [[<h2>]] للأجزاء، و [[<h3>]] لأجزاء الأجزاء.
- النزول مستوى واحد في المرة. الطلوع بأي عدد.
- الـ validator مبيمسكش النطّ ولا تكرار [[<h1>]]: اقرا العناوين لوحدها وراجعها.
- [[<hgroup>]] لعنوان واحد ومعاه سطر تعريفي في [[<p>]].
- [[<h5>]] و [[<h6>]] خطهم الافتراضي أصغر من الفقرة، ونادرًا ما بتحتاجهم.`,
          try: R`اعمل ملف [[outline.html]] لصفحة «إزاي تعمل شاي» بالعناوين بس، من غير ولا فقرة: عنوان الصفحة، وتحته جزئين («المكونات» و «الطريقة»)، وتحت «الطريقة» خطوتين («غلي المية» و «النقع»). افتحه واقرا العناوين ورا بعض. وبعدين غيّر «غلي المية» لـ [[<h5>]] وبص على حجمه جنب «النقع».`,
          sol: R`~~~live 255 outline.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>إزاي تعمل شاي</title>
</head>
<body>
<h1>إزاي تعمل شاي</h1>
<h2>المكونات</h2>
<h2>الطريقة</h2>
<h3>غلي المية</h3>
<h3>النقع</h3>
</body>
</html>
~~~

العناوين لوحدها فهرس مفهوم: الصفحة عن الشاي، وفيها جزئين، والتاني جواه خطوتين.

لما «غلي المية» بقى [[<h5>]]: خطه بقى 13.28px، أصغر من «النقع» (18.72px) وأصغر حتى من أي فقرة (16px). والفهرس بقى فيه نطّة من ٢ لـ ٥. الشكل اتغيّر والمعنى باظ، والصفحة مطلّعتش أي خطأ.

~~~text الناتج
الصح:          h1 h2 h2 h3 h3        (من غير نطّ)
بعد التغيير:   h1 h2 h2 h5 h3        (نطّة من 2 لـ 5)
h3 = 18.72px      h5 = 13.28px      p = 16px
~~~`,
          deep: {
            why: R`أي صفحة أطول من شاشة محتاجة طريقة تتقسم بيها. العناوين هي التقسيمة دي، وهي الحاجة الوحيدة في HTML اللي بتدّي الصفحة فهرس من غير ما تكتبه بإيدك. قارئ الشاشة بيبني منها قايمة تنقل، ومحركات البحث بتفهم منها الصفحة عن إيه، واللي بيقرا بعينه بيعدّي عليها الأول.`,
            how: R`كل عنصر من الستة بيطلع في شجرة الـ accessibility بـ role اسمه [[heading]] وخاصية [[level]] من رقمه. الفهرس (outline) هو العناوين دي بترتيبها في الصفحة، والمستوى بيحدد مين تحت مين. المتصفح مبيتحققش من الترتيب: بيرسم اللي مكتوب. والتنسيق الافتراضي للستة: [[display: block]] و [[font-weight: 700]] وحجم و [[margin]] بيختلفوا بالمستوى. و [[<hgroup>]] ملوش تنسيق خالص و role بتاعه [[group]].`,
            when: R`[[<h1>]]: مرة في كل صفحة، لعنوانها. [[<h2>]]: لكل جزء رئيسي (وكل [[<section>]] في درس «semantic HTML» أوله عنوان). [[<h3>]] و [[<h4>]]: لما الجزء نفسه يتقسم. [[<hgroup>]]: لما العنوان يبقى معاه عنوان فرعي أو شعار. ومتستخدمش عنوان: لتكبير كلمة، ولا لسطر في كارت مش بيبدأ جزء، ولا لنص في الـ footer.`,
            mistakes: R`تختار المستوى من شكل الخط ([[<h4>]] عشان صغير). تنطّ من [[<h1>]] لـ [[<h3>]]. تكتب [[<h1>]] في كل قسم. تعمل العنوان [[<p><b>]] أو [[<div>]] بخط كبير. تكتب الشعار [[<h2>]] تحت اسم الموقع بدل [[<hgroup>]]. تسيب عنوان فاضي هتملاه JavaScript بعدين. تحط اتنين عناوين جوه [[<hgroup>]]. وتفتكر إن الـ validator هيقولك لو الترتيب غلط: هو ساكت عن النطّ.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل: اكتب فهرس العناوين اللي في أول الحل (النسخة البايظة)، وقول فيه كام غلطة وإيه هم. وبعدين صلّحهم.`, done: R`لقيت غلطتين: نطّة من [[<h2>]] لـ [[<h4>]]، و [[<h1>]] تاني في آخر الصفحة. وبعد التصليح الفهرس بقى h1 h2 h3 h2 h3 h2.`, sol: R`~~~live 316 البايظة
<h1>متجر الخيمة</h1>
<h2>كشّافات</h2>
<h4>كشّاف الرحلات</h4>
<h2>شنط</h2>
<h3>شنط الضهر</h3>
<h1>تواصل معانا</h1>
~~~

~~~live 304 بعد التصليح
<h1>متجر الخيمة</h1>
<h2>كشّافات</h2>
<h3>كشّاف الرحلات</h3>
<h2>شنط</h2>
<h3>شنط الضهر</h3>
<h2>تواصل معانا</h2>
~~~

**الغلطتين:**

- «كشّاف الرحلات» [[<h4>]] تحت [[<h2>]]: نطّ مستوى ٣. هو جزء مباشر تحت «كشّافات»، فمكانه [[<h3>]].
- «تواصل معانا» [[<h1>]] تاني. هو جزء في الصفحة زي «كشّافات» و «شنط»، فهو [[<h2>]].

**إزاي تمسكها بسرعة:** امشي على الأرقام ورا بعض، وكل مرة الرقم يزيد بأكتر من واحد دي نطّة. ورقم ١ المفروض يظهر مرة واحدة.

**الغلطة الشائعة:** تفتكر إن الطلوع من [[<h3>]] لـ [[<h2>]] غلط برضه. لأ: الطلوع مسموح بأي عدد مستويات، لأنه معناه إن الجزء الفرعي خلص.

~~~text الناتج
البايظة:       h1 h2 h4 h2 h3 h1      نطّات: 1     عدد h1: 2
بعد التصليح:   h1 h2 h3 h2 h3 h2      نطّات: 0     عدد h1: 1
الـ validator على الاتنين: صفر رسايل (مبيمسكش النطّ ولا تكرار h1)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة «مطبخ سلمى» اللي في أول الحل شكلها مقبول، بس مفيهاش غير عنوان حقيقي واحد وهو في مستوى غلط. حوّل كل «عنوان مزيف» لعنوان حقيقي بمستواه الصح، من غير ما تغيّر ولا كلمة.`, done: R`الصفحة فيها ٤ عناوين: h1 ثم h2 ثم h3 ثم h2، ومفيش ولا [[<b>]] شغّال عنوان.`, work: { h: 265, solAt: 1, start: R`<p><b>مطبخ سلمى</b></p>
<p><b>وصفات الأسبوع</b></p>
<p>تلات وصفات جداد كل سبت.</p>
<h4>كشري</h4>
<p>عدس ورز ومكرونة وصلصة.</p>
<p><b>نصايح</b></p>
<p>اغسل الرز قبل ما تسلقه.</p>`, checks: [
              { say: R`«مطبخ سلمى» بقت [[<h1>]]`, q: "h1", has: "مطبخ" },
              { say: R`«وصفات الأسبوع» و «نصايح» بقوا [[<h2>]]`, q: "h2", n: 2 },
              { say: R`«كشري» بقت [[<h3>]]`, q: "h3", has: "كشري" },
              { say: R`مفيش [[<h4>]] (نطّ مستوى)`, q: "h4", n: 0 },
              { say: R`مفيش [[<b>]] شغّال عنوان`, q: "b", n: 0 },
            ] }, sol: R`~~~live 265 البايظة
<p><b>مطبخ سلمى</b></p>
<p><b>وصفات الأسبوع</b></p>
<p>تلات وصفات جداد كل سبت.</p>
<h4>كشري</h4>
<p>عدس ورز ومكرونة وصلصة.</p>
<p><b>نصايح</b></p>
<p>اغسل الرز قبل ما تسلقه.</p>
~~~

~~~live 323 بعد التصليح
<h1>مطبخ سلمى</h1>
<h2>وصفات الأسبوع</h2>
<p>تلات وصفات جداد كل سبت.</p>
<h3>كشري</h3>
<p>عدس ورز ومكرونة وصلصة.</p>
<h2>نصايح</h2>
<p>اغسل الرز قبل ما تسلقه.</p>
~~~

**إزاي حددنا المستويات:** من مكان كل جزء، مش من شكله:

- «مطبخ سلمى» اسم الصفحة كلها: [[<h1>]].
- «وصفات الأسبوع» و «نصايح» جزئين في الصفحة: [[<h2>]].
- «كشري» وصفة جوه «وصفات الأسبوع»: [[<h3>]]. كان [[<h4>]] عشان خطه صغير، وده نطّ مستوى.

**ليه [[<p><b>]] مش عنوان:** [[<b>]] بيتقّل الخط بس (درس «strong و em»). في الشجرة هو فقرة، فالجزء مبيظهرش في فهرس قارئ الشاشة.

**الغلطة الشائعة:** تصلّح الـ [[<b>]] وتسيب [[<h4>]] عشان «هو عنوان أصلًا». هو عنوان بس في مستوى غلط.

~~~text الناتج
البايظة:       العناوين في الشجرة: h4 بس (1)
بعد التصليح:   h1 h2 h3 h2  (4 عناوين، من غير نطّ)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة مقال «إزاي تختار خوذة» لنادي العجلة (اسم متخيل): عنوان المقال ومعاه سطر تعريفي جوه [[<hgroup>]]، وجزئين («المقاس» و «الأمان»)، وتحت «المقاس» خطوتين، وتحت كل عنوان فقرة قصيرة.`, done: R`الفهرس h1 h2 h3 h3 h2، والسطر التعريفي [[<p>]] جوه [[<hgroup>]] ومش داخل في الفهرس.`, work: { h: 430, start: R`إزاي تختار خوذة
خمس دقايق في المحل بتفرق في سنين
المقاس
الخوذة الواسعة زي ما تكون مش لابسها.
قيس راسك
لف المتر فوق الحواجب بصباع.
جرّبها
هز راسك: لو اتحركت، خد مقاس أصغر.
الأمان
دوّر على ملصق الاعتماد جوه الخوذة.`, checks: [
              { say: R`عنوان المقال [[<h1>]] جوه [[<hgroup>]]`, q: "hgroup > h1", has: "خوذة" },
              { say: R`السطر التعريفي [[<p>]] جوه [[<hgroup>]]`, q: "hgroup > p", has: "خمس" },
              { say: R`«المقاس» و «الأمان» [[<h2>]]`, q: "h2", n: 2 },
              { say: R`خطوتين [[<h3>]] تحت «المقاس»`, q: "h3", n: 2 },
              { say: R`السطر التعريفي مش [[<h2>]]`, q: "h2", has: "خمس", n: 0 },
              { say: R`تحت كل عنوان فقرة [[<p>]]`, q: "p", min: 5 },
            ] }, sol: R`~~~live 438 helmet.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>إزاي تختار خوذة | نادي العجلة</title>
</head>
<body>
<main>
  <hgroup>
    <h1>إزاي تختار خوذة</h1>
    <p>خمس دقايق في المحل بتفرق في سنين</p>
  </hgroup>
  <h2>المقاس</h2>
  <p>الخوذة الواسعة زي ما تكون مش لابسها.</p>
  <h3>قيس راسك</h3>
  <p>لف المتر فوق الحواجب بصباع.</p>
  <h3>جرّبها</h3>
  <p>هز راسك: لو اتحركت، خد مقاس أصغر.</p>
  <h2>الأمان</h2>
  <p>دوّر على ملصق الاعتماد جوه الخوذة.</p>
</main>
</body>
</html>
~~~

**ليه كده:**

- [[<hgroup>]] لمّ العنوان والسطر اللي تحته. السطر [[<p>]] لأنه بيكمّل العنوان، مش بيبدأ جزء.
- «المقاس» و «الأمان» [[<h2>]]: جزئين في المقال.
- «قيس راسك» و «جرّبها» [[<h3>]]: خطوتين جوه «المقاس».
- [[<title>]] فيه عنوان المقال واسم الموقع، والـ [[<h1>]] فيه عنوان المقال بس.

**الغلطة الشائعة:** تكتب السطر التعريفي [[<h2>]] «عشان هو تحت العنوان». هيبقى في الفهرس جزء اسمه «خمس دقايق في المحل...» وتحته مفيش حاجة.

~~~text الناتج
العناوين: h1 h2 h3 h3 h2   (من غير نطّ، h1 = 1)
hgroup=1   جواه: h1 واحد و p واحدة
في الشجرة: group › heading "إزاي تختار خوذة" level=1 ، paragraph
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** افتح صفحة الخوذة اللي في التمرين اللي فات (أو أي صفحة على النت)، ودوس F12 وافتح تاب Console، والصق السطر اللي في الحل. هيطبعلك فهرس الصفحة.`, done: R`ظهرلك سطر لكل عنوان فيه اسم العنصر وكلامه، وعرفت منه لو الصفحة فيها نطّة أو أكتر من [[<h1>]].`, sol: R`~~~text السطر اللي بيتلصق في Console
document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => console.log(h.tagName, h.textContent))
~~~

**السطر بيعمل إيه، حتة حتة:**

- [[document]] هو الصفحة المفتوحة.
- [[querySelectorAll('h1, h2, h3, h4, h5, h6')]] بيجيب كل العناصر اللي اسمها واحد من الستة، بترتيبهم في الصفحة.
- [[forEach(h => ...)]] بيعدّي عليهم واحد واحد، وكل واحد بيسمّيه [[h]].
- [[console.log(h.tagName, h.textContent)]] بيطبع اسم العنصر (بحروف كبيرة) والكلام اللي جواه.

ده JavaScript، وهتتعلمه في كورسه. هنا بنستخدمه كأداة جاهزة.

**طريقة من غير كود:** في تاب Elements، افتح اللوحة الجانبية Accessibility: كل عنوان بيبان عليه [[heading]] و [[level]].

**الغلطة الشائعة:** تحكم على الصفحة من شكلها. صفحة شكلها مترتب ممكن تطلع من غير ولا عنوان.

~~~text الناتج (على صفحة الخوذة)
H1 إزاي تختار خوذة
H2 المقاس
H3 قيس راسك
H3 جرّبها
H2 الأمان
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** الصفحة اللي في أول الحل معمولة [[<div>]] كلها، والعناوين متعرّفة بحجم الخط بس (32 و 24 و 18). حوّلها لعناوين حقيقية و [[<hgroup>]]، وشيل الـ [[style]] كله.`, done: R`مفيش ولا [[<div>]] ولا [[style]]، والفهرس h1 h2 h3 h3 h2، والسطر اللي تحت اسم المتجر جوه [[<hgroup>]].`, work: { h: 402, solAt: 1, start: R`<div style="font-size:32px;font-weight:bold">متجر الخيمة</div>
<div>كل حاجة للرحلة</div>
<div style="font-size:24px;font-weight:bold">كشّافات</div>
<div style="font-size:18px;font-weight:bold">كشّاف الرحلات</div>
<div>٤٥٠ جنيه</div>
<div style="font-size:18px;font-weight:bold">كشّاف الراس</div>
<div>٣٠٠ جنيه</div>
<div style="font-size:24px;font-weight:bold">شنط</div>
<div>قريب.</div>`, checks: [
              { say: R`مفيش ولا [[<div>]]`, q: "div", n: 0 },
              { say: R`مفيش [[style]] خالص`, q: "[style]", n: 0 },
              { say: R`اسم المتجر [[<h1>]] جوه [[<hgroup>]]`, q: "hgroup > h1", has: "متجر" },
              { say: R`«كل حاجة للرحلة» [[<p>]] جوه [[<hgroup>]]`, q: "hgroup > p", has: "كل حاجة" },
              { say: R`«كشّافات» و «شنط» [[<h2>]]`, q: "h2", n: 2 },
              { say: R`المنتجين [[<h3>]]`, q: "h3", n: 2 },
            ] }, sol: R`~~~live 221 قبل: div وأحجام
<div style="font-size:32px;font-weight:bold">متجر الخيمة</div>
<div>كل حاجة للرحلة</div>
<div style="font-size:24px;font-weight:bold">كشّافات</div>
<div style="font-size:18px;font-weight:bold">كشّاف الرحلات</div>
<div>٤٥٠ جنيه</div>
<div style="font-size:18px;font-weight:bold">كشّاف الراس</div>
<div>٣٠٠ جنيه</div>
<div style="font-size:24px;font-weight:bold">شنط</div>
<div>قريب.</div>
~~~

~~~live 402 بعد: عناوين
<hgroup>
  <h1>متجر الخيمة</h1>
  <p>كل حاجة للرحلة</p>
</hgroup>
<h2>كشّافات</h2>
<h3>كشّاف الرحلات</h3>
<p>٤٥٠ جنيه</p>
<h3>كشّاف الراس</h3>
<p>٣٠٠ جنيه</p>
<h2>شنط</h2>
<p>قريب.</p>
~~~

**إزاي قريت المستويات من الأحجام:** المصمم استخدم ٣ أحجام، فدول ٣ مستويات: الأكبر (32) [[<h1>]]، والأوسط (24) [[<h2>]]، والأصغر (18) [[<h3>]]. والكلام من غير حجم فقرات.

**الشكل اتغيّر شوية:** [[<h3>]] الافتراضي 18.72px مش 18، والعناوين خدت [[margin]] من المتصفح. ده طبيعي: الأحجام والمسافات هترجع زي ما المصمم عايز بالـ CSS، من غير ما نلمس الـ HTML.

**اللي كسبناه:** النسخة الأولى في الشجرة ٩ عناصر [[generic]] ملهاش معنى. التانية فيها فهرس كامل.

**الغلطة الشائعة:** تحوّل «كل حاجة للرحلة» لـ [[<h2>]] عشان هو تحت العنوان الرئيسي. هو شعار، مكانه [[<p>]] جوه [[<hgroup>]].

~~~text الناتج
قبل:   العناوين في الشجرة: 0       div=9
بعد:   h1 h2 h3 h3 h2  (من غير نطّ)     div=0     hgroup=1
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب [[<h4>]] لعنوان قسم تحت الـ [[<h1>]] مباشرة وقال «أصل h2 خطه كبير أوي». اكتبله في ٣ سطور ليه ده غلط ويعمل إيه.`, done: R`كتبت ٣ سطور فيهم: الرقم مستوى مش حجم، ومين بيتأذى من النطّة، والحل بالـ CSS.`, sol: R`**إجابة نموذجية:**

1. الرقم في [[<h4>]] معناه «مستوى رابع في الفهرس»، مش «خط صغير». انت كده قلت إن فيه مستوى ٢ و ٣ بين العنوانين وهم مش موجودين.
2. اللي بيتنقل بقارئ الشاشة بيمشي بالعناوين ومستوياتها، فهيلاقي فجوة ويدوّر على أجزاء ناقصة. والـ validator مش هينبّهك.
3. خليه [[<h2>]] وصغّر خطه بالـ CSS ([[h2 { font-size: 1rem; }]]). الشكل اللي عايزه هيطلع، والمستوى هيفضل صح.

**ليه الإجابة دي:** هي بتفصل بين حاجتين زميلك لخبطهم: المعنى (HTML) والشكل (CSS). وجرّبنا في الدرس إن تصغير [[<h2>]] بالـ CSS بيسيبه [[heading level=2]] في الشجرة.

**الغلطة الشائعة:** تقوله «عشان الـ SEO» وبس. السبب الأقوى إن ناس حقيقية بتتنقل بالعناوين.` }
          ]
        },
        {
          cmd: "المسارات: مطلق ونسبي",
          title: "الـ URL والمسار: منين لفين؟",
          pre: ["css/a و button"],
          ref: [
            { t: "MDN: Creating links (URLs and paths)", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links" },
            { t: "MDN: <base>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/base" },
            { t: "WHATWG: the base element", url: "https://html.spec.whatwg.org/multipage/semantics.html#the-base-element" },
            { t: "WHATWG: the href attribute", url: "https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href" },
            { t: "MDN Curriculum: Semantic HTML (2.5 Links)", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`اللي بيتكتب في [[href]] عنوان، والعنوان ليه تلات أشكال: **URL كامل** ([[https://example.test/about.html]])، أو مسار **من جذر الموقع** ([[/about.html]])، أو مسار **نسبي للملف اللي انت فيه** ([[about.html]] و [[../about.html]]). التلاتة ممكن يوصلوا لنفس الصفحة، بس كل واحد بيبوظ في ظرف مختلف.
ده الدرس اللي بيحل «اللينك شغال عندي وبايظ بعد الرفع». كل حاجة هنا اتجرّبت على نفس الفولدر مرتين: مرة مفتوح كملف ([[file:///]]) ومرة من سيرفر.`,
          example: R`<a href="https://example.test/shop/bikes.html">متجر العجل</a>
<a href="/about.html">عن النادي</a>
<a href="index.html">كل المقالات</a>
<a href="./index.html">كل المقالات</a>
<a href="../about.html">عن النادي</a>
<a href="../img/logo.svg">اللوجو</a>
<a href="../about.html?from=blog#team">فريق النادي</a>`,
          flag: "script",
          lines: [
            R`URL كامل (absolute): فيه البروتوكول واسم الموقع والمسار. بيوصل لنفس المكان من أي صفحة في الدنيا. ده اللي بتستخدمه لموقع غير موقعك.`,
            R`بيبدأ بـ [[/]]: من جذر الموقع (root-relative). «روح لأول الموقع وهات [[about.html]]»، مهما كانت الصفحة الحالية في أنهي فولدر.`,
            R`اسم ملف بس: نسبي للملف (document-relative). «في نفس الفولدر اللي أنا فيه، هات [[index.html]]».`,
            R`نفس اللي قبله بالظبط. [[./]] معناها «الفولدر الحالي»، وكتابتها أو عدمها واحد في اللينكات.`,
            R`[[../]] معناها «اطلع فولدر واحد لفوق»، وبعدين هات [[about.html]] من هناك.`,
            R`اطلع فولدر، وبعدين انزل فولدر [[img]]، وهات الملف. المسار بيتقري من الشمال لليمين خطوة خطوة.`,
            R`مسار، وبعده [[?]] وبيانات للصفحة (query)، وبعده [[#]] واسم جزء جوه الصفحة (fragment). الترتيب ده ثابت.`
          ],
          teach: R`## ليه الدرس ده مهم

MDN بيبدأ درس اللينكات بجملة: اللينكات «هي اللي بتخلّي الويب ويب». ومنهج MDN بيقولها أقوى: «مفيش ويب من غير لينكات». صفحة من غير لينكات ورقة، والموقع هو الصفحات لما تتربط.

واللينك عبارة عن حاجتين: نص بيتداس عليه، وعنوان بيروح له. نص اللينك في درس «download و نص اللينك». هنا العنوان.

كل القياسات من Chrome 157 على Windows 11.

---

## ١. تشريح الـ URL

~~~text
https://example.test/blog/first-ride.html?page=2#comments
~~~

قسّمته في Chrome (بـ [[new URL(...)]] اللي بيفك العنوان لحتته):

| الحتة | قيمتها هنا | معناها |
|---|---|---|
| البروتوكول (scheme) | [[https:]] | طريقة الكلام مع السيرفر. [[https]] هو الويب المشفّر |
| اسم الموقع (host) | [[example.test]] | أنهي سيرفر |
| المسار (path) | [[/blog/first-ride.html]] | أنهي ملف على السيرفر، بالفولدرات |
| البيانات (query) | [[?page=2]] | معلومة زيادة للصفحة. بتبدأ بـ [[?]] |
| الجزء (fragment) | [[#comments]] | مكان جوه الصفحة. بيبدأ بـ [[#]] (درس «#id و mailto و tel») |

أول حتتين مع بعض ([[https://example.test]]) اسمهم origin: «الموقع». والمسار دايمًا بيبدأ بـ [[/]]، والـ [[/]] الأولى دي هي **جذر الموقع**.

---

## ٢. الموقع اللي هنجرّب عليه

فولدر على جهازي اسمه [[club-site]]:

~~~text شجرة الملفات
club-site/
├── index.html
├── about.html
├── contact.html
├── blog/
│   ├── index.html
│   └── first-ride.html      ← احنا هنا
└── img/
    └── logo.svg
~~~

كل التجارب من جوه [[blog/first-ride.html]]. فتحتها مرتين:

- من سيرفر محلي: [[http://127.0.0.1:8125/blog/first-ride.html]]. السيرفر شايف [[club-site]] على إنه الجذر.
- كملف بدبل كليك: [[file:///C:/.../club-site/blog/first-ride.html]] (زي ما عملنا في درس «start index.html و Ctrl+R» في وحدة «من الملف للمتصفح»).

وقريت [[a.href]] لكل لينك: دي الخاصية اللي المتصفح بيحط فيها العنوان الكامل بعد ما يحسبه.

---

## ٣. التلات أشكال، من السيرفر

| المكتوب في [[href]] | النوع | المتصفح حسبه | النتيجة |
|---|---|---|---|
| [[https://example.test/shop/bikes.html]] | URL كامل | زي ما هو | موقع تاني |
| [[/about.html]] | من الجذر | [[http://127.0.0.1:8125/about.html]] | «عن النادي» |
| [[/]] | من الجذر | [[http://127.0.0.1:8125/]] | الرئيسية |
| [[index.html]] | نسبي للملف | [[.../blog/index.html]] | فهرس المدونة |
| [[../about.html]] | نسبي للملف | [[.../about.html]] | «عن النادي» |
| [[about.html]] | نسبي للملف | [[.../blog/about.html]] | **404**: مفيش [[about.html]] جوه [[blog]] |

آخر صف هو أشهر غلطة: كتبت اسم الملف بس، والمتصفح دوّر عليه في **نفس فولدر الصفحة الحالية**.

**القاعدة:** المسار النسبي بيتحسب من مكان **الصفحة اللي فيها اللينك**، مش من الجذر، ومش من مكان ما انت واقف في الترمنال.

---

## ٤. [[./]] و [[../]] بالتفصيل

النقطة الواحدة [[.]] = الفولدر الحالي. النقطتين [[..]] = الفولدر اللي فوقه. ودول نفس [[.]] و [[..]] اللي في الترمنال مع [[cd]].

من [[blog/first-ride.html]] على السيرفر:

| المكتوب | اتحسب | يعني |
|---|---|---|
| [[index.html]] | [[/blog/index.html]] | نفس الفولدر |
| [[./index.html]] | [[/blog/index.html]] | نفس اللي فوقه بالظبط |
| [[./]] أو [[.]] | [[/blog/]] | الفولدر الحالي نفسه (السيرفر بيدّي [[index.html]] بتاعه) |
| [[../about.html]] | [[/about.html]] | اطلع فولدر، وهات الملف |
| [[../]] أو [[..]] | [[/]] | الفولدر اللي فوق: هنا الجذر |
| [[../img/logo.svg]] | [[/img/logo.svg]] | اطلع فولدر، وانزل [[img]] |
| [[../../outside.html]] | [[/outside.html]] | طلعت فوق الجذر: السيرفر وقّفك عند الجذر (404 لأن الملف مش موجود) |

- [[./]] ملهاش لازمة في [[href]]: [[index.html]] و [[./index.html]] واحد. MDN بيقول إنها بتفرق في حاجات تانية (زي [[import]] في JavaScript) ومش في لينكات HTML.
- ممكن تكرر [[../]] : [[../../]] يعني اطلع فولدرين.
- على السيرفر مينفعش تطلع فوق الجذر. على [[file:///]] ينفع: [[../../outside.html]] طلع برّه [[club-site]] خالص لفولدر تاني على القرص. فلينك «شغال عندك» ممكن يكون بيشاور على ملف برّه الموقع ومش هيترفع معاه.

---

## ٥. نفس الصفحة مفتوحة كملف: مين باظ؟

| المكتوب | من السيرفر | من [[file:///]] |
|---|---|---|
| [[../about.html]] | اتفتحت | اتفتحت |
| [[index.html]] | اتفتحت | اتفتحت |
| [[../img/logo.svg]] | اتفتحت | اتفتحت |
| [[/about.html]] | اتفتحت | **باظ**: اتحسب [[file:///C:/about.html]] و Chrome قال [[ERR_FILE_NOT_FOUND]] |
| [[/]] | الرئيسية | **باظ**: فتح قايمة ملفات القرص [[C:]] كله («Index of C:\») |
| [[../]] | الرئيسية | فتح قايمة ملفات الفولدر، مش [[index.html]] |

الشرح: على [[file:///]] مفيش «موقع». الجذر [[/]] بقى جذر القرص نفسه، مش فولدر مشروعك. فكل مسار بيبدأ بـ [[/]] بيدوّر في [[C:]].

والصف الأخير: السيرفر هو اللي بيحوّل «فولدر» لـ [[index.html]] اللي جواه. من غير سيرفر، المتصفح بيعرض محتويات الفولدر. فعلى [[file:///]] اكتب [[../index.html]] كاملة.

**وكمان بيبوظ لما الموقع يترفع جوه فولدر.** جرّبت أشغّل السيرفر من الفولدر اللي فوق، فالموقع بقى على [[http://127.0.0.1:8126/b/club-site/]]:

~~~text الناتج
/about.html      →  http://127.0.0.1:8126/about.html              404
../about.html    →  http://127.0.0.1:8126/b/club-site/about.html  200
~~~

[[/about.html]] راح لجذر السيرفر، وموقعنا مش في الجذر. ده اللي بيحصل في أي استضافة بتحط موقعك تحت [[اسم-الموقع/اسم-المشروع/]].

**الخلاصة العملية:** المسارات النسبية للملف اشتغلت في التلات حالات (سيرفر، وملف، وجوه فولدر). عشان كده مشاريع الوحدة كلها بيها.

---

## ٦. الـ slash اللي في آخر العنوان

[[/blog]] و [[/blog/]] مش واحد. الصفحة [[blog/index.html]] فيها لينك [[first-ride.html]]. فتحتها بالعنوانين من سيرفري (اللي مبيصلّحش حاجة):

~~~text الناتج
العنوان في المتصفح     اللينك first-ride.html اتحسب
/blog/                 /blog/first-ride.html        صح
/blog                  /first-ride.html             غلط: 404
~~~

من غير الـ slash، المتصفح افتكر [[blog]] **ملف** في الجذر، فدوّر على [[first-ride.html]] جنبه. MDN بيشرحها كده: من غيره العنوان بيتعامل كملف.

عشان كده السيرفرات الحقيقية بتصلّحها لوحدها. جرّبت nginx (جوه Docker):

~~~text الناتج
GET /blog    →  301  Location: /blog/
GET /blog/   →  200
~~~

301 يعني «العنوان الصح هو ده، روح له». وانت لما تكتب لينك لفولدر، اكتب الـ slash من الأول ([[blog/]]) أو اسم الملف كامل ([[blog/index.html]]). والتاني هو اللي بيشتغل على [[file:///]] كمان.

---

## ٧. الحروف الكبيرة والصغيرة: «شغال عندي»

الملف اسمه [[about.html]]، وكتبت اللينك [[../About.html]] بحرف كبير.

~~~text الناتج
على ويندوز (file:/// ومن سيرفر Node على ويندوز):    اتفتحت عادي
على لينكس (nginx جوه Docker، نفس الملفات):
  GET /about.html             200
  GET /About.html             404
  GET /Blog/first-ride.html   404
  GET /img/logo.SVG           404
~~~

ويندوز مبيفرّقش بين [[About.html]] و [[about.html]]. لينكس بيفرّق: دول ملفين مختلفين. وأغلب سيرفرات الاستضافة لينكس.

يعني الغلطة دي **مستحيل تشوفها على جهازك**: كل حاجة شغالة، وبعد الرفع اللينك 404. ونفس الكلام على الصور وملفات الـ CSS، وعلى الامتداد ([[.SVG]] مش [[.svg]]).

**قاعدة تسمية بتقفل الباب ده:**

- كل أسامي الملفات والفولدرات حروف إنجليزي **صغيرة**.
- من غير مسافات: شرطة [[-]] بين الكلمات ([[first-ride.html]]).
- من غير عربي في أسامي الملفات (بيشتغل، بس بيتحوّل في العنوان لرموز [[%]] طويلة).

---

## ٨. تلات أخطاء كتابة في المسار

| المكتوب | Chrome عمل إيه | الـ validator |
|---|---|---|
| [[..\about.html]] (backslash بتاعة ويندوز) | صلّحها واتفتحت | [[error: Backslash ("\") used as path segment delimiter.]] |
| [[my file.html]] (مسافة في الاسم) | حوّل المسافة لـ [[%20]] | [[error: Illegal character in path segment: space is not allowed.]] |
| [[C:\Users\ali\club-site\about.html]] (مسار من جهازك) | شغال على جهازك بس | ده مش مسار ويب أصلًا |

Chrome متسامح مع أول اتنين، بس متعتمدش على تسامح متصفح: في العناوين الفاصل دايمًا [[/]]، حتى على ويندوز.

والتالت بيحصل لما تسحب ملف من الفولدر وترميه في المحرر، أو تنسخ العنوان من شريط المتصفح وهو [[file:///C:/...]]. اللينك ده بيشاور على **جهازك انت**، ومش هيشتغل عند أي حد تاني.

---

## ٩. الـ query: [[?key=value]]

اللي بعد [[?]] بيانات بتتبعت مع العنوان، على شكل [[اسم=قيمة]]، وبين كل زوج والتاني [[&]]:

~~~text
search.html?q=helmet&page=2
~~~

- مين بيقراها: كود على السيرفر، أو JavaScript في الصفحة. صفحة HTML ثابتة بتتجاهلها: فتحت [[first-ride.html?page=2]] وطلعت نفس الصفحة بالظبط.
- بتتكتب إزاي: الفورم اللي [[method="get"]] بيبنيها لوحده من الحقول (درس «form و label»، وهتشوفها في درس «search»). وممكن تكتبها بإيدك في [[href]].
- [[href="?page=2"]] لوحدها مسار نسبي برضه: نفس الصفحة الحالية ومعاها الـ query. اتحسبت [[.../blog/first-ride.html?page=2]].
- الترتيب: المسار، ثم [[?query]]، ثم [[#fragment]]. جرّبت [[../about.html?from=blog#team]] واتفتحت «عن النادي» على قسم الفريق.

---

## ١٠. أستخدم أنهي شكل؟

| رايح لـ | الشكل | ليه |
|---|---|---|
| موقع تاني | URL كامل [[https://...]] | مفيش طريقة تانية |
| صفحة في موقعك، والموقع ملفات HTML بتفتحها بدبل كليك | نسبي للملف ([[../about.html]]) | الوحيد اللي بيشتغل على [[file:///]]، ومن سيرفر، وجوه فولدر، وبعد نقل الفولدر |
| صفحة في موقعك، والموقع دايمًا ورا سيرفر في الجذر | من الجذر ([[/about.html]]) | نفس المسار بيتكتب في كل الصفحات مهما كان عمقها، فالـ header يتنسخ زي ما هو |
| صفحة في موقعك بـ URL كامل | متعملهاش | MDN: لو الدومين اتغيّر كل اللينكات هتتغيّر. المسار من غير الدومين «أنقل» |

في الشغل الحقيقي (React و Next وأي موقع ورا سيرفر) هتلاقي [[/about]] من الجذر في كل حتة. وفي الكورس ده، طول ما احنا بنفتح ملفات، النسبي للملف هو الصح.

---

## ١١. [[<base href="...">]]: غيّر نقطة البداية

المسارات النسبية بتتحسب من عنوان الصفحة. [[<base>]] عنصر في [[<head>]] بيقول «احسبهم من العنوان ده بدل عنوان الصفحة». هو void (من غير قفلة) ومبيظهرش.

~~~html
<head>
  <meta charset="utf-8">
  <base href="http://127.0.0.1:8125/">
  <title>أول رحلة</title>
</head>
~~~

حطيته في صفحة جوه [[blog]] وقريت اللينكات:

~~~text الناتج (document.baseURI = http://127.0.0.1:8125/)
first-ride.html    →  http://127.0.0.1:8125/first-ride.html      (مش /blog/first-ride.html)
img/logo.svg       →  http://127.0.0.1:8125/img/logo.svg
?p=2               →  http://127.0.0.1:8125/?p=2
#top               →  http://127.0.0.1:8125/#top                 ← فخ
/about.html        →  http://127.0.0.1:8125/about.html           (زي ما هو)
https://example.test/x  →  زي ما هو
~~~

- كل مسار نسبي بقى يتحسب من الـ [[<base>]]. الـ URL الكامل مبيتأثرش.
- **الفخ:** [[#top]] المفروض ينزّلك جوه نفس الصفحة. مع [[<base>]] بقى [[عنوان-الـ-base#top]]، ولما دوست عليه **خرجت من الصفحة** للرئيسية. MDN بينبّه على ده: لينكات الـ fragment بتتحسب بالـ [[<base>]].
- ونفس النتيجة لما فتحت الصفحة كملف: اللينكات كلها راحت للسيرفر اللي في الـ [[<base>]].

### [[<base target="_blank">]]

[[target]] على [[<base>]] بيحدد كل اللينكات والفورمات اللي ملهاش [[target]] هتفتح فين. جرّبت [[<base target="_blank">]]: اللينك نفسه [[a.target]] بتاعه فاضي، ولما دوست عليه اتفتح في تاب جديدة والصفحة الأصلية فضلت مكانها. ([[target]] وقيمه في درس «target و rel».)

### قواعده

- واحد بس في الصفحة. لو فيه أكتر، المواصفة بتقول أول [[href]] وأول [[target]] هم اللي بيتاخدوا. والـ validator على اتنين: [[error: Element “base” not allowed as child of element “head” in this context.]]
- لازم فيه [[href]] أو [[target]] أو الاتنين. جرّبت [[<base>]] فاضي: [[error: Element “base” is missing one or more of the following attributes: “href”, “target”.]]
- مكانه قبل أي عنصر فيه عنوان (زي [[<link>]])، يعني أول الـ [[<head>]] بعد الـ charset.
- MDN: [[data:]] و [[javascript:]] ممنوعين في [[href]] بتاعه.

**تستخدمه إمتى؟** نادر. بتلاقيه في تطبيقات بتتبني بأدوات وبتترفع جوه فولدر، وفي صفحة HTML بتتبعت كإيميل أو بتتحفظ برّه موقعها. في موقع بتكتبه بإيدك، المسارات النسبية المظبوطة أحسن منه، وفخ الـ [[#]] كفاية يخليك تبعد.

---

## الخلاصة

- [[href]] تلات أشكال: URL كامل لموقع تاني، و [[/...]] من جذر الموقع، ومسار نسبي للملف.
- النسبي بيتحسب من مكان **الصفحة اللي فيها اللينك**. اسم الملف بس = نفس الفولدر. [[../]] = اطلع فولدر.
- [[/...]] بيبوظ على [[file:///]] (بيروح لجذر القرص) ولما الموقع يبقى جوه فولدر. النسبي للملف شغال في الحالتين.
- لينك لفولدر: اكتب [[index.html]] كاملة عشان يشتغل من غير سيرفر.
- أسامي ملفات بحروف صغيرة ومن غير مسافات، والفاصل [[/]] دايمًا: ويندوز بيسامح، ولينكس لأ.
- بعد المسار: [[?query]] ثم [[#fragment]].
- [[<base>]] بيغيّر نقطة حساب كل المسارات النسبية، ومنها [[#id]]. نادر، وليه فخ.`,
          try: R`اعمل فولدر [[paths-lab]] جواه [[index.html]] وفولدر [[pages]] فيه [[about.html]] (الأوامر في الحل، وشرحها في درس «mkdir و ni و touch»). في [[index.html]] حط لينك لـ [[about.html]]، وفي [[about.html]] حط لينكين للرئيسية: واحد [[../index.html]] وواحد [[/index.html]]. افتح [[index.html]] بدبل كليك وجرّب التلاتة، وقبل ما تدوس على كل لينك وقّف الماوس عليه وبص على العنوان اللي Chrome بيكتبه في ركن الشاشة تحت.`,
          sol: R`~~~powershell
mkdir paths-lab/pages
cd paths-lab
ni index.html, pages/about.html
~~~

~~~bash
mkdir -p paths-lab/pages
cd paths-lab
touch index.html pages/about.html
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرئيسية</title>
</head>
<body>
<h1>الرئيسية</h1>
<p><a href="pages/about.html">عن الموقع</a></p>
</body>
</html>
~~~

~~~html about.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عن الموقع</title>
</head>
<body>
<h1>عن الموقع</h1>
<p><a href="../index.html">الرئيسية (نسبي للملف)</a></p>
<p><a href="/index.html">الرئيسية (من الجذر)</a></p>
</body>
</html>
~~~

الملف التاني مكانه [[pages/about.html]].

- لينك «عن الموقع» اشتغل: من الجذر نزل فولدر [[pages]].
- [[../index.html]] اشتغل: من [[pages]] طلع فولدر.
- [[/index.html]] باظ: العنوان اللي في ركن الشاشة [[file:///C:/index.html]] (على ويندوز). المتصفح راح لجذر القرص، مش لفولدر [[paths-lab]].

لو شغّلت نفس الفولدر من سيرفر محلي، التلاتة هيشتغلوا، لأن الجذر ساعتها هو [[paths-lab]].

~~~text الناتج (Chrome على ويندوز، الملفات مفتوحة بدبل كليك)
من index.html:
  pages/about.html   →  file:///C:/.../paths-lab/pages/about.html    اتفتحت
من pages/about.html:
  ../index.html      →  file:///C:/.../paths-lab/index.html          اتفتحت
  /index.html        →  file:///C:/index.html                        ERR_FILE_NOT_FOUND
~~~`,
          deep: {
            why: R`الموقع صفحات كتير في فولدرات، وكل صورة وكل ملف CSS وكل لينك محتاج عنوان. نفس قواعد المسار اللي هنا هي اللي في [[src]] بتاع الصور و [[href]] بتاع [[<link>]] و [[url()]] في الـ CSS و [[import]] في JavaScript. فاللي بيفهمها مرة بيبطّل يخمّن في الأربعة.`,
            how: R`المتصفح عنده «عنوان أساس» (base URL) للصفحة: هو عنوانها، أو اللي في [[<base href>]] لو موجود. لما يلاقي [[href]]: لو فيه بروتوكول يبقى URL كامل ويتاخد زي ما هو. لو بيبدأ بـ [[/]] بياخد الـ origin من الأساس ويحط المسار بعده. غير كده بيشيل اسم الملف من آخر مسار الأساس ويحط المكتوب مكانه، وكل [[../]] بتشيل فولدر من الآخر، وبتقف عند الجذر. و [[?...]] لوحدها بتبدّل الـ query بس، و [[#...]] لوحدها بتبدّل الـ fragment بس. النتيجة بتتحط في [[a.href]].`,
            when: R`نسبي للملف: مواقع الملفات الثابتة، والمشاريع اللي بتتفتح بدبل كليك أو بتتنقل، وكل مشاريع الكورس ده. من الجذر: موقع ورا سيرفر في الجذر (وده أغلب الشغل الحقيقي مع frameworks). URL كامل: مواقع تانية، وحاجات لازم فيها العنوان كله (زي لينك في إيميل). [[<base>]]: لما أداة أو استضافة تفرضه.`,
            mistakes: R`تكتب اسم الملف بس وانت في فولدر تاني ([[about.html]] من جوه [[blog]]). تبدأ بـ [[/]] في موقع بتفتحه كملف. تكتب [[\]] بدل [[/]]. تسمّي [[About.html]] وتكتب اللينك [[about.html]]: شغال على ويندوز و 404 على لينكس. تسيب مسار [[C:\...]] أو [[file:///]] في اللينك. تلينك لفولدر من غير [[index.html]] وتفتح الموقع كملف فتلاقي قايمة ملفات. تحط [[<base>]] وتنسى إن [[#id]] كمان هيتحسب منه.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الموقع على [[https://example.test/]] وشجرته في أول الحل. انت في [[blog/posts/night-ride.html]]. من غير ما تشغّل، اكتب العنوان الكامل اللي كل [[href]] من الستة هيتحسب ليه، وقول مين فيهم هيطلع 404.`, done: R`جاوبت على الستة وطلعوا زي الجدول، ومسكت الاتنين اللي بيبوظوا: [[posts/first-ride.html]] (الفولدر اتكرر) و [[index.html]] (مفيش index جوه posts).`, sol: R`~~~text شجرة الموقع
/
├── index.html
├── guide.html
└── blog/
    ├── index.html
    └── posts/
        ├── first-ride.html
        └── night-ride.html      ← احنا هنا
~~~

| [[href]] | اتحسب | موجود؟ |
|---|---|---|
| [[first-ride.html]] | [[https://example.test/blog/posts/first-ride.html]] | أيوه |
| [[../index.html]] | [[https://example.test/blog/index.html]] | أيوه |
| [[../../guide.html#brakes]] | [[https://example.test/guide.html#brakes]] | أيوه |
| [[/guide.html]] | [[https://example.test/guide.html]] | أيوه (على سيرفر في الجذر) |
| [[posts/first-ride.html]] | [[https://example.test/blog/posts/posts/first-ride.html]] | لأ: 404 |
| [[index.html]] | [[https://example.test/blog/posts/index.html]] | لأ: 404 |

**الطريقة:** شيل اسم الملف من عنوان الصفحة الحالية، يفضل [[/blog/posts/]]. دي نقطة البداية. وبعدين:

- اسم ملف: حطه بعدها.
- كل [[../]]: امسح آخر فولدر. واحدة بتوصّلك [[/blog/]]، واتنين بيوصّلوك [[/]].
- بيبدأ بـ [[/]]: انسى نقطة البداية وابدأ من الجذر.

**الغلطة الشائعة:** الصف الخامس. انت جوه [[posts]] أصلًا، فلما تكتب [[posts/first-ride.html]] بتطلب فولدر [[posts]] تاني جوه [[posts]]. الجار في نفس الفولدر بيتكتب باسمه بس.

~~~text الناتج (new URL(href, 'https://example.test/blog/posts/night-ride.html').href في Chrome)
first-ride.html            →  https://example.test/blog/posts/first-ride.html
../index.html              →  https://example.test/blog/index.html
../../guide.html#brakes    →  https://example.test/guide.html#brakes
/guide.html                →  https://example.test/guide.html
posts/first-ride.html      →  https://example.test/blog/posts/posts/first-ride.html
index.html                 →  https://example.test/blog/posts/index.html
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الملف [[blog/index.html]] في نفس الموقع اللي فات فيه القايمة اللي في أول الحل، وفيها ٥ لينكات كل واحد بايظ بطريقة. صلّحهم بحيث يشتغلوا بدبل كليك ومن سيرفر لينكس.`, done: R`الخمسة بقوا مسارات نسبية للملف، بحروف صغيرة، وبـ [[/]] مش [[\]]، ومفيش ولا واحد بيبدأ بـ [[/]] أو [[C:]].`, work: { h: 200, solAt: 1, start: R`<ul>
  <li><a href="C:\Users\ali\club-site\guide.html">دليل العناية</a></li>
  <li><a href="/index.html">الرئيسية</a></li>
  <li><a href="Posts/First-Ride.html">أول رحلة</a></li>
  <li><a href="posts\night-ride.html">رحلة الليل</a></li>
  <li><a href="guide.html#brakes">فحص الفرامل</a></li>
</ul>`, checks: [
              { say: R`«دليل العناية» بيطلع من [[blog]] بـ [[../guide.html]]`, q: "a[href=\"../guide.html\"]", has: "دليل" },
              { say: R`«الرئيسية» بـ [[../index.html]] مش [[/index.html]]`, q: "a[href=\"../index.html\"]", has: "الرئيسية" },
              { say: R`«أول رحلة» بحروف صغيرة [[posts/first-ride.html]]`, q: "a[href=\"posts/first-ride.html\"]" },
              { say: R`«رحلة الليل» بـ [[/]] مش الشرطة المايلة العكس`, q: "a[href=\"posts/night-ride.html\"]" },
              { say: R`«فحص الفرامل» بـ [[../guide.html#brakes]]`, q: "a[href=\"../guide.html#brakes\"]" },
              { say: R`مفيش مسار بيبدأ بـ [[/]] ولا [[C:]]`, q: "a[href^=\"/\"], a[href^=\"C:\"]", n: 0 },
            ] }, sol: R`~~~html البايظة (blog/index.html)
<ul>
  <li><a href="C:\Users\ali\club-site\guide.html">دليل العناية</a></li>
  <li><a href="/index.html">الرئيسية</a></li>
  <li><a href="Posts/First-Ride.html">أول رحلة</a></li>
  <li><a href="posts\night-ride.html">رحلة الليل</a></li>
  <li><a href="guide.html#brakes">فحص الفرامل</a></li>
</ul>
~~~

~~~html بعد التصليح
<ul>
  <li><a href="../guide.html">دليل العناية</a></li>
  <li><a href="../index.html">الرئيسية</a></li>
  <li><a href="posts/first-ride.html">أول رحلة</a></li>
  <li><a href="posts/night-ride.html">رحلة الليل</a></li>
  <li><a href="../guide.html#brakes">فحص الفرامل</a></li>
</ul>
~~~

| اللينك | كان باظ ليه | التصليح |
|---|---|---|
| ١ | مسار من جهاز اللي كتبه. مش هيشتغل عند حد تاني | [[../guide.html]]: اطلع من [[blog]] |
| ٢ | [[/]] من الجذر: بدبل كليك بيروح لجذر القرص | [[../index.html]] |
| ٣ | حروف كبيرة والملف اسمه صغير: شغال على ويندوز و 404 على لينكس | [[posts/first-ride.html]] |
| ٤ | [[\]] بتاعة ويندوز. Chrome بيصلّحها، والـ validator بيرفضها | [[posts/night-ride.html]] |
| ٥ | [[guide.html]] في الجذر مش جوه [[blog]]: 404 | [[../guide.html#brakes]] |

**الغلطة الشائعة:** تجرّب على جهازك وتلاقي التالت والرابع شغالين فتسيبهم. دول بالذات اللي بيبوظوا بعد الرفع.

~~~text الناتج (المسارات محسوبة من http://127.0.0.1:8125/blog/index.html)
قبل:
  C:\Users\ali\club-site\guide.html  →  file:///C:/Users/ali/club-site/guide.html    (ملف على جهاز اللي كتبه، مش على السيرفر)
  /index.html                        →  /index.html            (من سيرفر في الجذر: 200. بدبل كليك: file:///C:/index.html)
  Posts/First-Ride.html              →  /blog/Posts/First-Ride.html    (nginx على لينكس: 404)
  posts\night-ride.html              →  /blog/posts/night-ride.html    (Chrome صلّح الـ backslash)
  guide.html#brakes                  →  /blog/guide.html#brakes        (404)
بعد:
  ../guide.html                      →  /guide.html
  ../index.html                      →  /index.html
  posts/first-ride.html              →  /blog/posts/first-ride.html
  posts/night-ride.html              →  /blog/posts/night-ride.html
  ../guide.html#brakes               →  /guide.html#brakes
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** موقع صغير لـ «مكتبة الحروف» (اسم متخيل) من ٣ ملفات: [[index.html]] في الجذر، و [[books/index.html]] (قايمة الكتب)، و [[books/kalila.html]] (صفحة كتاب). كل صفحة فيها لينك لكل واحدة من الاتنين التانيين، بمسارات نسبية للملف.`, done: R`الستة لينكات بيفتحوا لما تفتح [[index.html]] بدبل كليك، ولما تنقل فولدر الموقع كله لمكان تاني، ومفيش مسار بيبدأ بـ [[/]].`, sol: R`~~~text شجرة الملفات
library/
├── index.html
└── books/
    ├── index.html
    └── kalila.html
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكتبة الحروف</title>
</head>
<body>
<h1>مكتبة الحروف</h1>
<ul>
  <li><a href="books/index.html">كل الكتب</a></li>
  <li><a href="books/kalila.html">كتاب الشهر: كليلة ودمنة</a></li>
</ul>
</body>
</html>
~~~

الملف التاني [[books/index.html]]:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كل الكتب | مكتبة الحروف</title>
</head>
<body>
<h1>كل الكتب</h1>
<ul>
  <li><a href="kalila.html">كليلة ودمنة</a></li>
</ul>
<p><a href="../index.html">الرئيسية</a></p>
</body>
</html>
~~~

والتالت [[books/kalila.html]]:

~~~html kalila.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كليلة ودمنة | مكتبة الحروف</title>
</head>
<body>
<h1>كليلة ودمنة</h1>
<p>حكايات على لسان الحيوانات.</p>
<p><a href="index.html">كل الكتب</a></p>
<p><a href="../index.html">الرئيسية</a></p>
</body>
</html>
~~~

**المسارات الستة:**

| من | لـ | المسار |
|---|---|---|
| الرئيسية | كل الكتب | [[books/index.html]] |
| الرئيسية | الكتاب | [[books/kalila.html]] |
| كل الكتب | الكتاب | [[kalila.html]] (جاره) |
| كل الكتب | الرئيسية | [[../index.html]] |
| الكتاب | كل الكتب | [[index.html]] (جاره، وهو index بتاع [[books]]) |
| الكتاب | الرئيسية | [[../index.html]] |

**خد بالك:** فيه اتنين [[index.html]]. من جوه [[books]]، [[index.html]] هي بتاعة [[books]]، و [[../index.html]] هي بتاعة الجذر. نفس الاسم ومكانين.

**الغلطة الشائعة:** تكتب في صفحة الكتاب [[href="index.html"]] وتقصد الرئيسية.

~~~text الناتج (الفولدر مفتوح بدبل كليك، وبعدين منقول لمكان تاني)
index.html          →  books/index.html   اتفتحت      books/kalila.html   اتفتحت
books/index.html    →  kalila.html        اتفتحت      ../index.html       اتفتحت
books/kalila.html   →  index.html         اتفتحت (كل الكتب)      ../index.html   اتفتحت (الرئيسية)
6 من 6 قبل النقل، و 6 من 6 بعده
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** خد موقع التمرين اللي فات، وزوّد في [[books/kalila.html]] لينك رابع [[href="/index.html"]]. افتح الصفحة بدبل كليك وجرّبه، وبعدين شغّل الفولدر من سيرفر محلي وجرّبه تاني. (السيرفر في الحل ملف واحد بيتشغّل بـ Node. لو Node مش عندك لسه، اقرا الحل وكمّل.)`, done: R`بدبل كليك اللينك الرابع طلّع [[ERR_FILE_NOT_FOUND]] والتلاتة النسبيين اشتغلوا. من السيرفر الأربعة اشتغلوا. وفهمت إن الجذر اتغيّر من القرص لفولدر الموقع.`, sol: R`الملف ده حطه جوه فولدر [[library]] جنب [[index.html]]:

~~~js server.js
const http = require('http'), fs = require('fs'), path = require('path');
http.createServer((req, res) => {
  let file = path.join(__dirname, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end('404 Not Found'); }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(fs.readFileSync(file));
}).listen(8080, '127.0.0.1', () => console.log('http://127.0.0.1:8080/'));
~~~

~~~bash
node server.js
~~~

وافتح [[http://127.0.0.1:8080/books/kalila.html]]. ولما تخلّص، وقّفه بـ [[Ctrl+C]] في الترمنال.

**السيرفر بيعمل إيه:** بياخد المسار اللي في العنوان، وبيلزقه في مكان الفولدر اللي هو فيه ([[__dirname]])، ولو طلع فولدر بيدّي [[index.html]] اللي جواه، ولو الملف مش موجود بيرد 404. يعني الجذر [[/]] = الفولدر اللي فيه [[server.js]]. وهو سيرفر تجربة لصفحات HTML بس، ومينفعش لحاجة غير جهازك.

**ليه النتيجة اتغيّرت:** [[/index.html]] معناها «من الجذر». بدبل كليك الجذر هو القرص، ومن السيرفر الجذر هو [[library]]. اللينك نفسه متغيّرش، اللي اتغيّر هو الجذر.

**الغلطة الشائعة:** تستنتج إن [[/]] «مبيشتغلش». هو بيشتغل، بس محتاج سيرفر والموقع في جذره.

~~~text الناتج
                          بدبل كليك (file:///)              من السيرفر
index.html                اتفتحت                            200
../index.html             اتفتحت                            200
/index.html               file:///C:/index.html             http://127.0.0.1:8080/index.html
                          ERR_FILE_NOT_FOUND                200
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** صفحة أسعار فيها فهرس صغير بلينكات [[#monthly]] و [[#yearly]]، وحد زوّد في الـ [[<head>]] السطر [[<base href="https://example.test/club/">]] عشان «يظبّط مسارات الصور». من ساعتها الفهرس بيطلّعك برّه الصفحة. اشرح ليه، وصلّحها.`, done: R`عرفت إن [[#monthly]] بقى يتحسب [[https://example.test/club/#monthly]]، وبعد ما شلت الـ [[<base>]] اللينكين رجعوا ينزّلوا جوه الصفحة.`, work: { h: 302, solAt: 1, start: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<base href="https://example.test/club/">
<title>الأسعار</title>
</head>
<body>
<h1>الأسعار</h1>
<ul>
  <li><a href="#monthly">الاشتراك الشهري</a></li>
  <li><a href="#yearly">الاشتراك السنوي</a></li>
</ul>
<h2 id="monthly">الاشتراك الشهري</h2>
<p>٢٠٠ جنيه.</p>
<h2 id="yearly">الاشتراك السنوي</h2>
<p>٢٠٠٠ جنيه.</p>
</body>
</html>`, checks: [
              { say: R`مفيش [[<base>]] في الصفحة`, q: "base", n: 0 },
              { say: R`لينك الشهري لسه [[#monthly]]`, q: "a[href=\"#monthly\"]" },
              { say: R`لينك السنوي لسه [[#yearly]]`, q: "a[href=\"#yearly\"]" },
              { say: R`العنوان ليه [[id="monthly"]]`, q: "h2[id=\"monthly\"]" },
              { say: R`العنوان ليه [[id="yearly"]]`, q: "h2[id=\"yearly\"]" },
            ] }, sol: R`~~~html البايظة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<base href="https://example.test/club/">
<title>الأسعار</title>
</head>
<body>
<h1>الأسعار</h1>
<ul>
  <li><a href="#monthly">الاشتراك الشهري</a></li>
  <li><a href="#yearly">الاشتراك السنوي</a></li>
</ul>
<h2 id="monthly">الاشتراك الشهري</h2>
<p>٢٠٠ جنيه.</p>
<h2 id="yearly">الاشتراك السنوي</h2>
<p>٢٠٠٠ جنيه.</p>
</body>
</html>
~~~

~~~live 302 بعد التصليح: من غير base
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأسعار</title>
</head>
<body>
<h1>الأسعار</h1>
<ul>
  <li><a href="#monthly">الاشتراك الشهري</a></li>
  <li><a href="#yearly">الاشتراك السنوي</a></li>
</ul>
<h2 id="monthly">الاشتراك الشهري</h2>
<p>٢٠٠ جنيه.</p>
<h2 id="yearly">الاشتراك السنوي</h2>
<p>٢٠٠٠ جنيه.</p>
</body>
</html>
~~~

**ليه باظت:** [[#monthly]] مسار نسبي زي أي مسار: «نفس العنوان الأساسي، والجزء ده». من غير [[<base>]] العنوان الأساسي هو عنوان الصفحة، فبتنزل جواها. مع [[<base>]] بقى العنوان الأساسي [[https://example.test/club/]]، فاللينك بقى صفحة تانية.

**التصليح:** شيل الـ [[<base>]] واكتب مسارات الصور نسبية صح. ولو الـ [[<base>]] لازم يفضل، كل لينك داخلي يتكتب باسم الصفحة قبل الـ [[#]]: [[prices.html#monthly]].

**الغلطة الشائعة:** تدوّر على الغلط في الـ [[id]] وفي اللينك، وهم الاتنين مظبوطين. الغلط سطر في الـ [[<head>]].

~~~text الناتج (a.href)
مع base:      #monthly  →  https://example.test/club/#monthly      #yearly  →  https://example.test/club/#yearly
من غير base:  #monthly  →  (عنوان الصفحة)#monthly                   #yearly  →  (عنوان الصفحة)#yearly
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** صاحبك رفع موقعه وبعتلك: «كل حاجة كانت شغالة عندي، وبعد الرفع نص اللينكات والصور 404». اكتبله ٣ أسباب محتملة يدوّر عليهم بالترتيب.`, done: R`كتبت التلاتة: حروف كبيرة وصغيرة، ومسارات بتبدأ بـ [[/]] والموقع جوه فولدر، ومسارات من جهازه ([[C:\]] أو [[file:///]]).`, sol: R`**إجابة نموذجية:**

1. **حروف كبيرة وصغيرة.** الملف اسمه [[About.html]] أو [[Logo.PNG]] واللينك مكتوب بحروف صغيرة (أو العكس). ويندوز مبيفرّقش، وسيرفر لينكس بيفرّق. ده أول حاجة تدوّر عليها لأنها مستحيل تبان على جهازك.
2. **مسارات بتبدأ بـ [[/]].** لو موقعك اترفع جوه فولدر ([[example.test/my-site/]])، [[/about.html]] بيروح لـ [[example.test/about.html]]، برّه موقعك.
3. **مسارات من جهازك.** لينك فيه [[C:\Users\...]] أو [[file:///]]، أو [[../]] بتطلع لملف برّه فولدر الموقع، فالملف مترفعش أصلًا.

**إزاي يتأكد:** يفتح صفحة بايظة على الموقع المرفوع، ويدوس F12 ويفتح تاب Network ويعمل reload: كل سطر أحمر 404 مكتوب جنبه العنوان اللي المتصفح طلبه. يقارن العنوان ده باسم الملف الحقيقي حرف حرف.

**ليه الترتيب ده:** التلاتة اتقاسوا في الدرس: [[/About.html]] رجع 404 من nginx على لينكس و 200 على ويندوز، و [[/about.html]] رجع 404 لما الموقع بقى جوه فولدر، و [[../../outside.html]] على [[file:///]] طلع برّه فولدر الموقع.

**الغلطة الشائعة:** يفتكر إن الاستضافة هي اللي بايظة ويرفع تاني. الملفات مترفوعة صح، واللينكات هي اللي غلط.` }
          ]
        },
        {
          cmd: "#id و mailto و tel",
          title: "لينك لجزء في الصفحة، ولإيميل، ولتليفون",
          pre: ["css/المسارات: مطلق ونسبي"],
          ref: [
            { t: "MDN: <a> (href, skip links)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a" },
            { t: "MDN: Creating links (document fragments, email links)", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links" },
            { t: "WHATWG: the href attribute", url: "https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href" },
            { t: "MDN Curriculum: Semantic HTML (2.5 Links)", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`أي عنصر عليه [[id]] بقى ليه عنوان: [[#]] وبعده الـ [[id]]. لينك [[href="#prices"]] بينزّلك للعنصر ده في نفس الصفحة، و [[about.html#team]] بيفتح صفحة تانية عليه. من هنا بييجي فهرس المحتويات، و «ارجع لفوق»، ولينك «روح للمحتوى».
واللينك مش لازم يروح لصفحة: [[mailto:]] بيفتح رسالة إيميل جاهزة، و [[tel:]] بيفتح الاتصال. في درس «a و button» شفتهم في سطر، وهنا تفاصيلهم واللي بيحصل لما حاجة تبوظ.`,
          example: R`<a href="#main">روح للمحتوى</a>
<nav aria-label="في الصفحة دي">
  <ol>
    <li><a href="#clean">التنضيف</a></li>
    <li><a href="#chain">الجنزير</a></li>
  </ol>
</nav>
<main id="main">
  <h2 id="clean">التنضيف</h2>
  <h2 id="chain">الجنزير</h2>
  <a href="#top">ارجع لأول الصفحة</a>
</main>
<a href="mailto:info@example.test?subject=%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83">ابعتلنا على info@example.test</a>
<a href="tel:+201000000000">اتصل بينا</a>`,
          flag: "script",
          lines: [
            R`لينك تخطّي (skip link): أول حاجة في الصفحة، وبيودّي للعنصر اللي عليه [[id="main"]]. اللي بيتنقل بالكيبورد بيعدّي بيه كل اللي قبل المحتوى.`,
            R`[[<nav>]] للفهرس، و [[aria-label]] بيسمّيه عشان يتفرّق عن أي [[<nav>]] تاني في الصفحة (درس «semantic HTML»).`,
            R`الفهرس [[<ol>]] لأن ترتيبه هو ترتيب الأقسام (درس «ul و ol»).`,
            R`[[href="#clean"]]: علامة [[#]] وبعدها [[id]] العنصر اللي عايز تروح له، بنفس الحروف بالظبط.`,
            R`لينك تاني لقسم تاني. كل [[#...]] لازم يقابله [[id]] واحد في الصفحة.`,
            R`[[</ol>]] بيقفل القايمة المرقّمة: بنود الفهرس خلصت، وأي لينك بعد القفلة دي مش من الفهرس.`,
            R`[[</nav>]] بيقفل منطقة التنقل. قارئ الشاشة بيعرض اللي جواها بس تحت اسم «في الصفحة دي».`,
            R`[[id="main"]] هو الهدف بتاع لينك التخطّي. الـ [[id]] بيتحط على أي عنصر.`,
            R`[[id="clean"]] على العنوان نفسه: لما اللينك يتداس، العنوان ده بييجي أول الشاشة.`,
            R`[[id]] تاني مختلف. الـ [[id]] مينفعش يتكرر في نفس الصفحة.`,
            R`[[#top]] حالة خاصة: بيطلّعك لأول الصفحة حتى لو مفيش عنصر عليه [[id="top"]].`,
            R`[[</main>]] بيقفل المحتوى الرئيسي: لينك الإيميل والتليفون اللي بعده برّه [[<main>]]، ولينك التخطّي مبيعدّيش عليهم.`,
            R`[[mailto:]] ثم العنوان، ثم [[?subject=]] وعنوان الرسالة متشفّر (كلمة «اشتراك»). ونص اللينك فيه الإيميل ظاهر.`,
            R`[[tel:]] ثم الرقم بالصيغة الدولية ([[+]] وكود البلد) ومن غير مسافات.`
          ],
          teach: R`## الفكرة في سطرين

الـ [[id]] اسم فريد لعنصر في الصفحة، و [[#الاسم]] في آخر العنوان معناه «روح للعنصر ده». و [[mailto:]] و [[tel:]] بروتوكولات زي [[https:]]، بس بتفتح برنامج تاني بدل صفحة.

كل القياسات من Chrome 157 على Windows 11، على صفحة طولها حوالي 7000px فيها عناوين متباعدة.

---

## ١. [[id]] و [[#id]]

~~~live 170 فهرس صغير: دوس على أي لينك
<nav aria-label="في الصفحة دي">
  <ol>
    <li><a href="#clean">التنضيف</a></li>
    <li><a href="#chain">الجنزير</a></li>
  </ol>
</nav>
<h2 id="clean">التنضيف</h2>
<p>امسح الجسم بفوطة مبلولة.</p>
<p>ومتستخدمش خرطوم ضغطه عالي.</p>
<p>ونشّف العجلة قبل ما تركنها.</p>
<h2 id="chain">الجنزير</h2>
<p>امسحه بفوطة ناشفة.</p>
<p>وحط نقطة زيت على كل حلقة.</p>
<p>وامسح الزيت الزيادة.</p>
<p><a href="#top">ارجع لأول الصفحة</a></p>
~~~

الصندوق قصير عن قصد عشان الصفحة تبقى أطول منه وتشوف النزول.

اللي حصل لما دوست على «الجنزير» في صفحة التجربة الطويلة:

~~~text الناتج
قبل:   location.hash = (فاضي)    scrollY = 0       history.length = 2
بعد:   location.hash = #chain    scrollY = 2117    history.length = 3
مكان العنوان «الجنزير» من أول الصفحة: 2117px
~~~

- العنوان بقى آخره [[#chain]].
- الصفحة نزلت لحد ما العنوان بقى أول الشاشة بالظبط (2117 = مكانه).
- **اتسجلت خطوة في الـ history.** يعني زرار الرجوع بتاع المتصفح بيرجّعك للمكان اللي كنت فيه: دوست «التنضيف» ثم «الجنزير» ثم رجوع، فرجعت على [[#clean]].
- مفيش تحميل للصفحة من جديد، ومفيش JavaScript.

**ولو فتحت الصفحة والعنوان فيه [[#chain]] من الأول؟** نفس النتيجة: فتحت [[f.html#chain]] والصفحة فتحت نازلة على الجنزير (scrollY = 2117). فتقدر تبعت لحد لينك لقسم معيّن.

---

## ٢. قواعد الـ [[id]]

| القاعدة | اللي اتقاس |
|---|---|
| فريد في الصفحة | لما اتكرر، اللينك راح لأول واحد بس (القسم ٤) |
| من غير مسافات | الـ validator على [[id="our prices"]]: [[error: Bad value “our prices” for attribute “id” on element “h2”: An ID must not contain whitespace.]] |
| الحروف الكبيرة والصغيرة بتفرق | [[href="#Clean"]] والـ [[id="clean"]]: اللينك مودّاش لحتة |
| عربي بيشتغل | [[id="الأسعار"]] و [[href="#الأسعار"]]: نزلت للقسم. بس العنوان بقى [[#%D8%A7%D9%84%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1]] |

آخر صف سبب كفاية إنك تكتب الـ [[id]] إنجليزي: حروف صغيرة وبشرطة بين الكلمات ([[monthly-prices]])، زي أسامي الملفات. العنوان بيفضل مقري لما يتبعت.

والـ [[id]] يوصف **المحتوى** ([[prices]]) مش المكان ([[section-3]]): لو رتّبت الصفحة من جديد الاسم يفضل صح.

---

## ٣. لجزء في صفحة تانية

الـ [[#id]] بيتحط في آخر أي مسار:

~~~html
<a href="about.html#team">فريق النادي</a>
<a href="../guide.html#brakes">فحص الفرامل</a>
<a href="https://example.test/rules.html#helmets">قاعدة الخوذة</a>
~~~

جرّبت [[../about.html?from=blog#team]]: المتصفح فتح «عن النادي» ونزل على قسم الفريق. الـ fragment دايمًا آخر حاجة في العنوان، بعد الـ query.

> الـ fragment مبيتبعتش للسيرفر. هو تعليمات للمتصفح بعد ما الصفحة توصل.

---

## ٤. لما الـ [[id]] يبقى ناقص أو متكرر

نزلت في الصفحة لـ 3000px ودوست على كل واحد:

~~~text الناتج
اللينك                          location.hash    scrollY بعد الضغطة
#brakes  (مفيش id="brakes")     #brakes          3000   (مكانها)
#Clean   (الـ id اسمه clean)    #Clean           3000   (مكانها)
#tips    (id="tips" مرتين)      #tips            4068   (أول واحد بس)
~~~

- **[[id]] مش موجود:** العنوان اتغيّر والصفحة **متحركتش**. مفيش رسالة خطأ في أي حتة. المستخدم بيدوس ومبيحصلش حاجة.
- **[[id]] متكرر:** المتصفح بياخد أول واحد. التاني مش ممكن توصله بلينك. والـ validator بيمسكها:

~~~text Nu Html Checker
error: Duplicate ID “prices”.
warning: The first occurrence of ID “prices” was here.
~~~

اللينك اللي الـ [[id]] بتاعه ناقص الـ validator **مبيمسكوش**: هو بيفحص الـ HTML، مش اللينكات رايحة فين. فبعد أي تغيير في العناوين، دوس على لينكات الفهرس كلها.

---

## ٥. [[#top]] و [[#]] لوحدها

~~~text الناتج (من scrollY = 3000 و 6032)
#top  (ومفيش عنصر عليه id="top")   →  scrollY = 0
#     (فاضية)                        →  scrollY = 0    location.hash = (فاضي)
~~~

الاتنين بيطلّعوك لأول الصفحة. [[#top]] معرّفة في مواصفة HTML كده، فمش محتاج تحط [[id="top"]] على حاجة. (لو فيه عنصر عليه [[id="top"]] فعلًا، اللينك هيروح له هو.)

استخدم [[#top]] للينك «ارجع لفوق». وسيب [[#]] الفاضية: هي اللي الناس بتكتبها في [[<a href="#">]] لما يبقوا عايزين زرار، وشفت في درس «a و button» إن ده غلط.

---

## ٦. لينك التخطّي (skip link)

كل صفحة في الموقع بتبدأ بنفس الـ header ونفس القايمة. اللي بيتنقل بالكيبورد لازم يدوس Tab على كل لينك فيهم، في كل صفحة، قبل ما يوصل للمحتوى. MDN: لينك التخطّي بيتحط في أول [[<body>]] وبيشاور على بداية المحتوى الرئيسي، وبيفيد خصوصًا اللي بيستخدموا أدوات تنقل بطيئة.

~~~live 313 جرّب: دوس جوه الصندوق ثم Tab ثم Enter ثم Tab
<a href="#main">روح للمحتوى</a>
<nav aria-label="الرئيسية">
  <ul>
    <li><a href="#a">الرئيسية</a></li>
    <li><a href="#b">الدليل</a></li>
    <li><a href="#c">المدونة</a></li>
    <li><a href="#d">تواصل</a></li>
  </ul>
</nav>
<main id="main">
  <h1>دليل العناية بالعجلة</h1>
  <p>ابدأ من <a href="#clean2">التنضيف</a>.</p>
  <h2 id="clean2">التنضيف</h2>
  <p>امسح الجسم بفوطة مبلولة.</p>
</main>
~~~

قست ده بالكيبورد على صفحة التجربة:

~~~text الناتج
Tab الأولى:                  الـ focus على لينك «روح للمحتوى»
Enter:                       location.hash = #main ، والصفحة نزلت لأول main
Tab اللي بعدها:              الـ focus على أول لينك **جوه** main  (مش على لينكات القايمة)
~~~

بعد Enter الـ focus نفسه مراحش لعنصر معيّن ([[document.activeElement]] فضل [[body]])، بس Chrome نقل «نقطة بداية التنقل» للهدف، فالـ Tab اللي بعدها كمّلت من هناك. يعني لينك [[#id]] بيحرّك الشاشة **والكيبورد** مع بعض.

في المواقع الحقيقية لينك التخطّي بيبقى مستخبي ويظهر لما ياخد focus. ده سطرين CSS في وحدة الـ accessibility. هنا سيبه ظاهر.

---

## ٧. فهرس محتويات كامل

ده الشكل اللي في الوثائق والمقالات الطويلة: [[<nav>]] فيه [[<ol>]]، والأقسام الفرعية [[<ol>]] جوه الـ [[<li>]] بتاع أبوها (درس «قوايم جوه قوايم»)، وكل عنوان عليه [[id]]، وفي الآخر [[#top]].

~~~live 230 فهرس من مستويين
<h1>دليل العناية بالعجلة</h1>
<nav aria-label="في الصفحة دي">
  <ol>
    <li><a href="#t-clean">التنضيف</a>
      <ol>
        <li><a href="#t-clean-chain">الجنزير</a></li>
      </ol>
    </li>
    <li><a href="#t-air">الهوا</a></li>
  </ol>
</nav>
<h2 id="t-clean">التنضيف</h2>
<p>العجلة النضيفة بتعيش أكتر.</p>
<h3 id="t-clean-chain">الجنزير</h3>
<p>فوطة ناشفة ونقطة زيت.</p>
<h2 id="t-air">الهوا</h2>
<p>اضغط على الكاوتش قبل كل مشوار.</p>
<p><a href="#top">ارجع لأول الصفحة</a></p>
~~~

شكل الفهرس لازم يطابق العناوين: بند لكل [[<h2>]]، وتحته بنود الـ [[<h3>]] بتاعته. لو الاتنين مش شبه بعض، واحد فيهم غلط.

---

## ٨. [[mailto:]]

~~~html
<a href="mailto:info@example.test">ابعتلنا على info@example.test</a>
~~~

المتصفح شايف اللينك ده إزاي:

~~~text الناتج
a.protocol = mailto:      a.pathname = info@example.test      a.search = (فاضي)
~~~

يعني [[mailto:]] بروتوكول، والعنوان هو «المسار». لما يتداس، المتصفح بيسلّمه لبرنامج الإيميل المتظبط على الجهاز، وده بيفتح رسالة جديدة والعنوان في خانة «إلى». (فتح البرنامج نفسه متجرّبش هنا في headless: ده من MDN.)

### عنوان ونص جاهزين

بعد العنوان [[?]] وحقول بنفس شكل الـ query: [[subject]] عنوان الرسالة، و [[body]] نصها، و [[cc]] و [[bcc]] نسخة لحد تاني. وبين كل حقل والتاني [[&]].

~~~html
<a href="mailto:info@example.test?subject=%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%AC%D8%AF%D9%8A%D8%AF&amp;body=%D8%A3%D9%87%D9%84%D9%8B%D8%A7%D8%8C%0A%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B4%D8%AA%D8%B1%D9%83.">اطلب اشتراك بالإيميل (info@example.test)</a>
~~~

الرموز دي هي «اشتراك جديد» و «أهلًا، (سطر جديد) عايز أشترك.» بعد التشفير. MDN: قيمة كل حقل لازم تبقى URL-encoded: المسافة [[%20]]، والسطر الجديد [[%0A]]، وأي حرف مش إنجليزي بيتحوّل لرموز [[%]].

**متشفّرهاش بإيدك.** في Console:

~~~text في Console
encodeURIComponent('اشتراك جديد')
→ '%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%AC%D8%AF%D9%8A%D8%AF'
~~~

**لو كتبتها عربي زي ما هي؟** جرّبت [[href="mailto:info@example.test?subject=اشتراك جديد"]]:

- Chrome شفّرها لوحده: [[a.href]] طلع فيه نفس الرموز.
- الـ validator رفضها: [[error: Bad value ... for attribute “href” on element “a”: Illegal character in query: space is not allowed.]]

فهي بتشتغل في Chrome، بس المكتوب مش عنوان سليم. اكتبها متشفّرة.

و [[&]] بين الحقول بتتكتب في الـ HTML [[&amp;]] (درس «مقدمة HTML والـ Tags»: [[&]] بداية رمز خاص).

### تلات حاجات تعملها دايمًا

- **اكتب الإيميل في نص اللينك.** درس «a و button» قالها: لو مفيش برنامج إيميل متظبط، الضغطة مبتعملش حاجة. العنوان الظاهر بيتنسخ.
- **خلي الـ [[body]] قصير.** هو بداية رسالة، مش فورم.
- **لو محتاج بيانات مترتبة** (اسم، رقم، طلب)، ده شغل [[<form>]] مش [[mailto:]].

---

## ٩. [[tel:]] و [[sms:]]

~~~html
<a href="tel:+201000000000">اتصل على <bdi dir="ltr">+20 100 000 0000</bdi></a>
<a href="sms:+201000000000">ابعت رسالة</a>
~~~

~~~text الناتج
tel:  a.protocol = tel:    a.pathname = +201000000000
sms:  a.protocol = sms:    a.pathname = +201000000000
~~~

- **في الـ [[href]]:** الرقم دولي ([[+]] وكود البلد) ومن غير مسافات ولا أقواس. جرّبت [[tel:+20 100 000 0000]] والـ validator قال: [[error: ... Illegal character in scheme data: space is not allowed.]]
- **في النص:** اكتبه بمسافات عشان يتقري، وجوه [[<bdi dir="ltr">]] عشان الـ [[+]] متتنقلش لآخر الرقم وسط الكلام العربي (درس «lang و dir»).
- **الصيغة الدولية ليه:** [[01000000000]] بيشتغل من جوه البلد بس. اللي فاتح موقعك من برّه محتاج كود البلد.
- على الموبايل [[tel:]] بيفتح شاشة الاتصال والرقم مكتوب. على الكمبيوتر بيعتمد على البرامج المتسطبة، وممكن ميحصلش حاجة. (ده من MDN ودرس «a و button»، ومتجرّبش هنا.)

MDN بيذكر [[sms:]] كمان للرسايل النصية. نفس الشكل.

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[href="#prices"]] ومفيش [[id="prices"]] | العنوان بيتغيّر والصفحة مبتتحركش. من غير أي خطأ |
| نفس الـ [[id]] مرتين | اللينك بيروح للأول بس. الـ validator: [[Duplicate ID]] |
| [[id="Prices"]] و [[href="#prices"]] | مبيتقابلوش: الحروف بتفرق |
| [[id]] فيه مسافة | الـ validator: [[An ID must not contain whitespace.]] |
| كتبت [[#]] جوه الـ [[id]]: [[id="#prices"]] | الـ [[#]] بتاعة اللينك بس. الـ [[id]] من غيرها |
| غيّرت عنوان ونسيت الفهرس | لينك في الفهرس مبيودّيش |
| [[mailto:]] فيه عربي ومسافات من غير تشفير | Chrome بيصلّحه، والـ validator بيرفضه |
| الإيميل مش مكتوب في النص | اللي معندوش برنامج إيميل مش هيعرف يوصلك |
| [[tel:]] برقم محلي أو بمسافات | مبيشتغلش من برّه البلد، والمسافات مرفوضة |
| [[<a name="prices">]] (الطريقة القديمة) | لسه بتشتغل في Chrome (جرّبتها)، بس [[id]] على العنصر نفسه هو الطريقة الحالية |

---

## الخلاصة

- [[id]] فريد، من غير مسافات، إنجليزي بحروف صغيرة. و [[#id]] بيروح له.
- اللينك بيغيّر العنوان، وبينزّل الصفحة، وبيسجّل خطوة في الـ history، وبينقل بداية الـ Tab.
- [[id]] ناقص = ضغطة مبتعملش حاجة، ومن غير أي خطأ. [[id]] متكرر = الأول بس.
- [[#top]] لأول الصفحة من غير ما تعرّف حاجة.
- لينك التخطّي أول عنصر في الصفحة وبيشاور على [[<main>]].
- [[mailto:العنوان?subject=...&body=...]] بقيم متشفّرة، والإيميل ظاهر في النص.
- [[tel:]] برقم دولي من غير مسافات، والنص المقري جوه [[<bdi dir="ltr">]].`,
          try: R`اعمل ملف [[jump.html]] فيه عنوانين [[<h2>]]، وبين كل واحد والتاني ٣٠ فقرة قصيرة (انسخ والصق) عشان الصفحة تطول. حط فوق لينكين: واحد [[#second]] للعنوان التاني اللي عليه [[id="second"]]، وواحد [[#third]] من غير ما تعمل عنصر بالـ [[id]] ده. دوس على كل واحد وبص على شريط العنوان وعلى مكان الصفحة، وبعدين دوس زرار الرجوع.`,
          sol: R`~~~live 200 jump.html (مختصر: ٦ فقرات بدل ٣٠)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة النطّ</title>
</head>
<body>
<p><a href="#second">روح للعنوان التاني</a></p>
<p><a href="#third">روح للعنوان التالت</a></p>
<h2 id="first">العنوان الأول</h2>
<p>فقرة.</p>
<p>فقرة.</p>
<p>فقرة.</p>
<p>فقرة.</p>
<p>فقرة.</p>
<p>فقرة.</p>
<h2 id="second">العنوان التاني</h2>
<p>فقرة.</p>
</body>
</html>
~~~

- **[[#second]]:** شريط العنوان بقى آخره [[#second]] والصفحة نزلت لحد ما العنوان التاني بقى فوق.
- **[[#third]]:** شريط العنوان بقى آخره [[#third]]، والصفحة **فضلت مكانها**. مفيش عنصر بالاسم ده، والمتصفح مقالش حاجة.
- **زرار الرجوع:** كل ضغطة على لينك سجّلت خطوة، فالرجوع بيرجّعك خطوة خطوة: من [[#third]] لـ [[#second]] (والصفحة ترجع تنزل له)، وبعدين لأول الصفحة.

~~~text الناتج (على نسخة الـ ٣٠ فقرة)
#second:   hash = #second    الصفحة نزلت للعنوان التاني
#third:    hash = #third     scrollY متغيّرش
رجوع:      hash = #second    رجعت للعنوان التاني
~~~`,
          deep: {
            why: R`الصفحة الطويلة محتاجة تنقل جواها زي ما الموقع محتاج تنقل بين صفحاته: فهرس، ورجوع لفوق، ولينك يتبعت لحد يفتح على قسم معيّن. و [[mailto:]] و [[tel:]] بيخلّوا التواصل ضغطة واحدة من الموبايل بدل نسخ ولصق. والأربعة شغالين من غير JavaScript.`,
            how: R`لما المتصفح يلاقي fragment في العنوان بيدوّر في الصفحة على عنصر الـ [[id]] بتاعه يساويه بالحرف (ولو مفيش، على [[<a name>]] القديم). لو لقاه: بينزّل الصفحة له، وبيخليه «هدف» الصفحة (الـ CSS بيقدر يمسكه بـ [[:target]])، وبينقل نقطة بداية التنقل بالكيبورد له. لو ملقاش وكان الاسم [[top]] أو فاضي بيطلع لأول الصفحة، وغير كده مبيتحركش. وفي كل الحالات العنوان بيتغيّر وبتتسجل خطوة في الـ history، من غير أي طلب للسيرفر. أما [[mailto:]] و [[tel:]] فالمتصفح بيسلّم العنوان لنظام التشغيل، وهو بيفتح البرنامج المسجّل للبروتوكول ده.`,
            when: R`[[#id]]: فهرس مقال أو وثائق، أسئلة شائعة، لينك من صفحة لقسم في صفحة تانية، «ارجع لفوق»، لينك التخطّي في كل صفحة ليها header. [[mailto:]]: تواصل بسيط، مع العنوان ظاهر. [[tel:]]: أي رقم في موقع بيتفتح من الموبايل (مطعم، عيادة، محل). ولما تحتاج بيانات مترتبة من الزائر: فورم.`,
            mistakes: R`لينك لـ [[id]] مش موجود أو اتغيّر اسمه. [[id]] متكرر (غالبًا من نسخ ولصق قسم). حروف كبيرة في واحد وصغيرة في التاني. [[#]] جوه قيمة الـ [[id]]. [[<a href="#">]] كزرار. عربي ومسافات في [[mailto:]] من غير تشفير، أو [[&]] من غير [[&amp;]]. رقم محلي في [[tel:]]. وإيميل مش ظاهر في نص اللينك.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الصفحة اللي في الحل فيها ٤ لينكات. من غير ما تدوس: كل واحد هيودّيك فين؟`, done: R`جاوبت: الأول لأول «الأسعار» بس، والتاني مش هيتحرك (حرف كبير)، والتالت مش هيتحرك ([[id]] ناقص)، والرابع لأول الصفحة.`, sol: R`~~~live 358 الصفحة
<ol>
  <li><a href="#prices">الأسعار</a></li>
  <li><a href="#Team">الفريق</a></li>
  <li><a href="#contact">تواصل</a></li>
  <li><a href="#top">فوق</a></li>
</ol>
<h2 id="prices">الأسعار</h2>
<p>الاشتراك الشهري ٢٠٠ جنيه.</p>
<h2 id="team">الفريق</h2>
<p>سلمى وكريم.</p>
<h2 id="prices">أسعار الجملة</h2>
<p>للمجموعات من ١٠.</p>
~~~

| اللينك | اللي بيحصل | ليه |
|---|---|---|
| [[#prices]] | بيروح لـ «الأسعار» الأولى | الـ [[id]] متكرر، والمتصفح بياخد الأول. «أسعار الجملة» مستحيل توصلها بلينك |
| [[#Team]] | مبيتحركش | الـ [[id]] اسمه [[team]] بحرف صغير |
| [[#contact]] | مبيتحركش | مفيش عنصر عليه [[id="contact"]] |
| [[#top]] | أول الصفحة | [[#top]] معرّفة لوحدها |

**التصليح:** غيّر الـ [[id]] التاني لـ [[bulk-prices]] وزوّد له بند في الفهرس، واكتب [[#team]] بحرف صغير، وزوّد قسم التواصل أو شيل لينكه.

**الغلطة الشائعة:** تفتكر إن المتصفح هيدّيك خطأ لما الـ [[id]] يبقى ناقص. في التلات حالات العنوان اتغيّر عادي ومفيش أي رسالة.

~~~text الناتج
id متكرر في الصفحة: 1 (prices)
لينكات بتشاور على id مش موجود: 2 (#Team ، #contact)
الـ validator: error: Duplicate ID “prices”.   (ومقالش حاجة عن #Team ولا #contact)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «أسئلة شائعة» لنادي العجلة فيها ٣ أسئلة. فوق: فهرس بالأسئلة التلاتة. كل سؤال [[<h2>]] عليه [[id]] وتحته إجابته، وبعد كل إجابة لينك «ارجع للأسئلة».`, done: R`كل لينك في الفهرس بينزّل لسؤاله، وكل «ارجع للأسئلة» بيرجّع للفهرس، ومفيش [[id]] متكرر، والـ [[id]] كلها إنجليزي بحروف صغيرة.`, work: { h: 480, start: R`أسئلة شائعة
لازم يبقى عندي عجلة؟
لأ، النادي بيأجّر عجل للرحلة بـ ٥٠ جنيه.
الاشتراك بكام؟
٢٠٠ جنيه في الشهر، وأول رحلة مجانًا.
ينفع أجيب ولادي؟
من ١٠ سنين، ومعاهم خوذة.`, checks: [
              { say: R`عنوان الصفحة [[<h1>]]`, q: "h1", has: "أسئلة" },
              { say: R`كل سؤال [[<h2>]] عليه [[id]]`, q: "h2[id]", n: 3 },
              { say: R`الفهرس فيه ٣ لينكات`, q: "ul a, ol a", n: 3 },
              { say: R`٦ لينكات داخلية: ٣ للفهرس و ٣ «ارجع للأسئلة»`, q: "a[href^=\"#\"]", n: 6 },
              { say: R`الفهرس نفسه ليه [[id]] عشان «ارجع للأسئلة» تشاور عليه`, q: ":not(h2)[id]" },
            ] }, sol: R`~~~live 480 faq.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسئلة شائعة | نادي العجلة</title>
</head>
<body>
<main>
  <h1>أسئلة شائعة</h1>
  <nav id="questions" aria-label="الأسئلة">
    <ol>
      <li><a href="#need-bike">لازم يبقى عندي عجلة؟</a></li>
      <li><a href="#price">الاشتراك بكام؟</a></li>
      <li><a href="#kids">ينفع أجيب ولادي؟</a></li>
    </ol>
  </nav>
  <h2 id="need-bike">لازم يبقى عندي عجلة؟</h2>
  <p>لأ، النادي بيأجّر عجل للرحلة بـ ٥٠ جنيه.</p>
  <p><a href="#questions">ارجع للأسئلة</a></p>
  <h2 id="price">الاشتراك بكام؟</h2>
  <p>٢٠٠ جنيه في الشهر، وأول رحلة مجانًا.</p>
  <p><a href="#questions">ارجع للأسئلة</a></p>
  <h2 id="kids">ينفع أجيب ولادي؟</h2>
  <p>من ١٠ سنين، ومعاهم خوذة.</p>
  <p><a href="#questions">ارجع للأسئلة</a></p>
</main>
</body>
</html>
~~~

**ليه كده:**

- الـ [[id]] بيوصف السؤال ([[need-bike]]) مش رقمه ([[q1]]): لو رتّبت الأسئلة من جديد الأسامي تفضل صح.
- [[id="questions"]] على الـ [[<nav>]] نفسه: الـ [[id]] بيتحط على أي عنصر، مش العناوين بس.
- «ارجع للأسئلة» بيشاور على الفهرس مش على [[#top]]، عشان يرجّع القارئ للمكان اللي هيختار منه السؤال الجاي.
- التلات لينكات «ارجع للأسئلة» ليهم نفس النص ونفس الهدف، وده مقبول. اللي مش مقبول نفس النص لأهداف مختلفة (درس «download و نص اللينك»).

**الغلطة الشائعة:** تنسخ قسم السؤال وتلصقه وتنسى تغيّر الـ [[id]]. يبقى عندك اتنين [[id="price"]] واللينك التاني بيروح للأول.

~~~text الناتج
العناوين: h1 h2 h2 h2
اللينكات: 6 كلهم جوه الصفحة، وكل واحد ليه id موجود      id متكرر: 0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فهرس الصفحة اللي في أول الحل فيه ٤ لينكات، وولا واحد فيهم بيشتغل. لاقي السبب في كل واحد وصلّحه.`, done: R`الأربعة بينزّلوا لأقسامهم، والـ validator مبيطلّعش أخطاء على الـ [[id]]، ومفيش [[#]] جوه أي [[id]].`, work: { h: 443, solAt: 1, start: R`<ul>
  <li><a href="#monthly prices">الأسعار الشهرية</a></li>
  <li><a href="#rides">الرحلات</a></li>
  <li><a href="rules">القواعد</a></li>
  <li><a href="#Contact">تواصل</a></li>
</ul>
<h2 id="monthly prices">الأسعار الشهرية</h2>
<p>٢٠٠ جنيه.</p>
<h2 id="#rides">الرحلات</h2>
<p>كل جمعة.</p>
<h2 id="rules">القواعد</h2>
<p>الخوذة إجبارية.</p>
<h2 id="contact">تواصل</h2>
<p>من صفحة التواصل.</p>`, checks: [
              { say: R`الأربع لينكات كلهم بيبدأوا بـ [[#]]`, q: "a[href^=\"#\"]", n: 4 },
              { say: R`مفيش مسافة جوه أي [[id]]`, q: "[id*=\" \"]", n: 0 },
              { say: R`مفيش [[#]] جوه أي [[id]]`, q: "[id^=\"#\"]", n: 0 },
              { say: R`لينك «تواصل» بحروف صغيرة زي الـ [[id]]`, q: "a[href=\"#contact\"]" },
              { say: R`عنوان «تواصل» ليه [[id="contact"]]`, q: "h2[id=\"contact\"]" },
            ] }, sol: R`~~~live 443 البايظة
<ul>
  <li><a href="#monthly prices">الأسعار الشهرية</a></li>
  <li><a href="#rides">الرحلات</a></li>
  <li><a href="rules">القواعد</a></li>
  <li><a href="#Contact">تواصل</a></li>
</ul>
<h2 id="monthly prices">الأسعار الشهرية</h2>
<p>٢٠٠ جنيه.</p>
<h2 id="#rides">الرحلات</h2>
<p>كل جمعة.</p>
<h2 id="rules">القواعد</h2>
<p>الخوذة إجبارية.</p>
<h2 id="contact">تواصل</h2>
<p>من صفحة التواصل.</p>
~~~

~~~live 443 بعد التصليح
<ul>
  <li><a href="#monthly-prices">الأسعار الشهرية</a></li>
  <li><a href="#rides">الرحلات</a></li>
  <li><a href="#rules">القواعد</a></li>
  <li><a href="#contact">تواصل</a></li>
</ul>
<h2 id="monthly-prices">الأسعار الشهرية</h2>
<p>٢٠٠ جنيه.</p>
<h2 id="rides">الرحلات</h2>
<p>كل جمعة.</p>
<h2 id="rules">القواعد</h2>
<p>الخوذة إجبارية.</p>
<h2 id="contact">تواصل</h2>
<p>من صفحة التواصل.</p>
~~~

| اللينك | الغلط | التصليح |
|---|---|---|
| ١ | مسافة في الـ [[id]]: الـ validator بيرفضه | شرطة: [[monthly-prices]] في الاتنين |
| ٢ | [[#]] مكتوبة **جوه** الـ [[id]]. اللينك بيدوّر على [[rides]] والعنصر اسمه [[#rides]] | الـ [[id]] من غير [[#]] |
| ٣ | [[href="rules"]] من غير [[#]]: ده مسار لملف اسمه [[rules]] جنب الصفحة | [[#rules]] |
| ٤ | [[#Contact]] بحرف كبير والـ [[id]] صغير | [[#contact]] |

**القاعدة في سطر:** [[#]] في اللينك بس، والاسم بعدها هو الـ [[id]] بالحرف.

**الغلطة الشائعة:** اللينك التالت. من غير [[#]] المتصفح بيفتح صفحة تانية (وهنا 404)، فبيبان كأن الموقع كله باظ.

~~~text الناتج
البايظة:       لينكات بتشاور على id موجود: 1 من 4 (الأول: Chrome بيقبل المسافة، والـ validator بيرفضها)
               الـ validator: error: Bad value “monthly prices” for attribute “id” on element “h2”: An ID must not contain whitespace.
بعد التصليح:   4 من 4      id متكرر: 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** لينك «اطلب عرض سعر لمجموعة» لنادي العجلة بيفتح إيميل لـ [[groups@example.test]]، وعنوان الرسالة «عرض سعر لمجموعة»، ونصها سطرين: «عدد الأفراد:» و «التاريخ:». هات التشفير من Console.`, done: R`الـ [[href]] مفيهوش مسافات ولا حروف عربي، والـ validator بيقبله، والإيميل ظاهر في نص اللينك، و [[&]] مكتوبة [[&amp;]].`, work: { h: 60, start: R`اطلب عرض سعر لمجموعة (groups@example.test)`, checks: [
              { say: R`اللينك [[mailto:]] لإيميل النادي`, q: "a[href^=\"mailto:groups@example.test\"]", has: "groups@example.test" },
              { say: R`فيه [[subject=]] للعنوان`, q: "a[href*=\"subject=\"]" },
              { say: R`فيه [[body=]] لنص الرسالة`, q: "a[href*=\"body=\"]" },
              { say: R`النص سطرين: السطر الجديد مكتوب [[%0A]]`, q: "a[href*=\"%0A\"]" },
              { say: R`مفيش مسافات ولا حروف عربي جوه الـ [[href]]`, q: "a[href*=\" \"], a[href*=\"عرض\"]", n: 0 },
              { say: R`[[&]] مكتوبة [[&amp;]] في الكود`, q: "a", src: "&amp;" },
            ] }, sol: R`الأول هات القيم متشفّرة من Console (F12 ثم تاب Console):

~~~text في Console
encodeURIComponent('عرض سعر لمجموعة')
→ '%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9'

encodeURIComponent('عدد الأفراد:\nالتاريخ:')
→ '%D8%B9%D8%AF%D8%AF%20%D8%A7%D9%84%D8%A3%D9%81%D8%B1%D8%A7%D8%AF%3A%0A%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%3A'
~~~

[[\n]] جوه النص معناها سطر جديد، وبتطلع [[%0A]].

~~~live 50 اللينك
<p>
  <a href="mailto:groups@example.test?subject=%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9&amp;body=%D8%B9%D8%AF%D8%AF%20%D8%A7%D9%84%D8%A3%D9%81%D8%B1%D8%A7%D8%AF%3A%0A%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%3A">اطلب عرض سعر لمجموعة (groups@example.test)</a>
</p>
~~~

**تركيب العنوان:**

1. [[mailto:]] ثم العنوان.
2. [[?]] ثم [[subject=]] والعنوان المتشفّر.
3. [[&amp;]] ثم [[body=]] والنص المتشفّر.

**ليه [[&amp;]]:** في الـ HTML علامة [[&]] بتبدأ رمز خاص. المتصفح بيحوّل [[&amp;]] لـ [[&]] واحدة قبل ما يستخدم العنوان.

**الغلطة الشائعة:** تشفّر العنوان كله مرة واحدة ومعاه [[mailto:]] و [[?]] و [[=]]. التشفير للقيم بس: اللي بعد [[subject=]] واللي بعد [[body=]].

~~~text الناتج (Chrome قرا اللينك كده)
a.protocol = mailto:      a.pathname = groups@example.test
subject = عرض سعر لمجموعة
body    = عدد الأفراد:
          التاريخ:
الـ validator: صفر رسايل
~~~` },
            { lvl: 'تحدي', t: R`**ابني وجرّب بالكيبورد:** صفحة فيها header جواه قايمة من ٥ لينكات، وبعده [[<main>]] فيه عنوان ولينك واحد. زوّد لينك تخطّي. وبعدين عدّ: كام Tab عشان توصل للينك اللي جوه [[<main>]] من غير لينك التخطّي، وكام بيه؟`, done: R`من غير التخطّي: ٦ مرات Tab. بيه: Tab ثم Enter ثم Tab (٣ ضغطات)، مهما كان عدد لينكات القايمة.`, work: { h: 246, start: R`الرئيسية
الدليل
المدونة
الرحلات
تواصل
رحلات الشهر
سجّل في رحلة الجمعة`, checks: [
              { say: R`الـ [[<header>]] فيه ٥ لينكات`, q: "header a", n: 5 },
              { say: R`جوه [[<main>]] عنوان [[<h1>]]`, q: "main h1" },
              { say: R`جوه [[<main>]] لينك واحد`, q: "main a", n: 1 },
              { say: R`لينك التخطّي أول حاجة في الـ [[<body>]] وقبل الـ [[<header>]]`, q: "body > a[href^=\"#\"] + header" },
              { say: R`الـ [[<main>]] عليه [[id]] يتخطّى ليه اللينك`, q: "main[id]" },
            ] }, sol: R`~~~live 246 skip.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لينك التخطّي</title>
</head>
<body>
<a href="#main">روح للمحتوى</a>
<header>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="#s1">الرئيسية</a></li>
      <li><a href="#s2">الدليل</a></li>
      <li><a href="#s3">المدونة</a></li>
      <li><a href="#s4">الرحلات</a></li>
      <li><a href="#s5">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main">
  <h1>رحلات الشهر</h1>
  <p><a href="#s6">سجّل في رحلة الجمعة</a></p>
</main>
</body>
</html>
~~~

(لينكات القايمة هنا [[#s1]] وأخواتها عشان المعاينة متخرجش من الصندوق. في موقع حقيقي كل واحد مسار صفحة.)

**العدّ:**

- من غير لينك التخطّي: Tab على كل لينك في القايمة (٥) ثم Tab سادسة توصّلك. ولو القايمة ٣٠ لينك، ٣١.
- بيه: Tab واحدة توقف على «روح للمحتوى»، و Enter، و Tab واحدة توصّلك لأول لينك جوه [[<main>]]. التلات ضغطات دول ثابتين.

**ليه أول عنصر في [[<body>]]:** عشان أول Tab تلاقيه. لو حطيته بعد القايمة يبقى ملوش لازمة.

**ليه الهدف [[<main>]]:** هو بداية المحتوى اللي بيختلف من صفحة لصفحة.

**الغلطة الشائعة:** تعمل لينك التخطّي وتنسى [[id="main"]] على الهدف. اللينك يتداس ومبيحصلش حاجة، واللي محتاجه هو بالذات اللي مش هيعرف يبلّغك.

~~~text الناتج (الكيبورد على الصفحة دي في Chrome)
من غير اللينك:   Tab ×6  →  الـ focus على «سجّل في رحلة الجمعة»
بيه:             Tab     →  «روح للمحتوى»
                 Enter   →  location.hash = #main
                 Tab     →  «سجّل في رحلة الجمعة»
~~~` }
          ]
        },
        {
          cmd: "target و rel",
          title: "اللينك يفتح فين؟ وعلاقته بالصفحة التانية",
          pre: ["css/a و button"],
          ref: [
            { t: "MDN: <a> (target, rel, security)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a" },
            { t: "MDN: rel attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel" },
            { t: "WHATWG: links (target, rel, link types)", url: "https://html.spec.whatwg.org/multipage/links.html#linkTypes" },
            { t: "MDN: Creating links (opening in a new tab)", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links" }
          ],
          desc: R`[[target]] بيحدد الصفحة هتتفتح **فين**: نفس التاب (الافتراضي)، أو تاب جديدة ([[_blank]])، أو تاب ليها اسم. و [[rel]] بيوصف **العلاقة** بين صفحتك والصفحة اللي اللينك رايح لها، بكلمات محددة من المواصفة.
في درس «a و button» شفت [[target="_blank" rel="noopener noreferrer"]] في سطر. هنا كل قيمة لوحدها واللي بتغيّره فعلًا، متقاس على صفحتين وسيرفرين: [[window.opener]]، والـ Referer اللي وصل للسيرفر، وعدد التابات.`,
          example: R`<a href="rides.html">جدول الرحلات</a>
<a href="https://example.test/shop/" target="_blank" rel="noopener noreferrer external">متجر العجل (بيفتح في تاب جديدة)</a>
<a href="https://example.test/offer" rel="nofollow">عرض من راعي النادي</a>
<a href="help.html" target="help" rel="help">مساعدة</a>
<a href="post-2.html" rel="next">المقال اللي بعده</a>
<a href="tags/safety.html" rel="tag">الأمان</a>
<a href="license.html" rel="license">رخصة المحتوى</a>`,
          flag: "script",
          lines: [
            R`من غير [[target]]: بيفتح في نفس التاب. ده الافتراضي وهو الصح لأغلب اللينكات.`,
            R`[[target="_blank"]] تاب جديدة. و [[rel]] فيه تلات قيم بينهم مسافة: [[noopener]] و [[noreferrer]] للأمان والخصوصية، و [[external]] معلومة إنه موقع تاني. والنص بيقول إنه هيفتح تاب جديدة.`,
            R`[[rel="nofollow"]]: «اللينك ده مش تزكية مني». لمحركات البحث، والمتصفح مبيعملش بيها حاجة.`,
            R`[[target="help"]] تاب ليها اسم: كل لينك بنفس الاسم بيفتح في نفس التاب دي. و [[rel="help"]] معناها إن الصفحة دي شرح للي حواليه.`,
            R`[[rel="next"]]: الصفحة دي جزء من سلسلة، واللينك للي بعدها. و [[prev]] للي قبلها.`,
            R`[[rel="tag"]]: اللينك لصفحة موضوع (وسم) بينطبق على الصفحة الحالية.`,
            R`[[rel="license"]]: اللينك للرخصة اللي المحتوى الرئيسي للصفحة تحتها.`
          ],
          teach: R`## الفكرة في سطرين

[[target]] سؤال واحد: تفتح فين؟ و [[rel]] قايمة كلمات بتوصف اللينك. تلاتة من الكلمات دي بيغيّروا سلوك المتصفح ([[noopener]] و [[noreferrer]] و [[opener]])، والباقي معلومات لمحركات البحث والأدوات.

التجربة: صفحة [[from.html]] على [[http://127.0.0.1:8125]] فيها اللينكات، وصفحة [[to.html]] بتسجّل [[window.opener]] و [[document.referrer]] و [[history.length]] عند فتحها. ولما اللينك بيروح لموقع «تاني» بيروح لنفس الصفحة على [[http://127.0.0.1:8126]] (بورت مختلف = origin مختلف). الضغط بماوس حقيقي متقلّد في Chrome 157.

---

## ١. [[target]]: تفتح فين؟

| القيمة | اللي بيحصل | اتقاس |
|---|---|---|
| (من غير) أو [[_self]] | نفس التاب | عدد التابات متغيّرش، و [[history.length]] زاد واحد |
| [[_blank]] | تاب جديدة كل مرة | تاب زيادة، و [[history.length]] فيها = 1 |
| اسم من عندك ([[target="help"]]) | تاب بالاسم ده. لو مفتوحة بتتعاد استخدامها | أول ضغطة: تاب زيادة. تاني لينك بنفس الاسم: **نفس التاب** (العدد متغيّرش) |
| [[_parent]] و [[_top]] | للصفحات اللي جوه [[<iframe>]]: الإطار الأب، أو التاب كلها | من MDN. من غير iframe زي [[_self]] |

**الـ underscore جزء من الكلمة.** [[target="blank"]] من غيرها مش غلط في الكتابة: ده اسم تاب. فكل لينكات الصفحة هتفتح في تاب واحدة اسمها blank وتبدّل بعض. غلطة شائعة وصعب تتشاف، لأن أول ضغطة بتفتح تاب جديدة فعلًا.

والأسامي اللي بتبدأ بـ [[_]] محجوزة: جرّبت [[target="_new"]] والـ validator قال [[error: Bad value “_new” for attribute “target” on element “a”: Reserved keyword “new” used.]]

---

## ٢. تاب جديدة: التمن

~~~text الناتج
اللينك                في نفس التاب         target="_blank"
history.length        3                    1
زرار الرجوع           بيرجّع لصفحتك        مطفي: مفيش حاجة يرجع لها
~~~

التاب الجديدة بتبدأ history من الأول. اللي دايس مش هيعرف يرجع بزرار الرجوع، وعلى الموبايل ممكن ميلاحظش أصلًا إن تاب جديدة اتفتحت.

MDN: «تفتح في تاب جديدة ولا لأ، ده لازم يبقى قرار واعي». ونصيحته: الشائع إن اللينكات الخارجية تفتح في تاب جديدة والداخلية في نفس التاب، ولو هتفتح تاب جديدة **قول ده** (أيقونة أو كلمة جنب نص اللينك). وفي صفحة [[<a>]] بيقول إن اللي بيستخدم قارئ شاشة أو عنده ضعف نظر ممكن يتلخبط لما تاب تتفتح فجأة.

| الحالة | تاب جديدة؟ |
|---|---|
| صفحة تانية في موقعك | لأ |
| موقع تاني، والزائر في نص مقال | ممكن، ومكتوب عليه |
| الزائر بيملا فورم، واللينك «الشروط» أو «مساعدة» | أيوه: عشان اللي كتبه ميضيعش |
| ملف PDF | ممكن، ومكتوب عليه النوع والحجم |
| «عشان الزائر ميسيبش موقعي» | لأ. ده قراره هو، والمتصفح مدّيه كليك يمين و Ctrl+click |

---

## ٣. [[window.opener]]: الباب اللي ورا

لما صفحة تفتح صفحة تانية في تاب جديدة، المتصفح زمان كان بيدّي الجديدة مرجع للقديمة اسمه [[window.opener]]. والمرجع ده بيسمح بحاجة واحدة خطيرة: الصفحة الجديدة تغيّر عنوان القديمة.

الجدول ده قلب الدرس. كل الصفوف لينك من موقعي لموقع تاني:

~~~text الناتج (Chrome 157)
اللينك                                    window.opener    Referer اللي وصل للسيرفر التاني
من غير target                             null             http://127.0.0.1:8125/
target="_blank"                           null             http://127.0.0.1:8125/
target="_blank" rel="noopener"            null             http://127.0.0.1:8125/
target="_blank" rel="noreferrer"          null             (مفيش)
target="_blank" rel="noopener noreferrer" null             (مفيش)
target="_blank" rel="opener"              Window           http://127.0.0.1:8125/
target="help"   (اسم، من غير rel)         Window           http://127.0.0.1:8125/
target="help2"  rel="noopener"            null             http://127.0.0.1:8125/
~~~

اللي بيطلع منه:

- **[[_blank]] لوحده بقى آمن.** [[window.opener]] طلع [[null]] من غير أي [[rel]]. MDN: [[target="_blank"]] بقى بيدّي ضمنيًا نفس سلوك [[rel="noopener"]].
- **التاب اللي ليها اسم لأ.** [[target="help"]] من غير [[rel]] ادّى الصفحة التانية [[Window]]. الحماية الضمنية لـ [[_blank]] بس.
- **[[rel="opener"]] بيرجّع السلوك القديم** حتى مع [[_blank]].
- **[[noreferrer]] حاجة تانية:** هو اللي شال الـ Referer.

### الباب ده بيتستخدم في إيه؟

خليت [[to.html]] تنفّذ السطر ده لو لقت [[window.opener]]:

~~~text
window.opener.location = 'http://127.0.0.1:8126/fake.html'
~~~

وفتحتها بلينك عليه [[rel="opener"]]:

~~~text الناتج
التاب الأصلية (اللي كان فيها موقعي) بقت على:  http://127.0.0.1:8126/fake.html
عنوانها (title):  صفحة مزيفة
~~~

الزائر داس على لينك، وراح يقرا في التاب الجديدة، ولما رجع لتاب موقعي لقى صفحة شبهها بتقوله «سجّل دخولك تاني». هو واثق في التاب دي لأنه هو اللي فتحها. ده اسمه tabnabbing. و [[noopener]] بيقفله: الصفحة التانية مبتلاقيش [[window.opener]] أصلًا.

---

## ٤. القيم اللي بتغيّر سلوك المتصفح

### [[<a rel="noopener">]]

«افتح الصفحة، ومتدّيهاش مرجع لصفحتي». [[window.opener]] هناك بيبقى [[null]].

- مع [[_blank]] المتصفحات الحديثة بتعملها لوحدها (اتقاس فوق). MDN بينبّه إن ده في النسخ الجديدة من المتصفحات، وعشان كده كتابتها صريحة لسه شغل نضيف.
- مع تاب باسم ([[target="help"]]) **لازم تكتبها**: مفيش حماية ضمنية (اتقاس فوق).

### [[<a rel="noreferrer">]]

«متقولش للصفحة التانية أنا جاي منين». المتصفح مبيبعتش هيدر Referer، و [[document.referrer]] هناك بيطلع فاضي. وكمان بيعمل شغل [[noopener]] (من MDN والمواصفة، واتقاس: [[null]]).

طب الـ Referer فيه إيه من غيرها؟

~~~text الناتج (من غير أي rel)
لينك لصفحة في نفس الموقع:    Referer = http://127.0.0.1:8125/from.html    (العنوان كامل)
لينك لموقع تاني:             Referer = http://127.0.0.1:8125/             (اسم الموقع بس)
~~~

المتصفح الافتراضي بتاعه إنه يبعت للموقع التاني اسم موقعك بس، من غير مسار الصفحة. فـ [[noreferrer]] بتخبّي حتى اسم الموقع. التحكم الأدق في ده بـ [[referrerpolicy]] (درس «download و نص اللينك»).

**تكتبها إمتى؟** لما متبقاش عايز الموقع التاني يعرف إن الزيارة جاية منك. وخد بالك: هي كمان بتخبّيك من إحصائيات الموقع التاني، فلو بتلينك لشريك عايزه يعرف إنك بتبعتله زوار، متكتبهاش.

### [[<a rel="opener">]]

عكس [[noopener]]: «ادّي الصفحة التانية مرجع لصفحتي حتى مع [[_blank]]». بتحتاجها لما الصفحتين بتوعك وبيكلّموا بعض (نافذة دفع أو تسجيل دخول بترجّع النتيجة للصفحة اللي فتحتها). متكتبهاش على لينك لموقع مش بتاعك.

---

## ٥. قيم بتوصف اللينك (والمتصفح مبيعملش بيها حاجة)

قريت [[a.relList.supports(...)]]: Chrome بيقول [[true]] لـ [[noopener]] و [[false]] لـ [[nofollow]]. يعني القيم اللي جاية المتصفح بيحفظها في الـ DOM وبس: مفيش شكل ولا سلوك بيتغيّر. اللي بيقراها محركات البحث والإضافات والـ CSS بتاعك.

### [[<a rel="nofollow">]]

المواصفة: صاحب الصفحة «مش بيزكّي» الصفحة اللي اللينك رايح لها. MDN: بتقول لعناكب محركات البحث تتجاهل علاقة اللينك ده.

بتتحط على: لينكات كتبها الزوار (تعليقات، منتدى)، والإعلانات واللينكات المدفوعة، وأي موقع بتشاور عليه ومش ضامنه.

### [[<a rel="external">]]

المواصفة: الصفحة اللي اللينك رايح لها مش من نفس الموقع. MDN بيقترح استخدامها مع الـ CSS عشان اللينكات الخارجية تاخد شكل مختلف (أيقونة سهم مثلًا)، وده في وحدة الـ selectors. هي **مبتفتحش** تاب جديدة: ده شغل [[target]].

### باقي القيم

| القيمة | معناها (من المواصفة و MDN) | مثال |
|---|---|---|
| [[<a rel="alternate">]] | نسخة تانية من نفس الصفحة. مع [[hreflang]] بلغة مختلفة تبقى ترجمة، ومع [[type]] تبقى صيغة تانية (PDF) | لينك «English» لنسخة الصفحة الإنجليزي |
| [[<a rel="author">]] | معلومات عن كاتب أقرب [[<article>]]، أو الصفحة كلها لو مفيش. ممكن يبقى [[mailto:]] | اسم الكاتبة تحت عنوان المقال |
| [[<a rel="bookmark">]] | الرابط الدايم (permalink) لأقرب [[<article>]] | «الرابط الدايم» أو تاريخ المقال في قايمة مقالات |
| [[<a rel="help">]] | شرح للعنصر اللي اللينك جواه واللي حواليه | علامة استفهام جنب حقل في فورم |
| [[<a rel="license">]] | المحتوى الرئيسي للصفحة تحت الرخصة اللي في الصفحة دي | «حقوق المحتوى» في الـ footer |
| [[<a rel="next">]] | الصفحة الحالية جزء من سلسلة، ودي اللي بعدها | «المقال اللي بعده»، «الصفحة ٣» |
| [[<a rel="prev">]] | نفس السلسلة، ودي اللي قبلها | «المقال اللي قبله» |
| [[<a rel="search">]] | صفحة أو أداة للبحث في الموقع ده | لينك «بحث متقدم» |
| [[<a rel="tag">]] | وسم (موضوع) بينطبق على الصفحة الحالية | مواضيع المقال تحته |
| [[<a rel="privacy-policy">]] | سياسة الخصوصية: إزاي الموقع بيجمع البيانات ويستخدمها | لينك في الـ footer |
| [[<a rel="terms-of-service">]] | الاتفاق بين صاحب الموقع ومستخدميه | لينك في الـ footer |

ملاحظات صغيرة عليهم:

- [[help]]: MDN بيقول إن المتصفح اللي بيدعمها بيغيّر شكل الماوس لعلامة استفهام. في Chrome 157 قست [[cursor]] على لينك عليه [[rel="help"]]: طلع [[pointer]] زي أي لينك.
- [[tag]]: MDN: مش لسحابة الوسوم (tag cloud)، لأن دي وسوم مجموعة صفحات. [[tag]] لوسم الصفحة اللي اللينك فيها.
- [[prev]] مش [[previous]]، و [[license]] مش [[copyright]]: MDN بيقول إن الصيغ التانية غلط.

> فيه قيم [[rel]] مبتتكتبش على [[<a>]] خالص، مكانها [[<link>]] في الـ [[<head>]]: [[canonical]] و [[icon]] و [[stylesheet]] و [[preload]] وأخواتهم. دول في وحدة الـ [[<head>]].

---

## ٦. أكتر من قيمة

القيم بينها مسافة، والترتيب مش مهم، والتكرار ملوش معنى:

~~~html
<a href="https://example.test/shop/" target="_blank" rel="noopener noreferrer external nofollow">متجر (تاب جديدة)</a>
~~~

~~~text الناتج
a.rel      = "external nofollow"                 (النص زي ما اتكتب)
a.relList  = ["external", "nofollow"]            (قايمة القيم)
~~~

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[target="blank"]] من غير underscore | كل اللينكات بتفتح في تاب واحدة وتبدّل بعض |
| [[target="_blank"]] على كل لينكات الموقع | الزائر بيلاقي ١٠ تابات، وزرار الرجوع ميت في كل واحدة |
| تاب جديدة ومش مكتوب | مفاجأة، خصوصًا لقارئ الشاشة والموبايل |
| تاب باسم لموقع خارجي من غير [[noopener]] | [[window.opener]] = [[Window]]: الصفحة التانية تقدر تبدّل صفحتك |
| [[rel="opener"]] على موقع مش بتاعك | نفس اللي فوق، وانت اللي فتحت الباب |
| تفتكر [[nofollow]] أو [[external]] بيغيّروا حاجة في المتصفح | مبيغيّروش: لا تاب جديدة، ولا شكل، ولا منع |
| تفتكر [[noreferrer]] بيخبّي الزيارة | بيخبّي جايّة منين بس. الزيارة نفسها بتتسجل عادي |
| [[rel="canonical"]] على [[<a>]] | ملهاش معنى هنا: دي قيمة [[<link>]] |

---

## الخلاصة

- الافتراضي نفس التاب، وهو الصح لأغلب اللينكات. [[_blank]] قرار، ويتكتب في نص اللينك.
- [[_blank]] بالـ underscore. من غيرها اسم تاب.
- [[_blank]] في المتصفحات الحديثة مبيدّيش [[window.opener]]. التاب اللي ليها اسم بتدّي: اكتب [[noopener]].
- [[noopener]]: مفيش مرجع لصفحتي. [[noreferrer]]: ومفيش Referer كمان. [[opener]]: رجّع المرجع (لصفحاتك انت بس).
- للينك خارجي في تاب جديدة: [[target="_blank" rel="noopener noreferrer"]]، وشيل [[noreferrer]] لو عايز الموقع التاني يعرف إنك المصدر.
- باقي القيم ([[nofollow]] و [[external]] و [[author]] و [[tag]] و [[next]] و [[prev]] و [[license]]...) معلومات للأدوات، ومبتغيّرش حاجة في المتصفح.`,
          try: R`اعمل ملف [[tabs.html]] فيه تلات لينكات لنفس الصفحة [[other.html]] (اعملها جنبه وفيها عنوان بس): الأول [[target="_blank"]]، والتاني والتالت [[target="reader"]]. دوس على الأول مرتين، وبعدين على التاني ثم التالت، وعدّ التابات اللي اتفتحت.`,
          sol: R`~~~html tabs.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة التابات</title>
</head>
<body>
<h1>تجربة التابات</h1>
<ul>
  <li><a href="other.html" target="_blank">تاب جديدة كل مرة</a></li>
  <li><a href="other.html" target="reader">تاب اسمها reader (١)</a></li>
  <li><a href="other.html" target="reader">تاب اسمها reader (٢)</a></li>
</ul>
</body>
</html>
~~~

~~~html other.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة التانية</title>
</head>
<body>
<h1>الصفحة التانية</h1>
</body>
</html>
~~~

- الأول مرتين: **تابين** جداد. [[_blank]] معناها تاب جديدة من غير اسم، كل مرة.
- التاني: تاب تالتة، واسمها الداخلي [[reader]].
- التالت: **مفيش تاب جديدة**. المتصفح لقى تاب اسمها [[reader]] مفتوحة فحمّل الصفحة فيها.

فالمجموع ٣ تابات جداد من ٤ ضغطات. الاسم ده مبيظهرش في أي حتة قدام المستخدم: هو اسم داخلي ([[window.name]])، وملوش علاقة بالـ [[<title>]].

~~~text الناتج (التجربة من سيرفر محلي في Chrome 157)
target="_blank" مرتين:           +2 تاب
target="reader" أول مرة:         +1 تاب      window.name هناك = reader     history.length = 1
target="reader" تاني مرة:        +0 تاب      نفس التاب                     history.length = 2
~~~`,
          deep: {
            why: R`اللينك بيطلّع الزائر من صفحتك لصفحة مش بتاعتك، وفيه تلات حاجات بتتقرر في اللحظة دي: هيشوفها فين ([[target]])، والصفحة التانية هتعرف إيه عنك وتقدر تعمل إيه في صفحتك ([[noopener]] و [[noreferrer]])، ومحركات البحث هتفهم إيه من اللينك ده (باقي قيم [[rel]]). التلاتة ليهم أثر على أمان الزائر وعلى ترتيب موقعك.`,
            how: R`كل تاب عند المتصفح «سياق تصفح» ليه اسم ([[window.name]]، فاضي في العادي). [[target]] بيدوّر على سياق بالاسم ده: لو لقاه بيحمّل فيه، ولو ملقاش بيفتح واحد جديد ويسمّيه. [[_blank]] دايمًا جديد ومن غير اسم. والسياق الجديد ممكن يبقى «تابع» للي فتحه (وساعتها [[window.opener]] فيه بيشاور على اللي فتحه) أو «مستقل» ([[null]]). [[noopener]] بيخليه مستقل، و [[opener]] بيخليه تابع، والافتراضي مع [[_blank]] بقى مستقل. و [[noreferrer]] بيشيل هيدر Referer من الطلب وبيعمل شغل [[noopener]] معاه. باقي القيم بتتحفظ في [[a.relList]] ومبيترتبش عليها سلوك.`,
            when: R`[[_blank]]: لينك خارجي والزائر في نص حاجة (فورم، مقال طويل)، ومعاه [[rel="noopener noreferrer"]] ونص بيقول كده. تاب باسم: مساعدة أو معاينة بتتفتح كذا مرة ومش عايز كل مرة تاب، ومعاها [[noopener]]. [[nofollow]]: محتوى الزوار والإعلانات. [[author]] و [[tag]] و [[next]] و [[prev]] و [[bookmark]]: المدونات والوثائق. [[license]] و [[privacy-policy]] و [[terms-of-service]]: الـ footer.`,
            mistakes: R`[[target="blank"]] من غير underscore. تاب جديدة لكل لينك في الموقع. تاب جديدة من غير ما تقول. تفتكر إن [[_blank]] لسه بيدّي [[window.opener]] دايمًا (في المتصفحات الحديثة لأ)، أو إن التاب اللي باسم محمية زيه (لأ). [[rel="opener"]] على موقع خارجي. تستنى من [[nofollow]] أو [[external]] سلوك في المتصفح. [[previous]] و [[copyright]] بدل [[prev]] و [[license]]. وقيم [[<link>]] على [[<a>]].`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الخمس لينكات اللي في الحل كلهم من موقعك لموقع تاني. لكل واحد: [[window.opener]] في الصفحة التانية هيبقى إيه؟ وهيوصلها Referer؟`, done: R`جاوبت الخمسة: اتنين بس فيهم [[Window]] (التاب اللي باسم من غير rel، و [[rel="opener"]])، وواحد بس من غير Referer ([[noreferrer]]).`, sol: R`~~~html
<a href="https://example.test/a" target="_blank">١</a>
<a href="https://example.test/b" target="docs">٢</a>
<a href="https://example.test/c" target="_blank" rel="noreferrer">٣</a>
<a href="https://example.test/d" target="_blank" rel="opener">٤</a>
<a href="https://example.test/e" target="docs2" rel="noopener">٥</a>
~~~

| اللينك | [[window.opener]] | Referer | ليه |
|---|---|---|---|
| ١ [[_blank]] | [[null]] | اسم موقعك | [[_blank]] بيعمل [[noopener]] لوحده |
| ٢ تاب باسم | [[Window]] | اسم موقعك | الحماية الضمنية لـ [[_blank]] بس |
| ٣ [[noreferrer]] | [[null]] | مفيش | [[noreferrer]] بيشيل الـ Referer وبيعمل [[noopener]] |
| ٤ [[opener]] | [[Window]] | اسم موقعك | انت اللي طلبت المرجع |
| ٥ تاب باسم و [[noopener]] | [[null]] | اسم موقعك | [[noopener]] قفلها |

**الخطير فيهم:** ٢ و ٤. الصفحة التانية تقدر تبدّل عنوان صفحتك. ٢ أخطر لأنه مش باين: مفيش كلمة في الكود بتقول إن فيه باب مفتوح.

**الغلطة الشائعة:** تحفظ «[[_blank]] محتاج [[noopener]]» وتنسى إن الخطر الحقيقي دلوقتي في التاب اللي ليها اسم.

~~~text الناتج (نفس الحالات، اتقاست في Chrome 157 بين 127.0.0.1:8125 و 127.0.0.1:8126)
1  _blank                     opener=null     Referer=http://127.0.0.1:8125/
2  target بالاسم              opener=Window   Referer=http://127.0.0.1:8125/
3  _blank + noreferrer        opener=null     Referer=(مفيش)
4  _blank + opener            opener=Window   Referer=http://127.0.0.1:8125/
5  target بالاسم + noopener   opener=null     Referer=http://127.0.0.1:8125/
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** فوتر مقال في مدونة نادي العجلة: اسم الكاتبة (لينك لصفحتها)، ومواضيع المقال (اتنين)، والرابط الدايم، ولينك للمقال اللي قبله واللي بعده، ورخصة المحتوى. حط على كل لينك قيمة [[rel]] المناسبة.`, done: R`فيه ٧ لينكات، وكل واحد عليه قيمة واحدة من: [[author]] و [[tag]] و [[bookmark]] و [[prev]] و [[next]] و [[license]]، والـ [[<nav>]] بتاع التنقل بين المقالات ليه اسم.`, work: { h: 300, start: R`رحلة بالليل على الكورنيش
١٥ كيلو بعد المغرب.
كتبتها سلمى فؤاد
المواضيع: رحلات الليل، الأمان
الرابط الدايم للمقال
حقوق المحتوى: انقل بشرط ذكر النادي
المقال اللي قبله: أول رحلة للنادي
المقال اللي بعده: طريق المزارع`, checks: [
              { say: R`لينك الكاتبة [[rel="author"]] جوه [[<footer>]]`, q: "footer a[rel~=\"author\"]", has: "سلمى" },
              { say: R`المواضيع اتنين [[rel="tag"]]`, q: "a[rel~=\"tag\"]", n: 2 },
              { say: R`الرابط الدايم [[rel="bookmark"]]`, q: "a[rel~=\"bookmark\"]" },
              { say: R`الرخصة [[rel="license"]]`, q: "a[rel~=\"license\"]" },
              { say: R`[[prev]] و [[next]] جوه [[<nav>]]`, q: "nav a[rel~=\"prev\"], nav a[rel~=\"next\"]", n: 2 },
              { say: R`سبع لينكات بالظبط`, q: "a[href]", n: 7 },
            ] }, sol: R`~~~live 302 post-footer.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلة بالليل على الكورنيش</title>
</head>
<body>
<article>
  <h1>رحلة بالليل على الكورنيش</h1>
  <p>١٥ كيلو بعد المغرب.</p>
  <footer>
    <p>كتبتها <a href="#author" rel="author">سلمى فؤاد</a></p>
    <p>المواضيع:
      <a href="#tag-night" rel="tag">رحلات الليل</a>،
      <a href="#tag-safety" rel="tag">الأمان</a>
    </p>
    <p><a href="#permalink" rel="bookmark">الرابط الدايم للمقال</a></p>
    <p><a href="#license" rel="license">حقوق المحتوى: انقل بشرط ذكر النادي</a></p>
  </footer>
</article>
<nav aria-label="مقالات تانية">
  <ul>
    <li><a href="#prev" rel="prev">المقال اللي قبله: أول رحلة للنادي</a></li>
    <li><a href="#next" rel="next">المقال اللي بعده: طريق المزارع</a></li>
  </ul>
</nav>
</body>
</html>
~~~

(الـ [[href]] هنا [[#...]] عشان المعاينة. في المدونة الحقيقية كل واحد مسار صفحة: [[authors/salma.html]] و [[tags/night.html]] و [[first-ride.html]]...)

**كل قيمة ليه:**

- [[author]] جوه الـ [[<article>]]: المواصفة بتربطها بأقرب [[<article>]]، فهي كاتبة المقال ده مش الموقع كله.
- [[tag]] مرتين: كل موضوع لينك لوحده.
- [[bookmark]]: العنوان الثابت للمقال، اللي الناس تحفظه وتبعته.
- [[license]]: شروط نقل المحتوى.
- [[prev]] و [[next]] برّه الـ [[<article>]] وجوه [[<nav>]]: دول تنقل بين صفحات، مش جزء من المقال.

**اللي هتشوفه:** سبع لينكات عاديين. القيم دي مبتغيّرش الشكل ولا السلوك.

**الغلطة الشائعة:** تحط [[rel="tag"]] على لينكات قايمة «كل المواضيع» في الصفحة الرئيسية. [[tag]] لوسم الصفحة اللي اللينك فيها.

~~~text الناتج
اللينكات: 7      قيم rel: author ، tag ، tag ، bookmark ، license ، prev ، next
navigation "مقالات تانية" : 2 لينك
شكل وسلوك اللينكات السبعة: زي أي لينك (color و cursor و text-decoration متغيّروش)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** قايمة اللينكات اللي في أول الحل من صفحة «مصادر» في موقع النادي. فيها ٥ مشاكل في [[target]] و [[rel]]. لاقيهم وصلّحهم.`, done: R`مفيش [[target="blank"]]، واللينك الداخلي بيفتح في نفس التاب، وكل لينك بيفتح تاب جديدة مكتوب عليه كده، والتاب اللي باسم عليها [[noopener]]، ومفيش قيمة [[rel]] غلط.`, work: { h: 200, solAt: 1, start: R`<ul>
  <li><a href="guide.html" target="_blank">دليل العناية</a></li>
  <li><a href="https://example.test/maps" target="blank">خرايط المسارات</a></li>
  <li><a href="https://example.test/weather" target="info">حالة الجو</a></li>
  <li><a href="https://example.test/sponsor" rel="opener" target="_blank">راعي النادي</a></li>
  <li><a href="rules.html" rel="copyright">حقوق المحتوى</a></li>
</ul>`, checks: [
              { say: R`مفيش [[target="blank"]] من غير underscore`, q: "a[target=\"blank\"]", n: 0 },
              { say: R`اللينك الداخلي «دليل العناية» من غير [[target]]`, q: "a[href=\"guide.html\"][target]", n: 0 },
              { say: R`كل لينك بيفتح تاب جديدة عليه [[noopener]]`, q: "a[target]:not([rel~=\"noopener\"])", n: 0 },
              { say: R`مفيش [[rel="opener"]]`, q: "a[rel~=\"opener\"]", n: 0 },
              { say: R`«حقوق المحتوى» [[rel="license"]] مش [[copyright]]`, q: "a[href=\"rules.html\"][rel~=\"license\"]" },
            ] }, sol: R`~~~html البايظة
<ul>
  <li><a href="guide.html" target="_blank">دليل العناية</a></li>
  <li><a href="https://example.test/maps" target="blank">خرايط المسارات</a></li>
  <li><a href="https://example.test/weather" target="info">حالة الجو</a></li>
  <li><a href="https://example.test/sponsor" rel="opener" target="_blank">راعي النادي</a></li>
  <li><a href="rules.html" rel="copyright">حقوق المحتوى</a></li>
</ul>
~~~

~~~html بعد التصليح
<ul>
  <li><a href="guide.html">دليل العناية</a></li>
  <li><a href="https://example.test/maps" target="_blank" rel="noopener noreferrer external">خرايط المسارات (تاب جديدة)</a></li>
  <li><a href="https://example.test/weather" target="info" rel="noopener external">حالة الجو (تاب جديدة)</a></li>
  <li><a href="https://example.test/sponsor" target="_blank" rel="noopener external nofollow">راعي النادي (تاب جديدة)</a></li>
  <li><a href="rules.html" rel="license">حقوق المحتوى</a></li>
</ul>
~~~

| اللينك | المشكلة | التصليح |
|---|---|---|
| ١ | صفحة من موقعك في تاب جديدة من غير سبب | شيل [[target]] |
| ٢ | [[blank]] من غير underscore: اسم تاب، وكل اللينكات اللي زيه هتبدّل بعض | [[_blank]]، ومعاه [[rel]] ونص بيقول تاب جديدة |
| ٣ | تاب باسم لموقع خارجي من غير [[noopener]]: [[window.opener]] مفتوح | زوّد [[noopener]] |
| ٤ | [[rel="opener"]] لموقع مش بتاعك، وهو لينك راعي | [[noopener]]، و [[nofollow]] لأنه لينك مدفوع |
| ٥ | [[copyright]] مش قيمة صح | [[license]] |

**ليه التالت ساب [[noreferrer]]:** مفيش مانع موقع الجو يعرف إن الزيارة جاية من النادي. [[noopener]] هو اللي كان ناقص.

**الغلطة الشائعة:** تصلّح [[blank]] وتسيب التالت عشان «مفيهوش غلط إملائي». هو أخطر واحد في الخمسة.

~~~text الناتج (window.opener في الصفحة اللي بتتفتح)
قبل:   ٢ (target="blank")  Window      ٣ (target="info")  Window      ٤ (rel="opener")  Window
بعد:   ٢ null              ٣ null              ٤ null
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل صفحتين: [[from.html]] فيها لينكين لـ [[to.html]]، واحد [[target="_blank"]] وواحد [[target="win"]]، و [[to.html]] بتكتب في الصفحة قيمة [[window.opener]]. شغّلهم من سيرفر محلي (ملف [[server.js]] من تمرين «قارن وقيس» في درس «المسارات: مطلق ونسبي»)، وشوف الفرق. وبعدين زوّد [[rel="noopener"]] على التاني.`, done: R`الأول طلّع [[null]]، والتاني [[Window]]، وبعد [[noopener]] التاني بقى [[null]].`, sol: R`~~~html from.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>من هنا</title>
</head>
<body>
<h1>من هنا</h1>
<p><a href="to.html" target="_blank">تاب جديدة (_blank)</a></p>
<p><a href="to.html" target="win">تاب باسم (win)</a></p>
</body>
</html>
~~~

~~~html to.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هنا</title>
</head>
<body>
<h1>الصفحة اللي اتفتحت</h1>
<p id="out"></p>
<script>
  document.querySelector('#out').textContent =
    'window.opener = ' + (window.opener === null ? 'null' : 'Window');
$__lt/script>
</body>
</html>
~~~

**الـ script بيعمل إيه:** بيمسك الفقرة اللي عليها [[id="out"]] ويكتب فيها كلمة [[null]] لو [[window.opener]] فاضي، أو [[Window]] لو فيه مرجع للصفحة اللي فتحته.

**النتيجة:** [[_blank]] محمي لوحده. التاب اللي باسم لأ، لحد ما تكتب [[rel="noopener"]].

**ليه المتصفحات عملت كده:** [[_blank]] معناه «تاب جديدة وخلاص»، فمحدش محتاج المرجع. التاب اللي باسم غالبًا بتتفتح عشان الصفحتين يكلّموا بعض، فسابوها زي ما هي.

**الغلطة الشائعة:** تجرّب [[_blank]] بس، تلاقيه [[null]]، وتقرر إن [[noopener]] بقت تاريخ.

~~~text الناتج (Chrome 157، من http://127.0.0.1)
target="_blank"                  window.opener = null
target="win"                     window.opener = Window
target="win" rel="noopener"      window.opener = null
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** مدير المشروع قالك «خلي كل اللينكات تفتح في تاب جديدة عشان الناس متسيبش الموقع». اكتبله ٣ سطور: ليه لأ، وإمتى أيوه.`, done: R`كتبت ٣ سطور فيهم: زرار الرجوع، والمفاجأة لقارئ الشاشة والموبايل، والحالات اللي تاب جديدة فيها صح.`, sol: R`**إجابة نموذجية:**

1. التاب الجديدة بتبدأ من غير history: قسناها وطلع [[history.length]] = 1، يعني زرار الرجوع ميت. الزائر اللي عايز يرجع لموقعنا مش هيلاقي الطريق اللي متعوّد عليه، وده بيطفّشه أكتر ما بيمسكه.
2. اللي عايز تاب جديدة عنده كليك يمين و Ctrl+click. لو فرضناها، خدنا منه الاختيار، وفاجئنا اللي بيستخدم قارئ شاشة أو موبايل (MDN بيقول إن ده بيلخبطهم).
3. نفتح تاب جديدة في حالتين: لينك خارجي والزائر في نص حاجة هتضيع (فورم، دفع)، ولينكات المساعدة. ونكتب على اللينك إنه هيفتح تاب جديدة، ونحط [[rel="noopener noreferrer"]].

**ليه الإجابة دي:** بترد على هدف المدير (الناس تفضل) برقم متقاس، وبتدّيه بديل مش «لأ» بس.

**الغلطة الشائعة:** ترد بكلام عن الأمان بس. الأمان اتحل في المتصفحات الحديثة مع [[_blank]]. المشكلة اللي فاضلة هي تجربة الزائر.` }
          ]
        },
        {
          cmd: "download و نص اللينك",
          title: "لينك التحميل، ونص اللينك، واللينك حوالين كارت",
          pre: ["css/target و rel"],
          ref: [
            { t: "MDN: <a> (download, hreflang, ping, referrerpolicy, accessibility)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a" },
            { t: "MDN: Creating links (block-level links, link best practices)", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links" },
            { t: "WHATWG: the download attribute", url: "https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-download" },
            { t: "WHATWG: hyperlink auditing (ping)", url: "https://html.spec.whatwg.org/multipage/links.html#ping" },
            { t: "MDN Curriculum: Semantic HTML (2.5 Links)", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`الدرس ده عن اللي فاضل في [[<a>]]: أربع attributes ([[download]] بينزّل الملف بدل ما يفتحه، و [[hreflang]] بيقول لغة الصفحة التانية، و [[referrerpolicy]] بيتحكم في الـ Referer، و [[ping]] بيبلّغ عنوان تالت بالضغطة)، وأهم حاجة في اللينك كله: **الكلام اللي جواه**.
نص اللينك هو اللي الزائر بيقراه، واللي قارئ الشاشة بينطقه لوحده، واللي محرك البحث بيفهم منه الصفحة التانية عن إيه. «اضغط هنا» مبتقولش حاجة للتلاتة.`,
          example: R`<a href="files/rides-march.pdf" download>حمّل جدول رحلات مارس (PDF، ٢ ميجا)</a>
<a href="files/routes.csv" download="routes-2026.csv">حمّل المسارات (CSV)</a>
<a href="en/index.html" hreflang="en" lang="en">English</a>
<a href="https://example.test/partner" referrerpolicy="no-referrer">موقع شريك النادي</a>
<a href="first-ride.html">
  <h3>أول رحلة للنادي</h3>
  <p>٢٤ كيلو حوالين البحيرة.</p>
</a>`,
          flag: "script",
          lines: [
            R`[[download]] من غير قيمة: المتصفح بينزّل الملف باسمه بدل ما يفتحه. والنص بيقول النوع والحجم قبل ما الزائر يدوس.`,
            R`[[download="routes-2026.csv"]]: بينزّله بالاسم ده بدل اسمه على السيرفر.`,
            R`[[hreflang="en"]] بيقول إن الصفحة اللي اللينك رايح لها إنجليزي. و [[lang="en"]] بيقول إن كلمة «English» نفسها إنجليزي، عشان قارئ الشاشة ينطقها صح.`,
            R`[[referrerpolicy="no-referrer"]]: متبعتش للموقع التاني أي معلومة عن الصفحة اللي الزائر جاي منها.`,
            R`لينك مفتوح حوالين أكتر من عنصر: الكارت كله بيتداس.`,
            R`عنوان الكارت. [[<a>]] مسموح جواه عناوين وفقرات.`,
            R`وصف الكارت. هو كمان جزء من اللينك، ومن اسمه.`,
            R`قفلة اللينك: كل اللي بين [[<a>]] و [[</a>]] منطقة واحدة بتتداس.`
          ],
          teach: R`## الفكرة في سطرين

اللينك وعد: «دوس هنا وهتوصل لكذا». الـ attributes اللي هنا بتغيّر اللي بيحصل بعد الضغطة، ونص اللينك هو الوعد نفسه.

القياسات من Chrome 157 على Windows 11، بسيرفرين محليين ([[127.0.0.1:8125]] هو «موقعي» و [[127.0.0.1:8126]] «موقع تاني»).

---

## ١. [[<a download>]]

من غيره، المتصفح بيفتح اللي يعرف يعرضه (صفحة، صورة، PDF، ملف نصي) وبينزّل الباقي. [[download]] بيقول «نزّله حتى لو تعرف تعرضه».

~~~html
<a href="files/notes.txt">افتح الملاحظات</a>
<a href="files/notes.txt" download>حمّل الملاحظات (TXT)</a>
<a href="files/routes.csv" download="مسارات-2026.csv">حمّل المسارات (CSV)</a>
~~~

دوست على كل واحد وسجّلت اللي حصل:

| اللينك | اتنزّل؟ | اسم الملف | الصفحة |
|---|---|---|---|
| من غير [[download]] | لأ | | اتنقلت وعرضت الملف |
| [[download]] | أيوه | [[notes.txt]] | فضلت مكانها |
| [[download="مسارات-2026.csv"]] | أيوه | [[مسارات-2026.csv]] | فضلت مكانها |
| [[download="routes"]] (من غير امتداد) على ملف CSV | أيوه | [[routes.csv]]: Chrome زوّد الامتداد | فضلت مكانها |
| [[download="2026/notes.txt"]] | أيوه | [[2026_notes.txt]]: الـ [[/]] بقت [[_]] | فضلت مكانها |
| [[download]] على صفحة HTML | أيوه | [[to.html]] | فضلت مكانها |

### القاعدة اللي بتوقّع ناس كتير: نفس الموقع بس

~~~text الناتج
لينك لملف على موقعي (8125) + download            →  اتنزّل
لينك لنفس الملف على الموقع التاني (8126) + download  →  متنزّلش: الصفحة اتنقلت وعرضته
نفس اللينك + download="x.txt"                     →  متنزّلش برضه
~~~

MDN: [[download]] بيشتغل مع عناوين من نفس الـ origin بس (و [[blob:]] و [[data:]]). لأي عنوان تاني المتصفح بيتجاهله ويعمل تنقل عادي.

السبب أمان: لولا كده أي موقع يقدر يخليك تنزّل ملف من موقع تاني باسم مضلل.

### السيرفر كلمته أعلى

السيرفر يقدر يبعت مع الملف هيدر اسمه [[Content-Disposition]] يقول «ده للتنزيل، واسمه كذا». جرّبته:

~~~text الناتج (السيرفر بيرد بـ Content-Disposition: attachment; filename="from-server.txt")
لينك عليه download="my-name.txt"            →  اتنزّل باسم from-server.txt
لينك للموقع التاني ومن غير download خالص     →  اتنزّل برضه، باسم from-server.txt
~~~

- الاسم اللي في الهيدر بيكسب اسم [[download]] (MDN بيقول نفس الكلام).
- والهيدر بينزّل الملف حتى من موقع تاني. فلو الملف على موقع مش بتاعك، [[download]] مش هيساعدك: القرار عند سيرفرهم.

### حالتين كمان

- **[[data:]]**: لينك الـ [[href]] بتاعه بيانات مكتوبة جواه ([[data:text/plain,...]]) ومعاه [[download="hello.txt"]]: اتنزّل ملف [[hello.txt]]. (الـ data URLs في وحدة الصور.)
- **الصفحة مفتوحة كملف ([[file:///]])**: [[download]] **متنفّذش**: Chrome فتح الملف بدل ما ينزّله. جرّب لينكات التحميل من سيرفر.

> في صناديق المعاينة هنا التنزيل مقفول (الصندوق معزول)، فلينكات [[download]] مش هتنزّل حاجة. جرّبها في ملف عندك.

### قول للزائر هو بينزّل إيه

MDN: اللينك اللي مش «تنقل عادي» (تحميل، أو تاب جديدة، أو ملف مش HTML) المفروض نصه يقول اللي هيحصل: النوع والحجم. اللي على باقة نت صغيرة من حقه يعرف إن الملف ١٠ ميجا قبل ما يدوس.

---

## ٢. [[<a hreflang="en">]]

بيقول لغة الصفحة اللي اللينك رايح لها. القيمة كود لغة زي اللي في [[lang]] (درس «lang و dir»).

~~~live 50 لينك لنسخة بلغة تانية
<p><a href="#en" hreflang="en" lang="en">English</a></p>
~~~

المواصفة بتقول عنه «استرشادي بس»، و MDN: «ملوش وظيفة مبنية في المتصفح». قسته: اللينك شكله وسلوكه واسمه في الشجرة زي أي لينك، والقيمة موجودة في [[a.hreflang]] وخلاص.

طب مين بيستفيد؟ محركات البحث والأدوات. ومع [[rel="alternate"]] المعنى بيكمل: [[rel="alternate" hreflang="en"]] يعني «دي ترجمة الصفحة دي بالإنجليزي» (درس «target و rel»).

**متلخبطش بينه وبين [[lang]]:**

| | بيوصف | مين بيستخدمه |
|---|---|---|
| [[hreflang="en"]] | لغة الصفحة **اللي هتتفتح** | محركات البحث والأدوات |
| [[lang="en"]] | لغة **نص اللينك** نفسه | قارئ الشاشة، عشان ينطق «English» إنجليزي |

غالبًا بتكتب الاتنين. والـ validator بيتأكد من الكود: [[hreflang="arabic"]] رجّع [[error: Bad value “arabic” for attribute “hreflang” on element “a”: The language subtag “arabic” is not a valid IANA language part of a language tag.]] الصح [[ar]].

---

## ٣. [[<a referrerpolicy="no-referrer">]]

لما الزائر يدوس على لينك، المتصفح بيبعت للسيرفر التاني هيدر اسمه Referer فيه «الزائر جاي من الصفحة دي». [[referrerpolicy]] بيحدد قد إيه من المعلومة دي يتبعت، لكل لينك لوحده.

قست الهيدر اللي وصل للسيرفر. الصفحة اللي فيها اللينك عنوانها [[http://127.0.0.1:8125/from.html]]:

| القيمة | لصفحة في نفس الموقع | لموقع تاني |
|---|---|---|
| (من غير): الافتراضي [[strict-origin-when-cross-origin]] | العنوان كامل | اسم الموقع بس: [[http://127.0.0.1:8125/]] |
| [[no-referrer]] | مفيش | مفيش |
| [[origin]] | اسم الموقع بس | اسم الموقع بس |
| [[same-origin]] | العنوان كامل | مفيش |
| [[unsafe-url]] | العنوان كامل | **العنوان كامل** |

(الخانات اللي اتقاست فعلًا: الصف الأول كله، و [[no-referrer]] و [[origin]] لنفس الموقع، و [[same-origin]] و [[unsafe-url]] لموقع تاني. الباقي من تعريف القيم في MDN.)

- الافتراضي معقول: موقعك بيعرف المسار كله، والغريب بيعرف اسم موقعك بس.
- [[no-referrer]] لما متبقاش عايز تبعت حاجة خالص. وده نفس اللي [[rel="noreferrer"]] بيعمله في الـ Referer، بس من غير ما يلمس [[window.opener]].
- [[unsafe-url]] اسمه بيقول: MDN بيحذّر إنه بيسرّب مسارات صفحاتك لمواقع تانية. لو المسار فيه رقم طلب أو كلمة بحث، كله بيتبعت.
- فيه قيم تانية ([[no-referrer-when-downgrade]] و [[origin-when-cross-origin]] و [[strict-origin]]) بتفرق بين http و https. جدولها الكامل في MDN.

قيمة غلط بتتمسك: [[referrerpolicy="none"]] رجّع [[error: Bad value “none” for attribute “referrerpolicy” on element “a”.]]

في العادي مش هتكتبه: الافتراضي كويس. بتحتاجه في لينكات من صفحات عنوانها نفسه سر (صفحة إعادة تعيين كلمة السر مثلًا).

---

## ٤. [[<a ping="...">]]

قايمة عناوين (بينها مسافة) المتصفح بيبعتلها «إشعار» لما اللينك يتداس. MDN: «في الغالب للتتبّع»: الموقع بيعرف مين داس على إيه.

~~~html
<a href="to.html" ping="http://127.0.0.1:8125/track http://127.0.0.1:8126/track2">جدول الرحلات</a>
~~~

دوست عليه وبصيت على اللي وصل للسيرفرين:

~~~text الناتج (Chrome 157)
POST /track     body = PING    Content-Type: text/ping
                Ping-From: http://127.0.0.1:8125/from.html
                Ping-To:   http://127.0.0.1:8125/to.html?id=ping
POST /track2    (نفس الشكل، للسيرفر التاني)
والصفحة اتنقلت لـ to.html عادي
~~~

- طلب [[POST]] لكل عنوان، ونصه كلمة [[PING]]، وفيه هيدرين: الصفحة اللي فيها اللينك، والعنوان اللي اللينك رايح له.
- الزائر مبيشوفش حاجة: التنقل بيحصل عادي.
- العناوين لازم تبقى كاملة: جرّبت [[ping="/track"]] والـ validator قال [[error: Bad value “/track” for attribute “ping” on element “a”: Must contain only “http” or “https” URLs.]] (Chrome بعته برضه.)

**متعتمدش عليه:** هو مش Baseline، يعني مش كل المتصفحات الأساسية بتبعته، والمواصفة بتقول إن المتصفح المفروض يسمح للمستخدم يقفله وممكن يتجاهله خالص. فالأرقام اللي بتيجي منه ناقصة. اعرفه عشان لما تشوفه في كود موقع تعرف هو بيعمل إيه.

---

## ٥. نص اللينك

MDN: «المحتوى اللي جوه اللينك لازم يقول اللينك رايح فين، حتى لو اتقري برّه سياقه». وبيسمّي لينك «اضغط هنا» «غلطة منتشرة بشكل مؤسف».

~~~live 50 غلط
<p>لتحميل جدول الرحلات <a href="#rides">اضغط هنا</a>. ولمعرفة الأسعار <a href="#prices">اضغط هنا</a>. <a href="#more">اقرا المزيد</a></p>
~~~

~~~live 50 صح
<p><a href="#rides">حمّل جدول رحلات مارس (PDF، ٢ ميجا)</a>، وشوف <a href="#prices">أسعار الاشتراك</a>.</p>
~~~

ليه «برّه سياقه»؟ لأن قارئ الشاشة عنده اختصار بيعرض **كل لينكات الصفحة كقايمة** (MDN). ودي أسامي اللينكات زي ما Chrome بيدّيها له:

~~~text شجرة الـ accessibility
الغلط:   link "اضغط هنا"      link "اضغط هنا"      link "اقرا المزيد"
الصح:    link "حمّل جدول رحلات مارس (PDF، ٢ ميجا)"      link "أسعار الاشتراك"
~~~

القايمة الأولى ملهاش أي فايدة. و MDN بيزوّد إن ده بيفيد الكل: العين كمان بتعدّي على اللينكات الأول، لأن لونها مختلف.

قواعد MDN، وكل واحدة ليها سبب:

| القاعدة | السبب |
|---|---|
| النص يوصف المكان اللي رايحه | بيتقري لوحده في قايمة اللينكات |
| فيه كلمات الموضوع | محركات البحث بتستخدم نص اللينك عشان تفهم الصفحة اللي رايح لها |
| متكتبش العنوان نفسه كنص | قارئ الشاشة بيقراه حرف حرف |
| متكتبش «لينك لـ...» | قارئ الشاشة بيقول «لينك» لوحده، فالكلمة تكرار |
| قصير | قارئ الشاشة بيقرا النص كله |
| نفس النص = نفس المكان | لينكين «اضغط هنا» لمكانين مختلفين بيلخبطوا |

### لينك من غير كلام خالص

~~~text شجرة الـ accessibility
<a href="cart.html"><svg aria-hidden="true">...</svg></a>          →  link    (من غير اسم)
<a href="cart.html" aria-label="السلة"><svg ...></a>                →  link "السلة"
<a href="index.html"><svg role="img" aria-label="نادي العجلة: الرئيسية">  →  link "نادي العجلة: الرئيسية"
<a href="e.html"></a>                                               →  link    (من غير اسم، ومش باين أصلًا)
~~~

لينك الأيقونة من غير اسم بيتوصله بـ Tab، وقارئ الشاشة بيقول «لينك» بس. الحل: كلام ظاهر جنب الأيقونة (الأحسن)، أو [[aria-label]] على اللينك، أو نص بديل على الصورة نفسها (درس «img»).

و [[title]] مش بديل: جرّبت [[<a title="بيفتح صفحة الأسعار">الأسعار</a>]] واسمه في الشجرة فضل «الأسعار». و MDN بينبّه إن [[title]] بيظهر بالماوس بس، فاللي على كيبورد أو موبايل مش هيشوفه.

---

## ٦. اللينك حوالين بلوك: الكارت اللي كله بيتداس

[[<a>]] مش للكلمة والجملة بس. MDN: تقريبًا أي محتوى ينفع يبقى لينك، حتى العناصر اللي بتاخد سطر لوحدها (block). ده اللي بيعمل كروت المقالات والمنتجات.

~~~live 93 كارت كله لينك
<a href="#first-ride">
  <h3>أول رحلة للنادي</h3>
  <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
</a>
~~~

(الـ [[href]] هنا [[#first-ride]] عشان المعاينة. في الموقع هو مسار الصفحة: [[first-ride.html]].)

~~~text القياس
a:  display = inline          (لسه inline، حتى وجواه h3 و p)
دوست على الفقرة مش على العنوان  →  اتنقلت لـ first-ride.html
في الشجرة:  link "أول رحلة للنادي ٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين."
              heading "أول رحلة للنادي" level=3
              paragraph
~~~

- أي حتة في الكارت بتتداس.
- العنوان فضل عنوان في الفهرس.
- **اسم اللينك بقى كل الكلام اللي جواه.** في كارت صغير ده مقبول. في كارت فيه ٥ سطور وسعر وتقييم، قارئ الشاشة هيقرا كل ده كاسم لينك واحد.

**البديل لما الكارت يكبر:** اللينك حوالين العنوان بس، وباقي الكارت كلام عادي:

~~~live 93 اللينك في العنوان بس
<article>
  <h3><a href="#first-ride">أول رحلة للنادي</a></h3>
  <p>٢٤ كيلو حوالين البحيرة، ومناسبة للمبتدئين.</p>
</article>
~~~

~~~text في الشجرة
article › heading level=3 › link "أول رحلة للنادي"      ، paragraph
~~~

الاسم بقى قصير، بس الفقرة مبقتش بتتداس. (تكبير منطقة الضغط من غير تغيير الاسم بيتعمل بالـ CSS، في وحدة المكونات.)

### اللي ممنوع جوه [[<a>]]

| الممنوع | الـ validator | Chrome بنى إيه |
|---|---|---|
| لينك جوه لينك | [[error: Start tag “a” seen but an element of the same type was already open.]] | قفل الأول لما شاف التاني: [[<a>كارت </a><a>الكاتب</a> باقي الكارت]]. «باقي الكارت» بقى برّه أي لينك |
| [[<button>]] جوه لينك | [[error: The element “button” must not appear as a descendant of the “a” element.]] | سابهم زي ما هم. الضغط على الزرار نقل الصفحة، فالزرار معملش شغله |
| لينك جوه [[<button>]] | [[error: The element “a” must not appear as a descendant of the “button” element.]] | |

القاعدة: عنصر بيتداس مينفعش يبقى جوه عنصر بيتداس. لو الكارت محتاج لينك للمقال **و** زرار «احفظ»، الكارت نفسه ميبقاش لينك: اللينك في العنوان، والزرار جنبه.

وفخ تاني: لينك حوالين [[<div>]] وهو نفسه جوه [[<p>]]. جرّبت [[<p><a href="x.html"><div>...</div></a></p>]]: الـ [[<p>]] اتقفلت قبل الـ [[<div>]] (الفقرة مبتشيلش بلوكات)، فطلع لينك فاضي جوه الفقرة ولينك تاني حوالين الكلام برّاها. اللينك اللي حوالين بلوكات مكانه برّه أي [[<p>]].

---

## ٧. لينك في السطر ولينك بلوك

| | لينك في السطر | لينك حوالين بلوك |
|---|---|---|
| جواه | كلام، أو صورة | عناوين، وفقرات، وصور |
| مكانه | جوه فقرة أو [[<li>]] | مكان ما ينفع [[<div>]]، ومش جوه [[<p>]] |
| مثال | «اقرا [[<a>]]دليل العناية[[</a>]]» | كارت مقال |
| اسمه | الكلمات اللي جواه | كل الكلام اللي جواه |

في الحالتين [[display]] بتاع [[<a>]] نفسه [[inline]] (اتقاس)، وده اللي هتغيّره بالـ CSS لما تنسّق الكروت.

والشكل الافتراضي لأي لينك في Chrome:

~~~text القياس
color = rgb(0, 0, 238)      text-decoration = underline      cursor = pointer      display = inline
~~~

أزرق وتحته خط. واللينك اللي زرته قبل كده بيبقى بنفسجي. الألوان دي وحالات اللينك ([[:hover]] و [[:focus]] و [[:visited]] و [[:active]]) بتتغيّر بالـ CSS، في وحدة الـ selectors.

---

## ٨. ولسه: لينك ولا زرار؟

كل اللي في الوحدة دي للحاجات اللي **بتودّي مكان**. لو الضغطة بتعمل حاجة في نفس الصفحة (تفتح قايمة، تضيف للسلة، تبعت فورم) فده [[<button>]]، والقاعدة وتجربتها في درس «a و button». MDN بيقولها في صفحة [[<a>]]: اللينك للتنقل لعنوان حقيقي بس.

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[download]] على ملف من موقع تاني | بيتجاهله: الملف بيتفتح بدل ما ينزل |
| تجرّب [[download]] بدبل كليك على الصفحة | مبيشتغلش على [[file:///]] |
| لينك تحميل من غير نوع وحجم | الزائر بيتفاجئ بملف كبير |
| [[hreflang]] من غير [[lang]] على نص بلغة تانية | قارئ الشاشة بينطق «English» بنطق عربي |
| «اضغط هنا» و «اقرا المزيد» و «من هنا» | قايمة لينكات ملهاش معنى |
| العنوان نفسه كنص لينك | بيتقري حرف حرف |
| لينك أيقونة من غير اسم | قارئ الشاشة: «لينك» وبس |
| لينك جوه لينك | المتصفح بيفصلهم، والكارت بيتقطع |
| زرار جوه لينك | الزرار بينقل الصفحة بدل ما يعمل شغله |
| لينك حوالين بلوك وهو جوه [[<p>]] | الفقرة بتتقفل واللينك بيتقسم |
| كارت كبير كله لينك | اسم اللينك فقرة كاملة |

---

## الخلاصة

- [[download]] بينزّل بدل ما يفتح، و [[download="اسم"]] بيسمّي الملف. لملفات نفس الموقع بس، ومن سيرفر مش من [[file:///]].
- [[hreflang]] معلومة عن لغة الصفحة التانية. [[lang]] هو اللي بيأثر على نطق النص.
- [[referrerpolicy]] بيحدد اللي بيتبعت في الـ Referer. الافتراضي كويس، و [[no-referrer]] لما متبقاش عايز تبعت حاجة.
- [[ping]] بيبلّغ عنوان تالت بالضغطة. مش Baseline، وللتتبّع.
- نص اللينك يتفهم لوحده، وفيه كلمات الموضوع، ويقول لو فيه تحميل أو تاب جديدة.
- [[<a>]] ينفع حوالين عنوان وفقرة (كارت)، واسمه بيبقى كل اللي جواه. ممنوع جواه لينك أو زرار.`,
          try: R`اعمل ملف [[links.html]] فيه فقرة فيها تلات لينكات كلهم نصهم «هنا» (لتلات صفحات مختلفة: الأسعار، والرحلات، والتواصل). افتحه، ودوس F12، وفي Console اكتب السطر اللي في الحل عشان تشوف اللينكات زي ما قارئ الشاشة بيعرضها كقايمة. وبعدين اكتب النص من جديد وشغّل السطر تاني.`,
          sol: R`~~~live 50 قبل
<p>الأسعار <a href="#prices">هنا</a>، وجدول الرحلات <a href="#rides">هنا</a>، ولو عندك سؤال كلّمنا من <a href="#contact">هنا</a>.</p>
~~~

~~~live 50 بعد
<p>شوف <a href="#prices">أسعار الاشتراك</a> و <a href="#rides">جدول رحلات الشهر</a>، ولو عندك سؤال <a href="#contact">كلّمنا</a>.</p>
~~~

~~~text السطر اللي بيتكتب في Console
[...document.links].map(a => a.textContent)
~~~

[[document.links]] هي كل لينكات الصفحة، و [[map]] بيطلّع من كل لينك الكلام اللي جواه.

في الأولى القايمة «هنا، هنا، هنا»: مفيش طريقة تعرف مين فيهم الأسعار. في التانية كل لينك مفهوم من غير الجملة اللي حواليه، والجملة نفسها بقت أقصر.

**الطريقة:** دوّر في الجملة على الكلمات اللي بتوصف المكان («أسعار الاشتراك») وخليها هي اللينك، وشيل «هنا».

~~~text الناتج
قبل:  ['هنا', 'هنا', 'هنا']
بعد:  ['أسعار الاشتراك', 'جدول رحلات الشهر', 'كلّمنا']
~~~`,
          deep: {
            why: R`الزائر بيقرر يدوس ولا لأ من نص اللينك بس، في أقل من ثانية. وقارئ الشاشة بيعرض اللينكات لوحدها كقايمة. ومحرك البحث بيقرا نص اللينك عشان يعرف الصفحة التانية عن إيه. فنص اللينك بيخدم التلاتة مرة واحدة، وهو أرخص تحسين في أي صفحة: مفيش كود، كلام بس.`,
            how: R`اسم اللينك في شجرة الـ accessibility بيتحسب من محتواه: الكلام اللي جواه، والنص البديل لأي صورة جواه، وكله بيتلزق ورا بعض. [[aria-label]] على اللينك بيبدّل الاسم ده. و [[title]] مبيدخلش في الاسم لما فيه كلام. و [[download]]: لو العنوان من نفس الـ origin (أو [[blob:]] أو [[data:]]) المتصفح بيعامل الرد كتنزيل ويقترح الاسم، إلا لو السيرفر بعت [[Content-Disposition]] باسم تاني. و [[ping]]: بعد ما التنقل يبدأ المتصفح بيبعت POST لكل عنوان في القايمة. و [[referrerpolicy]] بيتطبق على طلب التنقل بتاع اللينك ده بس.`,
            when: R`[[download]]: ملفات من موقعك عايز الزائر يحتفظ بيها (فاتورة، جدول، نموذج). لينك حوالين بلوك: كروت صغيرة (عنوان وسطر). لينك في العنوان بس: كروت كبيرة، أو كروت فيها زراير. [[hreflang]] و [[lang]]: مبدّل اللغة. [[referrerpolicy]]: لينكات من صفحات عنوانها حساس. [[ping]]: تقريبًا لأ.`,
            mistakes: R`«اضغط هنا». عنوان URL كنص. أيقونة من غير اسم. [[title]] بدل نص واضح. [[download]] على ملف من دومين تاني، أو تجربته من [[file:///]]. لينك تحميل من غير نوع وحجم. لينك جوه لينك، أو زرار جوه لينك. لينك حوالين [[<div>]] جوه [[<p>]]. وتعتمد على [[ping]] في إحصائيات.`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح:** الخمس لينكات اللي في أول الحل من صفحة حقيقية الشكل. اكتب نص كل واحد من جديد بحيث يتفهم لوحده.`, done: R`لو قريت أسامي اللينكات الخمسة كقايمة من غير أي كلام حواليهم، تعرف كل واحد رايح فين، واللي بينزّل ملف مكتوب عليه النوع والحجم، واللي بيفتح تاب جديدة مكتوب عليه.`, work: { h: 122, solAt: 1, start: R`<ul>
  <li>جدول رحلات مارس: <a href="#a">اضغط هنا</a></li>
  <li><a href="#b">https://example.test/club/rules/2026/final</a></li>
  <li>عايز تشترك؟ <a href="#c">لينك لصفحة الاشتراك</a></li>
  <li><a href="#d">تحميل</a></li>
  <li>فيديوهات الرحلات <a href="#e" target="_blank" rel="noopener noreferrer">من هنا</a></li>
</ul>`, checks: [
              { say: R`مفيش لينك نصه «اضغط هنا»`, q: "a", has: "اضغط", n: 0 },
              { say: R`مفيش لينك نصه «من هنا»`, q: "a", has: "هنا", n: 0 },
              { say: R`مفيش لينك نصه عنوان [[https]]`, q: "a", has: "https", n: 0 },
              { say: R`مفيش لينك نصه «لينك لـ...»`, q: "a", has: "لينك", n: 0 },
              { say: R`لينك التحميل مكتوب فيه النوع [[PDF]]`, q: "a[href=\"#d\"]", has: "PDF" },
              { say: R`اللينك اللي بيفتح تاب جديدة مكتوب عليه كده`, q: "a[target=\"_blank\"]", has: "تاب جديدة" },
            ] }, sol: R`~~~live 122 قبل
<ul>
  <li>جدول رحلات مارس: <a href="#a">اضغط هنا</a></li>
  <li><a href="#b">https://example.test/club/rules/2026/final</a></li>
  <li>عايز تشترك؟ <a href="#c">لينك لصفحة الاشتراك</a></li>
  <li><a href="#d">تحميل</a></li>
  <li>فيديوهات الرحلات <a href="#e" target="_blank" rel="noopener noreferrer">من هنا</a></li>
</ul>
~~~

~~~live 122 بعد
<ul>
  <li><a href="#a">جدول رحلات مارس</a></li>
  <li><a href="#b">قواعد النادي لسنة ٢٠٢٦</a></li>
  <li><a href="#c">اشترك في النادي</a></li>
  <li><a href="#d">حمّل نموذج الاشتراك (PDF، ٣٠٠ كيلوبايت)</a></li>
  <li><a href="#e" target="_blank" rel="noopener noreferrer">فيديوهات الرحلات (بتفتح في تاب جديدة)</a></li>
</ul>
~~~

| اللينك | المشكلة | التصليح |
|---|---|---|
| ١ | «اضغط هنا»، والموضوع برّه اللينك | الموضوع نفسه بقى اللينك |
| ٢ | العنوان كنص: بيتقري حرف حرف | اسم الصفحة |
| ٣ | «لينك لـ...»: قارئ الشاشة بيقول «لينك» لوحده | فعل واضح: «اشترك في النادي» |
| ٤ | «تحميل»: تحميل إيه؟ وقد إيه؟ | الاسم والنوع والحجم |
| ٥ | «من هنا»، وتاب جديدة من غير تنبيه | الموضوع، والتنبيه في النص |

**الغلطة الشائعة:** تزوّد [[title]] يشرح بدل ما تغيّر النص. [[title]] مبيدخلش في اسم اللينك ومبيظهرش على الموبايل.

~~~text الناتج (أسامي اللينكات في الشجرة)
قبل:  "اضغط هنا" ، "https://example.test/club/rules/2026/final" ، "لينك لصفحة الاشتراك" ، "تحميل" ، "من هنا"
بعد:  "جدول رحلات مارس" ، "قواعد النادي لسنة ٢٠٢٦" ، "اشترك في النادي" ،
      "حمّل نموذج الاشتراك (PDF، ٣٠٠ كيلوبايت)" ، "فيديوهات الرحلات (بتفتح في تاب جديدة)"
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحتك على [[https://club.example.test/files.html]]. لكل لينك من الخمسة اللي في الحل: هينزّل ملف ولا هيفتحه؟ ولو نزّل، اسمه إيه؟`, done: R`جاوبت: الأول والتاني والخامس بينزّلوا (بأسامي [[rides.pdf]] و [[march.pdf]] و [[2026_rides.pdf]])، والتالت والرابع بيفتحوا.`, sol: R`~~~html
<a href="rides.pdf" download>١</a>
<a href="rides.pdf" download="march.pdf">٢</a>
<a href="rides.pdf">٣</a>
<a href="https://cdn.example.test/rides.pdf" download>٤</a>
<a href="rides.pdf" download="2026/rides.pdf">٥</a>
~~~

| اللينك | النتيجة | ليه |
|---|---|---|
| ١ | بينزّل [[rides.pdf]] | نفس الموقع، ومن غير اسم: بياخد آخر حتة في المسار |
| ٢ | بينزّل [[march.pdf]] | القيمة هي الاسم |
| ٣ | بيفتح في المتصفح | مفيش [[download]]، والمتصفح بيعرف يعرض PDF |
| ٤ | بيفتح في المتصفح | [[cdn.example.test]] مش نفس الـ origin بتاع [[club.example.test]]: [[download]] بيتجاهل |
| ٥ | بينزّل [[2026_rides.pdf]] | الـ [[/]] في الاسم بتتحوّل [[_]] |

**خد بالك من الرابع:** الدومين الفرعي ([[cdn.]]) origin مختلف، حتى لو الموقعين بتوعك. الـ origin هو البروتوكول واسم الموقع كله والبورت.

**الاستثناء:** لو سيرفر الملف بعت [[Content-Disposition: attachment]]، الملف بينزل في كل الحالات، وبالاسم اللي السيرفر قاله.

**الغلطة الشائعة:** تفتكر إن [[download="2026/rides.pdf"]] هيحط الملف في فولدر [[2026]] على جهاز الزائر. الصفحة ملهاش أي تحكم في مكان التنزيل.

~~~text الناتج (نفس الحالات، اتقاست في Chrome 157 بين 127.0.0.1:8125 و 127.0.0.1:8126 بملف notes.txt)
download                         →  اتنزّل: notes.txt
download="مسارات-2026.csv"       →  اتنزّل: مسارات-2026.csv
من غير download                  →  الصفحة اتنقلت وعرضت الملف
origin تاني + download           →  الصفحة اتنقلت وعرضت الملف
download="2026/notes.txt"        →  اتنزّل: 2026_notes.txt
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قسم «أحدث المقالات» لمدونة نادي العجلة: قايمة فيها ٣ كروت، وكل كارت كله لينك وجواه عنوان [[<h3>]] وسطر وصف.`, done: R`فيه ٣ لينكات بس، وكل لينك جواه [[<h3>]] و [[<p>]]، واسم كل لينك في الشجرة عنوانه ووصفه، والعناوين التلاتة لسه في الفهرس تحت [[<h2>]].`, work: { h: 402, start: R`مدونة نادي العجلة
أحدث المقالات
طريق المزارع
٤٠ كيلو للي عدّى مرحلة المبتدئين.
رحلة بالليل على الكورنيش
١٥ كيلو بعد المغرب، ولازم كشّاف.
أول رحلة للنادي
٢٤ كيلو حوالين البحيرة.`, checks: [
              { say: R`«أحدث المقالات» [[<h2>]]`, q: "h2", has: "أحدث" },
              { say: R`٣ لينكات بس`, q: "a[href]", n: 3 },
              { say: R`كل لينك جواه [[<h3>]]`, q: "a h3", n: 3 },
              { say: R`وكل لينك جواه [[<p>]] وصف`, q: "a p", n: 3 },
              { say: R`مفيش لينك جوه لينك`, q: "a a", n: 0 },
            ] }, sol: R`~~~live 356 cards.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أحدث المقالات | نادي العجلة</title>
</head>
<body>
<main>
  <h1>مدونة نادي العجلة</h1>
  <h2>أحدث المقالات</h2>
  <ul>
    <li>
      <a href="#farm-road">
        <h3>طريق المزارع</h3>
        <p>٤٠ كيلو للي عدّى مرحلة المبتدئين.</p>
      </a>
    </li>
    <li>
      <a href="#night-ride">
        <h3>رحلة بالليل على الكورنيش</h3>
        <p>١٥ كيلو بعد المغرب، ولازم كشّاف.</p>
      </a>
    </li>
    <li>
      <a href="#first-ride">
        <h3>أول رحلة للنادي</h3>
        <p>٢٤ كيلو حوالين البحيرة.</p>
      </a>
    </li>
  </ul>
</main>
</body>
</html>
~~~

(في المدونة الحقيقية كل [[href]] مسار صفحة المقال: [[posts/farm-road.html]].)

**ليه كده:**

- القايمة [[<ul>]] لأن الكروت مجموعة عناصر (درس «ul و ol»)، وقارئ الشاشة بيقول «قايمة من ٣».
- [[<a>]] جوه الـ [[<li>]] وحوالين العنوان والوصف: الكارت كله منطقة ضغط واحدة.
- العنوان [[<h3>]] لأنه تحت [[<h2>]] «أحدث المقالات».
- الوصف سطر واحد قصير، عشان اسم اللينك ميطولش.

**الغلطة الشائعة:** تزوّد جوه الكارت لينك «اقرا المزيد» أو اسم الكاتب كلينك. ده لينك جوه لينك، والمتصفح هيقطّع الكارت.

~~~text الناتج
العناوين: h1 h2 h3 h3 h3      اللينكات: 3
link "طريق المزارع ٤٠ كيلو للي عدّى مرحلة المبتدئين."
link "رحلة بالليل على الكورنيش ١٥ كيلو بعد المغرب، ولازم كشّاف."
link "أول رحلة للنادي ٢٤ كيلو حوالين البحيرة."
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** قسم «ملفات للتحميل» لنادي العجلة فيه ٣ ملفات: جدول الرحلات (PDF)، والمسارات (CSV) باسم تنزيل مختلف عن اسمه على السيرفر، وقواعد النادي يتفتح ويتنزّل (لينكين). كل لينك تحميل مكتوب فيه النوع والحجم.`, done: R`فيه ٤ لينكات، تلاتة منهم عليهم [[download]]، وواحد بس عليه [[download]] بقيمة، وكل لينك تحميل نصه فيه نوع الملف وحجمه.`, work: { h: 300, start: R`جدول رحلات مارس (PDF، ٢ ميجا)
مسارات النادي (CSV، ٤ كيلوبايت)
اقرا قواعد النادي
حمّل قواعد النادي (HTML، ١ كيلوبايت)`, checks: [
              { say: R`٤ لينكات`, q: "a[href]", n: 4 },
              { say: R`تلاتة منهم عليهم [[download]]`, q: "a[download]", n: 3 },
              { say: R`واحد منهم باسم تنزيل مختلف: [[download="..."]]`, q: "a[download]:not([download=\"\"])", n: 1 },
              { say: R`لينك التحميل مكتوب فيه [[PDF]]`, q: "a[download]", has: "PDF" },
              { say: R`ولينك التحميل التاني مكتوب فيه [[CSV]]`, q: "a[download]", has: "CSV" },
            ] }, sol: R`~~~live 150 downloads.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ملفات للتحميل | نادي العجلة</title>
</head>
<body>
<main>
  <h1>ملفات للتحميل</h1>
  <ul>
    <li><a href="#rides" download>حمّل جدول رحلات مارس (PDF، ٢ ميجا)</a></li>
    <li><a href="#routes" download="club-routes-2026.csv">حمّل مسارات النادي (CSV، ٤ كيلوبايت)</a></li>
    <li>
      <a href="#rules">اقرا قواعد النادي</a>
      أو <a href="#rules" download>حمّلها (HTML، ١ كيلوبايت)</a>
    </li>
  </ul>
</main>
</body>
</html>
~~~

(في المعاينة الـ [[href]] كلهم [[#...]] والتنزيل مقفول. في موقعك: [[files/rides-march.pdf]] و [[files/r26.csv]] و [[rules.html]]، وجرّب من سيرفر محلي.)

**ليه كده:**

- الأول [[download]] من غير قيمة: اسم الملف على السيرفر كويس زي ما هو.
- التاني بقيمة: اسمه على السيرفر [[r26.csv]] مش مفهوم، فبنسمّيه للزائر [[club-routes-2026.csv]].
- القواعد بلينكين لنفس الملف: واحد بيفتح وواحد بينزّل، والزائر يختار.
- كل نص فيه النوع والحجم.

**الغلطة الشائعة:** تحط الملفات على خدمة تخزين خارجية وتكتب [[download]]. origin تاني، فالمتصفح هيتجاهله ويفتح الملف.

~~~text الناتج
اللينكات: 4      عليهم download: 3      download بقيمة: 1 (club-routes-2026.csv)
link "حمّل جدول رحلات مارس (PDF، ٢ ميجا)"
link "حمّل مسارات النادي (CSV، ٤ كيلوبايت)"
link "اقرا قواعد النادي"
link "حمّلها (HTML، ١ كيلوبايت)"
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** كارت المنتج اللي في أول الحل كله لينك، وجواه لينك للكاتب وزرار «احفظ». افتحه في تاب Elements وشوف المتصفح بنى إيه، وبعدين اعمله من جديد بحيث يبقى فيه لينك للمقال، ولينك للكاتب، وزرار، وكل واحد بيعمل شغله.`, done: R`مفيش لينك جوه لينك ولا زرار جوه لينك، والكارت فيه لينكين وزرار كل واحد لوحده، والعنوان هو لينك المقال.`, work: { h: 122, solAt: 1, start: R`<a href="first-ride.html">
  <h3>أول رحلة للنادي</h3>
  <p>كتبتها <a href="authors/salma.html">سلمى فؤاد</a></p>
  <button type="button">احفظ</button>
</a>`, checks: [
              { say: R`في الكارت لينكين بس`, q: "a", n: 2 },
              { say: R`لينك المقال حوالين «أول رحلة للنادي»`, q: "a", has: "أول رحلة", n: 1 },
              { say: R`لينك الكاتبة حوالين «سلمى فؤاد»`, q: "a", has: "سلمى", n: 1 },
              { say: R`كلمة «كتبتها» برّه أي لينك`, q: "a", has: "كتبتها", n: 0 },
              { say: R`زرار «احفظ» لوحده`, q: "button", has: "احفظ", n: 1 },
            ] }, sol: R`~~~html البايظة
<a href="first-ride.html">
  <h3>أول رحلة للنادي</h3>
  <p>كتبتها <a href="authors/salma.html">سلمى فؤاد</a></p>
  <button type="button">احفظ</button>
</a>
~~~

~~~text اللي Chrome بناه من البايظة (تاب Elements)
<a href="first-ride.html">
  <h3>أول رحلة للنادي</h3>
  </a><p><a href="first-ride.html">كتبتها </a><a href="authors/salma.html">سلمى فؤاد</a></p>
  <button type="button">احفظ</button>
~~~

~~~live 122 بعد التصليح
<article>
  <h3><a href="#first-ride">أول رحلة للنادي</a></h3>
  <p>كتبتها <a href="#salma">سلمى فؤاد</a></p>
  <button type="button">احفظ</button>
</article>
~~~

**اللي حصل في البايظة:** المتصفح مبيسمحش بلينك جوه لينك، فلما وصل للتاني قفل الأول. النتيجة: اللينك الأول اتقسم حتتين (واحدة حوالين العنوان وواحدة حوالين كلمة «كتبتها»)، والزرار طلع برّه اللينك خالص. الكارت اللي كان «كله لينك» بقى تلات حتت.

**التصليح:** الكارت بقى [[<article>]] (درس «semantic HTML»)، ولينك المقال حوالين العنوان بس، ولينك الكاتب في مكانه، والزرار لوحده. تلات حاجات بتتداس، وكل واحدة منفصلة.

**الغلطة الشائعة:** تسيب اللينك الخارجي وتشيل اللينك الجواني بـ JavaScript ([[onclick]] على الاسم). اللي بيتنقل بالكيبورد مش هيوصل للكاتب.

~~~text الناتج
البايظة (بعد ما المتصفح صلّحها):   a = 3   (واحد للمقال حوالين العنوان، وواحد للمقال حوالين «كتبتها »، وواحد للكاتبة)   الزرار برّه أي لينك
بعد التصليح:   a = 2   button = 1   article = 1
               link "أول رحلة للنادي"   link "سلمى فؤاد"   button "احفظ"
~~~` }
          ]
        },
        {
          cmd: "search",
          title: "عنصر البحث: landmark للبحث والفلترة",
          pre: ["css/form و label", "css/semantic HTML"],
          ref: [
            { t: "MDN: <search>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search" },
            { t: "WHATWG: the search element", url: "https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element" },
            { t: "MDN: <input type=\"search\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/search" }
          ],
          desc: R`[[<search>]] عنصر بيتحط حوالين الجزء اللي الزائر بيدوّر أو بيفلتر منه: فورم البحث في الـ header، أو خانة الفلترة فوق قايمة. هو مبيعملش البحث ومبيغيّرش الشكل: بيعمل **landmark** اسمه search، زي ما [[<nav>]] بيعمل navigation و [[<main>]] بيعمل main (درس «semantic HTML»)، فقارئ الشاشة ينطّ للبحث على طول.
وهو أحدث عنصر في الوحدة: MDN بيقول إنه شغال في كل المتصفحات الأساسية من أكتوبر ٢٠٢٣ (Baseline).`,
          example: R`<header>
  <search>
    <form action="search.html">
      <label for="q">دوّر في الموقع</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>`,
          flag: "script",
          lines: [
            R`البحث العام بتاع الموقع مكانه المعتاد الـ [[<header>]].`,
            R`[[<search>]] الغلاف: «اللي جوايا أدوات بحث». هو اللي بيعمل الـ landmark.`,
            R`الفورم نفسه. [[action]] الصفحة اللي الكلمة هتتبعت لها، ومن غير [[method]] يعني GET: الكلمة هتتحط في العنوان (درس «form و label»).`,
            R`[[<label>]] مربوط بالحقل بـ [[for]]. حقل البحث محتاج اسم زي أي حقل.`,
            R`[[type="search"]] حقل نص معناه «كلمة بحث». و [[name="q"]] هو الاسم اللي هيظهر في العنوان: [[?q=...]].`,
            R`زرار الإرسال: الضغط عليه (أو Enter جوه الحقل) بيبعت الفورم. [[type="submit"]] هو الافتراضي جوه فورم، وبنكتبه صريح عشان اللي يقرا الكود يعرف إن الزرار ده بيبعت.`,
            R`[[</form>]] بيقفل الفورم: الحقول اللي بين الفتحة والقفلة هي بس اللي بتتبعت.`,
            R`[[</search>]] بيقفل الـ landmark: كل اللي جواه بيتعرض لقارئ الشاشة على إنه «البحث».`,
            R`[[</header>]] بيقفل مقدمة الصفحة. البحث جواها عشان يبقى في نفس المكان في كل صفحات الموقع.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: [[<search>]] بيمثّل جزء من الصفحة فيه أدوات فورم أو محتوى تاني ليه علاقة بـ **بحث أو فلترة**: في الموقع، أو في الصفحة الحالية، أو في الإنترنت كله. المتصفح مبيدّيهوش أي شكل ولا أي سلوك: كل فايدته في شجرة الـ accessibility.

القياسات من Chrome 157 على Windows 11.

---

## ١. [[<search>]] حوالين فورم

~~~html
<search>
  <form action="search.html">
    <label for="q">دوّر في الموقع</label>
    <input type="search" id="q" name="q">
    <button type="submit">دوّر</button>
  </form>
</search>
~~~

~~~view 79 اكتب كلمة ودوس «دوّر»
<search>
  <form action="search.html" onsubmit="event.preventDefault(); document.querySelector('#out').textContent = 'العنوان اللي كان هيتفتح: search.html?' + new URLSearchParams(new FormData(this));">
    <label for="q">دوّر في الموقع</label>
    <input type="search" id="q" name="q">
    <button type="submit">دوّر</button>
  </form>
</search>
<p id="out">(اكتب كلمة ودوس «دوّر»)</p>
~~~

المعاينة فيها سطر JavaScript زيادة بيمنع الإرسال وبيكتبلك العنوان اللي الفورم كان هيفتحه، عشان الصندوق ميخرجش لصفحة مش موجودة. الكود الحقيقي هو اللي فوقها.

~~~text القياس
search:  display=block   margin=0px      (ملوش شكل: زي div بالظبط)
         role=search     في الـ DOM: HTMLElement (ملوش خصائص خاصة بيه)
~~~

~~~text شجرة الـ accessibility
search
  form
    LabelText "دوّر في الموقع"
    searchbox "دوّر في الموقع"
    button "دوّر"
~~~

Chrome ادّى [[<search>]] role اسمه [[search]]. ده landmark: قارئ الشاشة بيعرض الـ landmarks كقايمة وبينطّ بينها، فاللي عايز يدوّر بيوصل للبحث بضغطة.

### لما الفورم يتبعت

كتبت «خوذة أطفال» ودوست «دوّر»:

~~~text الناتج
العنوان بقى:   search.html?q=%D8%AE%D9%88%D8%B0%D8%A9+%D8%A3%D8%B7%D9%81%D8%A7%D9%84
بعد فك التشفير:   ?q=خوذة+أطفال
القيمة اللي الصفحة التانية بتقراها:   خوذة أطفال
~~~

- [[name="q"]] بقى اسم الحقل في الـ query (درس «المسارات: مطلق ونسبي»). من غير [[name]] مفيش حاجة هتتبعت.
- الفورم شفّر العربي لوحده، وحط [[+]] مكان المسافة.
- مين بيقرا [[?q=...]]؟ كود على السيرفر، أو JavaScript في صفحة النتايج. صفحة HTML ثابتة هتفتح زي ما هي. [[<search>]] والفورم هم الهيكل، والبحث نفسه في كورسات جاية.

---

## ٢. [[<search>]] ولا [[<form role="search">]] ولا [[<form>]]؟

| المكتوب | role في Chrome | landmark؟ |
|---|---|---|
| [[<search>]] | [[search]] | أيوه |
| [[<form role="search">]] | [[search]] | أيوه (الطريقة القديمة) |
| [[<div role="search">]] | [[search]] | أيوه (الطريقة القديمة) |
| [[<form>]] | [[form]] | لأ: فورم عادي |

قبل ٢٠٢٣ مكانش فيه عنصر للبحث، فالناس كانت بتكتب [[role="search"]] على الفورم. MDN: [[<search>]] «بيشيل الحاجة» لكتابة [[role=search]] على الفورم.

الفرق في المعنى:

- [[<form>]] بيقول «دي بيانات هتتبعت». ممكن تبقى اشتراك أو دفع أو بحث.
- [[<search>]] بيقول «ده مكان البحث». وممكن ميبقاش جواه فورم أصلًا (القسم ٤).
- فالاتنين مع بعض: [[<search>]] برّه عشان المعنى، و [[<form>]] جوه عشان الإرسال.

وده نفس درس «semantic HTML»: عنصر ليه معنى أحسن من [[<div>]] و [[role]].

---

## ٣. [[<input type="search">]]

حقل نص عادي بيقول «اللي بيتكتب هنا كلمة بحث».

~~~text شجرة الـ accessibility
<input type="search">   →  searchbox "دوّر في الموقع"
<input>  (type="text")  →  textbox "..."
~~~

Chrome بيدّيه role اسمه [[searchbox]] بدل [[textbox]]، فقارئ الشاشة بيعرف إنه حقل بحث. والمتصفحات والموبايلات بتتصرف معاه شوية مختلف (زرار مسح، أو كلمة «بحث» على زرار الكيبورد)، وده بيختلف من متصفح لمتصفح حسب MDN.

متلخبطش بين التلاتة:

| | هو إيه | بيعمل إيه |
|---|---|---|
| [[<search>]] | عنصر غلاف | landmark للبحث |
| [[<input type="search">]] | نوع حقل | حقل نص معناه «كلمة بحث» |
| [[<a rel="search">]] | قيمة [[rel]] على لينك | «اللينك ده لصفحة البحث» (درس «target و rel») |

ومحتاج [[<label>]] زي أي حقل. placeholder لوحده مش اسم (درس «form و label»).

---

## ٤. فلترة من غير فورم

المواصفة و MDN: [[<search>]] مش لازم جواه [[<form>]]. لو الفلترة بتحصل في الصفحة بـ JavaScript من غير إرسال للسيرفر، الحقل بيتحط في [[<search>]] مباشرة:

~~~live 174 فلتر فوق قايمة
<h2 id="rides-title">رحلات الشهر</h2>
<search aria-label="الرحلات">
  <label for="filter">فلتر الرحلات</label>
  <input type="search" id="filter">
</search>
<ul>
  <li>حوالين البحيرة، ٢٤ كيلو</li>
  <li>الكورنيش بالليل، ١٥ كيلو</li>
  <li>طريق المزارع، ٤٠ كيلو</li>
</ul>
~~~

(الحقل هنا مش هيفلتر: الفلترة عايزة JavaScript. المطلوب الهيكل.)

**القايمة برّه [[<search>]].** المواصفة و MDN صريحين: [[<search>]] مش لعرض نتايج البحث. النتايج جزء من محتوى الصفحة الرئيسي. الاستثناء: الاقتراحات السريعة اللي بتطلع تحت الحقل وانت بتكتب، دي جزء من أداة البحث.

---

## ٥. أكتر من [[<search>]] في الصفحة

صفحة ممكن فيها بحث الموقع في الـ header وفلتر في الـ [[<main>]]. قارئ الشاشة هيعرض اتنين landmark اسمهم «search»، فلازم كل واحد ياخد اسم، زي ما عملنا مع اتنين [[<nav>]]:

~~~html
<search aria-label="الموقع"> ... </search>
<search aria-label="الرحلات"> ... </search>
~~~

~~~text شجرة الـ accessibility
banner
  search "الموقع"
main
  search "الرحلات"
~~~

(MDN في مثاله بيفرّق بينهم بـ [[title]]. اللي اتقاس هنا [[aria-label]]، وهو نفس اللي استخدمناه مع [[<nav>]].)

لو فيه واحد بس، مش محتاج اسم.

---

## ٦. الدعم

- MDN: Baseline «متاح على نطاق واسع»، وشغال في المتصفحات الأساسية من أكتوبر ٢٠٢٣.
- في متصفح أقدم من كده، [[<search>]] عنصر مش معروف: المحتوى اللي جواه بيظهر ويشتغل عادي، بس من غير landmark. فمفيش حاجة بتبوظ، والفورم جواه شغال في كل الأحوال.
- لو لازم الـ landmark يوصل للمتصفحات القديمة كمان، [[<form role="search">]] لسه شغال.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| نتايج البحث جوه [[<search>]] | ضد المواصفة: النتايج محتوى، مكانها [[<main>]] |
| [[<search>]] بدل [[<form>]] | [[<search>]] مبيبعتش حاجة: لازم [[<form>]] جواه (أو JavaScript) |
| حقل بحث من غير [[<label>]] | [[searchbox]] من غير اسم |
| حقل من غير [[name]] | الفورم بيتبعت والعنوان مفيهوش الكلمة |
| اتنين [[<search>]] من غير أسامي | قارئ الشاشة: «search» و «search» |
| [[<search>]] حوالين فورم اشتراك أو تسجيل دخول | ده مش بحث. [[<search>]] للبحث والفلترة بس |
| [[<search role="search">]] | تكرار: الـ role موجود لوحده |
| تستنى منه شكل (عدسة أو إطار) | ملوش شكل: [[display: block]] وبس |

---

## الخلاصة

- [[<search>]] غلاف حوالين أدوات البحث أو الفلترة، وبيعمل landmark اسمه search.
- ملوش شكل وملوش سلوك. الإرسال شغل [[<form>]] اللي جواه.
- [[<input type="search">]] للحقل ([[searchbox]])، ومعاه [[<label>]] و [[name]].
- النتايج برّه [[<search>]].
- أكتر من واحد في الصفحة: كل واحد [[aria-label]].
- Baseline من أكتوبر ٢٠٢٣، والمتصفح القديم بيعرض المحتوى عادي من غير landmark.`,
          try: R`اعمل ملف [[find.html]] فيه [[<search>]] جواه فورم [[action="find.html"]] (يعني بيبعت لنفس الصفحة) وحقل [[name="q"]] وزرار. افتحه، واكتب «خوذة حمرا» ودوس الزرار، وبص على شريط العنوان. وبعدين شيل [[name="q"]] وجرّب تاني.`,
          sol: R`~~~html find.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دوّر</title>
</head>
<body>
<search>
  <form action="find.html">
    <label for="q">دوّر في الموقع</label>
    <input type="search" id="q" name="q">
    <button type="submit">دوّر</button>
  </form>
</search>
</body>
</html>
~~~

~~~view 48 شكل الصفحة
<search>
  <form action="find.html" onsubmit="return false">
    <label for="q">دوّر في الموقع</label>
    <input type="search" id="q" name="q">
    <button type="submit">دوّر</button>
  </form>
</search>
~~~

- **بـ [[name="q"]]:** الصفحة اتحمّلت من جديد وشريط العنوان بقى آخره [[?q=]] وبعدها الكلمتين متشفّرين وبينهم [[+]].
- **من غير [[name]]:** الصفحة اتحمّلت من جديد والعنوان آخره [[?]] بس. الحقل اللي ملوش [[name]] مبيتبعتش.

في الحالتين الحقل رجع فاضي: الصفحة ثابتة، ومفيش كود بيقرا الـ query ويرجّع الكلمة للحقل.

~~~text الناتج
بـ name="q":     find.html?q=%D8%AE%D9%88%D8%B0%D8%A9+%D8%AD%D9%85%D8%B1%D8%A7
من غير name:     find.html?
~~~`,
          deep: {
            why: R`البحث من أكتر الحاجات اللي الزائر بيدوّر عليها في أي موقع، ومكانه بيختلف من موقع لموقع. الـ landmark بيخلّي الوصول له ثابت: قارئ الشاشة بيعرض قايمة الـ landmarks (banner و navigation و main و search و contentinfo) والمستخدم بيختار. قبل [[<search>]] ده كان محتاج [[role="search"]] مكتوب بالإيد، وناس كتير مكانتش بتكتبه.`,
            how: R`[[<search>]] في الـ DOM عنصر عادي ([[HTMLElement]]) من غير خصائص ولا أحداث خاصة بيه، وتنسيقه الافتراضي [[display: block]] بس. المتصفح بيدّيه في شجرة الـ accessibility role اسمه [[search]]، وده من أدوار الـ landmark. واسمه (لو ليه [[aria-label]]) بيظهر جنب الـ role. كل السلوك (الإرسال، والتحقق، وبناء الـ query) جاي من [[<form>]] والحقول اللي جواه.`,
            when: R`حوالين فورم البحث العام في الـ header. حوالين حقل أو مجموعة حقول بتفلتر قايمة أو جدول في الصفحة. حوالين فورم «بحث متقدم» بكل حقوله. ومتستخدمهوش: لصفحة نتايج البحث، ولا لفورم مش بحث، ولا عشان شكل.`,
            mistakes: R`النتايج جواه. [[<search>]] من غير [[<form>]] وتستنى الزرار يبعت. حقل من غير [[<label>]] أو من غير [[name]]. اتنين من غير [[aria-label]]. [[role="search"]] مكرر عليه. وتلخبط بينه وبين [[<input type="search">]] (الحقل) و [[rel="search"]] (لينك).`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الفورم اللي في الحل فيه حقلين وزرار. الزائر كتب «كشّاف» في الأول و 500 في التاني ودوس «دوّر». العنوان هيبقى آخره إيه؟`, done: R`توقّعت إن العنوان فيه [[q]] بس، وإن 500 مش هتتبعت لأن حقلها ملوش [[name]].`, sol: R`~~~html
<search>
  <form action="results.html">
    <label for="q">الكلمة</label>
    <input type="search" id="q" name="q">
    <label for="max">أقصى سعر</label>
    <input type="number" id="max">
    <button type="submit">دوّر</button>
  </form>
</search>
~~~

~~~view 48 شكل الفورم
<search>
  <form action="results.html" onsubmit="return false">
    <label for="q">الكلمة</label>
    <input type="search" id="q" name="q">
    <label for="max">أقصى سعر</label>
    <input type="number" id="max">
    <button type="submit">دوّر</button>
  </form>
</search>
~~~

**الإجابة:** [[results.html?q=]] وبعدها «كشّاف» متشفّرة، وبس. السعر مش في العنوان.

**ليه:** الفورم بيبعت الحقول اللي ليها [[name]] بس. الحقل التاني ليه [[id]] (عشان الـ [[<label>]] يتربط بيه) ومفيش [[name]]، و [[id]] مبيتبعتش.

**التصليح:** [[<input type="number" id="max" name="max">]]، والعنوان يبقى [[?q=...&max=500]].

**الغلطة الشائعة:** تفتكر إن [[id]] و [[name]] حاجة واحدة. [[id]] للصفحة ([[<label>]] و [[#]])، و [[name]] للإرسال.

~~~text الناتج
من غير name على السعر:   results.html?q=%D9%83%D8%B4%D9%91%D8%A7%D9%81
بعد name="max":          results.html?q=%D9%83%D8%B4%D9%91%D8%A7%D9%81&max=500
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «متجر الخيمة» (اسم متخيل) فيها بحثين: بحث الموقع في الـ [[<header>]] (فورم بيبعت لـ [[search.html]])، وفلتر المنتجات في الـ [[<main>]] (حقل من غير فورم) فوق قايمة ٣ منتجات.`, done: R`شجرة الـ accessibility فيها اتنين search كل واحد باسمه، والقايمة برّه [[<search>]]، وكل حقل ليه [[<label>]].`, work: { h: 216, start: R`كشّافات
دوّر في المتجر
فلتر الكشّافات
كشّاف الرحلات، ٤٥٠ جنيه
كشّاف الراس، ٣٠٠ جنيه
كشّاف العجلة، ٢٠٠ جنيه`, checks: [
              { say: R`بحث الموقع [[<search>]] جوه [[<header>]] وفيه [[<form>]] بيبعت لـ [[search.html]]`, q: "header search form[action=\"search.html\"]" },
              { say: R`فلتر المنتجات [[<search>]] جوه [[<main>]]`, q: "main search" },
              { say: R`فلتر المنتجات من غير [[<form>]]`, q: "main form", n: 0 },
              { say: R`حقلين [[type="search"]]`, q: "input[type=\"search\"]", n: 2 },
              { say: R`كل حقل ليه [[<label>]]`, q: "label", n: 2 },
              { say: R`قايمة ٣ منتجات برّه [[<search>]]`, q: "main > ul li", n: 3 },
            ] }, sol: R`~~~html shop.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كشّافات | متجر الخيمة</title>
</head>
<body>
<header>
  <search aria-label="الموقع">
    <form action="search.html">
      <label for="q">دوّر في المتجر</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main>
  <h1>كشّافات</h1>
  <search aria-label="المنتجات">
    <label for="filter">فلتر الكشّافات</label>
    <input type="search" id="filter">
  </search>
  <ul>
    <li>كشّاف الرحلات، ٤٥٠ جنيه</li>
    <li>كشّاف الراس، ٣٠٠ جنيه</li>
    <li>كشّاف العجلة، ٢٠٠ جنيه</li>
  </ul>
</main>
</body>
</html>
~~~

~~~view 216 شكل الصفحة
<header>
  <search aria-label="الموقع">
    <form action="search.html" onsubmit="return false">
      <label for="q">دوّر في المتجر</label>
      <input type="search" id="q" name="q">
      <button type="submit">دوّر</button>
    </form>
  </search>
</header>
<main>
  <h1>كشّافات</h1>
  <search aria-label="المنتجات">
    <label for="filter">فلتر الكشّافات</label>
    <input type="search" id="filter">
  </search>
  <ul>
    <li>كشّاف الرحلات، ٤٥٠ جنيه</li>
    <li>كشّاف الراس، ٣٠٠ جنيه</li>
    <li>كشّاف العجلة، ٢٠٠ جنيه</li>
  </ul>
</main>
~~~

**ليه كده:**

- بحث الموقع فورم: الكلمة بتتبعت لصفحة تانية. الفلتر من غير فورم: هيشتغل في نفس الصفحة بـ JavaScript بعدين.
- كل [[<search>]] ليه [[aria-label]] لأنهم اتنين.
- حقل الفلتر ملوش [[name]] لأنه مش بيتبعت لحتة.
- القايمة بعد [[<search>]] مش جواه: هي النتايج.

**الغلطة الشائعة:** تحط القايمة جوه [[<search>]] «عشان هي نتيجة الفلتر». النتايج محتوى.

~~~text الناتج (شجرة الـ accessibility، مختصرة)
banner › search "الموقع" › form › searchbox "دوّر في المتجر" ، button "دوّر"
main › heading level=1 ، search "المنتجات" › searchbox "فلتر الكشّافات" ، list (3)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** البحث اللي في أول الحل شغال بالماوس، بس فيه ٤ مشاكل في الهيكل. لاقيهم وصلّحهم.`, done: R`فيه [[<search>]] جواه [[<form>]]، والحقل [[type="search"]] وليه [[<label>]] و [[name]]، والنتايج برّه [[<search>]].`, work: { h: 148, solAt: 1, start: R`<div class="search">
  <form action="search.html">
    <input placeholder="دوّر...">
    <button type="submit">دوّر</button>
    <ul>
      <li>نتيجة ١</li>
      <li>نتيجة ٢</li>
    </ul>
  </form>
</div>`, checks: [
              { say: R`فيه [[<search>]] جواه [[<form>]]`, q: "search form" },
              { say: R`الحقل [[type="search"]] وعليه [[name]]`, q: "input[type=\"search\"][name]" },
              { say: R`الحقل ليه [[<label>]]`, q: "label[for]" },
              { say: R`قايمة النتايج برّه [[<search>]] و [[<form>]]`, q: "search ul, form ul", n: 0 },
              { say: R`النتيجتين لسه موجودين`, q: "li", n: 2 },
            ] }, sol: R`~~~html البايظة
<div class="search">
  <form action="search.html">
    <input placeholder="دوّر...">
    <button type="submit">دوّر</button>
    <ul>
      <li>نتيجة ١</li>
      <li>نتيجة ٢</li>
    </ul>
  </form>
</div>
~~~

~~~html بعد التصليح
<search>
  <form action="search.html">
    <label for="q">دوّر في الموقع</label>
    <input type="search" id="q" name="q">
    <button type="submit">دوّر</button>
  </form>
</search>
<h2>النتايج</h2>
<ul>
  <li>نتيجة ١</li>
  <li>نتيجة ٢</li>
</ul>
~~~

~~~view 148 بعد التصليح
<search>
  <form action="search.html" onsubmit="return false">
    <label for="q">دوّر في الموقع</label>
    <input type="search" id="q" name="q">
    <button type="submit">دوّر</button>
  </form>
</search>
<h2>النتايج</h2>
<ul>
  <li>نتيجة ١</li>
  <li>نتيجة ٢</li>
</ul>
~~~

| المشكلة | التصليح |
|---|---|
| [[<div class="search">]]: مفيش landmark | [[<search>]] |
| الحقل من غير [[<label>]]، و placeholder بيختفي أول ما تكتب | [[<label for="q">]] |
| الحقل من غير [[name]]: الكلمة مبتتبعتش | [[name="q"]]، و [[type="search"]] |
| النتايج جوه الفورم وجوه البحث | برّه، وتحت عنوان |

**الغلطة الشائعة:** تغيّر الـ [[<div>]] لـ [[<search>]] وتقف. أخطر مشكلة في الأربعة هي [[name]]: من غيره البحث مبيبعتش الكلمة أصلًا.

~~~text الناتج (شجرة الـ accessibility)
البايظة:       form › textbox "دوّر..." (الاسم جاي من الـ placeholder) ، button "دوّر" ، list      (مفيش search)
بعد التصليح:   search › form › searchbox "دوّر في الموقع" ، button "دوّر"      ثم heading "النتايج" ، list
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك شاف [[<search>]] و [[<input type="search">]] و [[<form role="search">]] و [[rel="search"]] في نفس الأسبوع واتلخبط. اكتبله سطر لكل واحد.`, done: R`كتبت ٤ سطور، كل سطر بيقول الحاجة دي إيه (عنصر، نوع حقل، role، قيمة rel) وبتعمل إيه.`, sol: R`**إجابة نموذجية:**

1. [[<search>]]: **عنصر** غلاف بتحطه حوالين أدوات البحث أو الفلترة. بيعمل landmark اسمه search. ملوش شكل ومبيبعتش حاجة.
2. [[<input type="search">]]: **نوع حقل**. حقل نص معناه «كلمة بحث»، وفي الشجرة [[searchbox]]. بيتحط جوه [[<search>]].
3. [[<form role="search">]]: **الطريقة القديمة** لعمل نفس الـ landmark قبل ما [[<search>]] يتعمل. لسه شغالة، ومحتاجها بس لو لازم تدعم متصفحات قبل ٢٠٢٣.
4. [[rel="search"]]: **قيمة على لينك** ([[<a>]] أو [[<link>]]) بتقول إن الصفحة اللي اللينك رايح لها هي صفحة البحث في الموقع. ملهاش علاقة بالحقول.

**في سطر:** الغلاف [[<search>]]، وجواه [[<form>]]، وجواه [[<input type="search">]]. و [[rel="search"]] موضوع تاني خالص.

**الغلطة الشائعة:** تكتب [[<search>]] وتفتكر إن الحقل اللي جواه بقى حقل بحث لوحده. نوع الحقل بيتحدد من [[type]] بتاعه.` }
          ]
        }
      ]
    }
]);
