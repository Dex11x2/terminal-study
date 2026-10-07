// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "Kotlin و Swift و Java والمقارنات",
      l: 3,
      n: "?. و ?: و !! و ? و !، و -> و => و :: و @ و $: نفس الرموز بمعاني مختلفة بين اللغات",
      items: [
        {
          cmd: "?.  و  ?:  و  !!",
          title: "رموز null في Kotlin: ?. ادخل لو مش null، و ?: قيمة احتياطي (Elvis)، و !! أنا متأكد ولو null اقع",
          desc: R`في Kotlin النوع [[String]] مينفعش يبقى null أبدًا. لو عايزه يقبل null اكتب [[String?]] بعلامة استفهام. والـ compiler مش هيسيبك تستخدمه من غير ما تتعامل مع null.

[[name?.length]] (safe call): لو name بـ null رجّع null، غير كده رجّع الطول. [[name ?: "ضيف"]] (Elvis operator، عشان شكله شبه شعر إلفيس): لو الشمال null خد اليمين، زي [[??]] في JS. و [[name!!]]: «أنا متأكد إنها مش null»، ولو طلعت null بيرمي [[NullPointerException]].

ومعاها [[name?.let { ... }]] عشان تنفّذ بلوك لو القيمة مش null. ونفس الأفكار في Swift و Dart و C# بأشكال قريبة.`,
          example: R`val name: String? = null
val len = name?.length
val shown = name ?: "ضيف"
val size = name?.length ?: 0
name?.let { println("الاسم $it") }
val sure: Int = name!!.length`,
          flag: "script",
          try: R`على [[play.kotlinlang.org]] حط السطور جوه [[fun main() { }]] واطبع [[len]] و [[shown]] و [[size]]. آخر سطر هيوقع البرنامج، اقرا الـ exception.`,
          deep: {
            why: R`أشهر crash في Java (و Android) هو NullPointerException. Kotlin حطت null في نظام الأنواع عشان الـ compiler يمسكها قبل ما التطبيق يقع عند اليوزر.`,
            how: R`[[String?]] و [[String]] نوعين مختلفين. بعد [[if (name != null)]] الـ compiler بيعتبرها [[String]] لوحده (smart cast). و [[?:]] ممكن يكون يمينها [[return]] أو [[throw]]: [[val n = name ?: return]].`,
            when: R`[[?.]] و [[?:]] في أغلب الحالات. [[!!]] تقريبًا أبدًا، إلا في حالات انت متأكد منها 100% وعايز الـ crash يبان لو اتغيرت.`,
            mistakes: R`[[!!]] في كل حتة عشان تسكت الـ compiler: كده رجعت لمشاكل Java. وتنسى إن [[?.]] نتيجتها nullable برضه فلازم [[?:]] بعدها. وتخلط [[?:]] بتاعة Kotlin بالـ ternary [[? :]] (Kotlin مفيهاش ternary).`
          },
          teach: R`## الفكرة: الـ compiler مش هيسيبك تلمس null من غير ما تقرر

في Kotlin النوع [[String]] مستحيل يبقى null، و [[String?]] ممكن. ولو معاك [[String?]]، لازم تختار: [[?.]] (لو null سيبها null)، أو [[?:]] (لو null خد بديل)، أو [[!!]] (أنا متأكد، ولو غلطان اقع). حطينا السطور جوه [[fun main() { }]] وضفنا println، واتعملها compile بـ kotlinc 2.2.20 واتشغلت على Java 21 جوه Docker ([[eclipse-temurin:21-jdk]]).

---

## ١. سطر بسطر

~~~kotlin
val name: String? = null
~~~

- [[val]]: متغير مبيتغيرش (زي [[const]] في JS).
- [[: String?]]: النوع. علامة [[?]] بعد النوع معناها «String أو null».
- [[= null]]: وهنا فعلًا null.

~~~kotlin
val len = name?.length
~~~

[[?.]] (safe call): «لو name مش null هات [[.length]]، ولو null رجّع null من غير ما تقع». فـ len نوعها [[Int?]] وقيمتها null.

~~~kotlin
val shown = name ?: "ضيف"
~~~

[[?:]] (Elvis): «لو الشمال null خد اليمين». name بـ null فـ shown بقت [["ضيف"]]. نفس [[??]] في JS و Swift.

~~~kotlin
val size = name?.length ?: 0
~~~

الاتنين مع بعض، من الشمال لليمين:

1. [[name?.length]]: null (لأن name بـ null).
2. [[null ?: 0]]: خد البديل: [[0]].

فـ size نوعها [[Int]] عادي (مش nullable)، لأن [[?:]] ضمنت قيمة.

~~~kotlin
name?.let { println("الاسم $it") }
~~~

- [[.let { ... }]]: نفّذ البلوك ده، و [[it]] جواه هي القيمة.
- [[?.]] قبلها: نفّذه **بس** لو name مش null. هنا null، فالبلوك مش هيتنفذ ومفيش حاجة هتتطبع.
- [[$it]] جوه النص: قيمة it (درس [["$name"]]).

ضفنا [[println(len)]] و [[println(shown)]] و [[println(size)]]:

~~~text الناتج
null
ضيف
0
~~~

~~~kotlin
val sure: Int = name!!.length
~~~

[[!!]]: «حوّل [[String?]] لـ [[String]] بالعافية». ولأن name بـ null:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException
	at K1Kt.main(k1.kt:10)
~~~

البرنامج وقع في السطر ده بالظبط. ([[K1Kt]] اسم الكلاس اللي Kotlin عمله من ملف [[k1.kt]].)

---

## ٢. لما name فيها قيمة

غيرنا لـ [[val name: String? = "Ali"]]:

~~~text الناتج
الاسم Ali
3
~~~

البلوك بتاع let اتنفذ، و [[name?.length ?: 0]] بقت 3.

---

## ٣. من غير أي رمز

~~~kotlin
val name: String? = "Ali"
println(name.length)
~~~

~~~text الناتج (kotlinc)
error: only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?'.
~~~

حتى لو القيمة فعلًا "Ali"، النوع [[String?]]، فالـ compiler رفض. الرسالة نفسها بتقولك الاختيارين: [[?.]] أو [[!!.]]. وفيه حل تالت: [[if (name != null) println(name.length)]]، وجوه الـ if الـ compiler بيعتبرها [[String]] لوحده (smart cast)، وطبعت [[3]].

---

## الخلاصة

| الكود | لو null | لو فيها قيمة |
|---|---|---|
| [[name?.length]] | null | الطول |
| [[name ?: "ضيف"]] | [["ضيف"]] | name |
| [[name?.length ?: 0]] | 0 | الطول |
| [[name?.let { }]] | البلوك مش بيتنفذ | بيتنفذ و it = القيمة |
| [[name!!.length]] | **NullPointerException** | الطول |`,
          lines: [
            R`[[String?]]: نص ممكن يبقى null، وهنا null فعلًا.`,
            R`safe call: len بـ null من غير crash.`,
            R`Elvis: [[ضيف]].`,
            R`الاتنين مع بعض: [[0]].`,
            R`البلوك مش هيتنفذ لأن name بـ null.`,
            R`[[!!]] على null: [[NullPointerException]].`
          ],
          sol: R`[[len]] ← [[null]]، [[shown]] ← [[ضيف]]، [[size]] ← [[0]]. وآخر سطر ← [[Exception in thread "main" java.lang.NullPointerException]].`
        },
        {
          cmd: "String?  و  x!",
          title: "الـ ? و ! في Swift: String? يعني optional (ممكن تبقى nil)، و ! يعني افتحها بالعافية",
          desc: R`في Swift [[String?]] نوع optional: يا نص يا [[nil]]. ومينفعش تستخدمه كنص على طول، لازم «تفتحه» (unwrap) الأول.

الطرق الآمنة: [[if let name = name { ... }]] (لو فيه قيمة، جوه البلوك هي نص عادي)، و [[guard let name else { return }]]، و [[name ?? "ضيف"]] قيمة احتياطي، و [[user?.address?.city]] optional chaining.

و [[name!]] (force unwrap): افتحها بالعافية، ولو nil التطبيق بيقع بـ [[Unexpectedly found nil while unwrapping an Optional value]]. ونفس الفكرة بالظبط في Kotlin ([[?]] و [[!!]]) و TypeScript ([[?:]] و [[!]]) و Dart ([[?]] و [[!]]).`,
          example: R`var name: String? = nil
let shown = name ?? "ضيف"
if let n = name {
    print("الاسم \(n)")
}
let count = name?.count ?? 0
let crash = name!.count`,
          flag: "script",
          try: R`على [[swiftfiddle.com]] شغّل السطور، واطبع [[shown]] و [[count]]. آخر سطر هيوقع، اقرا الرسالة. بعدين خلّي [[name = "Ali"]] وشغّل تاني.`,
          deep: {
            why: R`زي Kotlin: الـ compiler بيجبرك تتعامل مع غياب القيمة، فـ crashes الـ nil بتقل جدًا لو مستخدمتش [[!]].`,
            how: R`[[String?]] هو في الحقيقة [[Optional<String>]]، enum فيه حالتين: [[.some(value)]] و [[.none]]. و [[if let]] بتفك الـ enum بأمان. ولاحظ إن الـ interpolation في Swift بـ [[\(x)]] مش [[$__{x}]].`,
            when: R`[[if let]] و [[guard let]] و [[??]] دايمًا. [[!]] بس في حاجات مضمونة زي [[IBOutlet]] في UIKit أو URL ثابت انت كاتبه.`,
            mistakes: R`[[!]] في كل حتة. وتنسى إن [[?.]] بترجّع optional. وتخلط [[!]] (force unwrap) بـ [[!]] قبل القيمة (not).`
          },
          teach: R`## الفكرة: [[?]] بعد النوع = «ممكن تبقى فاضية»، و [[!]] بعد القيمة = «افتحها بالعافية»

في Swift [[String?]] اسمها optional: علبة يا فيها نص يا فاضية ([[nil]]). مينفعش تستخدمها كنص قبل ما «تفتحها» (unwrap). المثال اتعمله compile بـ swiftc (Swift 6.4) واتشغّل جوه Docker ([[swift:latest]] على لينكس).

---

## ١. سطر بسطر

~~~swift
var name: String? = nil
~~~

- [[var]]: متغير ينفع يتغير (و [[let]] ثابت).
- [[: String?]]: النوع optional نص.
- [[= nil]]: فاضية. [[nil]] هي null بتاعة Swift.

~~~swift
let shown = name ?? "ضيف"
~~~

[[??]] (nil-coalescing): «لو فاضية خد اليمين». فـ shown = [["ضيف"]]، ونوعها [[String]] عادي.

~~~swift
if let n = name {
    print("الاسم \(n)")
}
~~~

- [[if let n = name]]: «لو name فيها قيمة، افتحها وحطها في n، وادخل البلوك». n جوه البلوك [[String]] عادي.
- [[\(n)]]: الـ interpolation في Swift: backslash وبعده قوسين، بيحط قيمة n جوه النص.
- name هنا nil، فالبلوك مش هيتنفذ.

~~~swift
let count = name?.count ?? 0
~~~

1. [[name?.count]] (optional chaining): لو فيها قيمة هات عدد حروفها، لو nil رجّع nil.
2. [[?? 0]]: لو nil خد 0.

ضفنا [[print(shown)]] و [[print(count)]] و [[print(name?.count as Any)]] (عشان نشوف [[?.]] لوحدها بترجّع إيه):

~~~text الناتج
ضيف
0
nil
~~~

~~~swift
let crash = name!.count
~~~

[[!]] (force unwrap): «افتحها، أنا متأكد إن فيها قيمة». ولأنها فاضية:

~~~text الناتج
s1/s1.swift:10: Fatal error: Unexpectedly found nil while unwrapping an Optional value
*** Program crashed: Illegal instruction ...
~~~

البرنامج وقف خالص وقال السطر (10). ([[s1.swift]] اسم ملفنا.) وحاجة لاحظناها: لما البرنامج وقع، السطور اللي طبعها قبلها ضاعت لأنها كانت لسه مستنية في الـ buffer.

---

## ٢. لما name فيها قيمة

غيرنا لـ [[var name: String? = "Ali"]]:

~~~text الناتج
الاسم Ali
Ali 3
3
~~~

[[if let]] دخلت البلوك، و [[??]] رجعت الاسم نفسه، و count بـ 3، و [[!]] عدّت من غير crash.

---

## ٣. من غير ما تفتحها

~~~swift
var name: String? = "Ali"
print(name.count)
~~~

~~~text الناتج (swiftc)
error: value of optional type 'String?' must be unwrapped to refer to member 'count' of wrapped base type 'String'
note: chain the optional using '?' to access member 'count' only for non-'nil' base values
note: force-unwrap using '!' to abort execution if the optional value contains 'nil'
~~~

الـ compiler رفض، واقترح الطريقتين: [[?]] أو [[!]].

---

## الخلاصة

| الكود | Swift | Kotlin |
|---|---|---|
| نوع ممكن يبقى فاضي | [[String?]] | [[String?]] |
| الفاضي | [[nil]] | [[null]] |
| بديل | [[a ?? b]] | [[a ?: b]] |
| ادخل لو مش فاضي | [[a?.count]] | [[a?.length]] |
| افتح بأمان | [[if let n = a { }]] | [[a?.let { }]] |
| افتح بالعافية | [[a!]] | [[a!!]] |

و [[!]] قبل قيمة ([[!done]]) لسه معناها not، زي أي لغة.`,
          lines: [
            R`optional نص، قيمته nil.`,
            R`[[??]]: [[ضيف]].`,
            R`[[if let]]: لو فيه قيمة، n جوه البلوك نص عادي.`,
            R`interpolation في Swift بـ [[\( )]].`,
            R`قفلة البلوك (مش هيتنفذ هنا).`,
            R`optional chaining مع [[??]]: [[0]].`,
            R`force unwrap على nil: crash.`
          ],
          sol: R`[[shown]] ← [[ضيف]]، [[count]] ← [[0]]، وآخر سطر ← [[Fatal error: Unexpectedly found nil while unwrapping an Optional value]]. ولما [[name = "Ali"]] هيطبع [[الاسم Ali]] و count بـ [[3]] ومفيش crash.`
        },
        {
          cmd: "-> (نوع الراجع)",
          title: "السهم -> بعد أقواس الدالة: نوع اللي الدالة بترجّعه في Swift و Rust و Python، و : في TS و Kotlin",
          desc: R`في لغات كتير السهم [[->]] بعد الـ parameters معناه «الدالة دي بترجّع النوع ده». Swift: [[func add(a: Int, b: Int) -> Int]]. Rust: [[fn add(a: i32, b: i32) -> i32]]. Python: [[def add(a: int, b: int) -> int:]]. و C++ الحديث: [[auto add(int a, int b) -> int]].

لغات تانية بتستخدم [[:]] بدل السهم: TypeScript [[function add(a: number, b: number): number]] و Kotlin [[fun add(a: Int, b: Int): Int]]. و Go بيكتب النوع بعد الأقواس من غير أي رمز: [[func add(a, b int) int]]. و Java و C و C# بيكتبوه قبل الاسم: [[int add(int a, int b)]].

ولو مفيش قيمة بترجع: Swift [[-> Void]] أو تشيل السهم، و Python [[-> None]]، و Kotlin [[: Unit]]، و TS [[: void]]، و C [[void]].`,
          example: R`// Swift
func add(a: Int, b: Int) -> Int { a + b }
// Rust
fn add(a: i32, b: i32) -> i32 { a + b }
// Kotlin
fun add(a: Int, b: Int): Int = a + b
// Go
func add(a, b int) int { return a + b }`,
          flag: "script",
          try: R`اكتب نفس الدالة [[add]] في اللغة اللي بتذاكرها دلوقتي (TypeScript أو Python أو Java) بنوع الراجع، وقارن مكانه بالأمثلة.`,
          deep: {
            why: R`هتقرا كود بلغات كتير، وأول حاجة في توقيع أي دالة هي «بتاخد إيه وبترجّع إيه». معرفة مكان النوع في كل لغة بتخليك تقرا بسرعة.`,
            how: R`كلها نفس المعلومة للـ compiler، الاختلاف في الشكل بس. اللغات اللي بتحط النوع بعد الاسم ([[name: Type]]) بتستخدم [[->]] أو [[:]] للراجع عشان يبقى متسق.`,
            when: R`في كل دالة عامة. واللغات اللي بتستنتج (Kotlin مع [[=]]، و Rust مع closures) تقدر تشيله في الحاجات الصغيرة.`,
            mistakes: R`تكتب [[->]] في TypeScript أو Kotlin. وتكتب [[:]] في Swift. وتخلط السهم ده بـ [[->]] بتاعة C (مؤشرات) أو [[->]] بتاعة Java (lambda).`
          },
          teach: R`## الفكرة: كل لغة بتكتب «الدالة بترجّع إيه» في مكان مختلف

المعلومة واحدة: الدالة بتاخد إيه وبترجّع إيه. الاختلاف في الرمز ومكانه. الأمثلة دي ٤ لغات مختلفة (مش ملف واحد)، فشغّلنا كل سطر لوحده في لغته جوه Docker، وضفنا لكل واحد نداء بيطبع [[add(2, 3)]]: Swift 6.4 ([[swift:latest]])، و Rust 1.99 ([[rust:slim]])، و Kotlin 2.2.20 ([[eclipse-temurin:21-jdk]] + kotlinc)، و Go 1.25 ([[golang:1.25]]). الأربعة طبعوا [[5]].

---

## ١. Swift

~~~swift
func add(a: Int, b: Int) -> Int { a + b }
~~~

| الحتة | معناها |
|---|---|
| [[func]] | دالة |
| [[a: Int, b: Int]] | الـ parameters: الاسم وبعده [[:]] والنوع |
| [[-> Int]] | بترجّع Int |
| [[{ a + b }]] | جسم من expression واحد بيرجع لوحده من غير [[return]] |

وفي Swift النداء بالأسماء: [[add(a: 2, b: 3)]].

---

## ٢. Rust

~~~rust
fn add(a: i32, b: i32) -> i32 { a + b }
~~~

- [[fn]]: دالة.
- [[i32]]: رقم صحيح 32-bit (i = integer).
- [[-> i32]]: بترجّع i32.
- [[{ a + b }]]: آخر expression **من غير [[;]]** هي اللي بترجع.

ولو حطيت [[;]] بعد [[a + b]] (جربناها في دالة تانية اسمها add2):

~~~text الناتج (rustc)
error[E0308]: mismatched types
 --> a.rs:2:28
  |
2 | fn add2(a: i32, b: i32) -> i32 { a + b; }
  |    ----                    ^^^        - help: remove this semicolon to return this value
  |    |                       |
  |    |                       expected $__bti32$__bt, found $__bt()$__bt
  |    implicitly returns $__bt()$__bt as its body has no tail or $__btreturn$__bt expression
~~~

الـ [[;]] حولت السطر لـ statement، فالدالة بقت مبترجّعش حاجة ([[()]] = لا شيء) رغم إنها واعدة بـ i32.

---

## ٣. Kotlin: [[:]] بدل السهم

~~~kotlin
fun add(a: Int, b: Int): Int = a + b
~~~

- [[fun]]: دالة.
- [[): Int]]: نوع الراجع بعد [[:]]، زي TypeScript.
- [[= a + b]]: جسم من expression واحد بـ [[=]] بدل [[{ return ... }]].

---

## ٤. Go: من غير رمز

~~~go
func add(a, b int) int { return a + b }
~~~

- [[a, b int]]: الاتنين int (لما اتنين ورا بعض نفس النوع تكتبه مرة).
- [[int]] بعد الأقواس على طول: نوع الراجع، من غير [[->]] ولا [[:]].
- Go محتاج [[return]] صريحة.

---

## الخلاصة

| اللغة | الشكل | لو مبترجّعش |
|---|---|---|
| Swift | [[func f(a: Int) -> Int]] | تشيل السهم أو [[-> Void]] |
| Rust | [[fn f(a: i32) -> i32]] | تشيل السهم |
| Python | [[def f(a: int) -> int:]] | [[-> None]] |
| Kotlin | [[fun f(a: Int): Int]] | [[: Unit]] أو تشيله |
| TypeScript | [[function f(a: number): number]] | [[: void]] |
| Go | [[func f(a int) int]] | تشيله |
| Java و C و C# | [[int f(int a)]] (قبل الاسم) | [[void]] |

و [[->]] ده غير [[->]] بتاعة C (مؤشر) و Java (lambda).`,
          lines: [
            R`Swift: [[-> Int]]، وجسم من سطر واحد بيرجّع لوحده.`,
            R`Rust: نفس السهم، وآخر expression من غير [[;]] هي اللي بترجع.`,
            R`Kotlin: [[: Int]] بدل السهم، و [[=]] لجسم من expression واحد.`,
            R`Go: النوع بعد الأقواس من غير رمز.`
          ],
          sol: R`TypeScript: [[function add(a: number, b: number): number { return a + b; }]]. Python: [[def add(a: int, b: int) -> int: return a + b]]. Java: [[int add(int a, int b) { return a + b; }]].`
        },
        {
          cmd: "=>  ضد  ->",
          title: "مقارنة الأسهم في الـ lambdas: => في JS و C# و Dart، و -> في Java و Kotlin، وغيرهم",
          desc: R`كل لغة عندها طريقة تكتب بيها دالة صغيرة من غير اسم (lambda)، والسهم بيختلف:

[[=>]] (سهم بيساوي): JavaScript و TypeScript [[x => x * 2]]، و C# [[x => x * 2]]، و Dart [[(x) => x * 2]]، و Scala، و PHP [[fn($x) => $x * 2]].

[[->]] (سهم بشرطة): Java [[x -> x * 2]]، و Kotlin جوه أقواس معووجة [[{ x -> x * 2 }]] (ولو parameter واحد ممكن [[{ it * 2 }]])، و Haskell [[\x -> x * 2]].

ومن غير سهم خالص: Python [[lambda x: x * 2]]، و Swift [[{ x in x * 2 }]]، و Rust [[|x| x * 2]]، و Go [[func(x int) int { return x * 2 }]].

و [[->]] كمان في Kotlin [[when]] و Java [[switch]] الحديث بتفصل الحالة عن النتيجة.`,
          example: R`// JavaScript / TypeScript / C#
nums.map(x => x * 2)
// Java
nums.stream().map(x -> x * 2).toList();
// Kotlin
nums.map { x -> x * 2 }
nums.map { it * 2 }
// Kotlin when
val label = when (n) { 0 -> "صفر"; else -> "رقم" }`,
          flag: "script",
          try: R`اكتب [[[1, 2, 3].map(x => x * 2)]] في الـ Console، وبعدين اكتب نفس الفكرة في python3: [[list(map(lambda x: x * 2, [1, 2, 3]))]].`,
          deep: {
            why: R`لو بتنقل بين لغتين (Kotlin و JS مثلًا، أو Java و TS) هتكتب السهم الغلط كتير. القايمة دي بتوفّر عليك أخطاء compile سخيفة.`,
            how: R`كلهم نفس الفكرة: parameters، وسهم، وجسم. الاختلاف تاريخي في كل لغة. و Dart بتستخدم [[=>]] كمان لأي دالة جسمها expression واحد: [[int sq(int x) => x * x;]].`,
            when: R`في الـ callbacks: map و filter و sort و event handlers، في أي لغة.`,
            mistakes: R`[[x -> x * 2]] في JS بتطلع SyntaxError. و [[x => x * 2]] في Java برضه. وفي Kotlin تكتب السهم برة الأقواس المعووجة [[map(x -> x * 2)]].`
          },
          teach: R`## الفكرة: نفس الـ lambda، سهم مختلف

الـ lambda دالة صغيرة من غير اسم بتبعتها لدالة تانية (زي map). كل لغة بتكتبها: parameters، وبعدين سهم، وبعدين الجسم. الفرق في شكل السهم بس. المثال سطور من لغات مختلفة، فشغّلنا كل واحدة في لغتها على [[[1, 2, 3]]]: JS بـ Node 24 على ويندوز، و Java 21 و Kotlin 2.2.20 جوه Docker ([[eclipse-temurin:21-jdk]]).

---

## ١. JavaScript و TypeScript و C#: [[=>]]

~~~javascript
nums.map(x => x * 2)
~~~

~~~text الناتج
[ 2, 4, 6 ]
~~~

- [[x]]: الـ parameter (كل عنصر في دوره).
- [[=>]]: سهم «يساوي وأكبر من»، بيفصل الـ parameter عن الجسم.
- [[x * 2]]: الجسم، وبيرجع لوحده.
- [[.map]] بتطبّق الدالة على كل عنصر وترجّع array جديدة.

---

## ٢. Java: [[->]]

~~~java
nums.stream().map(x -> x * 2).toList();
~~~

~~~text الناتج
[2, 4, 6]
~~~

- [[.stream()]]: حوّل الـ List لـ stream عشان تقدر تعمل map. (في Java الـ List نفسها مفيهاش map.)
- [[x -> x * 2]]: نفس الـ lambda بسهم «شرطة وأكبر من».
- [[.toList()]]: رجّع النتيجة List تاني (من Java 16).

ولو كتبت سهم JS في Java:

~~~text الناتج (javac)
error: illegal start of expression
        System.out.println(List.of(1, 2).stream().map(x => x * 2).toList());
                                                         ^
~~~

والعكس، سهم Java في Node: [[SyntaxError: Unexpected token '>']].

---

## ٣. Kotlin: [[->]] جوه [[{ }]]

~~~kotlin
nums.map { x -> x * 2 }
nums.map { it * 2 }
~~~

~~~text الناتج
[2, 4, 6]
[2, 4, 6]
~~~

- في Kotlin الـ lambda كلها جوه [[{ }]]، والسهم **جوه** الأقواس.
- لما الـ lambda آخر argument، بتتكتب برة [[( )]]: [[map { ... }]] بدل [[map({ ... })]].
- [[it]]: لو فيه parameter واحد، Kotlin بيسميه it لوحده فمش محتاج تكتب [[x ->]].

ولو كتبتها بشكل Java [[nums.map(x -> x * 2)]]، kotlinc طلّع ٤ errors أولهم:

~~~text الناتج (kotlinc)
error: cannot infer type for type parameter 'R'. Specify it explicitly.
~~~

---

## ٤. [[->]] في [[when]]

~~~kotlin
val label = when (n) { 0 -> "صفر"; else -> "رقم" }
~~~

[[when]] زي switch: [[0 -> "صفر"]] يعني «لو n بـ 0، القيمة صفر». و [[;]] بتفصل الحالات في سطر واحد، و [[else]] أي حاجة تانية. جربنا n بـ 0 ثم 7:

~~~text الناتج
صفر
رقم
~~~

وفي Java 14+ نفس الشكل في switch: [[case 0 -> "zero";]]، وجربناها وطبعت [[zero]].

---

## الخلاصة

| السهم | اللغات | مثال |
|---|---|---|
| [[=>]] | JS و TS و C# و Dart و Scala و PHP | [[x => x * 2]] |
| [[->]] | Java و Kotlin و Haskell | [[x -> x * 2]] |

ومن غير سهم خالص: Python [[lambda x: x * 2]] (جربنا [[list(map(lambda x: x * 2, [1, 2, 3]))]] وطلّعت [[[2, 4, 6]]])، و Swift [[{ x in x * 2 }]] (جربناها في Swift 6.4 وطلّعت [[[2, 4, 6]]])، و Rust [[|x| x * 2]] (من الـ docs).`,
          lines: [
            R`JS و TS و C#: [[=>]].`,
            R`Java: [[->]].`,
            R`Kotlin: [[->]] جوه [[{ }]].`,
            R`Kotlin: [[it]] اسم جاهز للـ parameter الوحيد.`,
            R`Kotlin when: [[->]] بتفصل الحالة عن النتيجة.`
          ],
          sol: R`الاتنين بيطلعوا نفس النتيجة: [[[2, 4, 6]]].`
        },
        {
          cmd: "String::length",
          title: "النقطتين المزدوجة :: في Java و Kotlin: method reference، بتشاور على دالة من غير ما تناديها",
          desc: R`في Java و Kotlin [[String::length]] معناها «دالة length بتاعة String»، من غير تشغيل. بتحطها مكان lambda: [[names.map(String::length)]] هي هي [[names.map { it.length }]].

أشكالها: [[Class::staticMethod]]، و [[object::method]] ([[System.out::println]] في Java)، و [[Class::new]] للـ constructor. وفي Kotlin [[::functionName]] لدالة عادية، و [[User::class]] للـ class نفسه (بتشوفها في Android: [[MainActivity::class.java]]).

ده غير [[::]] في C++ و PHP و Rust (اللي معناها «اللي جوه»). نفس الشكل، فكرة مختلفة.`,
          example: R`// Java
List<Integer> lens = names.stream().map(String::length).toList();
names.forEach(System.out::println);
// Kotlin
val lens = names.map(String::length)
fun isLong(s: String) = s.length > 3
val longOnes = names.filter(::isLong)`,
          flag: "script",
          try: R`على [[play.kotlinlang.org]] اعمل [[val names = listOf("Ali", "Sara", "Mohamed")]] واطبع [[names.map(String::length)]] و [[names.filter(::isLong)]] بعد ما تعرّف isLong.`,
          deep: {
            why: R`أقصر وأوضح من lambda لما الـ lambda كل اللي بتعمله إنها تنادي دالة واحدة. وهتلاقيها كتير في Spring و Android.`,
            how: R`الـ compiler بيحوّلها لـ lambda بتنادي الدالة دي. في Java النوع المطلوب لازم يبقى functional interface (زي [[Function]] و [[Consumer]]).`,
            when: R`لما الـ lambda هي مجرد [[x -> f(x)]] أو [[x -> x.method()]].`,
            mistakes: R`تحط أقواس: [[String::length()]] غلط. وتستخدمها لما محتاج تبعت arguments زيادة (ساعتها اكتب lambda). وتخلطها بـ [[::]] بتاعة C++.`
          },
          teach: R`## الفكرة: [[::]] بتشاور على دالة من غير ما تشغّلها

[[String::length]] معناها «دالة length بتاعة String» كحاجة تتبعت، مش نتيجتها. بتحطها مكان lambda كل اللي بتعمله إنها تنادي دالة واحدة. المثال سطور Java و Kotlin، فعرّفنا [[names]] كـ [["Ali", "Sara", "Mohamed"]] وشغّلنا كل لغة: Java 21 و Kotlin 2.2.20 جوه Docker ([[eclipse-temurin:21-jdk]]).

---

## ١. Java: [[String::length]]

~~~java
List<Integer> lens = names.stream().map(String::length).toList();
~~~

~~~text الناتج (طبعنا lens)
[3, 4, 7]
~~~

- [[List<Integer>]]: list من أرقام. ([[< >]] نوع العناصر، و Java بتستخدم [[Integer]] مش [[int]] جوه الـ collections.)
- [[.map(String::length)]]: لكل اسم، نادي [[length()]] عليه. هي هي [[.map(s -> s.length())]].
- لاحظ: من غير [[()]] بعد length. احنا بنشاور على الدالة، مش بنناديها.

Ali ٣ حروف، و Sara ٤، و Mohamed ٧.

---

## ٢. Java: [[System.out::println]]

~~~java
names.forEach(System.out::println);
~~~

~~~text الناتج
Ali
Sara
Mohamed
~~~

- [[System.out]]: object الشاشة، و [[println]] method عليه.
- [[System.out::println]]: reference لـ method على **object معيّن**. هي هي [[name -> System.out.println(name)]].
- [[forEach]]: نفّذها على كل عنصر.

---

## ٣. Kotlin: نفس الشكل

~~~kotlin
val lens = names.map(String::length)
~~~

~~~text الناتج
[3, 4, 7]
~~~

في Kotlin [[length]] property مش method، و [[String::length]] برضه شغالة. وهي هي [[names.map { it.length }]].

---

## ٤. Kotlin: [[::isLong]]

~~~kotlin
fun isLong(s: String) = s.length > 3
val longOnes = names.filter(::isLong)
~~~

~~~text الناتج
[Sara, Mohamed]
~~~

- [[fun isLong(s: String) = s.length > 3]]: دالة عادية (top-level، مش جوه كلاس) بترجّع true لو الاسم أطول من ٣ حروف.
- [[::isLong]]: [[::]] من غير حاجة على الشمال يعني «الدالة isLong نفسها».
- [[.filter]]: سيب بس العناصر اللي الدالة رجعت لها true. Ali ٣ حروف بس، فاتشالت.

---

## الخلاصة

| الشكل | معناه | زي الـ lambda |
|---|---|---|
| [[String::length]] | method على كل عنصر | [[s -> s.length()]] |
| [[System.out::println]] | method على object معيّن | [[x -> System.out.println(x)]] |
| [[::isLong]] | دالة عادية (Kotlin) | [[{ isLong(it) }]] |
| [[User::new]] | الـ constructor (Java) | [[x -> new User(x)]] |
| [[User::class]] | الكلاس نفسه (Kotlin) | |

و [[::]] في C++ و PHP و Rust معناها «اللي جوه» ([[std::cout]])، فكرة تانية خالص.`,
          lines: [
            R`Java: طول كل اسم.`,
            R`Java: اطبع كل اسم، [[System.out::println]] reference لـ method على object.`,
            R`Kotlin: نفس الفكرة.`,
            R`دالة عادية.`,
            R`[[::isLong]]: reference لدالة top-level.`
          ],
          sol: R`[[names.map(String::length)]] ← [[[3, 4, 7]]]. [[names.filter(::isLong)]] ← [[[Sara, Mohamed]]].`
        },
        {
          cmd: "@Override",
          title: "الـ @ فوق method أو class في Java و Kotlin: annotation، معلومة للـ compiler أو للـ framework",
          desc: R`[[@Override]] فوق method في Java معناها «دي بتعيد تعريف method في الأب». لو كتبت الاسم غلط، الـ compiler هيقولك إن مفيش حاجة تعمل override لها بدل ما الغلطة تعدّي.

ودي اسمها annotations: معلومات (metadata) على الكود. بعضها للـ compiler ([[@Override]] و [[@Deprecated]] و [[@FunctionalInterface]])، وأغلبها للـ frameworks: Spring [[@RestController]] و [[@GetMapping("/users")]] و [[@Autowired]]، و JPA [[@Entity]] و [[@Id]]، و JUnit [[@Test]]، و Lombok [[@Data]].

الشكل زي decorators في Python و TypeScript، بس في Java الـ annotation نفسها مش بتغيّر الكود، الـ framework بيقراها ويتصرف. وفي Kotlin نفس الحاجة، و [[override]] كلمة إجبارية مش annotation.`,
          example: R`@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public User get(@PathVariable Long id) { return service.find(id); }
    @Override
    public String toString() { return "UserController"; }
}`,
          flag: "script",
          try: R`في أي مشروع Java (أو على [[onlinegdb.com]]) اكتب كلاس فيه [[@Override public String tostring()]] بحرف صغير، واعمل compile واقرا الـ error.`,
          deep: {
            why: R`Spring Boot كله annotations. لو مش فاهم إن [[@GetMapping]] بتسجّل route، هتحس إن الكود بيشتغل لوحده.`,
            how: R`الـ annotation بتتخزن مع الكلاس. الـ compiler بيستخدم بعضها للفحص، والـ frameworks بتقراها وقت التشغيل بالـ reflection أو وقت الـ compile بـ annotation processors (زي Lombok اللي بيولّد getters).`,
            when: R`[[@Override]] على كل override دايمًا. والباقي حسب الـ framework.`,
            mistakes: R`تنسى [[@Override]] فتغلط في الاسم ومحدش يقولك (تبقى method جديدة). وتحط annotation على المكان الغلط (فوق field بدل method). وتنسى إن [[@Autowired]] على field بتشتغل بس لو الكلاس نفسه bean.`
          },
          teach: R`## الفكرة: [[@اسم]] فوق الكود = معلومة عن الكود

الـ annotation ملاحظة بتتلزق على كلاس أو method أو parameter. هي نفسها مبتنفّذش حاجة: الـ compiler أو الـ framework هو اللي بيقراها ويتصرف. المثال controller في Spring Boot، والـ Spring مش متسطب هنا، فـ annotations الـ Spring مشروحة من الـ docs بتاعته. لكن [[@Override]] جربناها بـ Java 21 جوه Docker ([[eclipse-temurin:21-jdk]]) بـ [[java File.java]] اللي بيعمل compile ويشغّل في خطوة واحدة.

---

## ١. سطر بسطر

~~~java
@RestController
public class UserController {
~~~

- [[@RestController]]: لـ Spring: «الكلاس ده بيستقبل طلبات HTTP، واللي بيرجع من الـ methods يتحوّل JSON».
- [[public class UserController]]: كلاس عام اسمه UserController.

~~~java
    @GetMapping("/users/{id}")
    public User get(@PathVariable Long id) { return service.find(id); }
~~~

- [[@GetMapping("/users/{id}")]]: annotation ليها argument بين [[( )]]: «لما يجي طلب GET على المسار ده، نادي الـ method دي». و [[{id}]] جوه المسار حتة متغيرة: [[/users/7]] مثلًا.
- [[@PathVariable Long id]]: annotation على **parameter**: «خد قيمة id من المسار وحطها هنا». [[Long]] رقم صحيح كبير.
- [[service.find(id)]]: service متعرّفة في مكان تاني في المشروع (مش في المثال).

~~~java
    @Override
    public String toString() { return "UserController"; }
}
~~~

[[@Override]]: للـ compiler: «الـ method دي بتعيد تعريف method موجودة في الأب». وكل كلاس في Java أبوه [[Object]]، و Object فيها [[toString()]].

---

## ٢. [[@Override]] بتجربة

كلاس صغير بنفس الـ method:

~~~java
public class Over2 {
    @Override
    public String toString() { return "UserController"; }
    public static void main(String[] args) { System.out.println(new Over2()); }
}
~~~

~~~text الناتج
UserController
~~~

[[println]] بتنادي [[toString()]] على الـ object، فطبعت نسختنا.

### غلطة في الاسم، معاها [[@Override]]

غيرنا الاسم لـ [[tostring]] بحرف صغير:

~~~text الناتج
Over.java:2: error: method does not override or implement a method from a supertype
    @Override
    ^
1 error
error: compilation failed
~~~

الـ compiler دوّر في الأب على [[tostring]] وملقاش، فرفض.

### نفس الغلطة، من غير [[@Override]]

~~~text الناتج
Over3@2473b9ce
~~~

مفيش error خالص! [[tostring]] بقت method جديدة محدش بيناديها، و println نادت [[toString]] الأصلية بتاعة Object اللي بتطبع اسم الكلاس و [[@]] ورقم (الـ hash code بالـ hex، بيتغير كل تشغيلة). ده بالظبط الـ bug اللي [[@Override]] بتمنعه.

---

## الخلاصة

| الـ annotation | مين بيقراها | بتعمل إيه |
|---|---|---|
| [[@Override]] | الـ compiler | يتأكد إن فيه method في الأب بنفس الاسم |
| [[@Deprecated]] | الـ compiler | تحذير لأي حد يستخدمها |
| [[@RestController]] | Spring | الكلاس ده API |
| [[@GetMapping("/x")]] | Spring | الـ method دي لـ GET على /x |
| [[@PathVariable]] | Spring | خد القيمة من المسار |
| [[@Test]] | JUnit | دي اختبار |

وفي Kotlin [[override]] كلمة إجبارية في اللغة نفسها، مش annotation.`,
          lines: [
            R`Spring: الكلاس ده controller بيرجّع JSON.`,
            R`كلاس.`,
            R`Spring: الـ method دي للـ GET على المسار ده، و [[{id}]] متغير في المسار.`,
            R`[[@PathVariable]]: خد id من المسار.`,
            R`compiler: دي بتعيد تعريف method في الأب ([[Object]]).`,
            R`toString.`,
            R`قفلة الكلاس.`
          ],
          sol: R`مع [[tostring]] بحرف صغير ← [[error: method does not override or implement a method from a supertype]]. من غير [[@Override]] كان الكود هيعدّي والـ method الغلط هتتجاهل.`
        },
        {
          cmd: "\"$name\"  (Kotlin و Dart)",
          title: "الدولار $ جوه النص في Kotlin و Dart: $name متغير، و ${expr} حساب",
          desc: R`في Kotlin و Dart [["Hi $name"]] بتحط قيمة name جوه النص. ولو عايز حاجة أكتر من اسم بسيط (خانة أو حساب أو نداء) حطها في أقواس: [["$__{user.name}"]] و [["$__{a + b}"]].

ده نفس فكرة [[$__{}]] في JS بس من غير backtick، وأي [[""]] عادية بتشتغل. وفي Groovy (Gradle) نفس الحكاية. وفي PHP [["Hi $name"]] برضه جوه [[""]] بس. وفي bash [["$name"]] و [["$__{name}"]] نفس الشكل تقريبًا.

وعشان تكتب دولار حرفي: Kotlin [["\$5"]] أو [["$__{'$'}5"]]، و Dart [['\$5']].`,
          example: R`// Kotlin
val name = "Sara"
val user = User("Ali", 20)
println("أهلًا $name")
println("$__{user.name} عنده $__{user.age + 1} سنة السنة الجاية")
println("$user.name")
println("السعر \$50")`,
          flag: "script",
          try: R`على [[play.kotlinlang.org]] اعمل [[data class User(val name: String)]] وجرّب [[println("$user.name")]] و [[println("$__{user.name}")]] وقارن.`,
          deep: {
            why: R`أكتر حاجة بتكتبها في Kotlin (Android) و Dart (Flutter): نصوص الواجهة والـ logs. والغلطة اللي في السطر الخامس منتشرة جدًا.`,
            how: R`الـ compiler بيقرا بعد [[$]] أطول اسم ممكن بس (حروف وأرقام و [[_]])، والنقطة بتوقفه. فـ [["$user.name"]] بتحط [[user.toString()]] وبعدها [[.name]] حرفيًا. الأقواس هي اللي بتاخد expression كامل.`,
            when: R`[[$name]] للمتغيرات البسيطة، و [[$__{}]] لأي حاجة فيها نقطة أو حساب.`,
            mistakes: R`[["$user.name"]] من غير أقواس. وتكتب backtick زي JS. وفي Flutter تنسى إن [['$']] في نص عادي لازم تهرب منها لو عايزها حرفي.`
          },
          teach: R`## الفكرة: [[$]] جوه النص بتحط قيمة

في Kotlin و Dart أي [[" "]] عادية تقدر تحط فيها [[$name]] لقيمة متغير، أو [[$__{...}]] لأي expression. المثال Kotlin، وعشان يشتغل عرّفنا [[data class User(val name: String, val age: Int)]] وحطينا السطور جوه [[fun main()]]، واتعمله compile بـ kotlinc 2.2.20 على Java 21 جوه Docker ([[eclipse-temurin:21-jdk]]).

---

## ١. سطر بسطر

~~~kotlin
val name = "Sara"
val user = User("Ali", 20)
~~~

- [[val name = "Sara"]]: متغير نص.
- [[User("Ali", 20)]]: object من الـ data class. ([[data class]] كلاس للبيانات، و Kotlin بيعمل له [[toString()]] جاهزة.)

~~~kotlin
println("أهلًا $name")
~~~

~~~text الناتج
أهلًا Sara
~~~

[[$name]]: Kotlin قرا بعد [[$]] أطول اسم ممكن (حروف وأرقام و [[_]])، وحط قيمته.

~~~kotlin
println("$__{user.name} عنده $__{user.age + 1} سنة السنة الجاية")
~~~

~~~text الناتج
Ali عنده 21 سنة السنة الجاية
~~~

- [[$__{user.name}]]: الأقواس بتاخد expression كامل، هنا خانة من object.
- [[$__{user.age + 1}]]: حساب: 20 + 1.

~~~kotlin
println("$user.name")
~~~

~~~text الناتج
User(name=Ali, age=20).name
~~~

ده الفخ: من غير أقواس، الاسم وقف عند النقطة. فـ [[$user]] اتبدلت بـ [[user.toString()]] (اللي الـ data class بتطبعها [[User(name=Ali, age=20)]])، وبعدها [[.name]] اتطبعت كنص عادي.

~~~kotlin
println("السعر \$50")
~~~

~~~text الناتج
السعر $50
~~~

[[\$]]: الـ backslash بيقول «الدولار ده حرف عادي». وفيه طريقة تانية: [["$__{'$'}5"]] (expression قيمته حرف الدولار)، وجربناها وطبعت [[$5]].

---

## ٢. المقارنة باللغات التانية

جربنا سطر JS في Node 24 وسطر bash في [[ubuntu:24.04]] (الاتنين طبعوا [[Ali 5 $5]])، وسطر Swift في Swift 6.4:

| اللغة | متغير | expression | دولار حرفي |
|---|---|---|---|
| Kotlin | [["$name"]] | [["$__{a + b}"]] | [["\$5"]] |
| Dart (من الـ docs) | [["$name"]] أو [['$name']] | [["$__{a + b}"]] | [['\$5']] |
| JS | backtick و [[$__{name}]] | backtick و [[$__{a + b}]] | [[$]] لوحدها |
| bash | [["$name"]] | [["$((a + b))"]] | [["\$5"]] |
| Swift | [["\(name)"]] | [["\(a + b)"]] | [[$]] عادي |

---

## الخلاصة

- [[$name]] لاسم بسيط بس.
- أي نقطة أو حساب أو نداء: [[$__{...}]].
- [["$user.name"]] بتطبع الـ object كله وبعده [[.name]]، مش الاسم.`,
          lines: [
            R`متغير.`,
            R`object.`,
            R`[[أهلًا Sara]].`,
            R`[[$__{}]] مع خانة وحساب: [[Ali عنده 21 سنة السنة الجاية]].`,
            R`غلط: لو User data class هيطبع [[User(name=Ali, age=20).name]]، لأن [[$user]] وقفت عند النقطة.`,
            R`[[\$]] دولار حرفي.`
          ],
          sol: R`[[println("$user.name")]] ← [[User(name=Ali).name]]. [[println("$__{user.name}")]] ← [[Ali]].`
        }
      ]
    }
]);
