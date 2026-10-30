// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "قاعدة البيانات",
      l: 3,
      time: R`حوالي ٨ ساعات`,
      goal: [
        R`تكلّم Postgres من FastAPI بـ asyncpg (SQL مباشر) وبـ SQLAlchemy 2.0 async (ORM)، بـ pool واحد في الـ lifespan و session لكل طلب.`,
        R`تكتب SQL آمن ([[$1]] مش f-string) وتعمل العمليات اللي لازم تحصل مع بعض في transaction، وتعرف السباق بين طلبين بيحصل إزاي وتمنعه.`,
        R`تكتشف N+1 بعدّ الـ queries وتصلّحه بـ [[selectinload]] أو [[joinedload]]، وتعمل pagination بالـ cursor بدل OFFSET في الجداول الكبيرة.`,
        R`تغيّر شكل القاعدة بـ Alembic: migration بتتراجع قبل ما يتطبق، ورجوع خطوة، و SQL للمراجعة.`,
        R`تختبر الـ endpoints على Postgres حقيقي، وكل اختبار بيرجع القاعدة زي ما كانت.`,
      ],
      use: {
        prog: R`كل API حقيقي بيقرا ويكتب في قاعدة. الوحدة دي هي الفرق بين demo بـ dict في الذاكرة وتطبيق بيستحمل مستخدمين.`,
        work: R`أغلب مشاكل الأداء في الـ backend queries: N+1، و OFFSET على مليون صف، و اتصال جديد مع كل طلب. والأغلى في الإنتاج migration بايظ بيقع وهو بيتطبق.`,
        net: R`كل query رحلة على الشبكة للقاعدة. على الجهاز ده (ويندوز لـ Docker) الرحلة الواحدة حوالي ٣ مللي ثانية، فـ ١٠٠٠ INSERT في loop أخدوا ٢.٩ ثانية و [[executemany]] أخد ٠.٠١٤.`,
        cs: R`الـ transaction (ACID) والأقفال على الصفوف و الـ index (B-tree) هي اللي بتخلي «آخر قطعة» تتباع مرة واحدة، و [[WHERE id > X]] أسرع من [[OFFSET X]] بآلاف المرات.`,
      },
      lab: R`docker run --rm -d --name shopdb -e POSTGRES_USER=app -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=shop -p 55432:5432 postgres:16-alpine`,
      projects: [
        { lvl: 'صغير', t: R`أول endpoint على Postgres`, what: R`pool asyncpg في الـ lifespan، و [[GET /products?max_price=]] بيرجّع صفوف بـ [[$1]]، و [[GET /products/{id}]] بـ 404 لو [[fetchrow]] رجّع [[None]]. من درس «asyncpg».`, done: R`[[?max_price=5000]] بترجع المنتجات الصح، و [[?max_price=1;DROP TABLE products]] بترجع 422 (النوع [[int]]) والجدول لسه موجود، و id مش موجود 404، و [[docker stop]] على القاعدة بيخلي [[fastapi run]] يقع وهو بيقوم برسالة واضحة.` },
        { lvl: 'صغير', t: R`استيراد سريع`, what: R`سكربت بيدخّل ١٠ آلاف صف من CSV بـ ٣ طرق: [[execute]] في loop، و [[executemany]]، و [[copy_records_to_table]]، ويطبع الوقت لكل واحدة. من درس «asyncpg».`, done: R`٣ أرقام حقيقية مطبوعة، وعدد الصفوف في الجدول بعد كل طريقة ١٠ آلاف بالظبط ([[count(*)]])، والسكربت بيمسح الجدول في الأول فينفع يتشغّل مرتين.` },
        { lvl: 'متوسط', t: R`مختصر روابط على Postgres`, what: R`انقل مختصر الروابط بتاع الوحدة الأولى لـ SQLAlchemy: جدول [[links]] بـ [[code]] unique، وجدول [[clicks]]. الإنشاء بيمسك [[IntegrityError]] ويرجّع 409، والفتح بيزوّد العداد بـ [[UPDATE ... SET clicks = clicks + 1]]، والـ schema كلها بـ Alembic.`, done: R`[[alembic upgrade head]] على قاعدة فاضية بيعمل الجداول، و ١٠٠ فتحة متوازية بـ [[asyncio.gather]] بيطلّعوا العداد ١٠٠ بالظبط (مش أقل)، و code متكرر 409 مش 500، و [[alembic downgrade base]] بيرجّع القاعدة فاضية.` },
        { lvl: 'متوسط', t: R`قايمة طلبات من غير N+1`, what: R`[[GET /orders]] بيرجّع الطلبات وإيميل صاحب كل طلب، بـ pagination بالـ cursor ([[?after=&limit=]]) و [[next_cursor]]. وعداد queries بـ [[event.listens_for(..., "before_cursor_execute")]] في الاختبار. من درس «N+1 و pagination».`, done: R`اختبار بيتأكد إن [[limit=100]] بيعمل ٢ queries بالظبط، وإن المشي على كل الصفحات بيرجّع كل طلب مرة واحدة حتى لو اتضاف طلب جديد في النص، و [[limit=500]] بترجع 422.` },
        { lvl: 'كبير', t: R`API حجوزات على Postgres`, what: R`API الحجوزات بتاع الوحدة الأولى، بس على SQLAlchemy 2.0 async و Alembic: [[rooms]] و [[bookings]] بـ foreign key، والحجز في transaction بيقفل القاعة ([[with_for_update()]]) قبل ما يدوّر على تداخل، و session لكل طلب بـ [[SessionLocal.begin()]]، و [[IntegrityError]] بيبقى 409، والقوايم بالـ cursor. والاختبارات على Postgres في Docker، وكل اختبار في transaction بترجع (درس «SQLAlchemy async»). من الوحدات كلها.`, done: R`٢٠ اختبار بيعدّوا على قاعدة حقيقية والقاعدة بعدهم فاضية، و ٢٠ حجز متوازي لنفس القاعة ونفس الوقت بيطلّعوا حجز واحد بس والباقي 409، و [[alembic upgrade head]] ثم [[downgrade -1]] ثم [[upgrade head]] بيشتغلوا من غير أخطاء، ومفيش endpoint بيعمل أكتر من ٣ queries (عداد في الاختبارات)، واللوج فيه سطر لكل طلب بوقت القاعدة.`, ext: R`زوّد [[EXCLUDE USING gist]] على [[tstzrange]] عشان القاعدة نفسها تمنع التداخل، والإلغاء بـ soft delete، وصفحة للإحصائيات بـ [[GROUP BY]]، و outbox للإيميلات تبعتها «Celery و ARQ».` },
        { lvl: 'فكرة', t: R`قاعدة لحاجة بتعرفها`, what: R`خد الـ API اللي عملته في فكرة الوحدة الأولى وحطه على Postgres: انت اللي بتصمم الجداول والعلاقات والـ indexes، وبتقرر أنهي query محتاج cursor وأنهي محتاج [[selectinload]].`, done: R`كل الـ schema في migrations بتتطبق على قاعدة فاضية، وكل endpoint ليه اختبار على Postgres حقيقي، و [[EXPLAIN ANALYZE]] على أبطأ query فيهم مكتوب في README مع الـ index اللي حل المشكلة.`, ext: R`ارفعها بـ Docker Compose (التطبيق والقاعدة) والـ migrations بتتطبق قبل ما التطبيق يقوم.` },
      ],
      n: "asyncpg بـ pool و SQL صريح، و transactions، و SQLAlchemy async لو عايز ORM، و Alembic للـ migrations",
      items: [
        {
          cmd: "asyncpg",
          title: "تكلّم Postgres بـ asyncpg: pool و $1 و fetch",
          desc: R`asyncpg أسرع درايفر Postgres لـ Python async، وبتكتب بيه SQL عادي. الباراميترات بـ [[$1]] و [[$2]] مش f-string، والدوال: [[fetch]] (صفوف)، و [[fetchrow]] (صف أو None)، و [[fetchval]] (قيمة واحدة)، و [[execute]] (من غير نتيجة)، و [[executemany]] (نفس الأمر لكذا صف).

والـ pool بيتعمل مرة في الـ lifespan، وكل request بياخد اتصال ويرجّعه (درس dependency بـ yield). والـ SQL نفسه والـ indexes في تاب PostgreSQL وتاب «SQL و Prisma».`,
          example: R`import asyncpg
from pydantic import BaseModel
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
async def demo(dsn: str) -> None:
    pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10, command_timeout=10)
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT id, name, price_cents FROM products WHERE price_cents < $1 ORDER BY id LIMIT $2", 5000, 20)
        products = [Product(**dict(r)) for r in rows]
        row = await conn.fetchrow("SELECT id, name, price_cents FROM products WHERE id = $1", 7)
        count = await conn.fetchval("SELECT count(*) FROM products")
        await conn.execute("UPDATE products SET price_cents = $1 WHERE id = $2", 4500, 7)
        await conn.executemany("INSERT INTO tags (product_id, tag) VALUES ($1, $2)", [(7, "hot"), (7, "new")])
        ids = await conn.fetch("SELECT id FROM products WHERE id = ANY($1::int[])", [1, 2, 3])
    await pool.close()`,
          try: R`شغّل Postgres في Docker (تاب Docker)، واعمل جدول products فيه كام صف، وجرّب كل دالة في المثال. وبعدين اكتب query بـ f-string زي [[f"... WHERE name = '{name}'"]] وجرّب [[name = "x' OR '1'='1"]]، وشوف ليه الـ [[$1]] مش اختيارية.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** لكل حاجة اكتب الدالة: «عدد المنتجات»، و«منتج بالـ id»، و«كل المنتجات الأرخص من X»، و«امسح المنتجات القديمة وقولي اتمسح كام»، و«دخّل ٥٠٠ صف».`, done: R`[[fetchval]] و [[fetchrow]] و [[fetch]] و [[execute]] (وتقرا الرقم من [[DELETE 37]]) و [[executemany]] أو [[copy_records_to_table]]، وجربت كل واحدة على القاعدة اللي في Docker.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي بيرجع من [[fetchrow("... WHERE id = $1", 99)]] على id مش موجود؟ ومن [[execute("UPDATE ... WHERE id = $1", 99)]]؟ ومن [[fetchrow("... WHERE id = $1", "1")]] (نص مش رقم)؟`, done: R`جرّبت: [[None]]، و [[UPDATE 0]]، و [[DataError: invalid input for query argument $1: '1' ('str' object cannot be interpreted as an integer)]]. asyncpg مبيحوّلش النص لرقم زي psycopg، فكتبت إن ده كويس لأنه بيمسك الغلط بدري.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[await conn.fetch(f"SELECT * FROM products WHERE name = '{q}'")]]. ابعت [[q = "x' OR '1'='1"]] وشوف رجع كام صف، وصلّحه.`, done: R`النسخة البايظة رجّعت **كل** الصفوف، وبعد [[WHERE name = $1]] و [[q]] كباراميتر رجّعت صفر صفوف، وكتبت ليه: الباراميتر بيتبعت داتا مش جزء من نص الـ SQL.` },
            { lvl: 'تطبيق', t: R`**ابني endpoint:** [[GET /products]] بـ pool من الـ lifespan و dependency [[get_conn]]، وفلتر [[max_price]] و [[ids]] ([[list[int]]] من الـ query بـ [[ANY]])، والرد [[list[Product]]].`, done: R`[[?ids=1&ids=3]] بيرجّع المنتجين دول بس، و [[?max_price=abc]] 422، و [[docker stop]] على القاعدة وبعدين طلب بيرجّع 500 والسيرفر لسه شغال، وبعد [[docker start]] الطلبات بترجع تشتغل من غير ما تعيد تشغيل التطبيق.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** دخّل ١٠٠٠ صف بـ [[execute]] في loop، و [[executemany]]، و [[copy_records_to_table]]، وقيس كل واحدة مرتين. وبعدين نفس الكلام لو القاعدة على نفس الجهاز مش في Docker لو عندك.`, done: R`جدول بالأرقام الحقيقية (على الجهاز ده: ٢.٩ و ٠.٠١٤ و ٠.٠٠٩ ثانية)، وكتبت إن الفرق كله في عدد رحلات الشبكة مش في Postgres، وإن [[copy]] مناسب للاستيراد الكبير بس (مفيش [[RETURNING]] ولا [[ON CONFLICT]]).` },
          ],
          deep: {
            why: R`الـ ORM مش إجباري. asyncpg بيديك SQL كامل (CTEs و window functions و [[ON CONFLICT]] و [[RETURNING]]) وأداء أعلى من أي حاجة تانية في Python، ومفيش طبقة سحرية بتولّد queries مش شايفها. ومشاريع حقيقية كتير ماشية بـ asyncpg و SQL في ملفات repository.`,
            how: R`[[create_pool]] بيفتح [[min_size]] اتصالات ويكبر لحد [[max_size]]، و [[pool.acquire()]] بيستنى لو كل الاتصالات مشغولة. وخلي [[max_size]] × عدد الـ workers × عدد الـ containers أقل من [[max_connections]] بتاع Postgres (الافتراضي 100).

asyncpg بيستخدم البروتوكول الثنائي و prepared statements: الـ query والقيم بيتبعتوا منفصلين، فمفيش SQL injection أصلًا، والـ statements المتكررة بتتعمل cache. عشان كده مع PgBouncer في وضع transaction لازم [[statement_cache_size=0]].

الـ [[Record]] اللي بيرجع بيتقري بالاسم [[r["name"]]] أو بالـ index، و [[dict(r)]] بيحوّله dict تبعته لـ Pydantic. والأنواع بتتحوّل لوحدها: [[timestamptz]] لـ datetime، و [[numeric]] لـ Decimal، و [[uuid]] لـ UUID، و [[jsonb]] لـ string (إلا لو عملت codec بـ [[set_type_codec]]).

وأي list بتتبعت كـ Postgres array: [[= ANY($1::int[])]] بدل ما تبني [[IN (1, 2, 3)]] بإيدك.`,
            when: "لما عايز SQL صريح وأداء عالي، أو الـ queries معقدة. ولو الفريق متعود على ORM والـ CRUD كتير: SQLAlchemy (بعد درسين).",
            mistakes: R`f-string في SQL (injection). و [[asyncpg.connect()]] مع كل request بدل pool. و [[%s]] أو [[?]] (دي بتاعة psycopg و sqlite)؛ asyncpg بيقبل [[$1]] بس. ونسيان [[command_timeout]] فـ query معلّقة تمسك اتصال للأبد. و [[fetch]] من غير LIMIT على جدول فيه مليون صف.`
          },
          teach: R`## المثال بيعمل إيه؟

دالة تجربة بتفتح pool لـ Postgres، وتاخد منه اتصال، وتجرّب عليه دوال asyncpg الخمسة واحدة واحدة: صفوف، وصف واحد، وقيمة واحدة، وأمر من غير نتيجة، ونفس الأمر لكذا صف. وفي الآخر تقفل الـ pool.

اتشغّل فعلًا بـ asyncpg 0.32 و Python 3.14 على ويندوز، على Postgres 18 في Docker، بالـ DSN [[postgresql://app:secret@localhost:5432/shop]] ونداء [[asyncio.run(demo(dsn))]] في آخر الملف. والجداول:

~~~sql
CREATE TABLE products (id serial PRIMARY KEY, name text NOT NULL, price_cents int NOT NULL);
INSERT INTO products (name, price_cents) SELECT 'p' || g, g * 700 FROM generate_series(1, 10) g;
CREATE TABLE tags (product_id int REFERENCES products(id), tag text);
~~~

يعني ١٠ منتجات: [[p1]] بـ 700، و [[p2]] بـ 1400، ... لحد [[p10]] بـ 7000. و [[generate_series(1, 10)]] بيطلّع الأرقام من 1 لـ 10، و [[||]] بيلزق نصوص.

---

## ١. الموديل

~~~python
import asyncpg
from pydantic import BaseModel
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
~~~

السعر بالقروش [[int]] مش [[float]]: [[0.1 + 0.2]] في float مش بالظبط [[0.3]]، والفلوس متستحملش ده.

---

## ٢. الـ pool

~~~python
pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10, command_timeout=10)
~~~

- [[dsn]] (Data Source Name): الـ URL بتاع القاعدة، [[postgresql://user:password@host:port/db]].
- [[min_size=2]]: افتح اتصالين على طول. في التجربة [[pool.get_size()]] رجّع [[2]].
- [[max_size=10]]: أقصى عدد. لو العشرة مشغولين، [[acquire()]] بيستنى.
- [[command_timeout=10]]: أي query تاخد أكتر من ١٠ ثواني تتلغي بـ [[TimeoutError]] بدل ما تمسك الاتصال للأبد.

---

## ٣. [[acquire]]

~~~python
async with pool.acquire() as conn:
~~~

خد اتصال، و [[async with]] بترجّعه للـ pool أول ما البلوك يخلص، حتى لو حصل exception.

---

## ٤. [[fetch]]: صفوف

~~~python
rows = await conn.fetch("SELECT id, name, price_cents FROM products WHERE price_cents < $1 ORDER BY id LIMIT $2", 5000, 20)
~~~

- [[$1]] و [[$2]]: **أماكن** القيم في الـ SQL، والقيم نفسها ([[5000]] و [[20]]) بتتبعت بعد الـ SQL بالترتيب. asyncpg بيبعت الاتنين لـ Postgres **منفصلين**.
- بيرجّع list من [[Record]]:

~~~text الناتج
[<Record id=1 name='p1' price_cents=700>, <Record id=2 name='p2' price_cents=1400>, ...]
len = 7
~~~

٧ صفوف لأن الأسعار الأقل من 5000 هي 700 لحد 4900.

~~~python
products = [Product(**dict(r)) for r in rows]
~~~

نفكّه من جوه لبرة لصف واحد:

| الخطوة | الكود | الناتج |
|---|---|---|
| ١ | [[r]] | [[<Record id=1 name='p1' price_cents=700>]] |
| ٢ | [[dict(r)]] | [[{'id': 1, 'name': 'p1', 'price_cents': 700}]] |
| ٣ | [[**]] | فك الـ dict لباراميترات بالاسم: [[Product(id=1, name='p1', price_cents=700)]] |
| ٤ | [[[... for r in rows]]] | نفس الكلام لكل صف |

والـ [[Record]] ممكن يتقري بالاسم [[r["name"]]] أو بالرقم [[r[1]]]، والاتنين طلعوا [[p1]].

---

## ٥. [[fetchrow]] و [[fetchval]]

~~~python
row = await conn.fetchrow("SELECT id, name, price_cents FROM products WHERE id = $1", 7)
count = await conn.fetchval("SELECT count(*) FROM products")
~~~

~~~text الناتج
fetchrow: <Record id=7 name='p7' price_cents=4900>
fetchrow (id = 999): None
fetchval: 10   (نوعه int)
~~~

- [[fetchrow]]: أول صف بس، أو [[None]] لو مفيش. فلازم [[if row is None]] قبل ما تستخدمه.
- [[fetchval]]: أول عمود من أول صف. مناسب لـ [[count(*)]] و [[RETURNING id]].

---

## ٦. [[execute]] و [[executemany]]

~~~python
await conn.execute("UPDATE products SET price_cents = $1 WHERE id = $2", 4500, 7)
await conn.executemany("INSERT INTO tags (product_id, tag) VALUES ($1, $2)", [(7, "hot"), (7, "new")])
~~~

~~~text الناتج
execute: 'UPDATE 1'
executemany: None
~~~

- [[execute]] بيرجّع **حالة الأمر** كـ string، زي اللي [[psql]] بيطبعه: [[UPDATE 1]] يعني صف واحد اتعدّل. لو [[UPDATE 0]] يبقى مفيش منتج بالـ id ده.
- [[executemany]]: نفس الـ SQL لكل tuple في الـ list، وبيرجّع [[None]].

---

## ٧. list كـ array: [[ANY]]

~~~python
ids = await conn.fetch("SELECT id FROM products WHERE id = ANY($1::int[])", [1, 2, 3])
~~~

~~~text الناتج
[<Record id=1>, <Record id=2>, <Record id=3>]
~~~

- [[[1, 2, 3]]] list في Python، asyncpg بيبعتها **Postgres array**.
- [[$1::int[]]]: الـ [[::]] في Postgres تحويل نوع (cast)، و [[int[]]] array من int.
- [[id = ANY(array)]]: الـ id يساوي أي عنصر فيها. بديل [[IN (1, 2, 3)]] من غير ما تبني الـ SQL بإيدك حسب طول الليستة.

---

## ٨. ليه [[$1]] مش اختيارية

~~~python
name = "x' OR '1'='1"
await conn.fetch(f"SELECT id FROM products WHERE name = '{name}'")
await conn.fetch("SELECT id FROM products WHERE name = $1", name)
~~~

~~~text الناتج
f-string: 10 صفوف
$1:       0 صفوف
~~~

الـ f-string بتلزق القيمة جوه الـ SQL، فالـ query بقت:

~~~text
SELECT id FROM products WHERE name = 'x' OR '1'='1'
~~~

و [['1'='1']] صح دايمًا، فرجع الجدول كله. ده SQL injection. أما مع [[$1]]، القيمة بتوصل لـ Postgres كداتا بس: بيدوّر على منتج اسمه حرفيًا [[x' OR '1'='1]]، ومفيش.

---

## ٩. asyncpg صارم

~~~text الناتج
fetch("... WHERE id = $1", "7")  →  DataError: invalid input for query argument $1: '7' ('str' object cannot be interpreted as an integer)
fetch("... WHERE id = %s", 7)    →  PostgresSyntaxError: syntax error at or near "%"
~~~

- الـ string [["7"]] مش بتتحوّل رقم لوحدها: حوّل القيم قبلها (وده شغل Pydantic في الـ route).
- [[%s]] بتاعة psycopg، و [[?]] بتاعة sqlite. asyncpg بيعرف [[$1]] بس.

---

## السطور كلها

| الدالة | بترجّع | امتى |
|---|---|---|
| [[fetch]] | list من Record | صفوف كتير |
| [[fetchrow]] | Record أو None | صف واحد |
| [[fetchval]] | قيمة واحدة | count، RETURNING id |
| [[execute]] | string زي [[UPDATE 1]] | INSERT أو UPDATE أو DELETE |
| [[executemany]] | None | نفس الأمر لكذا صف |

---

## اتشغّل فعلًا: رحلة الشبكة هي اللي بتكلّف

على Postgres 16 في Docker و asyncpg 0.32 من ويندوز، جدول [[items]] فيه [[CHECK (stock >= 0)]]:

~~~text الناتج
fetchrow(... id = 99)             → None
execute(UPDATE ... id = 99)       → UPDATE 0
fetchrow(... id = $1, "1")        → DataError invalid input for query argument $1: '1' ('str' object cannot be interpreted as an integer)
1000 INSERT بـ execute في loop    → 2.890s
1000 INSERT بـ executemany        → 0.014s
1000 صف بـ copy_records_to_table  → 0.009s
UPDATE stock = stock - 2 (كان 1)  → CheckViolationError new row for relation "items" violates check constraint "items_stock_check"
                                    DETAIL:  Failing row contains (1, Tea, -1).
~~~

| السطر | معناه |
|---|---|
| [[UPDATE 0]] | مفيش خطأ، بس مفيش صف اتعدّل. لو الـ endpoint بيعدّل حاجة بالـ id، اقرا الرقم ده وارجع 404 |
| [[DataError]] | asyncpg بيحوّل القيم بنفسه حسب نوع العمود، ومبيقبلش نص مكان رقم. حوّل في Pydantic قبلها |
| ٢.٩ ثانية مقابل ٠.٠١٤ | كل [[execute]] رحلة كاملة (حوالي ٣ مللي ثانية هنا)، و [[executemany]] بيبعت الصفوف ورا بعض من غير ما يستنى كل رد |
| [[CheckViolationError]] | القاعدة نفسها رفضت مخزون سالب. الـ constraint آخر خط حماية حتى لو الكود فيه bug |

و [[CheckViolationError]] و [[UniqueViolationError]] أبناء [[asyncpg.IntegrityConstraintViolationError]]، فتقدر تمسكهم وترجّع 409 بدل 500.

## الخلاصة

- pool واحد للتطبيق، و [[acquire]] لكل شغلانة.
- القيم دايمًا بـ [[$1]] و [[$2]]، مش f-string ولا [[%s]].
- [[dict(record)]] وبعدين Pydantic لو عايز موديل.
- list في Python = array في Postgres: [[= ANY($1::int[])]].`,
          lines: [
            R`[[asyncpg]] درايفر Postgres مكتوب لـ asyncio بالظبط ([[pip install asyncpg]])، بيكلّم القاعدة بالبروتوكول الثنائي بتاعها من غير SQLAlchemy.`,
            R`[[BaseModel]] عشان نحوّل الصفوف لموديلات مفحوصة قبل ما نرجّعها من الـ API.`,
            R`شكل المنتج زي ما الـ API هيرجّعه.`,
            R`[[id]] رقم صحيح، و asyncpg بيرجّعه [[int]] Python من عمود [[integer]] أو [[serial]].`,
            R`[[name]] نص من عمود [[text]].`,
            R`السعر بالقروش [[int]] مش [[float]]: [[0.1 + 0.2]] في float مش [[0.3]]، والفلوس متتحسبش بتقريب.`,
            R`دالة للتجربة بتاخد الـ DSN (عنوان القاعدة). في التطبيق الحقيقي الـ pool بيتعمل في الـ lifespan والـ DSN من [[Settings]].`,
            R`pool: من ٢ لـ ١٠ اتصالات مفتوحة جاهزة. [[command_timeout=10]] بيلغي أي query أكتر من ١٠ ثواني بدل ما يفضل معلّق ويحجز اتصال.`,
            R`[[acquire]] بياخد اتصال فاضي من الـ pool، و [[async with]] بيرجّعه لوحده حتى لو حصل exception. لو الـ ١٠ مشغولين، بيستنى.`,
            R`[[fetch]] بيرجّع list من [[Record]] (كل صف). القيم [[5000]] و [[20]] بتتبعت **منفصلة** عن نص الـ SQL في [[$1]] و [[$2]]، فمفيش SQL injection مهما كان فيها.`,
            R`[[Record]] شبه tuple و dict، فـ [[dict(r)]] بيحوّله dict بأسماء الأعمدة، و [[**]] بتفرده في الموديل.`,
            R`[[fetchrow]] بيرجّع أول صف بس، أو [[None]] لو مفيش، فلازم تفحص [[None]] قبل ما تستخدمه (وترجع 404).`,
            R`[[fetchval]] بيرجّع أول قيمة من أول صف: مناسب لـ [[count(*)]] و [[RETURNING id]].`,
            R`[[execute]] لأمر من غير صفوف، وبيرجّع حالة الأمر نص: [[UPDATE 1]] اتعدّل صف، و [[UPDATE 0]] مفيش صف طابق الشرط (اتجرب).`,
            R`[[executemany]] نفس الأمر لكذا صف في رحلة واحدة تقريبًا. ١٠٠٠ صف أخدوا ٠.٠١٤ ثانية مقابل ٢.٩ ثانية بـ [[execute]] في loop (اتجرب تحت).`,
            R`Python list بتتبعت Postgres array، و [[ANY($1::int[])]] بتطابق أي عنصر فيها. ده بدل [[IN (...)]] بعدد علامات متغير.`,
            R`بيقفل كل اتصالات الـ pool. في التطبيق ده مكانه بعد [[yield]] في الـ lifespan.`,
          ],
          sol: R`على جدول فيه ١٠ منتجات بأسعار من 700 لـ 7000: [[fetch]] بيرجع list من [[Record]] زي [[<Record id=1 name='p1' price_cents=700>]]، و [[fetchrow]] بيرجع Record واحد أو [[None]] لو مفيش، و [[fetchval]] قيمة واحدة ([[10]])، و [[execute]] بيرجع حالة الأمر كـ string ([[UPDATE 1]])، و [[executemany]] بيرجع [[None]]، و [[ANY($1::int[])]] مع list Python بيرجع التلاتة.

والـ f-string مع [[name = "x' OR '1'='1"]] بيرجع الـ ١٠ صفوف كلهم، لأن الـ query بقت [[WHERE name = 'x' OR '1'='1']] والشرط بقى صح دايمًا (SQL injection). ونفس الكلام بـ [[$1]] بيرجع ٠ صفوف: القيمة بتتبعت لـ Postgres منفصلة عن الـ SQL، فمهما كان فيها مبتبقاش كود. ولاحظ إن asyncpg صارم في الأنواع: [[fetch("... WHERE id = $1", "7")]] بترمي [[DataError: invalid input for query argument $1: '7' ('str' object cannot be interpreted as an integer)]]، فحوّل القيم قبلها (وده دور Pydantic).`
        },
        {
          cmd: "transactions",
          title: "كذا عملية يا تتنفذ كلها يا ولا واحدة",
          desc: R`[[async with conn.transaction():]] بيبدأ transaction: لو البلوك خلص عادي بيعمل commit، ولو حصل exception بيعمل rollback. وأي خطوتين مرتبطين (خصم من المخزون وإنشاء طلب) لازم يبقوا في transaction واحدة.

وللحاجات اللي ممكن تحصل من طلبين في نفس اللحظة (آخر قطعة في المخزون): UPDATE بشرط، أو [[SELECT ... FOR UPDATE]]، عشان متبيعش نفس القطعة مرتين.`,
          example: R`import json
import asyncpg
class OutOfStock(Exception):
    pass
async def place_order(conn: asyncpg.Connection, user_id: int, product_id: int, qty: int) -> int:
    async with conn.transaction():
        left = await conn.fetchval(
            "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
            qty, product_id,
        )
        if left is None:
            raise OutOfStock(product_id)
        order_id = await conn.fetchval(
            "INSERT INTO orders (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING id",
            user_id, product_id, qty,
        )
        await conn.execute(
            "INSERT INTO outbox (topic, payload) VALUES ('order.created', $1::jsonb)",
            json.dumps({"order_id": order_id}),
        )
    return order_id`,
          try: R`افتح اتنين [[psql]] وجرّب نفس الـ UPDATE على نفس المنتج من الاتنين جوه [[BEGIN]] من غير COMMIT: التاني هيستنى الأول. وبعدين في Python ارمي exception بعد أول INSERT، واتأكد إن المخزون منقصش.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب SQL اللي asyncpg بيبعته في ٣ حالات: البلوك خلص عادي، و exception جوه البلوك، و [[conn.transaction()]] جوه [[conn.transaction()]] تانية والداخلية وقعت.`, done: R`كتبت [[BEGIN]] ثم [[COMMIT]]، و [[BEGIN]] ثم [[ROLLBACK]]، و [[SAVEPOINT]] ثم [[ROLLBACK TO SAVEPOINT]] والخارجية بتكمّل، وجربت التالتة وطلع المخزون [[10]] (التعديل الخارجي فضل والداخلي اترجع).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** منتج مخزونه 1، و ٥ طلبات متوازية بكود «اقرا المخزون، استنى ٥٠ مللي، لو ≥ 1 اكتب [[stock - 1]]» جوه transaction. كام واحد هيتباع؟ ونفس الكلام بـ [[UPDATE ... WHERE stock >= 1 RETURNING]]؟`, done: R`شغّلت الاتنين بـ [[asyncio.gather]]: الأول [[['sold', 'sold', 'sold', 'sold', 'sold']]] (القطعة اتباعت ٥ مرات)، والتاني [[['sold', 'out', 'out', 'out', 'out']]]. وكتبت إن الـ transaction لوحدها مش بتمنع السباق: اللي بيمنعه إن الفحص والكتابة في أمر واحد أو [[SELECT ... FOR UPDATE]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح الكود الساذج اللي فوق بطريقتين: [[SELECT stock ... FOR UPDATE]] جوه الـ transaction، و UPDATE شرطي. واختبر الاتنين بـ ٥ طلبات متوازية.`, done: R`الطريقتين بيطلّعوا [[sold]] واحدة و ٤ [[out]]، والمخزون في الآخر 0 مش سالب، وكتبت الفرق: [[FOR UPDATE]] بيقفل الصف وقت ما بتقرا فالباقيين بيستنوا، والـ UPDATE الشرطي رحلة واحدة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[transfer(conn, from_id, to_id, cents)]] بين محفظتين: transaction، و [[CHECK (balance >= 0)]] على الجدول، و [[CheckViolationError]] بيتحوّل exception بتاعك [[InsufficientFunds]]، وكل تحويل بيتسجّل في جدول [[ledger]].`, done: R`تحويل أكبر من الرصيد بيرمي [[InsufficientFunds]] والرصيدين زي ما هم وفيه صفر صفوف جديدة في [[ledger]]، و ٥٠ تحويل متوازي بين نفس المحفظتين بيخلّوا مجموع الرصيدين ثابت بالظبط.` },
            { lvl: 'تحدي', t: R`**اشرحها:** فيه تحويلين متوازيين: A لـ B و B لـ A. كل واحد بيقفل صف المرسل الأول. ارسم اللي بيحصل، وشغّله، واقرا الخطأ اللي Postgres بيطلّعه، واقترح تصليح.`, done: R`ظهر [[DeadlockDetectedError]] و [[deadlock detected]] على واحد منهم، والتاني نجح. والتصليح إنك تقفل الصفين دايمًا بنفس الترتيب ([[ORDER BY id FOR UPDATE]])، وبعده ١٠٠ تحويل متعاكس عدّوا من غير deadlock.` },
          ],
          deep: {
            why: "من غير transaction: المخزون نقص والطلب متعملش لأن الـ INSERT فشل، أو طلبين في نفس اللحظة شافوا «فاضل قطعة» والاتنين اشتروا. دي bugs بتظهر تحت الضغط بس، وبتكلّف فلوس حقيقية.",
            how: R`[[conn.transaction()]] بيبعت [[BEGIN]]، والخروج من البلوك [[COMMIT]] أو [[ROLLBACK]]. ولو اتنادت جوه transaction تانية، بتعمل [[SAVEPOINT]] (nested).

الـ UPDATE بالشرط ([[WHERE stock >= $1]]) atomic: Postgres بيقفل الصف، فمن طلبين مع بعض واحد بس هيلاقي المخزون كفاية، والتاني [[RETURNING]] مش هيرجّع حاجة (None). وده أبسط وأسرع من [[SELECT ... FOR UPDATE]] وبعدين UPDATE.

الـ outbox: بدل ما تبعت إيميل أو event جوه الـ transaction (لو الإرسال نجح والـ commit فشل، تبقى بعت عن حاجة محصلتش)، بتكتب الـ event في جدول [[outbox]] في نفس الـ transaction، و worker منفصل يقرا ويبعت. كده الـ event موجود لو وبس لو الطلب اتعمل.

والـ isolation الافتراضي [[READ COMMITTED]]. وممكن [[conn.transaction(isolation="serializable")]] بس ساعتها لازم تعيد المحاولة لو Postgres رمى serialization error. وتفاصيل الـ isolation والـ locks في تاب «SQL و Prisma» وتاب PostgreSQL.`,
            when: "أي عملية كتابة فيها أكتر من statement، أو قراية بعدها كتابة على نفس الداتا. وخلي الـ transaction قصيرة: متعملش HTTP call جواها.",
            mistakes: R`transaction بتستنى API خارجي (الـ locks والاتصال محجوزين ثواني). و SELECT المخزون، تحسب في Python، وبعدين UPDATE بالرقم ([[SET stock = 4]]): race condition. وتمسك الـ exception جوه البلوك وتبلعه، فالـ commit يحصل على نص شغل.`
          },
          teach: R`## المثال بيعمل إيه؟

دالة [[place_order]] بتعمل طلب شراء في ٣ خطوات: تنقّص المخزون، وتعمل صف في [[orders]]، وتكتب event في جدول [[outbox]]. التلاتة جوه transaction واحدة: يا يتنفذوا كلهم، يا ولا واحد. والمخزون بيتنقص بطريقة آمنة حتى لو اتنين بيشتروا آخر قطعة في نفس اللحظة.

اتشغّل فعلًا بـ asyncpg 0.32 على ويندوز، على Postgres 18 في Docker، بجدول [[products]] فيه عمود [[stock]]، و [[orders (id serial, user_id, product_id, qty)]]، و:

~~~sql
CREATE TABLE outbox (id bigserial PRIMARY KEY, topic text NOT NULL, payload jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
~~~

---

## ١. البداية

~~~python
import json
import asyncpg
class OutOfStock(Exception):
    pass
~~~

- [[json]]: عشان نحوّل الـ payload لنص JSON.
- [[OutOfStock]]: exception بتاعنا. [[pass]] يعني «مفيش حاجة زيادة»، الاسم لوحده كفاية عشان نمسكه.

---

## ٢. [[async with conn.transaction():]]

~~~python
async def place_order(conn: asyncpg.Connection, user_id: int, product_id: int, qty: int) -> int:
    async with conn.transaction():
        ...
    return order_id
~~~

| اللحظة | asyncpg بيبعت لـ Postgres |
|---|---|
| الدخول في البلوك | [[BEGIN]] |
| البلوك خلص عادي | [[COMMIT]]: كل اللي جوه يتحفظ |
| exception طلع من البلوك | [[ROLLBACK]]: كل اللي جوه يتلغي، والـ exception يكمّل لبرّه |

والدالة بتاخد [[conn]] جاهز (من الـ dependency بتاعة درس «dependency بـ yield» مثلًا)، ومبتفتحش اتصال بنفسها.

---

## ٣. الخطوة ١: تنقيص المخزون بشرط

~~~python
left = await conn.fetchval(
    "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
    qty, product_id,
)
if left is None:
    raise OutOfStock(product_id)
~~~

نفك الـ SQL:

| الحتة | معناها |
|---|---|
| [[SET stock = stock - $1]] | الحساب بيحصل **جوه Postgres** على القيمة الحالية، مش رقم حسبناه في Python |
| [[WHERE id = $2]] | المنتج اللي اتطلب بس، والـ id جاي كباراميتر منفصل عن نص الـ SQL |
| [[AND stock >= $1]] | بس لو المخزون كفاية. لو مش كفاية، مفيش صف يتعدّل |
| [[RETURNING stock]] | رجّعلي المخزون بعد التعديل |

و [[$1]] مستخدمة مرتين (الكمية في الطرح وفي الشرط)، والقيم بالترتيب: [[qty]] بعدين [[product_id]].

- لو اتعدّل صف: [[fetchval]] بترجع المخزون الباقي.
- لو مفيش صف (المخزون مش كفاية): مفيش حاجة ترجع، فـ [[fetchval]] بترجع [[None]]، فبنرمي [[OutOfStock]]، والـ transaction تعمل rollback.

ليه مش SELECT الأول وبعدين UPDATE؟ لأن بين الاتنين طلب تاني ممكن يقرا نفس الرقم. الـ UPDATE بالشرط خطوة واحدة: Postgres بيقفل الصف وهو بيعدّله.

---

## ٤. الخطوة ٢ و ٣: الطلب والـ outbox

~~~python
order_id = await conn.fetchval(
    "INSERT INTO orders (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING id",
    user_id, product_id, qty,
)
await conn.execute(
    "INSERT INTO outbox (topic, payload) VALUES ('order.created', $1::jsonb)",
    json.dumps({"order_id": order_id}),
)
~~~

- [[RETURNING id]] مع [[fetchval]]: الـ id الجديد.
- [[json.dumps({...})]]: dict لـ string JSON، و [[$1::jsonb]] بيقول لـ Postgres «النص ده حوّله jsonb». (asyncpg من غير codec بيتعامل مع jsonb كـ string.)
- الـ outbox: بدل ما نبعت إيميل أو event لنظام تاني **هنا** (ولو الـ commit فشل بعدها نبقى بعتنا عن طلب مش موجود)، بنكتب «فيه event» في جدول جوه نفس الـ transaction. و worker منفصل يقرا الجدول ويبعت. فالـ event موجود لو وبس لو الطلب اتحفظ.

---

## ٥. نجرّب

### طلب عادي (مخزون المنتج 1 كان 10، والكمية 3)

~~~text الناتج
order: 6
stock p1: 7
outbox: [<Record id=1 topic='order.created' payload='{"order_id": 6}'>]
~~~

### كمية أكبر من المخزون (50)

~~~text الناتج
OutOfStock: OutOfStock(1)
~~~

### exception بعد أول INSERT

ضفت [[raise RuntimeError("boom after insert")]] بعد INSERT الـ orders:

~~~text الناتج
RuntimeError: boom after insert
stock p1 after fail: 7
orders: [<Record id=6 user_id=42 product_id=1 qty=3>]
next order: 8
~~~

- المخزون لسه 7: الـ UPDATE اتلغى مع الـ INSERT.
- مفيش طلب جديد في [[orders]] غير 6.
- الطلب اللي بعده أخد 8 مش 7: الـ id رقم 7 اتاخد من الـ sequence في المحاولة الفاشلة، والـ sequence مبيرجعش.

### اتنين بيشتروا آخر قطعة مع بعض

منتج مخزونه 1، واتنين [[place_order]] بـ [[asyncio.gather]] على اتصالين مختلفين:

~~~text الناتج
race: [9, 'OutOfStock']
~~~

واحد بس نجح. التاني استنى قفل الصف، وبعد ما الأول عمل commit لقى [[stock = 0]]، فالشرط [[stock >= 1]] فشل.

---

## ٦. القفل بعينك: جلستين [[psql]]

~~~sql
-- الجلسة الأولى
BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 4;
-- (من غير COMMIT)

-- الجلسة التانية
UPDATE products SET stock = stock - 1 WHERE id = 4 RETURNING stock;
~~~

التانية بتفضل واقفة من غير ما تطبع حاجة لحد ما الأولى تعمل [[COMMIT]] أو [[ROLLBACK]]. جربتها والأولى بتعمل commit بعد ٣ ثواني: التانية خلصت بعد حوالي ٢.٨ ثانية (بدأت بعد نص ثانية)، وطبعت:

~~~text الناتج
 stock
-------
     8
(1 row)

UPDATE 1
~~~

المخزون كان 10، وكل جلسة نقّصت 1، فالنتيجة 8 مش 9: التانية اشتغلت على القيمة **بعد** commit الأولى. ونفس التجربة بـ اتصالين asyncpg: التاني فضل مستني ([[done() = False]] بعد ثانيتين) لحد الـ COMMIT.

---

## السطور كلها

| الخطوة | الكود | لو فشلت |
|---|---|---|
| BEGIN | [[async with conn.transaction()]] | |
| ١ | [[UPDATE ... WHERE stock >= $1 RETURNING stock]] | [[None]] ← [[OutOfStock]] ← rollback |
| ٢ | [[INSERT INTO orders ... RETURNING id]] | exception ← rollback |
| ٣ | [[INSERT INTO outbox ...]] | exception ← rollback |
| COMMIT | آخر البلوك | |

---

## اتشغّل فعلًا: السباق اللي الـ transaction لوحدها مبتمنعوش

غلطة شائعة: «حطيتها في transaction، يبقى آمنة». جربنا منتج مخزونه 1 و ٥ طلبات متوازية بـ [[asyncio.gather]] (Postgres 16 في Docker و asyncpg 0.32)، بالكود الساذج:

~~~python
async with c.transaction():
    s = await c.fetchval("SELECT stock FROM items WHERE id = 1")
    await asyncio.sleep(0.05)
    if s >= 1:
        await c.execute("UPDATE items SET stock = $1 WHERE id = 1", s - 1)
~~~

~~~text الناتج
naive  ['sold', 'sold', 'sold', 'sold', 'sold']
atomic ['sold', 'out', 'out', 'out', 'out']
~~~

الخمسة قروا [[stock = 1]] قبل ما أي واحد يكتب، والخمسة كتبوا [[0]]: القطعة اتباعت ٥ مرات والقاعدة مقالتش ولا كلمة. الـ isolation الافتراضي في Postgres ([[READ COMMITTED]]) مبيمنعش ده. السطر التاني [[atomic]] هو الـ UPDATE الشرطي اللي في المثال، وواحد بس اتباع.

| الطريقة | بتمنع السباق؟ | ليه |
|---|---|---|
| [[SELECT]] ثم [[UPDATE stock = $1]] | لأ | فيه وقت بين القراية والكتابة، والقيمة اللي اتقرت قديمة |
| [[UPDATE ... SET stock = stock - 1 WHERE stock >= 1]] | أيوه | الفحص والكتابة أمر واحد، والقاعدة بتقفل الصف |
| [[SELECT ... FOR UPDATE]] ثم [[UPDATE]] | أيوه | الصف بيتقفل وقت القراية، والباقيين بيستنوا لحد الـ COMMIT |

### SAVEPOINT: transaction جوه transaction

~~~python
async with c.transaction():
    await c.execute("UPDATE items SET stock = 10 WHERE id = 1")
    try:
        async with c.transaction():
            await c.execute("UPDATE items SET stock = -1 WHERE id = 1")
    except asyncpg.CheckViolationError: print("inner rolled back")
~~~

~~~text الناتج
inner rolled back
stock 10
~~~

الداخلية بقت [[SAVEPOINT]]: لما وقعت رجعت لحد نقطتها بس، والتعديل الخارجي ([[10]]) اتعمله commit. ده مفيد في الاستيراد: صف بايظ يترفض والباقي يكمّل. نفس الفكرة في SQLAlchemy بـ [[session.begin_nested()]] (درس «SQLAlchemy async»).

## الخلاصة

- أي كتابتين مرتبطين = transaction واحدة. والـ exception جوه البلوك = rollback للكل.
- نقّص المخزون في SQL بشرط ([[stock = stock - $1 WHERE stock >= $1]])، مش تقرا وتحسب في Python.
- الإيميلات والـ events من جوه transaction تتكتب في outbox، مش تتبعت.
- الـ transaction قصيرة: متعملش فيها HTTP call.`,
          lines: [
            R`[[json]] عشان نحوّل الـ payload بتاع الـ event لنص JSON قبل ما يتخزن في عمود [[jsonb]].`,
            R`[[asyncpg]] للاتصال وللـ transaction. نفس الفكرة في SQLAlchemy بـ [[session.begin()]].`,
            R`exception بتاعنا للمخزون: الـ route يمسكه ويرجّع 409، وأي exception بيعدّي من بلوك الـ transaction بيعمل rollback.`,
            R`[[pass]] لأن الـ class مش محتاج أي حاجة زيادة: الاسم نفسه هو المعلومة.`,
            R`الدالة بتاخد اتصال جاهز (من dependency بـ yield) مش pool، عشان كل الأوامر تمشي على **نفس** الاتصال، والـ transaction مربوطة باتصال واحد.`,
            R`[[transaction()]] بيبعت [[BEGIN]]، ولما البلوك يخلص عادي [[COMMIT]]، ولو exception عدّى منه [[ROLLBACK]] وبيرمي الـ exception تاني. ولو اتنادت جوه transaction تانية بتبقى [[SAVEPOINT]] (اتجرب تحت).`,
            R`[[fetchval]] عشان الـ UPDATE فيه [[RETURNING]] بيرجّع قيمة واحدة: المخزون الباقي.`,
            R`الـ UPDATE والفحص في أمر **واحد**: [[stock >= $1]] جوه الـ WHERE، فمفيش وقت بين «اقرا» و«اكتب» يدخل فيه طلب تاني. والقاعدة بتقفل الصف لحد الـ COMMIT.`,
            R`الباراميترات بالترتيب: [[qty]] هي [[$1]] (واستخدمناها مرتين في الـ SQL)، و [[product_id]] هي [[$2]].`,
            R`قفلة [[fetchval]].`,
            R`لو مفيش صف طابق ([[stock]] أقل من الكمية أو المنتج مش موجود)، [[RETURNING]] مبيرجّعش حاجة و [[fetchval]] بترجّع [[None]].`,
            R`نرمي [[OutOfStock]] فالبلوك يعمل ROLLBACK. هنا مفيش حاجة اتغيّرت أصلًا، بس لو كان فيه أوامر قبلها كانت هتترجع.`,
            R`أمر تاني في نفس الـ transaction: نعمل الطلب.`,
            R`[[INSERT ... RETURNING id]] بيعمل الصف ويرجّع الـ id اللي الـ sequence ادّاه في نفس الرحلة.`,
            R`القيم بالترتيب لـ [[$1]] و [[$2]] و [[$3]].`,
            R`قفلة [[fetchval]] التاني.`,
            R`أمر تالت: نسجّل event في جدول [[outbox]] في نفس الـ transaction، فيا الطلب والـ event يتحفظوا مع بعض، يا ولا واحد فيهم.`,
            R`[[$1::jsonb]] بيقول لـ Postgres يحوّل النص لـ [[jsonb]]. worker منفصل بيقرا الجدول ده ويبعت الإيميل أو الرسالة بعدين («Celery و ARQ»)، فلو الإرسال وقع الطلب مش بيضيع.`,
            R`[[json.dumps]] بيعمل نص JSON من الـ dict، لأن asyncpg محتاج نص لعمود [[jsonb]] من غير codec مخصوص.`,
            R`قفلة [[execute]].`,
            R`برّه بلوك الـ [[async with]]: هنا الـ COMMIT حصل خلاص، والطلب والـ event والمخزون الجديد بقوا ظاهرين لأي اتصال تاني.`,
          ],
          sol: R`في الـ psql التاني، الـ UPDATE هيفضل واقف من غير ما يطبع حاجة لحد ما تعمل [[COMMIT]] (أو [[ROLLBACK]]) في الأول. Postgres عامل row lock على الصف. ولما الأول يعمل commit، التاني بيكمّل على القيمة الجديدة: لو المخزون كان 10 وكل واحد نقّص 1 هتلاقي [[8]] مش [[9]]. ده اللي بيخلي [[stock = stock - $1 WHERE stock >= $1]] آمن من غير ما تقرا الأول وتكتب بعدين.

وفي Python لو رميت exception بعد أول INSERT: المخزون هيفضل زي ما هو وجدول orders مفيهوش صف، لأن [[async with conn.transaction()]] عمل rollback للـ UPDATE والـ INSERT مع بعض. الطلب اللي بعده هياخد id أكبر بواحد (الـ sequence مبترجعش). ولو لقيت المخزون نقص، غالبًا الـ UPDATE كان برّه الـ [[async with]]، أو استخدمت connection تاني غير اللي فتح الـ transaction.`
        },
        {
          cmd: "SQLAlchemy async",
          title: "ORM بـ SQLAlchemy 2 وهو async",
          desc: R`SQLAlchemy 2 بيدّيك models بـ type hints ([[Mapped[int]]] و [[mapped_column]])، و queries بـ [[select()]]، ويشتغل async فوق asyncpg: [[create_async_engine("postgresql+asyncpg://...")]] و [[AsyncSession]].

الـ session بتتعمل لكل request في dependency بـ yield، والـ engine مرة واحدة. و [[expire_on_commit=False]] مهمة في async.

التسطيب: [[pip install "sqlalchemy[asyncio]" asyncpg]]، مش [[pip install sqlalchemy]] بس. من SQLAlchemy 2.1 مكتبة [[greenlet]] مبقتش بتتسطّب لوحدها، والجزء الـ async محتاجها، فمن غير الـ extra ده أول استخدام async هيرمي [[ImportError]] إن [[greenlet]] مش متسطّبة.`,
          example: R`from datetime import datetime
from typing import Annotated
from fastapi import Depends
from sqlalchemy import ForeignKey, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    total_cents: Mapped[int]
    user: Mapped[User] = relationship()
engine = create_async_engine("postgresql+asyncpg://app:secret@localhost/shop", pool_size=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
async def recent_orders(session: AsyncSession, user_id: int) -> list[Order]:
    stmt = select(Order).where(Order.user_id == user_id).options(selectinload(Order.user)).order_by(Order.id.desc()).limit(20)
    return list(await session.scalars(stmt))
async def create_user(session: AsyncSession, email: str) -> User:
    user = User(email=email)
    session.add(user)
    await session.commit()
    return user`,
          try: R`شيل [[selectinload(Order.user)]] وجرّب تقرا [[order.user.email]] بعد الـ query: هيطلع [[MissingGreenlet]]. ده الـ lazy loading اللي async مبيسمحش بيه. وبعدين اعمل الـ engine بـ [[echo=True]] وشوف الـ SQL اللي اتولّد.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب بأسلوب 2.0 من غير ما تبص: «كل المستخدمين اللي إيميلهم بيخلص بـ [[@example.com]] مرتبين بالأحدث»، و«عدد الطلبات لمستخدم»، و«مجموع [[total_cents]] لكل مستخدم».`, done: R`كتبت [[select(User).where(User.email.like("%@example.com")).order_by(User.created_at.desc())]] و [[select(func.count()).select_from(Order).where(Order.user_id == 1)]] و [[select(Order.user_id, func.sum(Order.total_cents)).group_by(Order.user_id)]]، وشغّلتهم بـ [[echo=True]] وشفت الـ SQL.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[orders = (await s.scalars(select(Order).limit(20))).all()]] وبعدين [[orders[0].user.email]]. إيه اللي هيحصل؟ ولو [[await o.awaitable_attrs.user]] لكل طلب في loop، كام query؟`, done: R`جرّبت: الأولى [[MissingGreenlet: greenlet_spawn has not been called]]، والتانية اشتغلت بس بـ ٢١ query (واحدة للطلبات و ٢٠ للمستخدمين)، وده N+1 بالظبط (درس «N+1 و pagination»).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[POST /users]] بيعمل [[session.add]] ومن غير [[commit]]، والرد 201 بالـ id [[None]]، و إيميل متكرر بيرجّع 500. صلّح الاتنين بـ [[SessionLocal.begin()]] و [[flush]] و [[IntegrityError]].`, done: R`الرد بقى فيه id حقيقي، والإيميل المتكرر 409 [[email taken]]، والمستخدم موجود في القاعدة بعد الطلب ([[psql]] شافه)، والطلب اللي بيرمي بعد [[flush]] مبيسيبش صف.` },
            { lvl: 'تطبيق', t: R`**ابني:** استيراد مستخدمين من list فيها إيميلات متكررة: كل واحد في [[session.begin_nested()]]، والمتكرر يتسجّل في [[skipped]] والباقي يتحفظ، كله في transaction واحدة.`, done: R`[[["imp1@example.com", "u1@example.com", "imp2@example.com"]]] و [[u1]] موجود قبل كده: [[skipped]] فيها [[u1]] بس، والاتنين التانيين اتحفظوا. ومن غير [[begin_nested]] الـ [[UniqueViolationError]] بيرجّع الكل ومفيش ولا واحد اتحفظ.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** fixture بتعمل override لـ [[get_session]] بـ session مربوطة باتصال عليه transaction برّانية و [[join_transaction_mode="create_savepoint"]]، وبترجعها في الآخر. اختبارين: واحد بيعمل مستخدم و 409، والتاني بيتأكد إن المستخدم ده مش موجود.`, done: R`[[pytest -q]] بيطبع [[2 passed]] وعدد المستخدمين في القاعدة بعد الاختبارات زي ما كان قبلها ([[select count(*)]] في psql)، والكود جوه الـ routes بيعمل [[commit]] عادي من غير ما يعرف إنه في اختبار.` },
          ],
          deep: {
            why: "لما الـ CRUD كتير والعلاقات متشعبة، كتابة SQL لكل حاجة بتتقل. و SQLAlchemy أشهر ORM في Python، ونسخة 2 نضّفت الـ API وبقت typed وبتشتغل async. وهتقابلها في أغلب مشاريع FastAPI.",
            how: R`[[DeclarativeBase]] أساس الـ models، و [[Mapped[T]]] النوع (و [[Mapped[str | None]]] يبقى nullable)، و [[mapped_column]] للإعدادات.

الـ engine جواه pool الاتصالات، وإنشاؤه مبيفتحش اتصال فورًا، فعادي يبقى على مستوى الـ module، وفي آخر الـ lifespan [[await engine.dispose()]]. والـ session وحدة شغل لكل request: بتتابع الـ objects اللي اتضافت أو اتعدّلت، و [[commit]] بيكتبهم.

[[expire_on_commit=False]]: الافتراضي إن بعد commit كل الـ attributes بتتمسح وتتقري تاني من القاعدة أول ما تلمسها. وفي async ده محتاج await، والـ attribute access مينفعش يعمل await، فبيطلع [[MissingGreenlet]]. ونفس السبب بيخلي الـ lazy loading للعلاقات ممنوع: حمّلها مقدمًا بـ [[selectinload]] (query تانية بـ IN) أو [[joinedload]] (JOIN)، أو استخدم [[AsyncAttrs]] و [[await obj.awaitable_attrs.user]].

[[session.scalars(stmt)]] بيرجع الـ objects نفسها، و [[session.execute(stmt)]] بيرجع صفوف. و [[session.get(User, 5)]] بالـ primary key. وتقدر تحوّل الناتج لـ Pydantic بـ [[from_attributes]].

والـ migrations مش شغل SQLAlchemy نفسه: [[Base.metadata.create_all]] للتجربة بس، و Alembic للحقيقي (الدرس الجاي). وفيه كمان SQLModel (من صاحب FastAPI) مبني على SQLAlchemy و Pydantic مع بعض.`,
            when: R`CRUD كتير وعلاقات، وفريق متعود على ORM. وتقدر تخلط: ORM للعادي، و [[text()]] أو asyncpg مباشرة للـ queries التقيلة.`,
            mistakes: R`N+1: loop على طلبات وكل واحد يعمل query لمستخدمه (في async بيطلع error، وده أحسن من sync اللي بيبطّأ في صمت). و session واحدة مشتركة بين requests. و [[create_engine]] الـ sync جوه تطبيق async. ونسيان [[await session.commit()]] فمفيش حاجة اتحفظت.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف جدولين كـ classes ([[User]] و [[Order]])، ويعمل engine (اتصال + pool) و مصنع sessions، و dependency بتدّي كل طلب session، ودالتين: واحدة بتجيب آخر طلبات مستخدم ومعاها صاحبها، وواحدة بتعمل مستخدم. يعني ORM (Object-Relational Mapping): بتتعامل مع objects في Python، و SQLAlchemy بيكتب الـ SQL.

اتشغّل فعلًا بـ SQLAlchemy 2.1.3 و asyncpg 0.32 و Python 3.14 على ويندوز، على Postgres 18 في Docker. عملت الجداول بـ [[Base.metadata.create_all]] (للتجربة بس)، ومستخدم [[sara@example.com]] وطلبين ليه، وناديت الدوال من [[asyncio.run]].

---

## ١. الـ imports

~~~python
from datetime import datetime
from typing import Annotated
from fastapi import Depends
from sqlalchemy import ForeignKey, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload
~~~

| الاسم | بتاع إيه |
|---|---|
| [[ForeignKey]] | عمود بيشاور على عمود في جدول تاني |
| [[func]] | دوال SQL: [[func.now()]] = [[now()]] في Postgres |
| [[select]] | يبني SELECT بأسلوب 2.0 من غير ما ينفّذه، والتنفيذ بعدين بـ [[session.scalars]] |
| [[create_async_engine]] و [[AsyncSession]] و [[async_sessionmaker]] | النسخ الـ async من الـ engine والـ session ومصنعها |
| [[DeclarativeBase]] و [[Mapped]] و [[mapped_column]] | تعريف الـ models |
| [[relationship]] و [[selectinload]] | العلاقة بين جدولين ([[order.user]])، وتحميلها مقدمًا عشان async مبيسمحش بالـ lazy |

---

## ٢. الـ models

~~~python
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
~~~

- [[Base]]: أب كل الـ models. فاضي، بس هو اللي بيجمع كل الجداول في [[Base.metadata]].
- [[__tablename__]]: اسم الجدول في القاعدة.
- [[Mapped[int]]]: «العمود ده نوعه int، ومش null». ولو [[Mapped[str | None]]] يبقى nullable. الـ type hint نفسه هو اللي بيحدد النوع.
- [[mapped_column(primary_key=True)]]: primary key، وفي Postgres بيبقى بيزيد لوحده.
- [[unique=True]]: مفيش إيميلين زي بعض.
- [[server_default=func.now()]]: القاعدة نفسها اللي تحط الوقت لو مبعتناهوش.

~~~python
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    total_cents: Mapped[int]
    user: Mapped[User] = relationship()
~~~

- [[ForeignKey("users.id")]]: [[user_id]] لازم يبقى id موجود في [[users]].
- [[total_cents: Mapped[int]]] من غير [[mapped_column]]: الـ annotation لوحدها كفاية لعمود عادي.
- [[user: Mapped[User] = relationship()]]: **مش عمود**. ده attribute بيجيب الـ [[User]] اللي [[user_id]] بيشاور عليه، فتكتب [[order.user.email]].

---

## ٣. الـ engine والـ sessions

~~~python
engine = create_async_engine("postgresql+asyncpg://app:secret@localhost/shop", pool_size=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
~~~

- [[postgresql+asyncpg://]]: القاعدة Postgres، والدرايفر asyncpg. باقي الـ URL زي أي DSN.
- [[pool_size=10]]: الـ engine جواه pool. وإنشاؤه **مبيفتحش اتصال**، أول اتصال بيتفتح مع أول query، فعادي يبقى على مستوى الـ module.
- [[async_sessionmaker]]: مصنع، كل ما تناديه [[SessionLocal()]] يدّيك session جديدة.
- [[expire_on_commit=False]]: من غيرها، بعد [[commit]] كل الـ attributes بتتمسح وتتقري من القاعدة أول ما تلمسها. وقراية attribute مينفعش فيها [[await]]، فبيطلع error. جربتها بمصنع من غير الإعداد ده: [[u.email]] بعد commit رمت [[MissingGreenlet]].

---

## ٤. الـ dependency

~~~python
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
~~~

نفس فكرة درس «dependency بـ yield»: session لكل طلب، و [[async with]] بتقفلها بعد الـ route (وأي transaction مفتوحة مااتعملهاش commit بتتعمل لها rollback). والـ route يكتب [[session: SessionDep]].

---

## ٥. [[recent_orders]]: السطر الطويل

~~~python
stmt = select(Order).where(Order.user_id == user_id).options(selectinload(Order.user)).order_by(Order.id.desc()).limit(20)
return list(await session.scalars(stmt))
~~~

كل حتة بترجّع statement جديد، فبتتسلسل بالنقط:

| الحتة | الـ SQL |
|---|---|
| [[select(Order)]] | كل أعمدة الـ model بالاسم: [[SELECT orders.id, orders.user_id, orders.total_cents FROM orders]] |
| [[.where(Order.user_id == user_id)]] | [[WHERE orders.user_id = $1]]: الـ [[==]] هنا مش بيرجّع True أو False، بيبني شرط SQL |
| [[.options(selectinload(Order.user))]] | بعد ما تجيب الطلبات، هات أصحابها في query تانية |
| [[.order_by(Order.id.desc())]] | الأحدث الأول: [[ORDER BY orders.id DESC]] |
| [[.limit(20)]] | الـ 20 بقت باراميتر منفصل مش جزء من النص: [[LIMIT $2]] |

- [[session.scalars(stmt)]]: نفّذ، ورجّع أول عمود من كل صف، وهو هنا الـ [[Order]] object نفسه. ومحتاج [[await]] لأنه بيكلّم القاعدة.
- [[list(...)]]: حوّل النتيجة لـ list عادية.

### الـ SQL الحقيقي

لو عملت الـ engine بـ [[echo=True]]، SQLAlchemy بيطبع كل query:

~~~text الناتج
BEGIN (implicit)
SELECT orders.id, orders.user_id, orders.total_cents
FROM orders
WHERE orders.user_id = $1::INTEGER ORDER BY orders.id DESC
 LIMIT $2::INTEGER
[generated in 0.00017s] (1, 20)
SELECT users.id, users.email, users.created_at
FROM users
WHERE users.id IN ($1::INTEGER)
[generated in 0.00022s] (1,)
[(2, 3200), (1, 1500)]
email: sara@example.com
ROLLBACK
~~~

- query للطلبات، وبعدها **query واحدة** للمستخدمين بـ [[IN]]، مهما كان عدد الطلبات. ده اللي بيمنع مشكلة N+1 (query لكل طلب).
- [[BEGIN (implicit)]]: الـ session فتحت transaction لوحدها مع أول query.
- [[ROLLBACK]] في الآخر: الـ session اتقفلت من غير commit. عادي لأننا قرينا بس.

### من غير [[selectinload]]

~~~text الناتج
[(2, 3200), (1, 1500)]
MissingGreenlet: greenlet_spawn has not been called; can't call await_() here. Was IO attempted in an unexpected place?
~~~

الطلبات جت، بس [[orders[0].user.email]] وقعت. الـ [[user]] متحمّلش، فـ SQLAlchemy حاول يجيبه وقت ما قريت الـ attribute (ده اسمه lazy loading)، وده محتاج query، و async مينفعش يعمل query من غير [[await]]. فحمّل العلاقات مقدمًا دايمًا.

---

## ٦. [[create_user]]

~~~python
user = User(email=email)
session.add(user)
await session.commit()
return user
~~~

- [[User(email=email)]]: object في الذاكرة بس، لسه مالوش id.
- [[session.add(user)]]: الـ session بقت متابعاه. لسه مفيش SQL.
- [[await session.commit()]]: دلوقتي بس الـ SQL بيتبعت:

~~~text الناتج (echo=True)
BEGIN (implicit)
INSERT INTO users (email) VALUES ($1::VARCHAR) RETURNING users.id, users.created_at
[generated in 0.00020s] ('omar@example.com',)
COMMIT
after commit, expire_on_commit=False: 2 2026-10-07 09:27:02.559845
~~~

الـ [[id]] و [[created_at]] القاعدة هي اللي عملتهم، و SQLAlchemy جابهم بـ [[RETURNING]] وحطهم في الـ object، فـ [[user.id]] بقى 2 من غير query زيادة.

---

## ٧. التسطيب

~~~bash
pip install "sqlalchemy[asyncio]" asyncpg
~~~

الـ [[[asyncio]]] بيسطّب [[greenlet]] (الحتة اللي SQLAlchemy بيستخدمها عشان يشغّل كوده الـ sync جوه async). في SQLAlchemy 2.1 الـ greenlet مبقاش بيتسطّب لوحده: الـ metadata بتاعة الحزمة بتقول [[greenlet>=1; extra == "asyncio"]].

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[class X(Base)]] و [[Mapped[T]]] | الـ class جدول، وكل [[Mapped]] عمود بنوعه، و [[| None]] يخليه يقبل NULL |
| [[relationship()]] | attribute بيجيب الصف المرتبط |
| [[create_async_engine(...)]] | الاتصال والـ pool، مرة واحدة |
| [[async_sessionmaker(..., expire_on_commit=False)]] | مصنع sessions مناسب لـ async |
| [[select(...).where(...).options(selectinload(...))]] | query وتحميل العلاقة مقدمًا |
| [[await session.scalars(stmt)]] | نفّذ ورجّع objects |
| [[session.add]] ثم [[await session.commit()]] | [[add]] بيحضّر بس، و [[commit]] هو اللي بيبعت INSERT والـ COMMIT |

---

## اتشغّل فعلًا: session لكل طلب بـ commit أوتوماتيك

بدل ما كل route يفتكر [[await session.commit()]]، خلّي الـ dependency تفتح transaction: [[SessionLocal.begin()]] بيعمل commit لو الطلب خلص عادي، و rollback لو اترمى أي exception (حتى [[HTTPException]]). اتجرب على SQLAlchemy 2.1 و FastAPI 0.162 و Postgres 16 في Docker:

~~~python
async def get_session():
    async with SessionLocal.begin() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
@app.post("/users", status_code=201)
async def create(email: str, session: SessionDep):
    user = User(email=email)
    session.add(user)
    try:
        await session.flush()
    except IntegrityError:
        raise HTTPException(409, "email taken")
    return {"id": user.id, "email": user.email}
@app.post("/users/fail")
async def fail(email: str, session: SessionDep):
    session.add(User(email=email)); await session.flush()
    raise HTTPException(400, "changed my mind")
~~~

~~~text الناتج
GET  /users/count                         → {'n': 50}
POST /users?email=new1@example.com        → 201 {'id': 51, 'email': 'new1@example.com'}
POST /users?email=new1@example.com        → 409 {'detail': 'email taken'}
POST /users/fail?email=ghost@example.com  → 400 {'detail': 'changed my mind'}
GET  /users/count                         → {'n': 51}
psql: select email ... → new1@example.com   (ghost مش موجود)
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[SessionLocal.begin()]] | session ومعاها transaction: الخروج العادي = COMMIT، والـ exception = ROLLBACK |
| [[await session.flush()]] | بيبعت الـ INSERT دلوقتي من غير commit، فـ [[user.id]] بيبقى موجود و [[IntegrityError]] بيظهر هنا جوه الـ [[try]] |
| [[except IntegrityError]] | الإيميل متكرر (الـ [[UNIQUE]]). من غيره الرد 500 |
| [[/users/fail]] | الـ INSERT اتبعت فعلًا بـ [[flush]]، بس الـ 400 عدّت من الـ dependency فاتعمل rollback، و ghost مش في القاعدة |

> الـ ids اللي اتاخدت في المحاولات الفاشلة (52 و 53) مبترجعش: الـ sequence في Postgres مبيتراجعش مع الـ rollback، فمتعتمدش إن الأرقام ورا بعض.

### الاختبار على قاعدة حقيقية، وكل اختبار بيرجع

~~~python
@pytest.fixture
def client():
    engine = create_async_engine(TEST_URL, poolclass=NullPool)
    state = {}
    async def override():
        if "conn" not in state:
            state["conn"] = await engine.connect()
            state["tx"] = await state["conn"].begin()
        session = AsyncSession(bind=state["conn"], join_transaction_mode="create_savepoint", expire_on_commit=False)
        try:
            yield session
            await session.commit()
        finally:
            await session.close()
    app.dependency_overrides[get_session] = override
    with TestClient(app) as c:
        yield c
        c.portal.call(state["tx"].rollback)
        c.portal.call(state["conn"].close)
    app.dependency_overrides.clear()
~~~

| الحتة | ليه |
|---|---|
| [[NullPool]] | اتصال جديد ومفيش pool، عشان الاتصال ميتشاركش بين event loops |
| [[state["conn"].begin()]] | transaction برّانية للاختبار كله، هي اللي بترجع في الآخر |
| [[join_transaction_mode="create_savepoint"]] | أي [[commit]] من الـ route بيبقى SAVEPOINT جوه البرّانية، فالـ 409 والـ rollback بيشتغلوا عادي |
| [[c.portal.call(...)]] | بيشغّل الـ rollback جوه نفس الـ event loop بتاع الـ TestClient |

~~~text الناتج
..                                                                       [100%]
2 passed in 1.14s
psql: select count(*) from users → 51   (نفس العدد قبل الاختبارات)
~~~

### الفخ: [[TestClient]] من غير [[with]] مع engine async

أول نسخة من الاختبار كانت [[c = TestClient(app)]] من غير [[with]]. الطلب الأول نجح، والتاني وقع:

~~~text الناتج
RuntimeError: Event loop is closed
AttributeError: 'NoneType' object has no attribute 'send'
~~~

من غير [[with]]، كل طلب بيشتغل في event loop جديد، والاتصال اللي في الـ pool اتعمل في الـ loop الأولاني اللي اتقفل. [[with TestClient(app) as c:]] بيخلي كل الطلبات في loop واحد، وده التصليح.

## الخلاصة

- في async مفيش lazy loading: [[selectinload]] أو [[joinedload]] لكل علاقة هتقراها.
- [[expire_on_commit=False]] وإلا قراية أي attribute بعد commit هتقع.
- [[echo=True]] وإنت بتطوّر عشان تشوف الـ SQL الحقيقي.
- [[create_all]] للتجربة، و Alembic للحقيقي (الدرس الجاي).`,
          lines: [
            R`[[datetime]] نوع عمود [[created_at]]، و SQLAlchemy بيحوّله [[timestamp]] في Postgres.`,
            R`[[Annotated]] عشان نعمل [[SessionDep]] للـ routes تحت.`,
            R`[[Depends]] عشان الـ session توصل للـ route كـ dependency ويتبدّل في الاختبار.`,
            R`[[ForeignKey]] لعمود بيشاور على جدول تاني، و [[func]] لدوال SQL زي [[now()]] و [[count()]]، و [[select]] لبناء الـ SELECT بأسلوب 2.0.`,
            R`[[create_async_engine]] بيعمل engine فيه pool، و [[async_sessionmaker]] مصنع sessions، و [[AsyncSession]] النوع اللي الـ routes بتستلمه. محتاجين [[sqlalchemy[asyncio]]] (اللي بيسطّب greenlet).`,
            R`[[DeclarativeBase]] أساس الـ models، و [[Mapped]] و [[mapped_column]] للأعمدة بالأنواع، و [[relationship]] للعلاقات، و [[selectinload]] لتحميل العلاقة مقدمًا.`,
            R`كل model بيورث من [[Base]]، و [[Base.metadata]] فيها كل الجداول (Alembic بيقارن بيها).`,
            R`[[pass]] لأن الـ Base مش محتاج حاجة. ولو عايز [[awaitable_attrs]] على كل الـ models، خليه [[class Base(AsyncAttrs, DeclarativeBase)]].`,
            R`model للمستخدمين: الـ class = جدول، وكل [[Mapped]] = عمود.`,
            R`اسم الجدول في القاعدة. من غيره SQLAlchemy بيرفض يعمل الـ model.`,
            R`[[Mapped[int]]] و [[primary_key=True]]: عمود [[integer]] بـ sequence أوتوماتيك، فمتبعتش الـ id وانت بتعمل مستخدم.`,
            R`[[unique=True]] بيعمل [[UNIQUE]] constraint، فإيميل متكرر بيرمي [[IntegrityError]] من القاعدة (امسكه وارجع 409).`,
            R`[[server_default=func.now()]]: القاعدة نفسها بتحط الوقت وقت الـ INSERT، مش Python، فكل السيرفرات بنفس الساعة.`,
            R`model للطلبات: كل طلب تبع مستخدم واحد عن طريق [[user_id]].`,
            R`اسم الجدول [[orders]] في القاعدة، وهو اللي [[ForeignKey]] و Alembic بيستخدموه.`,
            R`primary key رقم بيزيد لوحده من sequence، زي [[users.id]].`,
            R`[[ForeignKey("users.id")]]: القاعدة بترفض طلب لمستخدم مش موجود. بالاسم بتاع الجدول والعمود في القاعدة، مش اسم الـ class.`,
            R`[[Mapped[int]]] من غير [[mapped_column]] كفاية: عمود [[integer NOT NULL]]. و [[Mapped[int | None]]] لو عايزه يقبل [[NULL]].`,
            R`[[relationship()]] مش عمود: بيخلي [[order.user]] يرجّع object الـ [[User]] من الـ foreign key. في async لازم يتحمّل مقدمًا، وإلا قرايته بترمي [[MissingGreenlet]].`,
            R`engine بدرايفر asyncpg ([[postgresql+asyncpg://]])، وجواه pool حجمه 10. واحد للتطبيق كله على مستوى الـ module أو في الـ lifespan، والـ URL من [[Settings]].`,
            R`مصنع sessions. [[expire_on_commit=False]] بيخلي الـ attributes متتمسحش بعد commit، لأن قرايتها تاني في async محتاجة await ومينفعش.`,
            R`dependency: session جديدة لكل طلب، ومتتشاركش بين طلبين أبدًا.`,
            R`[[async with]] بيقفل الـ session في الآخر ويرجّع الاتصال للـ pool، ولو فيه transaction مفتوحة من غير commit بيعمل rollback.`,
            R`بيدّي الـ session للـ route. الـ commit هنا على الـ route ([[create_user]] تحت)، أو استخدم [[SessionLocal.begin()]] عشان الـ commit يبقى أوتوماتيك (اتجرب تحت).`,
            R`النوع اللي الـ routes بتكتبه: [[session: SessionDep]].`,
            R`دالة repository: بتاخد session وترجّع objects، والـ route ميعرفش SQL. سهل تختبرها لوحدها.`,
            R`بيبني الـ SELECT: طلبات المستخدم ده، ومعاها المستخدم بـ [[selectinload]] (query تانية بـ [[IN]])، من الأحدث، ٢٠ بس. مفيش حاجة بتتنفّذ لسه.`,
            R`[[session.scalars]] بينفّذ ويرجّع أول عمود من كل صف (الـ [[Order]] نفسه)، و [[list]] بتجمعهم. لو عايز صفوف كاملة استخدم [[session.execute]].`,
            R`دالة repository تانية لإنشاء مستخدم بالإيميل، وبترجّعه بالـ id اللي القاعدة ادّته.`,
            R`object Python عادي لسه مش في القاعدة: من غير id ومن غير [[created_at]].`,
            R`[[add]] بيحطه في الـ session كـ «جديد»، ومفيش SQL اتبعت لسه.`,
            R`[[commit]] بيبعت [[INSERT ... RETURNING]] و [[COMMIT]]، فالـ id و [[created_at]] بيرجعوا من القاعدة ويتحطوا على الـ object.`,
            R`بيرجّعه بالـ id، وبفضل [[expire_on_commit=False]] قراية [[user.email]] بعد الـ commit مش بتعمل query.`,
          ],
          sol: R`من غير [[selectinload]]، [[order.user.email]] بترمي [[MissingGreenlet: greenlet_spawn has not been called; can't call await_() here. Was IO attempted in an unexpected place?]]. الـ [[user]] متحمّلش، فـ SQLAlchemy حاول يعمل query وإنت بتقرا attribute عادي من غير [[await]]، وده مينفعش في async. الحل تحمّله مقدمًا بـ [[selectinload]]، أو [[await session.refresh(order, ["user"])]]، أو [[lazy="raise"]] على الـ relationship عشان الغلطة تبان بدري.

ومع [[echo=True]] هتشوف [[SELECT orders.id, orders.user_id, orders.total_cents FROM orders WHERE orders.user_id = $1::INTEGER ORDER BY orders.id DESC LIMIT $2::INTEGER]]، وبعدها query تانية من [[selectinload]]: [[SELECT users.id, users.email, users.created_at FROM users WHERE users.id IN ($1::INTEGER)]]، يعني ٢ queries مهما كان عدد الطلبات، مش N+1. ولو ظهر [[ImportError: The SQLAlchemy asyncio module requires that the Python 'greenlet' library is installed]]، سطّب [[pip install "sqlalchemy[asyncio]" asyncpg]]: من SQLAlchemy 2.1 الـ greenlet مبقاش بيتسطّب لوحده.`
        },
        {
          cmd: "alembic",
          title: "تغيّر شكل الجداول بـ migrations بتتعمل commit",
          desc: R`Alembic أداة الـ migrations لـ SQLAlchemy: كل تغيير في الجداول ملف Python فيه [[upgrade()]] و [[downgrade()]]، بيتعمله commit مع الكود، ويتطبق على كل بيئة بنفس الترتيب. و [[--autogenerate]] بيقارن الـ models بالقاعدة ويكتب الـ migration، وانت تراجعه.

ولو مش بتستخدم SQLAlchemy (asyncpg و SQL بس)، نفس الفكرة بملفات SQL وسكربت (تاب PostgreSQL فيه «سكربت migrations»)، أو Alembic نفسه بـ [[op.execute("...")]].`,
          example: R`pip install alembic
alembic init -t async migrations
alembic revision --autogenerate -m "add orders.total_cents"
alembic upgrade head
alembic current
alembic history --verbose
alembic downgrade -1
alembic upgrade head --sql > upgrade.sql`,
          try: R`اعمل [[alembic init -t async migrations]]، وفي [[migrations/env.py]] خلّي [[target_metadata = Base.metadata]] والـ URL جاي من الإعدادات. ضيف عمود للـ model، واعمل autogenerate، وافتح الملف اللي اتعمل واقراه قبل [[upgrade]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** رتّب الأوامر دي لـ «زوّدت عمود في model وعايزه في القاعدة»: [[upgrade head]] و [[revision --autogenerate -m]] و [[current]] و «اقرا الملف». وإيه اللي autogenerate مبيشوفوش؟`, done: R`الترتيب: [[current]]، ثم [[revision --autogenerate]]، ثم تقرا الملف، ثم [[upgrade head]] ثم [[current]] تاني. وكتبت إنه مبيعرفش الـ rename (بيطلّعه حذف وإضافة)، وأي تعديل داتا، وحاجات زي تغيير نوع الـ enum أحيانًا.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** غيّرت [[title: Mapped[str]]] لـ [[name: Mapped[str]]] وعملت autogenerate، والجدول فيه صف. اكتب الأوامر اللي في [[upgrade()]]، وإيه اللي هيحصل لما تطبقه.`, done: R`جرّبت: الملف فيه [[op.add_column('products', sa.Column('name', sa.String(), nullable=False))]] و [[op.drop_column('products', 'title')]]، و [[upgrade]] وقع بـ [[NotNullViolationError: column "name" of relation "products" contains null values]]، و [[alembic current]] فضل على الـ revision القديم (Postgres رجّع كل حاجة).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح الـ migration اللي فوق بإيدك بـ [[op.alter_column('products', 'title', new_column_name='name')]] في [[upgrade]] والعكس في [[downgrade]]، وطبّق.`, done: R`[[upgrade head]] عدّى، و [[select id, name from products]] طلّع [[1|Tea]] (الداتا لسه موجودة)، و [[downgrade -1]] ثم [[upgrade head]] اشتغلوا من غير أخطاء.` },
            { lvl: 'تطبيق', t: R`**ابني:** migration بتزوّد عمود [[status]] إجباري لجدول فيه داتا، بـ ٣ خطوات في نفس الملف: العمود [[nullable=True]]، ثم [[op.execute("UPDATE ... SET status = 'active'")]]، ثم [[alter_column(..., nullable=False)]].`, done: R`الـ upgrade بيعدّي على جدول فيه صفوف، وكل الصفوف القديمة [[status = 'active']]، و [[\d products]] في psql بيقول [[not null]]، والـ downgrade بيشيل العمود.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[alembic --help]] و [[alembic upgrade --help]] اعرف إزاي تطبق لحد revision معين مش head، وإزاي تعمل migration فاضي من غير autogenerate، وإزاي تحل فرعين ([[merge]]).`, done: R`جربت [[alembic upgrade <rev>]] ووقفت عنده ([[current]] بيأكد)، و [[alembic revision -m "data fix"]] عمل ملف فاضي، و [[alembic merge -m "merge" <rev1> <rev2>]] عمل revision بأبين، و [[alembic heads]] بقى بيطلّع head واحد.` },
          ],
          deep: {
            why: R`[[create_all]] بيعمل الجداول لو مش موجودة بس، ومبيعدّلش جدول موجود. ومن غير migrations، كل تغيير بيتعمل بإيدك على السيرفر، ومحدش عارف القاعدة في الإنتاج شكلها إيه.`,
            how: R`[[alembic init -t async]] بيعمل [[alembic.ini]] وفولدر فيه [[env.py]] جاهز لـ engine async. في [[env.py]] بتربط [[target_metadata]] بـ [[Base.metadata]] عشان autogenerate يعرف الـ models، وتقرا الـ URL من الإعدادات بدل ما يتكتب في alembic.ini.

كل migration ليه [[revision]] و [[down_revision]]، فالملفات سلسلة. و Alembic بيسجّل آخر واحد اتطبق في جدول [[alembic_version]]، و [[upgrade head]] بيطبق كل اللي بعده بالترتيب.

autogenerate بيلقط الجداول والأعمدة والـ indexes والـ foreign keys، بس مش كل حاجة: تغيير اسم عمود بيطلع drop و add (والداتا تضيع!)، وبعض تغييرات الأنواع والـ constraints بتفوته. عشان كده الملف لازم يتقري ويتعدّل قبل ما يتعمله commit.

[[--sql]] (offline mode) بيطلّع الـ SQL من غير ما ينفّذه، تراجعه أو تديه للـ DBA.

وفي الديبلوي: [[alembic upgrade head]] خطوة قبل ما الـ containers الجديدة تقوم (job منفصل أو أمر في الـ entrypoint)، مش جوه التطبيق وكل worker بيحاول يعملها. والتغييرات الكاسرة (مسح عمود بيستخدمه الكود القديم) بتتعمل على مرحلتين: expand وبعدين contract. التفاصيل في «تغييرات آمنة في الإنتاج» في تاب PostgreSQL.`,
            when: "أي مشروع فيه قاعدة بيانات هتعيش أكتر من أسبوع.",
            mistakes: R`تعدّل migration اتطبق خلاص على الإنتاج بدل ما تعمل واحد جديد. وتعمل commit لـ autogenerate من غير ما تقراه (الـ rename بقى drop). واتنين في الفريق عملوا migration من نفس النقطة فبقى فيه اتنين head ([[alembic heads]]، والحل [[alembic merge]]). و [[downgrade]] على الإنتاج بيمسح داتا.`
          },
          teach: R`## المثال بيعمل إيه؟

٨ أوامر هي دورة حياة الـ migrations كلها: تسطّب Alembic، وتعمل فولدر الـ migrations، وتولّد migration من الفرق بين الـ models والقاعدة، وتطبّقه، وتشوف القاعدة واقفة فين، وتشوف السلسلة، وترجع خطوة، وتطلّع الـ SQL من غير ما تنفّذه.

اتشغّل فعلًا بـ Alembic 1.20 و SQLAlchemy 2.1 على ويندوز (Git Bash، ونفس الأوامر في PowerShell)، على Postgres 18 في Docker، بمشروع فيه [[app/models.py]] (نفس [[User]] و [[Order]] بتوع الدرس اللي فات، و [[Order]] لسه من غير [[total_cents]]).

---

## ١. [[pip install alembic]] و [[alembic init -t async migrations]]

- [[init]]: اعمل هيكل الـ migrations.
- [[-t async]]: [[-t]] = template، و [[async]] قالب بيستخدم [[async_engine_from_config]]، عشان الـ URL بتاعنا فيه [[+asyncpg]].
- [[migrations]]: اسم الفولدر (ممكن أي اسم).

~~~text الناتج (مختصر)
Creating directory ...\migrations ...  done
Creating directory ...\migrations\versions ...  done
Generating ...\alembic.ini ...  done
Generating ...\migrations\env.py ...  done
Generating ...\migrations\README ...  done
Generating ...\migrations\script.py.mako ...  done
Please edit configuration/connection/logging settings in ...\alembic.ini before proceeding.
~~~

| الملف | فيه إيه |
|---|---|
| [[alembic.ini]] | إعدادات: مكان الفولدر، واللوج، و [[sqlalchemy.url]] (فيه placeholder: [[driver://user:pass@localhost/dbname]]) |
| [[migrations/env.py]] | الكود اللي بيشتغل مع كل أمر: بيوصل للقاعدة ويشغّل الـ migrations |
| [[migrations/script.py.mako]] | القالب اللي كل migration جديد بيتعمل منه |
| [[migrations/versions/]] | الـ migrations نفسها، ملف لكل تغيير |

### تعديل [[env.py]]

فيه سطر [[target_metadata = None]]. غيّرناه كده:

~~~python
import os
from app.models import Base
target_metadata = Base.metadata
config.set_main_option("sqlalchemy.url", os.environ["DATABASE_URL"])
~~~

- [[Base.metadata]]: وصف كل الجداول اللي في الـ models. من غيره الـ autogenerate ميعرفش الـ models شكلها إيه.
- [[config.set_main_option(...)]]: بيحط الـ URL من environment variable بدل ما يتكتب في [[alembic.ini]] اللي بيتعمله commit (الباسورد مكانه مش الـ git). في مشروعك ممكن تاخده من [[settings.database_url]].

~~~bash
export DATABASE_URL="postgresql+asyncpg://app:secret@localhost:5432/shop"
~~~

وفي PowerShell: [[$env:DATABASE_URL = "postgresql+asyncpg://..."]].

---

## ٢. [[alembic revision --autogenerate -m "..."]]

أول مرة (القاعدة فاضية) عملت migration اسمه [[init]]، وطبّقته. وبعدين ضفت للـ model:

~~~python
total_cents: Mapped[int] = mapped_column(server_default="0")
~~~

~~~bash
alembic revision --autogenerate -m "add orders.total_cents"
~~~

- [[revision]]: اعمل ملف migration جديد.
- [[--autogenerate]]: اتصل بالقاعدة، وقارنها بـ [[Base.metadata]]، واكتب الفرق.
- [[-m]]: وصف، وبيدخل في اسم الملف.

~~~text الناتج (مختصر)
INFO  [alembic.ddl.postgresql] Detected sequence named 'orders_id_seq' as owned by integer column 'orders(id)', assuming SERIAL and omitting
INFO  [alembic.autogenerate.compare.tables] Detected added column 'orders.total_cents'
Generating ...\migrations\versions\b281c5a76622_add_orders_total_cents.py ...  done
~~~

سطر الـ sequence معلومة بس: Alembic فهم إن الـ id serial ومش هيعمل له حاجة. والمهم [[Detected added column]]. والملف اللي اتعمل:

~~~python
revision: str = 'b281c5a76622'
down_revision: Union[str, Sequence[str], None] = '67b46188e741'
def upgrade() -> None:
    op.add_column('orders', sa.Column('total_cents', sa.Integer(), server_default='0', nullable=False))
def downgrade() -> None:
    op.drop_column('orders', 'total_cents')
~~~

- [[revision]]: id الـ migration ده (عشوائي، ١٢ حرف hex).
- [[down_revision]]: الـ migration اللي قبله ([[init]]). كده الملفات بتعمل سلسلة.
- [[upgrade()]]: التغيير. [[op.add_column]] = [[ALTER TABLE orders ADD COLUMN ...]].
- [[downgrade()]]: العكس.
- [[server_default='0']]: مهم: الجدول فيه صفوف، والعمود [[NOT NULL]]، فالصفوف القديمة لازم تاخد قيمة. من غيره الـ upgrade كان هيفشل.

**اقرا الملف قبل ما تطبّقه.** جربت أعمل جدول [[legacy_stuff]] في القاعدة بإيدي (مش في الـ models) وعملت autogenerate:

~~~text الناتج
INFO  [alembic.autogenerate.compare.tables] Detected removed table 'legacy_stuff'
~~~

يعني الملف كان هيبقى فيه [[op.drop_table('legacy_stuff')]]، والجدول وداتاه يروحوا. وتغيير اسم عمود بيطلع drop و add (الداتا تضيع) مش rename.

---

## ٣. [[alembic upgrade head]]

[[head]] = آخر migration في السلسلة. بيطبّق كل اللي لسه متطبقش، بالترتيب:

~~~text الناتج
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 67b46188e741 -> b281c5a76622, add orders.total_cents
~~~

- [[transactional DDL]]: Postgres بيسمح بـ [[ALTER TABLE]] جوه transaction، فلو migration وقع في النص كله يرجع.
- الصف اللي كان موجود في [[orders]] بقى [[total_cents = 0]] من الـ [[server_default]].

Alembic بيسجّل هو واقف فين في جدول اسمه [[alembic_version]]:

~~~text SELECT * FROM alembic_version
 version_num
--------------
 b281c5a76622
~~~

---

## ٤. [[alembic current]] و [[alembic history --verbose]]

~~~text alembic current
b281c5a76622 (head)
~~~

القاعدة على [[b281c5a76622]]، و [[(head)]] يعني ده آخر واحد. لو لقيته من غير [[(head)]] يبقى فيه migrations لسه متطبقتش.

~~~text alembic history --verbose (مختصر)
Rev: b281c5a76622 (head)
Parent: 67b46188e741
    add orders.total_cents

Rev: 67b46188e741
Parent: <base>
    init
~~~

[[<base>]] = البداية (قاعدة فاضية).

---

## ٥. [[alembic downgrade -1]]

[[-1]] = خطوة واحدة لورا. بينفّذ [[downgrade()]] بتاع آخر migration:

~~~text الناتج
INFO  [alembic.runtime.migration] Running downgrade b281c5a76622 -> 67b46188e741, add orders.total_cents
~~~

و [[alembic current]] بقى [[67b46188e741]] من غير [[(head)]]. وعمود [[total_cents]] اتمسح **بالداتا اللي فيه**. عشان كده downgrade على الإنتاج نادر جدًا: الأسلم migration جديد بيصلّح.

---

## ٦. [[alembic upgrade head --sql > upgrade.sql]]

[[--sql]] = offline mode: اطبع الـ SQL ومتنفّذوش. و [[>]] بيحوّل الطباعة لملف. وسطور [[INFO]] بتطلع على stderr فمش بتدخل الملف.

بس خد بالك: في الـ offline mode Alembic **مش بيكلّم القاعدة**، فميعرفش هي واقفة فين، فبيطلّع السلسلة كلها من الأول ([[CREATE TABLE alembic_version]] و [[CREATE TABLE users]] ...). لو عايز الجديد بس، حدد البداية والنهاية بـ [[:]]:

~~~bash
alembic upgrade 67b46188e741:head --sql
~~~

~~~text الناتج
BEGIN;
-- Running upgrade 67b46188e741 -> b281c5a76622
ALTER TABLE orders ADD COLUMN total_cents INTEGER DEFAULT '0' NOT NULL;
UPDATE alembic_version SET version_num='b281c5a76622' WHERE alembic_version.version_num = '67b46188e741';
COMMIT;
~~~

ده بالظبط اللي [[upgrade]] هيعمله، تراجعه أو تديه للـ DBA.

> في Windows PowerShell 5.1، الـ [[>]] بيكتب الملف UTF-16 (جربتها: [[file]] قال [[UTF-16, little-endian]])، و [[psql]] مش هيعرف يقراه. في pwsh 7 بيطلع UTF-8 عادي (جربتها، والملف طلع نص عادي). فاعمل الأمر ده من pwsh 7 أو Git Bash أو cmd.

---

## السطور كلها

| الأمر | بيعمل إيه |
|---|---|
| [[alembic init -t async migrations]] | هيكل الـ migrations بقالب async |
| [[alembic revision --autogenerate -m "..."]] | ملف migration من الفرق (مسودة، اقراها) |
| [[alembic upgrade head]] | طبّق كل اللي ناقص |
| [[alembic current]] | القاعدة على أنهي revision |
| [[alembic history --verbose]] | السلسلة كلها من الأقدم للأحدث بالتاريخ والأب والرسالة |
| [[alembic downgrade -1]] | ارجع خطوة (بيمسح داتا) |
| [[alembic upgrade A:B --sql]] | الـ SQL من A لـ B من غير تنفيذ |

---

## اتشغّل فعلًا: autogenerate مبيعرفش إن ده rename

على Alembic 1.20 و SQLAlchemy 2.1 و Postgres 16 في Docker، بقالب [[-t async]]. model فيه [[title: Mapped[str]]]، عملنا migration أولاني وطبقناه، ودخّلنا صف [[Tea]]. وبعدين غيّرنا الاسم لـ [[name]]:

~~~text الناتج: alembic revision --autogenerate -m rename
INFO  [alembic.autogenerate.compare.tables] Detected added column 'products.name'
INFO  [alembic.autogenerate.compare.tables] Detected removed column 'products.title'
~~~

~~~python
def upgrade() -> None:
    op.add_column('products', sa.Column('name', sa.String(), nullable=False))
    op.drop_column('products', 'title')
~~~

~~~text الناتج: alembic upgrade head
asyncpg.exceptions.NotNullViolationError: column "name" of relation "products" contains null values
~~~

| اللي حصل | معناه |
|---|---|
| [[added column]] و [[removed column]] | Alembic شايف الفرق بين الشكلين بس، ميعرفش إن ده نفس العمود باسم جديد |
| [[NotNullViolationError]] | العمود الجديد [[NOT NULL]] والصف القديم مالوش قيمة فيه. حظ كويس: لو العمود كان يقبل NULL، الـ migration كان هيعدّي ويمسح كل العناوين في صمت |
| [[alembic current]] لسه على القديم | Postgres بيعمل الـ DDL جوه transaction، فالـ migration الفاشل مسابش حاجة نصها متغيّر |

والتصليح بإيدك في الملف:

~~~python
def upgrade() -> None:
    op.alter_column('products', 'title', new_column_name='name')
~~~

~~~text الناتج
INFO  [alembic.runtime.migration] Running upgrade f490a2bc93d9 -> 8437c2a89a80, rename
psql: select id, name from products → 1|Tea
alembic current → 8437c2a89a80 (head)
~~~

القاعدة: الـ migration اللي فيه [[drop_column]] أو [[drop_table]] اقراه مرتين قبل ما تطبقه.

## الخلاصة

- كل تغيير في الجداول = ملف migration بيتعمله commit مع الكود.
- الـ autogenerate بيكتب مسودة: اقراها، خصوصًا [[drop_table]] و [[drop_column]].
- عمود [[NOT NULL]] جديد على جدول فيه داتا محتاج [[server_default]].
- [[alembic upgrade head]] خطوة في الـ deploy قبل ما الكود الجديد يقوم.`,
          lines: [
            R`بيسطّب Alembic في الـ venv. الـ migrations كلها بتتكتب Python، وبيستخدم SQLAlchemy اللي عندك عشان يكلّم القاعدة.`,
            R`بيعمل فولدر [[migrations]] و [[alembic.ini]]، و [[-t async]] قالب [[env.py]] بيشتغل بـ engine async (asyncpg). بعدها لازم تعدّل [[env.py]]: [[target_metadata = Base.metadata]] والـ URL من الإعدادات.`,
            R`بيقارن [[Base.metadata]] بالقاعدة الحقيقية ويكتب ملف migration بالفرق. **اقراه دايمًا**: اسم عمود متغيّر بيطلع حذف وإضافة (اتجرب تحت)، يعني داتا بتضيع.`,
            R`بيطبّق كل الـ migrations اللي لسه متطبقتش بالترتيب، ويكتب آخر واحد في جدول [[alembic_version]]. في Postgres كل migration في transaction، فلو وقع مفيش نص تغيير بيفضل.`,
            R`بيطبع الـ revision اللي القاعدة واقفة عليه دلوقتي، ولو هو الأخير بيكتب جنبه [[(head)]].`,
            R`السلسلة كلها من الأقدم للأحدث، و [[--verbose]] بيزوّد التاريخ والأب والرسالة لكل واحد. مفيد لما اتنين في الفريق عملوا migrations في نفس الوقت (فرعين).`,
            R`بيشغّل [[downgrade()]] بتاع آخر migration بس. لو فيه [[drop_column]] الداتا اللي اتمسحت مش بترجع، فـ downgrade في الإنتاج آخر حل.`,
            R`[[--sql]] (offline mode) بيطبع الـ SQL من غير ما يتصل بالقاعدة، و [[>]] بيحفظه في ملف. الـ DBA يراجعه، أو تطبقه بإيدك في نافذة صيانة.`,
          ],
          sol: R`[[alembic init -t async migrations]] بيعمل [[alembic.ini]] وفولدر [[migrations/]] فيه [[env.py]] و [[versions/]]. وفي [[env.py]] بتحط [[from app.models import Base]] و [[target_metadata = Base.metadata]] و [[config.set_main_option("sqlalchemy.url", settings.database_url)]]. بعد ما تضيف [[total_cents: Mapped[int] = mapped_column(server_default="0")]]، الـ autogenerate بيطبع [[Detected added column 'orders.total_cents']] ويعمل ملف في [[versions/]] فيه [[revision]] و [[down_revision]] (اللي قبله)، و [[upgrade()]] فيها [[op.add_column('orders', sa.Column('total_cents', sa.Integer(), server_default='0', nullable=False))]]، و [[downgrade()]] فيها [[op.drop_column]]. وبعد [[upgrade head]]، [[alembic current]] بيطبع الـ revision ومعاه [[(head)]].

ليه تقراه قبل [[upgrade]]؟ لو القاعدة فيها جداول مش في الـ models، الـ autogenerate هيكتب [[Detected removed table]] ويحط [[op.drop_table]] في الملف، وفي تجربتنا ده حصل فعلًا. وكمان تغيير اسم عمود بيطلع drop و add (يعني البيانات تضيع)، مش rename. ولو ضفت عمود NOT NULL من غير [[server_default]] على جدول فيه صفوف، الـ upgrade هيفشل. الملف اللي اتولّد مسودة، مش حاجة تشغّلها من غير ما تبص فيها.`
        },
        {
          cmd: "N+1 و pagination",
          title: "تعدّ الـ queries، وتقسّم النتايج من غير OFFSET",
          learn: R`تكتشف N+1 بعدّ الـ queries الحقيقية، وتصلّحه بـ [[selectinload]] أو [[joinedload]]، وتعمل pagination بالـ cursor ([[WHERE id > X]]) بدل [[OFFSET]].`,
          out: R`قايمة بتعمل ٢ queries مهما كان حجم الصفحة، وصفحة رقم ٤٥ ألف بتاخد نفس وقت الصفحة الأولى.`,
          use: {
            prog: R`أي endpoint بيرجّع list فيها حاجة من جدول تاني (الطلب وصاحبه، المنتج وقسمه) معرّض لـ N+1.`,
            work: R`«الصفحة بطيئة» في الإنتاج غالبًا واحدة من الاتنين دول: query لكل صف، أو [[OFFSET]] كبير. والاتنين بيبانوا بعدّ الـ queries و [[EXPLAIN ANALYZE]].`,
            cs: R`N+1 عدد رحلات الشبكة بيكبر مع عدد الصفوف. و [[OFFSET N]] القاعدة لازم تمشي على N صف وترميهم، أما [[WHERE id > X]] الـ index بيوصل لـ X على طول.`,
          },
          desc: R`**N+1** يعني query واحدة للقايمة، وبعدها query لكل عنصر فيها عشان تجيب حاجة مربوطة بيه: ٢٠ طلب = ٢١ query. الحل إنك تحمّل العلاقة مقدمًا: [[selectinload(Order.user)]] بيعمل query تانية واحدة بـ [[IN]]، و [[joinedload]] بيعمل [[JOIN]] في نفس الـ query.

والـ **pagination** بـ [[LIMIT 20 OFFSET 900000]] بيخلي Postgres يقرا ٩٠٠ ألف صف ويرميهم، ولو اتضاف صف وانت بتقلّب بيتكرر عنصر بين صفحتين. الأحسن الـ **cursor** (اسمه كمان keyset): [[WHERE id > :after ORDER BY id LIMIT 21]]، والرد فيه [[next_cursor]] = آخر id، وبتجيب [[limit + 1]] عشان تعرف فيه صفحة بعدها ولا لأ.

المثال endpoint بيعمل الاتنين على SQLAlchemy 2.0 async و Postgres، بالـ models بتاعة درس «SQLAlchemy async» (ومعاها [[User.orders]] و [[back_populates]]).`,
          example: R`from typing import Annotated
from fastapi import Depends, FastAPI, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.db import Order, SessionLocal
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
class OrderOut(BaseModel):
    id: int
    total_cents: int
    email: str
class OrderPage(BaseModel):
    items: list[OrderOut]
    next_cursor: int | None
app = FastAPI()
@app.get("/orders", response_model=OrderPage)
async def list_orders(session: SessionDep, after: Annotated[int, Query(ge=0)] = 0, limit: Annotated[int, Query(ge=1, le=100)] = 20):
    stmt = select(Order).where(Order.id > after).order_by(Order.id).limit(limit + 1).options(selectinload(Order.user))
    rows = list(await session.scalars(stmt))
    page = rows[:limit]
    items = [OrderOut(id=o.id, total_cents=o.total_cents, email=o.user.email) for o in page]
    return {"items": items, "next_cursor": page[-1].id if len(rows) > limit else None}`,
          try: R`شغّل Postgres في Docker ودخّل ٥٠ مستخدم و ٢٠٠ طلب. ضيف عداد queries بـ [[event.listens_for(engine.sync_engine, "before_cursor_execute")]]، واطلب [[/orders?limit=3]] ثم [[/orders?after=3&limit=2]] ثم [[/orders?after=199]]. وبعدين شيل [[selectinload]] وشوف اللي بيحصل.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب لكل حالة هتستخدم إيه: طلب وصاحبه (many-to-one)، ومستخدم وكل طلباته (one-to-many)، وطلب وصاحبه وعنوان صاحبه. و [[OFFSET]] ولا cursor لـ «صفحة ٣ من ٥ في لوحة أدمن» ولـ «scroll لا نهائي في تطبيق».`, done: R`كتبت [[joinedload]] أو [[selectinload]] للأولى، و [[selectinload]] للتانية (الـ JOIN بيكرر صف المستخدم مع كل طلب)، و [[selectinload(Order.user).selectinload(User.address)]] للتالتة. و OFFSET مقبول للوحة أدمن صغيرة فيها أرقام صفحات، والـ cursor للـ scroll.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** loop على ٢٠ طلب و [[await o.awaitable_attrs.user]] لكل واحد. كام query؟ ونفس الكلام بـ [[selectinload]]؟ وبـ [[joinedload]]؟`, done: R`جرّبت بالعداد: ٢١ و ٢ و ١ بالظبط، وكتبت إن [[joinedload]] query واحدة بس أتقل لو العلاقة one-to-many، وإن [[selectinload]] الافتراضي الآمن.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** endpoint بيرجّع الطلبات بـ [[for o in orders: email = (await session.get(User, o.user_id)).email]]. قيس عدد الـ queries، وصلّحه، وخلّي أي lazy load يرمي بدري بـ [[raiseload("*")]].`, done: R`قبل: ٢١ query لـ ٢٠ طلب (أو أقل لو مستخدمين متكررين، لأن [[session.get]] بيدوّر في الـ identity map الأول)، وبعد: ٢. و [[raiseload("*")]] بيرمي [[InvalidRequestError]] و [['Order.user' is not available due to lazy='raise']] لو حد نسي الـ option.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** جدول [[events]] فيه مليون صف. قيس بـ [[EXPLAIN ANALYZE]] تلات مرات: [[OFFSET 0]] و [[OFFSET 900000]] و [[WHERE id > 900000]]، وكلهم [[LIMIT 20]].`, done: R`عندك ٩ أرقام حقيقية (على الجهاز ده: حوالي ٠.١ و ١٤٠–٢٢٠ و ٠.١ مللي ثانية)، والنسبة مكتوبة، و [[EXPLAIN]] بيوري إن الـ cursor بيستخدم [[Index Scan]] ويقف بعد ٢٠ صف.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبار بيمشي على كل الصفحات بـ [[next_cursor]] لحد [[None]] ويتأكد إن كل طلب ظهر مرة واحدة، وفي النص بيدخّل طلب جديد. ونفس الاختبار بنسخة OFFSET بترتيب [[id DESC]] بيفشل ليه؟`, done: R`نسخة الـ cursor بتعدّي، ونسخة الـ OFFSET بتلاقي id متكرر (في التجربة [[198]] ظهر في الصفحة الأولى والتانية بعد ما اتضاف صف)، والاختبار بيطبع الـ id ده.` },
          ],
          deep: {
            why: R`الـ N+1 والـ OFFSET الكبير مبيبانوش على جهازك بـ ٢٠ صف وقاعدة محلية: ٢١ query في ٣ مللي ثانية لكل واحدة لسه أقل من ١٠٠ مللي. وفي الإنتاج بـ ١٠٠ صف في الصفحة وقاعدة على سيرفر تاني، ومليون صف، نفس الـ endpoint بياخد ثواني. القياس بعدّ الـ queries هو اللي بيمسكها قبل ما توصل.`,
            how: R`**التحميل:** [[selectinload(Order.user)]] بعد الـ query الأولى بيجمع كل [[user_id]] اللي طلعت ويبعت [[SELECT ... FROM users WHERE users.id IN (...)]] مرة واحدة، وبيربط كل طلب بصاحبه في الذاكرة. و [[joinedload]] بيضيف [[LEFT OUTER JOIN users]] للـ query نفسها، فـ query واحدة بس الصفوف أعرض، ومع one-to-many كل صف من الأب بيتكرر مع كل ابن. و [[raiseload]] أو [[lazy="raise"]] على الـ relationship بيخلي أي تحميل مش مقصود يرمي exception بدل ما يبقى query خفية. وفي async أصلًا الـ lazy load العادي بيرمي [[MissingGreenlet]]، بس [[awaitable_attrs]] و [[session.get]] بيرجّعوا N+1 تاني من غير ما تحس.

**الـ cursor:** [[ORDER BY id]] لازم يبقى على عمود فريد وعليه index (الـ primary key مناسب). لو الترتيب على عمود مش فريد زي [[created_at]]، الـ cursor بيبقى الاتنين: [[WHERE (created_at, id) > (:c, :i) ORDER BY created_at, id]]، و Postgres بيقارن الـ tuple بالترتيب. و [[limit + 1]] بيقولك فيه صفحة بعد كده من غير [[count(*)]] (اللي هي نفسها بطيئة على مليون صف).`,
            when: R`[[selectinload]] الافتراضي لأي علاقة بتظهر في الرد، و [[joinedload]] لعلاقة many-to-one صغيرة لو عايز query واحدة. والـ cursor لأي list ممكن تكبر أو بتتعرض scroll. و OFFSET مقبول لجداول صغيرة أو لوحة أدمن محتاجة «صفحة ٧».`,
            mistakes: R`تحط [[selectinload]] على علاقة مش بتظهر في الرد (query زيادة على الفاضي). أو [[joinedload]] على one-to-many مع [[LIMIT]]: الـ LIMIT بيتطبق على الصفوف بعد الـ JOIN. أو الـ cursor على [[created_at]] لوحده وفيه صفين بنفس الوقت (واحد بيضيع). أو ترجّع [[total]] بـ [[count(*)]] مع كل صفحة على جدول كبير. أو [[limit]] من غير [[le]] في الـ Query.`
          },
          teach: R`## المثال بيعمل إيه؟

endpoint [[GET /orders]] بيرجّع صفحة طلبات، ومع كل طلب إيميل صاحبه من جدول [[users]]. بيعمل **٢ queries بس** مهما كان حجم الصفحة، وبيقسّم بالـ cursor: [[?after=]] آخر id شفته، والرد فيه [[next_cursor]]. اتجرب على SQLAlchemy 2.1 و asyncpg 0.32 و FastAPI 0.162 و Postgres 16 في Docker، وفيه ٥٠ مستخدم و ٢٠٠ طلب.

---

## ١. نعدّ الـ queries

من غير عداد، N+1 مش بيبان. SQLAlchemy بيدّيك event قبل أي query تتبعت:

~~~python
QUERIES = []
@event.listens_for(engine.sync_engine, "before_cursor_execute")
def count(conn, cursor, statement, params, context, executemany):
    QUERIES.append(statement.split()[0])
~~~

- [[engine.sync_engine]]: الـ events بتتسجّل على الـ engine الـ sync اللي جوه الـ async.
- [[before_cursor_execute]]: بيتنادى مرة لكل SQL رايح للقاعدة، فطول [[QUERIES]] = عدد الـ queries.
- [[statement.split()[0]]]: أول كلمة ([[SELECT]] أو [[INSERT]]) عشان الناتج يتقري.

## ٢. N+1 بعينك

~~~text الناتج (٢٠ طلب، وفي كل حالة عدّ الـ queries)
orders[0].user.email من غير تحميل     → MissingGreenlet greenlet_spawn has not been called; can't call await_() here.
await o.awaitable_attrs.user في loop  → 21 query
selectinload(Order.user)              → ['SELECT', 'SELECT']   2 query
joinedload(Order.user)                → ['SELECT']             1 query
User.orders بـ selectinload (10 مستخدمين، 40 طلب) → ['SELECT', 'SELECT']
raiseload("*") ثم o.user              → InvalidRequestError 'Order.user' is not available due to lazy='raise'
~~~

| الطريقة | عدد الـ queries | إمتى |
|---|---|---|
| lazy في async | خطأ [[MissingGreenlet]] | مش بتحصل بالصدفة، وده كويس |
| [[awaitable_attrs]] أو [[session.get]] في loop | ١ + عدد الصفوف | ده الـ N+1 اللي بيعدّي في async من غير خطأ |
| [[selectinload]] | ٢ | الافتراضي: الأب في query، والعلاقة كلها في query بـ [[IN]] |
| [[joinedload]] | ١ | many-to-one صغيرة. مع one-to-many الصفوف بتتكرر |
| [[raiseload("*")]] | خطأ لو حد نسي | في الـ repositories عشان أي تحميل مش مقصود يبان |

---

## ٣. الـ endpoint

~~~python
@app.get("/orders", response_model=OrderPage)
async def list_orders(session: SessionDep, after: Annotated[int, Query(ge=0)] = 0, limit: Annotated[int, Query(ge=1, le=100)] = 20):
~~~

- [[after]]: آخر id العميل شافه. [[0]] يعني من الأول، و [[ge=0]] بيرفض السالب.
- [[limit]]: من ١ لـ ١٠٠. الـ [[le=100]] هو اللي بيمنع حد يطلب كل الجدول.

~~~python
stmt = select(Order).where(Order.id > after).order_by(Order.id).limit(limit + 1).options(selectinload(Order.user))
~~~

| الحتة | الـ SQL | ليه |
|---|---|---|
| [[.where(Order.id > after)]] | [[WHERE orders.id > $1]] | بدل [[OFFSET]]: الـ index بيوصل للـ id ده على طول |
| [[.order_by(Order.id)]] | [[ORDER BY orders.id]] | الـ cursor لازم يبقى نفس عمود الترتيب، وفريد |
| [[.limit(limit + 1)]] | [[LIMIT $2]] | صف زيادة: لو جه، يبقى فيه صفحة بعد دي |
| [[selectinload(Order.user)]] | query تانية بـ [[IN]] | الإيميل من غير N+1 |

~~~python
rows = list(await session.scalars(stmt))
page = rows[:limit]
items = [OrderOut(id=o.id, total_cents=o.total_cents, email=o.user.email) for o in page]
return {"items": items, "next_cursor": page[-1].id if len(rows) > limit else None}
~~~

- [[rows[:limit]]]: بنشيل الصف الزيادة من الرد.
- [[o.user.email]]: مفيش query هنا، المستخدم اتحمّل خلاص.
- [[next_cursor]]: آخر id في الصفحة لو فيه صفحة بعدها، وإلا [[None]].

---

## ٤. اتشغّل فعلًا

~~~text الناتج
GET /orders?limit=3          → 200 {"items":[{"id":1,...,"email":"u2@example.com"},{"id":2,...},{"id":3,...}],"next_cursor":3}   queries: 2
GET /orders?after=3&limit=2  → {"items":[{"id":4,...},{"id":5,...}],"next_cursor":5}
GET /orders?after=199        → {"items":[{"id":200,...,"email":"u1@example.com"}],"next_cursor":null}
GET /orders?after=-1         → 422
GET /orders?limit=100        → queries: 2
~~~

[[limit=3]] و [[limit=100]] الاتنين ٢ queries. والصفحة الأخيرة [[next_cursor: null]] فالـ frontend يبطّل يطلب.

---

## ٥. OFFSET على مليون صف

جدول [[events]] فيه مليون صف و primary key، و [[EXPLAIN ANALYZE]] ٣ مرات لكل واحد:

~~~text الناتج (Execution Time)
LIMIT 20 OFFSET 0              → 0.181  0.093  0.136 ms
LIMIT 20 OFFSET 900000         → 221.160  190.867  139.790 ms
WHERE id > 900000 LIMIT 20     → 0.304  0.123  0.115 ms
~~~

OFFSET كبير أبطأ أكتر من ألف مرة، لأن Postgres بيمشي على ٩٠٠ ألف صف في الـ index عشان يعدّيهم. والـ cursor بيروح للـ id على طول.

### وكمان OFFSET بيكرر

الترتيب من الأحدث، صفحة أولى، وبعدين اتضاف طلب، وبعدين صفحة تانية:

~~~text الناتج
OFFSET 0 LIMIT 3            → 200,199,198
INSERT طلب جديد
OFFSET 3 LIMIT 3            → 198,197,196      ← 198 ظهر مرتين
WHERE id < 198 LIMIT 3      → 197,196,195      ← الـ cursor مكمّل صح
~~~

## الخلاصة

- عدّ الـ queries في الاختبارات بـ [[before_cursor_execute]]، و N+1 بيبان رقم.
- [[selectinload]] لأي علاقة في الرد، و [[raiseload("*")]] عشان المنسي يرمي.
- الـ pagination بالـ cursor: [[WHERE id > after ORDER BY id LIMIT limit + 1]] و [[next_cursor]]، و [[le=100]] على الـ limit دايمًا.
- OFFSET بس للجداول الصغيرة أو لوحة أدمن محتاجة أرقام صفحات.`,
          lines: [
            R`[[Annotated]] عشان [[SessionDep]] وقيود الـ query في سطر واحد مع النوع.`,
            R`[[Depends]] للـ session، و [[Query]] لقيود [[after]] و [[limit]]، و [[FastAPI]] للتطبيق.`,
            R`[[BaseModel]] لموديلات الرد: عنصر في القايمة، والصفحة كلها.`,
            R`[[select]] لبناء الـ SELECT بأسلوب 2.0.`,
            R`[[AsyncSession]] النوع اللي الـ dependency بترجّعه.`,
            R`[[selectinload]] بيحمّل العلاقة في query تانية واحدة بـ [[IN]]، وده تصليح الـ N+1.`,
            R`الـ model والمصنع من ملف القاعدة بتاع درس «SQLAlchemy async». [[Order.user]] لازم يبقى [[relationship]].`,
            R`dependency بـ yield: session لكل طلب. القراية مش محتاجة commit.`,
            R`[[async with]] بيقفل الـ session ويرجّع الاتصال للـ pool بعد الرد.`,
            R`بيدّي الـ session للـ route.`,
            R`النوع الجاهز للـ routes.`,
            R`شكل الطلب الواحد في الرد: حقول من [[orders]] والإيميل من [[users]].`,
            R`رقم الطلب، وهو كمان اللي بيبقى الـ cursor.`,
            R`المبلغ بالقروش [[int]]، عشان مفيش تقريب float في الفلوس.`,
            R`إيميل صاحب الطلب. ده الحقل اللي كان بيعمل N+1 من غير [[selectinload]].`,
            R`شكل الصفحة كلها: العناصر، والـ cursor للصفحة الجاية.`,
            R`[[list[OrderOut]]] العناصر، ومتحددة بالـ [[limit]].`,
            R`آخر id في الصفحة لو فيه صفحة بعدها، أو [[None]] لو دي الأخيرة. [[None]] بتطلع [[null]] في JSON.`,
            R`التطبيق، وعليه route واحد للقايمة.`,
            R`[[response_model=OrderPage]] بيفحص الرد ويوثّقه، والدالة بترجّع dict عادي.`,
            R`[[after]] آخر id شافه العميل ([[ge=0]] بيرفض السالب)، و [[limit]] من ١ لـ ١٠٠ ([[le=100]] بيمنع طلب كل الجدول).`,
            R`الـ query كلها: بعد الـ cursor، بترتيب الـ id، صف زيادة عن الـ limit، والمستخدمين مقدمًا. ده [[WHERE orders.id > $1 ORDER BY orders.id LIMIT $2]] و query بـ [[IN]].`,
            R`بينفّذ الاتنين ويرجّع objects الـ [[Order]] ومعاها [[user]] متحمّل.`,
            R`بيشيل الصف الزيادة. وجوده معناه فيه صفحة بعد دي، من غير [[count(*)]].`,
            R`بيبني عناصر الرد. [[o.user.email]] مبيعملش query لأنه اتحمّل في السطر اللي فوق.`,
            R`[[next_cursor]] = آخر id لو جالنا صف زيادة، وإلا [[None]]. العميل بيبعته [[?after=]] في الطلب الجاي.`,
          ],
          sol: R`[[/orders?limit=3]] بترجع ٣ طلبات و [[next_cursor: 3]]، والعداد بيقول ٢ queries: واحدة للطلبات و واحدة للمستخدمين بـ [[IN]]. و [[/orders?after=3&limit=2]] بترجع ٤ و ٥ و [[next_cursor: 5]]، و [[/orders?after=199]] بترجع طلب ٢٠٠ بس و [[next_cursor: null]]. اتجرب على Postgres 16 في Docker و SQLAlchemy 2.1.

ولما شلت [[selectinload]]، [[o.user.email]] رمت [[MissingGreenlet: greenlet_spawn has not been called; can't call await_() here]]: SQLAlchemy حاول يجيب المستخدم وانت بتقرا attribute من غير [[await]]. ولو "صلّحتها" بـ [[await o.awaitable_attrs.user]] في loop، الخطأ بيختفي بس العداد بيبقى ٢١ query لـ ٢٠ طلب، وده N+1. التصليح الصح [[selectinload]] (٢ query) أو [[joinedload]] (١).`
        }
      ]
    }
]);
