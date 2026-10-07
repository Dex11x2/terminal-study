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
          teach: R`## البرنامج ده بيعمل إيه؟

بيوريك إن الدالة في C# قيمة تتحط في متغير وتتبعت وتتنادى، زي JS بالظبط، بس ليها **نوع**. فيه ٣ أجزاء: دوال في متغيرات ([[Func]] و [[Action]] و [[Predicate]])، وبعدين closure بتعدّل متغير برّه، وأخيرًا [[event]] فيه مشتركين اتنين.

كل الناتج تحت حقيقي من [[dotnet run app.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401 على لينكس). الكود كله في ملف واحد [[app.cs]] من غير مشروع (درس «dotnet run app.cs»).

---

## ١. دالة في متغير: [[Func<int, int, int>]]

~~~csharp app.cs
Func<int, int, int> add = (a, b) => a + b;
~~~

### النوع: [[Func<int, int, int>]]

- [[Func]] نوع جاهز في .NET معناه «دالة بترجع قيمة».
- اللي بين [[< >]] اسمهم generic type arguments (درس generics): بتقول للـ [[Func]] الأنواع بتاعتها.
- **آخر نوع دايمًا هو اللي بيرجع**، واللي قبله الـ parameters. فـ [[Func<int, int, int>]] = بتاخد int و int وترجع int.

| الكتابة | بتاخد | بترجع |
|---|---|---|
| [[Func<int>]] | ولا حاجة | int |
| [[Func<string, int>]] | string | int |
| [[Func<int, int, int>]] | int و int | int |

### القيمة: [[(a, b) => a + b]]

- ده lambda: دالة من غير اسم. [[(a, b)]] الـ parameters، و [[=>]] (السهم) بيفصلهم عن الجسم، و [[a + b]] اللي بيرجع.
- مكتبناش نوع [[a]] و [[b]]: الـ compiler عرف إنهم int من نوع المتغير على الشمال.
- نفس سهم JS بالظبط: [[(a, b) => a + b]].

ولو بعت نوع غلط، الـ compiler بيوقفك قبل ما البرنامج يشتغل. جرّبت [[add(2, "3")]]:

~~~text الناتج: dotnet run
/w/x0b/app.cs(3,26): error CS1503: Argument 2: cannot convert from 'string' to 'int'
~~~

[[(3,26)]] يعني سطر ٣ عمود ٢٦، و [[CS1503]] كود الخطأ (تقدر تدوّر بيه في الـ docs). ده الفرق عن JS: هناك [[add(2, "3")]] كانت هترجع [["23"]] في صمت.

---

## ٢. دالة مبترجعش حاجة: [[Action<string>]]

~~~csharp app.cs
Action<string> log = msg => Console.WriteLine($"[log] {msg}");
~~~

- [[Action]] = دالة **مبترجعش** حاجة (void). فكل الأنواع اللي بين [[< >]] parameters: [[Action<string>]] بتاخد string.
- [[msg => ...]]: لما يكون فيه parameter واحد بس، الأقواس حواليه اختيارية.
- [[$"[log] {msg}"]]: الـ [[$]] قبل علامة التنصيص اسمها string interpolation، و [[{msg}]] جواها بيتبدل بقيمة المتغير. زي template string في JS.

---

## ٣. [[Predicate<int>]]

~~~csharp app.cs
Predicate<int> isEven = n => n % 2 == 0;
~~~

- [[Predicate<T>]] دالة بتاخد T وترجع bool. يعني هي نفس [[Func<int, bool>]] بالمعنى، بس اسم أقدم.
- [[%]] باقي القسمة، و [[==]] مقارنة. فـ [[n % 2 == 0]] معناها «n زوجي».

---

## ٤. ننادي التلاتة

~~~csharp app.cs
Console.WriteLine(add(2, 3));
log("started");
Console.WriteLine(isEven(4));
~~~

بتتنادى زي أي دالة عادية بالأقواس:

~~~text الناتج
5
[log] started
True
~~~

- [[True]] بحرف كبير: ده شكل الـ bool لما .NET يحوّله لنص ([[bool.ToString()]])، مش [[true]] زي JS.
- [[log("started")]] مش جوه [[Console.WriteLine]] لأنها أصلًا بتطبع ومبترجعش حاجة.

### طب الأنواع دي إيه بالظبط؟

[[Func]] و [[Action]] و [[Predicate]] اسمهم **delegates**: الـ delegate هو «نوع دالة». جرّبت أطبع [[log.GetType()]] و [[isEven.GetType()]]:

~~~text الناتج
System.Action$__bt1[System.String]
System.Predicate$__bt1[System.Int32]
~~~

- [[System]] الـ namespace اللي هما فيه.
- [[$__bt1]] معناها «generic بنوع واحد».
- [[System.Int32]] هو الاسم الحقيقي لـ [[int]] (و [[string]] = [[System.String]]).

---

## ٥. closure: الـ lambda بتمسك متغير برّه

~~~csharp app.cs
var counter = 0;
Action inc = () => counter++;
inc(); inc();
Console.WriteLine(counter);
~~~

- [[var]]: الـ compiler يستنتج النوع (هنا int).
- [[Action]] من غير [[< >]]: دالة مبتاخدش حاجة ومبترجعش حاجة. و [[()]] الفاضية معناها مفيش parameters.
- [[counter++]]: زوّد واحد على المتغير.
- [[inc(); inc();]] نداءين في سطر واحد، والـ [[;]] بتفصل بينهم.

~~~text الناتج
2
~~~

ليه ٢ مش ٠؟ لأن الـ lambda مش واخدة **نسخة** من [[counter]]، ماسكة **المتغير نفسه**. الـ compiler بيعمل class مخفية شايلة [[counter]]، والـ lambda والكود اللي برّه الاتنين بيشاوروا عليها. ده اسمه closure، ونفس اللي بيحصل في JS بالظبط.

---

## ٦. الـ event: قايمة مشتركين

### الـ class الأول (آخر الملف)

~~~csharp app.cs
public class Cart
{
    public event EventHandler<string>? ItemAdded;
    public void Add(string name) => ItemAdded?.Invoke(this, name);
}
~~~

في الملف الواحد الكود اللي بيتنفذ (top-level statements) لازم يبقى فوق، والـ classes تحته. عشان كده [[Cart]] في الآخر.

- [[public event EventHandler<string>? ItemAdded;]]:
  - [[EventHandler<string>]] نوع delegate جاهز شكله [[(object? sender, string e)]]: مين بعت الحدث، والداتا بتاعته (هنا اسم المنتج).
  - [[?]] بعد النوع: ممكن يبقى null، وهو فعلًا null لحد ما حد يشترك (درس nullable).
  - [[event]]: بتحوّل الـ delegate لقايمة **محمية** (تحت).
- [[public void Add(string name) => ...]]: method جسمها سطر واحد، و [[=>]] هنا اسمها expression body: اختصار لـ [[{ ...; }]].
- [[ItemAdded?.Invoke(this, name)]]:
  - [[?.]] اسمه null-conditional: لو [[ItemAdded]] null متعملش حاجة، غير كده كمّل.
  - [[Invoke]] بتنادي كل الدوال المشتركة بالترتيب.
  - [[this]] الـ object الحالي (الـ cart نفسه) بيتبعت كـ sender.

جرّبت أعمل [[cart.Add("pen")]] من غير ولا مشترك:

~~~text الناتج
no subscribers, no crash
~~~

لو شلت الـ [[?]] من [[?.Invoke]] كان هيرمي [[NullReferenceException]].

### الاشتراك

~~~csharp app.cs
var cart = new Cart();
cart.ItemAdded += (sender, name) => Console.WriteLine($"added {name}");
cart.ItemAdded += (_, name) => Console.WriteLine($"analytics: {name}");
cart.Add("pen");
~~~

- [[new Cart()]]: اعمل object جديد.
- [[+=]] على event معناها «ضيف الدالة دي للقايمة»، زي [[addEventListener]] في JS. و [[-=]] بتشيلها.
- [[(_, name)]]: الـ [[_]] اسمها discard: «فيه parameter هنا ومش محتاجه».
- [[cart.Add("pen")]] بتنادي [[Invoke]]، اللي بتنادي المشتركين بترتيب اشتراكهم:

~~~text الناتج
added pen
analytics: pen
~~~

### ليه [[event]] مش delegate عادي؟

من برّه الـ class مسموح بـ [[+=]] و [[-=]] بس. جرّبت أعمل [[cart.ItemAdded = ...]] (تمسح كل المشتركين) و [[cart.ItemAdded?.Invoke(...)]] (تطلق الحدث بنفسك):

~~~text الناتج: dotnet run
/w/x0a/app.cs(2,6): error CS0070: The event 'Cart.ItemAdded' can only appear on the left hand side of += or -= (except when used from within the type 'Cart')
/w/x0a/app.cs(3,6): error CS0070: The event 'Cart.ItemAdded' can only appear on the left hand side of += or -= (except when used from within the type 'Cart')
~~~

يعني الـ [[Cart]] بس هي اللي تقرر إمتى الحدث يحصل، وكل مشترك ميقدرش يمسح التانيين.

---

## ٧. الحل: [[Retry<T>]]

~~~csharp app.cs
static T Retry<T>(Func<T> action, int times)
{
    for (var i = 1; ; i++)
    {
        try { return action(); }
        catch when (i < times) { }
    }
}
~~~

- [[static]]: دالة محلية في الملف مش محتاجة object. و [[<T>]] generic: [[T]] أي نوع، والـ [[Func<T>]] بترجعه.
- [[for (var i = 1; ; i++)]]: الشرط في النص فاضي، يعني loop من غير نهاية. الخروج بيحصل بـ [[return]] أو بـ exception.
- [[try { return action(); }]]: نادي الدالة، ولو نجحت ارجع بقيمتها فورًا.
- [[catch when (i < times) { }]]: امسك أي exception **بس لو** لسه فيه محاولات، وجسم فاضي يعني «كمّل اللفة الجاية». و [[when]] اسمه exception filter (درس exceptions).
- في آخر محاولة [[i < times]] بيبقى false، فالـ catch كأنه مش موجود والـ exception بيطلع للي نادى.

والنداء:

~~~csharp app.cs
var attempts = 0;
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
~~~

- الـ lambda هنا ليها جسم كامل بين [[{ }]] لأنها أكتر من سطر، وفيه [[return]].
- [[attempts]] برّه الـ lambda، والـ lambda بتزوّده (closure زي جزء ٥)، فبتعرف هي في أنهي محاولة.
- [[throw new InvalidOperationException("flaky")]]: ارمي exception جديد برسالة [[flaky]].
- [[Retry(...)]] من غير [[<string>]]: الـ compiler استنتج [[T = string]] من الـ return.
- [[times: 3]] اسمها named argument: بتكتب اسم الـ parameter عشان النداء يتقري أوضح.

~~~text الناتج
attempt 1 failed
attempt 2 failed
ok on attempt 3
~~~

ولما خليتها [[times: 2]]:

~~~text الناتج
attempt 1 failed
attempt 2 failed
Unhandled exception. System.InvalidOperationException: flaky
   at Program.<>c__DisplayClass0_0.<<Main>$>b__0() in /w/x0d/app.cs:line 8
   at Program.<<Main>$>g__Retry|0_1[T](Func$__bt1 action, Int32 times) in /w/x0d/app.cs:line 17
~~~

أول سطر في الـ stack trace هو سطر ٨ (الـ [[throw]] جوه الـ lambda) لأن الـ exception عدّى من غير ما حد يمسكه. والأسامي الغريبة زي [[<>c__DisplayClass0_0]] هي الـ class المخفية اللي الـ compiler عملها للـ closure (جزء ٥).

---

## الخلاصة

| الحاجة | يعني | زي JS |
|---|---|---|
| [[Func<A, B, R>]] | دالة بتاخد A و B وترجع R (آخر نوع = الرجوع) | [[(a, b) => r]] |
| [[Action<A>]] | دالة مبترجعش حاجة | دالة من غير return |
| [[Predicate<T>]] | [[Func<T, bool>]] | دالة فلتر |
| [[x => ...]] | lambda | arrow function |
| closure | الـ lambda بتمسك المتغير نفسه مش نسخة | نفس الكلام |
| [[event]] + [[+=]] / [[-=]] | قايمة مشتركين محمية | [[addEventListener]] / [[removeEventListener]] |
| [[?.Invoke]] | نادي لو فيه مشتركين | [[fn?.()]] |

- الـ delegate = نوع دالة، و [[Func]] و [[Action]] delegates جاهزة.
- [[_]] parameter مش محتاجه.
- اللي برّه الـ class مع [[event]] يقدر يشترك ويلغي بس (CS0070 لو حاول غير كده).`,
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

