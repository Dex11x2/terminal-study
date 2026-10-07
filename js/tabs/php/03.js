// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "الصفحة والفورم",
      l: 1,
      n: "قسّم الصفحة لملفات، واقرا اللي جاي من المستخدم، واطبعه من غير ثغرات، وحوّل بعد الحفظ",
      items: [
        {
          cmd: "require_once",
          title: "قسّم الموقع لملفات: header و footer و إعدادات",
          desc: R`[[require]] بيحط ملف PHP مكان السطر وينفّذه، كأنك نسخته. [[include]] نفس الحاجة، بس لو الملف مش موجود بيكمّل بـ Warning، و [[require]] بيرمي [[Error]] والصفحة بتقف. و [[_once]] بيتأكد إن الملف اتحمّل مرة واحدة بس، عشان الدوال متتعرّفش مرتين.

واكتب المسار دايمًا بـ [[__DIR__]] (فولدر الملف اللي فيه السطر). المسار النسبي بيتحسب من مكان تاني غير اللي في دماغك.`,
          example: R`<?php
require_once __DIR__ . '/../src/bootstrap.php';
$config = require __DIR__ . '/../config.php';
$title = 'الرئيسية';
require __DIR__ . '/partials/header.php';
?>
<main>
  <h1><?= e($title) ?></h1>
  <p>أهلًا في <?= e($config['app_name']) ?></p>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>`,
          try: R`اعمل [[public/partials/header.php]] فيه [[<title><?= $title ?></title>]] وشوف إنه شاف [[$title]] من الصفحة. بعدين غيّر اسم ملف في [[require]] لاسم غلط وشوف [[Fatal error: Uncaught Error]]، وجرّب نفس الغلطة بـ [[include]]: Warning والصفحة بتكمّل.`,
          flag: "script",
          deep: {
            why: "من غير تقسيم، الـ header والـ menu والاتصال بالقاعدة بيتنسخوا في كل صفحة، وتعديل لينك في الـ menu يبقى ٢٠ تعديل. ملف واحد وكل الصفحات بتعمله require.",
            how: R`[[require]] بيتنفّذ وقت التشغيل: PHP يقرا الملف ويشغّله في نفس المكان. الملف المتضمَّن بيشوف كل متغيرات المكان اللي اتعمله require فيه (عشان كده الـ header شاف [[$title]]). ولو الـ require جوه دالة، يبقى شايف متغيرات الدالة بس.

[[return]] في آخر ملف متضمَّن بترجّع قيمة: [[config.php]] فيه [[return ['app_name' => 'MyApp', ...];]] و [[$config = require ...]] بياخدها. ده أنضف شكل للإعدادات (درس الإعدادات في المستوى الثاني).

المسار النسبي زي [['includes/db.php']] بيتدوّر عليه الأول في [[include_path]]، وفيها [[.]] يعني فولدر الشغل الحالي (على السيرفر غالبًا فولدر الصفحة اللي اتفتحت أصلًا، ومن cron أو الترمنال أي فولدر انت واقف فيه)، ولو ملقاهوش بيجرب فولدر الملف اللي فيه السطر. والمسار اللي بيبدأ بـ [[./]] أو [[../]] بيتحسب من فولدر الشغل بس. فنفس السطر ممكن يجيب ملف غير اللي انت قاصده حسب اتشغّل منين، والمسارات تتلخبط. [[__DIR__]] ثابت: فولدر الملف ده بالظبط. و [[dirname(__DIR__)]] الفولدر اللي فوقه.

الشكل المعتاد: [[public/]] (أو [[public_html]]) فيه الصفحات والـ partials، و [[src/]] فيه الدوال والكلاسات، و [[config.php]] فوق الفولدر العام خالص، فمحدش يقدر يفتحه من المتصفح.`,
            when: "من أول صفحة تانية في الموقع. [[require_once]] للي فيه تعريفات (دوال، كلاسات)، و [[require]] للقوالب اللي ممكن تتكرر.",
            mistakes: R`في مشروع حقيقي صفحات الأدمن كانت بتعمل [[include "../assets/php/config.php"]] بمسار نسبي، فلما سكربت اتشغّل من cron (فولدر شغّال مختلف) مالقاش الملف. وكان [[include]] مش [[require]] للإعدادات: لو الملف مش موجود الصفحة بتكمّل من غير اتصال بالقاعدة وتطلع عشرين غلطة ورا بعض بدل غلطة واحدة واضحة. والأخطر: [[include]] لاسم ملف جاي من المستخدم (درس الأمان).`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة [[index.php]] مش بتكتب كل حاجة بنفسها: بتحمّل الدوال المشتركة من ملف، والإعدادات من ملف، والـ header والـ footer من ملفين. عشان نشغّلها عملنا المشروع ده كامل (والـ header هو الـ solCode بتاع الدرس):

~~~text شكل الفولدر
app/
  config.php              <?php return ['app_name' => 'MyApp'];
  src/
    bootstrap.php         فيه دالة e() من درس htmlspecialchars
  public/
    index.php             كود المثال
    partials/
      header.php          الـ solCode
      footer.php          </body></html>
~~~

وشغّلناه بـ [[php -S 0.0.0.0:8000 -t public]] جوه Docker على [[php:8.4-cli]]، وطلبناه بـ [[curl]].

---

## ١. [[__DIR__]]: الفولدر اللي الملف ده فيه

~~~php
require_once __DIR__ . '/../src/bootstrap.php';
~~~

نفكّه من جوه لبرة:

1. [[__DIR__]]: constant جاهز فيه مسار **فولدر الملف اللي مكتوب فيه السطر**. هنا [[index.php]] في [[/app/public]]، فـ [[__DIR__]] = [['/app/public']].
2. [[. '/../src/bootstrap.php']]: النقطة لزقت، فبقى [['/app/public/../src/bootstrap.php']]. و [[..]] يعني الفولدر اللي فوق، فده [[/app/src/bootstrap.php]].
3. [[require_once]]: حمّل الملف ده ونفّذه هنا، **مرة واحدة بس** حتى لو اتطلب تاني. لأن فيه دالة [[e()]]، ولو اتحمّل مرتين: [[Cannot redeclare function e()]].

### ليه مش مسار نسبي وخلاص؟

جربنا [[require './partials/header.php';]] بدل [[__DIR__]]. المسار اللي بيبدأ بـ [[./]] بيتحسب من **الفولدر اللي انت واقف فيه** وقت التشغيل، مش من فولدر الملف:

~~~text الناتج: php public/rel.php من /app
Warning: require(./partials/header.php): Failed to open stream: No such file or directory in /app/public/rel.php on line 5

Fatal error: Uncaught Error: Failed opening required './partials/header.php' (include_path='.:/usr/local/lib/php') in /app/public/rel.php:5
~~~

ونفس الملف من جوه [[public]] ([[cd public && php rel.php]]) اشتغل. يعني الكود بيشتغل أو يقع حسب مكان تشغيله. [[__DIR__]] ثابت في الحالتين.

---

## ٢. [[$config = require ...]]: ملف بيرجّع قيمة

~~~php
$config = require __DIR__ . '/../config.php';
~~~

[[config.php]] آخره [[return [...];]]. و [[return]] في ملف متحمّل بترجّع القيمة للي عمل [[require]]، فـ [[$config]] بقى الـ array ده، و [[$config['app_name']]] = [['MyApp']]. هنا [[require]] من غير [[_once]] لأن الملف مفيهوش تعريفات، ولأن [[require_once]] لو الملف اتحمّل قبل كده بيرجّع [[true]] مش الـ array.

---

## ٣. الـ header بيشوف متغيرات الصفحة

~~~php
$title = 'الرئيسية';
require __DIR__ . '/partials/header.php';
?>
~~~

[[require]] كأنك نسخت محتوى الملف ولزقته مكان السطر. فالـ header شايف [[$title]] اللي اتعرّف قبله. والـ header ده:

~~~php
<?php // public/partials/header.php
?><!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title><?= e($title) ?></title></head>
<body>
~~~

- السطر الأول تعليق بيقول اسم الملف، وبعده [[?>]] على طول.
- [[?><!doctype]] لازقين: لو فيه سطر جديد بينهم كان ممكن يتطبع قبل [[<!doctype]].
- [[<?= e($title) ?>]]: اطبع العنوان بعد ما [[e()]] تعمله escape.

و [[?>]] في آخر [[index.php]] بيرجّعنا HTML.

---

## ٤. HTML الصفحة والـ footer

~~~php
<main>
  <h1><?= e($title) ?></h1>
  <p>أهلًا في <?= e($config['app_name']) ?></p>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>
~~~

نفس الفكرة: قيمتين متطبوعين بـ [[e()]]، وفي الآخر الـ footer.

~~~bash
curl localhost:8000/index.php
~~~

~~~text الناتج
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>الرئيسية</title></head>
<body><main>
  <h1>الرئيسية</h1>
  <p>أهلًا في MyApp</p>
</main>
</body>
</html>
~~~

٤ ملفات، والمتصفح استلم صفحة واحدة. ([[<body><main>]] لازقين لأن ملف الـ header مفيهوش سطر جديد بعد [[<body>]].)

---

## ٥. [[require]] مقابل [[include]] لما الملف مش موجود

غيّرنا الاسم لـ [[headr.php]] (غلط):

~~~text الناتج مع require
Warning:  require(/app/public/partials/headr.php): Failed to open stream: No such file or directory in /app/public/bad.php on line 5

Fatal error:  Uncaught Error: Failed opening required '/app/public/partials/headr.php' (include_path='.:/usr/local/lib/php') in /app/public/bad.php:5
~~~

الصفحة وقفت عند السطر ده، ومفيش [[<main>]] ولا footer.

~~~text الناتج مع include
Warning:  include(/app/public/partials/headr.php): Failed to open stream: No such file or directory in /app/public/inc.php on line 5

Warning:  include(): Failed opening '/app/public/partials/headr.php' for inclusion (include_path='.:/usr/local/lib/php') in /app/public/inc.php on line 5
<main>
  <h1>الرئيسية</h1>
  ...
~~~

[[include]] نبّه مرتين وكمّل: الصفحة طلعت من غير header. (في المتصفح الرسايل دي بتظهر جوه [[<b>]] و [[<br />]] لأن [[display_errors]] شغال.) ولاحظ: الحالتين رجعوا [[200 OK]]، لأن الـ Warning اتطبع قبل الـ Fatal فالـ headers كانت اتبعتت خلاص.

---

## الخلاصة

| الأمر | الملف مش موجود | يتحمّل كام مرة |
|---|---|---|
| [[require]] | Error والصفحة تقف | كل مرة |
| [[require_once]] | Error | مرة واحدة |
| [[include]] | Warning وتكمّل | كل مرة |
| [[include_once]] | Warning | مرة واحدة |

- تعريفات (دوال، كلاسات): [[require_once]].
- قوالب (header، footer): [[require]].
- المسار دايمًا [[__DIR__ . '/...']].`,
          lines: [
            "بداية الملف.",
            "حمّل الدوال المشتركة مرة واحدة، بمسار ثابت من فولدر الملف ده.",
            "الإعدادات: الملف بيرجّع array.",
            "متغير الـ header هيشوفه.",
            "الـ header: بيتنفّذ هنا وشايف [[$title]].",
            "نهاية PHP.",
            "HTML الصفحة.",
            "[[e()]] بتعمل escape، هنشرحها بعد درس.",
            "قيمة من الإعدادات.",
            "HTML.",
            "الـ footer."
          ],
          sol: R`الصفحة بتطلّع [[<title>الرئيسية</title>]] في الـ head، رغم إن [[$title]] متعرّف في [[index.php]] مش في الـ header. [[require]] بيحط الملف مكانه كأنه مكتوب جوه الصفحة، فبيشوف نفس المتغيرات.

باسم ملف غلط في [[require]]: [[Warning: require(.../partials/headr.php): Failed to open stream: No such file or directory]] وبعدها [[Fatal error: Uncaught Error: Failed opening required '.../partials/headr.php']] والصفحة وقفت. مع [[include]]: Warning مرتين، والـ [[<main>]] والـ footer اتطبعوا عادي من غير header. عشان كده الملفات اللي الصفحة متقدرش تعيش من غيرها (الإعدادات والـ bootstrap) دايمًا [[require]].

لو الـ header اشتغل من [[index.php]] ووقع لما فتحت صفحة في فولدر تاني، يبقى انت كاتب المسار نسبي ([[require 'partials/header.php']]) من غير [[__DIR__]].`,
          solCode: R`<?php // public/partials/header.php
?><!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title><?= e($title) ?></title></head>
<body>`
        },
        {
          cmd: "$_GET / $_POST / $_SERVER",
          title: "اقرا اللي جاي مع الطلب",
          desc: R`PHP بيحط بيانات الطلب في arrays جاهزة اسمها superglobals، متاحة من أي مكان: [[$_GET]] من الرابط ([[?page=2]])، و [[$_POST]] من الفورم، و [[$_SERVER]] معلومات الطلب (الـ method والمسار و IP والـ headers)، و [[$_COOKIE]] و [[$_FILES]] و [[$_SESSION]].

كل اللي فيهم جاي من المستخدم، حتى الـ headers في [[$_SERVER]]، فهو نص أو array ومحدش ضامن شكله. اقراه بـ [[??]]، وحوّله للنوع اللي عايزه، واتحقق منه.`,
          example: R`<?php
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path   = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$page   = max(1, (int) ($_GET['page'] ?? 1));
$q      = $_GET['q'] ?? '';
$q      = is_string($q) ? trim($q) : '';
$tags   = (array) ($_GET['tags'] ?? []);
$ip     = $_SERVER['REMOTE_ADDR'] ?? '';
$agent  = $_SERVER['HTTP_USER_AGENT'] ?? '';
header('Content-Type: text/plain; charset=utf-8');
echo "$method $path page=$page q=$q ip=$ip\n";
print_r($tags);`,
          try: R`شغّله بـ [[php -S]] وافتح [[/req.php?page=3&q=php&tags[]=a&tags[]=b]]. بعدين جرّب [[?q[]=x]]: من غير سطر [[is_string]] كان [[trim]] هيرمي TypeError والصفحة تقع 500.`,
          flag: "script",
          deep: {
            why: "أي تفاعل مع المستخدم بيبدأ من هنا: رقم الصفحة، وكلمة البحث، والفورم. وأغلب ثغرات PHP سببها إن حد وثق في القيم دي من غير فحص.",
            how: R`[[$_GET]] هو الـ query string متفكك. [[$_POST]] بيتملي بس لو الـ body [[application/x-www-form-urlencoded]] أو [[multipart/form-data]] (الفورم العادي). لو الـ frontend باعت JSON، [[$_POST]] بيبقى فاضي، والـ body بتقراه من [[php://input]] (درس الـ JSON API).

[[name[]]] في الرابط أو الفورم بيعمل array. فأي حقل ممكن يوصلك array حتى لو مستني نص، ودوال زي [[trim]] و [[strlen]] بترمي TypeError في PHP 8. عشان كده [[is_string]] أو cast.

[[$_SERVER]] فيه: [[REQUEST_METHOD]]، و [[REQUEST_URI]] (المسار ومعاه الـ query)، و [[QUERY_STRING]]، و [[REMOTE_ADDR]] (IP اللي متوصل بيك)، و [[HTTPS]]، وكل header بيبدأ بـ [[HTTP_]] ([[HTTP_USER_AGENT]]، [[HTTP_HOST]]، [[HTTP_REFERER]]). الـ headers دي المستخدم بيكتبها بإيده بـ curl.

[[$_REQUEST]] بيخلط GET و POST و COOKIE مع بعض، فمتعرفش القيمة جت منين. متستخدمهوش. و [[header()]] قبل أي طباعة، هنفهم ليه في درس الفورم.`,
            when: "كل صفحة. والقاعدة: اقرا مرة واحدة في أول الصفحة، حوّل ونضّف، وبعدين اشتغل على متغيرات نضيفة.",
            mistakes: R`تبني لينك استرجاع الباسورد من [[HTTP_HOST]] فحد يبعت Host مزوّر ويستلم لينك بدومينه (host header injection): خلي الدومين في الإعدادات. وتطبع [[PHP_SELF]] في [[action]] الفورم من غير escape. وتعتمد على [[HTTP_REFERER]] كحماية: في مشروع حقيقي صفحة صور كانت بتقفل لو الـ Referer مش من الموقع، و curl بيبعت أي Referer في ثانية. وخلف Cloudflare أو proxy، [[REMOTE_ADDR]] بيبقى IP الـ proxy.`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة [[req.php]] بتقرا كل حاجة جاية مع الطلب (الطريقة، والمسار، ورقم الصفحة، وكلمة البحث، والـ tags، و IP الزائر، والمتصفح)، وبتنضّفها، وتطبعها نص عادي. شغّلناها بـ [[php -S 0.0.0.0:8000]] جوه Docker على [[php:8.4-cli]]، وطلبناها بـ [[curl]] من Git Bash، و [[curl.exe]] و [[Invoke-WebRequest]] من PowerShell. والـ IP في النواتج [[172.17.0.1]] لأن الطلب جاي من بره الـ container؛ من جهازك هتشوف [[127.0.0.1]].

---

## ١. [[$_SERVER]]: معلومات الطلب

~~~php
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
~~~

[[$_SERVER]] array جاهز PHP مالِيه، و [[REQUEST_METHOD]] فيه [[GET]] أو [[POST]]. و [[?? 'GET']] لأن الـ key ده مش موجود لما الملف يتشغّل من الترمنال.

~~~php
$path   = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
~~~

1. [[REQUEST_URI]]: الرابط بعد الدومين، بالـ query: [['/req.php?page=3&q=php']].
2. [[parse_url(..., PHP_URL_PATH)]]: بيفك الرابط ويرجّع جزء واحد. [[PHP_URL_PATH]] = المسار بس، من غير [[?...]]: [['/req.php']].

---

## ٢. [[$_GET]]: اللي في الرابط

اللي بعد [[?]] في الرابط اسمه query string: أزواج [[اسم=قيمة]] بينهم [[&]]. PHP بيفكه في [[$_GET]]:

~~~text ?page=3&q=php&tags[]=a&tags[]=b
$_GET = ['page' => '3', 'q' => 'php', 'tags' => ['a', 'b']]
~~~

لاحظ: [['3']] **نص** مش رقم. كل اللي جاي من الرابط نص (أو array).

### رقم الصفحة

~~~php
$page   = max(1, (int) ($_GET['page'] ?? 1));
~~~

من جوه لبرة:

| الخطوة | الكود | مع [[?page=3]] | مع [[?page=-5]] | مع [[?page=abc]] |
|---|---|---|---|---|
| ١ | [[$_GET['page'] ?? 1]] | [['3']] | [['-5']] | [['abc']] |
| ٢ | [[(int) (...)]] | [[3]] | [[-5]] | [[0]] |
| ٣ | [[max(1, ...)]]: الأكبر | [[3]] | [[1]] | [[1]] |

وجربنا الاتنين: [[?page=-5]] و [[?page=abc]] طلّعوا [[page=1]].

### كلمة البحث

~~~php
$q      = $_GET['q'] ?? '';
$q      = is_string($q) ? trim($q) : '';
~~~

لو حد كتب [[?q[]=x]]، الأقواس [[[]]] بتخلي [[q]] **array** مش نص. [[is_string($q)]] بيسأل «ده نص؟»: لو آه [[trim]] يشيل المسافات، ولو لأ تجاهله وخليه [['']]. وجربنا من PowerShell [[?q=%20hi%20]] ([[%20]] = مسافة) فطلعت [[q=hi]].

### الـ tags

~~~php
$tags   = (array) ($_GET['tags'] ?? []);
~~~

[[(array)]] بيحوّل لـ array: لو جه array يفضل زي ما هو، ولو جه نص واحد يبقى array فيه عنصر. جربنا [[?tags=solo]] فطلع [[[0] => solo]]. كده الكود اللي بعده يلف عليه من غير ما يسأل.

---

## ٣. IP والمتصفح

~~~php
$ip     = $_SERVER['REMOTE_ADDR'] ?? '';
$agent  = $_SERVER['HTTP_USER_AGENT'] ?? '';
~~~

- [[REMOTE_ADDR]]: IP اللي متوصل بالسيرفر فعلًا.
- [[HTTP_USER_AGENT]]: header اسمه [[User-Agent]]. أي header بيتحط في [[$_SERVER]] بـ [[HTTP_]] قبله وحروف كبيرة و [[_]] بدل [[-]]. وده المستخدم بيكتبه زي ما هو عايز: [[curl -H 'User-Agent: anything-I-want']] عدّى عادي.

---

## ٤. [[header()]] والطباعة

~~~php
header('Content-Type: text/plain; charset=utf-8');
echo "$method $path page=$page q=$q ip=$ip\n";
print_r($tags);
~~~

[[header()]] بيبعت HTTP header. هنا بنقول للمتصفح «الرد نص عادي مش HTML»، فبيعرض الأسطر زي ما هي. و [[charset=utf-8]] عشان العربي.

~~~bash
curl -i -g 'localhost:8000/req.php?page=3&q=php&tags[]=a&tags[]=b'
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: PHP/8.4.26
Content-Type: text/plain; charset=utf-8

GET /req.php page=3 q=php ip=172.17.0.1
Array
(
    [0] => a
    [1] => b
)
~~~

[[-g]] بيقول لـ curl «متفهمش [[[]]] كحاجة خاصة» (curl بيستخدمها لعمل كذا رابط). ومن PowerShell نفس الأمر بـ [[curl.exe -s -g '...']] طلّع نفس الناتج. اكتب [[curl.exe]] مش [[curl]]: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]].

---

## ٥. ليه [[is_string]]؟

بدّلنا السطر بـ [[$q = trim($q);]] بس، وطلبنا [[?q[]=x]]:

~~~text الناتج
Fatal error:  Uncaught TypeError: trim(): Argument #1 ($string) must be of type string, array given in /app/trimonly.php:6
~~~

[[trim]] عايز نص وجاله array، فالصفحة وقعت. مع [[display_errors]] شغال (زي هنا) الرد [[200]] والغلطة مطبوعة في الصفحة. ومع [[display_errors=0]] (زي السيرفر الحقيقي) الرد بقى [[HTTP/1.0 500 Internal Server Error]] وصفحة فاضية، والغلطة في لوج السيرفر بس. وفي الحالتين أي حد وقّع الصفحة بـ ٤ حروف في الرابط.

---

## ٦. POST

جربنا [[curl -d 'page=9' 'localhost:8000/req.php?page=2']]:

~~~text الناتج
POST /req.php page=2 q= ip=172.17.0.1
~~~

[[-d]] بيبعت body، فالطريقة بقت [[POST]]. و [[page=9]] راحت في [[$_POST]]، بينما الكود بيقرا [[$_GET]]، فطلع [[page=2]] من الرابط. كل واحد ليه array لوحده.

---

## الخلاصة

| المتغير | فيه إيه |
|---|---|
| [[$_GET]] | الـ query string |
| [[$_POST]] | الفورم (body) |
| [[$_SERVER['REQUEST_METHOD']]] | GET أو POST |
| [[$_SERVER['REQUEST_URI']]] | المسار والـ query |
| [[$_SERVER['REMOTE_ADDR']]] | IP المتصل |
| [[$_SERVER['HTTP_...']]] | الـ headers (المستخدم بيكتبها) |

والقاعدة: اقرا بـ [[??]]، حوّل للنوع ([[(int)]] و [[(array)]] و [[is_string]])، وبعدين استخدم.`,
          lines: [
            "بداية الملف.",
            "GET ولا POST. في الترمنال مش موجودة، فالافتراضي GET.",
            "المسار من غير الـ query ([[/req.php]]).",
            "رقم صفحة صحيح، وأقل حاجة 1.",
            "كلمة البحث، ممكن تيجي نص أو array.",
            "لو مش نص تجاهلها، ولو نص شيل المسافات.",
            "array دايمًا، حتى لو جت قيمة واحدة.",
            "IP الزائر (أو الـ proxy).",
            "المتصفح، والمستخدم يقدر يكتبه أي حاجة.",
            "الرد نص عادي مش HTML، عشان نشوف الناتج زي ما هو.",
            "اطبع النتيجة.",
            "الـ tags."
          ],
          sol: R`الرابط الأول بيطلّع:
[[GET /req.php page=3 q=php ip=127.0.0.1]] وتحته [[Array ( [0] => a [1] => b )]]. الـ [[tags[]]] المتكررة اتجمعت array لوحدها.

مع [[?q[]=x]]: [[q=]] فاضي والصفحة شغالة، لأن [[is_string]] رفض الـ array. لو السطر ده كان [[$q = trim($q);]] بس: الصفحة بتقع بـ [[Uncaught TypeError: trim(): Argument #1 ($string) must be of type string, array given]]. لو [[display_errors]] مقفول (زي سيرفر الإنتاج) الرد [[500 Internal Server Error]] والغلطة في لوج الترمنال بس، ولو شغال (زي [[php -S]] من غير php.ini) الرد 200 والغلطة مطبوعة في الصفحة نفسها. ولو شلت السطر كله من غير بديل هيطبع [[q=Array]] ومعاه [[Warning: Array to string conversion]]. في الحالتين أي حد يقدر يبوّظ صفحتك بحرفين في الـ URL.

جرّب كمان [[?page=-5]] و [[?page=abc]]: الاتنين بيطلّعوا [[page=1]] بسبب [[(int)]] و [[max(1, ...)]]. ملاحظة: في curl لازم [[-g]] عشان الأقواس [[[]]] متتفهمش غلط: [[curl -g 'localhost:8000/req.php?q[]=x']].`
        },
        {
          cmd: "htmlspecialchars",
          title: "اطبع كلام المستخدم من غير ما يبقى كود",
          desc: R`أي نص جاي من برّه (فورم، قاعدة بيانات، رابط) لما تطبعه في HTML لازم يعدّي على [[htmlspecialchars()]]. بتحوّل [[<]] لـ [[&lt;]] وعلامات التنصيص لـ entities، فلو حد كتب [[<script>]] في اسمه يظهر كنص بدل ما يشتغل. ده اسمه output escaping، وهو الحماية الأساسية من XSS.

اعمل دالة صغيرة [[e()]] واستخدمها في كل طباعة. خزّن النص زي ما هو، واعمل escape وقت الطباعة، وعلى حسب المكان: جوه HTML غير جوه رابط غير جوه JavaScript.`,
          example: R`<?php
function e(?string $s): string {
    return htmlspecialchars($s ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
$q = $_GET['q'] ?? '<script>alert(1)</script>';
?>
<p>نتايج البحث عن: <?= e($q) ?></p>
<input name="q" value="<?= e($q) ?>">
<a href="/search?q=<?= e(urlencode($q)) ?>">نفس البحث</a>
<script>const q = <?= json_encode($q, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;</script>`,
          try: R`شغّل الصفحة من غير [[e()]] في سطر [[<p>]] وافتحها: هيطلع alert. رجّع [[e()]] واعمل View Source وشوف [[&lt;script&gt;]]. وجرّب [[?q=" onfocus="alert(1)]] على الـ input.`,
          flag: "script",
          deep: {
            why: "XSS معناه إن حد يخلي موقعك يشغّل JavaScript بتاعه في متصفح زوّارك: يسرق الجلسة، أو يعمل طلبات باسمهم، أو يغيّر الصفحة. وأي مكان بتطبع فيه بيانات مستخدم من غير escape هو باب.",
            how: R`[[htmlspecialchars]] بتحوّل خمس حروف: [[&]] و [[<]] و [[>]] و [["]] و [[']]. من PHP 8.1 الافتراضي بقى [[ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401]]، يعني المفردة بتتحول كمان. قبلها المفردة مكانتش بتتحول، فـ [[value='...']] كان مكشوف. كتابة الـ flags صريحة في [[e()]] بتضمن نفس السلوك على أي نسخة.

المكان بيفرق:
جوه نص HTML أو attribute بين علامات تنصيص: [[e()]].
جوه رابط: [[urlencode]] للقيمة الأول، وبعدين [[e()]] للـ HTML.
جوه [[<script>]]: [[json_encode]] بالـ flags [[JSON_HEX_*]]، عشان [[</script>]] جوه النص ميقفلش التاج.
رابط كامل من المستخدم في [[href]]: [[e()]] مش كفاية، لأن [[javascript:alert(1)]] مفيهاش ولا حرف خطر. اتأكد إنه بيبدأ بـ [[https://]].

الـ frameworks بتعمل ده لوحدها: Blade في Laravel ([[{{ $x }}]]) و JSX في React. في PHP الخام انت المسؤول عن كل طباعة. وطبقة حماية تانية: header [[Content-Security-Policy]] (تاب الأمان).`,
            when: "كل مرة تطبع فيها قيمة مش مكتوبة بإيدك في الكود، حتى لو من القاعدة وحتى لو اتحققت منها وقت الإدخال.",
            mistakes: R`في مشروع حقيقي رسالة فيها بيانات كانت بتتحط جوه [[<script>]] بـ [[addslashes]] جوه نص JavaScript: [[</script>]] أو سطر جديد في القيمة بيكسروا الكود. الصح [[json_encode]] بالـ flags. وتعمل escape قبل الحفظ في القاعدة فتطلع [[&amp;amp;]] لما تتعمل مرة تانية. و [[strip_tags]] مش escaping: بتشيل تاجات وبتسيب attributes خطر في حالات.`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة بحث بتطبع كلمة البحث في ٤ أماكن: جوه نص، وجوه [[value]] بتاع input، وجوه رابط، وجوه [[<script>]]. وكل مكان ليه طريقة escape بتاعته. شغّلناها بـ [[php -S]] جوه Docker على [[php:8.4-cli]]، وشفنا الـ HTML اللي رجع بـ [[curl]] (ده نفس اللي هتشوفه في View Source). والـ [[alert]] نفسه محتاج متصفح، فاحنا بنوريك الـ HTML اللي المتصفح كان هينفّذه.

---

## ١. الدالة [[e()]]

~~~php
function e(?string $s): string {
    return htmlspecialchars($s ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
~~~

| الحتة | معناها |
|---|---|
| [[?string $s]] | نص أو null (قيم القاعدة ممكن تبقى null) |
| [[: string]] | بترجّع نص دايمًا |
| [[$s ?? '']] | null تبقى نص فاضي، عشان [[htmlspecialchars]] عايزة نص |
| [[htmlspecialchars(...)]] | بتحوّل الحروف الخطر لـ entities |
| [[ENT_QUOTES]] | حوّل العلامتين [["]] و [[']] الاتنين |
| [[ENT_SUBSTITUTE]] | لو فيه bytes مش UTF-8 سليمة، حط بدالها [[�]] بدل ما ترجّع نص فاضي |
| [['UTF-8']] | ترميز النص |

والخط الرأسي بين [[ENT_QUOTES]] و [[ENT_SUBSTITUTE]] اسمه bitwise OR، وبيجمع الـ flags الاتنين في رقم واحد.

والتحويلات:

| الحرف | بيبقى |
|---|---|
| [[&]] | [[&amp;]] |
| [[<]] | [[&lt;]] |
| [[>]] | [[&gt;]] |
| [["]] | [[&quot;]] |
| [[']] | [[&#039;]] |

الـ entity زي [[&lt;]] المتصفح بيعرضها حرف [[<]]، بس مبيعتبرهاش بداية tag. جربنا [[?q=Tom & Jerry's]]:

~~~text الناتج
<p>نتايج البحث عن: Tom &amp; Jerry&#039;s</p>
~~~

---

## ٢. القيمة الافتراضية

~~~php
$q = $_GET['q'] ?? '<script>alert(1)</script>';
?>
~~~

لو مفيش [[?q=]] في الرابط، بنحط هجمة XSS كقيمة تجربة. [[<script>alert(1)</script>]] لو اتطبعت زي ما هي، المتصفح هينفّذ [[alert(1)]].

---

## ٣. جوه نص HTML

~~~php
<p>نتايج البحث عن: <?= e($q) ?></p>
~~~

~~~text الناتج
<p>نتايج البحث عن: &lt;script&gt;alert(1)&lt;/script&gt;</p>
~~~

المتصفح هيعرض [[<script>alert(1)</script>]] كلام عادي. ولما شلنا [[e()]] من السطر ده بس:

~~~text الناتج من غير e()
<p>نتايج البحث عن: <script>alert(1)</script></p>
~~~

ده tag حقيقي، والمتصفح هينفّذه.

---

## ٤. جوه attribute

~~~php
<input name="q" value="<?= e($q) ?>">
~~~

هنا الخطر علامة التنصيص: لو حد بعت [[" onfocus="alert(1)]]، من غير escape الـ [["]] بتاعته هتقفل [[value]] وتبدأ attribute جديد. جربنا:

~~~text الناتج
<input name="q" value="&quot; onfocus=&quot;alert(1)">
~~~

[[&quot;]] مبتقفلش الـ attribute، فالكلام كله فضل جوه [[value]]. وعشان كده العلامات حوالين [[value="..."]] نفسها مهمة: من غيرها مسافة واحدة كانت تكفي تبدأ attribute جديد.

---

## ٥. جوه رابط

~~~php
<a href="/search?q=<?= e(urlencode($q)) ?>">نفس البحث</a>
~~~

من جوه لبرة:

1. [[urlencode($q)]]: حوّل القيمة لشكل ينفع في رابط: [[<]] تبقى [[%3C]]، والمسافة [[+]]، و [[&]] تبقى [[%26]] (من غيرها [[&]] كانت هتبدأ باراميتر جديد).
2. [[e(...)]]: وبعدين escape للـ HTML، لأن الرابط نفسه جوه attribute.

~~~text الناتج
<a href="/search?q=%3Cscript%3Ealert%281%29%3C%2Fscript%3E">نفس البحث</a>
~~~

---

## ٦. جوه [[<script>]]

~~~php
<script>const q = <?= json_encode($q, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;</script>
~~~

جوه JavaScript، [[e()]] غلط (الـ entities مبتتفكش جوه script). [[json_encode]] بيحوّل النص لـ string JavaScript سليم بعلاماته. والـ flags:

| الـ flag | بيحوّل |
|---|---|
| [[JSON_HEX_TAG]] | [[<]] و [[>]] لـ [[\u003C]] و [[\u003E]] |
| [[JSON_HEX_AMP]] | [[&]] لـ [[\u0026]] |
| [[JSON_HEX_APOS]] | [[']] لـ [[\u0027]] |
| [[JSON_HEX_QUOT]] | [["]] لـ [[\u0022]] |

~~~text الناتج
<script>const q = "\u003Cscript\u003Ealert(1)\u003C\/script\u003E";</script>
~~~

ليه؟ المتصفح بيقفل الـ script عند أول [[</script>]] حرفي، حتى لو جوه string. بعد التحويل مفيش [[<]] حرفي، و JavaScript بيقرا [[\u003C]] على إنه [[<]] عادي. و [[\/]] كمان [[json_encode]] بيعملها لوحده.

---

## الخلاصة

| المكان | الطريقة |
|---|---|
| نص HTML | [[e($x)]] |
| attribute بين [[" "]] | [[e($x)]] |
| قيمة جوه رابط | [[e(urlencode($x))]] |
| جوه [[<script>]] | [[json_encode]] بالـ flags [[JSON_HEX_*]] |
| رابط كامل من المستخدم | اتأكد إنه بيبدأ بـ [[https://]]، و [[e()]] |

والـ escape وقت **الطباعة**، مش وقت الحفظ.`,
          lines: [
            "بداية الملف.",
            "دالة escape قصيرة، بتقبل null كمان.",
            "بتحوّل الحروف الخطر، والعلامتين، والـ UTF-8 البايظ.",
            "قفلة.",
            "كلمة البحث، والافتراضي فيه script للتجربة.",
            "نهاية PHP.",
            "جوه نص HTML: e.",
            "جوه attribute: e، والعلامات المزدوجة مهمة.",
            "جوه رابط: urlencode للقيمة، و e للـ HTML.",
            "جوه JavaScript: json_encode بالـ flags."
          ],
          sol: R`من غير [[e()]] في سطر [[<p>]]: الـ alert بيطلع، والـ View Source فيه [[<p>نتايج البحث عن: <script>alert(1)</script></p>]]. المتصفح شاف tag حقيقي ونفّذه.

بعد [[e()]] الـ View Source: [[<p>نتايج البحث عن: &lt;script&gt;alert(1)&lt;/script&gt;</p>]] والكلام بيظهر نص عادي. وفي الـ script: [[const q = "\u003Cscript\u003Ealert(1)\u003C\/script\u003E";]]: [[JSON_HEX_TAG]] حوّل [[<]] و [[>]] لـ [[\u003C]] و [[\u003E]]، فمفيش [[</script>]] حرفي يقفل الـ tag بدري، و JavaScript بيقرا النص زي ما هو.

مع [[?q=" onfocus="alert(1)]] الـ input بقى [[value="&quot; onfocus=&quot;alert(1)"]]: التنصيص اتحوّل لـ [[&quot;]] فمقدرش يخرج من الـ attribute. لو كنت كاتب [[htmlspecialchars($q)]] من غير [[ENT_QUOTES]] في PHP قديم (قبل 8.1)، الـ [[']] مكانتش بتتحوّل، وأي attribute بين [[' ']] كان بيتكسر.`
        },
        {
          cmd: "POST → Redirect → GET",
          title: "استقبل فورم، اتحقق منه، وحوّل بعد النجاح",
          desc: R`الخطوات: اتأكد إن الطلب POST، اقرا كل حقل بـ [[??]] و [[trim]]، اتحقق منه (المطلوب، والطول، و [[filter_var]] للإيميل)، وجمّع الأخطاء في array. لو فيه أخطاء اعرض الفورم تاني بالقيم اللي كتبها. لو مفيش، احفظ واعمل [[header('Location: ...')]] وبعده [[exit]].

التحويل بعد النجاح اسمه PRG. من غيره لو المستخدم عمل refresh، المتصفح يبعت الفورم تاني والطلب يتسجل مرتين.`,
          example: R`<?php
$errors = [];
$old = ['name' => '', 'email' => ''];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $old['name']  = trim((string) ($_POST['name'] ?? ''));
    $old['email'] = trim((string) ($_POST['email'] ?? ''));
    if ($old['name'] === '' || mb_strlen($old['name']) > 100) $errors['name'] = 'الاسم مطلوب (لحد ١٠٠ حرف)';
    if (filter_var($old['email'], FILTER_VALIDATE_EMAIL) === false) $errors['email'] = 'الإيميل مش صحيح';
    if (!$errors) {
        // احفظ في القاعدة هنا (درس PDO)
        header('Location: /thanks.php', true, 303);
        exit;
    }
}
?>
<form method="post"><input name="name" value="<?= e($old['name']) ?>"> <?= e($errors['name'] ?? '') ?> <input name="email" value="<?= e($old['email']) ?>"> <?= e($errors['email'] ?? '') ?> <button>ابعت</button></form>`,
          try: R`حط دالة [[e()]] من درس htmlspecialchars في الملف (أو في الـ bootstrap) الأول. ابعت الفورم بإيميل غلط: الاسم اللي كتبته لازم يفضل في الخانة. بعدين ضيف [[echo 'x';]] قبل [[header]]، وشغّل السيرفر بـ [[php -d output_buffering=0 -S localhost:8000]] (لو [[php.ini]] عندك فيه [[output_buffering = 4096]]، زي php.ini-development اللي بييجي مع PHP، الـ buffer بيخبّي الغلطة)، وابعت فورم صح، واقرا [[headers already sent]]. وجرّب تبعته بـ [[curl -d "name=&email=x" localhost:8000/form.php]] عشان تتأكد إن التحقق على السيرفر مش المتصفح بس.`,
          flag: "script",
          deep: {
            why: "الفورم هو أكتر مكان بيدخل منه كلام من برّه. التحقق على السيرفر هو الحماية الوحيدة الحقيقية، لأن [[required]] في HTML وفحص JavaScript أي حد يعدّيهم بـ curl.",
            how: R`الطلب الأول GET بيعرض الفورم فاضي. المتصفح بيبعت POST فيه الحقول بأسماء [[name]]. نفس الصفحة بتستقبل، ولو فيه أخطاء بتعرض الفورم تاني بـ [[$old]] و [[$errors]].

[[filter_var($x, FILTER_VALIDATE_EMAIL)]] بترجّع الإيميل نفسه لو صح، و false لو غلط. قارن بـ [[=== false]]: مع [[FILTER_VALIDATE_INT]] القيمة ممكن تبقى 0 وهي صح.

[[header()]] بيبعت HTTP header، والـ headers لازم تتبعت قبل أي حرف من الـ body. أول ما PHP يطبع أي حاجة (echo، أو مسافة قبل [[<?php]]، أو BOM، أو سطر بعد [[?>]]) الـ headers بتتبعت، وأي [[header()]] بعدها بيدّي [[Cannot modify header information - headers already sent by (output started at file:line)]]. الرسالة بتقولك مكان أول طباعة بالظبط.

ليه بيشتغل عندك ويقع على السيرفر (أو العكس)؟ [[output_buffering]]: القيمة الافتراضية لـ PHP صفر، بس ملفات [[php.ini]] الجاهزة بتحطها 4096، فأول 4KB بتستنى في buffer وتخبّي الغلطة. متعتمدش عليها.

[[303]] بيقول للمتصفح «روح اعمل GET على الرابط ده». و [[exit]] بعد [[Location]] ضروري: [[header]] بيحط header بس، والكود اللي بعده بيكمّل يتنفّذ.

في مشروع حقيقي فورم عام (من غير login) كان فيه ٣ حمايات حلوة: حقل مخفي [[website]] البوتات بتملاه فيتعرف إنه bot (honeypot)، وحد ٣ مرات لكل session، و CSRF token (المستوى الثاني).`,
            when: "أي فورم بيغيّر بيانات: تسجيل، تواصل، طلب. فورم البحث GET عادي ومش محتاج PRG.",
            mistakes: R`تنسى [[exit]] بعد [[header('Location: login.php')]] في صفحة محمية: المتصفح بيتحوّل، بس السيرفر بعت محتوى الصفحة كله في نفس الرد، و curl بيشوفه. والتحقق في المتصفح بس. وتعرض رسالة «تم» من غير redirect فالـ refresh يكرر الطلب. وتفضّي الفورم كله بعد غلطة واحدة.`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة [[form.php]] واحدة بتعمل حاجتين: لو اتفتحت عادي (GET) بتعرض فورم فاضي، ولو الفورم اتبعت (POST) بتتحقق من الاسم والإيميل. لو فيه غلط بتعرض الفورم تاني بالقيم اللي اتكتبت ورسايل الغلط، ولو كله تمام بتحوّل لصفحة شكر. شغّلناها بـ [[php -S]] جوه Docker على [[php:8.4-cli]]، ودالة [[e()]] من درس htmlspecialchars محمّلة قبل الصفحة، وبعتنا الفورم بـ [[curl]].

---

## ١. التجهيز

~~~php
$errors = [];
$old = ['name' => '', 'email' => ''];
~~~

- [[$errors]]: الأخطاء هتتجمع هنا، والـ key اسم الحقل: [[['email' => 'الإيميل مش صحيح']]].
- [[$old]]: القيم اللي المستخدم كتبها، عشان نرجّعها في الخانات. فاضية في الأول.

---

## ٢. اتبعت ولا لأ؟

~~~php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
~~~

أول فتحة للصفحة GET، فالـ if ده بيتساب، والفورم بيظهر فاضي:

~~~text الناتج: curl localhost:8000/form.php
<form method="post"><input name="name" value="">  <input name="email" value="">  <button>ابعت</button></form>
~~~

ولما تدوس «ابعت» المتصفح بيبعت POST لنفس الصفحة، لأن [[<form method="post">]] من غير [[action]] بيبعت لنفس الرابط.

---

## ٣. اقرا الحقول

~~~php
    $old['name']  = trim((string) ($_POST['name'] ?? ''));
    $old['email'] = trim((string) ($_POST['email'] ?? ''));
~~~

من جوه لبرة:

| الخطوة | الكود | ليه |
|---|---|---|
| ١ | [[$_POST['name'] ?? '']] | الحقل ممكن ميتبعتش أصلًا |
| ٢ | [[(string) (...)]] | لو حد بعت [[name[]=x]] يبقى array، والتحويل بيخليه النص [[Array]] بدل ما [[trim]] يرمي TypeError ويوقّع الصفحة |
| ٣ | [[trim(...)]] | شيل المسافات من الأول والآخر، فـ [['   ']] تبقى [['']] |

---

## ٤. التحقق

~~~php
    if ($old['name'] === '' || mb_strlen($old['name']) > 100) $errors['name'] = 'الاسم مطلوب (لحد ١٠٠ حرف)';
~~~

[[||]] معناها «أو»: لو الاسم فاضي **أو** أطول من ١٠٠ حرف، سجّل غلط. و [[mb_strlen]] عشان يعد حروف مش bytes (العربي).

~~~php
    if (filter_var($old['email'], FILTER_VALIDATE_EMAIL) === false) $errors['email'] = 'الإيميل مش صحيح';
~~~

[[filter_var(القيمة, نوع الفحص)]]: مع [[FILTER_VALIDATE_EMAIL]] بترجّع الإيميل نفسه لو شكله صح، و [[false]] لو لأ. والمقارنة [[=== false]] بالظبط عشان مع فحوصات تانية القيمة الصح ممكن تبقى [[0]].

بعتنا اسم فاضي وإيميل [[x]]:

~~~bash
curl -d "name=&email=x" localhost:8000/form.php
~~~

~~~text الناتج
<form method="post"><input name="name" value=""> الاسم مطلوب (لحد ١٠٠ حرف) <input name="email" value="x"> الإيميل مش صحيح <button>ابعت</button></form>
~~~

[[-d]] بيبعت POST بالـ body ده. ومن PowerShell نفس الأمر بـ [[curl.exe -d "name=&email=x" http://localhost:8000/form.php]] طلّع نفس الفورم بالرسالتين. ولاحظ إن curl ميعرفش حاجة عن [[required]] أو JavaScript، فالفحص اللي على السيرفر هو الوحيد اللي مينفعش يتعدّى.

---

## ٥. مفيش أخطاء؟ حوّل

~~~php
    if (!$errors) {
        // احفظ في القاعدة هنا (درس PDO)
        header('Location: /thanks.php', true, 303);
        exit;
    }
}
~~~

- [[!$errors]]: [[!]] يعني «مش»، والـ array الفاضي falsy، فالشرط true لو مفيش ولا غلط.
- [[header('Location: /thanks.php', true, 303)]]: header اسمه [[Location]] بيقول للمتصفح «روح هنا». [[true]] يعني لو فيه header بنفس الاسم استبدله، و [[303]] كود الرد: See Other، يعني «روح اعمل **GET** على الرابط ده».
- [[exit]]: وقّف تنفيذ الملف هنا. [[header()]] بيجهّز header بس، ومن غير [[exit]] الكود كان هيكمّل ويطبع الفورم كمان.

~~~text الناتج مع اسم وإيميل صح (curl -i)
HTTP/1.1 303 See Other
X-Powered-By: PHP/8.4.26
Location: /thanks.php
Content-type: text/html; charset=UTF-8
~~~

والـ body فاضي. المتصفح بيروح لـ [[/thanks.php]]، ولو عمل refresh هناك بيعيد الـ GET بس، مش الفورم. ده **POST → Redirect → GET** (PRG).

---

## ٦. الفورم

~~~php
<form method="post"><input name="name" value="<?= e($old['name']) ?>"> <?= e($errors['name'] ?? '') ?> ...
~~~

- [[name="name"]]: اسم الحقل، وهو اللي بيبقى key في [[$_POST]].
- [[value="<?= e($old['name']) ?>"]]: رجّع اللي اتكتب، بـ escape لأنه جاي من المستخدم.
- [[e($errors['name'] ?? '')]]: رسالة الغلط لو موجودة، وإلا ولا حاجة.

بإيميل غلط بس:

~~~text الناتج
<form method="post"><input name="name" value="سارة">  <input name="email" value="x"> الإيميل مش صحيح <button>ابعت</button></form>
~~~

الاسم فضل في الخانة، فالمستخدم بيصلّح الإيميل بس.

---

## ٧. [[headers already sent]]

الـ headers لازم تتبعت **قبل** أي حرف من الصفحة. حطينا [[echo 'x';]] قبل [[header()]] وبعتنا فورم صح:

~~~text الناتج
HTTP/1.1 200 OK
...
x
Warning:  Cannot modify header information - headers already sent by (output started at /app/formx.php:11) in /app/formx.php on line 12
~~~

أول ما [[x]] اتطبعت، PHP بعت الـ headers ([[200]]) معاها، فـ [[Location]] اتأخر ومتبعتش. والرسالة بتقولك فين أول طباعة: [[output started at ...:11]].

بس الغلطة دي ممكن **تستخبى**: ملفات [[php.ini-development]] و [[php.ini-production]] اللي بتيجي مع PHP فيهم [[output_buffering = 4096]]، يعني أول 4KB بتستنى في buffer. جربنا بـ [[-d output_buffering=4096]]: الرد [[303]] والتحويل اشتغل والـ [[x]] اتبعت في الـ body من غير أي Warning. فالكود يشتغل عندك ويقع على سيرفر إعداداته مختلفة.

---

> جربنا كمان [[name[]=x]]: الاسم بقى النص [[Array]] وعدّى التحقق، ومعاه [[Warning: Array to string conversion]]، والـ Warning ده نفسه اتطبع قبل [[header()]] فبوّظ التحويل. لو الحقل لازم يبقى نص، الأدق [[is_string]] زي درس [[]].

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اتبعت؟ | [[$_SERVER['REQUEST_METHOD'] === 'POST']] |
| اقرا | [[trim((string) ($_POST['x'] ?? ''))]] |
| اتحقق | [[=== '']] و [[mb_strlen]] و [[filter_var]] |
| غلط | اعرض الفورم بـ [[$old]] و [[$errors]] |
| نجح | [[header('Location: ...', true, 303); exit;]] |

ومفيش ولا حرف يتطبع قبل [[header()]].`,
          lines: [
            "بداية الملف.",
            "الأخطاء، مفتاحها اسم الحقل.",
            "القيم القديمة عشان نرجّعها في الفورم.",
            "بس لو الفورم اتبعت.",
            "الاسم: نص دايمًا ومن غير مسافات.",
            "الإيميل بنفس الطريقة.",
            "مطلوب ومش أطول من ١٠٠ حرف (mb_ عشان العربي).",
            "شكل إيميل صحيح.",
            "مفيش أخطاء؟",
            "حوّل بـ 303: المتصفح هيعمل GET على صفحة الشكر.",
            "وقّف هنا، متكمّلش الصفحة.",
            "قفلة.",
            "قفلة.",
            "نهاية PHP.",
            "الفورم: الاسم والإيميل بالقيم القديمة ورسايل الغلط (كله بـ e)."
          ],
          sol: R`بإيميل غلط: الصفحة بترجع 200 والخانة فيها [[value="سارة"]] وجنبها [[الإيميل مش صحيح]]. بفورم صح: [[303 See Other]] و [[Location: /thanks.php]] (المتصفح هيوديك لـ thanks.php، ولو مش عامله هتاخد 404 وده طبيعي). والـ refresh بعدها مبيبعتش الفورم تاني.

[[echo 'x';]] قبل [[header]]: لو [[php.ini]] عندك فيه [[output_buffering=4096]] (القيمة اللي في php.ini-development و php.ini-production) مش هتشوف الغلطة: الـ x بتستنى في buffer والتحويل بيشتغل عادي. ومن غير php.ini القيمة 0 والغلطة بتظهر على طول. شغّل [[php -d output_buffering=0 -S localhost:8000]] وهتلاقي الصفحة طبعت x بس بـ 200 من غير تحويل، وفي الصفحة نفسها (أو في لوج الترمنال لو [[display_errors]] مقفول) [[Warning: Cannot modify header information - headers already sent by (output started at .../form.php:11)]]، والرقم في الآخر هو سطر الـ [[echo]] في ملفك.

[[curl -d "name=&email=x" localhost:8000/form.php]] بيرجّع الفورم وفيه الرسالتين: [[الاسم مطلوب (لحد ١٠٠ حرف)]] و [[الإيميل مش صحيح]]. ده اللي بيثبت إن التحقق على السيرفر، لأن curl مبيعرفش حاجة عن [[required]] في HTML.`
        }
      ]
    }
]);
