// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "الكلاسات",
      l: 1,
      n: "class والـ constructor، و data class، و object و companion، و enum و sealed، و interface والوراثة",
      items: [
        {
          cmd: "class",
          title: "تعمل class في Kotlin إزاي؟ (primary constructor و properties و init و private set)",
          desc: R`الـ [[class]] قالب بتعمل منه objects. كل object ليه بيانات (properties) وتصرفات (methods، يعني دوال جوه الكلاس).

في Kotlin الـ constructor بيتكتب في نفس سطر اسم الكلاس، واسمه primary constructor:
[[class BankAccount(val owner: String, initialBalance: Double = 0.0)]]
• [[val owner]] بـ val أو var: ده parameter وكمان property في نفس الوقت. تقدر تقول [[acc.owner]] من برا.
• [[initialBalance]] من غير val: parameter بس، بتستخدمه وانت بتعمل الـ object ومش بيتحفظ.

وتعمل object بنداء الكلاس كأنه دالة: [[BankAccount("Sara", 100.0)]]. مفيش [[new]] في Kotlin.

جوه الكلاس:
• [[init { }]]: كود بيتنفذ أول ما الـ object يتعمل، مكان مناسب للتحقق من القيم. [[require(شرط) { "رسالة" }]] بترمي exception لو الشرط false.
• [[var balance = initialBalance]] و [[private set]] تحتيها: أي حد يقدر يقرا balance، بس محدش يغيّرها غير الكلاس نفسه. ده اسمه encapsulation.
• [[override fun toString()]]: بتحدد الـ object يتطبع إزاي. [[override]] معناها «بغيّر دالة موجودة أصلًا في الأب» (كل الكلاسات في Kotlin بتورث من [[Any]] اللي فيها toString).

الـ visibility: [[public]] (الافتراضي، مش لازم تكتبها)، و [[private]] (جوه الكلاس بس)، و [[protected]] (الكلاس وولاده)، و [[internal]] (جوه نفس الـ module، يعني نفس مشروع Gradle).`,
          example: R`class BankAccount(val owner: String, initialBalance: Double = 0.0) {
    var balance = initialBalance
        private set
    init {
        require(initialBalance >= 0) { "الرصيد مينفعش يبقى سالب" }
    }
    fun deposit(amount: Double) {
        balance += amount
    }
    fun withdraw(amount: Double): Boolean {
        if (amount > balance) return false
        balance -= amount
        return true
    }
    override fun toString() = "$owner: $balance"
}
fun main() {
    val acc = BankAccount("Sara", 100.0)
    acc.deposit(50.0)
    println(acc.withdraw(500.0))
    println(acc.withdraw(30.0))
    println(acc)
    // السطر الجاي مش هيترجم: balance ليها private set
    // acc.balance = 1_000_000.0
}`,
          try: R`اعمل [[class Counter(private val max: Int)]] فيها [[var value = 0]] بـ [[private set]]، ودالة [[increment()]] بتزوّد واحد بس لو لسه أقل من max، ودالة [[reset()]]. جرّبها بـ max = 3 وزوّد 5 مرات واطبع value. وبعدين جرّب تكتب [[counter.value = 10]] من main.`,
          flag: "script",
          deep: {
            why: R`كل حاجة في Android كلاس: الـ Activity، والـ ViewModel، والـ Repository، والـ Room Database. وفهم الـ constructor والـ visibility هو اللي بيخليك تقرا أي كود Android. والـ [[private set]] بالذات هتشوفه في كل ViewModel: الشاشة تقرا الـ state بس، والـ ViewModel بس اللي يغيّرها.`,
            how: R`الـ property في Kotlin مش متغير عادي: هي field مخفي ومعاه getter (و setter لو var). [[acc.balance]] بتنادي getter في الخفا. وتقدر تكتب getter بنفسك: [[val isRich get() = balance > 1_000_000]] بتتحسب كل مرة تتقري، ومش بتتخزن.

الكلاسات في Kotlin [[final]] افتراضيًا: محدش يقدر يورث منها إلا لو كتبت [[open class]] (درس interface والوراثة).

ولو محتاج أكتر من طريقة تعمل بيها object: الأفضل قيم افتراضية في الـ primary constructor، وفيه كمان secondary constructor بـ [[constructor(...) : this(...)]] بس نادرًا ما هتحتاجه.

و [[lateinit var]] و [[by lazy]] (من درس null safety) أكتر مكان بيتستخدموا فيه جوه الكلاسات: property هتتعمل بعدين، أو حسابها تقيل ومش عايزه يتعمل غير لو احتاجته.`,
            when: R`لما عندك بيانات ومعاها تصرفات وقواعد (رصيد مينفعش يبقى سالب). ولو الكلاس بيشيل داتا بس من غير قواعد، [[data class]] (الدرس الجاي) أنسب.`,
            mistakes: R`تكتب [[new BankAccount(...)]] من عادة Java. وتنسى [[val]] في الـ constructor وتستغرب إن [[acc.owner]] مش موجود. وتخلي كل الـ properties [[var]] و public فأي حد يغيّر الرصيد من برا من غير ما يعدّي على قواعد [[withdraw]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف كلاس حساب بنكي فيه صاحب ورصيد، ويعمل منه object، ويحط فلوس ويسحب مرتين (مرة تفشل ومرة تنجح)، ويطبع الحساب. كل الناتج اتشغّل بـ [[kotlinc ex.kt -include-runtime -d ex.jar && java -jar ex.jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، والأخطاء اللي تحت اتجرّبت بتعديل الملف فعلًا.

~~~text الناتج
false
true
Sara: 120.0
~~~

---

## ١. سطر الكلاس: الـ primary constructor

~~~kotlin
class BankAccount(val owner: String, initialBalance: Double = 0.0) {
~~~

| الحتة | معناها |
|---|---|
| [[class]] | «بعرّف كلاس»، يعني قالب هنعمل منه objects |
| [[BankAccount]] | اسم الكلاس. بالعرف بيبدأ بحرف كبير (PascalCase) |
| [[( ... )]] | الـ **primary constructor**: المدخلات اللي لازم تديها وانت بتعمل object |
| [[val owner: String]] | parameter **و** property في نفس الوقت، عشان قدامه [[val]] |
| [[initialBalance: Double]] | parameter بس (مفيش val ولا var)، بيتشاف وقت إنشاء الـ object وبعدها بيختفي |
| [[= 0.0]] | قيمة افتراضية: لو محدش اداه قيمة ياخد 0.0 |
| [[{]] | بداية جسم الكلاس |

الفرق بين [[owner]] و [[initialBalance]] مهم. جرّبت أشيل [[val]] من owner وأقرا الاتنين من برا:

~~~text رسالة المترجم
error: unresolved reference 'owner' on receiver of type 'BankAccount'.
error: unresolved reference 'initialBalance' on receiver of type 'BankAccount'.
~~~

يعني من غير [[val]] أو [[var]] الاسم مش بيبقى جزء من الـ object.

---

## ٢. property بـ [[private set]]

~~~kotlin
    var balance = initialBalance
        private set
~~~

- [[var balance]]: property قابلة للتغيير، وقيمتها الأولى جاية من الـ parameter. النوع [[Double]] اتستنتج من القيمة.
- [[private set]] في السطر اللي تحتها بتتكلم عن balance نفسها: الـ **getter** (القراية) public زي ما هو، والـ **setter** (الكتابة) [[private]]، يعني محدش يغيّرها غير كود جوه الكلاس.

الـ property في Kotlin مش متغير مكشوف: هي field مخفي ومعاه دوال قراية وكتابة. فكيت الـ jar بـ [[javap -p]] (أداة في الـ JDK بتعرض محتوى الكلاس المترجم) وطلع:

~~~text javap -p BankAccount (مختصر)
public final class BankAccount {
  private final java.lang.String owner;
  private double balance;
  public final java.lang.String getOwner();
  public final double getBalance();
  public final void deposit(double);
  public final boolean withdraw(double);
  public java.lang.String toString();
}
~~~

- [[owner]] و [[balance]] نفسهم [[private]]، واللي ظاهر من برا هو [[getOwner()]] و [[getBalance()]]. لما تكتب [[acc.balance]]، Kotlin بتنادي [[getBalance()]] في الخفا.
- مفيش [[setBalance]] خالص: الـ setter الـ private مبيعملش حاجة غير إنه يكتب في الـ field، فالمترجم بيكتب في الـ field على طول.
- مفيش [[initialBalance]] في الكلاس المترجم: اتأكدنا إنه parameter بس.
- [[final]] قدام الكلاس: الكلاسات في Kotlin مقفولة على الوراثة افتراضيًا (درس interface والوراثة).

ولو حاولت تكتب من برا (السطر المتعلّق في آخر المثال):

~~~text رسالة المترجم لـ acc.balance = 1_000_000.0
error: cannot access 'balance': it is private in 'BankAccount'.
~~~

و [[1_000_000.0]]: الـ [[_]] جوه الرقم للقراية بس، المترجم بيشيلها.

---

## ٣. [[init]] و [[require]]

~~~kotlin
    init {
        require(initialBalance >= 0) { "الرصيد مينفعش يبقى سالب" }
    }
~~~

- [[init { }]]: block بيتنفذ مرة واحدة كل ما object جديد يتعمل، بعد ما الـ properties اللي فوقه تاخد قيمها. ده جسم الـ primary constructor عمليًا.
- [[require(شرط) { رسالة }]]: دالة جاهزة في Kotlin. لو الشرط [[true]] متعملش حاجة، ولو [[false]] ترمي [[IllegalArgumentException]] بالرسالة اللي جوه الـ [[{ }]] (دي lambda، ليها درس لوحدها).
- [[initialBalance]] متاح هنا لأن [[init]] بيتنفذ وقت الإنشاء.

جرّبت [[BankAccount("Sara", -5.0)]]:

~~~text الناتج
Exception in thread "main" java.lang.IllegalArgumentException: الرصيد مينفعش يبقى سالب
	at BankAccount.<init>(v01b.kt:5)
	at V01bKt.main(v01b.kt:12)
~~~

[[<init>]] ده اسم الـ constructor جوه الـ JVM. يعني الـ object عمره ما اتعمل برصيد سالب، وده الهدف.

---

## ٤. الـ methods

~~~kotlin
    fun deposit(amount: Double) {
        balance += amount
    }
    fun withdraw(amount: Double): Boolean {
        if (amount > balance) return false
        balance -= amount
        return true
    }
~~~

- [[fun]] جوه الكلاس = method. بتشتغل على الـ object اللي اتنادت عليه، فـ [[balance]] هنا هي رصيد الحساب ده بالذات.
- [[balance += amount]] اختصار [[balance = balance + amount]]. مسموح هنا لأننا جوه الكلاس، فالـ [[private set]] مش مانعنا.
- [[: Boolean]] بعد الأقواس: نوع اللي الدالة بترجّعه. [[deposit]] مكتبلهاش نوع، فهي بترجّع [[Unit]] (يعني «مفيش قيمة»).
- [[if (amount > balance) return false]]: الـ **early return**. لو الفلوس مش كفاية، اخرج على طول ومتكملش. السطرين اللي بعدها مش هيتنفذوا.

---

## ٥. [[override fun toString()]]

~~~kotlin
    override fun toString() = "$owner: $balance"
}
~~~

- كل كلاس في Kotlin بيورث من [[Any]]، وفيها [[toString()]] اللي [[println]] بتناديها عشان تعرف تطبع الـ object إزاي.
- [[override]]: «أنا بكتب نسخة جديدة لدالة موجودة في الأب». الكلمة إجبارية في Kotlin.
- [[= "..."]] بدل [[{ return ... }]]: ده اسمه expression body. الدالة كلها تعبير واحد، والنوع ([[String]]) اتستنتج.
- [[$owner]] و [[$balance]]: string templates (درس string templates): القيمة بتتحط جوه النص.

من غير الـ override، جرّبت كلاس عادي [[class Plain(val owner: String)]] وطبعته:

~~~text الناتج
Plain@7f31245a
~~~

اسم الكلاس و [[@]] ورقم hash بالـ hex، بيتغير كل تشغيل. مش مفيد، عشان كده بنعمل override.

---

## ٦. main: بنستخدم الكلاس

~~~kotlin
    val acc = BankAccount("Sara", 100.0)
    acc.deposit(50.0)
    println(acc.withdraw(500.0))
    println(acc.withdraw(30.0))
    println(acc)
~~~

| السطر | اللي حصل | الرصيد بعده | المطبوع |
|---|---|---|---|
| [[BankAccount("Sara", 100.0)]] | object جديد، و init عدّى | 100.0 | |
| [[deposit(50.0)]] | زوّد | 150.0 | |
| [[withdraw(500.0)]] | 500 أكبر من 150، رجعت بدري | 150.0 | [[false]] |
| [[withdraw(30.0)]] | اتخصم | 120.0 | [[true]] |
| [[println(acc)]] | نادت toString بتاعتنا | 120.0 | [[Sara: 120.0]] |

- مفيش [[new]]: بتنادي الكلاس كأنه دالة. لو كتبت [[new BankAccount("x")]] المترجم بيقول [[unresolved reference 'new'.]]
- [[acc]] نفسه [[val]]: يعني مش هتشاور على حساب تاني، بس الحساب من جوه بيتغير عادي عن طريق الـ methods.
- لو ندهت [[BankAccount("Omar")]] من غير رصيد، الـ default بيشتغل وطبعت balance فطلع [[0.0]].

---

## ٧. حل التجربة (solCode)

~~~kotlin
class Counter(private val max: Int) {
    var value = 0
        private set
    fun increment() {
        if (value < max) value++
    }
    fun reset() {
        value = 0
    }
}
~~~

- [[private val max]]: property بس [[private]]، يعني الكلاس يشوفها ومن برا لأ. لاحظ الفرق: هنا الـ property كلها private، وفي balance الـ setter بس.
- [[value++]]: زوّد واحد. الشرط قبلها بيمنعه يعدّي max.
- [[repeat(5) { counter.increment() }]] في main: نفّذ الـ block ٥ مرات. أول ٣ زوّدوا، وآخر اتنين الشرط كان false.

~~~text الناتج
3
~~~

ولو كتبت [[counter.value = 10]] في main:

~~~text رسالة المترجم
error: cannot access 'value': it is private in 'Counter'.
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[class X(val a: T)]] | primary constructor، و [[a]] property |
| [[class X(a: T)]] | [[a]] parameter بس، ميتقريش من برا |
| [[init { }]] | بيتنفذ مع كل object جديد |
| [[require(cond) { msg }]] | [[IllegalArgumentException]] لو الشرط false |
| [[var x ... private set]] | قراية من أي حتة، كتابة من جوه الكلاس بس |
| [[override fun toString()]] | شكل الطباعة |
| [[X(...)]] | object جديد، من غير [[new]] |

اللي ميتلخبطش: [[val]] في الـ constructor هي اللي بتحوّل الـ parameter لـ property، و [[private set]] بتقفل الكتابة بس مش القراية.`,
          lines: [
            R`كلاس بـ primary constructor: [[owner]] property، و [[initialBalance]] parameter بس ليه قيمة افتراضية.`,
            R`property [[var]] بتبدأ من الرصيد الأول.`,
            R`[[private set]]: القراية من أي حتة، والتغيير من جوه الكلاس بس.`,
            R`[[init]]: بيتنفذ أول ما الـ object يتعمل.`,
            R`[[require]]: لو الشرط false بيرمي IllegalArgumentException بالرسالة دي.`,
            "قفلة init.",
            "method بتزوّد الرصيد.",
            "التغيير مسموح هنا لأننا جوه الكلاس.",
            "قفلة.",
            "method بترجّع true أو false.",
            R`[[return]] بدري لو الفلوس مش كفاية.`,
            "اخصم.",
            "نجحت.",
            "قفلة.",
            R`[[override]]: شكل الطباعة بدل اسم الكلاس وعنوان في الذاكرة.`,
            "قفلة الكلاس.",
            R`بداية [[main]].`,
            R`object جديد من غير [[new]].`,
            "بقى 150.",
            "500 أكتر من 150: false.",
            "true، والرصيد بقى 120.",
            R`بيستخدم [[toString]] بتاعتنا.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[false]]
[[true]]
[[Sara: 120.0]]

وحل التجربة تحت: بعد 5 زيادات بـ max = 3 القيمة 3. و [[counter.value = 10]] بتطلّع غلط من المترجم: [[cannot access 'value': it is private in 'Counter']] (الصياغة ممكن تختلف شوية حسب نسخة Kotlin).`,
          solCode: R`class Counter(private val max: Int) {
    var value = 0
        private set

    fun increment() {
        if (value < max) value++
    }

    fun reset() {
        value = 0
    }
}

fun main() {
    val counter = Counter(3)
    repeat(5) { counter.increment() }
    println(counter.value)
}`
        },
        {
          cmd: "الـ Data Classes والـ Lambdas",
          title: "data class: كلاس للبيانات بيطبع ويقارن وينسخ نفسه لوحده (toString و == و copy)",
          desc: R`كتير من الكلاسات بتشيل داتا وبس: مستخدم، منتج، رسالة. لو حطيت كلمة [[data]] قبل [[class]]، Kotlin بتكتبلك لوحدها:
• [[toString()]]: الطباعة بتطلع [[Product(id=1, title=سماعة, price=150.0)]] بدل كلام مش مفهوم.
• [[equals()]] و [[hashCode()]]: [[==]] بتقارن القيم. اتنين منتجات بنفس البيانات يبقوا متساويين.
• [[copy()]]: نسخة جديدة وانت بتغيّر حاجة واحدة بس: [[p1.copy(price = 120.0)]].
• [[componentN()]]: عشان تفك الـ object لقيم: [[val (id, title) = p1]] (destructuring).

الفرق بين [[==]] و [[===]]: [[==]] «نفس القيمة؟» (بتنادي equals)، و [[===]] «نفس الـ object بالظبط في الذاكرة؟».

وبتتكتب الـ properties [[val]] غالبًا. لو عايز تغيّر حاجة، بتعمل [[copy]] بدل ما تعدّل في الأصلي. والأسلوب ده (الـ immutability) هو اللي Compose و StateFlow مبنيين عليه: الشاشة بتعرف إن فيه تغيير لما object جديد يوصل.

وفي آخر المثال هتلاقي [[filter { it.price >= 100.0 }]]: الكود اللي بين [[{ }]] ده lambda، و [[it]] هو كل منتج. شفناه في درس map و filter، وهنشرحه بالتفصيل في درس الـ lambdas.`,
          example: R`data class Product(val id: Int, val title: String, val price: Double)
fun main() {
    val p1 = Product(1, "سماعة", 150.0)
    val p2 = Product(1, "سماعة", 150.0)
    println(p1)
    println(p1 == p2)
    println(p1 === p2)
    val discounted = p1.copy(price = 120.0)
    println(discounted)
    val (id, title) = p1
    println("$id - $title")
    val products = listOf(p1, Product(2, "كابل", 45.0), Product(3, "ساعة", 300.0))
    val premium = products.filter { it.price >= 100.0 }.map { it.title }
    println(premium)
}`,
          try: R`اعمل [[data class User(val name: String, val email: String, val isVerified: Boolean = false)]]. اعمل user، وبعدين نسخة منه verified بـ [[copy]]. اطبع الاتنين، وقارنهم بـ [[==]]. بعدين شيل كلمة [[data]] واطبع تاني وشوف الفرق في الطباعة والمقارنة.`,
          flag: "script",
          deep: {
            why: R`الـ JSON اللي جاي من الـ API، والصف اللي في Room، والـ UI state اللي الـ ViewModel بيبعته للشاشة: كلهم data classes. في Java الكلاس ده كان ٥٠ سطر getters و setters و equals و hashCode، وغالبًا كان فيه غلطة في واحدة منهم. هنا سطر واحد.`,
            how: R`الدوال المتولدة بتستخدم الـ properties اللي في الـ primary constructor بس. لو عرّفت property جوه جسم الكلاس، مش هتدخل في [[==]] ولا [[toString]].

[[copy]] بتعمل shallow copy: لو فيه property نوعها MutableList، النسختين بيشاوروا على نفس الـ list. عشان كده خلي الـ properties [[val]] وأنواعها read-only ([[List]] مش [[MutableList]]).

[[hashCode]] المتسق مع equals هو اللي بيخلي data class تشتغل صح كمفتاح في Map أو عنصر في Set.

والـ data class لازم يكون عندها parameter واحد على الأقل، ومينفعش تبقى open أو abstract. وفيه [[data object]] لحالة مفيهاش بيانات (هتشوفه في sealed).`,
            when: R`أي كلاس شغلته يشيل داتا: models من السيرفر، و entities، و UI state. ومتستخدمهاش لكلاس فيه منطق وحالة داخلية زي BankAccount، لأن [[copy]] ممكن تعمل نسخة تكسر القواعد بتاعته.`,
            mistakes: R`تحط [[var]] في data class وتعدّل في object موجود في List جوه state: Compose مش هيحس بالتغيير لأن الـ object هو هو. اعمل [[copy]]. وتستخدم [[===]] وانت قصدك تقارن القيم.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف [[data class]] لمنتج، ويعمل منتجين بنفس البيانات ويقارنهم، وينسخ واحد بسعر جديد، ويفكّه لمتغيرات، وفي الآخر يفلتر List منتجات. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، ونفس الكلام للتجارب اللي تحت.

~~~text الناتج
Product(id=1, title=سماعة, price=150.0)
true
false
Product(id=1, title=سماعة, price=120.0)
1 - سماعة
[سماعة, ساعة]
~~~

---

## ١. سطر واحد بيعرّف الكلاس كله

~~~kotlin
data class Product(val id: Int, val title: String, val price: Double)
~~~

- [[data]] كلمة قبل [[class]] بتقول للمترجم: «الكلاس ده شغلته يشيل داتا، فاكتبلي الدوال المعتادة».
- الـ ٣ properties في الـ primary constructor، وكلهم [[val]] (مش هيتغيروا بعد الإنشاء).
- مفيش [[{ }]] خالص: الكلاس ملوش جسم، ومش محتاج.

المترجم بيولّد ٥ حاجات من الـ properties اللي **في الـ constructor بس**:

| الدالة | بتعمل إيه |
|---|---|
| [[toString()]] | [[Product(id=1, title=سماعة, price=150.0)]] |
| [[equals()]] | [[==]] بتقارن القيم |
| [[hashCode()]] | رقم بيطلع نفسه للـ objects المتساوية (للـ Set والـ Map) |
| [[copy(...)]] | نسخة جديدة وتغيّر اللي عايزه |
| [[component1()]] و [[component2()]] ... | للـ destructuring |

---

## ٢. منتجين بنفس البيانات

~~~kotlin
    val p1 = Product(1, "سماعة", 150.0)
    val p2 = Product(1, "سماعة", 150.0)
    println(p1)
~~~

القيم بالترتيب: [[1]] لـ id، و [["سماعة"]] لـ title، و [[150.0]] لـ price. و [[println(p1)]] بتنادي الـ [[toString]] المتولدة:

~~~text الناتج
Product(id=1, title=سماعة, price=150.0)
~~~

---

## ٣. [[==]] و [[===]]

~~~kotlin
    println(p1 == p2)
    println(p1 === p2)
~~~

~~~text الناتج
true
false
~~~

- [[==]]: «نفس القيمة؟». Kotlin بتحوّلها لنداء [[p1.equals(p2)]]، والـ equals المتولدة بتقارن الـ ٣ properties واحدة واحدة. كلهم زي بعض، فـ [[true]].
- [[===]] (٣ علامات): «نفس الـ object بالظبط؟». [[Product(...)]] اتنادت مرتين، فدول objectين في مكانين مختلفين في الذاكرة، فـ [[false]].

---

## ٤. [[copy]]

~~~kotlin
    val discounted = p1.copy(price = 120.0)
    println(discounted)
~~~

~~~text الناتج
Product(id=1, title=سماعة, price=120.0)
~~~

- [[copy]] بتعمل object **جديد** بكل قيم p1، إلا اللي انت كتبته.
- [[price = 120.0]] ده named argument: بتقول اسم الـ parameter، فمش لازم تكتب الباقي ولا تهتم بالترتيب.
- [[p1]] نفسه زي ما هو (150.0). ده أسلوب الـ immutability: بدل ما تعدّل، اعمل نسخة.

---

## ٥. الـ destructuring

~~~kotlin
    val (id, title) = p1
    println("$id - $title")
~~~

~~~text الناتج
1 - سماعة
~~~

- الأقواس على الشمال معناها «فك الـ object ده لمتغيرات». Kotlin بتكتبها كده: [[val id = p1.component1()]] و [[val title = p1.component2()]].
- الترتيب هو ترتيب الـ constructor، مش الأسامي. لو كتبت [[val (title, id) = p1]]، المتغير اللي اسمه title هياخد الـ id!
- أخدنا أول اتنين بس، والتالت (price) اتساب. وجرّبت [[val (a, b, c) = p1]] فطلع [[1 سماعة 150.0]].

---

## ٦. List و [[filter]] و [[map]]

~~~kotlin
    val products = listOf(p1, Product(2, "كابل", 45.0), Product(3, "ساعة", 300.0))
    val premium = products.filter { it.price >= 100.0 }.map { it.title }
    println(premium)
~~~

بيتنفذ من الشمال لليمين:

| الخطوة | الكود | النتيجة |
|---|---|---|
| ١ | [[listOf(...)]] | List فيها ٣ منتجات (150 و 45 و 300) |
| ٢ | [[.filter { it.price >= 100.0 }]] | بيسيب اللي سعره 100 أو أكتر: السماعة والساعة |
| ٣ | [[.map { it.title }]] | بيحوّل كل منتج لعنوانه بس |

- [[{ ... }]] ده lambda (درس الـ lambdas)، و [[it]] اسم العنصر اللي بيتفحص دلوقتي.
- [[premium]] نوعها [[List<String>]]، والـ List بتتطبع بين [[[ ]]] والعناصر بينها فاصلة:

~~~text الناتج
[سماعة, ساعة]
~~~

---

## ٧. حاجة مش واضحة: الـ properties اللي جوه الجسم

جرّبت أضيف property جوه جسم الكلاس:

~~~kotlin
data class Product(val id: Int, val title: String, val price: Double) {
    var views = 0
}
~~~

وخليت [[p1.views = 99]] و p2 فضلت 0، وقارنت:

~~~text الناتج
true
true
~~~

السطر الأول [[p1 == p2]] والتاني [[p1.hashCode() == p2.hashCode()]]. يعني [[views]] **مش** داخلة في المقارنة ولا الـ hashCode ولا الطباعة، لأنها مش في الـ constructor. وحطيت الاتنين في [[setOf(p1, p2)]] فالـ Set طلع حجمها [[1]]: الـ Set بتشيل العناصر المتساوية مرة واحدة، وده شغال بفضل [[equals]] و [[hashCode]].

---

## ٨. التجربة: من غير [[data]]

الـ solCode بـ [[data]]:

~~~kotlin
data class User(val name: String, val email: String, val isVerified: Boolean = false)
    val user = User("Sara", "sara@mail.com")
    val verified = user.copy(isVerified = true)
~~~

~~~text الناتج
User(name=Sara, email=sara@mail.com, isVerified=false)
User(name=Sara, email=sara@mail.com, isVerified=true)
false
~~~

[[isVerified]] ليها default [[false]]، فمش لازم تتكتب. و [[==]] طلعت false لأن قيمة واحدة مختلفة.

وشيلت [[data]]:

| اللي جرّبته | النتيجة |
|---|---|
| [[println(a)]] | [[User@1540e19d]] (اسم الكلاس ورقم بيتغير كل تشغيل) |
| [[a == b]] بنفس القيم | [[false]]: الـ equals الافتراضية بتقارن الـ object نفسه زي [[===]] |
| [[a.copy(name = "x")]] | [[error: unresolved reference 'copy' on receiver of type 'User'.]] |

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[data class X(val a: T, ...)]] | toString و equals و hashCode و copy و componentN جاهزين |
| [[a == b]] | نفس القيم (equals) |
| [[a === b]] | نفس الـ object |
| [[x.copy(f = v)]] | نسخة جديدة بقيمة مختلفة، والأصلي زي ما هو |
| [[val (a, b) = x]] | فك بالترتيب، مش بالاسم |

اللي ميتلخبطش: كل اللي [[data]] بتولّده مبني على الـ properties اللي في الـ constructor بس، واللي في الجسم مش داخل.`,
          lines: [
            R`[[data class]] بـ 3 properties.`,
            R`بداية [[main]].`,
            "منتج.",
            "منتج تاني بنفس القيم بالظبط.",
            R`[[toString]] الجاهزة: Product(id=1, title=سماعة, price=150.0).`,
            R`[[==]] بتقارن القيم: true.`,
            R`[[===]] بتقارن الـ object نفسه: false، دول اتنين.`,
            R`[[copy]] بسعر جديد، والأصلي زي ما هو.`,
            "طباعة النسخة.",
            R`destructuring: أول property وتاني property.`,
            "1 - سماعة.",
            "List فيها 3 منتجات.",
            R`[[filter]] للي سعره 100 أو أكتر، و [[map]] للعناوين بس.`,
            "[سماعة, ساعة].",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[Product(id=1, title=سماعة, price=150.0)]]
[[true]]
[[false]]
[[Product(id=1, title=سماعة, price=120.0)]]
[[1 - سماعة]]
[[[سماعة, ساعة]]]

وفي التجربة: النسختين بيتطبعوا بكل البيانات، و [[==]] بـ false لأن isVerified مختلفة. ولما تشيل [[data]]: الطباعة بتبقى حاجة زي [[User@5e2de80c]]، و [[copy]] مبقتش موجودة أصلًا فالكود مش هيترجم لحد ما تشيلها، و [[==]] بين اتنين بنفس القيم بقت false.`,
          solCode: R`data class User(val name: String, val email: String, val isVerified: Boolean = false)

fun main() {
    val user = User("Sara", "sara@mail.com")
    val verified = user.copy(isVerified = true)
    println(user)
    println(verified)
    println(user == verified)
}`
        },
        {
          cmd: "object و companion",
          title: "object و companion object: نسخة واحدة بس، ودوال على الكلاس نفسه",
          desc: R`أحيانًا عايز حاجة منها نسخة واحدة بس في البرنامج كله: إعدادات، أو cache. بدل class وتعمل منه object، اكتب [[object]] على طول:
[[object AppConfig { ... }]]
وبتوصل لها باسمها: [[AppConfig.BASE_URL]]. ده اسمه singleton، و Kotlin بتضمن إنه بيتعمل مرة واحدة وبأمان حتى مع أكتر من thread.

[[const val]] جوه object: ثابت قيمته معروفة وقت الترجمة (رقم أو نص). الاسم بحروف كبيرة بالعرف.

و [[companion object { }]] جوه class: حاجات تخص الكلاس نفسه مش كل object منه. تناديها باسم الكلاس: [[User.create("Sara")]]. ده بديل [[static]] في Java (مفيش static في Kotlin).

أشهر استخدام: factory function. تخلي الـ constructor [[private constructor]] فمحدش يعمل object مباشرة، وتعمل دالة في الـ companion بتنضّف المدخلات أو تتأكد منها الأول.

وفي Android هتشوفه كتير: [[companion object { const val TAG = "MainActivity" }]] للـ log، أو [[private const val]] برا الكلاس خالص (top-level) ودي أبسط.`,
          example: R`object AppConfig {
    const val BASE_URL = "https://api.example.com/"
    var darkMode = false
}
class User private constructor(val name: String) {
    companion object {
        private var created = 0
        fun create(name: String): User {
            created++
            return User(name.trim())
        }
        fun count() = created
    }
}
fun main() {
    println(AppConfig.BASE_URL)
    AppConfig.darkMode = true
    println(AppConfig.darkMode)
    val u = User.create("  Sara ")
    User.create("Omar")
    println("[$__{u.name}]")
    println(User.count())
}`,
          try: R`اعمل [[object Cart]] فيه [[private val items = mutableListOf<String>()]] ودوال [[add(item)]] و [[count()]]. ضيف 3 حاجات من main واطبع العدد. بعدين اعمل [[class Temperature private constructor(val celsius: Double)]] فيها companion بـ [[fromFahrenheit(f: Double)]].`,
          flag: "script",
          deep: {
            why: R`في Android محتاج حاجات «واحدة بس»: الـ Retrofit client، والـ Room database، والـ Json config. لو عملت منهم كذا نسخة هتضيع ذاكرة، وفي Room ممكن الداتا تتلخبط. الـ object أبسط طريقة لده، و Hilt (المستوى ٣) هو الطريقة الأنظف في المشاريع الكبيرة.`,
            how: R`[[object]] بيتحول لكلاس فيه field static اسمه [[INSTANCE]] بيتعمل أول مرة الكلاس يتحمّل. عشان كده Java بتناديه [[AppConfig.INSTANCE.getDarkMode()]]، إلا لو حطيت [[@JvmStatic]] أو [[@JvmField]] أو كانت [[const]].

الـ companion object هو object جوه الكلاس اسمه الافتراضي [[Companion]]. وممكن يعمل implement لـ interface، وده اللي بيخلي حاجات زي [[Json.Default]] شغالة.

وفيه object expression: [[val listener = object : OnClickListener { override fun onClick(...) { } }]]: object من غير اسم بيعمل implement لـ interface في مكانه. هتشوفه في كود Java/XML القديم.`,
            when: R`[[object]] لحاجة واحدة مفيهاش state بيتغير كتير، أو state فعلًا عام للتطبيق كله. [[companion]] للثوابت والـ factories المرتبطة بكلاس معين.`,
            mistakes: R`تحط state كتير بيتغير في object عام: أي حتة في التطبيق تقدر تغيّره، فالبق يبقى صعب تلاقيه، والاختبارات تأثر في بعض. وتحط [[Context]] أو Activity في object: الـ object عايش طول عمر التطبيق، فالـ Activity مش هتتمسح من الذاكرة (memory leak).`
          },
          teach: R`## البرنامج بيعمل إيه؟

فيه حاجتين: [[object AppConfig]] إعدادات منها نسخة واحدة في البرنامج كله، وكلاس [[User]] مينفعش تعمل منه object غير عن طريق دالة في الـ [[companion object]] بتنضّف الاسم وبتعدّ. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

~~~text الناتج
https://api.example.com/
true
[Sara]
2
~~~

---

## ١. [[object]]: singleton

~~~kotlin
object AppConfig {
    const val BASE_URL = "https://api.example.com/"
    var darkMode = false
}
~~~

- [[object]] بدل [[class]]: انت بتعرّف الكلاس **وبتعمل منه النسخة الوحيدة** في نفس الوقت. مفيش constructor ومينفعش تكتب [[AppConfig()]].
- اسمها singleton (single = واحد): نفس الـ object من أي حتة في البرنامج.
- [[const val]]: ثابت قيمته معروفة وقت الترجمة. مسموح بس للأرقام والـ Boolean والـ String، وبس جوه object أو companion أو على مستوى الملف. والاسم بحروف كبيرة و [[_]] بالعرف (SCREAMING_SNAKE_CASE).
- [[var darkMode]]: state عادي ممكن يتغير، ومشترك للبرنامج كله.

### إمتى بيتعمل؟

جرّبت object فيه [[init { println("init اتنفذ") }]] وطبعت «قبل» في main قبل أول استخدام:

~~~text الناتج
قبل
init اتنفذ
2
~~~

يعني الـ object بيتعمل **أول مرة حد يستخدمه**، مش لما البرنامج يبدأ، ومرة واحدة بس (العداد وصل 2 من غير ما init يتكرر).

### شكله بعد الترجمة

فكيت الـ jar بـ [[javap -p]] (أداة في الـ JDK بتعرض الكلاس المترجم):

~~~text javap -p AppConfig
public final class AppConfig {
  public static final AppConfig INSTANCE;
  public static final java.lang.String BASE_URL;
  private static boolean darkMode;
  private AppConfig();
  public final boolean getDarkMode();
  public final void setDarkMode(boolean);
  static {};
}
~~~

- [[INSTANCE]]: الـ field اللي شايل النسخة الوحيدة. و [[private AppConfig()]]: الـ constructor مقفول.
- [[static {}]]: كود بيتنفذ مرة لما الـ JVM تحمّل الكلاس، والـ JVM بتضمن ده حتى مع أكتر من thread. ده سبب إن الـ object آمن.
- [[BASE_URL]] بقى [[public static final]] على طول لأنه [[const]]، أما [[darkMode]] ليه getter و setter. عشان كده لو Java بتناديه بتكتب [[AppConfig.INSTANCE.getDarkMode()]].

---

## ٢. [[private constructor]]

~~~kotlin
class User private constructor(val name: String) {
~~~

قبل الأقواس كلمتين: [[private]] و [[constructor]]. الطبيعي إن [[constructor]] مش بتتكتب، بس لما تحب تحط قبله visibility لازم تكتبها. النتيجة: محدش برا الكلاس يقدر يكتب [[User("Sara")]]. جرّبت:

~~~text رسالة المترجم
error: cannot access 'constructor(name: String): User': it is private in 'User'.
~~~

---

## ٣. [[companion object]]

~~~kotlin
    companion object {
        private var created = 0
        fun create(name: String): User {
            created++
            return User(name.trim())
        }
        fun count() = created
    }
~~~

- [[companion object]]: object واحد مربوط بالكلاس نفسه، مش بكل object منه. بتوصل للي جواه باسم الكلاس: [[User.create(...)]] و [[User.count()]]. ده اللي Java بتسميه [[static]]، و Kotlin مفيهاش الكلمة دي.
- [[private var created]]: عداد واحد بس للكلاس كله، و [[private]] فمحدش من برا يغيّره.
- [[create]] جوه الكلاس، فمسموح لها تنادي الـ constructor الـ private. دي اسمها **factory function**: دالة بتعمل objects بدل الـ constructor، وتقدر تنضّف أو تتحقق الأول.
- [[name.trim()]]: بتشيل المسافات من أول النص وآخره.
- [[fun count() = created]]: expression body، بترجّع العداد.

### شكله بعد الترجمة

~~~text javap -p User و User$Companion (مختصر)
public final class User {
  public static final User$Companion Companion;
  private final java.lang.String name;
  private static int created;
  private User(java.lang.String);
  public final java.lang.String getName();
}
public final class User$Companion {
  public final User create(java.lang.String);
  public final int count();
}
~~~

الـ companion كلاس منفصل اسمه [[User$Companion]]، ونسخته محطوطة في field static اسمه [[Companion]]. يعني [[User.create("x")]] من Kotlin هي [[User.Companion.create("x")]] من Java.

---

## ٤. main سطر سطر

~~~kotlin
    println(AppConfig.BASE_URL)
    AppConfig.darkMode = true
    println(AppConfig.darkMode)
    val u = User.create("  Sara ")
    User.create("Omar")
    println("[$__{u.name}]")
    println(User.count())
~~~

| السطر | اللي حصل | المطبوع |
|---|---|---|
| [[AppConfig.BASE_URL]] | باسم الـ object على طول | [[https://api.example.com/]] |
| [[AppConfig.darkMode = true]] | غيّرنا الـ state المشترك | |
| [[println(AppConfig.darkMode)]] | | [[true]] |
| [[User.create("  Sara ")]] | العداد بقى 1، والاسم اتنضّف | |
| [[User.create("Omar")]] | العداد بقى 2، والنتيجة اترمت | |
| [[println("[$__{u.name}]")]] | | [[[Sara]]] |
| [[User.count()]] | | [[2]] |

- [[$__{u.name}]] ده string template بأقواس: لما تكتب حاجة أكتر من اسم متغير (هنا [[u.name]] فيها نقطة) لازم [[{ }]]. والأقواس المربعة [[[ ]]] حوالين الاسم في النص نفسه، عشان تشوف إن المسافات اتشالت فعلًا.
- [[User.create("Omar")]] مش متخزن في متغير، ومع ذلك العداد زاد. الدالة اتنفذت وقيمتها اترمت، وده مسموح.

---

## ٥. object عادي ولا [[data object]]؟

جرّبت أطبع [[object Plain]] و [[data object Nice]]:

~~~text الناتج
Plain@75b84c92
Nice
~~~

الـ object العادي بيطبع اسمه ورقم hash بيتغير كل تشغيل، والـ [[data object]] بيطبع اسمه بس. هتحتاجه في درس enum و sealed.

---

## ٦. حل التجربة (solCode)

~~~kotlin
object Cart {
    private val items = mutableListOf<String>()
    fun add(item: String) { items.add(item) }
    fun count() = items.size
}
~~~

- [[mutableListOf<String>()]]: List فاضية تقدر تضيف فيها، و [[<String>]] نوع العناصر (لازم تكتبه لأن الـ List فاضية ومفيش حاجة يستنتج منها).
- [[private]]: محدش يلعب في الـ list من برا، لازم يعدّي على [[add]].
- [[items.size]]: عدد العناصر.

~~~kotlin
class Temperature private constructor(val celsius: Double) {
    companion object {
        fun fromFahrenheit(f: Double) = Temperature((f - 32) * 5 / 9)
    }
}
~~~

نفس فكرة User: الطريقة الوحيدة تعمل Temperature هي إنك تدي فهرنهايت والدالة تحوّل. 212 فهرنهايت: [[(212 - 32) * 5 / 9 = 180 * 5 / 9 = 100]].

~~~text الناتج
3
100.0
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[object X { }]] | singleton: نسخة واحدة، بتتعمل أول استخدام |
| [[X.prop]] | الوصول باسم الـ object |
| [[const val NAME = ...]] | ثابت وقت الترجمة (أرقام و String بس) |
| [[class X private constructor(...)]] | محدش يعمل object من برا |
| [[companion object { }]] | حاجات على الكلاس نفسه: [[X.f()]] |
| [[data object]] | object بيطبع اسمه |

اللي ميتلخبطش: Kotlin مفيهاش [[static]]. اللي على الكلاس نفسه مكانه [[companion object]]، واللي للتطبيق كله [[object]] أو top-level.`,
          lines: [
            R`[[object]]: singleton، نسخة واحدة بس.`,
            R`[[const val]]: ثابت وقت الترجمة.`,
            R`[[var]] عادي: state مشترك.`,
            "قفلة.",
            R`كلاس الـ constructor بتاعه [[private]]: محدش يعمل [[User(...)]] من برا.`,
            R`[[companion object]]: حاجات على الكلاس نفسه.`,
            R`عداد [[private]] جوه الـ companion.`,
            "factory function.",
            "زوّد العداد.",
            R`جوه الكلاس ينفع نستخدم الـ constructor الـ private، وبننضّف المسافات بـ [[trim()]].`,
            "قفلة.",
            "عدد اللي اتعملوا.",
            "قفلة الـ companion.",
            "قفلة الكلاس.",
            R`بداية [[main]].`,
            "باسم الـ object على طول.",
            "تغيير القيمة.",
            "true.",
            "من خلال الـ factory.",
            "واحد تاني.",
            "[Sara]: المسافات اتشالت.",
            "2.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[https://api.example.com/]]
[[true]]
[[[Sara]]]
[[2]]

وحل التجربة تحت: العدد 3، و [[Temperature.fromFahrenheit(212.0).celsius]] بـ 100.0.`,
          solCode: R`object Cart {
    private val items = mutableListOf<String>()
    fun add(item: String) { items.add(item) }
    fun count() = items.size
}

class Temperature private constructor(val celsius: Double) {
    companion object {
        fun fromFahrenheit(f: Double) = Temperature((f - 32) * 5 / 9)
    }
}

fun main() {
    Cart.add("قلم")
    Cart.add("كشكول")
    Cart.add("مسطرة")
    println(Cart.count())
    println(Temperature.fromFahrenheit(212.0).celsius)
}`
        },
        {
          cmd: "enum و sealed",
          title: "enum class و sealed interface: حالات محدودة والمترجم بيتأكد إنك غطيتها كلها",
          desc: R`لما القيمة ليها عدد محدود من الاحتمالات، متستخدمش String (ممكن تكتب "paied" غلط ومحدش ياخد باله):

[[enum class Status { PENDING, PAID, SHIPPED }]]: كل قيمة object ثابت. وممكن يكون ليها properties: [[enum class Status(val label: String)]]. [[Status.entries]] بترجّع كل القيم، و [[name]] اسمها كنص.

[[sealed]] أقوى: كل حالة ممكن تكون كلاس ليه بيانات مختلفة. المثال الأشهر في Android حالة الشاشة:
• [[Loading]]: مفيش بيانات، فبيبقى [[data object]].
• [[Success(val data: ...)]]: معاه الداتا.
• [[Error(val message: String)]]: معاه رسالة الغلط.

[[sealed interface LoadState]] ومعاها الحالات تحتها بـ [[: LoadState]] (النقطتين هنا معناها «بينفذ/بيورث من»). كلمة sealed معناها إن الحالات دي بس، ومحدش يقدر يضيف حالة من مكان تاني (لازم يبقوا في نفس الـ package والـ module).

وده بيدّي ميزة كبيرة مع [[when]]: لما تغطي كل الحالات، مش محتاج [[else]]. ولو ضفت حالة جديدة بعدين، المترجم هيطلّع غلط في كل when ناقصها، فمش هتنسى تعرضها.

وجوه الفرع [[is LoadState.Success ->]] المترجم بيعمل smart cast، فتقدر تكتب [[r.data]] على طول.`,
          example: R`enum class Status(val label: String) {
    PENDING("مستني"), PAID("اتدفع"), SHIPPED("اتشحن")
}
sealed interface LoadState {
    data object Loading : LoadState
    data class Success(val data: String) : LoadState
    data class Error(val message: String) : LoadState
}
fun render(r: LoadState): String = when (r) {
    LoadState.Loading -> "بيحمّل..."
    is LoadState.Success -> "تمام: $__{r.data}"
    is LoadState.Error -> "غلط: $__{r.message}"
}
fun main() {
    val s = Status.PAID
    println(s.label)
    println(Status.entries.map { it.name })
    println(render(LoadState.Loading))
    println(render(LoadState.Success("3 منتجات")))
    println(render(LoadState.Error("مفيش نت")))
}`,
          try: R`ضيف حالة [[data object Empty : LoadState]] وشغّل: المترجم هيقولك إن when ناقصها. ضيف الفرع وخليه يرجّع «مفيش داتا». وبعدين ضيف لـ Status قيمة [[CANCELLED("اتلغى")]] واطبع كل الـ labels.`,
          flag: "script",
          deep: {
            why: R`أي شاشة بتجيب داتا ليها على الأقل ٣ حالات (بيحمّل، خلص، غلط)، وأغلب البق في الواجهات سببه حالة محدش فكر فيها: الـ spinner فضل لافف لأن حد نسي حالة الـ error. الـ sealed مع when بتخلي المترجم هو اللي يفكرك.`,
            how: R`[[enum]] كل قيمة فيه object واحد بيتعمل لما الكلاس يتحمّل، وليها [[ordinal]] (ترتيبها) و [[name]]. و [[Status.valueOf("PAID")]] بتحوّل من نص (وترمي exception لو مش موجود). و [[entries]] (من Kotlin 1.9) هي البديل الأحسن لـ [[values()]] القديمة.

الـ [[sealed]] المترجم بيعرف كل الكلاسات اللي تحتها وقت الترجمة، وده اللي بيخليه يتأكد إن when «exhaustive» (مغطية كل حاجة).

[[data object]] (من Kotlin 1.9) زي object بس الطباعة بتطلع اسمه ([[Loading]]) بدل [[LoadState$Loading@1b6d3586]].

[[sealed interface]] ولا [[sealed class]]؟ الـ interface أخف ومبيفرضش constructor، والكلاس ينفذ أكتر من interface. الـ sealed class لما الحالات محتاجة state أو constructor مشترك.`,
            when: R`[[enum]] لقيم ثابتة من غير بيانات مختلفة (حالة طلب، نوع حساب، اتجاه). [[sealed]] لما كل حالة ليها بيانات مختلفة: UI state، نتيجة عملية، أحداث (events) من الشاشة للـ ViewModel.`,
            mistakes: R`تحط [[else]] في when على sealed «احتياطي»: كده لما تضيف حالة جديدة المترجم مش هيقولك حاجة، وراحت الميزة. وتخزّن [[ordinal]] في الداتابيز: لو رتبت القيم بعدين الداتا القديمة هتتقري غلط، خزّن [[name]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

فيه نوعين «حالات محدودة»: [[enum class Status]] لحالة طلب (٣ قيم ثابتة، لكل واحدة label عربي)، و [[sealed interface LoadState]] لحالة شاشة بتحمّل داتا (٣ حالات، كل واحدة شايلة بيانات مختلفة). ودالة [[render]] بتحوّل أي حالة لنص بـ [[when]]. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

~~~text الناتج
اتدفع
[PENDING, PAID, SHIPPED]
بيحمّل...
تمام: 3 منتجات
غلط: مفيش نت
~~~

---

## ١. [[enum class]] بـ property

~~~kotlin
enum class Status(val label: String) {
    PENDING("مستني"), PAID("اتدفع"), SHIPPED("اتشحن")
}
~~~

- [[enum]] اختصار enumeration (تعداد): نوع قيمه محددة ومكتوبة كلها هنا، ومفيش غيرها.
- [[(val label: String)]]: constructor زي أي كلاس، فكل قيمة لازم تديله label.
- [[PENDING("مستني")]]: قيمة اسمها PENDING، و label بتاعها «مستني». القيم بينها فاصلة، والأسامي بحروف كبيرة بالعرف.
- كل قيمة object واحد ثابت، بيتعمل مرة لما الكلاس يتحمّل. فـ [[Status.PAID]] في أي حتة هو نفس الـ object.

### كل قيمة معاها إيه؟

جرّبت أطبع حاجات زيادة على [[Status.PAID]]:

| الكود | الناتج | ليه |
|---|---|---|
| [[println(Status.PAID)]] | [[PAID]] | الـ toString بتاعة enum بتطبع الاسم |
| [[Status.PAID.ordinal]] | [[1]] | ترتيبها، بيبدأ من 0 |
| [[Status.valueOf("SHIPPED").label]] | [[اتشحن]] | من نص للقيمة |
| [[Status.valueOf("paid")]] | exception | الاسم لازم يطابق بالحروف الكبيرة |

~~~text الناتج لـ Status.valueOf("paid")
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant Status.paid
~~~

---

## ٢. [[sealed interface]] وحالاته

~~~kotlin
sealed interface LoadState {
    data object Loading : LoadState
    data class Success(val data: String) : LoadState
    data class Error(val message: String) : LoadState
}
~~~

- [[interface]]: نوع من غير بيانات خاصة بيه، الكلاسات «بتنفذه». هنا شغلته إنه يجمع الحالات تحت اسم واحد.
- [[sealed]] (مقفول): الحالات اللي تحته معروفة كلها وقت الترجمة، ومحدش يقدر يضيف حالة من package أو module تاني.
- [[: LoadState]] بعد اسم الحالة: «الحالة دي نوع من LoadState».
- الحالات متعرّفة **جوه** الـ interface، فاسمها الكامل [[LoadState.Loading]] و [[LoadState.Success]]. ده مش إجباري، بس بيجمعهم.

| الحالة | نوعها | ليه |
|---|---|---|
| [[Loading]] | [[data object]] | مفيش بيانات، فنسخة واحدة كفاية |
| [[Success(val data: String)]] | [[data class]] | كل نجاح ليه داتا مختلفة |
| [[Error(val message: String)]] | [[data class]] | كل غلط ليه رسالة |

والفرق بين [[object]] و [[data object]] في الطباعة (جرّبته):

~~~text الناتج
LoadState$Loading@5acf9800
Loading
~~~

السطر الأول لو [[Loading]] كان [[object]] عادي (الـ [[$]] معناها «كلاس جوه كلاس» في الـ JVM)، والتاني بـ [[data object]]. و [[Success("x")]] بيطبع [[Success(data=x)]] زي أي data class.

---

## ٣. [[when]] من غير [[else]]

~~~kotlin
fun render(r: LoadState): String = when (r) {
    LoadState.Loading -> "بيحمّل..."
    is LoadState.Success -> "تمام: $__{r.data}"
    is LoadState.Error -> "غلط: $__{r.message}"
}
~~~

- [[= when (r) { ... }]]: الدالة كلها تعبير واحد، و [[when]] بترجّع قيمة الفرع اللي اتطابق.
- [[LoadState.Loading ->]]: مقارنة بالقيمة نفسها ([[==]])، لأن Loading object واحد.
- [[is LoadState.Success ->]]: [[is]] بتسأل «هل r من النوع ده؟». الـ Success مش قيمة واحدة (ممكن يبقى ليه أي data)، فبنسأل عن النوع مش القيمة.
- **smart cast**: جوه الفرع ده المترجم عارف إن [[r]] نوعه Success، فبيخليك تكتب [[r.data]] من غير تحويل. برا الفرع [[r]] نوعه [[LoadState]] ومفيهوش data.
- [[$__{r.data}]]: string template بأقواس عشان فيه نقطة.
- مفيش [[else]]: المترجم عارف إن الحالات ٣ بس، والـ ٣ متغطيين، فالـ when **exhaustive** (مغطية كل الاحتمالات).

### لو ضفت حالة ونسيت فرعها (الـ try)

ضفت [[data object Empty : LoadState]] من غير ما ألمس render:

~~~text رسالة المترجم
error: 'when' expression must be exhaustive. Add the 'Empty' branch or an 'else' branch.
fun render(r: LoadState): String = when (r) {
                                   ^^^^
~~~

ده بالظبط الهدف: المترجم بيوريك كل مكان محتاج يتعدّل. ولو كنت حاطط [[else]]، كان هيعدّي ساكت.

---

## ٤. main

~~~kotlin
    val s = Status.PAID
    println(s.label)
    println(Status.entries.map { it.name })
    println(render(LoadState.Loading))
    println(render(LoadState.Success("3 منتجات")))
    println(render(LoadState.Error("مفيش نت")))
~~~

| السطر | المطبوع | الشرح |
|---|---|---|
| [[s.label]] | [[اتدفع]] | الـ property بتاعة PAID |
| [[Status.entries.map { it.name }]] | [[[PENDING, PAID, SHIPPED]]] | [[entries]] List بكل القيم بالترتيب، و [[name]] اسم كل واحدة كنص |
| [[render(LoadState.Loading)]] | [[بيحمّل...]] | الفرع الأول |
| [[render(LoadState.Success("3 منتجات"))]] | [[تمام: 3 منتجات]] | الفرع التاني والـ smart cast |
| [[render(LoadState.Error("مفيش نت"))]] | [[غلط: مفيش نت]] | الفرع التالت |

---

## ٥. حل التجربة (solCode)

ضفنا [[CANCELLED("اتلغى")]] في آخر القيم، و [[data object Empty : LoadState]]، وفرع [[LoadState.Empty -> "مفيش داتا"]] في render. و main:

~~~kotlin
    println(Status.entries.map { it.label })
    println(render(LoadState.Empty))
~~~

~~~text الناتج
[مستني, اتدفع, اتشحن, اتلغى]
مفيش داتا
~~~

[[entries]] شافت القيمة الجديدة لوحدها، من غير ما تعدّل أي List.

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[enum class X(val p: T) { A(..), B(..) }]] | قيم ثابتة محددة، ولكل واحدة properties |
| [[X.entries]] و [[name]] و [[ordinal]] | كل القيم، والاسم، والترتيب من 0 |
| [[X.valueOf("A")]] | من نص، وترمي exception لو مش موجود |
| [[sealed interface S]] + [[: S]] | حالات محدودة، ولكل حالة بيانات مختلفة |
| [[is S.Success ->]] | فرع على النوع، وجواه smart cast |
| [[when]] من غير [[else]] | المترجم بيتأكد إنك غطيت كل الحالات |

اللي ميتلخبطش: [[enum]] لما القيم ثابتة وشكلها واحد، و [[sealed]] لما كل حالة شايلة داتا مختلفة. ومتحطش [[else]] على sealed عشان متضيعش تنبيه المترجم.`,
          lines: [
            R`[[enum class]] بـ property لكل قيمة.`,
            "القيم التلاتة، وكل واحدة بالـ label بتاعها.",
            "قفلة.",
            R`[[sealed interface]]: الحالات اللي تحت دي بس.`,
            R`[[data object]]: حالة من غير بيانات.`,
            "حالة معاها داتا.",
            "حالة معاها رسالة غلط.",
            "قفلة.",
            R`دالة بترجّع [[when]] على طول.`,
            R`[[Loading]] object واحد فبنقارن بيه مباشرة.`,
            R`[[is]]: لو Success، و [[r.data]] متاحة بالـ smart cast.`,
            R`آخر حالة، ومفيش [[else]] لأننا غطينا الكل.`,
            "قفلة when.",
            R`بداية [[main]].`,
            "قيمة من الـ enum.",
            "اتدفع.",
            R`[[entries]]: كل القيم، و [[name]] اسم كل واحدة.`,
            "بيحمّل...",
            "تمام: 3 منتجات.",
            "غلط: مفيش نت.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[اتدفع]]
[[[PENDING, PAID, SHIPPED]]]
[[بيحمّل...]]
[[تمام: 3 منتجات]]
[[غلط: مفيش نت]]

ولما تضيف [[Empty]] من غير فرع، المترجم بيقول حاجة زي: [['when' expression must be exhaustive. Add the 'Empty' branch or an 'else' branch.]] ضيف [[LoadState.Empty -> "مفيش داتا"]] ويترجم.`,
          solCode: R`enum class Status(val label: String) {
    PENDING("مستني"), PAID("اتدفع"), SHIPPED("اتشحن"), CANCELLED("اتلغى")
}

sealed interface LoadState {
    data object Loading : LoadState
    data object Empty : LoadState
    data class Success(val data: String) : LoadState
    data class Error(val message: String) : LoadState
}

fun render(r: LoadState): String = when (r) {
    LoadState.Loading -> "بيحمّل..."
    LoadState.Empty -> "مفيش داتا"
    is LoadState.Success -> "تمام: $__{r.data}"
    is LoadState.Error -> "غلط: $__{r.message}"
}

fun main() {
    println(Status.entries.map { it.label })
    println(render(LoadState.Empty))
}`
        },
        {
          cmd: "interface و الوراثة",
          title: "interface و open و abstract و override: إزاي كلاس يورث من كلاس تاني؟",
          desc: R`الـ [[interface]] عقد: «أي حد بينفذني لازم يكون عنده كذا». ممكن يبقى فيه دوال من غير جسم (لازم اللي بينفذه يكتبها)، أو بجسم افتراضي. والكلاس بينفذه بـ [[: Payable]] بعد اسمه.

الوراثة (inheritance): كلاس ياخد كل حاجة من كلاس تاني ويزوّد أو يغيّر. في Kotlin:
• الكلاسات [[final]] افتراضيًا. عشان حد يورث منها لازم تكتب [[open class]]. وده عكس Java، ومقصود: الوراثة لازم تبقى قرار.
• [[abstract class]]: مينفعش تعمل منه object، لازم تورث منه. وممكن يبقى فيه حاجات abstract لازم الولاد يكتبوها.
• [[override]] قدام أي دالة أو property بتغيّرها من الأب أو من interface. إجباري، مش اختياري زي @Override في Java.
• الوراثة بتتكتب [[class FullTime(...) : Employee(name)]]: الأقواس بعد اسم الأب معناها إنك بتنادي الـ constructor بتاعه.

كلاس يورث من كلاس واحد بس، بس ينفذ أي عدد interfaces.

والفايدة الأكبر (اسمها polymorphism): List من [[Employee]] فيها أنواع مختلفة، وكل واحد بيرد على [[describe()]] بطريقته.`,
          example: R`interface Payable {
    val amount: Double
    fun describe(): String = "مبلغ $amount"
}
abstract class Employee(val name: String) : Payable
class FullTime(name: String, private val salary: Double) : Employee(name) {
    override val amount get() = salary
}
open class Freelancer(name: String, val hours: Int, val rate: Double) : Employee(name) {
    override val amount get() = hours * rate
    override fun describe() = "$name: $hours ساعة = $amount"
}
fun main() {
    val team: List<Employee> = listOf(FullTime("Sara", 15000.0), Freelancer("Omar", 40, 250.0))
    for (e in team) println(e.describe())
    println(team.sumOf { it.amount })
}`,
          try: R`اعمل [[interface Shape { fun area(): Double }]] وكلاسين [[Circle(r)]] و [[Rect(w, h)]] بينفذوه. حطهم في List واطبع مجموع المساحات. وبعدين جرّب تعمل [[class Square : Rect(...)]] من غير ما تكتب [[open]] قدام Rect وشوف المترجم هيقول إيه.`,
          flag: "script",
          deep: {
            why: R`Android كله مبني على كده: الـ Activity بتاعتك بتورث من [[ComponentActivity]] وبتعمل override لـ [[onCreate]]، والـ ViewModel بيورث من [[ViewModel]]، و Retrofit بيعملك الـ API من interface، و Room بيعمل الـ DAO من interface. والـ interface هي اللي بتخليك تبدّل التنفيذ الحقيقي بتنفيذ وهمي (fake) في الاختبارات.`,
            how: R`الـ interface في Kotlin ممكن يبقى فيه properties (من غير قيمة مخزنة) ودوال بجسم. والكلاس اللي بينفذه بيكتب اللي ناقص بس.

[[override val amount get() = salary]]: property بتتحسب من getter، والنوع اتستنتج من الـ getter. ولو كلاس بينفذ interfaceين فيهم نفس الدالة بجسم، لازم تعمل override وتختار: [[super<A>.f()]].

[[super.describe()]] بتنادي نسخة الأب جوه الـ override.

وأي دالة [[override]] بتفضل [[open]] للي بعدك. لو عايز تقفلها: [[final override fun]].

وفيه أسلوب بديل للوراثة اسمه composition: الكلاس يبقى «عنده» حاجة بدل ما «يكون» حاجة. Kotlin بتسهّله بـ [[by]]: [[class Logger(private val inner: Printer) : Printer by inner]] بيعدّي كل الدوال لـ inner لوحده.`,
            when: R`[[interface]] لما أكتر من كلاس مختلفين لازم يقدموا نفس القدرة (أو عشان الاختبارات). [[abstract class]] لما فيه كود و state مشترك فعلًا. والوراثة العميقة (أب وجد وجد الجد) ابعد عنها: صعبة تتفهم وتتغير.`,
            mistakes: R`تنسى [[open]] وتستغرب [[this type is final, so it cannot be extended]]. وتنسى [[override]] فيقول [['describe' hides member of supertype 'Payable' and needs an 'override' modifier]]. وتحط الأقواس على interface: [[: Payable()]] غلط، الـ interface ملوش constructor.`
          },
          teach: R`## البرنامج بيعمل إيه؟

فيه interface اسمه [[Payable]] (أي حاجة ليها مبلغ)، وكلاس أب [[abstract]] اسمه [[Employee]]، وولدين: موظف ثابت مرتبه ثابت، وفري لانسر بيتحسب بالساعة. بنحطهم في List واحدة، وكل واحد بيوصف نفسه بطريقته، وبنجمع المبالغ. اتشغّل بـ [[kotlinc]] و [[java -jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، وكل رسالة خطأ تحت اتجرّبت فعلًا.

~~~text الناتج
مبلغ 15000.0
Omar: 40 ساعة = 10000.0
25000.0
~~~

---

## ١. الـ interface: عقد

~~~kotlin
interface Payable {
    val amount: Double
    fun describe(): String = "مبلغ $amount"
}
~~~

- [[interface]]: قايمة «لازم يكون عندك كذا». مينفعش تعمل منه object، الكلاسات بتنفذه.
- [[val amount: Double]]: property من غير قيمة. أي كلاس بينفذ Payable **لازم** يحددها.
- [[fun describe(): String = ...]]: دالة **ليها جسم** (تنفيذ افتراضي). اللي بينفذ Payable ياخدها جاهزة، أو يكتب نسخته.

لو كلاس نفّذ Payable ونسي amount:

~~~text رسالة المترجم لـ class Forgot : Payable
error: class 'Forgot' is not abstract and does not implement abstract member:
val amount: Double
~~~

---

## ٢. [[abstract class]]

~~~kotlin
abstract class Employee(val name: String) : Payable
~~~

- [[abstract]]: كلاس ناقص عن قصد. مينفعش تعمل منه object، لازم حد يورث منه ويكمّله.
- [[(val name: String)]]: كل موظف ليه اسم، والأب هو اللي شايله.
- [[: Payable]]: بينفذ الـ interface. ومن غير أقواس، لأن الـ interface ملوش constructor تناديه.
- مكتبش [[amount]]: مسموح لأنه abstract، فالمسؤولية بتنزل للولاد.
- مفيش [[{ }]]: الكلاس ملوش جسم.

جرّبت حاجتين غلط:

| الكود | رسالة المترجم |
|---|---|
| [[Employee("x")]] | [[error: cannot create an instance of an abstract class.]] |
| [[class Bad : Payable()]] | [[error: this type does not have a constructor.]] |

---

## ٣. ولد بيورث: [[FullTime]]

~~~kotlin
class FullTime(name: String, private val salary: Double) : Employee(name) {
    override val amount get() = salary
}
~~~

- [[name: String]] من غير val: parameter بس، لأن الأب هو اللي هيشيله كـ property. لو كتبت [[val name]] هنا كمان، المترجم بيرفض: [[error: 'name' hides member of supertype 'Employee' and needs an 'override' modifier.]]
- [[private val salary]]: property خاصة بالموظف الثابت ومحدش يشوفها من برا.
- [[: Employee(name)]]: «بورث من Employee»، والأقواس معناها «ونادي الـ constructor بتاعه بالـ name ده». الأب لازم يتعمل الأول.
- [[override val amount get() = salary]]: بنكمّل الـ property الناقصة. [[override]] إجباري لأنها جاية من فوق. و [[get() = salary]] معناها إن مفيش قيمة متخزنة، كل ما حد يقرا amount بيتحسب (هنا بيرجّع salary). والنوع [[Double]] اتستنتج من الـ getter.
- مكتبش [[describe]]، فهياخد الافتراضية من Payable.

ولو كتبت [[fun describe() = "x"]] من غير override:

~~~text رسالة المترجم
error: 'describe' hides member of supertype 'Payable' and needs an 'override' modifier.
~~~

---

## ٤. ولد تاني: [[open class Freelancer]]

~~~kotlin
open class Freelancer(name: String, val hours: Int, val rate: Double) : Employee(name) {
    override val amount get() = hours * rate
    override fun describe() = "$name: $hours ساعة = $amount"
}
~~~

- [[open]]: الكلاسات في Kotlin [[final]] افتراضيًا (مقفولة على الوراثة). [[open]] بتفتحها، فينفع بعدين حد يعمل [[class SeniorFreelancer : Freelancer(...)]].
- [[hours * rate]]: [[Int]] في [[Double]] = [[Double]]. 40 في 250.0 = [[10000.0]].
- [[override fun describe()]]: هنا كتبنا نسخة بدل الافتراضية. وجواها [[$name]] جاية من الأب، و [[$amount]] بتنادي الـ getter.

ليه [[Employee]] مش محتاج [[open]]؟ لأن [[abstract]] مفتوح لوحده، ما هو معمول عشان يتورث.

---

## ٥. main: الـ polymorphism

~~~kotlin
    val team: List<Employee> = listOf(FullTime("Sara", 15000.0), Freelancer("Omar", 40, 250.0))
    for (e in team) println(e.describe())
    println(team.sumOf { it.amount })
~~~

- [[List<Employee>]]: النوع المكتوب هو الأب، والعناصر نوعين مختلفين. مسموح لأن كل FullTime وكل Freelancer «هو» Employee.
- [[for (e in team)]]: [[e]] نوعه Employee. لما تنادي [[e.describe()]]، اللي بيتنفذ هو نسخة **النوع الحقيقي** للـ object وقت التشغيل. ده اسمه polymorphism (شكل واحد، تصرفات مختلفة):

| العنصر | describe اللي اتنفذت | المطبوع |
|---|---|---|
| FullTime | الافتراضية من Payable | [[مبلغ 15000.0]] |
| Freelancer | بتاعته | [[Omar: 40 ساعة = 10000.0]] |

- [[sumOf { it.amount }]]: بتلف على العناصر وتجمع اللي الـ lambda بترجّعه. 15000.0 + 10000.0 = [[25000.0]].

---

## ٦. حل التجربة (solCode)

~~~kotlin
import kotlin.math.PI

interface Shape {
    fun area(): Double
}
class Circle(private val r: Double) : Shape {
    override fun area() = PI * r * r
}
open class Rect(private val w: Double, private val h: Double) : Shape {
    override fun area() = w * h
}
class Square(side: Double) : Rect(side, side)
~~~

- [[import kotlin.math.PI]]: الثابت π (3.14159...) من مكتبة Kotlin.
- [[fun area(): Double]] في الـ interface من غير جسم: كل شكل لازم يكتبها.
- [[Square(side)]] بيورث من [[Rect]] وبيدّيله [[side]] مرتين (طول وعرض). مكتبش ولا سطر، كل حاجة جاية من Rect.

~~~text الناتج
52.56637061435917
9.0
~~~

- دايرة نص قطرها 2: [[π × 2 × 2 = 12.566...]]، ومستطيل [[5 × 8 = 40]]، والمجموع 52.566...
- مربع ضلعه 3: [[9.0]].

ولو شيلت [[open]] من Rect:

~~~text رسالة المترجم
error: this type is final, so it cannot be extended.
class Square(side: Double) : Rect(side, side)
                             ^^^^
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[interface I { val p: T; fun f() = ... }]] | عقد: حاجات لازم تتكتب، وحاجات بتنفيذ افتراضي |
| [[class C : I]] | بينفذ interface (من غير أقواس) |
| [[abstract class A]] | ناقص، مينفعش يتعمل منه object |
| [[open class B]] | مسموح يتورث منه (الافتراضي final) |
| [[class C(x: T) : B(x)]] | بيورث وبينادي constructor الأب |
| [[override]] | إجباري على أي حاجة جاية من فوق |

اللي ميتلخبطش: أقواس بعد اسم **كلاس** أب ([[Employee(name)]])، ومن غير أقواس بعد **interface** ([[Payable]]). وكلاس واحد بس تورث منه، و interfaces بأي عدد.`,
          lines: [
            R`[[interface]]: عقد.`,
            "property لازم كل واحد يحددها.",
            "دالة ليها تنفيذ افتراضي.",
            "قفلة.",
            R`[[abstract]]: مينفعش يتعمل منه object، وبينفذ Payable (من غير ما يحدد amount، فالولاد هيحددوه).`,
            R`بيورث من Employee وبينادي الـ constructor بتاعه بـ [[(name)]].`,
            R`[[override]] للـ property بـ getter.`,
            "قفلة.",
            R`[[open]]: ينفع حد يورث منه بعد كده.`,
            "amount هنا حساب.",
            R`[[override]] للدالة بشكل مختلف.`,
            "قفلة.",
            R`بداية [[main]].`,
            R`List نوعها Employee وجواها نوعين مختلفين.`,
            "كل واحد بيرد بطريقته.",
            R`[[sumOf]] على الـ property المشتركة.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[مبلغ 15000.0]]
[[Omar: 40 ساعة = 10000.0]]
[[25000.0]]

FullTime استخدم [[describe]] الافتراضية من الـ interface، و Freelancer كتب نسخته.

وحل التجربة تحت: المجموع [[52.56637061435917]] (دايرة نص قطرها 2 مساحتها حوالي 12.57، ومستطيل 5 في 8 = 40)، و Square بضلع 3 مساحته [[9.0]]. ومن غير [[open]] قدام Rect المترجم بيقول [[this type is final, so it cannot be extended]].`,
          solCode: R`import kotlin.math.PI

interface Shape {
    fun area(): Double
}

class Circle(private val r: Double) : Shape {
    override fun area() = PI * r * r
}

open class Rect(private val w: Double, private val h: Double) : Shape {
    override fun area() = w * h
}

class Square(side: Double) : Rect(side, side)

fun main() {
    val shapes = listOf(Circle(2.0), Rect(5.0, 8.0))
    println(shapes.sumOf { it.area() })
    println(Square(3.0).area())
}`
        }
      ]
    },
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
    },
    {
      t: "مشروع Android من جوه",
      l: 2,
      n: "تعمل مشروع وتشغّله، و Gradle و libs.versions.toml، و AndroidManifest والـ resources، والـ Activity ودورة حياتها",
      items: [
        {
          cmd: "مشروع Android",
          title: "أول مشروع Android: تعمله إزاي، وكل فولدر فيه لازمته إيه، وتشغّله على emulator؟",
          desc: R`في Android Studio: New Project ثم Empty Activity (ده قالب Compose). هتختار:
• Name: اسم التطبيق اللي بيظهر.
• Package name: زي [[com.sara.notes]]. ده الـ [[applicationId]]، اسم تطبيقك الفريد على Play للأبد، فاختاره صح ومتسيبهوش [[com.example]].
• Minimum SDK: أقدم Android التطبيق يشتغل عليه. Android Studio بيقولك النسبة التقريبية من الأجهزة اللي هتغطيها.
• Build configuration language: سيبها Kotlin DSL ([[build.gradle.kts]]).

أهم الملفات:
• [[app/src/main/java/com/sara/notes/MainActivity.kt]]: الكود بتاعك (الفولدر اسمه java حتى لو الكود Kotlin، ده عرف قديم).
• [[app/src/main/res/]]: الـ resources (نصوص، صور، أيقونات، ألوان).
• [[app/src/main/AndroidManifest.xml]]: بطاقة تعريف التطبيق للنظام.
• [[app/build.gradle.kts]]: إعدادات الـ module والمكتبات.
• [[gradle/libs.versions.toml]]: نسخ كل المكتبات في مكان واحد.
• [[settings.gradle.kts]] و [[build.gradle.kts]] اللي برا: إعدادات المشروع كله.
• [[gradlew]] و [[gradlew.bat]]: سكربت بيشغّل نسخة Gradle المظبوطة للمشروع من غير ما تسطّبه.

التشغيل: Device Manager ثم اعمل جهاز وهمي (emulator) زي Pixel، أو وصّل موبايلك بعد ما تفعّل Developer options و USB debugging (تدوس على Build number ٧ مرات في الإعدادات). وبعدين زرار Run الأخضر. والأوامر اللي في المثال بتعمل نفس الحاجة من الترمنال.`,
          example: R`./gradlew tasks
./gradlew assembleDebug
adb devices
./gradlew installDebug
adb shell am start -n com.sara.notes/.MainActivity
adb uninstall com.sara.notes`,
          try: R`اعمل مشروع Empty Activity باسم Notes و package [[com.yourname.notes]]، وشغّله على emulator. بعدين افتح ترمنال Android Studio (تحت) وشغّل [[./gradlew assembleDebug]] (أو [[.\gradlew assembleDebug]] على ويندوز)، ودوّر على الـ APK اللي اتعمل.`,
          deep: {
            why: R`أغلب مشاكل المبتدئين في Android مش في الكود، في إنهم مش عارفين الملف المطلوب فين، أو Gradle بيقول إيه. لو فهمت الهيكل من أول يوم، أي tutorial أو مشروع حد تاني هتعرف تقراه.`,
            how: R`Android Studio هو IntelliJ IDEA ومعاه أدوات Android. البناء نفسه مش بيعمله Android Studio: بيعمله [[Gradle]] ومعاه Android Gradle Plugin ([[AGP]]). وده اللي بيخلي نفس الأمر يشتغل على جهازك وعلى سيرفر CI.

[[adb]] (Android Debug Bridge) أداة في Android SDK بتكلم الجهاز: تسطّب، وتمسح، وتقرا الـ logs، وتفتح shell. لو مش لاقيها في الترمنال، فولدر [[platform-tools]] جوه الـ SDK مش على الـ PATH.

الـ emulator بيحتاج hardware acceleration: على ويندوز Windows Hypervisor Platform، وعلى Linux الـ KVM. لو بطيء جدًا غالبًا ده مش متفعّل.

وفيه نوعين ملفات بيطلعوا: [[APK]] بيتسطّب مباشرة، و [[AAB]] بيترفع على Play (المستوى ٣).`,
            when: "مرة لكل تطبيق جديد. وأوامر adb هتحتاجها كل يوم: تمسح التطبيق وتسطّبه من الأول، أو تقرا logs من موبايل حقيقي.",
            mistakes: R`تحط المشروع في مسار فيه حروف عربي أو مسافات: على ويندوز Gradle بيرفض أو بيطلّع أخطاء غريبة، خليه في زي [[C:\dev\notes]]. وتسيب [[com.example]]: Play بيرفض أي package بيبدأ بيه. وأول build بياخد دقايق (بينزّل Gradle والمكتبات)، فمتقفلش Android Studio وانت فاكره علّق.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

الـ ٦ أوامر هي نفس اللي زرار Run الأخضر في Android Studio بيعمله، بس من الترمنال: اعرض المهام، ابني APK، شوف الأجهزة المتوصلة، سطّب، افتح التطبيق، امسحه. أول اتنين وأمر التسطيب من [[Gradle]]، والباقي من [[adb]].

> الجهاز اللي اتكتب عليه الدرس مفيهوش Android SDK ولا emulator، فالأوامر دي **متشغّلتش** هنا. هيكل المشروع من قالب Empty Activity في Android Studio، وأشكال الناتج من الـ docs الرسمية (developer.android.com: «Build your app from the command line» و «Android Debug Bridge»). الحاجة الوحيدة اللي اتجرّبت: إن [[./gradlew]] و [[.\gradlew]] في PowerShell بيشغّلوا [[gradlew.bat]] على ويندوز.

---

## ١. المشروع شكله إيه بعد New Project

قالب Empty Activity (Compose) باسم Notes و package [[com.sara.notes]] بيعمل الشجرة دي (مختصرة):

~~~text هيكل المشروع
Notes/
├── settings.gradle.kts          أنهي modules في المشروع، والمكتبات بتتنزل منين
├── build.gradle.kts             إعدادات المشروع كله (غالبًا plugins بس)
├── gradle.properties            إعدادات Gradle نفسه (ذاكرة، AndroidX)
├── local.properties             مكان الـ SDK على جهازك (متترفعش على Git)
├── gradlew  و  gradlew.bat      الـ wrapper: لينكس/ماك، وويندوز
├── gradle/
│   ├── libs.versions.toml       نسخ كل المكتبات (درس Gradle)
│   └── wrapper/                 gradle-wrapper.jar و gradle-wrapper.properties
└── app/                         الـ module بتاع التطبيق
    ├── build.gradle.kts         إعدادات الـ app: SDK ونسخ ومكتبات
    └── src/
        ├── main/
        │   ├── AndroidManifest.xml
        │   ├── java/com/sara/notes/
        │   │   ├── MainActivity.kt
        │   │   └── ui/theme/    Color.kt و Theme.kt و Type.kt
        │   └── res/             drawable و mipmap-* و values (strings و colors و themes)
        ├── test/                unit tests بتشتغل على جهازك
        └── androidTest/         tests بتشتغل على موبايل أو emulator
~~~

- [[app]] اسمه **module**: حتة من المشروع ليها build خاص بيها. المشاريع الكبيرة بيبقى فيها أكتر من module، وكل واحد ليه [[build.gradle.kts]].
- الفولدر [[java/com/sara/notes]] اسمه java حتى والكود Kotlin، والفولدرات بتمشي ورا الـ package: كل نقطة في [[com.sara.notes]] بقت فولدر.
- [[test]] و [[androidTest]] ليهم دروس في مستوى ٣.

---

## ٢. [[./gradlew tasks]]

~~~bash
./gradlew tasks
~~~

| الحتة | معناها |
|---|---|
| [[./]] | «الملف ده في الفولدر الحالي». من غيرها الترمنال بيدوّر في الـ PATH بس |
| [[gradlew]] | Gradle **w**rapper: سكربت صغير بينزّل نسخة Gradle المكتوبة في [[gradle-wrapper.properties]] (أول مرة بس) ويشغّلها |
| [[tasks]] | اسم الـ task: «اعرض كل الـ tasks اللي ينفع تشغّلها» |

ليه wrapper ومش [[gradle]] على طول؟ عشان كل مشروع بيحتاج نسخة Gradle معينة. الـ wrapper بيضمن إن جهازك وجهاز زميلك وسيرفر الـ CI بيستخدموا نفس النسخة، من غير ما حد يسطّب Gradle بنفسه.

الناتج قايمة طويلة متقسمة مجموعات (حسب الـ docs)، منها:

~~~text شكل الناتج (من الـ docs، مختصر)
Build tasks
-----------
assemble - Assemble main outputs for all the variants.
assembleDebug - Assembles main output for variant debug
assembleRelease - Assembles main output for variant release
...
Install tasks
-------------
installDebug - Installs the Debug build.
uninstallAll - Uninstall all applications.
~~~

---

## ٣. [[./gradlew assembleDebug]]

~~~bash
./gradlew assembleDebug
~~~

- [[assemble]]: اجمع كل حاجة في ملف واحد جاهز. و [[Debug]]: النسخة اللي للتجربة (فيها معلومات debugging وموقّعة بمفتاح debug أوتوماتيك). وفيه [[assembleRelease]] للنشر (المستوى ٣).
- Gradle بيترجم الـ Kotlin، ويجمّع الـ resources، ويدمج الـ manifest، ويطلّع **APK** (Android Package): الملف اللي بيتسطّب على الموبايل.
- مكانه: [[app/build/outputs/apk/debug/app-debug.apk]]، وآخر سطر في الترمنال [[BUILD SUCCESSFUL in ...]] ومعاه المدة.

أول مرة بتاخد دقايق (Gradle بينزّل نفسه والـ plugins والمكتبات)، والمرات اللي بعدها أسرع بكتير لأن Gradle بيبني اللي اتغير بس.

---

## ٤. [[adb devices]]

~~~bash
adb devices
~~~

[[adb]] = Android Debug Bridge: أداة في فولدر [[platform-tools]] جوه الـ SDK بتكلّم أي موبايل أو emulator متوصل. و [[devices]]: «اعرض الأجهزة».

~~~text شكل الناتج (من الـ docs)
List of devices attached
emulator-5554   device
0a388e93        unauthorized
~~~

| العمود | معناه |
|---|---|
| [[emulator-5554]] | الـ serial: اسم الجهاز. الـ emulator بياخد رقم port |
| [[device]] | متوصل وجاهز |
| [[unauthorized]] | موبايل حقيقي لسه موافقتش على «Allow USB debugging?» على شاشته |
| [[offline]] | متوصل بس مش بيرد، جرّب تفصل وتوصّل |

---

## ٥. [[./gradlew installDebug]]

~~~bash
./gradlew installDebug
~~~

بيعمل [[assembleDebug]] الأول لو فيه تغيير، وبعدين بيسطّب الـ APK على الجهاز المتوصل (بيستخدم adb من جوه). لو فيه أكتر من جهاز، Gradle بيسطّب عليهم كلهم. التطبيق بيتسطّب بس **مش بيفتح** لوحده، وده سبب الأمر اللي جاي.

---

## ٦. [[adb shell am start -n ...]]

~~~bash
adb shell am start -n com.sara.notes/.MainActivity
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[adb shell]] | نفّذ اللي بعدي **جوه** الموبايل (اللي عليه لينكس) |
| [[am]] | Activity Manager: الأداة اللي بتشغّل الشاشات جوه Android |
| [[start]] | ابدأ Activity |
| [[-n]] | بعدها اسم الـ component بالظبط |
| [[com.sara.notes]] | الـ applicationId (اسم التطبيق) |
| [[/.MainActivity]] | الكلاس. النقطة في الأول معناها «جوه نفس الـ package»، يعني [[com.sara.notes.MainActivity]] |

~~~text شكل الناتج (من الـ docs)
Starting: Intent { cmp=com.sara.notes/.MainActivity }
~~~

---

## ٧. [[adb uninstall com.sara.notes]]

~~~bash
adb uninstall com.sara.notes
~~~

بيمسح التطبيق **وكل الداتا بتاعته** (الداتابيز والإعدادات)، فبتبدأ من الصفر زي أول تسطيب. بيطبع [[Success]] لو نجح. مفيد لما تغيّر شكل الداتابيز أو تجرّب شاشة أول تشغيل.

---

## ٨. على ويندوز

| | لينكس والماك | ويندوز (PowerShell) |
|---|---|---|
| الـ wrapper | [[./gradlew assembleDebug]] | [[.\gradlew assembleDebug]] |
| الملف اللي بيشتغل | [[gradlew]] (shell script) | [[gradlew.bat]] |
| adb | [[adb devices]] | [[adb devices]] (نفسه) |

جرّبت في PowerShell 7 فولدر فيه [[gradlew]] و [[gradlew.bat]]: [[./gradlew]] و [[.\gradlew]] الاتنين شغّلوا [[gradlew.bat]]. وفي cmd اكتب [[gradlew assembleDebug]] أو [[.\gradlew assembleDebug]]. ولو [[adb]] طلع «not recognized»، ضيف [[%LOCALAPPDATA%\Android\Sdk\platform-tools]] على الـ PATH (ده مكان الـ SDK الافتراضي على ويندوز).

وفي ترمنال Android Studio نفسه (تحت) نفس الأوامر بتشتغل، وهو بيفتح في فولدر المشروع على طول.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[./gradlew tasks]] | كل اللي Gradle يقدر يعمله |
| [[./gradlew assembleDebug]] | يبني [[app/build/outputs/apk/debug/app-debug.apk]] |
| [[adb devices]] | الأجهزة المتوصلة، لازم [[device]] |
| [[./gradlew installDebug]] | يبني ويسطّب (من غير ما يفتح) |
| [[adb shell am start -n pkg/.Activity]] | يفتح الشاشة |
| [[adb uninstall pkg]] | يمسح التطبيق بالداتا |

اللي ميتلخبطش: [[gradlew]] بيبني (على جهازك)، و [[adb]] بيكلّم الموبايل. والـ package name اللي بتختاره أول يوم هو اسم تطبيقك على Play للأبد.`,
          lines: [
            "كل المهام اللي Gradle يقدر يعملها في المشروع.",
            R`ابني نسخة debug، والـ APK بيطلع في [[app/build/outputs/apk/debug/]].`,
            R`الأجهزة المتوصلة (emulator أو موبايل). لازم تبقى [[device]] مش [[unauthorized]].`,
            "ابني وسطّب على الجهاز المتوصل.",
            "افتح الـ Activity الرئيسية من الترمنال.",
            "امسح التطبيق من الجهاز (بداتا بتاعته)."
          ],
          sol: R`الـ APK بيطلع في [[app/build/outputs/apk/debug/app-debug.apk]]، وآخر سطر في الترمنال [[BUILD SUCCESSFUL in ...]].

لو [[adb devices]] طلّع الموبايل [[unauthorized]]: بص على شاشة الموبايل، هتلاقي سؤال «Allow USB debugging?»، وافق. ولو مش ظاهر خالص: جرّب كابل تاني (فيه كابلات شحن بس)، وعلى ويندوز ممكن تحتاج USB driver بتاع الشركة.

ولو الـ build وقع برسالة فيها [[JDK]] أو [[Unsupported class file major version]]: من Settings ثم Build Tools ثم Gradle، خلي Gradle JDK هو الـ JDK اللي جاي مع Android Studio.`
        },
        {
          cmd: "Gradle و libs.versions.toml",
          title: "build.gradle.kts و libs.versions.toml: تضيف مكتبة للمشروع إزاي؟",
          desc: R`[[app/build.gradle.kts]] ده إعدادات الـ app module، ومكتوب بـ Kotlin (عشان كده الامتداد [[.kts]]). فيه ٣ أجزاء:

١. [[plugins { }]]: الـ plugins اللي بتبني المشروع. [[com.android.application]] (الـ AGP)، و [[org.jetbrains.kotlin.plugin.compose]] (مترجم Compose). ومن AGP 9 الـ Kotlin نفسها جوه الـ AGP، فمش محتاج plugin [[kotlin-android]] زي المشاريع القديمة.

٢. [[android { }]]:
• [[namespace]]: الـ package اللي فيه كلاس [[R]] (الـ resources).
• [[compileSdk]]: نسخة Android SDK اللي بتترجم عليها.
• [[minSdk]]: أقدم Android التطبيق يتسطّب عليه.
• [[targetSdk]]: نسخة Android اللي التطبيق متجرّب عليها وبيتبع قواعدها. Google Play بيطلب رقم حديث: من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم [[targetSdk = 36]] (Android 16) على الأقل.
• [[versionCode]]: رقم صحيح لازم يزيد مع كل رفعة على Play. و [[versionName]]: اللي اليوزر بيشوفه.

٣. [[dependencies { }]]: المكتبات. [[implementation(...)]] للتطبيق، و [[testImplementation(...)]] للاختبارات بس.

و [[libs.androidx.activity.compose]] ده جاي من [[gradle/libs.versions.toml]] (اسمه version catalog): ملف فيه كل النسخ والمكتبات في مكان واحد، بدل ما النسخ تبقى متفرقة في كل ملف. الشَرطة [[-]] في الاسم بتبقى نقطة [[.]] في الكود. وبعد أي تعديل دوس Sync Now.

و [[platform(libs.androidx.compose.bom)]]: الـ BOM (Bill of Materials) بيحدد نسخ كل مكتبات Compose المتوافقة مع بعض، فمكتبات Compose نفسها بتتكتب من غير نسخة.`,
          example: R`plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}
android {
    namespace = "com.sara.notes"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
    buildFeatures {
        compose = true
    }
}
dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    testImplementation(libs.junit)
}`,
          try: R`افتح [[gradle/libs.versions.toml]] في مشروعك وضيف مكتبة [[androidx.lifecycle:lifecycle-viewmodel-compose]] (هتحتاجها في درس الـ ViewModel): نسخة في [[[versions]]]، وسطر في [[[libraries]]]، وبعدين [[implementation(...)]] في [[app/build.gradle.kts]] واعمل Sync. ولاحظ إن Android Studio بيعلّم بالأصفر لو فيه نسخة أحدث.`,
          flag: "script",
          deep: {
            why: R`كل ميزة هتضيفها (شبكة، صور، داتابيز، تنقل) معناها مكتبة. والـ version catalog بيمنع إن نفس المكتبة تبقى بنسختين في modules مختلفة، وبيخلي التحديث في سطر واحد.`,
            how: R`Gradle بيقرا [[settings.gradle.kts]] الأول (أنهي modules موجودة، والمكتبات بتتنزل منين: [[google()]] و [[mavenCentral()]])، وبعدين [[build.gradle.kts]] بتاع كل module.

الـ [[.kts]] كود Kotlin حقيقي: [[android { }]] دالة بتاخد lambda with receiver (درس scope functions)، عشان كده الـ autocomplete شغال جواه.

[[implementation]] غير [[api]]: implementation معناها إن المكتبة دي داخلية للـ module ومش ظاهرة للي بيستخدمه، فالبناء أسرع. و [[ksp(...)]] للمكتبات اللي بتولّد كود وقت الترجمة (Room و Hilt). الـ KSP هو البديل الأسرع لـ kapt القديم، و kapt مش مدعوم مع Kotlin المدمجة في AGP 9.

[[compileSdk]] و [[targetSdk]] مش نفس الحاجة: compileSdk بيحدد الـ APIs اللي تقدر تكتبها، و targetSdk بيقول للنظام «أنا جاهز لسلوك النسخة دي» (زي edge-to-edge الإجباري من Android 15). ولو استخدمت API أحدث من minSdk، لازم تفحص [[Build.VERSION.SDK_INT]] قبلها.`,
            when: R`كل ما تضيف مكتبة، أو تحدّث نسخة، أو تجهّز release. وحدّث [[targetSdk]] مرة في السنة على الأقل عشان Play.`,
            mistakes: R`تنسخ [[implementation("group:name:1.2.3")]] من tutorial قديم جنب الـ catalog فيبقى عندك نسختين. وتحدّث مكتبة واحدة من Compose بنسخة لوحدها بدل الـ BOM فيحصل تعارض. وتستخدم [[kapt]] من tutorial قديم مع AGP 9 فالبناء يقع: استخدم [[ksp]].`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[app/build.gradle.kts]]: الملف اللي Gradle بيقراه عشان يعرف يبني التطبيق إزاي. ٣ blocks: مين بيبني ([[plugins]])، وإعدادات Android ([[android]])، والمكتبات ([[dependencies]]). وكل اسم بيبدأ بـ [[libs.]] جاي من ملف تاني: [[gradle/libs.versions.toml]] (الـ solCode).

> مفيش Android SDK على الجهاز اللي اتكتب عليه الدرس، فالملفات دي **متبنتش** هنا. الشرح من قالب Empty Activity في Android Studio ومن الـ docs الرسمية (developer.android.com: «Configure your build» و «Migrate your build to version catalogs»). النسخ اللي في الـ solCode اتأكدت إنها موجودة فعلًا على [[maven.google.com]] و Maven Central (أكتوبر 2026): AGP [[9.4.1]]، و Kotlin [[2.4.20]]، و Compose BOM [[2026.09.00]]، و activity-compose [[1.13.0]]، و lifecycle [[2.11.0]].

---

## ١. الملف كود Kotlin

الامتداد [[.kts]] = Kotlin Script. يعني كل اللي في الملف كود Kotlin حقيقي:

- [[plugins { ... }]] و [[android { ... }]]: دوال بتاخد lambda (درس lambdas)، والـ trailing lambda بيخلي شكلها زي «أقسام».
- جوه [[android { }]] بتكتب [[compileSdk = 36]] من غير [[android.]] قبلها. ده الـ **lambda with receiver** من درس scope functions: جوه الـ block، [[this]] هو object الإعدادات بتاع Android.
- [[=]] تعيين قيمة لـ property عادي.

عشان كده Android Studio بيعمل autocomplete جوه الملف، وبيعلّم بالأحمر لو كتبت اسم غلط.

---

## ٢. [[plugins { }]]

~~~kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}
~~~

- الـ **plugin** حتة بتعلّم Gradle يعمل حاجة جديدة. Gradle لوحده ميعرفش يعني إيه Android.
- [[alias(...)]]: «هات الـ plugin ده من الـ version catalog»، بالـ id والنسخة المكتوبين هناك.
- [[libs.plugins.android.application]]: في الـ toml مكتوب [[android-application = { id = "com.android.application", version.ref = "agp" }]]. يعني الـ **AGP** (Android Gradle Plugin) نسخة [[9.4.1]]. ده اللي بيضيف [[android { }]] وكل الـ tasks زي [[assembleDebug]].
- [[libs.plugins.kotlin.compose]]: [[org.jetbrains.kotlin.plugin.compose]]، الـ compiler plugin بتاع Compose. نسخته نفس نسخة Kotlin ([[version.ref = "kotlin"]]) لأنه جزء من مترجم Kotlin.
- مفيش [[org.jetbrains.kotlin.android]]: من AGP 9 دعم Kotlin مدمج في الـ AGP نفسه (اسمه built-in Kotlin). المشاريع الأقدم هتلاقي فيها السطر ده.

---

## ٣. [[android { }]]

~~~kotlin
android {
    namespace = "com.sara.notes"
    compileSdk = 36
~~~

| الإعداد | معناه |
|---|---|
| [[namespace]] | الـ package اللي كلاس [[R]] بيتولد فيه ([[com.sara.notes.R]])، وبيتحط قبل الأسامي النسبية في الـ manifest زي [[.MainActivity]] |
| [[compileSdk = 36]] | نسخة Android SDK اللي الكود بيترجم عليها (36 = Android 16). بتحدد الـ APIs اللي تقدر **تكتبها** |

---

## ٤. [[defaultConfig { }]]

~~~kotlin
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
~~~

[[defaultConfig]]: الإعدادات اللي كل نسخ البناء بتاخدها (debug و release، المستوى ٣).

| الإعداد | معناه | القيمة هنا |
|---|---|---|
| [[applicationId]] | اسم التطبيق الفريد على الجهاز وعلى Play، مبيتغيرش بعد أول رفعة | [[com.sara.notes]] |
| [[minSdk]] | أقدم Android يتسطّب عليه، الأقدم منه مش هيشوف التطبيق على Play | 24 = Android 7.0 |
| [[targetSdk]] | آخر نسخة التطبيق متجرّب عليها، والنظام بيطبّق قواعدها | 36 = Android 16 |
| [[versionCode]] | رقم صحيح لازم يزيد مع كل رفعة على Play | 1 |
| [[versionName]] | نص بيظهر لليوزر في الإعدادات و Play | [["1.0"]] |

والطبيعي يبقى [[minSdk ≤ targetSdk ≤ compileSdk]]: targetSdk أعلى من compileSdk بيطلّع تحذير، لأنك بتقول «متجرّب على نسخة» مبتترجمش عليها.

> [[namespace]] و [[applicationId]] غالبًا نفس القيمة، بس مش لازم: الأول للكود (R و package)، والتاني اسم التطبيق للعالم. ممكن تغيّر الـ package بتاع الكود بعدين، لكن applicationId بعد النشر لأ.

---

## ٥. [[buildFeatures { }]]

~~~kotlin
    buildFeatures {
        compose = true
    }
}
~~~

بتشغّل مزايا مقفولة افتراضيًا. [[compose = true]] بتقول للـ AGP إن الـ module ده بيستخدم Compose. وفيه غيرها زي [[viewBinding = true]] (درس ViewBinding) و [[buildConfig = true]].

---

## ٦. [[dependencies { }]]

~~~kotlin
dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    testImplementation(libs.junit)
}
~~~

### الكلمة اللي قبل القوس اسمها configuration

| الكلمة | المكتبة بتدخل فين |
|---|---|
| [[implementation]] | كود التطبيق، وبتتحط جوه الـ APK |
| [[testImplementation]] | الـ unit tests بس ([[src/test]])، ومش بتدخل الـ APK |
| [[androidTestImplementation]] | tests الموبايل ([[src/androidTest]]) |
| [[ksp]] | مكتبات بتولّد كود وقت الترجمة (Room و Hilt) |

### [[platform(libs.androidx.compose.bom)]]

**BOM** = Bill of Materials (قايمة مكونات): ملف مفيهوش كود، فيه بس «نسخ مكتبات Compose اللي متجرّبة مع بعض». [[platform(...)]] بتقول لـ Gradle: «خد النسخ من هنا». عشان كده سطر [[material3]] في الـ toml **ملوش** [[version]]:

~~~text gradle/libs.versions.toml
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
~~~

تحدّث Compose كله بتغيير رقم واحد: [[composeBom]].

### كل مكتبة بتعمل إيه

| في الكود | المكتبة الحقيقية ([[group:name]]) | ليه |
|---|---|---|
| [[libs.androidx.compose.material3]] | [[androidx.compose.material3:material3]] | الأزرار والـ Text والـ Scaffold |
| [[libs.androidx.activity.compose]] | [[androidx.activity:activity-compose]] | [[setContent { }]] في الـ Activity |
| [[libs.androidx.lifecycle.viewmodel.compose]] | [[androidx.lifecycle:lifecycle-viewmodel-compose]] | [[viewModel()]] جوه composable |
| [[libs.junit]] | [[junit:junit:4.13.2]] | الـ unit tests |

---

## ٧. [[libs.versions.toml]] (الـ solCode)

ملف بصيغة **TOML** (صيغة إعدادات بسيطة: أقسام بين [[[ ]]] وتحتها [[اسم = قيمة]]). ٣ أقسام:

### [[[versions]]]

~~~text
[versions]
agp = "9.4.1"
kotlin = "2.4.20"
composeBom = "2026.09.00"
~~~

أرقام بس، ليها أسامي. أي مكتبة تشاور عليها بـ [[version.ref]].

### [[[libraries]]]

~~~text
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
~~~

| الحتة | معناها |
|---|---|
| [[androidx-activity-compose]] | الاسم اللي هتستخدمه في Gradle |
| [[{ ... }]] | inline table: كذا قيمة في سطر واحد |
| [[group]] و [[name]] | إحداثيات المكتبة على الـ repository (زي عنوان) |
| [[version.ref = "activityCompose"]] | النسخة من [[[versions]]] (هنا [[1.13.0]]) |
| [[version = "4.13.2"]] | (في junit) نسخة مكتوبة على طول من غير ref |

**قاعدة الاسم:** الشَرط [[-]] في الـ toml بتبقى نقط في الكود، و Gradle بيحط قبلها [[libs.]]:

~~~text التحويل
androidx-activity-compose   →   libs.androidx.activity.compose
android-application (plugin) →   libs.plugins.android.application
~~~

### [[[plugins]]]

نفس الفكرة، بس بـ [[id]] بدل group و name، وفي الكود بيبقى [[libs.plugins.]].

---

## ٨. التجربة: تضيف مكتبة

اللي الـ try بيطلبه ٣ خطوات، وكلهم ظاهرين في الـ solCode:

1. [[[versions]]]: [[lifecycle = "2.11.0"]].
2. [[[libraries]]]: [[androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }]].
3. [[app/build.gradle.kts]]: [[implementation(libs.androidx.lifecycle.viewmodel.compose)]]، وبعدين **Sync Now** (الشريط الأصفر فوق الملف) عشان Android Studio يقرا التغيير وينزّل المكتبة.

---

## ٩. Gradle بيقرا إيه الأول؟

1. [[settings.gradle.kts]]: فيه [[rootProject.name = "Notes"]] و [[include(":app")]] (الـ modules)، والـ repositories اللي المكتبات بتتنزل منها ([[google()]] لمكتبات androidx، و [[mavenCentral()]] للباقي).
2. [[build.gradle.kts]] اللي في الجذر: بيعلن الـ plugins بـ [[apply false]] (يعني «حمّلها بس متطبقهاش هنا»).
3. [[app/build.gradle.kts]]: الملف اللي شرحناه.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[plugins { alias(...) }]] | AGP و Compose compiler |
| [[namespace]] | package كلاس R |
| [[compileSdk]] / [[minSdk]] / [[targetSdk]] | بترجم على / أقدم جهاز / القواعد المتبعة |
| [[versionCode]] | لازم يزيد مع كل رفعة |
| [[implementation(platform(bom))]] | نسخ Compose من مكان واحد |
| [[libs.a.b.c]] | [[a-b-c]] في [[libs.versions.toml]] |

اللي ميتلخبطش: الشَرط في الـ toml نقط في الكود، ومكتبات Compose من غير نسخة عشان الـ BOM بيحددها. وبعد أي تعديل: Sync.`,
          lines: [
            R`[[plugins]]: إيه اللي هيبني المشروع.`,
            R`plugin تطبيق Android (الـ AGP)، ونسخته من الـ catalog.`,
            "plugin مترجم Compose.",
            "قفلة.",
            R`إعدادات [[android]].`,
            R`الـ package اللي فيه كلاس R.`,
            "نسخة الـ SDK اللي بنترجم عليها.",
            R`[[defaultConfig]]: إعدادات بتتطبق على كل نسخ البناء.`,
            "الاسم الفريد على Play للأبد.",
            "أقدم نسخة Android مسموحة (Android 7.0).",
            "متجرّب على Android 16، واللي Play بيطلبه في 2026.",
            "رقم البناء، لازم يزيد مع كل رفعة.",
            "النسخة اللي اليوزر بيشوفها.",
            "قفلة defaultConfig.",
            "مزايا البناء.",
            "شغّل Compose.",
            "قفلة.",
            R`قفلة [[android]].`,
            "المكتبات.",
            "الـ BOM بيحدد نسخ Compose كلها.",
            "Material 3 من غير نسخة (من الـ BOM).",
            R`[[setContent]] و Compose في الـ Activity.`,
            R`[[viewModel()]] جوه Compose.`,
            "JUnit للاختبارات بس.",
            "قفلة."
          ],
          sol: R`في [[libs.versions.toml]] بتضيف تحت [[[versions]]] سطر زي [[lifecycle = "2.11.0"]] (النسخة الأحدث وقت ما تعمل ده)، وتحت [[[libraries]]] السطر اللي في الكود تحت. وفي [[app/build.gradle.kts]] الاسم بيبقى بنقط: [[implementation(libs.androidx.lifecycle.viewmodel.compose)]].

بعد Sync لو الاسم غلط هيطلع [[Unresolved reference: lifecycle]] في ملف Gradle. ولو النسخة مش موجودة: [[Could not find androidx.lifecycle:...]].

والكود تحت محتوى ملف [[gradle/libs.versions.toml]]. والنسخ اللي فيه مثال وقت كتابة الدرس (أواخر 2026)، و Android Studio بيحط الأحدث في المشروع الجديد.`,
          solCode: R`[versions]
agp = "9.4.1"
kotlin = "2.4.20"
composeBom = "2026.09.00"
activityCompose = "1.13.0"
lifecycle = "2.11.0"

[libraries]
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }
junit = { group = "junit", name = "junit", version = "4.13.2" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }`
        },
        {
          cmd: "AndroidManifest و res",
          title: "AndroidManifest.xml والـ resources: الصلاحيات، والـ launcher، و strings.xml والترجمة",
          desc: R`[[AndroidManifest.xml]] بطاقة تعريف التطبيق للنظام: اسمه، وأيقونته، والصلاحيات اللي محتاجها، والـ Activities اللي فيه، وأنهي واحدة تفتح من الـ launcher.

حاجات هتشوفها:
• [[uses-permission]]: صلاحية. [[INTERNET]] لازمة لأي نداء للشبكة. الصلاحيات «الخطيرة» (الكاميرا، الموقع) لازم كمان تطلبها وقت التشغيل (درس الصلاحيات).
• [[@string/app_name]] و [[@mipmap/ic_launcher]]: علامة [[@]] معناها «resource من فولدر res»: النص اللي اسمه app_name، والأيقونة اللي اسمها ic_launcher.
• [[android:exported="true"]]: الـ Activity دي ينفع تتفتح من برا التطبيق (من الـ launcher). إجباري تكتبه لأي Activity عندها intent-filter.
• [[intent-filter]] بـ [[MAIN]] و [[LAUNCHER]]: «دي الشاشة اللي تفتح لما اليوزر يدوس على الأيقونة».

فولدر [[res/]]:
• [[values/strings.xml]]: النصوص. ولو عملت [[values-ar/strings.xml]] بنفس الأسماء، الموبايل اللي لغته عربي هياخدها لوحده.
• [[drawable/]]: صور و vector icons. و [[mipmap/]]: أيقونة التطبيق بس.
• [[values/themes.xml]] و [[colors.xml]]: الثيم (في Compose أغلب الثيم بقى في الكود).

وفي الكود: كل resource ليه رقم في كلاس [[R]] اللي بيتولد لوحده: [[R.string.app_name]] و [[R.drawable.logo]]. وفي Compose: [[stringResource(R.string.welcome, name)]] و [[painterResource(R.drawable.logo)]].

و [[android:supportsRtl="true"]] بتخلي الواجهة تتقلب يمين لشمال لوحدها في العربي.`,
          example: R`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Notes">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
          try: R`في مشروعك: كليك يمين على [[res]] ثم New ثم Android Resource File، اسمه strings و Locale = Arabic. حط فيه [[app_name]] بالعربي ونص [[welcome]] فيه [[%1$s]]. غيّر لغة الـ emulator لعربي وشوف اسم التطبيق تحت الأيقونة. وبعدين اعرض [[stringResource(R.string.welcome, "Sara")]] في Compose.`,
          flag: "script",
          deep: {
            why: R`النظام مبيعرفش حاجة عن تطبيقك غير من الـ manifest: لو نسيت INTERNET، كل نداء شبكة هيقع حتى والنت شغال: غالبًا [[SocketException: socket failed: EPERM (Operation not permitted)]] أو [[UnknownHostException]]، وعلى نسخ Android قديمة [[SecurityException: Permission denied (missing INTERNET permission?)]]. والنصوص لو اتكتبت في الكود، الترجمة هتبقى مستحيلة، وكمان lint بيحذّرك من ده.`,
            how: R`الـ manifest اللي بتكتبه مش النهائي: وقت البناء Gradle بيدمجه مع manifests المكتبات (كل مكتبة ممكن تضيف صلاحيات أو components). تقدر تشوف النتيجة من تاب Merged Manifest تحت الملف. لو مكتبة ضافت صلاحية مش عايزها: [[tools:node="remove"]].

[[R]] كلاس بيتولد وقت البناء، فيه رقم int لكل resource. عشان كده [[R.string.app_name]] نوعه Int مش String، ولازم تحوّله بـ [[getString()]] أو [[stringResource()]].

الـ qualifiers بعد الشَرطة في اسم الفولدر: [[values-ar]] (لغة)، و [[values-night]] (dark mode)، و [[drawable-xxhdpi]] (كثافة الشاشة). النظام بيختار الأنسب لوحده وقت التشغيل.

[[%1$s]] في strings.xml معناها «أول argument كنص»، و [[%2$d]] «تاني argument كرقم». ولعدد العناصر فيه [[plurals]]، ومهم جدًا في العربي (عنصر واحد، عنصرين، ٣ عناصر، ١١ عنصر).`,
            when: R`الـ manifest كل ما تضيف صلاحية، أو Activity، أو deep link، أو service. والـ strings.xml لأي نص بيظهر للمستخدم من أول يوم، حتى لو لغة واحدة.`,
            mistakes: R`تنسى INTERNET وتقعد ساعة تدوّر في كود Retrofit. وتكتب نصوص عربي في الكود على طول. وتنسى [[android:exported]] على Activity فيها intent-filter فالبناء يقع (إجباري من Android 12).`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[app/src/main/AndroidManifest.xml]]: بيقول لنظام Android «التطبيق ده محتاج النت، وأيقونته واسمه وثيمه دول، وفيه شاشة اسمها MainActivity هي اللي تفتح من الأيقونة». والـ solCode ملفين [[strings.xml]]: نصوص التطبيق بالإنجليزي وبالعربي.

> مفيش Android SDK على الجهاز اللي اتكتب عليه الدرس، فالتطبيق متبناش هنا. الشرح من الـ docs الرسمية (developer.android.com: «App manifest overview» و «String resources» و «Localize your app»). اللي اتجرّب: إن الـ manifest وملفين الـ strings XML سليم، اتقروا بـ [[[xml]]] في PowerShell من غير أخطاء.

---

## ١. أول سطرين: XML

~~~text
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
~~~

- السطر الأول اسمه XML declaration: نسخة XML والترميز. [[utf-8]] عشان الحروف العربي وأي لغة تتقري صح.
- [[<manifest>]]: العنصر الأساسي، وكل حاجة جواه.
- [[xmlns:android="..."]]: [[xmlns]] = XML namespace. بيقول «أي attribute يبدأ بـ [[android:]] جاي من القاموس ده». الـ URL ده مش بيتفتح، هو اسم فريد بس. من غيره [[android:name]] متبقاش مفهومة.

قواعد XML السريعة: كل عنصر بيتفتح [[<x>]] ويتقفل [[</x>]]، أو يتقفل في نفس السطر [[<x ... />]] لو ملوش حاجة جواه. والـ attributes [[name="value"]] جوه الـ tag.

---

## ٢. [[<uses-permission>]]

~~~text
    <uses-permission android:name="android.permission.INTERNET" />
~~~

- صلاحية التطبيق محتاجها. [[INTERNET]] اسمها كامل [[android.permission.INTERNET]].
- دي صلاحية **normal**: بتتدّى أوتوماتيك وقت التسطيب، واليوزر مش بيتسأل. الصلاحيات **dangerous** (الكاميرا، الموقع، المايك) بتتكتب هنا **و** بتتطلب وقت التشغيل (درس الصلاحيات).
- لاحظ [[/>]]: العنصر ملوش محتوى، فبيتقفل في نفس السطر.

---

## ٣. [[<application>]]

~~~text
    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Notes">
~~~

إعدادات التطبيق كله، وجواه كل الشاشات.

| الـ attribute | القيمة | معناها |
|---|---|---|
| [[android:icon]] | [[@mipmap/ic_launcher]] | الأيقونة من [[res/mipmap-*/]] |
| [[android:label]] | [[@string/app_name]] | الاسم تحت الأيقونة، من [[strings.xml]] |
| [[android:supportsRtl]] | [[true]] | لو لغة الجهاز عربي، الواجهة تتقلب يمين لشمال |
| [[android:theme]] | [[@style/Theme.Notes]] | الثيم من [[res/values/themes.xml]] |

### يعني إيه [[@]]؟

[[@نوع/اسم]] = «resource من فولدر res». [[@string/app_name]] معناها «النص اللي اسمه app_name في [[res/values/strings.xml]]». والنظام بيختار النسخة المناسبة للجهاز وقت التشغيل: لو الجهاز عربي ياخد من [[values-ar]].

> القالب الحقيقي في Android Studio فيه attributes زيادة، زي [[android:roundIcon]] (أيقونة مدورة) و [[android:allowBackup]] و [[android:dataExtractionRules]] (إعدادات الـ backup). المثال شالهم عشان يقصر.

---

## ٤. [[<activity>]]

~~~text
        <activity
            android:name=".MainActivity"
            android:exported="true">
~~~

- [[<activity>]]: كل شاشة (Activity) في التطبيق **لازم** تتعلن هنا، وإلا النظام يرمي exception لما تحاول تفتحها.
- [[android:name=".MainActivity"]]: الكلاس. النقطة في الأول معناها «جوه الـ namespace»، فبتبقى [[com.sara.notes.MainActivity]].
- [[android:exported="true"]]: مسموح لتطبيقات تانية (زي الـ launcher) تفتح الشاشة دي. أي Activity فيها [[<intent-filter>]] لازم يتكتب لها exported صراحة، والتطبيق اللي targetSdk بتاعه 31 (Android 12) أو أكتر مش هيتبني من غيره.

---

## ٥. [[<intent-filter>]]: الشاشة اللي تفتح من الأيقونة

~~~text
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
~~~

الـ **intent** رسالة «عايز أعمل كذا» بتتبعت للنظام. والـ **intent-filter** بيقول «الشاشة دي بترد على الرسايل اللي شكلها كذا».

| السطر | معناه |
|---|---|
| [[action.MAIN]] | دي نقطة البداية للتطبيق، مش محتاجة داتا |
| [[category.LAUNCHER]] | اعرضها في قايمة التطبيقات |

الاتنين مع بعض = «لما اليوزر يدوس الأيقونة، افتح الشاشة دي». ولو مفيش Activity فيها الاتنين، التطبيق هيتسطّب بس مش هيظهر له أيقونة.

وبعدها 3 قفلات: [[</activity>]] و [[</application>]] و [[</manifest>]]، بعكس ترتيب الفتح.

---

## ٦. فولدر [[res/]] و الـ qualifiers

~~~text res في القالب (مختصر)
res/
├── drawable/          صور و vector icons
├── mipmap-hdpi/ ... mipmap-xxxhdpi/   أيقونة التطبيق بكذا مقاس
├── mipmap-anydpi-v26/ الأيقونة الـ adaptive (بتتشكّل حسب الموبايل)
├── values/
│   ├── strings.xml    النصوص الافتراضية
│   ├── colors.xml
│   └── themes.xml
└── xml/               ملفات إعدادات (backup rules)
~~~

اللي بعد الشَرطة في اسم الفولدر اسمه **qualifier**، والنظام بيختار على أساسه:

| الفولدر | بيتاخد لما |
|---|---|
| [[values]] | دايمًا (الافتراضي) |
| [[values-ar]] | لغة الجهاز عربي |
| [[values-night]] | الـ dark mode شغال |
| [[mipmap-xxhdpi]] | كثافة الشاشة عالية (حوالي 480 dpi) |

---

## ٧. الـ solCode: [[strings.xml]] بلغتين

~~~text res/values/strings.xml
<resources>
    <string name="app_name">Notes</string>
    <string name="welcome">Welcome, %1$s</string>
</resources>
~~~

~~~text res/values-ar/strings.xml
<resources>
    <string name="app_name">ملاحظاتي</string>
    <string name="welcome">أهلًا يا %1$s</string>
</resources>
~~~

- [[<resources>]]: العنصر الأساسي لأي ملف في [[values]].
- [[<string name="...">]]: الـ [[name]] هو اللي الكود بيستخدمه، **لازم يبقى هو هو** في الملفين. والنص بين الـ tags هو اللي بيتغير.
- [[%1$s]]: مكان قيمة هتتبعت وقت التشغيل. [[%]] «هنا قيمة»، و [[1$]] «الـ argument رقم 1»، و [[s]] «كنص» (string). ولرقم صحيح [[%2$d]]. الترقيم مهم في الترجمة لأن ترتيب الكلام بيختلف بين اللغات.
- [[<!-- ... -->]] اللي في أول الـ solCode تعليق XML، بيوضّح اسم كل ملف.

---

## ٨. من الكود: كلاس [[R]]

وقت البناء، AGP بيولّد كلاس اسمه [[R]] في الـ namespace ([[com.sara.notes.R]])، فيه رقم [[Int]] لكل resource:

| في الكود | معناه |
|---|---|
| [[R.string.app_name]] | رقم النص app_name، **مش** النص نفسه |
| [[R.drawable.logo]] | رقم صورة [[res/drawable/logo]] |
| [[stringResource(R.string.welcome, "Sara")]] | في Compose: النص، و [[Sara]] مكان [[%1$s]] |
| [[getString(R.string.welcome, "Sara")]] | نفس الكلام من Activity أو Context |
| [[painterResource(R.drawable.logo)]] | صورة في Compose |

النتيجة: الجهاز الإنجليزي يعرض «Welcome, Sara»، والعربي «أهلًا يا Sara»، من نفس السطر في الكود.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[<uses-permission>]] | صلاحية ([[INTERNET]] لأي شبكة) |
| [[<application android:...>]] | الأيقونة والاسم والثيم و RTL |
| [[@string/x]] و [[@mipmap/x]] | resource من [[res]] |
| [[<activity android:name=".X" android:exported="true">]] | شاشة، ومسموح تتفتح من برا |
| [[MAIN]] + [[LAUNCHER]] | الشاشة اللي تفتح من الأيقونة |
| [[values-ar/strings.xml]] | نفس الأسامي بالعربي، والنظام بيختار |
| [[%1$s]] | أول argument كنص |

اللي ميتلخبطش: [[R.string.x]] رقم مش نص، فلازم [[stringResource]] أو [[getString]]. ونسيان [[INTERNET]] بيوقّع كل نداء شبكة حتى والنت شغال.`,
          lines: [
            "أول سطر في أي ملف XML: النسخة والترميز.",
            R`[[manifest]]: والـ namespace اللي بيعرّف بادئة [[android:]].`,
            "صلاحية النت (مش محتاجة سؤال لليوزر).",
            R`بداية [[application]]: إعدادات التطبيق كله.`,
            R`الأيقونة من [[res/mipmap]].`,
            R`الاسم من [[strings.xml]].`,
            "يدعم الاتجاه من اليمين للشمال.",
            R`الثيم من [[res/values/themes.xml]] (Compose بيكمّل الباقي في الكود).`,
            R`[[activity]]: شاشة في التطبيق.`,
            R`الكلاس بتاعها. النقطة في الأول معناها «جوه الـ namespace».`,
            "ينفع تتفتح من برا التطبيق.",
            "بداية الـ intent-filter.",
            "دي نقطة البداية...",
            "...وتظهر في قايمة التطبيقات.",
            "قفلة intent-filter.",
            "قفلة activity.",
            "قفلة application.",
            "قفلة manifest."
          ],
          sol: R`الـ emulator بالعربي هيعرض الاسم من [[values-ar]]، وبالإنجليزي من [[values]]. ولو نسيت نص في ملف العربي، Android بياخده من الافتراضي (وـ lint بيحذّرك بـ [[MissingTranslation]]).

[[stringResource(R.string.welcome, "Sara")]] هيعرض «أهلًا يا Sara» بالعربي أو «Welcome, Sara» بالإنجليزي.`,
          solCode: R`<!-- res/values/strings.xml -->
<resources>
    <string name="app_name">Notes</string>
    <string name="welcome">Welcome, %1$s</string>
</resources>

<!-- res/values-ar/strings.xml -->
<resources>
    <string name="app_name">ملاحظاتي</string>
    <string name="welcome">أهلًا يا %1$s</string>
</resources>`
        },
        {
          cmd: "Activity و lifecycle",
          title: "الـ Activity ودورة حياتها: onCreate و onStart و onResume و onPause و onStop و onDestroy",
          desc: R`الـ [[Activity]] هي الشاشة اللي النظام بيفتحها. في تطبيقات Compose غالبًا عندك واحدة بس ([[MainActivity]])، وكل الشاشات جواها كـ composables، والتنقل بينهم بـ Navigation.

[[class MainActivity : ComponentActivity()]] معناها إنها بتورث من [[ComponentActivity]]. والنظام هو اللي بيعمل الـ object وبينادي دوال معينة في أوقات معينة. دي اسمها lifecycle callbacks، وانت بتعمل لها [[override]]:
• [[onCreate]]: أول مرة. هنا [[setContent { }]] اللي بتحط فيها الـ Compose UI.
• [[onStart]]: الشاشة بقت ظاهرة.
• [[onResume]]: الشاشة قدام واليوزر يقدر يتفاعل.
• [[onPause]]: حاجة غطّتها جزئيًا، أو بتقفل.
• [[onStop]]: مش ظاهرة خالص (اليوزر داس Home مثلًا).
• [[onDestroy]]: الـ object هيتمسح.

أهم حاجة تفهمها: لما الموبايل يلف (rotation) أو اللغة أو الـ dark mode يتغير، النظام بيعمل destroy للـ Activity ويعملها من الأول (اسمها configuration change). أي متغير عادي جوه الـ Activity بيضيع. ده سبب وجود [[rememberSaveable]] و [[ViewModel]] (دروس جاية).

و [[enableEdgeToEdge()]]: التطبيق يرسم ورا الـ status bar والـ navigation bar. من Android 15 مع targetSdk 35+ ده إجباري، فلازم تسيب مسافة بـ [[innerPadding]] اللي جاية من [[Scaffold]].

[[super.onCreate(...)]] لازم تتنادى في الأول: بتخلي الأب يعمل شغله. و [[savedInstanceState: Bundle?]] فيه state متحفوظ لو الـ Activity اتعملت تاني (nullable لأنه null أول مرة).`,
          example: R`// الـ imports اتشالت عشان المثال يقصر، و Android Studio بيضيفها بـ Alt+Enter
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("Life", "onCreate")
        enableEdgeToEdge()
        setContent {
            NotesTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Text("أهلًا", modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
    override fun onStart() { super.onStart(); Log.d("Life", "onStart") }
    override fun onResume() { super.onResume(); Log.d("Life", "onResume") }
    override fun onPause() { super.onPause(); Log.d("Life", "onPause") }
    override fun onStop() { super.onStop(); Log.d("Life", "onStop") }
    override fun onDestroy() { super.onDestroy(); Log.d("Life", "onDestroy") }
}`,
          try: R`حط الكود ده في MainActivity، وافتح Logcat واكتب في الفلتر [[tag:Life]]. شغّل التطبيق، وبعدين: (١) لف الـ emulator، (٢) دوس Home وارجع، (٣) دوس Back. اكتب الترتيب اللي ظهر في كل مرة.`,
          flag: "script",
          deep: {
            why: R`أشهر بقّين في تطبيقات المبتدئين: داتا بتضيع لما الموبايل يلف، وحاجة (كاميرا، location، اتصال) فاضلة شغالة والشاشة مقفولة فالبطارية بتخلص. الاتنين سببهم إنك مش عارف الـ lifecycle.`,
            how: R`[[ComponentActivity]] هي الأب الحديث، وهي [[LifecycleOwner]]: أي حاجة تقدر «تتفرج» على الـ lifecycle بدل ما تكتب كود في كل callback. Compose بيعمل كده: [[collectAsStateWithLifecycle()]] بتوقف التجميع لوحدها لما الشاشة توصل onStop.

ولو محتاج تعمل حاجة على أحداث الـ lifecycle من جوه composable: [[LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { ... }]] من مكتبة lifecycle-runtime-compose.

[[AppCompatActivity]] هتشوفها في المشاريع القديمة (XML)، وهي بتورث من ComponentActivity ومعاها دعم الثيمات القديمة.

ولو النظام محتاج ذاكرة ممكن يقتل التطبيق كله وهو في الخلفية (process death). لما اليوزر يرجع، الـ Activity بتتعمل من الأول و [[savedInstanceState]] فيه اللي اتحفظ، بس الـ ViewModel نفسه بيضيع. عشان كده الداتا المهمة مكانها [[SavedStateHandle]] أو الداتابيز.`,
            when: R`أغلب الشغل في [[onCreate]] (الـ setContent). والباقي نادرًا ما هتكتبه بنفسك في Compose، بس لازم تفهم الترتيب عشان تفهم ليه الـ ViewModel موجود.`,
            mistakes: R`تحفظ داتا في متغير جوه الـ Activity وتستغرب إنها اتصفّرت مع اللفة. وتنسى [[super.onXxx()]] فيقع بـ [[SuperNotCalledException]]. وتنسى [[innerPadding]] مع edge-to-edge فالكلام يتداري تحت الـ status bar.`
          },
          teach: R`## الكود ده بيعمل إيه؟

ده [[MainActivity.kt]] تقريبًا زي ما قالب Empty Activity بيعمله، وزوّدنا عليه سطر log في كل lifecycle callback. الهدف إنك تشغّل التطبيق وتشوف في Logcat النظام بينادي أنهي دالة وإمتى.

> مفيش Android SDK ولا emulator على الجهاز اللي اتكتب عليه الدرس، فالكود ده **متشغّلش** هنا. الترتيب اللي تحت من الـ docs الرسمية (developer.android.com: «The activity lifecycle» و «Behavior changes: Android 12» و «Display content edge-to-edge»). أما حاجات Kotlin نفسها (الوراثة و [[override]] و [[super]] و [[Bundle?]] والـ trailing lambda) فاتجرّبت في دروس الكلاسات والـ lambdas اللي فاتت.

---

## ١. الـ imports اللي اتشالت

المثال كاتب في أوله إن الـ imports اتشالت. دي اللي Android Studio بيحطها (بـ Alt+Enter على أي اسم أحمر):

~~~kotlin
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import com.sara.notes.ui.theme.NotesTheme
~~~

[[android.*]] جاي مع Android نفسه، و [[androidx.*]] مكتبات Jetpack اللي في [[dependencies]] (درس Gradle)، و [[NotesTheme]] من ملف [[ui/theme/Theme.kt]] اللي القالب عمله.

---

## ٢. سطر الكلاس

~~~kotlin
class MainActivity : ComponentActivity() {
~~~

- [[: ComponentActivity()]]: بيورث من [[ComponentActivity]] وبينادي الـ constructor بتاعه بالأقواس الفاضية (درس interface والوراثة). [[ComponentActivity]] [[open]]، عشان كده نقدر نورث منه.
- انت **مش** بتعمل [[MainActivity()]] بنفسك أبدًا. النظام هو اللي بيعمل الـ object لما اليوزر يفتح التطبيق (عشان كده مكتوبة في الـ manifest)، وبينادي الدوال اللي تحت في الوقت المناسب.

---

## ٣. [[onCreate]]

~~~kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("Life", "onCreate")
        enableEdgeToEdge()
~~~

| الحتة | معناها |
|---|---|
| [[override fun onCreate]] | بنكتب نسختنا من دالة موجودة في الأب |
| [[savedInstanceState: Bundle?]] | [[Bundle]] شنطة key/value فيها state متحفوظ. و [[?]] لأنها [[null]] أول مرة، وفيها حاجة لو الـ Activity بتتعمل تاني بعد ما اتمسحت |
| [[super.onCreate(savedInstanceState)]] | [[super]] = الأب. «يا ComponentActivity اعمل شغلك الأول». لو نسيتها التطبيق يقع بـ [[SuperNotCalledException]] |
| [[Log.d("Life", "onCreate")]] | اكتب في Logcat. [[d]] = debug (المستوى)، و [[Life]] الـ tag اللي هتفلتر بيه، والتاني الرسالة |
| [[enableEdgeToEdge()]] | التطبيق يرسم ورا الـ status bar (فوق) والـ navigation bar (تحت) |

مستويات [[Log]]: [[Log.v]] (verbose) و [[Log.d]] (debug) و [[Log.i]] (info) و [[Log.w]] (warning) و [[Log.e]] (error)، وكل واحد ليه لون في Logcat.

---

## ٤. [[setContent]]: الواجهة

~~~kotlin
        setContent {
            NotesTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Text("أهلًا", modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
~~~

من جوه لبرة:

1. [[Text("أهلًا", ...)]]: composable بيعرض نص.
2. [[Scaffold(...) { innerPadding -> ... }]]: الهيكل الأساسي لشاشة Material (فيه أماكن لـ top bar و bottom bar). الـ lambda بتاعته بتاخد parameter اسمه [[innerPadding]]: المسافات اللي الـ system bars واخدينها.
3. [[Modifier.padding(innerPadding)]]: سيب المسافة دي، وإلا «أهلًا» هيتداري تحت الـ status bar (عشان احنا عاملين edge-to-edge).
4. [[Modifier.fillMaxSize()]]: الـ Scaffold ياخد الشاشة كلها.
5. [[NotesTheme { }]]: الألوان والخطوط بتاعة التطبيق لكل اللي جواه.
6. [[setContent { }]]: من ComponentActivity (extension من مكتبة activity-compose): «الواجهة بتاعة الشاشة دي هي الـ composables دي».

كلهم trailing lambdas (درس lambdas): آخر parameter دالة، فبتتكتب برا الأقواس. وكل ده له دروس في قسم Compose.

---

## ٥. باقي الـ callbacks

~~~kotlin
    override fun onStart() { super.onStart(); Log.d("Life", "onStart") }
    override fun onResume() { super.onResume(); Log.d("Life", "onResume") }
    override fun onPause() { super.onPause(); Log.d("Life", "onPause") }
    override fun onStop() { super.onStop(); Log.d("Life", "onStop") }
    override fun onDestroy() { super.onDestroy(); Log.d("Life", "onDestroy") }
~~~

كل سطر دالة كاملة: [[override]]، ونداء الأب، و log. و [[;]] بتفصل أمرين في سطر واحد (من غيرها كنا هنكتب كل دالة في ٣ سطور).

| الـ callback | الشاشة | النظام بيناديه لما |
|---|---|---|
| [[onCreate]] | اتعملت | أول مرة، أو بعد ما اتمسحت |
| [[onStart]] | ظاهرة | هتظهر لليوزر |
| [[onResume]] | قدام وبتتفاعل | اليوزر يقدر يلمسها |
| [[onPause]] | بتفقد التركيز | dialog نظام غطّاها جزئيًا، أو أول خطوة في القفل |
| [[onStop]] | مش ظاهرة | اليوزر داس Home أو فتح تطبيق تاني |
| [[onDestroy]] | هتتمسح | بتتقفل، أو configuration change |

والترتيب دايمًا متناظر: [[onCreate]]/[[onDestroy]]، و [[onStart]]/[[onStop]]، و [[onResume]]/[[onPause]].

---

## ٦. اللي هتشوفه في Logcat (الـ try)

فلتر [[tag:Life]] بيخلّي Logcat يعرض سطورنا بس. الترتيب حسب الـ docs:

~~~text أول تشغيل
onCreate
onStart
onResume
~~~

~~~text (١) لفّيت الموبايل
onPause
onStop
onDestroy
onCreate
onStart
onResume
~~~

اللفة اسمها **configuration change** (زي تغيير اللغة أو الـ dark mode): النظام بيمسح الـ object ويعمل واحد جديد عشان يحمّل الـ resources المناسبة للوضع الجديد. أي متغير عادي جوه الـ Activity ضاع، وده سبب [[rememberSaveable]] و [[ViewModel]].

~~~text (٢) Home وبعدين رجعت
onPause
onStop
onStart
onResume
~~~

مفيش onCreate في الرجوع: الـ object لسه موجود.

~~~text (٣) Back على Android 12 أو أحدث
onPause
onStop
~~~

من Android 12، الـ Back على الـ Activity الرئيسية (اللي بتفتح من الأيقونة) بيودّيها الخلفية بس ومبيمسحهاش، فالرجوع ليها أسرع. على Android 11 وأقدم هتشوف [[onDestroy]] بعدهم.

---

## ٧. ليه ده مهم؟

| المشكلة | السبب | الحل |
|---|---|---|
| الداتا بتضيع مع اللفة | الـ object اتمسح واتعمل تاني | [[ViewModel]] أو [[rememberSaveable]] |
| الكاميرا أو الـ GPS شغالين والشاشة مقفولة | محدش وقّفهم في [[onStop]] | حاجات بتتفرج على الـ lifecycle زي [[collectAsStateWithLifecycle()]] |
| الكلام تحت الـ status bar | [[enableEdgeToEdge()]] من غير [[innerPadding]] | [[Modifier.padding(innerPadding)]] |

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[class X : ComponentActivity()]] | شاشة، والنظام هو اللي بيعملها |
| [[override fun onCreate(savedInstanceState: Bundle?)]] | أول ما تتعمل، وهنا [[setContent]] |
| [[super.onXxx()]] | لازم في كل callback |
| [[Log.d(tag, msg)]] | سطر في Logcat |
| [[enableEdgeToEdge()]] + [[innerPadding]] | ارسم ورا الـ bars وسيب مسافة |
| اللفة | destroy ثم create من جديد |

اللي ميتلخبطش: Home بيوقف الشاشة ([[onStop]]) بس مبيمسحهاش، واللفة بتمسحها وتعملها تاني. فأي state مهم مكانه برا الـ Activity.`,
          lines: [
            R`الـ Activity بتورث من [[ComponentActivity]].`,
            R`[[override]] لـ onCreate، والـ Bundle nullable.`,
            R`خلي الأب يعمل شغله الأول.`,
            R`log في Logcat بالـ tag Life.`,
            "ارسم ورا الـ system bars.",
            R`[[setContent]]: من هنا بتبدأ واجهة Compose.`,
            R`الثيم اللي Android Studio عمله للمشروع (في ملف [[ui/theme/Theme.kt]]).`,
            R`[[Scaffold]] الهيكل الأساسي للشاشة، وبيدي [[innerPadding]] مسافة الـ system bars.`,
            "نص بمسافة عشان ميتداريش.",
            "قفلة Scaffold.",
            "قفلة الثيم.",
            "قفلة setContent.",
            "قفلة onCreate.",
            R`الشاشة بقت ظاهرة. [[;]] عشان أمرين في سطر واحد.`,
            "قدام وتفاعلية.",
            "بتفقد التركيز.",
            "مبقتش ظاهرة.",
            "هتتمسح.",
            "قفلة الكلاس."
          ],
          sol: R`أول تشغيل: [[onCreate]] ثم [[onStart]] ثم [[onResume]].

(١) اللفة: [[onPause]] ثم [[onStop]] ثم [[onDestroy]]، وبعدين من الأول [[onCreate]] ثم [[onStart]] ثم [[onResume]]. يعني object جديد خالص.

(٢) Home: [[onPause]] ثم [[onStop]]. والرجوع: [[onStart]] ثم [[onResume]] (من غير onCreate، لأنها لسه موجودة).

(٣) Back: من Android 12، الـ Activity الرئيسية (اللي بتفتح من الـ launcher) مش بتتقفل بالـ Back، النظام بيوديها الخلفية بس: هتشوف [[onPause]] ثم [[onStop]] من غير onDestroy. على Android أقدم هتشوف onDestroy كمان.`
        }
      ]
    }
]);
