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
    }
]);
