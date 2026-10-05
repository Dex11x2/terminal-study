// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "EF Core: الأساس",
      l: 2,
      n: "DbContext مع PostgreSQL أو SQL Server، و migrations، و العلاقات، و LINQ اللي بيتحول SQL",
      items: [
        {
          cmd: "DbContext و Npgsql",
          title: "DbContext و DbSet: توصّل EF Core بـ PostgreSQL",
          desc: R`EF Core هو الـ ORM الرسمي (زي Prisma في «تاب SQL و Prisma»). بتكتب classes عادية (entities)، و [[DbContext]] فيه [[DbSet<Product>]] لكل جدول، وبتكتب LINQ فبيتحول SQL.

الـ provider بيتحدد بالمكتبة: [[Npgsql.EntityFrameworkCore.PostgreSQL]] لـ Postgres و [[UseNpgsql]]، أو [[Microsoft.EntityFrameworkCore.SqlServer]] و [[UseSqlServer]] لـ SQL Server، أو SQLite للتجارب. باقي الكود زي ما هو تقريبًا.

الـ conventions: property اسمها [[Id]] = primary key بـ identity، و [[CategoryId]] + [[Category]] = foreign key وعلاقة، و [[string]] non-nullable = [[NOT NULL]]. والباقي بتظبطه في [[OnModelCreating]] (Fluent API): أطوال، و precision للفلوس، و indexes.`,
          example: R`dotnet package add Npgsql.EntityFrameworkCore.PostgreSQL
dotnet package add Microsoft.EntityFrameworkCore.Design
# Data/ShopDb.cs
public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
public class ShopDb(DbContextOptions<ShopDb> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Product>().Property(p => p.Name).HasMaxLength(200);
        b.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);
        b.Entity<Product>().HasIndex(p => p.Name).IsUnique();
    }
}
# Program.cs + appsettings.Development.json
builder.Services.AddDbContext<ShopDb>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("Shop")));
# "ConnectionStrings": { "Shop": "Host=localhost;Database=shop_dev;Username=shop;Password=shop" }`,
          try: R`اعمل الـ entities دي في [[Shop.Api]] (ضيف [[Category]] بـ [[Id]] و [[Name]] و [[List<Product> Products]]) و Order و OrderItem، وسجّل الـ DbContext. ولو معندكش Postgres شغّله بـ Docker ([[docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=shop postgres:17-alpine]]). الخطوة الجاية: migrations.`,
          flag: "script",
          deep: {
            why: R`أغلب شغل .NET backend بيعدي على EF Core. فهمه كويس (إيه اللي بيتحول SQL وإمتى، وإيه اللي بيتتبع) هو الفرق بين API سريع و API بيعمل ٥٠٠ query في الصفحة.`,
            how: R`الـ [[DbContext]] بيمثل unit of work: جلسة مع الداتابيز فيها connection وقايمة بالـ entities اللي حمّلتها وحالتها (change tracker). [[AddDbContext]] بيسجله Scoped، فكل request ليه context منفصل، وده مهم لأن الـ DbContext مش thread-safe.

[[DbSet<T>]] بيطبق [[IQueryable<T>]]: كل LINQ عليه بيتبني كـ expression tree ومش بيتنفذ لحد [[ToListAsync]] أو [[FirstOrDefaultAsync]] أو [[foreach]].

الـ model بيتبني مرة من الـ conventions والـ attributes والـ Fluent API، ويتكاش. الـ navigation property ([[Category]]) بـ [[= null!]] لأنها non-nullable في الـ model (كل منتج ليه category) بس مش بتتحمل لوحدها، فالـ [[!]] بيسكّت التحذير. وجدول من غير DbSet (زي OrderItem لو مليهوش DbSet) بياخد اسم الـ class ([[OrderItem]]) بدل الجمع.

Postgres و SQL Server: الفروق بتظهر في الأنواع ([[text]] مقابل [[nvarchar(max)]]، و [[timestamp with time zone]] مقابل [[datetime2]])، والـ identity، و [[Contains]] ([[LIKE]] في الاتنين)، وحاجات Postgres الخاصة زي arrays و jsonb و [[ILike]] عبر [[EF.Functions]].`,
            when: R`EF Core للـ CRUD والـ queries العادية، وده ٩٠٪ من الشغل. للـ reports المعقدة أو الأداء الحرج: [[FromSql]] أو Dapper جنبه. و SQL Server لو الشركة على Microsoft stack و Azure، و Postgres لأغلب الباقي، والكود تقريبًا واحد.`,
            mistakes: R`نسخ مختلفة من حزم EF (Npgsql 10.0.3 بيعتمد على EF 10.0.4، و Design 10.0.12): تحذير [[MSB3277]] ووقوع وقت التشغيل في الاختبارات بـ [[Could not load file or assembly 'Microsoft.EntityFrameworkCore.Relational, Version=10.0.12.0']]، حصلت هنا وحلها إضافة [[Microsoft.EntityFrameworkCore.Relational]] بنفس النسخة صراحة. و [[double]] للأسعار بدل [[decimal]] + [[HasPrecision]]. و DbContext Singleton. والـ connection string في appsettings.json المرفوع.`
          },
          lines: [
            "الـ provider بتاع Postgres (بيجيب EF Core معاه).",
            R`أدوات design-time عشان [[dotnet ef]] يشتغل.`,
            "entity: class عادية.",
            "بداية.",
            R`[[Id]]: primary key بـ identity بالـ convention.`,
            R`[[NOT NULL]] لأنها non-nullable.`,
            R`[[numeric]] (هنحدد الـ precision تحت).`,
            R`foreign key بالـ convention ([[<Navigation>Id]]).`,
            R`navigation property. [[null!]] لأن EF هو اللي بيملاها.`,
            "نهاية.",
            "الـ context بياخد الإعدادات من الـ DI.",
            "بداية.",
            R`جدول [[Products]].`,
            R`جدول [[Categories]].`,
            "Fluent API.",
            "بداية.",
            R`[[character varying(200)]].`,
            R`[[numeric(10,2)]]: فلوس.`,
            R`unique index على الاسم.`,
            "نهاية.",
            "نهاية.",
            R`تسجيل Scoped، والـ connection string من الإعدادات.`
          ],
          sol: R`لو كله تمام [[dotnet build]] بينجح والتطبيق بيقوم (EF مش بيكلم الداتابيز غير أول query، فلو الـ connection string غلط مش هتعرف غير مع أول request: [[Npgsql.NpgsqlException: Failed to connect to 127.0.0.1:5432]] أو [[28P01: password authentication failed for user "shop"]]).

Order و OrderItem: [[public class Order { public int Id { get; set; } public required string CustomerEmail { get; set; } public DateTime CreatedAt { get; set; } = DateTime.UtcNow; public List<OrderItem> Items { get; set; } = []; }]] و [[OrderItem]] فيها [[OrderId]] و [[ProductId]] و [[Product]] و [[Quantity]] و [[UnitPrice]] (السعر وقت الطلب، مش السعر الحالي). و [[DateTime.UtcNow]] مش [[Now]]: Npgsql بيرفض [[DateTime]] من نوع Local في عمود [[timestamp with time zone]].`
        },
        {
          cmd: "dotnet ef migrations",
          title: "migrations: تغيّر الـ schema بأوامر متسجلة في git",
          desc: R`بعد ما تعدّل الـ entities، [[dotnet ef migrations add Initial]] بيقارن الـ model بآخر snapshot ويطلّع ملف C# فيه [[Up]] (التغيير) و [[Down]] (الرجوع). و [[dotnet ef database update]] بيطبّق اللي ماتطبقش على الداتابيز ويسجله في جدول [[__EFMigrationsHistory]].

الأداة نفسها [[dotnet-ef]] بتتسطب كـ tool: [[dotnet new tool-manifest]] ثم [[dotnet tool install dotnet-ef]]، فتتسجل في [[dotnet-tools.json]] مع المشروع (زي devDependency) وكل الفريق ياخد نفس النسخة بـ [[dotnet tool restore]].

في الإنتاج متشغّلش [[database update]] من جهازك: طلّع SQL script ([[dotnet ef migrations script --idempotent]]) وراجعه، أو migration bundle (ملف تنفيذي)، وشغّله في الـ CI أو الـ deploy.`,
          example: R`dotnet new tool-manifest
dotnet tool install dotnet-ef
dotnet ef migrations add Initial
dotnet ef database update
dotnet ef migrations list
dotnet ef migrations add AddTagsAndSku
dotnet ef migrations script --idempotent -o migrate.sql
dotnet ef migrations bundle -o efbundle
dotnet ef migrations remove`,
          try: R`ضيف لـ [[Product]] property [[public string? Sku { get; set; }]] واعمل migration اسمها [[AddSku]]. افتح الملف واقرا [[Up]] و [[Down]]. وبعدين شغّل التطبيق وجرّب endpoint قبل ما تعمل [[database update]]: إيه الخطأ؟`,
          deep: {
            why: R`الـ schema جزء من الكود: لازم يتراجع في PR، ويتطبق بنفس الترتيب على جهازك والـ staging والإنتاج. من غير migrations كل واحد بيعدّل الجداول بإيده والبيئات بتختلف. نفس فكرة [[prisma migrate]] في «تاب SQL و Prisma».`,
            how: R`كل migration ليها ملفين: [[<timestamp>_Name.cs]] (الـ Up و Down بـ [[MigrationBuilder]])، و [[.Designer.cs]] (الـ model وقتها)، وفيه ملف [[ShopDbModelSnapshot.cs]] بيتحدث مع كل migration وبيمثل الـ model الحالي. [[migrations add]] بيقارن الـ model من الكود بالـ snapshot.

[[dotnet ef]] محتاج يعمل الـ DbContext وقت الـ design: بيشغّل [[Program.cs]] لحد [[Build()]] ويطلب الـ context من الـ DI، فلازم الـ connection string موجود في البيئة اللي هو فيها ([[ASPNETCORE_ENVIRONMENT=Development]]).

[[--idempotent]] بيلف كل migration في [[IF NOT EXISTS]] على جدول الـ history، فالـ script ينفع يتشغل على أي نسخة من الداتابيز. والـ bundle ملف تنفيذي فيه الـ migrations، بتشغّله بـ connection string من غير SDK.

[[migrations remove]] بيشيل آخر migration لو لسه مطبقتهاش. لو طبقتها: [[database update PreviousName]] الأول. وفي الـ many-to-many من غير join entity، EF بيعمل جدول [[ProductTag]] بأعمدة [[ProductsId]] و [[TagsId]] لوحده.`,
            when: R`migration صغيرة لكل تغيير منطقي، باسم واضح ([[AddSkuToProducts]] مش [[Update3]]). في الإنتاج: script أو bundle في خطوة deploy منفصلة قبل ما التطبيق الجديد يقوم. و [[Database.Migrate()]] وقت الـ startup بس للمشاريع الصغيرة بـ instance واحدة (لو كذا instance قاموا مع بعض ممكن يتخانقوا).`,
            mistakes: R`تعدّل migration اتطبقت خلاص بدل ما تعمل واحدة جديدة. وتمسح ملفات الـ migrations وتعمل Initial جديدة على داتابيز فيها داتا. و rename property فـ EF يفهمها drop + add فتضيع الداتا: راجع الـ Up دايمًا وحوّلها [[RenameColumn]]. وتغييرات بتقفل جداول كبيرة في الإنتاج (شوف «تاب PostgreSQL»: تغييرات آمنة في الإنتاج).`
          },
          lines: [
            R`[[dotnet-tools.json]]: tools خاصة بالمشروع.`,
            R`سطّب [[dotnet-ef]] بنسخة متسجلة في الملف.`,
            R`أول migration: فولدر [[Migrations]] فيه الـ Up و Down والـ snapshot.`,
            R`طبّق على الداتابيز (من الـ connection string في Development).`,
            R`كل الـ migrations، والمش مطبقة عليها [[(Pending)]].`,
            "migration تانية بعد تعديل الـ entities.",
            "SQL script آمن يتشغل على أي نسخة، تراجعه وتشغّله في الإنتاج.",
            "ملف تنفيذي فيه الـ migrations للـ CI و Docker.",
            "شيل آخر migration (لو لسه متطبقتش)."
          ],
          sol: R`الـ Up فيها [[migrationBuilder.AddColumn<string>(name: "Sku", table: "Products", type: "text", nullable: true);]] والـ Down فيها [[DropColumn]]. nullable لأن [[string?]]؛ لو كانت [[string]] كان هيحط [[nullable: false, defaultValue: ""]] عشان الصفوف القديمة.

قبل [[database update]] أي query على Products بتقع: [[Npgsql.PostgresException: 42703: column p.Sku does not exist]] والـ API بيرجع 500. لأن EF بيعمل [[SELECT]] بكل الأعمدة اللي في الـ model. ده حصل فعلًا وإحنا بنجرب الـ tab ده. بعد [[dotnet ef database update]] وتشوف [[migrations list]] مفيهاش Pending، كله يرجع يشتغل. الدرس: الـ migration لازم تتطبق قبل أو مع نشر الكود اللي بيعتمد عليها.`
        },
        {
          cmd: "العلاقات في EF",
          title: "one-to-many و many-to-many: navigation properties و foreign keys",
          desc: R`العلاقة بتتكتب بـ navigation properties: [[Category]] فيها [[List<Product> Products]] و [[Product]] فيها [[Category Category]] و [[int CategoryId]] = one-to-many. و [[Product]] فيها [[List<Tag> Tags]] و [[Tag]] فيها [[List<Product> Products]] = many-to-many، و EF بيعمل جدول الربط لوحده.

الإضافة بالـ navigation: [[order.Items.Add(new OrderItem { ... })]] و [[SaveChanges]] بيعمل الـ INSERTs بالترتيب الصح ويملى الـ foreign keys. أو بالـ Id مباشرة: [[new Product { CategoryId = 1 }]] من غير ما تحمّل الـ category.

الـ [[OnDelete]] بيتحدد تلقائي: required relationship = [[CASCADE]]. غيّره لـ [[Restrict]] لو مش عايز مسح الـ category يمسح منتجاتها.`,
          example: R`public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Product> Products { get; set; } = [];
}
public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Product> Products { get; set; } = [];
}
b.Entity<Product>()
    .HasOne(p => p.Category)
    .WithMany(c => c.Products)
    .HasForeignKey(p => p.CategoryId)
    .OnDelete(DeleteBehavior.Restrict);
var pens = new Category { Name = "Pens" };
pens.Products.Add(new Product { Name = "Blue pen", Price = 5.5m });
db.Categories.Add(pens);
await db.SaveChangesAsync();`,
          try: R`ضيف [[Tags]] لـ Product و [[Tag]] entity واعمل migration، وافتحها: الجدول الوسيط اسمه إيه وأعمدته إيه؟ وبعدين ضيف tag «sale» لمنتج موجود من غير ما تحمّل كل الـ tags بتاعته.`,
          flag: "script",
          deep: {
            why: R`أي app حقيقي علاقات: طلبات فيها أصناف، ومنتجات في أقسام، ومستخدمين ليهم أدوار. EF بيخليك تتعامل معاها كـ objects عادية، بس لازم تعرف هو بيعمل إيه في SQL عشان متتفاجئش بالـ cascade أو بـ query ناقصة.`,
            how: R`EF بيكتشف العلاقة من الـ navigations في الناحيتين، ولو فيه [[CategoryId]] بيستخدمه كـ FK (لو مش موجود بيعمل shadow property بنفس الاسم). الـ Fluent API ([[HasOne]]/[[WithMany]]) مطلوب بس لما الـ conventions متكفيش (اسمين غريبين، أو تغيير الـ delete behavior).

الـ many-to-many من غير class للربط: EF بيعمل جدول [[ProductTag]] بأعمدة [[ProductsId]] و [[TagsId]] ومفتاح مركب. لو محتاج أعمدة زيادة في الربط (زي [[AddedAt]]) اعمل entity للربط صريحة ([[ProductTag]]) بعلاقتين one-to-many.

الـ navigations مش بتتحمل لوحدها: [[product.Category]] بيبقى null لحد ما تعمل [[Include]] أو projection (الـ category الجاية). وفيه lazy loading بس مقفول افتراضيًا ومش مستحسن في APIs.

[[DeleteBehavior.Cascade]] بيحط [[ON DELETE CASCADE]] في الـ FK، و [[Restrict]] بيمنع المسح لو فيه أولاد. و [[SetNull]] للعلاقات الاختيارية.`,
            when: R`one-to-many لأغلب العلاقات. many-to-many بسيطة للـ tags والـ roles. entity وسيطة لو الربط ليه داتا. و [[Restrict]] للـ lookups (Category، Country) عشان مسحة غلط متمسحش آلاف الصفوف. قارن بـ «one-to-many» و «many-to-many» و «ON DELETE» في «تاب SQL و Prisma».`,
            mistakes: R`تحمّل الـ category كلها عشان تضيف منتج (استخدم [[CategoryId]]). وتسيب الـ cascade الافتراضي على علاقات مهمة. و navigation في الناحيتين وترجع الـ entity في JSON: [[A possible object cycle was detected]]. رجّع DTOs.`
          },
          lines: [
            "الناحية الـ one.",
            "بداية.",
            "PK.",
            "اسم.",
            R`collection navigation: الـ many. [[= []]] عشان متبقاش null.`,
            "نهاية.",
            "tag.",
            "بداية.",
            "PK.",
            "اسم.",
            R`many-to-many مع [[Product.Tags]]: EF بيعمل جدول [[ProductTag]].`,
            "نهاية.",
            "Fluent API للعلاقة (في OnModelCreating).",
            "المنتج ليه category واحدة.",
            "والـ category ليها منتجات كتير.",
            R`الـ FK صريح.`,
            R`[[ON DELETE RESTRICT]] بدل CASCADE.`,
            "category جديدة.",
            "منتج جوه الـ navigation.",
            "ضيف الـ category (والمنتج معاها).",
            R`[[INSERT]] للـ category الأول، وبعدين المنتج بالـ [[CategoryId]] الجديد.`
          ],
          sol: R`الـ migration فيها [[CreateTable(name: "Tag", ...)]] و [[CreateTable(name: "ProductTag", columns: ProductsId, TagsId)]] بـ [[PrimaryKey("PK_ProductTag", x => new { x.ProductsId, x.TagsId })]] واتنين FK بـ Cascade، و index على [[TagsId]]. الجدول اسمه [[Tag]] مش [[Tags]] لأن مفيش [[DbSet<Tag>]]؛ ضيف DbSet أو [[ToTable("Tags")]] لو عايز الجمع.

عشان تضيف tag من غير ما تحمّل tags المنتج: [[var product = await db.Products.FindAsync(1); var sale = await db.Set<Tag>().SingleAsync(t => t.Name == "sale"); product!.Tags.Add(sale); await db.SaveChangesAsync();]] الـ [[Tags]] فاضية في الذاكرة بس EF بيعمل [[INSERT INTO "ProductTag"]] للصف الجديد بس، مش بيمسح القديم، لأنه بيتتبع الإضافة مش الحالة الكاملة. لو الـ tag موجودة أصلًا على المنتج هتاخد duplicate key: حمّلها بـ [[Include]] الأول لو مش متأكد.`
        },
        {
          cmd: "LINQ لـ SQL",
          title: "الـ LINQ بيتحول SQL إزاي؟ projection و ToQueryString و الـ client evaluation",
          desc: R`[[db.Products.Where(p => p.Price > 10).Select(p => new { p.Name })]] مش بيتنفذ في C#: EF بياخد الـ lambda كـ expression tree ويحوّلها لـ [[SELECT p."Name" FROM "Products" AS p WHERE p."Price" > 10]]. عشان كده مش أي C# ينفع جوه الـ Where: methods انت كاتبها أو حاجات ملهاش مقابل في SQL بترمي [[could not be translated]].

أهم عادة: [[Select]] لـ DTO (projection). بيجيب الأعمدة المطلوبة بس، وبيعمل الـ JOINs لوحده لو استخدمت navigation ([[p.Category.Name]])، ومش بيتتبع حاجة. و [[ToQueryString()]] بيوريك الـ SQL من غير ما ينفذ.

والـ async: [[ToListAsync]] و [[FirstOrDefaultAsync]] و [[CountAsync]] و [[AnyAsync]] من [[Microsoft.EntityFrameworkCore]].`,
          example: R`var q = db.Products
    .Where(p => p.Price > 5 && p.Name.Contains("pen"))
    .OrderBy(p => p.Price)
    .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name));
Console.WriteLine(q.ToQueryString());
var list = await q.ToListAsync(ct);
var total = await db.Products.CountAsync(p => p.Stock < 5, ct);
var exists = await db.Products.AnyAsync(p => p.Name == "Blue pen", ct);
var avgByCategory = await db.Products
    .GroupBy(p => p.Category.Name)
    .Select(g => new { Category = g.Key, Avg = g.Average(p => p.Price) })
    .ToListAsync(ct);`,
          try: R`اعمل method عادية [[static bool IsCheap(Product p) => p.Price < 10;]] واستخدمها جوه [[db.Products.Where(p => IsCheap(p))]]. إيه اللي حصل؟ صلّحها بطريقتين. وبعدين قارن الـ SQL بتاع [[db.Products.Select(p => p.Name)]] بـ [[db.Products.ToList().Select(p => p.Name)]].`,
          flag: "script",
          deep: {
            why: R`الـ ORM بيخبي الـ SQL، وده مريح لحد ما الـ query تبقى بطيئة أو تقع في الإنتاج. لازم تبقى عارف تقرا LINQ وتتخيل الـ SQL، وتتأكد بـ [[ToQueryString]] أو اللوج.`,
            how: R`[[DbSet<T>]] هو [[IQueryable<T>]]، و [[Where]] على [[IQueryable]] بتاخد [[Expression<Func<T, bool>>]] مش [[Func]]: شجرة بتوصف الكود مش كود متجمّع. الـ provider بيلف على الشجرة ويترجمها. [[Contains]] على string بقت [[LIKE]]، و [[ids.Contains(p.Id)]] بقت [[= ANY(@ids)]] في Postgres أو [[IN]]، و [[p.Category.Name]] بقت JOIN.

الـ parameters: القيم من C# بتبقى parameters ([[@q_contains]]) مش بتتلزق في النص، فمفيش SQL injection. و [[FromSql($"... {x}")]] برضه بيحوّل الـ interpolation لـ parameters، أما [[FromSqlRaw]] مع string concatenation ففيه injection.

EF Core بيسمح بـ client evaluation في آخر [[Select]] بس (مثلًا تنادي method على النتيجة). في Where أو OrderBy بيرمي [[InvalidOperationException: The LINQ expression ... could not be translated]]، أحسن من إنه يحمّل الجدول كله بهدوء زي EF6 زمان.

أول ما تعمل [[AsEnumerable()]] أو [[ToList()]] الباقي بيتنفذ في الذاكرة. ده الفرق بين [[IQueryable]] و [[IEnumerable]] (سؤال انترفيو ثابت، آخر category).`,
            when: R`projection لـ DTO في أي endpoint بيرجع داتا. تحميل الـ entity كاملة لما هتعدّل فيها و [[SaveChanges]]. SQL خام ([[FromSql]] أو [[SqlQuery]]) للـ reports والـ window functions اللي LINQ مبيعبّرش عنها كويس.`,
            mistakes: R`[[ToList()]] بدري فالفلترة تحصل في الذاكرة. و method بتاعتك جوه Where. و [[Count()]] الـ sync بدل [[CountAsync]] في API. و [[FromSqlRaw("... " + input)]] (SQL injection). و [[string.Equals(a, b, StringComparison.OrdinalIgnoreCase)]] جوه Where (مش بيتترجم: استخدم [[EF.Functions.ILike]] في Postgres أو collation).`
          },
          lines: [
            "query لسه متنفذتش.",
            R`بيتحول [[WHERE p."Price" > 5.0 AND p."Name" LIKE '%pen%']]: الثوابت بتتكتب في الـ SQL، والمتغيرات بتبقى parameters.`,
            R`[[ORDER BY]].`,
            R`projection: [[p.Category.Name]] بيعمل [[INNER JOIN]] لوحده، والأعمدة المطلوبة بس.`,
            "اطبع الـ SQL من غير تنفيذ.",
            R`هنا بس بيروح للداتابيز، والـ token بيلغي الـ query لو الـ request اتلغى.`,
            R`[[SELECT count(*)]] مش تحميل الصفوف.`,
            R`[[SELECT EXISTS (...)]].`,
            R`[[GROUP BY]] في SQL.`,
            "التجميع.",
            R`[[avg()]] في SQL.`,
            "تنفيذ."
          ],
          sol: R`[[Where(p => IsCheap(p))]] بيرمي وقت التنفيذ: [[InvalidOperationException: The LINQ expression 'DbSet<Product>().Where(p => Program.IsCheap(p))' could not be translated. Either rewrite the query in a form that can be translated, or switch to client evaluation explicitly by inserting a call to 'AsEnumerable', 'AsAsyncEnumerable', 'ToList', or 'ToListAsync'.]] EF مش شايف جوه الـ method، شايف نداء بس. (ده لو الـ method static في class. لو كتبتها local function تحت الـ top-level statements، الـ build نفسه بيفشل قبل كده بـ [[error CS8110: An expression tree may not contain a reference to a local function]].)

الحل الأول: اكتب الشرط inline [[Where(p => p.Price < 10)]]. التاني: خلي الـ method ترجع [[Expression<Func<Product, bool>>]]: [[static Expression<Func<Product, bool>> IsCheap => p => p.Price < 10;]] و [[Where(IsCheap)]]. (الـ AsEnumerable اللي الرسالة بتقترحه بيشتغل بس بيحمّل الجدول كله، فمش حل.)

[[db.Products.Select(p => p.Name)]] الـ SQL [[SELECT p."Name" FROM "Products" AS p]]. و [[ToList().Select(...)]] الـ SQL [[SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock" FROM "Products"]]: كل الأعمدة وكل الصفوف، والـ Select في الذاكرة.`
        }
      ]
    },
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
    },
    {
      t: "Auth",
      l: 2,
      n: "JWT bearer، و roles و policies، و ASP.NET Core Identity",
      items: [
        {
          cmd: "JWT bearer",
          title: "JWT bearer: تتحقق من التوكن في كل request",
          desc: R`[[AddAuthentication().AddJwtBearer(...)]] من حزمة [[Microsoft.AspNetCore.Authentication.JwtBearer]] بيقرا [[Authorization: Bearer <token>]] من كل request، ويتحقق من التوقيع والـ issuer والـ audience والصلاحية، ولو سليم بيملى [[HttpContext.User]] بالـ claims. وبعدين [[RequireAuthorization()]] على الـ endpoint أو [[[Authorize]]] على الـ controller.

التوكن نفسه بيتعمل في endpoint الـ login (أو من identity provider برّه زي Auth0 أو Entra أو Keycloak، وده الأفضل في الشركات). المثال بيعمله بـ [[JsonWebTokenHandler]] ومفتاح HMAC من الـ config.

401 = مش عارفك (مفيش توكن أو غلط)، 403 = عارفك بس مش مسموحلك (الدرس الجاي).`,
          example: R`builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = jwt.Issuer,
        ValidAudience = jwt.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
    });
public string Create(string userId, string email, IEnumerable<string> roles)
{
    var claims = new List<Claim> { new(JwtRegisteredClaimNames.Sub, userId), new(JwtRegisteredClaimNames.Email, email) };
    claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));
    var now = clock.GetUtcNow().UtcDateTime;
    return new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
    {
        Issuer = _o.Issuer,
        Audience = _o.Audience,
        Subject = new ClaimsIdentity(claims),
        NotBefore = now,
        Expires = now.AddMinutes(_o.MinutesValid),
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_o.Key)), SecurityAlgorithms.HmacSha256)
    });
}`,
          try: R`اعمل endpoint [[/dev/token]] (في Development بس) بيرجع توكن، وفكّ الـ payload بـ [[cut -d. -f2 | base64 -d]]. وبعدين: (١) ابعت request من غير توكن، (٢) بتوكن توقيعه متغير حرف، (٣) بتوكن منتهي (خلي [[MinutesValid]] سالب). بص على header الـ [[WWW-Authenticate]] في كل حالة.`,
          flag: "script",
          deep: {
            why: R`أغلب APIs اللي بيكلمها SPA أو موبايل بتستخدم JWT. وفهم إيه اللي بيتفحص وفين بيخليك تعرف ليه الـ 401 طالع، وإيه الإعدادات اللي لو غلطت فيها يبقى أي حد يعمل توكن. الأساس في «jwt.sign و jwt.verify» في «تاب Backend بـ Node» وشكل التوكن في «تاب الانترفيو».`,
            how: R`الـ JwtBearer handler بيشتغل من [[UseAuthentication]]. بيفك التوكن، ويتحقق من التوقيع بالمفتاح، ومن [[iss]] و [[aud]] (افتراضيًا [[ValidateIssuer]] و [[ValidateAudience]] و [[ValidateLifetime]] كلهم true)، ومن [[exp]] و [[nbf]] مع سماحية ٥ دقايق ([[ClockSkew]]). لو نجح بيعمل [[ClaimsPrincipal]].

لو فشل، الـ endpoint المحمية بترجع 401 و [[WWW-Authenticate: Bearer error="invalid_token", error_description="The token expired at '...'"]] أو [["The signature key was not found"]] (دي اللي بتطلع لما التوقيع ميطابقش أي مفتاح عنده، مش رسالة أوضح زي «التوقيع غلط»). من غير توكن خالص: [[WWW-Authenticate: Bearer]] بس.

الـ claims: [[ClaimTypes.Role]] اسمه URI طويل، و [[JsonWebTokenHandler]] بيكتبه في التوكن زي ما هو (مش بيختصره لـ [[role]]). عند القراية الـ JwtBearer بيحوّل الأسماء القصيرة المعروفة ([[role]] و [[sub]] و [[email]]) للـ URIs (لأن [[MapInboundClaims]] true افتراضيًا)، فـ [[RequireRole]] و [[User.IsInRole]] بيشتغلوا سواء التوكن فيه [[role]] (من identity provider) أو الـ URI. ونفس الكلام [[sub]] بيبقى [[ClaimTypes.NameIdentifier]].

مع identity provider برّه متحطش مفتاح: [[o.Authority = "https://login.example.com"]] و [[o.Audience = "shop-api"]]، والـ handler بيجيب المفاتيح العامة من [[/.well-known/openid-configuration]] (JWKS) ويحدّثها لوحده.

[[HMAC]] (مفتاح واحد للتوقيع والتحقق) مناسب لو نفس الـ API بيعمل ويتحقق. لو كذا service بتتحقق، RSA أو ECDSA (مفتاح خاص للتوقيع وعام للتحقق).`,
            when: R`JWT للـ APIs اللي بيكلمها موبايل أو SPA على domain تاني أو services تانية. لـ SPA على نفس الـ domain، الـ cookie (HttpOnly) بـ Identity أبسط وأأمن ضد XSS. وقارن «JWT ولا session» في «تاب Backend بـ Node».`,
            mistakes: R`مفتاح قصير أو في git (HMAC-SHA256 محتاج 32 byte على الأقل، والـ handler بيرمي لو أقصر). و [[ValidateLifetime = false]] أو [[ValidateIssuer = false]] عشان «الـ 401 يختفي». وتوكن صلاحيته شهور من غير refresh. وتحط داتا حساسة في الـ payload (مش مشفّر، مجرد base64). وتنسى [[UseAuthentication]] قبل [[UseAuthorization]].`
          },
          lines: [
            R`الـ scheme الافتراضي: Bearer.`,
            "إعدادات التحقق.",
            "بداية.",
            R`لازم [[iss]] يساوي ده.`,
            R`و [[aud]].`,
            "المفتاح اللي اتوقّع بيه.",
            "نهاية.",
            R`method في [[TokenService]]: بتعمل التوكن.`,
            "بداية.",
            R`[[sub]] و [[email]] claims.`,
            R`كل role كـ claim (بيطلع في الـ JSON باسم الـ URI الطويل، مش [[role]]).`,
            R`[[TimeProvider]] بدل [[DateTime.UtcNow]] عشان تقدر تتحكم فيه في الاختبارات.`,
            R`[[JsonWebTokenHandler]]: الـ handler الحديث (أسرع من [[JwtSecurityTokenHandler]] القديم).`,
            "بداية.",
            "المصدر.",
            "الجمهور.",
            "الـ claims.",
            R`[[nbf]].`,
            R`[[exp]].`,
            R`توقيع HMAC-SHA256.`,
            "بالمفتاح من الإعدادات.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`الـ payload بعد الفك: [[{"aud":"shop-api","iss":"shop-dev","exp":1790745678,"nbf":1790742078,"sub":"sara@x.com","email":"sara@x.com","iat":1790742078}]] (ومع admin بيبقى فيه [["http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"admin"]]، لأن [[ClaimTypes.Role]] بيتكتب زي ما هو). أي حد يقدر يقراه، فمتحطش فيه أسرار.

(١) من غير توكن: 401 و [[WWW-Authenticate: Bearer]]. (٢) توقيع متغير: 401 و [[WWW-Authenticate: Bearer error="invalid_token", error_description="The signature key was not found"]] (الرسالة مش «signature invalid»: الـ handler بيدور على مفتاح يطابق التوقيع ومبيلاقيش). (٣) منتهي: 401 و [[error_description="The token expired at '09/30/2026 03:54:30'"]]. لو التوكن المنتهي لسه شغال، افتكر الـ [[ClockSkew]] الافتراضي ٥ دقايق: خلي [[MinutesValid = -10]] أو [[ClockSkew = TimeSpan.Zero]]. ولو الـ token سليم ولسه 401، بص على ترتيب [[UseAuthentication]] و [[UseAuthorization]] (درس middleware).`
        },
        {
          cmd: "authorization policies",
          title: "roles و policies: مين مسموحله يعمل إيه",
          desc: R`بعد ما عرفت المستخدم (authentication)، الـ authorization بيقرر. أبسط شكل: [[RequireAuthorization()]] = أي حد مسجل. بالـ role: [[.RequireAuthorization(p => p.RequireRole("admin"))]]. والأنضف: policies باسم بتتعرف مرة في [[AddAuthorizationBuilder().AddPolicy("Admin", p => p.RequireRole("admin"))]] وتستخدمها [[RequireAuthorization("Admin")]] أو [[[Authorize(Policy = "Admin")]]].

الـ policy ممكن تبقى على claim ([[RequireClaim("plan", "pro")]])، أو شرط مخصص ([[RequireAssertion(ctx => ...)]])، أو handler كامل بياخد services من الـ DI.

وملكية الـ resource («الأوردر ده بتاعك؟») مش role: بتفحصها جوه الـ endpoint أو بـ resource-based authorization ([[IAuthorizationService.AuthorizeAsync(User, order, "OwnsOrder")]]).`,
          example: R`builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", p => p.RequireRole("admin"))
    .AddPolicy("ProPlan", p => p.RequireClaim("plan", "pro", "enterprise"));
g.MapPost("/", CreateProduct).RequireAuthorization("Admin");
g.MapGet("/reports", GetReports).RequireAuthorization("ProPlan");
app.MapGet("/me", (ClaimsPrincipal user) => new
{
    id = user.FindFirstValue(ClaimTypes.NameIdentifier),
    email = user.FindFirstValue(ClaimTypes.Email),
    isAdmin = user.IsInRole("admin")
}).RequireAuthorization();
app.MapGet("/api/orders/{id:int}", async (int id, ClaimsPrincipal user, ShopDb db) =>
{
    var order = await db.Orders.FindAsync(id);
    if (order is null) return Results.NotFound();
    return order.CustomerEmail == user.FindFirstValue(ClaimTypes.Email) || user.IsInRole("admin")
        ? Results.Ok(order) : Results.NotFound();
}).RequireAuthorization();`,
          try: R`بتوكن user عادي جرّب [[POST /api/products]] (المتوقع 403)، وبتوكن admin (201). وبعدين جرّب تجيب أوردر بتاع user تاني. ليه المثال بيرجع 404 مش 403 في الحالة دي؟`,
          flag: "script",
          deep: {
            why: R`أشهر ثغرة في APIs (رقم ١ في OWASP API Top 10) هي Broken Object Level Authorization: المستخدم يغيّر الـ id في الـ URL فيشوف داتا حد تاني. الـ roles مش بتحل دي. لازم تفهم الفرق بين «هل مسموحلك بالعملية» و «هل مسموحلك بالـ object ده». شوف «ownership (IDOR)» في «تاب Backend بـ Node» و «1. Broken Access Control» في «تاب الأمان».`,
            how: R`[[UseAuthorization]] بيبص على الـ metadata بتاعة الـ endpoint المختار (policies و roles و [[AllowAnonymous]])، ويشغّل الـ requirements على [[HttpContext.User]]. مفيش user = 401 (challenge). فيه user بس الـ policy فشلت = 403 (forbid).

الـ policy = قايمة requirements، كلهم لازم ينجحوا. [[RequireRole("a", "b")]] = أي واحد منهم. ولو حطيت [[RequireAuthorization]] مرتين بـ policies مختلفة، الاتنين لازم ينجحوا.

تقدر تحط policy على الـ group كله: [[app.MapGroup("/admin").RequireAuthorization("Admin")]]، وتستثني endpoint بـ [[AllowAnonymous()]]. أو تعمل [[FallbackPolicy]] بتطلب auth لكل حاجة إلا المستثنى (أأمن: الافتراضي مقفول).

[[ClaimsPrincipal user]] كـ parameter بياخد [[HttpContext.User]]. و [[FindFirstValue]] من [[System.Security.Claims]].`,
            when: R`roles للأدوار الواسعة (admin، support). claims و policies للخطط والصلاحيات الدقيقة. فحص الملكية في كل endpoint بيجيب أو يعدّل resource بـ id. و [[FallbackPolicy]] مع [[RequireAuthenticatedUser]] في أي API داخلي.`,
            mistakes: R`تعتمد على إن الـ frontend بيخبي الزرار. وتفحص الـ role بس وتنسى الملكية. وترجع 403 لـ object مش بتاعه فتأكدله إنه موجود (404 أأمن غالبًا). وتحط الـ roles في التوكن وتنسى إنها مش هتتحدث لحد ما التوكن يخلص.`
          },
          lines: [
            "بيسجّل الـ authorization ويعرّف policies.",
            R`policy باسم [[Admin]]: لازم role admin.`,
            R`policy على claim: [[plan]] قيمته pro أو enterprise.`,
            R`الـ endpoint محتاج الـ policy: user عادي = 403، مفيش توكن = 401.`,
            "endpoint تاني بـ policy تانية.",
            R`[[ClaimsPrincipal]]: الـ user الحالي من التوكن.`,
            "بداية الـ anonymous object.",
            R`[[sub]] بيتقري كـ [[NameIdentifier]].`,
            "الإيميل.",
            "role.",
            R`أي user مسجل (من غير policy).`,
            "فحص الملكية.",
            "بداية.",
            "هات الأوردر.",
            "مش موجود.",
            "بتاعه أو admin؟",
            R`لو لأ: 404 كأنه مش موجود (مش 403).`,
            "لازم يكون مسجل دخول الأول."
          ],
          sol: R`user عادي: [[POST /api/products]] بترجع 403 بـ ProblemDetails [["title":"Forbidden"]]، و admin بترجع 201 و [[Location: /api/products/4]]. من غير توكن خالص 401. ده اللي بيتفحص في الـ integration test في المستوى ٣.

أوردر حد تاني بيرجع 404 عمدًا: لو رجعت 403 انت كده قلت للمهاجم «الأوردر رقم 1234 موجود، بس مش بتاعك»، فيقدر يعد الأوردرات ويعرف حجم البيزنس. 404 مبتكشفش حاجة. الأنضف إنك تحط الشرط في الـ query نفسها: [[db.Orders.Where(o => o.Id == id && o.CustomerEmail == email)]] فالـ object مش بيتحمل أصلًا.`
        },
        {
          cmd: "ASP.NET Core Identity",
          title: "ASP.NET Core Identity: تسجيل ودخول وباسوردات من غير ما تكتبهم بإيدك",
          desc: R`Identity هو نظام المستخدمين الجاهز: جداول users و roles و claims في EF Core، و hashing للباسوردات (PBKDF2)، وقواعد قوة الباسورد، و lockout بعد محاولات فاشلة، وتأكيد الإيميل، و 2FA.

من .NET 8 فيه [[MapIdentityApi<IdentityUser>()]] بيضيف endpoints جاهزة للـ APIs: [[/register]] و [[/login]] و [[/refresh]] و [[/confirmEmail]] و [[/forgotPassword]] و [[/manage/2fa]]. الـ login بيرجع يا cookie يا bearer token.

مهم: الـ bearer token بتاع Identity مش JWT. ده token مشفّر بـ Data Protection بيفهمه نفس التطبيق بس. لو محتاج JWT يتفهم من services تانية، اعمله انت (الدرس اللي فات) أو استخدم identity provider.`,
          example: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
#:package Microsoft.AspNetCore.Identity.EntityFrameworkCore@10.0.12
#:package Npgsql.EntityFrameworkCore.PostgreSQL@10.0.3
#:package Microsoft.EntityFrameworkCore.Relational@10.0.12
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDb>(o => o.UseNpgsql("Host=localhost;Database=shop_identity;Username=shop;Password=shop"));
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<AppDb>();
var app = builder.Build();
using (var scope = app.Services.CreateScope())
    scope.ServiceProvider.GetRequiredService<AppDb>().Database.EnsureCreated();
app.MapGroup("/account").MapIdentityApi<IdentityUser>();
app.MapGet("/me", (ClaimsPrincipal user) => new { name = user.Identity!.Name }).RequireAuthorization();
app.Run();
class AppDb(DbContextOptions<AppDb> o) : IdentityDbContext<IdentityUser>(o);`,
          try: R`شغّل الملف ده، وسجّل بباسورد ضعيف [["weak"]] واقرا الأخطاء. وبعدين سجّل بباسورد قوي، واعمل login، وخد الـ [[accessToken]] وجرّب [[/me]]. وفكّ التوكن بـ [[base64 -d]] زي JWT: بيطلع إيه؟`,
          flag: "script",
          deep: {
            why: R`كتابة نظام users من الصفر (hashing صح، و lockout، و reset password، و 2FA) مكان ممتاز لثغرات. Identity متختبر من سنين. وفي الشركات هتلاقيه في أغلب مشاريع .NET اللي مش بتستخدم identity provider خارجي.`,
            how: R`[[IdentityDbContext<IdentityUser>]] بيضيف جداول [[AspNetUsers]] و [[AspNetRoles]] و [[AspNetUserRoles]] و [[AspNetUserClaims]] و [[AspNetUserLogins]] و [[AspNetUserTokens]]، وبتعمل ليها migrations عادي. [[UserManager<T>]] و [[SignInManager<T>]] الـ services اللي بتستخدمها لو عايز endpoints بتاعتك.

[[AddIdentityApiEndpoints]] بيسجّل Identity + cookie scheme + bearer token scheme. [[/login]] بيرجع [[{"tokenType":"Bearer","accessToken":"...","expiresIn":3600,"refreshToken":"..."}]]، أو cookie لو بعت [[?useCookies=true]]. الـ tokens محمية بـ Data Protection keys: لو عندك كذا instance لازم يتشاركوا نفس المفاتيح (تخزنها في Redis أو DB أو ملف مشترك)، وإلا التوكن اللي طلع من instance مش هيتفهم في التانية. ونفس الكلام لو المفاتيح اتمسحت مع الـ container.

قواعد الباسورد والـ lockout بتتظبط في [[builder.Services.Configure<IdentityOptions>(o => ...)]].

[[EnsureCreated]] في المثال للتجربة بس: بيعمل الجداول من غير migrations، ومينفعش تعمل migrations بعده. في مشروع حقيقي [[dotnet ef migrations add Identity]].`,
            when: R`Identity لو التطبيق بيدير مستخدميه بنفسه (B2C صغير، لوحة تحكم). identity provider (Keycloak، Auth0، Entra ID، Cognito) لو فيه كذا تطبيق أو SSO أو متطلبات أمان عالية، والـ API ساعتها بيتحقق من JWT بس بـ [[Authority]]. وشوف «SSO للشركات» و «jose و JWKS» في «تاب APIs متقدمة».`,
            mistakes: R`تعمل hashing بإيدك بـ SHA256 من غير salt. وتفتكر توكن Identity JWT وتحاول تتحقق منه في service تانية. وتنسى Data Protection keys في Docker فكل restart يطلّع المستخدمين (فيه warning في اللوج: [[Storing keys in a directory ... that may not be persisted outside of the container]]). و [[EnsureCreated]] في الإنتاج.`
          },
          lines: [
            "claims.",
            "Identity.",
            "EF Identity stores.",
            "EF Core.",
            "builder.",
            R`الـ DbContext بتاع Identity (connection string مكتوب هنا للتجربة بس).`,
            "authorization.",
            "Identity + bearer tokens + cookies.",
            "الـ users في EF Core.",
            "build.",
            "scope مؤقت عشان الـ DbContext Scoped.",
            R`بيعمل الجداول لو مش موجودة (للتجربة، مش migrations).`,
            R`[[/account/register]] و [[/account/login]] وغيرهم.`,
            "endpoint محمية بتقرا اسم الـ user.",
            "run.",
            R`[[IdentityDbContext]] فيه جداول AspNetUsers وأخواتها.`
          ],
          sol: R`الباسورد الضعيف: 400 و [["errors":{"PasswordTooShort":["Passwords must be at least 6 characters."],"PasswordRequiresNonAlphanumeric":[...],"PasswordRequiresDigit":[...],"PasswordRequiresUpper":[...]}]]. بباسورد [[Str0ng!Pass]] الـ register بيرجع 200 من غير body، والـ login بيرجع [[{"tokenType":"Bearer","accessToken":"CfDJ8F6H...","expiresIn":3600,"refreshToken":"..."}]]. و [[/me]] بالتوكن بيرجع [[{"name":"sara@x.com"}]]، ومن غيره 401.

والفك بـ base64: مش هيطلع JSON. التوكن بيبدأ بـ [[CfDJ8]] (علامة Data Protection) وهو bytes مشفرة، مش header.payload.signature. عشان كده service تانية مش هتعرف تتحقق منه، والتطبيق نفسه لو اتعمله restart في container من غير ما تحفظ الـ keys، كل التوكنات القديمة هتبقى 401.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "xUnit، و NSubstitute و Moq للـ mocks، و WebApplicationFactory لاختبار الـ API كله",
      items: [
        {
          cmd: "xUnit",
          title: "xUnit: Fact و Theory و dotnet test",
          desc: R`xUnit أشهر test framework في .NET (فيه كمان NUnit و MSTest). الاختبار method عليها [[[Fact]]]، ولو نفس الاختبار بقيم مختلفة [[[Theory]]] مع [[[InlineData(...)]]]. والفحص بـ [[Assert.Equal(expected, actual)]] و [[Assert.True]] و [[Assert.ThrowsAsync<T>]] و [[Assert.Contains]].

الـ SDK فيه قالب [[dotnet new xunit]] (xUnit v2). النسخة الحالية xUnit v3، وليها قالب [[xunit3]] من حزمة [[xunit.v3.templates]]، ومشروع الاختبار فيها بيبقى exe وبيشتغل على Microsoft Testing Platform. الكود نفسه تقريبًا زي ما هو.

[[dotnet test]] بيبني ويشغّل كل الاختبارات، ولكل class instance جديد لكل اختبار (فمفيش state بيتسرب بين الاختبارات)، والـ setup بيبقى في الـ constructor.`,
          example: R`dotnet new install xunit.v3.templates
dotnet new xunit3 -o Shop.Tests -f net10.0
dotnet sln add Shop.Tests
dotnet reference add Shop.Api --project Shop.Tests
dotnet test
dotnet test --project Shop.Tests --filter-method "*Unknown*"`,
          try: R`اعمل مشروع الاختبار واكتب [[Theory]] لـ [[PriceFormatter.Format]] (من درس sln و NuGet) بـ ٣ قيم. وبعدين اكسر اختبار عمدًا وشوف شكل الفشل في الـ terminal.`,
          deep: {
            why: R`الـ API اللي مفيهوش اختبارات بيتكسر في كل refactor ومحدش بيعرف غير من المستخدمين. وفي الشركات الـ PR مش هيتدمج من غير اختبارات، والـ CI بيشغّل [[dotnet test]] على كل push (شوف «تاب GitHub Actions»).`,
            how: R`[[dotnet test]] بيبني مشروع الاختبار (اللي عامل reference للمشروع الأصلي)، والـ test runner بيدوّر على الـ methods اللي عليها [[[Fact]]] أو [[[Theory]]] ويشغّلها. الـ classes المختلفة ممكن تشتغل بالتوازي، والاختبارات جوه نفس الـ class بالترتيب.

في xUnit v3 بـ Microsoft Testing Platform: فيه [[global.json]] بيقول [["test": { "runner": "Microsoft.Testing.Platform" }]]، والفلترة بقت [[--filter-method]] و [[--filter-class]] بدل [[--filter]] القديمة. و [[TestContext.Current.CancellationToken]] بيتلغي لو الاختبار اتلغى، والـ analyzer بيحذرك (xUnit1051) لو مش بتبعته للـ async methods.

الـ setup المشترك الغالي (داتابيز، سيرفر) بيبقى في fixture: [[IClassFixture<T>]] لكل الاختبارات في class، و [[ICollectionFixture<T>]] لكذا class. والـ async setup بـ [[IAsyncLifetime]] ([[InitializeAsync]] و [[DisposeAsync]]).

الأسماء بالعرف بتوصف السلوك: [[Sends_receipt_when_payment_succeeds]] مش [[Test1]].`,
            when: R`unit tests لمنطق الـ domain والـ services (سريعة، من غير I/O). integration tests للـ endpoints مع داتابيز حقيقية (درس WebApplicationFactory). ومتختبرش الـ framework نفسه (إن [[[Required]]] بيشتغل).`,
            mistakes: R`[[async void]] في اختبار (الفشل مش بيتشاف): لازم [[async Task]]. و [[Assert.Equal(actual, expected)]] بالعكس فرسالة الفشل تلخبطك. واختبارات بتعتمد على بعض أو على الترتيب. واختبار بيستخدم [[DateTime.Now]] فينجح الصبح ويفشل بالليل: استخدم [[TimeProvider]] و [[FakeTimeProvider]].`
          },
          lines: [
            "قوالب xUnit v3 (مرة واحدة على الجهاز).",
            R`مشروع اختبار v3 على .NET 10 (الافتراضي في القالب net8.0).`,
            "ضيفه للـ solution.",
            "يقدر يشوف كود الـ API.",
            R`كل الاختبارات: [[Test run summary: Passed! total: 8]].`,
            "اختبارات معينة بالاسم (فلترة Microsoft Testing Platform)."
          ],
          sol: R`[[[Theory] [InlineData(19.5, "19.50 EGP")] [InlineData(0, "0.00 EGP")] [InlineData(1234.567, "1234.57 EGP")] public void Formats_prices(decimal price, string expected) => Assert.Equal(expected, PriceFormatter.Format(price));]]. خد بالك: [[InlineData]] مبيقبلش decimal literals ([[19.5m]]) لأن الـ attributes في C# مبتقبلش decimal، فبتكتب double والـ xUnit بيحوّل للـ parameter. جرّبناها: التلات حالات عدّوا (والمجموع بقى [[total: 11]] مع باقي اختبارات المشروع).

الفشل شكله: [[failed Shop.Tests.ProductApiTests.Creating_a_product_needs_the_admin_role (270ms)]] وتحته [[Assert.Equal() Failure: Values differ]] و [[Expected: Created]] و [[Actual: Forbidden]] واسم الملف ورقم السطر، وفي الآخر [[Test run summary: Failed!]] و exit code غير صفر (فالـ CI بيقع). لو [[dotnet test]] مش لاقي اختبارات: اتأكد إن الـ class [[public]] والـ method [[public]] وعليها [[[Fact]]].`,
          solCode: R`using Shop.Core;

namespace Shop.Tests;

public class PriceFormatterTests
{
    [Theory]
    [InlineData(19.5, "19.50 EGP")]
    [InlineData(0, "0.00 EGP")]
    [InlineData(1234.567, "1234.57 EGP")]
    public void Formats_prices(decimal price, string expected) =>
        Assert.Equal(expected, PriceFormatter.Format(price));
}`
        },
        {
          cmd: "NSubstitute و Moq",
          title: "mocks: تختبر service من غير payment gateway ولا إيميلات حقيقية",
          desc: R`الـ service اللي بتاخد [[IPaymentGateway]] و [[IEmailSender]] في الـ constructor تقدر تختبرها بـ implementations مزيفة: بتقولها «لو اتنادت بالقيم دي رجّع true»، وبعدين تتأكد «اتنادت مرة بالقيم دي؟».

NSubstitute: [[Substitute.For<IPaymentGateway>()]]، و [[.Returns(true)]]، و [[.Received(1).SendAsync(...)]]. Moq: [[new Mock<IPaymentGateway>()]]، و [[.Setup(...).ReturnsAsync(true)]]، و [[.Verify(..., Times.Once)]]. الاتنين بيعملوا نفس الحاجة، و NSubstitute syntax بتاعه أقصر. واللي بيخلي ده ممكن أصلًا هو إن الـ dependencies interfaces (درس interface).`,
          example: R`public class CheckoutServiceTests
{
    private readonly IPaymentGateway _payments = Substitute.For<IPaymentGateway>();
    private readonly IEmailSender _email = Substitute.For<IEmailSender>();
    private readonly CheckoutService _sut;
    public CheckoutServiceTests() => _sut = new CheckoutService(_payments, _email);
    [Fact]
    public async Task Sends_receipt_when_payment_succeeds()
    {
        _payments.ChargeAsync("sara@x.com", 150m, Arg.Any<CancellationToken>()).Returns(true);
        var ok = await _sut.PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken);
        Assert.True(ok);
        await _email.Received(1).SendAsync("sara@x.com", "Paid 150.00 EGP", Arg.Any<CancellationToken>());
    }
    [Fact]
    public async Task No_email_when_payment_fails()
    {
        _payments.ChargeAsync(default!, default, default).ReturnsForAnyArgs(false);
        Assert.False(await _sut.PayAsync("sara@x.com", 150m, TestContext.Current.CancellationToken));
        await _email.DidNotReceiveWithAnyArgs().SendAsync(default!, default!, default);
    }
}`,
          try: R`اكتب [[CheckoutService]] (بتشحن الفلوس، ولو نجحت تبعت إيميل) وشغّل الاختبارين. وبعدين اكتب اختبار تالت: لو الـ payment رمى [[HttpRequestException]]، الـ service لازم ترمي نفس الـ exception ومتبعتش إيميل. استخدم [[.ThrowsAsync(...)]] من [[NSubstitute.ExceptionExtensions]]. واكتب واحد منهم بـ Moq للمقارنة.`,
          flag: "script",
          deep: {
            why: R`الـ unit test لازم يبقى سريع ومحدد: لو بيكلم Stripe فعلًا هيبقى بطيء ومكلف وبيفشل لأسباب ملهاش علاقة بالكود. الـ mocks بتعزل الـ service وبتخليك تختبر حالات صعب تعملها في الحقيقة (الـ gateway واقع، أو رجّع رفض).`,
            how: R`الاتنين بيولّدوا class وقت التشغيل (بـ Castle DynamicProxy) بتطبق الـ interface وبتسجل كل نداء. [[Returns]] بيحدد الرد لـ arguments معينة، و [[Arg.Any<T>()]] (أو [[It.IsAny<T>()]] في Moq) لأي قيمة. أي نداء مش متعرّف بيرجع default (false أو null أو Task مكتمل).

