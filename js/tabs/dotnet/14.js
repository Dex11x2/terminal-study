// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
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

من .NET 6 أي exception مش ممسوك جوه [[ExecuteAsync]] بيوقف التطبيق كله ([[BackgroundServiceExceptionBehavior.StopHost]]) وبيسجل [[BackgroundService failed]]. عشان كده الـ try/catch جوه الـ loop مهم: دورة فشلت متوقعش السيرفر. والـ [[when (ex is not OperationCanceledException)]] عشان الإلغاء وقت الإيقاف يعدّي طبيعي.

[[CreateAsyncScope]] بيعمل scope زي بتاع الـ request: DbContext جديد لكل دورة، وبيتعمله dispose في الآخر. و [[PeriodicTimer.WaitForNextTickAsync]] بيرجع false أو بيرمي لما الـ token يتلغي.

لو التطبيق شغال على كذا instance، الـ background service بيشتغل على كل واحدة: محتاج lock موزع (Redis، أو [[pg_advisory_lock]]) أو scheduler خارجي.`,
            when: R`شغل خفيف ودوري جوه API واحد. لشغل تقيل أو محتاج retries و scheduling حقيقي: queue (RabbitMQ، Azure Service Bus، SQS) مع worker منفصل ([[dotnet new worker]])، أو مكتبة زي Hangfire أو Quartz.NET. وللـ cron على السيرفر شوف «systemd timer» في «تاب VPS».`,
            mistakes: R`تطلب DbContext في الـ constructor: [[Cannot consume scoped service 'ShopDb' from singleton]]. ومفيش try/catch فأول خطأ شبكة يقفل التطبيق كله. وتتجاهل [[stoppingToken]] فالإيقاف ياخد ٣٠ ثانية ويتقتل. وشغل تقيل CPU في الـ ExecuteAsync بيسرق من الـ requests.`
          },
          teach: R`## المثال ده بيعمل إيه؟

class بتشتغل جوه الـ API في الخلفية من أول ما يقوم: كل ١٠ ثواني تعد المنتجات اللي مخزونها أقل من 5 وتكتب العدد في اللوج، ولو حصل خطأ تسجله وتكمّل. جرّبناه في [[Shop.Api]] (.NET 10) جوه Docker مع [[postgres:18]]، وقطعنا الداتابيز عنه (فصلنا الـ container بتاعها عن الشبكة) وبعدين رجّعناها.

---

## ١. الـ class

~~~csharp Services/LowStockReporter.cs
public class LowStockReporter(IServiceScopeFactory scopes, ILogger<LowStockReporter> logger) : BackgroundService
~~~

- [[: BackgroundService]]: بنورث من class جاهزة في [[Microsoft.Extensions.Hosting]]. هي اللي بتتعامل مع البداية والإيقاف، واحنا بنكتب الشغل بس.
- [[IServiceScopeFactory scopes]]: «مصنع» scopes من الـ DI. **مش** [[ShopDb]] مباشرة: الـ hosted service بيتعمل مرة واحدة (Singleton) ويعيش طول عمر التطبيق، و [[ShopDb]] Scoped (المفروض يعيش request واحد).
- [[ILogger<LowStockReporter>]]: logger، والـ [[<LowStockReporter>]] بيبقى اسم الـ category في اللوج.

جرّبنا الغلطة: service تانية بتاخد [[ShopDb]] في الـ constructor. التطبيق مقامش خالص:

~~~text الناتج
Unhandled exception. System.AggregateException: Some services are not able to be constructed (... Cannot consume scoped service 'Shop.Api.Data.ShopDb' from singleton 'Microsoft.Extensions.Hosting.IHostedService'.)
~~~

(الفحص ده اسمه scope validation، ومفعّل في Development.)

---

## ٢. [[ExecuteAsync]]

~~~csharp
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
~~~

