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
        },
        {
          cmd: "migration بتتعاد بأمان",
          title: "سكربت ترقية قاعدة بيانات يتشغّل مرتين من غير ضرر، ومن الـ CLI من غير تسجيل دخول",
          learn: R`تكتب سكربت ترقية (جدول وعمود و index وإعداد) كل جملة فيه تنفع تتعاد، وتقفله على الأدمن من المتصفح وتسيبه للـ CLI، وتنشر بالترتيب الصح (الكود، ثم الترقية، ثم التفعيل)، وتتأكد بتشغيله مرتين.`,
          out: R`التشغيلة التانية بتطبع نفس الـ [[OK]]/[[SKIP]] و [[done]]، والأعداد ([[SELECT COUNT(*)]]) والإعداد اللي الأدمن غيّره ثابتين، والمتصفح من غير أدمن بياخد [[403]].`,
          desc: R`ميزة جديدة محتاجة تغيير في الداتابيز: جدول جديد، وعمود، و index، وإعداد بقيمة افتراضية. اكتبهم في سكربت PHP واحد كل جملة فيه **idempotent**: تتشغّل مرة أو عشرة والنتيجة واحدة. ليه؟ لأن السكربت هيتشغّل مرتين أكيد: مرة فشل في النص ورجعت تشغّله، أو حد شغّله على السيرفر وانت شغّلته تاني.

الأدوات: [[CREATE TABLE IF NOT EXISTS]]، و [[ALTER TABLE ... ADD COLUMN IF NOT EXISTS]] و [[CREATE INDEX IF NOT EXISTS]] (MariaDB بس؛ في MySQL 8 دول [[syntax error]] وبتسأل [[information_schema]] الأول)، و [[INSERT ... SELECT ... WHERE NOT EXISTS]] للإعداد عشان ميكتبش فوق قيمة الأدمن غيّرها.

والسكربت ورا تسجيل دخول الأدمن لو اتفتح من المتصفح (فتحه من غير دخول بيرجّع [[403]]، ودي مش مشكلة)، ومن السيرفر [[php scripts/admin/migrate-2026-09.php]] بيشتغل على طول، لأن [[PHP_SAPI]] هناك [[cli]]، واللي معاه shell على السيرفر معاه كل حاجة أصلًا.`,
          example: R`ssh deployer@203.0.113.10 'cd ~/domains/shop.example/public_html && git log -1 --format="%h %s"'
php -l scripts/admin/migrate-2026-09.php
php scripts/admin/migrate-2026-09.php
php scripts/admin/migrate-2026-09.php; echo "exit=$?"
mariadb shop -e "SELECT COUNT(*) FROM settings; SHOW COLUMNS FROM users LIKE 'is_partner'"
curl -s -w "[%{http_code}]\n" https://shop.example/scripts/admin/migrate-2026-09.php`,
          lines: [
            R`قبل أي ترقية: الكود الجديد وصل السيرفر فعلًا؟ آخر commit هناك لازم يبقى بتاع الميزة. (لو مش متأكد إن فيه نشر تلقائي، الطريقة في درس «مفيش نشر تلقائي» في تاب التشخيص.)`,
            R`السكربت نفسه مفيهوش غلطة syntax قبل ما يلمس الداتابيز.`,
            R`أول تشغيل على السيرفر: بيطبع [[OK]] أو [[FAIL]] لكل خطوة، وفي الآخر [[done]].`,
            R`التشغيل التاني: لازم نفس الناتج من غير [[FAIL]]، و [[exit=0]]. ده الاختبار إن السكربت بيتعاد بأمان.`,
            R`اتأكد من الداتابيز نفسها: العدد ماتغيّرش، والعمود موجود بالنوع والقيمة الافتراضية الصح.`,
            R`ومن بره من غير تسجيل دخول: لازم [[403]]. لو رجع [[200]] و [[done]]، أي حد على الإنترنت يقدر يشغّل الترقية.`,
          ],
          try: R`شغّل MariaDB في Docker ([[mariadb:11.4]]) فيها جدولين [[users]] و [[settings]]، و PHP CLI فيه [[pdo_mysql]]. شغّل السكربت اللي في الشرح مرتين وقارن الناتج، وغيّر [[referrals_enabled]] لـ [[1]] وشغّله تالت مرة. وبعدين جرّب نسخة «ساذجة» من غير [[IF NOT EXISTS]] مرتين، ونفس السكربت على [[mysql:8.4]].`,
          teach: R`## الحكاية

ميزة «الإحالات» محتاجة: جدول [[referrals]]، وعمود [[users.is_partner]]، و index على [[referrals.user_id]]، وإعداد [[referrals_enabled]] قيمته [[0]] (مقفولة لحد ما الأدمن يفعّلها). الكود اتكتب، والترقية في ملف [[scripts/admin/migrate-2026-09.php]].

فتحت الملف من المتصفح وانت مش داخل كأدمن: [[403: admins only]]. ده **مقصود** (مش عطل): الملف ده مش للزوار. والصح إنه يتشغّل من السيرفر نفسه بـ [[php]]، وهناك مفيش تسجيل دخول.

المعمل: MariaDB 11.4 و MySQL 8.4 في Docker، و [[php:8.4-cli]] متضاف له [[pdo_mysql]] بـ [[docker-php-ext-install pdo_mysql]]، و Postgres 16 للمقارنة.

---

## ٠. قبل ما تشغّل: الكود الجديد وصل السيرفر؟

الترقية من غير الكود الجديد ممكن تبقى سليمة (إضافات بس)، بس لازم تعرف الكود فين عشان تختار الترتيب (القسم ٦). ولو مفيش نشر تلقائي، الـ push لوحده مش بيوصّل حاجة للسيرفر:

~~~bash
ls .github/workflows 2>/dev/null || echo "no workflows"
gh api repos/acme-co/shop-site/hooks --jq 'length'
ssh deployer@203.0.113.10 'cd ~/domains/shop.example/public_html && git log -1 --format="%h %s"'
git log -1 --format="%h %s" origin/main
~~~

- [[ls .github/workflows]]: مفيش ملفات = مفيش GitHub Actions بتنشر.
- [[gh api repos/<owner>/<repo>/hooks --jq 'length']]: عدد الـ webhooks على الريبو (عنوان بيوصله POST مع كل push، وبعض الاستضافات بتعمل [[git pull]] لما يوصل). [[0]] = مفيش نشر تلقائي من هنا كمان. محتاج صلاحية admin على الريبو. (الأمر ده من وثائق GitHub CLI، ومتجرّب بالتفصيل في درس «مفيش نشر تلقائي» في تاب التشخيص.)
- آخر commit على السيرفر لازم يساوي آخر commit في [[origin/main]]. لو لأ: انشر الأول ([[git pull --ff-only]] على السيرفر)، وبعدين الترقية.

---

## ١. السكربت

~~~php
<?php
// ترقية سبتمبر: كل جملة هنا لازم تنفع تتشغّل مرتين من غير ضرر
require __DIR__ . '/../../lib/db.php';

// من المتصفح: أدمن بس. من الـ CLI: اللي معاه shell على السيرفر أصلًا
if (PHP_SAPI !== 'cli') {
    require __DIR__ . '/../../lib/auth.php';
    require_admin();
    header('Content-Type: text/plain; charset=utf-8');
}

$steps = [
    'table referrals' => "CREATE TABLE IF NOT EXISTS referrals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        code VARCHAR(32) NOT NULL UNIQUE,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    'column users.is_partner' => "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_partner TINYINT(1) NOT NULL DEFAULT 0",
    'index referrals.user_id' => "CREATE INDEX IF NOT EXISTS idx_referrals_user ON referrals (user_id)",
    'setting referrals_enabled' => "INSERT INTO settings (key_name, value)
        SELECT 'referrals_enabled', '0' FROM DUAL
        WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key_name = 'referrals_enabled')",
];

$failed = 0;
foreach ($steps as $name => $sql) {
    try {
        $rows = db()->exec($sql);
        echo "OK   $name (rows: $rows)\n";
    } catch (PDOException $e) {
        $failed++;
        echo "FAIL $name: " . $e->getMessage() . "\n";
    }
}
echo $failed ? "done with $failed errors\n" : "done\n";
exit($failed ? 1 : 0);
~~~

| الحتة | ليه |
|---|---|
| [[PHP_SAPI !== 'cli']] | [[PHP_SAPI]] اسم الطريقة اللي PHP اشتغل بيها: [[cli]] من الترمنال، و [[fpm-fcgi]] أو [[apache2handler]] أو [[cli-server]] من سيرفر ويب. من الترمنال مفيش session ولا cookie أصلًا، والأمان هنا إن اللي يشغّله لازم يكون معاه SSH |
| [[require_admin()]] | من المتصفح: لو [[$_SESSION['role']]] مش [[admin]] يرجّع [[403]] ويقف |
| [[$steps]] اسم ← جملة | كل خطوة ليها اسم بيتطبع، فالناتج يتقري ويتبعت زي ما هو |
| [[try]] حوالين كل خطوة | خطوة فشلت؟ اطبعها وكمّل الباقي، وفي الآخر كود خروج [[1]] |
| [[exec()]] بترجّع عدد الصفوف | [[rows: 1]] في الإعداد أول مرة = اتضاف، و [[rows: 0]] بعد كده = كان موجود |
| [[exit($failed ? 1 : 0)]] | سكربت النشر أو [[&&]] يعرف إنها فشلت |

والـ [[lib/auth.php]]:

~~~php
<?php
function require_admin(): void {
    session_start();
    if (($_SESSION['role'] ?? '') !== 'admin') {
        http_response_code(403);
        exit("403: admins only\n");
    }
}
~~~

---

## ٢. شغّله مرتين

~~~text php scripts/admin/migrate-2026-09.php (أول مرة)
OK   table referrals (rows: 0)
OK   column users.is_partner (rows: 0)
OK   index referrals.user_id (rows: 0)
OK   setting referrals_enabled (rows: 1)
done
exit=0
~~~

~~~text تاني مرة
OK   table referrals (rows: 0)
OK   column users.is_partner (rows: 0)
OK   index referrals.user_id (rows: 0)
OK   setting referrals_enabled (rows: 0)
done
exit=0
~~~

الفرق الوحيد [[rows: 0]] في الإعداد. وجوه MariaDB الجمل اللي فيها [[IF NOT EXISTS]] مش بتفشل، بتسيب **ملاحظة**:

~~~text SHOW WARNINGS (بعد كل جملة في التشغيل التاني)
Note	1060	Duplicate column name 'is_partner'
Note	1050	Table 'referrals' already exists
Note	1061	Duplicate key name 'idx_referrals_user'
~~~

والتأكيد من الداتابيز نفسها:

~~~text mariadb shop -e "SELECT COUNT(*) AS n FROM settings; SHOW COLUMNS FROM users LIKE 'is_partner'"
n
2
Field	Type	Null	Key	Default	Extra
is_partner	tinyint(1)	NO		0
~~~

### ونفس الترقية من غير [[IF NOT EXISTS]]؟

~~~text التشغيل التاني لنسخة ساذجة
FAIL: SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'referrals' already exists
FAIL: SQLSTATE[42S21]: Column already exists: 1060 Duplicate column name 'is_partner'
FAIL: SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'referrals_enabled' for key 'PRIMARY'
~~~

الداتابيز نفسها سليمة هنا، بس الناتج بقى كله [[FAIL]]، ومحدش هيعرف يفرق بين «اتعمل قبل كده» و «فشل بجد». والأسوأ لو السكربت وقف عند أول خطأ: الخطوات اللي بعدها مش هتتنفّذ أبدًا.

---

## ٣. ليه مش transaction وخلاص؟

~~~text MySQL 8.4: START TRANSACTION; ALTER TABLE users ADD COLUMN note ...; INSERT INTO settings ...; ROLLBACK;
Field	Type	Null	Key	Default	Extra
note	varchar(20)	YES		NULL
tmp_rows
1
~~~

الـ [[ROLLBACK]] مارجّعش حاجة! في MySQL و MariaDB أي [[ALTER]] أو [[CREATE]] بيعمل **implicit commit**: بيقفل الـ transaction اللي فاتحها قبله. وبعده الـ autocommit رجع، فالـ [[INSERT]] اتسجّل لوحده. يعني ترقية فشلت في الخطوة التالتة سابت الأولى والتانية متنفّذين، والطريقة الوحيدة الآمنة: كل خطوة تتعاد من غير ضرر.

في Postgres الـ DDL جوه transaction بيرجع ([[BEGIN; ALTER TABLE users ADD COLUMN note text; ROLLBACK;]] وبعدها العمود مش موجود، اتجرّب)، وبرضه بيدعم [[IF NOT EXISTS]] للجدول والعمود والـ index و [[ON CONFLICT DO NOTHING]] للإعداد. نفس الترقية مرتين:

~~~text psql -q -v ON_ERROR_STOP=1 < pg.sql (التشغيل التاني)
NOTICE:  relation "referrals" already exists, skipping
NOTICE:  column "is_partner" of relation "users" already exists, skipping
NOTICE:  relation "idx_referrals_user" already exists, skipping
~~~

---

## ٤. فخ: «idempotent» مش معناها «اكتب فوق»

الأدمن فعّل الميزة ([[UPDATE settings SET value='1' ...]]). وبعدين حد شغّل الترقية تاني. لو الإعداد مكتوب بـ [[ON DUPLICATE KEY UPDATE]]:

~~~sql
INSERT INTO settings (key_name, value) VALUES ('referrals_enabled','0')
ON DUPLICATE KEY UPDATE value = VALUES(value);
~~~

~~~text SELECT value FROM settings WHERE key_name='referrals_enabled'
0
~~~

الميزة اتقفلت للكل من غير ما حد يقصد. بنسختنا ([[WHERE NOT EXISTS]]):

~~~text بعد التشغيل التالت
OK   setting referrals_enabled (rows: 0)
done
1
~~~

القيمة فضلت [[1]]. والفرق بين التلات طرق:

| الطريقة | لو الصف موجود | تستخدمها إمتى |
|---|---|---|
| [[INSERT ... SELECT ... WHERE NOT EXISTS]] | مبيعملش حاجة، و [[rows: 0]] | قيمة افتراضية أول مرة بس (الحالة دي) |
| [[INSERT IGNORE]] | مبيعملش حاجة، بس بيحوّل أخطاء تانية لـ warnings (زي قيمة طويلة اتقصّت) فبيخبّي مشاكل | بلاش هنا |
| [[ON DUPLICATE KEY UPDATE]] | بيكتب فوق القيمة | لما الترقية **لازم** تفرض قيمة جديدة |

[[INSERT IGNORE]] اتجرّب: [[Warning 1062 Duplicate entry 'referrals_enabled' for key 'PRIMARY']] في [[SHOW WARNINGS]] ومن غير خطأ.

---

## ٥. MySQL مش MariaDB

نفس السكربت على [[mysql:8.4]]:

~~~text الناتج
OK   table referrals (rows: 0)
FAIL column users.is_partner: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'IF NOT EXISTS is_partner TINYINT(1) NOT NULL DEFAULT 0' at line 1
FAIL index referrals.user_id: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'IF NOT EXISTS idx_referrals_user ON referrals (user_id)' at line 1
OK   setting referrals_enabled (rows: 1)
done with 2 errors
exit=1
~~~

[[ADD COLUMN IF NOT EXISTS]] و [[CREATE INDEX IF NOT EXISTS]] إضافات MariaDB. MySQL 8 بيقبل [[CREATE TABLE IF NOT EXISTS]] بس. استضافات كتير بتقول «MySQL» وهي MariaDB: اعرف بـ [[SELECT VERSION();]] (لو فيها [[MariaDB]] يبقى MariaDB).

النسخة اللي بتشتغل على الاتنين بتسأل [[information_schema]] الأول:

~~~php
function exists(string $sql, array $args): bool {
    $st = db()->prepare($sql);
    $st->execute($args);
    return (int) $st->fetchColumn() > 0;
}
function column_exists(string $t, string $c): bool {
    return exists("SELECT COUNT(*) FROM information_schema.COLUMNS
                   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?", [$t, $c]);
}
function index_exists(string $t, string $i): bool {
    return exists("SELECT COUNT(*) FROM information_schema.STATISTICS
                   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?", [$t, $i]);
}

$steps = [
    // ...
    'column users.is_partner' => fn() => column_exists('users', 'is_partner') ? 'skip'
        : db()->exec("ALTER TABLE users ADD COLUMN is_partner TINYINT(1) NOT NULL DEFAULT 0"),
    'index referrals.user_id' => fn() => index_exists('referrals', 'idx_referrals_user') ? 'skip'
        : db()->exec("CREATE INDEX idx_referrals_user ON referrals (user_id)"),
];
~~~

- [[information_schema.COLUMNS]] و [[STATISTICS]]: جداول بتوصف الداتابيز نفسها (أعمدة كل جدول، وكل index).
- [[DATABASE()]]: الداتابيز اللي متوصّل بيها، عشان متلاقيش عمود بنفس الاسم في داتابيز تانية.
- [[fn() => ...]]: arrow function، الخطوة بقت دالة بتتنفّذ جوه الـ [[try]] بدل نص SQL.

~~~text MySQL 8.4، التشغيل التاني
OK   table referrals (rows: 0)
SKIP column users.is_partner (already there)
SKIP index referrals.user_id (already there)
OK   setting referrals_enabled (rows: 0)
done
~~~

ونفس الناتج على MariaDB.

---

## ٦. الترتيب: الكود، وبعدين الترقية، وبعدين التفعيل

الصفحة الجديدة [[referrals.php]]:

~~~php
<?php
// صفحة الإحالات الجديدة: مستخبية (404) لحد ما الأدمن يفعّلها
require __DIR__ . '/lib/db.php';
$on = db()->query("SELECT value FROM settings WHERE key_name = 'referrals_enabled'")->fetchColumn();
if ($on !== '1') {             // false (الصف لسه مش موجود) أو '0'
    http_response_code(404);
    exit("not found\n");
}
$n = db()->query("SELECT COUNT(*) FROM users WHERE is_partner = 1")->fetchColumn();
echo "partners: $n\n";
~~~

| المرحلة | [[curl /referrals.php]] |
|---|---|
| ١. الكود اتنشر، الترقية لسه | [[404]] (الإعداد مش موجود، [[fetchColumn()]] رجّعت [[false]]) |
| ٢. بعد الترقية | [[404]] (الإعداد [[0]]) |
| ٣. الأدمن فعّل | [[200]] و [[partners: 0]] |

الكود الجديد شغّال بالقيم الافتراضية من غير الترقية، فمفيش لحظة الموقع فيها بايظ. ولو حد فعّل **قبل** الترقية:

~~~text curl /referrals.php (الإعداد 1 والعمود مش موجود)
Fatal error: Uncaught PDOException: SQLSTATE[42S22]: Column not found: 1054 Unknown column 'is_partner' in 'WHERE' in /app/referrals.php:9
[200]
~~~

ولاحظ [[200]] مع Fatal error: الـ [[display_errors]] كان شغّال في المعمل، فـ PHP كتب الخطأ في الصفحة وكود الرد فضل [[200]]. كود الرد لوحده مش دليل.

> القاعدة العامة (expand / contract في تاب المعمارية): الإضافات (جدول وعمود جديد بقيمة افتراضية) آمنة مع الكود القديم، فممكن الترقية تسبق الكود. والكود الجديد لازم ميعتمدش على الجديد غير بعد ما يتأكد إنه موجود، أو يتقفل ورا إعداد زي هنا. والحذف وتغيير الأسماء آخر حاجة، بعد ما مفيش كود بيستخدم القديم.

---

## ٧. لما سطر يطلع [[FAIL]]

ابعت الناتج **كله** زي ما هو (اسم الخطوة ورسالة MySQL بالكود: [[1064]] syntax، [[1142]] صلاحية، [[1054]] عمود مش موجود). متعدّلش في الداتابيز بإيدك تكمّل اللي فشل: صلّح الجملة في السكربت، وشغّله تاني. هو مصمم لكده.

---

## ٨. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تنفّذ الجمل بإيدك من phpMyAdmin | مفيش سجل إيه اتنفّذ، ومش هتتكرر زي ما هي على نسخة تانية (staging أو سيرفر جديد) |
| تشيل [[require_admin()]] مؤقتًا عشان تفتحه من المتصفح | هيتنسي، وأي حد هيقدر يشغّله |
| رابط سري فيه token ([[?key=...]]) | الـ token بيتسجّل في لوجات السيرفر والـ proxy وسجل المتصفح |
| [[ON DUPLICATE KEY UPDATE]] للإعدادات | بيكتب فوق قرار الأدمن (اتجرّب: [[1]] بقت [[0]]) |
| ترقية واحدة كبيرة في transaction | الـ DDL في MySQL بيعمل commit لوحده، فالـ rollback مش هيرجّع |

---

## ٩. متتكررش

- كل جملة في أي ترقية لازم تعدّي «شغّلها مرتين» قبل ما تتنشر (على نسخة محلية من نفس نوع الداتابيز ونفس الإصدار).
- ملفات الترقية بره الـ web root لو تقدر، أو مقفولة بـ [[.htaccess]] ([[Require all denied]]) وكمان [[require_admin()]].
- الخطوة الجاية: جدول [[schema_migrations]] بيسجّل كل ترقية اتنفّذت وإمتى، وده اللي بتعمله أدوات زي Laravel migrations و Phinx و Flyway (درس [[make:migration]] في Laravel).

---

## الخلاصة

| عايز | MariaDB | MySQL 8 |
|---|---|---|
| جدول | [[CREATE TABLE IF NOT EXISTS]] | نفسه |
| عمود | [[ADD COLUMN IF NOT EXISTS]] | [[information_schema.COLUMNS]] الأول |
| index | [[CREATE INDEX IF NOT EXISTS]] | [[information_schema.STATISTICS]] الأول |
| قيمة افتراضية | [[INSERT ... SELECT ... WHERE NOT EXISTS]] | نفسه |
| تتأكد | شغّلها مرتين: نفس الناتج، والأعداد ثابتة | نفسه |`,
          deep: {
            why: R`الترقيات بتتعاد غصب عنك: سكربت وقف في النص من timeout أو صلاحية ناقصة، أو اتنين في الفريق شغّلوه، أو نسخة staging اتعملت من الإنتاج وفيها نص الترقية. لو كل جملة بتتعاد من غير ضرر، الحل لأي حاجة من دول «شغّله تاني». ولو لأ، كل مرة محتاج حد يقرا الداتابيز ويقرر بإيده إيه اللي اتنفّذ.`,
            how: R`[[IF NOT EXISTS]] بيخلّي الداتابيز تتأكد بنفسها وتسيب Note بدل الخطأ (1050 و 1060 و 1061 في MariaDB). و [[INSERT ... SELECT ... FROM DUAL WHERE NOT EXISTS (...)]] بيرجّع صف واحد لو الشرط صح وصفر لو لأ، و [[DUAL]] جدول وهمي عشان [[SELECT]] من غير جدول. و [[PDO::exec]] بيرجّع عدد الصفوف اللي اتأثرت. و MySQL/MariaDB بيعملوا implicit commit قبل وبعد أي DDL، عشان كده الترقيات مبتتلفّش في transaction. و [[PHP_SAPI]] ثابت بيتحدد وقت تشغيل PHP: [[cli]] من الترمنال و cron، و [[fpm-fcgi]] أو [[cgi-fcgi]] أو [[litespeed]] على الاستضافات.`,
            when: R`أي تغيير في الداتابيز على موقع شغّال من غير أداة migrations: جدول أو عمود أو index أو إعداد افتراضي. وبرضه جوه أدوات الـ migrations لما الترقية بتعمل حاجة الأداة مش بتتابعها (زي بيانات افتراضية). ولو المشروع بيكبر: انقل لأداة بتسجّل اللي اتنفّذ.`,
            mistakes: R`تفتكر إن [[403]] من المتصفح عطل فتشيل الحماية. وتكتب [[ADD COLUMN IF NOT EXISTS]] على MySQL. وتستخدم [[ON DUPLICATE KEY UPDATE]] لقيمة افتراضية فتكتب فوق قرار الأدمن. وتستخدم [[INSERT IGNORE]] فتستخبى أخطاء تانية. وتعتمد على [[ROLLBACK]] في ترقية فيها [[ALTER]]. وتفعّل الميزة قبل الترقية. وتصلّح [[FAIL]] بإيدك في phpMyAdmin بدل السكربت. وتشغّل الترقية قبل ما تتأكد إن الكود الجديد وصل السيرفر.`
          },
          sol: R`MariaDB: التشغيلتين [[done]] و [[exit=0]]، والفرق [[rows: 1]] ثم [[rows: 0]] في الإعداد، و [[SHOW WARNINGS]] فيه [[Note 1060]] و [[1050]] و [[1061]]. بعد [[UPDATE ... '1']] وتشغيل تالت القيمة فضلت [[1]]. النسخة الساذجة: [[1050 Table 'referrals' already exists]] و [[1060 Duplicate column name]] و [[1062 Duplicate entry]]. على [[mysql:8.4]]: سطرين [[FAIL ... 1064 ... near 'IF NOT EXISTS ...']] و [[done with 2 errors]] و [[exit=1]]، والنسخة بـ [[information_schema]]: [[SKIP]] في التشغيل التاني على الاتنين. المتصفح من غير أدمن: [[403: admins only]].

اتجرّب على [[mariadb:11.4]] (11.4.13) و [[mysql:8.4]] (8.4.13) و [[postgres:16-alpine]] و [[php:8.4-cli]] بـ [[pdo_mysql]] في Docker. أمر [[ssh]] في المثال بعناوين من نطاق التوثيق ومحتاج سيرفر حقيقي.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: لكل واحدة من دول اكتب النسخة اللي بتتعاد بأمان على MariaDB وعلى MySQL 8: جدول جديد، وعمود جديد، و index، وإعداد بقيمة افتراضية.`, done: R`٨ جمل (أو جملة وفحص [[information_schema]])، والإعداد بـ [[WHERE NOT EXISTS]] مش [[ON DUPLICATE KEY UPDATE]]، وجرّبت كل واحدة مرتين على الداتابيز ومفيش ولا خطأ.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: سكربت فيه ٤ خطوات، التالتة [[ALTER TABLE orders ADD COLUMN coupon VARCHAR(20)]] (من غير IF NOT EXISTS) والرابعة [[INSERT IGNORE INTO settings ...]]. اتشغّل مرة ووقف عند الرابعة بسبب انقطاع. توقّع ناتج التشغيل التاني سطر سطر على MariaDB، وبعدين نفّذ.`, done: R`توقعت إن الخطوة التالتة [[FAIL ... 1060 Duplicate column name 'coupon']] والباقي يعدّي، والنتيجة طابقت، وصلّحت التالتة بـ [[IF NOT EXISTS]] والتشغيل التالت كله [[OK]].` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: الترقية دي بتتشغّل من المتصفح بـ [[?token=abc123]]، والإعداد بـ [[REPLACE INTO settings VALUES ('maintenance','0')]]، والسكربت بيقف عند أول خطأ بـ [[die()]]. لاقي ٣ مشاكل وصلّحها.`, done: R`شلت الـ token وحطيت [[PHP_SAPI]] و [[require_admin()]]، وبدلت [[REPLACE INTO]] (بيمسح الصف ويرجّعه بالقيمة الجديدة، يعني بيكتب فوق) بـ [[WHERE NOT EXISTS]]، وخلّيت كل خطوة في [[try]] تكمّل وتطلع بكود 1 في الآخر، وجرّبت إن المتصفح من غير دخول بياخد 403.` },
            { lvl: 'تطبيق', t: R`ابني [[migrate.php]] عام بياخد فولدر [[migrations/]] فيه ملفات [[2026_09_01_referrals.php]] كل واحد بيرجّع array خطوات، وجدول [[schema_migrations (name, ran_at)]]: بينفّذ اللي مش متسجّل بس، ويسجّل كل ملف بعد ما كل خطواته تعدّي، و [[--dry-run]] بيطبع اللي هيتنفّذ من غير ما ينفّذ.`, done: R`أول مرة بينفّذ الملفين ويسجّلهم، التانية بتطبع [[nothing to run]]، وملف فيه خطوة فاشلة مبيتسجّلش وبيتعاد المرة الجاية، و [[--dry-run]] مبيغيّرش [[SELECT COUNT(*) FROM schema_migrations]].` },
            { lvl: 'تحدي', t: R`اكتب اختبار: script بـ bash بيشغّل MariaDB و MySQL في Docker، ويحط نفس الـ schema، ويشغّل الترقية مرتين على كل واحدة، ويقارن [[mysqldump --no-data]] بعد التشغيل الأول وبعد التاني (لازم يكونوا زي بعض)، ويفشل لو فيه سطر [[FAIL]].`, done: R`على السكربت السليم: [[diff]] بين الـ dumps فاضي على الاتنين وكود الخروج 0. لما ترجّع [[ADD COLUMN IF NOT EXISTS]] من غير فحص: بيفشل على MySQL بس وبيطبع اسم الخطوة. والـ containers بتتمسح في الآخر حتى لو فشل ([[trap]]).` },
            { lvl: 'تحدي', t: R`اشرحها: زميلك عايز يشغّل الترقية **قبل** ما ينشر الكود، وزميل تاني عايز ينشر الأول. اكتب لكل ترتيب امتى يبقى صح وامتى يكسر الموقع، بمثال من الدرس، في ٦ سطور.`, done: R`الإضافات (جدول، عمود بـ DEFAULT) آمنة قبل الكود، والكود اللي بيقرا الجديد لازم يستنى الترقية أو يبقى ورا إعداد، والحذف أو تغيير الاسم بعد الكود، ومذكور مثال [[Unknown column 'is_partner']] لما الإعداد اتفعّل قبل الترقية.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`cat > migrate.php <<'EOF'
<?php
$db = new PDO('sqlite:' . __DIR__ . '/shop.sqlite', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
if (PHP_SAPI !== 'cli') { http_response_code(403); exit("403: admins only\n"); }
function column_exists(PDO $db, string $t, string $c): bool {
    foreach ($db->query("PRAGMA table_info($t)") as $col) if ($col['name'] === $c) return true;
    return false;
}
$steps = [
    'table settings' => fn() => $db->exec("CREATE TABLE IF NOT EXISTS settings (key_name TEXT PRIMARY KEY, value TEXT NOT NULL)"),
    'table users' => fn() => $db->exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT)"),
    'column users.is_partner' => fn() => column_exists($db, 'users', 'is_partner') ? 'skip'
        : $db->exec("ALTER TABLE users ADD COLUMN is_partner INTEGER NOT NULL DEFAULT 0"),
    'setting referrals_enabled' => fn() => $db->exec("INSERT INTO settings (key_name, value)
        SELECT 'referrals_enabled', '0' WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key_name = 'referrals_enabled')"),
];
$failed = 0;
foreach ($steps as $name => $step) {
    try { $r = $step(); echo $r === 'skip' ? "SKIP $name\n" : "OK   $name (rows: $r)\n"; }
    catch (PDOException $e) { $failed++; echo "FAIL $name: " . $e->getMessage() . "\n"; }
}
echo $failed ? "done with errors\n" : "done\n";
exit($failed ? 1 : 0);
EOF
php migrate.php > run1.txt; echo "run1 exit=$?"
php -r '$d=new PDO("sqlite:shop.sqlite"); $d->exec("UPDATE settings SET value=1 WHERE key_name=\"referrals_enabled\"");'
php migrate.php > run2.txt; echo "run2 exit=$?"
grep -c FAIL run1.txt run2.txt
grep "setting" run1.txt run2.txt
grep "is_partner" run2.txt
php -r '$d=new PDO("sqlite:shop.sqlite"); echo "value=", $d->query("SELECT value FROM settings")->fetchColumn(), " rows=", $d->query("SELECT COUNT(*) FROM settings")->fetchColumn(), "\n";'
php -S 127.0.0.1:8798 > /dev/null 2>&1 &
PID=$!; sleep 1
curl -s -w "[%{http_code}]\n" http://127.0.0.1:8798/migrate.php
kill $PID`, expect: [R`run1 exit=0`, R`run2 exit=0`, R`run1.txt:0`, R`run2.txt:0`, R`run1.txt:OK   setting referrals_enabled (rows: 1)`, R`run2.txt:OK   setting referrals_enabled (rows: 0)`, R`SKIP column users.is_partner`, R`value=1 rows=1`, R`403: admins only`, R`[403]`] },
          ],
        }
      ]
    }
]);