[[Received(1)]] بيفحص إن النداء حصل مرة بالظبط بالقيم دي، ولو محصلش بيرمي exception فيه النداءات اللي حصلت فعلًا. [[DidNotReceiveWithAnyArgs]] إن محصلش نداء خالص.

[[_sut]] (system under test) بيتعمل في الـ constructor، و xUnit بيعمل instance جديد لكل اختبار، فكل اختبار بـ mocks نضيفة.

للـ classes (مش interfaces) الـ mocking بيشتغل على [[virtual]] members بس، وده سبب إضافي إن الـ dependencies تبقى interfaces. و [[DbContext]] متعملوش mock: استخدم داتابيز حقيقية في integration test (أو SQLite in-memory لو لازم).`,
            when: R`mocks للـ dependencies اللي برّه حدودك: payment، email، SMS، HTTP APIs، الوقت ([[FakeTimeProvider]]). مش لكل حاجة: لو الـ service بتنادي class حسابات بحتة، استخدم الحقيقية. وكتير من الفرق بتفضّل integration tests للـ API وتقلل الـ mocks.`,
            mistakes: R`تعمل mock للـ DbContext أو [[IQueryable]] (بيعدّي في الاختبار ويقع مع SQL الحقيقي). و verify على كل نداء فالاختبار يتكسر مع أي refactor (اختبر النتيجة، و verify على الـ side effects المهمة بس). ومعلومة بتتسأل: في ٢٠٢٣ Moq 4.20 ضاف SponsorLink (بيقرا إيميل الـ git وقت الـ build) واتشال بعد اعتراضات، وده خلى فرق كتير تنقل لـ NSubstitute.`
          },
          lines: [
            "class الاختبارات.",
            "بداية.",
            "mock للـ payment.",
            "mock للإيميل.",
            "الـ service اللي بنختبرها.",
            "instance جديد لكل اختبار = mocks جديدة.",
            "اختبار.",
            R`[[async Task]] مش void.`,
            "بداية.",
            "Arrange: الـ payment هيرجع true للقيم دي.",
            R`Act: نادي الـ service بالـ token بتاع الاختبار.`,
            "Assert: النتيجة.",
            "Assert: الإيميل اتبعت مرة بالنص ده بالظبط.",
            "نهاية.",
            "اختبار تاني.",
            "method.",
            "بداية.",
            "أي arguments = false.",
            "رجّع false.",
            "ومفيش إيميل خالص.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`[[dotnet test]] بيطلع [[total: 5, succeeded: 5]] (الاختبارين + [[Theory]] بقيمتين لـ [[total <= 0]] + نسخة Moq). اختبار الـ exception: [[_payments.ChargeAsync(default!, default, default).ThrowsAsyncForAnyArgs(new HttpRequestException("gateway down"));]] ثم [[await Assert.ThrowsAsync<HttpRequestException>(() => _sut.PayAsync("a@b.c", 10m));]] و [[await _email.DidNotReceiveWithAnyArgs().SendAsync(default!, default!, default);]].

