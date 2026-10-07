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
          teach: R`## المثال ده بيعمل إيه؟

بيوصّل مشروع ASP.NET Core بداتابيز PostgreSQL عن طريق EF Core: بنسطّب مكتبتين، ونكتب الجداول كـ classes عادية، ونعمل class واحدة ([[ShopDb]]) هي «الباب» للداتابيز، ونسجّلها في الـ DI. كل الناتج هنا حقيقي: مشروع [[dotnet new web]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) وداتابيز [[postgres:18]] في container تاني على نفس الشبكة.

---

## ١. المكتبات: [[dotnet package add]]

~~~bash
dotnet package add Npgsql.EntityFrameworkCore.PostgreSQL
dotnet package add Microsoft.EntityFrameworkCore.Design
~~~

- [[dotnet package add]]: الشكل الجديد في .NET 10 لـ [[dotnet add package]] (الاتنين شغالين). بيجيب الحزمة من NuGet ويكتبها في الـ [[.csproj]].
- [[Npgsql.EntityFrameworkCore.PostgreSQL]]: الـ **provider**، يعني المترجم من EF لـ Postgres. بيجيب معاه EF Core نفسه، فمش محتاج تسطّبه لوحده. Npgsql هو اسم الـ driver بتاع Postgres في .NET.
- [[Microsoft.EntityFrameworkCore.Design]]: أدوات وقت التطوير بس (الـ design time)، اللي أداة [[dotnet ef]] بتحتاجها عشان تعمل migrations (الدرس الجاي).

الـ [[.csproj]] بعدها:

~~~text Shop.Api.csproj
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.12">
  <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  <PrivateAssets>all</PrivateAssets>
</PackageReference>
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="10.0.3" />
~~~

[[PrivateAssets all]] على حزمة الـ Design معناها «الحزمة دي ليا أنا بس»: مش بتتنقل لأي مشروع بيعمل reference للمشروع ده، ومش بتتنشر مع التطبيق.

---

## ٢. الـ entity: [[Product]]

~~~csharp Data/ShopDb.cs
public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
~~~

class عادية جدًا، مفيهاش أي حاجة من EF. اسمها **entity** لأنها بتمثّل صف في جدول. EF بيقرا الـ properties ويطلّع منها الأعمدة بـ **conventions** (قواعد بالاسم والنوع):

| السطر | العمود اللي طلع في Postgres | ليه |
|---|---|---|
| [[int Id]] | [[integer GENERATED BY DEFAULT AS IDENTITY]] + primary key | اسمه [[Id]]، فهو المفتاح، والداتابيز بتولّد قيمته |
| [[required string Name]] | [[NOT NULL]] | [[string]] من غير [[?]] = مش nullable |
| [[decimal Price]] | [[numeric]] | النوع الدقيق للفلوس (هنحدد الدقة تحت) |
| [[int CategoryId]] | [[integer NOT NULL]] + foreign key | الاسم = اسم الـ navigation + [[Id]] |
| [[Category Category]] | مفيش عمود | **navigation property**: رابط للـ object التاني |

- [[{ get; set; }]]: property عادية (درس class و properties).
- [[required]]: لازم تدي [[Name]] قيمة وانت بتعمل [[new Product { ... }]]، وإلا الـ compiler يرفض.
- [[= null!]]: الـ property non-nullable، بس EF هو اللي بيملاها لما تطلب، فبنديها [[null]] مبدئيًا. الـ [[!]] (اسمه null-forgiving) بتقول للـ compiler «عارف إنها null دلوقتي، متحذرنيش».

---

## ٣. الـ DbContext: [[ShopDb]]

~~~csharp Data/ShopDb.cs
public class ShopDb(DbContextOptions<ShopDb> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    ...
}
~~~

- [[ShopDb(DbContextOptions<ShopDb> options)]]: ده **primary constructor** (من C# 12): الـ class بتاخد الإعدادات في الـ constructor مباشرة. الإعدادات دي فيها «أنهي داتابيز و أنهي connection string»، والـ DI هو اللي بيبعتها.
- [[: DbContext(options)]]: بنورث من [[DbContext]] ونبعتله الإعدادات. [[DbContext]] هو الجلسة مع الداتابيز: فيه الـ connection، والـ change tracker (بيفتكر إيه اللي اتحمل واتعدّل).
- [[DbSet<Product> Products]]: جدول. اسم الـ property هو اسم الجدول ([[Products]]). و [[<Product>]] نوع الصف (generics).
- [[=> Set<Product>()]]: [[=>]] هنا معناها property بتتحسب كل مرة (expression-bodied)، و [[Set<Product>()]] بيرجّع الـ DbSet من الـ context. الشكل ده بيمنع تحذير «non-nullable property مش متعرّفة» اللي كان بيطلع مع [[{ get; set; }]].

---

## ٤. الـ Fluent API: [[OnModelCreating]]

~~~csharp Data/ShopDb.cs
protected override void OnModelCreating(ModelBuilder b)
{
    b.Entity<Product>().Property(p => p.Name).HasMaxLength(200);
    b.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);
    b.Entity<Product>().HasIndex(p => p.Name).IsUnique();
}
~~~

- [[protected override]]: [[DbContext]] فيه method فاضية بالاسم ده، واحنا بنكتب نسختنا ([[override]]). EF بينادي عليها مرة واحدة وهو بيبني الـ model.
- [[ModelBuilder b]]: الأداة اللي بتوصف بيها الجداول. اسمه **Fluent API** لأن الأوامر بتتسلسل بنقط ورا بعض.
- [[b.Entity<Product>()]]: «بخصوص جدول المنتجات».
- [[.Property(p => p.Name)]]: «العمود ده». الـ lambda [[p => p.Name]] هنا مش بتتنفذ، EF بيقراها عشان يعرف انت تقصد أنهي property.
- [[.HasMaxLength(200)]]: بدل [[text]] بيبقى [[character varying(200)]].
- [[.HasPrecision(10, 2)]]: [[numeric(10,2)]]: ١٠ أرقام إجمالي، منهم ٢ بعد العلامة. أكبر سعر 99999999.99.
- [[.HasIndex(p => p.Name).IsUnique()]]: index بيمنع منتجين بنفس الاسم.

ودي الـ SQL الحقيقية اللي EF طلّعها من الـ model ده (من [[dotnet ef migrations script]]):

~~~text SQL من EF
CREATE TABLE "Products" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Name" character varying(200) NOT NULL,
    "Price" numeric(10,2) NOT NULL,
    "CategoryId" integer NOT NULL,
    CONSTRAINT "PK_Products" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Products_Categories_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES "Categories" ("Id") ON DELETE CASCADE
);
CREATE INDEX "IX_Products_CategoryId" ON "Products" ("CategoryId");
CREATE UNIQUE INDEX "IX_Products_Name" ON "Products" ("Name");
~~~

لاحظ إن EF عمل لوحده index على الـ foreign key ([[IX_Products_CategoryId]])، و [[ON DELETE CASCADE]] لأن العلاقة required ([[int]] مش [[int?]]). وجدول [[Categories]] عموده [[Name]] بقى [[text]] لأننا محددناش طول.

---

## ٥. التسجيل: [[AddDbContext]]

~~~csharp Program.cs
builder.Services.AddDbContext<ShopDb>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("Shop")));
~~~

من جوه لبرة:

1. [[builder.Configuration.GetConnectionString("Shop")]]: بيقرا [[ConnectionStrings:Shop]] من الإعدادات (appsettings ومتغيرات البيئة).
2. [[o.UseNpgsql(...)]]: «الداتابيز Postgres، وده عنوانها». لو SQL Server: [[UseSqlServer]].
3. [[AddDbContext<ShopDb>(...)]]: سجّل [[ShopDb]] في الـ DI كـ **Scoped**: نسخة جديدة لكل request.

والـ connection string في [[appsettings.Development.json]]:

~~~text appsettings.Development.json
{ "ConnectionStrings": { "Shop": "Host=localhost;Database=shop_dev;Username=shop;Password=shop" } }
~~~

[[Host]] السيرفر، و [[Database]] اسم الداتابيز، و [[Username]] و [[Password]]. (في التجربة هنا [[Host]] كان اسم الـ container بتاع Postgres.)

---

## ٦. شغّلناه: إيه اللي حصل؟

[[dotnet build]] نجح بـ [[0 Warning(s)]]، والتطبيق قام عادي. EF مش بيكلم الداتابيز وقت الـ startup، فأول غلطة بتبان مع أول query. عملنا endpoint [[db.Products.CountAsync()]] وطلبناه قبل ما نعمل الجداول:

~~~text اللوج
fail: Microsoft.EntityFrameworkCore.Database.Command[20102]
      Failed executing DbCommand (22ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT count(*)::int
      FROM "Products" AS p
      Npgsql.PostgresException (0x80004005): 42P01: relation "Products" does not exist
~~~

- الـ SQL اللي EF ولّده ظاهر: [[SELECT count(*)::int FROM "Products" AS p]]. [[::int]] تحويل نوع في Postgres لأن [[count]] بيرجّع [[bigint]].
- [[42P01]] كود Postgres لـ «الجدول مش موجود»: لسه معملناش migrations (الدرس الجاي). الـ request رجع 500.

وبباسورد غلط (غيّرنا الـ connection string بمتغير البيئة [[ConnectionStrings__Shop]]):

~~~text اللوج
Npgsql.PostgresException (0x80004005): 28P01: password authentication failed for user "shop"
~~~

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[Npgsql.EntityFrameworkCore.PostgreSQL]] | EF Core + مترجم Postgres |
| [[Microsoft.EntityFrameworkCore.Design]] | أدوات [[dotnet ef]] وقت التطوير |
| entity ([[Product]]) | class عادية = جدول، والـ conventions بتطلّع الأعمدة |
| [[DbContext]] و [[DbSet<T>]] | الجلسة والجداول |
| [[OnModelCreating]] | اللي الـ conventions متعرفهوش: أطوال، دقة، indexes |
| [[AddDbContext]] + [[UseNpgsql]] | تسجيل Scoped بالـ connection string |

- [[decimal]] + [[HasPrecision]] للفلوس، مش [[double]].
- الـ connection string الحقيقي مش في ملف مرفوع على git: user secrets أو متغيرات بيئة.
- EF بيكلم الداتابيز مع أول query بس، فالـ connection string الغلط مبيبانش غير ساعتها.`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

