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
          teach: R`## الأول: إحنا بنعمل إيه هنا؟

المثال ٤ أوامر SQL: بيعمل جدول مستخدمين بالشكل الصح لـ MySQL، ويضيف فيه صف، ويسأل عن الـ id اللي اتولّد، ويعرض تعريف الجدول زي ما القاعدة فهمته. كل اللي تحت اتشغّل فعلًا على **MySQL 8.4.11** في Docker (صورة [[mysql:8.4]] الرسمية)، من جوه برنامج [[mysql]] (الـ client اللي بيكلم القاعدة من الترمنال).

---

## ١. [[CREATE TABLE users (...)]] عمود عمود

~~~sql
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
~~~

- [[CREATE TABLE users]]: اعمل جدول اسمه [[users]]. وكل اللي بين القوسين أعمدته، بينهم فاصلة.
- [[INT]] رقم صحيح (٤ bytes). و [[UNSIGNED]] يعني «من غير إشارة»: موجب بس، فالمدى بقى من 0 لحد حوالي ٤.٣ مليار بدل نصهم. الـ id عمره ما هيبقى سالب، فليه نضيّع نص المدى؟
- [[AUTO_INCREMENT]]: لو مبعتش قيمة للعمود ده، القاعدة تحط هي رقم أكبر من آخر رقم اتحط (1 وبعده 2 ...). ده بديل [[SERIAL]] أو [[GENERATED ... AS IDENTITY]] في Postgres.
- [[PRIMARY KEY]]: المفتاح الأساسي، يعني العمود اللي بيميّز كل صف، ومينفعش يتكرر ولا يبقى فاضي.

~~~sql
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
~~~

- [[VARCHAR(255)]] نص طوله متغير، أقصاه 255 **حرف** (مش byte). و [[NOT NULL]] يعني القيمة لازمة، و [[UNIQUE]] يعني مينفعش إيميلين زي بعض، والقاعدة نفسها هي اللي بترفض، مش كود PHP.
- [[password_hash]] 255 مش 60 عشان الخوارزمية ممكن تتغير لحاجة أطول (درس [[password_hash]] جاي).

~~~sql
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
~~~

- MySQL مفيهوش نوع bool حقيقي: [[BOOLEAN]] نفسه بيتحوّل [[TINYINT(1)]]، يعني رقم صغير (byte واحد). و [[(1)]] هنا عرض العرض بس، مش الحجم. بنخزن 0 أو 1.
- [[DEFAULT 0]]: لو مبعتش قيمة، تبقى 0. و [[DATETIME]] تاريخ ووقت بيتخزن زي ما هو، و [[DEFAULT CURRENT_TIMESTAMP]] يعني «وقت الإضافة» بيتحط لوحده.

~~~sql
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
~~~

| الحتة | معناها |
|---|---|
| [[ENGINE=InnoDB]] | محرك التخزين. InnoDB بيدعم transactions و foreign keys. القديم MyISAM مبيدعمهمش |
| [[CHARSET=utf8mb4]] | الحروف بتتخزن UTF-8 كامل: لحد ٤ bytes للحرف، فالعربي والإيموجي يتخزنوا |
| [[COLLATE=utf8mb4_unicode_ci]] | قواعد المقارنة والترتيب. [[ci]] = case-insensitive |

و [[mb4]] = multi-byte 4، يعني لحد ٤ bytes. الـ [[utf8]] القديم في MySQL اسمه الحقيقي [[utf8mb3]] (لحد ٣ بس).

---

## ٢. الـ INSERT والـ upsert

~~~sql
INSERT INTO users (email, name, password_hash) VALUES ('ali@example.com', 'Ali', 'x')
  ON DUPLICATE KEY UPDATE name = 'Ali';
~~~

[[INSERT INTO users (...)]] بيقول هتملى أنهي أعمدة، و [[VALUES (...)]] القيم بنفس الترتيب. الأعمدة اللي مكتبتهاش ([[id]] و [[is_admin]] و [[created_at]]) بتاخد الـ default بتاعها.

[[ON DUPLICATE KEY UPDATE]]: لو الصف ده هيخبط في [[UNIQUE]] أو [[PRIMARY KEY]] (الإيميل موجود قبل كده)، متقعش بـ error، حدّث الصف الموجود بدل كده. ده اللي اسمه **upsert** (update أو insert). والسطر الواحد مقسوم على سطرين للقراية بس، الـ [[;]] هي اللي بتقفل الأمر.

ولما شغّلت نفس الـ INSERT مرة تانية وبعدين بقيمة مختلفة، [[ROW_COUNT()]] (عدد الصفوف اللي اتأثرت بآخر أمر) قال:

| الحالة | [[ROW_COUNT()]] |
|---|---|
| صف جديد اتضاف | 1 |
| الإيميل موجود والاسم اتغيّر فعلًا | 2 |
| الإيميل موجود ونفس القيمة | 0 |

---

## ٣. [[SELECT LAST_INSERT_ID()]]

~~~text الناتج (أول تشغيل على جدول فاضي)
+------------------+
| LAST_INSERT_ID() |
+------------------+
|                1 |
+------------------+
~~~

[[LAST_INSERT_ID()]] بيرجّع آخر id اتولّد بـ AUTO_INCREMENT **في الاتصال ده بس**، فمستخدم تاني بيضيف في نفس اللحظة مش هيبوّظ رقمك. ده بديل [[RETURNING id]] في Postgres، وفي PHP اسمه [[lastInsertId()]].

> لو شغّلت المثال تاني، الـ INSERT هيبقى update، و [[LAST_INSERT_ID()]] في اتصال جديد هيطلّع 0 لأن مفيش صف اتضاف.

وحاجة شفتها في التجربة: بعد محاولتين upsert على إيميل موجود، الصف الجديد اللي بعدهم أخد id بـ **4** مش 2. كل محاولة INSERT بتحجز رقم AUTO_INCREMENT حتى لو اتحوّلت update، والرقم ده مبيرجعش.

---

## ٤. [[SHOW CREATE TABLE users]]

بيعرض الجدول زي ما القاعدة خزّنته فعلًا. ده الناتج الحقيقي (بـ [[\G]] في آخر الأمر عشان يطلع رأسي بدل جدول عريض):

~~~text الناتج
CREATE TABLE $__btusers$__bt (
  $__btid$__bt int unsigned NOT NULL AUTO_INCREMENT,
  $__btemail$__bt varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  $__btname$__bt varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  $__btpassword_hash$__bt varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  $__btis_admin$__bt tinyint(1) NOT NULL DEFAULT '0',
  $__btcreated_at$__bt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ($__btid$__bt),
  UNIQUE KEY $__btemail$__bt ($__btemail$__bt)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
~~~

لاحظ:
- الأسماء بين backticks: دي طريقة MySQL لقفل الأسماء (Postgres بيستخدم علامات تنصيص مزدوجة).
- [[UNIQUE]] بقى index اسمه [[email]]، يعني البحث بالإيميل سريع كمان.
- [[AUTO_INCREMENT=2]]: الرقم الجاي اللي هيتدّى.
- ده أسرع سؤال تسأله لأي جدول موجود: الـ engine والـ charset بتوعه إيه؟

---

## ٥. ليه utf8mb4 بالذات؟ (التجربة)

إيموجي زي 😀 بياخد ٤ bytes. على جدول [[utf8mb4]]:

~~~text الناتج
+----+---------------+-------------------+--------------+
| id | name          | CHAR_LENGTH(name) | LENGTH(name) |
+----+---------------+-------------------+--------------+
|  4 | سارة 😀         |                 6 |           13 |
+----+---------------+-------------------+--------------+
~~~

[[CHAR_LENGTH]] بيعد الحروف (٤ حروف عربي + مسافة + إيموجي = 6)، و [[LENGTH]] بيعد الـ bytes: كل حرف عربي 2، والمسافة 1، والإيموجي 4، يعني 8 + 1 + 4 = 13.

نفس القيمة في جدول [[CHARSET=utf8mb3]]:

~~~text الناتج
ERROR 1366 (HY000) at line 2: Incorrect string value: '\xF0\x9F\x98\x80' for column 'name' at row 1
~~~

[[\xF0\x9F\x98\x80]] هي الـ ٤ bytes بتوع الإيموجي، والعمود مبيشيلش غير ٣.

---

## ٦. الـ [[_ci]] في المقارنة

~~~sql
SELECT id, email FROM users WHERE email = 'ALI@EXAMPLE.COM';
~~~

~~~text الناتج
+----+-----------------+
| id | email           |
+----+-----------------+
|  1 | ali@example.com |
+----+-----------------+
~~~

لقاه رغم إن الحروف كبيرة. ونفس السبب بيخلي [[UNIQUE]] يرفض [[ALI@EXAMPLE.COM]] لو [[ali@example.com]] موجود:

~~~text الناتج
ERROR 1062 (23000) at line 11: Duplicate entry 'ALI@EXAMPLE.COM' for key 'users.email'
~~~

وده مريح للإيميل، بس خليه في بالك لو بتقارن حاجة لازم تبقى حساسة للحروف.

ليه [[utf8mb4_unicode_ci]] مش الافتراضي؟ السيرفر ده افتراضيه:

~~~text الناتج (SELECT @@collation_server)
utf8mb4_0900_ai_ci
~~~

ده موجود في MySQL 8 بس، و MariaDB اللي على استضافات كتير مبتعرفهوش. فلو كتبته صريح [[utf8mb4_unicode_ci]] الـ dump بيشتغل على الاتنين.

---

## الخلاصة

| حاجة | MySQL | Postgres |
|---|---|---|
| id بيزيد لوحده | [[AUTO_INCREMENT]] | [[GENERATED ... AS IDENTITY]] |
| الـ id الجديد | [[LAST_INSERT_ID()]] | [[RETURNING id]] |
| upsert | [[ON DUPLICATE KEY UPDATE]] | [[ON CONFLICT ... DO UPDATE]] |
| bool | [[TINYINT(1)]] | [[boolean]] |
| قفل الأسماء | backticks | علامات تنصيص مزدوجة |

وأهم ٣: [[ENGINE=InnoDB]]، و [[utf8mb4]] مش [[utf8]]، و [[SHOW CREATE TABLE]] عشان تتأكد.`,
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
          sol: R`الجدول بيتعمل و [[SELECT LAST_INSERT_ID()]] بيطلّع 1. المستخدم بالإيموجي بيتخزن ويرجع زي ما هو، و [[CHAR_LENGTH(name)]] لـ [['سارة 😀']] = 6 و [[LENGTH]] = 13 byte. (اتجربت على MySQL 8.4.11، وقبلها على MariaDB 10.11 بنفس النتايج.)

جدول [[utf8mb3]]: [[ERROR 1366 (HY000): Incorrect string value: '\xF0\x9F\x98\x80' for column 'name' at row 1]] على MySQL 8.4 (و MariaDB بتكتب الكود [[22007]] واسم العمود بشكل مختلف شوية). الإيموجي 4 bytes و utf8mb3 مبيشيلش غير 3. و [[WHERE email = 'ALI@EXAMPLE.COM']] بيلاقي [[ali@example.com]] لأن [[_ci]] = case-insensitive، وده برضه معناه إن UNIQUE هيرفض الاتنين مع بعض.

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
          teach: R`## الأول: الدالة دي بتعمل إيه؟

