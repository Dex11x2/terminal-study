// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "إجابات قصيرة تقولها بصوت عالي، وبعدها الأسئلة اللي غالبًا هتيجي وراها",
      items: [
        {
          cmd: "strict comparison",
          title: "إيه الفرق بين == و === في PHP؟ (== vs ===)",
          desc: R`[[===]] بيقارن القيمة والنوع من غير أي تحويل، و [[==]] بيحوّل الطرفين لنوع مشترك الأول (type juggling). PHP 8 صلّح أسوأ حالة: [[0 == 'abc']] بقت false بعد ما كانت true.

بس لسه [['1' == '01']] و [['10' == '1e1']] و [[null == false]] كلهم true. والأخطر [['0e123' == '0e456']] true، لأن الاتنين أرقام بصيغة علمية قيمتها صفر، ودي ثغرة معروفة لما حد يقارن hashes بـ [[==]]. عشان كده بستخدم [[===]] دايمًا، و [[in_array]] بالـ strict، و [[hash_equals]] للأسرار، و [[match]] بدل [[switch]] لأن [[switch]] بيقارن بـ [[==]].`,
          example: R`<?php
var_dump(0 == 'abc');
var_dump('1' == '01', '10' == '1e1', 100 == '1e2');
var_dump(null == false, [] == false, '0' == false);
var_dump('0e123' == '0e456', '0e123' === '0e456');
var_dump(in_array('1e1', ['10']), in_array('1e1', ['10'], true));`,
          try: R`خمّن ناتج كل سطر قبل ما تشغّل، وبعدين شغّل وقارن. اللي غلطت فيه هو اللي هيتسأل عنه.`,
          flag: "script",
          deep: {
            why: "السؤال بيكشف إذا كنت فاهم إن PHP بيحوّل الأنواع من وراك، وإذا كنت عارف إن ده مصدر bugs وثغرات حقيقية، مش بس حفظ «=== أدق».",
            how: R`قواعد [[==]] باختصار: نصين رقميين بيتقارنوا كأرقام ([['1e3' == '1000']] true). رقم ونص مش رقمي: في PHP 8 الرقم بيتحوّل لنص ويتقارنوا كنصوص (قبل 8 كان النص بيتحوّل لرقم، فـ [['abc']] يبقى 0). و null و false و 0 و [[""]] و [[[]]] بيتساووا مع بعض في حالات كتير.

الـ arrays: [[==]] نفس الـ keys والقيم، و [[===]] كمان نفس الترتيب ونفس الأنواع. الـ objects: [[==]] نفس الكلاس ونفس قيم الـ properties، و [[===]] نفس الـ object بالظبط (نفس الـ instance).

الناتج بالترتيب: false، ثم true true true، ثم true true true، ثم true false، ثم true false.`,
            when: "أسئلة بعدها: «إيه اللي اتغير في PHP 8؟» «switch بيقارن بإيه؟» «in_array و array_search؟» «إمتى تستخدم == عن قصد؟» (نادرًا: مقارنة objects بالقيم).",
            mistakes: R`«=== بيقارن مكان الذاكرة» (ده للـ objects بس). و«PHP 8 صلّح كل مشاكل ==» (لأ، صلّح النص-رقم بس). ونسيان إن [[switch]] و [[in_array]] من غير strict بيستخدموا [[==]].`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

٥ سطور [[var_dump]]، كل سطر بيقارن قيم بـ [[==]] (وأحيانًا [[===]]) ويطبع النتيجة. الهدف تشوف بعينك إمتى [[==]] بيقول true لحاجات شكلها مختلف.

كل الناتج اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]]).

---

## ١. [[var_dump]]

بيطبع القيمة ونوعها: [[bool(true)]] أو [[bool(false)]]. ولو اديته كذا قيمة مفصولين بـ [[,]] بيطبع كل واحدة في سطر.

## ٢. السطور واحد واحد

~~~php
var_dump(0 == 'abc');
~~~

~~~text الناتج
bool(false)
~~~

رقم ونص **مش رقمي**: من PHP 8 الرقم بيتحوّل نص ([['0']]) ويتقارنوا كنصوص، و [['0']] غير [['abc']]. في PHP 7 كان العكس: [['abc']] بيتحوّل رقم = 0، فكانت true.

~~~php
var_dump('1' == '01', '10' == '1e1', 100 == '1e2');
~~~

~~~text الناتج
bool(true)
bool(true)
bool(true)
~~~

نصين **رقميين** بيتقارنوا كأرقام: [['01']] = 1، و [['1e1']] صيغة علمية = 1 × 10 = 10، و [['1e2']] = 100.

~~~php
var_dump(null == false, [] == false, '0' == false);
~~~

~~~text الناتج
bool(true)
bool(true)
bool(true)
~~~

أي مقارنة مع [[bool]] بتحوّل الطرف التاني لـ bool. و null و array فاضية و [['0']] كلهم falsy.

~~~php
var_dump('0e123' == '0e456', '0e123' === '0e456');
~~~

~~~text الناتج
bool(true)
bool(false)
~~~

[['0e123']] = 0 × 10^123 = 0، و [['0e456']] = 0 برضه، فـ [[==]] بيقول متساويين. و [[===]] بيقارن النصين حرف حرف من غير تحويل.

~~~php
var_dump(in_array('1e1', ['10']), in_array('1e1', ['10'], true));
~~~

~~~text الناتج
bool(true)
bool(false)
~~~

[[in_array(قيمة, array)]] بيستخدم [[==]] افتراضيًا، والباراميتر التالت [[true]] = strict يعني [[===]].

---

## ٣. ليه [['0e...']] ثغرة؟ (اتجرّب)

~~~php
var_dump(md5('240610708'), md5('QNKCDZO'), md5('240610708') == md5('QNKCDZO'));
var_dump(hash_equals(md5('240610708'), md5('QNKCDZO')));
~~~

~~~text الناتج
string(32) "0e462097431906509019562988736854"
string(32) "0e830400451993494058024219903391"
bool(true)
bool(false)
~~~

كلمتين مختلفين خالص، والـ md5 بتاعهم بالصدفة [[0e]] وبعدها أرقام بس. [[==]] شافهم الاتنين صفر. لو بتقارن hash باسورد أو token بـ [[==]]، حد ممكن يدخل بكلمة غلط. [[hash_equals]] بيقارن نصوص بالظبط (وبوقت ثابت).

## ٤. [[switch]] مقابل [[match]] (اتجرّب)

~~~php
switch ('1e1') { case '10': echo "switch matched 10\n"; break; default: echo "no\n"; }
echo match ('1e1') { '10' => "match 10", default => "match default" }, "\n";
~~~

~~~text الناتج
switch matched 10
match default
~~~

[[switch]] بيقارن بـ [[==]] فـ [['1e1']] دخل في [['10']]. و [[match]] بيقارن بـ [[===]].

## ٥. حالات تانية اتجربت

| المقارنة | PHP 8.4 |
|---|---|
| [[0 == '']] | false (كانت true في 7) |
| [['1e3' == '1000']] | true |
| [[null == 0]] | true |
| [['' == null]] | true |

---

## الخلاصة

| الأداة | بتقارن بـ |
|---|---|
| [[==]] | بعد تحويل الأنواع |
| [[===]] | القيمة والنوع من غير تحويل |
| [[in_array($x, $arr)]] | [[==]]، و [[in_array($x, $arr, true)]] = [[===]] |
| [[switch]] | [[==]] |
| [[match]] | [[===]] |
| [[hash_equals]] | نص بنص، للأسرار |

الإجابة في سطر: «[[===]] دايمًا، و strict في [[in_array]]، و [[match]] بدل [[switch]]، و [[hash_equals]] للـ hashes».`,
          lines: [
            "بداية كود PHP.",
            "false في PHP 8 (كانت true في 7).",
            "true و true و true: نصوص رقمية بتتقارن كأرقام.",
            "true و true و true.",
            "true (الاتنين صفر علمي)، و false مع ===.",
            "true من غير strict، و false معاه."
          ],
          sol: R`الناتج بالترتيب: [[false]]، و [[true true true]]، و [[true true true]]، و [[true false]]، و [[true false]].

[[0 == 'abc']] false من PHP 8 (كانت true في 7، ودي أشهر سؤال). [['1' == '01']] و [['10' == '1e1']] و [[100 == '1e2']] true لأن النصين الرقميين بيتقارنوا كأرقام. [[null == false]] و [[[] == false]] و [['0' == false]] true لأنهم كلهم falsy. [['0e123' == '0e456']] true لأن الاتنين 0 × 10 أس حاجة = 0، ودي ثغرة حقيقية لما تقارن hashes بـ [[==]] (ده سبب [[hash_equals]]). و [[in_array]] من غير [[true]] بيستخدم [[==]] فلقى [['1e1']] في [[['10']]].

لو خمّنت [[0 == 'abc']] true، انت فاكر PHP 7. الإجابة المختصرة في الانترفيو: [[===]] دايمًا، و [[in_array(..., true)]] و [[match]] بدل [[switch]].`
        },
        {
          cmd: "Warning مقابل Error",
          title: "إيه الفرق بين include و require؟ (include vs require)",
          desc: R`الاتنين بيحطوا ملف PHP مكانهم وينفّذوه. الفرق وقت الفشل: [[include]] لو الملف مش موجود بيطلع Warning ويكمّل، و [[require]] بيرمي [[Error]] (في PHP 8، وقبلها كان fatal compile error) والصفحة بتقف لو محدش مسكه.

فأي ملف الصفحة متنفعش من غيره (إعدادات، اتصال بالقاعدة، دوال أساسية) بيبقى [[require]]. و [[_once]] بيتأكد إنه اتحمّل مرة واحدة في الطلب، عشان الدوال والكلاسات متتعرّفش مرتين. وفي مشروع حديث أغلب الـ requires بتختفي، لأن Composer autoload بيحمّل الكلاسات لوحده، ويفضل require واحد لـ [[vendor/autoload.php]].`,
          example: R`<?php
$x = include 'missing.php';
var_dump($x);
echo "كمّل\n";
require 'missing.php';
echo "مش هيتطبع\n";`,
          try: R`شغّله واقرا الرسايل: Warning مرتين وبعدين [[bool(false)]] و «كمّل»، وبعدين [[Fatal error: Uncaught Error: Failed opening required]]. بعدين لف الـ require في [[try { } catch (Error $e) { }]] وشوف إنه بيتمسك.`,
          flag: "script",
          deep: {
            why: "سؤال بسيط بيتسأل عشان يفتح كلام عن تنظيم المشروع، والـ autoloading، والأمان (file inclusion).",
            how: R`الاتنين language constructs مش دوال، فالأقواس اختيارية. [[include]] بيرجّع قيمة: 1 افتراضيًا، أو اللي الملف عمله [[return]] (زي ملف الإعدادات)، أو false لو فشل.

[[_once]] بيحفظ المسار الكامل للملف بعد ما يتحلّ، فلو نفس الملف اتطلب بمسارين مختلفين بيتعرف إنه واحد. التكلفة صغيرة جدًا خصوصًا مع OPcache.

المسار النسبي بيتدوّر عليه في [[include_path]] وفولدر السكربت اللي اتفتح، فالأمان إنك تكتب [[__DIR__]]. والخطر الأمني: [[include $_GET['page']]] = local file inclusion.`,
            when: "أسئلة بعدها: «include_once إمتى؟» «ليه __DIR__؟» «autoloading بيشتغل إزاي؟» «LFI يعني إيه وتمنعه إزاي؟»",
            mistakes: R`«require أسرع» (مفيش فرق يذكر). و«include للملفات المهمة عشان الموقع ميقعش» (يكمّل من غير اتصال بالقاعدة ويطلع أخطاء أسوأ). وتقول إن [[require]] في PHP 8 fatal مبيتمسكش: بقى [[Error]] وممكن يتمسك.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

بيحاول يحمّل ملف مش موجود مرتين: مرة بـ [[include]] ومرة بـ [[require]]، عشان تشوف الفرق وقت الفشل: واحد بيكمّل والتاني بيوقف الصفحة.

كل الناتج اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]]).

---

## ١. [[include]] لملف مش موجود

~~~php
$x = include 'missing.php';
var_dump($x);
echo "كمّل\n";
~~~

- [[include]] مش دالة، ده language construct، فمش محتاج أقواس. وبيرجّع قيمة، فينفع [[$x = include ...]].
- [['missing.php']] مسار نسبي، فـ PHP بيدوّر عليه في [[include_path]] وفي فولدر السكربت.

~~~text الناتج
Warning: include(missing.php): Failed to open stream: No such file or directory in /iv/2.php on line 2

Warning: include(): Failed opening 'missing.php' for inclusion (include_path='.:/usr/local/lib/php') in /iv/2.php on line 2
bool(false)
كمّل
~~~