لاحظ إن [[Retry]] مش بتمسك الـ exception في آخر محاولة أصلًا: [[catch when (i < times)]] شرطه بيبقى false، فالـ exception الأصلي بيطلع زي ما هو بالـ stack trace بتاعه (نفس فايدة [[throw;]] في درس exceptions، ومن غير [[throw ex;]] اللي بتمسحه). ولو [[times]] 2 بدل 3 هتلاقي [[Unhandled exception. System.InvalidOperationException: flaky]] بعد المحاولة التانية. في الإنتاج متكتبهاش بإيدك: مكتبة Polly أو [[Microsoft.Extensions.Http.Resilience]] بتعمل retry مع backoff (المستوى ٣).`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيضيف لـ [[string]] اتنين methods مش موجودين فيه ([[ToTitle]] و [[IsBlank]])، ويضيف لأي collection property اسمها [[IsEmpty]]، من غير ما يلمس الـ [[string]] نفسه. ده بالظبط إزاي [[Where]] و [[Select]] بتاعة LINQ بتظهر على أي list.

الناتج كله حقيقي من [[dotnet run app.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401، يعني C# 14).

---

## ١. الصيغة الكلاسيكية: [[this]] في أول parameter

~~~csharp app.cs
public static class StringExtensions
{
    public static string ToTitle(this string s) =>
        string.Join(' ', s.Split(' ').Select(w => char.ToUpper(w[0]) + w[1..]));
    public static bool IsBlank(this string? s) => string.IsNullOrWhiteSpace(s);
}
~~~

٣ شروط عشان method تبقى extension:

1. الـ class تبقى [[static class]]: class مينفعش يتعمل منها object، كلها methods static.
2. الـ method نفسها [[static]].
3. أول parameter قبله كلمة [[this]]: [[this string s]] معناها «الـ method دي تتنادى على أي string، والـ string ده هيوصل في [[s]]».

### [[ToTitle]] من جوه لبرة

السطر الطويل ده بيتنفذ من جوه لبرة، فهنمشي بنفس الترتيب على [["hello world from cairo"]]:

**الخطوة ١: [[s.Split(' ')]]**: قطّع النص عند كل مسافة. [[' ']] بعلامة تنصيص واحدة يعني **char** (حرف واحد)، مش string.

~~~text الناتج
hello, world, from, cairo
~~~

(طبعتها بـ [[string.Join(", ", ...)]] عشان تبان القطع.)

**الخطوة ٢: [[.Select(w => ...)]]**: LINQ (درس LINQ): لكل كلمة [[w]] اعمل كلمة جديدة. زي [[map]] في JS.

**الخطوة ٣: [[char.ToUpper(w[0]) + w[1..]]]** على كلمة [["cairo"]]:

| الحتة | معناها | الناتج |
|---|---|---|
| [[w[0]]] | أول حرف (index صفر) | [[c]] |
| [[char.ToUpper(...)]] | كبّره | [[C]] |
| [[w[1..]]] | range: من index 1 للآخر، زي [[slice(1)]] | [[airo]] |
| [[+]] | char + string = string جديد | [[Cairo]] |

**الخطوة ٤: [[string.Join(' ', ...)]]**: لزّق الكلمات تاني بمسافة بينهم. زي [[join(" ")]] في JS.

### [[=>]] بعد الـ method

[[public static string ToTitle(...) =>]] اسمها expression-bodied method: الـ method كلها expression واحد بيرجع، بدل [[{ return ...; }]]. السطر مكسور على اتنين بس عشان الطول، والـ compiler مش فارق معاه.

### [[IsBlank(this string? s)]]

- [[string?]]: الـ [[?]] معناها الـ string ممكن يبقى null (درس nullable).
- [[string.IsNullOrWhiteSpace(s)]]: method جاهزة بترجع true لو null أو فاضي أو مسافات بس.

---

## ٢. النداء

~~~csharp app.cs
Console.WriteLine("hello world from cairo".ToTitle());
Console.WriteLine("sara".IsBlank());
Console.WriteLine("  ".IsBlank());
~~~

~~~text الناتج
Hello World From Cairo
False
True
~~~

### ده بيتحول لإيه؟

[[name.ToTitle()]] مجرد شكل. الـ compiler بيحوّله لنداء static عادي: [[StringExtensions.ToTitle(name)]]. جرّبت أكتبه بالشكل ده بإيدي:

~~~csharp app.cs
Console.WriteLine(StringExtensions.ToTitle("hello world"));
~~~

~~~text الناتج
Hello World
~~~

نفس النتيجة. ومن هنا نفهم حاجتين:

- مفيش تعديل حقيقي على [[string]]، ومتقدرش توصل لأي حاجة [[private]] جواه.
- تقدر تنادي extension على **null** من غير ما يقع، لأنها في الحقيقة دالة بتاخد null كـ parameter. جرّبت:

~~~csharp app.cs
string? nothing = null;
Console.WriteLine(nothing.IsBlank());
~~~

~~~text الناتج
True
~~~

لو [[IsBlank]] كانت method عادية على الـ object، النداء ده كان هيرمي [[NullReferenceException]].

### لما الـ namespace مش متعمله using

حطيت [[StringExtensions]] جوه [[namespace Shop.Text]] ومكتبتش [[using Shop.Text;]] في الأول:

~~~text الناتج: dotnet run
/w/x1a/app.cs(1,26): error CS1061: 'string' does not contain a definition for 'IsBlank' and no accessible extension method 'IsBlank' accepting a first argument of type 'string' could be found (are you missing a using directive or an assembly reference?)
~~~

الـ method مكتوبة، بس الـ compiler مبيدورش على extensions غير في الـ namespaces اللي عاملها [[using]]. والرسالة نفسها بتقولك «are you missing a using directive».

### [[ToTitle]] على string فاضي

~~~text الناتج: "".ToTitle()
Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.
   at System.String.get_Chars(Int32 index)
   at StringExtensions.<>c.<ToTitle>b__0_0(String w) in /w/x1b/app.cs:line 8
~~~

[[""]] لما يتقطع بيطلع كلمة واحدة فاضية، و [[w[0]]] على كلمة فاضية مفيهاش index صفر. ([[get_Chars]] هو الاسم الحقيقي للـ [[[ ]]] على string.) لو هتستخدمها بجد، افحص [[w.Length > 0]] الأول.

---

## ٣. صيغة C# 14: بلوك [[extension]]

~~~csharp app.cs
int[] nums = [4, 8, 15];
Console.WriteLine(nums.IsEmpty);
public static class SeqExtensions
{
    extension<T>(IEnumerable<T> source)
    {
        public bool IsEmpty => !source.Any();
    }
}
~~~

- [[int[] nums = [4, 8, 15];]]: array أرقام، و [[[ ... ]]] على اليمين اسمها collection expression.
- [[extension<T>(IEnumerable<T> source)]]: بلوك بيقول «كل اللي جوايا extensions على [[IEnumerable<T>]]، والـ object نفسه اسمه [[source]]». [[<T>]] يعني لأي نوع عناصر، و [[IEnumerable<T>]] أي حاجة تتلف عليها (array و List وغيرهم، درس IEnumerable).
- [[public bool IsEmpty => !source.Any();]]: **property** مش method، فبتتنادى من غير أقواس: [[nums.IsEmpty]]. و [[Any()]] بترجع true لو فيه عنصر واحد على الأقل، و [[!]] بتعكسها.

~~~text الناتج
False
~~~

وعلى array فاضية [[int[] empty = [];]] طلع [[True]].

الصيغة القديمة (بـ [[this]]) مكانتش بتسمح بـ properties خالص، methods بس. والبلوك ده محتاج C# 14، يعني .NET 10 SDK أو أحدث.

---

## ٤. الحل: [[Paginate]] بالصيغتين

~~~csharp app.cs
public static class PagingExtensions
{
    public static IEnumerable<T> Paginate<T>(this IEnumerable<T> items, int page, int size) =>
        items.Skip((page - 1) * size).Take(size);
}
~~~

- [[Paginate<T>]]: generic، تشتغل على أي نوع عناصر.
- [[(page - 1) * size]]: الصفحة ١ تبدأ من صفر، والصفحة ٣ بحجم ١٠ تبدأ بعد ٢٠ عنصر.
- [[Skip(n)]] سيب أول n، و [[Take(n)]] خد n بعدهم.

ونفس الفكرة بالبلوك الجديد (سميتها [[Page]] عشان الاسمين يعيشوا في نفس الملف):

~~~csharp app.cs
public static class PagingExtensions14
{
    extension<T>(IEnumerable<T> items)
    {
        public IEnumerable<T> Page(int page, int size) => items.Skip((page - 1) * size).Take(size);
    }
}
~~~

لاحظ إن [[Page]] مفيهاش [[static]] ولا [[this]]: البلوك هو اللي قال إنها extension.

~~~csharp app.cs
Console.WriteLine(string.Join(", ", Enumerable.Range(1, 25).Paginate(3, 10)));
Console.WriteLine(string.Join(", ", Enumerable.Range(1, 25).Page(1, 10)));
~~~

[[Enumerable.Range(1, 25)]] = الأرقام من 1، وعددهم 25 (يعني لحد 25).

~~~text الناتج
21, 22, 23, 24, 25
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
~~~

الصفحة التالتة فيها ٥ بس لأن المجموع ٢٥.

---

## الخلاصة

| الصيغة | بتتكتب إزاي | بتدعم |
|---|---|---|
| الكلاسيكية (كل النسخ) | [[static]] method في [[static class]] وأول parameter [[this T x]] | methods |
| C# 14 (.NET 10) | بلوك [[extension(T x) { ... }]] جوه [[static class]] | methods و properties |

- [[x.Method()]] بيتحول لـ [[Class.Method(x)]]: شكل بس، مفيش تعديل على النوع.
- لازم [[using]] للـ namespace بتاعها، غير كده CS1061.
- بتشتغل على null من غير ما تقع، فخلي بالك تفحص.
- [[w[1..]]] range زي [[slice(1)]]، و [[' ']] char مش string.`,
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
            mistakes: R`ترتيب غلط (العام قبل الخاص). وتتجاهل تحذير CS8509 فتاخد exception في الإنتاج. وتكتب [[x == null]] بدل [[x is null]]. وفي switch على tuple تنسى إن الترتيب مهم: [[(_, "EG")]] قبل [[(>= 200, "EG")]] يخلي الشحن المجاني مستحيل يتوصله. هنا الـ compiler بيمسكها بـ CS8510، بس لو الـ arm العام فيه [[when]] الـ compiler مبيقدرش يعرف، والغلطة بتعدّي.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

فيه دالتين كل واحدة **جدول قرارات** مكتوب بـ [[switch]] expression: [[Describe]] بتوصف أي قيمة حسب نوعها وشكلها، و [[Shipping]] بتحسب الشحن من حاجتين مع بعض (المبلغ والبلد). كل فرع في الجدول اسمه **arm**، وفيه pattern (الشكل اللي بندوّر عليه) وبعد [[=>]] القيمة اللي بترجع.

الناتج كله حقيقي من [[dotnet run app.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401).

---

## ١. الداتا: array فيها أنواع مختلفة

~~~csharp app.cs
object[] inputs = [42, -3, "hi", 3.5, new Order(1, 0m), new Order(2, 1500m)];
foreach (var x in inputs) Console.WriteLine(Describe(x));
~~~

- [[object]] أبو كل الأنواع في .NET، فـ [[object[]]] array تشيل أي حاجة: int و string و double و Order.
- [[0m]] و [[1500m]]: الـ [[m]] معناها [[decimal]] (النوع المناسب للفلوس، درس الأنواع). من غيرها [[1500]] بيبقى int.
- [[3.5]] من غير حرف بيبقى [[double]].
- [[foreach (var x in inputs)]]: لف على كل عنصر.

والـ record في آخر الملف:

~~~csharp app.cs
record Order(int Id, decimal Total);
~~~

سطر واحد بيعمل class فيها [[Id]] و [[Total]] (درس record).

---

## ٢. [[Describe]]: الـ switch expression

~~~csharp app.cs
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
~~~

### الشكل العام

- [[x switch { ... }]]: القيمة **قبل** كلمة [[switch]] (عكس JS)، وكل الـ switch expression نفسه **قيمة** بترجع، فبنكتب الدالة كلها [[=> x switch {...};]].
- كل arm: [[pattern => قيمة]]، والـ arms بيتفصلوا بـ [[,]].
- الـ arms بتتفحص **بالترتيب من فوق لتحت**، وأول واحد يطابق يكسب والباقي بيتسابوا.

### الـ patterns واحد واحد

| الـ arm | نوع الـ pattern | بيطابق إيه |
|---|---|---|
| [[null]] | constant | القيمة null |
| [[int n when n < 0]] | type + شرط [[when]] | int سالب، واسمه جوه الـ arm [[n]] |
| [[int n]] | type | أي int تاني |
| [[string { Length: 0 }]] | property | string الـ [[Length]] بتاعته 0 |
| [[string s]] | type | أي string تاني |
| [[Order { Total: > 1000 } o]] | property + relational | Order الـ [[Total]] بتاعه أكبر من 1000 |
| [[Order o]] | type | أي Order تاني |
| [[_]] | discard | أي حاجة (الـ default) |

حاجات محتاجة توضيح:

- [[int n]]: «لو x نوعه int، حطه في متغير اسمه [[n]] نوعه int». جوه الـ arm ده تقدر تستخدم [[n]] كرقم من غير cast. ده زي narrowing في TypeScript.
- [[{ Length: 0 }]]: بين الأقواس المعووجة اسم property ونقطتين والـ pattern بتاعها. ممكن تتداخل: [[{ Customer: { City: "Cairo" } }]].
- [[> 1000]] اسمه relational pattern: مقارنة جوه الـ pattern.
- [[x.GetType().Name]]: اسم النوع الحقيقي للقيمة وقت التشغيل.

~~~text الناتج
int 42
negative int -3
string of 2
something else: Double
order #1
big order #2
~~~

- [[-3]] وقفت عند [[int n when n < 0]] ومكملتش لـ [[int n]].
- [[3.5]] مفيش arm لـ double، فوقعت في [[_]]، و [[Double]] هو اسم النوع في .NET ([[double]] = [[System.Double]]).
- [[Order(1, 0m)]] الـ Total صفر، فمعدتش على [[> 1000]] ونزلت لـ [[Order o]].

### الترتيب غلط؟ الـ compiler بيرفض

بدّلت مكان [[int n]] و [[int n when n < 0]]:

~~~text الناتج: dotnet run
/w/x2a/app.cs(5,5): error CS8510: The pattern is unreachable. It has already been handled by a previous arm of the switch expression or it is impossible to match.
~~~

[[int n]] بيمسك كل الأرقام، فالـ arm اللي تحته مستحيل يتوصله. القاعدة: الخاص قبل العام.

### من غير [[_]]

عملت دالة فيها [[int n => ...]] بس وناديتها بـ [[5]] وبعدين [["x"]]:

~~~text الناتج: dotnet run
/w/x2b/app.cs(3,40): warning CS8509: The switch expression does not handle all possible values of its input type (it is not exhaustive). For example, the pattern '_' is not covered.
int 5
Unhandled exception. System.Runtime.CompilerServices.SwitchExpressionException: Non-exhaustive switch expression failed to match its input.
Unmatched value was x.
~~~

- ده **warning** مش error، فالبرنامج اتبنى واشتغل.
- [[5]] طابق عادي، و [["x"]] ملقاش arm فرمى [[SwitchExpressionException]] وقت التشغيل. عشان كده متتجاهلش CS8509.

---

## ٣. [[Shipping]]: switch على tuple

~~~csharp app.cs
static decimal Shipping(Order order, string country) => (order.Total, country) switch
{
    (>= 200, "EG") => 0m,
    (_, "EG") => 30m,
    (_, "SA" or "AE") => 120m,
    _ => 200m
};
~~~

- [[(order.Total, country)]] اسمها **tuple**: قيمتين محطوطين جنب بعض كقيمة واحدة. فبنعمل switch على الاتنين مرة واحدة.
- كل arm بقى بين قوسين بنفس الترتيب: الأول للـ Total، والتاني للبلد. اسمه positional pattern.
- [[(>= 200, "EG")]]: الـ Total أكبر من أو يساوي 200 **و** البلد [["EG"]].
- [[(_, "EG")]]: أي Total، والبلد مصر.
- [["SA" or "AE"]]: [[or]] pattern: السعودية أو الإمارات. وفيه كمان [[and]] و [[not]].
- [[_]] الأخير: أي tuple تاني.

~~~csharp app.cs
Console.WriteLine(Shipping(new Order(3, 250m), "EG"));
Console.WriteLine(Shipping(new Order(4, 250m), "SA"));
~~~

~~~text الناتج
0
120
~~~

[[250]] أكبر من 200 ومصر، فأول arm كسب. ولو حطيت [[(_, "EG")]] **قبله**، كل طلبات مصر هتقف عنده ويبقى الشحن ٣٠ دايمًا. هنا الـ compiler بيطلع CS8510 برضه لأن الـ arm التاني بقى مستحيل.

| المبلغ والبلد | الـ arm اللي كسب | الشحن |
|---|---|---|
| 250، EG | [[(>= 200, "EG")]] | 0 |
| 150، EG | [[(_, "EG")]] | 30 |
| أي مبلغ، SA أو AE | [[(_, "SA" or "AE")]] | 120 |
| أي حاجة تانية | [[_]] | 200 |

---

## ٤. الحل: [[CanCancel]] مع enum

~~~csharp app.cs
static bool CanCancel(OrderStatus s, DateTime paidAt) => s switch
{
    OrderStatus.Pending => true,
    OrderStatus.Paid when DateTime.UtcNow - paidAt < TimeSpan.FromHours(24) => true,
    OrderStatus.Paid or OrderStatus.Shipped or OrderStatus.Cancelled => false,
    _ => throw new ArgumentOutOfRangeException(nameof(s))
};
enum OrderStatus { Pending, Paid, Shipped, Cancelled }
~~~

- [[enum]]: قايمة أسامي ثابتة، وكل اسم وراه رقم (Pending = 0، Paid = 1، ...).
- [[DateTime.UtcNow - paidAt]]: طرح وقتين بيطلع [[TimeSpan]] (مدة)، وبنقارنها بـ [[TimeSpan.FromHours(24)]].
- [[_ => throw ...]]: الـ [[throw]] ينفع كقيمة في arm. و [[nameof(s)]] بيكتب اسم المتغير [["s"]] كنص، فلو غيرت الاسم بعدين الرسالة تتغير معاه.

~~~csharp app.cs
Console.WriteLine(CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-2)));
Console.WriteLine(CanCancel(OrderStatus.Paid, DateTime.UtcNow.AddHours(-30)));
Console.WriteLine(CanCancel(OrderStatus.Pending, DateTime.UtcNow));
Console.WriteLine(CanCancel(OrderStatus.Shipped, DateTime.UtcNow));
~~~

~~~text الناتج
True
False
True
False
~~~

[[Paid]] من ٣٠ ساعة: شرط الـ [[when]] طلع false، فنزل للـ arm اللي بعده ورجّع False.

### مسحت [[_]]

~~~text الناتج: dotnet run
/w/x2c/app.cs(5,60): warning CS8524: The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value. For example, the pattern '(OrderStatus)4' is not covered.
~~~

الأسامي الأربعة متغطية، بس الـ compiler بيقولك [[(OrderStatus)4]]: أي int ممكن يتحوّل لـ enum بـ cast حتى لو ملوش اسم. عشان كده [[_]] بيفضل لازم مع الـ enums.

---

## الخلاصة

- [[x switch { pattern => value, ... }]] قيمة، والـ arms بالترتيب، وأول واحد يطابق يكسب.
- الخاص قبل العام، وإلا CS8510 (error).
- ناقص حالات؟ CS8509 (أو CS8524 مع enum) warning، و [[SwitchExpressionException]] وقت التشغيل لو محدش طابق.
- الـ patterns: [[null]]، [[int n]] (نوع + متغير)، [[when]] (شرط)، [[{ Prop: ... }]] (property)، [[> 1000]] (relational)، [[or]]/[[and]]/[[not]]، [[(a, b)]] (tuple)، [[_]] (أي حاجة).
- نفس الـ patterns تشتغل مع [[is]]: [[if (x is Order { Total: > 1000 } big)]].`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

