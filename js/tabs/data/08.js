// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "التصميم: constraints و normalization",
      l: 2,
      n: "تصميم الجداول بيحدد الداتا هتفضل سليمة بعد سنة ولا لأ: كل معلومة في مكان واحد، والقاعدة ترفض الغلط بنفسها",
      items: [
        {
          cmd: "constraints",
          title: "خلّي القاعدة ترفض الداتا الغلط بنفسها",
          desc: R`الـ constraints قواعد جوه القاعدة نفسها: [[NOT NULL]] (لازم قيمة)، و [[UNIQUE]] (مفيش تكرار)، و [[CHECK]] (شرط زي [[price >= 0]])، و [[FOREIGN KEY]]. أي INSERT أو UPDATE بيكسرها بيترفض، مهما كان جاي منين.

الـ validation في الكود (Zod مثلًا) بيدّي اليوزر رسالة حلوة، بس الـ constraint هو الضمان: سكربت، أو أدمن بإيده، أو bug، أو طلبين في نفس اللحظة، كلهم هيتمسكوا.`,
          example: R`ALTER TABLE products ADD CONSTRAINT price_positive CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT stock_not_negative CHECK (stock >= 0);
ALTER TABLE orders ADD CONSTRAINT status_valid
  CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled', 'refunded'));
CREATE UNIQUE INDEX users_email_lower_uq ON users (lower(email));
UPDATE products SET stock = stock - 100 WHERE name = 'Hoodie';   -- error: violates check constraint`,
          try: R`ضيف يوزر إيميله [[YOU@example.com]] بحروف كبيرة: الـ index على [[lower(email)]] هيرفضه لأنه نفس الإيميل. وبعدين جرّب [[status = 'shiped']] بالغلط.`,
          flag: "script",
          deep: {
            why: "الكود بيتغير، وبيتكتب منه أكتر من نسخة (API، ولوحة أدمن، وسكربت migration، و cron). لو القاعدة الوحيدة في الكود، أول مسار ينساها بيدخّل داتا غلط، وبعد كده كل الكود لازم يتعامل مع الداتا الغلط دي للأبد.",
            how: R`[[UNIQUE]] بيعمل unique index. ولو على تعبير زي [[lower(email)]]، بيمنع [[Ali@x.com]] و [[ali@x.com]] يبقوا يوزرين.

الـ partial unique index بيطبّق التفرد على جزء من الصفوف بس: [[CREATE UNIQUE INDEX ... ON products (sku) WHERE deleted_at IS NULL]] يعني الـ sku فريد بين المنتجات اللي مش ممسوحة، فالممسوح ميمنعش إعادة استخدامه.

UNIQUE بيسمح بكذا NULL، إلا لو كتبت [[NULLS NOT DISTINCT]] (من Postgres 15).

[[CHECK]] بيشوف الصف نفسه بس؛ ميقدرش يبص على صفوف تانية أو جداول تانية (ده شغل FK أو trigger).

والقيم المحددة (زي الحالة) ليها ٣ حلول: CHECK IN (الأسهل في التعديل)، أو enum type في Postgres، أو جدول lookup بـ FK.

وإضافة constraint على جدول كبير موجود بتقرا الجدول كله وهي قافلاه. على الإنتاج: [[NOT VALID]] وبعدين [[VALIDATE CONSTRAINT]]، والتفاصيل في تاب PostgreSQL درس «تغييرات آمنة في الإنتاج».`,
            when: "مع أي قاعدة business ثابتة: السعر مش سالب، والمخزون مش سالب، والحالة من لستة معروفة، والإيميل مايتكررش.",
            mistakes: R`الاعتماد على الـ frontend أو Zod بس. UNIQUE على الإيميل حساس للحروف. ومسك الـ error ورجّعه 500 بدل 409: Postgres بيرجّع code [[23505]] للـ unique، و Prisma بيحوّله [[P2002]]. وفي مشروع حقيقي كان فيه مسار بيخصم المخزون من غير ما يشيك إنه يكفي، فالمخزون ممكن يبقى بالسالب؛ [[CHECK (stock >= 0)]] كان هيحوّل الغلط الصامت ده لـ error واضح.`
          },
          teach: R`## الفكرة: قواعد الـ business جوه الجدول نفسه

المثال بيضيف ٤ قواعد على جداول موجودة: السعر والمخزون مش بالسالب، والحالة من لستة معروفة، والإيميل مايتكررش حتى لو الحروف كبيرة. وبعدين بيحاول يكسر واحدة منهم. أي INSERT أو UPDATE بيكسر قاعدة بيترفض، سواء جه من الـ API أو سكربت أو أدمن في psql.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. [[CHECK]] على السعر والمخزون

~~~text الأمر
ALTER TABLE products ADD CONSTRAINT price_positive CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT stock_not_negative CHECK (stock >= 0);
~~~

| الحتة | معناها |
|---|---|
| [[ALTER TABLE products]] | عدّل جدول موجود |
| [[ADD CONSTRAINT price_positive]] | ضيف قاعدة، واسمها [[price_positive]] |
| [[CHECK (price >= 0)]] | كل صف لازم يحقق الشرط ده |

الاسم هيظهر في الـ error، فاختار اسم يقول القاعدة بتمنع إيه. (اسم [[price_positive]] مش دقيق قوي: الشرط بيسمح بالصفر، يعني «مش سالب».)

~~~text الناتج
ALTER TABLE
ALTER TABLE
~~~

وهو بيضيف القاعدة، Postgres راجع **كل الصفوف الموجودة**. لو كان فيه منتج سعره بالسالب، الـ ALTER كان هيفشل. و [[\d products]] بيوريك القواعد:

~~~text \d products (آخره)
Check constraints:
    "price_positive" CHECK (price >= 0::numeric)
    "stock_not_negative" CHECK (stock >= 0)
~~~

[[0::numeric]]: Postgres حوّل الصفر لنفس نوع العمود ([[::]] = cast).

---

## ٢. الحالة من لستة معروفة

~~~text الأمر
ALTER TABLE orders ADD CONSTRAINT status_valid
  CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled', 'refunded'));
~~~

[[status IN (...)]]: الحالة لازم تبقى واحدة من الخمسة دول بالظبط (والحروف small، لأن المقارنة حساسة للحروف).

~~~text الناتج
ALTER TABLE
~~~

---

## ٣. الإيميل فريد من غير ما يفرق حروف

~~~text الأمر
CREATE UNIQUE INDEX users_email_lower_uq ON users (lower(email));
~~~

- [[CREATE UNIQUE INDEX]]: index مش بيسمح بقيمتين زي بعض.
- [[ON users (lower(email))]]: القيمة اللي بتتقارن مش [[email]] نفسه، دي **نتيجة** [[lower(email)]]. اسمه expression index.
- [[uq]] في الاسم اختصار unique.

يعني [[YOU@example.com]] و [[you@example.com]] نفس القيمة في الـ index ده. شوف الفرق في [[\d users]]:

~~~text \d users (الـ indexes)
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
    "users_email_lower_uq" UNIQUE, btree (lower(email))
~~~

[[users_email_key]] (من درس CREATE TABLE) بيقارن النص حرفيًا، فكان هيقبل الإيميل بحروف كبيرة. الجديد بيقارن بعد [[lower]].

---

## ٤. محاولة كسر القاعدة

~~~text الأمر
UPDATE products SET stock = stock - 100 WHERE name = 'Hoodie';
~~~

~~~text الناتج
ERROR:  new row for relation "products" violates check constraint "stock_not_negative"
DETAIL:  Failing row contains (10, Hoodie, 650.00, -92, t, {}, 2026-10-07 08:33:13.949856+00, null).
~~~

- [[new row]]: الصف زي ما كان هيبقى **بعد** التعديل. الـ CHECK بيتفحص على النتيجة.
- [[-92]]: المخزون كان 8، و 8 − 100 = −92.
- المخزون فضل 8؛ الأمر اترفض كله.

ولو عايز الكود يعرف نوع الغلطة، كل error ليه كود ثابت اسمه SQLSTATE. بتشوفه في psql بـ [[\set VERBOSITY verbose]]:

~~~text الناتج
ERROR:  23514: new row for relation "products" violates check constraint "stock_not_negative"
...
CONSTRAINT NAME:  stock_not_negative
~~~

| الكود | معناه | Prisma بيحوّله |
|---|---|---|
| [[23514]] | check_violation | |
| [[23505]] | unique_violation | [[P2002]] |
| [[23503]] | foreign_key_violation | [[P2003]] |
| [[23502]] | not_null_violation | |

الكود بتاعك يمسك [[23505]] ويرجّع [[409 Conflict]] «الإيميل ده متسجل»، مش 500.

---

## ٥. الـ «جرّب»

### إيميل بحروف كبيرة

~~~text الناتج
INSERT INTO users (email, name) VALUES ('YOU@example.com', 'Ali 2');
ERROR:  duplicate key value violates unique constraint "users_email_lower_uq"
DETAIL:  Key (lower(email))=(you@example.com) already exists.
~~~

الـ [[DETAIL]] بيقول [[Key (lower(email))]]: المقارنة اتعملت على النسخة الصغيرة. والـ login لازم يدوّر بنفس التعبير عشان يستخدم الـ index ده:

~~~text الناتج
SELECT email FROM users WHERE lower(email) = lower('YOU@Example.com');
      email
-----------------
 you@example.com
~~~

### حالة مكتوبة غلط

~~~text الناتج
UPDATE orders SET status = 'shiped' WHERE id = (SELECT min(id) FROM orders);
ERROR:  new row for relation "orders" violates check constraint "status_valid"
DETAIL:  Failing row contains (3, f2a882ce-8651-45b3-a929-d1520162aa08, shiped, 0.00, 2026-10-07 08:33:13.92276+00).
~~~

[[(SELECT min(id) FROM orders)]] بيجيب أصغر id موجود (3 هنا). ومن غير الـ CHECK، [['shiped']] كانت هتتحفظ، والأوردر يختفي من أي تقرير بيدوّر على [['shipped']].

### لو فيه داتا قديمة بتكسر القاعدة

جربنا جوه [[BEGIN]] و [[ROLLBACK]]: شلنا القاعدة، وحطينا حالة غلط، ورجعنا نضيفها:

~~~text الناتج
ALTER TABLE orders ADD CONSTRAINT status_valid CHECK (status IN (...));
ERROR:  check constraint "status_valid" of relation "orders" is violated by some row
~~~

الـ ALTER بيرفض لو أي صف قديم مش ماشي مع الشرط. صلّح الداتا الأول، وبعدين ضيف القاعدة.

---

## الخلاصة

| القاعدة | الشكل | بتمنع |
|---|---|---|
| [[CHECK]] | [[CHECK (stock >= 0)]] | قيمة بتكسر شرط على الصف نفسه |
| CHECK بلستة | [[CHECK (status IN (...))]] | قيمة برّه اللستة |
| [[UNIQUE]] على تعبير | [[CREATE UNIQUE INDEX ... (lower(email))]] | تكرار من غير ما الحروف تفرق |
| [[NOT NULL]] و [[FOREIGN KEY]] | (من الدروس اللي فاتت) | خانة فاضية، وربط بحاجة مش موجودة |

- الـ CHECK بيشوف الصف الجديد بس، مش صفوف تانية.
- إضافة قاعدة بتراجع الداتا القديمة كلها، وبتفشل لو صف واحد بيكسرها.
- سمّي القواعد بأسامي واضحة، وامسك كود الـ error ([[23505]] و [[23514]]) في الكود.`,
          lines: [
            "السعر عمره ما يبقى سالب.",
            "المخزون عمره ما يبقى سالب.",
            "الحالة لازم تبقى واحدة من اللستة دي:",
            "القيم المسموحة.",
            "إيميل فريد من غير ما يفرق حروف كبيرة وصغيرة.",
            "خصم أكتر من المخزون: القاعدة رفضت."
          ],
          sol: R`[[YOU@example.com]] هيترفض: [[duplicate key value violates unique constraint "users_email_lower_uq"]] و [[Key (lower(email))=(you@example.com) already exists.]]. الـ UNIQUE العادي على email كان هيقبله، لأنه نص مختلف حرفيًا. وخلي بالك إن الـ index ده بيخدم بس الاستعلامات اللي فيها [[lower(email)]] بالظبط، فالـ login لازم يدوّر بـ [[WHERE lower(email) = lower($1)]].

[[status = 'shiped']] (سواء UPDATE أو INSERT) هيترفض: [[new row for relation "orders" violates check constraint "status_valid"]]. من غير الـ CHECK كانت الكلمة الغلط هتتحفظ، والأوردر يختفي من أي تقرير بيدوّر على 'shipped'. لو الـ ALTER TABLE نفسه فشل، ده معناه إن فيه داتا قديمة بتكسر الشرط؛ صلّحها الأول.`,
          solCode: R`INSERT INTO users (email, name) VALUES ('YOU@example.com', 'Ali 2');
-- ERROR:  duplicate key value violates unique constraint "users_email_lower_uq"
UPDATE orders SET status = 'shiped' WHERE id = (SELECT min(id) FROM orders);
-- ERROR:  new row for relation "orders" violates check constraint "status_valid"`
        },
        {
          cmd: "normalization",
          title: "كل معلومة تتخزن في مكان واحد بس",
          desc: R`الـ normalization معناها تقسم الداتا لجداول بحيث كل معلومة تتكتب مرة واحدة. لو إيميل اليوزر مكتوب في كل أوردر وغيّر إيميله، هتعدّل ألف صف، ولو نسيت واحد الداتا تتناقض.

بالكلام البسيط: 1NF كل خانة فيها قيمة واحدة (مش لستة). 2NF كل عمود معتمد على الـ key كله مش جزء منه. 3NF مفيش عمود معتمد على عمود تاني غير الـ key. والخلاصة: كل عمود بيوصف الـ key، والـ key كله، ومفيش حاجة غير الـ key.`,
          example: R`CREATE TABLE orders_bad (
  id          bigint PRIMARY KEY,
  user_email  text,
  user_name   text,
  product_ids text,                     -- '1,5,9'
  price_egp numeric, price_usd numeric, price_sar numeric
);
CREATE TABLE product_prices (
  product_id bigint REFERENCES products (id),
  currency   char(3),
  price      numeric(10,2) NOT NULL,
  PRIMARY KEY (product_id, currency)
);`,
          try: R`خد أي شيت Excel في شغلك وطلّع منه الجداول: كل «حاجة» ليها جدول (يوزر، منتج، أوردر)، وكل عمود بيتكرر بنفس القيمة في صفوف كتير علامة إنه مكانه جدول تاني.`,
          flag: "script",
          deep: {
            why: "الداتا المتكررة بتتناقض: إيميل اليوزر في جدول users حاجة وفي الأوردرات حاجة تانية، فأنهي الصح؟ الـ normalization بيمنع التناقض من الأساس، لأن مفيش نسختين أصلًا.",
            how: R`الجدول الوحش فيه كل الأخطاء:

- [[product_ids]] بقيم زي [['1,5,9']] بيكسر 1NF: الخانة فيها لستة. الحل جدول order_items.
- [[price_egp]] و [[price_usd]] و [[price_sar]] «مجموعة متكررة» في أعمدة، وده برضه عكس 1NF. في مشروع حقيقي كان المنتج (وكذا جدول تاني) عليه عمود سعر لكل عملة؛ إضافة عملة جديدة معناها migration على كل الجداول دي وتعديل الكود في كل حتة. الحل جدول [[product_prices]]: صف لكل (منتج، عملة)، وعملة جديدة = صفوف جديدة من غير ما تلمس الـ schema.
- 2NF بتظهر مع المفاتيح المركبة: في order_items المفتاح [[(order_id, product_id)]]، فلو حطيت فيه [[product_name]] يبقى معتمد على product_id لوحده (جزء من المفتاح)، ومكانه products.
- [[user_email]] و [[user_name]] في الأوردر بيكسروا 3NF: معتمدين على اليوزر مش على الأوردر (معتمدين على user_id اللي معتمد على الأوردر). مكانهم users.

المشاكل اللي الـ normalization بيمنعها ليها أسماء: update anomaly (تعدّل في مكان وتنسى التاني)، و insert anomaly (مش عارف تضيف منتج من غير أوردر)، و delete anomaly (تمسح آخر أوردر ليوزر فتضيع بياناته).`,
            when: "الافتراضي لأي قاعدة تطبيق: ابدأ لحد 3NF، وبعدين كرر داتا عن قصد وبسبب واضح بس (الدرس الجاي).",
            mistakes: R`over-normalization: جدول للاسم الأول وجدول للاسم الأخير. لستة مفصولة بكومة في عمود. عمود لكل عملة أو لكل شهر. والخلط بين normalization في قواعد البيانات و «normalize» يعني توحيد شكل النص.`
          },
          teach: R`## الفكرة: جدول وحش، وجدول بيصلّح جزء منه

الدرس ده عن **التصميم** مش عن أمر. المثال فيه جدولين: [[orders_bad]] متصمم غلط عن قصد، وفيه كل غلطة مشهورة في سطر، و [[product_prices]] اللي بيصلّح غلطة الأعمدة المتكررة. هنحط داتا في الوحش ونشوف المشاكل بعينينا، وبعدين نشوف الحل.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. الجدول الوحش سطر سطر

~~~text الأمر
CREATE TABLE orders_bad (
  id          bigint PRIMARY KEY,
  user_email  text,
  user_name   text,
  product_ids text,                     -- '1,5,9'
  price_egp numeric, price_usd numeric, price_sar numeric
);
~~~

([[--]] في SQL بداية تعليق لآخر السطر، Postgres بيتجاهله.)

| العمود | الغلطة | القاعدة اللي بيكسرها |
|---|---|---|
| [[user_email]] و [[user_name]] | بيوصفوا اليوزر مش الأوردر، وبيتكرروا في كل أوردر لنفس اليوزر | 3NF |
| [[product_ids]] | لستة جوه خانة واحدة | 1NF |
| [[price_egp]] و [[price_usd]] و [[price_sar]] | نفس المعلومة متكررة في أعمدة، عمود لكل عملة | 1NF (مجموعة متكررة) |

### الصيغ العادية (normal forms) بكلام بسيط

| الاسم | القاعدة |
|---|---|
| 1NF | كل خانة فيها قيمة واحدة، ومفيش أعمدة مترقمة لنفس المعلومة |
| 2NF | لو المفتاح مركب، كل عمود معتمد على المفتاح **كله** مش جزء منه |
| 3NF | مفيش عمود معتمد على عمود تاني غير المفتاح |

---

## ٢. المشاكل بالتجربة

حطينا أوردرين لنفس اليوزرة:

~~~text الأمر
INSERT INTO orders_bad VALUES
  (1, 'sara@example.com', 'Sara', '1,8', 390, NULL, NULL),
  (2, 'sara@example.com', 'Sara', '10', 650, NULL, NULL);
~~~

### update anomaly: Sara غيّرت إيميلها

~~~text الناتج
UPDATE orders_bad SET user_email = 'sara@new.com' WHERE id = 1;
UPDATE 1
SELECT id, user_email, user_name FROM orders_bad ORDER BY id;
 id |    user_email    | user_name
----+------------------+-----------
  1 | sara@new.com     | Sara
  2 | sara@example.com | Sara
~~~

اتعدّل في أوردر ونسينا التاني. دلوقتي نفس اليوزرة ليها إيميلين، وأنهي فيهم الصح؟ في التصميم الصح الإيميل مكتوب **مرة واحدة** في users، والأوردر فيه [[user_id]] بس.

### اللستة جوه خانة

«الأوردرات اللي فيها المنتج 1»:

~~~text الناتج
SELECT id FROM orders_bad WHERE product_ids LIKE '%1%';
 id
----
  2
  1
~~~

أوردر 2 طلع غلط: فيه المنتج [['10']] و [['%1%']] طابق الـ 1 اللي جواه. ومفيش foreign key يتأكد إن 8 منتج موجود، ولا مكان لكمية كل منتج. الحل اللي عملناه في درس many-to-many: جدول [[order_items]] بصف لكل منتج.

---

## ٣. الحل للعملات: [[product_prices]]

~~~text الأمر
CREATE TABLE product_prices (
  product_id bigint REFERENCES products (id),
  currency   char(3),
  price      numeric(10,2) NOT NULL,
  PRIMARY KEY (product_id, currency)
);
~~~

| السطر | معناه |
|---|---|
| [[product_id bigint REFERENCES products (id)]] | المنتج، و FK للتأكد إنه موجود |
| [[currency char(3)]] | كود العملة: [[char(3)]] نص طوله ٣ ثابت ([[EGP]] و [[USD]] و [[SAR]]) |
| [[price numeric(10,2) NOT NULL]] | السعر بالعملة دي |
| [[PRIMARY KEY (product_id, currency)]] | سعر واحد لكل منتج في كل عملة |

بدل ٣ أعمدة، **صف** لكل (منتج، عملة):

~~~text الناتج
INSERT INTO product_prices (product_id, currency, price)
SELECT id, 'EGP', price FROM products WHERE name = 'Hoodie';
INSERT INTO product_prices (product_id, currency, price)
SELECT id, 'USD', 13.50 FROM products WHERE name = 'Hoodie';

SELECT p.name, pp.currency, pp.price FROM product_prices pp JOIN products p ON p.id = pp.product_id;
  name  | currency | price
--------+----------+--------
 Hoodie | EGP      | 650.00
 Hoodie | USD      |  13.50
~~~

- سعر تاني بنفس العملة لنفس المنتج بيترفض من الـ primary key:

~~~text الناتج
ERROR:  duplicate key value violates unique constraint "product_prices_pkey"
DETAIL:  Key (product_id, currency)=(10, USD) already exists.
~~~

- وعملة جديدة؟ مجرد صف جديد، من غير ما تلمس شكل الجدول:

~~~text الناتج
INSERT INTO product_prices (product_id, currency, price)
SELECT id, 'SAR', 50 FROM products WHERE name = 'Hoodie';
INSERT 0 1
~~~

مع [[orders_bad]] كنت هتحتاج [[ALTER TABLE ... ADD COLUMN price_aed]] على كل جدول فيه أسعار، وتعدّل الكود في كل حتة بيقرا الأعمدة دي.

~~~text \d product_prices
   Column   |     Type      | Collation | Nullable | Default
------------+---------------+-----------+----------+---------
 product_id | bigint        |           | not null |
 currency   | character(3)  |           | not null |
 price      | numeric(10,2) |           | not null |
Indexes:
    "product_prices_pkey" PRIMARY KEY, btree (product_id, currency)
~~~

[[product_id]] و [[currency]] بقوا [[not null]] لوحدهم، لأنهم جزء من الـ primary key.

### وفين 2NF هنا؟

لو حطيت [[product_name]] في [[product_prices]]، الاسم معتمد على [[product_id]] لوحده (نص المفتاح)، مش على (منتج، عملة). فهيتكرر في صف كل عملة. مكانه [[products]].

---

## ٤. حل الـ «جرّب» (الـ solCode)

شيت مبيعات فيه: التاريخ، العميل وتليفونه وعنوانه، المنتج وسعره، الكمية، المندوب. طبّقنا نفس السؤال على كل عمود: «ده بيوصف إيه؟»

| بيوصف | الجدول | مفتاحه |
|---|---|---|
| العميل (اسم، تليفون، عنوان) | [[customers]] | [[id]]، و [[phone]] عليه UNIQUE |
| المندوب | [[sales_reps]] | [[id]] |
| المنتج (اسم، سعر حالي) | [[items]] | [[id]] |
| عملية البيع (مين، امتى، مندوب مين) | [[sales]] | [[id]] و FK للعميل والمندوب |
| بنود العملية (منتج، كمية، سعر وقت البيع) | [[sale_items]] | [[(sale_id, item_id)]] مركب |

الكود ده اتجرّب كامل على [[postgres:18]] (جوه BEGIN و ROLLBACK). و [[unit_price]] في البند مكرر من [[items.price]] عن قصد، وده موضوع الدرس الجاي.

---

## الخلاصة

- كل عمود بيوصف المفتاح، والمفتاح كله، ومفيش حاجة غير المفتاح.
- علامات الغلط: لستة في خانة ([['1,8']])، أعمدة مترقمة أو لكل عملة، قيمة بتتكرر بنفس الشكل في صفوف كتير.
- المشاكل اللي بتظهر: update anomaly (تعدّل مكان وتنسى التاني)، وبحث غلط في اللستات، و migration مع كل قيمة جديدة.
- الحل غالبًا جدول جديد بصف لكل حاجة، و foreign key.`,
          lines: [
            "جدول أوردرات متصمم غلط.",
            "المفتاح.",
            "إيميل اليوزر متكرر في كل أوردر (بيكسر 3NF).",
            "واسمه كمان.",
            "لستة ids في خانة واحدة (بيكسر 1NF).",
            "عمود لكل عملة: إضافة عملة = تعديل الـ schema.",
            "قفلة.",
            "الحل للعملات: جدول فيه صف لكل منتج وعملة.",
            "المنتج.",
            "كود العملة (EGP، USD).",
            "السعر بالعملة دي.",
            "المفتاح المركب: سعر واحد لكل منتج في كل عملة.",
            "قفلة."
          ],
          sol: R`إجابة نموذجية على شيت مبيعات أعمدته: التاريخ، اسم العميل، تليفونه، عنوانه، المنتج، سعره، الكمية، المندوب. اسم العميل وتليفونه وعنوانه بيتكرروا في كل صف اشترى فيه، فدول جدول [[customers]]. المنتج وسعره بيتكرروا، فدول جدول منتجات. المندوب جدول لوحده. والعملية نفسها (مين اشترى امتى ومن أنهي مندوب) جدول، وبنودها (منتج وكمية وسعر وقت البيع) جدول تاني بـ PRIMARY KEY مركب.

علامات لازم تلاحظها: عمود فيه أكتر من قيمة ([[«تيشيرت، كاب»]]) يبقى محتاج جدول بنود؛ أعمدة مترقمة ([[تليفون1، تليفون2]]) نفس الحكاية؛ وقيمة لو اتغيرت لازم تعدلها في صفوف كتير (عنوان العميل) يبقى مكانها جدول تاني. والاستثناء: السعر يتنسخ في البند عن قصد، لأنه سعر لحظة البيع مش السعر الحالي. الكود ده اتجرّب على Postgres.`,
          solCode: R`CREATE TABLE customers (
  id      bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name    text NOT NULL,
  phone   text NOT NULL UNIQUE,
  address text
);
CREATE TABLE sales_reps (
  id   bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL
);
CREATE TABLE items (
  id    bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name  text NOT NULL UNIQUE,
  price numeric(10,2) NOT NULL
);
CREATE TABLE sales (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers (id),
  rep_id      bigint REFERENCES sales_reps (id),
  sold_at     date NOT NULL
);
CREATE TABLE sale_items (
  sale_id    bigint REFERENCES sales (id) ON DELETE CASCADE,
  item_id    bigint REFERENCES items (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (sale_id, item_id)
);`
        },
        {
          cmd: "denormalization",
          title: "امتى تكرر الداتا عن قصد",
          desc: R`الـ denormalization إنك تكرر معلومة عن قصد، لسبب واضح: يا القيمة لازم تتجمد في لحظة معينة، يا قرايتها بقت غالية جدًا. أشهر مثال: [[order_items.unit_price]]. السعر موجود في products، بس بتنسخه وقت الشرا لأن الفاتورة القديمة مينفعش تتغير لما تغيّر السعر بكرة.

والمثال التاني: [[orders.total]] محفوظ رغم إنه ممكن يتحسب من البنود، عشان الليستات والتقارير متعملش JOIN و sum على كل صف. والتمن: لازم تضمن إن النسختين مايتناقضوش.`,
          example: R`UPDATE orders o SET total = s.sum
FROM (SELECT order_id, sum(quantity * unit_price) AS sum
      FROM order_items GROUP BY order_id) s
WHERE s.order_id = o.id;
SELECT o.id, o.total, sum(oi.quantity * oi.unit_price) AS real_total
FROM orders o JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id
HAVING o.total <> sum(oi.quantity * oi.unit_price);`,
          try: R`ضيف بند لأوردر من غير ما تحدّث total، وشغّل الاستعلام التاني: هيطلّعلك الأوردر ده. ده «تقرير المراجعة» اللي المفروض يشتغل دوريًا على أي رقم متكرر.`,
          flag: "script",
          deep: {
            why: "الـ normalization الكامل ساعات بيدّي إجابة غلط (السعر الحالي بدل السعر اللي اتدفع)، وساعات بيبقى بطيء (مجموع مليون بند كل ما حد يفتح لوحة الأدمن). التكرار المقصود بيحل الاتنين، بشرط تعرف انت كررت إيه وليه.",
            how: R`فيه نوعين مختلفين:

١. snapshot (لقطة تاريخية): [[unit_price]]، وعنوان الشحن وقت الأوردر، واسم المنتج وقت الشرا. دي في الحقيقة مش تكرار؛ دي معلومة مختلفة: «السعر اللي اتدفع» مش «السعر الحالي». في مشروع حقيقي كان جدول الأوردرات بيحفظ عنوان العنصر وقت الشرا، وجدول تاني بيحفظ سعر القطعة «وقت الشرا» بتعليق واضح. ده الصح.

٢. cache (قيمة محسوبة): [[orders.total]]، وعدادات زي [[products.orders_count]]، ورصيد محفظة. دي لازم تفضل متزامنة مع الأصل: تتحدث في نفس الـ transaction اللي بتغيّر الأصل، أو بـ trigger، ومعاها تقرير مراجعة دوري زي المثال.

النمط المحترم للأرصدة: جدول قيود (ledger) هو الحقيقة، كل حركة صف (إضافة أو خصم)، والرصيد مجرد cache بيتحدث في نفس الـ transaction مع كل قيد. لو شكّيت في الرصيد، تعيد حسابه من القيود.

ولتقارير تقيلة بتتقري كتير: [[MATERIALIZED VIEW]] بتحفظ نتيجة استعلام وتعملها refresh كل فترة.`,
            when: "الـ snapshots دايمًا (أي حاجة في فاتورة أو أوردر). الـ caches بس بعد ما تقيس إن القراية بطيئة فعلًا.",
            mistakes: R`مسار بيضيف بند من غير ما يحدّث الـ total. عداد بيتحدث بـ «اقرا واكتب» فيضيع مع التزامن (درس atomic UPDATE). وتكرار «عشان السرعة» قبل ما تقيس أي حاجة.`
          },
          teach: R`## الفكرة: نسخة محفوظة، ولازم حد يراجعها

[[orders.total]] ممكن يتحسب في أي وقت من البنود (الكمية × السعر). بس احنا شايلينه في الأوردر نفسه عشان أي لستة أوردرات تعرضه من غير JOIN و sum. ده تكرار مقصود (denormalization)، وتمنه إن النسختين ممكن يختلفوا. المثال فيه أمرين: **تصليح** (احسب total من البنود)، و **مراجعة** (هات الأوردرات اللي الرقمين فيها مختلفين).

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab: أوردر 11 فيه Hoodie و Mug (من درس INNER JOIN)، والـ total بتاعه لسه 0.

---

## ١. تقرير المراجعة الأول

نبدأ بالتاني لأنه بيوريك المشكلة:

~~~text الأمر
SELECT o.id, o.total, sum(oi.quantity * oi.unit_price) AS real_total
FROM orders o JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id
HAVING o.total <> sum(oi.quantity * oi.unit_price);
~~~

| السطر | بيعمل إيه |
|---|---|
| [[SELECT o.id, o.total, sum(...) AS real_total]] | الإجمالي المحفوظ جنب الإجمالي المحسوب من البنود |
| [[FROM orders o JOIN order_items oi ON ...]] | كل أوردر مع بنوده |
| [[GROUP BY o.id]] | صف لكل أوردر (و [[o.total]] مسموح لأن id هو الـ primary key) |
| [[HAVING o.total <> sum(...)]] | سيب الأوردرات اللي الرقمين فيها **مختلفين** بس |

[[HAVING]] (درسه في المستوى الأول) زي WHERE بس بعد التجميع، فينفع يقارن بـ [[sum]]. و [[<>]] يعني «لا يساوي».

~~~text الناتج
 id | total | real_total
----+-------+------------
 11 |  0.00 |     790.00
~~~

الأوردر محفوظ إنه بـ 0، وبنوده بـ 790 (650 + 140). أي لستة بتعرض [[total]] بتقول كلام غلط.

---

## ٢. التصليح: [[UPDATE ... FROM]]

~~~text الأمر
UPDATE orders o SET total = s.sum
FROM (SELECT order_id, sum(quantity * unit_price) AS sum
      FROM order_items GROUP BY order_id) s
WHERE s.order_id = o.id;
~~~

نفكه من جوه لبرة:

### الخطوة ١: الـ subquery

~~~text الناتج
SELECT order_id, sum(quantity * unit_price) AS sum
FROM order_items GROUP BY order_id;
 order_id |  sum
----------+--------
       11 | 790.00
~~~

مجموع كل أوردر من بنوده. سمّينا النتيجة [[s]] (بعد القوس)، والعمود [[sum]].

### الخطوة ٢: [[UPDATE orders o ... FROM (...) s WHERE s.order_id = o.id]]

[[UPDATE ... FROM]] (خاصية في Postgres) بتخلي التعديل يقرا من جدول تاني: لكل أوردر [[o]] ليه صف في [[s]] بنفس الرقم، خلّي [[total = s.sum]]. كأنه JOIN جوه UPDATE.

~~~text الناتج
UPDATE 1
SELECT id, total FROM orders WHERE id = 11;
 id | total
----+--------
 11 | 790.00
~~~

صف واحد اتعدل، لأن أوردر 11 هو الوحيد اللي ليه بنود. الأوردرات اللي ملهاش بنود مش في [[s]]، فالـ UPDATE ملمسهاش.

وتقرير المراجعة دلوقتي:

~~~text الناتج
 id | total | real_total
----+-------+------------
(0 rows)
~~~

[[0 rows]] هي الحالة السليمة: مفيش أوردر رقمه مختلف.

---

## ٣. الـ «جرّب»: بند جديد من غير ما نحدّث total

~~~text الأمر
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT (SELECT max(id) FROM orders), id, 1, price FROM products WHERE name = 'Cap';
~~~

[[(SELECT max(id) FROM orders)]] بيجيب آخر أوردر (11)، والباقي بيضيف Cap بسعره (170). ده بالظبط اللي بيحصل لما مسار في الكود يضيف بند وينسى الـ total.

~~~text تقرير المراجعة
 id | total  | real_total
----+--------+------------
 11 | 790.00 |     960.00
~~~

790 + 170 = 960. التقرير مسك الفرق. وتشغيل أمر التصليح تاني بيرجّعه [[960.00]].

> التقرير ده بـ JOIN، فأوردر [[total]] بتاعه مش صفر ومفيش ولا بند **مش هيظهر**. لو عايز تمسكه كمان: LEFT JOIN و [[COALESCE(sum(...), 0)]].

---

## ٤. نوعين تكرار

| النوع | مثال | لازم يفضل زي الأصل؟ |
|---|---|---|
| snapshot (لقطة) | [[order_items.unit_price]]، عنوان الشحن وقت الأوردر | لأ: هو معلومة تانية («اللي اتدفع») ومش المفروض يتغير |
| cache (قيمة محسوبة) | [[orders.total]]، عداد أوردرات المنتج، رصيد محفظة | أيوه: لازم يتحدث مع كل تغيير في الأصل |

الـ cache بيفضل سليم بطريقة من دول:
- تحدّثه في نفس الـ transaction اللي بتضيف البند (درس transaction).
- trigger يحدّثه لوحده (درس CREATE TRIGGER).
- ومعاهم تقرير مراجعة زي ده بيشتغل دوريًا.

---

## الخلاصة

- [[UPDATE t SET col = s.x FROM (subquery) s WHERE s.key = t.key]]: تعديل من نتيجة استعلام تاني.
- [[GROUP BY ... HAVING محفوظ <> محسوب]]: تقرير مراجعة لأي رقم متكرر؛ الحالة السليمة [[0 rows]].
- كرر عن قصد: snapshots دايمًا، و caches بس بعد ما تقيس إن القراية بطيئة، ومعاها خطة تفضل بيها متزامنة.`,
          lines: [
            "حدّث total كل أوردر من بنوده:",
            "مجموع (الكمية × السعر) لكل أوردر،",
            "من جدول البنود مجمّع بالأوردر.",
            "واربط كل مجموع بأوردره.",
            "تقرير مراجعة: الإجمالي المحفوظ جنب الإجمالي الحقيقي،",
            "من الأوردرات مع بنودها،",
            "لكل أوردر،",
            "واعرض اللي الرقمين فيه مختلفين بس."
          ],
          sol: R`بعد ما تضيف بند لأوردر من غير ما تحدّث total، استعلام المراجعة هيطلّع صف زي [[2 | 0.00 | 170.00]]: الأوردر رقم كذا، الـ total المتخزن، والمجموع الحقيقي من البنود. قبل الإضافة كان بيرجّع [[0 rows]]، ودي الحالة السليمة.

الـ UPDATE الأول بيصلّح الفرق. خلي بالك إن الاستعلام ده بـ JOIN، فأوردر total بتاعه مش صفر ومفيش ولا بند مش هيظهر فيه؛ لو عايز تمسكه كمان استخدم LEFT JOIN و [[COALESCE(sum(...), 0)]]. والحل الدائم إن أي كود بيضيف بند يحدّث total في نفس الـ transaction (زي درس transaction)، أو trigger، أو إنك تبطل تخزّن total وتحسبه وقت القراية لو الأداء مسموح.`,
          solCode: R`INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT (SELECT max(id) FROM orders), id, 1, price FROM products WHERE name = 'Cap';
SELECT o.id, o.total, sum(oi.quantity * oi.unit_price) AS real_total
FROM orders o JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id
HAVING o.total <> sum(oi.quantity * oi.unit_price);   -- الأوردر ده ظهر`
        },
        {
          cmd: "jsonb",
          title: "عمود مرن جوه جدول صارم",
          desc: R`[[jsonb]] بيخزن JSON جوه عمود، وتقدر تستعلم جواه وتعمله index. مناسب للداتا اللي شكلها بيختلف من صف لصف ومش بتعمل عليها JOIN: مواصفات منتج (لون، مقاس، خامة)، أو إعدادات، أو payload جاي من webhook.

القاعدة: اللي بتفلتر بيه أو بتربط بيه دايمًا، أو محتاج constraint، يبقى عمود عادي. و jsonb للتفاصيل المتغيرة بس.`,
          example: R`SELECT name, attrs->>'color' AS color FROM products;
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
SELECT name FROM products WHERE attrs->'sizes' ? 'L';
UPDATE products SET attrs = attrs || '{"material": "cotton"}' WHERE name = 'T-shirt';
CREATE INDEX products_attrs_gin ON products USING gin (attrs);`,
          try: R`جرّب [[attrs->'color']] و [[attrs->>'color']] وقارن: واحدة بترجّع JSON بعلامات تنصيص، والتانية نص عادي. وجرّب [[WHERE attrs->>'color' = 'black']] و [[WHERE attrs @> ...]] واعرف أنهي فيهم بيستخدم الـ GIN index بـ EXPLAIN.`,
          flag: "script",
          deep: {
            why: "تيشيرت ليه مقاس ولون، وكتاب ليه مؤلف وعدد صفحات، وكورس ليه مدة. عمود لكل صفة لكل نوع منتج يعمل جدول بمية عمود أغلبها NULL. jsonb بيحط الصفات المتغيرة دي في عمود واحد، وتفضل الأعمدة المهمة (الاسم والسعر والمخزون) أعمدة عادية بـ constraints.",
            how: R`[[->]] بيرجّع jsonb، و [[->>]] بيرجّع text. [[@>]] يعني «بيحتوي على» (containment). [[?]] يعني «الـ key أو العنصر ده موجود». [[||]] بيدمج (سطحي، المستوى الأول بس)، و [[jsonb_set]] لتعديل قيمة في مسار متداخل.

jsonb بيتخزن متحلّل (binary): الـ keys المتكررة بتتشال، والترتيب مش محفوظ، والقراية سريعة. json العادي بيحفظ النص زي ما هو وبيتحلّل مع كل قراية.

GIN index الافتراضي على jsonb بيخدم [[@>]] و [[?]] و [[?|]] و [[?&]]. ولو بتفلتر دايمًا بـ key واحد، B-tree على التعبير أصغر: [[CREATE INDEX ON products ((attrs->>'color'))]].

جوه jsonb مفيش FK ولا أنواع مضمونة؛ ممكن تحط CHECK زي [[jsonb_typeof(attrs->'sizes') = 'array']]. وتعديل أي حاجة جواه بيكتب القيمة كلها من جديد.

في Prisma النوع [[Json]]، وبتفلتر جواه بـ [[path]].`,
            when: "صفات متغيرة حسب النوع، وإعدادات، و payloads خارجية بتحفظها زي ما هي، و metadata بتتعرض بس.",
            mistakes: R`تحط كل حاجة في jsonb (MongoDB جوه Postgres)، فتخسر الـ constraints والـ JOINs. فلوس أو ids بتربط بيها جوه jsonb. و document jsonb كبير بيتعدّل كتير، وكل تعديل صغير بيعيد كتابته كله.`
          },
          teach: R`## الفكرة: JSON جوه عمود، بس تقدر تسأل جواه

عمود [[attrs]] في products نوعه [[jsonb]] (من درس أنواع الأعمدة)، وفيه صفات بتختلف من منتج للتاني. المثال ٥ أوامر: اقرا key، وفلتر بـ «بيحتوي على»، واسأل «العنصر ده موجود في اللستة؟»، وضيف key، واعمل index. كل واحد ليه رمز صغير لازم تعرفه: [[->>]] و [[@>]] و [[?]] و [[||]].

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab. ضفنا صفات للـ Hoodie عشان يبقى فيه أكتر من منتج عنده attrs:

~~~text الناتج
UPDATE products SET attrs = '{"color": "grey", "sizes": ["L", "XL"]}' WHERE name = 'Hoodie';
SELECT name, attrs FROM products ORDER BY id;
  name   |                  attrs
---------+-----------------------------------------
 T-shirt | {"color": "black", "sizes": ["M", "L"]}
 Mug     | {}
 Cap     | {}
 Hoodie  | {"color": "grey", "sizes": ["L", "XL"]}
 Pen     | {}
~~~

[[{}]] object فاضي: الـ DEFAULT بتاع العمود.

---

## ١. [[attrs->>'color']]: اقرا key كنص

~~~text الأمر
SELECT name, attrs->>'color' AS color FROM products;
~~~

~~~text الناتج (بعد \pset null '(null)')
  name   | color
---------+--------
 T-shirt | black
 Pen     | (null)
 Cap     | (null)
 Mug     | (null)
 Hoodie  | grey
~~~

المنتج اللي ملوش [[color]] بيرجع NULL، مش error. وفيه سهمين:

~~~text الناتج
SELECT attrs->'color', attrs->>'color', pg_typeof(attrs->'color'), pg_typeof(attrs->>'color')
FROM products WHERE name = 'T-shirt';
 ?column? | ?column? | pg_typeof | pg_typeof
----------+----------+-----------+-----------
 "black"  | black    | jsonb     | text
~~~

| الرمز | بيرجّع | استخدمه لـ |
|---|---|---|
| [[->]] | [[jsonb]] (بعلامات التنصيص) | تكمّل جوه: [[attrs->'sizes']] لستة تسأل فيها |
| [[->>]] | [[text]] | العرض، أو المقارنة بنص عادي |

لو قارنت [[->]] بنص عادي:

~~~text الناتج
SELECT name FROM products WHERE attrs->'color' = 'black';
ERROR:  invalid input syntax for type json
DETAIL:  Token "black" is invalid.
~~~

الشمال jsonb، فـ Postgres حاول يقرا [['black']] كـ JSON، والنص من غير علامات تنصيص مش JSON صحيح.

---

## ٢. [[attrs @> '{"color": "black"}']]: بيحتوي على

~~~text الأمر
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
~~~

[[@>]] (containment) معناها: «الـ JSON اللي على الشمال **فيه** كل اللي على اليمين». اليمين نص JSON بين علامات تنصيص مفردة، و Postgres بيحوّله jsonb.

~~~text الناتج
  name
---------
 T-shirt
~~~

الـ T-shirt فيه [[color]] = [["black"]]، ومش مهم إن فيه keys تانية كمان.

---

## ٣. [[attrs->'sizes' ? 'L']]: العنصر موجود؟

~~~text الأمر
SELECT name FROM products WHERE attrs->'sizes' ? 'L';
~~~

نفكه:
1. [[attrs->'sizes']]: هات اللستة كـ jsonb ([[["M", "L"]]]).
2. [[? 'L']]: فيها النص [['L']]؟

~~~text الناتج
  name
---------
 T-shirt
 Hoodie
~~~

و [[?]] على object بيسأل عن **key**: [[attrs ? 'sizes']] = «فيه key اسمه sizes؟»:

~~~text الناتج
SELECT name, attrs->'sizes' AS sizes FROM products WHERE attrs ? 'sizes';
  name   |    sizes
---------+-------------
 T-shirt | ["M", "L"]
 Hoodie  | ["L", "XL"]
~~~

> لو بتستخدم مكتبة بتكتب [[?]] كـ placeholder للـ parameters (زي بعض مكتبات Java و PHP)، الرمز ده بيتلخبط معاها. البديل: [[jsonb_exists(attrs, 'sizes')]] أو [[@>]].

---

## ٤. [[attrs || '{"material": "cotton"}']]: ضيف key

~~~text الأمر
UPDATE products SET attrs = attrs || '{"material": "cotton"}' WHERE name = 'T-shirt';
~~~

[[||]] مع jsonb بيدمج objectين: keys اليمين بتتضاف، ولو key موجود في الاتنين اليمين بيكسب.

~~~text الناتج
SELECT attrs FROM products WHERE name = 'T-shirt';
                             attrs
---------------------------------------------------------------
 {"color": "black", "sizes": ["M", "L"], "material": "cotton"}
~~~

الباقي فضل زي ما هو. بس الدمج **سطحي** (المستوى الأول بس): لو دمجت [['{"sizes": ["S"]}']] اللستة كلها بتتبدّل:

~~~text الناتج
SELECT attrs || '{"sizes": ["S"]}' FROM products WHERE name = 'T-shirt';
 {"color": "black", "sizes": ["S"], "material": "cotton"}
~~~

M و L راحوا. لتعديل جوه مسار، [[jsonb_set]]:

~~~text الناتج
SELECT jsonb_set(attrs, '{sizes}', attrs->'sizes' || '["XL"]') FROM products WHERE name = 'T-shirt';
 {"color": "black", "sizes": ["M", "L", "XL"], "material": "cotton"}
~~~

[[jsonb_set(الأصل, المسار, القيمة الجديدة)]]: المسار [['{sizes}']] (لستة keys بين [[{}]])، والقيمة الجديدة اللستة القديمة ومعاها [["XL"]] ([[||]] بين لستتين بيلزقهم). (ده SELECT بس، مكتبناش حاجة.)

---

## ٥. [[CREATE INDEX products_attrs_gin ON products USING gin (attrs);]]

[[USING gin]]: نوع index اسمه GIN (Generalized Inverted Index). بدل ما يرتّب القيمة كلها، بيعمل فهرس لكل key وكل قيمة جوه الـ JSON، فيقدر يجاوب «مين فيه color = black؟» من غير ما يفتح كل صف.

### مين بيستخدمه؟ (الـ «جرّب»)

على جدول ٥ صفوف، Postgres هيقرا الجدول كله ([[Seq Scan]]) لأنه أرخص من فتح أي index. عشان نشوف الفرق، بنقوله «متستخدمش Seq Scan لو فيه بديل»:

~~~text الأمر
SET enable_seqscan = off;
EXPLAIN SELECT name FROM products WHERE attrs @> '{"color": "black"}';
EXPLAIN SELECT name FROM products WHERE attrs->>'color' = 'black';
RESET enable_seqscan;
~~~

~~~text @>
 Bitmap Heap Scan on products  (cost=12.92..16.93 rows=1 width=32)
   Recheck Cond: (attrs @> '{"color": "black"}'::jsonb)
   ->  Bitmap Index Scan on products_attrs_gin  (cost=0.00..12.92 rows=1 width=0)
         Index Cond: (attrs @> '{"color": "black"}'::jsonb)
~~~

~~~text ->> =
 Seq Scan on products  (cost=0.00..1.07 rows=1 width=32)
   Disabled: true
   Filter: ((attrs ->> 'color'::text) = 'black'::text)
~~~

- [[@>]]: [[Bitmap Index Scan on products_attrs_gin]]، يعني استخدم الـ index.
- [[->>'color' = 'black']]: لسه Seq Scan، و [[Disabled: true]] معناها «اتعمل رغم إنك قفلته، لأن مفيش طريقة تانية». (في Postgres 17 وأقدم، بدل السطر ده التكلفة بتبقى رقم ضخم زي [[cost=10000000000.00]].)

الـ GIN الافتراضي بيخدم [[@>]] و [[?]] و [[?|]] و [[?&]]، مش [[->>]] مع [[=]]. لو بتفلتر دايمًا بـ [[->>'color']]، اعمل B-tree على التعبير ده نفسه: [[CREATE INDEX ON products ((attrs->>'color'))]] (الأقواس المزدوجة لازمة مع تعبير).

[[SET]] بيغيّر الإعداد للـ session دي بس، و [[RESET]] بيرجّعه.

---

## الخلاصة

| الرمز | معناه | مثال |
|---|---|---|
| [[->]] | هات key كـ jsonb | [[attrs->'sizes']] |
| [[->>]] | هات key كنص | [[attrs->>'color']] |
| [[@>]] | بيحتوي على (بيستخدم GIN) | [[attrs @> '{"color": "black"}']] |
| [[?]] | الـ key أو العنصر موجود | [[attrs->'sizes' ? 'L']] |
| [[||]] | دمج سطحي | [[attrs || '{"material": "cotton"}']] |
| [[jsonb_set]] | عدّل جوه مسار | [[jsonb_set(attrs, '{sizes}', ...)]] |

- قارن بنص عادي بـ [[->>]]، مش [[->]].
- عشان الـ GIN يشتغل، فلتر بـ [[@>]] أو [[?]].
- اللي بتربط بيه أو محتاج constraint يفضل عمود عادي؛ jsonb للتفاصيل المتغيرة.`,
          lines: [
            "طلّع قيمة key كنص.",
            "المنتجات اللي JSON بتاعها فيه color = black (بيستخدم GIN index).",
            "المنتجات اللي لستة المقاسات فيها L.",
            "ضيف key جديد من غير ما تمسح الباقي.",
            "GIN index للاستعلام جوه الـ JSON."
          ],
          sol: R`[[attrs->'color']] بيرجّع [["black"]] بعلامات تنصيص ونوعه [[jsonb]]، و [[attrs->>'color']] بيرجّع [[black]] ونوعه [[text]] (اتأكد بـ [[pg_typeof]]). عشان كده المقارنة بنص عادي لازم تبقى بـ [[->>]].

في EXPLAIN على جدول صغير الاتنين هيقولوا [[Seq Scan on products]]، لأن قراية ٥ صفوف أرخص من فتح أي index. عشان تشوف الفرق اكتب [[SET enable_seqscan = off;]] قبلهم: [[@>]] هيبقى [[Bitmap Index Scan on products_attrs_gin]]، و [[->>'color' = 'black']] هيفضل Seq Scan لأنه مفيش index يخدمه (في Postgres 17 وأقدم تكلفته بتبقى رقم ضخم زي [[cost=10000000000.00]]، وفي 18 تحته سطر [[Disabled: true]]). الـ GIN الافتراضي بيخدم [[@>]] و [[?]] و [[?|]] و [[?&]]، مش [[->>]] مع [[=]]؛ ده محتاج expression index على [[(attrs->>'color')]].`,
          solCode: R`SELECT attrs->'color', attrs->>'color', pg_typeof(attrs->'color'), pg_typeof(attrs->>'color')
FROM products WHERE name = 'T-shirt';   -- "black" | black | jsonb | text
SET enable_seqscan = off;
EXPLAIN SELECT name FROM products WHERE attrs->>'color' = 'black';        -- Seq Scan
EXPLAIN SELECT name FROM products WHERE attrs @> '{"color": "black"}';   -- Bitmap Index Scan on products_attrs_gin
RESET enable_seqscan;`
        }
      ]
    }
]);
