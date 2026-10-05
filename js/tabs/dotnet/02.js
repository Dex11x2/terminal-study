// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "الدوال و lambdas و pattern matching",
      l: 1,
      n: "Func و Action و events، و extension methods، و switch expressions، و exceptions و using",
      items: [
        {
          cmd: "Func و Action",
          title: "Lambdas و Func و Action و events: الدوال كقيم زي JS",
          desc: R`في JS الدالة قيمة عادية. في C# برضه، بس ليها نوع: [[Func<int, int, int>]] دالة بتاخد intين وترجع int (آخر نوع هو اللي بيرجع)، و [[Action<string>]] دالة بتاخد string ومبترجعش حاجة (void). والـ lambda نفس سهم JS: [[(a, b) => a + b]].

الـ lambdas بتمسك المتغيرات اللي حواليها (closures) زي JS بالظبط. والـ delegate هو الاسم الرسمي لنوع الدالة، و [[Func]] و [[Action]] delegates جاهزة.

و [[event]] نسخة محمية من الفكرة دي: قايمة دوال تشترك فيها بـ [[+=]] وتلغي بـ [[-=]]، زي [[addEventListener]]. هتشوفها في UI و Blazor أكتر من الـ APIs.`,
          example: R`Func<int, int, int> add = (a, b) => a + b;
Action<string> log = msg => Console.WriteLine($"[log] {msg}");
Predicate<int> isEven = n => n % 2 == 0;
Console.WriteLine(add(2, 3));
log("started");
Console.WriteLine(isEven(4));
var counter = 0;
Action inc = () => counter++;
inc(); inc();
Console.WriteLine(counter);
var cart = new Cart();
cart.ItemAdded += (sender, name) => Console.WriteLine($"added {name}");
cart.ItemAdded += (_, name) => Console.WriteLine($"analytics: {name}");
cart.Add("pen");
public class Cart
{
    public event EventHandler<string>? ItemAdded;
    public void Add(string name) => ItemAdded?.Invoke(this, name);
}`,
          try: R`اكتب دالة [[Retry<T>(Func<T> action, int times)]] بتنادي [[action]] ولو رمت exception تحاول تاني لحد [[times]] مرات، وجرّبها بـ lambda بتفشل أول مرتين وتنجح التالتة (استخدم متغير عداد برّه الـ lambda).`,
          flag: "script",
          deep: {
            why: R`LINQ كله lambdas، و ASP.NET Core minimal APIs كل endpoint فيها lambda، والـ middleware lambda، والإعدادات [[o => o.UseNpgsql(...)]] lambda. لازم تبقى مرتاح إنك تبعت دالة كـ parameter وتقرا [[Func<HttpContext, Task>]] من غير ما تتوه.`,
            how: R`الـ lambda بتتحول لـ delegate instance. لو بتمسك متغيرات من برّه، الـ compiler بيعمل class مخفية شايلة المتغيرات دي (زي closure في JS)، فالتعديل على [[counter]] جوه الـ lambda بيعدّل المتغير الأصلي.

[[Func<T1, ..., TResult>]] لحد ١٦ parameter، و [[Action<T1, ...>]] للـ void، و [[Predicate<T>]] = [[Func<T, bool>]]. و [[_]] كـ parameter معناها «مش محتاجه» (discard).

الـ lambda ممكن تتحول لحاجتين: delegate (كود بيتنفذ) أو [[Expression<Func<...>>]] (شجرة بتوصف الكود). EF Core بياخد الـ Expression ويحوّلها SQL، وده ليه نفس الـ lambda بتشتغل على List وعلى الداتابيز (آخر category).

الـ event: [[event]] بيمنع اللي برّه إنه ينادي الـ delegate أو يمسحه بـ [[=]]، يقدر بس يعمل [[+=]] و [[-=]]. و [[?.Invoke]] لأن لو مفيش مشتركين القيمة null.`,
            when: R`Func و Action لأي API بياخد سلوك (callback، strategy، retry). events في UI والـ domain events البسيطة جوه process واحد. للتواصل بين services أو إشعارات مستقلة استخدم queue أو [[IHostedService]] مش events.`,
            mistakes: R`تنسى [[-=]] على event من object عايش طول عمر التطبيق فيحصل memory leak (الـ publisher ماسك reference للـ subscriber). وclosure جوه loop بيمسك نفس المتغير. و [[async void]] lambda في event handler: الـ exceptions بتوقع البروسيس (درس async).`
          },
          lines: [
            "دالة بتاخد intين وترجع int.",
            "دالة مبترجعش حاجة.",
            R`[[Predicate<int>]] = [[Func<int, bool>]].`,
            R`[[5]].`,
            R`[[[log] started]].`,
            R`[[True]].`,
            "متغير برّه الـ lambda.",
            "closure بتعدّل المتغير الأصلي.",
            "نداءين.",
            R`[[2]].`,
            "object فيه event.",
            R`اشتراك زي [[addEventListener]].`,
            R`مشترك تاني، و [[_]] يعني مش محتاج الـ sender.`,
            R`بينادي الاتنين بالترتيب: [[added pen]] ثم [[analytics: pen]].`,
            "class فيها event.",
            "بداية.",
            R`[[EventHandler<string>]] = دالة بتاخد (sender, string).`,
            R`[[?.Invoke]]: لو مفيش مشتركين مش هيعمل حاجة.`,
            "نهاية."
          ],
          sol: R`الناتج: [[attempt 1 failed]] و [[attempt 2 failed]] وبعدين [[ok on attempt 3]]. الـ lambda بتمسك [[attempts]] من برّه (closure) وبتزوّده كل نداء، فبتعرف هي في أنهي محاولة.

لاحظ إن [[Retry]] بترمي الـ exception الأصلي بـ [[throw;]] لو خلصت المحاولات، مش [[throw ex;]]، عشان الـ stack trace يفضل زي ما هو (درس exceptions). ولو [[times]] 2 بدل 3 هتلاقي [[InvalidOperationException: flaky]] بعد المحاولة التانية. في الإنتاج متكتبهاش بإيدك: مكتبة Polly أو [[Microsoft.Extensions.Http.Resilience]] بتعمل retry مع backoff (المستوى ٣).`,
          solCode: R`var attempts = 0;
var result = Retry(() =>
{
    attempts++;
    if (attempts < 3)
    {
        Console.WriteLine($"attempt {attempts} failed");
        throw new InvalidOperationException("flaky");
    }
    return $"ok on attempt {attempts}";
}, times: 3);
Console.WriteLine(result);
static T Retry<T>(Func<T> action, int times)
{
    for (var i = 1; ; i++)
    {
        try { return action(); }
        catch when (i < times) { }
    }
}`
        },
        {
          cmd: "extension methods",
          title: "extension methods: تضيف method لنوع مش بتاعك (زي LINQ بالظبط)",
          desc: R`تقدر تكتب [[static]] method في [[static class]] وأول parameter فيها [[this string s]]، فتتنادى كأنها method على الـ string: [[name.ToTitle()]]. ده اسمه extension method، وده بالظبط إزاي LINQ شغال: [[Where]] و [[Select]] extensions على [[IEnumerable<T>]].

وفي ASP.NET Core كل [[builder.Services.AddXxx()]] و [[app.MapXxx()]] extension methods. وانت هتعمل زيهم عشان تنظّم [[Program.cs]]: [[app.MapProducts()]] بدل ١٠٠ سطر.

وفي C# 14 (مع .NET 10) فيه صيغة جديدة: بلوك [[extension(IEnumerable<T> source) { ... }]] وجواه تقدر تعمل extension properties كمان، مش methods بس.`,
          example: R`Console.WriteLine("hello world from cairo".ToTitle());
Console.WriteLine("sara".IsBlank());
Console.WriteLine("  ".IsBlank());
int[] nums = [4, 8, 15];
Console.WriteLine(nums.IsEmpty);
public static class StringExtensions
{
    public static string ToTitle(this string s) =>
        string.Join(' ', s.Split(' ').Select(w => char.ToUpper(w[0]) + w[1..]));
    public static bool IsBlank(this string? s) => string.IsNullOrWhiteSpace(s);
}
public static class SeqExtensions
{
    extension<T>(IEnumerable<T> source)
    {
        public bool IsEmpty => !source.Any();
    }
}`,
          try: R`اعمل extension method [[Paginate<T>(this IEnumerable<T> items, int page, int size)]] بترجع الصفحة المطلوبة ([[Skip]] و [[Take]])، وجرّبها على الأرقام من 1 لـ 25 صفحة 3 حجم 10. وبعدين اكتبها بصيغة C# 14 جوه بلوك [[extension]].`,
          flag: "script",
          deep: {
            why: R`بتخليك تضيف helpers على أنواع مش بتاعتك (string، IEnumerable، IServiceCollection) من غير وراثة ولا wrapper، وتخلي الكود يتقري من الشمال لليمين: [[orders.Paid().Recent().Paginate(2, 20)]] بدل [[Paginate(Recent(Paid(orders)), 2, 20)]].`,
            how: R`الموضوع syntax بس: [[name.ToTitle()]] بيتحول وقت الـ compile لـ [[StringExtensions.ToTitle(name)]]. مفيش تعديل حقيقي على [[string]]، ومتقدرش توصل للـ private members. ولازم الـ namespace بتاع الـ static class يبقى متعمله [[using]] عشان الـ methods تظهر.

لو النوع نفسه عنده method بنفس الاسم، الـ instance method بتكسب. وتقدر تنادي extension على null ([[IsBlank]] على [[string?]]) لأنها method static عادية، بعكس الـ instance methods.

صيغة C# 14: [[extension<T>(IEnumerable<T> source) { ... }]] جوه [[static class]]، والأعضاء جوه البلوك بتستخدم [[source]] على طول. بتسمح بـ extension properties و static members، والصيغة القديمة لسه شغالة ومتوافقة.

و [[w[1..]]] اسمه range: من index 1 للآخر، زي [[slice(1)]].`,
            when: R`لتنظيم الـ DI والـ endpoints ([[AddShopServices]] و [[MapProducts]])، و helpers صغيرة بتتكرر على أنواع مش بتاعتك، و query helpers على [[IQueryable<T>]]. متعملش extension لكل حاجة: لو الـ method محتاجة state أو dependencies خليها service.`,
            mistakes: R`extension بتعمل I/O أو ليها side effects مخفية ورا شكل method بريئة. و [[ToTitle]] على string فاضي ([[w[0]]] بيرمي [[IndexOutOfRangeException]]). وتنسى الـ [[using]] فالـ method «مش موجودة» (CS1061) مع إنها مكتوبة.`
          },
          lines: [
            R`[[Hello World From Cairo]]: كأنها method على string.`,
            R`[[False]].`,
            R`[[True]]: بتشتغل كمان على null.`,
            "array.",
            R`[[False]]: extension property من C# 14.`,
            R`لازم [[static class]].`,
            "بداية.",
            R`[[this string s]]: ده اللي بيخليها extension.`,
            R`كل كلمة: أول حرف كبير + الباقي ([[w[1..]]] زي [[slice(1)]]).`,
            R`extension على [[string?]]: آمنة مع null.`,
            "نهاية.",
            "static class تانية.",
            "بداية.",
            R`بلوك C# 14: [[source]] هو الـ receiver.`,
            "بداية البلوك.",
            R`extension property، مش method.`,
            "نهاية البلوك.",
            "نهاية."
          ],
          sol: R`[[Enumerable.Range(1, 25).Paginate(3, 10)]] بيرجع [[21, 22, 23, 24, 25]]: الصفحة التالتة فيها ٥ بس لأن المجموع ٢٥. المعادلة [[Skip((page - 1) * size).Take(size)]]، وأشهر غلطة إنك تكتب [[Skip(page * size)]] فتبدأ من الصفحة الرابعة وترجع فاضي.

بصيغة C# 14 الـ method جوه [[extension<T>(IEnumerable<T> items) { public IEnumerable<T> Paginate(int page, int size) => items.Skip(...).Take(...); }]]، والنداء زي ما هو بالظبط. ولو الـ SDK أقدم من .NET 10 هيطلع error على كلمة [[extension]]، فالصيغة الكلاسيك بـ [[this]] هي اللي تشتغل في كل النسخ.`,
          solCode: R`Console.WriteLine(string.Join(", ", Enumerable.Range(1, 25).Paginate(3, 10)));
Console.WriteLine(string.Join(", ", Enumerable.Range(1, 25).Page(1, 10)));
public static class PagingExtensions
{
    public static IEnumerable<T> Paginate<T>(this IEnumerable<T> items, int page, int size) =>
        items.Skip((page - 1) * size).Take(size);
}
public static class PagingExtensions14
{
    extension<T>(IEnumerable<T> items)
    {
        public IEnumerable<T> Page(int page, int size) => items.Skip((page - 1) * size).Take(size);
    }
}`
        },
        {
          cmd: "switch expression",
          title: "pattern matching و switch expression: if طويلة في سطور قليلة",
          desc: R`الـ [[switch]] expression بيرجع قيمة، وكل فرع pattern: نوع ([[int n]])، أو شرط ([[when n < 0]])، أو شكل properties ([[Order { Total: > 1000 }]])، أو مقارنة ([[>= 200]])، أو [[or]] و [[and]] و [[not]]. و [[_]] هو الـ default.

ده أقوى بكتير من switch في JS، وقريب من narrowing في TS: جوه الفرع [[string s]] المتغير [[s]] نوعه string. وتقدر تعمل switch على tuple: [[(order.Total, country) switch { ... }]] وده بيحل جداول القرارات.

و [[is]] نفس الفكرة في if: [[if (x is Order { Total: > 1000 } big)]].`,
          example: R`object[] inputs = [42, -3, "hi", 3.5, new Order(1, 0m), new Order(2, 1500m)];
foreach (var x in inputs) Console.WriteLine(Describe(x));
Console.WriteLine(Shipping(new Order(3, 250m), "EG"));
Console.WriteLine(Shipping(new Order(4, 250m), "SA"));
static string Describe(object? x) => x switch
{
    null => "null",
    int n when n < 0 => $"negative int {n}",
    int n => $"int {n}",
    string { Length: 0 } => "empty string",
    string s => $"string of {s.Length}",
    Order { Total: > 1000 } o => $"big order #{o.Id}",
    Order o => $"order #{o.Id}",
    _ => $"something else: {x.GetType().Name}"
};
static decimal Shipping(Order order, string country) => (order.Total, country) switch
{
    (>= 200, "EG") => 0m,
    (_, "EG") => 30m,
    (_, "SA" or "AE") => 120m,
    _ => 200m
};
record Order(int Id, decimal Total);`,
          try: R`اعمل [[enum OrderStatus { Pending, Paid, Shipped, Cancelled }]] ودالة [[CanCancel(OrderStatus s, DateTime paidAt)]] بـ switch expression: Pending ينفع دايمًا، و Paid ينفع لو عدى أقل من ٢٤ ساعة، والباقي لأ. وبعدين امسح فرع [[_]] وشوف الـ compiler بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`منطق الـ business مليان «لو كذا وكذا يبقى كذا»: الشحن، والخصومات، والصلاحيات، وتحويل status لـ HTTP code. الـ switch expression بيخلي الجدول ده باين في مكان واحد، والـ compiler بيحذرك لو نسيت حالة.`,
            how: R`الفروع بتتفحص بالترتيب من فوق لتحت، وأول واحد يطابق يكسب. عشان كده [[int n when n < 0]] لازم قبل [[int n]]، ولو عكست الـ compiler بيقولك error CS8510 (الفرع ده مستحيل يتوصل له).

لو الـ patterns مش مغطية كل الحالات بيطلع warning CS8509 (not exhaustive)، ومع enum متغطية أسماؤه كلها بيطلع CS8524 عشان القيم اللي ملهاش اسم، ولو ولا فرع طابق وقت التشغيل بيرمي [[SwitchExpressionException]]. مع enum الـ compiler بيعرف القيم، بس لأن أي int ممكن يتعمله cast لـ enum، لازم [[_]] برضه عشان التحذير يختفي.

الأنواع: type pattern ([[int n]])، و property pattern ([[{ Length: 0 }]]، ممكن تتداخل [[{ Customer: { City: "Cairo" } }]])، و relational ([[> 1000]])، و logical ([[or]] و [[and]] و [[not null]])، و positional للـ tuples والـ records، و list patterns ([[[1, 2, ..]]]).`,
            when: R`تحويلات بقيم (status لنص، نوع لـ handler)، وجداول قرارات بشرطين أو تلاتة، وفحص الأنواع. لو كل فرع فيه ١٠ سطور منطق، يبقى if عادي أو polymorphism أوضح.`,
            mistakes: R`ترتيب غلط (العام قبل الخاص). وتتجاهل تحذير CS8509 فتاخد exception في الإنتاج. وتكتب [[x == null]] بدل [[x is null]]. وفي switch على tuple تنسى إن الترتيب مهم: [[(_, "EG")]] قبل [[(>= 200, "EG")]] هيخلي الشحن المجاني ميحصلش أبدًا.`
          },
          lines: [
            R`array من [[object]] فيه أنواع مختلفة.`,
            R`[[int 42]] و [[negative int -3]] و [[string of 2]] و [[something else: Double]] و [[order #1]] و [[big order #2]].`,
            R`[[0]]: الشحن مجاني.`,
            R`[[120]].`,
            R`[[switch]] كـ expression بيرجع قيمة.`,
            "بداية الفروع.",
            "null pattern.",
            R`type pattern + [[when]]: لازم قبل [[int n]].`,
            "أي int تاني.",
            R`property pattern: string طولها صفر.`,
            "أي string تاني.",
            "record فيه Total أكبر من 1000.",
            "أي Order تاني.",
            R`[[_]]: أي حاجة تانية.`,
            "نهاية.",
            "switch على tuple من قيمتين.",
            "بداية.",
            R`relational pattern + قيمة: مصر وفوق 200.`,
            "مصر وأقل.",
            R`[[or]] pattern.`,
            "الباقي.",
            "نهاية.",
            "record بسيط."
          ],
          sol: R`[[CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-2))]] بيرجع [[True]]، و [[AddHours(-30)]] بيرجع [[False]]، و Pending دايمًا [[True]]، و Shipped [[False]].

لما تمسح [[_]] الـ build بينجح مع [[warning CS8524: The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value. For example, the pattern '(OrderStatus)4' is not covered.]] لاحظ إنه مش CS8509 العادي، وبيقولك [[(OrderStatus)4]] مش Shipped: الأسماء الأربعة متغطية، بس أي int ممكن يتحول لـ enum. عشان كده خلي [[_ => false]] أو فرع صريح بيرمي exception.`,
          solCode: R`Console.WriteLine(CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-2)));
Console.WriteLine(CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-30)));
Console.WriteLine(CanCancel(OrderStatus.Pending, DateTime.UtcNow));
Console.WriteLine(CanCancel(OrderStatus.Shipped, DateTime.UtcNow));
static bool CanCancel(OrderStatus s, DateTime paidAt) => s switch
{
    OrderStatus.Pending => true,
    OrderStatus.Paid when DateTime.UtcNow - paidAt < TimeSpan.FromHours(24) => true,
    OrderStatus.Paid or OrderStatus.Shipped or OrderStatus.Cancelled => false,
    _ => throw new ArgumentOutOfRangeException(nameof(s))
};
enum OrderStatus { Pending, Paid, Shipped, Cancelled }`
        },
        {
          cmd: "exceptions و using",
          title: "try و catch و finally و using: الأخطاء وقفل الـ resources",
          desc: R`الـ exceptions في C# زي JS: [[throw]] و [[try]] و [[catch]] و [[finally]]. الفرق إن الـ catch بيتكتب بالنوع: [[catch (NotFoundException ex)]] بيمسك النوع ده وأولاده بس، وتقدر تحط كذا catch من الخاص للعام، وتضيف شرط بـ [[when]].

و [[throw;]] لوحدها جوه catch بترمي نفس الـ exception من غير ما تمسح الـ stack trace.

و [[using]] بيقفل أي حاجة بتطبق [[IDisposable]] (ملف، connection، HttpResponse) أول ما تخلص حتى لو حصل exception. [[using var x = ...;]] بيقفلها في آخر الـ block اللي هي فيه. زي [[try/finally]] من غير ما تكتبه.`,
          example: R`try
{
    var order = Load(7);
}
catch (NotFoundException ex) when (ex.Id > 5)
{
    Console.WriteLine($"not found: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"unexpected: {ex.GetType().Name}");
    throw;
}
finally
{
    Console.WriteLine("finally runs always");
}
using (var res = new Resource("file"))
{
    Console.WriteLine("using the resource");
}
using var conn = new Resource("conn");
Console.WriteLine("end of program");
static string Load(int id) => throw new NotFoundException(id);
public class NotFoundException(int id) : Exception($"order {id} not found")
{
    public int Id { get; } = id;
}
public class Resource(string name) : IDisposable
{
    public void Dispose() => Console.WriteLine($"disposed {name}");
}`,
          try: R`غيّر [[Load(7)]] لـ [[Load(3)]]: أنهي catch هيمسك؟ وبعدين غيّر [[throw;]] لـ [[throw ex;]] وخلّي البرنامج يقع، وقارن الـ stack trace في الحالتين (أنهي سطر بيظهر كمصدر للخطأ؟).`,
          flag: "script",
          deep: {
            why: R`الـ API لازم يفرّق بين «المستخدم طلب حاجة مش موجودة» (404) و «الداتابيز وقعت» (500)، والـ exceptions المتنوعة هي الطريقة. والـ resources اللي متقفلتش (connections، file handles) بتخلص من السيرفر بعد ساعات من التشغيل، و [[using]] بيمنع ده.`,
            how: R`كل exception بيورث من [[System.Exception]]. المهمين: [[ArgumentException]] و [[ArgumentNullException]] (parameter غلط)، و [[InvalidOperationException]] (العملية مش مسموحة في الحالة دي)، و [[KeyNotFoundException]]، و [[NullReferenceException]] (bug)، و [[OperationCanceledException]] (إلغاء).

الـ catch بيتفحص بالترتيب، ولو حطيت [[catch (Exception)]] الأول الباقي مستحيل يتوصله (error CS0160). و [[when]] (exception filter) بيتفحص قبل ما الـ stack يتفك، فلو false الـ exception بيكمّل كأن الـ catch مش موجود.

[[throw ex;]] بتبدأ stack trace جديد من السطر ده فتضيع مكان الخطأ الأصلي. [[throw;]] بتحافظ عليه. ولو عايز تلف الـ exception في نوع تاني: [[throw new ShopException("...", ex)]] والأصلي بيبقى في [[InnerException]].

[[using var]] بينادي [[Dispose()]] بترتيب عكسي في آخر الـ scope. وللـ async resources فيه [[IAsyncDisposable]] و [[await using]]. والـ [[finally]] بيتنفذ حتى مع [[return]] جوه الـ try.`,
            when: R`exceptions للحالات الاستثنائية فعلًا. للحالات المتوقعة (validation، «مش لاقي») رجّع قيمة ([[null]] أو [[Result<T>]] أو [[bool TryX]])، لأن الـ exception أبطأ ومبيبانش في توقيع الدالة. وفي ASP.NET Core متعملش try/catch في كل endpoint: فيه exception handler مركزي (المستوى ٢، درس ProblemDetails).`,
            mistakes: R`[[catch (Exception) { }]] فاضي بيبلع كل حاجة. و [[throw ex;]]. و [[catch]] وتعمل log وترمي تاني في كل طبقة فالخطأ يتسجل ٥ مرات. وتنسى [[using]] مع [[HttpResponseMessage]] أو [[FileStream]]. وفي الانترفيو: «الفرق بين [[throw]] و [[throw ex]]؟» و «إمتى finally مبيتنفذش؟» (لو البروسيس اتقتل أو [[Environment.FailFast]]).`
          },
          lines: [
            "بداية الـ try.",
            "بداية.",
            "بترمي exception.",
            "نهاية.",
            R`catch بالنوع + شرط [[when]].`,
            "بداية.",
            R`[[not found: order 7 not found]].`,
            "نهاية.",
            "أي exception تاني.",
            "بداية.",
            "log.",
            R`[[throw;]]: نفس الـ exception بنفس الـ stack trace.`,
            "نهاية.",
            "finally.",
            "بداية.",
            R`[[finally runs always]].`,
            "نهاية.",
            R`[[using]] بـ block: Dispose في آخر البلوك.`,
            "بداية.",
            R`[[using the resource]].`,
            R`نهاية البلوك: [[disposed file]].`,
            R`[[using var]]: Dispose في آخر الـ scope (هنا آخر البرنامج).`,
            R`[[end of program]] ثم [[disposed conn]].`,
            "دالة بترمي.",
            "exception خاص بيورث من Exception ويبعت الرسالة للأب.",
            "بداية.",
            "property إضافية.",
            "نهاية.",
            R`بتطبق [[IDisposable]].`,
            "بداية.",
            R`[[Dispose]]: هنا بتقفل الـ resource.`,
            "نهاية."
          ],
          sol: R`مع [[Load(3)]] الـ [[when (ex.Id > 5)]] بيطلع false، فالـ catch الأول بيتعدّى كأنه مش موجود، والتاني [[catch (Exception)]] بيمسك ويطبع [[unexpected: NotFoundException]] وبعدين [[throw;]] بترميه تاني، والبرنامج يقع بـ [[Unhandled exception. NotFoundException: order 3 not found]]. هتلاحظ إن [[finally runs always]] اتطبعت بعد رسالة الوقوع: الـ runtime بيطبع الـ exception الأول وبعدين بيفك الـ stack وينفذ الـ finally.

الـ stack trace مع [[throw;]] أول سطر فيه [[at Program.<<Main>$>g__Load|0_0(Int32 id) ... line 24]]، يعني الدالة اللي رمت فعلًا. مع [[throw ex;]] أول سطر بقى [[at Program.<Main>$(String[] args) ... line 12]]: سطر الـ [[throw ex]] نفسه، و [[Load]] اختفت من الـ trace. في مشروع حقيقي ده الفرق بين إنك تلاقي الـ bug في دقيقة أو في ساعة.`
        }
      ]
    },
    {
      t: "async و await",
      l: 1,
      n: "Task بدل Promise، و WhenAll، و CancellationToken اللي JS معندوش زيه",
      items: [
        {
          cmd: "Task و async",
          title: "Task و async و await: Promise بتاع C#",
          desc: R`[[Task<T>]] هو [[Promise<T>]]، و [[async]] و [[await]] نفس الكلمات بنفس المعنى. [[Task]] من غير نوع = [[Promise<void>]]. و [[Task.WhenAll]] = [[Promise.all]]، و [[Task.WhenAny]] = [[Promise.race]]، و [[Task.Delay]] = [[setTimeout]] في Promise.

الاسم بالعرف بيخلص بـ [[Async]]: [[GetUserAsync]]. وفي ASP.NET Core كل حاجة فيها I/O (داتابيز، HTTP، ملفات) async.

الفرق الكبير عن JS: .NET عنده threads حقيقية. الـ [[await]] بيرجّع الـ thread للـ pool وهو مستني، والكمالة ممكن تكمل على thread تاني. فالسيرفر بيخدم آلاف الـ requests بعدد threads قليل.`,
          example: R`using System.Diagnostics;
var sw = Stopwatch.StartNew();
var user = await GetUserAsync(1);
var orders = await GetOrdersAsync(1);
Console.WriteLine($"sequential: {sw.ElapsedMilliseconds}ms");
sw.Restart();
var userTask = GetUserAsync(1);
var ordersTask = GetOrdersAsync(1);
await Task.WhenAll(userTask, ordersTask);
Console.WriteLine($"parallel: {sw.ElapsedMilliseconds}ms -> {userTask.Result}, {ordersTask.Result.Length} orders");
static async Task<string> GetUserAsync(int id)
{
    await Task.Delay(300);
    return $"user{id}";
}
static async Task<int[]> GetOrdersAsync(int userId)
{
    await Task.Delay(500);
    return [1, 2, 3];
}`,
          try: R`اعمل 5 tasks بـ [[Task.Delay]] بأوقات مختلفة، واستنى أول واحدة تخلص بـ [[Task.WhenAny]]، واطبع الوقت. وبعدين اعمل دالة [[async Task<int> FailAsync()]] بترمي exception، وناديها من غير [[await]]: البرنامج هيقع؟ وبعدين بـ [[await]].`,
          flag: "script",
          deep: {
            why: R`السيرفر بيقضي أغلب وقته مستني: الداتابيز، و APIs تانية، والملفات. لو الـ thread فضل واقف مستني، هتحتاج thread لكل request والسيرفر هيقع بعد كام مية. الـ async بيخلي الـ thread يروح يخدم request تاني وهو مستني.`,
            how: R`الـ compiler بيحوّل الـ [[async]] method لـ state machine: بتشتغل عادي لحد أول [[await]] على حاجة لسه مخلصتش، فترجع Task للي ناداها، ولما العملية تخلص الكمالة بتتجدول على الـ thread pool.

لو فيه exception جوه الـ async method، مش بيترمي وقت النداء، بيتخزن في الـ Task وبيترمي لما تعمل [[await]]. عشان كده Task منسية من غير await = exception ضايع (زي unhandled rejection في JS، بس .NET مبيقعش البرنامج افتراضيًا).

[[.Result]] و [[.Wait()]] بيوقفوا الـ thread لحد ما الـ Task تخلص (blocking). بعد [[await Task.WhenAll]] استخدام [[.Result]] آمن لأنها خلصت خلاص. قبل كده ممنوع (sync over async، أسئلة الانترفيو).

[[async void]] ممنوعة إلا في event handlers: مفيش Task ترجع، فمحدش يقدر يستناها ولا يمسك الـ exception بتاعها، والـ exception بيوقع البروسيس.

و [[ValueTask<T>]] نسخة أخف لما النتيجة غالبًا جاهزة (cache hit)، وهتشوفها في APIs زي [[IExceptionHandler]].`,
            when: R`أي I/O: async من أول الـ controller لحد الـ DbContext («async all the way»). حسابات CPU بحتة متعملهاش async. ولو عندك كذا عملية مستقلة، ابدأهم الأول وبعدين [[await Task.WhenAll]].`,
            mistakes: R`[[async void]]. و [[.Result]] أو [[.Wait()]] في كود async. وتنسى [[await]] (warning CS4014) فالعملية تشتغل في الخلفية من غير ما حد يستناها. و [[await]] جوه [[foreach]] على ١٠٠ عنصر مستقلين (بطيء، استخدم WhenAll بحدود أو [[Parallel.ForEachAsync]]). و WhenAll على DbContext واحد: الـ DbContext مش thread-safe وبيرمي exception.`
          },
          lines: [
            "للقياس.",
            "ابدأ الساعة.",
            R`استنى الأولى (300ms).`,
            R`وبعدها التانية (500ms).`,
            R`[[sequential: 811ms]] تقريبًا: المجموع.`,
            "صفّر.",
            R`ابدأ الأولى من غير [[await]]: الـ Task شغالة.`,
            "وابدأ التانية معاها.",
            R`استنى الاتنين = [[Promise.all]].`,
            R`[[parallel: 499ms]]: وقت الأطول بس. [[.Result]] آمن هنا لأنهم خلصوا.`,
            R`[[async Task<string>]] = [[async (): Promise<string>]].`,
            "بداية.",
            R`[[Task.Delay]]: انتظار من غير ما يحجز thread.`,
            R`بترجع string والـ compiler بيلفها في Task.`,
            "نهاية.",
            "دالة تانية.",
            "بداية.",
            "انتظار أطول.",
            "array.",
            "نهاية."
          ],
          sol: R`مع [[Task.WhenAny]] الوقت بيبقى قد أقصر delay (مثلًا [[first done after 101ms]] لو أقصرهم 100)، و [[WhenAny]] بيرجع الـ Task اللي خلصت نفسها، فتعمل [[await]] عليها تاني عشان تاخد قيمتها. الباقيين لسه شغالين في الخلفية، ولو عايز توقفهم محتاج CancellationToken (الدرس الجاي).

[[FailAsync()]] من غير [[await]]: البرنامج مش هيقع، والـ exception بيتخزن في الـ Task ومحدش بيشوفه (وفيه warning CS4014). مع [[await FailAsync()]] الـ exception بيترمي في السطر ده بالظبط وتقدر تمسكه بـ try/catch. وده الفرق بين async method والـ sync: الـ exception مش بيحصل وقت النداء، بيحصل وقت الـ await.`,
          solCode: R`using System.Diagnostics;
var sw = Stopwatch.StartNew();
int[] delays = [400, 100, 300, 500, 200];
var tasks = delays.Select(async d => { await Task.Delay(d); return d; }).ToList();
var first = await Task.WhenAny(tasks);
Console.WriteLine($"first done after {sw.ElapsedMilliseconds}ms: delay {await first}");
_ = FailAsync();
Console.WriteLine("still running");
try { await FailAsync(); }
catch (InvalidOperationException ex) { Console.WriteLine($"caught: {ex.Message}"); }
static async Task<int> FailAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("boom");
}`
        },
        {
          cmd: "CancellationToken",
          title: "CancellationToken: توقف شغل async في النص (اللي JS معندوش زيه بسهولة)",
          desc: R`في JS عشان تلغي fetch محتاج [[AbortController]]. في .NET الفكرة دي في كل حتة: [[CancellationToken]] بيتبعت لأي method async كآخر parameter، ولما حد يلغي، العملية بتقف بـ [[OperationCanceledException]].

في ASP.NET Core كل request ليه token جاهز: لو المستخدم قفل الصفحة أو الـ client عمل timeout، الـ token بيتلغي. لو بعته لـ EF Core و HttpClient، الـ query التقيلة بتتلغي بدل ما تكمل على الفاضي.

و [[CancellationTokenSource]] هو اللي بيعمل الـ token ويلغيه، ممكن بعد وقت معين: [[new CancellationTokenSource(TimeSpan.FromSeconds(5))]] = timeout.`,
          example: R`using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(250));
try
{
    await SlowReportAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("cancelled after 250ms");
}
static async Task SlowReportAsync(CancellationToken ct)
{
    for (var i = 1; i <= 10; i++)
    {
        ct.ThrowIfCancellationRequested();
        Console.WriteLine($"step {i}");
        await Task.Delay(100, ct);
    }
}`,
          try: R`خلي [[SlowReportAsync]] ترجع عدد الخطوات اللي خلصت، واعمل الإلغاء يدوي بـ [[cts.CancelAfter(350)]] بدل الـ constructor. وبعدين اعمل token تاني بيتلغي لما تدوس Ctrl+C ([[Console.CancelKeyPress]]) واربطه بالأول بـ [[CancellationTokenSource.CreateLinkedTokenSource]].`,
          flag: "script",
          deep: {
            why: R`من غير إلغاء، كل request المستخدم قفله بيفضل شغال لحد الآخر: query تقيلة، أو API بطيء، أو report. تحت الضغط ده بيضاعف الحمل على الداتابيز وقت ما هي أصلًا تعبانة. الـ token بيخلي الشغل يقف أول ما محدش محتاجه.`,
            how: R`الإلغاء تعاوني: الـ token مجرد علم. الكود لازم يفحصه ([[ThrowIfCancellationRequested]] أو [[IsCancellationRequested]]) أو يبعته لـ API بيفحصه ([[Task.Delay]] و [[ToListAsync]] و [[HttpClient.GetAsync]]). لو method مبتبعتش الـ token لحد، الإلغاء مش هيوصل.

[[OperationCanceledException]] (وابنه [[TaskCanceledException]]) هو الطريقة القياسية لإعلان الإلغاء. في ASP.NET Core لو الـ request اتلغى والـ exception طلع، الـ framework بيفهم إنه إلغاء ومش بيعامله كـ 500.

في minimal APIs أي parameter نوعه [[CancellationToken]] بياخد [[HttpContext.RequestAborted]] أوتوماتيك، ونفس الكلام في الـ controllers. و [[CreateLinkedTokenSource(a, b)]] بيعمل token بيتلغي لو أي واحد من الاتنين اتلغى (مثلًا request token + timeout خاص بيك).

[[CancellationTokenSource]] نفسه [[IDisposable]] عشان فيه timer لما تستخدم timeout.`,
            when: R`دايمًا خد [[CancellationToken ct = default]] كآخر parameter في أي method async عامة، وابعته لتحت. و timeout بـ [[CancelAfter]] على أي نداء لسيستم برّه. والـ background services بياخدوا [[stoppingToken]] بيتلغي لما التطبيق يقفل (المستوى ٣).`,
            mistakes: R`تاخد الـ token ومتبعتهوش لـ [[ToListAsync(ct)]]. وتمسك [[Exception]] عام فتبلع الإلغاء وتسجله كـ error. وتلغي في النص عملية كتابة مش atomic (نص الداتا اتحفظ): الإلغاء قبل الكتابة، أو الكتابة في transaction. وتستخدم [[CancellationToken.None]] في كل حتة عشان «أسهل».`
          },
          lines: [
            R`source بيلغي نفسه بعد 250ms، و [[using]] عشان يقفل الـ timer.`,
            "try.",
            "بداية.",
            R`ابعت الـ [[Token]] للـ method.`,
            "نهاية.",
            "الإلغاء بيطلع كـ exception.",
            "بداية.",
            R`[[cancelled after 250ms]].`,
            "نهاية.",
            R`الـ token آخر parameter بالعرف.`,
            "بداية.",
            "10 خطوات.",
            "بداية.",
            "افحص قبل كل خطوة.",
            R`[[step 1]] و [[step 2]] و [[step 3]] بس.`,
            R`وابعته كمان لـ [[Delay]] فيتلغي في نص الانتظار.`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`مع [[CancelAfter(350)]] الناتج [[step 1]] لحد [[step 4]] وبعدين الإلغاء، وعدد الخطوات اللي خلصت ٣ (الرابعة بدأت واتلغت في نص الـ [[Delay]]). عشان ترجع العدد لازم تمسك الـ exception جوه الـ method أو تخزّن العداد برّه، لأن الـ exception بيقطع الـ return.

مع الـ linked token: [[using var linked = CancellationTokenSource.CreateLinkedTokenSource(cts.Token, ctrlC.Token);]] وابعت [[linked.Token]]. لو دست Ctrl+C قبل الـ timeout هيتلغي فورًا، وفي [[CancelKeyPress]] لازم [[e.Cancel = true]] عشان البرنامج ميتقفلش قبل ما تطبع. ده بالظبط اللي بتعمله في API: token الـ request مربوط بـ timeout بتاعك.`,
          solCode: R`using var cts = new CancellationTokenSource();
cts.CancelAfter(350);
using var ctrlC = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) => { e.Cancel = true; ctrlC.Cancel(); };
using var linked = CancellationTokenSource.CreateLinkedTokenSource(cts.Token, ctrlC.Token);
var done = 0;
try
{
    for (var i = 1; i <= 10; i++)
    {
        linked.Token.ThrowIfCancellationRequested();
        Console.WriteLine($"step {i}");
        await Task.Delay(100, linked.Token);
        done++;
    }
}
catch (OperationCanceledException)
{
    Console.WriteLine($"cancelled, finished {done} steps");
}`
        }
      ]
    },
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
          sol: R`[[?q=pen]] بيرجع [[[{"id":1,"name":"Blue pen","price":5.50,"category":"Pens"},{"id":2,"name":"Red pen","price":6.00,"category":"Pens"}]]]. و [[/api/products/99]] بيرجع 404 بـ [[application/problem+json]] (لأن [[AddProblemDetails]] متسجلة). و [[/api/products/abc]] برضه 404: [[abc]] مش int فالـ route [[{id:int}]] مطابقش أصلًا، ومفيش route تاني يطابق. لو شلت [[:int]] هيبقى 400 لأن الـ binding فشل يحوّل abc لـ int.

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
    },
    {
      t: "Validation و الأخطاء",
      l: 2,
      n: "DataAnnotations و AddValidation في .NET 10، و ProblemDetails و exception handler مركزي",
      items: [
        {
          cmd: "validation",
          title: "تفحص الـ request قبل ما يوصل للمنطق: DataAnnotations و AddValidation",
          desc: R`أبسط طريقة: attributes على الـ DTO: [[[Required]]] و [[[StringLength(200, MinimumLength = 2)]]] و [[[Range(0.01, 100000)]]] و [[[EmailAddress]]] و [[[MinLength(1)]]] (للـ lists). زي Zod schema بس ملزوقة في الـ type نفسه.

في الـ controllers بـ [[[ApiController]]] الـ validation شغال من زمان. في minimal APIs كان لازم تعمله بإيدك أو بمكتبة، ومن .NET 10 بقى built-in: [[builder.Services.AddValidation()]] وخلاص. أي parameter عليه attributes بيتفحص، ولو فشل بيرجع 400 [[ValidationProblemDetails]] فيه كل الأخطاء مرة واحدة.

الـ validation اللي محتاجة داتابيز («الـ category موجودة؟»، «الإيميل متكرر؟») مكانها الـ handler أو الـ service، وترجع [[TypedResults.ValidationProblem]] بنفس الشكل.`,
          example: R`public record CreateProduct(
    [Required, StringLength(200, MinimumLength = 2)] string Name,
    [Range(0.01, 100000)] decimal Price,
    [Range(0, int.MaxValue)] int Stock,
    int CategoryId);
builder.Services.AddValidation();
g.MapPost("/", async Task<Results<Created<ProductDto>, ValidationProblem>> (CreateProduct body, ShopDb db) =>
{
    var category = await db.Categories.FindAsync(body.CategoryId);
    if (category is null)
        return TypedResults.ValidationProblem(new Dictionary<string, string[]>
        {
            ["categoryId"] = [$"Category {body.CategoryId} does not exist."]
        });
    var product = new Product { Name = body.Name, Price = body.Price, Stock = body.Stock, CategoryId = category.Id };
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/api/products/{product.Id}", new ProductDto(product.Id, product.Name, product.Price, category.Name));
});`,
          try: R`ابعت [[{"name":"x","price":0,"stock":-1,"categoryId":1}]] وشوف كام خطأ رجع. وبعدين اعمل attribute خاص [[[NoProfanity]]] (class بتورث [[ValidationAttribute]] وتعمل override لـ [[IsValid]]) وحطه على [[Name]]. وأخيرًا ابعت نفس المنتج مرتين: إيه اللي بيرجع التانية؟`,
          flag: "script",
          deep: {
            why: R`كل حاجة جاية من برّه مش مضمونة. من غير validation: سعر سالب في الداتابيز، أو اسم ١٠ ميجا، أو exception من الداتابيز بـ 500 بدل رسالة واضحة. والـ validation في مكان واحد وبشكل موحد ([[errors]] بالحقل) بيخلي الـ frontend يعرض الخطأ جنب الحقل الصح.`,
            how: R`[[AddValidation()]] في .NET 10 بيستخدم source generator بيلاقي الأنواع المستخدمة كـ parameters في الـ endpoints وبيولّد كود فحص ليها، وبيضيف endpoint filter بيشغّله قبل الـ handler. بيفحص nested objects و collections كمان. ولو عايز endpoint معين من غير validation: [[.DisableValidation()]].

الـ attributes على positional record بتتكتب على الـ parameter ([[[Required] string Name]]). لو الـ property [[string]] non-nullable و [[Nullable]] enable، الـ JSON اللي مفيهوش الحقل بيتربط بـ null وبيفشل الـ [[Required]]. و [[[Range]]] على decimal بياخد double في الـ attribute بس بيقارن صح.

الـ response: [[400]] بـ [[application/problem+json]] وفيه [["errors": {"Name": ["..."], "Price": ["..."]}]]. أسماء الحقول بتطلع بنفس casing الـ property.

للقواعد المعقدة (حقل يعتمد على حقل تاني، قواعد async) الناس بتستخدم FluentValidation: class لكل DTO فيها [[RuleFor(x => x.Price).GreaterThan(0)]]. أو [[IValidatableObject]] على الـ DTO نفسه.`,
            when: R`DataAnnotations للقواعد البسيطة (مطلوب، طول، مدى، شكل). FluentValidation لما القواعد تكتر أو تحتاج منطق. الفحص اللي محتاج داتابيز في الـ service. والـ constraints في الداتابيز نفسها (unique، foreign key، check) كخط دفاع أخير.`,
            mistakes: R`تنسى [[AddValidation()]] في minimal API وتفتكر إن الـ attributes شغالة لوحدها (مش هيحصل أي فحص). وتعتمد على validation الـ frontend بس. وتسيب unique constraint من الداتابيز يطلع كـ 500: امسك [[DbUpdateException]] وحوّلها 409، أو افحص قبلها (مع العلم إن الفحص قبلها فيه race condition).`
          },
          lines: [
            "DTO بـ attributes على الـ parameters.",
            "مطلوب وطوله بين 2 و 200.",
            "سعر موجب.",
            "مخزون مش سالب.",
            "مفيش attribute: أي int.",
            R`.NET 10: validation built-in لـ minimal APIs (في Program.cs).`,
            R`الـ body بيتفحص قبل ما الـ handler يشتغل. نوع الرجوع: 201 أو 400.`,
            "بداية.",
            "فحص محتاج داتابيز: جوه الـ handler.",
            "مش موجودة؟",
            R`400 بنفس شكل أخطاء الـ attributes.`,
            "بداية الـ dictionary.",
            "الحقل ورسايله.",
            "نهاية.",
            "entity جديدة.",
            "ضيفها للـ context.",
            R`[[INSERT]] فعلي.`,
            R`201 + [[Location]] + الـ DTO.`,
            "نهاية."
          ],
          sol: R`الـ request الغلط بيرجع 400 وفيه ٣ أخطاء مرة واحدة: [["Name":["The field Name must be a string with a minimum length of 2 and a maximum length of 200."],"Price":["The field Price must be between 0.01 and 100000."],"Stock":["The field Stock must be between 0 and 2147483647."]]]. الـ category مش بتتفحص لأن الـ handler مشتغلش أصلًا.

الـ attribute: [[public class NoProfanityAttribute : ValidationAttribute { protected override ValidationResult? IsValid(object? value, ValidationContext ctx) => value is string s && s.Contains("badword", StringComparison.OrdinalIgnoreCase) ? new ValidationResult("Name contains blocked words.") : ValidationResult.Success; }]].

المنتج مرتين: التانية بترجع 500 [["title":"An error occurred while processing your request."]] لأن [[IX_Products_Name]] unique والداتابيز رفضت ([[DbUpdateException]] جواها [[PostgresException 23505]]). ده مكانه الدرس الجاي: تحوّله لـ 409 Conflict.`
        },
        {
          cmd: "ProblemDetails",
          title: "كل الأخطاء بشكل واحد: ProblemDetails و IExceptionHandler",
          desc: R`ProblemDetails (RFC 9457) شكل JSON قياسي للأخطاء: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]، وأي حقول زيادة. ASP.NET Core بيدعمه built-in: [[builder.Services.AddProblemDetails()]] + [[app.UseExceptionHandler()]] + [[app.UseStatusCodePages()]]، فأي exception أو 404 أو 401 بيطلع بالشكل ده بـ [[application/problem+json]] ومعاه [[traceId]].