جزءين: الأول [[try]]/[[catch]]/[[finally]] بيمسك exception خاص بينا ([[NotFoundException]])، والتاني [[using]] بيقفل resource لوحده لما نخلص منه. الناتج كله حقيقي من [[dotnet run app.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401).

---

## ١. الـ classes اللي تحت الأول

### الـ exception بتاعنا

~~~csharp app.cs
public class NotFoundException(int id) : Exception($"order {id} not found")
{
    public int Id { get; } = id;
}
~~~

- [[(int id)]] بعد اسم الـ class اسمه primary constructor: الـ class بتاخد [[id]] وهي بتتعمل.
- [[: Exception(...)]]: [[:]] يعني «بتورث من». كل exception في .NET لازم يورث من [[System.Exception]] (مباشرة أو من ابن ليه).
- [[Exception($"order {id} not found")]]: بنبعت الرسالة لـ constructor الأب، وهي اللي بتطلع في [[ex.Message]].
- [[public int Id { get; } = id;]]: property للقراية بس ([[get]] من غير [[set]])، قيمتها الـ [[id]]. كده اللي هيمسك الـ exception يعرف أنهي order.

### الـ resource

~~~csharp app.cs
public class Resource(string name) : IDisposable
{
    public void Dispose() => Console.WriteLine($"disposed {name}");
}
~~~

- [[IDisposable]] interface فيها method واحدة: [[Dispose()]]، ومعناها «اقفلني ونضّف ورايا». الملفات والـ connections والـ HTTP responses كلهم بيطبقوها.
- هنا [[Dispose]] بتطبع بس عشان نشوف إمتى اتنادت.

### الدالة اللي بترمي

~~~csharp app.cs
static string Load(int id) => throw new NotFoundException(id);
~~~

[[throw new ...]]: اعمل exception وارميه. الدالة مش هترجع string أبدًا، بس الـ compiler قابل لأن [[throw]] ينفع مكان أي قيمة.

---

## ٢. الـ try وأول catch

~~~csharp app.cs
try
{
    var order = Load(7);
}
catch (NotFoundException ex) when (ex.Id > 5)
{
    Console.WriteLine($"not found: {ex.Message}");
}
~~~

- [[try { }]]: جرّب الكود ده، ولو رمى exception دوّر على catch يناسبه.
- [[catch (NotFoundException ex)]]: امسك الـ exceptions من النوع ده (أو أي نوع بيورث منه) بس، وسمّيه [[ex]]. ده الفرق عن JS: هناك catch واحد بيمسك كل حاجة وانت تفحص بإيدك.
- [[when (ex.Id > 5)]]: شرط زيادة اسمه **exception filter**. الـ catch يمسك بس لو الشرط true.

[[Load(7)]] رمت، والنوع مطابق، و 7 أكبر من 5:

~~~text الناتج
not found: order 7 not found
~~~

---

## ٣. التاني: [[catch (Exception)]] و [[throw;]]

~~~csharp app.cs
catch (Exception ex)
{
    Console.WriteLine($"unexpected: {ex.GetType().Name}");
    throw;
}
~~~

- [[Exception]] أبو الكل، فده بيمسك أي حاجة الـ catch اللي قبله مسكهاش.
- الـ catches بتتفحص **بالترتيب**. لو حطيت [[catch (Exception)]] الأول، اللي بعده مستحيل يتوصله والـ compiler بيرفض. جرّبت:

~~~text الناتج: dotnet run
/w/x3c/app.cs(3,8): error CS0160: A previous catch clause already catches all exceptions of this or of a super type ('Exception')
~~~

- [[ex.GetType().Name]]: اسم النوع الحقيقي للـ exception.
- [[throw;]] لوحدها: «ارمي نفس الـ exception تاني لفوق». يعني سجلنا إن فيه حاجة غريبة، ومش هنبلعها.

---

## ٤. [[finally]]

~~~csharp app.cs
finally
{
    Console.WriteLine("finally runs always");
}
~~~

بيتنفذ في كل الحالات: الـ try خلص عادي، أو exception اتمسك، أو exception عدّى لفوق، أو حتى [[return]] جوه الـ try.

~~~text الناتج
finally runs always
~~~

---

## ٥. [[using]] بالشكلين

~~~csharp app.cs
using (var res = new Resource("file"))
{
    Console.WriteLine("using the resource");
}
using var conn = new Resource("conn");
Console.WriteLine("end of program");
~~~

### [[using (...) { }]]: بلوك

- اعمل الـ resource، ونفّذ البلوك، و**أول ما البلوك يخلص** نادي [[Dispose()]]، حتى لو حصل exception جواه.
- هو اختصار لـ try/finally فيه [[res.Dispose()]] في الـ finally.

### [[using var]]: من غير بلوك

- نفس الفكرة، بس الـ [[Dispose]] بيتنادى في آخر الـ scope اللي المتغير فيه. هنا الـ scope هو الملف كله، يعني آخر البرنامج.
- لو فيه كذا [[using var]]، بيتقفلوا بالعكس: الأخير الأول.

~~~text الناتج
using the resource
disposed file
end of program
disposed conn
~~~

[[disposed conn]] جت **بعد** [[end of program]]، لأن الـ scope خلص بعد آخر سطر.

### الناتج كله مرة واحدة

~~~text الناتج
not found: order 7 not found
finally runs always
using the resource
disposed file
end of program
disposed conn
~~~

---

## ٦. التجربة: [[Load(3)]]

[[3 > 5]] false، فالـ filter بيقول «مش أنا»، والـ catch الأول كأنه مش موجود. التاني ([[Exception]]) بيمسك ويطبع، و [[throw;]] بترمي تاني، ومفيش حد فوق، فالبرنامج بيقع:

~~~text الناتج
unexpected: NotFoundException
Unhandled exception. NotFoundException: order 3 not found
   at Program.<<Main>$>g__Load|0_0(Int32 id) in /w/x3a/app.cs:line 24
   at Program.<Main>$(String[] args) in /w/x3a/app.cs:line 3
finally runs always
~~~

### نقرا الـ stack trace

- [[Unhandled exception.]]: محدش مسكه، فالبرنامج اتقفل (الـ exit code كان 134، يعني اتقفل بإشارة abort مش خروج عادي).
- كل سطر [[at ...]] دالة كانت شغالة، **من اللي رمت لبرة**. أول سطر هو المهم: [[Load]] في [[line 24]].
- [[<Main>$]] اسم الدالة اللي الـ compiler عملها للكود اللي فوق في الملف (top-level statements)، و [[g__Load|0_0]] اسم [[Load]] بعد ما الـ compiler عمل منها local function.
- [[finally runs always]] اتطبعت **بعد** رسالة الوقوع: الـ runtime بيطبع الـ exception الأول، وبعدين بيفك الـ stack وينفذ الـ finally.

### نفس الكلام مع [[throw ex;]]

~~~text الناتج
/w/x3b/app.cs(12,5): warning CA2200: Re-throwing caught exception changes stack information (https://learn.microsoft.com/dotnet/fundamentals/code-analysis/quality-rules/ca2200)
unexpected: NotFoundException
Unhandled exception. NotFoundException: order 3 not found
   at Program.<Main>$(String[] args) in /w/x3b/app.cs:line 12
finally runs always
~~~

- الـ SDK نفسه حذّرك (CA2200 = قاعدة code analysis): «الرمي تاني بيغيّر معلومات الـ stack».
- الـ trace بقى سطر واحد: [[line 12]]، اللي هو سطر [[throw ex;]] نفسه. [[Load]] (المكان الحقيقي للخطأ) اختفت. في مشروع فيه ١٠ طبقات، ده معناه إنك مش هتعرف الخطأ جه منين.

| | [[throw;]] | [[throw ex;]] |
|---|---|---|
| أول سطر في الـ trace | المكان اللي رمى فعلًا ([[Load]]، line 24) | سطر الـ catch (line 12) |
| تحذير | لأ | CA2200 |
| تستخدمه؟ | أيوه | لأ |

---

## الخلاصة

- [[catch (Type ex)]] بيمسك النوع ده وأولاده، والـ catches بالترتيب من الخاص للعام (وإلا CS0160).
- [[when (...)]] شرط على الـ catch، ولو false كأن الـ catch مش موجود.
- [[throw;]] بتحافظ على الـ stack trace، و [[throw ex;]] بتمسحه.
- [[finally]] بيتنفذ دايمًا (إلا لو البروسيس اتقتل).
- [[using]] = try/finally بينادي [[Dispose()]]: بالبلوك في آخر البلوك، و [[using var]] في آخر الـ scope وبالترتيب العكسي.
- exception خاص = class بتورث [[Exception]] وتبعت الرسالة للأب.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

فيه دالتين بيمثلوا نداءات بطيئة (زي داتابيز أو API): واحدة بتاخد ٣٠٠ ملي ثانية والتانية ٥٠٠. بنناديهم مرة **ورا بعض** ومرة **مع بعض**، ونقيس الوقت في الحالتين. الناتج كله حقيقي من [[dotnet run app.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401).

---

## ١. الدوال الـ async (آخر الملف)

~~~csharp app.cs
static async Task<string> GetUserAsync(int id)
{
    await Task.Delay(300);
    return $"user{id}";
}
static async Task<int[]> GetOrdersAsync(int userId)
{
    await Task.Delay(500);
    return [1, 2, 3];
}
~~~

### [[async Task<string>]]

- [[Task<string>]]: «وعد بـ string هييجي بعدين». ده [[Promise<string>]] بتاع JS بالظبط.
- [[async]]: بتسمحلك تكتب [[await]] جوه الدالة. وزي JS، بتكتب [[return "..."]] عادي والـ compiler بيلف القيمة في Task لوحده.
- [[Async]] في آخر الاسم عُرف (convention) مش إجباري: أي دالة بترجع Task اسمها بيخلص بـ Async.

### [[await Task.Delay(300)]]

- [[Task.Delay(300)]]: Task بتخلص بعد ٣٠٠ ملي ثانية. زي [[new Promise(r => setTimeout(r, 300))]].
- [[await]]: استنى الـ Task تخلص **من غير ما توقف الـ thread**. الـ thread بيرجع يخدم حاجة تانية، ولما الوقت يخلص الدالة بتكمل.

### [[return [1, 2, 3];]]

[[[1, 2, 3]]] اسمها collection expression، وبتبقى [[int[]]] لأن ده نوع الرجوع.

---

## ٢. ورا بعض

~~~csharp app.cs
using System.Diagnostics;
var sw = Stopwatch.StartNew();
var user = await GetUserAsync(1);
var orders = await GetOrdersAsync(1);
Console.WriteLine($"sequential: {sw.ElapsedMilliseconds}ms");
~~~

- [[using System.Diagnostics;]]: فيه [[Stopwatch]]. (هنا [[using]] معناها «استورد namespace»، مش [[using]] بتاعة Dispose.)
- [[Stopwatch.StartNew()]]: ساعة إيقاف بتبدأ تعد دلوقتي، و [[ElapsedMilliseconds]] الوقت اللي عدى بالملي ثانية.
- [[await]] على الأولى: **مش** هنبدأ التانية غير لما الأولى تخلص. فالوقت = ٣٠٠ + ٥٠٠.

~~~text الناتج
sequential: 806ms
~~~

ليه ٨٠٦ مش ٨٠٠ بالظبط؟ [[Task.Delay]] بيضمن «على الأقل» الوقت ده، والـ timer بتاع النظام بيزوّد كام ملي ثانية. شغلتها تاني طلعت [[807ms]].

---

## ٣. مع بعض: [[Task.WhenAll]]

~~~csharp app.cs
sw.Restart();
var userTask = GetUserAsync(1);
var ordersTask = GetOrdersAsync(1);
await Task.WhenAll(userTask, ordersTask);
Console.WriteLine($"parallel: {sw.ElapsedMilliseconds}ms -> {userTask.Result}, {ordersTask.Result.Length} orders");
~~~

- [[sw.Restart()]]: صفّر الساعة وابدأ تاني.
- [[GetUserAsync(1)]] **من غير** [[await]]: الدالة بتبدأ شغل وبترجع الـ Task فورًا. فالسطرين دول بيبدأوا العمليتين مع بعض في نفس اللحظة تقريبًا.
- [[await Task.WhenAll(...)]]: استنى لحد ما **كلهم** يخلصوا. ده [[Promise.all]].
- [[userTask.Result]]: القيمة اللي جوه الـ Task. آمنة هنا لأن الـ Task خلصت خلاص (تحت ليه بنخاف منها في غير كده).
- [[.Length]] عدد عناصر الـ array.

~~~text الناتج
parallel: 499ms -> user1, 3 orders
~~~

الوقت = **الأطول** بس (٥٠٠)، مش المجموع، لأن الانتظارين حصلوا في نفس الوقت.

| الطريقة | الكود | الوقت |
|---|---|---|
| ورا بعض | [[await A; await B;]] | ٣٠٠ + ٥٠٠ = حوالي ٨٠٦ |
| مع بعض | [[var a = A; var b = B; await Task.WhenAll(a, b);]] | الأطول = حوالي ٤٩٩ |

### الـ Task دي شكلها إيه وهي لسه شغالة؟

جرّبت أطبع نوع وحالة الـ Task قبل الـ await وبعده:

~~~csharp app.cs
var t = GetUserAsync(1);
Console.WriteLine(t.GetType().Name + " " + t.Status);
Console.WriteLine(await t);
Console.WriteLine(t.Status);
~~~

~~~text الناتج
AsyncStateMachineBox$__bt1 WaitingForActivation
user1
RanToCompletion
~~~

- [[AsyncStateMachineBox]]: الـ compiler حوّل الدالة الـ async لـ **state machine** (آلة حالات): بتشتغل لحد أول [[await]]، وتحفظ مكانها، وتكمل من نفس المكان بعدين.
- [[Status]] كانت [[WaitingForActivation]] (لسه شغالة)، وبعد الـ await بقت [[RanToCompletion]] (خلصت بنجاح). ولو رمت exception بتبقى [[Faulted]].

### ليه [[.Result]] خطر قبل ما الـ Task تخلص؟

لو الـ Task لسه مخلصتش، [[.Result]] (و [[.Wait()]]) بيوقفوا الـ thread لحد ما تخلص (blocking)، وده عكس فكرة async كلها، وفي بعض البيئات بيعمل deadlock (درس async deadlock في أسئلة الانترفيو). القاعدة: [[await]]، و [[.Result]] بس بعد [[WhenAll]].

---

## ٤. الحل: [[WhenAny]] والـ exception المنسي

### أول واحدة تخلص

~~~csharp app.cs
int[] delays = [400, 100, 300, 500, 200];
var tasks = delays.Select(async d => { await Task.Delay(d); return d; }).ToList();
var first = await Task.WhenAny(tasks);
Console.WriteLine($"first done after {sw.ElapsedMilliseconds}ms: delay {await first}");
~~~

- [[delays.Select(async d => ...)]]: لكل رقم اعمل lambda async بتستنى المدة دي وترجع الرقم. والـ lambda الـ async بترجع Task، فالناتج list من ٥ Tasks.
- [[.ToList()]] مهمة: [[Select]] كسول (lazy) ومش بينفذ غير لما حد يلف عليه. [[ToList]] بيلف فعلًا، فالـ ٥ Tasks بيبدأوا دلوقتي.
- [[Task.WhenAny(tasks)]]: استنى **أول واحدة** تخلص. ده [[Promise.race]]. بيرجع الـ Task اللي خلصت نفسها مش قيمتها، فعشان كده [[await first]] تاني جوه الـ string.

~~~text الناتج
first done after 111ms: delay 100
~~~

الباقيين لسه شغالين في الخلفية. عشان توقفهم محتاج CancellationToken (الدرس الجاي).

### exception من غير await

~~~csharp app.cs
_ = FailAsync();
Console.WriteLine("still running");
try { await FailAsync(); }
catch (InvalidOperationException ex) { Console.WriteLine($"caught: {ex.Message}"); }
static async Task<int> FailAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("boom");
}
~~~

- [[_ = FailAsync();]]: نادي ومتستناش، و [[_ =]] (discard) معناها «أنا عارف إني مش عايز النتيجة».
- الـ exception اتخزن **جوه الـ Task**، ومحدش عمل await، فمحدش شافه والبرنامج كمّل.
- [[await FailAsync()]] جوه try: الـ exception بيترمي في سطر الـ await بالظبط، فالـ catch بيمسكه.

~~~text الناتج
still running
caught: boom
~~~

ولو كتبت [[FailAsync();]] من غير [[_ =]] ومن غير await، الـ compiler بيحذرك:

~~~text الناتج: dotnet run
/w/x4a/app.cs(1,1): warning CS4014: Because this call is not awaited, execution of the current method continues before the call is completed. Consider applying the 'await' operator to the result of the call.
~~~

---

## الخلاصة

| C# | JS |
|---|---|
| [[Task<T>]] | [[Promise<T>]] |
| [[Task]] | [[Promise<void>]] |
| [[async]] / [[await]] | نفس الكلام |
| [[Task.WhenAll]] | [[Promise.all]] |
| [[Task.WhenAny]] | [[Promise.race]] |
| [[Task.Delay(ms)]] | [[setTimeout]] في Promise |

- عايز عمليتين مستقلين أسرع؟ ابدأهم الاتنين الأول، وبعدين [[await Task.WhenAll]].
- الـ exception جوه async method بيترمي وقت الـ [[await]] مش وقت النداء. Task من غير await = exception ضايع (و CS4014).
- [[.Result]] و [[.Wait()]] بيوقفوا الـ thread، فمتستخدمهمش غير على Task خلصت.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

فيه «تقرير» بطيء من ١٠ خطوات، كل خطوة ١٠٠ ملي ثانية (يعني ثانية كاملة). بنديله **مهلة** ٢٥٠ ملي ثانية بس، ولما المهلة تخلص بيقف في النص بدل ما يكمل على الفاضي. الناتج كله حقيقي من [[dotnet run app.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401).

---

## ١. الطرفين: الـ source والـ token

الإلغاء في .NET ليه حاجتين:

| الحاجة | مين معاه | بيعمل إيه |
|---|---|---|
| [[CancellationTokenSource]] | اللي عايز يلغي | بيعمل الـ token، وبيلغيه ([[Cancel()]] أو بعد وقت) |
| [[CancellationToken]] | الشغل نفسه | بيسأل «اتلغيت؟» بس، ميقدرش يلغي |

ده زي [[AbortController]] (الـ source) و [[signal]] (الـ token) في JS.

---

## ٢. الـ source بمهلة

~~~csharp app.cs
using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(250));
~~~

- [[cts]] اختصار CancellationTokenSource، اسم متعارف عليه.
- [[TimeSpan.FromMilliseconds(250)]]: مدة ٢٥٠ ملي ثانية. لما تبعتها للـ constructor، الـ source بيلغي نفسه لوحده بعدها (timeout).
- [[using var]]: الـ source جواه timer، فلازم يتقفل ([[Dispose]]) لما نخلص (درس exceptions و using).

---

## ٣. الشغل البطيء

~~~csharp app.cs
static async Task SlowReportAsync(CancellationToken ct)
{
    for (var i = 1; i <= 10; i++)
    {
        ct.ThrowIfCancellationRequested();
        Console.WriteLine($"step {i}");
        await Task.Delay(100, ct);
    }
}
~~~

- [[CancellationToken ct]]: الـ token بيتبعت كـ parameter، والعُرف إنه **آخر** parameter واسمه [[ct]] أو [[cancellationToken]].
- [[ct.ThrowIfCancellationRequested()]]: «لو اتلغيت، ارمي [[OperationCanceledException]] دلوقتي». بنعملها قبل كل خطوة.
- [[Task.Delay(100, ct)]]: بنبعت الـ token لـ [[Delay]] كمان، فلو الإلغاء حصل **في نص** الانتظار، الانتظار بيقف فورًا من غير ما يكمل الـ ١٠٠.

### الإلغاء تعاوني

الـ token مجرد علم (flag). محدش بيوقف الكود بالعافية: الكود نفسه لازم يفحص، أو يبعت الـ token لـ API بيفحص (زي [[Task.Delay]] و [[HttpClient]] و EF Core). لو method خدت الـ token ومبعتتهوش لحد، الإلغاء مش هيوصل.

---

## ٤. النداء والـ catch

~~~csharp app.cs
try
{
    await SlowReportAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("cancelled after 250ms");
}
~~~

- [[cts.Token]]: الـ token اللي الـ source عمله.
- [[catch (OperationCanceledException)]]: من غير اسم متغير لأننا مش محتاجينه. الإلغاء في .NET بيطلع كـ exception من النوع ده.

~~~text الناتج
step 1
step 2
step 3
cancelled after 250ms
~~~

### بالتوقيت

| الوقت تقريبًا | اللي حصل |
|---|---|
| 0 | فحص: تمام، [[step 1]]، Delay لحد 100 |
| 100 | فحص: تمام، [[step 2]]، Delay لحد 200 |
| 200 | فحص: تمام، [[step 3]]، Delay لحد 300 |
| 250 | المهلة خلصت والـ Delay اتقطع في نصه |

### نوع الـ exception بالظبط

غيرت الـ catch لـ [[catch (OperationCanceledException ex)]] وطبعت [[ex.GetType().Name]]:

~~~text الناتج
cancelled after 250ms: TaskCanceledException
~~~

اللي اترمى فعلًا [[TaskCanceledException]] (من [[Task.Delay]])، وده **ابن** [[OperationCanceledException]]، فالـ catch مسكه. عشان كده بنمسك الأب: يغطي الاتنين، سواء الإلغاء جه من [[ThrowIfCancellationRequested]] أو من الـ Delay.

---

## ٥. الحل: إلغاء يدوي و Ctrl+C

~~~csharp app.cs
using var cts = new CancellationTokenSource();
cts.CancelAfter(350);
~~~

- source من غير مهلة، و [[CancelAfter(350)]] بيبدأ العداد بعدين. مفيد لما المهلة تتحدد بعد ما الـ source يتعمل.

~~~csharp app.cs
using var ctrlC = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) => { e.Cancel = true; ctrlC.Cancel(); };
~~~

- source تاني هنلغيه بإيدنا.
- [[Console.CancelKeyPress]]: event (درس Func و Action) بيحصل لما تدوس Ctrl+C. بنشترك فيه بـ [[+=]].
- [[e.Cancel = true]]: «متقفلش البرنامج». من غيرها البرنامج بيتقفل فورًا ومش هنلحق نطبع.
- [[ctrlC.Cancel()]]: الغي الـ token بتاعه دلوقتي.

~~~csharp app.cs
using var linked = CancellationTokenSource.CreateLinkedTokenSource(cts.Token, ctrlC.Token);
~~~

[[CreateLinkedTokenSource]]: token تالت بيتلغي لو **أي واحد** من الاتنين اتلغى. ده نفس اللي هتعمله في API: token الـ request مربوط بمهلة بتاعتك.

~~~csharp app.cs
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
}
~~~

