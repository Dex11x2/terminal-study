// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "الأمان والأداء و Laravel",
      l: 3,
      n: "مراجعة أمان قبل أي deploy، و OPcache للسرعة، وإمتى تسيب PHP الخام لـ Laravel",
      items: [
        {
          cmd: "security checklist",
          title: "راجع مشروع PHP قبل ما يطلع: أشهر الثغرات في دقيقة",
          desc: R`الثغرات المشهورة في PHP وحماية كل واحدة: SQL injection ← prepared statements. XSS ← [[e()]] على كل طباعة. CSRF ← token في كل POST. session fixation ← [[session_regenerate_id(true)]] عند الدخول. file inclusion ← عمرك ما تعمل [[include]] لاسم جاي من المستخدم. رفع ملفات ← finfo واسم عشوائي وبره الـ webroot. وكمان: الأسرار بره git، و [[display_errors]] مقفول.

الأوامر دي بتدوّر على الأماكن المشبوهة في مشروع قديم في ثواني. كل نتيجة مش أكيد ثغرة، بس لازم تبصلها.`,
          example: R`grep -rnE '(mysqli_query|->query)\(.*\$' --include='*.php' .
grep -rnE 'echo\s+\$_(GET|POST|REQUEST|COOKIE)' --include='*.php' .
grep -rnE '(include|require)(_once)?\s*\(?\s*\$_' --include='*.php' .
grep -rnE '\b(md5|sha1)\(' --include='*.php' .
grep -rnE '\b(uniqid|rand|mt_rand)\(' --include='*.php' .
grep -rLE 'csrf' --include='*.php' admin/
git ls-files | grep -E 'config\.php$|\.env$'`,
          try: R`شغّلهم على مشروع PHP قديم عندك، واعمل جدول: الملف، والسطر، ونوع المشكلة، والتصليح. ابدأ بالـ SQL لأنه الأخطر.`,
          deep: {
            why: "أغلب مواقع PHP اللي بتتخترق مش بسبب حاجة معقدة: query ملزوق، أو فولدر رفع بينفّذ PHP، أو باسورد في git. قايمة ثابتة بتراجعها قبل كل إطلاق بتقفل ٩٠٪ من ده.",
            how: R`file inclusion (LFI): [[include "pages/" . $_GET['p'] . ".php"]] ومستخدم يبعت [[?p=../../config]] فيتحمّل ملف إعداداتك، أو ملف log فيه كود حطه هو. الحل allowlist: [[$pages = ['home' => 'home.php', 'about' => 'about.php'];]] وتختار منها، ولو مش موجود 404. وتحميل ملفات من روابط ([[allow_url_include]]) مقفول افتراضيًا، سيبه مقفول.

open redirect: [[header('Location: ' . $_GET['next'])]] بيخلي لينك موقعك يودّي لموقع تصيّد. اقبل مسار بيبدأ بـ [[/]] والحرف التاني مش [[/]] ولا [[\]]، ومفيهوش tab ولا أي control character: المتصفح بيعامل [[/\evil.com]] زي [[//evil.com]]، وبيشيل الـ tab من الرابط فـ [[/%09/evil.com]] يبقى [[//evil.com]] برضه. والأحسن allowlist للمسارات المسموحة.

عشوائية ضعيفة: [[rand]] و [[mt_rand]] و [[uniqid]] متتخمنش بسهولة للإنسان بس سهلة للمهاجم. أي token أو اسم ملف أو كود: [[random_bytes]] أو [[random_int]].

المقارنات: [[==]] مع hashes أو tokens ممكن تعدّي حاجات غلط ([["0e1" == "0e2"]])؛ [[hash_equals]] للأسرار و [[===]] لأي حاجة تانية.

الصلاحيات: كل endpoint بيتحقق مين الطالب ومن حقه على العنصر ده ولا لأ (IDOR)، مش بس إن اللينك مستخبي.

وطبقات فوق الكود: HTTPS، و headers زي [[X-Content-Type-Options]] و [[Content-Security-Policy]] (تاب الأمان و Nginx)، و PHP نسخة لسه بتاخد تحديثات أمنية، و [[composer audit]].`,
            when: "قبل أول إطلاق، وقبل أي deploy كبير، ولما تستلم مشروع PHP قديم من حد تاني.",
            mistakes: R`في مشروع حقيقي المراجعة دي كانت هتطلّع في ساعة: queries بـ escape ولزق، وأكواد بـ [[rand()]]، وأسماء ملفات بـ [[uniqid()]]، وتوكن «افتكرني» متخزن زي ما هو، و endpoint بيرجّع نص غلطة القاعدة، وصفحة صور محمية بالـ Referer. ولا واحدة فيهم محتاجة هاكر محترف. والغلطة الأكبر: تعتبر نتايج grep هي كل الثغرات؛ هي البداية بس.`
          },
          teach: R`## المثال بيعمل إيه؟

٧ أوامر بتدوّر في كل ملفات [[.php]] على أشكال كود معروف إنها خطر. كل أمر سؤال: «فين بنلزق متغير في SQL؟»، «فين بنطبع اللي المستخدم بعته من غير escape؟»... وهكذا. عشان نشوف الناتج بجد عملنا مشروع قديم صغير فيه الغلطات دي (login.php و admin/delete.php و admin/edit.php و config.php و cache.php)، وشغّلنا الـ grep جوه Docker على [[ubuntu:24.04]] (GNU grep)، و [[git ls-files]] في صورة فيها git. ونفس الأوامر شغالة في Git Bash على ويندوز (جربنا ٢ و ٦ فيه وطلّعوا نفس النتيجة).

---

## ١. الحاجات المشتركة في كل أمر

~~~bash
grep -rnE 'PATTERN' --include='*.php' .
~~~

| الحتة | معناها |
|---|---|
| [[grep]] | دوّر على نص جوه ملفات |
| [[-r]] | recursive: الفولدر ده وكل اللي جواه |
| [[-n]] | اطبع رقم السطر |
| [[-E]] | Extended regex: [[( )]] و [[|]] و [[?]] شغالين من غير [[\]] |
| [[--include='*.php']] | ملفات PHP بس |
| [[.]] | ابدأ من الفولدر الحالي |
| [[' ']] | الـ pattern بين علامات تنصيص مفردة عشان الـ shell ميلمسش [[$]] |

وجوه الـ regex: [[\$]] يعني علامة [[$]] نفسها (من غير [[\]] معناها «آخر السطر»)، و [[.*]] أي حاجة، و [[\s]] مسافة، و [[\b]] حدود كلمة، و [[\(]] قوس عادي.

كل سطر في الناتج شكله [[الملف:رقم السطر:السطر نفسه]].

---

## ٢. SQL injection

~~~bash
grep -rnE '(mysqli_query|->query)\(.*\$' --include='*.php' .
~~~

يعني: [[mysqli_query(]] أو [[->query(]]، وبعدها في نفس السطر [[$]] (متغير جوه الـ query).

~~~text الناتج
./admin/delete.php:2:$db->query('DELETE FROM posts WHERE id = ' . $_POST['id']);
./login.php:2:$r = mysqli_query($conn, "SELECT * FROM users WHERE email = '$_POST[email]'");
~~~

الاتنين بيلزقوا بيانات المستخدم في نص الـ SQL. و [[cache.php]] فيه [[$db->query('SELECT id FROM posts')]] ومطلعش، لأن مفيش [[$]] بعد القوس. والتصليح: [[prepare]] + [[execute]].

---

## ٣. XSS

~~~bash
grep -rnE 'echo\s+\$_(GET|POST|REQUEST|COOKIE)' --include='*.php' .
~~~

[[echo]] وبعدها مسافة وبعدها [[$_GET]] أو [[$_POST]] أو [[$_REQUEST]] أو [[$_COOKIE]] على طول:

~~~text الناتج
./login.php:4:echo $_GET['msg'];
~~~

[[?msg=<script>...</script>]] هيتنفّذ في متصفح أي حد يفتح اللينك. التصليح: [[echo e($_GET['msg'] ?? '');]].

---

## ٤. file inclusion

~~~bash
grep -rnE '(include|require)(_once)?\s*\(?\s*\$_' --include='*.php' .
~~~

من الشمال: [[include]] أو [[require]]، و [[(_once)?]] يعني [[_once]] ممكن تيجي أو لأ، و [[\s*\(?\s*]] مسافات وقوس اختياري، وبعدين [[$_]] (أول [[$_GET]] وأخواتها):

~~~text الناتج
./login.php:5:include $_GET['page'] . '.php';
~~~

[[?page=../../config]] يحمّل ملف إعداداتك. التصليح: allowlist بأسماء الصفحات.

---

## ٥. hashing ضعيف

~~~bash
grep -rnE '\b(md5|sha1)\(' --include='*.php' .
~~~

~~~text الناتج
./cache.php:2:$key = md5($url);
./login.php:3:$hash = md5($_POST['password']); $token = uniqid();
~~~

هنا أول false positive: [[md5($url)]] مفتاح cache، مش باسورد، فمفيهوش مشكلة. أما [[md5]] على باسورد فلازم [[password_hash]]. عشان كده كل سطر تقراه بعينك.

---

## ٦. عشوائية ضعيفة

~~~bash
grep -rnE '\b(uniqid|rand|mt_rand)\(' --include='*.php' .
~~~

~~~text الناتج
./cache.php:4:$code = mt_rand(1000, 9999);
./login.php:3:$hash = md5($_POST['password']); $token = uniqid();
~~~

[[uniqid()]] مبني على الوقت، و [[mt_rand]] ممكن يتخمّن. أي token أو كود تأكيد: [[bin2hex(random_bytes(32))]] أو [[random_int(1000, 9999)]].

---

## ٧. فورمات أدمن من غير CSRF

~~~bash
grep -rLE 'csrf' --include='*.php' admin/
~~~

[[-L]] (كبيرة) عكس العادي: اطبع أسماء الملفات اللي **مفيهاش** الكلمة خالص. ومفيش [[-n]] لأن مفيش سطر نطبعه.

~~~text الناتج
admin/delete.php
~~~

[[admin/edit.php]] فيه [[csrf_ok()]] فمطلعش.

---

## ٨. أسرار في git

~~~bash
git ls-files | grep -E 'config\.php$|\.env$'
~~~

[[git ls-files]] بيطبع كل الملفات اللي git بيتابعها، والـ [[|]] (pipe) بيبعتها لـ [[grep]]. و [[\.]] نقطة عادية، و [[$]] هنا آخر السطر (الاسم بيخلص بكده).

~~~text الناتج
config.php
~~~

يعني الباسورد اللي في [[config.php]] موجودة في تاريخ git. التصليح: [[.gitignore]] + [[git rm --cached config.php]]، و**غيّر السر نفسه** لأنه لسه في الـ commits القديمة.

---

## الخلاصة

| # | بيدوّر على | لقى | التصليح |
|---|---|---|---|
| ١ | متغير جوه query | login.php:2 و admin/delete.php:2 | [[prepare]] + [[execute]] |
| ٢ | [[echo $_GET]] | login.php:4 | [[e()]] |
| ٣ | [[include $_GET]] | login.php:5 | allowlist |
| ٤ | [[md5]] و [[sha1]] | login.php:3 (و cache.php:2 مش مشكلة) | [[password_hash]] |
| ٥ | [[uniqid]] و [[rand]] | login.php:3 و cache.php:4 | [[random_bytes]] و [[random_int]] |
| ٦ | ملفات أدمن من غير csrf | admin/delete.php | token في كل POST |
| ٧ | أسرار في git | config.php | [[git rm --cached]] وغيّر السر |

الـ grep بداية مش نهاية. جربنا ملف فيه الحالتين دول: [[$db->query($sql);]] طلع، بس اللزق نفسه في سطر [[$sql = "..." . $_GET["id"];]] اللي فوقه لازم تروحله بإيدك. و [[$db->query(]] والـ SQL في السطر اللي تحته مطلعش خالص، لأن grep بيشوف سطر سطر.`,
          lines: [
            "queries فيها متغير جوه نص الـ SQL (مرشح لـ SQL injection).",
            "طباعة مباشرة لبيانات المستخدم من غير escape (XSS).",
            "include أو require لقيمة من المستخدم (file inclusion).",
            "hashing ضعيف (للباسورد: password_hash).",
            "عشوائية ضعيفة (للأسرار: random_bytes و random_int).",
            "ملفات الأدمن اللي مفيهاش كلمة csrf خالص.",
            "أسرار متتبعة في git."
          ],
          sol: R`على مشروع قديم الأوامر بتطلّع سطور بالشكل ده، وكل سطر يبقى صف في الجدول:

[[./login.php:2: mysqli_query($conn, "SELECT ... WHERE email = '$_POST[email]'")]]: SQL injection، التصليح prepared statement. [[./admin/delete.php:2: $db->query('DELETE ... id = ' . $_POST['id'])]]: نفس الحكاية. [[./login.php:4: echo $_GET['msg'];]]: XSS، التصليح [[e()]]. [[./login.php:5: include $_GET['page'] . '.php';]]: file inclusion، التصليح whitelist بأسماء الصفحات. [[md5(...)]] على باسورد: [[password_hash]]. [[uniqid()]] كـ token: [[bin2hex(random_bytes(32))]]. و [[grep -rL csrf admin/]] بيطلّع الملفات اللي مفيهاش كلمة csrf خالص، زي [[admin/delete.php]]. و [[git ls-files]] لو طلّع [[config.php]] يبقى السر في git، والتصليح [[git rm --cached]] وغيّر السر.

الـ grep بيطلّع false positives (مثلًا [[->query]] على نص ثابت مفيهوش input، أو [[md5]] لـ cache key مش باسورد)، فكل سطر اقراه بعينك. وغيابه مش ضمان: [[$db->query(]] والـ SQL في السطر اللي تحته مش هيظهر خالص، و [[$db->query($sql);]] بيظهر بس اللزق نفسه ([[$sql = "..." . $id;]]) في سطر تاني لازم تدوّر عليه، فدوّر كمان على [[\$sql\s*=.*\$_]] وافتح كل ملف فيه [[query]].`,
          solCode: R`| الملف:السطر        | المشكلة           | التصليح                                   |
|--------------------|-------------------|-------------------------------------------|
| login.php:2        | SQL injection     | prepare + execute(['email' => $email])    |
| admin/delete.php:2 | SQL injection     | prepare + (int) id + شرط user_id          |
| login.php:4        | XSS               | echo e($_GET['msg'] ?? '')                |
| login.php:5        | file inclusion    | match ($page) { 'home' => ..., ... }      |
| login.php:3        | md5 للباسورد      | password_hash / password_verify           |
| login.php:3        | uniqid كـ token   | bin2hex(random_bytes(32))                 |
| admin/delete.php   | مفيش CSRF         | csrf_ok() أول الملف                       |
| config.php         | سر في git         | .gitignore + git rm --cached + غيّر السر |`
        },
        {
          cmd: "OPcache",
          title: "خلّي PHP ميعيدش ترجمة الكود مع كل طلب",
          desc: R`كل طلب PHP بيقرا الملفات ويحوّلها لـ opcodes (تعليمات داخلية) وبعدين ينفّذها. OPcache بيحفظ الـ opcodes دي في الذاكرة المشتركة، فالطلبات اللي بعدها بتنفّذ على طول من غير ترجمة. غالبًا متفعّل على السيرفرات، والصفحة دي بتتأكد وتوريك الأرقام.

في الإنتاج ممكن تقفل فحص تاريخ الملفات ([[validate_timestamps=0]]) لسرعة أكتر، بس ساعتها لازم تعمل reload لـ PHP-FPM بعد كل deploy.`,
          example: R`<?php
if (!function_exists('opcache_get_status')) exit("OPcache مش متسطّب\n");
$s = opcache_get_status(false);
if ($s === false) exit("OPcache مقفول\n");
$st = $s['opcache_statistics'];
printf("scripts: %d\n", $st['num_cached_scripts']);
printf("hit rate: %.1f%%\n", $st['opcache_hit_rate']);
printf("memory used: %.1f MB\n", $s['memory_usage']['used_memory'] / 1048576);
printf("validate_timestamps: %s\n", ini_get('opcache.validate_timestamps'));`,
          try: R`شغّلها مرة من الترمنال [[php index.php]] (هتقول مقفول)، وبعدين [[php -S localhost:8000]] في نفس الفولدر (السيرفر المدمج بيتبع [[opcache.enable]] زي الويب، مش [[enable_cli]]؛ ولو طلّع «مش متسطّب» ضيف [[-d zend_extension=opcache]]) وافتح الصفحة كذا مرة: الـ hit rate بيطلع. وبعدين ارفعها على السيرفر، شوف الأرقام، وامسحها.`,
          flag: "script",
          deep: {
            why: "مشروع بـ Composer أو framework بيحمّل مئات الملفات في كل طلب. من غير OPcache كل طلب بيترجمهم من الأول، وده أغلب وقت الطلب في مشاريع كتير.",
            how: R`القيم الافتراضية: [[opcache.enable=1]] (للويب)، و [[opcache.enable_cli=0]] (عشان كده [[php index.php]] من الترمنال بيقولك مقفول، أما [[php -S]] فبيتبع [[opcache.enable]] زي الويب)، و [[memory_consumption=128]] ميجا، و [[max_accelerated_files=10000]]، و [[validate_timestamps=1]] مع [[revalidate_freq=2]]: كل ثانيتين بيبص على تاريخ الملف ولو اتغير يترجمه تاني.

مع [[validate_timestamps=0]] بيوفّر الفحص ده خالص، بس أي تعديل في الكود مش هيبان لحد ما تعمل [[sudo systemctl reload php8.4-fpm]] (الاسم حسب النسخة). و [[opcache_reset()]] من الترمنال مبيأثرش على FPM، لأن كل SAPI ليه ذاكرته.

لو الـ hit rate واطي أو الذاكرة مليانة: زوّد [[memory_consumption]] و [[max_accelerated_files]] (مشاريع Laravel الكبيرة بتعدّي 10000 ملف بسهولة).

JIT: من PHP 8.4 الافتراضي [[opcache.jit=disable]]. بيفيد الحسابات التقيلة، ونادرًا بيفرق في موقع أغلب وقته مستني القاعدة.

وباقي الأداء غالبًا مش في PHP: query من غير index، أو N+1، أو صور كبيرة. [[EXPLAIN]] على الـ queries البطيئة (تاب «SQL و Prisma»)، و cache للنتايج التقيلة (APCu أو Redis)، و [[composer install -o]].

على الاستضافة المشتركة OPcache في إيد الاستضافة، وغالبًا متفعّل. تشوفه من [[phpinfo()]] أو الصفحة دي.`,
            when: "مرة على كل سيرفر جديد تتأكد إنه شغال. وضبط [[validate_timestamps]] لما يكون عندك deploy script بيعمل reload.",
            mistakes: R`[[validate_timestamps=0]] من غير reload في الـ deploy: الكود الجديد اترفع والموقع شغال بالقديم، وتقعد ساعة تدوّر على bug مش موجود. وتسيب صفحة الحالة دي (أو [[phpinfo()]]) مرفوعة، وهي بتكشف إعدادات السيرفر.`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة صغيرة بتسأل OPcache عن حالته وتطبع ٤ أرقام: كام ملف محفوظ مترجم، ونسبة الطلبات اللي لقت الملف جاهز، والذاكرة المستخدمة، وهل بيفحص تاريخ الملفات. اتشغّلت جوه Docker على [[php:8.4-cli]]، من الترمنال ومن [[php -S]] (port 5912).

---

## ١. OPcache بيوفّر إيه؟

كل طلب PHP من غير OPcache بيعدّي على ٣ خطوات:

| الخطوة | بتعمل إيه |
|---|---|
| ١. قراية | يقرا ملف [[.php]] من الديسك |
| ٢. ترجمة (compile) | يحوّل الكود لـ opcodes: تعليمات صغيرة جوه PHP |
| ٣. تنفيذ | ينفّذ الـ opcodes |

OPcache بيحفظ ناتج الخطوة ٢ في shared memory (ذاكرة مشتركة بين كل عمليات PHP)، فالطلب الجاي بيروح على الخطوة ٣ على طول.

---

## ٢. هل هو موجود؟

~~~php
<?php
if (!function_exists('opcache_get_status')) exit("OPcache مش متسطّب\n");
~~~

[[function_exists]] بترجّع [[true]] لو الدالة متعرّفة. الدالة دي جاية من الـ extension، فلو مش موجودة يبقى OPcache مش متحمّل أصلًا. و [[exit("...")]] بيطبع الرسالة ويوقف.

في [[php:8.4-cli]] متحمّل جاهز: [[php -m]] بيطلّع [[Zend OPcache]]، ومتفعّل بملف [[docker-php-ext-opcache.ini]] في [[conf.d]].

---

## ٣. هل هو شغال؟

~~~php
$s = opcache_get_status(false);
if ($s === false) exit("OPcache مقفول\n");
~~~

[[opcache_get_status(false)]] بيرجّع array فيها كل حاجة، و [[false]] معناها «من غير لستة الملفات» (ممكن تبقى آلاف). ولو OPcache مقفول بترجّع [[false]].

من الترمنال [[php index.php]]:

~~~text الناتج
OPcache مقفول
~~~

ليه؟ القيم الافتراضية (طبعناها بـ [[ini_get]]):

~~~text الناتج
opcache.enable='1'
opcache.enable_cli='0'
opcache.memory_consumption='128'
opcache.max_accelerated_files='10000'
opcache.validate_timestamps='1'
opcache.revalidate_freq='2'
opcache.jit='disable'
~~~

[[enable]] للويب ([[1]])، و [[enable_cli]] للترمنال ([[0]])، لأن سكربت الترمنال بيشتغل مرة ويقفل، فمفيش طلب جاي يستفيد.

---

## ٤. الأرقام

~~~php
$st = $s['opcache_statistics'];
printf("scripts: %d\n", $st['num_cached_scripts']);
printf("hit rate: %.1f%%\n", $st['opcache_hit_rate']);
printf("memory used: %.1f MB\n", $s['memory_usage']['used_memory'] / 1048576);
printf("validate_timestamps: %s\n", ini_get('opcache.validate_timestamps'));
~~~

[[printf]] بيطبع نص بقالب: [[%d]] رقم صحيح، و [[%.1f]] رقم عشري برقم واحد بعد العلامة، و [[%s]] نص، و [[%%]] علامة [[%]] نفسها.

| المفتاح | معناه |
|---|---|
| [[num_cached_scripts]] | عدد الملفات المحفوظة مترجمة |
| [[opcache_hit_rate]] | hits ÷ (hits + misses) × 100. hit = لقى الملف جاهز، miss = ترجمه |
| [[used_memory]] | بالبايت، و [[÷ 1048576]] (يعني 1024 × 1024) يحوّلها ميجا |
| [[validate_timestamps]] | [[1]]: بيبص على تاريخ الملف عشان لو اتعدّل |

---

## ٥. من [[php -S]]

~~~bash
php -S localhost:8000
~~~

السيرفر المدمج اسمه [[cli-server]] مش [[cli]]، فبيتبع [[opcache.enable]] زي الويب. فتحنا الصفحة ٥ مرات:

~~~text الناتج
-- 1
scripts: 1
hit rate: 0.0%
memory used: 8.7 MB
-- 2
scripts: 1
hit rate: 50.0%
-- 3
hit rate: 66.7%
-- 4
hit rate: 75.0%
-- 5
hit rate: 80.0%
~~~

الحساب: أول طلب miss (ترجم الملف وحفظه)، والباقي hits. بعد ٥ طلبات: ٤ ÷ ٥ = 80%. ولو كملت هتقرّب من 100% ومش هتوصلها، لأن الـ miss الأولاني محسوب. و [[8.7 MB]] مش حجم الملف ده، دي الذاكرة اللي OPcache حاجزها لنفسه (بيانات داخلية) حتى قبل أي ملف.

---

## ٦. على سيرفر حقيقي

الصفحة دي بتترفع على السيرفر (PHP-FPM) وتتفتح من المتصفح، وبعدين **تتمسح** لأنها بتكشف إعدادات. الأرقام هناك (من الـ docs والتجربة العادية): مئات أو آلاف scripts مع framework، و hit rate فوق 99%.

و [[validate_timestamps]]:

| القيمة | بيحصل إيه | بعد الـ deploy |
|---|---|---|
| [[1]] (افتراضي) | كل [[revalidate_freq]] ثانية (2) بيبص على تاريخ الملف | التعديل بيبان لوحده خلال ثانيتين |
| [[0]] | مبيبصش خالص، أسرع شوية | لازم [[sudo systemctl reload php8.4-fpm]] وإلا الكود القديم يفضل شغال |

---

## الخلاصة

| الإعداد | الافتراضي | معناه |
|---|---|---|
| [[opcache.enable]] | 1 | الويب و [[php -S]] |
| [[opcache.enable_cli]] | 0 | [[php file.php]] من الترمنال |
| [[memory_consumption]] | 128 | ميجا للـ opcodes |
| [[max_accelerated_files]] | 10000 | أقصى عدد ملفات |
| [[validate_timestamps]] | 1 | يفحص التعديلات |
| [[jit]] | disable | JIT مقفول افتراضيًا من 8.4 |`,
          lines: [
            "بداية الملف.",
            "الإضافة مش متحمّلة أصلًا.",
            "الحالة من غير لستة الملفات.",
            "متحمّلة بس مقفولة (زي الترمنال).",
            "الإحصائيات.",
            "عدد الملفات المحفوظة مترجمة.",
            "نسبة الطلبات اللي لقت الملف جاهز.",
            "الذاكرة المستخدمة بالميجا.",
            "بيفحص تاريخ الملفات ولا لأ."
          ],
          sol: R`[[php index.php]] من الترمنال بيطبع [[OPcache مقفول]] لأن [[opcache.enable_cli=0]]. أما [[php -S localhost:8000]] (اتجرب على [[php:8.4-cli]]) فاسمه [[cli-server]] مش [[cli]]، وبيتبع [[opcache.enable=1]] زي الويب: أول طلب [[scripts: 1]] و [[hit rate: 0.0%]] (لسه بيترجم)، وبعدين 50% ثم 66.7% ثم 75% ثم 80%... الملف بقى في الذاكرة وكل طلب بعد كده hit. و [[memory used]] حوالي 9 MB، و [[validate_timestamps: 1]].

على السيرفر الحقيقي (PHP-FPM) الأرقام أكبر بكتير: مئات أو آلاف scripts لو فيه framework، و hit rate فوق 99%. لو أقل من كده بعد ما الموقع اشتغل شوية، غالبًا [[memory_consumption]] أو [[max_accelerated_files]] صغيرين. ولو طلّع [[OPcache مقفول]] من الترمنال ده طبيعي ([[enable_cli=0]])، افتحها من المتصفح. وامسح الصفحة بعدها لأنها بتكشف مسارات ملفاتك.`
        },
        {
          cmd: "php artisan",
          title: "إمتى تسيب PHP الخام وتروح لـ Laravel",
          desc: R`Laravel (النسخة 13 نزلت مارس 2026 ومحتاجة PHP 8.3 أو أحدث) بيدّيك جاهز كل اللي عملناه بإيدنا: router، و controllers، و ORM اسمه Eloquent، و migrations، و Blade بيعمل escape لوحده، و CSRF، وجلسات، و auth، و queues، وإيميل، و validation. و [[artisan]] أداة الترمنال بتاعته.

القاعدة: موقع فيه login وقاعدة ولوحة أدمن وإيميلات وأكتر من كام صفحة ← Laravel. صفحة هبوط، أو موقع صغير على استضافة مشتركة، أو سكربت ← PHP خام. واللي فهم التاب ده هيفهم Laravel بسرعة، لأن كل «سحر» فيه له مقابل هنا.`,
          example: R`composer create-project laravel/laravel myapp
cd myapp
php artisan make:model Post -mc
php artisan migrate
php artisan route:list
php artisan tinker
composer run dev`,
          try: R`اعمل مشروع، وموديل [[Post]] بـ migration و controller، وضيف في الـ migration [[$table->string('title');]]، وشغّل [[migrate]]. وفي [[tinker]]: [[App\Models\Post::create(['title' => 'أول بوست'])]]، هتاخد MassAssignmentException؛ اقرا ليه، وحلها بـ [[$fillable]].`,
          deep: {
            why: "مشروع حقيقي بـ PHP خام بيخليك تكتب router و CSRF و validation و migrations و queue بنفسك، وكل واحدة فيها مكان لغلطة أمنية. Laravel مجرّب على ملايين المشاريع ومتحدّث، فوقتك يروح في المشروع نفسه.",
            how: R`رحلة الطلب في Laravel هي نفس اللي عملناه: [[public/index.php]] (front controller) → [[bootstrap/app.php]] → middleware (جلسة، CSRF، auth) → router → controller → Eloquent → Blade view → response.

Routes في [[routes/web.php]]: [[Route::get('/posts/{post}', [PostController::class, 'show']);]]. و [[{post}]] مع [[show(Post $post)]] بيجيب البوست بالـ id لوحده أو 404 (route model binding).

Eloquent: كل جدول كلاس. [[Post::where('published', true)->latest()->paginate(10)]] بيبني prepared statement. والعلاقات [[$user->posts]]، و [[with('user')]] بيحل N+1.

Migrations: ملفات PHP بتوصف تغيير الجدول ([[Schema::create('posts', ...)]] و [[$table->id()]] و [[$table->timestamps()]])، و [[php artisan migrate]] بيطبّق اللي ماتطبقش، و [[migrate:rollback]] بيرجّع. ده الشكل الصح لسكربتات الـ migration اليدوية.

Blade: [[{{ $post->title }}]] بيعمل escape لوحده (نفس [[e()]])، و [[{!! $html !!}]] من غير escape (خطر)، و [[@csrf]] بيحط الـ token في الفورم.

الإعدادات في [[.env]]، والمشروع الجديد بيبدأ على SQLite؛ لـ MySQL غيّر [[DB_CONNECTION=mysql]] وباقي [[DB_*]]. و [[make:model Post -mc]]: موديل ومعاه migration و controller. و [[tinker]] REPL فيه كل كلاسات المشروع. و [[composer run dev]] بيشغّل السيرفر و Vite مع بعض.`,
            when: "مشروع هيكبر، أو فيه فريق، أو محتاج auth وأدوار وإيميلات و jobs. PHP الخام للصغير، وللتعلّم، وللسكربتات.",
            mistakes: R`تبدأ بـ Laravel قبل ما تفهم PHP نفسه، فكل حاجة تبان سحر ومش عارف تصلّح. وعلى الاستضافة تخلي الدومين يشاور على فولدر المشروع مش [[public]]، فـ [[.env]] بكل أسراره يبقى على رابط. و [[Post::create($request->all())]] من غير [[$fillable]]. و N+1 مع Eloquent في loop من غير [[with()]].`
          },
          teach: R`## المثال بيعمل إيه؟

٧ أوامر بتعمل مشروع Laravel جديد، وتضيف جدول بوستات بالموديل والـ controller بتاعه، وتطبّقه على القاعدة، وتجرّب الكود من الترمنال. [[composer create-project]] اتشغّل جوه Docker في صورة [[composer:2]]، وأوامر [[artisan]] على [[php:8.4-cli]] (Laravel Framework 13.35.0، والمشروع بيبدأ على SQLite فمحتجناش MySQL).

---

## ١. [[composer create-project laravel/laravel myapp]]

[[create-project]] بينزّل قالب مشروع جاهز ([[laravel/laravel]]) في فولدر جديد اسمه [[myapp]]، وبعدين بيعمل [[composer install]] جواه، وبيشغّل سكربتات ما بعد التسطيب. الناتج طويل؛ أهم سطوره:

~~~text الناتج (مختصر)
Creating a "laravel/laravel" project at "./myapp"
Installing laravel/laravel (v13.11.0)
Package operations: 109 installs, 0 updates, 0 removals
> @php artisan key:generate --ansi
   INFO  Application key set successfully.
> @php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
> @php artisan migrate --graceful --ansi
  0001_01_01_000000_create_users_table ........ 131.53ms DONE
  0001_01_01_000001_create_cache_table ........ 61.18ms DONE
  0001_01_01_000002_create_jobs_table ......... 110.87ms DONE
~~~

| السطر | معناه |
|---|---|
| [[laravel/laravel (v13.11.0)]] | نسخة القالب (الهيكل)، والـ framework نفسه [[laravel/framework]] مكتبة جوه [[vendor]] |
| [[109 installs]] | Laravel ومكتباته |
| [[key:generate]] | بيكتب [[APP_KEY]] عشوائي في [[.env]]، بيتستخدم في تشفير الجلسات والكوكيز |
| [[database.sqlite]] | بيعمل ملف القاعدة لو مش موجود. و [[.env]] فيه [[DB_CONNECTION=sqlite]] |
| [[migrate]] | بيعمل الجداول الأساسية: users و cache و jobs |

> السطور اللي بتبدأ بـ [[>]] دي سكربتات مكتوبة في [[composer.json]] تحت [["scripts"]]، و [[@php]] معناها «شغّل بنفس PHP».

---

## ٢. [[cd myapp]]

ادخل فولدر المشروع. كل أوامر [[artisan]] لازم تتشغّل من هنا، لأن [[artisan]] ملف PHP في جذر المشروع.

---

## ٣. [[php artisan make:model Post -mc]]

[[php artisan]] = شغّل ملف [[artisan]] بـ PHP. و [[make:model]] بيعمل كلاس موديل. و [[-mc]] اختصار [[-m]] (migration) + [[-c]] (controller):

~~~text الناتج
   INFO  Model [app/Models/Post.php] created successfully.
   INFO  Migration [database/migrations/2026_10_07_165537_create_posts_table.php] created successfully.
   INFO  Controller [app/Http/Controllers/PostController.php] created successfully.
~~~

- الموديل [[Post]] (مفرد) بيتربط لوحده بجدول [[posts]] (جمع).
- اسم الـ migration فيه التاريخ والوقت، عشان تتنفّذ بالترتيب.

الـ migration اللي اتعملت فيها:

~~~php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->timestamps();
});
~~~

[[id()]] عمود رقم بيزيد لوحده، و [[timestamps()]] عمودين [[created_at]] و [[updated_at]]. ضيفنا تحت [[id()]]:

~~~php
$table->string('title');
~~~

يعني عمود نصي [[title]] (في MySQL بيبقى [[VARCHAR(255)]]).

---

## ٤. [[php artisan migrate]]

بيبص في جدول [[migrations]] على اللي اتطبق قبل كده، وينفّذ الجديد بس:

~~~text الناتج
   INFO  Running migrations.

  2026_10_07_165537_create_posts_table ......... 109.53ms DONE
~~~

الـ ٣ القديمة متنفذتش تاني.

---

## ٥. [[php artisan route:list]]

~~~text الناتج
  GET|HEAD  / ............................................... routes/web.php:5
  GET|HEAD  storage/{path} storage.local › vendor/laravel/framework/src/Illum…
  PUT       storage/{path} storage.local.upload › vendor/laravel/framework/sr…
  GET|HEAD  up vendor/laravel/framework/src/Illuminate/Foundation/Configurati…

                                                            Showing [4] routes
~~~

كل سطر route: الـ method، والمسار، ومين بيرد. [[/]] متعرّف في [[routes/web.php]] سطر 5، و [[up]] صفحة health check جاهزة. و [[PostController]] لسه مش ظاهر لأننا مربطناهوش بـ route. ده نفس جدول [[$routes]] اللي عملناه بإيدنا في درس front controller.

---

## ٦. [[php artisan tinker]]

REPL: بتكتب PHP سطر سطر وكل كلاسات المشروع جاهزة. جربنا الأمر بـ [[--execute]] (ينفّذ سطر ويقفل):

~~~php
App\Models\Post::create(['title' => 'أول بوست'])
~~~

~~~text الناتج
   Illuminate\Database\Eloquent\MassAssignmentException  Add [title] to fillable property to allow mass assignment on [App\Models\Post].
~~~

[[create([...])]] بيملا أعمدة من array مرة واحدة (mass assignment). و Laravel بيرفض أي عمود انت مسمحتش بيه صراحة، عشان لو حد عمل [[Post::create($request->all())]] محدش يبعت [[user_id]] أو [[is_admin]] من الفورم.

### الحل (الـ solCode)

~~~php
class Post extends Model
{
    protected $fillable = ['title'];
}
~~~

[[protected $fillable]]: لستة الأعمدة المسموح تتملي بـ [[create]]. جربنا تاني:

~~~text الناتج
array:4 [
  "title" => "أول بوست"
  "updated_at" => "2026-10-07T16:56:21.000000Z"
  "created_at" => "2026-10-07T16:56:21.000000Z"
  "id" => 1
]
~~~

[[created_at]] و [[updated_at]] اتملوا لوحدهم، و [[id]] من القاعدة. وجربنا [[Post::create(['title' => 'x', 'id' => 99])]]: الـ id طلع [[2]] مش [[99]]، لأن [[id]] مش في [[$fillable]] فاتجاهل بصمت.

---

## ٧. [[composer run dev]]

[[composer run]] بيشغّل سكربت من [[composer.json]]. في Laravel 13 السكربت [[dev]] بينادي [[php artisan dev]]، اللي بيشغّل مع بعض: [[artisan serve]] (السيرفر)، و [[queue:listen]] (الـ jobs)، و [[pail]] (اللوجات، مش على Windows)، و Vite (للـ CSS و JS) لو فيه [[package.json]]. جربناه في container مفيهوش Node:

~~~text الناتج
sh: 1: npx: not found
~~~

يعني محتاج Node و npm متسطبين وتعمل [[npm install]] الأول. على جهازك العادي هتفتح [[http://localhost:8000]].

---

## الخلاصة

| الأمر | بيعمل إيه | المقابل في PHP الخام |
|---|---|---|
| [[composer create-project]] | مشروع جاهز | الفولدرات و autoload بإيدك |
| [[make:model Post -mc]] | موديل + migration + controller | [[PostRepository]] و [[PostController]] |
| [[migrate]] | يطبّق تغييرات الجداول | سكربتات SQL بإيدك |
| [[route:list]] | كل الـ routes | جدول [[$routes]] |
| [[tinker]] | REPL فيه المشروع | [[php -a]] |
| [[$fillable]] | الأعمدة المسموحة في [[create]] | allowlist بإيدك |
| [[composer run dev]] | سيرفر و queue و Vite | [[php -S]] |`,
          lines: [
            "مشروع Laravel جديد في فولدر myapp.",
            "ادخله.",
            "موديل Post ومعاه migration و controller.",
            "طبّق الـ migrations على القاعدة.",
            "كل الـ routes والـ controllers بتاعتها.",
            "REPL فيه كل كلاسات المشروع.",
            "شغّل سيرفر التطوير و Vite مع بعض."
          ],
          sol: R`[[make:model Post -mc]] بيعمل [[app/Models/Post.php]] و migration و [[PostController]]. بعد [[$table->string('title');]] و [[migrate]] بيطبع [[..._create_posts_table ...... DONE]].

في tinker، [[App\Models\Post::create(['title' => 'أول بوست'])]]: [[Illuminate\Database\Eloquent\MassAssignmentException  Add [title] to fillable property to allow mass assignment on [App\Models\Post].]] Laravel بيرفض يملا أعمدة من array إلا اللي انت سامح بيها، عشان لو عملت [[Post::create($request->all())]] محدش يبعت [[is_admin=1]] أو [[user_id]] حد تاني.

بعد [[protected $fillable = ['title'];]] في الموديل (واقفل tinker وافتحه تاني عشان يقرا التعديل): بيرجّع [[App\Models\Post]] فيه [[title: "أول بوست"]] و [[created_at]] و [[updated_at]] و [[id: 1]]. الغلط الشائع: تحل المشكلة بـ [[$guarded = []]] فتفتح كل الأعمدة.`,
          solCode: R`<?php // app/Models/Post.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Post extends Model
{
    protected $fillable = ['title'];
}`
        }
      ]
    }
]);