- [[protected override]]: [[BackgroundService]] فيها الـ method دي abstract، ولازم نكتبها.
- بتتنادى **مرة واحدة** وقت ما التطبيق يقوم، والمفروض تفضل شغالة (loop) لحد ما التطبيق يقف.
- [[stoppingToken]]: بيتلغي لما التطبيق يبدأ يقف (Ctrl+C، أو [[docker stop]] اللي بيبعت SIGTERM).

---

## ٣. الـ timer والـ loop

~~~csharp
using var timer = new PeriodicTimer(TimeSpan.FromSeconds(10));
do
{
    ...
} while (await timer.WaitForNextTickAsync(stoppingToken));
~~~

- [[new PeriodicTimer(TimeSpan.FromSeconds(10))]]: timer بيدق كل ١٠ ثواني. و [[using]] عشان يتقفل في الآخر.
- [[do { ... } while (...)]]: الـ body بيتنفذ **الأول** وبعدين الشرط يتفحص. يعني أول فحص على طول مع قيام التطبيق، مش بعد ١٠ ثواني.
- [[await timer.WaitForNextTickAsync(stoppingToken)]]: استنى الدقة الجاية. بترجّع [[true]] فالـ loop يكمّل. ولو الـ token اتلغى بترمي [[OperationCanceledException]] فالـ method تخلص.
- ليه مش [[Task.Delay(10s)]]؟ لو الشغل نفسه أخد ٣ ثواني، [[Task.Delay]] هيستنى ١٠ بعدها (كل ١٣). [[PeriodicTimer]] بيحافظ على الإيقاع، ولو دقة فاتت وانت مشغول مبيعملش كذا دقة ورا بعض.

---

## ٤. جوه الدورة: scope جديد

~~~csharp
try
{
    await using var scope = scopes.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<ShopDb>();
    var low = await db.Products.CountAsync(p => p.Stock < 5, stoppingToken);
    logger.LogInformation("Low stock products: {Count}", low);
}
~~~

- [[scopes.CreateAsyncScope()]]: scope جديد، زي اللي بيتعمل لكل request. و [[await using]] بيقفله (ويقفل الـ [[ShopDb]] اللي جواه) في آخر الدورة.
- [[scope.ServiceProvider.GetRequiredService<ShopDb>()]]: [[ShopDb]] جديد للدورة دي. لو مش متسجل بيرمي (عكس [[GetService]] اللي بيرجّع null).
- [[CountAsync(p => p.Stock < 5, stoppingToken)]]: [[SELECT count(*)::int FROM "Products" AS p WHERE p."Stock" < 5]]. والـ token عشان الـ query تتلغي لو التطبيق بيقف.
- [[LogInformation("Low stock products: {Count}", low)]]: **structured logging**: [[{Count}]] مش string interpolation، ده اسم حقل بيتحفظ لوحده (تقدر تدوّر بيه في Seq أو Application Insights).

~~~text اللوج (كل ١٠ ثواني)
info: Shop.Api.Services.LowStockReporter[0]
      Low stock products: 0
~~~

[[[0]]] ده الـ event id (مكتبناش واحد).

---

## ٥. الـ catch: متوقعش التطبيق

~~~csharp
catch (Exception ex) when (ex is not OperationCanceledException)
{
    logger.LogError(ex, "Low stock check failed");
}
~~~

- [[catch (Exception ex)]]: أي خطأ.
- [[when (ex is not OperationCanceledException)]]: **exception filter**: امسكه بس لو الشرط صح. الإلغاء وقت الإيقاف مش خطأ، فنسيبه يعدّي ويوقف الـ method.
- [[LogError(ex, ...)]]: بيكتب الرسالة والـ exception كاملة.

فصلنا الداتابيز عن الشبكة ٢٥ ثانية:

~~~text اللوج
info: Shop.Api.Services.LowStockReporter[0]
      Low stock products: 0
fail: Shop.Api.Services.LowStockReporter[0]
      Low stock check failed
      System.InvalidOperationException: An exception has been raised that is likely due to a transient failure.
       ---> Npgsql.NpgsqlException (0x80004005): Name or service not known
