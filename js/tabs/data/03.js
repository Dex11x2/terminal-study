// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "الكتابة: INSERT و UPDATE و DELETE",
      l: 1,
      n: "تضيف وتعدّل وتمسح. والـ WHERE في التعديل والمسح هو الفرق بين شغل عادي وكارثة",
      items: [
        {
          cmd: "INSERT",
          title: "ضيف صف، أو كذا صف في أمر واحد",
          desc: R`[[INSERT INTO table (cols) VALUES (...)]] بيضيف صف. تقدر تبعت كذا صف في أمر واحد (أسرع بكتير من أمر لكل صف)، والأعمدة اللي مش مذكورة بتاخد الـ DEFAULT بتاعها أو NULL.

و [[RETURNING]] بيرجّعلك الصف اللي اتعمل بالـ id اللي اتولّد، من غير SELECT تاني. وده بالظبط اللي Prisma بيعمله وراك في [[create]].`,
          example: R`INSERT INTO products (name, price, stock) VALUES ('Mug', 120, 15);
INSERT INTO products (name, price, stock) VALUES
  ('Cap', 180, 0),
  ('Hoodie', 650, 8),
  ('Sticker', 15, 300)
RETURNING id, name;
INSERT INTO orders (user_id, total)
SELECT id, 0 FROM users WHERE email = 'you@example.com'
RETURNING id, status, created_at;`,
          try: R`اعمل INSERT لـ ٣ صفوف واحد فيهم سعره [[NULL]]: هتلاقي ولا صف اتضاف، مش الاتنين السليمين بس. الأمر الواحد يا كله يا ولا حاجة.`,
          flag: "script",
          deep: {
            why: "كل حاجة اليوزر بيعملها (تسجيل، أوردر، تعليق) بتبقى INSERT. ولما تستورد ألف منتج من شيت، الفرق بين ألف أمر وأمر واحد ممكن يبقى دقيقة مقابل ثانية.",
            how: R`في psql والكود، كل أمر لوحده transaction (autocommit). الـ INSERT المتعدد رحلة واحدة للقاعدة و commit واحد، عشان كده أسرع بكتير من loop.

الـ constraints بتتفحص لكل صف، ولو صف واحد فشل، الأمر كله بيفشل ومفيش ولا صف بيتضاف.

[[INSERT ... SELECT]] بياخد الصفوف من استعلام بدل VALUES، مفيد للنسخ والـ migrations. و [[RETURNING]] بيرجّع أي أعمدة من الصفوف اللي اتعملت، بما فيها اللي اتولّدت (id و created_at).

من Node بـ [[pg]]: [[await pool.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id', [name, price])]]. الـ [[$1]] و [[$2]] parameters، مش string بتتلزق. ولملايين الصفوف فيه [[COPY]]، والتفاصيل في تاب PostgreSQL درس [[\copy]].`,
            when: "أي إضافة. ولو بتضيف كذا صف مرة واحدة (بنود أوردر، استيراد)، أمر واحد متعدد أو [[createMany]] في Prisma.",
            mistakes: R`INSERT من غير أسماء الأعمدة ([[INSERT INTO products VALUES (...)]]): بيعتمد على ترتيب الأعمدة، وأول ما حد يضيف عمود بيبوظ. loop فيه ألف [[await]] كل واحد INSERT. وبناء VALUES بلزق النصوص.`
          },
          teach: R`## الفكرة: ٣ أشكال لـ INSERT

المثال فيه ٣ أوامر، كل واحد شكل: صف واحد، وكذا صف في أمر واحد مع [[RETURNING]]، والقيم جاية من استعلام بدل ما تتكتب بإيدك. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد كل الدروس اللي فاتت ([[products]] فيه T-shirt).

---

## ١. [[INSERT INTO products (name, price, stock) VALUES ('Mug', 120, 15);]]

| الحتة | معناها |
|---|---|
| [[INSERT INTO products]] | ضيف في جدول products |
| [[(name, price, stock)]] | الأعمدة اللي هبعتها، بالترتيب ده |
| [[VALUES ('Mug', 120, 15)]] | القيم بنفس الترتيب: الاسم ثم السعر ثم المخزون |

الأعمدة اللي مش مكتوبة ([[id]] و [[is_active]] و [[attrs]] و [[created_at]]) بتاخد الـ DEFAULT بتاعها.

~~~text الناتج
INSERT 0 1
~~~

[[1]] = صف واحد اتضاف.

---

## ٢. كذا صف في أمر واحد، و [[RETURNING]]

~~~text الأمر
INSERT INTO products (name, price, stock) VALUES
  ('Cap', 180, 0),
  ('Hoodie', 650, 8),
  ('Sticker', 15, 300)
RETURNING id, name;
~~~

- بعد [[VALUES]] كذا مجموعة قيم، كل مجموعة بين [[( )]] وبينهم [[,]]. كل مجموعة = صف.
- السطور الجديدة والمسافات للقراية بس: ده أمر واحد لحد الـ [[;]].
- [[RETURNING id, name]]: بعد ما الصفوف تتضاف، رجّعلي العمودين دول منها. ده بيوفّر SELECT تاني عشان تعرف الـ ids اللي اتولّدت.

~~~text الناتج
 id |  name
----+---------
  7 | Cap
  8 | Hoodie
  9 | Sticker
(3 rows)

INSERT 0 3
~~~

- الجدول فوق ناتج RETURNING، و [[INSERT 0 3]] = ٣ صفوف اتضافت.
- الـ ids مش 2 و 3 و 4: Mug خد 6، والأرقام اللي قبلها راحت في محاولات فشلت أو صفوف اتمسحت في الدروس اللي فاتت. العدّاد مبيرجعش لورا.

ليه أمر واحد أحسن من ٣؟ كل أمر رحلة للقاعدة و commit لوحده. أمر واحد بـ ٣ صفوف (أو ألف) = رحلة واحدة و commit واحد.

---

## ٣. [[INSERT ... SELECT]]: القيم من استعلام

~~~text الأمر
INSERT INTO orders (user_id, total)
SELECT id, 0 FROM users WHERE email = 'you@example.com'
RETURNING id, status, created_at;
~~~

نفكه من جوه لبرة:

### [[SELECT id, 0 FROM users WHERE email = 'you@example.com']]

بيرجّع صف واحد فيه عمودين: الـ [[id]] بتاع اليوزر ده، والرقم [[0]] ثابت (SELECT ينفع يرجّع قيمة ثابتة جنب الأعمدة).

### [[INSERT INTO orders (user_id, total) ...]]

كل صف رجع من الـ SELECT بيتحط كصف جديد في orders: العمود الأول يروح [[user_id]]، والتاني يروح [[total]]. لو الـ SELECT رجّع ٥ صفوف كان هيضيف ٥ أوردرات، ولو رجّع صفر مش هيضيف حاجة ومش هيطلّع error.

### [[RETURNING id, status, created_at]]

بيرجّع الأعمدة اللي القاعدة ملتها لوحدها:

~~~text الناتج
 id | status  |          created_at
----+---------+-------------------------------
  4 | pending | 2026-10-07 08:28:20.871409+00
(1 row)

INSERT 0 1
~~~

[[status]] = [[pending]] من الـ DEFAULT، و [[created_at]] من [[now()]]. ميزة الشكل ده إنك مش محتاج تعرف الـ uuid بتاع اليوزر: الاستعلام بيجيبه بالإيميل.

---

## ٤. الأمر الواحد يا كله يا ولا حاجة (الـ «جرّب»)

~~~text SELECT count(*) FROM products;
 count
-------
     5
~~~

~~~text INSERT INTO products (name, price, stock) VALUES ('A', 10, 1), ('B', NULL, 1), ('C', 30, 1);
ERROR:  null value in column "price" of relation "products" violates not-null constraint
DETAIL:  Failing row contains (11, B, null, 1, t, {}, 2026-10-07 08:28:20.875021+00).
~~~

~~~text SELECT count(*) FROM products;
 count
-------
     5
~~~

لسه ٥: لا A اتضاف ولا C. الـ INSERT الواحد **statement** واحد، وأي statement في Postgres يا ينجح كله يا يفشل كله (atomic).

لاحظ في الـ [[DETAIL]] إن B خد id رقم [[11]]: يعني A خد 10 قبله، والاتنين راحوا. وأول INSERT سليم بعدها خد [[12]].

---

## الخلاصة

| الشكل | امتى |
|---|---|
| [[INSERT INTO t (a, b) VALUES (1, 2);]] | صف واحد |
| [[VALUES (...), (...), (...)]] | كذا صف مرة واحدة (أسرع من loop) |
| [[INSERT INTO t (a) SELECT ...]] | القيم جاية من جدول تاني |
| [[... RETURNING col]] | عايز اللي اتولّد (id، وقت) من غير SELECT تاني |

- اكتب أسماء الأعمدة دايمًا بعد اسم الجدول، والقيم بنفس الترتيب.
- اللي مش مكتوب ياخد الـ DEFAULT، أو NULL لو ملوش.
- psql بيرد [[INSERT 0 N]]، و N عدد الصفوف.
- صف واحد غلط = الأمر كله اترفض.`,
          lines: [
            "ضيف منتج واحد بالأعمدة اللي محتاجها.",
            "ضيف كذا منتج في أمر واحد:",
            "الصف الأول.",
            "التاني.",
            "التالت.",
            "رجّع الـ id والاسم للصفوف اللي اتعملت.",
            "ضيف أوردر، والقيم جاية من استعلام مش مكتوبة بإيدك:",
            "الـ user_id من جدول users بالإيميل.",
            "رجّع الـ id والحالة الافتراضية ووقت الإنشاء."
          ],
          sol: R`الأمر هيفشل بـ [[null value in column "price" of relation "products" violates not-null constraint]]، و [[SELECT count(*) FROM products]] قبله وبعده هيطلع نفس الرقم: ولا A ولا C اتضافوا. الـ INSERT الواحد (حتى لو فيه ١٠٠٠ صف) هو statement واحد، والـ statement في Postgres atomic.

حاجة هتلاحظها: لو عملت INSERT سليم بعدها، الـ id هيبقى نط رقمين أو تلاتة، لأن الصفوف اللي اتحسبت قبل الغلطة حجزت أرقام من الـ sequence. ولو شفت A و C اتضافوا، يبقى انت بعت ٣ أوامر INSERT منفصلة مش أمر واحد فيه ٣ صفوف.`,
          solCode: R`SELECT count(*) FROM products;
INSERT INTO products (name, price, stock) VALUES ('A', 10, 1), ('B', NULL, 1), ('C', 30, 1);
-- ERROR:  null value in column "price" of relation "products" violates not-null constraint
SELECT count(*) FROM products;   -- نفس الرقم`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL
);
INSERT INTO products (name, price, stock) VALUES ('T-shirt', 250.00, 10);`,
            starter: R`-- ضيف منتجين في أمر INSERT واحد: Cap سعره 180 والمخزون 5، و Mug سعره 120 والمخزون 20
-- الـ id بيتولّد لوحده، فمتكتبهوش. والـ SELECT اللي تحت بيرجّع الأسماء والأسعار من الأرخص للأغلى
INSERT INTO products ...;
SELECT name, price FROM products ORDER BY price;`,
            expect: [["Mug", 120], ["Cap", 180], ["T-shirt", 250]],
            solution: R`INSERT INTO products (name, price, stock) VALUES ('Cap', 180, 5), ('Mug', 120, 20);
SELECT name, price FROM products ORDER BY price;`,
            ordered: true
          }
        },
        {
          cmd: "UPDATE",
          title: "عدّل صفوف موجودة، والشرط قبل أي حاجة",
          desc: R`[[UPDATE table SET col = value WHERE ...]] بيعدّل كل الصفوف اللي بتطابق الـ WHERE. من غير WHERE بيعدّل الجدول كله، ومفيش undo.

وتقدر تحسب القيمة الجديدة من القديمة: [[stock = stock - 1]]. ودي أهم مما تبان: الحساب بيحصل جوه القاعدة في خطوة واحدة، بدل ما تقرا في الكود وتكتب تاني (ليه ده مهم في درس «atomic UPDATE»).`,
          example: R`UPDATE products SET price = 199.00 WHERE name = 'Cap';
UPDATE products SET stock = stock - 1 WHERE name = 'Mug' AND stock > 0 RETURNING stock;
UPDATE products SET is_active = false, stock = 0 WHERE name = 'Sticker';
UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';
UPDATE products SET price = 0;                -- من غير WHERE: كل المنتجات بقت ببلاش`,
          try: R`نفّذ سطر الـ pending مرتين: المرة الأولى psql هيقول [[UPDATE 1]] والتانية [[UPDATE 0]]، لأن الشرط مبقاش متحقق. ده بيمنع إن الأوردر يتدفع مرتين. وقبل آخر سطر اكتب [[BEGIN;]] وبعده [[ROLLBACK;]].`,
          flag: "script danger",
          deep: {
            why: "كل تغيير حالة في التطبيق UPDATE: أوردر اتدفع، منتج خلص، يوزر غيّر اسمه. والغلط فيه بيأثر على داتا موجودة وحقيقية، مش صف جديد تقدر تمسحه.",
            how: R`psql بيطبع [[UPDATE 3]] يعني ٣ صفوف اتعدلت. في الكود نفس الرقم بيوصلك: [[rowCount]] في pg، و [[count]] في [[updateMany]] بتاع Prisma. لو متوقع ١ وجالك ٠، يبقى الشرط اتكسر (المخزون خلص، أو الأوردر اتدفع قبل كده)، ودي معلومة لازم تتعامل معاها.

الشرط الزيادة [[AND status = 'pending']] بيخلي الـ UPDATE «حارس» لتغيير الحالة: ميتنفذش غير لو الصف لسه في الحالة المتوقعة.

جوه Postgres، الـ UPDATE مش بيكتب فوق الصف؛ بيعمل نسخة جديدة منه ويعلّم القديمة إنها ميتة، و VACUUM بينضفها بعدين (MVCC). عشان كده UPDATE على ملايين الصفوف بيكبّر الجدول مؤقتًا.

وأي UPDATE بإيدك على الإنتاج جوه [[BEGIN]] ... [[ROLLBACK]] الأول، والطريقة في تاب PostgreSQL درس «BEGIN و ROLLBACK».`,
            when: "أي تعديل. ولما التعديل معتمد على القيمة الحالية (مخزون، رصيد، عداد)، خلي الحساب جوه الـ SET نفسه.",
            mistakes: R`UPDATE من غير WHERE. تقرا القيمة في JavaScript وتكتبها تاني [[SET stock = 7]] بدل [[stock = stock - 1]]، فطلبين في نفس اللحظة يبوّظوا الرقم. و [[SET a = 1 AND b = 2]] بدل [[SET a = 1, b = 2]]: Postgres بيرفضها، بس MySQL بيقبلها بصمت وبيحط في a نتيجة شرط منطقي.`
          },
          teach: R`## الفكرة: SET بيقول «إيه»، و WHERE بيقول «فين»

[[UPDATE]] بيغيّر قيم في صفوف موجودة. [[SET]] فيه القيم الجديدة، و [[WHERE]] بيحدد أنهي صفوف. والرقم اللي psql بيرد بيه ([[UPDATE 1]]) هو عدد الصفوف اللي اتغيرت فعلًا، ودي أهم معلومة في الدرس. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد درس INSERT (فيه T-shirt و Mug و Cap و Hoodie و Sticker، وأوردرات [[pending]]).

---

## ١. [[UPDATE products SET price = 199.00 WHERE name = 'Cap';]]

| الحتة | معناها |
|---|---|
| [[UPDATE products]] | عدّل في جدول products |
| [[SET price = 199.00]] | خلّي عمود price قيمته 199.00 |
| [[WHERE name = 'Cap']] | في الصفوف اللي اسمها Cap بس |

~~~text الناتج
UPDATE 1
~~~

صف واحد اتعدّل. لو كان فيه ٣ منتجات اسمهم Cap كان هيقول [[UPDATE 3]]، وكلهم كانوا هيتعدلوا.

---

## ٢. [[UPDATE products SET stock = stock - 1 WHERE name = 'Mug' AND stock > 0 RETURNING stock;]]

### [[SET stock = stock - 1]]

القيمة الجديدة **محسوبة من القديمة**: [[stock]] على اليمين هو القيمة الحالية في الصف، والناتج بيتحط في [[stock]] اللي على الشمال. Mug كان 15 فبقى 14.

ليه ده أحسن من إنك تقرا 15 في الكود وتبعت [[SET stock = 14]]؟ لو اتنين اشتروا في نفس اللحظة، الاتنين هيقروا 15 ويبعتوا 14، والمخزون هيقل واحد بس بدل اتنين. [[stock - 1]] بيتحسب جوه القاعدة على القيمة الحقيقية لحظة التعديل.

### [[AND stock > 0]]

شرط حماية: متخصمش لو المخزون خلص، عشان ميبقاش بالسالب.

### [[RETURNING stock]]

رجّعلي القيمة **بعد** التعديل.

~~~text الناتج
 stock
-------
    14
(1 row)

UPDATE 1
~~~

وعلى منتج مخزونه صفر (Cap)، نفس الأمر:

~~~text UPDATE products SET stock = stock - 1 WHERE name = 'Cap' AND stock > 0 RETURNING stock;
 stock
-------
(0 rows)

UPDATE 0
~~~

[[UPDATE 0]]: الشرط موقّف التعديل، ومفيش error. في الكود بتشيك على الرقم ده: لو 0 يبقى «المنتج خلص».

---

## ٣. [[UPDATE products SET is_active = false, stock = 0 WHERE name = 'Sticker';]]

عمودين في نفس الأمر، والفاصل بينهم **فاصلة** [[,]].

~~~text الناتج
UPDATE 1
~~~

لو كتبت [[AND]] بدل الفاصلة، Postgres بيقراها كتعبير منطقي واحد ويرفض:

~~~text UPDATE products SET price = 1 AND stock = 2 WHERE name = 'Cap';
ERROR:  argument of AND must be type boolean, not type integer
LINE 1: UPDATE products SET price = 1 AND stock = 2 WHERE name = 'Ca...
                                    ^
~~~

قراها [[price = (1 AND (stock = 2))]]، و [[1]] رقم مش boolean. (MySQL بيقبل نفس الجملة ويحط في price نتيجة الشرط، من غير ما يقولك.)

---

## ٤. [[UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';]]

[[id = 1]] بيحدد الأوردر، و [[status = 'pending']] شرط زيادة: «غيّره بس لو لسه pending». نفّذناه مرتين ورا بعض:

~~~text المرة الأولى
UPDATE 1
~~~

~~~text المرة التانية
UPDATE 0
~~~

المرة التانية الأوردر بقى [[paid]]، فالشرط مبقاش متحقق ومحدش اتعدّل. يعني لو الدفع اتبعت مرتين بالغلط (اليوزر داس الزرار مرتين)، التانية هترجع [[0]] والكود يعرف إن الأوردر اتدفع قبل كده ومش هيخصم تاني.

---

## ٥. [[UPDATE products SET price = 0;]] من غير WHERE

من غير WHERE = **كل** صفوف الجدول. جربناها جوه [[BEGIN]] عشان نقدر نرجع:

~~~text BEGIN; و UPDATE products SET price = 0;
BEGIN
UPDATE 5
~~~

[[UPDATE 5]]: كل المنتجات الخمسة.

~~~text SELECT name, price FROM products;
  name   | price
---------+-------
 T-shirt |  0.00
 Hoodie  |  0.00
 Cap     |  0.00
 Mug     |  0.00
 Sticker |  0.00
(5 rows)
~~~

(لاحظ الترتيب اتلخبط: الصفوف اللي اتعدّلت قبل كده اتكتبت في أماكن جديدة، وده اللي اتشرح في درس «ORDER BY و LIMIT».)

~~~text ROLLBACK; و SELECT name, price, stock, is_active FROM products ORDER BY id;
ROLLBACK
  name   | price  | stock | is_active
---------+--------+-------+-----------
 T-shirt | 250.00 |    40 | t
 Mug     | 120.00 |    14 | t
 Cap     | 199.00 |     0 | t
 Hoodie  | 650.00 |     8 | t
 Sticker |  15.00 |     0 | f
(5 rows)
~~~

[[ROLLBACK]] رجّع الأسعار، والتعديلات اللي قبل الـ BEGIN (Cap بـ 199، و Mug 14، و Sticker مش نشط) فضلت لأنها اتحفظت قبل كده. من غير BEGIN مكانش فيه رجوع.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[SET col = value]] | قيمة جديدة ثابتة |
| [[SET col = col - 1]] | محسوبة من القديمة، جوه القاعدة |
| [[SET a = 1, b = 2]] | كذا عمود، بفاصلة مش AND |
| [[WHERE ... AND status = 'pending']] | عدّل بس لو الصف لسه في الحالة المتوقعة |
| [[RETURNING col]] | القيمة بعد التعديل |

