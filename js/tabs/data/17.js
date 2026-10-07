// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "أسئلة انترفيو قواعد البيانات",
      l: 3,
      n: "الأسئلة اللي بتتسأل في أي انترفيو backend، والإجابة بمثال من المتجر بدل التعريف المحفوظ",
      items: [
        {
          cmd: "SQL ولا NoSQL",
          title: "امتى Postgres وامتى MongoDB، وإزاي تجاوب من غير «حسب الحالة» وبس",
          desc: R`السؤال مش «أنهي أحسن». السؤال «شكل الداتا إيه، وهتتقري إزاي، وإيه اللي لازم يفضل مظبوط؟».

SQL (Postgres و MySQL): جداول بـ schema صارم، وعلاقات بـ FKs و JOINs، و transactions و constraints بتحمي الداتا. مناسب لأي حاجة فيها فلوس، أو علاقات كتير، أو تقارير بتجمّع من كذا جدول.

NoSQL (MongoDB، و Redis، و DynamoDB): أنواع مختلفة، مش حاجة واحدة. Mongo مستندات مرنة بتتقري كوحدة واحدة. Redis key-value في الذاكرة للـ cache والـ sessions. DynamoDB و Cassandra لحجم ضخم بأنماط قراية معروفة مسبقًا.

الإجابة القوية: الافتراضي Postgres (وفيه jsonb للأجزاء المرنة)، ونختار حاجة تانية لما يبقى فيه سبب محدد تقدر تقوله.`,
          example: R`SELECT name, price, attrs FROM products WHERE is_active;
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
SELECT u.email, sum(o.total) FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.email;`,
          try: R`لكل حالة من دول قول هتختار إيه وليه في جملتين: (١) محفظة فلوس للمدرسين فيها سحب وإيداع. (٢) لوج أحداث من تطبيق موبايل، ملايين في اليوم وكل حدث شكله مختلف. (٣) cache لنتيجة API بتتطلب كتير. (٤) كتالوج منتجات كل فئة ليها مواصفات مختلفة.`,
          sol: R`(١) Postgres: فلوس يعني transactions و constraints ([[CHECK (balance >= 0)]]) و [[SELECT FOR UPDATE]] أو atomic UPDATE. ولو قلت Mongo لازم تبرر الـ transactions (محتاجة replica set) وإن الـ schema مش هيحمي الرصيد.

(٢) ممكن الاتنين: Postgres بجدول فيه عمود jsonb و partitioning بالتاريخ بيستحمل كويس، و Mongo أو ClickHouse لو الحجم ضخم والتحليل هو الأساس. الإجابة الأقوى تسأل: هنعمل إيه بيها؟ تقارير تجميع؟ يبقى محتاجين حاجة معمولة للتحليل.

(٣) Redis، بـ TTL. مش قاعدة أساسية: لو ضاع، بيتحسب تاني.

(٤) Postgres بجدول products بأعمدة ثابتة (الاسم والسعر والمخزون) و [[attrs jsonb]] للمواصفات، و GIN index عليه (درس jsonb). ده بيدّيك مرونة Mongo في جزء واحد بس، والباقي محمي.

الغلطة في الانترفيو: «NoSQL أسرع و scalable أكتر». ده مش صحيح بشكل عام. السرعة بتيجي من الـ indexes وشكل الاستعلام.`,
          flag: "script",
          deep: {
            why: "السؤال ده في أغلب انترفيوهات الـ backend، وبيكشف لو انت بتختار أدوات بالموضة ولا بالمتطلبات. والإجابة الكويسة بتبين إنك عارف trade-offs حقيقية.",
            how: R`الفروق اللي تتقال: الـ schema (صارم ولا مرن، مع إن Mongoose بيرجّع schema في التطبيق). والعلاقات (JOIN في القاعدة ولا embedding و populate). والـ consistency (ACID من زمان في SQL، و Mongo بقت فيها transactions بس مكلفة ومش الأسلوب الأساسي). والـ scaling (Postgres بيكبر رأسيًا وبـ read replicas كويس جدًا لأغلب الشركات، و Mongo معمولة للـ sharding من الأول).

وفي الحقيقة الاتنين قربوا من بعض: Postgres فيه jsonb، و Mongo فيها transactions و $lookup.`,
            when: "أول قرار في أي مشروع، وفي أي سؤال system design.",
            mistakes: R`«Mongo عشان مفيش schema» (فيه schema، بس في الكود ومحدش بيحميه). «SQL مش بيعمل scale». تختار حاجتين من الأول من غير سبب. وتنسى إن الفريق بيعرف إيه جزء من القرار.`
          },
          teach: R`## الفكرة: الإجابة سؤالين، مش اسم قاعدة

في الانترفيو، «SQL ولا NoSQL؟» مش اختبار حفظ. هو بيشوف بتفكر إزاي: **شكل الداتا إيه؟** و **إيه اللي لازم يفضل صح مهما حصل؟** الأمثلة الـ ٣ في الدرس بتوري إن Postgres بيعمل الحاجة اللي الناس بتختار Mongo عشانها (داتا مرنة)، ومعاها الحاجة اللي Mongo بتصعّبها (JOIN وتجميع). والـ solCode بيوري الحاجة اللي لازم تتقال في أي سؤال فيه فلوس.

**إزاي جرّبناه:** على [[postgres:18]] في Docker، بجدول [[products]] فيه ٤ منتجات (منهم [[Cable]] مش active) و ٢ يوزرز و ٤ أوردرات. وسطر Mongo للمقارنة على [[mongo:8]] بـ [[mongosh]].

---

## ١. أعمدة ثابتة + [[jsonb]] للمرن

~~~sql
SELECT name, price, attrs FROM products WHERE is_active;
~~~

~~~text الناتج
  name  |  price   |                 attrs
--------+----------+----------------------------------------
 Hoodie |   450.00 | {"size": ["M", "L"], "color": "black"}
 Mug    |   120.00 | {"color": "white", "capacity_ml": 350}
 Laptop | 30000.00 | {"cpu": "Ryzen 7", "ram_gb": 16}
~~~

بص على الأعمدة: [[name]] و [[price]] ثابتين لكل المنتجات، ومحميين ([[NOT NULL]]، ونوع [[numeric]] للفلوس). أما [[attrs]] نوعه [[jsonb]] (JSON محفوظ بشكل binary تقدر تدوّر جواه)، وكل منتج فيه مواصفات مختلفة: الهودي مقاسات، والمج سعة، واللابتوب رامات. ده بالظبط «مستند مرن» زي Mongo، بس في عمود واحد.

و [[WHERE is_active]] من غير [[= true]]: العمود boolean أصلًا فهو نفسه الشرط.

(لاحظ إن [[size]] جه قبل [[color]] رغم إننا دخّلناه بعده: [[jsonb]] بيرتّب المفاتيح بطريقته ومش بيحفظ ترتيبك.)

---

## ٢. بحث جوه الـ jsonb: [[@>]]

~~~sql
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
~~~

[[@>]] اسمه contains: «الـ JSON اللي على الشمال **فيه** الـ JSON اللي على اليمين». يعني أي منتج [[attrs]] بتاعه فيه [[color]] = [[black]]، مهما كان فيه حاجات تانية.

~~~text الناتج
  name
--------
 Hoodie
 Cable
~~~

نفس السؤال في Mongo:

~~~text mongosh
db.products.find({ "attrs.color": "black" }, { _id: 0, name: 1 })
[ { name: 'Hoodie' } ]
~~~

(ضفنا منتجين بس في Mongo، فطلع واحد.) نفس الفكرة بالظبط. والـ index اللي بيخدم [[@>]] في Postgres اسمه GIN:

~~~sql
CREATE INDEX products_attrs_gin ON products USING gin (attrs);
~~~

وعشان نشوفه بيتستخدم على جدول صغير، قفلنا الـ Seq Scan مؤقتًا ([[SET enable_seqscan = off]]، للتجربة بس):

~~~text EXPLAIN
 Bitmap Heap Scan on products
   Recheck Cond: (attrs @> '{"color": "black"}'::jsonb)
   ->  Bitmap Index Scan on products_attrs_gin
         Index Cond: (attrs @> '{"color": "black"}'::jsonb)
~~~

[[Bitmap Index Scan on products_attrs_gin]]: لقى الصفوف من الـ index. ([[::jsonb]] معناها Postgres حوّل النص لـ jsonb عشان يقارن.)

---

## ٣. JOIN و GROUP BY في أمر واحد

~~~sql
SELECT u.email, sum(o.total) FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.email;
~~~

- [[users u]] و [[orders o]]: أسامي مختصرة للجداول (aliases)، فـ [[u.email]] يعني email من users.
- [[JOIN ... ON o.user_id = u.id]]: حط كل أوردر جنب صاحبه.
- [[GROUP BY u.email]] و [[sum(o.total)]]: صف واحد لكل إيميل، فيه مجموع أوردراته.

~~~text الناتج
      email       |   sum
------------------+----------
 omar@example.com | 30080.00
 sara@example.com |   570.00
~~~

ده سؤال عادي جدًا في أي تقرير. في Mongo هتحتاج aggregation pipeline بـ [[$lookup]] و [[$group]] (درس populate)، وده أصعب في الكتابة وفي الـ indexes.

---

## ٤. الفلوس: الـ solCode

~~~sql
CREATE TABLE teacher_wallets (
  teacher_id bigint PRIMARY KEY,
  balance_cents bigint NOT NULL DEFAULT 0 CHECK (balance_cents >= 0)
);
~~~

- [[balance_cents bigint]]: الرصيد **بالقروش** كرقم صحيح (١٢٠ جنيه = 12000). كده مفيش كسور ولا أخطاء تقريب.
- [[CHECK (balance_cents >= 0)]]: القاعدة نفسها ترفض أي رصيد سالب، مهما الكود عمل.

~~~sql
UPDATE teacher_wallets SET balance_cents = balance_cents - 5000
WHERE teacher_id = 1 AND balance_cents >= 5000;
~~~

اسحب ٥٠ جنيه **بس لو** الرصيد يكفي. الشرط والخصم في أمر واحد (atomic UPDATE)، فمستحيل طلبين في نفس اللحظة يعدّوا الاتنين على نفس الرصيد. جرّبنا على مدرس عنده ١٢٠ ومدرس عنده ٣٠:

~~~text الناتج
UPDATE 1
UPDATE 0
ERROR:  new row for relation "teacher_wallets" violates check constraint "teacher_wallets_balance_cents_check"
DETAIL:  Failing row contains (2, -2000).
~~~

1. الأول: [[UPDATE 1]]، اتسحب.
2. التاني (رصيده ٣٠): [[UPDATE 0]]: الشرط [[>= 5000]] منع، والكود يعرف من الرقم ده إن الرصيد مش كفاية.
3. وجرّبنا نفس السحب **من غير** الشرط: الـ [[CHECK]] رفض. ده خط الدفاع التاني لو حد نسي الشرط.

~~~text الناتج
 teacher_id | balance_cents
------------+---------------
          1 |          7000
          2 |          3000
~~~

---

## الخلاصة: إزاي تجاوب

| السؤال اللي تسأله | لو الإجابة كده | الاختيار |
|---|---|---|
| فيه فلوس أو رصيد أو مخزون؟ | أيوه | Postgres: transactions و CHECK و atomic UPDATE |
| الداتا علاقات كتير وتقارير بتجمّع؟ | أيوه | Postgres: JOIN و GROUP BY |
| جزء من الداتا شكله بيتغير؟ | أيوه | عمود [[jsonb]] + GIN، مش قاعدة تانية |
| cache بيتحسب تاني لو ضاع؟ | أيوه | Redis بـ TTL |
| حجم ضخم وأنماط قراية ثابتة ومعروفة؟ | أيوه | Mongo أو DynamoDB أو Cassandra، بسبب تقدر تقوله |

والجملة اللي تقفل بيها: «الافتراضي Postgres، وبختار حاجة تانية لما يبقى عندي سبب محدد».`,
          lines: [
            "جدول products من أول التاب: أعمدة ثابتة للحاجات المهمة، و attrs jsonb للمواصفات المرنة.",
            "بحث جوه الـ jsonb (زي Mongo)، ومعاه GIN index يبقى سريع.",
            "و JOIN و GROUP BY في استعلام واحد، ودي الحاجة اللي Mongo بتصعّبها."
          ],
          solCode: R`CREATE TABLE teacher_wallets (
  teacher_id bigint PRIMARY KEY,
  balance_cents bigint NOT NULL DEFAULT 0 CHECK (balance_cents >= 0)
);
UPDATE teacher_wallets SET balance_cents = balance_cents - 5000
WHERE teacher_id = 1 AND balance_cents >= 5000;`
        },
        {
          cmd: "ACID",
          title: "ACID بمثال: تحويل فلوس من محفظة لمحفظة",
          desc: R`ACID أربع ضمانات للـ transaction:

Atomicity: كله أو ولا حاجة. الخصم من محفظة والإضافة للتانية يا حصلوا الاتنين يا ولا واحد.

Consistency: الداتا بتنتقل من حالة صحيحة لحالة صحيحة. الـ constraints (زي [[CHECK (balance >= 0)]]) عمرها ما تتكسر حتى في النص.

Isolation: transactions شغالة في نفس الوقت متشوفش تعديلات بعض الناقصة. وقد إيه بالظبط بيتحدد بالـ isolation level (الدرس الجاي).

Durability: بعد COMMIT الداتا مش هتضيع حتى لو الكهربا قطعت. Postgres بيكتبها في الـ WAL على الديسك قبل ما يقولك تم.`,
          example: R`CREATE TABLE wallets (id bigint PRIMARY KEY, balance numeric(10,2) NOT NULL CHECK (balance >= 0));
INSERT INTO wallets VALUES (1, 100), (2, 0);
BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;`,
          try: R`شغّل المثال: أول UPDATE هيفشل. بعد الـ error جرّب تكمّل التاني وتعمل COMMIT. إيه اللي حصل للمحفظتين؟ وبعدين كرر بمبلغ ٥٠ وشوف.`,
          sol: R`بـ ١٥٠: أول UPDATE هيفشل بـ [[violates check constraint "wallets_balance_check"]]. بعدها أي أمر في نفس الـ transaction هيطلع [[current transaction is aborted, commands ignored until end of transaction block]]، و COMMIT هيتحول ROLLBACK (psql هيكتب [[ROLLBACK]]). المحفظتين هيفضلوا ١٠٠ و ٠. ده الـ Atomicity والـ Consistency مع بعض: مفيش ١٥٠ اتضافوا لحد من غير ما يتخصموا من حد.

بـ ٥٠: الاتنين هيتنفذوا و COMMIT: ٥٠ و ٥٠.

في الانترفيو قول المثال ده بالظبط، وضيف إن الـ durability في Postgres جاية من الـ WAL (بيتكتب قبل الـ COMMIT يرجع)، و [[synchronous_commit = off]] بيتنازل عن جزء منها عشان السرعة.`,
          solCode: R`BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;

BEGIN;
UPDATE wallets SET balance = balance - 50 WHERE id = 1;
UPDATE wallets SET balance = balance + 50 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;`,
          flag: "script",
          deep: {
            why: "أكتر سؤال قواعد بيانات بيتسأل. والتعريف المحفوظ للأربع حروف مش كفاية؛ اللي بيفرق إنك تدّي مثال وتوضح كل حرف بيحمي من إيه.",
            how: R`Atomicity في Postgres جاية من MVCC: كل صف ليه نسخ، والتعديلات بتبقى مش ظاهرة لحد الـ COMMIT، والـ ROLLBACK بيسيبها ميتة (والـ VACUUM بينضفها). Consistency جاية من الـ constraints والـ FKs والـ triggers. Isolation من الـ snapshots والأقفال. Durability من الـ WAL و fsync.

وخلي بالك: الـ C في ACID غير الـ C في CAP theorem. هنا معناها «القواعد متتكسرش»، هناك معناها «كل النسخ شايفة نفس القيمة».`,
            when: "أي عملية بتعدّل أكتر من صف ولازم تبقى مع بعض: تحويل، وأوردر، وحجز. التفاصيل العملية في درس transaction ودرس $transaction في تاب «Backend بـ Node».",
            mistakes: R`تحفظ التعريفات من غير مثال. تخلط C بتاعة ACID مع CAP. تقول إن Mongo «مش ACID» (بقت فيها transactions متعددة المستندات، بشروط). وفي الكود: تعمل الخطوتين من غير transaction وتفتكر إن القاعدة هتحميك لوحدها.`
          },
          teach: R`## الفكرة: تحويل فلوس بيفشل في النص، ونشوف الـ ٤ حروف بتحمينا إزاي

المثال بيحاول يحوّل ١٥٠ جنيه من محفظة فيها ١٠٠ بس. أول خطوة هتفشل، والسؤال: الخطوة التانية (الإضافة) هيحصلها إيه؟ الإجابة هي ACID كلها في مثال واحد.

**إزاي جرّبناه:** في psql على [[postgres:18]] في Docker، المثال بالظبط وبعده الـ solCode.

---

## ١. الجدول والقاعدة

~~~sql
CREATE TABLE wallets (id bigint PRIMARY KEY, balance numeric(10,2) NOT NULL CHECK (balance >= 0));
INSERT INTO wallets VALUES (1, 100), (2, 0);
~~~

- [[numeric(10,2)]]: رقم عشري مظبوط برقمين بعد العلامة، مناسب للفلوس (مش [[float]] اللي بيقرّب).
- [[CHECK (balance >= 0)]]: قاعدة بتتفحص مع كل INSERT و UPDATE: الرصيد مينفعش يبقى سالب. Postgres بيسمّيها لوحده [[wallets_balance_check]] (الجدول_العمود_check).
- [[VALUES (1, 100), (2, 0)]]: صفين في أمر واحد: محفظة ١ فيها ١٠٠، ومحفظة ٢ فاضية.

---

## ٢. التحويل

~~~sql
BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
~~~

[[BEGIN]] بيفتح transaction: كل الأوامر لحد [[COMMIT]] وحدة واحدة. و [[balance = balance - 150]] بيحسب من القيمة الحالية جوه القاعدة.

الناتج الحقيقي سطر سطر:

~~~text الناتج
BEGIN
ERROR:  new row for relation "wallets" violates check constraint "wallets_balance_check"
DETAIL:  Failing row contains (1, -50.00).
ERROR:  current transaction is aborted, commands ignored until end of transaction block
ROLLBACK
~~~

| السطر | معناه |
|---|---|
| [[BEGIN]] | الـ transaction بدأت |
| أول [[ERROR]] | الخصم هيخلّي الرصيد [[-50.00]]، والـ CHECK رفض. [[DETAIL]] بيوريك الصف اللي كان هيتكتب |
| تاني [[ERROR]] | الإضافة **متنفّذتش أصلًا**: بعد أي error الـ transaction بتبقى aborted، وأي أمر بعده بيترفض لحد ما تقفلها |
| [[ROLLBACK]] | كتبنا [[COMMIT]]، بس Postgres رد بـ [[ROLLBACK]]: transaction فيها error مينفعش تتحفظ |

~~~sql
SELECT * FROM wallets ORDER BY id;
~~~

~~~text الناتج
 id | balance
----+---------
  1 |  100.00
  2 |    0.00
~~~

زي ما كانوا بالظبط.

### ومن غير [[BEGIN]]؟

عشان تحس قيمة الكلام ده، شغّلنا نفس الخطوتين من غير transaction، وبالترتيب العكسي (الإضافة الأول، زي ما كود كتير بيعمل):

~~~sql
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
~~~

~~~text الناتج
UPDATE 1
ERROR:  new row for relation "wallets" violates check constraint "wallets_balance_check"
DETAIL:  Failing row contains (1, -50.00).

 id | balance
----+---------
  1 |  100.00
  2 |  150.00
~~~

من غير BEGIN كل أمر بيتحفظ لوحده. الإضافة اتحفظت، والخصم فشل: **١٥٠ جنيه اتخلقوا من الهوا**. ده بالظبط اللي الـ transaction بتمنعه.

---

## ٣. بمبلغ يكفي (الـ solCode)

~~~sql
BEGIN;
UPDATE wallets SET balance = balance - 50 WHERE id = 1;
UPDATE wallets SET balance = balance + 50 WHERE id = 2;
COMMIT;
~~~

~~~text الناتج
BEGIN
UPDATE 1
UPDATE 1
COMMIT

 id | balance
----+---------
  1 |   50.00
  2 |   50.00
~~~

[[UPDATE 1]] يعني صف واحد اتعدّل. والاتنين اتحفظوا مع بعض.

---

## ٤. الأربع حروف على المثال ده

| الحرف | معناه | شفناه فين |
|---|---|---|
| **A**tomicity | كله أو ولا حاجة | الخصم فشل، فالإضافة كمان اتلغت. المحفظتين ١٠٠ و ٠ |
| **C**onsistency | القواعد ([[CHECK]] و FK و UNIQUE) عمرها ما تتكسر | الرصيد مبقاش [[-50]] ولا لحظة |
| **I**solation | transactions شغالة مع بعض متشوفش الحاجات الناقصة بتاعة بعض | لو حد قرا وسط التحويل الناجح، هيشوف ١٠٠ و ٠ أو ٥٠ و ٥٠، عمره ما يشوف ٥٠ و ٠ (الدرس الجاي بالتفصيل) |
| **D**urability | بعد [[COMMIT]] الداتا مش هتضيع | Postgres بيكتب التغيير في الـ WAL على الديسك قبل ما يرد [[COMMIT]] |

### الـ D: الـ WAL

WAL = Write-Ahead Log: دفتر Postgres بيكتب فيه كل تغيير **قبل** ما يعدّل الجداول نفسها. لو الكهربا قطعت بعد الـ COMMIT، وهو بيقوم بيقرا الدفتر ويكمّل. ومكانك في الدفتر رقم اسمه LSN:

~~~text SELECT pg_current_wal_lsn();
 pg_current_wal_lsn
--------------------
 0/2A66920
~~~

والإعداد اللي بيتحكم في «استنى الكتابة على الديسك قبل ما ترد»:

~~~text SHOW synchronous_commit;
 synchronous_commit
--------------------
 on
~~~

[[on]] الافتراضي. لو [[off]]، الـ COMMIT بيرجع أسرع بس آخر كام transaction ممكن يضيعوا لو السيرفر وقع (الداتا مش هتبوظ، بس هتبقى أقدم شوية).

---

## الخلاصة

- error جوه transaction = الـ transaction كلها aborted، و [[COMMIT]] بيبقى [[ROLLBACK]].
- من غير [[BEGIN]] كل أمر لوحده، ونص العملية ممكن يتحفظ.
- في الانترفيو: احكي التحويل ده، وقول كل حرف بيحمي من إيه، والـ D جاية من الـ WAL.
- الـ C في ACID (القواعد متتكسرش) غير الـ C في CAP (كل النسخ شايفة نفس القيمة).`,
          lines: [
            "محافظ، والرصيد مينفعش يبقى سالب.",
            "محفظة فيها ١٠٠ ومحفظة فاضية.",
            "ابدأ transaction.",
            "اخصم ١٥٠: هيفشل (الرصيد هيبقى سالب).",
            "أضيف للتانية: متجاهل، الـ transaction بقت aborted.",
            "COMMIT هنا بيبقى ROLLBACK.",
            "المحفظتين زي ما كانوا."
          ]
        },
        {
          cmd: "isolation anomalies",
          title: "dirty read و lost update و phantom و write skew: كل واحدة بمثال",
          desc: R`لما two transactions شغالين في نفس الوقت، ممكن يحصل مشاكل (anomalies)، والـ isolation level بيحدد أنهي منها ممكن:

dirty read: تقرا تعديل لسه متعملوش COMMIT. مستحيل في Postgres خالص.

non-repeatable read: تقرا نفس الصف مرتين في transaction واحدة فتلاقي قيمتين، لأن حد عمل COMMIT في النص. بيحصل في [[READ COMMITTED]] (الافتراضي)، ومش بيحصل في [[REPEATABLE READ]].

phantom: نفس الـ WHERE يرجّع صفوف زيادة في المرة التانية. في Postgres الـ REPEATABLE READ بيمنعه.

lost update: الاتنين قروا المخزون ١٠، والاتنين كتبوا ٩، فبيعتين بقوا واحدة. بيحصل في READ COMMITTED لو قريت في الكود وكتبت. REPEATABLE READ بيرفض التاني بـ error.

write skew: كل واحد قرا حاجة وكتب في صف مختلف، فالقاعدة (زي «لازم دكتور واحد مناوب على الأقل») اتكسرت. [[SERIALIZABLE]] بس اللي بيمنعه.`,
          example: R`// session A و B في نفس الوقت، READ COMMITTED
await a.query("BEGIN"); await b.query("BEGIN");
const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1]);
await a.query("COMMIT");
await pending;
await b.query("COMMIT");`,
          try: R`شغّل السيناريو بمكتبة pg وعميلين ([[new pg.Client]] مرتين)، والمخزون ١٠. المخزون النهائي كام؟ وبعدين غيّر BEGIN في الاتنين لـ [[BEGIN ISOLATION LEVEL REPEATABLE READ]] وشوف B حصله إيه.`,
          sol: R`في READ COMMITTED: المخزون النهائي [[9]] مع إن قطعتين اتباعوا. ده lost update. الـ UPDATE بتاع B استنى A يخلص (قفل على الصف)، وبعدين كتب 9 اللي كان حسبها من قراية قديمة.

في REPEATABLE READ: الـ UPDATE بتاع B هيفشل بـ [[could not serialize access due to concurrent update]] (code [[40001]])، والمخزون 9 بعد بيعة واحدة بس. التطبيق لازم يعمل retry للـ transaction كلها.

والحل الأبسط من غير تغيير الـ level: متقراش في الكود وتكتب. [[UPDATE products SET stock = stock - 1 WHERE ... AND stock >= 1]] (درس atomic UPDATE)، أو [[SELECT ... FOR UPDATE]].`,
          solCode: R`import pg from "pg";
const url = process.env.DATABASE_URL;
const a = new pg.Client(url), b = new pg.Client(url);
await a.connect(); await b.connect();

for (const level of ["READ COMMITTED", "REPEATABLE READ"]) {
  await a.query("UPDATE products SET stock = 10 WHERE name = 'Hoodie'");
  await a.query($__btBEGIN ISOLATION LEVEL $__{level}$__bt); await b.query($__btBEGIN ISOLATION LEVEL $__{level}$__bt);
  const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
  const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
  await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
  const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1])
    .then(() => "ok", (e) => "ERR " + e.code);
  await a.query("COMMIT");
  const res = await pending;
  await b.query(res === "ok" ? "COMMIT" : "ROLLBACK");
  const { rows } = await a.query("SELECT stock FROM products WHERE name = 'Hoodie'");
  console.log(level, res, rows[0].stock);
}
await a.end(); await b.end();`,
          flag: "script",
          deep: {
            why: "السؤال «إيه الـ isolation levels؟» بيتسأل كتير، والإجابة اللي بتفرق هي إنك تربط كل level بالمشكلة اللي بيمنعها، بمثال حقيقي زي المخزون، وتقول الحل العملي.",
            how: R`Postgres بيطبّق الـ levels بـ snapshots (MVCC): READ COMMITTED بياخد snapshot جديد لكل أمر، و REPEATABLE READ snapshot واحد للـ transaction كلها، و SERIALIZABLE نفس الـ snapshot ومعاه تتبع للاعتماديات (SSI) ويلغي transaction لو النتيجة مش ممكن تطلع من تنفيذ ورا بعض.

الأعلى = مشاكل أقل بس errors أكتر ([[40001]]) لازم الكود يعيد عليها. التفاصيل في درس isolation levels في المستوى التاني.

optimistic ولا pessimistic locking؟ pessimistic: اقفل الأول ([[FOR UPDATE]]) لما التضارب متوقع كتير (آخر قطعة في flash sale). optimistic: عمود [[version]] و [[UPDATE ... SET version = version + 1 WHERE id = $1 AND version = $2]]، ولو 0 صفوف اتعدّلت يبقى حد سبقك، اعرض رسالة أو أعد المحاولة. مناسب لتعديلات الفورمز اللي التضارب فيها نادر.`,
            when: "أي read-modify-write: مخزون، ورصيد، وكوبونات، وحجز مواعيد.",
            mistakes: R`تقول إن READ COMMITTED بيمنع lost update. ترفع كل حاجة لـ SERIALIZABLE من غير retry. تفتكر إن الـ transaction لوحدها (BEGIN و COMMIT) بتمنع التضارب. وتنسى إن Postgres مفيهوش dirty read حتى لو طلبت READ UNCOMMITTED.`
          },
          teach: R`## الفكرة: عميلين بيشتروا آخر هودي في نفس اللحظة

المثال بيفتح اتصالين بالقاعدة ([[a]] و [[b]])، كأنهم طلبين جايين للسيرفر في نفس الوقت. الاتنين بيقروا المخزون، والاتنين بيكتبوا «المخزون ناقص واحد». والسؤال: المخزون في الآخر كام؟ والإجابة بتختلف حسب الـ isolation level.

**إزاي جرّبناه:** الـ solCode بمكتبة [[pg]] في Node بـ [[tsx]]، على [[postgres:18]] في Docker، وجدول [[products]] فيه [[Hoodie]] مخزونه ١٠. وزودنا سطر بيطبع اللي اتقرا، وسطر بيبص في [[pg_stat_activity]] وB مستني.

---

## ١. اتصالين = جلستين

~~~js
import pg from "pg";
const a = new pg.Client(url), b = new pg.Client(url);
await a.connect(); await b.connect();
~~~

[[new pg.Client(url)]] بيعمل اتصال واحد بالقاعدة. كل اتصال جلسة (session) لوحدها، وليها transaction لوحدها. فـ [[a]] و [[b]] بالظبط زي اتنين فاتحين psql في شباكين. ([[url]] هو رابط القاعدة من [[process.env.DATABASE_URL]].)

---

## ٢. السيناريو خطوة خطوة

~~~js
await a.query("BEGIN"); await b.query("BEGIN");
~~~

الاتنين فتحوا transaction. [[BEGIN]] من غير level يعني الافتراضي: [[READ COMMITTED]]. (الـ solCode بيكتبها صريحة: [[$__btBEGIN ISOLATION LEVEL $__{level}$__bt]]، وده template string بيحط اسم الـ level مكان [[$__{level}]].)

~~~js
const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
~~~

[[a.query(...)]] بيرجّع object النتيجة، و [[.rows]] array الصفوف، و [[[0]]] أول صف، و [[.stock]] العمود. والقوسين حوالين الـ [[await]] عشان نستنى النتيجة الأول وبعدين ناخد منها [[.rows]].

~~~text الناتج
READ COMMITTED A read 10 B read 10
~~~

الاتنين شافوا ١٠. لحد هنا مفيش مشكلة.

~~~js
await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
~~~

A كتب [[9]]. [[$1]] parameter، والقيمة في الـ array التاني ([[sa - 1]] = 9). A دلوقتي **ماسك قفل** على صف الهودي لحد ما يعمل COMMIT.

~~~js
const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1]);
~~~

B عايز يكتب [[9]] هو كمان على نفس الصف. لاحظ: **مفيش [[await]]**. لو استنينا هنا الكود هيقف للأبد، لأن B مستني A، و A مش هيعمل COMMIT غير في السطر اللي بعده. فبنسيب الطلب شغال ونحتفظ بالـ Promise بتاعه في [[pending]].

وفي اللحظة دي بصينا في [[pg_stat_activity]] (جدول فيه كل الجلسات الشغالة) من اتصال تالت:

~~~text الناتج
waiting: [
  {
    wait_event_type: 'Lock',
    wait_event: 'transactionid',
    state: 'active',
    q: 'UPDATE products SET stock = $1 WHERE nam'
  }
]
~~~

UPDATE بتاع B واقف ([[wait_event_type: 'Lock']])، ومستني transaction تانية تخلص ([[transactionid]]): اللي هي A.

~~~js
await a.query("COMMIT");
await pending;
await b.query("COMMIT");
~~~

A عمل COMMIT فالقفل اتفك، و B كمّل، وبعدين B عمل COMMIT.

---

## ٣. النتيجة في READ COMMITTED: lost update

~~~text الناتج
READ COMMITTED ok 9
~~~

B نجح ([[ok]])، والمخزون [[9]]. **قطعتين اتباعوا والمخزون نقص واحدة.** ليه؟ B كتب الرقم [[9]] اللي حسبه **في الكود** من قراية قديمة ([[sb = 10]]). القاعدة نفّذت اللي اتقال لها بالظبط: «خلّي المخزون 9». ده اسمه **lost update**: تعديل A ضاع تحت تعديل B.

---

## ٤. نفس السيناريو في REPEATABLE READ

الـ solCode بيلف على الاتنين بـ [[for (const level of [...])]]، ويرجّع المخزون ١٠ قبل كل لفة.

~~~js
const pending = b.query(...).then(() => "ok", (e) => "ERR " + e.code);
~~~

[[.then(نجاح, فشل)]] بتحوّل النتيجة لنص: [["ok"]] لو نجح، أو [["ERR "]] + كود الـ error لو فشل. كده [[await pending]] مبيرميش exception.

~~~text الناتج
REPEATABLE READ A read 10 B read 10
REPEATABLE READ ERR 40001 could not serialize access due to concurrent update 9
~~~

B اترفض بـ [[40001]] (اسمه serialization_failure)، والمخزون [[9]] بعد بيعة **واحدة** بس (A). ليه؟ في REPEATABLE READ الـ transaction شايفة الداتا زي ما كانت **أول ما بدأت** (snapshot). فلما B جه يعدّل صف اتغير بعد الـ snapshot بتاعه، Postgres بيقوله «انت بتعدّل على حاجة مش شايف آخر نسخة منها» ويرفض. والكود لازم يعمل [[ROLLBACK]] ويعيد الـ transaction كلها من الأول (retry)، والمرة الجاية هيقرا ٩ ويكتب ٨.

و [[await b.query(res === "ok" ? "COMMIT" : "ROLLBACK")]]: [[? :]] اختصار if: لو نجح COMMIT، غير كده ROLLBACK.

---

## ٥. الحل الأبسط: متقراش في الكود

جرّبنا الحل اللي في الـ sol، في READ COMMITTED العادي:

~~~sql
UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie' AND stock >= 1
~~~

~~~text الناتج
atomic: B rowCount 1 stock 8
~~~

المخزون [[8]]: صح. الفرق إن [[stock - 1]] بيتحسب **جوه القاعدة** وقت التنفيذ. B استنى قفل A، ولما اتفك، Postgres في READ COMMITTED بيعيد قراية الصف (بقى ٩) ويطرح منه. و [[stock >= 1]] بيمنع المخزون يبقى سالب لو كانت آخر قطعة. و [[rowCount]] ([[1]]) عدد الصفوف اللي اتعدّلت: لو [[0]] يبقى المخزون خلص.

---

## ٦. باقي الـ anomalies اللي في الوصف، متجرّبين

### non-repeatable read

A قرا مرتين في نفس الـ transaction، و B عدّل وعمل commit في النص:

~~~text الناتج
RC non-repeatable: 8 3
RR repeatable: 3 3
~~~

في READ COMMITTED: قرا [[8]] وبعدين [[3]]. في REPEATABLE READ: [[3]] و [[3]]، الـ snapshot ثابت.

### write skew

قاعدة: «لازم دكتور واحد مناوب على الأقل»، وفيه اتنين مناوبين. كل واحد في transaction لوحده عدّ المناوبين (لقاهم ٢) فشال نفسه:

~~~text الناتج
REPEATABLE READ A: ok | B: ok | on call now: 0
SERIALIZABLE A: ok | B: ERR 40001 could not serialize access due to read/write dependencies among transactions | on call now: 1
~~~

في REPEATABLE READ الاتنين نجحوا، لأن كل واحد عدّل صف **مختلف**، ومفيش تضارب على صف واحد. والنتيجة: صفر مناوبين. SERIALIZABLE بس اللي لاحظ إن كل واحد قرا حاجة التاني غيّرها، ورفض واحد منهم.

---

## الخلاصة

| المشكلة | READ COMMITTED (الافتراضي) | REPEATABLE READ | SERIALIZABLE |
|---|---|---|---|
| dirty read | مستحيلة في Postgres | مستحيلة | مستحيلة |
| non-repeatable read | بتحصل (8 ثم 3) | لأ | لأ |
| lost update (قراية في الكود ثم كتابة) | بتحصل (المخزون 9) | error [[40001]] | error [[40001]] |
| write skew | بتحصل | بتحصل (صفر مناوبين) | error [[40001]] |

- أي level أعلى من الافتراضي = errors [[40001]] لازم الكود يعيد عليها.
- أبسط حل للمخزون والرصيد: [[SET stock = stock - 1 WHERE stock >= 1]]، أو [[SELECT ... FOR UPDATE]] قبل القراية.
- [[BEGIN]] و [[COMMIT]] لوحدهم مش بيمنعوا التضارب.`,
          lines: [
            "افتح transaction في الاتنين.",
            "A قرا المخزون (١٠).",
            "B قرا نفس المخزون (١٠).",
            "A كتب ٩.",
            "B بيحاول يكتب ٩: بيستنى قفل A.",
            "A عمل COMMIT.",
            "B كمّل وكتب ٩ فوق ٩ (في READ COMMITTED).",
            "B عمل COMMIT: بيعتين والمخزون نقص واحد."
          ]
        },
        {
          cmd: "index trade-offs",
          title: "ليه متعملش index على كل عمود",
          desc: R`الـ index بيسرّع القراية، بس ليه تمن:

كل INSERT و UPDATE و DELETE لازم يعدّل كل index على الجدول. جدول عليه ١٠ indexes الكتابة فيه أبطأ بكتير.

مساحة على الديسك وفي الذاكرة (الـ index اللي ميدخلش الـ RAM بيبقى أبطأ).

والـ planner ممكن ميستخدموش أصلًا: لو الشرط بيرجّع جزء كبير من الجدول ([[status = 'paid']] و ٩٠٪ مدفوع)، الـ Seq Scan أسرع.

القاعدة: index للأعمدة اللي في WHERE و JOIN و ORDER BY لاستعلامات بتتشغّل كتير، والـ FKs، وبعد كده قيس بـ EXPLAIN وامسح اللي مش مستخدم.`,
          example: R`SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan, pg_relation_size(indexrelid) DESC;
CREATE INDEX orders_pending_idx ON orders (created_at) WHERE status = 'pending';
CREATE INDEX CONCURRENTLY orders_user_idx ON orders (user_id);`,
          try: R`شغّل أول استعلام على قاعدة الـ lab بعد الدروس اللي فاتت: فيه indexes عندها [[idx_scan = 0]]؟ وبعدين اعمل ١٠٠ ألف INSERT في orders مرة بالـ indexes اللي عليها ومرة بعد ما تمسح الـ indexes الزيادة، وقارن الوقت بـ [[\timing]].`,
          sol: R`هتلاقي indexes [[idx_scan]] بتاعها صفر أو قليل جدًا، غالبًا اللي عملتها للتجربة (زي [[orders_created_at_idx]] لو مبقتش بتفلتر بيه). الـ primary keys والـ unique ممكن يبقوا صفر برضه بس دول متمسحهمش: وظيفتهم منع التكرار مش السرعة.

الـ INSERT هيبقى أسرع بعد ما تمسح الـ indexes الزيادة، والفرق بيكبر مع عدد الـ indexes وحجمها. لو الجدول مكانش عليه indexes زيادة أصلًا (أوامر DROP طلّعت NOTICE إن الـ index مش موجود)، الوقتين هيبقوا قريبين، وده منطقي. ده بالظبط السبب إن الـ bulk imports الكبيرة أحيانًا بتمسح الـ indexes وتعملها تاني بعد الـ import.

في الانترفيو: «الـ index بيسرّع القراية ويبطّأ الكتابة وياخد مساحة، وبعمله على اللي بقيس إنه محتاجه».`,
          solCode: R`\timing on
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);
DROP INDEX IF EXISTS orders_created_at_idx;
DROP INDEX IF EXISTS orders_created_id_idx;
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);`,
          flag: "script",
          deep: {
            why: "«ليه منعملش index على كل حاجة؟» سؤال كلاسيكي، والإجابة بتبين إنك فاهم الـ index بيتخزن ويتحدث إزاي، مش بس إنه «بيسرّع».",
            how: R`الـ B-tree شجرة مترتبة، وكل تعديل في الجدول بيضيف entry فيها أو يعدّلها، وأحيانًا يقسم صفحة. في Postgres كمان أي UPDATE بيعمل نسخة جديدة من الصف، فبيحتاج entry جديدة في كل index (إلا لو HOT update: العمود المتعدل مش في أي index والصفحة فيها مكان).

أنواع تقلل التكلفة: partial index ([[WHERE status = 'pending']]) أصغر بكتير ومفيد لو بتسأل عن جزء صغير. covering index ([[INCLUDE (total)]]) بيخلي القراية من الـ index بس (Index Only Scan). و [[CREATE INDEX CONCURRENTLY]] على الإنتاج عشان متقفلش الكتابة.

وترتيب الأعمدة في الـ composite index بيفرق (درس composite index)، و GIN للـ jsonb والبحث، و BRIN لجداول ضخمة مترتبة بالوقت.`,
            when: "بعد ما تشوف استعلام بطيء في EXPLAIN أو pg_stat_statements، مش قبل. والـ FKs من الأول.",
            mistakes: R`index على عمود boolean لوحده. index مكرر (عندك [[(user_id, created_at)]] وعامل [[(user_id)]] كمان، الأول بيغطي التاني). CREATE INDEX من غير CONCURRENTLY على جدول كبير في الإنتاج. وتمسح unique index لأن idx_scan صفر.`
          },
          teach: R`## الفكرة: كل index ليه فاتورة، فاعرف مين بيدفع ومين مش مستخدم

المثال ٣ أوامر: استعلام بيوريك كل index **اتستخدم كام مرة** و **حجمه كام** (عشان تلاقي المرشحين للمسح)، و partial index صغير، و index بيتعمل من غير ما يقفل الكتابة. والـ solCode بيقيس تمن الـ indexes على الكتابة.

**إزاي جرّبناه:** على [[postgres:18]] في Docker، جدول [[orders]] فيه ٢٠٠ ألف صف (١٠٪ منهم pending، و [[created_at]] متوزع على ٣٦٥ يوم)، وعليه indexes زيادة عملناها للتجربة: [[orders_created_at_idx]] و [[orders_created_id_idx]] و [[orders_status_idx]].

---

## ١. مين مش مستخدم؟ [[pg_stat_user_indexes]]

~~~sql
SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan, pg_relation_size(indexrelid) DESC;
~~~

حتة حتة:

| الحتة | معناها |
|---|---|
| [[pg_stat_user_indexes]] | view فيه سطر لكل index في جداولك (user = مش جداول النظام) |
| [[relname]] | اسم الجدول (rel = relation) |
| [[indexrelname]] | اسم الـ index |
| [[idx_scan]] | عدد المرات اللي الـ index اتستخدم فيها من ساعة ما الإحصائيات اتصفرت |
| [[pg_relation_size(indexrelid)]] | حجمه بالـ byte. و [[indexrelid]] رقم الـ index الداخلي |
| [[pg_size_pretty(...)]] | يحوّل الـ bytes لـ [[kB]] و [[MB]] |
| [[ORDER BY idx_scan, ... DESC]] | الأقل استخدامًا الأول، ولو اتساووا الأكبر حجمًا الأول |

~~~text الناتج
     relname     |     indexrelname      | idx_scan |  size
-----------------+-----------------------+----------+---------
 orders          | orders_created_id_idx |        0 | 6184 kB
 orders          | orders_pkey           |        0 | 4408 kB
 orders          | orders_created_at_idx |        0 | 1480 kB
 orders          | orders_status_idx     |        0 | 1368 kB
 products        | products_pkey         |        0 | 16 kB
 users           | users_email_key       |        0 | 16 kB
 ...
 users           | users_pkey            |   200004 | 16 kB
~~~

اقراه كده:

- أول سطر هو أهم مرشح: **٦ ميجا** ومتستخدمش ولا مرة. ٦ ميجا بيتكتب فيها مع كل INSERT.
- [[orders_pkey]] و [[users_email_key]] صفر برضه، بس **متمسحهمش**: دول بيمنعوا التكرار (PRIMARY KEY و UNIQUE)، مش للسرعة بس.
- [[users_pkey]] اتستخدم ٢٠٠ ألف مرة مع إننا مسألناش users أصلًا! ده الـ FK: كل صف اتضاف في [[orders]]، Postgres دوّر في [[users_pkey]] عشان يتأكد إن اليوزر موجود.
- [[idx_scan]] تراكمي من آخر reset للإحصائيات. على قاعدة لسه قايمة أو بعد restore، الأرقام دي لسه متجمعتش، فاستنى فترة شغل حقيقي قبل ما تحكم.

### ليه [[created_id]] ٦ ميجا و [[created_at]] ١.٥ بس؟

نفس العمود تقريبًا! السبب: [[created_at]] فيه ٣٦٥ قيمة مختلفة بس، و B-tree في Postgres (من نسخة 13) بيعمل deduplication: القيمة المكررة بتتخزن مرة واحدة ومعاها قايمة الصفوف. أما [[(created_at, id)]] فكل قيمة فيه فريدة (الـ id مختلف)، فمفيش حاجة تتضغط.

---

## ٢. الـ planner مش دايمًا بيستخدم الـ index

~~~sql
EXPLAIN (COSTS OFF) SELECT * FROM orders WHERE status = 'paid';
~~~

~~~text الناتج
 Seq Scan on orders
   Filter: (status = 'paid'::text)
~~~

فيه [[orders_status_idx]]، وبرضه [[Seq Scan]] (قرا الجدول كله). لأن ٩٠٪ من الصفوف [[paid]]: القفز من الـ index لكل صف أبطأ من إنه يقرا الجدول بالترتيب. index على عمود فيه قيم قليلة متكررة غالبًا بيبقى مصاريف من غير فايدة.

---

## ٣. partial index

~~~sql
CREATE INDEX orders_pending_idx ON orders (created_at) WHERE status = 'pending';
~~~

index على [[created_at]]، بس **للصفوف اللي pending بس**. الـ [[WHERE]] في آخر CREATE INDEX هي اللي بتخليه partial. الحجم:

~~~text الناتج
 orders_created_at_idx | 1480 kB
 orders_pending_idx    | 168 kB
~~~

حوالي عُشر الحجم، لأن ١٠٪ بس pending. وكمان الصفوف الـ paid الجديدة مبتتكتبش فيه أصلًا. والاستعلام اللي بيطابقه:

~~~sql
EXPLAIN (COSTS OFF) SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at LIMIT 10;
~~~

~~~text الناتج
 Limit
   ->  Index Scan using orders_pending_idx on orders
~~~

مفيش [[Filter]] خالص: كل اللي في الـ index pending أصلًا، ومترتب بـ [[created_at]]، فبياخد أول ١٠ ويقف. (قبل ما نعمله، كان بيستخدم [[orders_created_at_idx]] ومعاه [[Filter: (status = 'pending'::text)]] بيرمي ٩ من كل ١٠ صفوف.)

والشرط لازم يتطابق: الـ planner بيستخدمه بس لو الـ WHERE في الاستعلام بيضمن [[status = 'pending']].

---

## ٤. [[CREATE INDEX CONCURRENTLY]]

~~~sql
CREATE INDEX CONCURRENTLY orders_user_idx ON orders (user_id);
~~~

[[CREATE INDEX]] العادي بيقفل الكتابة على الجدول لحد ما يخلص. على جدول فيه ملايين الصفوف ده ممكن دقايق، والـ INSERT و UPDATE في الموقع كلها واقفة. [[CONCURRENTLY]] بيبني الـ index على مراحل والكتابة شغالة (بياخد وقت أطول، بس محدش بيستنى).

قيد مهم:

~~~text جوه BEGIN
ERROR:  CREATE INDEX CONCURRENTLY cannot run inside a transaction block
~~~

مينفعش جوه transaction. وده بيفرق مع أدوات الـ migrations اللي بتلف كل migration في transaction: لازم تقفل ده للـ migration دي بالذات. ولو فشل في النص بيسيب index بحالة [[INVALID]] لازم تمسحه وتعيد.

---

## ٥. تمن الكتابة: الـ solCode

~~~sql
\timing on
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);
~~~

- [[\timing on]]: أمر psql بيطبع وقت كل أمر.
- [[INSERT ... SELECT]]: دخّل الصفوف اللي الـ SELECT بيرجّعها.
- [[generate_series(1, 100000)]]: دالة بترجّع ١٠٠ ألف صف (الأرقام من 1 لـ 100000). مش بنستخدم الرقم نفسه، بس محتاجين العدد.
- [[(SELECT id FROM users LIMIT 1)]]: أي يوزر موجود، عشان الـ FK.

بعدها مسحنا الـ indexes الزيادة بـ [[DROP INDEX IF EXISTS]] ([[IF EXISTS]]: لو مش موجود اطبع NOTICE بس ومتوقفش) وكررنا نفس الـ INSERT. النتيجتين:

~~~text الناتج
INSERT 0 100000
Time: 1024.784 ms (00:01.025)
...
INSERT 0 100000
Time: 713.999 ms
~~~

| | الـ indexes على orders | وقت ١٠٠ ألف INSERT |
|---|---|---|
| قبل | ٦ (pkey و user_id و created_at و created_id و status و pending) | 1025 ms |
| بعد | ٢ (pkey و user_id) | 714 ms |

حوالي ٣٠٪ أسرع. كل صف كان بيتكتب في ٥ أشجار (الـ partial مش بيتكتب فيه لأن الصفوف الجديدة paid)، بقى بيتكتب في ٢. والأرقام هتختلف عندك، بس الاتجاه هو هو، وبيكبر مع عدد الـ indexes وحجمها.

---

## الخلاصة

| الفاتورة | التوضيح |
|---|---|
| كتابة أبطأ | كل INSERT و UPDATE و DELETE بيعدّل كل index |
| مساحة | على الديسك وفي الـ RAM (الـ cache) |
| ممكن ميتستخدمش | الـ planner بيختار Seq Scan لو الشرط بيرجّع جزء كبير |

- [[pg_stat_user_indexes]] مترتب بـ [[idx_scan]] = مرشحين للمسح، ما عدا PRIMARY KEY و UNIQUE.
- partial index ([[WHERE ...]]) للجزء الصغير اللي بتسأل عليه.
- [[CONCURRENTLY]] على الإنتاج، وبره أي transaction.
- في الانترفيو: «بيسرّع القراية، ويبطّأ الكتابة، وياخد مساحة، وبعمله لما EXPLAIN يقول إني محتاجه».`,
          lines: [
            "كل index: اسم الجدول والـ index، واتستخدم كام مرة، وحجمه،",
            "من إحصائيات Postgres،",
            "الأقل استخدامًا والأكبر الأول (مرشحين للمسح).",
            "partial index: على الأوردرات الـ pending بس، فصغير.",
            "على الإنتاج: اعمله من غير ما تقفل الكتابة."
          ]
        },
        {
          cmd: "replication و sharding",
          title: "القاعدة مبقتش مستحملة: read replicas ولا sharding",
          desc: R`replication: نسخ من القاعدة كلها على سيرفرات تانية. الـ primary بيستقبل الكتابة، والـ replicas بتاخد التغييرات منه (streaming من الـ WAL) وبتخدم القراية. بيحل: قراية كتير، و high availability (لو الـ primary وقع، replica تبقى primary).

sharding: تقسيم الداتا نفسها على كذا سيرفر، كل واحد عنده جزء (مثلًا حسب tenant_id). بيحل: كتابة أكتر من اللي سيرفر واحد يستحمله، أو داتا أكبر من سيرفر. وتمنه كبير: JOIN و transactions بين shards صعبة، وتغيير الـ shard key شبه مستحيل.

الترتيب الطبيعي: indexes واستعلامات أحسن، وبعدين سيرفر أكبر، وبعدين connection pooling و cache، وبعدين read replicas، و sharding في الآخر خالص.`,
          example: R`SELECT client_addr, state, sync_state, replay_lag FROM pg_stat_replication;
SELECT pg_is_in_recovery();
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;`,
          try: R`يوزر عمل تعديل على بروفايله، وبعدين الصفحة اتعملها refresh وظهر الاسم القديم. التطبيق بيكتب على الـ primary ويقرا من replica. اشرح ليه، واقترح حلين.`,
          sol: R`ده replication lag: الـ replica بتستلم التغييرات asynchronous، فممكن تكون ورا الـ primary بملّي ثواني أو ثواني. القراية اللي جات بعد الكتابة على طول راحت replica لسه موصلهاش التعديل.

الحلول: (١) read-your-writes: القراية اللي بعد كتابة من نفس اليوزر (لفترة قصيرة، أو لنفس الـ session) تروح للـ primary. (٢) القراية المهمة (البروفايل، والرصيد، وحالة الدفع) دايمًا من الـ primary، والـ replicas للتقارير والقوايم والبحث. (٣) synchronous replication بتحل ده بس بتبطّأ كل كتابة.

وقول في الانترفيو إن [[pg_stat_replication]] على الـ primary و [[pg_last_xact_replay_timestamp()]] على الـ replica بيقيسوا الـ lag.`,
          solCode: R`-- على الـ replica: هي ورا بقد إيه؟
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;

// في الكود: القراية بعد كتابة من الـ primary
const user = await primary.user.update({ where: { id }, data: { name } });
const profile = await primary.user.findUnique({ where: { id } });
const feed = await replica.post.findMany({ take: 20 });`,
          flag: "script",
          deep: {
            why: "أي سؤال system design بيوصل لـ «والقاعدة لما الترافيك يزيد؟». والإجابة الناضجة إنك متقفزش لـ sharding، وتعرف مشاكل كل حل (lag، و cross-shard queries).",
            how: R`الـ streaming replication في Postgres: الـ replica بتقرا الـ WAL من الـ primary وتطبّقه، فهي نسخة طبق الأصل وللقراية بس. الـ logical replication بتنقل تغييرات جداول معينة (مفيد للنقل بين نسخ أو لأنظمة تانية). Supabase و RDS و Neon بيدّوك read replicas بزرار.

الـ sharding في Postgres مش built-in: Citus extension، أو تقسيم في التطبيق (كل tenant في قاعدة). والـ partitioning (جدول واحد مقسوم بالتاريخ جوه نفس السيرفر) حاجة تانية خالص، بتسهّل مسح الداتا القديمة وبتسرّع استعلامات الفترات.`,
            when: "replicas لما القراية هي الضغط والـ primary CPU عالي. sharding لما الكتابة أو الحجم فعلًا أكبر من أكبر سيرفر معقول، وده نادر في أغلب الشركات.",
            mistakes: R`sharding من أول يوم. قراية من replica بعد الكتابة على طول. تفتكر إن الـ replica باك أب (مسح بالغلط بيتنسخ للـ replica في ثانية؛ الباك أب في تاب «PostgreSQL»). و shard key بيعمل hot spot (كل الترافيك على shard واحد).`
          },
          teach: R`## الفكرة: نسخة للقراية، وقد إيه هي متأخرة

المثال ٣ استعلامات بتراقب الـ replication: واحد على الـ primary بيوريك الـ replicas المتصلة، وواحد بيقول السيرفر ده primary ولا replica، وواحد على الـ replica بيقيس هي ورا بقد إيه. والـ sol بيشرح أشهر مشكلة: «عدّلت اسمي وبعد الـ refresh رجع القديم».

**إزاي جرّبناه:** عملنا replication حقيقي في Docker: container [[postgres:18]] كـ primary، وتاني اتعمل منه نسخة بـ [[pg_basebackup -R]] وبقى replica بيعمل streaming، على network خاصة بيهم. وبعد التجربة مسحناهم.

---

## ١. على الـ primary: [[pg_stat_replication]]

~~~sql
SELECT client_addr, state, sync_state, replay_lag FROM pg_stat_replication;
~~~

[[pg_stat_replication]] فيه سطر لكل replica متصلة بالـ primary ده دلوقتي.

~~~text الناتج على الـ primary
 client_addr |   state   | sync_state |   replay_lag
-------------+-----------+------------+-----------------
 172.18.0.3  | streaming | async      | 00:00:00.009025
~~~

| العمود | القيمة | معناها |
|---|---|---|
| [[client_addr]] | [[172.18.0.3]] | عنوان الـ replica (هنا IP جوه شبكة Docker) |
| [[state]] | [[streaming]] | بتاخد الـ WAL أول بأول. لو [[catchup]] يبقى لسه بتلحق |
| [[sync_state]] | [[async]] | الـ primary مش بيستنى الـ replica قبل ما يرد COMMIT. ([[sync]] = بيستنى) |
| [[replay_lag]] | [[00:00:00.009]] | آخر قياس: التغيير أخد ٩ ملّي ثانية لحد ما اتطبّق على الـ replica |

ولو الاستعلام رجّع [[(0 rows)]]: يا إما مفيش replicas، يا إما انت على الـ replica نفسها (جربناه عليها ورجّع صفر صفوف)، يا إما الـ replica مقطوعة.

---

## ٢. أنا مين؟ [[pg_is_in_recovery()]]

~~~sql
SELECT pg_is_in_recovery();
~~~

~~~text على الـ primary
 pg_is_in_recovery
-------------------
 f
~~~

~~~text على الـ replica
 pg_is_in_recovery
-------------------
 t
~~~

[[t]] = true. الاسم غريب: الـ replica تقنيًا في وضع «recovery» دايم، بتطبّق WAL جاي من برّه بالظبط زي سيرفر بيقوم بعد crash. عشان كده هي للقراية بس:

~~~text INSERT على الـ replica
ERROR:  cannot execute INSERT in a read-only transaction
~~~

---

## ٣. على الـ replica: قد إيه ورا؟

~~~sql
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;
~~~

- [[pg_last_xact_replay_timestamp()]]: وقت الـ COMMIT (على الـ primary) لآخر transaction الـ replica طبّقتها.
- [[now() - ...]]: طرح وقتين بيدّي مدة ([[interval]]).
- [[AS replica_lag]]: اسم العمود في الناتج.

~~~text الناتج
   replica_lag
-----------------
 00:00:01.662905
~~~

### خلي بالك: الرقم ده بيكدب لو مفيش كتابة

الـ replica هنا كانت **ملاحقة تمامًا**، والرقم ١.٦ ثانية. ليه؟ لأنه بيقيس «من إمتى آخر transaction اتطبقت»، ومفيش transactions جديدة على الـ primary من ساعتها. فلو الـ primary هادي ساعة، الرقم هيبقى ساعة والـ replica سليمة. فاقراه مع [[pg_stat_replication]] على الـ primary، أو قارن الـ LSN بتاع الاتنين.

وعلى الـ primary، الاستعلام ده بيرجّع فاضي (NULL)، لأنه مش بيطبّق WAL من حد.

---

## ٤. المشكلة اللي في الـ try: replication lag بعينك

عشان نشوف التأخير، وقفنا التطبيق على الـ replica مؤقتًا ([[pg_wal_replay_pause()]]، دالة للتجربة)، وعدّلنا الاسم على الـ primary:

~~~sql
UPDATE profiles SET name='Sara Ali' WHERE id=1;
~~~

وقرينا من الاتنين بعدها بثانيتين:

~~~text على الـ primary
   name
----------
 Sara Ali
~~~

~~~text على الـ replica
 name
------
 Sara
~~~

~~~text replica_lag على الـ replica
 00:00:05.717367
~~~

ده بالظبط سيناريو الـ try: اليوزر حفظ [[Sara Ali]] (على الـ primary)، والصفحة اتعملها refresh واتقرت من الـ replica فرجّعت [[Sara]]. في الحقيقة التأخير غالبًا ملّي ثواني، بس تحت ضغط كتابة أو مع replica بعيدة ممكن يوصل ثواني. وبعد [[pg_wal_replay_resume()]] الـ replica طلّعت [[Sara Ali]] في أقل من ثانية.

---

## ٥. الحل في الكود (الـ solCode)

~~~js
const user = await primary.user.update({ where: { id }, data: { name } });
const profile = await primary.user.findUnique({ where: { id } });
const feed = await replica.post.findMany({ take: 20 });
~~~

[[primary]] و [[replica]] هنا اتنين Prisma clients، كل واحد برابط سيرفر:

| السطر | راح فين | ليه |
|---|---|---|
| [[update]] | primary | الكتابة دايمًا على الـ primary، الـ replica مبتقبلش |
| [[findUnique]] للبروفايل | primary | قراية بعد كتابة لنفس اليوزر (read-your-writes) |
| [[findMany]] للـ feed | replica | قايمة عامة، لو متأخرة ثانية محدش هيلاحظ |

---

## الخلاصة

| الاستعلام | يتشغل على | بيقول |
|---|---|---|
| [[pg_stat_replication]] | الـ primary | مين متصل، و async ولا sync، و [[replay_lag]] |
| [[pg_is_in_recovery()]] | أي سيرفر | [[t]] = replica (قراية بس) |
| [[now() - pg_last_xact_replay_timestamp()]] | الـ replica | من إمتى آخر تعديل اتطبق (بيكبر لو مفيش كتابة) |

- replica = نفس الداتا كاملة للقراية، بتتأخر شوية (async). مش باك أب: المسح بالغلط بيتنسخ ليها.
- sharding = الداتا نفسها متقسمة على سيرفرات، للكتابة أو الحجم اللي سيرفر واحد ميستحملوش، وبعد ما تجرب كل حاجة قبله.
- القراية اللي لازم تبقى حديثة (بعد كتابة، رصيد، دفع) من الـ primary.`,
          lines: [
            "على الـ primary: الـ replicas المتصلة وحالتها والتأخير.",
            "true يعني السيرفر ده replica.",
            "على الـ replica: آخر تعديل اتطبق من قد إيه."
          ]
        },
        {
          cmd: "الاستعلام بطيء",
          title: "الصفحة بطيئة وبيقولوا «القاعدة»: هتعمل إيه خطوة بخطوة",
          desc: R`الإجابة المرتبة أهم من أي أداة:

١. اتأكد إنها القاعدة: الـ query log أو APM بيوريك وقت كل استعلام. ممكن المشكلة N+1 (استعلامات سريعة كتير) مش استعلام بطيء.

٢. لاقي الاستعلام: [[pg_stat_statements]] مترتب بـ [[total_exec_time]] (الأكتر تكلفة إجمالًا، مش الأبطأ مرة واحدة).

٣. [[EXPLAIN (ANALYZE, BUFFERS)]]: دوّر على Seq Scan على جدول كبير، و [[Rows Removed by Filter]] كبير، و Sort على داتا كتير، وفرق كبير بين rows المتوقع والحقيقي.

٤. صلّح: index مناسب، أو اكتب الاستعلام تاني (keyset بدل OFFSET، و EXISTS، وأعمدة أقل)، أو [[ANALYZE]] لو الإحصائيات قديمة.

٥. قيس تاني، وراقب.`,
          example: R`SELECT query, calls, round(total_exec_time) AS total_ms, round(mean_exec_time::numeric, 1) AS mean_ms
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;
CREATE INDEX IF NOT EXISTS orders_user_created_idx ON orders (user_id, created_at DESC);`,
          try: R`على جدول orders بعد ما تضيف ٢٠٠ ألف صف (درس B-tree index) امسح أي index على user_id (عندك [[orders_user_created_idx]] من درس composite index)، وشغّل الـ EXPLAIN اللي في المثال واكتب أهم ٣ سطور فيه. وبعدين اعمل الـ index وشغّله تاني وقارن Execution Time والـ Buffers.`,
          sol: R`قبل الـ index هتلاقي [[Seq Scan on orders]] (أو Parallel Seq Scan) ومعاها [[Filter: (user_id = (InitPlan 1).col1)]] (في Postgres 16 وأقدم بتتكتب [[$0]])، وفوقها [[Sort]] بـ [[Sort Key: orders.created_at DESC]]: قرا الجدول كله ورتّب عشان ٢٠ صف. و Buffers بالآلاف (عندي حوالي ١٩٠٠ صفحة لـ ٢٠٠ ألف صف)، و Execution Time عشرات الملّي ثواني حسب الجهاز وحسب عدد أوردرات اليوزر ده.

بعد الـ index: [[Index Scan using orders_user_created_idx on orders]] و [[Index Cond: (user_id = (InitPlan 1).col1)]] ومفيش Sort (الـ index مترتب)، و Buffers بقت أرقام صغيرة (٧ تقريبًا)، والوقت أقل من ملّي ثانية. عندي كان ٢٩ ملّي ثانية قبل و ٠٫٠٦ بعد.

في الانترفيو اشرح الـ Buffers: عدد الصفحات (8KB) اللي اتقرت، ودي أثبت من الوقت اللي بيتأثر بالـ cache. ولو [[pg_stat_statements]] مش متفعّل: محتاج [[shared_preload_libraries]] و [[CREATE EXTENSION pg_stat_statements]] (درس الاستعلامات البطيئة في تاب «PostgreSQL»).`,
          solCode: R`DROP INDEX IF EXISTS orders_user_created_idx;
DROP INDEX IF EXISTS orders_user_id_idx;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;

CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC);
ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;`,
          flag: "script",
          deep: {
            why: "«إزاي تتعامل مع استعلام بطيء؟» سؤال شبه أكيد، والانترفيور عايز يشوف طريقة تفكير: قياس الأول، وبعدين سبب، وبعدين تصليح، وبعدين قياس تاني. مش «هعمل index» على طول.",
            how: R`الـ EXPLAIN بيتقري من جوه لبرّه: أعمق node بتشتغل الأول. [[actual time]] بالملّي ثانية لكل loop، و [[loops]] عدد المرات (في Nested Loop اضرب). لو [[rows]] المتوقع بعيد جدًا عن الحقيقي، الإحصائيات قديمة أو الشرط معقد، و ANALYZE بيساعد.

أسباب شائعة غير الـ index: دالة على العمود في WHERE ([[lower(email)]]، أو date_trunc)، ونوع مختلف ([[WHERE id = '5']] على bigint ده تمام بس uuid مقارن بـ text لأ)، و OFFSET كبير، و [[SELECT *]] بيجيب jsonb تقيل، و [[LIKE '%x%']] من غير trigram، وأقفال (استعلام مستني lock مش بطيء، شوف [[pg_stat_activity]] و [[wait_event]]).

وبرّه الاستعلام: connection pool مليان (الطلبات مستنية اتصال)، و N+1، والـ network لسيرفر بعيد.`,
            when: "أي شكوى بطء، وكمان بشكل دوري: بص على أعلى ١٠ في pg_stat_statements كل فترة قبل ما حد يشتكي.",
            mistakes: R`تعمل index من غير EXPLAIN. تقيس مرة واحدة (أول مرة الـ cache بارد). EXPLAIN ANALYZE على UPDATE أو DELETE على الإنتاج: ده بينفّذ فعلًا (لفه في BEGIN و ROLLBACK). تبص على أبطأ استعلام مرة واحدة وتسيب استعلام ٥ ملّي ثانية بيتنادي مليون مرة. وتنسى إن الإجابة ممكن تكون cache أو تغيير في الـ API مش في SQL.`
          },
          teach: R`## الفكرة: لاقي، افهم، صلّح، قيس

المثال هو الخطوات ٢ و ٣ و ٤ من الوصف بالترتيب: استعلام بيوريك **أنهي استعلام** واكل وقت القاعدة، وبعدين [[EXPLAIN]] بيوريك **ليه** هو بطيء، وبعدين index بيصلّحه. وبعد الـ index بنقيس تاني.

**إزاي جرّبناه:** [[postgres:18]] في Docker متشغّل بـ [[-c shared_preload_libraries=pg_stat_statements]]، وجدول [[orders]] فيه ٢٠٠ ألف أوردر لـ ٢٠٠٠ يوزر، و ١٠٠ أوردر لـ [[you@example.com]]. وشغّلنا «ترافيك»: استعلام آخر ٢٠ أوردر ٣٠ مرة ليوزرز مختلفين، و count على users ٣٠ مرة، و GROUP BY مرة.

---

## ١. لاقي الاستعلام: [[pg_stat_statements]]

~~~sql
SELECT query, calls, round(total_exec_time) AS total_ms, round(mean_exec_time::numeric, 1) AS mean_ms
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
~~~

[[pg_stat_statements]] extension بيسجّل كل استعلام اتنفّذ: كام مرة ووقته كام. محتاج يتحمّل مع السيرفر ([[shared_preload_libraries]] في الإعدادات وبعدين restart)، وبعدين [[CREATE EXTENSION pg_stat_statements]] مرة في القاعدة.

| الحتة | معناها |
|---|---|
| [[query]] | نص الاستعلام، والقيم متبدّلة بـ [[$1]] و [[$2]]، فكل الاستعلامات اللي شكلها واحد بتتجمع في سطر |
| [[calls]] | اتنادى كام مرة |
| [[total_exec_time]] | الوقت كله بالملّي ثانية (كل المرات مع بعض) |
| [[mean_exec_time]] | المتوسط للمرة الواحدة |
| [[round(x)]] | قرّب لأقرب رقم صحيح |
| [[round(x::numeric, 1)]] | قرّب لرقم واحد بعد العلامة |

### ليه [[::numeric]]؟

العمود ده نوعه [[double precision]]، و Postgres معندوش [[round]] بتاخد double وعدد أرقام. من غير التحويل:

~~~text الناتج
ERROR:  function round(double precision, integer) does not exist
HINT:  No function matches the given name and argument types. You might need to add explicit type casts.
~~~

[[::numeric]] بيحوّله [[numeric]]، ودي ليها [[round(numeric, int)]]. ([[round(x)]] من غير رقم تاني شغالة على double عادي، عشان كده [[total_ms]] معملتش مشكلة.)

### الناتج

~~~text الناتج
                            query                                                          | calls | total_ms | mean_ms
-------------------------------------------------------------------------------------------+-------+----------+---------
 SELECT id, total FROM orders WHERE user_id = (SELECT id FROM users WHERE email = $1) ...   |    30 |      359 |    12.0
 SELECT status, count(*) FROM orders GROUP BY status                                       |     1 |       19 |    18.6
 SELECT count(*) FROM users WHERE email = $1                                               |    30 |        1 |     0.0
~~~

(قصّرنا أول استعلام.) بص على أول سطرين:

- استعلام الأوردرات متوسطه **١٢ ملّي ثانية** بس، بس اتنادى ٣٠ مرة، فأكل **٣٥٩** إجمالًا.
- الـ GROUP BY أبطأ في المرة الواحدة (**١٨.٦**)، بس اتنادى مرة واحدة، فـ **١٩** بس.

عشان كده بنرتّب بـ [[total_exec_time]] مش [[mean_exec_time]]: الاستعلام اللي «مش بطيء أوي» بس بيتنادي مع كل فتحة صفحة هو اللي واكل القاعدة. ولو رتبت بالمتوسط، كنت هتصلّح الـ GROUP BY وتسيب المشكلة الحقيقية.

---

## ٢. افهم: [[EXPLAIN (ANALYZE, BUFFERS)]]

~~~sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;
~~~

- [[EXPLAIN]] لوحده: الخطة اللي Postgres **ناوي** يعملها، بأرقام متوقعة.
- [[ANALYZE]]: نفّذ فعلًا، وحط الأرقام الحقيقية جنب المتوقعة. (يعني على UPDATE أو DELETE هيعدّل بجد.)
- [[BUFFERS]]: كام صفحة (8KB) اتقرت.

الناتج من غير index على [[user_id]] (قصّرناه على المهم):

~~~text الناتج
 Limit  (actual time=9.519..12.769 rows=20.00 loops=1)
   Buffers: shared hit=1679
   InitPlan 1
     ->  Index Scan using users_email_key on users  (actual time=0.056..0.057 rows=1.00 loops=1)
           Index Cond: (email = 'you@example.com'::text)
   ->  Gather Merge  (actual time=9.518..12.763 rows=20.00 loops=1)
         Workers Launched: 1
         ->  Sort  (actual time=5.209..5.211 rows=20.00 loops=2)
               Sort Key: orders.created_at DESC
               ->  Parallel Seq Scan on orders  (actual time=5.143..5.147 rows=50.00 loops=2)
                     Filter: (user_id = (InitPlan 1).col1)
                     Rows Removed by Filter: 100000
                     Buffers: shared hit=1668
 Execution Time: 12.825 ms
~~~

بيتقري **من جوه لبرّه**: السطر الأكتر إزاحة لليمين بيتنفّذ الأول.

1. **[[InitPlan 1]]**: الـ subquery بتاع الإيميل. [[Index Scan using users_email_key]]: لقى اليوزر من الـ index بتاع الـ UNIQUE في 0.06 ملّي ثانية. ده تمام. ونتيجته اسمها [[(InitPlan 1).col1]] (في Postgres 16 وأقدم كانت بتتكتب [[$0]]).
2. **[[Parallel Seq Scan on orders]]**: قرا الجدول **كله**. و [[Parallel]] يعني اتقسم على أكتر من process: [[Workers Launched: 1]] + الأساسي = اتنين، عشان كده [[loops=2]].
3. **[[Rows Removed by Filter: 100000]]**: ده لكل loop، فالإجمالي ٢٠٠ ألف صف اتقروا واترموا، عشان يلاقي ١٠٠ ([[rows=50.00]] × 2).
4. **[[Buffers: shared hit=1668]]**: ١٦٦٨ صفحة = الجدول كله ([[pg_relation_size('orders') / 8192]] طلّع [[1668]]). و [[hit]] يعني لقاها في الذاكرة (shared buffers)؛ لو [[read]] يبقى جابها من الديسك أو الـ OS cache.
5. **[[Sort]]** بـ [[Sort Key: orders.created_at DESC]]: رتّب الـ ١٠٠ عشان ياخد أحدث ٢٠.
6. **[[Gather Merge]]**: جمّع نتايج الـ workers وهي مترتبة. و **[[Limit]]**: أول ٢٠.

يعني: عشان ٢٠ صف، قرا ٢٠٠ ألف صف و ١٦٧٩ صفحة. ده التشخيص.

---

## ٣. صلّح: index على اللي بتفلتر بيه وبترتّب بيه

~~~sql
CREATE INDEX IF NOT EXISTS orders_user_created_idx ON orders (user_id, created_at DESC);
~~~

composite index: مترتب بـ [[user_id]] الأول، وجوه كل يوزر بـ [[created_at]] من الأحدث. يعني أوردرات اليوزر جنب بعض وجاهزين بالترتيب اللي الاستعلام عايزه. و [[IF NOT EXISTS]]: لو موجود متعملش error.

---

## ٤. قيس تاني

~~~text الناتج بعد الـ index
 Limit  (actual time=0.020..0.025 rows=20.00 loops=1)
   Buffers: shared hit=7
   InitPlan 1
     ->  Index Scan using users_email_key on users  (actual time=0.011..0.011 rows=1.00 loops=1)
   ->  Index Scan using orders_user_created_idx on orders  (actual time=0.020..0.022 rows=20.00 loops=1)
         Index Cond: (user_id = (InitPlan 1).col1)
         Buffers: shared hit=7
 Execution Time: 0.038 ms
~~~

| | قبل | بعد |
|---|---|---|
| طريقة القراية | [[Parallel Seq Scan]] + [[Filter]] | [[Index Scan using orders_user_created_idx]] + [[Index Cond]] |
| صفوف اترمت | ٢٠٠ ألف | صفر |
| [[Sort]] | موجود | مش موجود: الـ index مترتب أصلًا |
| [[Buffers]] | 1679 | 7 |
| [[Execution Time]] | 12.8 ms | 0.038 ms |

و [[rows=20.00]] في الـ Index Scan: قرا ٢٠ بس ووقف، لأن [[Limit]] اكتفى. أول تشغيل بعد الـ index كان [[shared hit=4 read=3]] و [[0.085 ms]]: ٣ صفحات من الـ index الجديد لسه مكانتش في الذاكرة. عشان كده بنقيس أكتر من مرة، وبنبص على الـ Buffers أكتر من الوقت: الوقت بيتأثر بالـ cache، وعدد الصفحات ثابت.

---

## الخلاصة

| الخطوة | الأداة | بتدوّر على إيه |
|---|---|---|
| لاقي | [[pg_stat_statements]] بـ [[ORDER BY total_exec_time DESC]] | الأكتر تكلفة **إجمالًا** |
| افهم | [[EXPLAIN (ANALYZE, BUFFERS)]] | Seq Scan على جدول كبير، [[Rows Removed by Filter]] كبير، Sort، Buffers بالآلاف |
| صلّح | index على الفلتر والترتيب (أو [[ANALYZE]] أو كتابة الاستعلام تاني) | |
| قيس | نفس الـ EXPLAIN كذا مرة | Buffers نزلت؟ الـ Sort اختفى؟ |

- [[round(double, int)]] مش موجودة: [[round(x::numeric, 1)]].
- [[EXPLAIN ANALYZE]] بينفّذ فعلًا، فعلى UPDATE و DELETE لفه في [[BEGIN]]/[[ROLLBACK]].`,
          lines: [
            "كل استعلام: نصه، واتنادى كام مرة، والوقت الإجمالي والمتوسط،",
            "من الإحصائيات (extension pg_stat_statements)،",
            "الأكتر تكلفة إجمالًا الأول،",
            "أول ١٠.",
            "اشرح الاستعلام ونفّذه فعلًا، ومعاه الصفحات اللي اتقرت:",
            "آخر ٢٠ أوردر،",
            "ليوزر معين،",
            "بالأحدث.",
            "الـ index اللي بيخدمه (الفلتر والترتيب)."
          ]
        }
      ]
    }
]);