fail: Shop.Api.Services.LowStockReporter[0]
      Low stock check failed
...
info: Shop.Api.Services.LowStockReporter[0]
      Low stock products: 0
~~~

- ٣ دورات فشلت، والتطبيق فضل شغال. أول ما الداتابيز رجعت، الدورة الجاية نجحت لوحدها.
- [[Name or service not known]]: اسم الـ host مبقاش موجود على الشبكة. (على جهازك لو وقفت Postgres هتلاقي [[Failed to connect to 127.0.0.1:5432]].) و EF لافف الخطأ في «likely due to a transient failure» لأنه شايفه خطأ مؤقت، وبيقترح [[EnableRetryOnFailure]].
- والـ API نفسه وقت الانقطاع: [[GET /api/products/1]] رجع 500، وبعد الرجوع 200.

### من غير الـ try/catch

شيلناه وعملنا نفس الانقطاع:

~~~text اللوج
fail: Microsoft.Extensions.Hosting.Internal.Host[9]
      BackgroundService failed
      System.InvalidOperationException: An exception has been raised that is likely due to a transient failure.
       ---> Npgsql.NpgsqlException (0x80004005): Exception while reading from stream
       ---> System.TimeoutException: Timeout during reading attempt
crit: Microsoft.Extensions.Hosting.Internal.Host[10]
      The HostOptions.BackgroundServiceExceptionBehavior is configured to StopHost. A BackgroundService has thrown an unhandled exception, and the IHost instance is stopping. To avoid this behavior, configure this to Ignore; however the BackgroundService will not be restarted.
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
~~~

التطبيق **كله** وقف، حتى الـ endpoints اللي ملهاش علاقة. ده السلوك الافتراضي من .NET 6 ([[StopHost]]).

---

## ٦. التسجيل

~~~csharp Program.cs
builder.Services.AddHostedService<LowStockReporter>();
~~~

بيسجّله Singleton كـ [[IHostedService]]، والـ host بيشغّله مع [[app.Run()]]. وده اللي الـ integration tests بتشيله بـ [[RemoveAll<IHostedService>()]] (الدرس اللي فات).

ولما بعتنا Ctrl+C (SIGINT) للتطبيق:

~~~text اللوج
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
~~~

وقف في أقل من ٣ ثواني، لأن [[WaitForNextTickAsync(stoppingToken)]] بيصحى فورًا مع الإلغاء.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[: BackgroundService]] + [[ExecuteAsync]] | الشغل بيبدأ مع التطبيق ويقف معاه |
| [[IServiceScopeFactory]] مش [[ShopDb]] | الـ service Singleton والـ DbContext Scoped |
| [[CreateAsyncScope()]] كل دورة | DbContext جديد ونضيف |
| [[PeriodicTimer]] + [[do/while]] | دورة فورًا، وبعدين كل ١٠ ثواني |
| [[try/catch ... when (not OperationCanceledException)]] | دورة فشلت متوقعش التطبيق |
| [[stoppingToken]] في كل حاجة | إيقاف سريع |
| [[AddHostedService<T>()]] | التسجيل |`,
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
          teach: R`## المثال ده بيعمل إيه؟

٣ endpoints: واحد بيجيب منتج ويحفظه في الـ cache ٥ دقايق، وواحد بيغيّر السعر ويمسح المفتاح القديم، وواحد بيرجّع الوقت ورده كله متخزن ١٠ ثواني. جرّبناه في API على .NET 10 جوه Docker ([[Microsoft.Extensions.Caching.Hybrid]] 10.10.0) مع [[postgres:18]]، ومرة كمان مع [[redis:8-alpine]] كطبقة تانية، و [[curl]] من الجهاز.

---

## ١. التسجيل

