// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "indexes و transactions",
      l: 2,
      n: "الـ index بيسرّع القراية، والـ transaction بتحمي الداتا لما حاجتين يحصلوا في نفس اللحظة",
      items: [
        {
          cmd: "B-tree index",
          title: "ليه نفس الاستعلام بياخد ثانية أو ملّي ثانية",
          desc: R`الـ index هيكل جنب الجدول بيحفظ قيم عمود مترتبة ومعاها مكان كل صف، زي فهرس آخر الكتاب. من غيره، [[WHERE created_at > ...]] بيقرا الجدول كله صف صف. معاه، بيوصل للصفوف في كام خطوة.

النوع الافتراضي B-tree، وبيخدم [[=]] و [[<]] و [[>]] و [[BETWEEN]] و [[ORDER BY]]، وبادئة LIKE بس لو الـ collation هي C أو الـ index معمول بـ [[text_pattern_ops]] (درس LIKE و ILIKE). وقراية الخطة بـ EXPLAIN وإنشاء الـ index على الإنتاج في تاب PostgreSQL.`,
          example: R`INSERT INTO orders (user_id, status, total, created_at)
SELECT (SELECT id FROM users LIMIT 1), 'paid', (random() * 1000)::numeric(10,2), now() - random() * interval '365 days'
FROM generate_series(1, 200000);
\timing on
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';
CREATE INDEX orders_created_at_idx ON orders (created_at);
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';`,
          try: R`بعد الـ index جرّب [[WHERE date(created_at) = current_date]]: هترجع بطيئة تاني، لأن الدالة على العمود بتمنع استخدام الـ index. واكتبها كمدى: [[created_at >= current_date AND created_at < current_date + 1]].`,
          flag: "script",
          deep: {
            why: "الجدول بيبدأ صغير وكل حاجة سريعة، وبعد سنة فيه مليون صف والصفحة بتاخد ٣ ثواني. معظم مشاكل البطء في تطبيقات الويب index ناقص على عمود في WHERE أو JOIN أو ORDER BY.",
            how: R`B-tree شجرة متوازنة: الجذر بيشاور على فروع، والفروع على أوراق، والأوراق فيها القيم مترتبة وجنب كل قيمة عنوان الصف في الجدول. البحث بياخد عدد خطوات قد عمق الشجرة (٣ أو ٤ لملايين الصفوف) بدل ما يعدّي على كل الصفوف.

الـ planner مش دايمًا بيستخدم الـ index: لو الشرط هيرجّع جزء كبير من الجدول (٣٠٪ مثلًا)، قراية الجدول بالترتيب أرخص من القفز بين الـ index والجدول. عشان كده index على عمود boolean زي [[is_active]] نادرًا ما بيفيد.

الـ index ليه تمن: كل INSERT و UPDATE و DELETE لازم يحدّث كل الـ indexes على الجدول، وبياخد مساحة. index زيادة = كتابة أبطأ.

الـ index على [[created_at]] مش بيخدم [[date(created_at)]]: الشرط لازم يطابق اللي اتعمل عليه الـ index. الحل تكتب الشرط كمدى. و index على [[date(created_at)]] نفسه مش هينفع هنا لأن العمود timestamptz: [[functions in index expression must be marked IMMUTABLE]] (اليوم بيفرق حسب الـ timezone). لو لازم، ثبّت المنطقة: [[CREATE INDEX ON orders (((created_at AT TIME ZONE 'UTC')::date))]] واكتب الشرط بنفس التعبير.

PRIMARY KEY و UNIQUE بيعملوا index لوحدهم، والـ FK لأ. وفيه أنواع تانية: GIN (لـ jsonb والـ arrays والبحث)، و BRIN (لجداول ضخمة بتتملي بالترتيب زي اللوجات).`,
            when: "أعمدة الـ FK، والأعمدة اللي في WHERE أو ORDER BY في استعلامات متكررة على جداول بتكبر. وبعد ما EXPLAIN يوريك Seq Scan على جدول كبير.",
            mistakes: R`في مشروع حقيقي كان فيه index على كل عمود تقريبًا في جدول اليوزرز، منهم أعمدة boolean زي «اتكلمناه على واتساب»؛ أغلبها عمره ما هيتستخدم، وكل واحد بيبطّأ كل كتابة. ودالة على العمود في WHERE. وإنشاء index على جدول كبير في الإنتاج من غير [[CONCURRENTLY]] فيقفل الكتابة.`
          },
          teach: R`## الفكرة: نفس السؤال، مرة من غير فهرس ومرة بفهرس

المثال تجربة بسيطة: نملا [[orders]] بـ ٢٠٠ ألف أوردر، ونسأل «كام أوردر في آخر ٢٤ ساعة؟»، ونقيس الوقت. بعدين نعمل index على [[created_at]] ونسأل نفس السؤال تاني. الفرق في الوقت هو الدرس كله.

كل الناتج تحت حقيقي: اتشغّل في psql على [[postgres:18]] جوه Docker، على جداول المتجر بعد أمثلة الدروس اللي فاتت (يوزر واحد [[you@example.com]] وأوردر واحد قبل التجربة).

---

## ١. نملا الجدول: [[INSERT ... SELECT ... FROM generate_series]]

~~~sql
INSERT INTO orders (user_id, status, total, created_at)
SELECT (SELECT id FROM users LIMIT 1), 'paid', (random() * 1000)::numeric(10,2), now() - random() * interval '365 days'
FROM generate_series(1, 200000);
~~~

ده [[INSERT]] بس بدل [[VALUES]] فيه [[SELECT]]: كل صف بيطلع من الـ SELECT بيتحط في الجدول. نفكّه من جوه لبرة.

### الخطوة ١: [[generate_series(1, 200000)]]

دالة بترجّع جدول فيه أرقام من الأول للآخر، صف لكل رقم. على ٣ بس:

~~~sql
SELECT * FROM generate_series(1, 3);
~~~

~~~text الناتج
 generate_series
-----------------
               1
               2
               3
(3 rows)
~~~

احنا مش هنستخدم الرقم نفسه. هو موجود عشان الـ SELECT يتكرر ٢٠٠ ألف مرة، مرة لكل صف.

### الخطوة ٢: الأعمدة الأربعة

| الحتة | بتطلّع إيه |
|---|---|
| [[(SELECT id FROM users LIMIT 1)]] | subquery بين قوسين بترجّع قيمة واحدة: id أول يوزر. كل الأوردرات لنفس اليوزر |
| [['paid']] | نص ثابت، الحالة |
| [[(random() * 1000)::numeric(10,2)]] | [[random()]] رقم عشوائي من 0 لـ 1، ضربناه في 1000، و [[::]] معناها «حوّل للنوع ده»، فبقى فلوس بخانتين بعد العلامة |
| [[now() - random() * interval '365 days']] | [[interval]] مدة زمنية. نسبة عشوائية من سنة، ونطرحها من دلوقتي، فيطلع وقت عشوائي في آخر سنة |

نفس الـ SELECT على ٣ صفوف بس، عشان تشوف شكل الصفوف قبل ما تدخل:

~~~text الناتج
                  id                  | ?column? | total  |          created_at
--------------------------------------+----------+--------+-------------------------------
 c117c0f7-6ddb-462b-a573-6eadaac9241d | paid     | 235.51 | 2026-09-06 09:24:49.707519+00
 c117c0f7-6ddb-462b-a573-6eadaac9241d | paid     | 518.66 | 2026-08-24 17:45:51.37398+00
 c117c0f7-6ddb-462b-a573-6eadaac9241d | paid     | 250.96 | 2026-09-18 13:25:32.086125+00
~~~

و [[?column?]] اسم psql لعمود ملوش اسم. مش فارق هنا، لأن الـ INSERT بيحط القيم بالترتيب في الأعمدة اللي كتبناها في [[(user_id, status, total, created_at)]].

~~~text الناتج
INSERT 0 200000
~~~

[[INSERT 0 200000]]: الرقم الأخير عدد الصفوف اللي اتضافت. (الـ 0 في النص بقايا تاريخية، دايمًا 0.)

---

## ٢. [[\timing on]]

ده مش SQL، ده أمر لـ psql نفسه (أي أمر بيبدأ بـ [[\]] بيتنفّذ في psql مش في السيرفر). بيخلّي psql يطبع تحت كل أمر سطر [[Time:]] بالمللي ثانية (ms = جزء من ألف من الثانية).

~~~text الناتج
Timing is on.
~~~

---

## ٣. السؤال من غير index

~~~sql
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';
~~~

[[count(*)]] بيعدّ الصفوف، و [[now() - interval '1 day']] = نفس اللحظة دي امبارح.

~~~text الناتج
 count
-------
   476
(1 row)

Time: 25.551 ms
~~~

٤٧٦ من ٢٠٠ ألف (حوالي ٢٠٠٠٠٠ ÷ ٣٦٥ ≈ ٥٥٠، قريب لأن التواريخ عشوائية). عشان نعرف **إزاي** اتحسب، نحط [[EXPLAIN ANALYZE]] قدامه (درس EXPLAIN ANALYZE في تاب PostgreSQL): بينفّذ ويوريك الخطة.

~~~text EXPLAIN ANALYZE من غير index
 Aggregate  (cost=1938.57..1938.58 rows=1 width=8) (actual time=24.980..24.982 rows=1.00 loops=1)
   Buffers: shared hit=1870
   ->  Seq Scan on orders  (cost=0.00..1935.45 rows=1247 width=0) (actual time=0.008..24.945 rows=476.00 loops=1)
         Filter: (created_at > (now() - '1 day'::interval))
         Rows Removed by Filter: 199525
         Buffers: shared hit=1870
 Planning Time: 0.055 ms
 Execution Time: 24.998 ms
~~~

تتقري من تحت لفوق (الأكتر مسافة بيتنفّذ الأول):

| السطر | معناه |
|---|---|
| [[Seq Scan on orders]] | Sequential Scan: قرا الجدول كله صف صف |
| [[Filter: ...]] | الشرط اتطبّق على كل صف بعد ما اتقرا |
| [[Rows Removed by Filter: 199525]] | قرا ٢٠٠ ألف ورمى ١٩٩٥٢٥ عشان يرجّع ٤٧٦. ده شكل الـ index الناقص |
| [[Buffers: shared hit=1870]] | قرا ١٨٧٠ صفحة (كل صفحة 8 kB، يعني الجدول كله تقريبًا) |
| [[Aggregate]] | الـ [[count]] نفسه، فوق الـ scan |

---

## ٤. [[CREATE INDEX orders_created_at_idx ON orders (created_at)]]

| الحتة | معناها |
|---|---|
| [[CREATE INDEX]] | اعمل فهرس |
| [[orders_created_at_idx]] | اسمه. العرف: جدول_عمود_idx، عشان لما تشوفه في EXPLAIN تعرفه |
| [[ON orders (created_at)]] | على جدول orders، بقيم عمود created_at |

مكتبناش نوع، فهو B-tree (الافتراضي). Postgres بيقرا الـ ٢٠٠ ألف قيمة مرة واحدة، يرتّبهم، ويبني الشجرة:

~~~text الناتج
CREATE INDEX
Time: 67.258 ms
~~~

والفهرس ده ليه حجم على الديسك:

~~~sql
SELECT pg_size_pretty(pg_relation_size('orders')) tbl, pg_size_pretty(pg_relation_size('orders_created_at_idx')) idx;
~~~

~~~text الناتج
  tbl  |   idx
-------+---------
 15 MB | 4408 kB
~~~

حوالي ٣٠٪ من حجم الجدول عشان عمود واحد. وده التمن اللي في deep: مساحة، وكل INSERT لازم يحدّثه.

---

## ٥. نفس السؤال بعد الـ index

~~~text الناتج
 count
-------
   476
(1 row)

Time: 0.321 ms
~~~

نفس الـ ٤٧٦، والوقت من ٢٥ms لـ ٠.٣ms، يعني حوالي ٨٠ مرة أسرع. (أول مرة بعد الـ index أخدت 0.9ms، والتانية 0.3ms لأن الصفحات بقت في الكاش.) والخطة:

~~~text EXPLAIN ANALYZE بعد الـ index
 Aggregate  (cost=4456.43..4456.44 rows=1 width=8) (actual time=0.240..0.241 rows=1.00 loops=1)
   Buffers: shared hit=418
   ->  Bitmap Heap Scan on orders  (cost=1253.09..4289.77 rows=66667 width=0) (actual time=0.076..0.217 rows=476.00 loops=1)
         Recheck Cond: (created_at > (now() - '1 day'::interval))
         Heap Blocks: exact=414
         Buffers: shared hit=418
         ->  Bitmap Index Scan on orders_created_at_idx  (cost=0.00..1236.43 rows=66667 width=0) (actual time=0.037..0.038 rows=476.00 loops=1)
               Index Cond: (created_at > (now() - '1 day'::interval))
               Index Searches: 1
               Buffers: shared hit=4
 Planning Time: 0.035 ms
 Execution Time: 0.258 ms
~~~

1. [[Bitmap Index Scan on orders_created_at_idx]]: نزل في الشجرة لأول قيمة أكبر من «امبارح»، ولمّ أماكن الـ ٤٧٦ صف. [[Buffers: shared hit=4]]: ٤ صفحات بس من الـ index (عمق الشجرة تقريبًا).
2. [[Bitmap Heap Scan on orders]]: راح للجدول (اسمه heap) جاب الصفوف دي بس: [[Heap Blocks: exact=414]] صفحة بدل ١٨٧٠.
3. [[Index Cond]] بدل [[Filter]]: الشرط اتدوّر بيه **جوه** الفهرس، مش بعد القراية.

و [[rows=66667]] المتوقعة بعيدة عن ٤٧٦ الحقيقية لأن Postgres لسه معملش إحصائيات للجدول بعد الـ INSERT الكبير (بيعملها لوحده بعد شوية بـ autovacuum، أو بإيدك بـ [[ANALYZE orders;]]). و [[rows=476.00]] بكسور و [[Index Searches]] حاجات جديدة في Postgres 18؛ في 17 هتشوف [[rows=476]] بس.

---

## ٦. تجربة الـ try: الدالة على العمود

~~~sql
EXPLAIN ANALYZE SELECT count(*) FROM orders WHERE date(created_at) = current_date;
~~~

~~~text الناتج (مختصر)
 Finalize Aggregate  (actual time=12.534..17.375 rows=1.00 loops=1)
   ->  Gather  (actual time=12.444..17.371 rows=2.00 loops=1)
         Workers Launched: 1
         ->  Partial Aggregate  (actual time=10.502..10.503 rows=1.00 loops=2)
               ->  Parallel Seq Scan on orders  (actual time=0.072..10.493 rows=85.50 loops=2)
                     Filter: (date(created_at) = CURRENT_DATE)
                     Rows Removed by Filter: 99915
 Execution Time: 17.390 ms
~~~

رجع [[Seq Scan]] رغم إن الـ index موجود. الفهرس مترتب بقيم [[created_at]]، مش بنتيجة [[date(created_at)]]، فـ Postgres لازم يحسب الدالة لكل صف. و [[Parallel]] و [[Workers Launched: 1]] معناها إنه قسم القراية على عمليتين ([[loops=2]]، كل واحدة قرت نص الجدول)، و [[rows=85.50]] متوسط اللي طلع من كل واحدة.

والحل: نفس المعنى كمدى على العمود نفسه:

~~~sql
EXPLAIN ANALYZE SELECT count(*) FROM orders WHERE created_at >= current_date AND created_at < current_date + 1;
~~~

~~~text الناتج (مختصر)
   ->  Bitmap Heap Scan on orders  (actual time=0.042..0.159 rows=171.00 loops=1)
         ->  Bitmap Index Scan on orders_created_at_idx  (actual time=0.024..0.024 rows=171.00 loops=1)
               Index Cond: ((created_at >= CURRENT_DATE) AND (created_at < (CURRENT_DATE + 1)))
 Execution Time: 0.186 ms
~~~

[[current_date]] النهارده الساعة ١٢ بالليل، و [[current_date + 1]] بكرة الساعة ١٢. و [[<]] مش [[<=]] عشان أوردر بكرة الساعة ١٢ بالظبط ميتحسبش. الاستعلامين رجّعوا نفس العدد ([[171]])، والفرق ١٧ms مقابل ٠.٢ms.

ولو حاولت تعمل index على الدالة نفسها:

~~~sql
CREATE INDEX ON orders (date(created_at));
~~~

~~~text الناتج
ERROR:  functions in index expression must be marked IMMUTABLE
~~~

[[IMMUTABLE]] يعني «نفس المدخل يطلّع نفس الناتج دايمًا». و [[date()]] على [[timestamptz]] مش كده، لأن اليوم بيفرق حسب الـ timezone بتاع الـ session (الساعة ١ بالليل في القاهرة لسه امبارح في UTC). عشان كده الحل اللي في deep بيثبّت المنطقة.

---

## الخلاصة

| الخطوة | الوقت | الخطة |
|---|---|---|
| من غير index | ~٢٥ms | [[Seq Scan]] + [[Rows Removed by Filter: 199525]] |
| بعد [[CREATE INDEX]] | ~٠.٣ms | [[Bitmap Index Scan]] + [[Index Cond]] |
| دالة على العمود | ~١٧ms | [[Seq Scan]] تاني، الـ index اتجاهل |
| نفس الشرط كمدى | ~٠.٢ms | [[Index Cond]] |

- الـ index بيخدم الشرط لو مكتوب على **العمود نفسه** زي ما اتعمل عليه الفهرس.
- [[Seq Scan]] على جدول كبير مع [[Rows Removed by Filter]] ضخم = غالبًا index ناقص.
- الأرقام عندك هتختلف حسب الجهاز، بس الفرق بالأضعاف هيفضل.`,
          lines: [
            "ضيف ٢٠٠ ألف أوردر تجربة:",
            "لأول يوزر، مدفوعة، بمبلغ عشوائي، وتاريخ عشوائي في آخر سنة،",
            "مرة لكل رقم من 1 لـ 200000.",
            "psql يطبع وقت كل أمر.",
            "من غير index: بيقرا الـ ٢٠٠ ألف صف.",
            "اعمل index على التاريخ.",
            "نفس الاستعلام: بيروح للصفوف على طول. قارن الوقت."
          ],
          sol: R`في تجربة على ٢٠٠ ألف صف: قبل الـ index العدّ أخد حوالي ٢٠ms، وبعده حوالي ١.٥ms. [[date(created_at) = current_date]] رجع ~١٩ms تاني، و EXPLAIN بيقول [[Parallel Seq Scan on orders]] ومعاه [[Rows Removed by Filter]] بعشرات الآلاف. المدى [[created_at >= current_date AND created_at < current_date + 1]] رجع أقل من ١ms بـ [[Bitmap Index Scan on orders_created_at_idx]]. الأرقام عندك هتختلف، بس الفرق بالأضعاف هيفضل.

السبب إن الـ index مترتب بقيم [[created_at]] نفسها، مش بـ [[date(created_at)]]، فالدالة بتجبر Postgres يحسبها لكل صف. الحل يا تكتب الشرط كمدى على العمود زي ما عملت، يا تعمل expression index على نفس الدالة بالظبط. والعددين لازم يطلعوا متساويين؛ لو مختلفين يبقى المدى بتاعك فيه [[<=]] بدل [[<]] أو ناقص يوم.`,
          solCode: R`\timing on
EXPLAIN ANALYZE SELECT count(*) FROM orders WHERE date(created_at) = current_date;
-- Parallel Seq Scan on orders
EXPLAIN ANALYZE SELECT count(*) FROM orders
WHERE created_at >= current_date AND created_at < current_date + 1;
-- Bitmap Index Scan on orders_created_at_idx`
        },
        {
          cmd: "composite index",
          title: "index على عمودين: والترتيب بيفرق",
          desc: R`الـ index المركب [[(user_id, created_at)]] مترتب بالعمود الأول، وجوه كل قيمة منه مترتب بالتاني، زي دليل التليفون: بالعيلة وبعدين بالاسم. فبيخدم [[WHERE user_id = ?]] لوحده، و [[WHERE user_id = ? ORDER BY created_at DESC]] من غير ترتيب زيادة. بس مش بيخدم [[WHERE created_at > ?]] لوحده كويس.

القاعدة: الأعمدة اللي بتساوي فيها ([[=]]) الأول، وبعدها اللي بترتب بيه أو بتعمل عليه مدى.`,
          example: R`CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC);
SELECT id, total FROM orders WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
SELECT count(*) FROM orders WHERE user_id = (SELECT id FROM users LIMIT 1);
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';
DROP INDEX orders_user_id_idx;`,
          try: R`حط [[EXPLAIN]] قدام التلات استعلامات وشوف مين بيقول [[Index Scan using orders_user_created_idx]]. وبعدين اعمل index بالترتيب العكسي [[(created_at, user_id)]] وقارن الخطة للاستعلام الأول.`,
          flag: "script",
          deep: {
            why: "أغلب الاستعلامات في تطبيق حقيقي فيها أكتر من عمود: «أوردرات اليوزر ده، الأحدث الأول». index على كل عمود لوحده مش بيحلها كويس، و index مركب واحد بالترتيب الصح بيحلها في خطوة.",
            how: R`القاعدة اسمها leftmost prefix: index على [[(a, b)]] بيخدم الشرط على [[a]]، وعلى [[a و b]]، وعلى [[a]] مع ترتيب بـ [[b]]. أما [[b]] لوحده فالقيم بتاعته متفرقة جوه كل قيمة من a.

(من Postgres 18 فيه skip scan: ممكن يستخدم [[(a, b)]] لشرط على b لوحده، بإنه يلف على كل قيمة من a. ده كويس بس لما قيم a قليلة؛ متعتمدش عليه في التصميم).

المساواة الأول والمدى في الآخر: [[(status, created_at)]] لـ [[WHERE status = 'paid' AND created_at > X]] بيروح لأول paid في المدى ويمشي. العكس [[(created_at, status)]] لازم يعدّي على كل الصفوف في المدى من كل الحالات ويفلتر.

[[DESC]] في الـ index مهم بس لو بترتب بعمودين باتجاهين مختلفين؛ B-tree بيتقري من الناحيتين عادي.

و [[INCLUDE (total)]] بيحط أعمدة زيادة في أوراق الـ index، فالاستعلام ياخد كل اللي محتاجه من الـ index من غير ما يروح للجدول (Index Only Scan).

والـ index على [[(user_id)]] لوحده بقى زيادة، لأن المركب بيغطيه، فمسحناه.`,
            when: "لما استعلام متكرر فيه شرط مساواة على عمود + ترتيب أو مدى على عمود تاني. أشهرها: (user_id, created_at) و (status, created_at).",
            mistakes: R`ترتيب الأعمدة بالعكس. index لوحده على عمود موجود أصلًا في أول index مركب: في مشروع حقيقي كان فيه [[@@unique([userId, type])]] وجنبه [[@@index([userId])]]، والتاني ملوش لازمة لأن الـ unique المركب بيغطيه. و index مركب لكل تركيبة ممكنة من الأعمدة.`
          },
          teach: R`## الفكرة: فهرس واحد على عمودين، والترتيب هو اللي بيحدد هيخدم مين

المثال بيعمل index على [[(user_id, created_at DESC)]]، وبعدين يسأل ٣ أسئلة: واحد بيستخدم العمودين، وواحد على الأول بس، وواحد على التاني بس. ونشوف بـ [[EXPLAIN]] مين استفاد.

الناتج تحت من [[postgres:18]] جوه Docker، بعد درس B-tree index: [[orders]] فيه ٢٠٠ ألف أوردر لنفس اليوزر، وعليه [[orders_created_at_idx]] من الدرس اللي فات و [[orders_user_id_idx]] من درس one-to-many.

---

## ١. [[CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC)]]

| الحتة | معناها |
|---|---|
| [[orders_user_created_idx]] | الاسم: الجدول والعمودين |
| [[(user_id, created_at DESC)]] | عمودين بالترتيب ده. الفهرس بيترتب بـ [[user_id]] الأول، وجوه كل يوزر بـ [[created_at]] |
| [[DESC]] | Descending: من الأحدث للأقدم. والافتراضي [[ASC]] (من الأقدم) |

تخيّل الفهرس جدول مترتب كده:

~~~text شكل الفهرس من جوه (تبسيط)
user_id     created_at            مكان الصف
user-A      2026-10-07 08:35      ...
user-A      2026-10-07 08:20      ...
user-A      2026-10-07 07:50      ...
...
user-B      2026-10-06 22:10      ...
user-B      2026-09-30 11:00      ...
~~~

زي دليل التليفون: بالعيلة، وجوه كل عيلة بالاسم. لو عارف العيلة تروح لها على طول، وجواها الأسماء مترتبة. لو عارف الاسم بس، لازم تقلّب في كل العيلات.

---

## ٢. السؤال اللي بيستخدم العمودين

~~~sql
SELECT id, total FROM orders WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
~~~

- [[(SELECT id FROM users LIMIT 1)]]: subquery بترجّع id أول يوزر، عشان مش هنكتب الـ uuid الطويل بإيدينا.
- [[ORDER BY created_at DESC LIMIT 20]]: أحدث ٢٠ أوردر.

~~~text الناتج (أول ٣ صفوف من ٢٠)
   id   | total
--------+--------
      2 |   0.00
   6680 |  15.04
 148010 | 505.21
...
(20 rows)

Time: 1.162 ms
~~~

والخطة بـ [[EXPLAIN ANALYZE]]:

~~~text الناتج
 Limit  (cost=1.43..2.61 rows=20 width=22) (actual time=0.022..0.040 rows=20.00 loops=1)
   Buffers: shared hit=24
   InitPlan 1
     ->  Limit  (cost=0.00..1.01 rows=1 width=16) (actual time=0.005..0.006 rows=1.00 loops=1)
           ->  Seq Scan on users  (cost=0.00..1.01 rows=1 width=16) (actual time=0.005..0.005 rows=1.00 loops=1)
   ->  Index Scan using orders_user_created_idx on orders  (cost=0.42..11806.50 rows=200001 width=22) (actual time=0.022..0.037 rows=20.00 loops=1)
         Index Cond: (user_id = (InitPlan 1).col1)
 Execution Time: 0.055 ms
~~~

| السطر | معناه |
|---|---|
| [[InitPlan 1]] | الـ subquery اتنفّذت مرة واحدة الأول، ونتيجتها اسمها [[(InitPlan 1).col1]] |
| [[Index Scan using orders_user_created_idx]] | راح للفهرس المركب، لأول entry لليوزر ده |
| [[Index Cond: (user_id = ...)]] | الشرط اتدوّر بيه جوه الفهرس |
| مفيش سطر [[Sort]] | الصفوف خارجة من الفهرس مترتبة بالأحدث أصلًا، فمحتاجش يرتّب |
| [[Limit ... rows=20.00]] | قرا ٢٠ entry ووقف، رغم إن اليوزر ليه ٢٠٠ ألف |

---

## ٣. شرط على العمود الأول بس

~~~sql
SELECT count(*) FROM orders WHERE user_id = (SELECT id FROM users LIMIT 1);
~~~

~~~text الناتج
 count
--------
 200001
~~~

الفهرس المركب **ينفع** هنا (الـ user_id أول عمود فيه)، بس Postgres في الوقت ده كان عنده كمان [[orders_user_id_idx]] الصغير على [[user_id]] لوحده، فاستخدمه:

~~~text الناتج (مختصر)
   ->  Index Only Scan using orders_user_id_idx on orders  (actual time=0.030..11.227 rows=200001.00 loops=1)
         Index Cond: (user_id = (InitPlan 1).col1)
         Heap Fetches: 105
 Execution Time: 20.514 ms
~~~

[[Index Only Scan]] معناها إنه عدّ من الفهرس من غير ما يفتح الجدول (الـ [[count]] مش محتاج أي عمود تاني). و [[Heap Fetches: 105]] صفوف اضطر يتأكد منها في الجدول لأنها لسه جديدة.

---

## ٤. شرط على العمود التاني بس

~~~sql
SELECT count(*) FROM orders WHERE created_at > now() - interval '1 day';
~~~

~~~text الناتج (مختصر)
   ->  Index Only Scan using orders_created_at_idx on orders  (actual time=0.014..0.042 rows=475.00 loops=1)
         Index Cond: (created_at > (now() - '1 day'::interval))
 Execution Time: 0.076 ms
~~~

استخدم [[orders_created_at_idx]] (فهرس التاريخ من الدرس اللي فات)، **مش** المركب. في المركب، التواريخ متفرقة جوه كل يوزر، فمفيش مكان واحد يبدأ منه.

---

## ٥. [[DROP INDEX orders_user_id_idx]]

[[DROP INDEX]] بيمسح الفهرس (الداتا نفسها مبتتلمسش). مسحناه لأن أي استعلام كان بيستخدمه يقدر يستخدم المركب، لأن [[user_id]] أول عمود فيه. ده اسمه **leftmost prefix**: فهرس على [[(a, b)]] بيغني عن فهرس على [[(a)]] لوحده.

~~~text الناتج
DROP INDEX
~~~

وبعد المسح، سؤال الخطوة ٣ على اليوزر ده طلع [[Parallel Seq Scan]] مش الفهرس المركب. ده مش غلط: اليوزر ده عنده كل الـ ٢٠٠ ألف صف، فقراية الجدول على طول أرخص من المرور على الفهرس. مع يوزر تاني ليه أوردر واحد (جربناها جوه [[BEGIN]] و [[ROLLBACK]]):

~~~text الناتج
 Aggregate  (cost=6.19..6.20 rows=1 width=8)
   ->  Index Only Scan using orders_user_created_idx on orders  (cost=0.42..6.19 rows=1 width=0)
         Index Cond: (user_id = '13f8d8bb-4fcf-4825-b81d-01c376468ccc'::uuid)
~~~

يعني الـ planner بيختار حسب **كام صف متوقع يرجع**، مش بس حسب وجود فهرس.

---

## ٦. الترتيب العكسي: [[(created_at, user_id)]]

الـ solCode بيجرّب الفهرس بالعكس جوه [[BEGIN]] و [[ROLLBACK]] (عشان يتلغي في الآخر):

~~~text الناتج
 Limit  (cost=1.43..2.75 rows=20 width=22)
   InitPlan 1
     ->  Limit  (cost=0.00..1.01 rows=1 width=16)
           ->  Seq Scan on users  (cost=0.00..1.01 rows=1 width=16)
   ->  Index Scan Backward using orders_created_at_idx on orders  (cost=0.42..13183.93 rows=200001 width=22)
         Filter: (user_id = (InitPlan 1).col1)
~~~

[[Index Scan Backward]]: بيقرا فهرس التاريخ من الآخر (الأحدث)، و [[Filter]] (مش [[Index Cond]]) على [[user_id]]: يعني بيقرا أوردرات كل الناس بالأحدث ويرمي اللي مش بتاعة اليوزر. هنا كل الأوردرات بتاعته فخلص بسرعة، لكن ليوزر عنده أوردرات قليلة ممكن يلف على الجدول كله.

---

## الخلاصة

| الاستعلام | فهرس [[(user_id, created_at DESC)]] بيخدمه؟ |
|---|---|
| [[WHERE user_id = ? ORDER BY created_at DESC]] | أيوه، كامل ومن غير Sort |
| [[WHERE user_id = ?]] | أيوه (أول عمود) |
| [[WHERE created_at > ?]] لوحده | لأ، محتاج فهرس على created_at |

- المساواة ([[=]]) الأول، والترتيب أو المدى بعدها.
- فهرس على [[(a)]] لوحده زيادة لو فيه فهرس بيبدأ بـ [[a]].
- الـ planner ممكن يختار [[Seq Scan]] حتى والفهرس موجود، لو الشرط هيرجّع جزء كبير من الجدول.`,
          lines: [
            "index مركب: باليوزر، وجوه كل يوزر بالأحدث.",
            "أوردرات يوزر، الأحدث الأول: بيستخدم الـ index كله، ومن غير ترتيب.",
            "شرط على أول عمود بس: بيستخدمه برضه.",
            "شرط على التاني بس: المركب مش مناسب (بيستخدم index التاريخ اللي عملناه قبل كده).",
            "index الـ user_id لوحده بقى زيادة: المركب بيغطيه."
          ],
          sol: R`الاستعلام الأول هيقول [[Index Scan using orders_user_created_idx]] ومفيش [[Sort]] في الخطة، لأن الـ index جايب الصفوف مترتبة. التالت هيستخدم [[orders_created_at_idx]] (index التاريخ من الدرس اللي فات) مش المركب. أما التاني فغالبًا هيطلع [[Seq Scan]]، وده مش غلط: في الـ lab كل الـ ٢٠٠ ألف أوردر بتوع نفس اليوزر، والـ planner عارف إن الشرط هيجيب الجدول كله، فقراية الجدول على طول أرخص. لو عملت يوزر تاني ليه أوردر واحد وحطيت الـ uuid بتاعه نص صريح في الشرط، هتلاقي [[Index Only Scan using orders_user_created_idx]].

بالترتيب العكسي [[(created_at, user_id)]] (امسح المركب الأول عشان تقارن): الاستعلام الأول بقى [[Index Scan Backward using orders_created_at_idx]] ومعاه سطر [[Filter]] على user_id، يعني بيمشي على الأوردرات بالأحدث ويرمي اللي مش بتوع اليوزر. مع يوزر ليه أوردرات قليلة ده ممكن يلف على الجدول كله. المساواة الأول، والترتيب أو المدى بعدها.`,
          solCode: R`EXPLAIN SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
-- Index Scan using orders_user_created_idx
BEGIN;
DROP INDEX orders_user_created_idx;
CREATE INDEX orders_created_user_idx ON orders (created_at, user_id);
EXPLAIN SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users LIMIT 1) ORDER BY created_at DESC LIMIT 20;
-- Index Scan Backward using orders_created_at_idx + Filter
ROLLBACK;`
        },
        {
          cmd: "transaction",
          title: "كذا أمر يا كلهم يتنفذوا يا ولا حاجة",
          desc: R`الـ transaction بتجمع كذا أمر في وحدة واحدة: يا كلهم ينجحوا ويتحفظوا مع بعض ([[COMMIT]])، يا أي واحد يفشل فكله يترجع ([[ROLLBACK]]). عمل أوردر = صف في orders + بنود في order_items + خصم من stock. لو السيرفر وقع بعد الخصم وقبل البنود، من غير transaction هتلاقي مخزون ناقص وأوردر فاضي.

ده معنى ACID: Atomic (كله أو ولا حاجة)، و Consistent (الـ constraints محترمة)، و Isolated (اللي بيحصل جوه مش باين لحد لحد الـ COMMIT)، و Durable (بعد COMMIT مش هيضيع حتى لو الكهربا قطعت). وتجربتها بإيدك في psql في تاب PostgreSQL درس «BEGIN و ROLLBACK»؛ هنا من الكود.`,
          example: R`const client = await pool.connect();
try {
  await client.query("BEGIN");
  const { rows } = await client.query("INSERT INTO orders (user_id) VALUES ($1) RETURNING id", [userId]);
  await client.query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) SELECT $1::bigint, id, $3::int, price FROM products WHERE id = $2", [rows[0].id, productId, qty]);
  const r = await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1", [qty, productId]);
  if (r.rowCount === 0) throw new Error("OUT_OF_STOCK");
  await client.query("UPDATE orders SET total = (SELECT sum(quantity * unit_price) FROM order_items WHERE order_id = $1) WHERE id = $1", [rows[0].id]);
  await client.query("COMMIT");
} catch (e) {
  await client.query("ROLLBACK");
  throw e;
} finally {
  client.release();
}`,
          try: R`حط [[throw new Error("test")]] بعد الـ INSERT التاني وشغّل: اتأكد في psql إن مفيش أوردر جديد ولا بند. وبعدين جرّب تعمل [[pool.query("BEGIN")]] بدل client، وشوف ليه مش بتشتغل.`,
          flag: "script",
          deep: {
            why: "أي عملية بتلمس أكتر من صف أو جدول ولازم تفضل متسقة: أوردر وبنوده ومخزونه، تحويل فلوس من محفظة لمحفظة، موافقة على سحب وخصم من رصيد. من غير transaction، أي crash أو error في النص بيسيب الداتا في حالة نص نص محدش هيعرف يصلحها.",
            how: R`الـ transaction عايشة على connection واحد. [[pool.query]] بياخد أي connection فاضي من الـ pool لكل أمر، فممكن BEGIN يروح على connection والـ INSERT على connection تاني، ومتبقاش transaction أصلًا. عشان كده [[pool.connect()]] بياخد connection واحد تمسكه لحد ما تخلص، و [[release()]] في finally بترجّعه مهما حصل.

جوه Postgres (MVCC): كل صف ليه نسخ، وكل نسخة عليها رقم الـ transaction اللي عملتها. الـ transactions التانية مش شايفة نسخك الجديدة لحد الـ COMMIT. والـ COMMIT بيكتب في الـ WAL (سجل على الديسك) قبل ما يرجّعلك، وده الـ Durable.

لو أمر فشل جوه الـ transaction، هي بتبقى aborted: أي أمر بعد كده بيرفض ([[current transaction is aborted]]) لحد ما تعمل ROLLBACK.

وخليها قصيرة: الـ transaction المفتوحة ماسكة locks على الصفوف اللي عدّلتها، وبتمنع VACUUM ينضف. وعمرك ما تنادي API خارجي (بوابة دفع، إيميل) جوه transaction: الشبكة ممكن تاخد ٣٠ ثانية والـ locks ماسكة.

في Prisma نفس الفكرة بـ [[$transaction]] (المستوى التالت)، وهو اللي بيدير الـ connection بدالك.`,
            when: "أي كتابة متعددة الخطوات لازم تبقى وحدة واحدة.",
            mistakes: R`[[pool.query("BEGIN")]]: مش transaction، وممكن تسيب connection «idle in transaction». تنسى [[release()]] فالـ pool يخلص والتطبيق يعلّق. تنادي بوابة الدفع جوه الـ transaction. وتمسك الـ error من غير ROLLBACK.`
          },
          teach: R`## الفكرة: ٤ أوامر SQL، يا يتحفظوا كلهم يا ولا واحد

المثال دالة من Node بتعمل أوردر: صف في [[orders]]، وبند في [[order_items]]، وخصم من [[products.stock]]، وتحديث [[orders.total]]. الكود كله ملفوف في [[BEGIN]] و [[COMMIT]]، وأي error في النص بيروح لـ [[ROLLBACK]] فيتلغي كل اللي اتعمل.

الناتج تحت حقيقي: الكود اتشغّل بمكتبة [[pg]] على [[node:22-slim]] في Docker، متوصل بـ [[postgres:18]]. المنتج Hoodie سعره 650 ومخزونه 8.

---

## ١. [[const client = await pool.connect()]]

[[pool]] هو [[new pg.Pool(...)]]: مجموعة connections مفتوحة للقاعدة (الافتراضي لحد ١٠) بيتشاركها كل الطلبات. و [[pool.connect()]] بياخد **connection واحد** منهم ويديهولك لوحدك لحد ما ترجّعه.

ليه مش [[pool.query]] زي باقي الكود؟ لأن الـ transaction عايشة على connection واحد. [[pool.query]] كل مرة بياخد أي connection فاضي، فممكن [[BEGIN]] يروح على واحد والـ INSERT على تاني. جربناها: ٢٠ طلب في نفس الوقت، كل واحد بيعمل [[pool.query("BEGIN")]] ثم INSERT ثم [[pool.query("ROLLBACK")]]:

~~~text الناتج
{ before: '200002', after: '200004' }
~~~

أوردرين اتحفظوا رغم إن كل طلب عمل ROLLBACK: الـ INSERT بتاعهم راح لـ connection مفيهاش BEGIN فاتحفظ لوحده. (الرقم بيختلف من تشغيل للتاني، وده اللي بيخليها bug صعب تمسكه.)

---

## ٢. [[try]] و [[catch]] و [[finally]]

| الجزء | بيتنفّذ إمتى | فيه إيه هنا |
|---|---|---|
| [[try { ... }]] | الأول | كل أوامر الـ transaction |
| [[catch (e) { ... }]] | لو أي سطر جوه try رمى error | [[ROLLBACK]] وبعدين [[throw e]] |
| [[finally { ... }]] | **دايمًا**، نجح أو فشل | [[client.release()]] |

[[throw e]] في الـ catch بيرمي نفس الـ error تاني للي نادى الدالة، عشان الـ route يعرف إن الأوردر فشل ويرجّع رسالة لليوزر. لو مسكته وسكتّ، الكود اللي برّه هيفتكر إنه نجح.

و [[client.release()]] بيرجّع الـ connection للـ pool. لو نسيته، بعد ١٠ طلبات الـ pool يخلص وكل طلب جديد يستنى للأبد.

---

## ٣. [[await client.query("BEGIN")]]

[[client.query(sql, values)]] بيبعت أمر SQL ويرجّع object فيه [[rows]] (الصفوف) و [[rowCount]] (عدد الصفوف اللي اتأثرت). و [[await]] معناها «استنى الرد قبل السطر اللي بعده».

[[BEGIN]] بيبدأ transaction: من هنا لحد COMMIT أو ROLLBACK، أي تغيير مش باين لأي connection تاني، ومش متحفظ نهائي.

---

## ٤. الأوردر: [[INSERT ... RETURNING id]]

~~~js
const { rows } = await client.query("INSERT INTO orders (user_id) VALUES ($1) RETURNING id", [userId]);
~~~

- [[$1]]: مكان قيمة، والقيمة نفسها في الـ array اللي بعده ([[[userId]]]). الـ driver بيبعتها منفصلة عن النص، فمفيش SQL injection. [[$1]] أول عنصر، و [[$2]] التاني، وهكذا.
- [[RETURNING id]]: رجّعلي الـ id اللي القاعدة ولّدته، عشان محتاجينه في البنود.
- [[const { rows } = ...]]: اسمها destructuring: خد خانة [[rows]] من الـ object اللي رجع.

~~~text rows
[ { id: '200008' } ]
~~~

الـ id رجع **string** مش رقم: [[pg]] بيرجّع [[bigint]] كنص، لأن JavaScript number مبيشيلش أرقام [[bigint]] الكبيرة بدقة. فـ [[rows[0].id]] هو [['200008']].

---

## ٥. البند: [[INSERT ... SELECT]]

~~~js
await client.query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) SELECT $1::bigint, id, $3::int, price FROM products WHERE id = $2", [rows[0].id, productId, qty]);
~~~

بدل [[VALUES]] فيه [[SELECT]] من [[products]]، عشان [[unit_price]] ييجي من عمود [[price]] في القاعدة، مش من الطلب. لو السعر جه من الـ frontend، أي حد يقدر يبعت سعر 1 جنيه.

| الحتة | معناها |
|---|---|
| [[$1::bigint]] | الـ id بتاع الأوردر، و [[::bigint]] بيقول لـ Postgres نوعه (جوه SELECT ممكن ميعرفش نوع الـ parameter لوحده) |
| [[id]] | id المنتج من الصف |
| [[$3::int]] | الكمية |
| [[price]] | السعر من جدول المنتجات |
| [[WHERE id = $2]] | المنتج ده بس |

~~~text الناتج
INSERT order_items rowCount: 1
~~~

---

## ٦. المخزون: الشرط والخصم في أمر واحد

~~~js
const r = await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1", [qty, productId]);
if (r.rowCount === 0) throw new Error("OUT_OF_STOCK");
~~~

[[stock >= $1]] جوه الـ WHERE: لو المخزون مش كفاية، الصف مش هيتطابق ومش هيتعدل، فـ [[rowCount]] يبقى 0. ساعتها [[throw]] بيوديك للـ catch، والـ catch بيعمل ROLLBACK **للأوردر والبند اللي اتعملوا قبل كده**. (ليه ده أحسن من SELECT وبعدين UPDATE: الدرس الجاي.)

و [[===]] مقارنة في JavaScript من غير تحويل أنواع.

---

## ٧. الإجمالي ثم [[COMMIT]]

~~~js
await client.query("UPDATE orders SET total = (SELECT sum(quantity * unit_price) FROM order_items WHERE order_id = $1) WHERE id = $1", [rows[0].id]);
await client.query("COMMIT");
~~~

الـ subquery بتجمع [[quantity * unit_price]] (الكمية × السعر) لكل بنود الأوردر، والنتيجة بتتكتب في [[total]]. نفس [[$1]] اتستخدم مرتين في نفس الأمر، عادي.

و [[COMMIT]] بيثبّت كل اللي فات مرة واحدة: من اللحظة دي باقي الـ connections شايفين الأوردر وبنوده والمخزون الجديد مع بعض.

---

## ٨. التلات سيناريوهات بأرقام حقيقية

ضفنا سطرين بيطبعوا عدد الأوردرات والبنود والمخزون قبل وبعد كل محاولة:

~~~text الناتج
before: { orders: '200001', items: '0', hoodie_stock: 8 }
created: 200008 [ { id: '200008', status: 'pending', total: '1300.00' } ]
after ok: { orders: '200002', items: '1', hoodie_stock: 6 }

error: test
after test: { orders: '200002', items: '1', hoodie_stock: 6 }

UPDATE products rowCount: 0
error: OUT_OF_STOCK
after out of stock: { orders: '200002', items: '1', hoodie_stock: 6 }
~~~

| المحاولة | اللي حصل جوه | النتيجة في القاعدة |
|---|---|---|
| ٢ قطعة، المخزون 8 | الـ ٤ أوامر نجحوا، COMMIT | أوردر + بند، المخزون 6، الإجمالي 2 × 650 = 1300 |
| [[throw new Error("test")]] بعد البند (تجربة الـ try) | الأوردر والبند اتعملوا، وبعدين error | ولا حاجة اتغيرت |
| ٥٠ قطعة | الأوردر والبند اتعملوا، والـ UPDATE رجّع 0 | ولا حاجة اتغيرت |

ولاحظ الـ ids: الأوردر الناجح 200008، والمحاولتين الفاشلتين أخدوا 200009 و 200010 واترموا. الـ sequence مش جزء من الـ transaction، فالأرقام اللي اتصرفت مبترجعش، والأوردر الجاي هيبقى 200011.

---

## الخلاصة

| الخطوة | الكود | ليه |
|---|---|---|
| ١ | [[pool.connect()]] | connection واحد للـ transaction كلها |
| ٢ | [[BEGIN]] | ابدأ |
| ٣ | الأوامر بـ [[client.query]] | كلها على نفس الـ client |
| ٤ | [[throw]] لو حاجة غلط | يوديك للـ catch |
| ٥ | [[COMMIT]] | ثبّت الكل مرة واحدة |
| ٦ | [[ROLLBACK]] في catch ثم [[throw e]] | الغي الكل، وبلّغ اللي نادى |
| ٧ | [[release()]] في finally | رجّع الـ connection مهما حصل |`,
          lines: [
            "خد connection واحد من الـ pool وامسكه.",
            "جرّب:",
            "ابدأ transaction على الـ connection ده.",
            "اعمل الأوردر ورجّع الـ id.",
            "ضيف البند، والسعر من جدول المنتجات مش من الطلب.",
            "اخصم المخزون بشرط إنه يكفي.",
            "مفيش صف اتعدل؟ المخزون مش كفاية: ارمي error.",
            "حدّث إجمالي الأوردر من بنوده في نفس الـ transaction (درس denormalization).",
            "كله تمام: ثبّت.",
            "أي error في أي خطوة:",
            "رجّع كل حاجة كأنها محصلتش.",
            "وارمي الـ error للي نادى.",
            "في كل الأحوال:",
            "رجّع الـ connection للـ pool.",
            "قفلة."
          ],
          sol: R`مع [[throw new Error("test")]] بعد الـ INSERT التاني، الـ catch بيعمل ROLLBACK ويرمي الـ error تاني. [[SELECT count(*) FROM orders]] و [[order_items]] قبل وبعد هيطلعوا نفس الأرقام: الأوردر والبند اتلغوا مع بعض. (الـ id بتاع الأوردر اتحجز واتحرق، فالأوردر الجاي هيبقى رقمه نط.)

[[pool.query("BEGIN")]] مش بتشتغل لأن كل [[pool.query]] ممكن تروح لـ connection مختلفة، والـ transaction ملك connection واحدة. الخطير إنها غالبًا هتبان شغالة وانت بتجرب لوحدك، لأن الـ pool بيرجّعلك نفس الـ connection الفاضية. في تجربة فيها ٢٠ request في نفس الوقت بالكود الغلط، ٦ أوردرات و ٦ بنود اتحفظوا رغم إن كل request عمل ROLLBACK، لأن الـ INSERT راح لـ connection مفيهاش BEGIN فاتحفظ لوحده. عشان كده دايمًا [[pool.connect()]] وكل الأوامر على نفس الـ client، و [[release()]] في finally.`,
          solCode: R`import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function createOrder(userId, productId, qty) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("INSERT INTO orders (user_id) VALUES ($1) RETURNING id", [userId]);
    await client.query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) SELECT $1::bigint, id, $3::int, price FROM products WHERE id = $2", [rows[0].id, productId, qty]);
    throw new Error("test");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

const count = async () => (await pool.query("SELECT (SELECT count(*) FROM orders) AS orders, (SELECT count(*) FROM order_items) AS items")).rows[0];
const userId = (await pool.query("SELECT id FROM users LIMIT 1")).rows[0].id;
const productId = (await pool.query("SELECT id FROM products WHERE name = 'Hoodie'")).rows[0].id;
console.log("before:", await count());
try { await createOrder(userId, productId, 1); } catch (e) { console.log("error:", e.message); }
console.log("after:", await count());   // نفس الأرقام
await pool.end();`
        },
        {
          cmd: "atomic UPDATE",
          title: "طلبين في نفس اللحظة على آخر قطعة",
          desc: R`الكود ده شكله سليم: اقرا المخزون، لو يكفي اخصم. بس لو طلبين وصلوا في نفس اللحظة، الاتنين هيقروا [[stock = 1]]، والاتنين هيعدّوا الشرط، والاتنين هيكتبوا، وتبيع قطعة مش موجودة. ده race condition، والـ transaction لوحدها مش بتحله في الإعداد الافتراضي.

الحل الأبسط: الشرط والخصم في أمر واحد جوه القاعدة: [[UPDATE ... SET stock = stock - $1 WHERE id = $2 AND stock >= $1]]، واتأكد إن عدد الصفوف اللي اتعدلت 1. لو 0 يبقى خلص.`,
          example: R`// غلط: تقرا في الكود وتكتب
const { rows } = await db.query("SELECT stock FROM products WHERE id = $1", [id]);
if (rows[0].stock < qty) throw new Error("OUT_OF_STOCK");
await db.query("UPDATE products SET stock = $1 WHERE id = $2", [rows[0].stock - qty, id]);

// صح: الشرط والخصم في أمر واحد
const r = await db.query(
  "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
  [qty, id]
);
if (r.rowCount === 0) throw new Error("OUT_OF_STOCK");`,
          try: R`افتح نافذتين psql. في الاتنين اكتب [[BEGIN;]]، وبعدين في الأولى [[UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie' AND stock >= 1;]]. نفس الأمر في التانية هيقف مستني. اعمل COMMIT في الأولى وشوف التانية كمّلت ورجّعت كام صف.`,
          flag: "script",
          deep: {
            why: "Race conditions مش بتظهر وانت بتجرّب لوحدك، بتظهر يوم العرض لما ٥٠٠ واحد بيشتروا في نفس الدقيقة. والنتيجة: مخزون بالسالب، أو كوبون «مرة واحدة» اتستخدم عشر مرات، أو رصيد اتصرف مرتين.",
            how: R`اللي بيحصل في الكود الغلط (lost update): الطلب A يقرا 1، والطلب B يقرا 1، و A يكتب 0، و B يكتب 0. اتباع قطعتين والمخزون صفر، ومحدش أخد error.

ليه الأمر الواحد آمن؟ الـ UPDATE بياخد lock على الصف. الطلب التاني بيستنى لحد ما الأول يعمل COMMIT. وبعدها، في READ COMMITTED (الافتراضي)، Postgres بيعيد تقييم الـ WHERE على النسخة الجديدة من الصف: stock بقى 0، فالشرط [[stock >= 1]] بقى false، والأمر بيرجع 0 صفوف. من غير أي lock صريح منك.

في Prisma نفس النمط: [[updateMany({ where: { id, stock: { gte: qty } }, data: { stock: { decrement: qty } } })]] وتشيك إن [[count]] مش صفر. مش [[update]] العادي: من Prisma 5 بيقبل شرط زي [[stock: { gte: qty }]] جنب الـ id، بس لو الشرط متحققش بيرمي [[P2025]] بدل ما يرجّعلك عدد، فـ updateMany مع [[count]] أوضح.

ونفس الحيلة لكل «عدّاد بحد»: كوبون [[uses < max_uses]]، رصيد [[balance >= amount]]، تغيير حالة [[status = 'pending']].`,
            when: "المخزون، والأرصدة، والأكواد اللي بتتستخدم مرة، والعدادات، وأي تغيير حالة.",
            mistakes: R`اقرا في JavaScript واكتب. تفتكر إن حطهم جوه transaction بيحل المشكلة. وفي مشروع حقيقي كان مسار الأوردر العادي مكتوب صح بـ updateMany وشرط [[gte]]، بس مسار تاني (رجوع أوردر ملغي لحالة مدفوع) بيخصم بـ [[update]] و [[decrement]] من غير شرط، فالمخزون ممكن يبقى بالسالب. كل مسار بيخصم لازم يتبع نفس القاعدة، و [[CHECK (stock >= 0)]] شبكة أمان.`
          },
          teach: R`## الفكرة: «اقرا وبعدين اكتب» بيتكسر لما طلبين ييجوا مع بعض

المثال فيه نفس العملية مرتين: خصم كمية من المخزون. المرة الأولى غلط (تقرا الرقم في JavaScript وتحسب وتكتب)، والتانية صح (القاعدة نفسها بتتأكد وتخصم في أمر واحد). هنفك الاتنين، وبعدين نشغّلهم بجد على ٢٠ طلب في نفس الوقت.

الناتج تحت حقيقي: Node بمكتبة [[pg]] على [[node:22-slim]] و psql، متوصلين بـ [[postgres:18]] في Docker. [[db]] في المثال هو [[new pg.Pool(...)]].

---

## ١. الطريقة الغلط، سطر سطر

~~~js
const { rows } = await db.query("SELECT stock FROM products WHERE id = $1", [id]);
~~~

بيقرا المخزون الحالي. [[$1]] مكان القيمة، والقيمة في الـ array ([[[id]]]). و [[const { rows }]] بياخد الصفوف من النتيجة، فـ [[rows[0].stock]] هو الرقم.

~~~js
if (rows[0].stock < qty) throw new Error("OUT_OF_STOCK");
~~~

لو المخزون أقل من الكمية المطلوبة ([[qty]])، ارفض. لحد هنا شكله منطقي.

~~~js
await db.query("UPDATE products SET stock = $1 WHERE id = $2", [rows[0].stock - qty, id]);
~~~

المشكلة هنا: [[rows[0].stock - qty]] اتحسبت **في JavaScript** من رقم اتقرا من شوية، والـ UPDATE بيكتب الرقم ده جاهز. لو طلب تاني قرا نفس الرقم في الفترة دي، الاتنين هيكتبوا نفس النتيجة:

| الوقت | الطلب A | الطلب B | المخزون في القاعدة |
|---|---|---|---|
| ١ | يقرا 1 | | 1 |
| ٢ | | يقرا 1 | 1 |
| ٣ | 1 ≥ 1 تمام | 1 ≥ 1 تمام | 1 |
| ٤ | يكتب 0 | | 0 |
| ٥ | | يكتب 0 | 0 |

اتباعت قطعتين، والمخزون 0 مش -1، ومحدش أخد error. اسمها **lost update**: كتابة B مسحت أثر كتابة A.

---

## ٢. الطريقة الصح: أمر واحد

~~~js
const r = await db.query(
  "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
  [qty, id]
);
if (r.rowCount === 0) throw new Error("OUT_OF_STOCK");
~~~

| الحتة | معناها |
|---|---|
| [[SET stock = stock - $1]] | الطرح بيتعمل **جوه القاعدة** على القيمة الحالية لحظة الكتابة، مش على رقم قديم |
| [[WHERE id = $2]] | المنتج ده |
| [[AND stock >= $1]] | ولو المخزون لسه كفاية بس. الشرط والخصم في نفس الأمر |
| [[RETURNING stock]] | رجّعلي المخزون الجديد بعد الخصم |
| [[$1]] مرتين | نفس القيمة ([[qty]]) في مكانين، عادي |
| [[r.rowCount]] | عدد الصفوف اللي اتعدلت فعلًا: 1 = اتباع، 0 = الشرط مطابقش يعني خلص |

ليه ده آمن؟ الـ UPDATE بياخد **lock** على الصف. لو طلب تاني جه يعدّل نفس الصف، بيستنى لحد ما الأول يخلص، وبعدين Postgres بيعيد فحص [[stock >= $1]] على القيمة **الجديدة**.

---

## ٣. نشوفها بعينينا: نافذتين psql (تجربة الـ try)

خلّينا المخزون 1، والنافذة الأولى بتعمل الخصم وتستنى ٣ ثواني قبل COMMIT ([[pg_sleep(3)]] بينيّم الـ session)، والتانية بتبدأ بعدها بثانية:

~~~text نافذة 1
BEGIN
UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie' AND stock >= 1;
UPDATE 1
SELECT pg_sleep(3);
COMMIT
~~~

~~~text نافذة 2
BEGIN
UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie' AND stock >= 1;
UPDATE 0
Time: 2011.810 ms (00:02.012)
COMMIT
SELECT stock FROM products WHERE name = 'Hoodie';
 stock
-------
     0
~~~

- [[UPDATE 1]] في الأولى: صف واحد اتعدل، والمخزون بقى 0 (بس لسه مش باين لحد).
- التانية **وقفت** ٢ ثانية (الوقت اللي فضل للأولى لحد COMMIT): ده الـ lock.
- بعد COMMIT الأولى، التانية كمّلت وقالت [[UPDATE 0]]: أعادت فحص [[stock >= 1]] على القيمة الجديدة (0) فالشرط بقى false. الـ 0 ده هو [[rowCount === 0]] في الكود.
- المخزون في الآخر 0 مش -1.

---

## ٤. ٢٠ طلب في نفس الوقت من Node

المخزون 5، و ٢٠ عميل بيشتروا قطعة في نفس اللحظة ([[Promise.allSettled]] بيشغّل الـ ٢٠ مع بعض ويستنى الكل، ناجح أو فاشل):

~~~text الناتج
wrong: sold: 20 rejected: 0 stock now: 4
right: sold: 5 rejected: 15 stock now: 0
~~~

| الطريقة | اتباع | اترفض | المخزون في الآخر |
|---|---|---|---|
| غلط (SELECT ثم SET بالرقم) | ٢٠ | ٠ | 4 |
| صح (أمر واحد بشرط) | ٥ | ١٥ | 0 |

الطريقة الغلط باعت ٢٠ قطعة من ٥، والمخزون لسه بيقول 4: أغلب الطلبات قرت 5 وكتبت 4. والصح باع ٥ بالظبط. وبطلبين بس مكانش الغلط بيظهر كل مرة (في تشغيلنا الأول الاتنين طلعوا صح بالصدفة)، وده اللي بيخلي الـ bug ده يعدّي من الاختبار ويظهر يوم العرض.

---

## الخلاصة

| | الغلط | الصح |
|---|---|---|
| مين بيحسب الرقم الجديد | JavaScript | Postgres |
| إمتى بيتفحص الشرط | قبل الكتابة بوقت | لحظة الكتابة، وتحت lock |
| إزاي تعرف إنه خلص | [[if]] على رقم قديم | [[rowCount === 0]] |

- أي «اقرا، اتأكد، اكتب» على عدّاد: حط الشرط في الـ WHERE والحساب في الـ SET.
- الـ transaction لوحدها مش بتحل ده: الطريقة الغلط جوه BEGIN و COMMIT برضه بتبيع زيادة في الإعداد الافتراضي (READ COMMITTED).`,
          lines: [
            "اقرا المخزون.",
            "لو مش كفاية ارفض (بس الرقم ده ممكن يكون اتغير خلاص).",
            "اكتب رقم محسوب في JavaScript: طلبين في نفس اللحظة يكتبوا نفس الرقم.",
            "أمر واحد:",
            "اخصم بس لو المخزون لسه كفاية، ورجّع الرقم الجديد.",
            "القيم كـ parameters.",
            "قفلة.",
            "ولا صف اتعدل؟ يبقى المخزون خلص."
          ],
          sol: R`التانية هتقف ومش هترجع لحد ما تعمل COMMIT في الأولى، لأن الأولى ماسكة lock على صف الـ Hoodie. بعد الـ COMMIT التانية هتكمّل على طول وتقول [[UPDATE 1]]، والمخزون نزل ٢ (من 8 لـ 6 مثلًا). المهم إن التانية مقرتش القيمة القديمة: Postgres في READ COMMITTED بيعيد تقييم [[stock >= 1]] على النسخة الجديدة من الصف بعد ما القفل يتفك.

عشان تشوف الحماية بجد، خلي المخزون [[1]] ([[UPDATE products SET stock = 1 WHERE name = 'Hoodie';]]) وكرر: الأولى [[UPDATE 1]]، والتانية بعد الـ COMMIT هتقول [[UPDATE 0]]، والمخزون [[0]] مش [[-1]]. الـ 0 ده هو [[rowCount === 0]] اللي بيرمي OUT_OF_STOCK في الكود. أما بالطريقة الغلطة (SELECT في الكود وبعدين SET بالرقم) الاتنين كانوا هيقروا 1 ويكتبوا 0، وتبيع قطعتين وعندك واحدة.`
        },
        {
          cmd: "SELECT FOR UPDATE",
          title: "اقفل الصفوف اللي قريتها لحد ما تخلص",
          desc: R`أحيانًا القرار محتاج أكتر من شرط بسيط في WHERE: تقرا الأوردر، وتتأكد إنه لسه pending، وتشيك مخزون كل بنوده، وبعدين تكتب في جدولين. هنا [[SELECT ... FOR UPDATE]] جوه transaction بيقفل الصفوف اللي قريتها: أي transaction تانية عايزة تعدّلها أو تقفلها لازم تستنى لحد ما انت تعمل COMMIT أو ROLLBACK.

ده اسمه pessimistic locking: بتفترض إن فيه تصادم وبتمنعه من الأول.`,
          example: R`BEGIN;
SELECT status FROM orders WHERE id = 5 FOR UPDATE;
SELECT p.id, p.stock, oi.quantity
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = 5
ORDER BY p.id
FOR UPDATE OF p;
UPDATE products p SET stock = p.stock - oi.quantity
FROM order_items oi WHERE oi.order_id = 5 AND p.id = oi.product_id;
UPDATE orders SET status = 'paid' WHERE id = 5;
COMMIT;`,
          try: R`في نافذتين psql: الأولى [[BEGIN; SELECT * FROM orders WHERE id = 5 FOR UPDATE;]]. التانية نفس الأمر: هتقف. وفي نافذة تالتة جرّب [[SELECT * FROM orders WHERE id = 5;]] من غير FOR UPDATE: هترجع على طول، لأن القراية العادية مش بتستنى.`,
          flag: "script",
          deep: {
            why: "في مشروع حقيقي كان فيه زرار «ادفع» في لوحة الأدمن لطلب سحب أرباح. لو اتضغط مرتين بسرعة، أو اتنين أدمن ضغطوا في نفس اللحظة، الطلب كان ممكن يتدفع مرتين. الحل كان: جوه transaction، اقفل صف الطلب بـ FOR UPDATE، واقرا حالته من جديد بعد القفل، ولو اتدفع خلاص ارفض.",
            how: R`[[FOR UPDATE]] بياخد row lock على كل صف رجع. transaction تانية عايزة تعمل UPDATE أو DELETE أو FOR UPDATE على نفس الصف بتستنى. القراية العادية مش بتستنى (MVCC: بتشوف آخر نسخة متثبتة).

الترتيب المهم: القفل الأول وبعدين القراية اللي هتبني عليها القرار. لو قريت الحالة قبل القفل، ممكن تكون اتغيرت وانت مستني.

[[FOR UPDATE OF p]] بيقفل صفوف products بس مش order_items. و [[ORDER BY p.id]] مش للعرض: بيخلي كل الـ transactions تقفل المنتجات بنفس الترتيب. لو T1 قفل A وعايز B، و T2 قفل B وعايز A، يبقى deadlock، و Postgres بيكتشفه بعد ثانية ويلغي واحدة منهم بـ [[deadlock detected]] (40P01).

فيه اختيارات: [[NOWAIT]] بيرمي error فورًا بدل ما يستنى. و [[SKIP LOCKED]] بيعدّي الصفوف المقفولة، وده أساس أي job queue جوه Postgres: كل worker ياخد صفوف مختلفة.

القفل بيفضل لحد COMMIT أو ROLLBACK بس. برّه transaction (autocommit) بيتفك أول ما الأمر يخلص، فملوش لازمة.

في Prisma مفيش FOR UPDATE في الـ API العادي، فبتستخدم [[tx.$executeRaw]] جوه [[$transaction]] التفاعلية (درس $queryRaw).`,
            when: "قرار من أكتر من خطوة على نفس الصفوف: موافقة على طلب، دفع، حجز مقعد، وأي «اقرا، اتأكد، اكتب» الشرط فيها مينفعش يتكتب في WHERE واحد.",
            mistakes: R`FOR UPDATE برّه transaction. تقرا الحالة قبل القفل وتبني عليها. تقفل بترتيب مختلف في أماكن مختلفة فيحصل deadlock. وتمسك القفل وانت بتنادي API خارجي.`
          },
          teach: R`## الفكرة: اقفل الأول، اقرا، قرّر، اكتب، وبعدين فك

المثال دفع أوردر رقم 5: نقفل صف الأوردر، ونتأكد إنه لسه [[pending]]، ونقفل المنتجات اللي فيه ونقرا مخزونها، ونخصم، ونعلّم الأوردر مدفوع. كله جوه transaction واحدة، فمحدش يقدر يعدّل الصفوف دي وإحنا في النص.

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker. جهّزنا الأوردر 5 بحالة [[pending]] وفيه بندين: Mug (كمية 1) و Hoodie (كمية 2)، والمخزون قبلها Mug 14 و Hoodie 8. النوافذ المتوازية اتعملت بـ psql شغالين في نفس الوقت.

---

## ١. [[BEGIN]]

بداية الـ transaction. ده مهم جدًا هنا: القفل بتاع [[FOR UPDATE]] بيفضل لحد [[COMMIT]] أو [[ROLLBACK]] بس. من غير BEGIN، كل أمر transaction لوحده، فالقفل بيتفك أول ما الـ SELECT يخلص، ويبقى ملوش لازمة.

---

## ٢. [[SELECT status FROM orders WHERE id = 5 FOR UPDATE]]

SELECT عادي، وفي آخره [[FOR UPDATE]]: «اقفل كل صف رجع، كأني هعدّله». أي transaction تانية عايزة تعمل UPDATE أو DELETE أو FOR UPDATE على الصف ده هتستنى.

~~~text الناتج
 status
---------
 pending
(1 row)
~~~

القراية دي **بعد** القفل، فالـ [[pending]] ده مضمون يفضل pending لحد ما نخلص. الكود (في التطبيق) هنا بيتأكد: لو مش pending، ROLLBACK وارفض.

---

## ٣. نقفل المنتجات ونقرا مخزونها

~~~sql
SELECT p.id, p.stock, oi.quantity
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = 5
ORDER BY p.id
FOR UPDATE OF p;
~~~

| الحتة | معناها |
|---|---|
| [[order_items oi JOIN products p ON p.id = oi.product_id]] | البنود مع منتجاتها. [[oi]] و [[p]] أسماء مختصرة (aliases) |
| [[WHERE oi.order_id = 5]] | بنود الأوردر ده بس |
| [[ORDER BY p.id]] | ترتيب ثابت للقفل (تحت هنشوف ليه) |
| [[FOR UPDATE OF p]] | اقفل صفوف [[products]] بس. من غير [[OF p]] كان هيقفل صفوف order_items كمان |

~~~text الناتج
 id | stock | quantity
----+-------+----------
  2 |    14 |        1
  4 |     8 |        2
(2 rows)
~~~

الكود هنا بيتأكد إن كل [[stock]] أكبر من أو يساوي [[quantity]].

---

## ٤. الخصم: [[UPDATE ... FROM]]

~~~sql
UPDATE products p SET stock = p.stock - oi.quantity
FROM order_items oi WHERE oi.order_id = 5 AND p.id = oi.product_id;
~~~

[[UPDATE ... FROM]] بتاعة Postgres: عدّل جدول بقيم من جدول تاني. [[FROM order_items oi]] بيجيب البنود، و [[p.id = oi.product_id]] بيربط كل منتج ببنده، فكل منتج بيتخصم منه الكمية بتاعته. أمر واحد بدل UPDATE لكل بند.

~~~text الناتج
UPDATE 2
~~~

[[UPDATE 2]]: صفين اتعدلوا (المنتجين).

---

## ٥. [[UPDATE orders SET status = 'paid' WHERE id = 5]] ثم [[COMMIT]]

~~~text الناتج
UPDATE 1
COMMIT
~~~

بعد الـ COMMIT الأقفال كلها اتفكت، والمخزون:

~~~text الناتج
 id |  name   | stock
----+---------+-------
  1 | T-shirt |    40
  2 | Mug     |    13
  3 | Cap     |     0
  4 | Hoodie  |     6
~~~

Mug من 14 لـ 13، و Hoodie من 8 لـ 6.

---

## ٦. تجربة الـ try: تلات نوافذ

النافذة 1 قفلت الأوردر 5 بـ [[FOR UPDATE]] وفضلت ماسكاه ثانيتين قبل COMMIT ([[pg_sleep(2)]] بينيّم الـ session). النافذة 2 حاولت تقفل نفس الصف بعدها بنص ثانية:

~~~text نافذة 2
BEGIN
SELECT id, status, total FROM orders WHERE id = 5 FOR UPDATE;
 id | status |  total
----+--------+---------
  5 | paid   | 1410.00
(1 row)

Time: 1507.671 ms (00:01.508)
~~~

وقفت ١.٥ ثانية، اللي فضلوا للنافذة 1 لحد COMMIT، وبعدها رجعت. والنافذة 3 في نفس الوقت:

~~~text نافذة 3
SELECT id, status, total FROM orders WHERE id = 5;
 id | status |  total
----+--------+---------
  5 | paid   | 1410.00
(1 row)

Time: 1.097 ms

SELECT id, status, total FROM orders WHERE id = 5 FOR UPDATE NOWAIT;
ERROR:  could not obtain lock on row in relation "orders"
Time: 0.229 ms

SELECT id, status FROM orders WHERE id IN (5, 6) FOR UPDATE SKIP LOCKED;
 id | status
----+--------
  6 | paid
(1 row)
~~~

| الأمر | عمل إيه والصف مقفول |
|---|---|
| [[SELECT]] عادي | رجع على طول (١ms). القراية العادية مش بتستنى الأقفال (MVCC: بتشوف آخر نسخة اتعملها COMMIT) |
| [[FOR UPDATE]] | استنى لحد ما القفل اتفك |
| [[FOR UPDATE NOWAIT]] | رمى error فورًا بدل ما يستنى |
| [[FOR UPDATE SKIP LOCKED]] | عدّى الصف المقفول (5) ورجّع الباقي (6). ده أساس الـ job queues: كل worker ياخد صفوف غير اللي غيره ماسكها |

---

## ٧. ليه [[ORDER BY p.id]]: الـ deadlock

جربنا transactionين بيقفلوا نفس المنتجين بترتيب عكس بعض: الأولى 2 ثم 4، والتانية 4 ثم 2:

~~~text التانية
SELECT id FROM products WHERE id = 2 FOR UPDATE
ERROR:  deadlock detected
DETAIL:  Process 250 waits for ShareLock on transaction 884; blocked by process 249.
Process 249 waits for ShareLock on transaction 885; blocked by process 250.
HINT:  See server log for query details.
CONTEXT:  while locking tuple (0,57) in relation "products"
COMMIT
ROLLBACK
~~~

كل واحدة ماسكة منتج ومستنية التاني، فمفيش واحدة هتخلص أبدًا. Postgres بيكتشف ده بعد ثانية ([[deadlock_timeout]]) ويلغي واحدة منهم (كود الـ error [[40P01]])، والتانية بتكمل عادي. و [[DETAIL]] بيقول مين مستني مين. ولاحظ إن [[COMMIT]] بعد الـ error طبع [[ROLLBACK]]: الـ transaction بعد error بتبقى aborted، والـ COMMIT بيتحول ROLLBACK.

لو كل الكود بيقفل المنتجات بنفس الترتيب ([[ORDER BY p.id]])، التانية هتستنى على أول منتج بدل ما تمسك واحد وتستنى التاني، فمفيش deadlock.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[BEGIN]] | القفل عايش لحد آخر الـ transaction |
| ٢ | [[FOR UPDATE]] على الأوردر | محدش يغيّر حالته، واقرا الحالة بعد القفل |
| ٣ | [[ORDER BY p.id FOR UPDATE OF p]] | اقفل المنتجات بس، وبترتيب ثابت |
| ٤ | [[UPDATE ... FROM]] | اخصم كل البنود في أمر واحد |
| ٥ | [[COMMIT]] | ثبّت وفك الأقفال |

- [[NOWAIT]] لو مش عايز تستنى، و [[SKIP LOCKED]] للـ queues.
- خلّي الـ transaction اللي فيها أقفال قصيرة، ومن غير نداء لأي API برّه.`,
          lines: [
            "ابدأ transaction.",
            "اقفل صف الأوردر واقرا حالته (الكود يتأكد إنها pending).",
            "اقرا بنوده ومخزون كل منتج،",
            "من البنود مع المنتجات،",
            "للأوردر ده،",
            "بترتيب ثابت عشان مفيش deadlock،",
            "واقفل صفوف المنتجات بس (الكود يتأكد إن كل مخزون يكفي).",
            "اخصم كمية كل بند من منتجه،",
            "في أمر واحد بـ UPDATE ... FROM.",
            "علّم الأوردر مدفوع.",
            "ثبّت، والأقفال اتفكت."
          ],
          sol: R`النافذة التانية هتقف ومش هترجع لحد ما الأولى تعمل COMMIT أو ROLLBACK. في تجربة الأولى مسكت الصف ثانيتين، والتانية أخدت [[Time: 1713 ms]] وهي مستنية. التالتة (SELECT عادي) رجعت في أقل من ١ms وشافت الصف بقيمته الحالية، لأن القراية العادية في Postgres مش بتاخد locks ومش بتستنى الكتابة (MVCC).

لو عايز التانية متستناش خالص: [[FOR UPDATE NOWAIT]] بترجع فورًا بـ [[ERROR:  could not obtain lock on row in relation "orders"]]، و [[FOR UPDATE SKIP LOCKED]] بتتخطى الصف المقفول (ودي اللي بتتعمل بيها job queues). ولو التانية فضلت واقفة ومش بتكمل حتى بعد الـ COMMIT، اتأكد إن الأولى فعلًا عملت COMMIT ومش لسه جوه transaction بعد error ([[current transaction is aborted]]).`,
          solCode: R`-- نافذة 1
BEGIN;
SELECT * FROM orders WHERE id = 5 FOR UPDATE;
-- نافذة 2: هتقف
BEGIN;
SELECT * FROM orders WHERE id = 5 FOR UPDATE;
-- نافذة 3: بترجع على طول
SELECT * FROM orders WHERE id = 5;
SELECT * FROM orders WHERE id = 5 FOR UPDATE NOWAIT;
-- ERROR:  could not obtain lock on row in relation "orders"`
        },
        {
          cmd: "isolation levels",
          title: "الـ transaction بتشوف تعديلات غيرها ولا لأ",
          desc: R`الـ isolation level بيحدد الـ transaction بتشوف إيه من شغل الـ transactions التانية اللي شغالة في نفس الوقت. Postgres عمليًا عنده تلاتة: [[READ COMMITTED]] (الافتراضي): كل أمر بيشوف آخر حاجة اتعملها COMMIT لحظة ما هو بدأ. [[REPEATABLE READ]]: الـ transaction كلها بتشوف snapshot واحدة من أولها. [[SERIALIZABLE]]: النتيجة مضمونة كأن الـ transactions اتنفذت ورا بعض.

كل ما تطلع لفوق الأمان بيزيد، بس الـ transaction ممكن تفشل بـ serialization error ولازم تعيدها من الأول.`,
          example: R`BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT stock FROM products WHERE name = 'Hoodie';        -- 8
SELECT stock FROM products WHERE name = 'Hoodie';        -- لسه 8 حتى لو حد عدّله وعمل COMMIT
COMMIT;
BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT count(*) FROM orders WHERE status = 'pending' AND user_id = (SELECT id FROM users LIMIT 1);
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1;
COMMIT;                                                  -- واحدة من اتنين متزامنين هتفشل (هنا أو في الـ INSERT): 40001`,
          try: R`جرّب أول transaction في نافذة، وفي نافذة تانية عدّل المخزون بين السطرين. وبعدين كرر نفس الحكاية بـ [[BEGIN;]] عادي (READ COMMITTED): السطر التاني هيشوف الرقم الجديد.`,
          flag: "script",
          deep: {
            why: "الـ transaction مش معناها «لوحدك في القاعدة». في READ COMMITTED تقدر تقرا رقم، وحد يغيّره، وتقرا تاني تلاقيه اتغير في نفس الـ transaction. فهم المستويات بيقولك إمتى تحتاج lock أو شرط atomic، وإمتى ترفع المستوى.",
            how: R`المشاكل اللي المستويات بتمنعها:

- dirty read: تقرا حاجة لسه متعملهاش COMMIT. عمرها ما بتحصل في Postgres (حتى READ UNCOMMITTED بيشتغل زي READ COMMITTED).
- non-repeatable read: تقرا نفس الصف مرتين تلاقيه اتغير. بتحصل في READ COMMITTED.
- phantom read: نفس الشرط يرجّع صفوف جديدة. REPEATABLE READ في Postgres بيمنعها.
- lost update: اقرا وعدّل واكتب (درس atomic UPDATE). في REPEATABLE READ لو حاولت تعدّل صف غيرك عدّله بعد الـ snapshot بتاعتك، بتاخد [[could not serialize access due to concurrent update]] بدل ما تكتب فوقه.
- write skew: اتنين كل واحد قرا، وقرر، وكتب صف مختلف، والقرارين مع بعض بيكسروا قاعدة. مثال المثال: «أوردر pending واحد بس لكل يوزر»؛ طلبين يعدّوا الـ count ويضيفوا الاتنين. SERIALIZABLE بس هو اللي بيمسكها.

SERIALIZABLE في Postgres (SSI) مش بيقفل كل حاجة؛ بيراقب مين قرا إيه ومين كتب إيه، ولو لقى ترتيب مستحيل بيلغي واحدة بـ error كود [[40001]]. والتطبيق لازم يعيد الـ transaction كلها (loop من ٣ محاولات مثلًا).

في Prisma: [[isolationLevel: Prisma.TransactionIsolationLevel.Serializable]] في options بتاعة [[$transaction]]، والتصادم بيوصلك [[P2034]].`,
            when: "الافتراضي + atomic UPDATE + FOR UPDATE بيغطوا أغلب التطبيقات. REPEATABLE READ لتقرير من كذا استعلام لازم يبقوا من نفس اللحظة. SERIALIZABLE لقواعد معقدة بين صفوف كتير، ومعاه retry.",
            mistakes: R`تفتكر إن أي transaction = serializable. SERIALIZABLE من غير retry فاليوزر ياخد error عشوائي. و transactions طويلة في SERIALIZABLE فتتلغي كتير.`
          },
          teach: R`## الفكرة: الـ transaction بتشوف صورة من القاعدة، والسؤال: الصورة دي بتتجدد إمتى؟

المثال فيه transactionين. الأولى بـ [[REPEATABLE READ]] بتقرا المخزون مرتين وتثبت إن الرقم مبيتغيرش حتى لو حد غيّره. التانية بـ [[SERIALIZABLE]] بتعمل «اتأكد، وبعدين ضيف»، وبتوري إن Postgres بيلغي واحدة لو اتنين عملوا نفس الحكاية مع بعض.

السطر الواحد مبيوريش حاجة؛ لازم نافذة تانية تغيّر في النص. فكل اللي تحت اتشغّل بـ psql في نافذتين في نفس الوقت على [[postgres:18]] في Docker، والنافذة الأولى فيها [[pg_sleep(1)]] (نام ثانية) بين القرايتين عشان التانية تلحق تعدّل.

---

## ١. [[BEGIN ISOLATION LEVEL REPEATABLE READ]]

[[BEGIN]] لوحده بيبدأ بالمستوى الافتراضي [[READ COMMITTED]]. و [[ISOLATION LEVEL ...]] بعده بيختار مستوى تاني للـ transaction دي بس.

| المستوى | الصورة (snapshot) بتتاخد إمتى |
|---|---|
| [[READ COMMITTED]] (الافتراضي) | من جديد مع **كل أمر** |
| [[REPEATABLE READ]] | مرة واحدة، مع **أول أمر** في الـ transaction، وتفضل لحد الآخر |
| [[SERIALIZABLE]] | زي REPEATABLE READ، وكمان بيراقب التعارضات ويلغي واحدة لو النتيجة مستحيلة لو كانوا اتنفذوا ورا بعض |

---

## ٢. القرايتين في REPEATABLE READ، والنافذة التانية بتزوّد في النص

~~~text نافذة 1
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT stock FROM products WHERE name = 'Hoodie';
 stock
-------
     6
SELECT pg_sleep(1);
SELECT stock FROM products WHERE name = 'Hoodie';
 stock
-------
     6
~~~

~~~text نافذة 2 (بين القرايتين)
UPDATE products SET stock = stock + 5 WHERE name = 'Hoodie'
UPDATE 1
~~~

التانية زوّدت 5 وخلصت (مفيش BEGIN، فالأمر اتعمله COMMIT لوحده)، يعني القاعدة فيها 11 دلوقتي. ومع ذلك القراية التانية في نافذة 1 قالت **6**: الـ transaction شايفة الصورة اللي اتاخدت عند أول SELECT. (المخزون كان 6 مش 8 لأن الدروس اللي فاتت خصمت منه، ونفس الفكرة: ٨ و ٨ في تعليق المثال.)

### وبعدين لو حاولت تعدّل الصف ده؟

~~~text نافذة 1
UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie';
ERROR:  could not serialize access due to concurrent update
ROLLBACK;
~~~

نافذة 1 شايفة 6، بس الصف الحقيقي بقى 11. لو Postgres سابها تكتب 5 كان هيمسح زيادة نافذة 2 (lost update). فبيرفض، وكود الـ error [[40001]] ([[serialization_failure]]). الحل الوحيد: ROLLBACK وإعادة الـ transaction كلها من أولها، فتاخد صورة جديدة فيها 11.

---

## ٣. نفس التجربة بـ [[BEGIN;]] العادي (READ COMMITTED)

~~~text نافذة 1
BEGIN;
SELECT stock FROM products WHERE name = 'Hoodie';
 stock
-------
    11
SELECT pg_sleep(1);
SELECT stock FROM products WHERE name = 'Hoodie';
 stock
-------
    16
COMMIT;
~~~

نافذة 2 زوّدت 5 تاني بين القرايتين، والقراية التانية شافتها على طول (11 ثم 16)، لأن كل SELECT بياخد صورة جديدة. ده اسمه **non-repeatable read**: نفس السؤال في نفس الـ transaction رجّع إجابتين.

---

## ٤. [[SERIALIZABLE]]: «اتأكد وبعدين ضيف» من نافذتين

~~~sql
BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT count(*) FROM orders WHERE status = 'pending' AND user_id = (SELECT id FROM users LIMIT 1);
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1;
COMMIT;
~~~

الفكرة: التطبيق بيعدّ أوردرات اليوزر الـ pending، ولو تحت الحد يضيف واحد. [[INSERT ... SELECT id FROM users LIMIT 1]] بيضيف أوردر لأول يوزر (الحالة [[pending]] من الـ DEFAULT). شغّلنا الملف ده في نافذتين، التانية بعد الأولى بـ 0.3 ثانية، ومع [[pg_sleep(1)]] بين الـ SELECT والـ INSERT، و [[\set VERBOSITY verbose]] عشان psql يطبع كود الـ error:

~~~text نافذة 1
 count
-------
     2
INSERT 0 1
COMMIT
~~~

~~~text نافذة 2
 count
-------
     2
INSERT INTO orders (user_id) SELECT id FROM users LIMIT 1;
ERROR:  40001: could not serialize access due to read/write dependencies among transactions
DETAIL:  Reason code: Canceled on identification as a pivot, during write.
HINT:  The transaction might succeed if retried.
COMMIT;
ROLLBACK
~~~

- الاتنين عدّوا 2. لو اتنفذوا ورا بعض فعلًا، التانية كانت هتشوف 3. فالنتيجة «الاتنين ضافوا وهما شايفين 2» مستحيلة في أي ترتيب، و Postgres لغى واحدة.
- الـ error جه هنا عند الـ INSERT، مش عند COMMIT. ممكن ييجي عند أي أمر أو عند COMMIT، حسب إمتى Postgres اكتشف التعارض.
- [[HINT: The transaction might succeed if retried]]: ده المطلوب منك في الكود، تعيدها.
- [[COMMIT]] بعد الـ error طبع [[ROLLBACK]]: الـ transaction بعد أي error بتبقى aborted.

### ونفس الملف بـ READ COMMITTED؟

~~~text نافذتين بـ BEGIN العادي
 count
-------
     3
INSERT 0 1
COMMIT
(والتانية نفس الكلام بالظبط)
~~~

الاتنين عدّوا 3 والاتنين ضافوا، فبقى فيه أوردرين زيادة رغم إن كل واحد «اتأكد» الأول. ده اسمه **write skew**، و SERIALIZABLE بس هو اللي بيمسكه.

---

## الخلاصة

| | READ COMMITTED | REPEATABLE READ | SERIALIZABLE |
|---|---|---|---|
| قرايتين لنفس الصف | ممكن يختلفوا | نفس الرقم | نفس الرقم |
| تعدّل صف حد غيّره بعد صورتك | بيكتب على القيمة الجديدة | error [[40001]] | error [[40001]] |
| اتنين «اتأكد وضيف» مع بعض | الاتنين بيضيفوا | الاتنين بيضيفوا | واحدة بتتلغي [[40001]] |
| محتاج retry في الكود | لأ | أيوه | أيوه |

- [[40001]] مش bug، ده Postgres بيقولك «عيد». الكود يعمل loop صغير (٣ محاولات مثلًا) على الـ transaction **كلها**.
- أغلب التطبيقات: الافتراضي + atomic UPDATE + FOR UPDATE. وSERIALIZABLE للقواعد اللي بتتحقق بالعدّ أو بين صفوف كتير.`,
          lines: [
            "ابدأ transaction بـ snapshot ثابتة.",
            "اقرا المخزون.",
            "اقرا تاني: نفس الرقم، حتى لو اتغير برّه.",
            "خلّص.",
            "ابدأ transaction بأعلى مستوى.",
            "اتأكد إن اليوزر معندوش أوردر pending.",
            "مفيش؟ ضيف واحد.",
            "لو transaction تانية عملت نفس الحكاية في نفس الوقت، واحدة منهم هتفشل بـ 40001، هنا أو في الـ INSERT اللي قبله."
          ],
          sol: R`بـ REPEATABLE READ: السطرين هيرجّعوا نفس الرقم (8 و 8) حتى لو النافذة التانية زوّدت المخزون وعملت COMMIT بينهم، لأن الـ transaction بتشوف snapshot اتاخدت عند أول استعلام فيها. بـ [[BEGIN;]] العادي (READ COMMITTED): السطر التاني هيشوف الرقم الجديد (مثلًا 13 ثم 18 بعد +5)، لأن كل statement بياخد snapshot جديدة.

وفيه حاجة زيادة تستاهل تجربها: جوه REPEATABLE READ، بعد ما التانية عدّلت الصف وعملت COMMIT، اعمل UPDATE على نفس الصف في الأولى: هتاخد [[ERROR:  could not serialize access due to concurrent update]]. Postgres رفض يكتب فوق تعديل انت مشفتوش، والكود لازم يعمل retry للـ transaction كلها. ولو السطرين في REPEATABLE READ طلعوا مختلفين، يبقى التعديل حصل قبل أول SELECT مش بينهم.`,
          solCode: R`-- نافذة 1
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT stock FROM products WHERE name = 'Hoodie';   -- 8
-- نافذة 2
UPDATE products SET stock = stock + 5 WHERE name = 'Hoodie';
-- نافذة 1
SELECT stock FROM products WHERE name = 'Hoodie';   -- لسه 8
UPDATE products SET stock = stock - 1 WHERE name = 'Hoodie';
-- ERROR:  could not serialize access due to concurrent update
ROLLBACK;`
        },
        {
          cmd: "ON CONFLICT",
          title: "ضيف لو مش موجود، وعدّل لو موجود",
          desc: R`[[INSERT ... ON CONFLICT]] بيقول لـ Postgres يعمل إيه لو الصف الجديد هيكسر UNIQUE: [[DO NOTHING]] (تجاهل)، أو [[DO UPDATE SET ...]] (عدّل الموجود). ده اسمه upsert، وبيتعمل في أمر واحد atomic، فمفيش race بين «اتأكد إنه موجود» و «ضيفه».

و [[EXCLUDED]] معناها «الصف اللي كنت بحاول أضيفه».`,
          example: R`ALTER TABLE products ADD COLUMN sku text UNIQUE;
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock
RETURNING id, price, stock;
INSERT INTO products (sku, name, price) VALUES ('TS-BLK-M', 'T-shirt black M', 250)
ON CONFLICT (sku) DO NOTHING;`,
          try: R`شغّل أول INSERT تلات مرات، وشوف المخزون بيزيد ١٠ كل مرة والـ id ثابت. وبعدين حط نفس الـ sku مرتين في نفس الـ VALUES واقرا الـ error. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: شغّل نفس الـ upsert تلات مرات (sku [['TS-BLK-M']] وسعر 250 ومخزون 10)، بحيث المخزون يتجمع والسعر يتحدث، وفي الآخر [[SELECT sku, price, stock FROM products;]].`,
          flag: "script",
          deep: {
            why: "استيراد كتالوج من مورّد كل يوم، أو «ضيف للسلة» (موجود؟ زوّد الكمية)، أو webhook من بوابة دفع بيتبعت مرتين. الحل الساذج SELECT وبعدين INSERT أو UPDATE في الكود، وده بيتكسر لما طلبين ييجوا مع بعض: الاتنين يلاقوا «مش موجود» والاتنين يعملوا INSERT.",
            how: R`الـ conflict target ([[(sku)]]) لازم يطابق unique index أو constraint موجود. لو الـ index partial (فيه WHERE)، لازم تكتب نفس الشرط بعد الأعمدة.

لما يلاقي تصادم، Postgres بيقفل الصف الموجود وبينفّذ الـ UPDATE عليه. لو upsert تاني جه في نفس اللحظة، بيستنى، فالنتيجة دايمًا صح.

[[DO UPDATE ... WHERE]] بيخليك تعدّل بشرط، زي «عدّل بس لو الداتا الجاية أحدث».

قيود: مينفعش نفس الأمر يعدّل نفس الصف مرتين، فلو الـ VALUES فيها نفس المفتاح مرتين: [[ON CONFLICT DO UPDATE command cannot affect row a second time]]. والـ identity بيتصرف رقم حتى لو الصف معملش INSERT، فتلاقي فجوات.

الاستخدام الأهم: idempotency للـ webhooks. بوابات الدفع بتعيد الإرسال لو ماردتش بسرعة. تحفظ [[event_id]] في جدول عليه UNIQUE، وتعمل [[INSERT ... ON CONFLICT DO NOTHING RETURNING id]]: لو مرجعش صف يبقى الحدث اتعالج قبل كده، فمتعملوش تاني.

و Prisma [[upsert]] بيتحول ON CONFLICT حقيقي في حالات معينة بس (unique واحد في where، ومن غير nested writes). غير كده Prisma بيعمل SELECT وبعدين INSERT، وممكن مع التزامن ياخد [[P2002]]؛ والحل اللي في الـ docs: امسكه واعمل retry.`,
            when: "استيراد ومزامنة، وعدادات per-key، وسلة المشتريات، و webhooks.",
            mistakes: R`SELECT ثم INSERT في الكود. نفس المفتاح مرتين في batch واحد. و webhook بيتعالج مرتين فالعميل ياخد الكورس مرتين أو الرصيد يزيد مرتين.`
          },
          teach: R`## الفكرة: INSERT بخطة بديلة لو الصف موجود

INSERT العادي على قيمة UNIQUE موجودة بيفشل. [[ON CONFLICT]] بيقول لـ Postgres: «لو الصف ده هيتصادم مع صف موجود، متفشلش، اعمل كذا بداله». المثال بيضيف عمود [[sku]] فريد، وبعدين يوري الاختيارين: [[DO UPDATE]] (عدّل الموجود) و [[DO NOTHING]] (سيبه).

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker، على جدول [[products]] بتاع الدروس اللي فاتت.

---

## ١. [[ALTER TABLE products ADD COLUMN sku text UNIQUE]]

[[ADD COLUMN]] بيضيف عمود [[sku]] (Stock Keeping Unit: كود المنتج اللي المخزن بيعرفه بيه، زي [[TS-BLK-M]] = تيشيرت أسود مقاس M) من نوع [[text]]. و [[UNIQUE]] بيعمل جنبه unique index لوحده:

~~~text جزء من \d products
 sku        | text                     |           |          |
Indexes:
    "products_sku_key" UNIQUE CONSTRAINT, btree (sku)
~~~

المنتجات القديمة الـ sku بتاعها NULL، وده مش بيكسر UNIQUE: الـ NULL مش بيتساوى مع NULL، فممكن يبقى فيه كذا صف بـ NULL.

---

## ٢. الـ upsert: سطر سطر

~~~sql
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock
RETURNING id, price, stock;
~~~

| الحتة | معناها |
|---|---|
| [[INSERT ... VALUES (...)]] | المحاولة العادية: ضيف المنتج ده |
| [[ON CONFLICT (sku)]] | لو فيه صف بنفس الـ [[sku]] (الـ conflict target). لازم يكون عليه UNIQUE أو PRIMARY KEY |
| [[DO UPDATE SET ...]] | بدل الـ error، عدّل الصف الموجود |
| [[EXCLUDED.price]] | السعر من الصف اللي **كنا بنحاول نضيفه** (اتسمى excluded لأنه اترفض) |
| [[products.stock]] | المخزون في الصف **الموجود** في الجدول |
| [[products.stock + EXCLUDED.stock]] | الموجود + الجاي |
| [[RETURNING id, price, stock]] | رجّع الصف بعد ما يتضاف أو يتعدل |

### أول مرة: مفيش صف، فـ INSERT عادي

~~~text الناتج
 id | price  | stock
----+--------+-------
  6 | 250.00 |    10
(1 row)

INSERT 0 1
~~~

### تاني مرة (وغيرنا السعر لـ 260 عشان نشوفه بيتحدث)

~~~text الناتج
 id | price  | stock
----+--------+-------
  6 | 260.00 |    20
(1 row)

INSERT 0 1
~~~

نفس الـ [[id]] (مفيش صف جديد)، السعر اتحدث للقيمة الجاية، والمخزون اتجمع: 10 + 10. و psql بيقول [[INSERT 0 1]] حتى لو اللي حصل UPDATE، لأن الأمر نفسه INSERT.

### ليه [[products.stock]] مش [[stock]] بس؟

~~~sql
INSERT INTO products (sku, name, price) VALUES ('TS-BLK-M', 'T-shirt black M', 250)
ON CONFLICT (sku) DO UPDATE SET stock = stock + 1;
~~~

~~~text الناتج
ERROR:  column reference "stock" is ambiguous
LINE 2: ON CONFLICT (sku) DO UPDATE SET stock = stock + 1;
                                                ^
~~~

جوه [[DO UPDATE]] فيه صفين ليهم عمود [[stock]]: الموجود و [[EXCLUDED]]. فلازم تقول أنهي واحد. (الـ [[stock]] اللي على شمال [[=]] مفيهوش لبس: ده دايمًا عمود الصف اللي بيتعدل.)

---

## ٣. [[ON CONFLICT (sku) DO NOTHING]]

~~~sql
INSERT INTO products (sku, name, price) VALUES ('TS-BLK-M', 'T-shirt black M', 250)
ON CONFLICT (sku) DO NOTHING;
~~~

~~~text الناتج
INSERT 0 0
~~~

[[INSERT 0 0]]: صفر صفوف اتضافت، ومفيش error. الصف الموجود متلمسش. ولو كتبت [[RETURNING id]] مع DO NOTHING، هيرجّع صفر صفوف في الحالة دي، ودي الحيلة اللي في deep لمنع معالجة webhook مرتين: رجع صف؟ يبقى جديد. مرجعش؟ يبقى اتعالج قبل كده.

ومن غير [[ON CONFLICT]] خالص:

~~~text الناتج
ERROR:  duplicate key value violates unique constraint "products_sku_key"
DETAIL:  Key (sku)=(TS-BLK-M) already exists.
~~~

---

## ٤. الأخطاء اللي هتقابلها

### target ملوش UNIQUE

~~~text ON CONFLICT (name) DO NOTHING
ERROR:  there is no unique or exclusion constraint matching the ON CONFLICT specification
~~~

[[name]] مفيش عليه UNIQUE، فـ Postgres مش عارف «التصادم» هنا معناه إيه.

### نفس المفتاح مرتين في نفس الأمر (تجربة الـ try)

~~~sql
INSERT INTO products (sku, name, price, stock)
VALUES ('TS-BLK-L', 'T-shirt black L', 250, 5), ('TS-BLK-L', 'T-shirt black L', 250, 5)
ON CONFLICT (sku) DO UPDATE SET stock = products.stock + EXCLUDED.stock;
~~~

~~~text الناتج
ERROR:  ON CONFLICT DO UPDATE command cannot affect row a second time
HINT:  Ensure that no rows proposed for insertion within the same command have duplicate constrained values.
~~~

الأمر الواحد مينفعش يعدّل نفس الصف مرتين. والـ [[HINT]] بيقول الحل: شيل التكرار من الـ VALUES قبل ما تبعت (اجمع الكميات في الكود). والأمر كله اتلغى، ولا حتى الصف الأول اتضاف.

---

## ٥. الـ ids اللي نطّت

بعد كل التجارب دي ضفنا منتج جديد عادي:

~~~text الناتج
 id |   sku    |      name       | price  | stock
----+----------+-----------------+--------+-------
  6 | TS-BLK-M | T-shirt black M | 260.00 |    20
 12 | TS-BLK-S | T-shirt black S | 250.00 |     0
~~~

من 6 لـ 12 على طول. كل محاولة INSERT بتطلب رقم من الـ identity قبل ما تعرف إن فيه تصادم، حتى لو انتهت UPDATE أو DO NOTHING أو error، والرقم ده مبيرجعش. فجوات عادية، متعتمدش على الـ id كعدّاد.

---

## الخلاصة

| الحالة | [[DO UPDATE]] | [[DO NOTHING]] | من غير ON CONFLICT |
|---|---|---|---|
| الصف مش موجود | INSERT | INSERT | INSERT |
| الصف موجود | UPDATE عليه | ولا حاجة ([[INSERT 0 0]]) | [[duplicate key]] error |

- [[EXCLUDED]] = الصف الجاي، واسم الجدول = الصف الموجود.
- الـ conflict target لازم يطابق UNIQUE أو PRIMARY KEY.
- كله أمر واحد atomic، فمفيش race بين «موجود؟» و «ضيف».`,
          lines: [
            "ضيف كود منتج فريد.",
            "حاول تضيف منتج بالكود ده،",
            "ولو الكود موجود، عدّل الموجود بدل الـ error:",
            "السعر الجديد، والمخزون يزيد بالكمية الجاية.",
            "ورجّع الصف في الحالتين.",
            "نفس المحاولة،",
            "بس لو موجود متعملش حاجة خالص."
          ],
          sol: R`التلات مرات هيرجّعوا نفس الـ id، والمخزون [[10]] ثم [[20]] ثم [[30]]: أول مرة INSERT، وبعدها كل مرة UPDATE بيجمع [[EXCLUDED.stock]] (القيمة اللي كنت عايز تدخلها) على [[products.stock]] (القيمة الموجودة). لو شغّلت الدرس قبل كده بالـ ALTER، هيقولك [[column "sku" of relation "products" already exists]]، عادي، والأرقام هتكمل من اللي موجود.

نفس الـ sku مرتين في نفس الـ VALUES مع DO UPDATE: [[ERROR:  ON CONFLICT DO UPDATE command cannot affect row a second time]]، لأن الأمر الواحد مينفعش يعدّل نفس الصف مرتين. الحل تجمّع الصفوف في الكود (أو بـ GROUP BY) قبل الإرسال. ومع DO NOTHING مش هيطلع error، هيتضاف صف واحد بس. وخلي بالك: كل محاولة upsert بتحرق رقم من الـ sequence حتى لو عملت UPDATE، فالـ id الجاي للمنتجات الجديدة هيبقى نط.`,
          solCode: R`INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock
RETURNING id, price, stock;   -- نفس الـ id، والمخزون +10 كل مرة
INSERT INTO products (sku, name, price, stock)
VALUES ('TS-BLK-L', 'T-shirt black L', 250, 5), ('TS-BLK-L', 'T-shirt black L', 250, 5)
ON CONFLICT (sku) DO UPDATE SET stock = products.stock + EXCLUDED.stock;
-- ERROR:  ON CONFLICT DO UPDATE command cannot affect row a second time`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL DEFAULT 0
);`,
            starter: R`INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10);
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10);
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10);
SELECT sku, price, stock FROM products;`,
            expect: [["TS-BLK-M",250,30]],
            solution: R`INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock;
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock;
INSERT INTO products (sku, name, price, stock) VALUES ('TS-BLK-M', 'T-shirt black M', 250, 10)
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = products.stock + EXCLUDED.stock;
SELECT sku, price, stock FROM products;`
          }
        }
      ]
    },
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
    },
    {
      t: "استعلامات للتقارير والـ API",
      l: 2,
      n: "جدول بيتربط بنفسه، ونتايج من كذا جدول في قايمة واحدة، والأوردر وبنوده في صف واحد جاهز للـ JSON، وآخر N صفوف لكل يوزر",
      items: [
        {
          cmd: "self join",
          title: "الموظف ومديره في نفس الجدول",
          desc: R`أحيانًا الصف بيشاور على صف تاني في نفس الجدول: الموظف ومديره موظف برضه، والتعليق والرد عليه تعليق برضه، والتصنيف وتصنيفه الأب. العمود ده FK على نفس الجدول ([[manager_id REFERENCES employees (id)]]).

