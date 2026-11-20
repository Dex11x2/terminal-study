// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "HTML: عناصر تفاعلية و global attributes",
      l: 1,
      n: "اللي الـ HTML بيديهولك من غير JavaScript (أو بسطر واحد): نافذة dialog، وقايمة popover، وإخفاء وتعطيل أجزاء من الصفحة، ونص بيتعدّل في مكانه، وباقي الـ attributes اللي بتتكتب على أي عنصر، وبيانات محرك البحث بيقراها",
      pre: [
        { to: "css/a و button", why: R`كل حاجة في الوحدة دي بتتفتح بزرار: لازم تكون عارف [[<button type="button">]] وإمتى زرار وإمتى لينك` },
        { to: "css/أزرار الفورم: formaction وإخواته", why: R`[[<form method="dialog">]] و [[popovertarget]] و [[command]] كلهم بيتكتبوا على زرار، وهناك عرفت الزرار بيبعت إيه ومين الزرار الافتراضي` }
      ],
      goal: [
        R`تفتح نافذة تأكيد بـ [[<dialog>]] وتقفلها بـ [[<form method="dialog">]]، وتعرف الفرق بين [[show()]] و [[showModal()]] من اللي بيحصل للفوكس و Esc وباقي الصفحة، وتتحكم في القفل بـ [[closedby]].`,
        R`تعمل قايمة أو تلميح بـ [[popover]] و [[popovertarget]] من غير ولا سطر JavaScript، وتختار بين [[auto]] و [[manual]] و [[hint]]، وتفتح dialog بـ [[command]] و [[commandfor]].`,
        R`تختار بين popover و dialog و [[<details>]] لأي حاجة بتتفتح وتتقفل.`,
        R`تخفي جزء بـ [[hidden]] (و [[hidden="until-found"]])، وتعطّل جزء بـ [[inert]]، وتفرّق بينهم وبين [[disabled]] و [[aria-hidden]].`,
        R`تخلّي نص يتعدّل في مكانه بـ [[contenteditable]]، وتظبط كيبورد الموبايل والتصحيح بـ [[spellcheck]] و [[autocapitalize]] و [[autocorrect]] و [[enterkeyhint]] و [[writingsuggestions]]، وتمنع ترجمة اسم بـ [[translate="no"]].`,
        R`تعرف كل global attribute بيعمل إيه وتلاقيه في جدول واحد: [[autofocus]] و [[accesskey]] و [[draggable]] و [[title]] و [[data-*]] والباقي.`,
        R`توصف منتج لمحرك البحث بـ [[itemscope]] و [[itemtype]] و [[itemprop]]، وتعرف إمتى JSON-LD أحسن.`
      ],
      projects: [
        { lvl: 'صغير', dir: "nour-notes", t: R`دفتر نور: قايمة الملاحظات ونافذة «تمسح؟»`, what: R`أول صفحة في «دفتر نور» (تطبيق ملاحظات متخيل)، للي عايز يشوف ملاحظاته ويمسح منها. [[index.html]] فيها: اسم التطبيق في [[<header>]]، وعنوان «ملاحظاتي»، وقايمة [[<ul>]] فيها تلات ملاحظات (مشتريات الأسبوع، أفكار المشروع، كتب عايز أقراها) وجنب كل واحدة زرار «امسح». التلات أزرار بيفتحوا **نفس** نافذة التأكيد: [[<dialog>]] modal ليها عنوان مربوط بـ [[aria-labelledby]]، وجملة «مش هترجع»، وفورم [[method="dialog"]] فيه «إلغاء» الأول و «امسح». من درس «dialog و closedby».`, done: R`أي زرار «امسح» بيفتح النافذة في نص الشاشة والفوكس على «إلغاء». Tab مبيخرجش للقايمة اللي ورا. Esc أو أي زرار بيقفلها، والفوكس بيرجع لزرار «امسح» **بتاع نفس الملاحظة** اللي فتحت منها.`, sol: R`~~~live 244 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دفتر نور</title>
</head>
<body>
<header>
  <h1>دفتر نور</h1>
</header>
<main>
  <h2>ملاحظاتي</h2>
  <ul>
    <li>مشتريات الأسبوع <button type="button" onclick="del.showModal()">امسح</button></li>
    <li>أفكار المشروع <button type="button" onclick="del.showModal()">امسح</button></li>
    <li>كتب عايز أقراها <button type="button" onclick="del.showModal()">امسح</button></li>
  </ul>
</main>

<dialog id="del" aria-labelledby="del-title">
  <h2 id="del-title">تمسح الملاحظة؟</h2>
  <p>الملاحظة هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
</body>
</html>
~~~

**هتشوف إيه:**

- عنوان، وقايمة من تلات سطور كل سطر جنبه «امسح».
- دوس «امسح» بتاع أي ملاحظة: صندوق في النص فيه «تمسح الملاحظة؟»، والصفحة وراه عليها غبشة خفيفة.
- الفوكس على «إلغاء». Esc بيقفل.

**ليه كده:**

- نافذة واحدة للتلات أزرار: السؤال واحد، فمش محتاج تلات نسخ. كل زرار بينادي نفس الـ [[id]].
- النافذة مكتوبة برّه [[<main>]]، في آخر [[<body>]]: مكانها في الكود مش مهم لأنها بتطلع في الـ top layer، وكده القايمة تفضل قايمة بس.
- «إلغاء» الأول: هو اللي بياخد الفوكس، و Enter بسرعة مبيمسحش.
- الملاحظة مبتتمسحش فعلًا: الـ HTML فتح النافذة وسجّل الاختيار في [[returnValue]]. المسح نفسه (ومعرفة أنهي ملاحظة) شغل JavaScript.

**الغلطة الشائعة:** [[<dialog>]] جوه كل [[<li>]] بنفس [[id="del"]]. الـ [[id]] المكرر بيخلّي كل الأزرار تفتح أول نافذة بس.

~~~text القياس من Chrome
دوسنا «امسح» بتاع تاني ملاحظة:   matches(':modal') = true ، والفوكس على «إلغاء»
النافذة في accessibility tree:     role = dialog ، name = "تمسح الملاحظة؟"
Tab تلات مرات:                     رجع على «إلغاء» (زرارين وشريط المتصفح)
Esc:                               اتقفلت ، والفوكس رجع على «امسح» بتاع تاني ملاحظة
«امسح» اللي في النافذة:            returnValue = delete ، والقايمة لسه 3 (المسح الفعلي JavaScript)
~~~` },
        { lvl: 'صغير', dir: "nour-notes", cont: true, t: R`قايمة «⋮» لكل ملاحظة، ورسالة «اتحفظت»`, what: R`زي المشروع اللي فات (نفس [[index.html]])، وزوّد عليه حاجتين من درس «popover و popovertarget». (١) بدل زرار «امسح» جنب كل ملاحظة، زرار «⋮» ليه [[aria-label]] باسم الملاحظة، والتلاتة بيفتحوا **قايمة واحدة** [[popover]] فيها «ثبّت» و «انسخ» و «امسح». «امسح» اللي في القايمة هو اللي بيفتح نافذة التأكيد بتاعة المشروع اللي فات. (٢) زرار «احفظ الكل» في الـ [[<header>]] بيطلّع رسالة «كل الملاحظات اتحفظت ✓» من نوع [[popover="manual"]] فيها زرار «×» بيقفلها.`, done: R`«⋮» بيفتح القايمة، والضغط برّه بيقفلها. «امسح» من القايمة بيفتح نافذة التأكيد **والقايمة بتتقفل لوحدها**. رسالة «اتحفظت» بتفضل مفتوحة وانت بتفتح وتقفل القايمة وبتدوس Esc، ومبتتقفلش غير بـ «×».`, sol: R`~~~live 266 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دفتر نور</title>
</head>
<body>
<header>
  <h1>دفتر نور</h1>
  <button type="button" popovertarget="saved" popovertargetaction="show">احفظ الكل</button>
</header>
<main>
  <h2>ملاحظاتي</h2>
  <ul>
    <li>مشتريات الأسبوع <button type="button" popovertarget="menu" aria-label="خيارات مشتريات الأسبوع">⋮</button></li>
    <li>أفكار المشروع <button type="button" popovertarget="menu" aria-label="خيارات أفكار المشروع">⋮</button></li>
    <li>كتب عايز أقراها <button type="button" popovertarget="menu" aria-label="خيارات كتب عايز أقراها">⋮</button></li>
  </ul>
</main>

<div id="menu" popover>
  <p><button type="button">ثبّت</button></p>
  <p><button type="button">انسخ</button></p>
  <p><button type="button" onclick="del.showModal()">امسح</button></p>
</div>

<div id="saved" popover="manual">
  كل الملاحظات اتحفظت ✓
  <button type="button" popovertarget="saved" popovertargetaction="hide" aria-label="اقفل الرسالة">×</button>
</div>

<dialog id="del" aria-labelledby="del-title">
  <h2 id="del-title">تمسح الملاحظة؟</h2>
  <p>الملاحظة هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
</body>
</html>
~~~

**هتشوف إيه:**

- كل ملاحظة جنبها «⋮». دوس عليه: صندوق في النص فيه تلات أزرار.
- «امسح» من الصندوق: القايمة اختفت وطلعت نافذة «تمسح الملاحظة؟».
- «احفظ الكل»: رسالة في النص. افتح القايمة واقفلها، ودوس Esc: الرسالة لسه موجودة. «×» بيقفلها.

**ليه كده:**

- القايمة [[auto]] (بتتقفل لوحدها) والرسالة [[manual]] (بتفضل): نوعين لحاجتين مختلفتين.
- [[showModal()]] بيقفل أي popover مفتوح قبل ما يفتح النافذة (اتقاس)، فمش محتاج تقفل القايمة بإيدك.
- «⋮» مش كلمة، فكل زرار ليه [[aria-label]] فيه اسم ملاحظته: «خيارات مشتريات الأسبوع». من غيره قارئ الشاشة بيقول «⋮» تلات مرات.
- «احفظ الكل» عليه [[popovertargetaction="show"]]: ضغطة تانية متخبّيش الرسالة.
- القايمة والرسالة والنافذة مكتوبين مرة واحدة في آخر الصفحة، زي النافذة في المشروع اللي فات.

**الغلطة الشائعة:** الرسالة [[popover]] عادي. أول ضغطة على «⋮» هتقفلها، والزائر ميعرفش الحفظ تم ولا لأ.

~~~text القياس من Chrome
«⋮» الأول:                                 القايمة اتفتحت ، والزرار name = "خيارات مشتريات الأسبوع" ، expanded = true
«امسح» من القايمة:                         النافذة اتفتحت ، والقايمة اتقفلت
«احفظ الكل» ثم فتح القايمة ثم Esc ثم كليك برّه:   الرسالة لسه مفتوحة ، والقايمة اتقفلت
«×»:                                       الرسالة اتقفلت
~~~` },
        { lvl: 'متوسط', dir: "nour-notes", cont: true, t: R`صفحة الملاحظة: عنوان ونص بيتعدّلوا في مكانهم`, what: R`زي المشروعين اللي فاتوا، وزوّد صفحة تانية [[note.html]] بتتفتح لما الزائر يدوس على «مشتريات الأسبوع» في [[index.html]] (خلّي اسم الملاحظة هناك لينك). الصفحة فيها: لينك «كل الملاحظات» يرجّع، و [[<article>]] عليه بيانات الملاحظة ([[data-note-id="12"]] و [[data-color="yellow"]] و [[data-pinned]])، وجواه: العنوان [[<h1>]] بيتعدّل كنص بس ومن غير فحص إملائي، وصندوق النص بيتعدّل كنص بس وليه دور واسم لقارئ الشاشة، وسطر «آخر تعديل» فيه [[<time>]] ومبيتعدّلش، وفقرة «اتحفظت ✓» عليها [[hidden]]. وفي الـ [[<footer>]] اسم التطبيق «Nour Notes» بلغته وممنوع من الترجمة. من درس «contenteditable و spellcheck» و «hidden و inert» و «autofocus و accesskey و draggable» (قسم [[data-*]]).`, done: R`بتعرف تكتب في العنوان وفي النص، و Ctrl+B مبيعملش حاجة فيهم. سطر التاريخ مبيتعدّلش. «اتحفظت ✓» مش باينة. Tab بيقف على اللينك والعنوان والنص.`, sol: R`الملف الجديد:

~~~html note.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مشتريات الأسبوع | دفتر نور</title>
</head>
<body>
<header>
  <p><a href="index.html">كل الملاحظات</a></p>
</header>
<main>
  <article data-note-id="12" data-color="yellow" data-pinned>
    <h1 contenteditable="plaintext-only" spellcheck="false" enterkeyhint="done">مشتريات الأسبوع</h1>
    <div contenteditable="plaintext-only" role="textbox" aria-multiline="true" aria-label="نص الملاحظة" autocapitalize="sentences">لبن وعيش وجبنة.</div>
    <p>آخر تعديل: <time datetime="2026-11-03">٣ نوفمبر</time></p>
    <p id="saved" hidden>اتحفظت ✓</p>
  </article>
</main>
<footer>
  <p>مكتوبة في <span lang="en" translate="no">Nour Notes</span></p>
</footer>
</body>
</html>
~~~

~~~view 250 شكل note.html (دوس على العنوان أو النص واكتب)
<header>
  <p><a>كل الملاحظات</a></p>
</header>
<main>
  <article data-note-id="12" data-color="yellow" data-pinned>
    <h1 contenteditable="plaintext-only" spellcheck="false" enterkeyhint="done">مشتريات الأسبوع</h1>
    <div contenteditable="plaintext-only" role="textbox" aria-multiline="true" aria-label="نص الملاحظة" autocapitalize="sentences">لبن وعيش وجبنة.</div>
    <p>آخر تعديل: <time datetime="2026-11-03">٣ نوفمبر</time></p>
    <p id="saved" hidden>اتحفظت ✓</p>
  </article>
</main>
<footer>
  <p>مكتوبة في <span lang="en" translate="no">Nour Notes</span></p>
</footer>
~~~

والسطر اللي اتغيّر في [[index.html]] (اسم أول ملاحظة بقى لينك):

~~~html
<li><a href="note.html">مشتريات الأسبوع</a> <button type="button" popovertarget="menu" aria-label="خيارات مشتريات الأسبوع">⋮</button></li>
~~~

**هتشوف إيه:**

- لينك، وعنوان كبير، وسطر النص، وسطر التاريخ، واسم التطبيق تحت. «اتحفظت ✓» مش موجودة.
- دوس على العنوان: مؤشر كتابة. اكتب وامسح. Ctrl+B: مفيش.
- نفس الكلام في النص. سطر التاريخ كلام عادي.

**ليه كده:**

- [[contenteditable]] على العنوان والنص كل واحد لوحده، مش على [[<article>]]: التاريخ والرسالة المستخبية ميتعدّلوش.
- الاتنين [[plaintext-only]]: ملاحظة نص، ومش عايزين لصق بألوان وصور.
- العنوان [[<h1>]] فضل عنوان (من غير [[role]]): لو اتكتب عليه [[role="textbox"]] كان هيبطّل يبقى عنوان الصفحة. صندوق النص [[<div>]] ملوش معنى، فهو اللي أخد [[role="textbox"]] و [[aria-multiline]] و [[aria-label]].
- [[spellcheck="false"]] على العنوان (ممكن يبقى اسم أو كود)، والنص سايبينه بالفحص.
- [[data-*]] على [[<article>]]: دي بيانات الملاحظة للكود. و [[data-pinned]] من غير قيمة.
- «اتحفظت ✓» [[hidden]] في الكود من دلوقتي: JavaScript بعدين هيشيل الـ attribute لما الحفظ يحصل.

**الغلطة الشائعة:** تستنى إن التعديل يتحفظ. حمّل الصفحة: الكلام القديم رجع. [[contenteditable]] بيغيّر اللي على الشاشة بس.

~~~text القياس من Chrome
قابل للتعديل:                 العنوان = true ، النص = true ، التاريخ = false
العنوان في accessibility tree:  role = heading ، level = 1
النص في accessibility tree:     role = textbox ، name = "نص الملاحظة" ، multiline = true
Ctrl+B على العنوان ثم كتابة:    مشتريات الأسبوع ٢     (من غير <b>)
«اتحفظت ✓»:                    display = none
article.dataset:               {"noteId":"12","color":"yellow","pinned":""}
Tab:                           اللينك > العنوان > النص
~~~` },
        { lvl: 'متوسط', dir: "nour-notes", cont: true, t: R`جولة أول مرة: لوحة ترحيب، والصفحة واقفة وراها`, what: R`زي اللي فات، وارجع لـ [[index.html]] وزوّد عليها تجربة «أول زيارة»، من درس «hidden و inert» و «autofocus و accesskey و draggable». (١) لوحة ترحيب [[<aside id="tour">]] فوق القايمة فيها عنوان وجملة وزرار «فهمت، يلا نبدأ» عليه [[autofocus]]. (٢) [[<main id="page">]] كله بيبدأ [[inert]]، وباهت بسطر CSS واحد. الزرار بسطر [[onclick]] واحد بيخبّي اللوحة ويشغّل الصفحة. (٣) خانة بحث فوق القايمة ([[type="search"]] و [[enterkeyhint="search"]] وليها label). (٤) قسم «اختصارات الكيبورد» في آخر الصفحة: عنوانه باين، ومحتواه [[hidden="until-found"]] وجواه فقرة [[id="keys"]]، والاختصارات [[<kbd translate="no">]]. والقايمة والرسالة والنافذة بتوع المشروعين الأولانيين **برّه** [[<main>]] زي ما هم.`, done: R`الصفحة بتفتح والفوكس على «فهمت»، والقايمة باهتة ومفيش فيها حاجة بتتداس ولا Tab بيدخلها. بعد «فهمت»: اللوحة اختفت والصفحة اشتغلت. محتوى الاختصارات مش باين، وبيظهر لما تفتح [[index.html#keys]] أو تدوّر بـ Ctrl+F على «للحفظ».`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دفتر نور</title>
<style>
  [inert] { opacity: 0.5; }
</style>
</head>
<body>
<header>
  <h1>دفتر نور</h1>
  <button type="button" popovertarget="saved" popovertargetaction="show">احفظ الكل</button>
</header>

<aside id="tour" aria-labelledby="tour-title">
  <h2 id="tour-title">أهلًا بيك في دفتر نور</h2>
  <p>كل ملاحظة جنبها زرار «⋮» فيه التثبيت والنسخ والمسح.</p>
  <button type="button" autofocus onclick="tour.hidden = true; page.inert = false">فهمت، يلا نبدأ</button>
</aside>

<main id="page" inert>
  <h2>ملاحظاتي</h2>
  <p><label for="q">دوّر في الملاحظات</label> <input id="q" name="q" type="search" enterkeyhint="search"></p>
  <ul>
    <li><a href="note.html">مشتريات الأسبوع</a> <button type="button" popovertarget="menu" aria-label="خيارات مشتريات الأسبوع">⋮</button></li>
    <li>أفكار المشروع <button type="button" popovertarget="menu" aria-label="خيارات أفكار المشروع">⋮</button></li>
    <li>كتب عايز أقراها <button type="button" popovertarget="menu" aria-label="خيارات كتب عايز أقراها">⋮</button></li>
  </ul>

  <h2>اختصارات الكيبورد</h2>
  <div hidden="until-found">
    <p id="keys"><kbd translate="no">Ctrl+S</kbd> للحفظ، و <kbd translate="no">Ctrl+F</kbd> للبحث في الصفحة.</p>
  </div>
</main>

<div id="menu" popover>
  <p><button type="button">ثبّت</button></p>
  <p><button type="button">انسخ</button></p>
  <p><button type="button" onclick="del.showModal()">امسح</button></p>
</div>

<div id="saved" popover="manual">
  كل الملاحظات اتحفظت ✓
  <button type="button" popovertarget="saved" popovertargetaction="hide" aria-label="اقفل الرسالة">×</button>
</div>

<dialog id="del" aria-labelledby="del-title">
  <h2 id="del-title">تمسح الملاحظة؟</h2>
  <p>الملاحظة هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
</body>
</html>
~~~

~~~view 494 شكل index.html (دوس «فهمت، يلا نبدأ»)
<style>
  [inert] { opacity: 0.5; }
</style>
<header>
  <h1>دفتر نور</h1>
  <button type="button" popovertarget="saved" popovertargetaction="show">احفظ الكل</button>
</header>

<aside id="tour" aria-labelledby="tour-title">
  <h2 id="tour-title">أهلًا بيك في دفتر نور</h2>
  <p>كل ملاحظة جنبها زرار «⋮» فيه التثبيت والنسخ والمسح.</p>
  <button type="button" autofocus onclick="tour.hidden = true; page.inert = false">فهمت، يلا نبدأ</button>
</aside>

<main id="page" inert>
  <h2>ملاحظاتي</h2>
  <p><label for="q">دوّر في الملاحظات</label> <input id="q" name="q" type="search" enterkeyhint="search"></p>
  <ul>
    <li><a>مشتريات الأسبوع</a> <button type="button" popovertarget="menu" aria-label="خيارات مشتريات الأسبوع">⋮</button></li>
    <li>أفكار المشروع <button type="button" popovertarget="menu" aria-label="خيارات أفكار المشروع">⋮</button></li>
    <li>كتب عايز أقراها <button type="button" popovertarget="menu" aria-label="خيارات كتب عايز أقراها">⋮</button></li>
  </ul>

  <h2>اختصارات الكيبورد</h2>
  <div hidden="until-found">
    <p id="keys"><kbd translate="no">Ctrl+S</kbd> للحفظ، و <kbd translate="no">Ctrl+F</kbd> للبحث في الصفحة.</p>
  </div>
</main>

<div id="menu" popover>
  <p><button type="button">ثبّت</button></p>
  <p><button type="button">انسخ</button></p>
  <p><button type="button" onclick="del.showModal()">امسح</button></p>
</div>

<div id="saved" popover="manual">
  كل الملاحظات اتحفظت ✓
  <button type="button" popovertarget="saved" popovertargetaction="hide" aria-label="اقفل الرسالة">×</button>
</div>

<dialog id="del" aria-labelledby="del-title">
  <h2 id="del-title">تمسح الملاحظة؟</h2>
  <p>الملاحظة هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
~~~

**هتشوف إيه:**

- لوحة الترحيب واضحة، وكل اللي تحتها (العنوان والبحث والقايمة) باهت.
- جرّب تدوس على خانة البحث أو «⋮»: مفيش.
- «فهمت، يلا نبدأ»: اللوحة اختفت، واللي تحت رجع بلونه واشتغل.
- عنوان «اختصارات الكيبورد» تحته فاضي.

**ليه كده:**

- اللوحة مش [[<dialog>]] modal هنا عشان تتمرن على [[inert]] بإيدك. في مشروع حقيقي [[showModal()]] كان هيعمل ده كله لوحده، و [[inert]] اليدوي للحالات اللي مفيش فيها modal.
- [[inert]] على [[<main>]] بس. اللوحة والـ [[<header>]] برّاه فشغالين. والقايمة والنافذة برّاه برضه: لو كانوا جوه [[<main>]] كانوا هيقفوا معاه.
- سطر [[[inert] { opacity: 0.5; }]] في [[<style>]]: [[inert]] ملوش شكل، ولازم الزائر يشوف إن الجزء واقف.
- سطر [[onclick]] فيه حاجتين بينهم [[;]]: [[tour.hidden = true]] بيخبّي اللوحة، و [[page.inert = false]] بيشيل [[inert]] من [[<main>]]. (JavaScript، وهتفهمه في كورسه.)
- [[autofocus]] على زرار اللوحة: اللي ماشي بالكيبورد يبدأ منه، مش من حاجة واقفة.
- الاختصارات [[until-found]] مش [[hidden]]: اللي يدوّر على «للحفظ» يلاقيها.

**الغلطة الشائعة:** [[inert]] على [[<body>]]. اللوحة هتقف هي كمان، والصفحة كلها تبقى ميتة من غير أي طريقة للخروج.

~~~text القياس من Chrome
بعد التحميل:               الفوكس على «فهمت، يلا نبدأ» ، و main opacity = 0.5
كليك على خانة البحث:       الفوكس ماراحش
Tab:                       احفظ الكل > فهمت، يلا نبدأ > شريط المتصفح > احفظ الكل   (ولا حاجة من main)
بعد «فهمت»:                اللوحة display = none ، inert = false ، opacity = 1 ، وخانة البحث بتاخد فوكس
صندوق الاختصارات:          ارتفاعه 0
فتح index.html#keys:       hidden اتشال والاختصارات ظهرت (و autofocus اتجاهل لأن العنوان فيه #)
~~~

(Ctrl+F من MDN، الباقي اتقاس.)` },
        { lvl: 'كبير', dir: "nour-notes", cont: true, t: R`صفحة «الإعدادات»: كل الوحدة في صفحة واحدة`, what: R`الصفحة التالتة في «دفتر نور»: [[settings.html]]، للي عايز يظبط حسابه. بتجمع كل اللي بنيته، وكل قسم [[<section>]] ليه عنوان مربوط بـ [[aria-labelledby]]: (١) **الحساب:** «الاسم الظاهر» بيتعدّل في مكانه زي عنوان الملاحظة في المشروع التالت (نص بس، ودور واسم، ومن غير فحص إملائي، و [[autocapitalize="words"]])، وجنبه زرار «؟» بيفتح تلميح popover زي قايمة المشروع التاني، وفورم بيغيّر الإيميل ([[post]]، وحقل [[type="email"]] إجباري بتلميحات الكتابة). (٢) **المظهر:** زرار بيفتح قايمة popover فيها تلات ألوان، كل لون زرار عليه [[data-color]]. (٣) **المزامنة (قريبًا):** قسم كامل [[inert]] وباهت، زي [[<main>]] في المشروع الرابع. (٤) **منطقة الخطر:** «امسح حسابي» بيفتح نافذة تأكيد زي المشروع الأول، بس مبتتقفلش بـ Esc ولا بالضغط برّه ([[closedby="none"]])، والفوكس بيبدأ على «لأ، خليني» بـ [[autofocus]]. (٥) **عن التطبيق:** بلوك عليه microdata من نوع [[SoftwareApplication]]: الاسم (إنجليزي وممنوع من الترجمة) والنسخة والتصنيف والنظام، وعرض بسعر [[0]] و [[EGP]]، والمصممة كـ [[Person]]. من دروس الوحدة الستة.`, done: R`كل قسم بيشتغل زي ما اتوصف: الاسم بيتعدّل كنص، و «؟» والألوان بيفتحوا popover وفتح واحد بيقفل التاني، وقسم المزامنة مبيردش، ونافذة المسح مبتتقفلش غير بزرار، والفورم الفاضي مبيتبعتش. والـ microdata بتطلّع حاجة واحدة [[SoftwareApplication]] جواها [[Offer]] و [[Person]].`, ext: R`زوّد لينك «الإعدادات» في [[<header>]] بتاع [[index.html]]. اعمل نسخة من نافذة المسح بتتفتح بـ [[command="show-modal"]] و [[commandfor]] بدل [[onclick]] وجرّبها. خلّي قسم «اختصارات الكيبورد» بتاع المشروع الرابع يتنقل هنا. وزوّد في «عن التطبيق» خاصية [[url]] على لينك لصفحة التطبيق، وافحص الصفحة في Schema Markup Validator.`, sol: R`**شجرة الملفات بعد المشروع ده:**

~~~text
nour-notes/
  index.html       القايمة والجولة (المشاريع ١ و ٢ و ٤)
  note.html        الملاحظة اللي بتتعدّل (المشروع ٣)
  settings.html    الإعدادات (المشروع ده)
~~~

**ترتيب البناء:** الهيكل والأقسام الخمسة بعناوينها ← قسم الحساب ← المظهر ← المزامنة ← النافذة وزرارها ← microdata على آخر قسم. وبعد كل قسم افتح الصفحة وجرّبه قبل اللي بعده.

~~~html settings.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الإعدادات | دفتر نور</title>
<style>
  [inert] { opacity: 0.5; }
</style>
</head>
<body>
<header>
  <p><a href="index.html">كل الملاحظات</a></p>
  <h1>الإعدادات</h1>
</header>
<main>
  <section aria-labelledby="acc-title">
    <h2 id="acc-title">الحساب</h2>
    <p>الاسم الظاهر:
      <span contenteditable="plaintext-only" role="textbox" aria-label="الاسم الظاهر" spellcheck="false" autocapitalize="words" enterkeyhint="done">منى علي</span>
      <button type="button" popovertarget="namehelp" aria-label="مساعدة عن الاسم الظاهر">؟</button>
    </p>
    <div id="namehelp" popover>دوس على الاسم واكتب الاسم الجديد. ده اللي بيظهر على ملاحظاتك المشتركة.</div>
    <form action="/settings/email" method="post">
      <p><label for="email">الإيميل</label>
      <input id="email" name="email" type="email" autocomplete="email" spellcheck="false" enterkeyhint="done" required></p>
      <button type="submit">حدّث الإيميل</button>
    </form>
  </section>

  <section aria-labelledby="look-title">
    <h2 id="look-title">المظهر</h2>
    <button type="button" popovertarget="theme">اختار لون الدفتر</button>
    <div id="theme" popover>
      <p><button type="button" data-color="yellow">أصفر</button></p>
      <p><button type="button" data-color="green">أخضر</button></p>
      <p><button type="button" data-color="blue">أزرق</button></p>
    </div>
  </section>

  <section aria-labelledby="sync-title" inert>
    <h2 id="sync-title">المزامنة (قريبًا)</h2>
    <p><label><input type="checkbox" name="sync"> زامن ملاحظاتي على كل أجهزتي</label></p>
    <button type="button">زامن دلوقتي</button>
  </section>

  <section aria-labelledby="danger-title">
    <h2 id="danger-title">منطقة الخطر</h2>
    <button type="button" onclick="bye.showModal()">امسح حسابي</button>
  </section>

  <section aria-labelledby="about-title" itemscope itemtype="https://schema.org/SoftwareApplication">
    <h2 id="about-title">عن التطبيق</h2>
    <p><span itemprop="name" lang="en" translate="no">Nour Notes</span>، نسخة <span itemprop="softwareVersion">1.0</span></p>
    <p>تطبيق <span itemprop="applicationCategory">ملاحظات</span> بيشتغل على <span itemprop="operatingSystem">أي متصفح حديث</span>.</p>
    <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      السعر: <data itemprop="price" value="0">مجاني</data>
      <meta itemprop="priceCurrency" content="EGP">
    </p>
    <p>من تصميم <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">منى علي</span></span></p>
  </section>
</main>

<dialog id="bye" aria-labelledby="bye-title" closedby="none">
  <h2 id="bye-title">تمسح حسابك؟</h2>
  <p>كل ملاحظاتك هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel" autofocus>لأ، خليني</button>
    <button value="delete">امسح حسابي</button>
  </form>
</dialog>
</body>
</html>
~~~

~~~view 775 شكل settings.html (جرّب كل قسم)
<style>
  [inert] { opacity: 0.5; }
</style>
<header>
  <p><a>كل الملاحظات</a></p>
  <h1>الإعدادات</h1>
</header>
<main>
  <section aria-labelledby="acc-title">
    <h2 id="acc-title">الحساب</h2>
    <p>الاسم الظاهر:
      <span contenteditable="plaintext-only" role="textbox" aria-label="الاسم الظاهر" spellcheck="false" autocapitalize="words" enterkeyhint="done">منى علي</span>
      <button type="button" popovertarget="namehelp" aria-label="مساعدة عن الاسم الظاهر">؟</button>
    </p>
    <div id="namehelp" popover>دوس على الاسم واكتب الاسم الجديد. ده اللي بيظهر على ملاحظاتك المشتركة.</div>
    <form action="/settings/email" method="post">
      <p><label for="email">الإيميل</label>
      <input id="email" name="email" type="email" autocomplete="email" spellcheck="false" enterkeyhint="done" required></p>
      <button type="submit">حدّث الإيميل</button>
    </form>
  </section>

  <section aria-labelledby="look-title">
    <h2 id="look-title">المظهر</h2>
    <button type="button" popovertarget="theme">اختار لون الدفتر</button>
    <div id="theme" popover>
      <p><button type="button" data-color="yellow">أصفر</button></p>
      <p><button type="button" data-color="green">أخضر</button></p>
      <p><button type="button" data-color="blue">أزرق</button></p>
    </div>
  </section>

  <section aria-labelledby="sync-title" inert>
    <h2 id="sync-title">المزامنة (قريبًا)</h2>
    <p><label><input type="checkbox" name="sync"> زامن ملاحظاتي على كل أجهزتي</label></p>
    <button type="button">زامن دلوقتي</button>
  </section>

  <section aria-labelledby="danger-title">
    <h2 id="danger-title">منطقة الخطر</h2>
    <button type="button" onclick="bye.showModal()">امسح حسابي</button>
  </section>

  <section aria-labelledby="about-title" itemscope itemtype="https://schema.org/SoftwareApplication">
    <h2 id="about-title">عن التطبيق</h2>
    <p><span itemprop="name" lang="en" translate="no">Nour Notes</span>، نسخة <span itemprop="softwareVersion">1.0</span></p>
    <p>تطبيق <span itemprop="applicationCategory">ملاحظات</span> بيشتغل على <span itemprop="operatingSystem">أي متصفح حديث</span>.</p>
    <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      السعر: <data itemprop="price" value="0">مجاني</data>
      <meta itemprop="priceCurrency" content="EGP">
    </p>
    <p>من تصميم <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">منى علي</span></span></p>
  </section>
</main>

<dialog id="bye" aria-labelledby="bye-title" closedby="none">
  <h2 id="bye-title">تمسح حسابك؟</h2>
  <p>كل ملاحظاتك هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel" autofocus>لأ، خليني</button>
    <button value="delete">امسح حسابي</button>
  </form>
</dialog>
~~~

**هتشوف إيه:**

- **الحساب:** دوس على «منى علي» واكتب. «؟» بيطلّع جملة الشرح في نص الصفحة.
- **المظهر:** الزرار بيطلّع تلات أزرار ألوان. لو تلميح «؟» كان مفتوح، بيتقفل.
- **المزامنة:** القسم باهت، والـ checkbox والزرار مبيردوش.
- **منطقة الخطر:** النافذة بتفتح والفوكس على «لأ، خليني». Esc والضغط برّه مبيعملوش حاجة.
- **عن التطبيق:** تلات سطور عادية. كلمة «مجاني» هي السعر.

**كل قرار وسببه:**

| القرار | السبب |
|---|---|
| الاسم الظاهر [[<span contenteditable="plaintext-only">]] مش [[<input>]] | بيتعدّل في مكانه وسط الجملة. ومعاه [[role="textbox"]] و [[aria-label]] لأن [[<span>]] ملوش معنى |
| الإيميل [[<input>]] جوه فورم | ده بيتبعت للسيرفر، و [[contenteditable]] مبيتبعتش |
| [[spellcheck="false"]] على الاسم والإيميل | مش كلام لغة |
| التلميح والألوان [[popover]] عادي | حاجات صغيرة بتتقفل لوحدها، وواحدة بس في المرة |
| المزامنة [[inert]] مش [[hidden]] | الزائر يشوف إن الميزة جاية. والعنوان فيه «(قريبًا)» عشان السبب يبقى مكتوب |
| نافذة المسح [[closedby="none"]] | قرار ميتلغيش ولا يتاخد بالغلط: لازم زرار صريح. وفيها زرار «لأ، خليني» فالزائر مش محبوس |
| [[autofocus]] على «لأ، خليني» | هو الاختيار الآمن |
| النافذة بـ [[onclick]] مش [[command]] | [[command]] لسه جديد (Chrome 135 و Firefox 144 و Safari 26.2)، وزرار مسح الحساب لازم يشتغل عند الكل |
| microdata مش JSON-LD | صفحة HTML مكتوبة بالإيد، والبيانات هي نفس الكلام الباين |
| «مجاني» جوه [[<data value="0">]] | الزائر بيقرا كلمة، والماكينة عايزة رقم |

**الغلطات اللي بتحصل في المشروع ده:**

- [[id]] فيه شرطة للنافذة أو الـ popover اللي بيتنادى من [[onclick]]: [[bye]] شغال، [[bye-dialog]] لأ. (الـ popover بيتنادى من [[popovertarget]] فالشرطة فيه عادي، بس خليهم كلمة واحدة وخلاص.)
- زرار «؟» جوه الفورم من غير [[type="button"]]: هيبعت الفورم. هنا هو برّه الفورم وعليه [[type]] برضه.
- [[itemprop="name"]] بتاع المصممة برّه الـ [[itemscope]] بتاعها: هيتحسب اسم تاني للتطبيق.

~~~text القياس من Chrome
تلميح «؟» ثم قايمة الألوان:          القايمة اتفتحت والتلميح اتقفل
كليك على checkbox المزامنة:           checked = false   (الكليك ماوصلش)
الاسم الظاهر في accessibility tree:    role = textbox ، name = "الاسم الظاهر"
«امسح حسابي»:                         matches(':modal') = true ، والفوكس على «لأ، خليني»
Esc ، وبعدين كليك برّه:                النافذة لسه مفتوحة
«حدّث الإيميل» والخانة فاضية:          الفورم مش valid ، ومفيش طلب اتبعت

microdata (خوارزمية المواصفة):
حاجة نوعها https://schema.org/SoftwareApplication
  name = "Nour Notes" ، softwareVersion = "1.0"
  applicationCategory = "ملاحظات" ، operatingSystem = "أي متصفح حديث"
  offers = حاجة نوعها https://schema.org/Offer:   price = "0" ، priceCurrency = "EGP"
  author = حاجة نوعها https://schema.org/Person:  name = "منى علي"
~~~

**اللي الصفحة لسه مبتعملوش** (وده شغل JavaScript والسيرفر): حفظ الاسم الجديد، وتطبيق اللون، وتنفيذ المسح بعد [[returnValue = delete]]، واستقبال الإيميل على [[/settings/email]].` },
        { lvl: 'فكرة', dir: "nour-shop", t: R`صفحة منتج لمتجر صغير: بيانات لمحرك البحث، وطلب في نافذة`, what: R`صفحة منتج واحد لمتجر تعرفه أو تتخيله (هنا: «نوتة نور A5» من «متجر دار نور»)، لزائر جاي من البحث وعايز يعرف السعر ويطلب. [[index.html]] فيها: المنتج في [[<article>]] عليه microdata [[Product]] (اسم، وصف، ماركة، وعرض فيه سعر بالرقم وعملة وحالة التوفر) و [[data-sku]]، وزرار «اطلب دلوقتي» بيفتح نافذة modal فيها فورم طلب حقيقي ([[post]]، اسم وموبايل إجباريين بتلميحات الكتابة) وزرار «إلغاء» بيقفل من غير فحص، وزرار «مقاسات الورق» بيفتح popover، وقسم «أسئلة شائعة» بـ [[<details>]]. الفكرة إنك **تختار الأداة لكل حاجة بتتفتح** من جدول درس «popover و popovertarget»، وتستخدم نفس نافذة وقايمة مشاريع «دفتر نور» في سياق تاني.`, done: R`الـ microdata بتطلّع منتج واحد بعرضه. «اطلب دلوقتي» بيفتح النافذة والفوكس في خانة الاسم. «أكّد الطلب» والخانات فاضية مبيبعتش، و «إلغاء» بيقفل من غير ما يشتكي. المقاسات popover بيتقفل لوحده، والأسئلة بتتفرد في مكانها.`, ext: R`بدّل المنتج بمنتج من عندك وغيّر الخصايص. زوّد [[image]] بصورة و [[aggregateRating]] لو فيه تقييمات حقيقية. اكتب نفس البيانات JSON-LD وقارن الاتنين في Schema Markup Validator (وسيب واحد بس في الصفحة). وزوّد صفحة [[thanks.html]] الفورم يروحلها.`, sol: R`نسخة نموذجية:

~~~live 372 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نوتة نور A5 | متجر دار نور</title>
</head>
<body>
<header>
  <p><strong>متجر دار نور</strong></p>
</header>
<main>
  <article itemscope itemtype="https://schema.org/Product" data-sku="NB-A5-120">
    <h1 itemprop="name">نوتة نور A5</h1>
    <p itemprop="description">نوتة 120 صفحة بغلاف قماش وورق كريمي.</p>
    <p>الماركة: <span itemprop="brand">دار نور</span></p>
    <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      <data itemprop="price" value="85.00">٨٥ جنيه</data>
      <meta itemprop="priceCurrency" content="EGP">
      <link itemprop="availability" href="https://schema.org/InStock">(متاحة)
    </p>
    <p>
      <button type="button" onclick="order.showModal()">اطلب دلوقتي</button>
      <button type="button" popovertarget="sizes">مقاسات الورق</button>
    </p>
  </article>

  <div id="sizes" popover>
    <p><strong>A5:</strong> 14.8 × 21 سم (نص ورقة الطباعة العادية)</p>
    <p><strong>A6:</strong> 10.5 × 14.8 سم (حجم الجيب)</p>
  </div>

  <h2>أسئلة شائعة</h2>
  <details>
    <summary>الشحن بياخد قد إيه؟</summary>
    <p>من يومين لأربعة أيام شغل.</p>
  </details>
  <details>
    <summary>ينفع أرجّعها؟</summary>
    <p>أيوه، خلال ١٤ يوم ولو لسه في غلافها.</p>
  </details>
</main>

<dialog id="order" aria-labelledby="order-title">
  <h2 id="order-title">اطلب «نوتة نور A5»</h2>
  <form action="/orders" method="post">
    <input type="hidden" name="sku" value="NB-A5-120">
    <p><label for="name">الاسم</label><br>
    <input id="name" name="name" autocomplete="name" autocapitalize="words" enterkeyhint="next" required autofocus></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" enterkeyhint="send" required></p>
    <button type="submit">أكّد الطلب</button>
    <button type="submit" formmethod="dialog" formnovalidate value="cancel">إلغاء</button>
  </form>
</dialog>
</body>
</html>
~~~

**هتشوف إيه:**

- اسم المتجر، وكارت المنتج: اسم ووصف وماركة و «٨٥ جنيه (متاحة)»، وزرارين.
- «مقاسات الورق»: صندوق صغير فوق الصفحة، بيتقفل بأي ضغطة برّه.
- «اطلب دلوقتي»: نافذة فيها خانتين، والمؤشر في «الاسم». «أكّد الطلب» وهي فاضية: رسالة المتصفح. «إلغاء»: بتتقفل.
- الأسئلة: كل سؤال بيتفرد تحته.

**ليه اخترت كل أداة:**

| الحاجة | الأداة | ليه |
|---|---|---|
| فورم الطلب | [[<dialog>]] modal | الزائر بيكتب بيانات: مينفعش ضغطة برّه تضيّعها، ولا يشتغل في الصفحة اللي ورا |
| المقاسات | [[popover]] | معلومة سريعة يبص عليها ويكمّل |
| الأسئلة | [[<details>]] | محتوى من الصفحة، ولازم يتلاقى بـ Ctrl+F ومن محرك البحث |

**وتفاصيل الفورم اللي جوه النافذة:**

- الفورم [[method="post"]] عادي، فـ «أكّد الطلب» بيبعت للسيرفر فعلًا. مش [[method="dialog"]]: ده كان هيقفل النافذة ويرمي البيانات.
- «إلغاء» عليه [[formmethod="dialog"]] (يقفل بدل ما يبعت) و [[formnovalidate]] (من غير ما يطلب ملء الخانات): الاتنين من درس «أزرار الفورم».
- «أكّد الطلب» الأول في الكود: Enter جوه خانة بيأكّد.
- [[autofocus]] على خانة الاسم: الزائر فتح النافذة عشان يكتب.
- [[enterkeyhint="next"]] على الاسم و [[send]] على الموبايل (آخر خانة)، و [[autocapitalize="words"]] على الاسم.
- [[data-sku]] على الكارت للكود، ونفس القيمة في حقل [[hidden]] جوه الفورم عشان تتبعت.

**ليه microdata هنا:** صفحة منتج هي أكتر مكان البيانات المنظمة بتفرق فيه: السعر والتوفر ممكن يظهروا تحت النتيجة في البحث. والصفحة مكتوبة بالإيد فالبيانات اتحطت على الكلام نفسه.

**الغلطة الشائعة:** فورم الطلب جوه popover. أول ضغطة برّه (أو على الكيبورد اللي طالع في الموبايل) بتقفله واللي اتكتب بيروح.

~~~text القياس من Chrome
«مقاسات الورق»:                    popover اتفتح
«اطلب دلوقتي»:                     matches(':modal') = true ، والـ popover اتقفل ، والفوكس في خانة الاسم
«أكّد الطلب» والخانات فاضية:       النافذة لسه مفتوحة ، والفورم مش valid
«إلغاء» والخانات فاضية:            اتقفلت ، returnValue = cancel ، ومفيش طلب اتبعت
أول سؤال:                          details open = true

microdata (خوارزمية المواصفة):
حاجة نوعها https://schema.org/Product
  name = "نوتة نور A5" ، description = "نوتة 120 صفحة بغلاف قماش وورق كريمي." ، brand = "دار نور"
  offers = حاجة نوعها https://schema.org/Offer:
             price = "85.00" ، priceCurrency = "EGP" ، availability = "https://schema.org/InStock"
~~~` }
      ],
      items: [
        {
          cmd: "dialog و closedby",
          title: "نافذة تأكيد من الـ HTML نفسه: dialog و show() و showModal() و method=\"dialog\" و closedby",
          pre: ["css/a و button", { to: "css/أزرار الفورم: formaction وإخواته", why: R`الزرار جوه فورم بيبعته، و [[value]] الزرار اللي اتداس: نفس الفكرة بتقفل الـ dialog` }],
          ref: [
            { t: "MDN: <dialog>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog" },
            { t: "WHATWG: the dialog element", url: "https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element" },
            { t: "WHATWG: closedby", url: "https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-closedby" },
            { t: "MDN: HTMLDialogElement.showModal()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal" },
            { t: "MDN: inert", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert" }
          ],
          desc: R`[[<dialog>]] نافذة صغيرة بتطلع فوق الصفحة: «متأكد إنك عايز تمسح؟»، أو فورم صغير، أو رسالة. المتصفح نفسه بيعمل الشغل الصعب: بيحطها فوق كل حاجة، وبينقل الفوكس جواها، وبيقفلها بـ Esc، وبيوقّف الصفحة اللي وراها.
بتتفتح بسطر JavaScript واحد ([[showModal()]])، وبتتقفل من غير JavaScript خالص بـ [[<form method="dialog">]].
(درس «Dialog» اللي في وحدة shadcn عن component جاهز في React. ده العنصر الأصلي اللي في الـ HTML.)`,
          example: R`<button type="button" onclick="del.showModal()">امسح الملاحظة</button>
<dialog id="del" aria-labelledby="del-title" closedby="any">
  <h2 id="del-title">تمسح «مشتريات الأسبوع»؟</h2>
  <p>الملاحظة هتتمسح ومش هترجع.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>`,
          flag: "script",
          lines: [
            R`الزرار اللي بيفتح. [[type="button"]] عشان ميبعتش فورم، و [[onclick="del.showModal()"]] سطر JavaScript واحد: هات العنصر اللي الـ [[id]] بتاعه [[del]] وافتحه كنافذة modal.`,
            R`النافذة نفسها. مقفولة ومش باينة لحد ما تتفتح. [[id="del"]] هو الاسم اللي الزرار بيناديها بيه، و [[aria-labelledby="del-title"]] بيقول لقارئ الشاشة إن اسم النافذة هو العنوان اللي جواها، و [[closedby="any"]] بيخلّيها تتقفل كمان لما الزائر يدوس برّاها.`,
            R`عنوان النافذة، وعليه الـ [[id]] اللي [[aria-labelledby]] بيشاور عليه.`,
            R`شرح قصير للي هيحصل، عشان الزائر يقرر وهو فاهم.`,
            R`[[method="dialog"]]: الفورم ده مبيبعتش حاجة لسيرفر. أي زرار إرسال جواه **بيقفل النافذة** وبس.`,
            R`أول زرار في الفورم، فالفوكس بييجي عليه أول ما النافذة تتفتح. [[value="cancel"]] هي القيمة اللي النافذة هتفتكرها لو هو اللي اتداس.`,
            R`الزرار التاني. لو اتداس، النافذة بتتقفل وقيمتها [[delete]]، وده اللي كود الصفحة هيبص عليه عشان يعرف الزائر اختار إيه.`,
            R`[[</form>]] بيقفل الفورم: الزرارين اللي جواه هم اللي بيقفلوا النافذة.`,
            R`آخر النافذة. كل اللي بين [[<dialog>]] و [[</dialog>]] مستخبي لحد ما تتفتح.`
          ],
          teach: R`## الفكرة في سطرين

[[<dialog>]] صندوق مستخبي في الصفحة. لما يتفتح «modal» المتصفح بيعمل أربع حاجات لوحده: بيحطه فوق كل الصفحة، وبينقل الفوكس جواه، وبيوقّف كل اللي وراه (لا كليك ولا Tab)، وبيقفله بـ Esc ويرجّع الفوكس للزرار اللي فتحه.

كل القياسات في الدرس من Chrome 157 على Windows 11، بضغطات كيبورد وكليكات حقيقية.

---

## ١. [[<dialog>]] و [[<dialog open>]]

العنصر لوحده **مقفول**: مكتوب في الكود ومش باين في الصفحة.

~~~text القياس من Chrome
<dialog> من غير open:      display = none
<dialog open>:             display = block ، position = absolute ، border = 3px solid ، padding = 16px
                           الخلفية أبيض والكلام أسود ، وفي نص عرض الصفحة (margin: auto)
                           وهو مش modal:  matches(':modal') = false
~~~

[[open]] attribute من غير قيمة (زي [[required]]): وجوده معناه «النافذة مفتوحة».

~~~live 86 dialog مكتوب عليه open
<p>كلام الصفحة العادي.</p>
<dialog open>
  <p>أنا dialog مفتوح من الكود.</p>
  <form method="dialog"><button>اقفل</button></form>
</dialog>
<p>كلام تاني تحت.</p>
~~~

**هتشوف إيه:** صندوق ببرواز أسود في نص العرض، فوق الكلام. دوس «اقفل»: بيختفي، ومفيش أي طريقة ترجّعه (مفيش زرار بيفتحه).

**ومتكتبش [[open]] بإيدك.** MDN بيقول كده صريح، لسببين:

- النافذة اللي بتتفتح بـ [[open]] **مش modal**: الصفحة اللي وراها لسه شغالة، و Esc مبيقفلهاش.
- المتصفح هو اللي بيكتب [[open]] وبيمسحه لما تفتح وتقفل. انت بتستخدمه بس عشان تعرف الحالة (وفي الـ CSS بعدين بتمسك النافذة المفتوحة بيه).

---

## ٢. [[show()]] و [[showModal()]]: سطر JavaScript واحد

الفتح محتاج JavaScript، وهو سطر واحد جوه [[onclick]] على الزرار:

~~~html
<button type="button" onclick="note.show()">افتح عادي</button>
<button type="button" onclick="note.showModal()">افتح modal</button>
<dialog id="note">...</dialog>
~~~

> ده سطر JavaScript، وهتفهمه في كورس JavaScript. دلوقتي كفاية تعرف إن [[note]] هو الـ [[id]] بتاع الـ dialog، و [[.showModal()]] معناها «افتحه كنافذة modal»، و [[.show()]] «افتحه عادي». عشان السطر القصير ده يشتغل، خلّي الـ [[id]] كلمة واحدة من حروف إنجليزي ([[note]] مش [[my-note]])، ومتكونش كلمة ليها معنى تاني جوه [[onclick]] زي [[open]] و [[close]] و [[clear]] و [[title]] و [[name]].

جرّب الاتنين:

~~~live 250 دوس كل زرار، وجرّب Esc و «زرار في الصفحة»
<p><button type="button" onclick="note.show()">افتح بـ show()</button>
<button type="button" onclick="note.showModal()">افتح بـ showModal()</button></p>
<p><button type="button" onclick="hits.value = Number(hits.value) + 1">زرار في الصفحة</button> اتداس <output id="hits">0</output> مرة</p>
<dialog id="note">
  <p>ملاحظة: الاجتماع الساعة ٥.</p>
  <form method="dialog"><button>تمام</button></form>
</dialog>
~~~

(سطر [[onclick]] التاني عدّاد بس: كل ضغطة على «زرار في الصفحة» بتزوّد الرقم واحد، عشان تشوف الزرار شغال ولا لأ.)

**هتشوف إيه:**

- **[[show()]]:** النافذة طلعت، و «زرار في الصفحة» لسه بيعدّ، و Esc مبيعملش حاجة. اقفلها بـ «تمام».
- **[[showModal()]]:** النافذة في نص الشاشة ووراها غبشة خفيفة، و «زرار في الصفحة» **مبيعدّش** مهما دوست، و Esc بيقفلها.

~~~text القياس من Chrome
                                show()            showModal()
modal؟  matches(':modal')        false             true
position                         absolute          fixed  (في نص الشاشة حتى لو الصفحة اتعملها scroll)
الفوكس بعد الفتح                 أول عنصر جواه      أول عنصر جواه
Esc                              مبيقفلش            بيقفل
كليك على زرار في الصفحة          اشتغل (1)          ماشتغلش (0)
الغبشة ::backdrop                مفيش               rgba(0, 0, 0, 0.1)
أقصى مقاس                        من غير حد          calc(100% - 38px) عرض وارتفاع
~~~

| | [[show()]] | [[showModal()]] |
|---|---|---|
| اسمه | non-modal | modal |
| الصفحة اللي ورا | شغالة عادي | واقفة |
| يتقفل بـ Esc | لأ | أيوه |
| بيتستخدم في | حاجة جنب الشغل: شات صغير، لوحة أدوات | حاجة لازم تترد عليها الأول: تأكيد حذف، فورم تسجيل دخول |

في الشغل الحقيقي تسعة من عشرة [[showModal()]].

---

## ٣. يعني إيه «modal»؟ الصفحة اللي ورا بقت inert

«modal» معناها: **مفيش حاجة في الصفحة تشتغل غير النافذة دي** لحد ما تتقفل. المواصفة بتقول إن المتصفح بيخلّي باقي الصفحة «inert» (خامل). واللي اتقاس:

~~~text القياس من Chrome (dialog مفتوح بـ showModal وجواه خانة وزرارين)
كليك بالماوس على زرار في الصفحة اللي ورا:      الزرار ماتداسش (العدّاد 0)
Tab ست مرات:                                   الخانة > لا > أيوه > شريط المتصفح > الخانة > لا
                                               (ولا مرة راح لزرار أو لينك في الصفحة اللي ورا)
الزرار اللي ورا في accessibility tree:          ignored = true   (قارئ الشاشة مش شايفه)
الـ dialog نفسه:                                role = dialog ، modal = true
~~~

- **الماوس:** أي كليك برّه النافذة مبيوصلش للي تحته.
- **الكيبورد:** Tab بيلف جوه النافذة بس.
- **قارئ الشاشة:** الصفحة اللي ورا مش موجودة بالنسباله.

وده من غير ما تكتب [[inert]] على حاجة: المتصفح بيعمله لوحده مع [[showModal()]]. (الـ attribute نفسه، لما تحتاج تعطّل جزء بإيدك، في درس «hidden و inert».)

### الغبشة [[::backdrop]] والحالة [[:modal]]

دول اسمين بتوع CSS هتقابلهم:

- [[::backdrop]]: الطبقة اللي المتصفح بيحطها ورا النافذة الـ modal وبتغطي الصفحة كلها. لونها الافتراضي أسود شفاف 10% (اتقاس: [[rgba(0, 0, 0, 0.1)]]).
- [[:modal]]: بيمسك النافذة وهي مفتوحة modal بس.

تلوينهم وتغيير شكل النافذة في وحدات الـ CSS. هنا كفاية تعرف إنهم موجودين وإن الشكل الافتراضي بتاع المتصفح شغال.

---

## ٤. الفوكس: بيروح فين وبيرجع فين

~~~text القياس من Chrome
فتح بـ showModal() وجواه خانة وزرارين:     الفوكس على الخانة (أول عنصر بياخد فوكس)
dialog جواه كلام بس، من غير زرار:          الفوكس على الـ <dialog> نفسه
dialog فيه زرارين والتاني عليه autofocus:   الفوكس على التاني
بعد القفل (Esc أو زرار):                    الفوكس رجع للزرار اللي فتح النافذة
~~~

- الفوكس بيروح **لأول عنصر جواها ينفع ياخد فوكس**. في نافذة «تمسح؟» خلّي أول زرار «إلغاء»: الزائر اللي بيدوس Enter بسرعة ميمسحش بالغلط.
- عايز الفوكس يبدأ على عنصر تاني؟ اكتب عليه [[autofocus]] (درس «autofocus و accesskey و draggable»).
- بعد القفل الفوكس بيرجع للزرار اللي فتح، فاللي ماشي بالكيبورد بيكمّل من مكانه.
- **متكتبش [[tabindex]] على [[<dialog>]]** (MDN: ممنوع). الفوكس للي جواه.

---

## ٥. [[<form method="dialog">]]: القفل من غير JavaScript

في درس «GET و POST و enctype» [[method]] كان [[get]] أو [[post]]. فيه قيمة تالتة: [[dialog]]. الفورم اللي عليه [[method="dialog"]] وهو جوه [[<dialog>]] **مبيبعتش أي طلب**: أي زرار إرسال جواه بيقفل النافذة.

~~~live 193 افتح واختار، وبص على السطر اللي تحت
<button type="button" onclick="del.showModal()">امسح الملاحظة</button>
<p>آخر اختيار: <output id="res">(لسه)</output></p>
<dialog id="del" onclose="res.value = del.returnValue || '(اتقفلت بـ Esc)'">
  <p>تمسح «مشتريات الأسبوع»؟</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
~~~

(سطر [[onclose]] JavaScript برضه: لما النافذة تتقفل، اكتب قيمتها في السطر اللي تحت الزرار. القيمة اسمها [[returnValue]].)

**هتشوف إيه:**

- دوست «إلغاء»: النافذة اتقفلت والسطر بقى [[cancel]].
- دوست «امسح»: [[delete]].
- قفلت بـ Esc: القيمة فاضية.

~~~text القياس من Chrome
دوسنا «أيوه» (value="yes"):      النافذة اتقفلت ، returnValue = yes ، عنوان الصفحة ماتغيّرش (مفيش طلب)
Esc:                             النافذة اتقفلت ، returnValue = ""
Enter جوه خانة في الفورم:        اتقفلت ، returnValue = قيمة أول زرار إرسال
~~~

- [[value]] على الزرار هي اللي بتتسجل في [[returnValue]]: نفس [[value]] اللي الزرار كان بيبعتها للسيرفر في درس «أزرار الفورم».
- القاعدة بتاعة «Enter بيدوس أول زرار إرسال» لسه شغالة هنا. عشان كده «إلغاء» الأول.
- زرار واحد عايزه يقفل وهو في فورم عادي؟ [[<button formmethod="dialog">]] بيعمل كده للزرار ده بس.
- زرار «اقفل» من غير فورم خالص: [[<button commandfor="del" command="close">]] (درس «popover و popovertarget»).

الـ HTML بيقفل النافذة وبيسجّل الاختيار. **تنفيذ** الاختيار (المسح الفعلي) شغل JavaScript أو السيرفر.

---

## ٦. [[<dialog closedby="any">]]: مين يقدر يقفلها

فيه تلات طرق نافذة تتقفل بيهم: الزائر يدوس **برّاها**، أو يدوس **Esc** (أو زرار الرجوع في الموبايل)، أو **زرار انت كاتبه** جواها. [[closedby]] بيحدد المسموح:

| القيمة | كليك برّه | Esc | زرار جواها |
|---|---|---|---|
| [[closedby="any"]] | بيقفل | بيقفل | بيقفل |
| [[closedby="closerequest"]] | لأ | بيقفل | بيقفل |
| [[closedby="none"]] | لأ | لأ | بيقفل |

~~~text القياس من Chrome (showModal ، وبعدين كليك برّه ، وبعدين Esc)
closedby="any":            الكليك برّه قفلها ، و Esc بيقفلها
closedby="closerequest":   الكليك برّه ماقفلهاش ، و Esc قفلها
closedby="none":           لا الكليك ولا Esc ، الزرار اللي جواها بس
من غير closedby:           زي closerequest مع showModal() ، وزي none مع show()
~~~

~~~live 193 جرّب تقفل كل واحدة بالضغط برّاها وبـ Esc
<p><button type="button" onclick="news.showModal()">إيه الجديد؟ (any)</button>
<button type="button" onclick="terms.showModal()">الشروط (none)</button></p>
<dialog id="news" closedby="any">
  <p>ضفنا الوضع الغامق. دوس في أي حتة برّه عشان تقفل.</p>
  <form method="dialog"><button>تمام</button></form>
</dialog>
<dialog id="terms" closedby="none">
  <p>لازم توافق على الشروط عشان تكمّل.</p>
  <form method="dialog"><button value="ok">موافق</button></form>
</dialog>
~~~

**هتشوف إيه:** نافذة «إيه الجديد؟» بتتقفل بأي ضغطة برّاها أو Esc. نافذة «الشروط» مبتتقفلش غير بزرار «موافق».

إمتى كل واحدة:

- [[any]]: نافذة معلومات أو قايمة اختيارات، قفلها ملوش تمن.
- [[closerequest]] (الافتراضي مع modal): تأكيد أو فورم. ضغطة غلط برّه مش هتضيّع اللي اتكتب.
- [[none]]: لازم الزائر يختار. قليل، ولازم يبقى جواها زرار بيقفل، وإلا الزائر اتحبس.

**الدعم (جدول MDN):** Chrome 134 و Firefox 141 و Safari 27.3. يعني جديدة. في متصفح أقدم الـ attribute بيتجاهل والنافذة بتشتغل بالافتراضي (Esc بيقفل، والكليك برّه لأ)، فمفيش حاجة بتبوظ.

---

## ٧. اسم النافذة: [[<dialog aria-labelledby="del-title">]]

قارئ الشاشة لما النافذة تتفتح بيقول اسمها. من غير اسم بيقول «dialog» بس.

~~~text القياس من Chrome (accessibility tree)
<dialog> فيه <h2> من غير ربط:                    role = dialog ، name = ""
<dialog aria-labelledby="t"> و <h2 id="t">:      role = dialog ، name = "امسح الملاحظة؟"
~~~

فاكتب عنوان جوه النافذة، واديه [[id]]، واكتب نفس الـ [[id]] في [[aria-labelledby]] على [[<dialog>]]. نفس فكرة [[for]] و [[id]] في الـ label. (النطق نفسه: من MDN، مش متجرّب بقارئ شاشة هنا.)

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[<dialog open>]] مكتوب في الكود | النافذة باينة من أول تحميل، ومش modal، و Esc مبيقفلهاش |
| [[show()]] لنافذة تأكيد | الزائر يقدر يدوس على الصفحة اللي ورا ويسيب السؤال من غير رد |
| [[showModal()]] على نافذة مفتوحة أصلًا بـ [[open]] أو [[show()]] | خطأ في الـ Console (النص تحت) والنافذة بتفضل non-modal |
| زرار «إلغاء» من غير فورم ولا [[command]] | مبيعملش حاجة: الزرار برّه أي فورم ملوش شغلة |
| الفورم اللي جوه النافذة من غير [[method="dialog"]] | الزرار بيبعت GET والصفحة بتتحمّل من جديد |
| «امسح» أول زرار | الفوكس عليه و Enter بيمسح |
| [[closedby="none"]] ومفيش زرار قفل | الزائر محبوس، ومفيش غير إنه يقفل التاب |
| [[<div>]] بـ CSS بدل [[<dialog>]] | الفوكس بيفضل ورا، و Tab بيخرج للصفحة، و Esc مبيقفلش: كل ده لازم يتكتب JavaScript |
| نافذة من غير اسم | قارئ الشاشة بيقول «dialog» وخلاص |

~~~text الخطأ الحقيقي في Console (Chrome)
InvalidStateError: Failed to execute 'showModal' on 'HTMLDialogElement': The dialog is already open as a non-modal dialog, and therefore cannot be opened as a modal dialog.
~~~

معناه: النافذة مفتوحة بالفعل «عادي»، ومينفعش تتحوّل modal وهي مفتوحة. الحل: شيل [[open]] من الكود، أو اقفلها الأول.

---

## الخلاصة

- [[<dialog>]] مقفول لحد ما يتفتح. الفتح: [[showModal()]] (modal) أو [[show()]]. ومتكتبش [[open]] بإيدك.
- modal = فوق كل حاجة، والفوكس جواه، والصفحة اللي ورا واقفة، و Esc بيقفل، والفوكس بيرجع للزرار.
- القفل من غير JavaScript: [[<form method="dialog">]]، و [[value]] الزرار بتتسجل في [[returnValue]].
- [[closedby]]: [[any]] (حتى الكليك برّه) و [[closerequest]] (Esc وزرار) و [[none]] (زرار بس).
- أول زرار هو الآمن، والنافذة ليها اسم بـ [[aria-labelledby]].`,
          try: R`اعمل ملف [[dialog.html]] فيه زرار «اخرج من الحساب» بيفتح نافذة modal بتسأل «متأكد إنك عايز تخرج؟» وفيها زرارين: «لأ، خليني» ([[value="stay"]]) و «اخرج» ([[value="logout"]]). افتحه في Chrome وجرّب: Tab كذا مرة، وكليك على الصفحة اللي ورا، و Esc، وكل زرار.`,
          sol: R`~~~html dialog.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حسابي</title>
</head>
<body>
<h1>حسابي</h1>
<p>أهلًا يا منى.</p>
<button type="button" onclick="out.showModal()">اخرج من الحساب</button>

<dialog id="out" aria-labelledby="out-title">
  <h2 id="out-title">متأكد إنك عايز تخرج؟</h2>
  <form method="dialog">
    <button value="stay">لأ، خليني</button>
    <button value="logout">اخرج</button>
  </form>
</dialog>
</body>
</html>
~~~

~~~view 210 شكل الصفحة (دوس الزرار)
<h1>حسابي</h1>
<p>أهلًا يا منى.</p>
<button type="button" onclick="out.showModal()">اخرج من الحساب</button>
<dialog id="out" aria-labelledby="out-title">
  <h2 id="out-title">متأكد إنك عايز تخرج؟</h2>
  <form method="dialog">
    <button value="stay">لأ، خليني</button>
    <button value="logout">اخرج</button>
  </form>
</dialog>
~~~

**هتشوف إيه:**

- النافذة في نص الشاشة، والفوكس على «لأ، خليني» (حواليه برواز الفوكس).
- Tab بيتنقل بين الزرارين (وبيعدّي على شريط المتصفح) ومبيروحش لزرار «اخرج من الحساب» اللي ورا.
- الكليك على «حسابي» أو الزرار اللي ورا مبيعملش حاجة.
- Esc أو أي زرار من الاتنين بيقفل، والفوكس بيرجع على «اخرج من الحساب».

~~~text القياس من Chrome
بعد الفتح:     matches(':modal') = true ، والفوكس على أول زرار
بعد «اخرج»:    النافذة اتقفلت ، returnValue = logout ، والفوكس رجع للزرار اللي فتح
~~~

الخروج الفعلي من الحساب مش هنا: الـ HTML سجّل الاختيار ([[logout]])، والتنفيذ بييجي مع JavaScript.`,
          deep: {
            why: R`قبل [[<dialog>]] كانت النافذة [[<div>]] متلوّن ومحطوط فوق الصفحة بالـ CSS، وكل السلوك بيتكتب بـ JavaScript: نقل الفوكس، وحبسه جوه النافذة، وتعطيل اللي ورا، و Esc، وإرجاع الفوكس. أغلب النوافذ اللي اتكتبت كده كانت ناقصة حاجة منهم، فاللي ماشي بالكيبورد أو بقارئ شاشة كان بيتوه ورا النافذة. دلوقتي المتصفح بيعمل الخمسة صح، وانت بتكتب سطر واحد.`,
            how: R`[[showModal()]] بيعمل تلات حاجات: بيكتب [[open]] على العنصر، وبيحطه في «top layer» (طبقة فوق الصفحة كلها، مفيش [[z-index]] يعلى عليها)، وبيعلّم باقي المستند إنه «blocked by a modal dialog» فيبقى inert: لا كليك ولا فوكس ولا قارئ شاشة. وبعدين بيشغّل «dialog focusing steps»: يدوّر على عنصر عليه [[autofocus]]، وإلا أول عنصر ياخد فوكس، وإلا الـ dialog نفسه. ولما زرار إرسال يتداس جوه فورم [[method="dialog"]]، المتصفح بدل ما يبعت طلب بياخد [[value]] الزرار ويقفل النافذة بيها ([[returnValue]])، ويرجّع الفوكس للعنصر اللي كان عليه قبل الفتح. Esc بيبعت «close request»، و [[closedby]] بيحدد النافذة ترد عليه ولا لأ.`,
            when: R`[[showModal()]]: تأكيد حذف، تسجيل دخول، فورم قصير لازم يخلص، صورة بالحجم الكبير. [[show()]]: لوحة جنب الشغل الزائر بيرجعلها (بحث واستبدال، شات). ولو اللي عايزه قايمة صغيرة أو تلميح بيتقفل لوحده: ده popover مش dialog (الدرس الجاي). ولو محتوى في الصفحة بيتطوي ويتفرد: [[<details>]].`,
            mistakes: R`كتابة [[open]] في الكود. [[show()]] لحاجة لازم تبقى modal. نسيان [[method="dialog"]] فالزرار يحمّل الصفحة. الزرار الخطير أول زرار. نافذة من غير عنوان ومن غير [[aria-labelledby]]. [[closedby="none"]] من غير زرار قفل. ونافذة modal بتتفتح لوحدها أول ما الصفحة تحمّل (اشتراك في النشرة): الزائر لسه مشافش حاجة وانت وقّفتله الصفحة.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صفحة «ملاحظاتي» فيها زرار «امسح الكل». خلّيه يفتح نافذة modal بتسأل «تمسح كل الملاحظات؟» وفيها «إلغاء» ([[cancel]]) و «امسح الكل» ([[clear]])، والاتنين بيقفلوها من غير JavaScript. (من قسم ٢ و ٥ في الشرح)`, done: R`الزرار بيفتح النافذة في نص الشاشة، وأي زرار من الاتنين بيقفلها، وكل الشروط ✓.`, work: { h: 250, start: R`<h1>ملاحظاتي</h1>
<button type="button">امسح الكل</button>

تمسح كل الملاحظات؟
إلغاء
امسح الكل`, checks: [
              { say: R`السؤال والزرارين جوه [[<dialog id="wipe">]]`, q: "dialog#wipe" },
              { say: R`النافذة **مش** مكتوب عليها [[open]]`, q: "dialog[open]", n: 0 },
              { say: R`الزرار اللي في الصفحة بيفتحها بـ [[onclick="wipe.showModal()"]]`, q: "button[type=\"button\"][onclick*=\"wipe.showModal()\"]" },
              { say: R`جوه النافذة [[<form method="dialog">]]`, q: "dialog#wipe form[method=\"dialog\" i]" },
              { say: R`أول زرار في الفورم «إلغاء» وقيمته [[cancel]]`, q: "dialog form button:first-of-type[value=\"cancel\"]" },
              { say: R`«امسح الكل» زرار في الفورم قيمته [[clear]]`, q: "dialog form button[value=\"clear\"]" },
            ] }, sol: R`~~~live 193 الحل (دوس «امسح الكل»)
<h1>ملاحظاتي</h1>
<button type="button" onclick="wipe.showModal()">امسح الكل</button>

<dialog id="wipe">
  <p>تمسح كل الملاحظات؟</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="clear">امسح الكل</button>
  </form>
</dialog>
~~~

**هتشوف إيه:**

- في الصفحة عنوان وزرار بس. السؤال مش باين.
- دوس «امسح الكل»: صندوق في نص الشاشة فيه السؤال وزرارين، والفوكس على «إلغاء».
- أي زرار من الاتنين (أو Esc) بيقفله.

**ليه كده:**

- [[<dialog>]] من غير [[open]]: مستخبي لحد ما [[showModal()]] يفتحه.
- [[method="dialog"]] هو اللي خلّى الزرارين يقفلوا. من غيره كانوا هيبعتوا الفورم والصفحة تتحمّل من جديد.
- «إلغاء» الأول: الفوكس بييجي عليه، و Enter مبيمسحش.
- الـ [[id]] اسمه [[wipe]] مش [[clear]]: جوه [[onclick]] الكلمة [[clear]] (وزيها [[open]] و [[close]] و [[title]]) ليها معنى تاني عند المتصفح، فالسطر مكانش هيلاقي النافذة.

**الغلطة الشائعة:** تكتب [[<dialog open>]] «عشان أشوفها وأنا بكتب» وتنساها. النافذة هتبان من أول تحميل ومش هتبقى modal.

~~~text القياس من Chrome
قبل الضغط:    display بتاع <dialog> = none
بعد الضغط:    matches(':modal') = true ، والفوكس على «إلغاء»
«امسح الكل»:  النافذة اتقفلت ، returnValue = clear
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نافذة «عن التطبيق» المفروض تتفتح modal لما الزائر يدوس الزرار. اللي حاصل: النافذة باينة من أول ما الصفحة تفتح، و Esc مبيقفلهاش، وزرار «اقفل» مبيعملش حاجة. فيها تلات غلطات. (من قسم ١ و ٢ و ٥ في الشرح)`, done: R`الصفحة بتفتح والنافذة مستخبية، والزرار بيفتحها modal، و «اقفل» بيقفلها، وكل الشروط ✓.`, work: { h: 260, start: R`<h1>ملاحظاتي</h1>
<button type="button" onclick="about.show()">عن التطبيق</button>

<dialog id="about" open>
  <h2>دفتر نور</h2>
  <p>نسخة 1.0</p>
  <button type="button">اقفل</button>
</dialog>`, checks: [
              { say: R`النافذة مبقاش مكتوب عليها [[open]]`, q: "dialog[open]", n: 0 },
              { say: R`الزرار بيفتحها بـ [[about.showModal()]] مش [[show()]]`, q: "button[onclick*=\"about.showModal()\"]" },
              { say: R`«اقفل» جوه [[<form method="dialog">]]`, q: "dialog form[method=\"dialog\" i] button", has: "اقفل" },
              { say: R`«اقفل» مبقاش [[type="button"]] (عشان يبعت الفورم اللي بيقفل)`, q: "dialog button[type=\"button\"]", n: 0 },
            ] }, sol: R`~~~live 260 بعد التصليح (دوس «عن التطبيق»)
<h1>ملاحظاتي</h1>
<button type="button" onclick="about.showModal()">عن التطبيق</button>

<dialog id="about">
  <h2>دفتر نور</h2>
  <p>نسخة 1.0</p>
  <form method="dialog">
    <button>اقفل</button>
  </form>
</dialog>
~~~

وده اللي كان باين قبل التصليح:

~~~live 260 قبل
<h1>ملاحظاتي</h1>
<button type="button" onclick="about.show()">عن التطبيق</button>

<dialog id="about" open>
  <h2>دفتر نور</h2>
  <p>نسخة 1.0</p>
  <button type="button">اقفل</button>
</dialog>
~~~

**هتشوف إيه:**

- **قبل:** النافذة باينة تحت الزرار من غير ما حد يفتحها، ومفيش غبشة وراها، و Esc و «اقفل» مبيعملوش حاجة.
- **بعد:** الصفحة فيها العنوان والزرار بس. الزرار بيفتح النافذة في نص الشاشة، و «اقفل» و Esc بيقفلوها.

**التلات غلطات:**

1. [[open]] في الكود: النافذة مفتوحة من الأول ومش modal. اتشال.
2. [[show()]]: بيفتح non-modal. بقى [[showModal()]].
3. [[<button type="button">]] من غير فورم: زرار ملوش شغلة. بقى زرار إرسال جوه [[<form method="dialog">]]. (جوه فورم، الزرار من غير [[type]] بيبقى [[submit]]: هنا ده اللي احنا عايزينه.)

**الغلطة الشائعة:** تصلّح الزرار وتسيب [[open]]. النافذة هتفضل باينة من الأول، ولو الزائر داس «عن التطبيق» هيطلع خطأ في الـ Console لأن [[showModal()]] مبيشتغلش على نافذة مفتوحة non-modal.

~~~text القياس من Chrome
قبل:   matches(':modal') = false ، Esc: النافذة لسه مفتوحة ، «اقفل»: لسه مفتوحة
بعد:   مقفولة في الأول ، وبعد الضغط matches(':modal') = true ، و «اقفل» قفلها
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع، وبعدين صلّح:** الزائر داس «امسح الحساب» فالنافذة اتفتحت، وداس **Enter** على طول من غير ما يقرا. اكتب على ورقة: [[returnValue]] هتبقى إيه؟ جرّب في الصندوق. المصمم عايز ترتيب الزرارين يفضل زي ما هو، فصلّحها من غير ما تبدّلهم: خلّي الفوكس يبدأ على «إلغاء». (من قسم ٤ في الشرح: الفوكس بيروح فين)`, done: R`توقّعت [[delete]]، وبعد التصليح Enter بيطلّع [[cancel]]، وكل الشروط ✓.`, work: { h: 250, start: R`<button type="button" onclick="acc.showModal()">امسح الحساب</button>
<p>آخر اختيار: <output id="res">(لسه)</output></p>

<dialog id="acc" onclose="res.value = acc.returnValue">
  <p>الحساب وكل ملاحظاته هيتمسحوا.</p>
  <form method="dialog">
    <button value="delete">امسح حسابي</button>
    <button value="cancel">إلغاء</button>
  </form>
</dialog>`, checks: [
              { say: R`«إلغاء» عليه [[autofocus]]`, q: "dialog button[value=\"cancel\"][autofocus]" },
              { say: R`عنصر واحد بس في النافذة عليه [[autofocus]]`, q: "dialog [autofocus]", n: 1 },
              { say: R`الترتيب زي ما هو: «امسح حسابي» لسه أول زرار`, q: "dialog form button:first-of-type[value=\"delete\"]" },
            ] }, sol: R`~~~live 193 بعد التصليح (افتح ودوس Enter)
<button type="button" onclick="acc.showModal()">امسح الحساب</button>
<p>آخر اختيار: <output id="res">(لسه)</output></p>

<dialog id="acc" onclose="res.value = acc.returnValue">
  <p>الحساب وكل ملاحظاته هيتمسحوا.</p>
  <form method="dialog">
    <button value="delete">امسح حسابي</button>
    <button value="cancel" autofocus>إلغاء</button>
  </form>
</dialog>
~~~

**هتشوف إيه:**

- **قبل:** النافذة فتحت والفوكس على «امسح حسابي» (أول زرار). Enter طلّع [[delete]].
- **بعد:** الفوكس على «إلغاء». Enter بيطلّع [[cancel]].

**ليه:** [[showModal()]] بيدوّر الأول على عنصر عليه [[autofocus]] جوه النافذة. لو ملقاش، بياخد أول عنصر ينفع ياخد فوكس. و Enter على زرار عليه الفوكس بيدوس الزرار ده.

**وأحسن من كده** لو المصمم وافق: «إلغاء» يبقى الأول في الكود. ساعتها حتى Enter جوه خانة في النافذة هيلغي.

**الغلطة الشائعة:** [[autofocus]] على الزرارين «احتياطي». المتصفح بياخد الأول بترتيب الكود، يعني «امسح حسابي» تاني.

~~~text القياس من Chrome (showModal ثم Enter)
قبل:   الفوكس على «امسح حسابي» ، returnValue = delete
بعد:   الفوكس على «إلغاء» ، returnValue = cancel
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** في الصفحة نافذتين. «إيه الجديد؟» معلومات بس، فالمفروض تتقفل بأي ضغطة برّاها. و «شروط الاستخدام» لازم الزائر يدوس «موافق»، فلا الضغط برّه ولا Esc يقفلوها. اكتب [[closedby]] المناسب على كل واحدة. (من قسم ٦ في الشرح: جدول [[closedby]])`, done: R`الأولى بتتقفل بكليك برّاها، والتانية بزرار «موافق» بس، وكل الشروط ✓.`, work: { h: 250, start: R`<p><button type="button" onclick="news.showModal()">إيه الجديد؟</button>
<button type="button" onclick="terms.showModal()">شروط الاستخدام</button></p>

<dialog id="news">
  <p>ضفنا البحث جوه الملاحظات.</p>
  <form method="dialog"><button>تمام</button></form>
</dialog>

<dialog id="terms">
  <p>لازم توافق على الشروط عشان تكمّل.</p>
  <form method="dialog"><button value="ok">موافق</button></form>
</dialog>`, checks: [
              { say: R`«إيه الجديد؟» عليها [[closedby="any"]]`, q: "dialog#news[closedby=\"any\"]" },
              { say: R`«شروط الاستخدام» عليها [[closedby="none"]]`, q: "dialog#terms[closedby=\"none\"]" },
              { say: R`نافذة الشروط لسه فيها زرار بيقفلها`, q: "dialog#terms form[method=\"dialog\" i] button[value=\"ok\"]" },
            ] }, sol: R`~~~live 193 الحل
<p><button type="button" onclick="news.showModal()">إيه الجديد؟</button>
<button type="button" onclick="terms.showModal()">شروط الاستخدام</button></p>

<dialog id="news" closedby="any">
  <p>ضفنا البحث جوه الملاحظات.</p>
  <form method="dialog"><button>تمام</button></form>
</dialog>

<dialog id="terms" closedby="none">
  <p>لازم توافق على الشروط عشان تكمّل.</p>
  <form method="dialog"><button value="ok">موافق</button></form>
</dialog>
~~~

**هتشوف إيه:**

- «إيه الجديد؟»: دوس في أي حتة فاضية حوالين الصندوق، هيتقفل. و Esc و «تمام» كمان.
- «شروط الاستخدام»: الضغط برّه و Esc مبيعملوش حاجة. «موافق» بس.

**ليه كده:** من غير [[closedby]] النافذتين كانوا زي بعض (Esc بيقفل، والكليك برّه لأ). [[any]] زوّد الكليك برّه، و [[none]] شال حتى Esc.

**الغلطة الشائعة:** [[closedby="none"]] على نافذة فيها فورم طويل «عشان الزائر ميقفلهاش بالغلط». كده لو مفيش زرار «إلغاء» واضح فالزائر محبوس. الافتراضي ([[closerequest]]) كفاية: الكليك برّه مبيقفلش، و Esc موجود للي عايز يخرج.

~~~text القياس من Chrome
closedby="any":    كليك برّه: اتقفلت
closedby="none":   كليك برّه: مفتوحة ، Esc: مفتوحة ، «موافق»: اتقفلت
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** النافذة دي شغالة، بس قارئ الشاشة بيقول «dialog» ومبيقولش هي عن إيه، لأن عنوانها [[<b>]] جوه فقرة. خلّي العنوان [[<h2>]] واربطه بالنافذة كاسم ليها. (من قسم ٧ في الشرح: اسم النافذة)`, done: R`العنوان [[<h2>]] ليه [[id]]، والنافذة بتشاور عليه بـ [[aria-labelledby]]، وكل الشروط ✓.`, work: { h: 260, start: R`<button type="button" onclick="del.showModal()">امسح الملاحظة</button>

<dialog id="del">
  <p><b>تمسح «أفكار المشروع»؟</b></p>
  <p>مش هتقدر ترجّعها.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>`, checks: [
              { say: R`العنوان بقى [[<h2 id="del-title">]] جوه النافذة`, q: "dialog h2#del-title", has: "أفكار المشروع" },
              { say: R`مفيش [[<b>]]`, q: "dialog b", n: 0 },
              { say: R`النافذة عليها [[aria-labelledby="del-title"]]`, q: "dialog[aria-labelledby=\"del-title\"]" },
              { say: R`الزرارين والفورم زي ما هم`, q: "dialog form[method=\"dialog\" i] button", n: 2 },
            ] }, sol: R`~~~live 260 بعد
<button type="button" onclick="del.showModal()">امسح الملاحظة</button>

<dialog id="del" aria-labelledby="del-title">
  <h2 id="del-title">تمسح «أفكار المشروع»؟</h2>
  <p>مش هتقدر ترجّعها.</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
~~~

**هتشوف إيه:** العنوان بقى أكبر شوية (شكل [[<h2>]] الافتراضي). الباقي زي ما هو. الفرق الحقيقي مش باين بالعين: هو في اللي قارئ الشاشة بيقوله.

**ليه كده:**

- [[<b>]] شكل بس، ملوش معنى «عنوان». [[<h2>]] عنوان بجد.
- [[aria-labelledby]] بياخد [[id]] العنصر اللي فيه الاسم. زي [[for]] على الـ label.

**الغلطة الشائعة:** [[aria-labelledby="تمسح الملاحظة"]] (الكلام نفسه بدل الـ [[id]]). مش هيلاقي عنصر بالاسم ده والنافذة هتفضل من غير اسم. لو عايز تكتب الكلام نفسه: [[aria-label="..."]].

~~~text القياس من Chrome (accessibility tree)
قبل:   role = dialog ، name = ""
بعد:   role = dialog ، name = "تمسح «أفكار المشروع»؟"
~~~

الاسم هو اللي قارئ الشاشة بيقراه مع فتح النافذة (النطق نفسه من MDN).` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب نافذة «تأكيد الدفع» وفتحها بـ [[show()]]، وبيقولك «ما هي بتطلع عادي، إيه الفرق؟». اكتبله في ٣ سطور الفرق اللي الزائر هيحس بيه. (من قسم ٢ و ٣ في الشرح)`, done: R`كتبت تلات فروق كل واحد منهم حاجة الزائر بيعملها (كليك، Tab، Esc)، مش تعريفات.`, sol: R`إجابة نموذجية:

1. **الكليك:** مع [[show()]] الزائر يقدر يدوس «ادفع» اللي في الصفحة تاني والنافذة مفتوحة، أو يغيّر الكمية وهي لسه بتسأله. مع [[showModal()]] أي كليك برّه النافذة مبيوصلش.
2. **الكيبورد:** مع [[show()]] Tab بيخرج من النافذة ويكمّل في الصفحة، فاللي ماشي بالكيبورد بيتوه. مع [[showModal()]] Tab بيلف جواها بس.
3. **Esc:** مع [[show()]] مبيقفلش. مع [[showModal()]] بيقفل ويرجّع الفوكس للزرار اللي فتح.

والتأكيد على الدفع لازم يترد عليه قبل أي حاجة تانية، فهو modal.

~~~text القياس من Chrome
                          show()        showModal()
كليك على زرار ورا         اشتغل          ماشتغلش
Esc                       مبيقفلش        بيقفل
:modal                    false          true
~~~` }
          ]
        }