بـ Moq: [[payments.Setup(p => p.ChargeAsync("sara@x.com", 150m, It.IsAny<CancellationToken>())).ReturnsAsync(true);]] و [[email.Verify(e => e.SendAsync("sara@x.com", It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);]]، والـ object بيتبعت بـ [[payments.Object]]. ولو الـ Received فشل (جرّبنا نغيّر النص المتوقع لـ [["Paid 150 EGP"]]) الرسالة: [[Expected to receive exactly 1 call matching: SendAsync("sara@x.com", "Paid 150 EGP", any CancellationToken) Actually received no matching calls.]] وتحتها [[Received 1 non-matching call (non-matching arguments indicated with '*' characters): SendAsync("sara@x.com", *"Paid 150.00 EGP"*, ...)]]. النجوم بتوريك الـ argument اللي مختلف بالظبط.`,
          solCode: R`namespace Shop.Api.Services;

public interface IPaymentGateway { Task<bool> ChargeAsync(string email, decimal amount, CancellationToken ct); }
public interface IEmailSender { Task SendAsync(string to, string subject, CancellationToken ct); }

public class CheckoutService(IPaymentGateway payments, IEmailSender email)
{
    public async Task<bool> PayAsync(string customer, decimal total, CancellationToken ct = default)
    {
        if (total <= 0) throw new ArgumentOutOfRangeException(nameof(total));
        var ok = await payments.ChargeAsync(customer, total, ct);
        if (ok) await email.SendAsync(customer, $"Paid {total:0.00} EGP", ct);
        return ok;
    }
}`
        },
        {
          cmd: "WebApplicationFactory",
          title: "WebApplicationFactory: تختبر الـ API كله بـ HTTP وداتابيز حقيقية",
          desc: R`[[WebApplicationFactory<Program>]] (حزمة [[Microsoft.AspNetCore.Mvc.Testing]]) بيشغّل التطبيق بتاعك كله في الذاكرة، بنفس [[Program.cs]] ونفس الـ middleware والـ DI، ويديك [[HttpClient]] تبعت بيه requests حقيقية. مفيش بورت ولا شبكة، فسريع.

بتعدّل فيه اللي محتاجه للاختبار: environment اسمه [[Testing]]، و connection string لداتابيز اختبار، و [[ConfigureTestServices]] تشيل الـ background services أو تبدّل الـ payment gateway بـ fake.

الـ factory محتاجة توصل لـ [[Program]]. الـ top-level statements بتعمل [[Program]] internal، بس من .NET 10 الـ Web SDK بيولّد [[public partial class Program]] لوحده، فمش محتاج تكتب حاجة (لو كتبت [[public partial class Program;]] بإيدك الـ analyzer بيقولك إنها زيادة: ASP0027). في .NET 8 و 9 لازم تكتبها في آخر [[Program.cs]].`,
          example: R`public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("ConnectionStrings:Shop", "Host=localhost;Database=shop_test;Username=shop;Password=shop");
        builder.UseSetting("Jwt:Key", "test-key-test-key-test-key-test-key-1234");
        builder.ConfigureTestServices(services => services.RemoveAll<IHostedService>());
    }
    public async ValueTask InitializeAsync()
    {
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
        await db.Database.EnsureDeletedAsync();
        await db.Database.EnsureCreatedAsync();
        db.Products.Add(new Product { Name = "Blue pen", Price = 5.5m, Stock = 10, Category = new Category { Name = "Pens" } });
        await db.SaveChangesAsync();
    }
}
public class ProductApiTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    [Fact]
    public async Task Unknown_product_returns_problem_details_404()
    {
        var res = await factory.CreateClient().GetAsync("/api/products/9999", TestContext.Current.CancellationToken);
        Assert.Equal(HttpStatusCode.NotFound, res.StatusCode);
        Assert.Equal("application/problem+json", res.Content.Headers.ContentType?.MediaType);
    }
}`,
          try: R`اكتب اختبار [[Creating_a_product_needs_the_admin_role]]: نفس الـ POST تلات مرات (من غير توكن، وبتوكن user، وبتوكن admin) وتتأكد من 401 و 403 و 201. التوكن اعمله من [[TokenService]] اللي في [[factory.Services]]. وبعدين ضيف في آخر [[Program.cs]] سطر [[partial class Program { }]] (من غير [[public]]) وشوف الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ unit tests مش بتختبر الـ routing والـ binding والـ validation والـ auth والـ EF mapping مع بعض، ودول مكان أغلب الـ bugs في API. اختبار integration واحد بيعدي على كل الطبقات بيمسك حاجات عشر unit tests مش هيمسكوها. نفس فكرة supertest في «تاب Backend بـ Node».`,
            how: R`الـ factory بيشغّل [[Program.cs]] بـ [[TestServer]] بدل Kestrel: الـ [[HttpClient]] اللي بيرجع من [[CreateClient()]] بيبعت الـ requests في الذاكرة مباشرة للـ pipeline.