عشان تجيب الاتنين في صف واحد، بتعمل JOIN للجدول على نفسه بـ alias مختلف: [[employees e]] للموظف و [[employees m]] للمدير. SQL شايفهم جدولين، مع إنهم نفس الداتا.`,
          example: R`CREATE TABLE employees (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  manager_id bigint REFERENCES employees (id)
);
INSERT INTO employees (name, manager_id) VALUES ('Mona', NULL), ('Karim', 1), ('Hany', 1), ('Nour', 2);
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;
SELECT m.name AS manager, count(e.id) AS reports
FROM employees m
JOIN employees e ON e.manager_id = m.id
GROUP BY m.name;`,
          try: R`اعمل جدول [[comments]] فيه [[id]] و [[body]] و [[parent_id]] بيشاور على نفس الجدول، وضيف تعليقين وردّين على الأول ورد على الرد. اكتب استعلام يرجّع كل رد ومعاه نص التعليق اللي بيرد عليه. وبعدين هات كل السلسلة من الرد الأخير لحد التعليق الأصلي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: بـ [[WITH RECURSIVE]]: السلسلة من الرد رقم 5 لحد التعليق الأصلي: [[id]] و [[body]] و [[depth]] (الرد نفسه 0)، مترتبة بالـ depth.`,
          sol: R`الاستعلام الأول self join عادي: [[comments r JOIN comments p ON p.id = r.parent_id]]. هيرجّع ٣ صفوف (الردين على الأول، والرد على الرد) ومعاهم نص الأب. التعليقات الأصلية مش هتظهر لأن parent_id بتاعها NULL و INNER JOIN بيشيلها؛ لو عايزها تظهر بأب فاضي استخدم LEFT JOIN.