للأخطاء اللي انت عارفها (المخزون خلص، الطلب اتلغى) اعمل class بتطبق [[IExceptionHandler]] بتحوّل الـ exception لـ status مناسب (409، 422) بدل 500. والـ handlers بتتفحص بالترتيب اللي اتسجلت بيه.

الـ stack trace مبيظهرش للمستخدم أبدًا في Production، بيتسجل في اللوج بس.`,
          example: R`public class DomainExceptionHandler(IProblemDetailsService problems) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext http, Exception ex, CancellationToken ct)
    {
        if (ex is not OutOfStockException oos) return false;
        http.Response.StatusCode = StatusCodes.Status409Conflict;
        return await problems.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = http,
            Exception = ex,
            ProblemDetails = new ProblemDetails
            {
                Title = "Out of stock",
                Detail = ex.Message,
                Status = StatusCodes.Status409Conflict,
                Extensions = { ["productId"] = oos.ProductId }
            }
        });
    }
}
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<DomainExceptionHandler>();
app.UseExceptionHandler();
app.UseStatusCodePages();`,
          try: R`اعمل handler تاني [[DbConflictHandler]] بيمسك [[DbUpdateException]] اللي جواها [[PostgresException]] بـ [[SqlState == "23505"]] (unique violation) ويرجع 409 بـ title [["Duplicate"]]. سجّله وجرّب تضيف نفس المنتج مرتين. وبعدين شيل [[AddProblemDetails]] وشوف شكل الـ 404 بقى إيه.`,
          flag: "script",
          deep: {
            why: R`من غير شكل موحد، كل endpoint بيرجع الخطأ بطريقة: مرة string، ومرة [[{ error: }]]، ومرة [[{ message: }]]، ومرة HTML. الـ frontend بيتعب، والـ stack traces بتتسرب للمستخدم (ثغرة). ProblemDetails بيحل ده مرة واحدة وفي كل الـ framework.`,
            how: R`[[UseExceptionHandler()]] middleware بيلف الـ pipeline كله في try/catch. لما exception يحصل، بيمسح الـ response، ويجرب الـ [[IExceptionHandler]]s بالترتيب: أول واحد يرجع true خلاص. لو محدش مسكه، [[IProblemDetailsService]] بيكتب 500 عام. وكل ده بيتسجل في اللوج بالـ exception الكامل.

