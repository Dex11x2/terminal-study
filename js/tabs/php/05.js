// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "الجلسات وتسجيل الدخول",
      l: 2,
      n: "الجلسة بتفتكر المستخدم بين الطلبات، والباسورد بيتخزن hash، وكل فورم بيغيّر حاجة محتاج token",
      items: [
        {
          cmd: "session_start",
          title: "خلّي الموقع يفتكر المستخدم بين الصفحات",
          desc: R`HTTP مبيفتكرش حاجة بين طلب والتاني. [[session_start()]] بيدّي المتصفح كوكي فيها id عشوائي ([[PHPSESSID]])، ويحفظ [[$_SESSION]] على السيرفر في ملف باسم الـ id ده. الطلب اللي بعده بيجيب الكوكي، فـ PHP يفتح نفس الملف ويرجّعلك نفس البيانات.

ناديها في أول كل صفحة محتاجة الجلسة، وقبل أي طباعة (لأنها بتبعت header). وإعدادات الكوكي الآمنة تتحط مرة واحدة.`,
          example: R`<?php
session_start([
    'cookie_httponly' => true,
    'cookie_secure'   => true,
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);
$_SESSION['visits'] = ($_SESSION['visits'] ?? 0) + 1;
echo "زرت الصفحة {$_SESSION['visits']} مرة\n";
echo 'session id: ', session_id();`,
          try: R`افتح الصفحة واعمل refresh: العدد بيزيد. افتح DevTools وشوف كوكي PHPSESSID وعلاماتها. امسحها من DevTools واعمل refresh: رجعت 1 بـ id جديد. ولو بتجرب على http بـ IP الشبكة وغالبًا العدد مش هيزيد: ده [[cookie_secure]]، خليها false في التطوير بس.`,
          flag: "script",
          deep: {
            why: "من غير جلسة، الموقع ميعرفش إنك نفس الشخص اللي عمل login من ثانية. الجلسة هي الذاكرة: مين داخل، وسلة المشتريات، ورسايل «تم الحفظ».",
            how: R`الـ handler الافتراضي files: كل جلسة ملف في [[session.save_path]] اسمه [[sess_]] + الـ id، وجواه [[$_SESSION]] متخزنة كنص. في آخر الطلب PHP بيكتبها تاني.

الملف بيتقفل (lock) طول ما السكربت شغال. يعني لو صفحة فيها ٥ طلبات AJAX في نفس الوقت من نفس المستخدم، بيتنفذوا ورا بعض. لو الطلب بيقرا الجلسة بس، [[session_write_close()]] بعد القراية يفك القفل بدري.

الجلسات بتموت بعد [[session.gc_maxlifetime]] (افتراضي 1440 ثانية، يعني ٢٤ دقيقة من غير نشاط)، وتنضيفها بيحصل بالصدفة مع الطلبات أو بـ cron.

الإعدادات: [[httponly]] يمنع JavaScript يقرا الكوكي (فـ XSS مبتسرقهاش)، و [[secure]] يبعتها على https بس، و [[samesite]] [[Lax]] مبتتبعتش مع POST جاي من موقع تاني، و [[use_strict_mode]] يرفض أي id معملهوش PHP بنفسه. نفس الإعدادات دي تقدر تحطها مرة في [[.user.ini]] على الاستضافة (تاب VPS، درس [[.user.ini]]).

خزّن في الجلسة حاجات صغيرة: [[user_id]] مش صف المستخدم كله. والصلاحيات المهمة (أدمن؟ الاشتراك شغال؟) اقراها من القاعدة، عشان لو اتغيرت تتطبق فورًا.`,
            when: "أي موقع فيه login، أو سلة، أو flash messages. الـ APIs اللي بتكلم موبايل غالبًا tokens بدل الجلسة (تاب APIs متقدمة).",
            mistakes: R`في مشروع حقيقي كل ملف كان فيه سطر [[session_save_path]] بمسار فيه اسم حساب الاستضافة، متكرر في عشرات الملفات: مكانه سطر واحد في [[.user.ini]] أو bootstrap. و [[session_start]] بعد ما حاجة اتطبعت: [[headers already sent]]. وطلبات AJAX بطيئة وانت مش عارف إن السبب قفل الجلسة.`
          },
          teach: R`## الأول: إزاي السيرفر بيفتكرك؟

كل طلب HTTP جديد بيوصل للسيرفر كأنه من حد غريب. [[session_start()]] بتحل ده بكوكي فيها رقم عشوائي: أول طلب PHP بيعمل الرقم ويبعته للمتصفح، والمتصفح بيرجّعه مع كل طلب بعد كده، و PHP بيفتح الملف اللي بنفس الرقم ويحط محتواه في [[$_SESSION]].

جرّبت المثال كصفحة [[session.php]] على [[php -S]] (السيرفر المدمج في PHP 8.4.26) جوه Docker على البورت 5885، وفتحتها بـ curl في Git Bash وبـ [[curl.exe]] و [[Invoke-WebRequest]] في PowerShell.

---

## ١. [[session_start([...])]] والإعدادات

~~~php
<?php
session_start([
    'cookie_httponly' => true,
    'cookie_secure'   => true,
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);
~~~

[[session_start]] بتاخد array إعدادات اختيارية، كل مفتاح فيها هو اسم إعداد [[session.]] في [[php.ini]] من غير الـ [[session.]]. الأربعة دول بيتحكموا في الكوكي:

| الإعداد | بيعمل إيه في الكوكي | بيحمي من إيه |
|---|---|---|
| [[cookie_httponly]] | بيضيف [[HttpOnly]]: JavaScript ميقدرش يقراها ([[document.cookie]]) | XSS بيسرق الجلسة |
| [[cookie_secure]] | بيضيف [[secure]]: المتصفح يبعتها على https بس | حد بيتجسس على شبكة http |
| [[cookie_samesite]] | [[SameSite=Lax]]: متتبعتش مع POST جاي من موقع تاني | CSRF (درس جاي) |
| [[use_strict_mode]] | لو جالك id مش عامله PHP، اعمل واحد جديد | session fixation |

ولازم تتنادى **قبل أي طباعة**، لأنها بتبعت header ([[Set-Cookie]])، والـ headers بتتبعت قبل الـ body.

---

## ٢. العدّاد

~~~php
$_SESSION['visits'] = ($_SESSION['visits'] ?? 0) + 1;
~~~

من جوه لبرة:
1. [[$_SESSION['visits']]]: قيمة محفوظة في الجلسة (أول مرة مش موجودة).
2. [[?? 0]]: الـ null coalescing operator، يعني «لو مش موجودة أو null خد 0».
3. [[+ 1]] وبعدين احفظ النتيجة في نفس المكان.

[[$_SESSION]] array عادي، أي حاجة تحطها فيه PHP بيحفظها في آخر الطلب.

~~~php
echo "زرت الصفحة {$_SESSION['visits']} مرة\n";
echo 'session id: ', session_id();
~~~

[[{...}]] جوه النص المزدوج عشان قيمة array بمفتاح، و [[session_id()]] بترجّع الرقم اللي في الكوكي.

---

## ٣. التشغيل بـ curl (Git Bash)

curl من غير أي حاجة مبيحفظش كوكيز، فكل طلب هيبقى زائر جديد. [[-c jar.txt]] = احفظ الكوكيز اللي جاية في الملف ده، و [[-b jar.txt]] = ابعت الكوكيز اللي فيه. و [[-i]] = اطبع الـ headers كمان، و [[-s]] = من غير شريط التقدم.

~~~bash
curl -s -i -c jar.txt -b jar.txt localhost:5885/session.php
~~~

~~~text الناتج (أول طلب)
HTTP/1.1 200 OK
X-Powered-By: PHP/8.4.26
Set-Cookie: PHPSESSID=ce411d1a612220e0c235ca2ca4eef3cb; path=/; secure; HttpOnly; SameSite=Lax
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Content-type: text/html; charset=UTF-8

زرت الصفحة 1 مرة
session id: ce411d1a612220e0c235ca2ca4eef3cb
~~~

نقرا الـ headers:
- [[Set-Cookie: PHPSESSID=...]]: الكوكي. [[PHPSESSID]] اسمها الافتراضي، والقيمة ٣٢ حرف hex (أرقام 0-9 وحروف a-f)، وبعدها العلامات اللي الإعدادات حطتها بالظبط.
- [[Expires]] سنة 1981 و [[Cache-Control: no-store]]: PHP بيقول للمتصفح «متعملش cache للصفحة دي»، لأن فيها بيانات خاصة بالمستخدم.

نفس الأمر مرتين كمان (من غير [[-i]]):

~~~text الناتج
زرت الصفحة 2 مرة
session id: ce411d1a612220e0c235ca2ca4eef3cb
زرت الصفحة 3 مرة
session id: ce411d1a612220e0c235ca2ca4eef3cb
~~~

نفس الـ id، والعدد بيزيد.

---

## ٤. الجلسة على السيرفر

[[session.save_path]] فاضي في صورة Docker، يعني PHP بيستخدم [[/tmp]]. بصيت جوه الـ container:

~~~text الناتج (cat /tmp/sess_ce411d1a...)
visits|i:3;
~~~

ده [[$_SESSION]] متخزن كنص: المفتاح [[visits]]، وبعد [[|]] القيمة: [[i:3]] يعني int قيمته 3. وأي حد معاه الـ id ده (الكوكي) يبقى «هو» عند السيرفر، عشان كده الكوكي دي أهم حاجة تتحمي.

و [[session.gc_maxlifetime]] طلع [[1440]] ثانية، يعني الملف يبقى مرشح للمسح بعد ٢٤ دقيقة من غير استخدام.

---

## ٥. [[use_strict_mode]]: id مزيف

~~~bash
curl -s -i -b "PHPSESSID=attacker123456" localhost:5885/session.php
~~~

~~~text الناتج
Set-Cookie: PHPSESSID=9b7b7c91e98b64fd7d5116d9b9151e42; path=/; secure; HttpOnly; SameSite=Lax
session id: 9b7b7c91e98b64fd7d5116d9b9151e42
~~~

بعتنا id اخترعناه، و PHP رفضه وعمل واحد جديد. من غير [[use_strict_mode]] كان هيقبله ويعمل جلسة بالاسم ده، وده نص هجمة session fixation.

---

## ٦. [[cookie_secure]] على http: كل client بيتصرف إزاي

السيرفر هنا http مش https، والكوكي [[secure]]. النتيجة بعد طلبين بنفس الجلسة:

| الـ client | الطلب التاني | ليه |
|---|---|---|
| curl في Git Bash (8.22) | زرت الصفحة 2 مرة | curl بيعتبر localhost و 127.0.0.1 آمنين |
| [[curl.exe]] بتاع ويندوز (8.21) | زرت الصفحة 2 مرة | نفس الكلام |
| [[Invoke-WebRequest]] في PowerShell 7.6 و 5.1 | زرت الصفحة 1 مرة | حفظ الكوكي ([[Secure=True]]) بس رفض يبعتها على http |
| المتصفح على [[localhost]] | بيزيد | المتصفحات بتعتبر localhost آمن |
| المتصفح على [[http://192.168.x.x]] | ثابت 1 | مش آمن، فالكوكي مبتتبعتش |

في PowerShell:

~~~powershell
$r = Invoke-WebRequest http://localhost:5885/session.php -SessionVariable s
(Invoke-WebRequest http://localhost:5885/session.php -WebSession $s).Content
~~~

[[-SessionVariable s]] بيعمل متغير [[$s]] شايل الكوكيز (زي [[jar.txt]])، و [[-WebSession $s]] بيستخدمه في الطلب اللي بعده. و [[curl.exe]] (لازم [[.exe]] في Windows PowerShell 5.1، لأن [[curl]] هناك اسم تاني لـ [[Invoke-WebRequest]]):

~~~powershell
curl.exe -s -c jar.txt -b jar.txt http://localhost:5885/session.php
~~~

يعني [[cookie_secure]] شغال صح: الكوكي مش المفروض تمشي على http. في التطوير على IP الشبكة خليها [[false]]، وفي الإنتاج (https) [[true]] دايمًا.

---

## الخلاصة

| حاجة | فين |
|---|---|
| الـ id | كوكي [[PHPSESSID]] في المتصفح |
| البيانات | ملف [[sess_<id>]] على السيرفر |
| القراية والكتابة | [[$_SESSION]] بعد [[session_start()]] |
| الحماية | [[httponly]] و [[secure]] و [[samesite]] و [[use_strict_mode]] |

و [[session_start()]] قبل أي [[echo]]، وفي الجلسة حاجات صغيرة زي [[user_id]] بس.`,
          lines: [
            "بداية الملف.",
            "ابدأ الجلسة بإعدادات آمنة.",
            "JavaScript مش شايف الكوكي.",
            "https بس.",
            "متتبعتش مع POST من موقع تاني.",
            "ارفض أي session id مش من عندنا.",
            "قفلة.",
            "عدّاد في الجلسة، بيزيد مع كل طلب.",
            "اطبعه.",
            "الـ id اللي في الكوكي."
          ],
          sol: R`أول مرة [[زرت الصفحة 1 مرة]] ومع كل refresh 2 و 3... و [[session id: 64d3b1b0...]] (32 حرف hex) ثابت. الـ response الأول فيه [[Set-Cookie: PHPSESSID=...; path=/; secure; HttpOnly; SameSite=Lax]]، وفي DevTools › Application › Cookies هتلاقي HttpOnly و Secure متعلّم عليهم و SameSite = Lax.

بعد ما تمسح الكوكي: رجعت [[1]] بـ id جديد. البيانات لسه في ملف على السيرفر ([[/var/lib/php/sessions/sess_...]] على Debian/Ubuntu)، بس المتصفح نسي مفتاحها فبقى زائر جديد، والملف القديم هيتمسح بعدين بالـ garbage collection.

على [[localhost]] العدد بيزيد رغم [[cookie_secure]]، لأن المتصفحات بتعتبر localhost آمن. على [[http://192.168.x.x:8000]] المتصفح بيرفض يخزن الكوكي، فكل طلب جلسة جديدة والعدد ثابت 1.`
        },
        {
          cmd: "password_hash",
          title: "خزّن الباسورد بحيث حتى انت متعرفهوش",
          desc: R`[[password_hash($password, PASSWORD_DEFAULT)]] بيطلّع hash فيه الخوارزمية والـ cost والـ salt في نص واحد، و [[password_verify()]] بتقارن. عمرك ما تخزن الباسورد نفسه، ولا [[md5]] ولا [[sha1]].

العمود [[VARCHAR(255)]]: bcrypt النهارده ٦٠ حرف، بس [[PASSWORD_DEFAULT]] ممكن يتغير لخوارزمية أطول. و PHP 8.4 رفع الـ cost الافتراضي من 10 لـ 12.`,
          example: R`<?php
$hash = password_hash('secret123', PASSWORD_DEFAULT);
echo $hash, "\n";
var_dump(password_verify('secret123', $hash));
var_dump(password_verify('wrong', $hash));
if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
    $hash = password_hash('secret123', PASSWORD_DEFAULT);
}`,
          try: R`شغّل المثال مرتين وقارن الـ hash: مختلف كل مرة لنفس الباسورد، والاتنين بيعدّوا في [[password_verify]]. بعدين جرّب [[['cost' => 14]]] كـ option تالت وحس بالفرق في الوقت.`,
          flag: "script",
          deep: {
            why: "القواعد بتتسرّب: backup منسي، أو SQL injection، أو موظف. لو الباسوردات متخزنة زي ما هي أو بـ md5، كل الحسابات راحت، والناس بتستخدم نفس الباسورد في الإيميل والبنك. الـ hash البطيء بيخلي تخمين كل باسورد مكلّف جدًا.",
            how: R`شكل الناتج: [[$2y$12$]] + ٢٢ حرف salt + ٣١ حرف hash. [[2y]] يعني bcrypt، و [[12]] الـ cost. [[password_verify]] بيقرا الخوارزمية والـ cost والـ salt من الـ hash نفسه، عشان كده مش محتاج تخزنهم لوحدهم.

الـ salt عشوائي لكل hash، فنفس الباسورد لمستخدمين بيطلع hash مختلف، والجداول الجاهزة (rainbow tables) ملهاش لازمة.

الـ cost لوغاريتمي: 12 يعني 2 أس 12 لفة. كل زيادة 1 بتضاعف الوقت. الهدف إن الـ login ياخد عشرات لمئات الـ milliseconds عندك، ويبقى تخمين مليارات الباسوردات مستحيل عمليًا. [[md5]] و [[sha256]] سريعين جدًا (مليارات في الثانية على GPU)، وده بالظبط العيب.

[[password_needs_rehash]] بعد login ناجح: لو الـ hash القديم بـ cost 10 (قبل PHP 8.4) أو خوارزمية أقدم، اعمل hash جديد واحفظه. كده الحسابات القديمة بتتحدث لوحدها.

bcrypt بيقرا أول 72 byte بس ويتجاهل الباقي بصمت، والحرف العربي ٢ bytes. للـ tokens العشوائية الطويلة (remember me، reset password) [[hash('sha256', $token)]] كفاية وأسرع، لأنها مش كلمات بشر ممكن تتخمن.`,
            when: "التسجيل، والـ login، وتغيير الباسورد. وأي سر المفروض تتحقق منه بس ومتعرفهوش.",
            mistakes: R`في مشروع حقيقي توكن «افتكرني» كان متخزن في القاعدة زي ما هو، فأي تسريب للجدول = دخول بحساب أي حد عنده التوكن. خزّن [[hash('sha256', $token)]] وقارن بالـ hash. و [[md5($pass)]] أو [[sha1]] حتى مع salt. وعمود [[VARCHAR(60)]] بالظبط. ومقارنة hash بـ [[==]] بدل [[password_verify]].`
          },
          teach: R`## الأول: hash مش تشفير

التشفير ليه مفتاح بيرجّع النص الأصلي. الـ **hash** طريق في اتجاه واحد: من الباسورد تطلّع نص ثابت الطول، ومن النص ده مستحيل ترجع للباسورد. فبتخزن الـ hash، ولما المستخدم يكتب باسورد بتعمله hash بنفس الطريقة وتقارن. المثال بيعمل كده، وبيحدّث الـ hash القديم لو الإعدادات اتغيرت.

اتشغّل كله بـ [[php ex7.php]] على PHP 8.4.26 (صورة [[php:8.4-cli]]).

---

## ١. [[password_hash('secret123', PASSWORD_DEFAULT)]]

~~~php
<?php
$hash = password_hash('secret123', PASSWORD_DEFAULT);
echo $hash, "\n";
~~~

- الـ parameter الأول الباسورد، والتاني الخوارزمية. [[PASSWORD_DEFAULT]] ثابت معناه «أحسن خوارزمية PHP شايفها افتراضيًا دلوقتي». قيمته في 8.4 طلعت [[2y]]، يعني bcrypt.

~~~text الناتج (تشغيلين ورا بعض)
$2y$12$3MZayHbEHAQ9EYEwro42zOsFJ1mieOjjfIXQuZgXbUrG/l2UrzAmC
$2y$12$gYEeqCb4HorrwjvZY.D6TefnE/Ai77s0Z4vGw/MVkA8QrWhPdavG.
~~~

نفس الباسورد، ونتيجتين مختلفتين خالص. ليه؟ نفك الأول حتة حتة (طوله 60 حرف):

~~~text شكل الـ hash
$2y$  12$  3MZayHbEHAQ9EYEwro42zO  sFJ1mieOjjfIXQuZgXbUrG/l2UrzAmC
 |    |    |                       |
 |    |    salt (22 حرف)            الـ hash نفسه (31 حرف)
 |    cost
 الخوارزمية (bcrypt)
~~~

- **salt**: نص عشوائي PHP بيولّده لكل hash جديد ويخلطه بالباسورد. عشان كده كل مرة شكل. ومعناه إن اتنين مستخدمين بنفس الباسورد مش هيبقى ليهم نفس الـ hash، والجداول الجاهزة (rainbow tables) ملهاش لازمة.
- **cost**: [[12]] يعني الخوارزمية بتلف 2 أس 12 = 4096 مرة. PHP 8.4 رفعه من 10 لـ 12.

[[password_get_info($hash)]] بتقرالك الكلام ده من الـ hash نفسه:

~~~text الناتج
[algo] => 2y
[algoName] => bcrypt
[options] => Array ( [cost] => 12 )
~~~

---

## ٢. [[password_verify]]

~~~php
var_dump(password_verify('secret123', $hash));
var_dump(password_verify('wrong', $hash));
~~~

~~~text الناتج
bool(true)
bool(false)
~~~

[[password_verify]] بتقرا الخوارزمية والـ cost والـ salt من أول الـ hash، وتعمل hash للباسورد الجديد بنفسهم، وتقارن. عشان كده مش محتاج تخزن الـ salt في عمود لوحده: هو جوه النص أصلًا. و [[var_dump]] بيطبع النوع والقيمة ([[bool(true)]]).

---

## ٣. [[password_needs_rehash]]

~~~php
if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
    $hash = password_hash('secret123', PASSWORD_DEFAULT);
}
~~~

بتسأل: «الـ hash ده معمول بإعدادات أضعف من اللي بطلبها دلوقتي؟». لو آه، اعمل hash جديد (وفي الحقيقة احفظه في القاعدة). المكان الوحيد اللي معاك فيه الباسورد الأصلي هو لحظة الـ login الناجح، فده مكانها. جرّبت:

| الـ hash | [[password_needs_rehash($h, PASSWORD_DEFAULT)]] |
|---|---|
| معمول بـ cost 12 (الافتراضي) | [[false]]، فالـ if مبيتنفّذش |
| معمول بـ cost 10 (زي PHP قبل 8.4) | [[true]]: هيتحدّث |
| معمول بـ cost 14 | [[true]] برضه! |
| cost 14 ومعاه نفس الـ options [[['cost' => 14]]] | [[false]] |

يعني الدالة بتقارن بالإعدادات اللي بتديهالها بالظبط، مش «أقوى ولا أضعف». ادّي [[password_hash]] و [[password_needs_rehash]] نفس الـ options دايمًا.

---

## ٤. الـ solCode: الـ cost بيعمل إيه في الوقت

~~~php
<?php
foreach ([10, 12, 14] as $cost) {
    $t = microtime(true);
    $h = password_hash('secret123', PASSWORD_DEFAULT, ['cost' => $cost]);
    printf("cost %d: %.3fs %s\n", $cost, microtime(true) - $t, substr($h, 0, 7));
}
~~~

- [[foreach ([10, 12, 14] as $cost)]]: لف على التلات أرقام.
- [[microtime(true)]]: الوقت دلوقتي بالثواني بكسور (float). نحفظه قبل، ونطرح بعد.
- الـ parameter التالت لـ [[password_hash]]: [[['cost' => $cost]]] بيغيّر الـ cost.
- [[printf]]: اطبع بقالب. [[%d]] رقم صحيح، و [[%.3f]] رقم عشري بـ ٣ أرقام بعد العلامة، و [[%s]] نص. والقيم بالترتيب بعد القالب.
- [[substr($h, 0, 7)]]: أول ٧ حروف من الـ hash ([[$2y$12$]])، عشان نتأكد إن الـ cost اتطبّق.

~~~text الناتج
cost 10: 0.049s $2y$10$
cost 12: 0.193s $2y$12$
cost 14: 0.746s $2y$14$
~~~

كل +2 في الـ cost = الوقت تقريبًا × 4 (لأن كل +1 = ضعف اللفات). 0.19 ثانية مش مشكلة لمستخدم بيعمل login، بس هي كارثة لحد عايز يجرب مليار باسورد. وللمقارنة [[md5('secret123')]] بيطلع في جزء صغير من الـ millisecond ومن غير salt:

~~~text الناتج
string(32) "5d7845ac6ee7cfffafc5fe5f35cf666d"
~~~

ونفس الباسورد هيطلع نفس الـ md5 عند أي حد في العالم، فده مكتوب في جداول جاهزة.

---

## ٥. حد الـ 72 byte

جرّبت باسوردين نفس أول 72 حرف ومختلفين بعدها:

~~~php
$a = str_repeat('a', 72);
var_dump(password_verify($a . 'XYZ', password_hash($a . 'different', PASSWORD_DEFAULT)));
~~~

~~~text الناتج
bool(true)
~~~

bcrypt بيتجاهل أي حاجة بعد أول 72 byte من غير ما يقول. في الحقيقة نادرًا ما بتفرق للباسوردات، بس خليه في بالك.

---

## الخلاصة

| الدالة | امتى | بترجّع |
|---|---|---|
| [[password_hash($p, PASSWORD_DEFAULT)]] | التسجيل وتغيير الباسورد | نص 60 حرف (bcrypt) |
| [[password_verify($p, $hash)]] | الـ login | true أو false |
| [[password_needs_rehash($hash, PASSWORD_DEFAULT)]] | بعد login ناجح | true لو محتاج يتحدّث |

والعمود [[VARCHAR(255)]]، ومفيش [[md5]] ولا [[sha1]] للباسوردات.`,
          lines: [
            "بداية الملف.",
            "hash بالخوارزمية الافتراضية (bcrypt، cost 12).",
            "[[$2y$12$...]] ستين حرف.",
            "true.",
            "false.",
            "الـ hash قديم أو أضعف من الافتراضي الحالي؟",
            "اعمله تاني واحفظه (بعد login ناجح).",
            "قفلة."
          ],
          sol: R`كل تشغيل بيطبع hash شكله [[$2y$12$kkp1V.8Fx4xQz6jIPEE0..1XWSEW3o5...]] (60 حرف) وبعده [[bool(true)]] و [[bool(false)]]. التشغيل التاني بيطلّع hash مختلف تمامًا لنفس الباسورد، لأن فيه salt عشوائي جديد. [[$2y$]] = bcrypt، و [[12]] = الـ cost (الافتراضي في PHP 8.4، وكان 10 قبلها)، وبعدها 22 حرف salt والباقي الـ hash. [[password_verify]] بيقرا الـ salt والـ cost من الـ hash نفسه، فالاتنين بيعدّوا.

بالـ cost: عندي 10 أخد حوالي 0.06 ثانية، و 12 حوالي 0.3، و 14 حوالي 1.2 ثانية. كل +1 = الوقت × 2. ولو خزّنت بـ [[['cost' => 14]]] وناديت [[password_needs_rehash($hash, PASSWORD_DEFAULT)]] من غير نفس الـ options، هترجع true وهتعيد الـ hash مع كل login. ادّي الدالتين نفس الـ options.

والعمود في القاعدة [[VARCHAR(255)]] مش [[CHAR(60)]]: لو PHP غيّر الـ default لـ argon2 مثلًا الطول هيزيد.`,
          solCode: R`<?php
foreach ([10, 12, 14] as $cost) {
    $t = microtime(true);
    $h = password_hash('secret123', PASSWORD_DEFAULT, ['cost' => $cost]);
    printf("cost %d: %.3fs %s\n", $cost, microtime(true) - $t, substr($h, 0, 7));
}`
        },
        {
          cmd: "session_regenerate_id",
          title: "تسجيل دخول صح، وحماية الصفحات اللي وراه",
          desc: R`بعد ما [[password_verify]] ينجح: [[session_regenerate_id(true)]] الأول، وبعدين احفظ [[user_id]] في الجلسة وحوّل. تغيير الـ id بيقفل هجمة session fixation: لو حد زرع id معروف في متصفح الضحية قبل الدخول، الـ id ده بيموت لحظة الدخول.

وكل صفحة محمية بتبدأ بدالة زي [[require_login()]]: لو مفيش [[user_id]] في الجلسة، حوّل لصفحة الدخول و [[exit]].`,
          example: R`$stmt = db()->prepare('SELECT id, password_hash FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
if (!$user || !password_verify($password, $user['password_hash'])) {
    $error = 'الإيميل أو الباسورد غلط';
} else {
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $user['id'];
    header('Location: /dashboard.php', true, 303);
    exit;
}
function require_login(): int {
    if (empty($_SESSION['user_id'])) { header('Location: /login.php'); exit; }
    return $_SESSION['user_id'];
}`,
          try: R`اعمل login وقارن PHPSESSID في DevTools قبل وبعد: اتغيرت. بعدين افتح [[dashboard.php]] بـ curl من غير كوكي ([[curl -i localhost:8000/dashboard.php]]): لازم 302 ومفيش ولا حرف من محتوى الصفحة.`,
          flag: "script",
          deep: {
            why: "الـ login هو الباب. أي غلطة فيه (رسالة بتفضح مين مسجّل، أو id الجلسة متغيرش، أو صفحة نسيت الحماية) بتدّي حد دخول مش بتاعه.",
            how: R`نفس الرسالة للإيميل الغلط والباسورد الغلط، عشان محدش يعرف مين مسجّل عندك (user enumeration).

session fixation: المهاجم ياخد id جلسة عادي من موقعك، ويخلي الضحية تستخدمه (رابط أو كوكي)، ويستنى الضحية تعمل login، وبعدين يستخدم نفس الـ id فيبقى داخل. [[session_regenerate_id(true)]] بيعمل id جديد وبيمسح ملف القديم ([[true]])، فالـ id اللي مع المهاجم بقى فاضي. و [[use_strict_mode]] بيقفل نص الهجمة من الأول.

[[require_login]] في أول كل صفحة محمية، وكل endpoint في API الأدمن كمان، مش بس إنك تخبّي اللينك من الـ menu. وللأدمن: اقرا الـ role من القاعدة مع كل طلب.

الحد من المحاولات: سجّل المحاولات الفاشلة لكل إيميل ولكل IP، وبعد ٥ مثلًا استنى دقايق. من غيرها أي حد يجرب آلاف الباسوردات.

«افتكرني»: كوكي تانية عمرها طويل فيها token عشوائي ([[bin2hex(random_bytes(32))]])، والقاعدة فيها hash بتاعه بس. لما الجلسة تموت والكوكي موجودة، دوّر بالـ hash، ولو لقيته اعمل login وغيّر التوكن. والكوكي دي [[httponly]] و [[secure]].

ولو فيه [[?redirect=]] بعد الدخول، اقبل مسار داخلي بس: بيبدأ بـ [[/]] والحرف التاني مش [[/]]، ومفيهوش [[\]] ولا tab ولا سطر جديد خالص (المتصفح بيقرا [[/\evil.com]] و [[?redirect=/%09/evil.com]] زي [[//evil.com]])، والأضمن allowlist لصفحات معروفة، وإلا بقى open redirect لموقع تاني.`,
            when: "صفحة الـ login، وأول سطر في كل صفحة أو endpoint محمي.",
            mistakes: R`تنسى [[exit]] في [[require_login]]: المتصفح بيتحوّل، بس محتوى الصفحة المحمية اتبعت في الرد. وتحط صف المستخدم كله (ومعاه الـ hash) في الجلسة. وفي مشروع حقيقي كوكي «افتكرني» كانت بتتعمل بـ secure = false، فممكن تتبعت على http وتتسرق من الشبكة.`
          },
          teach: R`## الأول: المثال حتتين

1. **الـ login نفسه**: دوّر على المستخدم بالإيميل، واتأكد من الباسورد، ولو تمام غيّر id الجلسة واحفظ رقم المستخدم وحوّله.
2. **[[require_login()]]**: حارس بتحطه أول كل صفحة محمية.

جرّبته كصفحتين [[login.php]] و [[dashboard.php]] على [[php -S]] (PHP 8.4.26) مع MySQL 8.4.11، وملف [[src/bootstrap.php]] فيه [[session_start]] بإعدادات الدرس اللي فات و [[db()]] و [[require_login()]]. والمستخدم [[ali@example.com]] باسورده [[secret123]] متخزن بـ [[password_hash]].

---

## ١. هات المستخدم بالإيميل

~~~php
$stmt = db()->prepare('SELECT id, password_hash FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
~~~

نفس [[prepare / execute]]. بنجيب العمودين اللي محتاجينهم بس. و [[$user]] يا صف يا [[false]].

## ٢. الشرط

~~~php
if (!$user || !password_verify($password, $user['password_hash'])) {
    $error = 'الإيميل أو الباسورد غلط';
~~~

- [[!]] = not، و [[||]] = or.
- يعني: «لو مفيش مستخدم، **أو** الباسورد مش مطابق». و [[||]] بيقف أول ما يلاقي حاجة صح (short-circuit)، فلو [[$user]] بـ [[false]]، [[password_verify]] مش هتتنادى أصلًا، وده كويس لأن [[$user['password_hash']]] على false كان هيبقى غلط.
- الحالتين نفس الرسالة. جرّبت:

~~~bash
curl -s -d "email=ali@example.com&password=bad" localhost:5885/login.php
curl -s -d "email=nobody@example.com&password=bad" localhost:5885/login.php
~~~

~~~text الناتج
الإيميل أو الباسورد غلط
الإيميل أو الباسورد غلط
~~~

[[-d]] بيبعت POST بالبيانات دي (زي الفورم بالظبط). ومن الرد مستحيل تعرف إن [[ali@]] مسجّل و [[nobody@]] لأ (user enumeration).

## ٣. النجاح: ٤ سطور بالترتيب ده

~~~php
} else {
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $user['id'];
    header('Location: /dashboard.php', true, 303);
    exit;
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[session_regenerate_id(true)]] | id جلسة جديد بنفس البيانات، و [[true]] = امسح ملف الـ id القديم من السيرفر |
| [[$_SESSION['user_id'] = (int) ...]] | احفظ رقم المستخدم بس (مش الصف ومعاه الـ hash) |
| [[header('Location: ...', true, 303)]] | رد بتحويل. [[true]] = استبدل أي Location قبلها، و [[303]] = «روح اعمل GET للمكان ده» |
| [[exit]] | وقّف السكربت هنا |

جرّبت الـ login بـ curl وجرة كوكيز ([[-c]] و [[-b]] زي درس الجلسة):

~~~text الكوكي قبل الـ login
ff75fb87852fd2b8526b33d6fa7532c9
~~~

~~~text الناتج (headers الـ login)
HTTP/1.1 303 See Other
Set-Cookie: PHPSESSID=bd7b57b76329d8bcd46fe5a597951e46; path=/; secure; HttpOnly; SameSite=Lax
Location: /dashboard.php
~~~

الـ id اتغيّر. وبصيت في فولدر الجلسات على السيرفر:

~~~text الناتج
ls: cannot access '/tmp/sess_ff75fb87852fd2b8526b33d6fa7532c9': No such file or directory
/tmp/sess_bd7b57b76329d8bcd46fe5a597951e46
~~~

~~~text محتوى الملف الجديد
user_id|i:1;
~~~

الملف القديم اتمسح (بسبب [[true]])، فلو مهاجم كان زارع الـ id القديم في متصفحك (session fixation)، معاه دلوقتي مفتاح لملف مش موجود.

---

## ٤. [[require_login()]]

~~~php
function require_login(): int {
    if (empty($_SESSION['user_id'])) { header('Location: /login.php'); exit; }
    return $_SESSION['user_id'];
}
~~~

- [[empty(...)]] بترجّع true لو المفتاح مش موجود أو قيمته فاضية (null أو 0 أو ''). ومبتطلّعش warning لو مش موجود.
- مش داخل: حوّل ([[header]] من غير كود = 302) و [[exit]].
- داخل: رجّع الرقم. و [[: int]] بيضمن إن اللي بينادي واخد رقم.

والـ solCode بيستخدمها:

~~~php
<?php // public/dashboard.php
require dirname(__DIR__) . '/src/bootstrap.php';
$userId = require_login();
?>
<h1>أهلًا، رقمك <?= $userId ?></h1>
~~~

[[?>]] بيقفل PHP وبعده HTML عادي، و [[<?= ... ?>]] اختصار لـ [[<?php echo ... ?>]].

~~~text الناتج (بالكوكي اللي بعد الـ login)
<h1>أهلًا، رقمك 1</h1>
~~~

ومن غير كوكي:

~~~bash
curl -s -i localhost:5885/dashboard.php
~~~

~~~text الناتج
HTTP/1.1 302 Found
Location: /login.php
Content-type: text/html; charset=UTF-8

~~~

والـ body فاضي. في PowerShell:

~~~powershell
curl.exe -s -i http://localhost:5885/dashboard.php
$r = Invoke-WebRequest http://localhost:5885/dashboard.php -MaximumRedirection 0 -SkipHttpErrorCheck
$r.StatusCode; $r.Headers.Location; $r.Content.Length
~~~

~~~text الناتج (PowerShell 7.6)
302
/login.php
0
~~~

[[-MaximumRedirection 0]] = متتبعش التحويل (وإلا هيروح لـ login.php ويوريك صفحتها)، و [[-SkipHttpErrorCheck]] = متعتبرش الـ 302 error. وهيطبع سطر [[The maximum redirection count has been exceeded]] قبل النتيجة، وده عادي هنا.

---

## ٥. ليه [[exit]] مهمة: التجربة

عملت صفحة حارسها من غير [[exit]]:

~~~php
<?php
session_start();
if (empty($_SESSION['user_id'])) { header('Location: /login.php'); }
?>
<h1>الأرباح السرية: 1,000,000</h1>
~~~

~~~text الناتج (curl -i من غير كوكي)
HTTP/1.1 302 Found
Location: /login.php
<h1>الأرباح السرية: 1,000,000</h1>
~~~

[[header()]] بيحط header بس، مش بيوقف حاجة. المتصفح هيحوّل بسرعة ومش هتلاحظ، بس الصفحة كلها اتبعتت، و curl أو أي bot بيقراها. (في [[require_login]] من غير [[exit]]، الـ [[: int]] لحق الموقف: [[TypeError: require_login(): Return value must be of type int, null returned]]. متعتمدش على ده.)

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| نفس الرسالة للإيميل والباسورد الغلط | محدش يعرف مين مسجّل |
| [[session_regenerate_id(true)]] قبل ما تحفظ أي حاجة | يقفل session fixation ويمسح الملف القديم |
| [[user_id]] بس في الجلسة | الباقي من القاعدة |
| [[header('Location: ...')]] + [[exit]] | التحويل header بس، و [[exit]] هي اللي بتوقف |
| [[require_login()]] أول سطر في كل صفحة محمية | الحماية على السيرفر مش في الـ menu |`,
          lines: [
            "دوّر على المستخدم بالإيميل.",
            "نفّذ.",
            "صف أو false.",
            "مش موجود، أو الباسورد غلط...",
            "...نفس الرسالة في الحالتين.",
            "نجح:",
            "id جلسة جديد وامسح القديم.",
            "احفظ id المستخدم بس.",
            "حوّل للوحة.",
            "وقّف.",
            "قفلة.",
            "حارس لكل صفحة محمية، بيرجّع id المستخدم.",
            "مش داخل: حوّل ووقّف فورًا.",
            "داخل: رجّع الـ id.",
            "قفلة."
          ],
          sol: R`قبل الـ login الكوكي مثلًا [[PHPSESSID=b25539c3...]]، والـ response بتاع الـ login فيه [[303 See Other]] و [[Location: /dashboard.php]] و [[Set-Cookie: PHPSESSID=f710368c...]] جديدة. ده [[session_regenerate_id(true)]]: اللي كان عارف الـ id القديم (session fixation) مبقاش ليه لازمة، والملف القديم اتمسح بسبب [[true]].

[[curl -i localhost:8000/dashboard.php]] من غير كوكي: [[HTTP/1.1 302 Found]] و [[Location: /login.php]] والـ body فاضي خالص. لو شفت محتوى الصفحة تحت الـ 302، يبقى نسيت [[exit]] بعد [[header]]: المتصفح هيحوّل، بس curl وأي bot هيقروا الصفحة كلها.

وبإيميل أو باسورد غلط نفس الرسالة بالظبط [[الإيميل أو الباسورد غلط]] عشان محدش يعرف مين عنده حساب.`,
          solCode: R`<?php // public/dashboard.php
require dirname(__DIR__) . '/src/bootstrap.php'; // فيه session_start و db و require_login
$userId = require_login();
?>
<h1>أهلًا، رقمك <?= $userId ?></h1>`
        },
        {
          cmd: "CSRF token",
          title: "امنع موقع تاني يبعت فورم باسم المستخدم",
          desc: R`CSRF: موقع تاني فيه فورم مخفي بيعمل POST لموقعك، والمتصفح بيبعت كوكي الجلسة معاه أوتوماتيك، فالطلب بيعدّي كأن المستخدم هو اللي عمله. الحل: token عشوائي في الجلسة، بتحطه hidden في كل فورم، وبتقارنه مع كل POST. الموقع التاني ميعرفوش، فمبيقدرش يبعته.

[[SameSite=Lax]] على كوكي الجلسة طبقة تانية مهمة، بس الـ token هو الأساس.`,
          example: R`<?php
function csrf_token(): string {
    return $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
}
function csrf_ok(): bool {
    $token = $_SESSION['csrf'] ?? '';
    return $token !== '' && hash_equals($token, (string) ($_POST['csrf'] ?? ''));
}
?>
<form method="post" action="/posts/delete.php">
  <input type="hidden" name="csrf" value="<?= csrf_token() ?>">
  <input type="hidden" name="id" value="42">
  <button>امسح</button>
</form>`,
          try: R`في [[delete.php]] ضيف أول سطر: [[if (!csrf_ok()) { http_response_code(403); exit('الصفحة قديمة، ارجع وجرّب تاني'); }]]. ابعت الفورم عادي: شغال. ابعته بـ curl من غير token: 403. وجرّب تشيل [[$token !== '']] واعمل login من غير ما تفتح أي فورم، وابعت [[csrf=]] فاضي بنفس الكوكي: هيعدّي، ودي الثغرة اللي الشرط ده قافلها.`,
          flag: "script",
          deep: {
            why: "المستخدم داخل على موقعك، وفتح لينك في تاب تاني. الصفحة دي فيها فورم بيتبعت لوحده لـ [[/posts/delete.php]]. المتصفح بيبعت الكوكي، والسيرفر شايف جلسة سليمة، فبيمسح. من غير token، موقعك مش قادر يفرّق.",
            how: R`الموقع التاني يقدر يبعت طلبات لموقعك، بس مش قادر يقرا الردود ولا الـ HTML بتاع صفحاتك (same-origin policy). فالـ token اللي في الفورم بتاعك مستحيل يعرفه.

[[random_bytes(32)]] عشوائي آمن للتشفير، مش [[rand]] ولا [[uniqid]]. و [[??=]] بيعمله مرة واحدة للجلسة. token واحد للجلسة أبسط وبيشتغل مع أكتر من تاب، أما token جديد لكل طلب بيكسر التابات المفتوحة.

[[hash_equals]] بتقارن في وقت ثابت مهما كان مكان الاختلاف. والشرط [[$token !== '']] مهم: [[hash_equals('', '')]] = true، فجلسة جديدة مفيهاش token + فورم باعت token فاضي = عدّى.

لطلبات AJAX: حط الـ token في [[<meta name="csrf" content="...">]]، والـ JavaScript يبعته في header زي [[X-CSRF-Token]]، والسيرفر يقرا [[$_SERVER['HTTP_X_CSRF_TOKEN']]].

[[SameSite=Lax]]: المتصفح مش بيبعت الكوكي مع POST من موقع تاني، بس بيبعتها مع GET عادي (لينك). عشان كده أي حاجة بتغيّر بيانات (مسح، خروج، دفع) لازم POST، عمرها ما تبقى لينك GET.

في مشروع حقيقي فورم عام كان فيه CSRF token بالظبط كده مع honeypot وحد محاولات. بس endpoints الأدمن (JSON) كانت معتمدة على الجلسة لوحدها.`,
            when: "كل فورم أو طلب بيغيّر حاجة وانت معتمد على كوكي للدخول. Laravel بيعمله لوحده ([[@csrf]]).",
            mistakes: R`مسح أو خروج بـ لينك GET: لينك [[<a href="https://example.com/logout.php">]] في أي موقع أو إيميل بيخرّج اللي يدوس عليه، لأن [[SameSite=Lax]] بيبعت الكوكي مع التنقّل بـ GET. ومقارنة بـ [[==]]. وتعمل token جديد مع كل صفحة فالمستخدم اللي فاتح تابين يترفض. وتفتكر إن HTTPS بيحمي من CSRF: ملوش علاقة.`
          },
          teach: R`## الأول: المشكلة اللي بنحلها

انت داخل على موقعك، وفتحت صفحة في موقع تاني فيها فورم مخفي بيعمل POST لـ [[/posts/delete.php]]. المتصفح بيبعت كوكي جلستك مع الطلب لوحده، فسيرفرك شايف طلب من «انت». الحل: رقم سري (token) بيتحط في الجلسة وفي كل فورم بتاعك، والسيرفر يرفض أي POST مش جايب نفس الرقم. الموقع التاني ميقدرش يقرا صفحاتك، فمش هيعرف الرقم.

المثال دالتين وفورم. جرّبتهم على [[php -S]] (PHP 8.4.26): الدالتين في [[src/bootstrap.php]]، والفورم في صفحة [[form.php]]، والـ solCode في [[public/posts/delete.php]]، ومعاهم الـ login من الدرس اللي فات.

---

## ١. [[csrf_token()]]

~~~php
function csrf_token(): string {
    return $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
}
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[random_bytes(32)]] | 32 byte عشوائيين من مصدر آمن للتشفير (مش [[rand()]] اللي ممكن يتوقّع) |
| [[bin2hex(...)]] | حوّلهم نص hex: كل byte حرفين، فـ 32 byte = 64 حرف |
| [[??=]] | «لو [[$_SESSION['csrf']]] مش موجود، حط فيه القيمة دي»، ولو موجود سيبه |
| [[return]] | رجّع القيمة اللي في الجلسة (الجديدة أو القديمة) |

يعني token واحد للجلسة كلها. فتحت الفورم مرتين بنفس الكوكي:

~~~text الناتج
value="cb6ffd858d0b31042ec75568a6448233394b7422cf687d080a6da885dc52d275"
value="cb6ffd858d0b31042ec75568a6448233394b7422cf687d080a6da885dc52d275"
~~~

نفس القيمة، 64 حرف. فلو فاتح الموقع في تابين، الاتنين شغالين.

## ٢. [[csrf_ok()]]

~~~php
function csrf_ok(): bool {
    $token = $_SESSION['csrf'] ?? '';
    return $token !== '' && hash_equals($token, (string) ($_POST['csrf'] ?? ''));
}
~~~

- [[$token]]: الـ token المحفوظ، أو نص فاضي لو مفيش.
- [[(string) ($_POST['csrf'] ?? '')]]: اللي جاي من الفورم، ولو مش موجود نص فاضي. و [[(string)]] عشان لو حد بعت [[csrf[]=x]] (array) ميوقّعش [[hash_equals]] بـ TypeError.
- [[hash_equals(a, b)]]: مقارنة نصين بتاخد نفس الوقت مهما كان مكان أول اختلاف. [[===]] بتقف عند أول حرف مختلف، والفرق في الوقت ممكن يتقاس ويخمّن منه حرف حرف (timing attack).
- [[&&]] = and: الاتنين لازم يبقوا صح.

ليه [[$token !== '']]؟ عشان:

~~~php
var_dump(hash_equals('', ''));
~~~

~~~text الناتج
bool(true)
~~~

جلسة لسه ملهاش token + فورم باعت token فاضي = متطابقين! جرّبت ده بجد تحت.

## ٣. الفورم

~~~php
?>
<form method="post" action="/posts/delete.php">
  <input type="hidden" name="csrf" value="<?= csrf_token() ?>">
  <input type="hidden" name="id" value="42">
  <button>امسح</button>
</form>
~~~

- [[?>]] نهاية PHP، والباقي HTML.
- [[method="post"]]: المسح عمره ما يبقى GET (لينك)، لأن [[SameSite=Lax]] بيبعت الكوكي مع لينك GET من أي موقع.
- [[type="hidden"]]: حقل مش ظاهر بس بيتبعت مع الفورم. [[name="csrf"]] هو اللي [[$_POST['csrf']]] بيقراه.
- [[<?= csrf_token() ?>]]: اطبع الـ token جوه الـ HTML. (الـ token hex بس، فمش محتاج [[htmlspecialchars]]، بس أي قيمة تانية محتاجاها.)

---

## ٤. الـ solCode: [[delete.php]]

~~~php
<?php // public/posts/delete.php
require dirname(__DIR__, 2) . '/src/bootstrap.php';
if (!csrf_ok()) { http_response_code(403); exit('الصفحة قديمة، ارجع وجرّب تاني'); }
$userId = require_login();
$id = (int) ($_POST['id'] ?? 0);
db()->prepare('DELETE FROM posts WHERE id = :id AND user_id = :uid')
    ->execute(['id' => $id, 'uid' => $userId]);
header('Location: /dashboard.php', true, 303);
exit;
~~~

| السطر | بيعمل إيه |
|---|---|
| [[dirname(__DIR__, 2)]] | اطلع فولدرين لفوق: من [[public/posts]] لجذر المشروع |
| [[if (!csrf_ok()) {...}]] | token غلط: [[403]] (Forbidden) ورسالة ووقّف. [[exit('...')]] بتطبع النص وتوقف |
| [[require_login()]] | لازم يكون داخل |
| [[(int) ($_POST['id'] ?? 0)]] | الـ id رقم، ولو مش موجود 0 |
| [[DELETE ... AND user_id = :uid]] | امسح بس لو البوست بتاعه |
| [[header(..., 303)]] + [[exit]] | رجّعه للوحة (POST → Redirect → GET) |

---

## ٥. التجربة

بعد login بجرة كوكيز [[j9.txt]] (البوست 42 بتاع المستخدم 1):

~~~bash
curl -s -i -b j9.txt -d "id=42" localhost:5885/posts/delete.php
curl -s -o /dev/null -w "%{http_code}\n" -b j9.txt -d "csrf=abc&id=42" localhost:5885/posts/delete.php
curl -s -i -b j9.txt -d "csrf=$T&id=42" localhost:5885/posts/delete.php
~~~

[[$T]] متغير shell فيه الـ token اللي قريته من الفورم، و [[-w "%{http_code}"]] بيطبع الـ status بس، و [[-o /dev/null]] بيرمي الـ body.

| الطلب | الناتج |
|---|---|
| من غير token | [[HTTP/1.1 403 Forbidden]] و [[الصفحة قديمة، ارجع وجرّب تاني]] |
| token غلط [[abc]] | [[403]] |
| الـ token الصح | [[HTTP/1.1 303 See Other]] و [[Location: /dashboard.php]]، والبوست 42 اتمسح من الجدول |

وفي PowerShell نفس الـ 403:

~~~powershell
curl.exe -s -o NUL -w "%{http_code}$__btn" -d "id=42" http://localhost:5885/posts/delete.php
(Invoke-WebRequest http://localhost:5885/posts/delete.php -Method Post -Body @{id=42} -SkipHttpErrorCheck).StatusCode
~~~

~~~text الناتج
403
403
~~~

([[NUL]] هو [[/dev/null]] بتاع ويندوز، و [[-Body @{id=42}]] بيتبعت كفورم.)

### من غير [[$token !== '']]

شلت الشرط، وعملت login جديد **من غير ما أفتح أي فورم** (يعني الجلسة ملهاش token)، وبعت [[csrf=]] فاضي:

~~~text الناتج
HTTP/1.1 303 See Other
Location: /dashboard.php
~~~

والبوست اتمسح فعلًا. ده بالظبط اللي موقع تاني كان يقدر يعمله. رجّعت الشرط: [[403]].

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[random_bytes(32)]] | token مستحيل يتخمّن |
| [[??=]] | واحد للجلسة، فالتابات المتعددة شغالة |
| [[type="hidden"]] في كل فورم POST | الفورم بتاعك بس اللي يعرفه |
| [[hash_equals]] | مقارنة بوقت ثابت |
| [[$token !== '']] | فاضي = فاضي مش نجاح |
| أي تغيير بـ POST مش GET | [[SameSite=Lax]] بيحمي POST بس |`,
          lines: [
            "بداية الملف.",
            "دالة بترجّع token الجلسة.",
            "لو مفيش، اعمل واحد عشوائي ٦٤ حرف واحفظه.",
            "قفلة.",
            "دالة بتتأكد من الـ token اللي جاي.",
            "الـ token المحفوظ.",
            "لازم يكون موجود، ويطابق اللي في الفورم بمقارنة آمنة.",
            "قفلة.",
            "نهاية PHP.",
            "فورم مسح، POST.",
            "الـ token مخفي في الفورم.",
            "الـ id اللي هيتمسح.",
            "زرار.",
            "قفلة الفورم."
          ],
          sol: R`الفورم العادي: [[303]] لـ [[/dashboard.php]] والبوست اتمسح. [[curl -d "id=42" localhost:8000/posts/delete.php]] من غير token: [[403]] والنص [[الصفحة قديمة، ارجع وجرّب تاني]].

من غير [[$token !== '']]: [[curl -d "csrf=&id=42"]] بكوكي جلسة عاملة login ولسه مفتحتش أي فورم بيعدّي بـ [[303]] والبوست بيتمسح، لأن [[$_SESSION['csrf']]] مش موجود فبقى [['']]، و [[hash_equals('', '')]] = true. يعني أي مستخدم داخل ومفتحش فورم لسه يتعمله CSRF بـ token فاضي. (ومن غير كوكي خالص الطلب بيعدّي فحص الـ token ويقف عند [[require_login]] بـ 302.) رجّع الشرط وهترجع 403.

لو كل طلباتك بقت 403 حتى الفورم الصح، اتأكد إن [[session_start()]] متنادي في [[delete.php]] قبل [[csrf_ok()]]، وإن الفورم والـ delete على نفس الـ domain (الكوكي بتاعة الجلسة لازم توصل).`,
          solCode: R`<?php // public/posts/delete.php
require dirname(__DIR__, 2) . '/src/bootstrap.php'; // session_start + csrf_ok
if (!csrf_ok()) { http_response_code(403); exit('الصفحة قديمة، ارجع وجرّب تاني'); }
$userId = require_login();
$id = (int) ($_POST['id'] ?? 0);
db()->prepare('DELETE FROM posts WHERE id = :id AND user_id = :uid')
    ->execute(['id' => $id, 'uid' => $userId]);
header('Location: /dashboard.php', true, 303);
exit;`
        },
        {
          cmd: "session_destroy",
          title: "خروج كامل: البيانات والكوكي وملف الجلسة",
          desc: R`الخروج الصح ٣ خطوات: فضّي [[$_SESSION]]، وامسح كوكي الجلسة من المتصفح، و [[session_destroy()]] يمسح الملف من السيرفر. [[session_destroy]] لوحدها مبتمسحش الكوكي ولا [[$_SESSION]] في الطلب ده.

والخروج نفسه POST بـ CSRF token، مش لينك.`,
          example: R`<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
if (!csrf_ok()) { http_response_code(403); exit; }
$_SESSION = [];
$p = session_get_cookie_params();
setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
session_destroy();
header('Location: /login.php', true, 303);
exit;`,
          try: R`اعمل login، وبعدين الخروج بفورم فيه زرار و token. في DevTools اتأكد إن PHPSESSID اتمسحت. وافتح فولدر الجلسات (لو محلي): الملف اتمسح.`,
          flag: "script",
          deep: {
            why: "خروج ناقص معناه إن الجلسة لسه عايشة: على جهاز مشترك، اللي بعدك يرجع بـ Back أو بالكوكي القديمة ويلاقي نفسه داخل.",
            how: R`[[$_SESSION = []]] بيفضّي البيانات في الطلب ده. [[setcookie]] بتاريخ قديم بيقول للمتصفح «امسح الكوكي دي». لازم نفس [[path]] و [[domain]] اللي اتعملت بيهم، عشان كده [[session_get_cookie_params()]]. و [[session_destroy()]] بيمسح ملف الجلسة من السيرفر. ده نفس المثال اللي في توثيق PHP الرسمي.

لو فيه «افتكرني»: امسح التوكن من القاعدة وامسح الكوكي بتاعته كمان، وإلا أول صفحة بعد الخروج هتعمل login تاني لوحدها.

والـ POST مهم: الخروج بـ GET معناه إن أي موقع أو إيميل يحط لينك لـ [[https://example.com/logout.php]] (أو يعمل redirect ليه) يخرّج اللي يدوس عليه من موقعك، لأن [[SameSite=Lax]] بيبعت الكوكي مع التنقّل بـ GET (و [[<img>]] كمان لو الكوكي [[SameSite=None]]). مش كارثة، بس مزعج، وبيبيّن إن فيه طلبات بتغيّر حالة بـ GET.`,
            when: "زرار الخروج، وتغيير الباسورد (اخرج من كل الجلسات التانية)، وحذف الحساب.",
            mistakes: R`في مشروع حقيقي الخروج كان لينك GET عادي. و [[session_destroy]] لوحدها وتفتكر الكوكي راحت. ونسيان توكن «افتكرني» فالخروج مبيخرّجش.`
          },
          teach: R`## الأول: الجلسة عايشة في ٣ أماكن

| المكان | فيه إيه | بيتمسح بـ |
|---|---|---|
| [[$_SESSION]] في الطلب ده | البيانات وانت شغال | [[$_SESSION = []]] |
| المتصفح | كوكي [[PHPSESSID]] | [[setcookie]] بتاريخ قديم |
| السيرفر | ملف [[sess_...]] | [[session_destroy()]] |

الخروج الصح بيمسح التلاتة. جرّبت المثال كصفحة [[logout.php]] على [[php -S]] (PHP 8.4.26)، وبدل سطر [[session_start();]] حطيت [[require]] لملف [[bootstrap.php]] من الدروس اللي فاتت (فيه [[session_start]] بالإعدادات الآمنة و [[csrf_ok()]] اللي المثال بيستخدمها).

---

## ١. افتح الجلسة، واقبل POST بـ token بس

~~~php
<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
if (!csrf_ok()) { http_response_code(403); exit; }
~~~

- لازم [[session_start()]] الأول حتى للخروج: مينفعش تمسح جلسة مفتحتهاش.
- [[$_SERVER['REQUEST_METHOD']]] نوع الطلب ([[GET]] أو [[POST]]...). مش POST؟ [[405]] = Method Not Allowed.
- [[csrf_ok()]] من درس الـ CSRF: من غير token صح [[403]].

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" -b j10.txt localhost:5885/logout.php
curl -s -o /dev/null -w "%{http_code}\n" -b j10.txt -X POST localhost:5885/logout.php
~~~

~~~text الناتج
405
403
~~~

الأول GET عادي (زي لينك أو [[<img>]] في موقع تاني)، والتاني POST من غير token. و [[-X POST]] بيجبر curl يبعت POST من غير بيانات.

---

## ٢. [[$_SESSION = []]]

~~~php
$_SESSION = [];
~~~

فضّي الـ array. أي كود بعد السطر ده في نفس الطلب مش هيلاقي [[user_id]].

## ٣. امسح الكوكي من المتصفح

~~~php
$p = session_get_cookie_params();
setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
~~~

- [[session_get_cookie_params()]]: array بإعدادات كوكي الجلسة الحالية. مثلًا من غير أي إعدادات:

~~~text الناتج (print_r)
Array
(
    [lifetime] => 0
    [path] => /
    [domain] => 
    [secure] => 
    [httponly] => 
    [samesite] => 
)
~~~

- [[session_name()]]: اسم الكوكي، [[PHPSESSID]] افتراضيًا.
- [[setcookie(اسم، قيمة، وقت الانتهاء، path، domain، secure، httponly)]]: القيمة فاضية، ووقت الانتهاء [[time() - 42000]]. [[time()]] الوقت دلوقتي بالثواني، وناقص 42000 ثانية (حوالي ١١ ساعة ونص) يعني «انتهت من زمان»، والمتصفح بيمسح أي كوكي منتهية. الرقم نفسه مش مهم، المهم إنه في الماضي (ده الرقم اللي في توثيق PHP).
- ليه نبعت الـ path والـ domain؟ المتصفح بيعتبر الكوكي «نفس الكوكي» بس لو الاسم والـ path والـ domain زي بعض. لو اختلفوا، هيعمل كوكي تانية ويسيب الأصلية.

## ٤. [[session_destroy()]] والتحويل

~~~php
session_destroy();
header('Location: /login.php', true, 303);
exit;
~~~

[[session_destroy()]] بتمسح ملف الجلسة من السيرفر، وبعدها حوّل لصفحة الدخول ووقّف.

---

## ٥. التجربة كاملة

login، وفتحت صفحة فيها فورم عشان آخد الـ token، وبصيت على ملف الجلسة:

~~~text الناتج (محتوى /tmp/sess_6976556c...)
user_id|i:1;csrf|s:64:"e7b193e7dd3f7f289a5c01fe6851457974afc4e83f0df204417bd89665b392c1";
~~~

[[s:64:"..."]] = string طوله 64. وبعدين الخروج بالـ token:

~~~bash
curl -s -i -c j10.txt -b j10.txt -d "csrf=$T" localhost:5885/logout.php
~~~

~~~text الناتج
HTTP/1.1 303 See Other
Set-Cookie: PHPSESSID=deleted; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; path=/; secure; HttpOnly
Location: /login.php
~~~

- PHP كتب القيمة [[deleted]] وتاريخ 1970 و [[Max-Age=0]]: كل ده معناه «امسحها دلوقتي». و [[secure; HttpOnly]] جت من [[$p]].
- curl مسح الكوكي من [[j10.txt]] (بقى مفيهوش ولا سطر [[PHPSESSID]])، زي ما المتصفح بيعمل.
- الملف على السيرفر:

~~~text الناتج
ls: cannot access '/tmp/sess_6976556c764cdb1534e3ecb3fd3c2f50': No such file or directory
~~~

ولو حد كان ناسخ الـ id القديم وبعته بإيده لـ [[dashboard.php]]: [[302]] لـ [[/login.php]]، لأن الملف اتمسح و [[use_strict_mode]] رفض الـ id.

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| POST بس | [[REQUEST_METHOD !== 'POST']] ⇒ 405 |
| token صح | [[csrf_ok()]] ⇒ 403 |
| البيانات | [[$_SESSION = []]] |
| الكوكي | [[setcookie(session_name(), '', time() - 42000, ...)]] بنفس الـ params |
| الملف | [[session_destroy()]] |
| التحويل | [[header('Location: /login.php', true, 303)]] + [[exit]] |

ولو فيه كوكي «افتكرني»، امسحها هي والتوكن بتاعها من القاعدة كمان.`,
          lines: [
            "بداية الملف.",
            "افتح الجلسة الحالية.",
            "POST بس، وإلا 405.",
            "token صحيح بس، وإلا 403 زي درس CSRF.",
            "فضّي البيانات.",
            "إعدادات الكوكي (path و domain...).",
            "امسح الكوكي من المتصفح بتاريخ قديم.",
            "امسح ملف الجلسة من السيرفر.",
            "حوّل لصفحة الدخول.",
            "وقّف."
          ],
          sol: R`الـ response بتاع الخروج: [[303 See Other]] و [[Location: /login.php]] و [[Set-Cookie: PHPSESSID=deleted; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; path=/; HttpOnly]]. تاريخ قديم = المتصفح يمسحها، فمش هتلاقيها في DevTools. وملف [[sess_...]] اختفى من فولدر الجلسات ([[php -r 'echo session_save_path();']] بيقولك فين، على Ubuntu [[/var/lib/php/sessions]]).

لو فتحت [[/logout.php]] كرابط عادي: [[405]]، لأن الخروج بـ GET معناه إن أي [[<img src="/logout.php">]] في أي موقع يخرّجك. ولو الكوكي فضلت موجودة بعد الخروج، غالبًا الـ path أو الـ domain في [[setcookie]] مش زي اللي اتعملت بيهم، وده سبب إننا بناخدهم من [[session_get_cookie_params()]].`
        }
      ]
    }
]);
