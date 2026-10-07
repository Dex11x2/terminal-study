// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
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
    }
]);