,
        {
          cmd: "popover و popovertarget",
          title: "قايمة وتلميح من غير JavaScript: popover و popovertarget و popovertargetaction و command و commandfor",
          pre: [{ to: "css/dialog و closedby", why: R`الـ popover بيتقارن بالـ dialog في كل حاجة، و [[command]] بيفتح الـ dialog اللي عملته هناك من غير [[onclick]]` }, { to: "css/details و summary", why: R`التالت في جدول الاختيار: محتوى بيتطوي ويتفرد جوه الصفحة` }],
          ref: [
            { t: "MDN: popover (global attribute)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover" },
            { t: "MDN: Using the Popover API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using" },
            { t: "WHATWG: The popover attribute", url: "https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute" },
            { t: "WHATWG: popovertarget و popovertargetaction", url: "https://html.spec.whatwg.org/multipage/popover.html#attr-popovertarget" },
            { t: "MDN: <button> (command, commandfor)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button" },
            { t: "WHATWG: command و commandfor", url: "https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-command" }
          ],
          desc: R`[[popover]] attribute بيتكتب على أي عنصر فيخلّيه **يطلع فوق الصفحة لما زرار يتداس، ويختفي لوحده** لما الزائر يدوس برّاه أو يدوس Esc. قايمة «⋮»، تلميح «؟»، رسالة «اتحفظت». والزرار بيتربط بيه بـ [[popovertarget]]، من غير ولا سطر JavaScript.
وفي نفس الدرس [[command]] و [[commandfor]]: نفس الفكرة بس أعم، زرار بيدّي أمر لعنصر تاني، وبيهم الـ [[<dialog>]] بتاع الدرس اللي فات بيتفتح من غير [[onclick]].`,
          example: R`<button type="button" popovertarget="menu">⋮ خيارات</button>
<div id="menu" popover>
  <button type="button">ثبّت الملاحظة</button>
  <button type="button">انسخها</button>
  <button type="button" popovertarget="menu" popovertargetaction="hide">اقفل</button>
</div>
<button type="button" commandfor="del" command="show-modal">امسح</button>
<dialog id="del">
  <p>تمسح الملاحظة؟</p>
  <button type="button" commandfor="del" command="close">إلغاء</button>
</dialog>`,
          flag: "script",
          lines: [
            R`الزرار اللي بيفتح القايمة. [[popovertarget="menu"]] فيها [[id]] العنصر اللي هيطلع. كل ضغطة بتفتحه لو مقفول وتقفله لو مفتوح.`,
            R`القايمة نفسها: [[<div>]] عادي عليه [[popover]]. الكلمة دي لوحدها بتخبّيه لحد ما يتفتح، وبتخلّيه يتقفل لوحده بـ Esc أو بضغطة برّاه. و [[id="menu"]] هو اللي الزرار بيشاور عليه.`,
            R`اختيار جوه القايمة. زرار عادي [[type="button"]]، شغله (التثبيت) هيتكتب بـ JavaScript بعدين.`,
            R`اختيار تاني بنفس الشكل.`,
            R`زرار جوه القايمة بيقفلها. [[popovertarget="menu"]] بيشاور على نفس القايمة، و [[popovertargetaction="hide"]] بيقول «اقفل بس» بدل «افتح أو اقفل».`,
            R`[[</div>]] بيقفل القايمة: التلات أزرار اللي فوق هم كل اللي هيطلع لما الـ popover يتفتح.`,
            R`زرار بيفتح [[<dialog>]] من غير JavaScript: [[commandfor="del"]] العنصر اللي الأمر رايحله، و [[command="show-modal"]] الأمر نفسه، وهو نفس [[del.showModal()]].`,
            R`نافذة التأكيد بتاعة الدرس اللي فات، و [[id="del"]] هو اللي [[commandfor]] بيشاور عليه.`,
            R`السؤال اللي جوه النافذة.`,
            R`زرار بيقفل النافذة بأمر [[close]]. بديل [[<form method="dialog">]] لما مش محتاج فورم.`,
            R`[[</dialog>]] بيقفل النافذة. السؤال وزرار «إلغاء» بس هم اللي جواها.`
          ],
          teach: R`## الفكرة في سطرين

attribute على العنصر ([[popover]]) و attribute على الزرار ([[popovertarget]])، والمتصفح بيعمل الباقي: يخبّي العنصر، ويطلّعه فوق كل الصفحة لما الزرار يتداس، ويقفله لما الزائر يدوس في أي حتة تانية.

القياسات من Chrome 157 على Windows 11، بكليكات وضغطات حقيقية.

---

## ١. [[<div popover>]] و [[<button popovertarget="menu">]]

~~~live 190 دوس «⋮ خيارات»، وبعدين دوس في أي حتة فاضية
<p>ملاحظة: مشتريات الأسبوع <button type="button" popovertarget="menu">⋮ خيارات</button></p>
<div id="menu" popover>
  <p><button type="button">ثبّت الملاحظة</button></p>
  <p><button type="button">انسخها</button></p>
</div>
<p>كلام الصفحة اللي تحت.</p>
~~~

**هتشوف إيه:**

- القايمة مش باينة في الأول.
- دوس «⋮ خيارات»: صندوق ببرواز أسود بيطلع **في نص الصفحة** فوق الكلام.
- دوس في أي حتة برّاه، أو Esc، أو الزرار تاني: بيختفي.

~~~text القياس من Chrome
<div popover> وهو مقفول:     display = none
بعد الضغط على الزرار:        display = block ، position = fixed ، border = 3px solid ، padding = 4px
                             الخلفية أبيض والكلام أسود ، وفي نص الشاشة (inset: 0 و margin: auto)
                             matches(':popover-open') = true
~~~

التلات حاجات اللي بتربطهم:

- [[popover]] على العنصر اللي هيطلع. أي عنصر: [[<div>]] أو [[<ul>]] أو [[<nav>]] أو [[<p>]].
- [[id]] على نفس العنصر.
- [[popovertarget]] على **[[<button>]]** (أو [[<input type="button">]])، وقيمته الـ [[id]] ده. مبيشتغلش على [[<a>]] ولا [[<div>]].

**وليه في النص مش جنب الزرار؟** ده الشكل الافتراضي بتاع المتصفح. تحريكه جنب الزرار اللي فتحه شغل CSS (anchor positioning) وهييجي في وحدات الـ CSS. في الوحدة دي القايمة بتطلع في النص وده كفاية عشان تفهم السلوك.

---

## ٢. القفل لوحده: light dismiss

«light dismiss» معناها إن الـ popover بيتقفل بأي حاجة تدل إن الزائر خلّص منه:

~~~text القياس من Chrome (popover عادي، يعني auto)
Esc:                                   اتقفل ، والفوكس على الزرار اللي فتحه
كليك على زرار تاني في الصفحة:           اتقفل ، **والزرار التاني اشتغل** (العدّاد بقى 1)
فتح popover تاني من زرار تاني:          الأول اتقفل والتاني اتفتح
ضغطة تانية على نفس الزرار:              اتقفل
~~~

خد بالك من السطر التاني: ده عكس الـ dialog الـ modal. الصفحة اللي ورا الـ popover **شغالة**، والضغطة اللي قفلته وصلت للي تحتها.

~~~live 200 افتح «مشاركة» وبعدين «ترتيب»
<p><button type="button" popovertarget="share">مشاركة</button>
<button type="button" popovertarget="sort">ترتيب</button></p>
<div id="share" popover><p>انسخ اللينك</p><p>ابعت بالإيميل</p></div>
<div id="sort" popover><p>الأحدث أولًا</p><p>بالاسم</p></div>
~~~

**هتشوف إيه:** مفيش وقت القايمتين مفتوحين مع بعض. فتح واحدة بيقفل التانية.

---

## ٣. [[<button popovertargetaction="hide">]]: افتح بس، أو اقفل بس

الزرار اللي عليه [[popovertarget]] بيعمل «بدّل» (toggle): يفتح المقفول ويقفل المفتوح. [[popovertargetaction]] بيغيّر ده:

| القيمة | الزرار بيعمل إيه |
|---|---|
| [[popovertargetaction="toggle"]] | يفتح لو مقفول، ويقفل لو مفتوح. وده الافتراضي لو مكتبتش حاجة |
| [[popovertargetaction="show"]] | يفتح بس. لو مفتوح مبيحصلش حاجة |
| [[popovertargetaction="hide"]] | يقفل بس. لو مقفول مبيحصلش حاجة |

~~~text القياس من Chrome
toggle مرتين:     اتفتح وبعدين اتقفل
show مرتين:       اتفتح ، وفضل مفتوح
hide:             اتقفل ، و hide تاني: مفيش خطأ ومفيش تغيير
~~~

أشهر استخدام: زرار «×» أو «اقفل» **جوه** الـ popover نفسه، عليه [[popovertarget]] بنفس الـ [[id]] و [[popovertargetaction="hide"]].

---

## ٤. [[<div popover="manual">]] و [[<div popover="hint">]]: التلات أنواع

[[popover]] من غير قيمة معناها [[popover="auto"]]. وفيه قيمتين تانيين:

| القيمة | بيتقفل بـ Esc وبالضغط برّه؟ | لما يتفتح بيقفل غيره؟ | مناسب لـ |
|---|---|---|---|
| [[popover="auto"]] (أو [[popover]] بس) | أيوه | بيقفل أي [[auto]] و [[hint]] مفتوح | قايمة، اختيارات، بحث |
| [[popover="manual"]] | لأ | لأ، ومفيش حاجة بتقفله | رسالة «اتحفظت»، إشعار، لوحة بتفضل |
| [[popover="hint"]] | أيوه | بيقفل [[hint]] تاني بس، وبيسيب الـ [[auto]] | تلميح صغير فوق قايمة مفتوحة |

~~~text القياس من Chrome (اللي مفتوح بعد كل خطوة)
auto أ ، وبعدين hint:              أ + hint          (الـ hint ماقفلش الـ auto)
وبعدين hint تاني:                   أ + hint التاني   (الـ hint الأول اتقفل)
وبعدين auto ب:                      ب بس              (قفل الـ auto والـ hint)
وبعدين اتنين manual:                ب + manual + manual
Esc:                                manual + manual    (الـ auto اتقفل ، والـ manual لأ)
كليك برّه:                          manual لسه مفتوحين
popover="كلمة غلط":                 بيتعامل كـ manual
~~~

[[manual]] ملوش قفل تلقائي، فلازم زرار يقفله:

~~~live 119 دوس «احفظ»، وجرّب Esc والضغط برّه
<p><button type="button" popovertarget="saved" popovertargetaction="show">احفظ</button></p>
<div id="saved" popover="manual">
  اتحفظت الملاحظة.
  <button type="button" popovertarget="saved" popovertargetaction="hide">×</button>
</div>
~~~

**هتشوف إيه:** الرسالة طلعت ومبتتقفلش لا بـ Esc ولا بضغطة برّه. «×» بس. (في تطبيق حقيقي JavaScript بيقفلها بعد كام ثانية.)

**الدعم (جدول MDN):** [[popover]] و [[auto]] و [[manual]] في كل المتصفحات من أبريل 2024 (Chrome 114 و Firefox 125 و Safari 17)، ودلوقتي Baseline «Widely available». [[hint]] جديدة: Chrome 151 و Firefox 153 و Safari 27.3 (ونسخ أقدم كانت بتطبّقها بشكل مختلف). فالتلميح اللي لازم يشتغل عند الكل اكتبه [[auto]] دلوقتي.

---

## ٥. الـ top layer: فوق كل حاجة

الـ popover المفتوح (والـ dialog الـ modal) بيتحطوا في طبقة اسمها **top layer**: فوق الصفحة كلها، مهما كان مكان العنصر في الكود ومهما كان [[z-index]] بتاع غيره.

~~~text القياس من Chrome
عنصر في الصفحة عليه z-index: 9999 ، و popover مفتوح فوقه:
العنصر اللي تحت الماوس في النقطة دي = الزرار اللي جوه الـ popover   (الـ popover فوق)
~~~

يعني مش محتاج تحط القايمة في آخر [[<body>]] ولا تحارب بـ [[z-index]]: اكتبها جنب الزرار بتاعها في الكود وهي هتطلع فوق.

واسمين CSS هتقابلهم بعدين (تلوينهم في وحدات الـ CSS):

- [[:popover-open]] بيمسك الـ popover وهو مفتوح.
- [[::backdrop]] موجود ورا الـ popover زي الـ dialog، بس شفاف خالص (اتقاس: [[rgba(0, 0, 0, 0)]])، فمفيش غبشة.

---

## ٦. الـ popover مش modal

~~~text القياس من Chrome
بعد فتح الـ popover:           الفوكس لسه على الزرار اللي فتحه (مادخلش جواه)
Tab من الزرار:                 راح لأول زرار جوه الـ popover ، حتى لو الـ popover مكتوب في آخر الصفحة
كليك على الصفحة اللي ورا:      اشتغل
الزرار في accessibility tree:   expanded = false وهو مقفول ، و expanded = true وهو مفتوح
الـ popover نفسه:               من غير اسم ومن غير role خاص (Chrome بيعرضه group)
~~~

- الفوكس مبيتنقلش لوحده: الزائر بيدوس Tab فيدخل القايمة.
- الصفحة اللي ورا مش واقفة.
- المتصفح بيقول لقارئ الشاشة إن الزرار «مفتوح» أو «مقفول» من غير ما تكتب [[aria-expanded]].

عايز الصفحة تقف والفوكس يتحبس؟ ده dialog مش popover.

---

## ٧. [[<button command="show-modal" commandfor="del">]]: زرار بيدّي أمر

[[popovertarget]] بيعرف يكلّم popover بس. [[commandfor]] و [[command]] نفس الفكرة لأي عنصر: [[commandfor]] فيه [[id]] العنصر، و [[command]] الأمر.

### [[<button commandfor="del">]] و [[<button command="close">]]

| الأمر | رايح لـ | زي ما تكتب |
|---|---|---|
| [[command="show-modal"]] | [[<dialog>]] | [[showModal()]] |
| [[command="close"]] | [[<dialog>]] | بيقفله. و [[value]] الزرار بتبقى [[returnValue]] |
| [[command="request-close"]] | [[<dialog>]] | «اطلب القفل»: زي ضغطة Esc، فـ [[closedby="none"]] يقدر يرفض |
| [[command="toggle-popover"]] | popover | [[popovertargetaction="toggle"]] |
| [[command="show-popover"]] | popover | [[popovertargetaction="show"]] |
| [[command="hide-popover"]] | popover | [[popovertargetaction="hide"]] |

~~~live 210 نافذة بتتفتح وتتقفل من غير ولا سطر JavaScript
<button type="button" commandfor="del" command="show-modal">امسح الملاحظة</button>
<dialog id="del" aria-labelledby="del-title">
  <h2 id="del-title">تمسح «مشتريات الأسبوع»؟</h2>
  <button type="button" commandfor="del" command="close" value="cancel">إلغاء</button>
  <button type="button" commandfor="del" command="close" value="delete">امسح</button>
</dialog>
~~~

**هتشوف إيه:** نفس نافذة الدرس اللي فات بالظبط: في النص، ووراها غبشة، والفوكس على «إلغاء»، و Esc بيقفل. بس مفيش [[onclick]] ومفيش فورم.

~~~text القياس من Chrome
command="show-modal":    النافذة اتفتحت ، matches(':modal') = true ، والفوكس جواها
command="close" والزرار value="ok":    اتقفلت ، returnValue = ok ، والفوكس رجع للزرار اللي فتح
command="request-close":               اتقفلت (النافذة من غير closedby="none")
command="toggle-popover":              فتح الـ popover ، وضغطة تانية قفلته
~~~

- الزرار لازم [[type="button"]]. اتقاس: زرار جوه فورم من غير [[type]] وعليه [[command]] **مبيعملش أي حاجة**، لا بينفّذ الأمر ولا بيبعت الفورم.
- [[command]] من غير [[commandfor]] (أو العكس) مبيعملش حاجة.
- فيه كمان أوامر بتبدأ بـ [[--]] (زي [[command="--rotate"]]): دي أوامر انت بتخترعها و JavaScript بيسمعها. كورس JavaScript.

**الدعم (جدول MDN):** Chrome 135 و Firefox 144 و Safari 26.2. يعني موجودة في آخر نسخ المتصفحات التلاتة، بس من قريب (Safari من آخر 2025)، ومش «Widely available» لسه. في متصفح أقدم الزرار **مبيعملش حاجة**، ومفيش بديل تلقائي. فلحد ما النسخ القديمة تختفي: [[popovertarget]] للـ popover (مدعوم من 2024)، و [[onclick="del.showModal()"]] للـ dialog، أو [[command]] مع ملف صغير بيعوّض (polyfill) في كورس JavaScript.

---

## ٨. popover ولا dialog ولا [[<details>]]؟

التلاتة «حاجة بتتفتح وتتقفل». الفرق في مكانها وفي اللي بيحصل للصفحة:

| | [[<details>]] | [[popover]] | [[<dialog>]] بـ [[showModal()]] |
|---|---|---|---|
| المحتوى بيظهر فين | في مكانه، والصفحة بتتزق لتحت | فوق الصفحة (top layer) | فوق الصفحة (top layer) |
| الصفحة اللي ورا | شغالة | شغالة | واقفة |
| الفوكس | مكانه | مكانه، و Tab بيدخل | بيتنقل جواه ويتحبس |
| بيتقفل لوحده | لأ | أيوه (Esc وضغطة برّه) | Esc بس (أو حسب [[closedby]]) |
| محتاج JavaScript | لأ | لأ | سطر للفتح (أو [[command]]) |
| Ctrl+F بيلاقي اللي جواه وهو مقفول | أيوه وبيفتحه (MDN) | لأ | لأ |
| مثال | أسئلة شائعة، «اقرا أكتر» | قايمة «⋮»، تلميح، إشعار | تأكيد حذف، تسجيل دخول |

اسأل نفسك بالترتيب:

1. الزائر **لازم يرد** قبل ما يكمّل؟ ← [[<dialog>]] modal.
2. حاجة صغيرة بتطلع فوق وتختفي أول ما يبص لحاجة تانية؟ ← [[popover]].
3. محتوى من الصفحة نفسها، بس مطوي؟ ← [[<details>]].

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[popovertarget]] على [[<a>]] أو [[<div>]] | مبيشتغلش: على [[<button>]] و [[<input type="button">]] بس |
| القيمة [[class]] أو اسم مش [[id]] | الزرار مبيعملش حاجة، ومفيش خطأ |
| نسيان [[popover]] على العنصر | العنصر باين طول الوقت والزرار ملوش تأثير |
| [[hidden]] على العنصر «عشان يستخبى» مع [[popover]] | [[popover]] بيخبّيه لوحده. الاتنين مع بعض لخبطة |
| زرار [[popovertarget]] جوه فورم من غير [[type="button"]] | **بيبعت الفورم** والـ popover مبيتفتحش (اتقاس) |
| زرار [[command]] جوه فورم من غير [[type="button"]] | مبيعملش حاجة خالص: لا الأمر ولا الإرسال (اتقاس) |
| [[popover="manual"]] من غير زرار قفل | الرسالة بتفضل على الشاشة للأبد |
| فورم مهم أو تأكيد جوه popover | ضغطة غلط برّه بتقفله، والزائر يقدر يشتغل في الصفحة اللي ورا |
| [[command]] لوحده في مشروع لازم يشتغل على متصفحات قديمة | الزرار ميت هناك |
| مستني القايمة تطلع جنب الزرار | الافتراضي نص الشاشة. المكان شغل CSS |

---

## الخلاصة

- [[popover]] على العنصر + [[id]]، و [[popovertarget="id"]] على زرار: قايمة بتتفتح وتتقفل من غير JavaScript.
- [[auto]] (الافتراضي) بيتقفل لوحده وبيقفل غيره. [[manual]] مبيتقفلش غير بزرار. [[hint]] للتلميحات، ولسه جديدة.
- [[popovertargetaction]]: [[toggle]] و [[show]] و [[hide]].
- الـ popover في الـ top layer، ومش modal: الصفحة شغالة والفوكس مكانه.
- [[command]] و [[commandfor]] بيفتحوا ويقفلوا [[<dialog>]] و popover من غير JavaScript، بس دعمهم جديد.
- لازم يرد: dialog. بيطلع ويختفي: popover. مطوي في الصفحة: [[<details>]].`,
          try: R`اعمل ملف [[popover.html]] فيه زرار «؟ مساعدة» بيفتح popover فيه سطرين شرح وزرار «فهمت» بيقفله. افتحه في Chrome وجرّب تقفله بأربع طرق: «فهمت»، و Esc، وضغطة برّه، وضغطة تانية على «؟ مساعدة». وبعدين غيّر [[popover]] لـ [[popover="manual"]] وشوف مين من الأربعة لسه شغال.`,
          sol: R`~~~html popover.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ملاحظة جديدة</title>
</head>
<body>
<h1>ملاحظة جديدة</h1>
<button type="button" popovertarget="help">؟ مساعدة</button>

<div id="help" popover>
  <p>أول سطر بيبقى عنوان الملاحظة.</p>
  <p>الملاحظة بتتحفظ لوحدها وانت بتكتب.</p>
  <button type="button" popovertarget="help" popovertargetaction="hide">فهمت</button>
</div>
</body>
</html>
~~~

~~~view 220 شكل الصفحة (دوس «؟ مساعدة»)
<h1>ملاحظة جديدة</h1>
<button type="button" popovertarget="help">؟ مساعدة</button>
<div id="help" popover>
  <p>أول سطر بيبقى عنوان الملاحظة.</p>
  <p>الملاحظة بتتحفظ لوحدها وانت بتكتب.</p>
  <button type="button" popovertarget="help" popovertargetaction="hide">فهمت</button>
</div>
~~~

**هتشوف إيه:**

- **[[popover]] (auto):** الأربع طرق كلهم بيقفلوه.
- **[[popover="manual"]]:** «فهمت» والضغطة التانية على «؟ مساعدة» بس. Esc والضغط برّه مبيعملوش حاجة.

~~~text القياس من Chrome
auto:     Esc: اتقفل ، كليك برّه: اتقفل ، الزرار تاني: اتقفل ، hide: اتقفل
manual:   Esc: مفتوح ، كليك برّه: مفتوح ، زرار hide جواه: اتقفل
~~~

للمساعدة [[auto]] هو الصح: الزائر بيقراها ويكمّل، وأي ضغطة تانية معناها إنه خلّص منها.`,
          deep: {
            why: R`القوايم والتلميحات كانت أكتر حاجة بتتكتب JavaScript في أي صفحة: افتح، واقفل لما يدوس برّه، واقفل بـ Esc، واقفل القايمة التانية، وحطها فوق كل حاجة. وكل مكتبة كانت بتعملها بطريقة، وكلهم كانوا بيتخانقوا مع [[z-index]] و [[overflow: hidden]] اللي بيقصّ القايمة. [[popover]] خلّى ده شغل المتصفح: attribute واحد، وطبقة فوق الكل، وسلوك قفل واحد عند كل المواقع.`,
            how: R`[[popover]] بيدّي العنصر [[display: none]] من ستايل المتصفح. لما الزرار اللي عليه [[popovertarget]] يتداس، المتصفح بيدوّر على العنصر اللي ليه الـ [[id]] ده، وينفّذ الـ action: بيحطه في الـ top layer وبيشيل [[display: none]]، وبيعلّمه [[:popover-open]]. المتصفح ماسك قايمة بالـ popovers المفتوحين من نوع [[auto]]: فتح واحد جديد مش جوه اللي مفتوح بيقفل اللي قبله. وأي كليك برّه آخر واحد في القايمة، أو «close request» (Esc)، بيقفله. [[manual]] مش في القايمة دي أصلًا فمحدش بيقفله. و [[commandfor]] و [[command]] بيعملوا نفس التدوير بالـ [[id]]، وبعدين بيبعتوا للعنصر الأمر، والعنصر (dialog أو popover) بينفّذ اللي يعرفه منه.`,
            when: R`[[auto]]: قايمة اختيارات، قايمة المستخدم، فلتر، تلميح بيتفتح بضغطة. [[manual]]: إشعار «اتحفظت»، شريط الكوكيز، لوحة الزائر بيفتحها ويقفلها بنفسه. [[hint]]: تلميح فوق قايمة مفتوحة (لما الدعم يستقر). [[command]]: لما المشروع بيستهدف متصفحات حديثة أو فيه polyfill. ومتستخدمش popover لحاجة لازم تترد عليها (dialog) ولا لمحتوى أساسي في الصفحة (details).`,
            mistakes: R`[[popovertarget]] على لينك. [[id]] مكرر أو مكتوب غلط. فورم دفع جوه popover. [[manual]] من غير زرار قفل. الاعتماد على [[hint]] أو [[command]] من غير ما تبص على الدعم. ومحتوى مهم (سعر، تحذير) جوه popover بس: الزائر اللي مفتحوش مشافوش، و Ctrl+F مبيلاقيهوش.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** في صفحة «دفتر نور» زرار «⋮» جنب الملاحظة. خلّيه يفتح قايمة فيها تلات اختيارات: «ثبّت»، «انسخ»، «شارك». من غير JavaScript. (من قسم ١ في الشرح)`, done: R`الضغط على «⋮» بيطلّع القايمة، والضغط برّه بيقفلها، وكل الشروط ✓.`, work: { h: 220, start: R`<p>ملاحظة: أفكار المشروع <button type="button">⋮</button></p>

ثبّت
انسخ
شارك`, checks: [
              { say: R`فيه عنصر عليه [[popover]] و [[id="menu"]]`, q: "[popover]#menu" },
              { say: R`الزرار «⋮» عليه [[popovertarget="menu"]]`, q: "button[type=\"button\"][popovertarget=\"menu\"]", has: "⋮" },
              { say: R`جوه القايمة تلات أزرار`, q: "#menu button", n: 3 },
              { say: R`كل زرار جوه القايمة [[type="button"]]`, q: "#menu button:not([type=\"button\"])", n: 0 },
            ] }, sol: R`~~~live 220 الحل (دوس «⋮»)
<p>ملاحظة: أفكار المشروع <button type="button" popovertarget="menu">⋮</button></p>

<div id="menu" popover>
  <p><button type="button">ثبّت</button></p>
  <p><button type="button">انسخ</button></p>
  <p><button type="button">شارك</button></p>
</div>
~~~

**هتشوف إيه:**

- سطر الملاحظة وجنبه «⋮» بس.
- دوس «⋮»: صندوق في نص الصفحة فيه التلات أزرار تحت بعض.
- دوس برّه أو Esc: بيختفي.

**ليه كده:**

- [[popover]] خبّى الـ [[<div>]] وخلّاه يتقفل لوحده.
- [[popovertarget="menu"]] = [[id="menu"]]: دي الوصلة الوحيدة بين الزرار والقايمة.
- الاختيارات أزرار مش [[<p>]] بس: الزائر هيدوس عليها، والحاجة اللي بتتداس وبتعمل فعل زرار (درس «a و button»). شغلها نفسه لسه محتاج JavaScript.

**الغلطة الشائعة:** [[popovertarget="#menu"]] بعلامة [[#]] زي اللينك. القيمة الـ [[id]] لوحده من غير [[#]].

~~~text القياس من Chrome
قبل الضغط:   display = none ، والزرار expanded = false
بعد الضغط:   matches(':popover-open') = true ، والزرار expanded = true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زرار «؟ مساعدة» المفروض يطلّع تلميح، بس الضغط عليه مبيعملش أي حاجة. اللي كتبه خبّى التلميح بـ [[hidden]] وربطه بـ [[class]]. صلّحه. (من قسم ١ و ٩ في الشرح)`, done: R`الزرار بيطلّع التلميح وبيخبّيه، وكل الشروط ✓.`, work: { h: 190, start: R`<h1>ملاحظة جديدة</h1>
<button type="button" popovertarget="help">؟ مساعدة</button>

<div class="help" hidden>
  أول سطر بيبقى عنوان الملاحظة.
</div>`, checks: [
              { say: R`التلميح ليه [[id="help"]]`, q: "div#help" },
              { say: R`التلميح عليه [[popover]]`, q: "#help[popover]" },
              { say: R`مفيش [[hidden]] على التلميح`, q: "#help[hidden]", n: 0 },
              { say: R`الزرار لسه [[popovertarget="help"]]`, q: "button[popovertarget=\"help\"]" },
            ] }, sol: R`~~~live 133 بعد التصليح
<h1>ملاحظة جديدة</h1>
<button type="button" popovertarget="help">؟ مساعدة</button>

<div id="help" popover>
  أول سطر بيبقى عنوان الملاحظة.
</div>
~~~

وده اللي كان قبل التصليح (دوس الزرار: مفيش حاجة):

~~~live 120 قبل
<h1>ملاحظة جديدة</h1>
<button type="button" popovertarget="help">؟ مساعدة</button>

<div class="help" hidden>
  أول سطر بيبقى عنوان الملاحظة.
</div>
~~~

**هتشوف إيه:**

- **قبل:** الزرار بيتداس ومفيش أي حاجة بتحصل، ومفيش خطأ.
- **بعد:** الزرار بيطلّع التلميح في نص الصفحة، وضغطة برّه بتخبّيه.

**الغلطتين:**

1. [[popovertarget]] بيدوّر على **[[id]]**. العنصر كان عليه [[class="help"]] بس، فالزرار ملقاش حد.
2. [[hidden]] بيخبّي وخلاص: مفيش زرار بيعرف يفتحه من غير JavaScript. [[popover]] بيخبّي **وبيتفتح**.

**الغلطة الشائعة:** تزوّد [[popover]] وتسيب [[hidden]]. العنصر هيفضل عليه الاتنين، وده مش معنى واحد واضح: شيل [[hidden]].

~~~text القياس من Chrome
قبل:   الضغط على الزرار: مفيش عنصر اتفتح
بعد:   matches(':popover-open') = true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زرار «احفظ» بيطلّع رسالة «اتحفظت ✓». الرسالة لازم **تفضل** لحد ما الزائر يدوس «×» اللي جواها: لا Esc ولا الضغط برّه يقفلوها. و «احفظ» لو اتداس تاني والرسالة مفتوحة، تفضل مفتوحة. (من قسم ٣ و ٤ في الشرح)`, done: R`الرسالة بتطلع وبتفضل، و «×» بيقفلها، وكل الشروط ✓.`, work: { h: 190, start: R`<p><button type="button">احفظ</button></p>

<div>
  اتحفظت ✓
  <button type="button">×</button>
</div>`, checks: [
              { say: R`الرسالة [[popover="manual"]] وليها [[id="saved"]]`, q: "#saved[popover=\"manual\"]" },
              { say: R`«احفظ» عليه [[popovertarget="saved"]]`, q: "button[popovertarget=\"saved\"]", has: "احفظ" },
              { say: R`«احفظ» بيفتح بس: [[popovertargetaction="show"]]`, q: "button[popovertarget=\"saved\"][popovertargetaction=\"show\"]", has: "احفظ" },
              { say: R`«×» جوه الرسالة وبيقفلها: [[popovertargetaction="hide"]]`, q: "#saved button[popovertarget=\"saved\"][popovertargetaction=\"hide\"]" },
            ] }, sol: R`~~~live 121 الحل
<p><button type="button" popovertarget="saved" popovertargetaction="show">احفظ</button></p>

<div id="saved" popover="manual">
  اتحفظت ✓
  <button type="button" popovertarget="saved" popovertargetaction="hide">×</button>
</div>
~~~

**هتشوف إيه:**

- «احفظ»: الرسالة طلعت في نص الصفحة.
- «احفظ» تاني: لسه مفتوحة.
- Esc أو ضغطة برّه: لسه مفتوحة.
- «×»: اتقفلت.

**ليه كده:**

- [[manual]] شال القفل التلقائي كله.
- [[show]] على «احفظ»: لو سبته [[toggle]] (الافتراضي) كانت الضغطة التانية هتخبّي الرسالة، كأن الحفظ اتلغى.
- «×» جوه الرسالة بيشاور على الرسالة اللي هو جواها. ده عادي.

**الغلطة الشائعة:** [[popover]] بس (يعني [[auto]]). الرسالة هتختفي مع أول ضغطة في أي حتة، وممكن الزائر ميلحقش يشوفها.

~~~text القياس من Chrome
show مرتين:           مفتوح
Esc ، وكليك برّه:      مفتوح
زرار hide جواه:        اتقفل
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** النافذة دي شغالة بسطر [[onclick]]. المشروع بقى بيستهدف المتصفحات الحديثة بس، فشيل الـ JavaScript خالص: افتحها واقفلها بـ [[command]] و [[commandfor]]. (من قسم ٧ في الشرح)`, done: R`مفيش [[onclick]] في الصفحة، والزرار لسه بيفتح النافذة modal، و «إلغاء» و «امسح» بيقفلوها، وكل الشروط ✓.`, work: { h: 250, start: R`<button type="button" onclick="del.showModal()">امسح الملاحظة</button>

<dialog id="del">
  <p>تمسح «أفكار المشروع»؟</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>`, checks: [
              { say: R`مفيش [[onclick]] في الصفحة`, q: "[onclick]", n: 0 },
              { say: R`الزرار عليه [[commandfor="del"]] و [[command="show-modal"]]`, q: "button[type=\"button\"][commandfor=\"del\"][command=\"show-modal\"]" },
              { say: R`النافذة لسه [[id="del"]] وفيها الزرارين بقيمهم`, q: "dialog#del button[value]", n: 2 },
              { say: R`الزرارين بيقفلوا النافذة (فورم [[method="dialog"]] أو [[command="close"]])`, q: "dialog#del form[method=\"dialog\" i] button[value=\"cancel\"], dialog#del button[command=\"close\"][commandfor=\"del\"][value=\"cancel\"]" },
            ] }, sol: R`~~~live 193 بعد
<button type="button" commandfor="del" command="show-modal">امسح الملاحظة</button>

<dialog id="del">
  <p>تمسح «أفكار المشروع»؟</p>
  <form method="dialog">
    <button value="cancel">إلغاء</button>
    <button value="delete">امسح</button>
  </form>
</dialog>
~~~

**هتشوف إيه:** نفس اللي كان بالظبط: النافذة في النص، والفوكس على «إلغاء»، وأي زرار بيقفلها. اللي اتغيّر الكود بس: سطر الـ JavaScript راح.

**ليه كده:**

- [[command="show-modal"]] هو [[showModal()]] مكتوب كـ HTML. و [[commandfor="del"]] بدل الاسم [[del]] اللي كان قبل النقطة.
- الفورم [[method="dialog"]] فضل زي ما هو: هو أصلًا من غير JavaScript. وكان ينفع بدله [[<button type="button" commandfor="del" command="close" value="cancel">]].

**الغلطة الشائعة:** تكتب [[command]] وتنسى [[type="button"]]. برّه فورم مفيش فرق، بس لو الزرار اتنقل جوه فورم هيبطّل يشتغل خالص (اتقاس: لا بينفّذ الأمر ولا بيبعت).

**ومتنساش الدعم:** Chrome 135 و Firefox 144 و Safari 26.2 (جدول MDN). في متصفح أقدم الزرار ده ميت، وسطر [[onclick]] كان شغال.

~~~text القياس من Chrome
command="show-modal":   النافذة اتفتحت ، matches(':modal') = true ، والفوكس جواها
~~~` },
            { lvl: 'تحدي', t: R`**ابني (اختار الأداة):** في صفحة الملاحظة تلات حاجات «بتتفتح». لكل واحدة اختار [[<details>]] أو [[popover]] أو [[<dialog>]] واكتبها: (١) «إزاي أشارك ملاحظة؟» سؤال وإجابته جزء من الصفحة. (٢) زرار «مشاركة» بيطلّع اختيارين صغيرين. (٣) زرار «اخرج» لازم الزائر يأكّده قبل أي حاجة تانية. (من قسم ٨ في الشرح: جدول الاختيار)`, done: R`السؤال [[<details>]]، والمشاركة popover، والخروج dialog بيتفتح modal وبيتقفل من غير JavaScript، وكل الشروط ✓.`, work: { h: 280, start: R`<h1>أفكار المشروع</h1>

إزاي أشارك ملاحظة؟
دوس «مشاركة» واختار الطريقة.

<button type="button">مشاركة</button>
انسخ اللينك
ابعت بالإيميل

<button type="button">اخرج</button>
متأكد إنك عايز تخرج؟
لأ
اخرج`, checks: [
              { say: R`السؤال [[<summary>]] جوه [[<details>]]`, q: "details > summary", has: "إزاي أشارك" },
              { say: R`اختيارات المشاركة جوه عنصر [[popover]] ليه [[id="share"]]`, q: "[popover]#share" },
              { say: R`زرار «مشاركة» عليه [[popovertarget="share"]]`, q: "button[popovertarget=\"share\"]", has: "مشاركة" },
              { say: R`سؤال الخروج جوه [[<dialog id="bye">]]`, q: "dialog#bye", has: "متأكد" },
              { say: R`زرار «اخرج» بيفتحه modal ([[onclick="bye.showModal()"]] أو [[command="show-modal"]])`, q: "button[onclick*=\"bye.showModal()\"], button[commandfor=\"bye\"][command=\"show-modal\"]" },
              { say: R`النافذة بتتقفل بفورم [[method="dialog"]] فيه زرارين`, q: "dialog#bye form[method=\"dialog\" i] button", n: 2 },
            ] }, sol: R`~~~live 193 الحل
<h1>أفكار المشروع</h1>

<details>
  <summary>إزاي أشارك ملاحظة؟</summary>
  <p>دوس «مشاركة» واختار الطريقة.</p>
</details>

<p><button type="button" popovertarget="share">مشاركة</button>
<button type="button" onclick="bye.showModal()">اخرج</button></p>

<div id="share" popover>
  <p><button type="button">انسخ اللينك</button></p>
  <p><button type="button">ابعت بالإيميل</button></p>
</div>

<dialog id="bye">
  <p>متأكد إنك عايز تخرج؟</p>
  <form method="dialog">
    <button value="stay">لأ</button>
    <button value="logout">اخرج</button>
  </form>
</dialog>
~~~

**هتشوف إيه:**

- السؤال سطر جنبه سهم. دوس عليه: الإجابة بتظهر **تحته** والزرارين بينزلوا.
- «مشاركة»: صندوق صغير فوق الصفحة، وبيختفي مع أي ضغطة برّه.
- «اخرج»: نافذة في النص ووراها غبشة، ومفيش حاجة في الصفحة بتتداس لحد ما ترد.

**ليه كل واحدة:**

- الإجابة محتوى من الصفحة (والزائر ممكن يدوّر عليها بـ Ctrl+F): [[<details>]].
- المشاركة اختيار سريع، ولو الزائر غيّر رأيه بيدوس في أي حتة: [[popover]].
- الخروج قرار: لازم «لأ» أو «اخرج»: [[<dialog>]] modal.

**الغلطة الشائعة:** كله dialog. القايمة الصغيرة هتوقّف الصفحة كلها وتغبّشها عشان اختيارين، والسؤال هيبقى نافذة بدل سطر بيتفرد.

~~~text القياس من Chrome
details:    الصفحة اللي ورا شغالة ، والمحتوى في مكانه
popover:    كليك برّه: اتقفل ، والزرار اللي ورا اشتغل
dialog:     كليك على زرار ورا: ماشتغلش ، matches(':modal') = true
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع، وبعدين غيّر:** في الصفحة لوحتين: «الألوان» و «الخطوط». اكتب على ورقة: لو فتحت «الألوان» وبعدين «الخطوط»، مين هيفضل مفتوح؟ جرّب. المصمم عايز الاتنين **يفضلوا مفتوحين مع بعض** والزائر يقفل كل واحدة بزرارها. غيّر النوع. (من قسم ٤ في الشرح: جدول التلات أنواع)`, done: R`توقّعت إن «الخطوط» بس هي اللي هتفضل، وبعد التغيير الاتنين بيفضلوا مفتوحين، وكل الشروط ✓.`, work: { h: 220, start: R`<p><button type="button" popovertarget="colors">الألوان</button>
<button type="button" popovertarget="fonts">الخطوط</button></p>

<div id="colors" popover>أصفر، أخضر، أزرق</div>
<div id="fonts" popover>عادي، كبير</div>`, checks: [
              { say: R`«الألوان» بقت [[popover="manual"]]`, q: "#colors[popover=\"manual\"]" },
              { say: R`«الخطوط» بقت [[popover="manual"]]`, q: "#fonts[popover=\"manual\"]" },
              { say: R`الزرارين لسه بيبدّلوا (من غير [[popovertargetaction]] أو [[toggle]])`, q: "button[popovertarget]:not([popovertargetaction]), button[popovertarget][popovertargetaction=\"toggle\"]", n: 2 },
            ] }, sol: R`~~~live 116 بعد التغيير
<p><button type="button" popovertarget="colors">الألوان</button>
<button type="button" popovertarget="fonts">الخطوط</button></p>

<div id="colors" popover="manual">أصفر، أخضر، أزرق</div>
<div id="fonts" popover="manual">عادي، كبير</div>
~~~

**هتشوف إيه:**

- **قبل:** فتحت «الألوان» وبعدين «الخطوط»: «الألوان» اختفت.
- **بعد:** الاتنين مفتوحين. (الاتنين بيطلعوا في نص الصفحة فوق بعض، فهتشوف اللي اتفتح آخر واحد فوق. تفريقهم في المكان شغل CSS.) كل زرار بيقفل لوحته بضغطة تانية.

**ليه:** [[auto]] معناه «واحد بس مفتوح». [[manual]] بيطلع من النظام ده: مبيقفلش حد ومحدش بيقفله. وزرار الـ toggle كفاية للقفل، فمش لازم «×».

**الغلطة الشائعة:** [[popover="hint"]] «عشان ميقفلش التاني». [[hint]] بيقفل أي [[hint]] تاني، فهترجع لنفس المشكلة.

~~~text القياس من Chrome (اللي مفتوح)
auto ثم auto:        التاني بس
manual ثم manual:    الاتنين
hint ثم hint:        التاني بس
~~~` }
          ]
        }
