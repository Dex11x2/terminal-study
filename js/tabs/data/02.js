// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "CASE والتواريخ والنصوص",
      l: 1,
      n: "الدوال اللي أي تقرير أو لوحة أدمن محتاجاها من أول أسبوع: قيمة حسب شرط، وإيراد كل شهر بتوقيت مصر، وتنضيف النصوص",
      items: [
        {
          cmd: "CASE WHEN",
          title: "قيمة حسب شرط جوه الـ SELECT، وعدّ مشروط جوه GROUP BY",
          desc: R`[[CASE]] هو الـ if/else بتاع SQL: بيرجّع قيمة حسب شرط، وتقدر تحطه في أي مكان بتكتب فيه قيمة: في SELECT، أو ORDER BY، أو جوه [[sum()]] و [[count()]]، أو في SET بتاع UPDATE.

الشروط بتتقري بالترتيب، وأول شرط يتحقق هو اللي بيكسب. ولو مفيش شرط اتحقق ومفيش [[ELSE]]، النتيجة [[NULL]].

أشهر استخدام في الشغل: تقرير فيه صف لكل يوزر وعمود لكل حالة ([[count(CASE WHEN status = 'paid' THEN 1 END)]]). وده نفس اللي [[FILTER]] بيعمله في درس count و sum و avg، بس CASE شغال في كل قواعد البيانات (MySQL و SQL Server كمان)، و FILTER في Postgres و SQLite بس.`,
          example: R`SELECT name, price,
       CASE
         WHEN price < 100 THEN 'cheap'
         WHEN price < 500 THEN 'normal'
         ELSE 'premium'
       END AS price_band
FROM products;
SELECT user_id,
       count(*) AS orders,
       count(CASE WHEN status = 'paid' THEN 1 END) AS paid,
       sum(CASE WHEN status = 'paid' THEN total ELSE 0 END) AS paid_total
FROM orders
GROUP BY user_id;
SELECT name, stock FROM products
ORDER BY CASE WHEN stock = 0 THEN 1 ELSE 0 END, name;
UPDATE products
SET price = CASE name WHEN 'Mug' THEN 110 WHEN 'Cap' THEN 170 ELSE price END
WHERE name IN ('Mug', 'Cap');`,
          try: R`اعمل تقرير فيه صف لكل user_id وعمود لكل حالة (pending و paid و cancelled) بعدد الأوردرات، مرة بـ CASE ومرة بـ FILTER، وقارن النتيجتين. وبعدين شيل [[ELSE 0]] من الـ sum وشوف اليوزر اللي ملوش أوردرات مدفوعة بقى عنده إيه. وآخر حاجة اكتب [[count(CASE WHEN status = 'paid' THEN 1 ELSE 0 END)]] وشوف الرقم طلع كام. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: صف لكل [[user_id]] عنده أوردرات، وتلات أعمدة بعدد الـ pending والـ paid والـ cancelled (بالترتيب ده). اليوزر اللي ملوش حالة معينة يطلع عنده 0 مش NULL.`,
          sol: R`الاستعلامين لازم يطلّعوا نفس الأرقام بالظبط: صف لكل user_id، وتلات أعمدة أرقام. لو يوزر ملوش أوردرات pending، العمود بتاعه [[0]] مش NULL، لأن [[count]] بيعدّ القيم اللي مش NULL، و CASE من غير ELSE بيرجّع NULL للصفوف اللي مش مطابقة.

لما تشيل [[ELSE 0]] من [[sum]]: اليوزر اللي ملوش ولا أوردر مدفوع هيطلع عنده خانة فاضية (NULL) بدل [[0]]، لأن [[sum]] لقيم كلها NULL بيرجّع NULL. في الـ API ده بيوصل [[null]] والواجهة تكتب «NaN ج.م». الحل [[ELSE 0]] أو [[COALESCE(sum(...), 0)]].

والغلطة الأخيرة: [[count(CASE ... ELSE 0 END)]] بيطلع نفس عدد كل الأوردرات، لأن [[0]] قيمة مش NULL فـ count بيعدّها. مع count سيب ELSE خالص، ومع sum حط [[ELSE 0]].`,
          solCode: R`SELECT user_id,
       count(CASE WHEN status = 'pending' THEN 1 END)   AS pending,
       count(CASE WHEN status = 'paid' THEN 1 END)      AS paid,
       count(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled
FROM orders
GROUP BY user_id;

SELECT user_id,
       count(*) FILTER (WHERE status = 'pending')   AS pending,
       count(*) FILTER (WHERE status = 'paid')      AS paid,
       count(*) FILTER (WHERE status = 'cancelled') AS cancelled
FROM orders
GROUP BY user_id;`,
          flag: "script",
          deep: {
            why: "الداتا بتتخزن بشكل، والتقرير محتاجها بشكل تاني: «رخيص/عادي/غالي» بدل الرقم، أو عمود لكل حالة بدل صف لكل حالة، أو المنتجات الخلصانة في آخر القايمة. من غير CASE بتجيب كل الصفوف وتعمل الحسبة دي في JavaScript، وده أبطأ وبيتكرر في كل مكان.",
            how: R`فيه شكلين: [[CASE WHEN شرط THEN قيمة ... END]] (الشكل العام، كل WHEN شرط مستقل)، و [[CASE عمود WHEN قيمة THEN ... END]] (مقارنة بـ = مع قيمة واحدة، زي switch). والشكل التاني مبيعرفش يطابق NULL، لأن [[NULL = NULL]] مش true.

كل الفروع لازم ترجّع نوع واحد: [[THEN 1 ELSE 'none']] هيطلع error، لأن Postgres بيحاول يحوّل 'none' لرقم.

جوه aggregate، الـ CASE بيتحسب لكل صف قبل التجميع. عشان كده [[sum(CASE WHEN status = 'paid' THEN total ELSE 0 END)]] معناها «اجمع total للمدفوع بس» في نفس الـ GROUP BY اللي فيه باقي الأعمدة. وده اسمه conditional aggregation، وبيعمل pivot بسيط: الحالات بقت أعمدة.

في [[UPDATE]]: [[CASE name WHEN 'Mug' THEN 110 ... ELSE price END]] بيعدّل أكتر من صف بقيم مختلفة في أمر واحد. الـ [[ELSE price]] مهم: من غيره أي صف عدّى من الـ WHERE ومش متغطي في الـ CASE سعره هيبقى NULL (أو error لو العمود NOT NULL).`,
            when: "تقارير الأدمن (أوردرات كل حالة، مبيعات كل فئة سعرية)، والترتيب المخصص (المتاح الأول، أو حالات بترتيب منطقي مش أبجدي)، وتحويل أكواد لنصوص مفهومة، وتعديل كذا صف بقيم مختلفة في أمر واحد.",
            mistakes: R`[[count(CASE ... ELSE 0 END)]] فيعدّ كل حاجة. [[sum(CASE ...)]] من غير ELSE فيطلع NULL بدل صفر. تنسى [[END]] (الـ error بيبقى [[syntax error at or near "AS"]]). ترتيب الشروط غلط: [[WHEN price < 500]] قبل [[WHEN price < 100]] فمفيش حاجة هتبقى cheap أبدًا. وفي الانترفيو سؤال مشهور: «هات عدد الأوردرات المدفوعة والملغية لكل يوزر في استعلام واحد»، والإجابة conditional aggregation بـ CASE أو FILTER مش استعلامين.`
          },
          teach: R`## الفكرة: if/else جوه الاستعلام نفسه

[[CASE]] بيبص على كل صف، ويختار له قيمة حسب شرط. المثال فيه ٤ استخدامات: عمود جديد محسوب، وعدّ وجمع مشروط جوه [[GROUP BY]]، وترتيب مخصص، وتعديل كذا صف بقيم مختلفة في أمر واحد.

كل الناتج تحت حقيقي: psql على [[postgres:18]] جوه Docker، على جداول الـ lab اللي اتعملت في المستوى الأول (users و products و orders).

---

## ٠. جهّز داتا فيها تنوّع

لو ماشي مع الـ lab من الأول، عندك يوزر واحد بس. ضيف اتنين كمان بأوردرات بحالات مختلفة، ومنتج رخيص، عشان الناتج يبقى له معنى:

~~~text داتا إضافية
INSERT INTO users (email, name, phone) VALUES
  ('sara@example.com', 'Sara Ahmed', '01012345678'),
  ('omar@gmail.com', 'Omar', NULL);
INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'paid', 900, '2026-09-05 14:00+00' FROM users WHERE email = 'sara@example.com';
INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'cancelled', 300, '2026-08-31 22:30+00' FROM users WHERE email = 'sara@example.com';
INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'pending', 120, '2026-09-20 09:00+00' FROM users WHERE email = 'omar@gmail.com';
INSERT INTO products (name, price, stock) VALUES ('Pen', 15, 100);
~~~

[[INSERT ... SELECT]] (من درس INSERT) بيجيب الـ id بتاع اليوزر من الإيميل، لأن الـ id نوعه uuid ومش هتحفظه. والأوردرات بقت كده:

~~~text الأوردرات
      email       | id |  status   | total
------------------+----+-----------+--------
 you@example.com  |  1 | paid      |   0.00
 you@example.com  |  3 | pending   |   0.00
 you@example.com  |  4 | pending   |   0.00
 you@example.com  |  5 | paid      | 300.00
 sara@example.com |  6 | paid      | 900.00
 sara@example.com |  7 | cancelled | 300.00
 omar@gmail.com   |  8 | pending   | 120.00
(7 rows)
~~~

(الأرقام عندك ممكن تختلف شوية حسب اللي جربته في الدروس اللي فاتت؛ رقم 2 مش موجود لأنه اتحجز في تجربة ROLLBACK في درس PRIMARY KEY.)

---

## ١. عمود محسوب: فئة السعر

~~~text الأمر
SELECT name, price,
       CASE
         WHEN price < 100 THEN 'cheap'
         WHEN price < 500 THEN 'normal'
         ELSE 'premium'
       END AS price_band
FROM products;
~~~

نفكّ الـ CASE حتة حتة:

| الحتة | معناها |
|---|---|
| [[CASE]] | ابدأ الاختيار |
| [[WHEN price < 100 THEN 'cheap']] | لو الشرط ده true، القيمة [['cheap']] |
| [[WHEN price < 500 THEN 'normal']] | لو لأ، جرّب الشرط اللي بعده |
| [[ELSE 'premium']] | لو ولا شرط اتحقق |
| [[END]] | قفلة الـ CASE (إجبارية) |
| [[AS price_band]] | اسم العمود الجديد في الناتج |

الشروط بتتقري **من فوق لتحت، وأول واحد يتحقق بيكسب**. عشان كده التاني مكتوب [[price < 500]] بس، مش [[price >= 100 AND price < 500]]: لو وصلنا له يبقى الأول مكانش true، يعني السعر أصلًا 100 أو أكتر.

~~~text الناتج
  name   | price  | price_band
---------+--------+------------
 T-shirt | 250.00 | normal
 Hoodie  | 650.00 | premium
 Mug     | 120.00 | normal
 Cap     | 199.00 | normal
 Pen     |  15.00 | cheap
(5 rows)
~~~

الـ CASE كله «قيمة واحدة» لكل صف، زي أي عمود. ولاحظ إن الجدول نفسه متغيرش: العمود ده موجود في الناتج بس.

### لو الترتيب اتعكس

~~~text نفس الشروط بس 500 الأول
SELECT name, price,
       CASE
         WHEN price < 500 THEN 'normal'
         WHEN price < 100 THEN 'cheap'
         ELSE 'premium'
       END AS wrong_band
FROM products WHERE name = 'Pen';
 name | price | wrong_band
------+-------+------------
 Pen  | 15.00 | normal
(1 row)
~~~

15 أقل من 500، فأول شرط كسب، وشرط [[cheap]] عمره ما هيتقري. مفيش error، بس النتيجة غلط.

### من غير ELSE

~~~text الناتج
SELECT CASE WHEN 1 = 2 THEN 'x' END AS no_else;
 no_else
---------
 (null)
(1 row)
~~~

(شغّلنا قبلها [[\pset null '(null)']] عشان psql يكتب NULL بدل خانة فاضية.) مفيش شرط اتحقق ومفيش ELSE، فالنتيجة [[NULL]]. وده هيبقى مهم جدًا في الخطوة الجاية.

---

## ٢. عدّ وجمع مشروط جوه GROUP BY

~~~text الأمر
SELECT user_id,
       count(*) AS orders,
       count(CASE WHEN status = 'paid' THEN 1 END) AS paid,
       sum(CASE WHEN status = 'paid' THEN total ELSE 0 END) AS paid_total
FROM orders
GROUP BY user_id;
~~~

الحتة المهمة: الـ CASE **بيتحسب لكل صف الأول، وبعدين** [[count]] و [[sum]] بيجمّعوا الناتج بتاعه. خلّينا نشوف الـ CASE لوحده على كل صف قبل التجميع:

~~~text CASE لكل صف (من غير GROUP BY)
SELECT status, CASE WHEN status = 'paid' THEN 1 END AS paid_flag,
       CASE WHEN status = 'paid' THEN total ELSE 0 END AS paid_amount
FROM orders ORDER BY id;
  status   | paid_flag | paid_amount
-----------+-----------+-------------
 paid      |         1 |        0.00
 pending   |    (null) |           0
 pending   |    (null) |           0
 paid      |         1 |      300.00
 paid      |         1 |      900.00
 cancelled |    (null) |           0
 pending   |    (null) |           0
(7 rows)
~~~

- [[paid_flag]]: [[1]] للمدفوع و [[NULL]] لغيره (مفيش ELSE). و [[count(x)]] بيعدّ القيم اللي **مش NULL** بس، فبيعدّ المدفوع بس. الرقم [[1]] نفسه مش مهم؛ أي قيمة مش NULL هتتعد.
- [[paid_amount]]: [[total]] للمدفوع و [[0]] لغيره، و [[sum]] بيجمع، فالصفر مبيأثرش.

وبعد التجميع:

~~~text الناتج
               user_id                | orders | paid | paid_total
--------------------------------------+--------+------+------------
 a4a453d0-ea48-4dc5-8612-d43aa84165eb |      1 |    0 |          0
 f2a882ce-8651-45b3-a929-d1520162aa08 |      4 |    2 |     300.00
 79228952-6e10-41ed-8e0e-c1ada45f435f |      2 |    1 |     900.00
(3 rows)
~~~

- [[user_id]] uuid عشوائي، فعندك هيطلع أرقام تانية. الأول هو Omar (أوردر pending واحد)، والتاني you@example.com، والتالت Sara.
- [[orders]] = [[count(*)]]: كل الصفوف في المجموعة.
- [[paid]]: you عندها ٢ مدفوعين من ٤.
- [[paid_total]] لـ Omar طلع [[0]] مش [[0.00]]: كل اللي اتجمع عنده هو الـ [[0]] اللي في الـ ELSE (رقم من غير كسور)، مفيش ولا [[total]] بخانتين عشريتين. القيمة نفسها صفر في الحالتين.

ده اسمه **conditional aggregation**: الحالات اللي كانت صفوف بقت أعمدة جنب بعض (pivot بسيط).

### الغلطتين المشهورين

~~~text ELSE 0 جوه count
SELECT count(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS wrong_paid, count(*) FROM orders;
 wrong_paid | count
------------+-------
          7 |     7
(1 row)
~~~

[[0]] قيمة مش NULL، فـ count عدّها، والرقم بقى نفس عدد كل الأوردرات. **مع count متكتبش ELSE.**

~~~text sum من غير ELSE على صفوف ملهاش مدفوع
SELECT sum(CASE WHEN status = 'paid' THEN total END) AS no_else
FROM orders WHERE status = 'pending';
 no_else
---------

(1 row)
~~~

كل القيم NULL، و [[sum]] لقيم كلها NULL بيرجّع NULL (الخانة الفاضية). **مع sum حط ELSE 0** (أو [[COALESCE(sum(...), 0)]]).

---

## ٣. ترتيب مخصص: الخلصان في الآخر

~~~text الأمر
SELECT name, stock FROM products
ORDER BY CASE WHEN stock = 0 THEN 1 ELSE 0 END, name;
~~~

[[ORDER BY]] بيقبل أي تعبير، مش أسماء أعمدة بس. الـ CASE هنا بيدّي كل منتج «رقم ترتيب» مش ظاهر في الناتج: [[0]] للمتاح و [[1]] للخلصان. الأصغر بيطلع الأول، فالمتاح فوق. وبعد الفاصلة [[name]]: جوه كل مجموعة رتّب بالاسم. عشان نشوف الرقم المخفي، حطيناه في الـ SELECT كمان:

~~~text الناتج (ومعاه sort_key)
  name   | stock | sort_key
---------+-------+----------
 Hoodie  |     8 |        0
 Mug     |    14 |        0
 Pen     |   100 |        0
 T-shirt |    40 |        0
 Cap     |     0 |        1
(5 rows)
~~~

ونفس الحيلة تنفع لترتيب الحالات بترتيب منطقي مش أبجدي ([[pending]] ثم [[paid]] ثم [[shipped]]).

---

## ٤. تعديل كذا صف بقيم مختلفة

~~~text الأمر
UPDATE products
SET price = CASE name WHEN 'Mug' THEN 110 WHEN 'Cap' THEN 170 ELSE price END
WHERE name IN ('Mug', 'Cap');
~~~

ده الشكل التاني من CASE: [[CASE عمود WHEN قيمة THEN ...]]. معناه [[name = 'Mug']]، ثم [[name = 'Cap']]، زي [[switch]] في JavaScript.

- [[WHERE name IN ('Mug', 'Cap')]]: الأمر هيلمس الصفين دول بس.
- [[ELSE price]]: «سيب السعر زي ما هو». مش هيتنفذ هنا لأن الـ WHERE والـ CASE فيهم نفس الأسماء، بس هو اللي بيحميك لو حد زوّد اسم في الـ WHERE ونسي يزوّده في الـ CASE.

~~~text الناتج
UPDATE 2
  name   | price
---------+--------
 T-shirt | 250.00
 Mug     | 110.00
 Cap     | 170.00
 Hoodie  | 650.00
 Pen     |  15.00
(5 rows)
~~~

[[UPDATE 2]]: صفين اتعدلوا، كل واحد بسعره، في أمر واحد.

### لو نسيت ELSE price

جربناها جوه [[BEGIN]] و [[ROLLBACK]] عشان متتحفظش، وزودنا Hoodie في الـ WHERE من غير ما يبقى في الـ CASE:

~~~text الناتج
UPDATE products SET price = CASE name WHEN 'Mug' THEN 110 END WHERE name IN ('Mug', 'Hoodie');
ERROR:  null value in column "price" of relation "products" violates not-null constraint
DETAIL:  Failing row contains (10, Hoodie, null, 8, t, {}, 2026-10-07 08:33:13.949856+00, null).
~~~

Hoodie ملوش WHEN، فالـ CASE رجّع NULL، والعمود [[NOT NULL]] فالأمر كله اترفض. لو العمود كان بيقبل NULL، السعر كان هيتمسح من غير أي error.

### الشكل ده مبيعرفش NULL

~~~text الناتج
SELECT CASE NULL WHEN NULL THEN 'matched' ELSE 'no match' END AS simple_case,
       CASE WHEN NULL IS NULL THEN 'matched' END AS searched;
 simple_case | searched
-------------+----------
 no match    | matched
(1 row)
~~~

[[CASE x WHEN NULL]] معناها [[x = NULL]]، وده عمره ما بيبقى true (درس NULL). لو محتاج تطابق NULL استخدم الشكل العام بـ [[WHEN x IS NULL]].

---

## ٥. أخطاء الكتابة

~~~text نوعين مختلفين في الفروع
SELECT CASE WHEN true THEN 1 ELSE 'none' END;
ERROR:  invalid input syntax for type integer: "none"
~~~

كل الفروع لازم ترجّع نوع واحد. أول فرع رقم، فـ Postgres حاول يحوّل [['none']] لرقم وفشل.

~~~text نسيت END
SELECT name, CASE WHEN price < 100 THEN 'cheap' ELSE 'other' AS band FROM products;
ERROR:  syntax error at or near "AS"
~~~

الـ error بيشاور على [[AS]] مش على المكان اللي نسيت فيه: Postgres كان مستني [[END]] ولقى [[AS]].

---

## الخلاصة

| الاستخدام | الشكل | خلي بالك |
|---|---|---|
| عمود محسوب | [[CASE WHEN ... THEN ... ELSE ... END AS x]] | الترتيب مهم: أول شرط يتحقق بيكسب |
| عدّ مشروط | [[count(CASE WHEN ... THEN 1 END)]] | من غير ELSE |
| جمع مشروط | [[sum(CASE WHEN ... THEN x ELSE 0 END)]] | ELSE 0 وإلا NULL |
| ترتيب مخصص | [[ORDER BY CASE WHEN ... THEN 1 ELSE 0 END]] | الأصغر الأول |
| تعديل بقيم مختلفة | [[SET col = CASE name WHEN ... ELSE col END]] | ELSE col وإلا NULL |

- مفيش شرط اتحقق ومفيش ELSE: النتيجة NULL.
- كل الفروع نوع واحد، و [[END]] إجباري.
- [[CASE x WHEN NULL]] مبيطابقش أبدًا؛ استخدم [[WHEN x IS NULL]].`,
          lines: [
            "الاسم والسعر، وعمود محسوب:",
            "ابدأ الـ CASE.",
            "لو السعر أقل من ١٠٠: رخيص.",
            "غير كده لو أقل من ٥٠٠: عادي (أول شرط يتحقق هو اللي بيكسب).",
            "أي حاجة تانية: غالي.",
            "قفلة الـ CASE واسم العمود.",
            "من المنتجات.",
            "لكل يوزر:",
            "عدد كل أوردراته،",
            "وعدد المدفوع بس: CASE بترجّع 1 للمدفوع و NULL لغيره، و count بيعدّ اللي مش NULL.",
            "ومجموع المدفوع: غير المدفوع بيتحسب صفر.",
            "من الأوردرات،",
            "مجمّعة باليوزر.",
            "المنتجات ومخزونها،",
            "الخلصان (stock = 0) ياخد 1 فينزل تحت، والباقي 0 فيطلع فوق، وبعدين بالاسم.",
            "تعديل الأسعار:",
            "كل منتج بسعره الجديد، و ELSE price عشان أي صف تاني يفضل زي ما هو.",
            "على المنتجين دول بس."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT user_id,
       count(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
       count(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid,
       count(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders
GROUP BY user_id;`,
            expect: [[3,1,1,0], [2,1,1,0], [1,0,3,1]],
            solution: R`SELECT user_id,
       count(*) FILTER (WHERE status = 'pending') AS pending,
       count(*) FILTER (WHERE status = 'paid') AS paid,
       count(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled
FROM orders
GROUP BY user_id;`
          }
        },
        {
          cmd: "دوال التاريخ",
          title: "إيراد كل شهر، والشهر بتوقيت القاهرة مش UTC",
          desc: R`أغلب التقارير سؤالها «كام في اليوم أو الشهر؟». الدوال اللي هتستخدمها طول الوقت:

[[date_trunc('month', created_at)]] بيقصّ الوقت لأول الشهر، فكل أوردرات سبتمبر ياخدوا نفس القيمة وتقدر تعمل GROUP BY عليها. و [[extract(hour FROM created_at)]] بيطلّع جزء واحد (الساعة، أو يوم الأسبوع [[dow]]). و [[to_char(created_at, 'YYYY-MM')]] بيحوّل الوقت لنص بالشكل اللي انت عايزه للعرض.

والأهم: [[timestamptz]] متخزن UTC. أوردر اتعمل الساعة ١:٣٠ الفجر يوم ١ سبتمبر في القاهرة، هو في UTC الساعة ١٠:٣٠ بالليل يوم ٣١ أغسطس. لو قصّيت بالشهر من غير توقيت، الأوردر ده هيتحسب في أغسطس. [[AT TIME ZONE 'Africa/Cairo']] بيحوّل الوقت لساعة القاهرة قبل ما تقصّ.`,
          example: R`SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1 ORDER BY 1;
SELECT to_char(date_trunc('month', created_at AT TIME ZONE 'Africa/Cairo'), 'YYYY-MM') AS month,
       count(*) AS orders, sum(total) AS revenue
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1 ORDER BY 1;
SELECT extract(hour FROM created_at AT TIME ZONE 'Africa/Cairo') AS hour, count(*)
FROM orders GROUP BY 1 ORDER BY 2 DESC;
SELECT id, created_at::date AS day, now() - created_at AS age,
       to_char(created_at AT TIME ZONE 'Africa/Cairo', 'DD/MM/YYYY HH24:MI') AS cairo_time
FROM orders ORDER BY id;
SELECT count(*) FROM orders
WHERE created_at >= date_trunc('month', now()) AND created_at < date_trunc('month', now()) + interval '1 month';`,
          try: R`ضيف أوردر مدفوع وقته [['2026-08-31 22:30+00']] (يعني ١:٣٠ الفجر يوم ١ سبتمبر في القاهرة). شغّل أول استعلامين وقارن: الأوردر ده في أنهي شهر في كل واحد؟ وبعدين اكتب استعلام يطلّع أكتر يوم في الأسبوع فيه أوردرات بتوقيت القاهرة، واسم اليوم بالإنجليزي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: أكتر يوم في الأسبوع فيه أوردرات بتوقيت القاهرة: اسم اليوم بالإنجليزي من غير مسافات ([[FMDay]]) وعدد الأوردرات، صف واحد. (بتوقيت UTC الإجابة مختلفة.)`,
          sol: R`في الاستعلام الأول (من غير توقيت) الأوردر هيتحسب في [[2026-08-01]]، لأن Postgres بيقصّ الوقت بتوقيت الـ session، وفي Docker الافتراضي [[UTC]] (اتأكد بـ [[SHOW timezone;]]). في التاني هيتحسب في [[2026-09]]، لأن القاهرة في الصيف UTC+3 فالوقت بقى ١:٣٠ يوم ١ سبتمبر. يعني إيراد الشهرين اتغيّر، ورقم التقرير بتاعك كان هيختلف عن رقم المحاسب.

ولأكتر يوم في الأسبوع: [[to_char(..., 'FMDay')]] بيرجّع اسم اليوم ([[FM]] بتشيل المسافات اللي في الآخر)، و [[extract(dow ...)]] بيرجّع رقم من ٠ (الأحد) لـ ٦ (السبت). الغلطة الشائعة إنك تعمل GROUP BY على [[created_at]] نفسه فكل صف يبقى مجموعة لوحده.`,
          solCode: R`INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'paid', 500, '2026-08-31 22:30+00' FROM users LIMIT 1;

SELECT to_char(created_at AT TIME ZONE 'Africa/Cairo', 'FMDay') AS weekday,
       count(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;`,
          flag: "script",
          deep: {
            why: "«مبيعات الشهر ده» و «أكتر ساعة فيها طلبات» و «الأوردرات اللي عدّى عليها أكتر من ٣ أيام من غير شحن» أسئلة يومية. ولو حسبتها غلط بالتوقيت، أرقامك هتختلف عن أرقام البنك وبوابة الدفع، وهتقضي يوم تدوّر على الفرق.",
            how: R`[[date_trunc('day'|'week'|'month'|'year', ts)]] بيرجّع نفس النوع مقصوص. الأسبوع بيبدأ الاتنين (ISO). ومن Postgres 12 فيه شكل بتلات arguments: [[date_trunc('month', created_at, 'Africa/Cairo')]] بيقصّ بتوقيت القاهرة ويرجّع timestamptz، وده أنضف لو هتكمّل حسابات على النتيجة.

[[ts AT TIME ZONE 'Africa/Cairo']] على timestamptz بيرجّع [[timestamp]] من غير tz (الساعة على الحيطة في القاهرة). استخدم اسم المنطقة مش [['+03']]: مصر رجّعت التوقيت الصيفي من ٢٠٢٣، فالفرق بيبقى ٢ في الشتا و ٣ في الصيف، واسم المنطقة بيعرف ده لوحده.

[[extract(field FROM ts)]]: [[year]] و [[month]] و [[day]] و [[hour]] و [[dow]] و [[epoch]] (ثواني من ١٩٧٠، مفيد تحسب مدة بالثواني).

[[now() - created_at]] بيرجّع [[interval]]، و [[age()]] بيرجّع interval بالسنين والشهور. و [[created_at::date]] بياخد التاريخ بتوقيت الـ session.

[[to_char]] للعرض بس: [[YYYY]] و [[MM]] و [[DD]] و [[HH24]] و [[MI]] و [[Mon]] و [[Day]]. النتيجة نص، فلو رتّبت بيها رتّب بصيغة زي [[YYYY-MM]] اللي ترتيبها الأبجدي هو نفس الترتيب الزمني.

والفلترة بالفترة: [[created_at >= بداية AND created_at < بداية الفترة اللي بعدها]]. ده بيستخدم index على created_at. أما [[WHERE date_trunc('month', created_at) = ...]] أو [[WHERE extract(month FROM created_at) = 9]] بيحسب الدالة على كل صف ومبيستخدمش الـ index العادي.`,
            when: "أي تقرير زمني، وأي فلتر «آخر ٧ أيام» أو «الشهر ده»، وعرض الأوقات في لوحة الأدمن. والأحسن إن الـ API يرجّع الوقت ISO بـ UTC والواجهة تعرضه بتوقيت المستخدم؛ استخدم to_char في التقارير والـ exports.",
            mistakes: R`تقصّ بالشهر من غير توقيت فأوردرات أول يوم في الشهر تروح للشهر اللي قبله. تكتب [[+02]] ثابت فالصيف كله يبوظ. [[BETWEEN '2026-09-01' AND '2026-09-30']] على timestamptz: بيقف عند أول لحظة في يوم ٣٠ فيضيّع اليوم كله؛ استخدم [[>=]] و [[<]]. دالة على العمود في WHERE فالـ index ميشتغلش. و [[timestamp]] من غير tz في الجدول أصلًا، فمحدش عارف الوقت المتخزن ده بتوقيت أنهي بلد.`
          },
          teach: R`## الفكرة: الوقت متخزن UTC، والتقرير محتاج ساعة القاهرة

المثال ٥ استعلامات: إيراد كل شهر مرتين (من غير توقيت وبتوقيت القاهرة)، وأكتر ساعة فيها أوردرات، وعرض الوقت بشكل مصري، وفلتر «الشهر ده». هنشغّلهم بالترتيب ونشوف الفرق بين الأولاني والتاني بعينينا.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على أوردرات الـ lab (بالداتا الزيادة اللي ضفناها في درس CASE WHEN). وقت التشغيل كان [[2026-10-07]].

---

## ٠. توقيت الـ session

~~~text الناتج
SHOW timezone;
 TimeZone
----------
 Etc/UTC
~~~

ده التوقيت اللي Postgres بيعرض بيه الأوقات وبيحسب بيه [[date_trunc]] لو مقلتلوش غير كده. في Docker الافتراضي UTC. والأوردرات اللي عندنا:

~~~text SELECT id, status, total, created_at FROM orders ORDER BY id;
 id |  status   | total  |          created_at
----+-----------+--------+-------------------------------
  1 | paid      |   0.00 | 2026-10-07 08:33:13.919256+00
  3 | pending   |   0.00 | 2026-10-07 08:33:13.92276+00
  4 | pending   |   0.00 | 2026-10-07 08:33:13.952564+00
  5 | paid      | 300.00 | 2026-08-15 10:00:00+00
  6 | paid      | 900.00 | 2026-09-05 14:00:00+00
  7 | cancelled | 300.00 | 2026-08-31 22:30:00+00
  8 | pending   | 120.00 | 2026-09-20 09:00:00+00
~~~

[[+00]] في آخر كل وقت معناها «معروض بتوقيت UTC». والعمود نوعه [[timestamptz]]: لحظة في الزمن، وبتتخزن جوه كـ UTC دايمًا.

---

## ١. إيراد كل شهر (من غير توقيت)

~~~text الأمر
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1 ORDER BY 1;
~~~

### [[date_trunc('month', created_at)]]

trunc = truncate يعني «قصّ». الدالة بتقصّ الوقت لحد الوحدة اللي قلتلها، وكل اللي أصغر منها بيتصفّر: [['month']] يعني اليوم يبقى 1 والساعة 00:00. فكل أوردرات سبتمبر بياخدوا نفس القيمة [[2026-09-01 00:00:00+00]]، وده اللي بيخلي [[GROUP BY]] يجمّعهم مع بعض. الوحدات التانية: [['day']] و [['week']] و [['year']] و [['hour']].

### [[WHERE status IN ('paid', 'shipped')]]

الإيراد من المدفوع والمشحون بس. [[IN]] اختصار لـ [[status = 'paid' OR status = 'shipped']].

### [[GROUP BY 1 ORDER BY 1]]

الرقم [[1]] معناه «أول عمود في الـ SELECT» (هنا الشهر). بدل ما تكرر [[date_trunc('month', created_at)]] تاني. مريح، بس لو غيّرت ترتيب الأعمدة في الـ SELECT المعنى بيتغير معاه.

~~~text الناتج
         month          | revenue
------------------------+---------
 2026-08-01 00:00:00+00 |  300.00
 2026-09-01 00:00:00+00 |  900.00
 2026-10-01 00:00:00+00 |    0.00
~~~

أكتوبر [[0.00]] لأن أوردر 1 مدفوع بس الـ total بتاعه صفر (من دروس الـ lab).

---

## ٢. المشكلة: أوردر الساعة ١:٣٠ الفجر

ده الـ «جرّب» بتاع الدرس: أوردر مدفوع وقته [['2026-08-31 22:30+00']]:

~~~text الأمر
INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'paid', 500, '2026-08-31 22:30+00' FROM users WHERE email = 'you@example.com';
~~~

ونشغّل الاستعلام الأول تاني:

~~~text الناتج
         month          | revenue
------------------------+---------
 2026-08-01 00:00:00+00 |  800.00
 2026-09-01 00:00:00+00 |  900.00
 2026-10-01 00:00:00+00 |    0.00
~~~

الـ 500 راحت أغسطس (300 + 500 = 800). بس العميل دفع في القاهرة يوم ١ سبتمبر الساعة ١:٣٠ الفجر. نشوف ده بـ [[AT TIME ZONE]]:

~~~text الناتج
SELECT created_at, created_at AT TIME ZONE 'Africa/Cairo' AS cairo,
       date_trunc('month', created_at AT TIME ZONE 'Africa/Cairo') AS cairo_month,
       pg_typeof(created_at AT TIME ZONE 'Africa/Cairo')
FROM orders WHERE total = 500;
       created_at       |        cairo        |     cairo_month     |          pg_typeof
------------------------+---------------------+---------------------+-----------------------------
 2026-08-31 22:30:00+00 | 2026-09-01 01:30:00 | 2026-09-01 00:00:00 | timestamp without time zone
~~~

- [[created_at AT TIME ZONE 'Africa/Cairo']]: «اللحظة دي، الساعة كانت كام على الحيطة في القاهرة؟». الجواب ١:٣٠ يوم ١ سبتمبر، لأن مصر في سبتمبر UTC+3 (توقيت صيفي).
- [[pg_typeof]] بتقول نوع القيمة: [[timestamp without time zone]]. يعني بقى «وقت ساعة حيطة» من غير [[+00]]، والقصّ بعده بيبقى بساعة القاهرة.
- [['Africa/Cairo']] اسم منطقة من قاعدة التوقيتات العالمية (IANA). استخدمه هو مش [['+03']]: مصر بترجع UTC+2 في الشتا.

~~~text نفس الساعة UTC في الشتا والصيف
SELECT '2026-01-15 12:00+00'::timestamptz AT TIME ZONE 'Africa/Cairo' AS winter,
       '2026-07-15 12:00+00'::timestamptz AT TIME ZONE 'Africa/Cairo' AS summer;
       winter        |       summer
---------------------+---------------------
 2026-01-15 14:00:00 | 2026-07-15 15:00:00
~~~

[[::timestamptz]] معناها «حوّل النص ده لـ timestamptz» ([[::]] = cast). وشايف: نفس الـ 12:00 UTC بقت ٢ الضهر في يناير و ٣ في يوليو. اسم المنطقة عارف الفرق لوحده.

---

## ٣. التقرير الصح: بتوقيت القاهرة

~~~text الأمر
SELECT to_char(date_trunc('month', created_at AT TIME ZONE 'Africa/Cairo'), 'YYYY-MM') AS month,
       count(*) AS orders, sum(total) AS revenue
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1 ORDER BY 1;
~~~

السطر الأول متداخل، نفكّه من جوه لبرة:

| الخطوة | الحتة | الناتج للأوردر الجديد |
|---|---|---|
| ١ | [[created_at AT TIME ZONE 'Africa/Cairo']] | [[2026-09-01 01:30:00]] |
| ٢ | [[date_trunc('month', ...)]] | [[2026-09-01 00:00:00]] |
| ٣ | [[to_char(..., 'YYYY-MM')]] | النص [[2026-09]] |

[[to_char]] بتحوّل الوقت لنص بالشكل اللي تكتبه: [[YYYY]] السنة بأربع أرقام، و [[MM]] الشهر برقمين. النتيجة نص، بس الشكل [[YYYY-MM]] ترتيبه الأبجدي هو نفسه الترتيب الزمني، فـ [[ORDER BY 1]] شغال صح.

~~~text الناتج
  month  | orders | revenue
---------+--------+---------
 2026-08 |      1 |  300.00
 2026-09 |      2 | 1400.00
 2026-10 |      1 |    0.00
~~~

الـ 500 انتقلت لسبتمبر: أغسطس بقى 300 بس، وسبتمبر 900 + 500 = 1400. نفس الداتا، ورقمين مختلفين لكل شهر حسب التوقيت. التاني هو اللي المحاسب هيشوفه.

> Postgres 12 وبعده فيه كمان [[date_trunc('month', created_at, 'Africa/Cairo')]]: بيقصّ بتوقيت القاهرة ويرجّع timestamptz. على نفس الأوردر رجّع [[2026-08-31 21:00:00+00]]، وده بالظبط «أول سبتمبر في القاهرة» مكتوب بـ UTC.

---

## ٤. أكتر ساعة فيها أوردرات

~~~text الأمر
SELECT extract(hour FROM created_at AT TIME ZONE 'Africa/Cairo') AS hour, count(*)
FROM orders GROUP BY 1 ORDER BY 2 DESC;
~~~

[[extract(hour FROM ...)]] بيطلّع جزء واحد من الوقت كرقم. الأجزاء المشهورة: [[year]] و [[month]] و [[day]] و [[hour]] و [[dow]] (day of week: من 0 الأحد لـ 6 السبت) و [[epoch]] (ثواني من أول ١٩٧٠). و [[ORDER BY 2 DESC]]: رتّب بتاني عمود (العدد) من الكبير للصغير.

~~~text الناتج
 hour | count
------+-------
   11 |     3
    1 |     2
   13 |     1
   17 |     1
   12 |     1
~~~

الـ 11 هي أوردرات النهارده (8:33 UTC = 11:33 القاهرة). والساعات اللي عددها واحد ترتيبها بينها مش مضمون، لأن [[ORDER BY]] بالعدد بس.

---

## ٥. عرض كل أوردر

~~~text الأمر
SELECT id, created_at::date AS day, now() - created_at AS age,
       to_char(created_at AT TIME ZONE 'Africa/Cairo', 'DD/MM/YYYY HH24:MI') AS cairo_time
FROM orders ORDER BY id;
~~~

| الحتة | معناها |
|---|---|
| [[created_at::date]] | التاريخ بس، بتوقيت الـ session (UTC هنا) |
| [[now() - created_at]] | وقت دلوقتي ناقص وقت الأوردر = [[interval]] (مدة) |
| [[DD/MM/YYYY HH24:MI]] | اليوم/الشهر/السنة، والساعة بنظام ٢٤ ([[HH24]]) والدقايق ([[MI]]) |

~~~text الناتج
 id |    day     |           age           |    cairo_time
----+------------+-------------------------+------------------
  1 | 2026-10-07 | 00:02:32.585809         | 07/10/2026 11:33
  ...
  5 | 2026-08-15 | 52 days 22:35:46.505065 | 15/08/2026 13:00
  6 | 2026-09-05 | 31 days 18:35:46.505065 | 05/09/2026 17:00
  7 | 2026-08-31 | 36 days 10:05:46.505065 | 01/09/2026 01:30
  8 | 2026-09-20 | 16 days 23:35:46.505065 | 20/09/2026 12:00
  9 | 2026-08-31 | 36 days 10:05:46.505065 | 01/09/2026 01:30
~~~

- أوردر 9 (الجديد): [[day]] بيقول [[2026-08-31]] لأن الـ cast بتوقيت UTC، و [[cairo_time]] بيقول ١ سبتمبر. نفس الفخ تاني: [[::date]] من غير توقيت بياخد تاريخ UTC.
- [[age]]: [[52 days 22:35:46.505065]] يعني ٥٢ يوم و ٢٢ ساعة و ٣٥ دقيقة و ٤٦ ثانية وكسور. والأوردرات اللي اتعملت النهارده عمرها دقيقتين ونص بس.

### اسم اليوم و [[FM]]

[[to_char]] بيعرف يكتب أسماء الأيام كمان، بس بيكمّلها بمسافات لحد طول أطول اسم (Wednesday = ٩ حروف). حطينا [[|]] بعد النتيجة عشان المسافات تبان:

~~~text الناتج
SELECT to_char(timestamp '2026-09-05 17:00', 'Day') || '|' AS padded,
       to_char(timestamp '2026-09-05 17:00', 'FMDay') || '|' AS fm,
       extract(dow FROM timestamp '2026-09-05 17:00') AS dow;
   padded   |    fm     | dow
------------+-----------+-----
 Saturday | | Saturday| |   6
~~~

[[FM]] (fill mode) قدام أي صيغة بيشيل المسافات دي. و [[||]] بيلزق نصين (درس دوال النصوص). و [[dow]] للسبت [[6]].

---

## ٦. أوردرات الشهر ده

~~~text الأمر
SELECT count(*) FROM orders
WHERE created_at >= date_trunc('month', now()) AND created_at < date_trunc('month', now()) + interval '1 month';
~~~

نشوف الحدود نفسها:

~~~text الناتج
SELECT now(), date_trunc('month', now()) AS start, date_trunc('month', now()) + interval '1 month' AS next_start;
              now              |         start          |       next_start
-------------------------------+------------------------+------------------------
 2026-10-07 08:35:46.505669+00 | 2026-10-01 00:00:00+00 | 2026-11-01 00:00:00+00
~~~

- [[date_trunc('month', now())]]: أول الشهر الحالي.
- [[+ interval '1 month']]: زوّد شهر، يعني أول الشهر الجاي. [[interval]] نوع «مدة».
- الشرط [[>=]] البداية و [[<]] البداية الجاية: بيشمل كل لحظة في أكتوبر، ومبيلمسش أول لحظة في نوفمبر.

~~~text الناتج
 count
-------
     3
~~~

أوردرات النهارده التلاتة. والشكل ده (العمود لوحده على الشمال من غير دالة) بيقدر يستخدم index على [[created_at]]. لو كتبت [[WHERE date_trunc('month', created_at) = ...]]، Postgres لازم يحسب الدالة لكل صف.

### ليه مش BETWEEN؟

~~~text الناتج
SELECT '2026-09-30 15:00+00'::timestamptz BETWEEN '2026-09-01' AND '2026-09-30' AS between_test;
 between_test
--------------
 f
~~~

[['2026-09-30']] كتاريخ لوحده معناه أول لحظة في اليوم (00:00)، فأوردر الساعة ٣ العصر يوم ٣٠ برّه الفترة. نفس الوقت مع [[>= '2026-09-01' AND < '2026-10-01']] رجّع [[t]] (true).

---

## الخلاصة

| الدالة | بتعمل إيه | مثال من فوق |
|---|---|---|
| [[date_trunc('month', ts)]] | تقصّ لأول الشهر، للتجميع | [[2026-09-01 00:00:00+00]] |
| [[ts AT TIME ZONE 'Africa/Cairo']] | ساعة الحيطة في القاهرة | [[2026-09-01 01:30:00]] |
| [[extract(hour FROM ts)]] | جزء واحد كرقم | [[11]] |
| [[to_char(ts, 'YYYY-MM')]] | نص للعرض | [[2026-09]] |
| [[now() - ts]] | مدة ([[interval]]) | [[52 days 22:35:46]] |

- حوّل للقاهرة **قبل** ما تقصّ، وإلا أوردرات أول الشهر تروح للشهر اللي قبله.
- اسم المنطقة مش [[+03]]: مصر +2 في الشتا و +3 في الصيف.
- الفترات: [[>=]] البداية و [[<]] البداية الجاية، مش [[BETWEEN]].`,
          lines: [
            "أول كل شهر، ومجموع الإيراد:",
            "من المدفوع والمشحون،",
            "مجمّع بأول عمود (الشهر) ومترتب بيه. التقصيص هنا بتوقيت الـ session (UTC في Docker).",
            "نفس التقرير بس: حوّل للقاهرة الأول، واقصّ بالشهر، واكتبه نص زي 2026-09.",
            "وعدد الأوردرات والإيراد.",
            "نفس الفلتر.",
            "نفس التجميع والترتيب.",
            "الساعة بتوقيت القاهرة، وعدد الأوردرات فيها:",
            "مجمّعة بالساعة، والأكتر الأول.",
            "لكل أوردر: التاريخ بس، وعدّى عليه قد إيه (interval)،",
            "ووقته مكتوب بشكل مصري بتوقيت القاهرة.",
            "مترتبين بالـ id.",
            "عدد أوردرات الشهر الحالي:",
            "من أول الشهر لحد قبل أول الشهر الجاي، بشكل يستخدم الـ index."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE orders (id int PRIMARY KEY, created_at timestamptz NOT NULL);
INSERT INTO orders VALUES
  (1, '2026-08-31 22:30+00'), (2, '2026-09-07 21:15+00'), (3, '2026-09-14 23:00+00'),
  (4, '2026-09-01 10:00+00'), (5, '2026-09-21 09:00+00'), (6, '2026-09-28 12:00+00'),
  (7, '2026-09-03 12:00+00');`,
            starter: R`SELECT to_char(created_at, 'FMDay') AS day, count(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;`,
            expect: [["Tuesday",4]],
            solution: R`SELECT to_char(created_at AT TIME ZONE 'Africa/Cairo', 'FMDay') AS day, count(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;`
          }
        },
        {
          cmd: "دوال النصوص",
          title: "نضّف الإيميل، وطلّع الدومين، وركّب نص من كذا عمود",
          desc: R`الداتا اللي اليوزر بيكتبها بتيجي بمسافات زيادة وحروف كبيرة وصغيرة مخلوطة. الدوال دي بتنضّفها وتقطّعها وتركّبها:

[[lower]] و [[upper]] و [[initcap]] للحروف. [[trim]] بيشيل المسافات من الأول والآخر. [[split_part(email, '@', 2)]] بيقسم بفاصل وياخد جزء. [[concat]] و [[concat_ws]] بيركّبوا نص من كذا عمود. [[length]] بيعدّ الحروف. [[replace]] و [[regexp_replace]] للاستبدال.

والبحث بـ [[LIKE]] و [[ILIKE]] اتشرح في درسه في المستوى ده. هنا بنجهّز النص نفسه، سواء للعرض أو قبل ما تقارنه.`,
          example: R`SELECT lower(trim('  Ali@Example.COM ')) AS clean_email;
SELECT name, split_part(email, '@', 2) AS domain, length(name) AS len FROM users;
SELECT concat(name, ' <', email, '>') AS contact,
       concat_ws(' - ', name, phone, email) AS line
FROM users;
SELECT 'x' || NULL AS pipe, concat('x', NULL) AS concat_fn;
SELECT regexp_replace('010-123 45 678', '[^0-9]', '', 'g') AS digits;
SELECT initcap('ahmed mohamed'), left('Hoodie', 3), right('01012345678', 4), lpad('7', 4, '0');
SELECT length('محمد') AS chars, octet_length('محمد') AS bytes;
UPDATE users SET email = lower(trim(email)) WHERE email <> lower(trim(email));`,
          try: R`اعمل استعلام يرجّع لكل يوزر: الاسم الأول بس (قبل أول مسافة)، والدومين بتاع الإيميل، ورقم التليفون مكتوب بنجوم ماعدا آخر ٤ أرقام (زي [[*******5678]]). جرّب على يوزر تليفونه NULL وشوف بيطلع إيه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: لكل يوزر (بترتيب [[id]]): الاسم الأول بس، ودومين الإيميل، والتليفون بنجوم ماعدا آخر ٤ أرقام بنفس طوله (واللي ملوش تليفون يفضل NULL).`,
          sol: R`الاسم الأول: [[split_part(name, ' ', 1)]]، ولو الاسم كلمة واحدة بيرجّعه زي ما هو. الدومين: [[split_part(email, '@', 2)]].

والتليفون: [[lpad(right(phone, 4), length(phone), '*')]] بياخد آخر ٤ أرقام ويكمّل الشمال بنجوم لحد نفس طول الرقم الأصلي. ولليوزر اللي تليفونه NULL النتيجة NULL، لأن أي دالة على NULL بترجّع NULL (ماعدا [[concat]] و [[concat_ws]] اللي بيتجاهلوه). لو عايز نص بداله لفّها بـ [[COALESCE(..., 'no phone')]].

والغلطة الشائعة: [[replace(phone, '0', '*')]]، ده بيبدّل كل صفر في الرقم مش أول الأرقام. و [[substring]] بأرقام ثابتة بتبوظ لو الأرقام مختلفة الطول (+20 ولا 0).`,
          solCode: R`SELECT split_part(name, ' ', 1) AS first_name,
       split_part(email, '@', 2) AS domain,
       COALESCE(lpad(right(phone, 4), length(phone), '*'), 'no phone') AS masked_phone
FROM users;`,
          flag: "script",
          deep: {
            why: "«Ali@Example.com» و «ali@example.com » نفس اليوزر، بس القاعدة شايفاهم اتنين، فيعمل حسابين، أو ميعرفش يعمل login. وأي تقرير أو export محتاج يركّب اسم وتليفون في خانة واحدة، أو يخفي جزء من الرقم. الدوال دي بتعمل ده في نفس الاستعلام من غير loop في الكود.",
            how: R`[[||]] بيركّب نصين، بس لو أي طرف NULL النتيجة كلها NULL. [[concat]] بيعامل NULL كأنه نص فاضي، و [[concat_ws(فاصل, ...)]] بيحط الفاصل بين القيم ويتخطى الـ NULL خالص، فمش هتلاقي [[Ali -  - ali@...]] لما التليفون فاضي.

[[split_part(نص, فاصل, رقم)]] بيبدأ العد من 1، ولو الجزء مش موجود بيرجّع نص فاضي مش NULL. ومن Postgres 14 الرقم السالب بيعدّ من الآخر ([[-1]] آخر جزء).

[[length]] بيعدّ حروف، و [[octet_length]] بيعدّ bytes. الحرف العربي في UTF-8 بياخد ٢ byte، فـ «محمد» ٤ حروف و ٨ bytes. ده يفرق لو فيه حد أقصى بالـ bytes في حتة تانية (زي رسايل SMS).

[[regexp_replace(نص, pattern, بديل, 'g')]]: الـ [['g']] معناها كل المطابقات مش أول واحدة بس. و [[replace]] بيبدّل كل ظهور للنص حرفيًا.

[[trim]] بيشيل المسافات العادية بس. المسافات الغريبة (زي non-breaking space اللي بتيجي من copy/paste) محتاجة [[regexp_replace(x, '\s+', ' ', 'g')]] أو تنضيف في الـ validation.

أحسن مكان للتنضيف: الـ validation قبل ما الداتا تدخل (zod مثلًا بـ [[.trim().toLowerCase()]])، والـ UPDATE اللي في المثال لتنضيف الداتا القديمة مرة واحدة. ولو عايز القاعدة نفسها تمنع التكرار مهما حصل: [[UNIQUE INDEX ON users (lower(email))]] من درس constraints.`,
            when: "تنضيف الإيميلات والأسماء، وتقسيم أو تركيب أعمدة في تقرير أو export، وإخفاء بيانات حساسة في العرض، وتجهيز نص قبل البحث.",
            mistakes: R`[[||]] مع عمود ممكن يبقى NULL فيختفي السطر كله. تقارن [[email = 'Ali@x.com']] من غير lower. [[replace]] لما تقصد أول مرة بس. تنسى [['g']] في [[regexp_replace]] فيتبدّل أول حرف بس. [[WHERE lower(email) = ...]] من غير index على [[lower(email)]] فيعمل seq scan على كل اليوزرز. وتقصّ نص عربي بـ [[left(x, 50)]] وتفتكر إنه ٥٠ byte.`
          },
          teach: R`## الفكرة: نضّف، وقطّع، وركّب

كل سطر في المثال دالة (أو اتنين) على نص. هنشغّلهم بالترتيب ونشوف الناتج، ونقف عند حاجتين بيوقعوا ناس كتير: NULL مع [[||]]، والفرق بين الحروف والـ bytes في العربي.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على يوزرز الـ lab: [[you@example.com]] (من غير تليفون)، و Sara (تليفونها [[01012345678]])، و Omar (من غير تليفون).

---

## ١. [[lower(trim('  Ali@Example.COM '))]]

متداخلة، فنقراها من جوه لبرة:

1. [[trim(...)]] بيشيل المسافات من الأول والآخر بس (مش من النص).
2. [[lower(...)]] بيحوّل كل الحروف لـ small.

~~~text خطوة خطوة
SELECT trim('  Ali@Example.COM ') || '|' AS trimmed;
     trimmed
------------------
 Ali@Example.COM|

SELECT lower(trim('  Ali@Example.COM ')) AS clean_email;
   clean_email
-----------------
 ali@example.com
~~~

حطينا [[|]] في الآخر عشان تشوف إن المسافة اللي قبلها اتشالت. ([[||]] بيلزق نصين، وهنرجعله في خطوة ٣.)

---

## ٢. [[split_part]] و [[length]]

~~~text الأمر
SELECT name, split_part(email, '@', 2) AS domain, length(name) AS len FROM users;
~~~

[[split_part(نص, فاصل, رقم)]]: قسّم النص عند الفاصل، وهات الجزء رقم كذا. [[you@example.com]] بيتقسم عند [[@]] لـ [[you]] (الجزء 1) و [[example.com]] (الجزء 2). العد بيبدأ من 1 مش 0. و [[length]] بيعدّ الحروف.

~~~text الناتج
    name    |   domain    | len
------------+-------------+-----
 Ali        | example.com |   3
 Sara Ahmed | example.com |  10
 Omar       | gmail.com   |   4
~~~

[[Sara Ahmed]] طولها 10: المسافة اللي في النص حرف كمان.

وحالتين على الهامش:

~~~text الناتج
SELECT split_part('a@b', '@', 3) = '' AS empty_not_null, split_part('a.b.c', '.', -1) AS last_part;
 empty_not_null | last_part
----------------+-----------
 t              | c
~~~

- جزء مش موجود (التالت في [[a@b]]) بيرجّع نص فاضي [['']] مش NULL.
- الرقم السالب بيعدّ من الآخر: [[-1]] آخر جزء (من Postgres 14).

---

## ٣. تركيب نص من كذا عمود

~~~text الأمر
SELECT concat(name, ' <', email, '>') AS contact,
       concat_ws(' - ', name, phone, email) AS line
FROM users;
~~~

- [[concat(a, b, c, ...)]]: لزّق كل اللي جواها ورا بعض.
- [[concat_ws(فاصل, a, b, ...)]]: ws = with separator. أول argument هو الفاصل، وبيتحط **بين** القيم.

~~~text الناتج
            contact            |                    line
-------------------------------+---------------------------------------------
 Ali <you@example.com>         | Ali - you@example.com
 Sara Ahmed <sara@example.com> | Sara Ahmed - 01012345678 - sara@example.com
 Omar <omar@gmail.com>         | Omar - omar@gmail.com
~~~

بص على Ali و Omar في عمود [[line]]: التليفون NULL، فـ [[concat_ws]] اتخطاه هو والفاصل بتاعه. مفيش [[Ali -  - you@...]].

### الفرق مع [[||]]

~~~text الناتج (بعد \pset null '(null)')
SELECT 'x' || NULL AS pipe, concat('x', NULL) AS concat_fn;
  pipe  | concat_fn
--------+-----------
 (null) | x
~~~

[[||]] مع NULL بيرجّع NULL كله. و [[concat]] بيعامل NULL كأنه نص فاضي. على الجدول نفسه:

~~~text الناتج
SELECT name || ' - ' || phone AS with_pipe FROM users;
        with_pipe
--------------------------
 (null)
 Sara Ahmed - 01012345678
 (null)
~~~

اسم Ali و Omar اختفوا خالص لأن التليفون فاضي. ده الفخ: عمود واحد ممكن يبقى NULL بيمسح السطر كله.

---

## ٤. [[regexp_replace('010-123 45 678', '[^0-9]', '', 'g')]]

بدّل كل حاجة بتطابق pattern بحاجة تانية:

| الحتة | معناها |
|---|---|
| [['010-123 45 678']] | النص الأصلي |
| [['[^0-9]']] | الـ pattern: [[[0-9]]] أي رقم، و [[^]] جوه القوسين معناها «مش». يعني أي حرف مش رقم |
| [['']] | البديل: ولا حاجة، يعني امسحه |
| [['g']] | global: كل المطابقات، مش أول واحدة بس |

~~~text الناتج
   digits
-------------
 01012345678
~~~

ومن غير [['g']]:

~~~text الناتج
SELECT regexp_replace('010-123 45 678', '[^0-9]', '') AS no_g;
     no_g
---------------
 010123 45 678
~~~

أول [[-]] بس اتشال، والمسافات فضلت.

---

## ٥. دوال صغيرة في سطر واحد

~~~text الأمر
SELECT initcap('ahmed mohamed'), left('Hoodie', 3), right('01012345678', 4), lpad('7', 4, '0');
~~~

| الدالة | بتعمل إيه | الناتج |
|---|---|---|
| [[initcap('ahmed mohamed')]] | أول حرف من كل كلمة كبير | [[Ahmed Mohamed]] |
| [[left('Hoodie', 3)]] | أول ٣ حروف | [[Hoo]] |
| [[right('01012345678', 4)]] | آخر ٤ حروف | [[5678]] |
| [[lpad('7', 4, '0')]] | كمّل من الشمال بـ [['0']] لحد ما الطول يبقى ٤ | [[0007]] |

~~~text الناتج
    initcap    | left | right | lpad
---------------+------+-------+------
 Ahmed Mohamed | Hoo  | 5678  | 0007
~~~

[[lpad]] = left pad، وأختها [[rpad]] بتكمّل من اليمين. مفيدين لأرقام فواتير زي [[INV-0007]]، أو لإخفاء جزء من رقم.

---

## ٦. [[length]] و [[octet_length]] على العربي

~~~text الناتج
SELECT length('محمد') AS chars, octet_length('محمد') AS bytes;
 chars | bytes
-------+-------
     4 |     8
~~~

[[length]] بيعدّ **حروف** (٤)، و [[octet_length]] بيعدّ **bytes** (octet = ٨ bits = byte). القاعدة متخزنة بـ UTF-8، والحرف العربي فيه بياخد ٢ byte، والحرف الإنجليزي byte واحد. فلو فيه حد أقصى بالـ bytes في حتة (SMS، أو API تاني)، [[length]] مش هو اللي يتقاس بيه.

---

## ٧. تنضيف الداتا القديمة مرة واحدة

عشان نشوف السطر الأخير بيعمل حاجة، ضفنا يوزر إيميله متكتب وحش:

~~~text الناتج
INSERT INTO users (email, name) VALUES ('  Mona@Example.COM ', 'Mona');
INSERT 0 1
~~~

~~~text الأمر
UPDATE users SET email = lower(trim(email)) WHERE email <> lower(trim(email));
~~~

- [[SET email = lower(trim(email))]]: الإيميل الجديد هو النسخة النضيفة من القديم.
- [[WHERE email <> lower(trim(email))]]: بس الصفوف اللي النسخة النضيفة فيها مختلفة ([[<>]] = لا يساوي). من غيره كل الصفوف هتتكتب من جديد على الفاضي.

~~~text الناتج
UPDATE 1
~~~

صف Mona بس اتعدل وبقى [[mona@example.com]]. ولو شغّلت نفس الأمر تاني:

~~~text الناتج
UPDATE 0
~~~

مفيش حاجة محتاجة تنضيف. الأمر ده آمن تشغّله أكتر من مرة.

> لو كان فيه يوزرين إيميلهم بعد التنضيف واحد، الـ UPDATE كان هيترفض بـ duplicate key، لأن [[email]] عليه [[UNIQUE]]. وقتها لازم تقرر الأول مين فيهم الحقيقي.

---

## الخلاصة

| الدالة | لـ إيه |
|---|---|
| [[trim]] و [[lower]] و [[upper]] و [[initcap]] | تنضيف وتوحيد الحروف |
| [[split_part]] و [[left]] و [[right]] | تقطيع |
| [[concat]] و [[concat_ws]] و [[||]] | تركيب |
| [[replace]] و [[regexp_replace]] | استبدال (حرفي، أو بـ pattern) |
| [[lpad]] و [[rpad]] | تكميل لطول معين |
| [[length]] و [[octet_length]] | حروف و bytes |

- [[||]] مع NULL = NULL؛ [[concat]] و [[concat_ws]] بيتجاهلوه.
- [[regexp_replace]] من غير [['g']] بيبدّل أول مطابقة بس.
- [[split_part]] بيعدّ من 1، والجزء الناقص نص فاضي مش NULL.
- العربي: حرف = ٢ byte.`,
          lines: [
            "شيل المسافات وحوّل لحروف صغيرة: ali@example.com.",
            "الدومين من الإيميل (الجزء التاني بعد @) وطول الاسم.",
            "ركّب نص: الاسم وجنبه الإيميل بين < >،",
            "وسطر فيه الاسم والتليفون والإيميل بينهم « - »، والـ NULL بيتشال.",
            "من اليوزرز.",
            "الفرق: || مع NULL بيطلع NULL، و concat بيتجاهله فيطلع x.",
            "سيب الأرقام بس: 01012345678.",
            "أول حرف كبير، وأول ٣ حروف، وآخر ٤، وتكميل بأصفار من الشمال: 0007.",
            "٤ حروف، بس ٨ bytes في UTF-8.",
            "نضّف الإيميلات القديمة مرة واحدة، والصفوف اللي محتاجة بس."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');`,
            starter: R`SELECT name, email, phone
FROM users
ORDER BY id;`,
            expect: [["Sara","example.com","*******5678"], ["Ali","shop.eg",null], ["Mona","example.com","0100"], ["Omar","gmail.com",null]],
            solution: R`SELECT split_part(name, ' ', 1) AS first_name,
       split_part(email, '@', 2) AS domain,
       lpad(right(phone, 4), length(phone), '*') AS phone
FROM users
ORDER BY id;`,
            ordered: true
          }
        }
      ]
    },
    {
      t: "العلاقات بين الجداول",
      l: 2,
      n: "الداتا الحقيقية مرتبطة ببعض: يوزر ليه أوردرات، وأوردر فيه منتجات. والـ foreign key هو الخيط اللي بيربط",
      items: [
        {
          cmd: "one-to-many",
          title: "يوزر واحد ليه أوردرات كتير",
          desc: R`أشهر علاقة: صف في جدول يقابله صفوف كتير في جدول تاني. اليوزر ليه أوردرات كتير، والأوردر بتاع يوزر واحد. بتتعمل بعمود في جدول «الكتير» بيشاور على الـ primary key بتاع «الواحد»: [[orders.user_id]] بيشاور على [[users.id]].

و [[FOREIGN KEY ... REFERENCES]] بيخلي القاعدة تتأكد إن الـ user_id ده موجود فعلًا في users، فمفيش أوردر ليوزر مش موجود. في جدول جديد بتكتبه في التعريف على طول: [[user_id uuid NOT NULL REFERENCES users (id)]].`,
          example: R`ALTER TABLE orders
  ADD CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id);
CREATE INDEX orders_user_id_idx ON orders (user_id);
INSERT INTO orders (user_id) VALUES (gen_random_uuid());     -- error: violates foreign key constraint
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com');`,
          try: R`حاول تمسح اليوزر اللي ليه أوردرات: [[DELETE FROM users WHERE email = 'you@example.com']]. اقرا الـ error، وده موضوع درس ON DELETE.`,
          flag: "script",
          deep: {
            why: "من غير foreign key، الكود ممكن يعمل أوردر بـ user_id غلط، أو يمسح يوزر ويسيب أوردراته «يتيمة» بتشاور على حاجة مش موجودة. بعد سنة هتلاقي تقارير فيها أرقام ملهاش صاحب ومحدش عارف جت منين.",
            how: R`العمود دايمًا في ناحية «الكتير». عكس كده (لستة order_ids جوه users) بيكسر أول قاعدة في التصميم: كل خانة فيها قيمة واحدة.

الـ foreign key بيتنفذ بـ triggers داخلية. مع كل INSERT أو UPDATE على orders، Postgres بيدوّر على الـ id في users (سريع، لأنه primary key عليه index). ومع كل DELETE من users، بيدوّر في orders على صفوف بتشاور عليه. وهنا المشكلة: Postgres مش بيعمل index على عمود الـ foreign key لوحده، فمن غير [[orders_user_id_idx]] كل مسح يوزر وكل [[WHERE user_id = ...]] بيقرا جدول الأوردرات كله. التفاصيل في تاب PostgreSQL درس «الـ indexes».

في Prisma العلاقة بتتكتب [[@relation(fields: [userId], references: [id])]]، و Prisma بيعمل الـ FOREIGN KEY في الـ migration.`,
            when: "كل مرة جدول بيشاور على صف في جدول تاني. ومعاه index على عمود الـ FK، إلا لو الجدول صغير جدًا.",
            mistakes: R`تشيل الـ FK «عشان المرونة» فتتراكم صفوف يتيمة. FK من غير index. تربط بالإيميل بدل الـ id، فلما الإيميل يتغير الربط يتقطع. وفي مشروع حقيقي كان جدول المدفوعات مربوط «polymorphic» بعمودين: [[paymentableId]] و [[paymentableType]] (أوردر ولا اشتراك). مفيش FK حقيقي ينفع يتعمل على ده، فالقاعدة مش بتحمي الربط، والـ ORM ميعرفش يعمل include، والنتيجة N+1 (درس N+1 في المستوى التالت).`
          },
          teach: R`## الفكرة: عمود في «الكتير» بيشاور على «الواحد»

كل أوردر فيه عمود [[user_id]] شايل الـ id بتاع صاحبه. ده لوحده بيعمل العلاقة. اللي المثال بيزوّده إن القاعدة **تتأكد** إن الـ id ده موجود فعلًا (foreign key)، وإن البحث بيه يبقى سريع (index).

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. إضافة الـ foreign key

~~~text الأمر
ALTER TABLE orders
  ADD CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id);
~~~

| الحتة | معناها |
|---|---|
| [[ALTER TABLE orders]] | عدّل جدول موجود (مش هنعمله من الأول) |
| [[ADD CONSTRAINT orders_user_fk]] | ضيف شرط، واسمه [[orders_user_fk]] (fk = foreign key) |
| [[FOREIGN KEY (user_id)]] | العمود اللي في الجدول ده |
| [[REFERENCES users (id)]] | لازم قيمته تبقى موجودة في [[users.id]] |

اسم الـ constraint انت اللي اخترته عشان يبقى مفهوم في رسايل الـ error. لو مكتبتهوش، Postgres كان هيسميه [[orders_user_id_fkey]].

~~~text الناتج
ALTER TABLE
~~~

لو فيه أوردر قديم [[user_id]] بتاعه مش موجود في users، الأمر ده كان هيفشل، لأن Postgres بيراجع الصفوف الموجودة كلها وهو بيضيف الشرط.

---

## ٢. [[CREATE INDEX orders_user_id_idx ON orders (user_id);]]

[[CREATE INDEX اسم ON جدول (عمود)]]: اعمل فهرس على العمود ده. الفهرس زي فهرس الكتاب: بدل ما تقلّب كل الصفحات تدوّر على يوزر، بتروح لمكانه على طول.

ليه نعمله بإيدنا؟ لأن Postgres بيعمل index لوحده على الـ PRIMARY KEY و UNIQUE بس، **مش** على عمود الـ foreign key. شوف الجدولين:

~~~text \d orders
                                    Table "public.orders"
   Column   |           Type           | Collation | Nullable |           Default
------------+--------------------------+-----------+----------+------------------------------
 id         | bigint                   |           | not null | generated always as identity
 user_id    | uuid                     |           | not null |
 status     | text                     |           | not null | 'pending'::text
 total      | numeric(10,2)            |           | not null | 0
 created_at | timestamp with time zone |           | not null | now()
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
    "orders_user_id_idx" btree (user_id)
Foreign-key constraints:
    "orders_user_fk" FOREIGN KEY (user_id) REFERENCES users(id)
~~~

- [[orders_user_id_idx]] هو اللي لسه عاملينه. من غيره السطر ده مش هيبقى موجود.
- [[Foreign-key constraints]]: الشرط اللي ضفناه.
- [[btree]]: نوع الـ index الافتراضي (شجرة مترتبة)، والتفاصيل في درس B-tree index.

وفي الناحية التانية:

~~~text \d users (آخره)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_fk" FOREIGN KEY (user_id) REFERENCES users(id)
~~~

[[Referenced by]]: «فيه جدول بيشاور عليّا». ده اللي هيمنع مسح اليوزر بعد شوية.

---

## ٣. أوردر ليوزر مش موجود

~~~text الأمر
INSERT INTO orders (user_id) VALUES (gen_random_uuid());
~~~

[[gen_random_uuid()]] بيولّد uuid جديد عشوائي، يعني أكيد مش id ليوزر عندنا.

~~~text الناتج
ERROR:  insert or update on table "orders" violates foreign key constraint "orders_user_fk"
DETAIL:  Key (user_id)=(ea42cd2a-ca06-4d23-8859-5f7fea41cafb) is not present in table "users".
~~~

- [[insert or update on table "orders"]]: الشرط بيتفحص مع أي INSERT أو UPDATE على الجدول «الكتير».
- [[is not present in table "users"]]: القيمة دي ملهاش صاحب.

> الـ INSERT الفاشل ده حجز رقم id من الـ identity واتحرق، فالأوردر الجاي هياخد الرقم اللي بعده. ده طبيعي، والأرقام مش لازم تبقى ورا بعض.

---

## ٤. أوردرات يوزر معين

~~~text الأمر
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com');
~~~

الاستعلام اللي بين القوسين بيتنفذ الأول ويرجّع قيمة واحدة: الـ id بتاع اليوزر.

~~~text الاستعلام الداخلي لوحده
SELECT id FROM users WHERE email = 'you@example.com';
                  id
--------------------------------------
 f2a882ce-8651-45b3-a929-d1520162aa08
~~~

وبعدين الخارجي بيبقى كأنه [[WHERE user_id = 'f2a882ce-...']]. وده بالظبط البحث اللي الـ index اتعمل عشانه.

~~~text الناتج
 id | total
----+--------
  3 |   0.00
  4 |   0.00
  1 |   0.00
  5 | 300.00
  9 | 500.00
(5 rows)
~~~

الترتيب مش بالـ id لأننا مكتبناش [[ORDER BY]]، فالترتيب أي حاجة Postgres لقاها أسهل. (الـ id 9 هو أوردر الـ 500 من درس دوال التاريخ.)

لو الإيميل مش موجود، الاستعلام الداخلي بيرجّع NULL، و [[user_id = NULL]] مش true أبدًا، فالناتج [[(0 rows)]] من غير error.

---

## ٥. الـ «جرّب»: امسح يوزر ليه أوردرات

~~~text الناتج
DELETE FROM users WHERE email = 'you@example.com';
ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"
DETAIL:  Key (id)=(f2a882ce-8651-45b3-a929-d1520162aa08) is still referenced from table "orders".
~~~

نفس الـ constraint بيشتغل من الناحية التانية: [[is still referenced]] يعني «لسه فيه أوردرات بتشاور عليه». اليوزر متمسحش، والأوردرات مفضلتش يتيمة. وعشان Postgres يعرف ده، دوّر في orders على [[user_id]] ده، وهنا تاني الـ index بيفرق في جدول كبير.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| العلاقة | عمود [[user_id]] في جدول «الكتير» | كل أوردر يعرف صاحبه |
| الحماية | [[FOREIGN KEY (user_id) REFERENCES users (id)]] | مفيش أوردر ليوزر مش موجود، ولا يوزر يتمسح وسايب أوردرات |
| السرعة | [[CREATE INDEX ... ON orders (user_id)]] | Postgres مش بيعمله لوحده |

- الـ FK بيتفحص في الاتجاهين: INSERT/UPDATE على الابن، و DELETE/UPDATE على الأب.
- اسم الـ constraint بيظهر في الـ error، فسمّيه اسم مفهوم.
- عمل إيه وقت مسح الأب؟ الافتراضي «ارفض»، والباقي في درس ON DELETE.`,
          lines: [
            "عدّل جدول الأوردرات:",
            "ضيف foreign key: user_id لازم يبقى id موجود في users.",
            "index على عمود الـ FK (Postgres مش بيعمله لوحده).",
            "أوردر ليوزر مش موجود: مرفوض.",
            "أوردرات يوزر معين،",
            "والـ id جاي من استعلام بالإيميل."
          ],
          sol: R`هتاخد [[ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"]] ومعاه [[DETAIL:  Key (id)=(...) is still referenced from table "orders".]]. اليوزر متمسحش، لأن الافتراضي في أي FK هو [[NO ACTION]]: مينفعش تمسح أب ليه ولاد.

ده بالظبط اللي انت عايزه في الأوردرات: مسح يوزر مينفعش يمسح تاريخ مبيعات بالغلط. الاختيارات التانية (CASCADE أو SET NULL أو soft delete) في درس ON DELETE. لو المسح نجح، يبقى الـ ALTER TABLE اللي بيضيف الـ FK مكملش (غالبًا فيه أوردر قديم بـ user_id مش موجود في users، فالـ constraint اترفض)؛ اقرا الـ error بتاعه.`,
          solCode: R`DELETE FROM users WHERE email = 'you@example.com';
-- ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"`
        },
        {
          cmd: "many-to-many",
          title: "أوردر فيه منتجات كتير، ومنتج في أوردرات كتير",
          desc: R`لما الطرفين «كتير»، مينفعش عمود واحد يربطهم. الحل جدول وسيط (join table) كل صف فيه بيربط أوردر بمنتج: [[order_items]]. والجدول ده المكان الطبيعي لأي معلومة تخص العلاقة نفسها: الكمية، والسعر وقت الشرا.

الـ primary key هنا مركب من العمودين [[(order_id, product_id)]]، فنفس المنتج مايتكررش في نفس الأوردر مرتين.`,
          example: R`CREATE TABLE order_items (
  order_id   bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id bigint NOT NULL REFERENCES products (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE INDEX order_items_product_idx ON order_items (product_id);
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';`,
          try: R`كرر نفس الـ INSERT: هتاخد duplicate key لأن المنتج موجود في الأوردر ده. وبعدين غيّر سعر الـ Mug في products، وشوف إن [[unit_price]] في البند متغيرش.`,
          flag: "script",
          deep: {
            why: "الحل اللي الناس بتعمله أول مرة: عمود [[product_ids]] فيه [['1,5,9']]. ده مينفعش تعمل عليه JOIN، ولا FK، ولا index، ولا تحط جنبه كمية لكل منتج. الجدول الوسيط بيحوّل العلاقة لصفوف عادية تستعلم عليها زي أي حاجة.",
            how: R`كل صف في order_items فيه foreign key لكل ناحية. الـ primary key المركب [[(order_id, product_id)]] بيعمل index بالترتيب ده، فبيخدم «بنود أوردر معين» ([[WHERE order_id = ?]]). بس «الأوردرات اللي فيها منتج معين» محتاجة index تاني على [[product_id]] لوحده، وده اللي عملناه.

[[unit_price]] متكرر من products عن قصد: ده السعر اللي اليوزر دفعه فعلًا، ولازم يفضل ثابت حتى لو السعر اتغير بكرة (درس denormalization).

في Prisma فيه نوعين: implicit (بتكتب لستة المنتجات في Order ولستة الأوردرات في Product، و Prisma يعمل جدول مخفي فيه الـ ids بس)، و explicit (بتكتب model للجدول الوسيط زي [[OrderItem]]). أول ما العلاقة يبقى ليها معلومة (كمية، سعر، تاريخ)، لازم explicit.`,
            when: "أوردرات ومنتجات، طلاب وكورسات، بوستات و tags، يوزرز وأدوار. أي «كتير لكتير».",
            mistakes: R`ids مفصولة بكومة في عمود نص. array column من غير FK. تنسى unit_price وتحسب الفواتير القديمة بالسعر الحالي. وتنسى index على العمود التاني في المفتاح المركب.`
          },
          teach: R`## الفكرة: جدول في النص، كل صف فيه «أوردر + منتج»

أوردر فيه منتجات كتير، ومنتج بيتباع في أوردرات كتير. مينفعش عمود [[product_id]] واحد في orders، ولا [[order_id]] واحد في products. الحل جدول تالت [[order_items]]: كل صف فيه بيقول «في الأوردر ده، المنتج ده، بالكمية دي، بالسعر ده».

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. تعريف الجدول الوسيط سطر سطر

~~~text الأمر
CREATE TABLE order_items (
  order_id   bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id bigint NOT NULL REFERENCES products (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
~~~

### [[order_id bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE]]

- [[bigint]]: نفس نوع [[orders.id]]. عمود الـ FK لازم يبقى بنفس نوع اللي بيشاور عليه.
- [[REFERENCES orders (id)]]: foreign key مكتوب جوه تعريف العمود على طول (شكل مختصر من اللي في درس one-to-many).
- [[ON DELETE CASCADE]]: لو الأوردر اتمسح، امسح بنوده معاه. (التفاصيل في درس ON DELETE.)

### [[product_id bigint NOT NULL REFERENCES products (id)]]

FK للناحية التانية. من غير ON DELETE، يعني الافتراضي: مسح منتج ليه بنود هيترفض.

### [[quantity integer NOT NULL CHECK (quantity > 0)]]

[[CHECK (شرط)]]: أي صف لازم يحقق الشرط ده. كمية صفر أو بالسالب مالهاش معنى.

### [[unit_price numeric(10,2) NOT NULL]]

السعر **وقت الشرا**. [[numeric(10,2)]]: لحد ١٠ أرقام، منهم ٢ بعد العلامة (درس numeric للفلوس).

### [[PRIMARY KEY (order_id, product_id)]]

primary key **مركب** من عمودين: الاتنين مع بعض لازم يبقوا فريدين. يعني الأوردر 1 ينفع يبقى فيه منتج 8 ومنتج 10، ومنتج 8 ينفع يبقى في أوردر 1 وأوردر 5، بس **(1، 8)** مينفعش يتكرر.

~~~text \d order_items
                 Table "public.order_items"
   Column   |     Type      | Collation | Nullable | Default
------------+---------------+-----------+----------+---------
 order_id   | bigint        |           | not null |
 product_id | bigint        |           | not null |
 quantity   | integer       |           | not null |
 unit_price | numeric(10,2) |           | not null |
Indexes:
    "order_items_pkey" PRIMARY KEY, btree (order_id, product_id)
    "order_items_product_idx" btree (product_id)
Check constraints:
    "order_items_quantity_check" CHECK (quantity > 0)
Foreign-key constraints:
    "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
~~~

الأسامي اللي Postgres اختارها لوحده: [[_pkey]] للـ primary key، و [[_check]] للـ CHECK، و [[_fkey]] للـ foreign keys. هتشوفهم في رسايل الـ error.

---

## ٢. [[CREATE INDEX order_items_product_idx ON order_items (product_id);]]

الـ primary key المركب عمل index على [[(order_id, product_id)]] **بالترتيب ده**. زي دليل تليفون مترتب بالاسم الأول وبعدين الأخير: سهل تدوّر بالاسم الأول، بس صعب تدوّر بالأخير لوحده.

| السؤال | الـ index اللي بيخدمه |
|---|---|
| بنود أوردر معين ([[WHERE order_id = 1]]) | [[order_items_pkey]] |
| الأوردرات اللي فيها منتج معين ([[WHERE product_id = 8]]) | [[order_items_product_idx]] (اللي عملناه) |

---

## ٣. إضافة بند

~~~text الأمر
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';
~~~

الـ [[SELECT]] بيبني الصف اللي هيتضاف: [[1]] ثابت (رقم الأوردر)، و [[id]] و [[price]] من صف الـ Mug، و [[2]] الكمية. نشوفه لوحده الأول:

~~~text الناتج
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';
 ?column? | id | ?column? | price
----------+----+----------+--------
        1 |  8 |        2 | 110.00
~~~

[[?column?]] اسم أي عمود ملوش اسم (رقم ثابت من غير [[AS]]). الـ Mug عندنا id بتاعه 8 وسعره 110 (من درس CASE WHEN). والـ INSERT بياخد الأعمدة بالترتيب ويحطها في [[(order_id, product_id, quantity, unit_price)]]:

~~~text الناتج
INSERT 0 1

SELECT * FROM order_items;
 order_id | product_id | quantity | unit_price
----------+------------+----------+------------
        1 |          8 |        2 |     110.00
~~~

السعر اتنسخ من products **في اللحظة دي**. ده المقصود.

---

## ٤. الـ «جرّب»: نفس البند تاني

~~~text الناتج
ERROR:  duplicate key value violates unique constraint "order_items_pkey"
DETAIL:  Key (order_id, product_id)=(1, 8) already exists.
~~~

الـ primary key المركب رفض. لو العميل عايز Mug كمان، بتزوّد [[quantity]] في نفس الصف، مش بتضيف صف تاني.

وكمية صفر (جربناها على Hoodie):

~~~text الناتج
ERROR:  new row for relation "order_items" violates check constraint "order_items_quantity_check"
DETAIL:  Failing row contains (1, 10, 0, 650.00).
~~~

---

## ٥. السعر اتغير، الفاتورة لأ

~~~text الأمر
UPDATE products SET price = 140 WHERE name = 'Mug';
SELECT oi.unit_price, p.price
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE p.name = 'Mug';
~~~

[[oi]] و [[p]] أسماء مختصرة (aliases) للجدولين، و [[JOIN ... ON]] بيحط كل بند جنب المنتج بتاعه (درس INNER JOIN).

~~~text الناتج
 unit_price | price
------------+--------
     110.00 | 140.00
~~~

البند لسه 110 (اللي العميل دفعه)، والمنتج بقى 140 (السعر الحالي). لو كنت حسبت الفاتورة من [[products.price]]، كل فاتورة قديمة كانت هتتغير مع كل تعديل سعر.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| جدول [[order_items]] | صف لكل (أوردر، منتج) |
| FK لكل ناحية | مفيش بند لأوردر أو منتج مش موجود |
| [[PRIMARY KEY (order_id, product_id)]] | المنتج مرة واحدة في الأوردر، و index للبحث بالأوردر |
| index على [[product_id]] | البحث من الناحية التانية |
| [[quantity]] و [[unit_price]] | معلومات العلاقة نفسها، مكانها الجدول الوسيط |

- عمود فيه [['1,5,9']] مش علاقة: مفيش FK ولا JOIN ولا كمية.
- [[unit_price]] نسخة مقصودة من السعر وقت الشرا.`,
          lines: [
            "الجدول الوسيط بين الأوردرات والمنتجات.",
            "FK للأوردر، ولو الأوردر اتمسح بنوده تتمسح معاه.",
            "FK للمنتج.",
            "الكمية لازم أكبر من صفر.",
            "السعر وقت الشرا، متنسخ من products.",
            "المفتاح المركب: المنتج مرة واحدة في كل أوردر.",
            "قفلة التعريف.",
            "index للناحية التانية: الأوردرات اللي فيها منتج معين.",
            "ضيف بند:",
            "لأوردر 1، منتج Mug، كمية ٢، والسعر من جدول المنتجات نفسه."
          ],
          sol: R`التكرار هيترفض: [[duplicate key value violates unique constraint "order_items_pkey"]] مع [[Key (order_id, product_id)=(1, 8) already exists.]] (الـ 8 هو id الـ Mug لو ماشي مع الـ lab بالترتيب، وممكن يختلف عندك). الـ PRIMARY KEY المركب معناه إن المنتج يظهر مرة واحدة في الأوردر؛ لو العميل عايز تاني بتزوّد [[quantity]] مش بتضيف صف.

بعد [[UPDATE products SET price = 140 WHERE name = 'Mug']]، الـ join هيوريك [[unit_price]] في البند لسه بالسعر القديم و [[price]] في products بالجديد. ده مقصود: البند بيحفظ السعر وقت الشراء، والفاتورة القديمة متتغيرش لما المنتج يغلى. الغلطة الشائعة إنك تحسب total الأوردر من [[products.price]] بدل [[order_items.unit_price]].`,
          solCode: R`UPDATE products SET price = 140 WHERE name = 'Mug';
SELECT oi.unit_price, p.price
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE p.name = 'Mug';   -- unit_price القديم، price الجديد`
        },
        {
          cmd: "one-to-one",
          title: "بيانات إضافية لصف واحد في جدول تاني",
          desc: R`كل صف في جدول يقابله صف واحد بالكتير في جدول تاني: يوزر وبروفايل، أو أوردر وشحنة. بتتعمل بـ foreign key عليه [[UNIQUE]]، أو أنضف: الـ primary key للجدول التاني هو نفسه الـ foreign key.

وده بالظبط شكل Supabase: [[auth.users]] جدول بتاع Supabase مش بتاعك، فبتعمل [[public.profiles]] والـ id بتاعه هو id اليوزر.`,
          example: R`CREATE TABLE profiles (
  user_id    uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  avatar_url text,
  bio        text
);
CREATE TABLE shipments (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id bigint NOT NULL UNIQUE REFERENCES orders (id),
  tracking text
);`,
          try: R`ضيف بروفايل ليوزر، وبعدين حاول تضيف بروفايل تاني لنفس اليوزر. وشيل [[UNIQUE]] من shipments وشوف إن الأوردر بقى ينفع يبقى ليه شحنتين: العلاقة بقت one-to-many من غير ما تاخد بالك.`,
          flag: "script",
          deep: {
            why: "مش كل معلومة مكانها الجدول الأساسي. البروفايل اختياري وليه صلاحيات مختلفة (عام، والإيميل خاص)، والشحنة مش موجودة لحد ما الأوردر يتشحن. الفصل بيخلي الجدول الأساسي نضيف، من غير عشرين عمود NULL.",
            how: R`اللي بيخلي العلاقة one-to-one هو الـ UNIQUE على عمود الـ FK (أو إنه primary key). من غيره هي one-to-many عادي.

أسباب منطقية للفصل: الداتا اختيارية، أو صلاحيات مختلفة (في Supabase: RLS على profiles تسمح للكل يقرا، و auth.users محدش يلمسه)، أو أعمدة تقيلة بتتقري نادرًا، أو الجدول الأصلي مش ملكك.

لو مفيش سبب من دول، ضيف الأعمدة في نفس الجدول؛ الفصل من غير سبب معناه JOIN زيادة في كل استعلام.

وفي Supabase النمط المشهور: trigger على [[auth.users]] بعد الـ INSERT بيعمل صف في profiles أوتوماتيك، بـ function نوعها [[security definer]].`,
            when: "بيانات اختيارية، أو بصلاحيات مختلفة، أو مربوطة بجدول مش بتاعك (auth.users).",
            mistakes: R`تنسى UNIQUE فيبقى ليوزر بروفايلين. تقسم جدول من غير سبب. وبروفايل Supabase من غير [[ON DELETE CASCADE]]، فمسح اليوزر من لوحة Auth يفشل أو يسيب بروفايل يتيم.`
          },
          teach: R`## الفكرة: foreign key ممنوع يتكرر

one-to-one هي one-to-many بالظبط، بزيادة شرط واحد: عمود الـ foreign key **مينفعش يتكرر**. المثال بيوري طريقتين لده: في [[profiles]] الـ FK هو نفسه الـ primary key، وفي [[shipments]] الـ FK عليه [[UNIQUE]].

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. [[profiles]]: الـ primary key = الـ foreign key

~~~text الأمر
CREATE TABLE profiles (
  user_id    uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  avatar_url text,
  bio        text
);
~~~

السطر المهم هو التاني، وفيه ٣ حاجات على عمود واحد:

| الحتة | معناها |
|---|---|
| [[uuid]] | نفس نوع [[users.id]] |
| [[PRIMARY KEY]] | مينفعش يتكرر ولا يبقى NULL، فكل يوزر ليه بروفايل واحد بالكتير |
| [[REFERENCES users (id)]] | ولازم يبقى يوزر موجود |
| [[ON DELETE CASCADE]] | لو اليوزر اتمسح، البروفايل يتمسح معاه |

مفيش عمود [[id]] منفصل: البروفايل بيتعرف بصاحبه. و [[avatar_url]] و [[bio]] من غير NOT NULL لأنهم اختياريين.

~~~text \d profiles
              Table "public.profiles"
   Column   | Type | Collation | Nullable | Default
------------+------+-----------+----------+---------
 user_id    | uuid |           | not null |
 avatar_url | text |           |          |
 bio        | text |           |          |
Indexes:
    "profiles_pkey" PRIMARY KEY, btree (user_id)
Foreign-key constraints:
    "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
~~~

نفس العمود ظاهر تحت [[Indexes]] (كـ primary key) وتحت [[Foreign-key constraints]].

---

## ٢. [[shipments]]: id خاص و FK عليه UNIQUE

~~~text الأمر
CREATE TABLE shipments (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id bigint NOT NULL UNIQUE REFERENCES orders (id),
  tracking text
);
~~~

- [[id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY]]: رقم بيزيد لوحده، زي orders (درس PRIMARY KEY).
- [[order_id ... NOT NULL UNIQUE REFERENCES orders (id)]]: كل شحنة لازم ليها أوردر موجود، و [[UNIQUE]] بيمنع أوردر يبقى ليه شحنتين.

~~~text \d shipments (الجزء المهم)
Indexes:
    "shipments_pkey" PRIMARY KEY, btree (id)
    "shipments_order_id_key" UNIQUE CONSTRAINT, btree (order_id)
Foreign-key constraints:
    "shipments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
~~~

افتكر الاسم [[shipments_order_id_key]]: جدول + عمود + [[key]]. هنحتاجه في الـ «جرّب».

### الطريقتين جنب بعض

| | [[profiles]] | [[shipments]] |
|---|---|---|
| الـ FK | هو الـ primary key | عمود عادي عليه [[UNIQUE]] |
| ليه | البروفايل ملوش وجود من غير اليوزر | الشحنة ليها id بيتبعت لشركة الشحن وبيتعرض |

---

## ٣. الـ «جرّب»: بروفايل تاني لنفس اليوزر

~~~text الأمر
INSERT INTO profiles (user_id, bio) SELECT id, 'hi' FROM users WHERE email = 'you@example.com';
INSERT INTO profiles (user_id, bio) SELECT id, 'again' FROM users WHERE email = 'you@example.com';
~~~

~~~text الناتج
INSERT 0 1
ERROR:  duplicate key value violates unique constraint "profiles_pkey"
DETAIL:  Key (user_id)=(f2a882ce-8651-45b3-a929-d1520162aa08) already exists.
~~~

الأول عدّى، والتاني اترفض من الـ primary key: يوزر واحد، بروفايل واحد.

ولأن البروفايل اختياري، لما تقرا اليوزرز ومعاهم البروفايل بتستخدم [[LEFT JOIN]] (درسه جاي):

~~~text الناتج
SELECT u.email, p.bio FROM users u LEFT JOIN profiles p ON p.user_id = u.id;
      email       | bio
------------------+-----
 you@example.com  | hi
 mona@example.com |
 omar@gmail.com   |
 sara@example.com |
~~~

---

## ٤. الـ «جرّب»: شيل UNIQUE من shipments

~~~text الناتج
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK1');
INSERT 0 1
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK2');
ERROR:  duplicate key value violates unique constraint "shipments_order_id_key"
DETAIL:  Key (order_id)=(1) already exists.
~~~

دلوقتي نشيل الشرط:

~~~text الناتج
ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;
ALTER TABLE
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK2');
INSERT 0 1
SELECT order_id, count(*) FROM shipments GROUP BY 1;
 order_id | count
----------+-------
        1 |     2
~~~

[[DROP CONSTRAINT اسم]] بيشيل شرط باسمه. ومن غيره الأوردر بقى ليه شحنتين، والجدول بقى one-to-many، ومحدش اشتكى. الفرق بين العلاقتين كله في الشرط ده.

رجّع الحال زي ما كان (عشان درس ON DELETE):

~~~text الناتج
DELETE FROM shipments;
DELETE 2
ALTER TABLE shipments ADD CONSTRAINT shipments_order_id_key UNIQUE (order_id);
ALTER TABLE
~~~

[[ADD CONSTRAINT ... UNIQUE (order_id)]] بيرجّع الشرط بنفس الاسم. لو كان فيه لسه أوردر ليه شحنتين، الأمر ده كان هيفشل.

---

## الخلاصة

| الطريقة | الشكل | مثال |
|---|---|---|
| الـ FK هو الـ PK | [[user_id uuid PRIMARY KEY REFERENCES users (id)]] | بروفايل اليوزر، [[public.profiles]] في Supabase |
| FK عليه UNIQUE | [[order_id bigint NOT NULL UNIQUE REFERENCES orders (id)]] | شحنة الأوردر |

- من غير PRIMARY KEY أو UNIQUE على الـ FK، العلاقة one-to-many.
- افصل في جدول تاني لسبب: داتا اختيارية، أو صلاحيات مختلفة، أو جدول مش ملكك. غير كده ضيف الأعمدة في نفس الجدول.`,
          lines: [
            "جدول البروفايلات.",
            "الـ primary key هو نفسه FK لليوزر: بروفايل واحد بالكتير لكل يوزر.",
            "صورة اختيارية.",
            "نبذة اختيارية.",
            "قفلة.",
            "جدول الشحنات.",
            "id خاص بيه.",
            "FK للأوردر وعليه UNIQUE: شحنة واحدة لكل أوردر.",
            "رقم التتبع.",
            "قفلة."
          ],
          sol: R`البروفايل التاني لنفس اليوزر هيترفض بـ [[duplicate key value violates unique constraint "profiles_pkey"]]، لأن user_id هو الـ PRIMARY KEY نفسه، فمينفعش يتكرر: يوزر واحد، بروفايل واحد.

في shipments: الشحنة التانية لنفس الأوردر هتترفض بـ [[shipments_order_id_key]]. بعد ما تشيل الـ UNIQUE ([[ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;]]) هتتقبل، و [[SELECT order_id, count(*) FROM shipments GROUP BY 1]] هيطلّع 2. محدش هيحذرك: العلاقة بقت one-to-many، والكود اللي بيقرا «الشحنة» بـ [[LIMIT 1]] هيجيب واحدة عشوائي.

بعد التجربة امسح الشحنات ([[DELETE FROM shipments;]]) ورجّع الـ UNIQUE، لأن FK الشحنات مفيهوش ON DELETE، فدرس ON DELETE هيفشل وهو بيمسح الأوردر لو سبت شحنة عليه.`,
          solCode: R`INSERT INTO profiles (user_id, bio) SELECT id, 'hi' FROM users WHERE email = 'you@example.com';
INSERT INTO profiles (user_id, bio) SELECT id, 'again' FROM users WHERE email = 'you@example.com';
-- ERROR:  duplicate key value violates unique constraint "profiles_pkey"
ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK1'), (1, 'TRK2');   -- اتقبلت
DELETE FROM shipments;
ALTER TABLE shipments ADD CONSTRAINT shipments_order_id_key UNIQUE (order_id);`
        },
        {
          cmd: "ON DELETE",
          title: "لما الصف الأب يتمسح، الصفوف المرتبطة بيه يحصلها إيه",
          desc: R`الـ foreign key لازم يعرف يعمل إيه لو الصف اللي بيشاور عليه اتمسح: [[NO ACTION]] أو [[RESTRICT]]: ارفض المسح طول ما فيه صفوف مرتبطة (ده الافتراضي). [[CASCADE]]: امسح المرتبطين معاه. [[SET NULL]]: سيبهم واشطب الربط.

الاختيار قرار business مش تقني: مسح أوردر يمسح بنوده (CASCADE)، بس مسح منتج مينفعش يمسح أوردرات قديمة اتباع فيها (RESTRICT).`,
          example: R`DELETE FROM products WHERE name = 'Mug';        -- error: still referenced from table "order_items"
DELETE FROM orders WHERE id = 1;                -- بنوده اتمسحت معاه (CASCADE)
SELECT count(*) FROM order_items WHERE order_id = 1;   -- 0
ALTER TABLE orders DROP CONSTRAINT orders_user_fk;
ALTER TABLE orders ADD CONSTRAINT orders_user_fk
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT;`,
          try: R`اعمل جدول تجربة فيه FK بـ [[ON DELETE SET NULL]] على عمود [[NOT NULL]]، وامسح الأب: هتاخد error، لأن SET NULL محتاج العمود يقبل NULL.`,
          flag: "script danger",
          deep: {
            why: "لو محددتش، هتكتشف السلوك وقت ما حاجة تتمسح على الإنتاج: يا المسح يفشل والأدمن يتضايق، يا (وده أسوأ) مسح يوزر يمسح معاه سجل مالي كامل.",
            how: R`[[NO ACTION]] هو الافتراضي في Postgres: بيرفض المسح، بس الفحص ممكن يتأجل لآخر الـ transaction لو الـ constraint [[DEFERRABLE]]. [[RESTRICT]] بيرفض فورًا. عمليًا الاتنين «ممنوع».

[[CASCADE]] بيتسلسل: مسح يوزر ← أوردراته ← بنودها. مريح، بس DELETE واحد ممكن يمسح آلاف الصفوف من غير ما يقولك.

[[SET NULL]] بيحط NULL في عمود الـ FK، فلازم العمود يقبل NULL. و [[SET DEFAULT]] بيحط القيمة الافتراضية.

في Prisma بتكتبها [[onDelete: Cascade]] جوه [[@relation]]. ولو مكتبتهاش: العلاقة الإجبارية [[Restrict]] والاختيارية [[SetNull]].`,
            when: R`CASCADE للحاجات اللي ملهاش معنى من غير أبوها: بنود الأوردر، و sessions اليوزر، والبروفايل. RESTRICT للمراجع التاريخية والمالية: الأوردر ← المنتج، والأوردر ← اليوزر. SET NULL للربط الاختياري: [[orders.coupon_id]] لو الكوبون اتمسح.`,
            mistakes: R`CASCADE من users لـ orders، فمسح حساب يمسح تاريخ مبيعات لازم للحسابات؛ الأحسن soft delete أو إخفاء بيانات اليوزر (anonymize). SET NULL على عمود NOT NULL. وتمسح الولاد من الكود بدل الـ FK، فأي مسار نسي يمسحهم يسيب صفوف يتيمة.`
          },
          teach: R`## الفكرة: كل foreign key عنده خطة لمسح الأب

لما صف «أب» يتمسح (يوزر، أوردر، منتج) والصفوف «الولاد» لسه بتشاور عليه، الـ FK لازم يختار: يرفض المسح، ولا يمسح الولاد معاه، ولا يفضّي عمود الربط. الاختيار ده بيتكتب في تعريف الـ FK بـ [[ON DELETE ...]].

المثال بيجرّب التلاتة على جداول الـ lab: [[order_items]] اتعمل بـ [[ON DELETE CASCADE]] على الأوردر ومن غير حاجة على المنتج، وبعدين بنغيّر FK الأوردرات لـ [[RESTRICT]]. الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker.

قبل ما نبدأ، فيه بند واحد من درس many-to-many:

~~~text SELECT * FROM order_items;
 order_id | product_id | quantity | unit_price
----------+------------+----------+------------
        1 |          8 |        2 |     110.00
~~~

---

## ١. مسح منتج ليه بنود: مرفوض

~~~text الأمر
DELETE FROM products WHERE name = 'Mug';
~~~

~~~text الناتج
ERROR:  update or delete on table "products" violates foreign key constraint "order_items_product_id_fkey" on table "order_items"
DETAIL:  Key (id)=(8) is still referenced from table "order_items".
~~~

FK المنتج في order_items متكتبش له ON DELETE، فبياخد الافتراضي [[NO ACTION]]: «ارفض طول ما فيه ولاد». الـ Mug (id 8) لسه في بند، فالمسح اترفض ومفيش حاجة اتمسحت. ده الصح: المنتج اتباع، وتاريخ البيع لازم يفضل.

---

## ٢. مسح أوردر: بنوده بتتمسح معاه

~~~text الأمر
DELETE FROM orders WHERE id = 1;
SELECT count(*) FROM order_items WHERE order_id = 1;
~~~

~~~text الناتج
DELETE 1
 count
-------
     0
~~~

- [[DELETE 1]]: صف واحد اتمسح من orders. الرقم ده بيعدّ صفوف الجدول اللي في الأمر بس، مش الصفوف اللي اتمسحت بالـ CASCADE.
- [[count = 0]]: البند اتمسح هو كمان من غير ما نقول، لأن FK الأوردر في order_items مكتوب [[ON DELETE CASCADE]]. البند ملوش معنى من غير أوردره.

وده كمان خطر CASCADE: DELETE واحد ممكن يمسح آلاف الصفوف في جداول تانية، والرقم اللي بيرجع ميقولكش.

---

## ٣. تغيير سلوك FK موجود

مفيش أمر «عدّل ON DELETE». بتشيل الـ constraint وترجّعه:

~~~text الأمر
ALTER TABLE orders DROP CONSTRAINT orders_user_fk;
ALTER TABLE orders ADD CONSTRAINT orders_user_fk
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT;
~~~

- السطر الأول: شيل الـ FK اللي عملناه في درس one-to-many (باسمه).
- التاني والتالت: ضيفه تاني بنفس الاسم ونفس العمود، بس معاه [[ON DELETE RESTRICT]].

~~~text \d orders (آخره)
Foreign-key constraints:
    "orders_user_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
Referenced by:
    TABLE "order_items" CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    TABLE "shipments" CONSTRAINT "shipments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
~~~

[[\d]] بيوريك ON DELETE بتاع كل FK، ومين بيشاور على الجدول ده. لاحظ إن FK الشحنات مفيهوش ON DELETE، فمسح أوردر ليه شحنة هيترفض. (عشان كده مسحنا الشحنات في درس one-to-one.)

> على جدول كبير في الإنتاج، الـ ADD ده بيراجع كل الصفوف وهو قافل الجدول. الطريقة الآمنة ([[NOT VALID]] ثم [[VALIDATE CONSTRAINT]]) في تاب PostgreSQL.

### جرّب الـ RESTRICT

~~~text الناتج
DELETE FROM users WHERE email = 'omar@gmail.com';
ERROR:  update or delete on table "users" violates RESTRICT setting of foreign key constraint "orders_user_fk" on table "orders"
DETAIL:  Key (id)=(a4a453d0-ea48-4dc5-8612-d43aa84165eb) is referenced from table "orders".

DELETE FROM users WHERE email = 'mona@example.com';
DELETE 1
~~~

Omar ليه أوردر فاترفض (والرسالة بقت [[violates RESTRICT setting]]). Mona ملهاش أوردرات فاتمسحت عادي: الـ FK بيمنع بس لما يبقى فيه ولاد فعلًا.

### NO ACTION ولا RESTRICT؟

| | [[NO ACTION]] (الافتراضي) | [[RESTRICT]] |
|---|---|---|
| بيرفض مسح أب ليه ولاد؟ | أيوه | أيوه |
| امتى بيفحص | آخر الأمر، أو آخر الـ transaction لو الـ constraint [[DEFERRABLE]] | فورًا، ومينفعش يتأجل |

عمليًا الاتنين «ممنوع». كتابة RESTRICT صراحةً بتوضّح لأي حد بيقرا الـ schema إن ده مقصود.

---

## ٤. الـ «جرّب»: SET NULL على عمود NOT NULL

~~~text الأمر
CREATE TABLE t_parent (id int PRIMARY KEY);
CREATE TABLE t_child (
  id int PRIMARY KEY,
  parent_id int NOT NULL REFERENCES t_parent (id) ON DELETE SET NULL
);
INSERT INTO t_parent VALUES (1);
INSERT INTO t_child VALUES (10, 1);
DELETE FROM t_parent WHERE id = 1;
~~~

الجدولين اتعملوا من غير اعتراض. المشكلة بتظهر وقت المسح:

~~~text الناتج
ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint
DETAIL:  Failing row contains (10, null).
CONTEXT:  SQL statement "UPDATE ONLY "public"."t_child" SET "parent_id" = NULL WHERE $1 OPERATOR(pg_catalog.=) "parent_id""
~~~

الـ [[CONTEXT]] بيوريك اللي حصل من ورا: [[SET NULL]] عبارة عن [[UPDATE]] بيحط NULL في عمود الربط عند كل الولاد. والعمود [[NOT NULL]]، فالـ UPDATE فشل، والمسح كله اترفض.

ولما نشيل الـ NOT NULL:

~~~text الناتج
ALTER TABLE t_child ALTER COLUMN parent_id DROP NOT NULL;
ALTER TABLE
DELETE FROM t_parent WHERE id = 1;
DELETE 1
SELECT * FROM t_child;
 id | parent_id
----+-----------
 10 |
~~~

الابن فضل موجود، والربط بقى فاضي (NULL). وبعدها [[DROP TABLE t_child, t_parent;]] بيمسح جداول التجربة.

---

## الخلاصة

| الاختيار | لما الأب يتمسح | استخدمه لـ |
|---|---|---|
| [[NO ACTION]] / [[RESTRICT]] | المسح يترفض | مراجع مالية وتاريخية: أوردر ← منتج، أوردر ← يوزر |
| [[CASCADE]] | الولاد يتمسحوا معاه | حاجة ملهاش معنى من غير أبوها: بنود الأوردر، البروفايل |
| [[SET NULL]] | عمود الربط يبقى NULL | ربط اختياري: كوبون اتمسح. والعمود لازم يقبل NULL |

- الافتراضي لو مكتبتش حاجة: NO ACTION (يعني ممنوع).
- تغيير السلوك: [[DROP CONSTRAINT]] وبعدين [[ADD CONSTRAINT]] بالسلوك الجديد.
- رقم [[DELETE n]] مبيعدّش اللي اتمسح بالـ CASCADE.`,
          lines: [
            "منتج ليه بنود في أوردرات: الـ FK بيمنع مسحه.",
            "مسح أوردر: البنود اتمسحت معاه لأن FK بتاعها CASCADE.",
            "اتأكد: مفيش بنود للأوردر ده.",
            "عشان تغيّر السلوك: شيل الـ FK القديم،",
            "وارجع ضيفه بالسلوك اللي عايزه:",
            "مسح يوزر ليه أوردرات ممنوع صراحةً."
          ],
          sol: R`الـ CREATE TABLE هيعدّي عادي (Postgres مش بيعترض على التركيبة وقت التعريف)، والمشكلة تظهر وقت المسح: [[ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint]]، و الـ CONTEXT بيوريك إن Postgres كان بينفذ [[UPDATE ONLY "public"."t_child" SET "parent_id" = NULL ...]] من وراك. المسح كله اترفض، والأب لسه موجود.

الحل يا تشيل [[NOT NULL]] من العمود لو فعلًا الابن ينفع يعيش من غير أب، يا تختار [[CASCADE]] أو [[RESTRICT]]. الخلاصة: SET NULL وعده إنه هيكتب NULL، فالعمود لازم يقبلها.`,
          solCode: R`CREATE TABLE t_parent (id int PRIMARY KEY);
CREATE TABLE t_child (
  id int PRIMARY KEY,
  parent_id int NOT NULL REFERENCES t_parent (id) ON DELETE SET NULL
);
INSERT INTO t_parent VALUES (1);
INSERT INTO t_child VALUES (10, 1);
DELETE FROM t_parent WHERE id = 1;
-- ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint
ALTER TABLE t_child ALTER COLUMN parent_id DROP NOT NULL;
DELETE FROM t_parent WHERE id = 1;   -- DELETE 1، و parent_id بقى NULL
DROP TABLE t_child, t_parent;`
        }
      ]
    },
    {
      t: "JOIN والاستعلامات المركبة",
      l: 2,
      n: "الداتا متقسمة على جداول، و JOIN بيرجّعها صف واحد تقراه. والـ subquery والـ CTE بيخلوا السؤال الصعب خطوات",
      items: [
        {
          cmd: "INNER JOIN",
          title: "هات الأوردر ومعاه إيميل صاحبه ومنتجاته",
          desc: R`[[JOIN ... ON]] بيحط صفوف جدولين جنب بعض لما شرط الربط يتحقق، غالبًا foreign key = primary key. [[INNER JOIN]] (أو [[JOIN]] بس) بيرجّع الصفوف اللي ليها مقابل في الناحيتين بس.

وتقدر تربط أكتر من جدولين في نفس الاستعلام: أوردر ← بنوده ← المنتجات، ودي الفاتورة.`,
          example: R`SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.status = 'paid';
SELECT o.id AS order_id, p.name, oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
WHERE o.id = 2;`,
          try: R`اعمل أوردر جديد وضيفله بندين، وجرّب الاستعلام التاني عليه. وبعدين بدّل أول [[JOIN ... ON ...]] بـ [[CROSS JOIN users u]] من غير ON، وشوف عدد الصفوف بقى كام. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: بنود الأوردر رقم 6: اسم المنتج، والكمية، وسعر الوحدة، و [[line_total]] (الكمية × السعر).`,
          flag: "script",
          deep: {
            why: "الـ normalization قسّم الداتا على جداول عشان كل معلومة تتكتب مرة. JOIN هو اللي بيجمّعها تاني وقت العرض: شاشة الأوردر محتاجة إيميل اليوزر وأسماء المنتجات، وكلهم في جداول مختلفة.",
            how: R`فكرة JOIN: كل صف من الشمال مع كل صف من اليمين، وخلّي اللي الـ ON عليه true بس. عمليًا Postgres مش بيعمل كل التوافيق؛ بيختار طريقة من تلاتة:

- [[Nested Loop]]: لكل صف من الناحية الصغيرة يدوّر في التانية بالـ index. ممتاز لما النتيجة صغيرة.
- [[Hash Join]]: يعمل hash table من الجدول الأصغر ويعدّي على الأكبر. ممتاز للجداول الكبيرة من غير index مناسب.
- [[Merge Join]]: الاتنين مترتبين على عمود الربط، فيمشي فيهم مع بعض.

الـ index على عمود الـ FK هو اللي بيخلي الـ JOIN سريع. والخطة بتقراها بـ EXPLAIN، والتفاصيل في تاب PostgreSQL.

وخد بالك من «التكاثر»: أوردر فيه ٣ بنود، JOIN مع order_items بيطلّعه ٣ صفوف. فلو عملت [[sum(o.total)]] بعد الـ JOIN هتحسب إجمالي الأوردر ٣ مرات.`,
            when: "لما البيانات اللي هتعرضها في أكتر من جدول، والعلاقة لازم تبقى موجودة (أوردر من غير يوزر المفروض ميحصلش).",
            mistakes: R`تنسى ON فيبقى CROSS JOIN بملايين الصفوف. [[column reference "id" is ambiguous]] لأنك مكتبتش [[o.id]]. تجمع عمود من الجدول الأب بعد JOIN مع الولاد فالرقم يتضاعف. و JOIN على الإيميل النصي بدل الـ id.`
          },
          teach: R`## الفكرة: حط صفوف جدولين جنب بعض لما يتطابقوا

الأوردر فيه [[user_id]] بس، والإيميل في users. [[JOIN]] بيحط صف الأوردر جنب صف صاحبه في صف واحد، عشان تقرا الاتنين مع بعض. والمثال التاني بيربط ٣ جداول: أوردر ← بنوده ← المنتجات، ودي الفاتورة.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab بعد دروس العلاقات.

---

## ١. الأوردرات المدفوعة وإيميل صاحبها

~~~text الأمر
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.status = 'paid';
~~~

### [[FROM orders o]]

[[o]] اسم مختصر (alias) لجدول orders، عشان تكتب [[o.id]] بدل [[orders.id]]. ممكن تكتبها [[FROM orders AS o]]، والـ AS اختيارية هنا.

### [[JOIN users u ON u.id = o.user_id]]

| الحتة | معناها |
|---|---|
| [[JOIN users u]] | هات صفوف users كمان، واسمها المختصر [[u]] |
| [[ON u.id = o.user_id]] | شرط الربط: حط اليوزر جنب الأوردر لما الـ id بتاعه = الـ user_id بتاع الأوردر |

[[JOIN]] لوحدها هي نفسها [[INNER JOIN]]: كلمة INNER اختيارية. و INNER معناها «الصفوف اللي لقت مقابل في الناحيتين بس».

### [[o.id]] و [[u.email]]

النقطة معناها «العمود ده من الجدول ده». لازمة لأن [[id]] موجود في الجدولين:

~~~text من غير اسم الجدول
SELECT id, total, email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.status = 'paid';
ERROR:  column reference "id" is ambiguous
LINE 1: SELECT id, total, email FROM orders o JOIN users u ON u.id =...
               ^
~~~

[[ambiguous]] يعني «مش واضح»: Postgres مش عارف تقصد id أنهي جدول.

~~~text الناتج
 id | total  |      email
----+--------+------------------
  5 | 300.00 | you@example.com
  6 | 900.00 | sara@example.com
  9 | 500.00 | you@example.com
(3 rows)
~~~

كل صف فيه حاجة من orders ([[id]] و [[total]]) وحاجة من users ([[email]]). و you@example.com ظاهر مرتين لأن ليه أوردرين مدفوعين: كل أوردر بيدوّر على صاحبه.

### هو بيعمل كده إزاي؟

[[EXPLAIN]] قدام الاستعلام بيوريك الخطة من غير ما ينفذه:

~~~text EXPLAIN
 Nested Loop  (cost=0.15..9.30 rows=1 width=56)
   ->  Seq Scan on orders o  (cost=0.00..1.10 rows=1 width=40)
         Filter: (status = 'paid'::text)
   ->  Index Scan using users_pkey on users u  (cost=0.15..8.17 rows=1 width=48)
         Index Cond: (id = o.user_id)
~~~

اقراها من جوه: اقرا orders كلها وسيب المدفوع بس ([[Seq Scan]] + [[Filter]])، ولكل أوردر دوّر على صاحبه في users بالـ index بتاع الـ primary key ([[Index Scan using users_pkey]]). ده الـ [[Nested Loop]]. ([[rows=1]] تقدير Postgres مش العدد الحقيقي؛ الجدول صغير ولسه ماتحللش.)

---

## ٢. الفاتورة: ٣ جداول

الأوردر رقم 2 مش موجود في الـ lab (اتحجز في تجربة ROLLBACK)، فـ [[WHERE o.id = 2]] بترجّع [[(0 rows)]]. فنعمل أوردر فيه بندين (ده الـ solCode بتاع الـ «جرّب»):

~~~text الأمر
WITH o AS (
  INSERT INTO orders (user_id) SELECT id FROM users WHERE email = 'you@example.com' RETURNING id
)
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 1, p.price FROM o, products p WHERE p.name IN ('Mug', 'Hoodie')
RETURNING order_id;
~~~

باختصار (الـ [[WITH]] ليه درس لوحده): أول جزء بيعمل أوردر ويرجّع الـ id بتاعه باسم [[o]]، والتاني بيضيف بند لكل منتج من الاتنين بسعره الحالي.

~~~text الناتج
 order_id
----------
       11
       11
~~~

رقم 11 مش 10، لأن الـ INSERT اللي فشل بالـ foreign key في درس one-to-many حرق رقم 10. نحط 11 بدل 2:

~~~text الأمر
SELECT o.id AS order_id, p.name, oi.quantity, oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
WHERE o.id = 11;
~~~

الـ JOINs بتتقري بالترتيب:

| الخطوة | السطر | الناتج لحد هنا |
|---|---|---|
| ١ | [[FROM orders o]] | كل أوردر |
| ٢ | [[JOIN order_items oi ON oi.order_id = o.id]] | كل أوردر جنب كل بند من بنوده |
| ٣ | [[JOIN products p ON p.id = oi.product_id]] | وكل بند جنب المنتج بتاعه |
| ٤ | [[WHERE o.id = 11]] | الأوردر ده بس |

و [[oi.quantity * oi.unit_price AS line_total]] عمود محسوب: الكمية في السعر، والـ [[*]] هنا ضرب.

~~~text الناتج
 order_id |  name  | quantity | unit_price | line_total
----------+--------+----------+------------+------------
       11 | Hoodie |        1 |     650.00 |     650.00
       11 | Mug    |        1 |     140.00 |     140.00
(2 rows)
~~~

الأوردر واحد بس طلع **صفين**، صف لكل بند. سعر الـ Mug هنا 140 لأننا غيّرناه في درس many-to-many قبل ما نعمل الأوردر ده.

### خلي بالك من التكاثر

لما تربط أوردر ببنوده، أعمدة الأوردر بتتكرر في كل صف:

~~~text الناتج
SELECT o.id, o.status, oi.product_id FROM orders o JOIN order_items oi ON oi.order_id = o.id WHERE o.id = 11;
 id | status  | product_id
----+---------+------------
 11 | pending |         10
 11 | pending |          8
~~~

لو عملت [[sum(o.total)]] أو [[count(*)]] على الأوردرات بعد JOIN زي ده، كل أوردر هيتحسب مرة لكل بند فيه.

---

## ٣. الـ «جرّب»: من غير ON

[[CROSS JOIN]] بيربط كل صف من الشمال بكل صف من اليمين، من غير أي شرط:

~~~text الناتج
SELECT count(*) FROM orders;          -- 8
SELECT count(*) FROM users;           -- 3
SELECT count(*) FROM orders o CROSS JOIN users u;
 count
-------
    24
~~~

٨ × ٣ = ٢٤. وعلى استعلام المدفوع:

~~~text الناتج
SELECT o.id, o.total, u.email FROM orders o CROSS JOIN users u WHERE o.status = 'paid' ORDER BY o.id;
 id | total  |      email
----+--------+------------------
  5 | 300.00 | you@example.com
  5 | 300.00 | sara@example.com
  5 | 300.00 | omar@gmail.com
  6 | 900.00 | you@example.com
  ...
(9 rows)
~~~

كل أوردر طلع ٣ مرات، بإيميل صح وإيميلين غلط، من غير أي error. ده اللي بيحصل لما شرط الـ ON يقع منك، و JOIN على جداول كبيرة يطلّع ملايين الصفوف.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[FROM orders o]] | الجدول الأول واسمه المختصر |
| [[JOIN t x ON شرط]] | ضيف صفوف t اللي بتحقق الشرط |
| [[x.col]] | العمود من الجدول ده (لازم لو الاسم في الجدولين) |
| [[INNER]] | اختيارية: الصفوف اللي ليها مقابل بس |
| [[CROSS JOIN]] | كل صف مع كل صف (عدد × عدد) |

- شرط الربط غالبًا: foreign key = primary key.
- أوردر فيه ٣ بنود = ٣ صفوف بعد الـ JOIN؛ متجمعش أعمدة الأوردر بعدها.
- اللي ملوش مقابل بيختفي من INNER JOIN؛ لو عايزه يظهر، الدرس الجاي.`,
          lines: [
            "رقم الأوردر وإجماليه وإيميل صاحبه،",
            "من الأوردرات، واسمها المختصر o،",
            "مع اليوزر اللي id بتاعه = user_id بتاع الأوردر،",
            "للمدفوع بس.",
            "الفاتورة: رقم الأوردر واسم المنتج والكمية والسعر،",
            "وإجمالي السطر محسوب.",
            "من الأوردرات،",
            "مع بنود كل أوردر،",
            "ومع المنتج بتاع كل بند،",
            "لأوردر واحد."
          ],
          sol: R`اعمل الأوردر بـ [[RETURNING id]] عشان تعرف رقمه (مش هيبقى ٢ ولا ٣ غالبًا، لأن محاولات فاشلة قبل كده حجزت أرقام)، وحط الرقم ده بدل [[o.id = 2]]. هتاخد صفين: اسم كل منتج وكميته وسعره و line_total. لو الاستعلام رجّع [[0 rows]]، يبقى الـ id غلط أو البنود اتضافت لأوردر تاني.

الـ [[CROSS JOIN users u]] من غير ON بيربط كل أوردر بكل يوزر: عدد الصفوف = عدد الأوردرات × عدد اليوزرز. لو عندك يوزر واحد مش هتلاحظ فرق، فضيف يوزر تاني: أوردرين × يوزرين = ٤ صفوف، ونص الإيميلات غلط. ده نفس اللي بيحصل لما تنسى شرط الـ join، والرقم بيتضاعف في التقارير من غير error.`,
          solCode: R`WITH o AS (
  INSERT INTO orders (user_id) SELECT id FROM users WHERE email = 'you@example.com' RETURNING id
)
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 1, p.price FROM o, products p WHERE p.name IN ('Mug', 'Hoodie')
RETURNING order_id;
SELECT count(*) FROM orders o CROSS JOIN users u;   -- orders × users`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL,
  is_active boolean NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10, true),
  (2, 'Mug', 120.00, 0, true),
  (3, 'Hoodie', 650.00, 3, true),
  (4, 'Cap', 180.00, 0, false),
  (5, 'Sticker', 0.00, 0, true),
  (6, 'Old Poster', 0.00, 0, false),
  (7, 'Pen', 15.00, 100, true),
  (8, 'Pin', 15.00, 40, true);
CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
CREATE TABLE order_items (
  order_id int REFERENCES orders (id),
  product_id int REFERENCES products (id),
  quantity int NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_items VALUES
  (1, 1, 1, 250.00), (1, 7, 2, 15.00), (1, 2, 1, 120.00),
  (2, 3, 1, 650.00), (2, 1, 1, 250.00),
  (3, 2, 1, 120.00),
  (5, 1, 1, 250.00),
  (6, 3, 1, 650.00), (6, 2, 2, 120.00), (6, 4, 1, 180.00),
  (8, 7, 4, 15.00);`,
            starter: R`SELECT p.name, oi.quantity, oi.unit_price, oi.quantity * oi.unit_price AS line_total
FROM order_items oi
CROSS JOIN products p
WHERE oi.order_id = 6;`,
            expect: [["Mug",2,120,240], ["Hoodie",1,650,650], ["Cap",1,180,180]],
            solution: R`SELECT p.name, oi.quantity, oi.unit_price, oi.quantity * oi.unit_price AS line_total
FROM order_items oi
JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = 6;`
          }
        },
        {
          cmd: "LEFT JOIN",
          title: "هات كل اليوزرز، حتى اللي معملوش أوردرات",
          desc: R`[[LEFT JOIN]] بيرجّع كل صفوف الجدول الشمال، واللي ملوش مقابل في اليمين بياخد NULL في أعمدة اليمين. ده اللي تستخدمه لما المقابل ممكن ميكونش موجود: يوزر من غير أوردرات، منتج عمره ما اتباع.

وبـ [[WHERE right.id IS NULL]] تجيب اللي ملهمش مقابل خالص.`,
          example: R`SELECT u.email, count(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id
ORDER BY orders DESC;
SELECT p.name FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.product_id IS NULL;
SELECT u.email, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id AND o.status = 'paid';`,
          try: R`ضيف يوزر جديد من غير أوردرات. في أول استعلام غيّر [[count(o.id)]] لـ [[count(*)]]: هتلاقي اليوزر الجديد بقى عنده «1». وفي آخر استعلام انقل شرط status من ON لـ WHERE: اليوزر الجديد هيختفي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: كل اليوزرز بالإيميل وعدد أوردراتهم، حتى اللي ملوش أوردرات (لازم يطلع 0 مش 1).`,
          flag: "script",
          deep: {
            why: "تقارير كتير عن «اللي ملوش»: يوزرز سجلوا ومشتروش، منتجات عمرها ما اتباعت، كورسات محدش اشترك فيها. INNER JOIN بيخفي الصفوف دي خالص، و LEFT JOIN بيظهرها.",
            how: R`LEFT JOIN بيعمل نفس INNER JOIN، وبعدين يضيف كل صف من الشمال ملقاش مقابل، وأعمدة اليمين فيه NULL.

عشان كده [[count(o.id)]] مش [[count(*)]]: اليوزر اللي من غير أوردرات ليه صف واحد فيه o.id = NULL، فـ count(*) بتعده 1، و count(o.id) بتعده 0.

الفخ المشهور: شرط على جدول اليمين في WHERE ([[WHERE o.status = 'paid']]) بيرمي كل الصفوف اللي o.status فيها NULL، يعني بيرمي كل اللي ملهمش مقابل، فالـ LEFT JOIN يبقى INNER من غير ما تاخد بالك. شرط اليمين مكانه في ON.

[[RIGHT JOIN]] نفس الفكرة من الناحية التانية (نادرًا ما حد بيستخدمه؛ اعكس الجداول وخلاص). و [[FULL OUTER JOIN]] بيرجّع الناحيتين.

و [[GROUP BY u.id]] بيسمحلك تعرض u.email لأن id هو الـ primary key.`,
            when: "لما المقابل اختياري، أو لما عايز اللي ملوش مقابل (anti-join؛ أو NOT EXISTS في الدرس الجاي).",
            mistakes: R`[[count(*)]] مع LEFT JOIN. شرط اليمين في WHERE. و LEFT JOIN في كل حتة «احتياطي»، فبيخبي bugs في الداتا (أوردر من غير يوزر المفروض يبقى مستحيل، مش يظهر بـ NULL).`
          },
          teach: R`## الفكرة: كل صفوف الشمال، حتى اللي ملهاش مقابل

[[INNER JOIN]] بيرمي أي صف ملقاش مقابل. [[LEFT JOIN]] بيحتفظ بكل صفوف الجدول اللي على الشمال (اللي بعد FROM)، واللي ملوش مقابل بيطلع وأعمدة اليمين فيه NULL. المثال ٣ استعلامات: عدد أوردرات كل يوزر (حتى صفر)، والمنتجات اللي عمرها ما اتباعت، والفرق بين شرط في ON وشرط في WHERE.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab. ضفنا يوزر جديد ملوش أوردرات (أول خطوة في الـ «جرّب»)، وشغّلنا [[\pset null '(null)']] عشان NULL يبان.

~~~text الناتج
INSERT INTO users (email, name) VALUES ('new@example.com', 'New');
INSERT 0 1
~~~

---

## ١. شوف الـ LEFT JOIN قبل التجميع

~~~text الناتج
SELECT u.email, o.id AS order_id FROM users u LEFT JOIN orders o ON o.user_id = u.id ORDER BY u.email, o.id;
      email       | order_id
------------------+----------
 new@example.com  |   (null)
 omar@gmail.com   |        8
 sara@example.com |        6
 sara@example.com |        7
 you@example.com  |        3
 you@example.com  |        4
 you@example.com  |        5
 you@example.com  |        9
 you@example.com  |       11
(9 rows)
~~~

كل يوزر ليه صف لكل أوردر (زي INNER JOIN)، والجديد اللي ملوش أوردرات **ليه صف واحد** و [[order_id]] فيه NULL. مع INNER JOIN كان هيختفي خالص.

---

## ٢. عدد أوردرات كل يوزر

~~~text الأمر
SELECT u.email, count(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id
ORDER BY orders DESC;
~~~

| السطر | بيعمل إيه |
|---|---|
| [[FROM users u]] | الجدول الشمال: كل اليوزرز لازم يظهروا |
| [[LEFT JOIN orders o ON o.user_id = u.id]] | ضيف أوردرات كل يوزر لو موجودة |
| [[GROUP BY u.id]] | صف واحد لكل يوزر |
| [[count(o.id)]] | عدّ الأوردرات (عمود من اليمين) |
| [[ORDER BY orders DESC]] | الأكتر الأول ([[orders]] هو الاسم اللي اديناه للعمود) |

~~~text الناتج
      email       | orders
------------------+--------
 you@example.com  |      5
 sara@example.com |      2
 omar@gmail.com   |      1
 new@example.com  |      0
~~~

### ليه [[count(o.id)]] مش [[count(*)]]؟ (الـ «جرّب»)

~~~text الناتج مع count(*)
      email       | orders
------------------+--------
 you@example.com  |      5
 sara@example.com |      2
 new@example.com  |      1
 omar@gmail.com   |      1
~~~

الجديد بقى عنده [[1]]. ارجع لجدول خطوة ١: هو ليه صف واحد فعلًا (اللي فيه NULL). [[count(*)]] بيعدّ **الصفوف**، و [[count(o.id)]] بيعدّ **القيم اللي مش NULL** في العمود ده، فالصف ده بيتعد صفر.

### [[GROUP BY u.id]] وبعدين [[u.email]] في الـ SELECT؟

القاعدة إن أي عمود في الـ SELECT لازم يبقى في GROUP BY أو جوه دالة تجميع. بس Postgres بيستثني: لو جمّعت بالـ **primary key**، كل أعمدة الجدول ده مسموحة، لأن كل id ليه email واحد بس. لو جمّعت بحاجة تانية الاستثناء ده مش موجود:

~~~text الناتج
SELECT u.email, u.name, count(o.id) FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.email;
ERROR:  column "u.name" must appear in the GROUP BY clause or be used in an aggregate function
~~~

([[email]] عليه UNIQUE، بس الاستثناء للـ primary key بس.)

---

## ٣. المنتجات اللي عمرها ما اتباعت

~~~text الأمر
SELECT p.name FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.product_id IS NULL;
~~~

نشوف الـ LEFT JOIN لوحده الأول:

~~~text الناتج من غير WHERE
  name   | order_id
---------+----------
 T-shirt |   (null)
 Mug     |       11
 Cap     |   (null)
 Hoodie  |       11
 Pen     |   (null)
~~~

اللي ملوش ولا بند جاله NULL في أعمدة order_items. و [[WHERE oi.product_id IS NULL]] بيسيب الصفوف دي بس:

~~~text الناتج
  name
---------
 T-shirt
 Pen
 Cap
~~~

ده اسمه **anti-join**: «هات اللي ملوش مقابل». ليه بنفحص [[oi.product_id]] بالذات؟ لأنه عمود الربط، فمستحيل يبقى NULL في صف ليه مقابل فعلًا؛ لو بقى NULL يبقى مفيش مقابل. (الدرس الجاي فيه طريقة تانية: [[NOT EXISTS]].)

---

## ٤. شرط على جدول اليمين: في ON ولا WHERE؟

~~~text الأمر (الشرط في ON)
SELECT u.email, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id AND o.status = 'paid';
~~~

~~~text الناتج
      email       |   id
------------------+--------
 you@example.com  |      9
 you@example.com  |      5
 sara@example.com |      6
 omar@gmail.com   | (null)
 new@example.com  | (null)
~~~

الشرط في ON معناه «المقابل لازم يبقى أوردر مدفوع». Omar عنده أوردر بس مش مدفوع، فملقاش مقابل وطلع بـ NULL، والجديد كمان. **كل اليوزرز ظاهرين.**

ولما ننقل الشرط لـ WHERE (الـ «جرّب»):

~~~text الناتج (الشرط في WHERE)
SELECT u.email, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid';
      email       | id
------------------+----
 you@example.com  |  5
 sara@example.com |  6
 you@example.com  |  9
~~~

Omar والجديد اختفوا. الترتيب: الـ JOIN بيحصل الأول، وبعدين WHERE بيفلتر الناتج. الصفوف اللي [[o.status]] فيها NULL بتتشال، لأن [[NULL = 'paid']] مش true. فالـ LEFT JOIN بقى INNER JOIN من غير ما تاخد بالك.

| مكان الشرط | معناه | اللي ملوش مقابل |
|---|---|---|
| [[ON ... AND o.status = 'paid']] | المقابل لازم يبقى مدفوع | بيظهر بـ NULL |
| [[WHERE o.status = 'paid']] | الصف النهائي لازم يبقى مدفوع | بيختفي |

---

## الخلاصة

- [[LEFT JOIN]]: كل صفوف الشمال، واللي ملوش مقابل أعمدة اليمين فيه NULL.
- مع LEFT JOIN اعدّ بـ [[count(عمود من اليمين)]]، مش [[count(*)]].
- «اللي ملوش»: [[LEFT JOIN ... WHERE right.key IS NULL]].
- شرط على جدول اليمين مكانه ON؛ في WHERE بيقلب الـ LEFT لـ INNER.
- [[RIGHT JOIN]] نفس الفكرة من الناحية التانية (اعكس الجداول بدل منه)، و [[FULL OUTER JOIN]] الناحيتين.`,
          lines: [
            "كل يوزر وعدد أوردراته (count على عمود من اليمين)،",
            "من اليوزرز،",
            "مع أوردراتهم لو موجودة،",
            "مجمّعين باليوزر،",
            "والأكتر الأول.",
            "المنتجات،",
            "مع بنودها لو موجودة،",
            "واللي ملهاش بنود خالص: عمره ما اتباع.",
            "كل اليوزرز، ومعاهم أوردراتهم المدفوعة بس:",
            "شرط اليمين في ON عشان اليوزرز التانيين ميختفوش."
          ],
          sol: R`مع [[count(o.id)]] اليوزر الجديد عنده [[0]]. مع [[count(*)]] بقى عنده [[1]]، لأن LEFT JOIN رجّع له صف واحد فيه أعمدة الأوردر كلها NULL، و [[count(*)]] بيعدّ الصفوف، أما [[count(o.id)]] بيعدّ القيم اللي مش NULL.

في آخر استعلام، والشرط في ON: اليوزر الجديد ظاهر وجنبه id فاضي. لما تنقل [[o.status = 'paid']] لـ WHERE هيختفي، لأن WHERE بيتنفذ بعد الـ join، و [[NULL = 'paid']] مش true، فالـ LEFT JOIN اتحول فعليًا لـ INNER JOIN. (ولو مفيش ولا أوردر paid خالص، الاستعلام هيرجّع صفر صفوف.) القاعدة: الشروط على الجدول اليمين في LEFT JOIN مكانها ON.`,
          solCode: R`INSERT INTO users (email, name) VALUES ('new@example.com', 'New');
SELECT u.email, count(*) AS orders
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;                                            -- new@example.com = 1 (غلط)
SELECT u.email, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid';                                  -- new@example.com اختفى`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT u.email, count(*) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`,
            expect: [["omar@gmail.com",0], ["ali@shop.eg",2], ["mona@example.com",2], ["sara@example.com",4]],
            solution: R`SELECT u.email, count(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`
          }
        },
        {
          cmd: "EXISTS",
          title: "استعلام جوه استعلام: فيه ولا مفيش",
          desc: R`الـ subquery استعلام جوه استعلام. أشهر شكلين: [[IN (SELECT ...)]] و [[EXISTS (SELECT ...)]]. EXISTS بيسأل «فيه ولو صف واحد بيحقق الشرط؟» وبيقف عند أول صف، فمناسب لأسئلة زي «اليوزرز اللي اشتروا المنتج ده».

و [[NOT EXISTS]] أأمن من [[NOT IN]]: لو الـ subquery رجّعت NULL واحدة، NOT IN بترجّع صفر صفوف.`,
          example: R`SELECT email FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.user_id = u.id AND oi.product_id = 4
);
SELECT email FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
SELECT name, price FROM products
WHERE price > (SELECT avg(price) FROM products);`,
          try: R`جرّب [[SELECT 1 WHERE 3 NOT IN (1, 2, NULL)]]: مش هترجع حاجة. وبعدين [[SELECT 1 WHERE 3 NOT IN (1, 2)]]: هترجع. NULL واحدة بوّظت الشرط كله. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: إيميلات اليوزرز اللي معملوش ولا أوردر. خلي بالك: فيه أوردر ضيف [[user_id]] بتاعه NULL.`,
          flag: "script",
          deep: {
            why: "«مين اشترى X» بـ JOIN بيرجّع اليوزر مرة لكل أوردر فيه X، فتضطر تحط DISTINCT. EXISTS بيرجّع كل يوزر مرة واحدة ومش بيكمّل بعد أول تطابق.",
            how: R`الـ subquery في أول مثال «correlated»: بتستخدم [[u.id]] من الاستعلام الخارجي. نظريًا بتتنفذ لكل يوزر، بس Postgres ذكي: بيحوّل EXISTS و IN لـ semi-join، و NOT EXISTS لـ anti-join، فالأداء غالبًا زي JOIN.

[[SELECT 1]] عادة وبس؛ EXISTS مش بيبص على الأعمدة، بيبص «فيه صف ولا لأ».

فخ NOT IN: [[x NOT IN (1, NULL)]] معناها [[x <> 1 AND x <> NULL]]، والتانية UNKNOWN، فالشرط كله عمره ما يبقى true. لو العمود في الـ subquery ممكن يبقى NULL، NOT IN هترجع فاضي من غير error. NOT EXISTS مفيهاش المشكلة دي.

آخر مثال scalar subquery: بترجّع قيمة واحدة (صف واحد وعمود واحد) وتتقارن بيها. لو رجّعت أكتر من صف: [[more than one row returned by a subquery used as an expression]].`,
            when: "أسئلة «فيه/مفيش» (اشترى/مشتراش، عنده/معندوش). وقيمة واحدة محسوبة تقارن بيها.",
            mistakes: R`JOIN + DISTINCT بدل EXISTS. NOT IN على عمود ممكن يبقى NULL. و scalar subquery بترجع أكتر من صف.`
          },
          teach: R`## الفكرة: سؤال صغير جوه السؤال الكبير

الـ subquery استعلام بين قوسين جوه استعلام تاني. المثال فيه ٣ أشكال: [[EXISTS]] («فيه ولو صف واحد؟»)، و [[NOT EXISTS]] («مفيش ولا صف؟»)، وsubquery بترجّع رقم واحد تقارن بيه.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab (فيها دلوقتي يوزر جديد [[new@example.com]] من درس LEFT JOIN، وأوردر 11 فيه Mug و Hoodie).

---

## ١. اليوزرز اللي اشتروا منتج معين

~~~text الأمر
SELECT email FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.user_id = u.id AND oi.product_id = 4
);
~~~

### الاستعلام الداخلي

| السطر | معناه |
|---|---|
| [[SELECT 1]] | مش مهم يرجّع إيه؛ [[EXISTS]] بيسأل «فيه صف؟» بس، فبنكتب [[1]] كعادة |
| [[FROM orders o JOIN order_items oi ON oi.order_id = o.id]] | الأوردرات وبنودها (درس INNER JOIN) |
| [[WHERE o.user_id = u.id]] | **[[u]] جاية من برّه**: أوردرات اليوزر اللي بنفحصه دلوقتي |
| [[AND oi.product_id = 4]] | وفيها المنتج رقم 4 |

الـ subquery دي اسمها **correlated** (مرتبطة)، لأنها بتستخدم [[u.id]] من الاستعلام الخارجي. اقراها كده: «لكل يوزر u، هل فيه أوردر ليه فيه المنتج 4؟». لو أيوه، [[EXISTS]] بيبقى true واليوزر بيظهر.

~~~text الناتج
 email
-------
(0 rows)
~~~

مفيش منتج رقم 4 في الـ lab أصلًا (الأرقام اتحرقت في تجارب الدروس اللي فاتت):

~~~text SELECT id, name FROM products ORDER BY id;
 id |  name
----+---------
  1 | T-shirt
  8 | Mug
  9 | Cap
 10 | Hoodie
 14 | Pen
~~~

نجرب Hoodie (10):

~~~text الناتج مع oi.product_id = 10
      email
-----------------
 you@example.com
~~~

### ليه مش JOIN وخلاص؟

خد سؤال شبهه: «مين عنده أوردرات pending؟»

~~~text بـ JOIN
SELECT u.email FROM users u JOIN orders o ON o.user_id = u.id WHERE o.status = 'pending';
      email
-----------------
 you@example.com
 you@example.com
 omar@gmail.com
 you@example.com
~~~

~~~text بـ EXISTS
SELECT email FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'pending');
      email
-----------------
 omar@gmail.com
 you@example.com
~~~

الـ JOIN بيطلّع اليوزر مرة لكل أوردر (you عندها ٣ pending)، فتضطر تحط [[DISTINCT]]. و EXISTS بيرجّع كل يوزر مرة واحدة، وبيقف عند أول صف يلاقيه.

---

## ٢. اليوزرز اللي ملهمش أوردرات

~~~text الأمر
SELECT email FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
~~~

نفس الفكرة بالعكس: «مفيش ولا أوردر لليوزر ده».

~~~text الناتج
      email
-----------------
 new@example.com
~~~

Postgres مش بيشغّل الـ subquery مرة لكل يوزر فعلًا. [[EXPLAIN]] بيوريك إنه حوّلها لـ join من نوع خاص:

~~~text EXPLAIN
 Hash Anti Join  (cost=1.18..23.55 rows=542 width=32)
   Hash Cond: (u.id = o.user_id)
   ->  Seq Scan on users u  (cost=0.00..15.50 rows=550 width=48)
   ->  Hash  (cost=1.08..1.08 rows=8 width=16)
         ->  Seq Scan on orders o  (cost=0.00..1.08 rows=8 width=16)
~~~

- [[Hash Anti Join]]: «هات صفوف users اللي **ملهاش** مقابل». وبـ [[EXISTS]] بدل NOT EXISTS الخطة بقت [[Hash Semi Join]] («اللي ليها مقابل، مرة واحدة»).
- [[Hash]]: عمل جدول hash من الأوردرات (الأصغر)، وعدّى على اليوزرز يدوّر فيه.
- الأرقام زي [[rows=550]] تقديرات لجدول ماتحللش لسه، مش العدد الحقيقي.

---

## ٣. subquery بترجّع رقم واحد

~~~text الأمر
SELECT name, price FROM products
WHERE price > (SELECT avg(price) FROM products);
~~~

اللي بين القوسين بيتحسب الأول:

~~~text الناتج
SELECT avg(price) FROM products;
         avg
----------------------
 245.0000000000000000
~~~

(250 + 140 + 170 + 650 + 15) ÷ 5 = 245. و [[avg]] على [[numeric]] بيرجّع كسور كتير؛ [[round(avg(price), 2)]] لو هتعرضه.

وبعدين الخارجي بيبقى [[WHERE price > 245]]:

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
 Hoodie  | 650.00
~~~

ده اسمه **scalar subquery**: لازم يرجّع صف واحد وعمود واحد. لو رجّع أكتر:

~~~text الناتج
SELECT name FROM products WHERE price > (SELECT price FROM products);
ERROR:  more than one row returned by a subquery used as an expression
~~~

(ولو رجّع صفر صفوف، القيمة بتبقى NULL، والمقارنة مش true لأي صف.)

---

## ٤. الـ «جرّب»: فخ NOT IN مع NULL

~~~text الناتج
SELECT 1 WHERE 3 NOT IN (1, 2, NULL);
 ?column?
----------
(0 rows)

SELECT 1 WHERE 3 NOT IN (1, 2);
 ?column?
----------
        1

SELECT 3 NOT IN (1, 2, NULL);
 ?column?
----------
 (null)
~~~

(شغّلنا [[\pset null '(null)']] الأول عشان NULL يبان.) [[3 NOT IN (1, 2, NULL)]] معناها:

~~~text الفك
3 <> 1   AND   3 <> 2   AND   3 <> NULL
 true    AND    true    AND     NULL      =  NULL
~~~

أي مقارنة مع NULL نتيجتها NULL (مش معروف)، و [[true AND NULL]] = NULL. والـ WHERE بيسيب الصفوف اللي شرطها **true** بس، فمفيش ولا صف.

في الحقيقة ده بيحصل لما تكتب [[WHERE id NOT IN (SELECT user_id FROM ...)]] وفيه صف واحد [[user_id]] بتاعه NULL: الاستعلام كله يرجّع فاضي من غير error. [[NOT EXISTS]] بيسأل «فيه صف بيطابق؟» والـ NULL مبيطابقش حاجة، فمش بيتأثر.

---

## الخلاصة

| الشكل | بيسأل | بيرجّع |
|---|---|---|
| [[EXISTS (SELECT 1 ...)]] | فيه ولو صف واحد؟ | true/false، وبيقف عند أول صف |
| [[NOT EXISTS (...)]] | مفيش ولا صف؟ | true/false، وآمن مع NULL |
| [[x IN (SELECT ...)]] | القيمة موجودة في اللستة؟ | زي EXISTS في الأغلب |
| [[x NOT IN (SELECT ...)]] | مش موجودة؟ | **فاضي لو اللستة فيها NULL** |
| [[x > (SELECT avg(...))]] | قارن بقيمة واحدة | error لو رجّع أكتر من صف |

- correlated = بتستخدم عمود من الاستعلام الخارجي ([[u.id]]).
- «مين اشترى X» بـ EXISTS بيرجّع كل واحد مرة؛ بـ JOIN بيكرره.
- مع subquery: [[NOT EXISTS]] دايمًا بدل [[NOT IN]].`,
          lines: [
            "اليوزرز،",
            "اللي فيه على الأقل صف واحد من ده:",
            "أوردر،",
            "فيه بنود،",
            "بتاع اليوزر ده، وفيه المنتج رقم 4.",
            "قفلة الـ subquery.",
            "اليوزرز،",
            "اللي ملهمش ولا أوردر (anti-join).",
            "المنتجات،",
            "اللي سعرها أعلى من متوسط الأسعار (subquery بترجّع رقم واحد)."
          ],
          sol: R`الأول هيرجّع [[(0 rows)]] والتاني هيرجّع [[1]]. [[3 NOT IN (1, 2, NULL)]] معناها [[3 <> 1 AND 3 <> 2 AND 3 <> NULL]]، والأخيرة NULL، و [[true AND NULL]] = NULL، فالشرط مش true. جرّب [[SELECT 3 NOT IN (1, 2, NULL);]] وهتلاقي خانة فاضية (NULL) مش false.

في الحقيقة ده بيحصل لما تكتب [[WHERE id NOT IN (SELECT user_id FROM ...)]] والـ subquery فيها صف واحد user_id بتاعه NULL: الاستعلام يرجّع فاضي فجأة من غير أي error. عشان كده استخدم [[NOT EXISTS]] دايمًا بدل [[NOT IN]] مع subquery، وده سؤال انترفيو مشهور.`,
          solCode: R`SELECT 1 WHERE 3 NOT IN (1, 2, NULL);   -- 0 rows
SELECT 1 WHERE 3 NOT IN (1, 2);         -- 1
SELECT 3 NOT IN (1, 2, NULL);           -- NULL`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
INSERT INTO orders VALUES (9, NULL, 'paid', 75.00, '2026-09-15 10:00+00');`,
            starter: R`SELECT email FROM users
WHERE id NOT IN (SELECT user_id FROM orders);`,
            expect: [["omar@gmail.com"]],
            solution: R`SELECT email FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);`
          }
        },
        {
          cmd: "WITH (CTE)",
          title: "قسّم الاستعلام الطويل لخطوات ليها أسماء",
          desc: R`[[WITH name AS (SELECT ...)]] بيعرّف نتيجة مؤقتة ليها اسم، وتستخدمها في الاستعلام اللي بعدها كأنها جدول. ده اسمه CTE، وفايدته الأساسية القراية: بدل subquery جوه subquery، تكتب خطوات من فوق لتحت.

وينفع تعمل أكتر من CTE ورا بعض، وكل واحدة تستخدم اللي قبلها.`,
          example: R`WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
),
vip AS (
  SELECT user_id FROM paid WHERE spent >= 1000
)
SELECT u.email, p.spent
FROM vip v
JOIN users u ON u.id = v.user_id
JOIN paid p ON p.user_id = v.user_id
ORDER BY p.spent DESC;`,
          try: R`اكتب نفس الاستعلام من غير WITH، بـ subqueries جوه بعض، وقارن أنهي أسهل في القراية. وبعدين حط [[EXPLAIN]] قدام الاتنين: في نسخة WITH هتلاقي [[CTE paid]] و [[CTE Scan]]، لأن paid متستخدمة مرتين فـ Postgres بيحسبها مرة ويحفظها، ونسخة الـ subqueries بتحسبها مرتين. وبعدين اكتب [[paid AS NOT MATERIALIZED (...)]] وشوف الخطة بقت زي الـ subqueries. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: بـ WITH: إيميل كل يوزر ومجموع اللي دفعه ([[paid]])، لليوزرز اللي دفعوا أكتر من متوسط الدفع بين اليوزرز اللي دفعوا.`,
          flag: "script",
          deep: {
            why: "التقارير الحقيقية فيها ٣ و ٤ خطوات: احسب كذا، وفلتر، واربط، ورتّب. متداخلة جوه بعض بتبقى صعبة تتقري أو تتصلح. الـ CTE بيدّي كل خطوة اسم تفهمه.",
            how: R`الـ CTE موجودة جوه الأمر ده بس؛ مش جدول بيتحفظ.

من Postgres 12، الـ CTE اللي بتتستخدم مرة واحدة ومفيهاش تعديل بيانات بتتدمج في الاستعلام الأساسي (inline)، فالـ planner بيشوف من خلالها ويحسّن زي أي subquery. قبل 12 كانت دايمًا بتتحسب لوحدها الأول (optimization fence)، وده سبب نصايح قديمة إنها «بطيئة». وتقدر تتحكم بـ [[AS MATERIALIZED]] و [[AS NOT MATERIALIZED]].

وفيه نوعين مهمين:
- [[WITH RECURSIVE]] للشجر: تصنيفات جواها تصنيفات، أو ردود على تعليقات.
- CTE بتعدّل بيانات: [[WITH o AS (INSERT INTO orders ... RETURNING id) INSERT INTO order_items SELECT o.id, ... FROM o]]. الاتنين أمر واحد، فيا ينجحوا مع بعض يا لأ.`,
            when: "أي استعلام فيه أكتر من خطوة منطقية، أو محتاج نفس النتيجة الوسيطة مرتين.",
            mistakes: R`تفتكر الـ CTE متخزنة وتستخدمها في أمر تاني. نصايح أداء قديمة من قبل Postgres 12. وسلسلة CTEs طويلة بتتكرر في كل مكان، ومكانها view.`
          },
          teach: R`## الفكرة: كل خطوة ليها اسم، والاستعلام الأخير بيستخدم الأسامي

السؤال: «مين الـ VIP (صرف ١٠٠٠ أو أكتر)، وصرف كام؟». بدل subquery جوه subquery، [[WITH]] بيخليك تكتبه خطوات من فوق لتحت: احسب اللي صرفه كل يوزر واسمّيه [[paid]]، وبعدين اختار منه الـ VIP واسمّيه [[vip]]، وبعدين اربطهم باليوزرز.

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. الخطوة الأولى: [[paid]]

~~~text الجزء ده
WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
),
~~~

| الحتة | معناها |
|---|---|
| [[WITH]] | هبدأ أعرّف خطوات ليها أسامي |
| [[paid AS ( ... )]] | الخطوة اسمها [[paid]]، ونتيجتها الاستعلام اللي بين القوسين |
| [[sum(total) AS spent]] | مجموع اللي دفعه كل يوزر |
| [[,]] في الآخر | فيه خطوة تانية جاية |

اللي جوه القوسين استعلام عادي جدًا (درس GROUP BY). عشان نشوف نتيجته لوحدها، نكتب بعده [[SELECT * FROM paid]]:

~~~text الناتج
               user_id                | spent
--------------------------------------+--------
 79228952-6e10-41ed-8e0e-c1ada45f435f | 900.00
 f2a882ce-8651-45b3-a929-d1520162aa08 | 800.00
~~~

الأول Sara (أوردر 900)، والتاني you@example.com (300 + 500؛ أوردر 1 اتمسح في درس ON DELETE). والنتيجة دي «جدول مؤقت» اسمه [[paid]] تقدر تستخدمه في اللي بعده.

---

## ٢. الخطوة التانية: [[vip]]

~~~text الجزء ده
vip AS (
  SELECT user_id FROM paid WHERE spent >= 1000
)
~~~

- مفيش [[WITH]] تاني: الخطوات ورا بعض مفصولة بـ [[,]].
- [[FROM paid]]: بتقرا من نتيجة الخطوة الأولى كأنها جدول. كل خطوة تقدر تستخدم اللي قبلها.
- مفيش [[,]] بعد القوس: دي آخر خطوة، واللي بعدها الاستعلام الأساسي.

---

## ٣. الاستعلام الأساسي

~~~text الجزء ده
SELECT u.email, p.spent
FROM vip v
JOIN users u ON u.id = v.user_id
JOIN paid p ON p.user_id = v.user_id
ORDER BY p.spent DESC;
~~~

- [[FROM vip v]]: ابدأ من الـ VIP (اسمه المختصر [[v]]).
- [[JOIN users u ...]]: هات الإيميل.
- [[JOIN paid p ...]]: هات المبلغ. [[paid]] متستخدمة **مرتين**: مرة جوه vip ومرة هنا.
- [[ORDER BY p.spent DESC]]: الأكتر صرفًا الأول.

~~~text الناتج
 email | spent
-------+-------
(0 rows)
~~~

صفر صفوف، لأن محدش صرف ١٠٠٠ في الـ lab (أكبر رقم 900). مش error: الخطوة الأولى طلّعت صفين، والتانية فلترتهم وفضيت. لو غيرنا الحد لـ [[800]]:

~~~text الناتج مع spent >= 800
      email       | spent
------------------+--------
 sara@example.com | 900.00
 you@example.com  | 800.00
~~~

> لما استعلام CTE يطلّع نتيجة غريبة، اكتب [[SELECT * FROM اسم_الخطوة]] مكان الاستعلام الأساسي، وشوف كل خطوة لوحدها. ده أسهل بكتير من فك subqueries متداخلة.

### الـ CTE مش جدول بيتحفظ

~~~text الناتج
SELECT * FROM paid;
ERROR:  relation "paid" does not exist
~~~

[[paid]] كانت موجودة جوه الأمر اللي فيه الـ WITH بس. أول ما الأمر خلص، اختفت. لو محتاجها في أكتر من استعلام، مكانها view (درس VIEW).

---

## ٤. الـ «جرّب»: نفس الاستعلام من غير WITH

~~~text الأمر
SELECT u.email, p.spent
FROM (SELECT user_id
      FROM (SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id) x
      WHERE spent >= 1000) v
JOIN users u ON u.id = v.user_id
JOIN (SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id) p
  ON p.user_id = v.user_id
ORDER BY p.spent DESC;
~~~

حسبة [[paid]] اتكتبت **مرتين** بالظبط، ولازم تقرا من جوه لبرة عشان تفهم. لو عايز تغيّر «المدفوع» لـ «المدفوع والمشحون»، لازم تفتكر تعدّل في المكانين.

### الفرق في الخطة ([[EXPLAIN]])

نسخة WITH (الجزء المهم):

~~~text EXPLAIN (WITH)
   CTE paid
     ->  HashAggregate  (cost=1.10..1.12 rows=1 width=48)
           Group Key: orders.user_id
           ->  Seq Scan on orders  (cost=0.00..1.10 rows=1 width=32)
                 Filter: (status = 'paid'::text)
   ...
               ->  CTE Scan on paid  (cost=0.00..0.02 rows=1 width=16)
                     Filter: (spent >= '1000'::numeric)
               ->  CTE Scan on paid p  (cost=0.00..0.02 rows=1 width=48)
~~~

- [[CTE paid]]: الخطوة اتحسبت **مرة واحدة** ([[Seq Scan on orders]] مرة).
- [[CTE Scan on paid]] مرتين: القراية من النتيجة المحفوظة، مرة لـ vip ومرة للـ JOIN.

نسخة الـ subqueries:

~~~text EXPLAIN (subqueries)
                           ->  Seq Scan on orders  (cost=0.00..1.10 rows=1 width=32)
                                 Filter: (status = 'paid'::text)
   ...
                     ->  Seq Scan on orders orders_1  (cost=0.00..1.10 rows=1 width=32)
                           Filter: (status = 'paid'::text)
~~~

جدول orders اتقري **مرتين** ([[orders]] و [[orders_1]]، نفس الجدول باسمين).

### [[AS NOT MATERIALIZED]]

~~~text الأمر
WITH paid AS NOT MATERIALIZED (
  ...
~~~

بالكلمة دي الخطة بقت **نفس خطة الـ subqueries بالظبط** (سطرين Seq Scan ومفيش CTE Scan). القاعدة من Postgres 12:

| الحالة | Postgres بيعمل إيه |
|---|---|
| الـ CTE متستخدمة مرة واحدة | بيدمجها في الاستعلام (inline) زي subquery |
| متستخدمة أكتر من مرة (زي [[paid]] هنا) | بيحسبها مرة ويحفظها (materialize) |
| [[AS MATERIALIZED]] | احسبها مرة واحفظها، دايمًا |
| [[AS NOT MATERIALIZED]] | ادمجها، حتى لو بتتقري كذا مرة |

مين أسرع بيفرق حسب الداتا؛ قيس بـ [[EXPLAIN ANALYZE]] (تاب PostgreSQL).

---

## الخلاصة

~~~text الشكل
WITH خطوة1 AS ( SELECT ... ),
     خطوة2 AS ( SELECT ... FROM خطوة1 ... )
SELECT ... FROM خطوة2 JOIN خطوة1 ...;
~~~

- الخطوات مفصولة بـ [[,]]، و [[WITH]] مرة واحدة في الأول.
- كل خطوة تقدر تقرا اللي قبلها.
- الـ CTE عايشة جوه الأمر ده بس.
- تصحيح الأخطاء: [[SELECT * FROM خطوة]] لكل خطوة لوحدها.
- من Postgres 12: المستخدمة مرة بتتدمج، والمستخدمة أكتر بتتحسب مرة (إلا لو قلت غير كده).`,
          lines: [
            "خطوة ١ اسمها paid:",
            "مجموع اللي صرفه كل يوزر،",
            "من الأوردرات المدفوعة،",
            "مجمّعة باليوزر.",
            "قفلة الخطوة الأولى.",
            "خطوة ٢ اسمها vip:",
            "اليوزرز اللي صرفوا ١٠٠٠ أو أكتر، من نتيجة الخطوة الأولى.",
            "قفلة.",
            "الاستعلام الأساسي: الإيميل والمبلغ،",
            "من الـ vip،",
            "مع جدول اليوزرز عشان الإيميل،",
            "ومع paid عشان المبلغ،",
            "والأكتر صرفًا الأول."
          ],
          sol: R`النسخة من غير WITH لازم تكرر حسبة paid مرتين (مرة للفلترة ومرة للـ spent)، وده بيخليها أطول وأصعب في التعديل. في EXPLAIN بتاع نسخة WITH هتلاقي [[CTE paid]] فيها [[Seq Scan on orders]] مرة واحدة، وتحتها سطرين [[CTE Scan on paid]]. في نسخة الـ subqueries هتلاقي [[Seq Scan on orders]] و [[Seq Scan on orders orders_1]]: الجدول اتقري مرتين.

مع [[NOT MATERIALIZED]] الخطة بقت نفس خطة الـ subqueries بالظبط (سطرين Seq Scan ومفيش CTE Scan). ومن Postgres 12 الـ CTE اللي بتتستخدم مرة واحدة بس بتتدمج تلقائي، فـ MATERIALIZED بيفرق بس لما الـ CTE بتتقري أكتر من مرة. الاستعلام نفسه هيرجّع صفر صفوف غالبًا، لأن مفيش حد صرف ١٠٠٠؛ ده طبيعي.`,
          solCode: R`EXPLAIN SELECT u.email, p.spent
FROM (SELECT user_id
      FROM (SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id) x
      WHERE spent >= 1000) v
JOIN users u ON u.id = v.user_id
JOIN (SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id) p
  ON p.user_id = v.user_id
ORDER BY p.spent DESC;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
)
SELECT u.email, p.spent
FROM paid p
JOIN users u ON u.id = p.user_id;`,
            expect: [["sara@example.com",1410], ["ali@shop.eg",1200]],
            solution: R`WITH paid AS (
  SELECT user_id, sum(total) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY user_id
),
avg_spent AS (
  SELECT avg(spent) AS value FROM paid
)
SELECT u.email, p.spent
FROM paid p
JOIN users u ON u.id = p.user_id
WHERE p.spent > (SELECT value FROM avg_spent);`
          }
        }
      ]
    },
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
