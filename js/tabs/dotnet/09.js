// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "DI و middleware و الإعدادات",
      l: 2,
      n: "Singleton و Scoped و Transient، وترتيب الـ pipeline، و appsettings و IOptions، و ILogger",
      items: [
        {
          cmd: "DI و lifetimes",
          title: "Dependency Injection: Singleton و Scoped و Transient الفرق بينهم إيه؟",
          desc: R`في ASP.NET Core مبتعملش [[new OrderService(new ShopDb(...))]] بإيدك. بتسجّل الـ service مرة ([[builder.Services.AddScoped<IOrderService, OrderService>()]])، وأي حد محتاجه يطلبه في الـ constructor أو كـ parameter، والـ container بيعمله ويحقن الـ dependencies بتاعته.

الـ lifetime بيحدد كام نسخة: [[Singleton]] نسخة واحدة لكل التطبيق طول عمره. [[Scoped]] نسخة لكل request (كل اللي بيطلبوه في نفس الـ request بياخدوا نفس النسخة). [[Transient]] نسخة جديدة كل ما حد يطلب.

الـ [[DbContext]] Scoped (مع [[AddDbContext]])، والـ caches والـ clients اللي بيتشاركوا Singleton، والحاجات الخفيفة من غير state Transient أو Scoped.`,
          example: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<SingletonId>();
builder.Services.AddScoped<ScopedId>();
builder.Services.AddTransient<TransientId>();
var app = builder.Build();
app.MapGet("/ids", (SingletonId s, ScopedId sc1, ScopedId sc2, TransientId t1, TransientId t2) =>
    new { singleton = s.Id, scoped1 = sc1.Id, scoped2 = sc2.Id, transient1 = t1.Id, transient2 = t2.Id });
app.Run();
public class SingletonId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class ScopedId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class TransientId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }`,
          try: R`شغّل الملف ده بـ [[dotnet run di.cs]] واعمل [[curl localhost:5000/ids]] مرتين. مين اتغير ومين ثابت؟ وبعدين اعمل class [[PriceCache]] singleton بتاخد [[ScopedId]] في الـ constructor، وشغّل مرة بـ [[ASPNETCORE_ENVIRONMENT=Development]] ومرة Production.`,
          flag: "script",
          deep: {
            why: R`الـ DI بيفصل «مين محتاج إيه» عن «مين بيعمل إيه»: الـ OrderService محتاج [[IPaymentGateway]] ومش مهم له Stripe ولا Paymob ولا fake في الاختبار. والـ lifetime الغلط بيعمل bugs من أصعب ما يكون: داتا user بتتسرب لـ user تاني، أو DbContext بيتستخدم من threads كتير.`,
            how: R`الـ container بيبني شجرة: لما حد يطلب [[OrderService]]، بيبص على الـ constructor، ويحل كل parameter بنفس الطريقة، لحد الآخر. لو نوع مش متسجل: [[InvalidOperationException: Unable to resolve service for type ...]].

كل request ليه scope: الـ Scoped services بتتعمل أول مرة حد يطلبها في الـ request ده، وبتتعمل [[Dispose]] لما الـ request يخلص. الـ Singleton بيتعمل مرة ويعيش لحد ما التطبيق يقفل، فلازم يبقى thread-safe لأن كل الـ requests بتستخدمه مع بعض.

القاعدة الذهبية: service متعيشش أطول من الـ dependencies بتاعتها. Singleton بياخد Scoped = الـ Scoped اتمسك جوه الـ Singleton للأبد (captive dependency): نفس الـ DbContext لكل الـ requests. في Development الـ container بيفحص ده ([[ValidateScopes]]) وبيرمي exception وقت الـ startup. في Production الفحص مقفول افتراضيًا (عشان الأداء) فالـ bug بيعدّي بهدوء.

لو Singleton محتاج Scoped فعلًا (زي BackgroundService محتاج DbContext): خد [[IServiceScopeFactory]] واعمل scope بإيدك (المستوى ٣). وفيه كمان keyed services ([[AddKeyedSingleton<IPayment, Stripe>("stripe")]] و [[[FromKeyedServices("stripe")]]]) لو عندك كذا implementation لنفس الـ interface.`,
            when: R`Scoped افتراضي لأي service بتتعامل مع الداتابيز أو بيانات الـ request. Singleton لحاجات مكلفة في الإنشاء و thread-safe (cache، HttpClient factory، configuration، [[TimeProvider]]). Transient لخدمات خفيفة من غير state. ولو مش متأكد: Scoped.`,
            mistakes: R`Singleton بياخد DbContext (captive). و Singleton فيه state متغير من غير lock. و [[new]] لـ service متسجل فالـ dependencies متتحقنش. و [[app.Services.GetService<ShopDb>()]] برّه scope: [[Cannot resolve scoped service from root provider]]. وفي الانترفيو ده سؤال ثابت (آخر category، درس captive dependency).`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

API صغير في ملف واحد [[di.cs]] بيوريك بعينك الفرق بين الـ lifetimes التلاتة. فيه ٣ classes متطابقين، كل واحد بياخد ID عشوائي **لحظة ما يتعمل**. بنسجّل واحد Singleton وواحد Scoped وواحد Transient، وبنطلبهم في endpoint ونطبع الـ IDs: لو الـ ID اتكرر يبقى نفس النسخة، ولو اتغير يبقى نسخة جديدة.

جرّبته بـ [[dotnet run di.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401)، مع [[-- --urls http://0.0.0.0:8080]] عشان أوصله من برّه على 5925، و [[curl]] من Git Bash.

---

## ١. أول سطرين: [[#:]]

~~~csharp di.cs
#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
~~~

ملف [[.cs]] لوحده من غير [[.csproj]] (درس «dotnet run app.cs»)، والسطور اللي بتبدأ بـ [[#:]] بتقوم بدور الـ csproj:

- [[#:sdk Microsoft.NET.Sdk.Web]]: استخدم الـ SDK بتاع الويب، فيبقى عندك [[WebApplication]] و ASP.NET Core كله.
- [[#:property PublishAot=false]]: الملفات اللي من غير مشروع في .NET 10 افتراضها [[PublishAot=true]] (تتبني Native AOT). ده بيقفل الـ reflection في الـ JSON، والـ anonymous object اللي بنرجعه محتاجه. شلت السطر وجربت:

~~~text الناتج
warning IL3050: Using member '...MapGet(IEndpointRouteBuilder, String, Delegate)' which has 'RequiresDynamicCodeAttribute' can break functionality when AOT compiling. ...
~~~

ولما عملت request رجع [[500]] من غير body، وفي اللوج:

~~~text الناتج
System.NotSupportedException: JsonTypeInfo metadata for type '<>f__AnonymousType0$__bt5[System.String,System.String,System.String,System.String,System.String]' was not provided by TypeInfoResolver ...
~~~

يعني الـ JSON serializer مش عارف يحوّل الـ object من غير reflection. السطر ده بيرجّع السلوك العادي بتاع أي مشروع ويب.

---

## ٢. الـ classes (آخر الملف)

~~~csharp di.cs
public class SingletonId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class ScopedId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class TransientId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
~~~

التلاتة نفس الكود بالظبط، الاسم بس اللي مختلف عشان نسجّل كل واحد بـ lifetime. نفك [[Guid.NewGuid().ToString()[..4]]]:

| الحتة | معناها | مثال |
|---|---|---|
| [[Guid.NewGuid()]] | ID عشوائي ١٢٨ bit (Globally Unique ID) | |
| [[.ToString()]] | نص | [[209d3c1e-...]] |
| [[[..4]]] | range: من الأول لحد index 4 (من غيره) يعني أول ٤ حروف | [[209d]] |

و [[{ get; } = ...]]: property للقراية بس، قيمتها بتتحسب **مرة واحدة** وقت ما الـ object يتعمل. فالـ ID هو بصمة النسخة.

---

## ٣. التسجيل

~~~csharp di.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<SingletonId>();
builder.Services.AddScoped<ScopedId>();
builder.Services.AddTransient<TransientId>();
var app = builder.Build();
~~~

| الـ method | كام نسخة |
|---|---|
| [[AddSingleton<T>()]] | واحدة للتطبيق كله، طول ما هو شغال |
| [[AddScoped<T>()]] | واحدة لكل request (اسمه scope)، وكل اللي بيطلبوه في نفس الـ request بياخدوها |
| [[AddTransient<T>()]] | جديدة كل مرة حد يطلب |

هنا بنسجّل الـ class نفسها. في الشغل الحقيقي غالبًا بتسجّل interface و implementation: [[AddScoped<IOrderService, OrderService>()]].

---

## ٤. الـ endpoint

~~~csharp di.cs
app.MapGet("/ids", (SingletonId s, ScopedId sc1, ScopedId sc2, TransientId t1, TransientId t2) =>
    new { singleton = s.Id, scoped1 = sc1.Id, scoped2 = sc2.Id, transient1 = t1.Id, transient2 = t2.Id });
app.Run();
~~~

- الـ parameters الخمسة أنواعهم متسجلة في الـ DI، فبتتملى منه (درس MapGet و MapGroup).
- طالبين [[ScopedId]] **مرتين** و [[TransientId]] **مرتين** في نفس الـ request عشان نشوف هل هما نفس النسخة.
- بنرجّع anonymous object بالـ IDs كلها كـ JSON.

---

## ٥. النتيجة

~~~bash
curl -s localhost:5925/ids
curl -s localhost:5925/ids
~~~

~~~text الناتج
{"singleton":"209d","scoped1":"957a","scoped2":"957a","transient1":"0a63","transient2":"de95"}
{"singleton":"209d","scoped1":"ddd1","scoped2":"ddd1","transient1":"59c4","transient2":"fb0e"}
~~~

(الحروف عشوائية، فعندك هتطلع غيرها، بس **نفس النمط**.)

| | جوه نفس الـ request | بين requestين |
|---|---|---|
| singleton | — | نفسه ([[209d]] و [[209d]]) |
| scoped | نفسه ([[957a]] و [[957a]]) | اتغير ([[957a]] ثم [[ddd1]]) |
| transient | اتغير ([[0a63]] و [[de95]]) | اتغير |

وفي اللوج قال [[Hosting environment: Production]]: الملف لوحده مفيهوش [[launchSettings.json]]، فالـ environment الافتراضي Production. ده هيفرق في الحل.

---

## ٦. الحل: captive dependency

~~~csharp di.cs
builder.Services.AddScoped<ScopedId>();
builder.Services.AddSingleton<PriceCache>();
builder.Host.UseDefaultServiceProvider(o => { o.ValidateScopes = true; o.ValidateOnBuild = true; });
var app = builder.Build();
app.MapGet("/", (PriceCache c) => c.Describe());
app.Run();
public class ScopedId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class PriceCache(ScopedId id) { public string Describe() => $"captured {id.Id}"; }
~~~

- [[PriceCache(ScopedId id)]]: Singleton بيطلب Scoped في الـ constructor. الـ Singleton بيتعمل مرة واحدة، فالـ [[ScopedId]] اللي اتحقن فيه هيفضل **محبوس** جواه للأبد. ده اسمه captive dependency.
- [[builder.Host.UseDefaultServiceProvider(o => ...)]]: إعدادات الـ DI container نفسه:
  - [[ValidateScopes = true]]: ارمي exception لو Singleton خد Scoped.
  - [[ValidateOnBuild = true]]: افحص كل التسجيلات وقت [[Build()]] بدل أول request.

~~~text الناتج: dotnet run di.cs (Production)
Unhandled exception. System.AggregateException: Some services are not able to be constructed (Error while validating the service descriptor 'ServiceType: PriceCache Lifetime: Singleton ImplementationType: PriceCache': Cannot consume scoped service 'ScopedId' from singleton 'PriceCache'.)
~~~

التطبيق مقامش، والرسالة بتقول المشكلة بالظبط. [[AggregateException]] معناها exception شايل جواه كذا exception (واحد لكل تسجيل فيه مشكلة).

### من غير السطر ده

شلت [[UseDefaultServiceProvider]] وشغلت تاني:

| الـ environment | اللي حصل |
|---|---|
| Production (الافتراضي هنا) | قام عادي، و [[/]] رجّع [[captured ba77]] مرتين: نفس الـ ScopedId في كل الـ requests |
| Development ([[-e ASPNETCORE_ENVIRONMENT=Development]]) | وقع وقت [[Build()]] بنفس رسالة [[Cannot consume scoped service 'ScopedId' from singleton 'PriceCache'.]] |

في Development الفحصين شغالين لوحدهم، وفي Production مقفولين (عشان سرعة الـ startup)، فالـ bug بيعدّي بهدوء. لو الـ Scoped ده كان [[DbContext]]، كل الـ requests هتستخدم نفس الـ DbContext من threads مختلفة.

---

## الخلاصة

- Singleton: نسخة للتطبيق. Scoped: نسخة لكل request. Transient: نسخة لكل طلب.
- service متعيشش أطول من الـ dependencies بتاعتها: Singleton ياخد Singleton بس.
- Development بيفحص الـ captive dependency وقت الـ startup، Production لأ، إلا لو فعّلت [[ValidateScopes]] و [[ValidateOnBuild]].
- [[#:sdk Microsoft.NET.Sdk.Web]] بيخلي ملف [[.cs]] لوحده API، و [[#:property PublishAot=false]] عشان الـ JSON يشتغل بالـ reflection.`,
          lines: [
            "builder.",
            "نسخة واحدة للتطبيق كله.",
            "نسخة لكل request.",
            "نسخة لكل طلب.",
            "build.",
            R`بنطلب الـ scoped مرتين والـ transient مرتين في نفس الـ request.`,
            "JSON بالـ IDs.",
            "run.",
            R`كل class بتاخد ID عشوائي (أول ٤ حروف من Guid) وقت إنشائها.`,
            "نفس الفكرة.",
            "نفس الفكرة."
          ],
          sol: R`أول request: [[{"singleton":"c7b8","scoped1":"3258","scoped2":"3258","transient1":"0a98","transient2":"7824"}]]. التاني: [[{"singleton":"c7b8","scoped1":"d18d","scoped2":"d18d","transient1":"850c","transient2":"bc6b"}]]. الـ singleton ثابت في الاتنين، والـ scoped واحد جوه الـ request الواحد ومتغير بين الـ requests، والـ transient مختلف حتى جوه نفس الـ request.

مع [[PriceCache(ScopedId id)]] singleton: في Development التطبيق بيقع وقت [[Build()]] بـ [[Cannot consume scoped service 'ScopedId' from singleton 'PriceCache'.]]. في Production بيشتغل عادي من غير أي تحذير، والـ [[ScopedId]] اللي جوه الـ cache هيفضل نفسه للأبد. ده ليه لازم تشغّل التطبيق في Development قبل ما ترفع، أو تفعّل [[ValidateScopes]] و [[ValidateOnBuild]] في كل البيئات.`,
          solCode: R`#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<ScopedId>();
builder.Services.AddSingleton<PriceCache>();
builder.Host.UseDefaultServiceProvider(o => { o.ValidateScopes = true; o.ValidateOnBuild = true; });
var app = builder.Build();
app.MapGet("/", (PriceCache c) => c.Describe());
app.Run();
public class ScopedId { public string Id { get; } = Guid.NewGuid().ToString()[..4]; }
public class PriceCache(ScopedId id) { public string Describe() => $"captured {id.Id}"; }`
        },
        {
          cmd: "middleware pipeline",
          title: "الـ middleware pipeline: الترتيب هو كل حاجة",
          desc: R`كل request بيعدي على سلسلة middleware بالترتيب اللي كتبته بـ [[app.Use...]]، وكل واحد بيعمل حاجة قبل ما ينادي [[next]] وحاجة بعده، والرد بيرجع بالترتيب العكسي. زي Express بالظبط، والفرق إن الـ middleware async وبياخد [[HttpContext]].

الترتيب المعتاد: [[UseExceptionHandler]] (أول واحد عشان يمسك كل حاجة)، [[UseForwardedHeaders]] (لو ورا Nginx)، [[UseHttpsRedirection]]، [[UseStaticFiles]]، [[UseCors]]، [[UseAuthentication]]، [[UseAuthorization]]، وبعدين الـ endpoints. الـ routing بيحصل لوحده قبل الـ middleware اللي محتاجاه.

تقدر تكتب middleware inline بـ [[app.Use(async (ctx, next) => { ... })]] أو class فيها [[InvokeAsync(HttpContext ctx)]].`,
          example: R`app.UseExceptionHandler();
app.UseStatusCodePages();
app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    ctx.Response.Headers["X-Request-Id"] = ctx.TraceIdentifier;
    await next(ctx);
    app.Logger.LogInformation("{Method} {Path} -> {Status} in {Ms}ms",
        ctx.Request.Method, ctx.Request.Path, ctx.Response.StatusCode, sw.ElapsedMilliseconds);
});
app.UseAuthentication();
app.UseAuthorization();
app.MapProducts();
app.MapControllers();`,
          try: R`ضيف middlewareين A و B كل واحد بيطبع «before» و «after» حوالين [[next]] وشوف الترتيب. وبعدين خلّي endpoint ترمي exception: هل سطر اللوج بتاع الـ timing اتطبع؟ صلّحه بـ try/finally. وأخيرًا انقل [[UseAuthorization]] قبل [[UseAuthentication]] وجرّب endpoint محمية بتوكن سليم.`,
          flag: "script",
          deep: {
            why: R`نص مشاكل ASP.NET Core اللي بتلاقيها على Stack Overflow سببها ترتيب: الـ CORS مش شغال، والـ auth بيرجع 401 لتوكن سليم، والـ exception handler مش ماسك، والـ HTTPS redirect بيعمل loop ورا Nginx. لو فهمت إن الـ pipeline سلسلة بتتنفذ بالترتيب، هتحل كل ده في دقيقة.`,
            how: R`[[app.Use]] بيضيف delegate بياخد [[(HttpContext, RequestDelegate next)]]. لو منادتش [[next]] الـ pipeline بيقف عندك (short-circuit)، وده اللي بيعمله static files لما يلاقي الملف، والـ auth لما يرجع 401.

بعد ما [[next]] يرجع، الـ response ممكن يكون ابتدى يتبعت، فمتقدرش تغيّر headers ساعتها (استخدم [[ctx.Response.OnStarting]]). و [[ctx.TraceIdentifier]] ID فريد للـ request بيظهر في اللوج و ProblemDetails.

لو exception حصل تحت، هيطلع من [[await next(ctx)]] عندك، وأي كود بعده مش هيتنفذ إلا لو في [[finally]]. الـ [[UseExceptionHandler]] فوق هو اللي هيمسكه.

[[UseAuthentication]] بيقرا الـ token ويملى [[ctx.User]]. [[UseAuthorization]] بيبص على الـ endpoint المختار ويشوف policy بتاعه ويقارن بـ [[ctx.User]]. لو عكستهم، الـ authorization بيشوف user فاضي فيرجع 401 حتى للتوكن السليم. وفي .NET الحديث [[WebApplication]] بيضيف الاتنين لوحده لو سجلت auth services ومحطتهمش، بس الأوضح تكتبهم صريح.`,
            when: R`middleware لحاجات بتتعمل لكل request: logging، و correlation IDs، و headers أمنية، و tenant resolution. لحاجة خاصة بـ endpoints معينة استخدم endpoint filters ([[AddEndpointFilter]]) أو policies مش middleware.`,
            mistakes: R`middleware بيكتب في الـ response بعد [[next]] ويستغرب [[Headers are read-only, response has already started]]. ولوج بعد [[await next]] من غير finally فالـ requests اللي وقعت مش بتظهر (حصل في مشروع التاب ده فعلًا: الـ 409 مكانش بيتسجل). وترتيب auth غلط. قارن بدرس «ترتيب الـ middleware» في «تاب Backend بـ Node».`
          },
          teach: R`## الكود ده بيعمل إيه؟

ده الجزء اللي بعد [[builder.Build()]] في Program.cs: الـ middleware بالترتيب، وجواه middleware بنكتبه بإيدنا بيحط header فيه ID الـ request، وبيقيس الـ request خد قد إيه ويكتب سطر لوج واحد لكل request.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في نفس مشروع الدروس اللي فاتت (PostgreSQL 16، و JWT من [[dotnet user-jwts]])، وضفت للتجربة endpoints [[/hi]] و [[/boom]] (بيرمي exception) و [[/secure]] (محتاج توكن). والـ requests بـ [[curl]] من Git Bash على 5925.

---

## ١. الفكرة: سلسلة بالترتيب

كل [[app.Use...]] بيضيف حلقة في سلسلة. الـ request بيدخل من أول حلقة، وكل حلقة بتعمل حاجة وتنادي [[next]] (الحلقة اللي بعدها)، ولما الـ endpoint يخلص الرد بيرجع **بالعكس** على نفس الحلقات. زي Express بالظبط.

---

## ٢. أول اتنين

~~~csharp Program.cs
app.UseExceptionHandler();
app.UseStatusCodePages();
~~~

- [[UseExceptionHandler]] أول واحد: بيلف **كل** اللي بعده في try/catch (درس ProblemDetails). أي middleware قبله مش محمي.
- [[UseStatusCodePages]]: الردود الفاضية 4xx و 5xx تتملى ProblemDetails.

---

## ٣. الـ middleware بتاعنا

~~~csharp Program.cs
app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    ctx.Response.Headers["X-Request-Id"] = ctx.TraceIdentifier;
    await next(ctx);
    app.Logger.LogInformation("{Method} {Path} -> {Status} in {Ms}ms",
        ctx.Request.Method, ctx.Request.Path, ctx.Response.StatusCode, sw.ElapsedMilliseconds);
});
~~~

### [[app.Use(async (ctx, next) => { ... })]]

- lambda async بتاخد حاجتين:
  - [[ctx]] (اختصار context) نوعه [[HttpContext]]: كل حاجة عن الـ request ([[ctx.Request]]) والرد ([[ctx.Response]]). زي [[req]] و [[res]] في Express مع بعض.
  - [[next]]: الحلقة اللي بعدك.

### قبل [[next]]

- [[Stopwatch.StartNew()]]: ساعة بتبدأ دلوقتي. محتاجة [[using System.Diagnostics;]] فوق الملف.
- [[ctx.Response.Headers["X-Request-Id"] = ctx.TraceIdentifier;]]: ضيف header للرد. [[TraceIdentifier]] ID فريد للـ request بيظهر في اللوج كمان.
- الـ header **قبل** [[next]]: بعد ما الـ endpoint يكتب الرد، الـ headers بتكون اتبعتت ومينفعش تتغير.

### [[await next(ctx)]]

«كمّل للي بعدي، واستنى لحد ما الرد كله يخلص». لو منادتش [[next]] خالص، الـ request بيقف عندك (short-circuit)، وده اللي الـ auth بيعمله لما يرجع 401.

### بعد [[next]]

- [[app.Logger]]: لوجر جاهز في [[WebApplication]]. الـ category بتاعه اسم التطبيق (هنا [[Shop]]).
- [[LogInformation("{Method} {Path} -> {Status} in {Ms}ms", ...)]]: structured logging، كل [[{...}]] حقل والقيم بالترتيب بعد الـ template (درس ILogger).
- [[ctx.Response.StatusCode]] هنا بيبقى الـ status النهائي، لأن الـ endpoint خلص.

~~~bash
curl -si localhost:5925/api/products/1
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Request-Id: 0HNP4ILQSIKH9:00000001

{"id":1,"name":"Blue pen","price":5.50,"category":"Pens"}
~~~

[[0HNP4ILQSIKH9]] ID الـ connection، و [[:00000001]] رقم الـ request عليه. وفي لوج السيرفر:

~~~text الناتج
info: Shop[0]
      GET /api/products/1 -> 200 in 283ms
~~~

٢٨٣ms لأنه أول request: EF Core بيجهز نفسه أول مرة. [[/hi]] بعده خد [[2ms]].

---

## ٤. الـ auth والـ endpoints

~~~csharp Program.cs
app.UseAuthentication();
app.UseAuthorization();
app.MapProducts();
app.MapControllers();
~~~

| السطر | بيعمل إيه |
|---|---|
| [[UseAuthentication()]] | يقرا التوكن من header [[Authorization]] ويملى [[ctx.User]] |
| [[UseAuthorization()]] | يشوف الـ endpoint اللي اتختار محتاج إيه، ويقارن بـ [[ctx.User]] |
| [[MapProducts()]] | الـ minimal endpoints (درس MapGroup) |
| [[MapControllers()]] | الـ controllers |

والـ routing (اختيار الـ endpoint) بيحصل لوحده قبل الـ middleware اللي محتاجه، فـ [[UseAuthorization]] عارف هو رايح لأنهي endpoint.

---

## ٥. التجربة: A و B

ضفت middlewareين بعد بتاعنا:

~~~csharp Program.cs
app.Use(async (ctx, next) => { Console.WriteLine("A before"); await next(ctx); Console.WriteLine("A after"); });
app.Use(async (ctx, next) => { Console.WriteLine("B before"); await next(ctx); Console.WriteLine("B after"); });
~~~

و [[curl localhost:5925/hi]] (الـ handler بيطبع [[handler]]):

~~~text الناتج
A before
B before
handler
B after
A after
info: Shop[0]
      GET /hi -> 200 in 2ms
~~~

زي البصلة: دخول بالترتيب، وخروج بالعكس. وسطر الـ timing آخر حاجة لأن الـ middleware بتاعنا هو الأول من التلاتة.

### لما الـ endpoint يرمي

[[curl localhost:5925/boom]] رجع 500، واللوج:

~~~text الناتج
A before
B before
fail: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]
      An unhandled exception has occurred while executing the request.
      System.InvalidOperationException: boom
~~~

مفيش [[B after]] ولا [[A after]] ولا سطر الـ timing: الـ exception طلع من [[await next(ctx)]] عند كل واحد، فالكود اللي بعده متنفذش، لحد ما [[UseExceptionHandler]] مسكه. يعني الـ requests اللي وقعت **مش بتظهر** في لوج الـ timing، وهي بالظبط اللي محتاجها.

### الحل: try/finally

~~~csharp Program.cs
app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    try
    {
        await next(ctx);
    }
    finally
    {
        app.Logger.LogInformation("{Method} {Path} -> {Status} in {Ms}ms",
            ctx.Request.Method, ctx.Request.Path, ctx.Response.StatusCode, sw.ElapsedMilliseconds);
    }
});
~~~

[[finally]] بيتنفذ حتى لو [[next]] رمى (درس exceptions). [[/boom]] تاني:

~~~text الناتج
info: Shop[0]
      GET /boom -> 200 in 1ms
~~~

السطر ظهر، بس مكتوب **200** والـ client خد 500! لأن وقت الـ finally الـ exception لسه طالع لفوق، و [[UseExceptionHandler]] (اللي قبلنا) هو اللي هيحط 500 بعدين. فالرقم ده مش مضمون مع الـ exceptions: اعتمد على لوج الـ exception handler، أو امسك الـ exception وسجّل 500 بنفسك.

### عكس ترتيب الـ auth

بدلت [[UseAuthorization()]] قبل [[UseAuthentication()]]، وبعت توكن سليم لـ [[/secure]] (عليه [[RequireAuthorization()]]):

~~~bash
curl -si -H "Authorization: Bearer $TOKEN" localhost:5925/secure
~~~

~~~text الناتج
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json
WWW-Authenticate: Bearer
~~~

وقت ما الـ authorization فحص، [[ctx.User]] كان لسه فاضي لأن الـ authentication لسه مجاش دوره. وبالترتيب الصح نفس الـ request رجّع 200.

---

## الخلاصة

| الترتيب المعتاد | ليه في المكان ده |
|---|---|
| [[UseExceptionHandler]] | أول واحد عشان يحمي الكل |
| [[UseStatusCodePages]] | يملى الردود الفاضية |
| middleware بتاعك (logging، headers) | يشوف كل request |
| [[UseAuthentication]] | يملى [[ctx.User]] |
| [[UseAuthorization]] | محتاج [[ctx.User]] |
| [[MapXxx]] | الـ endpoints |

- [[app.Use(async (ctx, next) => ...)]]: قبل [[next]] للـ request، وبعده للرد.
- الـ headers قبل [[next]].
- الكود بعد [[await next]] مش بيتنفذ لو حصل exception، إلا في [[finally]].`,
          lines: [
            "أول واحد: بيلف كل اللي تحته في try/catch.",
            "الردود الفاضية تبقى ProblemDetails.",
            "middleware inline.",
            "بداية.",
            "ساعة لكل request.",
            R`header قبل [[next]] (بعده ممكن يبقى متأخر).`,
            "كمّل للي بعده، وارجع لما الرد يخلص.",
            "بعد الرد: سطر لوج واحد لكل request.",
            "القيم.",
            "نهاية.",
            R`بيقرا الـ JWT ويملى [[ctx.User]].`,
            "بيفحص الصلاحيات على الـ endpoint المختار (لازم بعد الـ authentication).",
            "الـ minimal endpoints.",
            "الـ controllers."
          ],
          sol: R`الترتيب: [[A before]] ثم [[B before]] ثم الـ handler ثم [[B after]] ثم [[A after]]، زي البصلة. لو الـ endpoint رمت، [[A after]] و [[B after]] مش هيتطبعوا، وسطر الـ timing مش هيظهر (الـ 409 والـ 500 بيختفوا من لوجك بالظبط لما تكون محتاجهم). الحل: [[try { await next(ctx); } finally { log... }]]، والـ status جوه الـ finally ممكن يبقى لسه 200 لأن الـ exception handler فوق هو اللي هيحطه 500، فسجّل الـ exception كمان أو اعتمد على لوج الـ exception handler.

مع [[UseAuthorization]] قبل [[UseAuthentication]]: endpoint عليها [[RequireAuthorization]] بترجع 401 حتى مع توكن سليم، لأن وقت الفحص [[ctx.User]] لسه فاضي.`,
          solCode: R`app.Use(async (ctx, next) =>
{
    var sw = Stopwatch.StartNew();
    try
    {
        await next(ctx);
    }
    finally
    {
        app.Logger.LogInformation("{Method} {Path} -> {Status} in {Ms}ms",
            ctx.Request.Method, ctx.Request.Path, ctx.Response.StatusCode, sw.ElapsedMilliseconds);
    }
});`
        },
        {
          cmd: "configuration و options",
          title: "appsettings.json و env vars و IOptions: الإعدادات من غير process.env في كل حتة",
          desc: R`الإعدادات بتيجي من طبقات، واللي بعد بيكسب: [[appsettings.json]] ثم [[appsettings.Development.json]] (حسب الـ environment) ثم user secrets (في التطوير بس) ثم environment variables ثم command-line args. الـ hierarchy بـ [[:]] في الكود ([[Shop:PageSize]]) و [[__]] (اتنين underscore) في الـ env vars ([[Shop__PageSize=50]]).

بدل ما تقرا [[config["Shop:PageSize"]]] كـ string في كل حتة، اعمل class واربطها: [[AddOptions<ShopOptions>().BindConfiguration("Shop")]]، واطلب [[IOptions<ShopOptions>]] في أي service. ومعاها [[ValidateDataAnnotations()]] و [[ValidateOnStart()]] فالتطبيق ميقومش أصلًا لو الإعدادات غلط.

الأسرار (connection strings، مفاتيح JWT) مش في [[appsettings.json]] اللي في git: في التطوير [[dotnet user-secrets]]، وفي الإنتاج env vars أو secret store.`,
          example: R`builder.Services.AddOptions<ShopOptions>()
    .BindConfiguration("Shop")
    .ValidateDataAnnotations()
    .ValidateOnStart();
app.MapGet("/settings", (IOptions<ShopOptions> o, IConfiguration cfg) =>
    new { o.Value.PageSize, o.Value.SupportEmail, raw = cfg["Shop:PageSize"] });
public class ShopOptions
{
    [Range(1, 100)] public int PageSize { get; set; }
    [Required, EmailAddress] public string SupportEmail { get; set; } = "";
}
// appsettings.json: { "Shop": { "PageSize": 20, "SupportEmail": "help@shop.test" } }
// Shop__PageSize=50 dotnet run         -> {"pageSize":50,...}
// Shop__PageSize=500 dotnet run        -> OptionsValidationException وقت الـ startup`,
          try: R`اعمل [[dotnet user-secrets init]] ثم [[dotnet user-secrets set "ConnectionStrings:Shop" "Host=localhost;..."]] وشيل الـ connection string من [[appsettings.Development.json]]. التطبيق لسه شغال؟ السر اتخزن فين؟ وجرّب نفس المفتاح كـ env var [[ConnectionStrings__Shop]]: مين كسب؟`,
          flag: "script",
          deep: {
            why: R`نفس الكود بيشتغل في التطوير والـ staging والإنتاج بإعدادات مختلفة، ومن غير ما الأسرار تدخل git. والـ options المتفحوصة بتحوّل «الإيميلات مش بتتبعت من أسبوع لأن الـ SMTP port غلط» لـ «التطبيق مقامش والسبب مكتوب في أول سطر لوج».`,
            how: R`[[IConfiguration]] قاموس مسطح بمفاتيح زي [[Shop:PageSize]]، وكل مصدر بيكتب فوق اللي قبله. الـ env var [[Shop__PageSize]] بيتحول لـ [[Shop:PageSize]] (لأن [[:]] مش مسموحة في أسماء env vars على كل الأنظمة). و [[GetConnectionString("Shop")]] اختصار لـ [[ConnectionStrings:Shop]].

[[BindConfiguration]] بيملى الـ class بالاسم (case-insensitive) ويحوّل الأنواع. [[IOptions<T>]] singleton بيتقري مرة. [[IOptionsSnapshot<T>]] scoped بيعيد القراية كل request (لو الملف اتغير). [[IOptionsMonitor<T>]] singleton وبيبلغك بالتغيير.

[[dotnet user-secrets]] بيخزن JSON في [[~/.microsoft/usersecrets/<id>/secrets.json]] برّه فولدر المشروع، والـ id متخزن في الـ csproj ([[UserSecretsId]]). بيتقري في Development بس، فمينفعش يبقى حل للإنتاج.

الـ environment من [[ASPNETCORE_ENVIRONMENT]] (أو [[DOTNET_ENVIRONMENT]]): Development أو Staging أو Production أو أي اسم، و [[appsettings.{Name}.json]] بيتقري حسبه.`,
            when: R`[[appsettings.json]] للقيم الافتراضية الغير سرية. [[appsettings.Development.json]] لإعدادات التطوير (connection string محلي بباسورد تافه مقبول). user secrets لمفاتيح API الحقيقية وانت بتطوّر. env vars أو Docker secrets أو Key Vault في الإنتاج. وقارن بـ «config.js بـ zod» في «تاب Backend بـ Node»: نفس الفكرة.`,
            mistakes: R`سر حقيقي في [[appsettings.json]] ويترفع على GitHub. و [[:]] في env var بدل [[__]]. وتنسى إن [[dotnet publish]] بينسخ [[appsettings.Development.json]] للناتج (لو فيه أسرار شيله أو امنعه). وتقرا [[IConfiguration]] string في ٢٠ مكان بدل options class واحدة متفحوصة.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيعمل class [[ShopOptions]] فيها إعدادات المتجر ([[PageSize]] و [[SupportEmail]])، ويربطها بقسم [[Shop]] في الإعدادات، ويفحصها **وقت ما التطبيق بيقوم**. وبعدين endpoint [[/settings]] بيوريك القيم اللي اتقرت.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في نفس مشروع الدروس اللي فاتت، وغيرت الإعدادات بـ env vars من [[docker exec -e]]، و [[curl]] من Git Bash على 5925.

---

## ١. الإعدادات في [[appsettings.json]]

~~~text appsettings.json
{
  "ConnectionStrings": { "Shop": "Host=...;Database=shop;..." },
  "Shop": {
    "PageSize": 20,
    "SupportEmail": "help@shop.test"
  }
}
~~~

قسم [[Shop]] جواه مفتاحين. جوه .NET كل الإعدادات بتتحول لقاموس مسطح، والمستويات بتتفصل بـ [[:]]: [[Shop:PageSize]] = 20.

---

## ٢. الـ options class

~~~csharp ShopOptions.cs
public class ShopOptions
{
    [Range(1, 100)] public int PageSize { get; set; }
    [Required, EmailAddress] public string SupportEmail { get; set; } = "";
}
~~~

- class عادية، كل property اسمها نفس اسم المفتاح في القسم. المقارنة مش بتفرق كابيتال وسمول.
- [[{ get; set; }]]: لازم [[set]] عشان الـ binder يقدر يحط القيمة.
- نفس attributes درس validation ([[using System.ComponentModel.DataAnnotations;]]): [[[Range(1, 100)]]] و [[[EmailAddress]]] (شكل إيميل صالح).
- [[= ""]]: قيمة مبدئية عشان الـ compiler ميحذرش إن string non-nullable ممكن تبقى null.

---

## ٣. التسجيل: ٤ خطوات في سلسلة

~~~csharp Program.cs
builder.Services.AddOptions<ShopOptions>()
    .BindConfiguration("Shop")
    .ValidateDataAnnotations()
    .ValidateOnStart();
~~~

| الخطوة | بتعمل إيه |
|---|---|
| [[AddOptions<ShopOptions>()]] | سجّل [[ShopOptions]] كـ options في الـ DI |
| [[.BindConfiguration("Shop")]] | املاها من قسم [[Shop]]، وحوّل الأنواع ("20" لـ int) |
| [[.ValidateDataAnnotations()]] | افحص الـ attributes |
| [[.ValidateOnStart()]] | افحص وقت الـ startup، مش أول ما حد يطلبها |

كل method بترجع نفس الـ builder، فبتتكتب ورا بعض بالنقطة (method chaining).

---

## ٤. القراية: [[IOptions<T>]] و [[IConfiguration]]

~~~csharp Program.cs
app.MapGet("/settings", (IOptions<ShopOptions> o, IConfiguration cfg) =>
    new { o.Value.PageSize, o.Value.SupportEmail, raw = cfg["Shop:PageSize"] });
~~~

- [[IOptions<ShopOptions>]]: من الـ DI (محتاج [[using Microsoft.Extensions.Options;]]). القيم في [[o.Value]]، وبنوعها الصح ([[PageSize]] int).
- [[IConfiguration cfg]]: القاموس الخام. [[cfg["Shop:PageSize"]]] بيرجع **string** أو null.
- [[new { o.Value.PageSize, ... }]]: لو كتبت property من غير اسم، الـ anonymous object بياخد اسمها ([[PageSize]]).

~~~bash
curl -s localhost:5925/settings
~~~

~~~text الناتج
{"pageSize":20,"supportEmail":"help@shop.test","raw":"20"}
~~~

[[raw]] بين علامات تنصيص لأنه string، و [[pageSize]] من غير لأنه int.

---

## ٥. الطبقات: مين بيكسب؟

الإعدادات بتتقري من كذا مصدر بالترتيب، وكل مصدر بيكتب فوق اللي قبله:

| الترتيب | المصدر |
|---|---|
| ١ (الأضعف) | [[appsettings.json]] |
| ٢ | [[appsettings.{Environment}.json]] (مثلًا [[appsettings.Development.json]]) |
| ٣ | user secrets (في Development بس) |
| ٤ | environment variables |
| ٥ (الأقوى) | command-line args |

### env var

اسم الـ env var بيستخدم [[__]] (اتنين underscore) مكان [[:]]، لأن [[:]] مش مسموحة في أسامي env vars في كل الأنظمة:

~~~bash
Shop__PageSize=50 dotnet run
~~~

~~~text الناتج: /settings
{"pageSize":50,"supportEmail":"help@shop.test","raw":"50"}
~~~

[[50]] كسب على [[20]] اللي في الملف، والـ [[SupportEmail]] فضل من الملف لأن محدش غيره.

### command line

شغلت بـ [[--Shop:PageSize=7]] والـ env var لسه [[50]]:

~~~text الناتج: /settings
{"pageSize":7,"supportEmail":"help@shop.test","raw":"7"}
~~~

الـ args أقوى من الـ env vars.

### على ويندوز

~~~powershell
$env:Shop__PageSize = "50"
dotnet run
~~~

[[$env:]] بيعمل env var للـ session بتاعة PowerShell دي بس. (الـ syntax من الـ docs، مشغلتهوش على ويندوز.)

---

## ٦. قيمة غلط: التطبيق مبيقومش

~~~bash
Shop__PageSize=500 dotnet run
~~~

~~~text الناتج
Unhandled exception. Microsoft.Extensions.Options.OptionsValidationException: DataAnnotation validation failed for 'ShopOptions' members: 'PageSize' with the error: 'The field PageSize must be between 1 and 100.'.
~~~

ده بفضل [[ValidateOnStart()]]. من غيره التطبيق كان هيقوم عادي، والـ exception هيحصل أول ما request يطلب [[o.Value]]، يعني ممكن بعد ساعات وفي نص شغل المستخدمين.

---

## ٧. الحل: user secrets

~~~bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:Shop" "Host=...;Application Name=from-secrets"
dotnet user-secrets list
~~~

- [[init]]: بيضيف [[UserSecretsId]] (Guid) في الـ csproj. المشروع ده كان عنده واحد من [[user-jwts]]، فقال:

~~~text الناتج
The MSBuild project '/w/web/Shop/Shop.csproj' has already been initialized with a UserSecretsId.
~~~

- [[set]]: احفظ مفتاح وقيمة. ([[Application Name=...]] حتة زيادة في الـ connection string حطيتها عشان أعرف القيمة جت منين.)

~~~text الناتج
Successfully saved ConnectionStrings:Shop to the secret store.
~~~

- الملف اتحفظ في [[~/.microsoft/usersecrets/09bd233e-30f2-43cf-87f7-3b6089991c60/secrets.json]] (الـ id ده الـ UserSecretsId)، **برّه** فولدر المشروع خالص، فمستحيل يترفع على git. على ويندوز المكان [[%APPDATA%\Microsoft\UserSecrets\]] (من الـ docs).

عملت endpoint بيرجع [[cfg.GetConnectionString("Shop")]] ([[GetConnectionString("X")]] = [[cfg["ConnectionStrings:X"]]]):

| شغلته إزاي | الـ connection string اللي اتقرا |
|---|---|
| [[dotnet run]] (Development) | [[...;Application Name=from-secrets]]: الـ secrets كسبت على appsettings.json |
| ومعاه [[ConnectionStrings__Shop=...;Application Name=from-env]] | [[...;Application Name=from-env]]: الـ env var كسب على الـ secrets |
| [[ASPNETCORE_ENVIRONMENT=Production dotnet run --no-launch-profile]] | اللي في [[appsettings.json]]: الـ secrets مبتتقريش خالص في Production |

---

## الخلاصة

- الإعدادات طبقات: appsettings.json ثم appsettings.{Env}.json ثم user secrets (Development) ثم env vars ثم command line.
- [[:]] في الكود والملفات، و [[__]] في الـ env vars.
- [[AddOptions<T>().BindConfiguration("X").ValidateDataAnnotations().ValidateOnStart()]] = إعدادات بأنواعها ومتفحوصة، والتطبيق ميقومش لو غلط.
- [[IOptions<T>]] بدل ما تقرا [[cfg["..."]]] كـ string في كل حتة.
- الأسرار: user secrets في التطوير، env vars أو secret store في الإنتاج، ومش في appsettings.json.`,
          lines: [
            "سجّل options class.",
            R`اربطها بقسم [[Shop]] في الإعدادات.`,
            "افحص الـ attributes.",
            "وقت الـ startup مش أول ما حد يستخدمها.",
            R`[[IOptions<T>]] من الـ DI، و [[IConfiguration]] للقراية الخام.`,
            R`[[{"pageSize":20,"supportEmail":"help@shop.test","raw":"20"}]].`,
            "الـ options class.",
            "بداية.",
            R`بين 1 و 100.`,
            "مطلوب وإيميل صالح.",
            "نهاية."
          ],
          sol: R`بعد [[user-secrets set]] التطبيق شغال عادي والـ connection string اتقرا. السر في [[~/.microsoft/usersecrets/<UserSecretsId>/secrets.json]] (على Windows في [[%APPDATA%\Microsoft\UserSecrets]])، برّه المشروع خالص، فمستحيل يترفع مع الكود. و [[dotnet user-secrets list]] بيعرضه.

الـ env var [[ConnectionStrings__Shop]] بيكسب على الـ user secrets، لأن env vars بتتقري بعدهم. الترتيب الكامل من الأضعف للأقوى: appsettings.json، appsettings.Development.json، user secrets، env vars، command line. ولو شغلت بـ [[ASPNETCORE_ENVIRONMENT=Production]] الـ user secrets مش هتتقري خالص والـ connection string هيبقى null، وده المقصود.`
        },
        {
          cmd: "ILogger",
          title: "ILogger و structured logging: لوج تقدر تدوّر فيه",
          desc: R`اطلب [[ILogger<OrdersController>]] في الـ constructor واكتب [[logger.LogInformation("Order {OrderId} placed by {Email}", id, email)]]. لاحظ: مش [[$"..."]]. الـ [[{OrderId}]] ده placeholder بيتخزن كحقل منفصل، فلما اللوج يروح لـ Seq أو Elastic أو Loki تقدر تدوّر بـ [[OrderId = 42]].

المستويات: [[Trace]] و [[Debug]] و [[Information]] و [[Warning]] و [[Error]] و [[Critical]]. وبتتحكم فيها من [[appsettings.json]] لكل category (الـ category = اسم الـ class): [[Microsoft.AspNetCore]] على Warning عشان ميزحمش، و [[Microsoft.EntityFrameworkCore.Database.Command]] على Information لو عايز تشوف الـ SQL.

للـ exceptions: [[logger.LogError(ex, "Payment failed for {OrderId}", id)]]، الـ exception أول parameter.`,
          example: R`public class OrderService(ShopDb db, ILogger<OrderService> logger)
{
    public async Task CancelAsync(int orderId, CancellationToken ct)
    {
        using var _ = logger.BeginScope(new Dictionary<string, object> { ["OrderId"] = orderId });
        logger.LogInformation("Cancelling order {OrderId}", orderId);
        try
        {
            await db.Orders.Where(o => o.Id == orderId).ExecuteDeleteAsync(ct);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Cancel failed for order {OrderId}", orderId);
            throw;
        }
    }
}
// appsettings.json
// "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning",
//   "Microsoft.EntityFrameworkCore.Database.Command": "Information" } }`,
          try: R`شغّل الـ API وخلّي [[Microsoft.EntityFrameworkCore.Database.Command]] على Information، واعمل request واحد لـ [[/api/products]]: هتشوف الـ SQL بالظبط. وبعدين خلّي اللوج JSON: [[builder.Logging.AddJsonConsole()]] (وشيل الـ console العادي بـ [[ClearProviders]]) وشوف شكل السطر بقى إيه.`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوج هو عينك الوحيدة. لوج نصي بـ interpolation بيبقى مليون سطر مختلف ومتقدرش تجمّع «كام طلب فشل للعميل ده». الـ structured logging بيخلي كل سطر record فيه حقول، والأدوات بتفلتر وتجمّع عليها.`,
            how: R`[[ILogger<T>]] بيتسجل تلقائي، و T بيبقى الـ category. الـ message template بيتخزن ثابت ([[Order {OrderId} placed]])، والقيم منفصلة، فالأداة تجمّع كل السطور اللي ليها نفس الـ template.

لو كتبت [[$"Order {id}"]] كل سطر template مختلف، والقيمة اتحولت نص وضاعت، وكمان الـ string اتبنى حتى لو المستوى مقفول (allocation على الفاضي). الـ analyzers بتحذرك (CA2254).

[[BeginScope]] بيضيف حقول لكل السطور جوه الـ using (زي OrderId أو TenantId). والـ providers: Console (الافتراضي)، و Debug، و EventSource، وأي حاجة من برّه (Serilog شهير جدًا، و OpenTelemetry للإرسال لأي backend).

للأداء العالي فيه [[[LoggerMessage]]] source generator بيولّد methods logging من غير allocations. والـ console provider في Production بيكتب بشكل مقروء، و [[AddJsonConsole]] بيكتب JSON سطر لكل log، وده اللي أدوات جمع اللوج بتحبه (Docker و Loki و CloudWatch).`,
            when: R`Information للأحداث المهمة في الـ business (طلب اتعمل، دفع نجح). Warning لحاجة غريبة بس اتعاملنا معاها (retry). Error لفشل محتاج حد يبص. Debug للتفاصيل وقت التطوير. ومتسجلش في كل method «دخلت» و «خرجت».`,
            mistakes: R`string interpolation في اللوج. وتسجيل passwords أو tokens أو بيانات كروت أو PII (شوف «تاب الأمان»: PII بره اللوج). و [[LogError(ex.Message)]] بدل [[LogError(ex, "...")]] فالـ stack trace يضيع. وتسيب EF Command على Information في الإنتاج تحت ضغط.`
          },
          teach: R`## الكود ده بيعمل إيه؟

service بتلغي طلب (بتمسحه من الداتابيز) وبتكتب لوج **structured**: كل قيمة متغيرة ([[OrderId]]) بتتخزن كحقل لوحده مش جوه النص، فأداة اللوج تقدر تدوّر بيها. ولو حصل خطأ بتسجله **بالـ exception كامل** وترميه تاني.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في نفس مشروع الدروس اللي فاتت (PostgreSQL 16 فيها طلب رقم 1). حطيت الـ class في namespace [[Demo]] عشان الاسم ميتعارضش مع [[OrderService]] اللي عندي، وعملت endpoint [[POST /api/orders/{id}/cancel]] بيناديها، ولو [[?fail=true]] بيبعتلها token ملغي من الأول عشان أشوف فرع الخطأ. الـ logs من لوج السيرفر.

---

## ١. الـ constructor

~~~csharp LoggerDemo.cs
public class OrderService(ShopDb db, ILogger<OrderService> logger)
~~~

- primary constructor بياخد الداتابيز واللوجر من الـ DI.
- [[ILogger<OrderService>]]: لوجر جاهز مش محتاج تسجّله. الـ [[<OrderService>]] بيحدد الـ **category**: اسم الـ class كامل بالـ namespace، وهو اللي بيظهر في كل سطر ([[Demo.OrderService]]) وبتتحكم في مستواه من الإعدادات.

---

## ٢. [[BeginScope]]

~~~csharp LoggerDemo.cs
using var _ = logger.BeginScope(new Dictionary<string, object> { ["OrderId"] = orderId });
~~~

- [[BeginScope(...)]]: «كل سطر لوج يتكتب لحد ما الـ scope ده يتقفل، ضيف عليه الحقول دي». مفيد لما الـ method فيها ١٠ سطور لوج وعايز كلهم يبقى فيهم [[OrderId]].
- [[new Dictionary<string, object> { ["OrderId"] = orderId }]]: الحقول (اسم وقيمة).
- [[using var _]]: الـ scope بيتقفل ([[Dispose]]) في آخر الـ method. و [[_]] discard لأننا مش محتاجين المتغير، محتاجين الـ using بس (درس exceptions و using).

---

## ٣. سطر لوج عادي

~~~csharp LoggerDemo.cs
logger.LogInformation("Cancelling order {OrderId}", orderId);
~~~

- [[LogInformation]]: مستوى Information. والمستويات من الأقل للأخطر: [[Trace]]، [[Debug]]، [[Information]]، [[Warning]]، [[Error]]، [[Critical]].
- [["Cancelling order {OrderId}"]] اسمه **message template**، وهو مش [[$"..."]]: مفيش [[$]] قبله. الـ [[{OrderId}]] اسم حقل، والقيمة جاية في الـ parameter اللي بعده. لو فيه كذا placeholder، القيم بالترتيب.

~~~text الناتج
info: Demo.OrderService[0]
      Cancelling order 1
~~~

[[info]] المستوى، و [[Demo.OrderService]] الـ category، و [[[0]]] الـ EventId (مش محددينه).

### ليه مش [[$"Cancelling order {orderId}"]]؟

مع [[$]] النص بيتبني الأول ([["Cancelling order 1"]]) وبعدين يتبعت للوجر. اللوجر شايف نص بس: كل order ليه نص مختلف، والرقم ضاع جوه الكلام. ومع الـ template اللوجر شايف الحاجتين منفصلين. هتشوف الفرق بعينك في الـ JSON تحت.

---

## ٤. الشغل نفسه

~~~csharp LoggerDemo.cs
try
{
    await db.Orders.Where(o => o.Id == orderId).ExecuteDeleteAsync(ct);
}
~~~

[[ExecuteDeleteAsync]]: [[DELETE]] مباشر في الداتابيز من غير ما يحمّل الـ orders الأول (category الـ EF Core). ولأن الإعدادات فيها EF Command على Information، الـ SQL ظهر في اللوج:

~~~text الناتج
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (7ms) [Parameters=[@orderId='?' (DbType = Int32)], CommandType='Text', CommandTimeout='30']
      DELETE FROM "Orders" AS o
      WHERE o."Id" = @orderId
~~~

[[@orderId='?']]: قيمة الـ parameter مستخبية، EF بيخبيها افتراضيًا عشان متتسربش بيانات حساسة للّوج.

---

## ٥. الخطأ

~~~csharp LoggerDemo.cs
catch (Exception ex)
{
    logger.LogError(ex, "Cancel failed for order {OrderId}", orderId);
    throw;
}
~~~

- [[LogError(ex, ...)]]: الـ exception **أول parameter** قبل الـ template. كده الـ type والرسالة والـ stack trace كلهم بيتسجلوا. لو كتبت [[LogError(ex.Message)]] هتسجل سطر نص والـ stack trace يضيع.
- [[throw;]]: ارميه تاني بنفس الـ stack trace (درس exceptions) عشان الـ exception handler فوق يرد على الـ client.

مع [[?fail=true]] (token ملغي):

~~~text الناتج
info: Demo.OrderService[0]
      Cancelling order 1
fail: Demo.OrderService[0]
      Cancel failed for order 1
      System.OperationCanceledException: The operation was canceled.
fail: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]
      An unhandled exception has occurred while executing the request.
      System.OperationCanceledException: The operation was canceled.
~~~

لاحظ إن نفس الـ exception اتسجل **مرتين**: مرة من الـ service ومرة من الـ exception handler. لو كل طبقة عملت كده، الخطأ الواحد هيتسجل ٥ مرات. القاعدة: سجّل في مكان واحد، أو سجّل هنا بس لو هتضيف معلومة مش موجودة فوق.

---

## ٦. الإعدادات

~~~text appsettings.json
"Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning",
  "Microsoft.EntityFrameworkCore.Database.Command": "Information" } }