[[UseSetting]] بيحط قيم configuration بدري كفاية إن [[Program.cs]] يشوفها وهو بيسجّل الـ services (زي [[GetConnectionString]] اللي بيتقري وقت [[AddDbContext]]). [[ConfigureTestServices]] بيشتغل بعد تسجيلات [[Program.cs]]، فتقدر تشيل أو تبدّل ([[RemoveAll<T>]] ثم [[AddSingleton<T>(fake)]]).

[[IClassFixture<ApiFactory>]] بيعمل factory واحدة لكل الاختبارات في الـ class (التطبيق بيقوم مرة). و [[IAsyncLifetime]] على الـ factory بيجهّز الداتابيز قبل أول اختبار. [[factory.Services]] هو الـ DI container الحقيقي، فتقدر تطلب منه services (بـ scope للـ scoped).

الداتابيز: Postgres حقيقي أحسن من in-memory provider (اللي مبيعملش constraints ولا SQL حقيقي). في CI: service container في GitHub Actions، أو Testcontainers ([[Testcontainers.PostgreSql]]) بيقوّم Postgres في Docker لكل test run.`,
            when: R`اختبار أو اتنين لكل endpoint: الحالة السعيدة، والـ validation، والـ auth (401 و 403)، و 404. الـ edge cases الكتير في unit tests على الـ service. وخلي الداتابيز تتعمل من الأول في كل run عشان الاختبارات متعتمدش على داتا قديمة.`,
            mistakes: R`تستخدم in-memory provider وتفتكر إن الـ unique indexes اتختبرت. وتنسى [[public partial class Program;]] على .NET 8 أو 9، أو تكتب [[partial class Program]] من غير [[public]] فتقفله. وتسيب الـ BackgroundService شغال في الاختبارات فيعمل queries عشوائية. واختبارات بتعدّل نفس الصفوف بالتوازي من classes مختلفة. ونسخ EF مختلفة في مشروع الاختبار فيقع بـ [[ReflectionTypeLoadException]] (حصلت هنا: شوف درس DbContext).`
          },
          lines: [
            R`factory لـ [[Program]] (public لوحده من .NET 10).`,
            "بداية.",
            "تعديل الـ host قبل ما يقوم.",
            "بداية.",
            R`environment مش Development ولا Production.`,
            "داتابيز منفصلة للاختبار.",
            R`مفتاح JWT للاختبار (وبرضه [[Jwt:Issuer]] و [[Jwt:Audience]] في الكود الكامل).`,
            R`شيل الـ BackgroundServices: [[RemoveAll]] من [[Microsoft.Extensions.DependencyInjection.Extensions]].`,
            "نهاية.",
            "قبل أول اختبار.",
            "بداية.",
            "scope للـ DbContext.",
            "الـ context الحقيقي من الـ DI.",
            "امسح.",
            "واعمل الـ schema من الـ model.",
            "seed.",
            "احفظ.",
            "نهاية.",
            "نهاية.",
            R`class الاختبارات بتاخد الـ factory كـ fixture.`,
            "بداية.",
            "اختبار.",
            "method.",
            "بداية.",
            R`request حقيقي في الذاكرة.`,
            "404.",
            "و ProblemDetails.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`الاختبار:

