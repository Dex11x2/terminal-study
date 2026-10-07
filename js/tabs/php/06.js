// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "ملفات وإيميل و API وإعدادات",
      l: 2,
      n: "رفع الملفات من غير ثغرات، وإيميل بيوصل، و JSON بالـ status الصح، وأسرار بره git، وأخطاء في اللوج مش قدام الزوار",
      items: [
        {
          cmd: "move_uploaded_file",
          title: "استقبل ملف من المستخدم من غير ما يبقى باب للاختراق",
          desc: R`الفورم لازم [[enctype="multipart/form-data"]]. الملف بيوصل في [[$_FILES]] ومتخزن مؤقت في [[tmp_name]]. قبل ما تنقله: [[error]] لازم [[UPLOAD_ERR_OK]]، والحجم معقول، والنوع الحقيقي من محتوى الملف بـ [[finfo]]، مش من الاسم ولا من اللي المتصفح قاله.

وبعدين اسم عشوائي انت اللي بتولّده، والامتداد من النوع اللي اتأكدت منه، والمكان فولدر بره الـ webroot.`,
          example: R`<?php
$f = $_FILES['avatar'] ?? null;
if (!$f || $f['error'] !== UPLOAD_ERR_OK) exit('الرفع فشل');
if ($f['size'] > 2 * 1024 * 1024) exit('أكبر من 2MB');
$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
if (!isset($allowed[$mime])) exit('صور بس');
$name = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];
$dir  = dirname(__DIR__) . '/storage/uploads/';
if (!move_uploaded_file($f['tmp_name'], $dir . $name)) exit('مقدرتش أحفظ');
echo $name;`,
          try: R`اعمل ملف نصي فيه [[<?php echo 1;]] وسمّيه [[evil.jpg]] وارفعه: [[finfo]] هيقول [[text/x-php]] ويترفض. بعدين ارفع صورة حقيقية وشوف اسمها العشوائي في [[storage/uploads]]. وجرّب ملف أكبر من [[post_max_size]] (8MB افتراضي): [[$_FILES]] و [[$_POST]] الاتنين هيبقوا فاضيين.`,
          flag: "script",
          deep: {
            why: "أشهر اختراق لمواقع PHP: حد يرفع [[shell.php]] (أو [[shell.php.jpg]]) على إنه صورة، ويفتحه من المتصفح، فينفّذ أوامر على السيرفر. كل خطوة في المثال بتقفل طريقة من طرق الهجمة دي.",
            how: R`[[$_FILES['avatar']]] فيه: [[name]] (الاسم من جهاز المستخدم)، و [[type]] (المتصفح قاله، يعني المستخدم يكتبه زي ما هو عايز)، و [[tmp_name]] (مكان مؤقت بيتمسح آخر الطلب)، و [[error]]، و [[size]].

الحدود في [[php.ini]]: [[upload_max_filesize]] (افتراضي 2M) للملف، و [[post_max_size]] (افتراضي 8M) للطلب كله. لو الطلب أكبر من [[post_max_size]]، PHP بيرمي الـ body كله: [[$_POST]] و [[$_FILES]] فاضيين والفورم يبان كأنه متبعتش. تقدر تكشفها بـ [[$_SERVER['CONTENT_LENGTH']]] مع [[$_POST]] فاضي.

[[finfo]] بيبص على أول bytes في الملف (magic bytes) ويعرف نوعه الحقيقي. والامتداد بياخده من الـ allowlist حسب النوع ده، فمستحيل يطلع [[.php]].

الاسم العشوائي من [[random_bytes]]: مفيش تخمين، ومفيش ملفين بنفس الاسم يدوسوا على بعض، ومفيش [[../../index.php]] في الاسم.

بره الـ webroot ([[storage/]] جنب [[public/]] مش جواه): حتى لو ملف خبيث عدّى بشكل ما، مفيش URL يوصله، فمستحيل يتنفّذ. والعرض بيبقى عن طريق سكربت (الدرس الجاي). لو الاستضافة مش بتسمح بفولدر فوق [[public_html]]، اقفل تنفيذ PHP في فولدر الرفع بـ [[.htaccess]] (تاب VPS).

[[move_uploaded_file]] بيتأكد إن الملف فعلًا جاي من رفع في الطلب ده. ولو عايز أمان زيادة للصور: أعد رسمها بـ GD أو Imagick، فأي حاجة مستخبية جوه الصورة بتتشال.`,
            when: "صورة بروفايل، ومرفقات، وملفات من لوحة الأدمن. ولملفات كتير أو كبيرة، خدمة تخزين (S3 أو R2) بـ presigned URLs أحسن (تاب Cloud و DevOps).",
            mistakes: R`في مشروع حقيقي الفحص كان كويس (امتداد + finfo)، بس الأسماء من [[uniqid()]] (مبنية على الوقت وسهل تتخمن) والملفات جوه فولدر عام معتمد على [[.htaccess]] بس، و [[@mkdir]] بيخفي أي فشل. والأشهر: تثق في [[$_FILES['type']]] أو تفحص الامتداد بس، أو تحفظ بالاسم الأصلي.`
          },
          teach: R`## الأول: رحلة الملف

المتصفح بيبعت الملف جوه الطلب، و PHP بيحفظه **مؤقتًا** في [[/tmp]] باسم عشوائي ويحط معلوماته في [[$_FILES]]. لو مانقلتهوش بنفسك، بيتمسح آخر الطلب. المثال بيفحص الملف ٣ فحوصات، وبعدين ينقله لمكان دايم باسم من عنده.

اتجرّب كصفحة [[upload.php]] على [[php -S]] (PHP 8.4.26) جوه Docker، والرفع بـ [[curl -F]] من Git Bash، و [[curl.exe]] و [[Invoke-WebRequest -Form]] من PowerShell.

---

## ١. إيه اللي في [[$_FILES]]؟

عملت صفحة بتطبع [[$_FILES]] بس، ورفعت ملف نصي فيه [[<?php echo 1;]] اسمه [[evil.jpg]]، وقلت لـ curl يدّعي إنه صورة:

~~~bash
curl -s -F "avatar=@evil.jpg;type=image/jpeg" localhost:5885/upload_dump.php
~~~

[[-F]] بيبعت فورم [[multipart/form-data]] (زي [[enctype]] في HTML)، و [[avatar=@evil.jpg]] يعني «حقل اسمه avatar، والـ [[@]] معناها ارفع محتوى الملف ده»، و [[;type=...]] بيكتب النوع اللي احنا عايزينه.

~~~text الناتج
Array
(
    [avatar] => Array
        (
            [name] => evil.jpg
            [full_path] => evil.jpg
            [type] => image/jpeg
            [tmp_name] => /tmp/phpuovjibjaeju5eZvHylM
            [error] => 0
            [size] => 13
        )

)
~~~

| المفتاح | مين حدده | نثق فيه؟ |
|---|---|---|
| [[name]] و [[full_path]] | المستخدم (اسم الملف عنده) | لأ |
| [[type]] | المستخدم: كتبنا [[image/jpeg]] وهو نص PHP | لأ |
| [[tmp_name]] | PHP | آه، ده مكان الملف المؤقت |
| [[error]] | PHP: [[0]] = تمام | آه |
| [[size]] | PHP: 13 byte | آه |

---

## ٢. المثال سطر سطر

~~~php
$f = $_FILES['avatar'] ?? null;
if (!$f || $f['error'] !== UPLOAD_ERR_OK) exit('الرفع فشل');
~~~

مفيش حقل اسمه avatar؟ [[null]]. و [[UPLOAD_ERR_OK]] ثابت قيمته 0. أي رقم تاني = حصل مشكلة (منها [[1]] = [[UPLOAD_ERR_INI_SIZE]]، أكبر من [[upload_max_filesize]]). و [[if]] من غير [[{}]] بينفّذ السطر اللي بعده بس.

~~~php
if ($f['size'] > 2 * 1024 * 1024) exit('أكبر من 2MB');
~~~

2 × 1024 × 1024 = 2,097,152 byte = 2MB.

~~~php
$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
if (!isset($allowed[$mime])) exit('صور بس');
~~~

- [[$allowed]]: allowlist، كل نوع مسموح والامتداد بتاعه.
- [[new finfo(FILEINFO_MIME_TYPE)]]: object بيعرف نوع الملف من **محتواه** (أول bytes فيه، اسمها magic bytes)، و [[FILEINFO_MIME_TYPE]] = رجّع النوع بس زي [[image/png]]. والأقواس حوالين [[new ...]] عشان ننادي [[->file()]] عليه على طول.
- MIME type = اسم النوع المتعارف عليه على النت ([[image/png]]، [[text/html]]).
- [[isset($allowed[$mime])]]: النوع ده مفتاح في اللستة؟

على [[evil.jpg]] [[finfo]] قال:

~~~text الناتج
string(10) "text/x-php"
~~~

مش في اللستة، فالرد [[صور بس]]، رغم إن الاسم [[.jpg]] و [[type]] [[image/jpeg]].

~~~php
$name = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];
$dir  = dirname(__DIR__) . '/storage/uploads/';
~~~

- 16 byte عشوائي = 32 حرف hex، والامتداد **من الـ allowlist** حسب النوع الحقيقي، مش من اسم المستخدم. فمستحيل يطلع [[.php]].
- [[dirname(__DIR__)]]: فولدر المشروع (فوق [[public]])، يعني [[storage/uploads]] مالهوش أي URL.

~~~php
if (!move_uploaded_file($f['tmp_name'], $dir . $name)) exit('مقدرتش أحفظ');
echo $name;
~~~

[[move_uploaded_file(من، لـ)]] بتنقل الملف، بس الأول بتتأكد إن [[tmp_name]] فعلًا ملف اترفع في الطلب ده (فمحدش يقدر يخليها تنقل [[/etc/passwd]]). وبترجّع [[false]] لو فشلت (الفولدر مش موجود أو مفيش صلاحية كتابة).

---

## ٣. التجارب

~~~bash
curl -s -F "avatar=@evil.jpg;type=image/jpeg" localhost:5885/upload.php
curl -s -F "avatar=@me.png" localhost:5885/upload.php
~~~

| الملف | الرد |
|---|---|
| [[evil.jpg]] (نص PHP) | [[صور بس]] |
| [[me.png]] (صورة PNG حقيقية 1×1) | [[a3109697446bf97b63f2818ab630adc2.png]]، والملف في [[storage/uploads/]] |
| 3MB | [[الرفع فشل]]: [[error]] = 1 و [[size]] = 0، يعني [[upload_max_filesize]] (2M افتراضي) وقفه قبل شرطك |
| 9MB | [[الرفع فشل]] ومعاه Warning (تحت) |

والـ 9MB أكبر من [[post_max_size]] (8M = 8,388,608 byte):

~~~text الناتج
Warning:  PHP Request Startup: POST Content-Length of 9000213 bytes exceeds the limit of 8388608 bytes in Unknown on line 0
الرفع فشل
~~~

PHP رمى الطلب كله، فـ [[$_FILES]] فاضي و [[$f]] بقى null. الـ Warning ظهر في الصفحة لأن [[php -S]] في التطوير بيعرض الأخطاء، وعلى سيرفر حقيقي بيروح للّوج.

ومن PowerShell نفس النتايج:

~~~powershell
curl.exe -s -F "avatar=@evil.jpg;type=image/jpeg" http://localhost:5885/upload.php
(Invoke-WebRequest http://localhost:5885/upload.php -Method Post -Form @{avatar = Get-Item ./me.png}).Content
~~~

~~~text الناتج
صور بس
90fbbd5ee3f9ef40208cc21758d9d466.png
~~~

[[-Form]] (PowerShell 7 بس) بيبعت multipart، و [[Get-Item]] بيدّيله الملف. Windows PowerShell 5.1 مفيهوش [[-Form]]، استخدم [[curl.exe]].

---

## الخلاصة

| الفحص | بيقفل إيه |
|---|---|
| [[error === UPLOAD_ERR_OK]] | رفع ناقص أو أكبر من حدود [[php.ini]] |
| [[size]] | ملفات أكبر من اللي انت عايزه |
| [[finfo]] + allowlist | ملف PHP أو HTML متنكر كصورة |
| اسم من [[random_bytes]] وامتداد من اللستة | [[shell.php]] و [[../]] والتخمين والكتابة فوق ملف تاني |
| فولدر بره [[public]] | حتى لو حاجة عدّت، مفيش URL يشغّلها |
| [[move_uploaded_file]] | نقل ملف مش جاي من الرفع |`,
          lines: [
            "بداية الملف.",
            "الملف من الفورم (اسم الحقل avatar).",
            "مفيش ملف، أو حصل خطأ في الرفع.",
            "أكبر من ٢ ميجا.",
            "الأنواع المسموحة، وكل نوع وامتداده.",
            "النوع الحقيقي من محتوى الملف.",
            "مش في اللستة: ارفض.",
            "اسم عشوائي ٣٢ حرف + امتداد من عندنا.",
            "فولدر بره public.",
            "انقل الملف من المكان المؤقت.",
            "الاسم الجديد (خزّنه في القاعدة)."
          ],
          sol: R`[[evil.jpg]]: الرد [[صور بس]]. [[finfo]] قرا أول bytes في الملف ولقاها [[<?php]] فقال [[text/x-php]]، والاسم والامتداد و [[$f['type']]] اللي المتصفح بعته ملهمش أي دور.

الصورة الحقيقية: الرد اسم زي [[01326f29ce7157ab9af926b4190dbed2.png]] (32 حرف hex + الامتداد حسب النوع الحقيقي)، وتلاقيه في [[storage/uploads/]] بره [[public]].

ملف 9MB: الرد [[الرفع فشل]]، و [[$_POST]] و [[$_FILES]] فاضيين، وفي لوج السيرفر [[PHP Warning: PHP Request Startup: POST Content-Length of 9000213 bytes exceeds the limit of 8388608 bytes]]. وملف بين 2 و 8 ميجا بيقف برضه عند [[الرفع فشل]] قبل شرط الـ 2MB بتاعك، لأن [[upload_max_filesize]] الافتراضي [[2M]] فالـ error بيبقى [[UPLOAD_ERR_INI_SIZE]]. لو عايز رسالة أوضح، افحص [[$f['error']]] واعرض رسالة لكل كود.`
        },
        {
          cmd: "readfile",
          title: "اعرض ملف متخزن بره الموقع للي مسموحله بس",
          desc: R`الملفات اللي بره الـ webroot محدش يوصلها برابط، فبتعمل سكربت صغير يعرضها: يتأكد من الصلاحية، ويتأكد إن الاسم بالشكل اللي انت عامله بالظبط، ويبعت [[Content-Type]] الصح، وبعدين [[readfile()]] يبعت الملف.

الاسم لازم يتفحص بـ regex صارم، عشان محدش يبعت [[../config.php]] ويقرا ملفاتك.`,
          example: R`<?php
require_login();
$name = basename($_GET['f'] ?? '');
if (!preg_match('/^[a-f0-9]{32}\.(jpg|png|webp)$/', $name)) { http_response_code(404); exit; }
$path = dirname(__DIR__) . '/storage/uploads/' . $name;
if (!is_file($path)) { http_response_code(404); exit; }
$types = ['jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
header('Content-Type: ' . $types[pathinfo($name, PATHINFO_EXTENSION)]);
header('Content-Length: ' . filesize($path));
header('X-Content-Type-Options: nosniff');
readfile($path);`,
          try: R`اعرض الصورة اللي رفعتها بـ [[<img src="/file.php?f=...">]]. بعدين جرّب [[?f=../public/index.php]] و [[?f=../../config.php]]: الاتنين 404. وافتح الرابط من متصفح مش داخل: لازم يتحوّل للـ login.`,
          flag: "script",
          deep: {
            why: "لو الملفات جوه [[public]] أي حد معاه الرابط بيشوفها، وأي ملف خبيث عدّى ممكن يتنفّذ. بره الـ webroot + سكربت عرض = انت اللي بتقرر مين يشوف إيه.",
            how: R`[[basename]] بيشيل أي مسار ويسيب اسم الملف بس، والـ regex بيقبل بالظبط الشكل اللي الرفع بيعمله (٣٢ حرف hex + امتداد معروف). الاتنين مع بعض بيقفلوا path traversal.

[[Content-Type]] من الـ allowlist بتاعتك، و [[nosniff]] بيمنع المتصفح يخمّن النوع من المحتوى (فملف متنكر كصورة مبيتفسرش كـ HTML). للتحميل بدل العرض: [[Content-Disposition: attachment; filename="file.pdf"]].

[[readfile]] بيبعت الملف على دفعات من غير ما يحمّله كله في الذاكرة. بس الـ worker بتاع PHP بيفضل مشغول طول وقت الإرسال، فللملفات الكبيرة (فيديو) السيرفر نفسه يبعتها أحسن: [[X-Accel-Redirect]] في Nginx أو [[X-Sendfile]] في Apache. وقبل ملف كبير اعمل [[session_write_close()]] عشان متقفلش الجلسة على باقي الطلبات.

والصلاحية ممكن تبقى أدق من «داخل ولا لأ»: دوّر في القاعدة إن الملف ده بتاع المستخدم ده.`,
            when: "صور بروفايل خاصة، وفواتير، ومرفقات، وأي ملف رفعه مستخدم.",
            mistakes: R`[[readfile($_GET['f'])]] من غير فحص: أي حد يقرا [[config.php]] أو [[/etc/passwd]]. وفي مشروع حقيقي سكربت عرض صور كان «محمي» بفحص [[HTTP_REFERER]]، و curl بيبعت أي Referer في ثانية: لو الصورة خاصة احميها بالجلسة، ولو عامة سيبها static. ونفس الملف كان بيخلص بـ [[?>]] وسطر فاضي: أي حرف زيادة بعد الصورة بيبوّظها.`
          },
          teach: R`## الأول: باب صغير للملفات المقفولة

الملفات اللي رفعناها في الدرس اللي فات في [[storage/uploads]]، بره [[public]]، فمفيش رابط يوصلها. السكربت ده هو الباب الوحيد: يتأكد إن الزائر داخل، وإن الاسم المطلوب شكله زي الأسماء اللي احنا بنعملها بالظبط، وبعدين يبعت الملف بالـ headers الصح.

اتجرّب كصفحة [[file.php]] على [[php -S]] (PHP 8.4.26)، على الصورة [[a3109697446bf97b63f2818ab630adc2.png]] اللي اترفعت في الدرس اللي فات (70 byte).

---

## ١. لازم يكون داخل

~~~php
<?php
require_login();
~~~

دالة درس الـ login (في التجربة جاية من [[bootstrap.php]] مع [[session_start]]). مش داخل؟

~~~text الناتج (curl -i من غير كوكي)
HTTP/1.1 302 Found
Location: /login.php
~~~

## ٢. الاسم: [[basename]] ثم regex

~~~php
$name = basename($_GET['f'] ?? '');
if (!preg_match('/^[a-f0-9]{32}\.(jpg|png|webp)$/', $name)) { http_response_code(404); exit; }
~~~

[[basename]] بيشيل أي فولدرات من المسار ويسيب آخر حتة:

~~~text الناتج
basename("../../config.php")     =>  "config.php"
basename("../public/index.php")  =>  "index.php"
~~~

و [[preg_match(pattern, text)]] بيرجّع 1 لو النص مطابق للـ regex. نفك الـ regex:

| الحتة | معناها |
|---|---|
| [[/ ... /]] | بداية ونهاية الـ regex |
| [[^]] و [[$]] | من أول النص لآخره (مفيش حاجة زيادة قبل أو بعد) |
| [[[a-f0-9]{32}]] | 32 حرف بالظبط، كل حرف من a لـ f أو رقم (hex) |
| [[\.]] | نقطة حرفية (النقطة لوحدها في regex = أي حرف) |
| [[(jpg|png|webp)]] | واحد من التلاتة دول |

يعني بالظبط الشكل اللي [[bin2hex(random_bytes(16))]] بيعمله. أي حاجة تانية: [[404]] (Not Found)، مش 403، عشان منقولش «الملف موجود بس ممنوع».

## ٣. المسار، والملف موجود؟

~~~php
$path = dirname(__DIR__) . '/storage/uploads/' . $name;
if (!is_file($path)) { http_response_code(404); exit; }
~~~

[[is_file]] = موجود وملف عادي (مش فولدر).

## ٤. الـ headers

~~~php
$types = ['jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
header('Content-Type: ' . $types[pathinfo($name, PATHINFO_EXTENSION)]);
header('Content-Length: ' . filesize($path));
header('X-Content-Type-Options: nosniff');
~~~

- [[pathinfo($name, PATHINFO_EXTENSION)]]: الامتداد بس ([[png]])، ومنه النوع من الـ array بتاعتنا.
- [[Content-Type]]: نوع المحتوى عشان المتصفح يعرضه صورة.
- [[Content-Length]]: الحجم بالـ byte من [[filesize]]، فالمتصفح يعرف إمتى الملف خلص.
- [[X-Content-Type-Options: nosniff]]: «صدّق الـ Content-Type ومتخمّنش من المحتوى». من غيره، متصفح ممكن يشوف HTML جوه «صورة» ويعرضه كصفحة.

## ٥. [[readfile($path)]]

بتقرا الملف وتطبعه في الرد على دفعات، من غير ما تحمّله كله في متغير.

---

## ٦. التجربة

~~~bash
curl -s -D - -b j12.txt "localhost:5885/file.php?f=a3109697446bf97b63f2818ab630adc2.png" -o out.bin
~~~

[[-D -]] بيطبع الـ headers على الشاشة، و [[-o out.bin]] بيحفظ الـ body في ملف.

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: 70
X-Content-Type-Options: nosniff
~~~

و [[cmp out.bin storage/uploads/a31...png]] قال [[identical]]: نفس الملف بالـ byte.

محاولات الـ path traversal (اللي بتحاول تطلع بـ [[../]] من الفولدر):

| [[?f=]] | الرد | ليه |
|---|---|---|
| [[../public/index.php]] | 404 | [[basename]] ⇒ [[index.php]]، والـ regex رفضه |
| [[../../config.php]] | 404 | ⇒ [[config.php]]، رفضه |
| [[%2e%2e%2fconfig.php]] ([[../]] متشفّرة URL) | 404 | PHP بيفك التشفير قبل [[$_GET]]، فنفس الحالة |
| [[zz3109...png]] | 404 | [[z]] مش hex |
| 32 [[a]] + [[.png]] | 404 | الشكل صح، بس [[is_file]] مش لاقيه |

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[require_login()]] | مين يشوف |
| [[basename]] + regex صارم | مفيش [[../]] ولا أسماء غريبة |
| [[is_file]] | 404 لو مش موجود |
| [[Content-Type]] من عندنا + [[nosniff]] | المتصفح يعرضه بالنوع اللي احنا قلناه بس |
| [[readfile]] | يبعت الملف من غير ما يملى الذاكرة |

ومتحطش [[?>]] في آخر ملف زي ده: أي سطر فاضي بعده بيتبعت جوه الصورة ويبوّظها.`,
          lines: [
            "بداية الملف.",
            "لازم يكون داخل (من درس الـ login).",
            "اسم الملف بس، من غير أي مسار.",
            "بالظبط الشكل اللي الرفع بيعمله، وإلا 404.",
            "المسار الكامل بره public.",
            "مش موجود: 404.",
            "النوع حسب الامتداد، من عندنا مش من المستخدم.",
            "نوع المحتوى.",
            "الحجم.",
            "المتصفح ميخمّنش النوع.",
            "ابعت الملف."
          ],
          sol: R`[[<img src="/file.php?f=01326f...png">]] بيعرض الصورة: [[200]] و [[Content-Type: image/png]] والحجم مظبوط. [[?f=../public/index.php]] و [[?f=../../config.php]]: الاتنين [[404]]. [[basename]] شال المسار فبقت [[index.php]] و [[config.php]]، والـ regex رفضهم لأنهم مش 32 hex + امتداد صورة.

من متصفح مش عامل login: [[302]] لـ [[/login.php]] من قبل ما يوصل للملف. لو الصورة ظهرت مكسورة وانت داخل، افتح الرابط لوحده: غالبًا فيه Warning أو مسافة اتطبعت قبل الصورة (سطر فاضي بعد [[?>]] في ملف متعمله require) فالـ bytes بتاعة الصورة باظت.`
        },
        {
          cmd: "PHPMailer",
          title: "ابعت إيميل يوصل فعلًا مش في الـ spam",
          desc: R`[[mail()]] بتسلّم الرسالة لبرنامج البريد على السيرفر من غير تسجيل دخول، فغالبًا بتروح spam أو متوصلش، ولو فشلت مبتقولكش ليه. الأحسن SMTP حقيقي (من الاستضافة أو خدمة إيميل) بمكتبة PHPMailer: بتعمل login، وبتدعم UTF-8 و HTML ومرفقات، وبترمي exception فيها السبب لو فشلت.

[[composer require phpmailer/phpmailer]]، والباسورد من الإعدادات مش في الكود.`,
          example: R`use PHPMailer\PHPMailer\PHPMailer;
require dirname(__DIR__) . '/vendor/autoload.php';
$c = require dirname(__DIR__) . '/config.php';
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host       = $c['smtp_host'];
$mail->SMTPAuth   = true;
$mail->Username   = $c['smtp_user'];
$mail->Password   = $c['smtp_pass'];
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; $mail->Port = 465;
$mail->CharSet    = 'UTF-8';
$mail->setFrom('no-reply@example.com', 'MyApp');
$mail->addAddress($to);
$mail->Subject = 'أهلًا بيك'; $mail->Body = 'حسابك اتعمل.';
$mail->send();`,
          try: R`شغّل Mailpit في Docker ([[docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit]])، وخلي Host = localhost و Port = 1025 و [[SMTPAuth = false]] و [[SMTPSecure = '']]، وابعت، وافتح [[localhost:8025]] وشوف الإيميل من غير ما يخرج لحد.`,
          flag: "script",
          deep: {
            why: "إيميلات التفعيل واسترجاع الباسورد والفواتير لازم توصل. لو راحت spam المستخدم مش هيفعّل حسابه، وانت مش هتعرف. و [[mail()]] بيرجّع true حتى لو الرسالة ماتت بعدها.",
            how: R`[[new PHPMailer(true)]]: الـ [[true]] معناها exceptions، فأي فشل (باسورد غلط، بورت مقفول) بيرمي [[PHPMailer\PHPMailer\Exception]] فيها السبب، و [[$mail->ErrorInfo]] فيه التفاصيل. للتشخيص: [[$mail->SMTPDebug = 2]] بيطبع المحادثة مع السيرفر.

البورتات: 465 مع [[ENCRYPTION_SMTPS]] (تشفير من أول الاتصال)، أو 587 مع [[ENCRYPTION_STARTTLS]] (بيبدأ عادي ويتشفّر). والاستضافة بتقولك تستخدم أنهي.

الوصول الحقيقي بيتحدد بسجلات DNS على الدومين: SPF (مين مسموحله يبعت باسمك)، و DKIM (توقيع)، و DMARC (تعمل إيه لو الاتنين فشلوا). لوحة الاستضافة أو خدمة الإيميل بتدّيك القيم.

[[CharSet = 'UTF-8']] ضروري للعربي، و PHPMailer بيعمل encoding للعنوان لوحده. مع [[mail()]] كنت بتعمله بإيدك ([[=?UTF-8?B?...?=]]). ولـ HTML: [[$mail->isHTML(true)]] و [[AltBody]] نسخة نص عادي.

الإرسال بياخد ثانية أو اتنين. متخليش المستخدم يستنى: سجّل الإيميل في جدول (queue) وخلي cron يبعته (تاب VPS، درس cron PHP). ومتبعتش جوه transaction.`,
            when: "أي إيميل للمستخدمين. لكميات كبيرة (نشرات) خدمة متخصصة بـ API أحسن من SMTP الاستضافة، لأن الاستضافات بتحط حد في الساعة.",
            mistakes: R`في مشروع حقيقي سكربت التذكيرات كان بيستخدم [[@mail()]]: الـ [[@]] بتخفي أي warning، والـ true اللي بترجع معناها «اتسلّمت للسيرفر» بس. وباسورد SMTP مكتوب في الكود. وتحط إيميل المستخدم في [[From]]، فالإيميل يفشل في DMARC: خليه [[addReplyTo]]. وتبعت لإيميل من فورم من غير [[FILTER_VALIDATE_EMAIL]].`
          },
          teach: R`## الأول: PHPMailer بيعمل إيه؟

بيفتح اتصال بسيرفر إيميل (SMTP = Simple Mail Transfer Protocol، اللغة اللي سيرفرات الإيميل بتتكلم بيها)، ويعمل login، ويسلّمه الرسالة مكتوبة صح (عنوان عربي، charset، headers). المثال بيبعت إيميل ترحيب.

جرّبته على PHP 8.4.26 و PHPMailer 7.1.1 (اللي [[composer require phpmailer/phpmailer]] نزّلها)، والسيرفر **Mailpit** في Docker: سيرفر SMTP وهمي بيمسك أي إيميل ويعرضه في صفحة ومبيبعتهوش لحد. الوصول الحقيقي لـ Gmail وغيره (SPF و DKIM) من الـ docs، مش متجرّب هنا.

---

## ١. التحضير

~~~php
use PHPMailer\PHPMailer\PHPMailer;
require dirname(__DIR__) . '/vendor/autoload.php';
$c = require dirname(__DIR__) . '/config.php';
~~~

- [[use ...]]: الكلاس اسمه الكامل [[PHPMailer\PHPMailer\PHPMailer]] (الـ [[\]] بتفصل الـ namespace، زي الفولدرات). [[use]] بيخليك تكتب [[PHPMailer]] بس في باقي الملف.
- [[vendor/autoload.php]]: ملف Composer عمله، بيحمّل أي كلاس من المكتبات أول ما تستخدمه.
- [[$c]]: الإعدادات (درس [[return config]])، عشان الباسورد ميبقاش في الكود.

## ٢. [[new PHPMailer(true)]] والسيرفر

~~~php
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host       = $c['smtp_host'];
$mail->SMTPAuth   = true;
$mail->Username   = $c['smtp_user'];
$mail->Password   = $c['smtp_pass'];
~~~

| السطر | معناه |
|---|---|
| [[new PHPMailer(true)]] | [[true]] = أي فشل يرمي exception فيها السبب |
| [[isSMTP()]] | ابعت بنفسك بـ SMTP (مش بـ [[mail()]]) |
| [[Host]] | عنوان سيرفر الإيميل |
| [[SMTPAuth = true]] | اعمل login |
| [[Username]] و [[Password]] | بيانات الـ login |

و [[$mail->Host = ...]] بيحط قيمة في property جوه الـ object (الـ [[->]] نفسها، بس من غير أقواس لأنها مش method).

## ٣. التشفير والبورت

~~~php
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; $mail->Port = 465;
$mail->CharSet    = 'UTF-8';
~~~

- سطرين في سطر واحد، والـ [[;]] بتفصلهم.
- [[ENCRYPTION_SMTPS]] (قيمته [[ssl]]) = TLS من أول لحظة، وده بيمشي مع بورت 465. البديل [[ENCRYPTION_STARTTLS]] مع بورت 587: بيبدأ عادي ويطلب تشفير.
- [[CharSet = 'UTF-8']]: من غيرها PHPMailer بيعتبر النص [[iso-8859-1]] والعربي يبوظ (تحت).

## ٤. الرسالة والإرسال

~~~php
$mail->setFrom('no-reply@example.com', 'MyApp');
$mail->addAddress($to);
$mail->Subject = 'أهلًا بيك'; $mail->Body = 'حسابك اتعمل.';
$mail->send();
~~~

[[setFrom(إيميل، اسم)]] المرسل (لازم دومينك انت)، و [[addAddress]] المستلم (تقدر تناديها كذا مرة)، و [[Subject]] العنوان، و [[Body]] المحتوى، و [[send()]] بتفتح الاتصال وتبعت.

---

## ٥. التشغيل

**المثال زي ما هو** (Host = Mailpit، بورت 465): Mailpit مش فاتح 465، فـ:

~~~text الناتج
Fatal error: Uncaught PHPMailer\PHPMailer\Exception: SMTP Error: Could not connect to SMTP host. Failed to connect to server in /app/mailer/vendor/phpmailer/phpmailer/src/PHPMailer.php:2465
~~~

ده فايدة [[true]]: الغلطة واضحة ومش هتعدّي. مع سيرفر حقيقي (بيانات الاستضافة) نفس الكود بيبعت.

**الـ solCode** (البورت 1025 بتاع Mailpit، من غير login ولا تشفير):

~~~php
$mail->Host       = 'localhost';   // في تجربتي: اسم container الـ Mailpit
$mail->Port       = 1025;
$mail->SMTPAuth   = false;
$mail->SMTPSecure = '';
~~~

[[SMTPSecure = '']] = من غير تشفير خالص. وده للتطوير بس. بعد [[send()]] مفيش exception، و API بتاع Mailpit رجّع:

~~~text الناتج
From: MyApp <no-reply@example.com>   To: sara@example.com
Subject: أهلًا بيك   Snippet: حسابك اتعمل.
~~~

## ٦. المحادثة مع السيرفر: [[SMTPDebug = 2]]

ضفت [[$mail->SMTPDebug = 2;]] للـ solCode، وده جزء من اللي طبعه:

~~~text الناتج
SERVER -> CLIENT: 220 03665af2abfc Mailpit ESMTP Service ready
CLIENT -> SERVER: EHLO c6a1131a3e25
CLIENT -> SERVER: MAIL FROM:<no-reply@example.com>
SERVER -> CLIENT: 250 2.1.0 Ok
CLIENT -> SERVER: RCPT TO:<sara@example.com>
SERVER -> CLIENT: 250 2.1.5 Ok
CLIENT -> SERVER: DATA
CLIENT -> SERVER: From: MyApp <no-reply@example.com>
CLIENT -> SERVER: Subject: =?UTF-8?B?2KPZh9mE2YvYpyDYqNmK2YM=?=
CLIENT -> SERVER: Content-Type: text/plain; charset=UTF-8
CLIENT -> SERVER: حسابك اتعمل.
CLIENT -> SERVER: .
SERVER -> CLIENT: 250 2.0.0 Ok: queued as 5wUKn3SNbz5hBl89heKEk8
CLIENT -> SERVER: QUIT
~~~

- كل سطر من السيرفر بيبدأ برقم: [[2xx]] تمام، [[3xx]] كمّل، [[4xx]] و [[5xx]] مشكلة.
- [[EHLO]] تعارف، و [[MAIL FROM]] و [[RCPT TO]] مين لمين، و [[DATA]] وبعدها الرسالة نفسها، والنقطة لوحدها في سطر = الرسالة خلصت.
- [[Subject: =?UTF-8?B?...?=]]: الـ headers في الإيميل لازم تبقى ASCII، فـ PHPMailer كتب العنوان العربي encoded: [[UTF-8]] الـ charset، و [[B]] يعني Base64، وفكيته بـ [[base64_decode]] رجع [[أهلًا بيك]].

## ٧. حالتين غلط اتجربوا

| الحالة | النتيجة |
|---|---|
| [[ENCRYPTION_SMTPS]] على بورت 1025 | نفس [[Could not connect to SMTP host]] في حوالي ثانية: PHPMailer بدأ TLS والسيرفر مش بيتكلم TLS |
| من غير سطر [[CharSet]] | الإيميل وصل، والعنوان في Mailpit [[Ø£ÙÙÙØ§ Ø¨ÙÙ]] |

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[new PHPMailer(true)]] | الفشل exception بسبب واضح |
| [[isSMTP()]] + [[SMTPAuth]] | إرسال بـ login من سيرفر حقيقي، مش [[mail()]] |
| 465 + [[ENCRYPTION_SMTPS]] أو 587 + [[ENCRYPTION_STARTTLS]] | حسب اللي الاستضافة قالته |
| [[CharSet = 'UTF-8']] | العربي سليم |
| [[setFrom]] بدومينك | يعدّي SPF و DMARC |
| Mailpit في التطوير | تشوف الإيميل من غير ما يوصل لحد |`,
          lines: [
            "استورد الكلاس بالـ namespace بتاعه.",
            "autoload بتاع Composer.",
            "الإعدادات (فيها بيانات SMTP).",
            "true: أي فشل يرمي exception.",
            "ابعت عن طريق SMTP.",
            "سيرفر الإيميل.",
            "بتسجيل دخول.",
            "اليوزر.",
            "الباسورد من الإعدادات.",
            "تشفير من أول الاتصال على 465.",
            "العربي يوصل سليم.",
            "المرسل: دومينك انت.",
            "المستلم.",
            "العنوان والمحتوى.",
            "ابعت (ولو فشل هيرمي exception)."
          ],
          sol: R`بعد [[$mail->send()]] مفيش exception، وفي [[localhost:8025]] هتلاقي الإيميل: From [[MyApp <no-reply@example.com>]] و Subject [[أهلًا بيك]] بالعربي سليم (بسبب [[CharSet = 'UTF-8']]). Mailpit بيمسك أي إيميل ومبيبعتوش لحد، فتجرّب براحتك. (اتجرب بـ Mailpit و PHPMailer 7.1، وهي النسخة اللي [[composer require phpmailer/phpmailer]] بيجيبها دلوقتي.)

لو سبت [[ENCRYPTION_SMTPS]] مع port 1025: [[SMTP Error: Could not connect to SMTP host. Failed to connect to server]] في حوالي ثانية، لأن Mailpit مش بيتكلم TLS على البورت ده فالـ handshake بيفشل. ولو العنوان طلع حروف غريبة زي [[Ø£Ù‡Ù„Ù‹Ø§]] يبقى نسيت [[CharSet]].`,
          solCode: R`$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host       = 'localhost';
$mail->Port       = 1025;
$mail->SMTPAuth   = false;
$mail->SMTPSecure = '';
$mail->CharSet    = 'UTF-8';
$mail->setFrom('no-reply@example.com', 'MyApp');
$mail->addAddress('sara@example.com');
$mail->Subject = 'أهلًا بيك'; $mail->Body = 'حسابك اتعمل.';
$mail->send();`
        },
        {
          cmd: "json_encode",
          title: "API صغير بيرجّع JSON بالـ status الصح",
          desc: R`الـ API في PHP صفحة عادية بترجّع JSON بدل HTML: [[header('Content-Type: application/json')]]، و [[http_response_code()]] للـ status، و [[json_encode()]] للبيانات. ولو الـ frontend باعت JSON، [[$_POST]] بيبقى فاضي، والـ body بتقراه من [[php://input]] وتفكه بـ [[json_decode($raw, true)]].

دالة صغيرة [[json_out()]] بتعمل الثلاثة وتقفل، فكل رد في سطر.`,
          example: R`<?php
function json_out(mixed $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'POST بس'], 405);
$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) json_out(['error' => 'JSON غلط'], 400);
$title = trim((string) ($in['title'] ?? ''));
if ($title === '') json_out(['error' => 'title مطلوب'], 422);
json_out(['id' => 7, 'title' => $title], 201);`,
          try: R`[[curl -i -X POST -H "Content-Type: application/json" -d '{"title":"أهلًا"}' localhost:8000/api.php]]: 201. ابعت [[-d 'x']]: 400. افتحه من غير [[-d]] (GET عادي: [[curl -i localhost:8000/api.php]]): 405. خلي بالك إن [[-d]] لوحده بيخلي curl يبعت POST حتى من غير [[-X POST]]. وشيل [[JSON_UNESCAPED_UNICODE]] وشوف العربي بقى [[\u0623\u0647...]].`,
          flag: "script",
          deep: {
            why: "أي frontend بـ JavaScript أو تطبيق موبايل بيكلم السيرفر بـ JSON. والـ status code هو اللي الـ frontend بيقرر بيه: [[fetch]] بيعتبر 200 نجاح، فلو رجّعت غلطة بـ 200، الكود التاني هيفتكرها نجحت.",
            how: R`الـ status codes اللي هتحتاجها: 200 تمام، 201 اتعمل، 400 الطلب نفسه بايظ، 401 مش داخل، 403 داخل بس ممنوع، 404 مش موجود، 405 method غلط، 409 تعارض (موجود قبل كده)، 422 البيانات مش صالحة، 500 غلطة عندنا.

[[php://input]] هو الـ body الخام. [[json_decode(..., true)]] بيرجّع arrays بدل objects. لو الـ JSON بايظ بيرجّع null، ولو عايز السبب: [[JSON_THROW_ON_ERROR]] يرمي [[JsonException]]. و PHP 8.3 فيه [[json_validate()]] لو عايز تتأكد من غير ما تفك.

[[JSON_UNESCAPED_UNICODE]]: العربي يطلع زي ما هو بدل [[\u0633]] (الاتنين JSON صحيح، بس الأول أصغر وأوضح). و [[JSON_THROW_ON_ERROR]] على [[json_encode]] بيمسك نص UTF-8 بايظ بدل ما يرجّع false بصمت.

[[never]] نوع رجوع معناه الدالة عمرها ما بترجع (هنا بسبب [[exit]])، فأي كود بعد النداء واضح إنه مش هيتنفّذ.

لو الـ frontend على دومين تاني، المتصفح هيحتاج CORS headers ويبعت طلب [[OPTIONS]] الأول (التفاصيل في تاب «Backend بـ Node» و «APIs متقدمة»). ولو الـ API معتمد على كوكي الجلسة، طبّق CSRF بـ header زي ما في درس الـ token.`,
            when: "أي endpoint بيكلمه JavaScript: بحث لحظي، حفظ من غير reload، لوحة أدمن بجداول ديناميكية.",
            mistakes: R`في مشروع حقيقي endpoint أدمن كان بيرجّع 400 لما المستخدم مش داخل (المفروض 401)، ولو الـ query فشل بيرجّع نص [[mysqli_error()]] جوه الـ JSON: أسماء الجداول والأعمدة لأي حد. سجّل الغلطة في اللوج ورجّع رسالة عامة. وأي مسافة أو [[?>]] وسطر فاضي في ملف متضمَّن بتبوّظ [[JSON.parse]]. و [[json_encode(array_filter(...))]] يرجّع object بدل list.`
          },
          teach: R`## الأول: API = صفحة بترجّع JSON

مفيش حاجة سحرية: صفحة PHP عادية، بس بدل HTML بتطبع JSON، وبتختار الـ status code بنفسها. المثال endpoint بيستقبل [[{"title": "..."}]] ويرجّع العنصر الجديد، ولكل غلطة status مختلف.

اتجرّب كصفحة [[api.php]] على [[php -S]] (PHP 8.4.26)، بـ curl من Git Bash، و [[Invoke-RestMethod]] و [[curl.exe]] من PowerShell.

---

## ١. [[json_out()]]: دالة الرد

~~~php
function json_out(mixed $data, int $status = 200): never {
~~~

- [[mixed $data]]: أي نوع (array، نص، رقم...).
- [[int $status = 200]]: رقم، ولو مبعتهوش يبقى 200 (قيمة افتراضية).
- [[: never]]: الدالة **عمرها ما بترجع** للي ناداها، لأنها بتخلص بـ [[exit]]. فـ PHP نفسه يعرف إن أي سطر بعد [[json_out(...)]] مش هيتنفّذ.

~~~php
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[http_response_code($status)]] | الـ status في أول سطر الرد ([[HTTP/1.1 201 Created]]) |
| [[header('Content-Type: application/json; ...')]] | «ده JSON»، عشان [[fetch]] والأدوات تفهمه |
| [[json_encode($data, flags)]] | حوّل الـ array لنص JSON |
| [[exit]] | خلاص، متكملش |

والـ flags مجموعين بـ [[|]] (bitwise OR، زي درس fetch modes):
- [[JSON_UNESCAPED_UNICODE]]: اكتب العربي زي ما هو. من غيرها:

~~~text الناتج (نفس الطلب من غير الـ flag)
{"id":7,"title":"\u0623\u0647\u0644\u064b\u0627"}
~~~

كل حرف بقى [[\u]] + رقمه في Unicode بالـ hex. JSON صحيح برضه، بس أطول وصعب تقراه.
- [[JSON_THROW_ON_ERROR]]: لو فيه حاجة متتحوّلش، ارمي [[JsonException]]. جرّبت [[json_encode]] على نص UTF-8 بايظ:

~~~text الناتج
من غير الـ flag:  bool(false)
بالـ flag:       JsonException: Malformed UTF-8 characters, possibly incorrectly encoded
~~~

[[false]] كان هيتطبع نص فاضي والـ client يستلم رد فاضي من غير ما تعرف ليه.

---

## ٢. الفحوصات بالترتيب

~~~php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'POST بس'], 405);
~~~

مش POST: [[405]].

~~~php
$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) json_out(['error' => 'JSON غلط'], 400);
~~~

من جوه لبرة:
1. [[php://input]]: الـ body الخام بتاع الطلب. [[$_POST]] بيتملي بس لو الـ body فورم، مش JSON.
2. [[file_get_contents(...)]]: اقراه كله نص.
3. [[json_decode(نص، true)]]: حوّله لـ PHP. [[true]] = objects تبقى associative arrays.
4. [[is_array]]: لو الـ JSON بايظ [[json_decode]] بترجّع [[NULL]]، ولو JSON صحيح بس مش object (زي [["s"]]) بترجّع نص. الاتنين مش array، فـ [[400]].

~~~php
$title = trim((string) ($in['title'] ?? ''));
if ($title === '') json_out(['error' => 'title مطلوب'], 422);
~~~

[[trim]] بتشيل المسافات من الأول والآخر، فـ [["  "]] بقت فاضية. فاضي: [[422]] (Unprocessable Content: الطلب مفهوم بس البيانات مش صالحة).

~~~php
json_out(['id' => 7, 'title' => $title], 201);
~~~

[[201]] = Created. والـ [[7]] ثابت للتجربة، وفي الحقيقة [[lastInsertId()]].

---

## ٣. التجربة

~~~bash
curl -s -i -X POST -H "Content-Type: application/json" -d '{"title":"أهلًا"}' localhost:5885/api.php
~~~

[[-H]] بيضيف header، و [[-d]] الـ body. والعلامات المفردة حوالين الـ JSON في bash عشان العلامات المزدوجة اللي جواه تفضل زي ما هي.

~~~text الناتج
HTTP/1.1 201 Created
X-Powered-By: PHP/8.4.26
Content-Type: application/json; charset=utf-8

{"id":7,"title":"أهلًا"}
~~~

وباقي الحالات (بـ [[-w " %{http_code}"]] اللي بيطبع الـ status بعد الـ body):

| الطلب | الرد | الـ status |
|---|---|---|
| [[-d 'x']] | [[{"error":"JSON غلط"}]] | 400 |
| [[-d '"just a string"']] | [[{"error":"JSON غلط"}]] | 400 |
| [[-d '{"title":"  "}']] | [[{"error":"title مطلوب"}]] | 422 |
| [[-d '[1,2]']] | [[{"error":"title مطلوب"}]] | 422 |
| GET من غير [[-d]] | [[{"error":"POST بس"}]] | 405 |

ملاحظة: [[-d]] لوحده بيخلي curl يبعت POST، فـ [[-X POST]] مش لازمة معاه. و [[[1,2]]] JSON array، فعدّى [[is_array]] بس ملقاش [[title]].

### من PowerShell

~~~powershell
$r = Invoke-RestMethod http://localhost:5885/api.php -Method Post -ContentType "application/json; charset=utf-8" -Body (@{title="أهلًا"} | ConvertTo-Json)
$r
~~~

~~~text الناتج (PowerShell 7.6)
id title
-- -----
 7 أهلًا
~~~

[[@{...}]] hashtable، و [[ConvertTo-Json]] بيحوّله JSON، و [[Invoke-RestMethod]] بيفك الرد لوحده لـ object ([[PSCustomObject]]). ولو الـ status غلطة (زي 405 على GET) بيرمي error، والرقم في [[$_.Exception.Response.StatusCode]].

و [[curl.exe]] في PowerShell: علامات التنصيص جوه [[-d]] بتتلخبط (خصوصًا 5.1)، فالأسهل الـ body من ملف:

~~~powershell
curl.exe -s -w " %{http_code}$__btn" -H "Content-Type: application/json" --data-binary "@body.json" http://localhost:5885/api.php
~~~

~~~text الناتج
{"id":7,"title":"hi"} 201
~~~

---

## الخلاصة

| الحالة | الـ status |
|---|---|
| method غلط | 405 |
| الـ body مش JSON object | 400 |
| البيانات ناقصة أو غلط | 422 |
| اتعمل | 201 |

و [[Content-Type: application/json]]، و [[php://input]] بدل [[$_POST]]، و [[json_decode(..., true)]] + [[is_array]]، و [[JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR]].`,
          lines: [
            "بداية الملف.",
            "دالة رد: بيانات و status، ومبترجعش.",
            "الـ status.",
            "نوع المحتوى JSON.",
            "البيانات، والعربي زي ما هو.",
            "وقّف.",
            "قفلة.",
            "مش POST: 405.",
            "اقرا الـ body الخام وفكه لـ array.",
            "مش JSON أو مش object: 400.",
            "الحقل المطلوب.",
            "فاضي: 422.",
            "اتعمل: 201 وبيانات العنصر الجديد."
          ],
          sol: R`[[curl -i -X POST -H "Content-Type: application/json" -d '{"title":"أهلًا"}' ...]]: [[HTTP/1.1 201 Created]] و [[Content-Type: application/json; charset=utf-8]] والـ body [[{"id":7,"title":"أهلًا"}]].

[[-d 'x']]: [[400]] و [[{"error":"JSON غلط"}]]. من غير [[-d]]: [[405]] و [[{"error":"POST بس"}]]. وجرّب كمان [[-d '{"title":"  "}']]: [[422]] و [[{"error":"title مطلوب"}]]. كل حالة ليها status مختلف، والـ client يقدر يفرّق من غير ما يقرا الرسالة.

من غير [[JSON_UNESCAPED_UNICODE]]: [[{"id":7,"title":"\u0623\u0647\u0644\u064b\u0627"}]]. ده JSON صحيح والـ client هيقراه صح، بس صعب تقراه انت في اللوج. ولو [[-d 'x']] رجّع 201 أو 500، يبقى انت بتفحص [[$in === null]] بدل [[is_array]]، أو نسيت [[true]] في [[json_decode]] فرجعلك object.`
        },
        {
          cmd: "return config",
          title: "الأسرار والإعدادات في مكان واحد بره git",
          desc: R`كل اللي بيختلف بين جهازك والسيرفر (بيانات القاعدة، باسورد SMTP، المفاتيح، وضع التطوير) في ملف واحد بيرجّع array، فوق فولدر الموقع العام، ومش في git. وفي git نسخة [[config.sample.php]] بنفس الشكل وقيم وهمية (الخطوات والصلاحيات في تاب VPS، درس [[config.sample.php]]).

وعلى VPS أو Docker ممكن تاخد القيم من متغيرات البيئة بـ [[getenv()]] بدل ما تكتبها في الملف.`,
          example: R`<?php
return [
    'env'       => 'production',
    'app_url'   => 'https://example.com',
    'db_host'   => 'localhost',
    'db_name'   => 'myapp',
    'db_user'   => 'myapp_user',
    'db_pass'   => 'YOUR_DB_PASSWORD',
    'smtp_pass' => getenv('SMTP_PASS') ?: 'YOUR_SMTP_PASSWORD',
    'cron_key'  => 'YOUR_LONG_RANDOM_KEY',
];`,
          try: R`اعمل [[config.php]] جنب فولدر [[public]] مش جواه، وحمّله من [[public/index.php]] بـ [[require dirname(__DIR__) . '/config.php']]. ولّد مفتاح بـ [[php -r 'echo bin2hex(random_bytes(32));']]. وبعدين [[git status]]: الملف لازم ميظهرش.`,
          flag: "script",
          deep: {
            why: "باسورد في الكود = باسورد في git، يعني عند أي حد عنده نسخة، وفي تاريخ الـ commits للأبد حتى لو مسحته. وملف إعدادات واحد معناه إن الانتقال من جهازك للسيرفر تغيير ملف واحد.",
            how: R`الشكل: [[/home/user/config.php]] و [[/home/user/public_html/index.php]]، فالـ require بيبقى [[dirname(__DIR__) . '/config.php']]. الملف بره فولدر الموقع فمفيش رابط يوصله أصلًا، حتى لو إعداد PHP باظ والسيرفر بقى يبعت ملفات [[.php]] كنص.

array راجع من [[require]] أحسن من [[define()]] أو متغيرات global: واضح جه منين، وتقدر تديه لدالة أو كلاس، وتعمل نسخة تانية منه للاختبار.

[[getenv('SMTP_PASS')]] بيقرا متغير بيئة. [[$_ENV]] غالبًا فاضي، لأن [[php.ini]] الجاهز للإنتاج فيه [[variables_order = "GPCS"]] (من غير E). ومع PHP-FPM، متغيرات بيئة السيرفر مبتوصلش لـ PHP غير لو اتحطت في إعداد الـ pool. في Docker بتبعتها بـ [[-e]] أو [[env_file]].

[[app_url]] مهم: أي لينك في إيميل (تفعيل، استرجاع باسورد) بيتبني منه، مش من [[HTTP_HOST]] اللي المستخدم بيتحكم فيه.

و [[.env]] بمكتبة [[vlucas/phpdotenv]] شكل تاني لنفس الفكرة، وهو اللي Laravel بيستخدمه.`,
            when: "من أول يوم في أي مشروع. أي قيمة سرية أو بتختلف بين البيئات مكانها هنا.",
            mistakes: R`في مشروع حقيقي مفتاح الـ cron كان مكتوب في ملف السكربت نفسه ومرفوع على git. وبيانات القاعدة كانت في ملفين مختلفين، فتغيير الباسورد محتاج تفتكر الاتنين. واسم حساب الاستضافة كان جوه مسارات في عشرات الملفات. ولو سر اترفع على git مرة: غيّره فورًا، [[.gitignore]] بعدها مش كفاية (تاب الأمان).`
          },
          teach: R`## الأول: ملف بيرجّع array

[[config.php]] مفيهوش أي كود بيشتغل: سطر [[return]] واحد بيرجّع array فيها كل الإعدادات. واللي عايز الإعدادات بيعمل [[$config = require '.../config.php';]]، فالـ array بتتحط في متغيره. الملف ده بيختلف من جهاز للتاني، وفيه أسرار، فمبيترفعش على git.

اتجرّب على PHP 8.4.26 في Docker، في مشروع صغير:

~~~text شكل الفولدر
cfg/
  config.php           الإعدادات الحقيقية (مش في git)
  config.example.php   نفس المفاتيح بقيم وهمية (في git)
  .gitignore
  public/index.php     الموقع
~~~

---

## ١. الملف سطر سطر

~~~php
<?php
return [
~~~

[[return]] بره أي دالة في ملف معناها: «لما حد يعمل [[require]] للملف ده، ده اللي يرجعله». ومن غير [[?>]] في الآخر، عشان مفيش مسافة أو سطر يتطبع بالغلط.

~~~php
    'env'       => 'production',
    'app_url'   => 'https://example.com',
~~~

- [[env]]: الوضع، [[production]] أو [[dev]]. درس [[display_errors]] بيقرر منه تظهر الأخطاء ولا لأ.
- [[app_url]]: رابط الموقع للّينكات في الإيميلات. ليه مش من الطلب نفسه ([[$_SERVER['HTTP_HOST']]])؟ لأن الـ header ده المستخدم بيكتبه، فممكن لينك «استرجاع الباسورد» يطلع على دومين المهاجم.

~~~php
    'db_host'   => 'localhost',
    'db_name'   => 'myapp',
    'db_user'   => 'myapp_user',
    'db_pass'   => 'YOUR_DB_PASSWORD',
~~~

بيانات القاعدة اللي [[db()]] بتقراها (درس [[new PDO]]).

~~~php
    'smtp_pass' => getenv('SMTP_PASS') ?: 'YOUR_SMTP_PASSWORD',
    'cron_key'  => 'YOUR_LONG_RANDOM_KEY',
];
~~~

- [[getenv('SMTP_PASS')]]: اقرا متغير بيئة بالاسم ده. لو مش موجود بترجّع [[false]].
- [[?:]] (اسمه elvis operator): «لو اللي على الشمال قيمته true استخدمه، وإلا خد اللي على اليمين». فالسر ييجي من البيئة لو موجود، وإلا القيمة المكتوبة.
- [[cron_key]]: مفتاح عشوائي طويل، بتولّده كده:

~~~bash
php -r 'echo bin2hex(random_bytes(32)), "\n";'
~~~

~~~text الناتج
089f65fb9a63939712a95536ebf1960178dba070c44ba39beacfb2b28a6ff862
~~~

[[php -r]] بينفّذ كود من سطر الأوامر على طول. والناتج 64 حرف hex، ومختلف كل مرة.

---

## ٢. التحميل من [[public/index.php]]

~~~php
<?php
$config = require dirname(__DIR__) . '/config.php';
echo $config['env'], ' | ', $config['app_url'], ' | smtp_pass=', $config['smtp_pass'], "\n";
~~~

[[__DIR__]] هو [[public]]، و [[dirname]] بيطلع فولدر لفوق للمشروع، وهناك [[config.php]].

~~~text الناتج
production | https://example.com | smtp_pass=YOUR_SMTP_PASSWORD
~~~

ونفس الكود بمتغير بيئة ([[docker run -e SMTP_PASS=s3cr3t ...]]):

~~~text الناتج
production | https://example.com | smtp_pass=s3cr3t
~~~

### [[getenv]] مش [[$_ENV]]

طبعت [[$_ENV['SMTP_PASS']]] و [[ini_get('variables_order')]]:

| الإعداد | [[variables_order]] | [[$_ENV['SMTP_PASS']]] | [[getenv('SMTP_PASS')]] |
|---|---|---|---|
| صورة Docker من غير [[php.ini]] | [[EGPCS]] | [[s3cr3t]] | [[s3cr3t]] |
| بـ [[php.ini-production]] ([[php -c ...]]) | [[GPCS]] | [[NULL]] | [[s3cr3t]] |

[[variables_order]] بيقول PHP يملى أنهي arrays: E = Env، G = Get، P = Post، C = Cookie، S = Server. ملف الإنتاج شايل الـ E، فـ [[$_ENV]] فاضي. [[getenv]] شغالة في الحالتين.

---

## ٣. git والسيرفر

~~~text .gitignore
config.php
~~~

~~~bash
git init -q && git status --short --untracked-files=all
~~~

~~~text الناتج
?? .gitignore
?? config.example.php
?? public/index.php
~~~

[[??]] = ملف جديد git مش متابعه. [[config.php]] مش في اللستة خالص، لأن [[.gitignore]] بيقول لـ git يتجاهله. و [[config.example.php]] (الـ solCode) هو اللي بيترفع عشان اللي بعدك يعرف المفاتيح المطلوبة.

وشغّلت السيرفر بـ [[php -S 0.0.0.0:8000 -t public]] ([[-t]] = جذر الموقع)، وطلبت [[/config.php]]:

~~~text الناتج
HTTP/1.1 200 OK

production | https://example.com | smtp_pass=YOUR_SMTP_PASSWORD
~~~

ده رد [[index.php]]، مش محتوى [[config.php]]. الملف بره الجذر فمالهوش URL، والسيرفر المدمج بيرجّع [[index.php]] لأي مسار مش موجود.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| الإعدادات الحقيقية والأسرار | [[config.php]] جنب [[public]] مش جواه، وفي [[.gitignore]] |
| شكل الإعدادات من غير أسرار | [[config.example.php]] في git |
| التحميل | [[$config = require dirname(__DIR__) . '/config.php';]] |
| أسرار من البيئة (Docker، VPS) | [[getenv('NAME') ?: 'default']] مش [[$_ENV]] |
| روابط الإيميلات | [[app_url]] مش [[HTTP_HOST]] |`,
          lines: [
            "بداية الملف.",
            "الملف بيرجّع array.",
            "وضع التشغيل: production أو dev.",
            "رابط الموقع للإيميلات، مش من الطلب.",
            "host القاعدة.",
            "اسم القاعدة.",
            "اليوزر.",
            "الباسورد (هنا في النسخة الحقيقية بس).",
            "من متغير بيئة لو موجود.",
            "مفتاح طويل عشوائي.",
            "قفلة."
          ],
          sol: R`[[public/index.php]] بيقرا الإعدادات عادي ([[$config['app_url']]])، والمفتاح اللي [[bin2hex(random_bytes(32))]] ولّده 64 حرف hex زي [[c4f10a81ac615bcd...8040]]، وكل تشغيل مختلف. [[git status]] مش هيظهر فيه [[config.php]] لو في [[.gitignore]]، وهيظهر [[config.example.php]] اللي بترفعه بقيم وهمية عشان اللي بعدك يعرف المفاتيح المطلوبة.

وافتح [[localhost:8000/config.php]] وانت مشغّل [[php -S localhost:8000 -t public]]: مش هيعرضه، لأنه بره الجذر (السيرفر المدمج بيرجّع [[index.php]] لأي ملف مش موجود). لو [[config.php]] ظهر في [[git status]] وكان اتعمله commit قبل كده، [[.gitignore]] مش هيشيله: [[git rm --cached config.php]]، وأي سر اترفع قبل كده اعتبره اتسرب وغيّره.`,
          solCode: R`# .gitignore
config.php

# config.example.php (ده اللي بيترفع)
<?php
return [
    'env'      => 'dev',
    'db_pass'  => 'CHANGE_ME',
    'cron_key' => 'CHANGE_ME',
];`
        },
        {
          cmd: "try / catch",
          title: "امسك الغلط اللي تقدر تتعامل معاه، وسيب الباقي يطلع",
          desc: R`[[throw]] بيوقف الكود ويطلع لفوق لحد أول [[catch]] مناسب. امسك بس الغلط اللي عندك رد عليه (مستخدم مش موجود = 404، مخزن خلص = رسالة)، والباقي سيبه يوصل لمعالج عام بيسجّله (الدرس الجاي).

اعمل exceptions بأسماء بتوصف الحالة ([[NotFound]]) بدل ما ترجّع false وكل اللي بينادي ينسى يفحص.`,
          example: R`<?php
class NotFound extends RuntimeException {}
function findUser(int $id): array {
    $stmt = db()->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->execute(['id' => $id]);
    return $stmt->fetch() ?: throw new NotFound("user $id");
}
try {
    $user = findUser((int) ($_GET['id'] ?? 0));
} catch (NotFound) {
    http_response_code(404);
    exit('المستخدم مش موجود');
}`,
          try: R`جرّب [[try { intdiv(1, 0); } catch (Exception $e) { echo 'caught'; }]]: مش هيتمسك، لأن [[DivisionByZeroError]] نوع [[Error]] مش [[Exception]]. غيّرها لـ [[catch (Throwable $e)]] وشوف.`,
          flag: "script",
          deep: {
            why: "من غير exceptions، كل دالة بترجّع false وقت الغلط، وكل نداء محتاج [[if]]، ولو نسيت واحد الغلط بيتنقل ساكت لحد ما يبوّظ حاجة بعيدة. الـ exception مبيتنسيش: يا تمسكه يا الصفحة تقف.",
            how: R`الشجرة: [[Throwable]] فوق الكل، وتحته [[Exception]] (غلطات التطبيق: [[RuntimeException]] و [[InvalidArgumentException]] و [[PDOException]]...) و [[Error]] (غلطات اللغة: [[TypeError]] و [[ValueError]] و [[DivisionByZeroError]] و [[UnhandledMatchError]]). [[catch (Exception $e)]] مبيمسكش [[TypeError]].

الترتيب مهم: أول [[catch]] مطابق بيكسب. و [[PDOException]] نفسها ابن [[RuntimeException]]، فلو كتبت [[catch (RuntimeException)]] الأول هيمسك أخطاء القاعدة كمان. الأدق الأول.

PHP 8: [[throw]] بقت expression ([[?: throw new ...]] زي المثال)، و [[catch (NotFound)]] من غير متغير لو مش محتاجه. و [[finally]] بيتنفّذ في كل الحالات، مفيد لقفل ملف أو lock.

دوال PHP القديمة كتير منها مبترميش exceptions: [[file_get_contents]] بترجّع false ومعاها warning. Laravel وغيره بيحوّلوا كل warning لـ [[ErrorException]] بـ [[set_error_handler]]، فمفيش حاجة بتعدّي ساكتة.`,
            when: "على حدود واضحة: controller بيحوّل [[NotFound]] لـ 404، و transaction بتعمل rollback. غير كده سيبها تطلع.",
            mistakes: R`في مشروع حقيقي queries كتير كانت [[mysqli_query(...) or die('query failed')]]: الصفحة بتموت بنص من غير سبب ومن غير لوج. و [[catch (Exception $e) {}]] فاضي بيبلع الغلط. و [[catch (Throwable)]] في كل دالة: بتخبّي bugs المفروض تطلع. وتعرض [[$e->getMessage()]] للزائر.`
          },
          teach: R`## الأول: الـ exception بتطلع لفوق

[[throw]] بيوقف الدالة اللي هو فيها، ويطلع للي ناداها، واللي ناداه، لحد ما يلاقي [[try]] ليه [[catch]] بنفس النوع. لو ملقاش، السكربت كله يقف بـ [[Fatal error: Uncaught ...]]. المثال بيعمل نوع غلط خاص اسمه [[NotFound]]، والدالة بترميه لو المستخدم مش موجود، والصفحة بتمسكه وتحوّله لـ 404.

اتجرّب كصفحة [[user.php]] على [[php -S]] (PHP 8.4.26) مع MySQL 8.4.11 و [[db()]]، وضفت في الآخر [[echo $user['name'];]] عشان نشوف الحالة الناجحة.

---

## ١. نوع غلط خاص

~~~php
class NotFound extends RuntimeException {}
~~~

[[class NotFound]] كلاس جديد، و [[extends RuntimeException]] = بيورث كل حاجة من [[RuntimeException]]، و [[{}]] فاضية لأننا مش محتاجين نضيف حاجة: الاسم نفسه هو المعلومة. كده [[catch (NotFound)]] بيمسك ده بس، مش أي غلطة.

## ٢. الدالة

~~~php
function findUser(int $id): array {
    $stmt = db()->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->execute(['id' => $id]);
    return $stmt->fetch() ?: throw new NotFound("user $id");
}
~~~

- [[int $id]] و [[: array]]: بتاخد رقم وبترجّع array، وده وعد: مفيش [[false]] بيرجع.
- آخر سطر من جوه لبرة: [[$stmt->fetch()]] صف أو [[false]]. و [[?:]] = «لو الشمال قيمته true خده، وإلا اليمين». واليمين [[throw new NotFound("user $id")]].
- من PHP 8 [[throw]] بقت **expression**، يعني ينفع تتحط في أي مكان بيستنى قيمة، زي هنا بعد [[?:]]. قبل 8 كانت لازم [[if]] لوحدها.
- [["user $id"]]: الرسالة، للّوج مش للزائر.

## ٣. المسك

~~~php
try {
    $user = findUser((int) ($_GET['id'] ?? 0));
} catch (NotFound) {
    http_response_code(404);
    exit('المستخدم مش موجود');
}
~~~

- [[(int) ($_GET['id'] ?? 0)]]: الـ id من الرابط كرقم. [[abc]] بتبقى 0، ومفيش id بـ 0.
- [[catch (NotFound)]]: امسك النوع ده بس. ومن غير متغير (PHP 8)، لأننا مش محتاجين نقرا الرسالة.
- جوه: [[404]] ورسالة ووقّف.

---

## ٤. التجربة

~~~bash
curl -s -w " %{http_code}\n" "localhost:5885/user.php?id=1"
~~~

| الرابط | الرد | الـ status |
|---|---|---|
| [[?id=1]] | [[Ali]] | 200 |
| [[?id=999]] | [[المستخدم مش موجود]] | 404 |
| [[?id=abc]] | [[المستخدم مش موجود]] | 404 |
| من غير [[id]] | [[المستخدم مش موجود]] | 404 |

ولو القاعدة نفسها وقعت؟ [[db()]] هترمي [[PDOException]]، و [[catch (NotFound)]] مش هيمسكها، فهتطلع لفوق للـ handler العام (الدرس الجاي). وده المطلوب: احنا عارفين نعمل إيه مع «مش موجود»، بس مش عارفين نعمل إيه مع «القاعدة واقعة».

---

## ٥. الـ try: [[Exception]] مش بيمسك كل حاجة

~~~php
try { intdiv(1, 0); } catch (Exception $e) { echo 'caught'; }
~~~

[[intdiv]] قسمة أعداد صحيحة. على صفر:

~~~text الناتج
Fatal error: Uncaught DivisionByZeroError: Division by zero in /app/t16.php:2
Stack trace:
#0 /app/t16.php(2): intdiv(1, 0)
#1 {main}
  thrown in /app/t16.php on line 2
~~~

مااتمسكش. سألت PHP مين أبو مين بـ [[get_parent_class]]:

~~~text الناتج
DivisionByZeroError  ←  ArithmeticError  ←  Error
PDOException         ←  RuntimeException ←  Exception
~~~

فالشجرة:

~~~text شجرة الغلطات
Throwable
├── Exception     غلطات التطبيق: RuntimeException، PDOException، JsonException، NotFound بتاعتنا
└── Error         غلطات اللغة: TypeError، ValueError، ArithmeticError ← DivisionByZeroError
~~~

[[catch (Exception)]] بيمسك الفرع الأول بس. بـ [[catch (Throwable $e)]]:

~~~text الناتج
caught: DivisionByZeroError - Division by zero
~~~

و [[1 % 0]] نفس النوع برسالة [[Modulo by zero]].

### الترتيب في [[catch]]

[[catch (RuntimeException $e)]] على [[throw new NotFound(...)]]:

~~~text الناتج
RuntimeException catch got: NotFound
~~~

الأب بيمسك أولاده. فلو كتبت [[catch (RuntimeException)]] قبل [[catch (NotFound)]]، التاني عمره ما هيشتغل، و [[PDOException]] كمان هتتمسك هناك. الأدق الأول.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[class NotFound extends RuntimeException {}]] | نوع غلط باسم بيوصف الحالة |
| [[?: throw new ...]] | [[throw]] كـ expression (PHP 8) |
| [[catch (NotFound)]] | امسك اللي عندك ليه رد بس |
| [[Exception]] و [[Error]] | فرعين تحت [[Throwable]]، [[catch (Exception)]] مبيمسكش [[Error]] |
| أول [[catch]] مطابق بيكسب | الأدق الأول |`,
          lines: [
            "بداية الملف.",
            "نوع غلط خاص بينا.",
            "دالة بترجّع مستخدم أو بترمي.",
            "query.",
            "نفّذ.",
            "صف، أو ارمي NotFound (throw كـ expression).",
            "قفلة.",
            "حاول.",
            "الـ id من الرابط.",
            "لو مش موجود بس (أي غلط تاني هيطلع لفوق).",
            "404.",
            "رسالة ووقّف.",
            "قفلة."
          ],
          sol: R`[[catch (Exception $e)]]: مش بيمسك، والسكريبت بيقع بـ [[Fatal error: Uncaught DivisionByZeroError: Division by zero]]. [[DivisionByZeroError]] بيورث من [[Error]] (غلطات اللغة) مش من [[Exception]]، والاتنين أخوات تحت [[Throwable]].

مع [[catch (Throwable $e)]]: بيطبع [[caught]]، و [[get_class($e)]] = [[DivisionByZeroError]] والرسالة [[Division by zero]]. ونفس الحكاية مع [[1 % 0]] ([[Modulo by zero]]) و [[TypeError]] و [[ValueError]].

الخلاصة للانترفيو: [[catch (Exception)]] بيسيب غلطات اللغة تعدّي. امسك [[Throwable]] في مكان واحد بس (الـ handler العام اللي بيسجّل ويرد 500)، وجوه الكود امسك النوع اللي تقدر تعمل معاه حاجة فعلًا.`
        },
        {
          cmd: "display_errors",
          title: "الأخطاء تظهرلك وانت بتطوّر، وتتسجل بس في الإنتاج",
          desc: R`في التطوير: كل الأخطاء تظهر على الشاشة. في الإنتاج: ولا حاجة تظهر للزائر، وكله يتكتب في ملف لوج بره الموقع. [[display_errors]] بيتحكم في الظهور، و [[log_errors]] و [[error_log]] في التسجيل، و [[set_exception_handler]] بيمسك أي exception محدش مسكها ويعرض صفحة 500 محترمة.`,
          example: R`<?php
$config = require dirname(__DIR__) . '/config.php';
error_reporting(E_ALL);
ini_set('display_errors', $config['env'] === 'dev' ? '1' : '0');
ini_set('log_errors', '1');
ini_set('error_log', dirname(__DIR__) . '/logs/php-error.log');
set_exception_handler(function (Throwable $e): void {
    error_log((string) $e);
    http_response_code(500);
    echo 'حصلت مشكلة عندنا. جرّب تاني بعد شوية.';
});`,
          try: R`حط الكود في أول [[bootstrap.php]] واعمل [[throw new Exception('test');]] في صفحة. في الحالتين الزائر هيشوف الرسالة العامة (الـ handler هو اللي بيرد)، والتفاصيل والـ stack trace في [[logs/php-error.log]]. وعشان تشوف فرق [[display_errors]]: اعمل [[echo $undefined;]]، في dev الـ Warning هيظهر على الشاشة، وفي production هيتسجل في اللوج بس.`,
          flag: "script",
          deep: {
            why: "رسالة غلط على الشاشة في الإنتاج بتكشف مسارات الملفات، وأسماء الجداول، وأحيانًا جزء من الـ query أو الإعدادات. وفي نفس الوقت من غير لوج انت أعمى: المستخدم بيشوف صفحة بيضا، وانت متعرفش حصل إيه.",
            how: R`[[error_reporting(E_ALL)]] دايمًا، في التطوير والإنتاج: ده بيحدد إيه يتحسب غلطة، مش إيه يظهر. والظهور والتسجيل ليهم إعدادات منفصلة.

[[ini_set]] وقت التشغيل مبيلحقش أخطاء الـ parse في نفس الملف، لأن PHP بيعمل compile للملف كله قبل ما أي سطر يشتغل. فالإعداد الحقيقي للإنتاج مكانه [[php.ini]] أو [[.user.ini]] على الاستضافة ([[display_errors = Off]]، تاب VPS). و [[php.ini-production]] الجاهز فيه [[display_errors = Off]] و [[log_errors = On]] أصلًا.

[[set_exception_handler]] آخر شبكة أمان: أي exception طلعت لحد فوق خالص بتوصل هنا. [[(string) $e]] فيه النوع والرسالة والملف والسطر والـ stack trace كله. والأخطاء الـ fatal (زي نفاد الذاكرة) مبتعدّيش على هنا، ليها [[register_shutdown_function]] مع [[error_get_last()]].

على الاستضافة المشتركة، PHP ساعات بيكتب ملف اسمه [[error_log]] جوه نفس فولدر الصفحة، يعني جوه [[public_html]] وممكن يتفتح برابط. حدد مسار لوج بره الموقع، أو اقفل الملفات دي بـ [[.htaccess]].

للمشاريع الأكبر: خدمة زي Sentry بتجمّع الأخطاء وتبعتلك تنبيه أول ما حاجة جديدة تحصل.`,
            when: "أول سطور في bootstrap، قبل أي كود تاني. وإعدادات الإنتاج في php.ini أو .user.ini.",
            mistakes: R`[[display_errors = On]] على الموقع الحقيقي «مؤقتًا» ويفضل شهور. و [[@]] قبل الدوال عشان الـ warnings تختفي. وملفات [[error_log]] جوه الـ webroot: في مشروع حقيقي كانت في [[.gitignore]]، يعني كانت بتتعمل فعلًا جوه فولدر الموقع.`
          },
          teach: R`## الأول: سؤالين منفصلين

PHP بيسأل نفسه عن أي غلطة سؤالين: **أعرضها في الصفحة؟** ([[display_errors]]) و **أكتبها في اللوج؟** ([[log_errors]] و [[error_log]]). المثال بيخلي الإجابة الأولى «آه في التطوير بس»، والتانية «آه دايمًا»، وبيضيف شبكة أمان لأي exception محدش مسكها.

اتجرّب على [[php -S]] (PHP 8.4.26) في مشروع صغير: المثال في [[src/bootstrap.php]]، و [[config.php]] فيه [[env]] بس، وصفحتين: [[boom.php]] فيها [[throw new Exception('test');]] و [[warn.php]] فيها [[echo $undefined;]] وبعدها [[echo "باقي الصفحة\n";]]. وجرّبت مرة بـ [[env => 'dev']] ومرة بـ [[production]].

---

## ١. الإعدادات

~~~php
<?php
$config = require dirname(__DIR__) . '/config.php';
error_reporting(E_ALL);
~~~

[[error_reporting(E_ALL)]]: **إيه اللي يتحسب غلطة أصلًا**. [[E_ALL]] ثابت معناه كل الأنواع (Warning و Notice و Deprecated...). ده مش بيقول تظهر فين، بس بيقول «متتجاهلش حاجة». فبيفضل [[E_ALL]] في التطوير والإنتاج.

~~~php
ini_set('display_errors', $config['env'] === 'dev' ? '1' : '0');
ini_set('log_errors', '1');
ini_set('error_log', dirname(__DIR__) . '/logs/php-error.log');
~~~

- [[ini_set(اسم، قيمة)]]: غيّر إعداد من [[php.ini]] للطلب ده بس. والقيم نصوص ([['1']] و [['0']]).
- [[display_errors]]: [['1']] لو [[env]] = [[dev]]، وإلا [['0']] (الـ ternary [[? :]]).
- [[log_errors]] [['1']]: اكتب كل غلطة في اللوج.
- [[error_log]]: مسار ملف اللوج، في [[logs/]] جنب [[public]] مش جواه.

## ٢. [[set_exception_handler]]

~~~php
set_exception_handler(function (Throwable $e): void {
    error_log((string) $e);
    http_response_code(500);
    echo 'حصلت مشكلة عندنا. جرّب تاني بعد شوية.';
});
~~~

- [[set_exception_handler(دالة)]]: «لو أي exception طلعت لحد فوق خالص ومحدش مسكها، نادي الدالة دي بدل ما تطبع Fatal error».
- [[function (Throwable $e): void {...}]]: دالة من غير اسم (anonymous function / closure) بتتبعت كقيمة. [[void]] = مبترجّعش حاجة.
- [[(string) $e]]: الـ exception كنص: النوع والرسالة والملف والسطر والـ stack trace.
- [[error_log(نص)]]: اكتب النص ده في اللوج (الملف اللي حددناه).
- [[500]] = Internal Server Error، ورسالة عامة من غير تفاصيل.

---

## ٣. التجربة

### [[boom.php]] (exception)

| | dev | production |
|---|---|---|
| الصفحة | [[حصلت مشكلة عندنا. جرّب تاني بعد شوية.]] | نفس الرسالة |
| الـ status | 500 | 500 |

في الحالتين الـ handler هو اللي رد، فالزائر عمره ما يشوف التفاصيل. والتفاصيل في اللوج:

~~~text logs/php-error.log
[07-Oct-2026 16:28:52 UTC] Exception: test in /srv/public/boom.php:3
Stack trace:
#0 {main}
~~~

### [[warn.php]] (Warning)

في dev:

~~~text الناتج (200)
<br />
<b>Warning</b>:  Undefined variable $undefined in <b>/srv/public/warn.php</b> on line <b>3</b><br />
باقي الصفحة
~~~

في production:

~~~text الناتج (200)
باقي الصفحة
~~~

وفي الحالتين اللوج فيه:

~~~text logs/php-error.log
[07-Oct-2026 16:29:01 UTC] PHP Warning:  Undefined variable $undefined in /srv/public/warn.php on line 3
~~~

الـ Warning مش exception: الصفحة بتكمّل (200) والـ handler مبيشتغلش. ده الفرق اللي [[display_errors]] بيتحكم فيه: يظهر قدامك في التطوير، ويختفي من الصفحة في الإنتاج، ويتسجل دايمًا.

---

## ٤. ليه [[ini_set]] مش كفاية في الإنتاج

عملت ملف فيه [[ini_set('display_errors', '0');]] وتحته سطر ناقصه [[;]]:

~~~text الناتج
Parse error:  syntax error, unexpected token "echo", expecting "," or ";" in /srv/public/parse.php on line 4
~~~

الغلطة ظهرت رغم الـ [[ini_set]]. PHP بيقرا الملف كله ويحوّله (compile) **قبل** ما ينفّذ أي سطر، فالـ parse error حصل قبل ما [[ini_set]] تشتغل أصلًا. عشان كده الإعداد الحقيقي للإنتاج مكانه [[php.ini]] أو [[.user.ini]]: [[display_errors = Off]].

---

## الخلاصة

| الإعداد | dev | production |
|---|---|---|
| [[error_reporting]] | [[E_ALL]] | [[E_ALL]] |
| [[display_errors]] | [['1']] | [['0']] (وفي [[php.ini]] كمان) |
| [[log_errors]] | [['1']] | [['1']] |
| [[error_log]] | ملف بره [[public]] | ملف بره [[public]] |
| exception محدش مسكها | الـ handler: 500 ورسالة عامة، والتفاصيل في اللوج | نفس الكلام |`,
          lines: [
            "بداية الملف.",
            "الإعدادات (فيها env).",
            "كل أنواع الأخطاء تتحسب.",
            "تظهر على الشاشة في dev بس.",
            "اتسجل دايمًا.",
            "في ملف بره الموقع.",
            "أي exception محدش مسكها...",
            "...اكتبها كاملة في اللوج.",
            "500.",
            "رسالة عامة للزائر من غير تفاصيل.",
            "قفلة."
          ],
          sol: R`في dev (و production برضه): [[throw new Exception('test')]] بيرجّع [[500]] والنص [[حصلت مشكلة عندنا. جرّب تاني بعد شوية.]]، وفي [[logs/php-error.log]]:
[[[29-Sep-2026 22:07:48 UTC] Exception: test in .../public/boom.php:3]] وتحته [[Stack trace:]].

[[echo $undefined;]] في dev: الصفحة فيها [[Warning: Undefined variable $undefined in ... on line 3]] وبعدها باقي الصفحة بـ 200، والـ Warning متسجل في اللوج كمان. في production: الصفحة نضيفة، والـ Warning في اللوج بس. الـ Warning مش exception، فالـ handler مبيشتغلش عليه والصفحة بتكمّل.

لو اللوج فاضي: فولدر [[logs]] مش موجود أو PHP مش قادر يكتب فيه (على السيرفر اليوزر [[www-data]])، فالرسايل بتروح لـ stderr بتاع السيرفر. ولو على سيرفر حقيقي (PHP-FPM) التعديل في [[config.php]] مأثرش على طول، استنى ثانيتين: OPcache بيعيد فحص الملفات كل [[revalidate_freq=2]].`
        }
      ]
    }
]);
