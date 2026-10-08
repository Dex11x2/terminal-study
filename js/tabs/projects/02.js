// تكملة تاب projects: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/projects/01.js (شرح حقول الدرس في أوله)
MORE("projects", [
    {
      t: "مشروع ١: landing page بلغتين بـ HTML و CSS",
      l: 1,
      n: "صفحة تعريف عربي وإنجليزي، RTL و LTR، على الموبايل الأول، و Lighthouse ٩٠+ من غير سطر JavaScript",
      items: [
        {
          cmd: "مشروع ١: الـ spec",
          title: "هتبني إيه بالظبط قبل ما تكتب HTML؟",
          desc: R`المشروع: صفحة تعريف (landing page) لتطبيق مذاكرة خيالي اسمه «ذاكر»، بنسختين: عربي على [[/]] وإنجليزي على [[/en/]]. HTML و CSS بس، من غير JavaScript ولا frameworks. الهدف إنك تثبّت أساس HTML و CSS كله في مشروع واحد: semantic HTML، و responsive، و RTL، و accessibility، و الأداء.

المحطة الأولى مفيهاش كود: ملف [[docs/spec.md]] فيه الأقسام بالترتيب، وشروط «خلصت» اللي هتقيس بيها. من غير spec مكتوب، هتفضل تضيف أقسام وتغيّر ألوان ومتعرفش إمتى تقف.

خلصت يعني: الملف فيه (١) هدف الصفحة في جملة، (٢) الأقسام بالترتيب ومحتوى كل قسم، (٣) شروط قابلة للقياس (أرقام: عرض الشاشة، ودرجة Lighthouse، وعدد violations)، (٤) قايمة «برّه النسخة دي». راجع درس [[user stories]] ودرس [[MVP]] في تاب «بناء مشروع كامل».`,
          example: R`p1-landing/
  docs/spec.md          الأقسام والشروط
  site/index.html       العربي RTL
  site/en/index.html    الإنجليزي LTR
  site/styles.css       CSS واحد للغتين
  site/img/             SVG للوجو والصورة الكبيرة
  tests/a11y.spec.ts    axe وكيبورد و scroll بالعرض
  playwright.config.ts  موبايل وديسكتوب
  .github/workflows/pages.yml
  README.md`,
          try: R`اكتب [[docs/spec.md]] لصفحة التعريف: الهدف، والأقسام الـ ٦ (header، و hero، ومميزات، وأسعار، وأسئلة، و CTA مع الفوتر)، وشروط «خلصت» بأرقام، وحاجتين على الأقل برّه النسخة دي. واعمل هيكل الفولدرات اللي في المثال بملفات فاضية، و commit.`,
          flag: "script",
          deep: {
            why: R`أكبر سبب إن المشاريع الشخصية مبتخلصش إنها ملهاش نهاية مكتوبة. والـ spec كمان بيفصل قرار «إيه اللي هبنيه» عن «هبنيه إزاي»: وانت بتكتب CSS مش هتقعد تفكر تضيف قسم testimonials ولا لأ، لأنك قررت خلاص.`,
            how: R`الشروط لازم تبقى قابلة للقياس. «شكلها حلو على الموبايل» مش شرط. «مفيش scroll بالعرض من 320px لـ 1440px» شرط، وتقدر تكتب له اختبار (هتكتبه في المحطة الخامسة). «accessible» مش شرط. «صفر violations في axe، والـ Tab يوصل لكل لينك» شرط.

فصل [[site/]] عن باقي المشروع مقصود: ده الفولدر اللي هيترفع بالظبط، ومفيهوش tests ولا docs ولا config. والإنجليزي في فولدر [[en/]] جواه [[index.html]]، فالرابط يبقى [[/en/]] نضيف.

وقرار «صفر JavaScript» جزء من التمرين: [[details]] و [[summary]] بيعملوا الأسئلة من غير JS، و [[:focus]] بيعمل الـ skip link، و [[prefers-color-scheme]] بيعمل الوضع الغامق.`,
            when: R`أول ساعة في المشروع. ولو في النص جت لك فكرة قسم جديد، اكتبها في «برّه النسخة دي» وكمّل.`,
            mistakes: R`spec عبارة عن تصميم في Figma من غير شروط. أو شروط زي «سريعة» و «responsive» من غير أرقام. أو تبدأ بتدوّر على قالب جاهز وتعدّل فيه، فالمشروع ميبقاش بيوري إنك تعرف HTML و CSS. أو تنسى اللغة التانية لحد الآخر، وتكتشف إن الـ CSS كله [[left]] و [[right]].`
          },
          teach: R`## الفكرة: الـ spec بيقول «إيه» و «إمتى أقف»، والفولدرات بتفصل اللي هيترفع عن الباقي

المحطة دي مفيهاش كود: ملف markdown فيه قرارات، وهيكل فولدرات فاضي. هنقرا الهيكل الأول (ليه كل ملف في مكانه)، وبعدين الـ spec المرجعي حتة حتة، ونربط كل شرط فيه بالاختبار اللي هيقيسه بعدين.

---

## ١. الهيكل

~~~text المثال
p1-landing/
  docs/spec.md          الأقسام والشروط
  site/index.html       العربي RTL
  site/en/index.html    الإنجليزي LTR
  site/styles.css       CSS واحد للغتين
  site/img/             SVG للوجو والصورة الكبيرة
  tests/a11y.spec.ts    axe وكيبورد و scroll بالعرض
  playwright.config.ts  موبايل وديسكتوب
  .github/workflows/pages.yml
  README.md
~~~

اقسمه لمجموعتين:

| المجموعة | الملفات | بتترفع على الموقع؟ |
|---|---|---|
| الموقع نفسه | كل اللي جوه [[site/]] | أيوه، الفولدر ده بس |
| حوالين الموقع | [[docs/]] و [[tests/]] و [[playwright.config.ts]] و [[.github/]] و [[README.md]] | لأ |

- [[site/en/index.html]] مش [[site/en.html]]: كده الرابط [[/en/]]، والسيرفر بيدوّر على [[index.html]] جوه الفولدر لوحده.
- [[.github/workflows/]]: GitHub بيقرا أي ملف YAML هنا كـ workflow. النقطة في أول [[.github]] جزء من الاسم.
- [[tests/a11y.spec.ts]]: Playwright بيدوّر افتراضيًا على ملفات [[.spec.ts]] و [[.test.ts]].

اعمل الهيكل بملفات فاضية (اتشغّل في Git Bash على ويندوز، ونفس الأوامر على لينكس والماك):

~~~bash
mkdir -p docs site/en site/img tests .github/workflows
touch docs/spec.md site/index.html site/en/index.html site/styles.css tests/a11y.spec.ts playwright.config.ts .github/workflows/pages.yml README.md
find . -type f | sort
~~~

- [[mkdir -p]]: اعمل الفولدر واللي قبله لو مش موجود، ومتشتكيش لو موجود.
- [[touch]]: اعمل ملف فاضي.
- [[find . -type f]]: كل الملفات ([[f]] = file)، و [[sort]] يرتّبهم.

~~~text الناتج
./.github/workflows/pages.yml
./README.md
./docs/spec.md
./playwright.config.ts
./site/en/index.html
./site/index.html
./site/styles.css
./tests/a11y.spec.ts
~~~

وبعد [[git add .]]:

~~~text git status --short
A  .github/workflows/pages.yml
A  README.md
A  docs/spec.md
...
A  tests/a11y.spec.ts
~~~

[[site/img/]] مش موجود في القايمة: git بيتابع ملفات بس، والفولدر الفاضي مبيدخلش أي commit. هيظهر لما تحط فيه أول SVG.

> على PowerShell (اتجرّب في pwsh 7): [[New-Item -ItemType Directory -Force docs, site/en, site/img, tests, .github/workflows]] للفولدرات، و [[New-Item docs/spec.md, site/index.html]] للملفات (بياخد أكتر من مسار مفصولين بفاصلة).

---

## ٢. الـ spec حتة حتة

### الهدف

~~~text docs/spec.md
## الهدف
زائر من موبايل يفهم التطبيق بيعمل إيه في ٥ ثواني، ويدوس «ابدأ ببلاش».
~~~

جملة واحدة فيها **مين** (زائر من موبايل)، و **إيه اللي يحصل** (يفهم ويدوس)، و **رقم** (٥ ثواني). كل قرار بعد كده بيترد عليها: قسم testimonials بيساعد الزائر يدوس في ٥ ثواني؟ لأ؟ يبقى برّه.

### الصفحات والأقسام

~~~text docs/spec.md
- $__bt/$__bt عربي RTL، و $__bt/en/$__bt إنجليزي LTR، ونفس الـ CSS للاتنين
1. header: لوجو، وروابط للأقسام، ولينك اللغة التانية
2. hero: عنوان (h1)، وجملة، وزرار، وصورة
...
5. أسئلة: details و summary
~~~

الأقسام **بالترتيب** وكل قسم فيه إيه. لاحظ إن فيه قرارات HTML مكتوبة من دلوقتي (h1 واحد، و [[details]] للأسئلة). ده بيخلي المحطة الجاية تنفيذ مش تفكير.

### شروط «خلصت»: كل شرط ليه اختبار

| الشرط في الـ spec | هيتقاس بإيه (المحطة) |
|---|---|
| عرض 320px لحد 1440px من غير scroll بالعرض | [[scrollWidth - clientWidth]] في Playwright (٥) |
| أول Tab على «اتخطى للمحتوى» | اختبار [[toBeFocused()]] (٥) |
| الـ focus باين في الفاتح والغامق | بإيدك، لأن مفيش أداة بتقيس «باين» |
| axe: صفر violations في اللغتين | [[@axe-core/playwright]] (٥) |
| Lighthouse موبايل: الأربع فئات ≥ 90 | [[npx lighthouse]] (٥) |
| صفر JavaScript | [[find site -name "*.js"]] لازم ميطلعش حاجة (اتجرّب على الحل المرجعي: ناتج فاضي) |

اختبار شرط زي «شكلها حلو»: مفيش. عشان كده مش في القايمة.

### برّه النسخة دي

~~~text docs/spec.md
## برّه النسخة دي
- فورم تسجيل حقيقي، و analytics، و blog
~~~

دي القايمة اللي بتحميك من نفسك: أي فكرة تيجي في النص، اكتبها هنا وكمّل. والفورم بالذات مشروع لوحده (مشروع ٣)، فزرار «اعمل حساب» بيروح للينك برّه.

---

## الخلاصة

- [[site/]] هو الموقع وبس، والباقي (اختبارات و docs و CI) حواليه.
- الـ spec فيه: هدف بجملة فيها رقم، وأقسام بالترتيب، وشروط كل واحد ليه طريقة قياس، و «برّه النسخة دي».
- git مبيشوفش الفولدر الفاضي، فـ [[site/img/]] هيظهر مع أول صورة.`,
          lines: [
            R`اسم الـ repo والفولدر الرئيسي.`,
            R`الـ spec، أول ملف في المشروع.`,
            R`الصفحة العربية، وهي الأساس: [[lang="ar" dir="rtl"]].`,
            R`النسخة الإنجليزية في فولدر، فالرابط [[/en/]].`,
            R`ملف CSS واحد بيخدم الاتجاهين.`,
            R`صور SVG: صغيرة، وحادة على أي شاشة، ومن غير طلبات كتير.`,
            R`اختبارات الـ accessibility والـ layout.`,
            R`إعداد Playwright: project للموبايل و project للديسكتوب.`,
            R`الـ workflow اللي بيختبر وبيرفع [[site/]] على GitHub Pages.`,
            R`الـ README اللي فيه اللينك والصورة.`
          ],
          sol: R`الحل المرجعي تحت. لاحظ إن كل شرط فيه رقم أو حاجة تقدر تقول عليها «أيوه» أو «لأ»، وإن «برّه النسخة دي» فيها الفورم الحقيقي: الزرار في الـ CTA بيروح لصفحة تسجيل برّه المشروع ده، لأن الفورم مشروع لوحده (مشروع ٣).

لو الـ spec بتاعك فيه أقسام أكتر، مفيش مشكلة، بس اسأل نفسك: الزائر محتاجها عشان يدوس «ابدأ»؟ ولو شروطك مفيهاش حاجة عن الكيبورد، ضيفها: هي أول حاجة هتقع لو محدش فكر فيها.`,
          solCode: R`# ذاكر: landing page

## الهدف
زائر من موبايل يفهم التطبيق بيعمل إيه في ٥ ثواني، ويدوس «ابدأ ببلاش».

## الصفحات
- $__bt/$__bt عربي RTL، و $__bt/en/$__bt إنجليزي LTR، ونفس الـ CSS للاتنين

## الأقسام بالترتيب
1. header: لوجو، وروابط للأقسام، ولينك اللغة التانية
2. hero: عنوان (h1)، وجملة، وزرار، وصورة
3. المميزات: ٣ كروت
4. الأسعار: خطتين، والمميزة عليها border
5. أسئلة: details و summary
6. CTA وفوتر

## شروط «خلصت»
- عرض 320px لحد 1440px من غير scroll بالعرض
- الكيبورد: أول Tab على «اتخطى للمحتوى»، والـ focus باين في الفاتح والغامق
- axe: صفر violations في اللغتين
- Lighthouse موبايل: الأربع فئات ≥ 90
- صفر JavaScript

## برّه النسخة دي
- فورم تسجيل حقيقي، و analytics، و blog`
        },
        {
          cmd: "مشروع ١: الهيكل الـ semantic",
          title: "تكتب HTML الصفحة بعناصر ليها معنى إزاي؟",
          desc: R`ابني [[site/index.html]] بالعربي كامل من غير أي CSS. الصفحة لازم تبقى مفهومة ومرتبة وهي HTML خام: لو شلت الـ CSS، العناوين والقوايم والروابط لسه بتحكي الصفحة.

خلصت يعني: (١) [[lang="ar" dir="rtl"]] و viewport و title و description. (٢) skip link أول عنصر في الـ body. (٣) [[header]] و [[nav]] و [[main id="main"]] و [[footer]]، وكل [[section]] ليه [[aria-labelledby]] على الـ h2 بتاعه. (٤) h1 واحد، والعناوين من غير ما تنط مستوى. (٥) كل صورة ليها [[width]] و [[height]] و alt حقيقي أو [[alt=""]] لو زينة. (٦) الأسئلة بـ [[details]] و [[summary]].

الدروس: [[<!doctype html>]] و [[lang و dir]] و [[semantic HTML]] و [[img]] و [[details و summary]] في تاب «HTML و CSS»، و [[meta و Open Graph]] في نفس التاب.`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ذاكر: خطة مذاكرة على قدّ وقتك</title>
  <meta name="description" content="ذاكر بيقسّم المنهج على الأيام اللي فاضلة، ويفكّرك كل يوم بالمطلوب.">
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip" href="#main">اتخطى للمحتوى</a>
  <header class="site-header">
    <a class="logo" href="./"><img src="img/logo.svg" alt="" width="32" height="32"> ذاكر</a>
    <nav aria-label="الرئيسية">
      <ul>
        <li><a href="#features">المميزات</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
  </header>`,
          try: R`اكتب [[site/index.html]] كامل بالأقسام اللي في الـ spec، وافتحه في المتصفح من غير CSS. استخدم قارئ الشاشة أو قايمة العناوين (في DevTools: Elements، أو extension زي HeadingsMap) واتأكد إن الـ headings لوحدها بتحكي الصفحة. وبعدين افتح [[https://validator.w3.org/nu/]] وحط الملف: صفر errors.`,
          flag: "script",
          deep: {
            why: R`HTML هو الـ API بتاع صفحتك لقارئ الشاشة ولمحركات البحث وللمتصفح نفسه. [[<div class="button">]] شكله زرار بس ميتداسش بالكيبورد، ومبيتقريش إنه زرار. [[<nav>]] بيخلي مستخدم قارئ الشاشة ينط للقايمة بزرار واحد. والـ semantic HTML ببلاش: مفيش سطر JS ولا ARIA زيادة.`,
            how: R`الترتيب: skip link، وبعدين [[header]] فيه اللوجو و [[nav]]، وبعدين [[main]]، وبعدين [[footer]]. الـ skip link مخفي لحد ما ياخد focus (هتعمله في الـ CSS) وبيودي على [[#main]].

[[aria-labelledby]] على كل [[section]] بيخليه landmark ليه اسم («region: المميزات»)، فقارئ الشاشة يقدر ينط بين الأقسام. من غير اسم، [[section]] مالوش أي معنى زيادة عن [[div]].

الصور: الـ hero ليها alt بيوصف اللي فيها لأنها بتضيف معنى. اللوجو جنبه كلمة «ذاكر»، فالـ alt بتاعه [[""]] عشان قارئ الشاشة ميقولش «ذاكر ذاكر». و [[width]] و [[height]] بيحجزوا المكان قبل ما الصورة تحمّل، فمفيش CLS (درس [[CLS]] في تاب «HTML و CSS»).

[[hreflang]] على لينكات الـ [[alternate]] بيقول لجوجل إن الصفحتين نفس المحتوى بلغتين. ولينك «English» عليه [[lang="en"]] عشان قارئ الشاشة ينطقه إنجليزي.

والسعر: [[<span dir="ltr">49 EGP</span>]] جوه جملة عربي، عشان الأرقام والعملة ميتلخبطوش في الاتجاه.`,
            when: R`دايمًا قبل الـ CSS. لو بدأت بالشكل، هتختار العناصر على حسب الشكل مش المعنى.`,
            mistakes: R`[[<div onclick>]] بدل [[<button>]] أو [[<a>]]. أو h1 لكل قسم. أو عناوين بتنط من h2 لـ h4 عشان الحجم. أو [[alt="image"]] أو alt فيه اسم الملف. أو [[<br>]] للمسافات. أو تنسى [[lang]] فالموقع كله يتقري بنطق غلط. وفي الانترفيو: «إيه الفرق بين [[section]] و [[article]] و [[div]]؟» [[article]] حاجة تتفهم لوحدها لو اتنقلت (كارت سعر)، و [[section]] جزء من الصفحة ليه عنوان، و [[div]] ملوش معنى.`
          },
          teach: R`## الفكرة: كل عنصر بيقول «أنا إيه» مش «أنا شكلي إيه»

المثال أول ٢٥ سطر في [[site/index.html]]: الـ [[head]] كله والـ [[header]]. هنفكهم سطر سطر، وبعدين نبص على باقي الصفحة في الـ solCode، ونشوف المتصفح فهمها إزاي فعلًا: شجرة الـ accessibility اللي قارئ الشاشة بيقراها، ونتيجة الـ validator. الصفحة اتفتحت في Chrome 154 من غير ولا سطر CSS ولا JS.

---

## ١. أول سطرين

~~~text
<!doctype html>
<html lang="ar" dir="rtl">
~~~

- [[<!doctype html>]]: بيقول للمتصفح «دي صفحة HTML حديثة». من غيره المتصفح بيشتغل في quirks mode، وده وضع قديم بيحسب الـ box model بطريقة مختلفة.
- [[lang="ar"]]: لغة الصفحة. قارئ الشاشة بيختار النطق منها، وجوجل بيعرف الصفحة لمين، والمتصفح بيختار الخط والـ hyphenation.
- [[dir="rtl"]]: الاتجاه من اليمين للشمال. على [[html]] نفسه، فكل الصفحة بتورثه، وكل الـ logical properties في الـ CSS بعدين هتعتمد عليه.

## ٢. الـ head

~~~text
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
~~~

- [[charset="utf-8"]]: الحروف متخزنة بـ UTF-8، فالعربي يظهر صح مش رموز غريبة. المتصفح لازم يلاقيه في أول 1024 بايت من الملف، عشان كده أول حاجة.
- [[viewport]]: من غيره الموبايل بيرسم الصفحة كأن عرضها 980px ويصغّرها. [[width=device-width]] = عرض الصفحة هو عرض الشاشة، و [[initial-scale=1]] = من غير zoom في الأول.

~~~text
  <title>ذاكر: خطة مذاكرة على قدّ وقتك</title>
  <meta name="description" content="ذاكر بيقسّم المنهج على الأيام اللي فاضلة، ويفكّرك كل يوم بالمطلوب.">
~~~

- [[title]]: اسم التابة، وأول حاجة قارئ الشاشة بيقولها، والعنوان الأزرق في جوجل.
- [[description]]: الجملة الرمادي تحت العنوان في نتيجة البحث. مش بتظهر في الصفحة نفسها. Lighthouse بيخصم من SEO لو مش موجودة.

~~~text
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
~~~

[[rel="alternate"]] = «فيه نسخة تانية من الصفحة دي»، و [[hreflang]] لغتها. السطرين دول بيتكتبوا **زي ما هم** في الصفحتين، والنسخة بتشاور على نفسها كمان. كده جوجل بيعرض العربي لللي بيدوّر بالعربي.

~~~text
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
~~~

- [[rel="icon"]]: أيقونة التابة. SVG بيفضل حاد في أي حجم.
- [[rel="stylesheet"]]: ملف الـ CSS. مسار نسبي (من غير [[/]] في الأول)، فيشتغل على GitHub Pages تحت أي مسار.

## ٣. الـ body: الـ skip link والـ header

~~~text
<body>
  <a class="skip" href="#main">اتخطى للمحتوى</a>
~~~

أول عنصر بيتداس في الصفحة كلها. [[href="#main"]] بيودّي على العنصر اللي [[id="main"]]. مستخدم الكيبورد يدوس Tab مرة و Enter، فيتخطى الـ header والقايمة. هيستخبى بالـ CSS لحد ما ياخد focus.

~~~text
  <header class="site-header">
    <a class="logo" href="./"><img src="img/logo.svg" alt="" width="32" height="32"> ذاكر</a>
~~~

- [[<header>]] أول الصفحة = landmark اسمه **banner**. قارئ الشاشة يقدر ينط له بزرار.
- اللوجو لينك للصفحة الرئيسية ([[./]] = الفولدر الحالي).
- [[alt=""]]: الصورة زينة، لأن كلمة «ذاكر» مكتوبة جنبها. alt فاضي يعني «اتجاهلها»، فاسم اللينك بيبقى «ذاكر» بس. لو كان [[alt="ذاكر"]] قارئ الشاشة كان هيقول «ذاكر ذاكر».
- [[width]] و [[height]]: المتصفح بيحجز ٣٢×٣٢ قبل ما الصورة توصل، فالكلام مبيتنقلش لما تحمّل (CLS = صفر في Lighthouse).

~~~text
    <nav aria-label="الرئيسية">
      <ul>
        <li><a href="#features">المميزات</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
  </header>
~~~

- [[<nav>]] = landmark اسمه navigation. و [[aria-label]] بيدّيله اسم، فقارئ الشاشة يقول «navigation الرئيسية»، وده بيفرق لو فيه nav تاني في الفوتر.
- [[<ul>]] و [[<li>]]: القايمة قايمة. قارئ الشاشة بيقول «list, 4 items» قبل ما يبدأ، فالمستخدم عارف الحجم.
- [[href="#features"]]: لينك لقسم في نفس الصفحة بالـ id بتاعه.
- [[hreflang="en"]]: اللينك ده رايح لصفحة إنجليزي. و [[lang="en"]]: الكلمة نفسها «English» تتنطق إنجليزي، مش بحروف عربي.

---

## ٤. باقي الصفحة (الـ solCode)

| العنصر | ليه هو بالذات |
|---|---|
| [[<main id="main">]] | المحتوى الأساسي، landmark واحد بس في الصفحة، وهدف الـ skip link |
| [[<section aria-labelledby="hero-title">]] | [[aria-labelledby]] بياخد اسم القسم من النص اللي [[id]] بتاعه [[hero-title]]، فالقسم يبقى region ليه اسم |
| [[<h1>]] واحد | عنوان الصفحة كلها، وبعده [[h2]] لكل قسم و [[h3]] جواه |
| المميزات [[<ul class="cards">]] | ٣ حاجات من نفس النوع = قايمة |
| الأسعار [[<article>]] | كل خطة حاجة كاملة لوحدها |
| [[<span dir="ltr">49 EGP</span>]] | الرقم والعملة اللاتيني ميتلخبطوش جوه جملة عربي (المحطة الرابعة) |
| [[<details><summary>]] | سؤال بيفتح ويقفل من غير ولا سطر JS، وبالكيبورد |
| [[<footer>]] | landmark اسمه contentinfo |

## ٥. المتصفح فهم إيه؟

Playwright بيطلّع شجرة الـ accessibility كـ نص بـ [[page.locator('body').ariaSnapshot()]]. ده جزء من الناتج الحقيقي للصفحة العربي:

~~~text الناتج (مختصر)
- link "اتخطى للمحتوى"
- banner:
  - link "ذاكر"
  - navigation "الرئيسية":
    - list:
      - listitem: link "المميزات" ...
- main:
  - region "خطة مذاكرة على قدّ وقتك":
    - heading "خطة مذاكرة على قدّ وقتك" [level=1]
    - link "ابدأ ببلاش"
    - img "جدول أسبوع فيه مواد متوزعة على الأيام"
  - region "بيعمل إيه":
    - heading "بيعمل إيه" [level=2]
    - list:
      - listitem:
        - heading "تقسيم أوتوماتيك" [level=3]
  - region "الأسعار":
    - article:
      - heading "مجاني" [level=3]
      - paragraph: 0 EGP
  - region "أسئلة بتتكرر":
    - group: ينفع أستخدمه من غير نت؟
- contentinfo: ...
~~~

لاحظ:

- اللوجو طلع [[link "ذاكر"]] بس، من غير صورة، بسبب [[alt=""]].
- زرار «ابدأ ببلاش ←» طلع [[link "ابدأ ببلاش"]] من غير السهم، لأن السهم عليه [[aria-hidden="true"]].
- كل [[section]] بقى [[region]] باسم عنوانه، بسبب [[aria-labelledby]].
- العناوين لوحدها (1 ثم 2 ثم 3) بتحكي الصفحة.

## ٦. الـ validator

بعتنا الملف لـ [[https://validator.w3.org/nu/]] (نسخة 26.10.7) بـ [[curl]] وطلبنا الناتج JSON:

~~~text الناتج
{"version":"26.10.7","messages":[]}
~~~

[[messages]] فاضية = صفر errors وصفر warnings، في الصفحتين. وعشان تشوف شكل الغلط، بعتناله صفحة فيها [[<p>]] جوه [[<ul>]] ولينك جوه لينك:

~~~text الناتج
error: Element “p” not allowed as child of element “ul” in this context.
error: Start tag “a” seen but an element of the same type was already open.
error: Stray end tag “a”.
~~~

---

## الخلاصة

- [[lang]] و [[dir]] على [[html]]، و [[charset]] و [[viewport]] أول حاجة في الـ head.
- landmarks: [[header]] و [[nav]] و [[main]] و [[footer]]، و [[section]] بـ [[aria-labelledby]] عشان يبقى ليه اسم.
- [[alt=""]] للصورة اللي جنبها نفس الكلام، و alt حقيقي للصورة اللي بتضيف معنى، و [[width]] و [[height]] دايمًا.
- اتأكد بعينك من شجرة الـ accessibility وبالـ validator، مش من شكل الصفحة.`,
          lines: [
            R`أول سطر: HTML5 standards mode.`,
            R`اللغة والاتجاه على الـ html، فكل الصفحة بتورثهم.`,
            R`بداية الـ head.`,
            R`الترميز. لازم يبقى في أول 1024 بايت.`,
            R`من غيره الموبايل بيعرض الصفحة كأنها ديسكتوب مصغّر (980px).`,
            R`العنوان في التابة وفي نتيجة جوجل. الاسم وبعده القيمة.`,
            R`الجملة اللي تحت العنوان في نتايج البحث.`,
            R`الصفحة دي هي النسخة العربي.`,
            R`وده رابط النسخة الإنجليزي. الاتنين لازم يبقوا في الصفحتين.`,
            R`أيقونة SVG، بتبان حادة في أي حجم.`,
            R`ملف CSS واحد للاتنين.`,
            R`نهاية الـ head.`,
            R`بداية الـ body.`,
            R`أول حاجة بيوصلها الـ Tab: لينك يودي على المحتوى على طول.`,
            R`الـ header: landmark اسمه banner.`,
            R`اللوجو: الصورة [[alt=""]] لأن الاسم مكتوب جنبها، وليها أبعاد.`,
            R`[[nav]] باسم، عشان لو فيه أكتر من nav يتفرقوا.`,
            R`القايمة قايمة فعلًا، فقارئ الشاشة بيقول «list, 4 items».`,
            R`لينك لقسم في نفس الصفحة.`,
            R`لينك تاني.`,
            R`لينك تالت.`,
            R`لينك اللغة التانية: [[hreflang]] للمتصفح، و [[lang]] عشان يتنطق صح.`,
            R`نهاية القايمة.`,
            R`نهاية الـ nav.`,
            R`نهاية الـ header.`
          ],
          sol: R`الصفحة من غير CSS لازم تتقري كده: لينك «اتخطى للمحتوى»، واللوجو، وقايمة فيها ٤ لينكات، وبعدين h1 «خطة مذاكرة على قدّ وقتك»، وتحته h2 لكل قسم: «بيعمل إيه» فيها h3 لكل ميزة، و «الأسعار» فيها h3 لكل خطة، و «أسئلة بتتكرر»، و «جرّبه أسبوع ببلاش». قايمة العناوين لوحدها بتحكي الصفحة.

الـ validator لازم يطلّع [[Document checking completed. No errors or warnings to show.]]. أشهر errors: [[<a>]] جوه [[<a>]]، أو [[<ul>]] جواه حاجة غير [[<li>]]، أو [[id]] متكرر.

الغلط الشائع إنك تعمل الكروت [[<div>]]. في الحل، المميزات [[<ul>]] لأنها قايمة (قارئ الشاشة بيقول «list, 3 items»)، والأسعار [[<article>]] لأن كل خطة حاجة مستقلة.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ذاكر: خطة مذاكرة على قدّ وقتك</title>
  <meta name="description" content="ذاكر بيقسّم المنهج على الأيام اللي فاضلة، ويفكّرك كل يوم بالمطلوب.">
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip" href="#main">اتخطى للمحتوى</a>
  <header class="site-header">
    <a class="logo" href="./"><img src="img/logo.svg" alt="" width="32" height="32"> ذاكر</a>
    <nav aria-label="الرئيسية">
      <ul>
        <li><a href="#features">المميزات</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">خطة مذاكرة على قدّ وقتك</h1>
        <p>قول لذاكر ميعاد الامتحان والمنهج، وهو يقسّمه على الأيام اللي فاضلة ويفكّرك كل يوم.</p>
        <a class="btn" href="#pricing">ابدأ ببلاش <span class="arrow" aria-hidden="true">←</span></a>
      </div>
      <img src="img/hero.svg" alt="جدول أسبوع فيه مواد متوزعة على الأيام" width="480" height="360">
    </section>

    <section id="features" aria-labelledby="features-title">
      <h2 id="features-title">بيعمل إيه</h2>
      <ul class="cards">
        <li class="card"><h3>تقسيم أوتوماتيك</h3><p>المنهج بيتوزع على الأيام حسب صعوبة كل جزء.</p></li>
        <li class="card"><h3>تذكير يومي</h3><p>إشعار الصبح بمهام النهارده بس، مش المنهج كله.</p></li>
        <li class="card"><h3>لو اتأخرت</h3><p>الخطة بتتعدل لوحدها من غير ما تبدأ من الأول.</p></li>
      </ul>
    </section>

    <section id="pricing" aria-labelledby="pricing-title">
      <h2 id="pricing-title">الأسعار</h2>
      <div class="cards">
        <article class="card">
          <h3>مجاني</h3>
          <p class="price"><span dir="ltr">0 EGP</span></p>
          <ul><li>مادة واحدة</li><li>تذكير يومي</li></ul>
          <a class="btn btn-outline" href="#signup">ابدأ</a>
        </article>
        <article class="card featured">
          <h3>برو</h3>
          <p class="price"><span dir="ltr">49 EGP</span> / الشهر</p>
          <ul><li>مواد من غير حد</li><li>تعديل الخطة لو اتأخرت</li></ul>
          <a class="btn" href="#signup">اشترك</a>
        </article>
      </div>
    </section>

    <section id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">أسئلة بتتكرر</h2>
      <details><summary>ينفع أستخدمه من غير نت؟</summary><p>أيوه، الخطة بتتحفظ على الموبايل.</p></details>
      <details><summary>ينفع ألغي الاشتراك؟</summary><p>في أي وقت، من الإعدادات، من غير أسئلة.</p></details>
    </section>

    <section id="signup" class="cta" aria-labelledby="signup-title">
      <h2 id="signup-title">جرّبه أسبوع ببلاش</h2>
      <a class="btn" href="https://app.zaker.example/signup">اعمل حساب</a>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 ذاكر · <a href="mailto:hi@zaker.example">hi@zaker.example</a></p>
  </footer>
</body>
</html>`
        },
        {
          cmd: "مشروع ١: الـ layout الـ responsive",
          title: "تعمل layout يمشي من 320px لـ 1440px إزاي؟",
          desc: R`اكتب [[site/styles.css]] mobile-first: الـ CSS الأساسي للموبايل، و [[@media (min-width: ...)]] بتضيف للشاشات الكبيرة. وخلي الـ grid هو اللي يقرر عدد الأعمدة بدل ما تكتب breakpoint لكل عدد.

خلصت يعني: (١) من 320px لحد 1440px مفيش scroll بالعرض ومفيش نص بيتقطع. (٢) الكروت عمود واحد على الموبايل، وبتبقى ٢ و ٣ لوحدها مع العرض. (٣) الـ hero عمودين من 48rem وطالع. (٤) الألوان والمسافات كلها CSS variables، وفيه وضع غامق بـ [[prefers-color-scheme]]. (٥) كل حاجة بتتداس ٤٤px على الأقل، والـ focus باين. (٦) مفيش [[left]] ولا [[right]] ولا [[margin-left]] في الملف كله (دي للمحطة الجاية).

الدروس: [[box model]] و [[rem و em]] و [[clamp()]] و [[CSS variables]] و [[grid]] و [[auto-fit و minmax]] و [[media queries]] و [[dark mode]] و [[logical properties]] في تاب «HTML و CSS».`,
          example: R`main > section { padding: var(--space); max-width: 70rem; margin-inline: auto; }
.hero { display: grid; gap: var(--space); align-items: center; }
.hero p { color: var(--muted); font-size: 1.15rem; max-width: 40ch; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1.1fr 1fr; min-height: 70dvh; } }

.btn { display: inline-flex; gap: 0.5rem; align-items: center; min-height: 44px; padding: 0.6rem 1.4rem; border-radius: var(--radius); background: var(--brand); color: var(--brand-text); font-weight: 700; text-decoration: none; border: 2px solid var(--brand); }
.btn-outline { background: transparent; color: var(--brand); }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }

.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); list-style: none; padding: 0; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.card h3 { margin-block-start: 0; }
.card ul { padding-inline-start: 1.25rem; }`,
          try: R`اكتب الـ CSS كله. افتح الصفحة في Device Toolbar واسحب العرض ببطء من 320px لـ 1440px: أي لحظة يظهر فيها scroll بالعرض أو حاجة تتداخل، صلّحها. بعدين غيّر الـ OS للوضع الغامق (أو في DevTools: Rendering، Emulate CSS prefers-color-scheme) واتأكد إن كل حاجة مقروءة. وفي الآخر [[grep -nE "left|right" site/styles.css]] لازم ميطلعش حاجة.`,
          flag: "script",
          deep: {
            why: R`أغلب زوار أي landing page في مصر جايين من موبايل، وأول ما الصفحة تعمل scroll بالعرض أو زرار ييجي تحت زرار، الزائر بيقفل. و mobile-first بيخلي الـ CSS أبسط: الموبايل غالبًا عمود واحد من غير أي layout، والشاشات الكبيرة هي اللي بتضيف.`,
            how: R`[[repeat(auto-fit, minmax(min(100%, 16rem), 1fr))]] هو أهم سطر في الملف: «حط أعمدة كتير على قد ما يكفي، كل عمود ١٦rem على الأقل، والباقي يتوزع». على 320px عمود واحد، وعلى 600px عمودين، وعلى 900px تلاتة، من غير ولا media query. و [[min(100%, 16rem)]] بيمنع العمود يبقى أعرض من الشاشة لو الشاشة أصغر من ١٦rem.

[[clamp(1.9rem, 5vw + 0.5rem, 3.2rem)]] للعنوان: بيكبر مع الشاشة، بس مبيقلش عن الأول ولا يزيد عن التالت. و [[+ 0.5rem]] بيخلي الـ zoom يشتغل (لو الحجم [[vw]] بس، الـ zoom مش هيكبّره).

المتغيرات في [[:root]] والوضع الغامق بيغيّر قيمها بس. و [[color-scheme: light dark]] بيخلي المتصفح يغيّر ألوان الـ scrollbar والـ form controls كمان.

[[min-height: 70dvh]] للـ hero على الشاشات الكبيرة بس: [[dvh]] بيحسب الارتفاع المتاح فعلًا على الموبايل مع شريط العنوان (درس [[dvh]]).

والـ [[:focus-visible]] بـ outline بلون الـ brand: بيظهر مع الكيبورد بس مش مع الماوس، وفي الوضعين الفاتح والغامق لأنه بيستخدم المتغير.`,
            when: R`بعد ما الـ HTML يخلص. ولو لقيت نفسك بتكتب أكتر من ٣ media queries في صفحة زي دي، غالبًا الـ grid يقدر يعمل الشغل لوحده.`,
            mistakes: R`[[width: 1200px]] على container، فالموبايل يعمل scroll. أو [[height]] ثابت على كارت فالنص يخرج برّه لما يتقلب لعربي أو يكبر. أو ألوان مكتوبة في ٢٠ مكان بدل متغيرات، فالوضع الغامق يبقى مستحيل. أو [[outline: none]] من غير بديل. أو تجرّب على 375px بس (iPhone) وتنسى 320px. وفي الانترفيو: «mobile-first ولا desktop-first؟» mobile-first، لأن الموبايل هو الحالة الأبسط، و [[min-width]] بيضيف بدل ما [[max-width]] يلغي.`
          },
          teach: R`## الفكرة: الموبايل هو الأساس، والشاشة الكبيرة بتضيف

المثال ١٢ سطر من [[site/styles.css]]: الأقسام، والـ hero، والزراير، والكروت. هنفكهم سطر سطر، وبعدين نقيس الصفحة الحقيقية على ٦ عروض من 320px لـ 1440px ونشوف الأرقام اتحسبت إزاي. القياس اتعمل بـ Playwright و Chrome 154 على الحل المرجعي كامل، بـ [[getComputedStyle]] (القيمة اللي المتصفح حسبها فعلًا).

---

## ١. المتغيرات الأول (من الـ solCode)

المثال بيستخدم [[var(--space)]] و [[var(--brand)]]، ودول متعرّفين فوق في [[:root]]:

~~~text styles.css
:root {
  --brand: #0b6e4f;
  --brand-text: #ffffff;
  --radius: 12px;
  --space: clamp(1rem, 3vw, 2rem);
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #11161c; --text: #eef1f4; --brand: #4cc79a; --brand-text: #0b1a14; ... }
}
~~~

- [[:root]] هو [[html]]، فأي متغير عليه موجود في الصفحة كلها.
- [[--brand]]: أي اسم بيبدأ بشرطتين متغير. وبتقراه بـ [[var(--brand)]].
- الوضع الغامق مبيغيّرش ولا قاعدة، بيغيّر **قيم** المتغيرات بس. لما شغّلنا الصفحة بـ [[colorScheme: 'dark']]، المتغيرات بقت: [[--bg=#11161c --brand=#4cc79a --brand-text=#0b1a14]].

والتباين (contrast ratio) اتحسب بمعادلة WCAG، والحد لـ AA في النص العادي 4.5:

| اللون | على | النسبة |
|---|---|---|
| [[--brand]] الفاتح #0b6e4f | الخلفية #fffdf8 | 6.15 |
| أبيض | زرار #0b6e4f | 6.25 |
| [[--brand]] الغامق #4cc79a | الخلفية #11161c | 8.61 |
| #0b6e4f لو فضل زي ما هو في الغامق | #11161c | **2.91** ✗ |

السطر الأخير هو ليه الوضع الغامق لازم يغيّر لون الـ brand نفسه، مش الخلفية بس.

## ٢. الأقسام

~~~text
main > section { padding: var(--space); max-width: 70rem; margin-inline: auto; }
~~~

- [[main > section]]: أي [[section]] ابن مباشر لـ [[main]] ([[>]] = ابن مباشر، مش حفيد).
- [[padding: var(--space)]]: والـ [[--space]] نفسه [[clamp(1rem, 3vw, 2rem)]]: ٣٪ من عرض الشاشة، بس مش أقل من 16px ولا أكتر من 32px.
- [[max-width: 70rem]]: 70 × 16 = 1120px أقصى عرض، عشان السطور متبقاش طويلة أوي على شاشة كبيرة.
- [[margin-inline: auto]]: المسافة يمين وشمال أوتوماتيك = القسم في النص. [[inline]] = اتجاه السطر، فبيشتغل في العربي والإنجليزي.

## ٣. الـ hero

~~~text
.hero { display: grid; gap: var(--space); align-items: center; }
.hero p { color: var(--muted); font-size: 1.15rem; max-width: 40ch; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1.1fr 1fr; min-height: 70dvh; } }
~~~

- [[display: grid]] من غير [[grid-template-columns]] = عمود واحد. الكلام فوق والصورة تحته. ده الموبايل.
- [[max-width: 40ch]]: [[ch]] = عرض حرف «0» في الخط، فالسطر حوالي ٤٠ حرف، أريح للقراية.
- [[@media (min-width: 48rem)]]: لو الشاشة 48rem (768px) **أو أكتر**، زوّد القواعد دي. ده معنى mobile-first: الشاشة الكبيرة بتضيف.
- [[1.1fr 1fr]]: عمودين، [[fr]] = جزء من المساحة الفاضية. الكلام ١.١ جزء والصورة جزء.
- [[min-height: 70dvh]]: ٧٠٪ من ارتفاع الشاشة المتاح فعلًا ([[dvh]] = dynamic viewport height، بيطرح شريط العنوان في الموبايل).

القياس الحقيقي على ارتفاع 800px:

~~~text grid-template-columns للـ hero
عرض 600px  →  564px                 (عمود واحد)
عرض 768px  →  366.094px 332.812px   (عمودين، min-height 560px)
عرض 1440px →  536.375px 487.625px
~~~

[[560px]] = ٧٠٪ من 800. و 366 ÷ 333 ≈ 1.1، بالظبط النسبة اللي كتبناها.

## ٤. الزرار

~~~text
.btn { display: inline-flex; gap: 0.5rem; align-items: center; min-height: 44px; padding: 0.6rem 1.4rem; border-radius: var(--radius); background: var(--brand); color: var(--brand-text); font-weight: 700; text-decoration: none; border: 2px solid var(--brand); }
.btn-outline { background: transparent; color: var(--brand); }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }
~~~

- [[inline-flex]]: الزرار في السطر زي الكلام، بس جواه flex: [[gap]] بين الكلمة والسهم، و [[align-items: center]] يحطهم على نفس الخط.
- [[min-height: 44px]]: أقل حجم مريح للصباع.
- [[border: 2px solid var(--brand)]] على الزرار المليان كمان: عشان النسخة المفرّغة ([[.btn-outline]]) تبقى بنفس الحجم بالظبط. هي بس بتشيل الخلفية وتغيّر لون الكلام.
- سطر السهم: شرحه في المحطة الجاية.

## ٥. الكروت: أهم سطر

~~~text
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); list-style: none; padding: 0; }
~~~

نفكه من جوه لبرة:

1. [[min(100%, 16rem)]]: الأصغر من عرض الحاوية و 256px. على شاشة 240px مثلًا بيبقى 240، فالعمود ميطلعش برّه.
2. [[minmax(X, 1fr)]]: العمود عرضه X على الأقل، وممكن يكبر لحد جزء متساوي من الفاضي.
3. [[repeat(auto-fit, ...)]]: كرّر العمود ده **على قد ما يكفي** في العرض.
4. [[list-style: none; padding: 0]]: المميزات [[<ul>]]، فشيل النقط والمسافة اللي قبلها. القايمة لسه قايمة لقارئ الشاشة.

النتيجة الحقيقية لقسم المميزات:

~~~text grid-template-columns للكروت
320px  →  288px                          عمود
375px  →  343px                          عمود
600px  →  274px 274px                    عمودين
768px  →  352.969px 352.969px            عمودين
900px  →  271.328px 271.328px 271.344px  تلاتة
1440px →  341.328px 341.328px 341.344px  تلاتة (الحاوية وقفت عند 1120px)
~~~

ليه 600px عمودين؟ العرض المتاح 600 − ١٨ × ٢ padding = 564. عمودين 256 + 16 gap + 256 = 528 بيكفّوا. تلاتة محتاجين 800 مش هيكفّوا. كل ده من غير ولا media query.

## ٦. باقي الكارت

~~~text
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.card h3 { margin-block-start: 0; }
.card ul { padding-inline-start: 1.25rem; }
~~~

- [[margin-block-start]] = [[margin-top]] بس logical: [[block]] = الاتجاه اللي السطور بتنزل فيه (لتحت).
- [[padding-inline-start]]: المسافة في **بداية** السطر. اتقاس: في العربي [[paddingRight: 20px]] و [[paddingLeft: 0px]]، وفي الإنجليزي العكس. نفس السطر.

## ٧. العنوان بـ [[clamp]]

~~~text
h1 { font-size: clamp(1.9rem, 5vw + 0.5rem, 3.2rem); }
~~~

[[clamp(أقل, المفضّل, أكتر)]]. المفضّل [[5vw + 0.5rem]]: ٥٪ من عرض الشاشة + 8px. القياس:

| العرض | 5vw + 8px | الناتج | ليه |
|---|---|---|---|
| 320 | 24px | 30.4px | أقل من الحد الأدنى 1.9rem، فاتثبت عليه |
| 600 | 38px | 38px | بين الحدين |
| 768 | 46.4px | 46.4px | بين الحدين |
| 900 | 53px | 51.2px | أكتر من 3.2rem، فاتثبت عليه |

و [[+ 0.5rem]] مش ديكور: لو المستخدم كبّر الخط في إعدادات المتصفح، [[rem]] بيكبر معاه، و [[vw]] لوحده لأ.

## ٨. التأكد

~~~bash
grep -nE "left|right" site/styles.css
~~~

~~~text الناتج
(مفيش ناتج، و exit code 1 يعني «ملقاش»)
~~~

و [[scrollWidth - clientWidth]] طلع **0** على الستة عروض كلهم.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[:root { --x: ... }]] | الألوان والمسافات في مكان واحد، والغامق بيغيّر القيم بس |
| [[@media (min-width: 48rem)]] | الشاشة الكبيرة بتضيف عمود للـ hero |
| [[repeat(auto-fit, minmax(min(100%, 16rem), 1fr))]] | عدد الأعمدة بيتحسب لوحده: ١ ثم ٢ ثم ٣ |
| [[clamp(1.9rem, 5vw + 0.5rem, 3.2rem)]] | العنوان بيكبر مع الشاشة بين حدين |
| [[margin-inline]] و [[padding-inline-start]] | يمين وشمال من غير ما تكتب يمين وشمال |
| [[min-height: 44px]] | كل حاجة بتتداس كبيرة كفاية للصباع |`,
          lines: [
            R`كل قسم في الـ main: مسافة من متغير، وأقصى عرض، ومتوسّط بـ [[margin-inline: auto]].`,
            R`الـ hero grid، على الموبايل عمود واحد لأن مفيش [[grid-template-columns]].`,
            R`الجملة تحت العنوان: لون أهدى، وسطرها مش أطول من ٤٠ حرف عشان يتقري.`,
            R`من 48rem (768px) وطالع: عمودين، الكلام أعرض شوية من الصورة، وارتفاع ٧٠٪ من الشاشة.`,
            R`الزرار: ٤٤px على الأقل، ولونه من المتغيرات، وليه border عشان الـ outline style يبقى بنفس الحجم.`,
            R`النسخة المفرّغة من الزرار.`,
            R`السهم بيتقلب في الإنجليزي بس. شرحه في المحطة الجاية.`,
            R`أهم سطر: عدد الأعمدة بيتحسب لوحده من العرض. و [[list-style: none]] لأن المميزات [[<ul>]].`,
            R`شكل الكارت.`,
            R`[[margin-block-start]] بدل [[margin-top]]: logical property.`,
            R`المسافة قبل النقط في القايمة، في بداية السطر في الاتجاهين.`
          ],
          sol: R`الـ CSS كامل تحت (حوالي ٥٠ سطر). اتقاس بـ Playwright على Pixel 7 و Desktop Chrome: [[scrollWidth - clientWidth]] = 0 في اللغتين، و axe (قاعدة [[color-contrast]]) نضيف في الفاتح والغامق.

لو [[grep]] طلّع حاجة، غالبًا [[text-align: left]] (خليها [[start]]) أو [[padding-left]] على قايمة (خليها [[padding-inline-start]]) أو [[left]] على الـ skip link (خليها [[inset-inline-start]]).

لو فيه scroll بالعرض ومش عارف مين السبب، في Console: [[[...document.querySelectorAll('*')].filter(e => e.scrollWidth > document.documentElement.clientWidth)]]. أشهر المتهمين: صورة من غير [[max-width: 100%]]، أو لينك طويل من غير مسافات، أو عنصر [[width]] ثابت.

ولو التباين في الوضع الغامق وقع، غالبًا لون الـ brand الغامق (#0b6e4f) فضل زي ما هو على خلفية غامقة. في الحل، الوضع الغامق بيغيّره لـ #4cc79a، ولون الكلام على الزرار بيبقى غامق.`,
          solCode: R`:root {
  --bg: #fffdf8;
  --text: #1d232b;
  --muted: #4a5563;
  --brand: #0b6e4f;
  --brand-text: #ffffff;
  --card: #ffffff;
  --border: #d9dde3;
  --radius: 12px;
  --space: clamp(1rem, 3vw, 2rem);
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #11161c; --text: #eef1f4; --muted: #b8c0ca; --brand: #4cc79a; --brand-text: #0b1a14; --card: #19212a; --border: #2c3845; }
}
:lang(en) { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); line-height: 1.7; }
img { max-width: 100%; height: auto; }
h1, h2, h3 { line-height: 1.25; text-wrap: balance; }
h1 { font-size: clamp(1.9rem, 5vw + 0.5rem, 3.2rem); margin-block: 0 1rem; }
h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 2.2rem); }
a { color: var(--brand); }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }

.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; background: var(--brand); color: var(--brand-text); padding: 0.5rem 1rem; border-radius: var(--radius); }
.skip:focus { top: 1rem; }

.site-header { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; align-items: center; justify-content: space-between; padding: 1rem var(--space); border-block-end: 1px solid var(--border); }
.logo { display: inline-flex; gap: 0.5rem; align-items: center; font-weight: 700; font-size: 1.25rem; color: var(--text); text-decoration: none; }
.site-header ul { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; list-style: none; margin: 0; padding: 0; }
.site-header nav a { display: inline-block; padding: 0.5rem 0.25rem; min-height: 44px; }

main > section { padding: var(--space); max-width: 70rem; margin-inline: auto; }
.hero { display: grid; gap: var(--space); align-items: center; }
.hero p { color: var(--muted); font-size: 1.15rem; max-width: 40ch; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1.1fr 1fr; min-height: 70dvh; } }

.btn { display: inline-flex; gap: 0.5rem; align-items: center; min-height: 44px; padding: 0.6rem 1.4rem; border-radius: var(--radius); background: var(--brand); color: var(--brand-text); font-weight: 700; text-decoration: none; border: 2px solid var(--brand); }
.btn-outline { background: transparent; color: var(--brand); }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }

.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); list-style: none; padding: 0; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.card h3 { margin-block-start: 0; }
.card ul { padding-inline-start: 1.25rem; }
.featured { border: 2px solid var(--brand); }
.price { font-size: 1.5rem; font-weight: 700; }

details { border-block-end: 1px solid var(--border); padding-block: 0.75rem; }
summary { cursor: pointer; font-weight: 700; min-height: 44px; }
.cta { text-align: center; }
.site-footer { padding: var(--space); text-align: center; color: var(--muted); border-block-start: 1px solid var(--border); }

@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`
        },
        {
          cmd: "مشروع ١: الإنجليزي و RTL",
          title: "نفس الـ CSS يشتغل عربي وإنجليزي إزاي؟",
          desc: R`اعمل [[site/en/index.html]]: نفس الهيكل بالظبط، بس [[lang="en" dir="ltr"]] والمحتوى إنجليزي، والمسارات بتبدأ بـ [[../]]. والـ CSS متعدلش فيه غير سطر واحد: السهم.

خلصت يعني: (١) لينك اللغة التانية في الصفحتين بيودي على نفس المكان. (٢) الإنجليزي كله محاذي شمال والعربي يمين، من غير ولا [[if]] في الـ CSS. (٣) الأسهم والأيقونات اللي ليها اتجاه بتتقلب، والباقي (اللوجو، والصور) لأ. (٤) الأرقام والعملة في النص العربي مش متلخبطة. (٥) الخط مناسب لكل لغة.

الدروس: [[lang و dir]] و [[logical properties]] في تاب «HTML و CSS»، ودرس [[i18n و RTL]] في تاب «بناء مشروع كامل» (للمشاريع الأكبر).`,
          example: R`<html lang="en" dir="ltr">
<link rel="stylesheet" href="../styles.css">
<li><a href="../" hreflang="ar" lang="ar">العربية</a></li>
<a class="btn" href="#pricing">Start free <span class="arrow" aria-hidden="true">←</span></a>
<p class="price"><span dir="ltr">49 EGP</span> / الشهر</p>
.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; }
.card ul { padding-inline-start: 1.25rem; }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }
:lang(en) { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }`,
          try: R`اعمل الصفحة الإنجليزي، وافتح الاتنين جنب بعض. دوّر على أي حاجة الاتجاه بتاعها غلط: السهم في الزرار، والنقط في القوايم، ومكان الـ skip link لما ياخد focus. وبعدين اكتب في الصفحة العربي جملة فيها رقم تليفون وسعر بالإنجليزي، وشوف بتتعرض إزاي من غير [[dir="ltr"]] ومعاه.`,
          flag: "script",
          deep: {
            why: R`لو المشروع هيتباع لعميل في المنطقة، هيطلب عربي وإنجليزي في أغلب الحالات. والفرق بين موقع معمول صح وموقع «متقلب» بيبان من أول نظرة: أيقونات في الناحية الغلط، ومسافات لازقة في الحافة الغلط. و logical properties بتخلي التكلفة تقريبًا صفر لو بدأت بيها.`,
            how: R`[[inline-start]] معناها «بداية السطر»: يمين في العربي وشمال في الإنجليزي. [[margin-inline-start]] و [[padding-inline-start]] و [[inset-inline-start]] و [[border-block-end]]، كلهم بيتقلبوا لوحدهم حسب [[dir]] على الـ html. والـ flex والـ grid أصلًا بيمشوا مع الاتجاه.

الحاجة الوحيدة اللي مبتتقلبش لوحدها: الأيقونات اللي ليها اتجاه. السهم [[←]] في العربي معناه «لقدّام»، وفي الإنجليزي لازم يبقى [[→]]. [[scaleX(-1)]] على [[[dir="ltr"]]] بيقلبه. وعليه [[aria-hidden="true"]] لأنه زينة، والزرار اسمه من الكلام.

الأرقام: خوارزمية الـ bidi في المتصفح بتحاول تفهم الاتجاه، بس مع أرقام وعملة لاتيني جوه جملة عربي ممكن ترتيبهم يتلخبط. [[<span dir="ltr">]] حوالين الحتة دي بيحل المشكلة. وفي الحقول (تليفون أو إيميل) [[dir="ltr"]] على الـ input نفسه.

الخط: [[:lang(en)]] بيدّي الإنجليزي خط تاني. والعربي محتاج خط بيدعمه كويس. [[system-ui]] كفاية هنا، ولو هتستخدم خط من برّه شوف درس [[next/font]] أو [[font-display: swap]].`,
            when: R`من أول سطر CSS في أي مشروع ممكن يبقى بلغتين، حتى لو اللغة التانية جاية بعدين.`,
            mistakes: R`ملفين CSS، واحد لكل اتجاه، ويختلفوا مع الوقت. أو [[direction: rtl]] في CSS بدل [[dir]] في HTML (الـ CSS بيغيّر الشكل بس، مش المعنى، وقارئ الشاشة مبيعرفش). أو تقلب كل الأيقونات، بما فيها اللوجو وعلامة ✓. أو [[text-align: right]] على العربي. أو تنسى [[lang]] على لينك «English» فقارئ الشاشة العربي ينطقه «إنجليش» بحروف عربي.`
          },
          teach: R`## الفكرة: الاتجاه بيتكتب مرة واحدة في HTML، والـ CSS بيمشي وراه

المثال ٩ سطور: ٥ HTML من الصفحتين، و ٤ CSS. مفيش ولا سطر فيهم بيقول «لو عربي اعمل كذا» غير سطر السهم. هنفكهم، وبعدين نقيس الصفحتين في Chrome 154 (بـ Playwright على عرض 375px) ونشوف نفس الـ CSS طلّع إيه في كل اتجاه. وفي الآخر تجربة الأرقام جوه جملة عربي، بصورة حقيقية من المتصفح.

---

## ١. سطور الـ HTML

~~~text
<html lang="en" dir="ltr">
~~~

الصفحة الإنجليزي: لغة [[en]] واتجاه شمال ليمين. ده **السطر الوحيد** اللي بيقلب الصفحة كلها.

~~~text
<link rel="stylesheet" href="../styles.css">
~~~

نفس ملف الـ CSS. [[../]] = «اطلع فولدر لفوق»، لأن الصفحة في [[site/en/]] والملف في [[site/]]. ونفس الكلام لكل الصور: [[../img/logo.svg]].

~~~text
<li><a href="../" hreflang="ar" lang="ar">العربية</a></li>
~~~

لينك الرجوع: [[../]] بيودّي على [[site/index.html]]. و [[lang="ar"]] عشان قارئ الشاشة الإنجليزي ينطق «العربية» عربي.

~~~text
<a class="btn" href="#pricing">Start free <span class="arrow" aria-hidden="true">←</span></a>
~~~

نفس الحرف [[←]] في الصفحتين. في العربي السهم اللي على الشمال معناه «لقدّام». الـ CSS هو اللي هيقلبه في الإنجليزي. و [[aria-hidden="true"]] بيشيله من قارئ الشاشة، فاسم اللينك «Start free» بس.

~~~text
<p class="price"><span dir="ltr">49 EGP</span> / الشهر</p>
~~~

ده من الصفحة العربي: الحتة اللاتيني محبوسة في [[dir="ltr"]]. شرحها في الجزء ٤.

## ٢. سطور الـ CSS

~~~text
.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; }
.card ul { padding-inline-start: 1.25rem; }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }
:lang(en) { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }
~~~

- [[inset-inline-start: 1rem]]: ١٦px من **بداية** السطر. [[inset]] = left/right/top/bottom مع بعض، و [[inline-start]] = يمين في RTL وشمال في LTR. و [[top: -4rem]] بيخفيه فوق الشاشة لحد ما ياخد focus.
- [[padding-inline-start]]: المسافة قبل نقط القايمة، في بداية السطر.
- [[[dir="ltr"] .arrow]]: [[[dir="ltr"]]] selector بيطابق أي عنصر عليه الـ attribute ده، يعني الـ [[html]] في الصفحة الإنجليزي، والمسافة بعده = أي [[.arrow]] جواه. و [[scaleX(-1)]] = اعكس العرض، يعني مراية. و [[inline-block]] لازم، لأن [[transform]] مبيشتغلش على [[span]] عادي (inline).
- [[:lang(en)]]: أي عنصر لغته إنجليزي، سواء الصفحة كلها أو لينك «English» جوه الصفحة العربي. بيدّيله Roboto بدل Tahoma.

## ٣. القياس: نفس الـ CSS، اتجاهين

دوسنا Tab مرة (فالـ skip link ظهر)، وقسنا:

| القياس | العربي [[/]] | الإنجليزي [[/en/]] |
|---|---|---|
| [[direction]] المحسوب | rtl | ltr |
| الـ skip link: المسافة من اليمين | 16px | 220px |
| الـ skip link: المسافة من الشمال | 222px | 16px |
| [[padding]] قايمة الكارت يمين / شمال | 20px / 0 | 0 / 20px |
| [[transform]] السهم | none | matrix(-1, 0, 0, 1, 0, 0) |
| [[font-family]] | system-ui, "Segoe UI", Tahoma, sans-serif | system-ui, "Segoe UI", Roboto, sans-serif |
| [[text-align]] الكلام | start | start |

- 16px = 1rem: نفس الرقم، بس من ناحية مختلفة.
- [[matrix(-1, 0, 0, 1, 0, 0)]]: ده [[scaleX(-1)]] بعد ما المتصفح حسبه. أول رقم -1 = العرض معكوس، و 1 التاني = الطول زي ما هو.
- [[text-align: start]] مكتوب مرة، وبيبقى يمين أو شمال حسب [[dir]].

وتبديل اللغة اتجرّب في اختبار Playwright بتاع المحطة الجاية: «English» → [[dir="ltr"]]، و «العربية» → [[lang="ar"]].

## ٤. الأرقام جوه جملة عربي

المتصفح بيرتّب الحروف بخوارزمية اسمها bidi (Unicode Bidirectional Algorithm): الحروف العربي يمين لشمال، واللاتيني شمال ليمين. بس **الأرقام والمسافات والرموز** ملهاش اتجاه قوي، فبتاخد اتجاه اللي حواليها، وهنا بيحصل اللخبطة. حطينا الجمل دي في صفحة RTL وصوّرناها في Chrome:

| اللي في الكود | اللي ظهر على الشاشة |
|---|---|
| [[السعر: 49 EGP / الشهر]] | الحتة اللاتيني ظهرت [[EGP 49]] لو قريتها من الشمال لليمين: العملة قبل الرقم ✗ |
| [[السعر: <span dir="ltr">49 EGP</span> / الشهر]] | [[49 EGP]] ✓ |
| [[اتصل على 0100 123 4567 أو ادفع 49 EGP.]] | رقم التليفون ظهر [[4567 123 0100]] ✗، والسعر [[EGP 49]] ✗ |
| [[اتصل على <span dir="ltr">0100 123 4567</span> أو ...]] | [[0100 123 4567]] ✓ |

اقرا السطر التالت: مجموعات رقم التليفون (0100 و 123 و 4567) كل واحدة سليمة، بس **ترتيبهم** اتعكس، لأن المسافات بينهم أخدت اتجاه الجملة العربي. اللي هيقرا الرقم ده هيتصل بحد تاني. [[<span dir="ltr">]] بيقول للخوارزمية «الحتة دي كلها كتلة واحدة شمال ليمين».

> في الحقول (input) نفس الكلام: [[dir="ltr"]] على حقل الموبايل والإيميل (هتشوفه في مشروع ٣).

---

## الخلاصة

| الحاجة | بتتعمل إزاي |
|---|---|
| اتجاه الصفحة | [[dir]] على [[html]]، مرة واحدة |
| المسافات والمواضع | [[inline-start]] و [[inline-end]] و [[block-start]]، مش left و right و top |
| الأيقونات اللي ليها اتجاه | [[[dir="ltr"] .arrow { transform: scaleX(-1) }]] |
| خط مختلف للغة | [[:lang(en)]] |
| أرقام وعملة وتليفونات جوه عربي | [[<span dir="ltr">]] |
| المسارات في [[en/]] | [[../]] قبل الـ CSS والصور |`,
          lines: [
            R`الصفحة الإنجليزي: نفس الهيكل بلغة واتجاه تانيين.`,
            R`نفس ملف الـ CSS. [[../]] لأن الصفحة في فولدر [[en/]].`,
            R`لينك الرجوع للعربي، و [[lang="ar"]] عشان يتنطق عربي.`,
            R`نفس السهم [[←]] في الملفين، والـ CSS هو اللي بيقلبه.`,
            R`في العربي: العملة والرقم جوه [[dir="ltr"]] عشان ميتلخبطوش.`,
            R`الـ skip link بيبدأ من بداية السطر: يمين في العربي وشمال في الإنجليزي.`,
            R`المسافة قبل النقط في القايمة بتتقلب لوحدها.`,
            R`السطر الوحيد اللي بيعرف الاتجاه: يقلب السهم في الإنجليزي بس.`,
            R`خط مختلف لأي حاجة إنجليزي، في الصفحتين.`
          ],
          sol: R`لو كل حاجة logical من المحطة اللي فاتت، الصفحة الإنجليزي بتشتغل من غير ما تلمس الـ CSS غير سطر السهم. اتجرّبت بـ Playwright: الانتقال من «English» بيخلي [[dir="ltr"]]، ومن «العربية» بيرجّع [[lang="ar"]]، و axe نضيف في الاتنين.

جملة فيها [[اتصل على 0100 123 4567 أو ادفع 49 EGP]] من غير [[dir="ltr"]]: غالبًا هتلاقي «EGP» جت قبل الرقم أو المسافات اتنقلت. معاه بتتعرض صح.

الغلط الشائع في النسخة الإنجليزي: نسيان [[../]] في مسار الصور أو الـ CSS، فالصفحة تطلع من غير تنسيق. وتنسى تغيّر [[aria-label]] على الـ nav للإنجليزي ([[Main]]).`,
          solCode: R`<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Zaker: a study plan that fits your time</title>
  <meta name="description" content="Zaker splits your syllabus over the days you have left and reminds you every day.">
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="logo" href="./"><img src="../img/logo.svg" alt="" width="32" height="32"> Zaker</a>
    <nav aria-label="Main">
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="../" hreflang="ar" lang="ar">العربية</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">A study plan that fits your time</h1>
        <p>Tell Zaker your exam date and syllabus. It splits the work over the days you have left and reminds you every day.</p>
        <a class="btn" href="#pricing">Start free <span class="arrow" aria-hidden="true">←</span></a>
      </div>
      <img src="../img/hero.svg" alt="A weekly planner with subjects spread across the days" width="480" height="360">
    </section>

    <section id="features" aria-labelledby="features-title">
      <h2 id="features-title">What it does</h2>
      <ul class="cards">
        <li class="card"><h3>Automatic split</h3><p>The syllabus is spread over the days by how hard each part is.</p></li>
        <li class="card"><h3>Daily reminder</h3><p>A morning notification with today's tasks only.</p></li>
        <li class="card"><h3>Fell behind?</h3><p>The plan adjusts itself. No starting over.</p></li>
      </ul>
    </section>

    <section id="pricing" aria-labelledby="pricing-title">
      <h2 id="pricing-title">Pricing</h2>
      <div class="cards">
        <article class="card">
          <h3>Free</h3>
          <p class="price">0 EGP</p>
          <ul><li>One subject</li><li>Daily reminder</li></ul>
          <a class="btn btn-outline" href="#signup">Start</a>
        </article>
        <article class="card featured">
          <h3>Pro</h3>
          <p class="price">49 EGP / month</p>
          <ul><li>Unlimited subjects</li><li>Plan adjusts when you fall behind</li></ul>
          <a class="btn" href="#signup">Subscribe</a>
        </article>
      </div>
    </section>

    <section id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">FAQ</h2>
      <details><summary>Does it work offline?</summary><p>Yes, your plan is saved on your phone.</p></details>
      <details><summary>Can I cancel?</summary><p>Any time, from settings, no questions asked.</p></details>
    </section>

    <section id="signup" class="cta" aria-labelledby="signup-title">
      <h2 id="signup-title">Try it free for a week</h2>
      <a class="btn" href="https://app.zaker.example/signup">Create an account</a>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 Zaker · <a href="mailto:hi@zaker.example">hi@zaker.example</a></p>
  </footer>
</body>
</html>`
        },
        {
          cmd: "مشروع ١: accessibility و Lighthouse",
          title: "تثبت إن الصفحة accessible وسريعة بأرقام إزاي؟",
          desc: R`حوّل شروط الـ spec لاختبارات بتشتغل لوحدها: axe على الصفحتين، وأول Tab على الـ skip link، ومفيش scroll بالعرض، وده على موبايل وديسكتوب. وشغّل Lighthouse بوضع الموبايل على الصفحتين.

خلصت يعني: (١) [[npx playwright test]] أخضر على project الموبايل والديسكتوب. (٢) axe صفر violations بـ tags WCAG 2.2 AA، في الوضع الفاتح والغامق. (٣) Lighthouse موبايل: performance و accessibility و best practices و SEO كلهم ٩٠ أو أكتر. (٤) عملت الاختبار اليدوي من درس «قبل أي مشروع: موبايل وكيبورد وقارئ شاشة».

الدروس: [[npm init playwright]] و [[playwright.config.ts]] و [[getByRole و expect(page)]] و [[@axe-core/playwright]] و [[Lighthouse CI]] في تاب «فحص الكود»، و [[axe و Lighthouse]] و [[WCAG 2.2]] في تاب «HTML و CSS».`,
          example: R`import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const path of ['/', '/en/']) {
  test($__btno axe violations on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
  })

  test($__btno horizontal scroll on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}`,
          try: R`[[npm init -y]] و [[npm i -D @playwright/test @axe-core/playwright serve]] و [[npx playwright install chromium]]. اكتب [[playwright.config.ts]] بـ project للموبايل (Pixel 7) وواحد للديسكتوب، و [[webServer]] بيشغّل [[npx serve -l 4173 site]]. اكتب ٤ اختبارات: axe على الصفحتين، ومفيش scroll بالعرض، وأول Tab على الـ skip link، وتبديل اللغة رايح جاي. وبعدين شغّل Lighthouse على الصفحتين وسجّل الأرقام في الـ README.`,
          flag: "script",
          deep: {
            why: R`الـ accessibility اللي مش متختبرة بتقع في أول تعديل. حد بيغيّر لون الزرار فالتباين يقع، أو يحط [[div]] جديد قبل الـ skip link. الاختبار بيمسك ده في الـ PR بدل ما يمسكه مستخدم. و Lighthouse رقم واحد تقدر تحطه في الـ README وتدافع عنه.`,
            how: R`[[withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])]] بيحصر axe في قواعد WCAG لحد مستوى AA، وده المستوى اللي أغلب القوانين والشركات بتطلبه. والـ [[expect]] بيقارن بقايمة أسماء القواعد وعدد العناصر ([[color-contrast: 3]])، فلو فشل رسالة الفشل بتقولك المشكلة على طول، بدل object كبير.

الـ scroll بالعرض: [[scrollWidth - clientWidth]] على الـ [[documentElement]]. لو أكبر من صفر، فيه حاجة أعرض من الشاشة.

الـ [[for]] برّه الـ [[test]] بيعمل نسخة من كل اختبار لكل صفحة، وكل نسخة ليها اسم مختلف في التقرير. ومع projects الموبايل والديسكتوب، الاختبار الواحد بيشتغل ٤ مرات.

اختبار الوضع الغامق ملف لوحده فيه [[test.use({ colorScheme: 'dark' })]]، وبيشغّل قاعدة [[color-contrast]] بس، على الصفحتين. الإنجليزي مهمة هنا بالذات: في تجربتنا axe 4.13 مفحصش تباين النص العربي الصافي خالص (لا نجح ولا فشل)، وفحص النص اللي فيه حروف لاتيني أو أرقام بس.

Lighthouse: [[npx lighthouse URL]] بيشتغل بوضع الموبايل افتراضيًا (throttling للشبكة والـ CPU). شغّله على [[npx serve]] مش على ملف [[file://]]. وعشان يبقى شرط في كل PR، [[@lhci/cli]] بـ [[lighthouserc.json]] (درس [[Lighthouse CI]]).`,
            when: R`في آخر المشروع كمحطة، بس الأحسن تكتب اختبار axe بدري وتسيبه شغال وانت بتكتب الـ CSS.`,
            mistakes: R`[[expect(results.violations).toEqual([])]] من غير map، فالفشل يطبع ٢٠٠ سطر JSON. أو تختبر الديسكتوب بس. أو تحط [[disableRules(['color-contrast'])]] عشان الاختبار يعدّي. أو تعتبر axe أخضر يعني الموقع accessible (هو بيمسك جزء بس، والباقي يدوي). أو [[reuseExistingServer: true]] دايمًا فالاختبار يشتغل على سيرفر قديم أو على حاجة تانية خالص شغالة على نفس البورت (حصلت لنا وانا بجرّب الحل: ٦ اختبارات وقعت لأن بورت 4173 كان عليه سيرفر مشروع تاني).`
          },
          teach: R`## الفكرة: كل شرط في الـ spec يبقى اختبار بيقع لوحده

المثال اختبارين لكل صفحة: axe، ومفيش scroll بالعرض. والحل فيه الـ config، واختبار الـ skip link، وتبديل اللغة، والوضع الغامق. هنفك المثال سطر سطر، وبعدين الـ config، ونشغّل الكل، ونشوف شكل الفشل لما نبوّظ لون. اتشغّل بـ Playwright 1.64 و @axe-core/playwright (axe 4.13) و Lighthouse 13.5 على Windows 11. الفرق الوحيد عن الحل: زوّدنا [[channel: 'chrome']] في الـ config عشان يستخدم Chrome المتسطب بدل ما ينزّل Chromium، وغيّرنا البورت لـ 6035 لأن 4173 ممكن يبقى مشغول.

---

## ١. الاستيراد

~~~text tests/a11y.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
~~~

- [[test]]: بتعرّف اختبار، وبتدّيله [[page]] (تابة متصفح جديدة نضيفة لكل اختبار).
- [[expect]]: التأكيدات. اللي على [[page]] أو locator بتستنى لوحدها لحد ٥ ثواني.
- [[AxeBuilder]]: بيحقن axe في الصفحة ويشغّله ويرجّع النتايج.

## ٢. اختبارات لكل صفحة: [[for]] برّه [[test]]

~~~text
for (const path of ['/', '/en/']) {
  test($__btno axe violations on $__{path}$__bt, async ({ page }) => {
~~~

الـ [[for]] بيلف وقت **تعريف** الاختبارات، فبيعرّف اختبارين باسمين مختلفين: [[no axe violations on /]] و [[no axe violations on /en/]]. والاسم المختلف مهم: لو اتنين اختبارات ليهم نفس الاسم في نفس الملف، Playwright بيرفض يشتغل خالص: [[Error: duplicate test title "same name", first declared in dup.spec.ts:2]]. و [[async ({ page })]]: الاختبار دالة async، و [[{ page }]] destructuring بياخد الـ page من الـ fixtures.

## ٣. axe

~~~text
    await page.goto(path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
~~~

- [[page.goto(path)]]: [[path]] نسبي، فبيتلزق في [[baseURL]] من الـ config.
- [[withTags([...])]]: قواعد axe ليها tags. [[wcag2a]] و [[wcag2aa]] = WCAG 2.0 مستوى A و AA، و [[wcag21aa]] و [[wcag22aa]] = اللي اتضاف في 2.1 و 2.2. كده بنشغّل قواعد WCAG لحد AA بس، من غير قواعد «best practice» الزيادة.
- [[analyze()]]: شغّل. بترجّع object فيه [[violations]] و [[passes]] و [[incomplete]] (حاجات axe مقدرش يحكم عليها).
- [[map(v => ...)]]: كل violation يتحوّل لنص قصير: اسم القاعدة وعدد العناصر. ليه؟ شوف الجزء ٧.

## ٤. الـ scroll بالعرض

~~~text
  test($__btno horizontal scroll on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
~~~

- [[page.evaluate(() => ...)]]: الدالة دي بتتنفذ **جوه المتصفح**، والناتج بيرجع للاختبار.
- [[documentElement]] = عنصر [[html]]. [[scrollWidth]] = عرض المحتوى كله، و [[clientWidth]] = العرض الظاهر. لو المحتوى أعرض، الفرق موجب = فيه scroll بالعرض.

## ٥. الـ config

~~~text playwright.config.ts
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: { command: 'npx serve -l 4173 site', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI },
})
~~~

| الإعداد | معناه |
|---|---|
| [[testDir]] | فين الاختبارات |
| [[baseURL]] | اللي [[page.goto('/')]] بيتلزق فيه |
| [[projects]] | كل اختبار بيشتغل مرة لكل project. [[...devices['Pixel 7']]] بيفرد إعدادات الجهاز: 412×839 و touch و موبايل، و [[Desktop Chrome]] = 1280×720 |
| [[webServer.command]] | Playwright بيشغّل السيرفر ده قبل الاختبارات ويقفله بعدها |
| [[webServer.url]] | بيستنى لحد ما اللينك ده يرد قبل ما يبدأ |
| [[reuseExistingServer: !process.env.CI]] | على جهازك: لو فيه سيرفر شغال على البورت استخدمه. في CI (المتغير [[CI]] موجود): لأ، شغّل واحد جديد |

## ٦. التشغيل

~~~bash
npx playwright test --reporter=list
~~~

~~~text الناتج
  ok 3 [mobile] › tests\a11y.spec.ts:5:7 › no axe violations on / (1.6s)
  ok 1 [desktop] › tests\a11y.spec.ts:5:7 › no axe violations on / (1.7s)
  ok 5 [mobile] › tests\a11y.spec.ts:11:7 › no horizontal scroll on / (447ms)
  ...
  ok 11 [mobile] › tests\a11y.spec.ts:18:5 › skip link is the first Tab stop and moves focus to main (414ms)
  ok 13 [mobile] › tests\a11y.spec.ts:27:5 › language switch links both ways (721ms)

  16 passed (8.1s)
~~~

١٦ = (٤ اختبارات المثال + skip link + تبديل اللغة + ٢ غامق) × ٢ projects. و [[:5:7]] = السطر والعمود اللي الاختبار متعرّف فيه.

## ٧. شكل الفشل

غيّرنا [[--brand]] لـ [[#7fd1b0]] (أخضر فاتح، تباينه على الخلفية 1.77 والمطلوب 4.5) وشغّلنا:

~~~text الناتج
  1) [mobile] › tests\a11y.spec.ts:5:7 › no axe violations on / ───
    Error: expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 3

    - Array []
    + Array [
    +   "color-contrast: 1",
    + ]
~~~

- [[- Expected]] اللي كنا مستنيينه (قايمة فاضية)، و [[+ Received]] اللي جه.
- [[color-contrast: 1]]: قاعدة التباين، عنصر واحد. سطر واحد بيقولك المشكلة. من غير الـ [[map]]، نفس الفشل بيطبع الـ violation كامل بـ JSON (الـ helpUrl والـ html والـ target لكل عنصر)، وده اللي كان بيحصل في الاختبار الغامق في نسخة قديمة من الحل.

وعلى [[/en/]] نفس اللون طلّع [[color-contrast: 9]]: كل اللينكات والزراير. ليه العربي ١ بس؟ فتحنا النتيجة: العنصر الوحيد في الصفحة العربي كان لينك «English». جرّبنا صفحة فيها ٣ جمل بنفس اللون الفاتح:

~~~text الناتج من axe 4.13
violations: ["Light English", "المميزات 49"]
~~~

الجملة العربي الصافية مش في النتيجة خالص (لا violation ولا pass)، والجملة اللي فيها رقم اتفحصت. يعني axe في تجربتنا **مبيفحصش تباين النص العربي الصافي**. عشان كده الحل بيشغّل التباين على الصفحتين، والإنجليزي هي اللي بتمسك، والعين بتراجع العربي.

## ٨. الاختبارين اللي فاضلين (من الـ solCode)

~~~text
await page.keyboard.press('Tab')
await expect(page.getByRole('link', { name: 'اتخطى للمحتوى' })).toBeFocused()
await page.keyboard.press('Enter')
await expect(page).toHaveURL(/#main$/)
~~~

- [[keyboard.press('Tab')]]: Tab حقيقي من أول الصفحة.
- [[getByRole('link', { name })]]: دوّر على العنصر زي ما قارئ الشاشة بيشوفه: دور (link) واسم. لو الاسم اتغير أو العنصر بقى [[div]]، الاختبار يقع.
- [[toBeFocused()]]: هو اللي عليه الـ focus؟
- [[toHaveURL(/#main$/)]]: اللينك اشتغل، و [[$]] = آخر الـ URL.

واختبار اللغة بيدوس «English» ويتأكد إن [[html]] بقى [[dir="ltr"]]، ويدوس «العربية» ويتأكد إنه رجع [[lang="ar"]].

## ٩. Lighthouse

~~~bash
npx lighthouse http://localhost:4173/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=lh-ar.json
~~~

~~~text الناتج (من ملف الـ JSON، الصفحتين)
/     performance=100 accessibility=100 best-practices=100 seo=100   FCP 0.8 s  LCP 0.9 s  CLS 0  TBT 0 ms
/en/  performance=100 accessibility=100 best-practices=100 seo=100   FCP 0.8 s  LCP 0.9 s  CLS 0  TBT 0 ms
~~~

١٠٠ في الأربعة لأن الصفحة HTML و CSS وصورتين SVG، والصور ليها [[width]] و [[height]] (CLS = 0)، ومفيش JS (TBT = 0).

---

## الخلاصة

| الشرط | الاختبار |
|---|---|
| axe صفر violations | [[AxeBuilder.withTags([...]).analyze()]] و [[map]] للرسالة |
| مفيش scroll بالعرض | [[scrollWidth - clientWidth <= 0]] |
| أول Tab على الـ skip link | [[keyboard.press('Tab')]] و [[toBeFocused()]] |
| الوضع الغامق | [[test.use({ colorScheme: 'dark' })]] و [[withRules(['color-contrast'])]] على الصفحتين |
| موبايل وديسكتوب | [[projects]] في الـ config |
| Lighthouse ٩٠+ | [[npx lighthouse]] على السيرفر مش [[file://]] |

- axe بيمسك جزء بس، وفي تجربتنا مبيفحصش تباين العربي الصافي. الاختبار اليدوي لسه شرط.`,
          lines: [
            R`أدوات Playwright للاختبار والتأكيد.`,
            R`axe جوه Playwright.`,
            R`نفس الاختبارات للصفحتين، كل واحدة بلفّة.`,
            R`اسم الاختبار فيه المسار، فالتقرير يقولك أنهي صفحة وقعت.`,
            R`افتح الصفحة على الـ baseURL.`,
            R`شغّل axe بقواعد WCAG لحد 2.2 AA بس.`,
            R`قارن بقايمة فاضية من «القاعدة: عدد العناصر»، عشان رسالة الفشل تبقى مقروءة.`,
            R`قفلة الاختبار الأول.`,
            R`الاختبار التاني لنفس الصفحة: مفيش scroll بالعرض.`,
            R`افتح الصفحة.`,
            R`الفرق بين عرض المحتوى وعرض الشاشة.`,
            R`لازم صفر أو أقل.`,
            R`قفلة الاختبار.`,
            R`قفلة الـ [[for]].`
          ],
          sol: R`النتيجة اللي وصلنالها بالحل المرجعي: ١٢ اختبار في [[a11y.spec.ts]] (٦ لكل project) و ٤ في [[dark.spec.ts]] (الصفحتين في كل project)، كلهم [[passed]]. و Lighthouse 13 بوضع الموبايل على الصفحتين: [[performance=100 accessibility=100 best-practices=100 seo=100]].

لو اختبار الـ skip link وقع بـ [[element(s) not found]] أو مش focused: يا إما فيه عنصر بيتداس قبله (لينك في header قبله)، يا إما الـ skip link [[display: none]] (مبياخدش focus خالص). الحل يخفيه برّه الشاشة بـ [[top: -4rem]] ويرجّعه في [[:focus]].

لو Lighthouse performance أقل من ٩٠ على الصفحة دي، اتأكد إنك مش على dev server، وإن الصور ليها [[width]] و [[height]]. و SEO أقل من ١٠٠ غالبًا [[meta description]] ناقصة أو لينك نصه «اضغط هنا».`,
          solCode: R`// ── playwright.config.ts ──
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: { command: 'npx serve -l 4173 site', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI },
})

// ── tests/a11y.spec.ts ──
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const path of ['/', '/en/']) {
  test($__btno axe violations on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
  })

  test($__btno horizontal scroll on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('skip link is the first Tab stop and moves focus to main', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'اتخطى للمحتوى' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test('language switch links both ways', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await page.getByRole('link', { name: 'English' }).click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await page.getByRole('link', { name: 'العربية' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
})

// ── tests/dark.spec.ts ──
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test.use({ colorScheme: 'dark' })
for (const path of ['/', '/en/']) {
  test($__btdark mode has enough contrast on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const r = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
    expect(r.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
  })
}`
        },
        {
          cmd: "مشروع ١: النشر والـ README",
          title: "ترفع الصفحة على لينك حقيقي وتكتب README يتقري إزاي؟",
          desc: R`ارفع [[site/]] على GitHub Pages بـ workflow: كل push على main بيشغّل الاختبارات، ولو عدّت بيرفع. واكتب README فيه اللينك وصورة من الموبايل.

خلصت يعني: (١) اللينك شغال من الموبايل، و [[/en/]] شغال. (٢) push فيه اختبار واقع مبيرفعش. (٣) README فيه: جملة المشروع بيعمل إيه، واللينك، وصورة حقيقية، وإزاي تشغّله وتختبره، و Lighthouse، و «اللي اتعلمته». (٤) [[node scripts/done-check.mjs]] من الدرس الأول أخضر.

الدروس: [[ci.yml]] و [[uses و run]] في تاب «GitHub Actions»، و [[playwright screenshot]] في تاب «Console» للصورة.`,
          example: R`  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5`,
          try: R`في إعدادات الـ repo على GitHub: Pages، وخلي الـ Source «GitHub Actions». اعمل الـ workflow، واعمل push، واستنى لحد ما اللينك يشتغل. وبعدين غيّر لون الـ brand لحاجة التباين بتاعها ضعيف (زي #7fd1b0 على أبيض) واعمل push: الـ deploy مش لازم يحصل. رجّع اللون. وصوّر الصفحة على الموبايل بـ [[npx playwright screenshot --device="Pixel 7" URL docs/mobile-ar.png]] وحطها في الـ README.`,
          flag: "script",
          deep: {
            why: R`مشروع من غير لينك live بيتعامل كأنه مش موجود: محدش هيعمل clone ويشغّل. والـ README هو الـ landing page بتاعة الـ repo. واللي بيراجع بيقرا أول ٥ سطور ويبص على الصورة ويدوس اللينك، في أقل من دقيقة.`,
            how: R`الـ workflow فيه job للاختبار و job للنشر، و [[needs: test]] بيخلي النشر يستنى الاختبار ينجح. الـ [[permissions]] على مستوى الـ workflow: [[pages: write]] و [[id-token: write]] دول اللي [[deploy-pages]] محتاجهم عشان يرفع من غير token تحطه انت.

[[upload-pages-artifact]] بياخد فولدر [[site]] بس، مش الـ repo كله، فالـ tests والـ docs مبيترفعوش. و [[deploy-pages]] بيرفعه وبيطلّع الرابط في [[steps.deployment.outputs.page_url]]، والرابط ده بيظهر في صفحة الـ Actions وفي الـ environment.

GitHub Pages بيخدم على [[https://USER.github.io/REPO/]]. الروابط النسبية في الحل ([[en/]] و [[../]] و [[styles.css]]) بتشتغل تحت أي مسار. لو كنت كاتب [[/styles.css]] بشرطة في الأول، هتدوّر على الملف في جذر الدومين وتقع.

الصورة: [[npx playwright screenshot --device="Pixel 7" --full-page URL file.png]]. صورة موبايل حقيقية أحسن من الديسكتوب لأنها بتثبت إن الموبايل اتعمل.`,
            when: R`أول ما الـ HTML يبقى فيه حاجة تتشاف، مش في الآخر. أول deploy بدري بيطلّع مشاكل المسارات وهي لسه صغيرة.`,
            mistakes: R`رفع الـ repo كله (فيه tests و node_modules لو اترفعوا). أو مسارات بتبدأ بـ [[/]] فتشتغل على [[localhost]] وتقع على Pages. أو الـ workflow بيرفع حتى لو الاختبارات واقعة. أو README فيه صورة ديسكتوب بس، أو صورة معمولة قبل آخر تعديل. أو تنسى تغيّر الـ Source في الإعدادات فالـ deploy job يقع بـ [[Get Pages site failed]].`
          },
          teach: R`## الفكرة: job بيختبر، و job بيرفع فولدر [[site]] بس لو الاختبار عدّى

المثال هو job النشر من [[.github/workflows/pages.yml]]، والـ solCode فيه الملف كامل والـ README. هنفك الـ workflow سطر سطر، وبعدين صورة الموبايل للـ README، وبعدين الـ README نفسه.

> النشر الفعلي على GitHub Pages محتاج repo على GitHub، فشكل التشغيل هناك مكتوب من وثايق GitHub Actions و Pages. اللي اتجرّب هنا: الملف اتقرا كـ YAML سليم (بـ PyYAML)، وأرقام نسخ الـ actions اتأكدنا منها من آخر release لكل واحدة (أكتوبر ٢٠٢٦: checkout v7.0.1، و setup-node v7.1.0، و configure-pages v6.0.0، و upload-pages-artifact v5.0.0، و deploy-pages v5.0.1)، والاختبارات اللي الـ workflow بيشغّلها اتشغّلت محليًا، والصورة اتصوّرت فعلًا.

---

## ١. أول الملف: إمتى والصلاحيات

~~~text .github/workflows/pages.yml
name: pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write
~~~

- [[name]]: الاسم اللي بيظهر في تاب Actions.
- [[on: push: branches: [main]]]: اشتغل مع كل push على main بس. الـ PRs والـ branches التانية لأ.
- [[permissions]]: الـ token اللي GitHub بيدّيه للـ workflow يقدر يعمل إيه:
  - [[contents: read]]: يقرا الكود وبس.
  - [[pages: write]]: يرفع على Pages.
  - [[id-token: write]]: يطلب token مؤقت (OIDC) يثبت بيه لـ Pages إن الـ workflow ده هو اللي بيرفع. ده اللي بيخليك متحطش أي سر بإيدك.

## ٢. job الاختبار

~~~text
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
~~~

- [[jobs]]: الشغل، وكل job جهاز جديد نضيف. و [[test]] اسم الـ job.
- [[runs-on: ubuntu-latest]]: لينكس من GitHub.
- [[uses]]: استخدم action جاهز. [[@v7]] رقم النسخة الكبيرة.
- [[actions/checkout]]: هات الكود على الجهاز. من غيره الجهاز فاضي.
- [[setup-node]] بـ [[node-version: 22]]: سطّب Node 22.
- [[npm ci]]: سطّب الـ dependencies من [[package-lock.json]] بالظبط (أسرع وأدق من [[npm i]] في CI).
- [[playwright install --with-deps chromium]]: نزّل Chromium ومكتبات لينكس اللي محتاجها.
- [[npx playwright test]]: الـ ١٦ اختبار. والمتغير [[CI]] موجود على GitHub، فـ [[reuseExistingServer]] بيبقى [[false]] وبيشغّل [[serve]] جديد.

## ٣. job النشر (المثال)

~~~text
  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
~~~

- [[needs: test]]: متبدأش غير لما [[test]] **ينجح**. لو وقع، [[deploy]] بيتعلّم «skipped». ده الشرط «push فيه اختبار واقع مبيرفعش».
- [[environment]]: GitHub بيسجّل كل نشر في environment اسمه [[github-pages]]، وبيظهر في صفحة الـ repo جنب الرابط.
- [[url: $__{{ ... }}]]: [[$__{{ }}]] صيغة GitHub Actions للقيم وقت التشغيل. [[steps.deployment.outputs.page_url]] = الـ output اسمه [[page_url]] من الخطوة اللي [[id]] بتاعها [[deployment]] (تحت).

~~~text
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5
~~~

| الخطوة | بتعمل إيه |
|---|---|
| [[checkout]] | الكود تاني (job جديد = جهاز جديد) |
| [[configure-pages]] | بيقرا إعدادات Pages للـ repo ويتأكد إنه متفعّل. لو الـ Source مش «GitHub Actions»، هنا بيقع |
| [[upload-pages-artifact]] بـ [[path: site]] | بيضغط فولدر [[site]] **بس** في artifact. الـ tests و docs و [[node_modules]] مبيترفعوش |
| [[deploy-pages]] بـ [[id: deployment]] | بياخد الـ artifact ويحطه على Pages، وبيطلّع [[page_url]] |

الملف كله اتقرا بـ PyYAML عشان نتأكد إن الـ indentation سليم:

~~~text الناتج
jobs: ['test', 'deploy']
deploy.needs: test
permissions: {'contents': 'read', 'pages': 'write', 'id-token': 'write'}
~~~

والرابط النهائي (من الوثايق): [[https://USER.github.io/REPO/]]. عشان كده كل المسارات في الـ HTML نسبية: [[styles.css]] تحت [[/REPO/]] بيلاقي [[/REPO/styles.css]]، أما [[/styles.css]] كان هيدوّر في [[https://USER.github.io/styles.css]] ويقع.

---

## ٤. صورة الموبايل

~~~bash
npx playwright screenshot --device="Pixel 7" --full-page http://localhost:4173/ docs/mobile-ar.png
~~~

- [[playwright screenshot]]: افتح الصفحة وصوّرها من غير ما تكتب اختبار.
- [[--device="Pixel 7"]]: نفس إعدادات الجهاز اللي في الاختبارات.
- [[--full-page]]: الصفحة كلها لحد آخرها، مش اللي ظاهر بس.

اتشغّل (بزيادة [[--channel chrome]] عشان يستخدم Chrome المتسطب):

~~~text الناتج
Navigating to http://localhost:6035/
Capturing screenshot into docs/mobile-ar.png
~~~

والصورة طلعت **1082 × 5993** بكسل، 236KB. ليه 1082 والـ Pixel 7 عرضه 412؟ لأن [[deviceScaleFactor]] بتاعه 2.625: كل بكسل CSS = 2.625 بكسل حقيقي، و 412 × 2.625 = 1081.5 ≈ 1082. صورة حادة زي اللي على الموبايل بالظبط.

## ٥. الـ README

~~~text README.md (أهم حتت)
# ذاكر: landing page بلغتين
صفحة تعريف لتطبيق مذاكرة، بالعربي (RTL) والإنجليزي (LTR)، HTML و CSS بس.
**Live:** https://you.github.io/p1-landing/ · [English](https://you.github.io/p1-landing/en/)
![الصفحة على موبايل بالعربي](docs/mobile-ar.png)
~~~

| الجزء | ليه |
|---|---|
| العنوان وجملة | المشروع إيه في ٥ ثواني |
| [[**Live:**]] ولينك https | أول حاجة بتتداس. وده اللي [[done-check]] بيدوّر عليه |
| [[![وصف](docs/mobile-ar.png)]] | صورة موبايل حقيقية، مسارها نسبي وموجود في الـ repo |
| «اللي اتعمل» بأرقام | Lighthouse 100 مش «سريعة» |
| «تشغيل واختبار» | ٣ أوامر، مش فقرة |
| «اللي اتعلمته» | جملتين من المشروع نفسه، هتقولهم في الانترفيو |

وعشان [[node scripts/done-check.mjs]] يعدّي بند الاختبارات: [[npm init -y]] بيحط [[test]] كده:

~~~text package.json بعد npm init -y
"test": "echo \"Error: no test specified\" && exit 1"
~~~

و [[npm test]] بيطبع [["Error: no test specified"]] ويخرج بـ 1 (جرّبناها). غيّره لـ [["test": "playwright test"]].

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[on: push: branches: [main]]] | يشتغل مع main بس |
| [[permissions: pages: write, id-token: write]] | يرفع من غير سر بتحطه بإيدك |
| [[needs: test]] | مفيش نشر من غير اختبارات عدّت |
| [[upload-pages-artifact]] بـ [[path: site]] | فولدر الموقع بس |
| [[deploy-pages]] بـ [[id: deployment]] | بيرفع وبيطلّع الرابط |
| [[playwright screenshot --device="Pixel 7" --full-page]] | صورة الـ README |

- المسارات النسبية بتشتغل تحت [[/REPO/]]، والمسارات اللي بتبدأ بـ [[/]] لأ.
- في الإعدادات: Pages ← Source ← «GitHub Actions»، مرة واحدة قبل أول push.`,
          lines: [
            R`job النشر.`,
            R`مبيبدأش غير لما job الاختبار ينجح.`,
            R`جهاز Linux جديد من GitHub.`,
            R`environment اسمه [[github-pages]]، وده بيظهر في صفحة الـ repo جنب الرابط.`,
            R`اسمه.`,
            R`الرابط جاي من output الخطوة اللي [[id]] بتاعها [[deployment]].`,
            R`الخطوات.`,
            R`هات الكود.`,
            R`جهّز إعدادات Pages للـ repo.`,
            R`اعمل artifact من فولدر [[site]] بس.`,
            R`الإعدادات بتاعته.`,
            R`الفولدر اللي هيترفع.`,
            R`[[id]] عشان السطر اللي فوق يقرا الرابط منه.`,
            R`ارفع الـ artifact على Pages.`
          ],
          sol: R`بعد أول push، في تاب Actions هتلاقي workflow اسمه [[pages]] فيه job [[test]] وبعده [[deploy]]، وتحت [[deploy]] الرابط. افتحه من الموبايل. ولما اللون اتغير لتباين ضعيف: [[test]] يقع في اختبارات axe: [[color-contrast: 1]] على الصفحة العربي و [[color-contrast: 9]] على الإنجليزي (اتجرّب محليًا بنفس الاختبارات)، و [[deploy]] يبان «skipped».

لو [[deploy]] وقع بـ [[HttpError: Not Found]] أو [[Get Pages site failed]]: الـ Pages مش متفعّل أو الـ Source مش «GitHub Actions». ولو الصفحة طلعت من غير CSS على Pages بس: مسار بيبدأ بـ [[/]].

وعشان [[done-check]] يبقى أخضر: السكربت بيشغّل [[npm test]]، و [[npm init -y]] بيحط [[test]] بيطبع «no test specified» ويخرج بـ 1. خلي [[scripts]] في [[package.json]] فيها [["test": "playwright test"]].

الحل المرجعي فيه الـ workflow كامل وREADME. لاحظ إن الـ README فيه الأرقام، وأوامر التشغيل، وجملتين «اتعلمته» حقيقيين من المشروع نفسه.`,
          solCode: R`# ── .github/workflows/pages.yml ──
name: pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5

# ── README.md ──
# ذاكر: landing page بلغتين

صفحة تعريف لتطبيق مذاكرة، بالعربي (RTL) والإنجليزي (LTR)، HTML و CSS بس.

**Live:** https://you.github.io/p1-landing/ · [English](https://you.github.io/p1-landing/en/)

![الصفحة على موبايل بالعربي](docs/mobile-ar.png)

## اللي اتعمل
- mobile-first، و grid بيتكيف من غير media queries كتير (auto-fit و minmax)
- CSS واحد للغتين بـ logical properties، والسهم بس اللي بيتقلب
- skip link، و landmarks، و headings مرتبة، و alt حقيقي، وتباين في الوضع الفاتح والغامق
- Lighthouse موبايل: 100 / 100 / 100 / 100

## تشغيل واختبار
$__bt$__bt$__btbash
npm ci
npx serve site          # http://localhost:3000
npx playwright test     # axe + keyboard + no horizontal scroll، على موبايل وديسكتوب
$__bt$__bt$__bt

## اللي اتعلمته
- $__btmargin-left$__bt في RTL بيبقى في الناحية الغلط، و $__btmargin-inline-start$__bt بيحل ده
- الـ focus لازم يبان في الوضع الغامق كمان، مش بس الفاتح`
        }
      ]
    }
]);