السلسلة كلها مش هتتعمل بـ JOIN ثابت، لأنك مش عارف العمق كام. الحل [[WITH RECURSIVE]]: تبدأ من الرد الأخير، وكل خطوة تجيب الأب بتاع اللي قبله، لحد ما parent_id يبقى NULL. النتيجة ٣ صفوف: الرد على الرد (depth 0)، وبعده الرد، وبعده التعليق الأصلي (depth 2).

الغلطة الشائعة: تنسى الـ alias وتكتب [[JOIN comments ON comments.id = comments.parent_id]]، فـ Postgres يقول [[table name "comments" specified more than once]].`,
          solCode: R`CREATE TABLE comments (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  body      text NOT NULL,
  parent_id bigint REFERENCES comments (id) ON DELETE CASCADE
);
INSERT INTO comments (body, parent_id) VALUES
  ('first', NULL), ('second', NULL), ('reply 1', 1), ('reply 2', 1), ('reply to reply', 3);

SELECT r.body AS reply, p.body AS replying_to
FROM comments r
JOIN comments p ON p.id = r.parent_id;

WITH RECURSIVE thread AS (
  SELECT id, body, parent_id, 0 AS depth FROM comments WHERE id = 5
  UNION ALL
  SELECT c.id, c.body, c.parent_id, t.depth + 1
  FROM comments c JOIN thread t ON c.id = t.parent_id
)
SELECT body, depth FROM thread;`,
          flag: "script",
          deep: {
            why: "الهياكل الشجرية في كل حتة: موظفين ومديرين، وتعليقات وردود، وتصنيفات جوه تصنيفات، ويوزر دعا يوزر (referral). عمل جدول تاني للمديرين أو للردود بيكرر نفس الأعمدة، وبيخلي «رد على رد» مستحيل.",
            how: R`الـ alias هو كل الحكاية: [[FROM employees e JOIN employees m]] بيخلي Postgres يقرا الجدول مرتين كأنهم جدولين. [[ON m.id = e.manager_id]] معناها «المدير هو الصف اللي الـ id بتاعه هو manager_id بتاعي».