الـ entities اللي في الكود هي «الشكل المطلوب» للداتابيز. الـ migrations هي الخطوات اللي بتنقل الداتابيز من شكلها القديم للشكل المطلوب، مكتوبة كملفات C# بتترفع على git. الأوامر التسعة دي هي دورة الحياة كلها: تسطيب الأداة، أول migration، تطبيقها، تانية، وطرق نشرها في الإنتاج، والرجوع. كل الناتج هنا حقيقي من مشروع الدرس اللي فات، جوه [[mcr.microsoft.com/dotnet/sdk:10.0]] و [[postgres:18]].

---

## ١. الأداة: [[dotnet new tool-manifest]] و [[dotnet tool install dotnet-ef]]

~~~bash
dotnet new tool-manifest
dotnet tool install dotnet-ef
~~~

~~~text الناتج
The template "Dotnet local tool manifest file" was created successfully.
Tool 'dotnet-ef' (version '10.0.12') was successfully installed. Entry is added to the manifest file /w/Shop.Api/dotnet-tools.json.
~~~

- **tool** في .NET = برنامج سطر أوامر بيتوزع على NuGet. [[dotnet-ef]] اسمه، وبتناديه [[dotnet ef]].
- **manifest** = ملف بيسجّل الأدوات دي ونسخها للمشروع ده. السطر الأول بيعمل الملف، والتاني بيسطّب ويكتب فيه. ملف [[dotnet-tools.json]] اتعمل في فولدر المشروع نفسه (النسخ القديمة من الـ SDK كانت بتحطه في فولدر [[.config]]):