[[var anonymous = await client.PostAsJsonAsync("/api/products", body, ct);]] ثم [[client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: false));]] ونفس الـ POST، ثم بتوكن admin. والـ asserts: [[Unauthorized]] و [[Forbidden]] و [[Created]]. والتوكن: [[using var scope = factory.Services.CreateScope(); scope.ServiceProvider.GetRequiredService<TokenService>().Create("u1", "u1@test.com", admin ? ["admin"] : []);]] لأن [[TokenService]] Scoped. عندنا الـ ٨ اختبارات عدّوا في ٣ ثواني تقريبًا مع Postgres حقيقي.

بعد [[partial class Program { }]] من غير [[public]]: [[error CS0122: 'Program' is inaccessible due to its protection level]] في مشروع الاختبار، لأن الـ partial بتاعك من غير modifier بيخلي الـ class كلها internal وبيلغي الـ public اللي الـ SDK بيولّده. شيله أو اكتبه [[public partial class Program;]] (وده اللي كان لازم دايمًا في .NET 8 و 9). جرّبناها على .NET 10: من غير أي سطر الـ factory شغالة. (بديل: [[InternalsVisibleTo]] في الـ csproj.)`,
          solCode: R`[Fact]
public async Task Creating_a_product_needs_the_admin_role()
{
    var ct = TestContext.Current.CancellationToken;
    var client = factory.CreateClient();
    var body = new CreateProduct("Red pen", 6m, 5, 1);
    var anonymous = await client.PostAsJsonAsync("/api/products", body, ct);
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: false));
    var user = await client.PostAsJsonAsync("/api/products", body, ct);
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token(admin: true));
    var admin = await client.PostAsJsonAsync("/api/products", body, ct);
    Assert.Equal(HttpStatusCode.Unauthorized, anonymous.StatusCode);
    Assert.Equal(HttpStatusCode.Forbidden, user.StatusCode);
    Assert.Equal(HttpStatusCode.Created, admin.StatusCode);
}

