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
            why: R`النظام مبيعرفش حاجة عن تطبيقك غير من الـ manifest: لو نسيت INTERNET، كل نداء شبكة هيقع بـ [[SecurityException]] أو [[UnknownHostException]] حتى والنت شغال. والنصوص لو اتكتبت في الكود، الترجمة هتبقى مستحيلة، وكمان lint بيحذّرك من ده.`,
            how: R`الـ manifest اللي بتكتبه مش النهائي: وقت البناء Gradle بيدمجه مع manifests المكتبات (كل مكتبة ممكن تضيف صلاحيات أو components). تقدر تشوف النتيجة من تاب Merged Manifest تحت الملف. لو مكتبة ضافت صلاحية مش عايزها: [[tools:node="remove"]].

[[R]] كلاس بيتولد وقت البناء، فيه رقم int لكل resource. عشان كده [[R.string.app_name]] نوعه Int مش String، ولازم تحوّله بـ [[getString()]] أو [[stringResource()]].

الـ qualifiers بعد الشَرطة في اسم الفولدر: [[values-ar]] (لغة)، و [[values-night]] (dark mode)، و [[drawable-xxhdpi]] (كثافة الشاشة). النظام بيختار الأنسب لوحده وقت التشغيل.

[[%1$s]] في strings.xml معناها «أول argument كنص»، و [[%2$d]] «تاني argument كرقم». ولعدد العناصر فيه [[plurals]]، ومهم جدًا في العربي (عنصر واحد، عنصرين، ٣ عناصر، ١١ عنصر).`,
            when: R`الـ manifest كل ما تضيف صلاحية، أو Activity، أو deep link، أو service. والـ strings.xml لأي نص بيظهر للمستخدم من أول يوم، حتى لو لغة واحدة.`,
            mistakes: R`تنسى INTERNET وتقعد ساعة تدوّر في كود Retrofit. وتكتب نصوص عربي في الكود على طول. وتنسى [[android:exported]] على Activity فيها intent-filter فالبناء يقع (إجباري من Android 12).`
          },
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
