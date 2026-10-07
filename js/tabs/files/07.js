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
    }
]);
