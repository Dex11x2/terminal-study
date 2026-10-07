// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
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
