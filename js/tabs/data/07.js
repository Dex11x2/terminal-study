// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
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
    }
]);