[[LEFT JOIN]] مهم هنا: المدير الكبير ملوش مدير (manager_id NULL)، فلو INNER JOIN هيختفي من القايمة.

الاتجاه بيفرق: [[e.manager_id = m.id]] بيجيب مدير كل موظف (صف لكل موظف)، و [[GROUP BY m]] بيعدّ اللي تحت كل مدير.

لعمق مش معروف (سلسلة المديرين لحد الآخر، أو شجرة ردود كاملة) بتستخدم [[WITH RECURSIVE]]: جزء بيبدأ (الصف الأول)، و [[UNION ALL]]، وجزء بيتكرر وبيعمل JOIN على نتيجة الخطوة اللي قبله، لحد ما مفيش صفوف جديدة. وحط شرط عمق ([[WHERE depth < 20]]) لو ممكن الداتا يكون فيها دايرة (A مديره B و B مديره A)، وإلا الاستعلام مش هيخلص.

والـ index على العمود اللي بيشاور ([[manager_id]] أو [[parent_id]]) ضروري، زي أي FK.`,
            when: "أي علاقة أب وابن من نفس النوع: مديرين، ردود، تصنيفات، فولدرات، referrals. ولو الشجرة كبيرة جدًا وبتتقري أكتر ما بتتكتب، فيه تصميمات تانية (materialized path أو extension [[ltree]]).",
            mistakes: R`INNER JOIN فالمدير الكبير أو التعليقات الأصلية تختفي. نفس الاسم من غير alias. اتجاه الـ ON معكوس فتطلع «مرؤوسين» بدل «مدير». استعلام لكل مستوى في الكود (الرد، وبعدين ردود الرد، وبعدين...)، وده N+1 على شكل شجرة. و WITH RECURSIVE من غير حد للعمق على داتا ممكن يكون فيها دايرة. وفي الانترفيو سؤال كلاسيكي: «هات الموظفين اللي مرتبهم أعلى من مرتب مديرهم»، والإجابة self join وشرط [[e.salary > m.salary]].`
          },
          teach: R`## الفكرة: نفس الجدول مرتين، بدورين مختلفين