- [[done]] برّه الـ try: لو كان جوه الـ for، الـ catch ميقدرش يشوفه.
- [[done++]] **بعد** الـ Delay: الخطوة متتحسبش غير لو انتظارها خلص.

~~~text الناتج
step 1
step 2
step 3
step 4
cancelled, finished 3 steps
~~~

[[step 4]] اتطبعت (الساعة ٣٠٠)، بس الـ Delay بتاعها اتقطع عند ٣٥٠ قبل [[done++]]، فالعدد ٣.

### Ctrl+C بجد

خليت المهلة ٥٠٠٠ عشان Ctrl+C يسبقها، وبعت للبرنامج إشارة [[SIGINT]] (هي نفسها اللي Ctrl+C بيبعتها على لينكس) بعد حوالي نص ثانية بـ [[timeout -s INT 0.6]]:

~~~text الناتج
step 1
step 2
step 3
step 4
step 5
step 6
cancelled, finished 5 steps
~~~

عدد الخطوات بيختلف حسب البرنامج قام في قد إيه، بس المهم إن البرنامج **مقفلش فجأة**: الـ handler لغى الـ token، والـ loop وقفت، والـ catch طبع.

---

## الخلاصة

- [[CancellationTokenSource]] بيلغي، و [[CancellationToken]] بيتسأل بس.
- مهلة: [[new CancellationTokenSource(TimeSpan)]] أو [[CancelAfter(ms)]].
- الشغل لازم يفحص ([[ThrowIfCancellationRequested]]) أو يبعت الـ token لتحت ([[Task.Delay(ms, ct)]]).
- الإلغاء = [[OperationCanceledException]] (أو ابنه [[TaskCanceledException]])، فامسك الأب.
- [[CreateLinkedTokenSource(a, b)]]: يتلغي لو أي واحد اتلغى.
- الـ token آخر parameter، وفي ASP.NET Core كل request ليه واحد جاهز.`,
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
          teach: R`## الكود ده بيعمل إيه؟

