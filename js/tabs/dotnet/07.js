// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "أول Web API",
      l: 2,
      n: "Program.cs و minimal APIs و routing و model binding، وإمتى controllers",
      items: [
        {
          cmd: "dotnet new webapi",
          title: "تفهم Program.cs: الـ builder والـ services والـ pipeline",
          desc: R`[[dotnet new webapi -o Shop.Api]] بيعمل API شغال. كل حاجة في [[Program.cs]] وبتمشي على ٣ مراحل: (١) [[WebApplication.CreateBuilder(args)]] بيجهز الإعدادات واللوج. (٢) [[builder.Services.AddXxx()]] بتسجّل الـ services في الـ DI container. (٣) [[builder.Build()]] وبعدها [[app.UseXxx()]] (الـ middleware بالترتيب) و [[app.MapXxx()]] (الـ endpoints)، وآخر حاجة [[app.Run()]].

لو جاي من Express: [[app.MapGet("/x", handler)]] = [[app.get("/x", handler)]]، و [[app.Use...]] = [[app.use(...)]]. الفرق إن الـ services بتتسجل الأول، والـ handler بياخد اللي محتاجه كـ parameters بدل [[req]] و [[res]].

من .NET 9 القالب بيعمل OpenAPI document على [[/openapi/v1.json]] في Development بس، من غير Swagger UI. لو عايز UI ضيف Scalar أو Swagger UI (شوف «تاب APIs متقدمة»: درس OpenAPI).`,
          example: R`var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapGet("/health", () => TypedResults.Ok(new { status = "ok" }));
app.MapGet("/hello/{name}", (string name) => $"Hello {name}");
app.Run();`,
          try: R`اعمل المشروع بـ [[dotnet new webapi -o Shop.Api --no-https]] وشغّله بـ [[dotnet watch]]. اعرف البورت من الـ log ([[Now listening on]]) أو من [[Properties/launchSettings.json]]. جرّب [[curl localhost:PORT/weatherforecast]] و [[/openapi/v1.json]]. وبعدين شغّله بـ [[ASPNETCORE_ENVIRONMENT=Production dotnet run]] وجرّب الـ openapi تاني.`,
          flag: "script",
          deep: {
            why: R`كل مشروع ASP.NET Core هتفتحه في شغلك هيبدأ بـ Program.cs. لو فهمت المراحل التلاتة، هتعرف فين تضيف داتابيز (services)، وفين تضيف auth (services + middleware)، وفين تضيف endpoint (Map). وأغلب مشاكل المبتدئين بتيجي من ترتيب غلط بينهم.`,
            how: R`[[CreateBuilder]] بيقرا الـ configuration من [[appsettings.json]] ثم [[appsettings.{Environment}.json]] ثم user secrets (في Development) ثم env vars ثم command line، وبيجهز logging للـ console، وبيحدد الـ environment من [[ASPNETCORE_ENVIRONMENT]] (الافتراضي Production).

[[builder.Services]] هو [[IServiceCollection]]: قايمة تسجيلات. [[Build()]] بيقفلها ويعمل الـ [[IServiceProvider]]، وبعدها مينفعش تضيف services.

[[app]] هو [[WebApplication]]: بيشغّل Kestrel (السيرفر المدمج، مكتوب بـ C# وسريع جدًا). الـ endpoints بتتسجل كـ routes، والـ routing middleware بيختار الـ endpoint المناسب لكل request.

الـ handler ممكن يرجع أي حاجة: string بتطلع [[text/plain]]، و object بيطلع JSON ([[System.Text.Json]] بـ camelCase افتراضيًا)، و [[IResult]] ([[TypedResults.Ok]] و [[NotFound]] إلخ) لو عايز تتحكم في الـ status. و [[launchSettings.json]] بيستخدمه [[dotnet run]] بس: فيه البورت والـ environment للتطوير، ومش بيتنشر.`,
            when: R`minimal APIs هي الافتراضي من .NET 6 ومناسبة لأغلب الـ APIs الجديدة. لما الملف يكبر قسّمه بـ extension methods و [[MapGroup]] (الدرس الجاي)، مش تحط ٥٠٠ endpoint في Program.cs.`,
            mistakes: R`تضيف service بعد [[Build()]]: [[InvalidOperationException: The service collection cannot be modified because it is read-only]]. وتستنى الـ OpenAPI يشتغل في Production. وتفتكر إن [[launchSettings.json]] بيأثر على السيرفر: في الإنتاج البورت بيتحدد بـ [[ASPNETCORE_URLS]] أو [[ASPNETCORE_HTTP_PORTS]] (الافتراضي 8080 في Docker و 5000 من غيره).`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[Program.cs]] كامل لـ API فيه endpointين: [[/health]] بيرجع JSON، و [[/hello/{name}]] بيرجع نص. الأهم من الـ endpoints إنك تشوف **المراحل التلاتة** اللي أي تطبيق ASP.NET Core ماشي عليها: جهّز، سجّل services، ابني ورتّب الـ pipeline وشغّل.

جرّبته كده: [[dotnet new webapi -o Shop.Api --no-https]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401)، وبدلت [[Program.cs]] بكود المثال، وشغلته بـ [[dotnet run --urls http://0.0.0.0:8080]] والبورت متوصل لـ 5925 على الجهاز، وكلمته بـ [[curl]] من Git Bash.

---

## ٠. القالب: [[dotnet new webapi -o Shop.Api --no-https]]

- [[dotnet new webapi]]: اعمل مشروع من قالب اسمه [[webapi]].
- [[-o Shop.Api]] (o = output): الفولدر واسم المشروع.
- [[--no-https]]: من غير إعدادات HTTPS، أسهل وانت بتتعلم.

الفولدر اللي طلع:

~~~text الملفات
Program.cs                    الكود كله
Shop.Api.csproj               المشروع: نوع الـ SDK والـ packages
Properties/launchSettings.json  إعدادات dotnet run (البورت والـ environment)
appsettings.json              الإعدادات
appsettings.Development.json  إعدادات التطوير بس
Shop.Api.http                 requests جاهزة تجربها من VS Code
~~~

---

## ١. المرحلة الأولى: [[CreateBuilder]]

~~~csharp Program.cs
var builder = WebApplication.CreateBuilder(args);
~~~

- [[args]]: الكلام اللي اتكتب بعد اسم البرنامج في الترمنال (زي [[--urls ...]]). موجود لوحده في أي Program.cs.
- [[WebApplication.CreateBuilder]] بيجهز ٣ حاجات:
  - الإعدادات: من [[appsettings.json]] والـ env vars والـ args (درس configuration).
  - اللوج على الـ console.
  - الـ environment: Development ولا Production، من [[ASPNETCORE_ENVIRONMENT]].

---

## ٢. المرحلة التانية: تسجيل الـ services

~~~csharp Program.cs
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
~~~

- [[builder.Services]]: قايمة الـ services (الـ DI container، درس DI). كل [[AddXxx()]] بيضيف حاجات للقايمة، ولسه محدش اتعمل.
- [[AddOpenApi()]]: الحاجات اللي بتولّد وصف الـ API (OpenAPI document).
- [[AddProblemDetails()]]: الأخطاء تطلع بشكل JSON موحد (category «Validation و الأخطاء»).

---

## ٣. المرحلة التالتة: [[Build()]]

~~~csharp Program.cs
var app = builder.Build();
~~~

بيقفل قايمة الـ services ويعمل منها التطبيق. بعد السطر ده مينفعش تضيف services. جرّبت أحط [[builder.Services.AddProblemDetails()]] **بعد** [[Build()]]:

~~~text الناتج
Unhandled exception. System.InvalidOperationException: The service collection cannot be modified because it is read-only.
~~~

---

## ٤. الـ OpenAPI في التطوير بس

~~~csharp Program.cs
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
~~~

- [[app.Environment.IsDevelopment()]]: true لو الـ environment اسمه Development.
- [[app.MapOpenApi()]]: يعمل endpoint على [[/openapi/v1.json]] فيه وصف كل الـ endpoints. جوه الـ if، فمش هيبقى موجود في Production.

---

## ٥. الـ endpoints

~~~csharp Program.cs
app.MapGet("/health", () => TypedResults.Ok(new { status = "ok" }));
app.MapGet("/hello/{name}", (string name) => $"Hello {name}");
~~~

### [[app.MapGet(path, handler)]]

«لما ييجي GET على المسار ده، نادي الدالة دي». زي [[app.get("/health", handler)]] في Express. والـ handler lambda (درس Func و Action).

### [[TypedResults.Ok(new { status = "ok" })]]

- [[new { status = "ok" }]]: anonymous object، object من غير class، زي [[{ status: "ok" }]] في JS.
- [[TypedResults.Ok(...)]]: رد 200 والـ object يتحول JSON.

~~~bash
curl -si localhost:5925/health
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Server: Kestrel

{"status":"ok"}
~~~

- [[-s]] (silent) من غير شريط تقدم، و [[-i]] (include) اعرض الـ headers.
- [[Server: Kestrel]]: Kestrel هو السيرفر اللي جوه ASP.NET Core.

### [[{name}]] في المسار

[[{name}]] اسمه route parameter: أي قيمة في المكان ده بتتحط في الـ parameter اللي **بنفس الاسم** [[string name]]. والـ handler بيرجع string، فالرد بيبقى نص:

~~~bash
curl -si localhost:5925/hello/Sara
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

Hello Sara
~~~

لاحظ [[text/plain]] هنا و [[application/json]] فوق: نوع اللي الـ handler بيرجعه هو اللي بيحدد. و [[/hello/Sara%20Ali]] رجّع [[Hello Sara Ali]] ([[%20]] = مسافة في الـ URL).

ومسار مش موجود:

~~~text الناتج: curl -si localhost:5925/nothing
HTTP/1.1 404 Not Found
Content-Length: 0
~~~

404 من غير body خالص. [[AddProblemDetails]] لوحده مش كفاية يملاه، محتاج [[UseStatusCodePages]] (درس ProblemDetails).

### نفس الـ requests من PowerShell على ويندوز

~~~powershell
Invoke-RestMethod http://localhost:5925/health
curl.exe -s http://localhost:5925/health
~~~

~~~text الناتج
status
------
ok
{"status":"ok"}
~~~

[[Invoke-RestMethod]] بيحوّل الـ JSON لـ object ويعرضه كجدول، و [[curl.exe]] (بـ [[.exe]] عشان [[curl]] لوحدها في Windows PowerShell 5.1 اسم تاني لـ [[Invoke-WebRequest]]) بيطبع الـ JSON زي ما هو.

---

## ٦. [[app.Run()]]

بيشغّل Kestrel ويفضل مستني requests لحد ما تقفله. والـ log بيقول:

~~~text الناتج
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://0.0.0.0:8080
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
~~~

- [[info]] مستوى اللوج، و [[Microsoft.Hosting.Lifetime]] اسم الحتة اللي كتبت السطر (الـ category)، و [[[14]]] رقم الحدث.
- [[0.0.0.0]]: اسمع على كل الـ network interfaces (لازم جوه Docker عشان يوصلله من برّه). من غير [[--urls]] كان هيسمع على [[http://localhost:5012]]: البورت ده اتختار عشوائي وقت [[dotnet new]] ومتخزن في [[launchSettings.json]]، فعندك هيبقى رقم تاني.

---

## ٧. Production والـ launchSettings

[[Properties/launchSettings.json]] فيه profile بيقول [[ASPNETCORE_ENVIRONMENT: Development]]، و [[dotnet run]] بيطبقه **فوق** أي env var انت حاطه. جرّبت:

| شغلته إزاي | [[Hosting environment]] | [[/openapi/v1.json]] |
|---|---|---|
| [[dotnet run]] | Development | 200 |
| [[ASPNETCORE_ENVIRONMENT=Production dotnet run]] | Development (الـ profile كسب) | 200 |
| [[ASPNETCORE_ENVIRONMENT=Production dotnet run --no-launch-profile]] | Production | 404 |

[[--no-launch-profile]]: متقراش [[launchSettings.json]]. ساعتها [[MapOpenApi]] مش بيتنادى فالـ 404 طبيعي، و [[/health]] لسه شغال. وعلى ويندوز في PowerShell الـ env var بيتكتب [[$env:ASPNETCORE_ENVIRONMENT = "Production"]] في سطر لوحده قبل [[dotnet run --no-launch-profile]].

[[launchSettings.json]] للتطوير بس ومبيتنشرش. في الإنتاج البورت من [[ASPNETCORE_URLS]] أو [[ASPNETCORE_HTTP_PORTS]]، والافتراضي من الـ docs: [[http://localhost:5000]]، و 8080 في صور Docker الرسمية (صورة الـ SDK فيها [[ASPNETCORE_HTTP_PORTS=8080]] جاهز، وعشان كده الـ log قال [[Overriding HTTP_PORTS '8080']] لما استخدمت [[--urls]]).

---

## الخلاصة

| المرحلة | الكود | بتعمل إيه |
|---|---|---|
| ١ | [[WebApplication.CreateBuilder(args)]] | إعدادات ولوج و environment |
| ٢ | [[builder.Services.AddXxx()]] | تسجيل services (قبل Build بس) |
| ٣ | [[builder.Build()]] | بناء التطبيق وقفل الـ services |
| ٤ | [[app.UseXxx()]] / [[app.MapXxx()]] | الـ middleware والـ endpoints |
| ٥ | [[app.Run()]] | شغّل Kestrel |

- الـ handler بيرجع string = [[text/plain]]، و object = JSON، و [[TypedResults]] لو عايز تتحكم في الـ status.
- [[{name}]] في المسار بيتربط بالـ parameter اللي بنفس الاسم.
- [[dotnet run]] بيقرا [[launchSettings.json]]، و [[--no-launch-profile]] بيتجاهله.`,
          lines: [
            "مرحلة ١: الإعدادات واللوج والـ environment.",
            "مرحلة ٢: تسجيل services. OpenAPI document.",
            R`أخطاء بشكل [[application/problem+json]] (category الجاية).`,
            "مرحلة ٣: بناء التطبيق. بعدها الـ services اتقفلت.",
            R`[[Development]] من [[launchSettings.json]] أو [[ASPNETCORE_ENVIRONMENT]].`,
            "بداية.",
            R`[[/openapi/v1.json]] في التطوير بس.`,
            "نهاية.",
            R`endpoint بيرجع JSON [[{"status":"ok"}]] بـ 200.`,
            R`route parameter: [[{name}]] بيتربط بـ [[string name]] بالاسم.`,
            "شغّل Kestrel واستنى الـ requests."
          ],
          sol: R`الـ log بيقول [[Now listening on: http://localhost:5281]] (البورت بيتختار عشوائي وقت إنشاء المشروع ومتخزن في [[launchSettings.json]]، فعندك هيبقى رقم تاني). [[/weatherforecast]] بيرجع array فيها ٥ أيام، و [[/openapi/v1.json]] بيرجع document فيه [["openapi": "3.1.1"]] ومسار [[/weatherforecast]].

مع [[ASPNETCORE_ENVIRONMENT=Production dotnet run]]: [[dotnet run]] لسه بيقرا الـ launchSettings، والـ profile فيه [[Development]]، فممكن تلاقي البيئة لسه Development! عشان تجرب Production صح: [[dotnet run --no-launch-profile]] مع الـ env var، والبورت هيبقى 5000. ساعتها [[/openapi/v1.json]] بيرجع 404 لأن [[MapOpenApi]] جوه الـ if.`
        },
        {
          cmd: "MapGet و MapGroup",
          title: "routing و model binding: الـ parameters بتيجي منين؟",
          desc: R`في minimal APIs الـ handler بياخد parameters، و ASP.NET Core بيعرف يجيبها منين: اسم في الـ route ([[{id:int}]]) = route value، ونوع بسيط مش في الـ route = query string ([[?q=pen&page=2]])، و object معقد = JSON body، ونوع متسجل في الـ DI ([[ShopDb]] مثلًا) = service، و [[CancellationToken]] = إلغاء الـ request.

و [[MapGroup("/api/products")]] بيجمع endpoints تحت prefix واحد وتقدر تحط عليهم إعدادات مشتركة (auth، tags). وبتحطهم في extension method في ملف لوحده.

و [[TypedResults]] + [[Results<Ok<T>, NotFound>]] كنوع رجوع بيخلي الـ status codes الممكنة جزء من الـ signature، فالـ OpenAPI بيطلع صح والـ compiler بيمنعك ترجع حاجة مش مكتوبة.`,
          example: R`public static class ProductEndpoints
{
    public static RouteGroupBuilder MapProducts(this IEndpointRouteBuilder app)
    {
        var g = app.MapGroup("/api/products").WithTags("Products");
        g.MapGet("/", async (ShopDb db, string? q, int page = 1, int size = 20) =>
            await db.Products.AsNoTracking()
                .Where(p => q == null || p.Name.Contains(q))
                .OrderBy(p => p.Id)
                .Skip((page - 1) * size).Take(size)
                .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
                .ToListAsync());
        g.MapGet("/{id:int}", async Task<Results<Ok<ProductDto>, NotFound>> (int id, ShopDb db) =>
        {
            var p = await db.Products.AsNoTracking()
                .Where(p => p.Id == id)
                .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
                .FirstOrDefaultAsync();
            return p is null ? TypedResults.NotFound() : TypedResults.Ok(p);
        });
        return g;
    }
}
public record ProductDto(int Id, string Name, decimal Price, string Category);`,
          try: R`بعد ما تعمل الداتابيز (category الـ EF Core) أو حتى بـ list في الذاكرة: جرّب [[curl "localhost:PORT/api/products?q=pen"]]، و [[/api/products/99]]، و [[/api/products/abc]]. ليه الأخير 404 مش 400؟ وضيف endpoint [[GET /api/products/by-sku/{sku}]] بـ route constraint من نوع regex بيقبل ٣ حروف أو أرقام وشرطة و٤ أرقام بس (زي [[PEN-0001]]).`,
          flag: "script",
          deep: {
            why: R`في Express بتكتب [[Number(req.params.id)]] و [[req.query.page ?? 1]] وتفحص بإيدك. هنا الـ binding بيحوّل الأنواع ويطلّع 400 لو القيمة مش صالحة، والـ handler بيبقى دالة عادية بأنواع واضحة تقدر تختبرها. وكل endpoint بتعلن اللي محتاجاه، مش بتدوّر عليه في [[req]].`,
            how: R`قواعد الـ binding (من غير attributes): اسم موجود في الـ route template = route. نوع بسيط (int و string و Guid و DateTime و enum، وأي نوع فيه [[TryParse]]) = query. نوع متسجل في DI = service. [[HttpContext]] و [[CancellationToken]] و [[ClaimsPrincipal]] خاصين. أي نوع معقد تاني = body من JSON (واحد بس لكل endpoint). وتقدر تحدد صراحة بـ [[[FromQuery]]] و [[[FromRoute]]] و [[[FromBody]]] و [[[FromHeader]]] و [[[FromServices]]] و [[[AsParameters]]] (يجمّع كذا parameter في record).

الـ route constraints زي [[{id:int}]] و [[{slug:alpha}]] و [[{id:guid}]] و [[{n:min(1)}]] بتأثر على الـ matching: لو القيمة مطابقتش الـ route مش بيتختار أصلًا فيطلع 404، مش 400. الـ constraints للتفرقة بين routes، مش للـ validation.

parameter nullable ([[string? q]]) أو ليه default ([[int page = 1]]) اختياري. غير كده إجباري ولو مش موجود = 400. و [[TypedResults.Ok(x)]] بيرجع [[Ok<T>]] نوع حقيقي، و [[Results<A, B>]] union type للـ OpenAPI.`,
            when: R`[[MapGroup]] + extension method لكل resource ([[MapProducts]] و [[MapOrders]]) من أول يوم. [[TypedResults]] بدل [[Results]] عشان الأنواع. ولما الـ handler يطول، طلّعه method static أو حطّ المنطق في service.`,
            mistakes: R`تعتمد على [[{id:int}]] كـ validation وتستغرب الـ 404. وتحط كذا parameter معقد وتستنى الاتنين من الـ body. وترجع الـ entity نفسها (بالـ navigation properties) بدل DTO فيطلع JSON ضخم أو circular reference exception. وتنسى [[AsNoTracking]] في القراية (category الـ EF Core).`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده ملف لوحده ([[ProductEndpoints.cs]]) فيه كل الـ endpoints بتاعة المنتجات: قايمة بفلتر و pagination، ومنتج واحد بالـ id. والفكرة الأساسية: الـ handler بيعلن الـ parameters اللي محتاجها، و ASP.NET Core بيعرف يجيب كل واحد منين (الـ route، أو الـ query string، أو الـ DI).

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في مشروع [[dotnet new web]] مع [[Npgsql.EntityFrameworkCore.PostgreSQL]] 10.0.3، وداتابيز PostgreSQL 16 في container جنبه، فيها ٣ منتجات: [[Blue pen]] و [[Red pen]] (category Pens) و [[A5 notebook]]. والـ requests بـ [[curl]] من Git Bash على البورت 5925.

---

## ٠. الـ usings اللي فوق الملف

الكود في الدرس من غيرهم، بس الملف محتاجهم:

~~~csharp ProductEndpoints.cs
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
~~~

- الأول فيه أنواع الردود [[Results<...>]] و [[Ok<T>]] و [[NotFound]].
- التاني فيه [[AsNoTracking]] و [[ToListAsync]] و [[FirstOrDefaultAsync]] (extension methods من EF Core، درس extension methods).

لما شلت الأول:

~~~text الناتج: dotnet build
ProductEndpoints.cs(15,42): error CS0308: The non-generic type 'Results' cannot be used with type arguments
ProductEndpoints.cs(15,50): error CS0246: The type or namespace name 'Ok<>' could not be found (are you missing a using directive or an assembly reference?)
~~~

---

## ١. الـ extension method

~~~csharp ProductEndpoints.cs
public static class ProductEndpoints
{
    public static RouteGroupBuilder MapProducts(this IEndpointRouteBuilder app)
    {
~~~

- [[static class]] و [[this]] في أول parameter = extension method (درس extension methods).
- [[IEndpointRouteBuilder]]: أي حاجة تقدر تضيف عليها routes. الـ [[app]] في Program.cs واحد منهم، فبتتنادى من هناك [[app.MapProducts();]] وخلاص. كده Program.cs يفضل قصير.
- بترجع [[RouteGroupBuilder]] (تحت).

---

## ٢. [[MapGroup]]

~~~csharp ProductEndpoints.cs
var g = app.MapGroup("/api/products").WithTags("Products");
~~~

- [[MapGroup("/api/products")]]: مجموعة كل الـ routes اللي هتتضاف عليها بتبدأ بالـ prefix ده. فـ [[g.MapGet("/", ...)]] = [[GET /api/products]]، و [[g.MapGet("/{id:int}", ...)]] = [[GET /api/products/5]].
- [[WithTags("Products")]]: إعداد على المجموعة كلها: في الـ OpenAPI الـ endpoints دي بتتجمع تحت [[Products]]. وبنفس الطريقة تحط auth على مجموعة كاملة ([[RequireAuthorization()]]).

---

## ٣. القايمة: منين كل parameter؟

~~~csharp ProductEndpoints.cs
g.MapGet("/", async (ShopDb db, string? q, int page = 1, int size = 20) =>
    await db.Products.AsNoTracking()
        .Where(p => q == null || p.Name.Contains(q))
        .OrderBy(p => p.Id)
        .Skip((page - 1) * size).Take(size)
        .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
        .ToListAsync());
~~~

### الـ parameters

| الـ parameter | جاي منين | ليه |
|---|---|---|
| [[ShopDb db]] | الـ DI | نوعه متسجل بـ [[AddDbContext]] |
| [[string? q]] | الـ query string ([[?q=pen]]) | نوع بسيط ومش في الـ route، و [[?]] يعني اختياري |
| [[int page = 1]] | الـ query string | ليه قيمة افتراضية، فاختياري |
| [[int size = 20]] | الـ query string | نفس الكلام |

ده اسمه **model binding**: انت مش بتقرا [[req.query.page]] وتحوّله رقم بإيدك زي Express. ولو القيمة مش رقم أصلًا، الـ framework بيرد 400 قبل ما الـ handler يشتغل. جرّبت [[?page=x]]:

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"Microsoft.AspNetCore.Http.BadHttpRequestException","status":400,"detail":"Failed to bind parameter \"int page\" from \"x\".", ...}
~~~

(الرد في Development فيه كمان حقل [[exception]] بالـ stack trace، قصّيته. في Production مش بيظهر.)

### الـ query من جوه لبرة

| الخطوة | الكود | بتعمل إيه |
|---|---|---|
| ١ | [[db.Products]] | جدول المنتجات |
| ٢ | [[.AsNoTracking()]] | قراية بس: EF ميتابعش التغييرات (أسرع) |
| ٣ | [[.Where(p => q == null || p.Name.Contains(q))]] | لو مفيش [[q]] الشرط true للكل، غير كده الاسم فيه [[q]] |
| ٤ | [[.OrderBy(p => p.Id)]] | ترتيب ثابت، لازم قبل Skip عشان الصفحات متتلخبطش |
| ٥ | [[.Skip((page - 1) * size).Take(size)]] | الصفحة المطلوبة |
| ٦ | [[.Select(p => new ProductDto(...))]] | الأعمدة اللي محتاجينها بس، و [[p.Category.Name]] بتعمل JOIN |
| ٧ | [[await ... .ToListAsync()]] | دلوقتي بس الـ SQL بيتبعت للداتابيز |

([[||]] معناها «أو» زي JS.)

لحد خطوة ٦ مفيش حاجة اتنفذت: EF بيبني query. [[ToListAsync]] هي اللي بتحوّله SQL وتبعته (category الـ EF Core).

~~~bash
curl -s "localhost:5925/api/products?q=pen"
~~~

~~~text الناتج
[{"id":1,"name":"Blue pen","price":5.50,"category":"Pens"},{"id":2,"name":"Red pen","price":6.00,"category":"Pens"}]
~~~

- علامات التنصيص حوالين الـ URL مهمة في الترمنال: من غيرها [[?]] و [[&]] ليهم معنى عند الـ shell.
- أسماء الحقول [[id]] و [[name]] بحرف صغير مع إن الـ record فيه [[Id]] و [[Name]]: الـ JSON في ASP.NET Core بيطلع camelCase افتراضيًا.

و [[?page=2&size=2]] (صفحة ٢ بحجم ٢):

~~~text الناتج
[{"id":3,"name":"A5 notebook","price":25.00,"category":"Notebooks"}]
~~~

---

## ٤. منتج واحد: [[{id:int}]] و [[Results<...>]]

~~~csharp ProductEndpoints.cs
g.MapGet("/{id:int}", async Task<Results<Ok<ProductDto>, NotFound>> (int id, ShopDb db) =>
{
    var p = await db.Products.AsNoTracking()
        .Where(p => p.Id == id)
        .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
        .FirstOrDefaultAsync();
    return p is null ? TypedResults.NotFound() : TypedResults.Ok(p);
});
~~~

### [[{id:int}]]: route constraint

- [[{id}]] route parameter بيتربط بـ [[int id]] بالاسم.
- [[:int]] constraint: الـ route ده يتختار **بس** لو القيمة رقم.

### [[async Task<Results<Ok<ProductDto>, NotFound>> (...) =>]]

ده نوع رجوع الـ lambda مكتوب قبل الأقواس. نفكه من جوه:

- [[Ok<ProductDto>]]: رد 200 فيه ProductDto.
- [[NotFound]]: رد 404.
- [[Results<A, B>]]: «يا A يا B»، ومفيش غيرهم. لو حاولت ترجع [[TypedResults.BadRequest()]] الـ compiler مش هيقبل.
- [[Task<...>]] لأن الـ lambda [[async]].

### الجسم

- [[FirstOrDefaultAsync()]]: أول نتيجة، أو [[null]] لو مفيش.
- [[p is null ? A : B]]: الـ ternary زي JS، و [[is null]] الطريقة المفضلة لفحص null في C#.

~~~text الناتج: curl -s localhost:5925/api/products/1
{"id":1,"name":"Blue pen","price":5.50,"category":"Pens"}
~~~

و [[/api/products/99]] و [[/api/products/abc]] الاتنين:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Length: 0
~~~

- 99: الـ route اتختار، والـ handler رجّع [[NotFound()]].
- abc: [[abc]] مش int، فالـ route [[{id:int}]] **مطابقش أصلًا**، ومفيش route تاني، فـ 404 من الـ routing نفسه. عملت route تاني [[/t/{id}]] من غير [[:int]] و [[(int id)]]: [[/t/abc]] رجّع **400** [[Failed to bind parameter "int id" from "abc".]]. يعني الـ constraint بيفرّق بين routes، مش validation.
- الـ 404 هنا من غير body. لما ضفت [[app.UseStatusCodePages()]] في Program.cs بقى:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-4819c56dccdb77744027ddb7d062df46-70ef772ea4ad2ae1-00"}
~~~

### نوع الرجوع بيظهر في الـ OpenAPI

قريت [[/openapi/v1.json]] وطلعت لكل endpoint الـ responses بتاعته:

~~~text الناتج
GET /api/products       tags=Products  params=q:query,page:query,size:query  responses=200
GET /api/products/{id}  tags=Products  params=id:path!                       responses=200,404
~~~

الـ 404 ظهر لوحده من [[Results<Ok<ProductDto>, NotFound>]]، والـ tag من [[WithTags]].

---

## ٥. آخر الملف

~~~csharp ProductEndpoints.cs
        return g;
    }
}
public record ProductDto(int Id, string Name, decimal Price, string Category);
~~~

- [[return g;]]: بنرجّع المجموعة عشان اللي نادى يقدر يضيف عليها: [[app.MapProducts().RequireAuthorization();]].
- [[ProductDto]] (DTO = Data Transfer Object): شكل الرد. مستقل عن الـ entity [[Product]] اللي في الداتابيز، فتقدر تغيّر الجدول من غير ما الـ API يتغير، ومن غير ما ترجع حقول داخلية.

---

## ٦. الحل: [[by-sku]] بـ regex

~~~csharp ProductEndpoints.cs
g.MapGet("/by-sku/{sku:regex(^\\w{{3}}-\\d{{4}}$)}", (string sku) => $"sku {sku}");
~~~

- [[regex(...)]] constraint: القيمة لازم تطابق الـ regex.
- [[^\\w{{3}}-\\d{{4}}$]] بعد ما نشيل التضعيف = [[^\w{3}-\d{4}$]]: ٣ حروف أو أرقام ([[\w]])، شرطة، ٤ أرقام ([[\d]])، ومن أول النص ([[^]]) لآخره ([[$]]).
- **ليه مضاعف؟** [[{{3}}]] لأن الـ route template بيستخدم [[{ }]] للـ parameters. و [[\\]] لأن الـ backslash في string عادي في C# بيبدأ escape.

~~~text الناتج
/api/products/by-sku/PEN-0001  -> 200  sku PEN-0001
/api/products/by-sku/AB-12     -> 404
~~~

[[AB-12]] 404 مش 400، لنفس السبب: الـ constraint بيقول «الـ route ده مش ليك».

### من ويندوز

~~~powershell
curl.exe -s "http://localhost:5925/api/products?q=pen"
Invoke-RestMethod "http://localhost:5925/api/products?q=pen" | Format-Table
~~~

[[curl.exe]] طبع نفس الـ JSON، و [[Invoke-RestMethod]] حوّله objects وعرضه جدول (مع [[| Format-Table]]):

~~~text الناتج
id name     price category
-- ----     ----- --------
 1 Blue pen  5.50 Pens
 2 Red pen   6.00 Pens
~~~

---

## الخلاصة

| الـ parameter | بيتربط من |
|---|---|
| اسمه في الـ route ([[{id}]]) | الـ route |
| نوع بسيط (int و string و Guid و enum ...) مش في الـ route | الـ query string |
| نوع متسجل في الـ DI | الـ DI |
| [[CancellationToken]] و [[HttpContext]] | الـ request نفسه |
| أي نوع معقد تاني | الـ JSON body |

- اختياري = nullable ([[string?]]) أو ليه default ([[int page = 1]]). غير كده إجباري و 400 لو ناقص أو مش بيتحول.
- [[{id:int}]] بيأثر على اختيار الـ route (404)، مش validation (400).
- [[MapGroup]] + extension method لكل resource، و [[Results<A, B>]] بيخلي الردود الممكنة جزء من النوع والـ OpenAPI.
- 404 فاضي إلا لو [[UseStatusCodePages]].`,
          lines: [
            R`[[static class]] للـ extension method.`,
            "بداية.",
            R`extension على [[IEndpointRouteBuilder]] (الـ [[app]])، فتتنادى [[app.MapProducts()]].`,
            "بداية.",
            R`group: كل الـ routes تحته بتبدأ بـ [[/api/products]]، و [[WithTags]] للـ OpenAPI.`,
            R`[[ShopDb]] من DI، و [[q]] و [[page]] و [[size]] من الـ query، والاختياري nullable أو ليه default.`,
            R`[[AsNoTracking]]: قراية بس.`,
            R`فلتر اختياري: لو [[q]] null الشرط بيتشال.`,
            "ترتيب ثابت (لازم قبل Skip).",
            "pagination.",
            "projection لـ DTO: بيجيب الأعمدة المطلوبة بس.",
            "تنفيذ الـ query.",
            R`[[{id:int}]] constraint، ونوع الرجوع بيعلن الحالتين.`,
            "بداية.",
            "query.",
            "بالـ id.",
            "نفس الـ projection.",
            R`[[null]] لو مش موجود.`,
            R`404 أو 200 بـ JSON. الـ compiler مش هيسمح بحالة تالتة.`,
            "نهاية.",
            "رجّع الـ group عشان اللي بينادي يضيف عليه إعدادات.",
            "نهاية.",
            "نهاية.",
            "DTO: شكل الرد، مستقل عن شكل الجدول."
          ],
          sol: R`[[?q=pen]] بيرجع [[[{"id":1,"name":"Blue pen","price":5.50,"category":"Pens"},{"id":2,"name":"Red pen","price":6.00,"category":"Pens"}]]]. و [[/api/products/99]] بيرجع 404 من غير body ([[Content-Length: 0]])، و [[AddProblemDetails]] لوحدها مش بتملاه: لما تضيف [[app.UseStatusCodePages()]] بيبقى [[application/problem+json]] فيه [["title":"Not Found","status":404]] و [[traceId]]. و [[/api/products/abc]] برضه 404: [[abc]] مش int فالـ route [[{id:int}]] مطابقش أصلًا، ومفيش route تاني يطابق. لو شلت [[:int]] هيبقى 400 لأن الـ binding فشل يحوّل abc لـ int.

الـ sku: [[g.MapGet("/by-sku/{sku:regex(^\\w{{3}}-\\d{{4}}$)}", (string sku) => ...)]]. جرّبناها: [[PEN-0001]] بيرجع 200 و [[AB-12]] بيرجع 404. خد بالك من حاجتين: الـ [[{]] و [[}]] جوه الـ regex لازم يتكتبوا مضاعفين [[{{3}}]] لأن الـ route template بيستخدمهم، والـ backslash مضاعف في الـ C# string. ولأن الـ constraint مش validation، الـ sku الغلط بيرجع 404 مش 400. لو عايز رسالة واضحة: [[{sku}]] من غير constraint وافحص الشكل جوه الـ handler وارجع [[TypedResults.ValidationProblem]].`
        },
        {
          cmd: "controllers",
          title: "Controllers و [ApiController]: الطريقة التانية وإمتى تختارها",
          desc: R`قبل minimal APIs كل الـ APIs كانت controllers: class بتورث [[ControllerBase]]، وكل action method عليها [[[HttpGet]]] أو [[[HttpPost]]]، والـ route بـ [[[Route("api/[controller]")]]]. لسه موجودة ومدعومة بالكامل، وأغلب المشاريع القديمة في الشركات بيها.

[[[ApiController]]] بيفعّل حاجات مهمة: body binding تلقائي، و 400 تلقائي لو الـ validation فشل، و ProblemDetails للأخطاء. والـ dependencies بتيجي في الـ constructor (primary constructor أسهل).

ترجع [[ActionResult<T>]]: يا الـ object نفسه (200) يا [[NotFound()]] أو [[CreatedAtAction(...)]]. ولازم [[builder.Services.AddControllers()]] و [[app.MapControllers()]].`,
          example: R`[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController(IOrderService orders, ILogger<OrdersController> logger) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderSummary>> Get(int id, CancellationToken ct)
    {
        var order = await orders.GetAsync(id, ct);
        return order is null ? NotFound() : order;
    }
    [HttpPost]
    public async Task<ActionResult<OrderSummary>> Place(PlaceOrder body, CancellationToken ct)
    {
        var summary = await orders.PlaceAsync(body, ct);
        logger.LogInformation("Order {OrderId} placed by {Email}", summary.Id, body.CustomerEmail);
        return CreatedAtAction(nameof(Get), new { id = summary.Id }, summary);
    }
}`,
          try: R`ضيف action [[[HttpDelete("{id:int}")]]] بترجع [[204 NoContent]] لو اتمسح و 404 لو مش موجود. وبعدين اعمل نفس الـ endpoint بـ minimal API في [[MapGroup]] وقارن عدد السطور والـ OpenAPI اللي طلع للاتنين.`,
          flag: "script",
          deep: {
            why: R`هتشتغل على الاتنين: مشاريع قديمة كلها controllers، وجديدة كلها minimal. وأسئلة الانترفيو بتسأل «الفرق إيه وتختار إيه؟». والفرق مش في القدرة: الاتنين بيعملوا نفس الحاجة وبيشاركوا نفس الـ middleware والـ DI والـ auth.`,
            how: R`[[AddControllers()]] بيسجّل الـ MVC services، و [[MapControllers()]] بيدوّر على كل class بتورث [[ControllerBase]] (أو اسمها بيخلص بـ Controller وعليها [[[ApiController]]]) ويعمل routes من الـ attributes. [[[controller]]] في الـ route بيتبدل باسم الـ class من غير Controller ([[api/Orders]]).

الـ controller بيتعمل جديد مع كل request (scoped عمليًا)، فالـ dependencies في الـ constructor بتتحقن كل مرة. و [[ActionResult<T>]] بيسمحلك ترجع [[T]] مباشرة (implicit conversion) أو أي [[ActionResult]].

[[[ApiController]]] بيعمل model validation filter: قبل ما الـ action تشتغل، لو [[ModelState]] مش valid بيرجع 400 [[ValidationProblemDetails]] على طول. وفيه filters (زي middleware بس على مستوى MVC) للـ auth والـ exceptions والـ caching.

[[CreatedAtAction(nameof(Get), new { id }, body)]] بيرجع 201 وبيحط [[Location]] header بالـ URL الصح للـ Get action.`,
            when: R`minimal APIs للمشاريع الجديدة والـ microservices، وهي أسرع شوية وأقرب لـ Express. controllers لو الفريق متعود عليها، أو المشروع كبير ومحتاج conventions و filters كتير، أو بتكمّل مشروع قايم. متخلطش الاتنين في نفس الـ resource.`,
            mistakes: R`تنسى [[AddControllers()]] أو [[MapControllers()]] فالـ routes ترجع 404 من غير أي error. وتنسى [[[ApiController]]] فالـ validation متشتغلش والـ body يتربط من الـ form. وتحط business logic كتير جوه الـ controller: الـ controller يستقبل ويرد، والمنطق في service.`
          },
          teach: R`## الملف ده بيعمل إيه؟

controller فيه actionين: [[GET api/Orders/5]] بيجيب طلب، و [[POST api/Orders]] بيعمل طلب جديد ويرد 201. نفس شغل الـ minimal APIs، بس مكتوب كـ class والـ routes في attributes (الكلام اللي بين [[[ ]]] فوق الـ class والـ methods).

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في نفس مشروع الدرس اللي فات (PostgreSQL 16 جنبه)، مع [[IOrderService]] بسيط كتبته يقرا ويكتب في جدول [[Orders]]، و [[Microsoft.AspNetCore.Authentication.JwtBearer]] عشان [[[Authorize]]]، وتوكن تجربة من [[dotnet user-jwts create]] (أداة في الـ SDK بتعمل JWT للتطوير). والـ requests بـ [[curl]] من Git Bash على 5925.

---

## ٠. اللي لازم في Program.cs

~~~csharp Program.cs
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddScoped<IOrderService, OrderService>();
var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
~~~

- [[AddControllers()]]: سجّل حاجات الـ MVC (اللي بتشغّل الـ controllers).
- [[MapControllers()]]: دوّر على كل controller واعمل routes من الـ attributes بتوعه. لو نسيت ده، كل الـ routes بترجع 404 من غير أي error.
- [[AddScoped<IOrderService, OrderService>()]]: لما حد يطلب [[IOrderService]] اديله [[OrderService]] (درس DI).
- سطور الـ authentication عشان [[[Authorize]]] (category الـ Auth).

والملف نفسه محتاج فوقه:

~~~csharp OrdersController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
~~~

الأول فيه [[[Authorize]]]، والتاني فيه [[ControllerBase]] وكل الـ attributes التانية.

---

## ١. الـ attributes فوق الـ class

~~~csharp OrdersController.cs
[ApiController]
[Route("api/[controller]")]
[Authorize]
~~~

الـ attribute (اللي بين [[[ ]]]) معلومة بتتلزق على class أو method، والـ framework بيقراها. زي decorators في TypeScript.

| الـ attribute | بيعمل إيه |
|---|---|
| [[[ApiController]]] | الـ body يتقري من JSON لوحده، و 400 لوحده لو الـ validation فشل، والأخطاء ProblemDetails |
| [[[Route("api/[controller]")]]] | الـ prefix لكل الـ actions. [[[controller]]] بيتبدل باسم الـ class من غير كلمة Controller: [[api/Orders]] |
| [[[Authorize]]] | كل الـ actions محتاجة user مسجل دخول |

---

## ٢. الـ class والـ constructor

~~~csharp OrdersController.cs
public class OrdersController(IOrderService orders, ILogger<OrdersController> logger) : ControllerBase
~~~

- [[: ControllerBase]]: بيورث منها، وفيها methods جاهزة زي [[NotFound()]] و [[CreatedAtAction()]].
- [[(IOrderService orders, ILogger<OrdersController> logger)]]: primary constructor. الاتنين بييجوا من الـ DI أوتوماتيك. والـ controller بيتعمل **جديد مع كل request**.
- [[ILogger<OrdersController>]]: لوجر الـ category بتاعه اسم الـ class (درس ILogger).

---

## ٣. [[Get]]

~~~csharp OrdersController.cs
[HttpGet("{id:int}")]
public async Task<ActionResult<OrderSummary>> Get(int id, CancellationToken ct)
{
    var order = await orders.GetAsync(id, ct);
    return order is null ? NotFound() : order;
}
~~~

- [[[HttpGet("{id:int}")]]]: GET، والمسار بيتضاف على الـ prefix: [[api/Orders/{id:int}]].
- [[ActionResult<OrderSummary>]]: «يا OrderSummary يا أي رد تاني». لو رجعت [[order]] نفسه بيتحول لـ 200 + JSON لوحده.
- [[int id]] من الـ route، و [[CancellationToken ct]] بيتملى بـ token الـ request (درس CancellationToken)، وبنبعته للـ service.
- [[NotFound()]]: 404 (method من [[ControllerBase]]).

### من غير توكن

~~~bash
curl -si localhost:5925/api/Orders/1
~~~

~~~text الناتج
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json
WWW-Authenticate: Bearer

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.2","title":"Unauthorized","status":401,"traceId":"00-18d4670ce90da41083234f39adc3b53e-55344637f00c782e-00"}
~~~

[[[Authorize]]] وقف الـ request قبل ما يوصل للـ action. و [[WWW-Authenticate: Bearer]] بيقول للـ client «ابعتلي Bearer token».

### بالتوكن

~~~bash
curl -si -H "Authorization: Bearer $TOKEN" localhost:5925/api/Orders/1
~~~

- [[-H]]: ضيف header. و [[$TOKEN]] متغير في الـ shell فيه التوكن اللي [[user-jwts]] طلّعه.

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"id":1,"customerEmail":"sara@shop.test","total":0}
~~~

و [[api/Orders/9]] (مش موجود):

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: application/problem+json; charset=utf-8

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-f68eadb16bfc8452625b2c12da84fbad-160fb28da4f770ea-00"}
~~~

---

## ٤. [[Place]]: POST و 201

~~~csharp OrdersController.cs
[HttpPost]
public async Task<ActionResult<OrderSummary>> Place(PlaceOrder body, CancellationToken ct)
{
    var summary = await orders.PlaceAsync(body, ct);
    logger.LogInformation("Order {OrderId} placed by {Email}", summary.Id, body.CustomerEmail);
    return CreatedAtAction(nameof(Get), new { id = summary.Id }, summary);
}
~~~

- [[[HttpPost]]] من غير مسار: [[POST api/Orders]].
- [[PlaceOrder body]]: نوع معقد، فـ [[[ApiController]]] بيقراه من الـ JSON body. ([[PlaceOrder]] عندي record فيه [[CustomerEmail]] و [[ProductId]] و [[Quantity]].)
- [[logger.LogInformation("Order {OrderId} placed by {Email}", ...)]]: structured logging، الـ [[{OrderId}]] حقل مش interpolation (درس ILogger).
- [[CreatedAtAction(nameof(Get), new { id = summary.Id }, summary)]]:
  - [[nameof(Get)]]: اسم الـ action التانية كنص [["Get"]].
  - [[new { id = summary.Id }]]: قيم الـ route بتاعتها.
  - [[summary]]: الـ body.
  - الناتج: 201 و header [[Location]] فيه URL الـ Get للطلب الجديد.

~~~bash
curl -si -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"customerEmail":"ali@shop.test","productId":1,"quantity":3}' localhost:5925/api/Orders
~~~

- [[-d]] (data): الـ body، ومعاه curl بيخلي الـ method POST لوحده.
- [[Content-Type: application/json]]: لازم، غير كده الـ framework مش هيقرا الـ body كـ JSON (هيرد 415).

~~~text الناتج
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Location: http://localhost:5925/api/Orders/2

{"id":2,"customerEmail":"ali@shop.test","total":16.50}
~~~

[[16.50]] = ٣ أقلام × [[5.50]]. وفي لوج السيرفر:

~~~text الناتج
info: OrdersController[0]
      Order 2 placed by ali@shop.test
~~~

### body غلط

بعت [["productId":"x"]] (نص مكان رقم):

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json; charset=utf-8

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"body":["The body field is required."],"$.productId":["The JSON value could not be converted to PlaceOrder. Path: $.productId | LineNumber: 0 | BytePositionInLine: 48."]},"traceId":"..."}
~~~

الـ action مشتغلتش أصلًا: [[[ApiController]]] رد 400 لوحده بـ [[ValidationProblemDetails]]، و [[errors]] فيها مكان الغلطة ([[$.productId]] = حقل productId في أول الـ JSON).

---

## ٥. الحل: Delete بالطريقتين

### controller

~~~csharp OrdersController.cs
[HttpDelete("{id:int}")]
public async Task<IActionResult> Delete(int id, CancellationToken ct) => await orders.DeleteAsync(id, ct) ? NoContent() : NotFound();
~~~

[[IActionResult]] من غير نوع لأن مفيش body في أي حالة. و [[DeleteAsync]] عندي بترجع bool (اتمسح ولا لأ).

~~~text الناتج: curl -si -X DELETE -H "Authorization: Bearer $TOKEN" localhost:5925/api/Orders/1 (مرتين)
HTTP/1.1 204 No Content

HTTP/1.1 404 Not Found
Content-Type: application/problem+json; charset=utf-8
~~~

[[-X DELETE]]: اختار الـ method بنفسك.

### minimal

~~~csharp Extra.cs
g.MapDelete("/{id:int}", async Task<Results<NoContent, NotFound>> (int id, IOrderService orders, CancellationToken ct) => await orders.DeleteAsync(id, ct) ? TypedResults.NoContent() : TypedResults.NotFound());
~~~

### الـ OpenAPI للاتنين

~~~text الناتج: من /openapi/v1.json
DELETE /api/orders2/{id}  responses=204,404
DELETE /api/Orders/{id}   responses=200
GET /api/Orders/{id}      responses=200
POST /api/Orders          responses=200
~~~

الـ minimal طلع صح لوحده من [[Results<NoContent, NotFound>]]. الـ controller كل actions بتاعته طلعت [[200]] بس، حتى الـ POST اللي بيرجع 201، لأن [[IActionResult]] و [[ActionResult<T>]] مبيقولوش الـ status. عشان يطلعوا صح لازم attributes زي [[[ProducesResponseType(StatusCodes.Status204NoContent)]]] و [[[ProducesResponseType(StatusCodes.Status404NotFound)]]].

---

## الخلاصة

| | Controllers | Minimal APIs |
|---|---|---|
| الشكل | class بتورث [[ControllerBase]] | lambdas في [[MapGet]]/[[MapPost]] |
| الـ route | [[[Route]]] و [[[HttpGet("...")]]] | [[MapGroup]] و المسار في [[MapGet]] |
| الـ dependencies | constructor | parameters في الـ handler |
| التسجيل | [[AddControllers()]] + [[MapControllers()]] | مفيش |
| 400 للـ validation | [[[ApiController]]] لوحده | [[AddValidation()]] (.NET 10) |
| الـ status في OpenAPI | [[[ProducesResponseType]]] | من [[Results<...>]] لوحده |

- [[[controller]]] = اسم الـ class من غير Controller.
- [[CreatedAtAction]] = 201 + [[Location]].
- الاتنين بيشاركوا نفس الـ middleware والـ DI والـ auth، فاختار حسب المشروع والفريق.`,
          lines: [
            R`بيفعّل الـ binding والـ validation التلقائي و ProblemDetails.`,
            R`[[api/Orders]]: اسم الـ class من غير Controller.`,
            "كل الـ actions محتاجة user مسجل دخول (category الـ Auth).",
            R`primary constructor: الـ service واللوجر من الـ DI.`,
            "بداية.",
            R`[[GET api/Orders/5]].`,
            R`[[ActionResult<T>]]: يا T يا result تاني.`,
            "بداية.",
            R`الـ token بتاع الـ request اتبعت للـ service.`,
            R`[[NotFound()]] = 404، و [[order]] لوحده = 200 بـ JSON.`,
            "نهاية.",
            R`[[POST api/Orders]]، والـ body JSON بيتربط بـ [[PlaceOrder]].`,
            "action تانية.",
            "بداية.",
            "المنطق في الـ service.",
            R`structured logging: [[{OrderId}]] و [[{Email}]] حقول، مش string interpolation.`,
            R`201 + [[Location: .../api/Orders/1]].`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`الـ action: [[[HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id, CancellationToken ct) => await orders.DeleteAsync(id, ct) ? NoContent() : NotFound();]] (مع [[DeleteAsync]] بترجع bool في الـ service). [[curl -X DELETE]] بيرجع [[204]] من غير body أول مرة، وتاني مرة [[404]] بـ problem+json.

نسخة الـ minimal: [[g.MapDelete("/{id:int}", async Task<Results<NoContent, NotFound>> (int id, IOrderService orders, CancellationToken ct) => await orders.DeleteAsync(id, ct) ? TypedResults.NoContent() : TypedResults.NotFound());]] سطر واحد تقريبًا. في الـ OpenAPI الاتنين بيطلعوا بـ 204 و 404، بس الـ controller محتاج [[[ProducesResponseType(204)]]] و [[[ProducesResponseType(404)]]] عشان يظهروا صح، والـ minimal بياخدهم من نوع الرجوع [[Results<...>]] لوحده.`
        }
      ]
    }
]);