~~~text dotnet-tools.json
{
  "version": 1,
  "isRoot": true,
  "tools": {
    "dotnet-ef": { "version": "10.0.12", "commands": [ "dotnet-ef" ], "rollForward": false }
  }
}
~~~

زميلك بعد [[git clone]] يكتب [[dotnet tool restore]] وياخد نفس النسخة. ونسخة الأداة (10.0.12) نفس نسخة حزمة [[Design]]، وده المطلوب.

---

## ٢. أول migration: [[dotnet ef migrations add Initial]]

~~~text الناتج
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
~~~

- [[migrations add]]: قارن الـ model اللي في الكود بآخر snapshot (مفيش، فكله جديد) واكتب الفرق.
- [[Initial]]: اسم انت اللي بتختاره.
- [[Build started]]: الأداة بتبني المشروع الأول، وبعدين بتشغّل [[Program.cs]] لحد [[builder.Build()]] عشان تاخد الـ [[ShopDb]] من الـ DI. عشان كده لازم المشروع يتبني ويقوم.

اتعمل فولدر [[Migrations]] فيه ٣ ملفات:

~~~text Migrations/
20261007170856_Initial.cs            Up و Down
20261007170856_Initial.Designer.cs   شكل الـ model وقت الـ migration دي
ShopDbModelSnapshot.cs               شكل الـ model دلوقتي (بيتحدث مع كل migration)
~~~

الرقم في أول الاسم وقت الإنشاء (سنة شهر يوم ساعة دقيقة ثانية، UTC)، عشان الترتيب. وجوه [[Initial.cs]]:

