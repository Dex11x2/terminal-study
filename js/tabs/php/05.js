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
setcookie('lang', 'ar', ['expires' => time() + 86400 * 30, 'path' => '/', 'samesite' => 'Lax']);
echo $_COOKIE['lang'] ?? 'لسه (الكوكي بتوصل من الطلب الجاي)';
session_start();
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
          lines: [
            "بداية الملف.",
            "كوكي لغة لمدة ٣٠ يوم.",
            "أول طلب: لسه مش موجودة.",
            "ابدأ جلسة.",
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
