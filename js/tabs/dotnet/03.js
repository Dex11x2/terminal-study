// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "Classes و records و interfaces",
      l: 1,
      n: "properties و constructors، و records للداتا، و interfaces اسمية مش شكلية زي TS",
      items: [
        {
          cmd: "class و properties",
          title: "تعمل class فيها properties و constructor وتحمي الـ state بتاعها",
          desc: R`الـ class في C# شبه TS بس أصرم. الحقول بتبقى [[private]] عادة، والبيانات بتظهر برّه عن طريق properties: [[public decimal Balance { get; private set; }]] يعني أي حد يقرا، بس التعديل من جوه الـ class بس.

[[init]] بدل [[set]] يعني تتحط مرة وقت الإنشاء بس (زي [[readonly]] في TS). و [[required]] يعني اللي بيعمل object لازم يدّيها قيمة. والـ primary constructor [[class Account(string owner, decimal opening)]] (C# 12) بيوفر عليك كتابة constructor كامل.

الـ access modifiers: [[public]] للكل، و [[private]] للـ class بس (الافتراضي للأعضاء)، و [[protected]] للي بيورثوا، و [[internal]] للمشروع ده بس (الافتراضي للـ classes).`,
          example: R`var acc = new Account("Sara", 100m);
acc.Deposit(50m);
Console.WriteLine(acc);
var u = new User { Email = "sara@x.com" };
Console.WriteLine(u.Name);
acc.Balance = 0; // error CS0272: the set accessor is inaccessible
var bad = new User(); // error CS9035: Required member 'User.Email' must be set
public class Account(string owner, decimal opening)
{
    public string Owner { get; } = owner;
    public decimal Balance { get; private set; } = opening;
    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }
    public override string ToString() => $"{Owner}: {Balance:0.00}";
}
public class User
{
    public required string Email { get; init; }
    public string Name { get; set; } = "guest";
}`,
          try: R`ضيف لـ [[Account]] method اسمها [[Withdraw(decimal amount)]] بترمي [[InvalidOperationException]] لو الرصيد مش كفاية، و property محسوبة [[public bool IsEmpty => Balance == 0;]]. وجرّب تسحب أكتر من الرصيد.`,
          flag: "script",
          deep: {
            why: R`الـ encapsulation مش كلام نظري: لو [[Balance]] ليها [[public set]]، أي حد في الكود يقدر يكتب [[acc.Balance = 1_000_000]] ويتخطى كل قواعد [[Deposit]]. الـ properties بتخليك تفتح القراية وتقفل الكتابة، وتضيف منطق بعدين من غير ما تكسر اللي بيستخدمها.`,
            how: R`[[{ get; set; }]] اسمها auto-property: الـ compiler بيعمل private field مخفي و getter و setter. تقدر تكتب منطق فيهم لو محتاج، ومن C# 14 فيه كلمة [[field]] بتشاور على الـ field المخفي ده: [[set => field = value.Trim();]].

الـ object initializer [[new User { Email = "..." }]] بيشتغل مع [[set]] و [[init]]. وبعد الإنشاء [[init]] بيقفل. و [[required]] بيفرض إن الـ initializer يحط القيمة، وده بيحل مشكلة التحذير CS8618 للـ non-nullable properties من غير constructor.

الـ primary constructor parameters ([[owner]] و [[opening]]) موجودة في كل الـ class، ولو استخدمتها في method بتتحول لـ field مخفي. هنا بنحطهم في properties مرة واحدة. و [[override ToString]] زي [[toString]] في JS: اللي بيطلع لما تطبع الـ object.

و [[nameof(amount)]] بيرجع [[amount]] كـ string، ولو غيّرت اسم الـ parameter بالـ refactor الاسم بيتغير معاه.`,
            when: R`class عادية لأي حاجة ليها سلوك وقواعد (Account، Order، Cart). [[init]] و [[required]] للـ DTOs والـ config. [[private set]] لأي state المفروض يتغير عن طريق methods بس.`,
            mistakes: R`كل حاجة [[public { get; set; }]] (anemic model) والمنطق متفرق في services. وتنسى إن الافتراضي للـ class هو [[internal]] فمش باينة من مشروع تاني. وتعمل public fields بدل properties: الـ serializers و EF Core بيتعاملوا مع properties، والحقول العامة بتتجاهل غالبًا.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف class لحساب بنكي ([[Account]]) الرصيد بتاعه محمي: تقدر تقراه من أي حتة، بس متغيّروش غير عن طريق [[Deposit]] اللي بتفحص المبلغ. و class تانية ([[User]]) فيها property إجبارية. وآخر سطرين في الكود قبل التعريفات غلطات مقصودة، والـ compiler بيمسكهم. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12، C# 14).

---

## ١. [[class Account]] من فوق لتحت

~~~csharp account.cs
public class Account(string owner, decimal opening)
{
~~~

- [[public]]: مرئية من أي حتة، حتى من مشروع تاني. من غيرها تبقى [[internal]] (جوه المشروع ده بس).
- [[class Account]]: نوع جديد اسمه Account.
- [[(string owner, decimal opening)]]: primary constructor (C# 12): البارامترات اللي لازم تتبعت مع [[new]]. ومتاحة جوه الـ class كلها.
- [[{]]: بداية جسم الـ class.

### [[public string Owner { get; } = owner;]]

ده **property**: شبه field بس ليه «باب» للقراية ([[get]]) و «باب» للكتابة ([[set]]).

- [[{ get; }]]: باب قراية بس. مفيش [[set]]، فمحدش يقدر يغيّرها بعد الإنشاء.
- [[= owner;]]: القيمة الأولى من بارامتر الـ constructor.

### [[public decimal Balance { get; private set; } = opening;]]

- [[get;]] من غير كلمة قبلها: بياخد الـ [[public]] بتاع الـ property، فأي حد يقرا.
- [[private set;]]: باب الكتابة [[private]]: جوه الـ class دي بس.

ليه مش field عادي؟ لأن الـ property بتخليك تقفل الكتابة وتسيب القراية. والـ [[{ get; set; }]] الفاضية دي اسمها auto-property: الـ compiler بيعمل field مخفي يشيل القيمة.

### الـ method: [[Deposit]]

~~~csharp account.cs
    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }
~~~

- [[void]]: مبترجعش قيمة.
- [[if (amount <= 0)]]: الشرط بين أقواس، و [[<=]] أصغر من أو يساوي.
- [[throw new ArgumentOutOfRangeException(...)]]: [[throw]] زي JS: ارمي exception ووقّف. و [[ArgumentOutOfRangeException]] نوع exception جاهز معناه «البارامتر قيمته برّه المسموح».
- [[nameof(amount)]]: بيرجع النص [["amount"]]. ليه مش تكتبه بإيدك؟ لو غيّرت اسم البارامتر بالـ refactor، [[nameof]] بيتغير معاه، والنص الثابت لأ.
- [[Balance += amount;]]: زوّد الرصيد. ده مسموح لأننا جوه الـ class ([[private set]]).

جرّبت [[acc.Deposit(-5m)]]:

~~~text الناتج
Unhandled exception. System.ArgumentOutOfRangeException: Specified argument was out of the range of valid values. (Parameter 'amount')
   at Account.Deposit(Decimal amount) in /w/l9/neg.cs:line 13
~~~

لاحظ [[(Parameter 'amount')]]: ده اللي [[nameof]] جابه.

### [[public override string ToString() => $"{Owner}: {Balance:0.00}";]]

- كل object في C# عنده method اسمها [[ToString]]، والافتراضية بترجع اسم النوع ([[Account]]). [[override]] معناها «بدّل النسخة الافتراضية بدي».
- [[=>]]: الـ method سطر واحد (expression-bodied).
- [[{Balance:0.00}]]: الـ [[:0.00]] format: رقمين بعد العلامة دايمًا.

و [[Console.WriteLine(acc)]] بينادي [[ToString()]] لوحده.

---

## ٢. [[class User]]

~~~csharp account.cs
public class User
{
    public required string Email { get; init; }
    public string Name { get; set; } = "guest";
}
~~~

| الكلمة | معناها |
|---|---|
| [[required]] | اللي بيعمل [[new User]] لازم يدّي قيمة لـ [[Email]] |
| [[init]] | بدل [[set]]: الكتابة مسموحة وقت الإنشاء بس، وبعدها تقفل |
| [[{ get; set; }]] | قراية وكتابة عادي من أي حتة |
| [[= "guest"]] | قيمة افتراضية لو محدش حط قيمة |

---

## ٣. استخدام الاتنين

~~~csharp account.cs
var acc = new Account("Sara", 100m);
acc.Deposit(50m);
Console.WriteLine(acc);
var u = new User { Email = "sara@x.com" };
Console.WriteLine(u.Name);
~~~

- [[new Account("Sara", 100m)]]: [[owner]] = Sara و [[opening]] = 100.
- [[acc.Deposit(50m)]]: 100 + 50.
- [[new User { Email = "..." }]]: الـ [[{ }]] بعد [[new]] اسمها object initializer: بتحط قيم في properties وقت الإنشاء. ده المكان الوحيد اللي [[init]] بيسمح فيه.

~~~text الناتج
Sara: 150.00
guest
~~~

---

## ٤. الغلطتين المقصودتين

شغّلت الملف بالسطرين:

~~~text الناتج: dotnet run
cls.cs(6,1): error CS0272: The property or indexer 'Account.Balance' cannot be used in this context because the set accessor is inaccessible
cls.cs(7,15): error CS9035: Required member 'User.Email' must be set in the object initializer or attribute constructor.
The build failed. Fix the build errors and run again.
~~~

- [[acc.Balance = 0;]]: الـ [[set]] بتاع [[Balance]] [[private]]، وإحنا برّه الـ class. **accessor** يعني باب الـ get أو الـ set.
- [[new User()]] من غير [[Email]]: [[required]] اتكسر.

وغلطة تالتة جرّبتها: [[u.Email = "x";]] بعد الإنشاء:

~~~text الناتج: build
error CS8852: Init-only property or indexer 'User.Email' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.
~~~

الثلاثة **أخطاء compile**: البرنامج مش بيتبني أصلًا. مش محتاج تختبر عشان تكتشفهم.

---

## ٥. التجربة: Withdraw و IsEmpty

~~~csharp sol.cs
public bool IsEmpty => Balance == 0;
public void Withdraw(decimal amount)
{
    if (amount > Balance)
        throw new InvalidOperationException($"Insufficient funds: balance {Balance:0.00}, requested {amount:0.00}");
    Balance -= amount;
}
~~~

- [[IsEmpty => Balance == 0]]: property **محسوبة**: مفيش قيمة متخزنة، الـ [[=>]] بتتحسب كل مرة حد يقرا [[IsEmpty]].
- [[InvalidOperationException]]: exception معناه «العملية دي مينفعش دلوقتي بسبب حالة الـ object». مناسب هنا لأن المبلغ نفسه سليم، بس الرصيد مش كفاية.
- [[try { ... } catch (InvalidOperationException ex) { ... }]]: زي JS، بس الـ [[catch]] بيحدد نوع الـ exception اللي يمسكه، و [[ex.Message]] الرسالة.

~~~text الناتج
Insufficient funds: balance 150.00, requested 500.00
True
~~~

### [[=>]] ولا [[=]]؟

جرّبت أكتبها [[public bool IsEmpty { get; } = Balance == 0;]]:

~~~text الناتج: build
error CS0236: A field initializer cannot reference the non-static field, method, or property 'Account.Balance'
~~~

ولما خليتها [[{ get; } = opening == 0;]] وسحبت الرصيد كله، طبعت [[False]] والنسخة بـ [[=>]] طبعت [[True]]: الـ [[=]] اتحسبت مرة واحدة وقت الإنشاء.

---

## ٦. زيادة من C# 14: كلمة [[field]]

لو عايز منطق في الـ setter من غير ما تكتب field بإيدك:

~~~csharp field.cs
var t = new Tag { Name = "  dotnet  " };
Console.WriteLine($"[{t.Name}]");
class Tag { public string Name { get; set => field = value.Trim(); } = ""; }
~~~

~~~text الناتج
[dotnet]
~~~

[[field]] هو الـ field المخفي، و [[value]] القيمة اللي اتبعتت للـ set، و [[.Trim()]] بتشيل المسافات من الطرفين.

---

## الخلاصة

| الشكل | قراية | كتابة |
|---|---|---|
| [[{ get; }]] | الكل | وقت الإنشاء من جوه الـ class بس |
| [[{ get; set; }]] | الكل | الكل |
| [[{ get; private set; }]] | الكل | جوه الـ class بس |
| [[{ get; init; }]] | الكل | وقت الإنشاء بس (object initializer) |
| [[required ... { get; init; }]] | الكل | وقت الإنشاء، وإجباري |
| [[=> expr]] | الكل، بتتحسب كل مرة | مفيش |

- الـ state يتغير عن طريق methods بتفحص القواعد، مش [[public set]].
- [[override ToString]] عشان الطباعة تبقى مفهومة.`,
          lines: [
            R`[[new]] بالـ primary constructor.`,
            "method بتغيّر الـ state بقواعدها.",
            R`بيستخدم [[ToString]]: [[Sara: 150.00]].`,
            R`object initializer: [[Email]] إجباري لأنها [[required]].`,
            R`[[guest]]: القيمة الافتراضية.`,
            R`خطأ compile: الـ setter [[private]].`,
            R`خطأ compile: [[Email]] required ومتحطتش.`,
            R`primary constructor: [[owner]] و [[opening]] متاحين في كل الـ class.`,
            "بداية الـ class.",
            R`property للقراية بس (مفيش set)، قيمتها من الـ constructor.`,
            R`أي حد يقرا، والكتابة من جوه بس.`,
            "method عامة.",
            "بداية الـ method.",
            R`guard: رمي exception لو القيمة غلط. [[nameof]] بيطلّع اسم الـ parameter.`,
            R`التعديل الوحيد المسموح على [[Balance]].`,
            "نهاية الـ method.",
            R`expression-bodied member بـ [[=>]]، و [[:0.00]] format لرقمين عشريين.`,
            "نهاية الـ class.",
            "class تانية.",
            "بداية.",
            R`[[required]] + [[init]]: لازم تتحط وقت الإنشاء ومتتغيرش بعده.`,
            "property عادية ليها default.",
            "نهاية."
          ],
          sol: R`[[Withdraw(500m)]] على رصيد 150 بترمي [[System.InvalidOperationException: Insufficient funds: balance 150.00, requested 500.00]] (بالرسالة اللي كتبتها). و [[Withdraw(150m)]] بعدها بتخلي [[IsEmpty]] بـ [[True]].

لاحظ إن [[IsEmpty]] مفيهاش [[{ get; }]]: الـ [[=>]] معناها property محسوبة بتتحسب كل مرة تتقري، مش متخزنة. ولو كتبت [[public bool IsEmpty { get; } = Balance == 0;]] بدل [[=>]] الـ compiler هيرفض بـ error CS0236 (الـ initializer مينفعش يقرا property تانية في نفس الـ object)، ولو لفّيت عليها بـ [[= opening == 0;]] هتبقى قيمة اتحسبت مرة وقت الإنشاء وفضلت [[False]] حتى بعد ما الرصيد بقى صفر، وده غلط شائع.`,
          solCode: R`var acc = new Account("Sara", 150m);
try { acc.Withdraw(500m); }
catch (InvalidOperationException ex) { Console.WriteLine(ex.Message); }
acc.Withdraw(150m);
Console.WriteLine(acc.IsEmpty);
public class Account(string owner, decimal opening)
{
    public string Owner { get; } = owner;
    public decimal Balance { get; private set; } = opening;
    public bool IsEmpty => Balance == 0;
    public void Withdraw(decimal amount)
    {
        if (amount > Balance)
            throw new InvalidOperationException($"Insufficient funds: balance {Balance:0.00}, requested {amount:0.00}");
        Balance -= amount;
    }
}`
        },
        {
          cmd: "record",
          title: "record: object للداتا بيتقارن بالقيمة وبيتنسخ بـ with",
          desc: R`[[public record Money(decimal Amount, string Currency);]] سطر واحد بيعملك class فيها properties للقراية بس ([[init]])، و constructor، و [[==]] بيقارن القيم مش الـ references، و [[ToString]] مقروء، و deconstruction.

و [[with]] بيعمل نسخة معدّلة: [[a with { Amount = 250m }]] زي [[{ ...a, amount: 250 }]] في JS بالظبط. الأصل مبيتغيرش.

الـ records هي الاختيار الطبيعي للـ DTOs (اللي بيدخل ويطلع من الـ API)، والـ value objects، ونتايج الدوال.`,
          example: R`var a = new Money(100m, "EGP");
var b = new Money(100m, "EGP");
Console.WriteLine(a == b);
Console.WriteLine(ReferenceEquals(a, b));
var c = a with { Amount = 250m };
Console.WriteLine(c);
Console.WriteLine(a);
var (amount, currency) = c;
Console.WriteLine($"{amount} {currency}");
public record Money(decimal Amount, string Currency);`,
          try: R`اعمل [[record Address(string City, string Street)]] و [[record Customer(string Name, Address Address, List<string> Tags)]]. اعمل عميلين بنفس القيم وقارنهم بـ [[==]]. هل النتيجة زي ما توقعت؟ وبعدين اعمل [[with]] وغيّر الـ Tags في النسخة وشوف الأصل.`,
          flag: "script",
          deep: {
            why: R`في JS بتقارن objects بـ [[JSON.stringify]] أو lodash، وبتنسخ بالـ spread. في C# الـ class العادية [[==]] بتاعها بيقارن الـ reference، فكتابة DTO بـ Equals و GetHashCode و ToString كانت ٥٠ سطر. الـ record بيعملهم كلهم، وبيشجّع immutability.`,
            how: R`الـ compiler بيولّد: properties بـ [[get; init;]]، و constructor، و [[Deconstruct]]، و [[Equals]] و [[GetHashCode]] على كل الحقول، و [[==]] و [[!=]]، و [[ToString]] بالشكل [[Money { Amount = 250, Currency = EGP }]]، و method مخفية للنسخ بيستخدمها [[with]].

الـ equality بتقارن كل property بـ [[Equals]] بتاعها. لو property نوعها record تانية يبقى المقارنة بالقيمة، لو [[List<T>]] يبقى بالـ reference. و [[with]] نسخة shallow: الـ list نفسها بتتشارك بين الأصل والنسخة.

[[record]] لوحدها = [[record class]] (reference type). و [[record struct]] نسخة value type. وتقدر تضيف methods و properties جوه الـ record عادي، وتعمل validation في constructor.`,
            when: R`DTOs و requests و responses في الـ API، و events و messages، و value objects (Money، DateRange)، ونتايج زي [[Result<T>]]. مش للـ entities في EF Core: الـ entity ليها identity (Id) وبتتغير، والـ record equality بالقيمة بتلخبط الـ change tracker.`,
            mistakes: R`record فيها [[List]] وتستنى إن [[==]] يقارن محتوى الـ list. و [[with]] وتفتكر إنها deep copy. واستخدام record كـ EF entity. وفي الانترفيو: «الفرق بين record و class؟» الـ equality بالقيمة، والـ immutability افتراضيًا، و [[with]]، و ToString جاهز.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف نوع للفلوس ([[Money]]) في سطر واحد كـ [[record]]، وبعدين يوريك اللي الـ record بيعمله لوحده: مقارنة بالقيمة، وطباعة مقروءة، ونسخة معدّلة بـ [[with]]، وفك القيم لمتغيرات. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. التعريف (آخر سطر)

~~~csharp money.cs
public record Money(decimal Amount, string Currency);
~~~

- [[record]]: class بس الـ compiler بيكتبلك حاجات كتير جاهزة.
- [[(decimal Amount, string Currency)]]: اسمها positional parameters. كل واحد بيبقى:
  - بارامتر في الـ constructor.
  - property عامة بنفس الاسم، [[{ get; init; }]]: تتقري، وتتكتب وقت الإنشاء بس.
- [[;]] في الآخر بدل [[{ }]]: مفيش جسم، السطر ده كفاية.

جرّبت [[a.Amount = 5;]] بعد الإنشاء:

~~~text الناتج: build
error CS8852: Init-only property or indexer 'Money.Amount' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.
~~~

يعني الـ record immutable: مبيتغيرش بعد ما يتعمل.

---

## ٢. المقارنة

~~~csharp money.cs
var a = new Money(100m, "EGP");
var b = new Money(100m, "EGP");
Console.WriteLine(a == b);
Console.WriteLine(ReferenceEquals(a, b));
~~~

~~~text الناتج
True
False
~~~

- [[a == b]]: الـ record بيعرّف [[==]] بنفسه: قارن كل property بالتانية. [[100 == 100]] و [[EGP == EGP]]، فـ [[True]]. (لو [[Money]] كانت class عادية كانت هتطلع [[False]]، درس value و reference.)
- [[ReferenceEquals(a, b)]]: سؤال تاني خالص: «هما نفس الـ object في الذاكرة؟» لأ، اتنين [[new]]، فـ [[False]].

وكمان [[a.GetHashCode() == b.GetHashCode()]] طلعت [[True]]. الـ hash code رقم بيتحسب من القيم، و [[Dictionary]] و [[HashSet]] بيستخدموه، فالـ record ينفع مفتاح فيهم من غير شغل.

---

## ٣. [[with]]

~~~csharp money.cs
var c = a with { Amount = 250m };
Console.WriteLine(c);
Console.WriteLine(a);
~~~

- [[a with { ... }]]: «اعمل نسخة جديدة من [[a]]، وغيّر فيها اللي بين الأقواس». زي [[{ ...a, amount: 250 }]] في JS.
- [[a]] نفسه مبيتغيرش، ده الهدف.

~~~text الناتج
Money { Amount = 250, Currency = EGP }
Money { Amount = 100, Currency = EGP }
~~~

الشكل ده هو الـ [[ToString]] اللي الـ record كتبه: اسم النوع وبعده كل property وقيمتها. وليه [[250]] مش [[250.00]]؟ لأن [[250m]] اتكتبت من غير خانات عشرية، والـ decimal بيطبع اللي اتكتب.

---

## ٤. الـ deconstruction

~~~csharp money.cs
var (amount, currency) = c;
Console.WriteLine($"{amount} {currency}");
~~~

- [[var (amount, currency) = c;]]: فك [[c]] لمتغيرين بالترتيب بتاع التعريف: [[Amount]] ثم [[Currency]]. زي [[const { amount, currency } = c]] في JS، بس بالترتيب مش بالاسم.
- ده شغال لأن الـ record عمل method مخفية اسمها [[Deconstruct]].

~~~text الناتج
250 EGP
~~~

---

## ٥. اللي الـ compiler كتبه من السطر الواحد

| الحاجة | بتعمل إيه | جرّبناها في |
|---|---|---|
| constructor | [[new Money(100m, "EGP")]] | ٢ |
| properties بـ [[init]] | قراية، ومفيش تعديل بعد الإنشاء | ١ |
| [[==]] و [[!=]] و [[Equals]] | مقارنة بالقيم | ٢ |
| [[GetHashCode]] | hash من القيم | ٢ |
| [[ToString]] | [[Money { Amount = ..., ... }]] | ٣ |
| نسخ لـ [[with]] | نسخة معدّلة | ٣ |
| [[Deconstruct]] | [[var (x, y) = ...]] | ٤ |

---

## ٦. التجربة: record جوه record، و List جوه record

~~~csharp sol.cs
var tags = new List<string> { "new" };
var c1 = new Customer("Sara", new Address("Cairo", "Tahrir"), tags);
var c2 = new Customer("Sara", new Address("Cairo", "Tahrir"), new List<string> { "new" });
Console.WriteLine(c1 == c2);
Console.WriteLine(c1.Address == c2.Address);
...
record Address(string City, string Street);
record Customer(string Name, Address Address, List<string> Tags);
~~~

- [[new List<string> { "new" }]]: list فيها عنصر واحد (الـ [[{ }]] هنا collection initializer).
- [[Address Address]]: property نوعها [[Address]] واسمها [[Address]]. عادي في C# الاسم والنوع يبقوا زي بعض.

~~~text الناتج
False
True
~~~

### ليه [[False]]؟

[[==]] بتاع [[Customer]] بيقارن كل property بالـ [[Equals]] بتاعها:

| الـ property | نوعها | المقارنة | النتيجة |
|---|---|---|---|
| [[Name]] | [[string]] | بالقيمة | متساويين |
| [[Address]] | record | بالقيمة | متساويين (السطر التاني [[True]]) |
| [[Tags]] | [[List<string>]] | class عادية، بالـ reference | listين مختلفين، **مش** متساويين |

ولما عملت [[c3]] بنفس الـ list [[tags]] بتاعة [[c1]]، [[c1 == c3]] طلعت [[True]]. وطباعة [[c1]] بتفضح الموضوع:

~~~text الناتج
Customer { Name = Sara, Address = Address { City = Cairo, Street = Tahrir }, Tags = System.Collections.Generic.List$__bt1[System.String] }
~~~

الـ List ملهاش [[ToString]] حلو، فبيطبع اسم نوعها بس.

### [[with]] نسخة سطحية (shallow)

~~~csharp sol.cs
var copy = c1 with { Name = "Omar" };
copy.Tags.Add("vip");
Console.WriteLine(string.Join(",", c1.Tags));
var safe = c1 with { Tags = [.. c1.Tags, "gold"] };
Console.WriteLine($"{c1.Tags.Count} {safe.Tags.Count}");
~~~

~~~text الناتج
new,vip
2 3
~~~

- [[with]] نسخ الـ properties واحدة واحدة. و [[Tags]] reference، فاتنسخ **العنوان**: [[copy.Tags]] و [[c1.Tags]] list واحدة. فلما ضفنا [["vip"]] في النسخة ظهرت في الأصل.
- [[string.Join(",", ...)]]: اربط العناصر بفاصلة، زي [[join]] في JS.
- [[[.. c1.Tags, "gold"]]]: collection expression فيها spread ([[..]] زي [[...]] في JS): list **جديدة** فيها القديم + gold. فـ [[c1]] فضل 2 والنسخة 3.

---

## الخلاصة

- [[record]] = class بيتقارن بالقيمة، و immutable، وطباعته مقروءة، وبيتنسخ بـ [[with]].
- المقارنة بالقيمة بتنزل جوه الـ records التانية، بس الـ List بتتقارن بالـ reference.
- [[with]] shallow: أي reference جوه بيتشارك بين الأصل والنسخة.`,
          lines: [
            "record بـ positional parameters.",
            "نفس القيم، object تاني.",
            R`[[True]]: مقارنة بالقيمة.`,
            R`[[False]]: هما objectين مختلفين في الذاكرة فعلًا.`,
            R`[[with]]: نسخة جديدة بـ Amount مختلف.`,
            R`[[Money { Amount = 250, Currency = EGP }]].`,
            "الأصل زي ما هو: 100.",
            R`deconstruction زي [[const { amount, currency } = c]].`,
            R`[[250 EGP]].`,
            "التعريف كله: سطر واحد."
          ],
          sol: R`العميلين هيطلعوا [[False]] مع إن كل القيم زي بعض. السبب: [[Address]] record فبتتقارن بالقيمة (تمام)، بس [[Tags]] نوعها [[List<string>]] وده class عادي، فبيتقارن بالـ reference، وكل عميل عنده list مختلفة. لو خليت الاتنين يشاوروا على نفس الـ list هتطلع [[True]].

وبعد [[var copy = c1 with { Name = "Omar" }; copy.Tags.Add("vip");]] هتلاقي [[c1.Tags]] فيها [[vip]] كمان، لأن [[with]] shallow: النسخة والأصل شايلين نفس الـ list. الحل: [[c1 with { Tags = [.. c1.Tags, "vip"] }]] يعمل list جديدة، أو تستخدم [[IReadOnlyList<string>]] وتمنع التعديل أصلًا.`,
          solCode: R`var tags = new List<string> { "new" };
var c1 = new Customer("Sara", new Address("Cairo", "Tahrir"), tags);
var c2 = new Customer("Sara", new Address("Cairo", "Tahrir"), new List<string> { "new" });
Console.WriteLine(c1 == c2);
Console.WriteLine(c1.Address == c2.Address);
var copy = c1 with { Name = "Omar" };
copy.Tags.Add("vip");
Console.WriteLine(string.Join(",", c1.Tags));
var safe = c1 with { Tags = [.. c1.Tags, "gold"] };
Console.WriteLine($"{c1.Tags.Count} {safe.Tags.Count}");
record Address(string City, string Street);
record Customer(string Name, Address Address, List<string> Tags);`
        },
        {
          cmd: "interface",
          title: "interface في C# غير TS: لازم الـ class تقول صراحة إنها بتطبقه",
          desc: R`في TS أي object ليه نفس الشكل بيعدّي (structural typing). في C# لأ: الـ class لازم تكتب [[: INotifier]] صراحة (nominal typing). لو فيه class عندها نفس الـ methods بالظبط بس مكتبتش كده، مش هتعدّي.

الـ interface عقد: أسماء methods و properties من غير تنفيذ. والكود بيعتمد على الـ interface مش على الـ class، فتقدر تبدّل التنفيذ (Email بـ SMS، أو fake في الاختبار). ودي الفكرة اللي الـ DI كله مبني عليها في المستوى ٢. الاسم بيبدأ بـ [[I]] بالعرف.

والـ [[enum]] قايمة قيم ثابتة بأسماء، ووراها أرقام.`,
          example: R`INotifier n = new EmailNotifier();
n.Send("sara@x.com", "hi");
Notify(new SmsNotifier(), "010", "code 1234");
Notify(new Duck(), "x", "y"); // error CS1503: cannot convert from 'Duck' to 'INotifier'
Console.WriteLine(Status.Paid);
Console.WriteLine((int)Status.Paid);
Console.WriteLine(Enum.Parse<Status>("Shipped"));
static void Notify(INotifier notifier, string to, string msg) => notifier.Send(to, msg);
public interface INotifier { void Send(string to, string message); }
public class EmailNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"email to {to}: {message}");
}
public class SmsNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"sms to {to}: {message}");
}
public class Duck { public void Send(string to, string message) { } }
public enum Status { Pending, Paid, Shipped }`,
          try: R`اعمل [[abstract class Shape]] فيها [[abstract double Area()]] و method عادية [[Describe()]] بترجع [[$"{GetType().Name}: {Area():0.00}"]]، وورّثها لـ [[Circle]] و [[Rect]]. اعمل [[List<Shape>]] فيها الاتنين واطبع [[Describe()]] لكل واحد. إمتى تختار abstract class بدل interface؟`,
          flag: "script",
          deep: {
            why: R`اللي جاي من TS بيتوقع إن أي حاجة بنفس الشكل تعدّي، ويتفاجئ بـ CS1503. الـ nominal typing قصده إن تطبيق العقد قرار واعي، مش صدفة إن اسمين اتشابهوا. والـ interfaces هي اللي بتخلي الـ DI والـ mocking في الاختبارات ممكنين.`,
            how: R`الـ class تقدر تورث class واحدة بس ([[: BaseClass]]) وتطبق أي عدد interfaces ([[: Base, IA, IB]]). الـ interface ممكن يبقى فيها default implementation (من C# 8) بس نادرًا ما بتستخدم في كود التطبيقات.

الـ [[abstract class]] ممكن يبقى فيها state (حقول) وكود مشترك و methods [[abstract]] لازم تتعمل [[override]]. و [[virtual]] method ليها تنفيذ افتراضي ممكن يتعمله [[override]]. و [[sealed]] بيمنع الوراثة. وفي C# الـ methods مش virtual افتراضيًا زي Java: لازم تكتب [[virtual]].

الـ [[enum]] وراه [[int]] (0 و 1 و 2 بالترتيب)، والـ cast [[(Status)5]] مسموح حتى لو القيمة مش موجودة، فافحص بـ [[Enum.IsDefined]]. ولما يتبعت JSON بيطلع رقم افتراضيًا، إلا لو استخدمت [[JsonStringEnumConverter]].`,
            when: R`interface لأي dependency ممكن يتبدل أو يتعمله mock (repository، email sender، payment gateway، clock). abstract class لما فيه كود مشترك حقيقي بين أنواع قريبة من بعض. ومتعملش interface لكل class «احتياطي»: class بتعمل حسابات بحتة ومالهاش side effects مش محتاجة.`,
            mistakes: R`interface لكل class بتطابقها واحد لواحد من غير سبب. ووراثة عميقة ٥ مستويات بدل composition. وتنسى [[override]] فتعمل method جديدة بتخبّي القديمة (warning CS0114). وفي الانترفيو: «interface ولا abstract class؟» interface عقد من غير state وتقدر تطبق كذا واحد، و abstract class فيها state وكود مشترك ووراثة واحدة بس.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف عقد اسمه [[INotifier]] («أي حد يقدر يبعت رسالة»)، واتنين بيطبقوه (Email و SMS)، ودالة بتشتغل مع أي واحد فيهم من غير ما تعرف مين. وفيه class اسمها [[Duck]] عندها نفس الـ method بالظبط بس **مقالتش** إنها بتطبق العقد، فالـ compiler بيرفضها. وفي الآخر [[enum]]. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. العقد: [[interface]]

~~~csharp notify.cs
public interface INotifier { void Send(string to, string message); }
~~~

- [[interface]]: قايمة methods (و properties) **من غير تنفيذ**. مجرد «لازم يبقى عندك كذا».
- [[INotifier]]: الـ [[I]] في الأول عرف في .NET لأي interface.
- [[void Send(string to, string message);]]: الـ method: اسمها وبارامتراتها ونوع رجوعها، وبعدها [[;]] على طول من غير [[{ }]]. ومفيش [[public]]: كل حاجة في الـ interface public لوحدها.

---

## ٢. اللي بيطبقوا العقد

~~~csharp notify.cs
public class EmailNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"email to {to}: {message}");
}
~~~

- [[: INotifier]]: الـ [[:]] بعد اسم الـ class معناها «بتطبق» (أو «بتورث» لو بعدها class). ده **التصريح** اللي الـ compiler مستنيه.
- [[public void Send(...)]]: لازم نفس الاسم والبارامترات ونوع الرجوع، ولازم [[public]]. لو نسيتها الـ compiler هيقولك إن الـ class مطبقتش العقد.

و [[SmsNotifier]] نفس الشكل بنص مختلف: تنفيذ تاني لنفس العقد.

---

## ٣. الاستخدام

~~~csharp notify.cs
INotifier n = new EmailNotifier();
n.Send("sara@x.com", "hi");
Notify(new SmsNotifier(), "010", "code 1234");
...
static void Notify(INotifier notifier, string to, string msg) => notifier.Send(to, msg);
~~~

- [[INotifier n = new EmailNotifier();]]: نوع المتغير هو الـ interface، والـ object من class بتطبقه. من خلال [[n]] تقدر تنادي اللي في العقد بس.
- [[n.Send(...)]]: الـ object الحقيقي Email، فبيتنفذ كود الـ Email.
- [[static void Notify(INotifier notifier, ...)]]: local function بتاخد **أي** [[INotifier]]. هي متعرفش ولا يهمها Email ولا SMS. و [[static]] هنا معناها إنها مش بتلمس متغيرات الكود اللي حواليها.

~~~text الناتج
email to sara@x.com: hi
sms to 010: code 1234
~~~

---

## ٤. [[Duck]]: نفس الشكل، مش نفس النوع

~~~csharp notify.cs
public class Duck { public void Send(string to, string message) { } }
Notify(new Duck(), "x", "y");
~~~

~~~text الناتج: dotnet run
i.cs(4,8): error CS1503: Argument 1: cannot convert from 'Duck' to 'INotifier'
The build failed. Fix the build errors and run again.
~~~

- [[Argument 1]]: أول argument في النداء.
- [[cannot convert from 'Duck' to 'INotifier']]: الدالة عايزة [[INotifier]]، و [[Duck]] مش واحد، حتى لو عندها [[Send]] بنفس الشكل.

| | TypeScript | C# |
|---|---|---|
| النظام | structural: الشكل هو اللي يفرق | nominal: الاسم هو اللي يفرق |
| [[Duck]] تعدّي؟ | أيوه | لأ، لازم [[: INotifier]] |

(الملف ده اسمه [[i.cs]] في التجربة، والسطر ده اتشال عشان الباقي يشتغل.)

---

## ٥. الـ [[enum]]

~~~csharp notify.cs
public enum Status { Pending, Paid, Shipped }
Console.WriteLine(Status.Paid);
Console.WriteLine((int)Status.Paid);
Console.WriteLine(Enum.Parse<Status>("Shipped"));
~~~

- [[enum]]: نوع قيمه أسماء ثابتة. ووراها أرقام [[int]] بالترتيب من 0: [[Pending = 0]] و [[Paid = 1]] و [[Shipped = 2]].
- [[Status.Paid]]: القيمة، ولما تتطبع بيطلع اسمها.
- [[(int)Status.Paid]]: الـ [[(int)]] قبل القيمة اسمه cast: «حوّلها لـ int».
- [[Enum.Parse<Status>("Shipped")]]: من نص لـ enum. والـ [[<Status>]] بتقول «لأنهي enum».

~~~text الناتج
Paid
1
Shipped
~~~

### فخّين جرّبتهم

~~~text الناتج
(Status)5                       ->  5
Enum.IsDefined((Status)5)       ->  False
Enum.Parse<Status>("Lost")      ->  System.ArgumentException: Requested value 'Lost' was not found.
~~~

الـ cast من رقم مبيفحصش أي حاجة: [[(Status)5]] اتعمل عادي وطبع [[5]]. فلو الرقم جاي من برّه افحصه بـ [[Enum.IsDefined]]. و [[Parse]] بنص غلط بيرمي exception، وفيه [[Enum.TryParse]] زي [[int.TryParse]].

---

## ٦. التجربة: [[abstract class]]

~~~csharp sol.cs
List<Shape> shapes = [new Circle(5), new Rect(2, 3)];
foreach (var s in shapes) Console.WriteLine(s.Describe());
public abstract class Shape
{
    public abstract double Area();
    public string Describe() => $"{GetType().Name}: {Area():0.00}";
}
public class Circle(double r) : Shape
{
    public override double Area() => Math.PI * r * r;
}
public class Rect(double w, double h) : Shape
{
    public override double Area() => w * h;
}
~~~

### [[public abstract class Shape]]

[[abstract]] على الـ class معناها «مينفعش تعمل منها object، دي أساس لغيرها». جرّبت [[new Shape()]]:

~~~text الناتج: build
error CS0144: Cannot create an instance of the abstract type or interface 'Shape'
~~~

### [[public abstract double Area();]]

method من غير جسم، وأي class بتورث لازم تكتبها. يعني جزء «عقد» زي الـ interface.

### [[public string Describe() => ...]]

method **ليها** تنفيذ، وكل الـ classes اللي بتورث بتاخدها جاهزة. ده الفرق الكبير عن الـ interface: كود مشترك.

- [[GetType().Name]]: اسم النوع الحقيقي للـ object وقت التشغيل ([[Circle]] مش [[Shape]]).
- [[{Area():0.00}]]: بينادي [[Area]]، واللي بيتنفذ نسخة الـ class الحقيقية. ده اسمه polymorphism.

### [[public class Circle(double r) : Shape]]

- [[: Shape]]: بتورث [[Shape]].
- [[public override double Area()]]: [[override]] معناها «دي نسختي من الـ method اللي في الأب». إجبارية في C#.
- [[Math.PI * r * r]]: π نق².

### [[List<Shape> shapes = [...]]]

list نوعها [[Shape]] وجواها [[Circle]] و [[Rect]]، وده مسموح لأن الاتنين [[Shape]]. و [[foreach (var s in shapes)]] بيلف عليهم واحد واحد.

~~~text الناتج
Circle: 78.54
Rect: 6.00
~~~

π × 5 × 5 = 78.539...، والـ [[:0.00]] قرّبها لـ [[78.54]]. و 2 × 3 = [[6.00]].

### لو نسيت [[override]]

كتبت [[public double Area() => r;]] في [[Circle]] من غير [[override]]:

~~~text الناتج: build
error CS0534: 'Circle' does not implement inherited abstract member 'Shape.Area()'
warning CS0114: 'Circle.Area()' hides inherited member 'Shape.Area()'. To make the current member override that implementation, add the override keyword. Otherwise add the new keyword.
~~~

الـ compiler فهمها method **جديدة** بالصدفة نفس الاسم، مش تنفيذ للـ abstract. ومع method [[virtual]] (ليها تنفيذ في الأب) بيطلع التحذير CS0114 بس، والبرنامج بيتبني، وده أخطر: نداء [[Name()]] على متغير نوعه [[Shape]] هيشغّل نسخة الأب.

---

## الخلاصة

| | [[interface]] | [[abstract class]] |
|---|---|---|
| فيها كود؟ | لأ (عمليًا) | أيوه، مشترك |
| فيها state (حقول)؟ | لأ | أيوه |
| الـ class تاخد كام واحد؟ | أي عدد | واحدة بس |
| التطبيق | [[: INotifier]] | [[: Shape]] + [[override]] |

- C# nominal: لازم تكتب [[: IName]]، الشكل لوحده مش كفاية.
- الكود يعتمد على الـ interface، فتقدر تبدّل التنفيذ.
- [[enum]] وراه أرقام، والـ cast مبيفحصش.`,
          lines: [
            "المتغير نوعه الـ interface، والـ object من class بتطبقه.",
            "بينادي تنفيذ الـ Email.",
            "أي class بتطبق INotifier تعدّي.",
            R`خطأ compile: [[Duck]] عندها نفس الـ method بس مكتبتش [[: INotifier]].`,
            R`[[Paid]]: اسم القيمة.`,
            R`[[1]]: الرقم اللي وراها.`,
            R`من string لـ enum: [[Shipped]].`,
            R`local function بتاخد الـ interface مش class معينة.`,
            "العقد: method من غير تنفيذ.",
            R`[[: INotifier]] صراحة.`,
            "بداية.",
            "التنفيذ.",
            "نهاية.",
            "تنفيذ تاني لنفس العقد.",
            "بداية.",
            "التنفيذ.",
            "نهاية.",
            "نفس الشكل بس مش بتطبق الـ interface.",
            "enum: Pending=0 و Paid=1 و Shipped=2."
          ],
          sol: R`الناتج: [[Circle: 78.54]] و [[Rect: 6.00]] (لو Circle بنص قطر 5 و Rect أبعاده 2 في 3). [[GetType().Name]] بيجيب اسم الـ class الحقيقية وقت التشغيل حتى لو المتغير نوعه [[Shape]]، و [[Area()]] بينادي الـ override الصح (polymorphism).

لو نسيت [[override]] في [[Circle]] هيطلع error CS0534: 'Circle' does not implement inherited abstract member. ولو حاولت [[new Shape()]] هيطلع CS0144 لأن الـ abstract مينفعش يتعمل منه object.

الـ abstract class هنا منطقية لأن [[Describe]] كود مشترك. لو مفيش كود مشترك، interface [[IShape]] أبسط، والـ class تقدر تطبق كذا interface لكن تورث class واحدة بس.`,
          solCode: R`List<Shape> shapes = [new Circle(5), new Rect(2, 3)];
foreach (var s in shapes) Console.WriteLine(s.Describe());
public abstract class Shape
{
    public abstract double Area();
    public string Describe() => $"{GetType().Name}: {Area():0.00}";
}
public class Circle(double r) : Shape
{
    public override double Area() => Math.PI * r * r;
}
public class Rect(double w, double h) : Shape
{
    public override double Area() => w * h;
}`
        }
      ]
    }
]);