جدول [[employees]] فيه الموظفين كلهم، والمدير موظف برضه. فعمود [[manager_id]] بيشاور على صف تاني **في نفس الجدول**. عشان نجيب «الموظف واسم مديره» في صف واحد، بنقرا الجدول مرتين باسمين مختلفين ونربطهم.

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker.

---

## ١. الجدول: [[manager_id bigint REFERENCES employees (id)]]

~~~sql
CREATE TABLE employees (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  manager_id bigint REFERENCES employees (id)
);
~~~

| العمود | معناه |
|---|---|
| [[id]] | رقم الموظف، بيتولّد لوحده ([[GENERATED ALWAYS AS IDENTITY]]) |
| [[name]] | اسمه، إجباري ([[NOT NULL]]) |
| [[manager_id]] | رقم مديره. نفس نوع [[id]] ([[bigint]]) |
| [[REFERENCES employees (id)]] | foreign key على **نفس الجدول**: لازم يكون id موجود فعلًا |

ومفيش [[NOT NULL]] على [[manager_id]]، لأن المدير الكبير ملوش مدير. والـ FK بيمنع رقم مش موجود:

~~~text INSERT INTO employees (name, manager_id) VALUES ('Ghost', 99);
ERROR:  insert or update on table "employees" violates foreign key constraint "employees_manager_id_fkey"
DETAIL:  Key (manager_id)=(99) is not present in table "employees".
~~~