~~~csharp Migrations/20261007170856_Initial.cs
migrationBuilder.CreateTable(
    name: "Products",
    columns: table => new
    {
        Id = table.Column<int>(type: "integer", nullable: false)
            .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
        Price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
        CategoryId = table.Column<int>(type: "integer", nullable: false)
    },
    ...
~~~

- [[Up]]: التغيير لقدام (اعمل الجداول).
- [[Down]]: الرجوع (هنا [[DropTable("Products")]] ثم [[DropTable("Categories")]]، بالعكس عشان الـ foreign key).
- [[Annotation(...IdentityByDefaultColumn)]]: الـ Id بيتولّد بـ [[GENERATED BY DEFAULT AS IDENTITY]].

---

## ٣. التطبيق: [[dotnet ef database update]]

~~~text الناتج (مختصر)
fail: Microsoft.EntityFrameworkCore.Database.Command[20102]
      Failed executing DbCommand (18ms) ...
      SELECT "MigrationId", "ProductVersion"
      FROM "__EFMigrationsHistory"
info: Microsoft.EntityFrameworkCore.Migrations[20411]
      Acquiring an exclusive lock for migration application. ...
info: Microsoft.EntityFrameworkCore.Migrations[20402]
      Applying migration '20261007170856_Initial'.
Done.
~~~

- الـ [[fail]] الأولى طبيعية في أول مرة: EF بيسأل جدول [[__EFMigrationsHistory]] عن اللي اتطبق، والجدول لسه مش موجود، فبيعمله.
- [[Acquiring an exclusive lock]]: من EF 9 بياخد lock على الداتابيز، عشان لو اتنين شغّلوا update مع بعض ميتخانقوش.
- [[Applying migration]]: نفّذ الـ Up وسجّل الاسم في جدول الـ history.

---

## ٤. [[dotnet ef migrations list]]

~~~text الناتج
20261007170856_Initial
~~~

كل الـ migrations اللي في الكود. اللي لسه متطبقتش على الداتابيز بيتكتب جنبها [[(Pending)]] (هتشوفها في الخطوة الجاية).

---

## ٥. migration تانية: [[AddTagsAndSku]]

ضفنا لـ [[Product]] property [[public string? Sku { get; set; }]] و [[List<Tag> Tags]]، و class [[Tag]] فيها [[List<Product> Products]]. وبعدين:

~~~bash
dotnet ef migrations add AddTagsAndSku
dotnet ef migrations list
~~~

~~~text الناتج
20261007170856_Initial
20261007171143_AddTagsAndSku (Pending)
~~~

والـ Up الجديدة فيها الفرق بس:

~~~csharp Migrations/..._AddTagsAndSku.cs
migrationBuilder.AddColumn<string>(name: "Sku", table: "Products", type: "text", nullable: true);
migrationBuilder.CreateTable(name: "Tag", ...);
migrationBuilder.CreateTable(name: "ProductTag", ...  ProductsId, TagsId ...);
migrationBuilder.CreateIndex(name: "IX_ProductTag_TagsId", table: "ProductTag", column: "TagsId");
~~~

- [[nullable: true]] لأن [[string?]].
- [[ProductTag]]: جدول الربط اللي EF عمله لوحده للـ many-to-many (الدرس الجاي).

### لو نشرت الكود قبل الـ update؟

شغّلنا التطبيق والـ migration لسه Pending، وطلبنا endpoint بيجيب المنتجات:

~~~text اللوج
Npgsql.PostgresException (0x80004005): 42703: column p.Sku does not exist
~~~

EF بيعمل [[SELECT]] بكل أعمدة الـ model، والعمود مش في الداتابيز، فـ 500. ([[42703]] = عمود مش موجود.) الـ [[CountAsync]] مثلًا كان شغال عادي لأنه مش بيطلب أعمدة.

---

## ٦. للإنتاج: [[migrations script --idempotent]]

~~~bash
dotnet ef migrations script --idempotent -o migrate.sql
~~~

- [[script]]: اكتب SQL بدل ما تطبّق.
- [[-o migrate.sql]]: في الملف ده (o = output).
- [[--idempotent]]: الـ script ينفع يتشغّل على أي داتابيز في أي مرحلة، ولو اتشغّل مرتين ميعملش حاجة تانية. ده معنى idempotent.

طلّع ملف ١٠٥ سطر، وده شكله:

~~~text migrate.sql (مختصر)
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);
START TRANSACTION;
DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261007171143_AddTagsAndSku') THEN
    ALTER TABLE "Products" ADD "Sku" text;
    END IF;
END $EF$;
...
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20261007171143_AddTagsAndSku', '10.0.12');
...
COMMIT;
~~~

- كل statement ملفوف في [[IF NOT EXISTS(... MigrationId = ...)]]: لو الـ migration دي متسجلة في الـ history، اتخطاها.
- [[DO $EF$ ... $EF$]]: block كود في Postgres (لأن [[IF]] مينفعش برّه block). [[$EF$]] مجرد علامة بداية ونهاية.
- [[START TRANSACTION]] و [[COMMIT]]: يا كله يتطبق يا ولا حاجة.
- آخر كل migration [[INSERT]] في الـ history.

الملف ده بيتراجع في الـ PR ويتشغّل في خطوة الـ deploy بـ [[psql]].

---

## ٧. الـ bundle: [[migrations bundle -o efbundle]]

~~~text الناتج
Done. Migrations Bundle: /w/Shop.Api/efbundle
Don't forget to copy appsettings.json alongside your bundle if you need it to apply migrations.
~~~

ملف تنفيذي واحد (٣٣ ميجا هنا) فيه الـ migrations وكود تطبيقها وكل الـ DLLs بتاعة EF و Npgsql، بيشتغل من غير SDK (محتاج .NET runtime بس، إلا لو ضفت [[--self-contained]]). شغّلناه:

~~~bash
./efbundle --connection "Host=...;Database=shop_dev;Username=shop;Password=shop"
~~~

~~~text الناتج (مختصر)
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
...
Done.
~~~

و [[--help]] بتاعه بيقول إن أول argument اختياري هو اسم migration تروح لها، و [[0]] بيرجّع كل حاجة.

---

## ٨. الرجوع: [[dotnet ef migrations remove]]

بعد ما الـ bundle طبّق [[AddTagsAndSku]] جرّبنا نشيلها:

~~~text الناتج
The migration '20261007171143_AddTagsAndSku' has already been applied to the database. Revert it and try again. If the migration has been applied to other databases, consider reverting its changes using a new migration instead.
~~~

[[remove]] بيرفض يشيل migration متطبقة. نرجع الداتابيز الأول لـ [[Initial]]:

~~~bash
dotnet ef database update Initial
dotnet ef migrations remove
~~~

~~~text الناتج
Reverting migration '20261007171143_AddTagsAndSku'.
Done.
Removing migration '20261007171143_AddTagsAndSku'.
Reverting the model snapshot.
Done.
~~~