private string Token(bool admin)
{
    using var scope = factory.Services.CreateScope();
    var tokens = scope.ServiceProvider.GetRequiredService<TokenService>();
    return tokens.Create("u1", "u1@test.com", admin ? ["admin"] : []);
}`
        }
      ]
    },
    {
      t: "شغل في الخلفية و caching و HttpClient",
      l: 3,
      n: "BackgroundService و IServiceScopeFactory، و HybridCache و output caching، و IHttpClientFactory",
      items: [
        {
          cmd: "BackgroundService",
          title: "BackgroundService: شغل دوري جوه نفس التطبيق",
          desc: R`لو محتاج حاجة تشتغل في الخلفية (تنضيف كل ساعة، تقرير مخزون، consumer لـ queue)، اعمل class بتورث [[BackgroundService]] وتعمل override لـ [[ExecuteAsync(CancellationToken stoppingToken)]]، وسجّلها بـ [[AddHostedService<T>()]]. بتقوم مع التطبيق وبتقف معاه.

الـ hosted service Singleton، فمينفعش تطلب [[ShopDb]] (Scoped) في الـ constructor. خد [[IServiceScopeFactory]] واعمل scope جديد في كل دورة.

و [[PeriodicTimer]] أنضف من [[Task.Delay]] في loop: مبيتراكمش، وبيحترم الإلغاء.`,
          example: R`public class LowStockReporter(IServiceScopeFactory scopes, ILogger<LowStockReporter> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(10));
        do
        {
            try
            {
                await using var scope = scopes.CreateAsyncScope();
                var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
                var low = await db.Products.CountAsync(p => p.Stock < 5, stoppingToken);
                logger.LogInformation("Low stock products: {Count}", low);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogError(ex, "Low stock check failed");
            }
        } while (await timer.WaitForNextTickAsync(stoppingToken));
    }
}
builder.Services.AddHostedService<LowStockReporter>();`,
          try: R`شغّل التطبيق وبص على اللوج كل ١٠ ثواني. وبعدين اطفي Postgres ([[sudo service postgresql stop]]) وشوف التطبيق بيعمل إيه، وشغّله تاني. وجرّب تشيل الـ try/catch وتعمل نفس التجربة.`,
          flag: "script",
          deep: {
            why: R`حاجات كتير مش جزء من request: إيميلات متأخرة، وتنضيف توكنات منتهية، وsync مع API تاني. في Node بتحطها في cron أو worker منفصل. في .NET تقدر تحطها جوه نفس البروسيس بسهولة، وده كفاية لحد ما الشغل يكبر.`,
            how: R`الـ host بينادي [[StartAsync]] لكل hosted service وقت الـ startup، و [[BackgroundService]] بينادي [[ExecuteAsync]] ويسيبها شغالة. وقت الإيقاف (Ctrl+C أو SIGTERM من Docker أو systemd) بيلغي [[stoppingToken]] ويستنى لحد [[HostOptions.ShutdownTimeout]] (٣٠ ثانية افتراضيًا).

