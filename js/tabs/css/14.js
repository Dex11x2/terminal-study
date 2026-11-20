// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "CSS: الخلفيات والحدود والألوان",
      l: 1,
      n: "لون وصورة الخلفية ومكانها ومقاسها وأكتر من طبقة، والتدرّجات والنقشات، والحدود في كل ناحية والأركان المدورة، والـ outline والضل وحدود من صورة، وكل طرق كتابة الألوان وخلطها، والفلاتر، والخلط مع اللي ورا، والقص والأقنعة",
      pre: [
        { to: "css/box model", why: R`الخلفية والـ border طبقات من الصندوق، فلازم تبقى عارف المحتوى والـ padding والـ border وبتتحسب إزاي` },
        { to: "css/font-family و font-size", why: R`الوحدة بتبني على [[color]] و [[currentColor]] اللي اتشرحوا هناك` }
      ],
      goal: [
        R`تلوّن أي صندوق والصفحة كلها بـ [[background-color]]، وتحط صورة بـ [[background-image]] و [[url()]] صح (المسار والتنصيص)، ومعاها لون احتياطي يخلّي الكلام مقروء.`,
        R`تتحكم في صورة الخلفية: تكرارها ومكانها ومقاسها ([[cover]] و [[contain]]) وحركتها مع السكرول وفين تبدأ وتتقص، وتكتب المختصرة [[background]] بأكتر من طبقة من غير ما تمسح حاجة، وتعرف إن [[background-position]] مبتتعكسش في العربي.`,
        R`ترسم تدرّجات خطية ودايرية ومخروطية ومتكررة، وتعمل منها نقشات (نقط وشرايط ومربعات) ورسم بياني دايري من غير صور.`,
        R`تكتب الحدود بكل أشكالها في أي ناحية، وبالخصائص المنطقية اللي بتتعكس في العربي، وتدوّر الأركان (دايرة وكبسولة وبيضاوي وركن واحد).`,
        R`تفرّق بين [[border]] و [[outline]] و [[box-shadow]]، وتعمل حلقة focus متهزّش الصفحة، وضل طبيعي، وإطار من صورة بـ [[border-image]].`,
        R`تكتب اللون بأي طريقة (hex و [[rgb()]] و [[hsl()]] و [[oklch()]] و [[color()]])، وتفرّق بين الشفافية في اللون و [[opacity]]، وتطلّع درجات من لون البراند بـ [[color-mix()]] والألوان النسبية.`,
        R`تستخدم [[filter]] و [[backdrop-filter]] و [[mix-blend-mode]] و [[clip-path]] و [[mask]] في تأثيرات حقيقية (منتج خلصان، وnavbar زجاج، وحافة مايلة، وكلام بيتلاشى)، وتعرف أثر كل واحد على الضغط والـ layout.`
      ],
      projects: [
        { lvl: 'صغير', dir: "rokn-cafe", t: R`هيرو بصورة وتدرّج`, what: R`أول جزء من صفحة «قهوة الركن» (كافيه متخيل في ركن شارع): الجزء الكبير اللي فوق (hero) اللي أول ما الزبون يفتح الصفحة يشوفه. [[index.html]] فيه [[<header class="hero">]] جواه عنوان [[<h1>]] «قهوتك محمّصة النهارده الصبح»، وفقرة قصيرة، ولينك [[<a class="cta">]] «شوف المنيو». و [[style.css]] فيه: لون للصفحة كلها على [[body]]، وخلفية للهيرو من **طبقتين** في سطر [[background]] واحد (تدرّج من بني غامق تحت لـ [[transparent]] فوق، وتحته صورة الكوباية SVG اللي في الحل في النص ومغطية ومن غير تكرار، ولون احتياطي [[#78350f]] جوه آخر طبقة)، وزرار أصفر. من دروس «background-color و background-image» و «background-size و background-position» و «linear-gradient و radial-gradient».`, done: R`في Computed على [[.hero]]: [[background-size: auto, cover]] و [[background-repeat: repeat, no-repeat]] و [[background-position: 0% 0%, 50% 50%]] و [[background-color: rgb(120, 53, 15)]] (طبقتين بس، مش تلاتة). والعنوان الأبيض مقروء على تحت الهيرو الغامق. ولو بوّظت مسار الصورة الهيرو يفضل بني والكلام مقروء.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
</body>
</html>
~~~

~~~css style.css
body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: #faf7f2;
  color: #292524;
}

.hero {
  padding: 150px 20px 40px;
  color: white;
  background:
    linear-gradient(to top, #451a03, transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat #78350f;
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: #451a03;
  text-decoration: none;
  font-weight: 700;
  background-color: #fbbf24;
}
~~~

~~~view 330 370 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<style>
body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: #faf7f2;
  color: #292524;
}

.hero {
  padding: 150px 20px 40px;
  color: white;
  background:
    linear-gradient(to top, #451a03, transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat #78350f;
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: #451a03;
  text-decoration: none;
  font-weight: 700;
  background-color: #fbbf24;
}
</style>
</head>
<body>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
</body>
</html>
~~~

**هتشوف إيه:**

- صورة كوباية بخار طالع منها على ترابيزة بني، مالية الهيرو.
- الصورة بتغمق من تحت لحد بني غامق جدًا، والعنوان الأبيض والفقرة قاعدين على الحتة الغامقة.
- زرار «شوف المنيو» أصفر وكلامه بني.
- على 360 (زرار الموبايل فوق المعاينة) الصورة بتتقص من الجنبين ([[cover]]) والكلام لسه على الغامق.

**ليه كده:**

- **التدرّج أول طبقة** (فوق الصورة). من غيره الكلام الأبيض كان هيقع على الكوباية الفاتحة. [[to top]] بيبدأ بالغامق من تحت، والكلام تحت (بسبب [[padding]] فوق 150px).
- **[[center / cover no-repeat]]** للصورة بس. التدرّج ملوش مقاس، فبيتمد على الهيرو لوحده.
- **اللون جوه آخر طبقة** ([[... no-repeat #78350f]]) مش بعد فاصلة لوحده، فالطبقات اتنين بس.
- **[[background-color]] على [[body]]** بيلوّن الشاشة كلها.

**الغلطة الشائعة:** تحط الصورة الأول والتدرّج بعدها: التدرّج هيبقى **تحت** الصورة ومش هيبان.

~~~text القياس من Chrome
.hero   background-size: auto, cover     background-repeat: repeat, no-repeat
        background-position: 0% 0%, 50% 50%     background-color: rgb(120, 53, 15)
.cta    background-color: rgb(251, 191, 36)
body    background-color: rgb(250, 247, 242)
~~~` },
        { lvl: 'صغير', dir: "rokn-cafe", cont: true, t: R`كروت المنيو بحدود وأركان وضل`, what: R`زي المشروع اللي فات (نفس الفولدر والملفين)، وزوّد تحت الهيرو [[<main>]] فيه [[<section id="menu" class="menu">]] بعنوان [[<h2>]] «المنيو» وتلات [[<article class="card">]]: كل كارت فيه [[<div class="pic">]] (رسمة المشروب بالتدرّجات: إسبريسو ولاتيه بـ [[radial-gradient]]، وقهوة ساقعة بشرايط [[repeating-linear-gradient]])، و [[<h3>]] بالاسم، و [[<p>]] بالسعر، ولينك «اطلب». وتحت المنيو [[<blockquote class="quote">]] برأي زبونة. في الـ CSS: الكارت أبيض بحد 1px رمادي فاتح وأركان 14px وضلين، والصورة متقصوصة على الأركان. لينك «اطلب» كبسولة بحد بلون الكلام. حلقة [[:focus-visible]] صفرا بـ [[outline]] على اللينكات. والاقتباس بحد بني على **أول السطر** وأركان مدورة على الناحية التانية بس (منطقي). من دروس «border و border-radius» و «outline و box-shadow».`, done: R`في Computed: [[.card]] حده [[1px]] وأركانه [[14px]] و [[overflow: hidden]] وعليه ضلين، و [[.card a]] أركانه [[999px]] ولون حده نفس لون كلامه، و [[.quote]] [[border-right-width: 4px]] و [[border-left-width: 0px]] وركنه المدوّر فوق **شمال**. ودوس Tab: حلقة صفرا بتظهر حوالين كل لينك من غير ما الكروت تتحرك.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق</h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>٦٥ جنيه</p><a href="#order">اطلب</a></article>
  </section>
  <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
</main>
</body>
</html>
~~~

~~~css style.css
body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: #faf7f2;
  color: #292524;
}

.hero {
  padding: 150px 20px 40px;
  color: white;
  background:
    linear-gradient(to top, #451a03, transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat #78350f;
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: #451a03;
  text-decoration: none;
  font-weight: 700;
  background-color: #fbbf24;
  border-radius: 999px;
}

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #e7e5e4;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid #b45309;
  border-radius: 999px;
  color: #b45309;
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid #fbbf24;
  outline-offset: 3px;
}

.quote {
  margin: 0 20px 32px;
  padding: 12px 16px;
  background-color: #fef3c7;
  border-inline-start: 4px solid #b45309;
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}
~~~

~~~view 1300 1340 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<style>
body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: #faf7f2;
  color: #292524;
}

.hero {
  padding: 150px 20px 40px;
  color: white;
  background:
    linear-gradient(to top, #451a03, transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat #78350f;
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: #451a03;
  text-decoration: none;
  font-weight: 700;
  background-color: #fbbf24;
  border-radius: 999px;
}

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #e7e5e4;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid #b45309;
  border-radius: 999px;
  color: #b45309;
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid #fbbf24;
  outline-offset: 3px;
}

.quote {
  margin: 0 20px 32px;
  padding: 12px 16px;
  background-color: #fef3c7;
  border-inline-start: 4px solid #b45309;
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}
</style>
</head>
<body>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق</h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>٦٥ جنيه</p><a href="#order">اطلب</a></article>
  </section>
  <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- تحت الهيرو عنوان «المنيو» وتلات كروت بيضا فوق بعض، كل كارت مرفوع بضل ناعم.
- فوق كل كارت رسمة: فنجان إسبريسو من فوق، ولاتيه بدواير، وشرايط تلج زرقا.
- لينك «اطلب» كبسولة بحد بني وكلام بني.
- الاقتباس خلفيته كريمي، وخط بني على اليمين، والأركان اللي على الشمال مدورة.
- مع Tab: حلقة صفرا بعيدة 3px عن الزرار.

**ليه كده:**

- **[[overflow: hidden]]** على الكارت: من غيره الرسمة اللي فوق هتطلع مربعة فوق الأركان المدورة (درس «border و border-radius» قسم ٤).
- **ضلين بفاصلة:** صغير حاد للحافة، وكبير ناعم للارتفاع.
- **[[border: 2px solid]] من غير لون** على اللينك: الحد بياخد [[currentColor]]، فلون الحد ولون الكلام سطر واحد.
- **[[border-start-end-radius]] و [[border-end-end-radius]]:** الركنين «عند آخر السطر»، يعني الشمال في العربي، عكس ناحية الحد.
- **[[outline]] مش [[border]]** للـ focus: مبيزقّش حاجة.

**الغلطة الشائعة:** الحد بـ [[border-left]] منقول من تصميم إنجليزي: هيطلع في آخر السطر.

~~~text القياس من Chrome
.card     border-top: 1px rgb(231, 229, 228)   border-top-left-radius: 14px   overflow-x: hidden
          box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 2px 0px, rgba(0, 0, 0, 0.12) 0px 8px 20px 0px
.card a   border-top-left-radius: 999px    color: rgb(180, 83, 9)
.quote    border-right-width: 4px   border-left-width: 0px   border-top-left-radius: 12px   border-top-right-radius: 0px
~~~` },
        { lvl: 'متوسط', dir: "rokn-cafe", cont: true, t: R`لوحة ألوان البراند بـ oklch و color-mix`, what: R`زي المشروع اللي فات، بس الألوان كلها بقت **من لون واحد**. في أول [[style.css]] قاعدة [[:root]] فيها لون البراند [[--brand: oklch(0.555 0.146 49)]] (نفس البني [[#b45309]] بأرقام oklch)، وخمس درجات منه بـ [[color-mix(in oklch, ...)]] (50 و 100 و 300 فاتحين بالأبيض، و 700 و 900 غامقين بالأسود)، ولون أصفر [[--accent]]، ولون للكلام ولون للحدود. (السطور اللي بتبدأ بـ [[--]] اسمها «متغيرات»: بتشيل قيمة، و [[var(--brand)]] بتجيبها. درس «CSS variables» بيشرحها بالتفصيل، هنا بنستخدمها عشان منكتبش نفس اللون عشرين مرة.) وبعدين بدّل كل لون مكتوب بالإيد في الـ CSS بمتغير. وزوّد في الـ HTML قسم [[.palette]] بست مربعات بيعرضوا الدرجات، وقسم [[#join]] غامق فيه فورم النشرة (خانة إيميل، و checkbox، وزرار)، والقسم ده [[color-scheme: dark]] عشان المتصفح يغمّق الخانة، و [[accent-color]] و [[caret-color]] على [[:root]] بلون البراند. من دروس «rgb و hsl و oklch» و «color-mix و currentColor».`, done: R`في Computed: [[body]] خلفيته [[oklch(0.955494 0.0146448 49)]] (البراند + 90٪ أبيض)، و [[.s700]] [[oklch(0.3885 0.1022 49)]]، والدرجات كلها نفس الـ hue (49). خانة الإيميل في القسم الغامق [[background-color: rgb(59, 59, 59)]] من غير ما تكتبلها لون، والـ checkbox [[accent-color]] بني. ولو غيّرت [[--brand]] بس لـ [[oklch(0.55 0.12 160)]] كل درجات البني في الصفحة تبقى درجات أخضر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق</h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>٦٥ جنيه</p><a href="#order">اطلب</a></article>
  </section>
  <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
  <section class="palette">
    <h2>ألوان المحل</h2>
    <span class="sw s50">50</span><span class="sw s100">100</span><span class="sw s300">300</span><span class="sw s500">500</span><span class="sw s700">700</span><span class="sw s900">900</span>
  </section>
  <section id="join" class="join">
    <h2>اشترك في النشرة</h2>
    <form>
      <input type="email" placeholder="إيميلك">
      <label><input type="checkbox" checked> عروض الأسبوع</label>
      <button>اشترك</button>
    </form>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
:root {
  --brand: oklch(0.555 0.146 49);
  --brand-50: color-mix(in oklch, var(--brand), white 90%);
  --brand-100: color-mix(in oklch, var(--brand), white 75%);
  --brand-300: color-mix(in oklch, var(--brand), white 40%);
  --brand-700: color-mix(in oklch, var(--brand), black 30%);
  --brand-900: color-mix(in oklch, var(--brand), black 65%);
  --accent: oklch(0.83 0.16 84);
  --ink: oklch(0.27 0.01 50);
  --line: oklch(0.92 0.005 50);
  accent-color: var(--brand);
  caret-color: var(--brand);
}

body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: var(--brand-50);
  color: var(--ink);
}

.hero {
  padding: 150px 20px 40px;
  color: white;
  background:
    linear-gradient(to top, var(--brand-900), transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat var(--brand-700);
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: var(--brand-900);
  text-decoration: none;
  font-weight: 700;
  background-color: var(--accent);
  border-radius: 999px;
}

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid;
  border-radius: 999px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.quote {
  margin: 0 20px 32px;
  padding: 12px 16px;
  background-color: var(--brand-100);
  border-inline-start: 4px solid var(--brand);
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}

.palette { padding: 0 20px 32px; }
.sw { display: inline-block; width: 15%; padding: 18px 0; text-align: center; font: 12px monospace; }
.s50 { background-color: var(--brand-50); outline: 1px solid var(--line); }
.s100 { background-color: var(--brand-100); }
.s300 { background-color: var(--brand-300); }
.s500 { background-color: var(--brand); color: white; }
.s700 { background-color: var(--brand-700); color: white; }
.s900 { background-color: var(--brand-900); color: white; }

.join {
  padding: 32px 20px;
  background-color: var(--brand-900);
  color: var(--brand-50);
  color-scheme: dark;
}
.join h2 { margin-top: 0; }
.join input[type=email] { display: block; width: 100%; max-width: 320px; box-sizing: border-box; padding: 10px; margin-bottom: 12px; font: inherit; }
.join label { display: block; margin-bottom: 12px; }
.join button {
  padding: 10px 22px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: var(--brand-900);
  background-color: var(--accent);
}
~~~

~~~view 1680 1720 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<style>
:root {
  --brand: oklch(0.555 0.146 49);
  --brand-50: color-mix(in oklch, var(--brand), white 90%);
  --brand-100: color-mix(in oklch, var(--brand), white 75%);
  --brand-300: color-mix(in oklch, var(--brand), white 40%);
  --brand-700: color-mix(in oklch, var(--brand), black 30%);
  --brand-900: color-mix(in oklch, var(--brand), black 65%);
  --accent: oklch(0.83 0.16 84);
  --ink: oklch(0.27 0.01 50);
  --line: oklch(0.92 0.005 50);
  accent-color: var(--brand);
  caret-color: var(--brand);
}

body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: var(--brand-50);
  color: var(--ink);
}

.hero {
  padding: 150px 20px 40px;
  color: white;
  background:
    linear-gradient(to top, var(--brand-900), transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat var(--brand-700);
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: var(--brand-900);
  text-decoration: none;
  font-weight: 700;
  background-color: var(--accent);
  border-radius: 999px;
}

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid;
  border-radius: 999px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.quote {
  margin: 0 20px 32px;
  padding: 12px 16px;
  background-color: var(--brand-100);
  border-inline-start: 4px solid var(--brand);
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}

.palette { padding: 0 20px 32px; }
.sw { display: inline-block; width: 15%; padding: 18px 0; text-align: center; font: 12px monospace; }
.s50 { background-color: var(--brand-50); outline: 1px solid var(--line); }
.s100 { background-color: var(--brand-100); }
.s300 { background-color: var(--brand-300); }
.s500 { background-color: var(--brand); color: white; }
.s700 { background-color: var(--brand-700); color: white; }
.s900 { background-color: var(--brand-900); color: white; }

.join {
  padding: 32px 20px;
  background-color: var(--brand-900);
  color: var(--brand-50);
  color-scheme: dark;
}
.join h2 { margin-top: 0; }
.join input[type=email] { display: block; width: 100%; max-width: 320px; box-sizing: border-box; padding: 10px; margin-bottom: 12px; font: inherit; }
.join label { display: block; margin-bottom: 12px; }
.join button {
  padding: 10px 22px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: var(--brand-900);
  background-color: var(--accent);
}
</style>
</head>
<body>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق</h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>٦٥ جنيه</p><a href="#order">اطلب</a></article>
  </section>
  <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
  <section class="palette">
    <h2>ألوان المحل</h2>
    <span class="sw s50">50</span><span class="sw s100">100</span><span class="sw s300">300</span><span class="sw s500">500</span><span class="sw s700">700</span><span class="sw s900">900</span>
  </section>
  <section id="join" class="join">
    <h2>اشترك في النشرة</h2>
    <form>
      <input type="email" placeholder="إيميلك">
      <label><input type="checkbox" checked> عروض الأسبوع</label>
      <button>اشترك</button>
    </form>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- نفس الصفحة تقريبًا، بس الخلفية بقت كريمي مايل للبيج (درجة 50 من البراند)، والاقتباس درجة 100.
- قسم «ألوان المحل»: ست مربعات من الفاتح جدًا للغامق جدًا، كلهم من نفس البني.
- قسم النشرة بني غامق جدًا، وخانة الإيميل غامقة وكلامها فاتح، وعلامة الـ ✓ بني.

**ليه كده:**

- **كل الدرجات من [[--brand]]:** [[color-mix(in oklch, var(--brand), white 90%)]] وأخواتها. في [[oklch]] الخلط بيحافظ على الدرجة (49 في كل القيم المحسوبة)، فالسلّم كله «بني».
- **[[--brand]] بـ oklch:** عشان لو حبيت تعمل لون مكمّل أو أفتح بالظبط تستخدم الألوان النسبية ([[oklch(from var(--brand) ...)]]).
- **[[color-scheme: dark]]** على القسم الغامق بس: الخانة اتغمقت لوحدها. ولون كلام القسم كتبناه بإيدنا ([[color: var(--brand-50)]]) لأن [[color-scheme]] على قسم مبتغيّرهوش.
- **[[accent-color]] و [[caret-color]] على [[:root]]:** بيتورّثوا لكل الحقول في الصفحة.

**جرّب:** غيّر سطر [[--brand]] بس. الهيرو والكروت واللينكات والاقتباس والنشرة كلهم هيتغيّروا.

~~~text القياس من Chrome
body                  background-color: oklch(0.955494 0.0146448 49)     color: oklch(0.27 0.01 50)
.s100                 oklch(0.888745 0.0365373 49)
.s300                 oklch(0.732998 0.0876199 49)
.s700                 oklch(0.3885 0.1022 49)
.join                 background-color: oklch(0.19425 0.0511 49)    color-scheme: dark
.join input (email)   background-color: rgb(59, 59, 59)    caret-color: oklch(0.555 0.146 49)
.card a               color و border-top-color: oklch(0.555 0.146 49)
~~~` },
        { lvl: 'متوسط', dir: "rokn-cafe", cont: true, t: R`navbar زجاج وهيرو مقصوص ومنتج خلصان`, what: R`زي المشروع اللي فات، وزوّد تأثيرات. في الـ HTML: [[<nav class="nav">]] فوق الهيرو فيه اسم المحل وتلات لينكات. الكارت التالت بقى [[class="card sold-out"]] وكلامه «خلصت النهارده» من غير لينك. والاقتباس بقى جوه [[<section id="about" class="about">]] بعنوان «عننا» وفقرة [[.story]] طويلة عن المحل. في الـ CSS: الـ nav لازق فوق وقت السكرول ([[position: sticky; top: 0]]، درس «sticky و fixed»، و [[z-index: 1]] عشان يفضل فوق الكروت، درس «z-index») وخلفيته أبيض شفاف 60٪ و [[backdrop-filter]] بتغبيش. الهيرو حافته اللي تحت مايلة بـ [[clip-path: polygon()]]. صورة المنتج الخلصان أبيض وأسود بـ [[filter]] (الصورة بس، مش الكارت). والفقرة الطويلة بتتلاشى من تحت بـ [[mask-image]]. من دروس «filter و backdrop-filter» و «mix-blend-mode و clip-path» و «mask».`, done: R`في Computed: [[.nav]] [[backdrop-filter: blur(10px) saturate(1.5)]] وخلفيته [[rgba(255, 255, 255, 0.6)]]، و [[.hero]] [[clip-path: polygon(0px 0px, 100% 0px, 100% 88%, 0px 100%)]]، و [[.sold-out .pic]] [[filter: grayscale(1)]] وكلام الكارت لسه ملوّن، و [[.story]] عليها [[mask-image]] بتدرّج. واعمل سكرول: الكروت بتعدّي تحت الـ nav متغبّشة.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="nav"><b>قهوة الركن</b> <a href="#menu">المنيو</a> <a href="#about">عننا</a> <a href="#join">النشرة</a></nav>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق</h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card sold-out"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>خلصت النهارده</p></article>
  </section>
  <section id="about" class="about">
    <h2>عننا</h2>
    <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
    <p class="story">بدأنا سنة ٢٠١٩ في محل صغير جنب المدرسة، بماكينة واحدة وتلات ترابيزات. كل يوم الصبح كنا بنحمّص كمية صغيرة، ولما تخلص نقفل. الناس بقت تيجي مخصوص، والمحل كبر، وبقى عندنا فرعين. ولسه بنحمّص كل يوم الصبح، ولسه بنقفل لما البن يخلص.</p>
  </section>
  <section class="palette">
    <h2>ألوان المحل</h2>
    <span class="sw s50">50</span><span class="sw s100">100</span><span class="sw s300">300</span><span class="sw s500">500</span><span class="sw s700">700</span><span class="sw s900">900</span>
  </section>
  <section id="join" class="join">
    <h2>اشترك في النشرة</h2>
    <form>
      <input type="email" placeholder="إيميلك">
      <label><input type="checkbox" checked> عروض الأسبوع</label>
      <button>اشترك</button>
    </form>
  </section>
</main>
</body>
</html>
~~~

~~~css style.css
:root {
  --brand: oklch(0.555 0.146 49);
  --brand-50: color-mix(in oklch, var(--brand), white 90%);
  --brand-100: color-mix(in oklch, var(--brand), white 75%);
  --brand-300: color-mix(in oklch, var(--brand), white 40%);
  --brand-700: color-mix(in oklch, var(--brand), black 30%);
  --brand-900: color-mix(in oklch, var(--brand), black 65%);
  --accent: oklch(0.83 0.16 84);
  --ink: oklch(0.27 0.01 50);
  --line: oklch(0.92 0.005 50);
  accent-color: var(--brand);
  caret-color: var(--brand);
}

body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: var(--brand-50);
  color: var(--ink);
}

.hero {
  padding: 150px 20px 60px;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
  color: white;
  background:
    linear-gradient(to top, var(--brand-900), transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat var(--brand-700);
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: var(--brand-900);
  text-decoration: none;
  font-weight: 700;
  background-color: var(--accent);
  border-radius: 999px;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 20px;
  background-color: rgb(255 255 255 / 0.6);
  backdrop-filter: blur(10px) saturate(1.5);
  border-bottom: 1px solid rgb(0 0 0 / 0.06);
}
.nav a { margin-inline-start: 14px; color: var(--ink); text-decoration: none; }

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid;
  border-radius: 999px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.quote {
  margin: 0 0 16px;
  padding: 12px 16px;
  background-color: var(--brand-100);
  border-inline-start: 4px solid var(--brand);
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}

.palette { padding: 0 20px 32px; }
.sw { display: inline-block; width: 15%; padding: 18px 0; text-align: center; font: 12px monospace; }
.s50 { background-color: var(--brand-50); outline: 1px solid var(--line); }
.s100 { background-color: var(--brand-100); }
.s300 { background-color: var(--brand-300); }
.s500 { background-color: var(--brand); color: white; }
.s700 { background-color: var(--brand-700); color: white; }
.s900 { background-color: var(--brand-900); color: white; }

.join {
  padding: 32px 20px;
  background-color: var(--brand-900);
  color: var(--brand-50);
  color-scheme: dark;
}
.join h2 { margin-top: 0; }
.join input[type=email] { display: block; width: 100%; max-width: 320px; box-sizing: border-box; padding: 10px; margin-bottom: 12px; font: inherit; }
.join label { display: block; margin-bottom: 12px; }
.join button {
  padding: 10px 22px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: var(--brand-900);
  background-color: var(--accent);
}

.sold-out .pic { filter: grayscale(1); }
.sold-out p { color: var(--brand-700); font-weight: 700; padding-bottom: 16px; }

.about { padding: 0 20px 32px; }
.about h2 { margin-top: 0; }
.story {
  max-width: 520px;
  max-height: 110px;
  overflow: hidden;
  line-height: 1.8;
  mask-image: linear-gradient(black 45%, transparent);
}
~~~

~~~view 1910 1950 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<style>
:root {
  --brand: oklch(0.555 0.146 49);
  --brand-50: color-mix(in oklch, var(--brand), white 90%);
  --brand-100: color-mix(in oklch, var(--brand), white 75%);
  --brand-300: color-mix(in oklch, var(--brand), white 40%);
  --brand-700: color-mix(in oklch, var(--brand), black 30%);
  --brand-900: color-mix(in oklch, var(--brand), black 65%);
  --accent: oklch(0.83 0.16 84);
  --ink: oklch(0.27 0.01 50);
  --line: oklch(0.92 0.005 50);
  accent-color: var(--brand);
  caret-color: var(--brand);
}

body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: var(--brand-50);
  color: var(--ink);
}

.hero {
  padding: 150px 20px 60px;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
  color: white;
  background:
    linear-gradient(to top, var(--brand-900), transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat var(--brand-700);
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: var(--brand-900);
  text-decoration: none;
  font-weight: 700;
  background-color: var(--accent);
  border-radius: 999px;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 20px;
  background-color: rgb(255 255 255 / 0.6);
  backdrop-filter: blur(10px) saturate(1.5);
  border-bottom: 1px solid rgb(0 0 0 / 0.06);
}
.nav a { margin-inline-start: 14px; color: var(--ink); text-decoration: none; }

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid;
  border-radius: 999px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.quote {
  margin: 0 0 16px;
  padding: 12px 16px;
  background-color: var(--brand-100);
  border-inline-start: 4px solid var(--brand);
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}

.palette { padding: 0 20px 32px; }
.sw { display: inline-block; width: 15%; padding: 18px 0; text-align: center; font: 12px monospace; }
.s50 { background-color: var(--brand-50); outline: 1px solid var(--line); }
.s100 { background-color: var(--brand-100); }
.s300 { background-color: var(--brand-300); }
.s500 { background-color: var(--brand); color: white; }
.s700 { background-color: var(--brand-700); color: white; }
.s900 { background-color: var(--brand-900); color: white; }

.join {
  padding: 32px 20px;
  background-color: var(--brand-900);
  color: var(--brand-50);
  color-scheme: dark;
}
.join h2 { margin-top: 0; }
.join input[type=email] { display: block; width: 100%; max-width: 320px; box-sizing: border-box; padding: 10px; margin-bottom: 12px; font: inherit; }
.join label { display: block; margin-bottom: 12px; }
.join button {
  padding: 10px 22px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: var(--brand-900);
  background-color: var(--accent);
}

.sold-out .pic { filter: grayscale(1); }
.sold-out p { color: var(--brand-700); font-weight: 700; padding-bottom: 16px; }

.about { padding: 0 20px 32px; }
.about h2 { margin-top: 0; }
.story {
  max-width: 520px;
  max-height: 110px;
  overflow: hidden;
  line-height: 1.8;
  mask-image: linear-gradient(black 45%, transparent);
}
</style>
</head>
<body>
<nav class="nav"><b>قهوة الركن</b> <a href="#menu">المنيو</a> <a href="#about">عننا</a> <a href="#join">النشرة</a></nav>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق</h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card sold-out"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>خلصت النهارده</p></article>
  </section>
  <section id="about" class="about">
    <h2>عننا</h2>
    <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
    <p class="story">بدأنا سنة ٢٠١٩ في محل صغير جنب المدرسة، بماكينة واحدة وتلات ترابيزات. كل يوم الصبح كنا بنحمّص كمية صغيرة، ولما تخلص نقفل. الناس بقت تيجي مخصوص، والمحل كبر، وبقى عندنا فرعين. ولسه بنحمّص كل يوم الصبح، ولسه بنقفل لما البن يخلص.</p>
  </section>
  <section class="palette">
    <h2>ألوان المحل</h2>
    <span class="sw s50">50</span><span class="sw s100">100</span><span class="sw s300">300</span><span class="sw s500">500</span><span class="sw s700">700</span><span class="sw s900">900</span>
  </section>
  <section id="join" class="join">
    <h2>اشترك في النشرة</h2>
    <form>
      <input type="email" placeholder="إيميلك">
      <label><input type="checkbox" checked> عروض الأسبوع</label>
      <button>اشترك</button>
    </form>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:**

- شريط فوق فيه «قهوة الركن» و تلات لينكات. اعمل سكرول جوه المعاينة: الشريط بيفضل فوق، واللي بيعدّي تحته (الهيرو والكروت) بيبان مغبّش.
- حافة الهيرو اللي تحت مايلة: أوطى على الشمال.
- كارت القهوة الساقعة: الشرايط بقت رمادي، و «خلصت النهارده» بني تقيل.
- في «عننا»: الاقتباس، وتحته فقرة سطورها اللي تحت بتبهت لحد ما تختفي.

**ليه كده:**

- **الزجاج = خلفية شفافة + [[backdrop-filter]].** من غير الشفافية مفيش حاجة تتشاف. ومن غير [[backdrop-filter]] (متصفح قديم) الشريط بيبقى أبيض 60٪ والكلام لسه مقروء.
- **[[polygon()]] بنسب** عشان الميل يتمط مع عرض الشاشة. وزوّدنا [[padding]] تحت الهيرو (60px) عشان الزرار ميتقصّش مع الحافة المايلة.
- **[[filter]] على [[.pic]] بس:** الكلام والسعر برّه الفلتر.
- **[[mask-image]] مش طبقة بيضا:** لو غيّرت خلفية الصفحة، التلاشي لسه صح.

**الغلطة الشائعة:** [[filter: blur()]] على الـ nav بدل [[backdrop-filter]]: الكلام اللي في الشريط هو اللي هيتغبّش.

~~~text القياس من Chrome
.nav            backdrop-filter: blur(10px) saturate(1.5)    background-color: rgba(255, 255, 255, 0.6)    position: sticky
.hero           clip-path: polygon(0px 0px, 100% 0px, 100% 88%, 0px 100%)
.sold-out .pic  filter: grayscale(1)
.story          mask-image: linear-gradient(rgb(0, 0, 0) 45%, rgba(0, 0, 0, 0))
~~~` },
        { lvl: 'كبير', dir: "rokn-cafe", cont: true, t: R`صفحة قهوة الركن كاملة`, what: R`المشروع اللي بيقفل الوحدة: الصفحة كلها جاهزة للنشر، مبنية على كل اللي فات. بتعيد استخدام الهيرو (المشروع الأول)، والكروت والاقتباس (التاني)، ولوحة الألوان والنشرة (التالت)، والـ nav الزجاج والقص والتلاشي (الرابع)، وبتزوّد تلات حاجات: (١) شارة «جديد» جنب اسم اللاتيه، فيها نجمة بلون الكلام معمولة بـ [[mask]] على [[::before]] (درس «::first-letter و ::selection» شرح [[::before]] و [[content]]) و [[background-color: currentColor]]. (٢) [[<aside class="offer">]] «عرض الأسبوع» شكل تذكرة: خلفية متدرّجة، وفتحتين نص دايرة على الجنبين بقناعين و [[mask-composite: intersect]]. (٣) [[<footer class="foot">]] بنقشة نقط من [[radial-gradient]] و [[background-size]] على البني الغامق. والصفحة لازم تفضل من غير سكرول بالعرض على 360.`, done: R`كل اللي في المشاريع اللي فاتت لسه صح، وكمان: [[.badge]] خلفيتها [[oklch(0.83 0.16 84)]] وفيها نجمة بلون كلامها، و [[.offer]] [[mask-composite: intersect, intersect]] والفتحتين باينين، و [[.foot]] [[background-size: 14px 14px]]. وعلى عرض 360 (اتقاس جوه iframe عرضه 360): [[scrollWidth]] = [[clientWidth]]، يعني مفيش سكرول بالعرض.`, ext: R`زوّد زرار يقلب الصفحة لثيم غامق: غيّر [[--brand-50]] و [[--ink]] لقيم غامقة جوه [[@media (prefers-color-scheme: dark)]] و [[color-scheme: light dark]] على [[:root]] (درس «dark mode»). وجرّب لون براند P3 أزهى مع بديل sRGB (درس «color-mix و currentColor» قسم ٨).`, sol: R`**شجرة الملفات** (نفس الفولدر من أول مشروع):

~~~text
rokn-cafe/
├── index.html    ← الصفحة: nav، و header، و main (المنيو والعرض وعننا والألوان والنشرة)، و footer
└── style.css     ← :root بالألوان، وبعدها كل قسم بالترتيب
~~~

**ترتيب البناء** (كل خطوة مشروع من اللي فاتوا، والجديد في الآخر):

1. الخلفيات والهيرو (المشروع الأول).
2. الكروت والحدود والضلال والـ focus (التاني).
3. المتغيرات ولوحة الألوان والنشرة (التالت). من هنا ولا لون مكتوب بالإيد خارج [[:root]] (غير رسومات المشروبات).
4. الزجاج والقص والفلتر والتلاشي (الرابع).
5. الجديد: الشارة، والتذكرة، والفوتر. وبعدين افتحها على 360 وقيس.

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="nav"><b>قهوة الركن</b> <a href="#menu">المنيو</a> <a href="#about">عننا</a> <a href="#join">النشرة</a></nav>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق <span class="badge">جديد</span></h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card sold-out"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>خلصت النهارده</p></article>
  </section>
  <aside class="offer">عرض الأسبوع: أي مشروب + كرواسون بـ ٩٠ جنيه</aside>
  <section id="about" class="about">
    <h2>عننا</h2>
    <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
    <p class="story">بدأنا سنة ٢٠١٩ في محل صغير جنب المدرسة، بماكينة واحدة وتلات ترابيزات. كل يوم الصبح كنا بنحمّص كمية صغيرة، ولما تخلص نقفل. الناس بقت تيجي مخصوص، والمحل كبر، وبقى عندنا فرعين. ولسه بنحمّص كل يوم الصبح، ولسه بنقفل لما البن يخلص.</p>
  </section>
  <section class="palette">
    <h2>ألوان المحل</h2>
    <span class="sw s50">50</span><span class="sw s100">100</span><span class="sw s300">300</span><span class="sw s500">500</span><span class="sw s700">700</span><span class="sw s900">900</span>
  </section>
  <section id="join" class="join">
    <h2>اشترك في النشرة</h2>
    <form>
      <input type="email" placeholder="إيميلك">
      <label><input type="checkbox" checked> عروض الأسبوع</label>
      <button>اشترك</button>
    </form>
  </section>
</main>
<footer class="foot">قهوة الركن · شارع الجامعة · مفتوح من ٨ الصبح لـ ١١ بالليل</footer>
</body>
</html>
~~~

~~~css style.css
:root {
  --brand: oklch(0.555 0.146 49);
  --brand-50: color-mix(in oklch, var(--brand), white 90%);
  --brand-100: color-mix(in oklch, var(--brand), white 75%);
  --brand-300: color-mix(in oklch, var(--brand), white 40%);
  --brand-700: color-mix(in oklch, var(--brand), black 30%);
  --brand-900: color-mix(in oklch, var(--brand), black 65%);
  --accent: oklch(0.83 0.16 84);
  --ink: oklch(0.27 0.01 50);
  --line: oklch(0.92 0.005 50);
  accent-color: var(--brand);
  caret-color: var(--brand);
}

body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: var(--brand-50);
  color: var(--ink);
}

.hero {
  padding: 150px 20px 60px;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
  color: white;
  background:
    linear-gradient(to top, var(--brand-900), transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat var(--brand-700);
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: var(--brand-900);
  text-decoration: none;
  font-weight: 700;
  background-color: var(--accent);
  border-radius: 999px;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 20px;
  background-color: rgb(255 255 255 / 0.6);
  backdrop-filter: blur(10px) saturate(1.5);
  border-bottom: 1px solid rgb(0 0 0 / 0.06);
}
.nav a { margin-inline-start: 14px; color: var(--ink); text-decoration: none; }

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid;
  border-radius: 999px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.quote {
  margin: 0 0 16px;
  padding: 12px 16px;
  background-color: var(--brand-100);
  border-inline-start: 4px solid var(--brand);
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}

.palette { padding: 0 20px 32px; }
.sw { display: inline-block; width: 15%; padding: 18px 0; text-align: center; font: 12px monospace; }
.s50 { background-color: var(--brand-50); outline: 1px solid var(--line); }
.s100 { background-color: var(--brand-100); }
.s300 { background-color: var(--brand-300); }
.s500 { background-color: var(--brand); color: white; }
.s700 { background-color: var(--brand-700); color: white; }
.s900 { background-color: var(--brand-900); color: white; }

.join {
  padding: 32px 20px;
  background-color: var(--brand-900);
  color: var(--brand-50);
  color-scheme: dark;
}
.join h2 { margin-top: 0; }
.join input[type=email] { display: block; width: 100%; max-width: 320px; box-sizing: border-box; padding: 10px; margin-bottom: 12px; font: inherit; }
.join label { display: block; margin-bottom: 12px; }
.join button {
  padding: 10px 22px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: var(--brand-900);
  background-color: var(--accent);
}

.sold-out .pic { filter: grayscale(1); }
.sold-out p { color: var(--brand-700); font-weight: 700; padding-bottom: 16px; }

.about { padding: 0 20px 32px; }
.about h2 { margin-top: 0; }
.story {
  max-width: 520px;
  max-height: 110px;
  overflow: hidden;
  line-height: 1.8;
  mask-image: linear-gradient(black 45%, transparent);
}

.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--brand-900);
  background-color: var(--accent);
}
.badge::before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-inline-end: 4px;
  background-color: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z'/%3E%3C/svg%3E") center / contain no-repeat;
}

.offer {
  margin: 8px 20px 32px;
  max-width: 420px;
  padding: 18px 32px;
  font-weight: 700;
  color: var(--brand-900);
  background: linear-gradient(135deg, var(--accent), var(--brand-300));
  mask:
    radial-gradient(circle 14px at left center, transparent 98%, black),
    radial-gradient(circle 14px at right center, transparent 98%, black);
  mask-composite: intersect;
}

.foot {
  padding: 24px 20px;
  color: var(--brand-50);
  background: radial-gradient(var(--brand-700) 1.5px, transparent 2.5px) 0 0 / 14px 14px var(--brand-900);
}
~~~

~~~view 2080 2160 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>قهوة الركن</title>
<style>
:root {
  --brand: oklch(0.555 0.146 49);
  --brand-50: color-mix(in oklch, var(--brand), white 90%);
  --brand-100: color-mix(in oklch, var(--brand), white 75%);
  --brand-300: color-mix(in oklch, var(--brand), white 40%);
  --brand-700: color-mix(in oklch, var(--brand), black 30%);
  --brand-900: color-mix(in oklch, var(--brand), black 65%);
  --accent: oklch(0.83 0.16 84);
  --ink: oklch(0.27 0.01 50);
  --line: oklch(0.92 0.005 50);
  accent-color: var(--brand);
  caret-color: var(--brand);
}

body {
  margin: 0;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: var(--brand-50);
  color: var(--ink);
}

.hero {
  padding: 150px 20px 60px;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
  color: white;
  background:
    linear-gradient(to top, var(--brand-900), transparent),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Crect width='160' height='90' fill='%23d6a96a'/%3E%3Crect y='62' width='160' height='28' fill='%2378350f'/%3E%3Cpath d='M62 40h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z' fill='%23fff7ed'/%3E%3Cpath d='M94 44h5a5 5 0 0 1 0 10h-5' fill='none' stroke='%23fff7ed' stroke-width='3'/%3E%3Cpath d='M72 34c-3-5 3-7 0-12M82 34c-3-5 3-7 0-12' fill='none' stroke='%23fff7ed' stroke-width='2'/%3E%3C/svg%3E") center / cover no-repeat var(--brand-700);
}

.hero h1 { margin: 0 0 8px; font-size: 30px; }
.hero p { margin: 0 0 20px; }

.cta {
  display: inline-block;
  padding: 10px 20px;
  color: var(--brand-900);
  text-decoration: none;
  font-weight: 700;
  background-color: var(--accent);
  border-radius: 999px;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 20px;
  background-color: rgb(255 255 255 / 0.6);
  backdrop-filter: blur(10px) saturate(1.5);
  border-bottom: 1px solid rgb(0 0 0 / 0.06);
}
.nav a { margin-inline-start: 14px; color: var(--ink); text-decoration: none; }

.menu { padding: 32px 20px 8px; }
.menu h2 { margin-top: 0; }

.card {
  max-width: 340px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.08), 0 8px 20px rgb(0 0 0 / 0.12);
}

.pic { height: 110px; }
.espresso { background: radial-gradient(circle at 50% 45%, #451a03 0 22%, #fef3c7 23% 30%, #d6a96a 31%); }
.latte { background: radial-gradient(circle at 50% 45%, #fde68a 0 12%, #d6a96a 13% 22%, #fef3c7 23% 30%, #a16207 31%); }
.iced { background: repeating-linear-gradient(-45deg, #e0f2fe 0 10px, #bae6fd 10px 20px); }

.card h3, .card p { margin: 12px 16px 0; }

.card a {
  display: inline-block;
  margin: 12px 16px 16px;
  padding: 6px 16px;
  border: 2px solid;
  border-radius: 999px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 700;
}

.card a:focus-visible,
.cta:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.quote {
  margin: 0 0 16px;
  padding: 12px 16px;
  background-color: var(--brand-100);
  border-inline-start: 4px solid var(--brand);
  border-start-end-radius: 12px;
  border-end-end-radius: 12px;
}

.palette { padding: 0 20px 32px; }
.sw { display: inline-block; width: 15%; padding: 18px 0; text-align: center; font: 12px monospace; }
.s50 { background-color: var(--brand-50); outline: 1px solid var(--line); }
.s100 { background-color: var(--brand-100); }
.s300 { background-color: var(--brand-300); }
.s500 { background-color: var(--brand); color: white; }
.s700 { background-color: var(--brand-700); color: white; }
.s900 { background-color: var(--brand-900); color: white; }

.join {
  padding: 32px 20px;
  background-color: var(--brand-900);
  color: var(--brand-50);
  color-scheme: dark;
}
.join h2 { margin-top: 0; }
.join input[type=email] { display: block; width: 100%; max-width: 320px; box-sizing: border-box; padding: 10px; margin-bottom: 12px; font: inherit; }
.join label { display: block; margin-bottom: 12px; }
.join button {
  padding: 10px 22px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  color: var(--brand-900);
  background-color: var(--accent);
}

.sold-out .pic { filter: grayscale(1); }
.sold-out p { color: var(--brand-700); font-weight: 700; padding-bottom: 16px; }

.about { padding: 0 20px 32px; }
.about h2 { margin-top: 0; }
.story {
  max-width: 520px;
  max-height: 110px;
  overflow: hidden;
  line-height: 1.8;
  mask-image: linear-gradient(black 45%, transparent);
}

.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--brand-900);
  background-color: var(--accent);
}
.badge::before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-inline-end: 4px;
  background-color: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z'/%3E%3C/svg%3E") center / contain no-repeat;
}

.offer {
  margin: 8px 20px 32px;
  max-width: 420px;
  padding: 18px 32px;
  font-weight: 700;
  color: var(--brand-900);
  background: linear-gradient(135deg, var(--accent), var(--brand-300));
  mask:
    radial-gradient(circle 14px at left center, transparent 98%, black),
    radial-gradient(circle 14px at right center, transparent 98%, black);
  mask-composite: intersect;
}

.foot {
  padding: 24px 20px;
  color: var(--brand-50);
  background: radial-gradient(var(--brand-700) 1.5px, transparent 2.5px) 0 0 / 14px 14px var(--brand-900);
}
</style>
</head>
<body>
<nav class="nav"><b>قهوة الركن</b> <a href="#menu">المنيو</a> <a href="#about">عننا</a> <a href="#join">النشرة</a></nav>
<header class="hero">
  <h1>قهوتك محمّصة النهارده الصبح</h1>
  <p>بن طازة، ومكان هادي في ركن الشارع.</p>
  <a class="cta" href="#menu">شوف المنيو</a>
</header>
<main>
  <section id="menu" class="menu">
    <h2>المنيو</h2>
    <article class="card"><div class="pic espresso"></div><h3>إسبريسو</h3><p>٤٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card"><div class="pic latte"></div><h3>لاتيه بالبندق <span class="badge">جديد</span></h3><p>٧٠ جنيه</p><a href="#order">اطلب</a></article>
    <article class="card sold-out"><div class="pic iced"></div><h3>قهوة ساقعة</h3><p>خلصت النهارده</p></article>
  </section>
  <aside class="offer">عرض الأسبوع: أي مشروب + كرواسون بـ ٩٠ جنيه</aside>
  <section id="about" class="about">
    <h2>عننا</h2>
    <blockquote class="quote">أحلى قهوة في الحي، والناس طيبة.</blockquote>
    <p class="story">بدأنا سنة ٢٠١٩ في محل صغير جنب المدرسة، بماكينة واحدة وتلات ترابيزات. كل يوم الصبح كنا بنحمّص كمية صغيرة، ولما تخلص نقفل. الناس بقت تيجي مخصوص، والمحل كبر، وبقى عندنا فرعين. ولسه بنحمّص كل يوم الصبح، ولسه بنقفل لما البن يخلص.</p>
  </section>
  <section class="palette">
    <h2>ألوان المحل</h2>
    <span class="sw s50">50</span><span class="sw s100">100</span><span class="sw s300">300</span><span class="sw s500">500</span><span class="sw s700">700</span><span class="sw s900">900</span>
  </section>
  <section id="join" class="join">
    <h2>اشترك في النشرة</h2>
    <form>
      <input type="email" placeholder="إيميلك">
      <label><input type="checkbox" checked> عروض الأسبوع</label>
      <button>اشترك</button>
    </form>
  </section>
</main>
<footer class="foot">قهوة الركن · شارع الجامعة · مفتوح من ٨ الصبح لـ ١١ بالليل</footer>
</body>
</html>
~~~

**هتشوف إيه:**

- كل اللي في المشاريع اللي فاتت، وزيادة:
- جنب «لاتيه بالبندق» شارة صفرا «★ جديد»، والنجمة بني زي كلام الشارة.
- تحت المنيو شريط متدرّج من الأصفر للبرتقاني الفاتح فيه «عرض الأسبوع»، وطرفيه فيهم قضمة نص دايرة زي التذكرة (باين منها لون الصفحة).
- تحت خالص فوتر بني غامق عليه نقط بني أفتح منتظمة، والكلام كريمي.

**ليه كده (الجديد بس):**

- **النجمة:** [[::before]] فاضي ([[content: ""]]) مقاسه 12px، خلفيته [[currentColor]] (لون كلام الشارة)، والـ SVG قناع بيقصّه نجمة. لو غيّرت [[color]] الشارة، النجمة تتغيّر معاها.
- **التذكرة:** كل قناع [[radial-gradient]] شفاف في دايرة عند حافة ومليان في الباقي. [[intersect]] = المشترك بين القناعين، يعني كل حاجة ما عدا الدايرتين. (لو [[add]] كانت كل دايرة هتتملي من القناع التاني.)
- **الفوتر:** دايرة 1.5px في بلاطة 14×14، واللون جوه نفس طبقة الصورة.

**الغلطات اللي اتصلحت وانا ببنيها:**

- الفتحتين مكانوش باينين لما كتبت [[mask-composite: add]] (الافتراضي): القناع التاني كان بيملا فتحة الأول.
- [[clip-path]] على الهيرو قص الزرار لما الـ padding اللي تحت كان 40px. بقى 60px.

~~~text القياس من Chrome
.badge     background-color: oklch(0.83 0.16 84)
.offer     mask-composite: intersect, intersect
           mask-image: radial-gradient(14px at 0% 50%, rgba(0, 0, 0, 0) 98%, rgb(0, 0, 0)), radial-gradient(14px at 100% 50%, ...)
.foot      background-size: 14px 14px     background-color: oklch(0.19425 0.0511 49)
عرض 360    scrollWidth 345 = clientWidth 345 (الـ 15 الباقيين شريط السكرول الرأسي)
~~~` },
        { lvl: 'فكرة', dir: "eid-card", t: R`كارت تهنئة بالعيد`, what: R`كارت تهنئة رقمي تبعته قهوة الركن لزباينها في العيد (فولدر جديد). [[index.html]] فيه [[<article class="card">]] جواه هلال، وعنوان «عيد سعيد»، وسطر تهنئة. والتصميم كله من غير ولا صورة: أشعة نور من فوق بـ [[repeating-conic-gradient]] فوق تدرّج كحلي، وإطار دهبي متدرّج بـ [[border-image]]، وهلال معمول من دايرتين بـ [[mask-composite: subtract]] وحواليه توهّج [[drop-shadow()]]، وعنوان حروفه متدرّجة بـ [[background-clip: text]]. اختار ألوانك وتفاصيلك.`, done: R`الكارت فيه الأربع تأثيرات، والهلال متوهّج فعلًا (التوهّج مش متقصوص)، وكل ده من غير ملفات صور.`, ext: R`خلّي الكارت بمقاس صورة مشاركة (1200×630) واعمله [[@media print]]، أو زوّد حركة بطيئة للأشعة (درس «transition و @keyframes»).`, sol: R`**نسخة نموذجية:**

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كل سنة وانت طيب</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<article class="card">
  <div class="glow"><div class="moon"></div></div>
  <h1>عيد سعيد</h1>
  <p>من كل اللي في قهوة الركن: كل سنة وانت طيب، والقهوة علينا يوم العيد.</p>
</article>
</body>
</html>
~~~

~~~css style.css
body {
  margin: 0;
  padding: 24px 16px;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: #1e1b4b;
}

.card {
  max-width: 360px;
  margin: 0 auto;
  padding: 28px 20px;
  text-align: center;
  color: #fef3c7;
  background:
    repeating-conic-gradient(from 0deg at 50% 0%, rgb(255 255 255 / 0.06) 0 6deg, transparent 6deg 12deg),
    linear-gradient(#312e81, #1e1b4b);
  border: 10px solid;
  border-image: linear-gradient(135deg, #fbbf24, #b45309, #fbbf24) 1;
}

.moon {
  width: 90px;
  height: 90px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, #fde68a, #f59e0b);
  mask:
    radial-gradient(circle at 70% 40%, black 38%, transparent 39%),
    radial-gradient(circle, black 49%, transparent 50%);
  mask-composite: subtract;
}

.glow { filter: drop-shadow(0 0 10px rgb(251 191 36 / 0.8)); }

h1 {
  margin: 0 0 8px;
  font-size: 40px;
  width: fit-content;
  margin-inline: auto;
  background: linear-gradient(90deg, #fbbf24, #fef3c7, #fbbf24);
  background-clip: text;
  color: transparent;
}

p { margin: 0; line-height: 1.8; }
~~~

~~~view 355 355 شكل الصفحة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كل سنة وانت طيب</title>
<style>
body {
  margin: 0;
  padding: 24px 16px;
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  background-color: #1e1b4b;
}

.card {
  max-width: 360px;
  margin: 0 auto;
  padding: 28px 20px;
  text-align: center;
  color: #fef3c7;
  background:
    repeating-conic-gradient(from 0deg at 50% 0%, rgb(255 255 255 / 0.06) 0 6deg, transparent 6deg 12deg),
    linear-gradient(#312e81, #1e1b4b);
  border: 10px solid;
  border-image: linear-gradient(135deg, #fbbf24, #b45309, #fbbf24) 1;
}

.moon {
  width: 90px;
  height: 90px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, #fde68a, #f59e0b);
  mask:
    radial-gradient(circle at 70% 40%, black 38%, transparent 39%),
    radial-gradient(circle, black 49%, transparent 50%);
  mask-composite: subtract;
}

.glow { filter: drop-shadow(0 0 10px rgb(251 191 36 / 0.8)); }

h1 {
  margin: 0 0 8px;
  font-size: 40px;
  width: fit-content;
  margin-inline: auto;
  background: linear-gradient(90deg, #fbbf24, #fef3c7, #fbbf24);
  background-clip: text;
  color: transparent;
}

p { margin: 0; line-height: 1.8; }
</style>
</head>
<body>
<article class="card">
  <div class="glow"><div class="moon"></div></div>
  <h1>عيد سعيد</h1>
  <p>من كل اللي في قهوة الركن: كل سنة وانت طيب، والقهوة علينا يوم العيد.</p>
</article>
</body>
</html>
~~~

**هتشوف إيه:** كارت كحلي بإطار دهبي من بني لأصفر، ومن نص الحافة اللي فوق طالعة أشعة نور فاتحة، وفي النص هلال دهبي متوهّج، وتحته «عيد سعيد» بحروف دهبي متدرّجة، والتهنئة بكريمي.

**ليه التصميم ده:**

- **الأشعة:** [[repeating-conic-gradient(from 0deg at 50% 0%, ...)]] = قطاعات بتلف حوالين نقطة في نص الحافة اللي فوق، أبيض شفاف 6٪ بالتبادل مع شفاف. شفافة عشان تبان «نور» فوق التدرّج مش ألوان.
- **الهلال:** دايرة كاملة ([[black 49%]]) ناقص دايرة مزاحة ([[at 70% 40%]]) = هلال. [[subtract]] = الأول ناقص اللي تحته، فالدايرة المزاحة لازم تبقى الأولى.
- **التوهّج على [[.glow]] مش على [[.moon]]:** المتصفح بيطبّق [[filter]] الأول وبعدين القص والقناع، فالتوهّج لو على الهلال نفسه كان هيتقص مع القناع (جرّبتها: التوهّج اختفى). على الأب، الفلتر بيشتغل على الهلال بعد ما اتقص.
- **الإطار:** [[border-image]] بتدرّج و [[1]]، وأركانه حادة عمدًا (زي الكروت المطبوعة).

~~~text القياس من Chrome
.card    border-image-source: linear-gradient(135deg, rgb(251, 191, 36), rgb(180, 83, 9), rgb(251, 191, 36))   border-top-width: 10px
.moon    mask-composite: subtract, subtract
.glow    filter: drop-shadow(rgba(251, 191, 36, 0.8) 0px 0px 10px)
h1       background-clip: text    color: rgba(0, 0, 0, 0)
~~~` }
      ],
      items: [
        {
          cmd: "background-color و background-image",
          title: "لون الخلفية وصورة الخلفية، وأنواع الصور اللي CSS بتقبلها",
          pre: [{ to: "css/box model", why: R`الخلفية بتترسم تحت طبقات الصندوق (المحتوى والـ padding والـ border)، فلازم تبقى عارف الطبقات دي الأول` }],
          ref: [
            { t: "MDN: background-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color" },
            { t: "MDN: background-image", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-image" },
            { t: "MDN: <url>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/url_value" },
            { t: "MDN: <image>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/image" },
            { t: "MDN: image-set()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/image/image-set" },
            { t: "MDN: image()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/image/image" },
            { t: "MDN: image-rendering", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering" },
            { t: "MDN: image-orientation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-orientation" },
            { t: "CSS Backgrounds and Borders Level 3", url: "https://www.w3.org/TR/css-backgrounds-3/" }
          ],
          desc: R`[[background-color]] بتلوّن مساحة العنصر كلها من ورا الكلام، و [[background-image]] بتحط صورة (أو تدرّج لوني) فوق اللون ده. الاتنين «زينة»: مبيغيّروش مقاس العنصر ولا مكانه.
والصورة بتتكتب بـ [[url("...")]] أو بأي نوع تاني من [[<image>]]: تدرّج، أو [[image-set()]] اللي بتختار الصورة على حسب الشاشة.`,
          example: R`.card { background-color: #fef3c7; }
.hero { background-image: url("img/cafe.jpg"); }
.hero { background-color: #78350f; }
.logo { background-image: image-set("logo.png" 1x, "logo-2x.png" 2x); }
.pixel { image-rendering: pixelated; }
body { background-color: #faf7f2; }`,
          flag: "script",
          lines: [
            R`لون خلفية الكارت أصفر فاتح. بيتلوّن المحتوى والـ padding، وكمان تحت الـ border.`,
            R`صورة خلفية للقسم الكبير. المسار بين تنصيص، وبيتحسب من مكان ملف الـ CSS مش من مكان الـ HTML.`,
            R`لون بني تحت الصورة: بيبان لو الصورة لسه بتحمّل أو مفتحتش، فالكلام الأبيض يفضل مقروء.`,
            R`صورتين للوجو: العادية للشاشات العادية، واللي حجمها الضعف للشاشات الحادة (الموبايلات وشاشات Retina). المتصفح بياخد واحدة بس.`,
            R`لما صورة صغيرة تتكبّر، متتغبّشش: كل نقطة تفضل مربع حاد. للـ pixel art والـ QR.`,
            R`لون الصفحة كلها. لون الـ [[body]] بيتمد على الشاشة كلها حتى لو الـ body نفسه صغير.`
          ],
          teach: R`## الفكرة في سطرين

كل عنصر صندوق (درس «box model»)، والخلفية هي الطبقة اللي تحت الصندوق ده. فيها حاجتين بس: **لون** واحد تحت، و**صورة** (أو أكتر) فوقه. والدرس الجاي بيتحكم في مكان الصورة ومقاسها وتكرارها.

كل الأرقام في الوحدة دي من Chrome 157 headless على Windows 11، والشكل اتشاف في صور للصفحة.

---

## ١. [[background-color: #fef3c7]]

[[background-color]] بتلوّن **الصندوق كله لحد حافة الـ border من برّه**: المحتوى، والـ padding، وكمان تحت الـ border نفسه. عشان تتأكد، ادّي العنصر border متقطّع:

~~~live 100 اللون تحت الـ border
<style>
  .box { max-width: 260px; padding: 16px; border: 8px dashed #78350f; background-color: #fde68a; }
</style>
<div class="box">الخلفية تحت الكلام والـ padding والـ border</div>
~~~

**هتشوف إيه:** الأصفر مالي الصندوق، وبين شُرَط الـ border البني باين أصفر كمان: اللون مترسوم تحت الـ border. (لو عايز اللون يقف عند الـ padding، ده [[background-clip]] في الدرس الجاي.)

~~~text القياس من Chrome (المحسوب)
background-color على أي عنصر من غير CSS:   rgba(0, 0, 0, 0)    ← شفاف
background-color: #fde68a                  →  rgb(253, 230, 138)
~~~

القيمة الافتراضية [[transparent]] (شفاف)، والمتصفح بيرجّعها [[rgba(0, 0, 0, 0)]]: أسود بشفافية صفر. ولأي لون تكتبه (اسم أو hex أو أي صيغة من درس «rgb و hsl و oklch») المتصفح بيرجّعه [[rgb()]].

### الخلفية مبتتورّثش، بس بتبان من ورا

~~~live 90 الابن شفاف
<style>
  .parent { background-color: #d1fae5; padding: 12px; }
  .child { border: 2px solid #065f46; padding: 8px; }
</style>
<div class="parent">الأب أخضر فاتح <div class="child">الابن من غير خلفية</div></div>
~~~

**هتشوف إيه:** الابن «أخضر» زي الأب. بس ده مش لون الابن: الابن شفاف، وإنت شايف الأب من وراه.

~~~text القياس من Chrome
.child   background-color: rgba(0, 0, 0, 0)     ← الابن مورثش حاجة
~~~

الفرق ده مهم في الـ JavaScript والاختبارات: لو قريت [[getComputedStyle]] للابن هتلاقي شفاف مش أخضر.

### [[body]] بيلوّن الشاشة كلها

~~~live 150 الـ body صغير واللون في كل حتة
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>عرض الـ body</title>
<style>
  body { background-color: #fef3c7; margin: 24px; max-width: 200px; border: 2px dashed #b45309; }
</style>
</head>
<body><p>الـ body عرضه 200px بس</p></body>
</html>
~~~

**هتشوف إيه:** الـ body هو المستطيل المتقطّع الصغير، بس الأصفر مالي الصفحة كلها.

ده استثناء مكتوب في المواصفة: لو [[<html>]] ملهوش خلفية، خلفية [[<body>]] بتتنقل لـ «الـ canvas» (المساحة اللي ورا الصفحة كلها). عشان كده [[body { background-color: ... }]] هي الطريقة العادية لتلوين الصفحة.

~~~text القياس من Chrome
html   background-color: rgba(0, 0, 0, 0)
body   background-color: rgb(254, 243, 199)     ← واللون باين في كل الشاشة
~~~

---

## ٢. [[background-image: url("img/cafe.jpg")]]

[[background-image]] بتحط صورة فوق اللون. القيمة الافتراضية [[none]].

### [[<url>]]: إزاي تكتب مكان الصورة

[[url()]] دي الطريقة اللي CSS بتشاور بيها على ملف: صورة، أو خط (درس «@font-face و font-display»)، أو أي ملف تاني.

| الشكل | ينفع؟ |
|---|---|
| [[url("img/cafe.jpg")]] | أيوه. التنصيص الأحسن دايمًا |
| [[url('img/cafe.jpg')]] | أيوه. تنصيص فردي زي المزدوج |
| [[url(img/cafe.jpg)]] | أيوه، طالما المسار مفيهوش مسافة ولا قوس ولا تنصيص |
| [[url(my photo.jpg)]] | **لأ**. السطر كله بيترمي (اتقاس: المحسوب [[none]]) |
| [[url("my photo.jpg")]] | أيوه. المتصفح بيحوّل المسافة لـ [[%20]] |

**المسار بيتحسب من مكان ملف الـ CSS**، مش من مكان صفحة الـ HTML. لو [[style.css]] في فولدر [[css/]] والصورة في [[img/]] جنبه، تكتب [[url("../img/cafe.jpg")]] (درس «المسارات: مطلق ونسبي»). ولو الـ CSS جوه [[<style>]] في الصفحة نفسها، بيتحسب من مكان الصفحة.

~~~text القياس من Chrome
url(img/cup.png)        →  url("file:///C:/Users/ali/site/img/cup.png")    ← المتصفح بيرجّع المسار كامل
url(my photo.png)       →  none     ← مرفوضة
url('my photo.png')     →  url(".../my%20photo.png")
~~~

### صورة جوه الكود نفسه: [[data:]]

ممكن الصورة نفسها تتكتب جوه [[url()]] من غير ملف، بـ [[data:]] URI. أشهر استخدام: أيقونة SVG صغيرة. وده اللي هنستخدمه في كل أمثلة الوحدة دي، لأن الصفحات الحية هنا معزولة ومبتحمّلش ملفات.

~~~live 110 دواير من SVG مكتوب جوه الـ CSS
<style>
  .pattern {
    height: 80px;
    background-color: #fef3c7;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23b45309'/%3E%3C/svg%3E");
  }
</style>
<div class="pattern"></div>
~~~

**هتشوف إيه:** دواير بني على أصفر فاتح مالية الصندوق: الصورة دايرة واحدة، والمتصفح **كرّرها** لوحده في الاتجاهين (ده الافتراضي، والدرس الجاي بيوقفه).

قراية الـ SVG المكتوب: [[%3C]] معناها [[<]]، و [[%3E]] معناها [[>]]، و [[%23]] معناها [[#]] (لازم تتكتب كده، لأن [[#]] جوه URL ليها معنى تاني). الباقي SVG عادي (درس «SVG»): [[viewBox]] مساحة 40×40، ودايرة نص قطرها 8 لونها [[#b45309]].

---

## ٣. الصورة فوق اللون، واللون هو الاحتياطي

اللون دايمًا **تحت** الصورة. ده بيعمل حاجتين:

1. لو الصورة فيها حتت شفافة (PNG أو SVG)، اللون بيبان منها (زي الدواير اللي فوق).
2. لو الصورة لسه بتحمّل، أو مسارها غلط، أو النت قطع: اللون هو اللي بيبان.

~~~live 130 صورة اتحمّلت وصورة مسارها غلط
<style>
  .hero { padding: 16px; color: white; font-size: 20px; margin-block-end: 8px;
          background-color: #78350f;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%2392400e'/%3E%3Ccircle cx='20' cy='20' r='6' fill='%23fbbf24'/%3E%3C/svg%3E"); }
  .broken { background-image: url("img/not-here.jpg"); }
</style>
<div class="hero">الصورة اتحمّلت</div>
<div class="hero broken">الصورة مش موجودة، واللون شايل</div>
~~~

**هتشوف إيه:** الأول نقط صفرا على بني. التاني بني سادة، والكلام الأبيض لسه مقروء.

**ليه ده مهم (accessibility):** لو كلام أبيض فوق صورة غامقة ومفيش لون تحتها، أول ثانية في التحميل الكلام هيبقى أبيض على أبيض. **اختار لون الخلفية قريب من متوسط ألوان الصورة**، وقيس التباين بين الكلام واللون ده (درس «contrast ratio»). والأحسن تقيسه كمان على أفتح حتة في الصورة.

---

## ٤. [[<image>]]: كل اللي ينفع يتحط مكان الصورة

[[background-image]] مش بتاخد [[url()]] بس. بتاخد أي قيمة من نوع [[<image>]]، وده «نوع قيمة» في CSS (زي ما [[<color>]] نوع للألوان). الأنواع اللي جواه:

| الشكل | بيعمل إيه | فين بيتشرح |
|---|---|---|
| [[url("cafe.jpg")]] | ملف صورة: JPG و PNG و WebP و AVIF و GIF و SVG | هنا |
| [[linear-gradient(...)]] وإخواتها | تدرّج ألوان المتصفح بيرسمه (مفيش ملف) | درس «linear-gradient و radial-gradient» |
| [[image-set(...)]] | قايمة صور، والمتصفح بيختار واحدة على حسب الشاشة أو النوع | القسم الجاي |
| [[image(...)]] | صورة بمميزات زيادة (اتجاه، أو جزء من صورة، أو لون) | قسم ٦ |
| [[cross-fade()]] و [[element()]] | خلط صورتين، أو صورة من عنصر في الصفحة | مش Baseline، متستخدمهمش |

والخصائص اللي بتاخد [[<image>]] كتير: [[background-image]]، و [[list-style-image]] (درس «list-style و ::marker»)، و [[border-image-source]] (درس «outline و box-shadow»)، و [[mask-image]] (درس «mask»)، و [[content]] في [[::before]].

---

## ٥. [[image-set("logo.png" 1x, "logo-2x.png" 2x)]]

الشاشات الحادة (موبايلات كتير، وشاشات Retina) بترسم كل «بكسل CSS» بـ 2 أو 3 نقط حقيقية. صورة 100×100 على شاشة زي دي بتتمط وتبان مغبّشة. [[image-set()]] بتدّي المتصفح أكتر من نسخة وهو بيحمّل واحدة بس. ده نفس فكرة [[srcset]] في [[<img>]] (درس «picture»).

~~~live 90 المتصفح بيختار على حسب شاشتك
<style>
  .which {
    height: 60px; color: white; font-size: 20px; padding: 8px;
    background-color: #444;
    background-image: image-set(
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%230f766e'/%3E%3C/svg%3E") 1x,
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%237c3aed'/%3E%3C/svg%3E") 2x
    );
  }
</style>
<div class="which">أخضر = شاشتك 1x، بنفسجي = 2x أو أكتر</div>
~~~

**هتشوف إيه:** لون واحد بس. على لابتوب عادي هتشوف **أخضر**. افتح نفس الصفحة على موبايل: **بنفسجي**. (في الشغل الحقيقي الصورتين نفس الرسمة بمقاسين، واللونين هنا عشان تشوف الاختيار بعينك.)

| الجزء | معناه |
|---|---|
| [[1x]] و [[2x]] | كثافة الشاشة. وممكن تتكتب [[1dppx]] و [[2dppx]] (المتصفح بيرجّعها كده) |
| [[type("image/avif")]] | نوع الملف. المتصفح بيتخطى أي نوع مبيعرفوش: [[image-set("a.avif" type("image/avif"), "a.jpg" type("image/jpeg"))]] |
| التنصيص من غير [[url()]] | مقبول جوه [[image-set()]] |

~~~text القياس من Chrome
image-set('a.png' 1x, 'b.png' 2x)   →  image-set(url(".../a.png") 1dppx, url(".../b.png") 2dppx)
-webkit-image-set(url(a.png) 1x)    →  مقبولة، وبترجع image-set(...)   ← الاسم القديم، متكتبوش في كود جديد
CSS.supports("color", "image-set(...)")  false  ← طبيعي: دي صورة مش لون
~~~

---

## ٦. [[image()]]: موجودة في المواصفة، ومش جاهزة

[[image()]] في المواصفة بتعمل تلات حاجات: صورة بتتعكس لوحدها في الصفحات العربي ([[image(rtl "arrow.svg")]])، أو حتة من صورة ([[image("sprite.png#xywh=40,0,20,20")]])، أو «صورة» من لون سادة ([[image(rgb(0 0 255 / 0.5))]]).

~~~text القياس من Chrome 157
background-image: image(red)         →  مقبولة: image(rgb(255, 0, 0))   ← شكل اللون بس
background-image: image("a.png")     →  مرفوضة
background-image: image(rtl "a.png") →  مرفوضة
~~~

يعني Chrome بيقبل شكل اللون بس، و MDN بيقول إن مفيش متصفح بيدعمها كاملة. **متستخدمهاش.** اللي عايزه منها له بدايل شغالة: سهم بيتعكس في العربي بـ [[transform: scaleX(-1)]] في الصفحات العربي، ولون سادة كطبقة بـ [[linear-gradient(red, red)]] (درس التدرّجات).

---

## ٧. [[image-rendering: pixelated]]

لما صورة صغيرة تتكبّر، المتصفح بيخترع النقط اللي في النص، فبتطلع ناعمة ومغبّشة. ده كويس للصور العادية، ووحش للـ pixel art وكود الـ QR. الصورة اللي تحت مقاسها الحقيقي **4×4 بكسل بس**، ومتكبّرة لـ 80×80:

~~~live 150 نفس الصورة 4×4 متكبّرة
<style>
  .px { width: 80px; height: 80px; display: inline-block; margin: 8px; vertical-align: top;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGklEQVR4nGP49/l4hSk/hGSAs/59Ps6AUwYA05IboQjnpSoAAAAASUVORK5CYII=");
        background-size: 100%; }
  .sharp { image-rendering: pixelated; }
</style>
<div class="px"></div>
<div class="px sharp"></div>
<p>اليمين: auto (الافتراضي). الشمال: pixelated.</p>
~~~

**هتشوف إيه:** اليمين بقعة ناعمة متداخلة بين البني والأصفر. الشمال رقعة شطرنج: 16 مربع حاد.

| القيمة | بتعمل إيه |
|---|---|
| [[auto]] | الافتراضي: المتصفح بينعّم ويخترع ألوان وسط بين البكسلات |
| [[pixelated]] | كل بكسل يبقى مربع حاد. ده اللي هتستخدمه |
| [[crisp-edges]] | حواف حادة بطريقة المتصفح يختارها. في Chrome بتطلع زي [[pixelated]] تقريبًا |
| [[smooth]] | في المواصفة، و Chrome 157 بيرفضها ([[CSS.supports]] رجّع false) |

وبتشتغل على [[<img>]] و [[<canvas>]] كمان، مش الخلفيات بس. وعلى صورة SVG ملهاش لازمة: الـ SVG بيترسم من جديد في أي مقاس فعمره ما بيتغبّش.

---

## ٨. [[image-orientation: from-image]]

صور الموبايل جواها معلومة (اسمها EXIF) بتقول «الصورة دي اتصوّرت والموبايل واقف، لفّها 90 درجة». [[image-orientation]] بتقول المتصفح يعمل إيه بيها:

| القيمة | بتعمل إيه |
|---|---|
| [[from-image]] | الافتراضي (اتقاس في Chrome): يلفّ الصورة على حسب الـ EXIF فتبان معدولة |
| [[none]] | يتجاهل الـ EXIF ويعرض الصورة زي ما هي متخزّنة |

النهارده الافتراضي صح، فمش هتحتاجها غير لو عايز تعرض الصورة «زي ما هي» في أداة تعديل صور مثلًا. وحسب MDN، [[none]] مبتشتغلش على صور جاية من مصدر مش آمن (http). (الكلام ده من MDN: صورة فيها EXIF مش ممكن تتكتب جوه مثال حي هنا.) ولو عايز تلف صورة بإيدك، ده [[rotate]] مش [[image-orientation]].

---

## ٩. صورة خلفية ولا [[<img>]]؟

القاعدة: **لو الصورة محتوى، [[<img>]]. لو زينة، [[background-image]].**

| | [[<img alt="...">]] | [[background-image]] |
|---|---|---|
| قارئ الشاشة | بيقرا الـ [[alt]] | مبيقولش أي حاجة عنها |
| محركات البحث | بتفهرسها | غالبًا بتتجاهلها |
| الطباعة | بتطلع | المتصفح بيشيلها افتراضيًا عشان الحبر |
| الضغط يمين ← «حفظ الصورة» | موجود | مش موجود |
| أمثلة | صورة المنتج، وصورة الكاتب، والرسم البياني | نقشة، وتدرّج، وصورة جو ورا عنوان |

(قارئ الشاشة والبحث والطباعة من MDN و WCAG، مش من تشغيل.)

### [[object-position]]

لو الصورة محتوى، يبقى [[<img>]] مع [[object-fit: cover]] و [[object-position]] (درس «object-fit»). [[object-position]] بتشتغل بالظبط زي [[background-position]] اللي في الدرس الجاي، بس على [[<img>]]: الافتراضي [[50% 50%]] (اتقاس)، يعني القص من النص.

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[url(my photo.jpg)]] من غير تنصيص | الخاصية كلها بتترمي والصورة مبتظهرش، ومفيش أي رسالة |
| المسار محسوب من مكان الـ HTML والـ CSS في فولدر تاني | الصورة مبتظهرش. في DevTools › Network هتلاقي 404 |
| كلام أبيض فوق صورة ومفيش [[background-color]] | أول ما الصفحة تفتح الكلام مش باين |
| صورة المنتج كـ [[background-image]] | قارئ الشاشة مبيعرفش إن فيه صورة |
| [[background-color]] على [[<html>]] و [[<body>]] الاتنين بلونين | لون [[<body>]] بيبقى على الـ body بس، واللي برّه بلون [[<html>]] |
| [[#]] جوه SVG في [[data:]] من غير [[%23]] | الصورة بتبوظ أو تختفي |

---

## الخلاصة

- [[background-color]] تحت الـ border كمان، والافتراضي شفاف ([[rgba(0, 0, 0, 0)]])، ومبتتورّثش.
- لون [[body]] بيلوّن الشاشة كلها.
- [[url("...")]] بتنصيص، والمسار من ملف الـ CSS. و [[data:]] لصور صغيرة جوه الكود.
- اللون تحت الصورة دايمًا، وهو الاحتياطي: خليه قريب من الصورة ومقروء عليه.
- [[<image>]] = [[url()]] أو تدرّج أو [[image-set()]]. و [[image()]] مش جاهزة.
- [[image-rendering: pixelated]] للصور الصغيرة المتكبّرة.
- صورة محتوى ← [[<img>]]. زينة ← خلفية.`,
          try: R`اعمل [[bg.html]] فيه [[<header>]] بكلام أبيض «قهوة الركن» وتحته [[<p>]]. ادّي الـ header لون بني غامق وصورة نقشة SVG صغيرة (حبة بن أو دايرة) مكتوبة بـ [[data:]]، وادّي الصفحة كلها لون كريمي من [[body]]. وبعدين بوّظ مسار الصورة عمدًا وشوف الكلام لسه مقروء ولا لأ.`,
          sol: R`~~~live 150 bg.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>خلفيات</title>
<style>
  body { background-color: #faf7f2; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; margin: 0; }
  header {
    padding: 24px 16px;
    color: white;
    background-color: #78350f;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cellipse cx='16' cy='16' rx='5' ry='7' fill='%2392400e'/%3E%3C/svg%3E");
  }
  header h1 { margin: 0; }
  p { padding: 0 16px; }
</style>
</head>
<body>
<header><h1>قهوة الركن</h1></header>
<p>بن محمّص كل يوم الصبح.</p>
</body>
</html>
~~~

**هتشوف إيه:** شريط بني فيه حبات بن بيضاوي أفتح شوية متكررة، والعنوان الأبيض فوقها واضح. وتحت الصفحة كلها كريمي.

**لما تبوّظ المسار** (مثلًا تشيل حرف من [[data:]]): الحبات بتختفي والشريط بيفضل بني سادة، والعنوان لسه مقروء. ده دور [[background-color]] تحت الصورة.

~~~text القياس من Chrome
header   background-color: rgb(120, 53, 15)
header   background-image: url("data:image/svg+xml,...")
body     background-color: rgb(250, 247, 242)
~~~`,
          deep: {
            why: R`الخلفية أسهل طريقة تفصل بيها أجزاء الصفحة عن بعض (هيدر غامق، وكارت فاتح، وقسم بنقشة) من غير ما تزوّد عناصر. وفهم إنها طبقة تحت الصندوق بيفسّر حاجات كتير: ليه اللون باين تحت الـ border، وليه الابن «بيبان» بلون أبوه وهو شفاف، وليه لون الـ body مالي الشاشة.`,
            how: R`المتصفح بيرسم كل صندوق بالترتيب: لون الخلفية، ثم صور الخلفية (آخر واحدة في القايمة الأول، والأولى فوق الكل)، ثم الـ border، ثم المحتوى. الصورة بتتطلب من الشبكة أول ما الـ CSS يتقري ويبان إن فيه عنصر بيستخدمها، ولحد ما توصل مكانها بيترسم اللون بس. [[url()]] بيتحسب من مكان ملف الـ stylesheet اللي اتكتب فيه. ولو [[<html>]] خلفيته شفافة، خلفية [[<body>]] بتترسم على الـ canvas كله.`,
            when: R`[[background-color]]: أي قسم أو كارت أو زرار. [[background-image]]: نقشات، وتدرّجات، وصورة جو ورا عنوان، وأيقونات زينة. [[image-set()]]: صورة خلفية bitmap كبيرة هتتشاف على موبايلات. [[image-rendering: pixelated]]: pixel art، وQR، وأي صورة صغيرة بتتكبّر. والصورة اللي ليها معنى: [[<img>]] مش خلفية.`,
            mistakes: R`مسار فيه مسافة من غير تنصيص. مسار محسوب من الـ HTML بدل الـ CSS. كلام فاتح فوق صورة من غير لون احتياطي. صورة محتوى كخلفية فقارئ الشاشة مبيشوفهاش. [[#]] جوه SVG في data URI. واستخدام [[image()]] اللي لسه مش شغالة.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** كارت «عرض اليوم» شكله باهت. ادّيه لون خلفية [[#fef3c7]] (أصفر كريمي)، وادّي الزرار اللي جواه لون خلفية [[#78350f]] (بني غامق). (من قسم ١ في الشرح)`, done: R`الكارت أصفر كريمي والزرار بني، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  .card { padding: 16px; border: 1px solid #d6d3d1; max-width: 280px; }
  .card button { color: white; border: 0; padding: 8px 16px; }
</style>
<div class="card">
  <h3>عرض اليوم</h3>
  <p>أي مشروب ساقع + قطعة كيك بـ ٩٠ جنيه.</p>
  <button>اطلب</button>
</div>`, checks: [
              { say: R`خلفية الكارت [[#fef3c7]]`, q: ".card", style: ["background-color", "rgb(254, 243, 199)"] },
              { say: R`خلفية الزرار [[#78350f]]`, q: ".card button", style: ["background-color", "rgb(120, 53, 15)"] }
            ] }, sol: R`~~~live 180 الحل
<style>
  .card { padding: 16px; border: 1px solid #d6d3d1; max-width: 280px; background-color: #fef3c7; }
  .card button { color: white; border: 0; padding: 8px 16px; background-color: #78350f; }
</style>
<div class="card">
  <h3>عرض اليوم</h3>
  <p>أي مشروب ساقع + قطعة كيك بـ ٩٠ جنيه.</p>
  <button>اطلب</button>
</div>
~~~

**هتشوف إيه:** الكارت كله أصفر كريمي لحد الـ border الرمادي، والزرار بني وكلامه أبيض باين.

**ليه كده:** [[background-color]] بتلوّن صندوق العنصر نفسه. الزرار جوه الكارت بس ليه خلفية خاصة بيه (المتصفح بيدّي الأزرار رمادي فاتح افتراضيًا)، فلازم تلوّنه لوحده.

**الغلطة الشائعة:** [[color: #fef3c7]]. ده لون **الكلام** مش الخلفية، فالكلام هيبقى أصفر باهت على أبيض.

~~~text القياس من Chrome
.card          background-color: rgb(254, 243, 199)
.card button   background-color: rgb(120, 53, 15)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** قسم الهيدر المفروض عليه نقشة دواير، والنقشة مش باينة خالص، و DevTools بيقول إن [[background-image]] مشطوبة. الصورة نفسها سليمة. صلّحها. (من قسم ٢ في الشرح: «[[<url>]]: إزاي تكتب مكان الصورة»)`, done: R`الدواير باينة، والمحسوب [[url("data:...")]] مش [[none]]، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .top {
    height: 80px;
    background-color: #fef3c7;
    background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23b45309'/%3E%3C/svg%3E);
  }
</style>
<div class="top"></div>`, checks: [
              { say: R`الصورة اتقبلت (المحسوب مبقاش [[none]])`, q: ".top", style: ["background-image", "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23b45309'/%3E%3C/svg%3E\")"] },
              { say: R`اللون الاحتياطي لسه موجود`, q: ".top", style: ["background-color", "rgb(254, 243, 199)"] }
            ] }, sol: R`~~~live 100 بعد التصليح
<style>
  .top {
    height: 80px;
    background-color: #fef3c7;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23b45309'/%3E%3C/svg%3E");
  }
</style>
<div class="top"></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 100 قبل
<style>
  .top {
    height: 80px;
    background-color: #fef3c7;
    background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23b45309'/%3E%3C/svg%3E);
  }
</style>
<div class="top"></div>
~~~

**هتشوف إيه:** قبل: صندوق أصفر سادة. بعد: نفس الصندوق مليان دواير بني.

**ليه:** الـ SVG جواه **مسافات** (بين [[svg]] و [[xmlns]]، وبين الـ attributes) وتنصيص فردي. [[url()]] من غير تنصيص مبتقبلش مسافة ولا تنصيص جواها، فالسطر كله اترمى. لما حطيت المسار كله بين [[" "]]، المسافات بقت جزء من النص.

**الغلطة الشائعة:** تحط التنصيص الفردي [[' ']] حوالين المسار. الـ SVG نفسه فيه [[']]، فالتنصيص هيتقفل في نص الكلام. استخدم التنصيص اللي **مش** موجود جوه.

~~~text القياس من Chrome
قبل   background-image: none
بعد   background-image: url("data:image/svg+xml,%3Csvg xmlns=...")
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط عنوان «قهوة الركن»: كلامه أبيض فوق نقشة. حط النقشة اللي في التعليق كـ [[background-image]]، وتحتها لون احتياطي [[#78350f]] عشان الكلام يفضل مقروء لو النقشة متحمّلتش. (من قسم ٢ و ٣ في الشرح)`, done: R`النقشة باينة، واللون البني تحتها، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .bar { padding: 24px 16px; color: white; font-size: 22px; }
  /* النقشة:
     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cellipse cx='16' cy='16' rx='5' ry='7' fill='%2392400e'/%3E%3C/svg%3E")
  */
</style>
<div class="bar">قهوة الركن</div>`, checks: [
              { say: R`النقشة اتحطت صورة خلفية`, q: ".bar", style: ["background-image", "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cellipse cx='16' cy='16' rx='5' ry='7' fill='%2392400e'/%3E%3C/svg%3E\")"] },
              { say: R`تحتها لون بني [[#78350f]]`, q: ".bar", style: ["background-color", "rgb(120, 53, 15)"] },
              { say: R`الكلام لسه أبيض`, q: ".bar", style: ["color", "rgb(255, 255, 255)"] }
            ] }, sol: R`~~~live 100 الحل
<style>
  .bar { padding: 24px 16px; color: white; font-size: 22px;
         background-color: #78350f;
         background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cellipse cx='16' cy='16' rx='5' ry='7' fill='%2392400e'/%3E%3C/svg%3E"); }
</style>
<div class="bar">قهوة الركن</div>
~~~

**هتشوف إيه:** شريط بني غامق عليه حبات بن بيضاوي أفتح منه شوية، و «قهوة الركن» أبيض فوقها.

**ليه كده:** الحبات نفسها بني أفتح ([[#92400e]])، والفراغ اللي حواليها شفاف، فاللون اللي تحتها هو اللي مالي المسافات. ولو النقشة مظهرتش، الشريط هيفضل بني والأبيض مقروء عليه.

**الغلطة الشائعة:** تحط النقشة من غير لون، فالفراغات تبقى بيضا (لون الصفحة) والكلام الأبيض يختفي فيها.

~~~text القياس من Chrome
.bar   background-color: rgb(120, 53, 15)    background-image: url("data:image/svg+xml,...")
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<section>]] خلفيته [[#d1fae5]] (أخضر فاتح)، وجواه [[<p>]] من غير أي خلفية. لو قريت [[getComputedStyle(p).backgroundColor]] في الـ Console، هيرجع إيه؟ وبعينك الفقرة لونها إيه؟ اكتب الإجابتين، وبعدين افتح الحل. (من قسم ١ في الشرح: «الخلفية مبتتورّثش»)`, done: R`كتبت إن الكود هيرجّع شفاف ([[rgba(0, 0, 0, 0)]]) وإن الفقرة بتبان خضرا، وعرفت ليه.`, sol: R`~~~live 90 الصفحة
<style>
  section { background-color: #d1fae5; padding: 12px; }
</style>
<section><p>فقرة من غير خلفية</p></section>
~~~

**الإجابة:** الكود بيرجّع [[rgba(0, 0, 0, 0)]]، وبعينك الفقرة **خضرا**.

**هتشوف إيه:** صندوق أخضر فاتح، والفقرة جواه على نفس الأخضر.

**السبب:** [[background-color]] من الخصائص اللي **مبتتورّثش** (عكس [[color]] و [[font-family]]). الفقرة قيمتها الافتراضية [[transparent]]، والأخضر اللي شايفه هو الـ section من ورا الفقرة الشفافة.

~~~text القياس من Chrome
section   background-color: rgb(209, 250, 229)
p         background-color: rgba(0, 0, 0, 0)
~~~

**ليه ده مهم:** لو بتكتب كود بيقرا «لون الخلفية اللي ورا الكلام» (عشان يحسب التباين مثلًا)، لازم يطلع لفوق في الأبهات لحد ما يلاقي لون مش شفاف.` },
            { lvl: 'تحدي', t: R`**ابني:** أيقونة pixel art مقاسها الحقيقي 4×4 بكسل. كبّرها لـ 64×64 بـ [[background-size: 100%]]، وخليها حادة (مربعات واضحة) مش مغبّشة. (من قسم ٧ في الشرح)`, done: R`الأيقونة 64×64 ومربعاتها حادة، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .icon {
    width: 32px; height: 32px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGklEQVR4nGP49/l4hSk/hGSAs/59Ps6AUwYA05IboQjnpSoAAAAASUVORK5CYII=");
    background-size: 100%;
  }
</style>
<div class="icon"></div>`, checks: [
              { say: R`الأيقونة عرضها 64px`, q: ".icon", style: ["width", "64px"] },
              { say: R`وارتفاعها 64px`, q: ".icon", style: ["height", "64px"] },
              { say: R`المربعات حادة: [[pixelated]]`, q: ".icon", style: ["image-rendering", "pixelated"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .icon {
    width: 64px; height: 64px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGklEQVR4nGP49/l4hSk/hGSAs/59Ps6AUwYA05IboQjnpSoAAAAASUVORK5CYII=");
    background-size: 100%;
    image-rendering: pixelated;
  }
</style>
<div class="icon"></div>
~~~

وده اللي كان باين قبل (32px ومن غير [[pixelated]]):

~~~live 70 قبل
<style>
  .icon {
    width: 32px; height: 32px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGklEQVR4nGP49/l4hSk/hGSAs/59Ps6AUwYA05IboQjnpSoAAAAASUVORK5CYII=");
    background-size: 100%;
  }
</style>
<div class="icon"></div>
~~~

**هتشوف إيه:** قبل: مربع صغير مغبّش بلون بني مصفر. بعد: مربع أكبر فيه 16 مربع صغير حاد، بني وأصفر بالتبادل زي رقعة الشطرنج.

**ليه كده:** [[background-size: 100%]] بتمط الصورة لعرض الصندوق (الدرس الجاي)، فكل بكسل في الصورة بقى 16×16 على الشاشة. والمتصفح كان بيملا المسافات بين البكسلات بألوان متوسطة (تنعيم). [[pixelated]] بتقوله «كرّر نفس اللون، متخترعش».

**الغلطة الشائعة:** [[image-rendering: crisp-edges]] على أمل إنها «أحد». في Chrome بتطلع قريب من [[pixelated]]، بس معناها في المواصفة مختلف، و [[pixelated]] هي اللي اتعملت للحالة دي بالظبط.

~~~text القياس من Chrome
.icon   width: 64px   height: 64px   image-rendering: pixelated
~~~` }
          ]
        },
        {
          cmd: "background-size و background-position",
          title: "مقاس صورة الخلفية ومكانها وتكرارها، والمختصرة، وأكتر من خلفية",
          pre: ["css/background-color و background-image"],
          ref: [
            { t: "MDN: background-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-size" },
            { t: "MDN: background-position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-position" },
            { t: "MDN: background-position-x", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-position-x" },
            { t: "MDN: <position>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/position_value" },
            { t: "MDN: background-repeat", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-repeat" },
            { t: "MDN: background-attachment", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-attachment" },
            { t: "MDN: background-origin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-origin" },
            { t: "MDN: background-clip", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-clip" },
            { t: "MDN: background", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background" },
            { t: "MDN: Using multiple backgrounds", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Backgrounds_and_borders/Using_multiple_backgrounds" }
          ],
          desc: R`صورة الخلفية افتراضيًا بتتكرر في الاتجاهين، وبتبدأ من الركن اللي فوق على الشمال، وبمقاسها الحقيقي. [[background-repeat]] و [[background-position]] و [[background-size]] بيغيّروا التلاتة دول.
وفيه تلات خصائص تانية: [[background-attachment]] (الصورة بتتحرك مع السكرول ولا لأ)، و [[background-origin]] و [[background-clip]] (الصورة بتبدأ منين وبتتقص فين). والمختصرة [[background]] بتكتبهم كلهم في سطر، وبتقبل أكتر من خلفية فوق بعض.`,
          example: R`.hero { background-repeat: no-repeat; }
.hero { background-position: center; }
.hero { background-size: cover; }
.search { background-position: right 12px center; }
.box { background-attachment: local; }
.title { background-clip: text; color: transparent; }
.hero { background: url("cafe.jpg") center / cover no-repeat #78350f; }
.card { background: url("cup.svg") left 12px top 12px / 24px no-repeat, #fef3c7; }`,
          flag: "script",
          lines: [
            R`الصورة تترسم مرة واحدة بس، من غير تكرار.`,
            R`مكانها في نص الصندوق بالعرض والطول. ([[center]] كلمة واحدة، والتانية بتتفهم [[center]] كمان.)`,
            R`الصورة تتكبّر أو تصغر لحد ما تغطي الصندوق كله، والزيادة تتقص. نسبة عرضها لطولها متتغيّرش.`,
            R`أيقونة في خانة البحث: 12px من الحافة اليمين، وفي النص بالطول. [[right]] هنا يمين فعلًا، حتى في صفحة عربي.`,
            R`الخلفية تتحرك مع الكلام لما تعمل سكرول **جوه** الصندوق (الافتراضي إنها ثابتة مع الصندوق نفسه).`,
            R`الخلفية تتقص على شكل الحروف، والكلام شفاف، فالحروف نفسها بتبان «متلوّنة» بالخلفية.`,
            R`المختصرة: الصورة، ومكانها، و [[/]] وبعدها المقاس، ومن غير تكرار، واللون تحت. أي حاجة مش مكتوبة بترجع لقيمتها الافتراضية.`,
            R`خلفيتين مفصولين بفاصلة: أيقونة كوباية فوق (الأولى في القايمة هي اللي فوق)، واللون في آخر طبقة. (هنا اللون طبقة لوحده، والمتصفح بيعدّها طبقة صورتها [[none]]. الأنضف تكتبه جوه آخر طبقة فيها صورة.)`
          ],
          teach: R`## الفكرة في سطرين

[[background-image]] (الدرس اللي فات) بتقول «إيه الصورة». الدرس ده بيقول «فين، وبأي مقاس، وتتكرر ولا لأ، وتتقص فين». وكل خاصية فيهم ليها قيمة افتراضية، فلو مكتبتش حاجة الصورة بتطلع مكررة ومن الركن ومقاسها الحقيقي.

~~~text القياس من Chrome (الافتراضي على أي عنصر)
background-repeat: repeat          background-position: 0% 0%       background-size: auto
background-attachment: scroll      background-origin: padding-box    background-clip: border-box
~~~

كل الأمثلة بصورة SVG صغيرة مكتوبة جوه الـ CSS ([[data:]]، اتشرحت في الدرس اللي فات).

---

## ١. [[background-repeat: no-repeat]]

~~~live 270 أربع قيم لنفس الصورة
<style>
  .r { height: 56px; margin: 4px 0; background-color: #fef3c7; font: 13px monospace; direction: ltr; text-align: left;
       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='14' fill='%23b45309'/%3E%3C/svg%3E"); }
</style>
<div class="r" style="background-repeat: repeat">repeat</div>
<div class="r" style="background-repeat: repeat-x">repeat-x</div>
<div class="r" style="background-repeat: no-repeat">no-repeat</div>
<div class="r" style="background-repeat: space">space</div>
~~~

**هتشوف إيه:** الصورة دايرة 40×40 والصندوق ارتفاعه 56، فالصف الأول دواير كاملة وتحتها نص صف مقصوص. الصف التاني صف واحد بالعرض بس. التالت دايرة واحدة في الركن. الرابع دواير **كاملة** بمسافات متساوية بينها، من غير ولا دايرة مقصوصة.

| القيمة | بتعمل إيه |
|---|---|
| [[repeat]] | الافتراضي: تتكرر في الاتجاهين، واللي يفيض من الحافة يتقص |
| [[repeat-x]] | تتكرر بالعرض بس |
| [[repeat-y]] | تتكرر بالطول بس |
| [[no-repeat]] | مرة واحدة بس، والباقي فاضي |
| [[space]] | تتكرر بأكبر عدد نسخ **كاملة** يدخل، والباقي مسافات بينهم |
| [[round]] | تتكرر بعدد نسخ كاملة، وتتمط أو تنكمش شوية عشان تملا المكان بالظبط |

وممكن قيمتين: الأولى للعرض والتانية للطول.

~~~text القياس من Chrome (المحسوب)
repeat no-repeat   →  repeat-x       ← المتصفح بيختصرها
no-repeat repeat   →  repeat-y
space round        →  space round    ← ملهاش اختصار فبتفضل اتنين
~~~

---

## ٢. [[background-position: center]]

### القيم

| اللي بتكتبه | المحسوب في Chrome | معناه |
|---|---|---|
| [[center]] | [[50% 50%]] | النص |
| [[left]] | [[0% 50%]] | الحافة الشمال، وفي النص بالطول |
| [[right top]] و [[top right]] | [[100% 0%]] | الركن اللي فوق يمين. الترتيب مش مهم مع الكلمات |
| [[20px 10px]] | [[20px 10px]] | 20 من الشمال و 10 من فوق. هنا الترتيب مهم: الأول العرض |
| [[right 10px bottom 10px]] | [[calc(100% - 10px) calc(100% - 10px)]] | 10 من اليمين و 10 من تحت |
| [[center bottom 5px]] | [[50% calc(100% - 5px)]] | النص بالعرض، و 5 من تحت |

### النسبة المئوية بتشتغل إزاي

[[30%]] **مش** «30% من عرض الصندوق». معناها: النقطة اللي عند 30% من الصورة تتحط على النقطة اللي عند 30% من الصندوق. عشان كده [[100%]] بتلزّق الصورة في الحافة اليمين بالظبط (مش بتطلّعها برّه)، و [[50%]] بتحطها في النص بالظبط.

~~~live 110 0% و 50% و 100%
<style>
  .p { height: 80px; background-color: #e0f2fe; background-repeat: no-repeat;
       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30'%3E%3Crect width='60' height='30' rx='6' fill='%230369a1'/%3E%3C/svg%3E"),
                         url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30'%3E%3Crect width='60' height='30' rx='6' fill='%230369a1'/%3E%3C/svg%3E"),
                         url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30'%3E%3Crect width='60' height='30' rx='6' fill='%230369a1'/%3E%3C/svg%3E");
       background-position: 0% 0%, 50% 50%, 100% 100%; }
</style>
<div class="p"></div>
~~~

**هتشوف إيه:** تلات مستطيلات زرقا في صندوق واحد: واحد لازق في الركن اللي فوق شمال ([[0% 0%]])، وواحد في النص بالظبط ([[50% 50%]])، وواحد لازق في الركن اللي تحت يمين ([[100% 100%]]) من غير ما يخرج برّه.

### [[<position>]]: نوع القيمة ده بيتكرر في أماكن كتير

الطريقة دي في كتابة المكان (كلمات، أو نسب، أو أطوال، أو حافة وبعدها مسافة) ليها اسم في CSS: نوع [[<position>]]. هتقابله بنفس القواعد في:

| الخاصية | فين بيتشرح |
|---|---|
| [[background-position]] | الدرس ده، قسم ٢ |
| [[object-position]] | مكان الصورة جوه [[<img>]]: درس «object-fit» |
| [[mask-position]] | مكان القناع: درس «mask» |
| [[at center]] جوه [[radial-gradient()]] و [[conic-gradient()]] | درس «linear-gradient و radial-gradient» |
| [[at 50% 50%]] جوه [[circle()]] و [[ellipse()]] | درس «mix-blend-mode و clip-path» |

### [[background-position-x]] و [[background-position-y]]

[[background-position]] مختصرة لخاصيتين: واحدة للعرض وواحدة للطول. بتنفع لما عايز تغيّر اتجاه واحد بس من غير ما تكتب التاني تاني:

~~~text القياس من Chrome
background-position: right 10px bottom 10px
  → background-position-x: calc(100% - 10px)     background-position-y: calc(100% - 10px)

.icon:hover { background-position-y: 100%; }    ← غيّر الطول بس، والعرض زي ما هو
~~~

### في الصفحة العربي: [[left]] لسه شمال

[[background-position]] **مبتتعكسش** مع [[dir="rtl"]]. [[0% 0%]] (الافتراضي) يعني الركن اللي فوق **شمال**، حتى في صفحة عربي، عكس الكلام اللي بيبدأ من اليمين.

~~~live 120 نفس القاعدة في الاتجاهين
<style>
  .s { width: 220px; padding: 8px; padding-inline-start: 36px; margin: 6px 0; border: 1px solid #94a3b8; font-size: 16px;
       background: no-repeat left 10px center / 18px
       url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2.5'%3E%3Ccircle cx='10' cy='10' r='7'/%3E%3Cpath d='M15 15l6 6'/%3E%3C/svg%3E"); }
</style>
<input class="s" dir="ltr" value="Search">
<input class="s" value="ابحث في المنيو">
~~~

**هتشوف إيه:** في الخانتين العدسة على **الشمال**. في الإنجليزي ده صح: العدسة في البداية والكلام بعدها. في العربي الـ padding اتعكس لوحده وبقى على اليمين (فاضي)، والعدسة فضلت على الشمال في آخر الخانة، ولو الكلام طويل هيركب عليها.

المتصفح مفيهوش [[background-position]] «logical» (بداية/نهاية): Chrome رفض [[background-position-inline]] و [[background-position: start]] ([[CSS.supports]] رجّع false). فالحل إنك تعكس بإيدك:

~~~css
.search { padding-inline-start: 36px; background-position: left 10px center; }
[dir="rtl"] .search { background-position: right 10px center; }
~~~

[[padding-inline-start]] بتتعكس لوحدها (درس «logical properties»)، و [[background-position]] لأ، فاكتب لها قاعدة للعربي.

---

## ٣. [[background-size: cover]]

| القيمة | المحسوب | بتعمل إيه |
|---|---|---|
| [[auto]] | [[auto]] | المقاس الحقيقي للصورة (الافتراضي) |
| [[40px]] | [[40px auto]] | العرض 40، والطول يتحسب بنفس النسبة |
| [[40px 20px]] | [[40px 20px]] | عرض وطول. ممكن تمط الصورة |
| [[100%]] | [[100% auto]] | عرض الصورة = عرض الصندوق |
| [[cover]] | [[cover]] | أصغر مقاس **يغطي** الصندوق كله. الزيادة تتقص |
| [[contain]] | [[contain]] | أكبر مقاس **يدخل** كله جوه الصندوق. ممكن يفضل فراغ |

~~~live 180 cover و contain على صورة عرضها ضعف طولها
<style>
  .z { width: 45%; height: 150px; display: inline-block; margin: 4px; background-color: #e7e5e4; background-repeat: no-repeat; background-position: center;
       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23fde68a'/%3E%3Ccircle cx='90' cy='18' r='9' fill='%23f59e0b'/%3E%3Cpath d='M0 60L40 22L70 50L90 34L120 60Z' fill='%2378350f'/%3E%3C/svg%3E"); }
</style>
<div class="z" style="background-size: cover"></div>
<div class="z" style="background-size: contain"></div>
~~~

**هتشوف إيه:** على اليمين ([[cover]]) الصورة مالية الصندوق، والشمس والجبل مقصوصين من الجنبين. على الشمال ([[contain]]) الصورة كاملة بالعرض، وفوقها وتحتها رمادي فاضي.

**الحسبة** (لو الصندوق 250×150، والصورة نسبتها 2:1): [[cover]] لازم تغطي **الاتنين**: عشان الطول يبقى 150 العرض لازم 300، فالصورة 300×150 والزيادة (50px) بتتقص من الجنبين بالنص. [[contain]] لازم **كلها** تدخل: عشان العرض يبقى 250 الطول 125، فالصورة 250×125 ويفضل 25px فاضيين فوق وتحت. عرض الصندوق عندك بيتغيّر مع الشاشة، والقاعدة ثابتة.

[[cover]] للصور الكبيرة ورا العناوين. [[contain]] للوجو أو رسمة لازم تبان كاملة. والاتنين مع [[no-repeat]] و [[center]] غالبًا.

---

## ٤. [[background-attachment: local]]

الخاصية دي بتحدد الصورة بتتحرك مع إيه وقت السكرول.

| القيمة | الصورة ثابتة بالنسبة لـ |
|---|---|
| [[scroll]] | الصندوق نفسه (الافتراضي). لو الصفحة اتحركت، الصندوق اتحرك والصورة معاه. بس لو عملت سكرول **جوه** الصندوق، الصورة واقفة والكلام بيعدّي فوقها |
| [[local]] | **المحتوى** جوه الصندوق: لو عملت سكرول جواه، الصورة بتتحرك مع الكلام |
| [[fixed]] | الشاشة نفسها: الصندوق بيتحرك والصورة واقفة، كأنك بتبص عليها من شباك |

~~~live 160 اعمل سكرول جوه الصندوقين
<style>
  .sc { width: 45%; height: 120px; overflow: auto; display: inline-block; margin: 4px; border: 1px solid #a8a29e; vertical-align: top;
        background-image: repeating-linear-gradient(#fff 0 22px, #e0f2fe 22px 44px); }
  .sc p { margin: 0; line-height: 22px; padding: 0 6px; }
</style>
<div class="sc" style="background-attachment: scroll"><p>scroll</p><p>سطر ٢</p><p>سطر ٣</p><p>سطر ٤</p><p>سطر ٥</p><p>سطر ٦</p><p>سطر ٧</p><p>سطر ٨</p><p>سطر ٩</p></div>
<div class="sc" style="background-attachment: local"><p>local</p><p>سطر ٢</p><p>سطر ٣</p><p>سطر ٤</p><p>سطر ٥</p><p>سطر ٦</p><p>سطر ٧</p><p>سطر ٨</p><p>سطر ٩</p></div>
~~~

**هتشوف إيه:** الصندوقين فيهم شرايط أبيض وأزرق فاتح بالتبادل، كل شريط قد سطر، وكل سطر كلام قاعد في شريط. اعمل سكرول جوه كل واحد: في [[scroll]] الشرايط واقفة والكلام بيتزحلق فوقها، فالسطور بتقع في نص الشرايط. في [[local]] الشرايط ماشية مع الكلام وكل سطر فاضل في شريطه.

(الشرايط دي اتعملت بتدرّج متكرر، درس «linear-gradient و radial-gradient».)

**عن [[fixed]]:** بيعمل تأثير «parallax» البسيط. اتنين حاجة لازم تعرفهم (من MDN): الصورة بتتحسب على مقاس **الشاشة** مش الصندوق (فـ [[cover]] بتغطي الشاشة)، و Safari على iPhone بيتجاهلها وبيعاملها زي [[scroll]]. فمتبنيش تصميم يبوظ من غيرها.

---

## ٥. [[background-origin]] و [[background-clip]]

الصندوق ليه تلات حدود (درس «box model»): حافة المحتوى، وحافة الـ padding، وحافة الـ border. الخاصيتين دول بيختاروا منهم:

| الخاصية | السؤال | الافتراضي |
|---|---|---|
| [[background-origin]] | الصورة **بتبدأ** منين؟ (فين [[0% 0%]]، وعلى أي مساحة [[cover]] و [[100%]] بتتحسب) | [[padding-box]] |
| [[background-clip]] | الخلفية (لون وصورة) **تتقص** فين؟ | [[border-box]] |

والقيم في الاتنين: [[border-box]] و [[padding-box]] و [[content-box]]. و [[background-clip]] ليها قيمة رابعة: [[text]].

~~~live 170 اللون نفسه بتلات قيم لـ background-clip
<style>
  .c { display: inline-block; width: 22%; margin: 4px; padding: 14px; border: 10px dashed #78350f;
       background-color: #fbbf24; font-size: 13px; vertical-align: top; }
</style>
<div class="c" style="background-clip: border-box">border-box (الافتراضي)</div>
<div class="c" style="background-clip: padding-box">padding-box</div>
<div class="c" style="background-clip: content-box">content-box</div>
~~~

**هتشوف إيه:** الأول الأصفر باين بين شُرَط الـ border. التاني الأصفر بيقف عند جوه الـ border. التالت الأصفر على الكلام بس، والـ padding حواليه أبيض.

وأشهر استخدام لـ [[padding-box]]: border نص شفاف ([[rgb(0 0 0 / 0.2)]]) والخلفية متبانش من تحته.

### [[background-clip: text]]

الخلفية تتقص على شكل الحروف. ومعاها الكلام لازم يبقى شفاف، وإلا لون الكلام هيغطي عليها:

~~~live 80 كلام متلوّن بتدرّج
<style>
  .grad { font: 800 40px system-ui, sans-serif; margin: 0; width: fit-content;
          background: linear-gradient(90deg, #b45309, #db2777);
          background-clip: text; color: transparent; }
</style>
<h1 class="grad">قهوة الركن</h1>
~~~

**هتشوف إيه:** العنوان حروفه متلوّنة بتدرّج من البني للبمبي، ومفيش مستطيل ملوّن وراه.

~~~text القياس من Chrome
background-clip: text           → مقبولة (Baseline)
-webkit-background-clip: text   → مقبولة كمان (الاسم القديم، مش محتاجه في كود جديد)
background-clip: border-area    → مقبولة في Chrome 157 بس مش Baseline
~~~

لاحظ إن [[background-clip]] مكتوبة **بعد** [[background]]. الترتيب ده مهم، وده القسم الجاي.

---

## ٦. المختصرة [[background]]

~~~text تشريح المختصرة
background:  url("cafe.jpg")   center / cover   no-repeat   padding-box content-box   #78350f
             └ الصورة          └ المكان / المقاس └ التكرار  └ origin ثم clip           └ اللون
~~~

القواعد:

1. **الترتيب حر،** إلا في حاجتين: المقاس **لازم** ييجي بعد المكان وبينهم [[/]] ([[center / cover]]). من غير مكان مينفعش مقاس.
2. **لو كتبت box واحد** ([[border-box]]) بيتحط في الاتنين. لو اتنين: الأول [[origin]] والتاني [[clip]].
3. **اللون في آخر طبقة بس** (القسم الجاي).
4. **اللي مكتبتوش بيرجع لقيمته الافتراضية،** زي [[font]] و [[text-decoration]].

~~~text القياس من Chrome
background: #fef3c7 url(cup.png) no-repeat right 10px center / 40px
  → color rgb(254, 243, 199)   repeat no-repeat   position calc(100% - 10px) 50%   size 40px auto

background-color: red;  background: url(cup.png);
  → background-color: rgba(0, 0, 0, 0)      ← الأحمر اتمسح

background-clip: text;  background: linear-gradient(red, blue);
  → background-clip: border-box             ← الـ text اتمسحت، والعنوان بقى مستطيل ملوّن
~~~

القاعدة العملية: [[background]] المختصرة **أول سطر**، وأي خاصية طويلة تعدّلها **بعدها**.

---

## ٧. أكتر من خلفية: فاصلة بين كل طبقة

[[background-image]] بتاخد قايمة صور مفصولة بفاصلة. **الأولى في القايمة هي اللي فوق**، والأخيرة تحت، واللون تحت الكل.

~~~live 110 أيقونة فوق نقشة فوق لون
<style>
  .card {
    height: 80px; padding: 12px 56px 12px 12px; font-size: 18px;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2' fill='%2378350f'/%3E%3C/svg%3E") right 12px top 12px / 32px no-repeat,
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23d6a96a'/%3E%3C/svg%3E") #fef3c7;
  }
</style>
<div class="card">كوباية فوق نقط فوق كريمي</div>
~~~

**هتشوف إيه:** خلفية كريمي عليها نقط صغيرة بنية فاتحة متكررة، وفي الركن اللي فوق يمين أيقونة كوباية بني غامق، والنقط مش باينة **فوقها** لأنها الطبقة الأولى (اللي فوق).

**الخصائص التانية بقت قوايم برضه:** لكل صورة مكانها ومقاسها وتكرارها، بنفس الترتيب. ولو القايمة أقصر من عدد الصور، **بتتكرر** من أولها:

~~~text القياس من Chrome
background-image: url(a.png), url(b.png), url(c.png);
background-size: 10px, 20px;
  → background-size: 10px auto, 20px auto, 10px auto      ← الصورة التالتة خدت أول قيمة تاني

background: url(a.png), #eee, url(b.png)
  → مرفوضة كلها: اللون في طبقة مش الأخيرة
~~~

واللون يتكتب **جوه** آخر طبقة (بعد صورتها بمسافة)، مش طبقة لوحده بعد فاصلة. لو كتبته لوحده بعد فاصلة السطر بيشتغل، بس المتصفح بيعمل طبقة زيادة صورتها [[none]]، فكل القوايم بتطول عنصر:

~~~text القياس من Chrome
background: url(cup.svg) no-repeat, url(dots.svg) #fef3c7
  → background-repeat: no-repeat, repeat                  ← طبقتين

background: url(cup.svg) no-repeat, url(dots.svg), #fef3c7
  → background-image: url(...), url(...), none
  → background-repeat: no-repeat, repeat, repeat          ← تلات طبقات
~~~

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[background-size: cover]] قبل [[background: url(...)]] | المختصرة رجّعت المقاس [[auto]] |
| [[background-clip: text]] قبل المختصرة | المستطيل الملوّن بيبان ورا الكلام |
| [[background: url(a.png) 40px / center]] | السطر مرفوض: المقاس بعد [[/]] لازم يبقى مقاس مش مكان |
| [[background-position: left]] في صفحة عربي وانت عايز البداية | الأيقونة على الشمال فوق آخر الكلام |
| [[cover]] على لوجو | أطراف اللوجو اتقصت. استخدم [[contain]] |
| [[background-attachment: fixed]] كأساس للتصميم | على iPhone مبيشتغلش |
| صورة ورا كلام ومن غير [[no-repeat]] | الصورة الصغيرة اتكررت بلاطات |
| لون في نص قايمة الخلفيات | السطر كله مرفوض |

---

## الخلاصة

- الافتراضي: تتكرر، ومن [[0% 0%]] (فوق شمال، حتى في العربي)، وبمقاسها الحقيقي.
- [[no-repeat]] و [[center]] و [[cover]] أشهر تلاتة مع بعض.
- النسبة في المكان بتحط نقطة من الصورة على نفس النقطة من الصندوق، فـ [[100%]] لازقة في الحافة.
- [[<position>]] نوع بيتكرر في [[object-position]] و [[mask-position]] و [[at]] في التدرّجات والأشكال.
- [[background-position]] مبتتعكسش: اكتب قاعدة للعربي لوحدها.
- [[origin]] منين تبدأ، و [[clip]] فين تتقص، و [[clip: text]] مع [[color: transparent]].
- المختصرة أول سطر، والأولى في القايمة فوق، واللون في الآخر.`,
          try: R`خد صورة SVG «منظر» من الشرح (قسم ٣) وحطها ورا [[<header>]] ارتفاعه 200px: في النص، ومن غير تكرار، ومغطية الصندوق كله. وبعدين صغّر عرض الشاشة لحد 360 وشوف الصورة بتتقص من فين. وبعدين جرّب [[background-position: right bottom]] وشوف إيه اللي اتغيّر.`,
          sol: R`~~~live 230 200 header.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هيدر بصورة</title>
<style>
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
  header {
    height: 200px;
    display: grid; place-items: center;
    color: white; font-size: 28px; font-weight: 700;
    text-shadow: 0 2px 4px rgb(0 0 0 / 0.6);
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23fde68a'/%3E%3Ccircle cx='90' cy='18' r='9' fill='%23f59e0b'/%3E%3Cpath d='M0 60L40 22L70 50L90 34L120 60Z' fill='%2378350f'/%3E%3C/svg%3E") center / cover no-repeat #92400e;
  }
</style>
</head>
<body>
<header>صباح الخير</header>
</body>
</html>
~~~

**هتشوف إيه:** الصورة مالية الهيدر كله، والعنوان الأبيض في النص بضل خفيف. على العرض الكبير الصورة بتتقص من فوق ومن تحت (لأن الهيدر أعرض من نسبة الصورة). على 360 (زرار الموبايل فوق المعاينة) بتتقص من **الجنبين**، والشمس اللي على اليمين بتختفي جزئيًا.

**مع [[right bottom]]:** القص كله بقى من الناحية التانية: الركن اللي تحت يمين في الصورة لازق في الركن اللي تحت يمين في الهيدر، فالشمس فضلت باينة على الموبايل.

**ليه [[#92400e]] في الآخر:** اللون الاحتياطي (الدرس اللي فات)، وهو في آخر المختصرة لأنه بيتحط في آخر طبقة.

~~~text القياس من Chrome
header   background-size: cover   background-position: 50% 50%   background-repeat: no-repeat
         background-color: rgb(146, 64, 14)
~~~`,
          deep: {
            why: R`أغلب صور الخلفية في المواقع الحقيقية محتاجة التلات سطور دول ([[no-repeat]] و [[center]] و [[cover]])، ومن غيرهم الصورة بتطلع متكررة أو مقصوصة من الركن. والباقي بيحل مشاكل محددة: أيقونة في خانة، وكلام متلوّن، وطبقات فوق بعض من غير ما تزوّد عناصر في الـ HTML.`,
            how: R`لكل طبقة خلفية المتصفح بيعمل: يحدد المساحة اللي الصورة بتتحسب عليها ([[background-origin]]، والـ viewport لو [[fixed]])، ويحسب مقاسها ([[background-size]])، ويحطها في مكانها ([[background-position]]: النقطة اللي عند X% من الصورة على النقطة اللي عند X% من المساحة)، ويكررها ([[background-repeat]])، ويقص كل ده عند [[background-clip]]. الطبقات بتترسم من آخر القايمة لأولها، واللون تحت الكل. القوايم الأقصر من عدد الصور بتتكرر لحد ما تكمل.`,
            when: R`[[cover]] + [[center]]: صورة الهيدر والأقسام. [[contain]]: لوجو أو رسمة لازم تبان كاملة. أطوال صغيرة + [[no-repeat]] + مكان: أيقونة جوه input أو زرار. [[local]]: صناديق سكرول (ورق كشكول، وظلال بتبين إن فيه كلام تحت). [[clip: text]]: عنوان كبير بتدرّج. خلفيات متعددة: نقشة + أيقونة + لون في عنصر واحد.`,
            mistakes: R`خاصية طويلة قبل المختصرة فبتتمسح. المقاس من غير [[/]] أو من غير مكان قبله. [[left]] في العربي. [[cover]] على لوجو. الاعتماد على [[fixed]] على الموبايل. لون في نص القايمة. ونسيان [[no-repeat]].`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صورة المنظر ورا الهيدر طالعة صغيرة ومتكررة ومن الركن. خليها مرة واحدة، وفي النص، ومغطية الهيدر كله. (من قسم ١ و ٢ و ٣ في الشرح)`, done: R`صورة واحدة مالية الهيدر، وكل الشروط ✓.`, work: { h: 170, start: R`<style>
  header {
    height: 140px; color: white; font-size: 26px; padding: 16px;
    background-color: #92400e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%23fde68a'/%3E%3Ccircle cx='90' cy='18' r='9' fill='%23f59e0b'/%3E%3Cpath d='M0 60L40 22L70 50L90 34L120 60Z' fill='%2378350f'/%3E%3C/svg%3E");
  }
</style>
<header>صباح الخير</header>`, checks: [
              { say: R`الصورة مبتتكررش`, q: "header", style: ["background-repeat", "no-repeat"] },
              { say: R`الصورة في النص`, q: "header", style: ["background-position", "50% 50%"] },
              { say: R`الصورة مغطية الهيدر كله`, q: "header", style: ["background-size", "cover"] }
            ] }, sol: R`~~~live 175 الحل
<style>
  header {
    height: 140px; color: white; font-size: 26px; padding: 16px;
    background-color: #92400e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%23fde68a'/%3E%3Ccircle cx='90' cy='18' r='9' fill='%23f59e0b'/%3E%3Cpath d='M0 60L40 22L70 50L90 34L120 60Z' fill='%2378350f'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
</style>
<header>صباح الخير</header>
~~~

وده اللي كان باين قبل:

~~~live 175 قبل
<style>
  header {
    height: 140px; color: white; font-size: 26px; padding: 16px;
    background-color: #92400e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%23fde68a'/%3E%3Ccircle cx='90' cy='18' r='9' fill='%23f59e0b'/%3E%3Cpath d='M0 60L40 22L70 50L90 34L120 60Z' fill='%2378350f'/%3E%3C/svg%3E");
  }
</style>
<header>صباح الخير</header>
~~~

**هتشوف إيه:** قبل: بلاطات صغيرة من نفس المنظر متكررة جنب بعض وتحت بعض. بعد: منظر واحد كبير مالي الهيدر.

**ليه كده:** [[no-repeat]] وقّفت التكرار، و [[cover]] كبّرت الصورة لحد ما غطّت، و [[center]] خلّت القص متساوي من الناحيتين.

**الغلطة الشائعة:** [[background-size: 100%]]. ده عرض الصورة = عرض الهيدر، والطول بالنسبة: على شاشة ضيقة الصورة هتطلع أقصر من الهيدر ويفضل بني تحتها.

**حل تاني صح:** سطر واحد: [[background: url("...") center / cover no-repeat #92400e;]].

~~~text القياس من Chrome
header   background-repeat: no-repeat   background-position: 50% 50%   background-size: cover
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عنوان «عروض الشتا» المفروض حروفه متلوّنة بتدرّج، بس طالع مستطيل ملوّن وراه والحروف مش باينة. السطور كلها موجودة، المشكلة في ترتيبهم. (من قسم ٥ و ٦ في الشرح)`, done: R`الحروف نفسها متلوّنة ومفيش مستطيل، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .title {
    font: 800 38px system-ui, sans-serif; margin: 0; width: fit-content;
    background-clip: text;
    color: transparent;
    background: linear-gradient(90deg, #0369a1, #7c3aed);
  }
</style>
<h1 class="title">عروض الشتا</h1>`, checks: [
              { say: R`الخلفية متقصوصة على الحروف ([[text]])`, q: ".title", style: ["background-clip", "text"] },
              { say: R`الكلام لسه شفاف`, q: ".title", style: ["color", "rgba(0, 0, 0, 0)"] }
            ] }, sol: R`~~~live 80 بعد التصليح
<style>
  .title {
    font: 800 38px system-ui, sans-serif; margin: 0; width: fit-content;
    background: linear-gradient(90deg, #0369a1, #7c3aed);
    background-clip: text;
    color: transparent;
  }
</style>
<h1 class="title">عروض الشتا</h1>
~~~

وده اللي كان باين قبل التصليح:

~~~live 80 قبل
<style>
  .title {
    font: 800 38px system-ui, sans-serif; margin: 0; width: fit-content;
    background-clip: text;
    color: transparent;
    background: linear-gradient(90deg, #0369a1, #7c3aed);
  }
</style>
<h1 class="title">عروض الشتا</h1>
~~~

**هتشوف إيه:** قبل: شريط عريض ملوّن من الأزرق للبنفسجي، والكلام مش باين (شفاف فوق التدرّج). بعد: الشريط اختفى، والحروف نفسها هي اللي متلوّنة.

**ليه:** [[background]] المختصرة بترجّع كل الخصائص اللي جواها لقيمتها الأولى، ومنها [[background-clip]] (رجعت [[border-box]]). فالسطر اللي تحتها مسح [[text]]. حطيت المختصرة أول سطر، والتعديل بعدها.

**الغلطة الشائعة:** تزوّد [[!important]] على [[background-clip]]. هتشتغل، بس المشكلة الحقيقية ترتيب، و [[!important]] بيعمل مشاكل أكبر بعدين (درس «cascade»).

~~~text القياس من Chrome
قبل   background-clip: border-box    color: rgba(0, 0, 0, 0)
بعد   background-clip: text          color: rgba(0, 0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة بحث في صفحة عربي. حط أيقونة العدسة اللي في التعليق كخلفية: مرة واحدة، و 10px من الحافة **اليمين** وفي النص بالطول، ومقاسها [[18px 18px]]. وسيب لها مكان بـ [[padding-inline-start: 36px]] عشان الكلام ميركبش عليها. (من قسم ٢ في الشرح: «في الصفحة العربي: [[left]] لسه شمال»)`, done: R`العدسة على اليمين قبل أول الكلام، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .search { width: 240px; padding: 8px; border: 1px solid #94a3b8; border-radius: 8px; font-size: 16px; }
  /* الأيقونة:
     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2.5'%3E%3Ccircle cx='10' cy='10' r='7'/%3E%3Cpath d='M15 15l6 6'/%3E%3C/svg%3E")
  */
</style>
<input class="search" placeholder="ابحث في المنيو">`, checks: [
              { say: R`الأيقونة مرة واحدة`, q: ".search", style: ["background-repeat", "no-repeat"] },
              { say: R`10px من اليمين وفي النص بالطول`, q: ".search", style: ["background-position", "calc(100% - 10px) 50%"] },
              { say: R`مقاسها 18 في 18`, q: ".search", style: ["background-size", "18px 18px"] },
              { say: R`مساحة 36px قبل الكلام (يمين في العربي)`, q: ".search", style: ["padding-right", "36px"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .search { width: 240px; padding: 8px; border: 1px solid #94a3b8; border-radius: 8px; font-size: 16px;
            padding-inline-start: 36px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2.5'%3E%3Ccircle cx='10' cy='10' r='7'/%3E%3Cpath d='M15 15l6 6'/%3E%3C/svg%3E") right 10px center / 18px 18px no-repeat; }
</style>
<input class="search" placeholder="ابحث في المنيو">
~~~

**هتشوف إيه:** عدسة رمادي غامق على يمين الخانة، والكلام «ابحث في المنيو» بيبدأ بعدها بمسافة، ومفيش حاجة راكبة على حاجة.

**ليه كده:**
- [[padding-inline-start]] بتتعكس لوحدها، ففي العربي بقت [[padding-right]].
- [[background-position]] مبتتعكسش، فكتبنا [[right 10px center]] صراحة.
- لو الموقع فيه إنجليزي كمان، زوّد قاعدة للصفحات اللي اتجاهها [[ltr]]:

~~~css
[dir="ltr"] .search { background-position: left 10px center; }
~~~

**الغلطة الشائعة:** [[background-position: left 10px center]] مع [[padding-inline-start]]: الـ padding على اليمين والأيقونة على الشمال فوق آخر الكلام.

~~~text القياس من Chrome
.search   background-position: calc(100% - 10px) 50%   background-size: 18px 18px
          padding-right: 36px    padding-left: 8px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** القاعدة دي فيها سطرين: [[.box { background-color: #fef3c7; background: url("dots.svg"); }]]. لون خلفية الصندوق هيبقى إيه؟ وليه؟ اكتب إجابتك، وبعدين افتح الحل. (من قسم ٦ في الشرح)`, done: R`كتبت إن اللون بقى شفاف لأن المختصرة اللي بعده مسحته.`, sol: R`~~~live 90 الصفحة
<style>
  .box { height: 60px; border: 1px dashed #78350f;
         background-color: #fef3c7;
         background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='8' cy='8' r='2' fill='%2378350f'/%3E%3C/svg%3E"); }
</style>
<div class="box"></div>
~~~

**الإجابة:** **شفاف**. الصندوق نقط بنية على أبيض الصفحة، مش على كريمي.

**هتشوف إيه:** نقط بني صغيرة على خلفية بيضا جوه حدود متقطّعة.

**السبب:** [[background]] مختصرة لتمان خصائص، منهم [[background-color]]. السطر التاني مكتبش لون، فرجّع اللون لقيمته الأولى ([[transparent]]) ومسح الكريمي.

**التصليح:** يا تبدّل ترتيب السطرين، يا تحط اللون جوه المختصرة: [[background: url("dots.svg") #fef3c7;]].

~~~text القياس من Chrome
.box   background-color: rgba(0, 0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صندوق «ملاحظات الطلب» بسكرول جواه، وخلفيته سطور زي الكشكول. المشكلة إن السطور واقفة والكلام بيتزحلق عليها. خلّي الخلفية تتحرك مع الكلام. (من قسم ٤ في الشرح)`, done: R`لما تعمل سكرول جوه الصندوق كل سطر فاضل على خطه، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .notes { height: 110px; overflow: auto; border: 1px solid #a8a29e; padding: 0 8px;
           background-image: repeating-linear-gradient(#fff 0 27px, #93c5fd 27px 28px); }
  .notes p { margin: 0; line-height: 28px; }
</style>
<div class="notes">
  <p>قهوة تركي مظبوط</p><p>من غير سكر</p><p>كوباية مية</p><p>الطلب للترابيزة ٤</p><p>الحساب كاش</p><p>شكرًا</p>
</div>`, checks: [
              { say: R`الخلفية بتتحرك مع المحتوى ([[local]])`, q: ".notes", style: ["background-attachment", "local"] },
              { say: R`الصندوق لسه بسكرول`, q: ".notes", style: ["overflow-y", "auto"] }
            ] }, sol: R`~~~live 140 الحل
<style>
  .notes { height: 110px; overflow: auto; border: 1px solid #a8a29e; padding: 0 8px;
           background-image: repeating-linear-gradient(#fff 0 27px, #93c5fd 27px 28px);
           background-attachment: local; }
  .notes p { margin: 0; line-height: 28px; }
</style>
<div class="notes">
  <p>قهوة تركي مظبوط</p><p>من غير سكر</p><p>كوباية مية</p><p>الطلب للترابيزة ٤</p><p>الحساب كاش</p><p>شكرًا</p>
</div>
~~~

**هتشوف إيه:** كل سطر كلام قاعد على خط أزرق رفيع. اعمل سكرول جوه الصندوق: الخطوط ماشية مع الكلام.

**ليه كده:** مع [[scroll]] (الافتراضي) الخلفية مربوطة بـ «شباك» الصندوق: السكرول جواه بيحرّك الكلام بس. [[local]] بتربطها بالمحتوى نفسه، فبتتحرك معاه.

**الغلطة الشائعة:** [[background-attachment: fixed]]. دي بتربطها بالشاشة كلها، فالسطور هتفضل واقفة برضه.

~~~text القياس من Chrome
.notes   background-attachment: local
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** كارت «قهوة الركن» بتلات طبقات في خاصية [[background]] واحدة: أيقونة الكوباية (في التعليق) فوق، في الركن اللي فوق **شمال** بمسافة 12px من الحافتين، ومقاسها 32px، ومن غير تكرار. وتحتها نقشة النقط متكررة. وتحت الكل لون [[#fef3c7]]. (من قسم ٦ و ٧ في الشرح)`, done: R`الكوباية في الركن فوق النقط، والكريمي تحت، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .card { height: 90px; padding: 12px 12px 12px 56px; font-size: 18px; }
  /* الكوباية:
     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2' fill='%2378350f'/%3E%3C/svg%3E")
     النقط:
     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23d6a96a'/%3E%3C/svg%3E")
  */
</style>
<div class="card">قهوة الركن</div>`, checks: [
              { say: R`تكرار الطبقتين: الكوباية مرة، والنقط متكررة`, q: ".card", style: ["background-repeat", "no-repeat, repeat"] },
              { say: R`الكوباية 12px من الشمال ومن فوق`, q: ".card", style: ["background-position", "12px 12px, 0% 0%"] },
              { say: R`الكوباية 32px`, q: ".card", style: ["background-size", "32px auto, auto"] },
              { say: R`اللون الكريمي تحت الكل`, q: ".card", style: ["background-color", "rgb(254, 243, 199)"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  .card { height: 90px; padding: 12px 12px 12px 56px; font-size: 18px;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2' fill='%2378350f'/%3E%3C/svg%3E") left 12px top 12px / 32px no-repeat,
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23d6a96a'/%3E%3C/svg%3E") #fef3c7;
  }
</style>
<div class="card">قهوة الركن</div>
~~~

**هتشوف إيه:** كارت كريمي منقّط، وفي الركن اللي فوق شمال كوباية بني، و «قهوة الركن» على اليمين.

**ليه كده:**
- الكوباية **أول** طبقة عشان تبقى فوق.
- [[left 12px top 12px / 32px]]: مكان بحافتين ومسافة، وبعد [[/]] المقاس.
- النقط مكتبناش لها غير الصورة، فخدت الافتراضي (تتكرر من [[0% 0%]]).
- اللون جوه آخر طبقة (بعد صورة النقط). لو حطيته في نص القايمة السطر كله هيترمي، ولو حطيته طبقة لوحده بعد فاصلة هتلاقي طبقة تالتة [[none]] في كل القوايم.

**الغلطة الشائعة:** تكتب النقط الأول. الكوباية هتبقى تحت النقط، والنقط هتبان فوقها.

~~~text القياس من Chrome
.card   background-repeat: no-repeat, repeat
        background-position: 12px 12px, 0% 0%
        background-size: 32px auto, auto
        background-color: rgb(254, 243, 199)
~~~` }
          ]
        },
        {
          cmd: "linear-gradient و radial-gradient",
          title: "تدرّج الألوان: خطّي ودايري ومخروطي ومتكرر، ونقشات من غير صور",
          pre: ["css/background-size و background-position"],
          ref: [
            { t: "MDN: linear-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient" },
            { t: "MDN: radial-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient" },
            { t: "MDN: conic-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient" },
            { t: "MDN: repeating-linear-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/repeating-linear-gradient" },
            { t: "MDN: repeating-radial-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/repeating-radial-gradient" },
            { t: "MDN: repeating-conic-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/repeating-conic-gradient" },
            { t: "MDN: <gradient>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient" },
            { t: "MDN: Using CSS gradients", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Images/Using_gradients" },
            { t: "CSS Images Level 4: gradients", url: "https://drafts.csswg.org/css-images-4/#gradients" }
          ],
          desc: R`التدرّج صورة المتصفح بيرسمها من ألوان بتكتبها، فبيتحط في [[background-image]] (أو [[background]]) زي أي صورة. [[linear-gradient()]] في خط مستقيم، و [[radial-gradient()]] من نقطة لبرّه في دواير، و [[conic-gradient()]] بيلف حوالين نقطة زي عقارب الساعة.
ولكل واحد نسخة [[repeating-*]] بتكرر نفسها، ومع نقط ألوان «حادة» و [[background-size]] بتعمل بيها خطوط ومربعات ونقط من غير ولا ملف صورة.`,
          example: R`.hero { background-image: linear-gradient(#78350f, #b45309); }
.bar { background: linear-gradient(to left, #0f766e, #14b8a6); }
.half { background: linear-gradient(90deg, #fde68a 50%, #78350f 50%); }
.spot { background: radial-gradient(circle at 30% 30%, #fef3c7, #92400e); }
.pie { background: conic-gradient(#b45309 0 60%, #fde68a 0); border-radius: 50%; }
.warn { background: repeating-linear-gradient(45deg, #facc15 0 12px, #1c1917 12px 24px); }
.dots { background: radial-gradient(#b45309 2px, transparent 3px) 0 0 / 16px 16px; }
.soft { background: linear-gradient(in oklch, #dc2626, #2563eb); }`,
          flag: "script",
          lines: [
            R`تدرّج من بني غامق فوق لبني أفتح تحت. من غير اتجاه = من فوق لتحت.`,
            R`من اليمين للشمال ([[to left]]): الأخضر الغامق على اليمين. في صفحة عربي ده من «البداية» للـ «النهاية».`,
            R`نص أصفر ونص بني بحد قاطع في النص: نقطتين في نفس المكان (50%) معناهم «مفيش تدرّج، اقلب فجأة».`,
            R`دايرة نور: فاتح عند نقطة 30% من الشمال و 30% من فوق، وبيغمق لحد الحواف.`,
            R`رسم بياني دايري: بني من 0 لحد 60% من اللفة، والباقي أصفر. و [[border-radius: 50%]] بتخلّي المربع دايرة.`,
            R`شرايط مايلة صفرا وسودا كل 12px، بتتكرر لوحدها لآخر الصندوق: علامة «تحت الإنشاء».`,
            R`نقطة بني صغيرة في نص بلاطة 16×16، والبلاطة بتتكرر: نقشة نقط من غير صور.`,
            R`من الأحمر للأزرق، بس الألوان اللي في النص بتتحسب في [[oklch]] فبتطلع زاهية بدل بنفسجي باهت.`
          ],
          teach: R`## الفكرة في سطرين

التدرّج **صورة**، مش لون. يعني مكانه [[background-image]] أو [[background]]، وكل حاجة اتعلمتها عن الصور (المكان والمقاس والتكرار وأكتر من طبقة، الدرس اللي فات) بتشتغل عليه. الفرق إن المتصفح بيرسمه، فمفيش ملف يتحمّل، وبيتكبّر من غير ما يتغبّش.

~~~text القياس من Chrome
background-color: linear-gradient(red, blue)   → مرفوضة (التدرّج مش لون)
background-image: linear-gradient(red, blue)   → linear-gradient(rgb(255, 0, 0), rgb(0, 0, 255))
~~~

والتدرّج **ملوش مقاس خاص بيه** (عكس صورة 40×40). فمن غير [[background-size]] بيتمد على الصندوق كله، ودي حاجة هتستخدمها في قسم ٦.

---

## ١. [[linear-gradient(#78350f, #b45309)]]

أبسط شكل: لونين أو أكتر، والمتصفح بيمزج بينهم في خط مستقيم. من غير اتجاه: **من فوق لتحت**.

### الاتجاه

| اللي بتكتبه | المحسوب في Chrome | الاتجاه |
|---|---|---|
| (من غير) أو [[to bottom]] | من غير اتجاه | من فوق لتحت |
| [[to right]] | [[to right]] | من الشمال لليمين |
| [[to top right]] | [[to right top]] | للركن اللي فوق يمين |
| [[90deg]] | [[90deg]] | زاوية: [[0deg]] لفوق، و [[90deg]] لليمين، و [[180deg]] لتحت، مع عقارب الساعة |
| [[0.25turn]] | [[90deg]] | [[turn]] لفة كاملة، فربع لفة = 90 درجة |

~~~live 150 الاتجاهات
<style>
  .g { display: inline-block; width: 30%; height: 56px; margin: 4px; font: 12px monospace; color: white; padding: 4px; box-sizing: border-box; direction: ltr; }
</style>
<div class="g" style="background: linear-gradient(#78350f, #fbbf24)">(default)</div>
<div class="g" style="background: linear-gradient(to right, #78350f, #fbbf24)">to right</div>
<div class="g" style="background: linear-gradient(to top right, #78350f, #fbbf24)">to top right</div>
<div class="g" style="background: linear-gradient(45deg, #78350f, #fbbf24)">45deg</div>
<div class="g" style="background: linear-gradient(180deg, #78350f, #fbbf24)">180deg</div>
<div class="g" style="background: linear-gradient(-90deg, #78350f, #fbbf24)">-90deg</div>
~~~

**هتشوف إيه** (بالترتيب من اليمين للشمال، زي ما الصفحة العربي بترتّب): ست مستطيلات، البني الغامق في كل واحد في «أول» الاتجاه والأصفر في آخره: فوق، وشمال، وتحت شمال، وتحت شمال (45 درجة ماشية لفوق يمين)، وفوق تاني ([[180deg]] زي الافتراضي)، ويمين ([[-90deg]] رايح للشمال).

**[[to top right]] و [[45deg]] مش زي بعض:** الكلمات بتوصّل **للركن** نفسه مهما كان شكل الصندوق، والدرجة زاوية ثابتة. في صندوق عريض ورفيع الفرق باين.

### في الصفحة العربي: [[to right]] لسه يمين

الاتجاهات دي **فعلية**: [[to right]] يعني ناحية اليمين حتى في [[dir="rtl"]]. مفيش [[to start]] و [[to end]].

~~~live 90 نفس القاعدة في الاتجاهين
<style>
  .b { padding: 8px 12px; margin: 4px 0; color: white; background: linear-gradient(to right, #0f766e, #99f6e4); }
</style>
<div class="b" dir="ltr">Start of the line</div>
<div class="b">أول السطر</div>
~~~

**هتشوف إيه:** الشريطين **نفس الشكل بالظبط**: أخضر غامق على الشمال وفاتح على اليمين. في الإنجليزي الكلام الأبيض على الغامق (البداية). في العربي الكلام الأبيض على الفاتح ومش مقروء.

الحل: اكتب الاتجاه اللي عايزه للعربي ([[to left]]). ولو الموقع لغتين، اعكسه بقاعدة للعربي:

~~~css
.b { background-image: linear-gradient(to right, #0f766e, #99f6e4); }
[dir="rtl"] .b { background-image: linear-gradient(to left, #0f766e, #99f6e4); }
~~~

---

## ٢. نقط الألوان (color stops)

كل لون ممكن ييجي بعده مكانه: نسبة أو طول. من غير مكان، المتصفح بيوزّع الألوان بالتساوي.

~~~live 230 خمس طرق لنفس اللونين
<style>
  .s { height: 34px; margin: 4px 0; font: 12px monospace; color: #000; padding: 4px 8px; direction: ltr; }
</style>
<div class="s" style="background: linear-gradient(to right, #fbbf24, #0369a1)">#fbbf24, #0369a1</div>
<div class="s" style="background: linear-gradient(to right, #fbbf24 40%, #0369a1 60%)">#fbbf24 40%, #0369a1 60%</div>
<div class="s" style="background: linear-gradient(to right, #fbbf24, 20%, #0369a1)">#fbbf24, 20%, #0369a1</div>
<div class="s" style="background: linear-gradient(to right, #fbbf24 50%, #0369a1 50%)">#fbbf24 50%, #0369a1 50%</div>
<div class="s" style="background: linear-gradient(to right, #fbbf24 0 30%, #f97316 30% 70%, #0369a1 70%)">3 colors, hard stops</div>
~~~

**هتشوف إيه:**

1. تدرّج ناعم على العرض كله.
2. أصفر سادة لحد 40%، وتدرّج سريع في المسافة الصغيرة من 40 لـ 60، وبعدها أزرق سادة.
3. [[20%]] لوحدها (من غير لون) اسمها **hint**: نقطة النص في التدرّج بقت عند 20%، فالأزرق بيطغى بدري.
4. **حد قاطع**: لونين في نفس المكان، فمفيش تدرّج خالص.
5. تلات شرايط سادة: كل لون معاه نقطتين ([[30% 70%]] = من 30 لحد 70).

| الشكل | معناه |
|---|---|
| [[#fbbf24 40%]] | اللون ده بالظبط عند 40% |
| [[#f97316 30% 70%]] | نقطتين: سادة من 30 لحد 70 |
| [[, 20%,]] بين لونين | الـ hint: مكان نقطة النص بين اللونين |
| [[#0369a1 0]] بعد [[#fbbf24 50%]] | النقطة أصغر من اللي قبلها، فبتتحط عندها: نفس معنى 50%. اختصار مشهور للحد القاطع |

~~~text القياس من Chrome (المحسوب)
red 0 30%, blue 30% 60%, green 60%
  → rgb(255, 0, 0) 0px, rgb(255, 0, 0) 30%, rgb(0, 0, 255) 30%, rgb(0, 0, 255) 60%, rgb(0, 128, 0) 60%
     ← اللون بنقطتين اتفك لنقطتين بنفس اللون

linear-gradient(red)   → مقبولة: لون واحد = صورة سادة بلون واحد
~~~

الحدود القاطعة هي سر النقشات كلها (قسم ٥ و ٦).

---

## ٣. [[radial-gradient(circle at 30% 30%, #fef3c7, #92400e)]]

التدرّج بيطلع من نقطة لبرّه في دواير (أو أشكال بيضاوي).

~~~text تشريح القيمة
radial-gradient(  circle   closest-side   at 30% 30%,   #fef3c7, #92400e )
                  └ الشكل  └ الحجم         └ المركز       └ الألوان من المركز لبرّه
~~~

| الجزء | القيم | الافتراضي |
|---|---|---|
| الشكل | [[circle]] أو [[ellipse]] | [[ellipse]] (بياخد شكل الصندوق) |
| الحجم | [[closest-side]] و [[farthest-side]] و [[closest-corner]] و [[farthest-corner]]، أو طول ([[40px]]) | [[farthest-corner]]: آخر لون بيوصل لأبعد ركن |
| المركز | [[at]] وبعدها [[<position>]] (نفس قواعد [[background-position]]) | [[at center]] |

~~~live 190 أربع دواير
<style>
  .r { display: inline-block; width: 46%; height: 80px; margin: 2px; font: 11px monospace; color: #fff; direction: ltr; }
</style>
<div class="r" style="background: radial-gradient(#fef3c7, #92400e)">default</div>
<div class="r" style="background: radial-gradient(circle, #fef3c7, #92400e)">circle</div>
<div class="r" style="background: radial-gradient(circle closest-side, #fef3c7, #92400e)">closest-side</div>
<div class="r" style="background: radial-gradient(circle at 30% 30%, #fef3c7, #92400e)">at 30% 30%</div>
~~~

**هتشوف إيه** (من اليمين): الأول بيضاوي ممطوط بعرض الصندوق، والبني في الأركان بس. التاني دايرة: الجنبين اليمين والشمال أغمق بكتير من فوق وتحت. التالت دايرة صغيرة قافلة بسرعة: البني يبدأ عند أقرب حافة، فكل الأركان بني سادة. الرابع النور مزاح لفوق شمال، زي نور جاي على كورة.

~~~text القياس من Chrome (المحسوب)
radial-gradient(circle at top left, ...)        → radial-gradient(circle at 0% 0%, ...)
radial-gradient(circle 40px at 20% 30%, ...)    → radial-gradient(40px at 20% 30%, ...)   ← طول واحد = دايرة، فشال circle
~~~

---

## ٤. [[conic-gradient(#b45309 0 60%, #fde68a 0)]]

الألوان بتلف **حوالين** المركز زي عقرب الساعة، بادئة من فوق. ومع حدود قاطعة بتعمل رسم بياني دايري (pie chart).

~~~live 140 تلاتة conic
<style>
  .c { display: inline-block; width: 100px; height: 100px; margin: 8px; border-radius: 50%; }
</style>
<div class="c" style="background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red)"></div>
<div class="c" style="background: conic-gradient(#b45309 0 60%, #fbbf24 0 85%, #fde68a 0)"></div>
<div class="c" style="background: conic-gradient(from 90deg at 50% 50%, #0f766e 0 25%, #e2e8f0 0)"></div>
~~~

**هتشوف إيه:** الأولى عجلة ألوان كاملة. التانية رسم بياني: بني 60%، وأصفر غامق 25%، وأصفر فاتح 15%، والبني بيبدأ من فوق ولافف ناحية اليمين. التالتة ربع أخضر بس بادئ من **اليمين** (اتلفّت 90 درجة بـ [[from 90deg]]).

| الجزء | معناه |
|---|---|
| [[from 90deg]] | زاوية البداية (الافتراضي 0 = فوق) |
| [[at 50% 50%]] | مركز اللفة، بقواعد [[<position>]] (الافتراضي النص) |
| [[#b45309 0 60%]] | من 0 لحد 60% من اللفة. وممكن درجات ([[0deg 216deg]]) |
| [[#fbbf24 0 85%]] | [[0]] = «من مكان اللي قبلي» (زي الحد القاطع)، لحد 85% |

[[border-radius: 50%]] هي اللي خلّت المربع دايرة (درس «border و border-radius»). من غيرها التدرّج بيلف في المربع لحد الأركان.

---

## ٥. [[repeating-linear-gradient()]] وإخواتها

النسخة المتكررة بتاخد آخر نقطة كـ «طول البلاطة» وتكررها لحد آخر الصندوق.

~~~live 130 تلات نقشات متكررة
<style>
  .p { display: inline-block; width: 30%; height: 100px; margin: 4px; }
</style>
<div class="p" style="background: repeating-linear-gradient(45deg, #facc15 0 12px, #1c1917 12px 24px)"></div>
<div class="p" style="background: repeating-radial-gradient(circle, #0369a1 0 6px, #e0f2fe 6px 12px)"></div>
<div class="p" style="background: repeating-conic-gradient(#78350f 0 10deg, #fde68a 10deg 20deg)"></div>
~~~

**هتشوف إيه:** شرايط مايلة صفرا وسودا (علامة تحذير)، ودواير زرقا جوه بعض زي النيشان، وأشعة بني وأصفر طالعة من النص.

| الدالة | بتكرر |
|---|---|
| [[repeating-linear-gradient()]] | شرايط مستقيمة أو مايلة |
| [[repeating-radial-gradient()]] | حلقات جوه بعض حوالين نقطة |
| [[repeating-conic-gradient()]] | أشعة أو قطاعات |

مع [[linear-gradient()]] العادي آخر لون بيكمّل سادة لآخر الصندوق. مع المتكرر النقش بيرجع من الأول.

---

## ٦. نقشات: تدرّج + [[background-size]]

بما إن التدرّج ملوش مقاس، [[background-size]] بتحدد «البلاطة»، والتكرار الافتراضي ([[repeat]]) بيرصّها.

~~~live 130 نقط ومربعات وشبكة
<style>
  .t { display: inline-block; width: 30%; height: 100px; margin: 4px; background-color: #fffbeb; }
  .dots { background-image: radial-gradient(#b45309 2px, transparent 3px); background-size: 16px 16px; }
  .check { background: repeating-conic-gradient(#78350f 0 25%, #fde68a 0 50%) 0 0 / 24px 24px; }
  .grid { background-image: linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
</style>
<div class="t dots"></div>
<div class="t check"></div>
<div class="t grid"></div>
~~~

**هتشوف إيه:** نقط بني صغيرة متوزعة بانتظام، ورقعة شطرنج بني وأصفر، وورق مربعات رمادي فاتح.

إزاي اتعملوا:

- **النقط:** دايرة بني نصها 2px، وبعد 3px شفاف. ([[2px]] ثم [[3px]] بدل نفس الرقم عشان حافة الدايرة تبقى ناعمة شوية.) والبلاطة 16×16.
- **الشطرنج:** [[repeating-conic-gradient]] بيعمل 4 مربعات بالتبادل في كل بلاطة 24×24.
- **الشبكة:** طبقتين (درس اللي فات): خط أفقي 1px وخط رأسي 1px في كل بلاطة 20×20.

---

## ٧. الألوان اللي في النص: [[in oklch]]

لما التدرّج بيمزج لونين، بيحسب الألوان اللي في النص في «مساحة ألوان» (color space). الافتراضي للألوان العادية ([[#hex]] و [[rgb()]]) هو [[srgb]]، وده بيطلّع وسط باهت أو رمادي بين لونين بعاد عن بعض. [[in oklch]] (أو [[in oklab]]) بيمزج بطريقة أقرب للعين.

~~~live 110 نفس اللونين بطريقتين
<style>
  .i { height: 40px; margin: 4px 0; font: 12px monospace; color: #fff; padding: 4px 8px; direction: ltr; }
</style>
<div class="i" style="background: linear-gradient(to right, #dc2626, #2563eb)">srgb (default)</div>
<div class="i" style="background: linear-gradient(to right in oklch, #dc2626, #2563eb)">in oklch</div>
~~~

**هتشوف إيه:** الأول في النص بنفسجي غامق باهت. التاني بيعدّي على بمبي وبنفسجي فاتح زاهيين.

~~~text القياس من Chrome
linear-gradient(in oklch, red, blue)   → مقبولة، والمحسوب بيحتفظ بـ "in oklch"
linear-gradient(to right in hsl longer hue, red, red)   → مقبولة: يلف عجلة الألوان كلها من الأحمر للأحمر
~~~

[[oklch]] نفسها كصيغة لون ليها درس («rgb و hsl و oklch»). هنا يكفي تعرف إنك تكتب [[in oklch]] بعد الاتجاه لو الوسط طالع وحش.

### [[transparent]] في التدرّج

زمان كان [[linear-gradient(transparent, white)]] بيطلّع وسط رمادي، لأن [[transparent]] معناها «أسود شفاف». النهارده المتصفحات بتمزج الشفافية صح (المواصفة اسمها premultiplied)، فالوسط أبيض نص شفاف من غير رمادي. اتشافت في صورة من Chrome. المحسوب لسه [[rgba(0, 0, 0, 0)]]، بس الرسم سليم.

---

## ٨. [[<gradient>]]: نوع القيمة

الست دوال ([[linear-gradient()]] و [[radial-gradient()]] و [[conic-gradient()]] والتلات [[repeating-*]]) كلهم من نوع [[<gradient>]]، وده جزء من نوع [[<image>]] (الدرس اللي فات). يعني أي مكان بياخد صورة بياخد تدرّج: [[background-image]]، و [[border-image-source]]، و [[mask-image]]، و [[list-style-image]].

---

## ٩. كلام فوق تدرّج: التباين

التدرّج معناه إن الخلفية **مش لون واحد**. لو كلام أبيض فوق تدرّج من غامق لفاتح، أول الكلام مقروء وآخره لأ. قيس التباين بين لون الكلام و**أفتح** لون في الحتة اللي تحت الكلام (درس «contrast ratio»)، مش المتوسط.

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[background-color: linear-gradient(...)]] | مرفوضة. التدرّج صورة |
| [[to right]] في العربي وانت قصدك «من البداية» | الاتجاه فعلي، فالغامق طلع في آخر السطر |
| [[45deg]] على أمل يوصل للركن | في صندوق مش مربع مش هيوصل. استخدم [[to top right]] |
| [[radial-gradient(#b45309 2px, transparent 2px)]] | النقطة حوافها مسننة. خلي التاني أكبر بـ 1px |
| [[conic-gradient]] من غير [[border-radius: 50%]] | رسم بياني مربع |
| نقشة بـ [[linear-gradient]] عادي ونسيت [[background-size]] | البلاطة بقت الصندوق كله: شريط واحد |
| كلام فاتح على آخر التدرّج الفاتح | مش مقروء |

---

## الخلاصة

- التدرّج صورة: [[background-image]] أو [[background]].
- [[linear-gradient]] افتراضيًا من فوق لتحت، و [[to right]] فعلي مبيتعكسش في العربي.
- نقطتين في نفس المكان = حد قاطع. لون بنقطتين = شريط سادة.
- [[radial-gradient(circle at X Y, ...)]] نور من نقطة. [[conic-gradient]] بيلف: رسم بياني مع [[border-radius: 50%]].
- [[repeating-*]] بتكرر البلاطة لوحدها. وأي تدرّج + [[background-size]] = نقشة.
- [[in oklch]] لو الوسط باهت.`,
          try: R`اعمل [[gradients.html]] فيه: شريط عنوان بتدرّج من بني غامق على اليمين لبني فاتح على الشمال، ودايرة 120px رسم بياني (قهوة 50%، وشاي 30%، وعصير 20%)، وصندوق خلفيته نقط. وبعدين غيّر [[to left]] لـ [[to right]] وشوف العنوان الأبيض بقى مقروء ولا لأ.`,
          sol: R`~~~live 330 gradients.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تدرّجات</title>
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
  .title { margin: 0 0 16px; padding: 12px 16px; color: white; background: linear-gradient(to left, #78350f, #d97706); }
  .pie { width: 120px; height: 120px; border-radius: 50%;
         background: conic-gradient(#78350f 0 50%, #16a34a 0 80%, #f97316 0); }
  .legend span { display: inline-block; margin-inline-end: 12px; }
  .dots { height: 70px; margin-top: 16px; border: 1px solid #e7e5e4;
          background: radial-gradient(#b45309 2px, transparent 3px) 0 0 / 16px 16px #fffbeb; }
</style>
</head>
<body>
<h1 class="title">مبيعات الأسبوع</h1>
<div class="pie"></div>
<p class="legend"><span>🟫 قهوة 50%</span><span>🟩 شاي 30%</span><span>🟧 عصير 20%</span></p>
<div class="dots"></div>
</body>
</html>
~~~

**هتشوف إيه:**

- شريط العنوان بني غامق على **اليمين** (تحت أول الكلام) وبيفتح ناحية الشمال، والعنوان الأبيض مقروء.
- دايرة: نصها بني (من فوق لافف لليمين لحد تحت)، وبعدها أخضر، وبعدها برتقاني.
- تحتها صندوق كريمي بنقط بنية.
- لو غيّرت لـ [[to right]]: الغامق راح للشمال، وأول العنوان بقى أبيض على بني فاتح وتقريبًا مش باين.

~~~text القياس من Chrome
.title   background-image: linear-gradient(to left, rgb(120, 53, 15), rgb(217, 119, 6))
.pie     border-top-left-radius: 50%
.dots    background-size: 16px 16px     background-color: rgb(255, 251, 235)
~~~

**ليه [[0]] في [[#16a34a 0 80%]]:** «ابدأ من مكان اللي قبلي» (50%). لو غيّرت النسب مش هتحتاج تكتب كل رقم مرتين.`,
          deep: {
            why: R`زمان الخلفيات المتدرّجة والنقشات كانت صور بتتقص في برامج الرسم وتتحمّل من السيرفر، وكل تعديل لون معناه صورة جديدة. التدرّج في CSS بيترسم في المتصفح: مفيش تحميل، وبيتكبّر من غير تغبيش، ولونه يتغيّر من سطر (أو من متغير). ورسم بياني بسيط أو علامة تحذير أو ورق مربعات بقوا سطر واحد.`,
            how: R`المتصفح بيحدد «خط التدرّج» (للـ linear: خط بيعدّي في نص الصندوق بالزاوية المطلوبة وطوله بيخلّي الأركان تاخد أول وآخر لون بالظبط؛ للـ radial: نصف القطر من الحجم المطلوب؛ للـ conic: اللفة 360 درجة). بعدين بيحط كل نقطة لون على الخط، ويصلّح أي نقطة أصغر من اللي قبلها لتساويها، ويمزج بين كل نقطتين في مساحة الألوان المطلوبة ([[srgb]] افتراضيًا للألوان القديمة، أو اللي بعد [[in]]) مع الشفافية «premultiplied». الصورة اللي بتطلع ملهاش مقاس، فبتاخد مقاس مساحة الخلفية أو [[background-size]].`,
            when: R`[[linear-gradient]]: خلفيات الهيدر والأزرار، وطبقة غامقة فوق صورة عشان الكلام يتقري، وحد قاطع لعمودين. [[radial-gradient]]: نور أو توهج، ونقط. [[conic-gradient]]: رسم بياني دايري، وعجلة ألوان، ودايرة تقدم. [[repeating-*]]: شرايط تحذير، ونيشان. تدرّج + [[background-size]]: ورق مربعات وشطرنج وأي نقشة هندسية.`,
            mistakes: R`تدرّج في [[background-color]]. [[to right]] في العربي. زاوية بدل [[to corner]]. حواف مسننة من رقمين متساويين. رسم بياني من غير [[border-radius]]. نقشة من غير [[background-size]]. وكلام فاتح على الطرف الفاتح.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** شريط «قهوة الركن» في صفحة عربي. خلّي خلفيته تدرّج [[to left]] من [[#78350f]] (تحت أول الكلام على اليمين) لـ [[#d97706]]. (من قسم ١ في الشرح)`, done: R`الغامق على اليمين والفاتح على الشمال، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .bar { padding: 14px 16px; color: white; font-size: 22px; background-color: #78350f; }
</style>
<div class="bar">قهوة الركن</div>`, checks: [
              { say: R`الخلفية تدرّج [[to left]] من البني الغامق للفاتح`, q: ".bar", style: ["background-image", "linear-gradient(to left, rgb(120, 53, 15), rgb(217, 119, 6))"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .bar { padding: 14px 16px; color: white; font-size: 22px; background-color: #78350f;
         background-image: linear-gradient(to left, #78350f, #d97706); }
</style>
<div class="bar">قهوة الركن</div>
~~~

**هتشوف إيه:** شريط بني غامق على اليمين تحت «قهوة الركن»، وبيفتح لحد برتقاني بني على الشمال.

**ليه كده:** [[to left]] يعني «رايح للشمال»، فالبداية (أول لون) على اليمين: نفس مكان أول الكلام في العربي. وسيبنا [[background-color]] زي ما هو: لون احتياطي تحت التدرّج.

**الغلطة الشائعة:** [[to right]] من عادة الإنجليزي. الغامق هيروح للشمال والكلام الأبيض هيقع على الفاتح.

**حل تاني صح:** [[-90deg]] أو [[270deg]] بيرسموا نفس الشكل، بس المحسوب هيبقى درجات مش [[to left]]، والشرط هنا بيقرا [[to left]].

~~~text القياس من Chrome
.bar   background-image: linear-gradient(to left, rgb(120, 53, 15), rgb(217, 119, 6))
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زرار «اطلب دلوقتي» المفروض خلفيته تدرّج أخضر، وطالع رمادي المتصفح العادي. صلّح سطر واحد. (من «الفكرة في سطرين» في الشرح)`, done: R`الزرار متدرّج أخضر، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .cta { padding: 10px 20px; border: 0; border-radius: 8px; color: white; font-size: 18px;
         background-color: linear-gradient(#16a34a, #166534); }
</style>
<button class="cta">اطلب دلوقتي</button>`, checks: [
              { say: R`التدرّج اتقبل كصورة خلفية`, q: ".cta", style: ["background-image", "linear-gradient(rgb(22, 163, 74), rgb(22, 101, 52))"] }
            ] }, sol: R`~~~live 70 بعد التصليح
<style>
  .cta { padding: 10px 20px; border: 0; border-radius: 8px; color: white; font-size: 18px;
         background-image: linear-gradient(#16a34a, #166534); }
</style>
<button class="cta">اطلب دلوقتي</button>
~~~

وده اللي كان باين قبل التصليح:

~~~live 70 قبل
<style>
  .cta { padding: 10px 20px; border: 0; border-radius: 8px; color: white; font-size: 18px;
         background-color: linear-gradient(#16a34a, #166534); }
</style>
<button class="cta">اطلب دلوقتي</button>
~~~

**هتشوف إيه:** قبل: زرار رمادي فاتح وكلامه أبيض بالعافية باين. بعد: زرار أخضر فاتح من فوق وغامق تحت، والكلام الأبيض واضح.

**ليه:** [[background-color]] بتاخد **لون** واحد بس. التدرّج **صورة**، فالمتصفح رمى السطر، وفضل لون الزرار الافتراضي. مكانه [[background-image]] أو المختصرة [[background]].

**الغلطة الشائعة:** تفتكر المشكلة في الألوان وتغيّرها. في DevTools هتلاقي السطر مشطوب وجنبه علامة تحذير «Invalid property value».

~~~text القياس من Chrome
قبل   background-image: none     background-color: rgb(240, 240, 240)   ← رمادي الزرار
بعد   background-image: linear-gradient(rgb(22, 163, 74), rgb(22, 101, 52))
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** دايرة 120px رسم بياني لطلبات النهارده: قهوة [[#78350f]] من 0 لحد 50%، وشاي [[#16a34a]] من 50% لحد 80%، وعصير [[#f97316]] من 80% لحد 100%. اكتب كل لون بنقطتين بالنسب دي بالظبط. (من قسم ٤ في الشرح)`, done: R`دايرة بتلات قطاعات، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .pie { width: 120px; height: 120px; background: #e7e5e4; }
</style>
<div class="pie"></div>`, checks: [
              { say: R`تلات قطاعات بالنسب المطلوبة`, q: ".pie", style: ["background-image", "conic-gradient(rgb(120, 53, 15) 0%, rgb(120, 53, 15) 50%, rgb(22, 163, 74) 50%, rgb(22, 163, 74) 80%, rgb(249, 115, 22) 80%, rgb(249, 115, 22) 100%)"] },
              { say: R`الشكل دايرة`, q: ".pie", style: ["border-top-left-radius", "50%"] }
            ] }, sol: R`~~~live 140 الحل
<style>
  .pie { width: 120px; height: 120px; background: #e7e5e4;
         background-image: conic-gradient(#78350f 0% 50%, #16a34a 50% 80%, #f97316 80% 100%);
         border-radius: 50%; }
</style>
<div class="pie"></div>
~~~

**هتشوف إيه:** دايرة: النص اليمين بني (من فوق لتحت)، وبعده أخضر لحد الشمال تحت تقريبًا، والباقي برتقاني لحد فوق.

**ليه كده:** كل لون بنقطتين (من، لحد) بيرسم قطاع سادة، والنقطة التانية لكل لون = الأولى للي بعده، فمفيش تدرّج بين القطاعات. واللفة بتبدأ من فوق مع عقارب الساعة. و [[border-radius: 50%]] قصّت أركان المربع.

**الغلطة الشائعة:** [[conic-gradient(#78350f 50%, #16a34a 80%, #f97316)]]: نقطة واحدة لكل لون. هيبقى فيه **تدرّج** بين البني والأخضر بدل حد قاطع.

**حل تاني صح:** [[#16a34a 0 80%]] بالـ [[0]] اللي معناها «من مكان اللي قبلي» بيرسم نفس الشكل، بس المحسوب هيبقى فيه [[0deg]]، والشرط هنا مكتوب على النسب الصريحة.

~~~text القياس من Chrome
.pie   background-image: conic-gradient(rgb(120, 53, 15) 0%, rgb(120, 53, 15) 50%, rgb(22, 163, 74) 50%, ...)
       border-top-left-radius: 50%
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «المحل مقفول للتجديد» بخلفية شرايط مايلة: [[repeating-linear-gradient]] بزاوية [[45deg]]، أصفر [[#facc15]] من 0 لـ 12px وأسود [[#1c1917]] من 12px لـ 24px. والكلام جوه صندوق أبيض عشان يتقري. (من قسم ٥ في الشرح)`, done: R`شرايط صفرا وسودا مايلة والكلام مقروء في النص، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .closed { padding: 20px; text-align: center; }
  .closed span { background: white; padding: 4px 12px; font-weight: 700; }
</style>
<div class="closed"><span>المحل مقفول للتجديد</span></div>`, checks: [
              { say: R`خلفية الشريط شرايط مايلة متكررة`, q: ".closed", style: ["background-image", "repeating-linear-gradient(45deg, rgb(250, 204, 21) 0px, rgb(250, 204, 21) 12px, rgb(28, 25, 23) 12px, rgb(28, 25, 23) 24px)"] },
              { say: R`الكلام لسه على أبيض`, q: ".closed span", style: ["background-color", "rgb(255, 255, 255)"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .closed { padding: 20px; text-align: center;
            background: repeating-linear-gradient(45deg, #facc15 0 12px, #1c1917 12px 24px); }
  .closed span { background: white; padding: 4px 12px; font-weight: 700; }
</style>
<div class="closed"><span>المحل مقفول للتجديد</span></div>
~~~

**هتشوف إيه:** شريط عريض كله خطوط مايلة صفرا وسودا بالتساوي، وفي النص كلمة تقيلة سودا على مستطيل أبيض.

**ليه كده:** النسخة المتكررة خدت آخر نقطة (24px) كطول «البلاطة» وكررتها. كل لون بنقطتين، فالحدود قاطعة. والكلام فوق شرايط متلخبطة مستحيل يتقري، فالصندوق الأبيض هو اللي شايل التباين.

**الغلطة الشائعة:** [[linear-gradient]] من غير [[repeating-]]: شريطة صفرا وشريطة سودا والباقي كله أسود سادة.

~~~text القياس من Chrome
.closed   background-image: repeating-linear-gradient(45deg, rgb(250, 204, 21) 0px, rgb(250, 204, 21) 12px, rgb(28, 25, 23) 12px, rgb(28, 25, 23) 24px)
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** ورقة منيو خلفيتها ورق مربعات: خطوط رمادي [[#cbd5e1]] رفيعة (1px) أفقي ورأسي، كل 20px. استخدم طبقتين [[linear-gradient]] و [[background-size]]، ومن غير أي صورة. (من قسم ٦ في الشرح)`, done: R`ورق مربعات منتظم، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .paper { height: 120px; padding: 12px; background-color: white; border: 1px solid #94a3b8; }
</style>
<div class="paper">منيو الفطار</div>`, checks: [
              { say: R`البلاطة 20 في 20`, q: ".paper", style: ["background-size", "20px 20px, 20px 20px"] },
              { say: R`الخطوط أفقي ورأسي (طبقتين)`, q: ".paper", style: ["background-image", "linear-gradient(rgb(203, 213, 225) 1px, rgba(0, 0, 0, 0) 1px), linear-gradient(90deg, rgb(203, 213, 225) 1px, rgba(0, 0, 0, 0) 1px)"] },
              { say: R`مفيش صور ملفات`, nosrc: "url(" }
            ] }, sol: R`~~~live 160 الحل
<style>
  .paper { height: 120px; padding: 12px; background-color: white; border: 1px solid #94a3b8;
           background-image:
             linear-gradient(#cbd5e1 1px, transparent 1px),
             linear-gradient(90deg, #cbd5e1 1px, transparent 1px);
           background-size: 20px 20px; }
</style>
<div class="paper">منيو الفطار</div>
~~~

**هتشوف إيه:** ورقة بيضا عليها مربعات رمادي فاتح منتظمة، و «منيو الفطار» فوقها.

**ليه كده:** في كل بلاطة 20×20: الطبقة الأولى بترسم أول 1px من فوق رمادي والباقي شفاف (خط أفقي). التانية نفس الكلام بزاوية [[90deg]] (خط رأسي على الشمال). البلاطات بتترص جنب بعض فالخطوط بتتوصل.

**الغلطة الشائعة:** تنسى [[background-size]]: البلاطة بتبقى الصندوق كله، فتشوف خط أفقي واحد فوق وخط رأسي واحد على الشمال بس.

**حل تاني صح:** [[background-size: 20px]] بقيمة واحدة: هتبقى [[20px auto]]، والتدرّج ملوش نسبة عرض لطول، فـ [[auto]] بتبقى طول الصندوق كله، فالخطوط الأفقية هتختفي. عشان كده الرقمين.

~~~text القياس من Chrome
.paper   background-size: 20px 20px, 20px 20px      ← قيمة واحدة لطبقتين، فاتكررت
         background-image: linear-gradient(rgb(203, 213, 225) 1px, rgba(0, 0, 0, 0) 1px), linear-gradient(90deg, ...)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في صفحة [[dir="rtl"]]: [[.x { background: linear-gradient(to right, white, black); }]]. الأسود هيبقى على أي ناحية؟ ولو خليتها [[linear-gradient(90deg, white, black)]]؟ اكتب الإجابتين، وبعدين افتح الحل. (من قسم ١ في الشرح: «في الصفحة العربي»)`, done: R`كتبت إن الأسود على اليمين في الحالتين.`, sol: R`~~~live 90 الصفحة
<style>
  .x { height: 30px; margin: 4px 0; background: linear-gradient(to right, white, black); border: 1px solid #999; }
  .y { height: 30px; margin: 4px 0; background: linear-gradient(90deg, white, black); border: 1px solid #999; }
</style>
<div class="x"></div>
<div class="y"></div>
~~~

**الإجابة:** الأسود على **اليمين** في الاتنين.

**هتشوف إيه:** شريطين نفس الشكل: أبيض على الشمال وبيغمق لحد أسود على اليمين.

**السبب:** اتجاهات التدرّج فعلية: [[to right]] يمين، و [[90deg]] = يمين. [[dir="rtl"]] بيغيّر اتجاه الكلام وترتيب العناصر، مش الاتجاهات اللي بتكتبها بالكلمة أو بالدرجة.

~~~text القياس من Chrome
to right → linear-gradient(to right, rgb(255, 255, 255), rgb(0, 0, 0))
90deg    → linear-gradient(90deg, rgb(255, 255, 255), rgb(0, 0, 0))
~~~` }
          ]
        },
        {
          cmd: "border و border-radius",
          title: "الحدود حوالين الصندوق: تُخنها وشكلها ولونها في كل ناحية، والأركان المدورة",
          pre: [{ to: "css/box model", why: R`الـ border طبقة من طبقات الصندوق، وبيزوّد مقاسه لو مش [[box-sizing: border-box]]` }, { to: "css/logical properties", why: R`الحدود «المنطقية» ([[border-inline-start]]) هنا هي نفس فكرة [[margin-inline-start]] هناك` }],
          ref: [
            { t: "MDN: border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border" },
            { t: "MDN: border-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-style" },
            { t: "MDN: <line-style>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/line-style" },
            { t: "MDN: border-width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-width" },
            { t: "MDN: border-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-color" },
            { t: "MDN: border-block", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-block" },
            { t: "MDN: border-inline", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-inline" },
            { t: "MDN: border-radius", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-radius" },
            { t: "MDN: border-start-start-radius", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-start-start-radius" },
            { t: "CSS Backgrounds and Borders Level 3: borders", url: "https://www.w3.org/TR/css-backgrounds-3/#borders" },
            { t: "CSS Logical Properties Level 1: borders", url: "https://www.w3.org/TR/css-logical-1/#border-properties" }
          ],
          desc: R`[[border]] بيرسم خط حوالين الصندوق، وليه تلات حاجات: التُخن ([[width]])، والشكل ([[style]])، واللون ([[color]]). وكل حاجة منهم ممكن تتكتب للأربع نواحي مع بعض، أو لناحية واحدة ([[border-top]])، أو لناحية «منطقية» بتتعكس في العربي ([[border-inline-start]]).
و [[border-radius]] بيدوّر الأركان: الأربعة مع بعض، أو كل ركن لوحده، وبأركان بيضاوي كمان.`,
          example: R`.card { border: 1px solid #d6d3d1; }
.card { border-radius: 12px; }
.quote { border-inline-start: 4px solid #b45309; }
.tabs { border-block-end: 2px solid #e7e5e4; }
.avatar { border-radius: 50%; }
.badge { border-radius: 999px; }
.bubble { border-radius: 16px 16px 16px 4px; }
.ticket { border: 2px dashed currentColor; }`,
          flag: "script",
          lines: [
            R`خط حوالين الكارت: تُخنه 1px، ومتصل ([[solid]])، ورمادي فاتح. التلاتة في سطر بأي ترتيب.`,
            R`الأربع أركان مدورة بنص قطر 12px.`,
            R`خط بني 4px على ناحية **بداية السطر** بس: يمين في العربي، وشمال في الإنجليزي.`,
            R`خط تحت شريط التابات. [[block-end]] = آخر البلوك، يعني تحت في الكتابة العادية.`,
            R`صورة البروفايل دايرة: نص القطر نص العرض ونص الطول.`,
            R`شارة شكل «كبسولة»: رقم كبير جدًا بيتصغّر لوحده لحد ما الجنبين يبقوا نص دايرة.`,
            R`فقاعة شات: تلات أركان 16px، والركن اللي تحت شمال 4px (الترتيب: فوق شمال، فوق يمين، تحت يمين، تحت شمال).`,
            R`تذكرة بحد متقطّع 2px لونه نفس لون الكلام. [[currentColor]] هو الافتراضي أصلًا، وكتبناه عشان يبان.`
          ],
          teach: R`## الفكرة في سطرين

كل ناحية من الأربعة ليها تلات خصائص: تُخن وشكل ولون. يعني 12 خاصية «أساسية»، وكل الباقي **مختصرات** بتكتب كذا واحدة منهم مرة واحدة. لو فهمت النقطة دي، الأسامي الكتير كلها بتبقى منطقية.

والـ border جزء من مقاس الصندوق (درس «box model»): 2px border بيزوّد 4px على العرض لو مش [[box-sizing: border-box]].

---

## ١. [[border: 1px solid #d6d3d1]]

~~~text تشريح المختصرة
border:   1px        solid       #d6d3d1
          └ width    └ style     └ color         ← بأي ترتيب، وأي واحد ممكن يتساب
~~~

**الشكل ([[style]]) هو الوحيد اللي لازم.** الافتراضي [[none]]، ومع [[none]] التُخن المحسوب **صفر** مهما كتبت:

~~~text القياس من Chrome (المحسوب)
border-width: 3px                →  border-top-width: 0px    style: none      ← مفيش style، مفيش border
border: 3px none red             →  border-top-width: 0px
border: solid                    →  width: 3px (medium)       color: لون الكلام
border: 4px wavy red             →  مرفوضة كلها: wavy مش من أشكال الـ border
~~~

**التُخن:** طول ([[1px]] و [[0.125rem]]) أو كلمة:

~~~text القياس من Chrome
thin → 1px      medium → 3px (الافتراضي)      thick → 5px
0.5px → 1px     1.7px → 1px      ← على شاشة 1x التُخن بيتقرّب لبكسل كامل (وأي حاجة أكبر من صفر بتبقى 1 على الأقل)
~~~

**اللون:** الافتراضي **لون الكلام** ([[currentColor]])، فـ [[border: 2px solid]] من غير لون بياخد [[color]] بتاع العنصر.

~~~text القياس من Chrome
color: #b45309;  border: 2px solid;    →  border-top-color: rgb(180, 83, 9)
~~~

### المختصرة بتمسح

زي [[background]]: [[border]] بتصفّر الأربع نواحي، وكمان بتصفّر [[border-image]] (درس «outline و box-shadow»).

~~~text القياس من Chrome
border-left: 5px solid red;  border: 1px solid blue;     →  الشمال بقى 1px أزرق
border: 2px solid;  border-top: none;                    →  تلات نواحي بس   ← الطريقة الصح: المختصرة الأول
~~~

---

## ٢. [[<line-style>]]: أشكال الخط

القيم اللي [[border-style]] بتاخدها ليها اسم نوع: [[<line-style>]]. ونفس النوع بيستخدمه [[outline-style]] و [[column-rule-style]].

~~~live 300 العشر أشكال بتُخن 6px
<style>
  .ls { display: inline-block; width: 40%; margin: 5px; padding: 8px; border-width: 6px; border-color: #b45309; font: 13px monospace; direction: ltr; text-align: center; background: #fffbeb; }
</style>
<div class="ls" style="border-style: none">none</div>
<div class="ls" style="border-style: hidden">hidden</div>
<div class="ls" style="border-style: solid">solid</div>
<div class="ls" style="border-style: dotted">dotted</div>
<div class="ls" style="border-style: dashed">dashed</div>
<div class="ls" style="border-style: double">double</div>
<div class="ls" style="border-style: groove">groove</div>
<div class="ls" style="border-style: ridge">ridge</div>
<div class="ls" style="border-style: inset">inset</div>
<div class="ls" style="border-style: outset">outset</div>
~~~

**هتشوف إيه:** أول اتنين من غير خط خالص. وبعدهم: خط متصل، ونقط، وشُرَط، وخطين رفاع، وأربعة «تلاتي الأبعاد»: [[groove]] محفور، و [[ridge]] بارز، و [[inset]] الصندوق كله غاطس، و [[outset]] الصندوق كله طالع (المتصفح بيغمّق ناحيتين ويفتّح ناحيتين من نفس اللون).

| القيمة | إمتى |
|---|---|
| [[solid]] | 95% من الشغل: كروت وحقول وأزرار |
| [[dashed]] | منطقة «اسحب الملف هنا»، وتذكرة، وحاجة مؤقتة |
| [[dotted]] | خط فاصل خفيف |
| [[double]] | لازم 3px على الأقل عشان الخطين يبانوا |
| [[groove]] و [[ridge]] و [[inset]] و [[outset]] | شكلهم قديم، ونادرًا ما بتحتاجهم |
| [[none]] و [[hidden]] | الاتنين مفيش خط. الفرق بيبان في الجداول بس: [[hidden]] بتكسب على أي border تاني في [[border-collapse: collapse]] |

---

## ٣. ناحية واحدة: [[border-top]] و [[border-inline-start]]

~~~live 150 border في ناحية واحدة
<style>
  .q { margin: 8px 0; padding: 8px 12px; background: #fffbeb; }
</style>
<p class="q" style="border-inline-start: 4px solid #b45309">border-inline-start: اقتباس، الخط عند أول السطر</p>
<p class="q" style="border-block-end: 2px solid #b45309">border-block-end: خط تحت العنوان أو التابات</p>
<p class="q" dir="ltr" style="border-inline-start: 4px solid #b45309">border-inline-start in an English block</p>
~~~

**هتشوف إيه:** الأولى خط بني على **اليمين** (أول السطر العربي). التانية خط تحت. التالتة (إنجليزي) نفس القاعدة بالظبط والخط على **الشمال**.

~~~text القياس من Chrome
dir="rtl":  border-inline-start: 4px solid red  →  border-right-width: 4px   border-left-width: 0px
dir="ltr":  border-inline-start: 4px solid red  →  border-left-width: 4px    border-right-width: 0px
border-block: 2px dashed blue                   →  top و bottom 2px، والجنبين 0
~~~

**الفكرة:** [[inline]] = اتجاه السطر (اليمين والشمال في الكتابة العادية)، و [[block]] = اتجاه الفقرات تحت بعض (فوق وتحت). و [[start]] و [[end]] = البداية والنهاية حسب اللغة. فـ [[border-inline-start]] = «ناحية أول السطر» في أي لغة. اكتب الـ logical في أي حاجة ليها علاقة باتجاه الكلام (اقتباس، وقايمة جانبية، وسهم). والـ physical ([[border-left]]) للحاجات اللي المفروض متتعكسش.

### كل الخصائص في جدول واحد

النمط واحد: **[[border]] + الناحية (اختياري) + الحاجة (اختياري)**. اللي من غير «حاجة» مختصرة للتلاتة، واللي من غير «ناحية» للأربع نواحي. الجدول اتقاس كله في صفحة [[dir="rtl"]] عرضية عادية.

| الخاصية | بتظبط | في صفحة عربي بتساوي |
|---|---|---|
| [[border: 1px solid red]] | الأربع نواحي، التلات حاجات | |
| [[border-width: 1px 2px]] | التُخن للأربعة (1 إلى 4 قيم: فوق، يمين، تحت، شمال) | |
| [[border-style: solid dashed]] | الشكل للأربعة، بنفس ترتيب القيم | |
| [[border-color: red blue]] | اللون للأربعة، بنفس ترتيب القيم | |
| [[border-top: 1px solid]] | ناحية فوق، التلات حاجات | |
| [[border-right: 1px solid]] | ناحية اليمين | |
| [[border-bottom: 1px solid]] | ناحية تحت | |
| [[border-left: 1px solid]] | ناحية الشمال | |
| [[border-top-width: 2px]] | تُخن فوق | |
| [[border-top-style: solid]] | شكل فوق | |
| [[border-top-color: red]] | لون فوق | |
| [[border-right-width: 2px]] | تُخن اليمين | |
| [[border-right-style: solid]] | شكل اليمين | |
| [[border-right-color: red]] | لون اليمين | |
| [[border-bottom-width: 2px]] | تُخن تحت | |
| [[border-bottom-style: solid]] | شكل تحت | |
| [[border-bottom-color: red]] | لون تحت | |
| [[border-left-width: 2px]] | تُخن الشمال | |
| [[border-left-style: solid]] | شكل الشمال | |
| [[border-left-color: red]] | لون الشمال | |
| [[border-block: 1px solid]] | فوق وتحت مع بعض | top و bottom |
| [[border-block-width: 2px]] | تُخن فوق وتحت | |
| [[border-block-style: dashed]] | شكل فوق وتحت | |
| [[border-block-color: red]] | لون فوق وتحت | |
| [[border-block-start: 1px solid]] | أول البلوك | top |
| [[border-block-start-width: 2px]] | | border-top-width |
| [[border-block-start-style: solid]] | | border-top-style |
| [[border-block-start-color: red]] | | border-top-color |
| [[border-block-end: 1px solid]] | آخر البلوك | bottom |
| [[border-block-end-width: 2px]] | | border-bottom-width |
| [[border-block-end-style: solid]] | | border-bottom-style |
| [[border-block-end-color: red]] | | border-bottom-color |
| [[border-inline: 1px solid]] | الجنبين مع بعض | right و left |
| [[border-inline-width: 2px]] | تُخن الجنبين | |
| [[border-inline-style: dashed]] | شكل الجنبين | |
| [[border-inline-color: red]] | لون الجنبين | |
| [[border-inline-start: 4px solid]] | أول السطر | **right** (في الإنجليزي left) |
| [[border-inline-start-width: 4px]] | | border-right-width |
| [[border-inline-start-style: solid]] | | border-right-style |
| [[border-inline-start-color: red]] | | border-right-color |
| [[border-inline-end: 1px solid]] | آخر السطر | **left** (في الإنجليزي right) |
| [[border-inline-end-width: 2px]] | | border-left-width |
| [[border-inline-end-style: solid]] | | border-left-style |
| [[border-inline-end-color: red]] | | border-left-color |

~~~text القياس من Chrome
border-inline: 3px solid;  border-inline-end-color: green;
  → border-right: 3px أسود     border-left: 3px أخضر     ← آخر السطر في العربي = الشمال
~~~

(في الكتابة الرأسية، [[writing-mode: vertical-rl]] من درس «::first-letter و ::selection»، الـ block والـ inline بيتبدلوا. ده سبب تاني إن الأسامي «منطقية» مش «يمين وشمال».)

---

## ٤. [[border-radius: 12px]]

### قيمة واحدة لحد أربعة

~~~text القياس من Chrome (صندوق 200×100)
border-radius: 8px                →  الأربعة 8px
border-radius: 10px 20px          →  فوق شمال 10، فوق يمين 20، تحت يمين 10، تحت شمال 20    ← الأقطار
border-radius: 10px 20px 30px     →  10، 20، 30، 20
border-radius: 10px 20px 30px 40px →  فوق شمال، فوق يمين، تحت يمين، تحت شمال (مع عقارب الساعة)
~~~

والترتيب ده **فعلي**: بيبدأ من فوق **شمال** حتى في صفحة عربي.

### الأربع أركان لوحدهم

| الخاصية | الركن | في العربي بتساوي (اتقاس) |
|---|---|---|
| [[border-top-left-radius: 8px]] | فوق شمال | |
| [[border-top-right-radius: 8px]] | فوق يمين | |
| [[border-bottom-right-radius: 8px]] | تحت يمين | |
| [[border-bottom-left-radius: 8px]] | تحت شمال | |
| [[border-start-start-radius: 12px]] | أول البلوك + أول السطر | فوق **يمين** (في الإنجليزي فوق شمال) |
| [[border-start-end-radius: 12px]] | أول البلوك + آخر السطر | فوق شمال |
| [[border-end-start-radius: 12px]] | آخر البلوك + أول السطر | تحت يمين |
| [[border-end-end-radius: 12px]] | آخر البلوك + آخر السطر | تحت شمال |

الاسم المنطقي بيقول الـ block الأول وبعده الـ inline: [[start-end]] = «فوق» + «آخر السطر».

### النسبة والدايرة والكبسولة

~~~live 120 50% و 999px
<style>
  .sh { display: inline-block; vertical-align: middle; margin: 8px; background: #b45309; color: white; font-size: 14px; text-align: center; }
</style>
<div class="sh" style="width: 80px; height: 80px; border-radius: 50%; line-height: 80px">دايرة</div>
<div class="sh" style="width: 160px; height: 40px; border-radius: 999px; line-height: 40px">كبسولة 999px</div>
<div class="sh" style="width: 160px; height: 40px; border-radius: 50%; line-height: 40px">بيضاوي 50%</div>
~~~

**هتشوف إيه:** دايرة كاملة، وكبسولة بطرفين نص دايرة وجنبين مستقيمين، وبيضاوي (مش كبسولة!).

- **[[50%]]:** النسبة الأفقية من العرض والرأسية من الطول. في مربع = دايرة. في مستطيل 160×40 = بيضاوي، لأن كل ركن 80×20.
- **[[999px]]:** المتصفح بيلاحظ إن الأركان «بتتداخل» (999 + 999 أكبر من 40)، فبيصغّرهم كلهم بنفس النسبة لحد ما يدخلوا: كل ركن بقى 20px، يعني نص الطول. والنتيجة كبسولة في أي مقاس. (المحسوب بيفضل [[999px]]، والتصغير بيحصل وقت الرسم.)

### أركان بيضاوي: [[/]]

~~~text القياس من Chrome
border-radius: 10px / 20px        →  كل ركن: 10px بالعرض و 20px بالطول      (border-top-left-radius: 10px 20px)
border-radius: 4px 8px / 12px     →  القيم قبل الـ / للعرض، وبعدها للطول
~~~

~~~live 110 ركن دايري وركن بيضاوي
<style>
  .e { display: inline-block; width: 140px; height: 80px; margin: 8px; background: #0f766e; }
</style>
<div class="e" style="border-radius: 30px"></div>
<div class="e" style="border-radius: 60px / 20px"></div>
<div class="e" style="border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%"></div>
~~~

**هتشوف إيه:** مستطيل بأركان مدورة عادية، ومستطيل أركانه ممطوطة بالعرض (شكل «وسادة»)، وشكل بيضة: فوق قبة عالية مدورة، وتحت أفطس وأعرض (الأركان اللي فوق طولها 60% واللي تحت 40%).

### الحاجات اللي جوه الصندوق مش بتتقص لوحدها

~~~live 150 صورة جوه كارت مدوّر
<style>
  .k { display: inline-block; width: 42%; margin: 6px; border: 2px solid #78350f; border-radius: 20px; vertical-align: top; }
  .k .img { height: 70px; background: linear-gradient(135deg, #fbbf24, #b45309); }
  .k p { margin: 8px 12px; }
  .clip { overflow: hidden; }
</style>
<div class="k"><div class="img"></div><p>من غير overflow</p></div>
<div class="k clip"><div class="img"></div><p>overflow: hidden</p></div>
~~~

**هتشوف إيه:** في الأول الصورة البرتقالي **مربعة** وطالعة برّه الركن المدوّر من فوق. في التاني الصورة اتقصت على شكل الكارت.

[[border-radius]] بيدوّر **خلفية العنصر نفسه وحدوده**، مش أولاده. عشان أي ابن (صورة، أو header ملوّن) يتقص على الأركان، الأب محتاج [[overflow: hidden]] (أو [[overflow: clip]]).

وخد بالك: الركن **الداخلي** (جوه الـ border) نص قطره = الخارجي ناقص تُخن الـ border. كارت [[border-radius: 20px]] و [[border: 2px]]: الداخلي 18px. لو حطيت جوه كارت تاني بنفس الـ 20px، المسافة بينهم هتبان مش متساوية في الأركان.

### [[corner-shape]]: لسه مش Baseline

> ميزة جديدة لسه مش في كل المتصفحات. يعني إيه «مش Baseline» و «ورا flag»، وإزاي تتأكد بنفسك قبل ما تستخدم أي ميزة: درس «Baseline و @supports».

Chrome 157 بيقبل [[corner-shape: squircle]] (أركان «ناعمة» زي أيقونات الموبايل، وأشكال تانية زي [[bevel]] للركن المشطوف)، والمنهج حاططها مش Baseline. جرّبها، بس متعتمدش عليها: المتصفحات التانية هتعرض الركن المدوّر العادي.

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[border-width: 2px; border-color: red;]] من غير style | مفيش border خالص (المحسوب 0px) |
| [[border: 2px wavy red]] | السطر مرفوض: [[wavy]] للـ [[text-decoration]] بس |
| [[border-left]] على اقتباس في موقع عربي | الخط في آخر السطر. استخدم [[border-inline-start]] |
| [[border]] بعد [[border-top]] | المختصرة مسحت اللي قبلها |
| [[border-radius: 50%]] على زرار مستطيل | بيضاوي. للكبسولة [[999px]] |
| كارت مدوّر وصورته مربعة | محتاج [[overflow: hidden]] على الكارت |
| [[border: 1px solid]] بيظهر في الـ hover بس | الصفحة بتتهز 1px. حطه [[transparent]] من الأول وغيّر اللون |
| [[double]] بتُخن 1px أو 2px | الخطين مش باينين |

---

## الخلاصة

- تلات حاجات لكل ناحية: [[width]] و [[style]] و [[color]]. والـ style لازم، واللون الافتراضي لون الكلام.
- المختصرات: [[border]] (الكل)، و [[border-top]] (ناحية)، و [[border-width]] (حاجة)، وكلها بتمسح اللي قبلها.
- [[inline-start]] = أول السطر: يمين في العربي. [[block-end]] = تحت.
- [[<line-style>]]: [[solid]] و [[dashed]] و [[dotted]] و [[double]] وغيرهم.
- [[border-radius]]: من فوق شمال مع عقارب الساعة. [[50%]] دايرة، [[999px]] كبسولة، [[/]] بيضاوي، و [[border-start-start-radius]] منطقي.
- الأولاد مش بيتقصوا غير بـ [[overflow: hidden]].`,
          try: R`اعمل [[borders.html]] فيه: كارت منتج بحد رمادي 1px وأركان 12px وصورة (تدرّج) فوق مقصوصة على الأركان، واقتباس بحد بني على أول السطر، وشارة «جديد» كبسولة، وصورة بروفايل دايرة بحد أبيض 3px. وبعدين اقلب الصفحة [[dir="ltr"]] وشوف الاقتباس.`,
          sol: R`~~~live 300 borders.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حدود وأركان</title>
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f5f5f4; }
  .card { max-width: 260px; background: white; border: 1px solid #d6d3d1; border-radius: 12px; overflow: hidden; }
  .card .img { height: 90px; background: linear-gradient(135deg, #fbbf24, #b45309); }
  .card .body { padding: 12px; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; background: #dcfce7; color: #166534; font-size: 13px; }
  blockquote { margin: 16px 0; padding: 4px 12px; border-inline-start: 4px solid #b45309; }
  .avatar { width: 56px; height: 56px; border-radius: 50%; border: 3px solid white; background: linear-gradient(#a8a29e, #57534e); }
</style>
</head>
<body>
<div class="card">
  <div class="img"></div>
  <div class="body"><span class="badge">جديد</span> لاتيه بالبندق</div>
</div>
<blockquote>أحلى قهوة شربتها السنة دي.</blockquote>
<div class="avatar"></div>
</body>
</html>
~~~

**هتشوف إيه:**

- كارت أبيض بحد رمادي رفيع وأركان مدورة، والتدرّج البرتقالي فوق متقصوص على الأركان.
- شارة خضرا شكل كبسولة جنب «لاتيه بالبندق».
- اقتباس بخط بني على اليمين.
- دايرة رمادي بحد أبيض (باين على الخلفية الرمادي الفاتحة).
- مع [[dir="ltr"]] خط الاقتباس بيروح للشمال لوحده.

~~~text القياس من Chrome
.card         border-top-width: 1px   border-top-left-radius: 12px   overflow: hidden
blockquote    border-right-width: 4px   border-left-width: 0px
.badge        border-top-left-radius: 999px
.avatar       border-top-left-radius: 50%   border-top-color: rgb(255, 255, 255)
~~~`,
          deep: {
            why: R`الحدود والأركان المدورة موجودين تقريبًا في كل مكوّن: كارت، وزرار، وحقل، وشارة، وصورة بروفايل، وتاب. والأسامي كتير (أكتر من 40 خاصية)، بس كلها نمط واحد. وفي موقع عربي الفرق بين [[border-left]] و [[border-inline-start]] هو الفرق بين تصميم بيتعكس صح وتصميم لازم تعيد كتابته.`,
            how: R`كل ناحية ليها تلات قيم محسوبة. التُخن بيبقى صفر لو الشكل [[none]] أو [[hidden]]، وبيتقرّب لبكسلات الجهاز. الخصائص المنطقية بتتحوّل وقت الحساب للناحية الفعلية على حسب [[direction]] و [[writing-mode]] بتوع العنصر. [[border-radius]] بيرسم ربع بيضاوي في كل ركن بنصين قطر (أفقي ورأسي)؛ لو مجموع نصين قطر على ضلع أكبر من طول الضلع، كل الأركان بتتصغّر بنفس المعامل. الخلفية والحدود والـ [[outline]] والـ [[box-shadow]] بيمشوا على المنحنى ده، بس محتوى الأولاد لأ إلا بـ [[overflow]].`,
            when: R`[[border]] كامل: كروت وحقول. ناحية واحدة: فواصل وتابات واقتباسات (منطقي دايمًا لو مرتبط باتجاه الكلام). [[border-radius]] صغير (4 لـ 12px): أزرار وكروت. [[50%]]: صور بروفايل. [[999px]]: شارات وأزرار كبسولة. ركن واحد مختلف: فقاعات الشات. [[dashed]]: مناطق السحب والإفلات.`,
            mistakes: R`التُخن واللون من غير style. [[wavy]] في border. physical في مكان منطقي. المختصرة بعد الطويلة. [[50%]] بدل [[999px]] للكبسولة. نسيان [[overflow: hidden]]. border بيظهر في الـ hover فيهز الصفحة. و [[double]] رفيع.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** كارت عرض من غير حدود. ادّيه حد [[1px solid #d6d3d1]] وأركان مدورة 12px. (من قسم ١ و ٤ في الشرح)`, done: R`الكارت ليه حد رمادي رفيع وأركان مدورة، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .card { max-width: 260px; padding: 16px; background: white; }
  body { background: #f5f5f4; }
</style>
<div class="card">
  <h3>كرواسون زبدة</h3>
  <p>بيتخبز الصبح. ٣٥ جنيه.</p>
</div>`, checks: [
              { say: R`الحد 1px`, q: ".card", style: ["border-top-width", "1px"] },
              { say: R`الحد متصل`, q: ".card", style: ["border-top-style", "solid"] },
              { say: R`لونه [[#d6d3d1]]`, q: ".card", style: ["border-top-color", "rgb(214, 211, 209)"] },
              { say: R`الأركان 12px`, q: ".card", style: ["border-top-left-radius", "12px"] }
            ] }, sol: R`~~~live 150 الحل
<style>
  .card { max-width: 260px; padding: 16px; background: white; border: 1px solid #d6d3d1; border-radius: 12px; }
  body { background: #f5f5f4; }
</style>
<div class="card">
  <h3>كرواسون زبدة</h3>
  <p>بيتخبز الصبح. ٣٥ جنيه.</p>
</div>
~~~

**هتشوف إيه:** كارت أبيض على خلفية رمادي فاتحة، حواليه خط رمادي رفيع، وأركانه مدورة.

**ليه كده:** سطر [[border]] واحد كتب التلات حاجات للأربع نواحي. و [[border-radius]] بقيمة واحدة للأربع أركان.

**الغلطة الشائعة:** [[border: 1px #d6d3d1]] من غير [[solid]]: مفيش حد خالص، لأن الشكل الافتراضي [[none]].

~~~text القياس من Chrome
.card   border-top: 1px solid rgb(214, 211, 209)    border-top-left-radius: 12px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** منطقة «اسحب صورة المنتج هنا» المفروض حواليها خط متقطّع بني 2px، ومفيش أي خط. صلّحها. (من قسم ١ و ٢ في الشرح)`, done: R`الخط المتقطّع ظاهر، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .drop { padding: 32px 16px; text-align: center; color: #78350f; border-radius: 12px;
          border: 2px wavy #b45309; }
</style>
<div class="drop">اسحب صورة المنتج هنا</div>`, checks: [
              { say: R`الخط متقطّع ([[dashed]])`, q: ".drop", style: ["border-top-style", "dashed"] },
              { say: R`تُخنه 2px`, q: ".drop", style: ["border-top-width", "2px"] },
              { say: R`لونه بني [[#b45309]]`, q: ".drop", style: ["border-top-color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  .drop { padding: 32px 16px; text-align: center; color: #78350f; border-radius: 12px;
          border: 2px dashed #b45309; }
</style>
<div class="drop">اسحب صورة المنتج هنا</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 110 قبل
<style>
  .drop { padding: 32px 16px; text-align: center; color: #78350f; border-radius: 12px;
          border: 2px wavy #b45309; }
</style>
<div class="drop">اسحب صورة المنتج هنا</div>
~~~

**هتشوف إيه:** قبل: الكلام البني لوحده من غير أي إطار. بعد: إطار متقطّع بني بأركان مدورة حوالين الكلام.

**ليه:** [[wavy]] من أشكال [[text-decoration-style]] (الخط اللي تحت الكلام)، مش من [[<line-style>]]. كلمة غلط واحدة في المختصرة بترمي السطر كله، فمفيش border خالص.

**الغلطة الشائعة:** تفتكر المشكلة في اللون أو التُخن. افتح DevTools: السطر مشطوب كله، مش جزء منه.

~~~text القياس من Chrome
قبل   border-top-style: none     border-top-width: 0px
بعد   border-top-style: dashed   border-top-width: 2px   border-top-color: rgb(180, 83, 9)
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** الاقتباس مكتوب بـ [[border-left]] و [[padding-left]] من موقع إنجليزي، فالخط طالع في آخر السطر العربي. خليه منطقي عشان يبقى عند **أول** السطر في أي لغة. (من قسم ٣ في الشرح)`, done: R`الخط والمسافة على اليمين في العربي، ومكتوبين logical، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  blockquote { margin: 0; padding: 8px 0; padding-left: 12px; border-left: 4px solid #b45309; background: #fffbeb; }
</style>
<blockquote>القهوة الحلوة مش محتاجة سكر.</blockquote>`, checks: [
              { say: R`الخط على اليمين (أول السطر)`, q: "blockquote", style: ["border-right-width", "4px"] },
              { say: R`مفيش خط على الشمال`, q: "blockquote", style: ["border-left-width", "0px"] },
              { say: R`المسافة على اليمين كمان`, q: "blockquote", style: ["padding-right", "12px"] },
              { say: R`مكتوبة بـ [[border-inline-start]]`, src: "border-inline-start" }
            ] }, sol: R`~~~live 80 بعد التصليح
<style>
  blockquote { margin: 0; padding: 8px 0; padding-inline-start: 12px; border-inline-start: 4px solid #b45309; background: #fffbeb; }
</style>
<blockquote>القهوة الحلوة مش محتاجة سكر.</blockquote>
~~~

وده اللي كان باين قبل:

~~~live 80 قبل
<style>
  blockquote { margin: 0; padding: 8px 0; padding-left: 12px; border-left: 4px solid #b45309; background: #fffbeb; }
</style>
<blockquote>القهوة الحلوة مش محتاجة سكر.</blockquote>
~~~

**هتشوف إيه:** قبل: الخط البني على الشمال بعيد عن أول الكلام. بعد: الخط على اليمين لازق في أول الجملة، وبينهم مسافة.

**ليه كده:** [[inline-start]] = «أول السطر»، والمتصفح بيحوّلها لـ [[right]] في العربي و [[left]] في الإنجليزي. نفس القاعدة تنفع للغتين.

**الغلطة الشائعة:** تغيّر [[border-left]] لـ [[border-right]]. هيشتغل في العربي، ويبوظ لو نفس الـ CSS اتستخدم في صفحة إنجليزي.

~~~text القياس من Chrome
blockquote   border-right-width: 4px   border-left-width: 0px   padding-right: 12px
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** صورة بروفايل 64×64 وشارة «متاح» جنبها. خلّي الصورة **دايرة**، والشارة **كبسولة** (أطرافها نص دايرة مهما كان عرضها). (من قسم ٤ في الشرح: «النسبة والدايرة والكبسولة»)`, done: R`دايرة وكبسولة، وكل الشروط ✓.`, work: { h: 110, start: R`<style>
  .avatar { width: 64px; height: 64px; background: linear-gradient(#a8a29e, #57534e); display: inline-block; vertical-align: middle; }
  .status { display: inline-block; padding: 4px 14px; background: #dcfce7; color: #166534; }
</style>
<span class="avatar"></span>
<span class="status">متاح</span>`, checks: [
              { say: R`الصورة دايرة ([[50%]])`, q: ".avatar", style: ["border-top-left-radius", "50%"] },
              { say: R`الشارة كبسولة ([[999px]])`, q: ".status", style: ["border-top-left-radius", "999px"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .avatar { width: 64px; height: 64px; background: linear-gradient(#a8a29e, #57534e); display: inline-block; vertical-align: middle; border-radius: 50%; }
  .status { display: inline-block; padding: 4px 14px; background: #dcfce7; color: #166534; border-radius: 999px; }
</style>
<span class="avatar"></span>
<span class="status">متاح</span>
~~~

**هتشوف إيه:** دايرة رمادي، وجنبها شارة خضرا فاتحة طرفيها مدورين بالكامل.

**ليه كده:** الصورة مربعة، فـ [[50%]] = نص العرض = نص الطول = دايرة. الشارة مش مربعة، و [[999px]] بيتصغّر لنص طولها فبتبقى كبسولة في أي عرض.

**الغلطة الشائعة:** [[50%]] على الشارة: بيضاوي ممطوط، لأن الركن بيبقى نص العرض في نص الطول.

~~~text القياس من Chrome
.avatar   border-top-left-radius: 50%
.status   border-top-left-radius: 999px
~~~` },
            { lvl: 'تحدي', t: R`**أشكال:** فقاعة رسالة جاية في شات عربي. الأركان كلها 16px ما عدا الركن اللي **تحت عند أول السطر** (تحت يمين في العربي): 4px، عشان يبان إن الفقاعة «طالعة» من الناحية دي. اكتبها بخاصية ركن منطقية عشان تتعكس لوحدها في الإنجليزي. (من قسم ٤ في الشرح: «الأربع أركان لوحدهم»)`, done: R`الركن اللي تحت يمين حاد والباقي مدوّر، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .msg { display: inline-block; max-width: 70%; padding: 10px 14px; background: #fde68a; color: #422006; }
</style>
<div class="msg">الطلب هيوصل كمان ربع ساعة.</div>`, checks: [
              { say: R`تحت يمين 4px`, q: ".msg", style: ["border-bottom-right-radius", "4px"] },
              { say: R`فوق يمين 16px`, q: ".msg", style: ["border-top-right-radius", "16px"] },
              { say: R`فوق شمال 16px`, q: ".msg", style: ["border-top-left-radius", "16px"] },
              { say: R`تحت شمال 16px`, q: ".msg", style: ["border-bottom-left-radius", "16px"] },
              { say: R`الركن الحاد مكتوب منطقي ([[border-end-start-radius]])`, src: "border-end-start-radius" }
            ] }, sol: R`~~~live 80 الحل
<style>
  .msg { display: inline-block; max-width: 70%; padding: 10px 14px; background: #fde68a; color: #422006;
         border-radius: 16px;
         border-end-start-radius: 4px; }
</style>
<div class="msg">الطلب هيوصل كمان ربع ساعة.</div>
~~~

**هتشوف إيه:** فقاعة صفرا على اليمين، أركانها مدورة، والركن اللي تحت يمين بس شبه حاد.

**ليه كده:** [[end-start]] = آخر البلوك (تحت) + أول السطر (يمين في العربي). [[border-radius]] الأول للأربعة، وبعدها الركن اللي مختلف (لو العكس، المختصرة هتمسحه).

**الغلطة الشائعة:** [[border-radius: 16px 16px 4px 16px]]: صح في العربي بس. الترتيب ده فعلي (فوق شمال، فوق يمين، تحت يمين، تحت شمال)، فلو الفقاعة دي اتعرضت في صفحة إنجليزي الركن الحاد هيفضل يمين.

~~~text القياس من Chrome
.msg   border-bottom-right-radius: 4px     الباقي 16px
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.ticket { color: #0f766e; border: 3px dashed; }]]. الحد هيبقى لونه إيه؟ ولو زوّدت بعدها [[.ticket:hover { color: #b45309; }]]، الحد هيعمل إيه في الـ hover؟ اكتب إجابتك، وبعدين افتح الحل وعدّي بالماوس. (من قسم ١ في الشرح)`, done: R`كتبت إن الحد أخضر زي الكلام، وبيبقى بني مع الكلام في الـ hover.`, sol: R`~~~live 90 الصفحة
<style>
  .ticket { display: inline-block; padding: 12px 20px; color: #0f766e; border: 3px dashed; font-size: 18px; }
  .ticket:hover { color: #b45309; }
</style>
<div class="ticket">تذكرة خصم ١٠٪</div>
~~~

**الإجابة:** الحد **أخضر** زي الكلام. وفي الـ hover الكلام والحد الاتنين بيبقوا **بني**.

**هتشوف إيه:** إطار متقطّع أخضر حوالين «تذكرة خصم ١٠٪». عدّي عليها بالماوس: الإطار والكلام بيتغيّروا مع بعض.

**السبب:** [[border-color]] الافتراضي [[currentColor]] = «قيمة [[color]] بتاعة العنصر ده»، وبيتحسب من جديد كل ما [[color]] يتغيّر. فقاعدة الـ hover غيّرت حاجة واحدة واتنين اتغيّروا.

~~~text القياس من Chrome (الـ hover اتقاس بتغيير color من JavaScript، لأن مفيش ماوس في الـ headless)
.ticket               border-top-color: rgb(15, 118, 110)
color = #b45309   →   border-top-color: rgb(180, 83, 9)
~~~` }
          ]
        },
        {
          cmd: "outline و box-shadow",
          title: "خط برّه الصندوق من غير ما يزقّ حاجة، والضل، وحدود من صورة",
          pre: ["css/border و border-radius"],
          ref: [
            { t: "MDN: outline", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline" },
            { t: "MDN: outline-offset", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-offset" },
            { t: "MDN: outline-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-style" },
            { t: "MDN: box-shadow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow" },
            { t: "MDN: border-image", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-image" },
            { t: "MDN: border-image-slice", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-image-slice" },
            { t: "MDN: border-image-repeat", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-image-repeat" },
            { t: "CSS Basic User Interface Level 4: outlines", url: "https://drafts.csswg.org/css-ui/#outline-props" },
            { t: "CSS Backgrounds and Borders Level 3: box-shadow و border-image", url: "https://www.w3.org/TR/css-backgrounds-3/#box-shadow" }
          ],
          desc: R`[[outline]] خط حوالين العنصر زي الـ border، بس **برّه** الـ box model: مبيكبّرش العنصر ومبيزقّش اللي جنبه. عشان كده هو حلقة الـ focus. و [[outline-offset]] بيبعّده أو يقرّبه.
و [[box-shadow]] ضل للصندوق (أو جواه بـ [[inset]])، وبرضه مبيأثرش على المكان. و [[border-image]] بترسم الـ border من صورة أو تدرّج بدل اللون، بخمس خصائص طويلة.`,
          example: R`button:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
.card { box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }
.card:hover { box-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 12px 28px rgb(0 0 0 / 0.2); }
.picked { box-shadow: 0 0 0 3px #fde68a; }
input:focus { box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.2); }
.frame { border: 8px solid; border-image: linear-gradient(135deg, #b45309, #fde68a) 1; }`,
          flag: "script",
          lines: [
            R`حلقة بني 3px حوالين الزرار وقت ما ييجي عليه focus من الكيبورد، وبعيدة عنه 2px. مبتحركش أي حاجة في الصفحة.`,
            R`ضل للكارت: مفيش إزاحة أفقية، ونازل 4px، ومموّه 12px، وأسود بشفافية 15٪. بيخلّي الكارت «مرفوع» عن الصفحة.`,
            R`ضلّين مفصولين بفاصلة: واحد صغير حاد قريب، وواحد كبير ناعم بعيد. الاتنين مع بعض شكلهم أطبع من ضل واحد.`,
            R`حلقة صفرا 3px حوالين العنصر من غير تمويه: القيمة الرابعة (spread) بتكبّر الضل، والصفرين قبلها معناهم مفيش إزاحة ولا تمويه.`,
            R`ضل **جوه** الخانة ([[inset]]) نازل من فوق: الخانة تبان غاطسة.`,
            R`الـ border بيترسم من تدرّج بدل لون واحد. [[1]] معناها «خد البكسل الأول من كل حافة» وده كفاية للتدرّج.`
          ],
          teach: R`## الفكرة في سطرين

التلاتة «رسم حوالين الصندوق»، بس اتنين منهم ([[outline]] و [[box-shadow]]) **مش جزء من الـ box model**: بيترسموا فوق الصفحة، ومبيغيّروش مقاس ولا مكان أي حاجة. وده اللي بيحدد إمتى تستخدم كل واحد.

~~~text القياس من Chrome (نفس الكلمة بعد عنصر عليه 4px)
border: 4px solid        →  الكلمة اللي بعده اتحركت 8px، والصندوق طوله بقى 28 بدل 20
outline: 4px solid       →  اتحركت 0px، والطول 20
box-shadow: 0 0 0 4px    →  اتحركت 0px، والطول 20
~~~

---

## ١. [[outline: 3px solid #b45309]]

نفس تلات حاجات الـ border:

| الخاصية | القيم | الافتراضي (اتقاس) |
|---|---|---|
| [[outline-width: 3px]] | طول أو [[thin]] و [[medium]] و [[thick]] | [[3px]] (medium)، وبيفضل 3px حتى والـ style [[none]]، عكس الـ border |
| [[outline-style: solid]] | نفس [[<line-style>]] بتاعة الـ border، وزيادة [[auto]] | [[none]] |
| [[outline-color: #b45309]] | أي لون | لون الكلام |
| [[outline]] | المختصرة للتلاتة | |

والفرق عن الـ border:

- **مفيش نواحي:** مفيش [[outline-top]] (Chrome رفضها). الـ outline دايمًا حوالين العنصر كله.
- **مبيزقّش حاجة:** ممكن يركب على اللي جنبه.
- **بيتبع الـ [[border-radius]]** (في المتصفحات الحديثة، من 2021 تقريبًا). قبل كده كان بيطلع مستطيل حوالين الزرار المدوّر.

~~~live 130 outline على أشكال مختلفة
<style>
  .o { display: inline-block; margin: 14px; padding: 8px 16px; background: #fef3c7; outline: 3px solid #b45309; }
</style>
<span class="o">مستطيل</span>
<span class="o" style="border-radius: 999px">كبسولة</span>
<span class="o" style="outline-style: dashed; outline-offset: 4px">dashed و offset</span>
<span class="o" style="outline-style: auto">auto</span>
~~~

**هتشوف إيه:** أول واحد خط بني حوالين المستطيل. التاني الخط ماشي على الكبسولة. التالت خط متقطّع بعيد عن الصندوق بمسافة. الرابع ([[auto]]) شكل حلقة الـ focus الافتراضية بتاعة المتصفح، وشكلها بيختلف من متصفح للتاني.

### [[outline-offset: 2px]]

المسافة بين الـ outline وحافة الـ border. موجبة = برّه، وسالبة = **جوه** الصندوق.

~~~live 110 offset موجب وسالب
<style>
  .f { display: inline-block; margin: 14px; padding: 12px 18px; background: #0f766e; color: white; border-radius: 8px; outline: 2px solid #0f766e; }
</style>
<span class="f" style="outline-offset: 0">0</span>
<span class="f" style="outline-offset: 3px">3px</span>
<span class="f" style="outline-offset: -5px; outline-color: white">-5px</span>
~~~

**هتشوف إيه:** الأول الخط لازق في الزرار (مش باين تقريبًا لأنه نفس اللون). التاني حلقة واضحة بعيدة 3px. التالت خط أبيض **جوه** الزرار.

[[outline-offset]] هو اللي بيخلّي حلقة الـ focus تبان على زرار لونه نفس لونها.

~~~text القياس من Chrome
outline-offset: 0.5em (خط 16px)   →  8px
outline: 1px solid transparent    →  outline-color: rgba(0, 0, 0, 0)
~~~

### الـ outline والـ focus

ده الاستخدام الأهم: الحلقة اللي بتبان لما حد بيتنقل بالكيبورد. درس «focus-visible» شرح [[:focus-visible]] والقاعدة الذهبية: **متشيلش الـ outline من غير بديل.** واللي بيستخدم [[outline: 1px solid transparent]] مع [[box-shadow]] للحلقة: الحلقة الشفافة بتظهر في وضع Forced Colors بتاع ويندوز (المتصفح بيلغي الضلال ويدّي الـ outline لون)، فالـ focus ميضيعش (من MDN و WCAG).

---

## ٢. [[box-shadow: 0 4px 12px rgb(0 0 0 / 0.15)]]

~~~text تشريح القيمة
box-shadow:  inset   0          4px        12px       0           rgb(0 0 0 / 0.15)
             │       │          │          │          │           └ اللون (الافتراضي لون الكلام)
             │       │          │          │          └ spread: بيكبّر الضل أو يصغّره
             │       │          │          └ blur: التمويه، صفر = حاد
             │       │          └ إزاحة لتحت
             │       └ إزاحة لليمين (مبتتعكسش في العربي)
             └ اختياري: الضل جوه الصندوق
~~~

~~~live 190 ست ضلال
<style>
  .sh { display: inline-block; width: 26%; height: 60px; margin: 14px 3%; background: white; border-radius: 10px; font: 12px monospace; text-align: center; line-height: 60px; direction: ltr; }
  body { background: #f5f5f4; }
</style>
<div class="sh" style="box-shadow: 0 1px 2px rgb(0 0 0 / 0.15)">small</div>
<div class="sh" style="box-shadow: 0 4px 12px rgb(0 0 0 / 0.15)">medium</div>
<div class="sh" style="box-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 12px 28px rgb(0 0 0 / 0.2)">2 layers</div>
<div class="sh" style="box-shadow: 0 0 0 3px #fbbf24">spread ring</div>
<div class="sh" style="box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.25)">inset</div>
<div class="sh" style="box-shadow: 6px 6px 0 #78350f">hard</div>
~~~

**هتشوف إيه:** كروت بيضا على رمادي فاتح: الأول مرفوع شوية، والتاني أكتر، والتالت «طاير» بضل ناعم كبير. الرابع حواليه حلقة صفرا حادة. الخامس شكله غاطس لجوه. السادس ليه نسخة بني مزاحة تحت يمين (ستايل «retro»).

~~~text القياس من Chrome (المحسوب)
0 4px 8px rgb(0 0 0 / 0.2)       →  rgba(0, 0, 0, 0.2) 0px 4px 8px 0px      ← اللون الأول، والـ spread اتكتب 0
2px 2px  (والكلام بني)             →  rgb(180, 83, 9) 2px 2px 0px 0px          ← اللون من color
inset 0 2px 4px #0003            →  rgba(0, 0, 0, 0.2) 0px 2px 4px 0px inset
#0001 و #0002                    →  rgba(0, 0, 0, 0.067) و rgba(0, 0, 0, 0.133)   ← hex بأربع حروف فيه شفافية
~~~

### الضل مبياخدش مكان

~~~text القياس من Chrome
box-shadow: 0 0 0 30px red على صندوق   →  الصندوق اللي تحته مكانه زي ما هو، وعرض الصفحة متغيّرش (مفيش سكرول زيادة)
~~~

بس لو الأب عليه [[overflow: hidden]]، الضل بيتقص عند حدوده. ودي مشكلة مشهورة: كروت في شريط بسكرول، وضلها مقصوص. الحل [[padding]] للأب يدّي الضل مكان.

### القواعد اللي بتطلّع ضل طبيعي

- **النور من فوق:** إزاحة رأسية موجبة، وأفقية صفر أو صغيرة.
- **أسود بشفافية قليلة** ([[0.1]] لـ [[0.25]])، مش رمادي سادة. الشفاف بياخد من لون الخلفية.
- **كل ما العنصر «أعلى»** (قايمة منسدلة، مودال): إزاحة وتمويه أكبر.
- **ضلّين أحسن من واحد:** صغير حاد للحافة، وكبير ناعم للارتفاع.
- **الإزاحة الأفقية فعلية:** [[6px]] لليمين حتى في العربي (زي [[text-shadow]] في درس «text-decoration و text-shadow»).

### [[box-shadow]] ولا [[text-shadow]] ولا [[drop-shadow()]]؟

| | بيترسم على | spread و inset |
|---|---|---|
| [[box-shadow]] | الصندوق (المستطيل بأركانه المدورة) | موجودين |
| [[text-shadow]] | الحروف | لأ |
| [[filter: drop-shadow()]] | **الشكل الحقيقي** للمحتوى، بما فيه الحتت الشفافة في صورة PNG أو SVG | لأ (درس «filter و backdrop-filter») |

---

## ٣. [[border-image]]: الـ border من صورة

الـ border العادي لون واحد. [[border-image]] بتاخد صورة (أو تدرّج) وتقطّعها تسع حتت زي لعبة إكس-أو: الأربع أركان للأربع أركان، والأربع حواف بتتمط أو تتكرر على الجنبين، والنص بيترمي (إلا لو طلبته).

~~~text الصورة بتتقطّع كده (slice = 20 في صورة 60×60)
┌──────┬──────────┬──────┐
│ ركن  │  حافة فوق │ ركن  │   ← 20px
├──────┼──────────┼──────┤
│ حافة │   النص   │ حافة │
├──────┼──────────┼──────┤
│ ركن  │ حافة تحت │ ركن  │
└──────┴──────────┴──────┘
~~~

### الخمس خصائص

| الخاصية | بتحدد | الافتراضي |
|---|---|---|
| [[border-image-source: url("frame.svg")]] | الصورة ([[<image>]]: [[url()]] أو تدرّج) | [[none]] |
| [[border-image-slice: 20]] | بُعد خطوط القطع من حواف الصورة. رقم من غير وحدة = بكسلات **الصورة**، أو نسبة. و [[fill]] = ارسم النص كمان | [[100%]] |
| [[border-image-width: 20px]] | تُخن الـ border اللي الصورة هتترسم فيه. رقم من غير وحدة = مضروب في [[border-width]] | [[1]] (= تُخن الـ border) |
| [[border-image-outset: 4px]] | قد إيه الصورة تطلع **برّه** الصندوق | [[0]] |
| [[border-image-repeat: round]] | الحواف: [[stretch]] (تتمط) أو [[repeat]] (تتكرر وتتقص) أو [[round]] (تتكرر وتتظبط) أو [[space]] (تتكرر بمسافات) | [[stretch]] |
| [[border-image]] | المختصرة: [[source slice / width / outset repeat]] | |

~~~text القياس من Chrome (المحسوب)
border-image: url(a.svg) 27 / 20px / 4px repeat
  → source url(".../a.svg")   slice 27   width 20px   outset 4px   repeat repeat
border-image: url(a.svg) 30 fill stretch space
  → slice: 30 fill      repeat: stretch space     ← قيمتين: للحواف الأفقية ثم الرأسية
~~~

~~~live 230 إطار من SVG وإطار من تدرّج
<style>
  .fr { margin: 16px; padding: 12px; text-align: center; font-size: 18px; border: 20px solid #b45309;
        border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23fde68a'/%3E%3Ccircle cx='10' cy='10' r='7' fill='%23b45309'/%3E%3Ccircle cx='50' cy='10' r='7' fill='%23b45309'/%3E%3Ccircle cx='10' cy='50' r='7' fill='%23b45309'/%3E%3Ccircle cx='50' cy='50' r='7' fill='%23b45309'/%3E%3Ccircle cx='30' cy='10' r='4' fill='%2378350f'/%3E%3Ccircle cx='10' cy='30' r='4' fill='%2378350f'/%3E%3Ccircle cx='50' cy='30' r='4' fill='%2378350f'/%3E%3Ccircle cx='30' cy='50' r='4' fill='%2378350f'/%3E%3C/svg%3E") 20 round; }
  .gr { margin: 16px; padding: 12px; text-align: center; font-size: 18px; border: 8px solid;
        border-image: linear-gradient(135deg, #b45309, #fde68a, #0f766e) 1; border-radius: 16px; }
</style>
<div class="fr">إطار بأركان ودواير على الحواف (round)</div>
<div class="gr">إطار من تدرّج، و border-radius متجاهَلة</div>
~~~

**هتشوف إيه:** الأول إطار أصفر عريض، في كل ركن دايرة بني كبيرة، وعلى الحواف دواير صغيرة متكررة بالتساوي. التاني إطار متدرّج من البني للأصفر للأخضر، وأركانه **حادة** رغم [[border-radius: 16px]].

**حاجتين لازم تعرفهم:**

1. **[[border-image]] محتاجة [[border-style]] و [[border-width]]**. من غيرهم مفيش border يترسم فيه (اتقاس: من غير [[border]] التُخن المحسوب 0px والصورة مبتظهرش).
2. **بتتجاهل [[border-radius]]** للحدود نفسها. لو عايز إطار متدرّج بأركان مدورة: [[border: 8px solid transparent]] مع خلفيتين (التدرّج على [[border-box]] والأبيض على [[padding-box]]، درس «background-size و background-position» قسم ٥):

~~~live 90 إطار متدرّج بأركان مدورة
<style>
  .round-frame { margin: 12px; padding: 12px; text-align: center; border: 4px solid transparent; border-radius: 16px;
                 background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #b45309, #0f766e) border-box; }
</style>
<div class="round-frame">إطار متدرّج ومدوّر</div>
~~~

**هتشوف إيه:** صندوق أبيض أركانه مدورة، وحواليه إطار 4px متدرّج من البني للأخضر ماشي مع الأركان.

وكمان: المختصرة [[border]] بتصفّر [[border-image]] (اتقاس: [[border-image-source]] رجعت [[none]])، فاكتب [[border-image]] **بعد** [[border]].

---

## ٤. إمتى أستخدم إيه

| عايز | استخدم |
|---|---|
| حد حقيقي ثابت | [[border]] |
| حلقة focus، أو تحديد مؤقت من غير ما الصفحة تتهز | [[outline]] + [[outline-offset]] |
| حلقة «متختار» بأركان مدورة وأكتر من لون | [[box-shadow: 0 0 0 3px ...]] (وخلي [[outline]] شفاف عشان Forced Colors) |
| العنصر مرفوع عن الصفحة | [[box-shadow]] بإزاحة وتمويه |
| حد مزخرف أو متدرّج بأركان حادة | [[border-image]] |

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[outline: none]] على الأزرار «عشان شكلها» | اللي بيستخدم الكيبورد مش عارف هو فين |
| [[border]] في الـ hover أو الـ focus | العنصر بيكبر والصفحة بتتهز |
| [[box-shadow: 0 4px 12px 0.15]] | مرفوضة: اللون لازم لون |
| ضل رمادي سادة ([[#999]]) | شكله وسخ على خلفية ملوّنة. استخدم أسود شفاف |
| كروت بضل جوه أب عليه [[overflow: hidden]] | الضل بيتقص عند حدود الأب |
| [[border-image]] من غير [[border-style]] | مفيش إطار خالص، لأن التُخن صفر |
| [[border-image]] مع [[border-radius]] | أركان الإطار حادة رغم الـ radius |
| [[border]] بعد [[border-image]] | المختصرة مسحت الصورة ورجّعتها [[none]] |

---

## الخلاصة

- [[outline]] و [[box-shadow]] مبياخدوش مكان؛ [[border]] بياخد.
- [[outline]]: حوالين العنصر كله، بيتبع الأركان، و [[outline-offset]] يبعّده (أو يدخّله بالسالب). ده الـ focus.
- [[box-shadow: x y blur spread color]]، و [[inset]] جوه، وفاصلة لأكتر من ضل. الإزاحة فعلية.
- [[border-image]]: الصورة بتتقطّع 9، ومحتاجة [[border-style]]، وبتتجاهل [[border-radius]].`,
          try: R`اعمل [[shadows.html]] فيه تلات كروت منيو جنب بعض: واحد بضل صغير، وواحد بضل كبير بطبقتين، وواحد «متختار» بحلقة صفرا [[box-shadow: 0 0 0 3px]]. وتحتهم زرار عليه [[:focus-visible]] بـ outline بني و [[outline-offset: 2px]]. اضغط Tab لحد ما توصل للزرار، وقيس في DevTools إن الكروت محدش اتحرك.`,
          sol: R`~~~live 230 260 shadows.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ضلال</title>
<style>
  body { margin: 0; padding: 16px; background: #f5f5f4; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
  .row { display: flex; flex-wrap: wrap; gap: 16px; }
  .card { flex: 1 1 140px; padding: 16px; background: white; border-radius: 12px; }
  .s1 { box-shadow: 0 1px 2px rgb(0 0 0 / 0.15); }
  .s2 { box-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 12px 28px rgb(0 0 0 / 0.2); }
  .picked { box-shadow: 0 0 0 3px #fbbf24; outline: 1px solid transparent; }
  button { margin-top: 20px; padding: 10px 20px; border: 0; border-radius: 8px; background: #78350f; color: white; font: inherit; }
  button:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
</style>
</head>
<body>
<div class="row">
  <div class="card s1">إسبريسو</div>
  <div class="card s2">لاتيه</div>
  <div class="card picked">موكا ✓</div>
</div>
<button>كمّل الطلب</button>
</body>
</html>
~~~

**هتشوف إيه:** تلات كروت بيضا: الأول مرفوع شوية، والتاني طاير بضل ناعم كبير، والتالت حواليه إطار أصفر. وتحتهم زرار بني. دوس في المعاينة وبعدين Tab: حلقة بني بتظهر حوالين الزرار بمسافة صغيرة. ولو دوست على الزرار بالماوس الحلقة مبتظهرش ([[:focus-visible]]).

~~~text القياس من Chrome
.s2      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.2) 0px 12px 28px 0px
.picked  box-shadow: rgb(251, 191, 36) 0px 0px 0px 3px     outline-color: rgba(0, 0, 0, 0)
~~~

**ليه [[outline: 1px solid transparent]] على [[.picked]]:** في وضع Forced Colors الضلال بتختفي، والـ outline الشفاف بياخد لون النظام، فالكارت المختار يفضل باين.`,
          deep: {
            why: R`حلقة الـ focus شرط accessibility، ولو اتعملت بـ [[border]] الصفحة بتتهز مع كل Tab. [[outline]] اتعمل للحالة دي بالظبط. والضل أهم أداة «عمق» في التصميم: بيقول للمستخدم إيه اللي فوق إيه (قايمة فوق الصفحة، ومودال فوق الكل). و [[border-image]] بتوفّر عناصر وصور مقطّعة لإطارات الزينة.`,
            how: R`[[outline]] و [[box-shadow]] بيترسموا في مرحلة الرسم بعد ما الـ layout خلص، فمبيدخلوش في حساب أي مقاس، ومبيعملوش overflow. الـ outline بيترسم على حافة الـ border مزاح بـ [[outline-offset]]، وبيمشي على منحنى [[border-radius]]. الـ box-shadow نسخة من شكل الصندوق (بأركانه)، متكبّرة بالـ spread، ومزاحة، ومموّهة، ومقصوص منها جوه الصندوق (أو برّاه لو [[inset]]). و [[border-image]] بتقطّع الصورة بأربع خطوط ([[slice]])، وبترسم الحتت في مساحة الـ border ([[width]] و [[outset]])، وبتعيد الحواف حسب [[repeat]]، ومبتعرفش الأركان المدورة.`,
            when: R`[[outline]]: كل حالات الـ focus، وتحديد مؤقت، وتصحيح الـ layout ([[* { outline: 1px solid red }]] بيوريك كل صندوق من غير ما يغيّر المقاسات). [[box-shadow]]: كروت، وقوايم منسدلة، ومودال، وحلقة «متختار»، وخانة غاطسة. [[border-image]]: إطارات زينة (شهادات، وكروت مناسبات)، وحد متدرّج بأركان حادة.`,
            mistakes: R`شيل الـ outline من غير بديل. border في الـ hover. ضل رمادي سادة. ضل متقصوص بـ overflow. [[border-image]] من غير border-style، أو مع border-radius، أو قبل [[border]]. ونسيان إن الإزاحة الأفقية مبتتعكسش في العربي.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** زرار «متختار» محتاج حلقة واضحة حواليه **من غير** ما يزقّ الأزرار اللي جنبه: [[outline]] بني [[#b45309]] متصل 3px، وبعيد عن الزرار 2px. (من قسم ١ في الشرح)`, done: R`حلقة بني بعيدة عن الزرار، والأزرار التانية في مكانها، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .size { padding: 8px 14px; border: 1px solid #d6d3d1; border-radius: 8px; background: white; font: inherit; }
  .size.on { }
</style>
<button class="size">صغير</button>
<button class="size on">وسط</button>
<button class="size">كبير</button>`, checks: [
              { say: R`الحلقة متصلة`, q: ".size.on", style: ["outline-style", "solid"] },
              { say: R`تُخنها 3px`, q: ".size.on", style: ["outline-width", "3px"] },
              { say: R`لونها بني [[#b45309]]`, q: ".size.on", style: ["outline-color", "rgb(180, 83, 9)"] },
              { say: R`بعيدة 2px`, q: ".size.on", style: ["outline-offset", "2px"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .size { padding: 8px 14px; border: 1px solid #d6d3d1; border-radius: 8px; background: white; font: inherit; }
  .size.on { outline: 3px solid #b45309; outline-offset: 2px; }
</style>
<button class="size">صغير</button>
<button class="size on">وسط</button>
<button class="size">كبير</button>
~~~

**هتشوف إيه:** تلات أزرار بيضا، والنص «وسط» حواليه حلقة بني مدورة مع أركانه وبعيدة عنه شوية. الأزرار التلاتة على نفس الخط وبنفس المسافات.

**ليه كده:** الـ outline مش جزء من مقاس الزرار، فالزرارين اللي جنبه مكانهم زي ما هو. و [[outline-offset]] فصلت الحلقة عن الحد الرمادي فبانت.

**الغلطة الشائعة:** [[border: 3px solid #b45309]] على [[.on]]: الزرار هيكبر 4px من كل ناحية (من 1 لـ 3) والأزرار اللي جنبه هتتزق.

~~~text القياس من Chrome
.size.on   outline: rgb(180, 83, 9) solid 3px     outline-offset: 2px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** التاب المختار عليه خط تحت، والتابات التانية من غيره، فالتاب المختار **أطول** 3px وكلامه مش على نفس الخط مع الباقي. خلّي كل التابات بنفس الطول، والخط يبان على المختار بس. (من «الفكرة في سطرين» وقسم ٥ في الشرح)`, done: R`كل التابات بنفس الطول، والخط البني على المختار بس، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .tabs { display: flex; gap: 4px; align-items: flex-start; }
  .tab { padding: 8px 12px; }
  .tab.active { border-bottom: 3px solid #b45309; }
</style>
<div class="tabs"><span class="tab active">قهوة</span><span class="tab">شاي</span><span class="tab">حلويات</span></div>`, checks: [
              { say: R`التابات العادية ليها خط 3px هي كمان`, q: ".tab:not(.active)", style: ["border-bottom-width", "3px"] },
              { say: R`بس خطها شفاف`, q: ".tab:not(.active)", style: ["border-bottom-color", "rgba(0, 0, 0, 0)"] },
              { say: R`المختار خطه بني`, q: ".tab.active", style: ["border-bottom-color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 70 بعد التصليح
<style>
  .tabs { display: flex; gap: 4px; align-items: flex-start; }
  .tab { padding: 8px 12px; border-bottom: 3px solid transparent; }
  .tab.active { border-bottom-color: #b45309; }
</style>
<div class="tabs"><span class="tab active">قهوة</span><span class="tab">شاي</span><span class="tab">حلويات</span></div>
~~~

**هتشوف إيه:** تلات تابات كلامهم على نفس الخط بالظبط، وتحت «قهوة» بس خط بني.

**ليه كده:** كل التابات بقى ليها border بنفس التُخن، فطولهم واحد. الفرق بقى في **اللون** بس، واللون مبيغيّرش مقاس. ولو التاب اتغيّر بالـ JavaScript أو الـ hover، مفيش حاجة هتتهز.

**حل تاني صح:** [[box-shadow: inset 0 -3px 0 #b45309]] على المختار بس: خط جوه الصندوق من تحت، ومبياخدش مكان.

**الغلطة الشائعة:** [[outline]] للخط ده: الـ outline حوالين التاب كله، مفيش [[outline-bottom]].

~~~text القياس من Chrome
.tab          border-bottom-width: 3px     border-bottom-color: rgba(0, 0, 0, 0)
.tab.active   border-bottom-color: rgb(180, 83, 9)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت منيو مسطّح. ادّيه ضل: مفيش إزاحة أفقية، ونازل 4px، وتمويه 12px، وأسود بشفافية 0.15. (من قسم ٢ في الشرح)`, done: R`الكارت مرفوع عن الخلفية بضل ناعم تحته، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  body { background: #f5f5f4; }
  .card { max-width: 240px; padding: 16px; background: white; border-radius: 12px; }
</style>
<div class="card"><b>كابتشينو</b><p>٦٠ جنيه</p></div>`, checks: [
              { say: R`الضل [[0 4px 12px]] أسود 0.15`, q: ".card", style: ["box-shadow", "rgba(0, 0, 0, 0.15) 0px 4px 12px 0px"] }
            ] }, sol: R`~~~live 130 الحل
<style>
  body { background: #f5f5f4; }
  .card { max-width: 240px; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }
</style>
<div class="card"><b>كابتشينو</b><p>٦٠ جنيه</p></div>
~~~

**هتشوف إيه:** الكارت الأبيض بقى «فوق» الخلفية الرمادي: تحته غباشة رمادي ناعمة أوضح من تحت ومن الجنبين أخف، ومدورة مع الأركان.

**ليه القيم دي:** الإزاحة لتحت = النور جاي من فوق. التمويه أكبر من الإزاحة = ضل ناعم مش نسخة حادة. والشفافية بتخلّي الضل ياخد من لون الخلفية فبيبان طبيعي.

**الغلطة الشائعة:** [[box-shadow: 0 4px 12px #999]]: رمادي سادة. على خلفية ملوّنة هيبان بقعة رمادي.

~~~text القياس من Chrome
.card   box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px 0px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت المشروب اللي العميل اختاره محتاج حلقة صفرا [[#fbbf24]] حواليه 3px، حادة (من غير تمويه ولا إزاحة)، ومدورة مع أركانه. استخدم [[box-shadow]] بالـ spread. (من قسم ٢ في الشرح، وقسم ٤)`, done: R`حلقة صفرا حادة مدورة حوالين الكارت، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .pick { display: inline-block; padding: 14px 20px; margin: 8px; background: white; border: 1px solid #e7e5e4; border-radius: 12px; }
  .pick.chosen { }
</style>
<div class="pick">شاي</div><div class="pick chosen">قهوة ✓</div><div class="pick">عصير</div>`, checks: [
              { say: R`حلقة صفرا 3px من غير تمويه`, q: ".pick.chosen", style: ["box-shadow", "rgb(251, 191, 36) 0px 0px 0px 3px"] },
              { say: R`الكارت مكبرش (لسه border 1px)`, q: ".pick.chosen", style: ["border-top-width", "1px"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .pick { display: inline-block; padding: 14px 20px; margin: 8px; background: white; border: 1px solid #e7e5e4; border-radius: 12px; }
  .pick.chosen { box-shadow: 0 0 0 3px #fbbf24; }
</style>
<div class="pick">شاي</div><div class="pick chosen">قهوة ✓</div><div class="pick">عصير</div>
~~~

**هتشوف إيه:** تلات كروت، والنص «قهوة ✓» حواليه حلقة صفرا تخينة ماشية مع الأركان المدورة، والكروت كلها في نفس مكانها.

**ليه كده:** صفر إزاحة وصفر تمويه = نسخة من الكارت بنفس المكان، والـ spread كبّرها 3px من كل ناحية، فبان منها حلقة بس. والضل بيتبع [[border-radius]].

**الغلطة الشائعة:** [[box-shadow: 0 0 3px #fbbf24]]: تلات أرقام = إزاحتين وتمويه. هيطلع توهّج أصفر خفيف مش حلقة.

**كمّلها:** زوّد [[outline: 1px solid transparent]] عشان وضع Forced Colors (قسم ١).

~~~text القياس من Chrome
.pick.chosen   box-shadow: rgb(251, 191, 36) 0px 0px 0px 3px     border-top-width: 1px
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** شهادة «أحسن باريستا» بإطار متدرّج 6px من [[#b45309]] لـ [[#fde68a]] (بزاوية [[135deg]]). استخدم [[border-image]] بتدرّج و slice [[1]]. (من قسم ٣ في الشرح)`, done: R`الإطار متدرّج والأركان حادة، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .cert { padding: 20px; text-align: center; font-size: 20px; background: #fffbeb; }
</style>
<div class="cert">شهادة: أحسن باريستا في الشهر<br>سلمى فؤاد</div>`, checks: [
              { say: R`فيه border 6px يترسم فيه`, q: ".cert", style: ["border-top-width", "6px"] },
              { say: R`مصدر الإطار التدرّج`, q: ".cert", style: ["border-image-source", "linear-gradient(135deg, rgb(180, 83, 9), rgb(253, 230, 138))"] },
              { say: R`الـ slice = 1`, q: ".cert", style: ["border-image-slice", "1"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  .cert { padding: 20px; text-align: center; font-size: 20px; background: #fffbeb;
          border: 6px solid;
          border-image: linear-gradient(135deg, #b45309, #fde68a) 1; }
</style>
<div class="cert">شهادة: أحسن باريستا في الشهر<br>سلمى فؤاد</div>
~~~

**هتشوف إيه:** صندوق كريمي حواليه إطار 6px: بني غامق عند الركن اللي فوق شمال، وبيفتح لحد أصفر عند الركن اللي تحت يمين ([[135deg]] اتجاهه لتحت يمين، فالبداية فوق شمال).

**ليه كده:**
- [[border: 6px solid]] الأول: من غير style وتُخن مفيش مكان للصورة.
- [[border-image]] **بعدها**: المختصرة [[border]] بتصفّر [[border-image]].
- [[1]]: التدرّج ملوش بكسلات حقيقية، فـ «قص 1» من كل حافة بياخد حتة رفيعة بلون الحافة وبيمطها على الـ border كله. ده الرقم المعتاد مع التدرّجات.

**الغلطة الشائعة:** [[border-image: linear-gradient(...)]] من غير slice: الافتراضي [[100%]]، فكل الصورة بقت «أركان» والحواف فاضية: هتشوف ألوان في الأربع أركان بس.

~~~text القياس من Chrome
.cert   border-top-width: 6px
        border-image-source: linear-gradient(135deg, rgb(180, 83, 9), rgb(253, 230, 138))
        border-image-slice: 1
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.box { border: 6px solid; border-image: linear-gradient(red, blue) 1; border-radius: 20px; box-shadow: 0 0 0 6px #0f766e; }]]. الإطار المتدرّج هيبقى أركانه مدورة؟ والضل الأخضر؟ اكتب الإجابتين، وبعدين افتح الحل. (من قسم ٣ في الشرح: «حاجتين لازم تعرفهم»)`, done: R`كتبت إن الإطار أركانه حادة والضل الأخضر مدوّر.`, sol: R`~~~live 100 الصفحة
<style>
  .box { margin: 16px; padding: 16px; background: #fef3c7; border: 6px solid; border-image: linear-gradient(red, blue) 1; border-radius: 20px; box-shadow: 0 0 0 6px #0f766e; }
</style>
<div class="box">إطار متدرّج و border-radius</div>
~~~

**الإجابة:** الإطار المتدرّج **حاد** الأركان، والضل الأخضر اللي حواليه **مدوّر**.

**هتشوف إيه:** مستطيل كريمي بإطار أحمر من فوق وأزرق من تحت وأركانه مربعة، ووراه حلقة خضرا تخينة أركانها مدورة بتطلع من ورا الأركان الحادة.

**السبب:** [[border-radius]] لسه شغالة على العنصر (المحسوب [[20px]]): الضل والخلفية والـ outline بيمشوا عليها. اللي بيتجاهلها هو الـ border اللي اترسم من [[border-image]] بس. ولو عايز إطار متدرّج ومدوّر: الخلفيتين على [[padding-box]] و [[border-box]] (قسم ٣).

~~~text القياس من Chrome
.box   border-top-left-radius: 20px     border-image-source: linear-gradient(rgb(255, 0, 0), rgb(0, 0, 255))
       box-shadow: rgb(15, 118, 110) 0px 0px 0px 6px
~~~` }
          ]
        },
        {
          cmd: "rgb و hsl و oklch",
          title: "كل طرق كتابة اللون: الأسامي والـ hex و rgb و hsl و hwb و lab و oklch و color()، والشفافية، و opacity",
          pre: ["css/font-family و font-size"],
          ref: [
            { t: "MDN: <color>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value" },
            { t: "MDN: <named-color>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color" },
            { t: "MDN: <hex-color>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/hex-color" },
            { t: "MDN: rgb()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/rgb" },
            { t: "MDN: hsl()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hsl" },
            { t: "MDN: hwb()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hwb" },
            { t: "MDN: lab()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/lab" },
            { t: "MDN: lch()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/lch" },
            { t: "MDN: oklab()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklab" },
            { t: "MDN: oklch()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch" },
            { t: "MDN: color()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color" },
            { t: "MDN: opacity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/opacity" },
            { t: "CSS Color Level 4", url: "https://www.w3.org/TR/css-color-4/" }
          ],
          desc: R`أي مكان بياخد لون في CSS بياخد قيمة من نوع [[<color>]]، وليها طرق كتابة كتير: اسم ([[tomato]])، و hex ([[#ff6600]])، و [[rgb()]]، و [[hsl()]]، و [[hwb()]]، و [[lab()]] و [[lch()]]، و [[oklab()]] و [[oklch()]]، و [[color()]]. كلهم ممكن يبقى معاهم شفافية بعد [[/]].
والطرق دي مش «نفس الحاجة بشكل تاني»: [[oklch()]] بتخلّيك تعمل درجات من نفس اللون بإضاءة متساوية للعين، و [[color()]] بتوصل لألوان الشاشات الواسعة. و [[opacity]] (شفافية العنصر كله) غير شفافية لون الخلفية.`,
          example: R`h1 { color: tomato; }
.brand { color: #b45309; }
.overlay { background-color: rgb(0 0 0 / 0.6); }
.btn:hover { background-color: hsl(24 100% 40%); }
.tag { background-color: oklch(0.85 0.1 85); }
.vivid { color: color(display-p3 1 0.4 0); }
.ghost { opacity: 0.5; }`,
          flag: "script",
          lines: [
            R`لون باسمه: [[tomato]] واحد من حوالي 148 اسم جاهز. المحسوب [[rgb(255, 99, 71)]].`,
            R`hex: تلات أزواج حروف للأحمر والأخضر والأزرق، كل زوج من 00 لـ ff. أشهر شكل في التصميم.`,
            R`أسود شفافيته 60٪: الأرقام بمسافات، والشفافية بعد [[/]]. طبقة غامقة فوق صورة والكلام اللي فوقها يفضل أبيض كامل.`,
            R`برتقالي بالـ hsl: درجة اللون 24 على عجلة الألوان، وتشبع 100٪، وإضاءة 40٪ (أغمق من العادي 50٪).`,
            R`أصفر فاتح هادي بالـ oklch: إضاءة 0.85 من 1، وقوة لون 0.1، ودرجة 85. الإضاءة هنا قريبة من اللي العين شايفاه.`,
            R`برتقالي بمساحة ألوان الشاشات الحديثة (Display P3): ممكن يطلع أزهى من أي hex على شاشة بتدعمها.`,
            R`العنصر كله (خلفيته وكلامه وأولاده) نص شفاف.`
          ],
          teach: R`## الفكرة في سطرين

[[<color>]] **نوع قيمة**: أي خاصية بتاخد لون بتقبل أي طريقة كتابة من الدرس ده. والمتصفح بيحوّل الطرق القديمة كلها لـ [[rgb()]] وقت الحساب، وبيسيب الطرق الجديدة ([[lab]] و [[oklch]] و [[color()]]) زي ما هي عشان ميخسرش ألوان.

درس «مقدمة CSS وتنسيق العناصر» اتكلم عن الاسم والـ hex باختصار، ودرس «font-family و font-size» عن [[color]] و [[currentColor]]. هنا كل الطرق بالتفصيل.

---

## ١. [[<color>]]: فين بيتستخدم

| الخاصية | بتلوّن |
|---|---|
| [[color]] | الكلام (والافتراضي لحاجات تانية كتير عن طريق [[currentColor]]) |
| [[background-color]] | خلفية الصندوق |
| [[border-color]] و [[outline-color]] | الحدود وحلقة الـ focus |
| [[text-decoration-color]] | الخط اللي تحت الكلام |
| [[box-shadow]] و [[text-shadow]] | ضل الصندوق وضل الحروف |
| جوه التدرّجات | نقط الألوان |
| [[caret-color]] و [[accent-color]] | مؤشر الكتابة، والـ checkbox وإخواته (الدرس الجاي) |
| [[fill]] و [[stroke]] | أشكال SVG (درس «SVG») |

~~~text القياس من Chrome: نفس البرتقالي بكل الطرق
#f60  #ff6600  #FF6600              →  rgb(255, 102, 0)
rgb(255 102 0)  rgb(255, 102, 0)    →  rgb(255, 102, 0)
rgb(100% 40% 0%)                    →  rgb(255, 102, 0)
hsl(24 100% 50%)  hwb(24 0% 0%)     →  rgb(255, 102, 0)
lab(60% 60 70)                      →  lab(60 60 70)              ← بيفضل lab
oklch(0.7 0.19 47)                  →  oklch(0.7 0.19 47)         ← بيفضل oklch
color(display-p3 1 0.4 0)           →  color(display-p3 1 0.4 0)
~~~

يعني لو بتكتب اختبار بيقارن لون محسوب، قارن بالشكل اللي المتصفح بيرجّعه، مش اللي كتبته.

---

## ٢. الأسامي: [[tomato]] و [[rebeccapurple]]

CSS فيها حوالي 148 اسم لون جاهز (العدد من MDN): من [[black]] و [[white]] و [[red]] لحد [[papayawhip]] و [[rebeccapurple]]. الحروف الكبيرة والصغيرة زي بعض.

~~~live 70 شوية أسامي
<style>
  .n { display: inline-block; width: 22%; margin: 2px; padding: 10px 0; text-align: center; font: 12px monospace; color: white; }
</style>
<span class="n" style="background: tomato">tomato</span><span class="n" style="background: teal">teal</span><span class="n" style="background: rebeccapurple">rebeccapurple</span><span class="n" style="background: goldenrod">goldenrod</span>
~~~

**هتشوف إيه:** أربع مستطيلات: أحمر برتقاني، وأخضر مزرق، وبنفسجي، وأصفر دهبي.

الأسامي كويسة للتجربة والأمثلة، مش للتصميم: [[green]] مثلًا أغمق بكتير من اللي متوقعه ([[rgb(0, 128, 0)]])، وألوان البراند عمرها ما بتبقى اسم جاهز. وفيه كلمتين مميزين: [[transparent]] ([[rgba(0, 0, 0, 0)]]) و [[currentColor]] (لون الكلام، الدرس الجاي).

---

## ٣. hex: [[#b45309]]

| الشكل | معناه | المحسوب |
|---|---|---|
| [[#ff6600]] | أحمر [[ff]]، أخضر [[66]]، أزرق [[00]] (كل زوج من 00 لـ ff، يعني 0 لـ 255) | [[rgb(255, 102, 0)]] |
| [[#f60]] | اختصار: كل حرف بيتكرر ([[ff]] [[66]] [[00]]) | نفسه |
| [[#ff660080]] | زوج رابع للشفافية: [[80]] = 128 من 255 ≈ 50٪ | [[rgba(255, 102, 0, 0.5)]] |
| [[#f608]] | اختصار الأربعة | [[rgba(255, 102, 0, 0.533)]] |
| [[#12345]] أو 7 حروف | مرفوض | |

---

## ٤. [[rgb(255 102 0 / 0.5)]]

نفس فكرة الـ hex بأرقام عادية: أحمر وأخضر وأزرق من 0 لـ 255 (أو نسب من 0٪ لـ 100٪)، والشفافية بعد [[/]] (رقم من 0 لـ 1 أو نسبة).

~~~text القياس من Chrome
rgb(255 102 0 / 50%)        →  rgba(255, 102, 0, 0.5)
rgba(255, 102, 0, 0.5)      →  rgba(255, 102, 0, 0.5)     ← الشكل القديم بالفواصل، لسه شغال
rgba(255 102 0)             →  مقبولة: rgba و rgb بقوا اسمين لنفس الدالة
rgb(300 -5 0)               →  rgb(255, 0, 0)             ← اللي برّه المدى بيتقص
rgb(255, 102, 0 / 0.5)      →  مرفوضة: فواصل و / مع بعض
~~~

**الشكلين:** الحديث بمسافات و [[/]]، والقديم بفواصل و [[rgba]]. متخلطش بينهم في نفس القيمة. اكتب الحديث في الكود الجديد.

---

## ٥. [[hsl(24 100% 40%)]]

[[hsl]] = Hue, Saturation, Lightness: درجة اللون، والتشبع، والإضاءة. أسهل بكتير من rgb لما عايز «نفس اللون أغمق شوية».

| الجزء | المدى | معناه |
|---|---|---|
| H (hue) | 0 لـ 360 (درجات) | مكان اللون على عجلة: 0 أحمر، 60 أصفر، 120 أخضر، 180 سماوي، 240 أزرق، 300 بمبي |
| S (saturation) | 0٪ لـ 100٪ | 0٪ رمادي، 100٪ أقوى لون |
| L (lightness) | 0٪ لـ 100٪ | 0٪ أسود، 50٪ اللون الصافي، 100٪ أبيض |

~~~live 80 نفس الـ hue بإضاءات مختلفة
<style>
  .h { display: inline-block; width: 18%; margin: 1px; padding: 14px 0; text-align: center; font: 11px monospace; }
</style>
<span class="h" style="background: hsl(24 100% 20%); color: white">20%</span><span class="h" style="background: hsl(24 100% 35%); color: white">35%</span><span class="h" style="background: hsl(24 100% 50%)">50%</span><span class="h" style="background: hsl(24 100% 70%)">70%</span><span class="h" style="background: hsl(24 100% 90%)">90%</span>
~~~

**هتشوف إيه** (من اليمين): خمس درجات من نفس البرتقالي: بني غامق جدًا، وبني محروق، وبرتقالي صافي، وخوخي، وكريمي.

~~~text القياس من Chrome
hsl(24 100% 50%)              →  rgb(255, 102, 0)
hsl(24deg 100% 50% / 0.5)     →  rgba(255, 102, 0, 0.5)
hsla(24, 100%, 50%, 0.5)      →  rgba(255, 102, 0, 0.5)     ← زي rgba: اسم قديم لنفس الدالة
hsl(24 100 50)                →  مقبولة: الأرقام من غير % شغالة في الشكل الحديث
~~~

### مشكلة hsl: الـ L مش اللي العين شايفاه

~~~live 70 كلهم L = 50%
<style>
  .e { display: inline-block; width: 30%; margin: 2px; padding: 14px 0; text-align: center; font: 12px monospace; color: black; }
</style>
<span class="e" style="background: hsl(60 100% 50%)">hsl 60</span><span class="e" style="background: hsl(120 100% 50%)">hsl 120</span><span class="e" style="background: hsl(240 100% 50%)">hsl 240</span>
~~~

**هتشوف إيه:** الأصفر فاتح جدًا والكلام الأسود عليه واضح، والأخضر فاتح، والأزرق غامق والكلام الأسود عليه بالعافية يتقري. **التلاتة «إضاءتهم 50٪» في hsl.** يعني لو عملت درجات لكذا لون بنفس الـ L، مش هيبانوا بنفس الإضاءة، والتباين هيختلف من لون للتاني. ده اللي [[oklch]] بيحله (قسم ٨).

---

## ٦. [[hwb(24 20% 30%)]]

[[hwb]] = Hue, Whiteness, Blackness: نفس عجلة الـ hue، وبعدها «قد إيه أبيض اتخلط» و «قد إيه أسود». قريب من خلط الألوان بالإيد.

~~~text القياس من Chrome
hwb(24 0% 0%)      →  rgb(255, 102, 0)     ← اللون الصافي
hwb(24 20% 30%)    →  rgb(179, 102, 51)    ← زوّدنا أبيض 20% وأسود 30%: بني فاتح
~~~

استخدامه قليل. مفيد لو بتعمل color picker.

---

## ٧. [[lab()]] و [[lch()]]

دول من مساحة ألوان علمية (CIE Lab)، معمولة إن المسافة بين لونين بالأرقام تبقى قريبة من الفرق اللي العين شايفاه.

| الدالة | الأجزاء |
|---|---|
| [[lab(60% 60 70)]] | L الإضاءة (0 لـ 100)، و a (أخضر ← سالب، أحمر ← موجب)، و b (أزرق ← سالب، أصفر ← موجب) |
| [[lch(60% 92 50)]] | L الإضاءة، و C قوة اللون (chroma)، و H الدرجة. نفس lab بس «دايري» زي hsl |

~~~text القياس من Chrome
lab(60% 60 70)    →  lab(60 60 70)      ← بيفضل lab (مبيتحوّلش لـ rgb)
lch(60% 92 50)    →  lch(60 92 50)
lab(60 60 70)     →  مقبولة من غير %
~~~

فيهم عيب معروف: لما تغيّر الـ H في [[lch]] اللون الأزرق بيميل للبنفسجي. عشان كده اتعملت النسخة المحسّنة: [[oklab]] و [[oklch]].

---

## ٨. [[oklch(0.7 0.19 47)]]

دي الطريقة اللي أغلب أنظمة التصميم الحديثة بقت تكتب بيها الألوان (Tailwind v4 مثلًا، درس «@theme»).

| الجزء | المدى | معناه |
|---|---|---|
| L | 0 لـ 1 (أو 0٪ لـ 100٪) | الإضاءة **زي ما العين شايفاها** |
| C | 0 لـ حوالي 0.4 | قوة اللون. 0 = رمادي |
| H | 0 لـ 360 | الدرجة على العجلة (مش نفس أرقام hsl: البرتقالي هنا حوالي 47) |
| [[/ 0.5]] | 0 لـ 1 | الشفافية |

~~~live 70 كلهم oklch بنفس L = 0.75
<style>
  .k { display: inline-block; width: 30%; margin: 2px; padding: 14px 0; text-align: center; font: 12px monospace; color: black; }
</style>
<span class="k" style="background: oklch(0.75 0.15 100)">H 100</span><span class="k" style="background: oklch(0.75 0.15 145)">H 145</span><span class="k" style="background: oklch(0.75 0.15 260)">H 260</span>
~~~

**هتشوف إيه:** أصفر زيتوني، وأخضر، وأزرق، **بنفس الإضاءة تقريبًا**، والكلام الأسود مقروء على التلاتة بنفس الدرجة. قارنها بالـ hsl اللي فوق.

### [[oklab(0.7 0.13 0.14)]]

نفس الكلام بشكل «a و b» زي lab. [[oklch]] أسهل في الكتابة بالإيد (الإضاءة والقوة والدرجة مفصولين)، و [[oklab]] أحسن لخلط لونين (قسم ٧ في درس التدرّجات بيستخدمها بـ [[in oklab]]).

~~~text القياس من Chrome
oklch(70% 0.19 47 / 0.5)   →  oklch(0.7 0.19 47 / 0.5)
oklch(0.7 none 47)         →  oklch(0.7 none 47)     ← none = «مفيش قيمة»: مفيدة في الخلط والتدرّج
oklab(0.7 0.13 0.14)       →  oklab(0.7 0.13 0.14)
~~~

**إزاي تعمل درجات من لون البراند:** ثبّت C و H وغيّر L بس: [[oklch(0.95 0.03 47)]] خلفية فاتحة، و [[oklch(0.7 0.19 47)]] اللون نفسه، و [[oklch(0.45 0.13 47)]] غامق للكلام. الدرس الجاي بيعمل نفس الحاجة أوتوماتيك بـ [[color-mix()]] والألوان النسبية.

---

## ٩. [[color(display-p3 1 0.4 0)]]

[[color()]] بتكتب اللون بأرقام من 0 لـ 1 في **مساحة ألوان بتختارها بالاسم**:

| المساحة | إيه هي |
|---|---|
| [[srgb]] | نفس [[rgb()]] بأرقام 0 لـ 1. المساحة اللي الويب اتعمل عليها |
| [[srgb-linear]] | sRGB من غير «تصحيح جاما». للحسابات |
| [[display-p3]] | ألوان أوسع من sRGB بحوالي 25٪. أغلب الموبايلات واللابتوبات الحديثة بتعرضها |
| [[a98-rgb]] و [[prophoto-rgb]] و [[rec2020]] | مساحات أوسع، للتصوير والفيديو |
| [[xyz]] و [[xyz-d50]] و [[xyz-d65]] | المساحة «الأم» اللي كل الباقي بيتحسب منها |

~~~text القياس من Chrome
color(srgb 1 0.4 0)          →  color(srgb 1 0.4 0)     ← نفس البرتقالي، بس المحسوب بيفضل color()
color(display-p3 1 0.4 0)    →  color(display-p3 1 0.4 0)
color(rec2020 1 0 0)  و  color(xyz 0.5 0.3 0.1)   →  مقبولين
~~~

إمتى الألوان دي بتبان فعلًا، وإيه اللي بيحصل على شاشة مبتدعمهاش: ده قسم «gamut» في الدرس الجاي.

---

## ١٠. الشفافية (alpha)

أي طريقة من اللي فوق بتاخد شفافية بعد [[/]] (أو الزوج الرابع في الـ hex). اللون الشفاف بيتخلط مع اللي وراه:

~~~live 120 أسود بشفافيات مختلفة فوق صورة
<style>
  .bg { height: 90px; display: flex; background: linear-gradient(90deg, #fbbf24, #0f766e); }
  .bg div { flex: 1; display: grid; place-items: center; color: white; font: 13px monospace; direction: ltr; }
</style>
<div class="bg">
  <div style="background: rgb(0 0 0 / 0)">/ 0</div>
  <div style="background: rgb(0 0 0 / 0.3)">/ 0.3</div>
  <div style="background: rgb(0 0 0 / 0.6)">/ 0.6</div>
  <div style="background: rgb(0 0 0 / 0.9)">/ 0.9</div>
</div>
~~~

**هتشوف إيه:** شريط متدرّج من الأصفر للأخضر، ومتقسّم أربع حتت: اللي على اليمين زي ما هي، وكل حتة بعدها أغمق، والأخيرة تقريبًا سودا. والكلام الأبيض واضح أكتر كل ما الطبقة تغمق.

دي الطريقة الصح لطبقة غامقة فوق صورة تحت كلام: الصورة تفضل باينة والكلام مقروء (والتباين يتقاس على أفتح حتة، درس «contrast ratio»).

---

## ١١. [[opacity: 0.5]]: شفافية العنصر كله

[[opacity]] مش لون. دي بتخلّي **العنصر كله** شفاف: خلفيته، وكلامه، وحدوده، وكل أولاده، كأنهم صورة واحدة اتعملها شفافية.

~~~live 160 opacity ضد alpha في الخلفية
<style>
  .wrap { padding: 12px; background: linear-gradient(90deg, #fbbf24, #0f766e); }
  .c { display: inline-block; width: 44%; margin: 4px; padding: 12px; color: white; font-weight: 700; vertical-align: top; box-sizing: border-box; }
  .c b { display: inline-block; margin-top: 6px; padding: 2px 8px; background: #dc2626; }
</style>
<div class="wrap">
  <div class="c" style="background: rgb(0 0 0); opacity: 0.6">opacity: 0.6<br><b>زرار أحمر</b></div>
  <div class="c" style="background: rgb(0 0 0 / 0.6)">background ‎/ 0.6<br><b>زرار أحمر</b></div>
</div>
~~~

**هتشوف إيه:** الكارتين خلفيتهم سودا شفافة بنفس الدرجة. بس في الأول ([[opacity]]) الكلام الأبيض **باهت** والزرار الأحمر **باهت** والتدرّج باين من وراهم. في التاني الكلام أبيض صافي والزرار أحمر صافي.

~~~text القياس من Chrome
opacity: 50%  →  0.5      opacity: 1.5  →  1      opacity: -1  →  0     ← بيتقص بين 0 و 1
ابن عليه opacity: 1 جوه أب عليه 0.5   →  المحسوب للابن 1، وبيترسم باهت برضه
زرار عليه opacity: 0      →  elementFromPoint بيرجّعه: لسه بيتداس عليه وهو مش باين
زرار عليه visibility: hidden  →  مبيتداسش (الضغطة بتروح للي تحته)
~~~

**الخلاصة العملية:**

- عايز **الخلفية** بس شفافة؟ alpha في اللون: [[rgb(0 0 0 / 0.6)]].
- عايز **العنصر كله** يبهت (زرار disabled، أو صورة بتختفي بحركة)؟ [[opacity]].
- **الابن مبيقدرش يلغي** شفافية أبوه.
- [[opacity: 0]] **مش** إخفاء: العنصر لسه بياخد مكان، وبيتداس عليه، وقارئ الشاشة بيقراه. للإخفاء: [[hidden]] (درس «hidden و inert») أو [[visibility: hidden]].
- أي [[opacity]] أقل من 1 بيعمل «stacking context» جديد، وده بيأثر على [[z-index]] (درس «z-index»).

---

## ١٢. أكتب بأنهي طريقة؟

| الموقف | الأنسب |
|---|---|
| لون جاي من ملف التصميم (Figma) | hex زي ما هو |
| شفافية (طبقة فوق صورة، ضل) | [[rgb(0 0 0 / 0.6)]] |
| درجات من لون البراند، وألوان ثيم | [[oklch()]] |
| خلط لونين أو تدرّج وسطه نضيف | [[in oklab]] أو [[in oklch]] |
| تعديل سريع بالإيد ("أغمق شوية") | [[hsl()]] أو [[oklch()]] |
| لون أزهى على الشاشات الحديثة | [[color(display-p3 ...)]] مع بديل (الدرس الجاي) |
| أمثلة وتجارب | الأسامي |

---

## ١٣. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[rgb(255, 102, 0 / 0.5)]] | مرفوضة: فواصل و [[/]] مع بعض |
| [[#12345]] | مرفوضة: 3 أو 4 أو 6 أو 8 حروف بس |
| [[opacity]] على كارت عشان الخلفية تبقى شفافة | الكلام والأزرار كمان بهتوا |
| [[opacity: 0]] عشان تخفي زرار | لسه بيتداس عليه |
| درجات بـ hsl بنفس L لكذا لون | الأصفر فاتح والأزرق غامق، والتباين مختلف |
| اختبار بيقارن [[getComputedStyle]] بـ [[rgb()]] على لون oklch | بيفشل: المحسوب [[oklch(...)]] |
| [[green]] على أمل أخضر فاتح | طالع [[rgb(0, 128, 0)]]، أخضر غامق |

---

## الخلاصة

- [[<color>]] نوع، وكل الطرق دي قيمه. القديمة بتتحسب [[rgb()]]، والجديدة بتفضل زي ما هي.
- hex: 3 أو 4 أو 6 أو 8 حروف، والرابع/التامن شفافية.
- [[rgb(R G B / A)]] الشكل الحديث، و [[rgba]] و [[hsla]] أسامي قديمة لنفس الحاجة.
- [[hsl]] سهلة بس الـ L بتاعها مش الإضاءة الحقيقية. [[oklch(L C H)]] الإضاءة فيها حقيقية: للدرجات والثيمات.
- [[lab]] و [[lch]] و [[oklab]] علمية، و [[color()]] للمساحات الواسعة.
- alpha في اللون للخلفية بس، و [[opacity]] للعنصر كله، و [[opacity: 0]] مش إخفاء.`,
          try: R`اعمل [[colors.html]] فيه خمس مربعات بنفس البرتقالي مكتوب بخمس طرق ([[#ff6600]] و [[rgb()]] و [[hsl()]] و [[hwb()]] و [[oklch(0.7 0.2 47)]])، وافتح Console واكتب [[getComputedStyle(document.querySelector(".x")).backgroundColor]] لكل واحد. مين اتحوّل لـ rgb ومين لأ؟ وبعدين اعمل كارت فوق صورة (تدرّج) مرة بـ [[opacity]] ومرة بـ alpha وقارن الكلام.`,
          sol: R`~~~live 210 colors.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ألوان</title>
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
  .row { display: flex; gap: 6px; flex-wrap: wrap; }
  .x { flex: 1 1 90px; padding: 16px 4px; text-align: center; font: 12px monospace; }
  .hero { margin-top: 16px; padding: 16px; background: linear-gradient(135deg, #fbbf24, #0f766e); display: flex; gap: 8px; }
  .card { flex: 1; padding: 12px; color: white; }
</style>
</head>
<body>
<div class="row">
  <div class="x" style="background: #ff6600">hex</div>
  <div class="x" style="background: rgb(255 102 0)">rgb</div>
  <div class="x" style="background: hsl(24 100% 50%)">hsl</div>
  <div class="x" style="background: hwb(24 0% 0%)">hwb</div>
  <div class="x" style="background: oklch(0.7 0.2 47)">oklch</div>
</div>
<div class="hero">
  <div class="card" style="background: black; opacity: 0.5">opacity: 0.5</div>
  <div class="card" style="background: rgb(0 0 0 / 0.5)">alpha 0.5</div>
</div>
</body>
</html>
~~~

**هتشوف إيه:** خمس مستطيلات برتقاني، أول أربعة متطابقين بالظبط، والخامس ([[oklch]]) قريب جدًا منهم (لأن الأرقام اللي كتبناها مش البرتقالي بالظبط). وتحتهم شريط متدرّج فيه كارتين بنفس غمقان الخلفية، والكلام في كارت الـ [[opacity]] باهت، وفي كارت الـ alpha أبيض صافي.

~~~text القياس من Chrome (الـ Console)
hex     rgb(255, 102, 0)
rgb     rgb(255, 102, 0)
hsl     rgb(255, 102, 0)
hwb     rgb(255, 102, 0)
oklch   oklch(0.7 0.2 47)      ← الوحيد اللي متحوّلش
~~~`,
          deep: {
            why: R`الألوان أكتر قيمة بتتكتب في CSS. معرفة الطرق كلها بتخليك تقرا أي كود (Tailwind بيطلّع [[oklch]]، و Figma بيطلّع hex، والمكتبات القديمة [[rgba]] بالفواصل). والأهم: [[oklch]] بتحل مشكلة حقيقية في الثيمات (درجات بنفس الإضاءة للعين، فالتباين متوقع)، و [[color()]] بتوصل لألوان الشاشات الحديثة اللي hex مبيوصلهاش.`,
            how: R`المتصفح بيحلل القيمة لمساحة ألوانها الأصلية. الطرق اللي «تبع sRGB» (الأسامي والـ hex و rgb و hsl و hwb) بتتخزن وتترجع كـ [[rgb()]]/[[rgba()]]. الباقي (lab و lch و oklab و oklch و color()) بيترجع بشكله عشان ممكن يبقى برّه sRGB. وقت الرسم كل لون بيتحوّل لمساحة الشاشة (ومع شاشة sRGB الألوان اللي برّاها بتتقرّب، الدرس الجاي). والشفافية بتتخلط مع اللي ورا العنصر. [[opacity]] مختلفة: المتصفح بيرسم العنصر وأولاده في طبقة لوحدها، وبعدين يحط الطبقة دي كلها بشفافية، عشان كده الأولاد ميقدروش يلغوها.`,
            when: R`hex: لما اللون جاي جاهز من تصميم. [[rgb(... / a)]]: طبقات شفافة وضلال. [[hsl]]: تعديل سريع بالإيد. [[oklch]]: ألوان البراند ودرجاتها والثيمات. [[oklab]]: الخلط والتدرّج. [[color(display-p3 ...)]]: ألوان زاهية جدًا مع بديل sRGB. [[opacity]]: عنصر disabled، أو حركة ظهور واختفاء.`,
            mistakes: R`خلط الفواصل مع [[/]]. hex بعدد حروف غلط. [[opacity]] بدل alpha على كارت فيه كلام. [[opacity: 0]] كإخفاء. درجات hsl بنفس L لألوان مختلفة. مقارنة لون محسوب بشكل غير اللي المتصفح بيرجّعه.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** تلات مربعات لازم يبقوا نفس البرتقالي بالظبط [[rgb(255, 102, 0)]]، بس كل واحد مكتوب بطريقة: [[.a]] بالـ hex، و [[.b]] بـ [[rgb()]] الحديثة (مسافات)، و [[.c]] بـ [[hsl()]]. (من قسم ٣ و ٤ و ٥ في الشرح)`, done: R`التلاتة متطابقين، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .sq { display: inline-block; width: 60px; height: 60px; margin: 4px; }
  .a { }
  .b { }
  .c { }
</style>
<div class="sq a"></div><div class="sq b"></div><div class="sq c"></div>`, checks: [
              { say: R`[[.a]] برتقالي`, q: ".a", style: ["background-color", "rgb(255, 102, 0)"] },
              { say: R`[[.b]] برتقالي`, q: ".b", style: ["background-color", "rgb(255, 102, 0)"] },
              { say: R`[[.c]] برتقالي`, q: ".c", style: ["background-color", "rgb(255, 102, 0)"] },
              { say: R`فيه [[hsl(]] في الكود`, src: "hsl(" },
              { say: R`فيه [[rgb(]] في الكود`, src: "rgb(" }
            ] }, sol: R`~~~live 80 الحل
<style>
  .sq { display: inline-block; width: 60px; height: 60px; margin: 4px; }
  .a { background-color: #ff6600; }
  .b { background-color: rgb(255 102 0); }
  .c { background-color: hsl(24 100% 50%); }
</style>
<div class="sq a"></div><div class="sq b"></div><div class="sq c"></div>
~~~

**هتشوف إيه:** تلات مربعات برتقاني مستحيل تفرّق بينهم.

**ليه الأرقام دي:**
- hex: [[ff]] = 255، و [[66]] = 102، و [[00]] = 0.
- [[hsl(24 100% 50%)]]: الدرجة 24 بين الأحمر (0) والأصفر (60)، أقرب للأحمر. والتشبع كامل، والإضاءة 50٪ = اللون الصافي.

**الغلطة الشائعة:** [[hsl(24, 100, 50)]] بالفواصل ومن غير %: الشكل القديم (بالفواصل) لازم فيه %، فالسطر هيترمي. الشكل الحديث بالمسافات بيقبل من غير %.

~~~text القياس من Chrome
.a .b .c   background-color: rgb(255, 102, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** طبقة البرتقالي الشفاف فوق صورة الهيدر مش ظاهرة خالص، والصورة باينة صافية. صلّح اللون. (من قسم ٤ في الشرح)`, done: R`الطبقة البرتقالي النص شفافة ظاهرة، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .hero { height: 90px; background: linear-gradient(135deg, #0f766e, #a7f3d0); }
  .tint { height: 100%; background-color: rgb(255, 102, 0 / 0.5); color: white; display: grid; place-items: center; font-size: 20px; }
</style>
<div class="hero"><div class="tint">عرض نهاية الأسبوع</div></div>`, checks: [
              { say: R`الطبقة برتقالي بشفافية 50٪`, q: ".tint", style: ["background-color", "rgba(255, 102, 0, 0.5)"] }
            ] }, sol: R`~~~live 100 بعد التصليح
<style>
  .hero { height: 90px; background: linear-gradient(135deg, #0f766e, #a7f3d0); }
  .tint { height: 100%; background-color: rgb(255 102 0 / 0.5); color: white; display: grid; place-items: center; font-size: 20px; }
</style>
<div class="hero"><div class="tint">عرض نهاية الأسبوع</div></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 100 قبل
<style>
  .hero { height: 90px; background: linear-gradient(135deg, #0f766e, #a7f3d0); }
  .tint { height: 100%; background-color: rgb(255, 102, 0 / 0.5); color: white; display: grid; place-items: center; font-size: 20px; }
</style>
<div class="hero"><div class="tint">عرض نهاية الأسبوع</div></div>
~~~

**هتشوف إيه:** قبل: تدرّج أخضر صافي والكلام الأبيض فوقه. بعد: نفس التدرّج عليه غلالة برتقالي، فبقى بني محمر ناحية الغامق وخوخي ناحية الفاتح.

**ليه:** القيمة خلطت الشكلين: فواصل (القديم) و [[/]] (الحديث). المتصفح رمى السطر، فالخلفية رجعت شفافة. الحل: مسافات و [[/]]، أو [[rgba(255, 102, 0, 0.5)]] بالفواصل كلها.

**الغلطة الشائعة:** تغيّر الرقم [[0.5]] لـ [[50%]] على أمل يشتغل. المشكلة مش في الرقم، في الخلط.

~~~text القياس من Chrome
قبل   background-color: rgba(0, 0, 0, 0)
بعد   background-color: rgba(255, 102, 0, 0.5)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شريط «توصيل مجاني» فوق صورة المفروض خلفيته سودا نص شفافة عشان الصورة تبان من وراه، بس الكلام الأبيض والزرار الأصفر جواه طالعين باهتين. خلّي الشفافية في الخلفية بس، والكلام والزرار صافيين. (من قسم ١١ في الشرح)`, done: R`الخلفية سودا شفافة والكلام أبيض صافي، وكل الشروط ✓.`, work: { h: 130, start: R`<style>
  .photo { padding: 20px; background: linear-gradient(135deg, #fbbf24, #b45309); }
  .strip { padding: 12px; background: black; opacity: 0.6; color: white; }
  .strip button { background: #facc15; border: 0; padding: 4px 10px; }
</style>
<div class="photo"><div class="strip">توصيل مجاني النهارده <button>اطلب</button></div></div>`, checks: [
              { say: R`الشريط مش شفاف كله ([[opacity]] = 1)`, q: ".strip", style: ["opacity", "1"] },
              { say: R`خلفيته أسود بشفافية 0.6`, q: ".strip", style: ["background-color", "rgba(0, 0, 0, 0.6)"] },
              { say: R`الكلام لسه أبيض`, q: ".strip", style: ["color", "rgb(255, 255, 255)"] }
            ] }, sol: R`~~~live 100 بعد التصليح
<style>
  .photo { padding: 20px; background: linear-gradient(135deg, #fbbf24, #b45309); }
  .strip { padding: 12px; background: rgb(0 0 0 / 0.6); color: white; }
  .strip button { background: #facc15; border: 0; padding: 4px 10px; }
</style>
<div class="photo"><div class="strip">توصيل مجاني النهارده <button>اطلب</button></div></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 100 قبل
<style>
  .photo { padding: 20px; background: linear-gradient(135deg, #fbbf24, #b45309); }
  .strip { padding: 12px; background: black; opacity: 0.6; color: white; }
  .strip button { background: #facc15; border: 0; padding: 4px 10px; }
</style>
<div class="photo"><div class="strip">توصيل مجاني النهارده <button>اطلب</button></div></div>
~~~

**هتشوف إيه:** قبل: الكلام رمادي باهت والزرار أصفر مطفي. بعد: الشريط بنفس الغمقان، والتدرّج باين من وراه، بس الكلام أبيض ناصع والزرار أصفر صافي.

**ليه:** [[opacity]] بتطبّق على العنصر **وكل اللي جواه** كطبقة واحدة. الشفافية في اللون نفسه ([[/ 0.6]]) بتأثر على الخلفية بس.

**الغلطة الشائعة:** تزوّد [[opacity: 1]] على الكلام والزرار. مبيلغيش شفافية الأب (المحسوب 1 والشكل لسه باهت).

~~~text القياس من Chrome
قبل   .strip opacity: 0.6     background-color: rgb(0, 0, 0)
بعد   .strip opacity: 1       background-color: rgba(0, 0, 0, 0.6)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** زرار «اطلب» لونه [[hsl(24 100% 50%)]]. الزرار اللي عليه [[.pressed]] لازم يبقى نفس اللون **أغمق**: غيّر الإضاءة بس لـ 40٪ وسيب الدرجة والتشبع. (من قسم ٥ في الشرح)`, done: R`الزرار التاني نفس البرتقالي أغمق، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .btn { padding: 10px 18px; border: 0; border-radius: 8px; color: white; font: inherit; background: hsl(24 100% 50%); }
  .btn.pressed { }
</style>
<button class="btn">اطلب</button>
<button class="btn pressed">اطلب (متداس)</button>`, checks: [
              { say: R`الزرار العادي لسه [[rgb(255, 102, 0)]]`, q: ".btn:not(.pressed)", style: ["background-color", "rgb(255, 102, 0)"] },
              { say: R`المتداس [[hsl(24 100% 40%)]]`, q: ".btn.pressed", style: ["background-color", "rgb(204, 82, 0)"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .btn { padding: 10px 18px; border: 0; border-radius: 8px; color: white; font: inherit; background: hsl(24 100% 50%); }
  .btn.pressed { background: hsl(24 100% 40%); }
</style>
<button class="btn">اطلب</button>
<button class="btn pressed">اطلب (متداس)</button>
~~~

**هتشوف إيه:** زرارين برتقاني، والتاني أغمق بوضوح وقريب من البني المحروق.

**ليه كده:** في [[hsl]] الإضاءة رقم لوحده، فـ «أغمق» = L أقل، من غير ما تحسب تلات أرقام rgb من جديد. المتصفح حسبها [[rgb(204, 82, 0)]].

**الغلطة الشائعة:** تغيّر التشبع ([[100%]] لـ [[70%]]): اللون هيبهت ويميل للرمادي، مش هيغمق.

**كمّلها:** في درس «color-mix و currentColor» هتعمل نفس الحاجة من غير ما تكتب اللون مرتين: [[color-mix(in oklch, var(--brand), black 20%)]].

~~~text القياس من Chrome
.btn            background-color: rgb(255, 102, 0)
.btn.pressed    background-color: rgb(204, 82, 0)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** تلات شارات أقسام المنيو (قهوة، وشاي، وحلويات) بخلفيات [[oklch]] بنفس الإضاءة [[0.85]] ونفس القوة [[0.1]]، والدرجات [[60]] و [[145]] و [[350]]، والكلام أسود. اكتب كل لون بالشكل ده بالظبط: [[oklch(0.85 0.1 60)]]. (من قسم ٨ في الشرح)`, done: R`تلات شارات فاتحة بنفس الإضاءة والكلام مقروء على التلاتة، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .tag { display: inline-block; padding: 6px 14px; border-radius: 999px; color: black; background: #e7e5e4; }
</style>
<span class="tag coffee">قهوة</span>
<span class="tag tea">شاي</span>
<span class="tag sweet">حلويات</span>`, checks: [
              { say: R`قهوة: [[oklch(0.85 0.1 60)]]`, q: ".coffee", style: ["background-color", "oklch(0.85 0.1 60)"] },
              { say: R`شاي: [[oklch(0.85 0.1 145)]]`, q: ".tea", style: ["background-color", "oklch(0.85 0.1 145)"] },
              { say: R`حلويات: [[oklch(0.85 0.1 350)]]`, q: ".sweet", style: ["background-color", "oklch(0.85 0.1 350)"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .tag { display: inline-block; padding: 6px 14px; border-radius: 999px; color: black; background: #e7e5e4; }
  .coffee { background: oklch(0.85 0.1 60); }
  .tea { background: oklch(0.85 0.1 145); }
  .sweet { background: oklch(0.85 0.1 350); }
</style>
<span class="tag coffee">قهوة</span>
<span class="tag tea">شاي</span>
<span class="tag sweet">حلويات</span>
~~~

**هتشوف إيه:** تلات كبسولات: خوخي فاتح، وأخضر فاتح، وبمبي فاتح، وشكلهم «من نفس العيلة» بنفس الفتاحة، والكلام الأسود مقروء على التلاتة بنفس الدرجة.

**ليه كده:** في [[oklch]] الـ L قريبة من الإضاءة اللي العين شايفاها، فلما ثبّتنا L و C وغيّرنا H بس، الألوان طلعت متوازنة. لو عملتها بـ [[hsl(H 70% 80%)]] الأخضر كان هيطلع أفتح بوضوح من البمبي.

**الغلطة الشائعة:** تكتب [[oklch(85% 0.1 60)]]: هيرسم نفس اللون والمحسوب نفس الرقم ([[0.85]])، فده **صح** برضه. الغلط الحقيقي: [[oklch(0.85 10 60)]]: الـ C هنا مش نسبة، و 10 أكبر بكتير من أي شاشة تعرضه.

~~~text القياس من Chrome
.coffee   background-color: oklch(0.85 0.1 60)
.tea      background-color: oklch(0.85 0.1 145)
.sweet    background-color: oklch(0.85 0.1 350)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** زرار «إلغاء» عليه [[opacity: 0]] عشان «يختفي» لحد ما المستخدم يختار حاجة. لو المستخدم داس على مكانه وهو مش باين، هيحصل إيه؟ وقارئ الشاشة هيقول عليه؟ اكتب إجابتك، وبعدين افتح الحل. (من قسم ١١ في الشرح)`, done: R`كتبت إن الزرار بيتداس وهو مش باين، وإن قارئ الشاشة لسه شايفه، وعرفت البديل.`, sol: R`~~~live 90 الصفحة
<style>
  button { padding: 8px 16px; font: inherit; }
  .ghost { opacity: 0; }
</style>
<p>الزرار التاني مش باين، بس دوس مكانه:</p>
<button>تأكيد</button> <button class="ghost" onclick="this.style.opacity = 1; this.textContent = 'اتداست!'">إلغاء</button>
~~~

**الإجابة:** الزرار **بيتداس** عادي، وبيشتغل. وقارئ الشاشة بيقول «إلغاء، زرار» عادي، و Tab بيوصله.

**هتشوف إيه:** زرار «تأكيد» لوحده. دوس في المسافة اللي جنبه: زرار تاني بيظهر مكتوب عليه «اتداست!».

**السبب:** [[opacity]] بتغيّر **الرسم** بس. العنصر لسه موجود في مكانه، وبياخد مساحة، وبيستقبل الضغط والـ focus، وموجود في شجرة الـ accessibility.

**البديل الصح:** [[hidden]] أو [[display: none]] (مش موجود خالص)، أو [[visibility: hidden]] (بياخد مكان بس مبيتداسش ومحدش بيشوفه)، أو [[disabled]] لو عايزه يبان بس ميشتغلش.

~~~text القياس من Chrome
opacity: 0           → elementFromPoint في مكانه = الزرار نفسه
visibility: hidden   → elementFromPoint في مكانه = اللي تحته (body)
~~~` }
          ]
        },
        {
          cmd: "color-mix و currentColor",
          title: "ألوان بتتحسب من ألوان: currentColor و color-mix والألوان النسبية، و color-scheme و accent-color و caret-color، ومساحة ألوان الشاشة",
          pre: ["css/rgb و hsl و oklch"],
          ref: [
            { t: "MDN: currentColor", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value#currentcolor_keyword" },
            { t: "MDN: color-mix()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix" },
            { t: "MDN: Using relative colors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_relative_colors" },
            { t: "MDN: alpha()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/alpha" },
            { t: "MDN: color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme" },
            { t: "MDN: light-dark()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark" },
            { t: "MDN: accent-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/accent-color" },
            { t: "MDN: caret-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/caret-color" },
            { t: "MDN: caret-animation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/caret-animation" },
            { t: "MDN: color-gamut", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/color-gamut" },
            { t: "CSS Color Level 5", url: "https://www.w3.org/TR/css-color-5/" }
          ],
          desc: R`[[currentColor]] معناها «لون الكلام بتاع العنصر ده»، و [[color-mix()]] بتخلط لونين بنسبة، و «الألوان النسبية» ([[oklch(from ... l c h)]]) بتاخد لون وتغيّر جزء منه. التلاتة بيخلّوك تكتب لون البراند مرة واحدة وتطلّع منه الباقي.
وفي الدرس كمان: [[color-scheme]] (الصفحة فاتحة ولا غامقة، عشان المتصفح يلوّن الحقول والسكرول)، و [[accent-color]] (لون الـ checkbox وإخواته)، و [[caret-color]] (لون مؤشر الكتابة)، والفرق بين ألوان sRGB وألوان الشاشات الواسعة.`,
          example: R`.icon-btn svg { fill: currentColor; }
.tint { background: color-mix(in oklch, #b45309, white 80%); }
.shade { background: color-mix(in oklch, #b45309, black 30%); }
.light { background: oklch(from #b45309 calc(l + 0.15) c h); }
.glass { background: rgb(from #b45309 r g b / 20%); }
:root { color-scheme: light dark; }
form { accent-color: #b45309; }
textarea { caret-color: #b45309; }`,
          flag: "script",
          lines: [
            R`الأيقونة بتتلوّن بلون كلام الزرار، فلو غيّرت [[color]] على الزرار، الأيقونة بتتغيّر معاه.`,
            R`خلط البني مع 80٪ أبيض: درجة فاتحة جدًا من نفس اللون. [[in oklch]] = الخلط بيتحسب في oklch.`,
            R`خلط البني مع 30٪ أسود: درجة أغمق.`,
            R`خد البني، وزوّد إضاءته ([[l]]) 0.15، وسيب قوته ([[c]]) ودرجته ([[h]]) زي ما هم.`,
            R`نفس البني بالظبط بشفافية 20٪: [[r g b]] معناها «زي ما هم».`,
            R`الصفحة بتدعم الفاتح والغامق: المتصفح يلوّن الحقول والسكرول والخلفية حسب إعداد الجهاز.`,
            R`كل الـ checkbox والـ radio والـ range جوه الفورم بقوا بني بدل الأزرق الافتراضي.`,
            R`المؤشر اللي بيرمش وانت بتكتب بقى بني.`
          ],
          teach: R`## الفكرة في سطرين

في الدرس اللي فات كل لون كان رقم مكتوب بالإيد. هنا الألوان **بتتحسب**: من لون الكلام، أو من خلط لونين، أو من لون تاني بتعديل. ده أساس أي «ثيم»: لون أو اتنين أساسيين، وكل الدرجات منهم. (المتغيرات [[var(--brand)]] اللي بتشيل اللون الأساسي ليها درس لوحدها: «CSS variables». هنا هنكتب اللون نفسه.)

---

## ١. [[currentColor]]

درس «font-family و font-size» قال إنها «قيمة [[color]] بتاعة العنصر»، وإنها الافتراضي لـ [[border-color]] و [[outline-color]] و [[text-decoration-color]] و [[box-shadow]] و [[caret-color]]. أهم استخدام ليها بعد كده: **أيقونات SVG**.

~~~live 70 أيقونة بتاخد لون الزرار
<style>
  .ib { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; margin: 4px; border: 2px solid; border-radius: 8px; background: none; font: inherit; }
  .ib svg { width: 20px; height: 20px; fill: currentColor; }
  .ib:hover { color: #dc2626; }
</style>
<button class="ib" style="color: #b45309"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9z"/></svg>المفضلة</button>
<button class="ib" style="color: #0f766e"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9z"/></svg>المفضلة</button>
~~~

**هتشوف إيه:** زرارين نفس الكود، واحد بني وواحد أخضر: الكلام والحد والقلب كلهم بنفس اللون. عدّي بالماوس على أي واحد: التلاتة بيحمرّوا مع بعض.

~~~text القياس من Chrome
div { color: #0f766e; background-color: currentColor; border: 2px solid; }
  → background-color و border-top-color: rgb(15, 118, 110)
svg جواه { fill: currentColor }   →  fill: rgb(15, 118, 110)
~~~

### بتتحسب فين؟

[[currentColor]] بتتحسب على **العنصر اللي بيستخدمها**، حتى لو جاتله بالوراثة:

~~~text القياس من Chrome
أب:  color: red;   border-color: currentColor
ابن: color: blue;  border: 2px solid;  border-color: inherit
  → حد الابن rgb(0, 0, 255) أزرق، مش أحمر   ← ورث الكلمة currentColor، واتحسبت بلونه هو
~~~

---

## ٢. [[transparent]]

[[transparent]] = [[rgba(0, 0, 0, 0)]]. أشهر استخدامين:

- **حد محجوز:** [[border: 2px solid transparent]] على كل العناصر، وتغيّر اللون بس في الحالة المختارة. الصفحة متتهزش (درس «outline و box-shadow»، تمرين التابات).
- **تدرّج لحد الشفاف:** [[linear-gradient(black, transparent)]] فوق صورة (درس التدرّجات قسم ٧).

---

## ٣. [[color-mix(in oklch, #b45309, white 80%)]]

~~~text تشريح القيمة
color-mix(  in oklch,      #b45309,      white 80%  )
            └ بيخلط فين    └ اللون الأول  └ التاني ونسبته (الأول خد الباقي: 20%)
~~~

| الجزء | القواعد |
|---|---|
| [[in oklch]] | مساحة الألوان اللي الخلط بيتحسب فيها: [[srgb]] و [[oklab]] و [[oklch]] و [[hsl]] و [[lab]] و [[display-p3]]... ولو شيلتها ([[color-mix(red, blue)]]) الافتراضي [[oklab]] (اتقاس، ومن المواصفة الجديدة) |
| النسب | واحدة بس = التانية الباقي من 100. من غير نسب = 50/50 |
| مجموع أقل من 100 | الباقي بيبقى **شفافية**: [[red 30%, blue 30%]] = بنفسجي بشفافية 60٪ |
| مع [[transparent]] | طريقة سهلة لشفافية: [[color-mix(in srgb, #b45309 40%, transparent)]] |

~~~text القياس من Chrome (المحسوب)
color-mix(in srgb, red, blue)               →  color(srgb 0.5 0 0.5)            ← النتيجة بمساحة الخلط
color-mix(in oklch, red, blue)              →  oklch(0.539974 0.285457 326.643)
color-mix(in oklch, #b45309, white 80%)     →  oklch(0.911053 0.029145 48.9931)
color-mix(in oklch, #b45309, black 30%)     →  oklch(0.388702 0.101868 48.9931)
color-mix(in srgb, red 30%, blue 30%)       →  color(srgb 0.5 0 0.5 / 0.6)
color-mix(red, blue)                        →  oklab(0.539974 0.0962086 -0.0928316)
~~~

لاحظ إن خلط البني مع أبيض أو أسود في [[oklch]] حافظ على الدرجة ([[48.9931]]) زي ما هي: اللون فضل «بني» وبس اتفتح أو اتغمق.

### المساحة بتفرق

~~~live 90 أحمر + أزرق بالنص
<style>
  .mx { display: inline-block; width: 30%; margin: 2px; padding: 16px 0; text-align: center; color: white; font: 12px monospace; }
</style>
<span class="mx" style="background: color-mix(in srgb, red, blue)">srgb</span><span class="mx" style="background: color-mix(in oklab, red, blue)">oklab</span><span class="mx" style="background: color-mix(in oklch, red, blue)">oklch</span>
~~~

**هتشوف إيه** (من اليمين): [[srgb]] بنفسجي غامق باهت، و [[oklab]] بنفسجي أفتح شوية، و [[oklch]] بمبي فاقع (لأنها بتلف على عجلة الألوان من الأحمر للأزرق فبتعدّي على البمبي، مش بتقطع من النص).

### سلّم درجات من لون واحد

~~~live 80 لون البراند وخمس درجات منه
<style>
  .sw { display: inline-block; width: 15%; margin: 1px; padding: 18px 0; text-align: center; font: 11px monospace; }
</style>
<span class="sw" style="background: color-mix(in oklch, #b45309, white 85%)">+85%w</span><span class="sw" style="background: color-mix(in oklch, #b45309, white 60%)">+60%w</span><span class="sw" style="background: color-mix(in oklch, #b45309, white 30%)">+30%w</span><span class="sw" style="background: #b45309; color: white">brand</span><span class="sw" style="background: color-mix(in oklch, #b45309, black 25%); color: white">+25%k</span><span class="sw" style="background: color-mix(in oklch, #b45309, black 50%); color: white">+50%k</span>
~~~

**هتشوف إيه** (من اليمين): كريمي فاتح جدًا، وخوخي، وبرتقاني فاتح، والبني الأصلي، وبني أغمق، وبني قريب للأسود. كلهم «من نفس العيلة».

ده اللي هتعمله في مشروع الوحدة: لون واحد مكتوب، وكل الخلفيات الفاتحة والكلام الغامق والـ hover منه. ولو غيّرت اللون الأساسي، كل الدرجات بتتغيّر لوحدها.

---

## ٤. الألوان النسبية: [[oklch(from #b45309 calc(l + 0.15) c h)]]

بدل ما تخلط لونين، خد لون **وفكّه** لأجزائه، وغيّر الجزء اللي عايزه:

~~~text تشريح القيمة
oklch(  from #b45309     calc(l + 0.15)     c        h  )
        └ اللون الأصلي   └ L: زوّد 0.15      └ C زي ما هو └ H زي ما هو
~~~

جوه القيمة، أسامي الأجزاء بقت أرقام: في [[oklch]]: [[l]] و [[c]] و [[h]]. في [[rgb]]: [[r]] و [[g]] و [[b]]. في [[hsl]]: [[h]] و [[s]] و [[l]]. وفي الكل: [[alpha]].

~~~text القياس من Chrome
oklch(from #b45309 l c h)                →  oklch(0.555288 0.145526 48.9931)   ← البني نفسه بأرقام oklch
oklch(from #b45309 calc(l + 0.2) c h)    →  oklch(0.755288 0.145526 48.9931)   ← أفتح
oklch(from #b45309 l c calc(h + 180))    →  oklch(0.555288 0.145526 228.993)   ← اللون المكمّل (الناحية التانية من العجلة)
oklch(from #b45309 l 0 h)                →  oklch(0.555288 0 48.9931)          ← رمادي بنفس الإضاءة
rgb(from #b45309 r g b / 50%)            →  color(srgb 0.705882 0.32549 0.0352941 / 0.5)   ← نفس اللون بشفافية
hsl(from #b45309 h s calc(l - 10))       →  color(srgb 0.515406 0.237659 0.0257703)       ← أغمق 10 في hsl
~~~

~~~live 80 أربعة من لون واحد
<style>
  .rl { display: inline-block; width: 23%; margin: 1px; padding: 18px 0; text-align: center; font: 11px monospace; color: white; }
</style>
<span class="rl" style="background: #b45309">#b45309</span><span class="rl" style="background: oklch(from #b45309 calc(l + 0.2) c h); color: black">l + 0.2</span><span class="rl" style="background: oklch(from #b45309 l c calc(h + 180))">h + 180</span><span class="rl" style="background: oklch(from #b45309 l 0 h)">c = 0</span>
~~~

**هتشوف إيه** (من اليمين): البني، ونسخة أفتح منه (برتقاني فاتح)، ولون أزرق مخضر (عكسه على العجلة)، ورمادي بنفس غمقانه.

### [[color-mix()]] ولا اللون النسبي؟

- **[[color-mix()]]** لما الفكرة «أفتح بنسبة» أو «اخلط مع لون تاني».
- **النسبي** لما عايز تتحكم في جزء بالظبط: شفافية معينة، أو إضاءة رقم معين، أو اللون المكمّل.

### [[alpha(from #b45309 / 40%)]]

دالة جديدة (Baseline 2026، من MDN) بتغيّر الشفافية بس، من غير ما تكتب [[r g b]] أو [[l c h]]:

~~~text القياس من Chrome
alpha(from #b45309 / 40%)    →  color(srgb 0.705882 0.32549 0.0352941 / 0.4)
~~~

جديدة، فلو هتستخدمها اكتب قبلها سطر بالطريقة النسبية أو [[color-mix]] للمتصفحات القديمة.

### [[contrast-color()]]: لسه بدري

Chrome 157 بيقبل [[contrast-color(#b45309)]] وبيرجّع أبيض أو أسود (اللي تباينه أعلى): [[rgb(255, 255, 255)]] للبني و [[rgb(0, 0, 0)]] للأصفر الفاتح. مش في المنهج كـ Baseline لسه، فاعرفها بس.

---

## ٥. [[color-scheme: light dark]]

الخاصية دي **مبتلوّنش حاجة بإيدك**. بتقول للمتصفح «الحتة دي معمولة لثيم فاتح أو غامق»، فهو يلوّن الحاجات اللي **هو** راسمها: الحقول، والأزرار الافتراضية، والسكرول، ولون الخلفية والكلام الافتراضي للصفحة.

~~~live 150 نفس الفورم بقيمتين
<style>
  .sc { display: inline-block; width: 45%; margin: 2px; padding: 10px; vertical-align: top; box-sizing: border-box; }
  .sc input, .sc select { display: block; margin: 6px 0; width: 90%; }
</style>
<div class="sc" style="color-scheme: light; background: #fff; color: #111">light
  <input value="اسمك"><select><option>قهوة</option></select><label><input type="checkbox" checked style="display: inline; width: auto"> موافق</label>
</div>
<div class="sc" style="color-scheme: dark; background: #1c1917; color: #eee">dark
  <input value="اسمك"><select><option>قهوة</option></select><label><input type="checkbox" checked style="display: inline; width: auto"> موافق</label>
</div>
~~~

**هتشوف إيه:** على اليمين حقول بيضا عادية. على الشمال نفس الحقول **غامقة** وكلامها أبيض، والـ checkbox بألوان غامقة، من غير ولا سطر CSS على الحقول نفسها.

| القيمة | معناها |
|---|---|
| [[normal]] | الافتراضي (اتقاس على [[<html>]]): ثيم المتصفح العادي (فاتح) |
| [[light]] أو [[dark]] | الحتة دي فاتحة بس أو غامقة بس |
| [[light dark]] | بتدعم الاتنين، والمتصفح يختار حسب إعداد الجهاز ([[prefers-color-scheme]]) |
| [[only light]] | متقلبش غامق حتى لو المتصفح عايز يغمّق الصفحة بنفسه (المحسوب [[light only]]) |

**فخ اتقاس:** [[color-scheme: dark]] على [[div]] جوه الصفحة **مغيّرش لون كلامه**: المحسوب لسه [[rgb(0, 0, 0)]] (الكلام بيورث [[color]] من الأب). لون الكلام والخلفية الافتراضيين بيتغيّروا بس لما [[color-scheme]] تبقى على [[:root]]. فعلى أي حتة تانية اكتب [[color]] و [[background]] بإيدك.

وفيه نسخة HTML: [[<meta name="color-scheme" content="light dark">]] في الـ head، بتوصل للمتصفح قبل ما الـ CSS يتحمّل فمفيش «وميض أبيض».

### [[light-dark(#111, #eee)]]

دالة بترجع اللون الأول لو الـ color-scheme المستخدم فاتح، والتاني لو غامق. **شغالة بس لو [[color-scheme]] فيها [[dark]]**.

~~~text القياس من Chrome
color-scheme: light  →  color: light-dark(#111, #eee)  →  rgb(17, 17, 17)
color-scheme: dark   →  color: light-dark(#111, #eee)  →  rgb(238, 238, 238)
~~~

الثيم الغامق كله (المتغيرات، و [[prefers-color-scheme]]، وزرار التبديل) في درس «dark mode».

---

## ٦. [[accent-color: #b45309]]

لون «التمييز» في عناصر الفورم اللي المتصفح بيرسمها: [[checkbox]] و [[radio]] و [[range]] و [[<progress>]].

~~~live 90 الافتراضي و accent-color
<style>
  .ac { display: inline-block; width: 45%; vertical-align: top; }
  .ac progress, .ac input[type=range] { width: 80%; }
</style>
<div class="ac"><input type="checkbox" checked> <input type="radio" checked> <input type="range"> <progress value="60" max="100"></progress></div>
<div class="ac" style="accent-color: #b45309"><input type="checkbox" checked> <input type="radio" checked> <input type="range"> <progress value="60" max="100"></progress></div>
~~~

**هتشوف إيه:** على اليمين الأزرق الافتراضي في الأربعة. على الشمال نفس العناصر بني.

~~~text القياس من Chrome
الافتراضي              →  accent-color: auto
accent-color: #b45309  →  rgb(180, 83, 9)     ← بتتورّث، فسطر على form أو body كفاية
~~~

المتصفح ممكن يغيّر درجة اللون شوية عشان علامة ✓ تفضل باينة (من المواصفة). والمنهج حاطط [[accent-color]] مش Baseline (فيه متصفح مبيطبّقهاش على كل العناصر)، بس مفيش ضرر: المتصفح اللي مبيدعمهاش بيعرض الأزرق العادي. ولتحكم كامل في الشكل: [[appearance: none]] وترسم العنصر بنفسك (درس عن تنسيق الفورم).

---

## ٧. [[caret-color]] و [[caret-animation]]

[[caret-color]]: لون مؤشر الكتابة اللي بيرمش في [[input]] و [[textarea]] و [[contenteditable]]. الافتراضي [[auto]]، وده عمليًا لون الكلام (المحسوب [[rgb(0, 0, 0)]] على كلام أسود).

~~~live 70 مؤشر أحمر
<style>
  .cc { font-size: 18px; padding: 6px; caret-color: #dc2626; width: 80%; }
</style>
<input class="cc" value="دوس هنا واكتب">
~~~

**هتشوف إيه:** دوس جوه الخانة: الخط اللي بيرمش أحمر، والكلام نفسه أسود.

| الخاصية | القيم | الحالة (اتقاس في Chrome 157) |
|---|---|---|
| [[caret-color]] | [[auto]] أو أي لون | Baseline |
| [[caret-animation]] | [[auto]] (بيرمش) أو [[manual]] (مبيرمشش، عشان تعمل حركتك بنفسك بـ [[@keyframes]]) | مقبولة في Chrome، و MDN كاتبها تجريبية |
| [[caret-shape]] | [[bar]] و [[block]] و [[underscore]] | مقبولة في Chrome، مش Baseline |
| [[caret]] | المختصرة للتلاتة | مرفوضة في Chrome 157 ([[CSS.supports]] رجّع false) |

---

## ٨. مساحة ألوان الشاشة (gamut): sRGB و Display P3

**الـ gamut** = كل الألوان اللي شاشة (أو مساحة ألوان) تقدر تعرضها. الويب اتبنى على [[sRGB]]: كل hex و [[rgb()]] و [[hsl()]] جوه sRGB. الشاشات الحديثة (أغلب الموبايلات، وشاشات اللابتوب الجديدة) بتعرض [[display-p3]]: نفس الألوان وزيادة حوالي 25٪، أغلبها أحمر وأخضر أزهى.

| | sRGB | Display P3 |
|---|---|---|
| تكتبها إزاي | hex و [[rgb()]] و [[hsl()]] | [[color(display-p3 ...)]]، أو [[oklch()]] بـ C عالي |
| الشاشات | كل الشاشات | أغلب الأجهزة الجديدة |
| أزهى أحمر | [[#ff0000]] | [[color(display-p3 1 0 0)]] |

**بيحصل إيه للون برّه الشاشة؟** المتصفح بيعمل «gamut mapping»: بيجيب أقرب لون الشاشة تقدر تعرضه. فـ [[color(display-p3 1 0 0)]] على شاشة sRGB بيبان أحمر عادي. (من المواصفة و MDN. الـ headless مالوش شاشة حقيقية، فمش هتشوف الفرق هنا، وعلى شاشتك الفرق بيبان بس لو هي P3.)

**بتسأل الشاشة إزاي:**

~~~text القياس من Chrome headless
matchMedia("(color-gamut: srgb)")  →  true
matchMedia("(color-gamut: p3)")    →  false     ← على موبايل حديث هتبقى true
~~~

**الطريقة الآمنة:** اكتب لون sRGB الأول، وبعده اللون الواسع، في نفس القاعدة. المتصفح القديم بيتجاهل السطر التاني (مبيفهموش)، والحديث بياخده ويعمل له mapping لو الشاشة مبتعرضوش:

~~~css
.sale { background: #ff3b30; background: color(display-p3 1 0.2 0.15); }
@media (color-gamut: p3) { .hero { background: oklch(0.65 0.3 30); } }
~~~

والعكس مهم: متعتمدش على إن الفرق بين لونين يبان لو واحد منهم برّه sRGB. على شاشة عادية ممكن الاتنين يطلعوا نفس اللون.

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| أيقونة SVG فيها [[fill="#000"]] جوه الملف | [[currentColor]] على الـ CSS مبيوصلش. شيل الـ fill من الـ SVG أو خليه [[currentColor]] |
| درجات البراند بـ [[in srgb]] | الدرجات بتبهت أو تميل للرمادي. استخدم [[in oklch]] أو [[in oklab]] |
| [[color-mix(#b45309, white 80%)]] وانت فاكرها 80٪ بني | النسبة للون اللي جنبها: ده 80٪ أبيض |
| [[color-scheme: dark]] على div والكلام لسه أسود | بتغيّر الحقول بس. اكتب [[color]] بإيدك |
| [[light-dark()]] من غير [[color-scheme]] | دايمًا اللون الأول |
| [[accent-color]] على أمل تغيّر شكل الـ checkbox | اللون بس. الشكل محتاج [[appearance: none]] |
| لون P3 لوحده من غير بديل | المتصفحات القديمة بترمي السطر |
| [[caret: red manual]] | مرفوضة في Chrome 157. اكتب الخاصيتين |

---

## الخلاصة

- [[currentColor]] = [[color]] بتاع العنصر، وبتتحسب عنده. خلي أيقونات SVG [[fill: currentColor]].
- [[color-mix(in oklch, A, B 30%)]] خلط بنسبة. مع أبيض = أفتح، مع أسود = أغمق، مع [[transparent]] = شفافية.
- [[oklch(from X calc(l + 0.1) c h)]] غيّر جزء واحد من لون. و [[alpha()]] للشفافية بس.
- [[color-scheme]] على [[:root]] بتلوّن حاجات المتصفح، و [[light-dark()]] محتاجاها.
- [[accent-color]] للـ checkbox والـ radio والـ range والـ progress، و [[caret-color]] للمؤشر.
- sRGB هو الأساس، و P3 أوسع: بديل sRGB الأول، والواسع بعده.`,
          try: R`اكتب لون براند واحد ([[#0f766e]] مثلًا)، وطلّع منه بـ [[color-mix(in oklch, ...)]] أربع درجات (خلفية فاتحة، وحد، و hover غامق، وكلام غامق جدًا)، وزرار بأيقونة SVG [[fill: currentColor]]. وبعدين غيّر اللون الأساسي لـ [[#b45309]] في كل الأماكن وشوف كل الدرجات اتغيّرت.`,
          sol: R`~~~live 190 brand.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لون واحد</title>
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
  .box { padding: 16px; border-radius: 12px;
         background: color-mix(in oklch, #0f766e, white 88%);
         border: 1px solid color-mix(in oklch, #0f766e, white 50%);
         color: color-mix(in oklch, #0f766e, black 55%); }
  .btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; padding: 8px 14px; border: 0; border-radius: 8px; font: inherit;
         background: #0f766e; color: white; }
  .btn.hover { background: color-mix(in oklch, #0f766e, black 25%); }
  .btn svg { width: 18px; height: 18px; fill: currentColor; }
</style>
</head>
<body>
<div class="box">
  <b>اشترك في النشرة</b>
  <p>عروض قهوة الأسبوع كل يوم خميس.</p>
  <button class="btn"><svg viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 5l9 8 9-8"/></svg>اشترك</button>
  <button class="btn hover"><svg viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 5l9 8 9-8"/></svg>شكل الـ hover</button>
</div>
</body>
</html>
~~~

**هتشوف إيه:** صندوق أخضر فاتح جدًا بحد أخضر متوسط وكلام أخضر غامق جدًا، وزرارين: واحد أخضر وواحد أغمق، وفي كل زرار أيقونة جواب بيضا بنفس لون الكلام.

**لما تغيّر [[#0f766e]] لـ [[#b45309]]:** الصندوق بقى كريمي، والحد خوخي، والكلام بني غامق، والأزرار بني. ولا رقم اتكتب بالإيد غير اللون الأساسي.

~~~text القياس من Chrome
.box          background-color: oklch(...)   ← نتيجة color-mix بتترجع oklch
.btn svg      fill: rgb(255, 255, 255)        ← من color بتاع الزرار
~~~

لاحظ إنك كتبت [[#0f766e]] خمس مرات. درس «CSS variables» بيخليها مرة واحدة: [[--brand: #0f766e]] و [[var(--brand)]] في كل مكان.`,
          deep: {
            why: R`أي موقع فيه لون براند بيحتاج منه عشر درجات: خلفيات فاتحة، وحدود، و hover، وكلام. كتابتهم بالإيد معناها إن تغيير اللون = عشر تعديلات، وغالبًا واحد بيتنسي. [[color-mix]] والألوان النسبية بيخلّوا اللون مصدر واحد. و [[currentColor]] بتخلي الأيقونات والحدود تمشي مع الكلام من غير ما تكررها. و [[color-scheme]] و [[accent-color]] بيخلّوا حاجات المتصفح (الحقول والسكرول) تتماشى مع تصميمك من غير ما تعيد رسمها.`,
            how: R`[[currentColor]] بتتحفظ ككلمة وقت الوراثة، وبتتحسب لرقم على كل عنصر من [[color]] بتاعه. [[color-mix()]] بيحوّل اللونين لمساحة الخلط، ويضرب كل جزء في نسبته (مع الشفافية «premultiplied»)، ولو مجموع النسب أقل من 100 بيضرب الشفافية في المجموع. الألوان النسبية بتحوّل اللون الأصلي لمساحة الدالة، وتحط أجزاءه كأرقام بأسامي ([[l]] و [[c]] و [[h]]) تتحسب بـ [[calc()]]. [[color-scheme]] بتحدد «الثيم المستخدم» للعنصر، وده بيأثر على ألوان النظام (Canvas و CanvasText و ألوان الحقول) و [[light-dark()]]. وفي الرسم، أي لون برّه gamut الشاشة بيتقرّب لأقرب لون ممكن.`,
            when: R`[[currentColor]]: أيقونات، وحدود ماشية مع الكلام، وأزرار outline. [[color-mix]]: درجات البراند، و hover/active، وشفافية من لون موجود. النسبي: لون مكمّل، ونسخة رمادي، وتحكم دقيق في الإضاءة. [[color-scheme]]: أي صفحة فيها dark mode، أو حتة غامقة فيها فورم. [[accent-color]]: أي فورم. [[caret-color]]: محرر نصوص أو فورم ببراند قوي. P3: صور ومنتجات وألوان عروض محتاجة تبان زاهية على الموبايل.`,
            mistakes: R`SVG فيه fill ثابت. خلط في srgb. قراية النسبة غلط. [[color-scheme]] على div وتستنى الكلام يتغيّر. [[light-dark()]] من غير color-scheme. [[accent-color]] لتغيير الشكل. P3 من غير بديل. ومختصرة [[caret]] اللي لسه مش شغالة.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** زرار «المفضلة» فيه أيقونة قلب SVG. خلّي الأيقونة تاخد لون كلام الزرار، وخلّي لون الكلام [[#b45309]]. (من قسم ١ في الشرح)`, done: R`القلب والكلام بني، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .fav { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border: 2px solid; border-radius: 8px; background: none; font: inherit; }
  .fav svg { width: 20px; height: 20px; }
</style>
<button class="fav"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9z"/></svg>المفضلة</button>`, checks: [
              { say: R`كلام الزرار بني`, q: ".fav", style: ["color", "rgb(180, 83, 9)"] },
              { say: R`القلب بنفس لون الكلام`, q: ".fav svg", style: ["fill", "rgb(180, 83, 9)"] },
              { say: R`الحد بنفس اللون`, q: ".fav", style: ["border-top-color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 70 الحل
<style>
  .fav { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border: 2px solid; border-radius: 8px; background: none; font: inherit; color: #b45309; }
  .fav svg { width: 20px; height: 20px; fill: currentColor; }
</style>
<button class="fav"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9z"/></svg>المفضلة</button>
~~~

**هتشوف إيه:** زرار بحد بني، وقلب بني، و «المفضلة» بني.

**ليه كده:** سطر واحد ([[color]]) لوّن تلات حاجات: الكلام مباشرة، والحد لأن لونه الافتراضي [[currentColor]]، والقلب لأننا قلناله [[fill: currentColor]]. من غيرها الـ SVG بيترسم أسود (الـ fill الافتراضي).

**الغلطة الشائعة:** [[fill: #b45309]] على الـ SVG. هيشتغل، بس لو غيّرت لون الزرار بعدين (hover أو ثيم غامق) القلب هيفضل بني.

~~~text القياس من Chrome
.fav       color: rgb(180, 83, 9)    border-top-color: rgb(180, 83, 9)
.fav svg   fill: rgb(180, 83, 9)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** تلات مربعات درجات من البني [[#b45309]] بـ [[color-mix(in oklch, ...)]]: [[.t80]] البني مع أبيض 80٪، و [[.t50]] مع أبيض 50٪، و [[.s30]] مع أسود 30٪. (من قسم ٣ في الشرح: «سلّم درجات من لون واحد»)`, done: R`تلات درجات من نفس البني، وكل الشروط ✓.`, work: { h: 90, start: R`<style>
  .sq { display: inline-block; width: 70px; height: 50px; margin: 3px; }
  .base { background: #b45309; }
</style>
<div class="sq t80"></div><div class="sq t50"></div><div class="sq base"></div><div class="sq s30"></div>`, checks: [
              { say: R`[[.t80]] = بني + 80٪ أبيض`, q: ".t80", style: ["background-color", "oklch(0.911053 0.029145 48.9931)"] },
              { say: R`[[.t50]] = بني + 50٪ أبيض`, q: ".t50", style: ["background-color", "oklch(0.777641 0.0727879 48.9931)"] },
              { say: R`[[.s30]] = بني + 30٪ أسود`, q: ".s30", style: ["background-color", "oklch(0.388702 0.101868 48.9931)"] }
            ] }, sol: R`~~~live 80 الحل
<style>
  .sq { display: inline-block; width: 70px; height: 50px; margin: 3px; }
  .base { background: #b45309; }
  .t80 { background: color-mix(in oklch, #b45309, white 80%); }
  .t50 { background: color-mix(in oklch, #b45309, white 50%); }
  .s30 { background: color-mix(in oklch, #b45309, black 30%); }
</style>
<div class="sq t80"></div><div class="sq t50"></div><div class="sq base"></div><div class="sq s30"></div>
~~~

**هتشوف إيه** (من اليمين): كريمي فاتح، وخوخي، والبني الأصلي، وبني غامق.

**ليه كده:** النسبة مكتوبة جنب الأبيض أو الأسود، فده نصيبهم، والبني خد الباقي. والخلط في [[oklch]] حافظ على الدرجة ([[48.9931]] في التلاتة)، فمفيش درجة مالت للرمادي أو للبمبي.

**الغلطة الشائعة:** [[color-mix(in oklch, #b45309 80%, white)]]: كده البني هو اللي 80٪، فالمربع هيطلع بني فاتح شوية بس.

~~~text القياس من Chrome
.t80   oklch(0.911053 0.029145 48.9931)
.t50   oklch(0.777641 0.0727879 48.9931)
.s30   oklch(0.388702 0.101868 48.9931)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كارت الاشتراك غامق، بس الخانة والقايمة اللي جواه بيضا ومزعجة. خلّي المتصفح يرسم حقول الكارت ده بالثيم الغامق، من غير ما تكتب ألوان للحقول نفسها. (من قسم ٥ في الشرح)`, done: R`الحقول بقت غامقة، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .dark-card { padding: 14px; background: #1c1917; color: #f5f5f4; border-radius: 12px; }
  .dark-card input, .dark-card select { display: block; margin-top: 8px; }
</style>
<div class="dark-card">
  اشترك في عروض الأسبوع
  <input placeholder="إيميلك">
  <select><option>كل أسبوع</option><option>كل شهر</option></select>
</div>`, checks: [
              { say: R`الكارت معلن إنه غامق`, q: ".dark-card", style: ["color-scheme", "dark"] },
              { say: R`الخانة بقت غامقة`, q: ".dark-card input", style: ["background-color", "rgb(59, 59, 59)"] },
              { say: R`مفيش [[background]] مكتوب للحقول`, nosrc: "input { background" }
            ] }, sol: R`~~~live 130 بعد التصليح
<style>
  .dark-card { padding: 14px; background: #1c1917; color: #f5f5f4; border-radius: 12px; color-scheme: dark; }
  .dark-card input, .dark-card select { display: block; margin-top: 8px; }
</style>
<div class="dark-card">
  اشترك في عروض الأسبوع
  <input placeholder="إيميلك">
  <select><option>كل أسبوع</option><option>كل شهر</option></select>
</div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 130 قبل
<style>
  .dark-card { padding: 14px; background: #1c1917; color: #f5f5f4; border-radius: 12px; }
  .dark-card input, .dark-card select { display: block; margin-top: 8px; }
</style>
<div class="dark-card">
  اشترك في عروض الأسبوع
  <input placeholder="إيميلك">
  <select><option>كل أسبوع</option><option>كل شهر</option></select>
</div>
~~~

**هتشوف إيه:** قبل: كارت أسود فيه خانتين بيضا ساطعين. بعد: الخانتين رمادي غامق وكلامهم فاتح، ومتماشيين مع الكارت.

**ليه كده:** الحقول المتصفح هو اللي بيرسمها بألوانه. [[color-scheme: dark]] قالتله «الحتة دي غامقة»، فاستخدم ألوانه الغامقة للحقول (وللسكرول لو فيه). لون كلام الكارت نفسه كتبناه بإيدنا ([[color: #f5f5f4]])، لأن [[color-scheme]] على div مبتغيّرهوش (قسم ٥: «فخ اتقاس»).

**الغلطة الشائعة:** تكتب [[background: #333; color: white]] للحقول. هيشتغل للخانة، بس السهم بتاع القايمة والـ placeholder وقايمة الاختيارات اللي بتفتح هيفضلوا فاتحين.

~~~text القياس من Chrome
.dark-card input   قبل: background-color: rgb(255, 255, 255)    بعد: rgb(59, 59, 59)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم الطلب فيه checkbox و range. لوّنهم الاتنين بني [[#b45309]] بسطر **واحد** على الفورم. (من قسم ٦ في الشرح)`, done: R`الاتنين بني، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  form label { display: block; margin: 6px 0; }
</style>
<form>
  <label><input type="checkbox" checked> سكر زيادة</label>
  <label>درجة التحميص <input type="range"></label>
</form>`, checks: [
              { say: R`الـ checkbox بني`, q: "input[type=checkbox]", style: ["accent-color", "rgb(180, 83, 9)"] },
              { say: R`الـ range بني`, q: "input[type=range]", style: ["accent-color", "rgb(180, 83, 9)"] },
              { say: R`السطر على الفورم`, q: "form", style: ["accent-color", "rgb(180, 83, 9)"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  form { accent-color: #b45309; }
  form label { display: block; margin: 6px 0; }
</style>
<form>
  <label><input type="checkbox" checked> سكر زيادة</label>
  <label>درجة التحميص <input type="range"></label>
</form>
~~~

**هتشوف إيه:** علامة ✓ في مربع بني، وشريط الـ range الجزء المليان منه بني والدايرة بني.

**ليه كده:** [[accent-color]] بتتورّث، فسطر على [[form]] وصل لكل الحقول اللي جواه. ولو عايزها في الموقع كله: [[:root { accent-color: ... }]].

**الغلطة الشائعة:** [[background-color]] على الـ checkbox: مبيعملش حاجة تقريبًا، لأن المتصفح بيرسم المربع بنفسه.

~~~text القياس من Chrome
form و الـ checkbox و الـ range   accent-color: rgb(180, 83, 9)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** زرار «اطلب» بني [[#b45309]]، والزرار اللي عليه [[.soft]] لازم يبقى **نفس اللون بإضاءة أعلى بـ 0.15** في oklch (والقوة والدرجة زي ما هم). اكتبه بالطريقة النسبية ([[oklch(from ...)]]). (من قسم ٤ في الشرح)`, done: R`الزرار التاني نسخة أفتح من نفس البني، وكل الشروط ✓.`, work: { h: 80, start: R`<style>
  .btn { padding: 10px 18px; border: 0; border-radius: 8px; color: white; font: inherit; background: #b45309; }
  .btn.soft { color: black; }
</style>
<button class="btn">اطلب</button>
<button class="btn soft">اطلب (فاتح)</button>`, checks: [
              { say: R`[[.soft]] = نفس البني بإضاءة + 0.15`, q: ".btn.soft", style: ["background-color", "oklch(0.705288 0.145526 48.9931)"] },
              { say: R`مكتوب بالطريقة النسبية`, src: "from" }
            ] }, sol: R`~~~live 70 الحل
<style>
  .btn { padding: 10px 18px; border: 0; border-radius: 8px; color: white; font: inherit; background: #b45309; }
  .btn.soft { color: black; background: oklch(from #b45309 calc(l + 0.15) c h); }
</style>
<button class="btn">اطلب</button>
<button class="btn soft">اطلب (فاتح)</button>
~~~

**هتشوف إيه:** زرار بني بكلام أبيض، وجنبه زرار برتقاني فاتح بكلام أسود: نفس اللون «منوّر».

**ليه كده:** المتصفح فك [[#b45309]] لـ [[l]] = 0.555 و [[c]] = 0.146 و [[h]] = 49، وزوّد 0.15 على [[l]] بس. والنتيجة بتفضل نفس الدرجة والقوة.

**الغلطة الشائعة:** [[oklch(from #b45309 l + 0.15 c h)]] من غير [[calc()]]: مرفوضة. أي حساب على جزء لازم يبقى جوه [[calc()]].

**حل تاني:** [[color-mix(in oklch, #b45309, white 35%)]] بيطلّع لون قريب، بس الأبيض بيقلّل القوة ([[c]]) كمان، فبيبقى أبهت شوية.

~~~text القياس من Chrome
.btn.soft   background-color: oklch(0.705288 0.145526 48.9931)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[color-mix(in srgb, red 30%, blue 30%)]]. النسب مجموعها 60 مش 100. القيمة هتترفض؟ ولو اتقبلت، اللون هيطلع إيه؟ اكتب إجابتك، وبعدين افتح الحل. (من قسم ٣ في الشرح)`, done: R`كتبت إنها مقبولة، وإن النتيجة بنفسجي بالنص بشفافية 60٪.`, sol: R`~~~live 90 الصفحة
<style>
  .bg { padding: 12px; background: repeating-linear-gradient(45deg, #fff 0 8px, #e7e5e4 8px 16px); }
  .m { height: 50px; background: color-mix(in srgb, red 30%, blue 30%); }
</style>
<div class="bg"><div class="m"></div></div>
~~~

**الإجابة:** **مقبولة**. اللون بنفسجي (نص أحمر ونص أزرق، لأن النسبتين متساويتين)، بس **شفاف 60٪**.

**هتشوف إيه:** مستطيل بنفسجي، والشرايط الرمادي اللي وراه باينة من خلاله.

**السبب:** [[color-mix()]] بتقسم النسب على مجموعها عشان تعرف تخلط إزاي (30 و 30 = نص ونص)، وبعدين المجموع نفسه (60٪) بيبقى شفافية النتيجة. ده مكتوب في المواصفة، ومفيد لو عايز لون شفاف من لونين في خطوة.

~~~text القياس من Chrome
color-mix(in srgb, red 30%, blue 30%)   →  color(srgb 0.5 0 0.5 / 0.6)
~~~` }
          ]
        },
        {
          cmd: "filter و backdrop-filter",
          title: "فلاتر زي برامج الصور: تغبيش وإضاءة وأبيض وأسود وضل بشكل المحتوى، وتغبيش اللي ورا العنصر",
          pre: ["css/rgb و hsl و oklch"],
          ref: [
            { t: "MDN: filter", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/filter" },
            { t: "MDN: <filter-function>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/filter-function" },
            { t: "MDN: drop-shadow()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/filter-function/drop-shadow" },
            { t: "MDN: backdrop-filter", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter" },
            { t: "MDN: flood-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flood-color" },
            { t: "MDN: lighting-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/lighting-color" },
            { t: "MDN: color-interpolation-filters", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-interpolation-filters" },
            { t: "MDN: stop-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stop-color" },
            { t: "Filter Effects Module Level 1", url: "https://www.w3.org/TR/filter-effects-1/" },
            { t: "Filter Effects Level 2: backdrop-filter", url: "https://drafts.csswg.org/filter-effects-2/#BackdropFilterProperty" }
          ],
          desc: R`[[filter]] بيطبّق تأثير على العنصر كله بعد ما يترسم، زي فلاتر برامج الصور: [[blur()]] تغبيش، و [[brightness()]] إضاءة، و [[grayscale()]] أبيض وأسود، و [[drop-shadow()]] ضل بشكل المحتوى الحقيقي، وست دوال تانية. وممكن أكتر من واحد ورا بعض.
و [[backdrop-filter]] بيطبّق نفس الدوال على **اللي ورا** العنصر مش على العنصر نفسه: ده تأثير «الزجاج المصنفر» في القوايم والـ navbar.`,
          example: R`.sold-out img { filter: grayscale(1); }
.hero img { filter: brightness(0.7) saturate(1.2); }
.icon { filter: drop-shadow(0 4px 4px rgb(0 0 0 / 0.4)); }
.spoiler { filter: blur(6px); }
.spoiler:hover { filter: none; }
.nav { background: rgb(255 255 255 / 0.6); backdrop-filter: blur(10px); }`,
          flag: "script",
          lines: [
            R`صورة المنتج اللي خلص تبقى أبيض وأسود. [[1]] = 100٪.`,
            R`صورة الهيدر أغمق (70٪ من إضاءتها) وألوانها أقوى شوية: فلترين ورا بعض بمسافة، بيتنفذوا بالترتيب.`,
            R`ضل بيمشي على شكل الأيقونة نفسها (مش مستطيل حواليها): نازل 4px، ومموّه 4px، وأسود 40٪.`,
            R`كلام «حرق أحداث» متغبّش لحد ما الماوس يعدّي عليه.`,
            R`وقت الـ hover الفلتر بيتشال.`,
            R`الـ navbar نص شفاف، و اللي وراه (الصفحة اللي بتتحرك تحته) متغبّش: زجاج مصنفر.`
          ],
          teach: R`## الفكرة في سطرين

المتصفح بيرسم العنصر وكل اللي جواه (خلفية وكلام وصور وأولاد) كصورة، وبعدين بيعدّي الصورة دي على الفلاتر بالترتيب. عشان كده الفلتر بيأثر على **كل حاجة** في العنصر، زي [[opacity]] (درس «rgb و hsl و oklch»). و [[backdrop-filter]] بتعمل نفس الحكاية بس على الصورة اللي **تحت** العنصر.

---

## ١. [[<filter-function>]]: العشر دوال

القيم اللي [[filter]] و [[backdrop-filter]] بياخدوها من نوع [[<filter-function>]]: عشر دوال، وكمان [[url()]] لفلتر SVG (قسم ٥).

| الدالة | بتعمل إيه | القيمة | من غير قيمة (المحسوب) |
|---|---|---|---|
| [[blur(4px)]] | تغبيش | طول (مش نسبة)، 0 = من غير | [[blur(0px)]] |
| [[brightness(1.5)]] | إضاءة | 0 = أسود، 1 = زي ما هو، أكبر = أفتح | [[brightness(1)]] |
| [[contrast(2)]] | تباين | 0 = رمادي، 1 = زي ما هو | [[contrast(1)]] |
| [[drop-shadow(2px 4px 6px black)]] | ضل بشكل المحتوى | x y blur لون (مفيش spread) | |
| [[grayscale(1)]] | أبيض وأسود | 0 لـ 1 | [[grayscale(1)]] |
| [[hue-rotate(90deg)]] | يلف كل الألوان على العجلة | زاوية | [[hue-rotate(0deg)]] |
| [[invert(1)]] | يعكس الألوان (نيجاتيف) | 0 لـ 1 | [[invert(1)]] |
| [[opacity(0.5)]] | شفافية | 0 لـ 1 | [[opacity(1)]] |
| [[saturate(3)]] | قوة الألوان | 0 = رمادي، 1 = زي ما هو، أكبر = أزهى | [[saturate(1)]] |
| [[sepia(0.8)]] | لون بني «صورة قديمة» | 0 لـ 1 | [[sepia(1)]] |

~~~live 280 360 الفلاتر العشرة على نفس الصورة
<style>
  .g { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 6px; }
  .g figure { margin: 0; font: 11px monospace; text-align: center; direction: ltr; }
  .g div { height: 60px; border-radius: 6px;
           background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3Cpath d='M0 60h120v-8H0z' fill='%23b45309'/%3E%3C/svg%3E") center / cover; }
</style>
<div class="g">
  <figure><div></div>none</figure>
  <figure><div style="filter: blur(3px)"></div>blur(3px)</figure>
  <figure><div style="filter: brightness(1.6)"></div>brightness(1.6)</figure>
  <figure><div style="filter: contrast(2)"></div>contrast(2)</figure>
  <figure><div style="filter: grayscale(1)"></div>grayscale(1)</figure>
  <figure><div style="filter: hue-rotate(120deg)"></div>hue-rotate(120deg)</figure>
  <figure><div style="filter: invert(1)"></div>invert(1)</figure>
  <figure><div style="filter: opacity(0.4)"></div>opacity(0.4)</figure>
  <figure><div style="filter: saturate(3)"></div>saturate(3)</figure>
  <figure><div style="filter: sepia(1)"></div>sepia(1)</figure>
  <figure><div style="filter: drop-shadow(4px 4px 3px #000)"></div>drop-shadow</figure>
</div>
~~~

**هتشوف إيه:** نفس المنظر (سما زرقا، وشمس صفرا، وجبال خضرا، وأرض بني) 11 مرة: الأصلي، ومغبّش، ومنوّر قوي، وألوانه حادة، وأبيض وأسود، وألوانه متلخبطة (السما بقت بمبي والجبل أزرق)، ونيجاتيف، وباهت شفاف، وزاهي جدًا، وبني قديم، وأخيرًا بضل أسود تحت يمين.

~~~text القياس من Chrome (المحسوب)
brightness(150%)    →  brightness(1.5)      ← النسب بتتحول لأرقام
contrast(200%)      →  contrast(2)
hue-rotate(0.5turn) →  hue-rotate(180deg)
drop-shadow(2px 4px)  (والكلام بني)  →  drop-shadow(rgb(180, 83, 9) 2px 4px 0px)   ← اللون من color
blur(-2px) و brightness(-1)   →  مرفوضين: مفيش سالب
~~~

---

## ٢. أكتر من فلتر: **بمسافة، وبالترتيب**

~~~text القياس من Chrome
filter: grayscale(1) sepia(1)       →  مقبولة
filter: blur(4px), grayscale(1)     →  مرفوضة كلها: الفاصلة غلط هنا (عكس box-shadow)
~~~

والترتيب **بيغيّر النتيجة**: كل فلتر بيشتغل على ناتج اللي قبله.

~~~live 110 نفس الفلترين بترتيبين
<style>
  .o { display: inline-block; width: 45%; height: 70px; margin: 3px; border-radius: 6px; font: 11px monospace; color: black; direction: ltr;
       background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
</style>
<div class="o" style="filter: sepia(1) grayscale(1)">sepia → grayscale</div>
<div class="o" style="filter: grayscale(1) sepia(1)">grayscale → sepia</div>
~~~

**هتشوف إيه:** اليمين رمادي خالص (الـ sepia اتعمل وبعدين الـ grayscale شال اللون). الشمال بني قديم (الأبيض وأسود اتعمل الأول، والـ sepia لوّنه).

---

## ٣. [[drop-shadow()]] ضد [[box-shadow]]

[[box-shadow]] بيرسم ضل للـ **صندوق**. [[drop-shadow()]] بيرسم ضل لكل **حاجة مرسومة فعلًا**، فبيتجاهل الحتت الشفافة: أيقونة SVG، أو صورة PNG من غير خلفية، أو شكل مقصوص.

~~~live 120 ضل الصندوق وضل الشكل
<style>
  .ic { display: inline-block; width: 80px; height: 80px; margin: 14px 20px; vertical-align: middle;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' fill='%23facc15'/%3E%3C/svg%3E") center / contain no-repeat; }
</style>
<span class="ic" style="box-shadow: 0 6px 6px rgb(0 0 0 / 0.5)"></span>
<span class="ic" style="filter: drop-shadow(0 6px 4px rgb(0 0 0 / 0.5))"></span>
~~~

**هتشوف إيه:** نجمتين صفرا. اليمين ([[box-shadow]]) تحتها ضل **مربع**، كأن النجمة مرسومة على كارت شفاف. الشمال ([[drop-shadow]]) الضل بشكل النجمة نفسها.

| | [[box-shadow]] | [[drop-shadow()]] |
|---|---|---|
| شكل الضل | الصندوق بأركانه | المحتوى المرسوم |
| spread و [[inset]] | موجودين | مش موجودين (Chrome رفض قيمة رابعة) |
| أكتر من ضل | فاصلة | كذا [[drop-shadow()]] ورا بعض بمسافة |
| الأداء | أخف | أتقل شوية (فلتر على الصورة كلها) |

---

## ٤. حاجات بتحصل لما تحط [[filter]]

- **مبيغيّرش المكان:** زي الضل. اتقاس: [[drop-shadow(0 20px 10px)]] و [[blur(5px)]] على صندوق، واللي تحته مكانه زي ما هو، ومفيش سكرول زيادة.
- **بيطلع برّه الصندوق:** التغبيش والضل بيترسموا برّه حدود العنصر، ولو الأب عليه [[overflow: hidden]] بيتقصوا.
- **أي [[filter]] غير [[none]] بيغيّر الـ [[position: fixed]] جواه:** العنصر الـ fixed بقى بيتحسب من العنصر اللي عليه الفلتر، مش من الشاشة.

~~~text القياس من Chrome
fixed (top: 0; left: 0) جوه div عادي            →  مكانه x=0 y=0  (ركن الشاشة)
fixed (top: 0; left: 0) جوه div عليه filter     →  مكانه x=8 y=158 (ركن الـ div)
نفس الكلام جوه div عليه backdrop-filter         →  ركن الـ div
~~~

ده سبب مشهور لـ «المودال/الـ header الـ fixed مش لازق في الشاشة»: حد حط فلتر على أب بعيد. كمان [[filter]] بيعمل stacking context (درس «z-index»).

- **[[filter: blur()]] على الكلام مش إخفاء:** الكلام المتغبّش لسه موجود، وبيتنسخ، وقارئ الشاشة بيقراه.

---

## ٥. [[filter: url(#id)]] وألوان فلاتر SVG

[[url()]] جوه [[filter]] بتشاور على فلتر معمول بـ SVG ([[<filter>]] بـ [[id]]). فلاتر SVG بتعمل حاجات أكتر بكتير من الدوال العشرة (نسيج، وإضاءة، وتشويه)، وده موضوع SVG مش CSS. بس فيه خصائص CSS **بتلوّن جوه SVG بس**، وموجودة في المنهج:

| الخاصية | بتشتغل على | بتعمل إيه | الافتراضي (اتقاس) |
|---|---|---|---|
| [[flood-color]] | [[<feFlood>]] و [[<feDropShadow>]] | لون «الملو» أو الضل في الفلتر | [[rgb(0, 0, 0)]] |
| [[flood-opacity]] | نفسهم | شفافيته | [[1]] |
| [[lighting-color]] | [[<feDiffuseLighting>]] و [[<feSpecularLighting>]] | لون النور | [[rgb(255, 255, 255)]] |
| [[color-interpolation-filters]] | [[<filter>]] وكل اللي جواه | مساحة الألوان اللي الفلتر بيحسب فيها: [[linearRGB]] أو [[sRGB]] | [[linearrgb]]، وبتتورّث |
| [[stop-color]] | [[<stop>]] جوه [[<linearGradient>]] و [[<radialGradient>]] | لون نقطة في تدرّج SVG | [[rgb(0, 0, 0)]] |
| [[stop-opacity]] | [[<stop>]] | شفافيتها | [[1]] |

~~~live 110 فلتر SVG بلون من CSS
<style>
  .stop1 { stop-color: #b45309; }
  .stop2 { stop-color: #fde68a; stop-opacity: 0.6; }
  .shadow { flood-color: #0f766e; flood-opacity: 0.8; }
</style>
<svg width="220" height="90" aria-hidden="true">
  <defs>
    <linearGradient id="cup-g"><stop offset="0" class="stop1"/><stop offset="1" class="stop2"/></linearGradient>
    <filter id="teal-shadow"><feDropShadow dx="4" dy="4" stdDeviation="2" class="shadow"/></filter>
  </defs>
  <rect x="10" y="10" width="160" height="60" rx="12" fill="url(#cup-g)" filter="url(#teal-shadow)"/>
</svg>
~~~

**هتشوف إيه:** مستطيل مدوّر متدرّج من البني على الشمال لأصفر فاتح شفاف شوية على اليمين، وتحته ضل **أخضر** مزاح تحت يمين. ألوان التدرّج ولون الضل جايين من قواعد CSS في [[<style>]]، مش من الـ SVG.

ليه الخصائص دي في CSS أصلًا؟ عشان تقدر تغيّر ألوان أيقونات وفلاتر SVG من الثيم (dark mode مثلًا) من غير ما تعدّل ملف الـ SVG. باقي خصائص SVG ([[fill]] و [[stroke]] وإخواتهم) في درس «SVG».

---

## ٦. [[backdrop-filter: blur(10px)]]: الزجاج المصنفر

[[backdrop-filter]] بتاخد **اللي ورا العنصر** (الصفحة تحته)، وتطبّق عليه الفلاتر، وترسمه جوه حدود العنصر. والعنصر نفسه لازم يبقى **شفاف أو نص شفاف**، وإلا خلفيته هتغطي على التأثير.

~~~live 190 زجاج مصنفر فوق صورة
<style>
  .scene { position: relative; height: 170px; overflow: hidden; border-radius: 10px;
           background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3Cpath d='M0 60h120v-8H0z' fill='%23b45309'/%3E%3C/svg%3E") center / cover; }
  .glass { position: absolute; inset-inline: 12px; padding: 10px 14px; border-radius: 10px; font-weight: 700; }
  .a { top: 14px; background: rgb(255 255 255 / 0.5); }
  .b { top: 64px; background: rgb(255 255 255 / 0.5); backdrop-filter: blur(10px); }
  .c { top: 114px; background: rgb(255 255 255 / 0.3); backdrop-filter: blur(10px) saturate(1.8); border: 1px solid rgb(255 255 255 / 0.5); }
</style>
<div class="scene">
  <div class="glass a">خلفية نص شفافة بس</div>
  <div class="glass b">ومعاها backdrop-filter: blur(10px)</div>
  <div class="glass c">ومعاها saturate(1.8) وحد فاتح</div>
</div>
~~~

**هتشوف إيه:** تلات شرايط فوق المنظر. الأول أبيض شفاف والشمس والجبال **حادة** باينة من وراه فبتلخبط الكلام. التاني نفس البياض بس اللي وراه متغبّش، فالكلام واضح وانت لسه حاسس بالصورة. التالت تغبيش وألوان أقوى وحد فاتح: شكل «الزجاج» المشهور.

~~~text القياس من Chrome
backdrop-filter: blur(8px) saturate(180%)   →  blur(8px) saturate(1.8)
-webkit-backdrop-filter                     →  مرفوضة في Chrome 157 (الاسم بالـ prefix كان لـ Safari القديم)
~~~

**تلات حاجات:**

1. **Baseline من 2024 بس** (المنهج حاطها «low»). المتصفح اللي مبيدعمهاش هيعرض الخلفية النص شفافة من غير تغبيش، فخلّي الشفافية كفاية لوحدها إن الكلام يتقري (أو اكتبها جوه [[@supports (backdrop-filter: blur(1px))]] واجعل البديل أقل شفافية، درس «Baseline و @supports»).
2. **تقيلة:** المتصفح بيعيد التغبيش مع كل سكرول. على عنصر صغير (navbar) تمام، على نص الصفحة لأ.
3. زي [[filter]]: بتعمل stacking context، وبتغيّر الـ [[position: fixed]] اللي جواها (اتقاس فوق).

---

## ٧. إمتى تستخدم إيه

| الموقف | |
|---|---|
| منتج خلصان أو كارت disabled | [[filter: grayscale(1)]] (ومعاه [[opacity]] أو نص يقول «خلص») |
| صورة هيدر الكلام عليها مش مقروء | [[filter: brightness(0.7)]] أو طبقة [[rgb(0 0 0 / 0.5)]] (الطبقة بتأثر على الخلفية بس مش الكلام) |
| ضل لأيقونة أو PNG شفاف | [[drop-shadow()]] |
| حرق أحداث أو محتوى حساس | [[blur()]] **مع** إخفاء حقيقي للنص لو مهم |
| navbar أو قايمة فوق محتوى بيتحرك | [[backdrop-filter: blur()]] + خلفية نص شفافة |
| تجربة dark mode سريعة | [[invert(1) hue-rotate(180deg)]] بيقلب الصفحة. للتجربة بس: الصور بتبوظ |

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[filter: blur(4px), grayscale(1)]] | مرفوضة: مسافة مش فاصلة |
| [[filter]] على الكارت كله عشان الصورة تغمق | الكلام غمق معاها. حط الفلتر على [[img]] بس |
| [[box-shadow]] لأيقونة PNG | ضل مربع حوالين الصندوق كله |
| [[backdrop-filter]] وخلفية العنصر مش شفافة | مفيش أي فرق |
| [[filter]] على أب فيه header [[fixed]] | الـ header مش لازق في الشاشة |
| [[blur()]] كإخفاء لمعلومة سرية | النص لسه في الصفحة وبيتنسخ |
| [[-webkit-backdrop-filter]] لوحدها | Chrome بيرفضها: اكتب الاسم العادي |

---

## الخلاصة

- [[filter]] = فلاتر على العنصر كله بعد الرسم. عشر دوال ([[<filter-function>]]) و [[url()]] لفلتر SVG.
- أكتر من فلتر: بمسافة، والترتيب بيغيّر النتيجة.
- [[drop-shadow()]] ضل بشكل المحتوى. [[box-shadow]] ضل الصندوق.
- الفلتر بيغيّر الـ [[fixed]] اللي جواه ومبيغيّرش المكان.
- [[flood-color]] و [[lighting-color]] و [[stop-color]] وإخواتهم: ألوان جوه SVG من CSS.
- [[backdrop-filter]] على اللي ورا العنصر، ومحتاجة خلفية شفافة، و Baseline جديد.`,
          try: R`اعمل [[filters.html]] فيه كارت منتج بصورة (المنظر من الشرح كـ [[background]])، وكارت تاني نفس الكلام عليه كلاس [[.sold-out]] يخلّي **الصورة بس** أبيض وأسود. وفوق الاتنين شريط [[position: sticky]] شفاف بـ [[backdrop-filter]]. اعمل سكرول وشوف الكروت متغبّشة تحت الشريط.`,
          sol: R`~~~live 260 filters.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فلاتر</title>
<style>
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #f5f5f4; }
  .bar { position: sticky; top: 0; padding: 12px 16px; font-weight: 700;
         background: rgb(255 255 255 / 0.55); backdrop-filter: blur(10px); border-bottom: 1px solid rgb(0 0 0 / 0.08); }
  .list { display: grid; gap: 12px; padding: 12px; }
  .card { background: white; border-radius: 12px; overflow: hidden; }
  .img { height: 110px;
         background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3Cpath d='M0 60h120v-8H0z' fill='%23b45309'/%3E%3C/svg%3E") center / cover; }
  .card p { margin: 10px 12px; }
  .sold-out .img { filter: grayscale(1); }
</style>
</head>
<body>
<div class="bar">قهوة الركن · المنيو</div>
<div class="list">
  <div class="card"><div class="img"></div><p>بن جبلي · ٢٢٠ جنيه</p></div>
  <div class="card sold-out"><div class="img"></div><p>بن إثيوبي · خلص</p></div>
  <div class="card"><div class="img"></div><p>بن برازيلي · ١٩٠ جنيه</p></div>
</div>
</body>
</html>
~~~

**هتشوف إيه:** شريط فوق شفاف وتحته تلات كروت. التاني صورته رمادي وكلامه («خلص») لسه أسود عادي. اعمل سكرول جوه المعاينة: الكروت بتعدّي تحت الشريط وبتبان متغبّشة من وراه.

~~~text القياس من Chrome
.bar                backdrop-filter: blur(10px)   background-color: rgba(255, 255, 255, 0.55)
.sold-out .img      filter: grayscale(1)
.sold-out p         filter: none            ← الكلام مش متأثر
~~~

**ليه الفلتر على [[.img]] مش [[.card]]:** على الكارت كله كان هيخلّي الكلام كمان رمادي، والسعر والزرار (لو فيه) هيبهتوا.`,
          deep: {
            why: R`حاجات كانت بتتعمل في Photoshop وتتحفظ نسخة تانية من الصورة (أبيض وأسود للمنتج الخلصان، ونسخة أغمق للهيدر، وأيقونة بضل) بقت سطر CSS على نفس الصورة. و [[backdrop-filter]] عملت تأثير «الزجاج» اللي أنظمة التشغيل الحديثة بتستخدمه، من غير صور ولا JavaScript.`,
            how: R`المتصفح بيرسم العنصر وأولاده في طبقة لوحدها (offscreen)، ويعدّيها على الفلاتر بالترتيب (كل دالة في الآخر مصفوفة ألوان أو عملية على البكسلات)، وبعدين يحط النتيجة في الصفحة. عشان كده الفلتر بيعمل stacking context وبيبقى containing block للـ fixed. [[drop-shadow]] بياخد شكل الشفافية (alpha) بتاع الطبقة ويموّهه ويلوّنه. [[backdrop-filter]] بياخد اللي اترسم تحت العنصر لحد دلوقتي، ويقصّه على شكل العنصر، ويطبّق عليه الفلاتر، وبعدين يرسم العنصر فوقه. [[url()]] بيشاور على [[<filter>]] في SVG، وخصائص زي [[flood-color]] بتتحسب على عناصر الفلتر دي زي أي خاصية CSS.`,
            when: R`[[grayscale]]: حالة «مش متاح». [[brightness]]/[[contrast]]/[[saturate]]: ظبط صور جاية من مستخدمين. [[blur]]: حرق أحداث، وخلفية ورا مودال، وصورة صغيرة بتحمّل. [[drop-shadow]]: أيقونات وصور شفافة. [[hue-rotate]]/[[invert]]: تجارب وتأثيرات. [[backdrop-filter]]: navbar و bottom sheet ومودال فوق محتوى.`,
            mistakes: R`فاصلة بين الفلاتر. فلتر على الأب بدل الصورة. [[box-shadow]] لشكل مش مستطيل. [[backdrop-filter]] من غير خلفية شفافة. فلتر على أب فيه fixed. [[blur]] كإخفاء. والاعتماد على [[backdrop-filter]] من غير بديل مقروء.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صورة المنتج اللي خلص لازم تبان أبيض وأسود بالكامل، والكلام اللي تحتها يفضل زي ما هو. (من قسم ١ في الشرح، وقسم ٧)`, done: R`الصورة رمادي والكلام عادي، وكل الشروط ✓.`, work: { h: 160, start: R`<style>
  .card { max-width: 220px; background: white; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; }
  .img { height: 90px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .card p { margin: 8px 12px; }
</style>
<div class="card sold-out"><div class="img"></div><p>بن إثيوبي · خلص</p></div>`, checks: [
              { say: R`الصورة أبيض وأسود`, q: ".sold-out .img", style: ["filter", "grayscale(1)"] },
              { say: R`الكارت نفسه من غير فلتر (الكلام مش متأثر)`, q: ".sold-out", style: ["filter", "none"] }
            ] }, sol: R`~~~live 150 الحل
<style>
  .card { max-width: 220px; background: white; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; }
  .img { height: 90px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .card p { margin: 8px 12px; }
  .sold-out .img { filter: grayscale(1); }
</style>
<div class="card sold-out"><div class="img"></div><p>بن إثيوبي · خلص</p></div>
~~~

**هتشوف إيه:** المنظر كله درجات رمادي (السما رمادي فاتح، والجبل رمادي غامق)، وتحته الكلام أسود عادي.

**ليه كده:** الفلتر على [[.img]] بس، فالكلام برّه تأثيره. [[grayscale(1)]] = 100٪ (و [[grayscale()]] من غير رقم نفس الحكاية).

**الغلطة الشائعة:** [[.sold-out { filter: grayscale(1); }]]: الكارت كله، بما فيه أي زرار أو سعر ملوّن، هيبقى رمادي.

~~~text القياس من Chrome
.sold-out .img   filter: grayscale(1)
.sold-out        filter: none
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صورة الهيدر المفروض تبقى متغبّشة شوية وأغمق، عشان العنوان الأبيض يبان، والصورة طالعة صافية زي ما هي. (من قسم ٢ في الشرح)`, done: R`الصورة متغبّشة وأغمق، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .hero { position: relative; height: 100px; overflow: hidden; }
  .hero .bg { position: absolute; inset: -10px; filter: blur(2px), brightness(0.6);
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .hero h1 { position: relative; margin: 0; padding: 28px 16px; color: white; }
</style>
<div class="hero"><div class="bg"></div><h1>صباح الفل</h1></div>`, checks: [
              { say: R`الفلترين اتقبلوا`, q: ".hero .bg", style: ["filter", "blur(2px) brightness(0.6)"] }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  .hero { position: relative; height: 100px; overflow: hidden; }
  .hero .bg { position: absolute; inset: -10px; filter: blur(2px) brightness(0.6);
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .hero h1 { position: relative; margin: 0; padding: 28px 16px; color: white; }
</style>
<div class="hero"><div class="bg"></div><h1>صباح الفل</h1></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 110 قبل
<style>
  .hero { position: relative; height: 100px; overflow: hidden; }
  .hero .bg { position: absolute; inset: -10px; filter: blur(2px), brightness(0.6);
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .hero h1 { position: relative; margin: 0; padding: 28px 16px; color: white; }
</style>
<div class="hero"><div class="bg"></div><h1>صباح الفل</h1></div>
~~~

**هتشوف إيه:** قبل: منظر صافي فاتح والعنوان الأبيض تايه فيه. بعد: المنظر غامق ومتغبّش، والعنوان الأبيض واضح.

**ليه:** في [[filter]] الدوال بتتكتب بمسافة. الفاصلة بتاعة [[box-shadow]] والخلفيات المتعددة؛ هنا خلّت السطر كله مرفوض.

**ليه الفلتر على [[.bg]] لوحده و [[inset: -10px]]:** لو على [[.hero]]، العنوان هيتغبّش. والتغبيش بيسحب الحواف لجوه وبيعمل إطار فاتح، فكبّرنا الصورة 10px من كل ناحية و [[overflow: hidden]] قص الزيادة.

~~~text القياس من Chrome
قبل   filter: none
بعد   filter: blur(2px) brightness(0.6)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** أيقونة النجمة (صورة SVG شفافة) عليها [[box-shadow]] فطالع تحتها ضل مربع. خلّي الضل بشكل النجمة: نازل 4px، وتمويه 4px، وأسود 40٪. (من قسم ٣ في الشرح)`, done: R`الضل بشكل النجمة ومفيش مربع، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .star { display: inline-block; width: 70px; height: 70px; margin: 16px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' fill='%23facc15'/%3E%3C/svg%3E") center / contain no-repeat;
          box-shadow: 0 4px 4px rgb(0 0 0 / 0.4); }
</style>
<span class="star"></span>`, checks: [
              { say: R`مفيش ضل صندوق`, q: ".star", style: ["box-shadow", "none"] },
              { say: R`ضل بشكل النجمة`, q: ".star", style: ["filter", "drop-shadow(rgba(0, 0, 0, 0.4) 0px 4px 4px)"] }
            ] }, sol: R`~~~live 110 بعد التصليح
<style>
  .star { display: inline-block; width: 70px; height: 70px; margin: 16px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' fill='%23facc15'/%3E%3C/svg%3E") center / contain no-repeat;
          filter: drop-shadow(0 4px 4px rgb(0 0 0 / 0.4)); }
</style>
<span class="star"></span>
~~~

وده اللي كان باين قبل التصليح:

~~~live 110 قبل
<style>
  .star { display: inline-block; width: 70px; height: 70px; margin: 16px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' fill='%23facc15'/%3E%3C/svg%3E") center / contain no-repeat;
          box-shadow: 0 4px 4px rgb(0 0 0 / 0.4); }
</style>
<span class="star"></span>
~~~

**هتشوف إيه:** قبل: نجمة صفرا جوه ضل مربع رمادي. بعد: نجمة صفرا وتحتها ضل رمادي بنفس شكلها.

**ليه:** [[box-shadow]] بيرسم ضل للصندوق (70×70) مهما كان اللي جواه. [[drop-shadow()]] بيرسم ضل للبكسلات المرسومة فعلًا، والحتت الشفافة في الصورة ملهاش ضل.

**الغلطة الشائعة:** تسيب الاتنين مع بعض: ضل مربع وضل نجمة.

~~~text القياس من Chrome
.star   box-shadow: none     filter: drop-shadow(rgba(0, 0, 0, 0.4) 0px 4px 4px)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** شريط المنيو فوق صورة: خلّيه زجاج مصنفر. خلفيته أبيض بشفافية 0.6، واللي وراه متغبّش 10px. (من قسم ٦ في الشرح)`, done: R`المنظر ورا الشريط متغبّش والكلام واضح، وكل الشروط ✓.`, work: { h: 150, start: R`<style>
  .scene { position: relative; height: 120px; border-radius: 10px; overflow: hidden;
           background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .nav { position: absolute; top: 40px; inset-inline: 12px; padding: 10px 14px; border-radius: 10px; font-weight: 700; background: white; }
</style>
<div class="scene"><div class="nav">الرئيسية · المنيو · الفروع</div></div>`, checks: [
              { say: R`خلفية الشريط أبيض بشفافية 0.6`, q: ".nav", style: ["background-color", "rgba(255, 255, 255, 0.6)"] },
              { say: R`اللي وراه متغبّش 10px`, q: ".nav", style: ["backdrop-filter", "blur(10px)"] }
            ] }, sol: R`~~~live 140 الحل
<style>
  .scene { position: relative; height: 120px; border-radius: 10px; overflow: hidden;
           background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .nav { position: absolute; top: 40px; inset-inline: 12px; padding: 10px 14px; border-radius: 10px; font-weight: 700;
         background: rgb(255 255 255 / 0.6); backdrop-filter: blur(10px); }
</style>
<div class="scene"><div class="nav">الرئيسية · المنيو · الفروع</div></div>
~~~

**هتشوف إيه:** شريط أبيض حليبي فوق المنظر، وورا الشريط الجبل والشمس باينين كألوان مغبّشة، والكلام التقيل واضح.

**ليه كده:** الخلفية لازم تبقى شفافة عشان نشوف اللي وراها، و [[backdrop-filter]] غبّشت اللي ورا بس، فالكلام على الشريط حاد.

**الغلطة الشائعة:** [[filter: blur(10px)]] على الشريط: **الكلام نفسه** هيتغبّش، واللي وراه هيفضل حاد.

**وكمان:** لو المتصفح مبيدعمش [[backdrop-filter]]، الشريط هيبقى أبيض 60٪ بس. اختبرها بإنك تشيل السطر: الكلام لسه مقروء؟ (هنا أيوه.)

~~~text القياس من Chrome
.nav   background-color: rgba(255, 255, 255, 0.6)    backdrop-filter: blur(10px)
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[main { filter: blur(0px); }]]، وجوه [[<main>]] زرار «اتصل بينا» عليه [[position: fixed; bottom: 16px; left: 16px]]. الزرار هيفضل في ركن الشاشة لما تعمل سكرول؟ ليه؟ اكتب إجابتك، وبعدين افتح الحل. (من قسم ٤ في الشرح)`, done: R`كتبت إن الزرار مش هيلزق في الشاشة لأن الفلتر (حتى [[blur(0px)]]) خلّى [[main]] هو المرجع بتاعه.`, sol: R`~~~live 160 الصفحة
<style>
  body { margin: 0; }
  main { filter: blur(0px); height: 400px; padding: 8px; background: repeating-linear-gradient(#fff 0 30px, #f5f5f4 30px 60px); }
  .call { position: fixed; bottom: 16px; left: 16px; padding: 8px 14px; background: #b45309; color: white; border: 0; border-radius: 999px; }
</style>
<main>
  <p>اعمل سكرول جوه المعاينة...</p>
  <button class="call">اتصل بينا</button>
</main>
~~~

**الإجابة:** **لأ**. الزرار بيتحرك مع الصفحة.

**هتشوف إيه:** الزرار البني تحت شمال **[[main]]** (مش الشاشة)، يعني تحت خالص بعد الـ 400px، ولما تعمل سكرول بيطلع ويختفي مع الصفحة بدل ما يفضل ثابت.

**السبب:** أي [[filter]] غير [[none]] (حتى [[blur(0px)]] اللي ملوش أي شكل) بيخلّي العنصر «containing block» للعناصر الـ fixed اللي جواه. فـ [[bottom: 16px]] بقت من تحت [[main]] مش من تحت الشاشة.

**الحل:** متحطش [[filter]] على أب لعنصر fixed. لو محتاج تغبّش الخلفية ورا مودال، غبّش عنصر تاني (أو استخدم [[backdrop-filter]] على طبقة المودال نفسها)، وحط الزرار الـ fixed برّه.

~~~text القياس من Chrome
fixed جوه أب من غير filter   →  ركن الشاشة
fixed جوه أب عليه filter     →  ركن الأب
~~~` }
          ]
        },
        {
          cmd: "mix-blend-mode و clip-path",
          title: "خلط ألوان العنصر مع اللي وراه، وقص العنصر على شكل دايرة أو مضلع أو أي مسار",
          pre: ["css/linear-gradient و radial-gradient"],
          ref: [
            { t: "MDN: mix-blend-mode", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode" },
            { t: "MDN: <blend-mode>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/blend-mode" },
            { t: "MDN: background-blend-mode", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-blend-mode" },
            { t: "MDN: isolation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation" },
            { t: "MDN: clip-path", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path" },
            { t: "MDN: <basic-shape>", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape" },
            { t: "MDN: clip-rule", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-rule" },
            { t: "Compositing and Blending Level 1", url: "https://www.w3.org/TR/compositing-1/" },
            { t: "CSS Masking Level 1: clip-path", url: "https://www.w3.org/TR/css-masking-1/#the-clip-path" },
            { t: "CSS Shapes Level 1: basic shapes", url: "https://www.w3.org/TR/css-shapes-1/#basic-shape-functions" }
          ],
          desc: R`[[mix-blend-mode]] بيخلّي ألوان العنصر «تتخلط» مع اللي وراه بدل ما تغطّيه، زي طبقات برامج الصور: [[multiply]] بيغمّق، و [[screen]] بيفتّح، و [[difference]] بيعكس. و [[background-blend-mode]] نفس الفكرة بين طبقات خلفية العنصر نفسه.
و [[clip-path]] بيقص العنصر على شكل: [[circle()]] و [[ellipse()]] و [[inset()]] و [[polygon()]] و [[path()]] و [[rect()]] و [[xywh()]]. اللي برّه الشكل مش بيترسم ومش بيتداس عليه، ومكان العنصر في الصفحة متغيّرش.`,
          example: R`.logo-on-photo { mix-blend-mode: multiply; }
.card { isolation: isolate; }
.duotone { background: url("photo.jpg") center / cover, #b45309; background-blend-mode: multiply; }
.avatar { clip-path: circle(50%); }
.hero { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
.badge { clip-path: inset(0 round 999px); }`,
          flag: "script",
          lines: [
            R`اللوجو بيغمّق اللي تحته بدل ما يغطيه: الأبيض في اللوجو بيختفي، والألوان التانية بتتضرب في ألوان الصورة.`,
            R`أي خلط جوه الكارت بيقف عند حدود الكارت ومبيوصلش للصفحة اللي ورا.`,
            R`صورة وتحتها لون بني في نفس الخلفية، والصورة بتتخلط مع البني: «صورة بلون البراند».`,
            R`الصورة متقصوصة دايرة نص قطرها نص الصندوق.`,
            R`هيدر حافته اللي تحت مايلة: أربع نقط، والنقطة اللي تحت يمين أعلى (85٪) من اللي تحت شمال (100٪).`,
            R`مستطيل مقصوص بأركان مدورة كبسولة: [[inset(0)]] الصندوق كله، و [[round]] بتدوّر الأركان.`
          ],
          teach: R`## الفكرة في سطرين

الاتنين بيغيّروا **الرسم** بس، زي [[filter]] (الدرس اللي فات): [[mix-blend-mode]] بيغيّر إزاي بكسلات العنصر بتتحط فوق اللي تحتها، و [[clip-path]] بيقرر أنهي بكسلات تترسم أصلًا. ومفيش واحد فيهم بيغيّر مقاس أو مكان العنصر.

---

## ١. [[mix-blend-mode: multiply]]

العادي ([[normal]]): بكسل العنصر **بيغطي** اللي وراه. مع أي قيمة تانية: المتصفح بيحسب لون جديد من اللونين (لون العنصر ولون اللي وراه) بمعادلة.

~~~live 230 نفس الدايرة بطرق خلط مختلفة
<style>
  .bl { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 6px; }
  .bl figure { margin: 0; height: 90px; position: relative; background: linear-gradient(90deg, #1e3a8a, #fde68a); font: 11px monospace; direction: ltr; }
  .bl span { position: absolute; inset: 15px 25px; border-radius: 50%; background: #dc2626; }
  .bl figcaption { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; background: #fff; }
</style>
<div class="bl">
  <figure><span></span><figcaption>normal</figcaption></figure>
  <figure><span style="mix-blend-mode: multiply"></span><figcaption>multiply</figcaption></figure>
  <figure><span style="mix-blend-mode: screen"></span><figcaption>screen</figcaption></figure>
  <figure><span style="mix-blend-mode: overlay"></span><figcaption>overlay</figcaption></figure>
  <figure><span style="mix-blend-mode: difference"></span><figcaption>difference</figcaption></figure>
  <figure><span style="mix-blend-mode: color"></span><figcaption>color</figcaption></figure>
  <figure><span style="mix-blend-mode: luminosity"></span><figcaption>luminosity</figcaption></figure>
  <figure><span style="mix-blend-mode: darken"></span><figcaption>darken</figcaption></figure>
</div>
~~~

**هتشوف إيه:** دايرة حمرا فوق تدرّج من الأزرق الغامق للأصفر، تمن مرات: [[normal]] حمرا صافية. [[multiply]] غامقة: على الأزرق شبه سودا وعلى الأصفر برتقاني محمر. [[screen]] فاتحة: بمبي على الأزرق وأصفر فاتح على الأصفر. [[overlay]] بتقوّي التباين. [[difference]] ألوان معكوسة. [[color]] بتاخد لون الدايرة وإضاءة اللي وراها. [[luminosity]] العكس. [[darken]] الأغمق من الاتنين في كل نقطة.

### [[<blend-mode>]]: كل القيم

| المجموعة | القيم | بتعمل إيه |
|---|---|---|
| عادي | [[normal]] | من غير خلط (الافتراضي) |
| بتغمّق | [[multiply]] و [[darken]] و [[color-burn]] | الأبيض بيختفي، والنتيجة أغمق من الاتنين |
| بتفتّح | [[screen]] و [[lighten]] و [[color-dodge]] | الأسود بيختفي، والنتيجة أفتح |
| تباين | [[overlay]] و [[soft-light]] و [[hard-light]] | الغامق يغمق والفاتح يفتح |
| فرق | [[difference]] و [[exclusion]] | طرح الألوان: الأبيض بيعكس، والأسود مبيعملش حاجة |
| أجزاء اللون | [[hue]] و [[saturation]] و [[color]] و [[luminosity]] | جزء من العنصر وجزء من اللي وراه |
| جمع | [[plus-lighter]] | جمع اللونين. مقبولة في [[mix-blend-mode]] بس (Chrome رفضها في [[background-blend-mode]]) |

الـ 16 الأولين نوعهم [[<blend-mode>]] وشغالين في الخاصيتين (اتقاس في Chrome 157). أشهر اتنين في الشغل: [[multiply]] (لوجو أو رسمة بخلفية بيضا فوق صورة: الأبيض بيختفي) و [[screen]] (العكس: خلفية سودا بتختفي).

~~~live 120 لوجو بخلفية بيضا فوق صورة
<style>
  .ph { display: inline-block; width: 45%; height: 100px; margin: 3px; position: relative; vertical-align: top;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover; }
  .ph b { position: absolute; inset: 25px 20px; display: grid; place-items: center; background: white; color: #78350f; font-size: 20px; }
</style>
<div class="ph"><b>قهوة الركن</b></div>
<div class="ph"><b style="mix-blend-mode: multiply">قهوة الركن</b></div>
~~~

**هتشوف إيه:** اليمين مستطيل أبيض مقفول فوق الصورة وعليه الاسم. الشمال المستطيل الأبيض **اختفى**، والاسم البني باين مطبوع على الصورة نفسها (وأغمق فوق الجبل الأخضر).

~~~text القياس من Chrome
mix-blend-mode الافتراضي: normal       background-blend-mode الافتراضي: normal
mix-blend-mode: plus-darker  →  مرفوضة في Chrome 157
~~~

---

## ٢. [[isolation: isolate]]

العنصر اللي عليه [[mix-blend-mode]] بيتخلط مع **كل** اللي وراه، لحد ما يقابل «حد». [[isolation: isolate]] بتعمل الحد ده: أي خلط جوه العنصر ده بيتحسب على اللي جواه بس.

~~~live 130 نفس الكارت من غير isolation ومعاه
<style>
  .page { padding: 10px; background: repeating-linear-gradient(45deg, #1e3a8a 0 12px, #fde68a 12px 24px); }
  .cd { display: inline-block; width: 42%; margin: 4px; padding: 14px; background: rgb(254 243 199 / 0.5); vertical-align: top; }
  .cd b { display: inline-block; padding: 4px 10px; background: #dc2626; color: white; mix-blend-mode: multiply; }
</style>
<div class="page">
  <div class="cd"><b>شارة multiply</b> من غير isolation</div>
  <div class="cd" style="isolation: isolate"><b>شارة multiply</b> isolation: isolate</div>
</div>
~~~

**هتشوف إيه:** كارتين كريمي شبه شفافين فوق شرايط زرقا وصفرا. في الكارت اليمين (من غير isolation) الشارة الحمرا **باين فيها خطوط مايلة غامقة**: اتخلطت مع الكارت ومع شرايط الصفحة اللي وراه كمان. في الكارت الشمال الشارة أحمر سادة: اتخلطت مع الكارت بس.

**إمتى الخلط بيقف لوحده:** **أي حاجة بتعمل stacking context بتعزل الخلط** ([[opacity]] أقل من 1، و [[filter]]، و [[z-index]] مع [[position]]، و [[isolation: isolate]]). [[isolation]] هي الطريقة اللي «مبتغيّرش أي حاجة تانية» عشان تعمل الحد ده عمدًا. تفاصيل الـ stacking context في درس «z-index».

~~~text القياس من Chrome
isolation الافتراضي: auto        isolation: isolate  →  isolate
~~~

---

## ٣. [[background-blend-mode: multiply]]

نفس القيم، بس بين **طبقات خلفية العنصر نفسه** (الصور واللون، درس «background-size و background-position» قسم ٧)، مش مع اللي وراه. أشهر استخدام: تلوين صورة بلون البراند من غير برنامج صور.

~~~live 130 صورة متلوّنة بلونين
<style>
  .tone { display: inline-block; width: 30%; height: 100px; margin: 3px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23e5e7eb'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23fff'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%23525252'/%3E%3C/svg%3E");
          background-size: cover; background-position: center; }
</style>
<div class="tone"></div>
<div class="tone" style="background-color: #b45309; background-blend-mode: multiply"></div>
<div class="tone" style="background-color: #0f766e; background-blend-mode: screen"></div>
~~~

**هتشوف إيه:** الأولى صورة رمادي. التانية نفس الصورة **بني**: الفاتح بقى بني فاتح والغامق بني غامق. التالتة اتلوّنت أخضر فاتح ([[screen]] بتفتّح).

لكل طبقة خلفية قيمة، بنفس ترتيب طبقات [[background-image]]:

~~~text القياس من Chrome
background-blend-mode: screen, multiply   (على عنصر طبقة واحدة)   →  screen   ← القايمة اتقصّت لعدد الطبقات
~~~

---

## ٤. [[clip-path]] و [[<basic-shape>]]

[[clip-path]] بياخد شكل، واللي جوه الشكل بس اللي بيترسم. الأشكال الجاهزة من نوع [[<basic-shape>]]:

| الشكل | المعنى | المحسوب (اتقاس) |
|---|---|---|
| [[inset(10px 20px round 8px)]] | مستطيل لجوه من الحواف (زي margin بالسالب)، و [[round]] أركان مدورة | زي ما هو |
| [[circle(50% at 30% 40%)]] | دايرة: نص القطر (أو [[closest-side]] الافتراضي) و [[at]] المركز ([[<position>]]) | زي ما هو |
| [[ellipse(50% 30%)]] | بيضاوي: نص القطر بالعرض وبالطول | زي ما هو |
| [[polygon(50% 0, 100% 100%, 0 100%)]] | مضلع: نقط (x y) مفصولة بفاصلة، والمتصفح بيقفله | [[polygon(50% 0px, 100% 100%, 0px 100%)]] |
| [[path('M0 0 L100 0 L50 50 Z')]] | مسار SVG (نفس [[d]] بتاع [[<path>]]) بالبكسل | [[path("M 0 0 L 100 0 L 50 50 Z")]] |
| [[rect(10px 190px 90px 10px)]] | مستطيل بأبعاد من فوق ومن الشمال (فوق، يمين، تحت، شمال) | بيتحوّل لـ [[inset(10px calc(100% - 190px) ...)]] |
| [[xywh(10px 10px 50% 80px)]] | مستطيل بـ x و y وعرض وطول | بيتحوّل لـ [[inset(...)]] كمان |

~~~live 240 340 سبع أشكال على نفس المربع
<style>
  .cp { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; }
  .cp figure { margin: 0; font: 10px monospace; text-align: center; direction: ltr; }
  .cp div { height: 80px; background: linear-gradient(135deg, #fbbf24, #b45309); }
</style>
<div class="cp">
  <figure><div style="clip-path: inset(10px 20px round 12px)"></div>inset()</figure>
  <figure><div style="clip-path: circle(40%)"></div>circle()</figure>
  <figure><div style="clip-path: ellipse(50% 30%)"></div>ellipse()</figure>
  <figure><div style="clip-path: polygon(50% 0, 100% 100%, 0 100%)"></div>polygon()</figure>
  <figure><div style="clip-path: path('M10 70 C10 10, 80 10, 80 70 Z')"></div>path()</figure>
  <figure><div style="clip-path: rect(10px 60px 70px 0 round 8px)"></div>rect()</figure>
  <figure><div style="clip-path: xywh(20% 20% 60% 60% round 50%)"></div>xywh()</figure>
</div>
~~~

**هتشوف إيه:** نفس المربع البرتقالي متقصوص سبع مرات: مستطيل أصغر بأركان مدورة، ودايرة، وبيضاوي ممطوط بالعرض، ومثلث، وقوس (قبة)، ومستطيل لازق في الشمال، ودايرة صغيرة في النص.

**مين للـ إيه:**

- [[circle()]] و [[ellipse()]] و [[inset(... round ...)]]: أشكال بسيطة. ([[border-radius]] كان كفاية؟ لو الشكل دايرة على عنصر مربع، أيوه. [[clip-path]] بيقص المحتوى كمان، زي [[overflow: hidden]] بالظبط على الشكل.)
- [[polygon()]]: أي شكل مستقيم: مثلث، وسهم، وشريط مايل، ونجمة.
- [[path()]]: منحنيات. عيبه إن الأرقام بالبكسل، فمبيتمطش مع العنصر.
- [[rect()]] و [[xywh()]]: لما بتفكر بإحداثيات (زي حتة من صورة). المتصفح بيحوّلهم لـ [[inset()]].

(فيه كمان [[shape()]] الجديدة اللي بتعمل منحنيات بنسب مئوية، Chrome 157 بيقبلها، ومش في المنهج لسه.)

### الصندوق اللي الشكل بيتحسب عليه

بعد الشكل ممكن تكتب صندوق: [[circle(50%) content-box]]. الافتراضي [[border-box]] (المحسوب بيشيله: [[circle() border-box]] رجعت [[circle()]]). وممكن الصندوق لوحده: [[clip-path: margin-box]].

---

## ٥. [[clip-path]] مبيغيّرش المكان، وبيقص الضغط

~~~text القياس من Chrome (مربع 200×200 عليه clip-path: circle(50px))
getBoundingClientRect   →  200 × 200            ← مقاسه زي ما هو
الضغط في الركن           →  بيروح للـ body       ← المقصوص مش بيستقبل ضغط
الضغط في النص            →  المربع نفسه
~~~

يعني الدايرة بتاخد مكان المربع كامل في الصفحة، بس الحتة المقصوصة «مش موجودة» للماوس.

### العربي: النقط مبتتعكسش

نقط [[polygon()]] فعلية: [[0]] = الشمال حتى في [[dir="rtl"]]. سهم «لقدّام» في صفحة عربي لازم يتكتب بالعكس:

~~~live 90 سهم في الاتجاهين
<style>
  .arrow { display: inline-block; width: 120px; height: 40px; margin: 6px; background: #b45309; color: white; font-size: 14px; line-height: 40px; text-align: center;
           clip-path: polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%); }
  .rtl-arrow { clip-path: polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%); }
</style>
<span class="arrow">السهم لليمين</span>
<span class="arrow rtl-arrow">السهم للشمال</span>
~~~

**هتشوف إيه:** شكلين بني: اليمين مدبب ناحية اليمين (مكتوب للإنجليزي)، والشمال مدبب ناحية الشمال (ده «لقدّام» في العربي).

---

## ٦. [[clip-rule]]: الشكل اللي بيقطع نفسه

لو المسار بيعدّي على نفسه (نجمة مرسومة بخط واحد، أو مربع جوه مربع)، فيه طريقتين لتحديد «جوه»:

| القيمة | جوه يعني |
|---|---|
| [[nonzero]] | الافتراضي: تقريبًا كل اللي جوه المسار الخارجي |
| [[evenodd]] | بالتبادل: الحتة اللي بتتقفل مرتين بتبقى «برّه» (فاضية) |

[[clip-rule]] خاصية CSS بتشتغل على **أشكال SVG جوه [[<clipPath>]]**. في [[polygon()]] و [[path()]] نفس الفكرة بتتكتب كأول قيمة: [[polygon(evenodd, ...)]] و [[path(evenodd, "...")]].

~~~live 140 نجمة بخط واحد بالطريقتين
<style>
  .st { display: inline-block; width: 110px; height: 110px; margin: 6px; background: linear-gradient(135deg, #fbbf24, #b45309); }
  .r1 { clip-rule: nonzero; }
  .r2 { clip-rule: evenodd; }
</style>
<svg width="0" height="0" aria-hidden="true">
  <clipPath id="star-nz" clipPathUnits="objectBoundingBox"><path class="r1" d="M.5 0 L.79 .9 L.02 .35 L.98 .35 L.21 .9 Z"/></clipPath>
  <clipPath id="star-eo" clipPathUnits="objectBoundingBox"><path class="r2" d="M.5 0 L.79 .9 L.02 .35 L.98 .35 L.21 .9 Z"/></clipPath>
</svg>
<span class="st" style="clip-path: url(#star-nz)"></span>
<span class="st" style="clip-path: url(#star-eo)"></span>
~~~

**هتشوف إيه:** نجمتين خماسي. اليمين ([[nonzero]]) مليانة. الشمال ([[evenodd]]) مخماس فاضي في النص، والسنون الخمسة بس اللي ملوّنة.

[[clip-path: url(#id)]] بيشاور على [[<clipPath>]] في SVG في نفس الصفحة، وده اللي بتستخدمه لما الشكل معقد ومعمول في برنامج رسم.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[clip-path: polygon(...)]] بنقط بالبكسل على عنصر بيتمط | الشكل مبيكبرش مع العنصر. استخدم نسب |
| سهم [[polygon]] في صفحة عربي من كود إنجليزي | السهم بيشاور لورا |
| [[clip-path]] على زرار ونسيت إن الأركان مش بتتداس | الضغط في الحتة المقصوصة بيروح للي تحت |
| [[clip-path]] على عنصر عليه [[box-shadow]] أو [[outline]] | الضل والحلقة اتقصوا كمان. للضل: [[filter: drop-shadow()]] على **أب** العنصر المقصوص |
| [[mix-blend-mode]] والخلط واصل لخلفية الصفحة | زوّد [[isolation: isolate]] على الكارت |
| [[background-blend-mode]] وفيه طبقة واحدة بس | مفيش حاجة تتخلط معاها: زوّد [[background-color]] أو طبقة تانية |
| كلام عليه [[mix-blend-mode: difference]] | لونه بيتغيّر مع كل حتة وراه، والتباين مش مضمون |

---

## الخلاصة

- [[mix-blend-mode]]: العنصر يتخلط مع اللي وراه. [[multiply]] يغمّق ويخفي الأبيض، و [[screen]] يفتّح ويخفي الأسود.
- [[<blend-mode>]] 16 قيمة مشتركة بين [[mix-blend-mode]] و [[background-blend-mode]].
- [[isolation: isolate]] تحبس الخلط جوه العنصر.
- [[background-blend-mode]] بين طبقات الخلفية: صورة بلون البراند.
- [[clip-path]] و [[<basic-shape>]]: [[inset]] و [[circle]] و [[ellipse]] و [[polygon]] و [[path]] و [[rect]] و [[xywh]]. مبيغيّرش المكان، وبيقص الضغط، ونقطه مبتتعكسش.
- [[clip-rule]] و [[evenodd]] للأشكال اللي بتقطع نفسها.`,
          try: R`اعمل [[shapes.html]] فيه: هيدر بصورة (تدرّج) حافته اللي تحت مايلة بـ [[polygon()]]، وصورة بروفايل دايرة بـ [[clip-path]]، ولوجو أبيض الخلفية فوق الهيدر بـ [[mix-blend-mode: multiply]]. وبعدين اعمل سكرول وجرّب تدوس على الحتة المقصوصة من الهيدر: بيحصل إيه؟`,
          sol: R`~~~live 250 shapes.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أشكال وخلط</title>
<style>
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; }
  .hero { position: relative; height: 170px; display: grid; place-items: center;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23fde68a'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23f59e0b'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2392400e'/%3E%3C/svg%3E") center / cover;
          clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); }
  .logo { padding: 8px 16px; background: white; color: #78350f; font-size: 26px; font-weight: 800; mix-blend-mode: multiply; }
  .who { display: flex; align-items: center; gap: 10px; padding: 0 16px; }
  .avatar { width: 56px; height: 56px; background: linear-gradient(#a8a29e, #44403c); clip-path: circle(50%); }
</style>
</head>
<body>
<header class="hero"><div class="logo">قهوة الركن</div></header>
<div class="who"><div class="avatar"></div><p>صاحبة المكان: منى عادل</p></div>
</body>
</html>
~~~

**هتشوف إيه:** هيدر بمنظر صحراوي حافته اللي تحت مايلة (أوطى على الشمال)، والاسم «قهوة الركن» البني مطبوع على المنظر من غير مستطيل أبيض. وتحته دايرة رمادي جنبها اسم صاحبة المكان.

~~~text القياس من Chrome
.hero     clip-path: polygon(0px 0px, 100% 0px, 100% 80%, 0px 100%)
.logo     mix-blend-mode: multiply
.avatar   clip-path: circle(50%)
~~~

**الضغط على الحتة المقصوصة** (المثلث الأبيض تحت يمين الهيدر): الضغط بيروح للـ body، مش للهيدر.`,
          deep: {
            why: R`تصاميم كتير فيها أشكال مش مستطيلة (أقسام بحافة مايلة، وصور دايرية، وأسهم) أو طبقات «مطبوعة» على بعض (لوجو على صورة، وصورة بلون البراند). زمان كانت بتتعمل صور مقصوصة جاهزة. [[clip-path]] و [[mix-blend-mode]] بيعملوها على أي محتوى حقيقي (صورة أو كلام أو فيديو) ويفضل قابل للتعديل.`,
            how: R`[[clip-path]]: المتصفح بيحسب الشكل على الصندوق المرجعي (border-box افتراضيًا)، وبيستخدمه «قناع» صفر أو واحد وقت الرسم ووقت تحديد العنصر اللي تحت الماوس (hit testing). الـ layout بيفضل على المستطيل الأصلي. [[mix-blend-mode]]: العنصر بيترسم في طبقة، والطبقة بتتحط على «الخلفية» (كل اللي اترسم قبلها جوه نفس الـ stacking context) بمعادلة الخلط بدل التغطية العادية. [[isolation]] أو أي stacking context بيبدأ «خلفية» جديدة فاضية. [[background-blend-mode]] نفس المعادلات بين طبقات خلفية عنصر واحد.`,
            when: R`[[multiply]]: لوجو أو رسمة بخلفية بيضا فوق صورة، وصور «duotone». [[screen]]: العكس فوق خلفية غامقة. [[isolation]]: أي كومبوننت جواه خلط. [[clip-path: circle()]]: صور بروفايل. [[polygon()]]: أقسام بحافة مايلة، وأسهم، وشارات. [[path()]] و [[url(#clipPath)]]: أشكال جاهزة من برنامج رسم. [[clip-rule: evenodd]]: أشكال فيها فتحات.`,
            mistakes: R`نقط بالبكسل على عنصر بيتغيّر مقاسه. أسهم مش معكوسة في العربي. نسيان إن المقصوص مبيتداسش. ضل أو outline على العنصر المقصوص. خلط بيوصل للصفحة. [[background-blend-mode]] من غير طبقة تانية. وكلام بـ [[difference]] تباينه مش مضمون.`
          },
          practice: [
            { lvl: 'سريع', t: R`**أشكال:** صورة البروفايل مربعة. قصّها دايرة بـ [[clip-path]] نص قطرها 50٪. (من قسم ٤ في الشرح)`, done: R`الصورة دايرة، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .avatar { width: 72px; height: 72px; background: linear-gradient(#a8a29e, #44403c); }
</style>
<div class="avatar"></div>`, checks: [
              { say: R`مقصوصة [[circle(50%)]]`, q: ".avatar", style: ["clip-path", "circle(50%)"] },
              { say: R`مقاسها زي ما هو`, q: ".avatar", style: ["width", "72px"] }
            ] }, sol: R`~~~live 90 الحل
<style>
  .avatar { width: 72px; height: 72px; background: linear-gradient(#a8a29e, #44403c); clip-path: circle(50%); }
</style>
<div class="avatar"></div>
~~~

**هتشوف إيه:** دايرة رمادي فاتحة من فوق وغامقة من تحت.

**ليه كده:** [[50%]] من «القطر المرجعي» للمربع = نص العرض، والمركز الافتراضي في النص، فالدايرة بتلمس الأربع حواف.

**الغلطة الشائعة:** [[circle()]] من غير رقم: الافتراضي [[closest-side]]، وفي مربع ده نفس النتيجة، بس المحسوب هيبقى [[circle()]] مش [[circle(50%)]]. (وفي مستطيل [[closest-side]] بتاخد الضلع الأقصر، و [[50%]] بتاخد حاجة تانية: النسبة من «القطر» √((w² + h²)/2).)

~~~text القياس من Chrome
.avatar   clip-path: circle(50%)     width: 72px
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** هيدر الصفحة محتاج حافة تحت مايلة: فوق مستقيم، والركن اللي تحت **يمين** عند 85٪ من الطول، والركن اللي تحت **شمال** عند 100٪. اكتب النقط الأربعة بالترتيب: فوق شمال، فوق يمين، تحت يمين، تحت شمال. (من قسم ٤ و ٥ في الشرح)`, done: R`الحافة مايلة وأوطى ناحية الشمال، وكل الشروط ✓.`, work: { h: 200, start: R`<style>
  .hero { height: 130px; background: linear-gradient(135deg, #b45309, #fbbf24); color: white; padding: 20px; font-size: 24px; }
</style>
<header class="hero">قهوة الركن</header>`, checks: [
              { say: R`الحافة المايلة بالنقط الأربعة`, q: ".hero", style: ["clip-path", "polygon(0px 0px, 100% 0px, 100% 85%, 0px 100%)"] }
            ] }, sol: R`~~~live 190 الحل
<style>
  .hero { height: 130px; background: linear-gradient(135deg, #b45309, #fbbf24); color: white; padding: 20px; font-size: 24px;
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
</style>
<header class="hero">قهوة الركن</header>
~~~

**هتشوف إيه:** مستطيل متدرّج، حافته اللي تحت مش أفقية: نازلة من اليمين لتحت ناحية الشمال.

**ليه كده:** كل نقطة (x y): [[0 0]] فوق شمال، و [[100% 0]] فوق يمين، و [[100% 85%]] تحت يمين أعلى شوية، و [[0 100%]] تحت شمال. المتصفح بيوصل النقط بالترتيب وبيقفل الشكل. والنسب بتخلّي الشكل يتمط مع الهيدر على أي شاشة.

**الغلطة الشائعة:** ترتيب النقط مش ماشي حوالين الشكل (مثلًا فوق شمال، تحت يمين، فوق يمين، تحت شمال): الخطوط بتتقاطع وبيطلع شكل فيونكة.

~~~text القياس من Chrome
.hero   clip-path: polygon(0px 0px, 100% 0px, 100% 85%, 0px 100%)     ← الصفر بقى 0px
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صورة المنظر الرمادي محتاجة تتلوّن بني البراند [[#b45309]] زي الصور المطبوعة بلون واحد. حط اللون كـ [[background-color]] واخلطه مع الصورة بـ [[multiply]]. (من قسم ٣ في الشرح)`, done: R`الصورة بقت درجات بني، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .tone { height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23e5e7eb'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23fff'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%23525252'/%3E%3C/svg%3E");
          background-size: cover; background-position: center; }
</style>
<div class="tone"></div>`, checks: [
              { say: R`تحت الصورة لون البراند`, q: ".tone", style: ["background-color", "rgb(180, 83, 9)"] },
              { say: R`الصورة بتتخلط مع اللون [[multiply]]`, q: ".tone", style: ["background-blend-mode", "multiply"] }
            ] }, sol: R`~~~live 110 الحل
<style>
  .tone { height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23e5e7eb'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23fff'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%23525252'/%3E%3C/svg%3E");
          background-size: cover; background-position: center;
          background-color: #b45309; background-blend-mode: multiply; }
</style>
<div class="tone"></div>
~~~

**هتشوف إيه:** نفس المنظر بس كله بني: السما بني متوسط، والشمس (كانت بيضا) بقت البني بتاع البراند بالظبط، والجبال بني غامق جدًا.

**ليه كده:** [[multiply]] بتضرب اللونين: الأبيض × البني = البني، والرمادي × البني = بني أغمق، والغامق × البني = أغمق. فالصورة بقت «درجات من لون واحد».

**الغلطة الشائعة:** [[mix-blend-mode: multiply]] على العنصر: ده بيخلط العنصر كله مع **الصفحة اللي وراه**، مش الصورة مع لون خلفيتها.

~~~text القياس من Chrome
.tone   background-color: rgb(180, 83, 9)    background-blend-mode: multiply
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكارت فيه شارة عليها [[mix-blend-mode: multiply]] عشان «تتطبع» على خلفية الكارت الكريمي. بس الشارة بتتخلط كمان مع الشرايط اللي ورا الكارت (الصفحة) وطالعة متلخبطة على الحواف لما الكارت بيتحرك. خلّي الخلط جوه الكارت بس، من غير ما تغيّر أي حاجة تانية في شكله. (من قسم ٢ في الشرح)`, done: R`الكارت عازل الخلط، وكل الشروط ✓.`, work: { h: 120, start: R`<style>
  .page { padding: 12px; background: repeating-linear-gradient(45deg, #1e3a8a 0 12px, #fde68a 12px 24px); }
  .card { max-width: 260px; padding: 14px; background: rgb(254 243 199 / 0.5); }
  .badge { display: inline-block; padding: 4px 10px; background: #dc2626; color: white; mix-blend-mode: multiply; }
</style>
<div class="page"><div class="card"><span class="badge">جديد</span> لاتيه بالبندق</div></div>`, checks: [
              { say: R`الكارت عليه [[isolation: isolate]]`, q: ".card", style: ["isolation", "isolate"] },
              { say: R`الشارة لسه [[multiply]]`, q: ".badge", style: ["mix-blend-mode", "multiply"] },
              { say: R`الكارت مش شفاف كله`, q: ".card", style: ["opacity", "1"] }
            ] }, sol: R`~~~live 100 بعد التصليح
<style>
  .page { padding: 12px; background: repeating-linear-gradient(45deg, #1e3a8a 0 12px, #fde68a 12px 24px); }
  .card { max-width: 260px; padding: 14px; background: rgb(254 243 199 / 0.5); isolation: isolate; }
  .badge { display: inline-block; padding: 4px 10px; background: #dc2626; color: white; mix-blend-mode: multiply; }
</style>
<div class="page"><div class="card"><span class="badge">جديد</span> لاتيه بالبندق</div></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 100 قبل
<style>
  .page { padding: 12px; background: repeating-linear-gradient(45deg, #1e3a8a 0 12px, #fde68a 12px 24px); }
  .card { max-width: 260px; padding: 14px; background: rgb(254 243 199 / 0.5); }
  .badge { display: inline-block; padding: 4px 10px; background: #dc2626; color: white; mix-blend-mode: multiply; }
</style>
<div class="page"><div class="card"><span class="badge">جديد</span> لاتيه بالبندق</div></div>
~~~

**هتشوف إيه:** قبل: الشارة الحمرا فيها خطوط مايلة غامقة من شرايط الصفحة باينة من خلالها. بعد: الشارة أحمر سادة، من غير خطوط.

**ليه:** الكارت شبه شفاف (50٪)، والشارة كانت بتتخلط مع كل اللي وراها لحد خلفية الصفحة. [[isolation: isolate]] خلّت الكارت «حد»: الشارة بتتخلط مع الكارت بس، وبعدين الكارت كله بيتحط على الصفحة عادي.

**الغلطة الشائعة:** [[opacity: 0.99]] على الكارت: بتعزل برضه (stacking context)، بس بتغيّر شكل الكارت شوية، وبتبان «حيلة» لأي حد هيقرا الكود.

~~~text القياس من Chrome
.card    isolation: isolate     opacity: 1
.badge   mix-blend-mode: multiply
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** زرار مربع 120×120 عليه [[clip-path: circle(40px)]] و [[onclick]]. لو دوست في الركن اللي فوق شمال (برّه الدايرة)، الزرار هيشتغل؟ وعرضه في DevTools هيبقى كام؟ اكتب الإجابتين، وبعدين افتح الحل وجرّب. (من قسم ٥ في الشرح)`, done: R`كتبت إن الضغط في الركن مش هيشغّل الزرار، وإن العرض لسه 120.`, sol: R`~~~live 170 الصفحة
<style>
  .round { width: 120px; height: 120px; border: 0; background: #b45309; color: white; font: inherit; clip-path: circle(40px); }
  .area { display: inline-block; outline: 2px dashed #a8a29e; }
</style>
<span class="area"><button class="round" onclick="this.textContent = 'اشتغل!'">دوس</button></span>
<p>الإطار المتقطّع = مكان الزرار الحقيقي.</p>
~~~

**الإجابة:** **لأ**، الضغط في الركن مبيشغّلوش. والعرض لسه **120px**.

**هتشوف إيه:** دايرة بني جوه إطار متقطّع مربع أكبر منها. دوس في ركن الإطار: مفيش حاجة. دوس على الدايرة: الكلام بيتغيّر لـ «اشتغل!».

**السبب:** [[clip-path]] بيغيّر الرسم **والضغط**، ومبيغيّرش الـ layout. المربع لسه واخد مكانه كامل (فالإطار حواليه 120×120)، بس الحتة المقصوصة مش بتستقبل الماوس.

~~~text القياس من Chrome
getBoundingClientRect   →  120 × 120
elementFromPoint في الركن  →  مش الزرار
~~~` }
          ]
        },
        {
          cmd: "mask",
          title: "قناع بصورة أو تدرّج: العنصر بيبان على قد ما القناع مليان، وبتلاشي ناعم وأشكال من SVG",
          pre: ["css/mix-blend-mode و clip-path", "css/background-size و background-position"],
          ref: [
            { t: "MDN: mask", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask" },
            { t: "MDN: mask-image", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image" },
            { t: "MDN: mask-mode", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-mode" },
            { t: "MDN: mask-composite", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-composite" },
            { t: "MDN: mask-type", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-type" },
            { t: "MDN: mask-border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-border" },
            { t: "MDN: Introduction to CSS masking", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Masking/Introduction" },
            { t: "CSS Masking Level 1", url: "https://www.w3.org/TR/css-masking-1/" }
          ],
          desc: R`[[mask]] بيحط «قناع» على العنصر: صورة أو تدرّج، والعنصر بيبان بس في الأماكن المليانة من القناع، وبيختفي في الشفافة، ونص نص في اللي بينهم. ده الفرق عن [[clip-path]]: الحواف ممكن تبقى ناعمة ومتدرّجة، والشكل ممكن يبقى أي صورة.
وخصائصه زي خصائص الخلفية بالظبط ([[mask-image]] و [[mask-size]] و [[mask-position]] و [[mask-repeat]] و [[mask-origin]] و [[mask-clip]])، وزيادة [[mask-mode]] و [[mask-composite]]، والمختصرة [[mask]].`,
          example: R`.long-text { mask-image: linear-gradient(black 60%, transparent); }
.icon { background-color: currentColor; mask: url("cup.svg") center / contain no-repeat; }
.ring { mask: linear-gradient(black, black), radial-gradient(circle 30px, black 98%, transparent); mask-composite: subtract; }
.photo { mask-image: radial-gradient(black 50%, transparent 72%); }`,
          flag: "script",
          lines: [
            R`الكلام بيبان عادي لحد 60٪ من الطول، وبعدها بيتلاشى لحد ما يختفي تحت: «اقرا المزيد».`,
            R`أيقونة لونها جاي من [[color]]: خلفية بلون الكلام، والـ SVG قناع بيقصّها على شكل الكوباية. في النص، ومتظبطة على الصندوق، من غير تكرار.`,
            R`قناعين: الأول مليان كله، والتاني دايرة. [[subtract]] = الأول ناقص التاني: مربع فيه فتحة دايرية.`,
            R`صورة بتتلاشى من الحواف لجوه، زي إطار ضباب.`
          ],
          teach: R`## الفكرة في سطرين

القناع صورة ([[<image>]]: [[url()]] أو تدرّج). المتصفح بيقرا **شفافية** كل نقطة فيها (أو إضاءتها، قسم ٣): المليان = العنصر يبان، والشفاف = يختفي، والنص شفاف = يبان نص شفاف. لون القناع نفسه مش مهم في الوضع العادي: [[black]] و [[red]] زي بعض، المهم الشفافية.

~~~text القياس من Chrome (الافتراضي على أي عنصر)
mask-image: none        mask-mode: match-source     mask-repeat: repeat     mask-position: 0% 0%
mask-size: auto         mask-origin: border-box     mask-clip: border-box   mask-composite: add
~~~

لاحظ الفرق عن الخلفية: [[mask-origin]] الافتراضي [[border-box]] (في الخلفية [[padding-box]]).

---

## ١. [[mask-image: linear-gradient(black 60%, transparent)]]

أسهل قناع: تدرّج من مليان لشفاف.

~~~live 160 كلام بيتلاشى وصورة بحواف ناعمة
<style>
  .fade { display: inline-block; width: 46%; vertical-align: top; margin: 4px; height: 130px; overflow: hidden; font-size: 14px; line-height: 1.6;
          mask-image: linear-gradient(black 50%, transparent); }
  .soft { display: inline-block; width: 46%; height: 130px; margin: 4px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover;
          mask-image: radial-gradient(black 45%, transparent 72%); }
</style>
<div class="fade">بدأنا قهوة الركن سنة ٢٠١٩ في محل صغير جنب المدرسة، بماكينة واحدة وتلات ترابيزات. كل يوم الصبح كنا بنحمّص كمية صغيرة، ولما تخلص نقفل. الناس بقت تيجي مخصوص، والمحل كبر، وبقى عندنا فرعين. ولسه بنحمّص كل يوم الصبح.</div>
<div class="soft"></div>
~~~

**هتشوف إيه:** اليمين فقرة نصها الأولاني واضح، والسطور اللي تحت بتبهت تدريجي لحد ما تختفي (الشكل المشهور لـ «اقرا المزيد»). الشمال المنظر بحواف ضبابية ناعمة من كل ناحية، والنص واضح.

**ليه مش طبقة بيضا فوق الكلام؟** كانت الطريقة القديمة ([[linear-gradient(transparent, white)]] فوق النص)، بس بتبوظ لو الخلفية مش بيضا أو اتغيّرت (ثيم غامق). القناع بيخلّي **الكلام نفسه** شفاف، فبيشتغل على أي خلفية.

---

## ٢. قناع من SVG: أيقونات بتتلوّن بالـ CSS

حط لون في الخلفية، واستخدم الأيقونة كقناع: الأيقونة بتاخد اللون اللي انت عايزه، ومن غير ما تعدّل ملف الـ SVG.

~~~live 90 نفس الأيقونة بتلات ألوان
<style>
  .ico { display: inline-block; width: 48px; height: 48px; margin: 8px; background-color: currentColor;
         mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2'/%3E%3C/svg%3E") center / contain no-repeat; }
</style>
<span class="ico" style="color: #b45309"></span>
<span class="ico" style="color: #0f766e"></span>
<span class="ico" style="background: linear-gradient(#fbbf24, #dc2626)"></span>
~~~

**هتشوف إيه:** تلات كوبايات: بني، وأخضر، والتالتة متدرّجة من الأصفر للأحمر. نفس ملف الـ SVG (أسود)، واللون جاي من الخلفية.

الطريقة دي بتنفع لما الأيقونة **ملف** خارجي ([[url("icons/cup.svg")]]) ومش قادر تحط فيه [[fill="currentColor"]] زي [[<svg>]] مكتوب في الصفحة (درس «color-mix و currentColor»).

---

## ٣. الخصائص كلها

أغلبها نسخة من خصائص الخلفية، بنفس القيم ونفس قواعد [[<position>]] و [[/]]:

| الخاصية | زي | القيم والملاحظات |
|---|---|---|
| [[mask-image: url("cup.svg")]] | [[background-image]] | [[none]] أو أي [[<image>]]، وأكتر من قناع بفاصلة |
| [[mask-size: contain]] | [[background-size]] | [[auto]] و [[cover]] و [[contain]] وأطوال |
| [[mask-position: center]] | [[background-position]] | المحسوب [[50% 50%]]. ومفيش [[mask-position-x]] في Chrome (اترفضت) |
| [[mask-repeat: no-repeat]] | [[background-repeat]] | الافتراضي [[repeat]]: القناع الصغير بيتكرر |
| [[mask-origin: content-box]] | [[background-origin]] | الافتراضي [[border-box]]، وكمان [[fill-box]] و [[stroke-box]] و [[view-box]] لـ SVG |
| [[mask-clip: padding-box]] | [[background-clip]] | الافتراضي [[border-box]]، وكمان [[no-clip]]. ([[text]] اترفضت) |
| [[mask-mode: luminance]] | جديدة | [[alpha]] (الشفافية) أو [[luminance]] (الإضاءة: الأبيض يبان والأسود يختفي) أو [[match-source]] (الافتراضي: الصور alpha، و [[<mask>]] بتاع SVG luminance) |
| [[mask-composite: subtract]] | جديدة | إزاي القناع ده يتجمع مع الأقنعة اللي **تحته**: [[add]] و [[subtract]] و [[intersect]] و [[exclude]] |
| [[mask]] | [[background]] | المختصرة لكل اللي فوق |

~~~text القياس من Chrome (المختصرة)
mask: url(a.svg) center / contain no-repeat   →  position 50% 50%   size contain   repeat no-repeat
mask: url(a.svg) luminance                    →  mask-mode: luminance
mask: url(a.svg) content-box padding-box      →  origin content-box   clip padding-box     ← نفس قاعدة background
mask: url(a.svg) subtract                     →  mask-composite: subtract
~~~

### [[mask-mode]]: الشفافية ولا الإضاءة؟

~~~live 120 نفس الصورة بوضعين
<style>
  .mm { display: inline-block; width: 100px; height: 100px; margin: 8px; background: linear-gradient(135deg, #fbbf24, #b45309);
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='black'/%3E%3Ccircle cx='5' cy='5' r='3.5' fill='white'/%3E%3C/svg%3E"); mask-size: 100%; }
</style>
<span class="mm" style="mask-mode: alpha"></span>
<span class="mm" style="mask-mode: luminance"></span>
~~~

**هتشوف إيه:** القناع صورة فيها مربع أسود ودايرة بيضا جواه. اليمين ([[alpha]]): مربع برتقاني كامل، لأن الصورة كلها مش شفافة (الأسود والأبيض الاتنين «مليانين»). الشمال ([[luminance]]): دايرة بس، لأن الأبيض يبان والأسود يختفي.

### [[mask-composite]]: أكتر من قناع

مع أكتر من قناع، كل قناع بيتجمع مع اللي **تحته** (الأول في القايمة فوق، زي الخلفيات):

| القيمة | النتيجة (القناع الأول ✕ اللي تحته) |
|---|---|
| [[add]] | الاتنين مع بعض (الافتراضي) |
| [[subtract]] | الأول ناقص اللي تحته |
| [[intersect]] | الحتة المشتركة بين القناعين بس |
| [[exclude]] | كل واحد ناقص المشترك |

~~~live 140 مربع ودايرة بأربع طرق
<style>
  .mc { display: inline-block; width: 90px; height: 90px; margin: 6px; background: linear-gradient(135deg, #fbbf24, #b45309); vertical-align: top;
        mask-image: linear-gradient(90deg, black 50%, transparent 50%), radial-gradient(circle 38px, black 98%, transparent); }
  .w { display: inline-block; text-align: center; font: 11px monospace; direction: ltr; }
  .w .mc { display: block; }
</style>
<span class="w"><span class="mc" style="mask-composite: add"></span>add</span>
<span class="w"><span class="mc" style="mask-composite: subtract"></span>subtract</span>
<span class="w"><span class="mc" style="mask-composite: intersect"></span>intersect</span>
<span class="w"><span class="mc" style="mask-composite: exclude"></span>exclude</span>
~~~

**هتشوف إيه** (من اليمين): القناع الأول = النص الشمال من المربع، والتاني = دايرة في النص. [[add]]: النص الشمال كامل ومعاه نص الدايرة اللي على اليمين (شكل حرف D). [[subtract]]: النص الشمال وفيه «قضمة» دايرية. [[intersect]]: نص دايرة بس (المشترك). [[exclude]]: القضمة ونص الدايرة التاني مع بعض: الاتنين ناقص المشترك.

~~~text القياس من Chrome
mask-composite: subtract  (طبقتين)  →  subtract, subtract     ← القيمة الواحدة بتتكرر لكل الطبقات
mask: linear-gradient(...), url(a.svg) exclude  →  mask-composite: add, exclude
~~~

أشهر استخدام: **فتحة** في عنصر: [[mask: linear-gradient(black, black), radial-gradient(circle 30px, black 98%, transparent); mask-composite: subtract;]] = الكل ناقص الدايرة. ولو عكست ترتيب القناعين: دايرة ناقص الكل = **مفيش حاجة** (اتشافت في صورة من Chrome).

### [[mask-type]]: على [[<mask>]] بتاع SVG

[[mask-image: url(#m)]] ممكن تشاور على [[<mask>]] مكتوب في SVG في الصفحة. [[mask-type]] بتتكتب على عنصر [[<mask>]] نفسه وبتقول هو بيتقري بالإضاءة ولا الشفافية:

~~~text القياس من Chrome
<mask> من غير CSS          →  mask-type: luminance      ← الافتراضي: الأبيض يبان
<mask style="mask-type: alpha">  →  alpha
~~~

---

## ٤. [[mask-border]] وإخواتها: مش شغالة

في المواصفة فيه نسخة «قناع» من [[border-image]] (درس «outline و box-shadow»): قناع بيتقطّع تسع حتت ويترسم على الحواف. **مفيش متصفح أساسي بيدعمها**:

| العنصر | الحالة |
|---|---|
| [[mask-border]] | مرفوضة في Chrome 157 ([[CSS.supports]] = false)، ومش Baseline |
| [[mask-border-source]] | الصورة اللي القناع بيتعمل منها. مرفوضة |
| [[mask-border-slice]] | خطوط تقطيع الصورة تسع حتت. مرفوضة |
| [[mask-border-width]] | تُخن الحافة اللي القناع بيترسم عليها. مرفوضة |
| [[mask-border-outset]] | قد إيه القناع يطلع برّه الصندوق. مرفوضة |
| [[mask-border-repeat]] | الحواف تتمط ولا تتكرر. مرفوضة |
| [[mask-border-mode]] | مرفوضة، و MDN بيقول مفيش متصفح بيدعمها |

(Safari ليه نسخة قديمة باسم [[-webkit-mask-box-image]]، من جدول التوافق في MDN. متبنيش عليها.) لو محتاج حواف بقناع، استخدم [[mask-image]] بطبقات و [[mask-composite]].

### [[-webkit-mask]]

Chrome لسه بيقبل [[-webkit-mask-image]] (الاسم القديم من قبل المواصفة)، وهتلاقيه في كود قديم كتير. النهارده الاسم من غير prefix شغال في كل المتصفحات الأساسية (Baseline 2023 حسب MDN)، فاكتب [[mask]].

---

## ٥. [[mask]] ولا [[clip-path]]؟

| | [[clip-path]] | [[mask]] |
|---|---|---|
| الحافة | حادة (يا يبان يا لأ) | ممكن تكون متدرّجة |
| الشكل | أشكال هندسية أو [[<clipPath>]] | أي صورة أو تدرّج، وبيتكرر ويتمط |
| الضغط في الحتة المختفية | **مبيوصلش** للعنصر | **بيوصل** للعنصر (اتقاس: الركن الشفاف لسه بيرجّع العنصر) |
| الأداء | أخف | أتقل شوية |

~~~text القياس من Chrome (مربع 200×200 عليه قناع دايرة 50px)
elementFromPoint في الركن (مختفي)   →  المربع نفسه     ← عكس clip-path
~~~

يعني لو عايز الحتة المختفية **متتداسش** (زرار دايري مثلًا)، [[clip-path]].

---

## ٦. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| قناع لونه رمادي على أمل «نص شفافية» | في وضع [[alpha]] الرمادي المليان = مليان. الشفافية هي اللي بتفرق |
| أيقونة كقناع من غير [[no-repeat]] | الأيقونة اتكررت بلاطات |
| [[mask-composite: subtract]] بالترتيب الغلط | العنصر اختفى كله |
| [[mask]] على زرار عشان يبقى دايرة | الأركان الشفافة لسه بتتداس. استخدم [[clip-path]] |
| [[mask-border]] | مرفوضة في كل المتصفحات الأساسية |
| [[-webkit-mask]] لوحدها | شغالة بس قديمة. اكتب [[mask]] |
| طبقة بيضا متدرّجة فوق الكلام بدل القناع | بتبوظ مع أي خلفية غير الأبيض |

---

## الخلاصة

- القناع صورة: المليان يبان، والشفاف يختفي. اللون مش مهم في وضع [[alpha]].
- نفس خصائص الخلفية ([[mask-size]] و [[mask-position]] و [[mask-repeat]] و [[mask-origin]] و [[mask-clip]])، والمختصرة [[mask]].
- [[mask-mode: luminance]]: الأبيض يبان والأسود يختفي. و [[mask-type]] نفس الفكرة على [[<mask>]] في SVG.
- [[mask-composite]]: [[add]] و [[subtract]] و [[intersect]] و [[exclude]] مع الأقنعة اللي تحت.
- [[mask-border]] مش شغالة. و [[mask]] مش بيمنع الضغط زي [[clip-path]].`,
          try: R`اعمل [[mask.html]] فيه: فقرة طويلة بتتلاشى من تحت بقناع تدرّج، وتلات أيقونات «كوباية» من نفس الـ SVG بتلات ألوان بـ [[mask]] و [[background-color]]، وصورة (المنظر من الشرح) بحواف ضبابية. وبعدين غيّر خلفية الصفحة لغامق وشوف الفقرة لسه بتتلاشى صح.`,
          sol: R`~~~live 270 mask.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أقنعة</title>
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; background: #1c1917; color: #f5f5f4; }
  .story { max-height: 90px; overflow: hidden; line-height: 1.7; mask-image: linear-gradient(black 40%, transparent); }
  .icons { display: flex; gap: 12px; margin: 12px 0; }
  .cup { width: 40px; height: 40px; background-color: currentColor;
         mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2'/%3E%3C/svg%3E") center / contain no-repeat; }
  .photo { height: 90px;
           background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%237dd3fc'/%3E%3Ccircle cx='90' cy='18' r='10' fill='%23facc15'/%3E%3Cpath d='M0 60L35 25L60 50L85 30L120 60Z' fill='%2316a34a'/%3E%3C/svg%3E") center / cover;
           mask-image: radial-gradient(black 45%, transparent 72%); }
</style>
</head>
<body>
<p class="story">بدأنا قهوة الركن سنة ٢٠١٩ في محل صغير جنب المدرسة، بماكينة واحدة وتلات ترابيزات. كل يوم الصبح كنا بنحمّص كمية صغيرة، ولما تخلص نقفل. الناس بقت تيجي مخصوص، والمحل كبر، وبقى عندنا فرعين.</p>
<div class="icons">
  <span class="cup" style="color: #fbbf24"></span>
  <span class="cup" style="color: #34d399"></span>
  <span class="cup" style="color: #f87171"></span>
</div>
<div class="photo"></div>
</body>
</html>
~~~

**هتشوف إيه:** خلفية غامقة، والفقرة الفاتحة بتبهت لحد ما تختفي في الخلفية الغامقة (من غير أي طبقة بيضا). تلات كوبايات: صفرا وخضرا وحمرا. والمنظر بحواف ذايبة في الخلفية الغامقة.

~~~text القياس من Chrome
.story   mask-image: linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0))
.cup     mask-size: contain   mask-repeat: no-repeat   mask-position: 50% 50%
~~~

**ليه شغّال على الغامق:** القناع بيخلّي الكلام نفسه شفاف، فاللي ورا (أيًا كان لونه) بيبان. لو كنا عاملينها بطبقة بيضا، كان هيبقى فيه مستطيل أبيض على الخلفية الغامقة.`,
          deep: {
            why: R`حاجات كتير «ناعمة» مستحيلة بـ [[clip-path]]: كلام بيتلاشى، وصورة بحواف ضبابية، وأيقونة بتتلوّن من ملف خارجي، وفتحات في عناصر. القناع بيعملها على المحتوى الحقيقي (كلام بيتنسخ، وصورة حقيقية)، ومن غير صور مقصوصة جاهزة، وبيشتغل على أي خلفية.`,
            how: R`لكل طبقة قناع المتصفح بيحسب مكانها ومقاسها وتكرارها بنفس طريقة طبقات الخلفية، على [[mask-origin]]، ومقصوصة عند [[mask-clip]]. بعدين بيحوّل كل طبقة لقيم من 0 لـ 1 (الشفافية في [[alpha]]، أو الإضاءة في [[luminance]])، ويجمّع الطبقات من تحت لفوق بـ [[mask-composite]]، ويضرب شفافية كل بكسل في العنصر في القيمة دي. ده بيحصل وقت الرسم بس، فالـ layout والضغط مبيتأثروش.`,
            when: R`تدرّج: «اقرا المزيد»، وحافة شريط بسكرول بتتلاشى، وصور بحواف ناعمة. SVG: أيقونات بتتلوّن من الـ CSS، وأشكال زينة (فرشاة، وتموّج). [[mask-composite]]: فتحات، وإطارات بأشكال. [[luminance]]: لما القناع صورة أبيض وأسود من غير شفافية.`,
            mistakes: R`قناع رمادي في وضع alpha. أيقونة بتتكرر. ترتيب [[subtract]] غلط. [[mask]] بدل [[clip-path]] لما الضغط مهم. [[mask-border]]. وطبقة بيضا بدل القناع.`
          },
          practice: [
            { lvl: 'سريع', t: R`**ابني:** وصف المنتج طويل ومقصوص بـ [[overflow: hidden]]، والقص حاد ووحش. خلّي الكلام يبان عادي لحد 60٪ من الطول وبعدها يتلاشى لحد شفاف: [[mask-image]] بتدرّج من [[black 60%]] لـ [[transparent]]. (من قسم ١ في الشرح)`, done: R`الكلام بيبهت تدريجي من تحت، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .desc { max-width: 300px; max-height: 96px; overflow: hidden; line-height: 1.6; }
</style>
<p class="desc">بن جبلي محمّص تحميص متوسط، فيه طعم شوكولاتة ومكسرات وحموضة خفيفة. مناسب للإسبريسو وللقهوة الفلتر. بيتحمّص كل يوم الصبح ويتعبّى في أكياس بصمام عشان يفضل طازة لحد أسبوعين من فتحه.</p>`, checks: [
              { say: R`قناع متدرّج من مليان عند 60٪ لشفاف`, q: ".desc", style: ["mask-image", "linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0))"] }
            ] }, sol: R`~~~live 120 الحل
<style>
  .desc { max-width: 300px; max-height: 96px; overflow: hidden; line-height: 1.6;
          mask-image: linear-gradient(black 60%, transparent); }
</style>
<p class="desc">بن جبلي محمّص تحميص متوسط، فيه طعم شوكولاتة ومكسرات وحموضة خفيفة. مناسب للإسبريسو وللقهوة الفلتر. بيتحمّص كل يوم الصبح ويتعبّى في أكياس بصمام عشان يفضل طازة لحد أسبوعين من فتحه.</p>
~~~

**هتشوف إيه:** أول سطرين واضحين، والسطر التالت باهت، والرابع شبه مختفي، ومفيش قص حاد.

**ليه كده:** التدرّج من غير اتجاه = من فوق لتحت. لحد 60٪ أسود مليان (الكلام يبان كامل)، وبعدها الشفافية بتزيد لحد [[transparent]] تحت خالص. ولون [[black]] مش مهم: أي لون مليان بيعمل نفس الحاجة.

**الغلطة الشائعة:** [[linear-gradient(transparent, black)]]: العكس: الكلام يبدأ مختفي من فوق.

~~~text القياس من Chrome
.desc   mask-image: linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0))
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** أيقونة الكوباية ملف SVG أسود (في التعليق) ومش عايز تعدّله. خلّي [[.cup]] يرسمها بلون الكلام: خلفية [[currentColor]]، والـ SVG قناع في النص، ومتظبط على الصندوق ([[contain]])، ومن غير تكرار. ولون [[.cup]] نفسه [[#0f766e]]. (من قسم ٢ و ٣ في الشرح)`, done: R`كوباية خضرا واحدة في النص، وكل الشروط ✓.`, work: { h: 100, start: R`<style>
  .cup { display: inline-block; width: 56px; height: 56px; }
  /* الأيقونة:
     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2'/%3E%3C/svg%3E")
  */
</style>
<span class="cup"></span>`, checks: [
              { say: R`الخلفية بلون الكلام الأخضر`, q: ".cup", style: ["background-color", "rgb(15, 118, 110)"] },
              { say: R`القناع مرة واحدة`, q: ".cup", style: ["mask-repeat", "no-repeat"] },
              { say: R`القناع في النص`, q: ".cup", style: ["mask-position", "50% 50%"] },
              { say: R`القناع متظبط على الصندوق`, q: ".cup", style: ["mask-size", "contain"] }
            ] }, sol: R`~~~live 80 الحل
<style>
  .cup { display: inline-block; width: 56px; height: 56px;
         color: #0f766e; background-color: currentColor;
         mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 9h2a2 2 0 0 1 0 5h-2'/%3E%3C/svg%3E") center / contain no-repeat; }
</style>
<span class="cup"></span>
~~~

**هتشوف إيه:** كوباية خضرا واحدة بودن على الشمال.

**ليه كده:** الصندوق كله أخضر (الخلفية)، والقناع خلّى الأخضر يبان بس مكان رسمة الكوباية. ولو غيّرت [[color]] (في الـ hover مثلًا)، الكوباية بتتغيّر.

**الغلطة الشائعة:** تنسى [[no-repeat]] أو [[contain]]: الكوباية بتطلع بمقاسها الأصلي (24px) ومتكررة في الصندوق.

~~~text القياس من Chrome
.cup   background-color: rgb(15, 118, 110)   mask-repeat: no-repeat   mask-position: 50% 50%   mask-size: contain
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المفروض الكارت فيه فتحة دايرية في النص (زي تذكرة متخرّمة)، بس الكارت **اختفى خالص**. القناعين صح، والمشكلة في ترتيبهم مع [[subtract]]. (من قسم ٣ في الشرح: «[[mask-composite]]»)`, done: R`الكارت باين وفي نصه فتحة، وكل الشروط ✓.`, work: { h: 140, start: R`<style>
  .ticket { width: 200px; height: 100px; background: linear-gradient(135deg, #fbbf24, #b45309);
            mask-image: radial-gradient(circle 24px, black 98%, transparent), linear-gradient(black, black);
            mask-composite: subtract; }
</style>
<div class="ticket"></div>`, checks: [
              { say: R`القناع المليان الأول، والدايرة تحته`, q: ".ticket", style: ["mask-image", "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)), radial-gradient(24px, rgb(0, 0, 0) 98%, rgba(0, 0, 0, 0))"] },
              { say: R`لسه [[subtract]]`, q: ".ticket", style: ["mask-composite", "subtract, subtract"] }
            ] }, sol: R`~~~live 120 بعد التصليح
<style>
  .ticket { width: 200px; height: 100px; background: linear-gradient(135deg, #fbbf24, #b45309);
            mask-image: linear-gradient(black, black), radial-gradient(circle 24px, black 98%, transparent);
            mask-composite: subtract; }
</style>
<div class="ticket"></div>
~~~

وده اللي كان باين قبل التصليح:

~~~live 120 قبل
<style>
  .ticket { width: 200px; height: 100px; background: linear-gradient(135deg, #fbbf24, #b45309);
            mask-image: radial-gradient(circle 24px, black 98%, transparent), linear-gradient(black, black);
            mask-composite: subtract; }
</style>
<div class="ticket"></div>
~~~

**هتشوف إيه:** قبل: ولا حاجة، مساحة فاضية. بعد: مستطيل متدرّج برتقاني وفي نصه دايرة فاضية باين منها اللي وراه.

**ليه:** [[subtract]] = «القناع ده ناقص اللي تحته». كان الأول (اللي فوق) الدايرة، فبقى «الدايرة ناقص الكل» = مفيش. لما المليان بقى الأول: «الكل ناقص الدايرة» = فتحة.

**حل تاني صح:** [[mask-composite: exclude]] بأي ترتيب: الاتنين ناقص المشترك، والمشترك هنا هو الدايرة.

~~~text القياس من Chrome
mask-image: linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)), radial-gradient(24px, rgb(0, 0, 0) 98%, rgba(0, 0, 0, 0))
mask-composite: subtract, subtract
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** زرارين مربعين 120×120 بيبانوا دايرة: واحد بـ [[clip-path: circle(50%)]] وواحد بـ [[mask-image: radial-gradient(circle, black 70%, transparent 71%)]]. دوس في الركن الفاضي بتاع كل واحد. مين بيشتغل؟ اكتب النتيجة والسبب. (من قسم ٥ في الشرح)`, done: R`لقيت إن الركن بيشغّل زرار الـ mask بس، وعرفت ليه.`, sol: R`~~~live 180 الصفحة
<style>
  .b { width: 120px; height: 120px; margin: 8px; border: 0; background: #b45309; color: white; font: inherit; }
  .clip { clip-path: circle(50%); }
  .mask { mask-image: radial-gradient(circle, black 70%, transparent 71%); }
  .area { display: inline-block; outline: 2px dashed #a8a29e; margin: 4px; }
</style>
<span class="area"><button class="b clip" onclick="this.textContent = 'clip اشتغل'">clip-path</button></span>
<span class="area"><button class="b mask" onclick="this.textContent = 'mask اشتغل'">mask</button></span>
<p>دوس في ركن كل إطار متقطّع.</p>
~~~

**النتيجة:** الركن بتاع زرار [[mask]] **بيشغّله**. الركن بتاع [[clip-path]] مبيعملش حاجة.

**هتشوف إيه:** دايرتين بني شبه بعض بالظبط جوه إطارين متقطّعين. دوس في ركن الإطار الشمال (mask): الكلام بيتغيّر لـ «mask اشتغل». الركن اليمين (clip-path): مفيش حاجة.

**السبب:** [[clip-path]] بيقص الرسم **والضغط** (المقصوص مش جزء من العنصر للماوس). [[mask]] بيغيّر الرسم بس: العنصر لسه مستطيل كامل للماوس، والركن الشفاف لسه «هو».

**الخلاصة العملية:** زرار أو لينك بشكل غير مستطيل ← [[clip-path]]. تأثير بصري ناعم ← [[mask]].

~~~text القياس من Chrome
clip-path: الركن  →  elementFromPoint = body
mask:      الركن  →  elementFromPoint = الزرار نفسه
~~~` }
          ]
        }
      ]
    }
]);
