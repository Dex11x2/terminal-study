// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "MySQL و PDO",
      l: 2,
      n: "جدول مظبوط من الأول، واتصال واحد، وكل قيمة من المستخدم بتروح في prepared statement",
      items: [
        {
          cmd: "AUTO_INCREMENT و utf8mb4",
          title: "جدول MySQL صح من أول مرة، وإيه المختلف عن Postgres",
          desc: R`في MySQL الـ id بيتولّد بـ [[AUTO_INCREMENT]]، والـ bool بيبقى [[TINYINT(1)]]، والجدول [[ENGINE=InnoDB]] عشان الـ transactions والـ foreign keys. والأهم: الـ charset يبقى [[utf8mb4]] مش [[utf8]]. الـ [[utf8]] في MySQL نسخة ناقصة (٣ bytes للحرف) مبتشيلش الإيموجي وبعض الرموز.

لو جاي من PostgreSQL: مفيش [[RETURNING]] (الـ id الجديد من [[lastInsertId]])، والـ upsert اسمه [[ON DUPLICATE KEY UPDATE]]، والأسماء بتتقفل بـ backticks، والمقارنة النصية افتراضيًا مش حساسة لحالة الحروف. وأساسيات SQL نفسها في تاب «SQL و Prisma».`,
          example: R`CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO users (email, name, password_hash) VALUES ('ali@example.com', 'Ali', 'x')
  ON DUPLICATE KEY UPDATE name = 'Ali';
SELECT LAST_INSERT_ID();
SHOW CREATE TABLE users;`,
          try: R`شغّل MySQL في Docker ([[docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=myapp -p 127.0.0.1:3306:3306 mysql:8.4]])، واعمل الجدول، وضيف مستخدم اسمه فيه إيموجي. بعدين اعمل جدول تاني بـ [[CHARSET=utf8mb3]] وجرّب نفس الإيموجي واقرا [[Incorrect string value]]. وجرّب [[SELECT * FROM users WHERE email = 'ALI@EXAMPLE.COM']]: هيلاقيه.`,
          flag: "script",
          deep: {
            why: "الاستضافة المشتركة كلها تقريبًا MySQL أو MariaDB. وغلطة في إنشاء الجدول (utf8 بدل utf8mb4، أو MyISAM، أو latin1) بتبان بعد شهور: العربي بيتخزن علامات استفهام، أو الإيموجي بيوقّع الـ INSERT.",
            how: R`الـ charset لازم يبقى [[utf8mb4]] في السلسلة كلها: القاعدة والجدول والعمود، والاتصال كمان ([[charset=utf8mb4]] في الـ DSN، الدرس الجاي). لو الاتصال latin1 والجدول utf8mb4، العربي بيتخزن مكسور (mojibake) ومحدش بيلاحظ غير لما يفتح القاعدة من برنامج تاني.

الـ collation بيحدد المقارنة والترتيب. أي collation آخره [[_ci]] مش حساس لحالة الحروف، فـ [[WHERE email = 'ALI@...']] بيلاقي [[ali@...]]. مريح للإيميل، ومفاجأة لو بتقارن tokens حساسة. MySQL 8 افتراضيه [[utf8mb4_0900_ai_ci]]، و MariaDB القديمة مبتعرفهوش، فـ dump من MySQL 8 يقع على الاستضافة بـ [[Unknown collation]]. [[utf8mb4_unicode_ci]] شغال على الاتنين.

فروق عن Postgres هتقابلها: [[AUTO_INCREMENT]] بدل [[GENERATED ... AS IDENTITY]]. الأسماء المحجوزة بين backticks ([[$__btorder$__bt]]) مش علامات تنصيص مزدوجة. [[||]] في MySQL معناها OR، والدمج بـ [[CONCAT()]]. [[TIMESTAMP]] بيتحوّل حسب timezone الاتصال وليه حد سنة 2038، و [[DATETIME]] بيتخزن زي ما هو. ومفيش [[ILIKE]]، لأن [[LIKE]] أصلًا مش حساس للحروف مع [[_ci]].

الـ upsert: [[ON DUPLICATE KEY UPDATE]] بيشتغل لما الـ INSERT يخبط في [[UNIQUE]] أو [[PRIMARY KEY]]. الصيغة [[VALUES(name)]] جواه deprecated في MySQL 8، والبديل الجديد (alias للصف) MariaDB مبتفهمهوش، فالأبسط تبعت القيمة تاني كـ parameter.

وكتير من الاستضافات MariaDB مش MySQL. متوافقين في الأغلب، بس فيه فروق: مثلًا [[ADD COLUMN IF NOT EXISTS]] شغال في MariaDB ومش موجود في MySQL 8.4.`,
            when: "كل جدول جديد. ولجدول موجود: [[SHOW CREATE TABLE]] يوريك الـ engine والـ charset بتوعه في ثانية.",
            mistakes: R`في مشروع حقيقي سكربت migration كان بيستخدم [[ALTER TABLE ... ADD COLUMN IF NOT EXISTS]]: شغال على MariaDB بتاعة الاستضافة، ويقع على MySQL لو نقلت. ونفس المشروع كان فيه صفحة أدمن بتعمل [[CREATE TABLE IF NOT EXISTS]] مع كل فتحة: تغييرات الجداول مكانها سكربت migration بيتشغّل مرة، مش كود الصفحة. و [[utf8]] بدل [[utf8mb4]]. و [[FLOAT]] للفلوس بدل [[DECIMAL(10,2)]] أو int بالقرش.`
          },
          lines: [
            "جدول المستخدمين.",
            "id رقم موجب بيزيد لوحده، وهو المفتاح.",
            "الإيميل مطلوب ومينفعش يتكرر.",
            "الاسم.",
            "hash الباسورد، 255 عشان الخوارزمية ممكن تتغير.",
            "bool في MySQL: 0 أو 1.",
            "وقت الإنشاء بيتحط لوحده.",
            "InnoDB، و utf8mb4 بـ collation شغال على MySQL و MariaDB.",
            "ضيف مستخدم...",
            "...ولو الإيميل موجود، حدّث الاسم بدل ما يقع.",
            "آخر id اتولّد في الاتصال ده.",
            "اعرض تعريف الجدول كامل (engine و charset)."
          ],
          sol: R`الجدول بيتعمل و [[SELECT LAST_INSERT_ID()]] بيطلّع 1. المستخدم بالإيموجي بيتخزن ويرجع زي ما هو، و [[CHAR_LENGTH(name)]] لـ [['سارة 😀']] = 6 و [[LENGTH]] = 13 byte. (اتجربت على MariaDB 10.11؛ MySQL 8.4 بيدي نفس النتايج.)

جدول [[utf8mb3]]: [[ERROR 1366 (22007): Incorrect string value: '\xF0\x9F\x98\x80' for column ... name at row 1]] (اسم العمود مكتوب بشكل مختلف شوية بين MySQL و MariaDB). الإيموجي 4 bytes و utf8mb3 مبيشيلش غير 3. و [[WHERE email = 'ALI@EXAMPLE.COM']] بيلاقي [[ali@example.com]] لأن [[_ci]] = case-insensitive، وده برضه معناه إن UNIQUE هيرفض الاتنين مع بعض.

لو الإيموجي أو العربي رجع كلام مكسور زي [[Ø³Ø§Ø±Ø©]] من غير أي error، يبقى الجدول سليم والمشكلة في charset الاتصال: الـ client بعت UTF-8 على إنه latin1. في الترمنال [[mysql --default-character-set=utf8mb4]]، وفي PHP [[charset=utf8mb4]] في الـ DSN. وملاحظة: [[ON DUPLICATE KEY UPDATE]] بيحرق رقم AUTO_INCREMENT حتى لو معملش insert، فمتستغربش لو الـ ids فيها فجوات.`
        },
        {
          cmd: "new PDO",
          title: "اتصال واحد بالقاعدة بالإعدادات الصح",
          desc: R`PDO الواجهة الموحدة في PHP لأي قاعدة: MySQL و PostgreSQL و SQLite. [[new PDO($dsn, $user, $pass, $options)]]، والـ DSN فيه نوع القاعدة والـ host والاسم و [[charset=utf8mb4]].

تلات options مهمين: الأخطاء exceptions، والصفوف ترجع associative arrays، و [[EMULATE_PREPARES]] بـ false عشان الـ prepared statements تبقى حقيقية على سيرفر القاعدة. وحط الاتصال في دالة واحدة [[db()]]، فكل الموقع يستخدم نفس الاتصال في الطلب.`,
          example: R`<?php
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $c = require dirname(__DIR__) . '/config.php';
        $dsn = "mysql:host={$c['db_host']};dbname={$c['db_name']};charset=utf8mb4";
        $pdo = new PDO($dsn, $c['db_user'], $c['db_pass'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}`,
          try: R`حط الدالة في [[src/db.php]] ونادي [[db()->query('SELECT VERSION()')->fetchColumn()]]. بعدين غلّط الباسورد في الإعدادات وشوف الـ PDOException، ولاحظ إن الرسالة فيها اسم المستخدم والـ host: ده سبب إنها متتعرضش للزوار أبدًا.`,
          flag: "script",
          deep: {
            why: "دوال [[mysql_*]] القديمة اتشالت من PHP 7. ومن غير دالة واحدة للاتصال، كل صفحة بتفتح اتصال بطريقتها وبإعدادات مختلفة، وتغيير الباسورد يبقى في عشر أماكن.",
            how: R`الـ DSN: [[mysql:host=...;port=3306;dbname=...;charset=utf8mb4]]. من غير [[charset]] الاتصال ممكن ياخد charset السيرفر الافتراضي والعربي يتكسر.

[[new PDO]] بيرمي [[PDOException]] لو الاتصال فشل مهما كانت الإعدادات. ومن PHP 8 الافتراضي بقى [[ERRMODE_EXCEPTION]] لكل الـ queries، وقبلها كان silent: الـ query يفشل ويرجع false ومحدش يعرف. اكتبها صريحة.

[[FETCH_ASSOC]]: الافتراضي [[FETCH_BOTH]] بيرجّع كل عمود مرتين (بالاسم وبالرقم)، فالـ array ضعف الحجم والـ JSON بيطلع غريب.

[[EMULATE_PREPARES]]: افتراضي pdo_mysql إنه يعمل «محاكاة»: PHP نفسه بيحط القيم في الـ SQL (بـ escaping آمن طول ما الـ charset في الـ DSN) ويبعت نص واحد. بـ false، الـ SQL بيتبعت للسيرفر لوحده والقيم لوحدها. الفرق العملي: مع false مينفعش تكرر نفس الـ placeholder مرتين في query، ومع true [[LIMIT :n]] بيتحط بين علامات تنصيص لو مبعتوش int.

[[static $pdo]]: المتغير بيفضل موجود بين نداءات الدالة في نفس الطلب، فأول نداء بيفتح الاتصال والباقي بياخدوه. وفي آخر الطلب الاتصال بيتقفل لوحده. وفي PHP 8.4 فيه [[PDO::connect()]] بترجّع كلاس خاص بالقاعدة ([[Pdo\MySql]]).`,
            when: "مرة واحدة في ملف bootstrap، وكل الكود بينادي [[db()]]. لو المشروع كبر، الـ PDO بيتبعت للكلاسات في الـ constructor (المستوى الثالث).",
            mistakes: R`في مشروع حقيقي الاتصال كان [[mysqli_connect]] في ملف إعدادات بيتعمله include في كل صفحة ومتغير global اسمه غريب، وبيانات القاعدة متكررة في ملفين، فتغيير الباسورد محتاج تفتكر الاتنين. وتعرض [[$e->getMessage()]] للزائر لما الاتصال يفشل. وتنسى [[charset=utf8mb4]] فالعربي يطلع [[????]]. وعلى Docker: [[localhost]] جوه الـ container هو الـ container نفسه، اكتب اسم service القاعدة.`
          },
          lines: [
            "بداية الملف.",
            "دالة بترجّع الاتصال.",
            "متغير بيعيش بين النداءات في نفس الطلب.",
            "أول مرة بس.",
            "الإعدادات من ملف بره الموقع.",
            "نوع القاعدة والـ host والاسم والـ charset.",
            "افتح الاتصال.",
            "أي غلطة = exception.",
            "الصفوف arrays بأسماء الأعمدة.",
            "prepared statements حقيقية على السيرفر.",
            "قفلة الـ options.",
            "قفلة الـ if.",
            "رجّع نفس الاتصال.",
            "قفلة."
          ],
          sol: R`[[db()->query('SELECT VERSION()')->fetchColumn()]] بيطبع نسخة القاعدة، زي [[8.4.x]] على MySQL أو [[10.11.14-MariaDB-...]] على MariaDB.

بباسورد غلط: [[Fatal error: Uncaught PDOException: SQLSTATE[HY000] [1045] Access denied for user 'myapp_user'@'localhost' (using password: YES)]] ومعاها المسار ورقم السطر. الرسالة فيها اسم المستخدم والـ host ومسارات ملفاتك، ودي معلومات لأي حد بيحاول يخترق. عشان كده في الإنتاج [[display_errors=0]] والـ exception يتسجل في اللوج والزائر يشوف رسالة عامة.

الباسورد نفسه مش في الـ stack trace لأن PHP من 8.2 بيعلّم الـ parameter ده بـ [[#[\SensitiveParameter]]]. لو شايف [[could not find driver]] يبقى [[pdo_mysql]] مش متسطّب ([[php -m | grep pdo]])، ولو [[Connection refused]] يبقى القاعدة مش شغالة أو الـ port غلط.`,
          solCode: R`<?php
require __DIR__ . '/src/db.php';
echo db()->query('SELECT VERSION()')->fetchColumn(), "\n";`
        },
        {
          cmd: "prepare / execute",
          title: "ابعت قيم المستخدم للقاعدة من غير SQL injection",
          desc: R`القاعدة الذهبية: قيمة المستخدم عمرها ما تتلزق في نص الـ SQL. تكتب الـ SQL بـ placeholders زي [[:email]]، وتبعت القيم لوحدها في [[execute()]]. القاعدة بتستلم الأمر والقيم منفصلين، فأي [[' OR 1=1 --]] بيفضل نص عادي بيتدوّر عليه.

وبعد [[INSERT]]، [[lastInsertId()]] بيرجّع الـ id الجديد، و [[rowCount()]] بعد [[UPDATE]] أو [[DELETE]] بيقولك كام صف اتغير.`,
          example: R`$stmt = db()->prepare('SELECT id, name, password_hash FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
$stmt = db()->prepare('INSERT INTO posts (user_id, title) VALUES (:uid, :title)');
$stmt->execute(['uid' => $user['id'], 'title' => $title]);
$postId = (int) db()->lastInsertId();
$stmt = db()->prepare('UPDATE posts SET title = :title WHERE id = :id AND user_id = :uid');
$stmt->execute(['uid' => $user['id'], 'title' => $newTitle, 'id' => $postId]);
echo $stmt->rowCount() === 1 ? 'اتعدّل' : 'مش بتاعك أو مش موجود';
$stmt = db()->prepare('SELECT * FROM posts ORDER BY id DESC LIMIT :n');
$stmt->bindValue(':n', 10, PDO::PARAM_INT);
$stmt->execute();`,
          try: R`اكتب النسخة الغلط عمدًا: [["SELECT * FROM users WHERE email = '$email'"]] وجرّب [[$email = "x' OR '1'='1"]]: هترجع كل المستخدمين. بعدين نفس القيمة مع [[prepare]]: صفر نتايج.`,
          flag: "script",
          deep: {
            why: "SQL injection من أقدم وأخطر الثغرات: حد يكتب SQL مكان الإيميل، فيدخل من غير باسورد، أو يقرا الجداول كلها، أو يمسحها. والسبب دايمًا واحد: قيمة من برّه اتلزقت في نص الـ query.",
            how: R`مع [[EMULATE_PREPARES = false]]: [[prepare]] بيبعت الـ SQL بالـ placeholders للسيرفر، فيفهمه ويجهّز خطته. [[execute]] بيبعت القيم بعدين كبيانات بس. مفيش أي طريقة القيمة تتفهم كأوامر، لأن الأوامر اتفهمت خلاص قبل ما القيمة توصل.

[[execute(['email' => $email])]]: الـ key بالنقطتين أو من غيرها، الاتنين شغالين. وفيه placeholders بالترتيب [[?]] كمان: [[execute([$email])]].

الـ placeholders للقيم بس. مينفعش لاسم جدول أو عمود أو [[ASC]] و [[DESC]]. لو الترتيب جاي من المستخدم، اعمل allowlist: [[$col = match ($_GET['sort'] ?? '') { 'price' => 'price', 'name' => 'name', default => 'id' };]] وبعدين حطه في الـ SQL. ولـ [[IN]] بعدد متغير: [[implode(',', array_fill(0, count($ids), '?'))]] وابعت [[$ids]] في execute.

[[LIMIT :n]]: [[execute]] بيبعت كل القيم كنصوص، ومع الـ emulation بتبقى [[LIMIT '10']] و MySQL يرفض. [[bindValue]] بـ [[PDO::PARAM_INT]] بيحلها في الحالتين.

مع emulation مقفولة مينفعش نفس الاسم مرتين ([[:q OR :q]])، استخدم [[:q1]] و [[:q2]]. و [[lastInsertId]] بيرجّع نص، فـ [[(int)]]. و [[rowCount]] في MySQL بيعد الصفوف اللي اتغيرت فعلًا: UPDATE بنفس القيم القديمة بيرجّع 0.

وخلي بالك: [[AND user_id = :uid]] في الـ UPDATE هي اللي بتمنع مستخدم يعدّل بوست حد تاني بتغيير الـ id في الرابط (IDOR).`,
            when: "أي query فيه أي متغير، حتى لو القيمة من الجلسة أو من القاعدة نفسها. [[query()]] من غير prepare بس للـ SQL الثابت.",
            mistakes: R`في مشروع حقيقي الـ login كان بيبني الـ query بـ [[mysqli_real_escape_string]] ولزق نصوص. الـ escaping بيحمي جوه علامات التنصيص بس: [[WHERE id = $id]] من غير تنصيص مفيهاش حماية خالص. ونفس المشروع كان بيحط كود الأدمن من الجلسة جوه الـ SQL على أساس «ده من الجلسة يبقى آمن»: عادة وحشة، ولو القيمة دي اتخزنت يومًا من مصدر غلط تبقى second-order injection. وتفتكر إن [[prepare]] بتحمي اسم العمود.`
          },
          lines: [
            "جهّز الـ query بـ placeholder اسمه email.",
            "ابعت القيمة لوحدها.",
            "صف واحد أو false.",
            "INSERT بنفس الطريقة.",
            "القيمتين منفصلين عن الـ SQL.",
            "الـ id الجديد (بيرجع نص فبنحوّله).",
            "UPDATE بشرط إن البوست بتاع المستخدم ده.",
            "القيم.",
            "كام صف اتغير.",
            "LIMIT بـ placeholder.",
            "اربطه كرقم صريح.",
            "نفّذ من غير array لأن القيمة اتربطت."
          ],
          sol: R`النسخة الغلط: [[SELECT id, email FROM users WHERE email = 'x' OR '1'='1']] بترجّع كل المستخدمين (3 من 3 في تجربتي). الـ [[']] اللي في الإيميل قفلت النص، والباقي بقى SQL: [['1'='1']] دايمًا true.

نفس القيمة مع [[prepare]]: صفر نتايج. القاعدة دوّرت على إيميل حرفيًا [[x' OR '1'='1]]، ومفيش حد بالإيميل ده. الـ SQL اتبعت الأول لوحده والقيمة جات بعده كبيانات، فمستحيل تغيّر شكل الـ query.

لو النسخة الغلط رجّعت صفر برضه، غالبًا انت كاتب [["...email = '" . $email . "'"]] بس الـ [[$email]] نفسه اتعمله escape في مكان تاني، أو الجدول فاضي. جرّب على جدول فيه صفوف.`,
          solCode: R`<?php
require __DIR__ . '/src/db.php';
$email = "x' OR '1'='1";
$rows = db()->query("SELECT id, email FROM users WHERE email = '$email'")->fetchAll();
echo 'بالدمج: ', count($rows), "\n";      // كل المستخدمين
$stmt = db()->prepare('SELECT id, email FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
echo 'بـ prepare: ', count($stmt->fetchAll()), "\n";  // 0`
        },
        {
          cmd: "fetch / fetchAll",
          title: "هات النتايج بالشكل اللي محتاجه",
          desc: R`[[fetch()]] صف واحد (أو false لو مفيش)، و [[fetchAll()]] كل الصفوف في array، و [[fetchColumn()]] أول عمود من أول صف (مثالي لـ COUNT). وتقدر تلف على الـ statement نفسه بـ [[foreach]].

والـ fetch modes بتوفّر loops: [[FETCH_KEY_PAIR]] يعمل map من عمودين، و [[FETCH_COLUMN]] لستة عمود واحد، و [[FETCH_GROUP]] يجمّع حسب أول عمود.`,
          example: R`$stmt = db()->prepare('SELECT id, name, city FROM users WHERE city = :city');
$stmt->execute(['city' => 'Cairo']);
foreach ($stmt as $row) {
    echo $row['name'], "\n";
}
$user   = db()->query('SELECT * FROM users ORDER BY id LIMIT 1')->fetch();
$all    = db()->query('SELECT id, name FROM users')->fetchAll();
$total  = db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
$names  = db()->query('SELECT id, name FROM users')->fetchAll(PDO::FETCH_KEY_PAIR);
$emails = db()->query('SELECT email FROM users')->fetchAll(PDO::FETCH_COLUMN);
$byCity = db()->query('SELECT city, name FROM users')->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_COLUMN);`,
          try: R`اعمل [[print_r]] لكل متغير واتفرّج على الشكل. بعدين جرّب [[fetch()]] على [[WHERE id = 999]] واعمل [[var_dump]]: هتلاقي [[bool(false)]] مش null.`,
          flag: "script",
          deep: {
            why: "كل صفحة بتعرض بيانات محتاجة شكل معين: صف واحد لصفحة التفاصيل، ولستة للجدول، ورقم للعداد، و map للـ dropdown. اختيار الـ mode الصح بيوفّر loops تحويل.",
            how: R`[[fetch]] بيرجّع false لما الصفوف تخلص أو مفيش نتيجة. فالشرط [[if (!$user)]] أو [[$stmt->fetch() ?: null]]، مش [[=== null]].

[[FETCH_KEY_PAIR]]: query بعمودين بالظبط، الأول key والتاني value: [[[1 => 'Ali', 2 => 'Sara']]]. [[FETCH_COLUMN]]: عمود واحد في لستة. [[FETCH_GROUP | FETCH_COLUMN]]: كل مدينة key وتحتها لستة الأسماء اللي فيها. و [[FETCH_UNIQUE]] بيخلي أول عمود (الـ id) هو الـ key للصف كله.

[[fetchObject(User::class)]] أو [[FETCH_CLASS]] بيملى object من كلاسك بدل array. خلي بالك إن الـ properties بتتملي قبل الـ constructor افتراضيًا.

الذاكرة: MySQL في PDO بيجيب النتيجة كلها لـ PHP أول ما تعمل execute (buffered)، فـ [[foreach]] و [[fetchAll]] قريبين في الذاكرة. لجدول ضخم (تصدير مليون صف) فيه وضع unbuffered، بس الأول اسأل نفسك محتاج كل ده ليه: غالبًا [[LIMIT]] و pagination.

و [[query()]] من غير prepare مسموح بس لما الـ SQL ثابت ومفيهوش ولا متغير، زي كل سطور المثال ما عدا الأول.`,
            when: "[[fetch]] لصفحة تفاصيل، و [[fetchAll]] لجدول صغير أو JSON، و [[fetchColumn]] للعد والوجود، و [[KEY_PAIR]] للـ select options.",
            mistakes: R`[[SELECT *]] على جدول فيه عمود نص كبير أو [[password_hash]] وتبعته كله JSON للـ frontend. والـ N+1: query للبوستات وبعدين query لكل بوست يجيب صاحبه، ١٠١ query بدل واحد بـ JOIN. و [[if ($user === null)]] بعد [[fetch]].`
          },
          lines: [
            "query فيه قيمة من برّه، فـ prepare.",
            "نفّذ.",
            "لف على الصفوف واحد واحد.",
            "كل صف associative array.",
            "قفلة.",
            "صف واحد (أو false).",
            "كل الصفوف.",
            "رقم واحد: عدد المستخدمين.",
            "map: id لـ الاسم.",
            "لستة إيميلات.",
            "الأسماء متجمّعة حسب المدينة."
          ],
          sol: R`الأشكال: [[$user]] صف واحد [[[id] => 1, [email] => ..., [name] => Ali ...]] (بمفاتيح أسماء الأعمدة بس بسبب [[FETCH_ASSOC]]). [[$all]] لستة صفوف [[[0] => [id => 1, name => Ali], [1] => ...]]. [[$total]] رقم واحد [[int(3)]]. [[$names]] قاموس [[[1] => Ali, [4] => سارة, ...]] (الـ id مفتاح). [[$emails]] لستة نصوص. و [[$byCity]] [[[Cairo] => [Ali, Omar], [Alex] => [سارة]]].

[[fetch()]] على [[WHERE id = 999]] بيرجّع [[bool(false)]] مش null. عشان كده [[if ($user === null)]] مش هتشتغل أبدًا؛ اكتب [[if (!$user)]] أو [[$stmt->fetch() ?: null]].

لو [[$total]] طلع [[string(1) "3"]] بدل int، ده PHP قديم (قبل 8.1) أو driver غير mysqlnd. ولو الصفوف فيها مفاتيح أرقام ونصوص مع بعض ([[[0] => 1, [id] => 1]]) يبقى نسيت [[ATTR_DEFAULT_FETCH_MODE]].`
        },
        {
          cmd: "beginTransaction",
          title: "كذا عملية على القاعدة: يتموا كلهم يا ولا واحدة",
          desc: R`الـ transaction بتخلي مجموعة queries وحدة واحدة: [[beginTransaction()]]، وبعدين الـ queries، وبعدين [[commit()]]. لو أي حاجة فشلت في النص، [[rollBack()]] بيرجّع كل اللي اتعمل كأنه محصلش.

المثال: خصم من المخزن وتسجيل الطلب. من غير transaction ممكن المخزن ينقص والطلب ميتسجلش لو السيرفر وقع بينهم.`,
          example: R`$pdo = db();
$pdo->beginTransaction();
try {
    $stmt = $pdo->prepare('UPDATE products SET stock = stock - 1 WHERE id = :id AND stock > 0');
    $stmt->execute(['id' => $productId]);
    if ($stmt->rowCount() === 0) {
        throw new RuntimeException('خلص من المخزن');
    }
    $pdo->prepare('INSERT INTO orders (user_id, product_id) VALUES (:u, :p)')
        ->execute(['u' => $userId, 'p' => $productId]);
    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    throw $e;
}`,
          try: R`حط [[throw new RuntimeException('test');]] قبل [[commit]] مباشرة، وشغّل، وبص على الجدولين: المخزن متغيرش والطلب متسجلش. شيل السطر وشغّل تاني.`,
          flag: "script",
          deep: {
            why: "أي عملية فيها أكتر من خطوة (فلوس، مخزن، حجز) لو وقفت في النص البيانات بتبقى متناقضة: فلوس اتخصمت ومفيش طلب. والـ transaction بتضمن إن ده مستحيل.",
            how: R`MySQL افتراضيًا autocommit: كل query بيتحفظ لوحده. [[beginTransaction]] بيوقف ده لحد [[commit]] أو [[rollBack]]. والتغييرات جوه الـ transaction مش بتبان للاتصالات التانية غير بعد الـ commit.

[[beginTransaction]] قبل الـ try مقصود: لو اتنادى جوه وفشل، [[rollBack]] في الـ catch هيرمي exception تانية لأن مفيش transaction.

الـ UPDATE المشروط [[stock > 0]] مع [[rowCount]] أهم من الـ transaction نفسها هنا: الفحص والخصم في خطوة واحدة جوه القاعدة. لو عملت SELECT الأول تشوف المخزن وبعدين UPDATE، طلبين في نفس اللحظة ممكن يشوفوا «فيه ١» ويخصموا الاتنين (race condition). ولو محتاج تقرا وتقرر في PHP: [[SELECT ... FOR UPDATE]] جوه الـ transaction بيقفل الصف لحد الـ commit.

لازم الجداول InnoDB؛ MyISAM بيتجاهل الـ transactions بصمت. وأوامر زي [[CREATE]] و [[ALTER]] بتعمل commit ضمني في MySQL، فمتحطهاش جوه transaction.

في مشروع حقيقي، سكربت تذكيرات كان بيسجّل كل إيميل اتبعت في جدول عليه UNIQUE على (العميل، النوع، التاريخ) بـ [[INSERT IGNORE]]: لو السكربت اتشغّل مرتين، القاعدة نفسها بتمنع التكرار. ده نفس المبدأ: خلّي القاعدة تضمن القاعدة.`,
            when: "أي عملية بتكتب في أكتر من جدول أو أكتر من صف ولازم تبقى متسقة: طلب، تحويل رصيد، إنشاء حساب بإعداداته.",
            mistakes: R`تبعت إيميل أو تنادي API دفع جوه الـ transaction: لو حصل rollback الإيميل راح خلاص، والـ transaction فضلت مفتوحة وقافلة صفوف وانت مستني الشبكة. اعمل الحاجات الخارجية بعد الـ commit. وتمسك الـ exception ومترميهاش تاني، فالطلب يبان إنه نجح. وجداول MyISAM قديمة.`
          },
          lines: [
            "الاتصال.",
            "ابدأ transaction (قبل الـ try).",
            "حاول.",
            "اخصم واحد بس لو فيه مخزن.",
            "نفّذ.",
            "مفيش صف اتغير = المخزن خلص.",
            "ارمي exception فيروح للـ catch.",
            "قفلة.",
            "سجّل الطلب.",
            "بالقيم.",
            "كله تمام: احفظ.",
            "أي غلطة من أي نوع...",
            "...ارجع في كل حاجة.",
            "وارمي الغلطة تاني عشان اللي فوق يعرف.",
            "قفلة."
          ],
          sol: R`مع [[throw]] قبل [[commit]]: السكريبت بيقع بـ [[Uncaught RuntimeException: test]]، و [[SELECT stock FROM products]] لسه 3، و [[SELECT COUNT(*) FROM orders]] = 0. الـ UPDATE والـ INSERT حصلوا فعلًا جوه الـ transaction، بس [[rollBack]] رجّعهم.

بعد ما تشيل السطر: [[stock]] بقى 2 وفيه طلب واحد. هتلاقي الـ id بتاعه 2 مش 1: الـ INSERT اللي اترجع حرق رقم AUTO_INCREMENT، والأرقام دي مبترجعش. متعتمدش على إن الـ ids متتالية.

لو المخزن نقص رغم الـ rollback، يبقى الجدول [[ENGINE=MyISAM]] (مبيدعمش transactions وبيتجاهل الـ rollback بصمت). اتأكد بـ [[SHOW CREATE TABLE products]] إنه InnoDB.`,
          solCode: R`CREATE TABLE products (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), stock INT NOT NULL) ENGINE=InnoDB;
CREATE TABLE orders (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT UNSIGNED, product_id INT UNSIGNED) ENGINE=InnoDB;
INSERT INTO products (name, stock) VALUES ('Laptop', 3);
-- شغّل السكريبت بالـ throw، وبعدين:
SELECT stock FROM products;        -- 3
SELECT COUNT(*) FROM orders;       -- 0`
        }
      ]
    },
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
          try: R`في [[delete.php]] ضيف أول سطر: [[if (!csrf_ok()) { http_response_code(403); exit('الصفحة قديمة، ارجع وجرّب تاني'); }]]. ابعت الفورم عادي: شغال. ابعته بـ curl من غير token: 403. وجرّب تشيل [[$token !== '']] وابعت [[csrf=]] فاضي من جلسة جديدة: هيعدّي، ودي الثغرة اللي الشرط ده قافلها.`,
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
          sol: R`الفورم العادي: [[200]] والعملية بتتم. [[curl -d "id=42" localhost:8000/posts/delete.php]] من غير token: [[403]] والنص [[الصفحة قديمة، ارجع وجرّب تاني]].

من غير [[$token !== '']]: [[curl -d "csrf=&id=42"]] من جلسة جديدة (مفيش كوكي) بيعدّي بـ 200، لأن [[$_SESSION['csrf']]] مش موجود فبقى [['']]، و [[hash_equals('', '')]] = true. يعني أي حد مفتحش الفورم قبل كده يتعمله CSRF بـ token فاضي. رجّع الشرط وهترجع 403.

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
    },
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

لو سبت [[ENCRYPTION_SMTPS]] مع port 1025: [[SMTP Error: Could not connect to SMTP host. Failed to connect to server]] بعد timeout، لأن Mailpit مش بيتكلم TLS على البورت ده. ولو العنوان طلع حروف غريبة زي [[Ø£Ù‡Ù„Ù‹Ø§]] يبقى نسيت [[CharSet]].`,
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
          sol: R`[[public/index.php]] بيقرا الإعدادات عادي ([[$config['app_name']]])، والمفتاح اللي [[bin2hex(random_bytes(32))]] ولّده 64 حرف hex زي [[c4f10a81ac615bcd...8040]]، وكل تشغيل مختلف. [[git status]] مش هيظهر فيه [[config.php]] لو في [[.gitignore]]، وهيظهر [[config.example.php]] اللي بترفعه بقيم وهمية عشان اللي بعدك يعرف المفاتيح المطلوبة.

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
