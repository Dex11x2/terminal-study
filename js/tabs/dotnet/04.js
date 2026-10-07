// تكملة تاب dotnet: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dotnet/01.js (شرح حقول الدرس في أوله)
MORE("dotnet", [
    {
      t: "Collections و generics و LINQ",
      l: 1,
      n: "List و Dictionary بدل arrays و objects، و generics زي TS، و LINQ بدل map و filter",
      items: [
        {
          cmd: "List و Dictionary",
          title: "List و Dictionary و HashSet: إيه اللي بيقابل array و object و Set في JS؟",
          desc: R`الـ array في C# ([[int[]]]) حجمه ثابت. اللي بيقابل array الـ JS هو [[List<T>]]: بيكبر ويصغر، و [[Add]] بدل [[push]] و [[Count]] بدل [[length]]. و [[Dictionary<TKey, TValue>]] بيقابل [[Map]] أو object بتستخدمه كـ lookup. و [[HashSet<T>]] بيقابل [[Set]].

من C# 12 فيه collection expressions: [[List<string> names = ["sara", "omar"];]] و [[int[] scores = [90, 75];]] زي JS بالظبط، و [[[.. a, .. b]]] زي الـ spread.

أهم فرق: [[dict["x"]]] لمفتاح مش موجود بيرمي [[KeyNotFoundException]] مش بيرجع undefined. استخدم [[TryGetValue]].`,
          example: R`List<string> names = ["sara", "omar"];
names.Add("mona");
int[] scores = [90, 75, 88];
var stock = new Dictionary<string, int> { ["apple"] = 5, ["pear"] = 0 };
stock["kiwi"] = 12;
if (stock.TryGetValue("apple", out var qty)) Console.WriteLine($"apple: {qty}");
Console.WriteLine(stock.ContainsKey("mango"));
var tags = new HashSet<string> { "c#", "dotnet" };
Console.WriteLine(tags.Add("c#"));
Console.WriteLine($"{names.Count} {scores.Length} {stock.Count} {tags.Count}");
Console.WriteLine(string.Join(", ", names));
Console.WriteLine(stock["mango"]);`,
          try: R`اكتب برنامج بيعد تكرار كل كلمة في جملة ([["the cat and the hat and the bat"]]) في [[Dictionary<string, int>]]، واطبع الكلمات مرتبة من الأكتر للأقل. جرّب تكتبه بـ [[TryGetValue]]، وبعدين بـ [[CollectionsMarshal.GetValueRefOrAddDefault]] لو عايز تتحدى نفسك.`,
          flag: "script",
          deep: {
            why: R`هتستخدم الأنواع دي في كل endpoint: نتايج queries في List، و lookup بالـ Id في Dictionary عشان تتجنب لوب جوه لوب، و HashSet لفحص «موجود ولا لأ» بسرعة. واختيار الغلط هو أشهر سبب لكود بطيء (O(n²)).`,
            how: R`[[List<T>]] من جوه array بيتضاعف حجمه لما يتملى، فالـ [[Add]] في المتوسط O(1)، والبحث بـ [[Contains]] O(n). [[Dictionary]] و [[HashSet]] hash tables: البحث والإضافة O(1) في المتوسط، والمفتاح لازم يكون ليه [[GetHashCode]] و [[Equals]] سليمين (الـ string و int و record تمام).

[[TryGetValue(key, out var value)]] بيعمل lookup واحد ويرجع bool، أحسن من [[ContainsKey]] ثم [[dict[key]]] (lookupين). و [[GetValueOrDefault]] بيرجع default لو مش موجود. والإضافة بـ [[dict[key] = v]] بتكتب فوق القديم، و [[dict.Add(key, v)]] بترمي لو المفتاح موجود.

الترتيب: [[Dictionary]] مش بيضمن ترتيب (عمليًا بيحافظ على ترتيب الإضافة لو مفيش حذف، بس متعتمدش عليه). لو محتاج ترتيب: [[SortedDictionary]] أو رتّب بـ LINQ. وفيه كمان [[Queue<T>]] و [[Stack<T>]] و [[PriorityQueue]] جاهزين.

وللقيم اللي مش هتتغير: [[IReadOnlyList<T>]] كنوع رجوع، أو [[FrozenDictionary]] للـ lookups الثابتة اللي بتتقري كتير.`,
            when: R`List للقوايم العادية، و array لما الحجم ثابت أو للأداء، و Dictionary لأي lookup بمفتاح، و HashSet للعضوية وشيل التكرار. وكنوع parameter خد [[IEnumerable<T>]] أو [[IReadOnlyList<T>]] بدل [[List<T>]] عشان تقبل أي collection.`,
            mistakes: R`[[dict[key]]] على مفتاح ممكن ميبقاش موجود. و [[list.Contains]] جوه loop على list كبيرة (حوّلها HashSet). وتعدّل List وانت بتلف عليها بـ foreach: [[InvalidOperationException: Collection was modified]]. وتنسى إن [[List]] reference type فلو رجعتها من class أي حد يقدر يعدّل فيها.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيستخدم الـ ٤ collections اللي هتقابلهم كل يوم: [[List]] (قايمة بتكبر)، و array (حجمها ثابت)، و [[Dictionary]] (مفتاح وقيمة)، و [[HashSet]] (قيم من غير تكرار). وفي الآخر بيوريك إيه اللي بيحصل لو طلبت مفتاح مش موجود. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. [[List<string>]]

~~~csharp collections.cs
List<string> names = ["sara", "omar"];
names.Add("mona");
~~~

- [[List<string>]]: list عناصرها [[string]]. الـ [[<string>]] اسمه type argument: بيقول نوع العناصر (ليه درس generics). وأي حاجة مش string مش هتدخل.
- [[["sara", "omar"]]]: collection expression (C# 12): نفس شكل array في JS.
- [[names.Add("mona")]]: ضيف في الآخر، زي [[push]].

---

## ٢. array: [[int[]]]

~~~csharp collections.cs
int[] scores = [90, 75, 88];
~~~

[[int[]]] array من [[int]]، وحجمها **ثابت** على ٣. مفيش [[Add]]. ولو كتبت في خانة مش موجودة:

~~~text الناتج: scores[3] = 1
IndexOutOfRangeException: Index was outside the bounds of the array.
~~~

في JS ده كان هيكبّر الـ array بهدوء.

---

## ٣. [[Dictionary<string, int>]]

~~~csharp collections.cs
var stock = new Dictionary<string, int> { ["apple"] = 5, ["pear"] = 0 };
stock["kiwi"] = 12;
~~~

- [[Dictionary<string, int>]]: المفاتيح [[string]] والقيم [[int]]. زي [[Map]] في JS.
- [[new ... { ["apple"] = 5, ... }]]: اسمه index initializer: أول قيم وقت الإنشاء.
- [[stock["kiwi"] = 12;]]: لو المفتاح مش موجود يتضاف، ولو موجود يتكتب فوقه.

### [[TryGetValue]]

~~~csharp collections.cs
if (stock.TryGetValue("apple", out var qty)) Console.WriteLine($"apple: {qty}");
~~~

- [[TryGetValue("apple", out var qty)]]: دوّر على المفتاح. لو لقيته حط القيمة في [[qty]] ورجّع [[true]]، لو لأ رجّع [[false]].
- [[out var qty]]: [[out]] معناها «الدالة هتكتب في المتغير ده»، و [[var qty]] بتعرّفه هنا.

~~~text الناتج
apple: 5
~~~

### [[ContainsKey]]

~~~csharp collections.cs
Console.WriteLine(stock.ContainsKey("mango"));
~~~

~~~text الناتج
False
~~~

بيسأل بس، من غير ما يجيب القيمة.

---

## ٤. [[HashSet<string>]]

~~~csharp collections.cs
var tags = new HashSet<string> { "c#", "dotnet" };
Console.WriteLine(tags.Add("c#"));
~~~

- [[HashSet]]: مجموعة من غير تكرار، زي [[Set]] في JS.
- [[tags.Add("c#")]]: بيرجع [[bool]]: اتضاف ولا لأ. [["c#"]] موجود أصلًا:

~~~text الناتج
False
~~~

---

## ٥. الأعداد

~~~csharp collections.cs
Console.WriteLine($"{names.Count} {scores.Length} {stock.Count} {tags.Count}");
~~~

~~~text الناتج
3 3 3 2
~~~

| المتغير | العدد | ليه |
|---|---|---|
| [[names.Count]] | 3 | sara و omar و mona |
| [[scores.Length]] | 3 | الـ array بتستخدم [[Length]] مش [[Count]] |
| [[stock.Count]] | 3 | apple و pear و kiwi |
| [[tags.Count]] | 2 | [["c#"]] التانية متضافتش |

---

## ٦. [[string.Join]]

~~~csharp collections.cs
Console.WriteLine(string.Join(", ", names));
~~~

~~~text الناتج
sara, omar, mona
~~~

اربط العناصر بالفاصل ده، زي [[names.join(", ")]] في JS.

---

## ٧. المفتاح اللي مش موجود

~~~csharp collections.cs
Console.WriteLine(stock["mango"]);
~~~

~~~text الناتج
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'mango' was not present in the dictionary.
   at System.Collections.Generic.Dictionary$__bt2.get_Item(TKey key)
   at Program.<Main>$(String[] args) in /w/l12/c.cs:line 12
~~~

في JS كان هيرجع [[undefined]]. هنا exception والبرنامج وقع. و [[get_Item]] هو الاسم الداخلي للـ [[[ ]]] (اسمه indexer).

### بدايل جرّبتها

| الكود | الناتج |
|---|---|
| [[stock.GetValueOrDefault("mango")]] | [[0]] (الـ default بتاع int) |
| [[stock.Add("apple", 1)]] والمفتاح موجود | [[ArgumentException: An item with the same key has already been added. Key: apple]] |
| [[stock["apple"] = 1]] والمفتاح موجود | بيكتب فوقه عادي |

وغلطة مشهورة: تضيف في list وانت بتلف عليها بـ [[foreach]]:

~~~text الناتج
InvalidOperationException: Collection was modified; enumeration operation may not execute.
~~~

---

## ٨. التجربة: عدّ الكلمات

~~~csharp sol.cs
var text = "the cat and the hat and the bat";
var counts = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
    counts[word] = counts.TryGetValue(word, out var c) ? c + 1 : 1;
~~~

- [[text.Split(' ')]]: قسّم النص عند كل مسافة، والنتيجة [[string[]]]. والـ [[' ']] بعلامة واحدة نوعها [[char]] (حرف واحد)، مش [[string]].
- [[foreach (var word in ...)]]: لكل كلمة.
- [[counts.TryGetValue(word, out var c) ? c + 1 : 1]]: لو الكلمة موجودة خد عددها + 1، لو لأ 1.
- [[counts[word] = ...]]: اكتب النتيجة.

~~~csharp sol.cs
foreach (var (word, n) in counts.OrderByDescending(kv => kv.Value))
    Console.WriteLine($"{word}: {n}");
~~~

- [[OrderByDescending(kv => kv.Value)]]: من LINQ: رتّب من الأكبر للأصغر حسب القيمة. كل عنصر في الـ Dictionary اسمه [[KeyValuePair]] (هنا [[kv]]) فيه [[Key]] و [[Value]].
- [[var (word, n)]]: فك الـ [[KeyValuePair]] لمتغيرين.

~~~text الناتج
the: 3
and: 2
cat: 1
hat: 1
bat: 1
~~~

[[cat]] و [[hat]] و [[bat]] نفس العدد، وفضلوا بترتيب ظهورهم لأن [[OrderByDescending]] stable (مبيبدّلش المتساويين).

### التحدي: [[CollectionsMarshal.GetValueRefOrAddDefault]]

~~~csharp sol.cs
using System.Runtime.InteropServices;
...
foreach (var word in text.Split(' '))
    CollectionsMarshal.GetValueRefOrAddDefault(fast, word, out _)++;
Console.WriteLine(fast["the"]);
~~~

- [[using System.Runtime.InteropServices;]]: الـ namespace ده مش من الـ implicit usings، فلازم يتكتب في أول الملف.
- [[GetValueRefOrAddDefault]]: لو المفتاح مش موجود ضيفه بـ 0، ورجّع **reference** للقيمة نفسها جوه الـ Dictionary (مش نسخة).
- [[out _]]: الـ method بترجع كمان bool «كان موجود؟»، و [[_]] معناها «مش محتاجه».
- [[++]]: زوّد واحد على القيمة اللي جوه الـ Dictionary على طول.

~~~text الناتج
3
~~~

الفرق: النسخة الأولى بتدوّر على الكلمة مرتين (قراية وكتابة)، ودي مرة واحدة.

---

## الخلاصة

| C# | JS | ملاحظة |
|---|---|---|
| [[List<T>]] | array | [[Add]] و [[Count]] |
| [[T[]]] | array بحجم ثابت | [[Length]] |
| [[Dictionary<K, V>]] | [[Map]] | مفتاح مش موجود = exception |
| [[HashSet<T>]] | [[Set]] | [[Add]] بيرجع bool |

- اقرا من Dictionary بـ [[TryGetValue]] أو [[GetValueOrDefault]] لو المفتاح ممكن ميبقاش موجود.
- متعدّلش collection وانت بتلف عليها بـ foreach.`,
          lines: [
            R`collection expression بيعمل List.`,
            R`زي [[push]].`,
            "array: حجمه ثابت.",
            "Dictionary بـ initializer.",
            "إضافة أو كتابة فوق.",
            R`lookup آمن: [[apple: 5]].`,
            R`[[False]].`,
            "HashSet: من غير تكرار.",
            R`[[False]]: كان موجود فمتضافش.`,
            R`[[3 3 3 2]]: List بـ Count و array بـ Length.`,
            R`زي [[names.join(", ")]].`,
            R`[[KeyNotFoundException]]: مفيش undefined في C#.`
          ],
          sol: R`الناتج: [[the: 3]] و [[and: 2]] و [[cat: 1]] و [[hat: 1]] و [[bat: 1]] (الكلمات اللي ليها نفس العدد ترتيبها بيمشي على ترتيب ظهورها، لأن [[OrderByDescending]] stable).

الفكرة: [[counts[word] = counts.TryGetValue(word, out var c) ? c + 1 : 1;]] lookup للقراية وواحد للكتابة. النسخة بـ [[CollectionsMarshal.GetValueRefOrAddDefault(counts, word, out _)++]] بتعمل lookup واحد بس وبتزوّد الرقم مكانه (ref)، ودي اللي بتتكتب في الكود الحساس للأداء. لو استخدمت [[counts[word]++]] على طول هتاخد [[KeyNotFoundException]] أول مرة.`,
          solCode: R`using System.Runtime.InteropServices;
var text = "the cat and the hat and the bat";
var counts = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
    counts[word] = counts.TryGetValue(word, out var c) ? c + 1 : 1;
foreach (var (word, n) in counts.OrderByDescending(kv => kv.Value))
    Console.WriteLine($"{word}: {n}");
var fast = new Dictionary<string, int>();
foreach (var word in text.Split(' '))
    CollectionsMarshal.GetValueRefOrAddDefault(fast, word, out _)++;
Console.WriteLine(fast["the"]);`
        },
        {
          cmd: "generics",
          title: "Generics و where: نفس فكرة <T> في TS بس بتفضل موجودة وقت التشغيل",
          desc: R`[[List<T>]] و [[Dictionary<TKey, TValue>]] generics. وتقدر تعمل بتوعك: [[Result<T>]] بيشيل قيمة من أي نوع، و [[Repo<T>]] بيتعامل مع أي entity.

الـ constraints بـ [[where]] بدل [[extends]] في TS: [[where T : IComparable<T>]] يعني T لازم تقدر تتقارن، و [[where T : class]] reference type، و [[where T : new()]] ليها constructor فاضي.

الفرق عن TS: الـ generics مش بتتمسح. [[List<int>]] و [[List<string>]] نوعين مختلفين فعلًا وقت التشغيل، و [[typeof(T)]] بيشتغل.`,
          example: R`var r1 = Result<int>.Ok(42);
var r2 = Result<int>.Fail("not found");
Console.WriteLine(r1);
Console.WriteLine(r2);
Console.WriteLine(Max([3, 9, 2]));
Console.WriteLine(Max(["b", "z", "a"]));
var repo = new Repo<Product>();
repo.Add(new Product { Id = 1, Name = "Pen" });
Console.WriteLine(repo.Find(1)?.Name);
static T Max<T>(IEnumerable<T> items) where T : IComparable<T>
{
    T best = items.First();
    foreach (var x in items) if (x.CompareTo(best) > 0) best = x;
    return best;
}
public record Result<T>(bool Success, T? Value, string? Error)
{
    public static Result<T> Ok(T value) => new(true, value, null);
    public static Result<T> Fail(string error) => new(false, default, error);
}
public interface IEntity { int Id { get; } }
public class Product : IEntity { public int Id { get; init; } public string Name { get; init; } = ""; }
public class Repo<T> where T : class, IEntity
{
    private readonly Dictionary<int, T> _items = [];
    public void Add(T item) => _items[item.Id] = item;
    public T? Find(int id) => _items.GetValueOrDefault(id);
}`,
          try: R`بص على ناتج [[r2]]: [[Value = 0]] مش null مع إن النوع [[T?]]. ليه؟ وبعدين جرّب [[Max(new[] { new object(), new object() })]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`من غير generics كنت هتكتب [[IntResult]] و [[StringResult]]، أو تستخدم [[object]] وتعمل cast في كل حتة وتخسر الفحص. الـ generics بتديك كود واحد مع أنواع كاملة، وده اللي [[List<T>]] و [[Task<T>]] و [[DbSet<T>]] و [[ILogger<T>]] بيعملوه في كل حتة.`,
            how: R`الـ CLR بيعرف الـ generics (reification). لـ value types زي [[int]] بيعمل نسخة كود مخصصة، فمفيش boxing و [[List<int>]] سريعة. ولـ reference types بيشارك نسخة واحدة.

[[T?]] محتاجة انتباه: لو T غير مقيدة، [[T?]] على [[int]] مش بتبقى [[int?]]، هي [[int]] عادي، و [[default]] = 0. لأن الـ compiler مش عارف T هتبقى value ولا reference. لو عايز null حقيقي للـ value types اعمل constraint [[where T : struct]] وابقى استخدم [[T?]]، أو خليه [[where T : class]].

الـ constraints بتفتحلك methods على T: من غير [[IComparable<T>]] مينفعش تنادي [[CompareTo]]. و [[default]] (أو [[default(T)]]) بيرجع 0 أو null حسب النوع. والـ type inference بيستنتج T من الـ arguments، فـ [[Max([3, 9, 2])]] من غير [[Max<int>]].`,
            when: R`لما تلاقي نفسك بتنسخ class أو method وبتغيّر النوع بس. [[Result<T>]] و repositories و helpers للـ pagination ([[PagedResult<T>]]). ومتعملش generic لحاجة ليها نوع واحد بس «احتياطي».`,
            mistakes: R`تفتكر إن [[T?]] دايمًا nullable. و generic repository فوق EF Core بيخبّي LINQ ويخليك تكتب methods لكل query (الـ DbSet نفسه repository). وتنسى الـ constraint وتحاول تنادي method على T فيطلع CS1061 (ومع [[CompareTo]] بالذات على .NET 10 الرسالة بتبقى CS7036 عن [[MemoryExtensions.CompareTo]]، لأن الـ compiler بيلاقي extension method بنفس الاسم ومبتنفعش، فمتتلخبطش من الرسالة).`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٣ حاجات generic (يعني بتشتغل مع أي نوع تختاره): record اسمه [[Result<T>]] بيشيل نتيجة نجاح أو فشل، ودالة [[Max<T>]] بتجيب أكبر عنصر من أي حاجة تتقارن، و [[Repo<T>]] بيخزن أي entity بالـ Id بتاعها. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. يعني إيه [[<T>]]؟

[[T]] اسمه **type parameter**: مكان فاضي لنوع، بيتملي لما تستخدم الحاجة. زي بارامتر الدالة بالظبط، بس بدل ما يستقبل قيمة بيستقبل نوع. فـ [[Result<int>]] يعني «Result و T فيه = int». والاسم [[T]] عرف (Type)، وممكن [[TKey]] و [[TValue]] لو أكتر من واحد.

---

## ٢. [[Result<T>]]

~~~csharp generics.cs
public record Result<T>(bool Success, T? Value, string? Error)
{
    public static Result<T> Ok(T value) => new(true, value, null);
    public static Result<T> Fail(string error) => new(false, default, error);
}
~~~

- [[record Result<T>(...)]]: record (درس record) ليه type parameter.
- [[T? Value]]: القيمة، نوعها T. والـ [[?]] هنا فيها فخ، شوف القسم ٣.
- [[string? Error]]: رسالة الخطأ، ممكن null.
- [[public static Result<T> Ok(T value)]]: [[static]] بتتنادي على النوع نفسه [[Result<int>.Ok(...)]]. ودي اسمها factory method: method بتعمل object بدل ما تكتب [[new]] بإيدك.
- [[=> new(true, value, null)]]: [[new(...)]] من غير اسم النوع اسمها target-typed new: الـ compiler عارف النوع من نوع الرجوع.
- [[default]]: «القيمة الافتراضية لـ T»: [[0]] لـ int، و [[null]] لأي reference type، و [[false]] لـ bool.

~~~csharp generics.cs
var r1 = Result<int>.Ok(42);
var r2 = Result<int>.Fail("not found");
Console.WriteLine(r1);
Console.WriteLine(r2);
~~~

~~~text الناتج
Result { Success = True, Value = 42, Error =  }
Result { Success = False, Value = 0, Error = not found }
~~~

[[Error =  ]] فاضية لأنها null. بس [[Value = 0]] في الفشل؟ ده سؤال التجربة.

---

## ٣. التجربة: ليه [[Value = 0]] مش null؟

[[T?]] على T **من غير قيود** بيتعامل كده:

| T | [[T?]] بقى | [[default]] |
|---|---|---|
| [[string]] (reference) | [[string?]]: ملاحظة null للـ compiler | [[null]] |
| [[int]] (value) | [[int]] عادي، **مش** [[int?]] | [[0]] |

ليه؟ لأن [[int?]] نوع تاني خالص ([[Nullable<int>]])، و [[string?]] هو [[string]] نفسه (درس nullable). والـ compiler وهو بيكتب [[Result<T>]] مش عارف T هيبقى أنهي واحد، فـ [[?]] بيبقى ملاحظة بس ومبيغيّرش النوع. جرّبت:

~~~text الناتج
Result<string>.Fail("x")  ->  Result { Success = False, Value = , Error = x }
Result<int?>.Fail("x")    ->  Result { Success = False, Value = , Error = x }
~~~

مع [[string]] ومع [[int?]] بقت null فعلًا.

---

## ٤. [[Max<T>]] و [[where]]

~~~csharp generics.cs
static T Max<T>(IEnumerable<T> items) where T : IComparable<T>
{
    T best = items.First();
    foreach (var x in items) if (x.CompareTo(best) > 0) best = x;
    return best;
}
~~~

### السطر الأول من الشمال لليمين

- [[static T]]: بترجع قيمة من نوع T.
- [[Max<T>]]: generic method: الـ [[<T>]] بعد الاسم.
- [[IEnumerable<T> items]]: أي حاجة تتلف عليها بـ foreach وعناصرها T (list أو array أو غيرهم).
- [[where T : IComparable<T>]]: **القيد** (constraint): T لازم يطبق interface اسمه [[IComparable<T>]]، يعني عنده method [[CompareTo]]. زي [[T extends ...]] في TS.

### الجسم

- [[items.First()]]: أول عنصر (من LINQ).
- [[x.CompareTo(best)]]: بترجع رقم: أكبر من 0 لو [[x]] أكبر، و 0 لو متساويين، وأقل من 0 لو أصغر. ومسموح ننادي [[CompareTo]] بس **بسبب** القيد.

~~~csharp generics.cs
Console.WriteLine(Max([3, 9, 2]));
Console.WriteLine(Max(["b", "z", "a"]));
~~~

~~~text الناتج
9
z
~~~

مكتبناش [[Max<int>]]: الـ compiler استنتج T من الـ argument (type inference). و [[int]] و [[string]] الاتنين بيطبقوا [[IComparable]]، والـ string بتتقارن أبجديًا.

### القيد بيمنع إيه؟

~~~text الناتج: Max(new[] { new object(), new object() })
error CS0311: The type 'object' cannot be used as type parameter 'T' in the generic type or method 'Max<T>(IEnumerable<T>)'. There is no implicit reference conversion from 'object' to 'System.IComparable<object>'.
~~~

[[object]] مش بيعرف يتقارن، فاترفض **وقت الـ compile**. ولو شلت القيد خالص، الـ compiler هيرفض [[a.CompareTo(b)]] نفسها، لأن T ممكن يبقى أي حاجة. جرّبت [[a.Length]] على T من غير قيد:

~~~text الناتج
error CS1061: 'T' does not contain a definition for 'Length' ...
~~~

---

## ٥. [[Repo<T>]] بقيدين

~~~csharp generics.cs
public interface IEntity { int Id { get; } }
public class Product : IEntity { public int Id { get; init; } public string Name { get; init; } = ""; }
public class Repo<T> where T : class, IEntity
{
    private readonly Dictionary<int, T> _items = [];
    public void Add(T item) => _items[item.Id] = item;
    public T? Find(int id) => _items.GetValueOrDefault(id);
}
~~~

- [[IEntity]]: عقد: أي حاجة ليها [[Id]].
- [[where T : class, IEntity]]: قيدين بفاصلة: T لازم reference type ([[class]]) **و** بيطبق [[IEntity]].
- [[private readonly Dictionary<int, T> _items = [];]]: [[readonly]] معناها المتغير ده ميتشاورش على dictionary تاني بعد الإنشاء (بس محتواه يتغير عادي). و [[[]]] هنا dictionary فاضي. والـ [[_]] في أول الاسم عرف للحقول الـ private.
- [[item.Id]]: مسموح لأن القيد قال إن T فيه [[Id]].
- [[T? Find(...)]]: هنا الـ [[?]] معناها null فعلًا، لأن قيد [[class]] بيقول إن T reference type.

~~~csharp generics.cs
var repo = new Repo<Product>();
repo.Add(new Product { Id = 1, Name = "Pen" });
Console.WriteLine(repo.Find(1)?.Name);
~~~

~~~text الناتج
Pen
~~~

و [[repo.Find(2)?.Name ?? "null"]] طبعت [[null]]. ولو جرّبت [[new Repo<string>()]]:

~~~text الناتج: build
error CS0311: The type 'string' cannot be used as type parameter 'T' in the generic type or method 'Repo<T>'. There is no implicit reference conversion from 'string' to 'IEntity'.
~~~

---

## ٦. الـ generics موجودة وقت التشغيل

~~~csharp
Console.WriteLine(typeof(List<int>) == typeof(List<string>));
~~~

~~~text الناتج
False
~~~

[[typeof(X)]] بيرجع معلومات النوع. [[List<int>]] و [[List<string>]] نوعين مختلفين فعلًا وقت التشغيل. في TS الاتنين بيبقوا array عادي بعد الـ compile.

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[class Repo<T>]] | class ليها type parameter |
| [[T Max<T>(...)]] | method ليها type parameter |
| [[where T : IComparable<T>]] | T لازم يطبق ده |
| [[where T : class]] | T لازم reference type |
| [[where T : struct]] | T لازم value type |
| [[where T : new()]] | T ليه constructor فاضي |
| [[default]] | 0 أو null أو false حسب T |

- القيد هو اللي بيسمحلك تنادي methods على T، وبيرفض الأنواع الغلط وقت الـ compile.
- [[T?]] من غير قيد مع value type مش nullable.`,
          lines: [
            "generic record بـ int.",
            "نفس النوع بحالة فشل.",
            R`[[Result { Success = True, Value = 42, Error =  }]].`,
            R`[[Value = 0]]: شوف الـ try.`,
            R`[[9]]: T اتستنتج int.`,
            R`[[z]]: نفس الدالة مع string.`,
            "repo لنوع معيّن.",
            "إضافة.",
            R`[[Pen]].`,
            R`generic method، و [[where]] بيضمن إن T فيها [[CompareTo]].`,
            "بداية.",
            "أول عنصر كبداية.",
            "loop و مقارنة.",
            "الأكبر.",
            "نهاية.",
            R`generic record: [[T?]] للقيمة.`,
            "بداية.",
            R`factory method: [[new(...)]] من غير اسم النوع (target-typed).`,
            R`[[default]]: صفر أو null حسب T.`,
            "نهاية.",
            "interface فيه Id.",
            "entity بتطبقه.",
            R`قيدين: reference type وبيطبق IEntity.`,
            "بداية.",
            R`[[readonly]]: المتغير ميتغيرش بعد الإنشاء (المحتوى يتغير عادي).`,
            R`[[item.Id]] مسموح بسبب الـ constraint.`,
            R`[[GetValueOrDefault]]: null لو مش موجود.`,
            "نهاية."
          ],
          sol: R`[[Value = 0]] لأن [[T?]] مع T غير مقيدة، لما T تبقى [[int]]، معناها [[int]] عادي مش [[int?]]. الـ [[?]] هنا annotation للـ reference types بس، و [[default]] لـ int هو 0. لو غيّرت الـ record لـ [[Result<int?>]] أو قيدته [[where T : struct]] مع [[T?]] هتلاقي [[Value = ]] (null).

[[Max(new[] { new object(), new object() })]] بيطلّع [[error CS0311: The type 'object' cannot be used as type parameter 'T' in the generic type or method 'Max<T>(IEnumerable<T>)'. There is no implicit reference conversion from 'object' to 'System.IComparable<object>'.]] الـ constraint بيمنعك في الـ compile، مش وقت التشغيل.`
        },
        {
          cmd: "LINQ",
          title: "LINQ: Where و Select و GroupBy بدل filter و map و reduce",
          desc: R`LINQ هو map و filter و reduce بتوع JS، بس أكتر بكتير ومتاح على أي collection. الأسماء مختلفة: [[Where]] = filter، و [[Select]] = map، و [[Aggregate]] = reduce، و [[OrderBy]] = sort من غير ما يعدّل الأصل، و [[Any]] = some، و [[All]] = every، و [[FirstOrDefault]] = find.

وفيه حاجات مش موجودة في JS جاهزة: [[GroupBy]] و [[Sum]] و [[Max]] و [[DistinctBy]] و [[Chunk]] و [[ToDictionary]]. ونفس الكلام بيشتغل على قاعدة البيانات مع EF Core وبيتحول لـ SQL (المستوى ٢).`,
          example: R`Order[] orders =
[
    new(1, "sara", 120m, "Paid"),
    new(2, "omar", 80m, "Pending"),
    new(3, "sara", 45m, "Paid"),
    new(4, "mona", 300m, "Paid"),
];
var bigPaid = orders
    .Where(o => o.Status == "Paid" && o.Total > 50)
    .OrderByDescending(o => o.Total)
    .Select(o => new { o.Id, o.Customer });
foreach (var o in bigPaid) Console.WriteLine(o);
var perCustomer = orders
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Count = g.Count(), Sum = g.Sum(o => o.Total) });
foreach (var row in perCustomer) Console.WriteLine(row);
Console.WriteLine(orders.Any(o => o.Total > 250));
Console.WriteLine(orders.FirstOrDefault(o => o.Customer == "ali")?.Id ?? -1);
Console.WriteLine(orders.Sum(o => o.Total));
record Order(int Id, string Customer, decimal Total, string Status);`,
          try: R`بنفس الـ orders: (١) اطبع أعلى عميل في المدفوع ([[Paid]]) وإجماليه. (٢) اعمل [[Dictionary<string, decimal>]] من العميل لإجمالي طلباته بـ [[ToDictionary]]. (٣) قسّم الطلبات لصفحات كل صفحة ٢ بـ [[Chunk(2)]] واطبع كل صفحة.`,
          flag: "script",
          deep: {
            why: R`أغلب كود الـ backend تحويل داتا: فلترة وتجميع وتحويل لـ DTO. LINQ بيخليه declarative ومقروء، ونفس الأسلوب بيشتغل على List في الذاكرة وعلى جدول في Postgres. لو اتعلمته كويس هنا هتكتب queries الـ EF Core من غير ما تفكر.`,
            how: R`LINQ عبارة عن extension methods على [[IEnumerable<T>]] (الدرس الجاي بيشرح يعني إيه). كل method بترجع [[IEnumerable]] جديد، فبتسلسلهم. و [[new { o.Id, o.Customer }]] اسمه anonymous type: نوع بيتعمل وقت الـ compile بالخصائص دي، زي object literal في JS بس بنوع ثابت، ومينفعش ترجعه من method عامة (استخدم record).

[[First]] بيرمي لو مفيش عناصر، و [[FirstOrDefault]] بيرجع null أو default. ونفس الفكرة [[Single]] (بيرمي لو أكتر من واحد) و [[SingleOrDefault]].

فيه كمان query syntax: [[from o in orders where o.Total > 50 select o.Id]] وبيتحول لنفس الـ methods. أغلب الكود الحديث بيستخدم method syntax، والـ query syntax مريحة في الـ joins المعقدة.

الـ [[OrderBy]] stable، وبتضيف ترتيب تاني بـ [[ThenBy]]. و [[.NET 9+]] ضاف [[CountBy]] و [[AggregateBy]] و [[Index]].`,
            when: R`أي تحويل على collection. للوبات اللي فيها side effects (طباعة، حفظ) استخدم [[foreach]] عادي. وفي كود حساس للأداء جدًا LINQ فيه allocations صغيرة، فقيس قبل ما تغيّر.`,
            mistakes: R`[[First()]] على نتيجة ممكن تبقى فاضية. و [[Count() > 0]] بدل [[Any()]]. وتنادي [[orders.Where(...)]] وتنسى إن النتيجة مش بتتحسب لحد ما تلف عليها (الدرس الجاي). وتعمل [[ToList()]] في نص السلسلة من غير داعي.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

عندنا ٤ طلبات (orders)، وبنسأل عنهم أسئلة بـ LINQ: الطلبات المدفوعة الكبيرة مترتبة، وكل عميل عنده كام طلب وإجماليهم، وفيه طلب فوق 250؟ وطلب عميل اسمه ali، والإجمالي الكلي. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. الداتا

~~~csharp linq.cs
Order[] orders =
[
    new(1, "sara", 120m, "Paid"),
    new(2, "omar", 80m, "Pending"),
    new(3, "sara", 45m, "Paid"),
    new(4, "mona", 300m, "Paid"),
];
...
record Order(int Id, string Customer, decimal Total, string Status);
~~~

- [[record Order(...)]]: record بـ ٤ properties (درس record).
- [[Order[] orders = [ ... ];]]: array من [[Order]] بـ collection expression.
- [[new(1, "sara", 120m, "Paid")]]: target-typed new: النوع معروف من الـ array، فمش محتاج تكتب [[new Order(...)]].
- الفاصلة بعد آخر عنصر مسموحة، عشان لما تضيف سطر الـ diff يبقى سطر واحد.

---

## ٢. الـ lambda: [[o => ...]]

كل methods الـ LINQ بتاخد lambda: دالة صغيرة من غير اسم. [[o => o.Total > 50]] معناها «خد طلب سمّيه [[o]]، ورجّع [[o.Total > 50]]». ده نفس arrow function في JS بالظبط، والاسم [[o]] انت اللي بتختاره.

---

## ٣. السلسلة الأولى: Where ثم OrderByDescending ثم Select

~~~csharp linq.cs
var bigPaid = orders
    .Where(o => o.Status == "Paid" && o.Total > 50)
    .OrderByDescending(o => o.Total)
    .Select(o => new { o.Id, o.Customer });
foreach (var o in bigPaid) Console.WriteLine(o);
~~~

نمشي فيها خطوة خطوة، وكل خطوة بتاخد ناتج اللي قبلها:

### [[.Where(o => o.Status == "Paid" && o.Total > 50)]]

زي [[filter]]: سيب اللي الشرط بتاعه [[true]] بس. و [[&&]] «و».

| Id | Status | Total | يعدّي؟ |
|---|---|---|---|
| 1 | Paid | 120 | أيوه |
| 2 | Pending | 80 | لأ (مش Paid) |
| 3 | Paid | 45 | لأ (أقل من 50) |
| 4 | Paid | 300 | أيوه |

### [[.OrderByDescending(o => o.Total)]]

رتّب من الأكبر للأصغر حسب [[Total]]: 4 (300) ثم 1 (120). ومبيعدّلش الـ array الأصلية، زي [[toSorted]] مش [[sort]] في JS. (وللتصاعدي [[OrderBy]].)

### [[.Select(o => new { o.Id, o.Customer })]]

زي [[map]]: حوّل كل طلب لحاجة تانية. و [[new { o.Id, o.Customer }]] اسمه **anonymous type**: object بنوع ملوش اسم، والـ compiler بيعمله وقت الـ compile بخاصيتين [[Id]] و [[Customer]] (الاسم بيتاخد من الـ property). زي [[({ id: o.id, customer: o.customer })]] في JS.

~~~text الناتج
{ Id = 4, Customer = mona }
{ Id = 1, Customer = sara }
~~~

### [[bigPaid]] نوعه إيه؟

طبعت [[bigPaid.GetType().Name]]:

~~~text الناتج
IEnumerableSelectIterator$__bt2
~~~

مش list! ده object «ماسك الخطوات» ولسه هيتنفذ لما الـ [[foreach]] يلف عليه. ده موضوع الدرس الجاي (deferred execution). وعشان كده [[var]] هنا ضروري: النوع الحقيقي ملوش اسم تقدر تكتبه.

---

## ٤. التجميع: [[GroupBy]]

~~~csharp linq.cs
var perCustomer = orders
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Count = g.Count(), Sum = g.Sum(o => o.Total) });
foreach (var row in perCustomer) Console.WriteLine(row);
~~~

### [[.GroupBy(o => o.Customer)]]

قسّم الطلبات لمجموعات حسب العميل. كل مجموعة ([[g]]) فيها:

- [[g.Key]]: القيمة اللي اتجمعوا بيها (اسم العميل).
- والطلبات نفسها: تقدر تلف عليها أو تعمل عليها LINQ.

| [[g.Key]] | الطلبات |
|---|---|
| sara | 1 (120) و 3 (45) |
| omar | 2 (80) |
| mona | 4 (300) |

### [[.Select(g => new { Customer = g.Key, Count = g.Count(), Sum = g.Sum(o => o.Total) })]]

لكل مجموعة اعمل object. هنا كتبنا الأسماء بنفسنا ([[Customer =]] إلخ) لأن [[g.Key]] لوحده كان هيبقى اسمه [[Key]].

- [[g.Count()]]: عدد الطلبات.
- [[g.Sum(o => o.Total)]]: اجمع [[Total]] بتاع كل طلب.

~~~text الناتج
{ Customer = sara, Count = 2, Sum = 165 }
{ Customer = omar, Count = 1, Sum = 80 }
{ Customer = mona, Count = 1, Sum = 300 }
~~~

120 + 45 = 165. والمجموعات طالعة بترتيب أول ظهور لكل عميل.

---

## ٥. الأسئلة الصغيرة

~~~csharp linq.cs
Console.WriteLine(orders.Any(o => o.Total > 250));
Console.WriteLine(orders.FirstOrDefault(o => o.Customer == "ali")?.Id ?? -1);
Console.WriteLine(orders.Sum(o => o.Total));
~~~

~~~text الناتج
True
-1
545
~~~

- [[Any(...)]]: فيه عنصر واحد على الأقل بيحقق الشرط؟ زي [[some]]. طلب mona بـ 300.
- [[FirstOrDefault(...)]]: أول عنصر بيحقق الشرط، ولو مفيش يرجع [[default]] (هنا [[null]] لأن [[Order]] reference type). زي [[find]].
  - [[?.Id]]: لو null متكملش.
  - [[?? -1]]: لو null خد -1.
- [[Sum(...)]]: 120 + 80 + 45 + 300 = 545.

### [[First]] ولا [[FirstOrDefault]]؟

جرّبت [[orders.First(o => o.Customer == "ali")]]:

~~~text الناتج
InvalidOperationException: Sequence contains no matching element
~~~

[[First]] بيرمي لو ملقاش. استخدمه بس لما تكون متأكد إن فيه.

---

## ٦. الـ query syntax

نفس LINQ ليه شكل تاني شبه SQL:

~~~csharp linq.cs
var ids = from o in orders where o.Total > 50 select o.Id;
~~~

~~~text الناتج
1,2,4
~~~

الـ compiler بيحوّله لـ [[orders.Where(o => o.Total > 50).Select(o => o.Id)]] بالظبط. أغلب الكود بيستخدم الشكل بالـ methods.

---

## ٧. التجربة

~~~csharp sol.cs
var top = orders.Where(o => o.Status == "Paid")
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Total) })
    .MaxBy(x => x.Total);
Console.WriteLine($"{top!.Customer} {top.Total}");
~~~

- نفس الخطوات: فلتر المدفوع، جمّع بالعميل، احسب الإجمالي.
- [[MaxBy(x => x.Total)]]: رجّع **العنصر** اللي [[Total]] بتاعه أكبر (مش الرقم نفسه زي [[Max]]).
- [[top!]]: [[MaxBy]] بترجع nullable (لو الـ list فاضية)، والـ [[!]] بتقول للـ compiler «مش null». هنا مضمون لأن فيه طلبات مدفوعة.

~~~text الناتج
mona 300
~~~

~~~csharp sol.cs
var totals = orders.GroupBy(o => o.Customer).ToDictionary(g => g.Key, g => g.Sum(o => o.Total));
foreach (var (customer, total) in totals) Console.WriteLine($"{customer}: {total}");
~~~

[[ToDictionary(مفتاح, قيمة)]]: اعمل Dictionary: المفتاح [[g.Key]] والقيمة الإجمالي.

~~~text الناتج
sara: 165
omar: 80
mona: 300
~~~

ولو نسيت الـ [[GroupBy]] وعملت [[orders.ToDictionary(o => o.Customer, o => o.Total)]] على طول:

~~~text الناتج
ArgumentException: An item with the same key has already been added. Key: sara
~~~

~~~csharp sol.cs
var page = 1;
foreach (var chunk in orders.Chunk(2))
    Console.WriteLine($"page {page++}: {string.Join(", ", chunk.Select(o => o.Id))}");
~~~

- [[Chunk(2)]]: قسّم لـ arrays كل واحدة فيها ٢.
- [[page++]]: استخدم القيمة الحالية وبعدين زوّد واحد.

~~~text الناتج
page 1: 1, 2
page 2: 3, 4
~~~

---

## الخلاصة

| LINQ | JS | بيرجع |
|---|---|---|
| [[Where]] | [[filter]] | sequence |
| [[Select]] | [[map]] | sequence |
| [[OrderBy]] و [[OrderByDescending]] | [[toSorted]] | sequence |
| [[GroupBy]] | مفيش جاهز | مجموعات ليها [[Key]] |
| [[Any]] و [[All]] | [[some]] و [[every]] | bool |
| [[First]] و [[FirstOrDefault]] | [[find]] | عنصر (أو exception أو default) |
| [[Sum]] و [[Count]] و [[MaxBy]] | [[reduce]] | قيمة |
| [[ToList]] و [[ToDictionary]] | | collection جاهزة |

- كل method بتاخد lambda وبترجع حاجة تكمّل عليها.
- [[FirstOrDefault]] لما ممكن متلاقيش، و [[GroupBy]] قبل [[ToDictionary]] لو المفتاح بيتكرر.`,
          lines: [
            "array من records.",
            "بداية الـ collection expression.",
            R`[[new(...)]]: النوع معروف من الـ array.`,
            "طلب.",
            "طلب.",
            "طلب.",
            "نهاية.",
            "سلسلة LINQ.",
            R`زي [[filter]].`,
            R`ترتيب تنازلي (مش بيعدّل الأصل).`,
            R`زي [[map]] لـ anonymous type.`,
            R`[[{ Id = 4, Customer = mona }]] ثم [[{ Id = 1, Customer = sara }]].`,
            "تجميع.",
            R`مجموعات بالعميل: كل مجموعة ليها [[Key]].`,
            "لكل مجموعة: العدد والإجمالي.",
            R`[[{ Customer = sara, Count = 2, Sum = 165 }]] وهكذا.`,
            R`[[True]]: زي [[some]].`,
            R`[[-1]]: مفيش ali، فـ [[?.]] و [[??]].`,
            R`[[545]].`,
            "الـ record."
          ],
          sol: R`(١) [[mona 300]]: [[orders.Where(o => o.Status == "Paid").GroupBy(o => o.Customer).Select(g => new { g.Key, Total = g.Sum(o => o.Total) }).MaxBy(x => x.Total)]]. [[MaxBy]] بيرجع العنصر نفسه مش القيمة، وده أحسن من [[OrderByDescending(...).First()]].

(٢) [[sara: 165]] و [[omar: 80]] و [[mona: 300]]. لو كتبت [[orders.ToDictionary(o => o.Customer, o => o.Total)]] على طول هيرمي [[ArgumentException: An item with the same key has already been added. Key: sara]] لأن sara ليها طلبين، فلازم [[GroupBy]] الأول.

(٣) [[Chunk(2)]] بيرجع arrays: صفحة ١ فيها 1 و 2، وصفحة ٢ فيها 3 و 4.`,
          solCode: R`Order[] orders = [new(1, "sara", 120m, "Paid"), new(2, "omar", 80m, "Pending"), new(3, "sara", 45m, "Paid"), new(4, "mona", 300m, "Paid")];
var top = orders.Where(o => o.Status == "Paid")
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Total) })
    .MaxBy(x => x.Total);
Console.WriteLine($"{top!.Customer} {top.Total}");
var totals = orders.GroupBy(o => o.Customer).ToDictionary(g => g.Key, g => g.Sum(o => o.Total));
foreach (var (customer, total) in totals) Console.WriteLine($"{customer}: {total}");
var page = 1;
foreach (var chunk in orders.Chunk(2))
    Console.WriteLine($"page {page++}: {string.Join(", ", chunk.Select(o => o.Id))}");
record Order(int Id, string Customer, decimal Total, string Status);`
        },
        {
          cmd: "IEnumerable و yield",
          title: "ليه الـ LINQ query بيتنفذ مرتين؟ (deferred execution و yield)",
          desc: R`[[orders.Where(...)]] مش بيفلتر حاجة وقت ما يتكتب. بيرجع «وصفة» ([[IEnumerable<T>]]) بتتنفذ لما حد يلف عليها: [[foreach]] أو [[Count()]] أو [[ToList()]]. وكل مرة تلف عليها بتتنفذ من الأول. ده اسمه deferred execution، وشبه الـ generators في JS.

و [[yield return]] بيخليك تكتب method بترجع [[IEnumerable]] عنصر عنصر، بالظبط زي [[function*]] و [[yield]] في JS.

القاعدة: لو هتستخدم النتيجة أكتر من مرة، أو المصدر ممكن يتغير، أو المصدر قاعدة بيانات، اعمل [[ToList()]] مرة واحدة.`,
          example: R`var numbers = new List<int> { 1, 2, 3 };
var evens = numbers.Where(n => { Console.WriteLine($"  checking {n}"); return n % 2 == 0; });
Console.WriteLine("query built");
numbers.Add(4);
Console.WriteLine($"count = {evens.Count()}");
Console.WriteLine($"count again = {evens.Count()}");
var snapshot = evens.ToList();
foreach (var n in Countdown(3)) Console.WriteLine(n);
static IEnumerable<int> Countdown(int from)
{
    for (var i = from; i > 0; i--)
    {
        Console.WriteLine($"  yield {i}");
        yield return i;
    }
}`,
          try: R`اعمل method [[ReadNumbers()]] بـ [[yield return]] بترجع أرقام من 1 لـ 1,000,000 وبتطبع «reading» أول مرة بس، وخد منها [[.Where(n => n % 7 == 0).Take(3)]]. كام رقم اتقرا فعلًا؟ وإيه اللي هيحصل لو حطيت [[ToList()]] قبل الـ [[Take]]؟`,
          flag: "script",
          deep: {
            why: R`ده مصدر bugs حقيقية: query بتتنفذ مرتين فتكلم الداتابيز مرتين، أو نتيجة بتتغير لأن الـ list الأصلية اتغيرت بعد ما عملت الـ query، أو [[IEnumerable]] بيترجع من method والـ DbContext اتقفل قبل ما حد يلف عليه. وبرضه هو اللي بيخلي LINQ يشتغل على داتا ضخمة من غير ما يحمّلها في الذاكرة.`,
            how: R`[[IEnumerable<T>]] فيه method واحدة: [[GetEnumerator()]] بترجع [[IEnumerator<T>]] فيه [[MoveNext()]] و [[Current]]. الـ [[foreach]] بينادي دول. و [[Where]] بترجع object ماسك المصدر والـ lambda، ولما تنادي [[MoveNext]] بيسحب من المصدر لحد ما يلاقي عنصر يعدّي.

[[yield return]] الـ compiler بيحوّله لـ state machine: الـ method بتقف عند كل [[yield]] وتكمّل من نفس المكان في الـ [[MoveNext]] الجاية. و [[yield break]] زي return.

الـ operators نوعين: lazy (Where و Select و Take و Skip) و eager بتلف على الكل على طول (Count و Sum و ToList و ToDictionary و First). و [[OrderBy]] lazy بس لما تبدأ تلف عليه بيقرا الكل عشان يرتب.`,
            when: R`[[yield]] للـ pipelines على داتا كبيرة أو stream (سطور ملف، صفحات API). [[ToList()]] لما هتستخدم النتيجة كذا مرة أو قبل ما ترجعها من method تستخدم resource هيتقفل. وفيه [[IAsyncEnumerable<T>]] مع [[await foreach]] للنسخة الـ async.`,
            mistakes: R`ترجع [[IEnumerable]] من method جوه [[using var db = ...]] فالـ context يتقفل والـ caller ياخد [[ObjectDisposedException]]. وتنادي [[Count()]] وبعدها [[foreach]] على query تقيل. وتفتكر إن [[IEnumerable]] معناها collection في الذاكرة: ممكن تبقى query أو ملف أو infinite sequence.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيثبت إن الـ LINQ query مش بتشتغل وقت ما تتكتب، وبتشتغل من الأول كل مرة حد يطلب نتيجتها. الـ lambda اللي جوه [[Where]] بتطبع سطر كل مرة تتنادى، فنشوف بعينينا هي اتنادت إمتى وكام مرة. وبعدين method بـ [[yield return]] بتسلّم عناصرها واحد واحد. كل الناتج حقيقي من [[dotnet run]] جوه [[docker run --rm mcr.microsoft.com/dotnet/sdk:10.0]] (.NET 10.0.12).

---

## ١. query بتطبع وهي شغالة

~~~csharp lazy.cs
var numbers = new List<int> { 1, 2, 3 };
var evens = numbers.Where(n => { Console.WriteLine($"  checking {n}"); return n % 2 == 0; });
Console.WriteLine("query built");
~~~

- [[new List<int> { 1, 2, 3 }]]: list فيها ٣ أرقام.
- الـ lambda هنا ليها جسم بين [[{ }]] فيه جملتين، فلازم [[return]] صريحة:
  - [[Console.WriteLine($"  checking {n}")]]: اطبع إن الرقم ده بيتفحص.
  - [[return n % 2 == 0;]]: [[%]] باقي القسمة. الرقم زوجي لو الباقي 0.
- [[evens]]: نتيجة [[Where]]. نوعها [[IEnumerable<int>]].

~~~text الناتج
query built
~~~

ولا سطر [[checking]]! الـ [[Where]] مفحصتش حاجة. اللي رجع «وصفة»: object شايل الـ list والـ lambda، ومستني حد يطلب منه عناصر. ده اسمه **deferred execution** (تنفيذ مؤجل).

---

## ٢. نغيّر المصدر بعد الـ query

~~~csharp lazy.cs
numbers.Add(4);
~~~

الـ query اتكتبت والـ list فيها ٣ أرقام، ودلوقتي بقوا ٤. هنشوف الـ query هتشوف أنهي نسخة.

---

## ٣. أول طلب: [[Count()]]

~~~csharp lazy.cs
Console.WriteLine($"count = {evens.Count()}");
~~~

~~~text الناتج
  checking 1
  checking 2
  checking 3
  checking 4
count = 2
~~~

- [[Count()]] محتاج يعرف العدد، فلازم يلف على كل العناصر. **هنا بس** الـ lambda اشتغلت.
- اتفحص [[4]] كمان: الـ query بتقرا المصدر وقت التنفيذ، مش وقت الكتابة.
- الزوجي 2 و 4، فـ [[count = 2]].

---

## ٤. تاني طلب: نفس الشغل من الأول

~~~csharp lazy.cs
Console.WriteLine($"count again = {evens.Count()}");
~~~

~~~text الناتج
  checking 1
  checking 2
  checking 3
  checking 4
count again = 2
~~~

[[evens]] مش شايل نتيجة، شايل خطوات. فكل مرة تطلب منه حاجة بيعيدها كلها. هنا ٤ فحوصات، بس لو المصدر query على قاعدة بيانات يبقى request تاني للداتابيز.

---

## ٥. [[ToList()]]: خلّص وخزّن

~~~csharp lazy.cs
var snapshot = evens.ToList();
~~~

~~~text الناتج
  checking 1
  checking 2
  checking 3
  checking 4
~~~

[[ToList()]] بيلف مرة تالتة، بس المرة دي بيحط النتيجة في [[List<int>]] حقيقية. بعد كده [[snapshot.Count]] أو [[foreach]] عليه مش هيطبع أي [[checking]]، ولو غيّرت [[numbers]] الـ [[snapshot]] مش هيتغير.

| النوع | | أمثلة |
|---|---|---|
| lazy: بترجع وصفة | مفيش شغل لسه | [[Where]] و [[Select]] و [[Take]] و [[Skip]] |
| eager: بتنفّذ على طول | بتلف على العناصر | [[Count]] و [[Sum]] و [[ToList]] و [[First]] و [[ToDictionary]] |

---

## ٦. [[yield return]]

~~~csharp lazy.cs
foreach (var n in Countdown(3)) Console.WriteLine(n);
static IEnumerable<int> Countdown(int from)
{
    for (var i = from; i > 0; i--)
    {
        Console.WriteLine($"  yield {i}");
        yield return i;
    }
}
~~~

- [[static IEnumerable<int> Countdown(int from)]]: local function بترجع sequence من [[int]]. و [[static]] معناها مش بتلمس متغيرات من برّه.
- [[for (var i = from; i > 0; i--)]]: loop من [[from]] لحد 1، و [[i--]] تنقّص واحد.
- [[yield return i;]]: سلّم [[i]] للي بيلف، **ووقف هنا**. لما يطلب العنصر اللي بعده، كمّل من السطر ده بالظبط. زي [[yield]] في [[function*]] بتاعة JS.

~~~text الناتج
  yield 3
3
  yield 2
2
  yield 1
1
~~~

لاحظ التبادل: [[yield 3]] (جوه الـ method) ثم [[3]] (الـ foreach طبع) ثم [[yield 2]]... الـ method مش بتجهّز الأرقام كلها الأول. بتشتغل خطوة لكل عنصر يتطلب.

### إزاي ده بيحصل؟

الـ [[foreach]] بيترجم لـ ٣ حاجات:

1. [[GetEnumerator()]]: هات حاجة أقدر أمشي بيها على العناصر.
2. [[MoveNext()]]: روح للعنصر اللي بعده. بترجع [[false]] لما يخلصوا.
3. [[Current]]: العنصر الحالي.

والـ compiler بيحوّل method الـ [[yield]] لـ class فيها [[MoveNext]] بتكمّل من آخر [[yield]] (اسمها state machine). ونفس الـ [[MoveNext]] هو اللي [[Where]] بيناديه على المصدر.

---

## ٧. التجربة: مليون رقم، كام اتقرا؟

~~~csharp sol.cs
var read = 0;
var firstThree = ReadNumbers().Where(n => n % 7 == 0).Take(3).ToList();
Console.WriteLine($"{string.Join(", ", firstThree)} read: {read}");
IEnumerable<int> ReadNumbers()
{
    Console.WriteLine("reading");
    for (var i = 1; i <= 1_000_000; i++)
    {
        read++;
        yield return i;
    }
}
~~~

- [[ReadNumbers]] مش [[static]] عشان تقدر تزوّد المتغير [[read]] اللي برّه.
- [[1_000_000]]: الـ [[_]] جوه الرقم للقراية بس، زي [[1_000_000]] في JS.
- [[Take(3)]]: خد أول ٣ ووقف.

~~~text الناتج
reading
7, 14, 21 read: 21
~~~

الـ [[ToList()]] في الآخر طلب عناصر من [[Take]]، و [[Take]] طلب من [[Where]]، و [[Where]] طلب من [[ReadNumbers]] واحد واحد. أول ما [[Take]] خد ٣ (7 و 14 و 21) بطّل يطلب، فالـ loop وقفت عند 21. من مليون اتقرا ٢١ بس.

### ولو [[ToList()]] قبل [[Take]]؟

~~~csharp
var eager = ReadNumbers().Where(n => n % 7 == 0).ToList();
~~~

~~~text الناتج
reading
7, 14, 21 read: 1000000 count: 142857
~~~

[[ToList()]] eager: قرا المليون كله وعمل list فيها 142,857 رقم (كل مضاعفات 7 لحد مليون: 1,000,000 ÷ 7 = 142,857.1)، وبعدين أخدنا أول ٣. نفس النتيجة بشغل أكتر بكتير.

---

## الخلاصة

- [[Where]] و [[Select]] و [[Take]] مبيعملوش حاجة لحد ما حد يلف.
- كل لفّة على نفس الـ query بتعيد الشغل من الأول، وبتشوف المصدر بحالته الحالية.
- [[ToList()]] لما هتستخدم النتيجة أكتر من مرة، وفي **آخر** السلسلة مش في نصها.
- [[yield return]] بيسلّم عنصر ويقف لحد ما يتطلب اللي بعده.`,
          lines: [
            "list عادية.",
            "Where بـ lambda بتطبع كل ما تتنادى. مفيش حاجة اتنفذت لسه.",
            R`بيطبع [[query built]] قبل أي [[checking]].`,
            "نعدّل المصدر بعد ما عملنا الـ query.",
            R`هنا بس بيتنفذ: بيفحص 1 و 2 و 3 و 4 (شاف العنصر الجديد)، و [[count = 2]].`,
            "بيتنفذ تاني من الأول: ٤ فحوصات كمان.",
            "مرة تالتة، والنتيجة اتثبتت في list.",
            R`[[yield 3]] ثم [[3]] ثم [[yield 2]] ثم [[2]]: بالتبادل، مش الكل الأول.`,
            R`method بترجع [[IEnumerable<int>]].`,
            "بداية.",
            "loop.",
            "بداية.",
            "بيطبع قبل ما يسلّم العنصر.",
            R`بيسلّم العنصر ويقف هنا لحد ما الـ foreach يطلب اللي بعده.`,
            "نهاية.",
            "نهاية."
          ],
          sol: R`مع [[Where(n => n % 7 == 0).Take(3)]] اتقرا ٢١ رقم بس (7 و 14 و 21 هم أول تلاتة، فالـ Take وقف بعد 21)، و «reading» اتطبعت مرة واحدة، والناتج [[7, 14, 21]] و [[read: 21]].

لو حطيت [[ToList()]] قبل الـ [[Take]] ([[ReadNumbers().Where(...).ToList().Take(3)]]) هيقرا المليون كلهم ويعمل list فيها ١٤٢٨٥٧ رقم، وبعدين ياخد أول تلاتة. نفس الناتج بس شغل أكتر بكتير. ومع EF Core نفس الغلطة معناها تحمّل الجدول كله من الداتابيز.`,
          solCode: R`var read = 0;
var firstThree = ReadNumbers().Where(n => n % 7 == 0).Take(3).ToList();
Console.WriteLine($"{string.Join(", ", firstThree)} read: {read}");
IEnumerable<int> ReadNumbers()
{
    Console.WriteLine("reading");
    for (var i = 1; i <= 1_000_000; i++)
    {
        read++;
        yield return i;
    }
}`
        }
      ]
    }
]);
