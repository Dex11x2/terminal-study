// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات الويب",
      l: 2,
      n: "اللي بيتعمل منه أي موقع: .html و .css و .js وأخواته .mjs و .cjs، و .ts و .d.ts، و .jsx و .tsx و .vue و .svelte، و .min.js و .map اللي بتطلع من الـ build",
      items: [
        {
          cmd: ".html",
          title: "ملف .html جواه إيه، وبتفتحه في المتصفح إزاي صح؟",
          desc: R`[[.html]] ملف نصي فيه هيكل الصفحة بالتاجات: عنوان وفقرات وصور ولينكات وفورمز. المتصفح بيقراه ويرسمه. التفاصيل الكاملة للغة في تاب HTML و CSS، هنا هنعرف الملف نفسه.

جواه إيه:
• [[<!DOCTYPE html>]] أول سطر: بيقول للمتصفح «HTML حديث». من غيره المتصفح بيشتغل في وضع قديم (quirks mode) وحاجات في الـ CSS بتبوظ.
• [[<html lang="ar" dir="rtl">]]: الـ root، وفيه اللغة واتجاه الكتابة.
• [[<head>]]: معلومات عن الصفحة مش بتظهر فيها: [[<meta charset="utf-8">]] (لازم وفي الأول عشان العربي)، والعنوان، و viewport للموبايل، وربط ملفات CSS.
• [[<body>]]: اللي بيظهر.
• التاجات زي XML بس أسمح: [[<img>]] و [[<meta>]] و [[<br>]] و [[<input>]] مبيتقفلوش (void elements)، والمتصفح بيصلّح أغلب الأخطاء لوحده من غير ما يقولك.
• التعليق [[<!-- -->]]، والـ entities زي XML وزيادة ([[&nbsp;]] و [[&copy;]]).

الامتدادات: [[.html]] هو الأساسي، و [[.htm]] نفس الحاجة (من أيام الامتدادات اللي ٣ حروف). و [[index.html]] اسم خاص: السيرفر بيبعته لما حد يطلب الفولدر نفسه ([[/]]).

بتفتحه إزاي:
• دبل كليك: المتصفح بيفتحه من [[file:///]]. ده كويس لصفحة بسيطة، بس [[fetch]] و ES modules ([[type="module"]]) وحاجات تانية مش بتشتغل من [[file://]] لأسباب أمان.
• الأصح: سيرفر صغير محلي. [[python3 -m http.server 8000]] في الفولدر وبعدين [[http://localhost:8000]]، أو [[npx serve]]، أو إضافة Live Server في VS Code.

ولو عايز تعرف المتصفح فهم الصفحة إزاي: [[F12]] ثم تاب Elements، ده الشكل بعد ما المتصفح صلّح الأخطاء، مش الملف زي ما انت كاتبه ([[Ctrl+U]] بيعرض الملف الأصلي).`,
          example: R`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>بوابة الجيم</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>أهلًا بيك</h1>
  <p class="intro">احجز ميعادك <a href="/book">من هنا</a>.</p>
  <img src="logo.png" alt="لوجو الجيم">
  <script src="app.js" defer>$__lt/script>
</body>
</html>`,
          flag: "script",
          try: R`احفظ المثال في [[index.html]] في فولدر لوحده وافتحه بدبل كليك وبص على الرابط فوق ([[file:///...]]). بعدين في نفس الفولدر نفّذ [[python3 -m http.server 8000]] وافتح [[http://localhost:8000]]. افتح [[F12]] وشوف تاب Console: هيقولك إن [[style.css]] و [[app.js]] و [[logo.png]] مش موجودين (404). وجرّب تشيل سطر [[charset]] وتعمل refresh.`,
          deep: {
            why: R`HTML هو الملف الوحيد اللي المتصفح بيبدأ بيه: أي موقع، حتى React و Next.js، في الآخر بيبعت HTML، والـ HTML ده هو اللي بيقول هات الـ CSS والـ JS منين.`,
            how: R`المتصفح بيقرا الملف من فوق لتحت ويبني شجرة اسمها DOM. لما يلاقي [[<link rel="stylesheet">]] بيطلب ملف الـ CSS، ولما يلاقي [[<script>]] بيطلب الـ JS (و [[defer]] معناها نزّله دلوقتي ونفّذه بعد ما الصفحة تخلص). وكل ملف بيتطلب بطلب HTTP منفصل، فالسيرفر لازم يبعت كل واحد بالـ Content-Type الصح (المستوى ٣).`,
            when: R`أي صفحة ويب، وكمان قوالب الإيميلات، وملفات التقارير اللي بتتفتح في المتصفح، والـ [[index.html]] اللي Vite و React بيبدأوا منه.`,
            mistakes: R`تنسى [[<meta charset="utf-8">]] فالعربي يظهر ملخبط. تفتح الصفحة من [[file://]] وتستغرب إن [[fetch]] أو الـ modules مش شغالين ([[blocked by CORS policy]]): شغّل سيرفر محلي. تكتب مسار من جهازك [[C:\Users\...\logo.png]] فيشتغل عندك بس. وتحفظ الملف [[index.html.txt]] لأن الامتدادات مخفية (درس «إظهار الامتدادات»).`
          },
          teach: R`## الفكرة

المثال ده ملف [[index.html]] كامل وصغير. هنقراه سطر سطر: كل سطر بيقول للمتصفح إيه، وبعدين نفتحه بطريقتين (دبل كليك، وسيرفر محلي) ونشوف الفرق. السيرفر اتجرّب بـ Python 3.14 على ويندوز وبـ Python 3.13 في Docker (لينكس).

---

## ١. [[<!DOCTYPE html>]]

ده مش تاج، ده إعلان (declaration) بيقول «الملف ده HTML حديث». لازم يبقى أول حاجة في الملف. من غيره المتصفح بيدخل **quirks mode**: وضع بيقلّد متصفحات التسعينات، وفيه حاجات زي حساب عرض الصناديق وارتفاع الجداول بتتحسب غلط.

## ٢. [[<html lang="ar" dir="rtl">]]

- [[<html>]] هو الـ **root**: كل الصفحة جواه، وبيتقفل في آخر سطر بـ [[</html>]].
- [[lang="ar"]]: اللغة. قارئ الشاشة بينطق الكلام عربي، وجوجل بيعرف لغة الصفحة، والمتصفح بيختار خط مناسب.
- [[dir="rtl"]] (right to left): الصفحة كلها تبدأ من اليمين. من غيره الفقرات تبقى لازقة في الشمال.

التاج بيتكتب [[<اسم خاصية="قيمة">]]، والحاجات اللي جواه زي [[lang]] اسمها **attributes**.

## ٣. الـ [[<head>]]: معلومات مش بتظهر

~~~text الأسطر من ٣ لـ ٨
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>بوابة الجيم</title>
  <link rel="stylesheet" href="style.css">
</head>
~~~

| السطر | معناه |
|---|---|
| [[<meta charset="utf-8">]] | الملف متخزن UTF-8 (درس UTF-8). لازم يبقى في أول ١٠٢٤ byte من الملف، عشان كده بيتحط أول حاجة في الـ head |
| [[<meta name="viewport" ...>]] | الموبايل افتراضيًا بيرسم الصفحة كأنها شاشة عرضها حوالي 980px ويصغّرها. [[width=device-width]] = اعرض الصفحة بعرض الموبايل الحقيقي، و [[initial-scale=1]] = من غير تصغير ولا تكبير |
| [[<title>]] | الاسم اللي بيظهر في التاب وفي نتايج جوجل والـ bookmarks |
| [[<link rel="stylesheet" href="style.css">]] | [[rel]] (relation) = الملف ده إيه بالنسبة للصفحة: stylesheet يعني تنسيق. [[href]] (hypertext reference) = مكانه. [[style.css]] من غير [[/]] يعني «جنب ملف الـ HTML» |

و [[<meta>]] و [[<link>]] مبيتقفلوش: دول **void elements**، ملهمش محتوى جواهم.

## ٤. الـ [[<body>]]: اللي بيظهر

- [[<h1>]] (heading 1): العنوان الرئيسي، وفيه لحد [[<h6>]].
- [[<p class="intro">]]: [[p]] = paragraph (فقرة). و [[class]] اسم بنحطه عشان الـ CSS أو الـ JS يلاقوا العنصر ده ([[.intro]] في درس [[.css]]).
- [[<a href="/book">من هنا</a>]]: [[a]] = anchor (لينك). [[href="/book"]] بيبدأ بـ [[/]] يعني «من أول الموقع»: [[http://localhost:8000/book]].
- [[<img src="logo.png" alt="لوجو الجيم">]]: [[src]] (source) مكان الصورة، و [[alt]] (alternative) النص اللي يظهر لو الصورة مظهرتش، وقارئ الشاشة بيقراه. و [[<img>]] void زي [[<meta>]].
- [[<script src="app.js" defer>$__lt/script>]]: ملف JavaScript. [[defer]] = نزّله دلوقتي بس متنفذوش غير لما الصفحة كلها تتبني. ده بيخلي الكود يلاقي العناصر، ومبيوقفش رسم الصفحة. و [[<script>]] **لازم** يتقفل حتى لو فاضي.

## ٥. الطريقة الأولى: دبل كليك

الرابط فوق بيبقى حاجة زي:

~~~text شريط العنوان
file:///C:/Users/ali/lab/site/index.html
~~~

[[file://]] معناها «ملف من الديسك» مش من سيرفر. الصفحة بتظهر، والصورة والـ CSS لو موجودين جنبها بيتحمّلوا. بس المتصفح بيعامل [[file://]] بحذر: [[fetch("data.json")]] و [[<script type="module">]] بيترفضوا برسالة [[blocked by CORS policy]].

## ٦. الطريقة الصح: سيرفر محلي

~~~bash
python3 -m http.server 8000
~~~

- [[python3]] (على ويندوز [[python]] أو [[py]]).
- [[-m]] (module): شغّل module جاهز جوه Python بدل ملف بتاعك.
- [[http.server]]: سيرفر ملفات بسيط بيعرض الفولدر الحالي.
- [[8000]]: رقم الـ port. أي رقم فاضي فوق 1024 ينفع.

على لينكس (Docker، Python 3.13):

~~~text الناتج
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
~~~

وعلى ويندوز بـ Python 3.14 السطر بيقول [[Serving HTTP on :: port 8000 (http://[::]:8000/) ...]]. [[0.0.0.0]] و [[::]] معناهم «اسمع على كل كروت الشبكة» (الأول IPv4 والتاني IPv6)، وانت بتفتح [[http://localhost:8000]].

ولما المتصفح يطلب الصفحة، السيرفر بيكتب سطر لكل طلب. ده اللي ظهر فعلًا لما طلبنا الصفحة والملفين اللي مش موجودين:

~~~text ناتج السيرفر
::1 - - [07/Oct/2026 12:31:46] "GET / HTTP/1.1" 200 -
::1 - - [07/Oct/2026 12:31:46] code 404, message File not found
::1 - - [07/Oct/2026 12:31:46] "GET /style.css HTTP/1.1" 404 -
::1 - - [07/Oct/2026 12:31:46] code 404, message File not found
::1 - - [07/Oct/2026 12:31:46] "GET /app.js HTTP/1.1" 404 -
~~~

| الحتة | معناها |
|---|---|
| [[::1]] | مين طلب: [[::1]] هو localhost بـ IPv6 (زي [[127.0.0.1]]) |
| [["GET / HTTP/1.1"]] | الطلب نفسه: [[GET]] = هات، و [[/]] = الفولدر نفسه، فالسيرفر بيبعت [[index.html]] |
| [[200]] | نجح |
| [[404]] | مش موجود: [[style.css]] و [[app.js]] لسه معملناهمش |

يعني الصفحة الواحدة = طلب للـ HTML، وبعده طلب منفصل لكل ملف هي بتشاور عليه. وفي الـ DevTools ([[F12]] ثم Console أو Network) هتشوف نفس الـ 404. ولإيقاف السيرفر: [[Ctrl+C]].

---

## ٧. Elements مش زي [[Ctrl+U]]

| | بيعرض إيه |
|---|---|
| [[Ctrl+U]] (View Source) | الملف زي ما السيرفر بعته بالظبط |
| [[F12]] ثم Elements | شجرة الـ DOM: الشكل بعد ما المتصفح قرا الملف وصلّح أخطاءه وبعد ما الـ JS غيّر فيه |

لو نسيت تقفل [[</p>]] مثلًا، [[Ctrl+U]] هيوريك غلطتك، و Elements هيوريك المتصفح قفلها فين.

## الخلاصة

- الهيكل الثابت: [[<!DOCTYPE html>]] ثم [[<html lang dir>]] ثم [[<head>]] (charset أول حاجة، و viewport، و title، و link) ثم [[<body>]].
- [[<meta>]] و [[<link>]] و [[<img>]] مبيتقفلوش، و [[<script>]] لازم يتقفل.
- افتح المشاريع من سيرفر محلي ([[python3 -m http.server]]) مش بدبل كليك، وكل ملف بيتشاور عليه = طلب HTTP لوحده.`,
          lines: [
            R`HTML حديث (HTML5).`,
            R`الـ root: اللغة عربي والاتجاه من اليمين.`,
            R`بداية معلومات الصفحة.`,
            R`الترميز UTF-8، ولازم يبقى في أول الـ head.`,
            R`عشان الصفحة تتظبط على عرض الموبايل.`,
            R`العنوان اللي بيظهر في التاب.`,
            R`ربط ملف CSS خارجي.`,
            R`قفل الـ head.`,
            R`بداية اللي بيظهر.`,
            R`عنوان رئيسي.`,
            R`فقرة ليها class، وجواها لينك.`,
            R`صورة: [[<img>]] مبيتقفلش، و [[alt]] الوصف لو الصورة مظهرتش ولقارئ الشاشة.`,
            R`ملف JS خارجي، و [[defer]] يتنفذ بعد ما الصفحة تتبني.`,
            R`قفل الـ body.`,
            R`قفل الـ html.`
          ],
          sol: R`بالدبل كليك الرابط بيبقى [[file:///home/you/lab/site/index.html]] والصفحة بتظهر من اليمين للشمال بالعنوان والفقرة. ومع [[python3 -m http.server 8000]] الترمنال بيطبع:
[[Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...]]
وتحته سطر لكل طلب، منهم [["GET /style.css HTTP/1.1" 404 -]] لأن الملف مش موجود. وفي Console هتلاقي 404 لنفس الملفات.

لما تشيل سطر [[charset]] ساعات العربي بيفضل سليم لأن السيرفر أو المتصفح بيخمّن صح، وساعات (خصوصًا من [[file://]] أو سيرفرات قديمة) بيظهر [[Ø§Ù„]]. متعتمدش على التخمين.`
        },
        {
          cmd: ".css",
          title: "ملف .css جواه إيه، وإيه .scss و .module.css؟",
          desc: R`[[.css]] ملف نصي فيه قواعد التنسيق: الألوان والخطوط والمسافات والـ layout. التفاصيل في تاب HTML و CSS.

شكل القاعدة:
• selector بيختار العناصر: [[body]] (تاج)، و [[.intro]] (class، بنقطة)، و [[#header]] (id، بشباك)، و [[a:hover]] (حالة).
• [[{ }]] جواهم الخصائص.
• [[property: value;]]: خاصية و [[:]] وقيمة و [[;]] في الآخر.
• [[/* تعليق */]]: التعليق الوحيد في CSS. مفيش [[//]].
• [[--brand: #e11d48;]]: متغير (custom property)، وبيتقري بـ [[var(--brand)]].
• [[@media]] و [[@import]] و [[@font-face]] و [[@keyframes]]: قواعد خاصة بتبدأ بـ [[@]].

بيوصل للصفحة إزاي: [[<link rel="stylesheet" href="style.css">]] في الـ head (الأفضل)، أو [[<style>]] جوه الـ HTML، أو [[style="..."]] على العنصر.

أخواته:
• [[.scss]] و [[.sass]] (Sass) و [[.less]]: لغات بتتحول لـ CSS، فيها متغيرات و nesting و mixins. المتصفح مبيفهمهاش، لازم build (Vite بيعملها لوحده لو نزلت [[sass]]).
• [[.module.css]]: CSS Modules في React و Next.js: الـ classes جواه بتاخد أسامي فريدة عشان متتعارضش مع ملفات تانية.
• [[.css.map]]: source map للـ CSS (درس [[.min.js]]).
• [[tailwind.config.js]] و [[postcss.config.js]]: إعدادات أدوات بتولّد CSS.`,
          example: R`:root {
  --brand: #e11d48;
}
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
.intro a:hover {
  color: var(--brand);
}
@media (max-width: 600px) {
  h1 { font-size: 1.5rem; }
}`,
          flag: "script",
          try: R`احفظ المثال في [[style.css]] جنب [[index.html]] بتاع الدرس اللي فات وافتح الصفحة من السيرفر المحلي. مرّر الماوس على اللينك. صغّر عرض المتصفح لأقل من 600px وشوف العنوان. وبعدين شيل [[;]] من آخر سطر [[margin: 0]] وشوف إيه اللي بيحصل للخاصية اللي بعدها، وافتح [[F12]] ثم Elements واختار [[body]] وشوف الـ Styles.`,
          deep: {
            why: R`فصل الشكل عن المحتوى: نفس الـ HTML ممكن ياخد شكل تاني خالص بتغيير ملف CSS، وملف CSS واحد بيتطبق على كل صفحات الموقع والمتصفح بيحفظه (cache) مرة واحدة.`,
            how: R`المتصفح بيقرا القواعد ويطابق كل selector على عناصر الـ DOM، ولو أكتر من قاعدة على نفس الخاصية بيكسب الأقوى (specificity) أو الأخير. والـ CSS مبيوقفش عند الغلط زي JSON: القاعدة الغلط بس بتتجاهل والباقي يشتغل، وده بيخلي الغلط صعب يتلاحظ.`,
            when: R`أي تنسيق لصفحة ويب. و [[.scss]] أو Tailwind لما المشروع يكبر.`,
            mistakes: R`تنسى [[;]] فالخاصية اللي بعدها تتبلع وتتجاهل من غير أي رسالة. تكتب تعليق [[//]] فيبوّظ القاعدة اللي بعده. تربط [[.scss]] مباشرة في [[<link>]] والمتصفح مبيفهموش. وتغيّر في الـ CSS ومتشوفش التغيير بسبب الـ cache: [[Ctrl+Shift+R]].`
          },
          teach: R`## الفكرة

ملف CSS عبارة عن **قواعد** ورا بعض، وكل قاعدة جزئين: «مين» (الـ selector) و «يبقى شكله إيه» (الخصائص بين [[{ }]]). المثال فيه ٤ قواعد، هنفكّهم واحدة واحدة. والتجارب اللي تحت اتعملت في Chrome 154 على ويندوز، وقرينا القيم بـ [[getComputedStyle]] (القيمة النهائية اللي المتصفح طبّقها).

---

## ١. القاعدة الأولى: متغير

~~~text
:root {
  --brand: #e11d48;
}
~~~

- [[:root]]: selector معناه «أعلى عنصر في الصفحة»، يعني [[<html>]]. أي حاجة تتعرّف هنا كل العناصر تشوفها.
- [[--brand]]: أي اسم بيبدأ بـ [[--]] اسمه **custom property** (متغير CSS). الاسم انت اللي بتختاره.
- [[#e11d48]]: لون بالـ hex: [[e1]] أحمر و [[1d]] أخضر و [[48]] أزرق، كل واحد من [[00]] لـ [[ff]] (يعني ٠ لـ ٢٥٥).
- [[;]] في آخر الخاصية، و [[}]] بتقفل القاعدة.

## ٢. القاعدة التانية: selector بالتاج

~~~text
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
~~~

- [[body]] من غير نقطة ولا شباك = التاج نفسه.
- [[margin: 0]]: المسافة اللي بره العنصر. المتصفح بيدي الـ body افتراضيًا [[8px]]، وده اللي بيعمل البرواز الأبيض حوالين الصفحة. [[0]] من غير وحدة مسموح لأن صفر هو صفر بأي وحدة.
- [[font-family: system-ui, sans-serif]]: قايمة خطوط مفصولة بـ [[,]]. المتصفح بياخد أول واحد موجود: [[system-ui]] خط نظامك (Segoe UI على ويندوز مثلًا)، ولو مش موجود [[sans-serif]] (أي خط من غير زوايا).

## ٣. القاعدة التالتة: selector مركّب

~~~text
.intro a:hover {
  color: var(--brand);
}
~~~

الـ selector ده بيتقري **من اليمين للشمال**:

| الحتة | معناها |
|---|---|
| [[:hover]] | لما الماوس يبقى فوقه (اسمها pseudo-class، بتبدأ بـ [[:]]) |
| [[a]] | لينك |
| المسافة | «جوه»: اللينك لازم يبقى جوه... |
| [[.intro]] | ...عنصر عليه [[class="intro"]]. النقطة = class |

يعني: «أي لينك جوه عنصر الـ intro، وقت ما الماوس عليه». و [[var(--brand)]] بتقرا المتغير اللي عرّفناه فوق. جرّبناها: اللون طلع [[rgb(225, 29, 72)]]، وده نفس [[#e11d48]] بالعشري ([[e1]] = 225، و [[1d]] = 29، و [[48]] = 72).

## ٤. القاعدة الرابعة: [[@media]]

~~~text
@media (max-width: 600px) {
  h1 { font-size: 1.5rem; }
}
~~~

- [[@media]] شرط: القواعد اللي جواه تشتغل بس لو الشرط اتحقق.
- [[(max-width: 600px)]]: عرض الشاشة (أو شباك المتصفح) 600px أو أقل، يعني موبايل غالبًا.
- [[1.5rem]]: [[rem]] = root em، يعني «مرة ونص حجم خط الـ [[<html>]]» (افتراضيًا 16px، فده 24px).
- القاعدة مكتوبة في سطر واحد، وده عادي: CSS مبيفرقش معاه السطور والمسافات.

---

## ٥. CSS مبيقولكش إنك غلطت

دي أهم حاجة في الملف ده. جرّبنا ٣ نسخ من قاعدة الـ body وقرينا اللي المتصفح فهمه:

| اللي كتبناه | المتصفح خزّن إيه | الـ margin | الخط |
|---|---|---|---|
| [[body{margin:0;font-family:monospace}]] | [[body { margin: 0px; font-family: monospace; }]] | [[0px]] | [[monospace]] |
| نفس السطر من غير [[;]] بعد [[margin:0]] | [[body { }]] | [[8px]] | [["Times New Roman"]] |
| [[// note]] فوق القاعدة | القاعدة كلها اختفت | [[8px]] | [["Times New Roman"]] |

- **من غير [[;]]**: المتصفح قرا [[margin: 0 font-family: monospace]] كقيمة واحدة للـ margin، وهي غلط، فرماها. والخاصيتين راحوا، فالقاعدة بقت فاضية.
- **[[//]]**: مش تعليق في CSS. المتصفح فهم [[// note body]] كـ selector غلط، فرمى القاعدة كلها. والقاعدة اللي بعدها اشتغلت عادي.
- وفي الحالتين **مفيش ولا رسالة في الـ Console**. المكان الوحيد اللي هتشوف فيه ده: [[F12]] ثم Elements ثم Styles، الخاصية بتبقى مشطوبة وجنبها علامة تحذير.

التعليق الصح: [[/* كده */]].

## الخلاصة

| الرمز | معناه |
|---|---|
| [[body]] و [[.intro]] و [[#header]] | تاج، و class، و id |
| مسافة بين selectors | «جوه» |
| [[:hover]] | حالة |
| [[--x]] و [[var(--x)]] | تعريف متغير وقرايته |
| [[@media (...)]] | قواعد بشرط |
| [[/* */]] | التعليق الوحيد |

- CSS بيتجاهل الغلط بصمت: لو حاجة مش بتتطبق، ابدأ بـ Styles في الـ DevTools ودوّر على [[;]] ناقصة أو [[//]].`,
          lines: [
            R`[[:root]] هو الـ html نفسه: مكان المتغيرات العامة.`,
            R`متغير CSS: بيبدأ بـ [[--]].`,
            R`قفل القاعدة.`,
            R`selector بالتاج: كل الصفحة.`,
            R`خاصية و [[:]] وقيمة و [[;]].`,
            R`أكتر من قيمة مفصولة بـ [[,]]: لو الخط الأول مش موجود ياخد التاني.`,
            R`قفل.`,
            R`[[.intro]] class، وجواه [[a]]، و [[:hover]] لما الماوس يبقى عليه.`,
            R`[[var()]] بتقرا المتغير.`,
            R`قفل.`,
            R`[[@media]]: القواعد اللي جواه تشتغل بس لو الشاشة 600px أو أقل.`,
            R`قاعدة كاملة في سطر واحد.`,
            R`قفل الـ media.`
          ],
          sol: R`اللينك بيبقى أحمر (لون [[--brand]]) لما الماوس يقف عليه، والعنوان بيصغر لما العرض يقل عن 600px.

لما تشيل [[;]] من [[margin: 0]]: المتصفح بيقرا [[margin: 0 font-family: system-ui, sans-serif;]] كقيمة واحدة غلط، فبيتجاهل الاتنين: الـ margin يرجع الافتراضي (8px) والخط يرجع الافتراضي. وفي Styles في الـ DevTools هتلاقي الخاصية مشطوبة وجنبها علامة تحذير صفرا، ومفيش أي غلط في الـ Console.`
        },
        {
          cmd: ".js و .mjs و .cjs",
          title: "إيه الفرق بين .js و .mjs و .cjs، وليه بيطلعلي require is not defined؟",
          desc: R`الـ ٣ ملفات JavaScript عادي. الفرق في نظام الـ modules (إزاي ملف بياخد حاجة من ملف تاني)، و Node عنده نظامين:

• CommonJS (القديم، بتاع Node من الأول): [[require("./x")]] و [[module.exports = ...]].
• ES Modules أو ESM (الرسمي في JavaScript، والمتصفح بيفهمه): [[import { x } from "./x.js"]] و [[export]].

والامتداد بيقول لـ Node يقرا الملف بأنهي نظام:
• [[.mjs]]: ESM دايمًا.
• [[.cjs]]: CommonJS دايمًا.
• [[.js]]: على حسب أقرب [[package.json]]: لو فيه [["type": "module"]] يبقى ESM، ولو مفيش يبقى CommonJS. (و Node 22 وأحدث لو ملقاش [[type]] بيجرب يكتشف لوحده من وجود [[import]]، ويطلعلك تحذير.)

في المتصفح: [[<script src="app.js">]] عادي، أو [[<script type="module" src="app.js">]] عشان تستخدم [[import]]. والمتصفح مبيهتمش بالامتداد خالص، بيهمه الـ Content-Type اللي السيرفر باعته.

ليه مهم؟ لأن الرسايل دي هتقابلك كتير:
• [[ReferenceError: require is not defined in ES module scope]]: بتستخدم [[require]] في ملف ESM.
• [[SyntaxError: Cannot use import statement outside a module]]: بتستخدم [[import]] في ملف CommonJS.
وكمان في ESM لازم تكتب الامتداد في الـ import ([["./math.js"]] مش [["./math"]])، ومفيش [[__dirname]] (استخدم [[import.meta.dirname]]).

النهاردة: المشاريع الجديدة ESM ([["type": "module"]])، وملفات الإعدادات اللي لازم تفضل CommonJS بتاخد [[.cjs]] (زي [[.eslintrc.cjs]]).`,
          example: R`cat math.mjs app.mjs
node app.mjs
node app.cjs
node bad.mjs
node bad.cjs
grep '"type"' package.json`,
          try: R`في فولدر جديد اعمل:
[[math.mjs]] فيه [[export const add = (a, b) => a + b;]]
[[app.mjs]] فيه [[import { add } from "./math.mjs";]] وتحته [[console.log("mjs:", add(2, 3));]]
[[util.cjs]] فيه [[module.exports = { twice: (x) => x * 2 };]]
[[app.cjs]] فيه [[const { twice } = require("./util.cjs");]] وتحته [[console.log("cjs:", twice(21));]]
وكمان [[bad.mjs]] فيه [[require]] و [[bad.cjs]] فيه [[import]]. شغّلهم كلهم. وبعدين اعمل [[plain.js]] فيه [[import]] واعمل [[package.json]] فيه [[{"name": "w"}]] بس وشغّله، وبعدين ضيف [["type": "module"]] وشغّله تاني.`,
          deep: {
            why: R`Node طلع سنة 2009 قبل ما JavaScript يبقى ليه modules رسمية، فعمل CommonJS. سنة 2015 اللغة نفسها جابت [[import]] و [[export]]، فبقى فيه نظامين بيشتغلوا بطريقة مختلفة. الامتدادات [[.mjs]] و [[.cjs]] اتعملت عشان تحسم من غير لبس.`,
            how: R`CommonJS بيحمّل وقت التشغيل: [[require]] دالة عادية بتقرا الملف وتنفذه وترجّع [[module.exports]]. ESM بيتحلل قبل التشغيل: Node بيقرا كل الـ [[import]] الأول ويبني شجرة الملفات، وبعدين ينفذ. عشان كده [[import]] لازم يبقى فوق ومينفعش جوه if (إلا [[import()]] الديناميكي). و Node 22+ بقى يقدر يعمل [[require]] لملف ESM كمان في أغلب الحالات.`,
            when: R`[[.js]] مع [["type": "module"]] للمشاريع الجديدة. [[.cjs]] لملف إعدادات أداة قديمة بتطلب CommonJS. و [[.mjs]] لسكربت لوحده عايزه ESM من غير package.json.`,
            mistakes: R`تنسخ كود من مقالة قديمة فيها [[require]] في مشروع ESM. تنسى الامتداد في [[import "./utils"]] فيطلعلك [[ERR_MODULE_NOT_FOUND]]. تستخدم [[__dirname]] في ESM فيطلعلك [[__dirname is not defined]]. وتغيّر [["type"]] في package.json فكل ملفات الإعدادات القديمة ([[*.config.js]]) تقع: سمّيها [[.cjs]].`
          },
          teach: R`## الفكرة

المثال بيشغّل ٤ ملفات: اتنين صح (واحد بكل نظام) واتنين غلط عشان تشوف الرسالتين اللي هتقابلهم كتير. كله اتشغّل فعلًا بـ Node 24.19 على ويندوز (في Git Bash)، والمسارات اتختصرت لـ [[C:\Users\ali\lab\mods]].

الملفات اللي جوه الفولدر:

~~~text الفولدر
math.mjs     export const add = (a, b) => a + b;
app.mjs      import { add } from "./math.mjs";  +  console.log("mjs:", add(2, 3));
util.cjs     module.exports = { twice: (x) => x * 2 };
app.cjs      const { twice } = require("./util.cjs");  +  console.log("cjs:", twice(21));
bad.mjs      const fs = require("fs");
bad.cjs      import fs from "fs";
package.json {"name": "w"}
~~~

---

## ١. [[cat math.mjs app.mjs]]: شكل ESM

[[cat]] بيطبع الملفين ورا بعض:

~~~text الناتج
export const add = (a, b) => a + b;
import { add } from "./math.mjs";
console.log("mjs:", add(2, 3));
~~~

- [[export]]: «الحاجة دي متاحة لأي ملف تاني». من غيرها [[add]] تفضل جوه الملف.
- [[(a, b) => a + b]]: arrow function، دالة بتاخد [[a]] و [[b]] وترجّع مجموعهم.
- [[import { add } from "./math.mjs"]]: هات [[add]] من الملف ده. الأقواس [[{ }]] معناها «بالاسم ده بالظبط»، و [[./]] يعني «جنبي في نفس الفولدر»، والامتداد **لازم** يتكتب.

## ٢. [[node app.mjs]]

~~~text الناتج
mjs: 5
~~~

الامتداد [[.mjs]] (m = module) قال لـ Node «ده ESM» من غير ما يبص على أي حاجة تانية.

## ٣. [[node app.cjs]]: شكل CommonJS

~~~text الناتج
cjs: 42
~~~

- [[module.exports = { twice: ... }]]: الحاجة اللي الملف بيطلّعها. هنا object فيه دالة اسمها [[twice]].
- [[require("./util.cjs")]]: دالة عادية بتقرا الملف وتنفذه وترجّع الـ [[module.exports]] بتاعه.
- [[const { twice } = ...]]: اسمها destructuring: خد خانة [[twice]] من الـ object وحطها في متغير بنفس الاسم.

و [[.cjs]] (c = CommonJS) قال لـ Node «ده CommonJS».

## ٤. [[node bad.mjs]]: [[require]] في ESM

~~~text الناتج
file:///C:/Users/ali/lab/mods/bad.mjs:1
const fs = require("fs");
           ^

ReferenceError: require is not defined in ES module scope, you can use import instead
    at file:///C:/Users/ali/lab/mods/bad.mjs:1:12
~~~

نقرا الرسالة:
- أول سطر: الملف ورقم السطر ([[:1]]).
- السطر نفسه، وتحته [[^]] بتشاور على المكان بالظبط.
- [[ReferenceError]]: نوع الغلط: «استخدمت اسم مش موجود». في ESM مفيش حاجة اسمها [[require]] أصلًا.
- [[1:12]]: سطر 1 عمود 12.

## ٥. [[node bad.cjs]]: [[import]] في CommonJS

~~~text الناتج
(node:50276) Warning: Failed to load the ES module: C:\Users\ali\lab\mods\bad.cjs. Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
C:\Users\ali\lab\mods\bad.cjs:1
import fs from "fs";
^^^^^^

SyntaxError: Cannot use import statement outside a module
~~~

- [[(node:50276)]]: رقم الـ process (PID)، هيختلف عندك.
- Node 24 بيقولك الحل في الـ Warning: يا [["type": "module"]] يا [[.mjs]].
- [[SyntaxError]]: الكود نفسه مش مفهوم في النظام ده (عكس [[ReferenceError]] اللي كان الكود مفهوم بس الاسم ناقص).

## ٦. [[grep '"type"' package.json]]

[[grep]] بيدوّر على سطر فيه [["type"]]. والتنصيص الواحد [[' ']] عشان الـ shell ميلمسش علامات [["]] اللي جوه. هنا مطبعش حاجة (والـ exit code كان 1 = ملقاش)، يعني المشروع **مش** معلن إنه ESM، فأي [[.js]] فيه يبقى CommonJS.

---

## ٧. [[.js]] من غير [[type]]: Node بيخمّن

ملف [[plain.js]] فيه [[import]]، و [[package.json]] لسه [[{"name": "w"}]]:

~~~text الناتج
(node:50308) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/ali/lab/mods/plain.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to C:\Users\ali\lab\mods\package.json.
2
~~~

اشتغل وطبع [[2]]، بس بعد ما Node جرّبه CommonJS وفشل وقراه تاني ESM (overhead = شغل زيادة). وبعد ما خلّينا [[package.json]] = [[{"name": "w", "type": "module"}]] طبع [[2]] بس من غير تحذير.

## ٨. فخّين كمان جرّبناهم

| الكود (في [[.mjs]]) | الناتج |
|---|---|
| [[console.log(__dirname)]] | [[ReferenceError: __dirname is not defined in ES module scope]] |
| [[console.log(import.meta.dirname)]] | [[C:\Users\ali\lab\mods]] |
| [[import { add } from "./math"]] (من غير امتداد) | [[Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\mods\math']] |

## الخلاصة

| | ESM | CommonJS |
|---|---|---|
| تطلّع | [[export]] | [[module.exports =]] |
| تجيب | [[import ... from "./x.js"]] | [[require("./x")]] |
| الامتداد اللي بيحسم | [[.mjs]] | [[.cjs]] |
| [[.js]] بيبقى كده لو | [["type": "module"]] في package.json | مفيش [[type]] (أو [["commonjs"]]) |
| فولدر الملف | [[import.meta.dirname]] | [[__dirname]] |

- [[require is not defined]] = انت في ESM. [[Cannot use import statement outside a module]] = انت في CommonJS.`,
          lines: [
            R`ملف ESM فيه [[export]]، وملف بيعمل [[import]] منه.`,
            R`بيشتغل لأن الامتداد [[.mjs]] يعني ESM.`,
            R`بيشتغل لأن الامتداد [[.cjs]] يعني CommonJS.`,
            R`[[require]] في ملف ESM: غلط.`,
            R`[[import]] في ملف CommonJS: غلط.`,
            R`بيشوف المشروع ESM ولا لأ.`
          ],
          sol: R`الناتج الحقيقي (Node 24):
[[mjs: 5]]
[[cjs: 42]]
[[ReferenceError: require is not defined in ES module scope, you can use import instead]]
[[SyntaxError: Cannot use import statement outside a module]]

و [[plain.js]] فيه [[import]] و [[package.json]] من غير [[type]]: بيشتغل ويطبع النتيجة، بس قبلها:
[[Warning: Module type of file:///.../plain.js is not specified and it doesn't parse as CommonJS.]]
[[Reparsing as ES module because module syntax was detected. This incurs a performance overhead.]]
[[To eliminate this warning, add "type": "module" to .../package.json.]]
وبعد ما تضيف [["type": "module"]] التحذير بيختفي. (في Node أقدم من 22 كان بيقع بـ [[Cannot use import statement outside a module]].)`
        },
        {
          cmd: ".ts و .d.ts",
          title: "ملف .ts بيتشغّل إزاي، وإيه ملف .d.ts؟",
          desc: R`[[.ts]] ملف TypeScript: JavaScript وزيادة عليه الأنواع ([[: string]] و [[type]] و [[interface]]). التفاصيل في تاب TypeScript، هنا هنعرف الملفات نفسها.

المتصفح مبيفهمش TypeScript. فالملف لازم يتحول لـ [[.js]] الأول، وده بيحصل بطرق:
• [[tsc]] (الـ compiler الرسمي): بيفحص الأنواع ويطلّع [[.js]]. بيقرا الإعدادات من [[tsconfig.json]] (المستوى ده، درس tsconfig).
• Vite و Next.js و esbuild: بيشيلوا الأنواع بسرعة من غير فحص، والفحص بيبقى في المحرر أو بـ [[tsc --noEmit]].
• Node 22.18 وأحدث بيشغّل [[.ts]] مباشرة ([[node app.ts]]) بإنه يشيل الأنواع وبس، من غير أي فحص. و [[tsx]] و [[ts-node]] أدوات بتعمل نفس الحكاية للنسخ الأقدم.
يعني الأنواع للمحرر وللفحص، ومش بتأثر على التشغيل. كود فيه غلط أنواع ممكن يشتغل عادي ويطلّع نتيجة غلط.

[[.d.ts]] (declaration file): ملف فيه الأنواع بس من غير أي كود. بيوصف شكل مكتبة مكتوبة JavaScript عشان TypeScript والمحرر يعرفوا الدوال بتاخد وترجّع إيه. هتلاقيه في [[node_modules/@types/...]] (زي [[@types/node]] و [[@types/express]])، وفي أي مكتبة جواها ملف [[index.d.ts]]، و [[tsc --declaration]] بيعمله لكودك. و [[vite-env.d.ts]] و [[next-env.d.ts]] اللي في مشاريعك ملفات أنواع للأداة.

وأخوات: [[.mts]] و [[.cts]] نفس فكرة [[.mjs]] و [[.cjs]]، و [[.tsx]] لما الملف فيه JSX (الدرس الجاي).`,
          example: R`cat price.ts
node price.ts
npx -p typescript tsc price.ts --declaration --target es2022
cat price.d.ts
node wrong.ts
npx -p typescript tsc --noEmit wrong.ts`,
          try: R`اعمل [[price.ts]] فيه:
[[type Item = { name: string; price: number; qty: number };]]
[[export function total(items: Item[]): number { return items.reduce((s, i) => s + i.price * i.qty, 0); }]]
[[console.log(total([{ name: "تيشيرت", price: 250, qty: 2 }]));]]
وشغّل المثال. واعمل [[wrong.ts]] فيه [[const n: number = "x"; console.log(n);]] وشغّله بـ node وبـ tsc. ([[npx -p typescript]] بينزّل TypeScript مؤقتًا لو مش متسطّب. متكتبش [[npx tsc]] لوحدها في فولدر مفيهوش TypeScript: هتنزّل package قديمة اسمها [[tsc]] مش هي، وتطبعلك [[This is not the tsc command you are looking for]].)`,
          deep: {
            why: R`JavaScript مبيقولكش إنك بعت string لدالة مستنية رقم غير وانت شغّال، وساعات بيكمّل بنتيجة غلط. TypeScript بيكتشف ده وانت بتكتب. بس عشان يفضل متوافق مع كل حاجة، قرروا إن الناتج النهائي JavaScript عادي، والأنواع تتمسح.`,
            how: R`[[tsc]] بيقرا [[.ts]] ويبني صورة لكل الأنواع ويقارن، ولو فيه تعارض بيطلّع error زي [[TS2322]]. بعد كده بيمسح كل حاجة خاصة بـ TypeScript ويكتب [[.js]] (ويحوّل [[import]] لـ [[require]] لو الإعدادات قالت كده). أما Node بيمسح الأنواع بس من غير فحص، عشان كده [[wrong.ts]] اشتغل.`,
            when: R`أي مشروع حجمه معقول: Angular و NestJS وأغلب مشاريع React و Next.js. والـ [[.d.ts]] لما تستخدم مكتبة JS ومحتاج أنواعها ([[npm i -D @types/express]]).`,
            mistakes: R`تفتكر إن [[node app.ts]] أو Vite بيفحصوا الأنواع فتنشر كود فيه أخطاء: حط [[tsc --noEmit]] في الـ CI. تعدّل في ملف [[.js]] اللي [[tsc]] طلّعه بدل الـ [[.ts]] فتعديلك يتمسح في الـ build الجاي. وتعمل commit لفولدر [[dist/]] اللي فيه الناتج.`
          },
          teach: R`## الفكرة

المثال بيوريك حاجتين: إن الأنواع في TypeScript **مبتأثرش على التشغيل** (Node بيمسحها ويشغّل)، وإن اللي بيفحصها فعلًا هو [[tsc]]. اتشغّل على ويندوز بـ Node 24.19 و TypeScript 7.0.2 (اللي [[npx]] نزّلها)، و [[node price.ts]] اتجرّب كمان بـ Node 22.23 في Docker وطلّع نفس الناتج.

---

## ١. [[cat price.ts]]: الملف

~~~text price.ts
type Item = { name: string; price: number; qty: number };
export function total(items: Item[]): number { return items.reduce((s, i) => s + i.price * i.qty, 0); }
console.log(total([{ name: "تيشيرت", price: 250, qty: 2 }]));
~~~

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[type Item = { ... }]] | بنعرّف «شكل» اسمه [[Item]]: object فيه [[name]] نص و [[price]] رقم و [[qty]] رقم. ده كلام TypeScript بس، ملوش وجود في JavaScript |
| [[items: Item[]]] | الـ [[:]] بعد اسم المتغير = نوعه. و [[Item[]]] = array من [[Item]] |
| [[): number]] | الدالة بترجّع رقم |
| [[items.reduce((s, i) => s + i.price * i.qty, 0)]] | [[reduce]] بتلف على العناصر وتجمّع: [[s]] المجموع لحد دلوقتي (بيبدأ بـ [[0]])، و [[i]] العنصر الحالي |
| [[export]] | الدالة متاحة لملفات تانية |

## ٢. [[node price.ts]]

~~~text الناتج
500
~~~

250 × 2 = 500. Node من 22.18 بيعمل **type stripping**: بيمسح كل حاجة TypeScript ([[type Item]] و [[: number]]...) ويشغّل الباقي كـ JavaScript. مبيفحصش أي نوع.

## ٣. [[npx -p typescript tsc price.ts --declaration --target es2022]]

| الحتة | معناها |
|---|---|
| [[npx]] | شغّل أداة من npm من غير ما تسطّبها في المشروع |
| [[-p typescript]] | (package) الأداة جاية من package اسمها [[typescript]] |
| [[tsc]] | TypeScript Compiler |
| [[price.ts]] | الملف |
| [[--declaration]] | اعمل كمان ملف [[.d.ts]] |
| [[--target es2022]] | الـ JavaScript الناتج يبقى بنسخة ES2022 (فيفضل فيه [[=>]] وغيره من غير تحويل لشكل أقدم) |

مطبعش حاجة (ونجاح [[tsc]] صامت)، و [[ls]] بعدها:

~~~text الناتج
price.d.ts
price.js
price.ts
wrong.ts
~~~

و [[price.js]] هو نفس الكود من غير أنواع:

~~~text price.js
export function total(items) { return items.reduce((s, i) => s + i.price * i.qty, 0); }
console.log(total([{ name: "تيشيرت", price: 250, qty: 2 }]));
~~~

> فخ: متكتبش [[npx tsc]] من غير [[-p typescript]] في فولدر مفيهوش TypeScript. جرّبناها: npx نزّل package تانية خالص اسمها [[tsc]]، وطبعت [[This is not the tsc command you are looking for]].

## ٤. [[cat price.d.ts]]

~~~text الناتج
type Item = {
    name: string;
    price: number;
    qty: number;
};
export declare function total(items: Item[]): number;
export {};
~~~

- مفيش جسم للدالة: الملف ده **أنواع بس**.
- [[declare]] = «الدالة دي موجودة في مكان تاني (في [[price.js]])، وده شكلها».
- [[export {};]] بيأكد إن الملف module.

ده بالظبط اللي جوه [[node_modules/@types/express/index.d.ts]] مثلًا: المكتبة مكتوبة JavaScript، والملف ده بيقول للمحرر الدوال بتاخد إيه وترجّع إيه.

## ٥. [[node wrong.ts]]

[[wrong.ts]] = [[const n: number = "x"; console.log(n);]]. بنقول [[n]] رقم وبنحط فيه نص:

~~~text الناتج
x
~~~

اشتغل عادي! Node مسح [[: number]] وشغّل [[const n = "x"]].

## ٦. [[npx -p typescript tsc --noEmit wrong.ts]]

[[--noEmit]] = افحص بس، متكتبش أي ملف:

~~~text الناتج
wrong.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

| الحتة | معناها |
|---|---|
| [[wrong.ts(1,7)]] | السطر 1 والعمود 7 (مكان [[n]]) |
| [[TS2322]] | رقم الغلط: تقدر تدوّر بيه |
| [[Type 'string' is not assignable to type 'number']] | «النص مينفعش يتحط في مكان رقم» |

والـ exit code كان 1، فالـ CI يقدر يوقف لو فيه غلط أنواع.

## الخلاصة

| الأداة | بتفحص الأنواع؟ | بتطلّع ملفات؟ |
|---|---|---|
| [[node file.ts]] (22.18+) | لأ | لأ، بتشغّل علطول |
| [[tsc]] | آه | [[.js]] (و [[.d.ts]] مع [[--declaration]]) |
| [[tsc --noEmit]] | آه | لأ |
| Vite و esbuild | لأ | آه |

- [[.ts]] = كود بأنواع، و [[.d.ts]] = أنواع بس من غير كود.
- الأنواع للمحرر و [[tsc]]: الكود الغلط في الأنواع ممكن يشتغل عادي، فلازم [[tsc --noEmit]] في الـ CI.`,
          lines: [
            R`ملف TypeScript فيه [[type]] وأنواع للدالة.`,
            R`Node 22.18+ بيشيل الأنواع ويشغّل: بيطبع [[500]].`,
            R`[[tsc]] بيفحص ويطلّع [[price.js]]، و [[--declaration]] بيطلّع [[price.d.ts]] كمان.`,
            R`ملف الأنواع: الدالة من غير جسمها.`,
            R`فيه غلط أنواع، بس Node بيشغّله عادي ويطبع [[x]].`,
            R`[[tsc]] بيمسك الغلط، و [[--noEmit]] يعني افحص بس متطلّعش ملفات.`
          ],
          sol: R`الناتج الحقيقي:
[[node price.ts]] ← [[500]]
[[price.d.ts]] فيه:
[[type Item = { name: string; price: number; qty: number; };]] (على كذا سطر)
[[export declare function total(items: Item[]): number;]]
[[export {};]]
و [[price.js]] فيه نفس الكود من غير الأنواع.

[[node wrong.ts]] ← [[x]] (اشتغل عادي!)
[[npx -p typescript tsc --noEmit wrong.ts]] ← [[wrong.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.]]

ولو Node عندك أقدم من 22.18، [[node price.ts]] هيقول [[Unknown file extension ".ts"]]، واستخدم [[npx tsx price.ts]].`
        },
        {
          cmd: ".jsx و .tsx و .vue و .svelte",
          title: "ملفات .jsx و .tsx و .vue و .svelte إيه، وليه HTML جوه JavaScript؟",
          desc: R`دي ملفات الـ components في frameworks الواجهة. كلها مش بتشتغل في المتصفح زي ما هي، لازم أداة build تحوّلها لـ [[.js]] عادي.

• [[.jsx]]: JavaScript فيه JSX، يعني تاجات شبه HTML جوه الكود: [[return <h2>{title}</h2>]]. ده React (و Preact و Solid). الـ [[{ }]] جوه JSX معناها «حط قيمة JavaScript هنا». و [[className]] بدل [[class]] لأن [[class]] كلمة محجوزة في JS. وكل تاج لازم يتقفل حتى [[<img />]].
• [[.tsx]]: نفس الكلام بس TypeScript. لو ملف [[.ts]] فيه JSX هيقع، لازم [[.tsx]]. (والعكس عادي: [[.tsx]] من غير JSX مفيش مشكلة.)
• [[.vue]]: Vue Single File Component: ملف واحد فيه ٣ بلوكات: [[<template>]] (الـ HTML)، و [[<script setup>]] (الكود)، و [[<style scoped>]] (CSS خاص بالـ component ده بس).
• [[.svelte]]: نفس فكرة Vue: [[<script>]] و HTML و [[<style>]] في ملف واحد، و Svelte بيحوّله لـ JS صغير جدًا وقت الـ build.
• وأخوات: [[.astro]] (Astro) و [[.component.ts]] و [[.component.html]] (Angular، تاب Angular).

الأداة اللي بتحوّلهم: Vite و Next.js و esbuild و Babel و SWC. JSX بيتحول لنداءات دوال: [[<h2>{title}</h2>]] بتبقى [[jsx("h2", { children: title })]].

VS Code بيلوّن [[.jsx]] و [[.tsx]] لوحده. و [[.vue]] محتاج إضافة Vue - Official، و [[.svelte]] محتاج إضافة Svelte for VS Code.`,
          example: R`import { useState } from "react";
type Props = { title: string };
export default function Counter({ title }: Props) {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setCount(count + 1)}>دوس: {count}</button>
    </div>
  );
}`,
          flag: "script",
          try: R`احفظ المثال في [[Counter.tsx]] وشوف إيه اللي بيطلع لما يتحول: [[npx esbuild Counter.tsx --jsx=automatic]]. بعدين انسخه باسم [[Counter.ts]] ونفّذ [[npx esbuild Counter.ts]] وشوف الغلط. ولو عندك مشروع React من تاب React افتح أي component فيه.`,
          deep: {
            why: R`الواجهة بتتكون من حتت (components)، وكل حتة ليها شكل (HTML) وسلوك (JS) وأحيانًا تنسيق (CSS). بدل ما تفرّقهم على ٣ ملفات وتربطهم، الـ frameworks دي حطتهم في ملف واحد أو في نفس الكود، وسابت أداة الـ build تفصلهم.`,
            how: R`الـ compiler بيقرا الملف ويحوّل كل تاج JSX لنداء دالة بتعمل element، و [[{title}]] تبقى قيمة عادية. في [[.vue]] و [[.svelte]] الـ compiler بيفصل البلوكات: الـ template يتحول دالة render أو كود DOM مباشر، والـ CSS يتحط في ملف CSS وكل selector ياخد attribute مميز عشان [[scoped]].`,
            when: R`[[.tsx]] في أي مشروع React أو Next.js أو React Native بـ TypeScript. و [[.vue]] لو المشروع Vue، و [[.svelte]] لو Svelte.`,
            mistakes: R`تكتب JSX في ملف [[.ts]] أو [[.js]] (في Vite لازم [[.jsx]]) فيطلعلك [[Expected ">" but found "className"]]. تكتب [[class]] بدل [[className]]. تنسى إن الـ component اسمه لازم يبدأ بحرف كبير ([[<Counter />]]) وإلا React يفتكره تاج HTML. وتحاول تفتح [[.tsx]] في المتصفح مباشرة.`
          },
          teach: R`## الفكرة

المثال ملف [[Counter.tsx]]: component في React مكتوب TypeScript وفيه JSX. هنقراه سطر سطر، وبعدين نشوف بعينينا الأداة بتحوّله لإيه، لأن ده اللي بيوضّح إن JSX مش HTML. التحويل اتعمل بـ esbuild 0.28.2 (عن طريق [[npx]]) على ويندوز.

---

## ١. الكود سطر سطر

### [[import { useState } from "react";]]

بنجيب [[useState]] من مكتبة React. ده **hook**: دالة بتدي الـ component ذاكرة بتفضل بين كل رسمة والتانية.

### [[type Props = { title: string };]]

نوع TypeScript: الـ component هياخد object فيه [[title]] نص. ده السبب إن الملف [[.tsx]] مش [[.jsx]].

### [[export default function Counter({ title }: Props) {]]

- [[export default]]: ده «الحاجة الأساسية» في الملف، والملف التاني يجيبها بـ [[import Counter from "./Counter"]] من غير [[{ }]].
- [[Counter]] بحرف كبير: React بيفرّق بين [[<counter>]] (تاج HTML) و [[<Counter>]] (component بتاعك) بالحرف الأول.
- [[({ title }: Props)]]: الـ props بتيجي object واحد، و [[{ title }]] بتطلّع منه [[title]] على طول (destructuring).

### [[const [count, setCount] = useState(0);]]

[[useState(0)]] بترجّع array فيها حاجتين، والأقواس [[[ ]]] على الشمال بتاخدهم بالترتيب: [[count]] القيمة الحالية (بتبدأ [[0]])، و [[setCount]] الدالة اللي بتغيّرها وبتخلي React يرسم تاني.

### [[return ( ... );]]

الـ component بيرجّع الـ JSX اللي هيترسم. القوس [[(]] بس عشان نكتب على كذا سطر من غير ما JavaScript يفتكر إن [[return]] خلصت في آخر السطر.

### JSX: التاجات

~~~text
<div className="card">
  <h2>{title}</h2>
  <button onClick={() => setCount(count + 1)}>دوس: {count}</button>
</div>
~~~

| الحتة | معناها |
|---|---|
| [[className="card"]] | الـ class بتاع CSS. مش [[class]] لأنها كلمة محجوزة في JavaScript |
| [[{title}]] | الأقواس [[{ }]] = «هنا قيمة JavaScript»، فبيتحط النص اللي في [[title]] |
| [[onClick={...}]] | لما حد يدوس، شغّل الدالة دي. بتاخد **دالة** مش نداء |
| [[() => setCount(count + 1)]] | arrow function بتزوّد العدّاد واحد |
| [[دوس: {count}]] | نص ثابت وجنبه قيمة |

---

## ٢. [[npx esbuild Counter.tsx --jsx=automatic]]: بيتحوّل لإيه

- [[esbuild]]: أداة build سريعة (هي اللي Vite بيستخدمها جوه).
- [[--jsx=automatic]]: حوّل JSX للشكل الحديث اللي بيجيب دوال [[jsx]] لوحده. من غير ملف [[--outfile]] الناتج بيتطبع على الشاشة:

~~~text الناتج
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function Counter({ title }) {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsx("h2", { children: title }),
    /* @__PURE__ */ jsxs("button", { onClick: () => setCount(count + 1), children: [
      "دوس: ",
      count
    ] })
  ] });
}
~~~

نقرا الفرق:

- [[type Props]] و [[: Props]] **اختفوا**: الأنواع اتمسحت.
- كل تاج بقى نداء دالة: [[<h2>{title}</h2>]] بقى [[jsx("h2", { children: title })]]. أول argument اسم التاج، والتاني object فيه الـ props، واللي جوه التاج بقى [[children]].
- [[jsxs]] (بـ s) لما الـ children أكتر من واحد (array).
- السطر الأول [[import { jsx, jsxs } from "react/jsx-runtime"]] اتضاف لوحده: ده معنى [[automatic]].
- [[/* @__PURE__ */]] تعليق للـ minifier: «لو الناتج ده مش مستخدم، امسحه عادي».
- [["دوس: "]] هي «دوس: » مكتوبة بأكواد Unicode ([[د]] = د)، عشان الملف يبقى ASCII بس.

يعني JSX = طريقة مريحة تكتب بيها نداءات [[jsx(...)]]، مش HTML حقيقي.

## ٣. [[npx esbuild Counter.ts]]: نفس الكود بامتداد [[.ts]]

~~~text الناتج
X [ERROR] Expected ">" but found "className"

    Counter.ts:6:9:
      6 │     <div className="card">
        │          ~~~~~~~~~
        ╵          >

1 error
~~~

(على لينكس والماك العلامة اللي في الأول [[✘]] بدل [[X]].) الامتداد هو اللي قال لـ esbuild يفهم JSX ولا لأ. في [[.ts]]، [[<div]] بيتقري كـ type assertion قديم ([[<Type>value]])، فبعد اسم النوع بيستنى [[>]] ولقى [[className]]. السطر 6 العمود 9 بالظبط عند [[className]].

---

## ٤. [[.vue]] و [[.svelte]] بنفس الفكرة

ملف واحد فيه ٣ بلوكات، والأداة بتفصلهم:

~~~text Counter.vue
<template>  الـ HTML، و {{ count }} بدل {count}
<script setup lang="ts">  الكود
<style scoped>  CSS للـ component ده بس
~~~

والكلام ده من docs بتوع Vue و Svelte، ماتجرّبش هنا.

## الخلاصة

| الامتداد | فيه | بيتحوّل بـ |
|---|---|---|
| [[.jsx]] | JavaScript + JSX | Vite و esbuild و Babel و SWC |
| [[.tsx]] | TypeScript + JSX | نفسهم |
| [[.vue]] | template و script و style | Vite مع plugin Vue |
| [[.svelte]] | script و HTML و style | Svelte compiler |

- JSX في ملف [[.ts]] أو [[.js]] (في Vite) = [[Expected ">" but found ...]]. غيّر الامتداد.
- [[className]] مش [[class]]، و [[{ }]] = قيمة JavaScript، والـ component بحرف كبير.`,
          lines: [
            R`[[import]] عادي: hook من React.`,
            R`نوع TypeScript للـ props.`,
            R`الـ component دالة بتاخد props واسمها بحرف كبير.`,
            R`state: [[count]] القيمة، و [[setCount]] اللي بتغيّرها.`,
            R`[[return]] بيرجّع JSX، والقوس عشان يبقى على كذا سطر.`,
            R`تاج JSX: [[className]] بدل [[class]].`,
            R`[[{title}]] قيمة JavaScript جوه التاج.`,
            R`[[onClick]] بياخد دالة، والنص جواه فيه [[{count}]].`,
            R`قفل الـ div.`,
            R`قفل الـ return.`,
            R`قفل الدالة.`
          ],
          sol: R`[[npx esbuild Counter.tsx --jsx=automatic]] بيطبع (مختصر):
[[import { jsx, jsxs } from "react/jsx-runtime";]]
[[export default function Counter({ title }) {]]
[[  const [count, setCount] = useState(0);]]
[[  return /* @__PURE__ */ jsxs("div", { className: "card", children: [...] });]]
يعني الأنواع اتمسحت، وكل تاج بقى [[jsx(...)]] أو [[jsxs(...)]]، والنص العربي اتكتب بـ [[\u062F\u0648\u0633]].

و [[Counter.ts]]:
[[✘ [ERROR] Expected ">" but found "className"]]
[[    Counter.ts:6:9:]]
لأن في [[.ts]] الـ [[<div]] بيتفهم كـ type assertion قديمة مش JSX.`
        },
        {
          cmd: ".min.js و .map",
          title: "إيه ملفات .min.js و .js.map، وإزاي تقرا الغلط في كود متصغّر؟",
          desc: R`لما تعمل build لموقع (Vite أو Next.js أو webpack أو esbuild)، الأداة بتعمل minify: بتشيل المسافات والتعليقات وتصغّر أسامي المتغيرات ([[calculateTotal(items)]] تبقى [[calculateTotal(c)]])، عشان الملف يبقى أصغر والموقع أسرع. الناتج غالبًا [[.min.js]] أو [[app-3f9a2c.js]] (الحروف دي hash بيتغير مع كل تعديل عشان الـ cache).

المشكلة: لو حصل غلط في الـ production، رسالة الغلط هتقولك «السطر 1 العمود 4587» في ملف كله سطر واحد. هنا بييجي الـ source map:
• [[.map]] (زي [[app.min.js.map]]): ملف JSON بيربط كل مكان في الملف المتصغّر بمكانه في الملف الأصلي.
• في آخر الملف المتصغّر سطر [[//# sourceMappingURL=app.min.js.map]] بيقول للمتصفح الخريطة فين.
• الـ DevTools ([[F12]]) بتقراه لوحدها وتعرضلك الكود الأصلي وأرقام سطوره، و Sentry وأمثاله بيستخدموه لرسايل الأخطاء.
• جوه الـ [[.map]]: [["version": 3]]، و [["sources"]] (أسامي الملفات الأصلية)، و [["sourcesContent"]] (الكود الأصلي كله أحيانًا!)، و [["mappings"]] (نص مشفّر بيربط الأماكن).

وفيه كمان [[.css.map]] لنفس الغرض في CSS، و [[.min.css]].

وخد بالك من الأمان: لو رفعت الـ [[.map]] على السيرفر العام، أي حد يقدر يشوف كودك الأصلي بالتعليقات. ده مش كارثة (الكود في المتصفح مكشوف أصلًا)، بس لو مش عايز ده، ارفع الـ maps لأداة الأخطاء بس ومتنشرهاش (في Vite: [[build.sourcemap: "hidden"]]).`,
          example: R`npx esbuild app.js --minify --sourcemap --outfile=app.min.js
ls -l app.js app.min.js app.min.js.map
cat app.min.js
jq '.sources, .version' app.min.js.map
node --enable-source-maps app.min.js`,
          try: R`اعمل [[app.js]] فيه دالة [[calculateTotal(items)]] بـ for loop وتعليقات، ونفّذ المثال. بص على شكل [[app.min.js]] وعلى آخر سطر فيه. بعدين حط [[throw new Error("boom")]] جوه الدالة واعمل build تاني، وشغّل [[node app.min.js]] مرة و [[node --enable-source-maps app.min.js]] مرة، وقارن السطر اللي الغلط بيشاور عليه.`,
          deep: {
            why: R`كل byte بيتبعت لكل زائر، فتصغير الملف من 200KB لـ 60KB بيفرق في سرعة الموقع خصوصًا على الموبايل. بس المبرمج محتاج يقرا الأخطاء بالكود اللي كتبه، فالـ source map بيدي الاتنين: ملف صغير للزوار، وخريطة للمبرمج.`,
            how: R`الـ minifier بيحلل الكود لشجرة (AST) ويكتبه تاني بأقل حروف ممكنة، ووهو بيكتب بيسجل «الحرف ده جه من السطر كذا العمود كذا في الملف كذا». التسجيل ده بيتكتب في [["mappings"]] بترميز مضغوط اسمه Base64 VLQ. والمتصفح لما الـ DevTools تبقى مفتوحة بيطلب الـ [[.map]] ويعكس الأماكن.`,
            when: R`كل build للـ production. وفعّل الـ source maps في أي أداة بتتابع الأخطاء (Sentry). ولو بتستخدم مكتبة من CDN، استخدم [[.min.js]] بتاعها.`,
            mistakes: R`تعدّل في ملف [[.min.js]] بإيدك (هيتمسح في الـ build الجاي، ومستحيل يتقري). تعمل commit لفولدر [[dist/]] أو [[build/]] اللي فيه الناتج (حطه في [[.gitignore]]). وتستغرب إن الـ DevTools بتعرض كود مش موجود على السيرفر: ده من [["sourcesContent"]] جوه الـ map.`
          },
          teach: R`## الفكرة

هناخد ملف JavaScript عادي، نصغّره بـ esbuild ونطلّع معاه خريطة، ونفتح الاتنين ونشوف جواهم إيه، وبعدين نرمي غلط ونقارن رسالته من غير الخريطة ومعاها. كله اتشغّل في Docker ([[node:22-alpine]]، يعني لينكس و Node 22) بـ esbuild 0.28.2.

الملف الأصلي [[app.js]]:

~~~text app.js
// بيحسب إجمالي الفاتورة
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total;
}

console.log(calculateTotal([{ price: 250, qty: 2 }]));
~~~

---

## ١. [[npx esbuild app.js --minify --sourcemap --outfile=app.min.js]]

| الحتة | معناها |
|---|---|
| [[npx esbuild]] | شغّل esbuild من npm من غير تسطيب |
| [[app.js]] | ملف الدخول |
| [[--minify]] | صغّر: شيل المسافات والتعليقات، وقصّر الأسامي |
| [[--sourcemap]] | اعمل ملف [[.map]] جنب الناتج |
| [[--outfile=app.min.js]] | اسم الناتج |

~~~text الناتج
  app.min.js      164b
  app.min.js.map  616b

⚡ Done in 15ms
~~~

[[b]] = byte.

## ٢. [[ls -l app.js app.min.js app.min.js.map]]

~~~text الناتج
-rwxrwxrwx    1 root     root           238 Oct  7 09:37 app.js
-rw-r--r--    1 root     root           164 Oct  7 09:37 app.min.js
-rw-r--r--    1 root     root           616 Oct  7 09:37 app.min.js.map
~~~

العمود الخامس هو الحجم بالـ byte: الأصلي 238، والمتصغّر 164. الفرق هنا صغير لأن الملف أصلًا صغير، وفي مكتبة حقيقية الفرق بيبقى ٣ أو ٤ أضعاف. والخريطة أكبر من الكود نفسه، بس دي مش بتتحمّل غير لما الـ DevTools تبقى مفتوحة. (و [[rwxrwxrwx]] في [[app.js]] جاية من إن الفولدر متشارك من ويندوز، ملهاش علاقة بالدرس.)

## ٣. [[cat app.min.js]]

~~~text الناتج
function calculateTotal(c){let t=0;for(const o of c)t+=o.price*o.qty;return t}console.log(calculateTotal([{price:250,qty:2}]));
//# sourceMappingURL=app.min.js.map
~~~

اللي اتغيّر:
- التعليق راح، والمسافات والسطور الجديدة راحت: كل الكود سطر واحد.
- [[items]] بقت [[c]]، و [[total]] بقت [[t]]، و [[item]] بقت [[o]]. دي متغيرات **محلية** جوه الدالة، فمحدش بره بيشوفها وتغيير اسمها آمن.
- [[calculateTotal]] **فضلت** زي ما هي: دي على مستوى الملف، و esbuild ميعرفش لو حد بره بيستخدمها.
- الـ [[{ }]] حوالين جسم الـ [[for]] اتشالت لأنه سطر واحد.

وآخر سطر [[//# sourceMappingURL=app.min.js.map]] تعليق خاص: المتصفح و Node بيقروه عشان يعرفوا مكان الخريطة.

## ٤. [[jq '.sources, .version' app.min.js.map]]

الخريطة ملف JSON، و [[jq]] بيطلّع منه خانتين (الـ [[,]] = اطبع ده وبعده ده):

~~~text الناتج
[
  "app.js"
]
3
~~~

والملف كله (بـ [[jq -c .]]، سطر واحد) فيه:

| الخانة | اللي لقيناه |
|---|---|
| [["version"]] | [[3]]: نسخة صيغة الـ source maps |
| [["sources"]] | [[["app.js"]]]: الملفات الأصلية |
| [["sourcesContent"]] | الملف الأصلي **كله** بالتعليق العربي |
| [["names"]] | [[["items","total","item"]]]: الأسامي الأصلية للمتغيرات اللي اتغيّرت |
| [["mappings"]] | [["AACA,SAAS,eAAeA,..."]]: الربط نفسه، مضغوط |

الـ [["mappings"]] بترميز اسمه Base64 VLQ: كل حتة بين [[,]] بتقول «العمود ده في الملف الصغير = السطر كذا العمود كذا في [[app.js]]، واسمه الأصلي رقم كذا في [["names"]]».

## ٥. [[node --enable-source-maps app.min.js]]

~~~text الناتج
500
~~~

لما مفيش غلط، الخيار ده ملوش أي أثر. [[--enable-source-maps]] بيخلي Node يقرا الخريطة **في رسايل الأخطاء بس**.

---

## ٦. التجربة المهمة: غلط في كود متصغّر

حطينا [[throw new Error("boom");]] قبل [[return total]] وعملنا build تاني. من غير الخيار:

~~~text node app.min.js
/w/t/app.min.js:1
function calculateTotal(r){let o=0;for(const t of r)o+=t.price*t.qty;throw new Error("boom")}console.log(...
                                                                     ^

Error: boom
    at calculateTotal (/w/t/app.min.js:1:76)
~~~

[[app.min.js:1:76]] = السطر 1 العمود 76. في ملف كله سطر واحد، الرقم ده مش بيقولك حاجة.

ومع الخيار:

~~~text node --enable-source-maps app.min.js
/w/t/app.js:7
  throw new Error("boom");
  ^

Error: boom
    at calculateTotal (/w/t/app.js:7:9)
    at Object.<anonymous> (/w/t/app.js:11:13)
~~~

نفس الغلط، بس بيشاور على [[app.js]] السطر 7، وبيعرض السطر الأصلي بالمسافات. ده بالظبط اللي الـ DevTools و Sentry بيعملوه بالخريطة.

## الخلاصة

| الملف | فيه | بيتنشر للزوار؟ |
|---|---|---|
| [[app.js]] | الكود اللي بتكتبه | لأ |
| [[app.min.js]] | نفس الكود متصغّر + سطر [[sourceMappingURL]] | آه |
| [[app.min.js.map]] | JSON: الربط + الأسامي + غالبًا الكود الأصلي كله | انت اللي بتقرر (Vite: [[build.sourcemap: "hidden"]] يعملها من غير السطر) |

- متعدّلش [[.min.js]] بإيدك: عدّل الأصلي واعمل build.
- اللي معاه الـ [[.map]] معاه كودك الأصلي بالتعليقات ([["sourcesContent"]]).`,
          lines: [
            R`[[--minify]] صغّر، و [[--sourcemap]] اعمل الخريطة، و [[--outfile]] اسم الناتج.`,
            R`قارن الأحجام: الأصلي، والمتصغّر، والخريطة.`,
            R`الكود كله في سطر، والأسامي اتصغّرت، وآخره سطر [[sourceMappingURL]].`,
            R`الـ map ملف JSON: [[sources]] بيقول الملفات الأصلية.`,
            R`Node بيستخدم الـ map عشان رسايل الأخطاء تشاور على الملف الأصلي.`
          ],
          sol: R`الناتج الحقيقي على ملف صغير:
[[-rw-rw-r-- 1 you you 193 app.js]]
[[-rw-rw-r-- 1 you you 164 app.min.js]]
[[-rw-rw-r-- 1 you you 493 app.min.js.map]]
[[function calculateTotal(c){let t=0;for(const o of c)t+=o.price*o.qty;return t}console.log(calculateTotal([{price:250,qty:2}]));]]
[[//# sourceMappingURL=app.min.js.map]]
و [[jq]] بيطبع array فيها [["app.js"]] وبعدها [[3]].

في الملف الصغير ده الفرق بسيط، في مكتبة حقيقية الفرق بيبقى ٣ أو ٤ أضعاف. ومع [[throw]]: من غير الخيار الغلط بيشاور على [[at calculateTotal (.../app.min.js:1:76)]] (سطر 1 والعمود 76)، ومع [[--enable-source-maps]] بيشاور على [[at calculateTotal (.../app.js:7:9)]]، يعني الملف الأصلي والسطر اللي كتبت فيه الـ throw.`
        }
      ]
    },
    {
      t: "ملفات لغات البرمجة",
      l: 2,
      n: "كل لغة ليها امتداد، وبعضها بيطلّع ملفات تانية وهو بيشتغل (.pyc و .class و .o و .jar). هنا هتعرف كل ملف بيتشغّل بإيه، وإيه اللي بيتعمله commit وإيه لأ",
      items: [
        {
          cmd: ".py و .pyc",
          title: "ملف .py بيتشغّل إزاي، وإيه __pycache__ و .pyc و .ipynb؟",
          desc: R`[[.py]] ملف كود Python، نص عادي. بيتشغّل بالـ interpreter: [[python3 file.py]] على لينكس والماك، و [[python file.py]] أو [[py file.py]] على ويندوز. التفاصيل في تاب Python.

حاجات في الملف نفسه:
• الـ indentation جزء من اللغة: ٤ مسافات هو العُرف، وخلط Tab ومسافات بيطلّع [[TabError]].
• [[#]] تعليق.
• [[#!/usr/bin/env python3]] أول سطر (shebang): يخلي الملف يتشغّل لوحده بـ [[./file.py]] على لينكس والماك بعد [[chmod +x]] (درس [[.sh]]).
• [[if __name__ == "__main__":]]: الكود اللي تحتها بيتنفذ لما تشغّل الملف مباشرة بس، مش لما ملف تاني يعمله [[import]].
• كل ملف [[.py]] هو module: [[from prices import total]] بيدوّر على [[prices.py]] جنبه.

الملفات اللي Python بيعملها لوحده:
• [[__pycache__/]] وجواه [[.pyc]] (زي [[prices.cpython-312.pyc]]): لما تعمل [[import]] لملف، Python بيحوّله لـ bytecode (تعليمات وسيطة) ويحفظه عشان المرة الجاية يبقى أسرع. ده ملف binary، مبتعدّلوش، وبيتمسح ويتعمل تاني عادي، ومكانه [[.gitignore]].
• [[.venv/]] أو [[venv/]]: البيئة الافتراضية فيها المكتبات المتسطّبة. برضه [[.gitignore]].

أخوات:
• [[.ipynb]]: Jupyter Notebook. ده ملف JSON فيه الخلايا (كود وكلام) والنتايج والصور. بيتفتح في Jupyter أو VS Code أو Google Colab.
• [[.pyi]]: ملف أنواع زي [[.d.ts]] في TypeScript.
• [[.pyw]]: على ويندوز بيتشغّل من غير ما يفتح شباك ترمنال (للبرامج اللي ليها واجهة).
• [[.whl]]: مكتبة Python جاهزة للتسطيب (wheel)، وهو في الحقيقة zip.`,
          example: R`cat main.py
python3 main.py
ls __pycache__
file __pycache__/prices.cpython-312.pyc
chmod +x main.py
./main.py`,
          try: R`اعمل [[prices.py]] فيه دالة [[total(items)]] بترجّع [[sum(i["price"] * i["qty"] for i in items)]]، و [[main.py]] أول سطر فيه [[#!/usr/bin/env python3]] وبعدين [[from prices import total]] و [[if __name__ == "__main__":]] وتحتها [[print(total([{"price": 250, "qty": 2}]))]]. نفّذ المثال (رقم الـ [[cpython-312]] هيختلف على حسب نسخة Python عندك). وبعدين في ملف تاني اكتب دالة سطر فيها Tab وسطر فيه مسافات وشغّله.`,
          deep: {
            why: R`Python لغة interpreted: مفيش خطوة compile تطلّع برنامج منفصل، فالملف نفسه هو اللي بيتنقل ويتشغّل. بس تحليل الكود كل مرة بياخد وقت، فالـ [[.pyc]] حل وسط: Python بيحفظ نتيجة التحليل ويستخدمها طول ما الـ [[.py]] متغيرش.`,
            how: R`لما تعمل [[import prices]]، Python بيشوف [[__pycache__/prices.cpython-312.pyc]]: لو وقت تعديل [[prices.py]] وحجمه زي المسجل في الـ pyc، بيحمّل الـ bytecode علطول. لو لأ بيعمل compile تاني. أما الملف اللي بتشغّله مباشرة ([[main.py]]) فمبيتعملوش pyc. و [[file]] بيقرا رأس الـ pyc ويقولك النسخة ووقت الـ py وحجمه.`,
            when: R`سكربتات أتمتة، و APIs بـ FastAPI و Django، وتحليل داتا، والذكاء الاصطناعي. و [[.ipynb]] للتجارب وتحليل الداتا خطوة خطوة.`,
            mistakes: R`تعمل commit لـ [[__pycache__]] و [[.venv]]. تسمّي ملفك باسم مكتبة ([[json.py]] أو [[random.py]] أو [[requests.py]]) فـ [[import json]] يجيب ملفك انت ويطلعلك أخطاء غريبة. تخلط Tab ومسافات ([[TabError: inconsistent use of tabs and spaces in indentation]]). وتعمل commit لـ notebook فيه نتايج كبيرة وصور: امسح الـ outputs الأول.`
          },
          teach: R`## الفكرة

عندنا ملفين: [[prices.py]] فيه دالة، و [[main.py]] بيستخدمها. هنشغّل [[main.py]] ونشوف Python عمل ملف [[.pyc]] لوحده لمين وليه، وبعدين نخلّي [[main.py]] يشتغل لوحده بالـ shebang. اتشغّل على أوبونتو 24.04 في Docker (Python 3.12.3)، وجزء ويندوز في PowerShell بـ Python 3.14.

~~~text prices.py
def total(items):
    return sum(i["price"] * i["qty"] for i in items)
~~~

- [[def]] بتعرّف دالة، و [[:]] في آخر السطر معناها «اللي جاي جسمها»، والجسم **لازم** يبقى مزحوق (indented) لجوه.
- [[sum(... for i in items)]]: لف على كل [[i]] في [[items]]، احسب [[price * qty]]، واجمعهم.

---

## ١. [[cat main.py]]

~~~text الناتج
#!/usr/bin/env python3
from prices import total

if __name__ == "__main__":
    print(total([{"price": 250, "qty": 2}]))
~~~

| السطر | معناه |
|---|---|
| [[#!/usr/bin/env python3]] | الـ shebang. لـ Python هو مجرد تعليق (بيبدأ بـ [[#]])، بس لينكس بيقراه (خطوة ٥) |
| [[from prices import total]] | دوّر على [[prices.py]] جنبي، وهات منه [[total]] |
| [[if __name__ == "__main__":]] | [[__name__]] متغير Python بيحطه لوحده: بيبقى [["__main__"]] لو الملف ده اللي اتشغّل مباشرة، وبيبقى اسم الملف ([["main"]]) لو حد عمله import. فالسطر اللي تحته بيشتغل في الحالة الأولى بس |
| [[print(total([...]))]] | list فيها dict واحد (منتج)، والنتيجة بتتطبع |

## ٢. [[python3 main.py]]

~~~text الناتج
500
~~~

[[python3]] هو الـ interpreter: برنامج بيقرا الملف ويشغّله علطول، من غير خطوة compile منفصلة زي C.

## ٣. [[ls __pycache__]]

~~~text الناتج
prices.cpython-312.pyc
~~~

فولدر [[__pycache__]] اتعمل لوحده، وفيه ملف لـ [[prices.py]] **بس**، مش لـ [[main.py]]. Python بيحفظ نسخة جاهزة (bytecode) للملفات اللي بتتعمل [[import]] بس، عشان المرة الجاية ميحللهاش من الأول. الملف اللي بتشغّله مباشرة بيتحلل كل مرة.

والاسم:

| الحتة | معناها |
|---|---|
| [[prices]] | اسم الملف الأصلي |
| [[cpython]] | الـ interpreter: CPython هو Python العادي (فيه غيره زي PyPy) |
| [[312]] | النسخة 3.12. على ويندوز بـ Python 3.14 طلع [[prices.cpython-314.pyc]] |
| [[.pyc]] | Python compiled |

النسخة في الاسم عشان لو عندك أكتر من Python، كل واحد يعمل ملفه وميبوّظش التاني.

## ٤. [[file __pycache__/prices.cpython-312.pyc]]

[[file]] بيقرا أول bytes في الملف ويقولك نوعه:

~~~text الناتج
__pycache__/prices.cpython-312.pyc: Byte-compiled Python module for CPython 3.12 or newer, timestamp-based, .py timestamp: Wed Oct  7 09:39:18 2026 UTC, .py size: 71 bytes
~~~

- [[Byte-compiled]]: bytecode، يعني binary مش نص. متفتحوش في محرر.
- [[timestamp-based]] و [[.py timestamp]] و [[.py size: 71 bytes]]: Python كاتب في رأس الملف وقت تعديل [[prices.py]] وحجمه. وفعلًا [[wc -c prices.py]] طلّع [[71]]. المرة الجاية لو الرقمين زي ما هما يستخدم الـ pyc، ولو [[prices.py]] اتغيّر يعمله من جديد. عشان كده مسحه آمن تمامًا.

## ٥. [[chmod +x main.py]] ثم [[./main.py]]

قبل [[chmod]] (ملف جديد اتعمل جوه الكونتينر):

~~~text الناتج
-rw-r--r-- 1 root root 34 Oct  7 09:40 main.py
bash: line 1: ./main.py: Permission denied
~~~

[[rw-r--r--]] مفيهاش [[x]] (execute)، فلينكس رفض، والـ exit code كان [[126]] (= لقى الملف بس مش قادر يشغّله). وبعد [[chmod +x main.py]]:

~~~text الناتج
-rwxr-xr-x 1 root root 34 Oct  7 09:40 main.py
500
~~~

[[+x]] ضاف صلاحية التشغيل. ولما كتبنا [[./main.py]]، لينكس شاف [[#!]] في أول الملف فشغّل فعليًا [[/usr/bin/env python3 ./main.py]]. و [[env]] بيدوّر على [[python3]] في الـ PATH بدل ما نكتب مساره. التفاصيل في درس [[.sh]].

## ٦. TabError

ملف فيه سطر مزحوق بـ Tab وسطر بعده بـ ٨ مسافات:

~~~text الناتج
  File "/w/tabs.py", line 3
    return x
TabError: inconsistent use of tabs and spaces in indentation
~~~

المسافات في أول السطر جزء من اللغة في Python، فلازم البلوك كله بنفس الطريقة. خلّي المحرر يحوّل Tab لـ ٤ مسافات.

---

## ٧. على ويندوز

~~~powershell
python main.py
py main.py
~~~

الاتنين طبعوا [[500]] في PowerShell. [[py]] هو Python Launcher بتاع ويندوز (بيختار أحدث نسخة متسطّبة). الـ shebang و [[chmod]] ملهمش لازمة: ويندوز بيعرف يشغّل الملف بالامتداد مش بأول سطر.

| | لينكس والماك | ويندوز |
|---|---|---|
| تشغيل | [[python3 main.py]] | [[python main.py]] أو [[py main.py]] |
| لوحده | [[chmod +x]] ثم [[./main.py]] | مش بالطريقة دي |
| الكاش | [[__pycache__/*.cpython-312.pyc]] | نفسه بنسختك ([[314]]) |

## الخلاصة

- [[.py]] نص بتكتبه، و [[.pyc]] نسخة bytecode Python بيعملها لوحده للملفات اللي بتتعمل import، وبيعيدها لو الأصلي اتغيّر.
- [[__pycache__/]] و [[.venv/]] في [[.gitignore]].
- متسمّيش ملفك باسم مكتبة ([[json.py]]): [[import json]] هيجيب ملفك.`,
          lines: [
            R`الملف فيه shebang و [[import]] و [[if __name__]].`,
            R`التشغيل العادي بالـ interpreter.`,
            R`الـ [[.pyc]] اتعمل لـ [[prices.py]] بس، لأنه اتعمله import.`,
            R`[[file]] بيقول إنه bytecode ولأنهي نسخة Python.`,
            R`صلاحية تشغيل، عشان الـ shebang يشتغل.`,
            R`بيتشغّل لوحده من غير ما تكتب [[python3]].`
          ],
          sol: R`الناتج الحقيقي (Python 3.12):
[[500]]
[[prices.cpython-312.pyc]]
[[__pycache__/prices.cpython-312.pyc: Byte-compiled Python module for CPython 3.12 or newer, timestamp-based, .py timestamp: ..., .py size: 71 bytes]]
[[500]]

وملف فيه Tab ومسافات بيطلّع:
[[TabError: inconsistent use of tabs and spaces in indentation]]

على ويندوز [[./main.py]] مش هيشتغل كده: استخدم [[py main.py]].`
        },
        {
          cmd: ".java و .class و .jar",
          title: "إيه الفرق بين .java و .class و .jar، وفين .kt و .kts؟",
          desc: R`Java بتمشي على خطوتين:
• [[.java]]: الكود اللي بتكتبه (نص).
• [[javac Hello.java]] بيعمل compile ويطلّع [[Hello.class]]: bytecode (binary) مش لمعالج معيّن، لـ JVM (Java Virtual Machine).
• [[java Hello]] بيشغّل الـ JVM اللي بتقرا الـ [[.class]] وتنفذه على أي نظام. ده معنى «اكتب مرة وشغّل في أي حتة».

قواعد الملف:
• الـ class الـ [[public]] لازم اسمها يبقى نفس اسم الملف بالظبط بالحروف الكبيرة: [[public class Hello]] في [[Hello.java]].
• الـ [[package com.gym.api;]] في أول الملف لازم يطابق مكان الملف في الفولدرات: [[src/main/java/com/gym/api/]].

[[.jar]] (Java ARchive): zip فيه ملفات [[.class]] كتير وملف [[META-INF/MANIFEST.MF]] بيقول أنهي class فيها [[main]]. ده اللي بتسلّمه أو بتشغّله على السيرفر: [[java -jar app.jar]]. و Spring Boot بيطلّع jar واحد فيه كل حاجة (fat jar). و [[.war]] نسخة للسيرفرات القديمة زي Tomcat.

Kotlin على نفس الـ JVM:
• [[.kt]]: كود Kotlin. [[kotlinc]] أو Gradle بيحوّلوه لـ [[.class]] برضه، فـ Java و Kotlin بيشتغلوا مع بعض في نفس المشروع. وده اللغة الأساسية في Android (تاب Kotlin).
• [[.kts]]: Kotlin Script، وأشهر استخدام ليه [[build.gradle.kts]] (ملف إعدادات Gradle مكتوب Kotlin، المستوى ده).

ومن Java 11 تقدر تشغّل ملف واحد من غير javac: [[java Hello.java]].

[[build/]] و [[target/]] و [[out/]] و [[*.class]] مكانهم [[.gitignore]].`,
          example: R`cat Hello.java
javac Hello.java
ls
java Hello
file Hello.class
jar cfe hello.jar Hello Hello.class
java -jar hello.jar
unzip -l hello.jar`,
          try: R`اعمل [[Hello.java]] فيه [[public class Hello { public static void main(String[] args) { System.out.println("Hello من Java"); } }]] ونفّذ المثال (محتاج JDK: [[sudo apt install openjdk-21-jdk]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w eclipse-temurin:21-jdk javac Hello.java]]). بعدين اعمل ملف [[Hello2.java]] فيه [[public class Wrong {}]] وجرّب [[javac Hello2.java]].`,
          deep: {
            why: R`زمان كان لازم تعمل compile لكل نظام لوحده (ويندوز ولينكس وماك). Java حلت ده بالـ JVM: البرنامج بيتحول مرة واحدة لـ bytecode، وكل نظام عليه JVM بيشغّله. ونفس الفكرة خلّت Kotlin و Scala يقدروا يستخدموا كل مكتبات Java.`,
            how: R`[[javac]] بيفحص الأنواع ويكتب ملف [[.class]] لكل class. الملف بيبدأ بالـ bytes [[CA FE BA BE]] (اسمها cafe babe، بصمة Java)، وبعدها رقم النسخة (65 يعني Java 21). الـ JVM بتقرا الـ bytecode وتحوّل الأجزاء اللي بتتكرر لكود المعالج الحقيقي وهي شغالة (JIT). والـ [[.jar]] مجرد zip، فـ [[unzip]] بيفتحه.`,
            when: R`Spring Boot و Android وأنظمة الشركات الكبيرة. وعمليًا مش هتكتب [[javac]] بإيدك كتير: Maven أو Gradle بيعملوا كل ده ([[mvn package]] أو [[./gradlew build]]).`,
            mistakes: R`اسم الملف مش زي اسم الـ class ([[class Wrong is public, should be declared in a file named Wrong.java]]). تشغّل [[java Hello.class]] بالامتداد بدل [[java Hello]]. تشغّل jar اتعمل بـ Java 21 على Java 17 فيطلعلك [[UnsupportedClassVersionError]]. وتعمل commit لـ [[.class]] أو [[target/]].`
          },
          teach: R`## الفكرة

المثال بيمشي رحلة Java كاملة: ملف [[.java]] بتكتبه، يتحوّل لـ [[.class]]، يتشغّل، وبعدين يتحط في [[.jar]] ويتشغّل منه. مفيش JDK على الجهاز اللي اتكتب عليه الشرح ده، فالنواتج اللي تحت هي نواتج الدرس من JDK 21 ومطابقة لـ docs بتوع Oracle و OpenJDK (javac و java و jar)، مش من تشغيل جديد.

الملف [[Hello.java]]:

~~~text Hello.java
public class Hello { public static void main(String[] args) { System.out.println("Hello من Java"); } }
~~~

| الحتة | معناها |
|---|---|
| [[public class Hello]] | class اسمها [[Hello]]، و [[public]] = متاحة لأي حد. ولأنها public **لازم** الملف اسمه [[Hello.java]] بالظبط |
| [[public static void main(String[] args)]] | نقطة البداية اللي الـ JVM بتدوّر عليها: [[static]] = من غير ما تعمل object، و [[void]] = مبترجّعش حاجة، و [[String[] args]] = الـ arguments |
| [[System.out.println(...)]] | اطبع سطر |

---

## ١. [[javac Hello.java]]

[[javac]] = Java compiler. بيفحص الكود ويكتب [[Hello.class]]، ولو نجح مبيطبعش حاجة.

## ٢. [[ls]]

~~~text الناتج
Hello.class  Hello.java
~~~

ملف [[.class]] لكل class. ده **bytecode**: تعليمات مش لمعالج Intel ولا ARM، لمعالج «وهمي» اسمه JVM (Java Virtual Machine).

## ٣. [[java Hello]]

~~~text الناتج
Hello من Java
~~~

[[java]] بيشغّل الـ JVM، وبتديله **اسم الـ class** مش اسم الملف. [[java Hello.class]] غلط: هيدوّر على class اسمها [[Hello.class]] ومش هيلاقيها.

## ٤. [[file Hello.class]]

~~~text الناتج
Hello.class: compiled Java class data, version 65.0
~~~

[[65]] رقم نسخة الصيغة، و 65 = Java 21 (القاعدة: رقم الـ Java + 44). وده مكتوب في أول الملف:

~~~text xxd -l 8 Hello.class
cafe babe 0000 0041
~~~

- [[cafe babe]]: أول ٤ bytes في **أي** [[.class]]. اسمها magic number، وبيه [[file]] عرف النوع (درس magic bytes).
- [[0000]]: minor version.
- [[0041]]: major version بالـ hex: ٤×١٦ + ١ = 65.

وده سبب [[UnsupportedClassVersionError]]: JVM نسخة 17 بتفهم لحد 61 بس، فلو قرت 65 بترفض.

## ٥. [[jar cfe hello.jar Hello Hello.class]]

[[jar]] أداة بتعمل أرشيف. الحروف [[cfe]] options لازقة في بعض (زي [[tar]]):

| الحرف | معناه | قيمته |
|---|---|---|
| [[c]] | create: اعمل أرشيف جديد | |
| [[f]] | file: اسم الأرشيف | [[hello.jar]] |
| [[e]] | entry point: الـ class اللي فيها main | [[Hello]] |

والقيم بعدها بنفس ترتيب الحروف، وفي الآخر الملفات اللي تتحط جوه ([[Hello.class]]).

## ٦. [[java -jar hello.jar]]

~~~text الناتج
Hello من Java
~~~

[[-jar]] = شغّل الأرشيف. الـ JVM بتفتح ملف [[META-INF/MANIFEST.MF]] اللي جوه وتقرا منه سطر [[Main-Class: Hello]] (اللي [[e]] كتبه) وتشغّلها. ده نفس اللي بيحصل مع [[java -jar app.jar]] بتاع Spring Boot.

## ٧. [[unzip -l hello.jar]]

الـ jar مجرد zip، فـ [[unzip]] بيفتحه، و [[-l]] (list) بيعرض اللي جواه من غير ما يفكّه:

~~~text اللي جوه
META-INF/
META-INF/MANIFEST.MF
Hello.class
~~~

## ٨. لما اسم الملف ميطابقش

~~~text javac Hello2.java (فيه public class Wrong)
Hello2.java:1: error: class Wrong is public, should be declared in a file named Wrong.java
~~~

[[Hello2.java:1]] = الملف والسطر، والرسالة بتقولك الحل بالظبط.

---

## ٩. وفين Kotlin؟

[[.kt]] بيتحوّل بـ [[kotlinc]] أو Gradle لـ [[.class]] بنفس الشكل ([[cafe babe]] برضه)، فالـ JVM مش فارق معاها اتكتب بأنهي لغة. و [[.kts]] = Kotlin script، أشهره [[build.gradle.kts]].

## الخلاصة

~~~text
Hello.java  --javac-->  Hello.class  --jar-->  hello.jar
  نص              bytecode (cafe babe)       zip + MANIFEST
                  java Hello                 java -jar hello.jar
~~~

- اسم الـ public class = اسم الملف، و [[java Hello]] من غير [[.class]].
- رقم النسخة في الـ [[.class]] (65 = Java 21) لازم الـ JVM تبقى قدّه أو أحدث.
- [[*.class]] و [[target/]] و [[build/]] في [[.gitignore]]. وعمليًا Maven و Gradle بيعملوا كل ده.`,
          lines: [
            R`الكود: class اسمها [[Hello]] في ملف [[Hello.java]].`,
            R`compile: بيطلّع [[Hello.class]].`,
            R`هتلاقي [[Hello.class]] جنب الـ [[.java]].`,
            R`بيشغّل الـ class (من غير [[.class]] في الآخر).`,
            R`[[file]] بيعرف إنه Java bytecode ونسخته.`,
            R`بيعمل jar: [[c]] create و [[f]] اسم الملف و [[e]] الـ class اللي فيها main.`,
            R`بيشغّل الـ jar كله.`,
            R`الـ jar zip: ده اللي جواه.`
          ],
          sol: R`الناتج الحقيقي (JDK 21):
[[Hello.class  Hello.java]]
[[Hello من Java]]
[[Hello.class: compiled Java class data, version 65.0]]
[[Hello من Java]]
و [[unzip -l]] بيعرض [[META-INF/]] و [[META-INF/MANIFEST.MF]] و [[Hello.class]].

و [[javac Hello2.java]]:
[[Hello2.java:1: error: class Wrong is public, should be declared in a file named Wrong.java]]

و [[xxd -l 8 Hello.class]] بيطبع [[cafe babe 0000 0041]]: البصمة، و [[0x41]] = 65 = Java 21.`
        },
        {
          cmd: ".c و .h و .cpp و .o",
          title: "إيه .c و .h و .cpp و .hpp و .o، وإزاي بيبقوا برنامج؟",
          desc: R`C و C++ بيتحولوا لبرنامج بيشتغل على المعالج مباشرة (native)، من غير interpreter ولا JVM. الملفات:

• [[.c]]: كود C. و [[.cpp]] (أو [[.cc]] أو [[.cxx]]): كود C++.
• [[.h]] (header): فيه «التعريفات» بس: أسامي الدوال وأنواعها من غير جسمها، عشان الملفات التانية تعرف إن الدالة موجودة. و [[.hpp]] نفس الفكرة لـ C++.
• [[#include "calc.h"]]: بيلزق محتوى الـ header مكانه حرفيًا. [[" "]] للملفات بتاعتك، و [[< >]] لملفات النظام زي [[<stdio.h>]].
• [[#ifndef CALC_H]] و [[#define]] و [[#endif]] (include guard): عشان الـ header ميتلزقش مرتين.

البناء (build) بيمشي على مرحلتين:
• compile: كل [[.c]] لوحده يتحول لـ [[.o]] (object file، على ويندوز [[.obj]]): كود معالج بس لسه ناقص، لأن [[main.o]] بينادي [[add]] اللي في ملف تاني.
• link: الـ linker بيجمّع كل الـ [[.o]] مع المكتبات ويطلّع البرنامج: ملف من غير امتداد على لينكس والماك، و [[.exe]] على ويندوز.

مكتبات: [[.a]] (static، بتتلزق جوه البرنامج) و [[.so]] (shared على لينكس)، و [[.lib]] و [[.dll]] على ويندوز، و [[.dylib]] على الماك (المستوى ٣).

وملفات البناء: [[Makefile]] (المستوى ده) و [[CMakeLists.txt]] (CMake، الأشهر في C++). والناتج ([[*.o]] و [[build/]] والبرنامج) مكانه [[.gitignore]].`,
          example: R`cat calc.h
gcc -c calc.c
gcc -c main.c
gcc main.o calc.o -o app
./app
file calc.o app
gcc main.c -o app2`,
          try: R`اعمل الـ ٣ ملفات: [[calc.h]] فيه include guard و [[int add(int a, int b);]]، و [[calc.c]] فيه [[#include "calc.h"]] وجسم الدالة، و [[main.c]] فيه [[#include <stdio.h>]] و [[#include "calc.h"]] و [[main]] بتطبع [[add(2, 3)]]. نفّذ المثال (محتاج [[sudo apt install build-essential]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w gcc:14 sh -c 'gcc -c calc.c && gcc -c main.c && gcc main.o calc.o -o app && ./app']]). آخر سطر في المثال هيفشل، اقرا الغلط.`,
          deep: {
            why: R`تقسيم البناء لمرحلتين بيوفّر وقت: في مشروع فيه ١٠٠٠ ملف، لو عدّلت ملف واحد، بتعمل compile ليه هو بس وتعيد الـ link، بدل ما تعيد كل حاجة. والـ header هو «العقد» اللي بيخلي الملفات تعرف بعض من غير ما تشوف الكود.`,
            how: R`أول حاجة الـ preprocessor بينفذ أي سطر بيبدأ بـ [[#]] (يلزق الـ includes ويشيل اللي جوه [[#ifndef]] لو اتعرّف). بعدين الـ compiler يحوّل الناتج لـ assembly ثم [[.o]]، والـ [[.o]] فيه «أنا محتاج دالة اسمها add». الـ linker بيدوّر على [[add]] في باقي الـ [[.o]] والمكتبات، ولو ملقاهاش بيقول [[undefined reference]].`,
            when: R`برامج الأداء العالي، والألعاب، والأنظمة المدمجة، و Qt، ومكتبات Python و Node السريعة (اللي بتتبني لما تعمل install). التفاصيل في تاب C و C++.`,
            mistakes: R`تنسى تضيف [[calc.c]] في أمر البناء ([[undefined reference to 'add']]). تحط جسم دالة في [[.h]] وتعمله include في ملفين ([[multiple definition]]). تنسى الـ include guard. وتعمل commit للـ [[.o]] والبرنامج.`
          },
          teach: R`## الفكرة

٣ ملفات C بيتحوّلوا لبرنامج على خطوتين: كل [[.c]] لوحده يبقى [[.o]]، وبعدين الـ [[.o]] يتجمّعوا في برنامج. وآخر سطر بيوريك إيه اللي بيحصل لو نسيت ملف. مفيش gcc على الجهاز اللي اتكتب عليه الشرح، فالنواتج هي نواتج الدرس من gcc 14 على لينكس x86-64، ومطابقة لـ docs بتوع GCC.

الملفات:

~~~text calc.h
#ifndef CALC_H
#define CALC_H
int add(int a, int b);
#endif
~~~

~~~text calc.c
#include "calc.h"
int add(int a, int b) { return a + b; }
~~~

~~~text main.c
#include <stdio.h>
#include "calc.h"
int main(void) { printf("%d\n", add(2, 3)); return 0; }
~~~

---

## ١. [[cat calc.h]]: الـ header

| السطر | معناه |
|---|---|
| [[#ifndef CALC_H]] | «لو [[CALC_H]] **مش** متعرّف» (if not defined) كمّل، وإلا اقفز لـ [[#endif]] |
| [[#define CALC_H]] | عرّفه دلوقتي، فالمرة الجاية الشرط اللي فوق يفشل |
| [[int add(int a, int b);]] | **declaration**: «فيه دالة اسمها add بتاخد رقمين وترجّع [[int]]». من غير جسم، و [[;]] في الآخر |
| [[#endif]] | نهاية الشرط |

الـ ٣ سطور اللي بـ [[#]] اسمهم **include guard**: لو ملف عمل include لـ [[calc.h]] مرتين (مباشرة أو عن طريق header تاني) التعريف ميتكررش.

وأي سطر بيبدأ بـ [[#]] ده للـ **preprocessor**: مرحلة قبل الـ compile بتعدّل النص نفسه. [[#include "calc.h"]] حرفيًا بتلزق محتوى الملف مكانها. [[" "]] = دوّر جنبي الأول، و [[< >]] زي [[<stdio.h>]] = ملفات النظام.

## ٢. [[gcc -c calc.c]] و [[gcc -c main.c]]

- [[gcc]] = GNU Compiler Collection.
- [[-c]] = compile بس، من غير link.

الناتج [[calc.o]] و [[main.o]]. الـ [[main.o]] فيه كود معالج حقيقي، بس فيه «خرم»: بينادي [[add]] ومش عارف عنوانها، لأنه شاف الـ declaration بس من [[calc.h]]. والـ compile نجح عادي لأن الـ declaration كفاية للـ compiler.

## ٣. [[gcc main.o calc.o -o app]]

هنا gcc بيشغّل الـ **linker** ([[ld]]): بياخد الـ [[.o]] ويسد الخروم ([[add]] لقاها في [[calc.o]]، و [[printf]] في مكتبة C)، ويكتب برنامج واحد. [[-o app]] (output) = اسم الناتج. من غيره كان هيبقى [[a.out]].

## ٤. [[./app]]

~~~text الناتج
5
~~~

[[./]] لأن الفولدر الحالي مش في الـ PATH (درس [[.sh]]).

## ٥. [[file calc.o app]]

~~~text الناتج
calc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
app:    ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, ...
~~~

| الكلمة | معناها |
|---|---|
| [[ELF]] | صيغة البرامج على لينكس (على ويندوز PE و [[.exe]]، وعلى الماك Mach-O) |
| [[64-bit LSB]] | 64 بت، و LSB = little-endian (البايت الصغير الأول) |
| [[x86-64]] | لمعالج Intel أو AMD. مش هيشتغل على ARM |
| [[relocatable]] | [[.o]]: حتة لسه هتتجمّع، مش بتتشغّل |
| [[executable]] | برنامج جاهز |
| [[dynamically linked]] | بيستخدم مكتبة C الموجودة على الجهاز وقت التشغيل ([[.so]]) بدل ما ينسخها جواه |
| [[not stripped]] | لسه فيه أسامي الدوال (مفيدة للـ debugging) |

## ٦. [[gcc main.c -o app2]]: نسينا [[calc.c]]

~~~text الناتج
main.c:(.text+0xf): undefined reference to $__btadd'
collect2: error: ld returned 1 exit status
~~~

- الـ compile لـ [[main.c]] **نجح**.
- [[undefined reference to $__btadd']]: الـ linker ملقاش جسم [[add]] في أي ملف اتدّاله.
- [[(.text+0xf)]]: [[.text]] جزء الكود في الملف، و [[0xf]] المكان (byte 15) اللي فيه النداء.
- [[collect2]] و [[ld returned 1]]: الغلط من الـ linker مش من الـ compiler. لما تشوف [[ld]] دوّر على ملف أو مكتبة ناقصة في أمر البناء، مش على غلط في الكود.

## الخلاصة

~~~text
calc.c --gcc -c--> calc.o ┐
                          ├--link--> app (executable)
main.c --gcc -c--> main.o ┘
~~~

| الامتداد | فيه |
|---|---|
| [[.c]] / [[.cpp]] | الكود (C / C++) |
| [[.h]] / [[.hpp]] | declarations بس + include guard |
| [[.o]] ([[.obj]] على ويندوز) | كود معالج ناقص (relocatable) |
| البرنامج ([[.exe]] على ويندوز) | الناتج بعد الـ link |

- غلط فيه [[ld]] = ملف ناقص في الـ link، و [[.o]] والبرنامج في [[.gitignore]].`,
          lines: [
            R`الـ header: تعريف الدالة بس من غير جسمها، وحواليه include guard.`,
            R`[[-c]] compile بس من غير link: بيطلّع [[calc.o]].`,
            R`نفس الكلام لـ [[main.c]]: [[main.o]].`,
            R`link: بيجمّع الاتنين في برنامج اسمه [[app]] ([[-o]] اسم الناتج).`,
            R`تشغيل البرنامج.`,
            R`[[.o]] اسمه relocatable (ناقص)، و [[app]] executable.`,
            R`من غير [[calc.c]]: الـ compile ينجح والـ link يفشل.`
          ],
          sol: R`الناتج الحقيقي (gcc 14):
[[5]]
[[calc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped]]
[[app:    ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, ...]]
وآخر أمر:
[[main.c:(.text+0xf): undefined reference to $__btadd']]
[[collect2: error: ld returned 1 exit status]]
لاحظ إن الغلط من [[ld]] (الـ linker)، مش من الـ compiler: الكود سليم بس ناقصه ملف.`
        },
        {
          cmd: ".go و go.mod",
          title: "مشروع Go فيه إيه: .go و go.mod و go.sum؟",
          desc: R`Go بيتحول لبرنامج native زي C، بس الأداة [[go]] بتعمل كل حاجة: compile و link وتنزيل المكتبات والـ format والاختبارات. التفاصيل في تاب Go.

الملفات:
• [[.go]]: كود Go. أول سطر لازم [[package name]]، والبرنامج بيبدأ من [[package main]] و [[func main()]]. وكل ملفات الفولدر الواحد لازم تبقى نفس الـ package.
• [[_test.go]]: أي ملف اسمه بيخلص كده ملف اختبارات، [[go test]] بيشغّله والـ build العادي بيتجاهله.
• [[go.mod]]: بيعرّف المشروع (module): اسمه ونسخة Go والمكتبات المطلوبة ونسخها. بيتعمل بـ [[go mod init example.com/gym]]. الصيغة سطور بسيطة:
  [[module example.com/gym]]: اسم المشروع (غالبًا رابط الـ repo).
  [[go 1.25]]: أقل نسخة Go.
  [[require github.com/google/uuid v1.6.0]]: مكتبة ونسختها، و [[// indirect]] يعني مش انت اللي بتستخدمها مباشرة.
• [[go.sum]]: lock file: لكل مكتبة hash بيضمن إن الكود اللي هيتنزل هو هو بالظبط (درس lock files). بيتعمله commit، ومبتعدّلوش بإيدك.

الأوامر: [[go run .]] (يبني ويشغّل)، و [[go build -o app .]] (يطلّع برنامج واحد مفيهوش أي اعتماد على حاجة، تنقله على السيرفر وخلاص)، و [[go get pkg@version]] (يضيف مكتبة ويعدّل go.mod و go.sum)، و [[go mod tidy]] (يشيل اللي مش مستخدم ويضيف الناقص).`,
          example: R`go mod init example.com/gym
cat go.mod
go run .
go build -o gym .
file gym
go get github.com/google/uuid@v1.6.0
cat go.sum`,
          try: R`في فولدر فاضي نفّذ أول سطرين، وبعدين اعمل [[main.go]] فيه [[package main]] و [[import "fmt"]] و [[func main() { fmt.Println("Hello من Go") }]] وكمّل المثال. (محتاج Go، أو Docker: [[docker run --rm -v "$PWD":/w -w /w golang:1.25 go run .]].) بعد [[go get]] افتح [[go.mod]] تاني وشوف إيه اللي اتضاف.`,
          deep: {
            why: R`Go اتعمل في Google عشان مشاريع كبيرة تتبني بسرعة وتتنقل بسهولة. عشان كده البرنامج الناتج ملف واحد static ملوش أي اعتماد (حتى مش محتاج Go على السيرفر)، و [[go.mod]] بيحدد المكتبات بالظبط من غير أداة تانية زي npm.`,
            how: R`[[go build]] بيقرا [[go.mod]]، وينزّل المكتبات (لو مش موجودة) في cache على جهازك، ويتأكد من الـ hash في [[go.sum]]، ويعمل compile لكل الـ packages ويعملهم link في ملف واحد. والـ cache بيخلي المرة التانية سريعة جدًا.`,
            when: R`APIs وأدوات command line وأي حاجة في عالم الـ cloud (Docker و Kubernetes نفسهم مكتوبين Go).`,
            mistakes: R`تنسى [[go mod init]] فيطلعلك [[go: cannot find main module]]. تعدّل [[go.sum]] بإيدك أو متعملهوش commit. تحط ملفين في نفس الفولدر بـ package مختلفة ([[found packages main and utils]]). وتعمل commit للبرنامج الناتج.`
          },
          teach: R`## الفكرة

المثال بيبني مشروع Go من الصفر: يعرّفه بـ [[go.mod]]، يشغّله، يبنيه برنامج، ويضيف له مكتبة فيظهر [[go.sum]]. مفيش Go على الجهاز اللي اتكتب عليه الشرح، فالنواتج هي نواتج الدرس من Go 1.25 على لينكس، ومطابقة لـ docs الرسمية (go.dev/ref/mod).

الملف [[main.go]]:

~~~text main.go
package main

import "fmt"

func main() { fmt.Println("Hello من Go") }
~~~

- [[package main]]: كل ملف Go بيبدأ باسم الـ package بتاعته. [[main]] اسم خاص معناه «ده برنامج بيتشغّل» مش مكتبة.
- [[import "fmt"]]: مكتبة الطباعة (format) اللي جاية مع Go.
- [[func main()]]: البرنامج بيبدأ من هنا. [[func]] = دالة.

---

## ١. [[go mod init example.com/gym]]

~~~text الناتج
go: creating new go.mod: module example.com/gym
~~~

- [[mod]] = module، يعني المشروع.
- [[example.com/gym]]: اسم المشروع. غالبًا بيبقى رابط الـ repo ([[github.com/ali/gym]]) عشان يبقى فريد في الدنيا، والـ import جوه المشروع بيبدأ بيه ([[example.com/gym/api]]).

## ٢. [[cat go.mod]]

~~~text الناتج
module example.com/gym

go 1.25.0
~~~

سطرين بس: اسم المشروع، وأقل نسخة Go المشروع محتاجها (الرقم بيبقى حسب نسختك).

## ٣. [[go run .]]

~~~text الناتج
Hello من Go
~~~

[[.]] = الـ package اللي في الفولدر الحالي (كل ملفات [[.go]] فيه مع بعض). [[go run]] بيبني في فولدر مؤقت ويشغّل ويمسح، مفيش ملف بيفضل.

## ٤. [[go build -o gym .]]

نفس البناء، بس الناتج بيتحفظ: [[-o gym]] (output) = اسمه [[gym]]. على ويندوز اسمه يبقى [[gym.exe]].

## ٥. [[file gym]]

~~~text الناتج
gym: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, ...
~~~

الكلمة المهمة [[statically linked]]: كل حاجة البرنامج محتاجها جواه (قارن بـ [[dynamically linked]] في درس [[.c]]). فتنسخ الملف ده لأي سيرفر لينكس x86-64 ويشتغل، حتى لو مفيش Go عليه.

## ٦. [[go get github.com/google/uuid@v1.6.0]]

~~~text الناتج
go: added github.com/google/uuid v1.6.0
~~~

- [[go get]]: نزّل مكتبة وسجّلها في المشروع.
- [[@v1.6.0]]: النسخة بالظبط. من غيرها بياخد آخر نسخة.

[[go.mod]] بقى فيه سطر جديد:

~~~text go.mod
require github.com/google/uuid v1.6.0 // indirect
~~~

[[// indirect]] تعليق Go بيحطه لأن مفيش ملف في المشروع بيعمل [[import]] للمكتبة دي لسه. لو عملت import وشغّلت [[go mod tidy]] التعليق يختفي، ولو مستخدمتهاش خالص [[go mod tidy]] يشيل السطر كله.

## ٧. [[cat go.sum]]

~~~text الناتج
github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=
~~~

| الحتة | معناها |
|---|---|
| [[github.com/google/uuid v1.6.0]] | المكتبة ونسختها |
| [[/go.mod]] في السطر التاني | الـ hash ده لملف [[go.mod]] بتاع المكتبة بس |
| [[h1:]] | نوع الـ hash (SHA-256) |
| الباقي | الـ hash نفسه بـ Base64 |

لو حد غيّر كود المكتبة على GitHub، الـ hash مش هيطابق و [[go]] هيرفض يبني. عشان كده [[go.sum]] بيتعمله commit ومحدش بيعدّله بإيده.

## الخلاصة

| الملف | بيتعمله commit؟ | بيتعمل بـ |
|---|---|---|
| [[*.go]] | آه | انت |
| [[*_test.go]] | آه | انت، و [[go test]] بيشغّله |
| [[go.mod]] | آه | [[go mod init]] و [[go get]] و [[go mod tidy]] |
| [[go.sum]] | آه | [[go]] لوحده |
| البرنامج ([[gym]]) | لأ | [[go build]] |

- أداة واحدة ([[go]]) بتعمل كل حاجة، والناتج ملف واحد static.`,
          lines: [
            R`بيعمل [[go.mod]] باسم المشروع.`,
            R`فيه [[module]] و [[go]] ونسخة.`,
            R`يبني ويشغّل الـ package اللي في الفولدر الحالي.`,
            R`يبني برنامج اسمه [[gym]].`,
            R`برنامج لينكس static: ملوش أي اعتماد.`,
            R`يضيف مكتبة بنسخة محددة.`,
            R`الـ hashes اللي بتضمن الكود.`
          ],
          sol: R`الناتج الحقيقي (Go 1.25):
[[go: creating new go.mod: module example.com/gym]]
[[module example.com/gym]]
[[go 1.25.x]] (رقم نسختك)
[[Hello من Go]]
[[gym: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, ...]]
[[go: added github.com/google/uuid v1.6.0]]
و [[go.sum]] فيه سطرين:
[[github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=]]
[[github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=]]
و [[go.mod]] اتضاف فيه [[require github.com/google/uuid v1.6.0 // indirect]] (indirect لأن الكود لسه مش بيعمله import، و [[go mod tidy]] هيشيله).`
        },
        {
          cmd: ".php",
          title: "ملف .php فيه إيه، وإزاي PHP و HTML بيبقوا في نفس الملف؟",
          desc: R`[[.php]] ملف بيتنفذ على السيرفر قبل ما يتبعت للمتصفح. والميزة الغريبة فيه: الملف أساسًا HTML، وأي حاجة بين [[<?php]] و [[?>]] كود PHP بيتنفذ ويتحط ناتجه مكانه. المتصفح عمره ما بيشوف كود PHP، بيشوف الناتج بس. التفاصيل في تاب PHP و MySQL.

الرموز:
• [[<?php ... ?>]]: بلوك كود.
• [[<?= $x ?>]]: اختصار لـ [[<?php echo $x; ?>]]، يطبع قيمة جوه الـ HTML.
• [[$]] قبل أي متغير: [[$name]].
• [[;]] في آخر كل جملة، إجباري.
• [[//]] و [[#]] و [[/* */]] تعليقات.
• [[foreach (...):]] و [[endforeach;]]: شكل تاني للـ loops بيتقري أحسن جوه HTML.
• [[htmlspecialchars($x)]]: بيهرّب [[<]] و [[&]] وغيرهم قبل ما تطبع حاجة جاية من اليوزر (وإلا XSS، تاب الأمان).

قاعدة مهمة: الملف اللي كله PHP (من غير HTML)، زي الـ classes والـ config، متقفلوش بـ [[?>]] في الآخر. أي مسافة أو سطر بعد [[?>]] بيتبعت للمتصفح وبيعمل [[headers already sent]]. ونفس المشكلة لو الملف فيه BOM.

بيتشغّل إزاي: [[php file.php]] من الترمنال (يطبع الناتج)، أو [[php -S localhost:8000]] سيرفر للتطوير، أو على السيرفر الحقيقي Nginx أو Apache بيبعتوا الملف لـ PHP-FPM. ولو فتحت [[.php]] بدبل كليك أو السيرفر مش متظبط، هتشوف الكود نفسه أو المتصفح هينزّله كملف، وده تسريب للكود.

وأخوات: [[composer.json]] و [[composer.lock]] (زي package.json)، و [[.blade.php]] (قوالب Laravel)، و [[php.ini]] (درس INI).`,
          example: R`<?php
$name = $_GET["name"] ?? "زائر";
$items = ["تيشيرت" => 250, "مج" => 120];
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<body>
  <h1>أهلًا يا <?= htmlspecialchars($name) ?></h1>
  <ul>
    <?php foreach ($items as $item => $price): ?>
      <li><?= $item ?>: <?= $price ?> جنيه</li>
    <?php endforeach; ?>
  </ul>
</body>
</html>`,
          flag: "script",
          try: R`احفظ المثال في [[index.php]] ونفّذ [[php -l index.php]] (فحص) و [[php index.php]] (الناتج). وبعدين [[php -S localhost:8000]] وافتح [[http://localhost:8000/?name=سارة]] واعمل [[Ctrl+U]] تشوف اللي وصل المتصفح. (Docker: [[docker run --rm -v "$PWD":/w -w /w php:8.3-cli php index.php]].) وجرّب [[?name=<b>hi</b>]] مع وبدون [[htmlspecialchars]].`,
          deep: {
            why: R`PHP اتعمل أصلًا كطريقة تحط حتت ديناميكية جوه صفحات HTML. عشان كده الملف بيبدأ «HTML» وانت بتفتح فيه نوافذ كود. ده خلّى PHP أسهل لغة تعمل بيها موقع ديناميكي، وأغلب الويب (WordPress) لسه عليه.`,
            how: R`السيرفر لما يتطلب منه [[.php]] مش بيبعته، بيدّيه لـ PHP. PHP بيقرا الملف: أي حاجة بره [[<?php ?>]] بتتطبع زي ما هي، واللي جواه بيتنفذ. والناتج النهائي (HTML عادي) هو اللي بيتبعت. عشان كده [[Ctrl+U]] مبيوريكش أي [[<?php]].`,
            when: R`مواقع WordPress و Laravel وأي استضافة مشتركة (shared hosting) لأنها كلها بتدعم PHP جاهز.`,
            mistakes: R`تنسى [[;]] فيطلعلك [[Parse error: syntax error, unexpected end of file]]. تقفل ملف الـ class بـ [[?>]] وبعده سطر فاضي. تطبع داتا اليوزر من غير [[htmlspecialchars]]. وتحط [[.php]] على سيرفر مش متظبط فالكود (بالباسوردات اللي فيه) يتنزّل.`
          },
          teach: R`## الفكرة

الملف ده نصه PHP ونصه HTML. PHP بيمشي عليه من فوق لتحت: الـ HTML بيطلع زي ما هو، وأي حاجة بين [[<?php]] و [[?>]] بتتنفذ وناتجها بيتحط مكانها. مفيش PHP على الجهاز اللي اتكتب عليه الشرح، فالنواتج من الدرس (PHP 8.3) ومطابقة لـ docs الرسمية (php.net).

---

## ١. البلوك الأول: كود بس

~~~text الأسطر ١ لـ ٤
<?php
$name = $_GET["name"] ?? "زائر";
$items = ["تيشيرت" => 250, "مج" => 120];
?>
~~~

| الحتة | معناها |
|---|---|
| [[<?php]] | من هنا كود PHP |
| [[$name]] | متغير: في PHP كل متغير بيبدأ بـ [[$]] |
| [[$_GET["name"]]] | array جاهزة فيها اللي بعد [[?]] في الرابط: [[?name=سارة]] يبقى [[$_GET["name"]]] = [["سارة"]] |
| [[??]] | null coalescing: «لو اللي على الشمال مش موجود، خد اللي على اليمين». فلو مفيش [[name]] في الرابط، [[$name]] = [["زائر"]] |
| [[["تيشيرت" => 250, ...]]] | array بمفاتيح (associative): [[=>]] بين المفتاح والقيمة. زي object في JS |
| [[;]] | آخر كل جملة، إجباري |
| [[?>]] | خلص الكود. اللي بعده بيتبعت للمتصفح زي ما هو |

البلوك ده مطبعش حاجة، بس جهّز متغيرين.

## ٢. HTML عادي

[[<!DOCTYPE html>]] و [[<html lang="ar" dir="rtl">]] و [[<body>]]: PHP مبيبصلهمش، بيطبعهم حرف بحرف (درس [[.html]]).

## ٣. [[<?= htmlspecialchars($name) ?>]]

- [[<?=]] اختصار [[<?php echo]]: «اطبع القيمة دي هنا».
- [[htmlspecialchars]]: بتحوّل الرموز الخطيرة لـ entities: [[<]] تبقى [[&lt;]] و [[>]] تبقى [[&gt;]] و [[&]] تبقى [[&amp;]] و [["]] تبقى [[&quot;]].

ليه؟ لأن [[$name]] جاي من الرابط، يعني أي حد يكتب اللي هو عايزه. لو حد بعت [[?name=<b>hi</b>]]:

| | اللي بيوصل المتصفح | بيظهر |
|---|---|---|
| مع [[htmlspecialchars]] | [[&lt;b&gt;hi&lt;/b&gt;]] | النص [[<b>hi</b>]] زي ما هو |
| من غيرها | [[<b>hi</b>]] | hi بخط عريض: اليوزر حط HTML في صفحتك |

والحالة التانية هي نفسها اللي بتسمح بـ [[<script>]]، يعني XSS (تاب الأمان).

## ٤. الـ loop جوه HTML

~~~text الأسطر ١١ لـ ١٣
<?php foreach ($items as $item => $price): ?>
  <li><?= $item ?>: <?= $price ?> جنيه</li>
<?php endforeach; ?>
~~~

- [[foreach ($items as $item => $price)]]: لف على الـ array: كل لفة المفتاح في [[$item]] والقيمة في [[$price]].
- [[:]] بدل [[{]]، و [[endforeach;]] بدل [[}]]: الشكل ده (alternative syntax) معمول مخصوص عشان يتقري وهو متقطّع بين بلوكات PHP.
- السطر اللي في النص HTML عادي، بس بيتكرر مرة لكل منتج، وكل مرة بقيم مختلفة.

## ٥. التشغيل

~~~bash
php -l index.php
php index.php
~~~

- [[-l]] (lint): افحص الـ syntax بس من غير تشغيل:

~~~text الناتج
No syntax errors detected in index.php
~~~

- [[php index.php]]: شغّل واطبع الناتج على الشاشة. اللي بيطلع HTML نضيف مفيهوش ولا [[<?php]]:

~~~text جزء من الناتج (المسافات في أول السطور مختصرة)
  <h1>أهلًا يا زائر</h1>
  <ul>
      <li>تيشيرت: 250 جنيه</li>
      <li>مج: 120 جنيه</li>
  </ul>
~~~

«زائر» لأن من الترمنال مفيش رابط، فـ [[$_GET]] فاضية و [[??]] اشتغلت.

- [[php -S localhost:8000]]: سيرفر تطوير جاهز (S = server). افتح [[http://localhost:8000/?name=سارة]] والعنوان يبقى «أهلًا يا سارة»، و [[Ctrl+U]] هيوريك الـ HTML اللي وصل بس.

## ٦. لما تنسى [[;]]

~~~text ملف فيه echo "hi" من غير ;
Parse error: syntax error, unexpected end of file, expecting "," or ";" in bad.php on line 3
~~~

[[Parse error]] = PHP مقدرش يقرا الملف أصلًا، فمفيش ولا سطر اتنفذ. ورقم السطر بيشاور غالبًا على السطر **اللي بعد** الغلطة، لأن PHP مكتشفش إن الجملة خلصت غير لما وصل هناك.

## الخلاصة

| الرمز | معناه |
|---|---|
| [[<?php ... ?>]] | بلوك كود |
| [[<?= x ?>]] | اطبع قيمة |
| [[$x]] | متغير |
| [[??]] | قيمة افتراضية |
| [[=>]] | مفتاح وقيمة في array |
| [[foreach (...):]] ... [[endforeach;]] | loop جوه HTML |

- المتصفح عمره ما بيشوف كود PHP، بيشوف الناتج بس.
- أي حاجة جاية من اليوزر تتطبع بـ [[htmlspecialchars]]، والملف اللي كله PHP متقفلوش بـ [[?>]].`,
          lines: [
            R`بداية بلوك PHP.`,
            R`[[$_GET["name"]]] من الرابط، و [[??]] قيمة افتراضية لو مش موجود.`,
            R`array بمفاتيح: [[=>]] بين المفتاح والقيمة.`,
            R`قفل البلوك، واللي بعده HTML بيتبعت زي ما هو.`,
            R`HTML عادي.`,
            R`HTML عادي.`,
            R`HTML عادي.`,
            R`[[<?=]] يطبع القيمة، بعد ما [[htmlspecialchars]] يهرّبها.`,
            R`HTML.`,
            R`[[foreach]] بالشكل اللي بينتهي بـ [[:]]، وكل اللي لحد [[endforeach]] بيتكرر.`,
            R`عنصر بيتكرر لكل منتج، وفيه قيمتين.`,
            R`نهاية الـ loop.`,
            R`HTML.`,
            R`HTML.`,
            R`HTML.`
          ],
          sol: R`[[php -l index.php]] ← [[No syntax errors detected in index.php]]
[[php index.php]] بيطبع HTML عادي فيه [[<h1>أهلًا يا زائر</h1>]] و [[<li>تيشيرت: 250 جنيه</li>]] و [[<li>مج: 120 جنيه</li>]]، ومفيش ولا [[<?php]].

مع [[?name=سارة]] العنوان بيبقى «أهلًا يا سارة». ومع [[?name=<b>hi</b>]] و [[htmlspecialchars]] بيظهر النص [[<b>hi</b>]] زي ما هو، ومن غيرها بيظهر hi بخط عريض: يعني اليوزر قدر يحط HTML في صفحتك (وبنفس الطريقة يحط [[<script>]]).

وملف فيه [[echo "hi"]] من غير [[;]]: [[Parse error: syntax error, unexpected end of file, expecting "," or ";" in bad.php on line 3]].`
        },
        {
          cmd: ".swift و .dart و .rs و .rb",
          title: "إيه ملفات .swift و .dart و .rs و .rb و .cs، وبتتشغّل بإيه؟",
          desc: R`لغات تانية هتقابلها، كل واحدة بملفها وأداتها:

• [[.swift]]: Swift، لغة تطبيقات iOS والماك. [[swift file.swift]] بيشغّل ملف لوحده، والمشاريع الحقيقية في Xcode ([[.xcodeproj]] و [[.xcworkspace]]، وهي فولدرات مش ملفات) أو Swift Package Manager ([[Package.swift]]). تاب Swift و iOS.
• [[.dart]]: Dart، لغة Flutter. [[dart run file.dart]] أو [[flutter run]]، والمشروع معرّف في [[pubspec.yaml]] (YAML) و [[pubspec.lock]]. تاب Flutter و Dart.
• [[.rs]]: Rust. المشروع بيتعمل بـ [[cargo new app]] وبيتعرّف في [[Cargo.toml]] (TOML) و [[Cargo.lock]]، و [[cargo run]] بيبني ويشغّل، والناتج في [[target/]].
• [[.rb]]: Ruby (و Rails). [[ruby file.rb]]، والمكتبات في [[Gemfile]] و [[Gemfile.lock]]، و [[.erb]] قوالب HTML فيها Ruby زي PHP.
• [[.cs]]: C#، والمشروع في [[.csproj]] (درس [[.csproj]] تحت).
• [[.kt]]: Kotlin (درس [[.java]]).
• [[.lua]] (إعدادات Neovim والألعاب)، و [[.r]] (إحصاء)، و [[.scala]]، و [[.ex]] و [[.exs]] (Elixir).

الفكرة اللي بتتكرر في كل لغة، ولو فهمتها هتعرف أي لغة جديدة بسرعة:
• ملف الكود نفسه (نص).
• ملف بيعرّف المشروع والمكتبات: [[package.json]] و [[pyproject.toml]] و [[go.mod]] و [[Cargo.toml]] و [[pubspec.yaml]] و [[Gemfile]] و [[pom.xml]] و [[.csproj]].
• lock file بالنسخ المضبوطة: بيتعمله commit.
• فولدر ناتج أو مكتبات: [[node_modules/]] و [[target/]] و [[build/]] و [[.dart_tool/]] و [[bin/]] و [[obj/]]: في [[.gitignore]].`,
          example: R`swift hello.swift
dart run hello.dart
cargo new app && cd app && cargo run
ruby hello.rb`,
          try: R`اختار لغة منهم واعمل [[hello]] بيها وشغّله (لو مش متسطّبة، Docker: [[docker run --rm -v "$PWD":/w -w /w swift:6.0 swift hello.swift]] و [[docker run --rm -v "$PWD":/w -w /w dart:stable dart run hello.dart]]). ولو عندك مشروع Flutter أو Rust افتح الفولدر وطلّع فيه الأربع حاجات: ملف الكود، وملف المشروع، والـ lock، وفولدر الناتج.`,
          deep: {
            why: R`كل لغة ليها نظام بناء ومكتبات خاص بيها، بس كلهم وصلوا لنفس الحل: ملف بيوصف المشروع، و lock file، وأداة واحدة بتعمل كل حاجة (cargo و dart و swift و go و npm).`,
            how: R`[[swift file.swift]] و [[dart run]] بيعملوا compile في الذاكرة ويشغّلوا (زي [[go run]]). [[cargo]] بيقرا [[Cargo.toml]] وينزّل المكتبات من crates.io ويبني في [[target/debug/]]. و Ruby زي Python: interpreter بيقرا الملف ويشغّله.`,
            when: R`Swift لـ iOS، و Dart لـ Flutter، و Rust للأدوات السريعة والأنظمة (وأدوات JS كتير زي SWC و Turbopack مكتوبة Rust)، و Ruby لو بتشتغل في مشروع Rails.`,
            mistakes: R`تعمل commit لـ [[target/]] أو [[.dart_tool/]] أو [[build/]]. تنسى الـ lock file. وتفتح [[.xcodeproj]] كأنه ملف: هو فولدر جواه [[project.pbxproj]] (نص)، وده أكتر ملف بيعمل conflicts في Git في مشاريع iOS.`
          },
          teach: R`## الفكرة

الدرس ده مش عن لغة واحدة، عن **نمط** بيتكرر في كل اللغات: ملف كود، وأداة بتشغّله، وملف بيعرّف المشروع، و lock file، وفولدر ناتج. المثال ٤ أوامر، كل واحد بيشغّل hello في لغة. الأدوات دي مش متسطّبة على الجهاز اللي اتكتب عليه الشرح، فالنواتج من الدرس ومن docs كل لغة (swift.org و dart.dev و doc.rust-lang.org/cargo و ruby-lang.org).

---

## ١. [[swift hello.swift]]

~~~text hello.swift
print("Hello من Swift")
~~~

~~~text الناتج
Hello من Swift
~~~

[[swift]] لما تدّيله ملف بيعمله compile في الذاكرة ويشغّله (زي [[go run]]). Swift مش محتاج [[main]]: أول سطر في الملف هو البداية. على الماك جاي مع Xcode، وفيه نسخ للينكس وويندوز.

## ٢. [[dart run hello.dart]]

~~~text hello.dart
void main() { print("Hello من Dart"); }
~~~

~~~text الناتج
Hello من Dart
~~~

Dart محتاج [[main]] زي Java و Go. [[void]] = مبترجّعش حاجة. و [[dart run]] بيشغّل الملف علطول. في Flutter مش بتشغّل ملف لوحده، بتشغّل المشروع كله بـ [[flutter run]].

## ٣. [[cargo new app && cd app && cargo run]]

ده ٣ أوامر في سطر، و [[&&]] معناها «لو اللي قبلي نجح، شغّلني». فلو [[cargo new]] فشل مش هيدخل الفولدر.

- [[cargo]]: أداة Rust (زي [[go]] و [[npm]] مع بعض).
- [[cargo new app]]: بيعمل فولدر [[app]] فيه:

~~~text app/
Cargo.toml     تعريف المشروع (TOML): الاسم والنسخة والمكتبات
src/main.rs    fn main() { println!("Hello, world!"); }
.gitignore     فيه /target
~~~

وبيعمل كمان git repo جديد في الفولدر.

- [[cargo run]]: بيبني ويشغّل:

~~~text الناتج
   Compiling app v0.1.0 (/home/ali/app)
    Finished $__btdev$__bt profile [unoptimized + debuginfo] target(s) in 0.50s
     Running $__bttarget/debug/app$__bt
Hello, world!
~~~

| السطر | معناه |
|---|---|
| [[Compiling app v0.1.0]] | بيبني المشروع ([[0.1.0]] النسخة اللي في [[Cargo.toml]]) |
| [[dev profile [unoptimized + debuginfo]]] | بناء للتطوير: سريع في البناء، بطيء شوية في التشغيل. [[cargo run --release]] العكس |
| [[Running target/debug/app]] | مكان البرنامج الناتج: فولدر [[target/]]، وده في [[.gitignore]] |

وأول ما تضيف مكتبة بيظهر [[Cargo.lock]].

## ٤. [[ruby hello.rb]]

[[ruby]] interpreter زي [[python3]]: بيقرا الملف وينفذه. ملف فيه [[puts "Hello من Ruby"]] بيطبع السطر ده ([[puts]] = put string، زي [[print]] بسطر جديد).

---

## الجدول اللي يلخّص كل اللغات

| اللغة | الكود | المشروع | الـ lock | الناتج (في [[.gitignore]]) |
|---|---|---|---|---|
| JavaScript | [[.js]] [[.ts]] | [[package.json]] | [[package-lock.json]] | [[node_modules/]] [[dist/]] |
| Python | [[.py]] | [[pyproject.toml]] | [[uv.lock]] أو [[poetry.lock]] | [[.venv/]] [[__pycache__/]] |
| Go | [[.go]] | [[go.mod]] | [[go.sum]] | البرنامج |
| Rust | [[.rs]] | [[Cargo.toml]] | [[Cargo.lock]] | [[target/]] |
| Dart و Flutter | [[.dart]] | [[pubspec.yaml]] | [[pubspec.lock]] | [[build/]] [[.dart_tool/]] |
| Ruby | [[.rb]] | [[Gemfile]] | [[Gemfile.lock]] | [[vendor/bundle/]] |
| Swift | [[.swift]] | [[Package.swift]] أو [[.xcodeproj]] | [[Package.resolved]] | [[.build/]] |
| Java و Kotlin | [[.java]] [[.kt]] | [[pom.xml]] أو [[build.gradle.kts]] | | [[target/]] [[build/]] |
| C# | [[.cs]] | [[.csproj]] | [[packages.lock.json]] (اختياري) | [[bin/]] [[obj/]] |

## الخلاصة

- لغة جديدة؟ دوّر على الـ ٤ حاجات: ملف الكود، وملف المشروع، والـ lock، وفولدر الناتج.
- ملف المشروع والـ lock بيتعملهم commit، وفولدر الناتج لأ.`,
          lines: [
            R`Swift: يبني ويشغّل ملف واحد.`,
            R`Dart: نفس الكلام.`,
            R`Rust: [[cargo new]] بيعمل مشروع فيه [[Cargo.toml]] و [[src/main.rs]]، و [[cargo run]] يبني ويشغّل.`,
            R`Ruby: interpreter زي Python.`
          ],
          sol: R`[[swift hello.swift]] (الملف فيه [[print("Hello من Swift")]]) بيطبع [[Hello من Swift]]، و [[dart run hello.dart]] (فيه [[void main() { print("Hello من Dart"); }]]) بيطبع [[Hello من Dart]]. و [[cargo run]] في مشروع جديد بيطبع سطور [[Compiling app v0.1.0]] و [[Running $__bttarget/debug/app$__bt]] وبعدين [[Hello, world!]].

وفي مشروع Flutter: الكود [[lib/main.dart]]، والمشروع [[pubspec.yaml]]، والـ lock [[pubspec.lock]]، والناتج [[build/]] و [[.dart_tool/]].`
        },
        {
          cmd: ".sql",
          title: "ملف .sql جواه إيه، وبتشغّله على قاعدة البيانات إزاي؟",
          desc: R`[[.sql]] ملف نصي فيه أوامر SQL ورا بعض، كل أمر بيخلص بـ [[;]]. مش برنامج بيتشغّل لوحده: بتدّيه لقاعدة البيانات وهي تنفذه أمر أمر. التفاصيل في تاب SQL و Prisma و PostgreSQL.

هتقابله في ٣ أشكال:
• migration: ملف بيغيّر شكل القاعدة (يعمل جدول أو يضيف عمود)، وغالبًا اسمه فيه رقم أو تاريخ عشان الترتيب: [[001_create_members.sql]] أو [[migrations/20261001_add_phone/migration.sql]] (Prisma). كل الـ migrations بالترتيب بتبني القاعدة من الصفر.
• seed: داتا أولية للتجربة ([[seed.sql]]).
• dump أو backup: ملف بيطلّعه [[pg_dump]] أو [[mysqldump]]، فيه القاعدة كلها كأوامر ([[CREATE TABLE]] و [[INSERT]] أو [[COPY]]). ممكن يبقى حجمه جيجات، ومكانه مش Git.

الرموز:
• [[;]] نهاية كل أمر.
• [[--]] تعليق لحد آخر السطر، و [[/* */]] تعليق بلوك.
• [[' ']] حوالين النصوص، و [[']] جوه النص بتتكتب مرتين: [['O''Brien']].
• [[" "]] في PostgreSQL للأسامي (جداول وأعمدة) مش للنصوص.

بتشغّله إزاي:
• PostgreSQL: [[psql -U user -d db -f file.sql]]، أو [[psql ... < file.sql]].
• MySQL: [[mysql -u user -p db < file.sql]].
• SQLite: [[sqlite3 app.db < file.sql]].
• أو من برامج زي DBeaver و pgAdmin و TablePlus.

مهم: كل قاعدة ليها لهجة (dialect): [[SERIAL]] في PostgreSQL، و [[AUTO_INCREMENT]] في MySQL، و [[AUTOINCREMENT]] في SQLite. فملف [[.sql]] مكتوب لقاعدة غالبًا مش هيشتغل على التانية من غير تعديل.`,
          example: R`-- جدول الأعضاء
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  joined_at DATE DEFAULT CURRENT_DATE
);
INSERT INTO members (name, email) VALUES
  ('سارة', 'sara@example.com'),
  ('O''Brien', 'ob@example.com');
SELECT name, email FROM members ORDER BY id;`,
          flag: "script",
          try: R`احفظ المثال في [[001_create_members.sql]] وشغّله على PostgreSQL في Docker:
[[docker run -d --name pg -e POSTGRES_PASSWORD=pw -v "$PWD":/w postgres:17]]
استنى ثواني وبعدين [[docker exec pg psql -U postgres -v ON_ERROR_STOP=1 -f /w/001_create_members.sql]]. شغّله مرة تانية واقرا الغلط. وبعدين اعمل dump: [[docker exec pg pg_dump -U postgres --table=members --inserts > backup.sql]] وافتح [[backup.sql]]. ولما تخلص: [[docker rm -f pg]].`,
          deep: {
            why: R`تغييرات القاعدة لازم تبقى متسجلة ومتكررة: لو عملت جدول بإيدك في pgAdmin، مفيش حد في التيم ولا السيرفر هيعرف. ملف [[.sql]] في Git (أو migration من Prisma أو Django) بيخلي أي حد يبني نفس القاعدة بالظبط.`,
            how: R`[[psql -f]] بيقرا الملف ويبعت كل أمر لحد [[;]] للسيرفر وينفذه ويطبع النتيجة ([[CREATE TABLE]] و [[INSERT 0 2]]). و [[ON_ERROR_STOP=1]] بيخليه يوقف عند أول غلط بدل ما يكمّل الباقي على قاعدة نصها اتغيّر. والـ dump هو العكس: [[pg_dump]] بيقرا القاعدة ويكتب الأوامر اللي تبنيها تاني.`,
            when: R`migrations و seeds في أي مشروع فيه قاعدة بيانات، و backup قبل أي تغيير كبير على الـ production، ونقل داتا بين سيرفرين.`,
            mistakes: R`تشغّل migration مرتين فيطلعلك [[relation "members" already exists]] (أدوات الـ migrations بتسجل اللي اتنفذ عشان كده). تنسى [[;]] فأمرين يتلزقوا. تحط باسورد أو داتا حقيقية للعملاء في [[seed.sql]] في Git. وترفع dump حجمه جيجا على GitHub (فيه داتا العملاء كمان).`
          },
          teach: R`## الفكرة

ملف [[.sql]] = أوامر SQL ورا بعض، والقاعدة بتنفذها بالترتيب. المثال migration صغيرة: تعمل جدول، تضيف صفين، وتعرضهم. شغّلناه فعلًا على PostgreSQL 16 في Docker (كونتينر باسم خاص واتمسح بعدها)، بنفس أوامر الـ «جرّب».

---

## ١. التعليق: [[-- جدول الأعضاء]]

[[--]] لحد آخر السطر تعليق، القاعدة بتتجاهله. (في SQL مش [[#]] ولا [[//]].)

## ٢. [[CREATE TABLE members ( ... );]]

~~~text
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  joined_at DATE DEFAULT CURRENT_DATE
);
~~~

أمر واحد على ٦ سطور: القاعدة مش فارق معاها السطور، بتقرا لحد ما تلاقي [[;]]. وكل عمود: اسمه، ونوعه، وبعدين شروط:

| العمود | النوع | الشرط | معناه |
|---|---|---|---|
| [[id]] | [[SERIAL]] | [[PRIMARY KEY]] | رقم بيزيد لوحده (1، 2، 3...)، ومفتاح الجدول: مش بيتكرر ومش فاضي |
| [[name]] | [[TEXT]] | [[NOT NULL]] | نص، وإجباري |
| [[email]] | [[TEXT]] | [[UNIQUE]] | نص، وممنوع اتنين بنفس الإيميل |
| [[joined_at]] | [[DATE]] | [[DEFAULT CURRENT_DATE]] | تاريخ، ولو محدش حطه ياخد تاريخ النهارده |

[[SERIAL]] كلمة PostgreSQL بس. في MySQL [[AUTO_INCREMENT]]، وفي SQLite [[INTEGER PRIMARY KEY AUTOINCREMENT]]: ده معنى إن كل قاعدة ليها لهجة.

## ٣. [[INSERT INTO members (name, email) VALUES ...;]]

~~~text
INSERT INTO members (name, email) VALUES
  ('سارة', 'sara@example.com'),
  ('O''Brien', 'ob@example.com');
~~~

- [[(name, email)]]: العواميد اللي هنملاها بس. [[id]] و [[joined_at]] هياخدوا قيمهم لوحدهم.
- كل صف بين [[( )]]، والصفوف مفصولة بـ [[,]]، و [[;]] بعد آخر صف.
- النصوص بين [[' ']] (علامة واحدة). وعشان تكتب [[']] **جوه** نص بتكتبها مرتين: [['O''Brien']] = O'Brien.

## ٤. [[SELECT name, email FROM members ORDER BY id;]]

هات عمودين من الجدول، مترتبين بالـ [[id]].

---

## ٥. التشغيل: [[psql -U postgres -v ON_ERROR_STOP=1 -f /w/001_create_members.sql]]

| الحتة | معناها |
|---|---|
| [[docker exec pg]] | شغّل الأمر اللي بعدي جوه الكونتينر [[pg]] |
| [[psql]] | برنامج PostgreSQL بتاع الترمنال |
| [[-U postgres]] | (user) ادخل باليوزر ده |
| [[-v ON_ERROR_STOP=1]] | (variable) اقف عند أول غلط |
| [[-f /w/...sql]] | (file) نفّذ الملف ده. [[/w]] هو فولدرك اللي ربطناه بـ [[-v "$PWD":/w]] |

~~~text الناتج
CREATE TABLE
INSERT 0 2
  name   |      email
---------+------------------
 سارة    | sara@example.com
 O'Brien | ob@example.com
(2 rows)
~~~

- [[CREATE TABLE]]: الأمر الأول نجح.
- [[INSERT 0 2]]: الرقم التاني (2) عدد الصفوف اللي اتضافت. الأول (0) من زمان ودايمًا صفر.
- الجدول: ناتج الـ [[SELECT]]، ولاحظ [[O'Brien]] اتخزنت بعلامة واحدة.

## ٦. شغّلناه مرة تانية

~~~text الناتج
psql:/w/001_create_members.sql:7: ERROR:  relation "members" already exists
~~~

- [[:7:]]: الغلط في الأمر اللي بيخلص في السطر 7 (الـ [[CREATE TABLE]]).
- [[relation]] = جدول (في كلام PostgreSQL).
- بسبب [[ON_ERROR_STOP=1]] [[psql]] وقف هنا: الـ [[INSERT]] والـ [[SELECT]] متنفذوش، والـ exit code كان [[3]]. من غير الخيار ده [[psql]] بيطبع الغلط ويكمّل الأوامر اللي بعده، وفي migration حقيقية ده معناه إن نصها يتنفذ ونصها لأ.

عشان كده أدوات الـ migrations (Prisma و Django وغيرهم) بتسجّل الملفات اللي اتنفذت في جدول خاص، وبتشغّل الجديد بس.

## ٧. الـ dump: [[pg_dump -U postgres --table=members --inserts > backup.sql]]

- [[pg_dump]]: بيقرا القاعدة ويكتبها أوامر SQL.
- [[--table=members]]: الجدول ده بس.
- [[--inserts]]: الداتا تتكتب [[INSERT]] (من غيرها بتتكتب [[COPY]]، أسرع بس أصعب في القراية).
- [[> backup.sql]]: الناتج في ملف على جهازك (الـ [[>]] بتاع الـ shell بتاعك، مش جوه الكونتينر).

أهم اللي جوه الملف (من غير التعليقات):

~~~text backup.sql (مختصر)
SET client_encoding = 'UTF8';
...
CREATE TABLE public.members (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    joined_at date DEFAULT CURRENT_DATE
);
CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
...
ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);
INSERT INTO public.members VALUES (1, 'سارة', 'sara@example.com', '2026-10-07');
INSERT INTO public.members VALUES (2, 'O''Brien', 'ob@example.com', '2026-10-07');
SELECT pg_catalog.setval('public.members_id_seq', 2, true);
ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
~~~

حاجات تتعلمها من الملف ده:
- [[SERIAL]] مش نوع حقيقي: PostgreSQL حوّله لـ [[integer]] + [[SEQUENCE]] (عدّاد) + [[DEFAULT nextval(...)]].
- [[setval(..., 2, true)]]: العدّاد بيتظبط على 2، فأول صف جديد ياخد 3.
- الـ [[PRIMARY KEY]] و [[UNIQUE]] اتضافوا في **الآخر** بعد الداتا، لأن ده أسرع في الملفات الكبيرة.
- [[public.]] اسم الـ schema الافتراضي.
- في أول الملف وآخره سطرين [[\restrict ...]] و [[\unrestrict ...]]: نسخ [[pg_dump]] الحديثة بتحطهم كحماية لما الملف يتشغّل بـ [[psql]]، و [[psql]] بيفهمهم لوحده.

## الخلاصة

| الرمز | معناه |
|---|---|
| [[;]] | نهاية الأمر (مش نهاية السطر) |
| [[--]] و [[/* */]] | تعليق |
| [['نص']] و [['O''Brien']] | نص، و [[']] جواه مرتين |
| [[psql -v ON_ERROR_STOP=1 -f]] | نفّذ ملف واقف عند أول غلط |
| [[pg_dump --inserts]] | القاعدة ← ملف [[.sql]] |

- الـ migration بتتنفذ مرة واحدة بس، والـ dump فيه داتا حقيقية فمكانه مش Git.`,
          lines: [
            R`تعليق [[--]] (بيتحسب سطر هنا لأنه SQL): بيتجاهل لحد آخر السطر.`,
            R`بداية أمر عمل جدول.`,
            R`[[SERIAL]] رقم بيزيد لوحده (لهجة PostgreSQL)، و [[PRIMARY KEY]] المفتاح.`,
            R`[[NOT NULL]]: إجباري.`,
            R`[[UNIQUE]]: ممنوع يتكرر.`,
            R`قيمة افتراضية: تاريخ النهارده.`,
            R`[[;]] نهاية الأمر الأول.`,
            R`أمر إضافة صفوف.`,
            R`النصوص بين [[' ']].`,
            R`[['']] جوه النص يعني [[']] واحدة، و [[;]] نهاية الأمر.`,
            R`استعلام يطبع اللي اتضاف.`
          ],
          sol: R`أول تشغيل:
[[CREATE TABLE]]
[[INSERT 0 2]]
وبعدين جدول فيه [[سارة | sara@example.com]] و [[O'Brien | ob@example.com]] و [[(2 rows)]].

تاني تشغيل (مع [[ON_ERROR_STOP=1]]):
[[psql:/w/001_create_members.sql:7: ERROR:  relation "members" already exists]]
ومبيكملش.

[[backup.sql]] فيه سطور [[SET ...]] في الأول، وبعدين [[CREATE TABLE public.members (...)]] و [[CREATE SEQUENCE]]، وبعدين [[INSERT INTO public.members VALUES (1, 'سارة', ...)]]. ولما تنقله لقاعدة فاضية وتشغّله بـ [[psql -f]] الجدول يرجع بالداتا.`
        }
      ]
    },
    {
      t: "ملفات السكربتات: .sh و .ps1 و .bat",
      l: 2,
      n: "ملفات فيها أوامر ترمنال ورا بعض: مين بيشغّلها، والـ shebang و chmod +x، و Execution Policy في ويندوز، وإيه اللي بيحصل لما تدوس عليها دبل كليك",
      items: [
        {
          cmd: ".sh و .bash و .zsh",
          title: "ملف .sh بيتشغّل إزاي، وإيه #! و chmod +x؟",
          desc: R`[[.sh]] ملف نصي فيه أوامر shell ورا بعض، بالظبط زي ما بتكتبها في الترمنال. بيستخدم لأتمتة أي حاجة بتكررها: deploy و backup وتجهيز سيرفر. التفاصيل في تاب bash.

الامتدادات: [[.sh]] الأشهر (معناها «سكربت shell» عمومًا)، و [[.bash]] أو [[.zsh]] لو السكربت بيستخدم حاجات خاصة بالشيل ده. بس الحقيقة إن الامتداد مش هو اللي بيحدد مين يشغّله، اللي بيحدد هو أول سطر.

أول سطر (shebang): [[#!/usr/bin/env bash]]
• [[#!]] لازم يبقوا أول حرفين في الملف خالص (ولا مسافة ولا BOM قبلهم).
• بعدهم مسار البرنامج اللي هيشغّل الملف. [[/usr/bin/env bash]] معناها «دوّر على bash في الـ PATH»، وده أأمن من [[#!/bin/bash]] لأن bash مش في نفس المكان على كل الأنظمة (الماك مثلًا).
• [[#!/bin/sh]] معناها shell بسيط (على أوبونتو ده dash مش bash)، فحاجات bash زي [[[[ ]]]] والـ arrays مش هتشتغل.
• نفس الفكرة لأي لغة: [[#!/usr/bin/env python3]] و [[#!/usr/bin/env node]].

صلاحية التشغيل: الملف الجديد مبيتشغّلش بـ [[./deploy.sh]] غير لما تديله [[x]]: [[chmod +x deploy.sh]]. ومن غير صلاحية تقدر تشغّله بـ [[bash deploy.sh]] (هنا انت اللي اخترت البرنامج، فالـ shebang بيتجاهل).

ليه [[./]]؟ لأن الفولدر الحالي مش في الـ PATH لأسباب أمان، فلازم تقول المسار صراحة.

على ويندوز: [[.sh]] مبيشتغلش في PowerShell ولا CMD. شغّله في Git Bash أو WSL. والدبل كليك عليه بيفتحه في المحرر أو Git Bash على حسب الإعدادات. وأخطر حاجة: لو اتكتب على ويندوز ممكن يتحفظ CRLF فيقع على لينكس (درس LF و CRLF)، و Git ممكن يضيّع صلاحية [[x]] (الحل: [[git update-index --chmod=+x deploy.sh]]).`,
          example: R`#!/usr/bin/env bash
# بيعمل نسخة احتياطية من فولدر
set -euo pipefail
SRC="$__{1:-.}"
DEST="backup-$(date +%F).tar.gz"
echo "بعمل backup لـ $SRC"
tar -czf "$DEST" "$SRC"
echo "تم: $DEST ($(du -h "$DEST" | cut -f1))"`,
          flag: "script",
          try: R`احفظ المثال في [[deploy.sh]] في [[lab/files]] واعمل فولدر [[data]] فيه أي ملف. جرّب بالترتيب: [[./deploy.sh data]] (هيرفض)، و [[bash deploy.sh data]]، و [[chmod +x deploy.sh]] وبعدين [[./deploy.sh data]]، و [[ls -l deploy.sh]]. وبعدين جرّب [[./deploy.sh مش-موجود]] وشوف [[set -e]] عمل إيه.`,
          deep: {
            why: R`أي حاجة بتكتبها في الترمنال أكتر من مرتين تستاهل تبقى سكربت: بتتنفذ كل مرة بنفس الطريقة، ومتنساش خطوة، وتقدر تديها لحد تاني أو للـ CI. والـ shebang بيخلي السكربت يتشغّل زي أي برنامج من غير ما اليوزر يعرف مكتوب بإيه.`,
            how: R`لما تكتب [[./deploy.sh]]، الـ kernel بيقرا أول bytes في الملف: لو [[#!]] بياخد باقي السطر كبرنامج ويشغّله ويديله اسم الملف، يعني بينفذ فعليًا [[/usr/bin/env bash ./deploy.sh data]]. وقبلها بيشيك على صلاحية [[x]]، ومن غيرها [[Permission denied]]. و [[set -euo pipefail]]: [[-e]] وقّف عند أول أمر يفشل، و [[-u]] متغير مش معرّف يبقى غلط، و [[pipefail]] لو أي أمر في pipe فشل الكل فشل.`,
            when: R`أتمتة على لينكس والماك والسيرفرات: deploy و backup و setup، والسكربتات في [[package.json]] لما تكبر، وخطوات الـ CI، و [[entrypoint.sh]] في Docker.`,
            mistakes: R`سكربت بـ CRLF ([[cannot execute: required file not found]] أو [[bad interpreter]]). تنسى [[chmod +x]] ([[Permission denied]]). تكتب [[#!/bin/sh]] وتستخدم حاجات bash. متحطش التنصيص حوالين المتغيرات ([[tar -czf $DEST $SRC]]) فأول اسم فيه مسافة يبوّظ كل حاجة. وتحط باسوردات جوه السكربت وتعمله commit.`
          },
          teach: R`## الفكرة

السكربت بياخد اسم فولدر ويعمله أرشيف مضغوط باسم فيه تاريخ النهارده. هنقراه سطر سطر، وبعدين نشغّله بالطرق اللي في الـ «جرّب» ونشوف الـ shebang و [[chmod +x]] بيعملوا إيه، ونجرّب أشهر غلطتين: CRLF و [[#!/bin/sh]]. كله اتشغّل على أوبونتو 24.04 في Docker (bash 5.2).

---

## ١. السكربت سطر سطر

### [[#!/usr/bin/env bash]]

الـ **shebang** (من hash [[#]] و bang [[!]]). لـ bash هو تعليق عادي، بس لينكس بيقراه لما تشغّل الملف مباشرة ([[./deploy.sh]]): بياخد باقي السطر ويشغّله ويدّيله اسم الملف. يعني فعليًا بيتنفذ:

~~~bash
/usr/bin/env bash ./deploy.sh data
~~~

و [[env]] برنامج بيدوّر على [[bash]] في الـ PATH. لو كتبت [[#!/bin/bash]] على طول هتشتغل على أغلب لينكس، بس على أنظمة bash فيها في مكان تاني (أو نسخة أحدث متسطّبة في مكان تاني زي Homebrew على الماك) [[env]] أضمن.

### [[# بيعمل نسخة احتياطية من فولدر]]

تعليق. [[#]] في أي مكان غير أول سطر = تعليق عادي.

### [[set -euo pipefail]]

[[set]] بيغيّر سلوك bash نفسه. الـ ٣ مع بعض اسمهم «strict mode»:

| الخيار | معناه | جرّبناه |
|---|---|---|
| [[-e]] | أول أمر يفشل، السكربت يقف | تحت في خطوة ٤ |
| [[-u]] | استخدام متغير مش متعرّف = غلط | [[echo "$NAME"]] طلّع [[NAME: unbound variable]] و exit 1 |
| [[-o pipefail]] | في pipe ([[a]] بيبعت لـ [[b]])، لو [[a]] فشل الـ pipe كله يعتبر فاشل (من غيره بيتحسب نجاح [[b]] بس) | |

### [[SRC="$__{1:-.}"]]

- [[$1]]: أول argument بعد اسم السكربت ([[data]] في [[./deploy.sh data]]).
- [[$__{1:-.}]]: نفس الكلام، بس لو مفيش argument خد [[.]] (الفولدر الحالي). [[:-]] = «لو فاضي أو مش موجود، استخدم ده».
- مفيش مسافات حوالين [[=]]: [[SRC = x]] في bash معناها «شغّل أمر اسمه SRC».

### [[DEST="backup-$(date +%F).tar.gz"]]

- [[$(...)]]: command substitution: شغّل الأمر اللي جوه وحط ناتجه هنا.
- [[date +%F]]: التاريخ بالشكل [[%F]] = سنة-شهر-يوم. اتشغّل وطبع [[2026-10-07]].
- فالنتيجة [[backup-2026-10-07.tar.gz]].

### [[echo "بعمل backup لـ $SRC"]]

جوه [["..."]] الـ [[$SRC]] بتتبدّل بقيمتها. (جوه [['...']] مكانتش هتتبدّل.)

### [[tar -czf "$DEST" "$SRC"]]

[[tar]] بيعمل أرشيف: [[c]] create، و [[z]] اضغط بـ gzip، و [[f]] اسم الملف اللي جاي بعدها. والتنصيص حوالين المتغيرات عشان لو الاسم فيه مسافة يفضل argument واحد.

### [[echo "تم: $DEST ($(du -h "$DEST" | cut -f1))"]]

من جوه لبرة:

~~~text
du -h backup-2026-10-07.tar.gz            →  4.0K	backup-2026-10-07.tar.gz
du -h backup-2026-10-07.tar.gz | cut -f1  →  4.0K
~~~

- [[du]] (disk usage) و [[-h]] أرقام مقروءة. [[4.0K]] مش حجم الملف بالظبط: [[du]] بيعدّ المساحة اللي واخدها على الديسك، والديسك بيدّي مساحة بالبلوكات (4K غالبًا)، فأي ملف صغير بياخد بلوك.
- [[|]] بيبعت الناتج للأمر اللي بعده، و [[cut -f1]] بياخد أول عمود (العواميد مفصولة بـ Tab).

---

## ٢. التشغيل بالترتيب

### [[./deploy.sh data]] قبل [[chmod]]

~~~text الناتج
-rw-r--r-- 1 root root 245 Oct  7 11:53 deploy.sh
bash: line 13: ./deploy.sh: Permission denied
~~~

[[rw-r--r--]] مفيهاش [[x]]، فلينكس رفض يشغّله كبرنامج (exit code [[126]]).

### [[bash deploy.sh data]]

~~~text الناتج
بعمل backup لـ data
تم: backup-2026-10-07.tar.gz (4.0K)
~~~

اشتغل من غير [[x]]: انت شغّلت [[bash]] (اللي هو برنامج عنده [[x]])، و [[bash]] قرا الملف كنص. والـ shebang هنا مجرد تعليق.

### [[chmod +x deploy.sh]] ثم [[./deploy.sh data]]

~~~text الناتج
-rwxr-xr-x 1 root root 245 Oct  7 11:53 deploy.sh
بعمل backup لـ data
تم: backup-2026-10-07.tar.gz (4.0K)
~~~

[[+x]] ضاف [[x]] للكل، ودلوقتي الـ shebang هو اللي اختار [[bash]].

| الطريقة | محتاج [[x]]؟ | مين بيختار البرنامج |
|---|---|---|
| [[./deploy.sh]] | آه | الـ shebang |
| [[bash deploy.sh]] | لأ | انت |

### [[./deploy.sh مش-موجود]]: [[set -e]] شغّال

~~~text الناتج
بعمل backup لـ مش-موجود
tar: \331\205\330\264-\331\205\331\210\330\254\331\210\330\257: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors
~~~

- [[tar]] فشل (exit code [[2]])، فـ [[set -e]] وقّف السكربت، وسطر «تم» **مطبعش**. من غير [[-e]] كان هيقول «تم» عن أرشيف ناقص.
- الأرقام [[\331\205...]]: [[tar]] بيطبع الحروف غير الإنجليزي كأكواد bytes بالـ octal في رسايل الأخطاء. دي «مش-موجود» بـ UTF-8.

---

## ٣. CRLF: السكربت اتحفظ على ويندوز

حوّلنا نهاية كل سطر لـ [[\r\n]] (CRLF، درس LF و CRLF):

~~~text ./crlf.sh data
/usr/bin/env: 'bash\r': No such file or directory
/usr/bin/env: use -[v]S to pass options in shebang lines
~~~

الـ [[\r]] بقت جزء من اسم البرنامج، فـ [[env]] دوّر على برنامج اسمه [[bash\r]]. ومع [[#!/bin/bash]] على طول:

~~~text الناتج
bash: line 15: ./c2.sh: cannot execute: required file not found
~~~

bash 5.2 بيقول [[required file not found]]، والنسخ الأقدم كانت بتقول [[/bin/bash^M: bad interpreter]] ([[^M]] = [[\r]]). وحتى [[bash crlf.sh]] فشل بـ [[set: pipefail: invalid option name]] لأن الكلمة بقت [[pipefail\r]]. الحل: [[sed -i 's/\r$//' deploy.sh]] أو احفظه LF في VS Code.

## ٤. [[#!/bin/sh]] مش bash

~~~text الناتج
lrwxrwxrwx 1 root root 4 Mar 31  2024 /bin/sh -> dash
./s.sh: 2: [[: not found
~~~

على أوبونتو [[/bin/sh]] هو [[dash]]، shell أصغر مفيهوش [[[[ ]]]]. والأخطر إن السكربت **كمّل** وخرج بـ 0: الغلط بيعدّي من غير ما تاخد بالك.

---

## ٥. على ويندوز والماك

| | لينكس | الماك | ويندوز |
|---|---|---|---|
| التشغيل | [[./x.sh]] بعد [[chmod +x]] | نفسه (الـ shell الافتراضي zsh، بس الـ shebang بيختار) | Git Bash أو WSL، مش PowerShell ولا CMD |
| [[x]] في Git | بيتسجّل | بيتسجّل | ممكن يضيع: [[git update-index --chmod=+x x.sh]] |

## الخلاصة

- أول سطر [[#!/usr/bin/env bash]]، وتاني سطر [[set -euo pipefail]].
- [[./x.sh]] محتاج [[chmod +x]]، و [[bash x.sh]] لأ.
- [[required file not found]] أو [[bad interpreter]] أو [[$'\r': command not found]] = الملف CRLF.
- حط المتغيرات بين [["..."]] دايمًا.`,
          lines: [
            R`[[set -euo pipefail]]: وقّف عند أول غلط، ومتسامحش في متغير مش معرّف.`,
            R`[[$1]] أول argument، و [[:-.]] قيمة افتراضية [[.]] لو مفيش.`,
            R`[[$(...)]] بينفذ أمر ويحط ناتجه: [[date +%F]] بيطلّع [[2026-10-01]].`,
            R`[[echo]] يطبع، والمتغير جوه [["..."]] بيتبدّل.`,
            R`[[tar]] بيعمل أرشيف مضغوط (المستوى ٣).`,
            R`[[du -h]] حجم الملف، و [[cut -f1]] بياخد الرقم بس.`
          ],
          sol: R`الناتج الحقيقي:
[[./deploy.sh data]] ← [[bash: ./deploy.sh: Permission denied]]
[[bash deploy.sh data]] ← بيشتغل:
[[بعمل backup لـ data]]
[[تم: backup-2026-10-01.tar.gz (4.0K)]]
بعد [[chmod +x]]: [[./deploy.sh data]] بيشتغل بنفس الناتج، و [[ls -l]] بيعرض [[-rwxrwxr-x]] (الـ [[x]] ظهرت).

و [[./deploy.sh مش-موجود]]: [[tar]] بيقول [[Cannot stat: No such file or directory]] و [[set -e]] بيوقف السكربت فمبيطبعش «تم». من غير [[set -e]] كان هيكمّل ويقولك «تم» على أرشيف بايظ.

([[file deploy.sh]] بيقول [[Bourne-Again shell script, Unicode text, UTF-8 text executable]]: عرفه bash من الـ shebang.)`
        },
        {
          cmd: ".ps1 و .psm1",
          title: "ملف .ps1 بيتشغّل إزاي، وليه ويندوز بيقول running scripts is disabled؟",
          desc: R`[[.ps1]] سكربت PowerShell: الأوامر اللي بتكتبها في PowerShell في ملف. ده الـ [[.sh]] بتاع ويندوز (و PowerShell 7 شغال على لينكس والماك كمان). التفاصيل في تاب PowerShell.

الملفات:
• [[.ps1]]: سكربت عادي.
• [[.psm1]]: module، فيه دوال بتعملها [[Import-Module]] وتستخدمها من سكربتات تانية.
• [[.psd1]]: ملف بيوصف الـ module (اسمه ونسخته). شكله hashtable: [[@{ ... }]].
• [[$PROFILE]]: ملف [[.ps1]] بيتشغّل كل ما تفتح PowerShell (زي [[~/.bashrc]]).

الرموز في السكربت:
• [[#]] تعليق، و [[<# ... #>]] تعليق على كذا سطر.
• [[$]] قبل المتغيرات: [[$dest]].
• [[param(...)]] أول السكربت: الـ arguments بأسامي، وبتتبعت كده: [[.\backup.ps1 -Source data]].
• الأوامر شكلها [[Verb-Noun]]: [[Get-Item]] و [[Compress-Archive]] و [[Write-Host]].

بيتشغّل إزاي:
• من PowerShell: [[.\backup.ps1]] (لازم [[.\]] زي [[./]] في bash).
• من CMD أو اختصار: [[powershell -ExecutionPolicy Bypass -File backup.ps1]]، أو [[pwsh -File backup.ps1]] لـ PowerShell 7.
• الدبل كليك على [[.ps1]] مبيشغّلوش! بيفتحه في Notepad. ده مقصود من مايكروسوفت عشان محدش يشغّل سكربت بالغلط. (كليك يمين ثم [[Run with PowerShell]] بيشغّله.)

Execution Policy: ويندوز (على أجهزة الـ client) افتراضيًا بيمنع تشغيل أي [[.ps1]]، فأول مرة هيطلعلك:
[[running scripts is disabled on this system]]
الحل المعتاد ليوزر عادي: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]. معناها: السكربتات اللي انت كاتبها تشتغل، واللي نازلة من النت لازم تبقى موقعة (أو تفكلها الحظر بـ [[Unblock-File]] بعد ما تقراها). والـ policy دي مش حماية حقيقية، هي «حزام أمان» عشان متشغّلش حاجة بالغلط.`,
          example: R`# بيعمل نسخة احتياطية من فولدر
param(
    [string]$Source = "."
)
$dest = "backup-$(Get-Date -Format yyyy-MM-dd).zip"
Write-Host "بعمل backup لـ $Source"
Compress-Archive -Path $Source -DestinationPath $dest -Force
Get-Item $dest | Select-Object Name, Length`,
          flag: "script",
          try: R`على ويندوز: احفظ المثال في [[backup.ps1]] واعمل فولدر [[data]] فيه ملف. في PowerShell شوف الـ policy: [[Get-ExecutionPolicy]]. جرّب [[.\backup.ps1 -Source data]]، ولو اترفض نفّذ [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] وجرّب تاني. وجرّب الدبل كليك على الملف. على لينكس أو الماك: نزّل PowerShell 7 وشغّله بـ [[pwsh -File backup.ps1 -Source data]].`,
          deep: {
            why: R`ويندوز محتاج لغة سكربتات قوية بدل CMD القديم، فعمل PowerShell سنة 2006: بدل ما الأوامر بتتبادل نص زي bash، بتتبادل objects ليها خصائص ([[Name]] و [[Length]])، فبتعمل [[Select-Object]] و [[Where-Object]] على الخصائص مباشرة من غير [[grep]] و [[cut]].`,
            how: R`لما تشغّل [[.ps1]]، PowerShell بيشيك على الـ Execution Policy الأول. الملف اللي نزل من النت بيبقى عليه علامة مخفية (Zone.Identifier، اسمها Mark of the Web)، و [[RemoteSigned]] بيرفض الملفات اللي عليها العلامة دي لو مش موقعة. و [[param()]] بيعرّف الـ arguments فـ PowerShell بيعمل [[-Source]] لوحده ويكمّلها بـ Tab.`,
            when: R`أتمتة على ويندوز: تجهيز جهاز تطوير، و backup، وإدارة Active Directory و Azure، وسكربتات CI على runners ويندوز.`,
            mistakes: R`تحل مشكلة الـ policy بـ [[Set-ExecutionPolicy Unrestricted]] على الجهاز كله: [[RemoteSigned]] لـ [[CurrentUser]] كفاية. تشغّل سكربت من النت من غير ما تقراه. تكتب [[backup.ps1]] من غير [[.\]] فيقولك [[is not recognized]]. وتحفظ السكربت بعربي من غير BOM في Windows PowerShell 5.1 فالعربي يظهر ملخبط (PowerShell 7 مفيهوش المشكلة دي).`
          },
          teach: R`## الفكرة

نفس سكربت الـ backup بتاع درس [[.sh]] بس PowerShell: بياخد اسم فولدر ويعمله zip باسم فيه التاريخ ويعرض اسم الملف وحجمه. هنقراه سطر سطر، وبعدين نشوف الـ Execution Policy بتسمح بإيه وبترفض إيه. اتشغّل على ويندوز 11 في PowerShell 7.6 و Windows PowerShell 5.1، في فولدر فيه [[data\a.txt]]، ومن غير ما نغيّر الـ policy بتاعة الجهاز.

---

## ١. السكربت سطر سطر

### [[# بيعمل نسخة احتياطية من فولدر]]

تعليق. وفيه تعليق على كذا سطر: [[<# ... #>]].

### [[param( [string]$Source = "." )]]

~~~text
param(
    [string]$Source = "."
)
~~~

- [[param()]]: لازم يبقى أول كود في السكربت. بيعرّف الـ arguments **بأسامي**.
- [[[string]]]: النوع. لو حد بعت رقم يتحوّل نص.
- [[$Source]]: اسم الـ argument. بيتبعت [[-Source data]]، و PowerShell بيكمّله بـ Tab، وبيقبل اختصاره ([[-S data]]).
- [[= "."]]: القيمة الافتراضية (الفولدر الحالي) لو محدش بعته. زي [[$__{1:-.}]] في bash، بس بالاسم مش بالترتيب.

### [[$dest = "backup-$(Get-Date -Format yyyy-MM-dd).zip"]]

- [[$dest]] متغير، ومفيش مشكلة في المسافات حوالين [[=]] (عكس bash).
- [[$(...)]] جوه [["..."]] = نفّذ ده وحط ناتجه. نفس فكرة bash.
- [[Get-Date -Format yyyy-MM-dd]]: التاريخ بالشكل ده. [[MM]] كبيرة = الشهر، و [[mm]] صغيرة = الدقايق (غلطة مشهورة).

### [[Write-Host "بعمل backup لـ $Source"]]

بيطبع على الشاشة. الفرق بينه وبين إنك تكتب النص لوحده: [[Write-Host]] بيكتب للشاشة بس، مش بيطلّع object ممكن يتبعت في pipe.

### [[Compress-Archive -Path $Source -DestinationPath $dest -Force]]

الأوامر في PowerShell اسمها cmdlets وشكلها **Verb-Noun** (فعل-اسم). [[Compress-Archive]] = اضغط أرشيف:

| الـ parameter | معناه |
|---|---|
| [[-Path]] | اللي هيتضغط |
| [[-DestinationPath]] | اسم الـ zip |
| [[-Force]] | لو الملف موجود اكتب فوقه بدل ما تطلّع غلط |

### [[Get-Item $dest | Select-Object Name, Length]]

- [[Get-Item]] بيرجّع **object** بيمثّل الملف، فيه خصائص كتير (الاسم والحجم والتاريخ...).
- [[|]] بيبعت الـ object نفسه (مش نص زي bash).
- [[Select-Object Name, Length]] بياخد خاصيتين بس. [[Length]] = الحجم بالـ byte.

---

## ٢. التشغيل: [[.\backup.ps1 -Source data]]

~~~text الناتج (نفسه في 7.6 و 5.1)
بعمل backup لـ data

Name                  Length
----                  ------
backup-2026-10-07.zip    123
~~~

[[123]] byte: حجم الـ zip الحقيقي (هنا [[Get-Item]] بيقول الحجم بالظبط، مش بالبلوكات زي [[du]]).

و [[.\]] لازمة. من غيرها:

~~~text pwsh -c 'backup.ps1'
backup.ps1: The term 'backup.ps1' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

PowerShell مبيدوّرش في الفولدر الحالي لوحده، لنفس سبب الأمان اللي في لينكس.

---

## ٣. الـ Execution Policy

### [[Get-ExecutionPolicy -List]]

الـ policy ليها كذا مستوى (scope)، و PowerShell بياخد أول واحد مش [[Undefined]] من فوق لتحت. ده اللي على الجهاز ده:

~~~text pwsh 7.6
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine    RemoteSigned
~~~

~~~text powershell 5.1 (نفس الجهاز)
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    RemoteSigned
 LocalMachine       Undefined
~~~

| الـ Scope | مين بيحدده |
|---|---|
| [[MachinePolicy]] و [[UserPolicy]] | Group Policy بتاعة الشركة. بتكسب أي حاجة |
| [[Process]] | الشباك ده بس، وبيروح لما تقفله ([[-ExecutionPolicy]] في سطر التشغيل) |
| [[CurrentUser]] | انت بس |
| [[LocalMachine]] | كل اليوزرز |

لاحظ إن النسختين كل واحدة ليها إعداداتها، و [[Get-ExecutionPolicy]] من غير [[-List]] طبع [[RemoteSigned]] في الاتنين (اللي كسب).

### شكل الرفض

على جهاز ويندوز جديد كل المستويات [[Undefined]]، فالنتيجة [[Restricted]]: مفيش ولا سكربت يشتغل. جرّبنا ده من غير ما نلمس إعدادات الجهاز، بـ policy للـ process ده بس:

~~~cmd
powershell -NoProfile -ExecutionPolicy Restricted -File backup.ps1 -Source data
~~~

~~~text الناتج
File C:\Users\ali\lab\ps\backup.ps1 cannot be loaded because running scripts is disabled on this system. For
more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
    + CategoryInfo          : SecurityError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : UnauthorizedAccess
~~~

- [[-ExecutionPolicy Restricted]] (أو [[Bypass]]) في سطر التشغيل = scope [[Process]] بس.
- [[-File]]: شغّل الملف ده، واللي بعده arguments ليه.

### [[RemoteSigned]] بيرفض إيه؟

الملف اللي بيتنزّل من النت بيتعلّم عليه بـ stream مخفي اسمه [[Zone.Identifier]] (الـ Mark of the Web). عملنا نسخة [[dl.ps1]] وحطينا عليها العلامة دي بإيدنا:

~~~powershell
Set-Content dl.ps1 -Stream Zone.Identifier -Value "[ZoneTransfer]$__btr$__btnZoneId=3"
.\dl.ps1 -Source data
~~~

[[ZoneId=3]] = Internet. والنتيجة:

~~~text الناتج
.\dl.ps1: File C:\Users\ali\lab\ps\dl.ps1 cannot be loaded. The file C:\Users\ali\lab\ps\dl.ps1 is not digitally signed. You cannot run this script on the current system.
~~~

وبعد [[Unblock-File dl.ps1]] (بيمسح العلامة) اشتغل عادي. يعني [[RemoteSigned]]: سكربتاتك شغالة، واللي نازل من النت محتاج توقيع أو إنك تقراه وتعمله [[Unblock-File]].

| الـ policy | معناها |
|---|---|
| [[Restricted]] | مفيش سكربتات خالص (الافتراضي على ويندوز client) |
| [[RemoteSigned]] | المحلي يشتغل، والنازل من النت لازم يبقى موقّع |
| [[AllSigned]] | كله لازم يبقى موقّع |
| [[Bypass]] | مفيش أي فحص |

والحل المعتاد مرة واحدة ليوزر عادي (مش جربناه هنا عشان بيغيّر إعدادات الجهاز): [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]].

---

## ٤. العربي و BOM في 5.1

Windows PowerShell 5.1 بيقرا الملف اللي من غير BOM بالـ code page بتاع ويندوز (ANSI)، مش UTF-8. على الجهاز ده العربي طلع سليم، لأن ويندوز هنا متظبط على UTF-8 للنظام كله ([[[System.Text.Encoding]::Default]] طلّع [[utf-8]]، وده إعداد اختياري اسمه «Beta: Use Unicode UTF-8»). على أغلب الأجهزة الإعداد ده مقفول، والعربي هيطلع ملخبط في 5.1. احفظ السكربت **UTF-8 with BOM** لو هيشتغل على 5.1. PowerShell 7 بيقرا UTF-8 افتراضيًا.

## الخلاصة

| | bash | PowerShell |
|---|---|---|
| الـ arguments | [[$1]] و [[$__{1:-.}]] | [[param([string]$Source = ".")]] |
| تشغيل من الفولدر | [[./x.sh]] | [[.\x.ps1]] |
| الإذن | [[chmod +x]] | Execution Policy |
| الـ pipe | نص | objects |

- [[running scripts is disabled]] = الـ policy [[Restricted]]. الحل [[RemoteSigned]] لـ [[CurrentUser]]، مش [[Unrestricted]] للجهاز كله.
- الدبل كليك على [[.ps1]] بيفتحه في محرر، ده مقصود.`,
          lines: [
            R`[[param(]] بيبدأ تعريف الـ arguments.`,
            R`argument اسمه [[Source]] نوعه string وقيمته الافتراضية [[.]].`,
            R`قفل [[param]].`,
            R`[[$(...)]] جوه النص بينفذ أمر: التاريخ بالشكل ده.`,
            R`[[Write-Host]] يطبع على الشاشة.`,
            R`بيعمل zip، و [[-Force]] يكتب فوق القديم لو موجود.`,
            R`[[|]] بيبعت الـ object، و [[Select-Object]] بياخد خاصيتين منه.`
          ],
          sol: R`على ويندوز أول مرة غالبًا:
[[.\backup.ps1 : File C:\lab\backup.ps1 cannot be loaded because running scripts is disabled on this system.]]
[[Get-ExecutionPolicy]] بيقول [[Restricted]]. وبعد [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] السكربت يشتغل:
[[بعمل backup لـ data]]
وجدول فيه [[Name]] = [[backup-2026-10-01.zip]] و [[Length]] = حجمه بالـ bytes.

الدبل كليك بيفتح الملف في Notepad مش بيشغّله. وعلى لينكس [[pwsh]] بيشغّله علطول لأن [[Get-ExecutionPolicy]] هناك [[Unrestricted]] (الـ policy بتاعة ويندوز بس).`
        },
        {
          cmd: ".bat و .cmd",
          title: "ملف .bat بيعمل إيه، وليه لسه موجود جنب PowerShell؟",
          desc: R`[[.bat]] (batch) و [[.cmd]]: سكربتات CMD، أقدم طريقة أتمتة على ويندوز (من أيام DOS). نفس الأوامر اللي بتكتبها في CMD (تاب CMD). الفرق بين الامتدادين بسيط جدًا ([[.cmd]] أحدث شوية في التعامل مع [[ERRORLEVEL]])، وعمليًا نفس الحاجة.

ليه لسه موجود؟ لأنه بيشتغل على أي ويندوز من غير Execution Policy ولا أي حاجة، والدبل كليك عليه بيشغّله فورًا. عشان كده هتقابله في: [[gradlew.bat]] و [[mvnw.cmd]] (نسخة ويندوز من سكربتات البناء)، و [[npm.cmd]] و [[npx.cmd]] (لما تكتب [[npm]] في CMD انت فعليًا بتشغّل ملف [[.cmd]])، و [[start.bat]] في برامج وألعاب كتير.

الرموز:
• [[@echo off]] أول سطر: متطبعش كل أمر قبل ما تنفذه (و [[@]] بتخفي السطر ده نفسه).
• [[REM]] أو [[::]] تعليق.
• [[set NAME=value]]: متغير (من غير مسافات حوالين [[=]]، وإلا المسافة تبقى جزء من الاسم أو القيمة).
• [[%NAME%]]: قراية متغير. و [[%1]] و [[%2]]: الـ arguments. و [[%~dp0]]: فولدر السكربت نفسه.
• [[setlocal]]: المتغيرات متطلعش بره السكربت.
• [[if not exist "x" mkdir "x"]] و [[goto label]] و [[:label]].
• [[pause]] في الآخر: «Press any key to continue» عشان الشباك ميتقفلش قبل ما تقرا (لما تشغّله بدبل كليك).
• [[%ERRORLEVEL%]]: نتيجة آخر أمر (0 يعني نجح).

خد بالك:
• الدبل كليك بيشغّل علطول، فمتدوسش على [[.bat]] أو [[.cmd]] جايلك من حد مش عارفه: ده برنامج كامل يقدر يمسح ويعمل أي حاجة.
• العربي في CMD بيظهر ملخبط إلا لو كتبت [[chcp 65001]] الأول (بيغيّر الـ code page لـ UTF-8).
• خلّي نهايات السطور CRLF في الملفات دي ([[*.bat text eol=crlf]] في [[.gitattributes]]).
• للحاجات الجديدة استخدم PowerShell: أقوى ومقروء أكتر.`,
          example: R`@echo off
REM copies the text files into a backup folder
setlocal
set NAME=backup
if not exist "%NAME%" mkdir "%NAME%"
copy /Y data\*.txt "%NAME%\" >nul
echo Done: %NAME%
echo Arg 1 is: %1
pause`,
          try: R`على ويندوز: احفظ المثال في [[backup.bat]] جنب فولدر [[data]] فيه ملف [[a.txt]]. شغّله بدبل كليك، وبعدين من CMD: [[backup.bat hello]]. شيل [[@echo off]] وشغّله تاني وشوف الفرق. وجرّب تضيف [[echo أهلًا]] وشغّله، وبعدين ضيف [[chcp 65001 >nul]] تحت [[@echo off]] (واحفظ الملف UTF-8) وشغّله تاني. وبص في فولدر npm عندك: [[where npm]] هيوريك [[npm.cmd]].`,
          deep: {
            why: R`ويندوز محافظ جدًا على التوافق مع القديم، فأي سكربت batch من التسعينات لسه شغال. والأدوات اللي لازم تشتغل على أي جهاز ويندوز من غير إعدادات (زي gradlew و npm) بتستخدمه عشان مضمون.`,
            how: R`CMD بيقرا الملف سطر سطر وينفذه، وبيبدّل [[%NAME%]] بقيمته قبل ما ينفذ السطر. الدبل كليك بيفتح شباك CMD يشغّل الملف ويقفل أول ما يخلص، عشان كده [[pause]] مهمة. و [[>nul]] بيرمي الناتج (زي [[/dev/null]] في لينكس).`,
            when: R`سكربت بسيط لازم يشتغل بدبل كليك على أي ويندوز، أو لما تعدّل سكربتات موجودة. لأي حاجة جديدة فيها منطق، PowerShell.`,
            mistakes: R`[[set NAME = backup]] بمسافات فالمتغير اسمه [[NAME ]] بمسافة. تنسى التنصيص حوالين مسار فيه مسافات ([[C:\Program Files]]). تكتب العربي من غير [[chcp 65001]] فيظهر [[?????]]. وتشغّل [[.bat]] أو [[.cmd]] جايلك في إيميل.`
          },
          teach: R`## الفكرة

سكربت batch بيعمل فولدر [[backup]] وينسخ فيه ملفات [[.txt]] اللي في [[data]]، ويطبع الـ argument الأول، ويستنى زرار. اتشغّل على ويندوز 11 في [[cmd /c]]، في فولدر فيه [[data\a.txt]] (المسار اتختصر لـ [[C:\lab]])، والملف محفوظ بنهايات سطور CRLF.

---

## ١. السكربت سطر سطر

### [[@echo off]]

CMD افتراضيًا بيطبع كل سطر قبل ما ينفذه (اسمها echo). [[echo off]] بيقفل ده لباقي الملف. و [[@]] قدام أي سطر = متطبعش السطر ده بالذات، فبيخفي [[echo off]] نفسها.

### [[REM copies the text files into a backup folder]]

[[REM]] (remark) = تعليق. وفيه [[::]] كمان، بس [[REM]] أضمن جوه البلوكات اللي بين [[( )]].

### [[setlocal]]

أي متغير يتعمل بعد السطر ده بيختفي لما السكربت يخلص. من غيره، لو شغّلت السكربت من شباك CMD مفتوح، [[NAME]] يفضل موجود في الشباك ده بعدها.

### [[set NAME=backup]]

متغير اسمه [[NAME]] قيمته [[backup]]. **من غير مسافات** حوالين [[=]]: CMD بياخد كل حرف حرفيًا. جرّبنا [[set NAME = backup]] في ملف لوحده:

~~~text الناتج
[]
[ backup]
~~~

السطر الأول [[echo [%NAME%]]] طلع فاضي: مفيش متغير اسمه [[NAME]]. والتاني [[echo [%NAME %]]] طلع [[ backup]]: المتغير اسمه [[NAME ]] بمسافة، وقيمته [[ backup]] بمسافة.

### [[if not exist "%NAME%" mkdir "%NAME%"]]

- [[%NAME%]]: قراية المتغير. CMD بيبدّلها بـ [[backup]] **قبل** ما ينفذ السطر.
- [[if not exist "x"]]: لو مفيش ملف أو فولدر بالاسم ده...
- [[mkdir "x"]]: ...اعمله. التنصيص عشان لو الاسم فيه مسافة.

### [[copy /Y data\*.txt "%NAME%\" >nul]]

| الحتة | معناها |
|---|---|
| [[copy]] | انسخ |
| [[/Y]] | لو الملف موجود اكتب فوقه من غير ما تسأل [[Overwrite? (Yes/No/All)]] |
| [[data\*.txt]] | كل ملف آخره [[.txt]] في [[data]]. [[\]] فاصل المسارات في ويندوز، و [[*]] أي اسم |
| [[>nul]] | ارمي الناتج ([[1 file(s) copied.]]). [[nul]] زي [[/dev/null]] |

### [[echo Done: %NAME%]] و [[echo Arg 1 is: %1]]

[[echo]] يطبع. [[%1]] أول argument بعد اسم السكربت (لحد [[%9]])، و [[%0]] اسم السكربت نفسه، و [[%*]] كلهم.

### [[pause]]

بيطبع [[Press any key to continue . . .]] ويستنى زرار. مهمة للدبل كليك: الشباك بيتقفل أول ما السكربت يخلص، فمن غيرها مش هتلحق تقرا.

---

## ٢. التشغيل: [[backup.bat hello]]

(في التجربة ادّيناه [[< nul]] عشان [[pause]] متستناش زرار.)

~~~text الناتج
Done: backup
Arg 1 is: hello
Press any key to continue . . .
~~~

والـ exit code كان 0، وفولدر [[backup]] اتعمل وفيه [[a.txt]]. ولو بالدبل كليك، [[Arg 1 is:]] بتبقى فاضية لأن مفيش arguments.

> CMD عادةً بيدوّر على [[backup.bat]] في الفولدر الحالي الأول. لو الـ environment variable اللي اسمه [[NoDefaultCurrentDirectoryInExePath]] متظبط (زي ما كان في جلسة التجربة دي) لازم تكتب [[.\backup.bat]]، وإلا هيقول [['backup.bat' is not recognized as an internal or external command]].

## ٣. من غير [[@echo off]]

~~~text الناتج
C:\lab>REM copies the text files into a backup folder

C:\lab>setlocal

C:\lab>set NAME=backup

C:\lab>if not exist "backup" mkdir "backup"

C:\lab>copy /Y data\*.txt "backup\"  1>nul

C:\lab>echo Done: backup
Done: backup

C:\lab>echo Arg 1 is: hello
Arg 1 is: hello

C:\lab>pause
Press any key to continue . . .
~~~

كل سطر بيتطبع بعد التبديل: [[%NAME%]] بقت [[backup]] و [[%1]] بقت [[hello]]. وده مفيد للـ debugging: بتشوف CMD فهم السطر إزاي. ولاحظ [[>nul]] اتكتبت [[1>nul]]: [[1]] رقم الـ stdout (و [[2]] الـ stderr).

## ٤. [[where npm]]

~~~text الناتج
C:\Program Files\nodejs\npm
C:\Program Files\nodejs\npm.cmd
~~~

[[where]] زي [[which]] في لينكس. [[npm]] من غير امتداد ده سكربت لـ Git Bash، و [[npm.cmd]] هو اللي CMD و PowerShell بيشغّلوه لما تكتب [[npm]]: يعني [[.cmd]] حواليك كل يوم.

## ٥. العربي و [[chcp]]

CMD بيقرا الملف ويطبعه بالـ code page بتاع الشباك. على أغلب الأجهزة ده 720 أو 437 مش UTF-8، فالعربي في ملف UTF-8 بيطلع رموز غريبة. [[chcp 65001]] بيحوّل الشباك لـ UTF-8 (65001 رقم UTF-8 عند ويندوز)، و [[>nul]] بعدها بيخفي رسالة [[Active code page: 65001]]. على جهاز التجربة [[chcp]] كان أصلًا [[Active code page: 65001]] (ويندوز متظبط UTF-8 للنظام كله)، فمقدرناش نوري الشكل الملخبط هنا.

## الخلاصة

| الرمز | معناه |
|---|---|
| [[@echo off]] | متطبعش الأوامر |
| [[REM]] / [[::]] | تعليق |
| [[set X=y]] | متغير، من غير مسافات |
| [[%X%]] / [[%1]] / [[%~dp0]] | قيمة متغير / أول argument / فولدر السكربت |
| [[>nul]] | ارمي الناتج |
| [[pause]] | استنى زرار |

- الدبل كليك بيشغّل علطول من غير أي سؤال: متفتحش [[.bat]] أو [[.cmd]] جايلك من حد متعرفوش.
- الملف يتحفظ CRLF، وللحاجات الجديدة PowerShell أحسن.`,
          lines: [
            R`متطبعش الأوامر نفسها، بس ناتجها.`,
            R`المتغيرات تفضل جوه السكربت.`,
            R`متغير. من غير مسافات حوالين [[=]].`,
            R`لو الفولدر مش موجود اعمله. [[%NAME%]] بتتبدّل بـ [[backup]].`,
            R`انسخ كل [[.txt]]، و [[/Y]] من غير ما تسأل، و [[>nul]] اخفي الرسالة.`,
            R`يطبع.`,
            R`[[%1]] أول argument.`,
            R`يستنى زرار قبل ما الشباك يتقفل.`
          ],
          sol: R`الناتج:
[[Done: backup]]
[[Arg 1 is: hello]]
[[Press any key to continue . . .]]
وفولدر [[backup]] فيه [[a.txt]]. بالدبل كليك [[Arg 1 is:]] فاضية لأن مفيش arguments.

من غير [[@echo off]] كل أمر بيتطبع قبل ناتجه، زي [[C:\lab>set NAME=backup]]. والعربي من غير [[chcp 65001]] بيظهر رموز غريبة، ومعاها بيظهر سليم (في Windows Terminal بالذات). و [[where npm]] بيطبع حاجة زي [[C:\Program Files\nodejs\npm]] و [[C:\Program Files\nodejs\npm.cmd]].`
        }
      ]
    }
]);