~~~csharp Program.cs
builder.Services.AddHybridCache(o => o.DefaultEntryOptions = new() { Expiration = TimeSpan.FromMinutes(5) });
builder.Services.AddOutputCache();
app.UseOutputCache();
~~~

- [[AddHybridCache(...)]]: سجّل [[HybridCache]] في الـ DI. الحزمة [[dotnet package add Microsoft.Extensions.Caching.Hybrid]].
  - [[DefaultEntryOptions = new() { Expiration = ... }]]: كل مفتاح يعيش ٥ دقايق إلا لو حددت غير كده. [[new()]] من غير اسم النوع لأنه معروف ([[HybridCacheEntryOptions]]).
- [[AddOutputCache()]]: services الـ output cache (جزء من ASP.NET Core، مفيش حزمة).
- [[app.UseOutputCache()]]: الـ middleware اللي بيرجّع الرد المتخزن قبل ما الـ endpoint يشتغل.

---

## ٢. القراية: [[GetOrCreateAsync]]

~~~csharp Program.cs
app.MapGet("/products/{id:int}", async (int id, HybridCache cache, ShopDb db, CancellationToken ct) =>
    await cache.GetOrCreateAsync($"product:{id}", async token =>
        await db.Products.Where(p => p.Id == id)
            .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
            .FirstOrDefaultAsync(token),
        tags: ["products"], cancellationToken: ct));
~~~

من برّه لجوه:

- الـ handler بياخد [[HybridCache cache]] من الـ DI، و [[CancellationToken ct]] بتاع الـ request.
- [[cache.GetOrCreateAsync(مفتاح, factory, ...)]]: «لو المفتاح موجود رجّعه، لو لأ نادي الـ factory، خزّن النتيجة، ورجّعها».
- [[$"product:{id}"]]: المفتاح. للمنتج 1 = [[product:1]]. المفتاح لازم يبقى فيه كل اللي بيغيّر النتيجة.
- [[async token => ...]]: الـ **factory**: lambda بتجيب القيمة لما متكونش في الـ cache. بتاخد token خاص بيها.
  - الـ query: projection لـ [[ProductDto]] (record) مش entity، عشان ده اللي بيتخزن.
  - [[FirstOrDefaultAsync(token)]]: لو مفيش منتج بيرجّع [[null]].
- [[tags: ["products"]]]: named argument: tag تقدر تمسح بيها كل مفاتيح المنتجات مرة واحدة ([[RemoveByTagAsync("products")]]).
- [[cancellationToken: ct]]: لو العميل قفل الاتصال.

~~~text الناتج
curl localhost:5934/products/1    {"id":1,"name":"Blue pen","price":5.50,"category":"Pens"}
curl localhost:5934/products/1    {"id":1,"name":"Blue pen","price":5.50,"category":"Pens"}
~~~

نفس الرد، بس اللوج فيه SELECT واحد بس. التاني جه من الذاكرة.

---

## ٣. التعديل: امسح المفتاح

~~~csharp Program.cs
app.MapPut("/products/{id:int}/price", async (int id, decimal price, ShopDb db, HybridCache cache) =>
{
    await db.Products.Where(p => p.Id == id).ExecuteUpdateAsync(s => s.SetProperty(p => p.Price, price));
    await cache.RemoveAsync($"product:{id}");
    return Results.NoContent();
});
~~~

- [[decimal price]]: مش في الـ route، فبيتقري من الـ query string ([[?price=7.25]]).
- [[ExecuteUpdateAsync]]: UPDATE مباشر (درس transactions).
- [[cache.RemoveAsync($"product:{id}")]]: امسح المفتاح، فالقراية الجاية تنادي الـ factory وتجيب الجديد. من غيرها الـ GET هيرجّع السعر القديم ٥ دقايق.
- [[Results.NoContent()]]: 204 من غير body.

~~~text الناتج
curl -X PUT "localhost:5934/products/1/price?price=7.25"   put 204
curl localhost:5934/products/1                              {"id":1,"name":"Blue pen","price":7.25,"category":"Pens"}
~~~