~~~

| المفتاح | المعنى |
|---|---|
| [[Default]] | أي category مش مذكورة: من Information وطالع |
| [[Microsoft.AspNetCore]] | كل الـ categories اللي بتبدأ بالاسم ده: Warning وطالع بس (عشان ميزحمش) |
| [[Microsoft.EntityFrameworkCore.Database.Command]] | الـ SQL اللي EF بيبعته |

الأطول والأدق بيكسب: [[Microsoft.EntityFrameworkCore.Database.Command]] أدق من [[Default]].

---

## ٧. الحل: الـ SQL و JSON

### [[/api/products?q=pen]] مع EF Command على Information

~~~text الناتج
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (4ms) [Parameters=[@q_contains='?', @p2='?' (DbType = Int32), @p='?' (DbType = Int32)], CommandType='Text', CommandTimeout='30']
      SELECT p0."Id", p0."Name", p0."Price", c."Name"
      FROM (
          SELECT p."Id", p."CategoryId", p."Name", p."Price"
          FROM "Products" AS p
          WHERE p."Name" LIKE @q_contains
          ORDER BY p."Id"
          LIMIT @p2 OFFSET @p
      ) AS p0
      INNER JOIN "Categories" AS c ON p0."CategoryId" = c."Id"
      ORDER BY p0."Id"