,
        {
          cmd: "hidden و inert",
          title: "جزء مش موجود وجزء موجود بس واقف: hidden و hidden=\"until-found\" و inert و tabindex",
          pre: [{ to: "css/dialog و closedby", why: R`هناك شفت المتصفح بيخلّي الصفحة اللي ورا النافذة inert لوحده. هنا بتكتبها بإيدك` }, { to: "css/roving tabindex", why: R`[[tabindex]] مشروح هناك بالتفصيل، وهنا ملخصه في جدول` }],
          ref: [
            { t: "MDN: hidden", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden" },
            { t: "WHATWG: The hidden attribute", url: "https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute" },
            { t: "MDN: inert", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert" },
            { t: "WHATWG: The inert attribute", url: "https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute" },
            { t: "MDN: tabindex", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex" }
          ],
          desc: R`[[hidden]] بيقول «العنصر ده مش جزء من الصفحة دلوقتي»: مش باين، ومبيتداسش، وقارئ الشاشة مش شايفه. و [[inert]] بيقول «العنصر ده باين بس **واقف**»: لا كليك ولا Tab ولا قارئ شاشة، وهو لسه في مكانه قدام العين.
الاتنين بيتكتبوا على أي عنصر، وبيشتغلوا على كل اللي جواه.`,
          example: R`<p id="saved" hidden>الملاحظة اتحفظت.</p>
<div hidden="until-found">
  <p id="tips">نصيحة: دوس Ctrl+S للحفظ.</p>
</div>
<main inert>
  <button type="button">ملاحظة جديدة</button>
</main>
<div tabindex="0">صندوق بياخد فوكس</div>`,
          flag: "script",
          lines: [
            R`رسالة مكتوبة في الكود ومش باينة: [[hidden]] خلّاها [[display: none]]. لما الحفظ يحصل، JavaScript بيشيل الـ attribute فتظهر.`,
            R`[[hidden="until-found"]]: المحتوى مستخبي، بس لو الزائر دوّر على كلمة منه بـ Ctrl+F أو دخل بلينك بيشاور على حاجة جواه، المتصفح بيظهره.`,
            R`الفقرة اللي جوه الصندوق المستخبي. [[id="tips"]] عشان لينك زي [[page.html#tips]] يقدر يوصلها ويفتح الصندوق.`,
            R`[[</div>]] بيقفل الصندوق المستخبي: أي حاجة تتكتب قبله هتستخبى مع الفقرة وتظهر معاها.`,
            R`[[inert]] على [[<main>]]: كل اللي جواه باين زي ما هو، بس مفيش حاجة فيه بتتداس ولا بتاخد فوكس.`,
            R`الزرار ده باين، بس الكليك عليه مبيوصلش و Tab بيعدّيه، لأنه جوه عنصر inert.`,
            R`[[</main>]] بيقفل الجزء الواقف. اللي بييجي بعده في الصفحة شغال عادي.`,
            R`[[tabindex="0"]] بيخلّي عنصر مش بياخد فوكس في العادة ([[<div>]]) يقف عليه Tab في دوره.`
          ],
          teach: R`## الفكرة في سطرين

- [[hidden]]: العنصر **مش موجود** للزائر، بأي طريقة.
- [[inert]]: العنصر **موجود وباين**، بس المتصفح بيتجاهل أي تعامل معاه.

القياسات من Chrome 157 على Windows 11.

---

## ١. [[<p hidden>]]: مش جزء من الصفحة دلوقتي

~~~live 81 دوس الزرار كذا مرة
<button type="button" onclick="msg.hidden = !msg.hidden">أظهر / اخفي الرسالة</button>
<p id="msg" hidden>الملاحظة اتحفظت ✓</p>
<p>كلام الصفحة اللي تحت.</p>
~~~

(سطر [[onclick]] هنا JavaScript: بيعكس [[hidden]] على العنصر اللي الـ [[id]] بتاعه [[msg]]، يعني يكتبه لو مش موجود ويشيله لو موجود. هتفهمه في كورس JavaScript.)

**هتشوف إيه:** الرسالة مش باينة والسطر اللي تحت لازق في الزرار (الرسالة مش واخدة مكان). كل ضغطة بتظهرها أو تخفيها، والسطر اللي تحت بينزل ويطلع.

~~~text القياس من Chrome
<p hidden>:              display = none   (مش واخد مكان ، ومبيتداسش)
في accessibility tree:    ignored = true   (قارئ الشاشة مش شايفه)
<p hidden="false">:      display = none   (لسه مستخبي!)
~~~

- [[hidden]] من غير قيمة، زي [[required]] و [[open]]: **وجوده** هو المعنى. عشان العنصر يظهر لازم الـ attribute يتشال خالص. [[hidden="false"]] لسه إخفاء.
- المعنى في المواصفة: «مش مناسب دلوقتي». رسالة نجاح لسه محصلتش، خطوة ٢ في فورم والزائر في خطوة ١، تاب مش مفتوح.
- ومش لإخفاء حاجة عن ناس وإظهارها لناس: اللي [[hidden]] عليه مستخبي عن الكل، قارئ الشاشة كمان. (المحتوى اللي لقارئ الشاشة بس ليه طريقة تانية في الـ CSS.)

### الفخ: سطر CSS بيلغي [[hidden]]

[[hidden]] شغال بسطر في ستايل المتصفح نفسه ([[display: none]]). وأي [[display]] تكتبه انت في الـ CSS بيكسب عليه:

~~~live 62 الصندوق التاني عليه hidden وباين برضه
<style>
  .card { display: flex; gap: 8px; border: 1px solid; padding: 8px; }
</style>
<p hidden>فقرة عليها hidden: مستخبية.</p>
<div class="card" hidden>صندوق عليه hidden و class="card": <strong>باين!</strong></div>
~~~

(السطر اللي جوه [[<style>]] CSS: بيدّي أي عنصر عليه [[class="card"]] برواز ومسافة و [[display: flex]]. هتتعلمه في وحدات الـ CSS. المهم هنا إنه كتب [[display]].)

~~~text القياس من Chrome
<p hidden>:                     display = none
<div class="card" hidden>:      display = flex    (الـ CSS كسب)
~~~

الحل سطر واحد في أول ملف الـ CSS بتاع أي مشروع:

~~~css
[hidden] { display: none !important; }
~~~

معناه: أي عنصر عليه [[hidden]] يستخبى، ومفيش سطر تاني يكسب عليه. (الاستثناء [[hidden="until-found"]] اللي جاي: ده مبيستخدمش [[display: none]] أصلًا، فلو بتستخدمه في المشروع، السطر ده محتاج استثناء ليه، وده بييجي مع الـ selectors في وحدات الـ CSS.)

---

## ٢. [[<div hidden="until-found">]]: مستخبي لحد ما حد يدوّر عليه

القيمة الوحيدة اللي [[hidden]] بياخدها. العنصر مستخبي، **بس** المتصفح بيظهره لوحده في حالتين:

- الزائر دوّر بـ Ctrl+F على كلمة جواه.
- الزائر دخل بلينك بيشاور على حاجة جواه ([[#id]])، أو لينك «text fragment» من محرك بحث.

~~~text القياس من Chrome
<div hidden="until-found">:     display = block ، content-visibility = hidden ، الارتفاع = 0
فتحنا page.html#tips (والـ id ده جوه الصندوق):
                                 المتصفح شال hidden من على الصندوق ، والارتفاع بقى 18px ، والصفحة نزلت عنده
فتحنا الصفحة بلينك text fragment لكلمة جواه:
                                 نفس النتيجة: hidden اتشال
~~~

(Ctrl+F نفسه مينفعش يتساق من سكربت، فده من MDN والمواصفة: البحث بيلاقي الكلمة، وبيظهر الصندوق، وبينزل عندها.)

الفرق بينه وبين [[hidden]] العادي:

| | [[hidden]] | [[hidden="until-found"]] |
|---|---|---|
| بيستخبى إزاي | [[display: none]] | [[content-visibility: hidden]]: العنصر موجود بارتفاع صفر ومحتواه مش مرسوم |
| Ctrl+F بيلاقي اللي جواه | لأ | أيوه، وبيظهره |
| لينك [[#id]] لحاجة جواه | مبيوصلش | بيوصل وبيظهره |
| بعد ما يظهر | | الـ attribute بيتشال، ومبيرجعش يستخبى لوحده |

بيتستخدم في: نص طويل مطوي (شروط، تفاصيل منتج، باقي المقال) عايز الزائر ومحرك البحث يلاقوا اللي جواه. ولو عايز سهم وعنوان بيتداس عليه كمان، [[<details>]] بيعمل الاتنين (درس «details و summary»).

**الدعم (جدول MDN):** Chrome 102 و Firefox 148. Safari 26.2 بيظهر المحتوى بس مبينزلش عند الكلمة صح (مكتوب في الجدول «partial»). في متصفح مش داعم العنصر بيتعامل كـ [[hidden]] عادي: مستخبي ومفيش بحث بيظهره. فمتحطش جواه حاجة الزائر **لازم** يشوفها.

---

## ٣. [[<main inert>]]: باين بس واقف

~~~live 113 جرّب تدوس وتكتب في الجزء الواقف، وجرّب Tab
<section>
  <p><strong>جزء عادي:</strong> <button type="button" onclick="a.value = Number(a.value) + 1">دوسني</button> اتداس <output id="a">0</output> مرة</p>
</section>
<section inert>
  <p><strong>جزء عليه inert:</strong> <button type="button" onclick="b.value = Number(b.value) + 1">دوسني</button> اتداس <output id="b">0</output> مرة
  <a href="#x">لينك</a> <input value="اكتب هنا" aria-label="خانة"></p>
</section>
~~~

**هتشوف إيه:** الجزئين شكلهم واحد. بس في التاني: الزرار مبيعدّش، والخانة مبتاخدش كتابة، و Tab بيعدّي من فوقهم كأنهم مش موجودين، والنص مبيتحددش بالماوس.

~~~text القياس من Chrome
كليك بالماوس على زرار جوه inert:      الزرار ماتداسش
Tab:                                    عدّى الزرار واللينك والخانة اللي جوه inert
استدعاء focus() على الزرار:             الفوكس ماراحش
في accessibility tree:                  ignored = true
الشكل:                                  opacity = 1   (مفيش أي تغيير في الشكل)
~~~

- [[inert]] من غير قيمة، ومعناه بيتورّث لكل اللي جوه العنصر.
- **الشكل مبيتغيّرش.** الزائر هيشوف زرار عادي ويدوس ومفيش حاجة تحصل. فلازم انت تبيّن إن الجزء واقف، بسطر CSS زي [[[inert] { opacity: 0.5; }]] (يخلّي أي جزء inert باهت للنص).
- وحسب MDN، Ctrl+F كمان مبيدوّرش جوه inert (Chrome 124 و Firefox 120، و Safari لأ).

### إمتى تكتبه بإيدك

[[showModal()]] بيعمل الصفحة inert لوحده. انت بتكتب [[inert]] لما **مفيش** modal dialog والمفروض جزء يقف:

- لوحة جانبية مفتوحة بـ [[show()]] أو popover، وعايز الصفحة اللي وراها تقف.
- فورم بيتبعت دلوقتي: الفورم كله يقف لحد ما الرد ييجي، بدل [[disabled]] على كل حقل.
- محتوى موجود في الكود بس برّه الشاشة (سلايد مش دوره، قايمة جانبية مقفولة): من غير [[inert]] الزائر بـ Tab بيدخل على أزرار مش شايفها.

اللي بيكتب [[inert]] ويشيله في الوقت المناسب JavaScript. في الـ HTML انت بتكتب الحالة اللي الصفحة بتبدأ بيها.

---

## ٤. [[hidden]] ولا [[inert]] ولا [[disabled]] ولا [[aria-hidden]]؟

| | باين؟ | بيتداس بالماوس؟ | Tab بيقف عليه؟ | قارئ الشاشة شايفه؟ | بيتكتب على |
|---|---|---|---|---|---|
| [[hidden]] | لأ | لأ | لأ | لأ | أي عنصر |
| [[inert]] | أيوه | لأ | لأ | لأ | أي عنصر (وكل اللي جواه) |
| [[disabled]] | أيوه، باهت | لأ | لأ | أيوه، وبيقول «disabled» | عناصر الفورم بس |
| [[aria-hidden="true"]] | أيوه | **أيوه** | **أيوه** | لأ | أي عنصر |

~~~text القياس من Chrome (زرار في كل حالة)
جوه inert:              Tab عدّاه ، والكليك ماوصلش ، ignored = true
disabled:               Tab عدّاه ، وفي accessibility tree: role = button ، disabled = true
جوه aria-hidden="true": Tab **وقف عليه**
~~~

- [[disabled]] لحقل أو زرار واحد في فورم، والزائر محتاج يعرف إنه موجود بس مش متاح (درس «readonly و disabled و checked»).
- [[inert]] لمنطقة كاملة من أي عناصر.
- [[aria-hidden]] بيخبّي عن قارئ الشاشة بس. لو حطيته على جزء فيه أزرار، اللي ماشي بالكيبورد هيقف على زرار قارئ الشاشة مبيقولش عنه حاجة. للزينة بس (أيقونة جنب كلمة).

---

## ٥. [[<div tabindex="0">]]: مين بياخد فوكس

[[inert]] بيشيل عناصر من طريق Tab. [[tabindex]] بيحط عناصر فيه، أو بيشيل واحد بعينه:

| القيمة | Tab بيقف عليه؟ | ينفع الفوكس يروحله بكليك أو JavaScript؟ |
|---|---|---|
| [[tabindex="0"]] | أيوه، في دوره بترتيب الكود | أيوه |
| [[tabindex="-1"]] | لأ | أيوه |
| [[tabindex="5"]] (أي رقم موجب) | أيوه، **قبل** كل العناصر العادية | أيوه |
| من غير [[tabindex]] على [[<div>]] | لأ | لأ |

~~~text القياس من Chrome
الكود بالترتيب:   زرار ١ ، div tabindex="0" ، div tabindex="-1" ، زرار tabindex="5" ، div عادي ، زرار ٢
Tab:              الزرار أبو 5 > زرار ١ > الـ div أبو 0 > زرار ٢
focus() على الـ div أبو -1:   الفوكس راحله
focus() على الـ div العادي:    الفوكس ماراحش
الـ div أبو 0 في accessibility tree:   role = generic   (بياخد فوكس ، بس لسه مش زرار)
~~~

- [[tabindex="0"]] بيدّي الفوكس بس. مبيخلّيش الـ [[<div>]] زرار: لا Enter ولا Space ولا role. لو بيتداس، اكتبه [[<button>]].
- الرقم الموجب بيلخبط الترتيب على كل الصفحة. متستخدموش.
- [[-1]] للعنصر اللي JavaScript بينقل له الفوكس (عنوان بعد التنقل، رسالة خطأ).

التفاصيل ومثال كامل في درس «roving tabindex».

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[hidden="false"]] عشان العنصر يظهر | لسه مستخبي. الـ attribute لازم يتشال |
| [[hidden]] على عنصر الـ CSS مديله [[display]] | العنصر باين |
| [[hidden]] لمحتوى المفروض قارئ الشاشة يقراه | مستخبي عنه كمان |
| محتوى أساسي جوه [[hidden="until-found"]] | في متصفح مش داعم، مستخبي للأبد |
| [[inert]] من غير أي تغيير في الشكل | أزرار شكلها شغال ومبتردش، والزائر يفتكر الصفحة بايظة |
| [[inert]] على [[<body>]] كله | الصفحة كلها ماتت، بما فيها النافذة اللي كنت عايزها تشتغل |
| [[disabled]] على [[<div>]] أو [[<a>]] | ملوش تأثير: [[disabled]] لعناصر الفورم بس. المنطقة تاخد [[inert]] |
| [[aria-hidden="true"]] على جزء فيه أزرار | Tab بيقف على أزرار قارئ الشاشة ساكت عنها |
| [[tabindex="0"]] على [[<div>]] بدل [[<button>]] | فوكس من غير Enter ولا Space ولا اسم |

---

## الخلاصة

- [[hidden]]: مش موجود. بيتشال عشان يظهر، ومتسيبش الـ CSS يلغيه.
- [[hidden="until-found"]]: مستخبي لحد ما البحث أو لينك يوصلّه.
- [[inert]]: باين وواقف، هو وكل اللي جواه. وبيّن ده في الشكل.
- [[disabled]] لحقل في فورم. [[aria-hidden]] للزينة بس.
- [[tabindex]]: [[0]] يدخل طريق Tab، و [[-1]] فوكس من غير Tab، والموجب ممنوع.`,
          try: R`اعمل ملف [[hidden.html]] فيه: فقرة «نزّل التطبيق» عليها [[hidden]]، وصندوق [[hidden="until-found"]] جواه فقرة ليها [[id="refund"]] فيها «الاسترجاع خلال ١٤ يوم»، ولينك فوق بيروح لـ [[#refund]]، وجزء [[inert]] فيه زرار. افتحه في Chrome: دوّر بـ Ctrl+F على «استرجاع»، وحمّل الصفحة تاني ودوس اللينك، وجرّب Tab.`,
          sol: R`~~~html hidden.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الاشتراك</title>
</head>
<body>
<h1>الاشتراك</h1>
<p hidden>نزّل التطبيق</p>
<p><a href="#refund">سياسة الاسترجاع</a></p>

<div hidden="until-found">
  <p id="refund">الاسترجاع خلال ١٤ يوم من الدفع.</p>
</div>

<section inert>
  <button type="button">ادفع</button> (لسه مش متاح)
</section>
</body>
</html>
~~~

~~~view 150 شكل الصفحة أول ما تفتح
<h1>الاشتراك</h1>
<p hidden>نزّل التطبيق</p>
<p><a>سياسة الاسترجاع</a></p>
<div hidden="until-found">
  <p id="refund">الاسترجاع خلال ١٤ يوم من الدفع.</p>
</div>
<section inert>
  <button type="button">ادفع</button> (لسه مش متاح)
</section>
~~~

(اللينك في المعاينة دي من غير [[href]]: اللينكات اللي بتروح لـ [[#id]] بتتجرّب في ملف حقيقي، مش جوه صندوق المعاينة.)

**هتشوف إيه في الملف بتاعك:**

- «نزّل التطبيق» مش باينة، و «الاسترجاع خلال ١٤ يوم» مش باينة.
- Ctrl+F و «استرجاع»: جملة الاسترجاع ظهرت واتعلّمت.
- حمّل تاني ودوس «سياسة الاسترجاع»: الجملة ظهرت والعنوان بقى آخره [[#refund]].
- Ctrl+F و «نزّل»: مفيش نتيجة. [[hidden]] العادي مبيتلاقاش.
- Tab: بيقف على اللينك بس. زرار «ادفع» مبياخدش فوكس ومبيتداسش.

~~~text القياس من Chrome
قبل:                          الصندوق display = block ، content-visibility = hidden ، ارتفاعه 0
بعد فتح الصفحة على #refund:    hidden اتشال من الصندوق ، وارتفاعه بقى 18px
زرار «ادفع» جوه inert:         الكليك ماوصلش ، و Tab عدّاه
~~~

(خطوة Ctrl+F من MDN، الباقي اتقاس.)`,
          deep: {
            why: R`الصفحة فيها دايمًا حاجات مش وقتها: رسالة لسه محصلتش، خطوة جاية، قايمة مقفولة. وفيها أوقات جزء منها لازم يقف: وهي بتحمّل، أو وفيه لوحة مفتوحة فوقها. زمان الأولى كانت [[class]] بتتلوّن بـ CSS، والتانية كانت شبه مستحيلة: تعطيل كل زرار ولينك وخانة واحد واحد، وتظبيط [[tabindex="-1"]] و [[aria-hidden]] على كل حاجة، وترجيعهم بعدين. [[hidden]] و [[inert]] بيقولوا المعنى مرة واحدة على العنصر الأب، والمتصفح بيطبّقه على الماوس والكيبورد وقارئ الشاشة مع بعض.`,
            how: R`[[hidden]] في ستايل المتصفح سطر واحد: [[[hidden] { display: none }]]. عشان كده أي [[display]] من عندك بيلغيه: ده CSS عادي والأقوى بيكسب. [[hidden="until-found"]] بدل كده بياخد [[content-visibility: hidden]]: العنصر له صندوق بس محتواه مبيترسمش، فالمتصفح لسه يقدر يدوّر جواه. ولما البحث أو لينك يوصل لحاجة جواه، بيبعت حدث اسمه [[beforematch]] وبيشيل الـ attribute. و [[inert]] مش CSS خالص: المتصفح بيعلّم العنصر وكل ولاده إنهم «inert»، فاختبار «إيه اللي تحت الماوس» بيعدّيهم، وقايمة العناصر اللي بتاخد فوكس بتستبعدهم، والـ accessibility tree بتشيلهم.`,
            when: R`[[hidden]]: حاجة مش وقتها، و JavaScript هيظهرها. [[hidden="until-found"]]: نص مطوي لازم يتلاقى بالبحث. [[inert]]: منطقة لازم تقف مؤقتًا، أو محتوى برّه الشاشة. [[disabled]]: حقل أو زرار واحد في فورم. [[aria-hidden]]: زينة مكررة لقارئ الشاشة. [[tabindex="0"]]: عنصر مخصوص محتاج فوكس ومفيش عنصر HTML جاهز ليه (نادر). [[tabindex="-1"]]: هدف JavaScript بينقل له الفوكس.`,
            mistakes: R`[[hidden="false"]]. نسيان سطر [[[hidden] { display: none !important }]] في مشروع فيه [[display: flex]] على كل حاجة. [[inert]] من غير شكل باهت. [[inert]] على أب النافذة اللي المفروض تشتغل. [[aria-hidden]] على جزء تفاعلي. [[tabindex]] موجب. وإخفاء حاجة بـ [[hidden]] على أساس إنها «سر»: الكود كله بيتشاف في View Source.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** في صفحة «دفتر نور» تلات فقرات. «اتحفظت ✓» المفروض متبانش لحد ما الحفظ يحصل، و «مفيش ملاحظات لسه» المفروض تبان دلوقتي، و «جاري التحميل...» خلصت ومتبانش. اكتب [[hidden]] على اللي المفروض يستخبى. (من قسم ١ في الشرح)`, done: R`الصفحة فيها العنوان و «مفيش ملاحظات لسه» بس، وكل الشروط ✓.`, work: { h: 130, start: R`<h1>دفتر نور</h1>
<p id="saved">اتحفظت ✓</p>
<p id="empty">مفيش ملاحظات لسه</p>
<p id="loading" hidden="false">جاري التحميل...</p>`, checks: [
              { say: R`«اتحفظت ✓» عليها [[hidden]]`, q: "#saved[hidden]" },
              { say: R`«مفيش ملاحظات لسه» **مش** عليها [[hidden]]`, q: "#empty:not([hidden])" },
              { say: R`«جاري التحميل...» عليها [[hidden]]`, q: "#loading[hidden]" },
              { say: R`مفيش [[hidden="false"]] في الصفحة`, q: "[hidden=\"false\"]", n: 0 },
            ] }, sol: R`~~~live 130 الحل
<h1>دفتر نور</h1>
<p id="saved" hidden>اتحفظت ✓</p>
<p id="empty">مفيش ملاحظات لسه</p>
<p id="loading" hidden>جاري التحميل...</p>
~~~

**هتشوف إيه:** العنوان وتحته «مفيش ملاحظات لسه» بس.

**وخد بالك:** كود البداية كان شكله صح من أول لحظة في فقرة التحميل: [[hidden="false"]] **بيخبّي** برضه. بس اللي كتبه كان قصده «اظهر»، واللي هييجي بعده هيقراها كده. عشان كده الشرط الرابع موجود: اكتب [[hidden]] لوحدها للإخفاء، وشيلها خالص للإظهار.

**الغلطة الشائعة:** [[hidden="true"]] و [[hidden="false"]] كأنه مفتاح. المتصفح مبيقراش القيمة (غير [[until-found]]).

~~~text القياس من Chrome
<p hidden>:            display = none
<p hidden="false">:    display = none
<p> من غير hidden:     display = block
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شريط «العرض انتهى» المفروض مستخبي ([[hidden]] مكتوب عليه) بس باين في الصفحة. السبب في الـ [[<style>]]. صلّحها **من غير** ما تشيل [[class="banner"]] ولا سطر الـ [[display: flex]]: زوّد سطر CSS واحد. (من قسم ١ في الشرح: الفخ)`, done: R`الشريط مش باين، ولسه عليه [[hidden]] و [[class="banner"]]، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .banner { display: flex; gap: 8px; border: 1px solid; padding: 8px; }
</style>

<div class="banner" hidden>
  <strong>العرض انتهى</strong>
  <span>استنى العرض الجاي</span>
</div>
<p>أهلًا بيك في دفتر نور.</p>`, checks: [
              { say: R`الشريط لسه عليه [[hidden]] و [[class="banner"]]`, q: "div.banner[hidden]" },
              { say: R`سطر [[display: flex]] لسه موجود`, q: "style", has: "display: flex" },
              { say: R`في الـ [[<style>]] قاعدة بتبدأ بـ [[[hidden] {]]`, q: "style", has: "[hidden]" },
              { say: R`القاعدة فيها [[!important]]`, q: "style", has: "!important" },
            ] }, sol: R`~~~live 52 بعد التصليح
<style>
  .banner { display: flex; gap: 8px; border: 1px solid; padding: 8px; }
  [hidden] { display: none !important; }
</style>

<div class="banner" hidden>
  <strong>العرض انتهى</strong>
  <span>استنى العرض الجاي</span>
</div>
<p>أهلًا بيك في دفتر نور.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 130 قبل
<style>
  .banner { display: flex; gap: 8px; border: 1px solid; padding: 8px; }
</style>

<div class="banner" hidden>
  <strong>العرض انتهى</strong>
  <span>استنى العرض الجاي</span>
</div>
<p>أهلًا بيك في دفتر نور.</p>
~~~

**هتشوف إيه:**

- **قبل:** شريط ببرواز فيه «العرض انتهى» فوق جملة الترحيب.
- **بعد:** جملة الترحيب بس.

**ليه:** [[hidden]] بيشتغل بـ [[display: none]] من ستايل المتصفح، و [[.banner { display: flex }]] بتاعك أقوى منه فكسب. السطر الجديد بيقول: أي عنصر عليه [[hidden]] يبقى [[display: none]]، و [[!important]] بتخلّيه يكسب على أي [[display]] تاني. (ترتيب مين بيكسب في الـ CSS في درس «specificity».)

**الغلطة الشائعة:** تحل المشكلة للشريط ده بس ([[.banner[hidden] { display: none }]]). المشكلة هتتكرر مع أول عنصر تاني عليه [[display]]. السطر العام بيتكتب مرة واحدة للمشروع كله.

~~~text القياس من Chrome
قبل:   <div class="banner" hidden>   display = flex
بعد:   display = none
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** لوحة «جولة سريعة» مفتوحة جنب الصفحة، والمفروض الصفحة الأساسية تقف لحد ما الزائر يقفلها. اللي كتب الكود حط [[disabled]] على كل زرار، بس اللينك لسه بيتداس والـ [[disabled]] اللي على الـ [[<div>]] ملوش أي تأثير. بدّل ده كله بـ attribute واحد على [[<main>]]. (من قسم ٣ و ٤ في الشرح)`, done: R`[[<main>]] عليه [[inert]]، ومفيش [[disabled]] جواه، واللوحة لسه شغالة، وكل الشروط ✓.`, work: { h: 230, start: R`<main>
  <h1>دفتر نور</h1>
  <button type="button" disabled>ملاحظة جديدة</button>
  <button type="button" disabled>بحث</button>
  <a href="#settings">الإعدادات</a>
  <div disabled>ملاحظة: مشتريات الأسبوع</div>
</main>

<aside>
  <h2>جولة سريعة</h2>
  <p>من هنا بتكتب ملاحظة جديدة.</p>
  <button type="button">فهمت</button>
</aside>`, checks: [
              { say: R`[[<main>]] عليه [[inert]]`, q: "main[inert]" },
              { say: R`مفيش [[disabled]] جوه [[<main>]]`, q: "main [disabled]", n: 0 },
              { say: R`اللوحة [[<aside>]] **مش** inert ومش جوه [[<main>]]`, q: "aside:not([inert])" },
              { say: R`مفيش [[inert]] غير على [[<main>]]`, q: "[inert]", n: 1 },
            ] }, sol: R`~~~live 259 بعد
<style>[inert] { opacity: 0.5; }</style>
<main inert>
  <h1>دفتر نور</h1>
  <button type="button">ملاحظة جديدة</button>
  <button type="button">بحث</button>
  <a href="#settings">الإعدادات</a>
  <div>ملاحظة: مشتريات الأسبوع</div>
</main>

<aside>
  <h2>جولة سريعة</h2>
  <p>من هنا بتكتب ملاحظة جديدة.</p>
  <button type="button">فهمت</button>
</aside>
~~~

**هتشوف إيه:** الجزء اللي فوق كله باهت، ومفيش فيه حاجة بتتداس ولا بتاخد فوكس: لا الزرارين ولا اللينك. و Tab بيروح على طول لزرار «فهمت» اللي في اللوحة.

**ليه كده:**

- [[inert]] على الأب بيوقّف كل اللي جواه مرة واحدة، مهما كان نوعه.
- [[disabled]] كان بيوقّف الزرارين بس. اللينك مش عنصر فورم فمبياخدش [[disabled]]، وعلى [[<div>]] ده attribute مش معروف والمتصفح بيتجاهله.
- سطر [[[inert] { opacity: 0.5; }]] مني عشان يبان إن الجزء واقف: [[inert]] لوحده مبيغيّرش الشكل. (مش من شروط التمرين.)

**الغلطة الشائعة:** [[inert]] على [[<body>]] «عشان كله يقف». اللوحة جوه [[<body>]] فهتقف هي كمان، والزائر مش هيعرف يقفلها.

~~~text القياس من Chrome
قبل:   Tab بيقف على اللينك «الإعدادات» (الزرارين disabled بس)
بعد:   Tab بيعدّي كل اللي في main ، والكليك على اللينك ماوصلش
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة «الشروط» طويلة. خلّي فقرة «الاسترجاع» مطوية عشان الصفحة تبقى قصيرة، بس اللي يدوّر بـ Ctrl+F على «استرجاع» أو ييجي بلينك [[#refund]] يلاقيها. العنوان يفضل باين. (من قسم ٢ في الشرح)`, done: R`العنوان باين والفقرة مستخبية في صندوق [[hidden="until-found"]] وليها [[id="refund"]]، وكل الشروط ✓.`, work: { h: 150, start: R`<h1>الشروط</h1>
<h2>الاسترجاع</h2>
<p>الاسترجاع متاح خلال ١٤ يوم من الدفع، والمبلغ بيرجع على نفس وسيلة الدفع.</p>
<h2>الخصوصية</h2>
<p>ملاحظاتك محدش بيقراها غيرك.</p>`, checks: [
              { say: R`فقرة الاسترجاع جوه عنصر عليه [[hidden="until-found"]]`, q: "[hidden=\"until-found\"] p", has: "الاسترجاع متاح" },
              { say: R`الفقرة ليها [[id="refund"]]`, q: "[hidden=\"until-found\"] p#refund" },
              { say: R`عنوان «الاسترجاع» برّه الصندوق المستخبي`, q: "[hidden] h2", n: 0 },
              { say: R`فقرة الخصوصية لسه باينة`, q: "[hidden] p", n: 1 },
            ] }, sol: R`~~~live 230 الحل
<h1>الشروط</h1>
<h2>الاسترجاع</h2>
<div hidden="until-found">
  <p id="refund">الاسترجاع متاح خلال ١٤ يوم من الدفع، والمبلغ بيرجع على نفس وسيلة الدفع.</p>
</div>
<h2>الخصوصية</h2>
<p>ملاحظاتك محدش بيقراها غيرك.</p>
~~~

**هتشوف إيه:** عنوان «الاسترجاع» وتحته على طول عنوان «الخصوصية» وفقرتها. فقرة الاسترجاع مش باينة ومش واخدة مكان.

**جرّبها في ملف عندك** (اللينكات لـ [[#id]] بتتجرّب في ملف حقيقي): احفظ الحل في [[terms.html]]، وافتحه، ودوّر بـ Ctrl+F على «استرجاع». أو افتح [[terms.html#refund]] من شريط العنوان.

**ليه كده:**

- [[hidden]] العادي كان هيخبّيها عن البحث وعن اللينك كمان.
- الصندوق [[<div>]] حوالين الفقرة، مش الـ attribute على الفقرة نفسها: كده لو زوّدت فقرات تانية للقسم يستخبوا معاها. (وعلى الفقرة مباشرة برضه بيشتغل.)
- العنوان برّه: الزائر لازم يشوف إن فيه قسم اسمه «الاسترجاع».

**الغلطة الشائعة:** تخبّي العنوان مع الفقرة. الصفحة مش هيبان فيها إن فيه حاجة عن الاسترجاع أصلًا إلا للي يدوّر بالكلمة.

~~~text القياس من Chrome
الصندوق:                        content-visibility = hidden ، ارتفاعه 0
بعد فتح الصفحة على #refund:      hidden اتشال والفقرة ظهرت
~~~

(Ctrl+F من MDN. والدعم: Chrome 102 و Firefox 148، و Safari 26.2 جزئي.)` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع، وبعدين صلّح:** في الصفحة خمس أزرار، كل واحد في حالة. اكتب على ورقة: لو دوست Tab من أول الصفحة، هيقف على **كام** زرار، وأنهي؟ جرّب في الصندوق. وبعدين: الزرار اللي جوه [[aria-hidden]] نسخة زينة مكررة والكيبورد مش المفروض يوصله. صلّحه. (من قسم ٤ في الشرح: جدول المقارنة)`, done: R`توقّعت زرارين («حفظ» و «حفظ (نسخة)»)، وبعد التصليح Tab بيقف على «حفظ» بس، وكل الشروط ✓.`, work: { h: 170, start: R`<p><button type="button">حفظ</button></p>
<p hidden><button type="button">حفظ (مستخبي)</button></p>
<p inert><button type="button">حفظ (واقف)</button></p>
<p><button type="button" disabled>حفظ (disabled)</button></p>
<p aria-hidden="true"><button type="button">حفظ (نسخة)</button></p>`, checks: [
              { say: R`مفيش [[aria-hidden]] في الصفحة`, q: "[aria-hidden]", n: 0 },
              { say: R`«حفظ (نسخة)» بقى جوه عنصر [[inert]]`, q: "[inert] button", has: "نسخة" },
              { say: R`لسه فيه خمس أزرار`, q: "button", n: 5 },
              { say: R`واحد [[disabled]] وواحد جوه [[hidden]] زي ما هم`, q: "[hidden] button, button[disabled]", n: 2 },
            ] }, sol: R`~~~live 150 بعد التصليح
<p><button type="button">حفظ</button></p>
<p hidden><button type="button">حفظ (مستخبي)</button></p>
<p inert><button type="button">حفظ (واقف)</button></p>
<p><button type="button" disabled>حفظ (disabled)</button></p>
<p inert><button type="button">حفظ (نسخة)</button></p>
~~~

**هتشوف إيه:** أربع أزرار باينين (المستخبي لأ)، وواحد منهم باهت (الـ disabled). دوس Tab:

- **قبل:** وقف على «حفظ» وبعدين «حفظ (نسخة)».
- **بعد:** «حفظ» بس.

**ليه كل واحد:**

| الزرار | Tab بيقف؟ | ليه |
|---|---|---|
| حفظ | أيوه | عادي |
| جوه [[hidden]] | لأ | مش موجود |
| جوه [[inert]] | لأ | واقف |
| [[disabled]] | لأ | زرار فورم متعطل |
| جوه [[aria-hidden]] | **أيوه** | [[aria-hidden]] بيخبّي عن قارئ الشاشة بس |

[[inert]] بيعمل اللي [[aria-hidden]] كان المفروض يعمله (يخبّي عن قارئ الشاشة) وبيشيل الفوكس والكليك كمان.

**الغلطة الشائعة:** تسيب [[aria-hidden]] وتزوّد [[tabindex="-1"]] على الزرار. بيشتغل للكيبورد، بس الماوس لسه بيدوس عليه، ولازم تكرره على كل عنصر جوه.

~~~text القياس من Chrome (Tab)
زرار عادي ، وزرار جوه inert ، وزرار disabled ، وزرار جوه aria-hidden:
Tab وقف على:   العادي > اللي جوه aria-hidden
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك بيسأل: «عندي زرار "ادفع" مش عايزه يشتغل لحد ما الزائر يوافق على الشروط. أكتب عليه [[hidden]] ولا [[inert]] ولا [[disabled]]؟». جاوبه في ٣ سطور وقول ليه. (من قسم ٤ في الشرح)`, done: R`اخترت واحد وقلت التلاتة بيفرقوا في إيه للزائر.`, sol: R`إجابة نموذجية:

1. **[[disabled]].** الزرار عنصر فورم واحد، والزائر محتاج يشوف إن فيه زرار «ادفع» بس لسه مش متاح. [[disabled]] بيخلّيه باهت، وقارئ الشاشة بيقول «disabled»، وكل ده من غير CSS.
2. [[hidden]] هيشيل الزرار خالص، فالزائر مش هيعرف إن فيه دفع أصلًا ولا هو واقف على إيه.
3. [[inert]] هيسيبه **شكله شغال** وهو مبيردش، وقارئ الشاشة مش هيشوفه خالص. [[inert]] لمنطقة كاملة مش لزرار.

~~~text القياس من Chrome (accessibility tree)
<button disabled>:        role = button ، disabled = true      (موجود ومتعلّم إنه متعطل)
<button> جوه inert:       ignored = true                        (مش موجود)
<button hidden>:          ignored = true ، display = none
~~~` }
          ]
        }
,
        {
          cmd: "contenteditable و spellcheck",
          title: "نص بيتعدّل في مكانه، وتظبيط الكتابة: contenteditable و spellcheck و autocapitalize و autocorrect و writingsuggestions و enterkeyhint و translate",
          pre: [{ to: "css/form و label", why: R`[[<input>]] و [[<textarea>]] هم الطريقة العادية للكتابة، و [[contenteditable]] بيتقارن بيهم` }, { to: "css/textarea و date و number", why: R`[[inputmode]] (شكل كيبورد الموبايل) مشروح هناك، وهنا إخواته` }],
          ref: [
            { t: "MDN: contenteditable", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable" },
            { t: "WHATWG: contenteditable", url: "https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable" },
            { t: "MDN: spellcheck", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/spellcheck" },
            { t: "MDN: autocapitalize", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autocapitalize" },
            { t: "MDN: autocorrect", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autocorrect" },
            { t: "MDN: writingsuggestions", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/writingsuggestions" },
            { t: "MDN: enterkeyhint", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/enterkeyhint" },
            { t: "MDN: translate", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/translate" }
          ],
          desc: R`[[contenteditable]] بيخلّي **أي عنصر** في الصفحة يتكتب فيه: عنوان، فقرة، خانة في جدول. الزائر بيدوس على الكلام ويعدّله في مكانه، من غير [[<input>]].
ومعاه في الدرس الـ attributes اللي بتظبط الكتابة نفسها في أي مكان بيتكتب فيه (حقل أو [[contenteditable]]): التصحيح الإملائي [[spellcheck]]، وتلات تلميحات لكيبورد الموبايل ([[autocapitalize]] و [[autocorrect]] و [[enterkeyhint]])، واقتراحات الكتابة [[writingsuggestions]]، و [[translate]] اللي بيمنع ترجمة كلمة.`,
          example: R`<h2 contenteditable="plaintext-only" spellcheck="false">عنوان الملاحظة</h2>
<div contenteditable role="textbox" aria-multiline="true" aria-label="نص الملاحظة" enterkeyhint="done">اكتب هنا</div>
<input name="title" autocapitalize="words" autocorrect="off" enterkeyhint="next">
<textarea name="code" spellcheck="false" autocapitalize="off" writingsuggestions="false"></textarea>
<p>التطبيق اسمه <span translate="no">Nour Notes</span>.</p>`,
          flag: "script",
          lines: [
            R`عنوان بيتعدّل في مكانه. [[contenteditable="plaintext-only"]]: نص بس، من غير تنسيق ولا سطور جديدة بعناصر. و [[spellcheck="false"]]: من غير خطوط حمرا تحت الكلام (العنوان ممكن يبقى اسم أو كود).`,
            R`صندوق بيتكتب فيه بتنسيق ([[contenteditable]] لوحدها). ولأن [[<div>]] ملوش معنى عند قارئ الشاشة: [[role="textbox"]] بيقول إنه خانة كتابة، و [[aria-multiline="true"]] إنها كذا سطر، و [[aria-label]] اسمها. و [[enterkeyhint="done"]] بيكتب «تم» على زرار Enter في كيبورد الموبايل.`,
            R`حقل عادي بتلات تلميحات: [[autocapitalize="words"]] أول حرف في كل كلمة كبير، و [[autocorrect="off"]] من غير تصحيح تلقائي، و [[enterkeyhint="next"]] زرار Enter مكتوب عليه «التالي».`,
            R`خانة لكود: من غير تصحيح إملائي، ومن غير حروف كبيرة تلقائي، ومن غير اقتراحات كتابة من المتصفح.`,
            R`[[translate="no"]] على اسم التطبيق: لو الزائر ترجم الصفحة، الاسم يفضل زي ما هو.`
          ],
          teach: R`## الفكرة في سطرين

[[contenteditable]] بيحوّل أي عنصر لمكان بيتكتب فيه. والباقي تلميحات للمتصفح عن **إزاي** الكتابة تتساعد: يصحّح ولا لأ، يكبّر أول حرف ولا لأ، يكتب إيه على زرار Enter.

القياسات من Chrome 157 على Windows 11 بكتابة وضغطات حقيقية. سلوك كيبورد الموبايل نفسه من MDN (مكتوب عند كل واحدة).

---

## ١. [[<div contenteditable>]]: أي عنصر بيتكتب فيه

~~~live 170 دوس على أي سطر واكتب
<h2 contenteditable>عنوان بيتعدّل</h2>
<p contenteditable>فقرة بتتعدّل: امسح واكتب، وجرّب Ctrl+B على كلمة محددة.</p>
<p>فقرة عادية: مبتتعدّلش.</p>
~~~

**هتشوف إيه:** أول سطرين لما تدوس عليهم بيظهر فيهم مؤشر الكتابة وحواليهم برواز الفوكس، وبتكتب وتمسح زي أي خانة. التالت كلام عادي.

القيم:

| القيمة | المعنى |
|---|---|
| [[contenteditable]] أو [[contenteditable="true"]] | بيتعدّل، **وبتنسيق**: خط تقيل، ولصق بألوانه وصوره |
| [[contenteditable="plaintext-only"]] | بيتعدّل، نص بس من غير أي تنسيق |
| [[contenteditable="false"]] | مبيتعدّلش، حتى لو أبوه بيتعدّل |
| من غير الـ attribute | زي أبوه: بيتعدّل لو الأب بيتعدّل |

~~~text القياس من Chrome (الخاصية isContentEditable)
<div contenteditable>:                    true
<div contenteditable="plaintext-only">:   true
<div contenteditable="false">:            false
<div contenteditable="yes">:              false     (قيمة غلط = كأنه مش مكتوب)
<p> جوه <div contenteditable>:            true      (ورثها من أبوه)
<p contenteditable="false"> جوه نفس الأب: false
Tab:                                      بيقف على كل عنصر contenteditable في دوره
~~~

- دي **مش** attribute من غير قيمة زي [[hidden]]: هي قيم محددة. [[contenteditable="false"]] معناها «لأ» بجد.
- العنصر بياخد فوكس بـ Tab لوحده، من غير [[tabindex]].
- [[contenteditable="false"]] جوه أب بيتعدّل بيعمل «جزيرة» ثابتة: تاريخ، أو اسم الكاتب، أو زرار وسط النص.

---

## ٢. المتصفح بيكتب إيه جوه العنصر

لما الزائر يكتب، المتصفح بيغيّر الـ HTML اللي جوه العنصر:

~~~text القياس من Chrome (العنصر كان فيه «ملاحظة»)
كتبنا « جديدة»:                  ملاحظة جديدة
Enter وكتبنا «سطر تاني»:         ملاحظة جديدة<div>سطر تاني</div>
حددنا الكل و Ctrl+B:             <b>ملاحظة جديدة</b><div><b>سطر تاني</b></div>

نفس الخطوات جوه contenteditable="plaintext-only":
Ctrl+B:                          نص            (مفيش تنسيق)
Enter وكتبنا «س٢»:               نص + سطر جديد عادي + س٢     (مفيش <div>)
~~~

- مع [[contenteditable]] العادي: Enter بيعمل [[<div>]] جديد، و Ctrl+B بيحط [[<b>]]، واللصق من Word أو من صفحة تانية بيجيب تنسيقه معاه. (شكل الـ HTML ده بيختلف من متصفح لمتصفح: MDN.)
- مع [[plaintext-only]]: حروف وسطور بس.

~~~live 174 جرّب Ctrl+B و Enter في الاتنين
<p><strong>عادي:</strong></p>
<div contenteditable style="border: 1px solid; padding: 4px">حدد كلمة ودوس Ctrl+B</div>
<p><strong>plaintext-only:</strong></p>
<div contenteditable="plaintext-only" style="border: 1px solid; padding: 4px">حدد كلمة ودوس Ctrl+B</div>
~~~

([[style="border: 1px solid; padding: 4px"]] سطر CSS على العنصر نفسه: برواز ومسافة عشان تشوف حدود المكان اللي بيتكتب فيه. هتتعلمه في وحدات الـ CSS.)

**هتشوف إيه:** في الأول الكلمة بتبقى تقيلة. في التاني Ctrl+B مبيعملش حاجة.

**القاعدة:** عنوان، اسم، خانة في جدول، أي حاجة المفروض تبقى نص: [[plaintext-only]]. [[contenteditable]] العادي لمحرر نصوص بجد (وده مشروع JavaScript كبير).

**الدعم (جدول MDN):** [[contenteditable]] في كل المتصفحات من زمان. [[plaintext-only]]: Chrome 51 و Safari 5، و Firefox من 136 بس (2025). في Firefox أقدم القيمة بتتجاهل والعنصر **مبيتعدّلش**.

---

## ٣. اللي [[contenteditable]] مبيعملوش

هو بيخلّي العنصر يتكتب فيه وبس. تلات حاجات [[<input>]] و [[<textarea>]] بيعملوهم وهو لأ:

~~~text القياس من Chrome
فورم فيه <div contenteditable> مكتوب فيه كلام و <input name="a" value="1">:
اللي الفورم بيبعته:      a=1          (كلام الـ div مش موجود)

<div contenteditable> في accessibility tree:
role = generic ، name = ""   (قابل للتعديل ، بس من غير اسم ومن غير دور «خانة»)
~~~

1. **مبيتبعتش مع الفورم.** ملوش [[name]] ولا [[value]]. اللي اتكتب بيفضل في الصفحة لحد ما JavaScript ياخده ويبعته.
2. **ملوش اسم ولا دور.** [[<label for>]] مبيشتغلش معاه. فلازم تكتب: [[role="textbox"]]، و [[aria-label="..."]] (أو [[aria-labelledby]])، و [[aria-multiline="true"]] لو كذا سطر.
3. **مفيش فحص.** لا [[required]] ولا [[maxlength]] ولا [[placeholder]].

| عايز | استخدم |
|---|---|
| حقل في فورم بيتبعت | [[<input>]] أو [[<textarea>]] |
| نص في الصفحة الزائر يعدّله في مكانه (عنوان ملاحظة، اسم ملف، خانة جدول) | [[contenteditable="plaintext-only"]] |
| محرر بتنسيق | [[contenteditable]] مع JavaScript كتير، أو مكتبة جاهزة |

### واللي بيتكتب فيه HTML

اللي جوه [[contenteditable]] العادي HTML مش نص: الزائر يقدر يلزق فيه أي حاجة. لو كود الصفحة أخد المحتوى ده زي ما هو وحفظه وعرضه لزائر تاني، يبقى أي حد يقدر يحط كود في صفحتك (ده اسمه XSS، وهييجي في كورس JavaScript). [[plaintext-only]] بيقفل الباب ده من عند الكتابة، والسيرفر لازم ينضّف برضه.

---

## ٤. [[<textarea spellcheck="false">]]: التصحيح الإملائي

المتصفح بيحط خط أحمر متعرج تحت الكلمة اللي شايفها غلط، في أي مكان بيتكتب فيه.

| القيمة | المعنى |
|---|---|
| [[spellcheck="true"]] أو [[spellcheck=""]] | افحص الإملاء وعلّم على الغلط |
| [[spellcheck="false"]] | متفحصش الإملاء في العنصر ده |
| من غير الـ attribute | المتصفح بيقرر حسب العنصر، وممكن يورثها من الأب |

~~~text القياس من Chrome (الخاصية spellcheck)
<input> من غير الـ attribute:        true
<textarea spellcheck="false">:      false
~~~

~~~live 166 اكتب كلمة إنجليزي غلط في الخانتين (زي helo wrld)
<p><label for="s1">بفحص إملائي</label><br><textarea id="s1" rows="2">helo wrld</textarea></p>
<p><label for="s2">من غير (spellcheck="false")</label><br><textarea id="s2" rows="2" spellcheck="false">helo wrld</textarea></p>
~~~

**هتشوف إيه:** دوس جوه كل خانة واكتب حرف. في الأولى المتصفح بيحط خط أحمر تحت الكلام الغلط (لو قاموس اللغة متسطب عندك)، وفي التانية لأ. (الخط الأحمر مبيتقاسش من سكربت، فده من MDN: والـ attribute «تلميح» والمتصفح مش ملزم بيه.)

اكتب [[spellcheck="false"]] على: كود، اسم مستخدم، إيميل، رقم طلب، كود خصم. أي حاجة مش كلام لغة.

**والخصوصية (MDN):** بعض المتصفحات فيها «تصحيح محسّن» بيبعت اللي بيتكتب لسيرفر عشان يصححه. فأي خانة فيها معلومة حساسة (سر، رقم بطاقة، سؤال أمان) تاخد [[spellcheck="false"]].

---

## ٥. تلميحات كيبورد الموبايل

التلاتة دول ملهمش أي تأثير على كيبورد الكمبيوتر. بيغيّروا كيبورد الشاشة في الموبايل والإملاء بالصوت (كل سلوكهم هنا من MDN، واللي اتقاس إن Chrome بيقرا القيم).

### [[<input autocapitalize="words">]]

الحروف الكبيرة التلقائية (للغات اللي فيها حروف كبيرة):

| القيمة | بيكبّر |
|---|---|
| [[autocapitalize="none"]] أو [[off]] | ولا حرف: كله زي ما الزائر كتبه |
| [[autocapitalize="sentences"]] أو [[on]] | أول حرف في كل جملة |
| [[autocapitalize="words"]] | أول حرف في كل كلمة (اسم شخص، عنوان) |
| [[autocapitalize="characters"]] | كل الحروف (كود خصم، رقم لوحة) |

- ملوش تأثير على [[type="email"]] و [[type="url"]] و [[type="password"]]: دول عمرهم ما بيتكبّروا.
- من غيره: Chrome و Safari بيكبّروا أول الجملة، و Firefox لأ.
- لو مكتوب على [[<form>]]، بيمشي على كل الحقول اللي جواه.
- الدعم: Chrome 43 و Firefox 111 و Safari على iOS من 10.3.

### [[<input autocorrect="off">]]

التصحيح التلقائي: الكيبورد بيبدّل الكلمة اللي شايفها غلط **لوحده** (غير [[spellcheck]] اللي بيعلّم بس).

- [[autocorrect="on"]] (أو من غير قيمة) و [[autocorrect="off"]].
- اقفله على: اسم مستخدم، اسم علم، كود، مصطلح. مفيش أسوأ من كيبورد بيغيّر اسم الزائر لكلمة تانية.
- ملوش تأثير على [[email]] و [[url]] و [[password]].
- الدعم: Safari 14.1 و Firefox 136 و Chrome 153. جديد في Chrome، ولو مش مدعوم الكيبورد بيتصرف بالافتراضي.

### [[<input enterkeyhint="search">]]

الكلمة (أو الأيقونة) اللي على زرار Enter في كيبورد الشاشة:

| القيمة | زرار Enter بيقول |
|---|---|
| [[enterkeyhint="enter"]] | «سطر جديد»: Enter هينزل سطر |
| [[enterkeyhint="done"]] | «تم»: خلّصت كتابة، والكيبورد بيتقفل |
| [[enterkeyhint="go"]] | «روح»: هيوديك لعنوان أو صفحة |
| [[enterkeyhint="next"]] | «التالي»: هينقلك للحقل اللي بعده |
| [[enterkeyhint="previous"]] | «السابق»: الحقل اللي قبله |
| [[enterkeyhint="search"]] | «بحث»: هيدوّر باللي اتكتب |
| [[enterkeyhint="send"]] | «إرسال»: هيبعت الرسالة أو الفورم |

- بيغيّر **الكلمة بس**. اللي بيحصل لما الزرار يتداس هو هو (إرسال الفورم مثلًا).
- بيتكتب على حقول الفورم وعلى [[contenteditable]].
- الدعم: Chrome 77 و Firefox 94 و Safari 13.1.

~~~text القياس من Chrome (المتصفح قرا القيم)
<textarea autocapitalize="words" autocorrect="off" enterkeyhint="send" writingsuggestions="false">
autocapitalize = words ، autocorrect = false ، enterKeyHint = send ، writingSuggestions = false

<input> من غير أي واحدة:
autocapitalize = "" ، autocorrect = true ، enterKeyHint = "" ، writingSuggestions = true
~~~

وأخوهم الرابع [[inputmode]] (كيبورد أرقام ولا إيميل ولا عادي) مشروح في درس «textarea و date و number».

---

## ٦. [[<textarea writingsuggestions="false">]]: اقتراحات المتصفح

بعض المتصفحات بتقترح تكملة الجملة وانت بتكتب (كلام رمادي قدام المؤشر). [[writingsuggestions]] بيقفلها أو يفتحها:

- [[writingsuggestions="true"]] (أو من غير قيمة): الافتراضي، مسموح.
- [[writingsuggestions="false"]]: ممنوع، للعنصر وكل اللي جواه.

اقفله في: خانة كود، امتحان أو تمرين كتابة، مكان الاقتراح فيه بيغطي على اقتراحات التطبيق نفسه.

**الدعم (جدول MDN):** Chrome 124 و Safari 18. Firefox مش داعمه (ومبيعرضش الاقتراحات دي أصلًا). السلوك من MDN.

---

## ٧. [[<span translate="no">]]: متترجمش دي

لما الزائر يترجم الصفحة (ترجمة المتصفح أو أداة ترجمة)، كل الكلام بيتترجم. [[translate="no"]] بيستثني عنصر:

~~~html
<p>التطبيق اسمه <span translate="no">Nour Notes</span>، واكتب <kbd translate="no">npm start</kbd> عشان يشتغل.</p>
~~~

| القيمة | المعنى |
|---|---|
| [[translate="yes"]] أو [[translate=""]] | يتترجم (الافتراضي) |
| [[translate="no"]] | يفضل زي ما هو، هو وكل اللي جواه |

~~~text القياس من Chrome (الخاصية translate)
<p translate="no">:                 false
عنصر جوه <p translate="no">:        false     (ورثها)
<p> عادي:                           true
~~~

بيتكتب على: اسم التطبيق أو الشركة، اسم شخص، كود أو أمر، عنوان إيميل، مصطلح لازم يفضل بلغته. (إن أدوات الترجمة بتحترمه: من MDN. الدعم: Chrome 19 و Firefox 111 و Safari 6.)

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[contenteditable]] بدل [[<textarea>]] في فورم | اللي اتكتب مبيتبعتش |
| [[contenteditable]] عادي لعنوان أو اسم | الزائر بيلزق كلام بألوان وخطوط وصور جوه العنوان |
| [[contenteditable="yes"]] | قيمة غلط: العنصر مبيتعدّلش |
| [[contenteditable]] من غير [[role]] ولا اسم | قارئ الشاشة ميعرفش إن ده مكان كتابة ولا بتاع إيه |
| [[contenteditable]] على [[<body>]] أو على جزء كبير | كل حاجة بتتعدّل، حتى الأزرار واللينكات |
| حفظ الـ HTML اللي جوه العنصر زي ما هو | أي حد يقدر يحط كود في الصفحة |
| [[spellcheck]] شغال على خانة كود أو اسم مستخدم | خطوط حمرا تحت كل حاجة |
| [[autocapitalize]] و [[autocorrect]] شغالين على اسم مستخدم | الموبايل بيكبّر أول حرف وبيغيّر الاسم، وتسجيل الدخول بيفشل |
| [[enterkeyhint="send"]] والفورم مبيبعتش بـ Enter | الزرار مكتوب عليه «إرسال» ومبيبعتش |
| [[translate="no"]] على [[<body>]] | الصفحة كلها ممنوعة من الترجمة |

---

## الخلاصة

- [[contenteditable]] بيخلّي أي عنصر يتكتب فيه. للنص: [[plaintext-only]]. ومبيتبعتش مع الفورم، ومحتاج [[role]] واسم.
- [[spellcheck="false"]]: من غير خطوط حمرا، وعلى أي خانة حساسة.
- للموبايل: [[autocapitalize]] (حروف كبيرة)، و [[autocorrect]] (تبديل الكلمات)، و [[enterkeyhint]] (كلمة زرار Enter)، و [[inputmode]] (شكل الكيبورد).
- [[writingsuggestions="false"]]: من غير اقتراحات تكملة.
- [[translate="no"]]: الاسم أو الكود يفضل زي ما هو في الترجمة.`,
          try: R`اعمل ملف [[edit.html]] فيه كارت ملاحظة: عنوان [[<h2>]] بيتعدّل كنص بس، وفقرة بتتعدّل بتنسيق، وسطر «آخر تعديل: النهارده» مبيتعدّلش. افتحه في Chrome: عدّل العنوان، وجرّب Ctrl+B في العنوان وفي الفقرة، وافتح DevTools (F12) وبص على الـ HTML بتاع الفقرة بعد ما تدوس Enter فيها.`,
          sol: R`~~~html edit.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ملاحظة</title>
</head>
<body>
<article>
  <h2 contenteditable="plaintext-only">مشتريات الأسبوع</h2>
  <p contenteditable role="textbox" aria-multiline="true" aria-label="نص الملاحظة">لبن وعيش وجبنة.</p>
  <p>آخر تعديل: النهارده</p>
</article>
</body>
</html>
~~~

~~~view 150 شكل الصفحة (دوس على العنوان أو الفقرة واكتب)
<article>
  <h2 contenteditable="plaintext-only">مشتريات الأسبوع</h2>
  <p contenteditable role="textbox" aria-multiline="true" aria-label="نص الملاحظة">لبن وعيش وجبنة.</p>
  <p>آخر تعديل: النهارده</p>
</article>
~~~

**هتشوف إيه:**

- العنوان والفقرة بيتكتب فيهم. سطر «آخر تعديل» لأ.
- Ctrl+B في العنوان: مفيش. في الفقرة: الكلمة بقت تقيلة.
- في DevTools بعد Enter في الفقرة: المتصفح زوّد [[<div>]] جواها للسطر الجديد.

~~~text القياس من Chrome
الفقرة بعد كتابة و Enter و Ctrl+B:     <b>...</b><div><b>...</b></div>
العنوان (plaintext-only) بعد Ctrl+B:    النص زي ما هو
العنوان في accessibility tree:          role = heading   (لسه عنوان ، وبقى قابل للتعديل)
الفقرة في accessibility tree:           role = textbox ، name = "نص الملاحظة" ، multiline = true
~~~

والتعديل ده بيروح مع أول تحميل للصفحة: [[contenteditable]] بيغيّر اللي على الشاشة بس. الحفظ شغل JavaScript.`,
          deep: {
            why: R`فيه واجهات [[<input>]] فيها غريب: عنوان ملاحظة شكله عنوان، اسم ملف في قايمة، خانة في جدول، تعليق. الزائر عايز يدوس على الكلام نفسه ويغيّره. [[contenteditable]] بيدّي ده من غير ما تبدّل العنصر بحقل وترجّعه. والتلميحات ([[autocapitalize]] و [[autocorrect]] و [[enterkeyhint]] و [[spellcheck]]) موجودة عشان الكيبورد «الذكي» بيبوّظ أي حاجة مش كلام عادي: بيكبّر أول حرف في اسم المستخدم، وبيصحّح كود الخصم لكلمة، وبيحط خط أحمر تحت اسم العيلة.`,
            how: R`لما عنصر يبقى «editing host» (عليه [[contenteditable]] بقيمة صح)، المتصفح بيخلّيه ياخد فوكس، وبيحط فيه مؤشر كتابة، وبيترجم ضغطات الكيبورد لتعديلات على الـ DOM اللي جواه: حرف بيتزوّد على نص، Enter بيقسم العنصر أو يزوّد واحد، Ctrl+B بيلف المحدد بـ [[<b>]]. مع [[plaintext-only]] نفس الكلام بس التعديلات المسموحة حروف وسطور. والتلميحات التانية مبتغيّرش حاجة في الصفحة: المتصفح بيبعتها لكيبورد النظام (أو للمصحح) كـ «معلومات عن الخانة دي»، والكيبورد هو اللي بيقرر يعمل بيها إيه. عشان كده كلها اسمها hint ومفيش ضمان.`,
            when: R`[[contenteditable="plaintext-only"]]: تعديل في المكان لنص قصير. [[contenteditable]]: محرر بتنسيق ومعاه JavaScript. [[spellcheck="false"]] و [[autocorrect="off"]] و [[autocapitalize="off"]]: اسم مستخدم، كود، إيميل مكتوب في حقل نص. [[autocapitalize="words"]]: اسم شخص أو مدينة. [[autocapitalize="characters"]]: كود خصم. [[enterkeyhint="search"]] في البحث، و [[next]] في فورم كذا حقل، و [[send]] في شات. [[translate="no"]]: أسماء وكود.`,
            mistakes: R`[[contenteditable]] مكان حقل فورم. محرر كامل بـ [[contenteditable]] من غير ما تحسب حساب اللصق. [[contenteditable]] من غير اسم ولا دور. تجربة [[autocapitalize]] و [[enterkeyhint]] على الكمبيوتر والاستغراب إن «مفيش حاجة حصلت» (دول للموبايل). [[spellcheck="false"]] على خانة رسالة عادية «عشان الشكل». والاعتماد على أي واحدة منهم كأنها قاعدة: كلها تلميحات.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** كارت ملاحظة في «دفتر نور». خلّي العنوان يتعدّل في مكانه **كنص بس**، والنص اللي تحته يتعدّل بتنسيق، وسطر التاريخ يفضل ثابت. (من قسم ١ و ٢ في الشرح)`, done: R`بتعرف تكتب في العنوان والنص، وسطر التاريخ لأ، وكل الشروط ✓.`, work: { h: 170, start: R`<article>
  <h2>أفكار المشروع</h2>
  <div>صفحة رئيسية، وصفحة عن التطبيق.</div>
  <p>اتكتبت يوم ٣ نوفمبر</p>
</article>`, checks: [
              { say: R`العنوان [[contenteditable="plaintext-only"]]`, q: "h2[contenteditable=\"plaintext-only\"]" },
              { say: R`النص [[contenteditable]] (بتنسيق)`, q: "div[contenteditable=\"\"], div[contenteditable=\"true\"]" },
              { say: R`سطر التاريخ من غير [[contenteditable]]`, q: "article > p:not([contenteditable])", has: "اتكتبت" },
              { say: R`[[<article>]] نفسه مش [[contenteditable]]`, q: "article[contenteditable]", n: 0 },
            ] }, sol: R`~~~live 170 الحل (دوس واكتب)
<article>
  <h2 contenteditable="plaintext-only">أفكار المشروع</h2>
  <div contenteditable>صفحة رئيسية، وصفحة عن التطبيق.</div>
  <p>اتكتبت يوم ٣ نوفمبر</p>
</article>
~~~

**هتشوف إيه:** الصفحة شكلها زي ما هي. الفرق لما تدوس: العنوان والنص بيظهر فيهم مؤشر كتابة وبرواز فوكس، وسطر التاريخ لأ. Ctrl+B بيشتغل في النص ومبيشتغلش في العنوان.

**ليه كده:**

- الـ attribute على كل عنصر لوحده، مش على [[<article>]]: لو اتكتب على الأب كان التاريخ هيتعدّل كمان.
- العنوان [[plaintext-only]]: عنوان فيه سطرين أو كلمة تقيلة أو صورة ملزوقة ملوش معنى.

**الغلطة الشائعة:** [[contenteditable]] على [[<article>]] كله. أسهل في الكتابة، بس الزائر يقدر يمسح التاريخ، ويمسح العنوان نفسه كعنصر فالكارت يبقى من غير [[<h2>]].

~~~text القياس من Chrome (isContentEditable)
h2 = true (plaintext-only) ، div = true ، p = false
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكارت ده المفروض كله يتعدّل **ما عدا** سطر «الكاتبة: منى علي». اللي حاصل: مفيش حاجة بتتعدّل خالص. وبعد ما تصلّحها خد بالك من سطر الكاتبة. (من قسم ١ في الشرح: جدول القيم)`, done: R`العنوان والفقرة بيتعدّلوا، وسطر الكاتبة ثابت، وكل الشروط ✓.`, work: { h: 170, start: R`<article contenteditable="yes">
  <h2>خطة الأسبوع</h2>
  <p>السبت: مراجعة. الأحد: كتابة.</p>
  <p>الكاتبة: منى علي</p>
</article>`, checks: [
              { say: R`[[<article>]] قيمته صح: [[contenteditable]] أو [[contenteditable="true"]]`, q: "article[contenteditable=\"\"], article[contenteditable=\"true\"]" },
              { say: R`مفيش [[contenteditable="yes"]]`, q: "[contenteditable=\"yes\"]", n: 0 },
              { say: R`سطر الكاتبة عليه [[contenteditable="false"]]`, q: "article p[contenteditable=\"false\"]", has: "الكاتبة" },
              { say: R`العنوان والفقرة الأولى من غير [[contenteditable="false"]]`, q: "article [contenteditable=\"false\"]", n: 1 },
            ] }, sol: R`~~~live 170 بعد التصليح
<article contenteditable>
  <h2>خطة الأسبوع</h2>
  <p>السبت: مراجعة. الأحد: كتابة.</p>
  <p contenteditable="false">الكاتبة: منى علي</p>
</article>
~~~

وده اللي كان قبل التصليح (جرّب تكتب: مفيش):

~~~live 150 قبل
<article contenteditable="yes">
  <h2>خطة الأسبوع</h2>
  <p>السبت: مراجعة. الأحد: كتابة.</p>
  <p>الكاتبة: منى علي</p>
</article>
~~~

**هتشوف إيه:**

- **قبل:** كلام عادي، الضغط عليه مبيعملش حاجة.
- **بعد:** العنوان والفقرة بيتكتب فيهم. سطر الكاتبة مبيتكتبش فيه.

**الغلطتين:**

1. [[yes]] مش من القيم. القيم [[true]] (أو فاضي) و [[plaintext-only]] و [[false]]. والقيمة الغلط بتتعامل كأن الـ attribute مش مكتوب.
2. بعد التصليح الكل ورث التعديل من [[<article>]]، فسطر الكاتبة محتاج [[contenteditable="false"]] صريحة.

**الغلطة الشائعة:** تخلّي سطر الكاتبة [[hidden]] أو [[inert]] «عشان ميتعدّلش». الأول بيخبّيه، والتاني بيمنع حتى نسخه. المطلوب إنه يبان ويتقري وميتغيّرش: [[contenteditable="false"]].

~~~text القياس من Chrome (isContentEditable)
قبل:   article = false ، وكل اللي جواه false
بعد:   article = true ، h2 = true ، الفقرة = true ، سطر الكاتبة = false
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** صندوق «نص الملاحظة» شغال، بس قارئ الشاشة مبيقولش عنه حاجة: لا إنه مكان كتابة ولا بتاع إيه. والنص المفروض يبقى نص بس. زوّد الناقص. (من قسم ٣ في الشرح: ملوش اسم ولا دور)`, done: R`الصندوق ليه دور واسم ومتعلّم إنه كذا سطر، وبيقبل نص بس، وكل الشروط ✓.`, work: { h: 130, start: R`<h2>ملاحظة جديدة</h2>
<div contenteditable>اكتب ملاحظتك هنا</div>`, checks: [
              { say: R`الصندوق [[contenteditable="plaintext-only"]]`, q: "div[contenteditable=\"plaintext-only\"]" },
              { say: R`عليه [[role="textbox"]]`, q: "div[contenteditable][role=\"textbox\"]" },
              { say: R`عليه [[aria-multiline="true"]]`, q: "div[contenteditable][aria-multiline=\"true\"]" },
              { say: R`ليه اسم: [[aria-label]] مش فاضي، أو [[aria-labelledby]]`, q: "div[contenteditable][aria-label]:not([aria-label=\"\"]), div[contenteditable][aria-labelledby]" },
            ] }, sol: R`~~~live 130 بعد
<h2>ملاحظة جديدة</h2>
<div contenteditable="plaintext-only" role="textbox" aria-multiline="true" aria-label="نص الملاحظة">اكتب ملاحظتك هنا</div>
~~~

**هتشوف إيه:** نفس الشكل، وبتكتب فيه زي الأول. الفرق في اللي قارئ الشاشة بيقوله (مش باين بالعين)، وفي إن Ctrl+B واللصق بتنسيق مبقوش شغالين.

**ليه كل واحدة:**

- [[role="textbox"]]: «ده مكان كتابة». من غيره [[<div>]] ملوش معنى.
- [[aria-multiline="true"]]: «كذا سطر»، يعني Enter بيعمل سطر مش إرسال.
- [[aria-label]]: الاسم. وكان ينفع [[aria-labelledby]] بيشاور على [[id]] العنوان.

**الغلطة الشائعة:** [[<label for="...">]] على الصندوق. الـ label بيتربط بعناصر الفورم بس، و [[<div>]] مش منهم.

**وأبسط من كل ده** لو مش محتاج الشكل الخاص: [[<textarea>]] بـ [[<label>]]. جاهز بدوره واسمه وبيتبعت مع الفورم.

~~~text القياس من Chrome (accessibility tree)
قبل:   role = generic ، name = ""
بعد:   role = textbox ، name = "نص الملاحظة" ، multiline = true
~~~

(النطق نفسه من MDN.)` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم على الموبايل فيه أربع خانات. اكتب على كل واحدة التلميحات المناسبة: **الاسم** (أول حرف في كل كلمة كبير)، و **كود الخصم** (كله حروف كبيرة، ومن غير تصحيح تلقائي ولا فحص إملائي)، و **البحث** (زرار Enter مكتوب عليه «بحث»)، و **الرسالة** (زرار Enter مكتوب عليه «إرسال»). (من قسم ٤ و ٥ في الشرح)`, done: R`كل خانة عليها تلميحاتها، وكل الشروط ✓.`, work: { h: 230, start: R`<form>
  <p><label for="name">الاسم</label> <input id="name" name="name"></p>
  <p><label for="code">كود الخصم</label> <input id="code" name="code"></p>
  <p><label for="q">بحث</label> <input id="q" name="q" type="search"></p>
  <p><label for="msg">رسالتك</label> <textarea id="msg" name="msg"></textarea></p>
</form>`, checks: [
              { say: R`الاسم: [[autocapitalize="words"]]`, q: "input[name=\"name\"][autocapitalize=\"words\"]" },
              { say: R`الكود: [[autocapitalize="characters"]]`, q: "input[name=\"code\"][autocapitalize=\"characters\"]" },
              { say: R`الكود: [[autocorrect="off"]] و [[spellcheck="false"]]`, q: "input[name=\"code\"][autocorrect=\"off\"][spellcheck=\"false\"]" },
              { say: R`البحث: [[enterkeyhint="search"]]`, q: "input[name=\"q\"][enterkeyhint=\"search\"]" },
              { say: R`الرسالة: [[enterkeyhint="send"]]`, q: "textarea[name=\"msg\"][enterkeyhint=\"send\"]" },
            ] }, sol: R`~~~live 185 الحل
<form>
  <p><label for="name">الاسم</label> <input id="name" name="name" autocapitalize="words"></p>
  <p><label for="code">كود الخصم</label> <input id="code" name="code" autocapitalize="characters" autocorrect="off" spellcheck="false"></p>
  <p><label for="q">بحث</label> <input id="q" name="q" type="search" enterkeyhint="search"></p>
  <p><label for="msg">رسالتك</label> <textarea id="msg" name="msg" enterkeyhint="send"></textarea></p>
</form>
~~~

**هتشوف إيه:** على الكمبيوتر الفورم شكله وتصرفه زي ما هو: التلميحات دي لكيبورد الشاشة. على موبايل (حسب MDN): في «الاسم» الكيبورد بيكبّر أول حرف في كل كلمة إنجليزي، وفي «كود الخصم» بيكتب كله كبير ومبيبدّلش الكود لكلمة، وزرار Enter بيبقى «بحث» في خانة البحث و «إرسال» في الرسالة.

**ليه كده:**

- الكود محتاج التلاتة: [[autocapitalize]] للحروف، و [[autocorrect="off"]] عشان الكيبورد ميغيّرش [[SAVE20]] لكلمة شبهها، و [[spellcheck="false"]] عشان ميحطش تحته خط أحمر.
- [[enterkeyhint]] بيغيّر الكلمة بس. الإرسال الفعلي بـ Enter لسه شغل الفورم (أو JavaScript في الرسالة).

**الغلطة الشائعة:** [[autocapitalize="on"]] على الاسم. [[on]] معناها أول الجملة بس، يعني «Mona ali».

~~~text القياس من Chrome (المتصفح قرا القيم)
name:  autocapitalize = words
code:  autocapitalize = characters ، autocorrect = false ، spellcheck = false
q:     enterKeyHint = search
msg:   enterKeyHint = send
~~~

(سلوك الكيبورد نفسه على الموبايل: من MDN، ومتجرّبش هنا.)` },
            { lvl: 'تطبيق', t: R`**ابني:** الفقرة دي هتتترجم بترجمة المتصفح لزوار بلغات تانية. فيها حاجتين لازم يفضلوا زي ما هم: اسم التطبيق «Nour Notes»، واختصار الكيبورد اللي جوه [[<kbd>]]. امنع ترجمتهم هم بس. (من قسم ٧ في الشرح)`, done: R`الاسم والاختصار عليهم [[translate="no"]] والفقرة نفسها بتتترجم عادي، وكل الشروط ✓.`, work: { h: 110, start: R`<p>افتح Nour Notes ودوس <kbd>Ctrl+S</kbd> عشان تحفظ الملاحظة.</p>`, checks: [
              { say: R`«Nour Notes» جوه [[<span translate="no">]]`, q: "p span[translate=\"no\"]", has: "Nour Notes" },
              { say: R`[[<kbd>]] عليه [[translate="no"]]`, q: "p kbd[translate=\"no\"]" },
              { say: R`الفقرة نفسها **مش** عليها [[translate]]`, q: "p[translate]", n: 0 },
            ] }, sol: R`~~~live 52 الحل
<p>افتح <span translate="no">Nour Notes</span> ودوس <kbd translate="no">Ctrl+S</kbd> عشان تحفظ الملاحظة.</p>
~~~

**هتشوف إيه:** الفقرة زي ما هي بالظبط. [[translate]] ملوش أي شكل، وتأثيره بيبان لما الصفحة تتترجم بس.

**ليه كده:**

- الاسم مكانش جوه عنصر، فاتلفّ بـ [[<span>]]: عنصر من غير معنى، موجود عشان تحط عليه attribute.
- [[<kbd>]] عنصر موجود فالـ attribute اتكتب عليه مباشرة.
- الفقرة من غير [[translate]]: باقي الجملة لازم تتترجم.

**الغلطة الشائعة:** [[translate="false"]]. القيم [[yes]] و [[no]] مش [[true]] و [[false]] (عكس [[spellcheck]] و [[contenteditable]]).

~~~text القياس من Chrome (الخاصية translate)
span و kbd:   false
p:            true
~~~

(إن أدوات الترجمة بتسيب العنصر: من MDN.)` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك عمل فورم «اكتب تعليقك» بـ [[<div contenteditable>]] جوه [[<form>]]، والتعليقات بتوصل السيرفر فاضية. اشرحله في ٣ سطور ليه، وإيه أبسط حل. (من قسم ٣ في الشرح)`, done: R`قلت السبب (مين بيتبعت مع الفورم) والحل.`, sol: R`إجابة نموذجية:

1. الفورم بيبعت **عناصر الفورم اللي ليها [[name]]** بس: [[<input>]] و [[<textarea>]] و [[<select>]] والأزرار. [[<div contenteditable>]] مش منهم: ملوش [[name]] ولا [[value]]، فالمتصفح مبيشوفوش وهو بيجمع البيانات.
2. أبسط حل: [[<textarea name="comment">]] بـ [[<label>]]. بيتبعت، وليه اسم لقارئ الشاشة، و [[required]] و [[maxlength]] شغالين عليه.
3. [[contenteditable]] يتساب لتعديل نص في مكانه، ومعاه JavaScript بياخد المحتوى ويبعته.

~~~text القياس من Chrome
فورم فيه <div contenteditable>جوه فورم</div> و <input name="a" value="1"> و <textarea name="t">:
اللي اتبعت:   a=1&t=
~~~` }
          ]
        }
,
        {
          cmd: "autofocus و accesskey و draggable",
          title: "باقي الـ global attributes: autofocus و accesskey و draggable و title و data-* وجدول بكل الـ attributes",
          pre: [{ to: "css/hidden و inert", why: R`[[hidden]] و [[inert]] و [[tabindex]] من نفس العيلة واتشرحوا هناك` }, { to: "css/abbr و dfn و time", why: R`[[title]] اتشرح هناك على [[<abbr>]]، وهنا ليه مينفعش تعتمد عليه في أي مكان تاني` }],
          ref: [
            { t: "MDN: Global attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes" },
            { t: "WHATWG: Global attributes", url: "https://html.spec.whatwg.org/multipage/dom.html#global-attributes" },
            { t: "MDN: autofocus", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus" },
            { t: "MDN: accesskey", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/accesskey" },
            { t: "MDN: draggable", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/draggable" },
            { t: "MDN: title", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/title" },
            { t: "MDN: data-*", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/data-*" },
            { t: "MDN: headingoffset", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingoffset" }
          ],
          desc: R`«Global attributes» هي الـ attributes اللي ينفع تتكتب على **أي عنصر** في الـ HTML: [[id]] و [[class]] و [[lang]] و [[hidden]] وغيرهم. عددهم حوالي تلاتين، واتشرح منهم كتير في الدروس اللي فاتت.
الدرس ده بيقفل الباقي: [[autofocus]] (الفوكس أول ما الصفحة تفتح)، و [[accesskey]] (اختصار كيبورد)، و [[draggable]] (عنصر بيتسحب)، و [[title]] (التلميح اللي بيطلع مع الماوس، وليه متعتمدش عليه)، و [[data-*]] (بيانات من عندك على العنصر). وفي آخره **جدول بكل الـ global attributes** وكل واحد اتشرح فين.`,
          example: R`<input name="q" type="search" autofocus>
<button type="button" accesskey="s">حفظ</button>
<li draggable="true" data-note-id="42" data-pinned>مشتريات الأسبوع</li>
<button type="button" title="امسح الملاحظة" aria-label="امسح الملاحظة">🗑</button>`,
          flag: "script",
          lines: [
            R`[[autofocus]]: أول ما الصفحة تفتح، المؤشر يبقى في خانة البحث دي من غير ما الزائر يدوس عليها.`,
            R`[[accesskey="s"]]: اختصار كيبورد للزرار. في Chrome على ويندوز Alt+S بيدوس عليه.`,
            R`[[draggable="true"]]: العنصر ده بيتسحب بالماوس. و [[data-note-id="42"]] و [[data-pinned]] بيانات من عندك متخزنة على العنصر: رقم الملاحظة، وإنها متثبتة. مبيبانوش للزائر، و JavaScript و CSS بيقروهم.`,
            R`زرار أيقونة. [[title]] بيطلّع تلميح لما الماوس يقف عليه، و [[aria-label]] هو الاسم اللي قارئ الشاشة بيقراه: [[title]] لوحده مش كفاية.`
          ],
          teach: R`## الفكرة في سطرين

كل دول attributes بتتكتب على أي عنصر. خمسة منهم ليهم شرح هنا، وتلاتة بييجوا في كورسات جاية، واتنين جداد لسه مش مدعومين، وفي الآخر الجدول الكامل.

القياسات من Chrome 157 على Windows 11.

---

## ١. [[<input autofocus>]]: الفوكس أول ما الصفحة تفتح

~~~html
<h1>بحث في الملاحظات</h1>
<input name="q" type="search" autofocus>
~~~

الزائر بيفتح الصفحة ويكتب على طول، من غير ما يدوس على الخانة.

~~~text القياس من Chrome
صفحة فيها تلات خانات والتانية عليها autofocus:       الفوكس على التانية بعد التحميل
خانتين عليهم autofocus:                              الفوكس على **الأولى** فيهم بترتيب الكود
جوه <dialog> اتفتح بـ showModal():                   الفوكس على العنصر اللي عليه autofocus جوه النافذة
~~~

- attribute من غير قيمة. و**واحد بس** في الصفحة (أو واحد جوه كل [[<dialog>]] و popover).
- global attribute: بيتكتب على أي عنصر بياخد فوكس (خانة، زرار، لينك، عنصر [[contenteditable]] أو عليه [[tabindex]]).
- جوه [[<dialog>]] هو اللي بيحدد الفوكس يبدأ منين لما النافذة تتفتح (درس «dialog و closedby»).
- المعاينة اللي جوه الدروس هنا مش هتوريك [[autofocus]] الصفحة: المتصفح بيمنعه جوه iframe من موقع تاني. جرّبه في ملف عندك.

**وليه تستخدمه بحساب (MDN):**

- قارئ الشاشة بيبدأ يقرا **من عند العنصر ده**، فالزائر بيفوته كل اللي فوقه: العنوان والشرح. ومن غير label واضح مش هيعرف هو فين.
- الصفحة بتنزل لحد العنصر لو مش باين، فالزائر يلاقي نفسه في نص الصفحة.
- على الموبايل الكيبورد بيفتح لوحده وياخد نص الشاشة.
- لو العنوان فيه [[#id]] (لينك لجزء من الصفحة)، المتصفح بيتجاهل [[autofocus]].

مناسب لـ: صفحة شغلتها الوحيدة حقل واحد (بحث، تسجيل دخول)، أو جوه [[<dialog>]]. مش مناسب لـ: فورم في آخر صفحة طويلة، أو خانة اشتراك في النشرة.

---

## ٢. [[<button accesskey="s">]]: اختصار كيبورد

[[accesskey]] بياخد حرف، والمتصفح بيخلّيه اختصار: بيدوس على الزرار أو اللينك، أو ينقل الفوكس للخانة.

المشكلة إن **المفاتيح اللي بتتداس مع الحرف بتختلف** من متصفح لمتصفح ومن نظام لنظام (الجدول من MDN):

| المتصفح والنظام | الاختصار |
|---|---|
| Chrome و Edge على Windows | Alt + الحرف |
| Firefox على Windows | Alt + Shift + الحرف |
| Chrome و Safari و Firefox على Mac | Control + Option + الحرف |

~~~text القياس من Chrome
<button accesskey="s">:    الخاصية accessKey = "s"
الضغطة نفسها (Alt+S):      مبتتبعتش من سكربت في Chrome headless ، فتشغيل الاختصار من MDN
~~~

**وليه MDN بينصح متستخدموش في المواقع العادية:**

- الاختصار ممكن يخبط في اختصار بتاع المتصفح أو النظام أو قارئ الشاشة (Alt+D في Chrome بيروح لشريط العنوان).
- الحرف ممكن ميكونش على كيبورد الزائر (كيبورد عربي أو ألماني).
- الزائر ميعرفش إن فيه اختصار أصلًا إلا لو كتبتهوله في الصفحة.

مكانه: تطبيق ويب الناس بتشتغل عليه كل يوم (بريد، محرر)، والاختصارات مكتوبة قدامهم، وغالبًا معمولة بـ JavaScript مش بـ [[accesskey]].

---

## ٣. [[<li draggable="true">]]: عنصر بيتسحب

~~~live 88 اسحب أي ملاحظة بالماوس
<ul>
  <li draggable="true">مشتريات الأسبوع</li>
  <li draggable="true">أفكار المشروع</li>
  <li>ملاحظة من غير draggable: بتتحدد كنص بس</li>
</ul>
~~~

**هتشوف إيه:** أول سطرين لما تمسكهم وتسحب، نسخة شفافة منهم بتمشي مع الماوس. التالت بيتحدد كنص. ولما تسيب الماوس: **مفيش حاجة بتحصل**، العنصر بيرجع مكانه.

~~~text القياس من Chrome (الخاصية draggable)
<img>:                          true     (الصور بتتسحب لوحدها)
<a href="...">:                 true     (واللينكات)
<a> من غير href ، <p> ، <div>:  false
<div draggable="true">:         true
<div draggable> (من غير قيمة):  false    (!)
<div draggable="yes">:          false
سحب عنصر draggable="true" بالماوس:   الحدث dragstart اتبعت
~~~

- القيم [[true]] و [[false]] **مكتوبين**. [[draggable]] لوحدها مبتشتغلش (زي [[contenteditable]]، مش زي [[hidden]]).
- [[draggable="false"]] بيمنع سحب صورة أو لينك (شعار الموقع مثلًا).
- الـ attribute بيخلّي العنصر **يتسحب** بس. المكان اللي هيتساب فيه، واللي يحصل ساعتها (إعادة الترتيب)، كله JavaScript: Drag and Drop API في كورس JavaScript.
- السحب بالماوس بس. اللي ماشي بالكيبورد أو باللمس محتاج طريقة تانية (أزرار «لفوق» و «لتحت»)، فمتخلّيش السحب الطريقة الوحيدة.

---

## ٤. [[<button title="...">]]: التلميح، وليه متعتمدش عليه

[[title]] بيحط كلام على العنصر، والمتصفح بيعرضه في مربع أصفر صغير لما **الماوس** يقف على العنصر ثانية.

~~~live 57 وقّف الماوس على كل واحد ثانية
<p><button type="button" title="امسح الملاحظة">🗑</button>
<abbr title="HyperText Markup Language">HTML</abbr>
<span title="السعر شامل الضريبة">١٠٠ جنيه</span></p>
~~~

**هتشوف إيه:** مع الماوس، كل واحد بيطلّع مربع فيه الكلام. جرّب توصل لنفس الكلام بـ Tab، أو على موبايل: مش هتلاقيه.

المشاكل (من MDN):

- **اللمس:** مفيش «وقوف بالماوس» على الموبايل. الكلام مبيظهرش.
- **الكيبورد:** الفوكس على العنصر مبيطلّعش التلميح.
- **قارئ الشاشة:** بعضهم بيقراه وبعضهم لأ، حسب الإعدادات.
- **التكبير:** التلميح صغير ومبيتكبّرش مع الصفحة، وبيختفي لوحده.

~~~text القياس من Chrome (accessibility tree)
<button title="امسح الملاحظة">🗑</button>:      name = "🗑" ، description = "امسح الملاحظة"
<button title="امسح الملاحظة">امسح</button>:    name = "امسح" ، description = "امسح الملاحظة"
<input title="اكتب اسمك"> من غير label:         name = "اكتب اسمك"
~~~

يعني زرار الأيقونة اسمه عند قارئ الشاشة «🗑»، و [[title]] وصف جانبي بس. **القاعدة: أي معلومة الزائر محتاجها متتحطش في [[title]] لوحده.**

| عايز | بدل [[title]] |
|---|---|
| اسم لزرار أيقونة | [[aria-label="امسح الملاحظة"]]، أو كلام مكتوب جنب الأيقونة |
| اسم لحقل | [[<label>]] |
| شرح مهم (شامل الضريبة) | كلام مكتوب في الصفحة |
| شرح إضافي بيتفتح | [[popover]] بزرار «؟» |

الأماكن اللي [[title]] ليه معنى رسمي فيها: [[<abbr title>]] (فك الاختصار، درس «abbr و dfn و time»)، و [[<iframe title>]] (اسم الإطار، وده إجباري)، و [[<link title>]]. وزيادة على [[aria-label]] على زرار أيقونة عشان بتوع الماوس يشوفوا تلميح: تمام.

---

## ٥. [[<li data-note-id="42">]]: بيانات من عندك

أي attribute اسمه بيبدأ بـ [[data-]] بتاعك انت: المتصفح مبيعملش بيه حاجة، ومبيبانش للزائر. بتخزّن فيه معلومة عن العنصر عشان JavaScript أو CSS يقروها.

~~~html
<li data-note-id="42" data-color="yellow" data-pinned>مشتريات الأسبوع</li>
~~~

~~~text القياس من Chrome
el.dataset:                                  {"noteId":"42","pinned":"","color":"yellow"}
عدد العناصر اللي بيمسكها [data-pinned]:      1
attribute مكتوب data-Color:                   اتسجّل data-color   (الـ HTML بيصغّر الحروف)
~~~

- الاسم: [[data-]] وبعدها حروف صغيرة وأرقام وشرطات: [[data-note-id]]. من غير مسافات ولا حروف كبيرة.
- القيمة دايمًا نص. ومن غير قيمة ([[data-pinned]]) معناها «موجود».
- في JavaScript بتتقري من [[dataset]] والشرطة بتتحول لحرف كبير: [[data-note-id]] بقت [[noteId]].
- في الـ CSS بتتمسك بـ attribute selector: القاعدة اللي بتبدأ بـ [[li[data-pinned] {]] بتلوّن الملاحظات المتثبتة بس.

إمتى: رقم العنصر في قاعدة البيانات، حالته (متثبت، مقري)، نوعه. حاجة الكود محتاجها وملهاش attribute رسمي.

وإمتى لأ:

- لو فيه عنصر أو attribute رسمي بنفس المعنى، استخدمه: التاريخ في [[<time datetime>]] مش [[data-date]]، والقيمة في [[<data value>]].
- محتوى الزائر لازم يشوفه: يتكتب في الصفحة. قارئ الشاشة ومحرك البحث مبيقروش [[data-*]].
- أسرار: كل اللي في الـ HTML بيتشاف في View Source.

---

## ٦. [[id]] و [[class]] و [[style]] في جدول

التلاتة اتقابلوا قبل كده. الفرق بينهم:

| الـ attribute | بيعمل إيه | كام مرة | بيتستخدم في |
|---|---|---|---|
| [[<h2 id="about">]] | اسم **فريد** للعنصر | مرة واحدة في الصفحة | لينك [[#about]]، و [[for]] و [[aria-labelledby]] و [[popovertarget]] و [[commandfor]] و [[form]] |
| [[<p class="note pinned">]] | اسم **مجموعة** (أو كذا اسم بينهم مسافة) | على أي عدد عناصر | الـ CSS والـ JavaScript بيمسكوا بيه كل عناصر المجموعة |
| [[<p style="color: red">]] | CSS مكتوب على العنصر نفسه | | تجربة سريعة، أو قيمة JavaScript بيحسبها. الباقي في ملف الـ CSS |

- [[id]] المكرر مبيطلّعش خطأ، بس اللينك و [[popovertarget]] وإخواتهم بيروحوا لأول واحد بس.
- [[style]] أقوى من أي حاجة في ملف الـ CSS تقريبًا، فصعب تتغيّر بعدين (درس «specificity»). التفاصيل في وحدات الـ CSS ودرس «(id, class, type)».

---

## ٧. تلاتة هتقابلهم في كورسات جاية

| الـ attribute | بيعمل إيه | بيتشرح فين |
|---|---|---|
| [[<button is="fancy-button">]] | بيقول إن العنصر ده نسخة «مخصوصة» من عنصر عادي، معرّفة بـ JavaScript (customized built-in element). Safari مش داعمه | كورس JavaScript: Web Components |
| [[<span slot="title">]] | بيحدد المحتوى ده يتحط في أنهي «خانة» ([[<slot>]]) جوه component | كورس JavaScript: Web Components و Shadow DOM |
| [[<script nonce="r4nd0m">]] | كلمة عشوائية السيرفر بيكتبها على الـ [[<script>]] أو [[<style>]] المسموح، وبيبعت نفس الكلمة في هيدر Content-Security-Policy. أي سكربت من غيرها المتصفح بيرفضه | كورس الأمان: Content Security Policy |

---

## ٨. جداد ولسه مش مدعومين: [[<section headingoffset="1">]] و [[<dialog headingreset>]]

> ميزة جديدة لسه مش في كل المتصفحات. يعني إيه «مش Baseline» و «ورا flag»، وإزاي تتأكد بنفسك قبل ما تستخدم أي ميزة: درس «Baseline و @supports».

اتنين اتضافوا للمواصفة قريب. الفكرة: component فيه [[<h1>]] بيتحط جوه صفحة فيها [[<h1>]]. بدل ما تغيّر العنوان لـ [[<h2>]] بإيدك، الأب بيقول «انزل بكل العناوين اللي جوايا مستوى»:

~~~html
<h1>دفتر نور</h1>
<section headingoffset="1">
  <h1>ملاحظة</h1>            <!-- المستوى المحسوب: 2 -->
  <article headingoffset="2">
    <h2>تفاصيل</h2>          <!-- 2 + 1 + 2 = 5 -->
  </article>
  <dialog headingreset>
    <h1>تأكيد</h1>           <!-- المفروض يرجع 1: headingreset بيوقف العدّ -->
  </dialog>
</section>
~~~

- [[headingoffset]]: رقم من 0 لـ 8 بيتزوّد على مستوى كل عنوان جوه العنصر. والمستوى ده هو اللي قارئ الشاشة بيقوله. اسم العنصر وشكله مبيتغيّروش.
- [[headingreset]]: من غير قيمة. بيقول «اللي جوايا يبدأ يعدّ من الأول»، لمحتوى برّه ترتيب الصفحة زي [[<dialog>]].

~~~text القياس من Chrome 157 (مستوى العنوان في accessibility tree)
عادي:                                        «ملاحظة» = 1 ، «تفاصيل» = 2      (الـ attributes متجاهلة)
بعد تشغيل Experimental Web Platform features: «ملاحظة» = 2 ، «تفاصيل» = 5
                                              و «تأكيد» طلع 2 مش 1 (التطبيق التجريبي لسه مش مطابق لشرح MDN)
~~~

**الدعم (جدول MDN، نوفمبر 2026):** Chrome من 151 **ورا flag تجريبي**، و Firefox ورا flag في النسخة التجريبية، و Safari 27.3. MDN معلّمهم «Experimental» ومش Baseline.

**يعني متستخدمهمش دلوقتي.** اكتب مستوى العنوان الصح بإيدك ([[<h2>]] جوه القسم)، زي درس «h1 لحد h6». المتصفح اللي مش داعم بيتجاهلهم، فلو كتبتهم لازم الصفحة تبقى مظبوطة من غيرهم أصلًا.

---

## ٩. جدول كل الـ global attributes

| الـ attribute | بيعمل إيه | اتشرح فين |
|---|---|---|
| [[<button accesskey="s">]] | اختصار كيبورد | هنا، قسم ٢ |
| [[<input autocapitalize="words">]] | الحروف الكبيرة في كيبورد الموبايل | «contenteditable و spellcheck» |
| [[<input autocorrect="off">]] | التصحيح التلقائي | «contenteditable و spellcheck» |
| [[<input autofocus>]] | الفوكس أول ما الصفحة أو النافذة تفتح | هنا، قسم ١ |
| [[<p class="note">]] | اسم مجموعة للـ CSS والـ JavaScript | هنا قسم ٦، و «(id, class, type)» |
| [[<div contenteditable>]] | العنصر بيتكتب فيه | «contenteditable و spellcheck» |
| [[<li data-note-id="42">]] | بيانات من عندك ([[data-*]]) | هنا، قسم ٥ |
| [[<p dir="rtl">]] | اتجاه الكتابة | «lang و dir» |
| [[<li draggable="true">]] | العنصر بيتسحب | هنا، قسم ٣ |
| [[<input enterkeyhint="search">]] | كلمة زرار Enter في الموبايل | «contenteditable و spellcheck» |
| [[<section headingoffset="1">]] | بينزّل مستوى العناوين اللي جواه (لسه مش مدعوم) | هنا، قسم ٨ |
| [[<dialog headingreset>]] | بيرجّع عدّ العناوين من الأول (لسه مش مدعوم) | هنا، قسم ٨ |
| [[<p hidden>]] | مش جزء من الصفحة دلوقتي | «hidden و inert» |
| [[<h2 id="about">]] | اسم فريد | هنا قسم ٦، و «(id, class, type)» |
| [[<main inert>]] | باين بس واقف | «hidden و inert» |
| [[<input inputmode="numeric">]] | شكل كيبورد الموبايل | «textarea و date و number» |
| [[<button is="fancy-button">]] | عنصر عادي مخصوص بـ JavaScript | هنا قسم ٧، وكورس JavaScript |
| [[<div itemscope>]] | بداية «حاجة» موصوفة لمحرك البحث | «itemscope و itemprop» |
| [[<div itemtype="https://schema.org/Product">]] | نوع الحاجة | «itemscope و itemprop» |
| [[<span itemprop="name">]] | خاصية من خصايصها | «itemscope و itemprop» |
| [[<div itemid="...">]] | رقم أو عنوان فريد للحاجة | «itemscope و itemprop» |
| [[<div itemref="more">]] | خصايص مكتوبة في حتة تانية من الصفحة | «itemscope و itemprop» |
| [[<p lang="en">]] | لغة المحتوى | «lang و dir» |
| [[<script nonce="r4nd0m">]] | تصريح لسكربت مع CSP | هنا قسم ٧، وكورس الأمان |
| [[<div popover>]] | بيطلع فوق الصفحة ويتقفل لوحده | «popover و popovertarget» |
| [[<span slot="title">]] | خانة جوه component | هنا قسم ٧، وكورس JavaScript |
| [[<textarea spellcheck="false">]] | الفحص الإملائي | «contenteditable و spellcheck» |
| [[<p style="color: red">]] | CSS على العنصر نفسه | هنا قسم ٦، و «specificity» |
| [[<div tabindex="0">]] | مكان العنصر في طريق Tab | «hidden و inert»، و «roving tabindex» |
| [[<abbr title="...">]] | تلميح مع الماوس | هنا قسم ٤، و «abbr و dfn و time» |
| [[<span translate="no">]] | متترجمش ده | «contenteditable و spellcheck» |
| [[<textarea writingsuggestions="false">]] | اقتراحات تكملة الكتابة | «contenteditable و spellcheck» |

وحاجتين مش global attributes رسميًا بس بيتكتبوا على أي عنصر: [[role]] و [[aria-*]] (معنى العنصر لقارئ الشاشة، في دروس الـ accessibility)، و [[onclick]] وإخواتها (سطر JavaScript على العنصر. استخدمناها في الوحدة دي عشان لسه مفيش JavaScript، وفي الشغل الحقيقي الأحداث بتتكتب في ملف الـ JavaScript).

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[autofocus]] على عنصرين | الأول بس بياخد الفوكس |
| [[autofocus]] على خانة في آخر صفحة طويلة | الصفحة بتفتح على آخرها، وقارئ الشاشة بيبدأ من هناك |
| [[accesskey]] بحرف المتصفح مستخدمه | اختصار المتصفح أو اختصارك، واحد فيهم بيبوظ |
| [[draggable]] من غير قيمة | العنصر مبيتسحبش |
| السحب هو الطريقة الوحيدة لإعادة الترتيب | الكيبورد واللمس برّه |
| اسم زرار الأيقونة في [[title]] بس | قارئ الشاشة بيقول «🗑»، والموبايل مبيشوفش حاجة |
| معلومة مهمة في [[title]] | اللي بيشوفها بتوع الماوس اللي استنوا ثانية بس |
| محتوى في [[data-*]] | مبيبانش ومبيتقريش |
| [[data-noteId]] | بيتسجل [[data-noteid]]، وفي [[dataset]] بيبقى [[noteid]] مش [[noteId]] |
| [[id]] مكرر | اللينكات والربط بيروحوا لأول واحد |

---

## الخلاصة

- [[autofocus]]: واحد في الصفحة، ولصفحة شغلتها حقل واحد أو جوه dialog.
- [[accesskey]]: اختصار بيختلف من متصفح لمتصفح. ابعد عنه في المواقع العادية.
- [[draggable="true"]]: بيتسحب، والباقي JavaScript، ولازم بديل بالكيبورد.
- [[title]]: تلميح للماوس بس. مفيش معلومة تعتمد عليه.
- [[data-*]]: بيانات للكود، مش محتوى للزائر.
- أي global attribute: دوّر عليه في جدول قسم ٩.`,
          try: R`اعمل ملف [[search.html]] فيه عنوان، وخانة بحث عليها [[autofocus]]، وتحتها قايمة من تلات ملاحظات كل واحدة [[draggable="true"]] وعليها [[data-note-id]] برقمها. افتحه في Chrome: اكتب على طول من غير ما تدوس على الخانة، واسحب ملاحظة، وافتح DevTools (F12) وفي تاب Console اكتب [[document.querySelector('li').dataset]] ودوس Enter.`,
          sol: R`~~~html search.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث في الملاحظات</title>
</head>
<body>
<h1>بحث في الملاحظات</h1>
<p><label for="q">دوّر</label> <input id="q" name="q" type="search" autofocus></p>
<ul>
  <li draggable="true" data-note-id="12">مشتريات الأسبوع</li>
  <li draggable="true" data-note-id="15">أفكار المشروع</li>
  <li draggable="true" data-note-id="21">كتب عايز أقراها</li>
</ul>
</body>
</html>
~~~

~~~view 200 شكل الصفحة (في ملفك المؤشر هيبقى في الخانة من الأول)
<h1>بحث في الملاحظات</h1>
<p><label for="q">دوّر</label> <input id="q" name="q" type="search"></p>
<ul>
  <li draggable="true" data-note-id="12">مشتريات الأسبوع</li>
  <li draggable="true" data-note-id="15">أفكار المشروع</li>
  <li draggable="true" data-note-id="21">كتب عايز أقراها</li>
</ul>
~~~

**هتشوف إيه:**

- أول ما الصفحة تفتح، المؤشر بينوّر جوه خانة البحث، واللي بتكتبه بيتكتب فيها.
- لما تسحب ملاحظة، نسخة شفافة منها بتمشي مع الماوس، ولما تسيب بترجع.
- في الـ Console: [[DOMStringMap {noteId: '12'}]].

(السطر اللي بيتكتب في الـ Console JavaScript: «هات أول [[<li>]] في الصفحة واعرضلي بياناته». هتفهمه في كورس JavaScript.)

~~~text القياس من Chrome
بعد التحميل:                 الفوكس على الخانة اللي عليها autofocus
li.draggable:                true ، وسحبه بعت dragstart
li.dataset:                  {"noteId":"12"}
~~~`,
          deep: {
            why: R`فيه احتياجات بتتكرر على كل أنواع العناصر: اسم، مجموعة، لغة، إخفاء، فوكس، بيانات للكود. بدل ما كل عنصر يعرّف نسخته، المواصفة حطتهم في قايمة واحدة بتشتغل على الكل. والقايمة دي بتكبر: [[popover]] و [[inert]] و [[enterkeyhint]] و [[writingsuggestions]] كلهم جداد نسبيًا، و [[headingoffset]] لسه داخل. فاللي يعرف القايمة يعرف إيه اللي المتصفح بيعمله ببلاش قبل ما يكتب JavaScript.`,
            how: R`[[autofocus]]: المتصفح وهو بيحلل الصفحة بيحط كل عنصر عليه [[autofocus]] في قايمة انتظار، وبعد ما الصفحة تجهز بياخد أول واحد لسه موجود وينفع ياخد فوكس وينقل له الفوكس، إلا لو الزائر سبق وداس على حاجة أو العنوان فيه [[#id]]. [[draggable="true"]] بيخلّي ضغطة وسحبة بالماوس تبدأ «drag»: المتصفح بياخد صورة للعنصر ويبعت حدث [[dragstart]]، ولو مفيش كود قال «المكان ده بيقبل»، بيلغي السحب. [[title]] بيتحط في الـ accessibility tree كـ description (أو كاسم لو مفيش اسم تاني خالص)، وبيتعرض كـ tooltip من نظام التشغيل. و [[data-*]] المتصفح بيخزنه زي أي attribute وبيعرضه في [[dataset]] بعد ما يحوّل [[a-b]] لـ [[aB]].`,
            when: R`[[autofocus]]: بحث، تسجيل دخول، وأول حقل أو زرار «إلغاء» في dialog. [[draggable]]: قايمة بتترتب، كروت بتتنقل بين أعمدة، ملف بيتسحب، ودايمًا مع بديل. [[data-*]]: معرّف العنصر، حالته، إعداد لـ JavaScript. [[title]]: [[<abbr>]] و [[<iframe>]]، وتلميح زيادة فوق اسم موجود. [[accesskey]]: تطبيق شغل داخلي الناس متدربة عليه.`,
            mistakes: R`[[autofocus]] في كل فورم «عشان أسهّل». [[title]] كبديل لـ label أو لـ [[aria-label]]. [[title]] بنفس كلام الزرار («حفظ» وتلميحه «حفظ»): تكرار قارئ الشاشة بيقراه مرتين. [[data-*]] بدل عنصر رسمي ([[<time>]] و [[<data>]])، أو لتخزين محتوى. [[draggable]] من غير [[="true"]]. ورقم سري أو token في [[data-*]].`
          },
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** صفحة «بحث في الملاحظات» المفروض تفتح والمؤشر في خانة البحث. اللي حاصل: الفوكس بيروح لخانة «إيميلك» بتاعة النشرة اللي في آخر الصفحة، والصفحة بتنزل عندها. صلّحها. (من قسم ١ في الشرح)`, done: R`[[autofocus]] واحد بس في الصفحة وهو على خانة البحث، وكل الشروط ✓.`, work: { h: 220, start: R`<h1>بحث في الملاحظات</h1>
<p><label for="q">دوّر</label> <input id="q" name="q" type="search"></p>
<p>نتايج البحث هتظهر هنا.</p>
<footer>
  <p><label for="mail">اشترك في النشرة: إيميلك</label>
  <input id="mail" name="mail" type="email" autofocus></p>
</footer>`, checks: [
              { say: R`خانة البحث عليها [[autofocus]]`, q: "input[type=\"search\"][autofocus]" },
              { say: R`خانة الإيميل مبقاش عليها [[autofocus]]`, q: "input[type=\"email\"][autofocus]", n: 0 },
              { say: R`[[autofocus]] واحد بس في الصفحة`, q: "[autofocus]", n: 1 },
            ] }, sol: R`~~~live 220 بعد التصليح
<h1>بحث في الملاحظات</h1>
<p><label for="q">دوّر</label> <input id="q" name="q" type="search" autofocus></p>
<p>نتايج البحث هتظهر هنا.</p>
<footer>
  <p><label for="mail">اشترك في النشرة: إيميلك</label>
  <input id="mail" name="mail" type="email"></p>
</footer>
~~~

**هتشوف إيه (في ملف عندك، لأن المعاينة هنا مبتشغّلش [[autofocus]] الصفحة):**

- **قبل:** المؤشر في خانة الإيميل اللي تحت. في صفحة طويلة كان الزائر هيلاقي نفسه في الـ footer.
- **بعد:** المؤشر في خانة البحث، والزائر بيكتب على طول.

**ليه:** [[autofocus]] للحاجة اللي الزائر جاي الصفحة عشانها. النشرة مش هي.

**الغلطة الشائعة:** تزوّد [[autofocus]] على البحث وتسيب بتاع الإيميل. بيشتغل بالصدفة (الأول في الكود بيكسب)، بس أول ما حد يغيّر الترتيب المشكلة ترجع.

~~~text القياس من Chrome
عنصرين عليهم autofocus:    الفوكس على الأول بترتيب الكود
بعد التصليح:               الفوكس على خانة البحث
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** دي تلات ملاحظات جاية من قاعدة البيانات. اكتب بيانات كل واحدة على الـ [[<li>]] بتاعها بـ [[data-*]]: الرقم في [[data-note-id]]، واللون في [[data-color]]، والمتثبتة عليها [[data-pinned]] من غير قيمة. (من قسم ٥ في الشرح)`, done: R`كل [[<li>]] عليه رقمه ولونه، وواحدة بس عليها [[data-pinned]]، وكل الشروط ✓.`, work: { h: 170, start: R`<!--
id   العنوان             اللون     متثبتة
12   مشتريات الأسبوع     yellow    أيوه
15   أفكار المشروع       green     لأ
21   كتب عايز أقراها     yellow    لأ
-->
<ul>
  <li>مشتريات الأسبوع</li>
  <li>أفكار المشروع</li>
  <li>كتب عايز أقراها</li>
</ul>`, checks: [
              { say: R`«مشتريات الأسبوع»: [[data-note-id="12"]] و [[data-color="yellow"]]`, q: "li[data-note-id=\"12\"][data-color=\"yellow\"]", has: "مشتريات" },
              { say: R`«أفكار المشروع»: [[data-note-id="15"]] و [[data-color="green"]]`, q: "li[data-note-id=\"15\"][data-color=\"green\"]", has: "أفكار" },
              { say: R`«كتب عايز أقراها»: [[data-note-id="21"]] و [[data-color="yellow"]]`, q: "li[data-note-id=\"21\"][data-color=\"yellow\"]", has: "كتب" },
              { say: R`واحدة بس عليها [[data-pinned]]، وهي «مشتريات الأسبوع»`, q: "li[data-pinned]", n: 1, has: "مشتريات" },
              { say: R`الأرقام مش في [[id]]: دي بيانات للكود، مش اسم للعنصر`, q: "li[id]", n: 0 },
            ] }, sol: R`~~~live 88 الحل
<ul>
  <li data-note-id="12" data-color="yellow" data-pinned>مشتريات الأسبوع</li>
  <li data-note-id="15" data-color="green">أفكار المشروع</li>
  <li data-note-id="21" data-color="yellow">كتب عايز أقراها</li>
</ul>
~~~

**هتشوف إيه:** القايمة زي ما هي بالظبط: تلات سطور. [[data-*]] مبيغيّرش أي حاجة في الشكل. البيانات بقت على العناصر، وتتشاف في DevTools.

**ليه كده:**

- كل عمود في الجدول بقى attribute. اللي «لأ» في عمود «متثبتة» **مفيهوش الـ attribute خالص**، مش [[data-pinned="false"]]: كده القاعدة اللي بتبدأ بـ [[li[data-pinned] {]] في الـ CSS تمسك المتثبتة بس.
- العنوان فضل كلام جوه الـ [[<li>]]: ده محتوى الزائر بيقراه، مش بيانات للكود.

**الغلطة الشائعة:** [[data-pinned="no"]] على غير المتثبتين. أي selector بيسأل «عليه [[data-pinned]]؟» هيمسكهم كلهم.

~~~text القياس من Chrome
أول li:    dataset = {"noteId":"12","color":"yellow","pinned":""}
عدد العناصر اللي بيمسكها [data-pinned]:   1
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في الكارت ده حاجتين الزائر على الموبايل وقارئ الشاشة مش واصلينلهم: اسم زرار الأيقونة، وإن السعر شامل الضريبة. الاتنين محطوطين في [[title]] بس. طلّعهم. (من قسم ٤ في الشرح: جدول «بدل title»)`, done: R`الزرار ليه [[aria-label]]، و «شامل الضريبة» مكتوبة في الصفحة، وكل الشروط ✓.`, work: { h: 130, start: R`<p>اشتراك سنوي: <span title="السعر شامل الضريبة">٦٠٠ جنيه</span></p>
<p><button type="button" title="امسح الاشتراك">🗑</button></p>`, checks: [
              { say: R`الزرار عليه [[aria-label="امسح الاشتراك"]]`, q: "button[aria-label=\"امسح الاشتراك\"]" },
              { say: R`«شامل الضريبة» مكتوبة ككلام في الفقرة`, q: "p", has: "شامل الضريبة" },
              { say: R`مفيش [[<span title>]]`, q: "span[title]", n: 0 },
            ] }, sol: R`~~~live 110 بعد التصليح
<p>اشتراك سنوي: ٦٠٠ جنيه <small>(شامل الضريبة)</small></p>
<p><button type="button" aria-label="امسح الاشتراك" title="امسح الاشتراك">🗑</button></p>
~~~

وده اللي كان قبل التصليح:

~~~live 110 قبل
<p>اشتراك سنوي: <span title="السعر شامل الضريبة">٦٠٠ جنيه</span></p>
<p><button type="button" title="امسح الاشتراك">🗑</button></p>
~~~

**هتشوف إيه:**

- **قبل:** «٦٠٠ جنيه» وزرار سلة. موضوع الضريبة مش باين إلا لو وقفت بالماوس على السعر ثانية.
- **بعد:** «(شامل الضريبة)» مكتوبة جنب السعر بخط أصغر. والزرار شكله زي ما هو.

**ليه كده:**

- معلومة عن السعر محتوى، والمحتوى يتكتب. [[<small>]] للملاحظة الجانبية (درس «mark و small و del و ins»).
- [[aria-label]] بيدّي الزرار اسم حقيقي. و [[title]] فضل معاه عشان بتوع الماوس يشوفوا تلميح: زيادة مش أساس.

**الغلطة الشائعة:** تسيب [[title]] وتقول «قارئ الشاشة بيقراه». اللي اتقاس إن اسم الزرار «🗑» والـ [[title]] وصف جانبي، وقراءته بتتوقف على الإعدادات.

~~~text القياس من Chrome (accessibility tree)
قبل:   الزرار name = "🗑" ، description = "امسح الاشتراك"
بعد:   الزرار name = "امسح الاشتراك"
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الملاحظات التلاتة المفروض تتسحب عشان تترتب، بس اللي كتب الكود كتب [[draggable]] من غير قيمة فمفيش واحدة بتتسحب. والشعار اللي فوق بيتسحب (الصور بتتسحب لوحدها) وده مش مطلوب. صلّح الاتنين. (من قسم ٣ في الشرح)`, done: R`التلات ملاحظات بيتسحبوا والشعار لأ، وكل الشروط ✓.`, work: { h: 200, start: R`<p><img alt="شعار دفتر نور" width="40" height="40" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='gold'/></svg>"></p>
<ul>
  <li draggable>مشتريات الأسبوع</li>
  <li draggable>أفكار المشروع</li>
  <li draggable>كتب عايز أقراها</li>
</ul>`, checks: [
              { say: R`التلات ملاحظات [[draggable="true"]]`, q: "li[draggable=\"true\"]", n: 3 },
              { say: R`الشعار [[draggable="false"]]`, q: "img[draggable=\"false\"]" },
              { say: R`الشعار لسه ليه [[alt]]`, q: "img[alt]:not([alt=\"\"])" },
            ] }, sol: R`~~~live 148 بعد التصليح (اسحب الملاحظات، وجرّب تسحب المربع الأصفر)
<p><img draggable="false" alt="شعار دفتر نور" width="40" height="40" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='gold'/></svg>"></p>
<ul>
  <li draggable="true">مشتريات الأسبوع</li>
  <li draggable="true">أفكار المشروع</li>
  <li draggable="true">كتب عايز أقراها</li>
</ul>
~~~

**هتشوف إيه:**

- **قبل:** سحب أي ملاحظة بيحدد الكلام بس، والمربع الأصفر (الشعار) بيطلع منه نسخة شفافة مع الماوس.
- **بعد:** كل ملاحظة بتطلع منها نسخة مع الماوس، والشعار ثابت.

**ليه:** [[draggable]] قيمه [[true]] و [[false]] مكتوبين. من غير قيمة المتصفح بيرجع للافتراضي بتاع العنصر: [[<li>]] لأ، و [[<img>]] أيوه.

**الغلطة الشائعة:** تفتكر إن الترتيب اشتغل. العنصر بيتسحب بس، ولما تسيبه بيرجع: إعادة الترتيب نفسها JavaScript. ولازم معاها أزرار للكيبورد واللمس.

~~~text القياس من Chrome (الخاصية draggable)
<li draggable>:            false
<li draggable="true">:     true
<img>:                     true
<img draggable="false">:   false
~~~` },
            { lvl: 'تحدي', t: R`**ابني (مراجعة الوحدة من الجدول):** الكارت ده محتاج خمس attributes من جدول قسم ٩، واحد لكل طلب: (١) جملة «نسخة تجريبية» متبانش دلوقتي. (٢) الاسم «Nour Notes» إنجليزي جوه صفحة عربي، وميتترجمش. (٣) الكارت كله متخزن عليه رقم الخطة [[7]] في [[data-plan-id]]. (٤) خانة الكود من غير فحص إملائي. (٥) زرار «اشترك» واقف هو والخانة لحد ما الدفع يتفعّل: وقّف الفورم كله بـ attribute واحد. (من قسم ٩ في الشرح: الجدول)`, done: R`كل طلب ليه الـ attribute بتاعه، وكل الشروط ✓.`, work: { h: 230, start: R`<article>
  <h2>خطة Nour Notes السنوية</h2>
  <p>نسخة تجريبية</p>
  <form>
    <p><label for="code">كود الخصم</label> <input id="code" name="code"></p>
    <button type="submit">اشترك</button>
  </form>
</article>`, checks: [
              { say: R`«نسخة تجريبية» عليها [[hidden]]`, q: "p[hidden]", has: "نسخة تجريبية" },
              { say: R`«Nour Notes» جوه [[<span lang="en" translate="no">]]`, q: "h2 span[lang=\"en\"][translate=\"no\"]", has: "Nour Notes" },
              { say: R`الكارت عليه [[data-plan-id="7"]]`, q: "article[data-plan-id=\"7\"]" },
              { say: R`خانة الكود [[spellcheck="false"]]`, q: "input[name=\"code\"][spellcheck=\"false\"]" },
              { say: R`الفورم عليه [[inert]]`, q: "form[inert]" },
            ] }, sol: R`~~~live 143 الحل
<article data-plan-id="7">
  <h2>خطة <span lang="en" translate="no">Nour Notes</span> السنوية</h2>
  <p hidden>نسخة تجريبية</p>
  <form inert>
    <p><label for="code">كود الخصم</label> <input id="code" name="code" spellcheck="false"></p>
    <button type="submit">اشترك</button>
  </form>
</article>
~~~

**هتشوف إيه:**

- «نسخة تجريبية» اختفت.
- العنوان زي ما هو.
- الخانة والزرار باينين بس مبيردوش: لا كتابة ولا ضغط ولا Tab.

**ليه كل واحد:**

| الطلب | الـ attribute | ليه ده |
|---|---|---|
| متبانش دلوقتي | [[hidden]] | مش وقتها، ومش موجودة لأي حد |
| اسم بلغة تانية وميتترجمش | [[lang="en"]] و [[translate="no"]] | الأول للنطق الصح، والتاني للترجمة. اتنين لأن كل واحد بيقول حاجة |
| رقم للكود | [[data-plan-id]] | بيانات مش محتوى |
| من غير خط أحمر | [[spellcheck="false"]] | الكود مش كلام لغة |
| يقف كله | [[inert]] على الفورم | مرة واحدة بدل [[disabled]] على كل عنصر |

**الغلطة الشائعة:** [[inert]] من غير ما تبيّن ده في الشكل. في مشروع حقيقي زوّد سطر CSS يبهّت الفورم، وجملة تقول ليه واقف.

~~~text القياس من Chrome
<p hidden>:                 display = none
الخانة جوه <form inert>:    Tab عدّاها ، والكليك ماوصلش
span.translate:             false
article.dataset:            {"planId":"7"}
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** المدير طلب «نحط اختصارات كيبورد للموقع: Alt+S للبحث و Alt+H للرئيسية» وعايزها بـ [[accesskey]]. اكتبله في ٣ سطور ليه دي مش فكرة كويسة لموقع عام، وإيه البديل. (من قسم ٢ في الشرح)`, done: R`ذكرت مشكلتين على الأقل من التلاتة (التعارض، اختلاف المتصفحات، محدش يعرف) وبديل.`, sol: R`إجابة نموذجية:

1. **مش هتشتغل زي ما هو متخيل.** [[accesskey="s"]] في Chrome على ويندوز Alt+S، وفي Firefox Alt+Shift+S، وعلى الماك Control+Option+S. مفيش «Alt+S» واحدة لكل الزوار.
2. **بتخبط في اختصارات موجودة.** المتصفح وقارئ الشاشة ليهم اختصارات بـ Alt، وكيبورد الزائر ممكن ميبقاش عليه الحرف أصلًا. والزائر مش هيعرف إن فيه اختصار إلا لو كتبناه في الصفحة.
3. **البديل:** الزائر اللي ماشي بالكيبورد محتاج ترتيب Tab سليم، ولينك «تخطى للمحتوى»، وعناوين صح. ولو فعلًا عايزين اختصارات (تطبيق بيتفتح كل يوم): تتعمل بـ JavaScript، وتتكتب في صفحة مساعدة، وتتقفل من الإعدادات.

~~~text من MDN (جدول accesskey)
Chrome على Windows:     Alt + الحرف
Firefox على Windows:    Alt + Shift + الحرف
Mac:                    Control + Option + الحرف
~~~` }
          ]
        }
,
        {
          cmd: "itemscope و itemprop",
          title: "بيانات محرك البحث بيقراها من الصفحة نفسها: microdata بـ itemscope و itemtype و itemprop و itemid و itemref",
          pre: [{ to: "css/abbr و dfn و time", why: R`[[<time datetime>]] و [[<data value>]]: القيمة اللي للماكينة غير الكلام اللي للزائر. نفس الفكرة هنا` }, { to: "css/meta و Open Graph", why: R`البيانات اللي في [[<head>]] لجوجل ولكارت المشاركة. هنا البيانات على المحتوى نفسه` }],
          ref: [
            { t: "WHATWG: Microdata", url: "https://html.spec.whatwg.org/multipage/microdata.html" },
            { t: "WHATWG: Microdata values (القيمة بتتاخد منين)", url: "https://html.spec.whatwg.org/multipage/microdata.html#values" },
            { t: "MDN: Microdata", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microdata" },
            { t: "MDN: itemscope", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemscope" },
            { t: "MDN: itemprop", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/itemprop" }
          ],
          desc: R`الزائر بيقرا «نوتة نور، ٨٥ جنيه، متاحة» ويفهم إن ده منتج وده سعره. محرك البحث شايف تلات حتت نص. **microdata** خمس attributes بتتكتب على نفس العناصر اللي الزائر شايفها، وبتقول للماكينة: ده منتج، وده اسمه، وده سعره بالرقم والعملة.
مبتغيّرش أي حاجة في شكل الصفحة، والمتصفح نفسه مبيعملش بيها حاجة: اللي بيقراها محركات البحث وأدوات تانية.`,
          example: R`<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">نوتة نور A5</h2>
  <p itemprop="description">نوتة 120 صفحة بغلاف قماش.</p>
  <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <data itemprop="price" value="85.00">٨٥ جنيه</data>
    <meta itemprop="priceCurrency" content="EGP">
    <link itemprop="availability" href="https://schema.org/InStock">متاحة
  </p>
</article>`,
          flag: "script",
          lines: [
            R`[[itemscope]]: «العنصر ده بيوصف حاجة واحدة». و [[itemtype]] بيقول نوعها بعنوان من قاموس schema.org: [[Product]] يعني منتج.`,
            R`[[itemprop="name"]]: خاصية من خصايص المنتج اسمها [[name]]، وقيمتها الكلام اللي جوه العنصر.`,
            R`خاصية تانية: الوصف. نفس الطريقة.`,
            R`خاصية [[offers]] (العرض)، وقيمتها مش نص: [[itemscope]] على نفس العنصر بيخلّيها «حاجة» جوه الحاجة، ونوعها [[Offer]].`,
            R`السعر. الزائر شايف «٨٥ جنيه»، والماكينة بتاخد [[85.00]] من [[value]] على [[<data>]].`,
            R`العملة. [[<meta>]] مبيبانش في الصفحة، وقيمته في [[content]]. بيتستخدم لمعلومة الماكينة محتاجاها والزائر مش محتاج يشوفها مكتوبة.`,
            R`الحالة: متاحة. [[<link>]] مبيبانش برضه، وقيمته العنوان اللي في [[href]]. وكلمة «متاحة» بعده للزائر.`,
            R`[[</p>]] بيقفل العرض: السعر والعملة والحالة اللي فوق تبعه هو، مش تبع المنتج مباشرة.`,
            R`[[</article>]] بيقفل المنتج. أي [[itemprop]] بعده مش هيتحسب من خصايصه.`
          ],
          teach: R`## الفكرة في سطرين

microdata بتقسم الصفحة لـ **حاجات** (items) وكل حاجة ليها **خصايص** (properties): اسم وقيمة. [[itemscope]] بيبدأ حاجة، و [[itemtype]] نوعها، و [[itemprop]] خاصية فيها.

الـ HTML في الدرس اتحمّل في Chrome 157، واللي «الماكينة بتقراه» طالع من تطبيق خوارزمية المواصفة (WHATWG: microdata to JSON) على الصفحة. اللي جوجل بيعمله بالبيانات دي بعد كده: من الوثائق.

---

## ١. الشكل مبيتغيّرش

~~~live 170 كارت منتج عليه microdata
<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">نوتة نور A5</h2>
  <p itemprop="description">نوتة 120 صفحة بغلاف قماش.</p>
  <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <data itemprop="price" value="85.00">٨٥ جنيه</data>
    <meta itemprop="priceCurrency" content="EGP">
    <link itemprop="availability" href="https://schema.org/InStock">متاحة
  </p>
</article>
~~~

**هتشوف إيه:** عنوان، ووصف، وسطر «٨٥ جنيه متاحة». كارت عادي. الـ [[<meta>]] والـ [[<link>]] مش باينين، ومفيش attribute من الخمسة غيّر حاجة في الشكل.

واللي الماكينة بتطلّعه من نفس الكود:

~~~text القياس (خوارزمية المواصفة على الصفحة في Chrome)
حاجة نوعها https://schema.org/Product
  name         = "نوتة نور A5"
  description  = "نوتة 120 صفحة بغلاف قماش."
  offers       = حاجة نوعها https://schema.org/Offer
                   price          = "85.00"
                   priceCurrency  = "EGP"
                   availability   = "https://schema.org/InStock"
~~~

---

## ٢. [[<article itemscope>]]: بداية «حاجة»

[[itemscope]] من غير قيمة. معناه: كل [[itemprop]] جوه العنصر ده بيوصف **حاجة واحدة**.

~~~text القياس
<article itemtype="https://schema.org/Product"> من غير itemscope ، وجواه itemprop="name":
عدد الحاجات اللي طلعت = 0
~~~

من غير [[itemscope]] مفيش حاجة: [[itemtype]] و [[itemprop]] لوحدهم ملهمش معنى.

بيتكتب على العنصر اللي **حاوي** كل معلومات الحاجة: [[<article>]] بتاع المنتج، [[<li>]] بتاع النتيجة، [[<section>]] بتاع «عن الكاتبة».

---

## ٣. [[<article itemtype="https://schema.org/Product">]]: نوعها

[[itemtype]] عنوان بيقول الحاجة دي إيه. العنوان من **قاموس** (vocabulary) متفق عليه، عشان كل المواقع تسمّي الخصايص بنفس الأسامي. القاموس اللي محركات البحث بتفهمه هو **schema.org** (MDN: جوجل ومايكروسوفت وغيرهم):

| النوع | [[itemtype]] | أشهر خصايصه |
|---|---|---|
| منتج | [[https://schema.org/Product]] | [[name]] و [[description]] و [[image]] و [[brand]] و [[offers]] |
| عرض (سعر) | [[https://schema.org/Offer]] | [[price]] و [[priceCurrency]] و [[availability]] |
| شخص | [[https://schema.org/Person]] | [[name]] و [[jobTitle]] و [[email]] و [[url]] |
| مقال | [[https://schema.org/Article]] | [[headline]] و [[author]] و [[datePublished]] |
| كتاب | [[https://schema.org/Book]] | [[name]] و [[author]] و [[numberOfPages]] |
| مناسبة | [[https://schema.org/Event]] | [[name]] و [[startDate]] و [[location]] |
| شركة أو جهة | [[https://schema.org/Organization]] | [[name]] و [[url]] و [[logo]] |

- العنوان مش لينك المتصفح بيفتحه. هو **اسم** متفق عليه، ولازم يتكتب بالحرف: [[Product]] بـ P كبيرة.
- أسامي الخصايص ([[name]] و [[price]]...) جاية من صفحة النوع في schema.org. متخترعش أسامي: الماكينة مش هتفهمها.
- [[itemtype]] مبيتكتبش غير على عنصر عليه [[itemscope]].

---

## ٤. [[<h2 itemprop="name">]]: خاصية

[[itemprop]] بيتكتب على عنصر **جوه** الـ [[itemscope]]، واسمه اسم الخاصية. والقيمة بتتاخد من العنصر، ومكانها بيختلف حسب العنصر:

| العنصر | القيمة بتتاخد من | مثال |
|---|---|---|
| [[<meta>]] | [[content]] | [[<meta itemprop="priceCurrency" content="EGP">]] |
| [[<a>]] و [[<link>]] و [[<area>]] | [[href]] (العنوان الكامل) | [[<a itemprop="url" href="/p/1">]] |
| [[<img>]] و [[<video>]] و [[<audio>]] و [[<iframe>]] و [[<source>]] | [[src]] | [[<img itemprop="image" src="...">]] |
| [[<data>]] و [[<meter>]] | [[value]] | [[<data itemprop="price" value="85.00">]] |
| [[<time>]] | [[datetime]]، ولو مش مكتوب فالكلام اللي جواه | [[<time itemprop="datePublished" datetime="2025-03-10">]] |
| عنصر عليه [[itemscope]] كمان | حاجة جديدة (القسم ٥) | |
| أي عنصر تاني | الكلام اللي جواه | [[<h2 itemprop="name">]] |

~~~text القياس (كل عنصر وقيمته)
<span itemprop="name">اسم</span>                        name   = "اسم"
<img itemprop="image" src="https://example.test/a.png">  image  = "https://example.test/a.png"
<a itemprop="url" href="/p/1">لينك</a>                   url    = العنوان الكامل للصفحة + /p/1   (مش كلمة «لينك»)
<meter itemprop="rating" value="4" max="5">              rating = "4"
<span itemprop="a b">قيمتين</span>                       a = "قيمتين" ، b = "قيمتين"   (اسمين بينهم مسافة)
itemprop="name" مرتين في نفس الحاجة                      name   = "اسم" و "اسم تاني"   (قيمتين)
~~~

اللي بيطلع من الجدول:

- الكلام اللي الزائر بيقراه مش دايمًا القيمة اللي الماكينة عايزاها. «٨٥ جنيه» للزائر و [[85.00]] للماكينة: [[<data value>]]. «١٠ مارس» و [[2025-03-10]]: [[<time datetime>]]. (درس «abbr و dfn و time».)
- معلومة الماكينة محتاجاها ومش مكتوبة في الصفحة (العملة): [[<meta itemprop content>]]. ومعلومة قيمتها عنوان (متاح ولا لأ): [[<link itemprop href>]]. الاتنين مسموح يتكتبوا جوه [[<body>]] لما يكون عليهم [[itemprop]].
- بس الأصل إن البيانات تبقى **على الكلام اللي باين**. [[<meta>]] للاستثناء.

---

## ٥. حاجة جوه حاجة

لما قيمة الخاصية نفسها ليها خصايص (العرض ليه سعر وعملة، الكاتب ليه اسم ولينك)، بتكتب [[itemprop]] و [[itemscope]] و [[itemtype]] **على نفس العنصر**:

~~~html
<article itemscope itemtype="https://schema.org/Book">
  <h2 itemprop="name">حكايات الورق</h2>
  <p>تأليف
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">سلمى حسن</span>
    </span>
  </p>
</article>
~~~

~~~text القياس
حاجة نوعها https://schema.org/Book
  name    = "حكايات الورق"
  author  = حاجة نوعها https://schema.org/Person
              name = "سلمى حسن"
~~~

- [[itemprop="author"]] بيقول «دي خاصية الكتاب اللي اسمها author».
- [[itemscope]] على نفس العنصر بيقول «وقيمتها حاجة».
- [[itemprop="name"]] اللي جوه بقى تبع **الشخص** مش الكتاب: كل [[itemprop]] تبع أقرب [[itemscope]] فوقه.

---

## ٦. [[<article itemid="...">]] و [[<div itemref="...">]]

### [[<article itemid="https://example.test/products/nour-a5">]]

عنوان (أو رقم بصيغة عنوان) **فريد** للحاجة نفسها: لو نفس المنتج مكتوب في صفحتين بنفس [[itemid]]، الماكينة تعرف إنهم واحد. بيتكتب على عنصر عليه [[itemscope]] و [[itemtype]].

~~~text القياس
<article itemscope itemtype="https://schema.org/Product" itemid="https://example.test/products/nour-notebook">
الحاجة طلعت ومعاها:   id = "https://example.test/products/nour-notebook"
~~~

### [[<article itemref="brand">]]

الخصايص لازم تبقى جوه الـ [[itemscope]]. [[itemref]] بيستثني: فيه [[id]] عنصر (أو كذا [[id]] بينهم مسافة) **برّه**، والخصايص اللي فيه تتحسب للحاجة دي.

~~~html
<article itemscope itemtype="https://schema.org/Product" itemref="brand">
  <h2 itemprop="name">نوتة نور A5</h2>
</article>
<article itemscope itemtype="https://schema.org/Product" itemref="brand">
  <h2 itemprop="name">قلم نور الأزرق</h2>
</article>
<footer>
  <p id="brand">كل المنتجات من <span itemprop="brand">دار نور</span>.</p>
</footer>
~~~

~~~text القياس
من غير itemref:    المنتج الأول: name بس ، والتاني: name بس
بـ itemref="brand": المنتج الأول: name + brand = "دار نور" ، والتاني: name + brand = "دار نور"
~~~

- القيمة [[id]] عادي بتاع عنصر، **مش** [[itemid]].
- بيتستخدم لما المعلومة مكتوبة مرة واحدة في الصفحة ومشتركة بين كذا حاجة، أو شكل الصفحة حاططها بعيد.

الاتنين أقل استخدامًا بكتير من التلاتة الأولانيين.

---

## ٧. مين بيقرا ده، وبيعمل بيه إيه

~~~text القياس من Chrome
تغيير في الشكل:                         مفيش
الخاصية itemScope على العناصر:          مش موجودة
document.getItems:                      undefined
~~~

المتصفح مبيعملش حاجة بالـ microdata (كان فيه API ليها زمان واتشال). اللي بيقراها:

- **محركات البحث.** بتفهم من [[Product]] و [[Offer]] إن الصفحة فيها منتج بسعر، وممكن تعرض السعر والتقييم والتوفر تحت النتيجة (اسمها rich results). مفيش ضمان: ده قرار المحرك، وليه شروط لكل نوع في وثائق كل محرك.
- **أدوات تانية:** قارئ المقالات، أدوات جمع الأسعار، إضافات المتصفح.

**قارئ الشاشة مبيستخدمهاش.** الـ microdata للماكينات اللي بتلمّ بيانات، مش للـ accessibility. معنى الصفحة للبني آدم لسه من العناصر نفسها: [[<h2>]] و [[<time>]] و [[<article>]].

وتتأكد منها بأداة بتطلّع البيانات من الصفحة: Schema Markup Validator على [[validator.schema.org]] (MDN بيشاور عليها). بتلزق الكود أو اللينك، وبتعرضلك الحاجات وخصايصها زي القياسات اللي فوق.

---

## ٨. البديل الأشهر: JSON-LD

نفس البيانات ممكن تتكتب في [[<script>]] واحد مستقل، بصيغة اسمها JSON-LD، من غير ما تلمس عناصر الصفحة:

~~~html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "نوتة نور A5",
  "description": "نوتة 120 صفحة بغلاف قماش.",
  "offers": {
    "@type": "Offer",
    "price": "85.00",
    "priceCurrency": "EGP",
    "availability": "https://schema.org/InStock"
  }
}
</script>
~~~

نفس القاموس ونفس الأسامي. الفرق في المكان:

| | microdata | JSON-LD |
|---|---|---|
| البيانات مكتوبة فين | على عناصر الصفحة نفسها | في [[<script>]] لوحده |
| لو الكلام في الصفحة اتغيّر | البيانات بتتغيّر معاه (هي هي) | لازم تفتكر تغيّر الاتنين |
| تغيير شكل الـ HTML | ممكن يكسر البيانات ([[itemprop]] خرج برّه الـ [[itemscope]]) | مبيأثرش |
| بيتولّد إزاي | بإيدك في الـ template | سهل يتولّد من الكود أو من قاعدة البيانات |
| الأشهر النهارده | أقل | أكتر، وهو اللي أغلب الوثائق والأدوات بتبدأ بيه |

في مشروع بيتبني بـ framework، JSON-LD هو المعتاد (درس «JSON-LD» في كورس Next.js بيشرحه بالتفصيل). microdata مناسبة لصفحة HTML مكتوبة بالإيد، أو لما عايز البيانات تفضل لازقة في الكلام. **متكتبش الاتنين لنفس الحاجة** ببيانات مختلفة.

وده كله غير البيانات اللي في [[<head>]] (العنوان والوصف وصورة المشاركة): دي في درس «meta و Open Graph».

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[itemtype]] من غير [[itemscope]] | مفيش حاجة بتتقري خالص |
| [[itemprop]] برّه أي [[itemscope]] | خاصية من غير صاحب: بتتجاهل |
| [[itemprop="price"]] على «٨٥ جنيه» | السعر بيتقري «٨٥ جنيه» كنص، مش رقم. [[<data value="85.00">]] |
| السعر على المنتج مباشرة بدل [[offers]] | القاموس بيقول السعر خاصية العرض ([[Offer]])، فالمحرك مش هيلاقيه مكانه |
| [[itemprop="url"]] على [[<span>]] فيه كلمة «الموقع» | القيمة كلمة «الموقع». لازم [[<a href>]] |
| [[itemtype="schema.org/product"]] | من غير [[https://]] وبحرف صغير: نوع مش معروف |
| اختراع أسامي خصايص | محدش هيفهمها |
| بيانات في الـ microdata مش مكتوبة للزائر (سعر أرخص، تقييم مش موجود) | محركات البحث بتعتبره غش وبتعاقب عليه (وثائق المحركات) |
| [[itemref]] فيه [[itemid]] بدل [[id]] | مبيلاقيش العنصر |

---

## الخلاصة

- [[itemscope]] بيبدأ حاجة، و [[itemtype]] نوعها من schema.org، و [[itemprop]] خاصية فيها.
- القيمة من الكلام، إلا: [[content]] في [[<meta>]]، و [[href]] في اللينكات، و [[src]] في الصور، و [[value]] في [[<data>]]، و [[datetime]] في [[<time>]].
- حاجة جوه حاجة: [[itemprop]] و [[itemscope]] و [[itemtype]] على نفس العنصر.
- [[itemid]] اسم فريد للحاجة، و [[itemref]] بيضم خصايص من برّه بالـ [[id]].
- الشكل مبيتغيّرش والمتصفح مش مهتم: ده لمحركات البحث. والبديل الأشهر JSON-LD.`,
          try: R`اعمل ملف [[about.html]] فيه بلوك «عن الكاتبة»: اسمها في [[<h2>]]، وشغلتها في فقرة، ولينك إيميل [[mailto:]]، ولينك لموقعها. زوّد عليه microdata من نوع [[https://schema.org/Person]] بالخصايص [[name]] و [[jobTitle]] و [[email]] و [[url]]. افتحه في Chrome وشوف إن الشكل متغيّرش، وبعدين الزق الكود في Schema Markup Validator وشوف الخصايص اللي طلعت.`,
          sol: R`~~~live 190 about.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عن الكاتبة</title>
</head>
<body>
<section itemscope itemtype="https://schema.org/Person">
  <h2 itemprop="name">منى علي</h2>
  <p itemprop="jobTitle">مصممة واجهات</p>
  <p><a itemprop="email" href="mailto:mona@example.test">mona@example.test</a></p>
  <p><a itemprop="url" href="https://example.test/mona">موقعها</a></p>
</section>
</body>
</html>
~~~

**هتشوف إيه:** اسم، وشغلة، ولينكين. نفس الصفحة اللي كانت هتطلع من غير أي attribute من دول.

~~~text القياس (خوارزمية المواصفة على الصفحة في Chrome)
حاجة نوعها https://schema.org/Person
  name      = "منى علي"
  jobTitle  = "مصممة واجهات"
  email     = "mailto:mona@example.test"
  url       = "https://example.test/mona"
~~~

**خد بالك من اللينكين:** القيمة [[href]] مش الكلام. [[email]] طلع [[mailto:mona@example.test]]، و [[url]] طلع العنوان مش كلمة «موقعها». لو كانوا [[<span>]] كانت القيمة هتبقى الكلام المكتوب.

(نتيجة Schema Markup Validator نفسها متجرّبتش هنا: الأداة موقع خارجي. المفروض تعرض نفس الأربع خصايص.)`,
          deep: {
            why: R`محرك البحث بيقرا ملايين الصفحات، وكل واحدة بتكتب السعر والتاريخ والاسم بشكل. من غير بيانات منظمة هو بيخمّن: «85» ده سعر ولا رقم موديل؟ البيانات المنظمة بتشيل التخمين: صاحب الصفحة بيقول بنفسه إيه ده. والمقابل إن المحرك يقدر يعرض النتيجة بشكل أغنى (سعر، تقييم، تاريخ مناسبة)، وده بيفرق في عدد اللي بيدوسوا عليها.`,
            how: R`الماكينة بتمشي على الصفحة وتدوّر على كل عنصر عليه [[itemscope]] ومش عليه [[itemprop]]: دي الحاجات «الرئيسية». لكل واحدة بتلمّ كل العناصر اللي عليها [[itemprop]] جواها (وجوه العناصر اللي [[itemref]] بيشاور عليها)، ومبتدخلش جوه [[itemscope]] تاني إلا كقيمة. ولكل خاصية بتاخد القيمة حسب نوع العنصر: [[content]] أو [[href]] أو [[src]] أو [[value]] أو [[datetime]] أو النص. ولو العنصر عليه [[itemscope]]، القيمة حاجة جديدة بتتلمّ بنفس الطريقة. الناتج شجرة من الحاجات والخصايص، وهي نفس الشجرة اللي JSON-LD بيكتبها صريحة.`,
            when: R`منتج بسعر، مقال بكاتب وتاريخ، مناسبة بميعاد ومكان، وصفة، كتاب، بيانات شركة أو شخص في صفحة «عن». microdata لما الصفحة HTML ثابت أو template بسيط. JSON-LD لما البيانات جاية من كود أو CMS، أو الفريق مش عايز يلمس الـ HTML. ومش لكل حاجة في الصفحة: للحاجات اللي ليها نوع في schema.org ومحرك البحث بيستخدمه.`,
            mistakes: R`نسيان [[itemscope]]. [[itemprop]] على الكلام المعروض بدل القيمة ([[<data>]] و [[<time>]]). خاصية على النوع الغلط (السعر على المنتج). نوع مكتوب غلط. بيانات مش مطابقة للي الزائر شايفه. وتوقّع إن rich results هتظهر في نفس اليوم أو مضمونة.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** بلوك «عن الكاتبة» في صفحة «دفتر نور». زوّد عليه microdata من نوع [[https://schema.org/Person]]: الاسم [[name]]، والشغلة [[jobTitle]]، والإيميل [[email]]. (من قسم ٢ و ٣ و ٤ في الشرح)`, done: R`البلوك عليه [[itemscope]] و [[itemtype]]، والتلات خصايص على عناصرها، وكل الشروط ✓.`, work: { h: 170, start: R`<section>
  <h2>منى علي</h2>
  <p>مصممة واجهات</p>
  <p><a href="mailto:mona@example.test">mona@example.test</a></p>
</section>`, checks: [
              { say: R`[[<section>]] عليه [[itemscope]]`, q: "section[itemscope]" },
              { say: R`ونوعه [[itemtype="https://schema.org/Person"]]`, q: "section[itemscope][itemtype=\"https://schema.org/Person\"]" },
              { say: R`الاسم [[itemprop="name"]]`, q: "section[itemscope] [itemprop=\"name\"]", has: "منى علي" },
              { say: R`الشغلة [[itemprop="jobTitle"]]`, q: "section[itemscope] [itemprop=\"jobTitle\"]", has: "مصممة" },
              { say: R`الإيميل [[itemprop="email"]] على اللينك نفسه (القيمة من [[href]])`, q: "section[itemscope] a[itemprop=\"email\"][href^=\"mailto:\"]" },
            ] }, sol: R`~~~live 170 الحل
<section itemscope itemtype="https://schema.org/Person">
  <h2 itemprop="name">منى علي</h2>
  <p itemprop="jobTitle">مصممة واجهات</p>
  <p><a itemprop="email" href="mailto:mona@example.test">mona@example.test</a></p>
</section>
~~~

**هتشوف إيه:** البلوك زي ما هو بالظبط. مفيش حرف اتغيّر في الشكل.

**ليه كده:**

- [[itemscope]] و [[itemtype]] على [[<section>]]: هو اللي حاوي كل معلومات الشخص.
- كل [[itemprop]] على العنصر اللي فيه القيمة، من غير ما تزوّد عناصر جديدة.
- [[email]] على [[<a>]] مش على الفقرة اللي حواليه: على [[<a>]] القيمة [[href]]، وعلى [[<p>]] كانت هتبقى الكلام.

**الغلطة الشائعة:** [[itemprop="jobtitle"]] بحروف صغيرة. أسامي الخصايص بتفرق في الحروف: في schema.org اسمها [[jobTitle]].

~~~text القياس (خوارزمية المواصفة)
حاجة نوعها https://schema.org/Person
  name = "منى علي" ، jobTitle = "مصممة واجهات" ، email = "mailto:mona@example.test"
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كارت المنتج ده المفروض محرك البحث يقرا منه الاسم والسعر. الأداة بتقول «مفيش أي حاجة في الصفحة». وحتى لو قرا، السعر مكتوب كنص. صلّح: (١) خلّي الكارت «حاجة». (٢) السعر جوه عرض [[offers]] من نوع [[Offer]]. (٣) السعر رقم [[85.00]] والعملة [[EGP]]. (من قسم ٢ و ٤ و ٥ في الشرح)`, done: R`الكارت [[itemscope]]، وجواه عرض فيه سعر بالرقم وعملة، وكل الشروط ✓.`, work: { h: 150, start: R`<article itemtype="https://schema.org/Product">
  <h2 itemprop="name">نوتة نور A5</h2>
  <p>السعر: <span itemprop="price">٨٥ جنيه</span></p>
</article>`, checks: [
              { say: R`[[<article>]] عليه [[itemscope]]`, q: "article[itemscope][itemtype=\"https://schema.org/Product\"]" },
              { say: R`فيه [[itemprop="offers"]] عليه [[itemscope]] ونوعه [[Offer]]`, q: "article [itemprop=\"offers\"][itemscope][itemtype=\"https://schema.org/Offer\"]" },
              { say: R`السعر [[<data itemprop="price" value="85.00">]] جوه العرض`, q: "[itemprop=\"offers\"] data[itemprop=\"price\"][value=\"85.00\"]" },
              { say: R`العملة [[<meta itemprop="priceCurrency" content="EGP">]] جوه العرض`, q: "[itemprop=\"offers\"] meta[itemprop=\"priceCurrency\"][content=\"EGP\"]" },
              { say: R`الزائر لسه شايف «٨٥ جنيه»`, q: "article", has: "٨٥ جنيه" },
            ] }, sol: R`~~~live 103 بعد التصليح
<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">نوتة نور A5</h2>
  <p itemprop="offers" itemscope itemtype="https://schema.org/Offer">السعر: <data itemprop="price" value="85.00">٨٥ جنيه</data>
  <meta itemprop="priceCurrency" content="EGP"></p>
</article>
~~~

**هتشوف إيه:** نفس الكارت: العنوان و «السعر: ٨٥ جنيه». التصليح كله في اللي الماكينة بتقراه:

~~~text القياس (خوارزمية المواصفة)
قبل:   عدد الحاجات = 0

بعد:   حاجة نوعها https://schema.org/Product
         name   = "نوتة نور A5"
         offers = حاجة نوعها https://schema.org/Offer
                    price = "85.00" ، priceCurrency = "EGP"
~~~

**التلات غلطات:**

1. [[itemtype]] من غير [[itemscope]]: مفيش حاجة أصلًا، فكل الـ [[itemprop]] اتجاهلوا.
2. السعر كان خاصية على المنتج. في schema.org السعر خاصية **العرض**، والعرض هو خاصية المنتج [[offers]].
3. [[<span>]] قيمته الكلام: «٨٥ جنيه». [[<data value="85.00">]] بيدّي الرقم للماكينة ويسيب الكلام للزائر. والعملة ملهاش مكان في الكلام غير كلمة «جنيه»، فاتكتبت [[<meta>]].

**الغلطة الشائعة:** [[<meta itemprop="price" content="85.00">]] وتسيب «٨٥ جنيه» نص عادي. بيشتغل، بس البيانات بقت منفصلة عن الكلام: لو السعر اتغيّر في واحد واتنسى في التاني، الماكينة والزائر هيشوفوا سعرين.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ده اللي المفروض الماكينة تقراه من كارت الكتاب (في التعليق). الكارت مكتوب من غير microdata. زوّدها عشان يطلع نفس الناتج بالظبط. خد بالك: الكاتبة حاجة جوه حاجة، والتاريخ بصيغة الماكينة. (من قسم ٤ و ٥ في الشرح)`, done: R`الكتاب [[Book]]، والكاتبة [[Person]] جواه، والتاريخ [[<time datetime>]]، وكل الشروط ✓.`, work: { h: 190, start: R`<!--
Book
  name          = "حكايات الورق"
  author        = Person
                    name = "سلمى حسن"
  datePublished = "2025-03-10"
  numberOfPages = "212"
-->
<article>
  <h2>حكايات الورق</h2>
  <p>تأليف سلمى حسن</p>
  <p>صدر في ١٠ مارس ٢٠٢٥</p>
  <p>212 صفحة</p>
</article>`, checks: [
              { say: R`الكارت [[itemscope]] ونوعه [[https://schema.org/Book]]`, q: "article[itemscope][itemtype=\"https://schema.org/Book\"]" },
              { say: R`العنوان [[itemprop="name"]]`, q: "article > h2[itemprop=\"name\"]", has: "حكايات الورق" },
              { say: R`الكاتبة [[itemprop="author"]] وعليها [[itemscope]] ونوعها [[Person]]`, q: "[itemprop=\"author\"][itemscope][itemtype=\"https://schema.org/Person\"]" },
              { say: R`اسم الكاتبة [[itemprop="name"]] **جوه** الـ author، وفيه «سلمى حسن» بس`, q: "[itemprop=\"author\"] [itemprop=\"name\"]", has: "سلمى حسن" },
              { say: R`التاريخ [[<time itemprop="datePublished" datetime="2025-03-10">]]`, q: "time[itemprop=\"datePublished\"][datetime=\"2025-03-10\"]" },
              { say: R`عدد الصفحات [[itemprop="numberOfPages"]] على الرقم لوحده`, q: "[itemprop=\"numberOfPages\"]", has: "212" },
            ] }, sol: R`~~~live 190 الحل
<article itemscope itemtype="https://schema.org/Book">
  <h2 itemprop="name">حكايات الورق</h2>
  <p>تأليف <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">سلمى حسن</span></span></p>
  <p>صدر في <time itemprop="datePublished" datetime="2025-03-10">١٠ مارس ٢٠٢٥</time></p>
  <p><span itemprop="numberOfPages">212</span> صفحة</p>
</article>
~~~

**هتشوف إيه:** الكارت زي ما هو: عنوان وتلات سطور.

~~~text القياس (خوارزمية المواصفة)
حاجة نوعها https://schema.org/Book
  name          = "حكايات الورق"
  author        = حاجة نوعها https://schema.org/Person
                    name = "سلمى حسن"
  datePublished = "2025-03-10"
  numberOfPages = "212"
~~~

**إزاي قريت المطلوب:**

- [[author = Person]] وتحتها [[name]]: يعني حاجة جوه حاجة. عنصر عليه التلاتة ([[itemprop]] و [[itemscope]] و [[itemtype]])، وجواه عنصر تاني للاسم.
- [[2025-03-10]] مش «١٠ مارس ٢٠٢٥»: القيمة لازم تيجي من [[datetime]].
- [[212]] من غير كلمة «صفحة»: الـ [[itemprop]] على [[<span>]] حوالين الرقم بس.
- كلمة «تأليف» و «صدر في» برّه العناصر اللي عليها [[itemprop]].

**الغلطة الشائعة:** [[<p itemprop="author">تأليف سلمى حسن</p>]]. الكاتبة هتطلع نص «تأليف سلمى حسن» مش شخص ليه اسم.` },
            { lvl: 'تطبيق', t: R`**refactor:** في الصفحة منتجين، واسم الماركة مكتوب مرة واحدة في الـ [[<footer>]]. دلوقتي الماركة مش بتتقري لأي منتج لأنها برّه الاتنين. من غير ما تنقل الجملة من مكانها ولا تكررها، خلّيها تتحسب للمنتجين. (من قسم ٦ في الشرح: [[itemref]])`, done: R`كل منتج بيطلع معاه [[brand]]، والجملة لسه في الـ footer مرة واحدة، وكل الشروط ✓.`, work: { h: 220, start: R`<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">نوتة نور A5</h2>
</article>
<article itemscope itemtype="https://schema.org/Product">
  <h2 itemprop="name">قلم نور الأزرق</h2>
</article>
<footer>
  <p>كل المنتجات من <span itemprop="brand">دار نور</span>.</p>
</footer>`, checks: [
              { say: R`فيه عنصر في الـ footer ليه [[id="brand"]] وجواه (أو عليه) [[itemprop="brand"]]`, q: "footer #brand [itemprop=\"brand\"], footer #brand[itemprop=\"brand\"]" },
              { say: R`المنتجين عليهم [[itemref="brand"]]`, q: "article[itemscope][itemref=\"brand\"]", n: 2 },
              { say: R`[[itemprop="brand"]] لسه مكتوب مرة واحدة`, q: "[itemprop=\"brand\"]", n: 1 },
              { say: R`الجملة لسه في الـ footer`, q: "footer", has: "دار نور" },
            ] }, sol: R`~~~live 150 بعد
<article itemscope itemtype="https://schema.org/Product" itemref="brand">
  <h2 itemprop="name">نوتة نور A5</h2>
</article>
<article itemscope itemtype="https://schema.org/Product" itemref="brand">
  <h2 itemprop="name">قلم نور الأزرق</h2>
</article>
<footer>
  <p id="brand">كل المنتجات من <span itemprop="brand">دار نور</span>.</p>
</footer>
~~~

**هتشوف إيه:** عنوانين وتحتهم جملة الماركة. الشكل زي ما هو.

~~~text القياس (خوارزمية المواصفة)
قبل:   المنتج ١: name = "نوتة نور A5"              المنتج ٢: name = "قلم نور الأزرق"
بعد:   المنتج ١: name = "نوتة نور A5" ، brand = "دار نور"
       المنتج ٢: name = "قلم نور الأزرق" ، brand = "دار نور"
~~~

**ليه كده:**

- [[id="brand"]] على الفقرة اللي فيها الخاصية، و [[itemref="brand"]] على كل منتج: «خد كمان الخصايص اللي في العنصر ده».
- [[itemprop="brand"]] فضل على [[<span>]] حوالين الاسم بس، فالقيمة «دار نور» مش الجملة كلها.

**الغلطة الشائعة:** تحط [[id]] على الـ [[<span>]] اللي عليه [[itemprop]] نفسه. ده شغال كمان ([[itemref]] بياخد العنصر نفسه واللي جواه)، بس الغلط إنك تكتب في [[itemref]] اسم الخاصية ([[itemref="brand"]] ومفيش عنصر بالـ [[id]] ده): مش هيلاقي حاجة ومفيش خطأ.` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلتك بتبني موقع متجر بـ framework والمنتجات جاية من قاعدة بيانات، وسألتك: «أكتب microdata على الكروت ولا JSON-LD؟». جاوبها في ٣ سطور. (من قسم ٨ في الشرح: جدول المقارنة)`, done: R`اخترت واحد لحالتها وقلت إمتى التاني أحسن.`, sol: R`إجابة نموذجية:

1. **JSON-LD.** البيانات عندك في الكود أصلًا (كائن المنتج من قاعدة البيانات)، فتحويله لـ [[<script type="application/ld+json">]] سطر، ومش هتوزّعي [[itemprop]] على كل عنصر في الـ component.
2. وهو مبيتأثرش بتغيير شكل الكارت: المصمم يغيّر الـ HTML زي ما هو عايز والبيانات سليمة. مع microdata نقل عنصر برّه الـ [[itemscope]] بيكسر البيانات من غير أي خطأ ظاهر.
3. microdata أحسن لما الصفحة HTML مكتوبة بالإيد، أو لما تحبي تضمني إن البيانات هي هي الكلام اللي الزائر شايفه. وفي الحالتين: نفس أسامي schema.org، ومتكتبيش الاتنين لنفس المنتج بقيم مختلفة.

~~~html
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "Product", "name": "نوتة نور A5",
  "offers": { "@type": "Offer", "price": "85.00", "priceCurrency": "EGP" } }
</script>
~~~` }
          ]
        }
      ]
    }
]);