---

## ٤. الـ output cache: [[CacheOutput]]

~~~csharp Program.cs
app.MapGet("/time", () => DateTime.UtcNow.ToString("HH:mm:ss.fff"))
    .CacheOutput(p => p.Expire(TimeSpan.FromSeconds(10)));
~~~

- [[DateTime.UtcNow.ToString("HH:mm:ss.fff")]]: الوقت بالملي ثانية ([[HH]] ساعة ٢٤، [[fff]] ملي ثانية).
- [[.CacheOutput(p => p.Expire(...))]]: خزّن **الرد كله** (status و headers و body) ١٠ ثواني.

~~~text الناتج
curl localhost:5934/time                              17:40:46.522
(بعد ثانية) curl localhost:5934/time                  17:40:46.522
curl -H "Authorization: Bearer x" localhost:5934/time  17:40:47.672
curl -i localhost:5934/time                            Age: 1
~~~

- التاني نفس الملي ثانية بالظبط: الـ lambda **ماتنادتش**، الـ middleware رجّع الرد القديم.
- مع header [[Authorization]] اتحسب من جديد: الـ output cache افتراضيًا مبيخزنش ولا بيرجّع ردود لـ requests فيها auth، عشان رد مستخدم ميروحش لمستخدم تاني.
- [[Age: 1]]: header بيقول الرد ده عمره كام ثانية في الـ cache.

---

## ٥. التجربة: endpoint بطيء وعداد

ضفنا endpoint الـ factory بتاعه فيه [[await Task.Delay(200)]] و [[Interlocked.Increment(ref calls)]] (عداد آمن مع كذا thread):

~~~bash
curl -s -o /dev/null -w "%{time_total}\n" localhost:5934/slow
~~~

[[-w "%{time_total}"]]: اطبع الوقت الكلي للـ request بالثواني. و [[-o /dev/null]]: ارمي الـ body.

~~~text الناتج
0.371740
0.004567
0.002900
{"dbCalls":1}
~~~

- الأول ٠.٣٧ ثانية: ٢٠٠ ملي delay + أول request (تسخين).
- التاني والتالت ٣ أو ٤ ملي: من الذاكرة. والعداد [[1]].
- بعد [[RemoveAsync("slow")]]: الـ request الجاي أخد [[0.203819]] والعداد بقى [[2]].

### ١٠ requests في نفس اللحظة

مسحنا المفتاح وبعتنا ١٠ مع بعض:

~~~text الناتج
{"dbCalls":3}
~~~

زاد **واحد بس**. الـ ٩ التانيين استنوا نتيجة الأول. ده الـ stampede protection: من غيره لما مفتاح مشهور يخلص، كل الـ requests بتضرب الداتابيز مع بعض.

### وحاجة مش موجودة؟

[[GET /products/999]] رجّع [[null]] بـ 200، والمرة التانية مفيش SELECT جديد في اللوج: الـ [[null]] نفسه اتخزن ٥ دقايق.

---

## ٦. الطبقة التانية: Redis

سجّلنا [[AddStackExchangeRedisCache(o => o.Configuration = "...:6379")]] (حزمة [[Microsoft.Extensions.Caching.StackExchangeRedis]]) جنب [[AddHybridCache]]، ومن غير أي تغيير في الـ endpoints. بعد request واحد:

~~~bash
redis-cli --scan
redis-cli TTL product:1
~~~

~~~text الناتج
product:1
299
~~~

[[HybridCache]] لقى [[IDistributedCache]] متسجل فاستخدمه L2: القيمة اتكتبت في Redis بعمر ٥ دقايق (299 ثانية فاضلة). دلوقتي لو عندك ٣ سيرفرات، اللي يحسب القيمة الأول التانيين ياخدوها من Redis بدل الداتابيز، وكل سيرفر لسه عنده نسخة في الذاكرة (L1).

---

## الخلاصة

