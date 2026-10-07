// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "views و triggers و functions",
      l: 2,
      n: "استعلام متسمّي بتستخدمه كأنه جدول، وكود بيشتغل جوه القاعدة لوحده مع كل تعديل، ودوال بتناديها من SQL أو من Supabase",
      items: [
        {
          cmd: "VIEW و MATERIALIZED VIEW",
          title: "استعلام بتكرره كتير: خليه جدول وهمي أو نسخة محفوظة",
          desc: R`[[CREATE VIEW]] بيدّي اسم لاستعلام. بعد كده [[SELECT * FROM order_summaries]] كأنه جدول، بس مفيش داتا متخزنة: كل مرة Postgres بيشغّل الاستعلام الأصلي. فالنتيجة دايمًا محدّثة، والسرعة هي سرعة الاستعلام الأصلي.

[[CREATE MATERIALIZED VIEW]] بيشغّل الاستعلام مرة ويخزّن النتيجة على الديسك زي جدول. القراية منه سريعة جدًا، بس النتيجة بتفضل قديمة لحد ما تعمل [[REFRESH MATERIALIZED VIEW]]. و [[CONCURRENTLY]] بيحدّثه من غير ما يقفل القراية، بشرط يكون عليه unique index.

القاعدة: VIEW لتبسيط استعلام بيتكرر. MATERIALIZED لتقرير تقيل بيتقري كتير ومش لازم يبقى لحظي (لوحة أرقام بتتحدث كل ساعة).`,
          example: R`CREATE VIEW order_summaries AS
SELECT o.id, u.email, o.status, o.total, o.created_at,
       count(oi.product_id) AS lines
FROM orders o
JOIN users u ON u.id = o.user_id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, u.email;
SELECT * FROM order_summaries WHERE status = 'paid' ORDER BY created_at DESC;
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue, count(*) AS orders
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1;
CREATE UNIQUE INDEX monthly_revenue_month_uq ON monthly_revenue (month);
SELECT * FROM monthly_revenue ORDER BY month;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;`,
          try: R`بعد ما تعمل الاتنين: ضيف أوردر مدفوع جديد، واعمل SELECT من الـ view ومن الـ materialized view من غير refresh. مين شاف الأوردر ومين لأ؟ اعمل REFRESH واتأكد. وبعدين اعمل materialized view تاني من غير unique index وجرّب [[REFRESH ... CONCURRENTLY]] عليه.`,
          sol: R`الـ view هيشوف الأوردر الجديد على طول، لأنه بيشغّل الاستعلام كل مرة. الـ materialized view هيفضل بالأرقام القديمة (نفس revenue ونفس عدد orders للشهر ده) لحد ما تعمل [[REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue]]، وبعدها الشهر الحالي هيزيد بقيمة الأوردر والعدد يزيد ١.

والـ materialized view اللي من غير unique index: الـ refresh العادي هيشتغل، بس CONCURRENTLY هيفشل بـ [[cannot refresh materialized view "public.mv2" concurrently]] ومعاه hint إنك تعمل unique index على عمود أو أكتر من غير WHERE. السبب إن CONCURRENTLY بيحسب النتيجة الجديدة جنب القديمة ويقارنهم صف بصف، ومحتاج مفتاح يعرف بيه الصف.`,
          solCode: R`INSERT INTO orders (user_id, status, total)
SELECT id, 'paid', 999 FROM users LIMIT 1;

SELECT count(*) FROM order_summaries;
SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;
SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;

CREATE MATERIALIZED VIEW mv2 AS SELECT status, count(*) FROM orders GROUP BY status;
REFRESH MATERIALIZED VIEW CONCURRENTLY mv2;`,
          flag: "script",
          deep: {
            why: "نفس الـ JOIN بتاع «الأوردر وإيميل صاحبه وعدد بنوده» بيتكتب في ١٠ أماكن، ولما تغيّر فيه حاجة لازم تلف عليهم كلهم. والـ view بيخليه في مكان واحد. وتقارير الأدمن اللي بتجمّع ملايين الصفوف ممكن تاخد ثواني. لو ٥٠ واحد فاتحين اللوحة، القاعدة هتحسب نفس الرقم ٥٠ مرة، والـ materialized view بيحسبه مرة كل ساعة.",
            how: R`الـ view مجرد استعلام متخزن. Postgres بيدمجه في الاستعلام بتاعك، فـ [[WHERE status = 'paid']] بتتطبق جوه وبتستخدم الـ indexes عادي. الـ view البسيط (جدول واحد من غير GROUP BY) ينفع تعمل عليه INSERT و UPDATE كمان.

[[CREATE OR REPLACE VIEW]] بيسمح تضيف أعمدة في الآخر بس. لو عايز تشيل أو تغيّر نوع عمود: [[DROP VIEW]] وتعمله تاني. ولو فيه view تاني معتمد عليه، الـ DROP هيرفض إلا بـ CASCADE.

الـ materialized view جدول حقيقي: ليه مساحة، وتقدر تعمل عليه indexes. [[REFRESH]] العادي بيعيد حسابه وبيقفل القراية لحد ما يخلص. [[REFRESH ... CONCURRENTLY]] بيحسب نسخة جديدة ويقارنها بالقديمة ويطبّق الفرق، فالقراية شغالة طول الوقت، بس أبطأ ومحتاج [[UNIQUE INDEX]].

الـ refresh مش بيحصل لوحده. بتجدوله: [[pg_cron]] جوه القاعدة (موجود في Supabase)، أو cron job على السيرفر، أو من الكود بعد عملية معينة.

وفي Supabase: الـ view العادي بيشتغل بصلاحيات اللي عمله (غالبًا postgres) فبيعدّي RLS. من Postgres 15 اكتب [[CREATE VIEW ... WITH (security_invoker = true)]] عشان يطبّق RLS على اللي بيقرا. والـ materialized view مبيطبّقش RLS خالص، فمتعرضوش في الـ API لو فيه داتا خاصة.`,
            when: "VIEW: استعلام بيتكرر، أو عايز تدّي حد (أو أداة BI) شكل مبسّط من الداتا من غير ما يشوف الجداول. MATERIALIZED: dashboards وتقارير تقيلة، أو ليدربورد بتتحدث كل كام دقيقة، والتأخير فيها مقبول.",
            mistakes: R`تفتكر إن الـ view بيسرّع. هو بيبسّط بس، والسرعة هي سرعة الاستعلام الأصلي. materialized view ومحدش عامل له refresh، فالأرقام واقفة من أسبوع. CONCURRENTLY من غير unique index. [[SELECT *]] جوه الـ view: الأعمدة بتتحدد وقت الإنشاء، فالعمود الجديد في الجدول مش هيظهر. وفي Supabase: view عادي بيكشف صفوف محمية بـ RLS لأي حد معاه الـ publishable key.`
          },
          teach: R`## الفكرة: استعلام ليه اسم، ونسخة محفوظة من نتيجته

المثال فيه حاجتين: [[CREATE VIEW]] بيدّي اسم لاستعلام عشان تناديه كأنه جدول، و [[CREATE MATERIALIZED VIEW]] بيشغّل الاستعلام مرة ويحفظ النتيجة نفسها. هنفك الاتنين سطر سطر ونشوف الفرق بينهم في الناتج.

كل الناتج تحت حقيقي: اتشغّل في psql على [[postgres:18]] جوه Docker، على متجر صغير بنفس جداول الدروس اللي فاتت: ٣ يوزرز (Ali بإيميل [[you@example.com]]، و Sara، و Omar)، و ٧ أوردرات. ده شكل الأوردرات قبل ما نبدأ:

~~~text orders
 id | user |  status   |  total  |       created_at
----+------+-----------+---------+------------------------
  1 | Ali  | paid      |  500.00 | 2026-08-03 10:00:00+00
  2 | Sara | shipped   |  650.00 | 2026-08-20 18:30:00+00
  3 | Ali  | cancelled |  120.00 | 2026-09-02 09:00:00+00
  4 | Sara | paid      |  370.00 | 2026-09-10 14:00:00+00
  5 | Ali  | pending   |   30.00 | 2026-10-01 16:00:00+00
  6 | Omar | paid      | 1300.00 | 2026-10-04 11:00:00+00
  7 | Omar | pending   |    0.00 | 2026-10-05 12:00:00+00
~~~

الأوردر ٤ فيه بندين في [[order_items]]، والأوردر ٧ مفيهوش ولا بند (سلة فاضية)، والباقي بند واحد لكل واحد.

---

## ١. [[CREATE VIEW order_summaries AS ...]]

~~~text الأمر
CREATE VIEW order_summaries AS
SELECT o.id, u.email, o.status, o.total, o.created_at,
       count(oi.product_id) AS lines
FROM orders o
JOIN users u ON u.id = o.user_id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, u.email;
~~~

اقراه على جزئين:

- [[CREATE VIEW order_summaries AS]]: «اعمل view اسمه [[order_summaries]]، وتعريفه هو الاستعلام اللي بعد [[AS]]». الـ view = **جدول وهمي**: ليه اسم وأعمدة، بس مفيهوش ولا صف متخزن.
- كل اللي بعد AS استعلام SELECT عادي من دروس الـ JOIN. نفكه بترتيب التنفيذ:

| الحتة | بتعمل إيه |
|---|---|
| [[FROM orders o]] | ابدأ من الأوردرات، و [[o]] اسم قصير (alias) للجدول |
| [[JOIN users u ON u.id = o.user_id]] | هات صاحب كل أوردر |
| [[LEFT JOIN order_items oi ON oi.order_id = o.id]] | وبنوده. [[LEFT]] عشان الأوردر اللي مفيهوش بنود يفضل موجود |
| [[GROUP BY o.id, u.email]] | صف واحد لكل أوردر |
| [[count(oi.product_id) AS lines]] | عدد البنود في كل أوردر، باسم [[lines]] |

ليه [[count(oi.product_id)]] مش [[count(*)]]؟ الأوردر ٧ مفيهوش بنود، فالـ LEFT JOIN بيجيبه بصف واحد كل أعمدة [[oi]] فيه NULL. [[count(*)]] بيعد الصف ده فيطلع ١ وده غلط، و [[count(oi.product_id)]] مبيعدّش الـ NULL فيطلع صفر.

وليه [[GROUP BY o.id, u.email]] بس، مع إن فيه [[o.status]] و [[o.total]] برّه أي دالة تجميع؟ لأن [[o.id]] هو الـ primary key بتاع orders، فـ Postgres عارف إن كل أعمدة orders ليها قيمة واحدة لكل id. أما [[u.email]] من جدول تاني فلازم يتكتب. جرّب تشيله:

~~~text CREATE VIEW bad AS SELECT o.id, u.email, o.status FROM orders o JOIN users u ON u.id = o.user_id GROUP BY o.id;
ERROR:  column "u.email" must appear in the GROUP BY clause or be used in an aggregate function
~~~

والرد لما الـ view يتعمل:

~~~text الناتج
CREATE VIEW
~~~

مفيش صفوف اتحسبت لسه. Postgres حفظ **نص الاستعلام** بس. وتقدر تشوفه بـ [[\d+ order_summaries]] (أمر psql، [[d]] = describe و [[+]] = تفاصيل أكتر):

~~~text \d+ order_summaries (مختصر)
                 View "public.order_summaries"
   Column   |           Type
------------+--------------------------
 id         | bigint
 email      | text
 status     | text
 total      | numeric(10,2)
 created_at | timestamp with time zone
 lines      | bigint
View definition:
 SELECT o.id,
    u.email,
    ...
  GROUP BY o.id, u.email;
~~~

الأعمدة وأنواعها اتحددت وقت الإنشاء، و [[lines]] نوعه [[bigint]] لأن ده نوع اللي [[count]] بترجّعه.

---

## ٢. [[SELECT * FROM order_summaries WHERE status = 'paid' ORDER BY created_at DESC;]]

هنا بنستخدم الـ view كأنه جدول بالظبط: [[SELECT *]] منه، وعليه [[WHERE]] و [[ORDER BY]]. و [[DESC]] = descending، يعني من الأحدث للأقدم.

~~~text الناتج
 id |      email       | status |  total  |       created_at       | lines
----+------------------+--------+---------+------------------------+-------
  6 | omar@example.com | paid   | 1300.00 | 2026-10-04 11:00:00+00 |     1
  4 | sara@example.com | paid   |  370.00 | 2026-09-10 14:00:00+00 |     2
  1 | you@example.com  | paid   |  500.00 | 2026-08-03 10:00:00+00 |     1
(3 rows)
~~~

الأوردر ٤ طلع [[lines]] بـ 2 لأن فيه بندين. ولو شلت الـ WHERE، الأوردر ٧ هيطلع بـ [[lines]] صفر، وده شغل الـ LEFT JOIN.

### إيه اللي حصل جوه؟

Postgres مش بيحسب الـ view كله وبعدين يفلتر. هو بيحط استعلام الـ view مكان اسمه، ويدمج الـ WHERE بتاعتك جواه. [[EXPLAIN]] بيوريك الخطة:

~~~text EXPLAIN SELECT * FROM order_summaries WHERE status = 'paid'; (مختصر)
 GroupAggregate
   Group Key: o.id, u.email
   ->  Sort
         ->  Hash Join
               Hash Cond: (u.id = o.user_id)
               ->  Seq Scan on users u
               ->  Hash
                     ->  Hash Right Join
                           Hash Cond: (oi.order_id = o.id)
                           ->  Seq Scan on order_items oi
                           ->  Hash
                                 ->  Seq Scan on orders o
                                       Filter: (status = 'paid'::text)
~~~

اقرا من تحت لفوق: آخر سطر [[Filter: (status = 'paid')]] على [[orders]] نفسه، قبل أي JOIN. يعني الشرط نزل لجوه، ولو فيه index على status كان هيستخدمه. وفي نفس الوقت الخطة فيها الـ JOINs والـ GroupAggregate كلهم: كل SELECT من الـ view بيشغّل الاستعلام الأصلي من الأول. عشان كده الـ view **بيبسّط الكتابة، مش بيسرّع**.

---

## ٣. [[CREATE MATERIALIZED VIEW monthly_revenue AS ...]]

~~~text الأمر
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue, count(*) AS orders
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1;
~~~

[[MATERIALIZED]] يعني «اتجسّد»: الاستعلام بيتنفّذ **دلوقتي**، والصفوف اللي طلعت بتتخزن على الديسك زي جدول عادي.

| الحتة | بتعمل إيه |
|---|---|
| [[WHERE status IN ('paid', 'shipped')]] | الأوردرات اللي اتدفعت بس (المدفوع والمشحون) |
| [[date_trunc('month', created_at)]] | بتقص الوقت لأول الشهر: [[2026-09-10 14:00]] تبقى [[2026-09-01 00:00]]. فكل أوردرات الشهر يبقى ليها نفس القيمة |
| [[GROUP BY 1]] | جمّع بأول عمود في الـ SELECT (اللي هو [[month]]) |
| [[sum(total) AS revenue]] | مجموع الإيراد في الشهر |
| [[count(*) AS orders]] | عدد الأوردرات في الشهر |

~~~text الناتج
SELECT 3
~~~

لاحظ الرد: [[SELECT 3]] مش [[CREATE ...]]. يعني الاستعلام اتشغّل فعلًا وطلّع ٣ صفوف واتخزنوا (أغسطس وسبتمبر وأكتوبر).

---

## ٤. [[CREATE UNIQUE INDEX monthly_revenue_month_uq ON monthly_revenue (month);]]

عشان الـ materialized view جدول حقيقي، تقدر تعمل عليه index زي أي جدول. والـ index ده [[UNIQUE]]: مينفعش شهرين بنفس القيمة. الاسم [[_uq]] في الآخر عرف (unique) مش شرط.

~~~text الناتج
CREATE INDEX
~~~

الـ index ده مش للسرعة هنا (٣ صفوف). هو **شرط** للـ REFRESH CONCURRENTLY اللي في الخطوة ٦.

---

## ٥. [[SELECT * FROM monthly_revenue ORDER BY month;]]

~~~text الناتج
         month          | revenue | orders
------------------------+---------+--------
 2026-08-01 00:00:00+00 | 1150.00 |      2
 2026-09-01 00:00:00+00 |  370.00 |      1
 2026-10-01 00:00:00+00 | 1300.00 |      1
(3 rows)
~~~

راجع الأرقام على جدول الأوردرات فوق:
- أغسطس: ٥٠٠ (paid) + ٦٥٠ (shipped) = ١١٥٠، من أوردرين.
- سبتمبر: ٣٧٠ بس. الأوردر ٣ (١٢٠) [[cancelled]] فاتشال بالـ WHERE.
- أكتوبر: ١٣٠٠ بس. الأوردر ٥ و ٧ [[pending]].

والقراية دي مش بتشغّل الاستعلام الأصلي خالص. [[EXPLAIN]] بيقول:

~~~text EXPLAIN SELECT * FROM monthly_revenue;
 Seq Scan on monthly_revenue  (cost=0.00..1.03 rows=3 width=48)
~~~

سطر واحد: قراية ٣ صفوف من جدول. لا JOIN ولا GROUP BY. لو الاستعلام الأصلي بيجمّع ملايين الصفوف في ٥ ثواني، القراية من هنا بتاخد أجزاء من الثانية.

---

## ٦. [[REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;]]

الثمن: النسخة المحفوظة **مبتتحدّثش لوحدها**. ضيف أوردر مدفوع جديد (ده اللي في الـ solCode):

~~~text الناتج
INSERT INTO orders (user_id, status, total) SELECT id, 'paid', 999 FROM users LIMIT 1;
INSERT 0 1

SELECT count(*) FROM order_summaries;
 count
-------
     8

SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;
         month          | revenue | orders
------------------------+---------+--------
 2026-10-01 00:00:00+00 | 1300.00 |      1
~~~

الـ view العادي شاف الأوردر الجديد على طول (٨ بدل ٧)، والـ materialized view لسه بالأرقام القديمة. دلوقتي الـ refresh:

~~~text الناتج
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;
REFRESH MATERIALIZED VIEW

SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;
         month          | revenue | orders
------------------------+---------+--------
 2026-10-01 00:00:00+00 | 2299.00 |      2
~~~

١٣٠٠ + ٩٩٩ = ٢٢٩٩، والعدد بقى ٢.

### يعني إيه [[CONCURRENTLY]]؟

| | [[REFRESH MATERIALIZED VIEW x]] | [[REFRESH MATERIALIZED VIEW CONCURRENTLY x]] |
|---|---|---|
| بيعمل إيه | يحسب من الأول ويبدّل الجدول كله | يحسب نسخة جديدة، يقارنها بالقديمة صف صف، ويطبّق الفرق بس |
| القراية وقت الـ refresh | **مقفولة**: أي SELECT بيستنى لحد ما يخلص | شغالة عادي وبتشوف النسخة القديمة |
| السرعة | أسرع | أبطأ (فيه مقارنة) |
| الشرط | مفيش | [[UNIQUE INDEX]] على عمود أو أكتر من غير WHERE |

الـ unique index هو اللي بيعرّف بيه Postgres «ده نفس الصف» وهو بيقارن القديم بالجديد. من غيره:

~~~text mv2 من غير unique index
CREATE MATERIALIZED VIEW mv2 AS SELECT status, count(*) FROM orders GROUP BY status;
SELECT 4

REFRESH MATERIALIZED VIEW CONCURRENTLY mv2;
ERROR:  cannot refresh materialized view "public.mv2" concurrently
HINT:  Create a unique index with no WHERE clause on one or more columns of the materialized view.

REFRESH MATERIALIZED VIEW mv2;
REFRESH MATERIALIZED VIEW
~~~

الـ HINT بيقولك الحل بالظبط، والـ refresh العادي اشتغل من غير شرط.

> الـ refresh مش بيحصل لوحده أبدًا. لازم حاجة تناديه: [[pg_cron]] جوه القاعدة، أو cron على السيرفر، أو الكود بعد عملية معينة.

---

## الخلاصة

| | VIEW | MATERIALIZED VIEW |
|---|---|---|
| بيخزن داتا؟ | لأ، نص الاستعلام بس | أيوه، النتيجة على الديسك |
| الرد وقت الإنشاء | [[CREATE VIEW]] | [[SELECT عدد_الصفوف]] |
| النتيجة | دايمًا محدّثة | قديمة لحد [[REFRESH]] |
| السرعة | سرعة الاستعلام الأصلي | سرعة قراية جدول |
| index عليه | لأ (بيستخدم indexes الجداول الأصلية) | أيوه |

- الـ view بيبسّط، مش بيسرّع: الـ WHERE بتاعتك بتتدمج جواه، والاستعلام بيتشغّل كل مرة.
- الـ materialized view للتقارير التقيلة اللي التأخير فيها مقبول، ومعاه جدولة refresh.
- [[CONCURRENTLY]] = القراية مش بتقف، بشرط unique index.
- في LEFT JOIN عدّ عمود من الجدول اليمين ([[count(oi.product_id)]]) مش [[count(*)]]، عشان الصفوف الفاضية تطلع صفر.`,
          lines: [
            "اعمل view اسمه order_summaries على الاستعلام ده:",
            "الأوردر وإيميل صاحبه وحالته وقيمته ووقته،",
            "وعدد بنوده.",
            "من الأوردرات،",
            "مع اليوزرز،",
            "والبنود (LEFT عشان الأوردر الفاضي يطلع بصفر).",
            "صف لكل أوردر.",
            "استخدمه كأنه جدول، وبشروط عادي.",
            "materialized view: النتيجة هتتحسب دلوقتي وتتخزن.",
            "الإيراد وعدد الأوردرات لكل شهر،",
            "من المدفوع والمشحون،",
            "مجمّع بالشهر.",
            "unique index على الشهر: شرط الـ refresh من غير قفل.",
            "قراية سريعة من النسخة المحفوظة.",
            "حدّث النسخة المحفوظة من غير ما تقفل القراية."
          ]
        },
        {
          cmd: "CREATE TRIGGER",
          title: "updated_at يتحدث لوحده، وكل تعديل يتسجل في audit log",
          desc: R`الـ trigger دالة بتشتغل أوتوماتيك جوه القاعدة لما يحصل INSERT أو UPDATE أو DELETE على جدول. مش مهم مين عمل التعديل: الـ API، ولا سكربت، ولا أدمن من psql. الـ trigger هيشتغل.

أشهر استخدامين:

[[updated_at]] يتحدث مع كل UPDATE من غير ما تفتكر تبعته من الكود. ده trigger من نوع [[BEFORE]]: بيعدّل الصف ([[NEW]]) قبل ما يتكتب.

audit log: كل تعديل على الأوردرات يتسجل في جدول (مين، وإمتى، وكان إيه وبقى إيه). ده trigger من نوع [[AFTER]]: بيتفرج على الصف القديم ([[OLD]]) والجديد ([[NEW]]) ويكتب في جدول تاني.`,
          example: R`ALTER TABLE products ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
UPDATE products SET price = 260 WHERE name = 'T-shirt' RETURNING name, price, updated_at;
CREATE TABLE audit_log (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  table_name text NOT NULL,
  op         text NOT NULL,
  row_id     text,
  old_data   jsonb,
  new_data   jsonb,
  changed_by text NOT NULL DEFAULT current_user,
  changed_at timestamptz NOT NULL DEFAULT now()
);
CREATE FUNCTION audit_row() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO audit_log (table_name, op, row_id, old_data, new_data)
  VALUES (TG_TABLE_NAME, TG_OP, COALESCE(NEW.id, OLD.id)::text,
          CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END,
          CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
  RETURN NULL;
END;
$$;
CREATE TRIGGER orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_row();`,
          try: R`غيّر حالة أوردر لـ shipped، وامسح أوردر تاني، وبعدين اعرض من audit_log: العملية، ورقم الصف، والحالة القديمة والجديدة (من جوه الـ jsonb). وبعدين ركّب نفس trigger الـ updated_at على جدول orders (ضيف العمود الأول)، وجرّب UPDATE تبعت فيه [[updated_at = '2020-01-01']] بإيدك: القيمة اللي اتخزنت كام؟`,
          sol: R`في audit_log هتلاقي صفين: [[UPDATE]] فيه old_status [[paid]] (أو اللي كانت) و new_status [[shipped]]، و [[DELETE]] فيه old_data كامل و new_data [[NULL]]. الاستعلام: [[old_data->>'status']] و [[new_data->>'status']]. و [[changed_by]] هيبقى اسم يوزر القاعدة ([[postgres]] في الـ lab)، مش اليوزر بتاع التطبيق. عشان تسجّل يوزر التطبيق لازم تبعته، زي [[SET LOCAL app.user_id = '...']] جوه الـ transaction وتقراه في الـ trigger بـ [[current_setting('app.user_id', true)]].

وتجربة updated_at: القيمة المتخزنة هتبقى وقت دلوقتي مش 2020، لأن الـ BEFORE trigger بيكتب فوق أي قيمة بعتها في NEW قبل ما الصف يتحفظ. ده المقصود: محدش يقدر يزوّر وقت التعديل.

لو الـ trigger مش شغال، اتأكد إنه [[FOR EACH ROW]] مش STATEMENT (الـ STATEMENT مفيهوش NEW)، وإنه BEFORE مش AFTER (تعديل NEW في AFTER ملوش تأثير).`,
          solCode: R`UPDATE orders SET status = 'shipped' WHERE id = (SELECT min(id) FROM orders);
DELETE FROM orders WHERE id = (SELECT max(id) FROM orders);

SELECT op, row_id,
       old_data->>'status' AS old_status,
       new_data->>'status' AS new_status,
       changed_by, changed_at
FROM audit_log ORDER BY id;

ALTER TABLE orders ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE TRIGGER orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

UPDATE orders SET status = 'paid', updated_at = '2020-01-01' WHERE id = (SELECT min(id) FROM orders) RETURNING updated_at;`,
          flag: "script",
          deep: {
            why: "لو updated_at معتمد على إن كل مطوّر يفتكر يبعته، هيتنسي في endpoint من العشرين، والـ sync والـ cache اللي معتمدين عليه هيبوظوا. والـ audit log من الكود بيفوّت أي تعديل حصل من برّه الكود: سكربت، أو migration، أو أدمن صلّح حاجة بإيده من psql، وده بالظبط التعديل اللي هتحتاج تعرفه لما فلوس تختفي.",
            how: R`الـ trigger ليه جزئين: function بترجّع نوع [[trigger]] (ده الكود)، و [[CREATE TRIGGER]] (ده بيقول إمتى تشتغل). نفس الـ function ينفع تتركّب على جداول كتير.

جوه الـ function عندك متغيرات جاهزة: [[NEW]] الصف الجديد (INSERT و UPDATE)، و [[OLD]] الصف القديم (UPDATE و DELETE)، و [[TG_OP]] اسم العملية، و [[TG_TABLE_NAME]] اسم الجدول.

[[BEFORE]] بيشتغل قبل الكتابة وتقدر تعدّل NEW. لو رجّعت NEW الصف بيتكتب، ولو رجّعت NULL العملية بتتلغي للصف ده من غير error. [[AFTER]] بيشتغل بعد الكتابة، والقيمة اللي بيرجّعها ملهاش لازمة (عشان كده [[RETURN NULL]])، وبيستخدم للتسجيل أو لتحديث جداول تانية.

[[FOR EACH ROW]] مرة لكل صف. [[FOR EACH STATEMENT]] مرة لكل أمر حتى لو عدّل مليون صف. و [[WHEN (OLD.status IS DISTINCT FROM NEW.status)]] في CREATE TRIGGER بيشغّله بس لو الحالة اتغيرت فعلًا.

الـ trigger جزء من نفس الـ transaction. لو فشل، التعديل الأصلي كله بيترجع. وده حلو (مفيش تعديل من غير audit)، بس كمان معناه إن trigger بطيء بيبطّأ كل INSERT.

[[to_jsonb(OLD)]] بيحوّل الصف كله لـ jsonb، فنفس الـ audit function تشتغل على أي جدول من غير ما تكتب أسماء الأعمدة.

وفي Prisma: [[@updatedAt]] في الـ schema بيحدّث القيمة من الـ client، مش من القاعدة. يعني UPDATE من psql أو من سكربت مش هيحدّثه. الـ trigger بيغطي كل الطرق.`,
            when: "updated_at، والـ audit logs، والـ counters اللي لازم تفضل مظبوطة، وفي Supabase: إنشاء صف في profiles لما يوزر يسجّل (trigger على auth.users، درس one-to-one). أما منطق البيزنس الكبير (إيميلات، ودفع، ومناداة APIs) مكانه الكود مش trigger.",
            mistakes: R`منطق كتير مستخبي في triggers، فمحدش فاهم ليه القيمة اتغيرت. trigger بيعدّل نفس الجدول اللي عليه فيعمل loop. AFTER وبتعدّل NEW وتستغرب مفيش حاجة حصلت. [[FOR EACH ROW]] على جدول بيتعمله bulk insert بملايين الصفوف فيبقى بطيء جدًا. [[DROP FUNCTION]] بيفشل لأن فيه trigger معتمد عليها. وفي الانترفيو: «إيه عيوب الـ triggers؟» منطق مستخبي، وصعب في الـ testing والـ debugging، وبيأثر على سرعة الكتابة.`
          },
          teach: R`## الفكرة: دالة + «إمتى تشتغل»

أي trigger في Postgres جزئين منفصلين:

1. **function** بترجّع النوع الخاص [[trigger]]: ده الكود اللي هيتنفّذ.
2. **[[CREATE TRIGGER]]**: ده بيربط الدالة بجدول، ويقول إمتى تشتغل (قبل ولا بعد، وأنهي عملية، ومرة لكل صف ولا لكل أمر).

المثال بيعمل ده مرتين: trigger يحدّث [[updated_at]]، و trigger يسجّل كل تعديل في [[audit_log]].

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على نفس المتجر الصغير بتاع درس الـ VIEW (٥ منتجات و ٧ أوردرات، أولهم [[paid]] بـ ٥٠٠ وآخرهم رقم ٧ [[pending]]).

---

## ١. [[ALTER TABLE products ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();]]

[[ALTER TABLE ... ADD COLUMN]] بيضيف عمود لجدول موجود. [[timestamptz]] لحظة زمنية بالتوقيت، و [[DEFAULT now()]] بيملا الصفوف الموجودة والجديدة بالوقت الحالي، فـ [[NOT NULL]] مش هيشتكي.

~~~text الناتج
ALTER TABLE

SELECT name, price, updated_at FROM products WHERE name = 'T-shirt';
  name   | price  |          updated_at
---------+--------+-------------------------------
 T-shirt | 250.00 | 2026-10-07 08:46:55.762272+00
~~~

المشكلة: الـ DEFAULT بيشتغل في INSERT بس. أي UPDATE بعد كده مش هيلمس العمود ده، إلا لو الكود افتكر يبعته. ده اللي الـ trigger هيحله.

---

## ٢. الدالة: [[CREATE FUNCTION set_updated_at() RETURNS trigger ...]]

~~~text الأمر
CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
~~~

| الحتة | معناها |
|---|---|
| [[set_updated_at()]] | اسم الدالة، ومن غير parameters: دوال الـ trigger بتاخد بياناتها من متغيرات جاهزة مش من arguments |
| [[RETURNS trigger]] | نوع خاص: الدالة دي مش هتتنادى بـ SELECT، هتتنادى من trigger بس |
| [[LANGUAGE plpgsql]] | مكتوبة بـ PL/pgSQL، لغة Postgres اللي فيها متغيرات و IF و BEGIN/END |
| [[AS $$ ... $$]] | جسم الدالة نص، و [[$$]] علامة تنصيص بديلة عشان متحتاجش تهرّب أي [[']] جوه الكود |
| [[BEGIN ... END;]] | بداية ونهاية الكود (مش transaction هنا، دي مجرد بلوك) |
| [[NEW]] | متغير جاهز: الصف بالشكل اللي **هيتكتب بيه** |
| [[:=]] | علامة التخصيص في plpgsql: «حط القيمة دي في ده» |
| [[RETURN NEW;]] | رجّع الصف (بعد التعديل) عشان Postgres يكتبه |

يعني الدالة بتقول: «قبل ما تكتب الصف، غيّر updated_at فيه للوقت الحالي، وبعدين اكتبه».

~~~text الناتج
CREATE FUNCTION
~~~

---

## ٣. الربط: [[CREATE TRIGGER products_updated_at ...]]

~~~text الأمر
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
~~~

| الحتة | معناها |
|---|---|
| [[products_updated_at]] | اسم الـ trigger (لازم يبقى مش متكرر على نفس الجدول) |
| [[BEFORE]] | اشتغل **قبل** ما الصف يتكتب، وده الوقت الوحيد اللي تعديل NEW فيه بيأثّر |
| [[UPDATE ON products]] | مع أي UPDATE على جدول products |
| [[FOR EACH ROW]] | مرة لكل صف اتعدّل (UPDATE غيّر ١٠ صفوف = ١٠ مرات) |
| [[EXECUTE FUNCTION set_updated_at()]] | الدالة اللي هتتنفّذ |

~~~text الناتج
CREATE TRIGGER
~~~

[[\d products]] بقى بيوريك الـ trigger تحت الجدول:

~~~text \d products (آخره)
Triggers:
    products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at()
~~~

---

## ٤. التجربة: [[UPDATE products SET price = 260 WHERE name = 'T-shirt' RETURNING name, price, updated_at;]]

الـ UPDATE ده مش بيذكر [[updated_at]] خالص، بيغيّر السعر بس. و [[RETURNING]] بيرجّع الصف بعد ما اتكتب، فنشوف القيمة اللي اتخزنت فعلًا (استنينا ٢ ثانية قبلها عشان الفرق يبان):

~~~text الناتج
  name   | price  |          updated_at
---------+--------+-------------------------------
 T-shirt | 260.00 | 2026-10-07 08:46:57.777315+00
(1 row)

UPDATE 1
~~~

كان [[08:46:55]] وبقى [[08:46:57]] من غير ما حد يبعته.

> [[now()]] في Postgres = وقت **بداية الـ transaction**، مش اللحظة بالظبط. جوه [[BEGIN]] واحدة، كل الصفوف اللي هتتعدّل هتاخد نفس الوقت حتى لو الـ transaction طولت. لو عايز الساعة الفعلية في كل لحظة فيه [[clock_timestamp()]].

---

## ٥. جدول الـ audit: [[CREATE TABLE audit_log (...)]]

| العمود | ليه |
|---|---|
| [[id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY]] | رقم بيتولد لوحده، فالترتيب بيه = ترتيب الأحداث |
| [[table_name text]] | أنهي جدول اتعدّل (نفس الـ log لكل الجداول) |
| [[op text]] | العملية: [[INSERT]] أو [[UPDATE]] أو [[DELETE]] |
| [[row_id text]] | رقم الصف. [[text]] مش bigint عشان جداول تانية ممكن الـ id بتاعها uuid |
| [[old_data jsonb]] | الصف قبل التعديل كله |
| [[new_data jsonb]] | الصف بعده كله |
| [[changed_by text DEFAULT current_user]] | [[current_user]] = اسم يوزر **القاعدة** اللي عامل الاتصال |
| [[changed_at timestamptz DEFAULT now()]] | إمتى |

ليه [[jsonb]]؟ عشان أي جدول، بأي أعمدة، يتخزن في نفس العمود من غير ما الـ audit_log يعرف شكله.

---

## ٦. دالة الـ audit: [[audit_row()]]

~~~text الأمر
CREATE FUNCTION audit_row() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO audit_log (table_name, op, row_id, old_data, new_data)
  VALUES (TG_TABLE_NAME, TG_OP, COALESCE(NEW.id, OLD.id)::text,
          CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END,
          CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
  RETURN NULL;
END;
$$;
~~~

جسم الدالة INSERT واحد في audit_log. نفك القيم الخمسة:

### [[TG_TABLE_NAME]] و [[TG_OP]]

متغيرات جاهزة جوه أي دالة trigger ([[TG]] = trigger): اسم الجدول اللي شغّل الـ trigger، واسم العملية كنص ([['INSERT']] أو [['UPDATE']] أو [['DELETE']]).

### [[COALESCE(NEW.id, OLD.id)::text]]

| العملية | [[NEW]] | [[OLD]] |
|---|---|---|
| INSERT | الصف الجديد | NULL |
| UPDATE | الصف بعد التعديل | الصف قبله |
| DELETE | NULL | الصف اللي اتمسح |

[[COALESCE(a, b)]] بترجّع أول قيمة مش NULL. فـ id بييجي من NEW، ولو DELETE (NEW فاضي) بييجي من OLD. و [[::text]] تحويل النوع لنص عشان يتحط في عمود text.

### [[CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END]]

[[<>]] = «لا يساوي». [[to_jsonb(OLD)]] بيحوّل الصف كله لـ JSON، كل عمود مفتاح. و CASE من غير ELSE بيرجّع NULL. يعني: الصف القديم لو العملية مش INSERT (في INSERT مفيش قديم). والسطر اللي بعده نفس الفكرة للجديد: لو مش DELETE.

### [[RETURN NULL;]]

الـ trigger ده هيبقى [[AFTER]]: الصف اتكتب خلاص، فالقيمة اللي بترجع ملهاش أي تأثير. العرف إنك ترجّع NULL.

---

## ٧. الربط: [[CREATE TRIGGER orders_audit AFTER INSERT OR UPDATE OR DELETE ON orders ...]]

- [[AFTER]]: بعد ما العملية تنجح. التسجيل بييجي بعد ما نتأكد إن التعديل حصل.
- [[INSERT OR UPDATE OR DELETE]]: trigger واحد لتلات عمليات، والدالة بتفرق بينهم بـ [[TG_OP]].
- [[FOR EACH ROW]]: عشان محتاجين OLD و NEW لكل صف.

---

## ٨. اللي بيحصل في الـ «جرّب»

### UPDATE و DELETE وقراية الـ log

~~~text الأوامر
UPDATE orders SET status = 'shipped' WHERE id = (SELECT min(id) FROM orders);
DELETE FROM orders WHERE id = (SELECT max(id) FROM orders);
~~~

[[(SELECT min(id) FROM orders)]] subquery بيجيب أصغر id (الأوردر ١)، و [[max]] أكبر id (الأوردر ٧). وبعدين:

~~~text الناتج
SELECT op, row_id,
       old_data->>'status' AS old_status,
       new_data->>'status' AS new_status,
       changed_by, changed_at
FROM audit_log ORDER BY id;

   op   | row_id | old_status | new_status | changed_by |          changed_at
--------+--------+------------+------------+------------+-------------------------------
 UPDATE | 1      | paid       | shipped    | postgres   | 2026-10-07 08:46:57.797276+00
 DELETE | 7      | pending    |            | postgres   | 2026-10-07 08:46:57.800438+00
(2 rows)
~~~

- [[->>]] بيطلّع قيمة مفتاح من jsonb **كنص** (درس jsonb). [[old_data->>'status']] = الحالة قبل.
- صف الـ DELETE ملوش [[new_status]] لأن [[new_data]] اتخزن NULL.
- [[changed_by]] = [[postgres]]: يوزر القاعدة، مش يوزر التطبيق (التفاصيل في الـ sol).

وده صف الـ UPDATE كامل بـ [[\x]] (أمر psql بيعرض كل عمود في سطر):

~~~text SELECT * FROM audit_log WHERE op = 'UPDATE'; (والـ uuid مختصر)
id         | 1
table_name | orders
op         | UPDATE
row_id     | 1
old_data   | {"id": 1, "total": 500.00, "status": "paid", "user_id": "4b59aa03-...", "created_at": "2026-08-03T10:00:00+00:00"}
new_data   | {"id": 1, "total": 500.00, "status": "shipped", "user_id": "4b59aa03-...", "created_at": "2026-08-03T10:00:00+00:00"}
changed_by | postgres
~~~

الصف كله اتحفظ قبل وبعد، فتقدر تعرف أي عمود اتغير.

### INSERT برضه بيتسجل

~~~text الناتج بعد INSERT أوردر جديد
 id |   op   | row_id | no_old
----+--------+--------+--------
  4 | INSERT | 8      | t
~~~

[[no_old]] هنا [[old_data IS NULL]]، و [[t]] = true: مفيش صف قديم في INSERT.

### trigger الـ updated_at على orders، ومحاولة تزوير الوقت

بعد ما تضيف العمود وتركّب نفس الدالة على orders (دالة واحدة، triggers كتير):

~~~text الناتج
UPDATE orders SET status = 'paid', updated_at = '2020-01-01'
WHERE id = (SELECT min(id) FROM orders) RETURNING updated_at;

          updated_at
-------------------------------
 2026-10-07 08:46:57.808851+00
~~~

الـ UPDATE بعت 2020، بس الـ BEFORE trigger كتب [[now()]] فوقها في NEW قبل الكتابة. ولاحظ إن الـ UPDATE ده نفسه اتسجل في audit_log كمان: الجدول عليه trigger قبل وواحد بعد، والاتنين اشتغلوا.

### trigger بيشتغل حتى لو مفيش حاجة اتغيرت

~~~text الناتج
UPDATE orders SET total = total WHERE status = 'pending';
UPDATE 1
~~~

[[total = total]] مغيّرش أي قيمة، ومع ذلك عدد صفوف audit_log زاد واحد. لو مش عايز ده، [[CREATE TRIGGER]] بيقبل شرط [[WHEN (OLD.status IS DISTINCT FROM NEW.status)]]، فالدالة متتناداش أصلًا إلا لو الحالة اتغيرت. ([[IS DISTINCT FROM]] زي [[<>]] بس بيتعامل مع NULL صح.)

### الدالة مش بتتمسح وعليها triggers

~~~text DROP FUNCTION set_updated_at();
ERROR:  cannot drop function set_updated_at() because other objects depend on it
DETAIL:  trigger products_updated_at on table products depends on function set_updated_at()
trigger orders_updated_at on table orders depends on function set_updated_at()
HINT:  Use DROP ... CASCADE to drop the dependent objects too.
~~~

Postgres بيحمي الـ triggers: لازم تمسحهم الأول ([[DROP TRIGGER products_updated_at ON products]]) أو تستخدم [[CASCADE]] وانت عارف إنها هتمسحهم.

---

## الخلاصة

| | trigger الـ updated_at | trigger الـ audit |
|---|---|---|
| التوقيت | [[BEFORE UPDATE]] | [[AFTER INSERT OR UPDATE OR DELETE]] |
| بيستخدم | [[NEW]] ويعدّله | [[OLD]] و [[NEW]] و [[TG_OP]] و [[TG_TABLE_NAME]] |
| بيرجّع | [[NEW]] (الصف اللي هيتكتب) | [[NULL]] (ملوش لازمة في AFTER) |
| بيكتب في | نفس الصف | جدول تاني |

- BEFORE = تقدر تغيّر الصف. AFTER = تتفرج عليه وتكتب في مكان تاني.
- [[FOR EACH ROW]] عشان NEW و OLD يبقوا موجودين.
- دالة واحدة تتركّب على جداول كتير، و [[to_jsonb(OLD)]] بيخلي الـ audit يشتغل مع أي جدول.
- الـ trigger جزء من نفس الـ transaction: لو فشل، التعديل الأصلي بيترجع معاه.`,
          lines: [
            "ضيف عمود updated_at للمنتجات.",
            "function بترجّع trigger،",
            "مكتوبة بـ plpgsql. الـ $$ بتبدأ الكود.",
            "البداية.",
            "حط الوقت الحالي في الصف الجديد.",
            "رجّع الصف المعدّل عشان يتكتب.",
            "النهاية.",
            "قفلة الكود.",
            "trigger اسمه products_updated_at:",
            "قبل أي UPDATE على المنتجات،",
            "لكل صف، شغّل الدالة دي.",
            "جرّب: updated_at اتغير لوحده.",
            "جدول الـ audit:",
            "رقم،",
            "اسم الجدول،",
            "العملية (INSERT و UPDATE و DELETE)،",
            "رقم الصف،",
            "الصف قبل التعديل،",
            "والصف بعده،",
            "مين عمل التعديل (يوزر القاعدة)،",
            "وإمتى.",
            "قفلة.",
            "function الـ audit،",
            "بـ plpgsql.",
            "البداية.",
            "سجّل صف:",
            "اسم الجدول والعملية ورقم الصف (من NEW، ولو DELETE من OLD)،",
            "القديم لو مش INSERT،",
            "والجديد لو مش DELETE.",
            "AFTER trigger: القيمة اللي بترجع ملهاش لازمة.",
            "النهاية.",
            "قفلة الكود.",
            "trigger على الأوردرات:",
            "بعد أي إضافة أو تعديل أو مسح،",
            "لكل صف."
          ]
        },
        {
          cmd: "CREATE FUNCTION",
          title: "منطق جوه القاعدة: دالة SQL أو plpgsql وتناديها من أي مكان",
          desc: R`الـ function في Postgres بتاخد parameters وترجّع قيمة أو جدول، وتناديها من أي استعلام: [[SELECT user_spent(id) FROM users]].

فيه لغتين هتستخدمهم: [[LANGUAGE sql]] لاستعلام واحد (أبسط وPostgres يقدر يحسّنه)، و [[LANGUAGE plpgsql]] لما محتاج متغيرات و IF و RAISE.

الاستخدام الأهم في الشغل: عملية لازم تحصل كلها مع بعض (خصم مخزون وإنشاء أوردر وبنده). الـ function كلها بتشتغل في transaction واحدة، فلو حاجة فشلت كله بيترجع. وفي Supabase دي الطريقة اللي الـ frontend بينفّذ بيها عملية زي دي: [[supabase.rpc('place_order', {...})]] (درس rpc في المستوى التالت).`,
          example: R`CREATE FUNCTION user_spent(p_user_id uuid) RETURNS numeric
LANGUAGE sql STABLE AS $$
  SELECT COALESCE(sum(total), 0) FROM orders
  WHERE user_id = p_user_id AND status IN ('paid', 'shipped');
$$;
SELECT email, user_spent(id) FROM users ORDER BY 2 DESC;
CREATE FUNCTION place_order(p_user_id uuid, p_product_id bigint, p_qty int)
RETURNS bigint LANGUAGE plpgsql AS $$
DECLARE
  v_price numeric;
  v_order_id bigint;
BEGIN
  UPDATE products SET stock = stock - p_qty
  WHERE id = p_product_id AND stock >= p_qty
  RETURNING price INTO v_price;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'OUT_OF_STOCK';
  END IF;
  INSERT INTO orders (user_id, total) VALUES (p_user_id, v_price * p_qty)
  RETURNING id INTO v_order_id;
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (v_order_id, p_product_id, p_qty, v_price);
  RETURN v_order_id;
END;
$$;
SELECT place_order((SELECT id FROM users LIMIT 1), 2, 3);`,
          try: R`نادي [[place_order]] على منتج مخزونه صفر (Cap بعد درس UPDATE مثلًا)، وبعدين اتأكد إن عدد الأوردرات متغيّرش. وبعدين اكتب function بـ [[LANGUAGE sql]] اسمها [[top_products(p_limit int)]] ترجّع جدول ([[RETURNS TABLE (name text, sold bigint)]]) بأكتر المنتجات مبيعًا، وناديها بـ [[SELECT * FROM top_products(3)]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: اعمل [[top_products(p_limit int)]] بـ [[LANGUAGE sql]] و [[RETURNS TABLE (name text, sold bigint)]] (مجموع الكميات من order_items)، وآخر سطر [[SELECT * FROM top_products(3);]].`,
          sol: R`على منتج خلصان هتاخد [[ERROR: OUT_OF_STOCK]] ومعاها [[CONTEXT: PL/pgSQL function place_order(uuid,bigint,integer) line 10 at RAISE]]. و [[SELECT count(*) FROM orders]] هيطلع نفس الرقم قبل وبعد: الـ UPDATE مغيّرش ولا صف أصلًا ([[NOT FOUND]])، والـ exception وقّفت الدالة قبل الـ INSERT. ولو الغلطة حصلت بعد خصم المخزون (زي user_id مش موجود، فالـ INSERT في orders يفشل بـ foreign key)، كل اللي حصل جوه الدالة بيترجع برضه، والمخزون بيرجع زي ما كان، لأن الـ function جزء من transaction الأمر اللي ناداها.

و [[top_products(3)]] هترجع ٣ صفوف بعمودين، زي أي جدول: تقدر تعمل عليها WHERE و JOIN. لو نسيت [[RETURNS TABLE]] وكتبت [[RETURNS bigint]] هترجع أول قيمة بس. وخلي بالك أسماء الأعمدة في [[RETURNS TABLE]] بتبقى متغيرات جوه الدالة، فلو في plpgsql عندك عمود في جدول اسمه name هتاخد [[column reference "name" is ambiguous]]. في LANGUAGE sql مفيش المشكلة دي.`,
          solCode: R`SELECT count(*) FROM orders;
SELECT place_order((SELECT id FROM users LIMIT 1), (SELECT id FROM products WHERE stock = 0 LIMIT 1), 1);
SELECT count(*) FROM orders;

CREATE FUNCTION top_products(p_limit int)
RETURNS TABLE (name text, sold bigint)
LANGUAGE sql STABLE AS $$
  SELECT p.name, sum(oi.quantity)
  FROM order_items oi JOIN products p ON p.id = oi.product_id
  GROUP BY p.name
  ORDER BY 2 DESC
  LIMIT p_limit;
$$;

SELECT * FROM top_products(3);`,
          flag: "script",
          deep: {
            why: "لما نفس المنطق (حساب رصيد، أو إنشاء أوردر) بيتكتب في الـ API وفي سكربت وفي لوحة الأدمن، كل نسخة بتختلف شوية. الـ function بتحطه في مكان واحد جنب الداتا، وبتشتغل في رحلة واحدة للقاعدة بدل ٤ queries رايحة جاية. وفي Supabase، لو الـ frontend بيكلّم القاعدة مباشرة، ده الطريق الوحيد لعملية فيها كذا خطوة لازم تتم مع بعض.",
            how: R`[[$$ ... $$]] مجرد علامات تنصيص للكود، عشان متحتاجش تهرّب كل [[']] جواه.

الـ parameters باسم زي [[p_user_id]]: الـ prefix بيمنع التضارب مع أسماء الأعمدة. في plpgsql لو الـ parameter اسمه [[user_id]] والجدول فيه عمود [[user_id]]، Postgres مش هيعرف تقصد مين.

[[STABLE]] معناها «مش بتعدّل حاجة، ونفس المدخلات في نفس الاستعلام بترجّع نفس النتيجة»، و [[IMMUTABLE]] «نفس المدخلات بترجّع نفس النتيجة دايمًا» (شرط عشان تستخدمها في index أو generated column)، و [[VOLATILE]] الافتراضي لأي حاجة بتعدّل. التصنيف الصح بيخلي Postgres يحسّن.

في plpgsql: [[DECLARE]] للمتغيرات، و [[SELECT ... INTO v]] أو [[RETURNING ... INTO v]] يحط نتيجة في متغير، و [[FOUND]] بيقولك آخر أمر أثّر في صفوف ولا لأ، و [[RAISE EXCEPTION]] بيوقف كل حاجة ويرجّع error.

الـ function مش بتعمل COMMIT لوحدها: هي جوه الـ transaction بتاع الأمر اللي ناداها. عشان كده أي exception بيرجّع كل اللي عملته. ولو محتاج COMMIT في النص (batch كبير) ده [[PROCEDURE]] مش function.

[[RETURNS TABLE (...)]] أو [[RETURNS SETOF orders]] بيرجّع صفوف، فتستخدمها في FROM. و [[CREATE OR REPLACE FUNCTION]] بيعدّلها، بس لو غيّرت نوع الـ return لازم DROP الأول.

والأمان: الافتراضي [[SECURITY INVOKER]]، يعني بتشتغل بصلاحيات اللي بيناديها. [[SECURITY DEFINER]] بتشتغل بصلاحيات اللي عملها، ودي خطيرة لو مش واخد بالك (بتعدّي RLS). التفاصيل في درس rpc.`,
            when: "عمليات من كذا خطوة لازم تتم مع بعض (خصوصًا في Supabase)، وحسابات بتتكرر في استعلامات كتير، ودوال الـ triggers، ودوال IMMUTABLE للـ indexes (زي التطبيع في درس البحث بالعربي). أما منطق فيه مناداة APIs برّه أو إيميلات، مكانه الكود.",
            mistakes: R`parameter بنفس اسم عمود في plpgsql. [[SECURITY DEFINER]] من غير [[SET search_path]] ومن غير ما تتأكد مين بيناديها. تعليم دالة بتقرا من جدول IMMUTABLE عشان تحطها في index، فالـ index يبقى غلط لما الجدول يتغير. منطق كتير جدًا جوه القاعدة ومفيش tests ولا version control، فخليها في ملفات migrations زي أي حاجة تانية. و [[RAISE EXCEPTION]] برسالة فيها داتا حساسة بتوصل للـ client.`
          },
          teach: R`## الفكرة: SQL باسم، و parameters، وقيمة راجعة

المثال فيه دالتين: [[user_spent]] حساب بسيط بـ [[LANGUAGE sql]] (استعلام واحد)، و [[place_order]] عملية من ٣ خطوات بـ [[LANGUAGE plpgsql]] لازم تنجح كلها أو تترجع كلها. هنفك الاتنين ونشوف بيرجّعوا إيه، وإيه اللي بيحصل لما حاجة تفشل في النص.

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على نفس المتجر الصغير بتاع درس الـ VIEW. المنتجات قبل ما نبدأ:

~~~text products
 id |  name   | price  | stock
----+---------+--------+-------
  1 | T-shirt | 250.00 |    40
  2 | Mug     | 120.00 |    15
  3 | Cap     | 180.00 |     0
  4 | Hoodie  | 650.00 |     8
  5 | Pen     |  15.00 |   100
~~~

---

## ١. [[CREATE FUNCTION user_spent(p_user_id uuid) RETURNS numeric ...]]

~~~text الأمر
CREATE FUNCTION user_spent(p_user_id uuid) RETURNS numeric
LANGUAGE sql STABLE AS $$
  SELECT COALESCE(sum(total), 0) FROM orders
  WHERE user_id = p_user_id AND status IN ('paid', 'shipped');
$$;
~~~

### رأس الدالة

| الحتة | معناها |
|---|---|
| [[user_spent]] | اسم الدالة |
| [[(p_user_id uuid)]] | parameter واحد اسمه [[p_user_id]] ونوعه [[uuid]]. الـ [[p_]] في الأول عرف = parameter، عشان ميتلخبطش مع عمود [[user_id]] |
| [[RETURNS numeric]] | بترجّع رقم واحد من نوع numeric (نفس نوع الفلوس) |
| [[LANGUAGE sql]] | الجسم استعلام SQL عادي، من غير متغيرات ولا IF |
| [[STABLE]] | وعد لـ Postgres: «أنا بقرا بس ومش بعدّل حاجة، ونفس المدخل جوه نفس الاستعلام بيرجّع نفس النتيجة» |
| [[AS $$ ... $$]] | جسم الدالة. [[$$]] علامة تنصيص، فالـ [['paid']] جوه مش محتاجة تهريب |

### جسم الدالة

- [[WHERE user_id = p_user_id]]: الأوردرات بتاعة اليوزر اللي اتبعت.
- [[AND status IN ('paid', 'shipped')]]: المدفوع بس.
- [[sum(total)]]: مجموعهم. لو اليوزر ملوش أوردرات خالص، [[sum]] بيرجّع **NULL** مش صفر (درس count و sum).
- [[COALESCE(..., 0)]]: لو NULL حط صفر. فالدالة دايمًا بترجّع رقم.

دالة [[LANGUAGE sql]] بترجّع نتيجة **آخر** استعلام فيها، فمش محتاج تكتب RETURN.

~~~text الناتج
CREATE FUNCTION
~~~

و [[\df user_spent]] (أمر psql: describe functions) بيوريك شكلها:

~~~text \df user_spent
 Schema |    Name    | Result data type | Argument data types | Type
--------+------------+------------------+---------------------+------
 public | user_spent | numeric          | p_user_id uuid      | func
~~~

---

## ٢. [[SELECT email, user_spent(id) FROM users ORDER BY 2 DESC;]]

الدالة بتتنادى جوه SELECT زي [[lower()]] أو [[count()]]: لكل يوزر، ابعت الـ [[id]] بتاعه. و [[ORDER BY 2]] = رتّب بالعمود التاني في الـ SELECT.

~~~text الناتج
      email       | user_spent
------------------+------------
 omar@example.com |    1300.00
 sara@example.com |    1020.00
 you@example.com  |     500.00
(3 rows)
~~~

Sara: ٦٥٠ (shipped) + ٣٧٠ (paid) = ١٠٢٠. Ali: ٥٠٠ بس، لأن الـ ١٢٠ [[cancelled]] والـ ٣٠ [[pending]]. ويوزر مش موجود أصلًا:

~~~text SELECT user_spent('00000000-0000-0000-0000-000000000000');
 user_spent
------------
          0
~~~

صفر مش NULL، وده شغل الـ COALESCE.

---

## ٣. [[CREATE FUNCTION place_order(...)]]: رأس الدالة

~~~text الأمر
CREATE FUNCTION place_order(p_user_id uuid, p_product_id bigint, p_qty int)
RETURNS bigint LANGUAGE plpgsql AS $$
~~~

٣ parameters: مين بيشتري، وأنهي منتج، وكام قطعة. وبترجّع [[bigint]]: رقم الأوردر الجديد. ومكتوبة بـ [[plpgsql]] لأننا محتاجين متغيرات و IF و RAISE.

### [[DECLARE]]

~~~text الأمر
DECLARE
  v_price numeric;
  v_order_id bigint;
~~~

قبل [[BEGIN]]، بنعرّف المتغيرات اللي هنحتاجها: اسم ونوع، وكل واحد بـ [[;]]. الـ [[v_]] عرف = variable. قيمتهم في الأول NULL.

---

## ٤. الخطوة الأولى: خصم المخزون

~~~text الأمر
  UPDATE products SET stock = stock - p_qty
  WHERE id = p_product_id AND stock >= p_qty
  RETURNING price INTO v_price;
~~~

- [[SET stock = stock - p_qty]]: اخصم الكمية من القيمة الحالية.
- [[AND stock >= p_qty]]: بس لو المخزون كفاية. ده الـ atomic UPDATE من درسه: الفحص والخصم في أمر واحد، فطلبين في نفس اللحظة مش هيبيعوا آخر قطعة مرتين.
- [[RETURNING price INTO v_price]]: [[RETURNING]] بيرجّع عمود من الصف اللي اتعدّل، و [[INTO]] بيحطه في المتغير بدل ما يعرضه.

---

## ٥. [[IF NOT FOUND THEN RAISE EXCEPTION 'OUT_OF_STOCK'; END IF;]]

- [[FOUND]] متغير جاهز في plpgsql: [[true]] لو آخر أمر أثّر في صف واحد على الأقل. فـ [[NOT FOUND]] = الـ UPDATE معدّلش ولا صف: يا إما المنتج خلصان، يا إما مش موجود أصلًا.
- [[RAISE EXCEPTION 'OUT_OF_STOCK']]: وقّف الدالة فورًا وارمي error بالرسالة دي. أي حاجة حصلت قبلها في نفس الـ transaction بتترجع.
- [[END IF;]] قفلة الـ IF.

---

## ٦. الخطوة التانية والتالتة: الأوردر وبنده

~~~text الأمر
  INSERT INTO orders (user_id, total) VALUES (p_user_id, v_price * p_qty)
  RETURNING id INTO v_order_id;
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (v_order_id, p_product_id, p_qty, v_price);
  RETURN v_order_id;
END;
$$;
~~~

- أوردر جديد إجماليه [[v_price * p_qty]]، و [[status]] مش مكتوب فبياخد الـ DEFAULT [['pending']].
- [[RETURNING id INTO v_order_id]]: خد رقم الأوردر اللي اتولّد في المتغير.
- البند بنفس رقم الأوردر، وبالسعر اللي اتقرا وقت الخصم (مش سعر ممكن يتغير بعدين).
- [[RETURN v_order_id;]]: ده اللي الدالة بترجّعه للي ناداها.

---

## ٧. [[SELECT place_order((SELECT id FROM users LIMIT 1), 2, 3);]]

الـ argument الأول subquery بيجيب id أي يوزر ([[LIMIT 1]] من غير ORDER BY = أي صف، مش بالضرورة «الأول»، هنا طلع Ali). والتاني منتج رقم ٢ (Mug)، والتالت ٣ قطع.

~~~text الناتج
 place_order
-------------
           8
(1 row)
~~~

رجّعت رقم الأوردر الجديد. ونتأكد إن التلات خطوات حصلت:

~~~text الناتج
SELECT id, status, total FROM orders WHERE id = 8;
 id | status  | total
----+---------+--------
  8 | pending | 360.00

SELECT * FROM order_items WHERE order_id = 8;
 order_id | product_id | quantity | unit_price
----------+------------+----------+------------
        8 |          2 |        3 |     120.00

SELECT id, name, stock FROM products WHERE id = 2;
 id | name | stock
----+------+-------
  2 | Mug  |    12
~~~

١٢٠ × ٣ = ٣٦٠، والمخزون ١٥ بقى ١٢.

---

## ٨. اللي بيحصل في الـ «جرّب»: لما حاجة تفشل

### منتج خلصان

~~~text الناتج
SELECT count(*) FROM orders;   →  8

SELECT place_order((SELECT id FROM users LIMIT 1), (SELECT id FROM products WHERE stock = 0 LIMIT 1), 1);
ERROR:  OUT_OF_STOCK
CONTEXT:  PL/pgSQL function place_order(uuid,bigint,integer) line 10 at RAISE

SELECT count(*) FROM orders;   →  8
~~~

اقرا الـ [[CONTEXT]]: اسم الدالة وأنواع الـ parameters، و [[line 10]] = السطر العاشر من جسم الدالة: العد بيبدأ من باقي سطر [[$$]] نفسه (سطر ١ فاضي)، فـ [[DECLARE]] سطر ٢ و [[RAISE]] سطر ١٠. العدد فضل ٨: الـ UPDATE معدّلش حاجة، والـ RAISE وقّفها قبل أي INSERT. ونفس الـ error بالظبط لو بعت product_id مش موجود (999)، لأن الـ UPDATE برضه مش هيلاقي صف.

### فشل **بعد** ما المخزون اتخصم

دي التجربة اللي بتوريك قيمة الـ transaction. نبعت يوزر مش موجود: الـ UPDATE هينجح ويخصم، وبعده الـ INSERT في orders هيفشل بالـ foreign key:

~~~text الناتج
SELECT place_order('00000000-0000-0000-0000-000000000000', 2, 1);
ERROR:  insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"
DETAIL:  Key (user_id)=(00000000-0000-0000-0000-000000000000) is not present in table "users".
CONTEXT:  SQL statement "INSERT INTO orders (user_id, total) VALUES (p_user_id, v_price * p_qty)
  RETURNING id"
PL/pgSQL function place_order(uuid,bigint,integer) line 12 at SQL statement

SELECT stock FROM products WHERE id = 2;   →  12
~~~

المخزون لسه ١٢ مش ١١. الخصم اللي حصل في السطر الأول اترجع، لأن الدالة كلها جوه الـ transaction بتاعة الأمر اللي ناداها. ده بالظبط اللي مش هتاخده لو عملت التلات خطوات كـ ٣ queries منفصلة من الكود من غير transaction.

### نوع غلط

~~~text SELECT place_order((SELECT id FROM users LIMIT 1), 2, 'x');
ERROR:  invalid input syntax for type integer: "x"
~~~

الـ parameters ليها أنواع، فالغلطة بتتمسك قبل ما الدالة تبدأ أصلًا.

---

## ٩. دالة بترجّع جدول: [[RETURNS TABLE]]

الدالتين في المثال بيرجّعوا قيمة واحدة. عشان ترجّع **صفوف**، الـ return بيبقى [[RETURNS TABLE (عمود نوع, ...)]]، وبتتنادى في [[FROM]] كأنها جدول. مثال تاني غير اللي في التمرين: أوردرات يوزر بإيميله.

~~~text الأمر
CREATE FUNCTION orders_of(p_email text)
RETURNS TABLE (order_id bigint, status text, total numeric)
LANGUAGE sql STABLE AS $$
  SELECT o.id, o.status, o.total
  FROM orders o JOIN users u ON u.id = o.user_id
  WHERE u.email = p_email
  ORDER BY o.id;
$$;
~~~

~~~text الناتج
SELECT * FROM orders_of('you@example.com') WHERE status = 'paid';
 order_id | status | total
----------+--------+--------
        1 | paid   | 500.00
~~~

- الأعمدة اللي في [[RETURNS TABLE]] لازم تطابق أعمدة الـ SELECT جوه بالعدد والترتيب والنوع.
- [[SELECT * FROM orders_of(...)]] بيفرد الأعمدة، وتقدر تحط عليها WHERE و JOIN. أما [[SELECT orders_of(...)]] من غير FROM بيرجّع كل صف في خانة واحدة: [[(1,paid,500.00)]].

---

## الخلاصة

| | [[LANGUAGE sql]] | [[LANGUAGE plpgsql]] |
|---|---|---|
| الجسم | استعلام (أو كام استعلام) | بلوك [[DECLARE]] / [[BEGIN]] / [[END]] |
| بترجّع | نتيجة آخر استعلام | اللي بعد [[RETURN]] |
| متغيرات و IF و RAISE | لأ | أيوه |
| مثالنا | [[user_spent]] | [[place_order]] |

- الـ parameters بـ [[p_]] والمتغيرات بـ [[v_]]، عشان ميتلخبطوش مع أسماء الأعمدة.
- [[STABLE]] للي بيقرا بس، والافتراضي [[VOLATILE]] للي بيعدّل (زي place_order).
- [[RETURNING ... INTO]] يحط نتيجة أمر في متغير، و [[FOUND]] يقولك الأمر لمس صفوف ولا لأ.
- أي error جوه الدالة (RAISE أو constraint) بيرجّع **كل** اللي عملته، حتى الخطوات اللي نجحت قبله.
- [[RETURNS TABLE (...)]] عشان ترجّع صفوف وتتنادى في FROM.`,
          lines: [
            "دالة بتاخد id يوزر وترجّع رقم،",
            "SQL عادي، و STABLE: بتقرا بس.",
            "مجموع مدفوعاته (أو صفر)،",
            "للأوردرات المدفوعة والمشحونة بتاعته.",
            "قفلة الكود.",
            "استخدمها في SELECT زي أي دالة.",
            "دالة بتعمل أوردر: يوزر ومنتج وكمية،",
            "بترجّع رقم الأوردر، ومكتوبة بـ plpgsql.",
            "المتغيرات:",
            "سعر المنتج،",
            "ورقم الأوردر الجديد.",
            "البداية.",
            "اخصم المخزون،",
            "بشرط يكون كفاية (atomic UPDATE)،",
            "وحط السعر في المتغير.",
            "لو مفيش صف اتعدّل (المنتج خلصان أو مش موجود):",
            "وقّف وارمي error، وكل حاجة ترجع.",
            "نهاية الـ IF.",
            "اعمل الأوردر بالإجمالي،",
            "وخد رقمه.",
            "ضيف البند،",
            "بنفس السعر اللي اتخصم بيه.",
            "رجّع رقم الأوردر.",
            "النهاية.",
            "قفلة الكود.",
            "ناديها: أول يوزر، ومنتج رقم ٢، و٣ قطع."
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
            starter: R`CREATE FUNCTION top_products(p_limit int) RETURNS bigint
LANGUAGE sql STABLE AS $$
  SELECT sum(quantity) FROM order_items;
$$;
SELECT * FROM top_products(3);`,
            expect: [["Pen",6], ["Mug",4], ["T-shirt",3]],
            solution: R`CREATE FUNCTION top_products(p_limit int)
RETURNS TABLE (name text, sold bigint)
LANGUAGE sql STABLE AS $$
  SELECT p.name, sum(oi.quantity)::bigint AS sold
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY p.name
  ORDER BY sold DESC, p.name
  LIMIT p_limit;
$$;
SELECT * FROM top_products(3);`
          }
        },
        {
          cmd: "generated columns",
          title: "عمود بيتحسب لوحده من أعمدة تانية",
          desc: R`[[GENERATED ALWAYS AS (تعبير) STORED]] بيعمل عمود قيمته بتتحسب من أعمدة تانية في نفس الصف، وبتتخزن وتتحدث لوحدها مع كل INSERT و UPDATE. محدش يقدر يكتب فيه بإيده.

مثال: [[line_total]] في order_items = الكمية × السعر. بدل ما تحسبه في كل استعلام أو تثق إن الكود بعته صح، القاعدة بتحسبه. وتقدر تعمل عليه index زي أي عمود.

الشرط: التعبير يعتمد على أعمدة نفس الصف بس، وبدوال IMMUTABLE. مينفعش [[now()]] ولا subquery ولا جدول تاني.`,
          example: R`ALTER TABLE order_items
  ADD COLUMN line_total numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED;
SELECT order_id, quantity, unit_price, line_total FROM order_items ORDER BY order_id LIMIT 3;
UPDATE order_items SET quantity = 3 WHERE order_id = 1 AND product_id = 2 RETURNING line_total;
UPDATE order_items SET line_total = 1;
ALTER TABLE users ADD COLUMN email_domain text GENERATED ALWAYS AS (split_part(email, '@', 2)) STORED;
CREATE INDEX users_email_domain_idx ON users (email_domain);`,
          try: R`ضيف لجدول users عمود [[email_normalized]] generated من [[lower(trim(email))]] واعمل عليه unique index. جرّب تضيف يوزر إيميله [['  YOU@example.com']]. وبعدين جرّب تعمل عمود generated من [[now() - created_at]] وشوف الـ error.`,
          sol: R`اليوزر الجديد هيترفض بـ [[duplicate key value violates unique constraint "users_email_normalized_uq"]]، لأن العمود المحسوب بقى [[you@example.com]]، وده موجود قبل كده. يعني القاعدة نفسها بقت تمنع التكرار مهما الكود بعت الإيميل بأي شكل. وده بديل للـ expression index [[ON users (lower(email))]] اللي في درس constraints، والفرق إن القيمة المتطبّعة بقت عمود تقدر تعمل عليه SELECT و WHERE مباشرة.

والعمود من [[now() - created_at]] هيفشل بـ [[generation expression is not immutable]]، لأن [[now()]] قيمتها بتتغير، والعمود المخزن مش هيتحدث لوحده كل ثانية. أي حاجة معتمدة على الوقت الحالي احسبها في SELECT أو اعملها view.`,
          solCode: R`ALTER TABLE users
  ADD COLUMN email_normalized text GENERATED ALWAYS AS (lower(trim(email))) STORED;
CREATE UNIQUE INDEX users_email_normalized_uq ON users (email_normalized);

INSERT INTO users (email, name) VALUES ('  YOU@example.com', 'Copy');

ALTER TABLE users ADD COLUMN age interval GENERATED ALWAYS AS (now() - created_at) STORED;`,
          flag: "script",
          deep: {
            why: "القيم المحسوبة لما تتخزن من الكود بتختلف عن الحقيقة مع الوقت: حد عدّل الكمية من لوحة الأدمن ونسي يعدّل line_total. والحساب في كل SELECT بيتكرر ومبيتعملوش index. الـ generated column بيجمع الاتنين: القيمة دايمًا صح، ومتخزنة فتتفلتر وتترتب وتتعمل عليها index.",
            how: R`[[STORED]] معناها القيمة بتتحسب وقت الكتابة وتتخزن على الديسك. Postgres 18 ضاف كمان [[VIRTUAL]] (بتتحسب وقت القراية ومبتاخدش مساحة) وخلاه الافتراضي. بس الـ lab على Postgres 17 فاكتب STORED، وده اللي بتحتاجه لو هتعمل index.

الإضافة على جدول موجود ([[ALTER TABLE ... ADD COLUMN ... STORED]]) بتعيد كتابة الجدول كله عشان تحسب القيمة لكل صف القديم، وده بياخد قفل. على جدول كبير في الإنتاج خد بالك (درس تغييرات آمنة في الإنتاج في تاب «PostgreSQL»).

مينفعش تكتب فيه: [[UPDATE ... SET line_total = 1]] بيطلع [[column "line_total" can only be updated to DEFAULT]]. وفي INSERT متبعتوش خالص.

الاستخدامات الشائعة: مجموع من أعمدة، أو نسخة متطبّعة من نص (lowercase، أو من غير تشكيل)، أو [[tsvector]] للبحث (الدرس الجاي)، أو استخراج قيمة من jsonb عشان تعمل عليها index عادي.

في Prisma: العمود ده بيتعرف في الـ schema عادي، بس لازم تعدّل الـ migration بإيدك وتكتب الـ GENERATED، لأن Prisma مبيعرفش يولّده. ومتبعتوش في create، أو استخدم [[@default(dbgenerated())]] عشان Prisma ميطلبوش منك.`,
            when: "قيمة بتتحسب من نفس الصف وبتتقري أو بتتفلتر كتير: إجماليات، ونصوص متطبّعة للبحث والـ unique، و tsvector، ومفاتيح من jsonb.",
            mistakes: R`تحاول تستخدم [[now()]] أو جدول تاني. تبعت قيمة للعمود في INSERT من الكود (Prisma أو غيره) فيطلع error. تضيفه على جدول فيه ملايين الصفوف في وقت الذروة. تعمل generated column لحاجة بتتحسب مرة واحدة ومش بتتفلتر بيها، فتخزن حاجة ملهاش لازمة.`
          },
          teach: R`## الفكرة: عمود قيمته معادلة، مش داتا بتتبعت

العمود العادي بيتملي باللي INSERT أو UPDATE يبعته. الـ generated column بيتملي بمعادلة من أعمدة تانية في نفس الصف، والقاعدة هي اللي بتحسبها في كل مرة الصف يتكتب. المثال بيعمل عمودين كده، ويوريك إن محدش يقدر يكتب فيهم بإيده.

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على المتجر الصغير بتاع الدروس اللي فاتت. ده [[order_items]] قبل ما نبدأ:

~~~text order_items
 order_id | product_id | quantity | unit_price
----------+------------+----------+------------
        1 |          2 |        2 |     120.00
        2 |          4 |        1 |     650.00
        3 |          2 |        1 |     120.00
        4 |          1 |        1 |     250.00
        4 |          2 |        1 |     120.00
        5 |          5 |        2 |      15.00
        6 |          4 |        2 |     650.00
~~~

---

## ١. [[ALTER TABLE order_items ADD COLUMN line_total ... STORED;]]

~~~text الأمر
ALTER TABLE order_items
  ADD COLUMN line_total numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED;
~~~

| الحتة | معناها |
|---|---|
| [[ALTER TABLE order_items ADD COLUMN line_total]] | ضيف عمود اسمه [[line_total]] لجدول موجود |
| [[numeric(12,2)]] | رقم بخانتين عشريتين. [[12]] مش [[10]] زي unit_price، عشان حاصل الضرب ممكن يبقى أكبر من السعر |
| [[GENERATED ALWAYS]] | القيمة **دايمًا** بتتولد، ومحدش يكتبها |
| [[AS (quantity * unit_price)]] | المعادلة، بين قوسين. بتشوف أعمدة نفس الصف بس |
| [[STORED]] | القيمة بتتحسب وقت الكتابة وتتخزن على الديسك زي أي عمود |

~~~text الناتج
ALTER TABLE
~~~

الأمر ده حسب القيمة لكل الصفوف الموجودة حالًا، وده معناه إنه أعاد كتابة الجدول كله (على جدول بملايين الصفوف ده بياخد وقت وقفل، شوف الـ deep). و [[\d order_items]] بيوريك المعادلة:

~~~text \d order_items (سطر العمود)
 line_total | numeric(12,2) |  |  | generated always as ((quantity::numeric * unit_price)) stored
~~~

لاحظ [[quantity::numeric]]: الكمية [[integer]] والسعر [[numeric]]، فـ Postgres حوّل الكمية لـ numeric قبل الضرب عشان النوعين يبقوا واحد. حط التحويل ده بنفسه وكتبه في التعريف.

---

## ٢. [[SELECT order_id, quantity, unit_price, line_total FROM order_items ORDER BY order_id LIMIT 3;]]

~~~text الناتج
 order_id | quantity | unit_price | line_total
----------+----------+------------+------------
        1 |        2 |     120.00 |     240.00
        2 |        1 |     650.00 |     650.00
        3 |        1 |     120.00 |     120.00
(3 rows)
~~~

٢ × ١٢٠ = ٢٤٠. القيمة موجودة من غير ما حد عمل INSERT فيها، وبتتقري زي أي عمود عادي.

---

## ٣. [[UPDATE order_items SET quantity = 3 WHERE order_id = 1 AND product_id = 2 RETURNING line_total;]]

غيّرنا الكمية بس، و [[RETURNING]] بيرجّع line_total بعد الكتابة:

~~~text الناتج
 line_total
------------
     360.00
(1 row)

UPDATE 1
~~~

٣ × ١٢٠ = ٣٦٠. اتحسب تاني لوحده، لأن أي UPDATE على الصف بيعيد حساب المعادلة.

---

## ٤. [[UPDATE order_items SET line_total = 1;]]

ده السطر اللي **مقصود يفشل**:

~~~text الناتج
ERROR:  column "line_total" can only be updated to DEFAULT
DETAIL:  Column "line_total" is a generated column.
~~~

«العمود ده ممكن يتحدّث لـ DEFAULT بس». يعني القيمة الوحيدة المسموحة هي الكلمة [[DEFAULT]] اللي معناها «احسبه انت»:

~~~text UPDATE order_items SET line_total = DEFAULT WHERE order_id = 1 RETURNING line_total;
 line_total
------------
     360.00
~~~

ونفس الحماية في INSERT:

~~~text INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total) VALUES (5, 1, 1, 250, 250);
ERROR:  cannot insert a non-DEFAULT value into column "line_total"
DETAIL:  Column "line_total" is a generated column.
~~~

حتى لو القيمة اللي بعتها صح (١ × ٢٥٠ = ٢٥٠)، اترفضت. الحل: متبعتش العمود ده خالص في INSERT.

---

## ٥. [[ALTER TABLE users ADD COLUMN email_domain text GENERATED ALWAYS AS (split_part(email, '@', 2)) STORED;]]

نفس الفكرة بدالة نصوص. [[split_part(نص, فاصل, رقم)]] بتقطّع النص عند الفاصل وترجّع الحتة رقم كذا (العد من ١):

~~~text SELECT split_part('you@example.com', '@', 1), split_part('you@example.com', '@', 2);
 split_part | split_part
------------+-------------
 you        | example.com
~~~

فالعمود الجديد = اللي بعد [[@]]:

~~~text SELECT email, email_domain FROM users;
      email       | email_domain
------------------+--------------
 you@example.com  | example.com
 sara@example.com | example.com
 omar@example.com | example.com
~~~

وليه مسموح هنا؟ لأن [[split_part]] دالة **IMMUTABLE**: نفس المدخل بيرجّع نفس المخرج دايمًا. وده شرط أي معادلة في generated column (الـ try بيوريك إيه اللي بيحصل مع دالة مش كده).

---

## ٦. [[CREATE INDEX users_email_domain_idx ON users (email_domain);]]

عشان العمود [[STORED]]، القيمة موجودة على الديسك، فتقدر تعمل عليها index عادي:

~~~text الناتج
CREATE INDEX
~~~

فاستعلام زي [[WHERE email_domain = 'example.com']] (كل يوزرز شركة معينة) يقدر يستخدم الـ index بدل ما يقطّع كل إيميل في الجدول.

---

## ٧. اللي بيحصل في الـ «جرّب»

### إيميل متطبّع و unique

~~~text الناتج
ALTER TABLE users
  ADD COLUMN email_normalized text GENERATED ALWAYS AS (lower(trim(email))) STORED;
ALTER TABLE

CREATE UNIQUE INDEX users_email_normalized_uq ON users (email_normalized);
CREATE INDEX

INSERT INTO users (email, name) VALUES ('  YOU@example.com', 'Copy');
ERROR:  duplicate key value violates unique constraint "users_email_normalized_uq"
DETAIL:  Key (email_normalized)=(you@example.com) already exists.
~~~

- [[trim]] بيشيل المسافات من الأول والآخر، و [[lower]] بيصغّر الحروف. فـ [['  YOU@example.com']] بقت [[you@example.com]].
- الـ [[DETAIL]] بيوريك القيمة المحسوبة نفسها اللي اتكررت.
- الـ UNIQUE اللي على [[email]] الأصلي مكانش هيمسكها، لأن النص مختلف بالحرف.

### دالة مش IMMUTABLE

~~~text الناتج
ALTER TABLE users ADD COLUMN age interval GENERATED ALWAYS AS (now() - created_at) STORED;
ERROR:  generation expression is not immutable
~~~

[[now()]] قيمتها بتتغير كل لحظة، والعمود المخزن مش هيتحسب تاني غير لما الصف يتعدّل. فـ «عمر الحساب» كان هيبقى صح يوم الإنشاء وغلط بعده. Postgres بيرفضها من الأول.

---

## ٨. [[STORED]] ولا [[VIRTUAL]]؟

| | [[STORED]] | [[VIRTUAL]] |
|---|---|---|
| بيتحسب إمتى | وقت الكتابة | وقت القراية |
| بياخد مساحة | أيوه | لأ |
| index عليه | أيوه | لأ |
| موجود من | Postgres 12 | Postgres 18، وبقى الافتراضي لو مكتبتش حاجة |

اتجرّب على الاتنين: على Postgres 18 عمود من غير كلمة STORED اتعمل VIRTUAL، و [[CREATE INDEX]] عليه طلع [[ERROR: indexes on virtual generated columns are not supported]]. وعلى Postgres 16 نفس الأمر من غير STORED طلع [[syntax error]]. وحسب الـ release notes الـ VIRTUAL اتضاف في 18، فـ Postgres 17 (اللي في الـ lab وفي تمارين الصفحة) زي 16 في النقطة دي، فاكتب [[STORED]] دايمًا.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[GENERATED ALWAYS AS (quantity * unit_price) STORED]] | عمود محسوب من نفس الصف ومتخزن |
| [[UPDATE ... SET quantity = 3]] | line_total بيتحسب تاني لوحده |
| [[UPDATE ... SET line_total = 1]] | error: مسموح بـ DEFAULT بس |
| [[split_part(email, '@', 2)]] | معادلة بدالة IMMUTABLE |
| [[CREATE INDEX ... (email_domain)]] | index على عمود محسوب، لأنه STORED |

- المعادلة تشوف أعمدة **نفس الصف** بس، وبدوال IMMUTABLE: لا [[now()]] ولا subquery ولا جدول تاني.
- متبعتش العمود ده في INSERT ولا UPDATE، حتى لو القيمة صح.
- لو هتعمل index أو بتشتغل على Postgres أقدم من 18: [[STORED]].`,
          lines: [
            "ضيف لـ order_items عمود:",
            "line_total = الكمية × السعر، بيتحسب ويتخزن لوحده.",
            "القيمة موجودة من غير ما حد يحسبها.",
            "غيّر الكمية: line_total اتحدث لوحده.",
            "error: العمود ده محدش يكتب فيه.",
            "عمود دومين الإيميل محسوب من الإيميل،",
            "وعليه index عشان الفلترة بالدومين تبقى سريعة."
          ]
        }
      ]
    },
    {
      t: "البحث: full-text و pg_trgm والعربي",
      l: 2,
      n: "خانة البحث اللي في كل موقع: بحث بالكلمات مترتب بالأهمية، وبحث بيستحمل الأخطاء الإملائية، وتطبيع العربي عشان «أحمد» تلاقي «احمد»",
      items: [
        {
          cmd: "full-text search",
          title: "بحث بالكلمات مترتب بالأهمية بدل ILIKE",
          desc: R`[[ILIKE '%docker run%']] بيدوّر على النص ده بالحرف، فـ «running docker» مش هتطلع، ومع جدول كبير بيقرا كل الصفوف. الـ full-text search بيفهم الكلمات: بيقطّع النص لكلمات، ويرجّع كل كلمة لأصلها (running و runs بيبقوا run)، ويشيل الكلمات اللي ملهاش معنى (the و a)، وبيرتب النتايج بالأهمية.

الأجزاء: [[tsvector]] النص بعد التقطيع (بيتخزن في عمود generated وعليه GIN index)، و [[tsquery]] كلام البحث، و [[@@]] بيقول «مطابق ولا لأ»، و [[ts_rank]] بيدّي درجة للترتيب.

و [[websearch_to_tsquery]] بياخد اللي اليوزر كتبه في خانة البحث زي ما هو، وبيفهم [["عبارة بالظبط"]] و [[-كلمة]] للاستبعاد و [[or]]، ومبيرميش error أبدًا مهما اليوزر كتب.`,
          example: R`CREATE TABLE articles (
  id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title  text NOT NULL,
  body   text NOT NULL,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('english', body), 'B')
  ) STORED
);
CREATE INDEX articles_search_idx ON articles USING gin (search);
INSERT INTO articles (title, body) VALUES
  ('Running Postgres in Docker', 'How to run a database container with volumes and backups'),
  ('Indexes explained', 'Why queries get slow and how a B-tree index helps when running reports'),
  ('Docker volumes', 'Keep your data when the container is removed');
SELECT id, title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('english', 'docker run') q
WHERE search @@ q
ORDER BY rank DESC;
SELECT to_tsvector('english', 'Running containers ran quickly');
SELECT websearch_to_tsquery('english', '"docker volumes" -backup or index');
SELECT ts_headline('english', body, websearch_to_tsquery('english', 'slow reports')) FROM articles WHERE id = 2;`,
          try: R`دوّر على [[running]] وعلى [[containers]]، وقارن النتيجة بـ [[ILIKE '%running%']]. وبعدين جرّب [[to_tsquery('english', 'docker run')]] (من غير websearch) وشوف بيحصل إيه، وجرّب [[websearch_to_tsquery('english', 'docker -backups')]].`,
          sol: R`[[running]] هترجع المقالتين الأولى والتانية، لأن البحث بقى [['run']] بعد الـ stemming، والأولى فيها Running و run، والتانية فيها running. أما [[ILIKE '%running%']] هترجع نفس الاتنين هنا بالصدفة، بس لو دوّرت بـ [[run]] الـ ILIKE هيجيب أي كلمة فيها run (زي runtime) و full-text مش هيجيبها. و [[containers]] هترجع الأولى والتالتة (container).

[[to_tsquery('english', 'docker run')]] هيطلع [[syntax error in tsquery: "docker run"]]، لأن to_tsquery محتاجة operators صريحة زي [['docker & run']]. عشان كده متحطش اللي اليوزر كتبه في to_tsquery أبدًا، استخدم websearch_to_tsquery أو plainto_tsquery.

و [[docker -backups]] هترجع المقالة التالتة بس (Docker volumes)، لأن الأولى فيها backups فاتشالت.

خد بالك من الحاجة الغريبة: [[ran]] مش بتبقى run، لأن الـ stemmer بيقطع نهايات الكلام بس، مبيعرفش الأفعال الشاذة.`,
          solCode: R`SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'running');
SELECT title FROM articles WHERE title ILIKE '%running%' OR body ILIKE '%running%';
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'containers');
SELECT to_tsquery('english', 'docker run');
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'docker -backups');`,
          flag: "script",
          deep: {
            why: "خانة البحث موجودة في كل منتج تقريبًا: منتجات، ومقالات، وتذاكر دعم. ILIKE مع % في الأول مبيستخدمش B-tree index، ومبيفهمش صيغ الكلمة، ومبيرتبش. والحل مش لازم يبقى Elasticsearch من أول يوم: Postgres فيه بحث كويس كفاية لأغلب المشاريع.",
            how: R`[[to_tsvector('english', text)]] بيقطّع ويعمل stemming ويشيل الـ stop words، وبيحفظ مكان كل كلمة: [['contain':2 'quick':4 'ran':3 'run':1]]. أول argument هو الـ configuration (اللغة)، ولازم يبقى نفسه في التخزين والبحث.

[[setweight(..., 'A')]] بيدّي كلمات العنوان وزن أعلى من كلمات الـ body، فـ ts_rank بيطلّع المقالة اللي الكلمة في عنوانها الأول. الأوزان A و B و C و D.

العمود [[GENERATED ... STORED]] بيحسب الـ tsvector مرة وقت الكتابة بدل كل بحث، و [[GIN]] index بيعمل «inverted index»: لكل كلمة، قايمة الصفوف اللي فيها. فالبحث بيروح للكلمة على طول. ومن غير العمود ده ممكن تعمل expression index على [[to_tsvector('english', title || ' ' || body)]]، بس لازم تكتب نفس التعبير بالظبط في كل WHERE.

[[websearch_to_tsquery]] للي اليوزر بيكتبه. [[plainto_tsquery]] بيعمل AND بين كل الكلمات. [[to_tsquery]] للي انت بتكتبه في الكود بـ operators: [[&]] و [[|]] و [[!]] و [[<->]] (ورا بعض) و [[:*]] (prefix: [['dock:*']] للـ autocomplete).

[[ts_rank]] بيحسب على الصفوف اللي طابقت بس، فهو مش بيستخدم index. عشان كده الفلترة بـ [[@@]] الأول (بالـ index) وبعدين الترتيب. و [[ts_headline]] بيطلّع جزء من النص والكلمات المطابقة جوه [[<b>]] للعرض (خد بالك: HTML، اعمله escape أو sanitize قبل ما تحطه في الصفحة).

الحدود: مفيش تسامح مع الأخطاء الإملائية (ده pg_trgm، الدرس الجاي)، والعربي محتاج شغل زيادة (نفس الدرس). ولو محتاج facets وتصحيح إملائي وsynonyms وملايين المستندات، ساعتها فكّر في Meilisearch أو Typesense أو Elasticsearch.`,
            when: "بحث في نصوص طويلة (مقالات، وأوصاف منتجات، وتذاكر)، ولما محتاج ترتيب بالأهمية. للأسماء القصيرة والأكواد والبحث اللي لازم يستحمل أخطاء إملائية، pg_trgm أنسب، وكتير من المشاريع بتستخدم الاتنين مع بعض.",
            mistakes: R`to_tsquery على كلام اليوزر فأي علامة غريبة تطلّع error 500. لغة مختلفة في التخزين والبحث ([['english']] هنا و [['simple']] هناك) فمفيش حاجة تطابق. تحسب to_tsvector جوه WHERE من غير index فكل بحث يقرا الجدول كله. الترتيب بـ ts_rank على مليون صف طابقوا. [[ts_headline]] بيطلع HTML وبتحطه في الصفحة من غير escape.`
          },
          teach: R`## الفكرة: النص بيتحوّل لقايمة كلمات، والبحث بيتحوّل لشرط عليها

الـ full-text search في Postgres ماشي على خطوتين: النص المتخزن بيتحوّل لـ [[tsvector]] (قايمة الكلمات بعد ما ترجع لأصلها)، وكلام البحث بيتحوّل لـ [[tsquery]] (الكلمات المطلوبة ومعاها AND و OR و NOT). و [[@@]] بيقول هل الاتنين بيتطابقوا. المثال بيبني جدول مقالات فيه كل ده، وبعدين بيوريك كل حتة لوحدها.

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker.

---

## ١. [[CREATE TABLE articles (...)]] وعمود [[search]]

~~~text الأمر
CREATE TABLE articles (
  id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title  text NOT NULL,
  body   text NOT NULL,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('english', body), 'B')
  ) STORED
);
~~~

أول ٣ أعمدة عادية. الرابع [[search]] هو المهم: نوعه [[tsvector]]، وهو generated column (الدرس اللي فات) بيتحسب لوحده من title و body. نفك المعادلة من جوه لبرة:

### الخطوة ١: [[to_tsvector('english', title)]]

بتاخد نص وترجّع tsvector. أول argument اسمه الـ **configuration**: قواعد أنهي لغة هتتطبق. جرّبها على عنوان المقالة الأولى:

~~~text SELECT to_tsvector('english', 'Running Postgres in Docker');
          to_tsvector
-------------------------------
 'docker':4 'postgr':2 'run':1
~~~

اللي حصل للنص:

| الكلمة | بقت | ليه |
|---|---|---|
| Running | [['run']] | **stemming**: شيل النهاية ([[ing]]) ورجّعها لأصلها |
| Postgres | [['postgr']] | نفس القاعدة: الـ stemmer شاف [[es]] كنهاية جمع وقصها، حتى لو مش كلمة إنجليزي حقيقية |
| in | اختفت | **stop word**: كلمة متكررة في كل نص ملهاش قيمة في البحث |
| Docker | [['docker']] | حروف صغيرة بس |

والرقم بعد [[:]] هو **مكان** الكلمة في النص الأصلي (in كانت رقم ٣، اتشالت بس الترقيم فضل). المكان ده بيستخدم في البحث عن كلمات ورا بعض.

### الخطوة ٢: [[setweight(..., 'A')]]

بتعلّم كل كلمة في الـ tsvector بوزن من ٤: [[A]] و [[B]] و [[C]] و [[D]] (A الأعلى):

~~~text SELECT setweight(to_tsvector('english', 'Running Postgres in Docker'), 'A');
            setweight
----------------------------------
 'docker':4A 'postgr':2A 'run':1A
~~~

كلمات العنوان بوزن A، وكلمات الـ body بوزن B. فالمقالة اللي الكلمة في **عنوانها** هتطلع أعلى في الترتيب.

### الخطوة ٣: [[||]]

مع الـ tsvector، [[||]] بيدمج الاتنين في tsvector واحد.

### الخطوة ٤: [[STORED]]

النتيجة بتتحسب مرة وقت INSERT أو UPDATE وتتخزن، بدل ما تتحسب مع كل بحث. ده شكل العمود بعد ما نضيف المقالات (الخطوة ٣ تحت):

~~~text SELECT id, search FROM articles ORDER BY id;
 id | search
----+------------------------------------------------------------------------------------
  1 | 'backup':14B 'contain':10B 'databas':9B 'docker':4A 'postgr':2A 'run':1A,7B 'volum':12B
  2 | 'b':11B 'b-tree':10B 'explain':2A 'get':5B 'help':14B 'index':1A,13B 'queri':4B 'report':17B 'run':16B 'slow':6B 'tree':12B
  3 | 'contain':8B 'data':5B 'docker':1A 'keep':3B 'remov':10B 'volum':2A
~~~

لاحظ [['run':1A,7B]] في المقالة الأولى: Running في العنوان (مكان ١، وزن A)، و run في الـ body (مكان ٧، وزن B). والترقيم بيكمل من العنوان للـ body. و [[B-tree]] اتقطعت ٣ حاجات: الكلمة كلها والحتتين.

---

## ٢. [[CREATE INDEX articles_search_idx ON articles USING gin (search);]]

[[USING gin]] نوع index غير الـ B-tree العادي. **GIN** = Generalized Inverted Index: بدل «لكل صف، الكلمات اللي فيه» (ده الـ tsvector)، بيخزن العكس: «لكل كلمة، الصفوف اللي فيها». فالبحث عن [['docker']] بيروح للكلمة على طول ويلاقي قايمة الصفوف [[1، 3]] من غير ما يلف على الجدول.

---

## ٣. [[INSERT INTO articles (title, body) VALUES ...]]

٣ مقالات. [[id]] و [[search]] مش مكتوبين: الأول بيتولد، والتاني بيتحسب.

~~~text الناتج
INSERT 0 3
~~~

---

## ٤. البحث نفسه

~~~text الأمر
SELECT id, title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('english', 'docker run') q
WHERE search @@ q
ORDER BY rank DESC;
~~~

### [[websearch_to_tsquery('english', 'docker run')]]

بتحوّل كلام اليوزر لـ tsquery، بنفس قواعد اللغة:

~~~text SELECT websearch_to_tsquery('english', 'docker run');
 websearch_to_tsquery
----------------------
 'docker' & 'run'
~~~

[[&]] = AND: الكلمتين لازم يبقوا موجودين. ولاحظ إن [[run]] عدّت على الـ stemmer هي كمان، عشان تطابق [['run']] اللي في الـ tsvector.

### [[FROM articles, websearch_to_tsquery(...) q]]

الدالة بترجّع قيمة واحدة، وكتابتها في FROM بفاصلة بتخليها «جدول من صف واحد» اسمه [[q]]. فائدتها إنك تستخدم [[q]] مرتين (في WHERE وفي ts_rank) من غير ما تكتب الدالة مرتين.

### [[WHERE search @@ q]]

[[@@]] = «الـ tsvector ده بيطابق الـ tsquery ده؟». ده الشرط اللي بيستخدم الـ GIN index. على ٣ صفوف Postgres بيفضّل يقراهم على طول، فعشان نشوف الخطة بالـ index قفلنا الـ Seq Scan مؤقتًا ([[SET enable_seqscan = off]]، للتجربة بس):

~~~text EXPLAIN SELECT id FROM articles WHERE search @@ websearch_to_tsquery('english', 'docker run');
 Bitmap Heap Scan on articles
   Recheck Cond: (search @@ '''docker'' & ''run'''::tsquery)
   ->  Bitmap Index Scan on articles_search_idx
         Index Cond: (search @@ '''docker'' & ''run'''::tsquery)
~~~

### [[ts_rank(search, q) AS rank]] و [[ORDER BY rank DESC]]

[[ts_rank]] بيدّي كل صف مطابق درجة: قد إيه الكلمات موجودة، وبأنهي وزن. الأوزان الافتراضية: A = 1.0، و B = 0.4، و C = 0.2، و D = 0.1.

~~~text الناتج
 id |           title            |   rank
----+----------------------------+-----------
  1 | Running Postgres in Docker | 0.9898499
(1 row)
~~~

صف واحد بس، ليه؟ لأن الـ AND محتاج الكلمتين:

| المقالة | docker؟ | run؟ | النتيجة |
|---|---|---|---|
| ١ Running Postgres in Docker | أيوه (A) | أيوه (A و B) | طابقت |
| ٢ Indexes explained | لأ | أيوه (running) | لأ |
| ٣ Docker volumes | أيوه (A) | لأ | لأ |

والوزن بيبان لو الكلمة في عنوان مقالة وفي الـ body بتاع مقالة تانية. [[volumes]] في عنوان ٣ (وزن A) وفي الـ body بتاع ١ (وزن B):

~~~text نفس الاستعلام بكلمة 'volumes'
 id |           title            |    rank
----+----------------------------+------------
  3 | Docker volumes             |  0.6079271
  1 | Running Postgres in Docker | 0.24317084
~~~

نفس الكلمة مرة واحدة في الاتنين، بس ٠.٦٠٨ × ٠.٤ (وزن B) = ٠.٢٤٣. فالمقالة اللي الكلمة في عنوانها طلعت الأول.


---

## ٥. [[SELECT to_tsvector('english', 'Running containers ran quickly');]]

~~~text الناتج
              to_tsvector
---------------------------------------
 'contain':2 'quick':4 'ran':3 'run':1
~~~

running بقت run، و containers بقت contain، و quickly بقت quick. بس [[ran]] فضلت ran: الـ stemmer (اسمه Snowball) بيقص نهايات بقواعد ثابتة، مش قاموس، فميعرفش إن ran ماضي run. وقارنها بـ configuration اسمه [['simple']] (من غير stemming ولا stop words):

~~~text SELECT to_tsvector('simple', 'Running containers ran quickly');
 'containers':2 'quickly':4 'ran':3 'running':1
~~~

عشان كده الـ configuration لازم يبقى **نفسه** في التخزين وفي البحث: لو خزنت بـ english ودوّرت بـ simple، [['running']] مش هتلاقي [['run']].

---

## ٦. [[SELECT websearch_to_tsquery('english', '"docker volumes" -backup or index');]]

~~~text الناتج
            websearch_to_tsquery
--------------------------------------------
 'docker' <-> 'volum' & !'backup' | 'index'
~~~

| اللي اليوزر كتبه | بقى | معناه |
|---|---|---|
| [["docker volumes"]] بين علامتين | [['docker' <-> 'volum']] | [[<->]] = الكلمتين **ورا بعض** بالظبط (ده فايدة الأماكن في الـ tsvector) |
| [[-backup]] | [[!'backup']] | [[!]] = NOT، المقالة متكونش فيها الكلمة |
| [[or]] | الخط الرأسي اللي قبل [['index']] | OR |
| الباقي | [[&]] بينهم | AND |

يعني: (عبارة «docker volumes» ومن غير backup) **أو** index.

---

## ٧. [[SELECT ts_headline('english', body, websearch_to_tsquery('english', 'slow reports')) FROM articles WHERE id = 2;]]

[[ts_headline]] بتاخد النص الأصلي (مش الـ tsvector) والـ query، وترجّع النص والكلمات المطابقة معلّمة بـ [[<b>]]:

~~~text الناتج
 Why queries get <b>slow</b> and how a B-tree index helps when running <b>reports</b>
~~~

ده للعرض في صفحة النتايج. وده HTML، فلو النص نفسه جاي من يوزرز لازم يتعمله sanitize قبل ما يتحط في الصفحة.

---

## ٨. اللي بيحصل في الـ «جرّب»

~~~text الناتج
-- 'running'
           title
----------------------------
 Running Postgres in Docker
 Indexes explained

-- 'containers'
 Running Postgres in Docker
 Docker volumes

-- 'docker -backups'   →   'docker' & !'backup'
 Docker volumes

SELECT to_tsquery('english', 'docker run');
ERROR:  syntax error in tsquery: "docker run"
~~~

- [[containers]] بقت [['contain']]، فطابقت [[container]] المفرد في ١ و ٣.
- [[-backups]] اتعملها stemming لـ [['backup']]، فاستبعدت المقالة الأولى اللي فيها backups.
- [[to_tsquery]] محتاجة operators مكتوبة صريح ([['docker & run']])، فمسافة بين كلمتين = syntax error. عشان كده كلام اليوزر يروح لـ [[websearch_to_tsquery]] أو [[plainto_tsquery]] (اللي بيحط [[&]] بين كل الكلمات)، و [[to_tsquery]] للي انت بتكتبه في الكود، زي [[to_tsquery('english', 'dock:*')]] للـ prefix في الـ autocomplete.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[to_tsvector('english', نص)]] | نص ← كلمات بأصلها وأماكنها، من غير stop words |
| [[setweight(..., 'A')]] | وزن للكلمات (العنوان أعلى من الـ body) |
| عمود [[GENERATED ... STORED]] + [[gin]] index | يتحسب مرة، والبحث يروح للكلمة على طول |
| [[websearch_to_tsquery('english', كلام_اليوزر)]] | كلام البحث ← tsquery، ومبيرميش error |
| [[search @@ q]] | مطابق ولا لأ (بالـ index) |
| [[ts_rank(search, q)]] | درجة للترتيب، على الصفوف اللي طابقت بس |
| [[ts_headline(...)]] | النص والكلمات المطابقة جوه [[<b>]] |

- نفس الـ configuration ([['english']]) في التخزين والبحث، وإلا مفيش تطابق.
- الكلمات بتتطابق بأصلها: running = run، بس ran مش run.
- الكلمات في البحث بينها AND افتراضيًا.`,
          lines: [
            "جدول المقالات:",
            "رقم،",
            "عنوان،",
            "ومحتوى،",
            "وعمود البحث: tsvector بيتحسب لوحده،",
            "كلمات العنوان بوزن A وكلمات المحتوى بوزن B.",
            "وبيتخزن.",
            "قفلة.",
            "GIN index على عمود البحث.",
            "تلات مقالات:",
            "واحدة عن Docker و Postgres،",
            "وواحدة عن الـ indexes،",
            "وواحدة عن الـ volumes.",
            "المقالات ودرجة كل واحدة،",
            "والبحث جاي من كلام اليوزر زي ما هو،",
            "اللي طابقت بس (بالـ index)،",
            "والأهم الأول.",
            "شوف التقطيع: running بقت run، و ran فضلت ran، و quickly بقت quick.",
            "شوف بيفهم إيه: عبارة ورا بعض، واستبعاد، و or.",
            "جزء من النص والكلمات المطابقة معلّمة بـ <b>."
          ]
        },
        {
          cmd: "البحث بالعربي",
          title: "«أحمد» تلاقي «احمد»، و«محمد مصطفا» تلاقي «مُحَمَّد مصطفى»",
          desc: R`العربي فيه مشاكل الإنجليزي مفيهوش: نفس الاسم بيتكتب بـ «أحمد» و «احمد»، و «فاطمة» و «فاطمه»، و «مصطفى» و «مصطفي»، وممكن يكون فيه تشكيل أو تطويل (الـــقاهرة). لو قارنت النص زي ما هو، اليوزر اللي كتب «احمد» مش هيلاقي «أحمد».

الحل على خطوتين: تطبيع (normalization) للنص المتخزن ولكلام البحث بنفس الدالة: الهمزات كلها ا، والتاء المربوطة ه، والألف المقصورة ي، ومن غير تشكيل ولا تطويل. وبعدين للأخطاء الإملائية: extension [[pg_trgm]] بيقارن النصوص بالتشابه (similarity) بدل التطابق.

الدالة لازم تكون [[IMMUTABLE]] عشان تتحط في عمود generated وعليه index.`,
          example: R`CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE FUNCTION ar_normalize(t text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT translate(regexp_replace(lower(t), '[ً-ْـ]', '', 'g'), 'أإآٱةى', 'ااااهي');
$$;
SELECT ar_normalize('مُحَمَّد أحمد إبراهيم مدرسة مصطفى الـــقاهرة');
CREATE TABLE teachers (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name      text NOT NULL,
  name_norm text GENERATED ALWAYS AS (ar_normalize(name)) STORED
);
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
INSERT INTO teachers (name) VALUES ('أحمد إبراهيم'), ('مُحَمَّد مصطفى'), ('فاطمة الزهراء'), ('أسامة عبد الله');
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('فاطمه') || '%';
SELECT name, similarity(name_norm, ar_normalize('محمد مصطفا')) AS score
FROM teachers
WHERE name_norm % ar_normalize('محمد مصطفا')
ORDER BY score DESC;
SELECT name FROM teachers WHERE name LIKE '%احمد%';`,
          try: R`دوّر بـ [[اسامه]] (من غير همزة وبهاء) مرة بـ LIKE على name_norm ومرة بـ [[word_similarity]] و [[<%]]. وبعدين دوّر بغلطة إملائية زي [[ابراهم]] وشوف مين من الطريقتين لقاه. وآخر حاجة: اعمل 5000 مدرس بأسماء متولّدة ([[generate_series]])، وقارن [[EXPLAIN ANALYZE]] للبحث بـ LIKE على name_norm قبل وبعد الـ index.`,
          sol: R`[[اسامه]] بعد التطبيع بقت [[اسامه]]، و [[أسامة عبد الله]] اتخزنت [[اسامه عبد الله]]، فالـ LIKE هيلاقيها. و [[word_similarity(ar_normalize('اسامه'), name_norm)]] هيطلع [[1]] لأن الكلمة موجودة بالكامل جوه الاسم.

[[ابراهم]] (ناقصها ي): الـ LIKE مش هيلاقي حاجة لأن النص مش موجود بالحرف. أما [[ar_normalize('ابراهم') <% name_norm]] هيلاقي [[أحمد إبراهيم]] لأن أغلب الـ trigrams مشتركة. ده الفرق: التطبيع بيحل اختلاف الكتابة، و pg_trgm بيحل الأخطاء.

في EXPLAIN ANALYZE قبل الـ index هتلاقي [[Seq Scan on teachers]] ومعاها [[Rows Removed by Filter]] بالآلاف، وبعده [[Bitmap Index Scan on teachers_name_trgm]]. وخد بالك: pg_trgm محتاج ٣ حروف على الأقل في البحث عشان يستخدم الـ index بكفاءة، فالبحث بحرفين بيقرا كتير.`,
          solCode: R`SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('اسامه') || '%';
SELECT name, word_similarity(ar_normalize('اسامه'), name_norm) AS score
FROM teachers WHERE ar_normalize('اسامه') <% name_norm;

SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('ابراهم') || '%';
SELECT name FROM teachers WHERE ar_normalize('ابراهم') <% name_norm;

DROP INDEX teachers_name_trgm;
INSERT INTO teachers (name) SELECT 'مدرس رقم ' || g FROM generate_series(1, 5000) g;
ANALYZE teachers;
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';`,
          flag: "script",
          deep: {
            why: "في منصة تعليمية، أو متجر، أو نظام موظفين مصري، أغلب البحث بأسماء عربي. اليوزر بيكتب بسرعة من الموبايل من غير همزات، أو بيغلط حرف. لو البحث مش بيستحمل ده، اليوزر هيقول «الاسم مش موجود» وهو موجود، وده بيبان للعميل كأنه bug.",
            how: R`التطبيع: [[regexp_replace(..., '[ً-ْـ]', '', 'g')]] بيشيل التشكيل (الفتحة والضمة والكسرة والتنوين والشدة والسكون، من U+064B لـ U+0652) والتطويل (U+0640). و [[translate(نص, 'أإآٱةى', 'ااااهي')]] بيبدّل كل حرف من الأولى باللي قصاده في التانية بالترتيب، فعدد الحروف لازم يبقى متساوي والترتيب مظبوط. [[lower]] عشان لو فيه إنجليزي في الاسم.

القاعدة الذهبية: نفس الدالة على المتخزن وعلى كلام البحث. لو طبّعت واحد بس، مفيش حاجة هتطابق.

ليه ة تبقى ه مش العكس؟ الاتنين شغالين طالما ثابت. المهم إن «فاطمة» و «فاطمه» يبقوا نفس النص بعد التطبيع.

[[pg_trgm]] بيقطّع النص لـ trigrams (كل ٣ حروف ورا بعض)، و [[similarity(a, b)]] = نسبة الـ trigrams المشتركة من ٠ لـ ١. [[a % b]] معناها «التشابه أكبر من [[pg_trgm.similarity_threshold]]» (الافتراضي 0.3). و [[word_similarity(كلمة, نص)]] مع [[<%]] بيدوّر على الكلمة جوه نص أطول، وده الأنسب لما اليوزر يكتب جزء من الاسم.

الـ index [[gin (col gin_trgm_ops)]] بيخدم [[%]] و [[<%]] و [[LIKE '%x%']] و [[ILIKE]] كمان. يعني نفس الـ index بيحل مشكلة «LIKE بـ % في الأول مبيستخدمش index» من درس LIKE و ILIKE.

والـ full-text بالعربي: Postgres فيه configuration [[arabic]] بيعمل stemming ([[to_tsvector('arabic', 'المدرسون')]] بتطلع [['مدرس']])، وبيشيل الهمزات والتشكيل كمان، بس مش بنفس النتيجة لكل شكل للكلمة: «مصطفى» بتبقى [['مصطفي']] و «مصطفي» بتبقى [['مصطف']]، و «القاهرة» [['قاهر']] و «القاهره» [['قاهره']]، فمش بيطابقوا بعض. فلو محتاجه: [[to_tsvector('arabic', ar_normalize(body))]] في العمود الـ generated، ونفس الحاجة في البحث.

و Supabase فيه pg_trgm و unaccent جاهزين، فعّلهم من Database ← Extensions.`,
            when: "أي بحث بأسماء عربي (مدرسين، وطلاب، وعملاء، ومنتجات)، وأي بحث لازم يستحمل أخطاء إملائية أو autocomplete. للنصوص الطويلة: full-text على النص المتطبّع، ومعاه pg_trgm للأسماء.",
            mistakes: R`تطبّع المتخزن وتنسى تطبّع كلام البحث (أو العكس). [[translate]] بعدد حروف مختلف أو ترتيب غلط، فالتاء المربوطة تبقى ي (حصلت وانا بكتب الدرس ده). الدالة من غير IMMUTABLE فالعمود الـ generated يرفض. threshold عالي فمفيش نتايج، أو واطي فكل حاجة تطلع. بحث بحرف أو حرفين على trigram index. و ILIKE على name الأصلي وتفتكر إنه هيلاقي «احمد» جوه «أحمد».`
          },
          teach: R`## الفكرة: وحّد شكل الكتابة، وبعدين قارن بالتشابه

المثال بيحل مشكلتين مختلفتين بأداتين:

1. **نفس الاسم مكتوب بأشكال مختلفة** («أحمد» و «احمد»، «فاطمة» و «فاطمه»): دالة [[ar_normalize]] بتحوّل أي شكل لشكل واحد، وبتتطبق على المتخزن وعلى كلام البحث.
2. **غلطة إملائية** («مصطفا» بدل «مصطفى»): extension اسمه [[pg_trgm]] بيقيس **قد إيه** نصين شبه بعض بدل «متطابقين ولا لأ».

كل الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker.

---

## ١. [[CREATE EXTENSION IF NOT EXISTS pg_trgm;]]

الـ **extension** إضافة رسمية بتيجي مع Postgres بس مش متفعّلة لوحدها. [[CREATE EXTENSION]] بيفعّلها في القاعدة دي، و [[IF NOT EXISTS]] بيخلي الأمر ميفشلش لو كانت متفعّلة قبل كده.

~~~text الناتج
CREATE EXTENSION
~~~

[[pg_trgm]] بيضيف دوال زي [[similarity]] و [[word_similarity]]، وعلامات زي [[%]] و [[<%]]، ونوع index اسمه [[gin_trgm_ops]]. هنشوفهم كلهم تحت.

---

## ٢. دالة التطبيع: [[ar_normalize]]

~~~text الأمر
CREATE FUNCTION ar_normalize(t text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT translate(regexp_replace(lower(t), '[ً-ْـ]', '', 'g'), 'أإآٱةى', 'ااااهي');
$$;
~~~

### رأس الدالة

| الحتة | معناها |
|---|---|
| [[ar_normalize(t text) RETURNS text]] | نص داخل ونص خارج |
| [[LANGUAGE sql]] | استعلام واحد (درس CREATE FUNCTION) |
| [[IMMUTABLE]] | وعد: نفس المدخل بيرجّع نفس المخرج **دايمًا**، مش بس جوه استعلام واحد. ده شرط عشان الدالة تتحط في generated column أو index |
| [[PARALLEL SAFE]] | آمنة إن Postgres يشغّلها في كذا worker في نفس الوقت لو الاستعلام اتقسم. مش شرط، بس من غيرها Postgres مش هيقسم أي استعلام بيستخدمها |

### الجسم من جوه لبرة

السطر فيه ٣ دوال جوه بعض، والتنفيذ من جوه:

#### الخطوة ١: [[lower(t)]]

بتصغّر الحروف الإنجليزي بس. العربي ملوش كابيتال، فبيعدّي زي ما هو:

~~~text SELECT lower('Ahmed أحمد');
 ahmed أحمد
~~~

موجودة عشان لو الاسم فيه إنجليزي ([[Ahmed]] و [[ahmed]] يبقوا واحد).

#### الخطوة ٢: [[regexp_replace(..., '[ً-ْـ]', '', 'g')]]

[[regexp_replace(نص, نمط, بديل, flags)]] بتدوّر على النمط وتبدّله. هنا البديل [['']] (نص فاضي)، يعني **امسح**. و [['g']] = global: امسح كل مرة تلاقيه، مش أول مرة بس.

والنمط [[[ً-ْـ]]]: القوسين المربعين [[[ ]]] في regex معناهم «أي حرف واحد من دول». وجواهم حاجتين:
- [[ً-ْ]]: **range** من حرف لحرف. أوله التنوين بالفتح وآخره السكون، ودول في Unicode ورا بعض: من U+064B لـ U+0652. يعني كل التشكيل: الفتحة والضمة والكسرة والتنوين والشدة والسكون.
- [[ـ]]: حرف التطويل (U+0640) اللي في «الـــقاهرة».

أرقامهم اتأكدنا منها بـ [[to_hex(ascii(...))]] (رقم الحرف بالـ hex):

~~~text SELECT to_hex(ascii('ً')), to_hex(ascii('ْ')), to_hex(ascii('ـ'));
 64b | 652 | 640
~~~

~~~text SELECT regexp_replace('مُحَمَّد الـــقاهرة', '[ً-ْـ]', '', 'g');
 محمد القاهرة
~~~

وليه ده مهم؟ التشكيل حروف حقيقية في النص، حتى لو عينك مش شايفاها كحروف:

~~~text SELECT length('مُحَمَّد'), length('محمد');
 8 | 4
~~~

«مُحَمَّد» ٨ حروف: ٤ حروف وفتحة وضمة وشدة وفتحة. فمقارنتها بـ «محمد» من غير تطبيع = نصين مختلفين.

#### الخطوة ٣: [[translate(..., 'أإآٱةى', 'ااااهي')]]

[[translate(نص, من, إلى)]] بتبدّل حرف بحرف: أول حرف في [[من]] بيتبدّل بأول حرف في [[إلى]]، والتاني بالتاني، وهكذا:

| من | إلى |
|---|---|
| أ | ا |
| إ | ا |
| آ | ا |
| ٱ (ألف وصل) | ا |
| ة | ه |
| ى | ي |

~~~text SELECT translate('أحمد إبراهيم مدرسة مصطفى', 'أإآٱةى', 'ااااهي');
 احمد ابراهيم مدرسه مصطفي
~~~

خد بالك: الربط **بالمكان**، فلو عدد الحروف مختلف، الحروف الزيادة في [[من]] بتتمسح بدل ما تتبدّل:

~~~text SELECT translate('abc', 'ab', 'x');
 xc
~~~

[[a]] بقت [[x]]، و [[b]] ملهاش مقابل فاتمسحت. ده نوع الغلط اللي بيطلّع «فاطم» بدل «فاطمه» من غير أي error.

~~~text الناتج
CREATE FUNCTION
~~~

---

## ٣. [[SELECT ar_normalize('مُحَمَّد أحمد إبراهيم مدرسة مصطفى الـــقاهرة');]]

~~~text الناتج
             ar_normalize
---------------------------------------
 محمد احمد ابراهيم مدرسه مصطفي القاهره
~~~

التشكيل والتطويل راحوا، والهمزات بقت ا، والتاء المربوطة بقت ه، والألف المقصورة بقت ي. الشكل النهائي مش «صح إملائيًا»، وده مش مهم: هو للمقارنة بس، مش للعرض.

---

## ٤. جدول المدرسين: [[CREATE TABLE teachers (...)]]

~~~text الأمر
CREATE TABLE teachers (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name      text NOT NULL,
  name_norm text GENERATED ALWAYS AS (ar_normalize(name)) STORED
);
~~~

- [[name]]: الاسم زي ما اتكتب، ده اللي بيتعرض لليوزر.
- [[name_norm]]: generated column (درس generated columns) = [[ar_normalize(name)]]، بيتحسب لوحده مع كل INSERT و UPDATE. ده اللي بندوّر فيه. ومسموح هنا بس لأن الدالة [[IMMUTABLE]].

---

## ٥. [[CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);]]

- [[USING gin]]: نفس نوع الـ index بتاع الـ full-text (لكل حتة، الصفوف اللي فيها).
- [[gin_trgm_ops]]: الـ **operator class**، يعني «الـ index ده يقطّع النص trigrams». من غيره Postgres مش هيعرف يعمل GIN على text.

نفس الـ index ده بيخدم [[%]] و [[<%]] و [[LIKE '%...%']] و [[ILIKE]].

---

## ٦. [[INSERT INTO teachers (name) VALUES ...]]

٤ أسماء فيها همزات وتشكيل وتاء مربوطة وألف مقصورة. بعد الـ INSERT:

~~~text SELECT name, name_norm FROM teachers;
      name      |   name_norm
----------------+----------------
 أحمد إبراهيم   | احمد ابراهيم
 مُحَمَّد مصطفى     | محمد مصطفي
 فاطمة الزهراء  | فاطمه الزهراء
 أسامة عبد الله | اسامه عبد الله
~~~

(العمود بيبان مش مظبوط عند «مُحَمَّد» لأن psql بيحسب التشكيل حروف وهو بيرسم الجدول.)

---

## ٧. [[SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('فاطمه') || '%';]]

نفك الشرط:
- [[ar_normalize('فاطمه')]]: كلام البحث بيتطبّع **بنفس الدالة**، فبقى [[فاطمه]].
- [[||]] لزق نصوص، فالنمط النهائي [['%فاطمه%']]. و [[%]] في LIKE = أي حاجة (درس LIKE و ILIKE).
- الشرط على [[name_norm]]، والعرض من [[name]].

~~~text الناتج
     name
---------------
 فاطمة الزهراء
~~~

اليوزر كتب بالهاء، والمتخزن بالتاء، والاتنين بقوا [[فاطمه]] بعد التطبيع. والعرض بالاسم الأصلي.

---

## ٨. البحث بغلطة إملائية: [[similarity]] و [[%]]

~~~text الأمر
SELECT name, similarity(name_norm, ar_normalize('محمد مصطفا')) AS score
FROM teachers
WHERE name_norm % ar_normalize('محمد مصطفا')
ORDER BY score DESC;
~~~

### يعني إيه trigram؟

[[pg_trgm]] بيقطّع النص لحتت كل واحدة **٣ حروف ورا بعض**، بعد ما يحط مسافتين قبل كل كلمة ومسافة بعدها. على كلمة إنجليزي عشان تبان:

~~~text SELECT show_trgm('cat');
 {"  c"," ca","at ",cat}
~~~

(مع العربي [[show_trgm]] بيعرض كل trigram كرقم hex، لأن الحروف العربي أكتر من byte فـ pg_trgm بيخزن الـ trigram كـ hash. الفكرة نفسها.)

### [[similarity(a, b)]]

= عدد الـ trigrams المشتركة ÷ عدد الـ trigrams في الاتنين من غير تكرار. من ٠ (مفيش أي حاجة مشتركة) لـ ١ (نفس النص). على أسمائنا:

~~~text similarity(name_norm, 'محمد مصطفا') لكل المدرسين
      name      | similarity
----------------+------------
 مُحَمَّد مصطفى     |  0.6666667
 أحمد إبراهيم   |        0.1
 فاطمة الزهراء  |          0
 أسامة عبد الله |          0
~~~

ليه ٠.٦٦٧؟ [['محمد مصطفي']] فيها ١٠ trigrams، و [['محمد مصطفا']] فيها ١٠، والمشترك ٨ (كله ماعدا الحتت اللي فيها آخر حرف). فـ ٨ ÷ (١٠ + ١٠ − ٨) = ٨ ÷ ١٢ = ٠.٦٦٧.

### [[a % b]]

= «[[similarity(a, b)]] أكبر من أو يساوي الحد». والحد اسمه [[pg_trgm.similarity_threshold]]:

~~~text SHOW pg_trgm.similarity_threshold;
 0.3
~~~

فالـ WHERE بتشيل أي حاجة تحت ٠.٣، وده اللي بيستخدم الـ index. والـ SELECT بيحسب الدرجة تاني للترتيب.

~~~text الناتج
    name    |   score
------------+-----------
 مُحَمَّد مصطفى | 0.6666667
(1 row)
~~~

لو كتبت [[=]] بدل [[%]] مكانش هيطلع حاجة، لأن «مصطفا» مش «مصطفي».

---

## ٩. [[SELECT name FROM teachers WHERE name LIKE '%احمد%';]]

نفس البحث على [[name]] الأصلي من غير تطبيع:

~~~text الناتج
 name
------
(0 rows)
~~~

المتخزن «أحمد» بهمزة، و LIKE بيقارن حرف بحرف. و [[ILIKE]] نفس النتيجة (اتجرّب: [[0 rows]])، لأنه بيتجاهل الكابيتال بس، والهمزة مش كابيتال.

---

## ١٠. اللي بيحصل في الـ «جرّب»

### «اسامه» بطريقتين

~~~text الناتج
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('اسامه') || '%';
      name
----------------
 أسامة عبد الله

SELECT name, word_similarity(ar_normalize('اسامه'), name_norm) AS score
FROM teachers WHERE ar_normalize('اسامه') <% name_norm;
      name      | score
----------------+-------
 أسامة عبد الله |     1
~~~

[[word_similarity(كلمة, نص)]] بتدوّر على أقرب **جزء** من النص الطويل للكلمة، بدل ما تقارن الكلمة بالاسم كله. «اسامه» موجودة كاملة جوه «اسامه عبد الله» فالدرجة ١. و [[<%]] هو الشرط بتاعها، وحده [[pg_trgm.word_similarity_threshold]] = ٠.٦ افتراضيًا (اتجرّب بـ [[SHOW]]).

### «ابراهم» (ناقصها ي)

~~~text الناتج
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('ابراهم') || '%';
(0 rows)

SELECT name FROM teachers WHERE ar_normalize('ابراهم') <% name_norm;
     name
--------------
 أحمد إبراهيم
~~~

الدرجات نفسها:

~~~text SELECT word_similarity('ابراهم', 'احمد ابراهيم'), similarity('ابراهم', 'احمد ابراهيم');
 word_similarity | similarity
-----------------+------------
      0.71428573 | 0.35714287
~~~

[[similarity]] بيقارن بالاسم كله فالدرجة ٠.٣٦، و [[word_similarity]] بيقارن بأقرب كلمة فالدرجة ٠.٧١. عشان كده [[<%]] أنسب لما اليوزر بيكتب جزء من الاسم.

### الـ index قبل وبعد (على ٥٠٠٤ صف)

~~~text من غير الـ index
 Seq Scan on teachers  (actual time=0.010..0.537 rows=1.00 loops=1)
   Filter: (name_norm ~~ '%فاطمه%'::text)
   Rows Removed by Filter: 5003
 Execution Time: 0.547 ms
~~~

~~~text بالـ index
 Bitmap Heap Scan on teachers  (actual time=0.018..0.018 rows=1.00 loops=1)
   Recheck Cond: (name_norm ~~ '%فاطمه%'::text)
   ->  Bitmap Index Scan on teachers_name_trgm
         Index Cond: (name_norm ~~ '%فاطمه%'::text)
 Execution Time: 0.032 ms
~~~

- [[~~]] هو اسم LIKE جوه Postgres.
- من غير index: قرا الـ ٥٠٠٤ صف ورمى ٥٠٠٣ ([[Rows Removed by Filter]]).
- بالـ index: راح للصفوف اللي فيها نفس الـ trigrams على طول، والوقت نزل من ٠.٥٥ لـ ٠.٠٣ ملي ثانية. الفرق ده بيكبر مع حجم الجدول.
- [[Recheck Cond]]: الـ index بيرشّح صفوف «ممكن» تطابق، و Postgres بيتأكد من الشرط الحقيقي على كل واحد منهم.

---

## الخلاصة

| الأداة | بتحل إيه | مثال |
|---|---|---|
| [[ar_normalize]] على المتخزن والبحث | نفس الكلمة بأشكال كتابة مختلفة | «فاطمه» تلاقي «فاطمة» |
| [[similarity]] و [[%]] | غلطة إملائية في الاسم كله | «محمد مصطفا» تلاقي «مُحَمَّد مصطفى» |
| [[word_similarity]] و [[<%]] | جزء من الاسم، ولو فيه غلطة | «ابراهم» تلاقي «أحمد إبراهيم» |
| [[gin (... gin_trgm_ops)]] | السرعة | نفس الـ index للتلاتة وللـ LIKE |

- نفس دالة التطبيع على الاتنين: المتخزن (generated column) وكلام البحث.
- الدالة لازم [[IMMUTABLE]] عشان تتحط في generated column وعليها index.
- [[translate]] بيربط الحروف بالمكان: نفس العدد في الناحيتين.
- التطبيع بيحل اختلاف الكتابة، و pg_trgm بيحل الأخطاء، ومحتاج ٣ حروف على الأقل عشان يشتغل كويس.`,
          lines: [
            "فعّل extension الـ trigrams.",
            "دالة التطبيع: نص داخل ونص خارج،",
            "IMMUTABLE: نفس المدخل يرجّع نفس المخرج دايمًا (شرط الـ index).",
            "شيل التشكيل والتطويل، وبعدين بدّل الهمزات بـ ا، و ة بـ ه، و ى بـ ي.",
            "قفلة.",
            "جرّب: محمد احمد ابراهيم مدرسه مصطفي القاهره.",
            "جدول المدرسين:",
            "رقم،",
            "الاسم زي ما اتكتب (للعرض)،",
            "والاسم المتطبّع، بيتحسب لوحده.",
            "قفلة.",
            "trigram index على الاسم المتطبّع.",
            "٤ مدرسين بهمزات وتشكيل وتاء مربوطة.",
            "«فاطمه» بالهاء لقت «فاطمة» بالتاء، لأن الاتنين اتطبّعوا.",
            "بحث بغلطة إملائية: درجة التشابه،",
            "من المدرسين،",
            "اللي تشابههم فوق الحد (0.3 افتراضيًا)،",
            "الأقرب الأول.",
            "من غير تطبيع: مفيش نتيجة، لأن المتخزن «أحمد» بهمزة."
          ]
        }
      ]
    }
]);