[[UseStatusCodePages()]] بيملى الـ responses الفاضية اللي status بتاعها 400-599 (زي 404 من الـ routing و 401 من الـ auth) بـ ProblemDetails. و [[TypedResults.NotFound()]] من غير body بيتملى برضه.

في Development لو مفيش [[UseExceptionHandler]]، الـ Developer Exception Page بيشتغل تلقائي وبيطلع الـ stack trace، مفيد وانت بتطور بس لازم ميبقاش في Production.

تقدر تعدّل كل الـ ProblemDetails من مكان واحد: [[AddProblemDetails(o => o.CustomizeProblemDetails = ctx => ctx.ProblemDetails.Extensions["requestId"] = ...)]]. والـ [[traceId]] بيربط الرد باللوج: المستخدم يبعتلك الـ id وانت تدوّر بيه.`,
            when: R`دايمًا في أي API. exceptions مخصصة لحالات الـ domain المعروفة ([[NotFoundException]] و [[ConflictException]] و [[OutOfStockException]]) مع handler واحد يحوّلها، أو [[Result<T>]] وترجع الـ status من الـ endpoint، الاتنين مقبولين وتمسك في واحد. قارن بـ «استراتيجية الأخطاء» في «تاب Backend بـ Node» و [[problem+json]] في «تاب APIs متقدمة».`,
            mistakes: R`try/catch في كل endpoint بيرجع [[BadRequest(ex.Message)]] (بيسرّب تفاصيل داخلية، وبيخلي كل خطأ 400). وترجع 200 وجواه [[{ success: false }]]. وتنسى إن الـ middleware اللي قبل [[UseExceptionHandler]] مش محمي، فحطه أول واحد. ونسيت [[return false]] للأنواع اللي مش بتاعتك فالـ handler يبلع كل حاجة.`
          },
          lines: [
            R`handler بياخد [[IProblemDetailsService]] من الـ DI.`,
            "بداية.",
            R`بيتنادى لأي exception. [[ValueTask]] لأنه غالبًا بيخلص بسرعة.`,
            "بداية.",
            R`مش النوع بتاعي؟ [[false]] = سيبه للـ handler اللي بعدي.`,
            "409.",
            R`اكتب ProblemDetails بالشكل القياسي (ومعاه [[traceId]]).`,
            "بداية.",
            "الـ context.",
            "الـ exception للّوج.",
            "المحتوى.",
            "بداية.",
            "عنوان قصير ثابت لنوع المشكلة.",
            "التفاصيل للحالة دي.",
            "الـ status.",
            R`حقل زيادة: [["productId": 2]].`,
            "نهاية.",
            "نهاية.",
            "نهاية.",
            "نهاية.",
            "تسجيل: ProblemDetails للكل.",
            "تسجيل الـ handler (ممكن أكتر من واحد، بالترتيب).",
            R`الـ middleware: أول حاجة في الـ pipeline.`,
            "الـ responses الفاضية 4xx و 5xx تبقى ProblemDetails."
          ],
          sol: R`الـ handler: [[if (ex is not DbUpdateException { InnerException: PostgresException { SqlState: "23505" } pg }) return false;]] وبعدين نفس الكود بـ 409 و [[Title = "Duplicate"]] و [[Detail = pg.ConstraintName]] (بيطلع [[IX_Products_Name]]). المنتج التاني بقى يرجع [[409]] بدل 500، والـ pattern المتداخل ده (property pattern جوه property pattern) من درس switch expression.

