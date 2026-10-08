// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "Kotlin بأسلوبها: lambdas والامتدادات والأخطاء",
      l: 1,
      n: "تزوّد دوال على كلاس مش بتاعك، والـ lambdas والدوال اللي بتاخد دوال، و let و apply وأخواتهم، و try و Result",
      items: [
        {
          cmd: "extension functions",
          title: "extension function: تضيف دالة لـ String أو أي كلاس من غير ما تلمسه",
          desc: R`عايز [["sara@mail.com".isValidEmail()]]؟ String مش بتاعتك ومتقدرش تعدّل فيها، بس Kotlin بتخليك تكتب:
[[fun String.isValidEmail(): Boolean = contains("@") && contains(".")]]
• [[String.]] قبل اسم الدالة معناها «الدالة دي هتتنادى على String». النوع ده اسمه receiver.
• جوه الدالة [[this]] هو النص نفسه، وممكن تسيبها وتكتب [[contains(...)]] على طول.

وفيه extension property: [[val String.initials: String get() = ...]]. من غير قيمة مخزنة، لازم getter.

وتقدر تعمل extension على نوع nullable: [[fun String?.orDash()]]. تتنادى على [[null]] عادي، وجواها [[this]] ممكن تبقى null.

مكتبة Kotlin نفسها معظمها extensions: [[filter]] و [[map]] و [[isNullOrBlank]] و [[toIntOrNull]] كلهم extensions على List و String. وفي Android كمان: مكتبة [[core-ktx]] فيها extensions زي [[context.getSystemService<T>()]] و [[bundleOf("id" to 5)]].`,
          example: R`fun String.isValidEmail(): Boolean = contains("@") && contains(".")
fun Double.toEgp(): String = "%.2f ج.م".format(this)
val String.initials: String
    get() = split(" ").joinToString("") { it.take(1) }
fun String?.orDash(): String = this ?: "-"
fun main() {
    println("sara@mail.com".isValidEmail())
    println("sara".isValidEmail())
    println(99.5.toEgp())
    println("Sara Ahmed".initials)
    val phone: String? = null
    println(phone.orDash())
}`,
          try: R`اكتب [[fun Int.isEven(): Boolean]] و [[fun List<Int>.secondLargest(): Int?]] (ترجّع null لو أقل من رقمين مختلفين). جرّب [[listOf(5, 9, 3, 9).secondLargest()]].`,
          flag: "script",
          deep: {
            why: R`بتخلي الكود يتقري زي الجملة: [[price.toEgp()]] بدل [[Formatter.formatEgp(price)]]. وفي Compose كل [[Modifier.padding()]] و [[Modifier.clickable()]] هي extensions على Modifier، وتقدر تعمل modifiers بتاعتك بنفس الطريقة.`,
            how: R`الـ extension مش بتغيّر الكلاس فعلًا. المترجم بيحوّلها لدالة static عادية أول parameter فيها هو الـ receiver: [[isValidEmail("sara")]]. عشان كده:
• مبتقدرش توصل لحاجة [[private]] جوه الكلاس.
• بتتحدد وقت الترجمة حسب النوع المكتوب، مش النوع الحقيقي وقت التشغيل (مفيش polymorphism).
• لو الكلاس عنده دالة بنفس الاسم والـ parameters، دالة الكلاس هي اللي بتكسب دايمًا.

ولو عرّفتها في ملف، بتعمل لها import من أي ملف تاني زي أي دالة. والعرف تحطها في ملف زي [[StringExt.kt]].`,
            when: "دوال مساعدة صغيرة على أنواع مش بتاعتك (تنسيق، تحقق، تحويل). ولو الدالة محتاجة state كتير أو منطق business حقيقي، مكانها class عادي.",
            mistakes: R`تعمل extensions لكل حاجة على [[String]] أو [[Any]] فالـ autocomplete يتملي حاجات ملهاش علاقة ببعض. وتستنى تعمل override لـ extension في كلاس ابن: مش هتشتغل زي ما متوقع.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيضيف ٣ دوال وproperty على أنواع جاهزة مش بتاعتنا ([[String]] و [[Double]] و [[String?]])، وبيناديهم كأنهم جزء من النوع: [["sara@mail.com".isValidEmail()]]. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

~~~text الناتج
true
false
99.50 ج.م
SA
-
~~~

---

## ١. أول extension function

~~~kotlin
fun String.isValidEmail(): Boolean = contains("@") && contains(".")
~~~

| الحتة | معناها |
|---|---|
| [[fun]] | تعريف دالة عادي |
| [[String.]] | الـ **receiver type**: الدالة دي هتتنادى على String بالنقطة |
| [[isValidEmail()]] | اسمها، ومش بتاخد parameters |
| [[: Boolean]] | بترجّع true أو false |
| [[contains("@")]] | من غير حاجة قبلها، يعني [[this.contains("@")]]، و [[this]] هو النص اللي اتنادت عليه |
| [[&&]] | «و»: الاتنين لازم يبقوا true |

- [["sara@mail.com".isValidEmail()]]: فيه [[@]] وفيه [[.]]، فـ [[true]].
- [["sara".isValidEmail()]]: مفيهوش ولا واحدة، فـ [[false]].

> التحقق ده بسيط عن قصد للمثال. [["@."]] هيعدّي برضه، والتحقق الحقيقي بيبقى أدق.

---

## ٢. extension على رقم

~~~kotlin
fun Double.toEgp(): String = "%.2f ج.م".format(this)
~~~

- [[Double.]]: الـ receiver هنا رقم عشري، فـ [[this]] هو الرقم نفسه ([[99.5]]).
- [["%.2f ج.م".format(this)]]: [[format]] نفسها extension على String، بتحط القيمة مكان [[%.2f]]. يعني: [[%]] «هنا قيمة»، و [[.2]] «رقمين بعد العلامة»، و [[f]] «رقم عشري» (float).
- [[99.5.toEgp()]]: النقطة الأولى جزء من الرقم، والتانية نداء الدالة.

~~~text الناتج
99.50 ج.م
~~~

وجرّبت [[99.456]] فطلع [[99.46 ج.م]]: [[%.2f]] بتقرّب مش بتقطع.

### فخ: لغة الجهاز

[[format]] بتستخدم لغة الجهاز (الـ Locale). شغّلت نفس الـ jar بـ [[java -Duser.language=ar -Duser.country=EG -jar ...]] (يعني جهاز لغته عربي مصر):

~~~text الناتج
٩٩٫٥٠ ج.م
~~~

أرقام عربي وفاصلة عشرية عربي. على موبايل لغته عربي ده هيحصل. لو عايز أرقام إنجليزي دايمًا: [["%.2f ج.م".format(Locale.US, this)]] (ومحتاج [[import java.util.Locale]] فوق الملف)، وجرّبتها بنفس اللغة العربي فطلعت [[99.50 ج.م]].

---

## ٣. extension property

~~~kotlin
val String.initials: String
    get() = split(" ").joinToString("") { it.take(1) }
~~~

- [[val String.initials]]: property جديدة على String اسمها initials. بتتقري من غير أقواس: [["Sara Ahmed".initials]].
- الـ extension مبتقدرش تضيف مكان تخزين جوه الكلاس، فلازم [[get()]]: كود بيتحسب كل ما حد يقرا الـ property.

نفكّ الـ getter بالترتيب:

| الخطوة | الكود | النتيجة على [["Sara Ahmed"]] |
|---|---|---|
| ١ | [[split(" ")]] | [[[Sara, Ahmed]]]: List كلمات، مقسومة عند المسافة |
| ٢ | [[{ it.take(1) }]] | لكل كلمة: [[take(1)]] أول حرف، [[S]] ثم [[A]] |
| ٣ | [[joinToString("")]] | لزق الحروف بفاصل فاضي: [[SA]] |

[[joinToString]] من غير فاصل بيحط [[", "]]، فكان هيطلع [[S, A]]. عشان كده كتبنا [[""]]. والـ lambda في الآخر (trailing lambda) بتحوّل كل عنصر قبل اللزق.

---

## ٤. extension على نوع nullable

~~~kotlin
fun String?.orDash(): String = this ?: "-"
~~~

- [[String?]] بعلامة استفهام: الـ receiver ممكن يبقى [[null]]. فالدالة تتنادى على أي String أو null.
- [[this ?: "-"]]: الـ Elvis operator ([[?:]]): «لو اللي على الشمال مش null خده، ولو null خد اللي على اليمين».

~~~kotlin
    val phone: String? = null
    println(phone.orDash())
~~~

لاحظ إننا كتبنا [[phone.orDash()]] بنقطة عادية، مش [[?.]]. ده مسموح لأن الدالة نفسها receiver بتاعها nullable. ولو دالة عادية على [[String]]، المترجم كان هيجبرك تكتب [[?.]].

~~~text الناتج
-
~~~

---

## ٥. الـ extension حقيقتها إيه؟

فكيت الـ jar بـ [[javap -p]] (أداة في الـ JDK بتعرض الكلاس المترجم):

~~~text javap -p L06_exKt (مختصر)
public final class L06_exKt {
  public static final boolean isValidEmail(java.lang.String);
  public static final java.lang.String toEgp(double);
  public static final java.lang.String getInitials(java.lang.String);
  public static final java.lang.String orDash(java.lang.String);
}
~~~

كل extension بقت **دالة static عادية**، وأول parameter فيها هو الـ receiver. يعني [["sara".isValidEmail()]] هي فعلًا [[isValidEmail("sara")]]، والكلاس String نفسه متغيرش. والـ property بقت دالة [[getInitials]]. ومن هنا ٣ قواعد، جرّبتهم:

| القاعدة | التجربة | النتيجة |
|---|---|---|
| مفيش وصول للـ private | [[fun Box.peek() = secret]] و secret private | [[error: cannot access 'val secret: Int': it is private in 'Box'.]] |
| بتتحدد بالنوع المكتوب | [[val a: Animal = Cat()]] و [[a.sound()]] | [[صوت حيوان]] مش [[مياو]] |
| دالة الكلاس بتكسب | الكلاس فيه [[size()]] والـ extension [[size()]] | بيرجّع [[1]] بتاع الكلاس، ومعاه [[warning: this extension is shadowed by a member: 'fun size(): Int' defined in 'Box'.]] |

التانية مهمة: [[Cat]] عنده extension [[sound]] بتاعته، بس المتغير [[a]] مكتوب [[Animal]]، والمترجم بيختار وقت الترجمة حسب المكتوب. عكس [[override]] اللي بيختار حسب الـ object الحقيقي وقت التشغيل.

---

## ٦. حل التجربة (solCode)

~~~kotlin
fun Int.isEven(): Boolean = this % 2 == 0

fun List<Int>.secondLargest(): Int? =
    distinct().sortedDescending().getOrNull(1)
~~~

- [[this % 2 == 0]]: [[%]] باقي القسمة. لو الباقي على 2 صفر يبقى زوجي.
- [[List<Int>.]]: extension على List أرقام بس. وترجّع [[Int?]] لأن ممكن ميبقاش فيه رقم تاني.

نفكّ السلسلة على [[listOf(5, 9, 3, 9)]]:

| الخطوة | الكود | النتيجة |
|---|---|---|
| ١ | [[distinct()]] | [[[5, 9, 3]]]: المكرر اتشال |
| ٢ | [[sortedDescending()]] | [[[9, 5, 3]]]: من الكبير للصغير |
| ٣ | [[getOrNull(1)]] | [[5]]: العنصر رقم 1 (التاني، العد من 0)، أو null لو مش موجود |

~~~text الناتج
true
5
null
~~~

السطر التالت [[listOf(4, 4)]]: بعد distinct بقت [[[4]]] عنصر واحد، فـ [[getOrNull(1)]] رجّعت [[null]] من غير exception. ولو كنا كتبنا [[list[1]]] بدل getOrNull، جرّبتها على List فيها عنصر واحد:

~~~text الناتج
Exception in thread "main" java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[fun T.name(): R]] | دالة جديدة تتنادى على T، و [[this]] جواها هو الـ object |
| [[val T.name: R get() = ...]] | property جديدة، لازم بـ getter |
| [[fun T?.name()]] | تتنادى حتى على null |
| تحت الغطا | دالة static، أول parameter هو الـ receiver |

اللي ميتلخبطش: الـ extension مبتغيّرش الكلاس ومبتشوفش الـ private، وبتتختار حسب النوع **المكتوب**، ولو الكلاس عنده دالة بنفس الاسم هي اللي بتكسب.`,
          lines: [
            R`extension على String، و [[contains]] بتتنادى على النص نفسه (this).`,
            R`extension على Double، و [[this]] هو الرقم.`,
            "extension property نوعها String.",
            R`getter: يقسّم بالمسافة وياخد أول حرف من كل كلمة.`,
            R`extension على [[String?]]: تتنادى حتى على null.`,
            R`بداية [[main]].`,
            "true.",
            "false.",
            "99.50 ج.م.",
            "SA.",
            "null.",
            R`مفيش [[?.]]: الدالة نفسها بتتعامل مع null وبترجّع -.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[true]]
[[false]]
[[99.50 ج.م]]
[[SA]]
[[-]]

وحل التجربة: [[listOf(5, 9, 3, 9).secondLargest()]] بـ 5 (الـ 9 المكررة بتتحسب مرة بسبب [[distinct()]])، و [[listOf(4, 4).secondLargest()]] بـ null.`,
          solCode: R`fun Int.isEven(): Boolean = this % 2 == 0

fun List<Int>.secondLargest(): Int? =
    distinct().sortedDescending().getOrNull(1)

fun main() {
    println(4.isEven())
    println(listOf(5, 9, 3, 9).secondLargest())
    println(listOf(4, 4).secondLargest())
}`
        },
        {
          cmd: "lambdas",
          title: "lambda يعني إيه؟ و (Int) -> Int و it و :: والـ trailing lambda",
          desc: R`الـ [[lambda]] دالة من غير اسم بتتكتب كقيمة، وتتحط في متغير أو تتبعت لدالة تانية:
[[val double = { n: Int -> n * 2 }]]
• الكود كله بين [[{ }]].
• قبل السهم [[->]] المدخلات، وبعده الجسم. آخر سطر في الجسم هو القيمة اللي بترجع (من غير return).

نوع الدالة بيتكتب [[(Int) -> Int]]: «بتاخد Int وبترجّع Int». و [[() -> Unit]]: مبتاخدش حاجة ومبترجّعش حاجة (ده نوع [[onClick]] في كل زرار في Compose).

لو الـ lambda بتاخد parameter واحد بس، ممكن متكتبش اسمه ولا السهم، وتسميه [[it]]: [[{ it * 2 }]].

الدالة اللي بتاخد دالة (higher-order function) زي [[filter]] و [[map]]: لو آخر parameter دالة، الـ lambda تتكتب برا الأقواس:
[[applyTwice(3) { it + 10 }]] بدل [[applyTwice(3, { it + 10 })]]. ولو هي الـ parameter الوحيد، الأقواس نفسها بتتشال: [[list.filter { ... }]]. ده اسمه trailing lambda، وكل Compose ماشي بيه: [[Button(onClick = { ... }) { Text("...") }]].

و [[::]] بتحوّل دالة موجودة لقيمة (function reference): [[nums.filter(::isEven)]] بدل [[nums.filter { isEven(it) }]].`,
          example: R`fun applyTwice(x: Int, op: (Int) -> Int): Int = op(op(x))
fun isEven(n: Int) = n % 2 == 0
fun main() {
    val double: (Int) -> Int = { n -> n * 2 }
    println(double(5))
    val add = { a: Int, b: Int -> a + b }
    println(add(2, 3))
    println(applyTwice(3, double))
    println(applyTwice(3) { it + 10 })
    val nums = listOf(1, 2, 3, 4, 5)
    println(nums.filter(::isEven))
    var clicks = 0
    val onClick: () -> Unit = { clicks++ }
    onClick()
    onClick()
    println(clicks)
}`,
          try: R`اكتب دالة [[retry(times: Int, action: () -> Boolean): Boolean]] بتنادي action لحد ما ترجّع true أو المحاولات تخلص. جرّبها بـ lambda بتعدّ المحاولات وترجّع true في المحاولة التالتة، واطبع عدد المحاولات.`,
          flag: "script",
          deep: {
            why: R`في Android كل حدث lambda: [[onClick]] و [[onValueChange]] و [[setOnClickListener { }]]. والـ ViewModel بياخد lambdas، والـ coroutines (مستوى ٢) بتبدأ بـ [[launch { }]] وده lambda. لو الفكرة دي مش واضحة، كود Compose هيبان كأنه سحر.`,
            how: R`الـ lambda ممكن تشوف المتغيرات اللي حواليها وتغيّرها كمان: [[clicks++]] جوه الـ lambda بتغيّر المتغير اللي برا. ده اسمه closure.

[[return]] جوه lambda عادية مش مسموح، إلا لو الدالة اللي واخداها [[inline]] (زي forEach و let)، ساعتها [[return]] بترجع من الدالة اللي برا خالص. ولو عايز ترجع من الـ lambda بس: [[return@forEach]]. علامة [[@]] هنا label باسم الدالة.

الدوال اللي زي [[filter]] و [[map]] متعلّمة [[inline]]: المترجم بيحط كود الـ lambda مكان النداء، فمفيش object بيتعمل لكل lambda ومفيش أي تكلفة في الأداء.

ولو parameter مش محتاجه: [[{ _, value -> ... }]].`,
            when: R`أي حتة بتبعت فيها «تصرف»: event handlers، والـ callbacks، والفلترة والترتيب. ولو الـ lambda كبرت لأكتر من كام سطر، طلّعها دالة ليها اسم وابعتها بـ [[::]].`,
            mistakes: R`تكتب [[{ it -> it * 2 }]]: لو سميت الـ parameter متقولش it. وتنسى إن آخر سطر هو القيمة: [[{ println(it); it > 5 }]] بترجّع Boolean عادي. وفي Compose تكتب [[onClick = doSomething()]]: كده بتنادي الدالة وقت رسم الشاشة! الصح [[onClick = { doSomething() }]] أو [[onClick = ::doSomething]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف lambdas ويحطها في متغيرات ويناديها، ويبعتها لدالة بتاخد دالة ([[applyTwice]])، ويبعت دالة موجودة بـ [[::]]، وفي الآخر lambda بتغيّر متغير برّاها. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، والأخطاء تحت اتجرّبت فعلًا.

~~~text الناتج
10
5
12
23
[2, 4]
2
~~~

---

## ١. دالة بتاخد دالة

~~~kotlin
fun applyTwice(x: Int, op: (Int) -> Int): Int = op(op(x))
~~~

| الحتة | معناها |
|---|---|
| [[x: Int]] | parameter عادي |
| [[op: (Int) -> Int]] | parameter **نوعه دالة**: بتاخد Int (اللي بين القوسين) وترجّع Int (اللي بعد السهم) |
| [[: Int]] | applyTwice نفسها بترجّع Int |
| [[op(op(x))]] | بننادي op على x، وبعدين على الناتج تاني |

الدالة اللي بتاخد دالة أو بترجّع دالة اسمها **higher-order function**. [[filter]] و [[map]] و [[forEach]] كلهم كده.

وأنواع دوال هتشوفها:

| النوع | معناه |
|---|---|
| [[(Int) -> Int]] | Int داخل، Int خارج |
| [[(Int, Int) -> Int]] | اتنين داخلين |
| [[(String) -> Boolean]] | زي اللي filter بتاخده على List نصوص |
| [[() -> Unit]] | مفيش داخل، ومفيش قيمة خارجة ([[Unit]] = «مفيش حاجة») |

---

## ٢. دالة عادية هنستخدمها كقيمة

~~~kotlin
fun isEven(n: Int) = n % 2 == 0
~~~

[[%]] باقي القسمة، فلو [[n % 2]] صفر يبقى زوجي. دالة عادية ليها اسم، وهنبعتها بعد شوية بـ [[::]].

---

## ٣. lambda في متغير

~~~kotlin
    val double: (Int) -> Int = { n -> n * 2 }
    println(double(5))
~~~

- [[{ ... }]]: الـ lambda كلها بين قوسين معووجين.
- [[n ->]]: اسم المدخل قبل السهم. نوعه مش مكتوب لأن المتغير نوعه مكتوب [[(Int) -> Int]]، فالمترجم عارف إن n هو [[Int]].
- [[n * 2]]: الجسم. **آخر تعبير** في الـ lambda هو قيمتها، من غير [[return]].
- [[double(5)]]: بتنادي المتغير كأنه دالة.

~~~text الناتج
10
~~~

---

## ٤. lambda بـ parameterين

~~~kotlin
    val add = { a: Int, b: Int -> a + b }
    println(add(2, 3))
~~~

هنا المتغير ملوش نوع مكتوب، فالأنواع لازم تتكتب **جوه** الـ lambda ([[a: Int, b: Int]]). والمترجم استنتج إن add نوعها [[(Int, Int) -> Int]]. والمدخلات بينها فاصلة قبل السهم.

~~~text الناتج
5
~~~

لو شيلت الأنواع من الاتنين (لا في المتغير ولا جوه)، المترجم مش هيعرف حاجة. جرّبت [[val f = { it -> it * 2 }]]:

~~~text رسالة المترجم
error: an explicit type is required on a value parameter.
~~~

---

## ٥. نبعت lambda لدالة

~~~kotlin
    println(applyTwice(3, double))
    println(applyTwice(3) { it + 10 })
~~~

السطر الأول بيبعت المتغير [[double]] نفسه (من غير أقواس، يعني من غير ما نناديه):

~~~text الخطوات
op(3)  = 3 * 2  = 6
op(6)  = 6 * 2  = 12
~~~

السطر التاني فيه حاجتين جداد:

- **trailing lambda**: آخر parameter في applyTwice دالة، فالـ lambda اتكتبت **برا** الأقواس. ده بالظبط زي [[applyTwice(3, { it + 10 })]].
- [[it]]: الـ lambda بتاخد parameter واحد، فمش لازم تسميه ولا تكتب السهم. Kotlin بتسميه [[it]] لوحدها.

~~~text الخطوات
3 + 10 = 13
13 + 10 = 23
~~~

~~~text الناتج
12
23
~~~

ولو الـ lambda هي الـ parameter **الوحيد**، الأقواس الفاضية نفسها بتتشال: [[list.filter { ... }]] بدل [[list.filter() { ... }]].

---

## ٦. [[::]] function reference

~~~kotlin
    val nums = listOf(1, 2, 3, 4, 5)
    println(nums.filter(::isEven))
~~~

- [[::isEven]]: «الدالة isEven نفسها كقيمة»، من غير ما تناديها. نوعها [[(Int) -> Boolean]]، وده بالظبط اللي [[filter]] عايزاه على List أرقام.
- نفس الكلام بالظبط: [[nums.filter { isEven(it) }]]. الـ [[::]] أقصر لما عندك دالة جاهزة.
- [[filter]] بتسيب العناصر اللي الدالة رجّعت لها [[true]].

~~~text الناتج
[2, 4]
~~~

---

## ٧. closure: lambda بتغيّر متغير برّاها

~~~kotlin
    var clicks = 0
    val onClick: () -> Unit = { clicks++ }
    onClick()
    onClick()
    println(clicks)
~~~

- [[() -> Unit]]: مبتاخدش حاجة ومبترجّعش حاجة مفيدة. ده نوع [[onClick]] في كل زرار في Compose.
- [[clicks++]] جوه الـ lambda بتغيّر المتغير اللي **برا**. الـ lambda «ماسكة» المتغيرات اللي حواليها وقت ما اتعملت، وده اسمه **closure**.
- [[onClick()]] مرتين: كل مرة clicks بيزيد.

~~~text الناتج
2
~~~

---

## ٨. حاجات اتجرّبت زيادة

### آخر سطر هو القيمة

~~~kotlin
    val h = { x: Int -> println(x); x > 5 }
    println(h(7))
~~~

~~~text الناتج
7
true
~~~

[[;]] بتفصل أمرين في سطر واحد. الـ lambda طبعت 7، وقيمتها آخر تعبير [[x > 5]].

### [[return]] جوه lambda

جرّبت [[{ x: Int -> if (x > 1) return x; x }]]:

~~~text رسالة المترجم
error: 'return' is prohibited here.
~~~

[[return]] من غير label بترجع من الدالة اللي **برا**، ومش مسموحة في lambda عادية. جوه [[forEach]] (دالة [[inline]]) لو عايز «اقفز للعنصر اللي بعده» اكتب [[return@forEach]]:

~~~kotlin
    listOf(1, 2, 3).forEach {
        if (it == 2) return@forEach
        println(it)
    }
~~~

~~~text الناتج
1
3
~~~

### غلطة Compose المشهورة

~~~kotlin
fun doSomething() { println("اتنادت!") }
fun button(onClick: () -> Unit) {}
    button(onClick = doSomething())
~~~

~~~text رسالة المترجم
error: argument type mismatch: actual type is 'Unit', but '() -> Unit' was expected.
~~~

[[doSomething()]] بالأقواس **بتنادي** الدالة دلوقتي وبتبعت ناتجها (Unit)، مش الدالة نفسها. الصح [[{ doSomething() }]] أو [[::doSomething]].

### لو طبعت lambda

[[println(double)]] بيطبع حاجة زي [[V07cKt$$Lambda/0x00007a8c08000400@266474c2]]: الـ lambda object والـ JVM عملت له كلاس، مش قيمة مفيدة.

---

## ٩. حل التجربة (solCode)

~~~kotlin
fun retry(times: Int, action: () -> Boolean): Boolean {
    repeat(times) {
        if (action()) return true
    }
    return false
}
~~~

- [[action: () -> Boolean]]: دالة مبتاخدش حاجة وبترجّع نجحت ولا لأ.
- [[repeat(times) { }]]: نفّذ الـ block عدد مرات. و [[repeat]] دالة [[inline]]، فـ [[return true]] جواها مسموحة وبترجع من [[retry]] كلها على طول.
- لو اللفات خلصت من غير نجاح: [[return false]].

~~~kotlin
    var attempts = 0
    val ok = retry(5) {
        attempts++
        attempts == 3
    }
~~~

الـ lambda closure بتزوّد attempts، وآخر سطر [[attempts == 3]] هو اللي بيترجع: false ثم false ثم true، فـ retry وقفت عند المحاولة التالتة.

~~~text الناتج
true
3
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[{ a: Int, b: Int -> a + b }]] | lambda: المدخلات قبل السهم، وآخر تعبير هو القيمة |
| [[(Int) -> Int]] و [[() -> Unit]] | أنواع الدوال |
| [[{ it * 2 }]] | parameter واحد من غير اسم |
| [[f(x) { ... }]] | trailing lambda: آخر parameter برا الأقواس |
| [[::name]] | دالة موجودة كقيمة |
| [[return@forEach]] | ارجع من الـ lambda بس |

اللي ميتلخبطش: [[onClick = { f() }]] بتبعت تصرف يتنفذ بعدين، و [[onClick = f()]] بتنفذه دلوقتي.`,
          lines: [
            R`دالة بتاخد دالة: [[op]] نوعها [[(Int) -> Int]]، وبنناديها مرتين.`,
            "دالة عادية هنستخدمها كقيمة.",
            R`بداية [[main]].`,
            R`lambda في متغير، والنوع مكتوب، و [[n ->]] اسم المدخل.`,
            "10.",
            "lambda بـ parameterين، والأنواع جواها.",
            "5.",
            "بنبعت المتغير double: 3 ثم 6 ثم 12.",
            R`trailing lambda و [[it]]: 3 ثم 13 ثم 23.`,
            "List أرقام.",
            R`[[::isEven]]: الدالة نفسها كقيمة. [2, 4].`,
            "متغير برا الـ lambda.",
            R`lambda نوعها [[() -> Unit]] بتغيّر المتغير اللي برا (closure).`,
            "نداء.",
            "نداء تاني.",
            "2.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[10]]
[[5]]
[[12]]
[[23]]
[[[2, 4]]]
[[2]]

وحل التجربة تحت: بيطبع [[true]] وبعدين [[3]].`,
          solCode: R`fun retry(times: Int, action: () -> Boolean): Boolean {
    repeat(times) {
        if (action()) return true
    }
    return false
}

fun main() {
    var attempts = 0
    val ok = retry(5) {
        attempts++
        attempts == 3
    }
    println(ok)
    println(attempts)
}`
        },
        {
          cmd: "scope functions",
          title: "let و apply و also و run و with: تفرق إيه عن بعض؟",
          desc: R`دول ٥ دوال بتنفذ block على object، والفرق في حاجتين: الـ object جوه الـ block اسمه إيه ([[it]] ولا [[this]])، والدالة بترجّع إيه (الـ object نفسه ولا آخر سطر).

• [[let]]: جواه [[it]]، وبترجّع آخر سطر. أشهر استخدام [[x?.let { ... }]]: «لو مش null اعمل كذا».
• [[apply]]: جواه [[this]] (فبتكتب الـ properties على طول)، وبترجّع الـ object نفسه. للتجهيز: اعمل object وظبّط قيمه.
• [[also]]: جواه [[it]]، وبترجّع الـ object نفسه. لحاجة جانبية زي log من غير ما تغيّر السلسلة.
• [[run]]: جواه [[this]]، وبترجّع آخر سطر. تحسب حاجة من object.
• [[with(x) { }]]: زي run بس بتتكتب كدالة عادية مش بنقطة.

قاعدة سهلة تفتكرها: عايز الـ object يرجع؟ [[apply]] (لو هتظبّطه) أو [[also]] (لو هتعمل حاجة جنبه). عايز نتيجة تانية؟ [[let]] (خصوصًا مع null) أو [[run]].`,
          example: R`data class User(var name: String = "", var age: Int = 0, var email: String? = null)
fun main() {
    val user = User().apply {
        name = "Sara"
        age = 25
    }
    println(user)
    val length = user.email?.let { it.length } ?: 0
    println(length)
    val greeting = user.run { "$name عندها $age سنة" }
    println(greeting)
    val saved = user.also { println("بنسجّل: $__{it.name}") }
    println(saved === user)
    with(user) {
        println(name.uppercase())
    }
}`,
          try: R`اعمل [[StringBuilder().apply { append("أهلًا "); append("يا Omar") }.toString()]] واطبعه. بعدين خد [[val input: String? = " 42 "]] وحوّله لرقم بـ [[input?.trim()?.toIntOrNull()?.let { it * 2 }]] واطبع النتيجة، وجرّبه تاني بـ null.`,
          flag: "script",
          deep: {
            why: R`هتقابلهم في كل كود Kotlin وأندرويد: [[Intent(...).apply { putExtra(...) }]]، و [[savedInstanceState?.let { }]]، و [[Room.databaseBuilder(...).build().also { INSTANCE = it }]]. لو مش فاهم الفرق، الكود هيبان ملخبط.`,
            how: R`كلهم دوال [[inline]] صغيرة في مكتبة Kotlin. [[apply]] مثلًا تعريفها تقريبًا: [[fun <T> T.apply(block: T.() -> Unit): T { block(); return this }]].

النوع [[T.() -> Unit]] ده «lambda with receiver»: جوه الـ lambda، [[this]] هو الـ T. هو ده اللي بيخليك تكتب [[name = "Sara"]] من غير [[user.name]]. ونفس الفكرة بالظبط هي اللي بتخلي Gradle Kotlin DSL شغال: [[android { compileSdk = 36 }]] الـ block ده lambda with receiver.

ومع [[this]] لو فيه اسم مكرر بين الـ object واللي برا، ممكن تتلخبط: [[this@MainActivity]] بتحدد أنهي this.`,
            when: R`[[?.let]] للـ null. [[apply]] لتجهيز object. [[also]] للـ logging أو التحقق في نص سلسلة. [[run]] و [[with]] أقل استخدامًا، لحساب حاجة من object.`,
            mistakes: R`تسلسلهم جوه بعض [[a?.let { b?.let { c.apply { } } }]] لحد ما محدش يفهم [[it]] و [[this]] بيشاوروا على إيه. اكتب if عادي أو متغيرات. و [[x?.let { } ?: run { }]] مش زي if/else بالظبط: لو الـ let رجّعت null، الـ run هتشتغل كمان.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيستخدم الـ ٥ scope functions على object واحد من [[User]]: [[apply]] يجهّزه، و [[let]] يتعامل مع email اللي ممكن تبقى null، و [[run]] يحسب نص منه، و [[also]] يعمل log ويرجّعه زي ما هو، و [[with]] يطبع اسمه. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

~~~text الناتج
User(name=Sara, age=25, email=null)
0
Sara عندها 25 سنة
بنسجّل: Sara
true
SARA
~~~

قبل ما نبدأ، الجدول اللي كل الدرس بيلف حواليه:

| الدالة | الـ object جوه الـ block اسمه | بترجّع |
|---|---|---|
| [[let]] | [[it]] | آخر سطر في الـ block |
| [[run]] | [[this]] | آخر سطر في الـ block |
| [[with(x)]] | [[this]] | آخر سطر في الـ block |
| [[apply]] | [[this]] | الـ object نفسه |
| [[also]] | [[it]] | الـ object نفسه |

---

## ١. الكلاس

~~~kotlin
data class User(var name: String = "", var age: Int = 0, var email: String? = null)
~~~

- [[data class]]: عشان الطباعة تبقى مفهومة (درس data class).
- كل property ليها قيمة افتراضية، فـ [[User()]] من غير ولا argument مسموحة.
- [[var]] مش [[val]]: عشان [[apply]] تقدر تغيّرهم بعد الإنشاء.
- [[String?]]: email ممكن تبقى null، وده اللي هنستخدم معاه [[let]].

---

## ٢. [[apply]]: جهّز الـ object

~~~kotlin
    val user = User().apply {
        name = "Sara"
        age = 25
    }
    println(user)
~~~

- [[User()]]: object بالقيم الافتراضية ([[""]] و [[0]] و [[null]]).
- [[.apply { }]]: جوه الـ block، [[this]] هو الـ User ده. فـ [[name = "Sara"]] معناها [[this.name = "Sara"]]، من غير ما تكتب اسم المتغير كل سطر.
- [[apply]] بترجّع **الـ object نفسه**، فـ [[user]] بقى الـ User بعد التظبيط.

~~~text الناتج
User(name=Sara, age=25, email=null)
~~~

---

## ٣. [[?.let]]: لو مش null

~~~kotlin
    val length = user.email?.let { it.length } ?: 0
    println(length)
~~~

نفكّه بالترتيب:

| الخطوة | الحتة | اللي حصل |
|---|---|---|
| ١ | [[user.email]] | قيمتها [[null]] |
| ٢ | [[?.let { it.length }]] | [[?.]] بتقول «لو null متكملش ورجّع null». فالـ let **ماتنفذتش** |
| ٣ | [[?: 0]] | اللي على الشمال null، فخد [[0]] |

ولو email كانت [["sara@mail.com"]]، كانت الـ let هتشتغل و [[it]] هو النص، وترجّع آخر سطر [[it.length]] (13).

~~~text الناتج
0
~~~

---

## ٤. [[run]]: احسب حاجة من الـ object

~~~kotlin
    val greeting = user.run { "$name عندها $age سنة" }
    println(greeting)
~~~

- جوه [[run]]، [[this]] هو الـ user، فـ [[$name]] و [[$age]] من غير [[user.]].
- [[run]] بترجّع آخر سطر، وهو النص ده. فـ greeting نوعها [[String]] مش User.

~~~text الناتج
Sara عندها 25 سنة
~~~

---

## ٥. [[also]]: حاجة جانبية

~~~kotlin
    val saved = user.also { println("بنسجّل: $__{it.name}") }
    println(saved === user)
~~~

- جوه [[also]] الـ object اسمه [[it]]، فبنكتب [[it.name]]. و [[$__{it.name}]] string template بأقواس عشان فيه نقطة.
- [[also]] بترجّع الـ object نفسه، مهما كان آخر سطر (هنا [[println]] اللي بترجّع Unit). فـ saved هو user.
- [[===]]: «نفس الـ object بالظبط؟».

~~~text الناتج
بنسجّل: Sara
true
~~~

---

## ٦. [[with]]: زي run بس كدالة عادية

~~~kotlin
    with(user) {
        println(name.uppercase())
    }
~~~

- [[with(user) { }]]: الـ object بيتبعت كـ argument مش بنقطة قبله. جوه الـ block [[this]] هو user، فـ [[name]] لوحدها.
- [[uppercase()]]: النص بحروف كبيرة.

~~~text الناتج
SARA
~~~

---

## ٧. ليه [[this]] شغالة من غير ما نكتبها؟

تعريف [[apply]] في مكتبة Kotlin تقريبًا:

~~~kotlin
inline fun <T> T.apply(block: T.() -> Unit): T { block(); return this }
~~~

- [[<T>]]: نوع عام (generic)، يعني أي نوع.
- [[T.apply]]: extension على أي نوع (درس extension functions).
- [[block: T.() -> Unit]]: النوع ده اسمه **lambda with receiver**: الـ [[T.]] قبل الأقواس معناها إن جوه الـ lambda، [[this]] هو T. ده كل السر.
- [[block(); return this]]: نفّذ الـ block، ورجّع الـ object نفسه.

وبنفس الطريقة [[let]] نوع الـ block بتاعها [[(T) -> R]] (الـ object بيتبعت كـ parameter عادي فاسمه [[it]])، وبترجّع [[R]] اللي هو ناتج الـ block.

---

## ٨. فخ [[?.let { } ?: run { }]]

ناس بتكتبها كأنها if/else. جرّبت:

~~~kotlin
    val x: String? = "hi"
    val r = x?.let { null } ?: run { "run اشتغلت كمان!" }
    println(r)
~~~

~~~text الناتج
run اشتغلت كمان!
~~~

x مش null، فالـ let اشتغلت، بس **رجّعت null** (آخر سطر فيها). فالـ [[?:]] شافت null على الشمال وشغّلت الـ run. في if/else عادية ده مكانش هيحصل.

---

## ٩. حل التجربة (solCode)

~~~kotlin
    val text = StringBuilder().apply {
        append("أهلًا ")
        append("يا Omar")
    }.toString()
~~~

- [[StringBuilder]]: object بتبني بيه نص حتة حتة. [[append]] بتزوّد على الآخر.
- [[apply]] رجّعت الـ StringBuilder نفسه، فكمّلنا عليه بـ [[.toString()]] عشان ناخد النص.

~~~kotlin
    var input: String? = " 42 "
    println(input?.trim()?.toIntOrNull()?.let { it * 2 })
~~~

| الخطوة | الحتة | النتيجة |
|---|---|---|
| ١ | [[input?.trim()]] | [["42"]]: المسافات اتشالت |
| ٢ | [[?.toIntOrNull()]] | [[42]]: رقم، أو null لو مش رقم |
| ٣ | [[?.let { it * 2 }]] | [[84]] |

ولما [[input = null]]: أول [[?.]] وقفت السلسلة كلها ورجّعت null، من غير exception.

~~~text الناتج
أهلًا يا Omar
84
null
~~~

---

## الخلاصة

| عايز إيه؟ | استخدم |
|---|---|
| أنفّذ حاجة لو القيمة مش null | [[x?.let { }]] |
| أجهّز object وأرجّعه | [[apply]] |
| أعمل log أو حاجة جنب السلسلة وأرجّع نفس الـ object | [[also]] |
| أحسب قيمة من object | [[run]] أو [[with(x)]] |

اللي ميتلخبطش: [[apply]] و [[also]] بيرجّعوا الـ object، و [[let]] و [[run]] و [[with]] بيرجّعوا آخر سطر. و [[it]] مع let و also، و [[this]] مع الباقي.`,
          lines: [
            "data class كل حاجة فيها ليها قيمة افتراضية.",
            R`بداية [[main]].`,
            R`[[apply]]: object فاضي ونظبّطه، وبيرجّع الـ object.`,
            R`جوه apply [[this]] هو الـ User، فنكتب name على طول.`,
            "نفس الكلام.",
            "قفلة apply.",
            "User(name=Sara, age=25, email=null).",
            R`[[?.let]]: email بـ null فالـ let مش هتشتغل، و [[?:]] تحط 0.`,
            "0.",
            R`[[run]]: جواه this، وبيرجّع آخر سطر (النص).`,
            "Sara عندها 25 سنة.",
            R`[[also]]: جواه it، يعمل حاجة جانبية ويرجّع نفس الـ object.`,
            R`[[===]]: نفس الـ object؟ true.`,
            R`[[with]]: زي run بس كدالة عادية.`,
            "SARA.",
            "قفلة with.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[User(name=Sara, age=25, email=null)]]
[[0]]
[[Sara عندها 25 سنة]]
[[بنسجّل: Sara]]
[[true]]
[[SARA]]

وحل التجربة: [[أهلًا يا Omar]]، وبعدين [[84]]، ولما input تبقى null النتيجة [[null]] من غير أي كراش.`,
          solCode: R`fun main() {
    val text = StringBuilder().apply {
        append("أهلًا ")
        append("يا Omar")
    }.toString()
    println(text)
    var input: String? = " 42 "
    println(input?.trim()?.toIntOrNull()?.let { it * 2 })
    input = null
    println(input?.trim()?.toIntOrNull()?.let { it * 2 })
}`
        },
        {
          cmd: "exceptions و Result",
          title: "try و catch و throw و runCatching: تتعامل مع الأخطاء إزاي؟",
          desc: R`الـ exception غلط بيحصل والبرنامج شغال: نص مش رقم، ملف مش موجود، النت فصل. لو محدش مسكه، البرنامج بيقع (في Android: التطبيق بيقفل ويظهر crash).

[[try { ... } catch (e: Exception) { ... }]]: جرّب الكود، ولو رمى exception من النوع ده نفّذ الـ catch. [[finally { }]] بتتنفذ في الحالتين (لقفل حاجة مثلًا).

وفي Kotlin [[try]] تعبير بيرجّع قيمة زي if:
[[val n = try { text.toInt() } catch (e: NumberFormatException) { -1 }]]

[[throw]] بترمي exception بنفسك. وتقدر تعمل نوع خاص بيك بيورث من [[Exception]]. وعندك اختصارات:
• [[require(شرط) { "رسالة" }]]: للمدخلات الغلط، بترمي [[IllegalArgumentException]].
• [[check(شرط)]]: لحالة غلط جوه البرنامج نفسه، بترمي [[IllegalStateException]].
• [[error("رسالة")]]: ترمي IllegalStateException على طول.

[[runCatching { ... }]] بترجّع [[Result]]: object فيه يا النتيجة يا الـ exception، من غير ما تكتب try. وعليه [[isSuccess]] و [[getOrNull()]] و [[getOrDefault(x)]] و [[exceptionOrNull()]] و [[onSuccess { }]] و [[onFailure { }]].

ومفيش في Kotlin checked exceptions زي Java: المترجم مش هيجبرك تكتب catch، وده معناه إن المسؤولية عليك تعرف الدالة ممكن ترمي إيه.`,
          example: R`class InsufficientFunds(val needed: Double) : Exception("الرصيد مش كفاية")
fun withdraw(balance: Double, amount: Double): Double {
    require(amount > 0) { "المبلغ لازم يبقى موجب" }
    if (amount > balance) throw InsufficientFunds(amount - balance)
    return balance - amount
}
fun main() {
    val n = try { "12x".toInt() } catch (e: NumberFormatException) { -1 }
    println(n)
    println("12x".toIntOrNull() ?: 0)
    try {
        withdraw(100.0, 150.0)
    } catch (e: InsufficientFunds) {
        println("$__{e.message}: ناقص $__{e.needed}")
    } finally {
        println("خلصت المحاولة")
    }
    val result = runCatching { withdraw(100.0, -5.0) }
    println(result.isFailure)
    println(result.exceptionOrNull()?.message)
    val ok = runCatching { withdraw(100.0, 40.0) }.getOrDefault(0.0)
    println(ok)
}`,
          try: R`اكتب دالة [[parseAge(text: String): Int]] بترمي [[IllegalArgumentException]] لو النص مش رقم أو الرقم برا 0 لـ 120. ناديها على [["25"]] و [["abc"]] و [["200"]] جوه [[runCatching]]، واطبع النتيجة أو رسالة الغلط بـ [[fold]].`,
          flag: "script",
          deep: {
            why: R`في Android أي نداء للشبكة أو الداتابيز ممكن يفشل، وتطبيق بيقع كل ما النت يفصل هياخد تقييمات وحشة على Play. الـ ViewModel بيمسك الـ exception ويحوّلها لحالة [[Error]] الشاشة تعرضها برسالة مفهومة وزرار «جرّب تاني».`,
            how: R`الـ exception بتطلع لفوق في سلسلة الدوال لحد ما حد يمسكها. لو وصلت للآخر من غير ما حد يمسكها، الـ thread بيقع، وفي Android ده معناه crash ورسالة في Logcat فيها [[FATAL EXCEPTION]] والـ stack trace (السلسلة اللي الغلط عدّى بيها).

امسك أضيق نوع تقدر عليه ([[IOException]] مش [[Exception]])، عشان متبلعش أخطاء برمجية حقيقية زي NullPointerException وتخبيها.

[[runCatching]] بتمسك كل حاجة، بما فيها [[CancellationException]] بتاعة الـ coroutines. لو استخدمتها جوه coroutine ممكن تبوّظ الإلغاء (الـ coroutine المفروض توقف، بس انت بلعت الإشارة). عشان كده في الـ coroutines الأسلم [[try/catch]] على أنواع محددة، أو ترمي الـ CancellationException تاني.

و [[Result]] تقدر ترجّعه من دوالك: [[fun load(): Result<User>]]. بس أغلب مشاريع Android بتعمل sealed class بتاعتها بدل كده عشان تحط أنواع أخطاء واضحة.`,
            when: R`[[try/catch]] حوالين الحاجات اللي ممكن تفشل لأسباب برا كودك: شبكة، ملفات، parsing لكلام جاي من برا. و [[require]] و [[check]] لأخطاء البرمجة. ومتمسكش exception غير لو هتعمل حاجة مفيدة بيها.`,
            mistakes: R`[[catch (e: Exception) { }]] فاضية: الغلط بيختفي ومش هتعرف ليه الشاشة فاضية. على الأقل اعمل log. وتستخدم exceptions للتحكم في سير البرنامج العادي (زي إنك ترمي exception عشان تخرج من loop). و [[runCatching]] جوه coroutines (الكلام اللي فوق).`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف exception خاص بينا ودالة سحب ممكن ترمي نوعين أخطاء، وبعدين بيمسك الأخطاء بـ ٣ طرق: [[try]] كتعبير، و [[try/catch/finally]] كاملة، و [[runCatching]] اللي بترجّع [[Result]]. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

~~~text الناتج
-1
0
الرصيد مش كفاية: ناقص 50.0
خلصت المحاولة
true
المبلغ لازم يبقى موجب
60.0
~~~

---

## ١. exception خاص بيك

~~~kotlin
class InsufficientFunds(val needed: Double) : Exception("الرصيد مش كفاية")
~~~

- [[: Exception(...)]]: بيورث من [[Exception]]، الكلاس الأب لأغلب الأخطاء. والأقواس بتنادي الـ constructor بتاعه بالرسالة، فالرسالة دي هتبقى في [[e.message]].
- [[val needed]]: بيانات زيادة الـ exception شايلها: ناقص كام. ده ميزة الـ exception الخاص: اللي بيمسكه يعرف التفاصيل مش بس رسالة.

---

## ٢. دالة ممكن ترمي

~~~kotlin
fun withdraw(balance: Double, amount: Double): Double {
    require(amount > 0) { "المبلغ لازم يبقى موجب" }
    if (amount > balance) throw InsufficientFunds(amount - balance)
    return balance - amount
}
~~~

- [[require(شرط) { رسالة }]]: لو الشرط false بترمي [[IllegalArgumentException]] بالرسالة. معناها «المدخل اللي جالي غلط».
- [[throw]]: ارمي exception بنفسك. [[InsufficientFunds(amount - balance)]] بيعمل object والـ throw بترميه. الدالة بتقف هنا ومش بترجّع حاجة.
- لو عدّينا الاتنين، نرجّع الرصيد الجديد.

لو exception اترمى ومحدش مسكه، البرنامج كله بيقع. جرّبت [[withdraw(100.0, 150.0)]] من غير try:

~~~text الناتج
Exception in thread "main" InsufficientFunds: الرصيد مش كفاية
	at V09aKt.withdraw(v09a.kt:4)
	at V09aKt.main(v09a.kt:15)
~~~

ده اسمه **stack trace**: نوع الـ exception ورسالته، وتحتهم السلسلة اللي عدّى بيها من تحت لفوق: [[main]] في سطر 15 نادت [[withdraw]]، اللي رمت في سطر 4. وفي Android ده بالظبط اللي بيظهر في Logcat مع [[FATAL EXCEPTION]] والتطبيق بيقفل.

---

## ٣. [[try]] كتعبير

~~~kotlin
    val n = try { "12x".toInt() } catch (e: NumberFormatException) { -1 }
    println(n)
    println("12x".toIntOrNull() ?: 0)
~~~

- [[try { }]]: جرّب الكود ده.
- [["12x".toInt()]]: بتحوّل نص لرقم، ولو مش رقم بترمي [[NumberFormatException]].
- [[catch (e: NumberFormatException) { -1 }]]: لو اترمى exception **من النوع ده**، نفّذ ده. [[e]] اسم الـ exception اللي اتمسك (هنا مش مستخدمينه).
- في Kotlin [[try]] بترجّع قيمة: آخر سطر في الـ try لو نجحت، أو آخر سطر في الـ catch لو فشلت. فـ n بقت [[-1]]. وجرّبت [["12".toInt()]] فـ n بقت [[12]].
- السطر التالت نفس الفكرة من غير exceptions خالص: [[toIntOrNull()]] بترجّع null بدل ما ترمي، و [[?:]] بتحط 0. ده الأحسن لما الفشل متوقع وعادي.

~~~text الناتج
-1
0
~~~

---

## ٤. [[try]] و [[catch]] و [[finally]]

~~~kotlin
    try {
        withdraw(100.0, 150.0)
    } catch (e: InsufficientFunds) {
        println("$__{e.message}: ناقص $__{e.needed}")
    } finally {
        println("خلصت المحاولة")
    }
~~~

1. [[withdraw(100.0, 150.0)]]: 150 أكتر من 100، فبترمي [[InsufficientFunds(50.0)]].
2. الـ catch بتمسك النوع ده بالظبط. و [[e]] نوعه [[InsufficientFunds]]، فنقدر نقرا [[e.message]] (من الأب) و [[e.needed]] (بتاعتنا).
3. [[finally]] بتتنفذ **في كل الأحوال**: نجح، أو اتمسك exception، أو حتى لو exception عدّى من غير ما يتمسك. مكانها الطبيعي قفل ملف أو اتصال.

~~~text الناتج
الرصيد مش كفاية: ناقص 50.0
خلصت المحاولة
~~~

وجرّبت [[try { 10 } finally { println("finally") }]] فطبع [[finally]] والقيمة فضلت [[10]]: الـ finally مش بتغيّر قيمة الـ try.

---

## ٥. [[runCatching]] و [[Result]]

~~~kotlin
    val result = runCatching { withdraw(100.0, -5.0) }
    println(result.isFailure)
    println(result.exceptionOrNull()?.message)
    val ok = runCatching { withdraw(100.0, 40.0) }.getOrDefault(0.0)
    println(ok)
~~~

- [[runCatching { }]]: بتشغّل الـ block وبتمسك **أي** exception، وبترجّع object من نوع [[Result]]: يا [[Success]] فيه القيمة، يا [[Failure]] فيه الـ exception.
- [[-5.0]]: الـ require فشلت، فـ result بقى Failure.
- [[isFailure]]: [[true]].
- [[exceptionOrNull()]]: الـ exception لو فشل، أو null لو نجح. و [[?.message]] رسالته.
- [[getOrDefault(0.0)]]: القيمة لو نجح، أو 0.0 لو فشل. 100 - 40 = [[60.0]].

~~~text الناتج
true
المبلغ لازم يبقى موجب
60.0
~~~

طبعت الـ Result نفسه عشان تشوف شكله:

~~~text الناتج
Failure(InsufficientFunds: الرصيد مش كفاية)
Success(60.0)
~~~

| على [[Result]] | بيرجّع |
|---|---|
| [[isSuccess]] و [[isFailure]] | نجح ولا لأ |
| [[getOrNull()]] | القيمة أو null |
| [[getOrDefault(x)]] | القيمة أو x |
| [[exceptionOrNull()]] | الـ exception أو null |
| [[onSuccess { }]] و [[onFailure { }]] | ينفّذ block في الحالة دي |
| [[fold(onSuccess = { }, onFailure = { })]] | يحوّل الحالتين لقيمة واحدة |

---

## ٦. [[check]] و [[error]]

جرّبتهم جوه [[runCatching]] وطبعت الـ exception:

| الكود | الـ exception |
|---|---|
| [[check(false) { "حالة غلط" }]] | [[java.lang.IllegalStateException: حالة غلط]] |
| [[error("وقفنا")]] | [[java.lang.IllegalStateException: وقفنا]] |
| [["12x".toInt()]] | [[java.lang.NumberFormatException: For input string: "12x"]] |

[[require]] للمدخلات الغلط (IllegalArgument)، و [[check]] و [[error]] لحالة غلط جوه البرنامج نفسه (IllegalState).

---

## ٧. حل التجربة (solCode)

~~~kotlin
fun parseAge(text: String): Int {
    val n = text.toIntOrNull() ?: throw IllegalArgumentException("$text مش رقم")
    require(n in 0..120) { "$n برا المدى" }
    return n
}
~~~

- [[?: throw ...]]: في Kotlin [[throw]] تعبير، فينفع على يمين الـ Elvis. يعني «الرقم، ولو null ارمي».
- [[n in 0..120]]: [[..]] range من 0 لـ 120 شاملة الطرفين، و [[in]] بتسأل هل n جواها.

~~~kotlin
    for (t in listOf("25", "abc", "200")) {
        val msg = runCatching { parseAge(t) }.fold(
            onSuccess = { "سن: $it" },
            onFailure = { "غلط: $__{it.message}" }
        )
        println(msg)
    }
~~~

- [[fold]] بتاخد lambdaين بالاسم: واحدة للنجاح ([[it]] هي القيمة)، وواحدة للفشل ([[it]] هو الـ exception). واللي بيتنفذ بيرجّع النص.

~~~text الناتج
سن: 25
غلط: abc مش رقم
غلط: 200 برا المدى
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[class E : Exception("msg")]] | exception خاص |
| [[throw E()]] | ارمي |
| [[val x = try { } catch (e: T) { }]] | try بترجّع قيمة |
| [[finally { }]] | بتتنفذ دايمًا |
| [[require]] / [[check]] / [[error]] | IllegalArgument / IllegalState / IllegalState |
| [[runCatching { }]] | [[Result]]: Success أو Failure من غير try |

اللي ميتلخبطش: امسك أضيق نوع تقدر عليه، و [[toIntOrNull]] أحسن من try حوالين [[toInt]] لما الفشل عادي. و [[runCatching]] بتمسك كل حاجة، فبلاش منها جوه coroutines.`,
          lines: [
            R`exception خاص بيك بيورث من [[Exception]] ومعاه بيانات زيادة.`,
            "دالة ممكن ترمي.",
            R`[[require]]: لو المبلغ مش موجب يرمي IllegalArgumentException.`,
            R`[[throw]]: نرمي الـ exception بتاعنا ومعاه الفرق.`,
            "لو كله تمام نرجّع الرصيد الجديد.",
            "قفلة.",
            R`بداية [[main]].`,
            R`[[try]] كتعبير: "12x" مش رقم، فالـ catch بترجّع -1.`,
            "-1.",
            R`البديل الأبسط من غير exception: [[toIntOrNull]].`,
            R`[[try]] block.`,
            "150 أكتر من 100: هيرمي InsufficientFunds.",
            R`[[catch]] للنوع ده بالظبط.`,
            "الرسالة والمبلغ الناقص.",
            R`[[finally]]: بتتنفذ في الحالتين.`,
            "خلصت المحاولة.",
            "قفلة.",
            R`[[runCatching]] بترجّع Result بدل ما الـ exception تطلع.`,
            "true: فشلت.",
            R`رسالة الغلط من [[require]].`,
            R`نجحت، و [[getOrDefault]] بترجّع النتيجة: 60.0.`,
            "60.0.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[-1]]
[[0]]
[[الرصيد مش كفاية: ناقص 50.0]]
[[خلصت المحاولة]]
[[true]]
[[المبلغ لازم يبقى موجب]]
[[60.0]]

وحل التجربة تحت: [[سن: 25]] ثم [[غلط: abc مش رقم]] ثم [[غلط: 200 برا المدى]].`,
          solCode: R`fun parseAge(text: String): Int {
    val n = text.toIntOrNull() ?: throw IllegalArgumentException("$text مش رقم")
    require(n in 0..120) { "$n برا المدى" }
    return n
}

fun main() {
    for (t in listOf("25", "abc", "200")) {
        val msg = runCatching { parseAge(t) }.fold(
            onSuccess = { "سن: $it" },
            onFailure = { "غلط: $__{it.message}" }
        )
        println(msg)
    }
}`
        }
      ]
    }
]);
