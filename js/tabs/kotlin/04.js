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
    }
]);