endpoint بيعمل منتج جديد ([[POST /api/products]])، والـ request بيتفحص على مرحلتين: (١) قواعد بسيطة مكتوبة كـ attributes على الـ DTO، بتتفحص **قبل** ما الـ handler يشتغل، و (٢) قاعدة محتاجة الداتابيز («الـ category موجودة؟») جوه الـ handler. والاتنين بيرجعوا 400 بنفس الشكل.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401، .NET 10) في نفس مشروع الدرسين اللي فاتوا، مع PostgreSQL 16 فيها category رقم 1 اسمها Pens، والـ [[Name]] عليه unique index. والـ requests بـ [[curl]] من Git Bash على 5925.

---

## ١. الـ DTO بالـ attributes

~~~csharp Extra.cs
public record CreateProduct(
    [Required, StringLength(200, MinimumLength = 2)] string Name,
    [Range(0.01, 100000)] decimal Price,
    [Range(0, int.MaxValue)] int Stock,
    int CategoryId);
~~~

- positional record (درس record): كل parameter بيبقى property. والـ attributes بتتكتب **قبل الـ parameter** جوه الأقواس.
- الـ attributes دي من namespace [[System.ComponentModel.DataAnnotations]]، فالملف محتاج [[using System.ComponentModel.DataAnnotations;]] فوقه.
- [[[Required, StringLength(...)]]]: كذا attribute في نفس الأقواس بفاصلة.