من .NET 8 أي exception مش ممسوك جوه [[ExecuteAsync]] بيوقف التطبيق كله ([[BackgroundServiceExceptionBehavior.StopHost]]) وبيسجل [[BackgroundService failed]]. عشان كده الـ try/catch جوه الـ loop مهم: دورة فشلت متوقعش السيرفر. والـ [[when (ex is not OperationCanceledException)]] عشان الإلغاء وقت الإيقاف يعدّي طبيعي.

[[CreateAsyncScope]] بيعمل scope زي بتاع الـ request: DbContext جديد لكل دورة، وبيتعمله dispose في الآخر. و [[PeriodicTimer.WaitForNextTickAsync]] بيرجع false أو بيرمي لما الـ token يتلغي.

لو التطبيق شغال على كذا instance، الـ background service بيشتغل على كل واحدة: محتاج lock موزع (Redis، أو [[pg_advisory_lock]]) أو scheduler خارجي.`,
            when: R`شغل خفيف ودوري جوه API واحد. لشغل تقيل أو محتاج retries و scheduling حقيقي: queue (RabbitMQ، Azure Service Bus، SQS) مع worker منفصل ([[dotnet new worker]])، أو مكتبة زي Hangfire أو Quartz.NET. وللـ cron على السيرفر شوف «systemd timer» في «تاب VPS».`,
            mistakes: R`تطلب DbContext في الـ constructor: [[Cannot consume scoped service 'ShopDb' from singleton]]. ومفيش try/catch فأول خطأ شبكة يقفل التطبيق كله. وتتجاهل [[stoppingToken]] فالإيقاف ياخد ٣٠ ثانية ويتقتل. وشغل تقيل CPU في الـ ExecuteAsync بيسرق من الـ requests.`
          },
          lines: [
            R`بتورث [[BackgroundService]]، وبتاخد [[IServiceScopeFactory]] مش الـ DbContext.`,
            "بداية.",
            R`بتتنادى مرة وقت الـ startup، والـ token بيتلغي وقت الإيقاف.`,
            "بداية.",
            R`timer كل ١٠ ثواني، و [[using]] عشان يقفل.`,
            R`[[do]]: أول دورة على طول من غير ما تستنى.`,
            "بداية.",
            "try جوه الـ loop.",
            "بداية.",
            "scope جديد لكل دورة = DbContext جديد.",
            "الـ context من الـ scope.",
            R`[[SELECT count(*) ... WHERE "Stock" < 5]].`,
            "structured log.",
            "نهاية.",
            "أي خطأ إلا الإلغاء.",
            "بداية.",
            "سجّل وكمّل للدورة الجاية بدل ما تقع.",
            "نهاية.",
            R`استنى الـ tick الجاي، أو اخرج لما التطبيق يقف.`,
            "نهاية.",
            "نهاية.",
            "تسجيل."
          ],
          sol: R`اللوج كل ١٠ ثواني: [[info: Shop.Api.Services.LowStockReporter[0] Low stock products: 1]] ومعاه الـ SQL لو EF Command على Information. بعد ما Postgres يقف: [[fail: ... Low stock check failed]] ومعاه [[Npgsql.NpgsqlException: Failed to connect to 127.0.0.1:5432]]، والتطبيق لسه شغال، والـ API نفسه بيرجع 500 للـ endpoints اللي محتاجة الداتابيز بس. أول ما Postgres يرجع، الدورة الجاية تنجح لوحدها.

من غير الـ try/catch: أول فشل بيطلّع [[fail: Microsoft.Extensions.Hosting.Internal.Host[9] BackgroundService failed]] وبعدها [[The HostOptions.BackgroundServiceExceptionBehavior is configured to StopHost]] والتطبيق كله بيقف، حتى الـ endpoints اللي ملهاش علاقة. في الإنتاج systemd أو Docker هيعيد تشغيله، بس الأحسن متوصلش لكده.`
        },
        {
          cmd: "HybridCache و output caching",
          title: "caching: HybridCache للداتا و Output Cache للردود كاملة",
          desc: R`[[HybridCache]] (حزمة [[Microsoft.Extensions.Caching.Hybrid]]، من .NET 9) هو الـ API الموصى بيه للـ cache: [[GetOrCreateAsync(key, factory)]] بيرجع من الـ cache أو بينادي الـ factory مرة واحدة حتى لو ١٠٠ request طلبوا نفس المفتاح مع بعض (stampede protection). وبيشتغل على طبقتين: ذاكرة محلية + distributed cache (Redis) لو سجلته.

Output caching ([[AddOutputCache]] و [[.CacheOutput()]]) بيكاش الـ HTTP response كله على السيرفر: الـ endpoint مش بيتنادى أصلًا طول مدة الـ cache.

وفيه [[IMemoryCache]] القديم (ذاكرة بس، من غير stampede protection)، والـ response caching (headers للـ browser و CDN زي [[Cache-Control]]).`,
          example: R`builder.Services.AddHybridCache(o => o.DefaultEntryOptions = new() { Expiration = TimeSpan.FromMinutes(5) });
builder.Services.AddOutputCache();
app.UseOutputCache();
app.MapGet("/products/{id:int}", async (int id, HybridCache cache, ShopDb db, CancellationToken ct) =>
    await cache.GetOrCreateAsync($"product:{id}", async token =>
        await db.Products.Where(p => p.Id == id)
            .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
            .FirstOrDefaultAsync(token),
        tags: ["products"], cancellationToken: ct));