| | [[HybridCache]] | Output cache |
|---|---|---|
| بيخزن | قيمة (DTO) بمفتاح انت بتختاره | الرد HTTP كله |
| الـ endpoint بيتنادى؟ | أيوه، الـ factory لأ | لأ |
| التسجيل | [[AddHybridCache]] | [[AddOutputCache]] + [[UseOutputCache]] |
| الاستخدام | [[GetOrCreateAsync(key, factory)]] | [[.CacheOutput(...)]] |
| المسح | [[RemoveAsync(key)]] و [[RemoveByTagAsync]] | tags و [[EvictByTagAsync]] |
| requests بـ auth | عادي (المفتاح عليك) | مبيتخزنش افتراضيًا |

- امسح المفتاح بعد أي تعديل.
- requests كتير على نفس المفتاح = نداء factory واحد.
- [[null]] بيتخزن برضه.`,
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
          teach: R`## المثال ده بيعمل إيه؟

بيعمل **typed client**: class صغيرة اسمها [[RatesClient]] بتكلم API برّه (هنا NuGet نفسه، لأنه API عام ومش محتاج مفتاح)، وبيسجّلها بـ [[AddHttpClient]] عشان الـ framework يديها [[HttpClient]] جاهز ومتظبط. وendpoint [[/nuget]] بيرجّع نسخة الـ API. شغّلناه على .NET 10 جوه Docker وكلمناه بـ [[curl]]، وفي التجربة [[Microsoft.Extensions.Http.Resilience]] 10.10.0.

---

## ١. التسجيل: [[AddHttpClient<RatesClient>]]

~~~csharp Program.cs
builder.Services.AddHttpClient<RatesClient>(c =>
{
    c.BaseAddress = new Uri("https://api.nuget.org/");
    c.Timeout = TimeSpan.FromSeconds(5);
});
~~~