| الـ attribute | القاعدة |
|---|---|
| [[[Required]]] | لازم موجود ومش null |
| [[[StringLength(200, MinimumLength = 2)]]] | الطول من 2 لـ 200. [[MinimumLength = 2]] اسمها named property في الـ attribute |
| [[[Range(0.01, 100000)]]] | من 0.01 لـ 100000 |
| [[[Range(0, int.MaxValue)]]] | مش سالب. [[int.MaxValue]] أكبر int = 2147483647 |
| مفيش | [[CategoryId]] أي int، وهنفحصه بالداتابيز |

ده نفس فكرة Zod schema، بس القواعد ملزوقة في الـ type نفسه.

---

## ٢. [[AddValidation()]]

~~~csharp Program.cs
builder.Services.AddValidation();
~~~

من .NET 10: source generator بيلاقي الأنواع اللي بتستخدمها كـ parameters في الـ minimal endpoints، وبيولّد كود فحص ليها، وبيحط filter قبل كل handler. لو الفحص فشل الـ handler مش بيشتغل أصلًا.

**من غيره؟** علّقت السطر ده وبعت نفس الـ request الغلط اللي تحت:

~~~text الناتج
HTTP/1.1 201 Created
Location: /api/products/4

{"id":4,"name":"x","price":0,"category":"Pens"}
~~~

منتج اسمه حرف واحد وسعره صفر اتحفظ في الداتابيز. الـ attributes لوحدها مجرد كلام مكتوب، محدش بيقراها.

---

## ٣. الـ endpoint

