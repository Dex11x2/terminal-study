// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "قاعدة البيانات",
      l: 3,
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

## الخلاصة

- pool واحد للتطبيق، و [[acquire]] لكل شغلانة.
- القيم دايمًا بـ [[$1]] و [[$2]]، مش f-string ولا [[%s]].
- [[dict(record)]] وبعدين Pydantic لو عايز موديل.
- list في Python = array في Postgres: [[= ANY($1::int[])]].`,
          lines: [
            "الدرايفر.",
            "موديل للنتيجة.",
            "شكل المنتج.",
            "حقل.",
            "حقل.",
            "السعر بالقروش int.",
            "دالة للتجربة (في التطبيق: الـ pool في الـ lifespan).",
            "pool: من ٢ لـ ١٠ اتصالات، وأي query أكتر من ١٠ ثواني تتلغي.",
            "خد اتصال، ويرجع للـ pool لوحده.",
            R`صفوف: الباراميترات [[$1]] و [[$2]] بتتبعت منفصلة عن الـ SQL.`,
            "كل Record لـ dict وبعدين لـ Pydantic.",
            "صف واحد أو None.",
            "قيمة واحدة.",
            R`أمر من غير نتيجة، وبيرجع string زي [[UPDATE 1]].`,
            "نفس الأمر لكذا صف.",
            "list بتتبعت كـ Postgres array.",
            "اقفل الـ pool (في التطبيق: بعد الـ yield في الـ lifespan)."
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
| [[WHERE id = $2]] | المنتج ده |
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

## الخلاصة

- أي كتابتين مرتبطين = transaction واحدة. والـ exception جوه البلوك = rollback للكل.
- نقّص المخزون في SQL بشرط ([[stock = stock - $1 WHERE stock >= $1]])، مش تقرا وتحسب في Python.
- الإيميلات والـ events من جوه transaction تتكتب في outbox، مش تتبعت.
- الـ transaction قصيرة: متعملش فيها HTTP call.`,
          lines: [
            "لـ JSON الـ event.",
            "الدرايفر.",
            "exception بتاعك.",
            "فاضي.",
            "دالة بتاخد اتصال (من الـ dependency).",
            "BEGIN، و COMMIT أو ROLLBACK حسب البلوك.",
            "UPDATE بشرط...",
            "...ينقص بس لو المخزون كفاية، ويرجّع الباقي.",
            R`الباراميترات، و [[$1]] اتستخدمت مرتين.`,
            "قفلة.",
            "مفيش صف اتعدّل = المخزون مش كفاية.",
            "exception = rollback لكل حاجة.",
            "اعمل الطلب...",
            "...ورجّع الـ id.",
            "القيم.",
            "قفلة.",
            "event في نفس الـ transaction (outbox)...",
            "...worker هيقراه ويبعته بعدين.",
            "الـ payload كـ JSON.",
            "قفلة.",
            "هنا الـ commit حصل."
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
| [[select]] | يبني SELECT |
| [[create_async_engine]] و [[AsyncSession]] و [[async_sessionmaker]] | النسخ الـ async من الـ engine والـ session ومصنعها |
| [[DeclarativeBase]] و [[Mapped]] و [[mapped_column]] | تعريف الـ models |
| [[relationship]] و [[selectinload]] | العلاقات وتحميلها |

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
| [[select(Order)]] | [[SELECT orders.id, orders.user_id, orders.total_cents FROM orders]] |
| [[.where(Order.user_id == user_id)]] | [[WHERE orders.user_id = $1]]: الـ [[==]] هنا مش بيرجّع True أو False، بيبني شرط SQL |
| [[.options(selectinload(Order.user))]] | بعد ما تجيب الطلبات، هات أصحابها في query تانية |
| [[.order_by(Order.id.desc())]] | [[ORDER BY orders.id DESC]] |
| [[.limit(20)]] | [[LIMIT $2]] |

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
| [[class X(Base)]] و [[Mapped[T]]] | جدول وأعمدته |
| [[relationship()]] | attribute بيجيب الصف المرتبط |
| [[create_async_engine(...)]] | الاتصال والـ pool، مرة واحدة |
| [[async_sessionmaker(..., expire_on_commit=False)]] | مصنع sessions مناسب لـ async |
| [[select(...).where(...).options(selectinload(...))]] | query وتحميل العلاقة مقدمًا |
| [[await session.scalars(stmt)]] | نفّذ ورجّع objects |
| [[session.add]] ثم [[await session.commit()]] | INSERT فعلي |

## الخلاصة

- في async مفيش lazy loading: [[selectinload]] أو [[joinedload]] لكل علاقة هتقراها.
- [[expire_on_commit=False]] وإلا قراية أي attribute بعد commit هتقع.
- [[echo=True]] وإنت بتطوّر عشان تشوف الـ SQL الحقيقي.
- [[create_all]] للتجربة، و Alembic للحقيقي (الدرس الجاي).`,
          lines: [
            "datetime.",
            "Annotated.",
            "Depends.",
            "أدوات الـ SQL.",
            "الحتت الـ async.",
            "الـ models والعلاقات والتحميل المسبق.",
            "أساس كل الـ models.",
            "فاضي.",
            "model للمستخدمين.",
            "اسم الجدول.",
            "primary key.",
            "string ومفيش اتنين زي بعض.",
            "القاعدة بتحط الوقت لوحدها.",
            "model للطلبات.",
            "اسم الجدول.",
            "primary key.",
            "foreign key.",
            "annotation لوحدها كفاية: عمود int مش null.",
            "علاقة: الطلب بيشاور على صاحبه.",
            "engine بدرايفر asyncpg، وجواه pool.",
            "مصنع sessions، ومبيمسحش الـ attributes بعد commit.",
            "dependency: session لكل request.",
            "افتحها، وهتتقفل لوحدها.",
            "ادّيها للـ route.",
            "النوع للـ routes.",
            "دالة repository.",
            "select بشرط، وحمّل المستخدم مقدمًا (مفيش lazy loading في async)، ورتّب، و LIMIT.",
            "نفّذ ورجّع الـ objects.",
            "إنشاء.",
            "object جديد.",
            "ضيفه للـ session.",
            "INSERT و COMMIT، والـ id و created_at بيرجعوا بـ RETURNING.",
            "رجّع."
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
| [[alembic history --verbose]] | السلسلة كلها |
| [[alembic downgrade -1]] | ارجع خطوة (بيمسح داتا) |
| [[alembic upgrade A:B --sql]] | الـ SQL من A لـ B من غير تنفيذ |

## الخلاصة

- كل تغيير في الجداول = ملف migration بيتعمله commit مع الكود.
- الـ autogenerate بيكتب مسودة: اقراها، خصوصًا [[drop_table]] و [[drop_column]].
- عمود [[NOT NULL]] جديد على جدول فيه داتا محتاج [[server_default]].
- [[alembic upgrade head]] خطوة في الـ deploy قبل ما الكود الجديد يقوم.`,
          lines: [
            "سطّب Alembic.",
            "اعمل فولدر migrations بقالب async.",
            "قارن الـ models بالقاعدة واكتب migration جديد (واقراه!).",
            "طبّق كل الـ migrations اللي لسه متطبقتش.",
            "القاعدة واقفة على أنهي revision.",
            "السلسلة كلها بالتفصيل.",
            "ارجع خطوة (بحذر: ممكن يمسح داتا).",
            "اطبع الـ SQL من غير ما تنفّذه، للمراجعة."
          ],
          sol: R`[[alembic init -t async migrations]] بيعمل [[alembic.ini]] وفولدر [[migrations/]] فيه [[env.py]] و [[versions/]]. وفي [[env.py]] بتحط [[from app.models import Base]] و [[target_metadata = Base.metadata]] و [[config.set_main_option("sqlalchemy.url", settings.database_url)]]. بعد ما تضيف [[total_cents: Mapped[int] = mapped_column(server_default="0")]]، الـ autogenerate بيطبع [[Detected added column 'orders.total_cents']] ويعمل ملف في [[versions/]] فيه [[revision]] و [[down_revision]] (اللي قبله)، و [[upgrade()]] فيها [[op.add_column('orders', sa.Column('total_cents', sa.Integer(), server_default='0', nullable=False))]]، و [[downgrade()]] فيها [[op.drop_column]]. وبعد [[upgrade head]]، [[alembic current]] بيطبع الـ revision ومعاه [[(head)]].

ليه تقراه قبل [[upgrade]]؟ لو القاعدة فيها جداول مش في الـ models، الـ autogenerate هيكتب [[Detected removed table]] ويحط [[op.drop_table]] في الملف، وفي تجربتنا ده حصل فعلًا. وكمان تغيير اسم عمود بيطلع drop و add (يعني البيانات تضيع)، مش rename. ولو ضفت عمود NOT NULL من غير [[server_default]] على جدول فيه صفوف، الـ upgrade هيفشل. الملف اللي اتولّد مسودة، مش حاجة تشغّلها من غير ما تبص فيها.`
        }
      ]
    }
]);
