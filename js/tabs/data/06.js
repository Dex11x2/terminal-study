// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "العلاقات بين الجداول",
      l: 2,
      n: "الداتا الحقيقية مرتبطة ببعض: يوزر ليه أوردرات، وأوردر فيه منتجات. والـ foreign key هو الخيط اللي بيربط",
      items: [
        {
          cmd: "one-to-many",
          title: "يوزر واحد ليه أوردرات كتير",
          desc: R`أشهر علاقة: صف في جدول يقابله صفوف كتير في جدول تاني. اليوزر ليه أوردرات كتير، والأوردر بتاع يوزر واحد. بتتعمل بعمود في جدول «الكتير» بيشاور على الـ primary key بتاع «الواحد»: [[orders.user_id]] بيشاور على [[users.id]].

و [[FOREIGN KEY ... REFERENCES]] بيخلي القاعدة تتأكد إن الـ user_id ده موجود فعلًا في users، فمفيش أوردر ليوزر مش موجود. في جدول جديد بتكتبه في التعريف على طول: [[user_id uuid NOT NULL REFERENCES users (id)]].`,
          example: R`ALTER TABLE orders
  ADD CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id);
CREATE INDEX orders_user_id_idx ON orders (user_id);
INSERT INTO orders (user_id) VALUES (gen_random_uuid());     -- error: violates foreign key constraint
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com');`,
          try: R`حاول تمسح اليوزر اللي ليه أوردرات: [[DELETE FROM users WHERE email = 'you@example.com']]. اقرا الـ error، وده موضوع درس ON DELETE.`,
          flag: "script",
          deep: {
            why: "من غير foreign key، الكود ممكن يعمل أوردر بـ user_id غلط، أو يمسح يوزر ويسيب أوردراته «يتيمة» بتشاور على حاجة مش موجودة. بعد سنة هتلاقي تقارير فيها أرقام ملهاش صاحب ومحدش عارف جت منين.",
            how: R`العمود دايمًا في ناحية «الكتير». عكس كده (لستة order_ids جوه users) بيكسر أول قاعدة في التصميم: كل خانة فيها قيمة واحدة.

الـ foreign key بيتنفذ بـ triggers داخلية. مع كل INSERT أو UPDATE على orders، Postgres بيدوّر على الـ id في users (سريع، لأنه primary key عليه index). ومع كل DELETE من users، بيدوّر في orders على صفوف بتشاور عليه. وهنا المشكلة: Postgres مش بيعمل index على عمود الـ foreign key لوحده، فمن غير [[orders_user_id_idx]] كل مسح يوزر وكل [[WHERE user_id = ...]] بيقرا جدول الأوردرات كله. التفاصيل في تاب PostgreSQL درس «الـ indexes».

في Prisma العلاقة بتتكتب [[@relation(fields: [userId], references: [id])]]، و Prisma بيعمل الـ FOREIGN KEY في الـ migration.`,
            when: "كل مرة جدول بيشاور على صف في جدول تاني. ومعاه index على عمود الـ FK، إلا لو الجدول صغير جدًا.",
            mistakes: R`تشيل الـ FK «عشان المرونة» فتتراكم صفوف يتيمة. FK من غير index. تربط بالإيميل بدل الـ id، فلما الإيميل يتغير الربط يتقطع. وفي مشروع حقيقي كان جدول المدفوعات مربوط «polymorphic» بعمودين: [[paymentableId]] و [[paymentableType]] (أوردر ولا اشتراك). مفيش FK حقيقي ينفع يتعمل على ده، فالقاعدة مش بتحمي الربط، والـ ORM ميعرفش يعمل include، والنتيجة N+1 (درس N+1 في المستوى التالت).`
          },
          teach: R`## الفكرة: عمود في «الكتير» بيشاور على «الواحد»

كل أوردر فيه عمود [[user_id]] شايل الـ id بتاع صاحبه. ده لوحده بيعمل العلاقة. اللي المثال بيزوّده إن القاعدة **تتأكد** إن الـ id ده موجود فعلًا (foreign key)، وإن البحث بيه يبقى سريع (index).

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. إضافة الـ foreign key

~~~text الأمر
ALTER TABLE orders
  ADD CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id);
~~~

| الحتة | معناها |
|---|---|
| [[ALTER TABLE orders]] | عدّل جدول موجود (مش هنعمله من الأول) |
| [[ADD CONSTRAINT orders_user_fk]] | ضيف شرط، واسمه [[orders_user_fk]] (fk = foreign key) |
| [[FOREIGN KEY (user_id)]] | العمود اللي في الجدول ده |
| [[REFERENCES users (id)]] | لازم قيمته تبقى موجودة في [[users.id]] |

اسم الـ constraint انت اللي اخترته عشان يبقى مفهوم في رسايل الـ error. لو مكتبتهوش، Postgres كان هيسميه [[orders_user_id_fkey]].

~~~text الناتج
ALTER TABLE
~~~

لو فيه أوردر قديم [[user_id]] بتاعه مش موجود في users، الأمر ده كان هيفشل، لأن Postgres بيراجع الصفوف الموجودة كلها وهو بيضيف الشرط.

---

## ٢. [[CREATE INDEX orders_user_id_idx ON orders (user_id);]]

[[CREATE INDEX اسم ON جدول (عمود)]]: اعمل فهرس على العمود ده. الفهرس زي فهرس الكتاب: بدل ما تقلّب كل الصفحات تدوّر على يوزر، بتروح لمكانه على طول.

ليه نعمله بإيدنا؟ لأن Postgres بيعمل index لوحده على الـ PRIMARY KEY و UNIQUE بس، **مش** على عمود الـ foreign key. شوف الجدولين:

~~~text \d orders
                                    Table "public.orders"
   Column   |           Type           | Collation | Nullable |           Default
------------+--------------------------+-----------+----------+------------------------------
 id         | bigint                   |           | not null | generated always as identity
 user_id    | uuid                     |           | not null |
 status     | text                     |           | not null | 'pending'::text
 total      | numeric(10,2)            |           | not null | 0
 created_at | timestamp with time zone |           | not null | now()
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
    "orders_user_id_idx" btree (user_id)
Foreign-key constraints:
    "orders_user_fk" FOREIGN KEY (user_id) REFERENCES users(id)
~~~

- [[orders_user_id_idx]] هو اللي لسه عاملينه. من غيره السطر ده مش هيبقى موجود.
- [[Foreign-key constraints]]: الشرط اللي ضفناه.
- [[btree]]: نوع الـ index الافتراضي (شجرة مترتبة)، والتفاصيل في درس B-tree index.

وفي الناحية التانية:

~~~text \d users (آخره)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_fk" FOREIGN KEY (user_id) REFERENCES users(id)
~~~

[[Referenced by]]: «فيه جدول بيشاور عليّا». ده اللي هيمنع مسح اليوزر بعد شوية.

---

## ٣. أوردر ليوزر مش موجود

~~~text الأمر
INSERT INTO orders (user_id) VALUES (gen_random_uuid());
~~~

[[gen_random_uuid()]] بيولّد uuid جديد عشوائي، يعني أكيد مش id ليوزر عندنا.

~~~text الناتج
ERROR:  insert or update on table "orders" violates foreign key constraint "orders_user_fk"
DETAIL:  Key (user_id)=(ea42cd2a-ca06-4d23-8859-5f7fea41cafb) is not present in table "users".
~~~

- [[insert or update on table "orders"]]: الشرط بيتفحص مع أي INSERT أو UPDATE على الجدول «الكتير».
- [[is not present in table "users"]]: القيمة دي ملهاش صاحب.

> الـ INSERT الفاشل ده حجز رقم id من الـ identity واتحرق، فالأوردر الجاي هياخد الرقم اللي بعده. ده طبيعي، والأرقام مش لازم تبقى ورا بعض.

---

## ٤. أوردرات يوزر معين

~~~text الأمر
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com');
~~~

الاستعلام اللي بين القوسين بيتنفذ الأول ويرجّع قيمة واحدة: الـ id بتاع اليوزر.

~~~text الاستعلام الداخلي لوحده
SELECT id FROM users WHERE email = 'you@example.com';
                  id
--------------------------------------
 f2a882ce-8651-45b3-a929-d1520162aa08
~~~

وبعدين الخارجي بيبقى كأنه [[WHERE user_id = 'f2a882ce-...']]. وده بالظبط البحث اللي الـ index اتعمل عشانه.

~~~text الناتج
 id | total
----+--------
  3 |   0.00
  4 |   0.00
  1 |   0.00
  5 | 300.00
  9 | 500.00
(5 rows)
~~~

الترتيب مش بالـ id لأننا مكتبناش [[ORDER BY]]، فالترتيب أي حاجة Postgres لقاها أسهل. (الـ id 9 هو أوردر الـ 500 من درس دوال التاريخ.)

لو الإيميل مش موجود، الاستعلام الداخلي بيرجّع NULL، و [[user_id = NULL]] مش true أبدًا، فالناتج [[(0 rows)]] من غير error.

---

## ٥. الـ «جرّب»: امسح يوزر ليه أوردرات

~~~text الناتج
DELETE FROM users WHERE email = 'you@example.com';
ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"
DETAIL:  Key (id)=(f2a882ce-8651-45b3-a929-d1520162aa08) is still referenced from table "orders".
~~~

نفس الـ constraint بيشتغل من الناحية التانية: [[is still referenced]] يعني «لسه فيه أوردرات بتشاور عليه». اليوزر متمسحش، والأوردرات مفضلتش يتيمة. وعشان Postgres يعرف ده، دوّر في orders على [[user_id]] ده، وهنا تاني الـ index بيفرق في جدول كبير.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| العلاقة | عمود [[user_id]] في جدول «الكتير» | كل أوردر يعرف صاحبه |
| الحماية | [[FOREIGN KEY (user_id) REFERENCES users (id)]] | مفيش أوردر ليوزر مش موجود، ولا يوزر يتمسح وسايب أوردرات |
| السرعة | [[CREATE INDEX ... ON orders (user_id)]] | Postgres مش بيعمله لوحده |

- الـ FK بيتفحص في الاتجاهين: INSERT/UPDATE على الابن، و DELETE/UPDATE على الأب.
- اسم الـ constraint بيظهر في الـ error، فسمّيه اسم مفهوم.
- عمل إيه وقت مسح الأب؟ الافتراضي «ارفض»، والباقي في درس ON DELETE.`,
          lines: [
            "عدّل جدول الأوردرات:",
            "ضيف foreign key: user_id لازم يبقى id موجود في users.",
            "index على عمود الـ FK (Postgres مش بيعمله لوحده).",
            "أوردر ليوزر مش موجود: مرفوض.",
            "أوردرات يوزر معين،",
            "والـ id جاي من استعلام بالإيميل."
          ],
          sol: R`هتاخد [[ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"]] ومعاه [[DETAIL:  Key (id)=(...) is still referenced from table "orders".]]. اليوزر متمسحش، لأن الافتراضي في أي FK هو [[NO ACTION]]: مينفعش تمسح أب ليه ولاد.

ده بالظبط اللي انت عايزه في الأوردرات: مسح يوزر مينفعش يمسح تاريخ مبيعات بالغلط. الاختيارات التانية (CASCADE أو SET NULL أو soft delete) في درس ON DELETE. لو المسح نجح، يبقى الـ ALTER TABLE اللي بيضيف الـ FK مكملش (غالبًا فيه أوردر قديم بـ user_id مش موجود في users، فالـ constraint اترفض)؛ اقرا الـ error بتاعه.`,
          solCode: R`DELETE FROM users WHERE email = 'you@example.com';
-- ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_fk" on table "orders"`
        },
        {
          cmd: "many-to-many",
          title: "أوردر فيه منتجات كتير، ومنتج في أوردرات كتير",
          desc: R`لما الطرفين «كتير»، مينفعش عمود واحد يربطهم. الحل جدول وسيط (join table) كل صف فيه بيربط أوردر بمنتج: [[order_items]]. والجدول ده المكان الطبيعي لأي معلومة تخص العلاقة نفسها: الكمية، والسعر وقت الشرا.

الـ primary key هنا مركب من العمودين [[(order_id, product_id)]]، فنفس المنتج مايتكررش في نفس الأوردر مرتين.`,
          example: R`CREATE TABLE order_items (
  order_id   bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id bigint NOT NULL REFERENCES products (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE INDEX order_items_product_idx ON order_items (product_id);
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';`,
          try: R`كرر نفس الـ INSERT: هتاخد duplicate key لأن المنتج موجود في الأوردر ده. وبعدين غيّر سعر الـ Mug في products، وشوف إن [[unit_price]] في البند متغيرش.`,
          flag: "script",
          deep: {
            why: "الحل اللي الناس بتعمله أول مرة: عمود [[product_ids]] فيه [['1,5,9']]. ده مينفعش تعمل عليه JOIN، ولا FK، ولا index، ولا تحط جنبه كمية لكل منتج. الجدول الوسيط بيحوّل العلاقة لصفوف عادية تستعلم عليها زي أي حاجة.",
            how: R`كل صف في order_items فيه foreign key لكل ناحية. الـ primary key المركب [[(order_id, product_id)]] بيعمل index بالترتيب ده، فبيخدم «بنود أوردر معين» ([[WHERE order_id = ?]]). بس «الأوردرات اللي فيها منتج معين» محتاجة index تاني على [[product_id]] لوحده، وده اللي عملناه.

[[unit_price]] متكرر من products عن قصد: ده السعر اللي اليوزر دفعه فعلًا، ولازم يفضل ثابت حتى لو السعر اتغير بكرة (درس denormalization).

في Prisma فيه نوعين: implicit (بتكتب لستة المنتجات في Order ولستة الأوردرات في Product، و Prisma يعمل جدول مخفي فيه الـ ids بس)، و explicit (بتكتب model للجدول الوسيط زي [[OrderItem]]). أول ما العلاقة يبقى ليها معلومة (كمية، سعر، تاريخ)، لازم explicit.`,
            when: "أوردرات ومنتجات، طلاب وكورسات، بوستات و tags، يوزرز وأدوار. أي «كتير لكتير».",
            mistakes: R`ids مفصولة بكومة في عمود نص. array column من غير FK. تنسى unit_price وتحسب الفواتير القديمة بالسعر الحالي. وتنسى index على العمود التاني في المفتاح المركب.`
          },
          teach: R`## الفكرة: جدول في النص، كل صف فيه «أوردر + منتج»

أوردر فيه منتجات كتير، ومنتج بيتباع في أوردرات كتير. مينفعش عمود [[product_id]] واحد في orders، ولا [[order_id]] واحد في products. الحل جدول تالت [[order_items]]: كل صف فيه بيقول «في الأوردر ده، المنتج ده، بالكمية دي، بالسعر ده».

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. تعريف الجدول الوسيط سطر سطر

~~~text الأمر
CREATE TABLE order_items (
  order_id   bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id bigint NOT NULL REFERENCES products (id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
~~~

### [[order_id bigint NOT NULL REFERENCES orders (id) ON DELETE CASCADE]]

- [[bigint]]: نفس نوع [[orders.id]]. عمود الـ FK لازم يبقى بنفس نوع اللي بيشاور عليه.
- [[REFERENCES orders (id)]]: foreign key مكتوب جوه تعريف العمود على طول (شكل مختصر من اللي في درس one-to-many).
- [[ON DELETE CASCADE]]: لو الأوردر اتمسح، امسح بنوده معاه. (التفاصيل في درس ON DELETE.)

### [[product_id bigint NOT NULL REFERENCES products (id)]]

FK للناحية التانية. من غير ON DELETE، يعني الافتراضي: مسح منتج ليه بنود هيترفض.

### [[quantity integer NOT NULL CHECK (quantity > 0)]]

[[CHECK (شرط)]]: أي صف لازم يحقق الشرط ده. كمية صفر أو بالسالب مالهاش معنى.

### [[unit_price numeric(10,2) NOT NULL]]

السعر **وقت الشرا**. [[numeric(10,2)]]: لحد ١٠ أرقام، منهم ٢ بعد العلامة (درس numeric للفلوس).

### [[PRIMARY KEY (order_id, product_id)]]

primary key **مركب** من عمودين: الاتنين مع بعض لازم يبقوا فريدين. يعني الأوردر 1 ينفع يبقى فيه منتج 8 ومنتج 10، ومنتج 8 ينفع يبقى في أوردر 1 وأوردر 5، بس **(1، 8)** مينفعش يتكرر.

~~~text \d order_items
                 Table "public.order_items"
   Column   |     Type      | Collation | Nullable | Default
------------+---------------+-----------+----------+---------
 order_id   | bigint        |           | not null |
 product_id | bigint        |           | not null |
 quantity   | integer       |           | not null |
 unit_price | numeric(10,2) |           | not null |
Indexes:
    "order_items_pkey" PRIMARY KEY, btree (order_id, product_id)
    "order_items_product_idx" btree (product_id)
Check constraints:
    "order_items_quantity_check" CHECK (quantity > 0)
Foreign-key constraints:
    "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
~~~

الأسامي اللي Postgres اختارها لوحده: [[_pkey]] للـ primary key، و [[_check]] للـ CHECK، و [[_fkey]] للـ foreign keys. هتشوفهم في رسايل الـ error.

---

## ٢. [[CREATE INDEX order_items_product_idx ON order_items (product_id);]]

الـ primary key المركب عمل index على [[(order_id, product_id)]] **بالترتيب ده**. زي دليل تليفون مترتب بالاسم الأول وبعدين الأخير: سهل تدوّر بالاسم الأول، بس صعب تدوّر بالأخير لوحده.

| السؤال | الـ index اللي بيخدمه |
|---|---|
| بنود أوردر معين ([[WHERE order_id = 1]]) | [[order_items_pkey]] |
| الأوردرات اللي فيها منتج معين ([[WHERE product_id = 8]]) | [[order_items_product_idx]] (اللي عملناه) |

---

## ٣. إضافة بند

~~~text الأمر
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';
~~~

الـ [[SELECT]] بيبني الصف اللي هيتضاف: [[1]] ثابت (رقم الأوردر)، و [[id]] و [[price]] من صف الـ Mug، و [[2]] الكمية. نشوفه لوحده الأول:

~~~text الناتج
SELECT 1, id, 2, price FROM products WHERE name = 'Mug';
 ?column? | id | ?column? | price
----------+----+----------+--------
        1 |  8 |        2 | 110.00
~~~

[[?column?]] اسم أي عمود ملوش اسم (رقم ثابت من غير [[AS]]). الـ Mug عندنا id بتاعه 8 وسعره 110 (من درس CASE WHEN). والـ INSERT بياخد الأعمدة بالترتيب ويحطها في [[(order_id, product_id, quantity, unit_price)]]:

~~~text الناتج
INSERT 0 1

SELECT * FROM order_items;
 order_id | product_id | quantity | unit_price
----------+------------+----------+------------
        1 |          8 |        2 |     110.00
~~~

السعر اتنسخ من products **في اللحظة دي**. ده المقصود.

---

## ٤. الـ «جرّب»: نفس البند تاني

~~~text الناتج
ERROR:  duplicate key value violates unique constraint "order_items_pkey"
DETAIL:  Key (order_id, product_id)=(1, 8) already exists.
~~~

الـ primary key المركب رفض. لو العميل عايز Mug كمان، بتزوّد [[quantity]] في نفس الصف، مش بتضيف صف تاني.

وكمية صفر (جربناها على Hoodie):

~~~text الناتج
ERROR:  new row for relation "order_items" violates check constraint "order_items_quantity_check"
DETAIL:  Failing row contains (1, 10, 0, 650.00).
~~~

---

## ٥. السعر اتغير، الفاتورة لأ

~~~text الأمر
UPDATE products SET price = 140 WHERE name = 'Mug';
SELECT oi.unit_price, p.price
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE p.name = 'Mug';
~~~

[[oi]] و [[p]] أسماء مختصرة (aliases) للجدولين، و [[JOIN ... ON]] بيحط كل بند جنب المنتج بتاعه (درس INNER JOIN).

~~~text الناتج
 unit_price | price
------------+--------
     110.00 | 140.00
~~~

البند لسه 110 (اللي العميل دفعه)، والمنتج بقى 140 (السعر الحالي). لو كنت حسبت الفاتورة من [[products.price]]، كل فاتورة قديمة كانت هتتغير مع كل تعديل سعر.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| جدول [[order_items]] | صف لكل (أوردر، منتج) |
| FK لكل ناحية | مفيش بند لأوردر أو منتج مش موجود |
| [[PRIMARY KEY (order_id, product_id)]] | المنتج مرة واحدة في الأوردر، و index للبحث بالأوردر |
| index على [[product_id]] | البحث من الناحية التانية |
| [[quantity]] و [[unit_price]] | معلومات العلاقة نفسها، مكانها الجدول الوسيط |

- عمود فيه [['1,5,9']] مش علاقة: مفيش FK ولا JOIN ولا كمية.
- [[unit_price]] نسخة مقصودة من السعر وقت الشرا.`,
          lines: [
            "الجدول الوسيط بين الأوردرات والمنتجات.",
            "FK للأوردر، ولو الأوردر اتمسح بنوده تتمسح معاه.",
            "FK للمنتج.",
            "الكمية لازم أكبر من صفر.",
            "السعر وقت الشرا، متنسخ من products.",
            "المفتاح المركب: المنتج مرة واحدة في كل أوردر.",
            "قفلة التعريف.",
            "index للناحية التانية: الأوردرات اللي فيها منتج معين.",
            "ضيف بند:",
            "لأوردر 1، منتج Mug، كمية ٢، والسعر من جدول المنتجات نفسه."
          ],
          sol: R`التكرار هيترفض: [[duplicate key value violates unique constraint "order_items_pkey"]] مع [[Key (order_id, product_id)=(1, 8) already exists.]] (الـ 8 هو id الـ Mug لو ماشي مع الـ lab بالترتيب، وممكن يختلف عندك). الـ PRIMARY KEY المركب معناه إن المنتج يظهر مرة واحدة في الأوردر؛ لو العميل عايز تاني بتزوّد [[quantity]] مش بتضيف صف.

بعد [[UPDATE products SET price = 140 WHERE name = 'Mug']]، الـ join هيوريك [[unit_price]] في البند لسه بالسعر القديم و [[price]] في products بالجديد. ده مقصود: البند بيحفظ السعر وقت الشراء، والفاتورة القديمة متتغيرش لما المنتج يغلى. الغلطة الشائعة إنك تحسب total الأوردر من [[products.price]] بدل [[order_items.unit_price]].`,
          solCode: R`UPDATE products SET price = 140 WHERE name = 'Mug';
SELECT oi.unit_price, p.price
FROM order_items oi JOIN products p ON p.id = oi.product_id
WHERE p.name = 'Mug';   -- unit_price القديم، price الجديد`
        },
        {
          cmd: "one-to-one",
          title: "بيانات إضافية لصف واحد في جدول تاني",
          desc: R`كل صف في جدول يقابله صف واحد بالكتير في جدول تاني: يوزر وبروفايل، أو أوردر وشحنة. بتتعمل بـ foreign key عليه [[UNIQUE]]، أو أنضف: الـ primary key للجدول التاني هو نفسه الـ foreign key.

وده بالظبط شكل Supabase: [[auth.users]] جدول بتاع Supabase مش بتاعك، فبتعمل [[public.profiles]] والـ id بتاعه هو id اليوزر.`,
          example: R`CREATE TABLE profiles (
  user_id    uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  avatar_url text,
  bio        text
);
CREATE TABLE shipments (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id bigint NOT NULL UNIQUE REFERENCES orders (id),
  tracking text
);`,
          try: R`ضيف بروفايل ليوزر، وبعدين حاول تضيف بروفايل تاني لنفس اليوزر. وشيل [[UNIQUE]] من shipments وشوف إن الأوردر بقى ينفع يبقى ليه شحنتين: العلاقة بقت one-to-many من غير ما تاخد بالك.`,
          flag: "script",
          deep: {
            why: "مش كل معلومة مكانها الجدول الأساسي. البروفايل اختياري وليه صلاحيات مختلفة (عام، والإيميل خاص)، والشحنة مش موجودة لحد ما الأوردر يتشحن. الفصل بيخلي الجدول الأساسي نضيف، من غير عشرين عمود NULL.",
            how: R`اللي بيخلي العلاقة one-to-one هو الـ UNIQUE على عمود الـ FK (أو إنه primary key). من غيره هي one-to-many عادي.

أسباب منطقية للفصل: الداتا اختيارية، أو صلاحيات مختلفة (في Supabase: RLS على profiles تسمح للكل يقرا، و auth.users محدش يلمسه)، أو أعمدة تقيلة بتتقري نادرًا، أو الجدول الأصلي مش ملكك.

لو مفيش سبب من دول، ضيف الأعمدة في نفس الجدول؛ الفصل من غير سبب معناه JOIN زيادة في كل استعلام.

وفي Supabase النمط المشهور: trigger على [[auth.users]] بعد الـ INSERT بيعمل صف في profiles أوتوماتيك، بـ function نوعها [[security definer]].`,
            when: "بيانات اختيارية، أو بصلاحيات مختلفة، أو مربوطة بجدول مش بتاعك (auth.users).",
            mistakes: R`تنسى UNIQUE فيبقى ليوزر بروفايلين. تقسم جدول من غير سبب. وبروفايل Supabase من غير [[ON DELETE CASCADE]]، فمسح اليوزر من لوحة Auth يفشل أو يسيب بروفايل يتيم.`
          },
          teach: R`## الفكرة: foreign key ممنوع يتكرر

one-to-one هي one-to-many بالظبط، بزيادة شرط واحد: عمود الـ foreign key **مينفعش يتكرر**. المثال بيوري طريقتين لده: في [[profiles]] الـ FK هو نفسه الـ primary key، وفي [[shipments]] الـ FK عليه [[UNIQUE]].

الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker، على جداول الـ lab.

---

## ١. [[profiles]]: الـ primary key = الـ foreign key

~~~text الأمر
CREATE TABLE profiles (
  user_id    uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  avatar_url text,
  bio        text
);
~~~

السطر المهم هو التاني، وفيه ٣ حاجات على عمود واحد:

| الحتة | معناها |
|---|---|
| [[uuid]] | نفس نوع [[users.id]] |
| [[PRIMARY KEY]] | مينفعش يتكرر ولا يبقى NULL، فكل يوزر ليه بروفايل واحد بالكتير |
| [[REFERENCES users (id)]] | ولازم يبقى يوزر موجود |
| [[ON DELETE CASCADE]] | لو اليوزر اتمسح، البروفايل يتمسح معاه |

مفيش عمود [[id]] منفصل: البروفايل بيتعرف بصاحبه. و [[avatar_url]] و [[bio]] من غير NOT NULL لأنهم اختياريين.

~~~text \d profiles
              Table "public.profiles"
   Column   | Type | Collation | Nullable | Default
------------+------+-----------+----------+---------
 user_id    | uuid |           | not null |
 avatar_url | text |           |          |
 bio        | text |           |          |
Indexes:
    "profiles_pkey" PRIMARY KEY, btree (user_id)
Foreign-key constraints:
    "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
~~~

نفس العمود ظاهر تحت [[Indexes]] (كـ primary key) وتحت [[Foreign-key constraints]].

---

## ٢. [[shipments]]: id خاص و FK عليه UNIQUE

~~~text الأمر
CREATE TABLE shipments (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id bigint NOT NULL UNIQUE REFERENCES orders (id),
  tracking text
);
~~~

- [[id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY]]: رقم بيزيد لوحده، زي orders (درس PRIMARY KEY).
- [[order_id ... NOT NULL UNIQUE REFERENCES orders (id)]]: كل شحنة لازم ليها أوردر موجود، و [[UNIQUE]] بيمنع أوردر يبقى ليه شحنتين.

~~~text \d shipments (الجزء المهم)
Indexes:
    "shipments_pkey" PRIMARY KEY, btree (id)
    "shipments_order_id_key" UNIQUE CONSTRAINT, btree (order_id)
Foreign-key constraints:
    "shipments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
~~~

افتكر الاسم [[shipments_order_id_key]]: جدول + عمود + [[key]]. هنحتاجه في الـ «جرّب».

### الطريقتين جنب بعض

| | [[profiles]] | [[shipments]] |
|---|---|---|
| الـ FK | هو الـ primary key | عمود عادي عليه [[UNIQUE]] |
| ليه | البروفايل ملوش وجود من غير اليوزر | الشحنة ليها id بيتبعت لشركة الشحن وبيتعرض |

---

## ٣. الـ «جرّب»: بروفايل تاني لنفس اليوزر

~~~text الأمر
INSERT INTO profiles (user_id, bio) SELECT id, 'hi' FROM users WHERE email = 'you@example.com';
INSERT INTO profiles (user_id, bio) SELECT id, 'again' FROM users WHERE email = 'you@example.com';
~~~

~~~text الناتج
INSERT 0 1
ERROR:  duplicate key value violates unique constraint "profiles_pkey"
DETAIL:  Key (user_id)=(f2a882ce-8651-45b3-a929-d1520162aa08) already exists.
~~~

الأول عدّى، والتاني اترفض من الـ primary key: يوزر واحد، بروفايل واحد.

ولأن البروفايل اختياري، لما تقرا اليوزرز ومعاهم البروفايل بتستخدم [[LEFT JOIN]] (درسه جاي):

~~~text الناتج
SELECT u.email, p.bio FROM users u LEFT JOIN profiles p ON p.user_id = u.id;
      email       | bio
------------------+-----
 you@example.com  | hi
 mona@example.com |
 omar@gmail.com   |
 sara@example.com |
~~~

---

## ٤. الـ «جرّب»: شيل UNIQUE من shipments

~~~text الناتج
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK1');
INSERT 0 1
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK2');
ERROR:  duplicate key value violates unique constraint "shipments_order_id_key"
DETAIL:  Key (order_id)=(1) already exists.
~~~

دلوقتي نشيل الشرط:

~~~text الناتج
ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;
ALTER TABLE
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK2');
INSERT 0 1
SELECT order_id, count(*) FROM shipments GROUP BY 1;
 order_id | count
----------+-------
        1 |     2
~~~

[[DROP CONSTRAINT اسم]] بيشيل شرط باسمه. ومن غيره الأوردر بقى ليه شحنتين، والجدول بقى one-to-many، ومحدش اشتكى. الفرق بين العلاقتين كله في الشرط ده.

رجّع الحال زي ما كان (عشان درس ON DELETE):

~~~text الناتج
DELETE FROM shipments;
DELETE 2
ALTER TABLE shipments ADD CONSTRAINT shipments_order_id_key UNIQUE (order_id);
ALTER TABLE
~~~

[[ADD CONSTRAINT ... UNIQUE (order_id)]] بيرجّع الشرط بنفس الاسم. لو كان فيه لسه أوردر ليه شحنتين، الأمر ده كان هيفشل.

---

## الخلاصة

| الطريقة | الشكل | مثال |
|---|---|---|
| الـ FK هو الـ PK | [[user_id uuid PRIMARY KEY REFERENCES users (id)]] | بروفايل اليوزر، [[public.profiles]] في Supabase |
| FK عليه UNIQUE | [[order_id bigint NOT NULL UNIQUE REFERENCES orders (id)]] | شحنة الأوردر |

- من غير PRIMARY KEY أو UNIQUE على الـ FK، العلاقة one-to-many.
- افصل في جدول تاني لسبب: داتا اختيارية، أو صلاحيات مختلفة، أو جدول مش ملكك. غير كده ضيف الأعمدة في نفس الجدول.`,
          lines: [
            "جدول البروفايلات.",
            "الـ primary key هو نفسه FK لليوزر: بروفايل واحد بالكتير لكل يوزر.",
            "صورة اختيارية.",
            "نبذة اختيارية.",
            "قفلة.",
            "جدول الشحنات.",
            "id خاص بيه.",
            "FK للأوردر وعليه UNIQUE: شحنة واحدة لكل أوردر.",
            "رقم التتبع.",
            "قفلة."
          ],
          sol: R`البروفايل التاني لنفس اليوزر هيترفض بـ [[duplicate key value violates unique constraint "profiles_pkey"]]، لأن user_id هو الـ PRIMARY KEY نفسه، فمينفعش يتكرر: يوزر واحد، بروفايل واحد.

في shipments: الشحنة التانية لنفس الأوردر هتترفض بـ [[shipments_order_id_key]]. بعد ما تشيل الـ UNIQUE ([[ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;]]) هتتقبل، و [[SELECT order_id, count(*) FROM shipments GROUP BY 1]] هيطلّع 2. محدش هيحذرك: العلاقة بقت one-to-many، والكود اللي بيقرا «الشحنة» بـ [[LIMIT 1]] هيجيب واحدة عشوائي.

بعد التجربة امسح الشحنات ([[DELETE FROM shipments;]]) ورجّع الـ UNIQUE، لأن FK الشحنات مفيهوش ON DELETE، فدرس ON DELETE هيفشل وهو بيمسح الأوردر لو سبت شحنة عليه.`,
          solCode: R`INSERT INTO profiles (user_id, bio) SELECT id, 'hi' FROM users WHERE email = 'you@example.com';
INSERT INTO profiles (user_id, bio) SELECT id, 'again' FROM users WHERE email = 'you@example.com';
-- ERROR:  duplicate key value violates unique constraint "profiles_pkey"
ALTER TABLE shipments DROP CONSTRAINT shipments_order_id_key;
INSERT INTO shipments (order_id, tracking) VALUES (1, 'TRK1'), (1, 'TRK2');   -- اتقبلت
DELETE FROM shipments;
ALTER TABLE shipments ADD CONSTRAINT shipments_order_id_key UNIQUE (order_id);`
        },
        {
          cmd: "ON DELETE",
          title: "لما الصف الأب يتمسح، الصفوف المرتبطة بيه يحصلها إيه",
          desc: R`الـ foreign key لازم يعرف يعمل إيه لو الصف اللي بيشاور عليه اتمسح: [[NO ACTION]] أو [[RESTRICT]]: ارفض المسح طول ما فيه صفوف مرتبطة (ده الافتراضي). [[CASCADE]]: امسح المرتبطين معاه. [[SET NULL]]: سيبهم واشطب الربط.

الاختيار قرار business مش تقني: مسح أوردر يمسح بنوده (CASCADE)، بس مسح منتج مينفعش يمسح أوردرات قديمة اتباع فيها (RESTRICT).`,
          example: R`DELETE FROM products WHERE name = 'Mug';        -- error: still referenced from table "order_items"
DELETE FROM orders WHERE id = 1;                -- بنوده اتمسحت معاه (CASCADE)
SELECT count(*) FROM order_items WHERE order_id = 1;   -- 0
ALTER TABLE orders DROP CONSTRAINT orders_user_fk;
ALTER TABLE orders ADD CONSTRAINT orders_user_fk
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT;`,
          try: R`اعمل جدول تجربة فيه FK بـ [[ON DELETE SET NULL]] على عمود [[NOT NULL]]، وامسح الأب: هتاخد error، لأن SET NULL محتاج العمود يقبل NULL.`,
          flag: "script danger",
          deep: {
            why: "لو محددتش، هتكتشف السلوك وقت ما حاجة تتمسح على الإنتاج: يا المسح يفشل والأدمن يتضايق، يا (وده أسوأ) مسح يوزر يمسح معاه سجل مالي كامل.",
            how: R`[[NO ACTION]] هو الافتراضي في Postgres: بيرفض المسح، بس الفحص ممكن يتأجل لآخر الـ transaction لو الـ constraint [[DEFERRABLE]]. [[RESTRICT]] بيرفض فورًا. عمليًا الاتنين «ممنوع».

[[CASCADE]] بيتسلسل: مسح يوزر ← أوردراته ← بنودها. مريح، بس DELETE واحد ممكن يمسح آلاف الصفوف من غير ما يقولك.

[[SET NULL]] بيحط NULL في عمود الـ FK، فلازم العمود يقبل NULL. و [[SET DEFAULT]] بيحط القيمة الافتراضية.

في Prisma بتكتبها [[onDelete: Cascade]] جوه [[@relation]]. ولو مكتبتهاش: العلاقة الإجبارية [[Restrict]] والاختيارية [[SetNull]].`,
            when: R`CASCADE للحاجات اللي ملهاش معنى من غير أبوها: بنود الأوردر، و sessions اليوزر، والبروفايل. RESTRICT للمراجع التاريخية والمالية: الأوردر ← المنتج، والأوردر ← اليوزر. SET NULL للربط الاختياري: [[orders.coupon_id]] لو الكوبون اتمسح.`,
            mistakes: R`CASCADE من users لـ orders، فمسح حساب يمسح تاريخ مبيعات لازم للحسابات؛ الأحسن soft delete أو إخفاء بيانات اليوزر (anonymize). SET NULL على عمود NOT NULL. وتمسح الولاد من الكود بدل الـ FK، فأي مسار نسي يمسحهم يسيب صفوف يتيمة.`
          },
          teach: R`## الفكرة: كل foreign key عنده خطة لمسح الأب

لما صف «أب» يتمسح (يوزر، أوردر، منتج) والصفوف «الولاد» لسه بتشاور عليه، الـ FK لازم يختار: يرفض المسح، ولا يمسح الولاد معاه، ولا يفضّي عمود الربط. الاختيار ده بيتكتب في تعريف الـ FK بـ [[ON DELETE ...]].

المثال بيجرّب التلاتة على جداول الـ lab: [[order_items]] اتعمل بـ [[ON DELETE CASCADE]] على الأوردر ومن غير حاجة على المنتج، وبعدين بنغيّر FK الأوردرات لـ [[RESTRICT]]. الناتج تحت حقيقي من psql على [[postgres:18]] جوه Docker.

قبل ما نبدأ، فيه بند واحد من درس many-to-many:

~~~text SELECT * FROM order_items;
 order_id | product_id | quantity | unit_price
----------+------------+----------+------------
        1 |          8 |        2 |     110.00
~~~

---

## ١. مسح منتج ليه بنود: مرفوض

~~~text الأمر
DELETE FROM products WHERE name = 'Mug';
~~~

~~~text الناتج
ERROR:  update or delete on table "products" violates foreign key constraint "order_items_product_id_fkey" on table "order_items"
DETAIL:  Key (id)=(8) is still referenced from table "order_items".
~~~

FK المنتج في order_items متكتبش له ON DELETE، فبياخد الافتراضي [[NO ACTION]]: «ارفض طول ما فيه ولاد». الـ Mug (id 8) لسه في بند، فالمسح اترفض ومفيش حاجة اتمسحت. ده الصح: المنتج اتباع، وتاريخ البيع لازم يفضل.

---

## ٢. مسح أوردر: بنوده بتتمسح معاه

~~~text الأمر
DELETE FROM orders WHERE id = 1;
SELECT count(*) FROM order_items WHERE order_id = 1;
~~~

~~~text الناتج
DELETE 1
 count
-------
     0
~~~

- [[DELETE 1]]: صف واحد اتمسح من orders. الرقم ده بيعدّ صفوف الجدول اللي في الأمر بس، مش الصفوف اللي اتمسحت بالـ CASCADE.
- [[count = 0]]: البند اتمسح هو كمان من غير ما نقول، لأن FK الأوردر في order_items مكتوب [[ON DELETE CASCADE]]. البند ملوش معنى من غير أوردره.

وده كمان خطر CASCADE: DELETE واحد ممكن يمسح آلاف الصفوف في جداول تانية، والرقم اللي بيرجع ميقولكش.

---

## ٣. تغيير سلوك FK موجود

مفيش أمر «عدّل ON DELETE». بتشيل الـ constraint وترجّعه:

~~~text الأمر
ALTER TABLE orders DROP CONSTRAINT orders_user_fk;
ALTER TABLE orders ADD CONSTRAINT orders_user_fk
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT;
~~~

- السطر الأول: شيل الـ FK اللي عملناه في درس one-to-many (باسمه).
- التاني والتالت: ضيفه تاني بنفس الاسم ونفس العمود، بس معاه [[ON DELETE RESTRICT]].

~~~text \d orders (آخره)
Foreign-key constraints:
    "orders_user_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
Referenced by:
    TABLE "order_items" CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    TABLE "shipments" CONSTRAINT "shipments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
~~~

[[\d]] بيوريك ON DELETE بتاع كل FK، ومين بيشاور على الجدول ده. لاحظ إن FK الشحنات مفيهوش ON DELETE، فمسح أوردر ليه شحنة هيترفض. (عشان كده مسحنا الشحنات في درس one-to-one.)

> على جدول كبير في الإنتاج، الـ ADD ده بيراجع كل الصفوف وهو قافل الجدول. الطريقة الآمنة ([[NOT VALID]] ثم [[VALIDATE CONSTRAINT]]) في تاب PostgreSQL.

### جرّب الـ RESTRICT

~~~text الناتج
DELETE FROM users WHERE email = 'omar@gmail.com';
ERROR:  update or delete on table "users" violates RESTRICT setting of foreign key constraint "orders_user_fk" on table "orders"
DETAIL:  Key (id)=(a4a453d0-ea48-4dc5-8612-d43aa84165eb) is referenced from table "orders".

DELETE FROM users WHERE email = 'mona@example.com';
DELETE 1
~~~

Omar ليه أوردر فاترفض (والرسالة بقت [[violates RESTRICT setting]]). Mona ملهاش أوردرات فاتمسحت عادي: الـ FK بيمنع بس لما يبقى فيه ولاد فعلًا.

### NO ACTION ولا RESTRICT؟

| | [[NO ACTION]] (الافتراضي) | [[RESTRICT]] |
|---|---|---|
| بيرفض مسح أب ليه ولاد؟ | أيوه | أيوه |
| امتى بيفحص | آخر الأمر، أو آخر الـ transaction لو الـ constraint [[DEFERRABLE]] | فورًا، ومينفعش يتأجل |

عمليًا الاتنين «ممنوع». كتابة RESTRICT صراحةً بتوضّح لأي حد بيقرا الـ schema إن ده مقصود.

---

## ٤. الـ «جرّب»: SET NULL على عمود NOT NULL

~~~text الأمر
CREATE TABLE t_parent (id int PRIMARY KEY);
CREATE TABLE t_child (
  id int PRIMARY KEY,
  parent_id int NOT NULL REFERENCES t_parent (id) ON DELETE SET NULL
);
INSERT INTO t_parent VALUES (1);
INSERT INTO t_child VALUES (10, 1);
DELETE FROM t_parent WHERE id = 1;
~~~

الجدولين اتعملوا من غير اعتراض. المشكلة بتظهر وقت المسح:

~~~text الناتج
ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint
DETAIL:  Failing row contains (10, null).
CONTEXT:  SQL statement "UPDATE ONLY "public"."t_child" SET "parent_id" = NULL WHERE $1 OPERATOR(pg_catalog.=) "parent_id""
~~~

الـ [[CONTEXT]] بيوريك اللي حصل من ورا: [[SET NULL]] عبارة عن [[UPDATE]] بيحط NULL في عمود الربط عند كل الولاد. والعمود [[NOT NULL]]، فالـ UPDATE فشل، والمسح كله اترفض.

ولما نشيل الـ NOT NULL:

~~~text الناتج
ALTER TABLE t_child ALTER COLUMN parent_id DROP NOT NULL;
ALTER TABLE
DELETE FROM t_parent WHERE id = 1;
DELETE 1
SELECT * FROM t_child;
 id | parent_id
----+-----------
 10 |
~~~

الابن فضل موجود، والربط بقى فاضي (NULL). وبعدها [[DROP TABLE t_child, t_parent;]] بيمسح جداول التجربة.

---

## الخلاصة

| الاختيار | لما الأب يتمسح | استخدمه لـ |
|---|---|---|
| [[NO ACTION]] / [[RESTRICT]] | المسح يترفض | مراجع مالية وتاريخية: أوردر ← منتج، أوردر ← يوزر |
| [[CASCADE]] | الولاد يتمسحوا معاه | حاجة ملهاش معنى من غير أبوها: بنود الأوردر، البروفايل |
| [[SET NULL]] | عمود الربط يبقى NULL | ربط اختياري: كوبون اتمسح. والعمود لازم يقبل NULL |

- الافتراضي لو مكتبتش حاجة: NO ACTION (يعني ممنوع).
- تغيير السلوك: [[DROP CONSTRAINT]] وبعدين [[ADD CONSTRAINT]] بالسلوك الجديد.
- رقم [[DELETE n]] مبيعدّش اللي اتمسح بالـ CASCADE.`,
          lines: [
            "منتج ليه بنود في أوردرات: الـ FK بيمنع مسحه.",
            "مسح أوردر: البنود اتمسحت معاه لأن FK بتاعها CASCADE.",
            "اتأكد: مفيش بنود للأوردر ده.",
            "عشان تغيّر السلوك: شيل الـ FK القديم،",
            "وارجع ضيفه بالسلوك اللي عايزه:",
            "مسح يوزر ليه أوردرات ممنوع صراحةً."
          ],
          sol: R`الـ CREATE TABLE هيعدّي عادي (Postgres مش بيعترض على التركيبة وقت التعريف)، والمشكلة تظهر وقت المسح: [[ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint]]، و الـ CONTEXT بيوريك إن Postgres كان بينفذ [[UPDATE ONLY "public"."t_child" SET "parent_id" = NULL ...]] من وراك. المسح كله اترفض، والأب لسه موجود.

الحل يا تشيل [[NOT NULL]] من العمود لو فعلًا الابن ينفع يعيش من غير أب، يا تختار [[CASCADE]] أو [[RESTRICT]]. الخلاصة: SET NULL وعده إنه هيكتب NULL، فالعمود لازم يقبلها.`,
          solCode: R`CREATE TABLE t_parent (id int PRIMARY KEY);
CREATE TABLE t_child (
  id int PRIMARY KEY,
  parent_id int NOT NULL REFERENCES t_parent (id) ON DELETE SET NULL
);
INSERT INTO t_parent VALUES (1);
INSERT INTO t_child VALUES (10, 1);
DELETE FROM t_parent WHERE id = 1;
-- ERROR:  null value in column "parent_id" of relation "t_child" violates not-null constraint
ALTER TABLE t_child ALTER COLUMN parent_id DROP NOT NULL;
DELETE FROM t_parent WHERE id = 1;   -- DELETE 1، و parent_id بقى NULL
DROP TABLE t_child, t_parent;`
        }
      ]
    }
]);