~~~csharp Extra.cs
g.MapPost("/", async Task<Results<Created<ProductDto>, ValidationProblem>> (CreateProduct body, ShopDb db) =>
{
~~~

- [[g]] الـ group بتاع [[/api/products]] (درس MapGroup)، فده [[POST /api/products]].
- نوع الرجوع: [[Created<ProductDto>]] (201) أو [[ValidationProblem]] (400 بشكل الأخطاء)، وبس.
- [[CreateProduct body]]: نوع معقد فبيتقري من الـ JSON body، و [[ShopDb db]] من الـ DI.

### فحص محتاج داتابيز

~~~csharp Extra.cs
var category = await db.Categories.FindAsync(body.CategoryId);
if (category is null)
    return TypedResults.ValidationProblem(new Dictionary<string, string[]>
    {
        ["categoryId"] = [$"Category {body.CategoryId} does not exist."]
    });
~~~

- [[FindAsync(id)]]: هات الصف بالـ primary key، أو null.
- [[Dictionary<string, string[]>]]: قاموس المفتاح فيه اسم الحقل، والقيمة array رسايل (الحقل الواحد ممكن يبقى فيه كذا غلطة).
- [[["categoryId"] = [...]]]: صيغة تملى بيها القاموس وانت بتعمله. الـ [[[ ]]] الأولى المفتاح، والتانية collection expression فيها رسالة واحدة.
- [[TypedResults.ValidationProblem(...)]]: 400 بنفس شكل أخطاء الـ attributes بالظبط، فالـ frontend يتعامل مع نوع واحد.

### الحفظ

~~~csharp Extra.cs
var product = new Product { Name = body.Name, Price = body.Price, Stock = body.Stock, CategoryId = category.Id };
db.Products.Add(product);
await db.SaveChangesAsync();
return TypedResults.Created($"/api/products/{product.Id}", new ProductDto(product.Id, product.Name, product.Price, category.Name));
~~~

- [[new Product { ... }]]: object initializer: اعمل object واملى الـ properties.
- [[db.Products.Add(product)]]: EF يعرف إن ده صف جديد، ولسه مفيش حاجة اتبعتت.
- [[SaveChangesAsync()]]: هنا بس الـ [[INSERT]] بيتنفذ، والداتابيز بترجع الـ [[Id]] الجديد وEF بيحطه في [[product.Id]].
- [[TypedResults.Created(url, body)]]: 201 و [[Location]] بالـ URL.

---

## ٤. التجارب

### ٣ أخطاء مرة واحدة

~~~bash
curl -si -H "Content-Type: application/json" -d '{"name":"x","price":0,"stock":-1,"categoryId":1}' localhost:5925/api/products
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"Name":["The field Name must be a string with a minimum length of 2 and a maximum length of 200."],"Price":["The field Price must be between 0.01 and 100000."],"Stock":["The field Stock must be between 0 and 2147483647."]},"traceId":"00-9f3cd6a765c6e1ebf92d78ef53f41c48-606b75a4f285104d-00"}
~~~

- [[errors]]: كل حقل غلط ورسايله. الـ attributes كلها اتفحصت، مش أول غلطة بس.
- أسماء الحقول [[Name]] و [[Price]] بنفس casing الـ property، مش camelCase.
- الـ category مش اتفحصت: الـ handler مشتغلش أصلًا.

### من غير [[name]] خالص

~~~text الناتج
{"type":"...","title":"One or more validation errors occurred.","status":400,"errors":{"Name":["The Name field is required."]},...}
~~~

الـ [[string Name]] اتربط بـ null، و [[[Required]]] مسكه.

### category مش موجودة

~~~text الناتج: categoryId 42
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"categoryId":["Category 42 does not exist."]},"traceId":"..."}
~~~

نفس الشكل، بس جاي من جوه الـ handler.

### صح

~~~text الناتج: {"name":"Green pen","price":7,"stock":5,"categoryId":1}
HTTP/1.1 201 Created
Location: /api/products/4

{"id":4,"name":"Green pen","price":7,"category":"Pens"}
~~~

---

## ٥. الحل

### [[[NoProfanity]]]

~~~csharp Extra.cs
public class NoProfanityAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext ctx) =>
        value is string s && s.Contains("badword", StringComparison.OrdinalIgnoreCase)
            ? new ValidationResult("Name contains blocked words.")
            : ValidationResult.Success;
}
~~~

- [[: ValidationAttribute]]: الأب بتاع كل الـ attributes اللي فوق.
- اسم الـ class بيخلص بـ [[Attribute]]، وبتستخدمها من غيره: [[[NoProfanity]]].
- [[override IsValid]]: الـ method اللي الـ validator بيناديها. بترجع [[ValidationResult]] فيه الرسالة لو غلط، أو [[ValidationResult.Success]] (اللي هي null) لو تمام.
- [[value is string s]]: pattern (درس switch expression). و [[StringComparison.OrdinalIgnoreCase]]: قارن من غير ما يفرق كابيتال وسمول.

حطيتها جنب التانيين [[[Required, StringLength(200, MinimumLength = 2), NoProfanity]]] وبعت [["my BadWord pen"]]:

~~~text الناتج
HTTP/1.1 400 Bad Request

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"Name":["Name contains blocked words."]},"traceId":"..."}
~~~

### نفس المنتج مرتين

الـ [[Name]] عليه unique index في الداتابيز ([[IX_Products_Name]])، والـ validation مبتعرفش ده. التانية:

~~~text الناتج: Production مع app.UseExceptionHandler()
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.6.1","title":"An error occurred while processing your request.","status":500,"traceId":"00-b301d510762f2b064af7d5751e46952c-00bfe44672e8fab0-00"}
~~~

وفي لوج السيرفر السبب الحقيقي:

~~~text الناتج
Microsoft.EntityFrameworkCore.DbUpdateException: An error occurred while saving the entity changes. See the inner exception for details.
 ---> Npgsql.PostgresException (0x80004005): 23505: duplicate key value violates unique constraint "IX_Products_Name"
~~~

- [[DbUpdateException]] من EF، وجواه ([[--->]] = inner exception) [[PostgresException]] بكود [[23505]] (unique violation في PostgreSQL).
- في Development الرد نفسه كان فيه [["title":"Microsoft.EntityFrameworkCore.DbUpdateException"]] والـ stack trace كامل. مفيد وانت بتطوّر، وخطر لو اتسرب للإنتاج.
- 500 غلط هنا: ده مش خطأ في السيرفر، ده تعارض (409). الدرس الجاي بيحوّله.

---

## الخلاصة

| المرحلة | فين | بيرجع |
|---|---|---|
| قواعد بسيطة (مطلوب، طول، مدى) | attributes + [[AddValidation()]] | 400 قبل الـ handler، كل الأخطاء مرة واحدة |
| قواعد محتاجة داتابيز | جوه الـ handler | [[TypedResults.ValidationProblem]] بنفس الشكل |
| unique و foreign key | الداتابيز نفسها | exception لازم يتحوّل (الدرس الجاي) |