ولما تشيل [[AddProblemDetails]] التطبيق مش هيقوم أصلًا: [[Unable to resolve service for type 'Microsoft.AspNetCore.Http.IProblemDetailsService' while attempting to activate 'Shop.Api.Services.DomainExceptionHandler']]، لأن الـ handlers بتوعك بتطلبه في الـ constructor. ولاحظ من نفس الرسالة إن [[AddExceptionHandler<T>]] بيسجّل الـ handler كـ Singleton، يعني مينفعش تطلب فيه [[ShopDb]] أو أي Scoped service (درس DI و lifetimes). ولو مكانش عندك handlers خاصة، [[app.UseExceptionHandler()]] من غير [[AddProblemDetails]] ولا path هو نفسه بيرمي أول ما الـ pipeline يتبني: [[An error occurred when configuring the exception handler middleware. Either the 'ExceptionHandlingPath' or the 'ExceptionHandler' property must be set]]. ولو شلته أو اديته path، الـ 404 بيرجع من [[UseStatusCodePages]] كنص عادي [[Status Code: 404; Not Found]] بـ [[text/plain]]، مش JSON.`,
          solCode: R`using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

public class DbConflictHandler(IProblemDetailsService problems) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext http, Exception ex, CancellationToken ct)
    {
        if (ex is not DbUpdateException { InnerException: PostgresException { SqlState: "23505" } pg }) return false;
        http.Response.StatusCode = StatusCodes.Status409Conflict;
        return await problems.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = http,
            Exception = ex,
            ProblemDetails = new ProblemDetails
            {
                Title = "Duplicate",
                Detail = $"Value violates {pg.ConstraintName}",
                Status = StatusCodes.Status409Conflict
            }
        });
    }
}`
        }
      ]
    },
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
# appsettings.json: { "Shop": { "PageSize": 20, "SupportEmail": "help@shop.test" } }
# Shop__PageSize=50 dotnet run         -> {"pageSize":50,...}
# Shop__PageSize=500 dotnet run        -> OptionsValidationException وقت الـ startup`,
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
# appsettings.json
# "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning",
#   "Microsoft.EntityFrameworkCore.Database.Command": "Information" } }`,
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