[[database update Initial]] بيشغّل الـ Down لكل اللي بعد [[Initial]]، و [[remove]] بيمسح الملفين ويرجّع الـ snapshot. (لو كانت اتطبقت على الإنتاج: متعملش كده، اعمل migration جديدة بتعكسها.)

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[dotnet new tool-manifest]] | ملف [[dotnet-tools.json]] للمشروع |
| [[dotnet tool install dotnet-ef]] | يسطّب الأداة بنسخة متسجلة |
| [[migrations add Name]] | يقارن بالـ snapshot ويكتب Up و Down |
| [[database update]] | يطبّق الـ Pending ويسجلها في [[__EFMigrationsHistory]] |
| [[migrations list]] | الكل، و [[(Pending)]] جنب اللي متطبقش |
| [[migrations script --idempotent]] | SQL آمن يتشغّل على أي نسخة |
| [[migrations bundle]] | ملف تنفيذي للـ CI و Docker |
| [[migrations remove]] | يشيل آخر واحدة (لو متطبقتش) |

- الـ migration لازم تتطبق قبل الكود اللي بيعتمد عليها، وإلا [[42703]].
- راجع الـ Up دايمًا: rename ممكن يطلع drop + add.`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيعرّف علاقتين: كل منتج في **category** واحدة (one-to-many)، وكل منتج ليه **tags** كتير وكل tag على منتجات كتير (many-to-many). وبعدين بيغيّر سلوك المسح، ويضيف category ومنتج جواها في [[SaveChanges]] واحد. الناتج هنا حقيقي: console app بـ EF Core 10 و Npgsql 10.0.3 على [[postgres:18]] في Docker، والـ SQL من [[LogTo]] (بيطبع كل command EF بعته).

---

## ١. الناحية «الواحد»: [[Category]]

~~~csharp Category.cs
public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Product> Products { get; set; } = [];
}
~~~

- [[List<Product> Products]]: **collection navigation**: «المنتجات اللي في القسم ده». مفيش عمود بيتعمل ليها في جدول [[Categories]]، العلاقة كلها محفوظة في عمود [[CategoryId]] في جدول [[Products]].
- [[= []]]: collection expression فاضية، عشان الـ list متبقاش [[null]] وانت بتعمل [[Add]].

وفي [[Product]] (من أول درس): [[int CategoryId]] (الـ foreign key) و [[Category Category]] (الـ navigation للناحية التانية). EF بيشوف الـ navigations في الناحيتين ويفهم إنها علاقة واحدة.

---

## ٢. many-to-many: [[Tag]]

~~~csharp Tag.cs
public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<Product> Products { get; set; } = [];
}
~~~

ومع [[List<Tag> Tags]] في [[Product]]: الناحيتين collections، يبقى many-to-many. الداتابيز مفيهاش حاجة اسمها many-to-many، فـ EF بيعمل جدول وسيط لوحده:

~~~text SQL من EF
CREATE TABLE "ProductTag" (
    "ProductsId" integer NOT NULL,
    "TagsId" integer NOT NULL,
    CONSTRAINT "PK_ProductTag" PRIMARY KEY ("ProductsId", "TagsId"),
    CONSTRAINT "FK_ProductTag_Products_ProductsId" FOREIGN KEY ("ProductsId") REFERENCES "Products" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProductTag_Tag_TagsId" FOREIGN KEY ("TagsId") REFERENCES "Tag" ("Id") ON DELETE CASCADE
);
~~~

- اسم الجدول = اسمين الـ classes ورا بعض ([[ProductTag]]).
- الأعمدة = اسم الـ navigation + [[Id]] ([[ProductsId]] و [[TagsId]]).
- المفتاح **مركّب** من العمودين، فنفس الربط مينفعش يتكرر.
- جدول [[Tag]] مفرد لأن مفيش [[DbSet<Tag>]] في الـ context: الاسم بيتاخد من الـ DbSet لو موجود، وإلا من اسم الـ class.

---

## ٣. الـ Fluent API للعلاقة

~~~csharp ShopDb.cs (جوه OnModelCreating)
b.Entity<Product>()
    .HasOne(p => p.Category)
    .WithMany(c => c.Products)
    .HasForeignKey(p => p.CategoryId)
    .OnDelete(DeleteBehavior.Restrict);
~~~

اقراها كجملة إنجليزي:

| الحتة | معناها |
|---|---|
| [[b.Entity<Product>()]] | بخصوص المنتج |
| [[.HasOne(p => p.Category)]] | ليه category **واحدة** |
| [[.WithMany(c => c.Products)]] | والـ category ليها منتجات **كتير** |
| [[.HasForeignKey(p => p.CategoryId)]] | والرابط هو عمود [[CategoryId]] |
| [[.OnDelete(DeleteBehavior.Restrict)]] | وممنوع تمسح category فيها منتجات |

أول ٣ سطور EF كان هيعرفهم لوحده من الأسماء. السبب الوحيد إننا كتبناهم هو السطر الأخير. والفرق في الـ SQL:

~~~text من غير OnDelete (الافتراضي)
FOREIGN KEY ("CategoryId") REFERENCES "Categories" ("Id") ON DELETE CASCADE
~~~

~~~text مع Restrict
FOREIGN KEY ("CategoryId") REFERENCES "Categories" ("Id") ON DELETE RESTRICT
~~~

جرّبنا نمسح category فيها منتج بـ [[ExecuteDeleteAsync]]:

~~~text الناتج
PostgresException: 23001: update or delete on table "Categories" violates RESTRICT setting of foreign key constraint "FK_Products_Categories_CategoryId" on table "Products"
~~~

الداتابيز نفسها رفضت. مع [[CASCADE]] كانت المنتجات هتتمسح معاها من غير ما حد ياخد باله.

---

## ٤. الإضافة بالـ navigation

~~~csharp
var pens = new Category { Name = "Pens" };
pens.Products.Add(new Product { Name = "Blue pen", Price = 5.5m });
db.Categories.Add(pens);
await db.SaveChangesAsync();
~~~

- [[new Category { Name = "Pens" }]]: object initializer. لسه في الذاكرة بس، و [[Id]] = 0.
- [[pens.Products.Add(...)]]: المنتج جوه الـ category. مكتبناش [[CategoryId]] خالص.
- [[5.5m]]: الـ [[m]] معناها [[decimal]] (من غيرها [[5.5]] بيبقى [[double]] والـ compiler يرفض).
- [[db.Categories.Add(pens)]]: EF بيعلّم الـ category **وكل اللي جواها** إنهم [[Added]].
- [[SaveChangesAsync()]]: هنا بس بيروح للداتابيز.

~~~text اللوج
Executed DbCommand (37ms) [Parameters=[@p0='?'], ...]
INSERT INTO "Categories" ("Name")
VALUES (@p0)
RETURNING "Id";
Executed DbCommand (5ms) [Parameters=[@p1='?' (DbType = Int32), @p2='?', @p3='?' (DbType = Decimal), @p4='?', @p5='?' (DbType = Int32)], ...]
INSERT INTO "Products" ("CategoryId", "Name", "Price", "Sku", "Stock")
VALUES (@p1, @p2, @p3, @p4, @p5)
RETURNING "Id";
~~~

وبعدها طبعنا القيم:

~~~text الناتج
category 1, product 1 CategoryId=1
~~~

- EF رتّب الـ INSERTs صح: الـ category الأول، لأن المنتج محتاج الـ Id بتاعها.
- [[RETURNING "Id"]]: Postgres بيرجّع الـ Id اللي اتولّد، و EF بيحطه في [[pens.Id]]، وبعدين يحطه في [[CategoryId]] بتاع المنتج قبل الـ INSERT التاني.
- [[@p0]] وأخواتها **parameters**: القيم بتتبعت لوحدها مش ملزوقة في النص. والـ [[?]] معناها إن اللوج مخبي القيم (عشان الخصوصية)، وبتظهر لو فعّلت [[EnableSensitiveDataLogging]].

---

## ٥. التجربة: tag لمنتج موجود

~~~csharp
var product = await db.Products.FindAsync(1);
var sale = await db.Set<Tag>().SingleAsync(t => t.Name == "sale");
product!.Tags.Add(sale);
await db.SaveChangesAsync();
~~~

~~~text اللوج
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."Id" = @p
LIMIT 1
SELECT t."Id", t."Name"
FROM "Tag" AS t
WHERE t."Name" = 'sale'
LIMIT 2
INSERT INTO "ProductTag" ("ProductsId", "TagsId")
VALUES (@p0, @p1);
~~~

- [[FindAsync(1)]]: بالـ primary key. [[LIMIT 1]].
- [[db.Set<Tag>()]]: مفيش [[DbSet<Tag>]] property، فبنطلبه بالـ method.
- [[SingleAsync]]: لازم يلاقي واحدة بالظبط، فبيطلب [[LIMIT 2]] عشان لو لقى اتنين يرمي.
- [[product!.Tags.Add(sale)]]: الـ [[Tags]] فاضية في الذاكرة (محملناهاش)، بس EF بيسجّل **الإضافة** بس، فالـ SQL صف واحد في [[ProductTag]] من غير ما يمسح القديم.

ولو الـ tag موجودة أصلًا على المنتج وعملت نفس الخطوات تاني:

~~~text الناتج
23505: duplicate key value violates unique constraint "PK_ProductTag"
~~~

ده المفتاح المركّب بيشتغل. لو مش متأكد، حمّل بـ [[Include(p => p.Tags)]] الأول وافحص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| one-to-many | [[List<B>]] في A، و [[A A]] + [[int AId]] في B |
| many-to-many | [[List<B>]] في A و [[List<A>]] في B، والجدول الوسيط لوحده |
| تغيير المسح | [[HasOne / WithMany / OnDelete(DeleteBehavior.Restrict)]] |
| تضيف أب وابنه | [[parent.Children.Add(child)]] و [[SaveChanges]] واحد |
| تضيف ابن لأب موجود | [[new Child { ParentId = 1 }]] من غير تحميل الأب |

- العلاقة الـ required افتراضيها [[CASCADE]]: فكّر قبل ما تسيبه.
- الـ navigations مبتتحملش لوحدها: [[Include]] أو projection (الدروس الجاية).`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيكتب ٤ أسئلة على جدول المنتجات بـ LINQ: المنتجات اللي فيها «pen» وسعرها فوق 5 مترتبة، وكام منتج مخزونه قليل، وفيه «Blue pen» ولا لأ، ومتوسط السعر في كل category. الفكرة كلها إن الـ C# ده **مش بيتنفذ في C#**: EF بيترجمه SQL ويبعته للداتابيز. الناتج هنا حقيقي: console app بـ EF Core 10 و Npgsql على [[postgres:18]]، بـ ٤ منتجات: Blue pen (5.5، مخزون 100) و Red pen (6، مخزون 3) و Gold pen (120، مخزون 2) في Pens، و C# book (300، مخزون 10) في Books. والـ SQL من [[LogTo]].