app.MapPut("/products/{id:int}/price", async (int id, decimal price, ShopDb db, HybridCache cache) =>
{
    await db.Products.Where(p => p.Id == id).ExecuteUpdateAsync(s => s.SetProperty(p => p.Price, price));
    await cache.RemoveAsync($"product:{id}");
    return Results.NoContent();
});
app.MapGet("/time", () => DateTime.UtcNow.ToString("HH:mm:ss.fff"))
    .CacheOutput(p => p.Expire(TimeSpan.FromSeconds(10)));`,
          try: R`اعمل endpoint فيه [[await Task.Delay(200)]] جوه الـ factory وعداد بيزيد مع كل نداء للـ factory، واطلبه ٣ مرات وقيس الوقت ([[curl -w "%{time_total}"]]). وبعدين امسح المفتاح واطلبه تاني. وكمان اطلب [[/time]] مرتين ورا بعض.`,
          flag: "script",
          deep: {
            why: R`أرخص query هي اللي متتعملش. صفحة المنتج بتتقري آلاف المرات وبتتغير مرة في اليوم. بس الـ cache من غير خطة invalidation بيعرض أسعار قديمة، والـ cache اللي بيفضى فجأة تحت ضغط بيخلي كل الـ requests تضرب الداتابيز مع بعض (stampede).`,
            how: R`[[GetOrCreateAsync]]: يدوّر في الـ L1 (الذاكرة)، بعدين الـ L2 (لو فيه [[IDistributedCache]] متسجل زي Redis بـ [[AddStackExchangeRedisCache]])، ولو مش لاقي ينادي الـ factory، ولو كذا request على نفس المفتاح في نفس اللحظة واحد بس بينادي والباقي بيستنوا نتيجته. القيم بتتعمل serialize لما تروح L2.

الـ tags ([["products"]]) بتخليك تمسح مجموعة مفاتيح مرة واحدة بـ [[RemoveByTagAsync("products")]]. و [[RemoveAsync(key)]] بعد أي تعديل. و [[LocalCacheExpiration]] ممكن تبقى أقصر من [[Expiration]] عشان النسخ المحلية على كذا سيرفر متفضلش قديمة كتير.

Output cache: الـ middleware بيخزن الـ status والـ headers والـ body بمفتاح من الـ path والـ query، ويرجّعه من غير ما الـ endpoint يشتغل. افتراضيًا بيكاش GET و HEAD بـ 200 بس ومش بيكاش لو الـ request فيه auth. وفيه tags و [[IOutputCacheStore.EvictByTagAsync]]، ولو كذا instance تقدر تخزنه في Redis.

الـ cache بيخزن نتيجة الـ factory حتى لو null، فمنتج مش موجود هيتكاش كـ null لنفس المدة (ده كويس ضد الـ spam، بس خليك عارف).`,
            when: R`HybridCache لداتا بتتقري كتير ومش لازم تبقى لحظية (كتالوج، إعدادات، أسعار الصرف). Output cache لـ endpoints عامة من غير auth وبتتطلب كتير. [[Cache-Control]] headers للـ CDN والمتصفح (شوف «ETag و Cache-Control» في «تاب APIs متقدمة»). ومتكاشش داتا خاصة بمستخدم بمفتاح مفيهوش الـ user id.`,
            mistakes: R`تنسى تمسح الـ cache بعد التعديل. ومفتاح cache مش فيه كل اللي بيأثر على النتيجة (اللغة، الـ tenant، الـ user). و [[IMemoryCache]] على كذا instance فكل سيرفر يعرض نسخة. وتكاش entities متتبعة من EF أو objects بتتعدّل بعد التخزين (الـ L1 بيرجع نفس الـ object لو [[ImmutableObject]]، وإلا نسخة).`
          },
          lines: [
            "HybridCache بمدة افتراضية ٥ دقايق.",
            "output cache services.",
            "output cache middleware.",
            "endpoint بيقرا من الـ cache الأول.",
            R`المفتاح [[product:1]]، والـ factory بتتنادى بس لو مش موجود.`,
            "الـ query.",
            "projection لـ DTO (مش entity متتبعة).",
            "تنفيذ بالـ token بتاع الـ factory.",
            R`tag للمسح الجماعي، و token الـ request.`,
            "تعديل.",
            "بداية.",
            "UPDATE مباشر.",
            "امسح المفتاح عشان القراية الجاية تجيب الجديد.",
            "204.",
            "نهاية.",
            "endpoint بسيط.",
            "الرد كله متكاش ١٠ ثواني: الـ handler مش بيتنادى."
          ],
          sol: R`عندنا: أول request [[0.465s]] (الـ factory اشتغلت: 200ms delay + أول مرة)، والتاني [[0.0035s]]، والتالت [[0.0016s]]، والعداد [[{"dbCalls":1}]]. بعد [[RemoveAsync]] الـ request الجاي نادى الـ factory تاني والعداد بقى 2.

[[/time]] مرتين ورا بعض بيرجع نفس الوقت بالظبط ([[04:28:34.703]] في الاتنين) لحد ما العشر ثواني يخلصوا، لأن الـ endpoint نفسه مش بيتنادى. لو لقيت الوقت بيتغير: اتأكد إن [[app.UseOutputCache()]] موجود، وإنك مش باعت [[Authorization]] header، وإن الـ middleware بعد [[UseCors]] وقبل الـ endpoints.`
        },
        {
          cmd: "IHttpClientFactory",
          title: "HttpClient صح: IHttpClientFactory و typed clients و retries",
          desc: R`[[new HttpClient()]] في كل request غلطة مشهورة: كل واحد بيفتح connections جديدة، وتحت الضغط بتخلص الـ sockets. و HttpClient واحد static للأبد مشكلته إنه مش بيشوف تغيير الـ DNS.

الحل: [[builder.Services.AddHttpClient<RatesClient>(c => c.BaseAddress = ...)]]. ده typed client: class بتاخد [[HttpClient]] في الـ constructor، والـ factory بيديها client جاهز بالإعدادات، والـ connections بتتشارك وبتتجدد لوحدها.

وللـ resilience (retries، timeout، circuit breaker) فيه [[Microsoft.Extensions.Http.Resilience]]: [[.AddStandardResilienceHandler()]] سطر واحد فوق الـ AddHttpClient.`,
          example: R`builder.Services.AddHttpClient<RatesClient>(c =>
{
    c.BaseAddress = new Uri("https://api.nuget.org/");
    c.Timeout = TimeSpan.FromSeconds(5);
});
app.MapGet("/nuget", async (RatesClient c, CancellationToken ct) => await c.GetVersionAsync(ct));
class RatesClient(HttpClient http)
{
    public async Task<string> GetVersionAsync(CancellationToken ct)
    {
        var doc = await http.GetFromJsonAsync<JsonElement>("v3/index.json", ct);
        return doc.GetProperty("version").GetString()!;
    }
}`,
          try: R`ضيف [[Microsoft.Extensions.Http.Resilience]] و [[.AddStandardResilienceHandler()]] على الـ client، وخلي الـ BaseAddress يشاور على حاجة مش موجودة ([[http://localhost:1/]]). بص على اللوج: كام محاولة اتعملت قبل ما يستسلم؟`,
          flag: "script",
          deep: {
            why: R`أي API بيكلم APIs تانية: payment، شحن، SMS، AI. التعامل الغلط مع HttpClient بيوقع السيرفر تحت الضغط، وغياب الـ timeouts والـ retries بيخلي service تانية بطيئة توقف API بتاعك كله.`,
            how: R`[[HttpClient]] نفسه wrapper خفيف، والتقيل هو الـ [[HttpMessageHandler]] (الـ connection pool). الـ factory بيعمل handlers ويعيد استخدامها لمدة (دقيقتين افتراضيًا) وبعدين يجددها عشان الـ DNS، ويدي كل typed client instance جديد من [[HttpClient]] فوق handler مشترك. الـ typed client نفسه بيتسجل Transient.

[[GetFromJsonAsync<T>]] من [[System.Net.Http.Json]]: GET + فحص إن الـ status نجاح (وإلا [[HttpRequestException]]) + deserialize. و [[c.Timeout]] للـ request كله، و [[CancellationToken]] الـ request فوقه.

[[AddStandardResilienceHandler]] (مبني على Polly v8) بيضيف: rate limiter، و timeout كلي (30 ثانية)، و retry (3 مرات بـ exponential backoff و jitter، على 5xx و 408 و 429 وأخطاء الشبكة)، و circuit breaker (لو نسبة الفشل عالية بيوقف المحاولات شوية)، و timeout لكل محاولة (10 ثواني).

وفيه named clients ([[AddHttpClient("github", ...)]] و [[IHttpClientFactory.CreateClient("github")]]) لو مش عايز class.`,
            when: R`دايمًا [[AddHttpClient]] في ASP.NET Core. typed client لكل API خارجي، والمنطق (URLs والـ DTOs) جواه مش متفرق. resilience handler على أي API برّه شبكتك، ومش على الـ POST اللي مش idempotent من غير Idempotency-Key (شوف «Idempotency-Key» في «تاب APIs متقدمة»).`,
            mistakes: R`[[using var client = new HttpClient()]] في كل request (socket exhaustion). و typed client Singleton أو تتحقن في Singleton (بيمسك handler قديم للأبد، ومش بيشوف الـ DNS). ومفيش timeout (الافتراضي 100 ثانية). و retry على POST بيدفع فلوس فيدفع مرتين.`
          },
          lines: [
            R`typed client: بيتسجل ومعاه الإعدادات.`,
            "بداية.",
            "كل الـ requests relative للـ URL ده.",
            "timeout.",
            "نهاية.",
            R`الـ endpoint بياخد الـ client من الـ DI.`,
            R`class عادية بتاخد [[HttpClient]] جاهز.`,
            "بداية.",
            "method.",
            "بداية.",
            "GET وفحص الـ status و JSON في سطر.",
            R`[[3.0.0]]: نسخة الـ NuGet API.`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`[[/nuget]] بيرجع [[3.0.0]]. مع [[AddStandardResilienceHandler]] و [[localhost:1]]: اللوج بيطلّع [[Execution attempt. Source: 'RatesClient-standard//Standard-Retry', Operation Key: '', Result: 'Connection refused (localhost:1)', Handled: 'True', Attempt: '0']] وبعدين Attempt 1 و 2 و 3 بتأخير بيزيد (٢ ثانية تقريبًا بـ jitter)، يعني ٤ محاولات (الأصلية + ٣ retries)، والـ request كله أخد حوالي ٩ ثواني عندنا، وبعدها [[HttpRequestException]] والـ endpoint بيرجع 500. خد بالك إن [[HttpClient.Timeout]] (5 ثواني في المثال) بيلف كل المحاولات، فلو سبته 5 هيقطع قبل ما الـ retries تخلص: مع الـ resilience handler كبّره أو سيب الـ handler هو اللي يتحكم في الـ timeouts.

لو الـ API التاني وقع خالص، بعد كام request الـ circuit breaker بيفتح والطلبات بتفشل فورًا بـ [[BrokenCircuitException]] من غير ما تستنى، وده اللي بيحمي API بتاعك. الأرقام الدقيقة ممكن تختلف حسب نسخة المكتبة، فبص على [[HttpStandardResilienceOptions]] لو عايز تغيرها.`
        }
      ]
    }
]);