Warning مرتين (فتح الملف فشل، وبعدين التحميل فشل)، و [[include]] رجّع [[false]]، والكود **كمّل**. و [[include_path]] هنا [['.:/usr/local/lib/php']]: النقطة = الفولدر الحالي، و [[:]] بتفصل بين الأماكن. (المسار التاني بيختلف حسب طريقة تسطيب PHP.)

## ٢. [[require]] لملف مش موجود

~~~php
require 'missing.php';
echo "مش هيتطبع\n";
~~~

~~~text الناتج
Warning: require(missing.php): Failed to open stream: No such file or directory in /iv/2.php on line 5

Fatal error: Uncaught Error: Failed opening required 'missing.php' (include_path='.:/usr/local/lib/php') in /iv/2.php:5
Stack trace:
#0 {main}
  thrown in /iv/2.php on line 5
~~~

[[Uncaught Error]]: اترمى object من نوع [[Error]] ومحدش مسكه، فالسكربت وقف والـ exit code كان 255. والسطر اللي بعده متنفّذش.

## ٣. الـ solCode: امسكه

~~~php
try {
    require 'missing.php';
} catch (Error $e) {
    echo 'اتمسك: ', get_class($e), ' - ', $e->getMessage(), "\n";
}
echo "كمّل\n";
~~~

- [[try { } catch (Error $e) { }]]: لو اللي جوه [[try]] رمى [[Error]]، ادخل [[catch]] بدل ما السكربت يقع.
- [[get_class($e)]] اسم الكلاس، و [[getMessage()]] الرسالة. و [[echo]] بياخد كذا قيمة مفصولين بـ [[,]].

~~~text الناتج
Warning: require(missing.php): Failed to open stream: No such file or directory in /iv/2b.php on line 3
اتمسك: Error - Failed opening required 'missing.php' (include_path='.:/usr/local/lib/php')
كمّل
~~~

الـ Warning لسه طالع لأنه بيحصل قبل الـ Error، بس السكربت كمّل.

## ٤. حاجتين تانيين اتجربوا

ملف بيعمل [[return]]:

~~~php
file_put_contents('/tmp/cfg.php', "<?php return ['debug' => true];");
var_dump(include '/tmp/cfg.php');
~~~

~~~text الناتج
array(1) {
  ["debug"]=>
  bool(true)
}
~~~

