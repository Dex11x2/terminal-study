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
COMMIT;                                                  -- ممكن تفشل: could not serialize access (40001)`,
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
          lines: [
            "ابدأ transaction بـ snapshot ثابتة.",
            "اقرا المخزون.",
            "اقرا تاني: نفس الرقم، حتى لو اتغير برّه.",
            "خلّص.",
            "ابدأ transaction بأعلى مستوى.",
            "اتأكد إن اليوزر معندوش أوردر pending.",
            "مفيش؟ ضيف واحد.",
            "لو transaction تانية عملت نفس الحكاية في نفس الوقت، واحدة منهم هتفشل هنا."
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

لو الـ error هو [[each UNION query must have the same number of columns]] يبقى عدد الأعمدة مختلف. ولو [[UNION types text and bigint cannot be matched]] يبقى محتاج [[::text]] على الـ id.`,
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
WHERE o.id = 1
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
          lines: [
            "لكل أوردر: رقمه والـ total،",
            "وكل بنوده كـ JSON array، كل بند object فيه المنتج والكمية والسعر،",
            "مترتبين بالاسم.",
            "من الأوردرات،",
            "مع بنودها،",
            "ومنتجاتها.",
            "أوردر واحد.",
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
