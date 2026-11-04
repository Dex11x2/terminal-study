// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الثيم والعربي والخطوط والأيقونات",
      l: 2,
      n: "dark mode من غير وميض، ومكونات بتتقلب لوحدها في العربي، وخط بيتحمّل صح، وأيقونات ليها اسم",
      projects: [
        { lvl: 'صغير', t: R`زرار ثيم بتلات اختيارات`, what: R`segmented control فيه فاتح وغامق و«زي الجهاز»، معمول من ٣ [[<input type="radio">]] متنسّقين (مش div)، والاختيار بيتحط [[data-theme]] على html بسكربت inline في الـ head قبل الرسم، ويتحفظ في localStorage جوه [[try/catch]]، و [[color-scheme]] بيتغير معاه. من درس dark mode.`, done: R`refresh على كل اختيار من التلاتة من غير ولا frame غلط (Performance › Screenshots)، و«زي الجهاز» بيتقلب لوحده لو غيّرت ثيم الجهاز والصفحة مفتوحة، والأسهم بتتنقل بين الاختيارات (ده شغل الـ radio ببلاش)، و axe صفر مشاكل.` },
        { lvl: 'صغير', t: R`كارت تعليق بلغتين`, what: R`كارت فيه صورة ودايرة حالة واسم ووقت وزرار «رد» بسهم و badge «جديد» في الركن، مكتوب بـ logical properties بس (CSS عادي أو Tailwind)، وزرار فوق بيقلب [[dir]] و [[lang]] على html. من درس logical properties و lucide-react.`, done: R`ملف الـ CSS مفيهوش ولا [[left]] ولا [[right]] ولا [[[dir=rtl]]]، والسهم بس عليه [[rtl:-scale-x-100]]، ولقطة RTL مراية للقطة LTR، واسم إنجليزي فيه رموز في آخره بيظهر صح جوه الجملة العربي.` },
        { lvl: 'متوسط', t: R`منيو مطعم «الركن الأخضر» بلغتين`, what: R`صفحة منيو (مطعم متخيل) فيها أقسام وأطباق وأسعار. النصوص في dictionary بـ [[data-i18n="key"]]، وزرار اللغة بيغيّر [[lang]] و [[dir]] والنصوص من غير reload ويفتكر الاختيار. الأسعار بـ [[Intl.NumberFormat]] (‏[[ar-EG]] و [[en-US]] بعملة [[EGP]]) وعمودها [[font-variant-numeric: tabular-nums]]، وخط لكل لغة بـ [[:lang(ar)]] و [[:lang(en)]]، والخطوط woff2 من الموقع بـ [[unicode-range]]. بيجمع الدروس التلاتة الأولى.`, done: R`تبديل اللغة بيغيّر الاتجاه والنصوص وشكل الأسعار في نفس اللحظة، وأرقام عمود الأسعار متصفّة تحت بعض، والاختيار فاضل بعد refresh، وصفحة عربي بس بتنزّل ملف الخط العربي بس (Network › Font)، ومفيش ولا [[[dir=rtl]]] في الـ CSS.` },
        { lvl: 'متوسط', t: R`استوديو الألوان`, what: R`صفحة فيها slider لدرجة اللون (hue من 0 لـ 360) بيولّد من لون واحد كل التوكنز: [[--brand]] بـ [[oklch()]]، و [[--brand-soft]] و [[--ring]] بـ [[color-mix(in oklab, var(--brand) 20%, transparent)]]، ونسخة للغامق أفتح شوية. تحت الـ slider عينات: زرار، و badge، ولينك، وحقل بـ focus، و alert نجاح وخطر (الألوان الوظيفية ثابتة مش بتتغير مع البراند). من dark mode، ومتغيرات CSS في الوحدة اللي فاتت.`, done: R`تحريك الـ slider بيغيّر كل العينات في الثيمين من غير ما تلمس غير متغير واحد، و alerts النجاح والخطر لونها مبيتغيرش، وفيه ٣ درجات hue موثّقة في الصفحة إن كلامها 4.5:1 أو أكتر في الوضعين (من DevTools).` },
        { lvl: 'كبير', t: R`landing ثنائية اللغة لاستوديو تصوير متخيل «عدسة»`, what: R`صفحة كاملة (هيرو، وخدمات، وأعمال، وأسعار، وFAQ، وفوتر) بالعربي والإنجليزي على [[/ar]] و [[/en]]. توكنز طبقتين (خام ثم [[@theme]] دلالي)، و ٣ ثيمات من غير وميض، و RTL و LTR بالـ logical properties بس، وخطين woff2 من الموقع بـ [[unicode-range]] و [[swap]] و preload لخط العناوين بس، وضبط العربي ([[line-height: 1.85]] للفقرات و [[letter-spacing: 0]] لـ [[:lang(ar)]] وعناوين بـ [[clamp()]])، وأيقونات lucide بـ [[aria-hidden]] أو اسم. وفيها من تأثيرات المشاريع الحقيقية: navbar زجاجي sticky ([[backdrop-filter]] ومعاه [[@supports not]] بخلفية شبه مصمتة)، وهيرو بـ ٣ [[radial-gradient]] وطبقة noise خفيفة من SVG [[feTurbulence]] في data URI بـ [[pointer-events: none]]. بيجمع الوحدة دي مع الوحدات والمتغيرات و Tailwind.`, done: R`Lighthouse (Mobile) في اللغتين والثيمين: Accessibility ‏100 و Performance ‏90 أو أكتر و CLS أقل من 0.05. صفر طلبات خطوط لدومين تاني. الصفحة شغالة والـ JavaScript مقفول (الثيم من [[prefers-color-scheme]] واللغة من الـ URL). لقطة RTL مراية LTR. وفيه README بجدول: كل توكن واستخدامه.`, ext: R`زوّد ثيم [[prefers-contrast: more]] و [[forced-colors]] (Windows High Contrast)، واعمل صفحة style guide بتعرض التوكنز كلها، وانشرها على GitHub Pages برابط.` },
        { lvl: 'فكرة', t: R`هوية بصرية لمشروعك انت`, what: R`اختار مشروع عايز تعمله (أو موقعك الشخصي)، وقرر هويته: palette بـ oklch بثيمين، وخطين (عربي ولاتيني) بأسباب الاختيار، ومقياس مسافات و radius وظلال (ظل صغير حاد + ظل كبير ناعم)، وطبقات [[z-index]] بأسامي ([[--z-header]] و [[--z-modal]])، ومدد وحركة ([[--ease]]). واعمل صفحة واحدة بتعرضهم كلهم في الثيمين والاتجاهين.`, done: R`أي مكوّن جديد في المشروع بيتبني من التوكنز من غير ولا قيمة hard-coded، والصفحة فيها كل توكن بمثال حي وبتباينه.`, ext: R`صدّر التوكنز كـ JSON، وولّد منه [[@theme]] بتاع Tailwind ومتغيرات CSS عادية بسكربت صغير، فالتعديل بيبقى في مكان واحد.` },
      ],
      items: [
        {
          cmd: "dark mode",
          title: "وضع غامق بزرار ومن غير وميض",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الجهاز على dark، و [[localStorage.theme]] فيه [[light]]، والـ CSS فيه [[@custom-variant dark (&:where(.dark, .dark *));]]. خلفية [[<body className="bg-white dark:bg-gray-950">]] هتبقى إيه؟ وهتبقى إيه لو مسحت سطر [[@custom-variant]]؟ اكتب الإجابتين، وبعدين جرّب من DevTools › Rendering › Emulate CSS media feature [[prefers-color-scheme]].`, done: R`كتبت أبيض في الأولى (الكلاس [[light]] اللي على html هو اللي بيحكم مش الجهاز)، وغامق في التانية (من غير السطر [[dark:]] بيرجع يسمع للجهاز ويتجاهل الزرار)، والتجربة طابقت الاتنين.`, sol: R`~~~css in.css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl" class="light">
<head><meta charset="utf-8"><title>مين بيحكم؟</title><link rel="stylesheet" href="out.css"></head>
<body class="bg-white dark:bg-gray-950">الخلفية</body>
</html>
~~~

**الحالة الأولى (السطر موجود):** [[@custom-variant dark]] بيغيّر معنى [[dark:]] من «إعداد الجهاز» لـ «فيه كلاس [[.dark]] على العنصر أو على أب ليه». الـ html عليه [[light]] مش [[dark]]، فالقاعدة مبتتطبقش، والخلفية بيضا رغم إن الجهاز غامق.

**الحالة التانية (السطر ممسوح):** [[dark:]] بترجع للافتراضي: [[@media (prefers-color-scheme: dark)]]. الجهاز غامق، فالخلفية غامقة، والكلاس [[light]] ملوش أي تأثير. يعني زرار الثيم بقى ملوش لازمة.

**الغلطة الشائعة:** تعمل زرار ثيم، وتجرّب على جهاز فاتح فيبان شغال، لأنك بتقلب ناحية واحدة بس. جرّب والجهاز غامق والاختيار فاتح.

~~~text الناتج
الجهاز dark ، و html عليه class="light"

بـ @custom-variant:   rgb(255, 255, 255)           أبيض
من غيره:              oklch(0.13 0.028 261.692)    غامق
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة HTML عادية من غير Tailwind ولا React: كل الألوان توكنز في [[:root]] ([[--bg]] و [[--surface]] و [[--fg]] و [[--muted]] و [[--brand]] و [[--line]])، و [[:root[data-theme="dark"]]] بيعيد تعريفهم هما بس، ومعاهم [[color-scheme]] في الاتنين. زرار [[role="switch"]] بـ [[aria-checked]] بيبدّل ويحفظ في localStorage جوه [[try/catch]].`, done: R`مفيش ولا لون (hex أو [[rgb(]] أو [[oklch(]]) برا بلوكات التوكنز، والزرار بيقلب الصفحة كلها ومعاها الـ scrollbar وحقل input، وقارئ الشاشة (أو Accessibility pane في DevTools) بيقول switch و on/off. ولو فتحتها في نافذة Incognito والكوكيز متقفلة (localStorage بيرمي error) الصفحة لسه بتشتغل والزرار بيقلب، بس مش بيفتكر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>توكنز الثيم</title>
<style>
  :root {
    color-scheme: light;
    --bg: #f8fafc;
    --surface: #ffffff;
    --fg: #0f172a;
    --muted: #475569;
    --brand: #0f766e;
    --line: #cbd5e1;
  }
  :root[data-theme="dark"] {
    color-scheme: dark;
    --bg: #0b1120;
    --surface: #1e293b;
    --fg: #f1f5f9;
    --muted: #94a3b8;
    --brand: #2dd4bf;
    --line: #475569;
  }
  body { margin: 0; padding: 1.5rem; font-family: system-ui, sans-serif; background: var(--bg); color: var(--fg); }
  .card { max-width: 28rem; margin-block-start: 1rem; padding: 1.5rem; border: 1px solid var(--line); border-radius: .75rem; background: var(--surface); }
  .card p { color: var(--muted); }
  .card a { color: var(--brand); }
  input { display: block; width: 100%; box-sizing: border-box; padding: .5rem; }
  #theme { min-block-size: 2.75rem; padding-inline: 1rem; border: 1px solid var(--line); border-radius: .5rem; background: var(--surface); color: var(--fg); font: inherit; }
</style>
</head>
<body>
<main>
  <h1>الإعدادات</h1>
  <button id="theme" type="button" role="switch" aria-checked="false">الوضع الغامق</button>
  <section class="card">
    <h2>حسابك</h2>
    <p>غيّر بياناتك من هنا.</p>
    <label for="name">الاسم</label>
    <input id="name" value="سارة">
    <p><a href="#help">محتاج مساعدة؟</a></p>
  </section>
  <div style="height: 150vh"></div>
</main>
<script>
  const root = document.documentElement;
  const btn = document.getElementById("theme");

  function read() {
    try { return localStorage.getItem("theme"); } catch { return null; }
  }
  function save(value) {
    try { localStorage.setItem("theme", value); } catch { /* مفيش تخزين: الزرار يشتغل برضه */ }
  }
  function apply(dark) {
    root.dataset.theme = dark ? "dark" : "light";
    btn.setAttribute("aria-checked", String(dark));
  }

  apply(read() === "dark");
  btn.addEventListener("click", () => {
    const dark = btn.getAttribute("aria-checked") !== "true";
    apply(dark);
    save(dark ? "dark" : "light");
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- كل لون متعرّف مرتين بس: في [[:root]] و [[:root[data-theme="dark"]]]. باقي الـ CSS بيقول [[var(--bg)]] ومبيعرفش فيه كام ثيم.
- [[color-scheme]] بيقول للمتصفح يرسم حاجاته هو بالثيم ده: الـ scrollbar وحقول الـ input والـ checkbox. من غيره تبقى صفحة غامقة وفيها input أبيض.
- [[role="switch"]] مع [[aria-checked]]: القارئ بيقول «switch، on». والزرار الحقيقي بيجيب Tab و Enter و Space ببلاش.
- [[try/catch]] حوالين كل وصول لـ localStorage: في بعض إعدادات الخصوصية مجرد قراية [[localStorage]] بترمي [[SecurityError]]، ومن غيره السكربت كله يقف والزرار يموت.

**الغلطة الشائعة:** تقرا [[localStorage]] من غير [[try]]، لأنه مبيقعش عندك أبدًا. جرّبها بإنك تعرّف [[localStorage]] يرمي error قبل سكربت الصفحة.

~~~text الناتج
فاتح:  data-theme=light ، background rgb(248, 250, 252) ، color-scheme light
       input rgb(255, 255, 255) ، aria-checked false

بعد الضغط:
غامق:  data-theme=dark ، background rgb(11, 17, 32) ، color-scheme dark
       input rgb(59, 59, 59) (اتغيّر من color-scheme لوحده)

بعد reload: لسه dark
ariaSnapshot:  - switch "الوضع الغامق" [checked]
grep على ألوان برا بلوكات التوكنز: صفر
axe: صفر في الوضعين ، وعلى 360 مفيش scroll أفقي

localStorage بيرمي SecurityError:
الزرار قلب لـ dark ، وبعد reload رجع light (بيشتغل بس مش بيفتكر)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الثيم بيتحط في [[useEffect]] بعد ما الصفحة تترسم: [[document.documentElement.classList.toggle("dark", localStorage.theme === "dark")]]. اختار dark واعمل refresh: الصفحة بتفتح بيضا لحظة وبعدين تغمق. صلّحه من غير next-themes: سكربت inline صغير في أول الـ [[<head>]] بيعمل نفس السطر قبل الرسم، وبيرجع لـ [[matchMedia("(prefers-color-scheme: dark)")]] لو مفيش اختيار.`, done: R`في DevTools › Performance مع CPU 4x slowdown و Screenshots شغالة، أول frame فيه محتوى غامق ومفيش ولا frame أبيض. وفي View Source السكربت قبل أي [[<link rel="stylesheet">]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<script>
  (function () {
    let stored = null;
    try { stored = localStorage.getItem("theme"); } catch {}
    const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  })();
$__lt/script>
<title>بعد</title>
<style>
  body { margin: 0; min-height: 100vh; background: #fff; color: #111; font: 2rem system-ui; }
  .dark body { background: #0b1120; color: #f1f5f9; }
</style>
</head>
<body>
<main><h1>الصفحة</h1></main>
</body>
</html>
~~~

**ليه الوميض بيحصل:** [[useEffect]] بيشتغل بعد أول رسم. المتصفح بيرسم الصفحة بيضا، وبعدين الكود يحط [[.dark]]. وأي صفحة جاية من السيرفر هتعمل كده، لأن السيرفر مش عارف اختيار المستخدم.

**التصليح:** سكربت inline في أول [[<head>]]. السكربتات اللي من غير [[defer]] بتوقّف قراية الـ HTML، فالمتصفح مبيرسمش حاجة لحد ما يخلص. السكربت لازم يبقى inline: لو ملف خارجي، هتستنى الشبكة قبل أول رسم.

**المنطق:** لو فيه اختيار محفوظ خده، ولو مفيش اسأل [[matchMedia]].

**في React:** ضيف [[suppressHydrationWarning]] على [[<html>]]، لأن الكلاس اتغيّر قبل hydration.

**الغلطة الشائعة:** تحط السكربت في آخر [[<body>]] أو تعمله [[defer]]، فيرجع الوميض. وتنسى [[try/catch]]، فخطأ في localStorage يوقّف الصفحة.

~~~text الناتج
ألوان الـ frames بعد الفتح (localStorage.theme = dark ، CPU 4x):

قبل:  أحمر (الصفحة القديمة) ← 255,255,255 (أبيض) ← 11,17,32 (غامق)
بعد:  أحمر (الصفحة القديمة) ← 11,17,32 (غامق)

من غير اختيار محفوظ والجهاز dark: html عليه class="dark"
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** لون البراند [[#0d9488]] كلام على الأبيض تباينه 3.74:1، والكلام الأبيض على زرار بنفس اللون برضه 3.74:1، والاتنين ساقطين. اعمل توكنين [[--brand]] و [[--on-brand]] (لون الكلام اللي فوق البراند) بقيمة للفاتح وقيمة للغامق [[#0b1120]]، من نفس عيلة اللون، بحيث الأربع حالات (براند على الخلفية، وكلام على الزرار، في الوضعين) كلها 4.5:1 أو أكتر.`, done: R`الأربع أرقام من مربع اللون في DevTools فوق 4.5. حل واحد اتقاس: [[#0f766e]] للفاتح (5.47 على الأبيض، و 5.47 للأبيض عليه)، و [[#2dd4bf]] للغامق بكلام [[#0b1120]] على الزرار (10.12 في الاتجاهين). والغامق مش «نفس اللون مقلوب»: البراند فيه أفتح.`, sol: R`~~~css tokens.css
:root {
  --bg: #ffffff;
  --brand: #0f766e;
  --on-brand: #ffffff;
}
:root.dark {
  --bg: #0b1120;
  --brand: #2dd4bf;
  --on-brand: #0b1120;
}
.link { color: var(--brand); }
.btn  { background: var(--brand); color: var(--on-brand); }
~~~

**طريقة الحل:** الحساب بيقول إن اللون الواحد مش هينفع. [[#0d9488]] في المنطقة الوسط، فبيقع مع الأبيض من الناحيتين. فبنعمل حاجتين:

- الفاتح: نغمّق البراند درجة ([[#0f766e]]). الكلام عليه أبيض.
- الغامق: البراند لازم يبقى **أفتح** عشان يتشاف على خلفية غامقة ([[#2dd4bf]]). وبما إنه بقى فاتح، الكلام عليه لازم يبقى غامق. وعشان كده [[--on-brand]] توكن لوحده، مش أبيض ثابت.

ونفس العيلة (teal)، فالهوية مش بتتغيّر.

**الغلطة الشائعة:** تثبّت [[color: white]] على الزرار في الوضعين، فالزرار في الغامق يبقى أبيض على فاتح. أو تقلب اللون رياضيًا بدل ما تقيسه.

~~~text الناتج
الأصلي #0d9488 مع الأبيض:   3.74:1 ساقط

                         التباين
فاتح: براند على أبيض     5.47:1
فاتح: أبيض على البراند   5.47:1
غامق: براند على #0b1120  10.12:1
غامق: #0b1120 على البراند 10.12:1
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** كارت فيه [[bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800]] ومتكرر في ١٢ مكوّن. حوّله لطبقتين: متغيرات خام في [[:root]] و [[.dark]]، وبعدين [[@theme inline]] فيه [[--color-bg: var(--bg)]] وأخواتها، فالكلاس يبقى [[bg-bg text-fg border-line]] من غير ولا [[dark:]].`, done: R`[[grep -rc "dark:" src/components]] بيطلع صفر (أو بس للحاجات اللي فعلًا مختلفة، زي صورة ليها نسخة غامقة)، ولقطة الشاشة قبل وبعد في الوضعين متطابقة، وإضافة لون جديد بقت سطرين في ملف واحد.`, sol: R`~~~css in.css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: var(--color-white);
  --fg: var(--color-gray-900);
  --line: var(--color-gray-200);
}
.dark {
  --bg: var(--color-gray-950);
  --fg: var(--color-gray-100);
  --line: var(--color-gray-800);
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-line: var(--line);
}
~~~

~~~html بعد
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كارت</title><link rel="stylesheet" href="out.css"></head>
<body class="p-6">
<main>
  <article class="rounded-xl border bg-bg p-6 text-fg border-line">
    <h1 class="text-xl font-bold">كارت</h1>
  </article>
</main>
</body>
</html>
~~~

**الطبقتين:**

1. **المتغيرات الخام** في [[:root]] و [[.dark]]: هي اللي بتتغيّر مع الثيم.
2. **[[@theme inline]]**: بتعرّف Tailwind عليها. [[inline]] مهمة: من غيرها القيمة بتتحسب مرة على [[:root]] والكلاس [[.dark]] تحت مش بيأثر، زي ما شفنا في درس [[@theme]].

الكلاس [[bg-bg text-fg border-line]] بقى بيقول معنى، والـ [[dark:]] اختفت. إضافة لون: سطر في [[:root]] وسطر في [[.dark]] وسطر في [[@theme inline]].

**امتى تسيب [[dark:]]:** لما الحاجة مختلفة فعلًا، زي صورة ليها نسخة غامقة.

**الغلطة الشائعة:** تعمل [[@theme]] من غير [[inline]]، فالوضع الفاتح يبان سليم والغامق مبيتغيرش.

~~~text الناتج
لقطة قبل وبعد في الوضع الفاتح: متطابقة byte بـ byte
لقطة قبل وبعد في الوضع الغامق: متطابقة byte بـ byte
grep -c "dark:" في الـ HTML بعد التحويل: 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** حط [[* { transition: background-color .4s, color .4s }]] ودوس زرار الثيم: كل عنصر بيتلوّن لوحده والصفحة «بتسيح». اعمل نسخة تانية فيها كلاس [[theme-switching]] على html بيقفل الـ transitions ([[.theme-switching * { transition: none !important }]])، يتحط قبل التبديل ويتشال بعد [[requestAnimationFrame]] مرتين. وقيس الفرق بـ [[document.getAnimations().length]] في الكونسول على طول بعد الضغطة.`, done: R`النسخة الأولى بتطلّع رقم أكبر من صفر (في صفحة فيها body و ٤ عناصر اتقاس 5 transitions شغالين مع بعض)، والتانية صفر والتبديل بيبان في frame واحد. وفهمت إن ده نفس اللي [[disableTransitionOnChange]] بيعمله في next-themes.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>تبديل نضيف</title>
<style>
  :root { --bg: #fff; --fg: #111; }
  :root.dark { --bg: #0b1120; --fg: #f1f5f9; }
  * { transition: background-color .4s, color .4s; }
  .theme-switching * { transition: none !important; }
  body { background: var(--bg); color: var(--fg); font-family: system-ui, sans-serif; }
  .card { padding: 1rem; background: var(--bg); }
</style>
</head>
<body>
<main>
  <h1>الثيم</h1>
  <div class="card">واحد</div>
  <div class="card">اتنين</div>
  <button id="plain" type="button">تبديل عادي</button>
  <button id="clean" type="button">تبديل نضيف</button>
</main>
<script>
  const root = document.documentElement;
  document.getElementById("plain").onclick = () => root.classList.toggle("dark");
  document.getElementById("clean").onclick = () => {
    root.classList.add("theme-switching");
    root.classList.toggle("dark");
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
  };
$__lt/script>
</body>
</html>
~~~

في الكونسول:

~~~js console
document.getElementById("plain").click(); document.getAnimations().length;
document.getElementById("clean").click(); document.getAnimations().length;
~~~

**ليه «بتسيح»:** [[* { transition }]] معناها كل عنصر بيبدأ حركته لوحده. والعناصر اللي بتورث لونها بتتحرك كمان، فالنص ممكن يوصل بعد الخلفية بلحظة.

**التصليح:** كلاس [[theme-switching]] بيقفل الـ transitions لحظة التبديل بس. بنشيله بعد [[requestAnimationFrame]] مرتين: الأولى قبل الرسم، والتانية بعد ما الرسم الجديد خلص. لو شيلته على طول، المتصفح هيدمج التغييرين ويبدأ الـ transition عادي.

ده نفس اللي [[disableTransitionOnChange]] بيعمله في next-themes.

**الغلطة الشائعة:** تستخدم [[setTimeout(…, 0)]] بدل الـ frames، أو تنسى تشيل الكلاس، فكل hover في الموقع يتجمد.

~~~text الناتج
تبديل عادي:  document.getAnimations().length = 8
تبديل نضيف:  document.getAnimations().length = 0
بعد الضغطة الكلاس اتشال: html class=""

(صفحتك رقمها حسب عدد عناصرها.)
~~~` },
          ],
          desc: R`في Tailwind v4 الـ [[dark:]] افتراضيًا بيتبع نظام التشغيل. عشان تخليه بزرار، غيّر الـ variant يبقى على كلاس: [[@custom-variant dark (&:where(.dark, .dark *));]]، وبعدين [[<html class="dark">]] يقلب كل حاجة.

و [[next-themes]] في Next.js بيعمل الباقي: بيحط الكلاس، ويحفظ الاختيار في localStorage، ويتبع النظام لو المستخدم مختارش، ويشغّل script صغير قبل الرسم فمفيش وميض أبيض.`,
          example: R`// globals.css
@custom-variant dark (&:where(.dark, .dark *));
// app/layout.tsx
import { ThemeProvider } from "next-themes";
<html lang="ar" dir="rtl" suppressHydrationWarning>
  <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
</html>
// theme-toggle.tsx ("use client")
const { resolvedTheme, setTheme } = useTheme();
<button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>غيّر الثيم</button>`,
          try: R`طبّق ده في مشروع Next، واختار dark واعمل refresh: مفيش وميض أبيض. وفي DevTools › Application › Local Storage شوف مفتاح [[theme]]. وبعدين امسح [[suppressHydrationWarning]] وشوف التحذير في الكونسول.`,
          flag: "script",
          deep: {
            why: "المستخدمين متوقعين dark mode، وأي موقع بيفتح أبيض ثانية وبعدين يغمق بيبان مكسور. المشكلة إن السيرفر مش عارف اختيار المستخدم (محفوظ في المتصفح)، فلازم حاجة تحط الكلاس قبل ما الصفحة تترسم.",
            how: R`[[@custom-variant dark (&:where(.dark, .dark *))]] بيغيّر معنى [[dark:bg-x]] لـ «لو العنصر نفسه أو جد ليه عليه [[.dark]]». و [[:where]] عشان الـ variant ميزودش specificity، فـ [[dark:bg-x]] يفضل بنفس وزن أي utility (كلاس واحد). ولو بتستخدم attribute: [[&:where([data-theme=dark], [data-theme=dark] *)]].

next-themes بيحقن [[<script>]] صغير في أول الصفحة بيتنفذ قبل الرسم: بيقرا localStorage (أو [[prefers-color-scheme]] لو system) ويحط الكلاس على html، وكمان [[color-scheme]] عشان الـ scrollbars وحقول الفورم تغمق هي كمان. بس السيرفر رسم html من غير الكلاس، فـ React هيلاقي فرق وقت الـ hydration، و [[suppressHydrationWarning]] بيسكّت التحذير ده على العنصر ده بس.

أي حاجة شكلها بيعتمد على الثيم في JavaScript (أيقونة شمس أو قمر) مش معروفة على السيرفر. فالمكون لازم يستنى لحد ما يتعمل mount: [[useEffect(() => setMounted(true), [])]]، وقبلها يعرض placeholder بنفس المقاس.

الطريقة الأنضف من [[dark:]] على كل عنصر: متغيرات. [[:root { --bg: white }]] و [[.dark { --bg: black }]] وتوكن [[--color-bg]] في [[@theme inline]]، فتكتب [[bg-bg]] بس وهو يتغير لوحده، ودا اللي shadcn بيعمله.

وفيه حل من غير script خالص: cookie فيها الثيم، والسيرفر يحط الكلاس في الـ HTML نفسه. في مشروع حقيقي كان كده: الـ layout بيقرا الـ cookie ويحط [[data-theme]] على html، فمفيش وميض ولا فرق hydration.`,
            when: R`أي موقع أو داشبورد. ولو الموقع landing بسيط، [[dark:]] الافتراضي اللي بيتبع النظام ممكن يكفي من غير زرار.`,
            mistakes: R`تنسى [[suppressHydrationWarning]]. تعرض أيقونة الثيم من غير mounted فتظهر غلط وبعدين تتقلب. تكتب [[darkMode: "class"]] في tailwind.config.js في مشروع v4 ومفيش حاجة بتحصل: v4 مش بيقرا الملف ده غير بـ [[@config]]. و [[dark:]] على كل عنصر في المشروع بدل متغيرات، فأي لون جديد يتنسي في وضع من الاتنين.`
          },
          teach: R`## كلاس على [[<html>]] بيقلب الصفحة كلها

الفكرة كلها: [[dark:]] يشتغل لما يبقى فيه كلاس [[dark]] فوق، و next-themes هو اللي بيحط الكلاس ده ويشيله ويفتكره. حطينا المثال في مشروع Next.js 16.4 (Tailwind 4.3.3، و next-themes 0.4.6)، وعملنا build وفتحناه في Chrome مرة والجهاز light ومرة dark (Playwright بيحاكي إعداد النظام).

---

## ١. [[globals.css]]: [[@custom-variant dark (&:where(.dark, .dark *));]]

- [[@custom-variant]]: أمر Tailwind v4 بيعرّف variant جديد (أو يغيّر واحد موجود). اسمه هنا [[dark]].
- [[&]]: العنصر اللي عليه الكلاس نفسه.
- [[:where(.dark, .dark *)]]: «العنصر لو عليه [[.dark]]، أو لو جوه حد عليه [[.dark]]». والمسافة قبل [[*]] = «جوه، في أي عمق».
- [[:where()]] specificity بتاعها صفر، فالكلاس يفضل بوزن كلاس واحد زي أي utility.

القاعدة اللي طلعت في الـ CSS:

~~~text من الـ CSS الناتج
.dark\:bg-gray-950:where(.dark,.dark *){background-color:var(--color-gray-950)}
~~~

ومن غير السطر ده، [[dark:]] في v4 بيتبع [[prefers-color-scheme]] بتاع الجهاز، والزرار مش هيأثر.

## ٢. [[app/layout.tsx]]

### [[import { ThemeProvider } from "next-themes";]]

package بيدير الثيم: يحط الكلاس، ويحفظ الاختيار، ويقرا إعداد الجهاز.

### [[<html lang="ar" dir="rtl" suppressHydrationWarning>]]

[[lang]] و [[dir]] للعربي. و [[suppressHydrationWarning]] هنتكلم عنه في الخطوة ٥.

### [[<body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">]]

لونين لكل حاجة: [[bg-white]] و [[text-gray-900]] في العادي، و [[dark:bg-gray-950]] و [[dark:text-gray-100]] لما [[.dark]] تبقى على html.

### [[<ThemeProvider ...>]]

| الـ prop | يعني |
|---|---|
| [[attribute="class"]] | حط الثيم ككلاس على html ([[class="dark"]]). البديل [[data-theme]] |
| [[defaultTheme="system"]] | لو المستخدم لسه مختارش، امشي على الجهاز |
| [[enableSystem]] | اسمح بـ [[system]] كاختيار |
| [[disableTransitionOnChange]] | وقف كل الـ transitions لحظة التبديل، عشان كل لون ميتحركش لوحده |

و [[{children}]] = الصفحة نفسها.

## ٣. [[theme-toggle.tsx]]

الملف لازم يبدأ بـ [["use client"]] لأن الزرار فيه [[onClick]] و hook، ودول بيشتغلوا في المتصفح بس.

- [[const { resolvedTheme, setTheme } = useTheme();]]: [[useTheme]] hook بيرجّع object، والـ [[{ }]] بتطلّع منه اتنين بأساميهم.
- [[resolvedTheme]]: الثيم الفعلي، [[light]] أو [[dark]]. حتى لو الاختيار [[system]]، ده بيقولك النتيجة.
- [[setTheme("dark")]]: يغيّر الثيم ويحفظه.
- [[resolvedTheme === "dark" ? "light" : "dark"]]: الـ [[? :]] اسمه ternary: «لو dark خليه light، وإلا خليه dark».

---

## ٤. اللي حصل في المتصفح

### الجهاز light، أول مرة

~~~text الناتج
html class   = "...variable light"
html style   = "color-scheme: light;"
localStorage theme = null
body background    = rgb(255, 255, 255)
~~~

([[...variable]] ده كلاس الخط من درس next/font، ملوش علاقة.) ومفيش [[theme]] في localStorage لأن المستخدم لسه مختارش، فالثيم جاي من الجهاز.

### ضغطنا الزرار

~~~text الناتج
html class   = "...variable dark"
html style   = "color-scheme: dark;"
localStorage theme = "dark"
body background    = lab(1.90334 0.278696 -5.48866)    ← gray-950
~~~

[[color-scheme: dark]] بيقول للمتصفح يغمّق حاجاته هو كمان: الـ scrollbar وحقول الفورم.

### refresh

الكلاس كان [[dark]] و [[color-scheme: dark]] **قبل** ما الصفحة تخلص تحميل (قسناه لحظة [[readyState = "interactive"]]، قبل ما React يشتغل). يعني مفيش لحظة بيضا.

### الجهاز dark، أول مرة

فتح [[dark]] لوحده من غير ما نضغط حاجة. ضغطنا الزرار: بقى [[light]] واتحفظ، ومع إن الجهاز لسه dark الخلفية بيضا. ده بالظبط شغل [[@custom-variant]]: [[dark:]] بقى بيسمع للكلاس مش للجهاز.

### إزاي مفيش وميض؟

الـ HTML اللي جاي من السيرفر:

~~~text الناتج
<html lang="ar" dir="rtl" class="pW5XIG_variable">
<body class="..."><div hidden=""></div><script>(...)("class","theme","system",null,["light","dark"],null,true,true)</script>
~~~

السيرفر مش عارف اختيارك، فبعت html **من غير** dark. بس أول حاجة في الـ body [[<script>]] صغير بيتنفّذ قبل ما أي حاجة تترسم: بيقرا [[localStorage.getItem("theme")]]، ولو مفيش أو [[system]] بيسأل [[matchMedia("(prefers-color-scheme: dark)")]]، ويحط الكلاس والـ [[color-scheme]] على html.

## ٥. [[suppressHydrationWarning]]

React لما بيشتغل في المتصفح (hydration) بيقارن الـ HTML اللي جه من السيرفر باللي هو كان هيرسمه. والـ script غيّر html قبله. شلنا الـ prop وشغّلنا [[next dev]] والجهاز dark:

~~~text الـ Console
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
  <html
    lang="ar"
    dir="rtl"
+   className="cairo_..._variable"
-   className="cairo_..._variable dark"
-   style={{color-scheme:"dark"}}
  >
~~~

[[+]] = اللي React متوقعه، و [[-]] = اللي لقاه فعلًا. الفرق في [[className]] و [[style]] بتوع html بس، ودول متوقعين. رجّعنا الـ prop: الخطأ اختفى. وهو بيسكّت html نفسه بس، مش اللي جواه.

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@custom-variant dark (...)]] | [[dark:]] يسمع للكلاس مش للجهاز |
| [[attribute="class"]] | next-themes يحط [[class="dark"]] على html |
| [[defaultTheme="system"]] + [[enableSystem]] | من غير اختيار: زي الجهاز |
| الـ script في أول الـ body | يحط الكلاس قبل الرسم، فمفيش وميض |
| [[localStorage.theme]] | الاختيار المحفوظ |
| [[suppressHydrationWarning]] | يسكّت فرق html المتوقع |
| [[resolvedTheme]] | الثيم الفعلي للزرار |`,
          lines: [
            R`[[dark:]] يشتغل لما [[.dark]] تبقى على العنصر أو أي جد ليه، بدل ما يتبع النظام.`,
            R`بنستورد [[ThemeProvider]] من next-themes: المكوّن اللي بيحط الكلاس على html ويحفظ الاختيار ويقرا إعداد الجهاز.`,
            R`[[suppressHydrationWarning]] لأن next-themes هيحط كلاس على html قبل React، فالسيرفر والمتصفح هيختلفوا في الحتة دي بس.`,
            R`لونين لكل حاجة: أبيض وكلام غامق في العادي، و [[dark:bg-gray-950]] و [[dark:text-gray-100]] لما [[.dark]] تبقى فوق.`,
            R`[[attribute="class"]] يحط [[.dark]]، والافتراضي النظام، و [[disableTransitionOnChange]] يمنع كل الـ transitions تشتغل مع بعض وقت التبديل.`,
            R`الصفحة كلها جوه الـ provider، فأي مكوّن تحت يقدر ينادي [[useTheme()]] ويعرف الثيم.`,
            R`قفلة الـ provider: أي حاجة برّاه متقدرش تستخدم [[useTheme]] وهترجع قيم فاضية.`,
            R`قفلة الـ body اللي عليه ألوان الوضعين.`,
            R`قفلة الـ html اللي عليه الكلاس اللي بيتغيّر.`,
            R`[[resolvedTheme]] = الثيم الفعلي (لو system بيقولك light ولا dark).`,
            R`الزرار بيبص على الثيم الفعلي ويحط عكسه بـ [[setTheme]]، و next-themes بيحفظه في localStorage.`
          ],
          sol: R`بعد ما تختار dark وتعمل refresh: الصفحة بتفتح غامقة من أول frame، من غير ولا لمحة بيضا. لو فتحت Elements هتلاقي على [[<html>]] ‏[[class="dark"]] ومعاها [[style="color-scheme: dark;"]]، ودول اتحطوا بـ script صغير next-themes بيحطه قبل ما الصفحة تترسم. وفي Application › Local Storage هتلاقي مفتاح [[theme]] وقيمته [[dark]] (أو [[light]]، ولو لسه مختارتش هتلاقيه مش موجود أو [[system]]).

لما تمسح [[suppressHydrationWarning]] وتعمل refresh وانت على dark: في الـ Console خطأ hydration من React بيقول إن attributes الـ HTML اللي جاي من السيرفر مش زي اللي على العميل، وهتلاقي فيه [[class]] و [[style]] بتوع الـ html. ده لأن السيرفر بعت html من غير class، والـ script غيّرها قبل React. الـ prop ده بيسكّت التحذير للعنصر ده بس، مش لأولاده.

لو لسه فيه وميض أبيض: اتأكد إن [[@custom-variant dark]] مكتوب (من غيره [[dark:]] بيشتغل على ثيم الجهاز مش على الكلاس)، وإن [[attribute="class"]] على الـ provider. ولو الزرار مش بيعمل حاجة أول مرة، غالبًا بتقرا [[theme]] (اللي ممكن يبقى [[system]]) بدل [[resolvedTheme]].`
        },
        {
          cmd: "logical properties",
          title: "مكون واحد يشتغل عربي وإنجليزي من غير rtl: في كل حتة",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في صفحة [[dir="rtl"]]: [[.a { margin-inline-start: 2rem }]] و [[.b { translate: 20px 0 }]] و [[.c { background: linear-gradient(to right, red, blue) }]] و [[.d { border-start-start-radius: 1rem }]]. كل واحدة هتأثر على أنهي ناحية؟ اكتب، وبعدين اتأكد من Computed في DevTools.`, done: R`[[.a]] يمين، و [[.b]] يمين برضه (translate مش logical)، و [[.c]] الأحمر لسه شمال (الـ gradient مش بيتقلب)، و [[.d]] الركن اللي فوق على اليمين: Computed بيقول [[border-top-right-radius: 16px]] و [[border-top-left-radius: 0px]].`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>logical</title>
<style>
  body { margin: 0; width: 400px; }
  .a { margin-inline-start: 2rem; }
  .b { translate: 20px 0; }
  .c { background: linear-gradient(to right, red, blue); height: 2rem; }
  .d { border-start-start-radius: 1rem; }
</style>
</head>
<body>
<div class="a">a</div>
<div class="b">b</div>
<div class="c">c</div>
<div class="d">d</div>
</body>
</html>
~~~

**القاعدة:** الـ logical بتتقلب مع [[dir]]، والفيزيائية لأ.

- [[.a]]: [[margin-inline-start]] هو بداية السطر. في rtl البداية يمين.
- [[.b]]: [[translate]] إحداثيات شاشة، فالموجب يمين في أي لغة. يعني في rtl مش بيتقلب.
- [[.c]]: [[to right]] اتجاه فيزيائي، فالأحمر شمال في أي لغة.
- [[.d]]: [[border-start-start-radius]] يعني بداية البلوك مع بداية السطر، وده الركن اللي فوق على اليمين في rtl.

**الغلطة الشائعة:** تفتكر إن rtl بيقلب كل حاجة. هو بيقلب ترتيب المحتوى والخصائص الـ logical. الـ transform والـ gradient والأيقونات لأ.

~~~text الناتج
.a   margin-right: 32px ، margin-left: 0px
.b   اتحرك يمين 20px (زي ltr بالظبط)
.c   linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))
.d   border-top-right-radius: 16px ، border-top-left-radius: 0px
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** كارت تعليق مكتوب بـ [[padding-left]] و [[border-left]] و [[text-align: left]] و [[float: right]] لزرار الرد، و badge بـ [[position: absolute; right: 8px]]. حوّل كل خاصية لـ logical (أو Tailwind: [[ps-*]] و [[border-s]] و [[text-start]] و [[inset-e-*]]) واقلب [[dir]] على html.`, done: R`مفيش ولا [[left]] ولا [[right]] في الـ CSS، ولقطة الشاشة في RTL مراية للقطة LTR بالظبط (البادج في الركن التاني، والخط على الناحية التانية)، من غير ولا سطر [[[dir=rtl]]].`, sol: R`~~~html comment.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تعليق</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .comment { position: relative; max-width: 24rem; padding-inline-start: 1rem; border-inline-start: 4px solid #0f766e; text-align: start; }
  .comment h2 { margin: 0; font-size: 1rem; }
  .reply { float: inline-end; }
  .badge { position: absolute; inset-block-start: 0; inset-inline-end: 8px; padding-inline: .5rem; background: #0f766e; color: #fff; border-radius: 1rem; font-size: .75rem; }
</style>
</head>
<body>
<main>
  <h1>التعليقات</h1>
  <article class="comment">
    <span class="badge">جديد</span>
    <h2>سارة</h2>
    <p>الدرس ده حلو جدًا.</p>
    <button class="reply" type="button">رد</button>
  </article>
</main>
</body>
</html>
~~~

| قبل | بعد |
|---|---|
| [[padding-left]] | [[padding-inline-start]] |
| [[border-left]] | [[border-inline-start]] |
| [[text-align: left]] | [[text-align: start]] |
| [[float: right]] | [[float: inline-end]] |
| [[right: 8px]] | [[inset-inline-end: 8px]] |
| [[top: 0]] | [[inset-block-start: 0]] |

وفي Tailwind: [[ps-4]] و [[border-s-4]] و [[text-start]] و [[float-end]] و [[inset-e-2]].

**ليه:** كل خاصية بقت بتوصف علاقتها بالنص مش بالشاشة، فمفيش حاجة تتكتب مرتين.

**الغلطة الشائعة:** تحوّل [[left]] لـ [[inset-inline-end]] بالغلط. [[left]] في ltr بداية، فبيبقى [[start]]. فكّر في الاتجاه الأصلي للكود.

~~~text الناتج
عدد كلمة left أو right في الصفحة: 0

         الحد               البادج عن الكارت      زرار الرد
rtl      يمين 4px           8px من الشمال         على الشمال
ltr      شمال 4px           8px من اليمين         على اليمين

المسافات متطابقة مراية: 280.95 و 8 ، و 300.98 و 0.
axe صفر في الاتجاهين.
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقع فيه [[[dir=rtl] .space-x-4 > :not(:last-child) { margin-right: 0; margin-left: 1rem }]] و [[html[dir=rtl] .text-left { text-align: right !important }]] عشان يعكس Tailwind بإيده. امسح الـ overrides دي كلها واستخدم اللي بيتقلب لوحده.`, done: R`[[grep -c "dir=rtl"]] على ملف الـ CSS بيطلع صفر، وعدد [[!important]] نقص، و [[space-x-4]] بقت [[gap-4]] و [[text-left]] بقت [[text-start]]، والصفحة في اللغتين زي ما كانت.`, sol: R`امسح الـ overrides كلها، وخلي الـ CSS كده:

~~~css style.css
.row { display: flex; gap: 1rem; }
.title { text-align: start; }
~~~

~~~html قبل وبعد
<!-- قبل -->
<div class="flex space-x-4">…</div>
<h1 class="text-left">…</h1>

<!-- بعد -->
<div class="flex gap-4">…</div>
<h1 class="text-start">…</h1>
~~~

~~~bash
grep -c "dir=rtl" style.css
grep -c "!important" style.css
~~~

**ليه:** [[gap]] مسافة بين العناصر، مش margin على ناحية، فملوش اتجاه أصلًا. و [[text-start]] بيتبع [[dir]].

كل override من دول كان بيصلّح نتيجة، والـ logical بيشيل السبب. و [[!important]] كان لازم بس عشان يكسب الكلاس الأصلي.

**الغلطة الشائعة:** تسيب [[space-x-4]] وتضيف [[rtl:space-x-reverse]]. دي كانت حلول قديمة، و [[gap]] أبسط في flex و grid.

~~~text الناتج
grep -c "dir=rtl" style.css     0
grep -c "!important" style.css  0

(CSS الملف ده سطرين، والشكل في اللغتين بيطلع نفس اللي اتقاس في التمرين اللي قبله.)
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** في صفحة عربي اكتب الجملتين دول: «المستخدم Sara_99! كسب» و «كلمني على +20 100 000 0000». شوف الـ ! بتظهر فين والرقم بيتقري إزاي، وصلّحهم بـ [[<bdi>]] للاسم و [[dir="ltr"]] للرقم.`, done: R`قبل التصليح الـ ! ظهرت شمال الاسم «!Sara_99» والرقم اتلخبط («100» بقت شمال «+20»)، وبعده الاسم بقى «Sara_99!» والرقم بالترتيب. اتأكدنا بمكان كل حرف من [[Range.getBoundingClientRect()]] في Chrome 156: الـ ! كانت شمال الـ S وبقت يمين الـ 9.`, sol: R`~~~html bidi.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>اتجاه مختلط</title>
<style>body { font: 1.25rem system-ui; }</style>
</head>
<body>
<main>
  <h1>اتجاه مختلط</h1>
  <p id="a">المستخدم Sara_99! كسب</p>
  <p id="b">المستخدم <bdi>Sara_99!</bdi> كسب</p>
  <p id="c">كلمني على +20 100 000 0000</p>
  <p id="d">كلمني على <span dir="ltr">+20 100 000 0000</span></p>
</main>
</body>
</html>
~~~

**بيحصل إيه:** خوارزمية الـ bidi بتقسم السطر لحتت حسب اتجاه كل حرف. الحروف اللاتيني اتجاهها قوي (LTR)، والعربي قوي (RTL)، بس الـ [[!]] والمسافة والـ [[+]] محايدين، فبياخدوا اتجاه اللي حواليهم.

- [[Sara_99!]]: الـ [[!]] جت بين لاتيني وعربي، فاتحسبت على العربي واتنقلت لشمال الاسم.
- [[<bdi>]] بيعزل الاسم، فالـ [[!]] تفضل جزء منه. استخدمه مع أي كلام جاي من المستخدم، لأنك مش عارف لغته.
- التليفون: الأرقام «ضعيفة»، والمسافات بينها محايدة، فالمجموعات اتعكس ترتيبها. [[dir="ltr"]] بيثبّت الاتجاه.

**الغلطة الشائعة:** تصلّحها بـ [[text-align]]. ده بيحرّك السطر، مش ترتيب الحروف جواه.

~~~text الناتج
مكان الحروف (left بالـ px من Range.getBoundingClientRect):

                  !          S          آخر 9
قبل               1112.9     1118.6     1175.6    (الـ ! شمال الـ S)
بعد bdi           1180.7     1112.9     1169.9    (الـ ! يمين الـ 9)

                  +          أول 1      آخر 0
قبل               1160.5     1101.1     1047      (+20 يمين و 100 شماله)
بعد dir="ltr"     1014.7     1055.4     1163.4    (بالترتيب من الشمال)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** drawer بيطلع من ناحية النهاية: [[inset-inline-end: 0]]، ومقفول بـ [[translate]] برا الشاشة. الـ translate مش logical، فاستخدم متغير [[--dir]] (‏1 في LTR و -1 في RTL بـ [[:dir(rtl)]]) و [[translate: calc(100% * var(--dir)) 0]].`, done: R`في الإنجليزي بيطلع من اليمين وفي العربي من الشمال، والصفحة وهو مقفول مفيهاش scroll أفقي ([[document.documentElement.scrollWidth === document.documentElement.clientWidth]] بيرجّع [[true]] في الاتجاهين)، و Escape بيقفله.`, sol: R`~~~html drawer.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>درج</title>
<style>
  :root { --dir: 1; }
  :root:dir(rtl) { --dir: -1; }
  body { margin: 0; font-family: system-ui, sans-serif; }
  .drawer { position: fixed; inset-block: 0; inset-inline-end: 0; inline-size: min(20rem, 85vw); padding: 1rem; box-sizing: border-box;
            background: #fff; box-shadow: 0 0 1rem #0005; transition: translate .25s, visibility 0s .25s;
            translate: calc(100% * var(--dir)) 0; visibility: hidden; }
  .drawer.open { translate: 0 0; visibility: visible; transition: translate .25s, visibility 0s; }
  @media (prefers-reduced-motion: reduce) { .drawer { transition: none; } }
</style>
</head>
<body>
<main>
  <h1>الرئيسية</h1>
  <button id="open" type="button" aria-expanded="false" aria-controls="drawer">القايمة</button>
</main>
<aside id="drawer" class="drawer" aria-label="القايمة">
  <button id="close" type="button">قفل</button>
  <p><a href="#a">المنتجات</a></p>
</aside>
<script>
  const drawer = document.getElementById("drawer");
  const open = document.getElementById("open");
  const close = document.getElementById("close");
  function set(isOpen) {
    drawer.classList.toggle("open", isOpen);
    open.setAttribute("aria-expanded", String(isOpen));
    (isOpen ? close : open).focus();
  }
  open.addEventListener("click", () => set(true));
  close.addEventListener("click", () => set(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) set(false);
  });
$__lt/script>
</body>
</html>
~~~

**ليه [[--dir]]:** [[inset-inline-end]] بيحط الدرج صح في اللغتين، بس [[translate]] إحداثيات شاشة. فمحتاجين نضرب في إشارة: 1 في ltr، و -1 في rtl. [[:root:dir(rtl)]] بيقرا الاتجاه الفعلي، حتى لو اتغيّر بـ [[dir]] من JavaScript.

**[[visibility: hidden]]:** مقفول بس لسه في الصفحة، فمن غيرها Tab هيدخل جواه. والـ transition بتاعها مختلف في الاتجاهين:

- الفتح [[visibility 0s]]: يبان فورًا، عشان [[close.focus()]] يشتغل. أول تجربة كتبت [[visibility .25s]] في الاتجاهين، والـ focus مرحش للزرار.
- القفل [[visibility 0s .25s]]: يستخبى بعد ما الحركة تخلص.

**ليه مفيش scroll أفقي:** الدرج [[position: fixed]]، والعناصر الـ fixed برا الشاشة مبتزوّدش [[scrollWidth]] هنا.

**الغلطة الشائعة:** تستخدم [[transform: translateX(100%)]] ثابتة، فالدرج في العربي يطلع يمين الشاشة فوق المحتوى.

~~~text الناتج
          مفتوح (left - right)   مقفول left     الـ focus مفتوح/مقفول
rtl       0 - 306                -306           close / open
ltr       54 - 360               360            close / open

scrollWidth === clientWidth: true في الاتجاهين ، مفتوح ومقفول
Escape بيقفل ، axe صفر
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN صفحة «CSS logical properties and values» هات الاسم الـ logical لـ [[width]] و [[height]] و [[border-top-left-radius]] و [[top]] و [[float: left]] و [[text-align: right]]، وشوف في وثائق Tailwind v4 فيه كلاس لكل واحد ولا لأ.`, done: R`جدول ٦ صفوف: [[inline-size]] و [[block-size]] و [[border-start-start-radius]] و [[inset-block-start]] و [[float: inline-start]] و [[text-align: end]]، وجنب كل واحد كلاس Tailwind أو «مفيش، استخدم arbitrary value».`, sol: R`**الإجابة من MDN، والكلاسات اتبنت بـ Tailwind 4.3.4 واتأكدت من [[out.css]]:**

| الفيزيائي | الـ logical | Tailwind |
|---|---|---|
| [[width]] | [[inline-size]] | [[inline-1]] |
| [[height]] | [[block-size]] | [[block-1]] |
| [[border-top-left-radius]] | [[border-start-start-radius]] | [[rounded-ss-lg]] |
| [[top]] | [[inset-block-start]] | [[inset-bs-0]] |
| [[float: left]] | [[float: inline-start]] | [[float-start]] |
| [[text-align: right]] | [[text-align: end]] | [[text-end]] |

الأتنين الأخيرين بنفترض صفحة ltr: [[left]] بداية و [[right]] نهاية.

**ليه ده مهم مش بس للعربي:** [[inline-size]] هو «عرض» في الكتابة الأفقية، و«ارتفاع» في الكتابة الرأسية. الاسم بيوصف اتجاه النص.

**الغلطة الشائعة:** تفتكر إن [[start-0]] و [[inset-s-0]] واحد في كل حاجة. الاتنين [[inset-inline-start]]، بس القيمة الأولى من [[--spacing]] والتانية [[0px]] مباشرة. والشكل واحد لما تبقى صفر.

~~~text الناتج
.inline-1      inline-size: var(--spacing)
.block-1       block-size: var(--spacing)
.rounded-ss-lg border-start-start-radius: var(--radius-lg)
.inset-bs-0    inset-block-start: 0px
.float-start   float: inline-start
.text-end      text-align: end
~~~` },
          ],
          desc: R`بدل [[left]] و [[right]] استخدم start و end: [[ms-4]] (margin-inline-start) بدل [[ml-4]]، و [[pe-2]] بدل [[pr-2]]، و [[text-start]] بدل [[text-left]]، و [[inset-s-0]] بدل [[left-0]]، و [[rounded-s-lg]] و [[border-e]]. دول بيتقلبوا لوحدهم مع [[dir]].

والحاجات اللي ليها اتجاه (سهم «التالي»، أيقونة رجوع) اقلبها بـ [[rtl:-scale-x-100]]. أما أيقونة زي البحث أو الساعة فسيبها.`,
          example: R`<div className="flex items-center gap-3 ps-4 pe-2">
  <img className="size-10 rounded-full" src="/u.jpg" alt="" />
  <p className="text-start">محمد</p>
  <span className="ms-auto">من 5 دقايق</span>
</div>
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
<aside className="border-e ps-6">...</aside>
<span className="absolute top-2 inset-e-2">جديد</span>
<span dir="ltr">+20 100 000 0000</span>`,
          try: R`اعمل المكون ده وقلّب [[dir]] على html بين rtl و ltr: كل حاجة هتتقلب صح. بعدين غيّر [[ms-auto]] لـ [[ml-auto]] وشوف الوقت لزق في الناحية الغلط في العربي.`,
          flag: "script",
          deep: {
            why: R`موقع عربي وإنجليزي بـ left و right معناه نسختين من كل مكون، أو [[rtl:]] على كل عنصر. الـ logical properties بتخلي الكود يوصف «البداية والنهاية» مش «الشمال واليمين»، والمتصفح يحوّلهم حسب اتجاه الصفحة.`,
            how: R`في CSS: [[margin-inline-start]] و [[padding-inline-end]] و [[inset-inline-start]] و [[border-inline-end]] و [[text-align: start]]. الـ inline = اتجاه الكتابة (أفقي في العربي والإنجليزي)، والـ block = الاتجاه العمودي عليه (فوق وتحت). فـ [[margin-block]] = فوق وتحت، و [[padding-inline]] = الجنبين.

في Tailwind: [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[inset-s-*]] و [[inset-e-*]] و [[rounded-s-*]] و [[rounded-e-*]] و [[border-s]] و [[border-e]] و [[text-start]] و [[text-end]]. و [[mx-*]] و [[px-*]] أصلًا متماثلين فمش فارقين. ([[start-*]] و [[end-*]] للـ position بقوا deprecated من v4.2 لصالح [[inset-s-*]] و [[inset-e-*]].)

اللي مش بيتقلب لوحده: [[translate-x]] (الرقم الموجب دايمًا يمين)، و [[rotate]]، والـ gradients ([[bg-linear-to-r]])، والظل اللي ليه إزاحة أفقية، و [[background-position]]. دول محتاجين [[rtl:]]: [[rtl:-translate-x-1]] أو [[rtl:bg-linear-to-l]].

الأيقونات: اللي معناها اتجاه (أسهم التالي والسابق، ورجوع، وإرسال، والـ chevrons في الـ breadcrumb) بتتقلب. واللي بتمثل حاجة حقيقية (ساعة، وبحث، و play في مشغل فيديو، وعلامة صح) متتقلبش. في مشروع حقيقي أيقونات الأسهم كلها كانت [[rtl:-scale-x-100]]، والحركة عند الـ hover [[rtl:group-hover:-translate-x-1]]، والأرقام والأوقات عليها [[dir="ltr"]]. و shadcn فيه [[--rtl]] بيحوّل مكوناته لـ logical لوحده.`,
            when: "أي مشروع ممكن يبقى فيه عربي، حتى لو دلوقتي إنجليزي بس. عوّد إيدك على ms و pe من الأول، مفيش أي تكلفة.",
            mistakes: R`[[ml-2]] للمسافة بين أيقونة وكلام، وفي العربي الأيقونة تلزق في الكلام والمسافة تروح الناحية التانية (أحسن [[gap-2]] على الأب). تقلب كل الأيقونات فالساعة تلف بالعكس. و [[translate-x]] في animation أو toggle من غير [[rtl:]]. وساعات الحل المقبول [[dir="ltr"]] على العنصر ده بس، لو شكله مش مرتبط باللغة.`
          },
          teach: R`## «البداية» و «النهاية» بدل «شمال» و «يمين»

كل كلاس في المثال بيقول «من ناحية البداية» أو «من ناحية النهاية»، والمتصفح بيعرف البداية فين من [[dir]]: في [[rtl]] البداية يمين، وفي [[ltr]] شمال. حطينا المثال في صفحة Vite (Tailwind 4.3.3) جوه صندوق عرضه 600 و [[relative]]، و [[ArrowRight]] من lucide-react، وقسنا كل حاجة في Chrome مرة بـ [[dir="rtl"]] على html ومرة [[ltr]]. الأرقام تحت مكان العنصر من الطرف الشمال للصندوق (من - لـ).

---

## ١. الكلاسات بتطلّع إيه في CSS

~~~text من الـ CSS الناتج
.ps-4{padding-inline-start:calc(var(--spacing) * 4)}
.pe-2{padding-inline-end:calc(var(--spacing) * 2)}
.ms-auto{margin-inline-start:auto}
.ml-auto{margin-left:auto}
.text-start{text-align:start}
.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}
.inset-e-2{inset-inline-end:calc(var(--spacing) * 2)}
~~~

- **inline** = اتجاه السطر (الجنبين). و **block** = فوق وتحت.
- [[s]] = start (البداية)، و [[e]] = end (النهاية).
- [[ml-auto]] الوحيد اللي فيه [[left]] صريحة، فمش بيتقلب.

## ٢. الصف: [[<div className="flex items-center gap-3 ps-4 pe-2">]]

- [[flex items-center]]: العناصر جنب بعض ومتوسّطين رأسيًا. والـ flex نفسه بيمشي مع [[dir]]: أول عنصر عند البداية.
- [[gap-3]]: 12px بين كل عنصرين، من غير ما تحدد ناحية.
- [[ps-4]] و [[pe-2]]: 16px من البداية و 8px من النهاية.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[padding-right]] | 16px | 8px |
| [[padding-left]] | 8px | 16px |

## ٣. الصورة والاسم والوقت

~~~text App.tsx
<img className="size-10 rounded-full" src="/u.jpg" alt="" />
<p className="text-start">محمد</p>
<span className="ms-auto">من 5 دقايق</span>
~~~

- [[size-10]]: 40×40px. و [[rounded-full]]: دايرة. و [[alt=""]]: صورة للزينة، قارئ الشاشة يتجاهلها.
- [[text-start]]: الكلام على ناحية البداية. القيمة المحسوبة فضلت [[start]] في الحالتين، والمتصفح بيترجمها.
- [[ms-auto]]: margin من ناحية البداية بـ [[auto]]. في الـ flex الـ [[auto]] بياكل كل المساحة الفاضية، فبيزق العنصر لآخر الصف.

| العنصر | [[rtl]] | [[ltr]] |
|---|---|---|
| الصورة | 543 - 583 (يمين) | 17 - 57 (شمال) |
| «محمد» | 495 - 531 | 69 - 105 |
| الوقت بـ [[ms-auto]] | **9 - 84** (أقصى الشمال) | 516 - 591 (أقصى اليمين) |
| الوقت بـ [[ml-auto]] | **460 - 535** (لازق في الاسم) | 516 - 591 |

السطر الأخير هو الغلطة: [[ml-auto]] في [[ltr]] بيدّي نفس النتيجة بالظبط، فاللي بيجرّب بالإنجليزي بس مش هيشوف المشكلة. في [[rtl]] الـ margin الشمال زق الوقت يمين ناحية الاسم.

## ٤. زرار التالي: [[rtl:-scale-x-100]]

~~~text App.tsx
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
~~~

- [[ArrowRight]]: سهم بيشاور يمين، يعني «لقدام» في الإنجليزي.
- [[-scale-x-100]]: [[scale-x]] = تكبير على المحور الأفقي، و [[100]] = 100٪، والسالب = اعكسه مراية.
- [[rtl:]]: بس لما الصفحة RTL.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[scale]] المحسوب | [[-1 1]] (معكوس، بيشاور شمال) | [[none]] |

والـ selector اللي طلع في Tailwind 4.3.3:

~~~text من الـ CSS الناتج
.rtl\:-scale-x-100:where(:is(:lang(ar),:lang(he),:lang(fa),...),[dir=rtl],[dir=rtl] *){...}
~~~

يعني [[rtl:]] بيشتغل لو العنصر جوه [[dir="rtl"]] **أو** جوه [[lang]] لغة بتتكتب من اليمين (عربي، عبري، فارسي...). عشان كده خلي [[lang]] و [[dir]] على html متفقين.

## ٥. [[<aside className="border-e ps-6">]]

خط فاصل على ناحية النهاية، و 24px padding من البداية:

| | [[rtl]] | [[ltr]] |
|---|---|---|
| border شمال / يمين | 1px / 0 | 0 / 1px |
| padding شمال / يمين | 0 / 24px | 24px / 0 |

## ٦. الشارة: [[absolute top-2 inset-e-2]]

- [[absolute]]: مكانها محسوب من أقرب أب [[relative]] (الصندوق).
- [[top-2]]: 8px من فوق.
- [[inset-e-2]]: 8px من ناحية النهاية ([[inset-inline-end]]).

| | [[rtl]] | [[ltr]] |
|---|---|---|
| مكانها | 9 - 40 (الركن الشمال) | 560 - 591 (الركن اليمين) |
| [[left]] المحسوب | 8px | 559.266px |
| [[right]] المحسوب | 559.266px | 8px |

## ٧. [[<span dir="ltr">+20 100 000 0000</span>]]

جربنا نفس الرقم جوه سطر عربي مرتين، وقرينا ترتيب الحروف على الشاشة من الشمال لليمين:

~~~text الناتج
من غير dir:    0000 000 100 20+
dir="ltr":     +20 100 000 0000
~~~

من غير [[dir]]، المتصفح اعتبر كل مجموعة أرقام حتة لوحدها في سطر RTL، فرتّبهم من اليمين للشمال والـ [[+]] راحت للآخر. [[dir="ltr"]] على العنصر ده بس بيخليه يتكتب شمال ليمين صح.

## الخلاصة

| بدل | استخدم | CSS |
|---|---|---|
| [[ml-*]] / [[mr-*]] | [[ms-*]] / [[me-*]] | [[margin-inline-start/end]] |
| [[pl-*]] / [[pr-*]] | [[ps-*]] / [[pe-*]] | [[padding-inline-start/end]] |
| [[left-*]] / [[right-*]] | [[inset-s-*]] / [[inset-e-*]] | [[inset-inline-start/end]] |
| [[border-l]] / [[border-r]] | [[border-s]] / [[border-e]] | [[border-inline-start/end]] |
| [[text-left]] / [[text-right]] | [[text-start]] / [[text-end]] | [[text-align: start/end]] |

- الأيقونات اللي معناها اتجاه: [[rtl:-scale-x-100]].
- جرّب دايمًا في الاتجاهين، لأن الغلط مش بيبان في [[ltr]].`,
          lines: [
            "padding من البداية 16 ومن النهاية 8. في العربي البداية يمين.",
            R`صورة البروفايل: مقاس ثابت ودايرة، ومالهاش أي اتجاه فمش محتاجة logical.`,
            "الكلام محاذي للبداية مهما كانت اللغة.",
            R`[[ms-auto]] يزق الوقت لآخر الصف: شمال في العربي، يمين في الإنجليزي.`,
            R`قفلة الصف؛ الـ [[gap-3]] اللي عليه أصلًا مالوش اتجاه فبيشتغل في اللغتين.`,
            R`زرار «التالي»: [[inline-flex]] و [[gap-2]] بين الكلمة والسهم، من غير margin على ناحية معينة.`,
            R`السهم لليمين في الإنجليزي، و [[rtl:-scale-x-100]] يقلبه مراية في العربي.`,
            R`قفلة الزرار؛ ترتيب الكلمة والسهم بيتقلب لوحده مع [[dir]] لأنه flex.`,
            "خط فاصل على ناحية النهاية، و padding من البداية.",
            R`شارة في ركن النهاية فوق. [[inset-e-2]] من v4.2 بدل [[end-2]].`,
            "رقم التليفون LTR جوه صفحة عربي."
          ],
          sol: R`مع [[dir="rtl"]]: الصورة على اليمين وجنبها «محمد»، و «من 5 دقايق» لازقة في أقصى الشمال، والـ padding الأكبر (16px) ناحية اليمين، وسهم «التالي» معكوس بيشاور شمال، والـ border بتاع الـ aside على الشمال، والشارة «جديد» في الركن الشمال فوق. قلّب لـ [[ltr]]: كل ده اتعكس (الصورة شمال، والوقت أقصى اليمين، والسهم يمين)، من غير ولا [[rtl:]] ولا سطر زيادة. رقم التليفون بيفضل [[+20 100 000 0000]] في الحالتين.

بعد ما تغيّر [[ms-auto]] لـ [[ml-auto]] في العربي: «من 5 دقايق» بقت لازقة في «محمد» والفراغ كله راح على الطرف الشمال. قست ده في صفحة عرضها 600: مع [[ms-auto]] الوقت كان من 8 لـ 82px (أقصى الشمال)، ومع [[ml-auto]] بقى من 409 لـ 483 جنب الاسم. لأن [[ml-auto]] = [[margin-left]] دايمًا، والوقت في rtl آخر عنصر وعلى الشمال أصلًا، فالـ margin زقّه لليمين ناحية الاسم. في الـ ltr التغيير مش هيبان لأن start = left، وده بالظبط ليه الغلط ده بيعدّي على اللي بيجرّب بالإنجليزي بس.`
        },
        {
          cmd: "next/font",
          title: "خط عربي بيتحمّل بسرعة ومن غير ما الصفحة تتنط",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** خط بيوصل بعد ٤ ثواني على نت بطيء. المستخدم هيشوف إيه في أول ٣ ثواني مع كل قيمة من [[font-display]]: [[block]] و [[swap]] و [[fallback]] و [[optional]]؟ وأنهي واحدة الخط ممكن ميظهرش خالص في أول زيارة؟ اكتب جدول، وبعدين جرّب بـ DevTools › Network › Slow 3G و Disable cache.`, done: R`الجدول: [[block]] كلام مخفي لحد ٣ ثواني تقريبًا وبعدين الاحتياطي، و [[swap]] الاحتياطي على طول، و [[fallback]] لحظة صغيرة مخفي وبعدين الاحتياطي ومبيبدّلش لو الخط اتأخر كتير، و [[optional]] الاحتياطي وغالبًا مبيبدّلش في أول زيارة. وفي التجربة شفت [[optional]] بيظهر الخط بس بعد refresh (من الـ cache).`, sol: R`~~~css fonts.css
/* غيّر font-display بين block و swap و fallback و optional */
@font-face {
  font-family: Cairo;
  src: url(/cairo-ar.woff2) format("woff2");
  font-display: swap;
}
body { font-family: Cairo, Arial, sans-serif; }
~~~

**الجدول:**

| القيمة | أول ٣ ثواني | لو الخط جه بعد ٤ ثواني |
|---|---|---|
| [[block]] | كلام مخفي | بيبدّل للخط |
| [[swap]] | الاحتياطي على طول | بيبدّل للخط |
| [[fallback]] | لحظة صغيرة مخفي، وبعدين الاحتياطي | مبيبدّلش |
| [[optional]] | لحظة صغيرة مخفي، وبعدين الاحتياطي | مبيبدّلش، والخط بيتخزن للزيارة الجاية |

**الفكرة:** كل قيمة عبارة عن فترتين: فترة block (مخفي)، وفترة swap (مسموح يبدّل). [[optional]] مفيهاش swap تقريبًا، فلو الخط مجاش في أول لحظة خلاص. الخط الأساسي في موقع عربي بياخد [[swap]]، و [[optional]] لو الثبات أهم من شكل الخط.

**الغلطة الشائعة:** تستخدم [[block]] لخط النص، فالموبايل البطيء يشوف صفحة فاضية ٣ ثواني. وفي تجربة [[optional]] لازم تعمل reload من غير ما تقفل الكاش.

~~~text الناتج
الخط اتأخر 4 ثواني (Chrome 156). نص = عدد بكسلات غامقة في اللقطة:

           500ms     2000ms    3700ms     5500ms     7500ms
block      مخفي      مخفي      692        1041       1041
swap       692       692       692        1041       1041
fallback   692       692       692        692        692
optional   692       692       692        692        692

692 = الاحتياطي ، 1041 = الخط الحقيقي.
في الزيارة التانية بكاش مع optional: عرض الجملة 201.2 ← 241.8 (الخط ظهر)
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس صفحة مقال عربي ٣ مرات: (أ) [[@import url(...)]] لخط من Google جوه ملف الـ CSS، و (ب) [[<link>]] في الـ head ومعاه [[preconnect]]، و (ج) ملف woff2 من موقعك و [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] و [[font-display: swap]]. قيس بـ Lighthouse (Mobile) و Network.`, done: R`جدول ٣ صفوف فيه FCP و LCP وعدد الطلبات لدومين تاني. في (أ) الـ waterfall فيه سلسلة ٣ خطوات (CSS بتاعك ← CSS جوجل ← الخط)، وفي (ج) صفر طلبات برا الموقع والخط بيبدأ يتحمّل مع الـ HTML.`, sol: R`~~~css a.css
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");
body { font-family: Cairo, sans-serif; }
~~~

~~~html (ب) في الـ head
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo&display=swap">
~~~

~~~html (ج) في الـ head
<link rel="preload" href="/cairo-ar.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face {
    font-family: Cairo;
    src: url(/cairo-ar.woff2) format("woff2");
    font-display: swap;
    unicode-range: U+0600-06FF;
  }
  body { font-family: Cairo, sans-serif; }
</style>
~~~

~~~bash
npx lighthouse http://localhost:4000/c --quiet --only-categories=performance --throttling-method=devtools --output=json --output-path=c.json
~~~

**ليه (ج) الأسرع:**

- (أ): المتصفح لازم يحمّل [[a.css]]، يلاقي [[@import]]، يطلب CSS جوجل، يلاقي الخط، يطلبه. ٣ خطوات متسلسلة ودومينين جداد.
- (ب): بنشيل خطوة، و [[preconnect]] بيفتح الاتصال بدري، بس لسه فيه دومينين.
- (ج): كله من نفس الدومين والاتصال مفتوح، و [[preload]] بيبدأ الخط مع الـ HTML.

و [[crossorigin]] لازم على preload الخط حتى لو من نفس الموقع: الخطوط بتتطلب بوضع CORS، ومن غيره المتصفح بيحمّله مرتين.

**الغلطة الشائعة:** تحط [[@import]] في أول CSS عشان أسهل. وده اللي next/font بيحله: بيحمّل الخط وقت الـ build ويقدّمه من موقعك.

~~~text الناتج
Lighthouse 13.6 ، مرتين لكل طريقة:

                    FCP و LCP          طلبات برا الموقع
(أ) @import         2.2 s ، 3.1 s      3 (googleapis و gstatic)
(ب) link            2.5 s ، 2.3 s      3 (googleapis و gstatic)
(ج) من موقعك        1.2 s ، 1.0 s      0

الصفحة خفيفة، فالـ LCP = الـ FCP في كل تشغيلة. والفرق بين (أ) و (ب) هنا
جوه تذبذب الشبكة، أما (ج) فأسرع بوضوح.
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** عرّفنا خطين بنفس الاسم: ملف عربي بـ [[unicode-range: U+0600-06FF]] وملف لاتيني بـ [[unicode-range: U+0000-00FF]]. صفحة فيها كلام عربي بس: المتصفح هينزّل كام ملف؟ اكتب، وبعدين افتح Network › Font.`, done: R`نزّل الاتنين، مش العربي بس! السبب المسافة: [[U+0020]] جوه الـ range اللاتيني، وأي صفحة فيها مسافة. ولما غيّرنا اللاتيني لـ [[U+0041-005A, U+0061-007A]] (حروف بس) نزل العربي لوحده. اتقاس في Chrome 156 بعدّ طلبات الخطوط.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>unicode-range</title>
<style>
  @font-face { font-family: C; src: url(/ar.woff2) format("woff2"); unicode-range: U+0600-06FF; }
  @font-face { font-family: C; src: url(/lat.woff2) format("woff2"); unicode-range: U+0000-00FF; }
  body { font-family: C, sans-serif; }
</style>
</head>
<body><p>كلام عربي بس</p></body>
</html>
~~~

**الإجابة:** ملفين، مش واحد.

**ليه:** المتصفح بينزّل الملف لو الصفحة فيها حرف جوه الـ range بتاعه. [[U+0000-00FF]] فيها [[U+0020]]، وده المسافة. وأي صفحة عربي فيها مسافات.

**التصليح:** ضيّق الـ range للحروف بس: [[U+0041-005A, U+0061-007A]]. وهتحتاج تفكر في الأرقام و [[@]] لو عايزهم من الخط اللاتيني.

**الغلطة الشائعة:** تفتكر إن [[unicode-range]] زي [[lang]]، فالصفحة العربي تجيب العربي. هو بيقارن بالحروف الموجودة فعليًا.

~~~text الناتج
U+0000-00FF:                 /ar.woff2 و /lat.woff2
U+0041-005A, U+0061-007A:    /ar.woff2 بس
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الموقع فيه [[html[dir=rtl] * { font-family: "Cairo" !important }]]، فبلوكات الكود في صفحة الشرح طلعت بخط Cairo مش mono. وفيه label بـ [[text-transform: uppercase; letter-spacing: .18em]] متطبّق على العربي والإنجليزي. صلّح الاتنين: الخط متغير على [[body]] بيتورّث، والـ label بقاعدة [[:lang(ar)]] بتصفّر الـ letter-spacing.`, done: R`Computed font-family بتاع [[<code>]] بيبدأ بخط mono، و [[!important]] اتمسحت، والـ label العربي letter-spacing بتاعه [[normal]]. ملاحظة اتقاست: Chrome 156 أصلًا مش بيطبّق letter-spacing على العربي (عرض «مبرمجين» فضل 114.3px بيه ومن غيره، و «Coders» زاد من 96.9 لـ 135.3)، بس متصفحات تانية أو نسخ قديمة ممكن تقطّع الحروف، فالتصفير لسه صح.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>خطوط</title>
<style>
  :root { --font-sans: "Cairo", system-ui, sans-serif; --font-mono: ui-monospace, Consolas, monospace; }
  body { font-family: var(--font-sans); }
  code, pre { font-family: var(--font-mono); }
  .label { text-transform: uppercase; letter-spacing: .18em; }
  .label:lang(ar) { letter-spacing: normal; }
</style>
</head>
<body>
<main>
  <h1>الشرح</h1>
  <p>استخدم <code>npm install</code> وبعدين شغّل.</p>
  <span id="ar" class="label">مبرمجين</span>
  <span id="en" class="label" lang="en">Coders</span>
</main>
</body>
</html>
~~~

**التصليح الأول:** [[html[dir=rtl] * { font-family: "Cairo" !important }]] بيضرب كل عنصر مباشرة، فبيغلب الوراثة وأي قاعدة تانية. لما المتغير يتحط على [[body]]، العناصر بتورثه، و [[code]] يقدر يكتب خطه عادي.

**التصليح التاني:** [[.label:lang(ar)]] بيطابق أي عنصر لغته عربي، حتى لو اللغة جاية من [[<html lang="ar">]]. و [[lang="en"]] على الـ span بيخرجه منها. فالإنجليزي بياخد 0.18em، والعربي [[normal]].

**ليه:** الحروف العربي موصولة، والمسافات بينها بتقطّع الوصلة في المتصفحات اللي بتطبّقها. وزي ما اتقاس في Chrome 156 المتصفح نفسه بيتجاهلها، بس مش كل المتصفحات كده.

**الغلطة الشائعة:** تكتب [[:lang(ar) .label]]. ده معناه «label جوه أي عنصر عربي»، و [[<html>]] عربي، فالإنجليزي كمان يتصفّر. جرّبتها في الأول وطلعت كده: [[letter-spacing]] بتاع الإنجليزي بقى [[normal]].

~~~text الناتج
font-family بتاع code: ui-monospace, Consolas, monospace
letter-spacing للعربي: normal
letter-spacing للإنجليزي: 2.88px (0.18em من 16px)
axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** من غير Next، اعمل خط احتياطي مظبوط بإيدك: [[@font-face { font-family: "Cairo Fallback"; src: local("Arial"); size-adjust: ...; ascent-override: ... }]] وحطه تاني واحد في الـ stack. جرّب قيم لحد ما الفقرة بالخطين ليها نفس الارتفاع تقريبًا.`, done: R`ارتفاع الفقرة بالاحتياطي وبالخط الحقيقي ([[offsetHeight]]) الفرق بينهم أقل من 2%، وفي Performance › Layout Shifts مفيش shift وقت ما الخط يوصل، ومن غير الاحتياطي المظبوط فيه shift. وعرفت إن ده بالظبط اللي next/font بيعمله لوحده.`, sol: R`~~~css fallback.css
@font-face {
  font-family: Cairo;
  src: url(/cairo-ar.woff2) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Cairo Fallback";
  src: local("Arial");
  size-adjust: 118%;
  ascent-override: 110.4%;
  descent-override: 48.4%;
  line-gap-override: 0%;
}
body { font-family: Cairo, "Cairo Fallback", sans-serif; }
~~~

**الحساب:** ارتفاع سطر Cairo كبير: ascent 1.303 و descent 0.571 من حجم الخط. Arial أقل بكتير، فالفقرة بتطول لما الخط يوصل.

1. [[ascent-override]] و [[descent-override]] بيدّوا Arial نفس ارتفاع السطر.
2. [[size-adjust]] بيغيّر عرض الحروف، فالسطر يتكسر في نفس المكان تقريبًا. وبما إنه بيضرب كل المقاييس، قسمنا: 130.3 ÷ 1.18 = 110.4.
3. جرّبت من 84٪ لـ 136٪. من 112 لـ 124 عدد السطور مطابق، فاخترت النص.

**الغلطة الشائعة:** تظبط على فقرة واحدة وعرض واحد وتفتكر إنها متطابقة دايمًا. عدد السطور بيتغيّر مع النص والعرض، بس الفرق بيبقى صغير. وده بالظبط اللي next/font بيحسبه لوحده.

~~~text الناتج
ارتفاع الفقرة (عرض 600 ، خط 18px):
Cairo                297
Arial عادي           168
Cairo Fallback       297    الفرق 0٪

الخط اتأخر 800ms:
                  الارتفاع قبل ← بعد     CLS
Arial عادي        168 ← 297              0.0739
Cairo Fallback    297 ← 297              0
~~~` },
          ],
          desc: R`[[next/font/google]] بينزّل الخط وقت الـ build ويخدمه من موقعك (مفيش request لجوجل)، وبيعمل خط احتياطي مقاساته مظبوطة فالكلام ميتنطش لما الخط الحقيقي يوصل. و [[variable]] بيطلّعه كمتغير CSS تربطه بـ Tailwind.

برا Next بتكتب [[@font-face]] بنفسك: ملف [[woff2]] من موقعك، و [[font-display: swap]] عشان الكلام يظهر بخط النظام لحد ما خطك يتحمّل.`,
          example: R`// app/layout.tsx
import { Cairo } from "next/font/google";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
<html lang="ar" dir="rtl" className={cairo.variable}>
// globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
// من غير Next
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}`,
          try: R`حط Cairo بـ next/font، وافتح Network وفلتر على Font: هتلاقي ملف woff2 جاي من [[/_next/static/media]] مش من جوجل. وبعدين بطّأ النت (Slow 4G) واعمل refresh وشوف الكلام بيظهر بخط النظام وبعدين يتبدّل.`,
          flag: "script",
          deep: {
            why: "الخط تقل خفي: ملف أو اتنين، وكل واحد عشرات الـ KB، ولو جاي من سيرفر تاني بعد ما الـ CSS يتحمّل بيتأخر أكتر. والصفحة يا إما تفضل من غير كلام، يا إما الكلام يظهر بخط وبعدين يتبدّل ويتنط لأن المقاسات مختلفة (CLS).",
            how: R`[[font-display]] بيحدد المتصفح يعمل إيه لحد ما الخط يوصل: [[block]] يخفي الكلام شوية، و [[swap]] يعرضه بالخط الاحتياطي على طول ويبدّل أول ما يوصل، و [[optional]] يستنى لحظة، ولو الخط موصلش يكمّل بالاحتياطي في الصفحة دي (مفيش تبديل خالص). next/font الافتراضي swap.

مشكلة swap: الخط الاحتياطي (Arial مثلًا) عرض حروفه وارتفاع سطوره مختلف، فلما يتبدّل الفقرات بتطول أو تقصر والصفحة تتنط. next/font بيحل ده بـ [[adjustFontFallback]] (شغال افتراضيًا): بيعمل [[@font-face]] للخط الاحتياطي بـ [[size-adjust]] وقيم محسوبة، بحيث يبقى قد خطك تقريبًا.

[[subsets]] بيحدد أنهي subsets يتعملها preload. الباقي بيتخدم من موقعك برضه، والمتصفح بيحمّله بس لو الصفحة فيها حروف منه (unicode-range). والـ variable fonts ملف واحد لكل الأوزان بدل ملف لكل وزن. و [[--font-sans]] في Tailwind هو الخط الافتراضي للصفحة كلها (الـ Preflight بيحطه على html)، فتغييره بيغيّر الموقع كله.

و [[@import url(...)]] لخط من سيرفر خارجي جوه ملف الـ CSS أسوأ حالة: المتصفح لازم يحمّل الـ CSS بتاعك، ويلاقي الـ import، ويحمّل CSS الخط، ويلاقي ملف الخط، ويحمّله. سلسلة requests واحد ورا التاني.`,
            when: R`في Next دايمًا next/font. في Vite أو PHP: [[@font-face]] بملفات woff2 عندك، و [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للخط الأساسي بس.`,
            mistakes: R`في مشروع حقيقي كان globals.css بيبدأ بـ [[@import url("https://fonts.example.com/...")]] لخط لاتيني جنب خطوط next/font: request خارجي بيوقف الرسم، وكان ممكن يتنقل لـ [[next/font/local]]. وتحمّل 6 أوزان وانت بتستخدم 2. وتنسى subset الـ [[arabic]] فملف العربي ميتعملوش preload: الكلام يظهر بخط النظام الأول ويتبدّل متأخر (الملف بيتحمّل من موقعك برضه، بس بعد ما المتصفح يكتشف إنه محتاجه).`
          },
          teach: R`## الخط بقى ملف من موقعك

[[next/font]] بينزّل الخط من Google **وقت الـ build**، ويحطه جوه مشروعك، ويكتب الـ [[@font-face]] لوحده. والمستخدم بياخد الخط من سيرفرك انت. حطينا الجزء الأول في مشروع Next.js 16.4 (Tailwind 4.3.3) وعملنا build وفتحناه في Chrome، والجزء التاني ([[@font-face]] بإيدك) في صفحة Vite.

---

## ١. [[import { Cairo } from "next/font/google";]]

كل خط في Google Fonts ليه function بنفس اسمه. ولو الاسم فيه مسافة بتبقى [[_]]: [[Noto_Kufi_Arabic]].

## ٢. [[const cairo = Cairo({ ... });]]

| الخيار | يعني |
|---|---|
| [[subsets: ["arabic", "latin"]]] | أنهي أجزاء من الخط يتعملها preload (تحت) |
| [[variable: "--font-cairo"]] | اعمل متغير CSS بالاسم ده فيه اسم الخط |
| [[display: "swap"]] | [[font-display: swap]]: اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل |

Cairo خط **variable**: ملف واحد فيه كل الأوزان، فمش محتاج [[weight]]. وده باين في الـ CSS اللي اتولّد: [[font-weight:200 1000]].

## ٣. [[<html lang="ar" dir="rtl" className={cairo.variable}>]]

[[cairo.variable]] اسم كلاس اتولّد وقت الـ build. في الـ HTML طلع [[class="pW5XIG_variable"]]، والـ CSS بتاعه:

~~~text من الـ CSS الناتج
.pW5XIG_variable{--font-cairo:"Cairo", "Cairo Fallback"}
~~~

يعني الكلاس ده بس بيعرّف المتغير على html، ومش بيغيّر أي خط لوحده.

## ٤. [[globals.css]]: [[@theme inline]]

~~~text globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
~~~

- [[--font-sans]] هو الخط الافتراضي في Tailwind، والـ Preflight بيحطه على [[html]]، فالموقع كله بياخده.
- [[var(--font-cairo)]]: هات قيمة المتغير اللي next/font عمله.
- [[system-ui, sans-serif]]: لو مفيش، خط النظام.
- [[inline]]: Tailwind يحط القيمة نفسها مكان ما بتتستخدم بدل [[var(--font-sans)]]. في الـ CSS الناتج لقينا [[--default-font-family:var(--font-cairo), system-ui, sans-serif]]، ومفيش [[--font-sans]] خالص. ده المطلوب لما قيمة في الـ theme بتشاور على متغير تاني: المتغير يتقري في مكان الاستخدام.

والنتيجة المحسوبة على الفقرة:

~~~text getComputedStyle
font-family: Cairo, "Cairo Fallback", system-ui, sans-serif
~~~

## ٥. اللي حصل وقت الـ build

next/font كتب 4 [[@font-face]]. ٣ لـ Cairo، كل واحد لجزء من الحروف، وواحد للخط الاحتياطي:

| الملف | الحروف ([[unicode-range]]) | preload |
|---|---|---|
| [[9ff27b8a0a8f3dc0-s.p....woff2]] | العربي ([[U+6??]]...) | أيوه |
| [[d41831e24743a3c1-s.p....woff2]] | اللاتيني الأساسي ([[U+??]]...) | أيوه |
| [[a5b03b231ce290a0-s....woff2]] | latin-ext (حروف أوروبية زيادة) | لأ |

- [[unicode-range]]: المتصفح بيحمّل الملف بس لو الصفحة فيها حروف من المدى ده.
- الـ [[.p.]] في الاسم = عليه [[<link rel="preload">]] في الـ head. اللي في [[subsets]] بس هما اللي اتعملهم preload.

والخط الاحتياطي:

~~~text من الـ CSS الناتج
@font-face{font-family:Cairo Fallback;src:local(Arial);ascent-override:137.65%;descent-override:60.32%;line-gap-override:0.0%;size-adjust:94.66%}
~~~

ده Arial اللي على الجهاز ([[local(Arial)]])، بس متعدّل: [[size-adjust:94.66%]] بيصغّر حروفه، و [[ascent-override]] و [[descent-override]] بيظبطوا ارتفاع السطر، عشان مقاساته تبقى قريبة من Cairo. فلما Cairo يوصل ويتبدّل، الكلام ميتنطش.

## ٦. في Chrome

~~~text الـ Network (نوع font)
/_next/static/media/9ff27b8a0a8f3dc0-s.p.40_3w74kn95bo.woff2
/_next/static/media/d41831e24743a3c1-s.p.08tn9snzkmifr.woff2
~~~

- ملفين بس اتحمّلوا: العربي واللاتيني، لأن الصفحة فيها عربي وكلمة Hello. الـ latin-ext متحمّلش.
- الاتنين من [[localhost]]، ومفيش ولا request لـ [[fonts.googleapis.com]] أو [[fonts.gstatic.com]].
- في الـ head لقينا [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للملفين دول.
- Chrome قال إن الكلام اترسم فعلًا بخط [[Cairo]] (custom).

---

## ٧. من غير Next: [[@font-face]] بإيدك

~~~text globals.css
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}
~~~

- [[font-family: "Cairo"]]: الاسم اللي هتكتبه بعدين في [[font-family]]. انت اللي بتختاره.
- [[src: url(...) format("woff2")]]: الملف من موقعك، و [[woff2]] أصغر صيغة خطوط.
- [[font-weight: 200 1000]]: الملف ده بيغطي كل الأوزان من 200 لـ 1000 (variable).
- [[font-display: swap]]: نفس الكلام اللي فوق.

جربناه في صفحة Vite، وأخّرنا ملف الخط ثانيتين عمدًا:

| الوقت | الخط اللي اترسم بيه الكلام | حالة الخط |
|---|---|---|
| 208ms | Segoe UI (خط ويندوز) | [[loading]] |
| 2340ms | Cairo | [[loaded]] |

يعني الكلام ظهر على طول بخط النظام، واتبدّل لما Cairo وصل. ده [[swap]]. بس هنا مفيش [[Cairo Fallback]] متظبط، فلو المقاسات مختلفة الكلام ممكن يتنط وقت التبديل، وده اللي next/font بيحله لوحده.

## الخلاصة

| | next/font | [[@font-face]] بإيدك |
|---|---|---|
| الملف | بينزل وقت الـ build ويتخدم من موقعك | انت بتحطه في [[public/fonts]] |
| preload | لوحده للـ [[subsets]] | [[<link rel="preload">]] بإيدك |
| خط احتياطي متظبط | لوحده ([[size-adjust]]) | مش موجود إلا لو كتبته |
| الربط بـ Tailwind | [[variable]] + [[--font-sans]] | [[--font-sans: "Cairo", ...]] |

- متنساش [[arabic]] في [[subsets]]، وإلا ملف العربي ميتعملوش preload.
- مفيش [[<link>]] لـ Google Fonts ولا [[@import url(...)]].`,
          lines: [
            R`أي خط من Google Fonts كـ function (المسافة في الاسم بتبقى [[_]]).`,
            R`الـ subsets اللي هيتعملها preload (العربي واللاتيني)، والباقي بيتخدم من موقعك برضه بس مش بيتحمّل غير لو اتستخدم. ومتغير CSS اسمه [[--font-cairo]]. Cairo خط variable فمش محتاج weights.`,
            "الكلاس بيعرّف المتغير على html.",
            R`بلوك Tailwind بيعرّف توكنز، والسطر اللي جواه بيخلّي [[font-sans]] (الخط الافتراضي للصفحة) يبقى Cairo.`,
            "Cairo الأول، ولو محمّلش خط النظام.",
            R`قفلة. [[inline]] لأنه بيشاور على متغير.`,
            "برا Next: تعريف الخط بإيدك.",
            R`الاسم اللي هتستخدمه في [[font-family]].`,
            "ملف woff2 من موقعك (أصغر صيغة).",
            "ملف variable واحد فيه كل الأوزان من 200 لـ 1000.",
            "اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل.",
            "قفلة."
          ],
          sol: R`في Network بفلتر Font: هتلاقي ملف أو اتنين [[.woff2]] بأسماء فيها hash زي [[/_next/static/media/xxxxxxxx-s.p.woff2]]، والدومين هو دومين موقعك (localhost:3000)، ومفيش ولا request لـ [[fonts.googleapis.com]] ولا [[fonts.gstatic.com]]. Next نزّل الخط وقت الـ build وبيقدّمه من عندك. والـ [[.p.]] في الاسم معناها إن عليه preload في الـ head.

مع Slow 4G وrefresh: الكلام بيظهر الأول بخط النظام وبعد ثانية أو اتنين بيتبدّل لـ Cairo (ده الـ [[swap]]). والنطّة وقت التبديل صغيرة جدًا، لأن next/font بيعمل خط fallback اسمه زي [[Cairo Fallback]] معدّل بـ [[size-adjust]] عشان مقاساته تبقى قريبة من Cairo. هتلاقيه في Computed › font-family.

لو لقيت request لجوجل، يبقى فيه [[<link>]] لـ Google Fonts لسه في الـ layout أو [[@import url(...)]] في الـ CSS، امسحهم. ولو الخط متطبقش خالص، غالبًا [[--font-sans]] مش بيقرا [[var(--font-cairo)]] أو الـ [[className={cairo.variable}]] مش على [[<html>]].`
        },
        {
          cmd: "lucide-react",
          title: "أيقونات SVG كمكونات React",
          desc: R`في [[lucide-react]] كل أيقونة مكون: [[<Search />]] و [[<Menu />]] و [[<ChevronLeft />]]. بتستورد اللي محتاجه بس، والباقي مش بيدخل الـ bundle. الحجم بـ [[size-4]]، واللون بياخد [[currentColor]] فبيمشي مع [[text-*]].

ومن v1 الأيقونات عليها [[aria-hidden]] افتراضيًا، فلو الزرار أيقونة بس، لازم تدّي الزرار نفسه اسم بـ [[aria-label]].`,
          example: R`import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />
<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />`,
          try: R`اعمل زرار أيقونة بس من غير [[aria-label]] وافتح DevTools › Elements › Accessibility: اسمه فاضي. ضيف الـ label وشوف الاسم ظهر. وبعدين غيّر [[text-brand]] لـ [[text-red-600]] وشوف الأيقونة اتغيرت معاه.`,
          flag: "script",
          deep: {
            why: "الأيقونات كصور PNG بتتشوّه لما تكبر ومش بتاخد لون الكلام. وكـ font icons بتحمّل الخط كله عشان 10 أيقونات، وقارئ الشاشة ساعات يقرا حروف غريبة. SVG inline كمكون بيحل الاتنين: حاد في أي حجم، ولونه [[currentColor]]، وبتحمّل اللي بتستخدمه بس.",
            how: R`كل مكون بيرسم [[<svg>]] بـ [[viewBox="0 0 24 24"]] و [[stroke="currentColor"]] و [[fill="none"]]. [[currentColor]] معناها «لون الكلام بتاع العنصر»، فـ [[text-*]] على الأيقونة أو أي أب ليها بيلوّنها. والحجم الافتراضي 24، و [[size-4]] بيغلبه من الـ CSS.

[[strokeWidth]] بيغيّر سُمك الخط، وبيكبر مع الأيقونة. و [[absoluteStrokeWidth]] بيخليه ثابت بالبكسل مهما الأيقونة كبرت.

Tree-shaking: [[import { Search } from "lucide-react"]] مع bundler حديث بيدخّل Search بس. بس لو عملت [[import * as Icons]] واخترت بالاسم وقت التشغيل، الـ bundler مش هيعرف ويدخّل الكل (آلاف الأيقونات).

lucide v1 (2026): شال أيقونات البراندات (GitHub وفيسبوك وغيرهم)، وشال أسماء قديمة كانت متسابة كـ aliases (فلو import مش لاقي أيقونة دوّر على اسمها الجديد)، وبقى بيحط [[aria-hidden="true"]] على الأيقونات لوحده. ولو محتاج شعارات: Simple Icons أو SVG من البراند نفسه.`,
            when: "أي أيقونة UI في React. و shadcn بيستخدمه افتراضيًا.",
            mistakes: R`زرار أيقونة من غير اسم: قارئ الشاشة يقول «button» وخلاص. [[<Menu />]] من غير حجم جنب كلام صغير فيبان ضخم. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه [[aria-label="Toggle menu"]] كويس، بس ناقصه [[aria-expanded]] فقارئ الشاشة مش عارف القايمة مفتوحة ولا مقفولة (درس aria). و [[npm i lucide-react@latest]] من غير ما تقرا الـ changelog: من 0.x لـ 1.x أيقونات البراندات اتشالت والصفحة بقت 500 بـ [[Export Github doesn't exist in target module]].`
          },
          teach: R`## كل أيقونة component بيرسم [[<svg>]]

[[<Search />]] مش صورة بتتحمّل: ده component بيرسم [[<svg>]] جوه الصفحة نفسها. حطينا المثال في صفحة Vite ([[lucide-react]] 1.52، و Tailwind 4.3.3، و [[--color-brand]] متعرّف) وقسنا في Chrome، وزودنا زرار تالت فيه [[<Menu />]] من غير [[aria-label]] للمقارنة.

---

## ١. [[import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";]]

بتستورد كل أيقونة باسمها. والأسامي PascalCase (كل كلمة أولها كابيتال) لأنها components.

وده بيفرق في الحجم. عملنا build لـ ٣ صفحات صغيرة بـ Vite وقارنّا ملف الـ JavaScript:

| الصفحة | حجم الـ JS |
|---|---|
| React بس، من غير أيقونات | 219.53 kB |
| [[import { Search, Menu }]] | 222.99 kB: زيادة 3.5 kB بس |
| [[import * as Icons]] واختيار الأيقونة بالاسم وقت التشغيل | **984.15 kB**: كل الأيقونات دخلت |

الاستيراد بالاسم زوّد 3.5 kB بس. لكن [[import * as Icons]] مع [[Icons[name]]] دخّل كل الأيقونات، لأن الـ bundler مش عارف وقت الـ build انت هتختار أنهي واحدة. ده اسمه tree-shaking: الـ bundler بيشيل الكود اللي محدش استخدمه، بس لازم يقدر يشوف ده من الكود.

## ٢. الـ SVG اللي بيطلع

ده اللي [[<Search className="size-4" />]] رسمه:

~~~text الناتج
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
     class="lucide lucide-search size-4" aria-hidden="true">
  <path d="m21 21-4.34-4.34"></path>
  <circle cx="11" cy="11" r="8"></circle>
</svg>
~~~

| الـ attribute | يعني |
|---|---|
| [[width="24" height="24"]] | الحجم الافتراضي 24px |
| [[viewBox="0 0 24 24"]] | الرسمة مرسومة على شبكة 24×24، وبتكبر وتصغر من غير ما تبوظ |
| [[fill="none"]] | مفيش تلوين جوه الأشكال، خطوط بس |
| [[stroke="currentColor"]] | لون الخط = لون الكلام ([[color]]) بتاع العنصر |
| [[stroke-width="2"]] | تخانة الخط 2 من 24 |
| [[aria-hidden="true"]] | قارئ الشاشة يتجاهلها. lucide v1 بيحطه لوحده |

و [[className]] بتاعك اتضاف جنب [[lucide lucide-search]].

## ٣. الزرار الأول: أيقونة وكلام

~~~text App.tsx
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
~~~

- [[inline-flex items-center gap-2]]: الأيقونة والكلمة جنب بعض، في النص رأسيًا، و 8px بينهم.
- [[text-brand]] على الزرار: لون الكلام. والأيقونة جوه الزرار، فـ [[currentColor]] بتاعها بياخد نفس اللون.
- [[size-4]]: 16×16. الـ CSS بيغلب [[width="24"]] اللي على الـ svg.

القياس: الأيقونة 16px و [[stroke]] بتاعها [[oklch(0.55 0.2 265)]]، نفس لون الـ brand. غيّرنا [[text-brand]] لـ [[text-red-600]]: الكلام والأيقونة الاتنين بقوا [[oklch(0.577 0.245 27.325)]].

## ٤. الزرار التاني: أيقونة بس

~~~text App.tsx
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
~~~

- [[aria-label]]: اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه والأيقونة [[aria-hidden]].
- [[md:hidden]]: مستخبي من 768px وطالع. على عرض 800 الزرار كان [[display: none]]، وعلى 375 ظهر 24×24.
- [[size-6]] = 24px. و [[strokeWidth={1.5}]] = خط أرفع من الافتراضي، وطلع على الـ svg [[stroke-width="1.5"]].

الـ Accessibility tree على عرض 375:

~~~text الناتج
- button "بحث"
- button "افتح القايمة"
- button
~~~

التالت هو اللي زودناه من غير [[aria-label]]: [[button]] من غير اسم. قارئ الشاشة هيقول «button» وخلاص.

## ٥. [[<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />]]

- [[ChevronLeft]]: سهم صغير بيشاور شمال، يعني «التالي» في صفحة عربي.
- [[shrink-0]]: في flex ميتصغرش لو الكلام اللي جنبه طويل.
- [[ltr:rotate-180]]: في صفحة إنجليزي لفّه نص لفة فيشاور يمين.

| [[lang]] و [[dir]] على html | [[rotate]] المحسوب |
|---|---|
| [[ar]] و [[rtl]] | [[none]]: السهم زي ما هو بيشاور شمال |
| [[en]] و [[ltr]] | [[180deg]]: اتلف نص لفة فبيشاور يمين |

## ٦. [[<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />]]

- [[animate-spin]]: animation اسمها [[spin]] مدتها 1s، بتلف على طول.
- [[motion-reduce:hidden]]: لو المستخدم مفعّل «حركة أقل» في نظامه ([[prefers-reduced-motion: reduce]])، اخفيها.

حاكينا الإعداد ده في Chrome: الأيقونة بقت [[display: none]] ومقاسها 0×0.

## الخلاصة

| عايز | اكتب |
|---|---|
| الحجم | [[size-4]] أو [[size-6]] |
| اللون | [[text-*]] على الأيقونة أو أي أب |
| تخانة الخط | [[strokeWidth={1.5}]] |
| زرار أيقونة بس | [[aria-label]] على الزرار |
| حجم bundle صغير | [[import { Name }]] مش [[import *]] |

- الأيقونة [[aria-hidden]] لوحدها، فالاسم لازم ييجي من الزرار.
- متلوّنهاش بـ [[fill-*]]: دي خطوط، لونها [[stroke]].

---

## فخ: ترقية major شالت أيقونة GitHub والصفحة بقت 500

### العَرَض

مشروع Next 16.4.4 فيه footer بأيقونة GitHub من [[lucide-react@0.577.0]] (آخر نسخة 0.x). حد عمل [[npm i lucide-react@latest]] (عشان أيقونة جديدة)، وفجأة **كل** الصفحات اللي فيها الـ footer:

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:4311/ar
HTTP: 500
~~~

~~~text sed 's/\x1b\[[0-9;]*m//g' dev.log | tail -20
⨯ ./app/components/Footer.tsx:1:1
Error: Export Github doesn't exist in target module
> 1 | import { Github, Mail } from "lucide-react";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The export Github was not found in module [project]/node_modules/lucide-react/dist/esm/lucide-react.mjs [app-rsc] (ecmascript).
Did you mean to import Gift?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.

Import trace:
  Server Component:
    ./app/components/Footer.tsx
    ./app/[lang]/page.tsx

 GET /ar 500 in 1345ms (next.js: 1187ms, application-code: 158ms)
~~~

- [[Export Github doesn't exist]]: الاسم مش موجود في الباكدج.
- [[Did you mean to import Gift?]]: Turbopack بيقترح أقرب اسم بالحروف. **متصدّقوش**: Gift أيقونة هدية، ملهاش علاقة.
- [[Import trace]]: مين استورد الملف ده، لحد الصفحة.

و TypeScript بيقول نفس الكلام من غير ما تشغّل حاجة:

~~~text npx tsc --noEmit
app/components/Footer.tsx(1,10): error TS2305: Module '"lucide-react"' has no exported member 'Github'.
~~~

ورقم الخروج [[2]]. يعني لو [[tsc --noEmit]] أو [[next build]] في الـ CI، كان اتمسك قبل ما يوصل لحد.

### التشخيص بالترتيب

١. **إيه اللي اتغيّر في [[package.json]]؟**

~~~text grep lucide package.json   (قبل ← بعد)
    "lucide-react": "^0.577.0",
    "lucide-react": "^1.67.0",
~~~

نسخة **major** جديدة (0 ← 1). والـ major معناها «فيه حاجات اتشالت أو اتغيّرت».

٢. **النسخ المتاحة، والمتسطبة فعلًا:**

~~~text npm view lucide-react versions --json | tail -5
  "1.64.0",
  "1.65.0",
  "1.66.0",
  "1.67.0"
]
~~~

~~~text head -5 node_modules/lucide-react/package.json
{
  "name": "lucide-react",
  "description": "A Lucide icon library package for React applications.",
  "version": "1.67.0",
~~~

٣. **الأيقونة موجودة في الباكدج الجديد؟**

~~~text grep -ciE "github" node_modules/lucide-react/dist/lucide-react.d.ts
0
~~~

ولا مرة. وعدد الأيقونات:

~~~text ls node_modules/lucide-react/dist/esm/icons | grep -c '\.mjs$'
2296
~~~

يعني الأيقونات **زادت** (في 0.577.0 كانوا 1951 ملف)، بس GitHub مش منهم.

٤. **إيه اللي اتشال بالظبط؟** من غير ما تسطّب القديمة، نزّل الباكدج كملف واقرا منه:

~~~bash
npm pack lucide-react@0.577.0
tar -xzf lucide-react-0.577.0.tgz package/dist/lucide-react.d.ts
grep -oE "declare const (Github|Gitlab|Facebook|Instagram|Linkedin|Twitter|Youtube|Figma|Slack)\b" package/dist/lucide-react.d.ts | sort -u
~~~

[[npm pack]] بينزّل الـ [[.tgz]] بتاع النسخة دي بس (مش بيسطّب)، و [[tar -xzf ... مسار]] بيطلّع الملف ده بس. وقارنّا قايمة أكبر بين النسختين: اتشالوا [[Codepen]] و [[Codesandbox]] و [[Dribbble]] و [[Facebook]] و [[Figma]] و [[Framer]] و [[Github]] و [[Gitlab]] و [[Instagram]] و [[Linkedin]] و [[Pocket]] و [[Slack]] و [[Trello]] و [[Twitch]] و [[Twitter]] و [[Youtube]]، وفضل [[Rss]]. يعني v1 شال **أيقونات البراندات** كلها.

### ازاي حصل القفز ده؟ [[^]] على 0.x

[[^0.577.0]] معناها «أي 0.577.x»: في نسخ 0.x الـ caret بيقفل الرقم التاني كمان. اتأكدنا:

~~~text npm outdated lucide-react
Package       Current   Wanted  Latest  Location                   Depended by
lucide-react  0.577.0  0.577.0  1.67.0  node_modules/lucide-react  shop2
~~~

~~~text npm update lucide-react
up to date in 764ms
~~~

[[Wanted]] (أعلى نسخة الـ range بيسمح بيها) = 0.577.0، و [[npm update]] مغيّرش حاجة. القفز لـ 1.x محتاج حد يطلبه صريح: [[npm i lucide-react@latest]] أو [[npm i lucide-react]] من غير رقم (اللي بيكتب [[^1.67.0]])، أو أداة بتعمل كده.

### الحل (اختار واحد)

**(أ) ارجع واقفل النسخة بالظبط:**

~~~text npm i --save-exact lucide-react@0.577.0 && grep lucide package.json
    "lucide-react": "0.577.0",
~~~

[[--save-exact]] بيكتب الرقم من غير [[^]]، فمحدش هيرقّي غير لما يغيّر الرقم بإيده. سريع، بس انت كده فضلت على نسخة مش هتاخد أيقونات وتصليحات جديدة.

**(ب) خليك على 1.x، والبراند SVG من مصدر للبراندات:** [[simple-icons]] (16.36.0) فيه path البراندات الرسمية:

~~~tsx app/components/BrandIcon.tsx
import type { SimpleIcon } from "simple-icons";

export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
~~~

~~~tsx app/components/Footer.tsx
import { Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { BrandIcon } from "./BrandIcon";
...
<a href="https://github.com/acme" aria-label="GitHub"><BrandIcon icon={siGithub} className="size-5" /></a>
~~~

- [[fill="currentColor"]] مش [[stroke]]: أيقونات البراندات **مليانة**، عكس lucide (خطوط).
- [[siGithub.path]]: الـ [[d]] بتاع الشعار، و [[siGithub.hex]] لونه الرسمي ([[181717]]) لو احتجته.
- [[aria-hidden]] على الـ SVG و [[aria-label]] على اللينك (نفس قاعدة lucide).

بعدها: [[HTTP: 200]]، و [[npx tsc --noEmit]] خرج [[0]]. والـ footer server component، فالـ SVG بيتبعت HTML ومفيش JavaScript زيادة للمتصفح.

**ليه مش البدايل دي؟**

| البديل | ليه لأ |
|---|---|
| تصدّق [[Did you mean Gift?]] | أيقونة تانية خالص |
| تنسخ ملف الأيقونة من 0.577.0 جوه مشروعك | شغّال، بس انت كده بتصون نسخة من مكتبة. لو هتنسخ SVG، انسخه من مصدر للبراندات |
| تفضل على 0.x للأبد | مفيش أيقونات جديدة ولا تصليحات. اختار (أ) وانت عارف إنه مؤقت |
| تشيل الأيقونة وتحط كلمة «GitHub» | بيحل الـ 500، بس الديزاين اتغيّر من غير ما حد يقرر |

### إزاي متتكررش

- قبل أي ترقية major: اقرا الـ changelog أو صفحة الـ releases بتاعة المكتبة، ودوّر على «removed» أو «breaking».
- [[npm outdated]] بيوريك [[Latest]] أكبر من [[Wanted]] بـ major = محتاجة قرار، مش [[npm update]].
- [[npm i --save-exact]]، أو مرة واحدة للمشروع [[.npmrc]] فيه [[save-exact=true]] (جربنا: [[npm config get save-exact]] طلّع [[true]] جوه الفولدر).
- [[npx tsc --noEmit]] أو [[next build]] في الـ CI: كان هيقف بـ [[TS2305]] قبل الـ merge.`,
          lines: [
            "استورد الأيقونات بالاسم. اللي مش مستورد مش بيدخل الـ bundle.",
            R`زرار فيه أيقونة وكلام: اللون من [[text-brand]] بيوصل للأيقونة.`,
            "16px، والكلام اللي جنبها هو اسم الزرار.",
            R`قفلة الزرار الأول: الأيقونة والكلمة جواه، فالكلمة هي اسمه.`,
            R`زرار أيقونة بس: [[aria-label]] هو اسمه لقارئ الشاشة.`,
            "الأيقونة نفسها مخفية عن قارئ الشاشة، وخطها أرفع من الافتراضي (2).",
            R`قفلة الزرار التاني: مفيهوش كلام، فاسمه جاي من [[aria-label]] بس.`,
            R`سهم «التالي» في صفحة عربي بيشاور شمال، وفي الإنجليزي بيلف لليمين. و [[shrink-0]] عشان ميتزنقش جنب كلام طويل.`,
            "loader بيلف، ويختفي عند اللي طالبين حركة أقل."
          ],
          sol: R`زرار الأيقونة من غير [[aria-label]]: في Accessibility pane هتلاقي Role [[button]] و Name فاضي، وقارئ الشاشة بيقول «button» بس، و Lighthouse بيطلّعه في «Buttons do not have an accessible name». بعد [[aria-label="افتح القايمة"]] الـ Name بقى «افتح القايمة» وجنبه إنه جاي من [[aria-label]].

لما تغيّر [[text-brand]] لـ [[text-red-600]] على الزرار: الأيقونة والكلمة الاتنين بقوا أحمر مع بعض، لأن الـ SVG بتاع lucide مرسوم بـ [[stroke="currentColor"]]، يعني بياخد لون الـ [[color]] من الأب. لو فتحت الـ SVG في Elements هتلاقي [[stroke="currentColor"]] و [[fill="none"]].

الغلط الشائع: تحاول تلوّن الأيقونة بـ [[fill-red-600]] فتطلع مليانة ومشوّهة، لأن lucide أيقونات خطوط. اللون بالـ [[text-*]] والتخانة بـ [[strokeWidth]].

ولو الصفحة بقت 500 بعد ترقية lucide واللوج فيه [[Export Github doesn't exist in target module]]: v1 شال أيقونات البراندات. [[grep lucide package.json]] هتلاقي [[^1.x]]. ارجع بـ [[npm i --save-exact lucide-react@0.577.0]]، أو خليك على 1.x وحط الشعار من [[simple-icons]] بـ [[fill="currentColor"]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[package.json]] فيه [[lucide-react: "^0.577.0"]] و [[react: "^19.2.0"]]. لو آخر نسخ متاحة 0.577.3 و 1.67.0 لـ lucide، و 19.3.1 و 20.0.0 لـ react، [[npm update]] هيسطّب إيه لكل واحدة؟ اكتب، وبعدين اعرف من [[npm outdated]] على مشروع حقيقي إن عمود [[Wanted]] بيقول نفس الكلام.`, done: R`كتبت 0.577.3 لـ lucide (الـ caret على 0.x بيقفل الرقم التاني) و 19.3.1 لـ react (مش 20)، وتقدر تشاور على عمود [[Wanted]] في [[npm outdated]] وتشرحه.`, sol: R`~~~bash
npx semver -r "^0.577.0" 0.577.0 0.577.3 1.67.0
npx semver -r "^19.2.0" 19.2.0 19.3.1 20.0.0
npm outdated
~~~

**الإجابة:** lucide هتبقى 0.577.3، و react هتبقى 19.3.1.

**ليه:** الـ caret [[^]] بيسمح بأي تحديث مش كاسر، والتعريف معتمد على أول رقم مش صفر:

- [[^19.2.0]]: أول رقم مش صفر هو 19، فبيسمح بأي 19.x.x، ومش 20.
- [[^0.577.0]]: الرقم الأول صفر، فأول رقم مش صفر هو 577، فبيسمح بـ 0.577.x بس.

و semver بتعتبر كل [[0.x]] غير ثابتة، فأي زيادة في الرقم التاني ممكن تكسر. عشان كده 1.67.0 مش هتوصل.

في [[npm outdated]]: [[Wanted]] أعلى نسخة بتطابق الـ range، و [[Latest]] أحدث نسخة منشورة. لو الاتنين مختلفين، [[npm update]] مش هيوصلك لـ Latest.

**الغلطة الشائعة:** تفتكر إن [[npm update]] بيجيب آخر نسخة. لازم [[npm install pkg@latest]].

~~~text الناتج
^0.577.0 بيطابق: 0.577.0 ، 0.577.3
^19.2.0 بيطابق: 19.2.0 ، 19.3.1

npm outdated (lab بنسخة 0.577.0 ، و latest وقت التجربة 1.68.0):
Package       Current  Wanted   Latest
lucide-react  0.577.0  0.577.0  1.68.0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح المكوّن البايظ ده بعد الترقية لـ lucide 1.x من غير ما ترجع النسخة: [[import { Github, Youtube, Mail } from "lucide-react"]]. استخدم [[simple-icons]] للبراندين و [[BrandIcon]] زي الدرس، وأثبت بـ [[npx tsc --noEmit]] و [[curl -w "%{http_code}"]].`, done: R`[[tsc]] خرج 0، والصفحة [[200]]، و [[curl | grep -o "<svg" | wc -l]] بيعدّ ٣ أيقونات، واللينكات عليها [[aria-label]].`, sol: R`~~~tsx BrandIcon.tsx
import type { SimpleIcon } from "simple-icons";

export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
~~~

~~~tsx Footer.tsx
import { Mail } from "lucide-react";
import { siGithub, siYoutube } from "simple-icons";
import { BrandIcon } from "./BrandIcon";

export function Footer() {
  return (
    <footer className="flex gap-4 p-4">
      <a href="https://github.com/acme" aria-label="GitHub"><BrandIcon icon={siGithub} className="size-5" /></a>
      <a href="https://www.youtube.com/@acme" aria-label="YouTube"><BrandIcon icon={siYoutube} className="size-5" /></a>
      <a href="mailto:hello@example.com" aria-label="الإيميل"><Mail className="size-5" aria-hidden="true" /></a>
    </footer>
  );
}
~~~

~~~bash
npx tsc --noEmit
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s http://localhost:3000/ | grep -o "<svg" | wc -l
~~~

**ليه:** lucide 1.x شالت أيقونات البراندات، و [[Mail]] لسه موجودة لأنها أيقونة عامة. فبنسيب [[Mail]] من lucide، ونجيب البراند من [[simple-icons]].

[[BrandIcon]] بيرسم [[icon.path]] بـ [[fill="currentColor"]]، فاللون جاي من اللينك. و simple-icons أشكال ملية، عكس lucide اللي خطوط. عشان كده [[fill]] مش [[stroke]].

و [[aria-label]] على اللينك هو الاسم، والأيقونة [[aria-hidden]].

**انتبه لحاجتين:** [[siLinkedin]] مش موجودة في simple-icons 16.36.0 ([[tsc]] بيقول [[has no exported member]])، فـ LinkedIn محتاج SVG من ملفات الشركة الرسمية. و [[grep -c]] بيعدّ سطور مش تطابقات، و React بيطلّع الصفحة في سطر واحد، فلازم [[grep -o]] مع [[wc -l]].

**الغلطة الشائعة:** ترجّع lucide لـ 0.x عشان ترتاح. كده انت قفلت على نسخة قديمة.

~~~text الناتج
npx tsc --noEmit        exit 0
curl                    200
grep -o "<svg" | wc -l  3
aria-label:             GitHub ، YouTube ، الإيميل

(اتقاس بـ renderToString من React 19.3.1 وسيرفر Node صغير.)
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من غير ما تسطّب، بـ [[npm pack]] و [[tar]] طلّع [[dist/lucide-react.d.ts]] من 0.577.0 ومن آخر نسخة، وطلّع قايمة الأسامي اللي في القديمة ومش في الجديدة ([[comm -23]] على لستتين مترتبين، أو سكربت Node).`, done: R`عندك لستة فيها [[Github]] و [[Facebook]] و [[Youtube]] على الأقل، وعارف تشرح [[npm pack]] بيعمل إيه في سطر.`, sol: R`~~~bash
npm pack lucide-react@0.577.0 --silent
npm pack lucide-react@latest --silent
mkdir old new
tar -xzf lucide-react-0.577.0.tgz -C old package/dist/lucide-react.d.ts
tar -xzf lucide-react-1.68.0.tgz -C new package/dist/lucide-react.d.ts
node gone.mjs old/package/dist/lucide-react.d.ts new/package/dist/lucide-react.d.ts
~~~

~~~js gone.mjs
import { readFileSync } from "node:fs";

function exportsOf(file) {
  const text = readFileSync(file, "utf8");
  const start = text.lastIndexOf("export {");
  const body = text.slice(start + "export {".length, text.indexOf("}", start));
  return new Set(body.split(",").map((s) => s.trim().split(" as ").pop()).filter(Boolean));
}

const [oldFile, newFile] = process.argv.slice(2);
const before = exportsOf(oldFile);
const after = exportsOf(newFile);
const gone = [...before].filter((name) => !after.has(name)).sort();
console.log(before.size, after.size, gone.length);
console.log(gone.join(" "));
~~~

**[[npm pack]] بيعمل إيه:** بينزّل الملف المضغوط اللي npm هيسطّبه، ويحطه في الفولدر، من غير ما يلمس [[node_modules]] أو [[package.json]].

**ليه السكربت بيقرا [[export { ... }]]:** شكل الملف اتغيّر بين النسختين: القديمة [[declare const Github: react.Forward…]]، والجديدة [[declare const Mail: LucideIcon]]. وأول محاولة بـ [[comm -23]] على أسماء [[declare]] طلّعت 61 اسم، منهم أسماء لسه موجودة زي [[Trash2]] كـ alias. سطر [[export]] هو الحقيقة، لأنه اللي بتعمل منه import.

**الغلطة الشائعة:** تعمل [[comm]] من غير [[sort]] بنفس الـ locale. [[comm]] لازم ملفين مترتبين، فاكتب [[LC_ALL=C]] قبل الاتنين.

~~~text الناتج
5844 6932 57

(5844 اسم قديم ، 6932 جديد ، 57 راحوا: كل أيقونة باسم و Icon و Lucide)

الأيقونات الـ 19:
Chrome Chromium Codepen Codesandbox Dribbble Facebook Figma Framer Github
Gitlab Instagram Linkedin Pocket RailSymbol Slack Trello Twitch Twitter Youtube
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** اكتب [[majors.mjs]]: بيقرا [[package.json]] وملف JSON فيه آخر نسخة لكل باكدج (اعمله بإيدك أو من [[npm view <pkg> version]])، ويطبع كل باكدج الـ range بتاعه مش هيوصل لآخر نسخة لأن الفرق major، ويخرج بـ 1 لو فيه. (شكل فحص الـ ci في الدرس.)`, done: R`على [[{"lucide-react":"^0.577.0","react":"^19.2.0"}]] وآخر نسخ [[1.67.0]] و [[19.3.1]] بيطبع [[lucide-react: ^0.577.0 -> 1.67.0 (major)]] بس ويخرج 1.`, sol: R`~~~js majors.mjs
import { readFileSync } from "node:fs";

const [pkgFile = "package.json", latestFile = "latest.json"] = process.argv.slice(2);
const { dependencies = {}, devDependencies = {} } = JSON.parse(readFileSync(pkgFile, "utf8"));
const latest = JSON.parse(readFileSync(latestFile, "utf8"));
const all = { ...dependencies, ...devDependencies };

// نفس منطق الـ caret: أول رقم مش صفر هو الـ major الفعلي
function lockedPart(version) {
  const [major, minor, patch] = version.replace(/^[\^~]/, "").split(".").map(Number);
  if (major > 0) return $__bt$__{major}$__bt;
  if (minor > 0) return $__bt0.$__{minor}$__bt;
  return $__bt0.0.$__{patch}$__bt;
}

let found = 0;
for (const [name, range] of Object.entries(all)) {
  const newest = latest[name];
  if (!newest) continue;
  if (!range.startsWith("^")) continue;
  if (lockedPart(range) !== lockedPart(newest)) {
    console.log($__bt$__{name}: $__{range} -> $__{newest} (major)$__bt);
    found++;
  }
}
process.exit(found ? 1 : 0);
~~~

~~~json package.json
{"dependencies":{"lucide-react":"^0.577.0","react":"^19.2.0"}}
~~~

~~~json latest.json
{"lucide-react":"1.67.0","react":"19.3.1"}
~~~

~~~bash
node majors.mjs package.json latest.json
echo "exit: $?"
~~~

**ليه [[lockedPart]]:** مقارنة الرقم الأول لوحدها غلط مع [[0.x]]. الدالة بترجع الجزء اللي الـ caret قافل عليه: [[19]] لـ [[^19.2.0]]، و [[0.577]] لـ [[^0.577.0]]. لو الجزء ده اختلف عن آخر نسخة، الـ range مش هيوصلها.

وآخر نسخة فيها [[lockedPart]] بتتحسب بنفس الطريقة: [[1.67.0]] بتدّي [[1]]، و [[19.3.1]] بتدّي [[19]].

**السكربت بيتجاهل** أي range مش بيبدأ بـ [[^]]، و [[process.exit(found ? 1 : 0)]] بيخليه يشتغل في CI.

**الغلطة الشائعة:** تعمل [[parseInt]] على الـ range بالكامل. أو تعتبر 0.577 و 0.578 نفس الـ major.

~~~text الناتج
lucide-react: ^0.577.0 -> 1.67.0 (major)
exit: 1
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const deps = { "lucide-react": "^0.577.0", "react": "^19.2.0", "simple-icons": "16.36.0" };
const latest = { "lucide-react": "1.67.0", "react": "19.3.1", "simple-icons": "16.36.0" };
const parse = v => v.replace(/^[\^~]/, "").split(".").map(Number);
function caretAllows(range, v) {
  if (!range.startsWith("^")) return range === v;
  const [a, b, c] = parse(range), [x, y, z] = parse(v);
  if (a > 0) return x === a && (y > b || (y === b && z >= c));
  return x === 0 && y === b && z >= c;
}
let bad = 0;
for (const [name, range] of Object.entries(deps)) {
  const ok = caretAllows(range, latest[name]);
  console.log(name + ": " + range + " -> " + latest[name] + (ok ? " ok" : " (major)"));
  if (!ok) bad++;
}
console.log("needs decision: " + bad);`, expect: [R`lucide-react: ^0.577.0 -> 1.67.0 (major)`, R`react: ^19.2.0 -> 19.3.1 ok`, R`simple-icons: 16.36.0 -> 16.36.0 ok`, R`needs decision: 1`] },
          ],
        }
      ]
    }
]);