---

## ١. بناء الـ query: لسه محصلش حاجة

~~~csharp
var q = db.Products
    .Where(p => p.Price > 5 && p.Name.Contains("pen"))
    .OrderBy(p => p.Price)
    .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name));
~~~

- [[db.Products]]: الـ [[DbSet<Product>]]، ونوعه [[IQueryable<Product>]]: «سؤال لسه هيتسأل للداتابيز».
- [[.Where(p => ...)]]: على [[IQueryable]] الـ lambda مش بتتحول لكود يتنفذ، بتتحول **expression tree**: object بيوصف الكود ([[p.Price]] أكبر من [[5]] و...). EF بيلف على الشجرة دي ويكتبها SQL.
  - [[&&]] = [[AND]].
  - [[p.Name.Contains("pen")]] = [[LIKE '%pen%']]. الـ [[%]] في SQL معناها «أي حروف».
- [[.OrderBy(p => p.Price)]] = [[ORDER BY]] تصاعدي.
- [[.Select(p => new ProductDto(...))]]: **projection**: بدل المنتج كله، هات ٤ قيم بس في [[record ProductDto(int Id, string Name, decimal Price, string Category)]].
  - [[p.Category.Name]]: navigation، و EF بيفهم إنه محتاج JOIN.

لحد هنا مفيش ولا request راح للداتابيز. [[q]] مجرد وصف.

