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
    }
]);