- اقرا رقم [[UPDATE N]] دايمًا: 0 معناه الشرط مش متحقق، ورقم كبير معناه الـ WHERE أوسع من اللي فاكره.
- UPDATE من غير WHERE بيعدّل الجدول كله. لو بتعدّل بإيدك، [[BEGIN]] الأول وبص على الناتج قبل [[COMMIT]].`,
          lines: [
            "غيّر سعر منتج واحد.",
            "اخصم واحد من المخزون لو لسه فيه، ورجّع الرقم الجديد.",
            "غيّر عمودين مرة واحدة: الفاصل كومة مش AND.",
            "غيّر الحالة بس لو لسه pending: مينفعش يتدفع مرتين.",
            "الكارثة: من غير WHERE كل الصفوف اتعدلت."
          ],
          sol: R`أول مرة: [[UPDATE 1]] والأوردر بقى paid. تاني مرة: [[UPDATE 0]]، لأن الصف مبقاش pending فمحدش طابق الشرط. في الكود بتقرا [[rowCount]]: لو 0 يبقى الأوردر اتدفع قبل كده (أو مش موجود)، فمتخصمش فلوس تاني. ده أبسط شكل من الـ idempotency.

السطر الأخير جوه [[BEGIN;]] هيقول [[UPDATE 5]] (أو عدد كل المنتجات)، و [[SELECT name, price FROM products;]] هيوريك كله [[0.00]]. بعد [[ROLLBACK;]] الأسعار رجعت. لو نسيت الـ BEGIN ونفّذته، الأسعار اتصفرت فعلًا، ومفيش undo غير backup أو إنك ترجّعها بإيدك.`,
          solCode: R`UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';   -- UPDATE 1
UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending';   -- UPDATE 0
BEGIN;
UPDATE products SET price = 0;
SELECT name, price FROM products;   -- كله 0.00
ROLLBACK;
SELECT name, price FROM products;   -- الأسعار رجعت`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10),
  (2, 'Mug', 120.00, 0),
  (3, 'Hoodie', 650.00, 4);`,
            starter: R`-- خلّي سعر Mug بـ 140 والمخزون 15، في أمر UPDATE واحد ومن غير ما تلمس باقي المنتجات
-- والـ SELECT اللي تحت بيرجّع الـ Mug بعد التعديل
UPDATE products SET ...;
SELECT name, price, stock FROM products WHERE name = 'Mug';`,
            expect: [["Mug", 140, 15]],
            solution: R`UPDATE products SET price = 140, stock = 15 WHERE name = 'Mug';
SELECT name, price, stock FROM products WHERE name = 'Mug';`
          }
        },
        {
          cmd: "DELETE",
          title: "امسح صفوف، أو الأحسن متمسحهاش أصلًا",
          desc: R`[[DELETE FROM table WHERE ...]] بيمسح الصفوف اللي بتطابق، ومن غير WHERE بيمسح الجدول كله. قبل أي DELETE مهم، شغّل نفس الـ WHERE في [[SELECT count(*)]] الأول وشوف العدد.

وفي الداتا المهمة (أوردرات، يوزرز، فواتير) الأحسن غالبًا «soft delete»: عمود [[deleted_at]] بتحط فيه الوقت بدل ما تمسح، فالتاريخ يفضل موجود وتقدر ترجّعه.`,
          example: R`SELECT count(*) FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';
DELETE FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';
DELETE FROM products WHERE name = 'Sticker' RETURNING id, name;
ALTER TABLE products ADD COLUMN deleted_at timestamptz;
UPDATE products SET deleted_at = now() WHERE name = 'Cap';
SELECT name FROM products WHERE deleted_at IS NULL;`,
          try: R`اعمل soft delete لمنتج، وبعدين اعمل [[SELECT name FROM products]] من غير الشرط: هتلاقيه لسه ظاهر. ده أكبر عيب في الـ soft delete: كل استعلام لازم يفتكر الشرط.`,
          flag: "script danger",
          deep: {
            why: "المسح النهائي مالوش رجوع غير من باك أب. ويوزر بيقول «أنا مسحت الأوردر بالغلط» أو محاسب بيسأل عن فاتورة من سنة، ساعتها هتفرق معاك إنك مسحت ولا علّمت.",
            how: R`DELETE بيعلّم الصفوف إنها ميتة، والمساحة بترجع للاستخدام بعد VACUUM. والـ foreign keys ممكن تمنع المسح أو تمسح صفوف تانية معاه (درس ON DELETE في المستوى التاني).

[[TRUNCATE]] بيفضّي الجدول كله في لحظة من غير ما يعدّي صف صف، و [[RESTART IDENTITY]] بيرجّع الترقيم من الأول. ده أداة للـ lab والاختبارات، مش لكود التطبيق.

الـ soft delete ليه تمن: كل استعلام لازم يفلتر [[deleted_at IS NULL]] (سهل تنساه)، والـ UNIQUE بيبقى محتاج partial index ([[WHERE deleted_at IS NULL]]) عشان يوزر ممسوح ميمنعش حد يسجل بنفس الإيميل، وقوانين الخصوصية أحيانًا بتطلب مسح حقيقي.`,
            when: "مسح حقيقي للداتا المؤقتة (sessions منتهية، أكواد OTP قديمة). soft delete للداتا اللي ليها قيمة تاريخية أو مالية.",
            mistakes: R`DELETE من غير WHERE، أو بـ WHERE فيها OR من غير أقواس. soft delete وتنسى الفلتر في صفحة واحدة، فالمنتجات الممسوحة تظهر في المتجر. وإيميل UNIQUE مع soft delete، فاليوزر اللي مسح حسابه ميقدرش يسجل تاني.`
          },
          teach: R`## الفكرة: عُد قبل ما تمسح، أو متمسحش أصلًا

المثال جزئين. الأول مسح حقيقي بـ [[DELETE]]، بالطريقة الآمنة: نفس الـ WHERE في [[SELECT count(*)]] الأول، وبعدين المسح. التاني **soft delete**: بدل ما الصف يتمسح، بنكتب في عمود إمتى «اتمسح»، وكل قراية بتستبعده. الناتج تحت من psql على [[postgres:18]] جوه Docker، بعد درس UPDATE.

---

## ١. [[SELECT count(*) FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';]]

الشرط:
- [[status = 'cancelled']]: الأوردرات الملغية.
- [[created_at < now() - interval '90 days']]: اتعملت **قبل** ٩٠ يوم من دلوقتي. [[now() - interval '90 days']] لحظة في الماضي، و [[<]] قبلها.

~~~text SELECT now() - interval '90 days' AS cutoff;
            cutoff
-------------------------------
 2026-07-09 08:28:48.185372+00
~~~

يعني أي أوردر ملغي قبل ٩ يوليو.

~~~text الناتج
 count
-------
     0
(1 row)
~~~

عندنا مفيش أوردرات ملغية خالص، فالعدد صفر. الخطوة دي بتقولك بالظبط الـ DELETE هيمسح كام قبل ما يمسح.

---

## ٢. [[DELETE FROM orders WHERE status = 'cancelled' AND created_at < now() - interval '90 days';]]

| الحتة | معناها |
|---|---|
| [[DELETE FROM orders]] | امسح صفوف من orders |
| [[WHERE ...]] | نفس الشرط **بالظبط** اللي عدّيت بيه |

مفيش أعمدة في DELETE: بيمسح الصف كله.

~~~text الناتج
DELETE 0
~~~

[[DELETE 0]] = نفس رقم العد. القاعدة: **الرقمين لازم يبقوا زي بعض**. لو العد قال 12 والمسح قال 3000، يبقى انت غيّرت الشرط بين الاتنين.

وعشان نشوف الأرقام مش صفر، ضفنا أوردر ملغي قديم جوه [[BEGIN]]:

~~~text BEGIN; INSERT INTO orders (user_id, status, created_at) SELECT id, 'cancelled', '2026-01-10 12:00+00' FROM users LIMIT 1;
BEGIN
INSERT 0 1
~~~

~~~text نفس الـ count ثم نفس الـ DELETE ثم ROLLBACK;
 count
-------
     1
(1 row)

DELETE 1
ROLLBACK
~~~

العد 1 والمسح 1: متطابقين. و [[ROLLBACK]] رجّع كل حاجة زي ما كانت.

---

## ٣. [[DELETE FROM products WHERE name = 'Sticker' RETURNING id, name;]]

[[RETURNING]] مع DELETE بيرجّع الصفوف **اللي اتمسحت**، فتشوف بعينك إيه اللي راح:

~~~text الناتج
 id |  name
----+---------
  9 | Sticker
(1 row)

DELETE 1
~~~

مفيد كمان تسجّل اللي اتمسح في log قبل ما يختفي.

---

## ٤. soft delete

### [[ALTER TABLE products ADD COLUMN deleted_at timestamptz;]]

عمود وقت جديد، مفيش NOT NULL، فكل المنتجات قيمته فيها NULL. والاتفاق: **NULL = موجود**، و**وقت = اتمسح في الوقت ده**.

~~~text الناتج
ALTER TABLE
~~~

### [[UPDATE products SET deleted_at = now() WHERE name = 'Cap';]]

ده «المسح»: UPDATE مش DELETE. الصف لسه في الجدول، بس عليه علامة.

~~~text الناتج
UPDATE 1
~~~

### [[SELECT name FROM products WHERE deleted_at IS NULL;]]

اقرا اللي **مش** ممسوح بس. ([[IS NULL]] مش [[= NULL]]، درس NULL.)

~~~text الناتج
  name
---------
 T-shirt
 Hoodie
 Mug
(3 rows)
~~~

Cap مش ظاهر.

---

## ٥. العيب الكبير (الـ «جرّب»)

~~~text SELECT name FROM products;
  name
---------
 T-shirt
 Hoodie
 Mug
 Cap
(4 rows)
~~~

من غير الشرط Cap رجع. وده مش في الـ SELECT البسيط بس، أي حساب بينسى الشرط بيحسبه:

~~~text SELECT round(avg(price), 2) AS avg_price, min(price), max(price) FROM products;
 avg_price |  min   |  max
-----------+--------+--------
    304.75 | 120.00 | 650.00
~~~

المتوسط ده فيه سعر Cap الممسوح (199): (250 + 120 + 199 + 650) ÷ 4 = 304.75. كل استعلام في المشروع لازم يفتكر [[deleted_at IS NULL]].

---

## الخلاصة

| | [[DELETE]] | soft delete |
|---|---|---|
| الصف | بيختفي | بيفضل، وعليه [[deleted_at]] |
| الرجوع | من backup بس | [[SET deleted_at = NULL]] |
| القراية | عادي | كل استعلام لازم [[WHERE deleted_at IS NULL]] |
| امتى | داتا مؤقتة (sessions، أكواد OTP) | أوردرات، يوزرز، فواتير |

- قبل أي DELETE: نفس الـ WHERE في [[SELECT count(*)]]، وقارن الرقم بـ [[DELETE N]].
- DELETE من غير WHERE بيفضّي الجدول كله.
- [[RETURNING]] بيوريك اللي اتمسح.`,
          lines: [
            "عد الأول: كام صف هيتمسح؟",
            "نفس الشرط بالظبط، بس المرة دي مسح.",
            "امسح منتج ورجّع اللي اتمسح عشان تتأكد.",
            "ضيف عمود للـ soft delete.",
            "بدل المسح: علّم إنه اتمسح إمتى.",
            "وكل قراية لازم تستبعد الممسوح."
          ],
          sol: R`بعد [[UPDATE products SET deleted_at = now() WHERE name = 'Cap']]، الاستعلام اللي فيه [[WHERE deleted_at IS NULL]] مش هيجيب Cap، لكن [[SELECT name FROM products]] من غير شرط هيجيبه عادي جنب الباقيين. يعني أي صفحة أو تقرير أو join نسي الشرط هيعرض منتج «ممسوح».

الحلول المعتادة: [[VIEW]] اسمها مثلًا active_products فيها الشرط والكود يقرا منها، أو global filter في الـ ORM، أو partial index [[WHERE deleted_at IS NULL]] عشان الاستعلامات اليومية تفضل سريعة. وافتكر إن الـ UNIQUE constraints لسه شايفة الصف الممسوح: لو عايز تضيف Cap جديد باسم unique هيترفض.`,
          solCode: R`UPDATE products SET deleted_at = now() WHERE name = 'Cap';
SELECT name FROM products WHERE deleted_at IS NULL;   -- من غير Cap
SELECT name FROM products;                            -- Cap لسه ظاهر`,
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10),
  (2, 'Old Poster', 50.00, 0),
  (3, 'Broken Cap', 20.00, 0);`,
            starter: R`-- امسح المنتجات اللي مخزونها خلص (stock = 0) بس
-- والـ SELECT اللي تحت بيرجّع الـ id والاسم للي فضل
DELETE FROM products ...;
SELECT id, name FROM products;`,
            expect: [[1, "T-shirt"]],
            solution: R`DELETE FROM products WHERE stock = 0;
SELECT id, name FROM products;`
          }
        }
      ]
    }
]);