- من غير [[AddValidation()]] في minimal API، الـ attributes مبتعملش أي حاجة.
- attribute خاص = class بتورث [[ValidationAttribute]] وتعمل override لـ [[IsValid]].
- الـ controllers بـ [[[ApiController]]] بيعملوا نفس الفحص من غير [[AddValidation]].`,
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

المنتج مرتين: التانية بترجع 500 [["title":"An error occurred while processing your request."]] (ده في Production مع [[app.UseExceptionHandler()]]؛ في Development الـ title بيبقى اسم الـ exception نفسه ومعاه الـ stack trace كامل) لأن [[IX_Products_Name]] unique والداتابيز رفضت ([[DbUpdateException]] جواها [[PostgresException 23505]]). ده مكانه الدرس الجاي: تحوّله لـ 409 Conflict.`
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
            how: R`[[UseExceptionHandler()]] middleware بيلف الـ pipeline كله في try/catch. لما exception يحصل، بيمسح الـ response، ويجرب الـ [[IExceptionHandler]]s بالترتيب: أول واحد يرجع true خلاص. لو محدش مسكه، [[IProblemDetailsService]] بيكتب 500 عام، والـ exception الكامل بيتسجل في اللوج ([[fail: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]]]). أما الـ exception اللي handler بتاعك رجّع له true، فمن .NET 10 الـ middleware مبيسجلوش افتراضيًا (جرّبناها: الـ 409 بتاع OutOfStock مطلعش في اللوج)، فلو عايزه سجّله انت جوه الـ handler.

[[UseStatusCodePages()]] بيملى الـ responses الفاضية اللي status بتاعها 400-599 (زي 404 من الـ routing و 401 من الـ auth) بـ ProblemDetails. و [[TypedResults.NotFound()]] من غير body بيتملى برضه.

في Development لو مفيش [[UseExceptionHandler]]، الـ Developer Exception Page بيشتغل تلقائي وبيطلع الـ stack trace، مفيد وانت بتطور بس لازم ميبقاش في Production.

تقدر تعدّل كل الـ ProblemDetails من مكان واحد: [[AddProblemDetails(o => o.CustomizeProblemDetails = ctx => ctx.ProblemDetails.Extensions["requestId"] = ...)]]. والـ [[traceId]] بيربط الرد باللوج: المستخدم يبعتلك الـ id وانت تدوّر بيه.`,
            when: R`دايمًا في أي API. exceptions مخصصة لحالات الـ domain المعروفة ([[NotFoundException]] و [[ConflictException]] و [[OutOfStockException]]) مع handler واحد يحوّلها، أو [[Result<T>]] وترجع الـ status من الـ endpoint، الاتنين مقبولين وتمسك في واحد. قارن بـ «استراتيجية الأخطاء» في «تاب Backend بـ Node» و [[problem+json]] في «تاب APIs متقدمة».`,
            mistakes: R`try/catch في كل endpoint بيرجع [[BadRequest(ex.Message)]] (بيسرّب تفاصيل داخلية، وبيخلي كل خطأ 400). وترجع 200 وجواه [[{ success: false }]]. وتنسى إن الـ middleware اللي قبل [[UseExceptionHandler]] مش محمي، فحطه أول واحد. ونسيت [[return false]] للأنواع اللي مش بتاعتك فالـ handler يبلع كل حاجة.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيخلي **كل** الأخطاء في الـ API تطلع بشكل JSON واحد (ProblemDetails)، وبيحوّل exception معروف ([[OutOfStockException]]: المخزون خلص) لـ 409 Conflict بدل 500. فيه حتتين: class بتطبق [[IExceptionHandler]]، و ٤ سطور في Program.cs بتربط كل حاجة.

جرّبته جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (SDK 10.0.401) في نفس مشروع الدروس اللي فاتت مع PostgreSQL 16. ضفت endpoint تجربة [[POST /api/cart/{productId}]] بيرمي [[OutOfStockException]] لو المنتج رقم 3، و [[GET /boom]] بيرمي exception عادي رسالته فيها «سر». والـ requests بـ [[curl]] من Git Bash على 5925.

---

## ١. شكل ProblemDetails

ده الشكل القياسي (RFC 9457) اللي كل الأخطاء هتطلع بيه:

~~~text مثال من التجربة
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.10",
  "title": "Out of stock",
  "status": 409,
  "detail": "Product 3 is out of stock",
  "productId": 3,
  "traceId": "00-4016b09f326b307bcf5b1f581ff57830-3b4ca8bd745f907e-00"
}
~~~

| الحقل | معناه |
|---|---|
| [[type]] | لينك بيشرح نوع المشكلة (ASP.NET بيحط لينك الـ status في RFC 9110) |
| [[title]] | عنوان قصير ثابت لنوع المشكلة |
| [[status]] | نفس الـ HTTP status |
| [[detail]] | تفاصيل الحالة دي بالذات |
| [[productId]] | حقل زيادة بتاعنا (extension) |
| [[traceId]] | ID الـ request، بيربط الرد بسطور اللوج |

والـ Content-Type بيبقى [[application/problem+json]].

---

## ٢. الـ exception نفسه

مش في الدرس، بس الـ handler بيستخدمه، فكتبته كده (زي [[NotFoundException]] في درس exceptions):

~~~csharp DomainHandler.cs
public class OutOfStockException(int productId) : Exception($"Product {productId} is out of stock")
{
    public int ProductId { get; } = productId;
}
~~~

---

## ٣. الـ handler

~~~csharp DomainHandler.cs
public class DomainExceptionHandler(IProblemDetailsService problems) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext http, Exception ex, CancellationToken ct)
    {
~~~

- [[: IExceptionHandler]]: interface فيها method واحدة [[TryHandleAsync]]. الملف محتاج [[using Microsoft.AspNetCore.Diagnostics;]] (فيه الـ interface) و [[using Microsoft.AspNetCore.Mvc;]] (فيه [[ProblemDetails]]).
- [[IProblemDetailsService problems]]: service بيكتب ProblemDetails في الرد، جاي من الـ DI (بيتسجل بـ [[AddProblemDetails()]]).
- [[ValueTask<bool>]]: زي [[Task<bool>]] بس أخف لما النتيجة غالبًا جاهزة على طول. والـ bool معناه «مسكته ولا لأ».
- الـ parameters: [[http]] الـ request والـ response، و [[ex]] الـ exception اللي حصل، و [[ct]] token الإلغاء.

### مش بتاعي؟ سيبه

~~~csharp DomainHandler.cs
if (ex is not OutOfStockException oos) return false;
~~~

- [[ex is not OutOfStockException oos]]: pattern (درس switch expression): «لو مش من النوع ده». ولو هو من النوع ده، بيتحط في [[oos]] بنوعه الحقيقي ونكمل بيه تحت.
- [[return false]]: «مش أنا»، فالـ middleware يجرب الـ handler اللي بعدي. لو نسيت السطر ده، الـ handler هيمسك **كل** الأخطاء ويرجعها 409.

### الرد

~~~csharp DomainHandler.cs
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
~~~

- [[StatusCodes.Status409Conflict]]: ثابت قيمته 409. أوضح من كتابة الرقم.
- [[TryWriteAsync(...)]]: اكتب الـ ProblemDetails في الرد، وبترجع true لو كتبته. وبنرجّع نفس الـ bool.
- [[new ProblemDetailsContext { ... }]]: object initializer فيه الـ request والـ exception والمحتوى.
- [[Extensions = { ["productId"] = oos.ProductId }]]: [[Extensions]] قاموس الحقول الزيادة، والصيغة دي بتضيف عليه من غير ما تعمل قاموس جديد. والـ [[traceId]] بيتضاف لوحده.

---

## ٤. الربط في Program.cs

~~~csharp Program.cs
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<DomainExceptionHandler>();
app.UseExceptionHandler();
app.UseStatusCodePages();
~~~

| السطر | بيعمل إيه |
|---|---|
| [[AddProblemDetails()]] | يسجّل [[IProblemDetailsService]]: أي خطأ يتكتب بالشكل ده |
| [[AddExceptionHandler<T>()]] | يسجّل الـ handler (كـ Singleton). ممكن أكتر من واحد، وبيتجربوا بترتيب التسجيل |
| [[UseExceptionHandler()]] | middleware بيلف كل اللي بعده في try/catch، ولما يمسك exception يجرب الـ handlers |
| [[UseStatusCodePages()]] | الردود الـ 4xx و 5xx اللي من غير body (زي 404 من الـ routing و 401 من الـ auth) تتملى ProblemDetails |

الأولين قبل [[builder.Build()]] (services)، والتانيين بعده (middleware)، و [[UseExceptionHandler]] أول واحد في الـ pipeline عشان يحمي كل اللي بعده (درس middleware).

---

## ٥. التجارب

### exception معروف: 409

~~~bash
curl -si -X POST localhost:5925/api/cart/3
~~~

~~~text الناتج
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.10","title":"Out of stock","status":409,"detail":"Product 3 is out of stock","productId":3,"traceId":"00-4016b09f326b307bcf5b1f581ff57830-3b4ca8bd745f907e-00"}
~~~

### exception مش معروف: 500 من غير تفاصيل

~~~text الناتج: curl -si localhost:5925/boom
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.6.1","title":"An error occurred while processing your request.","status":500,"traceId":"00-1549c0b7c2a8fa7321f98bba9dfd26bf-01c31ef4766c50d5-00"}
~~~

الـ handler بتاعنا رجّع false، فالـ middleware كتب 500 عام. الرسالة (اللي فيها «السر») **مظهرتش** للـ client، ولا الـ stack trace، حتى في Development، لأن [[UseExceptionHandler]] موجود. بس في اللوج:

~~~text الناتج: لوج السيرفر
fail: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]
      An unhandled exception has occurred while executing the request.
      System.InvalidOperationException: secret db password is 123
~~~

والمستخدم يبعتلك الـ [[traceId]]، وانت تدوّر بيه في اللوج. ملاحظة: الـ 409 بتاع OutOfStock **مطلعش** في اللوج خالص: من .NET 10 الـ exception اللي handler رجّع له true مبيتسجلش افتراضيًا.

### مسار مش موجود

~~~text الناتج: curl -si localhost:5925/nope
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-a345351dc55fb2c411fe917d14e49180-0e104a0366321e9b-00"}
~~~

ده شغل [[UseStatusCodePages]].

---

## ٦. الحل: [[DbConflictHandler]]

~~~csharp DbConflictHandler.cs
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
~~~

[[Npgsql]] فيه [[PostgresException]]، و [[Microsoft.EntityFrameworkCore]] فيه [[DbUpdateException]].

~~~csharp DbConflictHandler.cs
if (ex is not DbUpdateException { InnerException: PostgresException { SqlState: "23505" } pg }) return false;
~~~

pattern متداخل، نقراه من برّه لجوه:

1. [[DbUpdateException { ... }]]: الـ exception من النوع ده، و...
2. [[InnerException: PostgresException { ... }]]: الـ exception اللي جواه من النوع ده، و...
3. [[SqlState: "23505"]]: كود الخطأ في PostgreSQL = unique violation.
4. [[pg]]: لو كله طابق، الـ PostgresException يتحط في [[pg]].

وباقي الكود زي الـ DomainExceptionHandler، مع [[Title = "Duplicate"]] و [[Detail = $"Value violates {pg.ConstraintName}"]]. وسجلته تاني:

~~~csharp Program.cs
builder.Services.AddExceptionHandler<DbConflictHandler>();
~~~

نفس المنتج مرتين (درس validation كان بيطلّع 500):

~~~text الناتج
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.10","title":"Duplicate","status":409,"detail":"Value violates IX_Products_Name","traceId":"00-2716257dfe7f4178b93f3fe5ac2351e9-e636d6f99956dfc9-00"}
~~~

### لو شلت [[AddProblemDetails]]

التطبيق مقامش أصلًا:

~~~text الناتج
Unhandled exception. System.AggregateException: Some services are not able to be constructed (Error while validating the service descriptor 'ServiceType: Microsoft.AspNetCore.Diagnostics.IExceptionHandler Lifetime: Singleton ImplementationType: DomainExceptionHandler': Unable to resolve service for type 'Microsoft.AspNetCore.Http.IProblemDetailsService' while attempting to activate 'DomainExceptionHandler'.) ...
~~~

- الـ handlers بتوعنا بيطلبوا [[IProblemDetailsService]] في الـ constructor، ومحدش سجله.
- [[Lifetime: Singleton]]: [[AddExceptionHandler]] بيسجّل الـ handler Singleton، فمينفعش يطلب [[ShopDb]] أو أي Scoped service (درس DI و lifetimes).

ولما شلت الـ handlers كمان وسبت [[UseExceptionHandler()]] لوحده:

~~~text الناتج
System.InvalidOperationException: An error occurred when configuring the exception handler middleware. Either the 'ExceptionHandlingPath' or the 'ExceptionHandler' property must be set in 'UseExceptionHandler()'. ... or configure to generate a 'ProblemDetails' response in 'service.AddProblemDetails()'.
~~~

ولما شلته هو كمان، الـ 404 رجع من [[UseStatusCodePages]] كنص عادي:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: text/plain

Status Code: 404; Not Found
~~~

(والـ body بعده مسافات كتير: ASP.NET بيطوّله لـ 512 byte عشان متصفحات قديمة متعرضش صفحة الخطأ بتاعتها بداله.)

---

## الخلاصة

- [[AddProblemDetails()]] + [[UseExceptionHandler()]] + [[UseStatusCodePages()]] = كل الأخطاء [[application/problem+json]].
- [[IExceptionHandler]]: [[return false]] لو مش نوعك، وغير كده اكتب الـ status والـ ProblemDetails وارجع true.
- الـ handlers بتتجرب بترتيب التسجيل، وهي Singleton.
- الـ 500 مبيظهرش فيه الرسالة ولا الـ stack trace، والـ [[traceId]] بيوصلك للّوج.
- [[UseExceptionHandler]] أول middleware.`,
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