ده أسلوب ملفات الإعدادات (زي [[config/*.php]] في Laravel): الملف بيرجّع array و [[include]] بيرجّعها.

و [[include_once]] لنفس الملف مرتين: التانية رجّعت [[bool(true)]] من غير ما تحمّله تاني، فالدالة اللي جواه متعرّفتش مرتين (اللي كانت هتبقى [[Cannot redeclare function]]).

---

## الخلاصة

| | الملف مش موجود | بيرجّع |
|---|---|---|
| [[include]] | Warning ويكمّل | [[false]] |
| [[require]] | Warning ثم [[Error]] (يتمسك بـ try/catch) | |
| [[include_once]] / [[require_once]] | نفس الكلام، ومرة واحدة بس في الطلب | [[true]] لو اتحمّل قبل كده |

[[require]] للي الصفحة متعيشش من غيره، و [[__DIR__ . '/...']] بدل المسار النسبي.`,
          lines: [
            "بداية الملف.",
            "include لملف مش موجود: Warning.",
            "bool(false).",
            "بيكمّل عادي.",
            "require لملف مش موجود: Error والصفحة وقفت.",
            "مبيتنفّذش."
          ],
          sol: R`[[include]]: [[Warning: include(missing.php): Failed to open stream: No such file or directory]] و [[Warning: include(): Failed opening 'missing.php' for inclusion]]، وبعدين [[bool(false)]] (ده اللي [[include]] رجّعه) و [[كمّل]]. بعدين [[require]]: Warning نفس الأولى، وبعدها [[Fatal error: Uncaught Error: Failed opening required 'missing.php']] و [[مش هيتطبع]] مش هيظهر.

في [[try { require 'missing.php'; } catch (Error $e) { }]]: بيطبع [[اتمسك: Error - Failed opening required 'missing.php' (include_path='.:/usr/share/php')]] والكود بيكمّل. من PHP 8 الـ [[require]] الفاشل بيرمي [[Error]]، مش fatal ميتمسكش زي زمان. الـ Warning الأول بيطلع برضه لأنه قبل الـ Error.

الإجابة المختصرة: [[include]] للحاجات الاختيارية (Warning ويكمّل)، و [[require]] للي الصفحة متعيشش من غيره، و [[_once]] عشان الملف ميتحمّلش مرتين (دوال وكلاسات).`,
          solCode: R`<?php
try {
    require 'missing.php';
} catch (Error $e) {
    echo 'اتمسك: ', get_class($e), ' - ', $e->getMessage(), "\n";
}
echo "كمّل\n";`
        },
        {
          cmd: "السيرفر مقابل المتصفح",
          title: "إيه الفرق بين الـ sessions والـ cookies؟ (sessions vs cookies)",
          desc: R`الكوكي بيانات صغيرة (حوالي 4KB) متخزنة في المتصفح وبتتبعت مع كل طلب، والمستخدم يقدر يقراها ويعدّلها. الـ session بيانات متخزنة على السيرفر، والمتصفح معاه بس كوكي فيها id عشوائي بيشاور عليها.

فأي حاجة المستخدم ميقدرش يتحكم فيها (مين داخل، صلاحياته) مكانها الـ session، والكوكي لتفضيلات زي اللغة، أو لـ token «افتكرني» اللي الـ hash بتاعه في القاعدة. والـ session نفسها معتمدة على كوكي، فإعداداتها ([[HttpOnly]] و [[Secure]] و [[SameSite]]) هي اللي بتحميها.`,
          example: R`<?php
session_start();
setcookie('lang', 'ar', ['expires' => time() + 86400 * 30, 'path' => '/', 'samesite' => 'Lax']);
echo $_COOKIE['lang'] ?? 'لسه (الكوكي بتوصل من الطلب الجاي)';
$_SESSION['user_id'] = 42;
echo session_id();`,
          try: R`افتح الصفحة مرتين وشوف [[$_COOKIE]] فاضي أول مرة. وفي DevTools غيّر قيمة [[lang]] بإيدك: اتغيرت. وحاول تغيّر [[user_id]]: مش موجود في المتصفح أصلًا.`,
          flag: "script",
          deep: {
            why: "السؤال بيختبر فهمك لـ state في HTTP، وإيه اللي تثق فيه وإيه لأ.",
            how: R`[[setcookie]] بيبعت header [[Set-Cookie]]، والمتصفح بيرجّعها من الطلب اللي بعده، عشان كده [[$_COOKIE]] فاضي في نفس الطلب.

الـ session في PHP افتراضيًا ملفات على السيرفر. لو عندك أكتر من سيرفر ورا load balancer، الطلب ممكن يروح لسيرفر معندوش الملف، فالجلسات لازم تبقى في مخزن مشترك (Redis أو القاعدة) أو sticky sessions.

البديل: tokens زي JWT، الـ state كلها جوه token موقّع مع العميل. مفيش مخزن على السيرفر، بس صعب تلغيه قبل ما يخلص (logout، حظر). للمواقع العادية الجلسة أبسط وأأمن.

عمر الكوكي: من غير [[expires]] بتموت لما المتصفح يقفل. عمر الجلسة على السيرفر: [[gc_maxlifetime]].`,
            when: "أسئلة بعدها: «لو عندك ٣ سيرفرات؟» «JWT ولا session؟» «HttpOnly بيحمي من إيه؟» «إزاي تمنع session hijacking و fixation؟»",
            mistakes: R`«الـ session مش بتستخدم كوكي» (بتستخدم، إلا لو الـ id في الرابط وده خطر). وتخزين role أو user_id في كوكي عادية. و«الـ session آمنة دايمًا» من غير regenerate و HttpOnly و Secure.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

بيعمل حاجتين جنب بعض: كوكي اسمها [[lang]] قيمتها في المتصفح، وجلسة فيها [[user_id]] قيمتها على السيرفر. وبعدها بتجرّب تغيّر الاتنين من المتصفح، فتشوف مين يتغيّر ومين لأ.

اتشغّل على PHP 8.4.26 بـ [[php -S]] في container [[php:8.4-cli]]، والطلبات بـ curl (بيحفظ الكوكيز في ملف بـ [[-c]] ويبعتها بـ [[-b]]، زي المتصفح بالظبط).

---

## ١. [[session_start()]] الأول

~~~php
session_start();
~~~

بيدوّر على كوكي [[PHPSESSID]] في الطلب، ولو مش موجودة بيعمل id عشوائي جديد ويبعته في header [[Set-Cookie]]. وأي header لازم يتبعت **قبل** أي حرف من الـ body.

> المثال كان الأول بيعمل [[echo]] قبل [[session_start()]]، واتشغّل فطلع: [[Warning: session_start(): Session cannot be started after headers have already been sent]] والجلسة مشتغلتش خالص. على PHP من غير [[php.ini]] (زي Docker) [[output_buffering]] = 0، فأول [[echo]] بيبعت الـ headers على طول. اتصلّح الترتيب في المثال.

## ٢. [[setcookie]]

~~~php
setcookie('lang', 'ar', ['expires' => time() + 86400 * 30, 'path' => '/', 'samesite' => 'Lax']);
~~~

- الاسم والقيمة، وبعدين array options.
- [[time()]] الوقت دلوقتي بالثواني، و [[86400]] = ثواني اليوم (٢٤ × ٦٠ × ٦٠)، فـ [[× 30]] = ٣٠ يوم.
- [['path' => '/']] الكوكي تتبعت مع كل صفحات الموقع.
- [['samesite' => 'Lax']] متتبعتش مع POST جاي من موقع تاني (درس CSRF).

## ٣. [[$_COOKIE]] في نفس الطلب

~~~php
echo $_COOKIE['lang'] ?? 'لسه (الكوكي بتوصل من الطلب الجاي)';
~~~

[[$_COOKIE]] = الكوكيز اللي **جت مع الطلب ده**. و [[setcookie]] لسه بيطلب من المتصفح يخزّنها، فأول مرة مش موجودة و [[??]] بيرجّع الرسالة.

## ٤. الجلسة

~~~php
$_SESSION['user_id'] = 42;
echo session_id();
~~~

[[$_SESSION]] array بتتحفظ على السيرفر في آخر الطلب، و [[session_id()]] الـ id اللي في الكوكي.

---

## ٥. أول طلب

~~~text الناتج (الـ headers والـ body)
HTTP/1.1 200 OK
Set-Cookie: PHPSESSID=6879716057fde140c050db9d6313cc6b; path=/
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Set-Cookie: lang=ar; expires=Fri, 06 Nov 2026 17:48:56 GMT; Max-Age=2592000; path=/; SameSite=Lax

لسه (الكوكي بتوصل من الطلب الجاي)6879716057fde140c050db9d6313cc6b
~~~

- كوكيتين: [[PHPSESSID]] (من [[session_start]]) و [[lang]].
- [[Max-Age=2592000]] = ٣٠ × ٨٦٤٠٠.
- [[Expires: 1981]] و [[no-cache]]: [[session_start]] بيقول للمتصفح والـ proxies «متحفظش الصفحة دي»، لأنها خاصة بيوزر. (أي تاريخ في الماضي معناه «منتهية خلاص».)

## ٦. تاني طلب ومعاه الكوكيز

~~~text الناتج
ar6879716057fde140c050db9d6313cc6b
~~~

[[lang]] وصلت، ونفس الـ session id.

## ٧. المستخدم غيّر الكوكي بإيده

بعتنا [[lang=en]] بدل [[ar]]:

~~~text الناتج
en6879716057fde140c050db9d6313cc6b
~~~

السيرفر صدّق. أي حاجة في كوكي المستخدم يقدر يكتب فيها اللي هو عايزه.

## ٨. الجلسة فين؟

~~~text الناتج (ملفات /tmp على السيرفر)
/tmp/sess_6879716057fde140c050db9d6313cc6b
user_id|i:42;
~~~

ملف اسمه [[sess_]] + الـ id، وفيه [[user_id]] بصيغة serialize بتاعة الجلسات: [[i:42]] = integer قيمته 42. المتصفح معاه الـ id بس، ومستحيل يغيّر الـ 42 من عنده.

---

## الخلاصة

| | الكوكي | الجلسة |
|---|---|---|
| البيانات فين | المتصفح | السيرفر (ملف [[sess_...]] افتراضيًا) |
| المستخدم يغيّرها؟ | أيوه (جرّبنا [[lang=en]]) | لأ، معاه id بس |
| الحجم | حوالي 4KB | أي حجم |
| تظهر في [[$_COOKIE]] / [[$_SESSION]] | من الطلب الجاي | في نفس الطلب |
| تتعمل بـ | [[setcookie]] | [[session_start()]] (قبل أي output) |

الصلاحيات ومين داخل في الجلسة، والتفضيلات في الكوكي.`,
          lines: [
            "بداية الملف.",
            "ابدأ جلسة قبل أي echo (بتبعت header الكوكي بتاعها).",
            "كوكي لغة لمدة ٣٠ يوم.",
            "أول طلب: لسه مش موجودة.",
            "البيانات على السيرفر.",
            "ده بس اللي في كوكي المتصفح."
          ],
          sol: R`أول طلب: [[لسه (الكوكي بتوصل من الطلب الجاي)]] والـ response فيه [[Set-Cookie: lang=ar; expires=...; Max-Age=2592000; path=/; SameSite=Lax]] و [[Set-Cookie: PHPSESSID=...]]. تاني طلب: [[ar]]. [[setcookie]] بيطلب من المتصفح يخزنها، و [[$_COOKIE]] بيتقرا من الطلب اللي جاي، فمش هيشوفها في نفس الطلب.

في DevTools هتلاقي كوكيتين بس: [[lang=ar]] و [[PHPSESSID=ac2c53cc...]]. غيّر [[lang]] لـ [[en]] واعمل refresh: الصفحة هتطبع [[en]]، يعني أي حاجة في كوكي المستخدم يقدر يغيّرها. [[user_id]] مش موجود في المتصفح، اللي موجود مفتاح عشوائي بس والـ 42 في ملف الجلسة على السيرفر.

الإجابة المختصرة: الكوكي = بيانات عند المتصفح، بيتبعت مع كل طلب، والمستخدم يقدر يقراه ويغيّره. الجلسة = بيانات على السيرفر، والكوكي فيه الـ id بس. أي حاجة ليها علاقة بالصلاحيات (مين المستخدم، admin ولا لا) في الجلسة.`
        },
        {
          cmd: "SQL والقيم منفصلين",
          title: "إيه الـ prepared statements وليه بتمنع SQL injection؟",
          desc: R`prepared statement بيبعت الـ SQL للقاعدة بـ placeholders الأول، والقاعدة بتعمله parse وتجهّز خطته، وبعدين القيم بتتبعت لوحدها كبيانات. فمهما المستخدم كتب، مستحيل يتفهم كجزء من الأمر، لأن الأمر اتفهم خلاص قبل ما القيمة توصل.

في PHP بعملها بـ PDO: [[prepare]] و [[execute]] بـ named params، مع [[EMULATE_PREPARES]] مقفولة. واللي مينفعش يبقى placeholder (اسم عمود، اتجاه الترتيب) بعمله allowlist. وفايدة جانبية: نفس الـ statement بيتنفّذ كذا مرة بقيم مختلفة.`,
          example: R`<?php
$email = "x' OR '1'='1";
$bad = "SELECT * FROM users WHERE email = '$email'";
echo $bad, "\n";
$stmt = db()->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);`,
          try: R`اطبع [[$bad]] واقراه: الشرط بقى [[OR '1'='1']] يعني كل الصفوف. والنسخة الـ prepared بتدوّر على إيميل حرفيًا [[x' OR '1'='1]] فمبترجعش حاجة.`,
          flag: "script",
          deep: {
            why: "SQL injection لسه من أشهر الثغرات، والسؤال بيشوف إذا كنت فاهم السبب (الخلط بين الأمر والبيانات) مش حافظ الحل بس.",
            how: R`مع الـ emulation (افتراضي pdo_mysql) PHP نفسه بيعمل escape للقيم ويحطها في الـ SQL ويبعت نص واحد. آمن طول ما الـ charset متحدد في الـ DSN، بس الأنضف إن القاعدة تستلمهم منفصلين.

ليه [[mysqli_real_escape_string]] مش كفاية؟ بيحمي جوه علامات تنصيص بس: [[WHERE id = $id]] من غير تنصيص مفيهاش أي حماية، وسهل تنسى escape مرة واحدة من مية.

الـ ORMs (Eloquent و Prisma) بتستخدم prepared statements، إلا في الـ raw queries: [[DB::raw]] أو [[whereRaw]] بقيمة ملزوقة = نفس المشكلة.

second-order injection: قيمة اتخزنت بأمان، وبعدين اتقرت من القاعدة واتلزقت في query تاني. عشان كده «كل query فيه متغير = prepared»، مش «كل query فيه input».`,
            when: "أسئلة بعدها: «mysqli_real_escape_string مش كفاية؟» «ORDER BY ديناميكي إزاي؟» «IN بعدد متغير؟» «الـ ORM بيحميك دايمًا؟»",
            mistakes: R`«prepared statements بتعمل escape» (مع native prepares مفيش escape أصلًا، القيم منفصلة). و«بتحمي من XSS» (لأ خالص). و«ينفع placeholder لاسم الجدول».`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

نفس الإيميل الخبيث بطريقتين: مرة ملزوق جوه نص الـ SQL (الغلط)، ومرة كـ placeholder (الصح). وبنطبع الـ SQL الغلط عشان تشوف القيمة غيّرت شكل الأمر إزاي.

اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]])، و [[db()]] هنا PDO على SQLite في الذاكرة، فيها جدول [[users]] بـ ٣ مستخدمين (Ali و Sara و Omar). نفس الكلام على MySQL (درس prepare / execute).

---

## ١. القيمة الخبيثة

~~~php
$email = "x' OR '1'='1";
~~~

علامات تنصيص مزدوجة حوالين نص فيه علامات مفردة. ده اللي ممكن أي حد يكتبه في خانة الإيميل.

## ٢. الغلط: لزق

~~~php
$bad = "SELECT * FROM users WHERE email = '$email'";
echo $bad, "\n";
~~~

في نص بعلامات مزدوجة، [[$email]] بيتبدّل بقيمته:

~~~text الناتج
SELECT * FROM users WHERE email = 'x' OR '1'='1'
~~~

اقراها زي ما القاعدة بتقراها:

| الحتة | بقت إيه |
|---|---|
| [['x']] | الـ [[']] اللي في القيمة **قفلت** النص بدري |
| [[OR]] | بقت كلمة SQL مش جزء من إيميل |
| [['1'='1']] | شرط صح دايمًا |

فالشرط بقى «الإيميل x **أو** صح» = كل صف. ولما نفّذناه:

~~~text الناتج
bad rows: 3
~~~

## ٣. الصح: placeholder

~~~php
$stmt = db()->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
~~~

- [[prepare]] بيبعت الـ SQL **من غير** القيمة، و [[:email]] خانة فاضية. القاعدة بتفهم شكل الأمر وتقفله.
- [[execute([...])]] بيبعت القيمة بعدين كبيانات بس.
- علامات تنصيص مفردة حوالين الـ SQL: مفيش تبديل متغيرات جواه أصلًا.

~~~text الناتج
prepared rows: 0
~~~

القاعدة دوّرت على إيميل حرفيًا [[x' OR '1'='1]] وملقتش.

---

## الخلاصة

| | الـ SQL اللي القاعدة شافته | النتيجة |
|---|---|---|
| لزق | [[... WHERE email = 'x' OR '1'='1']] | 3 صفوف (كلهم) |
| prepared | [[... WHERE email = ?]] + قيمة لوحدها | 0 |

الجملة للانترفيو: «الـ prepared statement مبيعملش escape، بيبعت الأمر والبيانات منفصلين، فالبيانات مستحيل تبقى أمر». واسم الجدول أو العمود أو [[ASC]] مينفعش placeholder: allowlist.`,
          lines: [
            "بداية الملف.",
            "قيمة خبيثة من فورم.",
            "الغلط: القيمة ملزوقة في نص الـ SQL.",
            "اطبعه وشوف الشرط اتغير إزاي.",
            "الصح: placeholder.",
            "القيمة لوحدها كبيانات."
          ],
          sol: R`[[echo $bad]] بيطبع: [[SELECT * FROM users WHERE email = 'x' OR '1'='1']]. الـ [[']] اللي في الإيميل قفلت النص بدري، و [[OR '1'='1']] بقى شرط SQL حقيقي دايمًا true، فالـ query بيرجّع كل الصفوف (لو login، هيدخل بأول مستخدم وغالبًا ده الـ admin).

النسخة الـ prepared بترجّع صفر صفوف: الـ SQL وصل القاعدة الأول فيه [[?]] مكان القيمة، والقاعدة جهّزت الخطة، وبعدين القيمة وصلت كبيانات، فبتدوّر على إيميل حرفيًا [[x' OR '1'='1]].

في الانترفيو قول الجملة دي: «الـ prepared statement مش بيعمل escape، بيبعت الكود والبيانات منفصلين فالبيانات مستحيل تتنفّذ». وزوّد إن اسم العمود أو الجدول أو [[ASC/DESC]] مينفعش يبقى placeholder، ودول whitelist.`
        },
        {
          cmd: "bcrypt بطيء + salt",
          title: "بتخزن الباسوردات إزاي؟ وليه مش md5؟",
          desc: R`بـ [[password_hash($p, PASSWORD_DEFAULT)]] وبتحقق بـ [[password_verify]]. الافتراضي bcrypt: خوارزمية بطيئة عمدًا بـ cost بيزيد مع الوقت (12 من PHP 8.4)، ومعاها salt عشوائي لكل باسورد، والاتنين متخزنين جوه نفس الـ hash.

البطء بيخلي تخمين الباسوردات بعد تسريب القاعدة مكلّف جدًا، والـ salt بيخلي نفس الباسورد يطلع hash مختلف فالجداول الجاهزة ملهاش لازمة. [[md5]] و [[sha256]] سريعين جدًا، ودي بالظبط المشكلة. وبعد كل login ناجح [[password_needs_rehash]] بيحدّث الـ hash لو الإعدادات اتغيرت.`,
          example: R`<?php
$hash = password_hash('secret123', PASSWORD_DEFAULT);
var_dump(password_verify('secret123', $hash));
print_r(password_get_info($hash));`,
          try: R`قيس الوقت: [[$t = microtime(true); password_hash('x', PASSWORD_DEFAULT); echo microtime(true) - $t;]] وقارنه بـ [[md5('x')]] في loop مليون مرة.`,
          flag: "script",
          deep: {
            why: "بيختبر فهمك للفرق بين hashing و encryption، وليه السرعة عيب هنا بالذات.",
            how: R`hashing اتجاه واحد: مفيش طريقة ترجع الباسورد. encryption بيرجع بالمفتاح، فلو المفتاح اتسرق كل الباسوردات اتكشفت. عشان كده الباسورد hash مش encryption.

GPU واحدة بتجرب مليارات md5 في الثانية، وبـ bcrypt cost 12 آلاف بس. ده الفرق بين كسر أغلب الباسوردات في ساعات وسنين.

الـ salt مش سر: متخزن مع الـ hash. وظيفته إن كل hash يتكسر لوحده. الـ pepper (سر إضافي في الإعدادات مش في القاعدة) طبقة اختيارية.

Argon2id ([[PASSWORD_ARGON2ID]]) بديل حديث بيستهلك ذاكرة كمان، ومتاح لو PHP متبني بيه. و bcrypt بيقرا أول 72 byte بس.`,
            when: "أسئلة بعدها: «ليه مش sha256 مع salt؟» «hashing ولا encryption؟» «Argon2؟» «توكن استرجاع الباسورد بيتخزن إزاي؟» (hash sha256 لأنه عشوائي وطويل)",
            mistakes: R`«بشفّر الباسورد» (بتعمله hash). و«md5 مع salt كفاية». و«لازم أخزن الـ salt في عمود لوحده». و[[==]] بين hashes.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

٣ سطور: اعمل hash لباسورد، واتأكد إن نفس الباسورد بيطابقه، واطبع المعلومات اللي جوه الـ hash نفسه. والـ try بيقيس bcrypt قصاد md5.

اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]]).

---

## ١. [[password_hash]]

~~~php
$hash = password_hash('secret123', PASSWORD_DEFAULT);
~~~

[[PASSWORD_DEFAULT]] = الخوارزمية اللي PHP شايفها الأنسب دلوقتي (bcrypt)، وممكن تتغيّر في نسخة جاية. والنتيجة نص واحد فيه كل حاجة. شغّلناه مرتين على نفس الباسورد:

~~~text الناتج
$2y$12$btUKBIKW/Xe7TKB8xpRXT.ZMFP7MWh3PKcwlicybGHYp6Jwbj9RoW
$2y$12$oZmrY2waLAihd/KY8w0lpevK2inCNertIH1J0atzPHW0Qmb0lEqz6
~~~

مختلفين، لأن كل مرة salt عشوائي جديد. والنص بيتقسم بـ [[$]]:

| الحتة | معناها |
|---|---|
| [[2y]] | الخوارزمية: bcrypt |
| [[12]] | الـ cost: ٢ أس ١٢ = ٤٠٩٦ دورة |
| أول ٢٢ حرف بعدها ([[btUKBIKW/Xe7TKB8xpRXT.]]) | الـ salt |
| الباقي (٣١ حرف) | الـ hash نفسه |

الـ salt متخزن جوه الـ hash، فمش محتاج عمود لوحده.

## ٢. [[password_verify]]

~~~php
var_dump(password_verify('secret123', $hash));
~~~

~~~text الناتج
bool(true)
~~~

بيقرا الـ salt والـ cost من [[$hash]]، ويعمل hash للباسورد اللي جاي بيهم، ويقارن. ومع [['wrong']] رجّع [[bool(false)]].

## ٣. [[password_get_info]]

~~~php
print_r(password_get_info($hash));
~~~

~~~text الناتج
Array
(
    [algo] => 2y
    [algoName] => bcrypt
    [options] => Array
        (
            [cost] => 12
        )

)
~~~

الـ cost 12 هو الافتراضي من PHP 8.4 (كان 10 قبلها).

## ٤. [[password_needs_rehash]] (اتجرّب)

| النداء | الناتج |
|---|---|
| [[password_needs_rehash($hash, PASSWORD_DEFAULT)]] | false: الـ hash بنفس الإعدادات الحالية |
| [[password_needs_rehash($hash, PASSWORD_DEFAULT, ['cost' => 13])]] | true: الإعدادات اتغيرت، فاعمل hash جديد بعد الـ login الجاي |

## ٥. الـ try: قيس الوقت (الـ solCode)

~~~php
$t = microtime(true);
password_hash('x', PASSWORD_DEFAULT);
printf("bcrypt مرة: %.3fs\n", microtime(true) - $t);
~~~

- [[microtime(true)]] الوقت بالثواني ككسر عشري.
- [[printf]] بيطبع بقالب: [[%.3f]] = رقم عشري بـ ٣ أرقام بعد العلامة.

~~~php
for ($i = 0; $i < 1_000_000; $i++) md5('x');
~~~

[[1_000_000]] = مليون (الـ [[_]] للقراية بس، من PHP 7.4).

~~~text الناتج
bcrypt مرة: 0.177s
md5 مليون مرة: 0.123s
~~~

hash bcrypt **واحد** أخد وقت أكتر من **مليون** md5. يعني الواحد أبطأ بأكتر من مليون مرة. اللي بيعمل login مش هيحس بـ ٠.٢ ثانية، بس اللي سرق القاعدة وبيجرّب مليارات الكلمات هيحس جدًا.

> وفي نفس الـ container [[defined('PASSWORD_ARGON2ID')]] رجّع true، يعني Argon2id متاح كمان في النسخة دي.

---

## الخلاصة

| الدالة | بتعمل إيه |
|---|---|
| [[password_hash($p, PASSWORD_DEFAULT)]] | bcrypt بـ salt عشوائي و cost 12، كله في نص واحد |
| [[password_verify($p, $hash)]] | true أو false |
| [[password_get_info($hash)]] | الخوارزمية والـ cost |
| [[password_needs_rehash($hash, ...)]] | الإعدادات اتغيرت؟ |

hash مش encryption (مفيش رجوع)، والبطء مقصود، والـ salt مش سر.`,
          lines: [
            "بداية الملف.",
            "hash (bcrypt، cost 12، salt عشوائي).",
            "true.",
            "الخوارزمية والـ cost مقرية من الـ hash نفسه."
          ],
          sol: R`عندي [[password_hash('x', PASSWORD_DEFAULT)]] مرة واحدة أخدت حوالي 0.26 ثانية، ومليون [[md5('x')]] أخدوا حوالي 0.14 ثانية. يعني hash واحد bcrypt أبطأ من md5 واحد بأكتر من مليون مرة (الأرقام بتختلف حسب الجهاز، بس الفرق دايمًا بالملايين).

ده المقصود: المستخدم مش هيحس بربع ثانية وقت الـ login، بس اللي سرق القاعدة ومعاه GPU بيجرّب مليارات md5 في الثانية، وبـ bcrypt آلاف بس. والـ salt العشوائي بيخلي كل hash لازم يتكسر لوحده، فـ rainbow tables ملهاش لازمة.

و [[password_get_info]] بيطلّع [[[algo] => 2y]] و [[[algoName] => bcrypt]] و [[[cost] => 12]]. لو الوقت طلع أقل من 0.05 ثانية، غالبًا انت على PHP أقدم من 8.4 (الـ cost كان 10).`,
          solCode: R`<?php
$t = microtime(true);
password_hash('x', PASSWORD_DEFAULT);
printf("bcrypt مرة: %.3fs\n", microtime(true) - $t);
$t = microtime(true);
for ($i = 0; $i < 1_000_000; $i++) md5('x');
printf("md5 مليون مرة: %.3fs\n", microtime(true) - $t);`
        },
        {
          cmd: "escape حسب المكان",
          title: "بتمنع XSS إزاي في PHP؟ (XSS prevention)",
          desc: R`XSS إن حد يخلي موقعي يشغّل JavaScript بتاعه في متصفح زوّاري. الحماية الأساسية output escaping: أي بيانات مش مكتوبة في الكود بعمللها escape وقت الطباعة وحسب المكان: [[htmlspecialchars]] بـ [[ENT_QUOTES]] جوه HTML والـ attributes، و [[json_encode]] بالـ flags [[JSON_HEX_*]] جوه [[<script>]]، و [[urlencode]] جوه روابط، وأي لينك من المستخدم لازم يبدأ بـ [[https://]] عشان [[javascript:]].

وفوقها طبقات: كوكي الجلسة [[HttpOnly]] فمتتسرقش حتى لو حصل XSS، و [[Content-Security-Policy]] بيمنع scripts غريبة. وفي Blade أو React الـ escaping أوتوماتيك، والخطر في الأماكن اللي بتقفله ([[{!! !!}]] و [[dangerouslySetInnerHTML]]).`,
          example: R`<?php
$name = '<img src=x onerror=alert(1)>';
echo '<p>' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>';
echo '<script>const n = ' . json_encode($name, JSON_HEX_TAG | JSON_HEX_QUOT) . ';</script>';`,
          try: R`اطبع [[$name]] من غير escape في صفحة وافتحها: هيطلع alert. وبعدين بالسطرين في المثال.`,
          flag: "script",
          deep: {
            why: "بيختبر إذا كنت عارف إن الحماية وقت الإخراج مش الإدخال، وإن المكان بيفرق.",
            how: R`الأنواع: stored (اتخزن في القاعدة واتعرض لكل الزوار، الأخطر)، و reflected (في الرابط واترد في الصفحة)، و DOM-based (JavaScript في الصفحة بياخد من الرابط ويحط في [[innerHTML]]).

ليه مش تنضيف الإدخال؟ لأن نفس النص بيتعرض في HTML و JSON و إيميل وملف CSV، وكل مكان ليه escaping مختلف. والتنضيف بيبوّظ بيانات حقيقية (حد اسمه فيه [[<]]). فبتخزن زي ما هو وتعمل escape على حسب المكان.

للـ HTML اللي المستخدم لازم يكتبه (محرر نصوص): مكتبة sanitizer زي HTML Purifier بـ allowlist للتاجات، مش [[strip_tags]].

[[HttpOnly]] بيمنع سرقة الكوكي بس؛ الـ script لسه يقدر يعمل طلبات باسم المستخدم من جوه الصفحة. عشان كده الـ escaping هو الأساس.`,
            when: "أسئلة بعدها: «أنواع XSS؟» «ليه مش strip_tags؟» «CSP بيعمل إيه؟» «HttpOnly بيحمي من إيه ومبيحميش من إيه؟»",
            mistakes: R`«بفلتر الإدخال» كإجابة أساسية. و [[htmlspecialchars]] جوه [[<script>]] أو جوه [[onclick]]. و«React بيحميني» وانت بتستخدم [[dangerouslySetInnerHTML]].`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

نفس الاسم الخبيث بيتطبع في مكانين: جوه HTML عادي، وجوه [[<script>]]. وكل مكان ليه escape مختلف، لأن الحروف الخطر في HTML غير اللي في JavaScript.

اتشغّل على PHP 8.4.26 بـ [[php -S]] في container [[php:8.4-cli]]، والناتج من curl (يعني الـ HTML زي ما المتصفح بيستلمه).

---

## ١. القيمة

~~~php
$name = '<img src=x onerror=alert(1)>';
~~~

لو اتطبعت زي ما هي، المتصفح هيشوف tag صورة حقيقي، الصورة [[x]] مش موجودة، فـ [[onerror]] يشتغل وينفّذ JavaScript.

## ٢. جوه HTML: [[htmlspecialchars]]

~~~php
echo '<p>' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>';
~~~

- [[htmlspecialchars]] بيبدّل ٥ حروف بـ entities: [[<]] ← [[&lt;]]، و [[>]] ← [[&gt;]]، و [[&]] ← [[&amp;]]، و [["]] ← [[&quot;]]، و [[']] ← [[&#039;]].
- [[ENT_QUOTES]] = اعمل الاتنين [["]] و [[']] (مهم جوه attributes). ومع [[ENT_NOQUOTES]] جرّبنا [[O'Reilly]] فطلع زي ما هو.
- [['UTF-8']] الترميز، عشان ميبوّظش الحروف العربي.
- النقطة [[.]] بتلزق النصوص.

~~~text الناتج
<p>&lt;img src=x onerror=alert(1)&gt;</p>
~~~

المتصفح بيعرض [[<img src=x onerror=alert(1)>]] كنص، مفيش tag.

## ٣. جوه [[<script>]]: [[json_encode]]

~~~php
echo '<script>const n = ' . json_encode($name, JSON_HEX_TAG | JSON_HEX_QUOT) . ';</script>';
~~~

- [[json_encode]] بيحوّل قيمة PHP لـ literal صالح في JavaScript: النص بيتلف في [["..."]] ويتعمل escape صح.
- [[JSON_HEX_TAG]] = [[<]] و [[>]] يتكتبوا [[\u003C]] و [[\u003E]]. و [[JSON_HEX_QUOT]] = [["]] يبقى [[\u0022]].
- الـ [[|]] بين الاتنين = OR على مستوى الـ bits: بتجمع الـ flags في رقم واحد.

~~~text الناتج
<script>const n = "\u003Cimg src=x onerror=alert(1)\u003E";</script>
~~~

JavaScript بيقرا [[\u003C]] على إنه حرف [[<]]، فـ [[n]] فيها النص الأصلي بالظبط، بس الـ HTML parser مش شايف أي [[<]].

### ليه [[JSON_HEX_TAG]] بالذات؟ (اتجرّب)

~~~text الناتج
json_encode('</script><script>alert(1)</script>')   →  "<\/script><script>alert(1)<\/script>"
json_encode('</script>', JSON_HEX_TAG)               →  "\u003C\/script\u003E"
~~~

من غير الـ flag، [[json_encode]] بيعمل [[\/]] بس، و [[<script>]] التانية فاضلة زي ما هي. المتصفح بيقفل الـ script عند أول [[</script>]] حتى لو جوه نص JavaScript، فلازم [[<]] نفسها تختفي.

وجرّبنا الـ flags على [[a"b'c&]]:

| الـ flags | الناتج |
|---|---|
| TAG و QUOT | [["a\u0022b'c&"]] |
| TAG و QUOT و APOS و AMP | [["a\u0022b\u0027c\u0026"]] |

لو الـ JSON هيتحط جوه attribute ([[data-x='...']]) ضيف الأربعة.

## ٤. اللي [[htmlspecialchars]] مبيحميهوش

~~~text الناتج
htmlspecialchars("javascript:alert(1)", ENT_QUOTES)  →  javascript:alert(1)
~~~

مفيش ولا حرف من الخمسة، فطلع زي ما هو. فلو حطيته في [[<a href="...">]] الضغطة تنفّذ JavaScript. الروابط من المستخدم لازم تتأكد إنها بتبدأ بـ [[https://]].

---

## الخلاصة

| المكان | الأداة |
|---|---|
| نص HTML و attributes | [[htmlspecialchars($v, ENT_QUOTES, 'UTF-8')]] |
| جوه [[<script>]] | [[json_encode]] بـ [[JSON_HEX_TAG]] و [[JSON_HEX_QUOT]] (وزوّد APOS و AMP جوه attribute) |
| جوه URL | [[urlencode]]، والرابط كله يبدأ بـ [[https://]] |
| Blade | [[{{ }}]] بيعمل [[htmlspecialchars]] لوحده |

الـ escape وقت الطباعة وحسب المكان، مش وقت الحفظ.`,
          lines: [
            "بداية الملف.",
            "اسم خبيث.",
            "جوه HTML: بيطلع نص.",
            "جوه JavaScript: json_encode بالـ flags."
          ],
          sol: R`من غير escape ([[echo '<p>' . $name . '</p>';]]) الـ alert بيطلع: المتصفح شاف [[<img>]] حقيقي، الصورة [[x]] فشلت، فـ [[onerror]] اشتغل.

بالسطرين اللي في المثال View Source بيبقى: [[<p>&lt;img src=x onerror=alert(1)&gt;</p>]] وبيظهر كنص، و [[<script>const n = "\u003Cimg src=x onerror=alert(1)\u003E";</script>]] ومفيش alert (الـ [[<]] و [[>]] بقوا [[\u003C]] و [[\u003E]]، و JavaScript بيرجّعهم حروف عادية جوه النص). كل مكان ليه escape بتاعه: HTML بـ [[htmlspecialchars]]، وجوه [[<script>]] بـ [[json_encode]] مع [[JSON_HEX_TAG]] عشان [[</script>]] جوه النص ميقفلش الـ tag.

للانترفيو: الـ escape وقت الطباعة مش وقت الحفظ، لأن نفس القيمة ممكن تتطبع في HTML أو JSON أو CSV. وزوّد Content-Security-Policy كطبقة تانية، و [[htmlspecialchars]] مش كفاية جوه [[href]] ([[javascript:alert(1)]] مفيهاش ولا حرف يتعمله escape)، فالروابط لازم تتأكد إنها بتبدأ بـ [[https://]].`
        },
        {
          cmd: "token + SameSite",
          title: "بتمنع CSRF إزاي؟ (CSRF prevention)",
          desc: R`CSRF إن موقع تاني يخلي متصفح المستخدم يبعت طلب لموقعي، والمتصفح بيبعت الكوكيز معاه، فالسيرفر يفتكره المستخدم. الحماية: token عشوائي في الجلسة بحطه hidden في كل فورم وبقارنه بـ [[hash_equals]] مع كل طلب بيغيّر حاجة. الموقع التاني ميقدرش يقراه بسبب same-origin policy.

وطبقة تانية [[SameSite=Lax]] على الكوكي، ومفيش أي تغيير في البيانات بـ GET. ولو الـ API معتمد على Bearer token في header مش كوكي، CSRF مش مشكلة أصلًا، لأن المتصفح مبيبعتش الـ header ده لوحده.`,
          example: R`<?php
$_SESSION['csrf'] ??= bin2hex(random_bytes(32));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ok = hash_equals($_SESSION['csrf'], (string) ($_POST['csrf'] ?? ''));
    if (!$ok) { http_response_code(403); exit; }
}`,
          try: R`اعمل صفحة HTML على بورت تاني ([[php -S localhost:9000]]) فيها فورم بيبعت POST لموقعك على 8000 من غير token، وشوف الـ 403.`,
          flag: "script",
          deep: {
            why: "بيختبر إذا كنت فاهم إن المتصفح بيبعت الكوكي لوحده، وإن ده أصل المشكلة.",
            how: R`CSRF و XSS مختلفين: CSRF طلب من موقع تاني باسمك، و XSS كود شغال جوه موقعك. ولو فيه XSS، الـ CSRF token ملوش لازمة لأن الـ script يقدر يقراه من الصفحة.

SameSite: [[Strict]] الكوكي مبتتبعتش من أي موقع تاني خالص (حتى لو ضغطت لينك، فتوصل مش داخل). [[Lax]] بتتبعت مع التنقل العادي GET بس. [[None]] بتتبعت دايمًا ولازم معاها [[Secure]].

CORS مش حماية من CSRF: CORS بيمنع الموقع التاني يقرا الرد، مش يبعت الطلب. الفورم العادي بيتبعت من غير أي CORS.

double submit cookie: token في كوكي وفي الطلب والسيرفر يقارنهم، بديل لو مفيش جلسة على السيرفر.`,
            when: "أسئلة بعدها: «CSRF vs XSS؟» «SameSite Lax vs Strict؟» «API بـ JWT محتاج CSRF؟» «CORS بيحمي؟»",
            mistakes: R`«HTTPS بيحمي من CSRF». و«CORS بيحمي». وتغيير بيانات بـ GET. و[[==]] في مقارنة الـ token.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

بيحط token عشوائي في الجلسة مرة واحدة، ومع أي POST بيقارن الـ token اللي جه في الفورم باللي في الجلسة. مش مطابق؟ 403 ووقّف. والفورم الحقيقي في موقعك بيكون فيه الـ token كـ hidden input، والموقع التاني ميعرفوش.

اتشغّل على PHP 8.4.26 بـ [[php -S]] في container [[php:8.4-cli]]، مع [[session_start()]] في أول الملف (المثال من غيرها، والـ sol بيقول ضيفها)، وسطر في الآخر بيطبع الـ token في الـ GET و «اتنفّذ» في الـ POST عشان نشوف. والطلبات بـ curl ومعاها كوكي الجلسة، يعني زي متصفح المستخدم بالظبط.

---

## ١. الـ token

~~~php
$_SESSION['csrf'] ??= bin2hex(random_bytes(32));
~~~

- [[random_bytes(32)]] ٣٢ byte عشوائي آمن للتشفير.
- [[bin2hex]] بيحوّلهم hex: كل byte حرفين، فـ ٦٤ حرف. اتأكدنا: [[token len 64]].
- [[??=]] (PHP 7.4): «لو مش موجود، حط القيمة دي». فالـ token بيتعمل أول مرة بس ويفضل طول الجلسة.

## ٢. الفحص

~~~php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ok = hash_equals($_SESSION['csrf'], (string) ($_POST['csrf'] ?? ''));
    if (!$ok) { http_response_code(403); exit; }
}
~~~

- [[$_SERVER['REQUEST_METHOD']]] الـ method. الـ GET مبيتفحصش لأنه مفروض ميغيّرش حاجة أصلًا.
- [[$_POST['csrf'] ?? '']] الـ token اللي جه، أو نص فاضي لو مجاش.
- [[(string)]] cast لنص، لأن [[hash_equals]] بيرمي TypeError لو اديته حاجة مش نص.
- [[hash_equals(المتوقع, اللي_جه)]] بيقارن في وقت ثابت: مبيقفش عند أول حرف مختلف، فمحدش يقدر يخمّن الـ token حرف حرف من وقت الرد.
- [[http_response_code(403)]] الـ status، و [[exit]] وقّف السكربت.

## ٣. اتجرّب

| الطلب (كلهم بكوكي الجلسة) | الـ status |
|---|---|
| GET أول مرة | 200 والـ token (٦٤ حرف) |
| POST من غير [[csrf]] (ده اللي الموقع التاني يقدر يبعته) | 403 |
| POST بـ [[csrf=abc]] | 403 |
| POST بالـ token الصح | 200 و «اتنفّذ» |

الحالة التانية هي هجوم CSRF بالظبط: المتصفح بعت الكوكي لوحده (فالجلسة صح)، بس الموقع التاني ميعرفش الـ token لأنه مش قادر يقرا صفحاتك (same-origin policy).

> حالة جانبية اتجربت: [[csrf[]=abc]] (array بدل نص). [[(string)]] على array بيطلّع [[Warning: Array to string conversion]]، والـ Warning ده اتطبع قبل [[http_response_code]]، فالـ status فضل 200 مع إن [[exit]] وقّف الطلب. الحماية اشتغلت، بس لو عايز الـ 403 دايمًا: [[is_string($_POST['csrf'] ?? null)]] الأول، و [[display_errors]] مقفولة في الإنتاج.

## ٤. الـ solCode: صفحة الهجوم

~~~html
<form method="post" action="http://localhost:8000/csrf.php">
  <input type="hidden" name="id" value="42">
  <button>اكسب جايزة</button>
</form>
~~~

[[action]] بيشاور على موقعك، والـ inputs اللي الموقع التاني يعرفها بس (مفيش [[csrf]]). الضغطة دي من المتصفح = الصف التاني في الجدول: 403. (الطلب من صفحة على بورت تاني محتاج متصفح؛ جرّبناه بـ curl بنفس الكوكي ونفس البيانات.)

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[bin2hex(random_bytes(32))]] | token مستحيل يتخمّن |
| في الجلسة، و hidden في كل فورم | الموقع التاني ميقدرش يقراه |
| [[hash_equals]] | مقارنة بوقت ثابت |
| GET ميغيّرش حاجة | الفحص على POST بس |
| [[SameSite=Lax]] على الكوكي | طبقة تانية: الكوكي متتبعتش في POST من site تاني |`,
          lines: [
            "بداية الملف.",
            "token للجلسة لو مش موجود.",
            "على كل POST...",
            "...قارن اللي جاي باللي في الجلسة بأمان.",
            "مش مطابق: 403 ووقّف.",
            "قفلة."
          ],
          sol: R`الفورم من [[localhost:9000]] بيرجّع [[403]] وصفحة فاضية. ولو نفس الفورم على موقعك ومعاه الـ token: [[200]].

خلي بالك إن [[localhost:9000]] و [[localhost:8000]] نفس الـ site في عين المتصفح (البورت مش بيفرق في SameSite)، فكوكي الجلسة وصلت عادي، والـ 403 هنا جاي من الـ token بس. عشان تشوف SameSite لوحدها لازم domain مختلف فعلًا (مثلًا [[127.0.0.1]] مقابل [[localhost]]). والمثال مفيهوش [[session_start()]]، فلازم تضيفها في أوله.

للانترفيو: الـ token هو الحماية الأساسية لأن الموقع التاني ميقدرش يقراه، و [[SameSite=Lax]] طبقة تانية بتمنع الكوكي في الـ POST من site تاني. والـ GET عمره ما يغيّر حاجة.`,
          solCode: R`<!-- attack.html: شغّله بـ php -S localhost:9000 -->
<form method="post" action="http://localhost:8000/csrf.php">
  <input type="hidden" name="id" value="42">
  <button>اكسب جايزة</button>
</form>`
        },
        {
          cmd: "shared-nothing",
          title: "اشرح دورة حياة الطلب في PHP (PHP request lifecycle)",
          desc: R`في الإعداد المعتاد، Nginx أو Apache بيستقبل الطلب ويسلّمه لـ PHP-FPM، وده pool من العمليات (workers). worker فاضي بياخد الطلب، و PHP بيعمل compile للسكربت لـ opcodes (أو ياخدهم جاهزين من OPcache)، وينفّذه، ويبني الرد، ويبعته، وبعدين يمسح كل حاجة: المتغيرات والـ objects والاتصالات.

ده اسمه shared-nothing: كل طلب معزول، ومفيش state في الذاكرة بين الطلبات. الميزة إن memory leak أو crash بيأثر على طلب واحد، والـ scaling سهل. والتمن إن أي حاجة لازم تعيش (جلسات، cache) بتروح لملفات أو القاعدة أو Redis، والـ bootstrap بيتكرر مع كل طلب، وده سبب OPcache. والاستثناء الحديث: FrankenPHP و RoadRunner و Swoole (و Laravel Octane فوقهم) بيخلوا التطبيق عايش في الذاكرة بين الطلبات.`,
          example: R`<?php
$hits = ($hits ?? 0) + 1;
session_start();
$_SESSION['hits'] = ($_SESSION['hits'] ?? 0) + 1;
echo "متغير عادي: $hits | جلسة: {$_SESSION['hits']}";`,
          try: R`افتح الصفحة ٥ مرات: المتغير العادي دايمًا 1، والجلسة بتزيد. ده الـ shared-nothing قدامك.`,
          flag: "script",
          deep: {
            why: "بيختبر إذا كنت فاهم PHP بيشتغل إزاي فعلًا، وبيفرق عن Node إزاي، مش بس بتكتب كود.",
            how: R`PHP-FPM: master process بيدير مجموعة workers. [[pm = dynamic]] بيزوّد وينقص العدد حسب الضغط، و [[pm.max_children]] أقصى عدد طلبات في نفس الوقت. worker واحد = طلب واحد في المرة. لو كلهم مشغولين، الطلبات الجديدة بتستنى.

مقارنة بـ Node: Node عملية واحدة بـ event loop بتخدم آلاف الطلبات، والـ state في الذاكرة مشتركة بينهم (وممكن تسرّب بينهم). PHP كل طلب لوحده. عشان كده في PHP مفيش «متغير global بيفضل».

الشغل الطويل (إيميلات، معالجة صور) مبيتعملش في الطلب: بيتحط في queue (جدول أو Redis)، و worker منفصل أو cron بيشتغل عليه.

mod_php القديم: PHP جوه عملية Apache نفسها. أبسط بس بيستهلك ذاكرة أكتر، و FPM هو الشائع النهارده.`,
            when: "أسئلة بعدها: «PHP-FPM vs mod_php؟» «background jobs بتتعمل إزاي؟» «OPcache بيعمل إيه؟» «مقارنة بـ Node؟» «Octane بيغيّر إيه ومحتاج تاخد بالك من إيه؟» (state بتفضل بين الطلبات)",
            mistakes: R`«PHP بيعمل thread لكل طلب» (FPM عمليات). و«static variables بتفضل بين الطلبات». و«PHP بطيء لأنه interpreted» من غير ما تذكر OPcache.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

عدّادين بيزيدوا مع كل طلب: واحد في متغير PHP عادي، وواحد في الجلسة. لو PHP بيفتكر حاجة بين الطلبات، الاتنين هيزيدوا. اللي بيحصل فعلًا هو الشرح كله.

اتشغّل على PHP 8.4.26 بـ [[php -S]] في container [[php:8.4-cli]]، و ٥ طلبات بـ curl بنفس كوكي الجلسة.

---

## ١. المتغير العادي

~~~php
$hits = ($hits ?? 0) + 1;
~~~

[[$hits ?? 0]]: لو [[$hits]] مش موجود خد 0. وفي أول السكربت هو **دايمًا** مش موجود، لأن كل طلب بيبدأ بذاكرة فاضية.

## ٢. الجلسة

~~~php
session_start();
$_SESSION['hits'] = ($_SESSION['hits'] ?? 0) + 1;
~~~

[[session_start()]] بيقرا ملف الجلسة من القرص (من الكوكي [[PHPSESSID]]) ويملى [[$_SESSION]]. وفي آخر الطلب بيكتبه تاني.

## ٣. الطباعة

~~~php
echo "متغير عادي: $hits | جلسة: {$_SESSION['hits']}";
~~~

جوه علامات مزدوجة: [[$hits]] بيتبدّل، و [[{$_SESSION['hits']}]] محتاج الأقواس [[{}]] عشان فيه [[[' ']]].

~~~text الناتج (٥ طلبات)
متغير عادي: 1 | جلسة: 1
متغير عادي: 1 | جلسة: 2
متغير عادي: 1 | جلسة: 3
متغير عادي: 1 | جلسة: 4
متغير عادي: 1 | جلسة: 5
~~~

---

## ٤. ليه؟ رحلة الطلب

| الخطوة | اللي بيحصل |
|---|---|
| ١ | Nginx (أو هنا [[php -S]]) بيستلم الطلب |
| ٢ | بيسلّمه لـ worker فاضي من PHP-FPM |
| ٣ | PHP بيترجم السكربت لـ opcodes (أو ياخدهم جاهزين من OPcache) |
| ٤ | ينفّذ من أول سطر: [[$hits]] مش موجود ← 1 |
| ٥ | [[session_start]] يقرا الملف ← العدد القديم + 1 |
| ٦ | الرد يتبعت، والجلسة تتكتب للقرص |
| ٧ | **كل** المتغيرات والـ objects والاتصالات تتمسح |

الخطوة ٧ هي الـ shared-nothing: مفيش حاجة في الذاكرة بتعيش لطلب تاني. فالعدّاد العادي دايمًا 1، واللي اتحفظ برّه PHP (ملف الجلسة) هو اللي بيزيد.

---

## الخلاصة

| | بيعيش لحد إمتى | مثال |
|---|---|---|
| متغير، object، static، اتصال DB | آخر الطلب | [[$hits]] = 1 دايمًا |
| جلسة، قاعدة، Redis، ملف | برّه PHP، فبيفضل | [[$_SESSION['hits']]] بيزيد |

لو [[$hits]] زاد عندك، انت على runtime بيخلي التطبيق عايش في الذاكرة (FrankenPHP worker mode، Swoole، Octane)، وده مش shared-nothing.`,
          lines: [
            "بداية الملف.",
            "متغير عادي: بيبدأ من الصفر مع كل طلب.",
            "افتح الجلسة.",
            "الجلسة متخزنة بره الطلب، فبتزيد.",
            "اطبع الاتنين."
          ],
          sol: R`خمس مرات: [[متغير عادي: 1 | جلسة: 1]] ثم [[1 | 2]] ثم [[1 | 3]] ثم [[1 | 4]] ثم [[1 | 5]]. [[$hits]] بيبدأ من الصفر مع كل طلب لأن PHP بيمسح كل حاجة في الآخر، والجلسة بتزيد لأنها متخزنة في ملف على السيرفر ومتربوطة بالكوكي.

الإجابة النموذجية: الطلب بيوصل لـ Nginx، يحوّله لـ PHP-FPM، worker فاضي يشغّل [[index.php]] من أوله (OPcache بيوفّر الترجمة بس)، الكود بيقرا الطلب ويكلّم القاعدة ويطبع، الـ response يرجع، وكل المتغيرات والاتصالات بتتقفل. أي حاجة لازم تفضل بين الطلبات مكانها بره PHP: جلسة، قاعدة، Redis، ملف.

لو [[$hits]] زاد عندك، انت شغّال على runtime زي FrankenPHP worker mode أو Swoole، ودول مش shared-nothing، وده بالظبط اللي بيعمل memory leaks وبيانات مستخدم بتتسرّب لمستخدم تاني لو مخدتش بالك.`
        },
        {
          cmd: "spl_autoload_register",
          title: "الـ autoloading في Composer بيشتغل إزاي؟",
          desc: R`PHP فيه hook: لما الكود يستخدم كلاس مش متعرّف، بينادي الدوال المسجلة بـ [[spl_autoload_register]] تحمّله قبل ما يرمي Class not found. Composer بيسجّل دالة بتحوّل اسم الكلاس لمسار ملف حسب PSR-4: الـ prefix [[App\\]] مربوط بـ [[src/]]، فـ [[App\Models\User]] يبقى [[src/Models/User.php]].

فأنا بعمل require واحد لـ [[vendor/autoload.php]] وخلاص، والكلاس بيتحمّل أول ما يتستخدم بس. وفي الإنتاج [[composer install --no-dev --optimize-autoloader]] بيبني classmap: array جاهز من كل كلاس لمساره، من غير بحث.`,
          example: R`<?php
spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) return;
    $file = __DIR__ . '/src/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    if (is_file($file)) require $file;
});
$repo = new App\Models\PostRepository();`,
          try: R`حط المثال بدل [[vendor/autoload.php]] في مشروع الـ MVC وشوف إنه شغال. ده تقريبًا اللي Composer بيعمله لـ PSR-4.`,
          flag: "script",
          deep: {
            why: "بيختبر إذا كنت فاهم الأداة اللي كل مشروع PHP حديث معتمد عليها، مش بس بتكتب [[require vendor/autoload.php]].",
            how: R`Composer عنده ٣ أنواع: [[psr-4]] (namespace → فولدر، بيدوّر وقت الحاجة)، و [[classmap]] (بيمسح الفولدرات مرة ويعمل array)، و [[files]] (ملفات بتتحمّل دايمًا، للدوال لأن الدوال مفيهاش autoload).

[[use]] مبيحمّلش حاجة، مجرد alias وقت الـ compile. التحميل بيحصل أول ما الكلاس يتستخدم فعلًا ([[new]]، أو static call، أو [[class_exists]]). أما [[instanceof]] فمبيحمّلش حاجة: لو الكلاس مش متحمّل بيرجّع false على طول.

الـ autoloading case-sensitive على Linux لأن نظام الملفات كده، فاسم الملف لازم يطابق اسم الكلاس بالظبط.

[[--optimize-autoloader]] بيحوّل PSR-4 لـ classmap؛ مع OPcache الـ lookup بيبقى array في الذاكرة. و [[--classmap-authoritative]] بيقول لو مش في الـ classmap يبقى مش موجود، من غير ما يدوّر على القرص.`,
            when: "أسئلة بعدها: «PSR-4 vs classmap؟» «ليه بيشتغل على ويندوز ويقع على Linux؟» «use بيحمّل الكلاس؟» «dump-autoload إمتى؟»",
            mistakes: R`«[[use]] بيعمل require». و«autoload بيحمّل كل الكلاسات في الأول». و commit لـ [[vendor/]].`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

بيسجّل دالة عند PHP: «لو حد استخدم كلاس مش متعرّف، نادي عليا قبل ما ترمي خطأ». والدالة بتحوّل اسم الكلاس لمسار ملف وتعمله [[require]]. ده بالظبط اللي [[vendor/autoload.php]] بتاع Composer بيعمله لـ PSR-4.

اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]])، ومعاه ملف [[src/Models/PostRepository.php]] فيه [[namespace App\Models;]] و [[class PostRepository]]. وضفنا جوه الدالة سطرين [[echo]] عشان نشوف هي بتتنادى إمتى وبتدوّر على أنهي ملف.

---

## ١. [[spl_autoload_register(function (string $class): void { ... })]]

- [[spl]] = Standard PHP Library. والدالة بتضيف autoloader لطابور، و PHP بيجرّبهم بالترتيب.
- الباراميتر [[$class]] = الاسم الكامل للكلاس اللي ناقص، بالـ namespace: [[App\Models\PostRepository]].

## ٢. الـ prefix

~~~php
$prefix = 'App\\';
if (!str_starts_with($class, $prefix)) return;
~~~

- [['App\\']]: جوه علامات مفردة، [[\\]] = backslash واحدة. يعني النص [[App\]].
- [[str_starts_with]] (PHP 8.0). لو الكلاس مش من [[App\]] ارجع ومتعملش حاجة، و PHP يجرّب الـ autoloader اللي بعدك (لو فيه).

## ٣. الاسم ← المسار

~~~php
$file = __DIR__ . '/src/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
~~~

من جوه لبرة، على [[App\Models\PostRepository]]:

| الخطوة | الناتج |
|---|---|
| [[strlen($prefix)]] | 4 (حروف [[App\]]) |
| [[substr($class, 4)]] | [[Models\PostRepository]] |
| [[str_replace('\\', '/', ...)]] | [[Models/PostRepository]] |
| [[__DIR__ . '/src/' . ... . '.php']] | [[/iv/src/Models/PostRepository.php]] |

و [[__DIR__]] = فولدر الملف ده، عشان المسار ميعتمدش على المكان اللي شغّلت منه.

## ٤. حمّله لو موجود

~~~php
if (is_file($file)) require $file;
~~~

لو مش موجود متعملش [[require]] (كان هيرمي Error بتاعه)، سيب PHP يكمّل لحد ما يقول Class not found.

---

## ٥. اتجرّب: الدالة بتتنادى إمتى؟

~~~text الناتج
after use
bool(false)
autoload: App\Models\PostRepository
  -> /iv/src/Models/PostRepository.php
post 1
autoload: App\Models\Missing
  -> /iv/src/Models/Missing.php
bool(false)
autoload: Vendor\Thing
bool(false)
autoload: App\Models\Missing
  -> /iv/src/Models/Missing.php

Fatal error: Uncaught Error: Class "App\Models\Missing" not found
~~~

| السطر في السكربت | حصل autoload؟ |
|---|---|
| [[use App\Models\Nope;]] | لأ: [[use]] اسم مستعار وقت الترجمة بس |
| [[new stdClass instanceof App\Models\Other]] | لأ: [[instanceof]] بيرجّع false على طول لو الكلاس مش متحمّل |
| [[new App\Models\PostRepository()]] أول مرة | أيوه، والملف اتحمّل |
| نفس الـ [[new]] تاني مرة | لأ: الكلاس متعرّف خلاص |
| [[class_exists('App\Models\Missing')]] | أيوه، ملقاش الملف، فرجّع false |
| [[class_exists('Vendor\Thing')]] | أيوه، والدالة رجعت عند الـ prefix |
| [[new App\Models\Missing()]] | أيوه، ومفيش ملف، فـ Class not found |

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[spl_autoload_register(fn)]] | الدالة تتنادى أول ما كلاس ناقص يتستخدم |
| PSR-4 | prefix الـ namespace ← فولدر، والباقي ← مسار الملف |
| [[use]] | مبيحمّلش حاجة |
| أول استخدام حقيقي ([[new]] و static و [[class_exists]]) | التحميل بيحصل هنا، مرة واحدة |
| الدوال | ملهاش autoload: [[files]] في [[composer.json]] أو [[require]] |

وعلى Linux اسم الملف لازم يطابق اسم الكلاس بالـ case بالظبط.`,
          lines: [
            "بداية الملف.",
            "سجّل دالة PHP هينادي عليها لما كلاس ميبقاش موجود.",
            R`الـ namespace اللي بنتعامل معاه (App\\).`,
            "كلاس من namespace تاني: مش شغلنا.",
            R`App\Models\PostRepository ← src/Models/PostRepository.php.`,
            "لو الملف موجود حمّله.",
            "قفلة.",
            "الكلاس اتحمّل لوحده هنا."
          ],
          sol: R`الصفحة بتشتغل زي ما كانت بـ Composer. لو ضفت [[echo]] جوه الدالة هتشوف إنها بتتنادى مرة لكل كلاس أول ما يتستخدم: [[App\Models\PostRepository → src/Models/PostRepository.php]] وبعدين [[App\Controllers\PostController → src/Controllers/PostController.php]]، ومبتتناداش تاني لنفس الكلاس.

الـ autoloader بيحمّل الكلاسات بس، فملفات الدوال ([[helpers.php]] فيه [[view]] و [[e]]، و [[db.php]]) لازم [[require]] بإيدك، وده اللي [[files]] في [[composer.json]] بيعمله. لو نسيتها هتاخد [[Call to undefined function view()]]. ولو اسم الكلاس ملوش ملف ([[Class "App\..." not found]])، الدالة بترجع من غير ما تعمل حاجة و PHP بيجرب الـ autoloader اللي بعدها.`,
          solCode: R`<?php
spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) return;
    $file = __DIR__ . '/src/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    if (is_file($file)) require $file;
});
require __DIR__ . '/src/helpers.php'; // الدوال مش بتتعمل autoload
require __DIR__ . '/src/db.php';
$c = new App\Controllers\PostController(new App\Models\PostRepository());
echo $c->show(1);`
        },
        {
          cmd: "عقد، أساس، نسخ",
          title: "الفرق بين interface و abstract class و trait؟",
          desc: R`الـ interface عقد: أسماء methods من غير تنفيذ، والكلاس يقدر ينفّذ أكتر من واحد، وبستخدمه كنوع في الـ parameters عشان أبدّل التنفيذ (بوابة دفع حقيقية أو fake في الاختبار). الـ abstract class أساس مشترك: فيه كود و properties و methods ناقصة لازم الابن يكمّلها، والكلاس يورث من واحد بس. الـ trait مش نوع خالص: كود بيتنسخ جوه الكلاس وقت الـ compile، لمشاركة methods بين كلاسات ملهاش علاقة ببعض.

القاعدة عندي: interface للعقد والنوع، و abstract لما فيه كود مشترك حقيقي بين أنواع من نفس العيلة، و trait لسلوك صغير بيتكرر، والتركيب (object جوه object) قبل الوراثة.`,
          example: R`<?php
interface Notifier { public function send(string $to, string $msg): void; }
trait Logs { protected function log(string $m): void { echo "[log] $m\n"; } }
abstract class BaseNotifier implements Notifier { use Logs; }
final class SmsNotifier extends BaseNotifier {
    public function send(string $to, string $msg): void { $this->log("sms to $to"); }
}
$n = new SmsNotifier();
var_dump($n instanceof Notifier, $n instanceof BaseNotifier, $n instanceof Logs);`,
          try: R`شغّله: [[true]] و [[true]] و [[false]]، الـ trait مش نوع. وحاول [[new BaseNotifier()]]: ممنوع.`,
          flag: "script",
          deep: {
            why: "سؤال تصميم كلاسيكي: بيختبر إمتى تستخدم كل أداة، مش تعريفاتهم بس.",
            how: R`interface: methods عامة بس، و constants، ومن PHP 8.4 ينفع يطلب properties بـ hooks ([[public string $name { get; }]]). مفيش state.

abstract class: أي visibility، و constructor، و properties، و methods كاملة و abstract. وراثة واحدة.

trait: copy-paste وقت الـ compile، فيه properties و methods و abstract methods. التعارض بـ [[insteadof]] و [[as]]. مبيتفحصش كنوع.

الوراثة بتربط الابن بتفاصيل الأب (تغيير في الأب بيكسر الأبناء). التركيب بيخلي الكلاس ياخد object بينفّذ interface في الـ constructor، وده اللي بيخلي الاختبار والتبديل سهل (SOLID: dependency inversion).`,
            when: "أسئلة بعدها: «multiple inheritance في PHP؟» «trait conflicts؟» «composition over inheritance يعني إيه؟» «interface فيه properties؟»",
            mistakes: R`«trait زي interface». و«abstract class زي interface بس فيه كود» من غير ذكر الوراثة الواحدة. وتعمل abstract base لكل حاجة.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

٣ أدوات في ٤ سطور: interface (عقد)، و trait (كود بيتنسخ)، و abstract class (أساس بيجمعهم)، وكلاس حقيقي بيورث الأساس. وفي الآخر بنسأل الـ object «انت من نوع إيه؟».

اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]]).

---

## ١. [[interface Notifier]]

~~~php
interface Notifier { public function send(string $to, string $msg): void; }
~~~

اسم method وأنواعها من غير جسم (مفيش [[{}]]، فيه [[;]]). أي كلاس يقول [[implements Notifier]] لازم يكتب [[send]] بنفس الشكل.

## ٢. [[trait Logs]]

~~~php
trait Logs { protected function log(string $m): void { echo "[log] $m\n"; } }
~~~

method كاملة. الـ trait مش كلاس ومش نوع: [[use Logs;]] جوه كلاس معناها «انسخ الكود ده هنا».

## ٣. [[abstract class BaseNotifier]]

~~~php
abstract class BaseNotifier implements Notifier { use Logs; }
~~~

- [[abstract]] = مينفعش يتعمل منه object.
- [[implements Notifier]] من غير ما يكتب [[send]]: مسموح لأنه abstract، والابن هو اللي لازم يكمّل.
- [[use Logs;]] فـ [[log()]] بقت method فيه.

## ٤. [[final class SmsNotifier]]

~~~php
final class SmsNotifier extends BaseNotifier {
    public function send(string $to, string $msg): void { $this->log("sms to $to"); }
}
~~~

[[final]] = محدش يورث منه. و [[extends]] وراثة من أب واحد بس. و [[send]] بتنادي [[$this->log]] اللي جت من الـ trait (و [[protected]] = متاحة جوه الكلاس وأبناؤه).

## ٥. أنهي نوع؟

~~~php
$n = new SmsNotifier();
var_dump($n instanceof Notifier, $n instanceof BaseNotifier, $n instanceof Logs);
~~~

~~~text الناتج
bool(true)
bool(true)
bool(false)
~~~

[[instanceof]] بيسأل «الـ object ده من النوع ده؟». الـ interface والأب أنواع، الـ trait لأ. و [[$n->send('0100', 'hi')]] طبعت [[[log] sms to 0100]].

---

## ٦. حاجات اتجربت

| الكود | الناتج |
|---|---|
| [[new BaseNotifier()]] | [[Error: Cannot instantiate abstract class BaseNotifier]] |
| دالة باراميترها [[Logs $l]] وبعتنالها [[$n]] | [[TypeError: ... must be of type Logs, SmsNotifier given]] |
| [[class_uses($n)]] | [[Array ( )]] فاضية |
| [[class_uses(BaseNotifier::class)]] | [[[Logs] => Logs]] |
| [[class_implements($n)]] | [[[Notifier] => Notifier]] |

- الـ TypeError بيأكد إن الـ trait مينفعش يبقى type.
- [[class_uses]] بتشوف الكلاس نفسه بس مش أبوه، عشان كده فاضية على [[SmsNotifier]].
- [[class_implements]] بتشوف الوراثة كلها، فلقت [[Notifier]] من الأب.

---

## الخلاصة

| | interface | abstract class | trait |
|---|---|---|---|
| فيه كود؟ | لأ (توقيعات بس) | أيوه، وناقص | أيوه |
| نوع ([[instanceof]] و type hint)؟ | أيوه | أيوه | لأ |
| كام واحد للكلاس؟ | كتير ([[implements A, B]]) | واحد ([[extends]]) | كتير ([[use A, B]]) |
| يتعمل منه object؟ | لأ | لأ | لأ |
| إمتى | عقد تبدّل تنفيذه | أساس مشترك لعيلة واحدة | سلوك صغير بيتكرر |`,
          lines: [
            "بداية الملف.",
            "العقد.",
            "كود بيتنسخ.",
            "أساس بينفّذ العقد وبياخد الـ trait.",
            "كلاس حقيقي.",
            "التنفيذ، وبيستخدم method من الـ trait.",
            "قفلة.",
            "object.",
            "true و true و false."
          ],
          sol: R`الناتج [[bool(true) bool(true) bool(false)]]: الـ object نوعه [[Notifier]] و [[BaseNotifier]]، إنما [[Logs]] مش نوع. الـ trait اتنسخ جوه الكلاس وخلاص، فمينفعش تكتب [[function x(Logs $l)]]. و [[new BaseNotifier()]]: [[Error: Cannot instantiate abstract class BaseNotifier]].

الإجابة النموذجية: interface = عقد من غير كود ([[implements]] كذا واحد). abstract class = أساس فيه كود وحالة، وراث واحد بس، ومينفعش يتعمل منه object. trait = كود بيتنسخ في كذا كلاس ملهمش علاقة ببعض، من غير نوع. ولو عايز تعرف الـ traits: [[class_uses($n)]] بيرجّع array فاضي لأنها بتشوف الكلاس نفسه بس، و [[class_uses(BaseNotifier::class)]] فيها [[Logs]].`
        },
        {
          cmd: "PDO لأغلب المشاريع",
          title: "PDO ولا mysqli؟ (PDO vs mysqli)",
          desc: R`الاتنين بيدعموا prepared statements ومحدّثين. mysqli خاص بـ MySQL و MariaDB وفيه حاجات خاصة بيهم (زي [[multi_query]] والـ async queries)، وكان الأسهل للنقل من دوال [[mysql_*]] القديمة. PDO واجهة واحدة لأغلب القواعد (MySQL و PostgreSQL و SQLite و SQL Server...)، وفيه named placeholders ([[:email]])، و fetch modes مريحة، و exceptions افتراضي من PHP 8.

فأنا بختار PDO لأي مشروع جديد. وفي مشروع قديم كان mysqli مع escape ولزق نصوص، والتحويل لـ prepared statements (بأي واحدة فيهم) كان أهم إصلاح أمني.`,
          example: R`<?php
$stmt = $mysqli->prepare('SELECT id, name FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt = $pdo->prepare('SELECT id, name FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();`,
          try: R`اكتب نفس الـ INSERT بالاتنين وقارن عدد السطور. وجرّب في mysqli شكل PHP 8.1: [[$stmt->execute([$email])]] من غير [[bind_param]].`,
          flag: "script",
          deep: {
            why: "بيختبر إذا كنت فاهم الخيارات، وإذا كنت عارف إن الأمان مش في اختيار المكتبة، في استخدام prepared statements.",
            how: R`الفجوة قلّت: من PHP 8.1، [[mysqli_stmt::execute]] بيقبل array قيم، و 8.2 فيه [[mysqli_execute_query($sql, $params)]] في سطر. بس mysqli لسه placeholders بالترتيب [[?]] بس.

PDO بيسهّل تغيير القاعدة من ناحية الكود (نفس الدوال)، بس SQL نفسه بيختلف بين MySQL و Postgres ([[AUTO_INCREMENT]]، [[RETURNING]]، الـ upsert)، فالتغيير مش ببلاش.

الاتنين فوق نفس الـ driver ([[mysqlnd]]) لـ MySQL، فالأداء تقريبًا واحد.`,
            when: "أسئلة بعدها: «ORM ولا SQL مباشر؟» «PDO بيخليك تغيّر القاعدة بسهولة؟» «persistent connections؟» «EMULATE_PREPARES إيه؟»",
            mistakes: R`«mysqli مش بيدعم prepared statements». و«PDO بيخليك تغيّر القاعدة من غير أي تعديل». و«PDO آمن لوحده» (لو لزقت نصوص في [[query()]] نفس الثغرة).`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

نفس الـ SELECT مرتين: مرة بـ mysqli (٤ سطور) ومرة بـ PDO (٣ سطور). الاتنين prepared statements، والفرق في الشكل: placeholder بالترتيب [[?]] مقابل بالاسم [[:email]].

اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]] اتسطّب فيه [[mysqli]] و [[pdo_mysql]] بـ [[docker-php-ext-install]]) و MySQL 8.4، على جدول [[users]] فيه منى (id 1) و Omar (id 2)، و [[$email = 'mona@example.com']].

---

## ١. mysqli

~~~php
$stmt = $mysqli->prepare('SELECT id, name FROM users WHERE email = ?');
~~~

[[$mysqli]] الاتصال (اتعمل بـ [[new mysqli(host, user, pass, db)]] زي الـ solCode). و [[?]] خانة بالترتيب. و [[->]] = نادي method على object.

~~~php
$stmt->bind_param('s', $email);
~~~

اربط المتغير بالخانة. أول باراميتر نص فيه حرف لكل [[?]] بيقول نوعها: [[s]] string، و [[i]] integer، و [[d]] double، و [[b]] blob. و [[bind_param]] بياخد المتغير **بالمرجع** (by reference)، فلازم متغير مش قيمة مكتوبة.

~~~php
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
~~~

[[get_result()]] بيرجّع النتيجة (محتاج driver [[mysqlnd]]، وده الافتراضي)، و [[fetch_assoc()]] صف كـ array بأسماء الأعمدة.

~~~text الناتج (print_r($user))
Array
(
    [id] => 1
    [name] => منى
)
~~~

## ٢. PDO

~~~php
$stmt = $pdo->prepare('SELECT id, name FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
~~~

- [[:email]] خانة بالاسم، والقيمة في [[execute]] كـ array بنفس الاسم. مفيش سلسلة أنواع.
- [[fetch()]] صف، وشكله array بالأسماء لأن الاتصال معمول بـ [[PDO::FETCH_ASSOC]] كـ default.

~~~text الناتج
Array
(
    [id] => 1
    [name] => منى
)
~~~

نفس النتيجة.

---

## ٣. الـ try: أشكال mysqli الأحدث

~~~php
$stmt->execute([$email]);                                              // PHP 8.1
$mysqli->execute_query('SELECT id, name FROM users WHERE email = ?', [$email2]);  // PHP 8.2
~~~

الاتنين اشتغلوا من غير [[bind_param]]، والتاني prepare و execute في سطر:

~~~text الناتج (execute_query مع omar@example.com)
Array
(
    [id] => 2
    [name] => Omar
)
~~~

بس mysqli لسه مبيفهمش الأسماء. جرّبنا [[:email]] فيه:

~~~text الناتج
mysqli_sql_exception: You have an error in your SQL syntax; ... near ':email' at line 1
~~~

## ٤. الـ solCode: INSERT بالاتنين

| | mysqli | PDO |
|---|---|---|
| الخانات | [[VALUES (?, ?, ?)]] | [[VALUES (:email, :name, :hash)]] |
| القيم | [[bind_param('sss', $email, $name, $hash)]] ثم [[execute()]] | [[execute(['email' => ..., ...])]] |
| الـ id الجديد | [[$mysqli->insert_id]] | [[$pdo->lastInsertId()]] |
| اللي رجع | [[1]] (int) | [[string(1) "2"]] (نص) |

و [[mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT)]] في أول الـ solCode بيخلي mysqli يرمي exceptions (الافتراضي من PHP 8.1 أصلًا). و PDO بيرمي exceptions افتراضي من PHP 8.0.

و PDO نفس الكود لقواعد تانية: [[PDO::getAvailableDrivers()]] في الـ container ده طلّع [[sqlite]] و [[mysql]]، فنفس الدوال كانت شغالة على SQLite في دروس تانية.

---

## الخلاصة

| | mysqli | PDO |
|---|---|---|
| القواعد | MySQL و MariaDB بس | MySQL و PostgreSQL و SQLite و غيرهم |
| الـ placeholders | [[?]] بس | [[?]] أو [[:name]] |
| ربط القيم | [[bind_param('sss', ...)]]، أو array من 8.1، أو [[execute_query]] من 8.2 | [[execute([...])]] |
| prepared statements | أيوه | أيوه |

الأمان مش في المكتبة: الاتنين آمنين بـ prepared، والاتنين فيهم ثغرة لو لزقت نصوص في الـ SQL.`,
          lines: [
            "بداية الملف.",
            "mysqli: placeholder بالترتيب.",
            "اربط القيمة ونوعها (s = string).",
            "نفّذ.",
            "هات الصف.",
            "PDO: placeholder بالاسم.",
            "القيمة في execute.",
            "هات الصف."
          ],
          sol: R`الـ INSERT بـ mysqli: [[prepare]] بـ [[?]]، وبعدين [[bind_param('sss', $email, $name, $hash)]] (حرف لكل قيمة: s نص، i رقم)، وبعدين [[execute]]، و [[$mysqli->insert_id]]. بـ PDO: [[prepare]] بـ [[:email]]، و [[execute(['email' => ...])]]، و [[lastInsertId()]]. سطر أقل، ومفيش سلسلة أنواع تلخبطها.

شكل PHP 8.1: [[$stmt->execute([$email])]] من غير [[bind_param]] شغال، و [[get_result()->fetch_assoc()]] بيرجّع [[[id] => 6, [name] => منى]]. ومن 8.2 فيه كمان [[$mysqli->execute_query($sql, [$email])]] في سطر واحد. يعني الفرق في الطول قلّ، والفرق الحقيقي: PDO بيشتغل مع MySQL و Postgres و SQLite بنفس الكود، وفيه named placeholders و fetch modes أكتر. mysqli لو محتاج حاجة خاصة بـ MySQL بس.`,
          solCode: R`<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli('127.0.0.1', 'myapp_user', 'YOUR_DB_PASSWORD', 'myapp');
$mysqli->set_charset('utf8mb4');
$stmt = $mysqli->prepare('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $email, $name, $hash);
$stmt->execute();
echo $mysqli->insert_id, "\n";

$stmt = $pdo->prepare('INSERT INTO users (email, name, password_hash) VALUES (:email, :name, :hash)');
$stmt->execute(['email' => $email, 'name' => $name, 'hash' => $hash]);
echo $pdo->lastInsertId(), "\n";`
        },
        {
          cmd: "PHP 8 → 8.5",
          title: "إيه أهم الحاجات اللي اتضافت في PHP 8؟",
          desc: R`PHP 8 خلّى اللغة أقرب لـ TypeScript. 8.0: named arguments و [[match]] و nullsafe [[?->]] و union types و constructor promotion و JIT، ومقارنات النص-رقم بقت أعقل. 8.1: enums و readonly properties و [[never]] و first-class callables. 8.2: readonly classes، والـ dynamic properties بقت deprecated. 8.3: typed class constants و [[json_validate]] و [[#[\Override]]]. 8.4: property hooks و asymmetric visibility ([[public private(set)]]) و [[array_find]] و [[new Foo()->bar()]] من غير أقواس، والـ bcrypt cost بقى 12. و 8.5 (نوفمبر 2025) جاب pipe operator [[|>]].

الأهم في الشغل اليومي: الأنواع في كل مكان مع [[strict_types]]، و enums بدل نصوص، و readonly للـ value objects، و [[match]] بدل [[switch]].`,
          example: R`<?php
enum Role: string { case Admin = 'admin'; case User = 'user'; }
final class Account {
    public function __construct(public readonly string $email, public private(set) Role $role = Role::User) {}
    public function promote(): void { $this->role = Role::Admin; }
}
$a = new Account(email: 'ali@example.com');
$a->promote();
echo $a->role->value, ' ', $a?->email, ' ', array_find([3, 8, 12], fn($n) => $n > 5);`,
          try: R`عدّ كام ميزة من PHP 8.x في المثال (فيه ٧ على الأقل)، وحدد كل واحدة نزلت في أنهي نسخة.`,
          flag: "script",
          deep: {
            why: "بيختبر إذا كنت متابع اللغة وبتكتب PHP حديث، مش PHP 5 بتاع الدروس القديمة.",
            how: R`الميزات في المثال: enum (8.1)، و constructor promotion (8.0)، و readonly (8.1)، و [[private(set)]] (8.4)، و named argument (8.0)، و [[?->]] (8.0)، و [[array_find]] (8.4)، و arrow function (7.4 بس بتتعد).

الحاجات اللي اتشالت أو بقت deprecated مهمة كمان: dynamic properties (8.2)، و [[$__{var}]] جوه النصوص (8.2)، و implicitly nullable parameters (8.4).

JIT: بيفرق في الحسابات التقيلة، ونادرًا في موقع ويب أغلب وقته مستني القاعدة. ومقفول افتراضيًا من الأول (قبل 8.4 لأن [[opcache.jit_buffer_size]] كان 0، ومن 8.4 لأن [[opcache.jit=disable]])، فلو عايزه لازم تفعّله بنفسك.

والنسخة اللي على السيرفر هي اللي بتحكم: كود 8.4 على استضافة 8.2 بيقع. [[php -v]] على السيرفر قبل ما تستخدم ميزة جديدة، و [[platform.php]] في Composer.`,
            when: "أسئلة بعدها: «readonly ولا private(set)؟» «JIT بيفرق؟» «إيه اللي بقى deprecated؟» «بتشتغل على نسخة كام في الإنتاج وليه؟»",
            mistakes: R`تخلط النسخ (enums في 8.0). و«JIT خلّى PHP أسرع ٣ مرات في الويب». وتذكر ميزات من غير ما تقول بتستخدمها في إيه.`
          },
          teach: R`## الأول: الكود ده بيعمل إيه؟

كلاس [[Account]] صغير فيه إيميل مينفعش يتغيّر، و role محدش يغيّره غير الكلاس نفسه، وبعدين بيرقّي الحساب ويطبع. وكل سطر فيه ميزة أو اتنين من PHP 8.0 لـ 8.4.

اتشغّل على PHP 8.4.26 (container [[php:8.4-cli]]). وجملة «على 8.3 هتاخد Parse error» من الـ docs (معندناش 8.3 نجرّب عليه).

---

## ١. [[enum]] (8.1)

~~~php
enum Role: string { case Admin = 'admin'; case User = 'user'; }
~~~

- [[enum]] نوع ليه قيم محددة بس، بدل نصوص [['admin']] متفرقة في الكود.
- [[: string]] = backed enum: كل [[case]] ليه قيمة نصية تتخزن في القاعدة.
- [[Role::from('admin')]] رجّع [[enum(Role::Admin)]]، و [[Role::tryFrom('root')]] رجّع [[NULL]] (و [[from]] بقيمة غلط بترمي Error).

## ٢. [[final class]] والـ constructor

~~~php
final class Account {
    public function __construct(public readonly string $email, public private(set) Role $role = Role::User) {}
~~~

ده سطر فيه ٤ ميزات:

| الحتة | الميزة | النسخة |
|---|---|---|
| [[public ... $email]] جوه أقواس الـ constructor | constructor promotion: property وتتملى في نفس السطر | 8.0 |
| [[readonly]] | تتكتب مرة واحدة (في الـ constructor) | 8.1 |
| [[public private(set)]] | asymmetric visibility: القراية public والكتابة من جوه الكلاس بس | 8.4 |
| [[= Role::User]] | enum كقيمة افتراضية | 8.1 |

و [[final]] (قديمة) = محدش يورث الكلاس.

## ٣. [[promote()]]

~~~php
public function promote(): void { $this->role = Role::Admin; }
~~~

جوه الكلاس، فالكتابة مسموحة رغم [[private(set)]].

## ٤. الاستخدام

~~~php
$a = new Account(email: 'ali@example.com');
$a->promote();
echo $a->role->value, ' ', $a?->email, ' ', array_find([3, 8, 12], fn($n) => $n > 5);
~~~

- [[email: '...']] named argument (8.0): بالاسم مش بالترتيب، و [[role]] أخد الافتراضي.
- [[$a->role->value]] القيمة النصية للـ enum: [[admin]].
- [[$a?->email]] nullsafe (8.0): لو [[$a]] null رجّع null من غير خطأ.
- [[array_find(array, fn)]] (8.4): أول عنصر الدالة ترجّع له true. و [[fn($n) => $n > 5]] arrow function (7.4).

~~~text الناتج
admin ali@example.com 8
~~~

8 أول رقم أكبر من 5.

## ٥. الحماية اتجربت

~~~php
$a->role = Role::User;
$a->email = 'x';
~~~

~~~text الناتج
Error: Cannot modify private(set) property Account::$role from global scope
Error: Cannot modify readonly property Account::$email
~~~

[[role]] ممنوع من برّه بس، و [[email]] ممنوع من أي مكان بعد الـ constructor.

## ٦. الـ JIT

~~~text الناتج (ini_get على نفس الـ container)
opcache.jit = disable
opcache.jit_buffer_size = 64M
~~~

في 8.4 الـ buffer بقى له قيمة، بس [[opcache.jit=disable]]، يعني الـ JIT مقفول افتراضيًا ولازم تفعّله بنفسك.

---

## الخلاصة

| الميزة في المثال | النسخة |
|---|---|
| constructor promotion، named arguments، [[?->]] | 8.0 |
| enum، [[readonly]]، enum كقيمة افتراضية | 8.1 |
| [[private(set)]]، [[array_find]] | 8.4 |
| arrow function [[fn]] | 7.4 (مش من 8) |

النسخة اللي على السيرفر هي اللي بتحكم: أول ميزة 8.4 في ملف على 8.3 بتوقّف الملف كله.`,
          lines: [
            "بداية الملف.",
            "enum بقيم نصية.",
            "كلاس ممنوع الوراثة منه.",
            "promotion و readonly و asymmetric visibility في سطر.",
            "الكلاس بس يغيّر الـ role.",
            "قفلة.",
            "named argument.",
            "ترقية.",
            "«admin ali@example.com 8»."
          ],
          sol: R`الناتج [[admin ali@example.com 8]]. الميزات: enum بقيمة نصية [[enum Role: string]] (8.1)، constructor promotion (8.0)، [[readonly]] (8.1)، [[private(set)]] asymmetric visibility (8.4)، enum كقيمة افتراضية [[= Role::User]] (8.1)، named arguments [[email:]] (8.0)، nullsafe [[?->]] (8.0)، [[array_find]] (8.4). دول 8.

الـ arrow function [[fn($n) => ...]] مش من 8، نزلت في 7.4، و [[: void]] من 7.1، و [[final]] قديمة خالص. لو حسبتهم يبقى عندك غلطة وهي بالظبط اللي الانترفيور بيدوّر عليها. ولو شغّلته على 8.3 هتاخد Parse error عند [[private(set)]]، لأن أول ميزة 8.4 بتوقف الملف كله.`
        }
      ]
    }
]);
