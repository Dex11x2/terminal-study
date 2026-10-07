// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "التجميع: count و GROUP BY و HAVING",
      l: 1,
      n: "بدل ما تجيب كل الصفوف وتحسب في الكود، القاعدة تحسب وترجّعلك الرقم",
      items: [
        {
          cmd: "count و sum و avg",
          title: "احسب رقم واحد من صفوف كتير",
          desc: R`الـ aggregate functions بتاخد صفوف كتير وترجّع قيمة واحدة: [[count]] للعدد، و [[sum]] للمجموع، و [[avg]] للمتوسط، و [[min]] و [[max]]. من غير GROUP BY، النتيجة صف واحد للجدول كله (بعد الـ WHERE).

ده أسرع بكتير من إنك تجيب ١٠ آلاف أوردر للكود وتجمعهم بـ [[reduce]]: القاعدة بتحسب جنب الداتا وبترجّع رقم واحد.`,
          example: R`SELECT count(*) FROM orders;
SELECT count(*) FILTER (WHERE status = 'paid') AS paid_orders FROM orders;
SELECT sum(total) AS revenue FROM orders WHERE status = 'paid';
SELECT round(avg(price), 2) AS avg_price, min(price), max(price) FROM products;
SELECT COALESCE(sum(total), 0) AS revenue FROM orders WHERE status = 'refunded';`,
          try: R`شغّل [[SELECT sum(total) FROM orders WHERE status = 'refunded']] من غير COALESCE: هترجع NULL مش صفر، والواجهة كانت هتكتب «null جنيه». اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: صف واحد فيه عمودين: إجمالي الأوردرات [[refunded]] (ولو مفيش يبقى 0 مش NULL)، وعدد الأوردرات [[paid]].`,
          flag: "script",
          deep: {
            why: "لوحة الأدمن كلها أرقام: عدد الأوردرات، والإيرادات، ومتوسط الأوردر. لو جبت الصفوف كلها وحسبت في JavaScript، هتنقل ميجات على الشبكة عشان رقم واحد، والصفحة هتبطأ كل ما الداتا تكبر.",
            how: R`الـ aggregate بيعدّي على الصفوف اللي عدّت من WHERE وبيجمّع قيمة. كلها بتتجاهل NULL ما عدا [[count(*)]].

[[sum]] على صفر صفوف بترجّع NULL مش 0، عشان كده [[COALESCE(sum(x), 0)]]. و [[avg]] على integer بترجّع numeric بخانات كتير، فقرّب بـ [[round]].

[[FILTER (WHERE ...)]] (Postgres) بيخليك تحسب كذا عدد مشروط في نفس الاستعلام بدل كذا رحلة للقاعدة: [[count(*) FILTER (WHERE status = 'paid')]] جنب [[count(*) FILTER (WHERE status = 'pending')]].

[[count(*)]] على جدول ضخم في Postgres بطيء نسبيًا، لأنه لازم يتأكد إن كل صف «ظاهر» للـ transaction بتاعتك. للوحات الكبيرة ممكن تستخدم رقم تقريبي من [[pg_class.reltuples]].

في Prisma: [[prisma.order.count({ where })]] و [[prisma.order.aggregate({ _sum: { total: true } })]].`,
            when: "أي رقم ملخّص: dashboards، وعدد النتايج في الصفحات، وتقارير.",
            mistakes: R`sum بترجّع NULL والواجهة تعرضها. تجيب كل الصفوف عشان [[.length]]. وتحط عمود عادي جنب aggregate من غير GROUP BY: [[column "orders.status" must appear in the GROUP BY clause or be used in an aggregate function]].`
          },
          teach: R`## الفكرة: صفوف كتير تدخل، رقم واحد يطلع

الـ aggregate functions بتلف على كل الصفوف اللي عدّت من [[WHERE]] وترجّع **صف واحد** فيه النتيجة: العدد، أو المجموع، أو المتوسط. الناتج تحت من psql على [[postgres:18]] جوه Docker.

الأوردرات اللي عندنا من الدروس اللي فاتت كلها [[total = 0]]، فالأرقام هتطلع أصفار ملهاش طعم. عشان نشوف أرقام حقيقية ضفنا يوزر وخمس أوردرات جوه [[BEGIN]]، وفي الآخر [[ROLLBACK]]:

~~~text الأمر
BEGIN;
INSERT INTO users (email, name) VALUES ('sara@example.com', 'Sara');
INSERT INTO orders (user_id, status, total, created_at) VALUES
  ((SELECT id FROM users WHERE email = 'you@example.com'),  'paid',      450, '2026-09-03 10:00+00'),
  ((SELECT id FROM users WHERE email = 'you@example.com'),  'paid',      900, '2026-09-03 18:30+00'),
  ((SELECT id FROM users WHERE email = 'you@example.com'),  'cancelled', 300, '2026-09-04 09:00+00'),
  ((SELECT id FROM users WHERE email = 'sara@example.com'), 'paid',      700, '2026-09-05 14:00+00'),
  ((SELECT id FROM users WHERE email = 'sara@example.com'), 'pending',    80, '2026-09-05 16:00+00');
~~~

[[(SELECT id FROM users WHERE email = '...')]] بين قوسين جوه VALUES اسمها **scalar subquery**: استعلام بيرجّع قيمة واحدة بتتحط مكانها، هنا الـ uuid بتاع اليوزر. فبقى عندنا ٨ أوردرات:

~~~text SELECT id, status, total FROM orders ORDER BY id;
 id |  status   | total
----+-----------+--------
  1 | paid      |   0.00
  3 | pending   |   0.00
  4 | pending   |   0.00
 16 | paid      | 450.00
 17 | paid      | 900.00
 18 | cancelled | 300.00
 19 | paid      | 700.00
 20 | pending   |  80.00
(8 rows)
~~~

(الـ ids نطّت لـ 16 لأن تجارب قبلها اترجعت بـ ROLLBACK وسحبت أرقام.) خلّي الجدول ده قدامك وانت بتقرا الأرقام تحت.

---

## ١. [[SELECT count(*) FROM orders;]]

[[count(*)]] = عدد الصفوف. الـ [[*]] هنا معناها «الصف كله»، فبيعد كل صف حتى لو فيه NULL.

~~~text الناتج
 count
-------
     8
(1 row)
~~~

---

## ٢. [[SELECT count(*) FILTER (WHERE status = 'paid') AS paid_orders FROM orders;]]

[[FILTER (WHERE ...)]] بعد الـ aggregate معناها «احسب على الصفوف اللي بتحقق الشرط ده بس». الفرق بينها وبين WHERE العادية: WHERE بتشيل الصفوف من الاستعلام كله، و FILTER بتأثر على الـ aggregate ده بس. فتقدر تحط كذا واحد جنب بعض:

~~~text الناتج
 paid_orders
-------------
           4
(1 row)
~~~

~~~text SELECT count(*) AS all_orders, count(*) FILTER (WHERE status = 'paid') AS paid, count(*) FILTER (WHERE status = 'pending') AS pending FROM orders;
 all_orders | paid | pending
------------+------+---------
          8 |    4 |       3
~~~

٣ أرقام في مرور واحد على الجدول، بدل ٣ استعلامات. (FILTER موجودة في Postgres و SQLite، مش في كل القواعد.)

---

## ٣. [[SELECT sum(total) AS revenue FROM orders WHERE status = 'paid';]]

هنا WHERE عادية: الأول خلّي المدفوع بس (٤ صفوف)، وبعدين [[sum(total)]] تجمع عمود total فيهم:

~~~text الناتج
 revenue
---------
 2050.00
(1 row)
~~~

0 + 450 + 900 + 700 = 2050. والـ cancelled (300) والـ pending (80) برّه.

---

## ٤. [[SELECT round(avg(price), 2) AS avg_price, min(price), max(price) FROM products;]]

ثلاث aggregates في نفس الـ SELECT، كلهم على نفس الصفوف:

| الحتة | معناها |
|---|---|
| [[avg(price)]] | المتوسط |
| [[round(..., 2)]] | قرّب المتوسط لخانتين |
| [[min(price)]] / [[max(price)]] | أصغر وأكبر سعر |

~~~text الناتج
 avg_price |  min   |  max
-----------+--------+--------
    304.75 | 120.00 | 650.00
(1 row)
~~~

من غير round:

~~~text SELECT avg(price) FROM products;
         avg
----------------------
 304.7500000000000000
~~~

avg بترجّع numeric بخانات كتير، عشان كده بنقرّبها. ولاحظ إن [[min]] و [[max]] مالهمش اسم بـ AS، فـ psql سمّاهم باسم الدالة.

---

## ٥. [[SELECT COALESCE(sum(total), 0) AS revenue FROM orders WHERE status = 'refunded';]]

مفيش ولا أوردر [[refunded]]، فالـ WHERE ساب **صفر صفوف**. نشوف sum لوحدها الأول (مع [[\pset null '(null)']] عشان NULL يبان):

~~~text SELECT sum(total) FROM orders WHERE status = 'refunded';
  sum
--------
 (null)
~~~

~~~text SELECT count(*) FROM orders WHERE status = 'refunded';
 count
-------
     0
~~~

[[sum]] على مفيش = NULL (مفيش حاجة تتجمع)، أما [[count]] على مفيش = 0. ونفس كلام sum على avg و min و max.

[[COALESCE(x, 0)]] بترجّع أول قيمة مش NULL، فبتحوّل الـ NULL لصفر:

~~~text الناتج
 revenue
---------
       0
(1 row)
~~~

[[0]] من غير [[.00]] لأن الـ 0 اللي كتبناه integer.

---

## ٦. الغلطة المشهورة

~~~text SELECT status, count(*) FROM orders;
ERROR:  column "orders.status" must appear in the GROUP BY clause or be used in an aggregate function
~~~

[[count(*)]] بيرجّع صف واحد للجدول كله، و [[status]] ليه ٨ قيم. أنهي واحدة تتحط جنب العدد؟ Postgres بيرفض. الحل [[GROUP BY]] (الدرس الجاي).

---

## الخلاصة

| الدالة | بترجّع | على صفر صفوف | NULL |
|---|---|---|---|
| [[count(*)]] | عدد الصفوف | 0 | بيعده |
| [[count(col)]] | عدد اللي مش NULL | 0 | بيتجاهله |
| [[sum(col)]] | المجموع | **NULL** | بيتجاهله |
| [[avg(col)]] | المتوسط | NULL | بيتجاهله |
| [[min]] / [[max]] | أصغر / أكبر | NULL | بيتجاهله |

- WHERE بيختار الصفوف للاستعلام كله، و [[FILTER (WHERE ...)]] لـ aggregate واحد بس.
- [[COALESCE(sum(x), 0)]] عشان الواجهة متعرضش null.
- مينفعش عمود عادي جنب aggregate من غير GROUP BY.`,
          lines: [
            "عدد كل الأوردرات.",
            "عدد المدفوع بس، في نفس المرور على الجدول.",
            "إجمالي الإيرادات من المدفوع.",
            "متوسط السعر لخانتين، وأرخص وأغلى منتج.",
            "لو مفيش صفوف sum بترجّع NULL، فـ COALESCE تخليها صفر."
          ],
          sol: R`هيرجّع صف واحد وعمود sum فاضي: ده NULL (psql بيعرض NULL كخانة فاضية؛ اكتب [[\pset null '(null)']] عشان تشوفها). [[sum]] على صفر صفوف مش بيرجّع 0، بيرجّع NULL، لأن مفيش قيم يجمعها. نفس الكلام على avg و min و max. أما [[count]] فبيرجّع 0.

من Node بـ [[pg]] هتوصلك [[null]]، والواجهة تكتب «null جنيه» أو [[NaN]] لو جمعت عليها. الحل [[COALESCE(sum(total), 0)]] في الاستعلام نفسه. ولاحظ إن COALESCE بيرجّع [[0]] من غير [[.00]]، لأن الـ 0 integer؛ لو عايز الشكل ثابت اكتب [[COALESCE(sum(total), 0.00)]] أو [[0::numeric(10,2)]].`,
          solCode: R`\pset null '(null)'
SELECT sum(total) FROM orders WHERE status = 'refunded';                  -- (null)
SELECT count(*) FROM orders WHERE status = 'refunded';                    -- 0
SELECT COALESCE(sum(total), 0) AS revenue FROM orders WHERE status = 'refunded';   -- 0`,
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
            starter: R`SELECT sum(total) FILTER (WHERE status = 'refunded') AS refunded,
       count(*) AS paid_orders
FROM orders;`,
            expect: [[0,5]],
            solution: R`SELECT COALESCE(sum(total) FILTER (WHERE status = 'refunded'), 0) AS refunded,
       count(*) FILTER (WHERE status = 'paid') AS paid_orders
FROM orders;`
          }
        },
        {
          cmd: "GROUP BY",
          title: "رقم لكل مجموعة: أوردرات كل يوزر أو كل حالة",
          desc: R`[[GROUP BY]] بيقسم الصفوف لمجموعات حسب عمود أو أكتر، والـ aggregate بيتحسب لكل مجموعة لوحدها. فبدل رقم واحد للجدول، بتاخد صف لكل حالة أو لكل يوزر أو لكل يوم.

القاعدة: أي عمود في SELECT لازم يا إما يبقى في GROUP BY، يا إما جوه aggregate.`,
          example: R`SELECT status, count(*) AS orders FROM orders GROUP BY status;
SELECT user_id, count(*) AS orders, sum(total) AS spent
FROM orders GROUP BY user_id ORDER BY spent DESC;
SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY day ORDER BY day;
SELECT status, user_id FROM orders GROUP BY status;       -- error: user_id لازم يبقى في GROUP BY`,
          try: R`غيّر [[date_trunc('day', ...)]] لـ [[date_trunc('month', ...)]]. وبعدين اعمل GROUP BY على [[created_at]] نفسه من غير date_trunc، وشوف ليه كل أوردر بقى مجموعة لوحده. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: إيراد كل شهر من الأوردرات [[paid]]: عمود الشهر بـ [[date_trunc('month', created_at)]] وعمود المجموع، مترتبين بالشهر.`,
          flag: "script",
          deep: {
            why: "أغلب التقارير «لكل»: إيرادات لكل يوم، أوردرات لكل يوزر، مبيعات لكل منتج. GROUP BY بيعملها في استعلام واحد بدل loop على كل يوزر.",
            how: R`الترتيب: WHERE بيفلتر الصفوف ← بتتقسم مجموعات (بـ hash أو بترتيب) ← الـ aggregate بيتحسب لكل مجموعة ← HAVING ← SELECT.

ليه الـ error في آخر سطر؟ مجموعة status = 'paid' فيها أوردرات من يوزرز كتير، فأنهي user_id يتعرض؟ Postgres مش هيختار عشوائي، بيرفض.

Postgres بيسمح تكتب اسم عمود الناتج أو رقمه في GROUP BY ([[GROUP BY day]] أو [[GROUP BY 1]]). ولو عملت GROUP BY على primary key (زي [[users.id]])، تقدر تعرض أي عمود تاني من نفس الجدول (زي email) من غير ما تحطه في GROUP BY، لأنه معروف إنه واحد لكل id.

الأيام اللي مفيهاش أوردرات مش هتظهر خالص، فالرسم البياني هيبقى فيه فجوات. الحل: [[generate_series]] لكل الأيام مع LEFT JOIN.

في Prisma: [[prisma.order.groupBy({ by: ["status"], _count: true })]].`,
            when: "أي تقرير أو رسم بياني أو ترتيب «الأكتر».",
            mistakes: R`GROUP BY على timestamp كامل فكل صف مجموعة. تجمع بالاسم بدل الـ id فيوزرين بنفس الاسم يتدمجوا. والفجوات في الرسم البياني.`
          },
          teach: R`## الفكرة: قسّم الصفوف أكوام، واحسب لكل كومة

من غير GROUP BY، [[count(*)]] بيرجّع رقم واحد للجدول كله. [[GROUP BY status]] بيقسم الصفوف أكوام: كومة لكل قيمة status، والـ aggregate بيتحسب لكل كومة لوحدها، فبتاخد صف لكل كومة.

الناتج تحت من psql على [[postgres:18]] جوه Docker، بنفس الداتا التجريبية اللي في درس «count و sum و avg» (٨ أوردرات، جوه [[BEGIN]] ... [[ROLLBACK]]):

| id | status | total | اليوزر | اليوم |
|---|---|---|---|---|
| 1 | paid | 0.00 | you@example.com | 7 أكتوبر |
| 3 | pending | 0.00 | you@example.com | 7 أكتوبر |
| 4 | pending | 0.00 | you@example.com | 7 أكتوبر |
| 16 | paid | 450.00 | you@example.com | 3 سبتمبر |
| 17 | paid | 900.00 | you@example.com | 3 سبتمبر |
| 18 | cancelled | 300.00 | you@example.com | 4 سبتمبر |
| 19 | paid | 700.00 | sara@example.com | 5 سبتمبر |
| 20 | pending | 80.00 | sara@example.com | 5 سبتمبر |

(الأوردرات 1 و 3 و 4 من الدروس اللي فاتت، والباقي التجريبية.)

---

## ١. [[SELECT status, count(*) AS orders FROM orders GROUP BY status;]]

خطوة خطوة:
1. [[FROM orders]]: الـ ٨ صفوف.
2. [[GROUP BY status]]: اعمل كومة لكل قيمة status: كومة [[paid]] (٤)، وكومة [[pending]] (٣)، وكومة [[cancelled]] (١).
3. [[SELECT status, count(*)]]: لكل كومة، اكتب قيمة status بتاعتها وعدد صفوفها.

~~~text الناتج
  status   | orders
-----------+--------
 cancelled |      1
 pending   |      3
 paid      |      4
(3 rows)
~~~

[[status]] مسموح في SELECT لأنه هو عمود التجميع: كل كومة ليها status واحدة. والترتيب عشوائي لأن مفيش ORDER BY.

---

## ٢. [[SELECT user_id, count(*) AS orders, sum(total) AS spent FROM orders GROUP BY user_id ORDER BY spent DESC;]]

| الحتة | معناها |
|---|---|
| [[GROUP BY user_id]] | كومة لكل يوزر |
| [[count(*) AS orders]] | عدد أوردراته |
| [[sum(total) AS spent]] | مجموع اللي صرفه |
| [[ORDER BY spent DESC]] | الأكتر صرفًا الأول. [[spent]] اسم AS، و ORDER BY بيتنفذ بعد SELECT فشايفه |

~~~text الناتج
               user_id                | orders |  spent
--------------------------------------+--------+---------
 fd40c24d-5002-4118-b356-41ff21b0a62d |      6 | 1650.00
 cedbc3e9-393e-40fe-84de-14c259287206 |      2 |  780.00
(2 rows)
~~~

اليوزر الأول: ٦ أوردرات، و 0+0+0+450+900+300 = 1650 (مفيش WHERE، فالـ cancelled داخل). Sara: 700 + 80 = 780. الـ uuids عندك هتبقى مختلفة.

---

## ٣. إيراد كل يوم

~~~text الأمر
SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY day ORDER BY day;
~~~

### [[date_trunc('day', created_at)]]

[[date_trunc]] = date truncate، يعني «قُص الوقت». [['day']] معناها: سيب اليوم وصفّر الساعة والدقايق والثواني.

~~~text SELECT date_trunc('day', '2026-09-03 18:30+00'::timestamptz) AS d;
           d
------------------------
 2026-09-03 00:00:00+00
~~~

فأوردرين في نفس اليوم بساعات مختلفة بقوا نفس القيمة بالظبط، وده اللي بيخليهم يقعوا في نفس الكومة. والوحدة ممكن تبقى [['hour']] أو [['week']] أو [['month']] أو [['year']].

### الترتيب

1. [[WHERE status = 'paid']]: المدفوع بس (٤ صفوف) قبل أي تجميع.
2. [[GROUP BY day]]: كومة لكل يوم. Postgres بيسمح تكتب اسم الـ AS هنا ([[day]]) بدل ما تكرر الـ date_trunc كلها.
3. [[sum(total)]] لكل يوم، و [[ORDER BY day]] من الأقدم.

~~~text الناتج
          day           | revenue
------------------------+---------
 2026-09-03 00:00:00+00 | 1350.00
 2026-09-05 00:00:00+00 |  700.00
 2026-10-07 00:00:00+00 |    0.00
(3 rows)
~~~

يوم ٣: 450 + 900 = 1350 (أوردرين اتجمعوا في صف). يوم ٤ مش موجود خالص: كان فيه أوردر بس cancelled، والـ WHERE شاله. الأيام اللي مفيهاش داتا **مبتظهرش** بصفر، بتختفي.

### من غير date_trunc (الـ «جرّب»)

~~~text SELECT created_at, sum(total) AS revenue FROM orders WHERE status = 'paid' GROUP BY created_at ORDER BY created_at;
          created_at           | revenue
-------------------------------+---------
 2026-09-03 10:00:00+00        |  450.00
 2026-09-03 18:30:00+00        |  900.00
 2026-09-05 14:00:00+00        |  700.00
 2026-10-07 08:27:20.560271+00 |    0.00
(4 rows)
~~~

صف لكل أوردر، لأن كل أوردر وقته مختلف (لحد الميكروثانية). الكومة بتتعمل من القيم **المتساوية بالظبط**، فلازم تقُص الوقت الأول.

---

## ٤. [[SELECT status, user_id FROM orders GROUP BY status;]]

~~~text الناتج
ERROR:  column "orders.user_id" must appear in the GROUP BY clause or be used in an aggregate function
LINE 1: SELECT status, user_id FROM orders GROUP BY status;
                       ^
~~~

كومة [[paid]] فيها أوردرات من يوزرين. لما تطلب [[user_id]] جنب [[paid]]، تقصد أنهي واحد؟ Postgres مش هيختار عشوائي. الـ error بيقولك الحلين: حطه في [[GROUP BY]] (فتبقى الكومة لكل status + user_id)، أو حطه جوه aggregate (زي [[count(DISTINCT user_id)]]).

استثناء واحد: لو جمّعت بالـ primary key، تقدر تعرض أي عمود تاني من نفس الجدول، لأنه أكيد قيمة واحدة لكل id:

~~~text SELECT u.email, count(*) AS orders FROM orders o JOIN users u ON u.id = o.user_id GROUP BY u.id ORDER BY orders DESC;
      email       | orders
------------------+--------
 you@example.com  |      6
 sara@example.com |      2
~~~

([[JOIN]] بيربط كل أوردر بصاحبه، و [[o]] و [[u]] أسماء مختصرة للجدولين. ده درس «INNER JOIN» في المستوى التاني.)

---

## الخلاصة

| الخطوة | الجزء |
|---|---|
| ١ | [[FROM]]: الصفوف |
| ٢ | [[WHERE]]: فلترة الصفوف |
| ٣ | [[GROUP BY]]: أكوام |
| ٤ | aggregate لكل كومة |
| ٥ | [[SELECT]]: صف لكل كومة |
| ٦ | [[ORDER BY]] |

- أي عمود في SELECT: يا إما في GROUP BY، يا إما جوه aggregate.
- الوقت يتجمّع بعد [[date_trunc]]، وإلا كل صف كومة.
- الأيام/المجموعات اللي ملهاش صفوف مش بتظهر بصفر.`,
          lines: [
            "عدد الأوردرات لكل حالة.",
            "لكل يوزر: عدد أوردراته ومجموع اللي صرفه،",
            "والأكتر صرفًا الأول.",
            "إيرادات كل يوم: date_trunc بيقص الوقت لأول اليوم،",
            "من المدفوع بس،",
            "مجمّعة باليوم ومترتبة.",
            "غلط: user_id مش في GROUP BY ومش جوه aggregate."
          ],
          sol: R`بـ [[date_trunc('month', ...)]] هتاخد صف لكل شهر، والقيمة بتبان كأول لحظة في الشهر: [[2026-09-01 00:00:00+00]]. عشان تشوف أكتر من صف ضيف أوردرين paid بتاريخ في أغسطس (INSERT بـ created_at صريح).

GROUP BY على [[created_at]] نفسه هيرجّع صف لكل أوردر تقريبًا، لأن الوقت فيه ميكروثواني ومفيش أوردرين في نفس اللحظة بالظبط، فكل مجموعة فيها صف واحد والـ sum هو نفس total. المجموعة بتتكوّن من القيم المتساوية بالظبط، فلازم تقرّب الوقت لليوم أو الشهر الأول. ولو التقرير طلع صف لكل أوردر، أول حاجة تبص عليها هي العمود اللي في GROUP BY.`,
          solCode: R`INSERT INTO orders (user_id, status, total, created_at)
SELECT id, 'paid', 300, '2026-08-15 10:00+00' FROM users LIMIT 1;
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY month ORDER BY month;
SELECT created_at, sum(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY created_at ORDER BY created_at;   -- صف لكل أوردر`,
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
            starter: R`SELECT created_at AS month, sum(total) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY created_at
ORDER BY 1;`,
            expectSql: R`SELECT date_trunc('month', created_at), sum(total) FROM orders WHERE status = 'paid' GROUP BY 1 ORDER BY 1;`,
            solution: R`SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY 1
ORDER BY 1;`,
            ordered: true
          }
        },
        {
          cmd: "HAVING",
          title: "فلتر المجموعات بعد ما تتحسب",
          desc: R`[[HAVING]] زي WHERE بس بيشتغل بعد GROUP BY، على نتيجة الـ aggregate. «هات اليوزرز اللي عملوا أكتر من ٣ أوردرات» محتاجة HAVING، لأن عدد الأوردرات مش معروف غير بعد التجميع.

WHERE بيفلتر الصفوف قبل التجميع، و HAVING بيفلتر المجموعات بعده، وتقدر تستخدم الاتنين في نفس الاستعلام.`,
          example: R`SELECT user_id, count(*) AS orders
FROM orders
GROUP BY user_id
HAVING count(*) > 3;
SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING sum(total) >= 1000
ORDER BY spent DESC;
SELECT user_id FROM orders WHERE count(*) > 3 GROUP BY user_id;   -- error: aggregate في WHERE`,
          try: R`جرّب [[HAVING spent >= 1000]] بالاسم بدل [[sum(total)]]: Postgres هيرفض. وبعدين حط نفس الاسم في ORDER BY: هيقبله. ليه؟ الإجابة في ترتيب التنفيذ. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[user_id]] ومجموع اللي دفعه (أوردرات [[paid]] بس)، لليوزرز اللي دفعوا 1000 أو أكتر، من الأكبر للأصغر.`,
          flag: "script",
          deep: {
            why: "أسئلة زي «اليوزرز الـ VIP» و «المنتجات اللي اتباعت أكتر من ١٠٠ مرة» شرطها على رقم متجمّع، ومفيش طريقة تكتبها في WHERE.",
            how: R`ترتيب التنفيذ: FROM ← WHERE ← GROUP BY ← HAVING ← SELECT ← ORDER BY. عشان كده:

- WHERE مش شايف [[count(*)]]، لأن التجميع لسه محصلش.
- HAVING مش شايف اسم [[spent]] اللي في SELECT، لأن SELECT بيتحسب بعده (في Postgres؛ MySQL أرحم في النقطة دي).
- ORDER BY شايف كل حاجة، لأنه في الآخر.

أي شرط مش على aggregate (زي status) حطه في WHERE: الصفوف بتتفلتر بدري، فالتجميع بيشتغل على داتا أقل.`,
            when: "لما الشرط على نتيجة count أو sum أو avg. وده سؤال انترفيو ثابت (الفرق بين WHERE و HAVING).",
            mistakes: R`تحط [[HAVING status = 'paid']]: هتشتغل لو status في GROUP BY، و Postgres غالبًا بينقلها لـ WHERE لوحده، بس مش واضحة ومتعتمدش إن كل قاعدة هتعمل كده. تستخدم اسم الـ AS في HAVING. وتحط aggregate في WHERE.`
          },
          teach: R`## الفكرة: WHERE للصفوف، HAVING للأكوام

درس «GROUP BY» قسّم الصفوف أكوام وحسب رقم لكل كومة. [[HAVING]] بييجي بعد كده ويقول «خلّي الأكوام اللي رقمها كذا بس». الفرق مع WHERE في **التوقيت**: WHERE بيشتغل على الصفوف قبل التجميع، و HAVING على الأكوام بعده.

الناتج تحت من psql على [[postgres:18]] جوه Docker، بنفس الداتا التجريبية اللي في درس «count و sum و avg»: اليوزر الأول ([[fd40c24d...]]) عنده ٦ أوردرات، منهم paid بـ 0 و 450 و 900 و cancelled بـ 300. و Sara ([[cedbc3e9...]]) عندها paid بـ 700 و pending بـ 80.

---

## ١. اليوزرز اللي عندهم أكتر من ٣ أوردرات

~~~text الأمر
SELECT user_id, count(*) AS orders
FROM orders
GROUP BY user_id
HAVING count(*) > 3;
~~~

بترتيب التنفيذ:
1. [[FROM orders]]: الـ ٨ صفوف.
2. [[GROUP BY user_id]]: كومتين، كومة لكل يوزر: ٦ و ٢.
3. [[HAVING count(*) > 3]]: لكل كومة احسب [[count(*)]] واسأل «أكبر من ٣؟». الأولى 6 = أيوه، التانية 2 = لأ، فتترمي.
4. [[SELECT user_id, count(*) AS orders]]: اعرض الكومة اللي فضلت.

~~~text الناتج
               user_id                | orders
--------------------------------------+--------
 fd40c24d-5002-4118-b356-41ff21b0a62d |      6
(1 row)
~~~

ليه مينفعش WHERE هنا؟ آخر سطر في المثال بيوريك:

~~~text SELECT user_id FROM orders WHERE count(*) > 3 GROUP BY user_id;
ERROR:  aggregate functions are not allowed in WHERE
LINE 1: SELECT user_id FROM orders WHERE count(*) > 3 GROUP BY user_...
                                         ^
~~~

[[aggregate functions are not allowed in WHERE]]: WHERE بيتسأل لكل **صف** لوحده، وصف واحد ملوش «عدد». العدد بيبقى موجود بس بعد ما الصفوف تتجمّع، يعني بعد WHERE.

---

## ٢. WHERE و HAVING مع بعض

~~~text الأمر
SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING sum(total) >= 1000
ORDER BY spent DESC;
~~~

نمشي عليه بالترتيب ونشوف الأرقام بتتغير إزاي:

### الخطوة ١: [[WHERE status = 'paid']]

قبل أي تجميع، الصفوف اللي مش paid بتترمي: الـ cancelled (300) والـ pending كلهم. فاضل ٤ صفوف.

### الخطوة ٢: [[GROUP BY user_id]] و [[sum(total)]]

~~~text نفس الاستعلام من غير HAVING ولا ORDER BY
               user_id                |  spent
--------------------------------------+---------
 cedbc3e9-393e-40fe-84de-14c259287206 |  700.00
 fd40c24d-5002-4118-b356-41ff21b0a62d | 1350.00
~~~

اليوزر الأول: 0 + 450 + 900 = 1350. و Sara: 700. ولو شلت الـ WHERE كان الأول هيبقى 1650 (الـ cancelled داخل) و Sara 780، يعني WHERE غيّرت الأرقام نفسها، مش بس عدد الصفوف.

### الخطوة ٣: [[HAVING sum(total) >= 1000]]

1350 ≥ 1000 = أيوه. 700 ≥ 1000 = لأ، فـ Sara برّه.

### الخطوة ٤: [[ORDER BY spent DESC]]

رتّب اللي فضل من الأكبر.

~~~text الناتج
               user_id                |  spent
--------------------------------------+---------
 fd40c24d-5002-4118-b356-41ff21b0a62d | 1350.00
(1 row)
~~~

---

## ٣. ليه [[sum(total)]] متكررة مش [[spent]] (الـ «جرّب»)

~~~text SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid' GROUP BY user_id HAVING spent >= 1000;
ERROR:  column "spent" does not exist
LINE 1: ...ers WHERE status = 'paid' GROUP BY user_id HAVING spent >= 1...
                                                             ^
~~~

ونفس الاسم في ORDER BY اشتغل عادي فوق. السبب ترتيب التنفيذ:

| الترتيب | الجزء | يعرف [[spent]]؟ |
|---|---|---|
| ١ | [[FROM]] | لأ |
| ٢ | [[WHERE]] | لأ، ومش شايف aggregates كمان |
| ٣ | [[GROUP BY]] | لأ |
| ٤ | [[HAVING]] | **لأ**، الاسم لسه متعملش |
| ٥ | [[SELECT]] | هنا [[AS spent]] بيتعمل |
| ٦ | [[ORDER BY]] | **أيوه** |
| ٧ | [[LIMIT]] | — |

فـ HAVING لازم يكتب الـ aggregate نفسه. وده مش بيحسب الجمع مرتين: Postgres بيعرف إن [[sum(total)]] في HAVING هي نفس اللي في SELECT.

---

## الخلاصة

| | [[WHERE]] | [[HAVING]] |
|---|---|---|
| بيشتغل على | كل صف | كل كومة (بعد GROUP BY) |
| إمتى | قبل التجميع | بعد التجميع |
| يقدر يستخدم aggregate | لأ | أيوه |
| يعرف اسم الـ AS | لأ | لأ (في Postgres) |

- الشرط على عمود عادي (زي status) مكانه WHERE: بيقلل الصفوف قبل التجميع ويغيّر الأرقام.
- الشرط على رقم متجمّع (count أو sum) مكانه HAVING.
- في HAVING اكتب الـ aggregate نفسه، والاسم المستعار استخدمه في ORDER BY بس.`,
          lines: [
            "لكل يوزر عدد أوردراته،",
            "من جدول الأوردرات،",
            "مجمّعة باليوزر،",
            "وخلّي اللي عددهم أكتر من ٣ بس.",
            "لكل يوزر مجموع اللي صرفه،",
            "من جدول الأوردرات،",
            "WHERE: الصفوف المدفوعة بس، قبل التجميع،",
            "مجمّعة باليوزر،",
            "HAVING: المجموعات اللي صرفت ١٠٠٠ أو أكتر، بعد التجميع،",
            "والأكتر الأول (ORDER BY يعرف اسم spent).",
            "غلط: WHERE ميعرفش count لسه."
          ],
          sol: R`[[HAVING spent >= 1000]] هيطلّع [[ERROR:  column "spent" does not exist]]. و [[ORDER BY spent DESC]] هيشتغل عادي.

السبب ترتيب التنفيذ المنطقي: FROM ثم WHERE ثم GROUP BY ثم HAVING ثم SELECT ثم ORDER BY ثم LIMIT. الاسم [[spent]] بيتعمل في SELECT، فـ HAVING (اللي قبلها) مش شايفاه، و ORDER BY (اللي بعدها) شايفاه. عشان كده في HAVING بتكرر [[sum(total)]]، وده مش بيحسبها مرتين، Postgres بيعرف إنها نفس الـ aggregate. (بعض القواعد زي MySQL بتسمح بالاسم في HAVING، بس دي إضافة منها مش SQL قياسي.)

ده سؤال انترفيو مشهور: «اكتب ترتيب تنفيذ SELECT»، و «ليه مينفعش aggregate في WHERE».`,
          solCode: R`SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid'
GROUP BY user_id HAVING spent >= 1000;
-- ERROR:  column "spent" does not exist
SELECT user_id, sum(total) AS spent FROM orders WHERE status = 'paid'
GROUP BY user_id HAVING sum(total) >= 1000
ORDER BY spent DESC;`,
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
            starter: R`SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING spent >= 1000
ORDER BY spent DESC;`,
            expect: [[1,1410], [2,1200]],
            solution: R`SELECT user_id, sum(total) AS spent
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING sum(total) >= 1000
ORDER BY spent DESC;`,
            ordered: true
          }
        }
      ]
    }
]);