---

## ٢. الداتا

~~~sql
INSERT INTO employees (name, manager_id) VALUES ('Mona', NULL), ('Karim', 1), ('Hany', 1), ('Nour', 2);
~~~

الترتيب مهم: Mona الأول عشان تاخد [[id = 1]] قبل ما Karim و Hany يشاوروا عليها.

~~~text SELECT * FROM employees;
 id | name  | manager_id
----+-------+------------
  1 | Mona  |
  2 | Karim |          1
  3 | Hany  |          1
  4 | Nour  |          2
~~~

يعني: Mona فوق، تحتها Karim و Hany، و Nour تحت Karim.

---

## ٣. كل موظف واسم مديره

~~~sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;
~~~

| الحتة | معناها |
|---|---|
| [[FROM employees e]] | اقرا الجدول، وسمّي النسخة دي [[e]] (employee) |
| [[LEFT JOIN employees m]] | واقرا نفس الجدول تاني، وسمّيها [[m]] (manager) |
| [[ON m.id = e.manager_id]] | المدير هو الصف اللي الـ id بتاعه = manager_id بتاع الموظف |
| [[e.name AS employee, m.name AS manager]] | العمودين اسمهم [[name]]، فالـ alias هو اللي بيفرّق، و [[AS]] بيدّي النتيجة أسماء واضحة |

~~~text الناتج
 employee | manager
----------+---------
 Mona     |
 Karim    | Mona
 Hany     | Mona
 Nour     | Karim
(4 rows)
~~~

خد Nour: [[e.manager_id = 2]]، فـ Postgres بيدوّر في [[m]] على [[id = 2]]، يلاقي Karim.

### ليه [[LEFT]]؟

نفس الاستعلام بـ [[JOIN]] عادي (INNER):

~~~text الناتج
 employee | manager
----------+---------
 Karim    | Mona
 Hany     | Mona
 Nour     | Karim
(3 rows)
~~~

Mona اختفت: [[manager_id]] بتاعها NULL، فمفيش صف في [[m]] يطابقها، والـ INNER JOIN بيشيل أي صف ملوش شريك. الـ LEFT بيسيبها وبيحط NULL مكان المدير.

### من غير aliases

~~~text SELECT name FROM employees JOIN employees ON employees.id = employees.manager_id;
ERROR:  table name "employees" specified more than once
~~~

Postgres مش هيعرف [[employees.id]] قصدك أنهي نسخة فيهم، فبيرفض. في الـ self join الـ alias إجباري.

---

## ٤. كل مدير وعدد اللي تحته

~~~sql
SELECT m.name AS manager, count(e.id) AS reports
FROM employees m
JOIN employees e ON e.manager_id = m.id
GROUP BY m.name;
~~~

هنا البداية من المدير: [[m]] الأول، و [[e]] هم الموظفين اللي [[manager_id]] بتاعهم = id المدير. كل مدير بيطلع صف لكل موظف تحته، و [[GROUP BY m.name]] بيلمهم، و [[count(e.id)]] بيعدّهم.

~~~text الناتج
 manager | reports
---------+---------
 Karim   |       1
 Mona    |       2
(2 rows)
~~~

Hany و Nour مش ظاهرين لأن محدش تحتهم (INNER JOIN). ولو عايزهم يظهروا بـ 0: [[LEFT JOIN]] و [[count(e.id)]] (مش [[count(*)]]، لأنها بتعدّ صف الـ NULL كواحد).

---

## ٥. والعمق اللي مش معروف؟

الـ JOIN الواحد بيطلع مستوى واحد: الموظف ومديره. مدير المدير محتاج JOIN تالت، ومدير مدير المدير رابع. ولما متعرفش العمق (سلسلة ردود، أو شجرة تصنيفات)، بتستخدم [[WITH RECURSIVE]] (CTE بتنادي نفسها): جزء بيبدأ بصف، وجزء بيتكرر ويعمل نفس الـ self join على نتيجة الخطوة اللي قبلها، لحد ما ميلاقيش صفوف جديدة. التفاصيل في deep، والتمرين اللي تحت عليها.

---

## الخلاصة

| | كل موظف ومديره | كل مدير وعدده |
|---|---|---|
| البداية | [[FROM employees e]] | [[FROM employees m]] |
| الربط | [[ON m.id = e.manager_id]] | [[ON e.manager_id = m.id]] |
| النوع | [[LEFT JOIN]] عشان اللي فوق يظهر | [[JOIN]] + [[GROUP BY]] |