---

## ٢. [[ToQueryString()]]: وريني الـ SQL من غير ما تنفذ

~~~csharp
Console.WriteLine(q.ToQueryString());
~~~

~~~text الناتج
SELECT p."Id", p."Name", p."Price", c."Name"
FROM "Products" AS p
INNER JOIN "Categories" AS c ON p."CategoryId" = c."Id"
WHERE p."Price" > 5.0 AND p."Name" LIKE '%pen%'
ORDER BY p."Price"
~~~

قارن سطر بسطر:

| LINQ | SQL |
|---|---|
| [[db.Products]] | [[FROM "Products" AS p]] |
| [[p.Category.Name]] | [[INNER JOIN "Categories" AS c ...]] و [[c."Name"]] |
| [[p.Price > 5]] | [[p."Price" > 5.0]] |
| [[p.Name.Contains("pen")]] | [[p."Name" LIKE '%pen%']] |
| [[OrderBy(p => p.Price)]] | [[ORDER BY p."Price"]] |
| [[new ProductDto(p.Id, ...)]] | ٤ أعمدة بس، مش كل الأعمدة |

- [[INNER JOIN]] مش [[LEFT JOIN]] لأن [[CategoryId]] مطلوب ([[int]] مش [[int?]])، فكل منتج أكيد ليه category.
- [[5.0]] لأن [[Price]] [[decimal]]. و [[5]] و [['%pen%']] ثوابت مكتوبة في الكود، فـ EF كتبهم في الـ SQL مباشرة.

### والمتغيرات؟

لو الكلمة جاية من متغير (من الـ request مثلًا):

~~~csharp
var word = "pen";
Console.WriteLine(db.Products.Where(p => p.Name.Contains(word)).ToQueryString());
~~~

~~~text الناتج
-- @word_contains='%pen%'
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."Name" LIKE @word_contains
~~~