~~~

ده الـ LINQ بتاع درس MapGet بعد ما اتحول SQL: [[Contains]] بقت [[LIKE]]، و [[Skip]]/[[Take]] بقوا [[OFFSET]]/[[LIMIT]]، و [[p.Category.Name]] بقت [[INNER JOIN]].

### [[AddJsonConsole]]

~~~csharp Program.cs
builder.Logging.ClearProviders();
builder.Logging.AddJsonConsole(o => o.IncludeScopes = true);
~~~

- [[ClearProviders()]]: شيل الـ console العادي (وأي provider تاني)، وإلا هتلاقي كل سطر مكتوب مرتين بشكلين.
- [[AddJsonConsole]]: كل log سطر JSON. و [[IncludeScopes = true]] عشان حقول [[BeginScope]] تظهر (الـ console العادي مبيعرضهاش افتراضيًا).

سطر [[Cancelling order 1]] بقى كده (قصّيت الـ scopes اللي ASP.NET بيضيفها لوحده):

~~~text الناتج
{"EventId":0,"LogLevel":"Information","Category":"Demo.OrderService","Message":"Cancelling order 1",
 "State":{"OrderId":1,"{OriginalFormat}":"Cancelling order {OrderId}"},
 "Scopes":[ ... {"RequestPath":"/api/orders/1/cancel","RequestId":"0HNP4IOL1LU4M:00000001"}, ... {"OrderId":1}]}