- [[AddHttpClient<RatesClient>(...)]]: بيسجّل [[RatesClient]] في الـ DI، وكل مرة حد يطلبها بيعملها بـ [[HttpClient]] جديد متظبط بالـ lambda دي.
- [[c]]: الـ [[HttpClient]] نفسه.
  - [[BaseAddress]]: كل request بـ URL نسبي بيتلزق في ده. [[new Uri(...)]] لأن الخانة نوعها [[Uri]] مش string. والـ [[/]] في الآخر عادة كويسة: لو الـ BaseAddress فيه path (زي [[https://x.com/api]]) من غير [[/]] في آخره، المسار النسبي بيشيل آخر جزء ([[api]]) وبيبقى [[https://x.com/v3/index.json]].
  - [[Timeout]]: أقصى وقت للـ request (الافتراضي 100 ثانية).

---

## ٢. الـ typed client: [[RatesClient]]

~~~csharp Program.cs
class RatesClient(HttpClient http)
{
    public async Task<string> GetVersionAsync(CancellationToken ct)
    {
        var doc = await http.GetFromJsonAsync<JsonElement>("v3/index.json", ct);
        return doc.GetProperty("version").GetString()!;
    }
}
~~~

- [[class RatesClient(HttpClient http)]]: class عادية بتاخد [[HttpClient]] في الـ constructor. مفيش [[new HttpClient()]] في أي حتة.
- [[http.GetFromJsonAsync<JsonElement>("v3/index.json", ct)]]: ٣ حاجات في سطر:
  1. GET على [[https://api.nuget.org/v3/index.json]] (الـ BaseAddress + المسار).
  2. لو الـ status مش 2xx يرمي [[HttpRequestException]].
  3. يعمل deserialize للـ JSON. و [[JsonElement]] (من [[System.Text.Json]]) = JSON من غير class، بتمشي فيه بإيدك.
- [[doc.GetProperty("version").GetString()!]]: خانة [["version"]] كـ string. و [[!]] لأن [[GetString()]] ممكن ترجّع null نظريًا.

---

## ٣. الـ endpoint

~~~csharp Program.cs
app.MapGet("/nuget", async (RatesClient c, CancellationToken ct) => await c.GetVersionAsync(ct));
~~~

[[RatesClient c]] جاي من الـ DI، و [[ct]] بتاع الـ request: لو العميل قفل، الـ request لـ NuGet بيتلغي كمان.

~~~text الناتج
curl localhost:5934/nuget     3.0.0   (200 في 0.57 ثانية)
~~~

واللوج بيوريك الـ request اللي طلع:

~~~text اللوج
info: System.Net.Http.HttpClient.RatesClient.LogicalHandler[100]
      Start processing HTTP request GET https://api.nuget.org/v3/index.json
info: System.Net.Http.HttpClient.RatesClient.ClientHandler[100]
      Sending HTTP request GET https://api.nuget.org/v3/index.json
info: System.Net.Http.HttpClient.RatesClient.ClientHandler[101]
      Received HTTP response headers after 433.6558ms - 200
info: System.Net.Http.HttpClient.RatesClient.LogicalHandler[101]
      End processing HTTP request after 441.1039ms - 200
~~~

- اسم الـ client في اللوج [[RatesClient]] (اسم الـ class).
- [[LogicalHandler]]: من أول ما الكود بتاعك نادى لحد ما رجع (شامل أي retries). [[ClientHandler]]: كل محاولة شبكة لوحدها.

### كل مرة object جديد؟

endpoint بياخد [[RatesClient]] مرتين ويقارنهم:

~~~text الناتج
{"sameClient":false}
~~~

الـ typed client بيتسجل **Transient**: object جديد كل مرة، و [[HttpClient]] جديد. بس اللي تحت ([[HttpMessageHandler]]، اللي ماسك الـ connections) مشترك، والـ factory بيجدده كل دقيقتين عشان يشوف تغيير الـ DNS. فمفيش socket exhaustion ومفيش DNS قديم.

---

## ٤. التجربة: [[AddStandardResilienceHandler]]

~~~csharp Program.cs
builder.Services.AddHttpClient<RatesClient>(c => { ... })
    .AddStandardResilienceHandler();
~~~

[[AddHttpClient]] بيرجّع builder، و [[.AddStandardResilienceHandler()]] بيضيف handler فيه retry و timeout و circuit breaker بإعدادات جاهزة. خلينا الـ BaseAddress [[http://localhost:1/]] (مفيش حاجة على البورت ده):

~~~text الناتج
500  (7.2 ثانية)
~~~

~~~text اللوج
Execution attempt. Source: 'RatesClient-standard//Standard-Retry', Operation Key: '', Result: 'Connection refused (localhost:1)', Handled: 'True', Attempt: '0', Execution Time: 48.1166ms
Execution attempt. Source: 'RatesClient-standard//Standard-Retry', ... Attempt: '1', Execution Time: 3.1078ms
Execution attempt. Source: 'RatesClient-standard//Standard-Retry', ... Attempt: '2', Execution Time: 1.9785ms
Execution attempt. Source: 'RatesClient-standard//Standard-Retry', ... Attempt: '3', Execution Time: 1.7311ms
System.Net.Http.HttpRequestException: Connection refused (localhost:1)
~~~

- ٤ محاولات: الأصلية ([[Attempt: '0']]) + ٣ retries.
- كل محاولة فشلت في ملي ثواني ([[Connection refused]] فوري)، بس الـ ٧ ثواني دي **وقت الانتظار بين المحاولات**: exponential backoff (كل انتظار أطول من اللي قبله) + jitter (عشوائية صغيرة عشان مش كل العملاء يرجعوا في نفس اللحظة).
- [[Handled: 'True']]: الخطأ ده من النوع اللي بيتعمله retry (أخطاء الشبكة و 5xx و 408 و 429).
- بعد آخر محاولة الـ exception طلعت، والـ endpoint رجّع 500.

### وسيرفر مبيردش خالص؟

[[http://10.255.255.1/]] (عنوان مبيردش، فالاتصال بيعلّق):

| | الوقت | ليه |
|---|---|---|
| من غير resilience، [[Timeout]] = 3 ثواني | 3.15 ثانية | [[TaskCanceledException: The request was canceled due to the configured HttpClient.Timeout of 3 seconds elapsing.]] |
| مع [[AddStandardResilienceHandler]] | 30.2 ثانية | ٣ محاولات، كل واحدة اتقطعت بعد ١٠ ثواني ([[TimeoutRejectedException: ... timeout of '00:00:10']])، والـ ٣٠ هي الـ total timeout |

يعني مع الـ handler الـ [[HttpClient.Timeout]] اللي ظبطناه اتجاهل، والـ timeouts بقت من إعدادات الـ handler ([[HttpStandardResilienceOptions]]: [[AttemptTimeout]] ١٠ ثواني و [[TotalRequestTimeout]] ٣٠).

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[AddHttpClient<T>(c => ...)]] | يسجّل typed client بـ BaseAddress و Timeout |
| [[class T(HttpClient http)]] | الـ client جاهز من الـ DI، مفيش [[new HttpClient()]] |
| [[GetFromJsonAsync<T>]] | GET + فحص الـ status + JSON |
| [[.AddStandardResilienceHandler()]] | retry (٣) + timeout لكل محاولة (١٠ث) + total (٣٠ث) + circuit breaker |

- الـ typed client Transient، والـ handler اللي تحته مشترك ومتجدد.
- مع الـ resilience handler ظبّط الـ timeouts من options بتاعته.
- متعملش retry تلقائي على POST بيدفع فلوس.`,
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
          sol: R`[[/nuget]] بيرجع [[3.0.0]]. مع [[AddStandardResilienceHandler]] و [[localhost:1]]: اللوج بيطلّع [[Execution attempt. Source: 'RatesClient-standard//Standard-Retry', Operation Key: '', Result: 'Connection refused (localhost:1)', Handled: 'True', Attempt: '0']] وبعدين Attempt 1 و 2 و 3 بتأخير بيزيد (٢ ثانية تقريبًا بـ jitter)، يعني ٤ محاولات (الأصلية + ٣ retries)، والـ request كله أخد ٧ لـ ٨ ثواني عندنا، وبعدها [[HttpRequestException]] والـ endpoint بيرجع 500. وخد بالك: مع [[AddStandardResilienceHandler]] الـ [[HttpClient.Timeout]] اللي في المثال اتجاهل عندنا (جرّبناه ١ و ٣ و ٥ ثواني: الأربع محاولات كمّلوا برضه). ومع سيرفر مبيردش خالص ([[10.255.255.1]]) الـ request أخد ٣٠ ثانية: ٣ محاولات، كل واحدة اتقطعت بعد ١٠ ثواني بـ [[Polly.Timeout.TimeoutRejectedException: The operation didn't complete within the allowed timeout of '00:00:10']]، والـ ٣٠ هي الـ total timeout. من غير الـ handler نفس الـ request اتقطع بعد ٣ ثواني بـ [[TaskCanceledException: The request was canceled due to the configured HttpClient.Timeout of 3 seconds elapsing.]]. يعني مع الـ resilience handler الـ timeouts بتتظبط من [[HttpStandardResilienceOptions]] ([[TotalRequestTimeout]] و [[AttemptTimeout]]) مش من [[HttpClient.Timeout]].

لو الـ API التاني وقع خالص، بعد كام request الـ circuit breaker بيفتح والطلبات بتفشل فورًا بـ [[BrokenCircuitException]] من غير ما تستنى، وده اللي بيحمي API بتاعك. الأرقام الدقيقة ممكن تختلف حسب نسخة المكتبة، فبص على [[HttpStandardResilienceOptions]] لو عايز تغيرها.`
        }
      ]
    }
]);
