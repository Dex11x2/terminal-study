// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "window functions و pagination",
      l: 2,
      n: "حسابات على صفوف جنب بعض من غير ما تدمجهم، وتقسيم النتايج لصفحات بشكل ميبطّأش",
      items: [
        {
          cmd: "window functions",
          title: "آخر أوردر لكل يوزر، ومجموع تراكمي للإيرادات",
          desc: R`الـ window function بتحسب قيمة لكل صف من صفوف تانية مرتبطة بيه، من غير ما تدمج الصفوف زي GROUP BY. و [[OVER (PARTITION BY ... ORDER BY ...)]] بتحدد «الشباك»: PARTITION BY يقسم مجموعات، و ORDER BY يرتب جوه كل مجموعة.

[[ROW_NUMBER()]] بيدّي كل صف رقمه جوه مجموعته (أحدث أوردر لكل يوزر، أو أعلى ٣ منتجات في كل تصنيف)، و [[SUM() OVER (ORDER BY ...)]] بيعمل مجموع تراكمي للإيرادات يوم بيوم.`,
          example: R`SELECT id, user_id, total FROM (
  SELECT id, user_id, total,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn = 1;
SELECT day, revenue,
       SUM(revenue) OVER (ORDER BY day) AS running_total
FROM (
  SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
  FROM orders WHERE status = 'paid' GROUP BY 1
) d
ORDER BY day;`,
          try: R`غيّر [[rn = 1]] لـ [[rn <= 3]] (آخر ٣ أوردرات لكل يوزر). وضيف عمود [[LAG(revenue) OVER (ORDER BY day)]] للاستعلام التاني عشان تقارن كل يوم باللي قبله. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: آخر ٣ أوردرات لكل يوزر: [[user_id]] و [[id]] و [[rn]]، مترتبين بـ [[user_id]] وبعدين [[rn]].`,
          flag: "script",
          deep: {
            why: "«آخر أوردر لكل يوزر» و «أعلى ٣ في كل قسم» و «مجموع تراكمي» و «الفرق عن امبارح» أسئلة بتتسأل كل يوم في التقارير. من غير window functions بتتحل بـ subqueries معقدة أو بتجيب كل الداتا وتحسب في الكود.",
            how: R`الـ window functions بتتحسب بعد WHERE و GROUP BY و HAVING وقبل ORDER BY و LIMIT. عشان كده مينفعش [[WHERE rn = 1]] في نفس المستوى: [[rn]] لسه متحسبش. بتلفها في subquery أو CTE وتفلتر برّه.

[[ROW_NUMBER]] بيدّي أرقام متتالية حتى لو فيه تعادل. [[RANK]] بيدّي المتعادلين نفس الرقم ويسيب فجوة (1، 1، 3). [[DENSE_RANK]] من غير فجوة (1، 1، 2).

الـ frame: لما تكتب ORDER BY جوه OVER، الافتراضي «من أول المجموعة لحد الصف الحالي ومعاه أي صف متعادل معاه في الترتيب». يعني صفين بنفس قيمة الـ ORDER BY (زي أوردرين بنفس created_at بالظبط) بياخدوا نفس المجموع. لو عايز صف بصف بالظبط: [[ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW]].

[[LAG]] و [[LEAD]] بيجيبوا قيمة الصف اللي قبل أو بعد. و [[sum(total) OVER (PARTITION BY user_id)]] بيحط إجمالي اليوزر جنب كل أوردر من أوردراته، فتحسب النسبة.

وفي Postgres بديل أقصر لـ «أول صف لكل مجموعة»: [[SELECT DISTINCT ON (user_id) ... ORDER BY user_id, created_at DESC]]. والـ index على [[(user_id, created_at DESC)]] بيسرّع الاتنين.`,
            when: "ترتيب جوه مجموعات، top-N لكل مجموعة، مجاميع تراكمية، ومقارنة صف باللي قبله.",
            mistakes: R`window function في WHERE. تنسى PARTITION BY فيبقى الترقيم على الجدول كله. تعادل القيم مع الـ frame الافتراضي. وتحسب ده في JavaScript بعد ما تجيب كل الأوردرات.`
          },
          teach: R`## الفكرة: عمود جديد بيتحسب من صفوف جيرانك، والصفوف نفسها مبتتدمجش

[[GROUP BY]] بيلم كل مجموعة في صف واحد. الـ window function بتسيب كل الصفوف زي ما هي، وتحط جنب كل صف رقم محسوب من مجموعته: ترتيبه جواها، أو مجموع اللي قبله. المثال فيه استعلامين: «آخر أوردر لكل يوزر» بـ [[ROW_NUMBER]]، و «مجموع الإيرادات التراكمي يوم بيوم» بـ [[SUM() OVER]].

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker. في lab المتجر كل الأوردرات ليوزر واحد، فالنتيجة مش بتوضح حاجة، فعملنا قاعدة صغيرة جنبها فيها ٦ أوردرات لـ ٣ يوزرز (10 و 20 و 30) عشان نشوف كل خطوة:

~~~text orders (القاعدة الصغيرة)
 id | user_id | status    | total  | created_at
  1 |      10 | paid      | 300.00 | 2026-10-01 09:00
  2 |      20 | paid      | 150.00 | 2026-10-01 14:00
  3 |      10 | paid      | 200.00 | 2026-10-02 11:00
  4 |      30 | pending   |  90.00 | 2026-10-02 18:00
  5 |      20 | paid      | 500.00 | 2026-10-03 10:00
  6 |      10 | cancelled | 120.00 | 2026-10-04 08:30
~~~

---

## ١. الاستعلام الجوّاني: [[ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)]]

نفكّه من جوه:

| الحتة | معناها |
|---|---|
| [[ROW_NUMBER()]] | دالة بتدّي كل صف رقم: 1، 2، 3... |
| [[OVER (...)]] | الكلمة اللي بتخليها window function. اللي بين القوسين هو «الشباك» |
| [[PARTITION BY user_id]] | قسّم الصفوف مجموعات، مجموعة لكل يوزر. الترقيم بيبدأ من 1 في كل مجموعة |
| [[ORDER BY created_at DESC]] | رتّب جوه كل مجموعة بالأحدث، فالأحدث ياخد 1 |
| [[AS rn]] | اسم العمود الجديد (row number) |

لو شغّلنا الجزء الجوّاني لوحده:

~~~text الناتج
 id | user_id | total  |       created_at       | rn
----+---------+--------+------------------------+----
  6 |      10 | 120.00 | 2026-10-04 08:30:00+00 |  1
  3 |      10 | 200.00 | 2026-10-02 11:00:00+00 |  2
  1 |      10 | 300.00 | 2026-10-01 09:00:00+00 |  3
  5 |      20 | 500.00 | 2026-10-03 10:00:00+00 |  1
  2 |      20 | 150.00 | 2026-10-01 14:00:00+00 |  2
  4 |      30 |  90.00 | 2026-10-02 18:00:00+00 |  1
(6 rows)
~~~

الـ ٦ صفوف لسه موجودين (عكس GROUP BY)، وكل يوزر ترقيمه لوحده: اليوزر 10 عنده 1 و 2 و 3، و 20 عنده 1 و 2، و 30 عنده 1.

ولو نسيت [[PARTITION BY]]، الترقيم بيبقى على الجدول كله:

~~~text ROW_NUMBER() OVER (ORDER BY created_at DESC)
 id | user_id | rn
----+---------+----
  6 |      10 |  1
  5 |      20 |  2
  4 |      30 |  3
  3 |      10 |  4
...
~~~

---

## ٢. ليه subquery؟ ليه مش [[WHERE rn = 1]] على طول؟

~~~text الناتج
SELECT ..., ROW_NUMBER() OVER (...) AS rn FROM orders WHERE rn = 1;
ERROR:  column "rn" does not exist

SELECT ... FROM orders WHERE ROW_NUMBER() OVER (...) = 1;
ERROR:  window functions are not allowed in WHERE
~~~

الترتيب اللي Postgres بينفّذ بيه: [[FROM]] ثم [[WHERE]] ثم [[GROUP BY]] ثم [[HAVING]] ثم الـ window functions ثم [[ORDER BY]] و [[LIMIT]]. وقت الـ WHERE، الـ [[rn]] لسه متحسبش. فبنحسبه جوه subquery، والـ subquery بتطلّع جدول عادي فيه عمود [[rn]]، ونفلتر عليه برّه:

~~~sql
SELECT id, user_id, total FROM (
  ...
) t
WHERE rn = 1;
~~~

[[t]] اسم للـ subquery (Postgres بيقبلها من غير اسم من نسخة 16، بس النسخ الأقدم بتطلبه، فاكتبه دايمًا).

~~~text الناتج
 id | user_id | total
----+---------+--------
  6 |      10 | 120.00
  5 |      20 | 500.00
  4 |      30 |  90.00
(3 rows)
~~~

أحدث أوردر لكل يوزر. والرقم في الـ WHERE هو اللي بيحدد كام صف لكل يوزر: [[rn = 1]] الأحدث بس، و [[rn = 2]] اللي قبله، وهكذا.

وفي lab المتجر (٢٠٠ ألف أوردر ليوزر واحد) نفس الاستعلام رجّع صف واحد في حوالي ١٠٠ms، لأنه رقّم الـ ٢٠٠ ألف صف عشان يختار واحد.

---

## ٣. الاستعلام التاني: المجموع التراكمي

### الجزء الجوّاني: إيراد كل يوم

~~~sql
SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
FROM orders WHERE status = 'paid' GROUP BY 1
~~~

[[date_trunc('day', ...)]] بيقص الوقت لأول اليوم (الساعة 00:00)، فكل أوردرات اليوم الواحد بتبقى نفس القيمة. و [[GROUP BY 1]] معناها «جمّع بأول عمود في الـ SELECT» (اللي هو day).

~~~text الناتج
          day           | revenue
------------------------+---------
 2026-10-01 00:00:00+00 |  450.00
 2026-10-02 00:00:00+00 |  200.00
 2026-10-03 00:00:00+00 |  500.00
~~~

يوم 1: 300 + 150. يوم 2: 200 بس (الـ 90 pending). يوم 4 مش موجود لأن أوردره cancelled.

### برّه: [[SUM(revenue) OVER (ORDER BY day)]]

[[SUM]] هنا مش aggregate عادي، لأن بعده [[OVER]]. ومن غير PARTITION BY، الشباك هو كل الصفوف، و [[ORDER BY day]] جوه OVER معناها «من أول صف لحد الصف الحالي»:

~~~text الناتج
          day           | revenue | running_total
------------------------+---------+---------------
 2026-10-01 00:00:00+00 |  450.00 |        450.00
 2026-10-02 00:00:00+00 |  200.00 |        650.00
 2026-10-03 00:00:00+00 |  500.00 |       1150.00
~~~

450، وبعدين 450 + 200 = 650، وبعدين 650 + 500 = 1150. و [[ORDER BY day]] اللي في الآخر برّه بيرتّب **العرض**، مش الحساب.

---

## ٤. [[LAG]]: قيمة الصف اللي قبله (تجربة الـ try)

~~~text LAG(revenue) OVER (ORDER BY day) AS prev_day
          day           | revenue | prev_day
------------------------+---------+----------
 2026-10-01 00:00:00+00 |  450.00 |
 2026-10-02 00:00:00+00 |  200.00 |   450.00
 2026-10-03 00:00:00+00 |  500.00 |   200.00
~~~

أول يوم ملوش قبله، فـ NULL (الخانة الفاضية). و [[LEAD]] العكس: الصف اللي بعده.

---

## ٥. فخ الـ frame مع القيم المتعادلة

لما عملنا مجموع تراكمي بالتاريخ بس ([[created_at::date]]) على الأوردرات نفسها، فيه أوردرين في كل يوم:

~~~text الناتج
 id | total  | by_date_range | by_rows
----+--------+---------------+---------
  1 | 300.00 |        450.00 |  300.00
  2 | 150.00 |        450.00 |  450.00
  3 | 200.00 |        740.00 |  650.00
  4 |  90.00 |        740.00 |  740.00
  5 | 500.00 |       1240.00 | 1240.00
  6 | 120.00 |       1360.00 | 1360.00
~~~

- [[by_date_range]] ([[SUM(total) OVER (ORDER BY created_at::date)]]): الافتراضي بياخد الصف الحالي **ومعاه كل صف متعادل معاه** في الترتيب، فالأوردرين 1 و 2 (نفس اليوم) أخدوا نفس المجموع 450.
- [[by_rows]] (مع [[ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW]]): صف بصف بالظبط. [[UNBOUNDED PRECEDING]] = من أول الشباك، و [[CURRENT ROW]] = لحد الصف ده.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[OVER ()]] | بتحوّل الدالة لـ window function: الصفوف متتدمجش |
| [[PARTITION BY x]] | مجموعة لكل قيمة من x، والحساب بيبدأ من الأول في كل واحدة |
| [[ORDER BY y]] جوه OVER | ترتيب الحساب، ومعاه الـ frame بيبقى «من الأول لحد هنا» |
| [[ROW_NUMBER]] / [[LAG]] / [[SUM]] | ترقيم / الصف اللي قبله / مجموع |
| subquery + WHERE برّه | الطريقة الوحيدة تفلتر على نتيجة window function |`,
          lines: [
            "الأوردر الأحدث لكل يوزر: برّه بنفلتر،",
            "وجوه بنحسب لكل أوردر،",
            "رقمه وسط أوردرات نفس اليوزر، الأحدث رقم 1،",
            "من الأوردرات.",
            "قفلة الـ subquery.",
            "خلّي رقم 1 بس.",
            "كل يوم وإيراده،",
            "ومجموع كل الأيام لحد اليوم ده.",
            "من:",
            "إيراد كل يوم،",
            "من المدفوع، مجمّع باليوم.",
            "قفلة.",
            "بالترتيب."
          ],
          sol: R`بـ [[rn <= 3]] هتاخد لحد ٣ صفوف لكل يوزر، مرتبين من الأحدث، وعمود rn فيه 1 و 2 و 3. اليوزر اللي عنده أوردرين بس هيظهر بصفين. ضيف [[rn]] للـ SELECT و [[ORDER BY user_id, rn]] عشان تشوفها واضحة.

عمود [[LAG(revenue) OVER (ORDER BY day)]] بيجيب إيراد اليوم اللي قبله في نفس الصف. أول يوم هيبقى NULL لأن مفيش قبله، وده صح. و [[revenue - LAG(revenue) OVER (ORDER BY day)]] بيديك الفرق (موجب أو سالب). الغلطة الشائعة إنك تفتكر LAG بيجيب «امبارح» بالتاريخ: هو بيجيب الصف اللي قبله في الترتيب، فلو يوم مفيهوش أوردرات هيقارن بآخر يوم فيه. لو عايز كل الأيام، اعمل join مع [[generate_series]] للتواريخ الأول.`,
          solCode: R`SELECT id, user_id, total, rn FROM (
  SELECT id, user_id, total,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn <= 3
ORDER BY user_id, rn;
SELECT day, revenue,
       SUM(revenue) OVER (ORDER BY day) AS running_total,
       LAG(revenue) OVER (ORDER BY day) AS prev_day,
       revenue - LAG(revenue) OVER (ORDER BY day) AS diff
FROM (
  SELECT date_trunc('day', created_at) AS day, sum(total) AS revenue
  FROM orders WHERE status = 'paid' GROUP BY 1
) d
ORDER BY day;`,
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
            starter: R`SELECT user_id, id, rn FROM (
  SELECT user_id, id,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn = 1
ORDER BY user_id, rn;`,
            expect: [[1,8,1], [1,4,2], [1,2,3], [2,6,1], [2,3,2], [3,7,1], [3,5,2]],
            solution: R`SELECT user_id, id, rn FROM (
  SELECT user_id, id,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) t
WHERE rn <= 3
ORDER BY user_id, rn;`,
            ordered: true
          }
        },
        {
          cmd: "keyset pagination",
          title: "صفحات سريعة حتى في الصفحة الألف",
          desc: R`[[LIMIT 20 OFFSET 10000]] بيخلي Postgres يقرا ١٠٠٢٠ صف ويرمي أول ١٠ آلاف، فكل ما الصفحة تبعد تبطأ. ولو اتضاف صف جديد وانت بتقلّب، الصفوف بتزحلق فتشوف صف مرتين أو يفوتك صف.

الـ keyset (أو cursor) pagination بدل «عدّي كذا صف» بيقول «هات اللي بعد آخر صف شفته»: [[WHERE (created_at, id) < (آخر وقت، آخر id)]]. مع index مناسب بيبدأ من المكان ده على طول، فالصفحة الألف زي الأولى.`,
          example: R`SELECT id, total, created_at FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 100000;
CREATE INDEX orders_created_id_idx ON orders (created_at DESC, id DESC);
SELECT id, total, created_at FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 20;
SELECT id, total, created_at FROM orders
WHERE (created_at, id) < ('2026-03-01 10:00:00+00', 1234)
ORDER BY created_at DESC, id DESC
LIMIT 20;`,
          try: R`قيس الاستعلام الأول بـ [[\timing]] مع OFFSET 0 و OFFSET 100000. وبعدين خد آخر صف من صفحة، وحط الـ created_at والـ id بتوعه في الاستعلام الأخير، وقيس. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: آخر صف في الصفحة اللي فاتت كان [[created_at = '2026-09-10 10:00+00']] و [[id = 11]]. هات [[id]] بتاع الـ ٣ صفوف اللي بعده بالترتيب [[created_at DESC, id DESC]]. فيه أوردرين تانيين في نفس اللحظة بالظبط (10 و 7)، ولازم ميضيعوش.`,
          flag: "script",
          deep: {
            why: "الـ infinite scroll والـ feeds والـ APIs اللي بتتقلّب بالصفحات بتوصل لصفحات بعيدة، والـ OFFSET بيخلي كل صفحة أبطأ من اللي قبلها، والـ database بتتعب على الفاضي.",
            how: R`الـ row comparison [[(a, b) < (x, y)]] معناها [[a < x OR (a = x AND b < y)]]، و Postgres بيستخدم الـ index المركب عليها مباشرة: يروح للنقطة دي ويقرا ٢٠ صف ويقف.

الـ id موجود كـ tiebreaker: created_at ممكن يتكرر، ومن غيره ممكن صف يتنط.

الـ API بيرجّع مع كل صفحة [[nextCursor]] (الـ created_at والـ id بتوع آخر صف، متحولين لـ base64 كـ string مقفول عشان العميل ميعتمدش على شكلهم؛ ده encoding مش تشفير، فالسيرفر لازم يتحقق من القيم بعد ما يفكها، ولو عايز تمنع التلاعب اعمله sign بـ HMAC)، والعميل يبعته في الطلب الجاي.

التمن: مفيش «روح للصفحة ٥٧» مباشرة، ومفيش عدد صفحات ببلاش. عشان كده الـ OFFSET لسه كويس للوحات أدمن صغيرة فيها أرقام صفحات. و [[count(*)]] لعدد الصفحات على جدول كبير غالي؛ اعرض «فيه أكتر» بدل الرقم، أو رقم تقريبي.

في Prisma: [[cursor: { id: lastId }, skip: 1, take: 20]] مع orderBy فيه عمود unique. وفي supabase-js: [[.lt("created_at", cursor).order("created_at", { ascending: false }).limit(20)]] (ولو فيه تكرار في الوقت محتاج [[.or()]] للـ tiebreaker).`,
            when: "infinite scroll، و feeds، و APIs عامة، وأي جدول كبير بيكبر. والـ OFFSET للجداول الصغيرة اللي محتاجة أرقام صفحات.",
            mistakes: R`keyset على عمود مش فريد من غير tiebreaker، فصفوف بتضيع. ORDER BY مش مطابق للـ index ولا معكوسه بالكامل: اتجاهات مخلوطة (زي created_at DESC, id ASC على index (DESC, DESC)) أو أعمدة بترتيب غير ترتيب الـ index، فـ Postgres يعمل Sort بدل ما يقرا من الـ index (العكس الكامل ASC, ASC عادي، بيقرا الـ index بالعكس). وخلط الاتجاهات كمان بيخلّي الـ row comparison الواحدة غلط، لازم تتكتب a < x OR (a = x AND b > y). و OFFSET في infinite scroll على جدول بيتضاف فيه كل ثانية.`
          },
          teach: R`## الفكرة: «عدّي ١٠٠ ألف» ولا «ابدأ من هنا»؟

المثال بيقارن طريقتين للصفحات على [[orders]] (٢٠٠ ألف صف من درس B-tree index): [[OFFSET]] اللي بيعدّ ويرمي، و keyset اللي بيقول «هات اللي بعد آخر صف شفته». وبينهم index بنفس ترتيب الصفحات.

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker، مع [[\timing on]]. والجدول عليه وقتها [[orders_created_at_idx]] من الدرس ده والفهارس اللي بعده.

---

## ١. الطريقة البطيئة: [[LIMIT 20 OFFSET 100000]]

~~~sql
SELECT id, total, created_at FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 100000;
~~~

| الحتة | معناها |
|---|---|
| [[ORDER BY created_at DESC]] | الأحدث الأول |
| [[, id DESC]] | لو أوردرين بنفس الوقت بالظبط، رتّبهم بالـ id. كده الترتيب ثابت ومفيش صفين «متعادلين» |
| [[LIMIT 20]] | هات ٢٠ صف (حجم الصفحة) |
| [[OFFSET 100000]] | بس الأول عدّي ١٠٠ ألف صف. ده الصفحة رقم ٥٠٠١ |

| | الوقت |
|---|---|
| [[OFFSET 0]] | 1.5 ms |
| [[OFFSET 100000]] | 132 ms |

والخطة بتقول السبب:

~~~text EXPLAIN ANALYZE (قبل الـ index الجديد)
 Limit  (actual time=55.588..55.592 rows=20.00 loops=1)
   ->  Incremental Sort  (actual time=0.060..52.821 rows=100020.00 loops=1)
         Sort Key: created_at DESC, id DESC
         Presorted Key: created_at
         ->  Index Scan Backward using orders_created_at_idx on orders  (actual time=0.028..39.134 rows=100021.00 loops=1)
 Execution Time: 55.612 ms
~~~

[[rows=100020.00]]: قرا ١٠٠٠٢٠ صف عشان يرجّع ٢٠. وكمان [[Incremental Sort]]: الفهرس الموجود مترتب بـ [[created_at]] بس ([[Presorted Key]])، فكان لازم يرتّب بالـ [[id]] جوه كل وقت متكرر.

---

## ٢. [[CREATE INDEX orders_created_id_idx ON orders (created_at DESC, id DESC)]]

فهرس مركب بنفس أعمدة الـ ORDER BY وبنفس الاتجاهات بالظبط. دلوقتي الصفوف بتخرج من الفهرس مترتبة جاهزة:

~~~text EXPLAIN ANALYZE (OFFSET 100000 بعد الـ index)
 Limit  (actual time=35.553..35.561 rows=20.00 loops=1)
   ->  Index Scan using orders_created_id_idx on orders  (actual time=0.011..32.770 rows=100020.00 loops=1)
 Execution Time: 35.572 ms
~~~

الـ Sort اختفى، بس لسه [[rows=100020.00]]: الـ OFFSET لازم يعدّي على الـ ١٠٠ ألف صف واحد واحد ويرميهم. الفهرس مبيعرفش «الصف رقم ١٠٠ ألف» فين من غير ما يعدّ. فكل ما الصفحة تبعد، الوقت يزيد.

---

## ٣. أول صفحة

~~~sql
SELECT id, total, created_at FROM orders
ORDER BY created_at DESC, id DESC
LIMIT 20;
~~~

~~~text الناتج (أول ٣ وآخر صف)
   id   | total  |          created_at
--------+--------+-------------------------------
      2 |   0.00 | 2026-10-07 08:35:01.394661+00
   6680 |  15.04 | 2026-10-07 08:34:33.908094+00
 148010 | 505.21 | 2026-10-07 08:20:13.601142+00
...
 112080 | 816.02 | 2026-10-07 07:02:53.352246+00
(20 rows)

Time: 0.279 ms
~~~

الـ API بيرجّع الصفوف دي، ومعاها **آخر صف**: [[created_at = '2026-10-07 07:02:53.352246+00']] و [[id = 112080]]. ده الـ cursor اللي العميل هيبعته عشان الصفحة الجاية.

---

## ٤. الصفحة اللي بعدها: [[WHERE (created_at, id) < (...)]]

### الـ row comparison

[[(a, b) < (x, y)]] بتقارن زي ترتيب القاموس: قارن أول عنصر، ولو متساويين قارن التاني:

~~~sql
SELECT (5, 9) < (6, 1) AS a, (6, 1) < (6, 3) AS b, (6, 3) < (6, 3) AS c;
~~~

~~~text الناتج
 a | b | c
---+---+---
 t | t | f
~~~

- [[a]]: 5 أقل من 6، فخلاص true من غير ما يبص على التاني.
- [[b]]: الأول متساوي (6 و 6)، فقارن التاني: 1 أقل من 3، true.
- [[c]]: متساويين خالص، فمش «أقل»، false.

يعني [[(created_at, id) < (T, N)]] = «أقدم من T، أو في نفس اللحظة T بالظبط و id أصغر من N». وده بالظبط معنى «اللي بعده» في ترتيب [[created_at DESC, id DESC]].

### نحط الـ cursor بتاع الصفحة الأولى

~~~sql
SELECT id, total, created_at FROM orders
WHERE (created_at, id) < ('2026-10-07 07:02:53.352246+00', 112080)
ORDER BY created_at DESC, id DESC
LIMIT 3;
~~~

~~~text الناتج
   id   | total  |          created_at
--------+--------+-------------------------------
 123469 | 759.71 | 2026-10-07 06:53:11.230796+00
 198690 | 302.50 | 2026-10-07 06:52:42.431377+00
  71028 | 769.27 | 2026-10-07 06:52:08.843587+00
~~~

نفس الصفوف اللي [[OFFSET 20]] كان هيجيبها (جربناها وطلعت نفس الـ ٣). الفرق في الطريقة:

~~~text EXPLAIN ANALYZE (keyset بالقيم اللي في المثال)
 Limit  (actual time=0.008..0.016 rows=20.00 loops=1)
   Buffers: shared hit=23
   ->  Index Scan using orders_created_id_idx on orders  (actual time=0.008..0.014 rows=20.00 loops=1)
         Index Cond: (ROW(created_at, id) < ROW('2026-03-01 10:00:00+00'::timestamp with time zone, 1234))
 Execution Time: 0.023 ms
~~~

[[Index Cond: (ROW(created_at, id) < ROW(...))]]: الشرط اتدوّر بيه **جوه** الفهرس، فنزل لمكان الـ cursor على طول وقرا ٢٠ صف ووقف ([[rows=20.00]] مش ١٠٠ ألف). وده نفس الوقت تقريبًا مهما كانت الصفحة بعيدة. (القيم اللي في المثال [['2026-03-01 10:00:00+00']] و [[1234]] مجرد cursor تجريبي في نص السنة.)

---

## ٥. تفاصيل لو فاتتك هتلاقي صفوف مكررة أو ضايعة

- انسخ الـ [[created_at]] **كامل** بالميكروثواني والـ [[+00]]. لو قصّيته لـ [['07:02:53']] هيبقى أصغر من القيمة الحقيقية، وصفوف هتتنط.
- الـ [[id]] لازم يبقى في الـ cursor وفي الـ ORDER BY: من غيره، أوردرين بنفس الوقت بالظبط ممكن واحد منهم يقع بين صفحتين ويضيع.
- اتجاهات الـ ORDER BY لازم تبقى نفس الاتجاه للعمودين (الاتنين DESC هنا)، عشان [[<]] الواحدة تبقى صح.

---

## الخلاصة

| | OFFSET | keyset |
|---|---|---|
| الصفحة الجاية | [[OFFSET n]] | [[WHERE (created_at, id) < (آخر صف)]] |
| بيقرا كام صف | n + 20 | 20 |
| الصفحة ٥٠٠١ هنا | ~٣٥ إلى ١٣٠ms | أقل من ١ms |
| صف اتضاف وانت بتقلّب | الصفوف تزحلق: تكرار أو صف فايت | مفيش تأثير |
| «روح لصفحة ٥٧» | أيوه | لأ، «اللي بعده» بس |

- الفهرس بنفس أعمدة واتجاهات الـ ORDER BY.
- الـ cursor = قيم آخر صف شفته، كلها، بالدقة الكاملة.`,
          lines: [
            "الطريقة البطيئة:",
            "بترتيب الأحدث، والـ id لو الوقت متساوي،",
            "عدّي ١٠٠ ألف صف (بيقراهم ويرميهم) وخد ٢٠.",
            "index بنفس ترتيب الـ ORDER BY بالظبط.",
            "أول صفحة:",
            "نفس الترتيب،",
            "أول ٢٠.",
            "الصفحة اللي بعدها:",
            "اللي أقدم من آخر صف شفته (الوقت والـ id بتوعه).",
            "نفس الترتيب،",
            "٢٠ صف، ومن غير ما يعدّي حاجة."
          ],
          sol: R`في تجربة على ٢٠٠ ألف أوردر: OFFSET 0 أخد حوالي ١ms، و OFFSET 100000 أخد حوالي ٩٠ms من غير الـ index الجديد و ٤٤ms بيه. حتى مع الـ index لازم يعدّي على ١٠٠ ألف صف ويرميهم، فالوقت بيكبر مع رقم الصفحة. الـ keyset من نفس المكان أخد أقل من ١ms، و EXPLAIN بيقول [[Index Only Scan using orders_created_id_idx]] ومعاه [[Index Cond: (ROW(created_at, id) < ROW(...))]]: بيروح للمكان على طول ويقرا ٢٠ صف بس.

لما تنسخ الـ created_at من الناتج خده بالميكروثواني والتوقيت زي ما هو ([['2026-03-30 18:06:41.224496+00']])؛ لو قصّيته للثانية الصفحة الجاية هتكرر أو تنط صفوف. ونفس الكلام لو نسيت الـ id وقارنت بـ created_at لوحده: صفين بنفس الوقت ممكن واحد فيهم يضيع بين صفحتين. والعيب الوحيد: مفيش «روح لصفحة 57» مباشرة، فيه «اللي بعده» بس.`,
          solCode: R`\timing on
SELECT id FROM orders ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 0;
SELECT id FROM orders ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 100000;
-- خد created_at و id من آخر صف في الصفحة، وحطهم هنا:
SELECT id, total, created_at FROM orders
WHERE (created_at, id) < ('2026-03-30 18:06:41.224496+00', 32378)
ORDER BY created_at DESC, id DESC
LIMIT 20;`,
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
INSERT INTO orders VALUES
  (10, 2, 'paid', 40.00, '2026-09-10 10:00+00'),
  (11, 3, 'paid', 55.00, '2026-09-10 10:00+00');`,
            starter: R`SELECT id FROM orders
WHERE created_at < '2026-09-10 10:00+00'
ORDER BY created_at DESC, id DESC
LIMIT 3;`,
            expect: [[10], [7], [6]],
            solution: R`SELECT id FROM orders
WHERE (created_at, id) < ('2026-09-10 10:00+00', 11)
ORDER BY created_at DESC, id DESC
LIMIT 3;`,
            ordered: true
          }
        }
      ]
    }
]);
