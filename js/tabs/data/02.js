// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "القراية: SELECT و WHERE",
      l: 1,
      n: "تسأل القاعدة سؤال وترجع بالصفوف اللي عايزها بس، بالترتيب اللي عايزه",
      items: [
        {
          cmd: "SELECT",
          title: "اطلب الأعمدة اللي محتاجها بس",
          desc: R`[[SELECT]] بيرجّع صفوف من جدول. بتحدد الأعمدة بالاسم، وتقدر تسمي الناتج بـ [[AS]]، وتحسب عمود جديد من أعمدة موجودة. و [[DISTINCT]] بيشيل الصفوف المتكررة من الناتج.

في الكود اكتب أسماء الأعمدة دايمًا بدل [[SELECT *]]: داتا أقل على الشبكة، ومش هتسرّب عمود زي [[password_hash]] بالغلط لما حد يضيفه بعدين.`,
          example: R`SELECT name, price FROM products;
SELECT name, price * 1.14 AS price_with_vat FROM products;
SELECT DISTINCT status FROM orders;
SELECT count(DISTINCT user_id) AS buyers FROM orders;
SELECT now(), 2 + 2 AS four;`,
          try: R`الجدول فيه منتج واحد دلوقتي؛ بعد درس INSERT ارجع شغّل الأسطر تاني. وجرّب تضيف [[WHERE price_with_vat > 200]] على السطر التاني وشوف الـ error. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات [[name]] والسعر بعد الضريبة مقرّب لخانتين، للمنتجات اللي سعرها بعد الضريبة أكبر من 200 بس.`,
          flag: "script",
          deep: {
            why: "كل شاشة في التطبيق محتاجة جزء من الداتا بس: اسم وسعر مش كل الأعمدة. لو جبت كل حاجة، الـ response بيتقل، والـ memory بتتملي، ولما حد يضيف عمود حساس في الجدول يطلع في الـ API من غير ما حد ياخد باله.",
            how: R`الترتيب اللي بتكتب بيه غير الترتيب اللي Postgres بينفّذ بيه. التنفيذ المنطقي: [[FROM]] ← [[WHERE]] ← [[GROUP BY]] ← [[HAVING]] ← [[SELECT]] ← [[DISTINCT]] ← [[ORDER BY]] ← [[LIMIT]]. عشان كده الاسم اللي عملته بـ AS مش معروف لسه في WHERE (بيتحسب بعده)، بس معروف في ORDER BY.

الناتج نفسه «جدول» مؤقت، وده اللي بيخليك تحط SELECT جوه SELECT (subquery) أو تعمله JOIN.

[[DISTINCT]] لازم يقارن كل الصفوف ببعض (بيرتب أو بيعمل hash)، فعلى نتيجة كبيرة غالي. ولو لقيت نفسك بتحط DISTINCT عشان صفوف اتكررت بعد JOIN، غالبًا الـ JOIN نفسه غلط.

وفيه حاجة خاصة بـ Postgres اسمها [[DISTINCT ON (user_id)]]: بترجّع أول صف لكل user_id حسب الـ ORDER BY، زي «آخر أوردر لكل يوزر».`,
            when: "كل قراية. وفي الـ ORM بتعمل نفس الحاجة بـ [[select]] (درس «include و select» في المستوى التالت).",
            mistakes: R`[[SELECT *]] في كود الـ API. DISTINCT عشان تخبي صفوف متكررة من JOIN غلط. واستخدام اسم الـ AS في WHERE: [[column "price_with_vat" does not exist]].`
          },
          teach: R`## الفكرة: SELECT بيبني جدول جديد من اللي عندك

كل سطر في المثال بيرجّع «جدول» صغير: أعمدة انت اخترتها، أو حسبتها، أو شلت منها التكرار. الناتج تحت من psql على [[postgres:18]] جوه Docker، على الجداول بالشكل اللي سابته الدروس اللي فاتت: [[products]] فيه منتج واحد (T-shirt)، و [[orders]] فيه أوردرين لنفس اليوزر.

---

## ١. [[SELECT name, price FROM products;]]

| الحتة | معناها |
|---|---|
| [[SELECT name, price]] | الأعمدة اللي عايزها، مفصولة بـ [[,]] وبالترتيب اللي هتتعرض بيه |
| [[FROM products]] | من أنهي جدول |

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
(1 row)
~~~

عمودين بس من ٧. ده اللي هتعمله في الكود دايمًا بدل [[SELECT *]].

---

## ٢. [[SELECT name, price * 1.14 AS price_with_vat FROM products;]]

### [[price * 1.14]]

عمود محسوب: لكل صف، السعر مضروب في 1.14 (ضريبة ١٤٪). [[*]] هنا ضرب، مش «كل الأعمدة»: معناها بيتحدد من مكانها.

### [[AS price_with_vat]]

[[AS]] بتدي العمود الناتج اسم (اسمه alias). من غيرها psql بيسميه [[?column?]]:

~~~text SELECT name, price * 1.14 FROM products;
  name   | ?column?
---------+----------
 T-shirt | 285.0000
~~~

وبيها:

~~~text الناتج
  name   | price_with_vat
---------+----------------
 T-shirt |       285.0000
(1 row)
~~~

ليه ٤ خانات بعد العلامة؟ [[price]] فيه خانتين ([[250.00]])، و [[1.14]] فيه خانتين، وضرب الـ numeric بيجمع عدد الخانات: ٢ + ٢ = ٤. الحسبة نفسها مظبوطة (250 × 1.14 = 285)، بس الشكل محتاج تقريب بـ [[round(..., 2)]].

الحسبة دي مش بتغيّر حاجة في الجدول: العمود موجود في الناتج بس.

---

## ٣. [[SELECT DISTINCT status FROM orders;]]

[[DISTINCT]] بيشيل الصفوف المتكررة من **الناتج**. عندنا أوردرين الاتنين [[pending]]:

~~~text الناتج
 status
---------
 pending
(1 row)
~~~

صف واحد بدل اتنين. مفيد لـ «إيه الحالات الموجودة أصلًا؟».

---

## ٤. [[SELECT count(DISTINCT user_id) AS buyers FROM orders;]]

نفكها من جوه لبرة:
1. [[user_id]] من كل الأوردرات: نفس الـ uuid مرتين.
2. [[DISTINCT]] جوه القوس: شيل التكرار، فاضل واحد.
3. [[count(...)]] عدّهم.

~~~text الناتج
 buyers
--------
      1
(1 row)
~~~

ومن غير DISTINCT كان هيعد الأوردرات نفسها:

~~~text SELECT count(user_id) FROM orders;
 count
-------
     2
~~~

الفرق ده هو الفرق بين «كام أوردر» و «كام يوزر اشترى».

---

## ٥. [[SELECT now(), 2 + 2 AS four;]]

SELECT مش لازم يبقى معاه FROM: ينفع يحسب أي تعبير.

~~~text الناتج
              now              | four
-------------------------------+------
 2026-10-07 08:27:41.964263+00 |    4
(1 row)
~~~

[[now()]] الوقت دلوقتي، وعمودها اسمه [[now]] تلقائي (اسم الدالة). وده مفيد تجرّب بيه أي دالة قبل ما تحطها في استعلام كبير.

---

## ٦. ليه الاسم المستعار مش شغال في WHERE (الـ «جرّب»)

~~~text SELECT name, price * 1.14 AS price_with_vat FROM products WHERE price_with_vat > 200;
ERROR:  column "price_with_vat" does not exist
LINE 1: ...rice * 1.14 AS price_with_vat FROM products WHERE price_with...
                                                             ^
~~~

إنت كاتب SELECT الأول، بس Postgres **مش بينفّذ** بالترتيب ده. الترتيب المنطقي:

| الترتيب | الجزء | بيعمل إيه |
|---|---|---|
| ١ | [[FROM]] | يجيب صفوف الجدول |
| ٢ | [[WHERE]] | يفلتر الصفوف |
| ٣ | [[GROUP BY]] / [[HAVING]] | يجمّع (دروس جاية) |
| ٤ | [[SELECT]] | يحسب الأعمدة، وهنا بس الـ AS بيتعمل |
| ٥ | [[DISTINCT]] | يشيل التكرار |
| ٦ | [[ORDER BY]] | يرتب، وهنا الـ AS بقى معروف |
| ٧ | [[LIMIT]] | ياخد أول كام صف |

[[WHERE]] رقم ٢ و [[AS]] بيتعمل في رقم ٤، فوقت الفلترة الاسم [[price_with_vat]] لسه مش موجود. عشان كده الـ error بيقول العمود «مش موجود»: من وجهة نظر WHERE هو فعلًا مش موجود.

> في التمرين اللي تحت هتصلّح الاستعلام ده. فكّر: WHERE شايف أعمدة الجدول نفسه بس، يبقى الشرط لازم يتكتب بيها.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[SELECT a, b FROM t]] | أعمدة بعينها |
| [[expr AS name]] | عمود محسوب باسم جديد |
| [[SELECT DISTINCT col]] | القيم من غير تكرار |
| [[count(DISTINCT col)]] | عدد القيم المختلفة |
| [[SELECT expr]] من غير FROM | آلة حاسبة |

- الأعمدة المحسوبة بتظهر في الناتج بس، مش بتتخزن.
- اسم الـ AS معروف في ORDER BY، ومش معروف في WHERE (بيتنفذ قبله).
- ضرب numeric في numeric بيجمع عدد الخانات العشرية، فقرّب لو محتاج.`,
          lines: [
            "عمودين بس من كل المنتجات.",
            "عمود محسوب (السعر بالضريبة) باسم جديد.",
            "الحالات الموجودة من غير تكرار.",
            "عدد اليوزرز المختلفين اللي عملوا أوردرات.",
            "SELECT من غير جدول: ينفع تحسب أي تعبير."
          ],
          sol: R`بعد درس INSERT هتلاقي كل المنتجات ظاهرة، وعمود [[price_with_vat]] فيه ٤ أرقام عشرية (مثلًا [[285.0000]] للـ T-shirt)، لأن ضرب [[numeric(10,2)]] في [[1.14]] بيجمع عدد الخانات العشرية. لو عايزها خانتين: [[round(price * 1.14, 2)]].

الـ WHERE على الاسم المستعار هيطلّع [[ERROR:  column "price_with_vat" does not exist]]. السبب إن WHERE بيتنفذ قبل SELECT، فالاسم لسه متعملش. الحل إنك تكرر الحسبة: [[WHERE price * 1.14 > 200]]، أو تحط الاستعلام في subquery أو CTE وتفلتر برّه.`,
          solCode: R`SELECT name, price * 1.14 AS price_with_vat FROM products WHERE price_with_vat > 200;
-- ERROR:  column "price_with_vat" does not exist
SELECT name, round(price * 1.14, 2) AS price_with_vat
FROM products
WHERE price * 1.14 > 200;`,
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
  (8, 'Pin', 15.00, 40, true);`,
            starter: R`SELECT name, round(price * 1.14, 2) AS price_with_vat
FROM products
WHERE price_with_vat > 200;`,
            expect: [["T-shirt",285], ["Hoodie",741], ["Cap",205.2]],
            solution: R`SELECT name, round(price * 1.14, 2) AS price_with_vat
FROM products
WHERE price * 1.14 > 200;`
          }
        },
        {
          cmd: "WHERE",
          title: "رجّع الصفوف اللي بتحقق شرط بس",
          desc: R`[[WHERE]] بيخلّي الصفوف اللي الشرط عليها true بس. بتستخدم مقارنات ([[=]] و [[<>]] و [[<]] و [[>=]])، وتربطهم بـ [[AND]] و [[OR]] و [[NOT]]. و [[IN (...)]] بدل كذا OR، و [[BETWEEN]] لمدى.

خد بالك من الأولوية: AND أقوى من OR، فحط أقواس لما تخلطهم. والنصوص بين علامة تنصيص مفردة [[']]، مش مزدوجة.`,
          example: R`SELECT name, price FROM products WHERE price < 300;
SELECT name FROM products WHERE stock > 0 AND is_active;
SELECT id, status FROM orders WHERE status IN ('paid', 'shipped');
SELECT id FROM orders WHERE created_at >= now() - interval '7 days';
SELECT name FROM products WHERE price BETWEEN 100 AND 500;
SELECT name FROM products WHERE is_active AND (stock > 0 OR price = 0);`,
          try: R`شيل الأقواس من آخر سطر وقارن النتيجة. وبعدين جرّب [[WHERE status = "paid"]] بالتنصيص المزدوج واقرا الـ error. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات أسماء المنتجات النشطة ([[is_active]]) اللي يا إما في المخزون يا إما ببلاش. في الجدول منتج ببلاش ومش نشط، ومينفعش يظهر.`,
          flag: "script",
          deep: {
            why: "من غير WHERE هتجيب الجدول كله وتفلتر في الكود، يعني مليون صف بيعدّوا على الشبكة عشان تستخدم عشرة. الفلترة جوه القاعدة أسرع بمراحل، وممكن تستخدم index.",
            how: R`WHERE بيتقيّم على كل صف لوحده، قبل أي تجميع. النتيجة لازم تبقى true عشان الصف يعدّي؛ false أو NULL الاتنين بيترموا (درس NULL).

التنصيص المفرد [['paid']] قيمة نصية، والمزدوج [["paid"]] اسم عمود أو جدول. عشان كده [[status = "paid"]] بيدوّر على عمود اسمه paid.

[[BETWEEN a AND b]] بيشمل الطرفين. مع timestamps ده فخ: [[BETWEEN '2026-09-01' AND '2026-09-30']] بيقف عند أول لحظة في يوم 30، ويفوّت اليوم كله. الصح: [[created_at >= '2026-09-01' AND created_at < '2026-10-01']].

ومن الكود: القيمة اللي جاية من اليوزر عمرها ما تتلزق في نص الاستعلام. بتتبعت parameter منفصل: [[pool.query('SELECT ... WHERE email = $1', [email])]]. ده بيمنع SQL injection، والتفاصيل في درس $queryRaw.`,
            when: "تقريبًا في كل SELECT و UPDATE و DELETE.",
            mistakes: R`[[a OR b AND c]] وانت قصدك [[(a OR b) AND c]]. BETWEEN مع timestamps. تنصيص مزدوج للنصوص. ولزق input اليوزر في الاستعلام بـ template string.`
          },
          teach: R`## الفكرة: شرط بيتسأل لكل صف

[[WHERE]] بيعدّي على الصفوف واحد واحد ويسأل الشرط: لو الإجابة true الصف يفضل، ولو false (أو NULL) يترمي. المثال ٦ شروط، كل واحد بيوريك نوع مقارنة. الناتج تحت من psql على [[postgres:18]] جوه Docker: [[products]] فيه T-shirt (سعره 250 ومخزونه 40 ونشط)، و [[orders]] فيه أوردرين [[pending]] اتعملوا النهارده.

---

## ١. [[SELECT name, price FROM products WHERE price < 300;]]

[[<]] أصغر من. المقارنات كلها: [[=]] يساوي، و [[<>]] (أو [[!=]]) لا يساوي، و [[<]] و [[>]] و [[<=]] و [[>=]].

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
(1 row)
~~~

250 < 300 = true، فالصف عدّى.

---

## ٢. [[SELECT name FROM products WHERE stock > 0 AND is_active;]]

- [[AND]] = الشرطين لازم يبقوا true.
- [[is_active]] لوحده شرط كامل، لأنه عمود [[boolean]] قيمته أصلًا true أو false، فمش محتاج [[= true]].

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

---

## ٣. [[SELECT id, status FROM orders WHERE status IN ('paid', 'shipped');]]

[[IN (...)]] = القيمة واحدة من اللي في الليستة. اختصار لـ [[status = 'paid' OR status = 'shipped']].

~~~text الناتج
 id | status
----+--------
(0 rows)
~~~

[[(0 rows)]] مش error: الاستعلام سليم، بس الأوردرين [[pending]] فمحدش طابق. psql بيعرض أسماء الأعمدة برضه.

---

## ٤. [[SELECT id FROM orders WHERE created_at >= now() - interval '7 days';]]

نفك الجانب اليمين من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[interval '7 days']] | قيمة نوعها [[interval]] يعني «مدة»: ٧ أيام |
| [[now() - interval '7 days']] | الوقت دلوقتي ناقص ٧ أيام |
| [[created_at >= ...]] | اتعمل في اللحظة دي أو بعدها |

~~~text SELECT now() - interval '7 days' AS week_ago;
           week_ago
-------------------------------
 2026-09-30 08:27:48.835503+00
~~~

~~~text الناتج
 id
----
  1
  3
(2 rows)
~~~

الأوردرين اتعملوا النهارده، فالاتنين جوه آخر ٧ أيام. (الـ id رقم 2 مش موجود لأنه اترمى بـ ROLLBACK في درس «PRIMARY KEY».)

---

## ٥. [[SELECT name FROM products WHERE price BETWEEN 100 AND 500;]]

[[BETWEEN a AND b]] = [[price >= 100 AND price <= 500]]. الطرفين **داخلين**.

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

وده فخ مع الوقت. [[BETWEEN '2026-09-01' AND '2026-09-30']] الطرف التاني معناه أول لحظة في يوم 30 (الساعة 00:00)، فأي حاجة حصلت يوم 30 الضهر برّه:

~~~text SELECT '2026-09-30 15:00'::timestamptz BETWEEN '2026-09-01' AND '2026-09-30' AS inside;
 inside
--------
 f
~~~

مع الوقت استخدم [[>=]] للبداية و [[<]] لأول يوم **بعد** النهاية.

---

## ٦. [[SELECT name FROM products WHERE is_active AND (stock > 0 OR price = 0);]]

هنا بنخلط [[AND]] و [[OR]]، والمهم الأولوية: [[AND]] بيتحسب قبل [[OR]] (زي الضرب قبل الجمع في الحساب). الأقواس بتغيّر الترتيب:

~~~text قراية الشرط
is_active  AND  (stock > 0  OR  price = 0)
   ①                  ②
① لازم يكون نشط
② وكمان: يا إما ليه مخزون، يا إما ببلاش
~~~

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

على الداتا دي النتيجة نفسها بأقواس ومن غيرها. عشان تشوف الفرق، ضيف منتج ببلاش **ومش نشط** جوه [[BEGIN]] ... [[ROLLBACK]]:

~~~text BEGIN; و INSERT INTO products (name, price, stock, is_active) VALUES ('Gift', 0, 0, false);
BEGIN
INSERT 0 1
~~~

بالأقواس:

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

ومن غير أقواس ([[WHERE is_active AND stock > 0 OR price = 0]]):

~~~text الناتج
  name
---------
 T-shirt
 Gift
(2 rows)
~~~

من غير أقواس Postgres قراها [[(is_active AND stock > 0) OR price = 0]]، فـ Gift عدّى عشان [[price = 0]] لوحده كفاية، مع إنه مش نشط. وبعدها [[ROLLBACK;]] يشيل Gift.

---

## ٧. التنصيص المزدوج (الـ «جرّب»)

~~~text SELECT id FROM orders WHERE status = "paid";
ERROR:  column "paid" does not exist
LINE 1: SELECT id FROM orders WHERE status = "paid";
                                             ^
HINT:  Perhaps you meant to reference the column "orders.id".
~~~

[["paid"]] بتنصيص مزدوج = **اسم عمود**، فـ Postgres دوّر على عمود اسمه paid. والـ HINT بيخمّن أقرب عمود ليه، وهنا تخمينه مش مفيد. النص دايمًا [['paid']] بتنصيص مفرد.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[= <> < > <= >=]] | مقارنات |
| [[a AND b]] | الاتنين |
| [[a OR b]] | واحد منهم على الأقل |
| [[NOT a]] | العكس |
| [[col IN ('x', 'y')]] | واحدة من الليستة |
| [[col BETWEEN a AND b]] | من a لـ b والطرفين داخلين |
| [[now() - interval '7 days']] | وقت نسبي |

- AND أقوى من OR: لما تخلطهم حط أقواس دايمًا، حتى لو مش متأكد إنها لازمة.
- [[(0 rows)]] نتيجة عادية مش error.
- النص بين [[' ']] مفردة، والمزدوجة لأسماء الأعمدة.
- مع التواريخ: [[>=]] و [[<]] بدل BETWEEN.`,
          lines: [
            "المنتجات الأرخص من 300.",
            "اللي ليها مخزون وظاهرة (is_active لوحده boolean، مش محتاج = true).",
            "الأوردرات اللي حالتها واحدة من دول.",
            "أوردرات آخر ٧ أيام.",
            "سعر بين 100 و 500، والطرفين داخلين.",
            "الأقواس بتحدد الأولوية: ظاهر، و (ليه مخزون أو مجاني)."
          ],
          sol: R`من غير أقواس، [[AND]] بيتحسب قبل [[OR]]، فالشرط بيبقى [[(is_active AND stock > 0) OR price = 0]]: أي منتج سعره صفر هيظهر حتى لو [[is_active = false]]. على الداتا الحالية (منتج واحد نشط) النتيجة غالبًا هي هي؛ عشان تشوف الفرق ضيف جوه [[BEGIN;]] منتج سعره 0 و is_active = false، وقارن: بالأقواس مش هيظهر، ومن غيرها هيظهر. وبعدين [[ROLLBACK;]].

[[WHERE status = "paid"]] هيطلّع [[ERROR:  column "paid" does not exist]]. في SQL التنصيص المزدوج لأسماء الأعمدة والجداول، والنصوص بتنصيص مفرد بس: [[WHERE status = 'paid']].`,
          solCode: R`BEGIN;
INSERT INTO products (name, price, stock, is_active) VALUES ('Gift', 0, 0, false);
SELECT name FROM products WHERE is_active AND (stock > 0 OR price = 0);   -- مفيش Gift
SELECT name FROM products WHERE is_active AND stock > 0 OR price = 0;     -- Gift ظهر
ROLLBACK;`,
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
  (8, 'Pin', 15.00, 40, true);`,
            starter: R`SELECT name FROM products
WHERE is_active AND stock > 0 OR price = 0;`,
            expect: [["T-shirt"], ["Hoodie"], ["Sticker"], ["Pen"], ["Pin"]],
            solution: R`SELECT name FROM products
WHERE is_active AND (stock > 0 OR price = 0);`
          }
        },
        {
          cmd: "ORDER BY و LIMIT",
          title: "رتّب النتيجة وخد أول كام صف",
          desc: R`[[ORDER BY]] بيرتب الناتج: [[ASC]] (الافتراضي) من الصغير للكبير، و [[DESC]] العكس، وتقدر ترتب بأكتر من عمود. [[LIMIT]] بياخد أول كام صف، و [[OFFSET]] بيعدّي كام صف الأول.

من غير ORDER BY، Postgres مش بيوعدك بأي ترتيب، حتى لو شكله ثابت النهارده.`,
          example: R`SELECT name, price FROM products ORDER BY price DESC;
SELECT name, price FROM products ORDER BY price DESC, name ASC;
SELECT id, created_at FROM orders ORDER BY created_at DESC LIMIT 5;
SELECT name, price FROM products ORDER BY price LIMIT 10 OFFSET 20;`,
          try: R`ضيف منتجين بنفس السعر، واعمل [[ORDER BY price LIMIT 1]] كذا مرة بعد UPDATE على واحد منهم. وبعدين ضيف [[, id]] للترتيب وشوف النتيجة بقت ثابتة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: أرخص ٣ منتجات بالاسم والسعر، ولو سعرين متساويين الأصغر [[id]] الأول. الترتيب جزء من الإجابة.`,
          flag: "script",
          deep: {
            why: "كل ليستة في التطبيق مترتبة بحاجة: الأحدث الأول، أو الأرخص، أو الأكتر مبيعًا. و LIMIT بيخليك تجيب صفحة واحدة بدل الجدول كله.",
            how: R`الترتيب بيحصل بعد WHERE و SELECT. لو فيه index على العمود اللي بترتب بيه ومعاه LIMIT، Postgres بيقرا أول N صف من الـ index ويقف، ودي أسرع حالة. من غير index لازم يرتب كل الصفوف اللي عدّت من WHERE الأول.

الصفوف اللي قيمتها متساوية ترتيبها بينها عشوائي. في الصفحات ده بيعمل bug: صف يظهر في صفحتين وصف ميظهرش خالص. الحل عمود فريد في الآخر كـ tiebreaker: [[ORDER BY price, id]].

NULL في Postgres بيعتبر أكبر من أي قيمة: بييجي في الآخر مع ASC وفي الأول مع DESC. لو عايز غير كده: [[NULLS LAST]] أو [[NULLS FIRST]].

[[OFFSET 10000]] بيخلي Postgres يقرا ١٠ آلاف صف ويرميهم، فالصفحات البعيدة بتبطأ. الحل في درس keyset pagination في المستوى التاني.`,
            when: "مع أي ليستة بتتعرض، وأي LIMIT لازم معاه ORDER BY، وإلا «أول ٥» ملهاش معنى.",
            mistakes: R`LIMIT من غير ORDER BY. ترتيب من غير tiebreaker في الصفحات. تعتمد إن الصفوف بترجع بترتيب الإضافة. وترتيب عمود نص فيه أرقام، فـ [['10']] بييجي قبل [['9']].`
          },
          teach: R`## الفكرة: رتّب الأول، وبعدين خد اللي محتاجه

[[ORDER BY]] بيحدد ترتيب الصفوف في الناتج، و [[LIMIT]] و [[OFFSET]] بيقصوا جزء منه. من غير ORDER BY، Postgres بيرجّع الصفوف بأي ترتيب يناسبه، وهنشوف ده بعينينا تحت. الناتج من psql على [[postgres:18]] جوه Docker.

---

## ١. [[SELECT name, price FROM products ORDER BY price DESC;]]

- [[ORDER BY price]] رتّب بعمود السعر.
- [[DESC]] = descending، من الكبير للصغير. عكسها [[ASC]] = ascending، من الصغير للكبير، وهي الافتراضي لو مكتبتش حاجة.

~~~text الناتج (فيه منتج واحد لسه)
  name   | price
---------+--------
 T-shirt | 250.00
(1 row)
~~~

---

## ٢. [[SELECT name, price FROM products ORDER BY price DESC, name ASC;]]

ترتيب بعمودين: رتّب بالسعر من الأغلى، **ولو سعرين متساويين** رتّبهم بالاسم أبجديًا. العمود التاني بيشتغل بس جوه الصفوف اللي العمود الأول فيها متساوي.

بعد ما ضفنا Pen و Pin الاتنين بـ 50:

~~~text الناتج
  name   | price
---------+--------
 T-shirt | 250.00
 Pen     |  50.00
 Pin     |  50.00
(3 rows)
~~~

T-shirt الأول لأنه الأغلى. و Pen قبل Pin لأنهم متساويين في السعر، فالاسم حكم: [[Pe]] قبل [[Pi]] أبجديًا.

---

## ٣. [[SELECT id, created_at FROM orders ORDER BY created_at DESC LIMIT 5;]]

- [[ORDER BY created_at DESC]]: الأحدث الأول.
- [[LIMIT 5]]: خد أول ٥ صفوف **بعد** الترتيب.

~~~text الناتج
 id |          created_at
----+-------------------------------
  3 | 2026-10-07 08:27:20.564739+00
  1 | 2026-10-07 08:27:20.560271+00
(2 rows)
~~~

فيه أوردرين بس، فرجعوا الاتنين: LIMIT حد أقصى، مش عدد لازم يتحقق. ولاحظ إن [[3]] قبل [[1]]: اتعمل بعده بأجزاء من الثانية.

---

## ٤. [[SELECT name, price FROM products ORDER BY price LIMIT 10 OFFSET 20;]]

- [[ORDER BY price]] من غير ASC/DESC = ASC، الأرخص الأول.
- [[OFFSET 20]]: عدّي أول ٢٠ صف.
- [[LIMIT 10]]: وخد الـ ١٠ اللي بعدهم.

يعني الصفحة التالتة لو كل صفحة ١٠: صفحة ١ = OFFSET 0، صفحة ٢ = OFFSET 10، صفحة ٣ = OFFSET 20. القاعدة: [[OFFSET = (رقم الصفحة - 1) × حجم الصفحة]].

~~~text الناتج
 name | price
------+-------
(0 rows)
~~~

عندنا أقل من ٢٠ منتج، فبعد ما عدّى العشرين مفضلش حاجة.

---

## ٥. الترتيب بين المتساويين مش مضمون (الـ «جرّب»)

ده أهم جزء في الدرس. ضفنا منتجين بنفس السعر:

~~~text INSERT INTO products (name, price, stock) VALUES ('Pen', 50, 10), ('Pin', 50, 10);
INSERT 0 2
~~~

وبعدين سألنا «أرخص منتج» وعدّلنا حاجة مالهاش علاقة بالسعر (المخزون) بين كل مرة:

| الخطوة | [[SELECT id, name FROM products ORDER BY price LIMIT 1;]] |
|---|---|
| قبل أي UPDATE | [[4 Pen]] |
| بعد [[UPDATE products SET stock = 9 WHERE name = 'Pen';]] | [[5 Pin]] |
| بعد [[UPDATE products SET stock = 9 WHERE name = 'Pin';]] | [[4 Pen]] |

نفس الاستعلام، ونفس الأسعار، والنتيجة بتتغير! ليه؟
- Pen و Pin سعرهم متساوي، فـ [[ORDER BY price]] شايفهم «زي بعض» ومش ملزم بأي ترتيب بينهم.
- الـ UPDATE في Postgres مش بيكتب فوق الصف: بيكتب نسخة جديدة منه في مكان تاني (هنا بعد الصفوف اللي موجودة). فاللي اتعدّل آخر واحد بقى مكانه ورا، والقاعدة بتقرا الصفوف بترتيب مكانها وبتقف عند أول واحد ينفع.

(الـ ids هنا 4 و 5 مش 2 و 3، لأن المحاولات اللي فشلت أو اتمسحت في الدروس اللي فاتت سحبت أرقام من العدّاد.)

### الحل: عمود فريد في آخر الترتيب

~~~text SELECT id, name FROM products ORDER BY price, id LIMIT 1;
 id | name
----+------
  4 | Pen
(1 row)
~~~

[[id]] مفيش اتنين بيه، فبعد ما السعر يتساوى الـ id بيحسم دايمًا. العمود ده اسمه **tiebreaker**. في الـ pagination ده فرق بين صفحات سليمة وبين منتج يظهر في صفحتين ومنتج تاني ميظهرش خالص.

وفي الآخر [[DELETE FROM products WHERE name IN ('Pen', 'Pin');]] بترد [[DELETE 2]].

---

## ٦. حاجتين في الترتيب نفسه

### النص اللي فيه أرقام

~~~text SELECT x FROM (VALUES ('10'),('9'),('2')) v(x) ORDER BY x;
 x
----
 10
 2
 9
~~~

النص بيترتب حرف حرف: [['1']] قبل [['2']] قبل [['9']]، فـ [['10']] جه الأول. عشان كده الأرقام تتخزن في أعمدة أرقام. ([[VALUES (...) v(x)]] هنا مجرد جدول مؤقت صغير عشان نجرّب، اسمه v وعموده x.)

### NULL

~~~text SELECT x FROM (VALUES (1),(NULL),(3)) v(x) ORDER BY x;
 x
---
 1
 3

(3 rows)
~~~

~~~text نفس الاستعلام بـ ORDER BY x DESC
 x
---

 3
 1
(3 rows)
~~~

Postgres بيعتبر NULL أكبر من أي قيمة: في الآخر مع ASC، وفي الأول مع DESC. psql بيعرض NULL كسطر فاضي (هو الصف التالت في الأول، والأول في التاني). ولو عايز غير كده: [[NULLS FIRST]] أو [[NULLS LAST]].

---

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| [[ORDER BY col]] / [[ASC]] | من الصغير للكبير (الافتراضي) |
| [[ORDER BY col DESC]] | من الكبير للصغير |
| [[ORDER BY a, b]] | بـ a، ولو متساويين بـ b |
| [[LIMIT n]] | أول n صف بعد الترتيب |
| [[OFFSET n]] | عدّي أول n صف |

- من غير ORDER BY مفيش ترتيب مضمون، ومع LIMIT من غير ORDER BY «أول ٥» ملهاش معنى.
- الصفوف المتساوية ترتيبها بينها ممكن يتغير في أي لحظة: حط عمود فريد في آخر الترتيب.
- الترتيب بيحصل بعد WHERE و SELECT، فتقدر ترتب باسم AS.`,
          lines: [
            "الأغلى الأول.",
            "الأغلى الأول، ولو السعر متساوي بالاسم أبجدي.",
            "آخر ٥ أوردرات.",
            "الصفحة التالتة لو كل صفحة ١٠: عدّي ٢٠ وخد ١٠."
          ],
          sol: R`مع منتجين بنفس السعر، [[ORDER BY price LIMIT 1]] ممكن يرجّع واحد مرة والتاني مرة بعد كل UPDATE. في تجربة حقيقية على Postgres: Pen، وبعد UPDATE على Pen بقى Pin، وبعد UPDATE على Pin رجع Pen. السبب إن UPDATE في Postgres بيكتب نسخة جديدة من الصف في مكان تاني في الجدول، والترتيب بين الصفوف المتساوية مش محدد، فبيطلع على حسب مكانها على الديسك.

بعد [[ORDER BY price, id]] النتيجة ثابتة دايمًا (صاحب الـ id الأصغر). ده مهم جدًا في الـ pagination: من غير عمود فريد في آخر الترتيب، نفس المنتج ممكن يظهر في صفحتين أو ميظهرش خالص. ولو لقيت النتيجة ثابتة من غير id، ده حظ مش ضمان.`,
          solCode: R`INSERT INTO products (name, price, stock) VALUES ('Pen', 50, 10), ('Pin', 50, 10);
SELECT id, name FROM products ORDER BY price LIMIT 1;       -- Pen
UPDATE products SET stock = 9 WHERE name = 'Pen';
SELECT id, name FROM products ORDER BY price LIMIT 1;       -- ممكن يبقى Pin
SELECT id, name FROM products ORDER BY price, id LIMIT 1;   -- دايمًا Pen
DELETE FROM products WHERE name IN ('Pen', 'Pin');`,
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
  (8, 'Pin', 15.00, 40, true);`,
            starter: R`SELECT name, price FROM products
ORDER BY price
LIMIT 3;`,
            expect: [["Sticker",0], ["Old Poster",0], ["Pen",15]],
            solution: R`SELECT name, price FROM products
ORDER BY price, id
LIMIT 3;`,
            ordered: true
          }
        },
        {
          cmd: "LIKE و ILIKE",
          title: "دوّر على جزء من نص",
          desc: R`[[LIKE]] بيطابق نص بنمط: [[%]] معناها أي عدد من الحروف، و [[_]] حرف واحد بالظبط. [[ILIKE]] نفس الفكرة بس مش فارق معاه حروف كبيرة أو صغيرة (دي في Postgres بس). ده أبسط بحث في المنتجات أو اليوزرز.

والبحث بـ [[%كلمة%]] على جدول كبير بطيء، لأن الـ index العادي مش بيساعد لما النمط يبدأ بـ %.`,
          example: R`SELECT name FROM products WHERE name LIKE 'T-%';
SELECT email FROM users WHERE email ILIKE '%@example.com';
SELECT name FROM products WHERE name ILIKE '%shirt%';
SELECT name FROM products WHERE name LIKE '_ug';
SELECT name FROM products WHERE name NOT ILIKE '%test%';`,
          try: R`جرّب [[LIKE '%Shirt%']] و [[ILIKE '%Shirt%']] وشوف مين لقى T-shirt. وبعدين دوّر على منتج اسمه فيه [[%]] فعلًا: هتحتاج [[ESCAPE]] أو [[\%]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات المنتجات اللي اسمها فيه علامة [[%]] حقيقية (مش wildcard).`,
          flag: "script",
          deep: {
            why: "خانة البحث في أي لوحة أدمن أو متجر. قبل ما تفكر في محرك بحث كامل، ILIKE بيحل ٩٠٪ من الحالات في الجداول الصغيرة والمتوسطة.",
            how: R`LIKE حساس لحالة الحروف، و ILIKE لأ. B-tree index عادي ممكن يساعد في [[LIKE 'abc%']] (بادئة) بس لو الـ collation هي C أو الـ index معمول بـ [[text_pattern_ops]]. لكن [[%abc%]] مفيهاش بداية ثابتة، فلازم يقرا كل الصفوف.

للبحث الجد: extension اسمها [[pg_trgm]] مع GIN index ([[CREATE INDEX ... USING gin (name gin_trgm_ops)]]) بتخلي ILIKE بـ %...% سريع جدًا، أو full-text search بـ [[tsvector]] للبحث بالكلمات.

ومن الكود: النمط بتبنيه في الكود وتبعته parameter: [[WHERE name ILIKE $1]] والقيمة [['%' + q + '%']]، وده آمن من injection. بس لو اليوزر كتب [[%]] هيطابق كل حاجة، فلو مهم اعمل escape لـ % و _ في النص بتاعه. نفس الفكرة في Prisma: [[{ contains: q, mode: "insensitive" }]] بيتحول ILIKE، وفي supabase-js [[.ilike("name", pattern)]].`,
            when: "بحث بسيط في جداول لحد عشرات الآلاف من الصفوف. أكتر من كده، أو محتاج ترتيب بالأقرب، روح لـ pg_trgm أو full-text.",
            mistakes: R`تلزق كلمة البحث في نص الاستعلام. LIKE وتستغرب إن «Shirt» ملقاش «shirt». و ILIKE %...% على مليون صف من غير trigram index، والصفحة تاخد ثواني.`
          },
          teach: R`## الفكرة: مقارنة بنمط بدل قيمة كاملة

[[=]] بيدوّر على نص مطابق بالظبط. [[LIKE]] بيدوّر على نص **شكله** زي نمط: «بيبدأ بكذا»، «فيه كذا في النص»، «٣ حروف آخرهم ug». النمط فيه رمزين بس:

| الرمز | معناه | مثال |
|---|---|---|
| [[%]] | أي عدد حروف، حتى صفر | [['T-%']] = بيبدأ بـ T- |
| [[_]] | حرف واحد بالظبط | [['_ug']] = ٣ حروف آخرهم ug |

و [[ILIKE]] (I = insensitive) نفس الكلام بس مش فارق معاه capital ولا small. الناتج تحت من psql على [[postgres:18]] جوه Docker: [[products]] فيه T-shirt بس، و [[users]] فيه [[you@example.com]].

---

## ١. [[SELECT name FROM products WHERE name LIKE 'T-%';]]

النمط [['T-%']]: أول حرفين [[T-]] بالظبط، وبعدهم أي حاجة. [[T-shirt]] = [[T-]] + [[shirt]].

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

LIKE حساس للحروف: [[t-shirt]] بـ t صغيرة مكانتش هتطابق.

---

## ٢. [[SELECT email FROM users WHERE email ILIKE '%@example.com';]]

[['%@example.com']]: أي حاجة، وبعدها [[@example.com]] **في الآخر**. ده «كل إيميلات الدومين ده». و ILIKE عشان الإيميلات ساعات بتتكتب بحروف كبيرة:

~~~text الناتج
      email
-----------------
 you@example.com
(1 row)
~~~

الفرق بين الاتنين على نفس النص:

~~~text SELECT 'YOU@EXAMPLE.COM' ILIKE '%@example.com' AS i, 'YOU@EXAMPLE.COM' LIKE '%@example.com' AS l;
 i | l
---+---
 t | f
~~~

---

## ٣. [[SELECT name FROM products WHERE name ILIKE '%shirt%';]]

[[%]] من الناحيتين = **فيه** shirt في أي مكان: في الأول أو النص أو الآخر.

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

ده الشكل اللي هتستخدمه في خانة البحث. وده كمان الشكل البطيء على الجداول الكبيرة: [[EXPLAIN]] بيوريك Postgres ناوي ينفّذ إزاي:

~~~text EXPLAIN SELECT name FROM products WHERE name ILIKE '%shirt%';
                        QUERY PLAN
----------------------------------------------------------
 Seq Scan on products  (cost=0.00..17.88 rows=1 width=32)
   Filter: (name ~~* '%shirt%'::text)
~~~

- [[Seq Scan]] = هيقرا الجدول كله صف صف. النمط بيبدأ بـ [[%]] فمفيش بداية ثابتة الـ index العادي يقدر يدوّر بيها.
- [[~~*]] هو اسم ILIKE جوه Postgres (و [[~~]] هو LIKE).

---

## ٤. [[SELECT name FROM products WHERE name LIKE '_ug';]]

[[_]] = حرف واحد بالظبط، وبعده [[ug]]، ومفيش حاجة بعدهم.

~~~text الناتج
 name
------
(0 rows)
~~~

مفيش Mug في الجدول لسه (هيتضاف في درس INSERT). عشان نشوف القاعدة على نصوص جاهزة:

~~~text SELECT 'Mug' LIKE '_ug' AS mug, 'Plug' LIKE '_ug' AS plug, 'ug' LIKE '_ug' AS ug, 'mug' LIKE 'M%' AS lower_m;
 mug | plug | ug | lower_m
-----+------+----+---------
 t   | f    | f  | f
~~~

- [[Mug]]: حرف + ug = تمام.
- [[Plug]]: حرفين قبل ug، و [[_]] واحد بس، فلأ.
- [[ug]]: مفيش حرف قبل ug، و [[_]] لازم حرف، فلأ.
- [[mug]] مع [['M%']]: m صغيرة و LIKE حساس، فلأ.

---

## ٥. [[SELECT name FROM products WHERE name NOT ILIKE '%test%';]]

[[NOT]] بتعكس: كل اللي **مفيهوش** test. مفيد تستبعد منتجات تجريبية.

~~~text الناتج
  name
---------
 T-shirt
(1 row)
~~~

---

## ٦. لما الرمز نفسه يبقى جزء من الكلام (الـ «جرّب»)

[[LIKE '%Shirt%']] رجّع [[(0 rows)]] و [[ILIKE '%Shirt%']] لقى T-shirt، نفس الكلام اللي فوق.

طب لو عايز تدوّر على [[_]] **حقيقية** في الاسم؟ [[_]] لوحدها معناها «أي حرف». الحل إنك تحط قبلها **escape character**، حرف بيقول «اللي بعدي ليه معناه العادي». في Postgres الافتراضي [[\]] (backslash):

~~~text SELECT 'snake_case' LIKE '%\_%' AS has_underscore, 'snakecase' LIKE '%_%' AS any_char, 'snakecase' LIKE '%\_%' AS esc;
 has_underscore | any_char | esc
----------------+----------+-----
 t              | t        | f
~~~

- [['%_%']] على [[snakecase]] = true، لأن [[_]] من غير escape معناها «أي حرف»، وأي كلمة فيها حرف.
- [['%\_%']] على [[snakecase]] = false: دلوقتي بيدوّر على [[_]] حقيقية ومفيش.

ولو مش عايز الـ backslash، اختار حرف escape بنفسك بـ [[ESCAPE]]:

~~~text SELECT 'a_b' LIKE '%!_%' ESCAPE '!' AS bang;
 bang
------
 t
~~~

[[ESCAPE '!']] = علامة التعجب بقت هي الـ escape، فـ [[!_]] = [[_]] حقيقية. ونفس الفكرة بالظبط على [[%]].

---

## الخلاصة

| النمط | بيطابق |
|---|---|
| [['abc%']] | بيبدأ بـ abc |
| [['%abc']] | بيخلص بـ abc |
| [['%abc%']] | فيه abc في أي مكان |
| [['_bc']] | ٣ حروف آخرهم bc |
| [['%\_%']] | فيه [[_]] حقيقية |

- LIKE حساس للحروف، و ILIKE لأ (ILIKE في Postgres بس).
- النمط اللي بيبدأ بـ [[%]] بيقرا الجدول كله ([[Seq Scan]])، وده بيبان على الجداول الكبيرة.
- [[%]] و [[_]] رموز، ولو عايزهم كحروف عادية حط قبلهم [[\]] أو حرف الـ ESCAPE بتاعك.`,
          lines: [
            "الأسماء اللي بتبدأ بـ T- (حساس للحروف).",
            "كل إيميلات الدومين ده، مهما كانت الحروف كبيرة أو صغيرة.",
            "أي اسم فيه shirt في أي مكان.",
            "حرف واحد أي حاجة وبعده ug، زي Mug.",
            "استبعد اللي فيها test."
          ],
          sol: R`[[LIKE '%Shirt%']] هيرجّع [[0 rows]] لأن الاسم [[T-shirt]] بـ s صغيرة و LIKE حساس لحالة الحروف. [[ILIKE '%Shirt%']] هيلاقي T-shirt.

للبحث عن [[%]] حقيقية: [[LIKE '%%%']] هيرجّع كل المنتجات، لأن الـ % بقت wildcard. الصح [[LIKE '%\%%']] (الـ backslash هو الـ escape الافتراضي في Postgres)، أو تختار حرف escape بنفسك: [[LIKE '%!%%' ESCAPE '!']]. نفس الكلام على [[_]]. ولو بتبني النمط من input المستخدم في الكود، لازم تعمل escape لـ [[%]] و [[_]] و [[\]] قبل ما تحطها بين علامتين %.`,
          solCode: R`SELECT name FROM products WHERE name LIKE '%Shirt%';    -- 0 rows
SELECT name FROM products WHERE name ILIKE '%Shirt%';   -- T-shirt
BEGIN;
INSERT INTO products (name, price) VALUES ('50% off bag', 100), ('Big bag', 100);
SELECT name FROM products WHERE name LIKE '%%%';                 -- الكل
SELECT name FROM products WHERE name LIKE '%\%%';                -- 50% off bag بس
SELECT name FROM products WHERE name LIKE '%!%%' ESCAPE '!';     -- 50% off bag بس
ROLLBACK;`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (id int PRIMARY KEY, name text NOT NULL);
INSERT INTO products VALUES (1, '50% Off Mug'), (2, 'Plain Mug'), (3, '100% Cotton Tee'), (4, 'T-shirt'), (5, 'Discount_Pen');`,
            starter: R`SELECT name FROM products WHERE name LIKE '%%%';`,
            expect: [["50% Off Mug"], ["100% Cotton Tee"]],
            solution: R`SELECT name FROM products WHERE name LIKE '%\%%';`
          }
        },
        {
          cmd: "NULL",
          title: "القيمة المجهولة، وليه = مش شغالة معاها",
          desc: R`[[NULL]] معناها «مش معروف» أو «مفيش قيمة»، مش صفر ومش نص فاضي. وأي مقارنة مع NULL نتيجتها NULL (لا true ولا false)، فـ [[WHERE x = NULL]] عمرها ما هترجع صف. الصح [[IS NULL]] و [[IS NOT NULL]].

و [[COALESCE(a, b)]] بترجّع أول قيمة مش NULL، ودي بتحط بيها قيمة بديلة في العرض أو الحساب.`,
          example: R`ALTER TABLE users ADD COLUMN phone text;
SELECT email FROM users WHERE phone = NULL;          -- 0 rows دايمًا
SELECT email FROM users WHERE phone IS NULL;
SELECT email, COALESCE(phone, 'no phone') AS phone FROM users;
SELECT count(*) AS all_users, count(phone) AS with_phone FROM users;
SELECT NULL = NULL, NULL IS NULL, 5 + NULL;          -- NULL, true, NULL`,
          try: R`حط رقم تليفون ليوزر واحد، وجرّب [[WHERE phone <> '0100']]: اليوزرز اللي تليفونهم NULL مش هيظهروا، مع إن تليفونهم فعلًا مش 0100. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: هات إيميلات كل اليوزرز اللي تليفونهم مش [['0100']]، ومنهم اللي ملوش تليفون أصلًا.`,
          flag: "script",
          deep: {
            why: "الداتا الحقيقية فيها حاجات مش معروفة: تليفون محدش دخّله، أو وقت شحن لأوردر لسه متشحنش. NULL هو الطريقة القياسية تقول «مفيش قيمة». بس قواعده غريبة، ولو مفهمتهاش هتلاقي صفوف بتختفي من التقارير من غير سبب واضح.",
            how: R`SQL شغال بـ three-valued logic: TRUE و FALSE و UNKNOWN. [[NULL = 5]] نتيجتها UNKNOWN، و [[NOT UNKNOWN]] برضه UNKNOWN. و WHERE بيعدّي TRUE بس.

في الحساب: [[5 + NULL]] = NULL. أما الـ aggregates فبتتجاهل NULL: [[count(phone)]] بيعد اللي مش NULL بس، و [[count(*)]] بيعد الصفوف كلها، و [[avg]] مش بيحسب الـ NULL كصفر، بيشيله من الحساب خالص.

[[a IS DISTINCT FROM b]] مقارنة بتعامل NULL كقيمة عادية (NULL مع NULL = مش مختلفين). و [[NULLIF(a, b)]] بترجّع NULL لو القيمتين زي بعض، ودي بتحمي من القسمة على صفر: [[x / NULLIF(y, 0)]].

و UNIQUE بيسمح بكذا NULL (لأن NULL مش بيساوي NULL). وفي JavaScript بتوصلك [[null]]، وفي Prisma العمود اللي ممكن يبقى NULL بتكتبه بعلامة استفهام: [[String?]].`,
            when: "في التصميم: NULL للحاجة اللي ممكن فعلًا متبقاش موجودة (shipped_at قبل الشحن). والحاجة اللي لازم يبقى ليها قيمة دايمًا: NOT NULL و DEFAULT.",
            mistakes: R`[[= NULL]] بدل [[IS NULL]]. [[<>]] بيستبعد الـ NULL من غير ما تاخد بالك. و [[avg]] وانت فاكر الفاضي اتحسب صفر. واستخدام NULL والنص الفاضي [['']] الاتنين بمعنى «مفيش»، فكل استعلام محتاج يشيك على الحالتين.`
          },
          teach: R`## الفكرة: NULL مش قيمة، هو «مش عارف»

لو سألتك «تليفون علي بيساوي 0100؟» وانت مش عارف تليفون علي، الإجابة الأمينة مش «أيوه» ولا «لأ»، هي «مش عارف». SQL بيفكر كده بالظبط: أي مقارنة مع [[NULL]] نتيجتها NULL (مش معروف). وبما إن [[WHERE]] بيعدّي الـ true بس، الصفوف دي بتختفي. المثال بيوريك الفخ ده والطرق الصح.

الناتج تحت من psql على [[postgres:18]] جوه Docker: [[users]] فيه يوزر واحد ([[you@example.com]]).

---

## ١. [[ALTER TABLE users ADD COLUMN phone text;]]

| الحتة | معناها |
|---|---|
| [[ALTER TABLE users]] | عدّل **تعريف** جدول users (مش الداتا) |
| [[ADD COLUMN phone text]] | ضيف عمود اسمه phone نوعه نص |

مفيش [[NOT NULL]] ولا [[DEFAULT]]، فكل الصفوف الموجودة قيمتها في العمود الجديد NULL.

~~~text الناتج
ALTER TABLE
~~~

---

## ٢. [[SELECT email FROM users WHERE phone = NULL;]]

~~~text الناتج
 email
-------
(0 rows)
~~~

مع إن تليفون اليوزر فعلًا NULL! ليه؟ [[phone = NULL]] معناها «هل القيمة المجهولة بتساوي القيمة المجهولة؟»، والإجابة «مش معروف» (NULL)، مش true. فالصف ميعديش. الشرط ده عمره ما هيرجّع صف، أيًا كانت الداتا.

---

## ٣. [[SELECT email FROM users WHERE phone IS NULL;]]

[[IS NULL]] مش مقارنة، ده سؤال مخصوص: «الخانة دي فاضية؟». وإجابته دايمًا true أو false.

~~~text الناتج
      email
-----------------
 you@example.com
(1 row)
~~~

وعكسها [[IS NOT NULL]].

---

## ٤. [[SELECT email, COALESCE(phone, 'no phone') AS phone FROM users;]]

[[COALESCE(a, b, ...)]] بترجّع **أول قيمة مش NULL** من الليستة. التليفون NULL، فبترجّع [['no phone']]. ولو كان فيه تليفون كانت هترجّعه هو.

~~~text الناتج
      email      |  phone
-----------------+----------
 you@example.com | no phone
(1 row)
~~~

ده للعرض بس: الجدول لسه فيه NULL. و [[AS phone]] عشان العمود يفضل اسمه phone بدل [[coalesce]].

---

## ٥. [[SELECT count(*) AS all_users, count(phone) AS with_phone FROM users;]]

| الدالة | بتعد إيه |
|---|---|
| [[count(*)]] | كل الصفوف |
| [[count(phone)]] | الصفوف اللي phone فيها **مش** NULL |

~~~text الناتج
 all_users | with_phone
-----------+------------
         1 |          0
(1 row)
~~~

يوزر واحد، ومفيش حد ليه تليفون. نفس الحكاية مع [[sum]] و [[avg]]: بيتجاهلوا NULL. جرّبناها على 10 و 20 و NULL:

~~~text SELECT avg(x) AS avg_skip_null, avg(COALESCE(x,0)) AS avg_null_as_zero FROM (VALUES (10),(20),(NULL)) v(x);
    avg_skip_null    |  avg_null_as_zero
---------------------+---------------------
 15.0000000000000000 | 10.0000000000000000
~~~

[[avg]] شال الـ NULL خالص: (10 + 20) ÷ 2 = 15. ولو عايز NULL يتحسب صفر لازم تقول كده بـ COALESCE: (10 + 20 + 0) ÷ 3 = 10.

---

## ٦. [[SELECT NULL = NULL, NULL IS NULL, 5 + NULL;]]

~~~text الناتج
 ?column? | ?column? | ?column?
----------+----------+----------
          | t        |
(1 row)
~~~

الخانة الأولى والتالتة فاضيين: ده شكل NULL في psql. عشان تشوفه صريح، [[\pset null '(null)']] (أمر psql بيغيّر شكل عرض NULL بس):

~~~text بعد \pset null '(null)'
 ?column? | ?column? | ?column?
----------+----------+----------
 (null)   | t        |   (null)
~~~

| التعبير | النتيجة | ليه |
|---|---|---|
| [[NULL = NULL]] | NULL | مجهول يساوي مجهول؟ مش معروف |
| [[NULL IS NULL]] | true | سؤال «فاضي؟» إجابته أكيدة |
| [[5 + NULL]] | NULL | خمسة زائد حاجة مش معروفة = مش معروف |

---

## ٧. فخ [[<>]] (الـ «جرّب»)

ضفنا يوزر تاني من غير تليفون، وحطينا [[0123]] للأول، جوه [[BEGIN]]:

~~~text BEGIN; INSERT ... ('sara@example.com', 'Sara'); UPDATE users SET phone = '0123' WHERE email = 'you@example.com';
BEGIN
INSERT 0 1
UPDATE 1
~~~

وبعدين «هات اللي تليفونهم مش 0100»:

~~~text SELECT email FROM users WHERE phone <> '0100';
      email
-----------------
 you@example.com
(1 row)
~~~

Sara اختفت، مع إن تليفونها أكيد مش 0100 (معندهاش تليفون أصلًا). [[NULL <> '0100']] = NULL، فالصف اترمى. وبعدها [[ROLLBACK;]].

الحل في مقارنة بتعامل NULL كقيمة عادية: [[IS DISTINCT FROM]] («مختلف عن»). شوفها على قيم ثابتة:

~~~text SELECT NULL IS DISTINCT FROM NULL AS a, 5 IS DISTINCT FROM NULL AS b, NULL <> 5 AS c;
 a | b |   c
---+---+--------
 f | t | (null)
~~~

- [[a]]: NULL و NULL «مش مختلفين» = false.
- [[b]]: 5 و NULL مختلفين = **true**، مش NULL.
- [[c]]: نفس السؤال بـ [[<>]] = NULL، وده اللي بيضيّع الصفوف.

### حاجة زيادة: [[NULLIF]]

[[NULLIF(a, b)]] عكس COALESCE تقريبًا: بترجّع NULL لو [[a = b]]. أشهر استخدام: حماية من القسمة على صفر:

~~~text SELECT 10 / NULLIF(0, 0) AS safe;
  safe
--------
 (null)
~~~

من غيرها [[10 / 0]] بيطلّع [[ERROR: division by zero]]. معاها النتيجة NULL، وتقدر تلفها بـ COALESCE.

---

## الخلاصة

| عايز | اكتب | مش |
|---|---|---|
| الفاضي | [[IS NULL]] | [[= NULL]] |
| اللي ليه قيمة | [[IS NOT NULL]] | [[<> NULL]] |
| مختلف ومعاهم الـ NULL | [[IS DISTINCT FROM]] | [[<>]] |
| قيمة بديلة | [[COALESCE(x, بديل)]] | — |
| عد الكل / عد اللي ليهم قيمة | [[count(*)]] / [[count(col)]] | — |

- أي مقارنة أو حساب مع NULL = NULL، و WHERE بيعدّي true بس.
- الـ aggregates بتتجاهل NULL (إلا [[count(*)]])، و [[avg]] مش بيحسبه صفر.
- [[ALTER TABLE ... ADD COLUMN]] من غير DEFAULT = الصفوف القديمة كلها NULL.`,
          lines: [
            "ضيف عمود تليفون اختياري، فكل الصفوف القديمة قيمتها NULL.",
            "غلط: المقارنة بـ = مع NULL نتيجتها NULL، فمفيش صف بيعدّي.",
            "صح: IS NULL.",
            "اعرض قيمة بديلة مكان الـ NULL.",
            "count(*) بيعد كل الصفوف، و count(phone) بيعد اللي ليهم تليفون بس.",
            "NULL مش بتساوي نفسها، و IS NULL بترجّع true، وأي حساب مع NULL بيبقى NULL."
          ],
          sol: R`عشان تشوف المشكلة لازم يبقى عندك يوزر تاني من غير تليفون. ضيف واحد، وحط [[0123]] لليوزر الأول. [[WHERE phone <> '0100']] هيرجّع اليوزر الأول بس، والتاني اختفى، لأن [[NULL <> '0100']] نتيجتها NULL مش true، و WHERE بيعدّي الـ true بس.

عشان تجيبهم الاتنين: [[WHERE phone IS DISTINCT FROM '0100']]، أو [[WHERE phone <> '0100' OR phone IS NULL]]. و IS DISTINCT FROM بيعامل NULL كقيمة عادية في المقارنة. نفس المشكلة بتحصل مع [[NOT IN]] ومع أي فلتر «مش بيساوي» في لوحة الأدمن.`,
          solCode: R`BEGIN;
INSERT INTO users (email, name) VALUES ('sara@example.com', 'Sara');
UPDATE users SET phone = '0123' WHERE email = 'you@example.com';
SELECT email FROM users WHERE phone <> '0100';                  -- you@example.com بس
SELECT email FROM users WHERE phone IS DISTINCT FROM '0100';    -- الاتنين
ROLLBACK;`,
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
            starter: R`SELECT email FROM users WHERE phone <> '0100';`,
            expect: [["sara@example.com"], ["ali@shop.eg"], ["omar@gmail.com"]],
            solution: R`SELECT email FROM users WHERE phone IS DISTINCT FROM '0100';`
          }
        }
      ]
    }
]);