- نفس الجدول مرتين = اسمين مختلفين (aliases)، وده إجباري.
- الـ ON بيحدد الاتجاه: مين بيدوّر على مين.`,
          lines: [
            "جدول الموظفين:",
            "رقم كل موظف،",
            "اسمه،",
            "ومديره: FK بيشاور على نفس الجدول، و NULL للمدير الكبير.",
            "قفلة.",
            "Mona مالهاش مدير، و Karim و Hany تحتها، و Nour تحت Karim.",
            "لكل موظف: اسمه واسم مديره،",
            "e هو الموظف،",
            "و m نفس الجدول بس في دور المدير. LEFT عشان Mona تظهر.",
            "بالترتيب.",
            "لكل مدير: عدد اللي تحته،",
            "m المدير،",
            "و e الموظفين اللي manager_id بتاعهم هو.",
            "مجمّعين بالمدير."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE comments (
  id int PRIMARY KEY,
  body text NOT NULL,
  parent_id int REFERENCES comments (id)
);
INSERT INTO comments VALUES
  (1, 'Great post', NULL),
  (2, 'Typo in line 3', NULL),
  (3, 'Agreed', 1),
  (4, 'Which part?', 1),
  (5, 'The intro', 4),
  (6, 'Fixed, thanks', 2);`,
            starter: R`SELECT r.id, r.body, 0 AS depth
FROM comments r
WHERE r.id = 5;`,
            expect: [[5,"The intro",0], [4,"Which part?",1], [1,"Great post",2]],
            solution: R`WITH RECURSIVE chain AS (
  SELECT id, body, parent_id, 0 AS depth FROM comments WHERE id = 5
  UNION ALL
  SELECT c.id, c.body, c.parent_id, chain.depth + 1
  FROM comments c
  JOIN chain ON c.id = chain.parent_id
)
SELECT id, body, depth FROM chain ORDER BY depth;`,
            ordered: true
          }
        },
        {
          cmd: "UNION و UNION ALL",
          title: "activity feed من كذا جدول في قايمة واحدة",
          desc: R`JOIN بيحط أعمدة جنب بعض، و [[UNION]] بيحط صفوف تحت بعض: نتيجة استعلامين (أو أكتر) في قايمة واحدة. الشرط إن الاستعلامات ترجّع نفس عدد الأعمدة وبأنواع متوافقة وبنفس الترتيب.

[[UNION ALL]] بيحطهم زي ما هم. [[UNION]] من غير ALL بيشيل الصفوف المتكررة، وده معناه sort أو hash على النتيجة كلها. لو عارف إن مفيش تكرار، أو التكرار مش فارق، استخدم UNION ALL دايمًا.

المثال المشهور: «النشاط الأخير» لليوزر، أوردرات وتسجيل ومراجعات من جداول مختلفة، في feed واحد مترتب بالوقت.`,
          example: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'you@example.com'
ORDER BY created_at DESC
LIMIT 10;
SELECT status FROM orders UNION SELECT 'refunded';
SELECT status FROM orders UNION ALL SELECT 'refunded';
SELECT email FROM users
EXCEPT
SELECT u.email FROM users u JOIN orders o ON o.user_id = u.id;
SELECT id FROM orders UNION SELECT email FROM users;`,
          try: R`ضيف للـ feed نوع تالت: كل بند اتضاف في أوردر من أوردرات اليوزر ده (من order_items)، بنص زي [[Mug x2]]. وخلّي الـ feed يرجّع آخر ٥ أحداث بس. وبعدين بدّل UNION ALL بـ UNION وشوف لو النتيجة اتغيرت، وفكّر ليه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الـ feed بتاع [[sara@example.com]] بتلات أنواع: [['signup']] بالإيميل، و [['order']] برقم الأوردر كنص، و [['item']] بنص زي [[Mug x2]] ووقت الأوردر بتاعه. التلات أعمدة: [[kind]] و [[ref]] و [[created_at]]، والترتيب مش مهم.`,
          sol: R`هتضيف استعلام تالت بـ UNION ALL فيه نفس التلات أعمدة بنفس الترتيب: [['item']] كـ kind، و [[p.name || ' x' || oi.quantity]] كـ ref، و [[o.created_at]] كوقت (order_items ملوش وقت خاص بيه، فبتاخد وقت الأوردر). الـ ORDER BY و LIMIT بيتكتبوا مرة واحدة في الآخر وبيتطبقوا على النتيجة كلها.

لو بدّلت لـ UNION غالبًا النتيجة مش هتتغير، لأن مفيش صفين متطابقين في كل الأعمدة. بس Postgres عمل شغل زيادة يدوّر على تكرار مش موجود. ولو فيه منتج اتضاف مرتين بنفس الكمية في نفس الأوردر (مش ممكن هنا عشان الـ PRIMARY KEY)، UNION كان هيشيل واحد منهم من غير ما تاخد بالك.

لو الـ error هو [[each UNION query must have the same number of columns]] يبقى عدد الأعمدة مختلف. ولو [[UNION types bigint and text cannot be matched]] يبقى محتاج [[::text]] على الـ id.`,
          solCode: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'you@example.com'
UNION ALL
SELECT 'item', p.name || ' x' || oi.quantity, o.created_at
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC
LIMIT 5;`,
          flag: "script",
          deep: {
            why: "لوحة اليوزر («آخر نشاط»)، وسجل التغييرات في لوحة الأدمن، وبحث واحد بيدوّر في المنتجات والتصنيفات مع بعض، وتقرير بيجمع جدولين نفس الشكل (أوردرات السنة دي وأرشيف السنة اللي فاتت). من غير UNION بتعمل استعلامين وتدمجهم وترتبهم في JavaScript، وده أصعب لما يبقى فيه pagination.",
            how: R`أسماء الأعمدة بتيجي من أول استعلام بس، فحط الـ [[AS]] هناك. الأنواع لازم تتوافق عمود بعمود، ولو مش متوافقة حوّل بـ [[::text]].

[[ORDER BY]] و [[LIMIT]] في الآخر بيتطبقوا على النتيجة المدموجة كلها. لو عايز ترتب أو تحدد جوه جزء واحد بس، حطه بين قوسين: [[(SELECT ... ORDER BY ... LIMIT 5) UNION ALL (...)]].

[[UNION]] = [[UNION ALL]] + إزالة تكرار، والإزالة بتعدّي على النتيجة كلها. [[INTERSECT]] بيرجّع اللي موجود في الاتنين، و [[EXCEPT]] بيرجّع اللي في الأول ومش في التاني (زي «يوزرز معملوش أوردرات»، مع إن [[NOT EXISTS]] غالبًا أوضح).

في feed كبير بـ pagination: خلّي كل جزء يرجّع [[LIMIT]] بتاعه بعد ما يترتب بالوقت (مفيش جزء محتاج يرجّع أكتر من حجم الصفحة)، وبعدين ادمج ورتّب وخد الصفحة. ولو الـ feed ده بيتقري كتير جدًا، فيه تصميم تاني: جدول [[activities]] واحد بيتكتب فيه كل حدث وقت ما يحصل (بـ trigger أو من الكود).`,
            when: "feeds وسجلات نشاط، وبحث في كذا جدول، ودمج جداول نفس الشكل، وإضافة صف «إجمالي» تحت تقرير. أما لو عايز أعمدة من جدول جنب أعمدة من جدول تاني، ده JOIN مش UNION.",
            mistakes: R`UNION من غير ALL على نتايج كبيرة فيبطأ على الفاضي، أو بيشيل صفوف حقيقية متطابقة (زي بندين بنفس القيمة). عدد أعمدة أو ترتيب مختلف فتلاقي الإيميل في عمود التاريخ. ORDER BY جوه جزء من غير أقواس. وفي الانترفيو: «إيه الفرق بين UNION و UNION ALL؟» الإجابة: ALL بيحتفظ بالتكرار ومش بيعمل sort أو hash، فأسرع.`
          },
          teach: R`## الفكرة: نتيجتين تحت بعض في جدول واحد

[[JOIN]] بيحط أعمدة جنب أعمدة. [[UNION]] بيحط **صفوف تحت صفوف**: بيشغّل كذا SELECT ويلزق نتايجهم في قايمة واحدة. المثال فيه ٤ استخدامات: feed نشاط من جدولين، والفرق بين [[UNION]] و [[UNION ALL]]، و [[EXCEPT]]، و error الأنواع.

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker، على lab المتجر (اليوزر [[you@example.com]] وأوردراته الـ ٢٠٠ ألف). وضفنا يوزر تاني [[new@example.com]] من غير أوردرات عشان [[EXCEPT]] يبقى ليه نتيجة.

---

## ١. الـ feed: جزء الأوردرات

~~~sql
SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
~~~

| العمود | منين | ليه كده |
|---|---|---|
| [['order']] [[AS kind]] | نص ثابت | كل صف يقول هو حدث من أنهي نوع |
| [[id::text]] [[AS ref]] | id الأوردر محوّل نص | عشان يتلزق تحت الإيميل (نص) في نفس العمود |
| [[created_at]] | وقت الأوردر | عشان نرتب الكل بالوقت |

و [[(SELECT id FROM users WHERE email = ...)]] بيجيب الـ uuid بتاع اليوزر من إيميله.

## ٢. [[UNION ALL]] وجزء التسجيل

~~~sql
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'you@example.com'
~~~

نفس التلات أعمدة **بنفس الترتيب**: نوع، ونص، ووقت. الأسماء مش مكتوبة هنا لأن أسماء أعمدة النتيجة بتيجي من أول SELECT بس ([[kind]] و [[ref]] و [[created_at]]).

## ٣. [[ORDER BY created_at DESC LIMIT 10]]

مكتوبين مرة واحدة في الآخر، وبيتطبقوا على **النتيجة المدموجة كلها**، مش على الجزء التاني بس.

~~~text الناتج
  kind  |       ref       |          created_at
--------+-----------------+-------------------------------
 order  | 2               | 2026-10-07 08:35:01.394661+00
 signup | you@example.com | 2026-10-07 08:35:01.365726+00
 order  | 6680            | 2026-10-07 08:34:33.908094+00
 order  | 148010          | 2026-10-07 08:20:13.601142+00
...
(10 rows)
~~~

حدث التسجيل اتحط في مكانه بالوقت وسط الأوردرات، لأن الترتيب على الكل.

---

## ٤. [[UNION]] ولا [[UNION ALL]]؟

~~~sql
SELECT status FROM orders UNION SELECT 'refunded';
~~~

~~~text الناتج
  status
----------
 refunded
 pending
 paid
(3 rows)
~~~

٢٠٠ ألف حالة دخلت، وطلع ٣ صفوف: [[UNION]] من غير ALL بيشيل أي صف مكرر (زي [[DISTINCT]] على النتيجة كلها). ولاحظ الترتيب عشوائي: من غير ORDER BY مفيش ترتيب مضمون.

~~~sql
SELECT status FROM orders UNION ALL SELECT 'refunded';
~~~

ده رجّع **200002** صف (عدّيناهم بـ [[count(*)]]): كل الحالات زي ما هي، والمتكرر يتكرر، و [['refunded']] في الآخر.

وإزالة التكرار ليها تمن. خطة الـ UNION:

~~~text EXPLAIN SELECT status FROM orders UNION SELECT 'refunded';
 HashAggregate  (cost=20307.68..25042.11 rows=200002 width=32)
   Group Key: orders.status
   Planned Partitions: 4
   ->  Append  (cost=0.00..4870.03 rows=200002 width=32)
         ->  Seq Scan on orders  (cost=0.00..3870.01 rows=200001 width=5)
         ->  Result  (cost=0.00..0.01 rows=1 width=32)
~~~

- [[Append]]: لزق النتيجتين تحت بعض. ده كل اللي [[UNION ALL]] بيعمله.
- [[HashAggregate]] فوقه: جدول hash على النتيجة كلها عشان يلاقي التكرار. ده الشغل الزيادة بتاع [[UNION]].

فالقاعدة: [[UNION ALL]] دايمًا، إلا لو عايز تشيل التكرار فعلًا.

---

## ٥. [[EXCEPT]]: اللي في الأول ومش في التاني

~~~sql
SELECT email FROM users
EXCEPT
SELECT u.email FROM users u JOIN orders o ON o.user_id = u.id;
~~~

الأول: كل الإيميلات. التاني: إيميلات اللي ليهم أوردر (الـ JOIN بيطلع صف لكل أوردر). [[EXCEPT]] بيطرح التاني من الأول (وبيشيل التكرار برضه):

~~~text الناتج
      email
-----------------
 new@example.com
(1 row)
~~~

اليوزر الوحيد اللي معملش أوردرات. وأخوه [[INTERSECT]] بيرجّع اللي موجود في الاتنين.

---

## ٦. الأخطاء

### أنواع مش متوافقة

~~~text SELECT id FROM orders UNION SELECT email FROM users;
ERROR:  UNION types bigint and text cannot be matched
LINE 1: SELECT id FROM orders UNION SELECT email FROM users;
                                           ^
~~~

العمود الأول في الجزء الأول [[bigint]] وفي التاني [[text]]، و Postgres مش هيحوّل لوحده. وده سبب [[id::text]] في الـ feed. (والـ error بيذكر نوع الجزء الأول الأول.)

### عدد أعمدة مختلف

~~~text SELECT 'order', id FROM orders UNION ALL SELECT 'signup' FROM users;
ERROR:  each UNION query must have the same number of columns
~~~

---

## الخلاصة

| العملية | بترجّع | بتشيل التكرار؟ |
|---|---|---|
| [[UNION ALL]] | الأول + التاني زي ما هم | لأ، وأسرع |
| [[UNION]] | الأول + التاني | أيوه (HashAggregate أو Sort) |
| [[EXCEPT]] | اللي في الأول ومش في التاني | أيوه |
| [[INTERSECT]] | اللي في الاتنين | أيوه |

- نفس عدد الأعمدة، بنفس الترتيب، وبأنواع متوافقة ([[::text]] لو لأ).
- أسماء الأعمدة من أول SELECT، و [[ORDER BY]] و [[LIMIT]] في الآخر على الكل.`,
          lines: [
            "أوردرات اليوزر كأحداث: نوع ثابت، والـ id كنص، والوقت.",
            "أوردرات اليوزر ده بس.",
            "وتحتهم:",
            "حدث التسجيل: نفس التلات أعمدة بنفس الترتيب.",
            "من جدول اليوزرز.",
            "الترتيب على النتيجة كلها: الأحدث الأول،",
            "وآخر ١٠ أحداث.",
            "الحالات من غير تكرار، ومعاها refunded (UNION شال التكرار).",
            "نفس الحاجة بـ ALL: كل الصفوف زي ما هي، والمتكرر يتكرر.",
            "كل الإيميلات،",
            "ناقص",
            "إيميلات اللي عملوا أوردرات: اللي فاضل معملش ولا أوردر.",
            "error: الأنواع مش متوافقة (bigint و text)."
          ],
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
            starter: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'sara@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'sara@example.com';`,
            expectSql: R`SELECT 'order', id::text, created_at FROM orders WHERE user_id = 1
UNION ALL SELECT 'signup', email, created_at FROM users WHERE id = 1
UNION ALL SELECT 'item', p.name || ' x' || oi.quantity, o.created_at FROM order_items oi JOIN orders o ON o.id = oi.order_id JOIN products p ON p.id = oi.product_id WHERE o.user_id = 1;`,
            solution: R`SELECT 'order' AS kind, id::text AS ref, created_at
FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'sara@example.com')
UNION ALL
SELECT 'signup', email, created_at
FROM users WHERE email = 'sara@example.com'
UNION ALL
SELECT 'item', p.name || ' x' || oi.quantity, o.created_at
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.user_id = (SELECT id FROM users WHERE email = 'sara@example.com');`
          }
        },
        {
          cmd: "json_agg",
          title: "الأوردر وبنوده في صف واحد جاهز للـ API",
          desc: R`الـ JOIN بين orders و order_items بيرجّع صف لكل بند، فالأوردر اللي فيه ٣ منتجات بيطلع ٣ صفوف والبيانات بتاعته متكررة. والـ API عايز object واحد للأوردر وجواه array البنود.

[[json_agg]] بيجمّع صفوف المجموعة في JSON array، و [[json_build_object]] بيعمل object من أزواج اسم وقيمة. مع [[GROUP BY o.id]] بيطلع صف واحد لكل أوردر وفيه عمود [[items]] جاهز.

وفيه أخوات: [[array_agg]] بيجمّع في array بتاع Postgres ([[{1,2}]])، و [[string_agg(name, ', ')]] بيجمّع في نص واحد مفصول بفاصل، مفيد في التقارير والـ CSV.`,
          example: R`SELECT o.id, o.total,
       json_agg(json_build_object('product', p.name, 'qty', oi.quantity, 'price', oi.unit_price)
                ORDER BY p.name) AS items
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
WHERE o.id = (SELECT min(order_id) FROM order_items)
GROUP BY o.id;
SELECT o.id, string_agg(p.name, ', ' ORDER BY p.name) AS products,
       array_agg(p.id ORDER BY p.id) AS product_ids
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
GROUP BY o.id ORDER BY o.id;
SELECT u.email,
       COALESCE(json_agg(o.id) FILTER (WHERE o.id IS NOT NULL), '[]') AS order_ids
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.email;`,
          try: R`اكتب استعلام يرجّع لكل يوزر (حتى اللي معملش أوردرات): الإيميل، و [[orders]] كـ JSON array، كل عنصر فيه id الأوردر وحالته والـ total. شغّله الأول من غير [[FILTER]] وشوف اليوزر اللي ملوش أوردرات بيطلع عنده إيه. وبعدين استدعيه من Node بـ [[pg]] واطبع [[typeof rows[0].orders]] و [[typeof]] الـ total جوه أول عنصر.`,
          sol: R`من غير FILTER، اليوزر اللي ملوش أوردرات هيطلع عنده [[[{"id" : null, "status" : null, "total" : null}]]] مش [[[]]]: الـ LEFT JOIN رجّع له صف واحد كل أعمدة orders فيه NULL، و json_agg جمّع الصف ده. الحل [[FILTER (WHERE o.id IS NOT NULL)]] ولفّه بـ [[COALESCE(..., '[]')]] لأن json_agg على صفر صفوف بيرجّع NULL مش array فاضي.

من Node: [[typeof rows[0].orders]] هيطلع [['object']] (array)، لأن [[pg]] بيعمل parse لأعمدة json و jsonb لوحده. و [[total]] جوه الـ JSON هيطلع [['number']]، مش string زي ما [[numeric]] بيرجع لما يكون عمود عادي. يعني [[250.00]] بقى [[250]]، ولو الرقم فيه كسور كتير ممكن يتقرّب. لو ده فارق معاك (فلوس)، حوّله نص جوه SQL: [['total', o.total::text]].`,
          solCode: R`SELECT u.email,
       COALESCE(
         json_agg(json_build_object('id', o.id, 'status', o.status, 'total', o.total)
                  ORDER BY o.created_at DESC)
           FILTER (WHERE o.id IS NOT NULL),
         '[]'
       ) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.email;

// check.mjs
import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await pool.query(
  "SELECT u.email, COALESCE(json_agg(json_build_object('id', o.id, 'total', o.total)) FILTER (WHERE o.id IS NOT NULL), '[]') AS orders FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.email"
);
console.log(typeof rows[0].orders, Array.isArray(rows[0].orders), typeof rows.find(r => r.orders.length)?.orders[0].total);
await pool.end();`,
          flag: "script",
          deep: {
            why: "من غير json_agg عندك طريقتين وحشين: استعلام للأوردرات وبعدين استعلام لبنود كل أوردر (N+1)، أو JOIN يرجّع صفوف متكررة وتقعد تجمّعها في JavaScript بـ reduce. json_agg بيخلّي القاعدة تسلّمك الشكل النهائي في رحلة واحدة، وده نفس اللي Supabase (PostgREST) و Prisma في بعض الحالات بيعملوه من جوه.",
            how: R`[[json_agg(قيمة ORDER BY ...)]] بيحترم ترتيب انت بتحدده، ومن غير ORDER BY الترتيب مش مضمون.

[[json_build_object('key', value, ...)]] بياخد أزواج. و [[to_jsonb(p)]] بيحوّل الصف كله لـ object، و [[to_jsonb(p) - 'attrs']] بيشيل منه مفتاح.

[[json]] ولا [[jsonb]]: [[json_agg]] بيحافظ على ترتيب المفاتيح زي ما كتبتها، و [[jsonb_agg]] بيعيد ترتيبها وبيشيل التكرار. للرد على الـ API غالبًا json_agg كفاية.

مع [[LEFT JOIN]]: اليوزر اللي ملوش أوردرات بيطلع [[[null]]] أو object كل قيمه null. [[FILTER (WHERE ... IS NOT NULL)]] بيشيل الصف ده، و [[COALESCE(..., '[]')]] بيحوّل NULL لـ array فاضي.

تحويل الأنواع: الـ uuid والتواريخ بيتحولوا نصوص في JSON (التواريخ ISO)، و numeric بيتحول رقم JSON، فلما [[pg]] يعمل parse بيبقى JavaScript number (float). ده عكس العمود العادي اللي [[pg]] بيرجّعه string عشان ميضيعش دقة.

[[array_agg]] بيرجّع Postgres array، والـ driver بيحوّله JavaScript array. [[string_agg(x, ', ' ORDER BY x)]] للعرض. ولو عندك مستويين (أوردرات وجوا كل أوردر بنوده) استخدم subquery أو LATERAL لكل مستوى بدل GROUP BY واحد كبير.`,
            when: "endpoints بترجّع object ومعاه أولاده (أوردر وبنوده، بوست وتاجاته)، والتقارير اللي محتاجة «كل المنتجات في خانة واحدة»، وأي مكان بتعمل فيه reduce على صفوف JOIN في الكود.",
            mistakes: R`[[[null]]] لليوزرز اللي من غير أولاد. تنسى ORDER BY جوه json_agg فالبنود ترجع بترتيب عشوائي. الفلوس جوه JSON بقت float. [[GROUP BY o.id]] وبتختار عمود من جدول تاني مش بيعتمد على o.id فتاخد error. و json_agg على مئات الآلاف من الصفوف في صف واحد فيعمل رد ضخم بدل pagination.`
          },
          teach: R`## الفكرة: لمّ صفوف البنود في خانة واحدة

[[count]] و [[sum]] بيلمّوا المجموعة في رقم. [[json_agg]] و [[array_agg]] و [[string_agg]] بيلمّوها في **قايمة**: JSON array، أو Postgres array، أو نص مفصول بفواصل. فالأوردر اللي فيه ٣ بنود يطلع صف واحد جواه بنوده، جاهز يترجع من الـ API.

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker، على lab المتجر. الأوردر 5 فيه ٣ بنود (Mug و Hoodie و T-shirt)، والأوردر 6 فيه بند واحد.

---

## ١. المشكلة: الـ JOIN العادي

~~~text JOIN من غير تجميع
 id |  total  |  name   | quantity | unit_price
----+---------+---------+----------+------------
  5 | 2160.00 | Mug     |        1 |     110.00
  5 | 2160.00 | Hoodie  |        2 |     650.00
  5 | 2160.00 | T-shirt |        3 |     250.00
~~~

٣ صفوف، والـ [[id]] والـ [[total]] متكررين. الـ API عايز object واحد للأوردر وجواه array البنود.

---

## ٢. الاستعلام الأول، من جوه لبرة

### [[json_build_object('product', p.name, 'qty', oi.quantity, 'price', oi.unit_price)]]

بياخد أزواج: اسم المفتاح (نص) وبعده القيمة، ويعمل JSON object واحد للصف:

~~~text الناتج لصف واحد
 {"product" : "Mug", "qty" : 1, "price" : 110.00}
~~~

### [[json_agg(... ORDER BY p.name)]]

aggregate زي [[sum]]: بياخد الـ object من كل صف في المجموعة ويحطهم في JSON array واحد. و [[ORDER BY p.name]] **جوه** القوسين بيرتّب العناصر جوه الـ array (من غيره الترتيب مش مضمون).

### [[FROM ... JOIN ... JOIN ...]]

[[orders o]] مع [[order_items oi]] (بنود الأوردر) مع [[products p]] (اسم كل منتج). نفس JOIN درس INNER JOIN.

### [[WHERE o.id = (SELECT min(order_id) FROM order_items)]]

أوردر واحد: أصغر رقم أوردر ليه بنود. (الأوردر 1 من الدروس الأولى اتمسح في درس ON DELETE، فلو كتبت [[o.id = 1]] مش هيرجع حاجة.)

### [[GROUP BY o.id]]

صف واحد لكل أوردر. و [[o.total]] مسموح في الـ SELECT من غير aggregate لأن [[o.id]] هو الـ primary key: Postgres عارف إن كل أعمدة [[orders]] ليها قيمة واحدة لكل id.

~~~text الناتج
 id |  total  |                                                                             items
----+---------+---------------------------------------------------------------------------------------------------------------------------------------------------------------
  5 | 2160.00 | [{"product" : "Hoodie", "qty" : 2, "price" : 650.00}, {"product" : "Mug", "qty" : 1, "price" : 110.00}, {"product" : "T-shirt", "qty" : 3, "price" : 250.00}]
(1 row)
~~~

صف واحد، والبنود مترتبة بالاسم (Hoodie ثم Mug ثم T-shirt).

لكن عمود من جدول تاني مش جوه aggregate:

~~~text SELECT o.id, p.name, json_agg(oi.quantity) ... GROUP BY o.id;
ERROR:  column "p.name" must appear in the GROUP BY clause or be used in an aggregate function
~~~

الأوردر فيه ٣ أسماء، فـ Postgres مش عارف يحط أنهي واحد.

---

## ٣. [[string_agg]] و [[array_agg]]

~~~sql
SELECT o.id, string_agg(p.name, ', ' ORDER BY p.name) AS products,
       array_agg(p.id ORDER BY p.id) AS product_ids
...
GROUP BY o.id ORDER BY o.id;
~~~

~~~text الناتج
 id |       products       | product_ids
----+----------------------+-------------
  5 | Hoodie, Mug, T-shirt | {1,2,4}
  6 | T-shirt              | {1}
~~~

| الدالة | الناتج | شكله |
|---|---|---|
| [[string_agg(p.name, ', ' ORDER BY p.name)]] | نص واحد، و [[', ']] الفاصل بين القيم | [[Hoodie, Mug, T-shirt]] |
| [[array_agg(p.id ORDER BY p.id)]] | Postgres array (بيتكتب بـ [[{}]]) | [[{1,2,4}]] |

---

## ٤. اليوزر اللي ملوش أولاد: [[FILTER]] و [[COALESCE]]

~~~sql
SELECT u.email,
       COALESCE(json_agg(o.id) FILTER (WHERE o.id IS NOT NULL), '[]') AS order_ids
FROM users u LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.email;
~~~

في الـ lab اليوزر [[you@example.com]] عنده ٢٠٠ ألف أوردر، فعشان الناتج يتقري زودنا [[AND o.id < 10]] على الـ ON. وفيه يوزر [[new@example.com]] من غير أوردرات.

### من غير FILTER الأول

~~~text json_agg(o.id) بس
      email      |       order_ids
-----------------+-----------------------
 new@example.com | [null]
 you@example.com | [2, 4, 5, 6, 7, 8, 9]
~~~

[[[null]]] مش [[[]]]: الـ [[LEFT JOIN]] بيرجّع لليوزر اللي ملوش أوردرات صف واحد كل أعمدة orders فيه NULL، و json_agg جمّع الـ NULL ده.

### الحل خطوتين

1. [[FILTER (WHERE o.id IS NOT NULL)]]: بعد أي aggregate، بيقول «متدخلش في الحساب غير الصفوف دي». فالصف الـ NULL مبيدخلش.
2. بس json_agg على **صفر** صفوف بيرجّع NULL مش array فاضي:

~~~text SELECT json_agg(x) FROM generate_series(1,0) x;
 json_agg
----------

~~~

فـ [[COALESCE(..., '[]')]] بياخد أول قيمة مش NULL: لو الـ json_agg رجّع NULL، خد [['[]']].

~~~text الناتج
      email      |       order_ids
-----------------+-----------------------
 new@example.com | []
 you@example.com | [2, 4, 5, 6, 7, 8, 9]
~~~

---

## ٥. اللي بيوصل لـ JavaScript

نفس الاستعلام الأول من Node بمكتبة [[pg]] (على [[node:22-slim]]):

~~~text الناتج
{
  id: '5',
  total: '2160.00',
  items: [
    { product: 'Hoodie', qty: 2, price: 650 },
    { product: 'Mug', qty: 1, price: 110 },
    { product: 'T-shirt', qty: 3, price: 250 }
  ],
  product_ids: [ '1', '2', '4' ]
}
string object true number true
~~~

| العمود | النوع في JS | ليه |
|---|---|---|
| [[id]] | [['5']] string | [[bigint]]: [[pg]] بيرجّعه نص عشان الدقة |
| [[total]] | [['2160.00']] string | [[numeric]] عمود عادي: نص عشان الدقة |
| [[items]] | array جاهز | [[pg]] بيعمل parse للـ json لوحده |
| [[price]] جوه items | [[650]] number | جوه JSON بقى رقم JSON، فالدقة والـ [[.00]] راحوا |
| [[product_ids]] | array فيه strings | [[array_agg]] بقى JS array، والعناصر [[bigint]] فنصوص |

---

## الخلاصة

| عايز | استخدم |
|---|---|
| array of objects للـ API | [[json_agg(json_build_object(...) ORDER BY ...)]] |
| نص للعرض أو CSV | [[string_agg(x, ', ' ORDER BY x)]] |
| array أرقام | [[array_agg(x)]] |
| [[[]]] بدل [[[null]]] مع LEFT JOIN | [[COALESCE(json_agg(...) FILTER (WHERE ... IS NOT NULL), '[]')]] |

- [[ORDER BY]] جوه الـ aggregate هو اللي بيرتّب العناصر.
- الفلوس جوه JSON بتبقى number في JS؛ لو فارقة، [[o.total::text]].`,
          lines: [
            "لكل أوردر: رقمه والـ total،",
            "وكل بنوده كـ JSON array، كل بند object فيه المنتج والكمية والسعر،",
            "مترتبين بالاسم.",
            "من الأوردرات،",
            "مع بنودها،",
            "ومنتجاتها.",
            "أوردر واحد: أول أوردر ليه بنود (الأوردر 1 اتمسح في درس ON DELETE).",
            "صف واحد لكل أوردر.",
            "أسماء المنتجات في نص واحد بفاصلة،",
            "وأرقامها في array.",
            "من الأوردرات،",
            "مع البنود،",
            "والمنتجات.",
            "لكل أوردر.",
            "كل يوزر،",
            "وأرقام أوردراته كـ array، و [] بدل [null] لليوزر اللي ملوش.",
            "LEFT عشان اليوزر من غير أوردرات يظهر.",
            "صف لكل يوزر."
          ]
        },
        {
          cmd: "LATERAL",
          title: "آخر ٣ أوردرات لكل يوزر",
          desc: R`subquery عادية في FROM مش بتقدر تشوف أعمدة الجداول اللي قبلها. [[LATERAL]] بيسمح لها تشوفهم، فتبقى زي loop: لكل يوزر، شغّل الاستعلام ده بالـ id بتاعه.

وده بيحل «أعلى N لكل مجموعة» بشكل مباشر: لكل يوزر، هات أوردراته مترتبة بالأحدث و [[LIMIT 3]]. ومع index على [[(user_id, created_at DESC)]] كل لفة بتقرا ٣ صفوف من الـ index وتقف.

[[CROSS JOIN LATERAL]] بيشيل اليوزر اللي ملوش نتيجة (زي INNER JOIN)، و [[LEFT JOIN LATERAL ... ON true]] بيسيبه بقيم NULL.`,
          example: R`SELECT u.name, o.id, o.total, o.created_at
FROM users u
CROSS JOIN LATERAL (
  SELECT id, total, created_at FROM orders
  WHERE user_id = u.id
  ORDER BY created_at DESC
  LIMIT 3
) o
ORDER BY u.name, o.created_at DESC;
SELECT u.name, last.id AS last_order, last.created_at
FROM users u
LEFT JOIN LATERAL (
  SELECT id, created_at FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1
) last ON true
ORDER BY u.name;`,
          try: R`اكتب «أغلى منتجين في كل أوردر» بـ LATERAL (من order_items و products)، مرة بـ CROSS JOIN ومرة بـ LEFT JOIN، وقارن عدد الصفوف لو فيه أوردر من غير بنود. وبعدين حط [[EXPLAIN]] قدام الاستعلام الأول في المثال، واعمل index على [[orders (user_id, created_at DESC)]] (لو مش موجود من درس composite index) وشوف الـ plan اتغير إزاي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: أغلى بندين في كل أوردر: [[order_id]] واسم المنتج و [[unit_price]]، والأوردر اللي ملوش بنود يطلع مرة واحدة بـ NULL (يعني LEFT JOIN LATERAL).`,
          sol: R`الـ LATERAL هنا بيلف على الأوردرات: [[FROM orders o CROSS JOIN LATERAL (SELECT ... FROM order_items oi JOIN products p ... WHERE oi.order_id = o.id ORDER BY oi.unit_price DESC LIMIT 2) top]]. الأوردر اللي فيه بند واحد هيطلع صف واحد، واللي فيه ٣ هيطلع أغلى ٢ بس.

الأوردر اللي من غير بنود هيختفي مع CROSS JOIN، ويظهر مرة واحدة بقيم NULL مع [[LEFT JOIN LATERAL ... ON true]]. فعدد الصفوف في LEFT هيبقى أكبر بعدد الأوردرات الفاضية.

في الـ EXPLAIN من غير index هتلاقي [[Nested Loop]] وجواه لكل يوزر [[Seq Scan on orders]] و [[Sort]]، يعني بيقرا جدول الأوردرات كله مرة لكل يوزر. بعد الـ index هتلاقي [[Index Scan using ...]] من غير Sort، لأن الـ index مترتب أصلًا. على جدول صغير ممكن Postgres يفضل الـ Seq Scan عشان أرخص، فجرّب بعد ما تضيف الـ ٢٠٠ ألف صف من درس B-tree index.`,
          solCode: R`SELECT o.id AS order_id, top.name, top.unit_price
FROM orders o
LEFT JOIN LATERAL (
  SELECT p.name, oi.unit_price
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  WHERE oi.order_id = o.id
  ORDER BY oi.unit_price DESC
  LIMIT 2
) top ON true
ORDER BY o.id, top.unit_price DESC;

EXPLAIN SELECT u.name, o.id FROM users u
CROSS JOIN LATERAL (
  SELECT id FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 3
) o;`,
          flag: "script",
          deep: {
            why: "«آخر ٣ أوردرات لكل يوزر» و «أحدث رسالة في كل محادثة» و «أغلى منتجين في كل تصنيف» بتتسأل كتير. ROW_NUMBER (درس window functions) بيحلها، بس بيرقّم كل الصفوف وبعدين يفلتر. LATERAL مع LIMIT بيقف بدري، فلما كل يوزر عنده آلاف الأوردرات وانت عايز ٣ بس، الفرق كبير.",
            how: R`Postgres بينفّذ الـ LATERAL كـ Nested Loop: لكل صف من الجدول الشمال، بيشغّل الـ subquery بقيم الصف ده. ومع index مركّب على [[(user_id, created_at DESC)]]، كل تشغيل بيبقى Index Scan بيقرا أول ٣ entries ويقف.

ليه مش subquery في SELECT؟ [[(SELECT id FROM orders WHERE ... LIMIT 1)]] في الـ SELECT بيرجّع قيمة واحدة بس. لو عايز عمودين أو ٣ صفوف هتاخد [[subquery must return only one column]] أو [[more than one row returned by a subquery]]. الـ LATERAL بيرجّع جدول كامل.

[[LEFT JOIN LATERAL (...) x ON true]]: الـ ON لازم يتكتب مع LEFT JOIN، و true معناها «مفيش شرط إضافي، الشرط جوه الـ subquery».

LATERAL ولا ROW_NUMBER؟ ROW_NUMBER أبسط لما تكون عايز معظم الصفوف أو الجدول صغير. LATERAL أسرع لما N صغير والمجموعات كبيرة، وفيه index مناسب. و [[DISTINCT ON]] لما N = 1 بس.

وده بالظبط اللي Prisma بيحتاجه لما تكتب [[include: { orders: { take: 3, orderBy: ... } }]]: مش كل الـ ORMs بتطلّع LATERAL، فلو الـ query بطيء اكتبه بـ $queryRaw.`,
            when: "top-N لكل مجموعة، وأحدث صف لكل حاجة، ولما محتاج كذا عمود من subquery مربوطة بالصف اللي برّه، وكمان مع دوال بترجّع جداول زي [[jsonb_array_elements]] و [[generate_series]].",
            mistakes: R`CROSS JOIN LATERAL لما عايز اليوزرز اللي من غير أوردرات يظهروا. من غير index على (user_id, created_at) فكل لفة Seq Scan وSort، وده أبطأ من ROW_NUMBER. ORDER BY برّه بس فالـ LIMIT جوه بياخد ٣ عشوائيين. وتعمل ده في الكود: loop على اليوزرز وفي كل لفة query، وده N+1.`
          },
          teach: R`## الفكرة: subquery بتتشغّل مرة لكل صف، وشايفة الصف ده

المثال بيجيب «آخر ٣ أوردرات لكل يوزر» و «آخر أوردر لكل يوزر». الطريقة: لكل يوزر في [[users]]، شغّل استعلام صغير على [[orders]] بالـ id بتاعه، و [[LATERAL]] هي الكلمة اللي بتسمح للاستعلام الصغير يشوف [[u.id]].

الناتج تحت حقيقي من psql على [[postgres:18]] في Docker، على lab المتجر: يوزرين، Ali (الإيميل [[you@example.com]]، ليه ٢٠٠ ألف أوردر) و Sara (من غير أوردرات)، وعلى [[orders]] الـ index [[orders_user_created_idx]] على [[(user_id, created_at DESC)]] من درس composite index.

---

## ١. ليه مش subquery عادية؟

نفس الفكرة من غير [[LATERAL]]:

~~~sql
SELECT u.name, o.id FROM users u
CROSS JOIN (SELECT id FROM orders WHERE user_id = u.id LIMIT 3) o;
~~~

~~~text الناتج
ERROR:  invalid reference to FROM-clause entry for table "u"
DETAIL:  There is an entry for table "u", but it cannot be referenced from this part of the query.
HINT:  To reference that table, you must mark this subquery with LATERAL.
~~~

الـ subquery العادية في [[FROM]] بتتحسب لوحدها، كأنها جدول مستقل، فمش شايفة [[u]] اللي جنبها. والـ [[HINT]] بيقولك الحل بالظبط.

وفي [[SELECT]] (scalar subquery) هتتشاف [[u]]، بس لازم ترجّع قيمة واحدة:

~~~text الناتج
... (SELECT id FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 3) ...
ERROR:  more than one row returned by a subquery used as an expression

... (SELECT id, total FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) ...
ERROR:  subquery must return only one column
~~~

[[LATERAL]] بيجمع الاتنين: شايفة الصف اللي برّه، وبترجّع جدول كامل (كذا صف وكذا عمود).

---

## ٢. الاستعلام الأول: [[CROSS JOIN LATERAL]]

~~~sql
SELECT u.name, o.id, o.total, o.created_at
FROM users u
CROSS JOIN LATERAL (
  SELECT id, total, created_at FROM orders
  WHERE user_id = u.id
  ORDER BY created_at DESC
  LIMIT 3
) o
ORDER BY u.name, o.created_at DESC;
~~~

| الحتة | معناها |
|---|---|
| [[FROM users u]] | لفّ على اليوزرز |
| [[CROSS JOIN]] | اربط كل يوزر بكل صف طالع من اللي بعده، من غير شرط ON |
| [[LATERAL (...)]] | الـ subquery دي تتشغّل مرة **لكل يوزر**، وتقدر تستخدم [[u]] |
| [[WHERE user_id = u.id]] | أوردرات اليوزر ده بس |
| [[ORDER BY created_at DESC LIMIT 3]] | الأحدث، و ٣ بس |
| [[) o]] | اسم النتيجة، عشان نكتب [[o.id]] و [[o.total]] |
| [[ORDER BY u.name, o.created_at DESC]] برّه | ترتيب العرض النهائي |

~~~text الناتج
 name |   id   | total  |          created_at
------+--------+--------+-------------------------------
 Ali  |      2 |   0.00 | 2026-10-07 08:35:01.394661+00
 Ali  |   6680 |  15.04 | 2026-10-07 08:34:33.908094+00
 Ali  | 148010 | 505.21 | 2026-10-07 08:20:13.601142+00
(3 rows)

Time: 2.592 ms
~~~

Ali ليه ٣ صفوف. و Sara **مش ظاهرة**: الـ subquery بتاعتها رجّعت صفر صفوف، و [[CROSS JOIN]] مع صفر صفوف = صفر صفوف (زي INNER JOIN).

---

## ٣. الاستعلام التاني: [[LEFT JOIN LATERAL ... ON true]]

~~~sql
SELECT u.name, last.id AS last_order, last.created_at
FROM users u
LEFT JOIN LATERAL (
  SELECT id, created_at FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1
) last ON true
ORDER BY u.name;
~~~

- [[LEFT JOIN LATERAL]]: لو الـ subquery رجّعت صفر صفوف، اليوزر يفضل موجود والأعمدة NULL.
- [[LIMIT 1]]: أحدث أوردر واحد.
- [[last]]: اسم النتيجة.
- [[ON true]]: الـ [[LEFT JOIN]] لازم ليه ON، والشرط الحقيقي جوه الـ subquery ([[user_id = u.id]])، فبنكتب [[true]] = «مفيش شرط زيادة». من غيرها:

~~~text الناتج
ERROR:  syntax error at or near ";"
~~~

والنتيجة:

~~~text الناتج
 name | last_order |          created_at
------+------------+-------------------------------
 Ali  |          2 | 2026-10-07 08:35:01.394661+00
 Sara |            |
(2 rows)
~~~

Sara ظهرت بخانات فاضية (NULL).

---

## ٤. ليه سريع: الـ index (تجربة الـ try)

~~~text EXPLAIN ANALYZE (الاستعلام الأول، والـ index موجود)
 Nested Loop  (actual time=0.036..0.044 rows=3.00 loops=1)
   ->  Seq Scan on users u  (actual time=0.011..0.012 rows=2.00 loops=1)
   ->  Limit  (actual time=0.012..0.015 rows=1.50 loops=2)
         ->  Index Scan using orders_user_created_idx on orders  (actual time=0.012..0.014 rows=1.50 loops=2)
               Index Cond: (user_id = u.id)
 Execution Time: 0.073 ms
~~~

| السطر | معناه |
|---|---|
| [[Nested Loop]] | loop: لكل صف من فوق، نفّذ اللي تحت |
| [[Seq Scan on users u ... rows=2.00]] | اليوزرين |
| [[loops=2]] | الـ subquery اتنفّذت مرتين، مرة لكل يوزر |
| [[rows=1.50]] | متوسط الصفوف في كل لفة: ٣ لـ Ali و ٠ لـ Sara، يعني ٣ ÷ ٢ |
| [[Index Scan using orders_user_created_idx]] | لكل يوزر، نزل في الفهرس لأول entry بتاعه وقرا ٣ ووقف. ومفيش Sort لأن الفهرس مترتب بالأحدث |

ونفس الاستعلام بعد [[DROP INDEX orders_user_created_idx]] (جوه [[BEGIN]] و [[ROLLBACK]] عشان يرجع):

~~~text EXPLAIN ANALYZE (من غير الـ index المركب)
 Nested Loop  (actual time=0.058..234.782 rows=3.00 loops=1)
   ->  Seq Scan on users u  (actual time=0.011..0.014 rows=2.00 loops=1)
   ->  Limit  (actual time=117.378..117.381 rows=1.50 loops=2)
         ->  Index Scan Backward using orders_created_at_idx on orders  (actual time=117.377..117.380 rows=1.50 loops=2)
               Filter: (user_id = u.id)
               Rows Removed by Filter: 100000
 Execution Time: 234.872 ms
~~~

استخدم فهرس التاريخ: بيمشي على **كل** الأوردرات بالأحدث ويفلتر اليوزر ([[Filter]] مش [[Index Cond]]). Ali لقى أوردراته على طول، لكن Sara ملهاش أوردرات، فمشي على الـ ٢٠٠ ألف كلهم عشان يتأكد ([[Rows Removed by Filter: 100000]] متوسط اللفتين). من ٠.٠٧ms لـ ٢٣٥ms.

---

## الخلاصة

| | [[CROSS JOIN LATERAL]] | [[LEFT JOIN LATERAL ... ON true]] |
|---|---|---|
| يوزر من غير نتايج | بيختفي | بيظهر بـ NULL |
| زي | INNER JOIN | LEFT JOIN |

- [[LATERAL]] = subquery بتتشغّل لكل صف وشايفاه، وبترجّع جدول.
- الـ [[ORDER BY ... LIMIT]] **جوه** الـ subquery هو اللي بيحدد «أعلى N»؛ اللي برّه للعرض بس.
- من غير index على [[(user_id, created_at DESC)]]، كل لفة ممكن تلف على الجدول كله.`,
          lines: [
            "لكل يوزر وأوردراته:",
            "من اليوزرز،",
            "ولكل يوزر شغّل الـ subquery دي (وهي شايفة u):",
            "أوردراته،",
            "بتاعة اليوزر ده،",
            "الأحدث الأول،",
            "٣ بس.",
            "اسم النتيجة o، ويوزر من غير أوردرات بيختفي (CROSS).",
            "الترتيب النهائي.",
            "لكل يوزر: آخر أوردر ليه،",
            "من اليوزرز،",
            "LEFT: اليوزر من غير أوردرات يفضل موجود بقيم NULL،",
            "أحدث أوردر واحد.",
            "ON true لأن الشرط جوه.",
            "بالاسم."
          ],
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
            starter: R`SELECT o.id AS order_id, top.name, top.unit_price
FROM orders o
CROSS JOIN LATERAL (
  SELECT p.name, oi.unit_price
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  WHERE oi.order_id = o.id
  ORDER BY oi.unit_price DESC
  LIMIT 2
) top;`,
            expect: [[1,"T-shirt",250], [1,"Mug",120], [2,"Hoodie",650], [2,"T-shirt",250], [3,"Mug",120], [4,null,null], [5,"T-shirt",250], [6,"Hoodie",650], [6,"Cap",180], [7,null,null], [8,"Pen",15]],
            solution: R`SELECT o.id AS order_id, top.name, top.unit_price
FROM orders o
LEFT JOIN LATERAL (
  SELECT p.name, oi.unit_price
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  WHERE oi.order_id = o.id
  ORDER BY oi.unit_price DESC
  LIMIT 2
) top ON true;`
          }
        }
      ]
    }
]);
