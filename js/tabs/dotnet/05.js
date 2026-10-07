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
    }
]);