المتغير بقى **parameter** ([[@word_contains]]) والقيمة بتتبعت لوحدها، فلو حد كتب [['; DROP TABLE ...]] هيتدوّر عليه كنص عادي. ده سبب إن LINQ مفيهوش SQL injection. ومن غير [[Select]] شوف: كل الأعمدة الستة.

---

## ٣. التنفيذ: [[ToListAsync(ct)]]

~~~csharp
var list = await q.ToListAsync(ct);
~~~

دلوقتي بس الـ SQL بيروح للداتابيز. اللوج طبع نفس الـ SQL بالظبط مع [[Executed DbCommand (2ms)]]، والنتيجة:

~~~text الناتج
ProductDto { Id = 1, Name = Blue pen, Price = 5.50, Category = Pens }
ProductDto { Id = 2, Name = Red pen, Price = 6.00, Category = Pens }
ProductDto { Id = 3, Name = Gold pen, Price = 120.00, Category = Pens }
~~~

- الـ C# book مطلعش: اسمه مفيهوش «pen».
- [[5.50]] مش [[5.5]] لأن العمود [[numeric(10,2)]]، فـ Postgres بيرجّع رقمين بعد العلامة دايمًا.
- [[ct]]: [[CancellationToken]]. لو الـ request اتلغى، الـ query بتتلغي في الداتابيز (درس CancellationToken).
- [[Async]]: الـ thread مش بيقف مستني الداتابيز. الأسماء دي من [[Microsoft.EntityFrameworkCore]]، مش من LINQ العادي.

---

## ٤. أسئلة بترجع قيمة واحدة

~~~csharp
var total = await db.Products.CountAsync(p => p.Stock < 5, ct);
var exists = await db.Products.AnyAsync(p => p.Name == "Blue pen", ct);
~~~

~~~text اللوج
SELECT count(*)::int
FROM "Products" AS p
WHERE p."Stock" < 5
SELECT EXISTS (
    SELECT 1
    FROM "Products" AS p
    WHERE p."Name" = 'Blue pen')
~~~

~~~text الناتج
total=2 exists=True
~~~

- [[CountAsync(شرط)]] = [[count(*)]] مع [[WHERE]]: الداتابيز بتعد وترجّع رقم واحد، مش بتبعتلك الصفوف. (Red pen و Gold pen مخزونهم تحت 5.)
- [[AnyAsync]] = [[EXISTS]]: الداتابيز بتقف أول ما تلاقي صف واحد.

---

## ٥. التجميع: [[GroupBy]]

~~~csharp
var avgByCategory = await db.Products
    .GroupBy(p => p.Category.Name)
    .Select(g => new { Category = g.Key, Avg = g.Average(p => p.Price) })
    .ToListAsync(ct);
~~~

~~~text اللوج
SELECT c."Name" AS "Category", avg(p."Price") AS "Avg"
FROM "Products" AS p
INNER JOIN "Categories" AS c ON p."CategoryId" = c."Id"
GROUP BY c."Name"
~~~

~~~text الناتج
{ Category = Pens, Avg = 43.8333333333333333 }
{ Category = Books, Avg = 300.0000000000000000 }
~~~

- [[GroupBy(p => p.Category.Name)]] = [[GROUP BY c."Name"]] (ومعاه JOIN).
- [[g.Key]]: اسم الـ category. و [[g.Average(p => p.Price)]] = [[avg()]] في SQL.
- [[new { Category = ..., Avg = ... }]]: anonymous type، والأسماء بقت [[AS "Category"]] و [[AS "Avg"]].
- (5.5 + 6 + 120) / 3 = 43.8333. والأرقام الكتير بعد العلامة لأن [[avg]] على [[numeric]] في Postgres بيرجّع دقة عالية.

---

## ٦. التجربة: method انت كاتبها جوه [[Where]]

~~~csharp
static bool IsCheap(Product p) => p.Price < 10;
await db.Products.Where(p => IsCheap(p)).ToListAsync();
~~~

~~~text الناتج
InvalidOperationException: The LINQ expression 'DbSet<Product>()
    .Where(p => Labs2.IsCheap(p))' could not be translated. Either rewrite the query in a form that can be translated, or switch to client evaluation explicitly by inserting a call to 'AsEnumerable', 'AsAsyncEnumerable', 'ToList', or 'ToListAsync'. See https://go.microsoft.com/fwlink/?linkid=2101038 for more information.
~~~

([[Labs2]] اسم الـ class اللي حطينا فيها الـ method في التجربة.) الـ expression tree فيه «نادي [[IsCheap]]» بس، مش اللي جواها، و SQL معندوش [[IsCheap]]. فـ EF بيرمي بدل ما يحمّل الجدول كله بهدوء.

والحل اللي بيفضل قابل لإعادة الاستخدام: method بترجّع **الشجرة نفسها**:

~~~csharp
static Expression<Func<Product, bool>> IsCheapExpr => p => p.Price < 10;
db.Products.Where(IsCheapExpr)
~~~

~~~text الناتج
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
WHERE p."Price" < 10.0
~~~

[[Expression<Func<Product, bool>>]]: «وصف لدالة بتاخد Product وترجّع bool»، و [[Expression]] من [[System.Linq.Expressions]].

### [[Select]] قبل ولا بعد [[ToList]]؟

~~~text db.Products.Select(p => p.Name)
SELECT p."Name"
FROM "Products" AS p
~~~

~~~text db.Products.ToList().Select(p => p.Name)
SELECT p."Id", p."CategoryId", p."Name", p."Price", p."Sku", p."Stock"
FROM "Products" AS p
~~~

نفس النتيجة في الآخر، بس التاني جاب كل الأعمدة وكل الصفوف للذاكرة الأول. أي حاجة بعد [[ToList()]] أو [[AsEnumerable()]] بتتنفذ في C# مش في الداتابيز.

---

## الخلاصة

| LINQ | SQL |
|---|---|
| [[Where]] | [[WHERE]] (و [[Contains]] = [[LIKE]]) |
| [[OrderBy]] | [[ORDER BY]] |
| [[Select]] لـ DTO | الأعمدة المطلوبة بس، و JOIN لو فيه navigation |
| [[CountAsync]] / [[AnyAsync]] | [[count(*)]] / [[EXISTS]] |
| [[GroupBy]] + [[Average]] | [[GROUP BY]] + [[avg()]] |
| [[ToListAsync]] | هنا بس بيتنفذ |

- [[ToQueryString()]] صاحبك: اقرا الـ SQL قبل ما تثق في الـ query.
- method عادية جوه [[Where]] = [[could not be translated]].
- [[ToList()]] بدري = كل الجدول في الذاكرة.`,
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
    }
]);