[[db()]] بتفتح اتصال واحد بـ MySQL أول مرة تتنادى، وبعد كده بترجّع نفس الاتصال لأي حد يناديها في نفس الطلب. كل اللي تحت اتشغّل على **PHP 8.4.26** (صورة [[php:8.4-cli]] الرسمية + إضافة [[pdo_mysql]]) و **MySQL 8.4.11**، كل واحد في container على نفس الشبكة، فالـ host اسمه اسم الـ container.

الملفات في التجربة:

~~~text شكل الفولدر
app/
  config.php      الإعدادات (بره الموقع)
  src/db.php      الدالة اللي في المثال
  sol2.php        ملف التجربة
~~~

---

## ١. [[function db(): PDO]]

~~~php
<?php
function db(): PDO {
~~~

- [[<?php]] أول الملف: من هنا كود PHP.
- [[function db()]] دالة اسمها [[db]] من غير parameters.
- [[: PDO]] بعد القوسين اسمه return type: الدالة **لازم** ترجّع object من كلاس [[PDO]]. لو رجّعت حاجة تانية PHP يرمي [[TypeError]].
- [[PDO]] = PHP Data Objects، الكلاس الجاهز في PHP اللي بيكلم أي قاعدة (MySQL و PostgreSQL و SQLite) بنفس الدوال.

## ٢. [[static $pdo = null;]]

~~~php
    static $pdo = null;
    if ($pdo === null) {
~~~

المتغير العادي جوه دالة بيتمسح أول ما الدالة تخلص. [[static]] بيخليه **يفضل** بين النداءات (طول الطلب): أول نداء قيمته [[null]] فيدخل الـ [[if]] ويفتح الاتصال، والنداءات اللي بعده بتلاقيه مليان فتعدّي الـ [[if]] على طول.

و [[===]] مقارنة صارمة: القيمة والنوع الاتنين، فمش هتتلخبط بين [[null]] و [[0]] و [['']].

اتأكدت إنه نفس الاتصال بجد:

~~~php
var_dump(db() === db());
echo db()->query('SELECT CONNECTION_ID()')->fetchColumn(), " ",
     db()->query('SELECT CONNECTION_ID()')->fetchColumn();
~~~

~~~text الناتج
bool(true)
13 13
~~~

[[CONNECTION_ID()]] رقم الاتصال عند MySQL، وطلع نفس الرقم في الندائين: اتصال واحد مش اتنين.

## ٣. الإعدادات من ملف بره

~~~php
        $c = require dirname(__DIR__) . '/config.php';
~~~

نفكّها من جوه لبرة:

| الحتة | معناها | قيمتها في التجربة |
|---|---|---|
| [[__DIR__]] | الفولدر اللي فيه الملف الحالي | [[/app/src]] |
| [[dirname(...)]] | الفولدر اللي فوقه | [[/app]] |
| [[.]] | دمج النصوص في PHP | [[/app/config.php]] |
| [[require]] | نفّذ الملف ده، ولو مش موجود وقّف بـ fatal error | |

و [[config.php]] آخره [[return [...]]]، فـ [[require]] بيرجّع الـ array دي ونحطها في [[$c]] (درس [[return config]] تحت).

## ٤. الـ DSN

~~~php
        $dsn = "mysql:host={$c['db_host']};dbname={$c['db_name']};charset=utf8mb4";
~~~

DSN = Data Source Name: نص واحد بيقول لـ PDO يكلم مين. النص بين علامات تنصيص مزدوجة، فـ [[{$c['db_host']}]] بيتبدّل بقيمته (الأقواس [[{}]] لازمة لما المتغير array بمفتاح). في التجربة بقى:

~~~text قيمة $dsn
mysql:host=teach-php02-mysql;dbname=myapp;charset=utf8mb4
~~~

| الجزء | معناه |
|---|---|
| [[mysql:]] | نوع القاعدة، يعني استخدم driver اسمه [[pdo_mysql]] |
| [[host=...]] | السيرفر |
| [[dbname=...]] | اسم القاعدة |
| [[charset=utf8mb4]] | الاتصال نفسه يبعت ويستقبل UTF-8 كامل |

> [[host=localhost]] ليه معنى خاص في MySQL: بيحاول يوصل بملف socket على نفس الجهاز مش بالشبكة. جوه container مفيهوش MySQL طلع: [[SQLSTATE[HY000] [2002] No such file or directory]]. و [[127.0.0.1]] جوه container هو الـ container نفسه: [[Connection refused]]. في Docker اكتب اسم الـ service.

## ٥. [[new PDO(...)]] والـ options

~~~php
        $pdo = new PDO($dsn, $c['db_user'], $c['db_pass'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
~~~

[[new]] بيعمل object جديد من الكلاس، والـ constructor بياخد ٤ حاجات: الـ DSN، واليوزر، والباسورد، و array إعدادات. و [[::]] معناها «ثابت جوه الكلاس ده»، يعني [[PDO::ATTR_ERRMODE]] ثابت اسمه [[ATTR_ERRMODE]] متعرّف في [[PDO]]. و [[=>]] بتربط مفتاح بقيمة في الـ array.

### [[ATTR_ERRMODE => ERRMODE_EXCEPTION]]

أي query يفشل يرمي [[PDOException]] بدل ما يرجّع [[false]] ساكت. في PHP 8 ده بقى الافتراضي أصلًا (اتأكدت: [[getAttribute(PDO::ATTR_ERRMODE)]] على اتصال من غير options طلع exception)، بس كتابته صريحة بتوضح النية وبتحميك لو الكود اشتغل على PHP أقدم.

### [[ATTR_DEFAULT_FETCH_MODE => FETCH_ASSOC]]

نفس الصف بالـ mode الافتراضي ([[FETCH_BOTH]]) وبـ [[FETCH_ASSOC]]:

~~~text الناتج: FETCH_ASSOC
Array
(
    [id] => 1
    [name] => Ali
)
~~~

~~~text الناتج: FETCH_BOTH (الافتراضي)
Array
(
    [id] => 1
    [0] => 1
    [name] => Ali
    [1] => Ali
)
~~~

كل عمود مرتين: بالاسم وبالرقم. عشان كده بنثبّت [[FETCH_ASSOC]] (associative = بمفاتيح أسماء).

### [[ATTR_EMULATE_PREPARES => false]]

افتراضي [[pdo_mysql]] إنه [[true]] (اتأكدت: [[bool(true)]] على اتصال من غير options)، يعني PHP بيحط القيم في نص الـ SQL بنفسه. بـ [[false]] الـ SQL والقيم بيتبعتوا للسيرفر منفصلين (درس [[prepare / execute]] الجاي بيشرح الفرق).

## ٦. آخر الدالة

~~~php
    }
    return $pdo;
}
~~~

قفلة الـ [[if]]، وبعدين رجّع الاتصال (الجديد أو المحفوظ)، وقفلة الدالة. ولما الطلب يخلص PHP بيقفل الاتصال لوحده.

---

## ٧. الـ solCode: نجرّب الاتصال

~~~php
<?php
require __DIR__ . '/src/db.php';
echo db()->query('SELECT VERSION()')->fetchColumn(), "\n";
~~~

- [[require __DIR__ . '/src/db.php']]: حمّل الملف اللي فيه [[db()]].
- [[db()->query(...)]]: [[->]] معناها «نادي method على الـ object ده». و [[query]] بينفّذ SQL ثابت ويرجّع statement.
- [[->fetchColumn()]]: أول عمود من أول صف، يعني القيمة لوحدها.
- [[echo a, b]]: الفاصلة بتطبع أكتر من حاجة، و [["\n"]] سطر جديد.

~~~bash
php sol2.php
~~~

~~~text الناتج
8.4.11
~~~

---

## ٨. لما الاتصال يفشل: الرسايل الحقيقية

| السبب | الرسالة في PHP 8.4 |
|---|---|
| باسورد غلط | [[SQLSTATE[HY000] [1045] Access denied for user 'myapp_user'@'172.19.0.3' (using password: YES)]] |
| host مش موجود | [[getaddrinfo for teach-php02-nohost failed: Name or service not known]] |
| القاعدة مش شغالة أو port غلط | [[SQLSTATE[HY000] [2002] Connection refused]] |
| [[pdo_mysql]] مش متسطّب (صورة [[php:8.4-cli]] من غير الإضافة) | [[could not find driver]] |

والباسورد الغلط بالكامل:

~~~text الناتج
Fatal error: Uncaught PDOException: SQLSTATE[HY000] [1045] Access denied for user 'myapp_user'@'172.19.0.3' (using password: YES) in /app/t2b.php:3
Stack trace:
#0 /app/t2b.php(3): PDO->__construct('mysql:host=teac...', 'myapp_user', Object(SensitiveParameterValue))
#1 {main}
  thrown in /app/t2b.php on line 3
~~~

بص على الـ stack trace: اسم اليوزر ظاهر، والـ IP، والمسار، بس الباسورد مكانه [[Object(SensitiveParameterValue)]]: PHP مخبّيه لأن الـ parameter متعلّم [[#[\SensitiveParameter]]]. برضه الرسالة دي مكانها اللوج، مش شاشة الزائر.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[static $pdo]] | اتصال واحد للطلب كله |
| [[require .../config.php]] | الأسرار في ملف واحد بره git |
| [[charset=utf8mb4]] في الـ DSN | العربي والإيموجي سليمين في الطريق |
| [[ERRMODE_EXCEPTION]] | مفيش غلطة بتعدّي ساكتة |
| [[FETCH_ASSOC]] | الصف بأسماء الأعمدة بس |
| [[EMULATE_PREPARES => false]] | prepared statements حقيقية على السيرفر |`,
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
          teach: R`## الأول: الفكرة في سطرين

بدل ما تلزق قيمة المستخدم جوه نص الـ SQL، بتكتب مكانها علامة (placeholder) زي [[:email]]، وتبعت القيمة لوحدها بعدين. المثال بيعمل ٤ عمليات بالطريقة دي: SELECT و INSERT و UPDATE و SELECT بـ LIMIT.

كل اللي تحت اتشغّل على PHP 8.4.26 و MySQL 8.4.11 بالـ [[db()]] بتاعة الدرس اللي فات، على جدول [[users]] فيه ٣ مستخدمين (Ali و سارة و Omar) وجدول [[posts]] فاضي. والقيم: [[$email = 'ali@example.com']] و [[$title = 'أول بوست']] و [[$newTitle = 'عنوان جديد']].

---

## ١. SELECT بـ placeholder

~~~php
$stmt = db()->prepare('SELECT id, name, password_hash FROM users WHERE email = :email');
~~~

- [[prepare]] بتبعت الـ SQL للسيرفر **من غير** قيم، والسيرفر بيفهمه ويجهّزه، ويرجّعلك object من نوع [[PDOStatement]] (اختصار statement = أمر جاهز للتنفيذ) بنحطه في [[$stmt]].
- [[:email]] اسم placeholder: نقطتين وبعدها اسم انت بتختاره. القاعدة شايفاه «خانة فاضية»، مش نص.
- علامات التنصيص المفردة حوالين الـ SQL في PHP معناها نص حرفي: مفيش متغيرات بتتبدّل جواه.

~~~php
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
~~~

- [[execute]] بتبعت القيم: array مفتاحها اسم الـ placeholder (بالنقطتين أو من غيرها، اتجربوا الاتنين واشتغلوا).
- [[fetch()]] بتجيب أول صف، أو [[false]] لو مفيش.

~~~text الناتج (print_r($user))
Array
(
    [id] => 1
    [name] => Ali
    [password_hash] => x
)
~~~

## ٢. INSERT و [[lastInsertId()]]

~~~php
$stmt = db()->prepare('INSERT INTO posts (user_id, title) VALUES (:uid, :title)');
$stmt->execute(['uid' => $user['id'], 'title' => $title]);
$postId = (int) db()->lastInsertId();
~~~

نفس الطريقة بـ placeholderين. و [[$user['id']]] يعني «قيمة المفتاح [[id]] في الـ array». و [[lastInsertId()]] هو [[LAST_INSERT_ID()]] بتاع MySQL من الدرس الأول. بيرجّع إيه بالظبط؟

~~~text الناتج (var_dump(db()->lastInsertId()))
string(1) "1"
~~~

نص مش رقم. عشان كده [[(int)]] قبله: ده **cast**، يعني حوّل القيمة لـ int.

## ٣. UPDATE مقفول على صاحب البوست

~~~php
$stmt = db()->prepare('UPDATE posts SET title = :title WHERE id = :id AND user_id = :uid');
$stmt->execute(['uid' => $user['id'], 'title' => $newTitle, 'id' => $postId]);
echo $stmt->rowCount() === 1 ? 'اتعدّل' : 'مش بتاعك أو مش موجود';
~~~

- الترتيب في الـ array مش مهم مع الأسماء: كل قيمة بتروح للـ placeholder اللي بنفس اسمها.
- [[AND user_id = :uid]]: البوست يتعدّل بس لو صاحبه هو المستخدم الحالي. من غيرها أي حد يغيّر الـ id في الرابط يعدّل بوستات غيره (IDOR = Insecure Direct Object Reference).
- [[rowCount()]] عدد الصفوف اللي اتغيرت. و [[? :]] (ternary) معناها «لو الشرط صح خد الأولى، وإلا التانية».

جرّبت نفس الـ statement ٣ مرات:

| التنفيذ | [[rowCount()]] | ليه |
|---|---|---|
| أول مرة بعنوان جديد | 1 | اتغيّر صف |
| نفس القيم تاني | 0 | MySQL بيعد الصفوف اللي **اتغيرت فعلًا**، والعنوان هو هو |
| [[uid]] = 2 (مستخدم تاني) | 0 | الشرط مش متحقق، فمحدش اتعدّل |

يعني الـ 0 معناها «مفيش تغيير»، مش بالضرورة «مش موجود». وده سبب إن الرسالة في المثال عامة.

> لاحظ إن [[execute]] اتنادت أكتر من مرة على نفس [[$stmt]]: تجهّز مرة وتنفّذ بقيم مختلفة كتير.

## ٤. LIMIT بـ [[bindValue]]

~~~php
$stmt = db()->prepare('SELECT * FROM posts ORDER BY id DESC LIMIT :n');
$stmt->bindValue(':n', 10, PDO::PARAM_INT);
$stmt->execute();
~~~

[[bindValue]] بتربط قيمة بـ placeholder قبل التنفيذ، والـ parameter التالت النوع: [[PDO::PARAM_INT]] يعني ابعتها رقم. وبعدها [[execute()]] من غير array لأن القيمة اتربطت خلاص.

ليه مش [[execute(['n' => 10])]] وخلاص؟ [[execute]] بتبعت كل القيم على إنها نصوص. جرّبت الاتنين:

| الطريقة | [[EMULATE_PREPARES = false]] (إعدادنا) | [[EMULATE_PREPARES = true]] |
|---|---|---|
| [[execute(['n' => 10])]] | اشتغل | [[SQLSTATE[42000]: Syntax error ... near ''10'']] |
| [[bindValue(..., PDO::PARAM_INT)]] | اشتغل | اشتغل |

مع الـ emulation، PHP بيكتب القيمة في الـ SQL كنص [['10']]، و MySQL مبيقبلش [[LIMIT '10']]. فـ [[bindValue]] بـ int شغالة في الحالتين.

~~~text الناتج (print_r($stmt->fetchAll()))
Array
(
    [0] => Array
        (
            [id] => 1
            [user_id] => 1
            [title] => عنوان جديد
        )

)
~~~

## ٥. حاجات اتجربت عن الـ placeholders

| الحالة | النتيجة |
|---|---|
| [[?]] بالترتيب: [[WHERE email = ?]] و [[execute(['sara@example.com'])]] | اشتغل، رجّع id 2 |
| نفس الاسم مرتين [[name = :q OR email = :q]] (emulation مقفولة) | [[SQLSTATE[HY093]: Invalid parameter number]] |
| نفس الحالة مع emulation | اشتغل |

فمع إعدادنا: كل placeholder باسم مختلف ([[:q1]] و [[:q2]]).

---

## ٦. الـ solCode: injection بعينك

~~~php
$email = "x' OR '1'='1";
$rows = db()->query("SELECT id, email FROM users WHERE email = '$email'")->fetchAll();
~~~

هنا علامات تنصيص مزدوجة، فـ [[$email]] بتتبدّل جوه النص. الـ SQL اللي وصل للقاعدة فعلًا:

~~~text الـ SQL بعد الدمج
SELECT id, email FROM users WHERE email = 'x' OR '1'='1'
~~~

الـ [[']] اللي في القيمة قفلت النص بدري، والباقي بقى SQL: [[email = 'x']] (غلط) **أو** [['1'='1']] (صح دايمًا)، فالشرط صح لكل صف.

~~~php
$stmt = db()->prepare('SELECT id, email FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
~~~

هنا القاعدة استلمت الـ SQL الأول وفهمت إن فيه خانة واحدة، وبعدين جات القيمة كبيانات بس، فدوّرت على إيميل حرفيًا [[x' OR '1'='1]].

~~~text الناتج
بالدمج: 3
بـ prepare: 0
~~~

3 = كل المستخدمين في الجدول، و 0 = مفيش حد بالإيميل الغريب ده.

---

## الخلاصة

| الخطوة | الدالة | بترجّع |
|---|---|---|
| جهّز الـ SQL بخانات | [[prepare]] | [[PDOStatement]] |
| ابعت القيم ونفّذ | [[execute([...])]] | true |
| قيمة بنوع صريح | [[bindValue(':n', 10, PDO::PARAM_INT)]] | |
| صف | [[fetch()]] | array أو false |
| id جديد | [[lastInsertId()]] | **نص** |
| كام صف اتغيّر | [[rowCount()]] | int |

والقاعدة: أي قيمة جاية من برّه = placeholder. والـ placeholders للقيم بس، مش لأسماء الجداول والأعمدة.`,
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
          teach: R`## الأول: نفس النتيجة بأشكال مختلفة

بعد ما الـ query يتنفّذ، PDO يقدر يسلّمك النتيجة بأكتر من شكل: صف صف، أو كله مرة واحدة، أو رقم واحد، أو map جاهزة. المثال بيجرّب كل شكل. الناتج تحت حقيقي من PHP 8.4.26 و MySQL 8.4.11، على جدول [[users]] فيه:

~~~text الجدول
id  email             name   city
1   ali@example.com   Ali    Cairo
2   sara@example.com  سارة   Alex
3   omar@example.com  Omar   Cairo
~~~

---

## ١. اللف على الـ statement بـ [[foreach]]

~~~php
$stmt = db()->prepare('SELECT id, name, city FROM users WHERE city = :city');
$stmt->execute(['city' => 'Cairo']);
foreach ($stmt as $row) {
    echo $row['name'], "\n";
}
~~~

- الـ query فيه قيمة ([[Cairo]])، فـ [[prepare]] و [[execute]] زي الدرس اللي فات.
- [[foreach ($stmt as $row)]]: الـ [[PDOStatement]] نفسه ينفع تلف عليه. كل لفة بتجيب الصف اللي بعده في [[$row]]، وكل صف associative array (بسبب [[FETCH_ASSOC]] في [[db()]]).
- [[$row['name']]] قيمة عمود [[name]] في الصف ده.

~~~text الناتج
Ali
Omar
~~~

---

## ٢. باقي السطور: [[query()]] لأن الـ SQL ثابت

باقي المثال مفيهوش ولا قيمة من برّه، فـ [[query()]] مباشرة من غير prepare. و [[query()]] بترجّع statement، فبنكمّل عليه بـ [[->]] على طول (method chaining).

### [[fetch()]]: صف واحد

~~~php
$user   = db()->query('SELECT * FROM users ORDER BY id LIMIT 1')->fetch();
~~~

[[SELECT *]] = كل الأعمدة، و [[ORDER BY id LIMIT 1]] = أول واحد بالـ id.

~~~text الناتج (print_r($user))
Array
(
    [id] => 1
    [email] => ali@example.com
    [name] => Ali
    [city] => Cairo
    [password_hash] => x
)
~~~

ولو مفيش صف؟ جرّبت [[WHERE id = 999]]:

~~~text الناتج (var_dump)
bool(false)
~~~

[[false]] مش [[null]]. فالفحص [[if (!$user)]]، مش [[=== null]].

### [[fetchAll()]]: كل الصفوف

~~~php
$all    = db()->query('SELECT id, name FROM users')->fetchAll();
~~~

~~~text الناتج (print_r($all))
Array
(
    [0] => Array
        (
            [id] => 1
            [name] => Ali
        )

    [1] => Array
        (
            [id] => 2
            [name] => سارة
        )

    [2] => Array
        (
            [id] => 3
            [name] => Omar
        )

)
~~~

لستة (مفاتيحها 0 و 1 و 2)، وكل عنصر صف.

### [[fetchColumn()]]: قيمة واحدة

~~~php
$total  = db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
~~~

[[COUNT(*)]] بيعد الصفوف، و [[fetchColumn()]] بتجيب أول عمود من أول صف:

~~~text الناتج (var_dump($total))
int(3)
~~~

[[int]] مش نص، لأن الـ prepares الحقيقية بترجّع الأنواع زي ما هي من القاعدة.

---

## ٣. الـ fetch modes

الـ mode بيتبعت لـ [[fetchAll()]] كـ ثابت من [[PDO]].

### [[PDO::FETCH_KEY_PAIR]]: map من عمودين

~~~php
$names  = db()->query('SELECT id, name FROM users')->fetchAll(PDO::FETCH_KEY_PAIR);
~~~

العمود الأول بقى المفتاح، والتاني القيمة. لازم الـ SELECT فيه عمودين بالظبط:

~~~text الناتج
Array
(
    [1] => Ali
    [2] => سارة
    [3] => Omar
)
~~~

ده الشكل اللي محتاجه لـ [[<select>]] في فورم: [[foreach ($names as $id => $name)]].

### [[PDO::FETCH_COLUMN]]: لستة عمود واحد

~~~php
$emails = db()->query('SELECT email FROM users')->fetchAll(PDO::FETCH_COLUMN);
~~~

~~~text الناتج
Array
(
    [0] => ali@example.com
    [1] => omar@example.com
    [2] => sara@example.com
)
~~~

لاحظ الترتيب: أبجدي مش بالـ id. MySQL قرا الإيميلات من الـ index بتاع [[UNIQUE]] لأنه أسرع. من غير [[ORDER BY]] القاعدة مش مضطرة لأي ترتيب، فلو الترتيب مهم اكتبه.

### [[FETCH_GROUP | FETCH_COLUMN]]: تجميع

~~~php
$byCity = db()->query('SELECT city, name FROM users')->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_COLUMN);
~~~

[[|]] هنا **bitwise OR**: كل mode رقم، و [[|]] بيجمع الاتنين في رقم واحد فيه الاتنين. طبعت الأرقام:

~~~text الناتج
FETCH_GROUP   = 65536
FETCH_COLUMN  = 7
مع بعض        = 65543
~~~

[[FETCH_GROUP]] يعني «اجمع حسب أول عمود»، و [[FETCH_COLUMN]] يعني «وتحت كل مجموعة حط العمود التاني بس»:

~~~text الناتج
Array
(
    [Cairo] => Array
        (
            [0] => Ali
            [1] => Omar
        )

    [Alex] => Array
        (
            [0] => سارة
        )

)
~~~

---

## الخلاصة

| محتاج | استخدم | بيرجّع |
|---|---|---|
| صف واحد (صفحة تفاصيل) | [[fetch()]] | array أو [[false]] |
| كل الصفوف (جدول، JSON) | [[fetchAll()]] | لستة arrays |
| رقم (COUNT، وجود) | [[fetchColumn()]] | قيمة أو [[false]] |
| id → اسم (select) | [[fetchAll(PDO::FETCH_KEY_PAIR)]] | map |
| لستة عمود واحد | [[fetchAll(PDO::FETCH_COLUMN)]] | لستة |
| مجموعات | [[FETCH_GROUP]] + [[FETCH_COLUMN]] | map فيه لستات |
| صفوف كتير من غير ما تحفظهم كلهم في متغير | [[foreach ($stmt as $row)]] | صف كل لفة |`,
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
          teach: R`## الأول: الفكرة

transaction = مجموعة أوامر بتتعامل كأنها أمر واحد: يا كلهم يتحفظوا ([[commit]])، يا كلهم يترجعوا ([[rollBack]]). المثال بيخصم قطعة من المخزن ويسجّل طلب، والاتنين مع بعض.

اتشغّل على PHP 8.4.26 و MySQL 8.4.11. جهزت الجدولين من الـ solCode (لابتوب واحد، مخزنه 3)، وحطيت المثال في سكربت [[ex5.php]] بـ [[$productId = 1]] و [[$userId = 1]].

---

## ١. [[$pdo = db();]] و [[beginTransaction()]]

~~~php
$pdo = db();
$pdo->beginTransaction();
~~~

- الاتصال في متغير، عشان كل الأوامر لازم تبقى على **نفس الاتصال**. الـ transaction ملك الاتصال.
- MySQL عادةً autocommit: كل أمر بيتحفظ لوحده فورًا. [[beginTransaction()]] بتقفل ده لحد [[commit]] أو [[rollBack]].
- ليه قبل الـ [[try]] مش جواه؟ لو اتنادت جوه وفشلت، الـ [[catch]] هينادي [[rollBack()]] على transaction مبدأتش. جرّبت [[rollBack()]] من غير transaction:

~~~text الناتج
Fatal error: Uncaught PDOException: There is no active transaction in /app/t5.php:1
~~~

فالغلطة الأصلية كانت هتضيع ورا غلطة تانية.

---

## ٢. [[try]]: الخصم المشروط

~~~php
try {
    $stmt = $pdo->prepare('UPDATE products SET stock = stock - 1 WHERE id = :id AND stock > 0');
    $stmt->execute(['id' => $productId]);
~~~

- [[try { ... }]]: نفّذ الكود ده، ولو أي سطر رمى exception اقفز على طول للـ [[catch]].
- [[stock = stock - 1]]: القيمة الجديدة = القديمة ناقص واحد، والحساب بيحصل جوه القاعدة.
- [[AND stock > 0]]: اخصم بس لو فيه مخزن. الفحص والخصم أمر واحد، فطلبين في نفس اللحظة مستحيل يخصموا آخر قطعة مرتين (race condition).

~~~php
    if ($stmt->rowCount() === 0) {
        throw new RuntimeException('خلص من المخزن');
    }
~~~

لو [[rowCount()]] = 0 يبقى الشرط ماتحققش (المخزن 0 أو المنتج مش موجود). [[throw new RuntimeException(...)]] بيعمل exception جديدة برسالة ويرميها، فالتنفيذ يقفز للـ [[catch]]. و [[RuntimeException]] كلاس جاهز في PHP لغلطات بتحصل وقت التشغيل.

---

## ٣. تسجيل الطلب و [[commit()]]

~~~php
    $pdo->prepare('INSERT INTO orders (user_id, product_id) VALUES (:u, :p)')
        ->execute(['u' => $userId, 'p' => $productId]);
    $pdo->commit();
~~~

[[prepare(...)]] بترجّع statement، فبنكمّل عليه [[->execute(...)]] على السطر اللي بعده من غير متغير. وبعدين [[commit()]]: احفظ كل اللي حصل من أول [[beginTransaction]]، ومن اللحظة دي بس الاتصالات التانية تشوف التغيير.

---

## ٤. [[catch (Throwable $e)]]

~~~php
} catch (Throwable $e) {
    $pdo->rollBack();
    throw $e;
}
~~~

- [[Throwable]] أبو كل الغلطات في PHP ([[Exception]] و [[Error]] الاتنين)، فأي حاجة تقع (حتى [[TypeError]]) هتترجع.
- [[$e]] الغلطة نفسها.
- [[rollBack()]]: الغي كل اللي حصل في الـ transaction.
- [[throw $e]]: ارمي نفس الغلطة تاني لفوق. إحنا رجعنا البيانات بس، مش «حلّينا» المشكلة، فاللي فوق (صفحة، أو handler عام) هو اللي يقرر يقول إيه للمستخدم.

---

## ٥. التجربة الحقيقية خطوة خطوة

**أ. بـ [[throw new RuntimeException('test')]] قبل [[commit]]:**

~~~text الناتج
Fatal error: Uncaught RuntimeException: test in /app/ex5.php:14
~~~

~~~text الجدولين بعدها
stock      3
COUNT(*)   0
~~~

الـ UPDATE والـ INSERT اتنفّذوا جوه الـ transaction فعلًا، بس [[rollBack]] رجّعهم.

**ب. من غير الـ throw:** المخزن بقى 2، وفيه طلب واحد... الـ id بتاعه **2**. الـ INSERT اللي اترجع في (أ) حجز الرقم 1، و AUTO_INCREMENT مبيرجعش أرقام.

**ج. شغّلته لحد ما المخزن خلص:** بعد 3 طلبات، التشغيل الرابع:

~~~text الناتج
Fatal error: Uncaught RuntimeException: خلص من المخزن in /app/ex5.php:10
~~~

والمخزن وقف عند 0 (مانزلش -1)، والطلبات 3 بالظبط (ids 2 و 3 و 4).

**د. نفس الكلام على جدول [[ENGINE=MyISAM]]:** INSERT جوه transaction وبعدين [[rollBack()]]، وعدّيت: الصف لسه موجود ([[1]]). MyISAM بيتجاهل الـ transactions بصمت ومن غير أي error.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[beginTransaction()]] قبل [[try]] | الـ rollBack ميقعش على transaction مش موجودة |
| UPDATE بشرط [[stock > 0]] + [[rowCount()]] | الفحص والخصم في خطوة واحدة |
| [[throw]] لما الشرط يفشل | يروح للـ catch ويترجع كل حاجة |
| [[commit()]] آخر سطر في [[try]] | الحفظ بيحصل بس لو كله نجح |
| [[rollBack()]] ثم [[throw $e]] | رجّع البيانات، وسيب الغلطة توصل لفوق |

ولازم الجداول InnoDB، والحاجات الخارجية (إيميل، API دفع) بعد الـ commit مش جواه.`,
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
