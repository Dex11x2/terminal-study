// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "EF Core: الأداء والـ transactions",
      l: 2,
      n: "N+1 و Include، و AsNoTracking، و SaveChanges كـ transaction، و ExecuteUpdate",
      items: [
        {
          cmd: "Include و N+1",
          title: "N+1 queries: ليه الصفحة بتعمل ١٠١ query وإزاي Include بيحلها",
          desc: R`N+1: query تجيب N عنصر، وبعدين query لكل عنصر عشان تجيب حاجة مرتبطة بيه. ١٠٠ category = ١٠١ query. في EF بيحصل لما تلف على نتيجة وتحمّل الـ navigation جوه الـ loop، أو مع lazy loading.

الحلول: [[Include(c => c.Products)]] بيجيب الاتنين في query واحدة بـ JOIN. أو الأحسن غالبًا: projection بـ [[Select]] لشكل الرد اللي محتاجه، فـ EF يعمل الـ JOIN ويجيب الأعمدة المطلوبة بس. و [[AsSplitQuery()]] لو عندك كذا Include لـ collections والـ JOIN بقى بيضرب الصفوف في بعض (cartesian explosion).`,
          example: R`var cats = await db.Categories.ToListAsync();
foreach (var c in cats)
    await db.Entry(c).Collection(x => x.Products).LoadAsync();
var withProducts = await db.Categories
    .Include(c => c.Products)
    .AsNoTracking()
    .ToListAsync();
var summary = await db.Categories
    .Select(c => new { c.Name, Count = c.Products.Count, MaxPrice = c.Products.Max(p => (decimal?)p.Price) })
    .ToListAsync();
var orders = await db.Orders
    .Include(o => o.Items).ThenInclude(i => i.Product)
    .AsSplitQuery()
    .ToListAsync();`,
          try: R`فعّل لوج [[Microsoft.EntityFrameworkCore.Database.Command]] على Information، واعمل endpoint بالنسخة الأولى (الـ loop) وعِد الـ [[Executed DbCommand]] في اللوج لـ request واحد. وبعدين بالـ Include، وبعدين بالـ projection. قارن عدد الـ queries والأعمدة.`,
          flag: "script",
          deep: {
            why: R`N+1 هو أشهر مشكلة أداء في أي ORM. على جهازك بـ ١٠ صفوف مش هتحس بيها، وفي الإنتاج بـ ١٠٠٠ صف والداتابيز على سيرفر تاني (كل query فيها round trip) الصفحة بتاخد ثواني. وسؤال انترفيو ثابت (شوف «N+1» في «تاب SQL و Prisma» و «DataLoader و N+1» في «تاب APIs متقدمة»).`,
            how: R`[[Include]] بيضيف LEFT JOIN و ORDER BY على الـ keys، و EF بيجمّع الصفوف لـ objects. [[ThenInclude]] للمستوى اللي بعده. ولو فيه أكتر من collection Include في نفس الـ query، الصفوف بتتضرب (١٠ items × ٥ payments = ٥٠ صف لكل order)، و EF بيحذرك في اللوج. [[AsSplitQuery]] بيعمل query لكل collection بدل JOIN واحد كبير.

الـ projection: [[c.Products.Count]] بيتحول subquery [[(SELECT count(*) ...)]] جوه نفس الـ SELECT. ومفيش tracking لأن النتيجة مش entities. و [[(decimal?)p.Price]] في [[Max]] عشان لو category فاضية [[MAX]] بيرجع NULL وبدون الـ cast هترمي exception.

الـ explicit loading ([[Entry(...).Collection(...).LoadAsync()]]) والـ lazy loading الاتنين بيعملوا query لكل مرة، ودول مصدر الـ N+1.`,
            when: R`projection للـ reads اللي بترجع JSON (الأغلب). [[Include]] لما محتاج الـ entities نفسها (هتعدّل فيها، أو هتبني منها domain logic). [[AsSplitQuery]] مع كذا collection. وافحص عدد الـ queries في الـ integration tests أو باللوج.`,
            mistakes: R`[[Include]] لكل حاجة «احتياطي» فتجيب نص الداتابيز. وتنسى الـ Include فالـ navigation تبقى null أو فاضية من غير error (ده أخطر من الـ exception). و lazy loading في API. وتفتكر إن Include بيفلتر: [[Include(c => c.Products.Where(p => p.Stock > 0))]] (filtered include) موجود بس بتفلتر الـ children مش الـ parents.`
          },
          teach: R`## المثال ده بيعمل إيه؟

بيجيب الـ categories ومنتجاتها بـ ٤ طرق، وكل طريقة بتعمل عدد queries مختلف: loop بتعمل query لكل category (ده الـ N+1)، و [[Include]] بيعمل query واحدة بـ JOIN، و projection بـ [[Select]] بتجيب اللي محتاجه بس، و [[AsSplitQuery]] لمستويين. كل الـ SQL هنا حقيقي من [[LogTo]] في console app بـ EF Core 10 على [[postgres:18]]، والداتا: category «Pens» فيها ٣ منتجات و «Books» فيها منتج واحد.

---

## ١. الـ N+1: loop بتحمّل

~~~csharp
var cats = await db.Categories.ToListAsync();
foreach (var c in cats)
    await db.Entry(c).Collection(x => x.Products).LoadAsync();
~~~

- [[db.Categories.ToListAsync()]]: query رقم ١: كل الـ categories، من غير منتجات.
- [[db.Entry(c)]]: «الملف» اللي EF ماسكه عن الـ object ده في الـ change tracker.
- [[.Collection(x => x.Products)]]: الـ collection navigation دي.
- [[.LoadAsync()]]: حمّلها **دلوقتي**. ده اسمه explicit loading، وكل نداء = query.

~~~text اللوج (٢ category = ٣ queries)
SELECT c."Id", c."Name"
FROM "Categories" AS c

SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."CategoryId" = @p

SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."CategoryId" = @p
~~~

الاسم من هنا: **1** query للقايمة + **N** query (واحدة لكل عنصر). ٢ category = ٣، و ١٠٠ = ١٠١. كل query رحلة رايح جاي للداتابيز (round trip)، ولو الداتابيز على سيرفر تاني كل رحلة ممكن تاخد ملي ثانية أو أكتر، فالصفحة بتبطأ مع زيادة الداتا.

---

## ٢. [[Include]]: query واحدة

~~~csharp
var withProducts = await db.Categories
    .Include(c => c.Products)
    .AsNoTracking()
    .ToListAsync();
~~~

- [[.Include(c => c.Products)]]: «وانت جايب الـ categories، هات منتجاتها معاها».
- [[.AsNoTracking()]]: مش هنعدّل حاجة، فمتسجلش النتيجة في الـ change tracker (الدرس الجاي).

~~~text اللوج
SELECT c."Id", c."Name", p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Categories" AS c
LEFT JOIN "Products" AS p ON c."Id" = p."CategoryId"
ORDER BY c."Id"
~~~

~~~text الناتج
Pens: 3
Books: 1
~~~

- [[LEFT JOIN]] مش [[INNER]]: عشان الـ category اللي مفيهاش منتجات تطلع برضه (بقايمة فاضية).
- [[ORDER BY c."Id"]]: الصفوف راجعة category مكررة مع كل منتج (Pens ٣ مرات)، فـ EF بيرتّبها عشان يجمّع صفوف نفس الـ category في object واحد.

---

## ٣. الـ projection: query واحدة وأعمدة أقل

~~~csharp
var summary = await db.Categories
    .Select(c => new { c.Name, Count = c.Products.Count, MaxPrice = c.Products.Max(p => (decimal?)p.Price) })
    .ToListAsync();
~~~

ضفنا category فاضية اسمها «Empty» عشان نشوف الـ cast بيعمل إيه.

~~~text اللوج
SELECT c."Name", (
    SELECT count(*)::int
    FROM "Products" AS p
    WHERE c."Id" = p."CategoryId") AS "Count", (
    SELECT max(p0."Price")
    FROM "Products" AS p0
    WHERE c."Id" = p0."CategoryId") AS "MaxPrice"
FROM "Categories" AS c
~~~

~~~text الناتج
{ Name = Pens, Count = 3, MaxPrice = 120.00 }
{ Name = Books, Count = 1, MaxPrice = 300.00 }
{ Name = Empty, Count = 0, MaxPrice =  }
~~~

- [[c.Products.Count]] بقى subquery [[count(*)]] جوه نفس الـ SELECT، و [[Max]] بقى subquery [[max()]]. لسه query واحدة.
- صف واحد لكل category، و ٣ قيم بس. مفيش منتجات بتتنقل خالص.

### ليه [[(decimal?)]]؟

[[max()]] في SQL على صفوف مفيش منها بيرجّع [[NULL]]. جرّبنا من غير الـ cast:

~~~csharp
db.Categories.Select(c => new { c.Name, MaxPrice = c.Products.Max(p => p.Price) })
~~~

~~~text الناتج
InvalidOperationException: Nullable object must have a value.
~~~

[[decimal]] مينفعش يشيل null، فالـ category «Empty» وقّعت الـ query كلها. [[(decimal?)p.Price]] بيخلي النوع nullable ([[?]] بعد النوع)، فالـ null يعدّي.

---

## ٤. مستويين: [[ThenInclude]] و [[AsSplitQuery]]

~~~csharp
var orders = await db.Orders
    .Include(o => o.Items).ThenInclude(i => i.Product)
    .AsSplitQuery()
    .ToListAsync();
~~~

- [[.Include(o => o.Items)]]: أصناف الأوردر.
- [[.ThenInclude(i => i.Product)]]: وجوه كل صنف، المنتج بتاعه. [[ThenInclude]] بيكمّل من آخر [[Include]].
- [[.AsSplitQuery()]]: بدل JOIN واحد كبير، query لكل collection.

~~~text اللوج
SELECT o."Id", o."CreatedAt", o."CustomerEmail"
FROM "Orders" AS o
ORDER BY o."Id"

SELECT s."Id", s."OrderId", s."ProductId", s."Quantity", s."UnitPrice", s."Id0", s."CategoryId", s."Name", s."Price", s."Sku", s."Stock", o."Id"
FROM "Orders" AS o
INNER JOIN (
    SELECT o0."Id", o0."OrderId", o0."ProductId", o0."Quantity", o0."UnitPrice", p."Id" AS "Id0", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
    FROM "OrderItem" AS o0
    INNER JOIN "Products" AS p ON o0."ProductId" = p."Id"
) AS s ON o."Id" = s."OrderId"
ORDER BY o."Id"
~~~

~~~text الناتج
orders=1 items=2 first=Blue pen
~~~

- query ١: الأوردرات بس.
- query ٢: الأصناف ومعاها المنتج (الـ Product مش collection، فاتعمله JOIN جوه نفس الـ query).
- ٢ queries ثابتين مهما كان عدد الأوردرات، مش N+1. فايدتها لما يبقى فيه أكتر من collection: JOIN واحد كان هيضرب الصفوف في بعض (١٠ items × ٥ payments = ٥٠ صف لكل أوردر).

---

## الخلاصة

| الطريقة | عدد الـ queries (٢ category) | بتجيب إيه |
|---|---|---|
| loop + [[LoadAsync]] | ٣ (N+1) | كل الأعمدة |
| [[Include]] | ١ ([[LEFT JOIN]]) | entities كاملة |
| [[Select]] projection | ١ (subqueries) | الأعمدة المطلوبة بس |
| [[Include]] + [[ThenInclude]] + [[AsSplitQuery]] | ١ لكل collection | entities كاملة |

- عِد سطور [[Executed DbCommand]] في اللوج: ده أسهل اختبار للـ N+1.
- projection للقراية، و [[Include]] لما هتشتغل على الـ entities.
- [[Max]] و [[Min]] و [[Average]] على collection ممكن تبقى فاضية: cast لـ nullable.`,
          lines: [
            "query ١: كل الـ categories.",
            "لكل واحدة...",
            "...query لمنتجاتها: N query كمان. ده الـ N+1.",
            R`query واحدة بـ [[LEFT JOIN]].`,
            R`[[Include]] للـ collection.`,
            "قراية بس، من غير tracking.",
            "تنفيذ.",
            "projection: query واحدة وأعمدة قليلة.",
            R`[[Count]] و [[Max]] بيبقوا subqueries في SQL. الـ cast لـ [[decimal?]] عشان الـ category الفاضية.`,
            "تنفيذ.",
            "مستويين.",
            R`[[Include]] ثم [[ThenInclude]] للمنتج جوه كل item.`,
            "query لكل collection بدل JOIN كبير.",
            "تنفيذ."
          ],
          sol: R`بـ ٢ category: الـ loop عمل ٣ queries ([[SELECT ... FROM "Categories"]] ثم [[SELECT ... FROM "Products" WHERE "CategoryId" = @p]] مرتين). مع ١٠٠ category هتبقى ١٠١. الـ Include عمل query واحدة: [[SELECT c."Id", c."Name", p."Id", p."CategoryId", p."Name", p."Price", p."Stock" FROM "Categories" AS c LEFT JOIN "Products" AS p ON c."Id" = p."CategoryId" ORDER BY c."Id"]]. والـ projection query واحدة برضه بس بترجع ٣ أعمدة بس لكل category وصف واحد لكل category مش صف لكل منتج.

لو عدد الـ queries في اللوج مش مطابق، اتأكد إن [[Microsoft.EntityFrameworkCore.Database.Command]] على Information، وإنك بتعد سطور [[Executed DbCommand]] للـ request ده بس (الـ background service ممكن يضيف سطور في النص). و EF مفيهوش cache للـ queries: كل [[LoadAsync]] بيروح للداتابيز.`
        },
        {
          cmd: "AsNoTracking و change tracking",
          title: "change tracking: EF بيعرف منين إنك عدّلت حاجة؟ وإمتى AsNoTracking",
          desc: R`أي entity بتتحمل من query عادية بتتسجل في الـ change tracker بتاع الـ DbContext مع نسخة من قيمها الأصلية. لما تعدّل property وتنادي [[SaveChangesAsync]]، EF بيقارن ويعمل [[UPDATE]] للأعمدة اللي اتغيرت بس. مفيش [[db.Update(p)]] ولا [[save(p)]] محتاجهم.

الـ tracking ليه تكلفة (ذاكرة ومقارنة). لو بتقرا بس عشان ترجع JSON: [[AsNoTracking()]]، أو projection بـ [[Select]] (مش بيتتبع أصلًا). وفيه [[UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)]] على الـ context كله لو أغلب شغلك قراية.

والـ entity اللي جاية من برّه (مش من query في الـ context ده) مش متتبعة: لو عدّلتها و SaveChanges مش هيحصل حاجة.`,
          example: R`var p = await db.Products.FirstAsync(p => p.Id == 1);
p.Price += 1;
var tracked = db.ChangeTracker.Entries().Count();
var state = db.Entry(p).State;
var p2 = await db.Products.AsNoTracking().FirstAsync(p => p.Id == 2);
p2.Price += 1;
var saved = await db.SaveChangesAsync();
Console.WriteLine($"{tracked} {state} {saved}");`,
          try: R`شغّل الكود ده في endpoint وبص على اللوج: كام [[UPDATE]] اتعمل وأنهي أعمدة؟ وبعدين اعمل endpoint [[PUT /api/products/{id}]] بياخد DTO ويعدّل الاسم والسعر: مرة بتحميل الـ entity وتعديلها، ومرة بـ [[ExecuteUpdateAsync]] من غير تحميل. قارن الـ SQL.`,
          flag: "script",
          deep: {
            why: R`اللي جاي من Prisma أو Mongoose متعود إن كل update صريح. في EF التعديل «السحري» ده مريح بس بيعمل مفاجآت: حاجات بتتحفظ من غير ما تقصد، أو مش بتتحفظ وانت فاكرها اتحفظت. وفي الـ reads التقيلة الـ tracking بيضيع ذاكرة ووقت على الفاضي.`,
            how: R`كل entity متتبعة ليها state: [[Unchanged]] بعد التحميل، [[Modified]] لما تتغير property، [[Added]] بعد [[Add]]، [[Deleted]] بعد [[Remove]]، [[Detached]] لو مش متتبعة. [[SaveChanges]] بيعمل [[DetectChanges]] (يقارن القيم الحالية بالـ snapshot) وبعدين يولّد الـ SQL بالترتيب ويشغّله في transaction.

الـ identity resolution: جوه نفس الـ context، نفس الصف بيرجع نفس الـ object. لو حمّلت منتج 1 مرتين هتاخد نفس الـ reference. مع [[AsNoTracking]] كل query بترجع objects جديدة (فيه [[AsNoTrackingWithIdentityResolution]] لو محتاج الاتنين).

[[db.Update(entity)]] على entity مش متتبعة بيعلّمها كلها Modified ويعمل UPDATE لكل الأعمدة، وده مقبول لو جاية كاملة، بس بيكتب فوق تغييرات حد تاني. الأدق: حمّل وعدّل، أو [[ExecuteUpdateAsync]] مباشرة.

الـ context عمره قصير (scoped = request): متخليهوش يعيش طويل لأن الـ tracker بيكبر وبيبطأ.`,
            when: R`[[AsNoTracking]] أو projection لكل الـ GET endpoints. tracking لما هتعدّل: حمّل، عدّل، [[SaveChangesAsync]]. و [[ExecuteUpdateAsync]] و [[ExecuteDeleteAsync]] لتعديلات جماعية أو بسيطة من غير ما تحتاج الـ entity (الدرس الجاي).`,
            mistakes: R`تعدّل entity اتحملت بـ [[AsNoTracking]] وتستنى الحفظ. و DbContext Singleton أو static فالـ tracker يكبر للأبد ويبقى stale. وتحمّل ١٠٠٠٠ entity بـ tracking عشان تعرضهم بس. و [[db.Update()]] على object جاي من الـ request كما هو فتكتب null فوق أعمدة الـ client مبعتهاش.`
          },
          teach: R`## المثال ده بيعمل إيه؟

بيحمّل منتجين: واحد بالطريقة العادية (متتبع) وواحد بـ [[AsNoTracking]]، ويزوّد سعر الاتنين في الذاكرة، وبعدين [[SaveChangesAsync]]. السؤال: مين اتحفظ؟ الإجابة بتشرح الـ change tracker كله. الناتج هنا حقيقي من console app بـ EF Core 10 و Npgsql على [[postgres:18]]، والـ SQL من [[LogTo]].

---

## ١. التحميل العادي: [[FirstAsync]]

~~~csharp
var p = await db.Products.FirstAsync(p => p.Id == 1);
~~~

~~~text اللوج
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."Id" = 1
LIMIT 1
~~~

- [[FirstAsync(شرط)]]: أول صف بيحقق الشرط ([[LIMIT 1]])، ولو مفيش بيرمي (لو عايز null: [[FirstOrDefaultAsync]]).
- [[1]] مكتوبة في الـ SQL لأنها ثابت في الكود. لو كانت متغير ([[id]] من الـ route) هتبقى parameter.

اللي مش باين في الـ SQL: الـ [[DbContext]] سجّل الـ object ده في الـ **change tracker**، ومعاه **snapshot**: نسخة من قيمه الأصلية زي ما جت من الداتابيز.

---

## ٢. التعديل: [[p.Price += 1]]

~~~csharp
p.Price += 1;
~~~

تعديل عادي في الذاكرة. [[+=]] يعني [[p.Price = p.Price + 1]]. مفيش SQL، و EF لسه مش عارف.

---

## ٣. نسأل الـ tracker

~~~csharp
var tracked = db.ChangeTracker.Entries().Count();
var state = db.Entry(p).State;
~~~

- [[db.ChangeTracker.Entries()]]: كل الـ entities اللي الـ context ماسكها. [[.Count()]] عددهم: [[1]].
- [[db.Entry(p).State]]: حالة الـ object ده. طلعت [[Modified]]: [[Entry()]] بيعمل مقارنة بالـ snapshot (اسمها [[DetectChanges]]) قبل ما يرد.

| الحالة | معناها |
|---|---|
| [[Unchanged]] | اتحمل ومحدش لمسه |
| [[Modified]] | property اتغيرت |
| [[Added]] | [[Add]] ولسه متحفظش |
| [[Deleted]] | [[Remove]] ولسه متحفظش |
| [[Detached]] | الـ context مش ماسكه خالص |

---

## ٤. [[AsNoTracking()]]

~~~csharp
var p2 = await db.Products.AsNoTracking().FirstAsync(p => p.Id == 2);
p2.Price += 1;
~~~

نفس الـ SQL بالظبط (بـ [[WHERE p."Id" = 2]]). الفرق كله في C#: الـ object مش متسجل. سألنا عن حالته:

~~~text الناتج
p2 state: Detached
~~~

يعني التعديل ده EF مش شايفه ومش هيحفظه.

---

## ٥. [[SaveChangesAsync()]]

~~~csharp
var saved = await db.SaveChangesAsync();
Console.WriteLine($"{tracked} {state} {saved}");
~~~

~~~text اللوج
Executed DbCommand (3ms) [Parameters=[@p1='?' (DbType = Int32), @p0='?' (DbType = Decimal)], ...]
UPDATE "Products" SET "Price" = @p0
WHERE "Id" = @p1;
~~~

~~~text الناتج
1 Modified 1
~~~

- UPDATE واحد بس، للمنتج 1 بس، وعمود [[Price]] بس (مش كل الأعمدة). EF قارن كل property بالـ snapshot ولقى دي بس اللي اتغيرت.
- [[saved]] = [[1]]: عدد الصفوف اللي اتأثرت.
- المنتج 2 متحفظش، من غير أي error. دي أخطر حتة: الكود شكله صح.
- [[$"..."]]: string interpolation، و [[{tracked}]] بيتحط مكانه القيمة.

---

## ٦. الـ identity resolution

~~~csharp
var a = await db.Products.FirstAsync(x => x.Id == 1);
var b = await db.Products.FirstAsync(x => x.Id == 1);
var c = await db.Products.AsNoTracking().FirstAsync(x => x.Id == 1);
Console.WriteLine($"{ReferenceEquals(a, b)} {ReferenceEquals(a, c)} {(int)state}");
~~~

~~~text الناتج
True False 3
~~~

- اللوج فيه ٣ SELECTs: الـ tracking مش cache، كل query بتروح للداتابيز.
- بس [[a]] و [[b]] **نفس الـ object** ([[ReferenceEquals]] بيقارن العنوان في الذاكرة): EF لقى الصف ده متتبع، فرجّع الـ object اللي عنده بدل ما يعمل واحد جديد.
- [[c]] من [[AsNoTracking]]: object جديد.
- [[(int)state]] = [[3]]: [[Modified]] كرقم. عشان كده لو رجّعت الـ state في JSON هتلاقي [[3]] مش الاسم.

---

## ٧. التعديل من غير تحميل: [[ExecuteUpdateAsync]]

ده الجزء التاني من التجربة (الـ PUT):

~~~csharp
var rows = await db.Products.Where(x => x.Id == 2)
    .ExecuteUpdateAsync(s => s.SetProperty(x => x.Name, "Red pen 2").SetProperty(x => x.Price, 7m));
~~~

~~~text اللوج
UPDATE "Products" AS p
SET "Name" = @p,
    "Price" = @p1
WHERE p."Id" = 2
~~~

~~~text الناتج
rows=1
~~~

- query واحدة: من غير SELECT، ومن غير tracker، ومن غير [[SaveChanges]].
- [[SetProperty(عمود, قيمة)]]: لكل عمود عايز تغيّره.
- بيرجّع عدد الصفوف: لو [[0]] يبقى المنتج مش موجود، ترجع 404.

---

## الخلاصة

| | متتبع (عادي) | [[AsNoTracking]] | [[ExecuteUpdateAsync]] |
|---|---|---|---|
| التعديل بيتحفظ بـ [[SaveChanges]] | أيوه، الأعمدة المتغيرة بس | لأ، بهدوء | مش محتاج SaveChanges |
| نفس الصف = نفس الـ object | أيوه | لأ | مفيش objects |
| استخدمه في | حمّل، عدّل، احفظ | الـ GET | تعديل بسيط أو جماعي |

- مفيش [[db.Update(p)]] محتاجه لـ entity متتبعة.
- entity جاية من [[AsNoTracking]] أو من برّه الـ context = [[Detached]].`,
          lines: [
            "query عادية: الـ entity متتبعة.",
            R`تعديل في الذاكرة. الحالة بقت [[Modified]].`,
            R`[[1]]: entity واحدة في الـ tracker.`,
            R`[[Modified]].`,
            R`[[AsNoTracking]]: مش متتبعة.`,
            "التعديل ده EF مش شايفه.",
            R`[[1]]: UPDATE واحد بس، للمنتج 1، لعمود [[Price]] بس.`,
            R`[[1 Modified 1]].`
          ],
          sol: R`اللوج فيه [[UPDATE]] واحد: [[UPDATE "Products" SET "Price" = @p0 WHERE "Id" = @p1;]] للمنتج 1 بس، وعمود [[Price]] بس، والـ endpoint رجّع [[{"tracked":1,"state":3,"saved":1}]] (الـ [[3]] هو [[EntityState.Modified]]: الـ enum بيطلع رقم في JSON افتراضيًا، ولو عايز الاسم رجّع [[state.ToString()]]). المنتج 2 اتعدّل في الذاكرة بس ومحدش حفظه.

الـ PUT بالتحميل: [[SELECT ... WHERE "Id" = @id LIMIT 1]] ثم [[UPDATE "Products" SET "Name" = @p0, "Price" = @p1 WHERE "Id" = @p2]] (لو القيم اتغيرت فعلًا؛ لو بعت نفس القيم مفيش UPDATE خالص). بـ [[ExecuteUpdateAsync(s => s.SetProperty(p => p.Name, dto.Name).SetProperty(p => p.Price, dto.Price))]] query واحدة [[UPDATE "Products" AS p SET "Name" = @p, "Price" = @p0 WHERE p."Id" = @id]]، وبترجع عدد الصفوف، فلو 0 ترجع 404.`
        },
        {
          cmd: "transactions و ExecuteUpdate",
          title: "SaveChanges و BeginTransaction و ExecuteUpdate: عمليات لازم تنجح كلها أو تفشل كلها",
          desc: R`[[SaveChangesAsync]] لوحده transaction: كل الـ INSERT و UPDATE اللي فيه بينجحوا مع بعض أو يترجعوا مع بعض. فأغلب الوقت مش محتاج أكتر من إنك تعمل كل تعديلاتك وتنادي SaveChanges مرة واحدة.

لو محتاج كذا SaveChanges أو SQL خام في نفس العملية: [[await using var tx = await db.Database.BeginTransactionAsync()]] وفي الآخر [[CommitAsync]]. لو حصل exception قبل الـ commit، الـ [[using]] بيعمل rollback لوحده.

[[ExecuteUpdateAsync]] و [[ExecuteDeleteAsync]] (من EF Core 7) بيعملوا UPDATE أو DELETE مباشر في SQL من غير تحميل entities ومن غير change tracker. أسرع بكتير للعمليات الجماعية، بس مش بيعدّوا على [[SaveChanges]] فمحتاجين transaction صريحة لو معاهم حاجة تانية.`,
          example: R`public async Task<OrderSummary> PlaceAsync(PlaceOrder cmd, CancellationToken ct)
{
    await using var tx = await db.Database.BeginTransactionAsync(ct);
    var ids = cmd.Lines.Select(l => l.ProductId).ToList();
    var products = await db.Products.Where(p => ids.Contains(p.Id)).ToDictionaryAsync(p => p.Id, ct);
    var order = new Order { CustomerEmail = cmd.CustomerEmail };
    foreach (var line in cmd.Lines)
    {
        if (!products.TryGetValue(line.ProductId, out var p) || p.Stock < line.Quantity)
            throw new OutOfStockException(line.ProductId);
        p.Stock -= line.Quantity;
        order.Items.Add(new OrderItem { ProductId = p.Id, Quantity = line.Quantity, UnitPrice = p.Price });
    }
    db.Orders.Add(order);
    await db.SaveChangesAsync(ct);
    await tx.CommitAsync(ct);
    return new OrderSummary(order.Id, order.CustomerEmail, order.Items.Sum(i => i.UnitPrice * i.Quantity), order.Items.Count);
}
await db.Products.Where(p => p.Stock < 5)
    .ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock + 10), ct);`,
          try: R`اطلب أوردر فيه منتجين، التاني مخزونه مش كفاية: اتأكد إن مخزون الأول متخصمش. وبعدين فكّر: لو طلبين جم في نفس اللحظة على آخر قطعة، الكود ده بيمنع إن الاتنين ينجحوا؟ جرّب تحل ده بـ atomic UPDATE: [[ExecuteUpdateAsync]] بشرط [[p.Stock >= qty]] وتفحص عدد الصفوف.`,
          flag: "script",
          deep: {
            why: R`الطلب ده بيعمل ٣ حاجات: يخصم مخزون، ويعمل order، ويعمل items. لو واحدة فشلت والباقي اتحفظ، عندك مخزون ناقص من غير أوردر، أو أوردر من غير items. الـ transaction بتخلي العملية كلها atomic.`,
            how: R`[[SaveChanges]] بيفتح transaction لو مفيش واحدة مفتوحة، ويبعت كل الـ statements (batched)، ويعمل commit. لو فيه transaction مفتوحة بـ [[BeginTransaction]] بيستخدمها. وأي exception قبل [[CommitAsync]] مع [[await using]] = rollback.

الـ isolation الافتراضي في Postgres [[Read Committed]]: الـ transaction مش بتمنع اتنين يقروا نفس المخزون (5) ويخصموا الاتنين. الحلول: (١) atomic UPDATE بشرط: [[UPDATE ... SET "Stock" = "Stock" - @q WHERE "Id" = @id AND "Stock" >= @q]] وتشوف عدد الصفوف. (٢) optimistic concurrency: عمود version (في Postgres [[xmin]] عبر [[IsConcurrencyToken]] أو [[[Timestamp]]] في SQL Server) و EF بيرمي [[DbUpdateConcurrencyException]] لو حد عدّل قبلك. (٣) [[SELECT ... FOR UPDATE]] بـ [[FromSql]]. (٤) [[IsolationLevel.Serializable]] مع retry.

[[ExecuteUpdateAsync]] بيتحول لـ UPDATE واحد، ومش بيحدّث الـ entities اللي في الذاكرة. و EF 10 بيسمح تبعتله lambda عادية فيها if بدل الـ expression بس.

ولو بتستخدم retry strategy ([[EnableRetryOnFailure]]) لازم تلف الـ transaction اليدوية في [[db.Database.CreateExecutionStrategy().ExecuteAsync(...)]].`,
            when: R`SaveChanges واحد يكفي لأغلب الحالات. [[BeginTransaction]] لما عندك كذا SaveChanges أو Execute أو SQL خام لازم يبقوا مع بعض. atomic UPDATE أو concurrency token لأي عداد أو مخزون أو رصيد. وقارن بـ «transaction» و «atomic UPDATE» و «SELECT FOR UPDATE» و «isolation levels» في «تاب SQL و Prisma».`,
            mistakes: R`SaveChanges جوه loop (transaction و round trip لكل عنصر). وتفتكر إن الـ transaction بتحل race condition على المخزون (مش في Read Committed). وتعمل transaction طويلة فيها HTTP call لـ payment gateway: الـ locks بتفضل ماسكة. وتنسى [[CommitAsync]] فكله يترجع بهدوء.`
          },
          teach: R`## المثال ده بيعمل إيه؟

[[PlaceAsync]] بتعمل أوردر: تجيب المنتجات المطلوبة، تتأكد إن المخزون كفاية، تخصم، وتضيف الأوردر وأصنافه. كل ده جوه **transaction**: يا كله يتحفظ يا ولا حاجة. وآخر سطرين UPDATE جماعي مباشر من غير تحميل. الناتج هنا حقيقي: الـ method دي بالظبط في console app بـ EF Core 10 على [[postgres:18]]، والـ SQL وأحداث الـ transaction من [[LogTo]]. المخزون في الأول: Blue pen = 100، و Red pen = 3.

---

## ١. التوقيع

~~~csharp
public async Task<OrderSummary> PlaceAsync(PlaceOrder cmd, CancellationToken ct)
~~~

- [[async Task<OrderSummary>]]: method async بترجّع [[OrderSummary]] في الآخر.
- [[PlaceOrder cmd]]: الطلب: [[record PlaceOrder(string CustomerEmail, List<OrderLine> Lines)]]، وكل [[OrderLine]] فيها [[ProductId]] و [[Quantity]].
- [[db]]: الـ [[ShopDb]] جاي من الـ primary constructor بتاع الـ service ([[class OrderService(ShopDb db)]]).

---

## ٢. فتح الـ transaction

~~~csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);
~~~

من جوه لبرة:

- [[db.Database]]: عمليات على الداتابيز نفسها مش على جدول.
- [[BeginTransactionAsync(ct)]]: ابعت [[BEGIN]]، ورجّع object بيمثل الـ transaction.
- [[await using var tx]]: لما الـ method تخلص بأي طريقة (return أو exception)، اعمل dispose للـ [[tx]]. والـ dispose لـ transaction متعملهاش commit = **rollback**. الـ [[await]] قبل [[using]] لأن الـ dispose نفسه async (بيكلم الداتابيز).

~~~text اللوج
dbug: RelationalEventId.TransactionStarted[20200]
      Began transaction with isolation level 'ReadCommitted'.
~~~

[[ReadCommitted]] هو الافتراضي في Postgres: كل query بتشوف اللي اتعمله commit قبلها. افتكر الكلمة دي، هنرجعلها في الـ race.

---

## ٣. هات المنتجات في query واحدة

~~~csharp
var ids = cmd.Lines.Select(l => l.ProductId).ToList();
var products = await db.Products.Where(p => ids.Contains(p.Id)).ToDictionaryAsync(p => p.Id, ct);
~~~

- [[cmd.Lines.Select(l => l.ProductId).ToList()]]: LINQ عادي في الذاكرة: list فيها [1, 2].
- [[ids.Contains(p.Id)]] جوه [[Where]]: EF بيترجمها:

~~~text اللوج
Executed DbCommand (40ms) [Parameters=[@ids='?' (DbType = Object)], ...]
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."Id" = ANY (@ids)
~~~

[[= ANY (@ids)]]: «الـ Id موجود في الـ array دي». الـ list كلها اتبعتت parameter واحد (array في Postgres).

- [[ToDictionaryAsync(p => p.Id, ct)]]: النتيجة [[Dictionary<int, Product>]]: المفتاح الـ Id. عشان ندوّر على المنتج بسرعة جوه الـ loop من غير queries تانية. والمنتجات دي **متتبعة**.

---

## ٤. الـ loop: افحص واخصم

~~~csharp
var order = new Order { CustomerEmail = cmd.CustomerEmail };
foreach (var line in cmd.Lines)
{
    if (!products.TryGetValue(line.ProductId, out var p) || p.Stock < line.Quantity)
        throw new OutOfStockException(line.ProductId);
    p.Stock -= line.Quantity;
    order.Items.Add(new OrderItem { ProductId = p.Id, Quantity = line.Quantity, UnitPrice = p.Price });
}
~~~

- [[products.TryGetValue(id, out var p)]]: لو المفتاح موجود بيرجّع [[true]] ويحط المنتج في [[p]]. [[out var p]] بيعرّف المتغير في نفس السطر.
- [[!]] قبلها = «مش لاقيه». و [[||]] = «أو». يعني: المنتج مش موجود **أو** مخزونه أقل من المطلوب، ارمي.
- [[throw new OutOfStockException(...)]]: exception بتاعتنا. بترمي، فالـ method بتخرج، والـ [[await using]] بيعمل rollback.
- [[p.Stock -= line.Quantity]]: خصم في الذاكرة. الـ entity متتبعة، فبقت [[Modified]].
- [[UnitPrice = p.Price]]: بنحفظ السعر وقت الطلب، عشان لو السعر اتغير بعدين الأوردر القديم ميتغيرش.

---

## ٥. احفظ واعمل commit

~~~csharp
db.Orders.Add(order);
await db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);
~~~

~~~text اللوج
Executed DbCommand (4ms) [...]
INSERT INTO "Orders" ("CreatedAt", "CustomerEmail")
VALUES (@p0, @p1)
RETURNING "Id";
UPDATE "Products" SET "Stock" = @p2
WHERE "Id" = @p3;
UPDATE "Products" SET "Stock" = @p4
WHERE "Id" = @p5;
Executed DbCommand (1ms) [...]
INSERT INTO "OrderItem" ("OrderId", "ProductId", "Quantity", "UnitPrice")
VALUES (@p6, @p7, @p8, @p9)
RETURNING "Id";
INSERT INTO "OrderItem" ("OrderId", "ProductId", "Quantity", "UnitPrice")
VALUES (@p10, @p11, @p12, @p13)
RETURNING "Id";
dbug: RelationalEventId.TransactionCommitted[20202]
      Committed transaction.
~~~

- [[SaveChangesAsync]] بعت كل حاجة في **commandين بس** (batching): الأوردر والـ UPDATEين مع بعض، وبعدين الأصناف (محتاجة [[OrderId]] اللي رجع من [[RETURNING]]).
- [[SaveChanges]] عادةً بيفتح transaction لوحده. هنا لقى واحدة مفتوحة فاستخدمها.
- [[CommitAsync]]: من هنا بس التغييرات بقت حقيقية وباقي الناس يشوفوها.

~~~text الناتج
OrderSummary { Id = 1, CustomerEmail = sara@x.com, Total = 17.00, Items = 2 }
~~~

[[order.Items.Sum(i => i.UnitPrice * i.Quantity)]]: 5.5 × 2 + 6 × 1 = 17. و [[order.Id]] اتملى بعد الـ SaveChanges.

---

## ٦. لما المخزون مش كفاية

طلب تاني: Blue pen × 2 و Red pen × 5 (Red pen فاضل منه 2):

~~~text اللوج
Began transaction with isolation level 'ReadCommitted'.
SELECT ... WHERE p."Id" = ANY (@ids)
dbug: RelationalEventId.TransactionDisposed[20204]
      Disposing transaction.
caught: Product 2 is out of stock
stock now: Blue pen=98, Red pen=2, Gold pen=2, C# book=10
~~~

- Blue pen اتخصم في الذاكرة (98 → 96)، بس الـ exception جت قبل [[SaveChanges]]، فولا UPDATE راح.
- مفيش [[Committed]]: الـ [[await using]] عمل dispose، والـ transaction اترجعت.
- Blue pen = 98 (من الأوردر الأول بس).

---

## ٧. الـ UPDATE الجماعي: [[ExecuteUpdateAsync]]

~~~csharp
await db.Products.Where(p => p.Stock < 5)
    .ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock + 10), ct);
~~~

~~~text اللوج
UPDATE "Products" AS p
SET "Stock" = p."Stock" + 10
WHERE p."Stock" < 5
~~~

~~~text الناتج
rows=2
~~~

- [[SetProperty(عمود, p => p.Stock + 10)]]: التاني lambda، فالقيمة الجديدة بتتحسب **في الداتابيز** من القيمة الحالية. مفيش تحميل.
- رجّع [[2]]: Red pen و Gold pen.
- مش بيعدّي على الـ change tracker ولا [[SaveChanges]]: لو فيه entity محمّلة في الذاكرة، قيمتها مش هتتحدث.

---

## ٨. التجربة: طلبين على آخر قطعة

حطينا مخزون Gold pen = 1، وشغّلنا [[PlaceAsync]] مرتين **في نفس اللحظة** من context مختلف لكل واحد (زي اتنين users):

~~~text الناتج (اتكرر ٣ مرات بنفس النتيجة)
a@x.com: ok order 2
b@x.com: ok order 1
orders for product 3: 2, stock: 0
~~~

الاتنين نجحوا! بعنا قطعتين وعندنا واحدة. ليه والـ transaction موجودة؟ الاتنين قروا [[Stock = 1]] قبل ما حد يكتب، والاتنين عدّوا الفحص، والاتنين كتبوا [[Stock = 0]]. [[ReadCommitted]] مبيمنعش ده.

الحل: خلي الفحص والخصم **statement واحد** في الداتابيز:

~~~csharp
var rows = await db.Products.Where(p => p.Id == id && p.Stock >= qty)
    .ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock - qty));
~~~

~~~text الناتج
a@x.com: rows=0
b@x.com: rows=1
stock: 0
~~~

Postgres بيقفل الصف وقت الـ UPDATE. التاني بيستنى، وبعد ما الأول يخلص بيعيد فحص الشرط على القيمة الجديدة (0 >= 1 غلط)، فبيرجّع [[0]] صفوف. و [[rows == 0]] = ارمي [[OutOfStockException]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[await using var tx = ...BeginTransactionAsync()]] | [[BEGIN]]، و rollback لوحده لو محصلش commit |
| [[ids.Contains(p.Id)]] | [[= ANY (@ids)]]: query واحدة لكل المنتجات |
| [[SaveChangesAsync]] | كل الـ INSERT و UPDATE في batches جوه نفس الـ transaction |
| [[CommitAsync]] | التغييرات بقت حقيقية |
| [[ExecuteUpdateAsync]] | UPDATE مباشر، من غير tracker ولا SaveChanges |

- [[SaveChanges]] واحد = transaction لوحده. [[BeginTransaction]] لما يبقى أكتر من خطوة.
- الـ transaction مش بتمنع اتنين يخصموا نفس المخزون: UPDATE بشرط وافحص عدد الصفوف.`,
          lines: [
            "method في الـ OrderService.",
            "بداية.",
            R`transaction صريحة، و [[await using]] بيعمل rollback لو محصلش commit.`,
            "IDs المنتجات المطلوبة.",
            R`query واحدة بـ [[= ANY(@ids)]] بدل query لكل منتج، في dictionary.`,
            "الأوردر الجديد.",
            "لكل سطر.",
            "بداية.",
            "المنتج مش موجود أو المخزون مش كفاية؟",
            "ارمي: الـ handler بيحوّله 409، والـ transaction بتترجع.",
            "خصم في الذاكرة (متتبع).",
            "item بسعر وقت الطلب.",
            "نهاية.",
            "ضيف الأوردر.",
            "INSERTs و UPDATEs كلهم في نفس الـ transaction.",
            "commit: من هنا بس التغييرات بقت حقيقية.",
            "الملخص.",
            "نهاية.",
            R`UPDATE جماعي مباشر: [[SET "Stock" = p."Stock" + 10 WHERE p."Stock" < 5]].`,
            "من غير تحميل ومن غير SaveChanges."
          ],
          sol: R`طلب [[{"lines":[{"productId":1,"quantity":2},{"productId":2,"quantity":5}]}]] والمنتج 2 مخزونه 3 بيرجع 409 [["title":"Out of stock","detail":"Product 2 is out of stock","productId":2]]، ومخزون المنتج 1 فضل زي ما هو (98 قبل وبعد). الخصم كان في الذاكرة بس، ومحصلش SaveChanges، والـ transaction اترجعت.

الـ race: لأ، الكود ده مش بيمنعها. طلبين بيقروا [[Stock = 1]] مع بعض، والاتنين بيعدّوا الفحص، والاتنين بيكتبوا [[Stock = 0]]، فبعت قطعتين وعندك واحدة. الحل: [[var rows = await db.Products.Where(p => p.Id == id && p.Stock >= qty).ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock - qty), ct); if (rows == 0) throw new OutOfStockException(id);]] الداتابيز بتقفل الصف وقت الـ UPDATE، فالتاني بيستنى ويشوف القيمة الجديدة والشرط بيفشل. خليه جوه نفس الـ transaction مع إنشاء الأوردر.`
        }
      ]
    }
]);