~~~

| الحقل | جاي منين |
|---|---|
| [[Message]] | النص النهائي للعرض |
| [[State.OrderId]] | الـ [[{OrderId}]] كحقل رقم منفصل |
| [[{OriginalFormat}]] | الـ template نفسه: كل سطور «Cancelling order» ليها نفس القيمة، فتتجمع |
| [[Scopes]] | حقول [[BeginScope]] بتاعنا ([[OrderId]]) والـ request ([[RequestPath]] و [[RequestId]] و [[TraceId]]) |

أداة زي Seq أو Loki تقدر دلوقتي تدوّر بـ [[OrderId = 1]] أو تعد كام مرة الـ template ده اتكرر. مع [[$"..."]] كان هيبقى فيه [[Message]] بس.

---

## الخلاصة

- [[ILogger<T>]] من الـ DI، والـ category اسم الـ class.
- template بـ [[{Name}]] والقيم بعده، مش [[$"..."]].
- [[LogError(ex, "...")]]: الـ exception أول parameter.
- [[BeginScope]]: حقول مشتركة لكل السطور جوه الـ using.
- المستويات بتتظبط لكل category في [[Logging:LogLevel]]، والأدق بيكسب.
- [[AddJsonConsole]] (بعد [[ClearProviders]]) = سطر JSON لكل log، وده اللي أدوات جمع اللوج بتحبه.`,
          lines: [
            R`[[ILogger<OrderService>]]: الـ category اسم الـ class.`,
            "بداية.",
            "method.",
            "بداية.",
            R`scope: كل سطر لوج جوه الـ using بياخد [[OrderId]] كحقل.`,
            R`template ثابت + قيمة كحقل منفصل.`,
            "try.",
            "بداية.",
            R`[[DELETE]] مباشر من غير تحميل (category الـ EF).`,
            "نهاية.",
            "catch.",
            "بداية.",
            "الـ exception أول parameter عشان الـ stack trace يتسجل.",
            "ارمي تاني للـ exception handler.",
            "نهاية.",
            "نهاية.",
            "نهاية."
          ],
          sol: R`مع EF Command على Information هتشوف لكل query سطر زي [[Executed DbCommand (2ms) [Parameters=[@q_contains='?' ...], CommandType='Text', CommandTimeout='30']]] وتحته الـ SQL: [[SELECT p0."Id", p0."Name", p0."Price", c."Name" FROM (...) WHERE p."Name" LIKE @q_contains ... LIMIT @p2 OFFSET @p]]. لاحظ إن قيم الـ parameters بتطلع [[?]]: EF بيخبيها افتراضيًا عشان متتسربش، ولو عايزها في التطوير بس فعّل [[EnableSensitiveDataLogging()]].

مع [[AddJsonConsole]] كل log سطر JSON زي [[{"EventId":0,"LogLevel":"Information","Category":"Program","Message":"Page size is 20 for Production","State":{"PageSize":20,"Env":"Production","{OriginalFormat}":"Page size is {PageSize} for {Env}"}}]]. مفيش وقت افتراضيًا: ضيفه بـ [[AddJsonConsole(o => o.TimestampFormat = "O")]]، وغالبًا أداة جمع اللوج (Docker أو Loki) بتضيفه. الحقول المنفصلة هي اللي بتفرق عن النص. لو لسه شايف الشكل القديم، يبقى الـ console provider العادي لسه متسجل جنبه: [[builder.Logging.ClearProviders()]] الأول.`
        }
      ]
    }
]);
