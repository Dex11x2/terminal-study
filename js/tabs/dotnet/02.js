// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "الأنواع و null",
      l: 1,
      n: "أنواع ثابتة زي TS بس بتفضل موجودة وقت التشغيل، و value ولا reference، و null من غير مفاجآت",
      items: [
        {
          cmd: "var و الأنواع الأساسية",
          title: "int و decimal و string و var: إيه اللي مختلف عن number في JS؟",
          desc: R`في JS كل الأرقام [[number]]. في C# لكل استخدام نوع: [[int]] (32-bit) للعدادات والـ IDs، و [[long]] للأرقام الكبيرة، و [[double]] للحسابات العلمية، و [[decimal]] للفلوس (مفيش مشكلة [[0.1 + 0.2]])، و [[bool]] و [[char]] و [[string]].

[[var]] مش زي [[var]] في JS: ده type inference زي [[let x = 5]] في TS. النوع بيتحدد من القيمة ومبيتغيرش. والفرق الكبير عن TS: الأنواع دي بتفضل موجودة وقت التشغيل، والـ compiler مش هيطلّع برنامج لو فيه خطأ نوع.`,
          example: R`var name = "Sara";
int age = 27;
decimal price = 19.99m;
double ratio = 0.1 + 0.2;
Console.WriteLine($"Hi {name}, {age + 1}, {price * 2}");
Console.WriteLine(ratio);
Console.WriteLine(0.1m + 0.2m);
Console.WriteLine(7 / 2);
Console.WriteLine(7 / 2.0);
int big = int.MaxValue;
Console.WriteLine(big + 1);
age = "28"; // error CS0029: Cannot implicitly convert type 'string' to 'int'`,
          try: R`احسب إجمالي فاتورة: ٣ منتجات بأسعار [[0.10]] و [[0.20]] و [[0.30]]، مرة بـ [[double]] ومرة بـ [[decimal]]، واطبع الاتنين. وبعدين اعمل [[int.Parse("12a")]] وشوف بيحصل إيه، وقارنه بـ [[int.TryParse]].`,
          flag: "script",
          deep: {
            why: R`في JS [[7 / 2]] بـ 3.5 و [["5" * 2]] بـ 10، وده بيعدي بهدوء. في C# كل عملية ليها قواعد واضحة، والغلط بيبان وقت الـ build. وأشهر مكان ده بيفرق: الفلوس. [[double]] بيخزن تقريب ثنائي، فحسابات الأسعار بتطلع [[0.30000000000000004]]؛ [[decimal]] عشري فبيطلع [[0.3]] بالظبط.`,
            how: R`[[7 / 2]] بين intين = قسمة صحيحة = 3. لو واحد منهم double يبقى 3.5. وده أشهر bug لحد جاي من JS: [[average = sum / count]] وهما int.

الـ literals ليها لاحقة: [[19.99m]] decimal، و [[2.5f]] float، و [[10L]] long، ومن غيرها الرقم العشري double. ومينفعش تحط double في decimal من غير cast.

الـ overflow: [[int.MaxValue + 1]] بيلف لـ [[-2147483648]] بهدوء (unchecked افتراضيًا). لو كتبتها كثوابت الـ compiler بيمسكها (CS0220)، ولو عايز exception وقت التشغيل استخدم [[checked(big + 1)]] أو فعّل [[CheckForOverflowUnderflow]].

التحويل: [[int.Parse]] بيرمي [[FormatException]] لو النص غلط، و [[int.TryParse(s, out var n)]] بيرجع bool من غير exception، وده اللي تستخدمه مع input المستخدم. و [[string]] immutable زي JS، وبيتقارن بالقيمة بـ [[==]].`,
            when: R`[[int]] للعدادات والـ IDs، و [[long]] لو ممكن تعدي ٢ مليار، و [[decimal]] لأي فلوس أو كميات دقيقة، و [[double]] للقياسات والإحصاء. و [[var]] لما النوع واضح من الشمال ([[var list = new List<int>()]])، والنوع صريح لما يوضّح.`,
            mistakes: R`[[double]] للأسعار. وقسمة intين وتستنى كسر. و [[int.Parse]] على input مستخدم من غير try. وتفتكر إن [[var]] معناها dynamic: لأ، [[var x = 5; x = "a";]] خطأ compile. وفي الانترفيو: «decimal ولا double للفلوس وليه؟» decimal: base-10 ودقته ٢٨ رقم، أبطأ شوية بس مفيش أخطاء تقريب في الكسور العشرية.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف متغيرات من أنواع مختلفة، ويعمل عليها حسابات، ويوريك ٤ حاجات بتفاجئ اللي جاي من JS: [[double]] بيغلط في الكسور و [[decimal]] لأ، وقسمة رقمين صحيحين بتشيل الكسر، و [[int]] ليه سقف ولما يعدّيه بيلف، والنوع مبيتغيرش. كل الناتج تحت حقيقي من [[dotnet run types.cs]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12). السطر الأخير اتشال وقت التشغيل لأنه بيمنع البرنامج يتبني، وجرّبته لوحده.

---

## ١. التعريفات

~~~csharp types.cs
var name = "Sara";
int age = 27;
decimal price = 19.99m;
double ratio = 0.1 + 0.2;
~~~

كل سطر: **النوع** ثم **الاسم** ثم [[=]] ثم القيمة ثم [[;]].

| السطر | النوع | ليه |
|---|---|---|
| [[var name = "Sara";]] | [[string]] | [[var]] = «استنتج النوع من القيمة». القيمة نص، فالنوع [[string]] للأبد |
| [[int age = 27;]] | [[int]] | رقم صحيح 32-bit |
| [[decimal price = 19.99m;]] | [[decimal]] | رقم عشري بالنظام العشري (للفلوس). الـ [[m]] في الآخر إجبارية |
| [[double ratio = 0.1 + 0.2;]] | [[double]] | رقم عشري بالنظام الثنائي، زي [[number]] في JS بالظبط |

### ليه [[m]] بعد [[19.99]]؟

أي رقم فيه علامة عشرية C# بيعتبره [[double]] لوحده. ولو حطيته في [[decimal]] من غير [[m]]:

~~~text الناتج: build
error CS0664: Literal of type double cannot be implicitly converted to type 'decimal'; use an 'M' suffix to create a literal of this type
~~~

الـ compiler مش هيحوّل من نفسه، لأن التحويل ممكن يغيّر القيمة. وفيه لواحق تانية: [[10L]] لـ [[long]]، و [[2.5f]] لـ [[float]].

### اتأكدت من الأنواع وقت التشغيل

[[x.GetType()]] بيرجع النوع الحقيقي، وده موجود لأن الأنواع في C# بتفضل وقت التشغيل (مش زي TS اللي بتتمسح):

~~~text الناتج
System.String
System.Decimal
System.Double
~~~

[[string]] و [[decimal]] و [[double]] أسماء مختصرة لـ [[System.String]] و [[System.Decimal]] و [[System.Double]].

---

## ٢. الطباعة بالـ interpolation

~~~csharp types.cs
Console.WriteLine($"Hi {name}, {age + 1}, {price * 2}");
~~~

- [[$"..."]]: نص فيه [[{ }]]، وأي حاجة جواها بتتحسب.
- [[{age + 1}]]: 27 + 1.
- [[{price * 2}]]: 19.99 × 2، والنتيجة [[decimal]].

~~~text الناتج
Hi Sara, 28, 39.98
~~~

---

## ٣. [[double]] ضد [[decimal]]

~~~csharp types.cs
Console.WriteLine(ratio);
Console.WriteLine(0.1m + 0.2m);
~~~

~~~text الناتج
0.30000000000000004
0.3
~~~

### ليه الـ double غلط؟

الـ [[double]] بيخزّن الرقم بالنظام الثنائي (0 و 1). و 0.1 في الثنائي كسر مبيخلصش (زي ما ⅓ في العشري 0.333... مبيخلصش)، فبيتخزن تقريب. والتقريبين لما يتجمعوا يطلع الفرق الصغير ده في الخانة الـ 17. وده نفس اللي بيحصل في JS، لأن [[number]] هو [[double]].

### والـ decimal؟

[[decimal]] بيخزن الرقم بالنظام العشري: رقم صحيح لحد ٢٨-٢٩ خانة، ومعاه «العلامة العشرية فين». فـ 0.1 بتتخزن 1 مع «خانة واحدة بعد العلامة» بالظبط، ومفيش تقريب. التمن: أبطأ من [[double]] ومداه أصغر. أكبر قيمة طبعتها:

~~~text decimal.MaxValue
79228162514264337593543950335
~~~

---

## ٤. القسمة

~~~csharp types.cs
Console.WriteLine(7 / 2);
Console.WriteLine(7 / 2.0);
~~~

~~~text الناتج
3
3.5
~~~

- [[7 / 2]]: الاتنين [[int]]، فالنتيجة [[int]]، والكسر **بيتشال** (مش بيتقرّب: 3.5 بقت 3).
- [[7 / 2.0]]: [[2.0]] نوعه [[double]]، فالـ 7 بتتحوّل [[double]] الأول، والنتيجة 3.5.

القاعدة: نوع النتيجة بييجي من نوع الطرفين. فلو عندك [[sum / count]] والاتنين [[int]] والمفروض متوسط، اكتب [[(double)sum / count]].

---

## ٥. الـ overflow

~~~csharp types.cs
int big = int.MaxValue;
Console.WriteLine(big + 1);
~~~

- [[int.MaxValue]]: أكبر قيمة [[int]] يشيلها: [[2147483647]] (يعني 2 أس 31 ناقص 1، لأن bit واحد من الـ 32 للإشارة).
- [[big + 1]]: مفيش مكان، فبيلف لأصغر قيمة:

~~~text الناتج
-2147483648
~~~

من غير أي error. ده اسمه **unchecked** وده الافتراضي عشان السرعة. ولو عايز exception:

~~~csharp
Console.WriteLine(checked(big + 1));
~~~

~~~text الناتج
Unhandled exception. System.OverflowException: Arithmetic operation resulted in an overflow.
   at Program.<Main>$(String[] args) in /w/l6/chk.cs:line 2
~~~

ولو كتبتها ثوابت صريحة [[int.MaxValue + 1]]، الـ compiler بيحسبها بنفسه ويمسكها:

~~~text الناتج: build
error CS0220: The operation overflows at compile time in checked mode
~~~

ولو الأرقام هتكبر: [[long]] أقصاه [[9223372036854775807]].

---

## ٦. النوع مبيتغيرش

~~~csharp types.cs
age = "28";
~~~

~~~text الناتج: dotnet run
err.cs(20,7): error CS0029: Cannot implicitly convert type 'string' to 'int'
The build failed. Fix the build errors and run again.
~~~

- [[(20,7)]]: السطر 20، العمود 7 (جرّبته في نسخة من الملف اسمها [[err.cs]] فيها سطور زيادة).
- [[CS0029]]: كود الخطأ. ابحث بيه وهتلاقي صفحته في docs مايكروسوفت.
- [[implicitly]]: «لوحده من غير ما تطلب».

والمهم: **البرنامج كله مش هيتبني**، ولا سطر هيشتغل. في TS لو فيه type error الـ JS بيطلع برضه غالبًا. ونفس الخطأ مع [[var x = 5; x = "a";]]: [[var]] مش [[dynamic]].

---

## ٧. التجربة: الفاتورة و Parse

~~~csharp sol.cs
double[] pricesD = [0.10, 0.20, 0.30];
decimal[] pricesM = [0.10m, 0.20m, 0.30m];
Console.WriteLine(pricesD.Sum());
Console.WriteLine(pricesM.Sum());
Console.WriteLine(int.TryParse("12a", out var n) ? n : "not a number");
Console.WriteLine(int.Parse("12a"));
~~~

- [[double[]]]: array من [[double]]. و [[[0.10, 0.20, 0.30]]] اسمها collection expression (C# 12)، زي array في JS.
- [[.Sum()]]: من LINQ (ليه درس قدام): يجمع العناصر.

~~~text الناتج
0.6000000000000001
0.60
not a number
Unhandled exception. System.FormatException: The input string '12a' was not in a correct format.
   at System.Number.ThrowFormatException[TChar](ReadOnlySpan$__bt1 value)
   at System.Int32.Parse(String s)
   at Program.<Main>$(String[] args) in /w/l6/sol.cs:line 6
~~~

### [[0.60]] مش [[0.6]]؟

الـ [[decimal]] بيفتكر عدد الخانات اللي كتبتها: [[0.10m]] خانتين، فالمجموع خانتين. ونفس الفكرة: [[0.1m + 0.20m]] طبعت [[0.30]].

### [[int.TryParse("12a", out var n)]]

- [[TryParse]]: «حاول تحوّل النص لرقم»، وبترجع [[bool]]: نجحت ولا لأ.
- [[out var n]]: [[out]] معناها «الدالة دي هتكتب في المتغير ده». و [[var n]] بتعرّفه في نفس المكان. لو التحويل فشل [[n]] بيبقى 0.
- [[? n : "not a number"]]: ternary. فشل، فطبع [["not a number"]].

### [[int.Parse("12a")]]

نفس التحويل بس لو فشل بيرمي [[FormatException]]، ومحدش مسكها فالبرنامج وقع. السطور اللي بتبدأ بـ [[at]] اسمها stack trace: مين نادى مين، من تحت لفوق، وآخرها [[line 6]]: السطر اللي وقع.

---

## الخلاصة

| النوع | استخدمه لـ | ملاحظة |
|---|---|---|
| [[int]] | العدادات والـ IDs | أقصاه 2,147,483,647 وبيلف بهدوء |
| [[long]] | أرقام أكبر | لاحقة [[L]] |
| [[double]] | قياسات وحسابات علمية | تقريب ثنائي زي JS |
| [[decimal]] | الفلوس | لاحقة [[m]]، دقيق في الكسور العشرية |
| [[string]] | نصوص | [[$"...{x}..."]] للـ interpolation |

- [[var]] استنتاج نوع وقت الـ compile، مش متغير يقبل أي حاجة.
- int على int = int (الكسر بيتشال).
- [[TryParse]] لأي input جاي من برّه، و [[Parse]] لما تكون متأكد.`,
          lines: [
            R`[[var]]: النوع اتستنتج [[string]] ومش هيتغير.`,
            "int صريح.",
            R`decimal: لازم [[m]] في الآخر.`,
            "double: تقريب ثنائي.",
            R`interpolation: [[{...}]] جوه [[$"..."]]. الناتج [[Hi Sara, 28, 39.98]].`,
            R`[[0.30000000000000004]] زي JS بالظبط.`,
            R`[[0.3]]: الـ decimal عشري.`,
            R`[[3]]: قسمة صحيحة بين intين.`,
            R`[[3.5]]: واحد منهم double.`,
            "أكبر int.",
            R`[[-2147483648]]: overflow بيلف بهدوء.`,
            "خطأ compile: مفيش تحويل ضمني من string لـ int، والبرنامج مش هيتبني أصلًا."
          ],
          sol: R`بـ double الناتج [[0.6000000000000001]]، وبـ decimal [[0.60]] بالظبط (الـ decimal بيحتفظ بعدد الخانات العشرية اللي كتبتها). مش كل حسبة double بتبان غلط في الطباعة: [[19.99 + 5.50 + 0.10]] بتطبع [[25.59]] لأن .NET بيطبع أقصر رقم بيرجع لنفس القيمة، بس الغلط موجود جوه وبيتراكم مع الجمع والمقارنة. ده السبب إن أي حاجة فيها فلوس تبقى decimal، وفي قاعدة البيانات [[numeric]] (شوف «تاب SQL و Prisma»: درس numeric للفلوس).

[[int.Parse("12a")]] بيرمي [[System.FormatException: The input string '12a' was not in a correct format.]] والبرنامج بيقع لو محدش مسكه. و [[int.TryParse("12a", out var n)]] بيرجع [[False]] و [[n]] بـ 0 من غير exception. القاعدة: Parse لما تكون متأكد إن النص صح (مثلًا config)، و TryParse لأي حاجة جاية من برّه.`,
          solCode: R`double[] pricesD = [0.10, 0.20, 0.30];
decimal[] pricesM = [0.10m, 0.20m, 0.30m];
Console.WriteLine(pricesD.Sum());
Console.WriteLine(pricesM.Sum());
Console.WriteLine(int.TryParse("12a", out var n) ? n : "not a number");
Console.WriteLine(int.Parse("12a"));`
        },
        {
          cmd: "value و reference types",
          title: "ليه تعديل نسخة مرة بيغيّر الأصل ومرة لأ؟ (struct و class)",
          desc: R`في JS الـ primitives بتتنسخ والـ objects بتتشارك. C# نفس الفكرة بس انت اللي بتختار: [[class]] = reference type (المتغير بيشاور على object واحد في الـ heap، والنسخ بينسخ العنوان)، و [[struct]] = value type (المتغير هو القيمة نفسها، والنسخ بينسخ كل الحقول).

[[int]] و [[double]] و [[decimal]] و [[bool]] و [[DateTime]] و [[Guid]] كلهم structs. [[string]] و arrays و [[List<T>]] وأي class بتعملها reference types.`,
          example: R`var p1 = new PointS(1, 2);
var p2 = p1;
p2.X = 99;
Console.WriteLine($"struct: p1.X={p1.X} p2.X={p2.X}");
var c1 = new PointC { X = 1, Y = 2 };
var c2 = c1;
c2.X = 99;
Console.WriteLine($"class:  c1.X={c1.X} c2.X={c2.X}");
Console.WriteLine(new PointC { X = 1 } == new PointC { X = 1 });
Console.WriteLine(new PointS(1, 2).Equals(new PointS(1, 2)));
struct PointS(int x, int y) { public int X = x; public int Y = y; }
class PointC { public int X; public int Y; }`,
          try: R`اعمل [[static class Points]] فيها method [[public static void Reset(PointS p) => p.X = 0;]] ونسخة تانية لـ [[PointC]] (overload بنفس الاسم)، وناديهم وشوف الأصل اتغيّر في أنهي حالة. وبعدين ضيف overload تالت [[Reset(ref PointS p)]] وناديه بـ [[Points.Reset(ref p1)]].`,
          flag: "script",
          deep: {
            why: R`ده أساس ناس كتير بتتلخبط فيه: تعديل object جوه method بيأثر على الأصل ولا لأ، وليه [[==]] بين objectين متطابقين بيرجع false. وسؤال انترفيو ثابت في أي وظيفة .NET (شوف آخر category).`,
            how: R`الـ class: [[new]] بيحجز object في الـ managed heap، والمتغير فيه reference. [[c2 = c1]] بينسخ الـ reference، فالاتنين بيشاوروا على نفس الـ object. و [[==]] للـ classes بيقارن الـ references (نفس الـ object ولا لأ) إلا لو الـ class عاملة override (زي string و record).

الـ struct: القيمة نفسها بتتخزن جوه المتغير (على الـ stack لو local، أو جوه الـ object اللي شايلها لو field). [[p2 = p1]] نسخة كاملة. و [[Equals]] الافتراضي بيقارن الحقول، بس [[==]] مش موجود للـ struct بتاعتك إلا لو عرّفته.

الـ arguments بتتبعت by value افتراضيًا في الحالتين: الـ struct بيتنسخ، والـ class الـ reference بيتنسخ (فتقدر تعدّل الـ object بس متقدرش تخلي المتغير الأصلي يشاور على object تاني). [[ref]] بيبعت المتغير نفسه.`,
            when: R`[[class]] هو الافتراضي لأي حاجة. [[struct]] لقيم صغيرة (أقل من ١٦ byte تقريبًا) immutable بتتعمل كتير، زي Point و Money، وعشان تقلل الـ allocations في كود حساس للأداء. و [[record struct]] لو عايز value semantics مع كتابة أقل.`,
            mistakes: R`struct كبيرة أو mutable: كل نسخة بتكلّف، والتعديل على نسخة مش بيأثر على الأصل فتتوه (أشهرها تعديل عنصر struct جوه [[List<T>]]: بالـ indexer [[list[0].X = 5]] بيطلع error CS1612، وجوه [[foreach]] بيطلع error CS1654). وتفتكر إن «value types على الـ stack دايمًا»: لأ، field من نوع int جوه class عايش في الـ heap مع الـ object.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعمل نفس الحاجة مرتين: نقطة (X و Y)، ينسخها، ويعدّل في النسخة. مرة النقطة [[struct]] ومرة [[class]]، وتشوف إن الأصل اتغير في واحدة بس. وبعدين بيقارن نقطتين متطابقتين. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. التعريفات (آخر سطرين)

في الـ top-level statements الأنواع بتتكتب **بعد** الكود، فنبدأ بيهم.

~~~csharp points.cs
struct PointS(int x, int y) { public int X = x; public int Y = y; }
class PointC { public int X; public int Y; }
~~~

### [[struct PointS(int x, int y)]]

- [[struct]]: نوع **value type**: المتغير شايل القيمة نفسها.
- [[(int x, int y)]]: اسمه primary constructor (C# 12): بارامترات بتتبعت وقت [[new PointS(1, 2)]].
- [[public int X = x;]]: حقل (field) اسمه [[X]] نوعه [[int]]، مرئي للكل ([[public]])، وقيمته الأولى من [[x]]. الحرف الصغير للبارامتر والكبير للحقل.

### [[class PointC]]

- [[class]]: نوع **reference type**: المتغير شايل «عنوان» object موجود في حتة تانية في الذاكرة (الـ heap).
- حقلين من غير قيمة أولى، فبيبدأوا بـ 0 (الـ default بتاع [[int]]).

---

## ٢. الـ struct

~~~csharp points.cs
var p1 = new PointS(1, 2);
var p2 = p1;
p2.X = 99;
Console.WriteLine($"struct: p1.X={p1.X} p2.X={p2.X}");
~~~

1. [[new PointS(1, 2)]]: اعمل نقطة X=1 و Y=2، وحطها **جوه** [[p1]].
2. [[var p2 = p1;]]: انسخ **القيم** كلها لـ [[p2]]. دلوقتي فيه نقطتين منفصلين.
3. [[p2.X = 99;]]: [[.]] بتوصل لحقل جوه المتغير. غيّرنا نسخة [[p2]] بس.

~~~text الناتج
struct: p1.X=1 p2.X=99
~~~

[[p1]] متأثرش.

---

## ٣. الـ class

~~~csharp points.cs
var c1 = new PointC { X = 1, Y = 2 };
var c2 = c1;
c2.X = 99;
Console.WriteLine($"class:  c1.X={c1.X} c2.X={c2.X}");
~~~

1. [[new PointC { X = 1, Y = 2 }]]: اعمل object في الـ heap، والـ [[{ X = 1, Y = 2 }]] اسمها object initializer: بتحط قيم في الحقول بعد الإنشاء على طول. و [[c1]] شايل عنوان الـ object ده.
2. [[var c2 = c1;]]: انسخ **العنوان**. الاتنين بيشاوروا على object واحد.
3. [[c2.X = 99;]]: روح للـ object اللي [[c2]] بيشاور عليه وغيّر X. وهو نفسه بتاع [[c1]].

~~~text الناتج
class:  c1.X=99 c2.X=99
~~~

| | [[struct]] | [[class]] |
|---|---|---|
| المتغير شايل | القيمة نفسها | عنوان (reference) |
| [[a = b]] بينسخ | كل الحقول | العنوان بس |
| التعديل على النسخة | مش بيأثر على الأصل | بيأثر، لأنه نفس الـ object |
| زي إيه في JS | number و string | object و array |

---

## ٤. المقارنة

~~~csharp points.cs
Console.WriteLine(new PointC { X = 1 } == new PointC { X = 1 });
Console.WriteLine(new PointS(1, 2).Equals(new PointS(1, 2)));
~~~

~~~text الناتج
False
True
~~~

- [[==]] بين objectين من class بيسأل: «نفس الـ object؟» مش «نفس القيم؟». ودول اتنين [[new]] يعني objectين، فـ [[False]]. زي [[{x:1} === {x:1}]] في JS.
- [[.Equals(...)]] بتاع الـ struct بيقارن الحقول واحد واحد: [[True]].

### وليه مكتبناش [[==]] للـ struct؟

جرّبت:

~~~text الناتج: build
error CS0019: Operator '==' cannot be applied to operands of type 'PointS' and 'PointS'
~~~

الـ struct بتاعتك ملهاش [[==]] غير لو عرّفته بنفسك (أو استخدمت [[record struct]] اللي بيعمله لوحده).

---

## ٥. التجربة: struct و class جوه method

~~~csharp sol.cs
var p1 = new PointS(1, 2);
var c1 = new PointC { X = 1 };
Points.Reset(p1);
Points.Reset(c1);
Console.WriteLine($"{p1.X} {c1.X}");
Points.Reset(ref p1);
Console.WriteLine(p1.X);
static class Points
{
    public static void Reset(PointS p) => p.X = 0;
    public static void Reset(PointC c) => c.X = 0;
    public static void Reset(ref PointS p) => p.X = 0;
}
~~~

### [[static class Points]]

class مش هتعمل منها objects، شايلة methods بس. و [[public static void Reset(...)]]:

- [[public]]: مرئية برّه الـ class.
- [[static]]: بتتنادي على الـ class نفسها [[Points.Reset(...)]] مش على object.
- [[void]]: مبترجعش حاجة.
- [[=> p.X = 0;]]: جسم الـ method سطر واحد.

٣ methods بنفس الاسم وبارامترات مختلفة: ده اسمه **overloading**، والـ compiler بيختار حسب نوع الـ argument.

### [[ref PointS p]]

[[ref]] معناها «ابعت المتغير نفسه، مش نسخة منه». ولازم تتكتب في الناحيتين: في تعريف الـ method وفي النداء [[Points.Reset(ref p1)]].

~~~text الناتج
1 0
0
~~~

| النداء | اللي اتبعت | الأصل اتغير؟ |
|---|---|---|
| [[Reset(p1)]] (struct) | نسخة من النقطة | لأ، فضل 1 |
| [[Reset(c1)]] (class) | نسخة من العنوان، بس بيشاور على نفس الـ object | أيوه، بقى 0 |
| [[Reset(ref p1)]] | المتغير نفسه | أيوه، بقى 0 |

والـ build طلّع تحذير ملوش علاقة بالدرس: [[warning CS0649: Field 'PointC.Y' is never assigned to]]: الحقل Y عمره ما اتكتب فيه.

### أخطاء جرّبتها

| الكود | الخطأ |
|---|---|
| [[Points.Reset(a)]] والـ method عايزة [[ref]] | [[error CS1620: Argument 1 must be passed with the 'ref' keyword]] |
| نفس الـ methods كـ local functions تحت الكود | [[error CS0128: A local variable or function named 'Reset' is already defined in this scope]] |
| [[list[0].X = 5;]] و list من structs | [[error CS1612: Cannot modify the return value of 'List<PointS>.this[int]' because it is not a variable]] |
| [[foreach (var p in list) p.X = 5;]] | [[error CS1654: Cannot modify members of 'p' because it is a 'foreach iteration variable']] |

آخر اتنين نفس الفكرة: [[list[0]]] بيرجعلك **نسخة** من الـ struct، فالـ compiler بيمنعك تعدّل نسخة هتترمي.

ولما عملت method بتعمل [[c = new PointC { X = 7 };]] (من غير [[ref]]) وناديتها على [[c1]]، [[c1.X]] فضل [[1]]: انت غيّرت النسخة المحلية من العنوان، مش الـ object.

---

## الخلاصة

- [[class]]: المتغير عنوان، والنسخ بيشارك نفس الـ object، و [[==]] بيقارن العناوين.
- [[struct]]: المتغير هو القيمة، والنسخ نسخة كاملة، و [[Equals]] بيقارن الحقول.
- أي argument بيتبعت نسخة. الفرق إن نسخة الـ class عنوان بيوصل لنفس الـ object. [[ref]] بيبعت المتغير نفسه.`,
          lines: [
            "struct جديدة.",
            R`نسخة كاملة من القيم، مش reference.`,
            "التعديل على النسخة بس.",
            R`[[p1.X=1 p2.X=99]]: الأصل متأثرش.`,
            "object من class.",
            R`[[c2]] بيشاور على نفس الـ object.`,
            "التعديل على الـ object المشترك.",
            R`[[c1.X=99 c2.X=99]]: الاتنين اتغيروا.`,
            R`[[False]]: objectين مختلفين حتى لو القيم زي بعض.`,
            R`[[True]]: [[Equals]] بتاع الـ struct بيقارن الحقول.`,
            "struct بـ primary constructor (C# 12): الـ parameters بتتحط في الحقول.",
            "class عادية بحقلين."
          ],
          sol: R`الناتج [[1 0]] وبعدين [[0]]. [[Reset(p1)]] مع الـ struct مش بيغيّر [[p1.X]] (فضل 1)، لأن الـ method خدت نسخة. [[Reset(c1)]] مع الـ class غيّرت [[c1.X]] لـ 0، لأن النسخة اللي اتبعتت هي الـ reference، والاتنين بيشاوروا على نفس الـ object.

مع [[ref]]: [[Points.Reset(ref p1)]] بيغيّر الأصل لـ 0، لأن الـ method بقت شايلة المتغير نفسه مش نسخة. لو نسيت [[ref]] عند النداء هيطلع error CS1620. وليه static class مش local functions؟ لأن الـ local functions (اللي بتتكتب تحت الـ top-level statements) مينفعش يبقى ليها overloads بنفس الاسم: error CS0128. ولو عملت الـ method بـ [[c = new PointC()]] للـ class version (من غير ref)، الأصل مش هيتغير: غيّرت النسخة المحلية من الـ reference بس.`,
          solCode: R`var p1 = new PointS(1, 2);
var c1 = new PointC { X = 1 };
Points.Reset(p1);
Points.Reset(c1);
Console.WriteLine($"{p1.X} {c1.X}");
Points.Reset(ref p1);
Console.WriteLine(p1.X);
static class Points
{
    public static void Reset(PointS p) => p.X = 0;
    public static void Reset(PointC c) => c.X = 0;
    public static void Reset(ref PointS p) => p.X = 0;
}
struct PointS(int x, int y) { public int X = x; public int Y = y; }
class PointC { public int X; public int Y; }`
        },
        {
          cmd: "nullable reference types",
          title: "string و string? وعلامة ! : إزاي C# بيحميك من null",
          desc: R`مع [[<Nullable>enable</Nullable>]] (الافتراضي في أي مشروع جديد) [[string]] معناها «مش هتبقى null»، و [[string?]] معناها «ممكن تبقى null». زي [[string]] و [[string | null]] في TS بالظبط.

الأدوات نفس اللي في JS: [[?.]] و [[??]] و [[??=]]، و [[is not null]] للفحص. و [[!]] بعد القيمة (null-forgiving) زي [[!]] في TS: بتقول للـ compiler «صدقني مش null».

الفرق المهم: دي تحذيرات مش أخطاء. البرنامج بيتبني وبيشتغل، ولو تجاهلت التحذير هتاخد [[NullReferenceException]] وقت التشغيل. عشان كده في المشاريع الجد بنخلي تحذيرات null أخطاء.`,
          example: R`string? FindName(int id) => id == 1 ? "Sara" : null;
string? name = FindName(2);
Console.WriteLine(name.Length); // warning CS8602: Dereference of a possibly null reference
Console.WriteLine(name?.Length);
Console.WriteLine(name?.Length ?? 0);
string safe = name ?? "guest";
if (name is not null) Console.WriteLine(name.Length);
int? maybe = null;
Console.WriteLine(maybe.HasValue);`,
          try: R`شغّل المثال زي ما هو وشوف التحذير والـ exception. وبعدين ضيف في الـ csproj [[<WarningsAsErrors>nullable</WarningsAsErrors>]] (أو في file-based app: [[#:property WarningsAsErrors=nullable]]) وشوف الفرق.`,
          flag: "script",
          deep: {
            why: R`الـ null reference هو أشهر exception في تاريخ .NET (ومخترع الـ null نفسه سماه «غلطة المليار دولار»). الـ nullable reference types (من C# 8) بتنقل الغلطة دي من وقت التشغيل لوقت الكتابة، بنفس فكرة [[strictNullChecks]] في TS.`,
            how: R`فيه نوعين null مختلفين تمامًا. الأول [[int?]] (أي value type بـ [[?]]): ده نوع حقيقي اسمه [[Nullable<int>]] فيه [[HasValue]] و [[Value]]، وموجود وقت التشغيل. التاني [[string?]] (reference type بـ [[?]]): ده annotation للـ compiler بس، ووقت التشغيل [[string]] و [[string?]] نفس النوع. عشان كده التحذيرات بس.

الـ compiler بيعمل flow analysis زي narrowing في TS: بعد [[if (name is not null)]] بيعرف إن name مش null. و [[is null]] أحسن من [[== null]] لأن [[==]] ممكن يبقى متعرّفله override.

الحقول الـ non-nullable لازم تتعمل initialize في الـ constructor أو يبقى ليها قيمة أو تبقى [[required]]، وإلا warning CS8618. وفي EF Core هتشوف [[= null!;]] على الـ navigation properties: معناها «EF هيملاها، متقلقش».

[[ArgumentNullException.ThrowIfNull(x)]] للفحص وقت التشغيل على حدود الـ public API.`,
            when: R`سيبه enable دايمًا، وفي المشاريع الجديدة [[WarningsAsErrors]] لـ nullable. [[!]] بس لما تكون متأكد وفيه سبب مش واضح للـ compiler (زي EF navigations أو بعد validation). وعلّم الـ return بـ [[?]] لما الدالة ممكن متلاقيش حاجة ([[FindAsync]] بترجع [[T?]]).`,
            mistakes: R`ترش [[!]] في كل حتة عشان التحذيرات تختفي، زي [[as any]] في TS. وتتجاهل الـ warnings لحد ما يبقوا ٥٠٠ ومحدش يبص عليهم. وتفتكر إن [[string?]] بتعمل حاجة وقت التشغيل. وفي الانترفيو: «إيه الفرق بين [[int?]] و [[string?]]؟» الأول نوع [[Nullable<T>]] حقيقي، والتاني annotation للـ compiler بس.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

دالة بتدوّر على اسم وممكن متلاقيش فترجع [[null]]، وبعدين ٥ طرق تتعامل بيها مع القيمة دي: واحدة غلط (والـ compiler بيحذّرك منها) وأربعة صح. وفي الآخر نوع null تاني خالص للأرقام. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12)، والـ nullable شغال افتراضيًا هناك زي أي مشروع جديد.

---

## ١. الدالة

~~~csharp t.cs
string? FindName(int id) => id == 1 ? "Sara" : null;
~~~

نقراها من الشمال:

- [[string?]]: نوع الرجوع. الـ [[?]] بعد النوع معناها «ممكن تبقى null». من غيرها [[string]] لوحدها معناها «مضمون مش null».
- [[FindName(int id)]]: اسم الدالة وبارامتر [[int]]. دي local function: دالة متعرّفة جوه الـ top-level statements.
- [[=>]]: جسمها expression واحد.
- [[id == 1 ? "Sara" : null]]: ternary: لو [[id]] بـ 1 رجّع [["Sara"]]، غير كده [[null]].

---

## ٢. القيمة null فعلًا

~~~csharp t.cs
string? name = FindName(2);
~~~

[[2]] مش 1، فـ [[name]] بقى [[null]]. ولازم نكتب النوع [[string?]]: لو كتبت [[string name = ...]] الـ compiler هيحذّر إنك بتحط حاجة ممكن تبقى null في متغير مش nullable.

---

## ٣. الغلط: [[name.Length]]

~~~csharp t.cs
Console.WriteLine(name.Length);
~~~

[[.Length]] عدد حروف النص. بس [[name]] مفيهوش نص أصلًا. شغّلت المثال زي ما هو:

~~~text الناتج: dotnet run
t.cs(3,19): warning CS8602: Dereference of a possibly null reference.
Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at Program.<Main>$(String[] args) in /w/l8/t.cs:line 3
~~~

حاجتين حصلوا ورا بعض:

1. **وقت الـ build:** [[warning CS8602]]. **Dereference** يعني «تفتح الـ reference وتوصل للي جواه» (بالـ [[.]]). يعني: «انت بتفتح حاجة ممكن تبقى null». والـ [[(3,19)]] السطر 3 العمود 19، مكان [[name]] بالظبط. وده **تحذير**، فالبرنامج اتبنى عادي.
2. **وقت التشغيل:** [[NullReferenceException]] على نفس السطر، والبرنامج وقع. الـ compiler كان قايلك.

ده الفرق المهم عن TS: الـ [[?]] على reference type مش بيغيّر حاجة في البرنامج نفسه. هي معلومة للـ compiler عشان يحذّرك بس.

---

## ٤. الطرق الصح

شلت السطر الغلط وشغّلت الباقي:

~~~csharp t.cs
Console.WriteLine(name?.Length);
Console.WriteLine(name?.Length ?? 0);
string safe = name ?? "guest";
if (name is not null) Console.WriteLine(name.Length);
~~~

~~~text الناتج
(سطر فاضي)
0
~~~

### [[name?.Length]]

[[?.]] اسمه null-conditional: «لو [[name]] null رجّع null على طول ومتكملش، غير كده هات [[Length]]». النتيجة نوعها [[int?]]، وقيمتها هنا null، و [[WriteLine]] بيطبع null كسطر فاضي.

### [[name?.Length ?? 0]]

[[??]] اسمه null-coalescing: «لو الشمال null خد اليمين». الشمال null، فطبع [[0]]. ده نفس [[??]] في JS.

### [[string safe = name ?? "guest";]]

نفس الفكرة بس النتيجة نوعها [[string]] من غير [[?]]: الـ compiler عارف إنها مستحيل تبقى null لأن اليمين [["guest"]]. طبعت [[safe]] للتأكد وطلع [[guest]]. وفيه كمان [[??=]]: [[name ??= "guest";]] يعني «لو null حط فيه guest».

### [[if (name is not null) ...]]

- [[is not null]]: فحص صريح. ويتكتب كمان [[is null]].
- جوه الـ [[if]] الـ compiler **عارف** إن [[name]] مش null، فـ [[name.Length]] من غير تحذير. ده اسمه flow analysis، زي الـ narrowing في TS.
- هنا [[name]] null، فالشرط false ومفيش طباعة.

---

## ٥. [[int?]]: null من نوع تاني

~~~csharp t.cs
int? maybe = null;
Console.WriteLine(maybe.HasValue);
~~~

~~~text الناتج
False
~~~

[[int]] عادي مينفعش يبقى null أصلًا (value type، درس value و reference). [[int?]] اختصار لنوع حقيقي اسمه [[Nullable<int>]]: صندوق فيه [[HasValue]] (فيه قيمة؟) و [[Value]] (القيمة). اتأكدت:

~~~text typeof(int?)
System.Nullable$__bt1[System.Int32]
~~~

ولو قريت [[.Value]] وهو فاضي:

~~~text الناتج
warning CS8629: Nullable value type may be null.
Unhandled exception. System.InvalidOperationException: Nullable object must have a value.
~~~

والعكس: [[string?]] **مش** نوع تاني. [[typeof(string) == t.GetType()]] لمتغير [[string? t = "a"]] طلعت [[True]].

| | [[int?]] | [[string?]] |
|---|---|---|
| إيه هو | نوع حقيقي [[Nullable<int>]] | [[string]] عادي + ملاحظة للـ compiler |
| موجود وقت التشغيل؟ | أيوه | لأ |
| تقرا القيمة | [[.Value]] أو [[?? 0]] | على طول، بعد الفحص |

---

## ٦. التحذيرات التانية اللي هتقابلها

جرّبت ٣ أخطاء شائعة:

| الكود | التحذير |
|---|---|
| [[string s = null;]] | [[CS8600: Converting null literal or possible null value to non-nullable type.]] |
| property [[string Email]] من غير قيمة | [[CS8618: Non-nullable property 'Email' must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring the property as nullable.]] |
| [[m.Value]] و [[m]] نوعه [[int?]] | [[CS8629: Nullable value type may be null.]] |

---

## ٧. التجربة: التحذير يبقى error

حطيت [[#:property WarningsAsErrors=nullable]] أول سطر في الملف (في مشروع عادي: [[<WarningsAsErrors>nullable</WarningsAsErrors>]] جوه [[<PropertyGroup>]] في الـ csproj):

~~~text الناتج: dotnet run
wae.cs(4,19): error CS8602: Dereference of a possibly null reference.
The build failed. Fix the build errors and run again.
~~~

نفس الرسالة بس بقت [[error]]، والبرنامج مش هيتبني. (نسخة من الملف اسمها [[wae.cs]]، والسطر بقى 4 لأن سطر الـ property اتضاف فوق.) و [[nullable]] هنا اسم مجموعة: كل تحذيرات null مرة واحدة.

---

## الخلاصة

| الرمز | معناه | مثال |
|---|---|---|
| [[T?]] | ممكن null | [[string? name]] |
| [[?.]] | لو null وقّف ورجّع null | [[name?.Length]] |
| [[??]] | لو null خد ده | [[name ?? "guest"]] |
| [[??=]] | لو null حط ده | [[name ??= "guest"]] |
| [[is not null]] | فحص، وبعده الـ compiler مطمن | [[if (name is not null)]] |
| [[!]] | «صدقني مش null»، بيسكّت التحذير بس | [[name!.Length]] |

- تحذيرات null بتتجاهل على مسؤوليتك: البرنامج بيتبني وبيقع وقت التشغيل.
- في أي مشروع جد خليها errors بـ [[WarningsAsErrors]].`,
          lines: [
            R`دالة بترجع [[string?]]: ممكن null.`,
            "القيمة هنا null فعلًا.",
            R`تحذير CS8602 وقت الـ build، و [[NullReferenceException]] وقت التشغيل (امسحه عشان الباقي يشتغل).`,
            R`[[?.]]: لو null النتيجة null (بيطبع سطر فاضي).`,
            R`[[??]]: قيمة بديلة، فبيطبع [[0]].`,
            R`[[safe]] نوعه [[string]] ومضمون مش null.`,
            R`بعد الفحص الـ compiler عارف إنها مش null (narrowing)، وهنا مش هيطبع حاجة.`,
            R`[[int?]] = [[Nullable<int>]]: نوع حقيقي وقت التشغيل.`,
            R`[[False]].`
          ],
          sol: R`زي ما هو: الـ build بينجح مع [[warning CS8602: Dereference of a possibly null reference]] على السطر ٣، والتشغيل بيقع على نفس السطر بـ [[System.NullReferenceException: Object reference not set to an instance of an object.]]. التحذير كان قايلك قبلها.

بعد [[WarningsAsErrors=nullable]] نفس الرسالة بقت [[error CS8602]] والبرنامج مش بيتبني أصلًا. ده اللي عايزه في مشروع حقيقي: نفس فكرة [[tsc --noEmit]] في الـ CI. صلّح السطر بـ [[name?.Length ?? 0]] أو امسحه والباقي هيشتغل ويطبع سطر فاضي و [[0]] و [[False]].`
        }
      ]
    }
]);
